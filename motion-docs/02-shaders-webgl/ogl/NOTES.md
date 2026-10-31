---
tool: OGL
version: 1.0.11 (npm latest dicek 2026-10-28; commit terakhir 2025-04-13 "chore: stencil types" — stabil, rilis jarang)
official: https://github.com/oframe/ogl · https://oframe.github.io/ogl/examples
local: repo-ogl/src/ · repo-ogl/examples/*.html (examples = docs) · repo-ogl/types/ (.d.ts)
fetched: 2026-10-28
---
# OGL — WebGL minimal ala three.js (core 8 KB, total ~29 KB minzip) untuk shader kustom: background full-screen, flowmap/fluid kursor, GPGPU partikel, post-FX, trail

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai** kalau kamu menulis shader sendiri dan bundle three.js terasa kebesaran: background shader full-screen
(`Triangle`), distorsi kursor (`Flowmap`, fluid sim di example), partikel GPGPU (65k titik di example), rantai post
(`Post`), teks MSDF (`Text`), ribbon/garis tebal (`Polyline`). Ini pilihan resep "Experimental / Interactive Art"
(p5.js / OGL + Web Audio + MediaPipe).

**Jangan** kalau:
- Elemen harus menempel ke layout DOM (gambar di grid, scroll-sync) → curtains.js/gpu-curtains (`../curtainsjs/NOTES.md`);
  OGL tidak tahu apa-apa soal DOM, kamu konversi px→clip sendiri.
- Scene graph 2D dengan sprite/teks/event pointer/ribuan objek → PixiJS.
- 3D "beneran" (glTF pipeline lengkap, PBR, shadow, ekosistem drei/postprocessing) → three.js / R3F.
- Perlu WebGPU/compute shader → three.js WebGPURenderer+TSL atau WebGPU mentah (`../webgpu/NOTES.md`).
- Perlu ketahanan context loss otomatis: `Renderer.js` cuma punya komentar TODO, tidak ada handler bawaan.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Lapisan tipis di atas `gl`:** `Renderer` (cache state GL), `Program` (shader + uniform), `Geometry`
  (attribute `{ size, data }`), `Mesh(geometry, program)`, `Transform` (scene graph), `Camera`. Kamu tetap boleh
  memanggil `renderer.gl` mentah.
- **Uniform = objek `{ value }` by reference.** Objek yang sama boleh dipasang ke banyak Program → satu update
  menyebar ke semua (example GPGPU berbagi `const time = { value: 0 }`). `Flowmap`, `GPGPU`, `Post` mengekspos
  `.uniform` yang `.value`-nya ditukar ke tekstur "read" setiap kali update → pasang **objeknya langsung**
  (`tFlow: flowmap.uniform`), jangan dibungkus `{ value: ... }`.
- **Default `Renderer` yang menjebak** (src/core/Renderer.js): `dpr = 1` (bukan devicePixelRatio!), `alpha = false`,
  `antialias = false`, `premultipliedAlpha = false`, `powerPreference = 'default'`, `webgl = 2` (fallback ke WebGL1
  otomatis), `autoClear = true`. `setSize(w, h)` men-set `canvas.width = w * dpr` dan style px.
- **`Program({ transparent: true })`** otomatis set blend: renderer premultiplied → `ONE, ONE_MINUS_SRC_ALPHA`,
  kalau tidak → `SRC_ALPHA, ONE_MINUS_SRC_ALPHA`. Default lain: `cullFace = gl.BACK`, `depthTest/depthWrite = true`.
- **`Triangle`** = satu segitiga raksasa yang menutup clip space (position `-1,-1, 3,-1, -1,3`, uv `0,0, 2,0, 0,2`,
  lihat README) → full-screen pass tanpa diagonal seam quad.
- **`Texture`** default `flipY = true` (TEXTURE_2D), `generateMipmaps = true` → `minFilter = NEAREST_MIPMAP_LINEAR`;
  tekstur tiling butuh `wrapS/wrapT: gl.REPEAT`.
- **Render ke FBO:** `renderer.render({ scene, camera, target, update, sort, frustumCull, clear })` — `target` =
  `RenderTarget`; `clear: false` = akumulasi (dasar feedback/trail; `Flowmap.update()` memakai persis ini).
- **Float FBO:** `Flowmap`/`GPGPU` default `HALF_FLOAT` (`RGBA16F` di WebGL2). Renderer WebGL2 otomatis
  memanggil `EXT_color_buffer_float` + `OES_texture_float_linear`.
- MDN WebGL best practices: `alpha:false` bisa **mahal** di sebagian platform (back buffer RGB diemulasi);
  rekomendasinya `alpha: true` + tulis alpha 1.0. Default OGL justru `alpha:false` → override.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

```js
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl'

const renderer = new Renderer({
  dpr: Math.min(window.devicePixelRatio, 2),  // default 1 → buram di retina kalau lupa
  alpha: true,                                // hindari alpha:false (MDN)
})
const gl = renderer.gl
document.querySelector('#bg').appendChild(gl.canvas)
gl.clearColor(0, 0, 0, 0)

const program = new Program(gl, {
  vertex: /* glsl */ `
    attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`,
  fragment: /* glsl */ `
    precision highp float;
    uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; varying vec2 vUv;
    void main(){
      vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
      float r = length(p - (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0));
      gl_FragColor = vec4(0.5 + 0.5 * cos(uTime + vec3(0, 2, 4) + r * 6.0), 1.0);
    }`,
  uniforms: { uTime: { value: 0 }, uRes: { value: new Vec2() }, uMouse: { value: new Vec2(0.5) } },
})
const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  program.uniforms.uRes.value.set(gl.canvas.width, gl.canvas.height)
}
addEventListener('resize', resize); resize()

let raf = requestAnimationFrame(function loop(t) {
  raf = requestAnimationFrame(loop)
  program.uniforms.uTime.value = t * 0.001
  renderer.render({ scene: mesh })              // tanpa camera untuk full-screen pass
})

// cleanup (SPA): cancelAnimationFrame(raf); removeEventListener('resize', resize)
// program.remove(); mesh.geometry.remove()   // keduanya ada di src (Program.js:229, Geometry.js:284)
// gl.getExtension('WEBGL_lose_context')?.loseContext(); gl.canvas.remove()  // MDN: "Lose contexts eagerly"
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Default | Efek | Rentang bagus |
|---|---|---|---|
| `Renderer.dpr` | 1 | ketajaman vs fill-rate | `Math.min(dpr, 2)`; sim/fluid cukup 1 |
| `Flowmap.size` | 128 | resolusi jejak (kasar = lebih "cair") | 64–256 |
| `Flowmap.falloff` | 0.3 (dikali 0.5 di shader) | radius stempel kursor | 0.15–0.4 |
| `Flowmap.dissipation` | 0.98 | panjang ekor (dekat 1 = lambat pudar) | 0.9–0.985 |
| velocity smoothing (example) | lerp 0.5 saat bergerak, 0.1 saat berhenti | serangan cepat, peluruhan lembut | sama |
| velocity mouse (example) | px/ms, `delta = max(14, dt)` | cegah spike di frame pendek | 14–16 ms |
| Fluid `simRes / dyeRes` | 128 / 512 | detail gerak vs warna | sim 64–128, dye 512–1024 |
| Fluid `densityDissipation / velocityDissipation` | 0.97 / 0.98 | umur tinta / inersia | 0.95–0.99 |
| Fluid `pressureDissipation`, `iterations` | 0.8, 3 | ketegasan tekanan vs biaya | 0.8, 3–20 |
| Fluid `curlStrength`, `radius` | 20, 0.2 | pusaran & ukuran splat | 0–40, 0.1–0.4 |
| GPGPU velocity damping (example) | `velocity *= 0.98` per frame | inersia partikel | 0.9–0.99 |
| `Post({ dpr: 0.5, targetOnly: true })` | dpr renderer | blur/bloom murah di resolusi setengah | 0.25–0.5 |
| Polyline spring/friction (example) | random 0.02–0.1 / 0.7–0.95 | tali kenyal mengikuti kursor | sama |

Semua konstanta di example di-apply **per frame** → ikat ke dt kalau mau konsisten di 120 Hz.

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **GSAP ticker sebagai satu-satunya loop:** `gsap.ticker.add((time) => { program.uniforms.uTime.value = time;
  renderer.render({ scene: mesh }) })` dan jangan buat rAF sendiri (GSAP ticker memberi waktu dalam detik).
  GSAP juga bisa men-tween `program.uniforms.uX` langsung: `gsap.to(program.uniforms.uProgress, { value: 1 })`.
- **Lenis → uniform scroll:** `lenis.on('scroll', (l) => { uScroll.value = l.progress; uVel.value = l.velocity })`
  (payload event = instance Lenis: `lenis.ts:616` di `../../01-scroll-transitions/lenis/`). Kalau Lenis + GSAP:
  `gsap.ticker.add(t => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)` (README Lenis).
- **Elemen DOM ↔ OGL tanpa curtains:** baca `el.getBoundingClientRect()` hanya saat resize, simpan, lalu geser
  berdasarkan scroll → konversi `x_clip = (left + w/2) / innerWidth * 2 - 1`, `y_clip = 1 - (top + h/2 - scrollY) /
  innerHeight * 2` (pola yang sama dengan curtains, lihat mental model di sana).
- **Barba/Swup:** di `leave`, cancel rAF + `program.remove()` + lose context; di `enter`, init ulang.
- **R3F:** tidak — dua context terpisah. Port shader-nya saja.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Flowmap kursor → distorsi gambar** (examples/mouse-flowmap.html):
```js
import { Flowmap, Texture } from 'ogl'
const flowmap = new Flowmap(gl)                      // size 128, falloff 0.3, dissipation 0.98
const tex = new Texture(gl, { wrapS: gl.REPEAT, wrapT: gl.REPEAT })
const img = new Image(); img.onload = () => (tex.image = img); img.src = 'water.jpg'
const program = new Program(gl, { vertex, fragment: /* glsl */ `
  precision highp float; uniform sampler2D tWater; uniform sampler2D tFlow; varying vec2 vUv;
  void main(){
    vec3 flow = texture2D(tFlow, vUv).rgb;        // RG = velocity x/y, B = panjang velocity
    vec2 uv = gl_FragCoord.xy / 600.0 + flow.xy * 0.05;
    gl_FragColor = vec4(texture2D(tWater, uv).rgb, 1.0);
  }`, uniforms: { tWater: { value: tex }, tFlow: flowmap.uniform } }) // ← objek langsung
// mousemove: mouse.set(x / renderer.width, 1 - y / renderer.height);
//            const dt = Math.max(14, now - lastTime); velocity.set(dx / dt, dy / dt); velocity.needsUpdate = true
function update() {
  if (!velocity.needsUpdate) { mouse.set(-1); velocity.set(0) }
  velocity.needsUpdate = false
  flowmap.aspect = innerWidth / innerHeight
  flowmap.mouse.copy(mouse)
  flowmap.velocity.lerp(velocity, velocity.len() ? 0.5 : 0.1)  // asimetris: masuk cepat, keluar lembut
  flowmap.update()
  renderer.render({ scene: mesh })
}
```
Kenapa mahal: distorsi mengikuti arah & kecepatan tangan, dan meninggalkan jejak yang memudar.

**2. Feedback trail (ping-pong `RenderTarget`)** — pola `Flowmap`/`GPGPU`, versi umum:
```js
import { RenderTarget } from 'ogl'
const opts = { width: 512, height: 512, type: gl.HALF_FLOAT, internalFormat: gl.RGBA16F, depth: false }
let read = new RenderTarget(gl, opts), write = new RenderTarget(gl, opts)
const fb = new Program(gl, { vertex, fragment: /* glsl */ `
  precision highp float; uniform sampler2D tPrev; uniform vec2 uMouse; uniform float uDecay; varying vec2 vUv;
  void main(){
    vec2 uv = vUv + (vUv - 0.5) * -0.004;              // sedikit zoom-in tiap frame → jejak "tersedot"
    vec4 prev = texture2D(tPrev, uv) * uDecay;
    float spot = smoothstep(0.06, 0.0, distance(vUv, uMouse));
    gl_FragColor = max(prev, vec4(spot));
  }`, uniforms: { tPrev: { value: read.texture }, uMouse: { value: new Vec2(0.5) }, uDecay: { value: 0.96 } },
  depthTest: false })
const fbMesh = new Mesh(gl, { geometry: new Triangle(gl), program: fb })
function step() {
  fb.uniforms.tPrev.value = read.texture
  renderer.render({ scene: fbMesh, target: write, clear: false })
  ;[read, write] = [write, read]                        // swap
  display.uniforms.tTrail.value = read.texture
}
```
(WebGL2: `HALF_FLOAT`/`RGBA16F` aman karena Renderer sudah memanggil `EXT_color_buffer_float`.)
Kenapa mahal: frame sebelumnya ikut digambar ulang dengan transformasi kecil → gerak punya "afterimage" organik.

**3. Fluid distortion sebagai post** (examples/post-fluid-distortion.html): sim Navier-Stokes ping-pong di
`simRes = 128`, dye `512`, `iterations = 3`, `densityDissipation = 0.97`, `velocityDissipation = 0.98`,
`pressureDissipation = 0.8`, `curlStrength = 20`, `radius = 0.2` (splat `exp(-dot(p,p) / radius) * color`), format
dicek via `getSupportedFormat` (RGBA16F/RG16F/R16F, fallback `NEAREST` kalau linear float tidak didukung). Scene
dirender lewat `new Post(gl)` lalu UV-nya digeser oleh tekstur velocity. Kenapa mahal: kursor terasa menyentuh
cairan yang punya inersia & pusaran, bukan sekadar "warp".

**4. Partikel GPGPU 65k yang lari dari kursor** (examples/gpgpu-particles.html):
```js
const numParticles = 65536
const position = new GPGPU(gl, { data: initialPositionData })   // Float32Array vec4 per partikel
const velocity = new GPGPU(gl, { data: initialVelocityData })
position.addPass({ fragment: positionFragment, uniforms: { uTime: time, tVelocity: velocity.uniform } })
velocity.addPass({ fragment: velocityFragment, uniforms: { uTime: time, uMouse: mouse, tPosition: position.uniform } })
const geometry = new Geometry(gl, { random: { size: 4, data: random }, coords: { size: 2, data: position.coords } })
const points = new Mesh(gl, { geometry, program, mode: gl.POINTS })
// loop: velocity.render(); position.render(); renderer.render({ scene: points, camera })
```
Velocity FS: `strength = smoothstep(0.3, 0.0, length(toMouse)); velocity.xy += strength * normalize(toMouse) * 0.5;
velocity.xy *= 0.98;` · point size `mix(2.0, 15.0, rand) * (1.0 + min(1.0, length(vel)))`.
Kenapa mahal: ukuran & warna partikel bereaksi ke kecepatannya sendiri → kerumunan terasa hidup, bukan noise.

**5. Bloom murah di setengah resolusi** (examples/post-bloom.html):
```js
const postComposite = new Post(gl)
const postBloom = new Post(gl, { dpr: 0.5, targetOnly: true })
postBloom.addPass({ fragment: brightPassFragment, uniforms: { uThreshold: { value: 0.8 } } })
const h = postBloom.addPass({ fragment: blurFragment, uniforms: { uResolution: bloomRes, uDirection: { value: new Vec2(2, 0) } } })
const v = postBloom.addPass({ fragment: blurFragment, uniforms: { uResolution: bloomRes, uDirection: { value: new Vec2(0, 2) } } })
for (let i = 0; i < 5; i++) postBloom.passes.push(h, v)      // pass yang sama dipakai ulang
const composite = postComposite.addPass({ fragment: compositeFragment,
  uniforms: { uResolution: res, tBloom: postBloom.uniform, uBloomStrength: { value: 1.0 } } })
// frame: composite.enabled = false; postComposite.targetOnly = true; postComposite.render({ scene, camera })
//        postBloom.render({ texture: postComposite.uniform.value })
//        composite.enabled = true; postComposite.targetOnly = false; postComposite.render({ texture: postComposite.uniform.value })
```
Kenapa mahal: glow lembar demi lembar (blur 10 pass di 0.5×) tanpa merender scene dua kali.

**6. Tali/ribbon kenyal mengikuti kursor** (examples/polylines.html):
```js
line.polyline = new Polyline(gl, { points, vertex, uniforms: { uColor, uThickness: { value: 20 + Math.random() * 30 } } })
// per frame:
tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring)   // spring 0.02–0.1
line.mouseVelocity.add(tmp).multiply(line.friction)                               // friction 0.7–0.95
line.points[0].add(line.mouseVelocity)
for (let i = 1; i < line.points.length; i++) line.points[i].lerp(line.points[i - 1], 0.9)
line.polyline.updateGeometry()
```
Kenapa mahal: kepala tali pakai pegas (overshoot), ekornya mengikuti → gerak tactile dengan biaya CPU kecil.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **Selalu set `dpr`** (default 1) dengan cap 2; untuk sim/fluid/bloom render di resolusi lebih kecil
  (`Post({ dpr: 0.5 })`, `Flowmap({ size: 128 })`) — gerak cair tidak butuh piksel tajam.
- **Pause:** `cancelAnimationFrame` saat `document.hidden` (rAF juga berhenti sendiri di tab background) dan saat
  canvas keluar viewport (`IntersectionObserver`). Simulasi feedback: saat resume, reset dt supaya tidak loncat.
- **Context loss:** tidak ditangani OGL → dengarkan `webglcontextlost` (preventDefault) /
  `webglcontextrestored` di `gl.canvas` dan buat ulang resource; atau fallback ke gambar statis.
- **Float texture:** WebGL1 butuh `OES_texture_half_float` (+ `_linear` untuk filtering); example fluid
  menurunkan ke `gl.NEAREST` kalau linear tidak tersedia — tiru pola `getSupportedFormat` itu.
- **VRAM budget per piksel** (MDN): hitung `innerWidth*dpr*innerHeight*dpr` dan batasi FBO sesuai itu, terutama
  di mobile.
- **DPR non-integer** (zoom/scaling Windows) bisa moire → `ResizeObserver` `'device-pixel-content-box'` (MDN).
- **prefers-reduced-motion:** set `uTime` beku / amplitudo 0 dan render sekali; matikan flowmap/fluid
  (biarkan gambar asli); jangan pakai feedback trail yang berkedip.
- **Browser:** WebGL2 di semua browser modern, fallback WebGL1 otomatis (`renderer.isWebgl2` untuk cek).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `repo-ogl/README.md` — install, contoh kubus, full-screen triangle manual.
- `repo-ogl/src/core/Renderer.js` — default context, `setSize`, `render({ target, clear })`, ekstensi float.
- `repo-ogl/src/core/Program.js` — default blend/cull/depth, `uniforms`, `remove()`.
- `repo-ogl/src/core/RenderTarget.js` · `src/core/Texture.js` — opsi FBO & tekstur (wrap, filter, flipY, mipmaps).
- `repo-ogl/src/extras/Flowmap.js` — ping-pong flowmap lengkap (contoh paling bersih untuk feedback).
- `repo-ogl/src/extras/GPGPU.js` · `src/extras/Post.js` — kelas ping-pong generik & rantai post.
- `repo-ogl/src/extras/Polyline.js` · `src/extras/Text.js` — ribbon tebal & teks MSDF.
- `repo-ogl/examples/triangle-screen-shader.html` — full-screen shader minimal.
- `repo-ogl/examples/mouse-flowmap.html` — flowmap + velocity kursor.
- `repo-ogl/examples/post-fluid-distortion.html` — fluid sim + distorsi scene.
- `repo-ogl/examples/gpgpu-particles.html` — 65k partikel GPGPU.
- `repo-ogl/examples/post-bloom.html` · `post-fxaa.html` · `render-to-texture.html` · `mrt.html` — post & FBO.
- `repo-ogl/examples/polylines.html` — tali pegas mengikuti kursor.
- `repo-ogl/examples/msdf-text.html` — teks tajam di WebGL (alternatif Blotter).
- `repo-ogl/types/index.d.ts` — tanda tangan TypeScript semua kelas.
- `../../_shared/mdn-content/files/en-us/web/api/webgl_api/webgl_best_practices/index.md` — alpha, DPR, VRAM, lose context.
