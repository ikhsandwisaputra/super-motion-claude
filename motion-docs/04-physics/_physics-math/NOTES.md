---
tool: _physics-math (cheat sheet fisika untuk UI motion)
version: n/a — sumber: Gaffer "Fix Your Timestep!" & "Integration Basics"; Driscoll 2016; Holden "Spring-It-On" 2021; Juckett "Damped Springs"; Catto "Solver2D" 2024; Motion v14.7.1 src (@9ba8846, 2026-10-27); Ariya kinetic scrolling 2013; Apple WWDC18 #803; Holko 2014 (rubber band); Müller Ten Minute Physics (@bfc4b63 2026-10-06). Dicek 2026-10-28
official: https://gafferongames.com/post/fix_your_timestep/ · https://theorangeduck.com/page/spring-roll-call · https://github.com/motiondivision/motion
local: 04-physics/_physics-math/web/*.md, _physics-math/raw-motion-v14.7.1/*.ts, _physics-math/snippets/physics-math.mjs (+ test-math.mjs), _physics-math/repo-tenMinutePhysics/
fetched: 2026-10-28
---
# Physics math untuk motion — pegas, redaman, momentum, rubber-band, lempar, timestep (rumus + JS kecil, semua bersumber)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
| Perilaku UI | Model | Kenapa |
|---|---|---|
| Elemen mengejar target (cursor follower, magnetic button, retarget di tengah jalan) | pegas massa-redaman (closed form / semi-implicit Euler) | mewarisi velocity saat target berubah → tidak "patah" |
| Nilai yang dihaluskan (parallax, scroll smoothing, sensor gyro) | exponential damping `1 − e^{−λdt}` | frame-rate independent, 1 parameter (half-life) |
| Lempar/flick lalu meluncur & berhenti | exponential decay (τ) + projection + snap | meniru scroll iOS; target bisa diketahui di awal |
| Tarik melewati batas | rubber band asimptotik (iOS c = 0.55) lalu pegas balik | resistansi naik, tidak pernah lewat batas dimensi |
| Banyak objek saling tabrak | engine (Matter/Rapier) + fixed timestep | jangan reinvent collision |
| Kain/tali/jelly | PBD/XPBD substeps (`../verlet`) | stabil di dt besar |
Jangan: integrasi explicit Euler untuk pegas (menambah energi — Gaffer, k=15, b=0.1, dt=1/100 tetap meledak);
`lerp(a, b, 0.1)` per frame tanpa dt (rasa berubah 2× di 120 Hz).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
**1. Osilator teredam** — `m·x'' + c·x' + k·(x − g) = 0`; `ω0 = √(k/m)`; `ζ = c / (2√(k·m))`; `ωd = ω0·√(1 − ζ²)`
(Motion `spring.ts`: `dampingRatio = damping / (2·√(stiffness·mass))`, `undampedAngularFreq = √(stiffness/mass)`).
Error `e = x − g`, kecepatan awal `v0`:
- ζ < 1: `e(t) = e^{−ζω0t}·(e0·cos ωd t + ((v0 + ζω0e0)/ωd)·sin ωd t)`
- ζ = 1: `e(t) = e^{−ω0t}·(e0 + (v0 + ω0e0)·t)`
- ζ > 1: jumlah dua eksponensial dengan laju `ζω0 ± ω0√(ζ²−1)`
(bentuk sama dengan resolver Motion `spring.ts` & Holden "spring_damper_exact"; tanda velocity Motion dibalik internal.)
Turunan (diverifikasi numerik di `snippets/test-math.mjs`): **overshoot** `OS = e^{−πζ/√(1−ζ²)}` (ζ 0.5 → 16.3%,
0.7 → 4.6%, 0.75 → 2.8%); **settle** (envelope ke ε): `t ≈ −ln ε / (ζω0)` (ζ ≤ 1).

**2. Parameter perseptual ↔ fisik (Motion v14.7.1, `raw-motion-v14.7.1/…generators__spring.ts`)**
- `bounce → ζ`: `ζ = max(1 − bounce, 0.05)` (bounce ≥ 0); `ζ = 1/max(1 + bounce, 0.05)` (bounce < 0, overdamped) — "as SwiftUI does".
- `visualDuration → ω0`: `ω0 = 2π / (1.2·visualDuration)` (× skala Newton untuk overdamped), `k = ω0²`, `c = 2ζ√k`, m = 1.
- `duration + bounce` (tanpa visualDuration) → `findSpring` (Newton 12 iterasi pada envelope; `safeMin 0.001`).
- Default fisik: stiffness 100, damping 10, mass 1 (→ ζ 0.5, OS 16.3%, ω0 10 rad/s, settle ≈1.06 s ke 0.5%).
  Default waktu: duration 800 ms, bounce 0.3; shorthand `spring(visualDuration = 0.3, bounce = 0.3)`.
- Rest: `restSpeed 2`, `restDelta 0.5` (|Δ| ≥ 5); granular (|Δ| < 5): 0.01 / 0.005.
- **Spring berbasis waktu (duration/bounce/visualDuration) MENGABAIKAN velocity warisan** (`inheritVelocity = isTimeDefined
  ? 0 : …`, komentar: velocity dari animasi terinterupsi bikin osilasi besar). Untuk hand-off gesture (lempar → pegas)
  pakai `stiffness/damping/mass`.
- Gotcha v14.7.1: `isTimeDefined` hanya true bila `duration` atau `bounce` diberikan; `visualDuration` saja → jatuh ke
  default 100/10/1 (dokumen `plans__030…md`, 2026-06: bug sejak Nov 2024). Selalu kirim `bounce` bersama `visualDuration`.
- Contoh terukur (m = 1): vd 0.3/b 0.3 → k 304.6, c 24.43, ζ 0.70, OS 4.6%, settle 2% 0.34 s · vd 0.5/b 0 → k 109.7,
  c 20.94, ζ 1, 0.56 s · vd 0.8/b 0.5 → k 42.8, c 6.54, ζ 0.5, OS 16.3%, 1.23 s. ⇒ `visualDuration ≈ waktu sampai
  terlihat tiba (±2%)`.
- Holden: `damping = 4·ln2 / halflife`; `stiffness = (2π·f_Hz)²`; kritis `damping = 2√stiffness`.
- Box2D/Rapier: kekakuan diberikan sebagai **Hz + damping ratio** (mass-independent). Jaga `Hz ≤ ½ step rate`
  (30 Hz di step 60 Hz, Nyquist — Catto); substep memungkinkan Hz lebih tinggi.

**3. Smoothing frame-rate independent** (Driscoll; Holden "damper_exact")
`a = lerp(a, b, 1 − r^dt)` (r = sisa setelah 1 s) ≡ `a = lerp(a, b, 1 − e^{−λ·dt})`, `λ = −ln r = ln2/halflife`.
Konversi kebiasaan lama: `lerp(a, b, f)` per frame @fps ⇒ `λ = −fps·ln(1 − f)` (f 0.1 @60 → λ 6.32/s, half-life
110 ms; kode yang sama @120 fps → half-life 55 ms — 2× lebih "nervous"; teruji).

**4. Fixed timestep** (Gaffer): akumulasi waktu frame, step `dt` tetap selama `acc ≥ dt`, clamp frameTime 0.25 s
(anti "spiral of death"), render `lerp(prev, cur, α = acc/dt)`. Matter Runner 0.20 punya akumulator **tanpa** α;
react-three-rapier punya α (clamp 0.5 s); Rapier mentah tidak punya keduanya.

**5. Integrator** (Gaffer Integration Basics; Jakobsen)
- explicit Euler `x += v·dt; v += a·dt` → pegas mendapat energi (tidak stabil);
- **semi-implicit (symplectic) Euler** `v += a·dt; x += v·dt` → stabil & murah, order 1 — default untuk UI;
- **Verlet** `x' = 2x − x* + a·dt²` (order 2, symplectic; velocity implisit → constraint/collision cukup memindah posisi);
- **RK4** order 4, 4× evaluasi gaya, "not automatically the best"; untuk pegas UI, **closed form** (§1) lebih baik:
  eksak untuk dt berapa pun.
- Aturan praktis stabilitas semi-implicit Euler pada pegas: `ω0·h < 2` (analisis stabilitas linear, [UNVERIFIED sumber
  lokal]); teruji stabil: k = 1500 (ω0 38.7) @ h = 1/60. Lebih kaku → substep (`h = dt/n`).

**6. Substepping** (Catto Solver2D; Müller XPBD): "smaller time steps are more effective than more iterations";
XPBD: `α̃ = α/h²`, `s = −C/(Σw|∇C|² + α̃)`; Müller cloth 15 substep × 1 iterasi. Soft constraint Box2D:
`ω = 2πHz; a1 = 2ζ + ωh; a2 = hωa1; a3 = 1/(1 + a2); biasRate = ω/a1; massCoeff = a2·a3; impulseCoeff = a3`.

**7. Momentum / decay (scroll-view style)**
- Ariya (kinetic scrolling pt 2): `amplitude = 0.8·v` (v px/s), `target = x0 + amplitude`,
  `x(t) = target − amplitude·e^{−t/τ}`, **τ = 325 ms** ("mimic iOS"), berhenti ≈ 6τ ≈ 1.95 s (sisa 0.25%),
  per frame @60 Hz faktor `e^{−16.7/325} ≈ 0.95`.
- Motion `inertia` default: `power 0.8`, `timeConstant 325`, `restDelta 0.5`, boundary spring `bounceStiffness 500`,
  `bounceDamping 10`; `modifyTarget(ideal)` = snap target. **Drag** Motion: `timeConstant 750`, `restDelta 1`,
  `restSpeed 10`, boundary spring 200/40 (dragElastic aktif) atau 1e6/1e7 (dragElastic 0).
- **Kontinuitas velocity** (diturunkan): kecepatan awal kurva = `amplitude/τ`; agar = v (tanpa "loncat" saat lepas)
  `amplitude = v·τ`. Default 0.8 dengan τ 325 ms → mulai **2.46×** lebih cepat dari jari; Motion drag τ 750 → 1.07×.
- Projection (WWDC18 #803: "project" momentum dengan `UIScrollView.DecelerationRate`): rate d per ms ⇒
  `jarak = (v/1000)·d/(1 − d)` (deret geometri, diturunkan), `τ = −1/ln d`. d = 0.998 → 0.499·v (τ 499.5 ms);
  d = 0.99 → 0.099·v (τ 99.5 ms). Nilai 0.998/0.99 untuk normal/fast **[UNVERIFIED — tak ada di sumber lokal]**.

**8. Rubber band**
- iOS (Holko, mengutip tweet chpwn): `f(x, d, c) = (x·d·c)/(d + c·x)`, `c = 0.55`, x = jarak melewati tepi,
  d = dimensi viewport. `f'(0) = c` (55% mengikuti jari di awal), `f(∞) → d` (tak pernah melebihi dimensi).
  d = 800: 100 → 51.5, 400 → 172.5, 800 → 283.9, 4000 → 586.7 (teruji).
- Motion drag: **linear** `mix(max, point, dragElastic)` = `max + 0.35·(point − max)` (default 0.35) — tanpa saturasi.

**9. Estimasi velocity lempar**
- Motion `PanSession.getVelocity(history, 0.1)`: ambil sampel pertama yang > 100 ms sebelum sampel terakhir,
  `v = Δpos/Δt` (px/s); jika itu titik pointerdown dan selisih > 200 ms, pakai `history[1]` (hold-then-flick). Pan mulai
  setelah 3 px (`distanceThreshold`). Diam > 100 ms sebelum lepas ⇒ v ≈ 0 (teruji) → tidak ada "lemparan palsu".
- Ariya pt 1/2: sampel tiap 100 ms, `v = 1000·Δ/(1 + elapsed)`, EMA `velocity = 0.8·v + 0.2·velocity`.
- Sampel lebih rapat: `PointerEvent.getCoalescedEvents()` (MDN `_shared/mdn-content/files/en-us/web/api/pointerevent/getcoalescedevents/index.md`).

**10. Satuan engine** — Matter: velocity px/16.67 ms, gravity 0.001 px/ms² ≈ 1000 px/s²; Rapier: SI (9.81 m/s²;
@100 px/m = 981 px/s²; velocity cap 400×lengthUnit). 1 g pada skala 100 px/m ≈ default Matter.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
// pegas kritis eksak (Holden simple_spring_damper_exact) — dt berapa pun, tanpa overshoot
export function criticalSpringStep(s, goal, halflife, dt) {
  const y = (4 * Math.LN2 / halflife) / 2;                // halflife_to_damping / 2
  const j0 = s.x - goal, j1 = s.v + j0 * y, e = Math.exp(-y * dt);
  s.x = e * (j0 + j1 * dt) + goal;
  s.v = e * (s.v - j1 * y * dt);
  return s;
}
// pegas umum (ζ bebas): semi-implicit Euler + substep
export function springStep(s, goal, k, c, dt, substeps = 4, m = 1) {
  const h = dt / substeps;
  for (let i = 0; i < substeps; i++) { s.v += ((-k * (s.x - goal) - c * s.v) / m) * h; s.x += s.v * h; }
  return s;
}
export const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));
export const rubberband = (x, d, c = 0.55) => (x * d * c) / (d + c * x);
export const springFromVisual = (vd, bounce = 0) => {             // Motion mapping (m = 1)
  const z = bounce < 0 ? 1 / Math.max(1 + bounce, 0.05) : Math.max(1 - bounce, 0.05);
  const w0 = (2 * Math.PI) / (vd * 1.2);
  return { stiffness: w0 * w0, damping: 2 * z * w0, mass: 1 };
};
export function velocityFromHistory(h, windowMs = 100) {          // h: [{x,y,t}] naik
  if (h.length < 2) return { x: 0, y: 0 };
  const last = h[h.length - 1]; let i = h.length - 1;
  while (i > 0 && last.t - h[i].t <= windowMs) i--;
  const dt = (last.t - h[i].t) / 1000;
  return dt > 0 ? { x: (last.x - h[i].x) / dt, y: (last.y - h[i].y) / dt } : { x: 0, y: 0 };
}
export function createLoop({ dt = 1 / 60, maxFrame = 0.25, step, render }) {   // Gaffer
  let acc = 0, last = performance.now() / 1000;
  return (nowMs) => {
    const now = nowMs / 1000; acc += Math.min(now - last, maxFrame); last = now;
    while (acc >= dt) { step(dt); acc -= dt; }
    render(acc / dt);                                        // α untuk interpolasi prev→cur
  };
}
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Rasa | Parameter | Angka awal |
|---|---|---|
| "snappy, tanpa pantul" (toggle, menu) | ζ = 1, visualDuration | 0.25–0.35 s (bounce 0) |
| "hidup, sedikit pantul" (kartu, modal) | ζ 0.7–0.8 (OS 2–5%) | vd 0.35–0.5, bounce 0.2–0.3 |
| "playful/jelly" | ζ 0.4–0.5 (OS 16–25%) | vd 0.5–0.8, bounce 0.5–0.6 |
| cursor follower halus | critical spring half-life | 60–120 ms (dekat), 200–400 ms (lazy) |
| parallax/gyro smoothing | damp λ | 6–12 /s (half-life 60–115 ms) |
| flick "ringan" vs "berat" | τ decay | 200–325 ms berat · 500–750 ms licin |
| overscroll | rubber band c | 0.55 iOS; 0.3–0.4 kaku; 0.6–0.8 elastis (konvensi Kivy, [UNVERIFIED]) |
| pegas kontak/joint engine | Hz, ζ | ≤ ½ step rate; ζ 0.7–1 |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Motion**: `transition={{ type: 'spring', stiffness, damping, mass, velocity }}` untuk hand-off gesture;
  `{ type:'spring', visualDuration, bounce }` untuk transisi terkoreografi (bounce wajib diberi, lihat §2).
  `type:'inertia'` + `modifyTarget` untuk snap setelah flick; `dragElastic` untuk overscroll linear.
- **Matter/Rapier**: velocity pointer (§9) → `Body.setVelocity(b, v/60)` (Matter, px per 16.67 ms) /
  `rb.setLinvel(v/S)` (Rapier, m/s).
- **GSAP/Lenis**: nilai fisika dihitung di loop sendiri (fixed step), lalu `gsap.set`/`quickSetter`; jangan tween
  properti yang juga ditulis simulasi.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Carousel flick yang mendarat tepat di kartu (projection + snap + pegas)**
```js
const v = velocityFromHistory(history).x;                          // px/s
const tau = 325, projected = x + v * (tau / 1000);                 // velocity-continuous
const target = Math.round(projected / cardW) * cardW;              // snap
const sp = { x, v };                                               // lanjutkan dengan pegas (warisi v!)
const { stiffness: k, damping: c } = springFromVisual(0.45, 0.15);
const frame = createLoop({ dt: 1 / 120, step: (dt) => springStep(sp, target, k, c, dt), render: () => draw(sp.x) });
// requestAnimationFrame loop: (function f(t) { frame(t); requestAnimationFrame(f); })(performance.now());
```
Kenapa terasa mahal: tujuan dipilih dari momentum jari (WWDC "projection"), kecepatan awal tidak loncat, pendaratan
sedikit memantul.

**2. Overscroll iOS asli**: saat drag lewat batas, `offset = edge + rubberband(pull, viewportH)`; saat lepas →
`criticalSpringStep(..., edge, 0.12, dt)` dengan `v` dari §9.
Kenapa terasa mahal: resistansi makin berat & asimptotik, balik tanpa osilasi.

**3. Magnetic button**: target = posisi kursor × 0.3 dalam radius; `criticalSpringStep` half-life 90 ms per sumbu;
saat kursor keluar target = 0 (spring mewarisi velocity → sedikit "terlempar" saat lepas).
Kenapa terasa mahal: tak ada easing yang bisa me-reset velocity di tengah gerak.

**4. Gyro/scroll smoothing yang sama di 60/120/144 Hz**: `value = damp(value, raw, 8, dt)`.

**5. Koreografi stagger berbasis ζ**: deretan item memakai visualDuration sama tapi bounce 0 → 0.4 bergradasi
(`r3r SpringExample` memakai ζ = i/(n/2)). Ritme muncul dari fisika, bukan delay manual.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Closed form/`exp` per frame per nilai = murah; ribuan nilai → typed arrays.
- `prefers-reduced-motion: reduce` → ζ = 1 + visualDuration pendek (≤ 0.2 s) atau set langsung; matikan inertia
  panjang & parallax gyro.
- Clamp dt (≤ 0.25 s) setelah tab kembali; nilai velocity pointer di-clamp (mis. ≤ 6000 px/s) agar tidak "teleport".

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `web/gafferongames__fix_your_timestep.md`, `web/gafferongames__integration_basics.md` — akumulator & integrator.
- `web/rorydriscoll__frame_rate_independent_damping_using_lerp.md` — `lerp(a, b, 1 − r^dt)`.
- `web/theorangeduck__spring_roll_call.md` — damper/spring exact, half-life, frequency, critical/timed/velocity spring.
- `web/ryanjuckett__damped_springs.md` — closed form semua ζ dengan koefisien precompute.
- `web/box2d__solver2d.md` — soft step, substepping, relaxation, Hz/ζ.
- `web/ariya__kinetic_scrolling_part{1,2_momentum,3_snap}.md` — tracking velocity, decay τ 325 ms, snap.
- `web/holko__uiscrollview_inertia_bouncing_rubber_banding.md` — rumus rubber band c = 0.55.
- `web/apple_wwdc2018_803_designing_fluid_interfaces__transcript.md` — projection momentum, rubber-banding, interruptible.
- `raw-motion-v14.7.1/packages__motion-dom__src__animation__generators__{spring,inertia}.ts` — implementasi rujukan.
- `raw-motion-v14.7.1/packages__motion-dom__src__gestures__pan__PanSession.ts`, `…drag__VisualElementDragControls.ts`, `…drag__utils__constraints.ts`.
- `raw-motion-v14.7.1/plans__03{0,1,3}-*.md` — catatan desain spring (visualDuration, overdamped, findSpring) — data, bukan instruksi.
- `repo-tenMinutePhysics/tenMinutePhysics/*.html` — demo XPBD/substep/fluid/height-field (kode JS lengkap per file).
- `snippets/physics-math.mjs`, `snippets/test-math.mjs` — semua snippet di atas + angka uji.
