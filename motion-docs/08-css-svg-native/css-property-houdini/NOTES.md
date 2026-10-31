---
tool: CSS @property / CSS.registerProperty (Properties & Values API) + CSS Painting API
version: "@property Baseline newly 2024-07-09 (Chrome 85 / FF 128 / Safari 16.4); CSS.registerProperty Chrome 78 / FF 128 / Safari 16.4; CSS Painting API (paintWorklet) Chrome/Edge 65 saja (FF ✗, Safari ✗). sibling-index()/sibling-count() Baseline newly 2026-08-18 (Chrome 138 / FF 154 / Safari 26.2). BCD/web-features 2026-10-28."
official: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property · https://web.dev/blog/at-property-baseline
local: ../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@property/index.md · ../../_shared/mdn-content/files/en-us/web/css/guides/properties_and_values_api/ · web/webdev-at-property-baseline.md
fetched: 2026-10-28
---
# @property (Houdini) — memberi TIPE ke custom property supaya browser bisa menginterpolasinya

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk menganimasikan hal yang dulu "tidak bisa": sudut/stop gradient (conic glow border ala
  Linear/Apple), warna di dalam gradient, angka counter, posisi spotlight, axis variable font, parameter
  `shape()`/`clip-path`, nilai `calc()` apa pun — cukup animasikan variabelnya.
- **Jangan** untuk gerak transform biasa (pakai `translate`/`rotate`/`scale` individual — compositor), atau saat
  butuh nilai yang bergantung konteks di `initial-value` (`em` tidak valid).
- CSS Painting API (`paint()` worklet) masih Chromium-only → efek generatif berbasis paint worklet = progressive
  enhancement saja; alternatif: canvas/WebGL (`../../02-shaders-webgl`, `../../07-creative-coding`).

## Mental model (yang memengaruhi FEEL & performa)
- Custom property tak terdaftar = token string → transisi "lompat". Terdaftar dengan `syntax` = punya tipe →
  diinterpolasi seperti properti asli (MDN: "with the registered property, the transition works").
- Aturan validitas (MDN): `syntax` & `inherits` **wajib**; `initial-value` wajib kecuali `syntax: "*"`;
  `initial-value` harus *computationally independent* (`10px`, `2in` OK; `3em` tidak). Rule tak valid = diabaikan
  seluruhnya (diam-diam!). `syntax` mendukung tipe (`<color>`, `<length>`, `<number>`, `<integer>`, `<angle>`,
  `<percentage>`, `<length-percentage>`, `<time>`, `<transform-list>`...), `+` (list spasi), `#` (list koma), `|`.
- Duplikasi: `@property` terakhir menang; registrasi JS menang atas `@property`. `CSS.registerProperty` dua kali
  dengan nama sama → `InvalidModificationError` (jebakan HMR).
- `inherits: false` membatasi perubahan ke elemen itu saja; `inherits: true` pada variabel yang dianimasikan di
  ancestor = seluruh subtree ikut style-recalc tiap frame → pilih `false` kecuali memang perlu diwarisi
  (mis. axis font per huruf).
- Biaya: variabel yang dipakai di `background`/gradient/`clip-path` = **repaint tiap frame** (main thread), bukan
  compositor. Murah untuk area kecil (tombol, border), mahal untuk full-screen.
- Nilai tidak valid saat runtime → jatuh ke `initial-value` (fallback aman; web.dev).

## Setup minimal
```css
@property --angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.x { transition: --angle .6s cubic-bezier(.2,.8,.2,1); }
.x:hover { --angle: 180deg; }
```
```js
// Ekuivalen JS (sekali saja; guard untuk HMR)
try { CSS.registerProperty({ name: '--angle', syntax: '<angle>', inherits: false, initialValue: '0deg' }); }
catch (e) { if (e.name !== 'InvalidModificationError') throw e; }
```

## Knob yang menentukan rasa gerak
- **Tipe menentukan interpolasi**: `<angle>` berputar mulus, `<color>` interpolasi warna, `<integer>` membulat ke
  bilangan bulat (cocok counter), `<percentage>` untuk stop gradient.
- **Durasi & easing pada variabel**, bukan pada properti akhir: satu variabel bisa menggerakkan banyak properti
  sekaligus (sinkron sempurna).
- **Lag sebagai massa**: `transition: --x .35s, --y .35s` pada posisi spotlight → cahaya "menyusul" kursor.
- **Loop**: `@keyframes spin { to { --angle: 360deg } }` + `linear infinite` = rotasi konstan; ganti dengan
  easing in-out untuk "napas".

## Integrasi
- **GSAP/Motion/anime**: tween `'--angle'` langsung (GSAP: `gsap.to(el, { '--angle': '360deg' })`); registrasi
  membuat interpolasi CSS-nya juga benar bila dicampur transition.
- **Scroll-driven**: `@keyframes` yang mengubah variabel + `animation-timeline: view()` → gradient/blur/axis
  dikendalikan scroll tanpa JS (`../scroll-driven-animations/NOTES.md`).
- **Variable fonts**: satu `@property` per axis (`../../06-kinetic-typography/variable-fonts/NOTES.md`).
- **shape()**: Chrome men-demo-kan `@property --animated-wave-height` di dalam `clip-path: shape(...)` (`../css-modern-motion/NOTES.md`).

## Resep non-generik
**1. Glowing conic border (Linear/Apple style)**
```css
@property --angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.glow-btn {
  --bg: #0b0b10;
  border: 1px solid transparent; border-radius: 14px;
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    conic-gradient(from var(--angle), transparent 0 70%, #7aa2ff 80%, #fff 85%, transparent 92%) border-box;
  animation: spin 4s linear infinite;
  position: relative;
}
.glow-btn::after {                       /* halo lembut di luar */
  content: ""; position: absolute; inset: -1px; border-radius: inherit; z-index: -1;
  background: conic-gradient(from var(--angle), transparent 0 70%, #7aa2ff 82%, transparent 92%);
  filter: blur(14px); opacity: .7;
}
@keyframes spin { to { --angle: 360deg; } }
@media (prefers-reduced-motion: reduce) { .glow-btn { animation: none; --angle: 200deg; } }
```
Kenapa mahal: kilau berjalan di tepi seperti cahaya memantul di kaca — hanya 1 variabel yang beranimasi.

**2. Stop gradient yang bergeser (progress/sheen)**
```css
@property --p { syntax: "<percentage>"; inherits: false; initial-value: 0%; }
.sheen { background: linear-gradient(100deg, #fff0 calc(var(--p) - 15%), #fff8 var(--p), #fff0 calc(var(--p) + 15%)) , var(--base);
  transition: --p .9s cubic-bezier(.3,.7,.2,1); }
.sheen:hover { --p: 115%; }
```
(MDN mencontohkan `--progress` `<percentage>` untuk progress bar gradient.)

**3. Counter angka tanpa JS**
```css
@property --num { syntax: "<integer>"; inherits: false; initial-value: 0; }
.stat { counter-reset: n var(--num); transition: --num 1.8s cubic-bezier(.15,.85,.25,1); }
.stat::after { content: counter(n); }
.stat.in { --num: 1280; }                /* .in dipasang IntersectionObserver / scroll-trigger */
```
Kenapa mahal: angka "mengejar" target dengan easing ease-out panjang, bukan increment linear setInterval.
Catatan a11y: konten `::after` dibaca screen reader secara tidak konsisten → taruh angka final juga di teks
tersembunyi atau `aria-label`.

**4. Stagger dari custom prop (2026: tanpa index manual)**
```css
.list > * { opacity: 0; translate: 0 12px; transition: opacity .4s, translate .5s cubic-bezier(.2,.8,.2,1);
  transition-delay: calc((sibling-index() - 1) * 45ms); }      /* fallback: style="--i:3" + var(--i) */
.list.in > * { opacity: 1; translate: 0 0; }
```
`sibling-index()` mulai dari 1 dan dihitung per parent. Browser lama: inline `--i` atau Splitting `items`.

**5. Spotlight yang ber-massa**
```css
@property --mx { syntax: "<length-percentage>"; inherits: false; initial-value: 50%; }
@property --my { syntax: "<length-percentage>"; inherits: false; initial-value: 50%; }
.spot { background: radial-gradient(240px circle at var(--mx) var(--my), #fff2, transparent 70%), #111;
  transition: --mx .35s cubic-bezier(.2,.8,.2,1), --my .35s cubic-bezier(.2,.8,.2,1); }
```
```js
spot.addEventListener('pointermove', e => { const r = spot.getBoundingClientRect();
  spot.style.setProperty('--mx', e.clientX - r.left + 'px'); spot.style.setProperty('--my', e.clientY - r.top + 'px'); });
```

## Performa, aksesibilitas, mobile & dukungan browser
- Animasi variabel di gradient/filter/clip = repaint per frame; jaga area kecil, hentikan `infinite` saat
  off-screen (`animation-play-state: paused` via IntersectionObserver) dan di `prefers-reduced-motion`.
- Browser tanpa `@property` (lama) → variabel tetap bekerja sebagai string; transisi jadi lompat (bukan rusak).
  Selalu desain state akhir yang benar tanpa animasi.
- Dukungan: lihat front matter. Firefox baru mendukung `@property` sejak 128 (Juli 2024).

## Sumber lokal
- `../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@property/index.md` — aturan validitas, contoh animasi `--progress`.
- `../../_shared/mdn-content/files/en-us/web/api/css/registerproperty_static/index.md` — API JS, exceptions.
- `../../_shared/mdn-content/files/en-us/web/css/guides/properties_and_values_api/{index,registering_properties/index,houdini/index}.md`
- `../../_shared/mdn-content/files/en-us/web/api/css_properties_and_values_api/` · `../../_shared/mdn-content/files/en-us/web/api/css_painting_api/` (paint worklet)
- `web/webdev-at-property-baseline.md` — pengumuman Baseline + demo gradient berkilau.
- `../_compat/repo-browser-compat-data/css/at-rules/property.json` · `../_compat/repo-browser-compat-data/api/CSS.json` · `../_compat/repo-web-features/features/{registered-custom-properties,paint,sibling-count}.yml.dist`
