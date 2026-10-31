# 09 — Sensory Web, AI & Hardware Browser APIs

Pilar ke-4 library: **interaksi sensorik** — suara, getaran, kemiringan HP, kamera/AI tracking, AR/VR, suara manusia.
Sumber daftar: arsenal §9 (`../../ultimate_creative_web_development_arsenal.md`) + docs-resmi §7 (`../../docs-resmi.md`).
Mirror MDN bersama: `../_shared/mdn-content/files/en-us/web/api/` (dirujuk, tidak disalin). Semua versi dicek 2026-10-28.

## Index alat

| Alat | Folder | Satu baris | Versi (2026-10-28) | URL resmi |
|---|---|---|---|---|
| Web Audio API | [`web-audio/`](web-audio/NOTES.md) | mesin suara native: micro-sound UI, analyser untuk visual audio-reactive | living standard | https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API |
| Tone.js | [`tonejs/`](tonejs/NOTES.md) | DAW di browser: Transport BPM/swing/humanize + `getDraw()` untuk koreografi musikal | 15.1.22 (next 15.5.64) | https://tonejs.github.io/ |
| howler.js | [`howler/`](howler/NOTES.md) | sprite sfx + auto-unlock mobile + stereo/3D sederhana | 2.2.4 (2023, stagnan) | https://github.com/goldfire/howler.js#documentation |
| MediaPipe Tasks Vision | [`mediapipe/`](mediapipe/NOTES.md) | tangan/gesture/wajah(blendshape)/pose/segmentasi webcam, on-device, GPU, worker | 1.2.0 | https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js |
| TensorFlow.js + tfjs-models | [`tfjs/`](tfjs/NOTES.md) | runtime ML JS (fondasi ml5); tracking = legacy-stabil, penerus model `.tflite` = LiteRT.js | 4.22.0 (2024) | https://www.tensorflow.org/js |
| ml5.js | [`ml5/`](ml5/NOTES.md) | ML ramah p5: handPose/faceMesh/bodyPose/segmentation/sound, `detectStart()` | 1.4.0 | https://docs.ml5js.org/ |
| Device Orientation | [`device-orientation/`](device-orientation/NOTES.md) | kemiringan HP → parallax/sheen; izin iOS + Chrome 152, fallback pointer | standard | https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events |
| WebXR + @react-three/xr + `<model-viewer>` | [`webxr/`](webxr/NOTES.md) | AR/VR dari tombol: model-viewer (Quick Look/Scene Viewer/WebXR) atau XR kustom R3F | R3F/xr 6.6.32 · model-viewer 4.4.0 | https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API |
| Vibration API | [`vibration/`](vibration/NOTES.md) | haptic vocabulary Android; iOS hanya via `<input type=checkbox switch>` | standard | https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API |
| Web Speech API | [`web-speech/`](web-speech/NOTES.md) | perintah suara (on-device Chrome 139+) & TTS dengan `boundary` per kata | CG spec | https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API |

## Pilih yang mana?

| Kebutuhan | Pilih | Kenapa / jangan |
|---|---|---|
| 3–10 micro-sound UI dengan variasi pitch, nol dependency | **Web Audio native** | AudioBufferSourceNode murah + jitter `playbackRate`; Howler kalau mau sprite + unlock siap pakai |
| Banyak sfx dalam satu file, fallback HTML5, tim non-audio | **howler** | API sederhana (`play(sprite)` → id); tapi tidak ada analyser/scheduling waktu-audio |
| Gerak harus ikut beat/BPM/swing, generative music | **Tone.js** | Transport + `getDraw()`; set `lookAhead = 0` untuk sfx UI |
| Visual audio-reactive (musik/mic) | **Web Audio AnalyserNode** (atau `Tone.FFT/Meter`) | band log + envelope sendiri; smoothing bawaan tergantung frame-rate |
| Kursor tangan / pinch / gesture / ekspresi wajah | **MediaPipe Tasks** | dirawat (1.x), gesture 8 kategori, 52 blendshape, worker + GPU |
| Sketch p5 / workshop / prototipe 1 jam | **ml5** | `detectStart` paling sederhana; di atas TF.js (rilis terakhir 2024) |
| Model kustom / transfer learning di browser | **TF.js** (+ LiteRT.js untuk `.tflite`) | jangan mulai tracking tangan baru di tfjs-models |
| Efek "hidup di tangan" mobile (parallax, kilau) | **DeviceOrientation** + fallback pointer | izin dari tap (iOS 14.5+/Chrome 152+), kalibrasi baseline |
| Lihat produk di ruangan | **`<model-viewer ar>`** | iOS Quick Look + Android WebXR/Scene Viewer tanpa kode 3D |
| Pengalaman AR/VR kustom (hit test, tangan, DOM overlay) | **@react-three/xr** | `createXRStore()` + emulator IWER di localhost |
| Konfirmasi taktil | **Vibration** (Android) + **switch native** (iOS 18) | tidak ada `navigator.vibrate` di iOS |
| Perintah suara / narasi tersinkron | **Web Speech** | Chrome-centric; on-device `processLocally`; Firefox hanya TTS |

## Matriks gate izin/aktivasi (sumber: MDN User activation + halaman API)

| API | Gate | Panggil dari | Catatan |
|---|---|---|---|
| `AudioContext` mulai bunyi | autoplay = **sticky activation** | handler `click`/`keydown`/`pointerup`/`touchend` (bukan `pointerdown` sentuh) | scroll/wheel/pointermove **tidak** memberi aktivasi |
| `navigator.vibrate()` | sticky activation | setelah interaksi apa pun | iOS tidak ada; Firefox Android no-op |
| `DeviceOrientationEvent.requestPermission()` | **transient activation** | click/tap | iOS 14.5+, Chrome 152+; HTTPS |
| `getUserMedia()` (kamera/mic) | prompt izin + secure context | tombol yang menjelaskan tujuan | stop track saat selesai |
| `navigator.xr.requestSession()` | transient activation | click | `xr-spatial-tracking` untuk iframe |
| `<model-viewer>.activateAR()` | gesture | sinkron di handler | FAQ: tampilkan 3D dulu, baru AR |
| `SpeechRecognition.start()` | izin mic | tombol mic | default audio ke server; `processLocally` untuk lokal |
| MediaPipe Tasks | — | — | gambar tetap lokal, **metrik penggunaan dikirim ke Google** (privacy notice) |

## Prinsip lintas-alat (ringkas)
1. **Satu event, tiga indra**: visual + suara + getaran dipicu di handler yang sama; durasi getar ≈ transien suara.
2. **Frame-rate independent**: smoothing/envelope pakai `1 − exp(−dt/τ)`, bukan konstanta per frame (smoothing AnalyserNode & Tone.Meter dihitung per panggilan).
3. **Input sensor ≠ frame render**: kamera ~30 fps, sensor ~60 Hz, audio per render quantum → simpan target, interpolasi di satu rAF/ticker.
4. **Opt-in & fallback**: suara/kamera/mic/tilt/XR selalu enhancement dengan padanan pointer/keyboard + toggle yang diingat.
