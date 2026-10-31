# 06 · Kinetic Typography & Variable Fonts

Teks = ±80% isi website; gerak tipografi yang tepat langsung menaikkan kelas desain. Kategori ini berisi
catatan ahli + mirror docs resmi untuk axis variable font, pemecah teks (split), dan teks di atas path.
Semua dukungan browser dicek ke BCD/web-features per 2026-10-28 (`../08-css-svg-native/_compat/`).

| Alat | Folder | Peran satu baris | Resmi |
|---|---|---|---|
| Variable fonts (`font-variation-settings`, axis registry) | [`variable-fonts/`](variable-fonts/NOTES.md) | Axis font (wght, wdth, slnt, opsz, GRAD, MORF…) sebagai bahan gerak: hover bertekanan, squash saat scroll cepat, proximity kursor | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts · https://fonts.google.com/knowledge · https://github.com/googlefonts/axisregistry |
| SplitType (+ GSAP SplitText, anime.js splitText, Motion+ splitText) | [`splittype/`](splittype/NOTES.md) | Pecah teks jadi line/word/char; perbandingan jujur a11y, mask, auto re-split | https://github.com/lukePeavey/SplitType · https://gsap.com/docs/v3/Plugins/SplitText/ · https://animejs.com/documentation/text/splittext |
| Splitting.js | [`splitting/`](splitting/NOTES.md) | Split + index ke CSS variables (`--char-index`, `--distance`…) untuk koreografi CSS murni; juga grid & image cells | https://splitting.js.org/ |
| SVG `<textPath>` (+ CSS `offset-path`) | [`svg-textpath/`](svg-textpath/NOTES.md) | Teks mengalir di kurva: badge berputar, marquee melengkung, startOffset dari scroll | https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/textPath |

## Pilih yang mana?
| Situasi | Pilihan | Alasan |
|---|---|---|
| Hover/press teks terasa "ditekan" tanpa geser layout | Variable font axis `GRAD` (atau font multiplexed seperti Recursive) | GRAD tidak mengubah lebar → tanpa reflow |
| Headline memipih/condong saat scroll cepat | Variable font `wdth`/`slnt` + velocity (Lenis `velocity` atau rAF low-pass) | velocity = rasa inersia |
| Reveal per baris ber-mask yang tahan resize & font swap | GSAP SplitText 3.13+ (`mask: 'lines'`, `autoSplit`, `onSplit`) | satu-satunya dengan re-split + sinkron progress bawaan; gratis |
| Teks multibahasa (JP/ZH/TH) atau efek "roll" duplikat huruf | anime.js `splitText` (Intl.Segmenter, `clone`, `wrap`) | segmentasi kata asli browser + clone aksesibel |
| Mau koreografi ditulis di CSS (stagger matematis, simetris dari tengah) | Splitting.js (`--distance`, `--distance-sine`) atau `sibling-index()` | index & total jadi variabel CSS |
| Stack Motion dan punya lisensi Motion+ | Motion+ `splitText` | 0.7kb, terintegrasi `animate`/`stagger` |
| Proyek lama sudah pakai SplitType | biarkan + tambah a11y & ResizeObserver manual | dorman sejak 2023, tapi stabil |
| Teks melingkar (badge) / di sepanjang garis ilustrasi | SVG `<textPath>` (+ rotasi `<svg>` via scroll timeline) | teks tetap teks asli, glyph ikut tangen |
| Huruf di path yang perlu stagger/spring/scroll-driven CSS | split + `offset-path` per huruf | startOffset tak bisa di-drive CSS |

## Kombo dengan kategori lain
- Choreography (stagger, timeline): `../03-choreography/` (GSAP, anime.js, Motion).
- Smooth scroll & velocity: `../01-scroll-transitions/lenis/`.
- Scroll-driven tanpa JS, `@property`, `linear()` spring: `../08-css-svg-native/`.
