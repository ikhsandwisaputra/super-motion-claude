---
tool: CSS motion modern (linear(), @starting-style, transition-behavior, interpolate-size/calc-size, offset-path, clip-path/mask + shape(), individual transforms, animation-composition, will-change/contain, prefers-reduced-motion)
version: "Per 2026-10-28 (BCD/web-features): linear() Baseline widely 2026-06-11 (Chrome 113 / FF 112 / Safari 17.2); @starting-style Baseline newly 2024-08-06 (117 / 129 / 17.5); transition-behavior Baseline newly (117 / 129 / 17.4) tapi transisi `display`/`content-visibility` FF ✗ (Chrome 117, Safari 18); overlay Chrome 117 saja; interpolate-size & calc-size Chrome 129 saja; shape() Baseline newly 2026-02-24 (135 / 148 / 18.4); individual transforms widely (104 / 72 / 14.1); animation-composition widely (112 / 115 / 16); motion-path widely; masks widely 2026-06-07; ::details-content 131 / 143 / 18.4; grid track animation widely (107 / 66 / 16). Tool: jakearchibald/linear-easing-generator @17e22b8."
official: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function · https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style · https://linear-easing-generator.netlify.app/
local: ../../_shared/mdn-content/files/en-us/web/css/reference/ · web/chrome-*.md · repo-linear-easing-generator/
fetched: 2026-10-28
---
# CSS motion modern — spring tanpa JS, enter/exit display:none, animasi ke height:auto, reveal ber-shape

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** saat efeknya state-driven (hover, open/close, enter/exit, toggle) dan cukup satu arah per state:
  spring/bounce lewat `linear()`, dialog/popover/accordion masuk-keluar tanpa library, reveal `clip-path`.
- **Jangan / pakai library** bila butuh: spring yang mewarisi *velocity* saat diinterupsi (CSS `linear()` adalah
  kurva tetap, tidak physics) → Motion/react-spring (`../../03-choreography`); timeline kompleks/scrub → GSAP;
  gesture/drag-throw → use-gesture + spring.

## Mental model (yang memengaruhi FEEL & performa)
- **`linear(stops)`**: interpolasi linear antar titik; titik tanpa posisi disebar rata; `0.25 75%` (posisi) atau
  `0.25 25% 75%` (rentang datar). Banyak titik ≈ kurva apa pun (spring, bounce, elastic). Output boleh >1 (overshoot).
  Durasi tetap milik animasi — spring yang "settle" perlu durasi = waktu settle (generator mengekspor durasi).
- **Discrete → transisi**: `transition-behavior: allow-discrete` membuat `display`/`overlay` ikut transisi (swap
  di akhir untuk keluar, di awal untuk masuk). `@starting-style` = state "sebelum muncul" untuk entry dari
  `display:none`/elemen baru/top layer. `@starting-style` punya specificity sama dengan rule asli → **tulis
  setelahnya** atau nest (MDN); nesting tidak bisa untuk pseudo-element (`::backdrop`).
- **Top layer**: `dialog`/`popover` keluar dari top layer saat ditutup → transisikan `overlay ... allow-discrete`
  agar pelepasan ditunda sampai animasi selesai (Chrome 117 saja; browser lain tetap jalan tanpa penundaan).
- **Intrinsic size**: `interpolate-size: allow-keywords` (diwariskan → pasang di `:root`) membuka interpolasi
  `0 ↔ auto/min-content/fit-content`; `calc-size(auto, size - 10px)` untuk hitungan & interpolasi antar
  calc-size berbasis sama. Chrome 129 saja → sisanya snap (progressive enhancement). Fallback lintas browser:
  `grid-template-rows: 0fr → 1fr` (grid track animation Baseline widely).
- **Individual transforms**: `translate`, `rotate`, `scale` diterapkan berurutan translate → rotate → scale → lalu
  `transform` (MDN). Keuntungan: hover `scale` tidak menimpa keyframe `rotate` yang sedang jalan.
- **`animation-composition: add | accumulate`**: efek animasi ditambahkan ke nilai dasar (bukan mengganti) →
  wobble di atas posisi apa pun. Shorthand `animation` me-reset properti ini → tulis sesudahnya.
- **Shapes**: `clip-path` basic shapes (`inset`, `circle`, `ellipse`, `polygon`, `xywh`, `rect`, `path`, `shape`)
  beranimasi bila fungsi & jumlah titik/perintah sama. `path()` = px absolut (tidak responsif); **`shape()`** =
  perintah path dengan unit CSS apa pun (% , calc, var) → responsif & bisa dianimasikan via `@property`.
- **Compositor-friendly**: transform/opacity (dan individual transforms). `clip-path`, `mask`, ukuran, `display`
  = main thread/repaint. `will-change` = "last resort" (MDN), membuat stacking context lebih awal.

## Setup minimal (pola terverifikasi)
```css
:root { interpolate-size: allow-keywords; }                         /* Chrome 129+, aman diabaikan */

/* Spring siap pakai (lihat bagian Knob untuk asal angka) */
:root {
  --spring: linear(0, 0.008, 0.036 2.1%, 0.139, 0.277 6.6%, 0.722 12.9%, 0.937 16.7%, 1.014, 1.077, 1.121,
    1.149 24.3%, 1.159, 1.163, 1.161 28.3%, 1.154 29.9%, 1.129 32.8%, 1.051 39.6%, 1.017 43.1%, 0.99,
    0.977 51%, 0.973 53.9%, 0.975 57.1%, 0.997 69.8%, 1.003 76.9%, 1.004 83.8%, 1);   /* durasi ≈1333ms */
  --spring-crit: linear(0, 0.005, 0.02 2%, 0.08 4.3%, 0.471 14.6%, 0.571, 0.653 20.5%, 0.727, 0.789 26.8%,
    0.84 30.2%, 0.884 33.9%, 0.919 38.1%, 0.946 42.7%, 0.967 48%, 0.981 54.1%, 0.99 61%, 0.996 69.8%, 1); /* ≈833ms, tanpa overshoot */
  --bounce: linear(0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765, 1,
    0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813, 0.848, 0.891 68.2%,
    1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1, 0.988, 0.984, 0.988, 1);  /* dari README generator */
}

/* Dialog masuk/keluar (pola MDN @starting-style + blog Chrome) */
dialog { opacity: 0; translate: 0 24px;
  transition: opacity .3s, translate .45s var(--spring-crit), overlay .45s allow-discrete, display .45s allow-discrete; }
dialog[open] { opacity: 1; translate: 0 0; }
@starting-style { dialog[open] { opacity: 0; translate: 0 24px; } }          /* SETELAH rule [open] */
dialog::backdrop { background: rgb(0 0 0 / 0); transition: background-color .3s, overlay .3s allow-discrete, display .3s allow-discrete; }
dialog[open]::backdrop { background: rgb(0 0 0 / .45); }
@starting-style { dialog[open]::backdrop { background: rgb(0 0 0 / 0); } }   /* standalone: pseudo tak bisa nest */
```

## Knob yang menentukan rasa gerak
| Knob | Efek | Nilai |
|---|---|---|
| Spring underdamped (`--spring`) | overshoot ±16% lalu settle — "kenyal" | m=1, k=100, c=10 → ≈1333 ms |
| Critically damped (`--spring-crit`) | cepat & mantap, tanpa pantulan — UI premium | m=1, k=170, c=26 → ≈833 ms |
| Kekakuan tinggi (k=300, c=20) | snappy dengan sedikit overshoot (~10%) | ≈833 ms |
| Jumlah titik `linear()` | lebih banyak = lebih halus; 20–40 cukup | generator: simplify 0.0017, round 3 |
| `allow-discrete` timing | keluar: `display` swap di akhir durasi → samakan durasi dengan animasi terpanjang | |
| Reveal shape | `inset()` = tirai; `circle()` = lensa/iris; `polygon()` = sudut tajam editorial; `shape()` = kurva responsif | |

Asal angka spring: dihitung ulang dengan rumus `createSpring` di `repo-linear-easing-generator/src/shared/App/demos.ts`
+ penyederhanaan Ramer–Douglas–Peucker (toleransi 0.0017, 3 desimal) memakai script sendiri; galat maks vs spring
eksak 0.9% (k100/c10) dan 0.5% (k170/c26). Untuk kurva lain gunakan generator resmi.

## Integrasi
- **Motion/GSAP**: tetap pakai mereka untuk interupsi ber-velocity; CSS `linear()` bagus untuk hover/state
  sederhana sehingga JS fokus ke koreografi.
- **Scroll**: semua properti di sini bisa dikendalikan `animation-timeline` (`../scroll-driven-animations/NOTES.md`);
  `@starting-style` cocok dipasangkan dengan scroll-triggered `play-once`.
- **View Transitions**: untuk perpindahan halaman/state besar (`../../01-scroll-transitions/view-transitions`).
- **@property**: animasikan variabel di dalam `shape()`/gradient (`../css-property-houdini/NOTES.md`).

## Resep non-generik
**1. Accordion ke `height: auto` + fallback lintas browser**
```css
details::details-content { block-size: 0; overflow: clip;
  transition: block-size .5s var(--spring-crit), content-visibility .5s allow-discrete; }
details[open]::details-content { block-size: auto; }          /* butuh interpolate-size di :root (Chrome) */
/* Fallback universal: grid 0fr→1fr */
.acc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s var(--spring-crit); }
.acc.open { grid-template-rows: 1fr; } .acc > .inner { overflow: hidden; }
```
Transisi `content-visibility` hanya Chrome/Safari 18 (BCD); di Firefox panel tetap muncul, hanya tanpa animasi.

**2. Exit dengan keyframe + `display` (Chrome 116+, Safari 18)**
```css
.toast.out { animation: leave .35s cubic-bezier(.4,0,1,1) forwards; }
@keyframes leave { 70% { opacity: 1; } 100% { opacity: 0; translate: 0 -12px; scale: .96; display: none; } }
```

**3. Reveal responsif dengan `shape()` + variabel teranimasi (pola blog Chrome)**
```css
@property --wave { syntax: "<length>"; inherits: false; initial-value: 0px; }
.banner { --h: calc(min(var(--wave), 40%));
  clip-path: shape(from 0px var(--h), curve to 100% var(--h) with 25% 0px / 75% calc(var(--h) * 2),
    vline to calc(100% - var(--h)), curve to 0 calc(100% - var(--h)) with 75% 100% / 25% calc(100% - var(--h) * 2), close);
  animation: wave 1.2s var(--spring) both; }
@keyframes wave { from { --wave: 0px; } to { --wave: 40px; } }
```
Kenapa mahal: tepi banner "melambai" mengikuti spring dan tetap pas di semua lebar layar.

**4. Iris/lensa reveal**
```css
.reveal { clip-path: circle(0% at var(--cx, 50%) var(--cy, 50%)); transition: clip-path .9s cubic-bezier(.7,0,.2,1); }
.reveal.in { clip-path: circle(75% at var(--cx, 50%) var(--cy, 50%)); }
```
Set `--cx/--cy` ke titik klik → transisi halaman "membuka dari jari".

**5. Wobble yang ditumpuk (`animation-composition`) + hover independen**
```css
.sticker { translate: var(--x, 0) var(--y, 0); rotate: -4deg;
  animation: wobble 2.4s ease-in-out infinite; animation-composition: add; }   /* setelah shorthand */
@keyframes wobble { 50% { rotate: 6deg; } }
.sticker:hover { scale: 1.08; transition: scale .4s var(--spring); }        /* individual: tidak bentrok dg rotate */
```

**6. Motion path untuk elemen (bukan teks)**: `offset-path: path("M…")` / `circle()` / `shape()` + animasi
`offset-distance: 0% → 100%`, `offset-rotate: auto` (lihat `../../06-kinetic-typography/svg-textpath/NOTES.md`).

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Pola reduced-motion yang aman: tulis gerak di dalam `@media (prefers-reduced-motion: no-preference) { … }`
  sehingga default = tanpa gerak; atau di blok `reduce` ganti translate/scale dengan fade singkat (pertahankan
  feedback, buang perpindahan). Media feature Baseline widely (Chrome 74 / FF 63 / Safari 10.1).
- `will-change` hanya dinyalakan sesaat sebelum animasi berat lalu dimatikan (MDN "use sparingly", boros memori).
  `contain: layout paint` pada komponen beranimasi membatasi dampak relayout/repaint ke dalamnya.
- `clip-path`/`mask` animasi = repaint tiap frame; di HP batasi ke elemen < ~viewport, hindari kombinasi dengan blur.
- `interpolate-size`/`calc-size`/`overlay`/transisi `display` (FF) tidak universal → selalu pastikan state akhir
  benar tanpa animasi.
- Ringkas dukungan ada di front matter; detail per sub-fitur di `../_compat/`.

## Sumber lokal
- `../../_shared/mdn-content/files/en-us/web/css/reference/values/easing-function/index.md` — linear(), cubic-bezier, steps.
- `../../_shared/mdn-content/files/en-us/web/css/guides/easing_functions/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@starting-style/index.md` — urutan/specificity, contoh popover lengkap.
- `../../_shared/mdn-content/files/en-us/web/css/reference/properties/{transition-behavior,interpolate-size,animation-composition,will-change,contain,offset-path,clip-path,translate,rotate,scale,transform}/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/reference/values/{calc-size,basic-shape,shape}/index.md`
- `../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md` · `../../_shared/mdn-content/files/en-us/web/css/guides/masking/index.md` · `../../_shared/mdn-content/files/en-us/web/css/guides/motion_path/index.md`
- `web/chrome-css-linear-easing-function.md` — linear() + bounce, DevTools editor (Chrome 114).
- `web/chrome-entry-exit-animations.md` — display keyframes, allow-discrete, @starting-style, overlay.
- `web/chrome-animate-to-height-auto.md` — interpolate-size vs calc-size, opt-in alasan kompatibilitas.
- `web/chrome-css-shape.md` — shape() responsif + @property.
- `repo-linear-easing-generator/README.md` · `notes.md` · `src/shared/App/{demos.ts,useOptimizedPoints.ts,useLinearSyntax.ts}` — preset spring/bounce/elastic, algoritma RDP.
- `../_compat/repo-web-features/features/*.yml.dist` (linear-easing, starting-style, transition-behavior, display-animation, interpolate-size, calc-size, shape-function, individual-transforms, animation-composition, motion-path, masks, clip-path, will-change, prefers-reduced-motion)
