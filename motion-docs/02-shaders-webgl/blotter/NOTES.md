---
tool: Blotter.js
version: v0.1.0 (`Blotter.Version = "v0.1.0"` di src/blotter.js; npm `blotter.js` 0.1.0) · commit master terakhir 2019-07-08 · situs gh-pages terakhir 2018-07-16 → **TIDAK DIRAWAT (±7 tahun)** — dicek 2026-10-28
official: https://blotter.js.org/ · https://github.com/bradley/Blotter
local: blotter/repo-Blotter/ (src + build/materials) · blotter/repo-Blotter-wiki/Custom-Materials.md · blotter/repo-Blotter-site-ghpages/ (materials/*.html + src demo situs)
fetched: 2026-10-28
---
# Blotter.js — efek shader untuk teks (liquid, channel split, rolling distort, sliding door, flies) via atlas di 1 WebGL context lalu disalin ke canvas 2D per teks; LEGACY — pakai untuk referensi/prototipe, bukan produksi baru

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Status jujur:** bundle berisi build three.js **custom & lama** + Underscore + EventEmitter + Detector sebagai global (`Gruntfile`/`third_party/`), tanpa ESM, tanpa TypeScript, tanpa rilis sejak 2019; README sendiri: teks dirender ke canvas → **tidak bisa diseleksi**, tidak cocok untuk body text, sebaiknya per kata.

**Masih masuk akal untuk:** prototipe cepat judul pendek dengan material siap pakai; mempelajari pola `mainImage(out vec4, in vec2 fragCoord)` + `textTexture(uv)` (ala Shadertoy) dan trik **per-text uniform dalam satu draw call**.

**Jangan untuk produksi 2026** — alasan teknis terverifikasi dari source:
1. Tiap frame: render atlas → `readRenderTargetPixels` (GPU→CPU stall) → `putImageData` ke setiap canvas 2D. Biaya ∝ luas atlas, setiap frame.
2. Loop rAF jalan terus walau teks di luar viewport (tak ada gating visibilitas; hanya throttling tab background bawaan rAF).
3. Teks diukur dengan `<span>` + `el.innerHTML = textValue` dan canvas fallback juga `innerHTML = text.value` → **jangan pernah** memasukkan string dari user/CMS tanpa sanitasi (XSS, OWASP A03).

**Alternatif modern untuk shader text (terverifikasi dari mirror kategori ini):**

| Opsi | Cara kerja | Kapan | Bukti lokal |
|---|---|---|---|
| **OGL `Text` + MSDF** | glyph quad dari font MSDF (`msdf-bmfont`), fragment `median(r,g,b) - 0.5` + `fwidth` AA; atribut `id` per karakter untuk stagger di vertex shader | teks tajam di semua skala, efek per-huruf di GPU, bundle kecil | `../ogl/repo-ogl/src/extras/Text.js`, `../ogl/repo-ogl/examples/msdf-text.html` |
| **curtains.js canvas-text plane** | gambar teks DOM (computed style) ke canvas 2D → `plane.loadCanvas(canvas)`; texture hanya di-update saat resize | judul editorial yang tetap ada di DOM (SEO/a11y), distorsi scroll/hover | `../curtainsjs/repo-curtainsjs/examples/multiple-planes-canvas-text/js/multiple.planes.canvas.setup.js` |
| **gpu-curtains (WebGPU)** | `plane.createDOMTexture({ name })` + `canvasTexture.loadCanvas(canvas)`; instancing 150 plane + GSAP untuk kinetic typography | efek teks WebGPU + post-pass, mode `compatibility` | `../curtainsjs/repo-gpu-curtains/examples/canvas-text/main.js`, `../curtainsjs/repo-gpu-curtains/examples/gsap-instanced-kinetic-typography/main.js` |
| **PixiJS v8 `SplitText` / `SplitBitmapText` + pixi-filters** | segmen `lines/words/chars` jadi display object; filter `RGBSplitFilter`, `GlitchFilter`, `ShockwaveFilter`, dll. | animasi per-huruf banyak + filter 2D cepat (WebGL/WebGPU) | `../pixijs/repo-pixijs.com/docs/guides/components/scene-objects/text/split-text.md`, `../pixijs/repo-filters/src/` |
| **SVG filter (DOM-only)** | `feTurbulence` → `feDisplacementMap` pada teks HTML asli | tanpa WebGL, teks tetap selectable & terbaca screen reader | `../../_shared/mdn-content/files/en-us/web/svg/reference/element/feturbulence/index.md`, `.../fedisplacementmap/index.md` |
| troika-three-text | SDF text untuk three.js | ekosistem three/R3F | [UNVERIFIED — tidak di-mirror] |

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Satu WebGL context global** untuk semua instance: `Blotter.webglRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false })`.
- Semua `Blotter.Text` yang berbagi material di-*bin-pack* ke satu atlas (`MappingBuilder`) → satu quad full-atlas dirender ke render target RGBA8 → `readRenderTargetPixels` ke `ImageData` → setiap `RenderScope` menyalin bagiannya ke `<canvas class="b-canvas">` hi-DPI miliknya via `putImageData`.
- **Fragment wrapper**: kamu hanya menulis `void mainImage(out vec4 mainImage, in vec2 fragCoord)`. `fragCoord` relatif ke kotak teks (0…lebar/tinggi teks), `uResolution` = ukuran kotak teks itu. Sampel teks pakai `textTexture(uv)` (bukan `texture2D`) — di luar bounds teks hasilnya `vec4(0.0)`.
- **Alpha akhir dikali mask area teks** (`outColor.a *= textAlpha`) → efek **tidak bisa melewati kotak teks**. Ruang untuk distorsi/glow datang dari properti `padding*` (hero situs resmi: `paddingLeft/Right: 60`, `paddingTop/Bottom: 50`).
- **Uniform default** (tersedia di semua material): `uResolution` (2f), `uGlobalTime` (1f, detik sejak `start()`), `uTimeDelta` (1f), `uBlendColor` (4f, default putih), `uPixelRatio` (1f).
- **Tipe uniform publik hanya `"1f"`, `"2f"`, `"3f"`, `"4f"`** (float/vec) — tak ada sampler/int; boolean = 0.0/1.0. Nilai divalidasi (panjang array harus pas) — nilai salah dibuang dengan log error.
- **Per-text uniform**: `blotter.forText(text).material.uniforms.uX.value` menimpa nilai untuk teks itu saja; nilai per-teks dikemas ke data texture `_userUniformsTexture` → banyak teks dengan parameter berbeda tetap **satu draw call**. `material.uniforms.uX.value` = semua teks.
- **Koordinat mouse**: event scope memberi posisi ternormalisasi 0…1 dengan **y dari atas** (DOM), sedangkan `fragCoord` y dari bawah → flip `y` (`1 - y`) saat menyuapkan ke uniform posisi (mis. `uDodgePosition`).
- Ganti isi/gaya teks (`text.value = …; text.needsUpdate = true`) → atlas & material dibangun ulang (mahal) → jangan dianimasikan per frame.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

```html
<script src="path/to/blotter.min.js"></script>              <!-- build/blotter.min.js (bundel three custom + underscore) -->
<script src="path/to/liquidDistortMaterial.js"></script>    <!-- build/materials/*.js -->
<div id="title"></div>
<script>
  const text = new Blotter.Text("Fluid", {
    family: "'Inter', sans-serif", size: 160, weight: 800, leading: 1.0,
    fill: "#111", padding: 40            // ruang untuk distorsi (efek terpotong di kotak teks)
  });
  const material = new Blotter.LiquidDistortMaterial();
  const blotter = new Blotter(material, { texts: text, ratio: Math.min(window.devicePixelRatio, 1.5) });
  const scope = blotter.forText(text);
  scope.appendTo(document.getElementById('title'));       // menyisipkan <canvas class="b-canvas">

  blotter.on('ready', () => {/* atlas siap */});
  material.uniforms.uVolatility.value = 0.25;              // semua teks
  scope.material.uniforms.uSpeed.value = 0.6;              // teks ini saja

  // cleanup
  // blotter.stop(); blotter.teardown(); scope.domElement.remove();
</script>
```
- Opsi `new Blotter(material, opts)`: `texts`, `ratio` (default device pixel ratio), `autobuild`, `autostart`, `autoplay` (default semua `true`).
- `Blotter.Text(value, props)` default: `family 'sans-serif'`, `size 12`, `leading 1.5`, `fill '#000'`, `style 'normal'`, `weight 400`, `padding 0` (+ `paddingTop/Right/Bottom/Left`).
- Lifecycle: `blotter.start()` / `stop()` (cancel rAF) / `teardown()`; `scope.play()` / `pause()` (hanya menghentikan salin ke canvas scope itu — GPU render + readback tetap jalan!). `blotter.addTexts()/removeTexts()`, `blotter.boundsForText(text)`.
- Event: blotter `ready` / `update` / `render`; scope `ready` / `update` / `render(frameCount)` + `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave` (payload `{x, y}` 0…1).
- Material kustom:
```js
const src = `
void mainImage(out vec4 mainImage, in vec2 fragCoord) {
  vec2 uv = fragCoord.xy / uResolution.xy;
  mainImage = vec4(uColor, textTexture(uv).a);
}`;
const custom = new Blotter.ShaderMaterial(src, { uniforms: { uColor: { type: "3f", value: [1, 0, 0] } } });
```
Helper GLSL bisa disisipkan sebagai string: `Blotter.Assets.Shaders.Noise2D/Noise3D/Noise4D/Noise/Random/Easing/Map/Gamma/Blending/LineMath/PI/Inf/BlinnPhongSpecular`.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

Default dari `build/materials/*.js`; rentang = slider di halaman dokumentasi resmi (`repo-Blotter-site-ghpages/src/materials/*.js`).

| Material | Uniform (default → rentang GUI) | Feel |
|---|---|---|
| `ChannelSplitMaterial` | `uOffset` 0.05 (0–1), `uRotation` 45 (0–360°), `uApplyBlur` 1 (bool), `uAnimateNoise` 1 (bool) | RGB split berarah + blur/noise; offset 0.02–0.2 paling elegan |
| `LiquidDistortMaterial` | `uSpeed` 1 (0–5), `uVolatility` 0.15 (0–1), `uSeed` 0.1 (0–20) | `uv += snoise(vec3(uv, uSeed + uGlobalTime*uSpeed)) * uVolatility` — cair; volatility >0.4 = tak terbaca |
| `RollingDistortMaterial` | `uSineDistortSpread` 0.05 (0–1), `uSineDistortCycleCount` 2 (0–7), `uSineDistortAmplitude` 0.25 (0–1), `uNoiseDistortVolatility` 20 (0–250), `uNoiseDistortAmplitude` 0.01 (0–1), `uDistortPosition` [0.5,0.5], `uRotation` 170 (0–360), `uSpeed` 0.08 (0–10) | gelombang "rolling" seperti pita VHS |
| `SlidingDoorMaterial` | `uDivisions` 5 (0–30, step 1), `uDivisionWidth` 0.25 (0–1), `uAnimateHorizontal` 0, `uFlipAnimationDirection` 0, `uSpeed` 0.2 (0–10) | irisan geser bergantian — cocok reveal/hover |
| `FliesMaterial` | `uPointCellWidth` 0.04 (0–0.1), `uPointRadius` 0.75 (0–1), `uDodge` 0, `uDodgePosition` [0.5,0.5], `uDodgeSpread` 0.25 (0–1), `uSpeed` 1 (0–10) | teks jadi kerumunan titik yang menghindar kursor (demo situs: cell 0.035, speed 2) |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **GSAP**: uniform `1f` punya setter `value` (tervalidasi) → bisa di-tween langsung: `gsap.to(material.uniforms.uVolatility, { value: 0.4, duration: 0.6, yoyo: true, repeat: 1 })`. Untuk `2f/3f/4f` tween proxy lalu assign array baru (`u.value = [x, y]`) — setter menolak mutasi parsial. (Opsi GSAP [UNVERIFIED di mirror ini].)
- **Lenis**: velocity → uniform (lihat resep 2); field `scroll` Lenis terverifikasi via docs Unicorn, field lain → NOTES Lenis.
- **Visibility**: tak ada gating bawaan → `IntersectionObserver` (`../../_shared/mdn-content/files/en-us/web/api/intersection_observer_api/`) → `blotter.stop()` / `blotter.start()`.
- **Webfont**: ukuran teks dihitung via `<span>` saat dibuat — buat `Blotter.Text` setelah font termuat (mis. `document.fonts.ready` [UNVERIFIED lokal]) atau set `text.needsUpdate = true` setelahnya.
- **Barba/SPA**: `blotter.stop(); blotter.teardown();` lalu buang canvas scope (situs resmi melakukan `stop()` + `teardown()` di `onDestroy`).
- **R3F/three modern**: jangan campur — Blotter membawa three lama sendiri. Pakai troika/MSDF (lihat tabel alternatif).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Channel split yang "menunjuk" kursor per huruf (hero blotter.js.org)**
```js
// letters: Blotter.Text per huruf, ChannelSplitMaterial bersama
document.addEventListener('mousemove', (e) => {
  const W = document.documentElement.scrollWidth, H = document.documentElement.scrollHeight;
  const mx = e.pageX / W, my = e.pageY / H;
  scopes.forEach((s) => {
    const r = s.domElement.getBoundingClientRect();
    const cx = (r.left + scrollX + r.width / 2) / W, cy = (r.top + scrollY + r.height / 2) / H;
    s.material.uniforms.uRotation.value = 180 + Math.atan2(my - cy, mx - cx) * 180 / Math.PI;
    s.material.uniforms.uOffset.value = Math.min(0.2, Math.hypot(cx - mx, cy - my));
  });
});
```
Kenapa mahal: tiap huruf punya arah & besar aberasi sendiri (satu draw call) — terasa seperti lensa nyata yang mengikuti mata.

**2. Liquid yang ikut kecepatan scroll lalu mengendap**
```js
let last = 0, v = 0;
lenis.on('scroll', ({ scroll }) => { v = Math.abs(scroll - last); last = scroll; });
(function tick() { v *= 0.9;
  material.uniforms.uVolatility.value = 0.05 + Math.min(0.3, v / 200);
  requestAnimationFrame(tick); })();
```
Kenapa mahal: teks "tersiram" saat flick lalu kembali tenang — massa & viskositas terasa.

**3. Reveal sliding-door saat hover (event scope)**
```js
const m = new Blotter.SlidingDoorMaterial();
m.uniforms.uDivisions.value = 7; m.uniforms.uSpeed.value = 0;
scope.on('mouseenter', () => gsap.to(m.uniforms.uSpeed, { value: 1.2, duration: 0.4 }));
scope.on('mouseleave', () => gsap.to(m.uniforms.uSpeed, { value: 0, duration: 0.8, ease: 'power2.out' }));
```
Kenapa mahal: irisan berakselerasi masuk dan mengerem pelan keluar — asimetri ritme, bukan on/off.

**4. Material kustom: RGB shift + grain di dalam padding**
```js
const src = Blotter.Assets.Shaders.Random + `
void mainImage(out vec4 o, in vec2 fragCoord) {
  vec2 uv = fragCoord / uResolution;
  float s = uShift / uResolution.x * 40.0;
  float r = textTexture(uv + vec2(s, 0.)).r, g = textTexture(uv).g, b = textTexture(uv - vec2(s, 0.)).b;
  float a = textTexture(uv + vec2(s,0.)).a + textTexture(uv).a + textTexture(uv - vec2(s,0.)).a;
  float n = random(uv * uResolution + uGlobalTime) * 0.08;
  o = vec4(vec3(r, g, b) + n, min(a, 1.0));
}`;
const mat = new Blotter.ShaderMaterial(src, { uniforms: { uShift: { type: "1f", value: 0.5 } } });
```
(`random(in vec2)` & `random(in float)` terverifikasi di `repo-Blotter/src/assets/shaders/random.js`; `snoise(vec2|vec3)` ada di `Noise2D/Noise3D`.) Kenapa mahal: aberasi kromatik + grain halus membuat judul terasa "difoto", bukan digambar vektor.

**5. Hemat GPU: stop saat offscreen**
```js
new IntersectionObserver(([e]) => e.isIntersecting ? blotter.start() : blotter.stop())
  .observe(scope.domElement);
```
Kenapa mahal: readback per frame berhenti saat tak terlihat — scroll halaman tetap 60 fps.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- Biaya utama = **readPixels + putImageData tiap frame** untuk seluruh atlas. Kecilkan atlas: sedikit teks per instance, `size` secukupnya, `ratio` ≤ 1.5, padding secukupnya. `scope.pause()` tidak menghemat GPU — pakai `blotter.stop()`.
- Satu context untuk semua instance (hemat budget context), tapi material berbeda = rebuild/mapping terpisah.
- **prefers-reduced-motion** (`../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md`): set `uSpeed`/`uVolatility` ke 0 lalu `blotter.stop()` setelah `ready` (frame statis tetap tampil di canvas), atau tampilkan teks DOM biasa.
- **A11y/SEO**: teks di canvas tak bisa diseleksi; pertahankan heading asli di DOM (visually-hidden) dan tandai canvas dekoratif (`aria-hidden`) — Blotter menaruh `text.value` sebagai fallback content canvas, perilaku screen reader terhadapnya [UNVERIFIED].
- **Keamanan**: `Blotter.Text` memakai `innerHTML` → sanitasi/escape semua input dinamis.
- **Mobile**: `ratio` default = devicePixelRatio (3× di ponsel → atlas 9× pixel) → batasi `ratio`. Tanpa WebGL, constructor memanggil `Messaging.throwError("device does not support webgl")` → bungkus try/catch dan fallback ke teks DOM.
- **Browser**: three.js custom era 2017–2018 (WebGL1); tidak diuji pada browser 2026 — risiko deprecation (mis. `Detector`) tanggung sendiri.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `repo-Blotter/README.md` — overview, cara pakai, batasan (canvas, bukan teks selectable), custom build.
- `repo-Blotter/src/blotter.js` — constructor/opsi, start/stop/teardown, forText, update pipeline, context global.
- `repo-Blotter/src/rendering/renderer.js` — loop rAF + `readRenderTargetPixels` (sumber biaya per frame).
- `repo-Blotter/src/rendering/renderScope.js` — canvas per teks, play/pause, event mouse, uniform per-scope.
- `repo-Blotter/src/builders/mappingMaterialBuilder.js` — wrapper fragment: `textTexture`, `mainImage`, uniform per-teks via data texture.
- `repo-Blotter/src/extras/uniformUtils.js` — tipe uniform yang diizinkan + uniform default.
- `repo-Blotter/src/extras/textUtils.js` — default properti teks + pengukuran via `<span>`/innerHTML.
- `repo-Blotter/build/materials/*.js` — 5 material siap pakai (GLSL + uniform default).
- `repo-Blotter-wiki/Custom-Materials.md` — panduan resmi material kustom (`Blotter.ShaderMaterial`).
- `repo-Blotter-site-ghpages/src/materials/*.js` — rentang slider resmi tiap uniform.
- `repo-Blotter-site-ghpages/src/hero_examples/ChannelSplitMaterial.js` — resep mouse-angle channel split.
- `repo-Blotter-site-ghpages/materials/*.html` — halaman dokumentasi material (statis).
