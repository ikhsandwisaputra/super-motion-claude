---
tool: curtains.js (+ gpu-curtains, penerus WebGPU dari author yang sama)
version: curtainsjs 8.1.6 (CHANGELOG 05/02/2024 = 2 Mei 2024; npm latest dicek 2026-10-28; commit terakhir 2025-04-03 cuma "updated showcase links" → mode maintenance) · gpu-curtains 0.17.1 (rilis 2026-10-27, aktif, README masih bertanda "WIP")
official: https://www.curtainsjs.com/documentation.html · https://github.com/martinlaxenaire/curtainsjs · https://github.com/martinlaxenaire/gpu-curtains · https://martinlaxenaire.github.io/gpu-curtains/docs/
local: repo-curtainsjs/src/ · repo-curtainsjs/examples/ · web/*.md (crawl curtainsjs.com, 40 halaman) · repo-gpu-curtains/src/curtains/ · repo-gpu-curtains/examples/ · web/gpu-curtains__*.md
fetched: 2026-10-28
---
# curtains.js — ubah `<img>/<video>/<canvas>` di DOM jadi WebGL plane yang ukuran & posisinya diatur CSS, lalu distorsi pakai shader

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai** kalau layout tetap ditulis di HTML/CSS (grid editorial, galeri, hero image) dan kamu mau tiap gambar
punya shader sendiri: gelombang saat scroll, slideshow dengan displacement map, hover ripple, flowmap kursor,
post-processing sehalaman. Responsif gratis (plane ikut `getBoundingClientRect` elemen), fallback gampang
(`onError` → tampilkan `<img>` asli). Ini resep "High-Fashion / Editorial" di arsenal (Lenis + Curtains + SplitType + Barba).

**Jangan** kalau:
- Butuh scene 3D beneran, model, lighting → three.js / R3F (kategori 11).
- Ribuan sprite/partikel 2D → PixiJS (`../pixijs/NOTES.md`), atau GPGPU di OGL/WebGPU.
- Cuma satu background shader full-screen tanpa sync DOM → OGL `Triangle` (lebih tipis) atau Unicorn Studio (no-code).
- Proyek baru yang harus hidup lama: curtains.js tidak dapat fitur baru sejak 2024 (masih jalan di WebGL1/2).
  Penerusnya **gpu-curtains** (API mirip, WGSL, compute shader) tapi **WebGPU-only** → wajib fallback
  untuk browser tanpa WebGPU (lihat `../webgpu/NOTES.md` untuk status 2026).
- Plane harus mengikuti elemen yang dianimasikan CSS `transform` tiap frame → curtains tidak membaca transform
  CSS; pakai `relativeTranslation`/`rotation`/`scale` milik plane, bukan transform DOM.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Satu `Curtains` = satu canvas + satu loop rAF + satu listener scroll.** Container idealnya `position:fixed`
  seukuran viewport; canvas di-resize ikut container (`autoResize`).
- **Rect DOM di-cache, bukan dibaca tiap frame.** `getBoundingClientRect` dipanggil saat init/resize
  (`plane.updatePosition()`/`resize()` = reflow). Saat scroll, `ScrollManager.updateScrollValues(x,y)` menghitung
  delta lalu `Curtains._updateScroll()` memanggil `plane.updateScrollPosition(delta)` untuk tiap plane dengan
  `watchScroll` + `renderer.needRender()` (src/core/Curtains.js:418–430). Hasilnya: nol reflow per frame →
  sinkron DOM↔WebGL murah.
- **Geometri:** vertex plane di range -1..1 (`aVertexPosition`), lalu diskalakan ke ukuran DOM lewat kamera
  perspektif (fov default 50, kamera di z=1): `world.width = (domW / canvasW) * screenRatio.width / 2`
  (src/core/Plane.js `_setWorldSizes`). `relativeTranslation` dalam **px CSS** dikonversi ke world; translasi Z
  memakai `CSSPerspective = hypot(w/2dpr, h/2dpr) / tan(fov/2)` → geser Z terasa seperti CSS 3D perspective.
- **Tekstur:** `<img data-sampler="uFoo">` → sampler `uFoo` + matrix `uFooMatrix`; default `uSampler0` +
  `uTextureMatrix0` (src/core/Texture.js:340–343). Matrix ini yang bikin efek **object-fit: cover** — UV hasil
  `(uFooMatrix * vec4(aTextureCoord,0,1)).xy` bisa keluar 0..1. Untuk mask/displacement map pakai
  `aTextureCoord` mentah, untuk foto pakai UV yang sudah dikali matrix.
- **Frustum culling per plane:** plane di luar canvas tidak di-draw (`onLeaveView`/`onReEnterView`). Kalau vertex
  shader menggeser vertex keluar bounding box, isi `drawCheckMargins` (px) supaya tidak "pop".
- **Render target mematikan MSAA bawaan.** Begitu ada `ShaderPass`/`RenderTarget`, set `antialias:false` di
  Curtains (hemat) lalu tambahkan `FXAAPass` kalau tepi bergerigi.
- **On-demand rendering:** `disableDrawing()` membekukan scene (uniform tidak ter-upload), `needRender()` = render
  satu frame, `enableDrawing()` = lanjut. Scroll otomatis memanggil `needRender()`, jadi scene statis tetap
  sinkron saat discroll walau drawing dimatikan.
- **Doc vs source:** halaman docs bilang param Plane `watchScroll` default `false`, tapi source default **`true`**
  (src/core/Plane.js:86). Percaya source.
- **gpu-curtains** memakai model yang sama (DOM rect cache + scroll delta + frustum culling OBB) tapi data uniform
  dikemas `struct` → buffer WGSL; pipeline async; ada `ComputePass`, `PingPongPlane`, `ShaderPass`, MRT.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

**curtains.js 8.1.6** (ESM: `"exports": "./src/index.mjs"`, `"type": "module"`):

```html
<div id="canvas"></div>  <!-- CSS: position:fixed; inset:0; pointer-events:none; -->
<div class="plane"><img src="a.jpg" crossorigin="" data-sampler="planeTexture" /></div>
```
```js
import { Curtains, Plane } from 'curtainsjs'

const curtains = new Curtains({
  container: 'canvas',                               // id atau HTMLElement
  pixelRatio: Math.min(1.5, window.devicePixelRatio), // pola semua example resmi
  antialias: false,                                   // kalau nanti pakai ShaderPass/RenderTarget
  // watchScroll: false  → kalau scroll dikendalikan Lenis (lihat Integrasi)
})
curtains.onError(() => document.body.classList.add('no-curtains')) // CSS: tampilkan <img> asli
        .onContextLost(() => curtains.restoreContext())

const vs = `precision mediump float;
attribute vec3 aVertexPosition; attribute vec2 aTextureCoord;
uniform mat4 uMVMatrix; uniform mat4 uPMatrix; uniform mat4 planeTextureMatrix;
varying vec2 vTextureCoord; varying vec2 vUv;
void main(){
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vUv = aTextureCoord;                                                   // 0..1 mentah
  vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy; // "cover"
}`
const fs = `precision mediump float;
varying vec2 vTextureCoord; uniform sampler2D planeTexture; uniform float uTime;
void main(){ gl_FragColor = texture2D(planeTexture, vTextureCoord); }`

const el = document.querySelector('.plane')
const plane = new Plane(curtains, el, {
  vertexShader: vs, fragmentShader: fs,
  widthSegments: 20, heightSegments: 20,           // default 1x1 — perlu segmen kalau vertex di-deform
  uniforms: { time: { name: 'uTime', type: '1f', value: 0 } }, // type: 1f..4f, 1i..4i, *fv, mat2/3/4
})
plane.onReady(() => el.classList.add('is-gl'))     // sembunyikan <img> asli setelah siap
     .onRender(() => { plane.uniforms.time.value += 1 })

// cleanup (SPA/Barba): plane.remove(); curtains.dispose()  // dispose = stop rAF, hapus plane, buang context
```

**gpu-curtains 0.17.1** (WebGPU, async):

```js
import { GPUCurtains, Plane } from 'gpu-curtains'
const gpuCurtains = new GPUCurtains({
  container: '#canvas',
  pixelRatio: Math.min(1.5, window.devicePixelRatio),
  adapterOptions: { minFeatureLevel: 'compatibility' }, // dipakai example resmi → jalan di device "compat"
}).onError(() => document.body.classList.add('no-curtains'))
await gpuCurtains.setDevice()

const vs = /* wgsl */ `
struct VSOutput { @builtin(position) position: vec4f, @location(0) uv: vec2f };
@vertex fn main(attributes: Attributes) -> VSOutput {
  var o: VSOutput;
  var p = attributes.position;
  p.y += sin((p.x * 0.5 + 0.5) * 3.141592) * sin(deformation.strength / 90.0);
  o.position = getOutputPosition(p);
  o.uv = getUVCover(attributes.uv, texturesMatrices.planeTexture.matrix);
  return o;
}`
const fs = /* wgsl */ `
struct VSOutput { @builtin(position) position: vec4f, @location(0) uv: vec2f };
@fragment fn main(fsInput: VSOutput) -> @location(0) vec4f {
  return textureSample(planeTexture, defaultSampler, fsInput.uv);
}`
const plane = new Plane(gpuCurtains, document.querySelector('.plane'), { // <img data-texture-name="planeTexture">
  widthSegments: 10, heightSegments: 10,
  DOMFrustumMargins: { top: 100, right: 0, bottom: 100, left: 0 },
  shaders: { vertex: { code: vs }, fragment: { code: fs } },
  uniforms: { deformation: { struct: { strength: { type: 'f32', value: 0 } } } },
})
plane.onRender(() => { plane.uniforms.deformation.strength.value = scrollEffect })
// cleanup: plane.remove(); gpuCurtains.destroy()
```
Beda penting: `gpuCurtains.updateScrollValues({ x, y })` menerima **objek**, curtains.js `updateScrollValues(x, y)`
dua angka; delta di gpu-curtains dibaca dari getter `gpuCurtains.scrollDelta`, di curtains.js dari
`curtains.getScrollDeltas()`.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Default | Efek ke feel | Rentang bagus |
|---|---|---|---|
| `pixelRatio` (Curtains) | `devicePixelRatio` | ketajaman vs fill-rate | `Math.min(1.5, dpr)` (semua example) |
| `renderingScale` | 1 (min 0.25) | render lebih kecil lalu di-upscale | 0.5–0.75 untuk blur/fluid bg |
| `widthSegments/heightSegments` | 1 | kelenturan "kain" saat deform | 10 (example scroll) – 30 |
| `fov` (Plane) | 50 | dramatisnya rotasi/Z | 20–35 = datar elegan, 70+ = wide/dramatis |
| `transformOrigin` | (0.5,0.5,0) | poros rotasi; z≠0 = ayunan di belakang/depan plane | z negatif → efek "wheel" |
| `drawCheckMargins` | 0 | cegah popping saat vertex keluar rect | ≈ amplitudo deform dalam px (example: 100) |
| clamp delta scroll | (example) ±60 | batas intensitas distorsi | 40–80 |
| attack lerp (peak-hold) | (example) 0.5 | seberapa cepat efek naik | 0.3–0.6 |
| release lerp ke 0 per frame | (example) 0.1 / 0.075 / 0.05 | "jelly" saat berhenti | 0.05 (melayang) – 0.15 (snappy) |
| `PingPongPlane` dissipation | (example) 0.925; gpu-curtains 0.975 | panjang jejak kursor | 0.9 (pendek) – 0.98 (panjang) |
| `texture.scale` | (1,1) | zoom foto di dalam "frame" plane | 1–1.4 saat velocity |
| `Texture.anisotropy` | 1 | ketajaman tekstur miring/terdistorsi | 8–16 |
| `floatingPoint` (Texture) | "none" | presisi FBO feedback | "half-float" untuk flowmap/trail |

Catatan lerp per-frame: `curtains.lerp(a, b, k)` dipanggil di `onRender` → laju bergantung frame-rate (120 Hz
terasa 2× lebih cepat). Untuk konsistensi: `k' = 1 - Math.pow(1 - k, dtMs / 16.67)`.

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

**Lenis 1.3.x → curtains.js** (payload event `scroll` Lenis = instance Lenis itu sendiri:
`this.emitter.emit('scroll', this)` di `01-scroll-transitions/lenis/repo-lenis/packages/core/src/lenis.ts:616`):
```js
const curtains = new Curtains({ container: 'canvas', watchScroll: false })
const lenis = new Lenis({ autoRaf: true })
lenis.on('scroll', (l) => {
  curtains.updateScrollValues(0, l.scroll) // planes digeser via delta + needRender(), tanpa reflow
  scrollVel = l.velocity                    // velocity Lenis sudah halus → bisa langsung jadi uniform
})
```
**Lenis → gpu-curtains** (persis example resmi `examples/custom-scroll-and-transformations/main.js`):
```js
const gpuCurtains = new GPUCurtains({ container: '#canvas', watchScroll: false })
await gpuCurtains.setDevice()
gpuCurtains.onBeforeRender(() => lenis.raf(performance.now())) // komentar resmi: "should be hooked on a gsap ticker instead"
lenis.on('scroll', (scroll) => gpuCurtains.updateScrollValues({ x: 0, y: scroll.scroll }))
```
- **Satu loop saja (GSAP)** — persis example resmi `gsap-click-to-fullscreen-gallery`:
  ```js
  const curtains = new Curtains({ container: 'canvas', autoRender: false }) // "use gsap ticker to render our scene"
  gsap.ticker.add(curtains.render.bind(curtains))  // ticker GSAP menangani refresh rate berbeda
  ```
  Kalau Lenis juga dipakai: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t * 1000))`
  + `gsap.ticker.lagSmoothing(0)` (README Lenis) → Lenis, ScrollTrigger, dan curtains di satu tick.
- **GSAP tween:** tween objek proxy, lalu di `onUpdate` panggil `plane.setScale(vec2)`,
  `plane.setRelativeTranslation(vec3)`, `plane.textures[0].setScale(vec2)`, `plane.uniforms.x.value = ...`
  (pola example yang sama; reuse `Vec2/Vec3` di luar onUpdate supaya tanpa alokasi per frame).
- **Barba/Swup/View Transitions:** sebelum DOM lama dibuang → `plane.remove()` untuk tiap plane; setelah DOM baru
  masuk → `new Plane(...)` lagi; `curtains.resize()` kalau ukuran container berubah tanpa resize window.
  Example: `examples/ajax-navigation-with-plane-removal` (gpu-curtains juga punya `view-transitions-api-utils.js`).
- **R3F:** tidak cocok dicampur (dua context). Kalau sudah di R3F, pakai pola "DOM-tracked view" di sana.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Scroll-velocity bend (peak-hold + slow release)** — dari `examples/post-processing-displacement`:
```js
let deform = 0
curtains.onRender(() => { deform = curtains.lerp(deform, 0, 0.1) })   // release
  .onScroll(() => {
    const d = curtains.getScrollDeltas(); d.y = -d.y                 // delta = prev - current
    d.y = Math.max(-60, Math.min(60, d.y))                            // clamp
    if (Math.abs(d.y) > Math.abs(deform)) deform = curtains.lerp(deform, d.y, 0.5) // attack hanya naik
  })
plane.onRender(() => { plane.uniforms.deform.value = deform })
// VS: vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * sin(uPlaneDeformation / 90.0);
```
Kenapa mahal: envelope asimetris (naik cepat, turun pelan) bikin gambar terasa punya massa, bukan sekadar ikut scroll.

**2. Parallax + zoom di dalam frame tanpa reflow** — dari `examples/multiple-planes-scroll-effect-custom-scroll`:
```js
function parallax(plane) {                       // panggil di onReady + onAfterResize
  const scene = curtains.getBoundingRect(), r = plane.getBoundingRect()
  const p = (r.top + r.height / 2 - scene.height / 2) / scene.height
  plane.relativeTranslation.y = p * scene.height / 4
}
plane.onRender(() => {
  plane.rotation.z = Math.abs(scrollEffect) / 750
  plane.scale.y = 1 + Math.abs(scrollEffect) / 300
  plane.textures[0].scale.y = 1 + Math.abs(scrollEffect) / 150   // foto "memanjang" di dalam mask
})
// variasi example GSAP gallery: parallax foto DI DALAM frame (texture di-scale > 1 dulu, mis. 1.5)
// texture.offset.y = (1 - texture.scale.y) * 0.5 * parallaxEffect   // dipanggil di curtains.onScroll
```
Kenapa mahal: plane, tekstur, dan DOM bergerak dengan 3 laju berbeda → kedalaman tanpa 3D.

**3. Displacement-map slideshow (hemat baterai)** — dari `examples/multiple-textures`:
```js
curtains.disableDrawing()                                  // idle = 0 draw call
const active = plane.createTexture({ sampler: 'activeTex', fromTexture: plane.textures[1] })
const next   = plane.createTexture({ sampler: 'nextTex',   fromTexture: plane.textures[2] })
el.addEventListener('click', () => {
  curtains.enableDrawing(); next.setSource(plane.images[n])
  setTimeout(() => { curtains.disableDrawing(); active.setSource(plane.images[n]); t = 0 }, 1700)
})
plane.onRender(() => { t += (90 - t) * 0.04; plane.uniforms.transitionTimer.value = t })
```
```glsl
vec4 disp = texture2D(displacement, vTextureCoord);          // map pakai UV mentah
vec2 a = vActiveTextureCoord + disp.r * ((cos((uTransitionTimer + 90.0) / (90.0 / 3.141592)) + 1.0) / 1.25);
vec2 b = vNextTextureCoord   - disp.r * ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 1.25);
vec4 c = mix(texture2D(activeTex, vec2(vActiveTextureCoord.x, a.y)),
             texture2D(nextTex,   vec2(vNextTextureCoord.x,   b.y)),
             1.0 - ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 2.0));
gl_FragColor = vec4(c.rgb * c.a, c.a);                       // premultiply manual
```
Kenapa mahal: dua gambar "meleleh" berlawanan arah sepanjang luma map, bukan cross-fade.

**4. Hover ripple yang tahu posisi kursor** (pola `mouseToPlaneCoords`; angka = titik awal tuning):
```js
import { Vec2 } from 'curtainsjs'
const mouse = new Vec2(), hover = { v: 0, target: 0 }
// params Plane: uniforms: { mouse: { name: 'uMouse', type: '2f', value: new Vec2() },
//   hover: { name: 'uHover', type: '1f', value: 0 }, aspect: { name: 'uAspect', type: '1f', value: w / h },
//   time: { name: 'uTime', type: '1f', value: 0 } }   (uAspect = rect plane, update di onAfterResize)
el.addEventListener('pointermove', (e) => mouse.set(e.clientX, e.clientY))
el.addEventListener('pointerenter', () => hover.target = 1)
el.addEventListener('pointerleave', () => hover.target = 0)
plane.onRender(() => {
  hover.v = curtains.lerp(hover.v, hover.target, 0.08)
  plane.uniforms.mouse.value = plane.mouseToPlaneCoords(mouse) // -1..1, Y terbalik (atas = +1)
  plane.uniforms.hover.value = hover.v
})
```
```glsl
vec2 m = vec2(uMouse.x, uMouse.y) * 0.5 + 0.5;                 // ke 0..1 (y atas=1, cocok dgn aTextureCoord)
vec2 d = vUv - m; d.x *= uAspect;
float r = length(d);
float wave = sin(r * 40.0 - uTime * 0.12) * exp(-r * 6.0) * uHover; // uTime di sini = frame count
vec2 uv = vTextureCoord + normalize(d + 1e-5) * wave * 0.015;
gl_FragColor = texture2D(planeTexture, uv);
```
Kenapa mahal: riak berasal dari titik masuk kursor dan meredam dengan `exp`, bukan wobble seragam.

**5. Flowmap kursor (ping-pong FBO)** — dari `examples/ping-pong-shading-flowmap`:
```js
const flow = new PingPongPlane(curtains, el, {
  sampler: 'uFlowMap', vertexShader: flowVs, fragmentShader: flowFs,
  texturesOptions: { floatingPoint: 'half-float' },
  uniforms: { mousePosition: { name: 'uMousePosition', type: '2f', value: mouse },
              fallOff: { name: 'uFalloff', type: '1f', value: ww > wh ? ww / 30000 : wh / 20000 },
              dissipation: { name: 'uDissipation', type: '1f', value: 0.925 },
              velocity: { name: 'uVelocity', type: '2f', value: velocity },
              aspect: { name: 'uAspect', type: '1f', value: ww / wh } },
})
// onmousemove: velocity.set((x - lastX) / 16, (y - lastY) / 16)
flow.onRender(() => {
  flow.uniforms.mousePosition.value = flow.mouseToPlaneCoords(mouse)
  if (!moved) velocity.set(curtains.lerp(velocity.x, 0, 0.5), curtains.lerp(velocity.y, 0, 0.5))
  moved = false
  flow.uniforms.velocity.value = new Vec2(curtains.lerp(velocity.x, 0, 0.1), curtains.lerp(velocity.y, 0, 0.1))
})
const flowTex = imagePlane.createTexture({ sampler: 'uFlowTexture', fromTexture: flow.getTexture() })
// FS gambar: distortedCoords -= texture2D(uFlowTexture, vTextureCoord).xy * 0.1;
```
FS flowmap intinya: `color = texture2D(uFlowMap, uv) * uDissipation; stamp = vec3(uVelocity * vec2(1,-1),
1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0)); color.rgb = mix(color.rgb, stamp, smoothstep(uFalloff, 0.0,
length(cursor)) * uAlpha);`. Kenapa mahal: distorsi punya memori (feedback buffer) — jejak memudar, bukan hilang.

**6. Post-pass RGB shift dari velocity scroll** (ShaderPass default memberi `uRenderTexture`):
```js
const pass = new ShaderPass(curtains, { fragmentShader: rgbFs,
  uniforms: { vel: { name: 'uVel', type: '1f', value: 0 } } })
pass.onRender(() => { pass.uniforms.vel.value = deform / 60 })  // -1..1 dari resep 1
```
```glsl
precision mediump float; varying vec2 vTextureCoord; uniform sampler2D uRenderTexture; uniform float uVel;
void main(){
  vec2 o = vec2(0.0, uVel * 0.012);
  gl_FragColor = vec4(texture2D(uRenderTexture, vTextureCoord + o).r,
                      texture2D(uRenderTexture, vTextureCoord).g,
                      texture2D(uRenderTexture, vTextureCoord - o).b,
                      texture2D(uRenderTexture, vTextureCoord).a);
}
```
Kenapa mahal: aberasi hanya muncul saat bergerak dan searah gerak → terbaca sebagai "kecepatan", bukan filter.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **DPR cap** `Math.min(1.5, devicePixelRatio)` + `renderingScale` < 1 untuk efek blur/fluid.
- **Satu rAF + satu scroll listener** di seluruh app (docs "Performance tips"): hook ke `onRender`/`onScroll`
  atau matikan (`autoRender:false`, `watchScroll:false`) dan panggil sendiri.
- **Idle = matikan:** `disableDrawing()` saat tidak ada animasi; scroll tetap memicu `needRender()`.
  Pause saat tab hidden: rAF berhenti sendiri; untuk offscreen section pakai `IntersectionObserver` →
  `disableDrawing()/enableDrawing()`.
- **Texture canvas/video di-upload ulang tiap frame** → `texture.shouldUpdate = false` saat tidak terlihat.
  Selalu `crossorigin=""` di `<img>/<video>` (mencegah load dobel). Resize gambar ke ukuran plane maksimum.
- **Render target = no MSAA** → `antialias:false` + `FXAAPass` bila perlu; ShaderPass mahal, batasi jumlahnya.
- **Mobile:** video autoplay butuh gesture; ada lag sinkron scroll di mobile (lihat diskusi GitHub #75 yang
  dirujuk docs); example locomotive memakai native scroll di mobile (`watchScroll: smoothScroll.isMobile`).
- **Context lost:** selalu `onContextLost(() => curtains.restoreContext())`.
- **prefers-reduced-motion:** jangan render distorsi kontinu — set uniform intensitas ke 0, render sekali
  (`needRender()`), lalu `disableDrawing()`; atau skip WebGL dan biarkan `<img>` asli (pola `onError`).
- **Browser:** curtains.js = WebGL1/WebGL2 (`curtains.isWebGL2()`), praktis semua browser. gpu-curtains butuh
  WebGPU: Chrome/Edge 113+ desktop, Android 12+ (121+), Safari 26, Firefox 141 (Windows) / 145–147 (macOS);
  Linux & Firefox Android masih parsial (detail: `../webgpu/NOTES.md`). `minFeatureLevel: 'compatibility'`
  menjangkau device lama, tapi tetap sediakan fallback `<img>`.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `web/get-started.md` — setup, shader wajib, texture matrix, `data-sampler`, scroll manual, performance tips.
- `web/curtains-class.md` — semua param/method/event Curtains (scroll, drawing on-demand, context).
- `web/plane-class.md` — param Plane, transform reactive, `mouseToPlaneCoords`, event view.
- `web/shader-pass-class.md` · `web/render-target-class.md` · `web/ping-pong-plane-class.md` — post & FBO.
- `web/texture-class.md` — options tekstur (anisotropy, floatingPoint, scale/offset, shouldUpdate).
- `repo-curtainsjs/src/core/Plane.js` — default param asli (watchScroll true), DOM→world mapping.
- `repo-curtainsjs/src/utils/ScrollManager.js` · `src/core/Curtains.js` — alur scroll delta → plane.
- `repo-curtainsjs/examples/post-processing-displacement/js/*.js` — velocity bend + displacement post.
- `repo-curtainsjs/examples/multiple-planes-scroll-effect-custom-scroll/js/*.js` — virtual scroll + parallax.
- `repo-curtainsjs/examples/multiple-textures/js/*.js` — displacement slideshow + disableDrawing.
- `repo-curtainsjs/examples/ping-pong-shading-flowmap/js/flowmap.setup.js` — flowmap kursor.
- `repo-curtainsjs/examples/multiple-planes-canvas-text/` — teks canvas → plane (alternatif shader text).
- `repo-gpu-curtains/README.md` · `web/gpu-curtains__Getting_started.DOM_syncing_usage.md` — setup WebGPU.
- `repo-gpu-curtains/src/curtains/GPUCurtains.ts` — opsi, `scrollDelta`, `updateScrollValues({x,y})`, destroy.
- `repo-gpu-curtains/examples/multiple-planes/main.js` — velocity bend versi WGSL + uniform struct.
- `repo-gpu-curtains/examples/custom-scroll-and-transformations/main.js` — wiring Lenis resmi.
- `repo-gpu-curtains/examples/ping-pong-plane/main.js` — flowmap WGSL, target `rgba16float`.
- `repo-gpu-curtains/examples/compute-particles/main.js` — storage buffer `usage:['vertex']` + ComputePass.
- `repo-gpu-curtains/examples/{slideshow,canvas-text,gsap-instanced-kinetic-typography,webcam-media-stream-ping-pong}/main.js` — resep lanjutan.
- `web/github-releases-gpu-curtains.md` — perubahan v0.12→v0.17 (2025–2026).
