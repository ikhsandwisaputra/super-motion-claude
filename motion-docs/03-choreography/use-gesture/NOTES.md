---
tool: @use-gesture (react + vanilla)
version: 10.3.1 (rilis 2024-03-21; masih npm latest per 2026-10-28; repo main c779631 = 2024-03-21)
official: https://use-gesture.netlify.app (SSL gagal dari mirror, docs diambil dari repo) · https://github.com/pmndrs/use-gesture
local: repo-use-gesture/documentation/pages/docs/*.mdx, repo-use-gesture/packages/core/src/
fetched: 2026-10-28
---
# use-gesture — normalisasi gesture (drag/pinch/wheel/scroll/move/hover) jadi state kinematik; tidak menggerakkan apa pun sendiri

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** saat butuh data gesture mentah yang rapi (movement, offset, velocity, direction, swipe, tap, bounds+rubberband) untuk diumpankan ke spring (react-spring, Motion `animate`/`springValue`) atau ke shader/Three. Ia "not responsible for actually moving the component" [repo-use-gesture/documentation/pages/docs/introduction.mdx].
- **Jangan** kalau cukup `drag` bawaan Motion (`drag` prop / `drag()` vanilla 14.4 sudah punya momentum + elastic + direction lock) atau GSAP `Draggable`+`InertiaPlugin` [../motion/web/docs__drag.md, ../gsap/web/Plugins__Draggable.md].
- Maintenance: rilis terakhir 10.3.1 (2024-03-21) [web/github-releases.md, web/npm-dist-tags.txt] — stabil tapi tidak aktif berkembang; peer `react >= 16.8.0` [repo-use-gesture/packages/react/package.json].

## Mental model (yang memengaruhi FEEL & performa)
- **movement vs offset**: `movement` reset ke [0,0] tiap gesture (untuk elemen yang kembali ke asal), `offset` akumulasi semua gesture (elemen tetap di tempat dilepas); `from` mengatur titik awal offset (default [0,0]) — pakai `from: () => [x.get(), y.get()]` agar drag lanjut dari posisi spring saat ini [docs/state.mdx, docs/options.mdx].
- **velocity = |Δoffset| / Δt per sumbu, px/ms, TANPA tanda** (`absoluteDelta / dt`); arah ada di `direction` (−1/0/1) [repo-use-gesture/packages/core/src/engines/Engine.ts]. Hand-off ke spring: `v = velocity[i] * direction[i]`.
- **Event terakhir**: kinematik tidak dihitung ulang di event `pointerup` kecuali jeda dari event sebelumnya > **32 ms** (`BEFORE_LAST_KINEMATICS_DELAY`) → kalau user berhenti >32 ms sebelum melepas, velocity = 0 (tidak ada "flick palsu") [Engine.ts].
- **Rubberband** hanya saat gesture aktif: `offset' = (d·D·c)/(D + c·d)` (d = jarak lewat batas, D = lebar rentang bounds, c = koefisien; kalau D 0/∞ → `d^(c·5)`); saat dilepas koefisien jadi 0 → offset di-clamp kembali ke bounds (spring yang menganimasikan snap-back) [packages/core/src/utils/maths.ts, Engine.ts]. `rubberband: true` → c = **0.15** (iOS memakai 0.55 menurut komentar source).
- **Swipe** (drag): terdeteksi saat gesture selesai bila durasi ≤ `swipe.duration` (default **250 ms**), `movement > swipe.distance` (default **50 px**), `velocity > swipe.velocity` (default **0.5 px/ms**) per sumbu → `swipe: [-1|0|1, -1|0|1]` [packages/core/src/config/dragConfigResolver.ts]. (state.mdx menulis 220 ms — stale; source 250.)
- **Tap**: `tap = true` bila displacement < 3 px (`tapsThreshold`) — pakai bersama `filterTaps: true` agar klik tidak memicu drag [docs/state.mdx, docs/options.mdx].
- **Threshold sumbu drag**: `{ mouse: 0, pen: 8, touch: 0 }`; `delay: true` = 180 ms; `preventScroll: true` = 250 ms (touch: tahan dulu baru drag, scroll tetap jalan) [dragConfigResolver.ts].
- Keyboard: drag bisa digerakkan panah saat fokus (`pointer.keys` default true, `keyboardDisplacement` 10 px; Shift ×10, Alt ×0.1) [docs/options.mdx].

## Setup minimal (API terverifikasi)
```jsx
import { useDrag, useGesture } from '@use-gesture/react'
const bind = useDrag(({ active, movement: [mx], velocity: [vx], direction: [dx], last, cancel }) => {
  /* … */
}, { axis: 'x', filterTaps: true, bounds: { left: -200, right: 0 }, rubberband: true })
return <div {...bind()} style={{ touchAction: 'pan-y' }} />   // touch-action WAJIB untuk touch
```
```js
import { DragGesture, Gesture } from '@use-gesture/vanilla'
const gesture = new DragGesture(el, (state) => {/* … */}, { axis: 'x' })
gesture.destroy()   // cleanup; vanilla API "new from v10 and still experimental" [docs/introduction.mdx]
```
Hook tersedia: `useDrag, useMove, useHover, useScroll, useWheel, usePinch, useGesture`; tree-shake: `createUseGesture([dragAction, pinchAction])` [docs/gestures.mdx]. `touch-action: pan-y` (atau `none`) di elemen drag [docs/extras.mdx].

## Knob yang menentukan rasa gerak
| Opsi | Efek | Default |
|---|---|---|
| `bounds` (objek/elemen/ref/fungsi) | clamp movement & offset | ±Infinity [docs/options.mdx] |
| `rubberband` | elastis di luar bounds (lihat rumus) | 0; `true` = 0.15 |
| `axis: 'x' \| 'y' \| 'lock'` | kunci sumbu / kunci ke arah pertama | undefined |
| `axisThreshold` | jarak sebelum sumbu ditentukan | drag `{mouse:0, pen:8, touch:0}` |
| `from` | titik awal offset | [0,0] |
| `filterTaps`, `tapsThreshold` | bedakan klik vs drag | false, 3 px |
| `swipe: { distance, velocity, duration }` | sensitivitas swipe | 50 px, 0.5 px/ms, 250 ms |
| `delay`, `preventScroll`, `preventScrollAxis` | perilaku touch vs scroll | 0 / false / 'y' |
| `pointer.capture`, `pointer.lock`, `pointer.touch`, `pointer.keys` | mode pointer | true/false/false/true |
| `eventOptions: { passive }` | listener pasif | `{capture:false, passive:true}` |

## Integrasi
- **react-spring** (pasangan kanon): selama drag `api.start({ x: mx, immediate: active })`, lepas → `api.start({ x: target, config: { ...config.stiff, velocity: vx * dx } })` [../react-spring/repo-react-spring/demo/src/sandboxes/*, repo-use-gesture/demo/src/sandboxes/action-sheet/src/App.jsx]. Satuan cocok: keduanya px/ms.
- **Motion**: velocity Motion dalam unit/**detik** → `animate(el, { x: target }, { type: 'spring', stiffness: 400, damping: 35, velocity: vx * dx * 1000 })` (spring physics; time-defined spring mengabaikan velocity) [../motion/NOTES.md, ../motion/repo-motion/packages/motion-dom/src/animation/generators/spring.ts]. [UNVERIFIED angka stiffness/damping contoh — heuristik]
- **GSAP**: `gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })` selama drag; lepas → InertiaPlugin `inertia: { x: { velocity: vx * dx * 1000 } }` (GSAP velocity px/s) [../gsap/web/GSAP__gsap.quickTo__.md, ../gsap/web/Plugins__InertiaPlugin.md].
- **R3F**: bind ke mesh, lihat demo `gesture-three` [repo-use-gesture/demo/src/sandboxes/gesture-three/].

## Resep non-generik
1. **Bottom sheet** — `bounds: { top: 0 }, rubberband: true, from: () => [0, y.get()]`; lepas: tutup bila `oy > height*0.5 || (vy > 0.5 && dy > 0)`, buka dengan `config.wobbly` bila user menarik melewati −70 px (`cancel()`) [demo action-sheet]. *Mahal karena:* posisi ATAU kecepatan menentukan hasil; tarikan berlebih dihukum dengan wobble.
2. **Deck flick** — `trigger = vx > 0.2`; keluar `x = (200 + innerWidth) * dx`, rotasi `mx/100 + dx*10*vx`; tension 800 saat dipegang [demo cards-stack]. *Mahal karena:* rotasi lepas sebanding kecepatan lemparan.
3. **Viewpager** — saat aktif & `|mx| > width/2` → index ± (berdasar `direction`) lalu `cancel()`; halaman mengecil `scale = 1 − |mx|/width/2` selama drag; hanya tetangga ±1 yang di-render [repo-use-gesture/demo/src/sandboxes/viewpager/src/App.tsx]. Variasi: tambahkan `swipe[0]` agar flick pendek juga pindah halaman. *Mahal karena:* halaman "mundur" ke kedalaman saat ditarik, komit terjadi di tengah gesture.
4. **Draggable list reorder** — item dipegang: `y: curIndex*100 + my`, `scale: 1.1`, `shadow: 15`, `immediate` hanya untuk `zIndex`, `config: key => key === 'y' ? config.stiff : config.default`; item lain spring ke `order.indexOf(i)*100`; baris baru `clamp(round((curIndex*100 + y)/100))` [repo-use-gesture/demo/src/sandboxes/draggable-list/src/App.tsx]. *Mahal karena:* item terangkat (scale+shadow) dengan config per-properti, tetangga menyibak dengan spring.
5. **Pinch/zoom kartu** — `createUseGesture([dragAction, pinchAction])`, `onPinch` pakai `origin` + `offset: [s, a]`, opsi `pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true }` [repo-use-gesture/demo/src/sandboxes/card-zoom/src/App.tsx]. *Mahal karena:* zoom berpusat di titik jari, batas skala elastis.

## Performa, aksesibilitas, mobile
- Selalu set CSS `touch-action` (pan-y / none) — tanpa itu browser mengambil alih gesture touch [docs/extras.mdx].
- `preventScroll` hanya untuk kasus yang tak bisa diselesaikan `touch-action` [docs/extras.mdx].
- Drag aksesibel via keyboard secara default (`pointer.keys`); untuk reduced motion, matikan spring (react-spring `useReducedMotion`) bukan gesturenya.
- Handler jalan per pointer event, bukan per frame: hindari setState React di handler; pakai spring imperatif.

## Sumber lokal
- repo-use-gesture/documentation/pages/docs/state.mdx — semua atribut state (velocity px/ms, swipe, tap)
- repo-use-gesture/documentation/pages/docs/options.mdx — semua opsi + default
- repo-use-gesture/documentation/pages/docs/gestures.mdx, extras.mdx, faq.mdx, utilities.mdx, changelog.mdx
- repo-use-gesture/packages/core/src/engines/Engine.ts — kinematik, rubberband saat aktif, 32 ms rule
- repo-use-gesture/packages/core/src/utils/maths.ts — rumus rubberband
- repo-use-gesture/packages/core/src/config/dragConfigResolver.ts — default swipe/delay/threshold
- repo-use-gesture/demo/src/sandboxes/*/src/* — 24 demo resmi (action-sheet, cards-stack, viewpager, draggable-list, gesture-three…)
- web/github-releases.md — riwayat rilis
