---
tool: verlet integration / position-based dynamics (teknik)
version: teknik — rujukan kanonik: Jakobsen "Advanced Character Physics" (GDC 2001); verlet-js 1.0.0 (repo terakhir 2014-05-01, tidak dirawat); Müller "Ten Minute Physics" XPBD (repo pages @bfc4b63 2026-10-06); Vercel lanyard (2024). Dicek 2026-10-28
official: https://github.com/subprotocol/verlet-js · https://matthias-research.github.io/pages/tenMinutePhysics/ · https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber
local: 04-physics/verlet/web/jakobsen__advanced_character_physics__original_gdc2001.md, verlet/snippets/verlet-mini.mjs (implementasi teruji), verlet/repo-verlet-js/lib, ../_physics-math/repo-tenMinutePhysics/tenMinutePhysics/{14-cloth,10-softBodies,06-pendulum}.html
fetched: 2026-10-28
---
# Verlet / PBD / XPBD — kain berkibar, tali/lanyard, jelly/blob, robek, ditarik kursor: lunak, stabil, murah

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai sendiri (≈150 baris)**: kain/curtain 2D, tali/kabel yang digantung, garis "elastis" ditarik kursor, blob
  bertekanan, huruf yang "goyang" (titik kontrol path SVG dari partikel), robek. Ribuan partikel 2D di JS masih
  < 1 ms/step (cloth 24×16, 8 substep: **0.8 ms/step** di Node, terukur).
- **Pakai engine**: perlu tabrakan dengan rigid body kompleks/3D → Rapier 0.21 soft body (`SoftBodyDesc.rope/cloth/
  disk`) atau rantai rigid body + rope joint (react-three-rapier, pola Vercel badge); Matter.js `cloth`/`softBody`
  example = partikel lingkaran + constraint (jauh lebih mahal per partikel, tapi dapat collision gratis).
- **Jangan**: cairan (→ `../fluid-simulation`), gerak satu nilai UI (→ spring di `../_physics-math`).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Verlet tanpa velocity** (Jakobsen §2): simpan `x` dan `x*` (posisi lalu); `x' = 2x − x* + a·Δt²`
  ⇔ `x' = x + (x − x*) + a·Δt²`. Velocity implisit = jarak tempuh step terakhir → **apa pun yang memindah posisi
  (constraint, collision, kursor) otomatis mengubah velocity** — itulah kenapa stabil dan "nurut". Drag murah:
  `x' = 1.99x − 0.99x* + aΔt²` (Jakobsen) — di implementasi ini diganti `v·exp(−k·h)` agar frame-rate independent.
- **Collision = proyeksi**: titik yang menembus dipindah keluar; edit `x*` untuk restitution/friction (Jakobsen §3,
  friction ∝ kedalaman penetrasi §7).
- **Constraint relaxation** (Jakobsen §4): selesaikan tiap constraint lokal berulang (Gauss-Seidel). Stick:
  `delta = x2−x1; diff = (|delta|−rest)/|delta|; x1 += delta·0.5·diff; x2 −= delta·0.5·diff`; dengan massa:
  bobot `invmass1/(invmass1+invmass2)`; `invmass = 0` = pin. Jakobsen: untuk cloth **1 iterasi/frame cukup**,
  rigid/ragdoll 3–4; sqrt bisa diganti Taylor: `delta *= rest²/(delta·delta + rest²) − 0.5`.
- **XPBD (Müller)**: constraint `C(x)=0` dengan **compliance α** (kebalikan stiffness, tak tergantung jumlah iterasi):
  `α̃ = α/h²`, `s = −C / (Σ wᵢ|∇Cᵢ|² + α̃)`, `xᵢ += s·wᵢ·∇Cᵢ` (14-cloth.html `solveStretching`: `alpha = compliance/dt/dt;
  s = −C/(w + alpha)`). **Substep > iterasi**: 14-cloth.html pakai `numSubsteps 15` × 1 iterasi, 10-softBodies `10`
  (lihat juga Box2D Solver2D "smaller time steps are more effective than more iterations").
- **Rasa kaku vs lembek**: verlet-js/Jakobsen = stiffness 0..1 per iterasi (tergantung iterasi & fps!); XPBD = α fisik.
  Dengan unit px dan massa 1: lembek bila `α̃ ≳ w` → `α ≳ h²` (h=1/480 → ≈4e-6). Rentang berguna α: 0 (batang) …
  1e-6 (kain) … 1e-4 (karet).
- **2D cloth + shear diagonal bisa INVERSI sel** saat dilempar keras → residual stretch permanen (teruji: max strain
  1.03 setelah settle). Curtain 2D klasik (verlet-js, Jakobsen) cukup link struktural.
- **Hard grab vs soft grab** (teruji, `snippets/test-grab.mjs`): hard (`invMass=0` mengikuti kursor) pada kain yang
  di-pin → link dekat kursor meregang ekstrem selama drag (strain 109× dalam 30 frame; pulih setelah lepas); soft grab
  (tether XPBD α 1e-5) → strain 10×, lag 254 px; α 1e-4 → tanpa regangan berlebih, lag 369 px. Pilih sesuai rasa:
  hard = presisi, soft = "elastis & berat".

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
// inti (versi lengkap + builder rope/cloth/blob ada di snippets/verlet-mini.mjs)
export function createSim({ gravity = [0, 2000], substeps = 8, linearDamping = 0.6, bounds = null,
                            friction = 0.4, restitution = 0.2, grabCompliance = 0, max = 4096 } = {}) {
  const x = new Float32Array(max), y = new Float32Array(max), px = new Float32Array(max), py = new Float32Array(max);
  const w = new Float32Array(max), links = [], areas = [];
  let n = 0, grab = -1, grabW = 0, gx = 0, gy = 0;
  const addParticle = (X, Y, invMass = 1) => { x[n] = px[n] = X; y[n] = py[n] = Y; w[n] = invMass; return n++; };
  const link = (a, b, { compliance = 0, tear = Infinity, rest } = {}) =>
    links.push({ a, b, rest: rest ?? Math.hypot(x[a] - x[b], y[a] - y[b]), compliance, tear, alive: true });
  function solveLinks(h) {                                   // XPBD distance constraint + tearing
    for (const c of links) {
      if (!c.alive) continue;
      const { a, b } = c, ws = w[a] + w[b]; if (ws === 0) continue;
      let dx = x[a] - x[b], dy = y[a] - y[b]; const len = Math.hypot(dx, dy); if (len < 1e-9) continue;
      if (len > c.rest * c.tear) { c.alive = false; continue; }
      dx /= len; dy /= len;
      const s = -(len - c.rest) / (ws + c.compliance / (h * h));
      x[a] += dx * s * w[a]; y[a] += dy * s * w[a]; x[b] -= dx * s * w[b]; y[b] -= dy * s * w[b];
    }
  }
  function step(dt) {                                        // panggil dari fixed-step loop
    const h = dt / substeps, keep = Math.exp(-linearDamping * h);
    for (let s = 0; s < substeps; s++) {
      for (let i = 0; i < n; i++) {                          // Verlet predict
        if (w[i] === 0) continue;
        const vx = (x[i] - px[i]) * keep, vy = (y[i] - py[i]) * keep;
        px[i] = x[i]; py[i] = y[i];
        x[i] += vx + gravity[0] * h * h; y[i] += vy + gravity[1] * h * h;
      }
      if (grab >= 0 && !grabCompliance) { x[grab] = gx; y[grab] = gy; }
      solveLinks(h); /* solveAreas(h); collide(); — lihat file lengkap */
    }
  }
  return { x, y, w, links, get count() { return n; }, addParticle, link, step /* pick, drag, release */ };
}
```
Render: canvas `ctx.lineTo` per link, atau SVG `<path d>` dari partikel (Catmull-Rom → Bezier agar halus), atau
three.js `BufferGeometry` (update `position.needsUpdate`). Tidak ada resource untuk di-destroy selain loop rAF.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Default (snippet) | Efek | Rentang bagus |
|---|---|---|---|
| `substeps` | 8 | kekakuan & stabilitas (tanpa ubah compliance) | 4 mobile – 15 (Müller cloth) |
| `gravity` px/s² | 2000 | berat kain | 1000 (≈1 g @100 px/m) melayang – 4000 tegas |
| `linearDamping` 1/s | 0.6 | udara/kental, cepat tenang | 0.2 (berkibar lama) – 3 (madu) |
| link `compliance` α | 0 | kaku → elastis | 0 / 1e-6 kain / 1e-5–1e-4 karet |
| link `tear` (rasio panjang) | ∞ | robek saat regang > rasio | 1.5–2.5 |
| area `pressure` | 1 | blob mengembang/kempis | 1.05–1.3 "napas"; animasikan 1↔1.2 |
| ring/area compliance | 0 | blob kaku vs jelly | ring 1e-5, area 1e-6 (teruji: area 0.998–1.000) |
| `friction`, `restitution` (bounds) | 0.4, 0.2 | geser/pantul di dinding | — |
| `grabCompliance` | 0 | presisi vs tarikan elastis | 0, 1e-5, 1e-4 (lihat Mental model) |
| verlet-js `stiffness` | per-constraint 0..1 | kekakuan per iterasi (fps-dependent) | cloth example 0.9 |
| verlet-js `friction` / `groundFriction` / `gravity` | 0.99 / 0.8 / (0, 0.2) per frame | **per frame, bukan per detik** | — |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Loop**: akumulator fixed-step (Gaffer) di `../_physics-math`; panggil `sim.step(1/60)` atau `1/120`.
- **Pointer**: `pointerdown` → `sim.pick(x, y, r)`; `pointermove` → `sim.drag(x, y)` (pakai `getCoalescedEvents()` untuk
  path halus, MDN `_shared/.../pointerevent/getcoalescedevents`); `pointerup` → `sim.release(vx, vy)` dengan velocity
  dari history 100 ms (`../_physics-math/snippets/physics-math.mjs` `velocityFromHistory`). `setPointerCapture` agar
  drag tidak putus.
- **Rapier 0.21 alternatif native**: `SoftBodyDesc.rope(a, b, n).setPinnedParticles([0]).setSoftness(40, 1)`,
  `grid(...)` (kain 2D), `disk(c, r, n).setVolumeFactor(1.1)` (blob), material `tearStrain`. Lihat `../rapier/NOTES.md`.
- **R3F lanyard**: rantai rigid body + `useRopeJoint` + kurva Catmull-Rom (pola Vercel) di `../react-three-rapier/NOTES.md`.
- **GSAP/Motion**: animasikan *parameter* (pressure, gravity, pin target) — jangan posisi partikel langsung.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Curtain/hero cloth yang bisa disobek**
```js
import { createSim, cloth } from './verlet-mini.mjs';
const sim = createSim({ gravity: [0, 1800], substeps: 10, linearDamping: 0.8,
  bounds: { x0: 0, y0: -1e4, x1: innerWidth, y1: innerHeight } });
const ids = cloth(sim, 80, 40, 40, 24, 16, { pinEvery: 3, tear: 2.2 });
// pointerdown: sim.pick(x,y,30); move: sim.drag(x,y); up: sim.release(vx,vy)
// render: for (const c of sim.links) if (c.alive) ctx.moveTo(x[a],y[a]), ctx.lineTo(x[b],y[b]);
```
Kenapa terasa mahal: robekan menjalar karena regangan terkonsentrasi di tepi robek (fisika menentukan bentuk sobekan).

**2. Tali/kabel ke kursor dengan "berat"** — `rope(sim, ax, ay, bx, by, 24)` + ujung terakhir dipegang soft grab
(`grabCompliance: 5e-5`): kabel ketinggalan sedikit lalu menyusul, overshoot kecil.
Kenapa terasa mahal: lag + overshoot adalah tanda massa — kursor terasa menarik sesuatu yang nyata.

**3. Blob/jelly bertekanan (tombol "bernapas")**
```js
const ids = blob(sim, cx, cy, 80, 28, { pressure: 1, ringCompliance: 2e-5, areaCompliance: 1e-6 });
const area = sim.areas[0];
// napas: area.pressure = 1 + 0.08 * Math.sin(t * 2); hover: dorong partikel dekat kursor
// render: SVG path halus (Catmull-Rom tertutup) dari (x[i], y[i]) → fill gradient
```
Kenapa terasa mahal: tekanan (area constraint) + ring lembek = jiggle volumetrik, bukan scale tween palsu.

**4. Huruf/ikon "jelly" (shape matching ringan)**: partikel = titik kontrol path glyph; tiap step tarik partikel ke
posisi rest yang di-transform (translasi + rotasi rata-rata) dengan `damp` per partikel; ini **shape matching**
(Müller; Rapier 0.21 `setShapeMatching(true)` + `shapeMatchingSoftness {naturalFrequency, dampingRatio}`).
Kenapa terasa mahal: bentuk selalu kembali sempurna tetapi tiap titik telat sesuai jarak dari kursor.

**5. Lanyard 2D DOM tanpa engine**: rope 6–8 segmen + kartu = 4 partikel + 6 stick (4 sisi + 2 diagonal = rigid di
2D; analog tetrahedron 4 partikel/6 constraint di Jakobsen §5, "3 or 4 iterations should be enough") dengan pin di
atas; render kartu dari 2 partikel atas (sudut = atan2), tali sebagai path SVG.
Kenapa terasa mahal: kartu benar-benar berayun dari titik gantungnya, bukan rotate keyframe.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Typed arrays + loop datar; hindari objek per partikel. 384 partikel/728 link: ~0.8 ms/step (8 substep, Node 24).
  Mobile: substeps 4–6, partikel < 1000. Pindah ke GPU (ping-pong texture / WebGPU compute) bila > ~10k partikel.
- Stabil: XPBD + substep tidak meledak walau stiff; tetap clamp dt (spiral of death) dan batasi kecepatan saat
  release (lemparan 10k px/s menembus bounds).
- `prefers-reduced-motion`: jalankan N step offscreen lalu render statis; atau damping tinggi + tanpa gravity tilt.
- Ketergantungan fps: verlet-js memakai konstanta **per frame** (gravity 0.2/frame, friction 0.99/frame) → beda rasa
  di 120 Hz; snippet di sini memakai dt + `exp(−k·h)` (teruji: posisi ujung tali 60 vs 120 Hz selisih ~5 px setelah 2 s
  ayunan chaos).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `web/jakobsen__advanced_character_physics__original_gdc2001.md` — artikel asli GDC 2001 (kode utuh; arsip teknikus.dk).
- `web/jakobsen__advanced_character_physics__gamedeveloper.md` — salinan Game Developer (loop `for` terpotong; pakai yang asli).
- `web/vercel__interactive_3d_event_badge_r3f.md` — lanyard R3F + Rapier (kode prototipe & final).
- `snippets/verlet-mini.mjs`, `snippets/test-verlet.mjs`, `snippets/test-grab.mjs` — implementasi + tes (rope, cloth, tear, blob, dt).
- `repo-verlet-js/lib/{verlet,constraint,objects}.js` + `examples/{cloth,spiderweb,tree,shapes}.html` — referensi klasik.
- `../_physics-math/repo-tenMinutePhysics/tenMinutePhysics/14-cloth.html` (XPBD cloth + grab), `10-softBodies.html`
  (tet volume constraint), `06-pendulum.html` (substepping), `15-selfCollision.html`, `05-bead.html` (PBD dasar).
