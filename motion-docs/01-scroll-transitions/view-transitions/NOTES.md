---
tool: View Transitions API (same-document, cross-document, element-scoped) + React <ViewTransition>
version: Web platform per 2026-10 (support dari badge BCD di docs Chrome, fetched 2026-10-28). Element-scoped stabil di Chrome 147 (Mar 2026). React <ViewTransition> + addTransitionType STABIL di React 19.3 (2026-09-09).
official: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API · https://developer.chrome.com/docs/web-platform/view-transitions · https://react.dev/reference/react/ViewTransition
local: ../../_shared/mdn-content/files/en-us/web/api/view_transition_api/ · web/chrome/ · web/chrome-css-ui/ · web/chrome-blog/ · web/mdn-extra/ · web/react/ · repo-jakearchibald-simple-vt-demos/public/
fetched: 2026-10-28
---
# View Transitions — browser memotret state lama, kamu ubah DOM, browser menganimasikan snapshot (pseudo-element) ke state baru

## Kapan pakai / kapan jangan
- **Pakai** untuk: shared-element morph (thumbnail → hero), transisi halaman MPA nol-JS (`@view-transition`), reorder
  list/grid, theme toggle circular reveal, transisi state UI (tab, filter) — semuanya di compositor.
- **vs Barba/swup**: VT = mekanisme snapshot native; Barba/swup = router PJAX. swup bisa memakai VT (`native:true`).
  Cross-document VT tak bisa menahan halaman untuk timeline JS panjang (timeout ±4 s di Chrome).
- **vs Motion layout / GSAP Flip**: VT menganimasikan **gambar** (raster snapshot) → teks/elemen di dalamnya tidak
  re-layout per frame (lebih murah, tapi konten "beku" kecuali `::view-transition-new` yang live); FLIP menganimasikan
  elemen nyata (interaktif selama animasi).
- **Jangan** untuk animasi kontinu/scrub panjang tanpa batas (pakai scroll-driven animations / WAAPI), atau bila
  interaksi harus tetap hidup selama transisi document-scoped (seluruh halaman non-interaktif) → pakai element-scoped.

## Mental model
1. `document.startViewTransition(update)` → tangkap snapshot state lama (setiap elemen dengan `view-transition-name`
   jadi kelompok terpisah; sisanya masuk `root`) → **rendering dibekukan** → `update()` (boleh async) → tangkap state
   baru → bangun pohon pseudo di overlay atas halaman:
```
::view-transition
└─ ::view-transition-group(name)          ← animasi transform + width/height dari rect lama ke rect baru
   └─ ::view-transition-image-pair(name)  ← isolation: isolate
      ├─ ::view-transition-old(name)      ← screenshot statis, opacity 1→0
      └─ ::view-transition-new(name)      ← representasi LIVE, opacity 0→1, mix-blend-mode: plus-lighter
```
2. Promise: `updateCallbackDone` (DOM sudah berubah), `ready` (pseudo siap → tempat WAAPI), `finished` (selesai,
   resolve walau di-skip; reject hanya bila update gagal). `skipTransition()` lewati animasi (update tetap jalan).
   `types` (Set-like), `transitionRoot`, `waitUntil(promise)` [experimental] menahan pohon pseudo sampai promise selesai.
3. Nama harus unik per scope → duplikat = `InvalidStateError`/`ready` reject. `match-element` = nama unik otomatis
   (internal, tak bisa dibaca DOM). `view-transition-class` = kelompokkan styling: `::view-transition-group(.card)`.
4. **Old vs new**: old = foto beku (video/animasi di dalamnya terlihat berhenti), new = live. Default group menjaga
   aspek gambar (lebar 100%, tinggi auto) → morph rasio berbeda perlu override (resep 2).
5. **Element-scoped** (`el.startViewTransition()`): pohon pseudo ditempel di elemen itu, hanya subtree itu yang
   dibekukan/tidak interaktif, beberapa transisi bisa **berjalan bersamaan dan bersarang**, popover/fixed di luar tidak
   tertutup, clip `overflow` dihormati. Root otomatis dapat `view-transition-name: root` (self-participating),
   `view-transition-group: contain`, `view-transition-scope: all` (nama tak bocor; elemen tak ditangkap transisi luar).
6. **Nested groups** (`view-transition-group: contain | nearest | normal | <name>` di Chrome 140): pseudo anak masuk
   `::view-transition-group-children(parent)` → bisa di-`overflow: clip`, ikut transform 3D induk.
7. **Cross-document**: opt-in di **kedua** halaman `@view-transition { navigation: auto; types: slide, forwards; }`;
   hanya same-origin, `traverse`, atau `push/replace` yang dipicu konten (bukan address bar/bookmark/reload).
   Event: `pageswap` (halaman lama, sebelum frame terakhir; `e.viewTransition`, `e.activation`) dan `pagereveal`
   (halaman baru, sebelum render pertama). Types tidak terbawa otomatis ke halaman baru → set di `pagereveal`.
   `<link rel="expect" blocking="render" href="#hero">` menahan render pertama sampai elemen ada.

## Setup minimal
```js
function go(update, types = []) {
  if (!document.startViewTransition) return update()           // progressive enhancement
  return document.startViewTransition({ update, types })        // objek {update, types}: Chrome 125+/FF 144/Safari 18
}
```
```css
@view-transition { navigation: auto; }                          /* MPA, di kedua dokumen */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important }
}
```
Debug: DevTools Animations panel (pause & scrub). Selector state: `:active-view-transition`,
`:active-view-transition-type(forwards, backwards)`; `document.activeViewTransition` (Chrome 142, FF 147, Safari 26.2).

## Knob yang menentukan rasa gerak
- **Waktu per pseudo**: `::view-transition-group(x){animation-duration; animation-timing-function}` (posisi/ukuran),
  `-old/-new` (fade/efek). Pisahkan durasi: Jake's shared-axis = old fade-out **90 ms** `cubic-bezier(.4,0,1,1)` +
  new fade-in **210 ms delay 90 ms** `cubic-bezier(0,0,.2,1)`, slide 30 px **300 ms** `cubic-bezier(.4,0,.2,1)` di kedua.
- **Entry/exit**: `::view-transition-new(x):only-child` (masuk), `::view-transition-old(x):only-child` (keluar).
- **Blend**: default `plus-lighter` (crossfade "benar"); `mix-blend-mode: normal` + `animation:none` = foto baru menutup
  yang lama (tidak ada dip opacity).
- **Types** untuk arah maju/mundur, reload, dsb. (`types` di JS, `@view-transition{types}`, atau `e.viewTransition.types.add()`).
- **Scope**: document (default) vs element-scoped (konkuren, halaman tetap interaktif).
- **React 19.3**: props `enter|exit|update|share|default` = `"auto" | "none" | "<class>" | {[type]: value, default}`,
  `name` (hanya untuk shared element), event `onEnter/onExit/onShare/onUpdate(instance, types)` → `instance.old/new/
  group/imagePair/name` (pseudo, bisa `.animate()`), wajib return cleanup. Hanya update di dalam Transition
  (`startTransition`, `<Suspense>` reveal, `useDeferredValue`) yang memicu; jangan panggil `startViewTransition` sendiri
  (React menginterupsi VT lain & mem-batch update yang datang saat VT berjalan). `addTransitionType('forward')` di samping
  setState → `:active-view-transition-type()` / prop objek.

## Integrasi
- **Lenis**: reset scroll **di dalam** update callback agar snapshot baru sudah di atas:
  `document.startViewTransition(() => { render(); lenis.scrollTo(0, { immediate: true, force: true }) })`. Untuk MPA
  aktifkan `stopInertiaOnNavigate:true` supaya inersia tidak terus menggeser halaman lama saat snapshot.
- **swup**: `new Swup({native:true})` (memanggil `document.startViewTransition` di sekitar `renderPage`), fallback CSS
  `html:not(.swup-native)`; swup 4.10 skip animasi history bila `hasUAVisualTransition`.
- **Navigation API router**: di `navigate` → `e.intercept({handler})`; skip VT kalau `!document.startViewTransition ||
  e.hasUAVisualTransition` (gesture back browser sudah menganimasikan — jangan dobel).
- **WAAPI**: `document.documentElement.animate(keyframes, { duration, easing, pseudoElement: '::view-transition-new(root)' })`
  setelah `transition.ready` (`pseudoElement`: `../../_shared/mdn-content/files/en-us/web/api/keyframeeffect/pseudoelement/`).
- **Scroll-driven / rAF-driven**: `transition.waitUntil(promise)` agar pohon pseudo tidak dihancurkan saat animasi CSS
  selesai (MDN: kombinasi dengan ScrollTimeline, rAF, atau pointerdown→pointerup).

## Resep non-generik
1. **Circular reveal dari titik klik (theme toggle / page)**
```js
let last; addEventListener('click', (e) => (last = e), { capture: true })
function reveal(update) {
  if (!document.startViewTransition) return update()
  const x = last?.clientX ?? innerWidth / 2, y = last?.clientY ?? innerHeight / 2
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))   // ke sudut terjauh
  const t = document.startViewTransition(update)
  t.ready.then(() => document.documentElement.animate(
    { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 600, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }))
}
/* CSS: ::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal } */
```
Kenapa mahal: perubahan berasal dari jari user (kausalitas spasial), bukan fade generik.

2. **Thumbnail → hero tanpa distorsi rasio**
```js
thumb.style.viewTransitionName = 'hero'                 // nama sementara HANYA pada yang diklik
document.startViewTransition(() => { thumb.style.viewTransitionName = ''; showDetail() })  // detail img: view-transition-name: hero
```
```css
::view-transition-old(hero), ::view-transition-new(hero) { animation: none; mix-blend-mode: normal; height: 100%; overflow: clip }
::view-transition-old(hero) { object-fit: contain }     /* thumbnail tetap di tengah */
::view-transition-new(hero) { object-fit: cover }       /* gambar penuh "un-crop" 1:1 → 16:9 */
::view-transition-group(hero) { animation-duration: .55s; animation-timing-function: cubic-bezier(.2,.8,.2,1) }
```
Kenapa mahal: gambar tidak gepeng & tidak dip opacity; tanpa menunggu gambar besar loaded (thumb tetap di bawahnya).

3. **Arah maju/mundur dengan types**
```css
html:active-view-transition-type(forwards) { &::view-transition-old(content){animation-name: out-left} &::view-transition-new(content){animation-name: in-right} }
html:active-view-transition-type(backwards){ &::view-transition-old(content){animation-name: out-right} &::view-transition-new(content){animation-name: in-left} }
```
MPA: `pagereveal` → `e.viewTransition?.types.add(navigation.activation.from.index > navigation.activation.entry.index ?
'backwards' : 'forwards')` [logika index: ilustrasi; API `navigation.activation.{from,entry}` terverifikasi docs Chrome].

4. **Reorder list dengan element-scoped + match-element (Chrome 147)**
```css
ul li { view-transition-name: match-element; view-transition-class: item }
::view-transition-group(.item) { animation-timing-function: linear(0, .5 7%, 1 20%, .96 30%, 1 45%, 1) } /* spring-ish */
```
```js
ul.startViewTransition({ update: () => shuffle(ul) })   // MDN: {update, types}; docs Chrome menulis {callback} → [UNVERIFIED]
```
Kenapa mahal: list bergerak dengan pegas sementara sisa halaman (tombol, popover) tetap hidup; dua list bisa
diacak bersamaan.

5. **Gesture-scrubbed page transition (Jake Archibald `public/gesture/`)**: setelah `transition.ready`, ambil
   `document.getAnimations().filter(a => a.effect.pseudoElement?.startsWith('::view-transition'))`, `pause()`, set
   `currentTime` dari jarak drag (clamp ke `duration - 0.001` karena bug akhir animasi), saat lepas `play()` (commit)
   atau `reverse(); play()` (batal). Modern: tahan dengan `transition.waitUntil(dragDone)`.
   Kenapa mahal: transisi halaman mengikuti jari 1:1 seperti app native.

## Performa, aksesibilitas, mobile & dukungan browser (per Okt 2026)
| Fitur | Chrome/Edge | Firefox | Safari |
|---|---|---|---|
| Same-document `startViewTransition` | 111 | 144 | 18 |
| Types + `:active-view-transition(-type)` | 125 | 144 | 18 |
| `view-transition-class` | 125 | 144 | 18.2 |
| `view-transition-name: match-element` | 137 | 144 | 18.4 |
| Cross-document `@view-transition` | 126 | ✗ | 18.2 |
| `pageswap` / `pagereveal` | 124 | ✗ | 18.2 |
| `<link rel=expect blocking=render>` | 124 | ✗ | ✗ |
| Nested groups (`view-transition-group`) | 140 | ✗ | ✗ |
| Element-scoped + `view-transition-scope` | 147 | ✗ | ✗ |
| `document.activeViewTransition` | 142 | 147 | 26.2 |
| `ViewTransition.waitUntil()` | experimental [UNVERIFIED versi] | ? | ? |
- Selama document-scoped VT seluruh halaman **tidak interaktif** dan rendering beku saat update callback → fetch data
  SEBELUM `startViewTransition`; tunggu font maksimal ±100 ms (`Promise.race([document.fonts.ready, wait(100)])`).
- Banyak `view-transition-name` = banyak snapshot (memori GPU) → beri nama hanya elemen yang benar-benar bergerak;
  pasang nama sementara saat klik.
- Reduced motion: matikan animasi pseudo atau ganti crossfade pendek (preferensi "kurangi", bukan "nol").
- React: tidak otomatis menghormati reduced motion — pakai media query sendiri.

## Sumber lokal
- `../../_shared/mdn-content/files/en-us/web/api/view_transition_api/index.md` + `../../_shared/mdn-content/files/en-us/web/api/view_transition_api/{using,using_types,using_element-scoped}/index.md`
- `../../_shared/mdn-content/files/en-us/web/api/viewtransition/` (finished, ready, skiptransition, transitionroot, types, updatecallbackdone, waituntil)
- `../../_shared/mdn-content/files/en-us/web/api/document/startviewtransition/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/guides/view_transitions/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@view-transition/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/view-transition-{name,class,scope}/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/reference/selectors/{_doublecolon_view-transition*,_colon_active-view-transition*}/`
- `web/mdn-extra/` — Element.startViewTransition, activeViewTransition, pageswap/pagereveal(+Event), NavigationActivation, ViewTransitionTypeSet, CSSViewTransitionRule.
- `web/chrome/{index,same-document,cross-document}.md` — panduan resmi Chrome (support badge, resep JS/CSS).
- `web/chrome-css-ui/{element-scoped-view-transitions,nested-view-transition-groups}.md` — fitur 2025–2026.
- `web/chrome-blog/{view-transitions-in-2025,element-scoped-view-transitions}.md` — ringkasan rilis.
- `web/react/{ViewTransition,addTransitionType,startTransition,blog-react-19-3}.md` — React stabil 19.3.
- `repo-jakearchibald-simple-vt-demos/public/{3-shared-axis,7-expanding-image-ratio,circle-transition,gesture,directional-transition,raf,mpa}` — demo kanonik yang dirujuk docs Chrome.
