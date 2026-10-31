---
tool: Polygonjs (v1 engine, npm) / Polygon v2 (app native + web export)
version: Polygon **2.0.65** (rilis 2026-10-23, changelog polygonjs.com) · v1 `@polygonjs/polygonjs` **1.5.98** (npm & package.json; repo **maintenance mode**, commit terakhir 2026-08-08 "readme update") — dicek 2026-10-28
official: https://polygonjs.com/ · https://polygonjs.com/docs/nodes · https://github.com/polygonjs/polygonjs-engine
local: polygonjs/repo-polygonjs-engine/ (README + source player/scene/viewer v1) · polygonjs/web/ (home, changelog v2, download, pricing, docs_nodes, blog rewrite)
fetched: 2026-10-28
---
# Polygonjs / Polygon — procedural 3D berbasis node (gaya Houdini) untuk web; v1 = engine three.js di npm (maintenance), v2 = rewrite Jai→WASM dengan renderer WebGPU & "web app export"

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Status jujur dulu:**
- **v1 (repo ini, three.js + TypeScript)**: README: "This repository is in maintenance mode … No new features … Only critical fixes are considered, and even those are not guaranteed. New projects should start with Polygon v2". Paket npm tetap terbit & proyek lama tetap jalan.
- **v2 (Polygon 2.0.x, rilis publik pertama 2.0.45 pada 2026-07-28)**: rewrite total dalam bahasa **Jai** → native (macOS ARM, Windows, Linux) + **WebAssembly**; renderer sendiri di atas **WebGPU/wgpu** (bukan three.js lagi). Docs publik saat ini praktis hanya **node reference** (492 node type, 257 terdokumentasi); API embed web **belum didokumentasikan** selain potongan di changelog.

**Pakai kalau:**
- Butuh geometri **procedural/generatif** yang sulit dibuat tangan: SDF modeling (`geo/SDF*`, fractal Menger/Mandelbulb/Julia), Voronoi cells/field, reaction-diffusion (`tex/Solver`, `code/ReactionDiffusion`), compute shader, instancing — lalu ditampilkan di web.
- Mau interaksi fisika kursor yang nyata (v2: rigid body **kinematic** yang digerakkan kursor mendorong body dinamis).
- Proyek v1 yang sudah ada: kontrol param dari JS & integrasi three.js langsung.

**Jangan kalau:**
- Background shader 2D/hero ambient → Unicorn Studio / OGL / curtainsjs jauh lebih ringan.
- Butuh API embed yang stabil & terdokumentasi untuk klien (v2 masih bergerak cepat: hampir tiap rilis ada **Breaking** rename param/node, mis. 2.0.65 rename param atribut, `code/SDFInput`→`code/SDFSample`).
- Proyek baru di v1 (tanpa fitur baru) — kecuali kamu memang butuh three.js-native.
- Budget: web app export & keluarnya hasil butuh **lisensi** ("A license unlocks the ways out: exporting a scene as a web page…"): Polygon Web $25/bln atau $200/thn; Perpetual $495 (native app + SDK; SDK butuh compiler Jai yang masih beta).

**vs alternatif:** cables.gl = dataflow umum + export statis yang terdokumentasi; Spline = 3D design-first; three/R3F = kontrol penuh kode; Polygon = **procedural modeling** + solver/compute dalam satu graph.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

**v1 (terverifikasi dari source):**
- `PolyScene` membungkus scene three.js (`scene.threejsScene()`); node dikelompokkan konteks ANIM, AUDIO, COP (texture), EVENT, GL (GLSL builder), JS, MAT, OBJ, POST, ROP, SOP (procedural modeling). Node "cook" = komputasi ulang malas saat dirty.
- **Waktu**: `TimeController` memakai **FPS konstan 60** (`const FPS = 60.0`), `maxFrame` default **600** (10 s), `realtimeState` default `true` (waktu maju sesuai clock delta). `setFrame(f)` → `setTime(f / 60)`; frame di-clamp ≥ 0, dan bila `maxFrameLocked`: saat play wrap ke frame 0 setelah maxFrame, saat pause clamp ke maxFrame.
- `setTime()` menjalankan semua **onBeforeTick(delta)** callback, memblok cooker agar node dependen hanya cook sekali, lalu tick actors.
- Player (`ScenePlayerImporter`) memanggil `forbidPlayUntilAllNodesCooked()` → `play()` ditolak sampai semua node cook sekali (anti scene "basi"); viewer dibuat dengan `autoRender: false` lalu `markAsReady()`. Saat ready: `setFrame(0)` lalu `play()` kecuali `autoPlay: false`.
- Event DOM (dispatch ke `domElement` **dan** `document`, plus varian `${nama}-${sceneName}`), `e.detail = { scene, viewer }`: `POLYSceneCreated`, `POLYSceneReady`, `POLYScenePlay`, `POLYScenePause`, `POLYViewerMounted`, `POLYViewerReady`, `POLYProgress`.

**v2 (dari blog & changelog):**
- Semua data di **recyclable arrays + temp allocator** yang dikosongkan tiap akhir frame → tidak ada GC hitch (alasan utama rewrite: "garbage collector … can drop a frame") → frame pacing animasi/kamera lebih stabil.
- Node `code/*` bisa menghasilkan kode **GPU (GLSL/WGSL)** atau **CPU** dengan satu toggle (gabungan GL & JS node v1).
- Node families v2: `code` (140), `compute` (9), `geo` (265), `mat` (22), `render` (24, post-processing), `tex` (32).
- WebGPU utama; ada jalur **WebGL2**: `render/Combine` "Where there are no compute shaders it runs the same operation as a fullscreen pass" (2.0.53). Satu build WASM bisa menjalankan **beberapa scene per halaman**, masing-masing canvas/kamera/pointer sendiri (2.0.56).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

**v1 — mulai proyek / pasang editor** (README): `npm create polygonjs@latest` (template vanilla, threejs, vuejs, react, react-three-fiber) atau `npm add polygonjs-editor` + `npm run polygonjs-editor`.

**v1 — mount scene hasil editor** (`src/engine/api.md`; fungsi di-generate per scene oleh editor):
```js
import { fetchSceneAndMount_scene_01 } from './polygonjs/scenes/scene_01/autogenerated/fetchSceneAndMount';
const { scene } = await fetchSceneAndMount_scene_01({ domElement: 'app' });
const node = scene.node('/grid/planeHelper1');
node.p.size.set(0.5);                      // ubah parameter node → memicu cook
```
Level lebih rendah (`src/engine/io/player/Scene.ts`, jalur import publik [UNVERIFIED]):
`ScenePlayerImporter.loadSceneData({ sceneData, sceneName, domElement, autoPlay, createViewer, renderer, cameraMaskOverride, onProgress, configureScene, assetUrls })` → `{ scene, viewer }`.

Kontrol & cleanup v1 (terverifikasi):
```js
scene.play(); scene.pause(); scene.setFrame(120); scene.frame(); scene.time(); scene.maxFrame();
scene.timeController.setMaxFrame(300); scene.timeController.setRealtimeState(false);
scene.registerOnBeforeTick('sync', (delta) => {/* sebelum frame naik */});
scene.unRegisterOnBeforeTick('sync');        // juga registerOnAfterTick / unRegisterOnAfterTick
viewer.setAutoRender(false);                 // stop render tanpa pause waktu
viewer.unmount(); viewer.dispose(); scene.dispose();
scene.threejsScene();                        // akses three.js langsung
```

**v2 — web export** (yang terverifikasi hanya dari changelog):
- Export scene sebagai web page dari editor (butuh lisensi); export mengumpulkan model & texture yang dipakai (2.0.62; kecuali aset drag-and-drop).
- Autoplay: "pass `autoplay: true` to `polygonAppInit` next to the scene data" — tanpa itu scene diam di **frame 0** (solver/`OnTick` actor terlihat seperti gambar diam).
- Scene embed bisa **unmount & remount dari JavaScript** (2.0.53); halaman bisa **hide/disable spare params dari JavaScript** (2.0.63). Nama fungsi & bentuk argumen persisnya **[UNVERIFIED]** — ambil dari `index.html` hasil export.
- Halaman contoh di polygonjs.com mem-boot **editor** via `<div id="polygon-editor" data-polygon-version="2.0.65" data-scene-data …>` — itu bootstrap editor, bukan API embed.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Efek | Default / catatan |
|---|---|---|
| v1 `scene.setFrame(f)` saat `pause()` | scrub deterministik (waktu = f/60) | integer frame; 600 frame = 10 s |
| v1 `setRealtimeState(false)` | waktu maju per **frame**, bukan clock → simulasi identik di semua device (tapi melambat bila fps turun) | `true` |
| v1 `setMaxFrame` + `setMaxFrameLocked(true)` | loop seamless (wrap ke 0 saat play) | 600, unlocked |
| v1 `viewer.updateAutoRenderOnIntersectionChange({ threshold, root, rootMargin, playPauseScene, onChange })` | pause render (dan opsional waktu) saat offscreen | threshold 0.01 |
| v1 `onProgress(progress, args)` | progress loading 0→1 untuk preloader | dipanggil juga saat ratio = 1 |
| v2 `autoplay: true` | scene langsung hidup | default: diam di frame 0 |
| v2 `transparencyMode` AUTO/OPAQUE/MASK/BLEND + `alphaCutoff` | cutout tajam yang tetap menulis depth | MASK untuk daun/teks stensil |
| v2 `tex/Palette` | palet ter-bake ke texture 1D: hue berjalan siklus ber-ease, S/L sweep, di **OKLCH** (langkah perseptual rata) atau HSL; blok keras atau gradien blend OKLab | kunci color-grading generatif |
| v2 rigid body kinematic + `code/Cursor`, `code/CursorRay`, `code/RayPlaneIntersect`, `code/SetObjectPosition` | kursor jadi benda fisik yang menyenggol simulasi | 2.0.53 |
| v2 `geo/OrbitControls` toggles orbit/pan/zoom/move | batasi kamera agar komposisi terjaga | 2.0.64 |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **Lenis → scrub v1** (field `scroll` Lenis terverifikasi via docs Unicorn):
  ```js
  scene.pause();
  lenis.on('scroll', ({ scroll }) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scene.setFrame(Math.round((scroll / max) * scene.maxFrame()));
  });
  ```
- **GSAP → param v1**: tween proxy lalu `node.p.<param>.set(v)` di `onUpdate`. **Hati-hati**: set param SOP memicu re-cook geometri tiap frame — tween param material/transform/uniform, bukan param modeling berat (opsi GSAP [UNVERIFIED di mirror ini]).
- **Loop bersama**: `scene.registerOnBeforeTick('dom', (delta) => {...})` untuk menyuapkan pointer/scroll ter-smoothing ke param sekali per tick (bukan di setiap event DOM).
- **three.js / R3F**: v1 bisa akses `scene.threejsScene()` atau `await node.compute()` → `container.coreContent().threejsObjects()` (README); template R3F tersedia via `npm create polygonjs`. v2 tidak berbasis three.js.
- **Preloader terkoreografi**: dengarkan `POLYViewerReady` / `POLYSceneReady` di `document` (detail `{scene, viewer}`) untuk memulai reveal DOM.
- **Barba/SPA**: v1 `scene.pause()` + `viewer.unmount()` saat leave, `viewer.dispose()` + `scene.dispose()` bila tak kembali; v2 unmount/remount dari JS (nama API [UNVERIFIED]).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Scroll-scrub procedural growth (v1)** — animasikan pertumbuhan di editor (frame 0→600, mis. extrude/instance count via ANIM/expression), lalu scrub dengan snippet Lenis di atas.
Kenapa mahal: struktur generatif "tumbuh" persis mengikuti jari pengguna, bisa dimundurkan tanpa glitch karena waktu deterministik.

**2. Gate render + waktu saat offscreen (v1)**
```js
viewer.updateAutoRenderOnIntersectionChange({ threshold: 0.01, playPauseScene: true,
  onChange: (visible) => document.body.classList.toggle('poly-visible', visible) });
```
Kenapa mahal: tidak ada GPU idle terbakar di bawah fold; saat kembali, animasi lanjut dari state yang sama (scene benar-benar di-pause, bukan cuma render).

**3. Preloader jujur (progress nyata cook node, v1)**
```js
const { scene } = await ScenePlayerImporter.loadSceneData({ sceneData, sceneName: 'hero', domElement: 'app',
  autoPlay: false, onProgress: (p) => bar.style.scale = `${p} 1` });   // import path [UNVERIFIED]
document.addEventListener('POLYViewerReady', () => { revealTimeline.play(); scene.play(); }, { once: true });
```
Kenapa mahal: angka 0→100% sinkron dengan kerja GPU/CPU sebenarnya, dan scene baru jalan tepat saat tirai DOM terbuka.

**4. Kursor mendorong fisika (v2, di editor)** — kinematic body digerakkan `code/Cursor`→`code/CursorRay`→`code/RayPlaneIntersect`→`code/SetObjectPosition`; dynamic bodies bereaksi; export dengan `autoplay: true`.
Kenapa mahal: kursor punya massa — tabrakan nyata, bukan parallax palsu.

**5. Palet OKLCH ter-ease untuk color story (v2)** — `tex/Palette` (hue cycle ber-ease, S/L sweep, mode OKLCH) → sampling di material/`code` node; ganti palet = ganti 1 texture.
Kenapa mahal: transisi warna perseptual rata (tidak "kotor" di tengah gradien seperti RGB/HSL).

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **v1**: three.js renderer; pixel ratio dari renderer (`computeSizeAndAspect(pixelRatio)`); gunakan `setAutoRender(false)` / IntersectionObserver gating; hindari set param SOP per frame (re-cook). Editor lokal mengekspor tree-shaken (hanya node yang dipakai).
- **v2**: tanpa GC (memori di-recycle) → lebih sedikit spike; one wasm untuk banyak scene; `geo/SDFCreate`/`VolumeCreate` bisa di GPU (2.0.62); `region` untuk iterasi resolusi SDF cepat (2.0.64). Web editor memuat payload gzip + progress.
- **WebGPU support 2026** (untuk v2): lihat `../webgpu/web/gpuweb-implementation-status.md` — Chrome/Edge 113+ (Mac/Win/ChromeOS), Android 12+ (121), Safari 26 (macOS/iOS/visionOS), Firefox 141 Windows & 145/147 macOS, Linux sebagian. v2 punya jalur WebGL2 minimal untuk sebagian node render; cakupan fallback penuh [UNVERIFIED].
- **prefers-reduced-motion**: tak ada opsi bawaan terdokumentasi → v1 `autoPlay: false` + `scene.setFrame(<frame representatif>)`; v2 jangan set `autoplay` (scene diam di frame 0) — pilih frame 0 yang komposisinya bagus. Media query: `_shared/mdn-content/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md`.
- **A11y**: canvas 3D tak terbaca screen reader → sediakan teks/alt di DOM; jangan bergantung pada kursor (fisika kursor butuh fallback touch/scroll).
- **Mobile**: geometri procedural besar = memori; v1 rentan crash tab bila geometri menumpuk (alasan rewrite); macOS build v2 hanya Apple Silicon (aplikasi, bukan export web).
- **Keamanan**: `geo/GenerativeModel` (v2) meminta API key provider dan "remembers it" — jangan pakai key produksi/pribadi di scene yang dibagikan; installer `curl … | bash` / `irm … | iex` = jalankan skrip pihak ketiga → unduh manual + cek `sha256` (disediakan di halaman download).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `repo-polygonjs-engine/README.md` — status maintenance v1 → v2, cara mulai, konteks node, akses three.js.
- `repo-polygonjs-engine/src/engine/api.md` — pola resmi mount + set param (`fetchSceneAndMount_*`, `node.p.x.set`).
- `repo-polygonjs-engine/src/engine/io/player/Scene.ts` — opsi loader (autoPlay, createViewer, onProgress, renderer), urutan ready & event.
- `repo-polygonjs-engine/src/engine/scene/PolyScene.ts` — play/pause/setFrame/node/registerOnBeforeTick/dispose.
- `repo-polygonjs-engine/src/engine/scene/utils/TimeController.ts` — FPS 60, maxFrame 600, realtime vs frame stepping, wrap/clamp.
- `repo-polygonjs-engine/src/engine/viewers/_Base.ts` — setAutoRender, updateAutoRenderOnIntersectionChange, mount/unmount/dispose, tick/render callbacks.
- `repo-polygonjs-engine/src/engine/poly/utils/PolyEventName.ts` — nama event DOM `POLY*`.
- `web/changelog.md` — catatan rilis v2 (2.0.45→2.0.65): polygonAppInit autoplay, unmount/remount, multi-scene wasm, WebGL2 path, breaking renames.
- `web/blog_why-i-rewrote-polygon-from-scratch.md` — alasan arsitektur v2 (memori, GC, WebGPU/wgpu, Jai).
- `web/download.md` · `web/pricing.md` — apa yang butuh lisensi (web export), harga, SDK/Jai.
- `web/docs_nodes.md` — peta kategori node v2 (code/compute/geo/mat/render/tex) + jumlah terdokumentasi.
