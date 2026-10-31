---
tool: Rive (web runtime @rive-app/* + React)
version: "@rive-app/webgl2|canvas|canvas-lite 2.48.0 (npm 2026-10-27); @rive-app/react-webgl2|react-canvas 4.38.0; ditemukan 2026-10-28"
official: https://rive.app/docs (web: https://rive.app/docs/runtimes/web/web-js)
local: web/pages/_index.md (456 halaman hasil split llms-full) · web/pages/runtimes__web__rive-parameters.md · repo-rive-wasm/js/src/rive.ts
fetched: 2026-10-28
---
# Rive — animasi vektor ber-state-machine yang dikendalikan data, dirender WASM ke `<canvas>`

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai Rive kalau** gerak = *logika* yang dimiliki desainer: tombol/toggle dengan hover-press-release,
maskot yang matanya ngikutin kursor, loader yang mengikuti progress nyata, gauge/chart yang bereaksi ke angka,
onboarding ilustratif, UI kecil yang responsif (Rive Layouts). Desainer bikin states + transitions + bindings di
editor; dev cuma nyuplai data (View Model) dan baca balik (observer). File `.riv` biner kecil.

**Jangan pakai Rive kalau:**
- Konten harus jadi DOM teks (SEO, select/copy, reflow font sistem) → CSS/GSAP/Motion (`../../03-choreography/`).
  Rive menggambar ke canvas; aksesibilitas cuma lewat overlay `semanticsMode` (eksperimental).
- Pipeline motion tim ada di After Effects → Lottie/dotLottie (`../lottie-dotlottie/NOTES.md`).
- 3D beneran (kamera, material PBR, fisika) → Spline (`../spline/NOTES.md`) atau R3F (`../../11-r3f-ecosystem/`).
- Ikon micro super kecil di halaman yang belum punya Rive: biaya WASM 222–648 KB brotli (lihat Performa)
  lebih mahal dari CSS/SVG murni.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Runtime = C++ (rive-runtime) → Emscripten WASM → renderer.** `@rive-app/webgl2` = Rive Renderer (sama dengan
  editor, MSAA, dukung Vector Feathering). `@rive-app/canvas` = Canvas2D browser (blend mode murah, belum ada
  feathering, fill-rule clockwise digambar sebagai non-zero). API JS identik → ganti package = ganti 1 import.
- **State machine "advance" per frame dengan dt** (≈16.67 ms @60 Hz): evaluasi keyframe, transition, perubahan data
  binding, lalu gambar. **Settle**: kalau tidak ada transisi/animasi aktif, SM berhenti advance (CPU ≈ 0).
  Input user / perubahan binding meng-*unsettle*. **Blend state yang aktif terus membuat SM tidak settle** →
  desain jalur keluar dari blend state (best-practices).
- **Pause vs stop**: `play()` setelah `pause()` lanjut dari posisi terakhir; setelah `stop()` mulai lagi dari Entry.
- **Satu state per layer.** Banyak layer = banyak animasi paralel (mis. layer idle/walk + layer hover). Kalau dua layer
  menganimasi properti yang sama, **layer yang lebih bawah di daftar menang**.
- **Data Binding adalah cara utama (2025–2026).** View Model (skema) → View Model Instance (nilai) → binding ke
  properti apa pun: transform, warna, teks run, kecepatan timeline, kondisi transisi, parameter converter, script input.
  **Inputs (Boolean/Number/Trigger) dan listening Rive Events di runtime = DEPRECATED** (masih jalan, file lama tak
  perlu diubah; editor punya menu "Convert Inputs to View Models"). Tabel kemampuan: Inputs = number/bool/trigger;
  Events = number/bool/string; VM property = number, bool, trigger, string, enum, color, nested VM, list, image,
  artboard (+ font di runtime).
- **Nilai yang di-set dari JS baru terlihat setelah advance berikutnya**; observer `.on()` dipanggil saat advance
  menerapkan perubahan (baik dari JS maupun dari binding/animasi).
- **Listeners** (pointer, drag, focus, keyboard, gamepad, text input, semantic action, view-model change) di-hit-test
  di dalam canvas; runtime memasang pointer listener pada `<canvas>`. Pointer Exit hanya fire selama Rive masih bisa
  membaca posisi pointer (target yang menempel tepi canvas bisa tidak dapat exit).
- **Ukuran canvas ≠ drawing surface.** CSS size = kotak di halaman; atribut `width/height` = resolusi gambar.
  `resizeDrawingSurfaceToCanvas()` = CSS size × DPR. Runtime otomatis menangani toggle ukuran-nol (display:none →
  terlihat) lewat observer internal, tapi **resize biasa tetap harus kamu panggil sendiri**.
- **Scripting (Luau, di editor)** untuk logika yang tak bisa dibuat dengan node: protocol node / layout / converter /
  listener-action / transition-condition / path-effect / util / test scripts, plus WGSL shader dan audio terprogram.
  Tidak tersedia di `canvas-lite`.
- **Tab tersembunyi**: runtime (vanilla) mendengar `visibilitychange`, membatalkan rAF dan me-reset waktu → tidak ada
  lompatan dt besar saat tab kembali. **Offscreen (scroll keluar viewport) TIDAK otomatis di vanilla**; rive-react
  otomatis (`shouldUseIntersectionObserver`, default aktif → `stopRendering()/startRendering()`).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

```js
import { Rive, Layout, Fit, Alignment, RuntimeLoader } from "@rive-app/webgl2";
RuntimeLoader.awaitInstance().catch(() => {});          // mulai compile WASM sedini mungkin (opsional)

const r = new Rive({
  src: "/hero.riv",                    // atau buffer: ArrayBuffer, atau riveFile: RiveFile (cache)
  canvas: document.querySelector("#hero"),
  stateMachine: "State Machine 1",     // WAJIB diisi (singular, sejak v2.41.0) — tanpa ini v2 memutar linear animation pertama!
  autoplay: true,
  autoBind: true,                      // bind VM default + instance "Default" (+ semua global VM)
  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  // useOffscreenRenderer: true,       // WAJIB kalau >1 instance webgl2 di halaman (default vanilla = false)
  onLoad: () => r.resizeDrawingSurfaceToCanvas(),
});
const vmi = () => r.viewModelInstance;  // tersedia setelah onLoad bila autoBind

// teardown (SPA / modal ditutup / Barba leave)
r.cleanup();             // stop loop + dispose artboard, SM, renderer, file, listeners, VMI refs
// r.deleteRiveRenderer() // hanya bila canvas WebGL benar-benar dibuang dari DOM
```

- Package & ukuran WASM (tabel "Runtime Sizes", Jan 2026, brotli -9): `canvas-lite` 707 KB → **222 KB**;
  `canvas` 1728 KB → **567 KB**; `webgl2` 2179 KB → **648 KB**. `canvas-lite` membuang text, layout, audio,
  scripting (konten yang memakainya tidak tampil). `canvas-single` = WASM di-inline ke JS (1 request).
  `webgl2-threads` baru di 2.47.0. `@rive-app/webgl` deprecated (tidak di-update setelah v2.37.0).
- React: `@rive-app/react-webgl2` (atau `react-canvas`, `react-canvas-lite`), React ^16.8–^19.
  ```jsx
  import { useRive, useViewModelInstanceNumber } from "@rive-app/react-webgl2";
  const { rive, RiveComponent } = useRive({ src: "health.riv", stateMachine: "State Machine 1",
    autoplay: true, autoBind: true });
  const { value, setValue } = useViewModelInstanceNumber("health", rive?.viewModelInstance);
  return <RiveComponent />;            // parent WAJIB punya width/height
  ```
  Hook lain: `useViewModel(rive, {name})`, `useViewModelInstance(vm, {rive})`, `...Boolean/String/Color/Enum/
  Trigger/Image/Font/List/Artboard`, `useRiveFile`. Data sebelum frame pertama → kerjakan di `onRiveReady`
  (sinkron, sebelum SM advance), bukan di hook/`onLoad`.

**Data Binding API (web, `rive.ts` 2.48.0):**
```js
const vm  = r.viewModelByName("Hero");            // atau defaultViewModel(), viewModelByIndex(i)
const inst = vm.instanceByName("Dark");           // instance(), defaultInstance(), instanceByIndex(i)
r.setViewModelInstance(inst);                     // murah (staged)
r.setGlobalViewModelInstance("Theme", themeInst); // murah (staged); false kalau nama tak ada
r.bind();                                         // MAHAL — panggil SEKALI setelah semua set
// r.bindViewModelInstance(inst) = setViewModelInstance + bind

inst.number("progress").value = 42;               // string(), boolean(), enum("mode").value = "Opt1"
inst.color("tint").rgba(255, 0, 0, 128);          // .value=0xAARRGGBB, rgb(), argb(), opacity(0..1)
inst.trigger("pop").trigger();
inst.number("Card/Shadow/blur").value = 8;        // nested path "A/B/prop"
const off = (e) => console.log(e.data); inst.boolean("hovered").on(off); /* … */ inst.boolean("hovered").off(off);
inst.image("avatar").value = await decodeImage(bytes);   // lalu image.unref()
inst.list("todos").addInstance(r.viewModelByName("Todo").instance()); // removeInstance, removeInstanceAt, swap
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob (editor/runtime) | Efek ke feel | Default → rentang bagus |
|---|---|---|
| Transition **Duration** | 0 = snap keras antar state. Mix antar timeline | 0 s → 0.12–0.25 s untuk UI, 0.3–0.6 s untuk karakter |
| **Exit Time** (waktu / %) | Tunggu antisipasi/follow-through selesai sebelum pindah | off → 100% untuk "selesaikan gerak dulu" |
| **Allow exit during transition** | Hover-out saat masih transisi bisa langsung balik → terasa responsif, tidak "nyangkut" | off → ON untuk hover/press |
| **Pause source when exiting** | Membekukan gerak sumber saat transisi → kesan "berhenti lalu berubah" | off |
| Transition **Interpolation** | Linear / Cubic / dll untuk *mix* antar state | linear → cubic ease-out |
| **Randomize Exit** + weight | Variasi idle organik (kedip, tengok) tanpa kode; weight 3:1 = 75%/25% | off |
| State **Speed** | Negatif = mundur; kecepatan timeline bisa di-bind ke VM number | 1 |
| Keyframe **Cubic vs Cubic Value** | Cubic tak bisa melewati nilai key; **Cubic Value** (handle Bezier di Graph Editor) bisa overshoot bahkan 0→0 → bounce, anticipation | — |
| Keyframe **Elastic** | **Amplitude** = jauh overshoot, **Period** = cepat settle | — |
| Keyframe **Hold** | Stepped/frame-by-frame | — |
| Converter **Numeric/Color Interpolator** | Nilai dari JS diluruskan *di dalam Rive* (tidak lompat) → smoothing tanpa lerp JS | — |
| Converter **Range Map / Formula / group** | Normalisasi (0–100 → 0–1), `random()` dgn Random Mode Once/Source Change/Always, chain berurutan atas→bawah | — |
| Binding **Target→Source / Bidirectional / Bind Once** | Baca balik posisi (mis. kepala bobbing), drag-drop, nilai acak awal per partikel | Source→Target |
| **1D Blend / Additive Blend** state | Mix kontinu oleh number (loader, health, scroll, face rig). Mixing additive, bukan linear | rentang mis. 0–100 |
| **Distance / Translation constraint** | Clamp pupil di rongga mata (Closer + radius), ikut target dengan Strength % (parallax/lag) | Strength 100% |
| **Joystick** (+ **Handle source**) | Satu handle men-scrub timeline X/Y (pose kepala+mata); Handle source = objek yang mengikuti pointer | — |
| Listener **Align Target** (+ Preserve Offset) | Objek ikut pointer di dalam canvas | — |
| Listener **Opaque Target** | Pointer berhenti di hit area ini vs tembus ke bawah | — |
| `Fit.Layout` + `layoutScaleFactor` | Artboard ber-layout di-resize ke container (responsif sungguhan, bukan scale) | Contain default |
| `drawingOptions` | `DrawOnChanged` (default, submit draw hanya bila berubah) vs `AlwaysDraw` | DrawOnChanged |
| `enableInkbleed` (eksperimental, webgl2, tanpa offscreen) | AA alternatif MSAA; toggle `r.inkbleed` | off |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **Scroll (Lenis / GSAP ScrollTrigger)** → tulis progress ke VM number; Rive yang memetakan ke blend state/timeline:
  ```js
  const scrollProp = r.viewModelInstance.number("scroll");      // 0..100 di editor
  ScrollTrigger.create({ trigger: "#story", start: "top top", end: "bottom bottom",
    onUpdate: (self) => (scrollProp.value = self.progress * 100) });
  // Lenis: lenis.on("scroll", ({ progress }) => (scrollProp.value = progress * 100));
  ```
  Kalau sumber scroll kasar (wheel step), bind properti visualnya lewat converter **Numeric Interpolator** (converter
  dipasang di *binding* properti; blend state memilih number property langsung dari dropdown — converter di sana tidak
  terdokumentasi) — inersia terasa "Rive-native".
- **GSAP / Motion → Rive**: jangan animasikan properti visual di JS kalau Rive bisa interpolasi sendiri; kalau perlu
  koreografi lintas DOM+Rive, tween objek proxy lalu `onUpdate: () => prop.value = proxy.v`. Untuk Motion:
  `motionValue.on("change", v => prop.value = v)`.
- **Rive → choreography halaman**: buat VM trigger/boolean `introDone`, set dari timeline/state action di Rive,
  observe di JS (`inst.trigger("introDone").on(() => tl.play())`) — ini pengganti resmi Rive Events.
- **Barba / route change**: `cleanup()` di `leave`; untuk file yang dipakai ulang antar halaman, cache `RiveFile`
  (`new RiveFile({src}); await file.init()`) lalu `new Rive({ riveFile: file, ... })` → parse sekali.
- **R3F / three**: `canvas` boleh `HTMLCanvasElement | OffscreenCanvas` dan ada `onAdvance` → pola umum: render Rive ke
  canvas tersembunyi lalu `THREE.CanvasTexture` + `texture.needsUpdate = true` di `onAdvance` [UNVERIFIED: pola, bukan
  contoh resmi]. Untuk 3D/shader native di dalam file Rive sendiri → GPU Canvas (lihat Performa).
- **Teks dinamis**: bind VM String ke text run (cara baru); format angka/lokalisasi pakai converter **String Template**
  (`${score:%.1f}`, `${n:%,d}`) — template disimpan di VM String agar urutan kata bisa diganti per bahasa. Legacy
  `setTextRunValue()` / `setTextRunValueAtPath()` deprecated. Font bisa ditukar runtime (`vmi.font(...)` + `decodeFont`).
- **Audio**: Audio Events (MP3/WAV/FLAC) di-trigger dari timeline/transition/listener; runtime web memutar otomatis
  setelah ada interaksi user; `r.volume = 0..1` (multiplier global artboard). Kontrol panjang (music, panning) → Scripting
  (Luau) `AudioSound`/`AudioSource`.
- **Low-level** (`@rive-app/canvas-advanced` / `webgl2-advanced`): banyak artboard di satu canvas, rAF milikmu;
  panggil `rive.resolveAnimationFrame()` di akhir loop kalau pakai `requestAnimationFrame` browser sendiri.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

Semua snippet diasumsikan jalan di dalam/sesudah `onLoad` dengan `autoBind: true` (atau instance sudah di-`bind()`),
dan nama VM/property mengikuti apa yang dibuat desainer di editor.

**1. Mata mengikuti kursor di seluruh halaman (bukan cuma di canvas).**
Editor: VM `Face { lookX: Number, lookY: Number }` (−1..1). Grup tak terlihat `LookTarget` X/Y di-bind ke
`lookX/lookY` lewat converter group **Range Map** (−1..1 → ±40 px) → **Numeric Interpolator**. Pupil: Translation
Constraint ke `LookTarget` + **Distance Constraint mode Closer** ke pusat bola mata (distance = radius rongga).
Kepala: **Joystick** dengan **Handle source = `LookTarget`**, sumbu X/Y men-scrub timeline pose `head_x`/`head_y`
(Invert bila arah terbalik).
```js
const el = document.querySelector("#hero");               // canvas yang sama dengan Rive (r.canvas itu private)
const face = r.viewModelInstance;
const lx = face.number("lookX"), ly = face.number("lookY");
addEventListener("pointermove", (e) => {
  const b = el.getBoundingClientRect();
  const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
  lx.value = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth / 2)));
  ly.value = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight / 2)));
}, { passive: true });
```
*Mahal karena*: satu sumber (target ter-interpolasi) menggerakkan pupil (di-clamp, langsung) dan kepala (pose timeline
via joystick) dengan respons berbeda → overlap alami makhluk hidup, bukan elemen kaku yang di-`transform`.
(Versi tanpa JS, terbatas area canvas: Listener **Pointer Move** + action **Align Target** pada `LookTarget`.)

**2. Tombol hover/press tanpa satu baris JS untuk visual.**
Listener Pointer Enter/Exit → action *View Model Change* `hovered` true/false; Pointer Down/Up → `pressed` true/false.
Layer "Hover": Idle ⇄ Hover (kondisi `hovered`, Duration 0.15 s cubic, **Allow exit during transition ON**).
Layer "Press" (properti berbeda dari layer Hover, mis. scale vs glow): Rest ⇄ Squash (kondisi `pressed`), transisi
Squash → Rest dengan **Exit Time 100%** supaya follow-through selesai. Listener Click → set trigger `clicked`.
JS hanya membaca klik:
```js
r.viewModelInstance.trigger("clicked").on(() => router.push("/next"));
```
*Mahal karena*: press dan hover di layer terpisah → bisa saling tumpuk (hover-glow tetap hidup saat squash), release
selalu menyelesaikan follow-through berkat Exit Time.

**3. Loader yang mengikuti progress nyata + handoff ke koreografi halaman.**
Editor: properti visual bar (mis. Scale X fill / trim path end) di-bind ke `progress` (0–100) lewat converter group
**Range Map** (0–100 → 0–1) → **Numeric Interpolator**; alternatif tanpa converter: 1D Blend `empty`↔`full` yang
di-drive `progress`. Transisi ke state `Done` dengan kondisi `progress >= 100` + Exit Time; state action timing **End** =
*Set property value* `introDone = true` (boolean).
```js
const vmi = r.viewModelInstance;
const p = vmi.number("progress");
const done = vmi.boolean("introDone");
done.on(() => { if (done.value) gsap.to("main", { autoAlpha: 1 }); });   // observer jalan saat advance menerapkan nilai
for await (const pct of downloadWithProgress(url)) p.value = pct;         // generator progress milikmu sendiri
```
*Mahal karena*: angka nyata yang lompat-lompat diluruskan Rive, dan akhir loader *menentukan* kapan halaman masuk
(tidak ada setTimeout tebakan). Ingat: blend state aktif = SM tak pernah settle → keluar ke `Done`.

**4. Banyak ikon Rive di satu halaman tanpa membunuh GPU.**
```js
import { Rive, RiveFile } from "@rive-app/webgl2";
const file = new RiveFile({ src: "/icons.riv" }); await file.init();
document.querySelectorAll("canvas[data-rive]").forEach((el) => {
  const r = new Rive({ riveFile: file, canvas: el, artboard: el.dataset.rive,
    stateMachine: "SM", autoplay: true, autoBind: true, useOffscreenRenderer: true,
    onLoad: () => r.resizeDrawingSurfaceToCanvas() });
  new IntersectionObserver(([e]) => e.isIntersecting ? r.startRendering() : r.stopRendering()).observe(el);
});
```
*Mahal karena*: satu parse file, satu konteks WebGL bersama (batas konteks browser tidak tertembus), nol frame terbuang
untuk ikon di luar layar.

**5. Responsif sungguhan (Rive Layouts), bukan scale.**
```js
const r = new Rive({ src: "card.riv", canvas, stateMachine: "SM", autoplay: true,
  layout: new Layout({ fit: Fit.Layout /*, layoutScaleFactor: 1 */ }),
  onLoad: () => r.resizeDrawingSurfaceToCanvas() });
const fit = () => r.resizeDrawingSurfaceToCanvas();
addEventListener("resize", fit);
matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener("change", fit);
```
*Mahal karena*: elemen di-reflow menurut constraint editor (padding, gap, N-slicing) — tidak ada teks gepeng atau ikon
membesar seperti `Fit.Fill`/`Cover`. Kondisi transisi juga bisa membaca lebar/tinggi/rasio artboard → breakpoint motion.

**6. Reduced motion dari satu flag.**
```js
const rm = matchMedia("(prefers-reduced-motion: reduce)");
const flag = r.viewModelInstance.boolean("reducedMotion");
const apply = () => (flag.value = rm.matches); apply(); rm.addEventListener("change", apply);
```
Di SM: Any State → `Static` saat `reducedMotion == true` (pose akhir, tanpa loop). Docs juga menyarankan `autoplay:false`/
`pause()` atau artboard/SM alternatif. *Mahal karena*: tetap informatif (state berubah), hanya gerak berlebihnya yang hilang.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **Batas konteks WebGL**: tiap `new Rive` di webgl2 = 1 konteks; browser membuang konteks tertua saat limit. Vanilla:
  set `useOffscreenRenderer: true` di semua instance. rive-react: default otomatis `true` (kecuali GPU Canvas/inkbleed).
- **Blend mode non-Normal mahal di webgl2** (jalur MSAA harus membaca ulang framebuffer) terutama di mobile →
  bandingkan dengan `@rive-app/canvas`; ekstensi `WEBGL_shader_pixel_local_storage` akan mempercepat otomatis bila tersedia.
- **GPU Canvas** (3D + shader di file Rive): `enableGPUCanvas: true`, webgl2 ≥ 2.42.0, eksperimental, butuh konteks
  sendiri (tidak boleh `useOffscreenRenderer`), `RiveFile` ber-GPU-Canvas **tidak bisa dibagi** antar instance.
- **WASM preload**: `RuntimeLoader.awaitInstance()` sedini mungkin + `<link rel="preload" as="fetch" crossorigin
  href=".../@rive-app/webgl2@<versi-persis>/rive.wasm">`; self-host via `RuntimeLoader.setWasmUrl()` — versi wasm harus
  sama persis dengan package, MIME `application/wasm`, `Cache-Control: immutable`. Fetch `.riv` hero lebih awal → `buffer`.
- **CSP**: butuh `'wasm-unsafe-eval'` (Emscripten).
- **Idle**: state idle = one-shot pendek → SM settle sendiri. Blend state aktif & loop = CPU jalan terus.
- **Aset**: subset glyph font, WebP, ukuran raster sesuai tampil, hati-hati vektor AI-generated (ribuan vertex), Solo
  untuk show/hide, artboard binding untuk skin besar. Hanya artboard default + Components yang ikut ekspor.
- **DPR mobile**: `resizeDrawingSurfaceToCanvas(customDPR)` untuk membatasi (mis. `Math.min(devicePixelRatio, 2)`).
- **Touch**: listener Rive bisa menelan scroll sentuh → `isTouchScrollEnabled: true`; `enableMultiTouch` untuk multi-pointer;
  `dispatchPointerExit` (default true) reset hover saat kursor keluar canvas.
- **Aksesibilitas**: canvas opaque bagi screen reader → beri `role="img"` + `aria-label`, atau `semanticsMode:
  SemanticMode.Enabled` (eksperimental, overlay DOM dari role/trait di editor). Fokus keyboard: node Focusable + `tabIndex`,
  `focusOptions.allowFocusInterrupt` (default false). Gamepad: `gamepadOptions.requireFocus`.
- **prefers-reduced-motion**: tidak otomatis — resep #6.
- Debug: `enableFPSCounter()`, `enablePerfMarks: true` (performance.mark untuk load/render), `r.contents` (isi file).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `web/pages/_index.md` — indeks 456 halaman (split dari `web/rive.app__docs__llms-full.txt`; `web/rive.app__llms-full.txt` = salinan identik)
- `web/pages/runtimes__web__rive-parameters.md` — referensi lengkap konstruktor, method, event, deprecated (paling penting)
- `web/pages/runtimes__web__data-binding.md` — VM, instance, global VM, list/image/font/artboard property, observer
- `web/pages/runtimes__react__data-binding.md` — semua hook VM + `onRiveReady` sebelum frame pertama
- `web/pages/editor__state-machine__{state-machine,states,transitions,layers,listeners}.md` — logika desain (exit time, randomize exit, align target)
- `web/pages/editor__data-binding__{converters,binding-data,migration-guide}.md` — interpolator, bind direction, inputs→VM
- `web/pages/editor__animate-mode__interpolation-easing.md` — Cubic vs Cubic Value, Elastic (amplitude/period)
- `web/pages/editor__manipulating-shapes__joysticks.md`, `editor__constraints__*.md` — rig mata/kepala
- `web/pages/runtimes__web__{layouts,canvas-vs-webgl,preloading-wasm,caching-a-rive-file,loading-assets,gpu-canvas,playing-audio,faq}.md`
- `web/pages/getting-started__best-practices.md`, `runtimes__runtime-sizes.md` — performa & ukuran
- `web/extra/runtimes__web__rive-events.md`, `editor__state-machine__inputs.md` — API lama (deprecated) untuk file legacy
- `repo-rive-wasm/js/src/rive.ts` — sumber kebenaran API high-level (enum Fit/Alignment, visibilitychange, inkbleed)
- `repo-rive-wasm/CHANGELOG.md` — 2.41.0 deprecations, 2.42.0 GPU Canvas, 2.47.0 webgl2-threads, 2.48.0 gamepad/capture-phase listeners
- `repo-rive-wasm/js/examples/_frameworks/` — layout, nested inputs/text runs, out-of-band assets/audio
- `repo-rive-react/src/hooks/useRive.tsx`, `src/types.ts` — opsi useRive (intersection observer, offscreen default)
- `repo-rive-react/examples/src/components/` — DataBinding*, ResponsiveLayout, Events, Scripting, Inkbleed stories
