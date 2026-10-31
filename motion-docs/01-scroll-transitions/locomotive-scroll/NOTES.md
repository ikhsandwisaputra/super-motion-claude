---
tool: Locomotive Scroll v5
version: locomotive-scroll 5.0.1 (packages/lib/package.json, bergantung lenis 1.3.17 dipin) — repo HEAD b6bcc56 (2026-04-01); dicek 2026-10-28
official: https://github.com/locomotivemtl/locomotive-scroll · https://scroll.locomotive.ca/docs/
local: repo-locomotive-scroll/packages/lib/ (index.ts, types.ts, core/*.ts) · repo-locomotive-scroll/packages/docs/docs/ · web/ (10 halaman docs)
fetched: 2026-10-28
---
# Locomotive Scroll v5 — Lenis + atribut `data-scroll-*` untuk parallax, in-view class, dan progress 0–1

## Kapan pakai / kapan jangan
- **Pakai** untuk situs editorial/agency yang mau parallax & reveal deklaratif di HTML (CMS/Twig/Astro) tanpa menulis
  ScrollTrigger: `data-scroll-speed`, `data-scroll-css-progress` → `--progress`, `data-scroll-call` → CustomEvent.
- **Jangan** kalau koreografi butuh timeline kompleks/pinning → Lenis polos + GSAP ScrollTrigger (atau CSS scroll-driven
  animations untuk progress murni). v5 **bukan** v4: tidak ada `data-scroll-container/section/sticky/delay/direction/
  target`, tidak ada scrollbar custom, tidak ada transform wrapper (hapus semua pola v4 dari kepala).
- Lenis di dalamnya dipin 1.3.17 (bukan 1.3.27) → opsi baru Lenis (mis. `stopInertiaOnNavigate`, `respectReducedMotion`)
  ada tapi perilaku mengikuti 1.3.17 [cek CHANGELOG Lenis bila kritis].

## Mental model
- Konstruktor membuat `new Lenis({...lenisOptions})` lalu (frame berikutnya) `Core` yang men-scan `[data-scroll]` di
  `lenis.rootElement`. Loop sendiri: `_raf()` → `lenis.raf(Date.now())` → `core.onRender({currentScroll, smooth})`.
  (Dengan `initCustomTicker`, waktu tetap `Date.now()`, bukan argumen ticker.)
- **Dual IntersectionObserver**: elemen "trigger" sederhana pakai IO `triggerRootMargin '-1px -1px -1px -1px'`; elemen
  yang butuh RAF (punya `data-scroll-offset|position|css-progress|event-progress|speed`) pakai IO
  `rafRootMargin '100% 100% 100% 100%'` dan hanya subscribe ke RAF selama dekat viewport.
- Progress elemen = `clamp(0,1, normalize(intersection.start, intersection.end, scroll))`. `is-inview` ditambah saat
  0<progress<1; dilepas hanya bila `data-scroll-repeat`.
- **Parallax**: `translate = progress' × containerSize × speed × -1`, dengan progress' = map(0..1 → -1..1) untuk elemen
  normal, atau 0..1 untuk elemen "in fold" (sudah terlihat saat load) → speed 1 = total geser 2× tinggi container
  (normal) / 1× (in-fold). Nilai relatif ukuran container, bukan px.
- **Touch** (`'ontouchstart' in window || maxTouchPoints>0`) → parallax dimatikan (transform di-reset) kecuali
  `data-scroll-enable-touch-speed`. Perhatikan: laptop touchscreen ikut terdeteksi "touch".
- Resize: Locomotive membungkus `lenis.dimensions.onContentResize/onWrapperResize` → hitung ulang setelah debounce
  250 ms milik Lenis.

## Setup minimal
```js
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'   // = import lenis.css (file loco sendiri kosong)
const loco = new LocomotiveScroll({
  lenisOptions: { lerp: 0.08, wheelMultiplier: 0.9 },     // diteruskan apa adanya ke new Lenis()
  scrollCallback: ({ scroll, limit, velocity, direction, progress }) => {},
  // autoStart: true, triggerRootMargin, rafRootMargin, initCustomTicker, destroyCustomTicker
})
loco.destroy()   // stop RAF + destroy Lenis; Core di-destroy rAF berikutnya
```
Horizontal: `lenisOptions:{orientation:'horizontal'}` → `<html data-scroll-orientation="horizontal">`; CSS docs:
`body{width:fit-content}` + container `display:flex`.
⚠️ Docs `options.md` masih menulis `smoothTouch`, `normalizeWheel`, `touchMultiplier: 2` (opsi Lenis lama) — tipe
sebenarnya `LenisOptions` dari lenis 1.3.x → pakai `syncTouch`, tidak ada `normalizeWheel`.

## Knob yang menentukan rasa gerak (atribut)
| Atribut | Default | Efek |
|---|---|---|
| `data-scroll` | – | aktifkan deteksi |
| `data-scroll-speed` | – | parallax relatif container; mulai 0.1–0.5; negatif = arah berlawanan |
| `data-scroll-position` | `start,end` | titik trigger masuk/keluar: `start`/`middle`/`end` |
| `data-scroll-offset` | `0,0` | offset masuk/keluar; `%` = persen tinggi viewport, angka = px (`'100,50%'`) |
| `data-scroll-class` | `is-inview` | class saat terlihat |
| `data-scroll-repeat` | off | ulang in/out (tanpa ini class menempel selamanya) |
| `data-scroll-css-progress` | off | set `--progress` (0–1) inline tiap perubahan |
| `data-scroll-event-progress="name"` | – | `window` CustomEvent `name` detail `{target, progress}` |
| `data-scroll-call="name"` | – | `window` CustomEvent detail `{target, way:'enter'|'leave', from:'start'|'end'}` |
| `data-scroll-ignore-fold` | off | jangan remap progress elemen yang sudah terlihat saat load |
| `data-scroll-enable-touch-speed` | off | izinkan parallax di touch |
| `data-scroll-to` (+ `-href`, `-offset`, `-duration`) | – | klik → `scrollTo`; ⚠️ duration di-`parseInt` → "1.5" jadi 1 |
Methods: `start() stop() resize() scrollTo(target, opts) addScrollElements($el) removeScrollElements($el) destroy()`,
plus `loco.lenisInstance` (akses penuh Lenis: `velocity`, `direction`, `on('virtual-scroll')`).

## Integrasi
- **GSAP ticker**: `initCustomTicker: (render) => gsap.ticker.add(render), destroyCustomTicker: (render) =>
  gsap.ticker.remove(render)` (wajib berpasangan; kalau satu saja ada → console.warn).
- **ScrollTrigger**: `loco.lenisInstance.on('scroll', ScrollTrigger.update)` (scroll native → tanpa scrollerProxy untuk
  window) [pola dari Lenis README; contoh CodeSandbox resmi di docs/examples.md tidak di-mirror].
- **Barba / swup**: jangan buat instance baru per halaman. Pola: `removeScrollElements(oldContainer)` sebelum container
  lama dibuang, `addScrollElements(newContainer)` setelah container baru masuk, lalu `resize()`; reset scroll via
  `loco.scrollTo(0, {immediate:true, force:true})`. (Barba docs "Third party: Locomotive" masih v4 — `scroll.update()`,
  `data-scroll-container` — abaikan.) Demo resmi `packages/demo` membungkus satu instance statis (class `Scroll`) yang
  mengekspos `addScrollElements/removeScrollElements/start/stop` — pola yang sama cocok untuk router transisi.

## Resep non-generik
1. **Reveal berbasis `--progress` tanpa JS animasi**
```html
<figure data-scroll data-scroll-css-progress data-scroll-position="start,middle" class="reveal"><img …></figure>
<style>.reveal img{ clip-path: inset(calc((1 - var(--progress,0)) * 50%) 0); scale: calc(1.25 - var(--progress,0) * .25) }</style>
```
Kenapa mahal: dua properti terkunci ke satu progress (clip membuka sambil zoom-out) = gerak "kamera" terkoreografi.

2. **Arah scroll ke CSS var (dari demo resmi)** — `scrollCallback` membandingkan `progress` vs sebelumnya lalu set
   `--scroll-direction: 1|-1` di root → header/marquee bereaksi arah tanpa listener tambahan.
   Kenapa mahal: elemen UI "mendengarkan" niat user (naik = header muncul) dengan satu variabel global.

3. **Marquee yang didorong velocity (landing `Rail.js`)**: `currentTranslate += (idle + |velocity|*0.8) * direction`
   lalu modulo lebar; aktif hanya saat `data-scroll-call` 'enter'. ⚠️ di sumber asli increment per tick (frame-rate
   dependent) → kalikan `dt*60` saat menyalin.
   Kenapa mahal: teks berjalan sendiri lalu "terdorong" scroll — terasa hidup, bukan loop CSS mati.

4. **Event progress untuk counter/scrub kustom**
```js
window.addEventListener('heroProgress', (e) => { counter.textContent = Math.round(e.detail.progress * 100) })
// <section data-scroll data-scroll-event-progress="heroProgress">
```

## Performa, aksesibilitas, mobile & browser
- Elemen hanya di RAF saat terlihat **dan** butuh RAF → aman untuk banyak elemen trigger biasa.
- Parallax off di touch secara default (bagus untuk perf & mual); `prefers-reduced-motion`: Lenis 1.3.17 di dalamnya
  [UNVERIFIED apakah sudah punya `respectReducedMotion` — opsi itu ada di types 1.3.27]; aman: cek media query sendiri
  dan jangan pasang `data-scroll-speed` saat reduce.
- SSR: bergantung `window` + IO → inisialisasi di client saja (docs Limitations).
- Popup pihak ketiga yang di-inject: `lenisOptions.prevent: (node) => node.id === 'modalSelector'`.

## Sumber lokal
- `repo-locomotive-scroll/packages/docs/docs/documentation/{options,attributes,methods}.md` — referensi resmi.
- `repo-locomotive-scroll/packages/docs/docs/extras/{migration-guide,limitations}.md` — v4→v5, batasan.
- `repo-locomotive-scroll/packages/lib/index.ts` — loop, scrollTo, add/removeScrollElements, deteksi touch.
- `repo-locomotive-scroll/packages/lib/core/ScrollElement.ts` — rumus progress/parallax, CustomEvent detail.
- `repo-locomotive-scroll/packages/lib/core/Core.ts` — dual IO, root margins.
- `repo-locomotive-scroll/packages/demo/src/scripts/` — pemakaian resmi (Scroll class, progress events).
- `repo-locomotive-scroll/packages/landing/assets/scripts/modules/{Scroll,Rail}.js` — modul situs resmi (velocity rail).
- `repo-locomotive-scroll/packages/landing/assets/styles/settings/_config.eases.scss` — tabel cubic-bezier GSAP-ekuivalen.
- `web/_index.md` — 10 halaman scroll.locomotive.ca/docs.
