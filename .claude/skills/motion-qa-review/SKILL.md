---
name: motion-qa-review
description: Self-review a rendered motion-graphics video before showing it to anyone — projected safe-area and text-overlap checks, frame-by-frame strips of every slam and transition, an overview contact sheet compared against the reference, full-resolution text crops for artifacts (ghost halos, flicker, glare, low contrast), cut-boundary checks for motion-blur ghosting, and an audio level table. Use it after any render of a motion video, before sending a preview or final cut, and whenever the user reports flicker, "burik", cropped or overlapping text, ghosting, or something that "feels off".
---

# Motion QA review

Most fixes in the last film came from looking at frames, not from thinking about code. Run this loop after every render, and fix what you find before the user does.

This skill catches defects (geometry, flicker, ghosting, levels). Taste — colour script, value contrast, poster test of paused frames, eye trace, rhythm, SKOR RASA against the reference — is judged with `motion-eye` (`eye.py sense` after every render, `eye.py review --ref` before every preview). Video-3 passed every defect check and still failed with the user; run both.

## The loop (fast → slow)
1. **Geometry.** Run `python -I tools/check_safe.py`. It must print nothing. `BAD` means a word leaves the safe area while it is in focus. `OVERLAP` means two visible words cover each other by more than 6%.
2. **Whole film at a glance.** Run `python -I tools/overview.py build/frames build/overview.jpg --every 1` and put it next to the reference overview. Check the colour script, composition variety, empty or black tiles, sets that look too dark or blown, and text over bright lights.
3. **Every hit, frame by frame.** Run `python -I tools/strip.py build/frames <f0> <f1> build/strip_x.jpg 6 320` around each slam, transition and pose burst (±12 frames). Compare with the reference strip recipe:
   - shake → white frame → oversized word → settle with small overshoot;
   - mosaic in/hold/out with crisp cells;
   - characters intact except during their 3–5-frame burst;
   - no mix of two shots after a hard cut.
4. **Full-res crops of text.** Crop 2–4 frames per section at full size. Look for ghost copies or halos ("burik"), flickering letters or markers (compare consecutive frames), red text that flashes white, unreadable text on bright backgrounds, and surface text sinking into the desk.
5. **Audio.** Run `python -I tools/measure_levels.py …`, then a spectrogram of the encoded preview. Confirm the gaps before slams are quiet, the VO is dominant, and the CTA tail is audible.

## Symptom → cause → fix
| symptom | likely cause | fix |
|---|---|---|
| letter/marker flickers | word texture frozen before effects settled | repaint until all per-letter/box/tint/decode effects end (`text.js` settleF) |
| faint copies around text | ring-tap glow | separable gaussian bloom (`post.js`) |
| ghost of previous shot on first frame | motion-blur sub-frames crossed a cut | clamp sub-frames to the shot (`main.js`) |
| character explodes at shot start | first key treated as a pose change | `poseAt` prev = key before current |
| black strip at frame edge | flat background without overscan during roll/pan | overscan ×1.16 |
| effect not under the character | effect drawn in background space | project with `P()` in `extra` |
| text invisible | placed over a practical light / bright paper | move to a dark area or dim the light |
| text cropped after camera move | perspective + travel | move inward / reduce size, z or tilt; re-run check |
| everything "too sharp/bright" | contrast/sat/glow too high | soft grade: contrast 0.14, sat 1.07, glow 0.32 |
| pop-ins feel jerky | underdamped springs, fast slides | ζ 0.6–0.7, quint-out 7 f, alpha ramp 3 f |
| tool says function missing | `window.ready` read too early | wait for it to exist |

## Before sending
- Re-render only the frames you touched (`--frames` / `--range`). Re-mix if cues changed, encode, and send the 720p share copy plus the 1080p path.
- In the message, list what changed and say what you couldn't verify (for example, listening to the mix).
