# Studio tricks (the "dapur rahasia" of Buck / Ordinary Folk / DIA-level work)

Top studios rarely move letters one by one by hand. They use optical tricks, hidden 1–2 frame events and procedural systems, so the viewer thinks "anjir, ini bikinnya gimana?". Our engine renders every frame from a pure function of `t`, which makes most of these EASIER than in After Effects: a layer can be evaluated at any other time (`pose(t − d)`) for free.

## Two kinds — and how they count against the motif lock
| kind | tricks | rule |
|---|---|---|
| **Invisible craft** (physics polish, felt not seen) | smear on snaps, speed-reactive optics, tittle/counter micro-motion on hero words | allowed on every fast move of the film; does not count toward the 3 signature techniques |
| **Visible signatures** (the viewer notices the trick) | 1-frame impact, metaball merge, slit-scan / time displacement, echo stacking, kinetic wrapping | each one counts as one of the max 3 signature techniques; use at chosen moments only |

## Fit per recipe (`recipes.md`)
| recipe | good fits | avoid |
|---|---|---|
| Brutal / hype | 1-frame impact (invert/outline), smear, strong reactive optics, echo stacking | metaball, slow slit-scan |
| Character explainer | smear on slams, tittle bounce, impact frame on punchlines only, reactive optics | constant echo |
| Clean tech | very subtle reactive optics, counter-space jelly on the logo, kinetic wrapping ring for a product name | invert frames, smear on UI |
| Cinematic / editorial | slit-scan transitions (smooth gradient map), liquid metaball merges, subtle reactive optics | impact frames (one "heartbeat" at most) |
| Soft aesthetic | metaball / liquid morph, gentle slit-scan wave | impact, smear |
| Playful | tittle bounce, counter jelly, smear, metaball | — |
| Luxury | slow kinetic wrapping ring (gold), nothing else | smear, impact, echo |
| Data | counter pop on the last digit, nothing else | everything loud |
| Experimental (recipe 9) | slit-scan, reaction-diffusion, pixel sorting tied to speed/light, rule-based agents, analog resampling (`experimental-motion.md`) | random glitch presets, strobing > 3/s, three experiments at once |

---

## 1. Smear frame (anime) — the whip you feel but never see
- **Perception:** at peak speed (2–3 frames) the letter stretches like rubber along its path and snaps back exactly on landing. The brain doesn't register the deformation; it registers power.
- **Three anime smear types:** stretched (the shape elongates), multiples (2–4 copies along the path in one frame), streaks (speed lines from the trailing edge).
- **Numbers (1080 px frame):** starts above ~40 px/frame, full at ~120 px/frame; peak stretch 1.6–2.5× along the velocity, perpendicular 1/√stretch (keeps the mass); the **leading edge stays put and the trailing edge stretches** (anchor the scale at the front, not the centre); zero stretch on the landing frame.
- **Engine sketch (deterministic):**
  ```js
  // word sprite drawn at pose(t); velocity from the pose function itself, in px per frame
  const h = 1 / (2 * FPS), a = pose(t - h), b = pose(t + h);   // 2h = one frame
  const vx = b.x - a.x, vy = b.y - a.y;
  const v = Math.hypot(vx, vy), k = clamp((v - 40) / (120 - 40), 0, 1), s = 1 + k * (2.0 - 1);
  ctx.translate(lead.x, lead.y); ctx.rotate(Math.atan2(vy, vx));
  ctx.scale(s, 1 / Math.sqrt(s)); ctx.rotate(-Math.atan2(vy, vx)); ctx.translate(-lead.x, -lead.y);
  // multiples instead: draw pose(t - i/(3*FPS)) for i = 1..3 at alpha 0.5/0.3/0.15 only while k > 0
  ```
  Per-letter staggers give every letter its own speed → each smears differently (organic). Turn sub-frame motion blur off on smeared layers (blur + smear = mush).
- **Check:** `eye.py curve snap --frames 28 --travel 900` prints px/frame and the stretch per frame (only 2–3 frames should smear); `eye.py look render.mp4 --around 3.20 --span 7` shows them frame by frame.

## 2. 1-frame impact (sub-frame flash)
- **Perception:** on the exact landing frame of a keyword (or the hardest VO/bass hit) one frame — 1/30 s — becomes something else: the whole frame **inverted** (background becomes light, type dark), or **outline/wireframe** (strokes only), or a solid accent field with the word knocked out. Too fast to read, but the visual system takes the contrast explosion → punchy, addictive.
- **Sequence:** `[f1–3 snap + smear + CA spike] → [f4 IMPACT, 1 frame] → [f5–25 cushion, optics back to 0]`.
- **Budget and safety:** max one impact per 3–5 s; never more than 3 flashes in any 1 second (WCAG 2.3.1, MDN seizure-disorders guide; the engine's strobe modes already say "keep under 3 flashes/s"). `eye.py dna` counts 1-frame events and the worst flashes-per-second.
- **Engine sketch:** decide by FRAME INDEX, never by sub-sample time — with sub-frame motion blur, half the samples would be normal and the frame turns 50 % grey:
  ```js
  const f = Math.floor(t * FPS + 1e-6);           // the frame this sample belongs to
  post.invert = IMPACTS.includes(f) ? 1 : 0;      // add an `invert` uniform to post.js: col = mix(col, 1.0 - col, invert)
  // outline variant: on that frame draw the type with strokeText / an edge shader instead of fill
  ```
  Pair with the hit SFX and a 2–3 frame decaying camera shake.

## 3. Metaball / liquid morph (letters melting together)
- **Perception:** when two letters or words come close, a liquid bridge grows between them like mercury, then separates cleanly.
- **A — blur + threshold (the AE adjustment-layer trick):** draw the letters on a transparent layer → blur → sharpen the alpha again. From `motion-docs/08-css-svg-native/svg-filters/NOTES.md`: alpha row `0 0 0 m −k` = threshold at k/m with edge width 1/m; the classic `0 0 0 18 −7` (threshold 0.39); `stdDeviation` 8–15 for 40–80 px shapes. Bridges form when shapes are closer than ≈ 2σ. Blur rounds type corners, so composite the sharp original **atop** the goo (`feComposite operator="atop"` / show the glyph where it exists) and let only the bridges be liquid. In the engine: blur pass (the bloom code already has a separable gaussian) + `smoothstep(k − w, k + w, a)` on alpha.
- **B — SDF + smooth-min (sharpest):** glyphs as signed-distance fields (MSDF/SDF text) and combine with IQ's `smin` (`motion-docs/02-shaders-webgl/inigo-quilez/NOTES.md`; quadratic: `k *= 4; h = max(k − |a − b|, 0)/k; d = min(a, b) − h²·k/4`), tween `k` 0 → 20 px as they approach.
- **C — vector:** paper.js tangent metaballs for round parts (dots, tittles) with sharp, strokable edges (`07-creative-coding/paperjs/NOTES.md`).
- **Uses:** two words merging into one ("soft + ware"), a drop falling off a word, a tittle detaching and rejoining (with trick 5). Great for lab/liquid stories.

## 4. Slit-scan / time displacement (waves with zero keyframes)
- **Perception:** text that only moves straight bends, leans and twists organically while moving, and is perfectly whole again when it stops.
- **How:** every pixel shows the layer at a different time: `out(x, y, t) = layer(x, y, t − D·map(x, y))`, map 0–1 from a gradient (slanted = slit-scan lean), radial (bulge) or animated fbm noise (organic). White parts are "in the future", black parts are held "in the past".
- **Engine sketch:** the type layer is a pure function of t, so render it at K slices `t − (k/(K−1))·D` (K = 8–16, D = 0.1–0.4 s) into offscreen canvases and composite per pixel by `map` (blend the two nearest slices to avoid banding). In WebGL: slices in an atlas/array texture, the shader picks by map. Cost: K renders of the type layer only. When nothing moves, all slices are identical → whole again, automatically.
- **Use:** transitions and one hero line per section; keep D small on content words (readability).

## 5. Micro-secondary motion inside letters
- **Tittle bounce:** the dot of i/j and the dot of !/? live on their own. Body lands at f15; the dot keeps rising 25–40 % of cap height (apex ≈ f20), falls, lands on f28 with one small rebound (restitution 0.3–0.4) and a 2-frame squash (0.8 × 1.2) on contact. Build with dotless glyphs ı (U+0131) / ȷ (U+0237) and draw the dot yourself at the font's metrics, or split glyph contours with opentype.js (the tittle is the small contour above the x-height).
- **Counter-space lag:** the holes of O, P, A, D, B, R, e, a… keep moving/scaling 3 frames after the outer shape stops, on their own spring (ζ 0.5–0.6) → the letter feels thick and jelly-like. Needs path-level type (inner contours have opposite winding; fill even-odd).
- **Budget:** hero words, CTA, logo stings — 1–2 per section.

## 6. Echo stacking (valueAtTime snakes)
- **Perception:** a long 3D-looking tail of copies following the leader like a dragon; retro-futuristic / psychedelic, festival-grade when each copy shifts colour or is stroke-only.
- **AE form:** followers use `thisComp.layer(index − 1).transform.position.valueAtTime(time − 0.02)`.
- **Engine form (simpler, exact):** `for (let i = N; i >= 1; i--) drawWord(pose(t − i·d), styleOf(i)); drawWord(pose(t), lead)` with N 12–20, d 0.015–0.03 s, colour along a ramp from accent to background, or outline only, opacity 1 → 0.15, scale 1 → 0.96. For a springy snake, let follower i chase follower i−1 with a spring instead of a fixed delay.
- **Readability:** when the leader holds, the followers collapse into it → the word reads cleanly. Use on short words, one moment per film.

## 7. Speed-reactive optics (G-force lens)
- **Rule:** lens distortion and RGB split exist ONLY while something moves fast — sharp and clean at rest. Constant chromatic aberration or fisheye from start to end is an amateur tell (the eye measures it).
- **Numbers:** at rest CA ≈ 0.0005–0.0015 (radial, edges only — `react-postprocessing/NOTES.md`); at the snap/transition peak RGB split 15–25 px at 1080p (≈ 0.008–0.012 of width) along the velocity direction and barrel/pincushion ±0.3 (AE Optics Compensation ±30); attack instantly, release ≈ 10 %/frame.
- **Engine:** video-3's `velEnv(s, t)` in `aset/video-3/src/main.js` is exactly this envelope (peak-hold, release 0.9/frame, pure function of t). Map it: `post.ca = 0.0009 + 0.00012 * |velEnv|` (clamp to 0.012), and add a `lens` uniform (barrel: `uv' = c + (uv − c)·(1 + k·r²)`) driven the same way. The CA curve should look like the speed graph (`eye.py curve` shows it).
- **Check:** `eye.py dna` reports CA at rest vs during bursts; the tell fires when CA stays visible during holds.

## 8. Kinetic wrapping (type wrapped on an invisible object)
- **Perception:** a marquee of text wrapped into a ring/cylinder/sphere in 3D; the camera tilts (dutch 15–25°) and pushes through the ring's centre — instant level-up from left-right sliding text.
- **three.js:** `new THREE.CylinderGeometry(r, r, h, 128, 1, true)` (open-ended), material with a `CanvasTexture` of the strip (`wrapS = THREE.RepeatWrapping`, animate `texture.offset.x`), `side: THREE.DoubleSide`; back faces darker/blurred (render a BackSide copy dimmed at 30–40 % first, or use `gl_FrontFacing` in a shader). Strip resolution ≥ 4096 px for 1080p close-ups; set anisotropy to stop shimmer. Per-glyph alternative: place glyph meshes around the circle by advance width for crisp type.
- **Use:** product names, slogans, event titles; one ring per film is a signature.

---

## The pro "impact sequence" (combining invisible craft + one signature)
| frames | what | trick |
|---|---|---|
| f0–2 | anticipation dip 4 % | `snap` curve |
| f3–5 | snap 85 % of travel, letters stretched 1.6–2× from the leading edge, RGB split ramps to 18 px | smear + reactive optics |
| f6 | one inverted frame, camera shake starts | 1-frame impact |
| f7–26 | cushion; split back to rest by f12; shake decays | optics release |
| f15–28 | tittle keeps flying and lands on f28; counters settle 3 f after the body | micro-secondary |
Check it with `eye.py look --around <landing> --span 9` and `eye.py onion`.
