# Experimental motion: think like a mad scientist (controlled chaos)

Enterprise designers (Apple, Google) work like architects: blueprint first, then technique. Experimental masters (Dirk Koy, Zach Lieberman, Schultzschultz, Maxim Zhestkov) work like scientists: they design a **system or experiment first** and let the result surprise them. Source: Ikhsan's knowledge note (2026-10-29), mapped onto our deterministic code engine and filtered through his kiblat.

**Kiblat filter, read this first.** Ikhsan's measured taste is calm, premium and comfortable: ~1 % neon, ≤ 6 % crowded frames, 0 one-frame impacts. Experimental mode is a **deliberate choice**, never the default:
- the *Eksperimental* direction of a brief;
- one chapter of a film (like video-4's brutal chapter);
- a daily sketch (§5).

It keeps three anchors:
1. controlled chaos, with one readable anchor per moment whenever words carry the message;
2. flash safety: ≤ 3 full-frame reversals per second, always;
3. determinism: every frame is still a pure function of its index (§3).

## 1. Flip the rules: enterprise vs experimental
| aspect | enterprise (neat, functional) | experimental (wild, avant-garde) | our rule |
|---|---|---|---|
| typography | legibility: letters carry the sentence | abstraction: letters as texture, sculpture, rhythm; destroyed if it moves you | abstraction only on words the VO already says, or on chapters without a message |
| eye trace | visual comfort, smooth handoffs | visual friction: extreme contrast, counter-motion, structured damage that slaps the nerves | friction is the accent; comfort is the frame around it (contrast of state) |
| workflow | storyboard first: sketch → still → animation → render | process first: sandbox → happy accident → concept | the Eksperimental direction runs 2–3 sandbox sketches before the formula rasa |
| physics and space | real physics, familiar | alien physics: gravity upside down, folded space, time running forward and back on one screen | alien physics is still one consistent physics (brand physics), just not ours |

## 2. Four ways masters find concepts (instead of "what story should I tell?")
1. **"What if" and misusing the tool.**
   - Feed a tool something it was never meant for. Example: optical flow invents pixels between two frames; give it two very different text images and it "panics" into melting, datamosh-like pixels.
   - Our equivalents:
     - Interpolate two glyph SDFs or two masks with a broken weight.
     - Displace by the *difference* of two frames.
     - Run an ease outside 0–1 (`bezier(.5, -2, .5, 3)`).
     - Feed the film's own frames back as a displacement map.
2. **Rule-based chaos: design rules, not keyframes.** Write 2–3 rules and let them collide (emergence). For example:
   - every kick drum splits the letter A in two;
   - letters repel like same-pole magnets;
   - the canvas shrinks every second.

   You don't know where the letters will run, but the clash looks alive.
   - *Engine:* agents with seeded starts (`rng(seed)`), steering forces from `motion-docs/07-creative-coding/nature-of-code/NOTES.md` (separation/alignment/cohesion; maxforce/maxspeed = personality; 40 px bins for speed), events from the music's onset list.
   - It is stateful, so **bake it** (§3).
3. **Physical-digital loop (analog resampling).**
   - Take a simple black-and-white type animation out of the computer and back in. Film the monitor with a phone from 2 cm (the RGB subpixels show), or through a glass of water or crumpled clear plastic.
   - Bring the clip back, push its contrast and use it as a displacement map for the original type. Real refraction no plugin can fake.
   - *Engine:* extract that clip to frames (ffmpeg) and load frame `f` as a texture by index. It is deterministic, and it is Ikhsan's hands in the film. This needs him to shoot it, so ask.
4. **Synesthesia: translate one sense into another.**
   - "If this chainsaw or bass distortion were a letter, how sharp are its corners?"
   - "If spiciness or an electric shock were a frame rate, how would it flicker?"
   - *Engine:* map measured audio features per frame (onset strength, spectral centroid, roughness; `motion-reference-breakdown` / `eye.py` give onsets) to weight, corner sharpness (wdth/miter), stroke jitter or a stepped frame rate. The flicker pattern stays ≤ 3 flashes/s.

## 3. The experimental arsenal (with engine recipes)
| technique | what the viewer sees | how (engine) | rule |
|---|---|---|---|
| **Slit-scan / temporal slicing** | the screen sliced into hundreds of strips, each at a different time (top at 1 s, middle at 2 s, bottom at 3 s); a spinning letter becomes a surreal spiral sculpture | the type layer is a pure function of t, so render K = 8–16 time slices `t − (k/(K−1))·D` and composite per pixel by a map (gradient, radial, spiral). Detail: `studio-tricks.md` §4 | whole again when nothing moves; small D on words that must be read |
| **Reaction-diffusion** | letter edges grow like coral or bacteria, cells splitting and eating each other | Gray–Scott in a ping-pong float framebuffer, seeded by the text mask (coral-like around feed ≈ 0.055, kill ≈ 0.062; tune by eye). AE equivalent: blur → edges/invert → threshold, repeated 10–15×. Ping-pong notes: `motion-docs/02-shaders-webgl/webgpu/NOTES.md` (ping-pong section), `07-creative-coding/p5js/NOTES.md` (float framebuffer for feedback) | **stateful: bake it.** One accent moment per film |
| **Pixel sorting / data bending** | at peak speed or in bright light, a letter's pixels collapse into sharp needle streaks sorted by luminance | true sort per column/row above a luminance threshold (CPU, baked), or a shader approximation: stretch bright runs along one direction | structured damage with a cause (speed or light), never a random glitch preset (`avoid` in the ledger) |
| **Micro-UI brutalism / high density** | giant cropped type plus tiny data running fast: timecode, X/Y coordinates, waveform, hex codes, split panels | pure functions of t (frame counter, `hash()` hex, the audio envelope as a waveform); panels are clip rects | tiny (≤ 2 % H), low contrast, at the edges; the kiblat caps crowding (≤ 6 %), so use it for one section, not the film |
| **Extreme aspect inside 16:9** | slits, 20-panel grids, letterboxed strips | clip rects or masks, with the delivery still 16:9 | the poster test still needs one focal point |
| **Alien physics** | gravity upside down, folded space, time running forward and backward on one screen | negative `g` in `bounce()`, reversed time `pose(T − t)` in one region, a space fold by mirrored UVs | one alien rule per chapter, applied consistently |

**Determinism rule for anything stateful** (reaction-diffusion, feedback trails, colliding agents, sorted streaks). Render workers grab frames in any order, so a simulation can never run "from where the last frame left off" inside a worker. Bake it: one sequential pass writes the state per frame (an image sequence or JSON), then the film reads frame `f`. A seeded RNG plus a fixed timestep gives the same bake every time.

## 4. The masters' tools (and what covers them for us)
- **TouchDesigner** (real-time node visuals and installations, webcam/sensor/audio → type): not in our offline docs. Our code engine plus Web Audio/MediaPipe (`motion-docs/09-sensory-hardware`) covers the interactive side.
- **Cavalry** (procedural 2D, data → shapes, cloners): our engine with index-driven repeats and data files.
- **Blender Geometry Nodes / Cinema 4D MoGraph & Fields** (letters as physical objects to shatter, melt or blow away under studio light): three.js covers light 3D. Heavy simulation means an external bake (Blender, and Rapier/verlet notes in `04-physics`).
- **p5.js / Processing / three.js** (creative coding: every point of a letter driven by noise, sine or physics): `07-creative-coding/p5js/NOTES.md` (`textToPoints`), the Nature of Code notes, three.js.

## 5. Training the experimental brain: daily sketch (30–45 min)
- **Timebox:** 45 minutes, one loop of 3–5 s, no long project.
- **One question per sketch.** Examples:
  - "Displacement plus glass over one spinning R."
  - "Print a word, crumple the paper, flash-photograph it, use it as a moving texture."
  - "Reaction-diffusion growing out of one letter."
- **Embrace the glitch.** When a wrong number (10000 instead of 10) breaks the shape into something strange, don't undo. Stop, look at it, then light and compose the accident.
- **For us:** a sketchbook folder with one file per sketch, a 3–5 s loop rendered by the same pipeline, measured with `eye.py sense`, and one line on what was learned. A sketch worth keeping becomes a ledger `candidate`; once a film uses it, it moves up.

## When to reach for this (and when not)
- **Yes:**
  - The brief asks for avant-garde, art, festival, music or an "experimental" direction.
  - One chapter needs visual friction between calm ones (contrast of state).
  - A film needs a signature nobody can template.
- **No:**
  - Trust, clean-product or premium-promo films, which is most of the kiblat.
  - Any stretch where small words must be read.
- Experimental visible tricks count toward the motif lock like any other signature.
