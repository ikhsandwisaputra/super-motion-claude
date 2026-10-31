# video-2 — "The Formula"

A 120.5 s, 1920×1080, 30 fps motion-graphics explainer. It recreates the structure, transitions, typography language and sound design of the reference breakdown (`video-breakdowns/2026-10-28_claude-motion-graphics-skill/`) with new content: how Claude is directed to make professional motion for any theme, using the formula Ikhsan Dwi Saputra built (`motion-docs/` + memory).

Everything on screen is code: pixel-art characters drawn from SDF parts, voxel sets in three.js, 3D kinetic typography, and procedural backgrounds. External media is limited to the ElevenLabs voice-over and SFX.

## Outputs (`out/`)
| file | what |
|---|---|
| `video2_full.mp4` / `video2_full_share.mp4` | full film, 1080p master / 720p share copy |
| `preview_v3_hook.mp4` | approved hook preview (0–26 s) |

## Pipeline
1. **Voice-over.** `tools/tts.py` calls ElevenLabs `/with-timestamps` (voice: Hope, model `eleven_v3`). The key comes from `.env.local` through `dotenv run` and is never printed. `tools/words.py` turns the character timings into per-word timings. `tools/vo_edit.py` tightens the pauses by context and remaps every word into `build/words_edit.json`.
2. **Timeline.** `src/timeline.js` covers the hook (0–25.6 s) and `src/timeline2.js` the rest. Every time is a VO word index, so a re-cut VO moves the whole edit.
3. **Render.** `tools/render.py` drives headless Edge on the GPU through Playwright. `src/main.js` composites each frame from 3–6 sub-frames (180° shutter, linear-light accumulation), which gives real motion blur. Sub-frames never cross a hard cut.
4. **Mix.** `tools/dump_cues.py` writes `build/cues.json` (SFX cues plus bed sections). `tools/mix.py` mixes the VO, a synthesised bed and the SFX:
   - the bed drops to silence before punchlines;
   - each word gets a typo-SFX matched to its entrance;
   - repeated sounds get a ±3–6% pitch spread.

```bash
# from aset/video-2
python -I tools/check_safe.py          # projected safe-area + text-overlap check (must print nothing)
python -I tools/dump_cues.py
python -I tools/render.py --workers 4  # build/frames  (add --frames 120,450 or --range 0-300 for stills)
python -I tools/mix.py --out build/mix_full.wav
```

## Engine map (`src/lib/`)
| file | role |
|---|---|
| `stage.js` | 3D type layer. Words, characters, props and panels are planes. A type camera (dolly, orbit, roll) moves with `camPath` between phrase anchors. Depth drives DOF blur. Entrances (slide, fly, slam, flip, rise, drop, swing, whip, arc, focus, pip, popin) use damped springs. |
| `text.js` | What is painted inside each word canvas: gradient, extrude, glow, marker box, smear, pop, decode, typewriter, wipe, and the pixel disintegrate exit. |
| `voxel.js` | Both voxel sets: the desk room with shelves, lamp and LED slats, and the red-carpet stage with the PROMPT sign. Post chain is Bokeh DOF → Unreal bloom → Output. |
| `post.js` | Sub-frame accumulation, then one lens pass: CA, separable-gaussian bloom, soft grade, hook strobe, flash, vignette, grain. |
| `sprites.js` / `fx.js` | SDF pixel characters (hero "Ikhsan", the Claude-orange cube), props, sprite-burst pose changes, mosaic, halftone, light-sweep, shake. |
| `bg2d.js` / `scenes2.js` | Flat backgrounds: desktop, profile grid, slop ribbon, storm and lightning, galaxy, planet, moon, dot sphere, teal grid void, theme scenes. |
| `panels.js` / `ui.js` | Counters, level meter, framework panel, icon tiles, input bar, toast, PiP video card, strike line. Monitor UIs: chat, FORMULA.md, the film playing itself, editor timeline. |

## Motion rules and their sources
- **Camera travel between phrases.** A finished phrase recedes into perspective while the next one is revealed. This is Ikhsan's direction, recorded in memory as `motion-video-reference-fidelity`.
- **Springs.** Closed-form springs with ζ 0.55–0.7, giving small overshoot and a soft landing (`motion-docs/04-physics/_physics-math/NOTES.md`).
- **Eases.** expo/quint-out for entrances and inOutCubic for camera moves (`03-choreography/CHOREOGRAPHY-CRAFT.md`). Decode settles left to right (anime.js `scramble.js`).
- **Post order.** UV transforms → CA → bloom → grade → vignette → grain, all averaged in linear light (`11-r3f-ecosystem/react-postprocessing/NOTES.md`, IQ gamma notes).
- **Generative backgrounds.** fBm and domain warp for the storm, galaxy and planet (`02-shaders-webgl/inigo-quilez/NOTES.md`). Lightning uses recursive midpoint displacement (`07-creative-coding/_generative-craft/NOTES.md`).
- **Flash safety.** No more than three flashes per second (MDN seizure guidance).

## Assets
- `audio/voiceover/v2_vo_hope_take1.mp3` and its alignment JSON. The tightened edit is `build/vo_edit.wav`.
- `audio/sfx/`: transition/impact SFX, plus `typo_*.mp3`, a reusable typography pack. The master copy and README are in `<project>/audio/sfx/typo-pack/`.
- Fonts are OFL/Apache via `@fontsource` (Poppins, Anton, Inter, Kaushan Script, VT323, Silkscreen, JetBrains Mono).

## Notes
- The characters are original designs drawn in the reference's style. The reference creator's mascots are not copied.
- On-screen facts come only from this workspace: ±250 MB of docs, 66 expert notes, 12 categories. The CTA keyword "MOTION" and the "Part 2" toast are placeholders; change them in `src/timeline2.js` → S36.
