# 01 — Smooth Scrolling & Seamless Page Transitions

Kategori ini mengatur **aliran** situs: bagaimana scroll terasa (massa, inersia, ritme) dan bagaimana halaman berganti
tanpa "reload" (kontinuitas). Semua catatan dicek terhadap sumber lokal per 2026-10-28.

| Alat | Folder | Satu baris | Versi | URL resmi |
|---|---|---|---|---|
| Lenis | [lenis/](lenis/NOTES.md) | Interpolasi di atas native scroll (`scrollTo` per frame), jam tunggal untuk sinkron GSAP/Motion/R3F | 1.3.27 (2026-10-15) | https://github.com/darkroomengineering/lenis |
| Locomotive Scroll v5 | [locomotive-scroll/](locomotive-scroll/NOTES.md) | Lenis + atribut `data-scroll-*` (parallax, in-view, `--progress`, CustomEvent) | 5.0.1 (lenis 1.3.17) | https://scroll.locomotive.ca/docs/ |
| Barba.js | [barba/](barba/NOTES.md) | PJAX dengan hook berurutan, rules `from/to`, views; kamu yang menganimasikan container | core 2.10.3 (2024, maintenance) | https://barba.js.org/docs/ |
| swup | [swup/](swup/NOTES.md) | PJAX CSS-first (class di `<html>`), visit object, plugin resmi (parallel, js, preload, scroll, a11y, fragment), native VT mode | 4.10.0 (2026-09-03) | https://swup.js.org/ |
| View Transitions API | [view-transitions/](view-transitions/NOTES.md) | Snapshot native → pseudo-element yang dianimasikan; same-doc, cross-doc, element-scoped; React `<ViewTransition>` | Web 2026 · React 19.3 | https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API |

Sumber MDN bersama: `../_shared/mdn-content/files/en-us/web/api/view_transition_api/`, `.../css/guides/view_transitions/`,
`.../css/reference/properties/{scroll-behavior,overscroll-behavior*,scroll-snap*}/`.

## Pilih yang mana?

| Kebutuhan | Pilih | Kenapa / catatan |
|---|---|---|
| Wheel terasa berat & mahal, animasi dipegang GSAP/Motion | **Lenis** | native tetap utuh (sticky, IO, CSS scroll-driven); `lerp 0.06–0.1` |
| Parallax/reveal deklaratif dari HTML/CMS tanpa menulis ScrollTrigger | **Locomotive v5** | `data-scroll-speed`, `data-scroll-css-progress`; parallax otomatis off di touch |
| Transisi halaman MPA, CSS-first, aksesibel, aktif dirawat | **swup** (+ a11y, preload, scroll plugin) | `native:true` bila mau VT dengan fallback |
| Transisi MPA dengan timeline JS per rute & views per namespace | **Barba** | hook order jelas; ingat dua container berdampingan saat `enter` |
| Crossfade/slideshow antar halaman (lama & baru tampil bersamaan) | **swup Parallel Plugin** atau **Barba `sync:true`** | swup menyisipkan container baru sebelum lama + `aria-hidden` |
| Nol-JS page transition antar halaman same-origin | **`@view-transition { navigation: auto }`** | Chrome 126+/Safari 18.2+, Firefox belum → progressive enhancement |
| Shared element thumbnail → hero dalam SPA | **View Transitions** (`view-transition-name` sementara) / React `<ViewTransition name>` | override `object-fit` + `height:100%` untuk rasio berbeda |
| Reorder list / transisi lokal tanpa membekukan halaman | **Element-scoped VT** (`el.startViewTransition`, Chrome 147+) | fallback: FLIP (GSAP Flip / Motion layout) |
| Scroll snap dengan smooth scroll | **lenis/snap** | CSS scroll-snap tidak didukung Lenis |
| Halaman tak berujung (loop) | **Lenis `infinite`** + wrapper bersarang + snap | lihat resep 5 di lenis/NOTES.md |
| Touch device | **jangan smooth-kan** (biarkan native) | `syncTouch` hanya bila wajib sinkron WebGL / infinite |

## Wiring baku (ringkas)
- Lenis + GSAP: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)`.
- Lenis + Motion: `frame.setup(({timestamp}) => lenis.raf(timestamp), true)` (bukan `frame.update` → 1 frame lag).
- Lenis + R3F: `addEffect((t) => lenis.raf(t))` dengan `autoRaf:false`.
- Lenis + router transisi: `stop()` di awal → `scrollTo(0,{immediate:true, force:true})` saat swap → `resize()` +
  `start()` + `ScrollTrigger.refresh()` di akhir; `stopInertiaOnNavigate:true`.
