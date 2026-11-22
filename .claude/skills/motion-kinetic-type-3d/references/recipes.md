# Typography recipes (all used in a delivered film)

`w(i)`/`we(i)` = word start/end, `F(n)` = n frames. All snippets go inside a shot's `texts`, `tcam`, `post`, `shake`.

## Slam beat (the counter-claim)
VO pause → bed cut to silence → on the first syllable:
```js
const SLAM = w(15), C = { x: 0.8, y: 0.55, z: 50, rx: 3, ry: -12, rz: -3 };
{ blk: C, text: "WRONG", font: "emph", size: 250, x: 0.57, y: 0.5, color: "#fff4e8", in: "slam", t0: SLAM, extrude: true, extrudeColor: "#5a0008", glow: "rgba(255,255,255,0.5)" },
{ blk: C, text: "QUESTION.", font: "emph", size: 108, x: 0.62, y: 0.64, color: "#fff4e8", in: "whip", t0: w(16), extrude: true },
shake: [{ t: SLAM, amp: 22 }],
post: (t) => { const k = (t - SLAM) * 30, o = {}; if (k >= -2 && k < 0) { o.blurX = 40; o.ca = 0.006; } if (k >= 0 && k < 2) o.flash = k < 1 ? 0.9 : 0.55; if (k >= 0 && k < 10) o.ca = 0.014 * (1 - k / 10); return o; },
// camera arrives fast on the hit:
{ t: SLAM - F(3), d: 0.34, px: 190, yaw: 16, roll: 2.5, dolly: 0.1, ease: ease.outCubic }
```
Background swap (orange → red) and the hero's pose burst happen on the same frame. The previous phrase gets `backAt: SLAM` (red, blurred, tilted away).

## Quiet line with a marker per word + focus pull
```js
const mark = (i) => ({ box: PAL.red, boxOff: Math.round((w(i + 1) - w(i)) * 30) });
const l1 = centerRow(row(0, 0.47, 86, "conn", [{ text: "Because", t0: w(17), ...mark(17) }, { text: "Claude", t0: w(18), ...mark(18) }], { in: "slide", dist: 0.015, blk: L1, backAt: ALONE }));
const l2 = centerRow(row(0, 0.60, 86, "conn", [...words].map(...), { in: "focus", backAt: ALONE }));   // arrives blurred, lands sharp
```

## Text lying on the desk (camera crane-down shot)
```js
const onDesk = (pos, rz = 0, sc = 0.034) => ({ pos, rot: [-90, 0, rz], scale: sc });
wtexts: [
  { text: "And he", font: "content", size: 64, world: onDesk([-17, 10.8, 3.2], 4), in: "rise", t0: w(44) },
  { text: "turned", font: "heavy", size: 92, world: onDesk([-17.2, 10.8, 6.6], 4, 0.033), in: "rise", t0: w(46), extrude: true },
]
```
Keep these away from the lamp's light pool and from bright paper; white on cream disappears.

## Counter + label (real numbers only)
```js
panel({ x: 0.05, y: 0.4, w: 820, h: 250, in: "fly", t0: w(87) - 0.05, paint: counter({ t0: w(87), dur: 1.3, to: 250, suffix: "MB" }) }),
{ text: "official motion docs.", font: "content", size: 80, x: 0.06, y: 0.6, t0: w(93) },
// next number lives to the right; the camera travels there
{ t: w(96) - 0.22, d: 0.5, px: 700, yaw: -10, roll: 2 }
```
Add a tick SFX per counter step (`cue(t + i*0.08, "tick", -26, 0.9 + i*0.04)`).

## List on a lateral truck (one tile per word)
```js
const STEP = 0.42, truck = camPath([{ t: S, px: -40 }, ...items.slice(1).map((_, i) => ({ t: w(a + 1 + i) - 0.3, d: 0.55, px: (i + 1) * STEP * W - 40 }))]);
texts: items.flatMap(([icon, label], i) => [
  panel({ x: 0.36 + i * STEP, y: 0.42, w: 300, h: 300, t0: w(a + i) - 0.06, paint: tile({ icon }) }),
  { text: label, font: "heavy", size: 72, x: 0.36 + i * STEP, y: 0.7, in: "rise", t0: w(a + i), extrude: true },
])
```

## PiP shrink + rewind ("this video is the tutorial")
```js
panel({ x: 0.2, y: 0.44, w: 1150, h: 660, z: -40, ry: 6, in: "pip", pipFrom: 0.72, t0: S,
  paint: videoCard({ snapshot: env.snapshot, map: (t) => Math.max(2.5, 41 - (t - S) * 13.5), rewind: [S + 0.25, S + 2.85] }) })
```

## Calm monochrome section
Thin `conn` type, `shadow: false`, `in: "focus"` or `fx: "type"`, no red, post `{ sat: 0, contrast: 0.06, grain: 0.035 }`. Use crossfades (`xfade`) between galaxy → planet + input pill → dot sphere + arrow → moon.

## CTA
Hero points at the card. "Comment" (heavy) + KEYWORD (emph, teal, slam) + `inputBar` typing the keyword with the send button lighting up, then a `toast` whipping in bottom-right. Use a near-static camera and hold 5–8 s with the bed still audible.
