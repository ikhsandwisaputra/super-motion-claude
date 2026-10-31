---
tool: matter-js
version: 0.20.0 (npm latest, rilis 2024-06-23 — dicek 2026-10-28; master @b8ee71c 2026-09-30 masih 0.20.0, unreleased: "fix inertia calculation of compound bodies" 2026-09-23 + migrasi pnpm/rollup)
official: https://brm.io/matter-js/ (API docs: https://brm.io/matter-js/docs/ = JSDoc dari src/)
local: 04-physics/matter-js/repo-matter-js/src (JSDoc = API docs), repo-matter-js/examples, repo-matter-js-wiki
fetched: 2026-10-28
---
# Matter.js — engine rigid-body 2D pure-JS untuk "mainan fisik" DOM (pill/badge/huruf jatuh, diaduk kursor, gyro)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai**: 5–300 body 2D yang harus bisa disentuh/dilempar (footer pile, hero letters, sticker jatuh), constraint
  sederhana (tali, jembatan, slingshot), gyro→gravity di mobile. Pure JS, tanpa WASM/init async, API kecil, sinkron.
- **Jangan**: objek cepat + dinding tipis (tidak ada CCD → tunneling; pakai dinding tebal atau **Rapier**), ribuan body /
  stacking tinggi yang harus stabil (Rapier 2D jauh lebih cepat & stabil), 3D (Rapier / react-three-rapier),
  kain/tali halus banyak segmen (lebih murah & lebih bagus pakai solver verlet/XPBD sendiri → `../verlet`),
  satu elemen UI yang cuma butuh "rasa pegas" (pakai spring Motion → `../_physics-math`).
- Determinisme lintas-mesin tidak dijanjikan [UNVERIFIED]; untuk replay/scrub pakai Rapier `-deterministic`.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Integrator = position Verlet** (`Body.update`, src/body/Body.js): kecepatan = `position - positionPrev`, disimpan
  ternormalisasi ke *base step* `Common._baseDelta = 1000/60` ms. Jadi **satuan velocity = px per 16.67 ms**, bukan px/s.
  `Body.setVelocity(b, {x: vx_px_per_s / 60, y: ...})` untuk lempar dari pointer (px/s).
- **Gravity**: force `mass * gravity.y * gravity.scale` per update, default `{x:0, y:1, scale:0.001}` → percepatan
  0.001 px/ms² = **≈1000 px/s²** (≈1 g kalau 1 m = 100 px). `frictionAir` dikalikan `1 - frictionAir * (delta/16.67)` per
  update → efeknya per base-step, non-linear (doc: "effects of the value are non-linear").
- **Urutan `Engine.update`** (src/core/Engine.js): Sleeping.update → apply gravity → integrate → event `beforeSolve` →
  constraints (×`constraintIterations`, default 2) → broadphase+narrowphase → `collisionStart` (dipicu **sebelum**
  resolver: kecepatan masih pra-tumbukan) → position solve ×`positionIterations` (6) dengan
  `positionDamping = clamp(20/positionIterations, 0, 1)` → constraints **lagi** (pass kedua) → velocity solve
  ×`velocityIterations` (4) → `collisionActive`/`collisionEnd` → clear forces → `afterUpdate`.
- **Constraint = koreksi posisi (gaya PBD), bukan pegas N/m.** `stiffness` = fraksi error yang dikoreksi per solve; untuk
  non-rigid dikali `timeScale²` (timeScale = clamp(delta/16.67,0,1)), dan dijalankan **2 pass × constraintIterations** per
  update. Konsekuensi: kekakuan efektif ikut naik kalau `constraintIterations` atau jumlah update/frame dinaikkan.
  `stiffness: 0` tidak bisa (kode `constraint.stiffness || default`) — pakai 0.0001.
- **Runner 0.20 = fixed timestep** (src/core/Runner.js, CHANGELOG 0.20 "new Matter.Runner with default fixed timestep"):
  `delta` default 1000/60; akumulator `timeBuffer` (+frameDelta, clamp ke `frameDelta + delta*1.5`), update selama
  `timeBuffer >= delta*1.5`; budget `maxFrameTime` 1000/30 & `maxUpdates`. `frameDelta` = rata-rata ~100 frame terakhir
  (slice kronologis 10–90%; array sorted hanya dipakai untuk panjang) + `frameDeltaSnapping` ke Hz bulat. **Tidak ada
  interpolasi render** → di layar 120 Hz dengan delta 1000/60 tiap frame ganjil tidak di-update = judder. Doc Runner:
  pilih `delta = 1000/(n*fps)` (mis. 1000/120 → 2 update/frame @60 Hz, 1 @120 Hz).
  `runner.isFixed`, `deltaMin/deltaMax`, `fps` **dihapus/redundan** (Runner warn) — wiki/Running.md masih menulis `isFixed` (usang).
- **Combine rule pasangan** (src/collision/Pair.js): `friction = min(A,B)`, `frictionStatic = max`, `restitution = max`,
  `slop = max`. → lantai licin (friction 0) bikin SEMUA yang menyentuhnya licin; satu body bouncy cukup membuat
  tumbukannya bouncy.
- **Sleeping**: `Sleeping.update` jalan sebelum gravity dan gravity melewati body tidur → **mengubah `engine.gravity`
  (gyro) TIDAK membangunkan body tidur**; bangunkan manual `Sleeping.set(body, false)`.
- `Bodies.circle` = poligon `ceil(max(10, min(maxSides=25, radius)))` sisi. `chamfer` menambah vertex (quality auto,
  `qualityMin 2`, `qualityMax 14`) → collision lebih mahal.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
import Matter from 'matter-js'; // package main: build/matter.js (UMD); global `Matter` kalau via <script>
const { Engine, Runner, Bodies, Body, Composite, Events, Mouse, MouseConstraint, Sleeping, Query } = Matter;

const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.001 }, enableSleeping: true });
const runner = Runner.create({ delta: 1000 / 120 });            // fixed step; lihat Mental model
Composite.add(engine.world, [
  Bodies.rectangle(400, 610, 810, 60, { isStatic: true }),       // ground
  Bodies.rectangle(400, 200, 120, 40, { chamfer: { radius: 20 } }) // pill
]);
Runner.run(runner, engine);                                      // atau loop sendiri: Engine.update(engine, 1000/60)

// cleanup (tidak ada destroy tunggal)
function destroy(mouse) {
  Runner.stop(runner);                       // cancelAnimationFrame
  Events.off(engine); Events.off(runner);    // juga melepas listener internal MouseConstraint (beforeUpdate)
  Composite.clear(engine.world, false);      // (composite, keepStatic, deep)
  Engine.clear(engine);                      // pairs + detector
  if (mouse) for (const [t, fn] of [['mousemove', mouse.mousemove], ['mousedown', mouse.mousedown],
    ['mouseup', mouse.mouseup], ['wheel', mouse.mousewheel], ['touchmove', mouse.mousemove],
    ['touchstart', mouse.mousedown], ['touchend', mouse.mouseup]]) mouse.element.removeEventListener(t, fn);
}
```
`Matter.Render` hanya debug renderer (wireframes default true; `options.wireframes:false` untuk fill/sprite). Untuk DOM
sync tidak perlu Render sama sekali.
**Gotcha 0.20**: selalu `Runner.run(Runner.create(opts), engine)`. Signature baru `Runner.run(runner, engine)` tidak lagi
mendeteksi pemanggilan 1-argumen; `Runner.run(engine)` / `Engine.run(engine)` (alias deprecated di `src/module/main.js`,
juga contoh di wiki/Running.md) membuat engine dianggap runner → `runner.enabled` undefined → tidak pernah `tick`
(dibaca dari source, tidak dieksekusi).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Default | Efek ke feel | Rentang bagus |
|---|---|---|---|
| `engine.gravity.scale` | 0.001 (≈1000 px/s²) | berat/"slow-mo" dunia | 0.0006 (melayang) – 0.002 (berat, jatuh tegas) |
| `engine.timing.timeScale` | 1 | slow-mo global (0 = freeze) | 0.2–0.5 untuk momen dramatis, tween ke 1 |
| `runner.delta` | 1000/60 | presisi & smoothness | 1000/120 (DOM halus di 60/120 Hz); 1000/600 substep (example `substep.js`) |
| `positionIterations` / `velocityIterations` / `constraintIterations` | 6 / 4 / 2 | stack stabil, rantai kaku | naikkan 10/8/4 untuk tumpukan tinggi/rantai |
| `body.restitution` | 0 (combine max) | pantulan | pill/badge 0.3–0.6; bola karet 0.8–0.9 |
| `body.friction` | 0.1 (combine **min**) | geser | 0.3–0.8 untuk "kertas/sticker"; 0.001 es |
| `body.frictionStatic` | 0.5 (dikali friction; combine max) | "nempel" saat hampir diam | 1–10 = susah mulai geser |
| `body.frictionAir` | 0.01 | drag udara | 0.02–0.06 = berat/di air; 0.001 = luncur |
| `body.density` | 0.001 (mass = density·area px²) | massa relatif (siapa mendorong siapa) | 0.002–0.005 objek "padat" |
| `body.slop` | 0.05 | toleransi tembus | turunkan untuk body sangat kecil |
| `Body.setInertia(b, Infinity)` / opsi `inertia: Infinity` | auto | **tidak berputar** (label tetap tegak) | huruf/teks yang harus terbaca |
| `chamfer: { radius }` | null | sudut membulat (collision = visual) | `radius = h/2` → kapsul pill sempurna; array per-sudut |
| `sleepThreshold` | 60 | cepat tidur = hemat CPU | dengan `enableSleeping: true` |
| `collisionFilter {group, category, mask}` | 0 / 0x0001 / 0xFFFFFFFF | layer interaksi | `Body.nextGroup(true)` = grup tak saling tabrak (rantai/kain) |
| `Constraint` `stiffness` | 1 (atau 0.7 jika `length:0`) | 1 = batang, 0.01–0.2 = pegas | tali 0.8–1 + `length` kecil; pegas lembek 0.02–0.08 |
| `Constraint` `damping` | 0 | redam osilasi (hanya terasa kalau stiffness rendah) | 0.01–0.1 |
| `Constraint` `angularStiffness` | 0 (MouseConstraint: **1**) | torsi dari constraint dikali `(1 - angularStiffness)` | MouseConstraint `0` → body berayun kalau dipegang di pinggir |
| `MouseConstraint.constraint.stiffness` | 0.1 (examples 0.2; cloth 0.98; softBody 0.9) | lag tarikan | 0.05 "karet" – 0.9 "lengket" |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **DOM sync**: body dibuat dari rect elemen; elemen `position:absolute; left:0; top:0; will-change:transform`;
  tulis transform di event **runner `afterTick`** (sekali per frame, setelah semua update) — bukan engine `afterUpdate`
  (bisa >1×/frame). Rotasi: `body.angle` (rad), posisi = pusat massa.
- **MouseConstraint di container DOM**: `Mouse.create(container)`; untuk elemen non-canvas `pixelRatio` harus 1
  (`_getRelativeMousePosition` membagi dengan `clientWidth/(element.width||clientWidth) * pixelRatio`). Untuk canvas
  `Render` dengan `pixelRatio` ≠ 1: Render menulis atribut `data-pixel-ratio` yang dibaca `Mouse.create` saat dibuat —
  kalau pixelRatio diubah belakangan, set `mouse.pixelRatio` manual (atau `Mouse.setScale/setOffset`).
- **Wheel capture fix (0.20)**: Mouse memasang `wheel` `{passive:false}` + `preventDefault()` → halaman tidak bisa scroll
  di atas canvas. Fix: `mouse.element.removeEventListener('wheel', mouse.mousewheel)`. (Fix lama yang melepas
  `'mousewheel'`/`'DOMMouseScroll'` **tidak berlaku lagi** — 0.20 memakai event `wheel`, lihat Mouse.setElement.)
- **Touch scroll di mobile**: `touchstart/touchmove/touchend` `{passive:false}` dan handler memanggil `preventDefault()`
  bila ada touches → swipe di atas stage tidak men-scroll halaman. Lihat resep #4.
- **Lenis/GSAP**: jangan step Matter di ticker GSAP dengan delta variabel; biarkan Runner (fixed) atau panggil
  `Engine.update(engine, fixedDelta)` dalam akumulator sendiri (`../_physics-math`). Scroll → gaya: baca velocity Lenis,
  `Body.applyForce` ke semua body (atau ubah `engine.gravity.y`).
- **Collision filtering untuk UI**: hiasan yang tidak boleh ditabrak kursor → `MouseConstraint.collisionFilter.mask`.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Pill/badge jatuh + DOM sync + kursor bisa ambil & lempar**
```js
const stage = document.querySelector('.stage');              // position:relative; overflow:hidden
const { width: W, height: H } = stage.getBoundingClientRect();
const T = 400;                                                // dinding tebal: tanpa CCD, ini anti-tunneling
Composite.add(engine.world, [
  Bodies.rectangle(W / 2, H + T / 2, W + 2 * T, T, { isStatic: true }),
  Bodies.rectangle(-T / 2, H / 2 - H, T, H * 4, { isStatic: true }),
  Bodies.rectangle(W + T / 2, H / 2 - H, T, H * 4, { isStatic: true }),
]);
const items = [...stage.querySelectorAll('.pill')].map((el, i) => {
  const w = el.offsetWidth, h = el.offsetHeight;
  const body = Bodies.rectangle(w / 2 + Math.random() * (W - w), -h - i * 60, w, h, {
    chamfer: { radius: h / 2 }, restitution: 0.35, friction: 0.4, frictionAir: 0.02,
    angle: (Math.random() - 0.5) * 0.6,
  });
  return { el, w, h, body };
});
Composite.add(engine.world, items.map(i => i.body));
const mouse = Mouse.create(stage);
mouse.element.removeEventListener('wheel', mouse.mousewheel);          // halaman tetap bisa scroll
Composite.add(engine.world, MouseConstraint.create(engine, {
  mouse, constraint: { stiffness: 0.15, angularStiffness: 0, render: { visible: false } },
}));
Events.on(runner, 'afterTick', () => {
  for (const { el, w, h, body } of items) {
    if (body.isSleeping) continue;
    el.style.transform = `translate(${body.position.x - w / 2}px,${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
  }
});
```
Kenapa terasa mahal: collision shape = bentuk visual (chamfer h/2), `angularStiffness:0` membuat pill berayun alami saat
dipegang di ujung, dan jatuhnya bertahap (spawn bertingkat `-i*60`) bikin ritme "hujan" bukan blok.

**2. Kursor mengaduk tanpa klik (force field berbasis kecepatan kursor)**
```js
let last = { ...mouse.position };
Events.on(engine, 'beforeUpdate', () => {                      // jalan per update (fixed step)
  const p = mouse.position, vx = p.x - last.x, vy = p.y - last.y; last = { x: p.x, y: p.y };
  for (const { body } of items) {
    const dx = body.position.x - p.x, dy = body.position.y - p.y, d = Math.hypot(dx, dy), R = 140;
    if (d > R) continue;
    const k = 0.0004 * (1 - d / R) * body.mass;                 // tune 2e-4..1e-3
    Body.applyForce(body, { x: p.x, y: p.y }, { x: vx * k, y: vy * k }); // dari titik kursor → ikut torsi/spin
    if (body.isSleeping) Sleeping.set(body, false);
  }
});
```
Kenapa terasa mahal: gaya ∝ kecepatan kursor (bukan posisi) → diam = tenang, sapuan cepat = cipratan; titik aplikasi di
kursor memberi spin yang terasa "disentil". (Pola ini rakitan sendiri dari API terverifikasi `Body.applyForce`.)

**3. Gyro → gravity (mobile) yang halus dan tidak "macet"**
```js
async function enableTilt() {                                  // panggil dari click (iOS: transient activation)
  const DOE = window.DeviceOrientationEvent;
  if (typeof DOE?.requestPermission === 'function' && (await DOE.requestPermission()) !== 'granted') return;
  let tx = 0, ty = 1;
  addEventListener('deviceorientation', (e) => {
    const c = (v) => Math.max(-90, Math.min(90, v ?? 0)) / 90;
    const a = screen.orientation?.angle ?? 0;                   // pengganti window.orientation (deprecated)
    const g = c(e.gamma), b = c(e.beta);
    [tx, ty] = a === 90 ? [b, -g] : a === 270 ? [-b, g] : a === 180 ? [g, -b] : [g, b];
  });
  Events.on(engine, 'beforeUpdate', (ev) => {                  // low-pass frame-rate independent
    const k = 1 - Math.exp(-8 * ev.delta / 1000), gr = engine.gravity;
    const nx = gr.x + (tx - gr.x) * k, ny = gr.y + (ty - gr.y) * k;
    if (Math.hypot(nx - gr.x, ny - gr.y) > 0.002) items.forEach(i => Sleeping.set(i.body, false));
    gr.x = nx; gr.y = ny;
  });
}
```
Pemetaan sumbu per orientasi diambil dari `examples/gyro.js` (0/180/90/-90 window.orientation);
`screen.orientation.angle` 270 ≙ -90 [UNVERIFIED di semua device]. iOS permission: MDN
`_shared/mdn-content/files/en-us/web/api/deviceorientationevent/requestpermission_static/index.md`.
Kenapa terasa mahal: low-pass menghilangkan jitter sensor, dan bangunkan body saat gravity berubah (bug klasik: body
tidur tetap "nempel" di dinding saat HP dimiringkan).

**4. Mobile: halaman tetap bisa di-scroll kecuali jari mulai di atas body**
```js
const el = mouse.element, all = () => items.map(i => i.body);
el.removeEventListener('touchstart', mouse.mousedown);
el.removeEventListener('touchmove', mouse.mousemove);
el.removeEventListener('touchend', mouse.mouseup);
const toLocal = (t) => { const r = el.getBoundingClientRect(); return { x: t.clientX - r.left, y: t.clientY - r.top }; };
el.addEventListener('touchstart', (e) => {
  if (Query.point(all(), toLocal(e.changedTouches[0])).length) mouse.mousedown(e); // handler asli → preventDefault
}, { passive: false });
el.addEventListener('touchmove', (e) => { if (mouse.button === 0) mouse.mousemove(e); }, { passive: false });
el.addEventListener('touchend', (e) => mouse.mouseup(e), { passive: false });
```
Kenapa terasa mahal: scroll halaman tidak pernah "terjebak" di stage fisika, tapi pill tetap bisa diambil.

**5. Bunyi/haptic tumbukan proporsional impact**
```js
Events.on(engine, 'collisionStart', (e) => {
  for (const p of e.pairs) {
    const va = Body.getVelocity(p.bodyA), vb = Body.getVelocity(p.bodyB), n = p.collision.normal;
    const impact = Math.abs((va.x - vb.x) * n.x + (va.y - vb.y) * n.y);   // px per 16.67 ms
    if (impact > 1.5) tick(Math.min(impact / 15, 1));                      // gain/pitch ∝ impact; rate-limit!
  }
});
```
Kenapa terasa mahal: suara mengikuti energi tumbukan (bukan setiap kontak), rate-limit per body mencegah "rattle".

**6. Pre-settle untuk reduced-motion / first paint**: `for (let i = 0; i < 600; i++) Engine.update(engine, 1000/60);`
lalu tulis transform sekali (tanpa Runner). Komposisi tumpukan tetap "fisik" tapi statis.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Biaya utama = jumlah pasangan kontak × iterasi. `enableSleeping: true` + skip DOM write untuk `body.isSleeping`.
  Circle besar = 25 sisi; chamfer menambah vertex. README: Webpack sourcemap & Vue watchers bisa sangat memperlambat
  (lihat issue #1001) — jangan simpan body Matter di state reaktif.
- Engine warn bila `delta > 16.667` ms (`Engine._deltaMax`). Runner menahan delta abnormal (tab hidden → fallback)
  sehingga tidak meledak saat tab kembali.
- `prefers-reduced-motion: reduce` → resep #6 (pre-settle, statis) atau timeScale rendah tanpa gyro.
- Tunneling: tidak ada CCD → dinding tebal (≥ ukuran body terbesar), batasi speed (`Body.setSpeed` seperti
  `examples/slingshot.js` cap 45).
- Body concave (`Bodies.fromVertices`) butuh `poly-decomp` via `Common.setDecomp(require('poly-decomp'))`; tanpa itu
  fallback ke convex hull + warning. Param: `flagInternal=false, removeCollinear=0.01, minimumArea=10, removeDuplicatePoints=0.01`.
- SVG → body: `Svg.pathToVertices` + `Bodies.fromVertices` (lihat `examples/svg.js`, `examples/terrain.js`).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-matter-js/src/core/Engine.js` — urutan solver, default iterasi, gravity, events.
- `repo-matter-js/src/core/Runner.js` — fixed timestep 0.20, maxFrameTime/maxUpdates, docs `delta`.
- `repo-matter-js/src/body/Body.js` — default properti body + doc restitution/friction/inertia/slop; Verlet `Body.update`.
- `repo-matter-js/src/constraint/Constraint.js` — stiffness/damping/angularStiffness, solve PBD.
- `repo-matter-js/src/constraint/MouseConstraint.js`, `src/core/Mouse.js` — default drag, event listener (wheel/touch).
- `repo-matter-js/src/collision/Pair.js` — combine rules; `src/core/Sleeping.js` — threshold tidur.
- `repo-matter-js/src/factory/Bodies.js`, `Composites.js`, `src/geometry/Vertices.js` (chamfer) — pembuat bentuk.
- `repo-matter-js/examples/{gyro,cloth,softBody,chains,bridge,ragdoll,slingshot,sprites,substep,timescale,collisionFiltering,events,sleeping,rounded}.js`.
- `repo-matter-js/CHANGELOG.md` — 0.20.0 (Runner baru, passive mouse events, Constraint.currentLength, beforeSolve).
- `repo-matter-js-wiki/{Getting-started,Running,Rendering}.md` — loop & renderer sendiri (catatan: `isFixed` usang).
