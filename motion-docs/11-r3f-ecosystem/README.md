# 11 — Ekosistem R3F (React Three Fiber · Drei · React Postprocessing · maath · three.js)

Mirror offline docs resmi + catatan ahli untuk motion 3D di React. Dicek & di-mirror **2026-10-28**.
Setiap folder alat punya `NOTES.md` (cheat sheet terverifikasi) + `repo-*/` (sparse clone) + `web/` (llms.txt / halaman docs).

| Alat | Folder | Peran satu baris | Versi (npm, 2026-10-28) | URL resmi |
|---|---|---|---|---|
| React Three Fiber | `r3f/` | Renderer React untuk three: satu rAF loop, `useFrame`, event 3D, `frameloop="demand"` | 9.8.2 (v10.0.0-alpha.6 = WebGPU default) | https://r3f.docs.pmnd.rs/ |
| Drei | `drei/` | Helper siap pakai: ScrollControls, kaca MeshTransmission, Environment/Lightformer, View, Text, kontrol, performa | 10.7.9 (11.0.0-alpha.7) | https://drei.docs.pmnd.rs/ |
| React Postprocessing (+ postprocessing vanilla) | `react-postprocessing/` | "Lensa": Bloom, CA, Noise, Vignette, DOF, ToneMapping, custom Effect | 3.2.2 / postprocessing 6.39.5 (7.0.0-beta.16) | https://react-postprocessing.docs.pmnd.rs/ |
| maath (→ `math`) | `maath/` | `easing.damp*` SmoothDamp frame-rate-independent untuk semua gerak kontinu | maath 0.10.8; penerus `math` 0.1.0 | https://github.com/pmndrs/maath |
| three.js | `three-js/` | Baseline: renderer WebGL/WebGPU, Timer, MathUtils, TSL, RenderPipeline | r186 (0.186.1) | https://threejs.org/ |

**Matriks kompatibilitas (peer deps terverifikasi):** R3F 9.x ← React `>=19 <19.4`, three `>=0.156` · drei 10.7.9 ← R3F `^9`, three `>=0.159` ·
@react-three/postprocessing 3.2.2 ← R3F `>=9.7.0`, postprocessing `^6.36.0` · postprocessing 6.39.5 ← three `>=0.168 <0.187` (!) ·
@react-three/rapier 2.2.0 ← R3F `^9.0.4` · **@theatre/r3f 0.7.2 ← R3F `^8.13.6` (belum v9)** · R3F v10 alpha ← three `>=0.185.0`.

## Pilih yang mana?
| Kebutuhan | Pilih | Kenapa / catatan |
|---|---|---|
| Nilai mengejar target (hover, pointer, scroll, state) | maath `easing.damp3/dampE/dampC` di `useFrame` | Interruptible, tanpa alokasi, return boolean untuk `invalidate()` |
| Koreografi berdurasi pasti, stagger, intro | GSAP timeline di refs (`03-choreography/gsap/`) | Durasi & ease eksak; `onUpdate: invalidate` di demand mode |
| Kamera sinematik yang diedit visual | Theatre.js (`03-choreography/theatre-js/`) | Di R3F 9 pakai `@theatre/core` + `onValuesChange` (r3f extension masih peer v8) |
| Kamera di rel / lintasan kurva | drei `MotionPathControls` | `useMotion().current = progress` di useFrame, `focus` + `focusDamping` terpisah |
| Pegas bouncy (overshoot) | `math/time` `spring3.update(…, dampingRatio<1)` atau react-spring | maath `damp` selalu kritis (tanpa overshoot) |
| Halaman DOM panjang + 3D tersinkron scroll | Lenis/native scroll → progress ref → `useFrame` | Canvas fixed + `eventSource` + `eventPrefix="client"` |
| Story 3D full-screen, scroll di dalam canvas | drei `ScrollControls` + `useScroll().range/curve` | Membuat scroll container sendiri; tidak kompatibel dengan Lenis |
| Banyak viewport 3D di layout DOM | drei `View` + `View.Port` | Satu Canvas, scissor per div |
| Kaca/refraksi premium | drei `MeshTransmissionMaterial` + `Environment`/`Lightformer` | 1–2 render pass ekstra; `resolution`/`samples` untuk tier |
| Kaca murah banyak objek | `MeshPhysicalMaterial` (`transmission`, `dispersion`) atau MTM `transmissionSampler` | Satu buffer transmisi bersama |
| Look filmik | react-postprocessing: CA radial → Bloom → Vignette → ToneMapping(AGX) → Noise (urutan resmi) | Composer mematikan tone mapping renderer → wajib `<ToneMapping/>` |
| Efek layar custom | postprocessing `Effect` + `createEffectComponent` | Uniform `time`/`resolution` bawaan |
| WebGPU / TSL / compute | three `three/webgpu` + `three/tsl`; R3F v10 alpha + `@react-three/tsl` | GLSL, postprocessing pmndrs & shader drei tidak jalan |
| Adaptasi device lemah | drei `PerformanceMonitor` + `AdaptiveDpr` (+ kontrol `regress`) + `useDetectGPU` | AdaptiveDpr diam tanpa `regress()` |

## Craft motion R3F (distilasi lintas alat — detail & sumber di tiap NOTES.md)
1. **Damp everything.** Semua yang mengejar target lewat `easing.damp*(…, smoothTime, delta)` — bukan `lerp(a,b,0.1)` (contoh di docs
   pitfalls R3F itu frame-rate dependent). smoothTime berbeda per properti = respons berlapis (scale 0.12, posisi 0.25, warna 0.45).
   `delta` R3F v9 tidak di-clamp (THREE.Clock) → integrator manual pakai `Math.min(delta, 1/20)`; damp sendiri aman.
2. **Scroll-synced 3D.** (a) Halaman DOM: Lenis (`autoRaf`, `lenis.on('scroll', l => p.current = l.progress)`) → `useFrame` damp kecil
   (0.1) → kamera/objek; velocity Lenis → efek lensa. Satu rAF: `addEffect(t => lenis.raf(t))` hanya bila `frameloop="always"`.
   (b) Story full-screen: drei `ScrollControls` (`damping` default **0.25**, `maxSpeed` untuk lompatan jauh) + `range()`/`curve()` per segmen agar elemen
   punya jendela waktu sendiri yang overlap.
3. **Koreografi kamera.** Posisi dan lookAt di-damp **terpisah** (lookAt lebih lambat = operator manusia). Lintasan: `MotionPathControls`
   (`damping 0.1`, `focusDamping 0.1` default) atau GSAP timeline ke `camera.position` + target. Theatre untuk edit visual (core API di v9).
   fov 20–35 untuk hero sinematik; CameraShake intensity 0.2–0.4 sebagai "handheld".
4. **Postprocessing sebagai lensa, bukan filter.** Urutan resmi postprocessing: SMAA → SSAO → DoF → CA → Bloom → GodRays → Vignette →
   ToneMapping → LUT → Noise → Pixelation. Bloom selektif = `luminanceThreshold 1` + material `toneMapped={false}` & emissive >1.
   CA radial kecil (≈0.0006–0.0015) yang membesar dengan velocity scroll, grain `premultiply` opacity rendah, vignette offset ~0.3 — subtle
   adalah intinya. Animasi parameter lewat `ref` instance (Bloom threshold/levels = rebuild, intensity = live).
5. **Resep kaca/refraksi.** `MeshTransmissionMaterial` (`thickness` 0.3–1.5, `ior` 1.2–1.5, CA 0.02–0.1, `backside` + `backsideThickness`,
   `distortion` + `temporalDistortion` kecil untuk kaca "bernapas") di dalam `Environment frames={Infinity}` berisi `Lightformer` yang
   ber-`Float` → highlight bergerak di permukaan. Default source: `samples 10`, CA 0.05, `resolution` fullscreen.
6. **Tier performa mobile.** Tier tinggi: `dpr [1,2]`, MSAA 4, MTM fullscreen, N8AO, DOF. Tier menengah: `dpr [1,1.5]`, MTM `resolution 512`,
   Bloom `levels 5–6`, tanpa DOF/AO. Tier rendah: `dpr 1`, `multisampling 0` (+SMAA atau tanpa), `transmissionSampler`/MeshPhysical,
   bayangan dipanggang (`frames={1}`), `frameloop="demand"`. Pindah tier via `PerformanceMonitor` (`onDecline`/`onFallback`, bounds default
   source `rr>100 ? [60,100] : [40,60]`) dan `EffectGroup enabled` / `N8AO enabled` (toggle tanpa rebuild).
7. **Reduced motion.** Tidak ada bawaan di R3F/drei/postprocessing: cek `matchMedia('(prefers-reduced-motion: reduce)')` → matikan Float,
   CameraShake, Glitch, CA berbasis velocity; `frameloop="demand"`. Lenis sendiri sudah menghormati preferensi ini.

## Isi mirror (2026-10-28)
| Folder | Isi | Ukuran |
|---|---|---|
| `r3f/repo-react-three-fiber/` | master @d74622e: `docs/**` (20 .mdx), `packages/fiber/{readme,CHANGELOG,package.json,src}`, `example/src/demos`, `.changeset` | 1.8 MB |
| `r3f/repo-react-three-fiber-v10/` | branch `v10` @58acabc: docs v10 (frame-loop, migration, webgpu/*, scene/*), CHANGELOG-ALPHA, `packages/tsl` | 1.4 MB |
| `r3f/web/` | `llms.txt`, `llms-full.txt` (situs r3f.docs.pmnd.rs) | 0.2 MB |
| `drei/repo-drei/` | master @bf6f4ad: `docs/**` (134 .mdx), `src/**`, `.storybook/stories/*.tsx` | 3.6 MB |
| `drei/web/` | `llms.txt`, `llms-full.txt` | 0.2 MB |
| `react-postprocessing/repo-react-postprocessing/` | master @e07ef9a: `docs/**` (45 .mdx, 38 efek), `src/**` | 1.7 MB |
| `react-postprocessing/repo-postprocessing/` | main @9cf03cf (6.39.5): README, `manual/content/**`, `src/**/*.{js,frag,vert}`, `types/index.d.ts` | 2.5 MB |
| `react-postprocessing/repo-postprocessing-wiki/` | wiki (Custom-Effects, Effect-Merging, Custom-Passes, …) | 0.2 MB |
| `react-postprocessing/web/` | `llms.txt`, `llms-full.txt` | 0.1 MB |
| `maath/repo-maath-legacy/` | branch `maath` @626d198: README API, `packages/maath/src` (0.10.8) | 0.7 MB |
| `maath/repo-maath/` | main @7c55d75 (paket `math` 0.1.0): README, API.md, `src/**` (tanpa CLAUDE.md/AGENTS.md repo) | 1.3 MB |
| `three-js/repo-three.js/` | dev @83f6bd0: `manual/pages/*.html` (60), `docs/pages/*.html.md` (829), `docs/llms*.txt` | 8.3 MB |
| `three-js/web/` | `wiki-Three.js-Shading-Language.md` | 0.1 MB |

Total ≈ 22 MB. Update: jalankan ulang `_tools/sparse_clone.py` dengan pattern yang sama (lihat `_tools/CONVENTIONS.md`); dua clone branch
(`repo-react-three-fiber-v10`, `repo-maath-legacy`) dibuat dengan `git clone --branch` manual — update via `git -C <dir> pull --ff-only --depth 1`.

Catatan: situs pmndrs juga mengiklankan MCP server docs (`https://docs.pmnd.rs/api/mcp`, tercantum di `r3f/web/*llms.txt`) — tidak dikonfigurasi.
