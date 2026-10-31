---
name: motion-video-engine
description: Build and render code-generated motion-graphics videos with a proven deterministic engine — three.js voxel sets with DOF and bloom, SDF pixel-art characters with sprite-burst pose changes, a 3D kinetic-type stage, UI/data panels, a transition library (pixel mosaic, whip, glitch, halftone, light-sweep, PiP, smash zoom, foreground wipe, crossfade), real motion blur, and frame-by-frame rendering in headless Edge on the GPU. Use it whenever a motion video, explainer, animated promo or kinetic-type piece has to be produced as an MP4 from code, when scaffolding a new video project ("bikin video baru", "video-3"), or when changing shots, sets, characters, transitions or render settings of an existing one.
---

# Motion video engine

Every frame is a pure function of its frame index, so any frame can be re-rendered alone and two workers never disagree. The film is data: a timeline of shots built from VO word times.

## Start a project
```bash
python -I <skills>/motion-video-engine/scripts/new_video.py aset/video-3 [--sfx-from <folder of sfx mp3>]
cd aset/video-3
python -I tools/render.py --frames 30,150,240 --out build/stills   # demo renders out of the box
```
Needs Node (npm installs three.js r186 and OFL fonts), Python 3 with `playwright`, `opencv-python`, `numpy`, `scipy`, `imageio-ffmpeg`, and Microsoft Edge. Headless Edge gives WebGL2 on the GPU; Playwright's bundled Chromium may not match. The template's demo `timeline.js` shows every pattern in four shots: camera travel, slam, desk scene with world text, CTA.

## Layout
```
src/index.html, main.js       renderer: sub-frame motion blur, transitions, post params, snapshot()
src/timeline.js               YOUR FILM: build(WORDS, measure, env) -> {shots, trans, cues, bed, duration}
src/lib/kit.js                authoring helpers: w/we/wi, row, centerRow, camPath, panel, prop, view, typo SFX
src/lib/stage.js              3D type/character/panel layer + world-space text in the room
src/lib/text.js               word painting (fx, fills, marker, disintegrate)
src/lib/voxel.js              voxel room (desk, monitor, lamp, shelves, LED slats) + red-carpet stage (x≈160)
src/lib/sprites.js, fx.js     pixel characters/props, sprite burst, mosaic/halftone/light-sweep, shake
src/lib/bg2d.js, scenes2.js   flat backgrounds (orange/red/black ring, desktop, profile grid, slop ribbon, storm, galaxy, planet, moon, dot sphere, grid void, theme scenes)
src/lib/panels.js, ui.js      UI/data panels; monitor UIs (chat, code, film-playback, editor timeline)
src/lib/post.js               linear-light accumulation, bloom, soft grade, strobe, flash, vignette, grain
tools/                        render, check_safe, dump_cues, + VO, sound and QA tools copied from sibling skills
```

## Writing shots
Read `references/engine-api.md` before writing a timeline; it has the full shot schema, set coordinates and transition list. In short:
- A **shot** is `{ id, t0, t1, bg | set+view, tcam, chars, props, texts, wchars, wtexts, ui, extra, over, post, shake, focusZ, dof, couple }`. Shots are contiguous; `t0/t1` come from words.
- **Transitions** sit at shot boundaries: `trans.push({ at, type, pre, post, ...opts })`.
- **Sound** is declared in the same file: `cue(t, name, db, rate)` and `bed.push({t0, t1, kind})`. `K.finish(duration)` adds a typography SFX for every word.
- **Characters:** `kind: "hero" | "cube"`, `keys: [{t, pose, expr, mouth, hop, burst}]`. A new pose bursts into pixels on its word. The first key never bursts. A world char takes `anchor` + `wpx`.
- **Authoring patterns** (one controller per beat driving many properties, an auto-fit type rig, inertial bounce after a key, a brand-physics table per film): `motion-taste/references/enterprise-motion.md` §2–3. Video-4 (`aset/video-4/src`) is a worked example of a standalone 16:9 engine written this way.

## Render
```bash
python -I tools/check_safe.py                 # must print nothing
python -I tools/dump_cues.py                  # build/cues.json for the mixer
python -I tools/render.py --workers 4         # build/frames/f_00000.jpg ...; --frames a,b,c or --range a-b for parts
```
It runs about 0.35–0.6 s per frame wall time with 4 workers on an integrated GPU (a 2-minute film takes about 25 min). The heaviest frames are voxel shots during camera moves (6 sub-frames each), and the PiP or monitor frames that render another shot inside them. Render the hook first, show it, and full-render only after approval. Re-render just the frames you changed.

## Pitfalls already paid for (keep them fixed)
- **Motion blur and cuts.** Never let motion blur cross a hard cut. `main.js` clamps sub-frames to the current shot.
- **Text caching.** Word textures repaint until every per-letter effect has settled. Freezing early causes flicker.
- **Bloom.** Use the separable-gaussian bloom. Ring-tap glows make ghost "burik" halos.
- **Flat backgrounds** are overscanned ×1.16 and follow the camera at a fraction (parallax). Effect anchors (shockwave) are projected through the type camera.
- **Snapshots** (a monitor playing the film, the PiP rewind) render on a second stage. The room UI runs before the shot sets its own view.
- **Tool start-up.** Wait for `window.ready !== undefined` before awaiting it in tools.
- **Practical lights.** Don't put text in front of the stage softbox or the lamp pool.

## Making it yours (every new film needs its own look)
The template's default look comes from a learning study: pixel characters, voxel rooms, the red-carpet stage, an orange/red palette and the red/white mosaic. Don't ship that look again as-is. Give each film its own visual world: a new palette and grade, a new character style or none, new sets/backgrounds and a different signature transition, as decided in the concept (motion-director `references/originality.md`). The engine's craft (3D type, camera travel, springs, motion blur, sound) is what carries over.
- **Hero design:** `sprites.js` → `hero()` (hair shapes, headphones, hoodie palette `C`). Preview it with `src/sheet.html` (`python -I tools/shot.py sheet.html build/sheet.png`).
- **Sidekick:** `cube()`.
- **Sets:** add boxes in `voxel.js`. Keep emissive intensity modest so bloom stays soft.
- **Names and titles** in UIs are parameters (`profile(g, t, {name})`, `desktop(g, t, {title})`, `chatUI(..., {greet})`).
- **Full example:** `assets/examples/video2/` (two timelines, script, README) shows a complete 2-minute film built with this engine.
