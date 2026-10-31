# 02 — Shaders, WebGL ringan & visual GPU

Pilar utama: **visual eksperimental** (distorsi, displacement, noise, feedback, post-FX) yang tetap ringan —
tanpa model 3D berat. Semua klaim API di tiap `NOTES.md` diverifikasi dari mirror lokal (fetched 2026-10-28);
yang tidak bisa diverifikasi ditandai `[UNVERIFIED]`. Sumber daftar: arsenal §2 + docs-resmi §3.

## Index

| Alat | Folder | Peran dalam motion | Versi / status (dicek 2026-10-28) | Resmi |
|---|---|---|---|---|
| curtains.js (+ gpu-curtains) | [`curtainsjs/`](curtainsjs/NOTES.md) | `<img>/<video>/<canvas>` DOM → plane WebGL yang ikut layout CSS & scroll; distorsi scroll/hover, slideshow displacement, flowmap, post | curtainsjs 8.1.6 (Mei 2024, **maintenance**) · gpu-curtains 0.17.1 (2026-10-27, aktif, WebGPU-only) | https://www.curtainsjs.com/documentation.html · https://github.com/martinlaxenaire/gpu-curtains |
| OGL | [`ogl/`](ogl/NOTES.md) | WebGL minimal (~29 KB): full-screen shader, flowmap/fluid kursor, GPGPU 65k partikel, bloom, trail | 1.0.11 (commit terakhir 2025-04, stabil) | https://github.com/oframe/ogl |
| PixiJS v8 + pixi-filters | [`pixijs/`](pixijs/NOTES.md) | 2D GPU (WebGL2/WebGPU): ribuan sprite, ParticleContainer, DisplacementFilter, custom Filter, Mesh/rope, RenderTexture feedback | pixi.js 8.22.0 (2026-10-01) · pixi-filters 6.1.5 | https://pixijs.com/8.x/guides |
| The Book of Shaders | [`book-of-shaders/`](book-of-shaders/NOTES.md) | kurikulum fragment shader: shaping → warna → bentuk → pola → random → noise → cellular → fBM/warp | repo 5a537e7 (2026-02); bab 14, 16–18 stub | https://thebookofshaders.com/ |
| LYGIA | [`lygia/`](lygia/NOTES.md) | library fungsi shader granular (GLSL/WGSL): noise, SDF, distort, blur, palette, easing, sim | 1.4.1 (repo 2026-10-24) — **lisensi Prosperity** | https://lygia.xyz |
| Inigo Quilez | [`inigo-quilez/`](inigo-quilez/NOTES.md) | rujukan kanonik formula: remap/easing, SDF, smin, palet kosinus, fBM/warp, voronoi, feedback, filtering | 32 artikel (situs tanpa versi) | https://iquilezles.org/articles/ |
| Unicorn Studio | [`unicorn-studio/`](unicorn-studio/NOTES.md) | editor visual layer-shader → embed runtime (~40–50 KB gz), dikendalikan Variables/Events | SDK 2.4.3 (2026-10-16) · unicornstudio-react 2.4.0 — proprietary | https://www.unicorn.studio/docs/ |
| cables.gl | [`cables-gl/`](cables-gl/NOTES.md) | visual programming node WebGL (generatif, audio-reaktif) → export bundle JS, kontrol via Variables/Callbacks | rolling web release; docs @4cf9640 (2026-10-14) | https://cables.gl/docs |
| Polygonjs / Polygon | [`polygonjs/`](polygonjs/NOTES.md) | procedural 3D berbasis node (Houdini-like); v2 = Jai→WASM, renderer WebGPU, web app export | Polygon 2.0.65 (2026-10-23) · v1 npm 1.5.98 **maintenance** | https://polygonjs.com/ |
| Blotter.js | [`blotter/`](blotter/NOTES.md) | efek shader khusus teks (liquid, channel split, rolling distort) | 0.1.0, commit terakhir 2019 — **tidak dirawat** | https://blotter.js.org/ |
| WebGPU (+ three TSL) | [`webgpu/`](webgpu/NOTES.md) | compute shader: partikel 100k–1M, fluid, feedback, post node-based; status browser 2026 | gpuweb status 2026-10-02 · three 0.186.1 (dev r187) | https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API |

Shared reference (jangan di-clone ulang): `../_shared/mdn-content/files/en-us/web/api/webgl_api/` (tutorial +
`webgl_best_practices/index.md`) dan `../_shared/mdn-content/files/en-us/web/api/webgpu_api/index.md`.

## Pilih yang mana?

| Kebutuhan | Pilih | Kenapa / kapan pindah |
|---|---|---|
| Foto di grid editorial bergelombang saat scroll, ripple saat hover, layout tetap CSS | **curtains.js** (WebGL, jalan di semua browser) | Perlu WebGPU/compute → **gpu-curtains** + fallback `<img>`; ribuan item → PixiJS |
| Hero/background shader cantik, iterasi oleh desainer, tanpa coding shader | **Unicorn Studio** | Butuh kontrol penuh/bebas lisensi runtime → OGL + LYGIA |
| Background shader kustom super ringan (gradient, noise, warp) | **OGL** `Triangle` + fungsi dari **LYGIA/IQ** | Butuh sync ke elemen DOM → curtains |
| Ribuan sprite/teks 2D, displacement map interaktif, filter siap pakai | **PixiJS v8** + pixi-filters | Gerak partikel di GPU (bukan CPU) → WebGPU/TSL |
| Kursor yang "mengaduk" gambar (flowmap / fluid) | **OGL** `Flowmap` / fluid example; di DOM: curtains `PingPongPlane` | WebGPU: gpu-curtains `PingPongPlane` (`rgba16float`) |
| Partikel 100k+ yang bereaksi (gravity, attractor, mouse) | **three `WebGPURenderer` + TSL** (fallback WebGL2 otomatis) | Bundle minimal → WebGPU mentah (resep compat-safe di `webgpu/`); WebGL-only → OGL GPGPU (65k) |
| Visual generatif/audio-reaktif dirakit node, diekspor ke web | **cables.gl** | Butuh kode yang bisa di-review/diff → OGL/three |
| Geometri procedural 3D (scatter, SDF, voronoi) untuk web | **Polygon v2** (web export butuh lisensi) | Proyek lama three-based → v1 (maintenance) |
| Judul dengan efek shader | **Jangan Blotter untuk produksi baru** → OGL MSDF `Text`, canvas-text plane (curtains/gpu-curtains), Pixi `SplitText` + filters, atau SVG `feDisplacementMap` di DOM | Blotter cuma untuk referensi/prototipe |
| Belajar / menulis fungsi shader sendiri | **Book of Shaders** (urutan belajar) → **IQ** (formula presisi) → **LYGIA** (siap `#include`) | Cek lisensi LYGIA untuk proyek komersial |

## Peta teknik "visual eksperimental" → resep lokal

| Teknik | Di mana resepnya |
|---|---|
| DOM → WebGL plane sync (ukuran px, offset scroll tanpa reflow) | `curtainsjs/NOTES.md` (mental model + Lenis wiring), `pixijs/NOTES.md` (DOM→Pixi), `ogl/NOTES.md` (konversi manual) |
| Distorsi dari **velocity** scroll (peak-hold + slow release) | `curtainsjs` resep 1–2, `gpu-curtains` `examples/multiple-planes`, `webgpu` resep 3 (afterImage damp dari velocity) |
| Transisi gambar via displacement map | `curtainsjs` resep 3, `pixijs` DisplacementFilter, `lygia` `distort/displace` |
| Noise distortion / domain warp | `book-of-shaders` (bab 11–13), `inigo-quilez` (warp, fbm), `lygia` (snoise, psrdnoise, curl) |
| RGB shift / chromatic aberration | `curtainsjs` resep 6 (ShaderPass), `webgpu` resep 4 (TSL `rgbShift`), `pixijs` RGBSplitFilter, `lygia` `distort/chromaAB` |
| Hover ripple | `curtainsjs` resep 4, `pixijs` ShockwaveFilter |
| Ping-pong FBO trail / feedback | `ogl` resep 1–2 (Flowmap, RenderTarget swap), `curtainsjs` resep 5, `webgpu` resep 3 & 5, `pixijs` RenderTexture, `inigo-quilez` feedbackfx |
| Post-processing (bloom, blur, grain) | `ogl` resep 5 (bloom ½ res), curtains ShaderPass/RenderTarget, three `RenderPipeline` (TSL), pixi-filters |
| Partikel GPU | `ogl` resep 4 (GPGPU), `webgpu` resep 1–2, gpu-curtains `examples/compute-particles` |

## Aturan lintas-alat (performa & rasa)

- **DPR cap**: curtains `pixelRatio: Math.min(1.5, devicePixelRatio)` (semua example resmi) · OGL default
  `dpr = 1` (set sendiri, ≤ 2) · Pixi `resolution` + `autoDensity: true` · three `setPixelRatio(Math.min(dpr, 2))` ·
  Unicorn `dpi` 1–1.5. Simulasi/blur/fluid boleh jauh di bawah resolusi layar.
- **Render target mematikan MSAA** (curtains) → `antialias: false` + FXAA pass bila perlu.
- **`alpha: false` bisa mahal** di sebagian platform (MDN best practices) — OGL default `alpha:false`, override.
- **Canvas transparan di atas DOM** → premultiplied: curtains & OGL default `premultipliedAlpha: false`;
  WebGPU `alphaMode: 'premultiplied'` + output `rgb * a`.
- **Lerp per frame ≠ per detik**: konstanta lerp di example (0.5/0.1/0.04) terikat frame-rate; di 120 Hz jadi 2×.
  Pakai `1 - Math.pow(1 - k, dt / 16.67)` atau damping `pow(d, dt * 60)`.
- **Satu loop**: curtains `autoRender:false` + `gsap.ticker.add(curtains.render.bind(curtains))`; Lenis via
  `gsap.ticker.add(t => lenis.raf(t * 1000))` + `lagSmoothing(0)`.
- **Pause**: curtains `disableDrawing()` (scroll tetap memicu `needRender()`), Pixi `app.stop()/start()`,
  three `setAnimationLoop(null)`, OGL/WebGPU cancel rAF, Unicorn `scene.paused` (SDK sudah pause offscreen sendiri).
  Offscreen → `IntersectionObserver`; tab hidden → rAF berhenti sendiri, reset dt saat kembali.
- **prefers-reduced-motion**: bekukan uniform intensitas/waktu, render satu frame, matikan feedback/aberasi;
  fallback gambar asli selalu disiapkan (pola `onError` curtains).

## Lisensi & status yang sering kelewat

- **LYGIA** default **Prosperity 3.0.0** (non-komersial; uji komersial 30 hari) + Patron License untuk sponsor/kontributor
  (`lygia/repo-lygia/LICENSE.md`, README §License). Beberapa file punya header MIT sendiri (lihat `lygia/NOTES.md`).
- **Inigo Quilez**: snippet kode MIT, tapi "mathematical/shader art" butuh lisensi.
- **Unicorn Studio**: runtime proprietary, free plan dengan branding & batas publish; **Polygon v2**: web export butuh lisensi.
- **curtains.js** dan **Polygonjs v1** mode maintenance; **Blotter** tidak dirawat sejak 2019 (lihat catatan XSS di `blotter/NOTES.md`).
- **WebGPU** belum default di Firefox Linux/Android, Chrome Linux non-Intel/NVIDIA, sebagian GPU Android → selalu ada fallback.

## Resep "Kombo Maut" (arsenal) → folder ini

- Editorial/High-Fashion (Lenis + Curtains + SplitType + Barba) → `curtainsjs/` (Integrasi: Lenis, Barba `plane.remove()`).
- Futuristic SaaS (Spline / Unicorn Studio + CSS `@property`) → `unicorn-studio/`.
- Experimental/Interactive Art (p5.js / OGL + Web Audio + MediaPipe) → `ogl/` (+ `lygia/`, `inigo-quilez/`).
