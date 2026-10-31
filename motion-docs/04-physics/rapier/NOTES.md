---
tool: rapier (JS/TS bindings, 2D & 3D, Rust→WASM)
version: 0.21.0 (semua paket @dimforge/rapier{2d,3d}[-simd|-deterministic][-compat], npm 2026-09-25; core Rust 0.36.0) — dicek 2026-10-28
official: https://rapier.rs/docs/user_guides/javascript/getting_started_js
local: 04-physics/rapier/repo-rapier/bindings/typescript (src.ts = API + JSDoc, CHANGELOG.md), rapier/web/user_guides_js (guide JS ter-render), repo-rapier/website/docs (template guide + docs-examples)
fetched: 2026-10-28
---
# Rapier — physics engine WASM cepat (2D/3D) untuk scene tactile berat: ratusan–ribuan body, CCD, joint, soft body, replay deterministik

> **Penting 2026**: repo `dimforge/rapier.js` & `dimforge/rapier.rs` sudah **di-merge** ke monorepo `dimforge/rapier`
> (bindings di `bindings/typescript`, docs di `website/`). Folder `repo-rapier.js/` & `repo-rapier.rs/` = arsip
> (CHANGELOG berhenti di 0.19.3); sumber terbaru = `repo-rapier/`.

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai**: banyak body (pile ratusan huruf/kartu), objek cepat yang tak boleh tembus (CCD otomatis vs collider fixed
  sejak 0.20), joint/motor (rope, spring, revolute + PD motor), character controller, **soft body native (0.21: rope,
  cloth, blob bertekanan, FEM jelly, tearing)**, determinisme/snapshot (rewind, bake-and-scrub), 3D.
- **Jangan**: mainan DOM kecil (<100 body) yang butuh setup instan tanpa init async → **Matter.js**; React/R3F →
  pakai **react-three-rapier** (tapi ia masih pin Rapier 0.19.2 — fitur 0.20/0.21 belum ada); efek kain/tali "UI"
  yang cukup 1 fungsi → solver verlet sendiri (`../verlet`).
- Paket (bindings README + CHANGELOG 0.15):
  | paket | kapan |
  |---|---|
  | `@dimforge/rapier2d` / `rapier3d` | bundler yang paham `.wasm`; build default (deterministik **lokal** saja) |
  | `…-compat` | tanpa bundler / bundler rewel: wasm di-embed base64 (paket lebih besar), **wajib `await RAPIER.init()`**; sejak 0.20 file pindah ke `dist/` (`dist/rapier.mjs`, `.cjs`, `.d.ts`) — URL CDN yang di-pin ke file root harus ditambah `dist/` |
  | `…-simd` / `…-simd-compat` | lebih cepat, butuh wasm simd128 (0.15.1 memperbaiki build simd-compat yang dulu tidak emit SIMD) |
  | `…-deterministic` / `…-deterministic-compat` | determinisme **lintas platform** (sejak 0.15 build biasa tidak lagi `enhanced-determinism`) |
  Halaman guide "Determinism" masih bilang JS "fully cross-platform deterministic" — **usang**, ikuti README bindings.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **SI units** (m, kg, s). Rapier di-tune untuk objek seukuran manusia dalam meter; sprite 100×100 px sebagai collider
  100 m → semua tampak **slow-motion** (common_mistakes). Dua opsi: (A) dunia dalam meter + faktor skala render
  (mis. 50–100 px/m, rekomendasi docs), (B) dunia dalam px + `world.lengthUnit = pxPerMeter` (menskalakan toleransi
  "normalized"; **gravity & semua nilai lain tetap harus dalam px**).
- **Velocity cap (core 0.35 / JS 0.20)**: kecepatan linear dipotong tiap substep di `normalized_max_linear_velocity`
  = 400 × `lengthUnit` unit/s, rotasi ~45°/step (CHANGELOG core v0.35.0-beta.0). Dunia px dengan `lengthUnit` = 1 →
  lemparan mentok 400 px/s = terasa "mati". Selalu set lengthUnit atau pakai meter.
- **Default kontak 0.35+**: prediction distance 0.02 (normalized; speculative contacts), allowed linear error 0.005,
  max corrective velocity 3.0, kontak vs fixed lebih kaku (`static_contact_softness`). Restitution sekarang diterapkan
  pass akhir-step → pantulan speculative sesuai koefisien (fix 0.35).
- **Solver**: `numSolverIterations` default 4 = **substep** solver (guide: "iterations, aka. substeps"; 8–12 untuk scene
  berat, 1–2 kalau ngirit), `numInternalPgsIterations` 1. Kontak = constraint lunak (natural frequency + damping ratio,
  bukan stiffness → tak tergantung massa).
- **CCD (0.20+)**: semua dynamic body cepat otomatis di-sweep vs collider **fixed** (tidak untuk shape mesh/polyline
  dinamis); `setCcdEnabled(true)` = "bullet" yang juga sweep vs kinematic/dynamic. `maxCcdSubsteps = 0` mematikan
  semua CCD. Murah-meriah untuk objek tipis: `setSoftCcdPrediction(dist)`.
- **Sleeping (0.35)**: island tidur/bangun sebagai satu unit; threshold linear 0.05 (diukur di titik terjauh body),
  `time_until_sleep` 0.5 s (dulu 2 s) → pile cepat diam & murah.
- **Stepping**: `world.step(eventQueue?, hooks?)` maju **tepat** `world.timestep` (default 1/60). Tidak ada akumulator
  bawaan → tulis fixed-step + interpolasi sendiri (resep #2; teori di `../_physics-math`).
- **Memori WASM**: objek `World`, `EventQueue`, controller harus `.free()`; event `Temp*` hanya valid di dalam closure
  drain; handle = integer (simpan Map handle→DOM).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
import RAPIER from '@dimforge/rapier2d-compat';     // compat: wasm embedded
await RAPIER.init();                                // non-compat: const RAPIER = await import('@dimforge/rapier2d')

const world = new RAPIER.World({ x: 0, y: 9.81 }); // y-ke-bawah = koordinat DOM; konsisten dgn CSS rotate(+rad)
world.timestep = 1 / 60;
const ground = world.createCollider(RAPIER.ColliderDesc.cuboid(10, 0.1).setTranslation(5, 6));
const body = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(5, 0).setLinearDamping(0.2));
const col = world.createCollider(
  RAPIER.ColliderDesc.roundCuboid(0.6, 0.2, 0.18).setRestitution(0.3).setFriction(0.6)
    .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS), body);
const events = new RAPIER.EventQueue(true);        // autoDrain = true (disarankan)
// loop: world.step(events); events.drainCollisionEvents((h1, h2, started) => {...})
// teardown:
function destroy() { events.free(); world.free(); }  // world.free() membebaskan semua set internal
```
`RAPIER.reserveMemory(extraBytesCount)` (0.17.2) untuk pre-alloc sekali setelah init bila spawn massal. Profiling:
`world.profilerEnabled = true` lalu `world.timingStep()` dst (0.18).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Default | Efek ke feel | Rentang bagus |
|---|---|---|---|
| `world.gravity` | (diberi user) | berat dunia | UI "berat": 1.5–3 g (Vercel badge pakai −40 m/s²) |
| `world.timestep` | 1/60 | presisi | tetap konstan; frame 120 Hz → 2 step 1/120 lebih halus |
| `world.numSolverIterations` | 4 | rantai/tumpukan kaku | 8–12 berat, 2 mobile |
| `world.lengthUnit` | 1 | skala toleransi + velocity cap | = px per meter bila dunia dalam px |
| `world.maxCcdSubsteps` | 1 | multi-impact per step | 0 = matikan CCD, 2–4 objek super cepat |
| `RigidBodyDesc.setLinearDamping/AngularDamping` | 0 / 0 | drag udara | 0.5–2 "berat/kental"; badge Vercel 2/2 |
| `setGravityScale` | 1 | per-body float | 0 = melayang, negatif = naik |
| `setDominanceGroup` | 0 [-127..127] | siapa tak bisa didorong | kursor/player besar positif |
| `lockRotations()` / `setEnabledRotations` | — | label tetap tegak | teks yang harus terbaca |
| `setCcdEnabled` / `setSoftCcdPrediction` | false / 0 | anti-tembus vs body bergerak | bullet kecil; soft-CCD untuk benda tipis |
| `setAdditionalSolverIterations` | 0 | presisi island tertentu | 4 untuk rantai/rantai lanyard |
| `ColliderDesc.setFriction` | 0.5 (Average) | geser | 0.2 licin – 1+ lengket (Rapier tak bedakan static/dynamic friction) |
| `setRestitution` | 0 (Average) | pantul | 0.3–0.6 UI, 0.9 bola |
| `setFrictionCombineRule` / `setRestitutionCombineRule` | `Average` | rule pemenang per pasangan: `Max > Multiply > Min > Average` | Max pada restitution = "satu bouncy cukup". Guide menyebut juga `GeometricMean`/`ClampedSum` (core Rust 0.35) tapi enum JS 0.21 hanya `Average, Min, Multiply, Max` |
| `setDensity` / `setMass` | 1.0 / — | massa | ganti salah satu, yang lain diabaikan |
| `setContactSkin` | 0 | celah kontak (stabil, murah) | kecil (≤1% ukuran) agar celah tak terlihat |
| `setCollisionGroups(0xMMMMFFFF)` | 0xffff_ffff | layer 16 bit membership << 16 \| 16 bit filter | dua arah harus cocok |
| `setSensor(true)` + `ActiveEvents.COLLISION_EVENTS` | false / NONE | trigger zona | hover zone, magnet |
| `setContactForceEventThreshold` + `CONTACT_FORCE_EVENTS` | 0 | event gaya kontak | bunyi/haptic ∝ gaya |
| `JointData.spring(rest, k, c, a1, a2)` | — | pegas antar body | docs r3r: `c = ζ·2√(k·m)` |
| `JointData.rope(len, a1, a2)` | — | tali (hanya batas jarak maks) | lanyard, ayunan |
| motor `configureMotorPosition(target, stiffness, damping)` | — | PD servo pada joint | `configureMotorModel(MotorModel.AccelerationBased \| ForceBased)`; "AccelerationBased = gain tak tergantung massa" [UNVERIFIED lokal — guide merujuk docs.rs MotorModel]; core 0.35.2: aktuator MJCF dimuat `ForceBased` (gain = gaya absolut) |
| `SoftBodyDesc.setSoftness(hz, ζ)` (0.21) | — | kekakuan soft body sebagai frekuensi | 20–60 Hz, ζ≈1; jaga ≤ ½ step rate (Nyquist, lihat `../_physics-math`) |
| `world.createPidController(kp, ki, kd, axes)` | — | body dinamis mengejar target | contoh docs kp 60, ki 0, kd 0.8 |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **DOM / Canvas2D**: simpan `Map(handle → {el, w, h})`; render dari `body.translation()` × skala, `body.rotation()`
  (2D = angle rad). Interpolasi `alpha = acc/dt` (resep #2).
- **three.js vanilla**: sama; 3D `rotation()` = quaternion `{x,y,z,w}` → `mesh.quaternion.set(...)`, slerp untuk interpolasi.
- **R3F**: pakai `react-three-rapier` (`../react-three-rapier`).
- **Debug**: `const { vertices, colors } = world.debugRender()` — line segments (2D: 4 float per segmen, 8 warna)
  → contoh Pixi di guide getting_started_js.
- **Scroll (Lenis/GSAP)**: jangan step di `gsap.ticker` dengan dt variabel; pakai akumulator. Scroll velocity →
  `body.applyImpulse` atau ubah `world.gravity` (bangunkan: setter body pakai argumen `wakeUp = true`).
- **Hover/pick via ray cast** (scene_queries.ts):
  ```js
  const ray = new RAPIER.Ray({ x: px / S, y: py / S }, { x: 0, y: 1 });
  const hit = world.castRay(ray, 0.01, true);            // (ray, maxToi, solid, filterFlags?, groups?, excludeCollider?, excludeBody?, predicate?)
  if (hit) { const c = hit.collider; const p = ray.pointAt(hit.timeOfImpact); }  // 0.13: .toi → .timeOfImpact
  // titik di dalam collider: world.intersectionsWithPoint({x,y}, (collider) => { …; return true; })
  ```
- **Character controller** (kinematic, menghormati rintangan): `const cc = world.createCharacterController(0.01)`;
  `cc.setMaxSlopeClimbAngle(45*Math.PI/180)`, `cc.enableAutostep(0.5, 0.2, true)`, `cc.enableSnapToGround(0.5)`;
  per step: `cc.computeColliderMovement(collider, desired)` → `rb.setNextKinematicTranslation(add(rb.translation(),
  cc.computedMovement()))`; `world.removeCharacterController(cc)` saat selesai. Cocok untuk "maskot" yang berjalan di
  atas elemen DOM (collider = rect elemen).
- **Collision → audio/haptic**: `ActiveEvents.CONTACT_FORCE_EVENTS` + threshold; `drainContactForceEvents(e =>
  e.totalForceMagnitude())`. Catatan 0.35.2: impuls kontak yang dilaporkan kini total per step (turun ~1/(iter+1)
  dibanding sebelumnya) → re-tune threshold saat upgrade.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Pile DOM (pill/huruf) dengan skala meter → px**
```js
const S = 100;                                   // px per meter
const items = [...document.querySelectorAll('.pill')].map((el, i) => {
  const w = el.offsetWidth, h = el.offsetHeight;
  const rb = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic()
    .setTranslation((40 + Math.random() * (innerWidth - 80)) / S, (-h - i * 50) / S)
    .setRotation((Math.random() - 0.5) * 0.6).setAngularDamping(0.5));
  // kapsul horizontal: roundCuboid(halfW - r, halfH - r, r) → sudut bulat = pill
  const r = h / 2 / S;
  world.createCollider(RAPIER.ColliderDesc.roundCuboid(w / 2 / S - r, h / 2 / S - r, r)
    .setRestitution(0.35).setFriction(0.5), rb);
  return { el, w, h, rb, prev: { x: 0, y: 0, a: 0 } };
});
```
Kenapa terasa mahal: satuan meter membuat gravity, CCD, sleeping & velocity cap bekerja seperti yang di-tune engine-nya.

**2. Fixed step + interpolasi (anti-judder 60/120 Hz)**
```js
let acc = 0, last = performance.now();
function frame(now) {
  acc += Math.min((now - last) / 1000, 0.25); last = now;          // clamp: spiral of death
  while (acc >= world.timestep) {
    for (const it of items) { const t = it.rb.translation(); it.prev = { x: t.x, y: t.y, a: it.rb.rotation() }; }
    world.step(events);
    acc -= world.timestep;
  }
  const a = acc / world.timestep;
  for (const it of items) {
    if (it.rb.isSleeping()) continue;
    const t = it.rb.translation(), r = it.rb.rotation();
    const x = (it.prev.x + (t.x - it.prev.x) * a) * S, y = (it.prev.y + (t.y - it.prev.y) * a) * S;
    const ang = it.prev.a + (r - it.prev.a) * a;
    it.el.style.transform = `translate(${x - it.w / 2}px,${y - it.h / 2}px) rotate(${ang}rad)`;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```
Kenapa terasa mahal: gerak licin di layar 120 Hz tanpa mengubah dt fisika (simulasi tetap stabil & reproducible).

**3. Pegang–lempar: kinematic saat drag, dynamic + velocity pointer saat lepas**
```js
function onDown(rb) { rb.setBodyType(RAPIER.RigidBodyType.KinematicPositionBased, true); }
function onMove(rb, px, py) { rb.setNextKinematicTranslation({ x: px / S, y: py / S }); } // tiap frame/step
function onUp(rb, vxPx, vyPx) {                                   // velocity px/s dari history pointer
  rb.setBodyType(RAPIER.RigidBodyType.Dynamic, true);
  rb.setLinvel({ x: vxPx / S, y: vyPx / S }, true);
}
```
Kenapa terasa mahal: selama drag body kinematic tetap **mendorong** tetangganya dengan kecepatan yang dihitung dari
next-translation (bukan teleport), dan lemparan mewarisi kecepatan jari. Alternatif lebih "berbobot": tetap dynamic
dan kejar pointer dengan `PidController.applyLinearCorrection(body, target, {x:0,y:0})` — body bisa tertahan tabrakan.

**4. Tali/lanyard**: (a) rantai rigid body + `JointData.rope(len, {x:0,y:0}, {x:0,y:0})` (pola Vercel badge, lihat
`../react-three-rapier`), atau (b) **0.21** soft rope:
```js
const ropeDesc = RAPIER.SoftBodyDesc.rope({ x: 8, y: 9 }, { x: 12, y: 9 }, 25)
  .setPinnedParticles([0]).setSoftness(40.0, 1.0);          // Hz, damping ratio
const rope = world.createSoftBody(ropeDesc);
rope.attachParticle(24, weightBody);                         // ujung dikaitkan ke rigid body
const pts = rope.particlePositions();                        // Float32Array (2 float/partikel di 2D) → path SVG/canvas
```
Kenapa terasa mahal: tali ikut bertabrakan dengan dunia dan rigid body, bukan cuma kurva dekoratif.

**5. Blob bertekanan / jelly (0.21)**: `SoftBodyDesc.disk(c, 0.8, 24).setSoftness(20, 1).setVolumeFactor(1.1)
.setSelfContacts(true)`; jelly elastis: `SoftBodyMaterial` (`youngModulus 3e3`, `poissonRatio 0.35`,
`elasticDampingRatio 0.5`, `tearStrain 0.4`) + `setCellModel(SoftBodyCellModel.Corotational)`. Volume factor > 1 =
menggembung → tombol "napas".

**6. Bake-and-scrub (scroll-scrubbed physics)**: simulasikan N step offline (fixed dt, build `-deterministic` bila
harus identik lintas device), rekam transform tiap step ke `Float32Array`, lalu scroll progress → index frame
(interpolasi antar frame). `world.takeSnapshot()` / `RAPIER.World.restoreSnapshot(bytes)` untuk checkpoint/rewind.
Kenapa terasa mahal: fisika "asli" tetapi bisa di-scrub maju-mundur sinkron dengan ScrollTrigger.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- WASM: init async (tampilkan layout statis dulu), paket compat lebih besar. `free()` saat unmount (SPA) — bocor kalau lupa.
- Mobile: `numSolverIterations` 2–4, sleeping aktif (default), batasi jumlah collider, hindari trimesh dinamis.
- `prefers-reduced-motion`: pre-settle (step N kali sebelum render pertama) lalu render statis; atau resep #6 tanpa autoplay.
- Rapier tidak punya renderer; `debugRender()` hanya untuk debug.
- Gotcha: kinematic body tidak terdorong kontak dan menembus dinding (by design) — pakai character controller/scene
  query untuk menghormati rintangan; `ActiveCollisionTypes.KINEMATIC_FIXED` untuk event kinematic↔fixed.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-rapier/bindings/typescript/CHANGELOG.md` — 0.20 (dist/, removed minIslandSize, CCD default) & 0.21 (soft bodies).
- `repo-rapier/CHANGELOG.md` — core v0.35/0.36: velocity cap 400, sleep 0.05/0.5 s, contact defaults, restitution pass.
- `repo-rapier/bindings/typescript/README.md` — varian paket (default/simd/deterministic/compat).
- `repo-rapier/bindings/typescript/src.ts/pipeline/world.ts` — World API (step, lengthUnit, snapshot, debugRender, queries).
- `repo-rapier/bindings/typescript/src.ts/dynamics/{rigid_body,impulse_joint,soft_body,integration_parameters}.ts`.
- `repo-rapier/bindings/typescript/src.ts/geometry/collider.ts` — shapes & default collider (friction 0.5, density 1).
- `repo-rapier/bindings/typescript/src.ts/pipeline/event_queue.ts` — EventQueue, ContactForceEvent.
- `web/user_guides_js/*.md` — guide JS ter-render 2026-10-28 (rigid_bodies, colliders, joints, soft_bodies,
  character_controller, scene_queries, advanced_collision_detection(_js), integration_parameters, common_mistakes).
  (`docs__user_guides__javascript__getting_started_js.md` = duplikat getting_started_js.md dari crawl pertama.)
- `repo-rapier/website/docs/user_guides/templates/*.mdx` — sumber guide (lebih baru dari situs bila berbeda).
- `repo-rapier/website/docs-examples/{2d,3d}/javascript/src/snippets/*.ts` — snippet JS resmi (soft_bodies, pid_controller…).
- `repo-rapier/bindings/typescript/testbed{2d,3d}/src/demos/*.ts` — demo resmi (joints, ccd, characterController, softBodies…).
