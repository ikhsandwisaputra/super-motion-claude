# Text item API (engine: `src/lib/stage.js` placement, `src/lib/text.js` painting)

Coordinates: `x`, `y` are 0–1 of the 1920×1080 frame at the focus plane, giving the baseline-left of the word (`align: "center" | "right"` changes the anchor). Values outside 0–1 are fine for phrases the camera travels to. `z` is depth in px units (+ toward the camera). Angles are degrees.

## Placement
| field | meaning |
|---|---|
| `t0` | entrance time (use `w(i)`) |
| `t1`, `exit` | exit time; `pixel` (disintegrate) · `fly` (toward camera) · `drop` · `cut` |
| `blk` | phrase block `{x, y, z, rx, ry, rz}` — pivot + plane rotation shared by its words |
| `z`, `rx`, `ry`, `rz` | per-word depth and tilt (tilts are damped ×0.5 / rz ×0.6 globally) |
| `in` | `slide` (default) · `fly` · `slam` · `flip` · `rise` · `drop` · `swing` · `whip` · `arc` · `focus` · `pip` · `popin` · `none` |
| `dir`, `dist`, `flyZ`, `T`, `zeta` | entrance direction / slide distance / fly depth / slam spring period and damping |
| `backAt`, `backZ`, `backRz`, `backRy`, `backColor`, `backBlur` | recede into the background when the camera moves on |
| `still` | no idle drift (surface text) |
| `scale`, `alpha`, `blur`, `crop` (allowed to leave frame), `overlapOk: ["word"]`, `sfx: false` | misc |

## Painting (inside the word's canvas)
| field | meaning |
|---|---|
| `font` | `conn` `ui` `content` `heavy` `heavyI` `emph` `brush` `marker` `pixel` `silk` `mono` |
| `size`, `color`, `grad` | px at 1080p; `grad: "white"` (default for white), `"hot"`, `"coral"`, `"pink"` |
| `extrude`, `extrudeColor` | stacked darker copies for a 3D slab look |
| `glow` | CSS colour of a soft glow behind the glyphs |
| `shadow: false`, `stroke`, `strokeColor` | — |
| `fx` | `smear` (per-letter chromatic smear, `stagger`) · `pop` (per-letter spring, `colors[]`) · `decode` (`dur`, `binary`) · `type` (`cps`, `caret`, `caretUntil`) · `wipe` (`dur`) · `none` |
| `tint`, `tintDelay` | colour tween after entering |
| `box`, `boxDelay`, `boxOff` | highlight marker behind the word (frames) |

## Panels (UI/data planes, same placement fields)
`panel({ x, y, w, h, t0, paint, static })`, where x is the left edge, y the centre and w/h in px. Painters live in `src/lib/panels.js`: `counter({t0, dur, to, suffix, size, color})` · `meter({t0, dur, n})` · `progress({t0, dur, to})` · `framework({tStatic, tBars})` · `tile({icon})` · `inputBar({text, t0, cps, sendAt, placeholder})` · `toast({title, sub, icon})` · `videoCard({snapshot, map, rewind})` · `strike({t0})` · `themeCard({kind, label})` · `arrow({t0})`.

## World text (lies in the voxel set)
`wtexts: [{ text, font, size, world: { pos: [x, y, z], rot: [-90, 0, rz], scale: 0.03 }, in: "rise", t0 }]`. Desk top is y ≈ 10.8 and its front edge z ≈ 7. One stage px is about 0.03 world units at `scale` 0.03.

## Type camera
`tcam: camPath([{t, px, py, yaw, pitch, roll, dolly}, {t, d, ease, ...}], drift)`. px/py pan in px. `py` < 0 moves content up (the camera looks lower). `yaw` < 0 puts the camera on the left, so content on the right recedes. `dolly` 0.1 is 10% closer. In voxel shots `couple: 0.004–0.01` also moves the room camera a fraction of the pan (parallax).
