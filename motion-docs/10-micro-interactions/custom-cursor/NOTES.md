---
tool: Custom interactive cursor (pola, bukan library)
version: pola; rujukan kanonik Codrops "Custom Cursor Effects" (2019-01-31, repo skaltenegger/customcursor @ 8a30dfc), "Animated Custom Cursor" (codrops/AnimatedCustomCursor 2021), "Gooey Cursor Effect" (2023-06-07, codrops/GooeyCursor @ ca463d0) + MDN Pointer Events/media queries
official: https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/ · https://tympanus.net/codrops/2023/06/07/gooey-cursor-effect/
local: repo-skaltenegger-customcursor/website/src/js/{tutorial,demo1..5}.js · repo-codrops-AnimatedCustomCursor/src/js/cursor*.js · repo-codrops-GooeyCursor/js/cursor.js + css/base.css · web/ · web/mdn-extra/
fetched: 2026-10-28
---
# Custom cursor — kursor yang berubah bentuk sesuai konteks (Play Reel di video, panah di carousel, menempel di nav)

## Kapan pakai / kapan jangan
- **Pakai** di portfolio/agency/gallery dengan sedikit jenis target yang jelas (video, drag area, link proyek); cursor
  jadi "label" yang menjelaskan aksi (`DRAG`, `PLAY`, `VIEW`).
- **Jangan** di produk/form/dokumen (kursor native = affordance teks/klik), di touch (tidak ada kursor), atau jika
  latensi tidak bisa dijaga (cursor yang tertinggal tanpa niat terasa "lag", bukan "mahal").
- Selalu **progressive**: kursor native disembunyikan hanya bila JS aktif dan `(hover: hover) and (pointer: fine)`.

## Mental model
- Dua lapis: **dot** mengikuti 1:1 (latensi nol, presisi) + **ring/blob** mengejar dengan smoothing (massa, karakter).
  Codrops 2019: dot `translate(clientX, clientY)` tiap rAF; ring lerp **0.2**/frame ke kursor (atau ke pusat nav item
  saat "stuck").
- **State** = data attribute pada target (`data-cursor="play" | "drag" | "view"`) dibaca lewat delegasi
  `pointerover`/`pointerout` + `closest('[data-cursor]')` → set `cursor.dataset.state` → CSS menangani ukuran/label/warna
  (transition di CSS, posisi di JS). Pemisahan ini bikin state bisa ditambah tanpa menyentuh loop.
- **Init yang benar** (Codrops cursor.js): cursor `opacity:0` sampai `mousemove` pertama, lalu posisi di-*snap* ke titik
  pertama (prev=current) dan fade-in 0.9 s `power3.out` → tidak ada cursor yang meluncur dari (0,0).
- **mix-blend-mode: difference** pada cursor putih → menginversi warna di bawahnya (terlihat di atas terang & gelap).
  Butuh cursor & konten dalam stacking context yang sama (`position:fixed` di body, jangan dibungkus `isolation:isolate`).
- **Latensi**: `pointermove` sudah ter-coalesce per frame; `pointerrawupdate` (secure context) lebih sering dikirim
  tapi tidak lebih presisi — hanya kalau benar-benar perlu; `getPredictedEvents()` untuk "menggambar di depan".

## Setup minimal (dot + ring + state, frame-rate independent)
```html
<div class="cursor" aria-hidden="true"><div class="cursor__ring"><span class="cursor__label"></span></div><div class="cursor__dot"></div></div>
```
```css
@media (hover: hover) and (pointer: fine) { html.has-cursor, html.has-cursor * { cursor: none } }
.cursor { position: fixed; inset: 0 auto auto 0; pointer-events: none; z-index: 9999; mix-blend-mode: difference; opacity: 0; transition: opacity .4s }
.cursor__dot, .cursor__ring { position: absolute; left: 0; top: 0; translate: -50% -50%; border-radius: 50%; background: #fff }
.cursor__dot { width: 6px; height: 6px }
.cursor__ring { width: 36px; height: 36px; background: transparent; outline: 1px solid #fff;
  transition: width .35s cubic-bezier(.2,.8,.2,1), height .35s cubic-bezier(.2,.8,.2,1), background .25s }
.cursor[data-state="play"] .cursor__ring { width: 96px; height: 96px; background: #fff }   /* label hitam via difference */
.cursor[data-state="play"] .cursor__label::after { content: "Play reel" }
.cursor[data-state="drag"] .cursor__ring { width: 72px; height: 72px }
.cursor[data-state="drag"] .cursor__label::after { content: "← Drag →" }
```
```js
const fine = matchMedia('(hover: hover) and (pointer: fine)'), reduce = matchMedia('(prefers-reduced-motion: reduce)')
if (fine.matches) {
  const root = document.querySelector('.cursor'), dot = root.querySelector('.cursor__dot'), ring = root.querySelector('.cursor__ring')
  document.documentElement.classList.add('has-cursor')
  let mx, my, rx, ry, last = 0, raf = 0
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return
    if (mx === undefined) { rx = e.clientX; ry = e.clientY; root.style.opacity = 1 }   // snap, lalu fade-in
    mx = e.clientX; my = e.clientY
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`                         // 1:1
    if (!raf) raf = requestAnimationFrame(tick)
  }, { passive: true })
  function tick(t) {
    const dt = Math.min((t - (last || t)) / 1000, 1 / 30) || 1 / 60; last = t
    const k = reduce.matches ? 1 : 1 - Math.exp(-13.4 * dt)                       // ≈ lerp 0.2 @60fps
    rx += (mx - rx) * k; ry += (my - ry) * k
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
    raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.1 ? requestAnimationFrame(tick) : (last = 0, 0)
  }
  document.addEventListener('pointerover', (e) => { root.dataset.state = e.target.closest?.('[data-cursor]')?.dataset.cursor ?? '' })
  document.documentElement.addEventListener('pointerleave', () => (root.style.opacity = 0))
  document.documentElement.addEventListener('pointerenter', () => (root.style.opacity = 1))
}
```
NB: `translate: -50% -50%` (properti individual) + `transform` dari JS tidak saling menimpa → pusatkan dengan `translate`,
gerakkan dengan `transform`.

## Knob yang menentukan rasa gerak
| Knob | Efek | Nilai rujukan |
|---|---|---|
| smoothing ring | "massa" kursor | Codrops 2019/2021: lerp 0.2/frame (≈13.4/s). 0.1 terasa malas; dot selalu 1:1 |
| ukuran per state | hirarki aksi | ring 36 → 96 px (play), radius SVG 60 → 100 (AnimatedCustomCursor, lerp 0.2) |
| transisi ukuran | karakter | CSS `cubic-bezier(.2,.8,.2,1)` .35 s; scale cursor ×4 + opacity 0.2 saat hover tombol (MagneticButtons cursor.js) |
| blend | keterbacaan | `difference` (inversi), `exclusion` (lebih lembut), `overlay`/`color-burn` (GooeyCursor theme var) |
| stuck/snap | menempel ke target | lerp 0.2 ke pusat item; polygon scale ×1.08/frame sampai 75 px, kecil lagi ×0.92/frame (Codrops 2019) |
| noise | hidup/organik | simplex noise per titik polygon 8 segmen, `noiseScale 150` (kecepatan), `noiseRange 4` px (Codrops 2019) |

## Integrasi
- **Magnetic** (`../magnetic/NOTES.md`): saat elemen magnetik aktif, ring pindah target ke pusat elemen (stuck) dan
  membesar; dot tetap 1:1.
- **Infinite canvas / carousel**: `data-cursor="drag"` pada area, saat `pointerdown` ganti ke state `dragging`
  (ring mengecil 0.8 → "mencengkeram").
- **Video**: `data-cursor="play"`; klik → buka player; label di dalam ring (teks putih + difference = terbaca di atas video).
- **Lenis**: posisi cursor fixed tidak terpengaruh scroll; tetapi state hover harus di-refresh saat scroll tanpa gerak
  mouse → `lenis.on('scroll', () => root.dataset.state = document.elementFromPoint(mx, my)?.closest('[data-cursor]')?.dataset.cursor ?? '')`.
- **SVG filter** (lihat `../../08-css-svg-native/svg-filters/`): terapkan `filter: url(#f)` hanya selama animasi.

## Resep non-generik
1. **Distorsi turbulensi saat enter (AnimatedCustomCursor 2021)**: `<feTurbulence type="fractalNoise" baseFrequency="0"
   numOctaves="1"/> + <feDisplacementMap scale="30"/>`; timeline 0.4 s menganimasikan `baseFrequency` 0.09 → 0, filter
   dipasang di `onStart` dan **dilepas di `onComplete`**. Kenapa mahal: kursor "beriak" sesaat seperti tetesan air, dan
   biaya filter hanya dibayar 400 ms.
2. **Gooey trail grid (GooeyCursor 2023)**: grid sel (kolom dari CSS var `--columns`), sel di bawah kursor `opacity 1`
   lalu kembali 0 setelah TTL **0.2 s**; wrapper diberi filter `feGaussianBlur stdDeviation 3.2` + `feColorMatrix
   values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -7"` (ambang alpha → metaball), blend `difference/exclusion`;
   filter dimatikan di Firefox (berat). Kenapa mahal: jejak kursor menyatu seperti cairan.
3. **Noisy ring yang menempel ke nav (Codrops 2019, Paper.js)**: saat `mouseenter` link → `stuck = center(link)`; ring
   lerp ke situ, membesar ke 75 px, lalu tiap titik polygon digeser noise (`noise2D(frame/150, i)` dipetakan ±4 px).
   Kenapa mahal: target terasa "dipeluk" kursor dan bernapas.
4. **Label kontekstual yang berputar**: teks melingkar (`<textPath>` pada ring) diputar CSS `rotate` 8 s linear saat
   state `view`. Kenapa mahal: gerak sekunder yang pelan di atas gerak primer yang responsif.

## Performa, aksesibilitas, mobile & browser
- Hanya `transform`/`opacity`; rAF berhenti saat diam; satu listener `pointermove` pasif.
- Jangan sembunyikan kursor native di touch/coarse (`@media (hover:hover) and (pointer:fine)`); `pointer-events:none`
  pada cursor agar klik tembus.
- Teks & link tetap harus punya affordance native (underline/fokus) — cursor custom = dekorasi, bukan satu-satunya sinyal.
- `prefers-reduced-motion`: ring mengikuti 1:1 (k=1), matikan noise/turbulence.
- Elemen `iframe` (YouTube) menelan pointer event → cursor membeku di tepinya; sembunyikan cursor saat masuk iframe
  (`pointerleave` dari wrapper).

## Sumber lokal
- `repo-skaltenegger-customcursor/website/src/js/tutorial.js` — tutorial Codrops 2019 (dot, lerp ring, stuck, noise).
- `repo-skaltenegger-customcursor/website/src/js/demo{1,2,3,4,5}.js` + `repo-skaltenegger-customcursor/website/src/scss/demos/` — 5 varian (gallery, carousel, nav).
- `repo-codrops-AnimatedCustomCursor/src/js/cursor{,2,3,4}.js` + `src/index*.html` — SVG filter cursor (turbulence).
- `repo-codrops-GooeyCursor/js/cursor.js`, `index*.html` (filter `#gooey`), `css/base.css` (blend per tema).
- `web/codrops-2019-01-custom-cursor-effects.md`, `web/codrops-2023-06-gooey-cursor-effect.md` — artikel.
- `web/mdn-extra/css_reference_at-rules__media_{hover,pointer,any-pointer}.md`, `css_reference_properties_cursor.md`,
  `api_element_pointerrawupdate_event.md`.
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/mix-blend-mode/index.md`
- `../../_shared/mdn-content/files/en-us/web/api/pointerevent/{getcoalescedevents,getpredictedevents}/index.md`
