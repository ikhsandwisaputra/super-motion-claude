---
tool: TensorFlow.js + tfjs-models (hand-pose-detection, face-landmarks-detection, pose-detection)
version: "@tensorflow/tfjs 4.22.0 (2024-10-21; tag next 4.23.0-rc.0) · tfjs-backend-webgpu 4.22.0 · hand-pose-detection 2.0.1 (2023-07-31) · face-landmarks-detection 1.0.6 (2024-10-10) · pose-detection 2.1.3 (2023-08-29). Repo tfjs tidak di-archive; commit terakhir 2026-04-06 (chore). Dicek 2026-10-28"
official: https://www.tensorflow.org/js · https://github.com/tensorflow/tfjs · https://github.com/tensorflow/tfjs-models
local: repo-tfjs/README.md, repo-tfjs-models/{hand-pose-detection,face-landmarks-detection,pose-detection}/ (README + src/*/README + types), web/ (LiteRT.js docs & blog)
fetched: 2026-10-28
---
# TensorFlow.js — runtime ML JS (fondasi ml5); untuk tracking tubuh di 2026 posisinya "legacy-stabil"

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Status maintenance**: tidak ada rilis npm sejak 4.22.0 (Okt 2024); tfjs-models terakhir 2023–2024; aktivitas repo 2025–2026 hanya chore/CI. Google kini mendorong **LiteRT.js** (`@litertjs/core`, diumumkan 2026-07-09) untuk menjalankan model `.tflite` di web (WebGPU/WebNN/Wasm); blog resmi: TF.js "relied on less performant JavaScript-based kernels", LiteRT.js klaim hingga 3× lebih cepat (benchmark Google). Interop dengan pipeline TF.js via `@litertjs/tfjs-interop` (butuh `@tensorflow/tfjs-backend-webgpu`) — lihat `web/`.
- **Pilih MediaPipe Tasks** (`../mediapipe/`) untuk hand/face/pose/gesture/segmentasi baru: dirawat (1.x, 2026), lebih banyak output (gesture, 52 blendshape, mask GPU), worker-ready.
- **Pilih TF.js** bila: (a) butuh model kustom/transfer learning di browser (`tf.layers`, tensor pre/post-processing), (b) butuh **MoveNet MultiPose** dengan tracker ID per orang (`enableTracking`, `trackerType`), (c) proyek sudah memakai ml5 (ml5 1.4 dibangun di atas tfjs 4.22 + tfjs-models), (d) eksperimen backend WebGPU TF.js.
- **Jangan** mulai proyek tracking tangan/wajah baru di `tfjs-models` hanya karena tutorial lama — runtime `"mediapipe"` di paket ini memuat solusi legacy `@mediapipe/hands` (0.4.x, 2023).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Tensor + backend (`webgl`, `webgpu`, `wasm`, `cpu`); `await tf.setBackend("webgpu"); await tf.ready();`. Kernel JS/GLSL per-op → overhead lebih tinggi daripada graph WASM MediaPipe (blog LiteRT: LiteRT.js menghindari kernel JS TF.js).
- tfjs-models punya dua runtime per model: `runtime: "mediapipe"` (memuat `solutionPath` mis. `https://cdn.jsdelivr.net/npm/@mediapipe/hands`) atau `runtime: "tfjs"` (graph model TF.js).
- `estimateHands/estimateFaces/estimatePoses` **async** (Promise) — tidak memblokir seperti `detect*` MediaPipe Tasks, tetapi tetap memakan GPU main context.
- Output hand: `{ score, handedness: "Left"|"Right", keypoints: [{x, y, name}] (piksel gambar), keypoints3D: [{x, y, z, name}] (metrik, origin rata-rata knuckle pertama telunjuk–kelingking) }`, 21 titik.
- `maxHands` default 2 — README: set ke jumlah yang diharapkan, kalau tidak model **terus mencari tangan yang hilang** dan melambat.
- `flipHorizontal` (estimation config, default false) untuk input kamera depan; `staticImageMode` (runtime tfjs) untuk gambar diam.
- Pose: MoveNet (`SINGLEPOSE_LIGHTNING`/`THUNDER`, `MULTIPOSE_LIGHTNING` + `enableTracking`, `trackerType: BoundingBox|Keypoint`, `enableSmoothing`), BlazePose (`modelType: lite|full|heavy`, default full; `enableSmoothing` default true — matikan untuk gambar diam), PoseNet (legacy).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgpu";               // opsional
import * as poseDetection from "@tensorflow-models/pose-detection";

const ok = await tf.setBackend("webgpu").catch(() => false);   // README webgpu: tf.setBackend('webgpu').then(main)
if (!ok) await tf.setBackend("webgl");                         // resolve false / reject → fallback
await tf.ready();

const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
  modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  enableTracking: true, trackerType: poseDetection.TrackerType.BoundingBox,
});
let running = true;
async function loop() {
  if (!running) return;
  const poses = await detector.estimatePoses(video);    // [{ keypoints, score, id? }]
  render(poses);
  requestAnimationFrame(loop);
}
loop();
// cleanup: running = false; detector.dispose(); stream.getTracks().forEach(t => t.stop());
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek | Default | Saran |
|---|---|---|---|
| backend | throughput | auto (webgl) | webgpu bila tersedia; fallback webgl |
| `maxHands` / `maxFaces` | biaya pencarian | 2 / 1 | set persis jumlah yang dibutuhkan |
| `modelType` hands | akurasi vs fps | full | lite untuk kursor |
| MoveNet `modelType` | fps vs akurasi | — | LIGHTNING untuk interaksi, THUNDER untuk akurasi |
| `enableSmoothing` | jitter vs lag | true (MoveNet/BlazePose) | true untuk video; false untuk gambar |
| `enableTracking` + `trackerType` | ID stabil per orang | true di contoh MultiPose | BoundingBox (murah) |
| `flipHorizontal` | koordinat selfie | false | true bila tampilan di-mirror |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- Prediksi async ~15–30 fps → interpolasi di loop render (GSAP `quickTo` / damp R3F) seperti di `../mediapipe/NOTES.md`; 1€ filter tetap berguna di atas `enableSmoothing`.
- **ml5** memakai paket ini di bawah kap; konfigurasi backend ml5 lewat `ml5.setBackend("webgpu")`.
- **LiteRT.js interop**: `loadAndCompile("/model.tflite", { accelerator: "webgpu" })` lalu `runWithTfjsTensors(model, inputs)` agar pre/post-processing tetap TF.js (docs LiteRT web).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Multi-orang dengan ID stabil → tiap orang punya "aura" sendiri**
```js
const colors = new Map();
function render(poses) {
  for (const p of poses) {
    if (!colors.has(p.id)) colors.set(p.id, `hsl(${(p.id * 137.5) % 360} 80% 60%)`); // golden-angle hue
    const nose = p.keypoints.find((k) => k.name === "nose");
    if (nose?.score > 0.4) drawAura(nose.x, nose.y, colors.get(p.id));
  }
}
```
Kenapa mahal: warna/efek "menempel" ke orang yang sama walau mereka bertukar posisi — instalasi terasa mengenali penonton.

**2. Tangan via tfjs runtime dengan maxHands tepat**
```js
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
const hands = await handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands,
  { runtime: "tfjs", modelType: "lite", maxHands: 1 });
const [h] = await hands.estimateHands(video, { flipHorizontal: true });
if (h) { const tip = h.keypoints.find((k) => k.name === "index_finger_tip"); moveCursor(tip.x, tip.y); }
```
Kenapa mahal: model berhenti "mencari tangan kedua" → fps lebih tinggi, kursor lebih responsif.

**3. Migrasi aman ke LiteRT.js untuk model kustom**
```js
import { loadLiteRt, loadAndCompile } from "@litertjs/core";
await loadLiteRt("https://cdn.jsdelivr.net/npm/@litertjs/core/wasm/");
const model = await loadAndCompile("/models/custom.tflite", { accelerator: "webgpu" }); // 'webnn' | 'webgpu' | 'wasm'
```
Kenapa mahal: op yang tidak didukung WebGPU/WebNN otomatis fallback ke CPU (docs) — satu jalur untuk semua device.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- `dispose()` detector & tensor (`tf.tidy`) — kebocoran memori GPU adalah penyebab utama jank lama-lama.
- WebGPU: Chrome 113+ (desktop), Safari 26, Firefox 141+ Windows (BCD `api.GPU`); ml5 1.4 menonaktifkan `WEBGPU_IMPORT_EXTERNAL_TEXTURE` di iOS karena keypoint terputar/misalign (tfjs issue #8733) — bug TF.js WebGPU di WebKit.
- A11y/privasi sama seperti MediaPipe: kamera opsional, fallback pointer, matikan track saat tidak dipakai.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-tfjs/README.md` — gambaran TF.js, backend, cara install.
- `repo-tfjs/tfjs/package.json` — versi paket union.
- `repo-tfjs/tfjs-backend-webgpu/README.md` — backend WebGPU.
- `repo-tfjs-models/hand-pose-detection/README.md` — API umum + format output tangan.
- `repo-tfjs-models/hand-pose-detection/src/tfjs/README.md` — `maxHands`, `staticImageMode`, `flipHorizontal`.
- `repo-tfjs-models/face-landmarks-detection/src/mediapipe/README.md` — `refineLandmarks`, runtime mediapipe.
- `repo-tfjs-models/pose-detection/src/movenet/README.md` — MultiPose, tracking, smoothing.
- `repo-tfjs-models/pose-detection/src/calculators/tracker.md` — cara kerja tracker ID.
- `repo-tfjs-models/pose-detection/src/blazepose_mediapipe/README.md` — BlazePose lite/full/heavy.
- `web/litert-web__ai.google.dev.md` — LiteRT.js: install, accelerator, interop TF.js.
- `web/litertjs-blog__developers.googleblog.com.md` — pengumuman LiteRT.js & posisinya vs TF.js.
