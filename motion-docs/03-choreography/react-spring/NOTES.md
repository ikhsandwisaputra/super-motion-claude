---
tool: react-spring (@react-spring/web, @react-spring/three)
version: stable 10.1.2 (2026-06-24) · beta 11.0.0-beta.1 (2026-10-01, = isi repo main 83e4760). Dicek 2026-10-28
official: https://www.react-spring.dev/docs · https://github.com/pmndrs/react-spring
local: repo-react-spring/docs/app/routes/*.mdx (docs v11), web/*.md (situs live = v10), repo-react-spring/packages/core/src/
fetched: 2026-10-28
---
# react-spring — spring physics numerik untuk React (DOM & R3F), tanpa durasi: tension/friction/mass

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk UI React yang *dikendalikan gesture* (pasangan kanon `@use-gesture/react`), `useTrail` (ekor mengikuti kepala), `useChain` lintas hook, dan R3F (`@react-spring/three`, `animated.mesh`).
- **Pilih Motion** kalau butuh layout/FLIP, exit presence dengan `layoutId`, atau akselerasi WAAPI/ScrollTimeline — react-spring berjalan di JS thread (rafz) [repo-react-spring/.changeset/pre/remove-deprecated-targets.md: "react-spring's JS-thread engine"].
- **Pilih GSAP/Theatre** untuk timeline panjang ber-label; react-spring tidak punya timeline (pakai async `to`, `delay`, `useChain`).
- Versi: situs live mendokumentasikan **v10** (`useTransition`); repo main = **v11 beta** (`usePresenceList`/`usePresence`, `useTransition` deprecated) [web/_index.md vs repo-react-spring/.changeset/pre/use-presence.md].

## Mental model (yang memengaruhi FEEL & performa)
- **Integrasi numerik**: semi-implicit Euler, sub-step tetap **1 ms**: `springForce = −tension·1e-6·(x−to)`, `dampingForce = −friction·1e-3·v`, `a = (F)/mass` dalam px/ms² [repo-react-spring/packages/core/src/SpringValue.ts `advance`]. Dalam satuan detik ini persis `x'' = (−k·x − c·v)/m` dengan k=tension, c=friction → **preset react-spring bisa dipakai 1:1 sebagai `stiffness/damping` Motion** (Motion juga per-detik, lihat ../motion/NOTES.md).
- **Velocity dalam unit/ms** (`config.velocity` dipakai langsung sebagai v0 px/ms) → `velocity` dari use-gesture (px/ms) bisa langsung dioper [SpringValue.ts, ../use-gesture/NOTES.md].
- **Retarget membawa velocity**: integrator memakai `lastVelocity` bila ada; `lastVelocity` hanya di-null-kan saat node sudah `done` (`reset()`), jadi `config.velocity` hanya berlaku bila spring sedang diam **atau** sebelumnya `immediate: true` (pola drag resmi: `immediate: active`) [SpringValue.ts, repo-react-spring/packages/animated/src/AnimatedValue.ts].
- **Rest/precision adaptif**: kalau `precision` tidak diset → `from==to ? 0.005 : max(EPSILON·max(|to|,|from|,1), min(1, |to−from|·0.001))`; `restVelocity` default = precision/10 [SpringValue.ts]. Docs pitfall: untuk three.js turunkan `precision` ke `0.0001` agar tidak "loncat" di akhir [repo-react-spring/docs/app/routes/docs.advanced.config.mdx, docs.guides.react-three-fiber.mdx].
- **`bounce` di react-spring ≠ bounce Motion**: saat posisi menyentuh/melewati target, `velocity = −velocity·bounce` dan posisi dipaku ke target (pantulan dinding, tanpa overshoot); `clamp: true` = bounce 0 → berhenti di target [SpringValue.ts, AnimationConfig.ts].
- **Decay** (`config.decay: true` → 0.998): `x = from + v0/(1−d)·(1 − e^(−(1−d)·t))`, t dalam ms → total jarak luncur = `v0/(1−d)` = **500·v0** untuk default (flick 2 px/ms ≈ 1000 px); `to` diabaikan [SpringValue.ts, AnimationConfig.ts].
- **frequency/damping** (mode "response" ala SwiftUI): `tension = (2π/frequency)²·mass`, `friction = 4π·damping·mass/frequency`; frequency = periode osilasi tak teredam (detik, min 0.01), damping = rasio redaman (0 = abadi, 1 = tanpa bounce) [AnimationConfig.ts `mergeConfig`].
- **`useTrail` = follow-the-leader**, bukan delay: tiap spring anak memakai `to: parent.springs` (fluid value), semua anak dipaksa sefase ke head saat loop [repo-react-spring/packages/core/src/hooks/useTrail.ts] → kalau head bergerak cepat, ekor "melar"; head berhenti, ekor menyusul.
- **`useChain(refs, timeSteps?, timeFrame = 1000)`**: tanpa timeSteps = ref berikutnya mulai setelah ref sebelumnya **diam (rest)**; dengan timeSteps = `delay = timeFrame·timeSteps[i]` (ms) ditambahkan ke delay props [hooks/useChain.ts].

## Setup minimal (API terverifikasi)
```jsx
import { useSpring, useSprings, useTrail, useChain, useSpringRef, animated, config, useReducedMotion } from '@react-spring/web'
function Box() {
  useReducedMotion()                                     // set Globals.skipAnimation = prefers-reduced-motion
  const [springs, api] = useSpring(() => ({ x: 0, config: config.stiff }), [])
  return <animated.div onClick={() => api.start({ x: springs.x.get() === 0 ? 120 : 0 })} style={springs} />
}
```
- Bentuk fungsi `useSpring(() => ({…}), deps)` → `[springs, api]` (imperatif, tanpa re-render); bentuk objek `useSpring({ x: on ? 1 : 0 })` → re-render per perubahan [web/concepts__imperative-api.md].
- `api.start(props)` (Promise result), `api.stop()`, `api.set(values)` (lompat), `api.pause/resume` [web/advanced__spring-ref.md].
- Presence: v10 `useTransition(items, { keys, from, enter, leave, trail, exitBeforeEnter })`; v11 `usePresenceList(items, …)` → array `{ key, item, springs, phase }`, `exitBeforeEnter` → `mode: 'wait'` [repo-react-spring/docs/app/routes/docs.components.use-transition.mdx, .changeset/pre/use-presence.md].
- Install target langsung: `@react-spring/web` / `@react-spring/three`; paket payung `react-spring` dihapus di v11; v11 ESM-only, TypeScript ≥5.7 [.changeset/pre/esm-only.md, remove-deprecated-targets.md, type-per-key-handler-args.md].

## Knob yang menentukan rasa gerak
| Knob | Efek | Default |
|---|---|---|
| `tension` | kekakuan; tinggi = cepat & tajam | 170 [constants.ts] |
| `friction` | redaman; rendah = wobble | 26 |
| `mass` | inersia; tinggi = berat, butuh friction lebih | 1 |
| `frequency` + `damping` | parameter perseptual (lihat rumus) | damping 1 |
| `velocity` | v0 (unit/ms), bisa array per nilai | 0 |
| `clamp` | stop tepat di target (tanpa overshoot) | false |
| `bounce` | pantul di target dengan koefisien | undefined |
| `precision` / `restVelocity` | kapan dianggap diam | adaptif |
| `duration` (ms) + `easing` | mode tween (bukan spring) | easing **linear** (source; komentar bilang quad-in-out = stale) [AnimationConfig.ts] |
| `decay` | luncur dengan friksi eksponensial | false (true = 0.998) |
| `delay`, `loop`, `reverse`, `immediate` | orkestrasi / lompat | — |
| `config: key => ({...})` | config berbeda per properti dalam satu spring | [docs.advanced.config.mdx] |

Preset persis [repo-react-spring/packages/core/src/constants.ts]: `default {170,26}` · `gentle {120,14}` · `wobbly {180,12}` · `stiff {210,20}` · `slow {280,60}` · `molasses {280,120}` (mass 1). Rasio redaman ζ = friction/(2√tension): default ≈1.00 (critical), stiff ≈0.69, gentle ≈0.64, wobbly ≈0.45, slow ≈1.79, molasses ≈3.59 — dihitung dari preset + rumus ODE di atas.

## Integrasi
- **use-gesture** (pola resmi demo): saat drag `api.start({ x: mx, immediate: active })` / `config tension` tinggi; saat lepas → spring dengan `config: { ...config.stiff, velocity: vy }` [../use-gesture/repo-use-gesture/demo/src/sandboxes/action-sheet/src/App.jsx].
- **R3F**: `import { useSpring, animated } from '@react-spring/three'` → `<animated.mesh scale={springs.scale} />`; set `precision: 0.0001` [docs.guides.react-three-fiber.mdx]. v11 fix: spring ber-`delay` di Canvas `frameloop="demand"` kini meminta frame sendiri [.changeset/pre/fix-rafz-demand-timeout.md].
- **Scroll**: `useScroll()` → `scrollYProgress` SpringValue; `useInView({ rootMargin, amount, once })` → `[ref, inView]` atau `[ref, springs]` [docs.utilities.use-scroll.mdx, docs.utilities.use-in-view.mdx].
- **Lenis/GSAP**: tidak ada integrasi resmi; react-spring memakai loop `rafz` sendiri [repo-react-spring/packages/rafz/README.md].

## Resep non-generik
1. **Sheet yang bisa dilempar** (use-gesture → spring velocity) —
   ```jsx
   const bind = useDrag(({ last, velocity: [, vy], direction: [, dy], offset: [, oy] }) => {
     if (last) oy > height * 0.5 || (vy > 0.5 && dy > 0)
       ? api.start({ y: height, config: { ...config.stiff, velocity: vy } })
       : api.start({ y: 0, config: config.wobbly })
     else api.start({ y: oy, immediate: true })
   }, { from: () => [0, y.get()], bounds: { top: 0 }, rubberband: true, filterTaps: true })
   ```
   *Mahal karena:* keputusan buka/tutup dari posisi **atau** kecepatan, dan spring melanjutkan momentum jari [demo action-sheet].
2. **Deck kartu flick** — tension 800 saat dipegang, 500 kembali, 200 terbang keluar; `friction: 50`; trigger keluar `vx > 0.2`; masuk awal `delay: i * 100` [../use-gesture/repo-use-gesture/demo/src/sandboxes/cards-stack/src/App.tsx]. *Mahal karena:* kekakuan berubah per fase interaksi.
3. **Ekor organik (teks baris per baris)** — `const trail = useTrail(items.length, { config: { mass: 5, tension: 2000, friction: 200 }, opacity: open ? 1 : 0, x: open ? 0 : 20, height: open ? 110 : 0, from: { opacity: 0, x: 20, height: 0 } })` [repo-react-spring/demo/src/sandboxes/trail/src/App.tsx]. ζ = 200/(2√(2000·5)) = 1.0 → critical tapi berat (mass 5). *Mahal karena:* jeda antar baris muncul dari fisika follow-the-leader, berubah alami saat diinterupsi.
4. **Kontainer lalu isi** — `useChain(open ? [springApi, transApi] : [transApi, springApi], [0, open ? 0.1 : 0.6])` + `trail: 400 / data.length` [repo-react-spring/demo/src/sandboxes/chain/src/App.tsx]. *Mahal karena:* buka: isi menyusul 100 ms; tutup: isi pergi dulu, kontainer menyusut di 600 ms — asimetri hirarki.
5. **Skrip async** — `useSpring({ from: { x: 0 }, to: [{ x: 80 }, { y: 40 }, { x: 0 }], loop: true })` atau `to: async (next) => { await next({ x: 80 }); await next({ y: 40 }) }` [web/advanced__async-animations.md]. *Mahal karena:* tiap langkah mewarisi velocity langkah sebelumnya.
6. **Momentum murni (rocket)** — saat drag `immediate: down`, saat lepas `config: { velocity: [vx*dx, vy*dy], decay: true }` (velocity use-gesture tak bertanda → kalikan `direction`) [repo-react-spring/demo/src/sandboxes/rocket-decay/src/App.tsx, AnimationConfig.ts]. *Mahal karena:* luncur "kaca licin" proporsional kecepatan (jarak 500·v0).

## Performa, aksesibilitas, mobile
- `useReducedMotion()` panggil di root: membaca `(prefers-reduced-motion)` dan otomatis `Globals.assign({ skipAnimation: matches })` → semua spring langsung lompat ke goal [repo-react-spring/packages/shared/src/hooks/useReducedMotion.ts, docs.utilities.use-reduced-motion.mdx]. Manual: `Globals.assign({ skipAnimation: true })`.
- Pakai `animated.*` + bentuk imperatif (tanpa re-render); interpolasi `springs.x.to(v => …)` / `to([a, b], fn)` jalan tanpa React.
- JS thread: animasi bisa tersendat saat main thread sibuk (tidak ada WAAPI offload).
- v11: `onRest` tidak lagi terpanggil saat retarget (baca `finished` dari Promise `start()`) — penting untuk choreography berbasis callback [.changeset/pre/onrest-not-on-retarget.md].

## Sumber lokal
- repo-react-spring/packages/core/src/constants.ts — preset config persis
- repo-react-spring/packages/core/src/AnimationConfig.ts — semua field config + rumus frequency/damping
- repo-react-spring/packages/core/src/SpringValue.ts — integrator 1 ms, decay, bounce, precision
- repo-react-spring/packages/core/src/hooks/{useChain,useTrail,useTransition,usePresence}.ts
- repo-react-spring/docs/app/routes/*.mdx — docs v11 (35 halaman) · web/*.md — situs live v10 (31 halaman)
- repo-react-spring/.changeset/** + web/github-releases.md — perubahan v10→v11
- repo-react-spring/demo/src/sandboxes/*/src/App.tsx — 40+ demo resmi (chain, trail, draggable-list, viewpager, rocket-decay, cards-stack)
