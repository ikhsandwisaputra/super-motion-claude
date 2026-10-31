---
tool: three.js (baseline di bawah R3F/drei/postprocessing)
version: "r186 — npm three 0.186.1 (publish 2026-09-24). Repo dev @ 83f6bd0 (2026-10-28) package.json 0.186.0. Dicek 2026-10-28"
official: https://threejs.org/docs/ · https://threejs.org/manual/ · https://github.com/mrdoob/three.js · TSL wiki https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language
local: three-js/repo-three.js/manual/pages/*.html (60 halaman manual) · docs/pages/*.html.md (829 halaman API Markdown) · docs/llms.txt + docs/llms-full.txt (TSL reference lengkap) · three-js/web/wiki-Three.js-Shading-Language.md
fetched: 2026-10-28
---
# three.js — mesin 3D di bawah seluruh ekosistem R3F; sumber kebenaran untuk renderer, material, waktu, TSL

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- Di proyek React: pakai lewat R3F; folder ini = referensi API inti (Material, Renderer, Object3D, Raycaster, InstancedMesh, MathUtils).
- Vanilla three cocok untuk halaman non-React / microsite tunggal / embed. Untuk efek 2D fullscreen tunggal → OGL/Curtains lebih ringan (`02-shaders-webgl/`).
- **WebGLRenderer** = pilihan matang & direkomendasikan untuk aplikasi WebGL2 murni (manual `webgpurenderer.html`: masih dipelihara, tanpa
  fitur besar baru). **WebGPURenderer** = masa depan: TSL, compute shader, node material, post-processing node dengan MRT; fallback otomatis
  ke backend WebGL2; status resmi "still in an experimental state" walau sudah jauh lebih matang.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Dua dunia shader**: GLSL (`ShaderMaterial`, `RawShaderMaterial`, `onBeforeCompile`, postprocessing pmndrs, banyak drei) hanya di
  WebGLRenderer. WebGPURenderer **tidak** mendukung itu maupun `EffectComposer` → wajib node material + **TSL** (transpile ke WGSL/GLSL).
- Import berbeda: `import * as THREE from 'three/webgpu'` + `import { … } from 'three/tsl'`. Inisialisasi async: `setAnimationLoop()`
  (otomatis menunggu) atau `await renderer.init()`. Paksa backend WebGL2: `new WebGPURenderer({ forceWebGL: true })`.
- Post-processing WebGPU: `new THREE.RenderPipeline(renderer)` (r183: rename dari `PostProcessing`), `pass(scene, camera)`, efek di
  `three/addons/tsl/display/*Node.js` (bloom, dotScreen, rgbShift, fxaa, traa…), `renderPipeline.outputNode = …`, loop `renderPipeline.render()`.
  Tone mapping + konversi color space otomatis di akhir chain (`outputColorTransform = false` + `renderOutput()` untuk kontrol manual).
  MRT bawaan (`scenePass.setMRT(mrt({ output, velocity }))`), attachment default RGBA16F.
- **Waktu**: `THREE.Clock` **deprecated sejak r183**. Pengganti `THREE.Timer`: `timer.update()` per frame lalu `getDelta()/getElapsed()`
  konsisten dalam satu step; `timer.connect(document)` memakai Page Visibility API agar **tidak ada delta raksasa** setelah tab hidden.
  (R3F v9 masih memakai Clock → delta besar setelah tab kembali.)
- **Damping bawaan**: `THREE.MathUtils.damp(x, y, lambda, dt)` = lerp eksponensial frame-rate independent (tanpa velocity). maath `easing.damp`
  menambah velocity/maxSpeed/vektor (`../maath/NOTES.md`).
- **WebGLRenderer constructor defaults** (docs/pages/WebGLRenderer.html.md): `antialias false`, `stencil false`, `preserveDrawingBuffer false`,
  `alpha` → clear alpha. (R3F menimpa: antialias true, alpha true, powerPreference high-performance; stencil tetap false.)
- **Tone mapping & color**: tone mapping renderer hanya berlaku saat render ke layar; ke render target tidak → library post mematikannya dan
  menerapkan di akhir chain. Clear color tidak ikut tone mapping tanpa post (README postprocessing).
- TSL waktu & osilator: node `time`, `deltaTime`; `oscSine/oscSquare/oscTriangle/oscSawtooth(timer = time)` output [0,1].
  Uniform yang meng-update sendiri: `uniform(0).onFrameUpdate(({ time }) => …)` (sekali per frame), `.onRenderUpdate`, `.onObjectUpdate`.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
// WebGL (stabil)
import * as THREE from 'three'
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
const timer = new THREE.Timer(); timer.connect(document)
renderer.setAnimationLoop((t) => { timer.update(t); const dt = timer.getDelta(); /* animate */ renderer.render(scene, camera) })
// cleanup: renderer.setAnimationLoop(null); geometry/material/texture .dispose(); renderer.dispose(); timer.dispose()

// WebGPU (+ fallback WebGL2) dengan TSL
import * as THREE from 'three/webgpu'
import { positionLocal, time, color, mix } from 'three/tsl'
const r = new THREE.WebGPURenderer({ antialias: true }); await r.init()
const mat = new THREE.MeshStandardNodeMaterial()
const wave = positionLocal.y.mul(4).add(time.mul(2)).sin().mul(0.5).add(0.5)
mat.colorNode = mix(color(0x050c1a), color(0x00f0ff), wave)
```
`timer.update(timestamp?)`: timestamp ms dari argumen rAF; tanpa argumen → `performance.now()` (`docs/pages/Timer.html.md`).
Kaca fisik tanpa drei: `MeshPhysicalMaterial({ transmission: 1, thickness, ior, dispersion })` — `dispersion` = aberasi kromatik volumetrik,
rentang realistis `[0, 1]` (`docs/pages/MeshPhysicalMaterial.html.md`).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Default | Feel |
|---|---|---|
| `renderer.setPixelRatio` | 1 | Tajam vs fill-rate; clamp 1.5–2 |
| `renderer.toneMapping` / `toneMappingExposure` | NoToneMapping / 1 (three); R3F set ACESFilmic | `AgXToneMapping` = highlight filmik lembut; `NeutralToneMapping` = warna produk akurat; exposure 0.8–1.4 untuk mood |
| `outputColorSpace` | SRGBColorSpace | Biarkan; tekstur warna `texture.colorSpace = SRGBColorSpace` |
| `PerspectiveCamera.fov` | 50 (three) / 75 (R3F) | fov kecil = tele, parallax halus sinematik |
| `MathUtils.damp(x, y, lambda, dt)` | — | lambda 4–10 tipikal; lebih besar = lebih cepat [rentang = rekomendasi] |
| `MeshPhysicalMaterial` (`transmission`, `thickness`, `ior`, `iridescence`, `sheen`, `clearcoat`, `dispersion`) | lihat `docs/pages/MeshPhysicalMaterial.html.md` | Basis kaca/cat mobil; drei MeshTransmissionMaterial memperluas ini |
| TSL `time`, `oscSine()` | — | Animasi sepenuhnya di GPU (tanpa JS per frame) |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **R3F** membungkus semua ini: `state.gl` = WebGLRenderer, `state.clock` = Clock (v9). Lihat `../r3f/NOTES.md`.
- **GSAP**: tween properti three langsung (`gsap.to(mesh.position, {...})`, `gsap.to(mat.uniforms.uProgress, { value: 1 })`).
  Satu ticker: `gsap.ticker.add(() => renderer.render(scene, camera))` atau sebaliknya `setAnimationLoop` memanggil `gsap.updateRoot(t/1000)` [UNVERIFIED di sini — cek `03-choreography/gsap/`].
- **Lenis**: `renderer.setAnimationLoop((t) => { lenis.raf(t); … })` dengan `new Lenis({ autoRaf: false })` (Lenis README: `lenis.raf(time)` dalam ms).
- **Pindah ke WebGPU**: ShaderMaterial → node material + TSL (`Fn`, `uniform`, `attribute`, `texture`, `uv`, `positionLocal`), EffectComposer →
  RenderPipeline. Panduan di wiki TSL + `docs/llms-full.txt` §TSL.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Delta yang tidak meledak setelah tab switch**
```js
const timer = new THREE.Timer(); timer.connect(document)
renderer.setAnimationLoop((t) => { timer.update(t); const dt = Math.min(timer.getDelta(), 1 / 20); sim.step(dt); renderer.render(scene, camera) })
```
Kenapa mahal: tidak ada "loncatan" objek saat user kembali ke tab — detail yang membedakan produk matang.

**2. Gelombang warna di GPU (TSL)**
```js
import { positionLocal, time, color, mix, oscSine } from 'three/tsl'
mat.colorNode = mix(color('#0b0f1a'), color('#7cf'), oscSine(time.mul(0.25)).mul(positionLocal.y.add(1).mul(0.5)))
```
Kenapa mahal: denyut pelan berbasis ruang (bukan kedip global) tanpa biaya JS per frame.

**3. Uniform yang menghitung dirinya sendiri sekali per frame**
```js
import { uniform } from 'three/tsl'
const ramp = uniform(0).onFrameUpdate(({ time }) => time % 1.0)   // dari TSL reference (docs/llms-full.txt)
```
Kenapa mahal: logika waktu menempel di shader graph, tidak tercecer di loop aplikasi.

**4. Damping skalar ringan tanpa library**
```js
camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 6, dt)
```
Kenapa mahal: frame-rate independent — sama halusnya di 60 Hz dan 120 Hz (lambda = kecepatan konvergensi).

**5. Post WebGPU minimal (RGB shift + dot screen)**
```js
import { pass } from 'three/tsl'
import { rgbShift } from 'three/addons/tsl/display/RGBShiftNode.js'
const pipeline = new THREE.RenderPipeline(renderer)
pipeline.outputNode = rgbShift(pass(scene, camera))
renderer.setAnimationLoop(() => pipeline.render())
```
Kenapa mahal: jalur post masa depan (auto-merge, MRT) — siap untuk R3F v10 `useRenderPipeline`.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Manual: `optimize-lots-of-objects*.html` (merge/instancing/morph), `rendering-on-demand.html`, `how-to-dispose-of-objects.html`, `cleanup.html`.
- InstancedMesh / BatchedMesh untuk ribuan objek (lihat `docs/pages/InstancedMesh.html.md`, `BatchedMesh.html.md`).
- Reduced motion: tidak ada bawaan; cek `matchMedia('(prefers-reduced-motion: reduce)')` dan hentikan idle animation / render on demand.
- WebGPURenderer: fallback WebGL2 otomatis; ketersediaan WebGPU per browser **[UNVERIFIED di folder ini]** — lihat `02-shaders-webgl/webgpu/`.
- Disk: mirror ini tanpa `examples/`, model, tekstur (≈8 MB).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-three.js/docs/llms.txt` — panduan resmi untuk LLM (import map, WebGL vs WebGPU, TSL, NodeMaterial).
- `repo-three.js/docs/llms-full.txt` — referensi TSL lengkap (syntax, uniform & update events, time/oscillator, RenderPipeline, MRT).
- `web/wiki-Three.js-Shading-Language.md` — spesifikasi TSL (wiki, revisi Jun 2026).
- `repo-three.js/manual/pages/webgpurenderer.html` — status & migrasi WebGPURenderer.
- `repo-three.js/manual/pages/webgpu-postprocessing.html` — RenderPipeline, pass(), renderOutput, MRT.
- `repo-three.js/manual/pages/{rendering-on-demand,optimize-lots-of-objects-animated,align-html-elements-to-3d,color-management,post-processing}.html` — topik motion/performa.
- `repo-three.js/docs/pages/{WebGLRenderer,WebGPURenderer,Timer,Clock,MathUtils,Raycaster,InstancedMesh,MeshPhysicalMaterial,RenderPipeline,TSL}.html.md` — API inti.
- `repo-three.js/manual/list.json` — daftar isi manual.
