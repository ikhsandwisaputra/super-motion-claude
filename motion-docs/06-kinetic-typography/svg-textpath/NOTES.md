---
tool: SVG <textPath> (+ alternatif CSS offset-path per huruf)
version: "SVG 2 / SVG 1.1 — <textPath> Baseline sejak lama (Chrome 1 / FF 2 / Safari 3.1); startOffset, textLength, method, spacing, href didukung semua; atribut `path` & `side` HANYA Firefox (61+) per BCD 2026-10-28. CSS offset-path: path() Chrome 64 / FF 72 / Safari 16; basic-shape & coord-box Chrome 116 / FF 122 / Safari 18; motion-path Baseline widely (2025-03-12)."
official: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/textPath · https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Motion_path
local: ../../_shared/mdn-content/files/en-us/web/svg/reference/element/textpath/index.md · ../../_shared/mdn-content/files/en-us/web/css/guides/motion_path/index.md
fetched: 2026-10-28
---
# SVG textPath — teks yang mengalir di sepanjang kurva (badge berputar, marquee melengkung, teks "dipandu" scroll)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **`<textPath>`**: teks tetap teks asli (satu node, kerning utuh, bisa diseleksi & dibaca screen reader),
  glyph otomatis diputar mengikuti tangen. Ideal untuk badge melingkar, label pada garis ilustrasi, marquee
  melengkung, teks yang "berjalan" saat scroll.
- **Kelemahan**: `startOffset` adalah **atribut SVG**, bukan properti CSS → tidak bisa di-drive CSS
  transition/animation maupun `animation-timeline: scroll()`/WAAPI. Pilihannya: JS `setAttribute` (scroll,
  pointer) atau SMIL `<animate>` (time-based).
- **CSS `offset-path` per huruf** (HTML span hasil split): tiap huruf jadi elemen di path → bisa di-stagger,
  di-spring, dan di-drive scroll-driven animations CSS. Harga: teks terpecah (urus a11y, lihat
  `../splittype/NOTES.md`), kerning hilang, posisi path dalam koordinat box.
- Butuh elemen non-teks mengikuti path dengan timeline kaya? GSAP MotionPathPlugin / anime `createMotionPath`
  (`../../03-choreography`).

## Mental model
- `<text><textPath href="#p" startOffset="…">…</textPath></text>`; `href` menunjuk `<path>` (MDN: "path or basic
  shape"; dukungan referensi ke `<circle>` dkk lintas browser [UNVERIFIED] → paling aman pakai `<path>`).
- Arah gambar path menentukan sisi: glyph berdiri di sisi kiri arah jalan. Path **searah jarum jam** = teks di
  luar lingkaran; berlawanan = di dalam. `side="right"` (membalik) hanya Firefox.
- `startOffset`: `<length-percentage>` | `<number>`; % = persen panjang path; **negatif dan >100% diizinkan**
  (MDN) → teks bisa masuk/keluar dari luar path. Glyph yang jatuh di luar path tidak digambar (perilaku spec
  SVG; tidak dibahas di MDN lokal) → untuk loop mulus, panjang teks & path harus diatur (resep 3).
- `textLength` + `lengthAdjust="spacing|spacingAndGlyphs"` memaksa teks mengisi panjang tertentu — kunci untuk
  lingkaran yang "menutup" rapi (textLength = 2πr).
- `pathLength` pada path menskalakan semua perhitungan jarak (MDN) → `pathLength="100"` membuat angka
  `startOffset` setara persen. Interaksi pathLength×textPath di semua browser [UNVERIFIED] — `%` lebih aman.
- `method="stretch"` & `spacing="auto"` ada di BCD, tapi efek visualnya jarang terlihat beda — jangan andalkan.
- CSS font (termasuk `font-variation-settings`) berlaku untuk `<text>` → axis variable font bisa dianimasikan
  di teks melengkung (lihat `../variable-fonts/NOTES.md`).

## Setup minimal
```html
<svg viewBox="0 0 200 200" class="badge" role="img" aria-label="Studio Motion Type 2026">
  <defs>
    <!-- lingkaran r=70 di (100,100) dari 2 arc, searah jarum jam mulai dari kiri -->
    <path id="ring" d="M 30,100 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
  </defs>
  <text font-size="13" letter-spacing="1" fill="currentColor">
    <textPath href="#ring" textLength="439.8" lengthAdjust="spacing">STUDIO • MOTION • TYPE • 2026 •</textPath>
  </text>
</svg>
```
textLength 439.8 = 2π·70 → teks pas satu putaran tanpa celah/menumpuk.

## Knob yang menentukan rasa gerak
| Knob | Efek | Catatan |
|---|---|---|
| `startOffset` speed | marquee 40–80 px/s terasa santai; ikut scroll 1:1 terasa "tertambat" | pakai low-pass (lerp 0.1) untuk inersia |
| Kelengkungan path | kurva lebar = terbaca; tikungan tajam = glyph tabrakan | hindari radius < ~2× tinggi huruf |
| `letter-spacing` | buka sedikit di kurva cembung | tikungan cekung butuh spacing lebih |
| Arah path | menentukan sisi & arah baca | balik path, bukan `side` (FF-only) |
| `lengthAdjust` | `spacing` aman; `spacingAndGlyphs` meregang glyph (efek elastis) | |

## Integrasi
- **Lenis / GSAP ScrollTrigger**: hitung progress lalu `textPath.setAttribute('startOffset', …)` di callback
  (Lenis `on('scroll', cb)`; ScrollTrigger `onUpdate: self => self.progress`).
- **Scroll-driven CSS**: tidak bisa ke startOffset; tapi **putar/geser seluruh `<svg>`** dengan
  `animation-timeline: scroll()` (rotate/translate = compositor) — sering sudah cukup untuk badge.
- **Splitting/SplitText + offset-path**: untuk versi HTML per huruf (resep 4).

## Resep non-generik
**1. Badge yang berputar mengikuti scroll (tanpa JS, compositor)**
```css
@keyframes turn { to { rotate: 1turn; } }
.badge { animation: turn linear both; animation-timeline: scroll(root); }
@media (prefers-reduced-motion: reduce) { .badge { animation: none; } }
```
Kenapa mahal: putaran terikat scroll (bukan loop waktu) → terasa seperti roda yang digerakkan user.

**2. Teks mengalir sepanjang kurva saat section lewat (JS, lerp)**
```js
const sec = document.querySelector('#flow'), tp = sec.querySelector('textPath');
let cur = 100, target = 100, raf = 0;
function onScroll() {
  const r = sec.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height))); // 0..1 ≈ range "cover"
  target = 100 - p * 160;                       // masuk dari kanan (100%) sampai -60%
  raf ||= requestAnimationFrame(tick);
}
function tick() {
  cur += (target - cur) * 0.12;                 // inersia
  tp.setAttribute('startOffset', cur.toFixed(2) + '%');
  raf = Math.abs(target - cur) > 0.01 ? requestAnimationFrame(tick) : 0;
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();
```
Kenapa mahal: teks "menyusul" kurva dengan lag halus, bukan menempel kaku ke scrollbar.

**3. Marquee melengkung yang loop mulus (SMIL)**
```html
<path id="wave" d="M0,80 C150,0 250,160 400,80 S650,0 800,80" fill="none"/>
<text font-size="28">
  <textPath href="#wave" startOffset="0%" textLength="1680" lengthAdjust="spacing">
    MOTION • TYPE • MOTION • TYPE • MOTION • TYPE • MOTION • TYPE •
    <animate attributeName="startOffset" from="0%" to="-100%" dur="14s" repeatCount="indefinite"/>
  </textPath>
</text>
```
Aturan: teks = 2 salinan identik, `textLength` = 2 × panjang path (ambil `path.getTotalLength()`, contoh di atas
anggap ≈840), lalu geser startOffset 0% → −100% (−1× panjang path = tepat satu salinan) → frame akhir identik
frame awal. Angka panjang di atas contoh; hitung ulang untuk path-mu.

**4. Versi HTML per huruf dengan `offset-path` (bisa stagger & scroll-driven)**
```css
.ring { position: relative; width: 320px; aspect-ratio: 1; }
.ring .char {
  position: absolute; left: 0; top: 0;
  offset-path: circle(45% at 50% 50%);          /* basic shape, responsif terhadap box */
  offset-distance: calc(var(--char-index) / var(--char-total) * 100%);
  offset-rotate: auto;                           /* ikut tangen; `reverse` = menghadap terbalik */
}
.ring { animation: turn 30s linear infinite; }   /* @keyframes turn dari resep 1; putar container, bukan tiap huruf */
```
(`--char-index/--char-total` dari Splitting.js.) Untuk path terbuka, animasikan `offset-distance` per huruf
dengan `animation-delay: calc(var(--char-index) * 40ms)` → huruf "berbaris" mengikuti jalur.

**5. Hover: teks melengkung "mengencang"**
```js
tp.parentElement.addEventListener('pointerenter', () => tp.setAttribute('lengthAdjust', 'spacingAndGlyphs'));
```
Kombinasikan dengan transisi `letter-spacing` di `<text>` (CSS) untuk efek elastis.

## Performa, aksesibilitas, mobile & dukungan browser
- Mengubah `startOffset` tiap frame = relayout teks SVG + repaint (main thread); masih ringan untuk satu baris.
  Hentikan rAF saat konvergen (resep 2) dan saat section di luar viewport (IntersectionObserver).
- Rotasi `<svg>` utuh via CSS (resep 1) = compositor → paling murah.
- A11y: teks di `<textPath>` tetap terbaca. Kalau isinya dekoratif berulang (marquee), beri `aria-hidden="true"` dan
  sediakan teks biasa; kalau bermakna, `role="img"` + `aria-label` pada `<svg>`.
- Reduced motion: hentikan SMIL dengan menghapus `<animate>`/`svg.pauseAnimations()`, dan matikan scroll binding.
- Dukungan: textPath + startOffset + textLength semua browser; `path=""` inline & `side` Firefox-only;
  offset-path `path()` Chrome 64 / FF 72 / Safari 16; `circle()` & basic shapes di offset-path Chrome 116 / FF 122 /
  Safari 18; SMIL Baseline widely.

## Sumber lokal
- `../../_shared/mdn-content/files/en-us/web/svg/reference/element/textpath/index.md` — atribut lengkap (href, path, side, method, spacing, startOffset, textLength).
- `../../_shared/mdn-content/files/en-us/web/svg/reference/attribute/startoffset/index.md` — nilai negatif/>100% diizinkan.
- `../../_shared/mdn-content/files/en-us/web/svg/reference/attribute/{side,path,pathlength,method,spacing,textlength,lengthadjust}/index.md`
- `../../_shared/mdn-content/files/en-us/web/svg/reference/element/animate/index.md` — SMIL `<animate>`.
- `../../_shared/mdn-content/files/en-us/web/css/guides/motion_path/index.md` + `.../reference/properties/offset-path/index.md` · `offset-distance` · `offset-rotate` · `offset-anchor`
- `../../08-css-svg-native/_compat/repo-browser-compat-data/svg/elements/textPath.json` — bukti `path`/`side` Firefox-only.
- `../../08-css-svg-native/_compat/repo-browser-compat-data/css/properties/offset-path.json` — dukungan per nilai.
