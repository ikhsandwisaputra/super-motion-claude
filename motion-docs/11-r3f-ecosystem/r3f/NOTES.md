---
tool: React Three Fiber (@react-three/fiber)
version: 9.8.2 = npm latest (publish 2026-10-14). Repo master @ d74622e (2026-10-14) CHANGELOG teratas 9.8.1 + 3 changeset pending. Next major 10.0.0-alpha.6 (branch v10, WebGPU default). Dicek 2026-10-28
official: https://r3f.docs.pmnd.rs/ · https://github.com/pmndrs/react-three-fiber
local: r3f/repo-react-three-fiber/docs/ (v9) · r3f/repo-react-three-fiber-v10/docs/ (v10 alpha) · r3f/web/r3f.docs.pmnd.rs__llms-full.txt
fetched: 2026-10-28
---
# React Three Fiber — renderer React untuk three.js: satu rAF loop, refs yang di-mutate, event 3D

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** kalau app sudah React/Next dan scene 3D harus hidup bareng state UI, routing, Suspense; atau mau ekosistem pmndrs
  (drei, react-postprocessing, @react-three/rapier 2.2.0 peer R3F ^9.0.4, maath).
- **Jangan** untuk efek 2D shader tunggal di halaman non-React → OGL / Curtains / PixiJS (`02-shaders-webgl/`) jauh lebih ringan.
  Jangan juga kalau butuh fitur WebGPU-only *hari ini*: v10 masih alpha; three `WebGPURenderer` vanilla lebih matang (lihat `../three-js/NOTES.md`).
- Overhead R3F ada di **mount/reconcile**, bukan di frame loop. Animasi via `useFrame` + mutate ref = sama cepatnya dengan vanilla.
- Peer v9: `react`/`react-dom` `>=19 <19.4`, `three >=0.156`. v8 = React 18 (masih dipakai @theatre/r3f, lihat Integrasi).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Satu global rAF untuk semua root** (`packages/fiber/src/core/loop.ts`). Per frame: `addEffect` (global, before) → per root:
  semua `useFrame` diurut priority **ascending** → `gl.render(scene, camera)` **kecuali** ada subscriber priority > 0 (render takeover,
  dipakai EffectComposer) → `addAfterEffect` → kalau tak ada yang minta frame lagi: `addTail`, loop berhenti.
- **`delta` = `state.clock.getDelta()` (THREE.Clock), TIDAK di-clamp.** rAF berhenti saat tab hidden → frame pertama setelah kembali
  membawa delta = seluruh durasi hidden. `pos.x += speed * delta` akan meloncat. Clamp untuk integrator: `const dt = Math.min(delta, 1/20)`.
  maath `easing.damp*` aman (konvergen/snap ke target pada delta besar, lihat `../maath/NOTES.md`).
- `THREE.Clock` **deprecated sejak three r183** (`three-js/repo-three.js/docs/pages/Clock.html.md`); v9 masih pakai `state.clock`,
  v10 menghapusnya → `state.time` (ms), `state.delta` (s), `state.elapsed` (s). Tulis kode animasi berbasis argumen `delta`, bukan clock.
- **`frameloop="demand"`**: render hanya saat reconciler mengubah props atau `invalidate()`. `invalidate()` = *flag*, bukan render
  instan; dipanggil di dalam `useFrame` → menjadwalkan 2 frame; `invalidate(n)` (legacy) dibatasi max 60 frame. Animasi sinkron
  (GSAP/controls) yang mulai di frame yang sama bisa "loncat" → panggil `invalidate()` dulu lalu mulai animasi di rAF berikutnya (docs scaling-performance).
- **Global loop ikut berhenti di demand mode** → `addEffect` callback juga berhenti. Jangan gerakkan Lenis via `addEffect` kalau `frameloop="demand"`.
- **Renderer default** (`core/renderer.ts`): `new WebGLRenderer({ powerPreference:'high-performance', antialias:true, alpha:true })`.
  Tidak ada `stencil` → three default `stencil:false` (`WebGLRenderer.html.md`) → drei `<Mask>` butuh `gl={{ stencil: true }}`.
- **Warna**: `outputColorSpace = SRGBColorSpace` (prop `linear` → Linear), `toneMapping = ACESFilmicToneMapping` (prop `flat` → NoToneMapping).
  Kalau `gl` men-set `toneMapping`/`outputColorSpace` eksplisit, `flat`/`linear` tidak menimpanya (9.8.1). EffectComposer (react-postprocessing)
  **mematikan** tone mapping renderer selama mounted → tambahkan `<ToneMapping />` di ujung chain.
- **Events**: raycast hanya saat ada pointer event (bukan tiap frame). Urutan: objek terdekat → ancestors-nya → objek berikutnya (objek
  "tembus" pointer secara default). `e.stopPropagation()` juga memblokir objek di belakang (mereka langsung dapat pointerout).
  `pointerenter/leave` = alias over/out. Kamera bergerak di bawah kursor diam tidak memicu hover → `state.events.update()`.
- `useThree(selector)` reaktif hanya pada state R3F (size, viewport, camera ganti), **bukan** internal three (`camera.zoom` tidak reaktif).
  Baca non-reaktif via `get()`.
- **Uniform ShaderMaterial (9.x)**: objek `uniforms` yang kamu pass di-**merge** ke uniforms material yang stabil. Mutasi objek
  `useMemo` milikmu setelahnya **tidak** sampai ke shader → mutate `ref.current.uniforms.time.value` (docs `API/objects.mdx`).
- **React 19.2 `<Activity>`** (9.8.x): menyembunyikan Activity memutus `useFrame` + effects tanpa membuang scene/WebGL context →
  cara resmi mem-pause scene offscreen tanpa unmount (CHANGELOG 9.8.1).
- 9.8.x: root di-unmount deterministik (bukan timer 500 ms), renderer buatan R3F di-`dispose()` lalu context dilepas; renderer instance
  yang kamu pass sendiri = tanggung jawabmu.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber'

export default function App() {
  return (
    <Canvas
      dpr={[1, 2]}                          // default [1, 2]; clamp devicePixelRatio
      camera={{ fov: 35, position: [0, 0, 6] }} // default fov 75, near 0.1, far 1000, pos [0,0,5]
      gl={{ antialias: true }}              // object = props renderer; function = factory (boleh async)
      frameloop="always"                    // 'always' | 'demand' | 'never'
      performance={{ min: 0.5 }}            // default { current:1, min:0.5, max:1, debounce:200 }
      onPointerMissed={() => {}}>
      <Scene />
    </Canvas>
  )
}
function Scene() {
  const ref = useRef()
  useFrame((state, delta) => { ref.current.rotation.y += delta * 0.3 }) // mutate, jangan setState
  return <mesh ref={ref}><boxGeometry /><meshStandardMaterial /></mesh>
}
```
- Hooks hanya valid di dalam `<Canvas>`. Unmount Canvas = R3F dispose semua objek JSX (`object.dispose()`); `dispose={null}` di group
  untuk aset global/cached.
- Tanpa react-dom: `createRoot(canvas)` → `root.configure({...})` (sinkron kecuali `gl` async factory) → `root.render(<App/>)` → `root.unmount()`;
  resize manual `root.configure({ size })`.
- WebGPU di v9: `gl={async (props) => { const r = new THREE.WebGPURenderer(props); await r.init(); return r }}` + `extend(THREE)` dari
  `three/webgpu` (docs `API/canvas.mdx`). Postprocessing lib & GLSL drei tidak jalan di renderer ini.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Default (terverifikasi) | Efek ke feel / rekomendasi (rekomendasi = selera, bukan docs) |
|---|---|---|
| `dpr` | `[1, 2]` | Ketajaman vs fill-rate. Mobile/postprocessing berat: `[1, 1.5]`. Ikut perubahan devicePixelRatio (pindah layar/zoom) — changeset pending `sharp-screens-follow` |
| `camera.fov` | `75` | 75 terasa "wide/game". Hero editorial: 20–35 → parallax lebih pelan & sinematik, perspektif terkompresi |
| `frameloop` | `'always'` | `'demand'` = hemat baterai untuk scene yang diam; semua animasi harus `invalidate()` |
| `flat` / `linear` | `false` | `flat` = NoToneMapping (warna UI/brand persis). Dengan EffectComposer tone mapping pindah ke `<ToneMapping>` |
| `performance` | `{current:1,min:0.5,max:1,debounce:200}` | `regress()` → `current=min` selama `debounce` ms. Tak berefek apa pun sampai ada yang membaca `current` (AdaptiveDpr dsb.) |
| `shadows` | `false` | `true` = PCFSoft; `'basic'|'percentage'|'soft'|'variance'`; atau objek ke `gl.shadowMap` |
| `resize` | `{ scroll:true, debounce:{ scroll:50, resize:0 } }` | Canvas di dalam elemen yang di-transform/scroll: biarkan `scroll:true` agar `size.top/left` benar |
| `eventSource` / `eventPrefix` | wrapper div / `'offset'` | DOM overlay di atas canvas: `eventSource` = parent bersama; canvas fixed full-screen → `eventPrefix="client"` |
| `useFrame(cb, priority)` | `0` | priority > 0 = kamu yang render (takeover); negatif = hanya urutan (v9: kecil dulu). **v10 membalik urutan numeric** |
| `raycaster` | `{}` | Mis. `raycaster={{ params: { Points: { threshold: 0.1 } } }}` untuk hover partikel |

Konversi px ↔ world: `viewport.width/height` (unit three di bidang target, default z=0), `viewport.factor = size.width / viewport.width`,
`viewport.getCurrentViewport(camera, target)` untuk kedalaman lain (perspective: `h = 2*tan(fov/2)*distance`).

## Integrasi (Lenis / GSAP / Motion / Theatre / drei — pola wiring persis)
- **maath (wajib)**: semua transisi kontinu lewat `easing.damp/damp3/dampE/dampC(target, goal, smoothTime, delta)`. Return `true` selama
  masih bergerak → cocok untuk `if (moving) invalidate()` di demand mode. Detail di `../maath/NOTES.md`.
- **Scroll DOM / Lenis → ref** (halaman tetap scroll native/Lenis, canvas `position:fixed`):
  Lenis 1.3.27 (`01-scroll-transitions/lenis/repo-lenis/README.md`): `lenis.on('scroll', (l) => { progress.current = l.progress })`,
  `l.velocity` untuk efek kecepatan. Kalau ingin satu rAF: `new Lenis({ autoRaf:false })` + `addEffect((t) => lenis.raf(t))` (t = timestamp rAF ms)
  — **hanya** dengan `frameloop="always"`. Demand mode: pakai `autoRaf:true` + `invalidate()` di handler scroll.
  ScrollControls drei (`../drei/NOTES.md`) = alternatif "scroll di dalam canvas" — tidak kompatibel dengan Lenis/page scroll.
- **GSAP 3.15.0 di refs**: `gsap.to(ref.current.position, { x: 2, duration: 1.2, ease: 'expo.inOut' })`; uniform: tween
  `material.uniforms.uProgress` (objek `{value}`) via `gsap.to(u, { value: 1 })`. Demand mode → `onUpdate: invalidate`. Bersihkan `tl.kill()` di cleanup effect.
  ScrollTrigger + Lenis wiring: `03-choreography/gsap/`.
- **Theatre.js**: `@theatre/r3f` 0.7.2 (npm, Mei 2024) peer `@react-three/fiber ^8.13.6` → **belum resmi untuk R3F 9 / React 19**
  (`03-choreography/theatre-js/repo-theatre/packages/r3f/package.json`). Di v9 pakai `@theatre/core` langsung:
  `sheet.object('Cam', { x: 0, y: 1, z: 6 }).onValuesChange(v => camera.position.set(v.x, v.y, v.z))`, scroll → `sheet.sequence.position = p * val(sheet.sequence.pointer.length)`.
- **react-spring** (`@react-spring/three`): animasi di luar React (`<a.mesh position-x={x}/>`), disebut resmi di pitfalls. Pilih ini kalau butuh spring berbasis state UI.
- **drei `<View>`** untuk banyak viewport yang mengikuti div DOM dengan satu Canvas (scissor) → `../drei/NOTES.md`.
- **Next.js**: Canvas = client component (`'use client'`); detail di `12-recipes/nextjs/`.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Camera rig ber-inersia ke pointer**
```jsx
import { easing } from 'maath'
function Rig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [state.pointer.x * 0.6, state.pointer.y * 0.35, 6], 0.35, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}
```
Kenapa mahal: critically-damped lag + fov sempit = kamera terasa punya massa, bukan menempel ke mouse.

**2. Scroll halaman (native/Lenis) menyetir koreografi kamera**
```jsx
const progress = { current: 0 } // diisi dari lenis.on('scroll', l => progress.current = l.progress)
function ScrollCamera() {
  const s = useRef({ t: 0 })
  useFrame((state, delta) => {
    easing.damp(s.current, 't', progress.current, 0.12, delta)     // Lenis sudah smooth → damping kecil
    const t = s.current.t
    state.camera.position.set(Math.sin(t * Math.PI) * 3, 1 + t * 2, 7 - t * 3)
    state.camera.lookAt(0, 0.5 * t, 0)
  })
  return null
}
```
Kenapa mahal: path kamera melengkung (bukan linear) dengan sedikit lag di atas scroll yang sudah halus = rasa "dolly" fisik.

**3. DOM di atas, canvas fixed di belakang, event tetap jalan**
```jsx
const root = useRef()
<main ref={root}>
  <section>…html…</section>
  <Canvas eventSource={root} eventPrefix="client"
          style={{ position: 'fixed', inset: 0, zIndex: -1 }}>…</Canvas>
</main>
```
Kenapa mahal: teks tetap bisa diseleksi/diklik sementara objek 3D bereaksi ke kursor di seluruh halaman (R3F otomatis set `pointer-events:none` di wrapper saat `eventSource` dipakai).

**4. Hover tetap benar saat kamera bergerak sendiri**
```jsx
function RaycastWhenCameraMoves() {
  const m = useMemo(() => new THREE.Matrix4(), [])
  useFrame((state) => {
    if (!m.equals(state.camera.matrixWorld)) { state.events.update(); m.copy(state.camera.matrixWorld) }
  })
  return null
}
```
Kenapa mahal: cursor state tidak "nyangkut" ketika scroll/kamera menggeser objek di bawah pointer.

**5. Takeover render untuk pass manual (mis. render ke FBO lalu ke layar)**
```jsx
useFrame(({ gl, scene, camera }) => {
  gl.setRenderTarget(fbo); gl.render(scene, camera); gl.setRenderTarget(null)
  gl.render(screenScene, camera)
}, 1) // priority > 0 → R3F berhenti auto-render
```
Kenapa mahal: membuka jalan ke feedback/trail buffer dan transisi berbasis tekstur tanpa library post.

**6. Kualitas adaptif saat interaksi (movement regression)**
```jsx
<Canvas performance={{ min: 0.5 }}>
  <AdaptiveDpr pixelated /> <AdaptiveEvents />   {/* drei */}
  <OrbitControls regress />                       {/* drei: panggil regress() saat kontrol aktif */}
</Canvas>
```
Kenapa mahal: selalu ~60fps saat digeser, tajam penuh saat diam (pola Sketchfab di docs).

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Draw call: "no more than 1000 as the very maximum, optimally a few hundred or less" (docs scaling-performance). Instancing / drei
  `<Instances>` / `<Merged>`; share geometry+material (`useMemo` atau global); `useLoader` cache per URL.
- Jangan mount/unmount kondisional (compile ulang shader) → toggle `visible`. Kerja berat → `startTransition`.
- Jangan alokasi di `useFrame` (`new Vector3()` per frame) → reuse objek di module/useMemo.
- Jangan bind state store cepat secara reaktif → baca `api.getState()` di `useFrame`.
- Movement regression: `performance.regress()` + baca `performance.current` (drei AdaptiveDpr/AdaptiveEvents). PerformanceMonitor drei
  untuk tier otomatis (default bounds di source: refreshrate > 100 ? [60,100] : [40,60]).
- Mobile tier (rekomendasi): `dpr={[1,1.5]}`, `antialias:false` + post SMAA atau tanpa post, shadows baked (AccumulativeShadows `frames`
  terbatas / ContactShadows `frames={1}`), MeshTransmissionMaterial `resolution` 256–512 atau `transmissionSampler`.
- **prefers-reduced-motion**: R3F tidak punya bawaan. `matchMedia('(prefers-reduced-motion: reduce)')` → kecilkan amplitudo/hentikan
  idle motion, `frameloop="demand"`, matikan camera shake & CA berbasis velocity. Lenis sudah menghormati preferensi ini sendiri.
- Fallback: prop `fallback` (tanpa WebGL) + error boundary untuk context crash.
- **v10 (alpha.6)** — perubahan besar yang harus diantisipasi: `@react-three/fiber` render dengan **WebGPU** (fallback WebGL2);
  GLSL (`ShaderMaterial`, `onBeforeCompile`, postprocessing, banyak shader drei) **render blank** → pakai `@react-three/fiber/legacy`;
  `gl` → `renderer`, `state.clock` dihapus, `shadows`/`flat`/`linear` pindah ke `renderer={{...}}`, `onUpdate` dihapus, priority numeric
  urutannya terbalik, fase `physics` fixed timestep 1/60 (maxSubsteps 8), `useFrame(cb, { phase, fps, before, after })`, TSL hooks di
  `@react-three/tsl` (`useUniforms`, `useNodes`, `useRenderPipeline`). three peer `>=0.185.0`.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-react-three-fiber/docs/API/canvas.mdx` — semua prop Canvas, defaults, renderer ownership, WebGPU v9, createRoot.
- `repo-react-three-fiber/docs/API/hooks.mdx` — useThree state table, useFrame priority, useLoader/preload.
- `repo-react-three-fiber/docs/API/events.mdx` — event data, bubbling, pointer capture, eventSource/eventPrefix, `events.update()`.
- `repo-react-three-fiber/docs/API/objects.mdx` — piercing (`material-uniforms-x-value`), disposal, merge uniforms ShaderMaterial.
- `repo-react-three-fiber/docs/advanced/pitfalls.mdx` — larangan setState di loop, reuse objek, visible vs mount.
- `repo-react-three-fiber/docs/advanced/scaling-performance.mdx` — demand, invalidate, instancing, LOD, regress, PerformanceMonitor.
- `repo-react-three-fiber/packages/fiber/src/core/loop.ts` — urutan frame loop, invalidate, advance (bukti delta tidak di-clamp).
- `repo-react-three-fiber/packages/fiber/src/core/store.ts` — default state (performance, viewport, frameloop).
- `repo-react-three-fiber/packages/fiber/src/web/Canvas.tsx` — eventSource/eventPrefix wiring, pointer-events none.
- `repo-react-three-fiber/packages/fiber/CHANGELOG.md` — perubahan 9.x (Activity, React 19.3, disposal).
- `repo-react-three-fiber/example/src/demos/*.tsx` — demo resmi (MultiView, Portals, ViewTracking, WebGPU, Gestures).
- `repo-react-three-fiber-v10/docs/migration/v10.mdx` — daftar breaking change v10.
- `repo-react-three-fiber-v10/docs/frame-loop.mdx` — scheduler v10: phases, fps throttle, fixed timestep, demand/onIdle.
- `repo-react-three-fiber-v10/docs/webgpu/*.mdx` — TSL hooks, render pipeline, compute, multi-canvas.
- `web/r3f.docs.pmnd.rs__llms-full.txt` — seluruh docs situs dalam satu file (mirror v9).
