---
tool: WebGPU (API browser + WGSL) · jalur high-level: three.js WebGPURenderer + TSL · DOM-sync: gpu-curtains
version: status implementasi gpuweb wiki (edit 2026-10-02) · three.js npm 0.186.1 (repo dev @83f6bd0, 2026-10-28, migration guide sudah sampai 186→187) · webgpufundamentals @6b5e65f (2026-08-21) · MDN mirror bersama
official: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API · https://github.com/gpuweb/gpuweb/wiki/Implementation-Status · https://webgpufundamentals.org · https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language
local: ../../_shared/mdn-content/files/en-us/web/api/webgpu_api/index.md · repo-webgpufundamentals/webgpu/lessons/*.md (67 lesson EN) · repo-threejs-wiki/Three.js-Shading-Language.md · repo-threejs-wiki/Migration-Guide.md · web/threejs-docs__*.md · web/threejs-example__*.html · web/gpuweb-implementation-status.md
fetched: 2026-10-28
---
# WebGPU — API GPU generasi baru (render + **compute**) untuk partikel ratusan ribu, fluid, feedback & post-FX; tulis mentah (WGSL) atau lewat three.js TSL

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai** kalau butuh **compute shader**: partikel 100k–jutaan yang saling bereaksi, boids, fluid, reaction-diffusion,
blur/histogram di GPU, indirect drawing, banyak draw call (render bundle). Jalur paling produktif 2026:
**three.js `WebGPURenderer` + TSL** (satu kode → WGSL di WebGPU, GLSL di fallback WebGL2) atau **gpu-curtains**
kalau efeknya menempel ke elemen DOM (`../curtainsjs/NOTES.md`). WebGPU mentah kalau mau kontrol penuh / bundle kecil.

**Jangan** (atau sediakan fallback) kalau:
- Efeknya cuma distorsi gambar/teks, background shader, flowmap → WebGL (OGL, curtains.js, PixiJS) sudah ada di
  semua browser dan lebih murah dikirim.
- Audiens banyak di Firefox Linux/Android, Safari < 26, Chrome Linux non-Intel/NVIDIA, GPU Android tertentu
  (lihat tabel di bawah) — WebGPU di sana belum default.
- Halaman bukan **secure context** (HTTPS/localhost): seluruh API tidak tersedia (MDN).

**Dukungan browser (gpuweb wiki, diedit 2026-10-02):**

| Browser | Status default |
|---|---|
| Chrome/Edge (Mac, Windows x86/x64, ChromeOS) | ✅ sejak 113 |
| Chrome Android | ✅ 121 (ARM/Qualcomm/Intel, Android 12+); Imagination Android 16+ (139); Samsung Xclipse & lainnya TBD |
| Chrome Linux | ✅ Intel Gen12+ (144); NVIDIA driver 535.183.01+ Wayland (147); sisanya di balik flag |
| Chrome Windows ARM64 | di balik flag `chrome://flags/#enable-unsafe-webgpu` |
| Firefox | ✅ Windows 141; ✅ macOS Apple Silicon 145 (macOS 26+), semua versi macOS 147; Mac lain/Linux = Nightly (target Linux 2026); Android = flag |
| Safari | ✅ macOS/iOS/iPadOS/visionOS 26 |
| Compatibility mode (`featureLevel: 'compatibility'`) | shipping di Chrome 146 (2026-02-23) — menjangkau GPU lama setara WebGL2 |

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Async & eksplisit:** `navigator.gpu.requestAdapter()` → `adapter.requestDevice()` → `canvas.getContext('webgpu')`
  → `context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat() })`. `requestDevice` selalu
  mengembalikan device, tapi bisa "mulai dalam keadaan lost" → pasang `device.lost.then(...)`.
- **State dibekukan di pipeline** (shader + layout vertex + blend + format). Buat pipeline sekali di init (mahal);
  per frame hanya: `createCommandEncoder` → compute pass / render pass → `queue.submit`.
- **Data:** uniform buffer default maks **64 KiB** per binding, storage buffer **128 MiB** (lesson storage-buffers).
  Layout memori WGSL punya alignment (mis. `vec3f` 16-byte) — pakai offset computer di lesson memory-layout.
- **Compute:** saran umum `@workgroup_size(64)` ("most GPUs can efficiently run 64 things in lockstep"),
  `dispatchWorkgroups(Math.ceil(n / 64))`, guard `if (i >= arrayLength(&buf)) { return; }`.
- **Point cuma 1 px** di WebGPU (`'point-list'`) → partikel ber-ukuran = quad ter-instance (`stepMode: 'instance'`).
- **Compat mode:** ~45% device lama **tidak** mendukung storage buffer di vertex shader → buffer partikel dibuat
  `STORAGE | VERTEX` dan dibaca sebagai **vertex buffer instance**, bukan `var<storage>` di vertex stage.
  (gpu-curtains: `storages: { x: { usage: ['vertex'], ... } }`; three TSL: `positions.toAttribute()`.)
- **Transparan di atas DOM:** `context.configure({ ..., alphaMode: 'premultiplied' })` dan output **rgb sudah
  dikali alpha**; default `'opaque'` mengabaikan alpha.
- **Ukuran canvas:** `ResizeObserver` (`devicePixelContentBoxSize` kalau ada) lalu clamp ke
  `device.limits.maxTextureDimension2D`.
- **Timing GPU:** fitur opsional `'timestamp-query'` (cek `adapter.features.has`), sisanya pakai dt dari rAF.
- **three.js r181+**: `renderAsync()/computeAsync()` deprecated — renderer harus diinisialisasi dulu lewat
  `renderer.setAnimationLoop()` atau `await renderer.init()`. **r183**: `PostProcessing` → **`RenderPipeline`**,
  `Clock` → `Timer`. **r187**: operand TSL di-coerce ke tipe bersama; struct storage selalu diperlakukan array.
  `WebGPURenderer` jatuh ke backend WebGL2 otomatis (opsi `forceWebGL`, default false).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

**WebGPU mentah:**
```js
const adapter = await navigator.gpu?.requestAdapter({ powerPreference: 'high-performance' }) // dipakai lesson optimization
const device = await adapter?.requestDevice()
if (!device) { showFallback(); return }                 // mis. versi WebGL / gambar statis
device.lost.then((info) => { if (info.reason !== 'destroyed') restart() })

const canvas = document.querySelector('canvas')
const context = canvas.getContext('webgpu')
const format = navigator.gpu.getPreferredCanvasFormat()
context.configure({ device, format, alphaMode: 'premultiplied' })

new ResizeObserver(([e]) => {
  const s = e.devicePixelContentBoxSize?.[0]
  const w = s ? s.inlineSize : e.contentBoxSize[0].inlineSize * Math.min(devicePixelRatio, 2)
  const h = s ? s.blockSize : e.contentBoxSize[0].blockSize * Math.min(devicePixelRatio, 2)
  canvas.width = Math.max(1, Math.min(Math.round(w), device.limits.maxTextureDimension2D))
  canvas.height = Math.max(1, Math.min(Math.round(h), device.limits.maxTextureDimension2D))
}).observe(canvas)
// cleanup: cancelAnimationFrame(raf); buffer.destroy(); texture.destroy(); device.destroy()
```

**three.js WebGPURenderer + TSL:**
```js
import * as THREE from 'three/webgpu'
import { pass, uniform, time, uv, sin } from 'three/tsl'

const renderer = new THREE.WebGPURenderer({ antialias: true })   // fallback WebGL2 otomatis
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)
await renderer.init()                       // wajib sebelum compute()/render() sinkron di luar setAnimationLoop
renderer.setAnimationLoop(animate)
// cleanup: renderer.setAnimationLoop(null); renderer.dispose()
```
Deteksi: `import WebGPU from 'three/addons/capabilities/WebGPU.js'` → `WebGPU.isAvailable()`,
`WebGPU.getErrorMessage()` (doc `web/threejs-docs__WebGPU.html.md`).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Default/sumber | Efek | Rentang bagus |
|---|---|---|---|
| jumlah partikel | three example: 200 000 | kepadatan "materi" | 50k (mobile) – 1M (desktop dGPU) |
| `@workgroup_size` | saran 64 | throughput compute | 64 (ubah hanya kalau diukur) |
| damping per frame | three example `friction = 0.99`, `bounce = 0.8`, `gravity = -0.00098` | inersia/berat | bikin dt-based: `pow(d, dt*60)` |
| `afterImage(node, damp)` | damp 0.96 (tabel TSL); example GUI 0.25–1 | panjang ghost trail | 0.85–0.97 |
| `rgbShift(node, amount, angle)` | 0.005, 0 | aberasi kromatik | 0.001–0.01, ikat ke velocity |
| `bloom(node, strength, radius, threshold)` | 1, 0, 0 | glow | strength 0.3–1.5, threshold 0.6–0.9 |
| `chromaticAberration(node, strength, center, scale)` | 1.0, null, 1.1 | lensa | strength 0.2–1 |
| `motionBlur(input, velocity, numSamples)` | 16 sampel | blur searah gerak | 8–16 |
| `transition(a, b, mixTex, mixRatio, threshold, useTexture)` | — | wipe/dissolve antar scene | threshold kecil = tepi tajam |
| `alphaMode` | `'opaque'` | tembus ke DOM | `'premultiplied'` untuk overlay |
| `outputBufferType` (three) | `HalfFloatType` | HDR internal | biarkan |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **Satu loop:** three → `renderer.setAnimationLoop(fn)`; WebGPU mentah → rAF sendiri. Dengan GSAP:
  `gsap.ticker.add((t) => frame(t))` dan jangan buat rAF kedua.
- **Lenis → uniform TSL:** `const uScroll = uniform(0), uVel = uniform(0)`;
  `lenis.on('scroll', (l) => { uScroll.value = l.progress; uVel.value = l.velocity })` (payload = instance Lenis,
  `01-scroll-transitions/lenis/.../lenis.ts:616`). Uniform TSL juga bisa auto-update:
  `.onFrameUpdate(fn)` (sekali per frame, cocok untuk waktu), `.onRenderUpdate`, `.onObjectUpdate`.
- **WebGPU mentah:** satu `GPUBuffer` uniform kecil (mis. `mouse, scroll, vel, time`) di-`device.queue.writeBuffer`
  sekali per frame — jangan bikin buffer baru per frame.
- **DOM sync:** gpu-curtains (`updateScrollValues({ x, y })` dari Lenis, contoh resmi ada).
- **R3F v9:** `import * as THREE from 'three/webgpu'` + `extend(THREE)` lalu
  `<Canvas gl={async (props) => { const r = new THREE.WebGPURenderer(props); await r.init(); return r }}>`
  (`../../11-r3f-ecosystem/r3f/web/r3f.docs.pmnd.rs__llms-full.txt` §WebGPU). R3F v10 (alpha) memakai
  WebGPURenderer sebagai default (`11-r3f-ecosystem/r3f/repo-react-three-fiber-v10/readme.md`).
- **Barba/SPA:** `renderer.setAnimationLoop(null)` + `dispose()` / `device.destroy()` saat leave.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Partikel compute WebGPU mentah, compat-safe (storage → vertex buffer instance)**
```js
const N = 100_000
const particleBuf = device.createBuffer({ size: N * 16,          // struct { pos: vec2f, vel: vec2f }
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST })
device.queue.writeBuffer(particleBuf, 0, initData)               // Float32Array N*4
const simBuf = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST })
const module = device.createShaderModule({ code: /* wgsl */ `
struct Particle { pos: vec2f, vel: vec2f };
struct Sim { mouse: vec2f, dt: f32, damping: f32 };
@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> sim: Sim;
@compute @workgroup_size(64) fn update(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= arrayLength(&particles)) { return; }
  var p = particles[i];
  let d = p.pos - sim.mouse;
  p.vel += normalize(d + vec2f(1e-5)) * smoothstep(0.3, 0.0, length(d)) * sim.dt * 2.0;
  p.vel *= pow(sim.damping, sim.dt * 60.0);          // damping independen frame-rate
  p.pos = fract((p.pos + p.vel * sim.dt + 1.0) * 0.5) * 2.0 - 1.0; // wrap -1..1
  particles[i] = p;
}
struct VSOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f, @location(1) speed: f32 };
@vertex fn vs(@builtin(vertex_index) vi: u32, @location(0) ppos: vec2f, @location(1) pvel: vec2f) -> VSOut {
  let c = array(vec2f(-1,-1), vec2f(1,-1), vec2f(-1,1), vec2f(-1,1), vec2f(1,-1), vec2f(1,1));
  var o: VSOut;
  o.pos = vec4f(ppos + c[vi] * 0.004, 0.0, 1.0);
  o.uv = c[vi]; o.speed = length(pvel);
  return o;
}
@fragment fn fs(v: VSOut) -> @location(0) vec4f {
  let r = length(v.uv);
  if (r > 1.0) { discard; }
  let a = (1.0 - r) * 0.8;
  let col = mix(vec3f(0.3, 0.5, 1.0), vec3f(1.0), clamp(v.speed * 4.0, 0.0, 1.0));
  return vec4f(col * a, a);                          // premultiplied
}` })
const computePipeline = device.createComputePipeline({ layout: 'auto', compute: { module, entryPoint: 'update' } })
const bindGroup = device.createBindGroup({ layout: computePipeline.getBindGroupLayout(0), entries: [
  { binding: 0, resource: { buffer: particleBuf } }, { binding: 1, resource: { buffer: simBuf } } ] })
const blend = { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' }
const renderPipeline = device.createRenderPipeline({ layout: 'auto',
  vertex: { module, entryPoint: 'vs', buffers: [{ arrayStride: 16, stepMode: 'instance', attributes: [
    { shaderLocation: 0, offset: 0, format: 'float32x2' }, { shaderLocation: 1, offset: 8, format: 'float32x2' } ] }] },
  fragment: { module, entryPoint: 'fs', targets: [{ format, blend: { color: blend, alpha: blend } }] } })
function frame(dt, mouse) {
  device.queue.writeBuffer(simBuf, 0, new Float32Array([mouse.x, mouse.y, dt, 0.98]))
  const enc = device.createCommandEncoder()
  const cp = enc.beginComputePass(); cp.setPipeline(computePipeline); cp.setBindGroup(0, bindGroup)
  cp.dispatchWorkgroups(Math.ceil(N / 64)); cp.end()
  const rp = enc.beginRenderPass({ colorAttachments: [{ view: context.getCurrentTexture().createView(),
    clearValue: [0, 0, 0, 0], loadOp: 'clear', storeOp: 'store' }] })
  rp.setPipeline(renderPipeline); rp.setVertexBuffer(0, particleBuf); rp.draw(6, N); rp.end()
  device.queue.submit([enc.finish()])
}
```
Kenapa mahal: 100k partikel bereaksi ke kursor dengan inersia, warna dari kecepatannya sendiri — CPU nyaris nol.

**2. Partikel TSL (three) — compute + sprite** (web/threejs-example__webgpu_compute_particles.html, 200 000 partikel):
```js
import { Fn, If, uniform, uv, vec3, hash, shapeCircle, instancedArray, instanceIndex } from 'three/tsl'
const positions = instancedArray(count, 'vec3'), velocities = instancedArray(count, 'vec3')
const gravity = uniform(-0.00098), bounce = uniform(0.8), friction = uniform(0.99)
const computeUpdate = Fn(() => {
  const position = positions.element(instanceIndex), velocity = velocities.element(instanceIndex)
  velocity.addAssign(vec3(0, gravity, 0)); position.addAssign(velocity); velocity.mulAssign(friction)
  If(position.y.lessThan(0), () => { position.y = 0; velocity.y = velocity.y.negate().mul(bounce) })
})().compute(count)
const material = new THREE.SpriteNodeMaterial()
material.positionNode = positions.toAttribute()       // aman untuk compat/WebGL2 (bukan storage di vertex)
material.colorNode = uv().mul(hash(instanceIndex))
material.opacityNode = shapeCircle(); material.alphaToCoverage = true; material.transparent = true
const particles = new THREE.Sprite(material); particles.count = count; particles.frustumCulled = false
await renderer.init(); renderer.compute(computeInit)   // init sekali
function animate() { renderer.compute(computeUpdate); renderer.render(scene, camera) }
```
Kenapa mahal: pantulan dengan `bounce`/`friction` memberi berat fisik; satu kode jalan di WebGPU & WebGL2.

**3. Ghost trail / feedback satu baris (TSL `afterImage`)** (web/threejs-example__webgpu_postprocessing_afterimage.html):
```js
import { pass, uniform } from 'three/tsl'
import { afterImage } from 'three/addons/tsl/display/AfterImageNode.js'
const renderPipeline = new THREE.RenderPipeline(renderer)  // dulu: PostProcessing (r183 rename)
const damp = uniform(0.8, 'float')
renderPipeline.outputNode = afterImage(pass(scene, camera), damp)
renderer.setAnimationLoop(() => renderPipeline.render())
// naikkan damp saat scroll cepat: lenis.on('scroll', l => damp.value = 0.8 + Math.min(Math.abs(l.velocity) / 100, 0.15))
```
Kenapa mahal: jejak memanjang hanya saat bergerak cepat → kecepatan jadi visual, bukan dekorasi konstan.

**4. RGB shift + bloom yang diikat velocity (TSL)**:
```js
import { rgbShift } from 'three/addons/tsl/display/RGBShiftNode.js'
import { bloom } from 'three/addons/tsl/display/BloomNode.js'
const scenePass = pass(scene, camera)
const shift = uniform(0)                                     // diisi dari |velocity| ter-clamp
const color = rgbShift(scenePass.getTextureNode(), shift)    // amount boleh node (sejak r186)
renderPipeline.outputNode = color.add(bloom(scenePass.getTextureNode(), 0.6, 0.2, 0.8))
```
Kenapa mahal: aberasi + glow muncul sebagai respons gerak, lalu kembali bersih saat diam.
(Signature `bloom/rgbShift` dari tabel TSL wiki; path import dari tree repo three.js `examples/jsm/tsl/display/`.)

**5. Ping-pong mentah di WebGPU (trail/reaction-diffusion)** — tidak bisa sample & render tekstur yang sama dalam
satu pass, jadi buat **dua** tekstur `usage: TEXTURE_BINDING | RENDER_ATTACHMENT` (format `rgba16float`), dua bind group
(A→B, B→A), tiap frame: pass full-screen (triangle besar, lesson large-triangle-to-cover-clip-space) baca `prev`
tulis `next`, lalu tukar indeks. Varian compute: `storageTexture` (lesson storage-textures). Kenapa mahal: medium
"punya memori", gerak hari ini mewarisi gerak frame kemarin.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **Fallback berlapis:** `navigator.gpu?.requestAdapter()` null → WebGL (three `WebGPURenderer` otomatis ke WebGL2;
  gpu-curtains tidak) → gambar/video statis. Coba compat dulu bila targetmu device lama:
  `requestAdapter({ featureLevel: 'compatibility' })` (gpu-curtains: `adapterOptions: { minFeatureLevel: 'compatibility' }`).
- **Kerja per frame minimal:** pipeline/bind group dibuat sekali; satu `writeBuffer` uniform per frame; instancing
  untuk ratusan+ objek; render bundle untuk scene statis (lesson optimization: split/one large uniform buffer, mapped buffers).
- **DPR cap 1.5–2**, simulasi di resolusi lebih kecil dari canvas; clamp ke `maxTextureDimension2D`.
- **Pause:** `setAnimationLoop(null)` / stop rAF saat `document.hidden` atau canvas di luar viewport
  (IntersectionObserver); reset dt saat resume supaya integrasi fisika tidak meledak.
- **`powerPreference: 'high-performance'`** hanya untuk sim berat (di laptop dual-GPU bisa pindah ke dGPU → baterai).
- **Device lost** (driver reset, tab background lama): `device.lost` → bangun ulang atau fallback.
- **prefers-reduced-motion:** jangan jalankan sim kontinu; render satu frame representatif (atau dt = 0),
  matikan afterImage/rgbShift; tetap sediakan interaksi non-gerak.
- **Mobile:** jumlah partikel turunkan 4–10×, hindari storage buffer di vertex stage (compat), cek `adapter.limits`.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `web/gpuweb-implementation-status.md` — status browser per platform (2026-10-02).
- `../../_shared/mdn-content/files/en-us/web/api/webgpu_api/index.md` — konsep, compute contoh, secure context.
- `repo-webgpufundamentals/webgpu/lessons/webgpu-fundamentals.md` — adapter/device/context, device.lost.
- `.../lessons/webgpu-inter-stage-variables.md` · `webgpu-uniforms.md` · `webgpu-storage-buffers.md` · `webgpu-vertex-buffers.md` — data ke shader.
- `.../lessons/webgpu-compute-shaders.md` — workgroup, dispatch, race condition.
- `.../lessons/webgpu-points.md` — point 1 px → quad instance.
- `.../lessons/webgpu-textures.md` · `webgpu-storage-textures.md` · `webgpu-textures-external-video.md` — tekstur, video.
- `.../lessons/webgpu-post-processing.md` · `webgpu-large-triangle-to-cover-clip-space.md` — post & full-screen pass.
- `.../lessons/webgpu-transparency.md` — `alphaMode: 'premultiplied'` & blending.
- `.../lessons/webgpu-timing.md` · `webgpu-optimization.md` — dt, fps, timestamp-query, optimasi buffer.
- `.../lessons/webgpu-compatibility-mode.md` · `webgpu-limits-and-features.md` — compat & limit.
- `.../lessons/webgpu-resizing-the-canvas.md` · `webgpu-memory-layout.md` · `webgpu-wgsl.md` — ukuran canvas, alignment, WGSL.
- `repo-threejs-wiki/Three.js-Shading-Language.md` — spesifikasi TSL (uniform, Fn, If/Loop, compute, RenderPipeline, daftar efek post).
- `web/threejs-docs__TSL.html.md` — referensi API TSL lengkap (168 KB; grep nama fungsi).
- `web/threejs-docs__WebGPURenderer.html.md` — opsi renderer (forceWebGL, samples, outputBufferType).
- `repo-threejs-wiki/Migration-Guide.md` — perubahan r181–r187 (RenderPipeline, Timer, init).
- `web/threejs-example__webgpu_compute_particles.html` · `...tsl_compute_attractors_particles.html` · `...postprocessing_afterimage.html` — contoh resmi.
- `../curtainsjs/repo-gpu-curtains/examples/compute-particles/main.js` — compute + storage `usage:['vertex']` gaya gpu-curtains.
