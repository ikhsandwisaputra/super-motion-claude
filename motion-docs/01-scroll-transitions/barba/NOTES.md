---
tool: Barba.js v2 (@barba/core, @barba/css, @barba/prefetch, @barba/router)
version: core 2.10.3 (2024-08-12) · css 2.1.16 · prefetch 2.2.0 · router 2.1.11 (2024-05-10). Repo HEAD a7c99a5 = 2024-08-12 → tidak ada rilis 2025–2026 (mode maintenance). @barba/head & @barba/preset = "Coming soon" (tidak ada).
official: https://barba.js.org/docs/ · https://barba.js.org/api/ · https://github.com/barbajs/barba
local: web/ (23 halaman docs) · web/api/ (58 halaman typedoc) · repo-barba/packages/*/src, README, CHANGELOG
fetched: 2026-10-28
---
# Barba.js — PJAX page transitions dengan hook berurutan; kamu yang menganimasikan container lama & baru

## Kapan pakai / kapan jangan
- **Pakai** untuk MPA server-rendered (WordPress, PHP, Astro static) yang mau transisi koreografi penuh JS (GSAP
  timeline per rute, overlay/curtain, shared-element manual). Aturan transisi `from/to` (namespace/route/custom) dan
  `views` per namespace sangat ekspresif.
- **swup** lebih modern & aktif (4.10 2026, View Transitions native mode, a11y/preload/parallel plugin resmi) →
  default untuk proyek baru kecuali kamu butuh model hook Barba.
- **Cross-document View Transitions** (`@view-transition {navigation:auto}`) = nol JS, tapi Firefox belum dukung
  (lihat `../view-transitions/NOTES.md`) dan tak bisa menahan halaman untuk timeline JS panjang.
- **Jangan** untuk SPA framework (React/Next/Nuxt) — router mereka + View Transitions.

## Mental model (urutan yang menentukan koreografi)
Default (`sync:false`), dari `packages/core/src/modules/Transitions.ts`:
1. `before` → `beforeLeave` → **`leave` berjalan PARALEL dengan fetch halaman berikutnya** → `afterLeave`
2. container baru di-**append ke AKHIR wrapper** (`nextAdded`) → `beforeEnter` → `enter(data, leaveResult)` → `afterEnter`
3. container lama baru di-**remove setelah afterEnter** (`currentRemoved`) → `after`.
⇒ Selama `enter`, **dua container ada di DOM** (yang baru di bawah yang lama). Sembunyikan yang lama di `leave`,
   `position:absolute`-kan keduanya, atau `data.current.container.remove()` manual.
`sync:true`: **tunggu halaman siap dulu** (klik tidak memicu apa pun sampai fetch selesai) → `before` → add →
`beforeLeave` → `beforeEnter` → `leave` & `enter` bersamaan (`Promise.all`) → `afterLeave` → `afterEnter` → remove →
`after`. Untuk crossfade/overlap. Konsekuensi: latensi jaringan terasa sebagai "jeda sebelum mulai".
- Hook async: return Promise / `async` / `this.async()`. Hook global: `barba.hooks.<name>(fn)` (bisa sebelum/sesudah
  init). Hook global ekstra di source: `ready`, `page`, `reset`, `nextAdded`, `currentRemoved`.
- `data`: `{current, next, trigger, event}`; `current/next = {container, namespace, url{href,path,query,hash}, route, html}`.
  `trigger` = elemen link | `'barba'` (programatik) | `'back'|'forward'`.
- Klik link saat transisi berjalan → **`barba.force(href)` = reload penuh** kecuali `preventRunning:true`.
- Prefetch: hover/touchstart (`prefetchIgnore:false`) memanfaatkan jeda 100–300 ms sebelum klik; cache per sesi.
- Timeout default `2e3` ms → halaman lambat = transisi dibatalkan → `force` redirect. Naikkan `timeout` untuk situs berat.

## Setup minimal
```html
<body data-barba="wrapper">
  <header>…persisten…</header>
  <main data-barba="container" data-barba-namespace="home">…</main>
</body>
```
```js
import barba from '@barba/core'
barba.init({
  preventRunning: true, timeout: 5000,
  transitions: [{ name: 'default',
    leave: ({ current }) => gsap.to(current.container, { autoAlpha: 0, duration: .4 }),
    enter: ({ next }) => gsap.from(next.container, { autoAlpha: 0, duration: .6 }) }],
  views: [{ namespace: 'home', beforeEnter() {/* init */}, afterLeave() {/* destroy */} }],
})
// barba.destroy(), barba.go(url), barba.force(url), barba.prefetch(url), barba.history.{previous,current,add,store}
```
Opsi init (defaults): `cacheFirstPage:false, cacheIgnore:false, debug:false, logLevel:'off', prefetchIgnore:false,
prevent:null, preventRunning:false, schema, timeout:2e3, transitions:[], views:[], requestError`.
Atribut: `data-barba-prevent` (`self` | `all` untuk anak-anaknya), `data-barba-history="replace"`.

## Knob yang menentukan rasa gerak
- **Resolusi transisi** (prioritas): kondisi `custom()` > `route` > `namespace`, lalu keyword `from+to` > `to` > `from`,
  lalu urutan deklarasi. Pakai `to` (namespace) membuat Barba menunggu halaman → leave tidak bisa mulai instan
  (kecuali `to.route` via @barba/router karena rute diketahui saat klik).
- **`self` transition** (nama ajaib `'self'`) untuk link ke halaman yang sama (`#hash`).
- **`sync`** = overlap vs sekuensial (lihat mental model).
- **`leave` return value** diteruskan ke `enter(data, leaveResult)` → oper state (mis. rect thumbnail yang diklik)
  untuk shared-element manual.
- **@barba/css**: class `.{name|barba}-{once|leave|enter}`, `-active`, `-to` (ala Vue). ⚠️ dari `css.ts`: hanya
  menunggu **`transitionend` pertama** di container (event bubbling dari anak juga ikut, `animation` keyframes TIDAK
  dideteksi; cek `transitionDuration !== '0s'`) → transisi multi-properti beda durasi akan "selesai" di properti
  tercepat. Samakan durasi atau pakai JS. Kode di dalam hook `once/leave/enter` diabaikan (diganti plugin); prefix nama
  hanya dipakai kalau hook kosong itu ada.
- **@barba/prefetch**: IO + `requestIdleCallback`, opsi `root`, `timeout`, `limit` (0 = tanpa batas).
- **@barba/router**: `routes:[{path:'/product/:id', name:'item'}]` (path-to-regexp) → kondisi `route`, `data.next.route.params`.

## Integrasi (pola modern — dokumen "Third-party" Barba masih Lenis 1.0.42/Locomotive v4, usang)
**Lenis (instance tunggal, window) + GSAP ScrollTrigger + scroll reset:**
```js
const lenis = new Lenis({ autoRaf:false, stopInertiaOnNavigate:true, anchors:true })
lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)
history.scrollRestoration = 'manual'

barba.hooks.before(() => lenis.stop())                       // kunci input selama transisi (.lenis-stopped)
barba.hooks.afterLeave(() => ScrollTrigger.getAll().forEach(t => t.kill()))   // bunuh trigger halaman lama
barba.hooks.beforeEnter(({ current }) => {
  current.container.remove()                                 // opsional: hindari tinggi ganda saat enter
  lenis.scrollTo(0, { immediate: true, force: true })         // force: jalan walau stopped
})
barba.hooks.after(() => { lenis.resize(); lenis.start(); ScrollTrigger.refresh() })  // limit Lenis basi 250 ms → resize
```
Kenapa `refresh()` di `after`: container baru di-append **di bawah** container lama; posisi start/end trigger yang dihitung
saat dua container masih ada akan bergeser setinggi container lama.
- **Back/forward restore**: Barba menyimpan `barba.history.current.scroll {x,y}` (dari `window.scrollX/Y`, akurat
  dengan Lenis karena native) → di `leave` simpan, setelah enter `lenis.scrollTo(y, {immediate:true, force:true})`
  bila `data.trigger === 'back'`.
- **Locomotive v5**: `loco.removeScrollElements(current.container)` di `afterLeave`, `loco.addScrollElements(next.container)`
  di `afterEnter`, `loco.resize()` di `after`.
- **Analytics**: `barba.hooks.after(() => gtag('event','page_view',{page_location: location.href}))`.
- **WordPress body class**: `beforeEnter: ({next}) => body.className = next.html.match(/<body.+?class="([^"]*)"/i)?.[1] ?? ''`.

## Resep non-generik
1. **Curtain wipe dengan `leaveResult` → `enter`** (sekuensial, menyamarkan fetch)
```js
{ name: 'curtain', async leave() {
    await gsap.to('.curtain', { scaleY: 1, transformOrigin: 'bottom', duration: .6, ease: 'power4.inOut' }) },
  async enter({ next }) {
    gsap.set(next.container, { autoAlpha: 1 })
    await gsap.to('.curtain', { scaleY: 0, transformOrigin: 'top', duration: .7, ease: 'power4.inOut' })
    gsap.from(next.container.querySelectorAll('[data-reveal]'), { yPercent: 100, stagger: .06, duration: .9, ease: 'expo.out' }) } }
```
Kenapa mahal: origin berpindah bottom→top = tirai "lewat", bukan sekadar menutup-membuka; stagger konten baru dimulai
saat tirai masih bergerak (overlap).

2. **Arah transisi per rute** — `{name:'next', from:{custom: ({trigger}) => trigger?.dataset?.dir === 'next'}}` vs `'prev'`,
   atau `data.trigger === 'back'` untuk membalik arah slide pada tombol back browser.
   Kenapa mahal: navigasi punya geografi (maju = kanan, mundur = kiri).

3. **Shared element manual (thumbnail → hero)**: di `leave` ukur `trigger.querySelector('img').getBoundingClientRect()`,
   return rect; di `enter(data, rect)` set hero baru ke rect itu lalu FLIP ke posisi akhir (GSAP Flip atau transform
   manual). Alternatif modern: `document.startViewTransition` + `view-transition-name` (lihat view-transitions/NOTES).

4. **Sync crossfade bertumpuk**: `sync:true` + CSS `[data-barba="wrapper"]{display:grid} [data-barba="container"]{grid-area:1/1}`
   (dua container menumpuk tanpa absolute) lalu `leave`/`enter` timeline paralel.

## Performa, aksesibilitas, mobile & browser
- Skrip inline halaman baru **tidak** dieksekusi ulang → init per halaman di `views` / hook.
- Fokus & pengumuman screen reader tidak diurus otomatis (CHANGELOG 2.10: cegah AT membaca seluruh halaman) → di
  `after`: pindahkan fokus ke `h1` (`tabindex=-1`) dan update `document.title` (otomatis dari HTML berikutnya).
- Reduced motion: cek `matchMedia('(prefers-reduced-motion: reduce)')` dan pakai transisi crossfade pendek / `sync` 0 s.
- Polyfill: jangan pakai polyfill.io (docs mengingatkan supply-chain attack).

## Sumber lokal
- `web/getstarted__lifecycle.md`, `web/advanced__hooks.md` — urutan hook & data argument.
- `web/advanced__transitions.md` — rules, priority, self, sync.
- `web/advanced__views.md`, `web/advanced__strategies.md` — views, cache, prefetch, prevent, history.
- `web/advanced__recipes.md` — containers, scroll position, requestError, timeout, partial output.
- `web/advanced__third-party.md` — GA/Locomotive/Lenis/ScrollTrigger/WordPress (sebagian usang).
- `web/plugins__{css,prefetch,router,head,preset}.md` — plugin.
- `web/api/interfaces__core_src_defs.ibarbaoptions.md`, `web/api/classes__core_src.core.md` — API Core.
- `repo-barba/packages/core/src/modules/Transitions.ts` — urutan hook nyata (doOnce/doPage).
- `repo-barba/packages/core/src/core.ts` — go/force/preventRunning.
- `repo-barba/packages/css/src/css.ts` — perilaku transitionend.
- `repo-barba/packages/*/CHANGELOG.md` — versi & fitur 2024.
