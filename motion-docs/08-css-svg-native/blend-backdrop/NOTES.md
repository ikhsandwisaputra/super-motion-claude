---
tool: mix-blend-mode, isolation, backdrop-filter (+ "liquid glass" via SVG filter di backdrop-filter)
version: "mix-blend-mode Baseline widely (Chrome 41 / FF 32 / Safari 8; plus-lighter Chrome 100 / FF 99 / Safari 9.1; plus-darker Safari saja); isolation Baseline widely; backdrop-filter Baseline newly 2024-09-16 (Chrome 76 / FF 103 / Safari 18 unprefixed, -webkit- sejak Safari 9). backdrop-filter: url(#svg) → hanya Chromium: Firefox bug 1961378 (NEW), WebKit bug 245510 (NEW; PR diajukan 2026-07/09, belum rilis). Dicek 2026-10-28."
official: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode · https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter · https://kube.io/blog/liquid-glass-css-svg/
local: ../../_shared/mdn-content/files/en-us/web/css/reference/properties/{mix-blend-mode,isolation,backdrop-filter}/index.md · web/kube-liquid-glass-css-svg.md · web/logrocket-liquid-glass-css-svg.md
fetched: 2026-10-28
---
# Blend & backdrop — kursor/teks yang membalik warna, kaca berlapis, dan kaca "cair" yang membiaskan

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **mix-blend-mode**: kursor custom/teks yang otomatis kontras di atas gambar terang-gelap (`difference`),
  cross-fade tanpa "kedip" (`plus-lighter`), duotone/overlay warna (`multiply`, `screen`, `color`).
- **backdrop-filter**: frosted glass (blur/saturate/brightness) untuk nav, modal, kartu di atas konten bergerak.
- **Liquid glass (refraksi)**: `backdrop-filter: url(#filter)` dengan `feDisplacementMap` — **Chromium-only**.
  Untuk refraksi lintas browser butuh WebGL (`../../02-shaders-webgl`).
- **Jangan**: blur besar di area luas yang ikut scroll di HP (mahal), atau blend di atas teks panjang
  (keterbacaan). Jangan bersarangkan kaca di dalam kaca (lihat backdrop root).

## Mental model (yang memengaruhi FEEL & performa)
- `mix-blend-mode` mencampur elemen dengan **backdrop di stacking context yang sama** (MDN). Elemen yang membuat
  stacking context (opacity<1, transform, filter, `isolation: isolate`, `will-change`...) membatasi apa yang bisa
  "terlihat" untuk di-blend. `isolation: isolate` = cara eksplisit mengurung blend di satu komponen.
- `difference` dengan putih: `|bawah − 1|` → membalik warna (hitam↔putih, warna → komplementer). Pastikan yang
  di bawah benar-benar dicat (beri `background` pada html/body/section) — tips praktis, cek di browser.
- `plus-lighter` (MDN): "Useful for cross-fade effects (prevents unwanted blinking when two overlaying elements
  animate their opacity in opposite directions)".
- `backdrop-filter` memfilter piksel *di belakang* elemen **sampai backdrop root terdekat** (MDN). Backdrop root:
  root element, elemen dengan `filter`, `opacity < 1`, mask/clip-path/mask-border, `backdrop-filter`,
  `mix-blend-mode` ≠ normal, atau `will-change` ke salah satunya. → Parent `opacity: .9` atau parent kaca membuat
  blur anak hanya melihat isi parent ("kenapa blur saya tidak kelihatan?").
- Elemen kaca harus semi-transparan (`background: rgb(255 255 255 / .12)`), kalau tidak efek tertutup.
- **Liquid glass** (kube.io): displacement map (gambar R=X, G=Y; 128 = diam) yang dihitung dari profil bezel +
  hukum Snell, dimuat via `feImage`, lalu `feDisplacementMap`; specular highlight = `feImage` kedua di-`feBlend`.
  Ukuran map tidak menyesuaikan elemen otomatis ("backdrop-filter dimensions does not adjust automatically") →
  satu map per ukuran komponen. `scale` boleh dianimasikan untuk fade in/out tanpa menghitung ulang map. Pakai
  `color-interpolation-filters="sRGB"`. Max geser per spec = ±scale/2 (rumus MDN feDisplacementMap).

## Setup minimal
```css
/* 1) Kursor difference */
.cursor { position: fixed; inset: 0 auto auto 0; width: 28px; aspect-ratio: 1; border-radius: 50%;
  background: #fff; mix-blend-mode: difference; pointer-events: none; translate: var(--x) var(--y); }
/* 2) Kaca */
.glass { background: rgb(255 255 255 / .10); border: 1px solid rgb(255 255 255 / .25);
  -webkit-backdrop-filter: blur(16px) saturate(160%); backdrop-filter: blur(16px) saturate(160%); }
/* 3) Kurung blend di satu kartu */
.card { isolation: isolate; }
```
```js
const c = document.querySelector('.cursor');
let x = 0, y = 0, tx = 0, ty = 0;
addEventListener('pointermove', e => { tx = e.clientX - 14; ty = e.clientY - 14; });
(function loop() { x += (tx - x) * .18; y += (ty - y) * .18;          // lag = rasa massa
  c.style.setProperty('--x', x + 'px'); c.style.setProperty('--y', y + 'px'); requestAnimationFrame(loop); })();
```

## Knob yang menentukan rasa gerak
| Knob | Efek | Saran |
|---|---|---|
| Ukuran kursor difference saat hover link | "lensa" yang membesar = magnetik | 28px → 72px, spring/overshoot |
| Lerp kursor | 0.1 berat & mewah; 0.3 responsif | 0.15–0.2 |
| `blur()` radius | 8–12px UI ringan; 20–40px "frosted" tebal (lebih mahal) | |
| `saturate()` di kaca | 140–180% membuat warna di belakang "hidup" | |
| Border/inner highlight | 1px putih 20–30% alpha + gradient = tepi kaca | |
| Displacement `scale` (liquid) | kekuatan refraksi | animasikan 0→target untuk "menyala" |

## Integrasi
- **Kursor + GSAP**: `gsap.quickTo(c, 'x', { duration: .4, ease: 'power3' })` untuk follow halus (lihat
  `../../03-choreography/gsap`). Mix-blend tetap di CSS.
- **Kaca + scroll-driven**: animasikan `--blur` ter-registrasi dari scroll (`../css-property-houdini/NOTES.md`)
  lalu `backdrop-filter: blur(var(--blur))` → nav makin buram saat konten lewat.
- **Liquid glass + React**: kube.io & LogRocket memakai komponen yang membangkitkan map sebagai data URL; filter
  di-*inline* di DOM dan direferensikan `backdrop-filter: url(#id)`.

## Resep non-generik
**1. Teks yang membalik warna di atas foto (judul hero)**
```css
.hero { isolation: isolate; position: relative; }
.hero h1 { color: #fff; mix-blend-mode: difference; position: relative; }
```
Kenapa mahal: judul selalu kontras di area terang maupun gelap foto, tanpa overlay gelap yang mematikan foto.

**2. Kursor yang "menelan" link**
```css
.cursor { transition: width .35s cubic-bezier(.3,1.5,.4,1); }
.cursor.is-link { width: 72px; }
```
```js
document.addEventListener('pointerover', e => c.classList.toggle('is-link', !!e.target.closest('a, button')));
```
Overshoot easing = lensa memantul. (Ingat geser offset `--x/--y` setengah ukuran baru agar tetap terpusat.)

**3. Cross-fade tanpa kedip**
```css
.stack > img { position: absolute; inset: 0; mix-blend-mode: plus-lighter; transition: opacity .6s; }
```

**4. Kaca berlapis yang benar (sibling, bukan nested)**
```html
<div class="layer-bg"></div>
<nav class="glass">…</nav>          <!-- jangan taruh .glass di dalam .glass atau di dalam parent opacity<1 -->
<aside class="glass glass--thin">…</aside>
```
Kenapa: backdrop root — kaca anak hanya melihat isi kaca induk.

**5. Liquid glass progresif (Chromium mendapat refraksi, lainnya blur)**
```html
<svg width="0" height="0" style="position:absolute" color-interpolation-filters="sRGB" aria-hidden="true">
  <filter id="lg">
    <feImage href="displacement-map.png" x="0" y="0" width="320" height="96" result="map"/>
    <feDisplacementMap in="SourceGraphic" in2="map" scale="40" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```
```css
.lg { position: relative; width: 320px; height: 96px; border-radius: 48px; }
.lg::before { content: ""; position: absolute; inset: 0; border-radius: inherit;
  backdrop-filter: blur(10px) saturate(150%); }                 /* lapisan dasar semua browser */
.is-chromium .lg::after { content: ""; position: absolute; inset: 0; border-radius: inherit;
  backdrop-filter: url(#lg); }                                   /* refraksi hanya Chromium */
```
Firefox (bug 1961378) mengabaikan backdrop-filter yang jatuh ke "blob image" (kasus SVG url) — kalau `url()`
dicampur `blur()` dalam satu deklarasi, risiko kehilangan blur juga → pisah lapisan. Deteksi engine
(`.is-chromium`) lewat JS (mis. `navigator.userAgentData?.brands`) [UNVERIFIED metode terbaik;
`CSS.supports('backdrop-filter','url(#x)')` kemungkinan true walau tidak dirender — jangan andalkan].

## Performa, aksesibilitas, mobile & dukungan browser
- `backdrop-filter` = baca piksel di belakang + filter tiap frame saat apa pun di belakangnya bergerak. Batasi
  luas & jumlah; LogRocket: SVG backdrop-filter "can be expensive, especially on low-power devices... restrict
  Liquid Glass to a small number of floating UI elements".
- Kursor rAF: hentikan loop saat `pointer: coarse` (touch) — tidak ada kursor; sembunyikan `.cursor`.
- Kontras: teks di atas kaca butuh latar lebih gelap/seragam daripada blur yang lebih besar (LogRocket a11y).
  `prefers-reduced-transparency` ada tapi experimental (Chrome 118; FF di balik flag; Safari ✗ — BCD) → sediakan
  opsi latar solid sendiri. `prefers-reduced-motion`: matikan lerp kursor (posisi langsung) atau sembunyikan kursor.
- Dukungan: lihat front matter. `mix-blend-mode` pada **elemen SVG**: Safari ✗ (BCD svg_elements). Safari < 18
  butuh `-webkit-backdrop-filter`.

## Sumber lokal
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/backdrop-filter/index.md` — backdrop root (daftar lengkap) + contoh.
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/mix-blend-mode/index.md` — semua mode, plus-lighter.
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/isolation/index.md` · `../../_shared/mdn-content/files/en-us/web/css/reference/properties/background-blend-mode/index.md` · `../../_shared/mdn-content/files/en-us/web/css/reference/values/blend-mode/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/guides/compositing_and_blending/index.md` · `../../_shared/mdn-content/files/en-us/web/css/guides/filter_effects/index.md`
- `web/kube-liquid-glass-css-svg.md` — refraksi (Snell), displacement map, specular, "Chrome-only".
- `web/logrocket-liquid-glass-css-svg.md` — implementasi React/Tailwind, performa & a11y, dukungan browser (Des 2025).
- `../svg-filters/NOTES.md` — dasar primitive & color-interpolation-filters.
- `../_compat/repo-browser-compat-data/css/properties/{backdrop-filter,mix-blend-mode,isolation,filter}.json` · `../_compat/repo-web-features/features/backdrop-filter.yml.dist`
