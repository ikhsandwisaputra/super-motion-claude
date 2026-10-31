# 08 · CSS Modern & SVG Filter Magic (0% JavaScript, sebisa mungkin)

Efek yang dulu butuh library kini native: distorsi SVG filter, animasi berbasis scroll di compositor, blend &
kaca, custom property bertipe, spring `linear()`, enter/exit `display:none`, animasi ke `height:auto`.
Sumber primer utama: mirror MDN bersama (`../_shared/mdn-content/files/en-us/web/`). Data dukungan browser
dikumpulkan di `_compat/` (sparse clone `mdn/browser-compat-data` + `web-platform-dx/web-features`, 2026-10-28;
browser stabil saat itu: Chrome 156, Firefox 158 (159 rilis 2026-10-27), Safari 27).

| Alat | Folder | Peran satu baris | Resmi |
|---|---|---|---|
| SVG filters | [`svg-filters/`](svg-filters/NOTES.md) | Gooey, liquid/water, glitch RGB-split, grain/kertas, outline — via `filter: url(#id)` | https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/filter · https://yoksel.github.io/svg-filters/ |
| Scroll-driven animations (+ scroll-triggered, scroll-state queries) | [`scroll-driven-animations/`](scroll-driven-animations/NOTES.md) | `animation-timeline: scroll()/view()`, range, pin horizontal, stacking cards; trigger Chrome 146 | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations · https://scroll-driven-animations.style/ |
| Blend & backdrop | [`blend-backdrop/`](blend-backdrop/NOTES.md) | Kursor/teks `difference`, `plus-lighter` cross-fade, kaca berlapis, liquid glass (Chromium) | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode · https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter |
| `@property` / Houdini | [`css-property-houdini/`](css-property-houdini/NOTES.md) | Custom property bertipe → conic glow border, gradient bergerak, counter angka, spotlight bermassa | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property |
| CSS motion modern | [`css-modern-motion/`](css-modern-motion/NOTES.md) | `linear()` spring/bounce, `@starting-style` + `allow-discrete`, `interpolate-size`, `shape()`, individual transforms, `animation-composition` | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function · https://linear-easing-generator.netlify.app/ |
| Data dukungan | [`_compat/`](_compat/) | BCD + web-features (Baseline) untuk fitur kategori 06 & 08 | https://github.com/mdn/browser-compat-data · https://github.com/web-platform-dx/web-features |

## Pilih yang mana?
| Situasi | Pilihan | Catatan dukungan (2026-10-28) |
|---|---|---|
| Progress/reveal/parallax yang harus identik posisi scroll | Scroll-driven `scroll()`/`view()` | Chrome 115, Safari 26, Firefox 159 |
| Animasi berbasis waktu yang dipicu saat elemen masuk viewport | `timeline-trigger` + `animation-trigger` (fallback IntersectionObserver) | Chrome 146 saja |
| Pin horizontal / stacking cards tanpa JS | Scroll-driven + `position: sticky` + range `contain`/`exit-crossing` | sama dengan scroll-driven |
| Header berubah saat sticky "menempel" | `container-type: scroll-state` + `@container scroll-state(stuck: top)` | Chrome 133 saja |
| Blob menyatu / tombol cair | SVG filter gooey (blur + feColorMatrix alpha `18 -7`) | semua browser |
| Distorsi air/kain pada teks/tombol | `feTurbulence` + `feDisplacementMap`, animasikan `scale` sebagai impuls | semua; mahal di area besar |
| Kursor/teks yang membalik warna | `mix-blend-mode: difference` (+ `isolation` untuk membatasi) | semua |
| Kaca buram | `backdrop-filter: blur() saturate()` (hindari nesting; ingat backdrop root) | Baseline 2024 |
| Kaca yang membiaskan (Liquid Glass) | `backdrop-filter: url(#svg)` + lapisan blur fallback | Chromium saja |
| Border berkilau berputar / gradient beranimasi | `@property --angle: <angle>` + conic-gradient | Baseline 2024 |
| Spring/bounce di transition CSS | `linear()` (generator Jake Archibald) | Baseline widely 2026 |
| Dialog/popover masuk-keluar tanpa library | `@starting-style` + `transition-behavior: allow-discrete` (+ `overlay`) | `display` transition: Chrome/Safari 18; FF snap |
| Accordion ke `height: auto` | `interpolate-size: allow-keywords` (Chrome) + fallback `grid-template-rows: 0fr→1fr` | fallback semua browser |
| Reveal bentuk kurva yang responsif | `clip-path: shape()` + variabel `@property` | Chrome 135 / FF 148 / Safari 18.4 |
| Stagger tanpa index manual | `sibling-index()` di `calc()` | Chrome 138 / FF 154 / Safari 26.2 |

## Kombo dengan kategori lain
- Teks: `../06-kinetic-typography/` (variable fonts + split + textPath memakai teknik di sini).
- Smooth scroll: `../01-scroll-transitions/lenis/` (kompatibel dengan scroll timelines).
- Koreografi kompleks/interupsi ber-velocity: `../03-choreography/`; physics: `../04-physics/`.
- Distorsi skala besar/real-time: `../02-shaders-webgl/`.
