# 05 — Interactive Vector, State Machine & 3D No-Code (Rive · Spline · Lottie/dotLottie)

Mirror offline docs resmi + catatan ahli untuk motion yang *logikanya dibuat desainer* dan diputar runtime di web.
Dicek & di-mirror **2026-10-28**. Tiap folder alat punya `NOTES.md` (cheat sheet terverifikasi), `repo-*/` (sparse clone),
`web/` (llms.txt / halaman docs → Markdown) dan, bila repo runtime tidak publik, `npm-*/` (README + `.d.ts` dari paket npm).

| Alat | Folder | Peran satu baris | Versi (npm, 2026-10-28) | URL resmi |
|---|---|---|---|---|
| Rive | `rive/` | Vektor + State Machine + Data Binding (View Models), WASM ke `<canvas>` (Rive Renderer/WebGL2 atau Canvas2D) | `@rive-app/webgl2`/`canvas`/`canvas-lite` 2.48.0 · `@rive-app/react-webgl2` 4.38.0 | https://rive.app/docs |
| Spline | `spline/` | Scene 3D (dan Hana 2D) dengan states/events/actions, fisika, material glass/iridescent; runtime three.js WebGPU→WebGL | `@splinetool/runtime` & `viewer` 2.0.116 · `@splinetool/react-spline` 4.1.0 | https://docs.spline.design/ |
| Lottie / dotLottie | `lottie-dotlottie/` | Timeline AE/Lottie Creator yang dikontrol per-frame; dotLottie = ThorVG WASM + `.lottie` (themes, slots, state machines) | `@lottiefiles/dotlottie-web` 0.81.0 · `-react` 0.20.0 · `-wc` 0.10.0 · `lottie-web` 5.13.0 | https://docs.lottiefiles.com/en/runtimes · https://github.com/airbnb/lottie-web |

**Inventaris mirror:** `rive/` ≈ 11 MB (llms.txt + llms-full 1.85 MB, dipecah jadi 456 halaman di `web/pages/`;
`repo-rive-wasm` js/src + tests + examples; `repo-rive-react` src + stories) · `spline/` ≈ 2.6 MB (llms-full 0.7 MB → 194
halaman; README + `runtime.d.ts` + AGENTS.md runtime & viewer dari npm; `repo-react-spline`) · `lottie-dotlottie/` ≈ 4.4 MB
(73 halaman `.md` kurasi dari docs.lottiefiles.com — tidak ada llms-full; spec dotLottie v2; `repo-dotlottie-web` tanpa
`.wasm`; `repo-lottie-web` player/js inti + docs JSON; wiki lottie-web; `.d.ts` publik 0.81.0). Tanpa aset biner.

## Pilih yang mana?

| Kebutuhan | Pilih | Kenapa / catatan |
|---|---|---|
| Ikon/tombol/toggle dengan hover-press-release yang bisa dibalik di tengah jalan | **Rive** | Layers paralel + "Allow exit during transition" + Exit Time; JS cuma baca trigger |
| Maskot/karakter: mata ikut kursor, kedip acak, bereaksi ke data | **Rive** | Joystick (handle source) + Distance constraint + Numeric Interpolator + Randomize Exit |
| Loader/gauge/progress yang mengikuti angka nyata | **Rive** (1D blend + interpolator) | dotLottie: `SetProgress` action / `setFrame`; Lottie biasa: scrub frame manual |
| Animasi dari After Effects (tim motion pakai AE), ilustrasi linear, empty state | **dotLottie** (default) / lottie-web | `.lottie` lebih kecil + themes/slots; lottie-web bila butuh SVG DOM, ekspresi, track matte |
| Scroll-scrub sequence ilustratif (frame-by-frame dari AE) | **dotLottie/lottie-web** + GSAP ScrollTrigger/Lenis | `setFrame` / `goToAndStop(f, true)` + smoothing; lottie-web: argumen kedua `true` atau jadi milidetik! |
| Recolor brand/dark mode tanpa ekspor ulang | **dotLottie** themes/slots · Rive VM color/global VM | Rive: global view model "Theme"; dotLottie: `setTheme`/`setColorSlot` |
| Interaktivitas sederhana di file Lottie yang sudah ada | **dotLottie State Machine** | Tween bezier antar state, guards, interactions per `layerName`; lebih terbatas dari Rive |
| UI kecil responsif (kartu, panel) yang dianimasikan desainer | **Rive** `Fit.Layout` | Reflow per constraint editor, bukan scale |
| Hero 3D produk, orbit, material kaca/iridescent, tanpa menulis shader | **Spline** | Glass (blur/thickness/refraction), Rainbow layer; Viewer `events-target="global"` untuk look-at seluruh halaman |
| Mainan fisika (jatuh, mantul, drag), game WASD ringan | **Spline** (Physics + Game Controls) | Kontrol penuh/performa → Rapier + R3F (`../04-physics/`, `../11-r3f-ecosystem/`) |
| Exploded view 3D tersinkron scroll | **Spline** `transition({autoPlay:false}).seek(ms)` + ScrollTrigger | atau Viewer Scroll Event (tanpa kode, hanya Viewer export) |
| 3D custom (shader, postprocessing, instancing ribuan) | **R3F/three** (`../11-r3f-ecosystem/`) | Spline tidak mengekspos scene graph three dari runtime |
| Kamera/keyframe sinematik WebGL/DOM diedit visual | **Theatre.js** (`../03-choreography/theatre-js/`) | Timeline editor di browser, keyframe JSON di kode |
| Gerak elemen DOM/teks, layout transitions, stagger | **Kode**: GSAP / Motion / CSS (`../03-choreography/`, `../08-css-svg-native/`) | DOM tetap aksesibel & SEO; tidak ada WASM |
| Ikon micro tunggal di halaman tanpa runtime lain | **CSS/SVG** | WASM Rive 222–648 KB br, dotLottie ~500 KB; lottie_light tanpa WASM |

**Aturan cepat:**
1. *Logika* (state, data, input) → Rive. *Timeline* (AE) → dotLottie. *Ruang 3D* → Spline (no-code) atau R3F (kode).
   *Elemen DOM* → kode.
2. Banyak instance per halaman: Rive `useOffscreenRenderer: true` + `RiveFile` cache; dotLottie `freezeOnOffscreen`
   (default on) + `DotLottieWorker`; Spline maksimal 1–2 embed, `unloadable`, satu backend (WebGPU/WebGL) per halaman.
3. Semua tiga menggambar ke canvas → aksesibilitas wajib ditambal (`role="img"`/`aria-label`, kontrol penting di DOM,
   Rive `semanticsMode` eksperimental); `prefers-reduced-motion` **tidak otomatis** di ketiganya.
4. Preload WASM/scene dengan URL berversi persis + `crossorigin` (Rive `RuntimeLoader`, `DotLottie.preload()`, Spline
   `<link rel="preload" as="fetch" crossorigin>`), dan selalu `cleanup()` / `destroy()` / `dispose()` saat unmount.

## Perubahan API penting 2024–2026 (jangan pakai pola lama)
- **Rive**: State Machine **Inputs** dan listening **Rive Events** di runtime = deprecated → **Data Binding / View Models**
  (`autoBind`, `viewModelInstance.number(...)`, observer `.on()`). Param `stateMachine` (singular) sejak 2.41.0
  (`stateMachines`, `onStateChange`, `onLoop`, `scrub()` deprecated). GPU Canvas (3D/shader) 2.42.0+ eksperimental.
  `@rive-app/webgl` deprecated (pakai `webgl2`). `webgl2-threads` 2.47.0. Gamepad + capture-phase listeners 2.48.0.
- **dotLottie**: `tween()`/`tweenToMarker()` dihapus 0.70.0 (docs masih basi); `DotLottie.preload()` 0.78.0;
  `assetResolver` 0.79.0; `DotLottieWorker.setWorkerUrl()` 0.81.0; React `playOnHover` deprecated;
  `developers.lottiefiles.com` → `docs.lottiefiles.com`.
- **Spline**: runtime auto WebGPU→WebGL (three 0.185 dibundel), `renderMode` menggantikan `renderOnDemand`,
  `createObject`/`cloneObject`/`removeObject`, `createCustomMaterial` (TSL, WebGPU), HTML content `htmlContentMode`.
