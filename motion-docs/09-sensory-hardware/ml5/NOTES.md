---
tool: ml5.js (ml5-next-gen, API v1)
version: "1.4.0 (npm latest, 2026-08-07; repo ml5-next-gen HEAD 4a08ce4). Docs site docs.ml5js.org = repo ml5-website-v02-docsify HEAD b514db7. Dicek 2026-10-28"
official: https://docs.ml5js.org/ · https://github.com/ml5js/ml5-next-gen
local: repo-ml5-docs/docs/reference/*.md (referensi resmi), repo-ml5-next-gen/src/ (HandPose, FaceMesh, BodyPose, BodySegmentation, SoundClassifier, DepthEstimation), repo-ml5-next-gen/examples/
fetched: 2026-10-28
---
# ml5.js — ML ramah p5.js: prototipe interaksi tubuh/suara dalam hitungan menit

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk sketch p5.js / prototipe / workshop: `handPose`, `faceMesh`, `bodyPose` (MoveNet/BlazePose), `bodySegmentation` (Selfie/BodyPix), `soundClassifier` (SpeechCommands18w / Teachable Machine), `depthEstimation`, `neuralNetwork`. API seragam: `detectStart(media, cb)` / `detectStop()`.
- Di bawah kap: `@tensorflow/tfjs ^4.22.0` + `tfjs-backend-webgpu` + `@tensorflow-models/*` + solusi legacy `@mediapipe/hands|face_mesh|pose|selfie_segmentation` (package.json) → mewarisi status "legacy-stabil" TF.js (`../tfjs/`).
- **Jangan** untuk produksi berat / gesture & blendshape → MediaPipe Tasks (`../mediapipe/`) lebih cepat, punya kategori gesture & 52 blendshape, jalan di worker.
- Situs Awwwards non-p5 tetap bisa pakai ml5 (global `ml5` via `<script>`), tapi helper p5 (preload/createCapture) jadi tidak relevan.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Loop deteksi internal memakai `await tf.nextFrame()` antar inference (source `HandPose/index.js`) — callback hasil datang secepat model sanggup, tidak sinkron dengan frame kamera baru.
- `detectStart` dipanggil dua kali tanpa `detectStop` → hanya panggilan terakhir yang berlaku (warning di source).
- **p5.js 2.x**: `async function setup() { handPose = await ml5.handPose(); }` (contoh repo memakai p5@2.3.2). **p5 1.x**: panggil di `preload()` (ml5 mendaftarkan integrasi preload otomatis).
- `flipped` (alias `flipHorizontal`) membalik **hasil** secara horizontal — pasangkan dengan video yang juga di-flip (`createCapture(VIDEO, { flipped: true })` di p5 — API p5, cek dokumentasi p5).
- handPose output: `{ confidence, handedness, keypoints: [{x, y, confidence, name}], keypoints3D, index_finger_tip: {x, y, x3D, y3D, z3D}, … }` — akses per nama bagian langsung.
- Backend: `ml5.setBackend("cpu" | "webgl" | "webgpu")`; ml5 1.4 otomatis menonaktifkan `WEBGPU_IMPORT_EXTERNAL_TEXTURE` di iOS/iPadOS agar keypoint video tidak terputar (issue ml5 #302 / tfjs #8733).
- `ml5.tf` & `ml5.tfvis` diekspos → bisa turun ke TF.js langsung.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```html
<script src="https://cdn.jsdelivr.net/npm/p5@2.3.2/lib/p5.js"></script>
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>   <!-- 1.x terbaru; pin @1.4.0 untuk produksi -->
```
```js
let video, handPose, hands = [];
async function setup() {
  createCanvas(640, 480);
  handPose = await ml5.handPose({ maxHands: 1, modelType: "lite", flipped: true });
  video = createCapture(VIDEO, { flipped: true }); video.size(640, 480); video.hide();
  handPose.detectStart(video, (results) => { hands = results; });
}
function draw() {
  image(video, 0, 0, width, height);
  const tip = hands[0]?.index_finger_tip;
  if (tip) circle(tip.x, tip.y, 16);
}
// cleanup: handPose.detectStop(); video.remove();
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Model / opsi | Efek | Default | Saran |
|---|---|---|---|
| handPose `maxHands` | biaya pencarian | 2 | 1 untuk kursor (tfjs-models: jangan cari tangan yang tidak ada) |
| handPose `modelType` | fps vs akurasi | "full" | "lite" untuk interaksi |
| handPose `runtime` | tfjs vs legacy mediapipe | "tfjs" | biarkan "tfjs" |
| faceMesh `maxFaces`, `refineLandmarks` | biaya; iris | 1, false | `refineLandmarks: true` hanya bila butuh mata |
| bodyPose model | MoveNet vs BlazePose | MoveNet `MULTIPOSE_LIGHTNING` | BlazePose untuk 3D/kaki |
| bodyPose `enableSmoothing` | jitter vs lag | true | true untuk video |
| bodyPose `minPoseScore` | false positive | 0.25 | 0.3–0.4 di ruang ramai |
| bodySegmentation `maskType` | background / person / parts | "background" | "person" untuk efek pada tubuh |
| soundClassifier `probabilityThreshold` | sensitivitas kata | 0 | 0.7–0.9 untuk perintah suara |
| soundClassifier `overlapFactor` | frekuensi prediksi | 0.5 | 0.5–0.75 (lebih responsif, lebih berat) |
| depthEstimation `minDepth`/`maxDepth`, `dilationFactor` | rentang & tepi | 0.2/0.75, 4 | sesuaikan per ruangan |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- Hasil ml5 masuk lewat callback → simpan di variabel; animasi (p5 `draw`, GSAP ticker, R3F `useFrame`) membaca nilai terbaru + interpolasi (`lerp`) — jangan animasi di dalam callback.
- Non-p5: `const hp = await ml5.handPose(); hp.detectStart(videoEl, cb)` — media boleh `<video>`/`<canvas>`/`<img>` HTML biasa (docs: "HTML or p5.js image, video, or canvas element").
- Filter tambahan: 1€ filter dari `../mediapipe/web/one-euro-filter__OneEuroFilter.reference.js` untuk kursor halus.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. "Pinch-to-paint" dengan smoothing p5**
```js
let px = 0, py = 0;
function draw() {
  const h = hands[0]; if (!h) return;
  const a = h.thumb_tip, b = h.index_finger_tip;
  const tx = (a.x + b.x) / 2, ty = (a.y + b.y) / 2;
  px = lerp(px, tx, 0.35); py = lerp(py, ty, 0.35);              // damping ringan
  const pinch = dist(a.x, a.y, b.x, b.y) < dist(h.wrist.x, h.wrist.y, h.middle_finger_mcp.x, h.middle_finger_mcp.y) * 0.25;
  if (pinch) { noStroke(); fill(255, 80); circle(px, py, 18); }
}
```
Kenapa mahal: ambang pinch dinormalisasi ke ukuran tangan → sama rasanya dekat/jauh dari kamera.

**2. Perintah suara pendek → aksi UI**
```js
const classifier = await ml5.soundClassifier("SpeechCommands18w", { probabilityThreshold: 0.85 });
classifier.classifyStart((results) => {
  const top = results[0];                                       // { label, confidence }
  if (top.label === "up") nextSlide(); if (top.label === "down") prevSlide();
});
```
Kenapa mahal: kontrol tanpa tangan untuk instalasi/pameran, tanpa server (model lokal).

**3. Siluet orang sebagai mask kreatif**
```js
const seg = await ml5.bodySegmentation("SelfieSegmentation", { maskType: "person", flipped: true });
seg.detectStart(video, (r) => { mask = r.mask; });             // gambar p5 dengan piksel transparan di tubuh
function draw() { background(10); image(video, 0, 0); if (mask) { blendMode(DIFFERENCE); image(mask, 0, 0); blendMode(BLEND); } }
```
Kenapa mahal: efek "lubang" / inversi mengikuti tubuh pengunjung secara real-time — performatif tanpa green screen.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- `detectStop()` saat tidak dipakai (tab hidden, scene lain) — loop `tf.nextFrame` terus makan GPU.
- Turunkan `video.size()` (mis. 320×240) untuk mobile; model "lite"; `maxHands/maxFaces` minimal.
- Backend WebGPU lebih cepat di Chrome desktop; di iOS ml5 sudah memasang workaround orientasi.
- A11y & privasi: kamera/mic opsional, tombol mulai eksplisit, fallback mouse/keyboard; jelaskan bahwa pemrosesan lokal.
- Docs offline: `repo-ml5-docs/docs/learn/using-ml5-offline.md` (host model sendiri).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-ml5-docs/docs/reference/handpose.md` — opsi, `detectStart`/`detectStop`, struktur hasil.
- `repo-ml5-docs/docs/reference/facemesh.md` — `maxFaces`, `refineLandmarks`, parts.
- `repo-ml5-docs/docs/reference/bodypose.md` — MoveNet vs BlazePose, tracking, smoothing.
- `repo-ml5-docs/docs/reference/body-segmentation.md` — SelfieSegmentation/BodyPix, `maskType`.
- `repo-ml5-docs/docs/reference/sound-classifier.md` — `classifyStart`, threshold, overlap.
- `repo-ml5-docs/docs/reference/depthestimation.md` — `estimateStart`, opsi depth.
- `repo-ml5-docs/docs/README.md` — getting started (p5 2.x async setup vs preload 1.x).
- `repo-ml5-docs/docs/learn/using-ml5-offline.md` — model lokal.
- `repo-ml5-next-gen/src/HandPose/index.js` — loop `tf.nextFrame`, opsi & alias `flipped`.
- `repo-ml5-next-gen/src/utils/configureBackend.js` — workaround WebGPU iOS.
- `repo-ml5-next-gen/examples/handPose-*/sketch.js` — contoh resmi (p5@2.3.2).
- `repo-ml5-next-gen/package.json` — dependensi TF.js / tfjs-models / @mediapipe legacy.
