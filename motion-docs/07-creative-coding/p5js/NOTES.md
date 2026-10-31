---
tool: p5.js
version: 2.3.4 stable (npm `latest`, rilis 2026-09-25) · 2.4.0-rc.1 (npm `beta`, 2026-10-20; = repo main @13125c2 yang di-mirror) · 1.x = 1.11.13 (npm `r1`, tidak di-maintain, ref di v1.p5js.org) — dicek 2026-10-28
official: https://p5js.org/reference/ · https://github.com/processing/p5.js · https://github.com/processing/p5.js-compatibility
local: repo-p5.js/src/ (JSDoc = reference lengkap) · web/reference/ (447 halaman motion) · web/tutorials/ (18) · repo-p5.js-compatibility/README.md · web/github-releases.md
fetched: 2026-10-28
---
# p5.js — kanvas generatif immediate-mode (2D/WebGL/WebGPU) + shader dari JavaScript (p5.strands)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk: hero/background generatif (noise, flow field, partikel), kinetic type dari outline font
  (`textToPoints`/`textToContours`/`textToModel`), sketsa audio/mouse/webcam-reactive (resep #4 arsenal:
  p5 + Web Audio + MediaPipe/ml5), shader tanpa nulis GLSL (p5.strands), prototyping cepat.
- **Jangan** untuk: animasi UI/DOM (pakai GSAP/Motion), scene 3D berat (three/R3F/OGL), physics benda kaku
  (Matter/Rapier — atau NoC ch.6), dataviz (d3), vektor dengan hit-test per objek & boolean path (Paper.js).
- p5 = **immediate mode**: tidak ada scene graph, semua digambar ulang tiap `draw()`. Butuh objek yang bisa
  di-klik/di-morph satu per satu → Paper.js. Butuh geometri/komposisi ringan bertipe TS → Pts.
- Bundle besar. 2.x punya subpath export (`p5/core`, `p5/math`, `p5/shape`, `p5/webgl`, `p5/webgpu`, …
  di `package.json` `exports`) + custom-build tool yang masih "for testing" (rilis 2.3.0).

## Mental model (yang memengaruhi FEEL & performa)
- **Loop**: `requestAnimationFrame`, tapi p5 **menggambar hanya jika** `now - lastFrame >= 1000/targetFPS - 5ms`
  (`src/core/main.js` `_draw`). Target default **60** → di layar 120 Hz p5 tetap ~60 fps sampai kamu
  panggil `frameRate(120)`. `deltaTime` = ms nyata antar frame yang DIGAMBAR; `frameRate()` = `1000/deltaTime`.
  `millis()` mulai 0 saat loop draw mulai (setelah setup). `draw()` jangan `async` (rAF tidak menunggu).
- **noise() CPU** = Perlin klasik berbasis tabel 4096 nilai acak + interpolasi cosinus (`scaled_cosine`),
  **4 oktaf, falloff 0.5** default (= fBm "H=1, gain 0.5" versi IQ), frekuensi ×2 per oktaf. Output ~[0,1]
  tapi menumpuk di sekitar 0.5 (amplitudo maks 0.9375). **Input negatif di-mirror** (`if (x<0) x=-x`) →
  `noise(-x) === noise(x)`: lintasan yang melewati 0 tampak memantul. Offset domain (mis. `+1000`).
- **noise() di p5.strands (GPU)** = simplex 3D Gustavson (`src/webgl/shaders/functions/noise3DGLSL.glsl`),
  ikut `noiseDetail`, dinormalisasi ke [0,1] → **nilai CPU ≠ GPU**; jangan berharap field-nya sama persis.
- RFC 2.0 (`rfc_p5js_2.md`) mengusulkan Simplex + xorshift128+, **tapi source 2.4-rc masih Perlin + LCG**
  (`noise.js`, `random.js` `_lcg`). Jangan percaya RFC/blog, cek source.
- `random()` = `Math.random` sampai `randomSeed(n)` → LCG; `randomGaussian(mean, sd=1)` = metode polar
  Marsaglia (nilai kedua di-cache; `randomSeed` me-reset cache). `noiseSeed(n)` = LCG mengisi tabel Perlin.
- `filter()` di mode 2D **memakai WebGL di belakang layar** (lebih cepat); argumen terakhir `useWebGL=false`
  (`filter(BLUR, false)` / `filter(BLUR, 6, false)`) paksa CPU.
  BLUR = gaussian di P2D, **box blur** di WEBGL. Sejak 2.3 filter shader custom (`buildFilterShader`) jalan di 2D.
- WEBGL = WebGL2 bila tersedia (fallback v1 via `setAttributes({version:1})`); **instancing hanya WebGL2**.
  WEBGPU = add-on `p5.webgpu.js` (eksperimental, rilis 2.2): `await createCanvas(w, h, WEBGPU)`;
  `loadPixels()`/`get()` jadi async.
- **p5.strands** (beta, `markExperimental`): callback JS ditranspile jadi graph shader. Hook per tahap:
  vertex `objectInputs` → `worldInputs` → `cameraInputs`; fragment `pixelInputs` → `combineColors` →
  `finalColor`; filter: `filterColor` (`texCoord`, `canvasSize`, `texelSize`, `canvasContent`).
  Global p5 (`millis`, `deltaTime`, `frameCount`, `mouseX/Y`, `width/height`, …) otomatis jadi uniform.
  Dua sintaks (keduanya hidup di 2.3/2.4):
  - **baru (2.3+)**: `buildMaterialShader(cb)` / `buildFilterShader(cb)` / `buildColorShader` /
    `buildNormalShader` / `buildStrokeShader` / `buildComputeShader` (WebGPU) + blok `hook.begin()` … `hook.set(v)`/assign … `hook.end()`.
  - **lama (2.0–2.2)**: `baseMaterialShader().modify(() => { getWorldInputs((inputs) => { …; return inputs; }) })`.
  `build*Shader(cb)` ≡ `base*Shader().modify(cb)` (lihat `src/webgl/material.js`). `shader.inspectHooks()` cetak semua hook.
- Shader custom 2.x **selalu** dipakai untuk fill sampai `resetShader()`/`pop()` (1.x mematikannya diam-diam
  saat `lights()`); stroke & `image()` punya `strokeShader()` / `imageShader()` sendiri.

## Setup minimal (2.x, terverifikasi)
```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.4/lib/p5.min.js"></script>  <!-- .min = tanpa FES -->
```
```js
let font;
async function setup() {                 // 2.x: preload() DIHAPUS → async/await
  createCanvas(windowWidth, windowHeight);
  font = await loadFont('/fonts/Inter.ttf'); // semua load*() return Promise
  // overlay loading bawaan muncul saat setup lama (2.3.2+). Matikan: `p5.loadingAnimation = false` sebelum sketch
  // start; `loadingAnimation(cb)` kustom ada di source main (src/core/loading.js) — cek versi sebelum dipakai.
}
function draw() { background(12); }
function windowResized() { resizeCanvas(windowWidth, windowHeight); }
```
Instance mode (React/Next/Astro — wajib untuk embed, tidak mengotori `window`):
```js
import p5 from 'p5';                       // exports "." -> dist/app.js
useEffect(() => {
  const inst = new p5((p) => {
    p.setup = async () => { p.createCanvas(el.current.clientWidth, 400); };
    p.draw  = () => { p.background(0); };
  }, el.current);                           // node tujuan canvas
  return () => inst.remove();               // stop loop + hapus canvas & elemen (aman utk StrictMode double-mount)
}, []);
```
Perubahan 1.x → 2.x yang paling sering bikin sketsa lama rusak (sumber: `repo-p5.js-compatibility/README.md`):
- `preload()` hilang → `async setup()` + `await load*()` (add-on `preload.js` untuk gaya lama).
- `bezierVertex(x1,y1,x2,y2,x3,y3)` → satu titik per panggilan + `bezierOrder(3|2)` (quadratic = order 2);
  `curveVertex/curve/curvePoint/curveTangent/curveTightness` → `splineVertex/spline/splinePoint/splineTangent/splineProperty('tightness', t)`;
  `endShape(CLOSE)` menutup spline **mulus** (tak perlu duplikasi titik kontrol); `curveDetail()` kini juga
  mengatur bezier; `beginGeometry/endGeometry` → `buildGeometry(cb)`. (add-on `shapes.js`)
- `textToPoints(str, x, y, fontSize, opts)` → `textToPoints(str, x, y, opts)`; ukuran dari `textSize()`.
  `textWidth()` kini tight bbox, lebar dgn spasi = `fontWidth()`.
- `createVector()` kosong → wajib `createVector(0, 0)` / `(0,0,0)`; vektor beda dimensi → warning & operasi pakai dimensi terkecil (2.3).
- `mouseButton === LEFT` → `mouseButton.left` (objek boolean, multi-tombol); touch digabung ke Pointer Events
  (`touchStarted` dkk. → handler mouse + array `touches`); `keyCode === UP_ARROW` → `keyIsDown(UP_ARROW)` / `code`.
- Warna `HDR` di-rename `P3` (2.3.1). p5.sound lama tidak jalan di 2.x → p5.sound.js baru (kelas synth/efek dihapus → Tone.js).

## Knob yang menentukan rasa gerak
| knob | default | efek ke feel | rentang bagus |
|---|---|---|---|
| skala input `noise(x*s, y*s, t)` | — | s kecil = gelombang lebar & kalem; besar = gelisah | contoh reference: s 0.002–0.02 /px |
| laju waktu noise | — | `t += k*deltaTime` (bukan `frameCount`) → kecepatan sama di 60/120 Hz | k ≈ 0.0002–0.001 /ms (heuristik) |
| `noiseDetail(lod, falloff)` | 4, 0.5 | oktaf = detail halus; falloff >0.5 kasar & bisa >1 | lod 2–6, falloff 0.35–0.6 |
| `frameRate(fps)` | 60 | naikkan ke 120 utk layar ProMotion; turunkan utk "stop-motion" 12 fps | 12/24/60/120 |
| `randomGaussian(m, sd)` | 0, 1 | variasi "natural" (ukuran, jitter) vs uniform yang menggumpal | sd 5–15% dari nilai |
| `map(v,a,b,c,d, true)` | withinBounds off | `true` = clamp, cegah overshoot liar | — |
| `splineProperty('tightness', t)` | 0 (Catmull-Rom) | negatif = gembung bulat, positif = tegang/bersudut | −1…1 |
| `splineProperty('ends', EXCLUDE)` | INCLUDE | gambar hanya span tengah | — |
| `bezierOrder(n)` | 3 | 2 = quadratic (FES warn selain 2/3, 2.4) | 2, 3 |
| `textToPoints(..., {sampleFactor, simplifyThreshold})` | 0.1, 0 | titik per panjang path; simplify (radian) buang titik kolinear | 0.05–0.5 |
| `blendMode()` | BLEND | ADD/SCREEN = glow aditif; DIFFERENCE/OVERLAY/HARD_LIGHT/SOFT_LIGHT/DODGE/BURN **hanya 2D**, SUBTRACT **hanya WebGL** | — |
| `pixelDensity(n)` | `Math.ceil(devicePixelRatio)` (`p5.Renderer.js`; DPR 1.5 → 2!) | 1 = 4× lebih sedikit piksel di retina | 1–2 |
| `createFramebuffer({format, antialias, density, textureFiltering})` | UNSIGNED_BYTE, depth on | `FLOAT`/`HALF_FLOAT` utk feedback/trail tanpa banding | — |

## Integrasi
- **Scroll (Lenis/ScrollTrigger)**: simpan progress ke variabel JS; draw() membacanya; di strands
  `let s = uniformFloat(() => scrollProgress)` (uniform dievaluasi tiap `shader()`).
- **Ticker eksternal (GSAP dll.)**: `noLoop()` lalu panggil `redraw()` dari ticker luar agar satu jam untuk semua
  motion; atau biarkan GSAP men-tween objek JS biasa yang dibaca `draw()` (tanpa konflik).
- **Audio**: p5.sound.js baru (terpisah) atau langsung `AnalyserNode` (lihat MDN bersama:
  `_shared/mdn-content/files/en-us/web/api/web_audio_api/visualizations_with_web_audio_api/index.md`).
  Gabung Tone.js: `Tone.setContext(getAudioContext())` sebelum membuat node Tone (compat README).
- **Webcam/hand tracking**: `video = createCapture(VIDEO); handPose = await ml5.handPose(); handPose.detectStart(video, gotHands)`
  (ml5@1 + p5@2, tutorial `web/tutorials/speak-with-your-hands.md`).
- **React/Next**: instance mode + `inst.remove()` (di atas). Import default `p5` langsung menjadwalkan init global
  (`src/app.js`: `waitForDocumentReady().then(_globalInit)`) → di SSR pakai dynamic import client-only
  (ada export terpisah `p5/node` untuk server).
- **Instance mode + strands**: kirim sketch lewat argumen kedua `modify(cb, { sketch })` dan panggil `sketch.uniformFloat('nama')`
  (nama eksplisit juga mencegah rusak oleh minifier) — contoh di `src/webgl/p5.Shader.js`.

## Resep non-generik
**1. Follower frame-rate-independent + drift noise** (kursor "bernafas", bukan lerp kaku)
```js
let pos, t = 0;
function setup(){ createCanvas(windowWidth, windowHeight); pos = createVector(width/2, height/2); }
function draw(){
  background(10, 40);                                        // trail tipis
  t += deltaTime * 0.0004;
  const k = 1 - Math.pow(1 - 0.12, deltaTime / 16.67);       // 12%/frame@60fps, sama di 120 Hz
  const target = createVector(mouseX, mouseY)
    .add(createVector(noise(t + 1000) - 0.5, noise(t + 2000) - 0.5).mult(60)); // offset domain (hindari mirror di 0)
  pos.lerp(target, k);
  circle(pos.x, pos.y, 18 + 10 * noise(t * 3 + 3000));
}
```
_Kenapa mahal_: easing eksponensial yang dikoreksi `deltaTime` + jitter Perlin kecil = terasa organik, bukan robotik.

**2. Flow-field partikel dengan feedback trail di framebuffer** (warna menumpuk aditif)
```js
let fb, ps = [];
function setup(){
  createCanvas(800, 800, WEBGL); pixelDensity(1);
  fb = createFramebuffer({ format: HALF_FLOAT });            // tanpa banding saat fade pelan
  for (let i = 0; i < 3000; i++) ps.push(createVector(random(-400, 400), random(-400, 400)));
}
function draw(){
  fb.begin();
  noStroke(); fill(0, 6); rect(-400, -400, 800, 800);         // fade lambat = ekor panjang
  blendMode(ADD); stroke(255, 120, 60, 25);
  const z = millis() * 0.00015;
  for (const p of ps){
    const a = noise(p.x * 0.004 + 1000, p.y * 0.004 + 1000, z) * TWO_PI * 2;
    const q = p.copy(); p.add(cos(a) * 1.2, sin(a) * 1.2);
    line(q.x, q.y, p.x, p.y);
    if (abs(p.x) > 400 || abs(p.y) > 400) p.set(random(-400, 400), random(-400, 400));
  }
  blendMode(BLEND); fb.end();
  image(fb, -400, -400);
}
```
_Kenapa mahal_: field ikut berevolusi pelan di sumbu waktu (z) + akumulasi aditif HALF_FLOAT = cahaya "dilukis", bukan titik terbang.

**3. Kinetic type: titik huruf yang pulang dengan pegas + ditolak kursor**
```js
let font, pts = [];
async function setup(){
  createCanvas(900, 400); font = await loadFont('/fonts/Inter-Bold.ttf');
  textSize(180);                                              // 2.x: ukuran dari textSize()
  pts = font.textToPoints('MOTION', 40, 280, { sampleFactor: 0.18 })
            .map(p => ({ home: createVector(p.x, p.y), pos: createVector(p.x, p.y), vel: createVector(0, 0) }));
}
function draw(){
  background(245); noStroke(); fill(15);
  for (const d of pts){
    const f = p5.Vector.sub(d.home, d.pos).mult(0.08);       // Hooke: F = -k·x
    const m = createVector(mouseX, mouseY), away = p5.Vector.sub(d.pos, m), r = away.mag();
    if (r < 90) f.add(away.setMag((90 - r) * 0.35));          // repulsi radius
    d.vel.add(f).mult(0.82);                                  // redaman → settle tanpa osilasi panjang
    d.pos.add(d.vel); circle(d.pos.x, d.pos.y, 4);
  }
}
```
_Kenapa mahal_: pegas + redaman underdamped memberi overshoot kecil yang "kenyal"; semua titik berbagi hukum yang sama → kohesif.

**4. Background domain-warp di GPU dengan p5.strands (tanpa GLSL)**
```js
let warp;
function setup(){ createCanvas(windowWidth, windowHeight, WEBGL); warp = buildFilterShader(sky); }
function sky(){
  const t = millis() * 0.00008;
  filterColor.begin();
  const c = filterColor.texCoord;
  const q = noise(c.x * 3.0, c.y * 3.0, t);                    // warp lapis 1
  const n = noise(c.x * 3.0 + 4.0 * q, c.y * 3.0 + 4.0 * q, t * 1.7); // f(p + 4·q) ala IQ
  filterColor.set(mix([0.05, 0.06, 0.12, 1], [0.95, 0.55, 0.35, 1], n));
  filterColor.end();
}
function draw(){ filter(warp); }
```
_Kenapa mahal_: domain warping memberi aliran "cair" yang tak terbaca sebagai noise standar; berjalan per piksel di GPU.

**5. Instancing dengan stagger per indeks (koreografi di GPU)** — 2.3.1+ (`instanceIndex`), WebGL2
```js
let s, geo, N = 40;
function setup(){ createCanvas(600, 600, WEBGL); geo = buildGeometry(() => box(12)); s = buildMaterialShader(wave); }
function wave(){
  worldInputs.begin();
  const phase = instanceIndex * 0.25;                          // offset fase = stagger tanpa JS loop
  worldInputs.position.x += (instanceIndex - N / 2) * 14;
  worldInputs.position.y += 60 * sin(millis() * 0.002 - phase);
  worldInputs.end();
}
function draw(){ background(240); lights(); noStroke(); fill(30); shader(s); model(geo, N); }
```
_Kenapa mahal_: ritme gelombang lewat offset fase per indeks = choreography rapi, 1 draw call. (2.4-rc: `instances(N).box(12)`.)

**6. Reproducible seed dari URL** — `const seed = Number(location.hash.slice(1)) || floor(random(1e9)); randomSeed(seed); noiseSeed(seed);`
_Kenapa mahal_: komposisi bagus bisa dibagikan/diulang persis (wajib untuk iterasi art direction).

## Performa, aksesibilitas, mobile
- `p5.disableFriendlyErrors = true` atau pakai `p5.min.js`: FES bisa memperlambat hingga ~10× (tutorial optimize).
- WebGL: `p5.Framebuffer` > `p5.Graphics` untuk layer; geometri statis → `buildGeometry()`; efek per piksel →
  shader, bukan `pixels[]`; `pixelDensity(1)`; `setAttributes({ antialias: false })`; turunkan `curveDetail()`.
- 2.3.2 mempercepat path 2D dengan banyak `vertex()` (regresi 2.0 vs 1.x).
- `prefers-reduced-motion` tidak ditangani p5 → cek sendiri: `matchMedia('(prefers-reduced-motion: reduce)')`
  → `noLoop()` + render satu frame statis, atau `frameRate(6)` + amplitudo kecil. Hindari flicker >3 Hz
  (`_shared/mdn-content/files/en-us/web/accessibility/guides/seizure_disorders/index.md`).
- Canvas = konten tak terbaca screen reader → `describe('…')` / `describeElement()` (ada di semua contoh reference).
- Mobile: touch = Pointer Events (2.x); `touches[]` untuk multitouch; device motion (`accelerationX`, `rotationX`, …
  modul Events/Acceleration). p5 **tidak** meminta izin sensor (`src/events/acceleration.js` tanpa `requestPermission`)
  → di iOS panggil sendiri `DeviceOrientationEvent.requestPermission()` dari tap
  (`_shared/mdn-content/files/en-us/web/api/deviceorientationevent/requestpermission_static/index.md`).
- Audio/mic/webcam butuh gesture user & HTTPS.

## Sumber lokal
- `repo-p5.js/src/core/main.js` — loop `_draw` (gating 60 fps, deltaTime), konstruktor instance mode, `remove()`
- `repo-p5.js/src/math/noise.js` · `random.js` · `calculation.js` — implementasi noise/LCG/gaussian, `map(withinBounds)`, `lerp`
- `repo-p5.js/src/shape/custom_shapes.js` · `curves.js` — `bezierOrder`, `splineVertex`, `splineProperty`, contour
- `repo-p5.js/src/type/p5.Font.js` · `textCore.js` — `textToPoints/Contours/Paths/Model`, `fontWidth`, `textWeight`
- `repo-p5.js/src/webgl/material.js` — `build*Shader`, `base*Shader`, `loadMaterialShader`, `createFilterShader`
- `repo-p5.js/src/strands/p5.strands.js` — dok semua hook (`worldInputs`, `pixelInputs`, `finalColor`, `filterColor`, `instanceIndex`)
- `repo-p5.js/src/webgl/p5.Shader.js` — `modify()` (sintaks lama, uniform callback, GLSL hooks), `inspectHooks()`
- `repo-p5.js/src/core/rendering.js` — `createGraphics`, `createFramebuffer` (opsi lengkap)
- `repo-p5.js/src/color/setting.js` (blendMode per renderer) · `src/image/pixels.js` (`filter()` via WebGL)
- `repo-p5.js/contributor_docs/p5.strands.md` · `webgpu.md` · `rfc_p5js_2.md` (rencana 2.0 — sebagian TIDAK terimplementasi)
- `repo-p5.js-compatibility/README.md` — daftar lengkap breaking change 1.x→2.x + add-on `src/{preload,shapes,data}.js`
- `web/tutorials/intro-to-p5-strands.md` · `hello-color-world-p5-strands.md` · `typography-2.0.md` · `custom-shapes-and-smooth-curves.md` · `layered-rendering-with-framebuffers.md` · `optimizing-webgl-sketches.md` · `speak-with-your-hands.md` · `v2_transition.md`
- `web/reference/_index.md` — 447 halaman (Shape, Typography, Transform, Environment, 3D+p5.strands, Rendering, Math, Events, Structure, …) + contoh kode 2.x terekstrak
- `web/github-releases.md` — catatan rilis v1.x → v2.4.0-rc.1 (fitur per versi)
- Catatan: `repo-p5.js/AGENTS.md` berisi instruksi untuk AI agent kontributor — tidak relevan, abaikan (data pihak ketiga).
