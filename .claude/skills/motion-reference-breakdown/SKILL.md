---
name: motion-reference-breakdown
description: Study a reference motion-graphics video (TikTok, Reel, YouTube, ad, explainer) to learn its craft — frame contact sheets, frame-by-frame strips of slams and transitions, cut detection and pacing stats, full-resolution typography crops, and an audio analysis (music bed or not, silences before punchlines, SFX character, narrator pitch). Use it whenever the user shares a reference video ("bedah", "breakdown", "pelajari", "kenapa ini keren", "like this", "analyze this edit"), or asks why a reference feels expensive compared to their own result. The output separates transferable techniques from the creator's expression, which must not be copied.
---

# Reference breakdown

The goal is to *learn* a reference precisely: why its pacing, typography, camera and sound work. Then you can apply that craft to an original film. Guessing teaches the wrong lessons: you might think there is music when it is only a drone that drops out, think the typography is flat when it is 3D, or see a fade where there is a 12–14 frame mosaic. Measure instead.

## Respect the source
- Study the reference; don't redistribute it. Keep the file out of shared repos and plugins, and keep only your notes.
- Record structure and function, not the creator's script, characters or brand. New films use their own concept, characters, sets, palette and copy (see motion-director `references/originality.md`).
- A 1:1 recreation is only ever a private learning exercise, never published.

## Steps
Scripts live in this skill's `scripts/`. Run them with `python -I`. They need OpenCV and NumPy; audio needs ffmpeg (`imageio_ffmpeg`).

1. **Find the real canvas.** If the motion graphic was filmed on a laptop or phone, measure the screen rectangle once and pass `--crop x0,y0,x1,y1` to every frame tool.
2. **Overview.** `extract_frames.py ref.mp4 out overview --every 0.5` writes contact sheets, 24 s each, labelled with absolute time. Read all of them. Note the colour script, set changes, where text sits, and the character poses.
3. **Cuts and pacing.** `cut_detect.py ref.mp4 --crop …` gives cut times and median/mean/min/max shot length. Multi-frame transitions split or merge shots, so confirm by eye.
4. **Frame recipes.** For every slam, transition and special entrance, run `extract_frames.py ref.mp4 out strip --t0 … --t1 … --name slam`. Write each one as a recipe, frame by frame. Example: "f0–1 shake + directional blur · f2–3 white frame, word at 170% · f3–6 scale→100% with small overshoot, background swaps orange→red, shockwave ring, character pose burst · f8–14 second line blur-slides in".
5. **Typography at full res.** `extract_frames.py … crops --times …` at 10–20 moments. Record per role: font class (geometric heavy / condensed caps / brush / pixel / UI sans), relative size, fill (gradient, extrude, glow, marker box), and tilt and perspective (is the block a plane turned in 3D?). Note leading, overlap with characters, and whether the camera moves between phrases or text sits on surfaces.
6. **Audio.** Extract the audio, then run `ref_audio_analysis.py ref.wav out`. It gives per-second levels, spectrogram strips and onsets. Then `ref_zoom.py ref.wav out "slam:6.4-7.8,mosaic:51.9-53.1"` around events. Answer five questions:
   - Is there a music bed? Look for sustained low bands, and for whether it drops to digital silence before hits.
   - What do the SFX sound like? Dotted high blips are 8-bit sparkle, rising gliss is a power-up, vertical clicks are glitch, a sub plus crack is a slam.
   - Where are the VO pauses?
   - Narrator gender/pitch: median F0 ~120 Hz is male, 180–250 Hz is female.
   - Words per second.
7. **Write BREAKDOWN.md** with `references/breakdown-template.md`. Tag every number 📏 measured / 👁 observed / 💭 inferred. End with two lists:
   - **Learn**: transferable techniques, and how this engine does each one.
   - **Don't copy**: the creator's signature combination, script, characters, sets, palette and shot sequence.

## What usually matters most (check these first)
- Does each phrase sit in its own place in 3D, with the camera traveling between phrases?
- The transition mix percentages and their exact frame counts.
- Silence before punchlines, and whether there is music at all.
- The per-word sync: one visual event per spoken word.
- The calm section that makes the core message hit harder.
