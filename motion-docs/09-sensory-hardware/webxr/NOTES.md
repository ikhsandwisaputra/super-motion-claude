---
tool: WebXR Device API + @react-three/xr + <model-viewer>
version: "WebXR: BCD 2026-10-28 — XRSystem Chrome/Edge/Samsung/Quest(Chromium) 79+, hit-test 81+, dom-overlay 83+, XRHand 131+; Firefox & Safari iOS TIDAK; Safari visionOS 2 (Safari 18.0) immersive-vr + hand tracking + transient-pointer (WebKit blog). @react-three/xr 6.6.32 & @pmndrs/xr 6.6.32 (2026-10-13). @google/model-viewer 4.4.0 (2026-10-09). three 0.186.1 (2026-09-24)"
official: https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API · https://pmndrs.github.io/xr/docs (repo docs/) · https://modelviewer.dev/docs/
local: ../../_shared/mdn-content/files/en-us/web/api/webxr_device_api/ + xrsystem/, repo-pmndrs-xr/docs/, repo-model-viewer/packages/modelviewer.dev/data/docs.json, web/
fetched: 2026-10-28
---
# WebXR — AR/VR dari tombol di browser: dari "AR button" produk sampai scene R3F imersif

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **`<model-viewer>`** = "AR dari satu tombol" untuk objek tunggal (produk, maskot, hero 3D). `ar` + `ar-modes="webxr scene-viewer quick-look"` (default): Android → WebXR (default, tetap di browser) atau Scene Viewer; iOS → **AR Quick Look** dengan USDZ yang di-generate on-the-fly bila `ios-src` kosong. Nol kode 3D.
- **@react-three/xr** = pengalaman XR kustom di R3F: `createXRStore()`, `store.enterAR()/enterVR()`, `<XR store>`, hit test, DOM overlay, tangan/controller, pointer events, guard per mode, emulator IWER otomatis di localhost.
- **WebXR mentah** = engine sendiri/OGL/Three tanpa React.
- **Jangan** jadikan AR satu-satunya jalur: iOS Safari tidak punya WebXR (BCD), izin kamera sering ditolak, dan FAQ model-viewer: sangat sedikit user menerima izin kamera AR **sebelum** berinteraksi dengan model 3D → AR = progressive enhancement di atas 3D.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Alur: `navigator.xr.isSessionSupported(mode)` → `navigator.xr.requestSession(mode, { requiredFeatures, optionalFeatures, domOverlay: { root } })` **dari transient user activation** (daftar MDN User activation) → `session.requestReferenceSpace("local" | "local-floor" | "bounded-floor" | "unbounded" | "viewer")` → render tiap frame lewat **`session.requestAnimationFrame(cb)`** (bukan `window.requestAnimationFrame`) → `frame.getViewerPose(refSpace)` → `session.end()`.
- Syarat keamanan (MDN): secure context, dokumen aktif & fokus, panggilan dari handler user event, Permissions-Policy `xr-spatial-tracking` (penting saat di iframe).
- Mode: `inline`, `immersive-vr`, `immersive-ar`. Fitur dipilih eksplisit: `hit-test`, `dom-overlay`, `anchors`, `hand-tracking`, `light-estimation`, `depth-sensing`, … (required gagal → sesi gagal; optional → diam-diam tidak ada).
- Hit test: `session.requestHitTestSource({ space: viewerSpace, entityTypes?: ["plane"|"point"|"mesh"], offsetRay? })` → tiap frame `frame.getHitTestResults(source)` → `result.getPose(refSpace)`. `NotSupportedError` bila `hit-test` tidak di-enable saat `requestSession`.
- `<model-viewer>`: `activateAR()` harus dipanggil **sinkron** dari handler interaksi; `canActivateAR` (boolean); atribut read-only `ar-status` = `not-presenting | session-started | object-placed | failed` (+ event `ar-status`), `ar-tracking` = `tracking | not-tracking`; `ar-scale` `auto|fixed`; `ar-placement` `floor|wall`; `xr-environment` (light estimation, ada biaya performa); slot `ar-button`, part `default-ar-button`.
- DOM overlay di AR fullscreen (FAQ model-viewer): keyboard virtual **tidak** mengecilkan layout viewport → overlay input tertutup; tap overlay bisa bocor jadi `select` XR → model-viewer otomatis `preventDefault()` pada `beforexrselect`; geser elemen pakai `visualViewport`.
- @react-three/xr store options penting: `emulate` (default `"metaQuest3"`, aktif di localhost / Win/Cmd+Alt+E), `frameRate` (`"high"`), `foveation` (0–1), `hitTest`, `domOverlay`, `anchors`, `layers` (default true), `offerSession` (minta browser menawarkan sesi). `enterAR()/enterVR()` → Promise session | undefined.
- visionOS Safari 2: `immersive-vr`, input `transient-pointer` (lihat + pinch), hand tracking dengan izin di awal sesi (WebKit blog Safari 18.0).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
**A. Produk/hero: `<model-viewer>`**
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.4.0/model-viewer.min.js"></script>
<model-viewer src="/3d/chair.glb" alt="Kursi kayu oak" camera-controls touch-action="pan-y"
  ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" ar-placement="floor" poster="/3d/chair.webp">
  <button slot="ar-button" class="ar-btn">Lihat di ruanganmu</button>
</model-viewer>
```
(URL CDN contoh mengikuti pola README model-viewer; self-host `model-viewer.min.js` direkomendasikan FAQ — "safest option".)

**B. R3F kustom: @react-three/xr**
```tsx
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, XRDomOverlay, IfInSessionMode } from "@react-three/xr";
const store = createXRStore({ hitTest: true, domOverlay: true });   // emulate default aktif di localhost
export function App() {
  return (<>
    <button onClick={() => store.enterAR()}>Masuk AR</button>
    <Canvas>
      <XR store={store}>
        <IfInSessionMode deny="immersive-ar"><color attach="background" args={["#111"]} /></IfInSessionMode>
        <XRDomOverlay><div className="hint">Arahkan ke lantai</div></XRDomOverlay>
        <Scene />
      </XR>
    </Canvas>
  </>);
}
// keluar: ambil sesi via useXR((xr) => xr.session) lalu session.end(); dengarkan store.onSessionEnd(cb)
// buang store saat unmount permanen: store.destroy()   (tabel fungsi & state: repo-pmndrs-xr/docs/tutorials/store.md)
```

**C. WebXR mentah (AR + hit test)**
```js
btn.addEventListener("click", async () => {                      // transient activation
  if (!(await navigator.xr?.isSessionSupported("immersive-ar"))) return showFallback3D();
  const session = await navigator.xr.requestSession("immersive-ar", {
    requiredFeatures: ["local", "hit-test"], optionalFeatures: ["dom-overlay"],
    domOverlay: { root: document.querySelector("#overlay") } });
  const gl = canvas.getContext("webgl2", { xrCompatible: true });
  session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });
  const local = await session.requestReferenceSpace("local");
  const viewer = await session.requestReferenceSpace("viewer");
  const source = await session.requestHitTestSource({ space: viewer });
  session.requestAnimationFrame(function onFrame(t, frame) {
    const hit = frame.getHitTestResults(source)[0];
    if (hit) placeReticle(hit.getPose(local).transform.matrix);
    renderViews(frame.getViewerPose(local));
    session.requestAnimationFrame(onFrame);
  });
  session.addEventListener("end", () => source.cancel());
});
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek | Default | Saran |
|---|---|---|---|
| `ar-modes` (model-viewer) | urutan prioritas pengalaman AR | `webxr scene-viewer quick-look` | biarkan; WebXR Android = paling cepat & konsisten (FAQ) |
| `ar-scale` | user boleh resize model | auto | `fixed` untuk produk berukuran nyata |
| `ar-placement` | lantai/dinding | floor | wall untuk lukisan/poster |
| `xr-environment` | lighting estimasi | off | on hanya bila material mengkilap penting (biaya, bisa terlalu gelap) |
| `frameRate` (pmndrs store) | kehalusan headset | "high" | turunkan bila thermal throttling |
| `foveation` | perf vs ketajaman tepi | default device | 0.5–1 untuk scene berat |
| reticle smoothing | stabil saat mencari lantai | — | damp posisi 10–15/s (heuristik) |
| reference space | origin & lantai | — | `local-floor` VR berdiri; `local` AR genggam |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Scroll storytelling → AR**: model-viewer di section produk; tombol slot `ar-button` muncul hanya bila `canActivateAR` — sembunyikan CTA AR di desktop.
- **CSS koreografi status**: `model-viewer[ar-status="session-started"] .hint { opacity: 1 }` → prompt "gerakkan HP" sampai `object-placed`.
- **R3F**: animasi di `useFrame` tetap jalan di sesi XR (R3F memakai loop XR); jangan pakai Lenis/scroll-trigger di dalam sesi imersif (tidak ada scroll).
- **GSAP**: tween properti objek three biasa; pastikan ticker tidak di-pause saat sesi XR (rAF window bisa berhenti di headset — render loop adalah milik sesi).
- **Barba/Swup**: akhiri sesi (`session.end()`) sebelum transisi halaman.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. 3D dulu, AR kemudian (konversi izin lebih tinggi)**
```js
const mv = document.querySelector("model-viewer"), cta = document.querySelector(".ar-btn");
cta.hidden = true;
mv.addEventListener("camera-change", function once(e) {          // user sudah memutar model
  if (e.detail.source !== "user-interaction") return;
  mv.removeEventListener("camera-change", once);
  if (mv.canActivateAR) { cta.hidden = false; cta.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" }); }
});
mv.addEventListener("ar-status", (e) => { if (e.detail.status === "failed") showToast("AR tidak tersedia di perangkat ini"); });
```
Kenapa mahal: tombol AR "muncul sebagai hadiah" setelah user penasaran — sesuai temuan UX model-viewer, bukan prompt kamera di awal.

**2. Reticle hit-test yang "menempel" lembut (R3F)**
```tsx
import { useXRHitTest } from "@react-three/xr";
const m = new Matrix4(), target = new Vector3();
function Reticle() {
  const ref = useRef<Mesh>(null);
  useXRHitTest((results, getWorldMatrix) => {
    if (!results.length) return;
    getWorldMatrix(m, results[0]); target.setFromMatrixPosition(m);
  }, "viewer", "plane");
  useFrame((_, dt) => ref.current?.position.lerp(target, 1 - Math.exp(-dt * 12)));  // damping eksponensial
  return <mesh ref={ref} rotation-x={-Math.PI / 2}><ringGeometry args={[0.08, 0.1, 48]} /><meshBasicMaterial /></mesh>;
}
```
Kenapa mahal: reticle meluncur dan "nempel" ke permukaan alih-alih melompat-lompat per frame.

**3. Status AR sebagai koreografi CSS (tanpa JS)**
```css
model-viewer .scan-hint { opacity: 0; transition: opacity .4s; }
model-viewer[ar-status="session-started"] .scan-hint { opacity: 1; animation: sway 1.6s ease-in-out infinite; }
model-viewer[ar-status="object-placed"] .scan-hint { opacity: 0; }
model-viewer[ar-tracking="not-tracking"] .lost { opacity: 1; }
@keyframes sway { 50% { transform: translateX(14px) rotate(4deg); } }
```
Kenapa mahal: instruksi gerak HP muncul/hilang tepat pada state AR — terasa seperti app native.

**4. Satu tombol, mode terbaik**
```js
async function bestXR(store) {
  if (await navigator.xr?.isSessionSupported("immersive-ar")) return store.enterAR();
  if (await navigator.xr?.isSessionSupported("immersive-vr")) return store.enterVR();   // Quest / visionOS
  return openFullscreen3D();                                                         // fallback non-XR
}
```
Kenapa mahal: HP Android dapat AR, headset dapat VR, sisanya tetap dapat 3D — tidak ada tombol mati.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Render loop milik sesi XR; refresh headset tinggi (umumnya 72–120 Hz, heuristik) → anggaran per frame ketat: instancing, texture KTX2, `foveation`, hindari post-processing berat.
- Selalu poster + `alt` di `<model-viewer>`; konten AR tidak boleh menjadi satu-satunya sumber informasi.
- `prefers-reduced-motion`: hindari kamera bergerak otomatis di VR (pemicu mual) — gerak hanya dari kepala user; teleport > locomotion halus.
- Dukungan 2026 (BCD + WebKit): Chrome Android AR+VR (hit-test 81+, dom-overlay 83+); Chrome/Edge desktop VR via headset; Meta Quest Browser (BCD: mirror Chromium; detail passthrough AR [UNVERIFIED lokal]); Safari visionOS 2+ `immersive-vr` (tanpa `immersive-ar` di sumber lokal); Safari iOS → hanya Quick Look via model-viewer; Firefox tidak ada; Android WebView tidak ada.
- Pengembangan tanpa headset: emulator IWER bawaan @react-three/xr (localhost) atau WebXR API Emulator extension (MDN).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `../../_shared/mdn-content/files/en-us/web/api/webxr_device_api/fundamentals/index.md` — konsep AR/VR, mode.
- `../../_shared/mdn-content/files/en-us/web/api/webxr_device_api/startup_and_shutdown/index.md` — isSessionSupported, requestSession, polyfill/emulator.
- `../../_shared/mdn-content/files/en-us/web/api/webxr_device_api/rendering/index.md` — loop `session.requestAnimationFrame`.
- `../../_shared/mdn-content/files/en-us/web/api/webxr_device_api/inputs/index.md` — select/squeeze, input sources.
- `../../_shared/mdn-content/files/en-us/web/api/webxr_device_api/geometry/index.md` — reference space (local, local-floor, viewer, unbounded).
- `../../_shared/mdn-content/files/en-us/web/api/webxr_device_api/permissions_and_security/index.md` — user intent, `xr-spatial-tracking`.
- `web/mdn__xrsession__requesthittestsource.md` + `web/mdn__xrhittestresult.md` — hit test (tidak ada di mirror bersama).
- `web/mdn__xrsystem__requestsession.md` — opsi `requiredFeatures/optionalFeatures/domOverlay` + daftar fitur.
- `web/model-viewer-docs__from-docs-json.md` — semua atribut/method/event model-viewer + FAQ (AR modes, DOM overlay, izin).
- `repo-model-viewer/packages/model-viewer/src/features/ar.ts` — implementasi AR mixin (activateAR, mode fallback).
- `repo-pmndrs-xr/docs/tutorials/store.md` — opsi `createXRStore` & fungsi store.
- `repo-pmndrs-xr/docs/tutorials/hit-test.md` — `useXRHitTest`, `XRHitTest`, `useXRRequestHitTest`.
- `repo-pmndrs-xr/docs/tutorials/dom-overlay.md` — `XRDomOverlay`.
- `repo-pmndrs-xr/docs/tutorials/guards.md` — `IfInSessionMode` dll.
- `repo-pmndrs-xr/examples/hit-testing/src/` — contoh resmi hit-test handheld/headset.
- `../vibration/web/webkit-blog__safari-18.0.md` — bagian WebXR visionOS 2 (immersive-vr, transient-pointer, hand tracking).
- `web/bcd-support.md` — dukungan WebXR per browser.
