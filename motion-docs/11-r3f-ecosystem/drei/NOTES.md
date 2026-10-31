---
tool: Drei (@react-three/drei)
version: 10.7.9 = npm latest (publish 2026-09-25; peer @react-three/fiber ^9.0.0, react ^19, three >=0.159). Alpha 11.0.0-alpha.7. Repo master @ bf6f4ad (2026-09-30). Dicek 2026-10-28
official: https://drei.docs.pmnd.rs/ · https://github.com/pmndrs/drei · storybook https://drei.pmnd.rs/
local: drei/repo-drei/docs/** (134 .mdx) · drei/repo-drei/src/** (source = kebenaran default) · drei/web/drei.docs.pmnd.rs__llms-full.txt
fetched: 2026-10-28
---
# Drei — rak helper R3F: staging, kontrol, material kaca/distorsi, scroll, portal, performa

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** hampir selalu bersama R3F: Environment/Lightformer (lighting "studio" tanpa lampu mahal), CameraControls/PresentationControls,
  ScrollControls, MeshTransmissionMaterial (kaca), Text (SDF), View (multi-viewport DOM), PerformanceMonitor/Adaptive*.
- **Jangan** asal tumpuk: banyak komponen drei merender scene **lagi** ke FBO setiap frame (lihat Mental model). Untuk halaman
  editorial yang scroll-nya native/Lenis, **jangan** pakai ScrollControls (ia membuat scroll container sendiri) → pakai pola ref (`../r3f/NOTES.md`).
- Drei pakai `three-stdlib` (bukan `three/examples/jsm`). Deps penting di 10.7.9: `maath ^0.10.8`, `camera-controls ^3.1.0`,
  `troika-three-text ^0.52.4`, `three-mesh-bvh ^0.8.3`, `detect-gpu`, `stats-gl`, `meshline`, `@monogrid/gainmap-js`. Tidak ada react-spring lagi.
- R3F v10 (WebGPU default): komponen berbasis GLSL (`shaderMaterial`, MeshTransmission/Distort/Wobble/Reflector, Sparkles, Stars, …)
  butuh `@react-three/fiber/legacy`.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Hampir semua "gerak" drei = `useFrame` + `maath easing.damp*`** (ScrollControls, PresentationControls, MotionPathControls) atau
  `Math.sin(state.clock.elapsedTime)` (Float, Distort, Wobble). Jadi feel-nya = SmoothDamp dengan parameter `damping` ≈ detik menuju target.
- **Komponen yang menambah render pass per frame** (biaya ~= render scene sekali lagi): MeshTransmissionMaterial (1 pass; 2 dengan
  `backside`), MeshReflectorMaterial, MeshPortalMaterial (saat terlihat), ContactShadows (kecuali `frames`), Caustics `frames={Infinity}`,
  View (scissor per view). Environment dengan children `frames={Infinity}` / CubeCamera = cube camera (6 sisi) per frame — murah hanya kalau
  isinya sedikit (beberapa Lightformer) dan `resolution` kecil. Batasi via `frames`, `resolution`.
- **Docs ≠ source** (source menang; dicek 2026-10-28):
  - ScrollControls `damping`: docs 0.2 → **source 0.25**.
  - PresentationControls: docs masih `config={{mass,tension,friction}}` (react-spring lama) → **source pakai maath `damping` = 0.25**,
    `snap` = `boolean | number` (number = damping saat snap-back).
  - MeshTransmissionMaterial: docs `samples` 6 / `chromaticAberration` 0.03 → **source komponen `samples = 10`, uniform CA = 0.05**.
  - PerformanceMonitor `bounds`: docs `rr > 90 ? [50,90] : [50,60]` → **source `rr > 100 ? [60,100] : [40,60]`**.
  - Caustics `resolution`: docs 2048 → **source 2024**. MarchingCubes `resolution`: contoh 50 → **default 28**, `maxPolyCount` 10000.
- **ScrollControls** membuat `div` overflow sendiri di atas canvas, memindahkan event manager R3F ke div itu (compute pakai clientX - rect),
  lalu `easing.damp(state, 'offset', scroll.current, damping, delta, maxSpeed, undefined, eps)` tiap frame dan `invalidate()` selama
  `delta > eps` (aman untuk demand mode). `<Scroll html>` dirender ke React root DOM terpisah di div sticky, di-translate3d tiap frame.
- **MarchingCube** membaca `getWorldPosition` lalu memetakan `0.5 + x*0.5` → bola harus berada di world `[-1, 1]`; jika container
  `<MarchingCubes>` di-scale/geser, mapping tidak ikut (biarkan container di origin scale 1, atur ukuran lewat kamera) [disimpulkan dari source].
- **AdaptiveDpr/AdaptiveEvents tidak melakukan apa pun** sampai sesuatu memanggil `performance.regress()` — yang punya prop `regress`:
  OrbitControls, CameraControls, ArcballControls, TrackballControls, AccumulativeShadows.
- **Mask** pakai stencil; renderer R3F default tanpa stencil → `<Canvas gl={{ stencil: true }}>`.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```jsx
import { Environment, Lightformer, Float, MeshTransmissionMaterial, ScrollControls, Scroll, useScroll } from '@react-three/drei'
<Canvas camera={{ fov: 30, position: [0, 0, 8] }}>
  <Environment resolution={256}>                     {/* children = env custom; frames default 1 (dirender sekali) */}
    <Lightformer form="rect" intensity={4} position={[0, 5, -5]} scale={[10, 2, 1]} />
  </Environment>
  <Float speed={1} rotationIntensity={0.5} floatIntensity={0.6}>
    <mesh><torusKnotGeometry /><MeshTransmissionMaterial thickness={0.6} roughness={0.1} /></mesh>
  </Float>
</Canvas>
```
Cleanup: semua komponen membersihkan diri saat unmount (FBO, listener, event-manager di-restore oleh ScrollControls). `useGLTF.preload(url)` untuk prefetch.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
**Gerak & kamera**
| Komponen | Knob (default source) | Feel |
|---|---|---|
| `ScrollControls` | `pages 1`, `distance 1`, `damping 0.25`, `maxSpeed Infinity`, `horizontal false`, `infinite false` (experimental), `eps 1e-5`, `enabled`, `prepend` | `damping` 0.1 = gesit, 0.4+ = berat/sinematik. `maxSpeed` mencegah lompatan antar halaman jauh terasa "teleport". `distance` >1 = scroll lebih panjang per halaman (koreografi lebih lambat) |
| `useScroll()` | `offset` 0–1 (damped), `delta`, `range(from, dist, margin)`, `curve(from, dist, margin)` = `sin(range·π)`, `visible()`; `el` = div scroll | `range` = progress linear per segmen; `curve` 0→1→0 untuk fade in/out; terapkan easing sendiri di atas range (`maath/easing` cubic/expo) |
| `Float` | `speed 1`, `rotationIntensity 1`, `floatIntensity 1`, `floatingRange [-0.1,0.1]`, `autoInvalidate false` | Offset waktu acak per instance → beberapa Float tidak sinkron (organik). Rotasi x/y amplitudo /8, z /20 |
| `PresentationControls` | `damping 0.25`, `snap` false|number, `speed 1`, `zoom 1`, `polar [0, π/2]`, `azimuth [-∞, ∞]`, `global false`, `cursor true` | Objek (bukan kamera) diputar; `snap` angka kecil (0.1) = snap-back cepat; `zoom` 0.8–1.2 untuk "napas" saat drag |
| `CameraControls` (camera-controls v3) | `makeDefault`, `regress`, events `onRest/onSleep/onTransitionStart`, `impl` subclass | `controls.update(delta)` dipanggil di useFrame priority -1. Transisi sinematik via API camera-controls (`setLookAt(…, true)`, `smoothTime`) — detail API di repo yomotsu **[UNVERIFIED lokal]** |
| `MotionPathControls` | `damping 0.1`, `focusDamping 0.1`, `maxSpeed ∞`, `loop true`, `smooth false`, `eps 1e-5`, `offset`, `focus`, `object` (default kamera), `curves` atau children `<cubicBezierCurve3>` | Kamera di rel: tulis `useMotion().current = progress` di useFrame (prop `offset` hanya untuk nilai yang jarang berubah), atau `current += delta` untuk loop; `motion.next/tangent` untuk look-ahead. damping 0 + easing sendiri untuk kontrol penuh |
| `Bounds` | `margin 1.2`, `maxDuration 1`, `interpolateFunc` (default `1-exp(-5t)+0.007t`), `fit/clip/observe` | `useBounds().refresh(obj).clip().fit()` = "focus on click" yang lembut |
| `CameraShake` | `maxYaw/maxPitch/maxRoll 0.1`, `*Frequency 0.1`, `intensity 1`, `decay false`, `decayRate 0.65` | Handheld subtle: intensity 0.2–0.4; impact: set intensity 1 + decay. Controls harus `makeDefault` |

**Material & visual**
| Komponen | Knob (default source) | Feel |
|---|---|---|
| `MeshTransmissionMaterial` | `transmission 1`, `thickness 0`, `backsideThickness 0`, `roughness 0`, `ior` (MeshPhysical), `chromaticAberration 0.05`, `anisotropicBlur 0.1` (alias `anisotropy`), `distortion 0`, `distortionScale 0.5`, `temporalDistortion 0`, `samples 10`, `resolution` fullscreen, `backsideResolution`, `backside false`, `backsideEnvMapIntensity 1`, `transmissionSampler false`, `buffer`, `background` | Kaca premium = `thickness` 0.3–1.5 + `ior` 1.2–1.5 + CA 0.02–0.1 + `backside` + `backsideThickness`. Kaca "bernapas" = `distortion` 0.1–0.5 + `temporalDistortion` 0.05–0.2 (dianimasi lewat uniform `time` = clock). Roughness tinggi → `resolution={32..128}` tetap bagus & murah |
| `MeshDistortMaterial` (extends MeshPhysical) | `distort 0.4`, `radius 1`, `speed 1` (time = elapsed·speed, noise time /50) | Blob cair; displacement ∝ `distort²`. speed 2–5 untuk blob hidup |
| `MeshWobbleMaterial` (extends MeshStandard) | `factor 1`, `speed 1` | Puntiran sinus sepanjang Y; factor 0.2–0.6 agar tidak kartun |
| `MeshReflectorMaterial` | `resolution 256`, `blur [0,0]`, `mixBlur 0`, `mixStrength 1`, `mixContrast 1`, `mirror 0`, `depthScale 0`, `minDepthThreshold 0.9`, `maxDepthThreshold 1`, `depthToBlurRatioBias 0.25`, `distortion 1`, `distortionMap`, `reflectorOffset 0` | Lantai showroom: `blur [300,100]`, `resolution 1024`, `mixBlur 1`, `mixStrength 40–80`, `roughness 1`, `depthScale 1.2`, `metalness 0.5` (rekomendasi) |
| `MeshPortalMaterial` | `blend 0` (1 = masuk portal), `blur 0` (+`transparent`), `resolution 512` (SDF), `worldUnits false`, `events`, `eventPriority 0`, `renderPriority 0` | "Masuk dunia lain": damp `blend` 0→1 saat klik/kamera mendekat; `blend>0` mengambil alih render priority |
| `Image` | `url`/`texture`, `zoom 1`, `radius 0`, `grayscale 0`, `color`, `scale`, `segments`, `transparent`, `opacity` (uniform di `ref.current.material`) | Hover editorial: damp `zoom` 1→1.15, `grayscale` 1→0, `radius` 0→0.1. Auto "cover" seperti CSS |
| `Text` (troika SDF) | `fontSize`, `maxWidth`, `lineHeight`, `letterSpacing`, `anchorX/Y`, `clipRect`, `fillOpacity`, `outlineWidth/Blur/Color`, `strokeWidth`, `sdfGlyphSize 64`, `characters`, `onSync` | Kinetic type: animasi `fillOpacity`/`clipRect`/`letterSpacing` per frame (murah, tanpa geometri baru). `characters` mencegah FOUC |
| `Text3D` | `font` (typeface JSON), opsi TextGeometry, `letterSpacing 1` (faktor), `lineHeight 0`, `smooth` | Geometri nyata (bisa MeshTransmission). Mahal dibuat ulang → jangan ubah teks per frame |
| `Environment` | `preset` (bukan untuk produksi; CDN), `files`, `resolution 256`, `frames 1`, `near 0.1`, `far 1000`, `background`, `backgroundBlurriness`, `environmentIntensity`, `environmentRotation`, `ground` | `frames={Infinity}` + children (Lightformer di dalam Float) = refleksi hidup yang bergerak di permukaan kaca/metal; resolution rendah (64–256) agar murah |
| `Lightformer` | `form 'rect'|'circle'|'ring'`, `intensity 1`, `color 'white'`, `scale [1,1]`, `target` | Softbox virtual: garis highlight panjang = `scale [10, 0.5]`; intensity 2–8 |
| `Sparkles` | `count 100`, `speed 1`, `opacity 1`, `scale 1`, `noise 1`, `size` acak, `color` | Debu cahaya; semua bisa Float32Array per partikel |
| `Stars` | `radius 100`, `depth 50`, `count 5000`, `factor 4`, `saturation 0`, `fade false`, `speed 1` | Latar kosmik; `fade` true agar tepi lembut |
| `Trail` | `width`, `length`, `decay`, `local`, `stride`, `interval`, `attenuation(w)` | Jejak gerak (meshline); `attenuation={(t)=>t*t}` = ujung meruncing |
| `Clouds`/`Cloud` | `limit 200`, `range`; `segments 20`, `bounds [5,1,1]`, `volume 6`, `smallestVolume 0.25`, `growth 4`, `speed 0`, `fade 10`, `opacity 1`, `concentrate 'inside'`, `seed` | Satu draw call instanced via `<Clouds>`; `speed>0` = awan bergolak |
| `MarchingCubes` | `resolution 28`, `maxPolyCount 10000`, `enableColors false`; `MarchingCube strength 0.5, subtract 12`; `MarchingPlane planeType` | Metaballs: gerakkan `MarchingCube` (group) di useFrame dalam rentang world [-1,1]; resolution 32–64 di desktop |
| `Outlines` | `thickness 0.05`, `color 'black'`, `screenspace false`, `opacity 1`, `transparent false`, `angle π` | Toon/inverted-hull; `screenspace` agar tebal konstan saat zoom |
| `Caustics` | `frames 1`, `resolution 2024`, `ior 1.1`, `backsideIOR 1.1`, `worldRadius 0.3125`, `intensity 0.05`, `lightSource [5,5,5]`, `backside`, `causticsOnly`, `debug` | Runtime: `frames={Infinity}`, `resolution 256`, tanpa backside, `lightSource` ref yang dianimasi |
| `AccumulativeShadows` | `frames 40`, `blend 100`, `limit ∞`, `temporal`, `opacity 1`, `alphaTest 0.65`, `colorBlend 2`, `resolution 1024` + `RandomizedLight` | Bayangan "raytrace" lembut, nol biaya setelah konvergen |
| `ContactShadows` | `opacity`, `scale`, `blur 1`, `far`, `resolution 512`, `color`, `frames` | `frames={1}` untuk objek statis |

**Interaksi & performa**
| Komponen | Knob | Catatan |
|---|---|---|
| `Html` | `transform`, `sprite`, `distanceFactor`, `center`, `occlude` (true | refs | `"blending"`), `onOcclude`, `zIndexRange`, `portal`, `prepend`, `material` | `occlude="blending"` = HTML benar-benar tertutup geometri; `transform` bisa blur di sebagian device → scale 0.5 + child scale(2) |
| `View` (+`View.Port`) | `index 1`, `frames Infinity` (set 1 jika posisi tetap → hemat getBoundingClientRect), `visible`, `track` (deprecated; pakai View inline) | Banyak scene 3D mengikuti div DOM dengan **satu** Canvas fixed + `eventSource={container}` |
| `Mask` + `useMask(id, inverse)` | `id`, `colorWrite false`, `depthWrite false` | Stencil reveal (lebih murah dari portal); butuh `gl={{ stencil:true }}` |
| `shaderMaterial(uniforms, vert, frag)` | uniforms jadi setter/getter + JSX prop setelah `extend` | `key={Mat.key}` untuk hot-reload |
| `useCursor(hovered, 'pointer', 'auto')` | — | Set `document.body.style.cursor` |
| `Bvh` | `firstHitOnly false`, `splitStrategy 'SAH'`, `maxDepth 40`, `maxLeafTris 10`, `enabled` | Raycast hover di mesh padat (GLTF) jadi murah |
| `AdaptiveDpr` / `AdaptiveEvents` | `pixelated` | `setDpr(current * initialDpr)` saat regress; events off saat regress |
| `PerformanceMonitor` | `ms 250`, `iterations 10`, `threshold 0.75`, `step 0.1`, `factor 0.5`, `flipflops ∞`, `bounds` (lihat atas), `onIncline/onDecline/onChange/onFallback` | `usePerformanceMonitor` di child untuk turunkan efek per komponen |
| `Instances`/`Instance`/`createInstances`/`InstancedAttribute` | `limit`, `range` | Deklaratif tapi ada overhead CPU per Instance; ribuan objek statis → InstancedMesh mentah |
| `useDetectGPU()` | `tier`, `isMobile` (suspense) | Gate tier sebelum mount Canvas |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **ScrollControls vs scroll halaman**: ScrollControls = scroll *di dalam* canvas (div overflow sendiri, `pages`, html via `<Scroll html>`) →
  cocok untuk "single-page 3D story" full-screen. Halaman DOM panjang + Lenis + ScrollTrigger → canvas fixed + progress ref (`../r3f/NOTES.md`).
  Programmatic scroll ScrollControls: `useScroll().el.scrollTo({ top })`.
- **View + DOM**: `<main ref={container}> … <View className="v"><Scene/></View> … <Canvas eventSource={container} style={{position:'fixed',inset:0}}><View.Port/></Canvas></main>`.
- **Theatre**: `editable(PerspectiveCamera, 'perspectiveCamera')` dari @theatre/r3f (peer R3F v8!) — lihat catatan kompatibilitas di `../r3f/NOTES.md`.
- **GSAP**: tween langsung material uniform drei (mis. `gsap.to(imgRef.current.material, { zoom: 1.2 })` — `zoom` adalah setter di ImageMaterial).
- **react-postprocessing**: `toneMapped={false}` + `emissiveIntensity > 1` di material drei agar ikut Bloom selektif.
- **maath**: `easing` di-import oleh ScrollControls/PresentationControls; pakai API yang sama di komponenmu agar feel konsisten.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Kaca hero dengan refleksi hidup**
```jsx
<Environment resolution={128} frames={Infinity}>
  <Float speed={2}><Lightformer form="rect" intensity={6} scale={[8, 0.4, 1]} position={[0, 2, -4]} /></Float>
  <Lightformer form="ring" intensity={3} color="#9cf" scale={3} position={[-4, 0, -2]} />
</Environment>
<mesh>
  <icosahedronGeometry args={[1, 32]} />
  <MeshTransmissionMaterial backside backsideThickness={0.4} thickness={1.1} ior={1.35}
    chromaticAberration={0.06} anisotropicBlur={0.2} distortion={0.25} distortionScale={0.4}
    temporalDistortion={0.08} roughness={0.05} resolution={512} samples={8} />
</mesh>
```
Kenapa mahal: highlight softbox yang bergerak pelan di permukaan + dispersi tipis = kaca terasa tebal & nyata, bukan transparan datar.

**2. Scroll story full-screen dengan segmen bertingkat**
```jsx
<ScrollControls pages={4} damping={0.3} maxSpeed={2}>
  <Story /><Scroll html><h1 style={{ position: 'absolute', top: '100vh' }}>Chapter 2</h1></Scroll>
</ScrollControls>
function Story() {
  const s = useScroll(); const ref = useRef()
  useFrame((state, delta) => {
    const a = s.range(0, 1 / 4)                 // masuk
    const b = s.curve(1 / 4, 2 / 4)             // tampil lalu hilang
    easing.damp3(ref.current.position, [0, -2 + a * 2, b * 1.5], 0.2, delta)
    ref.current.rotation.y = s.offset * Math.PI * 2
  })
  return <mesh ref={ref}>…</mesh>
}
```
Kenapa mahal: setiap elemen punya jendela waktu sendiri (overlap), bukan semua bergerak linear bersama scroll.

**3. Kamera di rel, disetir progress scroll (tanpa re-render React)**
```jsx
const progress = { current: 0 }   // diisi dari Lenis / useScroll().offset
function Drive() {
  const motion = useMotion()
  useFrame(() => { motion.current = progress.current })   // goal; MotionPathControls yang men-damp
  return null
}
<MotionPathControls focus={target} damping={0.25} focusDamping={0.35} loop={false}>
  <cubicBezierCurve3 v0={[-6, 1, 6]} v1={[-2, 3, 2]} v2={[2, 0, 4]} v3={[6, 1, 0]} />
  <Drive />
</MotionPathControls>
```
Kenapa mahal: lookAt di-damp terpisah dari posisi → kamera "menoleh" sedikit terlambat seperti operator manusia.
(Jangan oper progress per-frame lewat prop `offset` — itu memaksa re-render React tiap frame; source men-damp `state.current` bila `offset` undefined.)

**4. Masuk portal**
```jsx
const mat = useRef(); const [inside, setInside] = useState(false)
useFrame((_, delta) => easing.damp(mat.current, 'blend', inside ? 1 : 0, 0.4, delta))
<mesh onDoubleClick={() => setInside(true)}>
  <roundedPlaneGeometry args={[2, 3, 0.1]} />   {/* extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry }) dari maath */}
  <MeshPortalMaterial ref={mat} blur={0.2} transparent><Environment preset="dawn" />…</MeshPortalMaterial>
</mesh>
```
Kenapa mahal: transisi spasial (dunia menggantikan dunia) alih-alih fade/route change.

**5. Galeri gambar editorial**
```jsx
function Tile({ url }) {
  const ref = useRef(); const [hover, setHover] = useState(false); useCursor(hover)
  useFrame((_, d) => {
    easing.damp(ref.current.material, 'zoom', hover ? 1.15 : 1, 0.25, d)
    easing.damp(ref.current.material, 'grayscale', hover ? 0 : 1, 0.35, d)
    easing.damp(ref.current.material, 'radius', hover ? 0.08 : 0, 0.25, d)
  })
  return <Image ref={ref} url={url} scale={[3, 4]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} />
}
```
Kenapa mahal: tiga properti dengan smoothTime berbeda = respons berlapis (zoom duluan, warna menyusul).

**6. Reveal teks via stencil**
```jsx
<Canvas gl={{ stencil: true }}>
  <SlotReveal />
</Canvas>
function SlotReveal() {
  const stencil = useMask(1)            // fungsi biasa → objek props stencil untuk material
  const mask = useRef()
  useFrame((_, d) => easing.damp(mask.current.position, 'y', 0, 0.5, d)) // celah naik ke posisi
  return (
    <>
      <Mask id={1} ref={mask} position-y={-2}><planeGeometry args={[6, 1.2]} /></Mask>
      <Text fontSize={1}>DREAM<meshBasicMaterial {...stencil} /></Text>
    </>
  )
}
```
Kenapa mahal: teks muncul dari "celah" fisik tanpa render pass tambahan. (Child non-string `<Text>` dirender sebagai child troika mesh → material ter-attach otomatis; `src/core/Text.tsx`.)

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Hitung pass tambahan (Mental model). Satu MeshTransmissionMaterial fullscreen = render scene 2×. Banyak objek kaca → `transmissionSampler`
  (pakai buffer bawaan three, tapi kaca tidak bisa "melihat" kaca lain) atau `buffer={sharedFbo.texture}` (`useFBO`).
- `frames` (Environment/ContactShadows/Caustics/AccumulativeShadows) = 1 untuk statis. `resolution` turunkan di mobile (MTM 256, reflector 256–512).
- `Bvh` untuk hover di GLTF berat; `AdaptiveEvents` matikan raycast saat regress; `View frames={1}` untuk view statis.
- Reduced motion: matikan `Float` (`enabled={false}` atau `speed={0}`), `CameraShake`, `temporalDistortion`; perbesar `damping` ScrollControls bukan solusi (tetap bergerak) — lebih baik konten statis.
- `Html transform` bisa blur; `occlude="blending"` butuh material dengan `side={DoubleSide}`.
- Environment `preset` bergantung CDN (githack) → self-host `files` (gainmap `.jpg` terkecil) untuk produksi.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-drei/docs/controls/scroll-controls.mdx` + `src/web/ScrollControls.tsx` — useScroll API & implementasi damp/infinite.
- `repo-drei/docs/shaders/mesh-transmission-material.mdx` + `src/core/MeshTransmissionMaterial.tsx` — semua knob kaca & alur FBO.
- `repo-drei/docs/controls/motion-path-controls.mdx` — kamera di kurva, `useMotion`.
- `repo-drei/src/web/PresentationControls.tsx` — API damping/snap yang sebenarnya.
- `repo-drei/docs/staging/environment.mdx`, `lightformer.mdx`, `caustics.mdx`, `accumulative-shadows.mdx` — staging cahaya.
- `repo-drei/docs/portals/{view,mask,mesh-portal-material}.mdx` — multi-viewport, stencil, portal.
- `repo-drei/docs/performances/*.mdx` + `src/core/PerformanceMonitor.tsx` — adaptive quality.
- `repo-drei/docs/abstractions/{text,text3d,image,marching-cubes,outlines,trail}.mdx` — visual primitives.
- `repo-drei/.storybook/stories/*.stories.tsx` — contoh pemakaian resmi per komponen.
- `web/drei.docs.pmnd.rs__llms-full.txt` — seluruh docs situs dalam satu file.
