---
tool: SplitType (+ perbandingan GSAP SplitText, anime.js splitText, Motion+ splitText, Splitting.js)
version: "split-type 0.3.4 (npm 2023-10-22; push terakhir repo 2023-12-03, tidak di-archive, 29 issue terbuka → praktis dorman). Pembanding: gsap 3.15.0 (2026-04-13, SplitText rewrite di 3.13.0), animejs 4.5.0 (2026-06-22; splitText sejak 4.1.0, subpath 'animejs/text' sejak 4.2.0), Motion+ splitText (paywall, versi [UNVERIFIED]), splitting 1.1.0 (2024-05-31)."
official: https://github.com/lukePeavey/SplitType · https://gsap.com/docs/v3/Plugins/SplitText/ · https://animejs.com/documentation/text/splittext · https://motion.dev/docs/split-text
local: repo-SplitType/ · repo-gsap-splittext/src/SplitText.ts · repo-animejs-text/src/text/split.js · web/
fetched: 2026-10-28
---
# SplitType & kawan-kawan — memecah teks jadi line/word/char agar tiap unit bisa dikoreografikan

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
**Status jujur SplitType:** rilis terakhir 0.3.4 (Okt 2023), tanpa aria, tanpa auto re-split, tanpa mask.
Masih jalan (vanilla, ISC, kecil), tapi untuk proyek baru 2026 pilih sesuai stack:

| Kebutuhan | Pilih |
|---|---|
| Stack GSAP / butuh reveal ber-mask + responsif + a11y bawaan | **GSAP SplitText** (gratis termasuk komersial sejak Webflow; standalone tanpa core) |
| Stack anime.js / teks CJK-Thai (Intl.Segmenter) / efek "roll" duplikat | **anime.js `splitText`** (+ `scrambleText`) |
| Stack Motion & punya Motion+ | **Motion+ `splitText`** (0.7kb, `motion-plus`, berbayar) |
| Animasi murni CSS dari index (stagger via `calc`) | **Splitting.js** (`../splitting/NOTES.md`) atau `sibling-index()` |
| Proyek lama sudah pakai SplitType | biarkan; tambahkan a11y & re-split manual (resep 3–4) |

Jangan split kalau efeknya bisa level elemen (fade satu paragraf) — tiap span = node DOM + style recalc.
Jangan split body text panjang per-char.

## Mental model (yang memengaruhi FEEL & performa)
- Split = ganti teks dengan wrapper (`div`/`span`) `inline-block`/`block`. Transform tidak jalan di elemen
  inline murni (catatan GSAP); GSAP `tag: "span"` **tidak** di-set `display/position` oleh source → set sendiri.
- **Lines** ditentukan layout saat itu → basi begitu lebar berubah atau webfont selesai load. Words/chars relatif
  ikut reflow; lines & mode `absolute` (SplitType) tidak.
- Kerning hilang antar span → huruf bergeser sedikit: `font-kerning: none` (SplitType README; GSAP menambah
  `text-rendering: optimizeSpeed`). GSAP: hindari `text-wrap: balance`; SplitText tidak untuk SVG `<text>`.
- Pembeda utama 2026 = **a11y** dan **lifecycle re-split** (animasi harus dibuat ulang setelah re-split).

| | SplitType 0.3.4 | GSAP SplitText 3.15 | anime.js splitText 4.5 | Motion+ splitText |
|---|---|---|---|---|
| Unit | lines/words/chars | lines/words/chars | lines/words/chars | chars/words/lines |
| Mask/clip wrapper | – | `mask: "lines"\|"words"\|"chars"` (wrapper `overflow: clip`, array `masks`) | `wrap: 'clip'` (atau overflow lain) per unit | [UNVERIFIED] |
| A11y | **tidak ada** (tak ada aria di source) | `aria: "auto"` (default): `aria-label`=textContent di parent + `aria-hidden` di anak; `"hidden"`/`"none"` | `accessible: true` (default): clone HTML asli visually-hidden + `aria-hidden` di split | "applies ARIA" (detail paywalled) |
| Re-split resize/font | manual `instance.split()` | `autoSplit: true` → ResizeObserver (debounce 200ms) + `fonts` `loadingdone`; `onSplit()` return tween = progress disinkronkan | otomatis untuk lines (fonts.ready + lebar berubah); `split.addEffect()` menjaga animasi | manual `document.fonts.ready` |
| Index ke CSS | class saja | `propIndex: true` → `--char/--word/--line` (mulai 1) | `data-line/word/char` (mulai 0) | – |
| Word segmentation | spasi | spasi / `wordDelimiter` RegExp / `prepareText` | **Intl.Segmenter** (JP/ZH/TH...) + grapheme | [UNVERIFIED] |
| Emoji | regex unicode (gaya lodash) | ya | grapheme Segmenter | [UNVERIFIED] |
| Nested `<a>/<em>` | dipertahankan (tidak cocok dg lines) | `deepSlice` memotong nested lintas line | nested diduplikasi per line | [UNVERIFIED] |
| Revert | `revert()`, `SplitType.revert(t)` | `revert()`, `onRevert` | `revert()`, `refresh()` | [UNVERIFIED] |

## Setup minimal (API terverifikasi)
```js
// SplitType
import SplitType from 'split-type';
const st = new SplitType('#title', { types: 'lines, words, chars', tagName: 'span' }); // default types = semua
st.lines; st.words; st.chars;  st.split();  st.revert();

// GSAP SplitText (3.13+)
import { gsap } from 'gsap'; import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);
const s = SplitText.create('.split', { type: 'lines,words', mask: 'lines', autoSplit: true,
  onSplit: (self) => gsap.from(self.lines, { yPercent: 105, stagger: 0.08, duration: 0.9, ease: 'expo.out' }) });
// s.revert()

// anime.js 4.x
import { splitText, animate, stagger } from 'animejs';           // atau 'animejs/text'
const split = splitText('p', { lines: true, words: { wrap: 'clip' }, chars: true });
split.addEffect(({ words }) => animate(words, { y: ['100%', '0%'], delay: stagger(40) }));
// split.revert()

// Motion+ (butuh token Motion+)
import { splitText } from 'motion-plus'; import { animate, stagger } from 'motion';
document.fonts.ready.then(() => { const { chars } = splitText('h1');
  animate(chars, { opacity: [0, 1], y: [10, 0] }, { delay: stagger(0.05) }); });
```
```css
.split-target { font-kerning: none; }      /* cegah geser saat split/revert */
```

## Knob yang menentukan rasa gerak
- **Unit**: chars = ramai/playful; words = editorial; lines + mask = "cetak" mewah. Jangan chars saja tanpa
  words/lines (line break aneh; GSAP `smartWrap: true` kalau terpaksa).
- **Stagger**: 20–40 ms/char, 60–120 ms/word, 80–140 ms/line. Total sequence < ~1.2 s untuk headline.
- **Arah stagger**: dari tengah (`stagger: {from: 'center'}` GSAP / `stagger(…, { from: 'center' })` anime) terasa
  "membuka"; `from: 'random'` terasa organik/glitchy.
- **Jarak masuk dengan mask**: `yPercent: 100–110` (pas di bawah baseline) — lebih dari itu delay terasa kosong.
- **Easing**: masuk `expo.out`/`power4.out`; keluar lebih cepat (≈60% durasi masuk) `power2.in`.

## Integrasi
- **GSAP + ScrollTrigger**: buat tween di `onSplit` (return tween), ScrollTrigger di dalam tween → autoSplit
  me-revert & membuat ulang dengan progress tersinkron. Dalam React: `useGSAP()`/`gsap.context()` (docs).
- **Lenis**: tidak ada interaksi khusus; re-split dipicu lebar, bukan scroll.
- **Variable fonts**: setelah split, tiap `.char` bisa punya `--wght` sendiri (`../variable-fonts/NOTES.md`).
- **View/page transitions (Barba/VT)**: `revert()` sebelum keluar halaman agar DOM bersih.

## Resep non-generik
**1. Line reveal ber-mask yang tahan resize & font swap (GSAP 3.13+)**
```js
SplitText.create('.hero', {
  type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'ln++',
  onSplit: self => gsap.from(self.lines, { yPercent: 110, rotate: 2, transformOrigin: '0 100%',
    duration: 1.1, ease: 'expo.out', stagger: 0.09 })
});
```
Kenapa mahal: baris "muncul dari bawah garis cetak" + rotasi 2° kecil = kesan letterpress, dan tidak rusak saat font datang telat.

**2. Hover roll (duplikat huruf) — anime.js `clone`**
```js
const { chars } = splitText('.roll', { chars: { wrap: 'clip', clone: 'bottom' } });
const hover = animate(chars, { y: '-100%', duration: 450, delay: stagger(18), ease: 'outExpo', autoplay: false });
document.querySelector('.roll').addEventListener('pointerenter', () => hover.restart());
```
`clone: 'bottom'` menaruh salinan di `top: 100%`; geser -100% = huruf lama keluar atas, salinan naik.

**3. SplitType + re-split manual (proyek lama)**
```js
const el = document.querySelector('#t');
const st = new SplitType(el, { types: 'lines, words' });
let w = el.clientWidth, tl = build();
new ResizeObserver(() => { if (el.clientWidth === w) return; w = el.clientWidth;
  tl.kill(); st.split(); tl = build(); }).observe(el);
document.fonts.ready.then(() => { tl.kill(); st.split(); tl = build(); });
function build() { return gsap.from(st.lines, { yPercent: 100, opacity: 0, stagger: .08 }); }
```

**4. A11y yang benar untuk teks berisi link (pola duplikat sr-only)**
```html
<p class="anim" aria-hidden="true">Baca <a href="/x" tabindex="-1">studi kasus</a> kami</p>
<p class="sr-only">Baca <a href="/x">studi kasus</a> kami</p>
```
Untuk GSAP: `aria: 'none'`/`'hidden'` + salinan sr-only (rekomendasi docs). anime.js `accessible: true` sudah
membuat clone visually-hidden otomatis. Catatan [UNVERIFIED di sumber lokal]: ARIA melarang memberi nama
(`aria-label`) ke role generic/paragraph → pola `aria-label` di `<p>/<div>` bisa diabaikan sebagian screen
reader; aman di heading/link/button.

**5. Stagger dari CSS var GSAP (`propIndex`) — tanpa timeline**
```js
SplitText.create('.menu a', { type: 'chars', propIndex: true });
```
```css
.menu a .char { transition: translate .35s cubic-bezier(.2,.9,.2,1); transition-delay: calc((var(--char) - 1) * 18ms); }
.menu a:hover .char { translate: 0 -0.12em; }
```

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Split hanya yang dianimasikan; GSAP: "Splitting thousands of elements can be expensive". `revert()` setelah
  animasi selesai untuk mengurangi node (GSAP & SplitType README menyarankan).
- SEO (GSAP tips): heading yang di-split tetap butuh `aria: "auto"` + meta title/description.
- Reduced motion: jangan split sama sekali, atau tampilkan state akhir (`gsap.set`), atau ganti gerak dengan
  fade opacity singkat. Dengan `gsap.matchMedia()` cabang `(prefers-reduced-motion: reduce)`.
- Flash teks sebelum JS: `visibility: hidden` di container lalu tampilkan saat split (Motion docs) — atau
  `autoAlpha` GSAP.
- Mobile: line split + autoSplit memicu re-split saat orientasi berubah — tweens wajib di `onSplit`/`addEffect`.
- Browser: semua modern; SplitType tidak mendukung IE. anime.js memakai `Intl.Segmenter` bila ada, fallback `split()`.

## Sumber lokal
- `repo-SplitType/README.md` — opsi, revert, nested, absolute vs relative, responsive.
- `repo-SplitType/lib/` (`defaults.js`, `split.js`, `utils/toChars.js`, `repositionAfterSplit.js`) — perilaku nyata.
- `repo-SplitType/__stories__/docs/*.mdx` — docs storybook.
- `web/gsap-splittext.md` — config lengkap 3.13+ (aria, autoSplit, mask, onSplit, propIndex, deepSlice...).
- `repo-gsap-splittext/src/SplitText.ts` + `types/split-text.d.ts` — bukti: mask `overflow: clip`, debounce 200ms, `--char` mulai 1.
- `web/animejs-text/*.md` — settings, split parameters (wrap/clone/class), HTML template, addEffect/refresh/revert, scrambleText.
- `repo-animejs-text/src/text/split.js` + `repo-animejs-text/examples/text/` — Intl.Segmenter, clone aksesibel, ResizeObserver.
- `web/motion-splittext.md` — bagian publik docs Motion+ (sisanya paywall).
