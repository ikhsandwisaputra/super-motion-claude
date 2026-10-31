# Engine API

## Contents
1. Shot schema · 2. Backgrounds and sets · 3. Room camera views (coordinates) · 4. Characters and props · 5. Transitions · 6. Post parameters · 7. Sound declarations · 8. Determinism rules

## 1. Shot schema
```js
{
  id: "S4", t0, t1,                       // contiguous; from word times
  // ONE of:
  bg: (g, t) => orangeBg(g, t),           // flat 2D background (overscanned, follows camera at a fraction)
  set: "room", view: (t) => ({ pos:[x,y,z], look:[x,y,z], roll, fov, focusDist, aperture, maxblur, bloom, exposure }),
  bgZoom: (t) => 0.1 * (t - t0),          // extra push on flat backgrounds
  ui: (g, t) => codeUI(g, t, t0),         // monitor screen canvas (1280x720), room shots
  tcam: camPath([...]),                   // type camera (also moves flat bg + effects)
  couple: 0.008,                          // room camera follows a fraction of tcam pan
  focusZ: 0, dof: 0.011,                  // type-layer depth of field
  chars: [...], props: [...], texts: [...],   // stage layer (screen-anchored, in front of the set)
  wchars: [...], wtexts: [...],           // inside the voxel room (billboards / surface text)
  extra: (g, t, P) => {},                 // 2D effects between background and stage; P(x,y,z) projects through tcam
  over: (g, t) => {},                     // screen-space overlay on top (callouts)
  post: (t) => ({ flash, ca, blurX, mode, sat, ... }),
  shake: [{ t, amp }],
  fast: (t) => bool,                      // force 6 motion-blur samples
}
```

## 2. Backgrounds
`bg2d.js`: `orangeBg`, `redBg`, `blackRing(g, t, {cx, cy, r, a})`, `desktop(g, t, {title})`, `profile(g, t, {t0, name, sub})`, `slopRibbon(g, t, t0)`, `radial`.
`scenes2.js`: `storm(g, t, t0, {zoom, bolts:[{t, seed, x0,y0,x1,y1}]})`, `galaxy`, `planet`, `moon`, `dotSphere`, `gridVoid(g, t, {horizon, speed})`, `blackSoft(g, t, tint)`, `themeBg(g, t, "football|fashion|science|food", t0)`.

## 3. Room camera views (voxel world units)
- **Desk room** (x −45…45). Desk top y≈10.6–10.8, centred x 0, z −7…7 (front edge z=7). Monitor screen centre (0, 20.4, −2.7), 18.8×10.6. Lamp head (−7.6, 19, −2.3). Shelves at x −34 and 30, z −13, y 14–38. LED slats x 9–18, y 21–36 on the back wall. Plant (13.5, 12–21, −3.5). Mug (9, 11.7, −4.5).
  - Front: pos (−7,17.5,46)→(−4.5,17.2,39.5), look (2.5,18,−3), fov 33.
  - Crane top-down: pos (6,36,30)→(2,31,24.5), look (−1.5,10.6,2.5), fov 46.
  - Monitor 3/4: pos (−12,23,31)→(−9,22.5,27), look (3,19.8,−3).
  - Monitor close: pos (4,21,15)→(3,20.6,12.5), look (0,20,−3).
  - Library close-up on shelves: pos (−36,26,16), look (−37,25.5,−13), focusDist 6, maxblur 0.026, exposure 0.65–0.75.
  - Pull-out reveal: pos z −5.5 → 30 over 3.2 s at x −33.
- **Red-carpet stage** (centre SX=160). Carpet disc radius 22 at y 0.5. Softbox (118,17,−19): never put text in front of it. PROMPT sign (138,14,−11.5). Hero anchor (152,0.5,0), cube (167,0.5,2), wpx 0.26 / 0.2.
  - Wide: pos (178,24,56)→(170,21,47), look (158,9,−4).
  - Hero close: pos (138,15,31)→(142,14,26), look (154,10,−2).
  - CTA blurred: pos (123,11,37), look (145,8,0), aperture 0.006.

## 4. Characters and props
- **Hero** poses: `idle point pointUp think surprised celebrate present clap hold fall back`. Expressions: `normal happy surprised closed determined`. Mouths: `smile open flat`.
- **Cube:** `expr` (`normal happy surprised closed`), `look` (−1/0/1), `hop: 1` (no burst), automatic blinking.
- Stage char: `{kind, x, y (feet), z, px (screen px per sprite px), keys, flip, burstIn, t0, t1}`. Functions of t are allowed for x/y/px.
- Props: `prop({ name, x, y, px, t0, t1, z, phase, wobble })`. Names: `qmark bang bulb spark brain folder book bookT wrench palette film note ball orb aa wave speaker promptSign clap fileSmall`. Add more as pixel grids in `sprites.js` → `PROP` (rows must have equal length).

## 5. Transitions (`trans.push({ at, type, pre, post, ... })`, frames)
| type | look | typical |
|---|---|---|
| (none) | hard cut on a phrase start | ~50% of cuts |
| `mosaic` | red/white/black cells flip in → hold → reveal B; `partial` 0.4–0.5 for angle changes; `seed`, `inF`, `hold`, `outF` | pre 5 post 6 (full) / 3+4 (partial) |
| `whipMosaic` | A whips out with blur, mosaic covers the cut | pre 8–9 post 6, section turns |
| `glitch` | RGB slices + cyan bars → black → B | pre 2 post 2, into quiet lines |
| `pixelate` | block size grows, 2 black frames | pre 4 post 2 |
| `halftone` | growing squares sweep diagonally | pre 3 post 4 |
| `fgwipe` | huge blurred hero crosses the lens | pre 3 post 3 |
| `light` | diagonal light blades → white → B | pre 3 post 8 |
| `flash` | 1–2 white frames on B | pre 0 post 2 |
| `smash` | accelerating push-in to a point (`cx`, `cy`), cut | pre 6 post 2 |
| `xfade` | soft dissolve | calm section only |
The PiP shrink is a panel entrance (`in: "pip"`), not a transition.

## 6. Post parameters (per frame, from `shot.post(t)`)
`flash` 0–1 (+`flashColor`), `ca` chromatic aberration (base 0.0011, hits 0.01–0.014), `blurX/blurY` directional blur px, `pix` block size, `glitch` 0–1, `mode` hook strobe (2 red duotone, 3 cyan duotone, 5 overexposed; keep under 3 flashes/s), `sat` (base 1.07; 0 for monochrome), `contrast` (0.14), `glow` (bloom amount 0.32), `exposure`, `grain` (0.02), `warm`, `vig`.

## 7. Sound declarations (read by tools/mix.py)
- `cue(t, name, db, rate)`, where name is a file in `audio/sfx/` or a synth: `tick pop dissolve decode riser_soft`.
- `bed.push({ t0, t1, kind })`, where kind is `hook red dark lofi lofi2 storm cosmic cta`. Gaps between sections are silence; use them before punchlines.

## 8. Determinism rules
- No `Math.random`, `Date`, or `performance.now` in the film. Use `hash(...)` / `rng(seed)` from `util.js`.
- Time comes only from `t`. Springs are closed form (`spring(t, T, zeta)`, `kick`). Particles are pure functions of t.
- EffectComposer renders with an explicit delta of 1/30. Fonts are awaited before the first frame.
- Anything stateful (reaction-diffusion, feedback trails, colliding agents, pixel-sort accumulation) is BAKED: one sequential pass with a seeded RNG and a fixed timestep writes its state per frame (image sequence or JSON), and the film reads frame `f`. Render workers take frames in any order, so a simulation never continues "from the previous frame" inside a worker (`motion-taste/references/experimental-motion.md` §3).
