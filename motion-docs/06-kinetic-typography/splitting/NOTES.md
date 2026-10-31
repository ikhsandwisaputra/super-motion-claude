---
tool: Splitting.js
version: "splitting 1.1.0 (npm 2024-05-31; push terakhir repo 2024-06-19, 46 issue terbuka → maintenance minim). MIT."
official: https://splitting.js.org/ · https://github.com/shshaw/Splitting
local: repo-Splitting/src/ · repo-Splitting/dist/splitting.css · web/site/guide.md
fetched: 2026-10-28
---
# Splitting.js — pemecah teks/grid yang menulis INDEX ke CSS variables, supaya koreografi bisa ditulis di CSS

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** kalau mau animasi ditulis di CSS (transition/keyframes) dengan stagger matematis dari
  `--char-index`, `--word-index`, `--line-index`, `--item-index`, `--row-index`, `--col-index`, `--cell-index`
  dan `--*-total`; juga untuk memecah **gambar jadi sel** (`cells` + `image: true`) atau mengindeks grid/children.
- **Jangan** kalau butuh a11y otomatis (tidak ada aria di source), re-split responsif (tidak ada `revert()`
  maupun observer), mask per line, atau CJK word segmentation → pakai GSAP SplitText / anime.js splitText
  (`../splittype/NOTES.md`).
- Alternatif native 2026: `sibling-index()`/`sibling-count()` (Chrome 138 / FF 154 / Safari 26.2) memberi index
  tanpa JS untuk elemen yang sudah ada (bukan untuk memecah teks); index-nya per parent.

## Mental model (cara kerja di balik layar)
- `Splitting()` default: target `[data-splitting]`, plugin `chars` (yang otomatis menjalankan `words`).
- Tiap plugin: buat/kumpulkan elemen → `index()` menulis `--<key>-index` ke tiap item dan `--<key>-total` ke
  target (`src/utils/css-vars.js`). Index mulai **0**. Target diberi class `splitting` + nama plugin.
- `lines` **tidak membuat wrapper baris**: ia mengelompokkan `.word` berdasarkan `offsetTop` dan menulis
  `--line-index` ke tiap word (`src/plugins/lines.js` → `detectGrid`). Jadi tidak ada elemen line untuk di-mask.
- Hasil di-cache di elemen (`el['🍌']`); panggilan kedua mengembalikan cache kecuali `force: true`. Tidak ada
  `revert()` → untuk re-split: kembalikan `innerHTML` asli sendiri lalu `Splitting({ target, by, force: true })`.
- Plugin dependensi: `chars`→`words`; `lines`→`words`; `grid`→`rows`+`cols`; `cells`→`cellRows`+`cellCols`.
- `splitting.css` (opsional, direkomendasikan) menambah variabel turunan dan pseudo-element `::before/::after`
  berisi `attr(data-char)` (default `visibility: hidden`) untuk efek duplikat huruf.

## Setup minimal
```html
<link rel="stylesheet" href="splitting.css">   <!-- dari paket: splitting/dist/splitting.css (+ splitting-cells.css untuk cells) -->
<h1 data-splitting>Kinetic</h1>
<p data-splitting="words">Split by words</p>
<script type="module">
  import Splitting from 'splitting';
  const results = Splitting();                 // [{ el, words, chars }, ...]
  // Splitting({ target: '.x', by: 'lines' }) · Splitting({ target, by: 'chars', whitespace: true })
  // Splitting({ target: '.img', by: 'cells', image: true, rows: 6, cols: 8 })
  // Splitting.html({ content: '<b>hi</b>', by: 'chars' }) → string (untuk template framework)
</script>
```
Output `chars`: `<span class="word" data-word="ABC" style="--word-index:0"><span class="char" data-char="A" style="--char-index:0">A</span>…` dan target `style="--word-total:1; --char-total:3"`.

**Variabel turunan dari `dist/splitting.css`:**
| Var | Rumus | Pakai untuk |
|---|---|---|
| `--char-center` | `(--char-total − 1) / 2` | stagger dari tengah |
| `--char-offset` | `--char-index − --char-center` | arah kiri(−)/kanan(+) |
| `--distance` | `offset² / center` | jarak dari tengah (positif) |
| `--distance-sine` | `offset / center` | −1 kiri … 0 tengah … 1 kanan |
| `--distance-percent` | `distance / center` | 1 di tepi, 0 di tengah |
| `--char-percent` / `--word-percent` / `--line-percent` | `index / total` | gradien posisi 0..1 |

Plugin & opsi: `words`, `chars` (`whitespace`), `lines`, `items` (`matching`), `grid`/`cols`/`rows`
(`matching`, `cols`, `rows`), `cells`/`cellRows`/`cellCols` (`rows`, `cols`, `image`), opsi global `key`.
Catatan: docs bilang `key: 'hero'` → `--hero-char-index`; dari source 1.1.0 (`'-' + key + plugin.key`) hasilnya
tampak berbeda — cek di DevTools sebelum mengandalkan `key` [UNVERIFIED].

## Knob yang menentukan rasa gerak
- **Basis delay**: `calc(var(--char-index) * 30ms)` linear = rapi/mekanis; pakai `--distance` atau
  `--distance-percent` untuk delay non-linear (tengah dulu, tepi menyusul = "mekar").
- **Negatif delay** `calc(var(--char-index) * -80ms)` pada animasi infinite = gelombang sudah berjalan saat load.
- **Arah dari `--distance-sine`**: rotasi/translate X sebanding posisi → huruf "menyebar" simetris.
- **Durasi tetap, delay variabel** > durasi berbeda per huruf (yang kedua terasa acak, bukan ritmis).
- **Total**: jaga `--char-total * step` < ~800 ms untuk headline; untuk teks panjang pakai `--word-index`.

## Integrasi
- **CSS-only**: transition saat parent `.is-in` (dipicu IntersectionObserver, scroll-triggered animation, atau
  `animation-timeline: view()` pada tiap char).
- **GSAP/anime/Motion**: `results[0].chars` adalah array elemen biasa → `gsap.from(chars, {...})`.
- **Variable fonts**: `--char-index` → axis (`../variable-fonts/NOTES.md` resep 3).
- **Framework**: `Splitting.html({ content, by })` untuk string HTML (v-html/dangerouslySetInnerHTML); hati-hati
  hydration & sanitasi konten.

## Resep non-generik
**1. "Bloom" dari tengah (CSS saja)**
```css
.bloom .char { display: inline-block; opacity: 0; translate: 0 .6em;
  transition: opacity .5s, translate .7s cubic-bezier(.2,.9,.2,1);
  transition-delay: calc(var(--distance, 0) * 40ms); }
.bloom.is-in .char { opacity: 1; translate: 0 0; }
```
Kenapa mahal: tengah duluan lalu menyebar ke tepi — terasa seperti napas, bukan mesin ketik.

**2. Kipas simetris dengan `--distance-sine`**
```css
.fan:hover .char { rotate: calc(var(--distance-sine) * 18deg); translate: 0 calc(var(--distance-percent) * -.25em);
  transition: rotate .45s cubic-bezier(.3,1.4,.4,1), translate .45s; }
```
Kenapa mahal: easing overshoot + geometri simetris = huruf "dibuka seperti kartu".

**3. Huruf ganda via pseudo-element (tanpa duplikasi DOM)**
```css
.ghost .char::before { visibility: visible; color: #ff3d6e; translate: 0 100%; transition: translate .4s; }
.ghost .char { overflow: hidden; }
.ghost:hover .char::before { translate: 0 0; transition-delay: calc(var(--char-index) * 25ms); }
```
`splitting.css` sudah memberi `content: attr(data-char)` + `position: absolute` di `::before/::after`.

**4. Gambar pecah jadi sel**
```js
Splitting({ target: '.shatter', by: 'cells', image: true, rows: 6, cols: 8 });
```
```css
.shatter .cell { transition: translate .9s cubic-bezier(.7,0,.2,1), opacity .9s;
  transition-delay: calc((var(--row-index) + var(--col-index)) * 35ms); }
.shatter.out .cell { translate: 0 120%; opacity: 0; }
```
Butuh `splitting-cells.css`: `.cell` = slot `overflow: hidden`, `.cell-inner` = potongan gambar (geser
`.cell-inner` saja = efek "wipe per sel" tanpa sel keluar slot). Helper per sel: `--offset-x/-y`,
`--distance-x/-y`, `--center-x/-y` → delay radial `calc((var(--distance-x) + var(--distance-y)) * 40ms)`.

## Performa, aksesibilitas, mobile & dukungan browser
- Tiap char = 1–2 span; teks panjang × chars = ribuan node. Untuk paragraf gunakan `words`.
- **A11y tidak ada**: tambahkan sendiri — mis. `aria-label` di heading + `aria-hidden="true"` pada span hasil
  split, atau pola salinan sr-only (lihat `../splittype/NOTES.md` resep 4).
- Lines dihitung sekali (offsetTop). Setelah resize/font load, `--line-index` basi → simpan HTML asli, restore,
  `Splitting({ force: true })` di ResizeObserver + `document.fonts.ready`.
- Reduced motion: matikan transition di `@media (prefers-reduced-motion: reduce) { .char { transition: none } }`.
- Browser: core jalan di semua modern (docs: IE11+ dasar); efek bergantung CSS custom properties; cells butuh grid.

## Sumber lokal
- `web/site/guide.md` — guide resmi lengkap: plugin, opsi, return values, `Splitting.html`, `Splitting.add`.
- `repo-Splitting/src/core/splitting.js` — cache `el['🍌']`, `force`, alur plugin.
- `repo-Splitting/src/utils/css-vars.js` — penulisan `--x-index`/`--x-total`.
- `repo-Splitting/src/plugins/*.js` — words/chars/lines/items/grid/cols/rows/cells.
- `repo-Splitting/dist/splitting.css` — variabel turunan (`--distance`, `--distance-sine`, ...) & pseudo chars.
- `repo-Splitting/dist/splitting-cells.css` — setup grid untuk `cells`.
- `repo-Splitting/src/core/types.ts` — tipe opsi.
