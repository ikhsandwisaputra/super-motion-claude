---
tool: Variable fonts (CSS font-variation-settings + registered axes)
version: "CSS Fonts 4. font-variation-settings = Baseline widely (Chrome 62 / FF 62 / Safari 11); font-optical-sizing = Baseline widely (79 / 62 / 13.1); properti baru font-width (alias font-stretch) baru FF 155 + Safari 18.4, Chrome belum. Axis registry googlefonts/axisregistry @a6f6f2f (2026-09-07). Dicek ke BCD/web-features 2026-10-28."
official: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts · https://fonts.google.com/knowledge · https://github.com/googlefonts/axisregistry
local: ../../_shared/mdn-content/files/en-us/web/css/guides/fonts/variable_fonts/index.md · repo-axisregistry/Lib/axisregistry/data/ · repo-google-fonts/cc-by-sa/knowledge/
fetched: 2026-10-28
---
# Variable fonts — tipografi yang "bernapas": axis font dianimasikan sebagai bahan gerak

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk feedback mikro yang terasa fisik (hover/press menebal, link "mengembang"), headline yang
  bernapas, distorsi berbasis scroll (velocity → `wdth`/`slnt`), cursor proximity per-huruf (butuh split, lihat
  `../splittype/NOTES.md` / `../splitting/NOTES.md`), dan axis ekspresif (MORF, EDPT, SHLN, YEAR, ROND...).
- **Jangan** animasikan `wght`/`wdth` di paragraf body: lebar glyph berubah → line break bergeser → jitter. Pakai
  `GRAD` (grade) atau font *multiplexed* (Recursive) yang lebarnya tetap. Hover jangan lama: Google Knowledge
  menyebut "even one-second animations can feel tedious for quick hover interactions".
- Axis yang tidak ada di font **diabaikan diam-diam**, browser tidak boleh mensintesis (spec CSS Fonts 4).
- Butuh sequencing/physics? Tween custom property-nya pakai GSAP/Motion/anime (`03-choreography`); butuh
  pemetaan posisi scroll tanpa JS? pakai scroll-driven animations (`../../08-css-svg-native/scroll-driven-animations`).

## Mental model (yang memengaruhi FEEL & performa)
- 5 axis **registered** (huruf kecil) punya properti high-level: `wght`→`font-weight` (1–1000), `wdth`→
  `font-stretch` (%), `slnt`→`font-style: oblique <angle>`, `ital`→`font-style: italic`, `opsz`→
  `font-optical-sizing` (default `auto` = opsz mengikuti font-size). Axis **custom** = HURUF BESAR, hanya lewat
  `font-variation-settings`. Tag case-sensitive.
- `font-variation-settings` **menang atas** `font-weight` dkk "no matter where they appear in the cascade" (MDN;
  di sebagian browser hanya bila `@font-face` punya range `font-weight`).
- **Tidak aditif**: set satu tag = semua tag lain kembali default. Computed value = list ter-dedup & tersortir.
  Solusi resmi MDN: tiap axis jadi custom property, deklarasi `font-variation-settings` sekali.
- **Interpolasi** (spec): dua deklarasi hanya beranimasi mulus kalau "like" = himpunan tag sama. Kalau beda,
  nilainya *swap diskrit* di tengah animasi. → selalu tulis set tag yang sama di from/to, atau (lebih baik)
  animasikan custom property ter-registrasi (`@property ... syntax: "<number>"`).
- **Biaya**: ubah `wght`/`wdth`/`opsz` = advance width berubah → layout + paint + raster tiap frame (bukan
  compositor-only). `GRAD` menurut registry "without any changes overall width, line breaks or page layout" →
  tanpa reflow (masih repaint). Font multiplexed (contoh Google Knowledge: Recursive) juga menjaga lebar.
- `transform: scale()` **tidak** mengubah opsz (font-size tetap) → teks yang di-zoom besar terlihat "body-text"
  (terlalu tebal/longgar). Set `"opsz"` manual ke ukuran render akhir.
- Mapping `slnt` ↔ oblique: Google Fonts menyajikan Recursive (`slnt -15..0`) sebagai
  `font-style: oblique 0deg 15deg` (tes API 2026-10-28) → `oblique 10deg` setara `"slnt" -10`.

## Setup minimal (terverifikasi)
```css
/* Self-host: deklarasikan RANGE, bukan satu nilai */
@font-face {
  font-family: "Roboto Flex";
  src: url("/fonts/RobotoFlex.woff2") format("woff2");
  font-weight: 100 1000;
  font-stretch: 25% 151%;
  font-display: swap;
}
/* Satu custom property per axis → tidak ada masalah "reset tag lain" */
@property --wght { syntax: "<number>"; inherits: true; initial-value: 400; }
@property --wdth { syntax: "<number>"; inherits: true; initial-value: 100; }
@property --grad { syntax: "<number>"; inherits: true; initial-value: 0; }
.vf {
  font-family: "Roboto Flex", system-ui, sans-serif;
  font-variation-settings: "wght" var(--wght), "wdth" var(--wdth), "GRAD" var(--grad);
  transition: --wght .22s cubic-bezier(.2,.8,.2,1), --grad .22s;
}
.vf:hover { --wght: 720; }
```
```html
<!-- Google Fonts: range pakai "..". Tanpa range = instance statis -->
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto+Flex:GRAD,opsz,wdth,wght@-200..150,8..144,25..151,100..1000&display=swap">
```
- Docs CSS2 API: "List axes alphabetically (en-US locale)", tuple diurutkan numerik, range tidak boleh
  overlap/bersentuhan. (Tes 2026-10-28: urutan lain pun dijawab HTTP 200, tapi ikuti docs.) Artikel Knowledge
  bilang "uppercase axes first" — itu bertentangan dengan docs API; pegang docs API.
- Axis yang tidak ada di Google Fonts Axis Registry "will not function via our API" (README axisregistry).
- **Per-huruf**: `font-variation-settings` yang ter-*inherit* sudah berupa computed list → mengubah `--wght` di
  `.char` tidak berefek kecuali `.char` juga mendeklarasikan `font-variation-settings: ... var(--wght)`.
  Karena itu `inherits: true` di atas: char mewarisi nilai parent kecuali di-override.

## Knob yang menentukan rasa gerak
| Knob | Efek ke feel | Rentang bagus |
|---|---|---|
| `wght` delta | "tekanan" / ketegasan | ±150–350 untuk hover; 100→900 untuk drama |
| `GRAD` | tebal visual tanpa reflow → tactile press di teks paragraf | Roboto Flex −200..150; Roboto Serif −50..100 |
| `wdth` | squash & stretch (kartun / kecepatan) | 75–125% aman dibaca; 25–151 (Roboto Flex) ekstrem |
| `slnt` | momentum / condong saat melaju | −10..0 (Roboto Flex), −15..0 (Recursive) |
| `opsz` | detail kontras: kecil = robust, besar = halus | samakan dengan px render |
| Durasi hover | 150–250 ms; >600 ms terasa lamban (Knowledge) | |
| Easing | press: ease-out cepat; release: spring `linear()` (lihat `../../08-css-svg-native/css-modern-motion`) | |
| Falloff jarak kursor | radius 160–320px, kurva `t*t` (lebih "magnetik") | |

### Daftar font ekspresif terverifikasi (axis & range dari `repo-google-fonts/ofl/*/METADATA.pb`)
| Font | Axis (min..max) | Cocok untuk |
|---|---|---|
| Roboto Flex | GRAD −200..150, XOPQ 27..175, XTRA 323..603, YOPQ 25..135, YTAS 649..854, YTDE −305..−98, YTFI 560..788, YTLC 416..570, YTUC 528..760, opsz 8..144, slnt −10..0, wdth 25..151, wght 100..1000 | segala hal; parametric axes |
| Google Sans Flex | ROND 0..100, opsz 1..144, slnt −10..0, wdth 25..151, wght 1..1000 | UI ekspresif, roundness |
| Recursive | CASL 0..1, CRSV 0..1, MONO 0..1, slnt −15..0, wght 300..1000 | multiplexed hover, casual↔linear |
| Fraunces | SOFT 0..100, WONK 0..1, opsz 9..144, wght 100..900 | serif "lembek" bouncy |
| Shantell Sans | BNCE −100..100, INFM 0..100, SPAC 0..100, wght 300..800 | tulisan tangan yang "memantul" |
| Honk | MORF 0..45, SHLN 0..100 | morph + shadow length (color font) |
| Kablammo | MORF 0..60 | morph kartun |
| Nabla | EDPT 0..200, EHLT 0..24 | ekstrusi 3D (color font) |
| Climate Crisis | YEAR 1979..2050 | storytelling: huruf "meleleh" seiring scroll |
| Wavefont | ROND 0..100, YELA −100..100, wght 4..1000 | audio bars/visualizer dari font |
| Tilt Warp / Tilt Prism | XROT −45..45, YROT −45..45 | tilt 3D ikut kursor |
| Sixtyfour / Workbench | BLED 0..100, SCAN −53..100 | CRT bleed / scanline |
| Handjet | ELGR 1..2, ELSH 0..16, wght 100..900 | grid/elemen modular |
| Bitcount | CRSV 0..1, ELSH 0..100, ELXP 0..100, slnt −8..0, wght 100..900 | pixel/LED |
| Commissioner | FLAR 0..100, VOLM 0..100, slnt −12..0, wght 100..900 | flare serif |
| Science Gothic | CTRS 0..85, slnt −10..0, wdth 50..200, wght 100..900 | kontras & lebar ekstrem |
| Bricolage Grotesque | opsz 12..96, wdth 75..100, wght 200..800 | grotesk editorial |
| Playfair (2) | opsz 5..1200, wdth 87.5..112.5, wght 300..900 | display serif opsz ekstrem |
| Anybody | wdth 50..150, wght 100..900 | squash/stretch |
| Mona Sans / Hubot Sans | wdth 75..125, wght 200..900 | |

## Integrasi
- **Lenis** (velocity): event `scroll` memberi instance Lenis yang punya `velocity` (README Lenis, lihat
  `../../01-scroll-transitions/lenis/repo-lenis/README.md`):
  `lenis.on('scroll', (l) => document.documentElement.style.setProperty('--vel', Math.min(Math.abs(l.velocity), 60)))`.
- **GSAP**: `gsap.to(el, { '--wght': 900, duration: .6, ease: 'expo.out' })` (tween custom property).
  Per-char butuh split (`../splittype/NOTES.md`). Setelah split, panggil ulang pengukuran saat `document.fonts.ready`.
- **CSS scroll-driven**: animasikan `--wght/--wdth` via `@keyframes` + `animation-timeline: view()` (custom
  property tidak jalan di compositor — tetap main thread, tapi tanpa JS).
- **Splitting.js**: `--char-index`/`--char-total` langsung bisa jadi input axis di `calc()`.

## Resep non-generik
**1. Velocity squash — headline memipih & condong saat scroll cepat**
```js
let last = scrollY, v = 0;
(function loop() {
  const y = scrollY; v += ((y - last) - v) * 0.15; last = y;          // low-pass → terasa berbobot
  document.documentElement.style.setProperty('--vel', Math.min(Math.abs(v), 60).toFixed(2));
  requestAnimationFrame(loop);
})();
```
```css
.speedo { font-variation-settings:
  "wdth" clamp(25, calc(100 - var(--vel, 0) * 1.2), 151),
  "slnt" calc(var(--vel, 0) * -0.16),          /* 60 → -9.6, masih dalam −10..0 Roboto Flex */
  "wght" calc(500 + var(--vel, 0) * 6); }
```
Kenapa mahal: low-pass bikin teks "terseret inersia", bukan meloncat mengikuti scroll mentah.

**2. Cursor proximity per huruf (setelah split jadi `.char`)**
```js
const chars = [...document.querySelectorAll('.prox .char')];
let centers = [];
const measure = () => centers = chars.map(c => { const r = c.getBoundingClientRect();
  return [r.left + scrollX + r.width / 2, r.top + scrollY + r.height / 2]; });
document.fonts.ready.then(measure); addEventListener('resize', measure);
let px = -1e5, py = -1e5, raf = 0;
addEventListener('pointermove', e => { px = e.pageX; py = e.pageY; raf ||= requestAnimationFrame(tick); });
function tick() {
  raf = 0;
  chars.forEach((c, i) => {
    const t = Math.max(0, 1 - Math.hypot(px - centers[i][0], py - centers[i][1]) / 240);
    c.style.setProperty('--wght', (300 + t * t * 600).toFixed(0));   // t² = tarikan magnetik
  });
}
```
```css
.prox .char { display: inline-block; font-variation-settings: "wght" var(--wght), "GRAD" var(--grad); }
```
Kenapa mahal: kurva t² + radius besar membuat "gelombang tekanan" mengikuti jari, bukan highlight biner.
Ukur di bobot dasar saja (pusat glyph bergeser saat menebal; ukur ulang tiap frame = layout thrash).

**3. Gelombang napas per-index tanpa JS (Splitting `--char-index`, atau `sibling-index()`)**
```css
@keyframes breathe { 50% { --wght: 900; --wdth: 75; } }
.wave .char {
  font-variation-settings: "wght" var(--wght), "wdth" var(--wdth);
  animation: breathe 1.8s cubic-bezier(.45,0,.55,1) infinite;
  animation-delay: calc(var(--char-index) * -90ms);   /* delay negatif = sudah "di tengah" saat load */
}
```
`sibling-index()` (Chrome 138 / FF 154 / Safari 26.2, Baseline newly 2026-08-18) bisa ganti `--char-index`,
tapi hitungannya per parent — kalau char dibungkus `.word`, index restart tiap kata.

**4. Scroll position → axis, CSS murni**
```css
@keyframes melt { from { --wght: 900; --wdth: 151 } to { --wght: 200; --wdth: 25 } }
.hero-word { font-variation-settings: "wght" var(--wght), "wdth" var(--wdth);
  animation: melt linear both; animation-timeline: view(); animation-range: cover 15% cover 55%; }
```
Kenapa mahal: kata "meleleh" persis terikat posisi scroll, reversible gratis saat scroll balik.

**5. Press yang tidak menggeser layout (GRAD + opsz koreksi)**
```css
.btn { font-variation-settings: "GRAD" var(--grad), "opsz" 16; transition: --grad .12s ease-out; }
.btn:active { --grad: 150; transition-duration: .05s; }
```

## Performa, aksesibilitas, mobile & dukungan browser
- Animasi axis = re-raster teks tiap frame. Batasi ke headline/beberapa kata; per-char >~200 elemen + per-frame
  `setProperty` = berat di HP. Isolasi elemen dalam container lebar tetap (saran Google Knowledge) agar
  pergeseran tidak menular ke layout sekitarnya; atau pakai axis non-reflow (GRAD/multiplexed).
- Selalu kirim `.woff2` (Knowledge: semua browser variable-font mendukung woff2). Tiap axis menambah ukuran
  file; minta hanya range yang dipakai ke Google Fonts.
- `@media (prefers-reduced-motion: reduce)`: hentikan loop rAF & animasi infinite, set nilai axis statis yang
  tetap ekspresif (bentuk huruf tetap unik tanpa gerak).
- Mobile: tidak ada hover → pindahkan efek ke scroll/press (`@media (hover: none)`), atau gyro (lihat kategori sensory).
- Dukungan (BCD 2026-10-28): `font-variation-settings` Chrome 62 / FF 62 / Safari 11; `font-optical-sizing` 79 /
  62 / 13.1; `@property` 85 / 128 / 16.4 (Baseline 2024-07-09); `font-width` property hanya FF 155 + Safari 18.4
  → tetap pakai `font-stretch`; descriptor `@font-face { font-variation-settings }` Chrome 140, FF 62, Safari belum.

## Sumber lokal
- `../../_shared/mdn-content/files/en-us/web/css/guides/fonts/variable_fonts/index.md` — registered vs custom, GRAD tanpa reflow, trik custom property.
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/font-variation-settings/index.md` — override cascade, aturan tag.
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/font-optical-sizing/index.md` · `../../_shared/mdn-content/files/en-us/web/css/reference/properties/font-weight/index.md` · `../../_shared/mdn-content/files/en-us/web/css/reference/properties/font-stretch/index.md` · `../../_shared/mdn-content/files/en-us/web/css/reference/properties/font-width/index.md`
- `repo-google-fonts/cc-by-sa/knowledge/modules/using_variable_fonts_on_the_web/lessons/interactive_animations_with_variable_fonts/content.md` — hover, multiplexed, grade.
- `repo-google-fonts/cc-by-sa/knowledge/modules/using_variable_fonts_on_the_web/lessons/factors_that_influence_the_efficiency_of_variable_web_fonts/content.md` — biaya file per axis.
- `repo-google-fonts/cc-by-sa/knowledge/modules/using_type/lessons/{loading_variable_fonts_on_the_web,styling_type_on_the_web_with_variable_fonts,introducing_parametric_axes}/content.md`
- `repo-google-fonts/cc-by-sa/knowledge/glossary/terms/*_axis/content.md` — definisi tiap axis custom.
- `repo-google-fonts/ofl/robotoflex/METADATA.pb` (pola `ofl/<family>/METADATA.pb`) — axis & range resmi 38 family ekspresif.
- `repo-axisregistry/README.md` + `repo-axisregistry/Lib/axisregistry/data/*.textproto` — 58 axis, min/default/max, deskripsi.
- `web/google-fonts-css2-api.md` — aturan URL CSS2 API (range `..`, urutan axis, tuple).
- `../../08-css-svg-native/_compat/repo-web-features/features/font-variation-settings.yml.dist` (+ font-optical-sizing, font-width, registered-custom-properties).
