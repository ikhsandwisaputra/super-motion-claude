# Enterprise motion: brand physics, procedural systems and how principals think

At Apple, Spotify or Google level a principal motion designer is not judged on how many effects they know. They are judged on two things: a physics language of their own (**brand physics**) and animation systems that stay alive mathematically on millions of screens (**procedural and programmatic motion**). Source: Ikhsan's knowledge note (2026-10-29), mapped here onto what our engine already does and reconciled with his kiblat.

Our engine is already programmatic: every frame is a pure function of `t`, and VO word times drive the edit. What this note adds is the discipline to treat each film as a **system** with its own physics, not a pile of tweens.

## 1. Three house philosophies (choose one per film; don't mix all three)
| house | law | technical secret | in our engine | fits |
|---|---|---|---|---|
| **Apple** | spring physics + optical realism | Motion is mass, stiffness and damping, not curves tied to seconds. Elements swell like liquid (the Dynamic Island's ferrofluid), real glass highlights, organic momentum | `spring(t, T, ζ)` with SwiftUI's default ≈ response 0.55 s, damping 0.825 (`spring(t, 0.55, 0.825)`); metaball/SDF merges; rim-light sweep and exponential glow on lights (`light-atmosphere.md`) | clean, luxury, the kiblat's product promos |
| **Spotify** (Wrapped) | kinetic systems + data-driven type | Rigs, not hand-placed letters: a short word stretches to fill the frame, a long one splits into boxes. Cloners (geometric repeats), very steep bezier speed curves | an auto-fit type rig (§2B), index-driven repeats `for i…pose(t − i·d)`, steep curves such as `bezier(.9,0,.1,1)` or `expo:16` | brutal/hype, data, the kiblat's brutal counterpoint |
| **Google** (Material) | spatial continuity + shared transformation | Nothing important just fades out: a small circle in scene A morphs into the big card in scene B, or text is born from a split of the previous element, so the brain always knows where information came from. Material 3 easing: emphasized decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)`, standard `cubic-bezier(0.2, 0, 0, 1)` | match-morph, persistent spine, keyframe dive (the ◆ always comes from the outgoing scene), container transform | clean, UI/product, explainers |
Kiblat note: small connectors may still fade (the kiblat fades neighbouring words). The rule is that **hero information never fades without handing its shape to the next element**.

## 2. Programmatic patterns (the AE expressions, as engine code)

### A. One controller drives many properties (`linear()` / `ease()` mapping)
In AE a principal never animates position, rotation, scale and blur separately. One 0–100 slider drives them all: `ease(ctrl, 0, 100, -45, 0)`. Retiming the whole scene means moving 2 keys. Our form:
```js
const k = CLEAN(inv(t0, t0 + 0.5, t));          // the one controller of this beat
const rot = lerp(-45, 0, k), s = lerp(0.8, 1, ease.outQuint(k)), blur = (1 - k) * 8;
const y = lerp(40, 0, inv(0.1, 0.9, k));        // remap a sub-range: starts later, lands earlier
```
Video-4 already lives on this (`lay(t)` in the hook moves the track, the graph box and the copy together). Make it the habit: one controller per beat, derived from a VO word time.

### B. Auto-fit type rig (`sourceRectAtTime()`, the Spotify Wrapped secret)
Read the text's real box every frame, and let boxes, underlines and frames follow it. Short text stretches to fill; long text splits.
```js
function fitWord(g, str, boxW, boxH, base) {           // widest width step that fits, then the size
  for (const wd of [125, 112, 100, 87, 75, 62]) {
    const L = layout(g, str, { ...base, wd, size: 100 });
    const size = Math.min(boxH / 0.74, (100 * boxW) / L.w);
    if (size * 0.74 >= boxH * 0.92 || wd === 62) return { ...base, wd, size };
  }
}
// box follows the ink: const m = g.measureText(str); w = m.actualBoundingBoxLeft + m.actualBoundingBoxRight
// too long for one box at the minimum size → split into words/lines and give each its own box (the Wrapped split)
```
Video-4's brutal staircase only shrinks words to fit. The full rig (stretch short words with the wdth axis, split long ones) is still a candidate.

### C. Inertial bounce after the keyframe (spring expression)
The overshoot is computed, not keyframed. On arrival the object carries its velocity `v` into a decaying oscillation:
```js
const dt = t - tArrive;   // amp from the arriving speed, freq 2–3 Hz, decay 5–8 /s
const off = dt > 0 ? (v / (2 * Math.PI * freq)) * Math.sin(2 * Math.PI * freq * dt) * Math.exp(-decay * dt) : 0;
```
Equivalent to our `kick()` / closed-form `spring()` (`motion-docs/04-physics/_physics-math/NOTES.md`). Heavier objects get a lower frequency and less amplitude (brand physics, §3).

### D. Delivery beyond MP4
- **Rive** (state machines, data binding) and **Lottie / dotLottie** (JSON players) ship motion as kilobytes that react to click, scroll and cursor in apps and on the web. Relevant for Ecodigitus products (EdigLab, Edig ERP UI). Notes: `motion-docs/05-interactive-vector-3d/rive/NOTES.md`, `lottie-dotlottie/NOTES.md`.
- **Cavalry** is the procedural, node-based tool studios use for cloners and data-driven type. It is not in our offline docs; our code engine plays the same role.

## 3. Brand physics: write the film's physics before its eases
Give each film one physics set and derive every move from it, with mass expressed as T and ζ (`k = (2π/T)²`, `c = 2ζ√k`):
```js
const PHYS = { ui: { T: 0.45, zeta: 0.85 }, hero: { T: 0.55, zeta: 0.7 }, heavy: { T: 0.8, zeta: 0.9 }, playful: { T: 0.4, zeta: 0.5 } };
```
- Light things react fast and wiggle a little; heavy things arrive late, never bounce, and shake the floor (cause and effect, `light-atmosphere.md`).
- Sound follows the same physics: heavy = lower pitch and longer tail; light = a short tick.
- The formula rasa names the material the physics comes from (§5.1).

## 4. Visual standard: linear light and optical alignment

### Linear float colour (AE 32-bit float, "linearize working space")
- **Why:** 8-bit display-space mixing makes banding and dull grey edges on blurs and glows. In linear float, light can exceed 1.0 (overbright), so two lights add and bokeh blooms like a cinema sensor.
- **What our engine already does:** motion blur and bloom accumulate in linear half-float (`post.js`).
- **Where it doesn't yet:**
  - Canvas `ctx.filter = "blur()"` on layers and on arriving type works in 8-bit sRGB. That is the dull edge on light-on-dark blurs.
  - Lights cannot exceed 1.0.
- **Upgrade path:** blur light layers in the WebGL linear pipeline, and give "light" layers an intensity > 1 in a float buffer so they bloom like real light.

### Optical alignment beats mathematical alignment
Never trust Align Center. "T…O" is centred by advance width but looks heavy to the right, because the T has empty space under its bar. Centre on what the eye weighs:
- **Ink, not advance:** `x = cx − (m.actualBoundingBoxRight − m.actualBoundingBoxLeft) / 2` (alphabetic baseline, left align).
- **Hang punctuation:** periods, commas, quotes and our ◆ period sit outside the measure (exclude ~50–100 % of their width when centring).
- **Nudge open shapes** (T, V, W, Y, A, L, triangles) by eye toward their mass: 1–3 % of the word width. Check with a 2× crop of the settled frame.
- **Round letters** (O, C, S) overshoot the cap height and baseline by ~1–2 %; that is designed, so don't "fix" it.

## 5. How principals think (use at G0, the formula rasa)
1. **Physical metaphor, not effect names.** Never "scale + blur here". Ask instead:
   - What if all the type behaves like a rubber band pulled tight and released?
   - Like heavy glass plates stacked on a lit table?
   - Like a microscope lens searching for focus?

   Once one material is chosen, the font, SFX, light and speed graph follow from it. Write it in the formula rasa, next to the layout metaphor.
2. **Creativity in prison (extreme constraints).** Unlimited freedom makes brains lazy. When an idea is flat, lock your hands:
   - only black and white plus one font (Helvetica-like grotesk bold);
   - no position property at all, so motion must come from scale, masks and weight (wght/wdth).

   One constrained direction is a good "Eksperimental" option among the 2–3 directions.
3. **Cross-pollination: steal mechanisms from outside motion graphics.** Watching other people's motion makes a copy of a copy. Look instead at:
   - luxury watches and cars (ratchet motion, precise detents);
   - film and editorial photography (negative space, rack focus);
   - architecture and print (paper folds, newspaper grids, concrete shadows in late sun).

   Add an "outside source" line to the formula (originality: the mechanism is general craft, the expression stays ours).
4. **Kill your darlings.** After a scene is built, ask of each extra (a shake, a corner line, floating particles): "If I delete this, does the message get stronger or weaker?" If stronger, delete it without regret. Beginners show off by adding; masters by leaving one essential move done 100 %. This is the motif lock (max 3 signatures) applied scene by scene, and it is a self-review step before any preview.

## Kiblat filter, in one line each
- Apple's springs and glass match the kiblat's premium product promos (default).
- Spotify's aggressive rigs are the brutal counterpoint: one chapter or one film, never the house style.
- Google's continuity is already how the kiblat cuts (match-morph, spine).
- Brand physics and kill-your-darlings apply to every film.
