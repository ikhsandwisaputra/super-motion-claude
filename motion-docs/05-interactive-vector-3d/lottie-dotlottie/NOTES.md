---
tool: Lottie / dotLottie (lottie-web + @lottiefiles/dotlottie-web, -react, -wc)
version: "@lottiefiles/dotlottie-web 0.81.0 (npm 2026-10-06), dotlottie-react 0.20.0, dotlottie-wc 0.10.0; lottie-web 5.13.0 (npm 2025-05-21, commit terakhir repo 2024-11-19); ditemukan 2026-10-28"
official: https://docs.lottiefiles.com/en/runtimes (developers.lottiefiles.com sekarang redirect ke sini) · https://github.com/airbnb/lottie-web
local: web/docs.lottiefiles.com/_index.md · npm-dotlottie-web-0.81.0/index.d.ts · repo-dotlottie-web/packages/web/src/dotlottie.ts · repo-lottie-web/player/js/animation/AnimationItem.js
fetched: 2026-10-28
---
# Lottie / dotLottie — playback timeline vektor dari After Effects/Lottie Creator, dikontrol per-frame dari JS

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai kalau** motion dibuat di After Effects (Bodymovin) atau Lottie Creator dan sifatnya *timeline*: ilustrasi,
ikon animasi, onboarding, empty state, sequence yang di-scrub scroll, segmen bernama (marker) untuk koreografi,
recolor/theming runtime (slots/themes), interaktivitas sederhana (hover/click/toggle) lewat dotLottie State Machine.

**Pilih runtime:**
- **dotlottie-web** (default untuk proyek baru): engine **ThorVG** (C++ → WASM ~500 KB terkompresi) menggambar ke
  `<canvas>`; baca `.lottie` (zip: animasi + gambar + themes + state machines) maupun JSON; backend software (default),
  WebGL2 (`/webgl`), WebGPU (`/webgpu`); bisa di Web Worker. Output konsisten lintas platform (iOS/Android pakai engine sama).
- **lottie-web** 5.13.0 (repo praktis maintenance): renderer `svg` (DOM, bisa di-style CSS lewat `className/id`, satu-satunya
  yang dukung track matte & expanded mask), `canvas`, `html` (3D layer parsial). Ekspresi AE didukung *sebagian*.
  Pakai bila butuh SVG DOM (CSS/aksesibilitas title/desc), ekspresi, atau ukuran kecil `lottie_light` (svg-only, tanpa
  ekspresi/efek) tanpa WASM.

**Jangan pakai kalau** interaksi butuh logika kaya (blend kontinu, constraint, data binding banyak tipe, layout responsif)
→ Rive (`../rive/NOTES.md`); 3D → Spline/R3F; teks/SEO → DOM; motion yang harus bereaksi ke layout DOM → GSAP/Motion
(`../../03-choreography/`).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Lottie = timeline frame-based**: `ip/op` (in/out frame), `fr` (fps authoring), `markers`. Semua kontrol bermuara pada
  "di frame berapa playhead sekarang". Interaktivitas scroll/hover = *kamu* yang memindahkan playhead, bukan "play".
- **Subframe / interpolasi**: lottie-web `setSubframe(true)` (default) dan dotLottie `useFrameInterpolation: true`
  (default) → tiap rAF merender posisi pecahan → animasi 24/30 fps tampil mulus di 60/120 Hz, tapi rasterisasi ikut refresh
  rate. Off = hanya redraw saat nomor frame bulat berubah (≈ separuh biaya untuk konten 30 fps di layar 60 Hz).
- **lottie-web `goToAndStop(value, isFrame)`**: `isFrame=false` (default!) berarti **milidetik** (`value × fr/1000`), bukan
  frame. Frame yang dirender = `currentFrame + firstFrame` → setelah `playSegments`/`initialSegment`, `goToAndStop(f, true)`
  **relatif terhadap awal segmen**. String = nama marker (`goToAndStop("intro")`).
- **lottie-web `playSegments(seg, force)`**: `seg` = `[a,b]` atau array segmen (antrian). `force=false` menunggu segmen
  sekarang selesai → cara gratis membuat sequence intro→loop. `a > b` = diputar mundur. Marker *berdurasi* di
  `goToAndPlay("name")` = `playSegments([time, time+duration], true)`.
- **dotLottie**: instance `DotLottie` membungkus core WASM; rAF loop JS memanggil `tick(dt)`; `setFrame()` langsung
  set + render. `freezeOnOffscreen` **default true** (IntersectionObserver internal → loop dibekukan saat offscreen).
  DPR default bukan `devicePixelRatio`, tapi `1 + (dpr − 1) × 0.75` (dpr 2 → 1.75, dpr 3 → 2.5) — docs menulis
  "dpr × 0.75", source (`getDefaultDPR`, `DEFAULT_DPR_FACTOR = 0.75`) yang benar.
- **dotLottie State Machine** (format v2, file JSON di folder `s/` dalam `.lottie`): `initial`, `states`
  (`PlaybackState`: animation, segment/marker, mode, speed, loop, autoplay, entry/exitActions, `final`; `GlobalState`),
  `transitions` (biasa atau **tweened**: `duration` detik + `easing` cubic-bezier `[x1,y1,x2,y2]`, memblok perubahan state
  sampai selesai; sejak 0.69 tween lintas-animasi dimatikan → instan), `guards` (Numeric/String/Boolean/Event),
  `interactions` (PointerEnter/Exit/Down/Up/Move, Click — opsional `layerName` — OnComplete, OnLoopComplete), `inputs`
  (Numeric, String, Boolean, Event edge-triggered), actions (Fire, SetBoolean/Numeric/String, Increment, Decrement, Toggle,
  Reset, SetFrame, **SetProgress 0..1**, SetTheme, OpenUrl, FireCustomEvent). Transisi dievaluasi berurutan, yang pertama
  cocok menang.
- **Slots & themes**: properti yang diberi slot ID (warna, scalar, vector, gradient, text, image) bisa diganti runtime;
  theme = kumpulan rule slot (bisa dianimasikan). Ini pengganti modern untuk "cari layer lalu ubah warna".

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

**dotlottie-web 0.81.0** (`npm-dotlottie-web-0.81.0/index.d.ts` = tipe yang benar-benar dipublikasikan):
```js
import { DotLottie } from "@lottiefiles/dotlottie-web";   // GPU: "@lottiefiles/dotlottie-web/webgl" | "/webgpu"
DotLottie.preload();                                       // mulai unduh+compile WASM sebelum player pertama (0.78+)

const dl = new DotLottie({
  canvas: document.querySelector("#lottie"),
  src: "/anim.lottie",                 // atau .json; data: string | ArrayBuffer | object
  autoplay: false, loop: false,        // default keduanya false
  layout: { fit: "contain", align: [0.5, 0.5] },   // contain|cover|fill|fit-width|fit-height|none
  renderConfig: { autoResize: true, freezeOnOffscreen: true, devicePixelRatio: Math.min(devicePixelRatio, 2) /*, quality: 0..100 */ },
  useFrameInterpolation: true,
  // marker: "intro", segment: [0, 60], mode: "forward", speed: 1, stateMachineId: "fsm", themeId: "dark"
});
dl.addEventListener("load", () => {/* totalFrames, duration (ms), markers() tersedia */});
// ...
dl.destroy();                           // idempotent; wajib saat unmount
```
React: `<DotLottieReact src autoplay loop dotLottieRefCallback={setDl} layout renderConfig />` (`playOnHover`
**deprecated** → `onMouseEnter/onMouseLeave` + instance). Web component: `<dotlottie-wc src autoplay loop speed mode
segment marker themeId stateMachineId>` — properti Lit tanpa opsi `attribute`, jadi nama atribut = nama properti
lowercase (`stateMachineId`/`statemachineid` jalan, **`state-machine-id` tidak**); `.dotLottie` = instance core; varian
`<dotlottie-worker-wc workerId>`.
Worker: `new DotLottieWorker({ canvas, src, workerId: "w1" })` (API berbasis Promise, satu worker bisa dipakai banyak
instance dengan `workerId` sama; tidak mendukung `assetResolver`).

**lottie-web 5.13.0**:
```js
import lottie from "lottie-web";      // light: "lottie-web/build/player/lottie_light" (svg only, tanpa expressions/efek)
const anim = lottie.loadAnimation({
  container: el, renderer: "svg", loop: false, autoplay: false, path: "/anim.json",  // atau animationData (clone kalau ada repeater)
  rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: false, hideOnTransparent: true,
                      runExpressions: false /* untuk JSON tak tepercaya */, title: "…", description: "…" },
});
const off = anim.addEventListener("DOMLoaded", () => {/* aman memanipulasi */});  // return fungsi unsubscribe
anim.destroy();
```
Events: `complete, loopComplete, enterFrame, drawnFrame, segmentStart, config_ready, data_ready, data_failed,
loaded_images, DOMLoaded, destroy, error`. Global: `lottie.setQuality('high'|'medium'|'low'|n>1)`, `lottie.freeze()`,
`lottie.resize()`, `lottie.setLocationHref()` (fix mask Safari).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | lottie-web | dotlottie-web | Efek / catatan |
|---|---|---|---|
| Kecepatan | `setSpeed(n)` | `setSpeed(n)` | 1 = normal; turunkan saat hover-idle supaya "bernapas" |
| Arah | `setDirection(1 \| -1)` | `setMode("forward" \| "reverse" \| "bounce" \| "reverse-bounce")` | docs halaman playback menulis `"bounce-reverse"` → **salah**, tipe: `"reverse-bounce"` |
| Lompat | `goToAndStop(v, true)` / `goToAndPlay` | `setFrame(f)` | lottie-web: tanpa `true` = ms! |
| Segmen | `playSegments([a,b], force)`, antrian | `setSegment(a,b)`, `resetSegment()` | antrian = intro→loop tanpa event |
| Marker | `goToAndPlay("name")` (AE: komentar marker JSON `{"name":...}` / `name: ...` / string) | `setMarker("name")`, `markers()` | tipe publik 0.81: `{name, time, duration}`; changeset pending → `{name, start, end}` |
| Subframe | `setSubframe(bool)` (default true) | `useFrameInterpolation` / `setUseFrameInterpolation` (default true) | off untuk banyak instance/konten lambat |
| Loop | `loop: true` atau angka n, `setLoop` | `loop`, `loopCount`/`setLoopCount` | |
| Freeze | `lottie.freeze()` global | `freeze()/unfreeze()`, `freezeOnOffscreen` | render dihentikan tanpa ubah status play |
| Kualitas | `setQuality` | `renderConfig.quality` 0–100, `devicePixelRatio` | kompromi ketajaman vs CPU |
| Transform | — | `setTransform(3×3)`, `setViewport(x,y,w,h)` | zoom/crop ke area animasi tanpa CSS scale (tetap tajam) |
| SM tween | — | transition `duration` + `easing` bezier | crossfade/tween antar state di file |

`tween()` / `tweenToMarker()` **dihapus di dotlottie-web 0.70.0** ("remove unstable tween api") — API reference docs masih
mencantumkannya (stale). `getLayerBoundingBox()` juga masih tercantum di docs tapi **tidak ada** di tipe publik 0.81.0.

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **GSAP ScrollTrigger** (scrub) → playhead:
  ```js
  const state = { f: 0 };
  gsap.to(state, { f: () => dl.totalFrames - 1, ease: "none",
    scrollTrigger: { trigger: "#seq", start: "top top", end: "+=3000", scrub: 0.6, pin: true },
    onUpdate: () => dl.setFrame(state.f) });             // lottie-web: anim.goToAndStop(state.f, true)
  ```
  `scrub: 0.6` = smoothing 0.6 s dari GSAP (lihat `../../03-choreography/gsap/`).
- **Lenis**: `lenis.on("scroll", ({ progress }) => target = progress)` + loop lerp sendiri (resep #1).
- **Motion (React)**: `useScroll()` → `scrollYProgress.on("change", p => dl?.setFrame(p * (dl.totalFrames - 1)))`.
- **Barba / SPA**: `destroy()` di leave; pakai `DotLottie.preload()` di layout root agar halaman berikut tidak menunggu WASM.
- **R3F / three**: dotLottie menerima `OffscreenCanvas`/`RenderSurface` → render ke canvas lalu `CanvasTexture`
  (`needsUpdate` pada event `render`) [UNVERIFIED: pola, bukan contoh resmi].
- **Lottie Creator → kode**: Motion Tokens (`creator__12_motion-tokens__motion-tokens-in-code.md`) dan state machine
  dibuat di Creator, dijalankan dengan `stateMachineLoad(id)` + `stateMachineStart()` di event `load`.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Scroll-scrub dengan inersia sendiri (progress → frame + smoothing).**
```js
let target = 0, current = 0;
const update = () => {
  const r = section.getBoundingClientRect();
  target = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));   // 0..1 sepanjang section sticky
};
addEventListener("scroll", update, { passive: true }); update();
(function loop() {
  current += (target - current) * 0.12;                 // 0.08 berat/sinematik … 0.2 responsif
  if (Math.abs(target - current) > 1e-4 && dl.isLoaded) dl.setFrame(current * (dl.totalFrames - 1));
  requestAnimationFrame(loop);
})();
```
(lottie-web: `anim.goToAndStop(current * (anim.totalFrames - 1), true)` dengan `setSubframe(true)`.)
*Mahal karena*: playhead punya massa — berhenti scroll, animasi masih "meluncur" lalu settle; tidak patah-patah mengikuti
step wheel. Frame pecahan → subframe halus bila interpolasi aktif [UNVERIFIED: dotLottie membulatkan atau tidak saat
`setFrame` menerima float dengan interpolasi off].

**2. Hover play/reverse yang bisa berbalik di tengah jalan.**
```js
let goal = 0, pos = 0;                                   // frame
el.addEventListener("pointerenter", () => (goal = dl.totalFrames - 1));
el.addEventListener("pointerleave", () => (goal = 0));
(function tick() {
  pos += (goal - pos) * 0.18;                            // atau langkah konstan: pos += Math.sign(goal-pos) * speed
  dl.setFrame(pos);
  requestAnimationFrame(tick);
})();
```
lottie-web versi ringkas: `enter → anim.setDirection(1); anim.play()`, `leave → anim.setDirection(-1); anim.play()`
(lanjut dari frame saat ini). *Mahal karena*: keluar setengah jalan langsung berbalik dari posisi sekarang — tidak
pernah snap ke awal/akhir seperti play/stop naif.

**3. Koreografi berbasis marker (intro sekali → idle loop → outro).**
```js
// lottie-web: antrian segmen, intro tidak terpotong
anim.playSegments([[0, 45], [45, 120]], true);           // segmen terakhir di-loop bila loop:true
// dotLottie: marker
dl.addEventListener("load", () => { dl.setMarker("intro"); dl.play(); });
dl.addEventListener("complete", () => { if (dl.marker === "intro") { dl.setMarker("idle"); dl.setLoop(true); dl.play(); } });
```
*Mahal karena*: desainer mengatur ritme lewat marker di AE/Creator, kode hanya urutan → retiming tanpa deploy logika baru.

**4. Tombol interaktif murni dari file (.lottie State Machine) + data dari JS.**
```js
const fsm = { initial: "Idle",
  states: [
    { name: "Idle", type: "PlaybackState", animation: "button", segment: "idle", loop: true, autoplay: true,
      transitions: [{ type: "Transition", toState: "Hover", duration: 0.25, easing: [0.2, 0.8, 0.2, 1],
                      guards: [{ type: "Event", inputName: "enter" }] }] },
    { name: "Hover", type: "PlaybackState", animation: "button", segment: "hover", autoplay: true,
      transitions: [{ type: "Transition", toState: "Idle", guards: [{ type: "Event", inputName: "leave" }] }] } ],
  interactions: [
    { type: "PointerEnter", actions: [{ type: "Fire", inputName: "enter" }] },
    { type: "PointerExit",  actions: [{ type: "Fire", inputName: "leave" }] } ],
  inputs: [{ type: "Event", name: "enter" }, { type: "Event", name: "leave" }] };
dl.addEventListener("load", () => { dl.stateMachineLoadData(JSON.stringify(fsm)); dl.stateMachineStart(); });
dl.addEventListener("stateMachineStateEntered", (e) => console.log(e.state));
```
(`animation` wajib = ID animasi di folder `a/` (lihat `dl.manifest`); `segment` = nama marker atau rentang frame —
marker yang tidak ada jatuh ke rentang penuh. Skema persis: `format__dotlottie__interactivity__state-machines__specification.md`
dan `dotlottie.io/spec-2.0.md`.)
*Mahal karena*: tween bezier antar state hidup di file — desainer bisa mengganti rasa tanpa menyentuh JS; JS cukup
`stateMachineSetNumericInput("progress", p)` / `stateMachineFireEvent("submit")`.

**5. Recolor real-time (dark mode / brand) tanpa ekspor ulang.**
```js
dl.addEventListener("load", () => console.log(dl.getSlotIds()));
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) =>
  e.matches ? dl.setTheme("dark") : dl.resetTheme());
// atau granular: dl.setColorSlot("accent", [1, 0.4, 0.2, 1]); dl.setScalarSlot("strokeWidth", 4);
```
(Bentuk nilai slot animasi/statis: lihat `ColorSlotValue`/`ScalarSlotValue` di `npm-dotlottie-web-0.81.0/index.d.ts`.)
*Mahal karena*: satu file, banyak tema — warna ikut sistem tanpa flash atau file kedua.

**6. Grid banyak animasi tanpa membakar main thread.**
```js
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";
cards.forEach((c, i) => new DotLottieWorker({ canvas: c, src: c.dataset.src, autoplay: true, loop: true,
  workerId: `w${i % 2}`,                                 // 2 worker berbagi beban
  useFrameInterpolation: false, renderConfig: { devicePixelRatio: 1.5, freezeOnOffscreen: true } }));
```
*Mahal karena*: scroll tetap 60 fps karena rasterisasi pindah ke worker, kartu offscreen membeku sendiri.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **WASM dotLottie ~500 KB terkompresi** di critical path: `DotLottie.preload()` + `<link rel="preload" as="fetch"
  crossorigin href="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@<versi-persis>/dist/dotlottie-player.wasm">`
  (versi harus sama persis; tanpa `crossorigin` file diunduh 2×). `setWasmUrl()` **mematikan fallback CDN** jsdelivr/unpkg.
  Backend WebGL/WebGPU punya WASM sendiri (`dist/webgl/`, `dist/webgpu/`) → `preload()` pada kelas yang dipakai.
  CSP worker: 0.81.0 `DotLottieWorker.setWorkerUrl()` (hindari `worker-src blob:`).
- **Pilih backend**: software = paling kompatibel (juga Node & worker); WebGL2 = animasi kompleks/kanvas besar; WebGPU =
  throughput tertinggi tapi eksperimental → feature-detect + fallback.
- **Biaya render ∝ piksel**: cap DPR (≤2) di mobile; `useFrameInterpolation:false` untuk konten lambat/banyak instance.
- **lottie-web**: svg renderer = banyak node DOM (mahal untuk ribuan shape; `progressiveLoad` membantu init);
  canvas lebih ringan untuk banyak elemen tapi kehilangan track matte/expanded masks; ekspresi = biaya CPU per frame
  (wiki: bake "Convert expressions to keyframes" atau baris `// lottie:bake`).
- **Keamanan (OWASP)**: ekspresi lottie-web dijalankan sebagai kode (wiki: `'use javascript'`) → JSON dari user/pihak ketiga:
  `rendererSettings.runExpressions: false` (default `true`) atau `lottie_light`. dotLottie `OpenUrl` action: set
  `stateMachineConfig.openUrlPolicy = { requireUserInteraction: true, whitelist: ["https://domainmu.com"] }`.
- **prefers-reduced-motion**: tidak ada yang otomatis. Pola: `autoplay:false` + tampilkan frame representatif
  (`dl.setFrame(dl.totalFrames - 1)` / `anim.goToAndStop(lastFrame, true)`), loop dimatikan, scroll-scrub diganti
  crossfade.
- **Aksesibilitas**: lottie-web svg → `rendererSettings.title/description` (+ `focusable`); dotLottie canvas → `role="img"`
  + `aria-label`; animasi dekoratif → `aria-hidden="true"`.
- **Bug lama yang sudah diperbaiki** (alasan upgrade): 0.78.0 frame pertama lebih cepat (anim diunduh paralel dengan WASM,
  worker tree-shakeable 37.6→11.9 KB gzip, StrictMode React), memori WASM 2 GB max untuk Safari/iOS 15, 0.72.x WebGPU
  channel-swap di Android, fallback `WebAssembly.instantiate` untuk WKWebView.
- **Pending di main (belum rilis per 2026-10-28)**: hapus dukungan video MP4 eksperimental (masuk 0.80.0), tipe `Marker`
  → `{name, start, end}`, thorvg 1.1.3.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `web/docs.lottiefiles.com/_index.md` — indeks 73 halaman kurasi (runtime web/react/wc, format, Creator interactivity)
- `web/docs.lottiefiles.com/runtimes__distributions__js__v0.x__api__reference.md` — konfigurasi, method, event (catatan: tween/getLayerBoundingBox basi)
- `web/docs.lottiefiles.com/runtimes__distributions__js__v0.x__state-machines.md` (+ `__examples.md`) — SM dari JS
- `web/docs.lottiefiles.com/format__dotlottie__interactivity__state-machines__specification.md` — skema SM lengkap
- `web/docs.lottiefiles.com/format__dotlottie__interactivity__theming__specification.md`, `...core-concepts__slots.md`
- `web/docs.lottiefiles.com/runtimes__distributions__js__v0.x__advanced__{performance,web-worker,gpu-rendering}.md`
- `web/docs.lottiefiles.com/creator__11_interactivity-and-state-machines*.md`, `creator__12_motion-tokens*.md`, `creator__14_plugins__{spring-curve,physics-simulator}.md` — sisi desain
- `web/dotlottie.io/spec-2.0.md` — spesifikasi format .lottie v2 (a/, i/, s/, themes, manifest `initial`)
- `npm-dotlottie-web-0.81.0/index.d.ts` — tipe yang benar-benar dipublikasikan (sumber kebenaran API rilis)
- `repo-dotlottie-web/packages/web/src/{dotlottie.ts,types.ts,event-manager.ts,constants.ts}` — perilaku (DPR, freeze, setFrame)
- `repo-dotlottie-web/packages/web/CHANGELOG.md`, `.changeset/` — riwayat versi & perubahan pending
- `repo-dotlottie-web/packages/{react,wc,vue,svelte,solid}/README.md` — wrapper framework
- `repo-dotlottie-web/SKILL.md`, `references/dynamic-slots.md` — panduan vendor untuk agent (data pihak ketiga)
- `repo-lottie-web/README.md`, `index.d.ts`, `player/js/animation/AnimationItem.js` — API & semantik goToAndStop/playSegments
- `repo-lottie-web-wiki/{Markers,loadAnimation-options,Renderer-Settings,Features,Expressions,Lottie-Light}.md`
