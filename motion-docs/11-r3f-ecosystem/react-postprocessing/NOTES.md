---
tool: React Postprocessing (@react-three/postprocessing) + postprocessing (vanilla, pmndrs)
version: "@react-three/postprocessing 3.2.2 = npm latest (2026-10-21; peer @react-three/fiber >=9.7.0, react ^19, postprocessing ^6.36.0, three >=0.156; deps n8ao ^2.0.0, maath). postprocessing 6.39.5 = npm latest (2026-09-09; peer three >=0.168 <0.187), next 7.0.0-beta.16 (branch v7). Dicek 2026-10-28"
official: https://react-postprocessing.docs.pmnd.rs/ · https://github.com/pmndrs/react-postprocessing · https://github.com/pmndrs/postprocessing (+ wiki)
local: react-postprocessing/repo-react-postprocessing/docs/** · .../src/** · repo-postprocessing/{README.md,manual/content,src,types/index.d.ts} · repo-postprocessing-wiki/*.md · web/*llms-full.txt
fetched: 2026-10-28
---
# React Postprocessing — "lensa" kamera untuk scene R3F: bloom, aberasi, grain, vignette, DOF, tone mapping

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk look sinematik/filmik di atas scene R3F (WebGLRenderer). EffectPass memerge banyak effect jadi satu shader fullscreen
  (satu segitiga fullscreen, bukan quad) → jauh lebih murah dari `three/examples/jsm/postprocessing` yang 1 pass per efek.
- **Jangan** di renderer WebGPU: postprocessing butuh `WebGLRenderer`. Di three `WebGPURenderer` pakai `RenderPipeline` + node TSL
  (r183 rename dari `PostProcessing`); di R3F v10 → `useRenderPipeline` dari `@react-three/tsl` (lihat `../r3f/NOTES.md`, `../three-js/NOTES.md`).
- **Jangan** untuk efek yang cuma butuh 1 objek: glow lokal lebih murah dengan sprite/additive material, outline dengan drei `<Outlines>`.
- Efek 2D di atas DOM (bukan WebGL) → SVG filter / CSS (`08-css-svg-native/`).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- `<EffectComposer>` membuat `EffectComposer` postprocessing dan **mengambil alih render loop**: `useFrame(…, renderPriority=1)` → R3F
  berhenti auto-render (`src/EffectComposer.tsx`). `enabled={false}` mengembalikan priority 0.
- **Tone mapping renderer dimatikan** selama composer mounted (`gl.toneMapping = NoToneMapping`, dipulihkan saat unmount). R3F default
  ACES jadi hilang → warna berubah. Tambahkan `<ToneMapping />` di ujung (default `mode = ToneMappingMode.AGX`; set
  `ToneMappingMode.ACES_FILMIC` untuk menyamai look R3F tanpa post). README postprocessing: renderer `NoToneMapping` + buffer high precision + ToneMappingEffect di akhir.
- Default composer: `multisampling = 4` (MSAA WebGL2), `frameBufferType = HalfFloatType` (HDR, tanpa banding), `autoClear true`,
  `renderPriority 1`, `mergeMode 'auto'`.
- **Merging**: effect berurutan digabung ke satu `EffectPass`. `'auto'` = maksimal satu efek CONVOLUTION per pass; `'none'` = 1 pass per efek;
  `<EffectGroup enabled>` = grup eksplisit dengan toggle murah tiap frame. Kompatibilitas (wiki Effect-Merging): **UV-transform**
  (`mainUv`: Glitch, LensDistortion, Pixelation, ShockWave) ✗ **Convolution** (ChromaticAberration, SMAA, Bokeh) — dan Convolution ✗ Convolution.
- **Urutan rekomendasi resmi** (wiki): SMAA → SSAO → DoF → Chromatic Aberration → Bloom → God Rays → Vignette → Tone Mapping →
  LUT/Color grading → Noise/Film grain → Pixelation.
- **Prop live vs rekonstruksi**: komponen dari `createEffectComponent` (CA, Noise, Vignette, BrightnessContrast, Pixelation, …) →
  setiap opsi constructor = prop live (setter). **Bloom**: `luminanceThreshold`, `luminanceSmoothing`, `mipmapBlur`, `radius`, `levels`,
  `resolution*` lewat `args` → berubah = **effect dibangun ulang**; `intensity`/`opacity`/`blendFunction` live. **DepthOfField**: live
  hanya `bokehScale`, `focusDistance`, `focusRange` (+ `target`). Animasi per frame → mutate via `ref` di `useFrame`, bukan state React.
- Custom effect GLSL punya uniform bawaan: `resolution`, `texelSize`, `cameraNear`, `cameraFar`, `aspect`, **`time`**, plus
  `inputBuffer`, `depthBuffer` (wiki Custom-Effects). Signature: `void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)`
  atau `mainUv(inout vec2 uv)`; versi depth `mainImage(…, const in float depth, …)`.
- `blendFunction`/`opacity` setiap effect ada di `effect.blendMode` (wrapper mem-pierce `blendMode-blendFunction`, `blendMode-opacity-value`).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```jsx
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'

<Canvas dpr={[1, 2]}>
  <Scene />
  <EffectComposer multisampling={4}>        {/* 0 bila pakai SMAA/FXAA */}
    {/* urutan mengikuti rekomendasi resmi (wiki Effect-Merging): CA → Bloom → Vignette → ToneMapping → Noise */}
    <ChromaticAberration offset={[0.0008, 0.0012]} radialModulation modulationOffset={0.2} />
    <Bloom mipmapBlur luminanceThreshold={1} intensity={0.8} />
    <Vignette offset={0.3} darkness={0.65} />
    <ToneMapping mode={ToneMappingMode.AGX} />
    <Noise premultiply opacity={0.35} />
  </EffectComposer>
</Canvas>
```
Unmount `<EffectComposer>` = pass & composer di-dispose, `autoClear`/`toneMapping` renderer dipulihkan (guard per renderer).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
Default di bawah = nilai **efektif** (wrapper react + constructor postprocessing). Rentang = rekomendasi selera (bukan docs).
| Effect | Default efektif | Feel / rentang bagus |
|---|---|---|
| `Bloom` | `blendFunction ADD` (wrapper), `luminanceThreshold 1.0`, `luminanceSmoothing 0.03`, `mipmapBlur true`, `intensity 1`, `radius 0.85`, `levels 8` (docs table lama: 0.9/0.025) | Selektif: threshold 1 + material `toneMapped={false}` & warna/emissive >1. intensity 0.3–1.5; radius 0.6–0.9 (halo lebar = dreamy); levels 5–6 di mobile |
| `SelectiveBloom` | `selection`, `lights` (wajib), `selectionLayer 10`, threshold 1, smoothing 0.03, mipmapBlur true | Lebih mahal dari Bloom biasa; pakai hanya bila trik toneMapped tidak cukup |
| `ChromaticAberration` | `offset (0.001, 0.0005)`, `radialModulation false`, `modulationOffset 0.15`, blend NORMAL | Lensa nyata = radial (tengah tajam, tepi pecah). Statis 0.0005–0.0015; spike ke 0.004–0.01 saat scroll cepat/impact |
| `Noise` | blend **COLOR_DODGE** (wrapper; docs bilang SCREEN), `premultiply false` | Grain film: `premultiply` + `opacity` 0.2–0.5 (atau blend OVERLAY/SOFT_LIGHT). Noise bergerak tiap frame = "hidup" walau scene diam |
| `Vignette` | `offset 0.5`, `darkness 0.5`, `technique DEFAULT` ("dusty"; `ESKIL` = "burned"), blend NORMAL | Fokus ke tengah: offset 0.25–0.4, darkness 0.5–0.8 |
| `ToneMapping` | `mode AGX`, `resolution 256`, `middleGrey 0.6`, `whitePoint 4`, `minLuminance 0.01`, `averageLuminance 1`, `adaptationRate 1`, blend SRC | AGX = highlight lembut/desaturasi filmik; `ACES_FILMIC` = kontras punchy (default R3F); `NEUTRAL` (Khronos) = warna produk akurat; `REINHARD2_ADAPTIVE` = adaptasi mata |
| `DepthOfField` | `focusDistance 3` & `focusRange 2` (**unit world**), `bokehScale 1`, `resolutionScale 0.5`, `target` (Vector3 → autofocus ke titik) | API baru: unit world (bukan 0–1 lama; `focalLength`/`worldFocus*` deprecated). bokehScale 2–6 untuk makro |
| `Autofocus` | `smoothTime 0.25`, `mouse false`, `manual false`, `debug`; ref `{ dofRef, hitpoint, update(delta, updateTarget) }` | Fokus mengikuti kursor dengan damping (`mouse`), atau `manual` + `easing.damp3(dofRef.current.target, hitpoint, 0.5, delta)` |
| `Glitch` | `delay [1.5,3.5]`, `duration [0.6,1.0]`, `strength [0.3,1.0]`, `mode SPORADIC`, `active true`, `ratio 0.85`, `columns 0.05`, `dtSize 64` | `mode CONSTANT_MILD` untuk glitch transisi singkat; `chromaticAberrationOffset` untuk mengikat CA ke glitch. UV-transform → pass terpisah dari CA/SMAA |
| `Pixelation` | `granularity 5` (wrapper; class 30) | Transisi "dissolve": damp granularity 30→0 (live setter) |
| `Scanline` | `density 1.25`, blend OVERLAY | CRT halus: opacity 0.05–0.15 |
| `DotScreen` | `angle π/2`, `scale 1` | Print/halftone editorial (juga ada `Halftone`) |
| `LensDistortion` | `distortion [0,0]`, `principalPoint [0,0]`, `focalLength [1,1]`, `skew 0` | Barrel halus 0.05–0.2 + focalLength 0.9 untuk sembunyikan sudut hitam |
| `ShockWave` | `speed 2`, `maxRadius 1`, `waveSize 0.2`, `amplitude 0.05`, `position` | Panggil `ref.current.explode()` saat klik/impact |
| `GodRays` | `sun` (mesh transparan, depthWrite false), `samples 60`, `density 0.96`, `decay 0.9`, `weight 0.4`, `exposure 0.6`, `clampMax 1`, `blur true`, `kernelSize SMALL` | Butuh `autoClear={false}` di composer untuk oklusi benar |
| `Outline` | `edgeStrength 1`, `pulseSpeed 0`, `visibleEdgeColor 0xffffff`, `hiddenEdgeColor 0x22090a`, `xRay true`, `blur false`, `kernelSize VERY_SMALL` | **Wajib** `<EffectComposer autoClear={false}>`; seleksi via `<Selection>/<Select enabled>` |
| `LUT` | `lut` (texture), `tetrahedralInterpolation false`, blend SRC | Color grade sinematik dari `.cube`; setelah ToneMapping |
| `SMAA` | `preset MEDIUM`, `edgeDetectionMode COLOR` | Pakai dengan `multisampling={0}` (suspense); convolution |
| `N8AO` (pass) | `aoRadius 5`, `distanceFalloff 1`, `intensity 1`, `quality 'performance'`, `aoSamples 16`, `denoiseSamples 4`, `denoiseRadius 12`, `halfRes false`, `screenSpaceRadius false` | AO kontak murah tanpa NormalPass; `halfRes` di mobile |

Composer: `resolutionScale` (untuk efek dengan DepthDownsamplingPass/NormalPass), `enableNormalPass`, `depthBuffer`, `stencilBuffer`,
`autoRenderToScreen`, `renderPass` factory, `camera`/`scene` override.

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Velocity → lensa**: kecepatan scroll (Lenis `l.velocity`, `01-scroll-transitions/lenis`) atau kecepatan pointer → damp → `caRef.current.offset.set(…)`,
  `noiseRef.current.blendMode.opacity.value`, `bloomRef.current.intensity`. Ref komponen = instance effect.
- **GSAP**: tween properti instance (`gsap.to(bloomRef.current, { intensity: 3, yoyo: true, repeat: 1, duration: 0.15 })` untuk flash impact).
- **drei**: material emissive `toneMapped={false}`; MeshTransmissionMaterial merender buffer sendiri dengan tone mapping off (tidak double tone map).
- **frameloop="demand"**: composer hanya render saat ada frame; Noise/Glitch butuh frame kontinu → jangan demand bila grain harus hidup.
- **Kustom**: `createEffectComponent(MyEffect)` (constructor tanpa argumen wajib) → semua opsi jadi prop live. Constructor butuh scene/camera →
  `useMemo` + `useDispose` + `useLiveDefaults` (docs `custom-effects.mdx`). `wrapEffect` masih diekspor (legacy).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Lensa filmik dasar (urutan resmi + tone mapping eksplisit)** — lihat Setup minimal.
Kenapa mahal: aberasi radial + grain + vignette meniru optik nyata; AGX menjaga highlight tidak "clip" seperti video game.

**2. Aberasi yang bereaksi ke kecepatan scroll**
```jsx
import { easing } from 'maath'
const velocity = { current: 0 } // lenis.on('scroll', l => velocity.current = l.velocity)
function SpeedLens() {
  const ca = useRef(); const s = useRef({ v: 0 })
  useFrame((_, d) => {
    easing.damp(s.current, 'v', Math.min(Math.abs(velocity.current) / 40, 1), 0.2, d)
    const k = 0.0006 + s.current.v * 0.006
    ca.current.offset.set(k, k * 0.6)
  })
  return <ChromaticAberration ref={ca} radialModulation modulationOffset={0.25} />
}
```
Kenapa mahal: gambar "terkoyak" sesaat saat dilempar lalu settle — umpan balik fisik untuk scroll.

**3. Bloom selektif tanpa SelectiveBloom**
```jsx
<EffectComposer><Bloom mipmapBlur luminanceThreshold={1} intensity={1.2} radius={0.75} /><ToneMapping /></EffectComposer>
<mesh><sphereGeometry /><meshStandardMaterial color="black" emissive="#ff6a3d" emissiveIntensity={4} toneMapped={false} /></mesh>
```
Kenapa mahal: hanya sumber cahaya yang bersinar, bukan seluruh layar jadi kabur-putih.

**4. Custom effect: grain + gelombang waktu (pakai uniform `time` bawaan)**
```jsx
import { Effect } from 'postprocessing'
import { Uniform } from 'three'
import { createEffectComponent } from '@react-three/postprocessing'
const frag = /* glsl */`
uniform float strength;
void mainUv(inout vec2 uv) { uv.y += sin(uv.x * 12.0 + time * 2.0) * strength; }`
class WaveEffect extends Effect {
  constructor({ strength = 0.0 } = {}) { super('WaveEffect', frag, { uniforms: new Map([['strength', new Uniform(strength)]]) }) }
  get strength() { return this.uniforms.get('strength').value }
  set strength(v) { this.uniforms.get('strength').value = v }
}
export const Wave = createEffectComponent(WaveEffect)   // <Wave strength={0.003} />  (UV-transform → jangan satu pass dengan CA)
```
Kenapa mahal: distorsi layar penuh yang sinkron dengan waktu global, cocok untuk transisi halaman.

**5. Fokus mengikuti kursor**
```jsx
<EffectComposer><Autofocus mouse smoothTime={0.3} bokehScale={4} /></EffectComposer>
```
Kenapa mahal: depth of field yang "mencari" fokus seperti lensa nyata saat user menunjuk objek.

**6. Toggle efek mahal per tier tanpa rebuild**
```jsx
const [hq, setHq] = useState(true)
<PerformanceMonitor onDecline={() => setHq(false)} />
<EffectComposer multisampling={hq ? 4 : 0}>
  <N8AO enabled={hq} halfRes />
  <EffectGroup enabled={hq}><DepthOfField focusDistance={4} bokehScale={3} /></EffectGroup>
  <Bloom mipmapBlur levels={hq ? 8 : 5} luminanceThreshold={1} />
</EffectComposer>
```
Kenapa mahal: kualitas turun diam-diam di device lemah tanpa jank rekonstruksi shader setiap toggle (`levels` tetap rebuild sekali).

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Biaya utama = fill-rate × jumlah pass. Satu EffectPass gabungan murah; Bloom (mipmap chain), DOF, N8AO/SSAO, GodRays, Outline,
  SelectiveBloom = pass tambahan. `dpr` 1–1.5 dengan post berat.
- `multisampling` 4 = MSAA mahal di mobile → `multisampling={0}` + `<SMAA />` atau tanpa AA pada dpr 2.
- HalfFloat buffer sudah default (anti banding gradien gelap); kalau perlu hemat memori: `frameBufferType={UnsignedByteType}` (banding di area gelap — README).
- Mutasi per frame lewat ref; jangan ubah prop args (Bloom threshold dsb.) setiap render.
- Reduced motion: matikan Glitch/ShockWave/CA berbasis velocity & Noise animasi (grain statis = `opacity` rendah atau hilangkan).
- WebGL2 diperlukan untuk MSAA. Tidak berjalan di WebGPURenderer.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-react-postprocessing/docs/effect-composer.mdx` + `src/EffectComposer.tsx` — props composer, render takeover, tone mapping guard.
- `repo-react-postprocessing/docs/effects/*.mdx` — 38 halaman efek (props tabel; cek default terhadap source).
- `repo-react-postprocessing/docs/custom-effects.mdx` + `src/createEffectComponent.tsx` — cara membungkus efek sendiri.
- `repo-react-postprocessing/docs/{effect-group,selection}.mdx` — grouping pass & seleksi objek.
- `repo-react-postprocessing/src/effects/Bloom.tsx`, `DepthOfField.tsx`, `Noise.tsx`, `Pixelation.tsx` — prop live vs args, default wrapper.
- `repo-postprocessing/README.md` — color management, HalfFloat, aturan tone mapping.
- `repo-postprocessing/src/effects/*.js` + `glsl/*.frag` — default constructor & shader tiap efek (sumber kebenaran angka).
- `repo-postprocessing/types/index.d.ts` — seluruh API vanilla bertipe + JSDoc.
- `repo-postprocessing-wiki/Custom-Effects.md` — signature shader, uniform bawaan (`time`), atribut CONVOLUTION/DEPTH.
- `repo-postprocessing-wiki/Effect-Merging.md` — urutan efek resmi & tabel kompatibilitas merge.
- `repo-postprocessing/manual/content/demos/**` — halaman manual per efek (situs pmndrs.github.io/postprocessing).
