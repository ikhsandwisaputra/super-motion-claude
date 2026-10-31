---
tool: Motion (ex Framer Motion) — paket `motion` (+ `framer-motion` versi sama)
version: 14.7.1 (CHANGELOG 2026-10-27; npm latest 14.7.1, dicek 2026-10-28). Major 13.0 = 2026-08-05, 14.0 = 2026-10-02
official: https://motion.dev/docs · https://github.com/motiondivision/motion
local: web/motion.dev__llms-full.txt (semua halaman docs), web/docs__*.md, repo-motion/packages/motion-dom/src/animation/generators/spring.ts
fetched: 2026-10-28
---
# Motion — spring/FLIP/gesture engine untuk React & vanilla, hybrid WAAPI + JS (akselerasi GPU kalau bisa)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai (React/Next)**: komponen `motion.*` + variants, `layout`/`layoutId` (FLIP), `AnimatePresence` (exit), gesture (`whileHover/whileTap/whileInView/drag`), MotionValue tanpa re-render. Default pilihan untuk UI React yang harus *bereaksi* (interupsi + velocity).
- **Pakai (vanilla)**: `animate()` hybrid, `scroll()`, `inView()`, `hover()`, `press()`, `drag()` (baru 14.4.0), `animateLayout` (14.1.0), `animateView` (view transitions, 12.41.0) [repo-motion/CHANGELOG.md].
- **Jangan / pilih GSAP** kalau butuh pin+snap scroll kompleks, MorphSVG, SplitText kaya fitur — Motion merekomendasikan `position: sticky` untuk pinning [web/docs__migrate-from-gsap-to-motion.md, web/docs__scroll.md].
- **vs react-spring**: Motion spring = solusi analitik (closed-form) + bisa jadi `linear()` WAAPI; react-spring = integrasi numerik 1 ms + `useTrail` follow-the-leader. **vs Theatre**: Motion untuk koreografi yang ditulis kode, Theatre untuk kurva yang di-author visual.
- Lisensi: `motion`, `motion/react` MIT; **Motion+** (komponen Ticker, Carousel, Cursor, AnimateNumber, ScrambleText dll.) berbayar terpisah [web/motion.dev__llms.txt].

## Mental model (yang memengaruhi FEEL & performa)
- **Default transition kalau tidak didefinisikan** [repo-motion/packages/motion-dom/src/animation/utils/default-transitions.ts]:
  `x/y/rotate…` → spring `{stiffness: 500, damping: 25, restSpeed: 10}` (sedikit overshoot); `scale*` → critically damped `{stiffness: 550, damping: target===0 ? 2√550 : 30}`; >2 keyframe → `duration: 0.8`; sisanya (opacity, warna) → tween `ease: [0.25, 0.1, 0.35, 1]`, `duration: 0.3`.
- **Spring ada 2 mode** [repo-motion/packages/motion-dom/src/animation/generators/spring.ts]:
  - *Physics* (`stiffness/damping/mass`) — **mewarisi velocity** nilai yang sedang bergerak → interupsi & gesture hand-off mulus.
  - *Time-defined* (`duration`/`bounce`/`visualDuration`) — **velocity warisan di-nol-kan** (komentar source: velocity dari animasi yang diinterupsi bikin osilasi besar pada rentang kecil). Docs juga: duration-based "don't incorporate velocity" [web/docs__react-transitions.md]; `springValue` docs menyarankan physics options karena "incorporate the velocity" [web/docs__spring-value.md].
  - Mode time aktif hanya jika **tidak** ada stiffness/damping/mass valid **dan** ada `duration` atau `bounce`. Jadi `visualDuration` selalu pasangkan dengan `bounce` (meski `bounce: 0`) — dari pembacaan source, `{type:"spring", visualDuration}` saja jatuh ke physics default.
- **Rumus visualDuration** (SwiftUI-style): `k = (2π / (1.2·vd))²`, `c = 2ζ√k`, `ζ = max(1−bounce, 0.05)`; bounce negatif → overdamped `ζ = 1/max(1+bounce, 0.05)` dengan frekuensi diskalakan agar tiba di waktu yang sama (negative bounce sejak 13.5.0) [spring.ts, CHANGELOG 13.5.0].
- **Duration+bounce tanpa visualDuration**: root-finding sampai envelope = 0.001 tepat di `duration` (clamp 0.01–10 s) [spring.ts `findSpring`].
- **Default angka (source menang atas docs)**: stiffness 100, damping 10, mass 1, duration 800 ms, bounce **0.3**, visualDuration 0.3 s; rest: restSpeed 2 u/s & restDelta 0.5, atau 0.01 & 0.005 bila |Δ|<5 ("granular") [spring.ts]. Docs menulis bounce 0.25, stiffness "1", restSpeed 0.1, restDelta 0.01 → **stale/typo** [web/docs__react-transitions.md, web/docs__spring.md].
- Unit physics = per detik, ODE standar `x'' = (−k·x − c·v)/m` → angka `stiffness/damping` **identik dengan `tension/friction` react-spring** (lihat ../react-spring/NOTES.md).
- **Inertia** [generators/inertia.ts]: `amplitude = power·velocity`, `target = origin + amplitude` (lalu `modifyTarget`), posisi `target − amplitude·e^(−t/timeConstant)`; lewat `min/max` → hand-off ke spring `{bounceStiffness, bounceDamping}` dengan velocity saat itu. Default generator: power 0.8, timeConstant 325, bounceStiffness 500, bounceDamping 10, restDelta 0.5. Docs bilang timeConstant 700 (stale).
- **Drag release** override [repo-motion/packages/motion-dom/src/gestures/drag/VisualElementDragControls.ts]: inertia `timeConstant: 750, bounceStiffness: 200, bounceDamping: 40` (jadi 1e6/1e7 kalau `dragElastic` false), `restDelta: 1, restSpeed: 10`, velocity hanya jika `dragMomentum`. `dragElastic` default 0.35, di luar constraint **linear** `mix(min, point, elastic)` (bukan kurva rubberband) [gestures/drag/utils/constraints.ts].
- **Hybrid engine**: nilai yang bisa diakselerasi jalan di WAAPI; easing JS & spring di-sample jadi CSS `linear()` (sejak 12.7.5) → tetap off-main-thread [CHANGELOG, web/magazine__how-to-use-your-favourite-gsap-easings-with-waapi.md]. 14.2.0: independent transform `x/y/scaleX…` juga di-hardware-accelerate.
- **animate() 14.7 mengembalikan `Timeline` yang mutable**: `add(item, at)`, `call(cb, at)` (cb dapat arah 1/−1), `addPause`, `move`, `remove`, `seek(time|label)`, `playTo(label)`, `reverse()`, `progress`, `speed`, `time`, opsi `autoplay/onUpdate/onRepeat/onReverseComplete` [repo-motion/packages/framer-motion/src/animation/timeline/index.ts]. Docs web belum memuat ini.

## Setup minimal (API terverifikasi)
```jsx
// React
import { motion, AnimatePresence, MotionConfig, stagger } from "motion/react"
// RSC/Next client-less: import * as motion from "motion/react-client"   [web/docs__react-installation.md]
<MotionConfig reducedMotion="user" transition={{ type: "spring", visualDuration: 0.4, bounce: 0.2 }}>
  <AnimatePresence mode="popLayout">{open && <motion.div key="panel" layout exit={{ opacity: 0 }} />}</AnimatePresence>
</MotionConfig>
```
```js
// Vanilla
import { animate, stagger, scroll, inView, hover, press, drag } from "motion"
const tl = animate(".item", { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.05) })
tl.stop()                                         // stop & commit WAAPI values
const stopIV = inView(".section", (el) => { const a = animate(el, { opacity: 1 }); return () => a.stop() })
const cancelScroll = scroll(animate(".bar", { scaleX: [0, 1] }, { ease: "linear" }))
const cancelHover = hover("a", (el) => { animate(el, { scale: 1.05 }); return () => animate(el, { scale: 1 }) })
const stopDrag = drag(".card", { axis: "x", constraints: { left: -200, right: 0 }, elastic: 0.15 })
```
Semua fungsi mengembalikan cleanup [web/docs__scroll.md, docs__inview.md, docs__hover.md, docs__drag.md]. React scoped cleanup: `useAnimate()` atau `useScopeMotion(ref, fn)` (14.5.0) [web/docs__react-use-scope-motion.md]. Bundle: `motion` ≈43 kb; `LazyMotion features={domAnimation}` + `import * as m from "motion/react-m"` ≈5 kb awal (+24 kb domAnimation / +38 kb domMax) [web/docs__react-lazy-motion.md, docs__react-reduce-bundle-size.md]; mini `animate` dari `motion/mini` ≈2.3–3.3 kb.

## Knob yang menentukan rasa gerak
| Knob | Efek ke feel | Default / catatan |
|---|---|---|
| `type: "spring", stiffness/damping/mass` | respons + velocity hand-off; pakai untuk gesture/interupsi | 100/10/1 [spring.ts] |
| `visualDuration` + `bounce` | koordinasi dengan tween; "bulk" selesai di vd, ekor bounce sesudahnya | vd 0.3, bounce 0.3 (source) |
| `bounce < 0` (−1..0) | overdamped: start cepat, settle pelan, tiba bersamaan dengan bounce 0 | 13.5.0 [web/docs__react-transitions.md] |
| `ease` | `"linear","easeIn/Out/InOut","circ*","back*","anticipate"`, bezier `[x1,y1,x2,y2]`, fungsi | easeOut = `cubic-bezier(0,0,.58,1)`, backOut = `(.33,1.53,.69,.99)` [repo-motion/packages/motion-utils/src/easing/*.ts] |
| `delay: stagger(step, { from, grid, ease, startDelay })` | `from: "first"\|"center"\|"last"\|"edges"\|"random"\|index`; `grid: [cols, rows]` (14.3.0) | step default 0.1 [repo-motion/packages/motion-dom/src/utils/stagger.ts] |
| `delayChildren: stagger(...)` (variants) | ganti `staggerChildren/staggerDirection` (deprecated) | [repo-motion/packages/motion-dom/src/animation/types.ts] |
| `when: "beforeChildren"\|"afterChildren"` | hirarki parent→anak | [web/docs__react-transitions.md] |
| `at` di sequence | angka absolut; `"+x"/"-x"` relatif ke **akhir segmen sebelumnya**; `"<"` awal segmen sebelumnya; `"<x"`; label; `"label+x"` (14.7.0) | [sequence/utils/calc-time.ts, sequence/create.ts] |
| `repeat`, `repeatType: "loop"\|"reverse"\|"mirror"`, `repeatDelay` | loop; sequence mendukung repeatType/repeatDelay sejak 12.39.0 | [web/docs__animate.md] |
| `transition.out` (14.7.0) | transisi saat *meninggalkan* state (mis. hover end) | `out: true` atau objek transition [types.ts] |
| `transition.inherit: true` | merge dengan transition yang kurang spesifik | 12.32.0 |
| `transition.path: arc()` | x/y melengkung (strength, peak, direction, rotate) | 12.40.0 [web/docs__arc.md] |
| `dragElastic`, `dragMomentum`, `dragTransition{power,timeConstant,modifyTarget,min,max,bounceStiffness,bounceDamping}`, `dragSnapToOrigin` (`"x"/"y"`), `dragDirectionLock` | rasa drag & throw | 0.35 / true / lihat mental model |
| `useSpring(src, {stiffness,…, skipInitialAnimation})`, `springValue`, `useFollowValue/followValue` (transition apa pun) | smoothing nilai turunan (scroll, pointer) | [web/docs__react-use-spring.md, docs__spring-value.md] |
| `useTransform(v, in, out, { clamp, ease, mixer })` | mapping; `clamp` default true | [web/docs__react-use-transform.md] |
| `scroll(…, { offset: ["start end", "end start"], axis, container, target, trackContentSize })` | offset = **"target container"** | default `["start start","end end"]` [web/docs__scroll.md] |

## Integrasi
- **Lenis**: `const lenis = new Lenis(); frame.setup(({ timestamp }) => lenis.raf(timestamp), true)`; `setup` jalan sebelum `read` sehingga `scroll()` main-thread tidak tertinggal 1 frame; scroll animasi ber-akselerasi tetap sinkron karena Lenis mengubah native scroll [web/docs__lenis.md].
- **Three.js**: `animate.addEffect(threeEffect)` dari `motion/three` → animate Object3D, material, uniform, TSL node dalam sequence/stagger yang sama dengan DOM (13.2.0) [web/docs__three.md]. WebGPU: `motion/vgpu` [web/docs__vgpu.md].
- **Theatre**: scrub `sheet.sequence.position` dari callback `scroll((p) => …)` (lihat ../theatre-js/NOTES.md).
- **GSAP eases di WAAPI**: `animate(el, kf, { ease: gsap.parseEase("power2.out") })` tetap hardware-accelerated [web/magazine__how-to-use-your-favourite-gsap-easings-with-waapi.md].
- **View Transitions**: `animateView(update).enter({ opacity: 1 })` (vanilla) / `<AnimateView>` (React 19.3 ViewTransition, 13.4.0) [web/docs__animate-view.md, web/docs__react-animate-view.md].

## Resep non-generik
1. **Ripple grid dari tengah** —
   ```js
   animate(".cell", { opacity: [0, 1], scale: [0.6, 1] },
     { type: "spring", visualDuration: 0.45, bounce: 0.25,
       delay: stagger(0.035, { grid: [8, 6], from: "center", ease: "easeOut" }) })
   ```
   *Mahal karena:* delay mengikuti jarak 2D (hypot), bukan urutan DOM; ease membuat cincin luar merapat.
2. **Scene dengan label & overlap** (14.7) —
   ```js
   const tl = animate([
     ["header", { opacity: [0, 1], y: [-12, 0] }, { duration: 0.45, ease: [0.19, 1, 0.22, 1] }],
     "reveal",
     [".card", { opacity: [0, 1], y: [24, 0] }, { at: "-0.15", delay: stagger(0.06), type: "spring", visualDuration: 0.5, bounce: 0.2 }],
     [".cta", { scale: [0.9, 1], opacity: [0, 1] }, { at: "reveal+0.35", duration: 0.3 }],
   ], { autoplay: false })
   tl.playTo("reveal")   // main sampai label lalu pause; tl.play() lanjut; tl.reverse() mundur (Timeline 14.7)
   ```
   *Mahal karena:* lead (header) → follow (cards) overlap 150 ms; CTA dikunci ke label, bukan angka absolut.
3. **Carousel throw + snap + skew dari velocity** (React) —
   ```jsx
   const x = useMotionValue(0); const vx = useVelocity(x)
   const skewX = useTransform(vx, [-3000, 0, 3000], [-10, 0, 10])
   <motion.div drag="x" style={{ x, skewX }} dragElastic={0.12}
     dragTransition={{ power: 0.25, timeConstant: 280, modifyTarget: t => Math.round(t / 320) * 320 }} />
   ```
   *Mahal karena:* inertia meluncur ke slot terdekat, bentuk "melar" proporsional kecepatan [web/docs__react-use-velocity.md, docs__react-transitions.md].
4. **Hover masuk bouncy, keluar kalem** (14.7 `out`) —
   `<motion.a whileHover={{ scale: 1.06, transition: { type: "spring", visualDuration: 0.18, bounce: 0.45, out: { type: "spring", visualDuration: 0.4, bounce: 0 } } }} />`
   *Mahal karena:* asimetri entrance/exit dalam satu deklarasi.
5. **Cursor follower physics** —
   ```js
   const px = motionValue(0), py = motionValue(0)
   const x = springValue(px, { stiffness: 500, damping: 40 }), y = springValue(py, { stiffness: 500, damping: 40 })
   styleEffect(".dot", { x, y })
   addEventListener("pointermove", e => { px.set(e.clientX); py.set(e.clientY) })
   ```
   *Mahal karena:* spring physics membawa momentum saat target lompat (time-defined tidak) [web/docs__spring-value.md, docs__style-effect.md].
6. **Exit lalu masuk berurutan** — `<AnimatePresence mode="wait">` + exit `ease: "easeIn"`, enter `ease: "easeOut"` (saran resmi untuk efek easeInOut total) [web/docs__react-animate-presence.md].

## Performa, aksesibilitas, mobile
- `MotionConfig reducedMotion`: default `"never"`; `"user"` mematikan transform & layout animation tapi tetap animasi opacity/warna; `"always"` untuk debug [web/docs__react-motion-config.md, docs__react-accessibility.md]. Hook `useReducedMotion()` untuk kasus custom. `MotionConfig skipAnimations` (12.30.0); vanilla: opsi `reduceMotion` di `animate` [types.ts `ReduceMotionOption`].
- Akselerasi: transform/opacity/filter/clipPath + (14.2) independent transforms + (12.43) SVG; `backgroundColor` sempat diakselerasi (12.43) tapi **dikembalikan ke main thread di 14.7.0** demi interpolasi [CHANGELOG]. `useScroll`→`opacity` langsung, atau via `useTransform` ke `transform/clipPath/filter`, jalan di ScrollTimeline/ViewTimeline [web/docs__react-use-scroll.md, CHANGELOG 12.34–13.4.7]. 13.4.4 menghapus ScrollTimeline untuk callback JS (tak ada gain) — halaman migrasi GSAP yang menyebut "tanpa polling" sudah usang.
- `layoutScroll` untuk container scroll, `layoutRoot` untuk `position: fixed`, `layout="position"` untuk elemen yang berubah aspect ratio [web/docs__react-layout-animations.md].
- Spring time-defined dibatasi ≤10 s (warning `spring-duration-limit`) [web/troubleshooting__spring-duration-limit.md].
- Mobile: `drag()` vanilla otomatis set `touch-action`, `user-select`, `draggable=false`; `axis` mengizinkan scroll di sumbu lain [web/docs__drag.md]. Browser throttle rAF (tab background, low-power) → lihat [web/magazine__when-browsers-throttle-requestanimationframe.md].

## Sumber lokal
- web/motion.dev__llms-full.txt — 152 halaman docs (React, JS, Vue, AI Kit) satu file; web/motion.dev__llms.txt — index
- web/docs__react-transitions.md, web/docs__animate.md — semua opsi transition & sequence `at`
- web/docs__stagger.md, web/docs__scroll.md, web/docs__inview.md, web/docs__hover.md, web/docs__press.md, web/docs__drag.md
- web/docs__react-animate-presence.md, web/docs__react-layout-animations.md, web/docs__react-motion-config.md, web/docs__react-lazy-motion.md
- web/examples__*.md — 107 tutorial (React & JS), web/magazine__*.md, web/troubleshooting__*.md
- repo-motion/CHANGELOG.md — perubahan 12.x→14.7.1 (sumber versi)
- repo-motion/packages/motion-dom/src/animation/generators/{spring,inertia,keyframes}.ts — matematika persis
- repo-motion/packages/motion-dom/src/animation/utils/default-transitions.ts — default per properti
- repo-motion/packages/motion-dom/src/utils/stagger.ts — algoritme stagger/grid/edges/random
- repo-motion/packages/framer-motion/src/animation/sequence/ + animation/timeline/index.ts — sequence & Timeline mutable
- repo-motion/packages/motion-dom/src/gestures/drag/ — drag, elastic, momentum
- repo-motion/plans/005-grid-stagger.md — desain grid stagger
