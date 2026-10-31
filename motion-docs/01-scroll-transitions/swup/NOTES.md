---
tool: swup 4 (+ plugin & theme resmi)
version: swup 4.10.0 (2026-09-03; repo HEAD 774d0f9, 2026-10-06). Plugin (versi dari docs): parallel 0.4.0, js 3.2.0, preload 3.2.12, head 2.3.1, a11y 5.2.1, fragment 1.3.1, scroll 4.0.0, progress 3.2.0, forms 3.6.0, route-name 4.1.0, body-class 3.3.0, scripts 2.1.0, debug 4.1.0; themes fade/slide/overlay 2.0.2
official: https://swup.js.org/ · https://github.com/swup/swup
local: web/ (58 halaman docs) · repo-swup/src/ (Swup.ts, modules/*.ts) · repo-swup/CHANGELOG.md
fetched: 2026-10-28
---
# swup — page transition MPA berbasis class CSS di `<html>`, hook lifecycle, visit object, plugin modular

## Kapan pakai / kapan jangan
- **Pakai** sebagai default untuk MPA/server-rendered (Astro, Eleventy, WordPress, Laravel/Livewire) yang butuh
  transisi tanpa reload, terutama bila mau **CSS-first** (class `is-animating/is-leaving/is-rendering`) dan plugin a11y,
  preload, scroll, fragment siap pakai. Aktif dikembangkan (2026).
- **Barba** bila butuh resolusi transisi berbasis aturan `from/to/custom` + `views` dan selalu JS timeline (swup bisa
  sama via JS plugin/route-name, tapi Barba lebih eksplisit).
- **Native cross-document View Transitions** bila nol-JS cukup dan Firefox boleh tanpa animasi; swup `native:true` =
  same-document VT di dalam swup (tetap SPA-like, ada cache/preload/hook).
- **Jangan** untuk SPA framework (pakai router + VT/Motion).

## Mental model
Lifecycle (`modules/navigate.ts`): `link:click` → `visit:start` → (fetch page **paralel** dengan animasi out;
`visit.animation.wait=true` untuk menunggu dulu) → `animation:out:start` (+`is-changing is-animating is-leaving`) →
`animation:out:await` (tunggu **semua CSS transition/animation** pada `animationSelector`, default `[class*="transition-"]`)
→ `animation:out:end` → `content:replace` (hanya `containers`, default `['#swup']`; `is-leaving` dilepas,
`is-rendering` dipasang) → `content:scroll` → `page:view` → `animation:in:start` (`is-animating` dilepas → CSS transisi
masuk jalan) → `animation:in:await` → `animation:in:end` → `visit:end` (class dibersihkan).
- Default **container lama & baru tidak pernah berdampingan** (beda dari Barba) → untuk crossfade/slideshow butuh
  **Parallel Plugin**.
- `native:true` (+ browser punya `document.startViewTransition`) → render dibungkus
  `document.startViewTransition(async () => renderPage()).finished`, class `swup-native` di html.
- History (popstate): animasi & scroll reset dimatikan default (`animateHistoryBrowsing:false`); kalau diaktifkan,
  4.10 **skip animasi bila `event.hasUAVisualTransition`** (gesture swipe-back browser sudah menganimasikan).
- Klik cepat beruntun didukung (4.5): visit lama di-abort → hook `visit:abort`. 4.9: handler boleh mengabaikan visit.
- Scroll reset bawaan = `window.scrollTo({top:0,left:0,behavior:'auto'})` di hook `scroll:top` (sync). `behavior:'auto'`
  ikut CSS `scroll-behavior:smooth` → kalau html smooth, reset ikut beranimasi.
- Hook tak terdokumentasi di tabel tapi ada di source: `visit:transition`, `visit:fail`.
- **Cara menunggu animasi** (`modules/awaitAnimations.ts`): elemen dicari dengan `animationSelector` di seluruh
  `document.body` (bukan hanya container); per elemen dihitung `max(delay+duration)` transition vs animation, lalu
  ditunggu sebanyak jumlah properti (`propCount`) event `transitionend|animationend` **yang target-nya elemen itu
  sendiri** (event anak diabaikan), fallback `setTimeout(timeout + 1)`. Jauh lebih robust daripada @barba/css (yang
  selesai di `transitionend` pertama). Konsekuensi: delay CSS ikut dihitung → stagger via `transition-delay` aman.

## Setup minimal
```html
<main id="swup" class="transition-fade">…</main>
<style>
  html.is-changing .transition-fade { transition: opacity .25s; opacity: 1 }
  html.is-animating .transition-fade { opacity: 0 }
</style>
```
```js
import Swup from 'swup'
const swup = new Swup({ /* defaults: */ animateHistoryBrowsing:false, animationSelector:'[class*="transition-"]',
  animationScope:'html', cache:true, containers:['#swup'], hooks:{}, linkSelector:'a[href]', linkToSelf:'scroll',
  native:false, plugins:[], timeout:0,
  ignoreVisit: (url, { el } = {}) => el?.closest('[data-no-swup]') })
swup.hooks.on('page:view', (visit) => initPage())     // juga: .once .before .replace .off; opsi {priority}
swup.navigate('/about', { meta: { from: 'menu' } })   // swup.destroy()
```
Hooks via opsi: `hooks: {'visit:start.once': fn, 'content:replace.before': fn}`. DOM events: `document` dapat
`swup:<hook>` (detail `{visit}`), plus `swup:any`.

## Knob yang menentukan rasa gerak
- **Class & selector**: `is-changing` (seluruh proses — loading state), `is-animating` (state "tak terlihat" — dipakai
  out & awal in), `is-leaving` (fase out saja), `is-rendering` (fase in), `to-[name]` dari `data-swup-animation="name"`
  di link atau `visit.animation.name` → animasi berbeda per link. `animationScope:'containers'` memindah class ke container.
- **Visit object** (ubah di `visit:start`): `visit.animation.{animate, name, wait, native, scope, selector}`,
  `visit.scroll.{reset, target}`, `visit.containers` (ganti container per visit), `visit.history.{action:'push'|'replace',
  popstate, direction:'forwards'|'backwards'}`, `visit.cache.{read, write}`, `visit.meta` (data bebas antar hook),
  `visit.trigger.{el, event}`, `visit.to.{url, hash, html, document}` (document = halaman baru ter-parse).
- **JS animation tanpa plugin**: `swup.hooks.replace('animation:out:await', async () => { await gsap.to(...) })` dan
  `'animation:in:await'`.
- **Parallel Plugin** (`new SwupParallelPlugin({containers:['main'], keep:0})`): skip fase out, sisipkan container
  baru **sebelum** yang lama (lama dapat `aria-hidden="true"`), semua animasi terjadi di fase in. Class:
  `.is-next-container` (state AWAL yang baru; dilepas sesaat setelah insert), `.is-previous-container` (state AKHIR yang
  lama), `.is-kept-container`/`.is-removing-container` (dengan `keep:n`). Hook `content:insert`, `content:remove`.
  Opt-out per visit: `visit.animation.parallel = false`. Layout aman: grid, kedua container `grid-area` sama.
- **JS Plugin** (`animations:[{from, to, out:(done,data)=>…, in:(done,data)=>…}]`): pilih animasi via string/RegExp/
  path-to-regexp/nama `data-swup-animation`; boleh return Promise. Dengan Parallel → hanya `in` yang jalan.
- **Preload Plugin**: hover/touchstart/focus preload (throttle 5), `data-swup-preload`, `data-swup-preload-all`,
  `preloadVisibleLinks:{threshold:.2, delay:500}`, `swup.preload(urls)`; hook `page:preload`, `link:hover`.
- **Scroll Plugin**: `animateScroll:{betweenPages, samePageWithHash, samePage}`, `offset`, `scrollContainers`
  (`[data-swup-scroll-container]`), `shouldResetScrollPosition(link)`, `markScrollTarget`, `doScrollingRightAway`,
  `scrollFunction(el, top, left, animate, start, end)`; hook `scroll:start/end`; `swup.scrollTo(px, animate)`.
- **Fragment Plugin**: `rules:[{from, to, containers:['#list'], name?, scroll?, focus?, if?}]` → hanya fragmen yang
  diganti & dianimasikan (class `is-changing/is-animating` di fragmen), scroll dipertahankan → filter/tab/modal overlay.
- **A11y Plugin**: fokus ke body/heading, umumkan judul (`aria-label` h1 > h1 > title), `respectReducedMotion:true`
  (skip animasi), `autofocus`. **Head Plugin**: `persistAssets`, `persistTags`, `awaitAssets`.
  **Route Name Plugin**: class `from-route-x to-route-y` (+ `to-same-route`, `paths:true` → `from-about to-team`).

## Integrasi
**Lenis (window) + ScrollTrigger:**
```js
const lenis = new Lenis({ autoRaf:false, stopInertiaOnNavigate:true })
lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0)
swup.hooks.on('visit:start', () => lenis.stop())
swup.hooks.before('content:replace', () => ScrollTrigger.getAll().forEach(t => t.kill()))
swup.hooks.replace('scroll:top', () => { lenis.scrollTo(0, { immediate: true, force: true }); return true }) // sync, wajib return boolean
swup.hooks.on('page:view', () => { lenis.resize(); initTriggers(); ScrollTrigger.refresh() })
swup.hooks.on('visit:end', () => lenis.start())
```
Scroll Plugin + Lenis: `scrollFunction: (el, top, left, animate, start, end) => { start(); lenis.scrollTo(top,
{ immediate: !animate, force: true, onComplete: end }) }` (pola dari contoh GSAP ScrollToPlugin di docs).
- **Locomotive v5**: `before('content:replace')` → `removeScrollElements(old)`, `page:view` → `addScrollElements(new)` + `resize()`.
- **Alpine/Astro/Livewire**: lihat `web/integrations__*.md`, `web/plugins__livewire-plugin.md`.

## Resep non-generik
1. **Overlay curtain dengan class saja** (tanpa JS animasi)
```css
.curtain { position:fixed; inset:0; background:#111; transform: scaleY(0); transform-origin: bottom;
  transition: transform .6s cubic-bezier(.77,0,.18,1) } /* tambahkan class transition-curtain agar ditunggu */
html.is-leaving .curtain { transform: scaleY(1) }
html.is-rendering .curtain { transform: scaleY(0); transform-origin: top }
```
Kenapa mahal: origin pindah di tengah (bottom → top) = tirai menyapu lewat; konten diganti tepat saat layar tertutup.

2. **Arah slide dari history** — `swup.hooks.on('visit:start', v => { v.animation.name = v.history.direction ===
   'backwards' ? 'slide-back' : 'slide' })` + CSS `html.to-slide-back …`. Kenapa mahal: tombol back terasa "mundur".

3. **Native VT + fallback CSS**: `new Swup({native:true})` + `html.is-changing .transition-main { view-transition-name:
   main }` + keyframes di `::view-transition-old/new(main)`; fallback `html.is-animating:not(.swup-native) …`.
   Kenapa mahal: compositor-driven, shared element (`view-transition-name` sama di dua halaman) gratis.

4. **Slideshow bertumpuk (Parallel `keep:1`)** — container lama bergeser `-100%` jadi "kartu di belakang", yang lebih tua
   `.is-removing-container` ke `-200%` + opacity 0. Kenapa mahal: kedalaman/tumpukan antar halaman.

5. **Fragment modal**: rule `{from:'/projects/', to:'/projects/:slug', containers:['#detail'], name:'open-detail'}` →
   detail overlay muncul di atas grid tanpa kehilangan scroll; back menutupnya.

## Performa, aksesibilitas, mobile & browser
- Tanpa elemen ber-class `transition-*` swup memberi warning "no CSS animation duration" → `animationSelector:false`.
- Pasang **A11y Plugin** (fokus + pengumuman + reduced motion). Untuk reduced motion manual: `visit.animation.animate=false`.
- `timeout:0` default (tanpa batas) → pertimbangkan nilai untuk jaringan buruk + hook `fetch:timeout`.
- Swipe-back iOS/Android: biarkan `animateHistoryBrowsing:false` atau andalkan cek `hasUAVisualTransition` (4.10).
- Browser support: lihat `web/other__browser-support.md`.

## Sumber lokal
- `web/getting-started__animations.md` — class CSS, JS hooks, native mode.
- `web/hooks.md`, `web/visit.md`, `web/options.md`, `web/lifecycle.md` — inti API.
- `web/plugins__parallel-plugin.md`, `web/plugins__js-plugin.md`, `web/plugins__scroll-plugin.md`,
  `web/plugins__fragment-plugin.md`, `web/plugins__preload-plugin.md`, `web/plugins__a11y-plugin.md`,
  `web/plugins__head-plugin.md`, `web/plugins__route-name-plugin.md` — plugin resmi.
- `web/themes__{fade,slide,overlay}-theme.md`, `web/themes__create-theme.md` — theme resmi.
- `web/getting-started__common-issues.md`, `web/getting-started__reloading-javascript.md` — jebakan umum.
- `web/announcements__swup-4.md`, `web/getting-started__upgrading.md` — perubahan v3→v4.
- `repo-swup/src/modules/navigate.ts` — urutan nyata + native VT; `repo-swup/src/Swup.ts` — popstate/hasUAVisualTransition.
- `repo-swup/src/modules/Visit.ts`, `Hooks.ts`, `scrollToContent.ts` — bentuk visit, daftar hook, scroll reset.
- `repo-swup/CHANGELOG.md` — riwayat 4.x.
