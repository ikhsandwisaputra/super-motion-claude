---
name: motion-kinetic-type-3d
description: Design After Effects-grade 3D kinetic typography for motion videos — words on tilted planes at different depths, a type camera that dollies/orbits/rolls and travels from phrase to phrase, entrances chosen by word role (fly, slam, flip, rise, drop, swing, whip, smear, decode, typewriter), per-word highlight markers, text lying on surfaces in 3D sets, depth-of-field focus pulls, extrude/gradient/glow fills, and projected safe-area/overlap checks. Use it for any kinetic typography, animated captions/subtitles, lyric or quote animation, or whenever type in a motion piece feels "kaku", "plain", "lurus tok", flat, cramped or overlapping.
---

# 3D kinetic typography

Flat captions that just appear are the most obvious sign of a generic edit. In this style, type is a set piece: every phrase owns a place in 3D space, and the camera performs it.

## Principles (and why)
1. **Every word has a role, and the role picks its look and motion.** Viewers read hierarchy before content.
   | role | font (engine key) | size at 1080p | fill | default entrance |
   |---|---|---|---|---|
   | connector ("the", "it's", "and") | `conn` Inter 600 | 44–64 | white | slide / drop / typewriter |
   | content | `content` / `heavy` Poppins 800/900 | 70–200 | white gradient + soft shadow, `extrude` on big words | slide, fly, rise |
   | emphasis (one per phrase) | `emph` Anton condensed caps | 170–330 | red, `grad: hot/coral/pink`, extrude + glow | **slam** on the first syllable after a pause |
   | feeling | `brush` Kaushan | 100–170 | white or red | `fx: wipe` |
   | number / data | `pixel` VT323 via counter panel | 200–260 | orange or teal + glow | count-up (expo-out) |
   | UI / code / CTA | `mono`, input-bar panel | 20–40 | — | typewriter + caret |
2. **Phrases are planes, not lines.** Group a phrase into a block `{x, y, z, rx, ry, rz}` and tilt it gently. The engine halves rx/ry and scales rz by 0.6; strong tilts read as "miring". Use tight leading, mixed sizes, and words that may overlap a character on purpose.
3. **The camera travels between phrases.** When a phrase finishes, a `camPath` key moves the type camera (pan px/py + yaw/roll + dolly) for 0.4–0.55 s with inOutCubic and full motion blur. The finished phrase gets `backAt` so it recedes (back in z, blurred, dimmer, reddened) instead of vanishing, and the next phrase is revealed on the other side. Example: "SAME thing" → pan left → "What's the prompt?" → pan right on the slam → "WRONG".
4. **Depth is focus.** Blur grows with distance from `focusZ` (`dof` ≈ 0.009–0.011 px per unit). `in: "fly"` and `in: "focus"` make a word arrive out of focus and land sharp, the rack-focus look.
5. **Springs, not linear.** Pop-ins use ζ 0.6–0.7 with a small overshoot. Slides use quint-out over ~7 frames, with a ~3-frame alpha ramp and a 0.9→1 scale pop. Exits run faster than entrances: pixel disintegrate, fly at the camera, or recede.
6. **The marker follows the voice.** A highlight box (`box`) moves word to word with the VO and leaves when the next word lands (`boxOff` = frames to the next word).
7. **Text can live in the set.** Words lying on a desk or stuck to a wall (`wtexts` with `world: {pos, rot, scale}`) sell the 3D space. Keep them `still` and slightly above the surface, and away from bright practicals.
8. **Breathing room.** No word may sit on top of another unless intended (`overlapOk`). Nothing may leave the safe area while it is the phrase in focus.

## How to build a phrase (engine API in `references/type-api.md`)
```js
const A = { x: 0.6, y: 0.55, z: 70, rx: 5, ry: -18, rz: -5 };            // phrase plane
texts: [
  { blk: A, text: "everyone's", font: "content", size: 62, x: 0.515, y: 0.30, fx: "smear", t0: w(7), backAt: w(12) + 0.1 },
  { blk: A, text: "asking", font: "content", size: 118, x: 0.51, y: 0.415, fx: "smear", t0: w(8), backAt: w(12) + 0.1 },
  { blk: A, text: "SAME", font: "heavy", size: 240, x: 0.505, y: 0.69, fx: "smear", in: "fly", extrude: true, t0: w(10), backAt: w(12) + 0.1 },
],
tcam: camPath([{ t: w(7), px: 60, yaw: -3 }, { t: we(11) + 0.02, d: 0.5, px: -330, yaw: -20, roll: -3, dolly: 0.03 }]),
```
More patterns are in `references/recipes.md`: slam beat, focus-pull line with per-word marker, desk text, counter + label, list on a lateral truck, PiP card, CTA.

## Check before showing anyone
```bash
python -I tools/check_safe.py   # prints nothing when every word is inside the safe area and nothing overlaps
```
It projects each word's glyph box through the type camera at its settled moment and again just before the next camera move. Fix `BAD` lines by moving x/y or reducing size/z/tilt, and `OVERLAP` lines by spacing. Then look at full-res crops (the checker can't see glare behind text, or low contrast).
