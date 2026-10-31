---
tool: The Nature of Code (Daniel Shiffman)
version: edisi p5.js 2024 (cetak No Starch Press, terbit 2024-09-03; errata di repo) · repo main @03b9a7e (2026-05-06) · contoh sketsa kini memuat p5@2.2.3 — dicek 2026-10-28
official: https://natureofcode.com/ · https://github.com/nature-of-code/noc-book-2
local: repo-noc-book-2/content/*.html (teks lengkap semua bab) · repo-noc-book-2/content/examples/**/*.js (344 file sketsa)
fetched: 2026-10-28
---
# The Nature of Code — kanon "gerak yang hidup": vektor → gaya → osilasi → partikel → steering → fisika

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- Ini **buku + kode contoh**, bukan library. Pakai sebagai rujukan rumus & pola saat butuh gerak yang
  _reaktif dan bisa diinterupsi_ (mengejar target bergerak, berkerumun, memantul, bergoyang) — hal yang tidak
  bisa dibuat tween ber-durasi tetap (GSAP/Motion).
- Pola-pola ini **agnostik renderer**: hasilnya cuma `x, y, angle` per frame → bisa ke p5, Canvas2D, Pixi,
  three, atau `transform` DOM.
- Jangan tulis sendiri bila butuh tumbukan benda kaku/constraint kompleks → Matter.js / Rapier (bab 6 memakai
  Matter.js & Toxiclibs.js). Graph layout → d3-force (sudah punya many-body + link spring + collide).
- Bab yang relevan motion: 0 Randomness (random walk, Gaussian, Perlin), 1 Vectors, 2 Forces, 3 Oscillation
  (sudut, SHM, pegas Hooke, pendulum), 4 Particle Systems, 5 Autonomous Agents (Reynolds steering, flow
  field, path following, flocking, binning, quadtree), 6 Physics Libraries (Verlet, soft body), 7 Cellular
  Automata, 8 Fractals (L-system, rekursi). Bab 9–11 (GA/neural net) jarang perlu untuk motion.

## Mental model (yang memengaruhi FEEL)
- **Mover** = `position`, `velocity`, `acceleration`. Tiap frame: `vel += acc; vel.limit(maxspeed); pos += vel;
  acc = 0` (Euler per-frame — satuan "per frame", bukan per detik). Gaya diakumulasi: `applyForce(f)` →
  `acc += f / mass` (Newton 2). Mass membuat benda berat "lamban" terhadap gaya yang sama.
- **Reynolds steering**: `steer = desired − velocity`, lalu `steer.limit(maxforce)`. Agen punya kemampuan
  terbatas → yang terasa "hidup" justru batasan `maxforce` (berbelok tidak instan).
  Rasio **maxforce/maxspeed** = kepribadian: kecil (contoh flocking 0.05/3) = berayun lebar seperti kapal;
  besar (0.1/4 di seek/arrive) = lincah.
- **Arrive** = seek yang memperlambat di dalam radius (contoh: 100 px, `desired.setMag(map(d,0,100,0,maxspeed))`)
  → ease-out yang _muncul sendiri_ dan tetap benar saat target bergerak (bisa diinterupsi).
- **Wander** (Reynolds): titik target di lingkaran di depan agen (contoh `wanderD 80`, `wanderR 25`,
  `θ += random(-0.3, 0.3)`) → acak yang "punya memori", tidak bergetar.
- **Flow field**: grid vektor; `desired = field.lookup(pos) * maxspeed`. Contoh: sel `resolution`, sudut
  `map(noise(xoff,yoff),0,1,0,TWO_PI)` dengan `xoff/yoff += 0.1` per sel.
- **Path following**: prediksi posisi 25 px ke depan, proyeksikan (dot product) ke segmen jalur → titik normal;
  target = normal + 25 px searah jalur; steer **hanya** jika jarak > `path.radius` → koreksi malas yang natural.
- **Flocking** = jumlah berbobot 3 aturan lokal: separation (radius 25, dibobot 1/d, ×1.5), alignment (radius 50,
  ×1.0), cohesion (radius 50 → seek ke centroid, ×1.0). Tanpa pemimpin; pola emergen.
- **Pegas (Hooke)**: `F = −k · (|d| − restLength) · d̂` (contoh `k = 0.2`, bob `mass 24`, `damping 0.98`/frame).
  **Pendulum**: `angAcc = (−g / r) · sin(angle)` (contoh g 0.4, damping 0.995). **SHM**: `x = A·sin(TWO_PI·frame/period)`.
- **Gaya lingkungan**: friction = −c·v̂ (magnitudo konstan, contoh c 0.1); drag fluida `|F| = c·|v|²`
  arah −v (rumus lengkap −½ρv²AC_d v̂); gravitasi `G·m1·m2/d²` dengan `d = constrain(d, 5, 25)` agar tidak meledak.
- **Partikel**: `lifespan` (mis. 100 → −2/frame) dipakai sebagai alpha/tint; emitter menambah, `isDead()` membuang.
- Library fisika (Matter.js, Toxiclibs.js) memakai **Verlet integration**: posisi lama + posisi kini → velocity
  implisit → constraint (pegas/jarak) jauh lebih stabil daripada Euler.

## Setup minimal (core agnostik renderer, JS murni)
```js
// vektor mini (tanpa p5): objek {x,y} immutable
const V = {
  add:(a,b)=>({x:a.x+b.x,y:a.y+b.y}), sub:(a,b)=>({x:a.x-b.x,y:a.y-b.y}),
  mul:(a,s)=>({x:a.x*s,y:a.y*s}), len:(a)=>Math.hypot(a.x,a.y),
  setLen:(a,m)=>{const l=Math.hypot(a.x,a.y)||1; return {x:a.x*m/l,y:a.y*m/l};},
  limit:(a,m)=>{const l=Math.hypot(a.x,a.y); return l>m?{x:a.x*m/l,y:a.y*m/l}:a;},
};
class Agent {
  constructor(x, y, { maxSpeed = 4, maxForce = 0.1, mass = 1 } = {}) {
    this.p = { x, y }; this.v = { x: 0, y: 0 }; this.a = { x: 0, y: 0 };
    Object.assign(this, { maxSpeed, maxForce, mass });
  }
  apply(f) { this.a = V.add(this.a, V.mul(f, 1 / this.mass)); }              // F = m·a
  steer(desired) { this.apply(V.limit(V.sub(desired, this.v), this.maxForce)); } // Reynolds
  seek(t) { this.steer(V.setLen(V.sub(t, this.p), this.maxSpeed)); }
  flee(t) { this.steer(V.mul(V.setLen(V.sub(t, this.p), this.maxSpeed), -1)); }
  arrive(t, slow = 100) {
    const d = V.sub(t, this.p), dist = V.len(d);
    this.steer(V.setLen(d, dist < slow ? this.maxSpeed * dist / slow : this.maxSpeed));
  }
  update(dt = 1) {                       // dt = deltaMs / 16.67  (1 = satu frame @60fps, satuan asli NoC)
    this.v = V.limit(V.add(this.v, V.mul(this.a, dt)), this.maxSpeed);
    this.p = V.add(this.p, V.mul(this.v, dt));
    this.a = { x: 0, y: 0 };
  }
}
// loop: const dt = Math.min(now - last, 50) / 16.67;  agents.forEach(a => { a.arrive(target); a.update(dt); });
```

## Knob yang menentukan rasa gerak
| knob | nilai di contoh buku | efek |
|---|---|---|
| `maxSpeed` | 2–4 px/frame | kecepatan jelajah |
| `maxForce` | 0.05–0.1 | kelincahan belok; turunkan = gerak "berat/anggun" |
| radius arrive | 100 px | panjang fase ease-out |
| wander `D, R, change` | 80, 25, 0.3 rad | jauh/lebar/acak = kelok panjang vs gelisah |
| separation radius / bobot | 25 px / 1.5 | jarak personal; ↑ = kawanan renggang, tidak menggumpal |
| alignment & cohesion radius / bobot | 50 px / 1.0 | ↑align = arus searah tenang; ↑cohesion = bola rapat |
| pegas `k`, `damping` | 0.2, 0.98 | k besar = kaku/cepat; damping kecil = cepat diam (kurang "kenyal") |
| pendulum `g`, damping | 0.4, 0.995 | periode & seberapa lama berayun |
| SHM `amplitude, period` | 200 px, 120 frame | besar & tempo osilasi |
| flow-field `resolution`, langkah noise | 20 px, 0.1/sel (agen: maxspeed `random(2,5)`, maxforce `random(0.1,0.5)`) | kerapatan & "kelokan" arus; variasi per agen = kerumunan tidak seragam |
| bin size (flocking) | 40 px, 800 boid | ≈ radius tetangga; O(n²) → ~O(n) |
| lifespan partikel | 100, −2/frame | panjang ekor/fade |

## Integrasi
- **DOM**: simulasikan di JS, tulis `el.style.transform = translate3d(x,y,0) rotate(angle)` sekali per frame
  (satu rAF untuk semua). Untuk banyak elemen → canvas/WebGL.
- **p5**: contoh buku memakai `createVector(x, y)` (2D) — kompatibel p5 2.x; ingat `createVector()` kosong tidak lagi boleh (2.3).
- **Ticker eksternal (GSAP/Lenis)**: jalankan `update(dt)` di ticker yang sama dengan scroll agar fase sinkron.
- **d3-force** adalah "NoC siap pakai" untuk node-link: many-body (charge) + link (pegas) + collide; kuasai alpha-nya (lihat ../d3/NOTES.md).
- **Paper.js**: contoh Tadpoles = flocking di Paper; Chain = constraint jarak (follow-the-leader) — ../paperjs/NOTES.md.
- **Pts 1.0** punya `Create.flock()`/`Boid`/`Flock` dan `Physics` (`World`, `Particle`, `Body`) bawaan — ../pts/NOTES.md.

## Resep non-generik
**1. Tombol/kartu magnetik dengan pegas (bukan lerp)**
```js
// x,y = offset elemen; target = (pointer − pusat) * 0.35 saat hover, (0,0) saat leave
let s = { x: 0, y: 0, vx: 0, vy: 0 }, target = { x: 0, y: 0 };
function tick(dt) {                                  // dt dalam frame (deltaMs/16.67)
  const k = 0.18, damp = Math.pow(0.78, dt);         // underdamped → 1 overshoot kecil
  s.vx = (s.vx + (target.x - s.x) * k * dt) * damp;
  s.vy = (s.vy + (target.y - s.y) * k * dt) * damp;
  s.x += s.vx * dt; s.y += s.vy * dt;
  el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
}
```
_Kenapa mahal_: Hooke + damping memberi overshoot & settle yang konsisten, dan tetap mulus saat target berubah di tengah jalan.

**2. Kawanan dengan suasana (mood) yang bisa di-tween**
```js
// weights = { sep: 1.5, ali: 1.0, coh: 1.0 }  ← tween ke { sep: 2.5, ali: 0.3, coh: 0.6 } saat "panik"
function flockForce(b, neighbors, w) {
  let sep = {x:0,y:0}, ali = {x:0,y:0}, coh = {x:0,y:0}, nS = 0, nN = 0;
  for (const o of neighbors) {
    if (o === b) continue;
    const d = V.len(V.sub(b.p, o.p));
    if (d > 0 && d < 25) { sep = V.add(sep, V.mul(V.setLen(V.sub(b.p, o.p), 1), 1 / d)); nS++; } // dibobot 1/d
    if (d > 0 && d < 50) { ali = V.add(ali, o.v); coh = V.add(coh, o.p); nN++; }
  }
  const steerTo = (dir) => V.limit(V.sub(V.setLen(dir, b.maxSpeed), b.v), b.maxForce);
  if (nS) b.apply(V.mul(steerTo(sep), w.sep));
  if (nN) { b.apply(V.mul(steerTo(ali), w.ali)); b.apply(V.mul(steerTo(V.sub(V.mul(coh, 1 / nN), b.p)), w.coh)); }
}
// neighbors: grid bin 50px → ambil 3×3 sel di sekitar boid (pola example_5_9_flocking_with_binning)
```
_Kenapa mahal_: mengubah bobot (bukan posisi) mengubah "emosi" kawanan secara organik — koreografi tanpa keyframe.

**3. Flow field hidup + separation (anti-tumpuk)**
```js
// angle(x,y,t) = noise(x*0.003, y*0.003, t) * TAU * 2 ; t += 0.0002*deltaMs
// tiap agen: desired = (cos a, sin a) * maxSpeed → steer; tambah separation radius 12 (bobot 2)
```
_Kenapa mahal_: field yang berevolusi pelan + jarak personal = garis-garis sejajar yang tidak saling tindih (rasa "Fidenza").

**4. Wander yang menoleh ke kursor saat dekat**
```js
function behave(a, mouse) {
  const d = V.len(V.sub(mouse, a.p));
  if (d < 140) a.seek(mouse);               // tertarik (atau flee bila kursor cepat: speed > 25px/frame)
  else {
    a.theta = (a.theta ?? 0) + (Math.random() * 0.6 - 0.3);
    const h = Math.atan2(a.v.y, a.v.x);
    const c = V.add(a.p, V.setLen(a.v.x || a.v.y ? a.v : { x: 1, y: 0 }, 80));
    a.seek(V.add(c, { x: 25 * Math.cos(a.theta + h), y: 25 * Math.sin(a.theta + h) }));
  }
}
```
_Kenapa mahal_: makhluk tampak punya niat (penasaran vs berkeliaran) dari dua aturan sederhana.

**5. Osilator aditif untuk "nafas" UI** — `y = A1·sin(TAU·t/P1) + A2·sin(TAU·t/P2 + φ)` dengan P1:P2 tidak bulat
(mis. 2.3 s & 3.7 s) → pola tak cepat berulang. Pendulum untuk ayunan objek gantung:
`angVel += (−g/r)·sin(angle)·dt; angVel *= 0.995^dt; angle += angVel·dt`.
_Kenapa mahal_: periode yang tidak sebanding menghindari loop mekanis yang terbaca mata.

## Performa, aksesibilitas, mobile
- Tetangga O(n²): pakai **binning** (bin ≈ radius tetangga; contoh 40 px untuk 800 boid) atau **quadtree**
  (`content/examples/05_steering/5_11_quadtree_part_1`). Pakai `magSq` untuk perbandingan jarak, hindari alokasi vektor
  per frame (objek immutable di atas = mudah dibaca, tapi untuk >2k agen pakai Float32Array/SoA).
- Lookup table sin/cos (`example_5_12_sine_cosine_lookup_table`) bila ribuan trigonometri per frame.
- Euler per-frame bergantung frame rate: kalikan gaya & kecepatan dengan `dt`, damping `pow(d, dt)`, clamp `dt`
  (tab tersembunyi → lonjakan). Untuk stabilitas pegas kaku → Verlet/substep.
- `prefers-reduced-motion`: bekukan simulasi (render keadaan diam) atau turunkan `maxSpeed` & matikan wander.
- Mobile: kurangi jumlah agen sesuai `navigator.hardwareConcurrency`/ukuran layar; pointer = target opsional.

## Sumber lokal
- `repo-noc-book-2/content/05_steering.html` — Reynolds lengkap: seek/arrive/wander/flow field/path following/flocking/binning
- `repo-noc-book-2/content/02_forces.html` · `03_oscillation.html` — gaya (friction, drag, gravitasi), SHM, pegas Hooke, pendulum
- `repo-noc-book-2/content/04_particles.html` · `06_libraries.html` — particle system, Matter.js/Toxiclibs, Verlet, soft body
- `repo-noc-book-2/content/00_randomness.html` — random walk, distribusi Gaussian/custom, Perlin noise
- `repo-noc-book-2/content/07_ca.html` · `08_fractals.html` — CA (Game of Life, rules), L-system & rekursi
- `content/examples/05_steering/noc_5_02_arrive/vehicle.js` — arrive referensi
- `content/examples/05_steering/example_5_9_flocking/boid.js` · `example_5_9_flocking_with_binning/` — flocking + binning
- `content/examples/05_steering/noc_5_04_flow_field/flowfield.js` · `exercise_5_4_wander/vehicle.js` · `noc_5_05_path_following_simple/vehicle.js`
- `content/examples/03_oscillation/example_3_11_a_spring_connection/{spring,bob}.js` · `example_3_10_swinging_pendulum/pendulum.js`
- `content/examples/02_forces/example_2_5_fluid_resistance/liquid.js` (drag v²) · `example_2_6_attraction/attractor.js`
- `content/examples/06_libraries/6_12_soft_string` · `exercise_6_10_cloth_simulation` · `6_13_force_directed_graph` (Toxiclibs pegas)
- `repo-noc-book-2/errata.md` — koreksi edisi cetak
