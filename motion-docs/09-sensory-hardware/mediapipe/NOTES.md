---
tool: MediaPipe Tasks Vision (Google AI Edge) — @mediapipe/tasks-vision
version: "npm 1.2.0 (2026-10-27). Lompatan 0.10.35 → 1.0.0 terjadi 2026-07-28; 1.1.0 (2026-10-06), 1.1.1 (2026-10-14). Repo google-ai-edge/mediapipe HEAD f329091; mediapipe-samples-web HEAD 1e13307. Dicek 2026-10-28"
official: https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js (npm https://www.npmjs.com/package/@mediapipe/tasks-vision)
local: repo-mediapipe/mediapipe/tasks/web/ (source TS + README npm), repo-mediapipe-samples-web/src/ (sample resmi, worker), web/ (guide web_js + overview 7 task, privacy, release notes, 1€ filter)
fetched: 2026-10-28
---
# MediaPipe Tasks Vision — tangan, wajah, pose, gesture & segmentasi dari webcam, on-device, GPU

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai (default 2026)** untuk interaksi webcam: kursor tangan / pinch-drag, gesture (8 kategori bawaan), ekspresi wajah (52 blendshape), pose 33 titik, segmentasi orang/rambut untuk efek shader. Aktif dirilis (≥7 rilis GitHub Jan–Okt 2026, kini 1.x), WASM + delegate GPU (WebGL2), jalan di Web Worker.
- **TF.js models** (`../tfjs/`): rilis terakhir 2023–2024 dan sebagian dibangun di atas solusi legacy `@mediapipe/hands` (2023). Pilih hanya kalau sudah terikat pipeline TF.js.
- **ml5.js** (`../ml5/`): pembungkus ramah p5.js di atas TF.js models — prototyping/edukasi cepat, bukan produksi berat.
- **Jangan** jalankan `detect*()` di main thread bersama animasi berat: method-nya **sinkron & memblokir UI thread** (docs web_js) → worker.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- `FilesetResolver.forVisionTasks(basePath?, useModule = false)` memilih WASM SIMD vs `_nosimd` otomatis; `useModule: true` memuat varian `_module` (untuk module worker). Pin versi CDN WASM = versi paket JS (README memakai `…/tasks-vision/wasm`, docs memakai `@latest` — jangan biarkan beda versi di produksi; heuristik).
- `createFromOptions(fileset, { baseOptions: { modelAssetPath | modelAssetBuffer, delegate: "CPU" | "GPU" }, runningMode: "IMAGE" | "VIDEO", canvas?, … })`. GPU butuh WebGL2; opsi `canvas` mengikat konteks WebGL (error bila canvas sudah punya konteks jenis lain). Sample resmi: coba GPU, **fallback CPU** bila init gagal (WebGL2 tidak ada, software renderer, context lost).
- `detectForVideo(frame, timestampMs, imageProcessingOptions?)` — `timestamp` (ms) **wajib** di signature TS walau snippet docs menghilangkannya; harus naik monoton (task runner menyimpan `latestOutputTimestamp`). Pakai `now` dari `requestVideoFrameCallback` / `performance.now()`.
- Proses hanya frame baru: docs memakai `video.currentTime !== lastVideoTime`; lebih presisi: `video.requestVideoFrameCallback((now, meta) => …)` (Chrome 83, Firefox 132, Safari 15.4 — BCD) yang mengikuti frame rate video, bukan refresh layar.
- Mode VIDEO = **tracking**: palm/face detector hanya jalan lagi bila tracking gagal. `minTrackingConfidence` = ambang IoU bbox antar frame; `minHandPresenceConfidence` di bawah ambang → detector dipanggil lagi (docs). Turunkan = tracking "lengket" & murah; naikkan = lebih sering re-detect (jitter/lompat).
- Hasil: `landmarks` ternormalisasi [0,1] (x/y per lebar/tinggi gambar), `z` relatif pergelangan (lebih kecil = lebih dekat kamera); `worldLandmarks` dalam **meter**, origin di pusat geometris tangan. Tiap landmark punya `visibility` dan (1.1.0+) `presence`.
- Indeks tangan (`HandLandmark` enum): 0 WRIST, 4 THUMB_TIP, 8 INDEX_FINGER_TIP, 12 MIDDLE_FINGER_TIP, 16 RING_FINGER_TIP, 20 PINKY_TIP, 5/9/13/17 MCP. Pinch = jarak 4↔8.
- GestureRecognizer kategori bawaan: `None, Closed_Fist, Open_Palm, Pointing_Up, Thumb_Down, Thumb_Up, Victory, ILoveYou`; filter lewat `cannedGesturesClassifierOptions: { scoreThreshold, categoryAllowlist | categoryDenylist, maxResults }`. Hasil: `gestures`, `handedness` (`handednesses` deprecated), `landmarks`, `worldLandmarks`.
- FaceLandmarker: 478 landmark, 52 blendshape (`outputFaceBlendshapes: true`; nama mis. `browInnerUp`, `browDownLeft`, `jawOpen`), `facialTransformationMatrixes` (`outputFacialTransformationMatrixes: true`, `Matrix { rows, columns, data }`) untuk menempel objek 3D. **`*Left/*Right` = sisi wajah subjek; input yang di-mirror membalik output** (docs). 1.2.0: blendshape dihitung di CPU walau delegate GPU.
- PoseLandmarker: 33 landmark, model lite/full/heavy, `outputSegmentationMasks`. ImageSegmenter: selfie (256×256 / landscape 144×256), hair (512×512), multiclass selfie, DeepLab-v3; `outputConfidenceMasks` default true, `outputCategoryMask` default false.
- `MPMask` (mask segmentasi): di mode callback data **hanya valid selama callback**; versi return disalin. Wajib `close()` (kalau tidak: warning leak). `getAsWebGLTexture()` / `getAsFloat32Array()` / `getAsUint8Array()`; texture dipakai langsung di shader bila satu konteks GL.
- InteractiveSegmenter **v2 (1.0.0+)**: `setImage(image)` (encoder sekali) lalu `segment([{ brushMode: BrushMode.POSITIVE | NEGATIVE | LASSO, point: [{x,y}], isCompleted }])` → `MPMask`; model `interactive_segmenter_v2/magic_touch/int8/…`. API lama = `InteractiveSegmenterLegacy`.
- **Privasi** (Tasks Privacy Notice, update 2026-06-05): gambar/video diproses on-device dan **tidak** dikirim ke Google, TAPI Tasks API **mengirim metrik performa & utilisasi ke Google**; developer bertanggung jawab memperoleh *informed consent* user. (Release 1.1.0: "Add stats logging to Web Tasks"; factory logger tidak ada di repo OSS.)

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";   // npm i @mediapipe/tasks-vision@1.2.0

const fileset = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.0/wasm");
const MODEL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
async function create(delegate) {
  return HandLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: MODEL, delegate },
    runningMode: "VIDEO", numHands: 2,
    minHandDetectionConfidence: 0.5, minHandPresenceConfidence: 0.5, minTrackingConfidence: 0.5,
  });
}
const hands = await create("GPU").catch(() => create("CPU"));                // fallback seperti sample resmi

// kamera hanya setelah klik tombol yang menjelaskan tujuannya (lihat resep 5)
const stream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
video.srcObject = stream; await video.play();

let handle;
const onFrame = (now) => {
  const res = hands.detectForVideo(video, now);   // now: DOMHighResTimeStamp, monoton
  update(res, now);                               // landmarks → interaksi (resep 1)
  handle = video.requestVideoFrameCallback(onFrame);
};
handle = video.requestVideoFrameCallback(onFrame);

function destroy() {
  video.cancelVideoFrameCallback(handle);
  stream.getTracks().forEach((t) => t.stop());   // lampu kamera mati = sinyal privasi
  hands.close();
}
```
Model lain: `…/face_landmarker/face_landmarker/float16/1/face_landmarker.task`, `…/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task`, `…/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task`, `…/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite` (semua di `storage.googleapis.com/mediapipe-models/`).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek ke feel | Default | Rentang bagus |
|---|---|---|---|
| `numHands`/`numFaces`/`numPoses` | biaya & kemungkinan salah pasang | 1 | 1 untuk kursor; 2 untuk dua tangan |
| `minHandDetectionConfidence` | kapan tangan "muncul" | 0.5 | 0.5–0.7 (kurangi false positive) |
| `minHandPresenceConfidence` / `minTrackingConfidence` | lengket vs sering re-detect | 0.5 / 0.5 | 0.3–0.5 untuk kursor stabil |
| `delegate` | latency | CPU | "GPU" + fallback |
| resolusi kamera | latency & noise | — | 640×480 cukup; >720p jarang perlu (heuristik) |
| 1€ `minCutoff` (Hz) | jitter saat diam | 1.0 (impl. resmi) | mulai 1, turunkan sampai jitter hilang |
| 1€ `beta` | lag saat cepat | 0 | 0.001–0.1 tergantung unit; naikkan sampai lag hilang |
| 1€ `dcutoff` | smoothing kecepatan | 1.0 | biarkan |
| hysteresis pinch (worldLandmarks, m) | klik tidak "berkedip" | — | masuk < ~0.03 m, keluar > ~0.05 m (heuristik) |
| durasi tahan gesture | anti salah-picu | — | 150–300 ms (heuristik) |
| `cannedGesturesClassifierOptions.scoreThreshold` | selektivitas gesture | metadata model | 0.6–0.8 |

1€ tuning resmi (gery.casiez.net/1euro): set `beta = 0`, `minCutoff ≈ 1 Hz`; diamkan tangan & turunkan `minCutoff` sampai jitter hilang; lalu gerak cepat & naikkan `beta` (mulai 0.001/0.0001, kali ×10) sampai lag hilang. "Lag di kecepatan tinggi → naikkan beta; jitter saat pelan → turunkan minCutoff". Timestamp impl. resmi dalam **detik** (`freq = 1/(t − tPrev)`).

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
(API GSAP/three/R3F di bawah diverifikasi di NOTES kategori masing-masing; yang diverifikasi di sini hanya sisi MediaPipe.)
- **Worker (pola sample resmi `repo-mediapipe-samples-web`)**: main thread `createImageBitmap(video)` → `postMessage({ bitmap, timestampMs }, [bitmap])`; worker `detectForVideo(bitmap, timestampMs)` lalu `bitmap.close()`; hasil (array angka kecil) dikirim balik. Main thread bebas untuk GSAP/R3F 60–120 fps.
- **GSAP**: hasil tracking cuma ~30 fps → jangan set posisi langsung; tulis target, lalu `gsap.quickTo(el, "x", { duration: 0.25, ease: "power3" })` atau spring sendiri di `gsap.ticker` (interpolasi antar frame kamera).
- **R3F**: simpan landmark terakhir di ref; di `useFrame` lerp/damp objek ke target (`THREE.MathUtils.damp(current, target, lambda, delta)`), `facialTransformationMatrixes[0].data` (4×4) → `matrix.fromArray(data)` untuk head-anchored object.
- **Shader / OGL / Three**: mask segmentasi `getAsWebGLTexture()` sebagai uniform (blur/refraksi latar, outline glow orang) — satu konteks WebGL dengan opsi `canvas` task.
- **Mirror**: kirim frame **tidak di-mirror** ke model, mirror hanya tampilan (`transform: scaleX(-1)` pada video + overlay) dan pakai `x = 1 − lm.x` untuk koordinat interaksi → blendshape Left/Right tetap benar.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Kursor tangan + pinch dengan hysteresis skala-invarian**
```js
import { OneEuroFilter } from "./OneEuroFilter.js";      // salinan impl. resmi: web/one-euro-filter__OneEuroFilter.reference.js
const fx = new OneEuroFilter(30, 1.0, 0.02), fy = new OneEuroFilter(30, 1.0, 0.02);
let pinching = false;
function update(res, nowMs) {
  if (!res.landmarks.length) { pinching = false; return hideCursor(); }
  const lm = res.landmarks[0], w = res.worldLandmarks[0];
  const t = nowMs / 1000;                                 // detik untuk 1€
  const x = fx.filter(1 - lm[8].x, t), y = fy.filter(lm[8].y, t);     // ujung telunjuk, mirrored
  const d = Math.hypot(w[4].x - w[8].x, w[4].y - w[8].y, w[4].z - w[8].z); // meter: tak tergantung jarak ke kamera
  if (!pinching && d < 0.03) { pinching = true; onPinchStart(x, y); }
  else if (pinching && d > 0.05) { pinching = false; onPinchEnd(x, y); }
  moveCursor(x * innerWidth, y * innerHeight, pinching);
}
```
Kenapa mahal: kursor tenang saat diam tapi tanpa lag saat dikibas (1€), dan "klik" tidak berkedip di ambang karena hysteresis berbasis meter.

**2. Gesture sebagai state machine (tahan untuk konfirmasi)**
```js
// createFromOptions(..., { runningMode: "VIDEO", cannedGesturesClassifierOptions: { scoreThreshold: 0.7, categoryAllowlist: ["Open_Palm", "Closed_Fist", "Victory"] } })
let cand = null, since = 0, active = "None";
function onGestures(res, nowMs) {
  const g = res.gestures[0]?.[0]?.categoryName ?? "None";
  if (g !== cand) { cand = g; since = nowMs; return; }
  if (g !== active && nowMs - since > 200) { active = g; emit(g); }   // Closed_Fist=grab, Open_Palm=release
}
```
Kenapa mahal: gesture terasa disengaja — tidak ada aksi "nyasar" saat tangan transisi antar pose.

**3. Blendshape wajah → variabel ekspresif**
```js
// FaceLandmarker.createFromOptions(fileset, { ..., runningMode: "VIDEO", outputFaceBlendshapes: true })
function onFace(res) {
  const cats = res.faceBlendshapes[0]?.categories; if (!cats) return;
  const bs = Object.fromEntries(cats.map((c) => [c.categoryName, c.score]));  // baca nama runtime, jangan hardcode
  mascot.style.setProperty("--jaw", (bs.jawOpen ?? 0).toFixed(3));
  mascot.style.setProperty("--brow", (bs.browInnerUp ?? 0).toFixed(3));
}
```
Kenapa mahal: maskot/tipografi "menirukan" wajah user secara halus (mulut, alis) — respon emosional, bukan sekadar mengikuti kepala.

**4. Segmentasi orang → tekstur shader (efek latar, tanpa readback CPU)**
```js
const seg = await ImageSegmenter.createFromOptions(fileset, {
  baseOptions: { modelAssetPath: SELFIE_MODEL, delegate: "GPU" }, canvas: glCanvas,
  runningMode: "VIDEO", outputConfidenceMasks: true, outputCategoryMask: false });
seg.segmentForVideo(video, now, (result) => {
  const mask = result.confidenceMasks[0];
  drawWithMask(mask.getAsWebGLTexture());   // pakai di sini saja: data hanya valid selama callback
});
// mode return (tanpa callback) menyalin data → panggil result.close() setelah dipakai (ImageSegmenterResult.close())
```
Kenapa mahal: latar bisa melebur/refraksi di sekitar siluet user secara real-time di GPU — efek "studio" tanpa green screen.

**5. UX izin kamera yang jujur**
```js
camBtn.addEventListener("click", async () => {            // jelaskan dulu: "Gerakkan tangan untuk mengontrol. Video tidak dikirim ke server."
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    startTracking(stream); camBtn.textContent = "Matikan kamera";
  } catch (e) {
    showPointerFallback(e.name === "NotAllowedError" ? "Izin kamera ditolak — pakai mouse/sentuh." : "Kamera tidak tersedia.");
  }
});
```
Kenapa mahal: user paham manfaat sebelum prompt muncul, selalu ada jalan keluar (fallback pointer) dan tombol mati — rasa percaya = interaksi dipakai.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Worker + `ImageBitmap` transfer; satu inference per frame kamera (rVFC), bukan per rAF. Turunkan resolusi input sebelum menaikkan model.
- GPU delegate butuh WebGL2 (Safari 15+, Chrome 56+/Android 58+, Firefox 51+ — BCD); siapkan fallback CPU. WebGPU belum jadi delegate publik web di sumber lokal.
- iOS: sample README mensyaratkan iOS 16+. Kamera butuh HTTPS + izin; `facingMode: "user"`.
- Tutup semua: `task.close()`, `MPMask.close()`, stop track kamera saat tab hidden (`visibilitychange`) — hemat baterai & lampu kamera padam.
- A11y: interaksi webcam selalu **opsional** dengan padanan pointer/keyboard; `prefers-reduced-motion` → redam parallax/kamera virtual yang digerakkan kepala.
- Privasi: informasikan bahwa video diproses lokal **dan** bahwa metrik penggunaan dikirim ke Google (privacy notice) — minta persetujuan bila diwajibkan hukum.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-mediapipe/mediapipe/tasks/web/vision/README.md` — README npm (contoh semua task, termasuk Interactive Segmenter v2).
- `repo-mediapipe/mediapipe/tasks/web/core/fileset_resolver.ts.template` — `forVisionTasks(basePath, useModule)`, deteksi SIMD.
- `repo-mediapipe/mediapipe/tasks/web/vision/core/vision_task_options.d.ts` — `runningMode`, `canvas`.
- `repo-mediapipe/mediapipe/tasks/web/vision/hand_landmarker/hand_landmark.d.ts` — enum 21 indeks tangan.
- `repo-mediapipe/mediapipe/tasks/web/vision/gesture_recognizer/gesture_recognizer_options.d.ts` — kategori gesture & classifier options.
- `repo-mediapipe/mediapipe/tasks/web/vision/face_landmarker/face_landmarker_options.d.ts` — blendshape & transformation matrix.
- `repo-mediapipe/mediapipe/tasks/web/vision/core/mask.ts` — lifetime `MPMask`, `getAsWebGLTexture`.
- `repo-mediapipe/mediapipe/tasks/web/vision/interactive_segmenter/interactive_segmenter_options.ts` — BrushMode/Stroke v2.
- `repo-mediapipe/mediapipe/tasks/web/components/containers/landmark.d.ts` — `visibility`/`presence`.
- `repo-mediapipe-samples-web/src/workers/base-worker.ts` — GPU→CPU fallback + diagnosa WebGL.
- `repo-mediapipe-samples-web/src/workers/hand-landmarker.worker.ts` — pola worker + `detectForVideo(bitmap, ts)`.
- `web/vision__hand_landmarker__web_js.md` (+ gesture/face/pose/image/interactive/holistic) — guide resmi + tabel opsi.
- `web/tasks__privacy-notice.md` — privacy notice Tasks (metrik dikirim ke Google).
- `web/github-releases.md` — catatan rilis v0.10.26 → v1.2.0.
- `web/one-euro-filter__gery.casiez.net.md` + `web/one-euro-filter__OneEuroFilter.reference.js` — 1€ filter kanonik + prosedur tuning.
- `web/mdn__htmlvideoelement__requestvideoframecallback.md` — rVFC & metadata frame.
