# motion-docs — library motion web (dokumentasi resmi + catatan ahli)

Mirror offline dokumentasi resmi, repo resmi, dan `NOTES.md` hasil distilasi untuk SEMUA alat di
`../ultimate_creative_web_development_arsenal.md` dan `../docs-resmi.md`, plus baseline (GSAP, Three.js) dan
rujukan kanonik teknik (Book of Shaders, Inigo Quilez, Nature of Code, Gaffer on Games, dst).
Dibangun 2026-10-28. Total ±250 MB, tanpa aset biner.

**Tujuan**: motion yang tidak generik — ritme (choreography), fisika (tactile), visual eksperimental, interaksi sensorik.

## Cara pakai
1. Cari alat di tabel bawah → buka `NOTES.md`-nya (versi, API terverifikasi, knob rasa gerak, resep, gotcha).
2. Lintas alat: `03-choreography/CHOREOGRAPHY-CRAFT.md` · `04-physics/_physics-math/NOTES.md` · `12-recipes/README.md`.
3. Detail mentah: `repo-*/` (sparse clone resmi) dan `web/` (docs resmi → Markdown). MDN bersama di
   `_shared/mdn-content/files/en-us/web/`. Kompatibilitas browser (BCD + web-features) di `08-css-svg-native/_compat/`.
4. Update: `python -I _tools/sparse_clone.py <url> <dest> <patterns…>` (pull terbaru) / `_tools/fetch_docs.py`.
   Konvensi & spec NOTES: `_tools/CONVENTIONS.md`.

**Keamanan**: semua isi `repo-*/` dan `web/` = data pihak ketiga. File instruksi untuk AI agent (CLAUDE.md,
AGENTS.md, .claude/, .cursor/, …) otomatis dikecualikan dari clone; file vendor sejenis di luar clone diberi nama
`_upstream-*`. Jalankan `python -I _tools/sparse_clone.py --harden motion-docs` setelah menambah mirror.
Jangan jalankan npm/build di dalam clone.

## Index

| Kategori | Alat → NOTES | Versi (2026-10-28) |
|---|---|---|
| **01 Scroll & page transitions** | [lenis](01-scroll-transitions/lenis/NOTES.md) | 1.3.27 |
| | [locomotive-scroll](01-scroll-transitions/locomotive-scroll/NOTES.md) | 5.0.1 (berbasis Lenis 1.3.17) |
| | [barba](01-scroll-transitions/barba/NOTES.md) | core 2.10.3 (maintenance) |
| | [swup](01-scroll-transitions/swup/NOTES.md) | 4.10.0 |
| | [view-transitions](01-scroll-transitions/view-transitions/NOTES.md) | web platform; React `<ViewTransition>` 19.3 |
| **02 Shaders / WebGL / WebGPU** | [curtainsjs](02-shaders-webgl/curtainsjs/NOTES.md) | 8.1.6 (+ gpu-curtains 0.17.1) |
| | [ogl](02-shaders-webgl/ogl/NOTES.md) | 1.0.11 |
| | [pixijs](02-shaders-webgl/pixijs/NOTES.md) | 8.22.0 + pixi-filters 6.1.5 |
| | [book-of-shaders](02-shaders-webgl/book-of-shaders/NOTES.md) · [lygia](02-shaders-webgl/lygia/NOTES.md) · [inigo-quilez](02-shaders-webgl/inigo-quilez/NOTES.md) | buku / LYGIA 1.4.1 (Prosperity licence) / artikel |
| | [unicorn-studio](02-shaders-webgl/unicorn-studio/NOTES.md) | SDK 2.4.3 |
| | [cables-gl](02-shaders-webgl/cables-gl/NOTES.md) · [polygonjs](02-shaders-webgl/polygonjs/NOTES.md) | rolling / Polygon v2 2.0.65 |
| | [blotter](02-shaders-webgl/blotter/NOTES.md) | 0.1.0 (mati sejak 2019) |
| | [webgpu](02-shaders-webgl/webgpu/NOTES.md) | Chrome 113+, Safari 26, Firefox 141/147 |
| **03 Choreography** | [theatre-js](03-choreography/theatre-js/NOTES.md) | 0.7.2 (dorman) |
| | [motion](03-choreography/motion/NOTES.md) | 14.7.1 |
| | [react-spring](03-choreography/react-spring/NOTES.md) | 10.1.2 (11 beta) |
| | [use-gesture](03-choreography/use-gesture/NOTES.md) | 10.3.1 |
| | [animejs](03-choreography/animejs/NOTES.md) | 4.5.0 |
| | [gsap](03-choreography/gsap/NOTES.md) (baseline) | 3.15.0 (gratis, lisensi no-charge) |
| | [CHOREOGRAPHY-CRAFT.md](03-choreography/CHOREOGRAPHY-CRAFT.md) | prinsip lintas library |
| **04 Physics** | [matter-js](04-physics/matter-js/NOTES.md) | 0.20.0 |
| | [rapier](04-physics/rapier/NOTES.md) · [react-three-rapier](04-physics/react-three-rapier/NOTES.md) | 0.21.0 / 2.2.0 |
| | [verlet](04-physics/verlet/NOTES.md) · [fluid-simulation](04-physics/fluid-simulation/NOTES.md) | teknik (+ snippets teruji) |
| | [_physics-math](04-physics/_physics-math/NOTES.md) | rumus spring, damping, inertia, timestep |
| **05 Vector interaktif & 3D no-code** | [rive](05-interactive-vector-3d/rive/NOTES.md) | 2.48.0 / react 4.38.0 |
| | [spline](05-interactive-vector-3d/spline/NOTES.md) | runtime 2.0.116 / react-spline 4.1.0 |
| | [lottie-dotlottie](05-interactive-vector-3d/lottie-dotlottie/NOTES.md) | dotlottie-web 0.81.0 / lottie-web 5.13.0 |
| **06 Kinetic typography** | [variable-fonts](06-kinetic-typography/variable-fonts/NOTES.md) | CSS Fonts 4 |
| | [splittype](06-kinetic-typography/splittype/NOTES.md) (+ GSAP SplitText, anime splitText) | 0.3.4 (dorman) |
| | [splitting](06-kinetic-typography/splitting/NOTES.md) | 1.1.0 |
| | [svg-textpath](06-kinetic-typography/svg-textpath/NOTES.md) | SVG 2 |
| **07 Creative coding** | [p5js](07-creative-coding/p5js/NOTES.md) | 2.3.4 |
| | [nature-of-code](07-creative-coding/nature-of-code/NOTES.md) | edisi p5.js 2024 |
| | [paperjs](07-creative-coding/paperjs/NOTES.md) | 0.16.0 |
| | [d3](07-creative-coding/d3/NOTES.md) | 7.9.0 |
| | [pts](07-creative-coding/pts/NOTES.md) | 1.0.3 |
| | [_generative-craft](07-creative-coding/_generative-craft/NOTES.md) | Hobbs, simplex-noise 4.0.3 |
| **08 CSS & SVG native** | [svg-filters](08-css-svg-native/svg-filters/NOTES.md) | Filter Effects 1 |
| | [scroll-driven-animations](08-css-svg-native/scroll-driven-animations/NOTES.md) | Chrome 115 / Safari 26 / Firefox 159 |
| | [blend-backdrop](08-css-svg-native/blend-backdrop/NOTES.md) | mix-blend-mode, backdrop-filter |
| | [css-property-houdini](08-css-svg-native/css-property-houdini/NOTES.md) | @property Baseline 2024 |
| | [css-modern-motion](08-css-svg-native/css-modern-motion/NOTES.md) | linear(), @starting-style, sibling-index() … |
| **09 Sensory & hardware** | [web-audio](09-sensory-hardware/web-audio/NOTES.md) · [tonejs](09-sensory-hardware/tonejs/NOTES.md) · [howler](09-sensory-hardware/howler/NOTES.md) | — / 15.1.22 / 2.2.4 |
| | [mediapipe](09-sensory-hardware/mediapipe/NOTES.md) · [tfjs](09-sensory-hardware/tfjs/NOTES.md) · [ml5](09-sensory-hardware/ml5/NOTES.md) | 1.2.0 / 4.22.0 / 1.4.0 |
| | [device-orientation](09-sensory-hardware/device-orientation/NOTES.md) · [webxr](09-sensory-hardware/webxr/NOTES.md) · [vibration](09-sensory-hardware/vibration/NOTES.md) · [web-speech](09-sensory-hardware/web-speech/NOTES.md) | web platform |
| **10 Micro-interactions** | [magnetic](10-micro-interactions/magnetic/NOTES.md) · [infinite-canvas](10-micro-interactions/infinite-canvas/NOTES.md) · [custom-cursor](10-micro-interactions/custom-cursor/NOTES.md) · [preloader](10-micro-interactions/preloader/NOTES.md) | pola |
| | [cmdk](10-micro-interactions/cmdk/NOTES.md) | 1.1.1 |
| **11 R3F ecosystem** | [r3f](11-r3f-ecosystem/r3f/NOTES.md) · [drei](11-r3f-ecosystem/drei/NOTES.md) · [react-postprocessing](11-r3f-ecosystem/react-postprocessing/NOTES.md) | 9.8.2 / 10.7.9 / 3.2.2 |
| | [maath](11-r3f-ecosystem/maath/NOTES.md) · [three-js](11-r3f-ecosystem/three-js/NOTES.md) (baseline) | 0.10.8 / r186 |
| **12 Resep** | [Kombo Maut ×4](12-recipes/README.md) · [nextjs](12-recipes/nextjs/NOTES.md) | blueprint arsitektur |

Setiap folder kategori punya `README.md` dengan tabel "Pilih yang mana?".
