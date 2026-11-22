# Eye trace, camera and space

A pro doesn't ask "which effect?" but "where must the viewer's eyeball be at this frame?". Amateur work fails when the eye doesn't know where to look, the type proportions break, and the motion has no weight.

## Eye trace
- **One star per moment.** Of everything on screen, one element makes the big move. Others hold or make secondary motion (≤ 20 % of the star's amplitude, or slower).
- **Land where the eye already is.** If the eye is at the upper-left after word A, word B appears near there, or the frame changes completely (full field change resets the eye — that's why big jumps are fine in the reference: it re-colours the whole frame on most cuts).
- **Visual handoff (tongkat estafet).** Before showing something far away, let a piece of the previous element travel there first — the dot of an "i", an underline, a cursor, a particle, a shape. The eye follows it and the new element appears exactly where it lands.
- **Reading path.** Plan focal → headline → support → CTA as a Z, F or diagonal. Never make the eye go back up to read the next thing unless the camera takes it.
- `eye.py dna` draws the focal path per shot (green ≤ 20 % diagonal jump, amber ≤ 35 %, red > 35 %); `review` scores the share of big jumps against the reference.

## 2.5D space (layers in depth)
Flat type that only scales looks like PowerPoint. Put 2D layers in 3D:
- Far plane (background art, line numbers, sky): 2–4× the camera distance, blurred if DOF is on.
- Type plane: at the focus distance.
- Near plane (particles, dust, out-of-focus props): 0.3–0.5× the distance.
When the camera moves a little sideways, the three move at different speeds (parallax) — the illusion of a real, expensive space. A uniform dark background has no parallax cues: video-3's "editor scroll" between phrases was invisible because nothing in the frame showed depth or travel.

## Camera rig
- Animate a rig, not the raw camera: parent the camera to a controller (in the engine: `tcam: camPath([...])` keys for the type camera; room camera via `view(t)`), keep keys on the rig, add drift and shake as separate layers on top.
- Ease camera moves `inOutCubic` / `inOutQuart`; never linear starts/stops.

## Lens → engine `fov` (vertical degrees; three.js film gauge 35 mm)
| lens | portrait 9:16 fov | landscape 16:9 fov | feel |
|---|---|---|---|
| 15 mm | 98.8 | 66.5 | extreme wide: tunnel, huge near objects, hype |
| 18 mm | 88.4 | 57.3 | wide, energetic |
| 24 mm | 72.2 | 44.6 | wide-normal, kinetic type in a set |
| 35 mm | 53.1 | 31.4 | natural, explainer |
| 50 mm | 38.6 | 22.3 | natural/editorial |
| 85 mm | 23.3 | 13.2 | compressed, architectural, corporate, luxury |
| 135 mm | 14.8 | 8.3 | very flat, UI, graphic layouts |
In three.js directly: `camera.filmGauge = 35; camera.setFocalLength(mm)`. Wide lens + dolly-in = sucked into a tunnel of type (hype). Telephoto = near and far look the same size: tidy, flat, premium.

## Continuous drift (the camera never dies)
During every hold the camera keeps moving a little: dolly 1–2 % of its distance per 2 s, or yaw/pan 0.3–0.6°/s, or a slow orbit. Ease the drift in and out; it is what keeps a frame "breathing" while the viewer reads. Measured: reference camera alive in 90 % of holds, video-2 80 %, video-3 74 %.

## Camera moves that replace transitions
- **Dolly through.** Push the camera through a letter's counter (O, A, P, B, D) or a gap between words into the next scene; the counter becomes the frame. 10–16 f, `inOutQuart`, blur on.
- **Dutch angle turn.** The next phrase is laid out at 15° or 90°; the camera rolls to match while traveling, so the room seems to rotate. 12–18 f.
- **Match-cut acceleration.** Follow phrase A as the camera accelerates; cut at the peak velocity (thickest motion blur) to shot B already moving in the same direction and decelerating. The brain stitches one move.
- **Spatial continuity (world map).** Lay out all phrases of a section in one space — phrase 2 to the right of phrase 1 turned 90°, phrase 3 below on the floor… The camera travels and turns between them. The finished phrase recedes in perspective instead of vanishing. This is the "camera travel" rule from video-2 — but it only reads when the space has visible structure (set, grid, parallax layers, light).

## Depth of field
Focus pulls as a damped spring (ζ 0.8–1, 0.6–0.9 s) feel like a lens searching. Blur only what is really at another depth; a blurred flat plane reads as an error.
