---
tool: Spline (3D editor + Hana 2D) — @splinetool/runtime, @splinetool/react-spline, <spline-viewer>
version: "@splinetool/runtime 2.0.116 & @splinetool/viewer 2.0.116 (npm 2026-10-28, bundel three 0.185.0); @splinetool/react-spline 4.1.0 (2025-07-15); ditemukan 2026-10-28"
official: https://docs.spline.design/ (runtime README: npm @splinetool/runtime; React: https://github.com/splinetool/react-spline)
local: npm-splinetool-runtime/{README.md,runtime.d.ts} · web/pages/_index.md (194 halaman split dari llms-full) · npm-splinetool-viewer/README.md
fetched: 2026-10-28
---
# Spline — scene 3D/2D interaktif yang logikanya (states → events → actions) dibuat desainer, diputar runtime three.js

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai Spline kalau**: hero 3D/produk yang bisa di-orbit, objek "mainan" ber-fisika (gravity, bounce, drag & drop),
interaksi 3D tanpa kode (hover/press states, Look At/Follow kursor, scroll-driven transitions, game controls WASD),
material glass/iridescent/toon tanpa menulis shader, dan iterasi cepat oleh desainer. Hana = kanvas 2D interaktif
(UI/graphic animasi + bentuk 3D) dengan states/events yang sama, diekspor sebagai `<hana-viewer>`/iframe.

**Jangan pakai kalau:**
- Butuh kontrol penuh shader/scene graph/render loop → R3F/three (`../../11-r3f-ecosystem/`), OGL (`../../02-shaders-webgl/`).
  Runtime ini tidak mengekspos scene graph three (itu `@splinetool/loader`, tidak di-mirror).
- Banyak scene per halaman (docs: idealnya 1–2 embed per page), atau budget JS/GPU ketat di mobile low-end.
- Animasi vektor 2D ber-logika ringan → Rive (`../rive/NOTES.md`); animasi timeline dari AE → Lottie
  (`../lottie-dotlottie/NOTES.md`).
- Konten teks/SEO → DOM.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Editor → Export → `.splinecode`** (URL `https://prod.spline.design/<id>/scene.splinecode`, *dibuat oleh editor*,
  tidak bisa diturunkan dari share link/file id). `.spline` = dokumen editor, tidak bisa di-load runtime. Scene Hana =
  `.hanacode`, runtime berbeda.
- **Runtime membundel three.js sendiri (0.185)** → objek yang kamu dapat adalah *proxy* `SPEObject` (name, uuid,
  position/rotation/scale, visible, state, material, color, intensity, emitEvent, transition). `rotation` proxy = Euler
  **radian**; opsi `createObject` memakai **derajat**.
- **Backend render**: default auto — **WebGPU** bila browser memberi adapter, **WebGL** di tempat lain (fallback otomatis
  bila init WebGPU gagal). **Semua instance Spline di satu halaman harus satu backend.** Scene baru default Renderer
  WebGPU di Play Settings; untuk publik pilih **Auto** (ekspor WebGPU-only menampilkan notice "requires WebGPU").
- **renderMode**: `'auto'` (default, render hanya bila perlu = on-demand), `'manual'` (hanya saat `requestRender()`),
  `'continuous'` (tiap frame). `renderOnDemand` deprecated (react-spline 4.1.0 masih meneruskan `renderOnDemand`, default `true`).
- **Model interaksi = States + Events + Actions.** Object punya `Base State` + state bernama (pose/material berbeda).
  Event (Start, Mouse Down/Up/Press/Hover, Key Down/Up/Press, Scroll, Look At, Follow, Game Controls, Distance, State
  Change, Variable Change, Collision, Drag and Drop, Trigger Area, Screen Resize, API Updated, Webhook Called, AI Assistant)
  memicu Action (Transition, Animation, Sound, Video, Set Variable, Variable Control, Conditional, Create/Destroy Object,
  Particles Control, Scene Transition, Switch Camera, Open Link, API Request, Reset Scene, Clear Local Storage).
  **Transition action** = urutan state → state, tiap ruas punya curve (Linear, Ease, Ease In, Ease Out, Ease In Out,
  Bezier, **Spring**), Duration (detik di editor), Delay, Loop (Count/Infinite), Cycle (ping-pong); plus Sequence
  Delay/Loop/Cycle untuk seluruh rangkaian.
- **Dari kode kamu hanya bisa menyentuh subset event**: union `SplineEventName` = `mouseDown | mouseUp | mouseHover |
  keyDown | keyUp | start | lookAt | follow | scroll | collision | rendered` (listen via `addEventListener`; trigger
  via `emitEvent`/`emitEventReverse`). Event hanya ada kalau desainer membuatnya di panel Events → cek
  `getSplineEvents()`.
- **Variables** (Number/String/Boolean + dinamis Time/Counter/Random) bisa di-bind ke properti objek & teks, memicu
  Variable Change Event → jembatan data paling bersih dari JS: `setVariable()` (nilai di-cast ke tipe aslinya; nama
  duplikat → hanya yang pertama ter-update).
- **Global vs local events**: iframe/Public URL hanya menangkap pointer/scroll *di dalam* canvas; `<spline-viewer>`
  bisa *global* (seluruh window) untuk Look At, Follow, Scroll.
- **Fisika** (panel Simulation): body Positioned (default, tidak jatuh) vs Dynamic; objek yang dibuat/di-clone di runtime
  **tidak ikut** simulasi fisika yang sudah berjalan.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

```js
import { Application, Easing } from "@splinetool/runtime";      // named export, tidak ada default export

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas, {
  renderMode: "auto",            // 'auto' | 'manual' | 'continuous'
  // renderer: "webgl",          // paksa backend; kosong = auto (WebGPU → WebGL)
  // wasmPath: "/spline-wasm/",  // self-host WASM (default CDN)
  // htmlContentMode: "sandbox", // 'sandbox' (default, aman) | 'inline' | 'none' untuk HTML frame dari editor
});
await app.load("https://prod.spline.design/<id>/scene.splinecode", { progress: 0 }); // variabel awal opsional
// atau: await app.start(arrayBuffer, { interactive: true, variables: {...} })

const cube = app.findObjectByName("Cube");          // atau findObjectById(uuid); valid SETELAH load resolve
app.addEventListener("mouseDown", (e) => { if (e.target.name === "Cube") {/*…*/} });
app.emitEvent("mouseHover", "Cube");                 // jalankan event editor maju (state pertama → terakhir)
app.emitEventReverse("mouseHover", "Cube");          // mundur (terakhir → pertama)
app.setVariable("progress", 50);                     // setVariables({...}), getVariable(name), getVariables()
cube.transition({ to: "Open", duration: 600, easing: Easing.EASE_OUT }); // ms di API
app.dispose();                                       // WAJIB saat unmount (lepas konteks WebGL/WebGPU + HTML content)
```
Method lain (runtime.d.ts): `setZoom(>0)`, `setSize(w,h)` (mematikan auto-resize), `setBackgroundColor(css)`,
`play()/stop()` (render+controls+events), `pauseGameControls()/resumeGameControls()`, `getAllObjects()`,
`swapGeometry(target, url|Uint8Array)` (`.splinegeometry`), `createObject(type, opts)` / `cloneObject` / `removeObject`
(sesi saja), `createCustomMaterial(three => NodeMaterial)` + `setMaterial(target, mat)` (TSL, **WebGPU saja**),
`requestRender()`. Enum `Easing`: `LINEAR, EASE, EASE_IN, EASE_OUT, EASE_IN_OUT, CUBIC, SPRING`.

**React** (`@splinetool/react-spline` 4.1.0):
```jsx
import Spline from "@splinetool/react-spline";          // Next.js: "@splinetool/react-spline/next"
<Spline scene=".../scene.splinecode" onLoad={(app) => (appRef.current = app)}
        onSplineMouseDown={(e) => {}} renderOnDemand wasmPath={undefined} />
```
Props event: `onSplineMouseDown/MouseUp/MouseHover/KeyDown/KeyUp/Start/LookAt/Follow/Scroll`. Komponen men-`dispose()`
sendiri saat unmount. Varian `/next` (server component) mengambil `https://prod.spline.design/<id>/hash` dan merender
**placeholder blur (thumbhash/blurhash) di server** = poster gratis sebelum WebGL siap.

**Web component** (`@splinetool/viewer` 2.0.116):
```html
<script type="module" src="https://cdn.spline.design/@splinetool/viewer@2.0.116/build/spline-viewer.js"></script>
<spline-viewer url=".../scene.splinecode" loading="auto" events-target="global"
               loading-anim-type="spinner-small-light" unloadable hint renderer="auto"></spline-viewer>
```
Atribut: `url, width, height, background, renderer (auto|webgpu|webgl|webgl2), loading (auto=lazy sampai masuk
viewport | lazy | eager), loading-anim-type, unloadable (unload saat keluar viewport), events-target (local|global), hint`.
Events DOM: `load-start`, `load-complete` (`e.detail.url`), `viewport-intersection` (`detail.intersection`),
`context-loss`, `unload`. Build engine tunggal: `spline-viewer.webgl.js` (~34% lebih kecil), `spline-viewer.webgpu.js`
(~20% lebih kecil, tanpa fallback WebGL).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Efek | Catatan |
|---|---|---|
| Transition curve **Spring** vs Ease/Bezier | Spring = overshoot & settle organik (hover "membal"); Bezier = bentuk presisi | Hana: spring punya **mass, stiffness, damping, initial velocity**. Parameter spring via kode tidak terdokumentasi (`EasingData` dirujuk tapi tidak didefinisikan di d.ts) [UNVERIFIED] |
| Transition **Duration / Delay** | Delay per objek = stagger tanpa kode | editor detik; API `transition()` milidetik (default 1000, delay 0) |
| **Loop / Cycle** (ruas & Sequence) | Cycle = ping-pong napas/pulse | Sequence-level membungkus semua ruas |
| Follow / Look At **Damping** | Lag di belakang target → terasa berat/berinersia | + Plane, Offset, Translation/Direction axis, Distance limit, Reset (+Speed) saat pointer keluar |
| Drag and Drop **Damping** | 1–80, makin tinggi makin "berat" | |
| Physics: **Weight, Gravity Scale, Friction, Damping, Bounce**, Collider (Precise = lebih lambat), lock axis Translation/Rotation | Karakter benda (bola karet vs batu) | Scene-level **Gravity** (positif = terbalik) |
| Play Settings **On Hover** (Orbit/Pan camera, Sensitivity, Damping) | Parallax kamera halus satu-tombol | damping rendah = snappy |
| **Soft Orbit**, Orbit/Pan **Limits** + **Soft Limit** (None/Bounce/Ease) | Kamera kembali ke posisi dengan mantul/ease → terasa fisik | |
| Animated **Turntable** (speed, direction) | Rotasi Y otomatis untuk showcase | matikan untuk reduced motion |
| Hana **Run mode** Once / Repeat / **Toggle** | Toggle = switch/accordion bolak-balik tiap trigger | |
| Material **Glass** (Blur, Thickness, Refraction) | Frosted glass, distorsi di belakang objek | combine dengan Fresnel/Matcap/Noise |
| Material **Rainbow** (Frequency, Movement, RGB, Noise, offset) | Iridescence ala gelembung/holografik tergantung sudut pandang | runtime type `'rainbow'` |
| Material runtime: `material.alpha`, `layers.find(l => l.type === "fresnel").factor` | Ubah intensitas layer dari kode (mis. glow saat hover) | layer types: color, fresnel, rainbow, normal, gradient, depth, texture, video, noise, toon, outline, transmission, matcap, pattern, displace, … |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **Scroll tanpa kode**: ekspor **Viewer** + Scroll Event Type **Scroll** (Start From *Enter View* top/middle/bottom +
  Offset + End After px, atau *Page* px) — hanya bekerja di Viewer export.
- **Scroll dengan kontrol penuh (Lenis/ScrollTrigger)**: transisi prosedural yang di-*seek* — state tetap dibuat di editor:
  ```js
  const t = app.findObjectByName("Phone").transition({ from: null, to: "Exploded", duration: 1000, autoPlay: false });
  ScrollTrigger.create({ trigger: "#story", start: "top top", end: "+=2000", scrub: true,
    onUpdate: (s) => t.seek(s.progress * 1000) });       // TransitionFactory: play/pause/reset/seek(ms)
  ```
  (d.ts memakai `autoPlay`; contoh README menulis `autoplay` — ikuti d.ts.) Alternatif: `app.setVariable("scroll", p)`
  ke variabel yang di-bind properti.
- **Lazy mount**: runtime selalu load saat diperintah → bungkus `new Application` dengan `IntersectionObserver`, atau pakai
  `<spline-viewer loading="auto">` yang sudah menunggu viewport. React: `React.lazy(() => import("@splinetool/react-spline"))`.
- **Barba/route change**: `app.dispose()` di `leave`; dispose melepas konteks tanpa memicu `webglcontextlost`.
- **GSAP/Motion → objek**: tween proxy (`gsap.to(cube.position, { y: 120 })`) setara mutasi langsung
  `obj.position.x += 10` yang dicontohkan README [UNVERIFIED untuk GSAP secara spesifik]; untuk gerak yang didesain lebih
  baik pakai state + `transition()`/`emitEvent` agar easing editor yang dipakai.
- **Kursor tanpa JS**: variabel bawaan **Mouse Position (2D)** dan **Mouse Hit Position (3D)** bisa dipakai di Variable
  Change Event / Conditional Action (mis. efek hit, proximity).
- **R3F**: tidak lewat runtime ini — butuh `@splinetool/loader`/`@splinetool/r3f-spline` (tidak di-mirror) [UNVERIFIED].
- **HTML content dari editor**: dipresentasikan otomatis di atas canvas; `sandbox` (iframe opaque, write telat 1 frame)
  vs `inline` (skrip jalan sebagai skrip halaman — hanya jika pembuat scene = pemilik halaman).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Scroll-scrub ledakan produk (exploded view) yang presisi.** Snippet `transition(...).seek()` di atas, dengan Lenis
sebagai sumber scroll halus. *Mahal karena*: kurva easing per-ruas tetap milik desainer (Spring/Bezier di editor), scroll
hanya menggerakkan playhead — tidak ada "lompat" state.

**2. Mata/kepala mengikuti kursor di seluruh halaman — tanpa JS.** Editor: Look At Event pada `Head` (Damping tinggi,
Direction terbatas) dan pada `Pupils` (Damping rendah); ekspor Viewer + `events-target="global"`.
*Mahal karena*: dua damping berbeda → kepala lambat, mata cepat = overlap natural; tetap aktif walau kursor di luar canvas.

**3. Progress nyata → 3D.**
```js
await app.load(url, { progress: 0 });
for await (const pct of assetProgress()) app.setVariable("progress", pct);   // Number variable di-bind ke scale/position
// Editor: Variable Change Event (progress) → Conditional Action IF `progress >= 100`
//         → Transition ke state "Ready" (curve Spring) + Sound action
```
*Mahal karena*: angka sungguhan menggerakkan geometri, dan klimaks (spring + suara) dipicu dari data, bukan timer.

**4. Hover magnetik dari DOM ke objek 3D.**
```js
const btn = document.querySelector(".cta");
btn.addEventListener("pointerenter", () => app.emitEvent("mouseHover", "Orb"));
btn.addEventListener("pointerleave", () => app.emitEventReverse("mouseHover", "Orb"));
```
*Mahal karena*: tombol HTML (aksesibel, fokusable) dan objek 3D berbagi satu state machine editor — reverse memutar
rangkaian state mundur, bukan snap ke base.

**5. Poster → scene tanpa flash.**
```html
<spline-viewer url="…" loading="auto"></spline-viewer>
<script type="module">
  const v = document.querySelector("spline-viewer");
  v.addEventListener("load-complete", () => document.querySelector(".poster").classList.add("is-hidden"));
</script>
```
Next.js: `@splinetool/react-spline/next` sudah merender placeholder blur di server. *Mahal karena*: LCP diisi gambar
ringan, 3D muncul crossfade setelah benar-benar siap.

**6. Hemat baterai untuk scene yang jarang berubah.**
```js
const app = new Application(canvas, { renderMode: "manual" });
await app.load(url);
app.requestRender();                                   // frame pertama
themeToggle.addEventListener("change", () => {
  app.findObjectByName("Lamp").color = themeToggle.checked ? "#ffd27a" : "#7aa8ff";
  app.requestRender();                                 // render hanya setelah perubahan yang kamu buat
});
```
*Mahal karena*: GPU idle total di luar perubahan yang kamu picu; cocok untuk hero statis yang hanya berubah oleh UI.
(Scene dengan loop/interaksi editor tetap pakai `'auto'`.)

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **Preload scene**: `<link rel="preload" href=".../scene.splinecode" as="fetch" crossorigin>` lalu `app.load(url)` *tanpa*
  fetchOptions. README lama menyarankan `{ credentials: 'include', mode: 'no-cors' }` — _upstream-AGENTS.md vendor (lebih baru)
  memperingatkan **jangan `mode: 'no-cors'` lintas origin** (respons opaque → body kosong → gagal load). CORS → self-host
  `.splinecode`.
- **Optimasi scene (Performance panel di Export)**: kurangi polygon (sides parametrik, subdivision ≤2–3, jangan bake base
  subdivision), **Compression** Geometry Quality = Performance + Image Quality (bisa 4× lebih kecil), sedikit objek, material
  sebagai **asset** bersama, **Components/instances** (1 geometri untuk 100 instance), ≤3 lampu, post-processing hemat,
  boolean: kurangi sides / Apply & Edit / animasikan **Scale bukan Size**, Preload = Yes untuk scene besar.
- **Satu backend per halaman**, idealnya 1–2 embed per halaman; `unloadable` di viewer untuk membuang scene di luar viewport.
- **Selalu `dispose()`** saat unmount (atau leak satu konteks GPU per mount).
- **Touch**: Play Settings → Orbit/Pan 1/2/3 jari/Disabled, Zoom pinch/none, Page Scroll yes/no (penting supaya scene tidak
  "menelan" scroll di mobile).
- **prefers-reduced-motion**: tidak ada dukungan bawaan yang terdokumentasi → cek `matchMedia` sendiri: jangan auto-start
  turntable/loop, tampilkan poster, atau `app.stop()` setelah frame pertama; game controls → `pauseGameControls()`.
- **Aksesibilitas**: canvas opaque → `role="img"` + `aria-label`, kontrol penting tetap di DOM (resep #4).
- **WebGPU**: auto-pilih bila tersedia; custom TSL material hanya WebGPU; GLSL `ShaderMaterial` melempar error di pipeline node.
- File vendor `npm-splinetool-runtime/_upstream-AGENTS.md` = dokumen untuk coding agent (data pihak ketiga; berisi saran atribusi
  "Made with Spline" dan watermark yang dibakar di scene data — jangan menulis kode untuk menyembunyikannya).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `npm-splinetool-runtime/README.md` — API runtime lengkap (states/transition, variables, materials & layers, createObject, TSL)
- `npm-splinetool-runtime/runtime.d.ts` — sumber kebenaran tipe (SplineEventName, Easing, renderMode, renderer, TransitionFactory)
- `npm-splinetool-runtime/_upstream-AGENTS.md` — catatan vendor: preload crossorigin, lazy mount, dispose, larangan no-cors
- `npm-splinetool-viewer/{README.md,spline-viewer.d.ts}` — atribut & event `<spline-viewer>`, build engine tunggal
- `repo-react-spline/README.md`, `src/Spline.tsx`, `src/next/SplineNext.tsx` — props React, dispose, placeholder blur Next
- `web/pages/_index.md` — indeks 194 halaman docs (split dari `web/docs.spline.design__llms-full.txt`)
- `web/pages/interaction-states-events-and-actions__*` — 50 halaman events/actions/variables (follow, look-at, scroll, distance, drag-and-drop, game-controls)
- `web/pages/designing-in-3-d__animation__{physics,particles,cloner-motion,timeline-animation}.md`
- `web/pages/materials-shading__*` — glass, rainbow (iridescent), fresnel, matcap, toon, displace, layer masking
- `web/pages/exporting-your-scene__{how-to-optimize-your-scene,play-settings,web__exporting-as-spline-viewer,web__code-api-for-web}.md`
- `web/pages/hana-a-canvas-for-interactivity__*` — Hana states/events/spring, efek, ekspor `<hana-viewer>`
