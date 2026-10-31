---
tool: Anime.js v4 (paket `animejs`)
version: 4.5.0 (rilis 2026-06-22, npm latest per 2026-10-28; ada 5.0.0-beta.2 di tag `beta`). Repo main 01b81be
official: https://animejs.com/documentation · https://github.com/juliangarnier/anime
local: web/*.md (419 halaman docs, server-rendered, 0 THIN), repo-anime/src/**, web/wiki__Migrating-from-v3-to-v4.md
fetched: 2026-10-28
---
# Anime.js v4 — engine animasi modular & ringan: stagger terkuat (grid/auto-grid/jitter), timeline, spring perseptual, draggable, onScroll, SVG, splitText, layout

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk vanilla/non-React (atau React via `createScope`) yang butuh **stagger kaya** (grid 2D/3D, `grid: true` dari posisi DOM, `jitter`, range value, stagger sebagai *posisi* timeline), timeline ber-label, SVG draw/morph/motion path, text split, `createLayout` (FLIP), Draggable dengan spring rilis — semua MIT [repo-anime/package.json].
- **vs GSAP**: API mirip timeline GSAP tapi MIT & modular (subpath `animejs/text`, `animejs/scope`, …); GSAP masih unggul di ScrollTrigger pin/snap & MorphSVG. **vs Motion**: anime tidak punya MotionValue/React bindings; Motion lebih baik untuk interupsi berbasis velocity di React.
- **Jangan** campur dengan sintaks v3 (`anime({ targets })`, `easing:`, `direction:`) — semua berubah (lihat bagian breaking changes).

## Mental model (yang memengaruhi FEEL & performa)
- Unit waktu default **ms** (`engine.timeUnit` bisa `'s'`) [web/engine__engine-parameters__timeunit-seconds-milliseconds.md]. Default animasi: `duration: 1000`, `ease: 'out(2)'`, `delay: 0`, `composition: 'replace'` (otomatis `'none'` bila ≥1000 target) [web/animation__tween-parameters__*.md].
- Semua class mewarisi `Timer` (play/pause/resume/reverse/alternate/seek/stretch/revert) [web/timer.md, web/github-releases.md v4.0.0].
- **Spring = easing** yang menghitung durasi settle sendiri dan **menimpa `duration`** animasi [web/easings__spring.md]. Model perseptual = SwiftUI: `stiffness = (2π/pd)²`, `damping = (1−bounce)·4π/pd` (bounce ≥ 0) atau `4π/(pd·(1+bounce))` (bounce < 0), mass 1, velocity 0; default **bounce 0.5, duration (perceived) 628 ms**; physics default stiffness 100, damping 10, mass 1 (≈ pd 628 = 2π·100 ms) [repo-anime/src/easings/spring/index.js]. `spring()` adalah nama baru; `createSpring()` deprecated (warning).
- `spring({ onComplete })` dipanggil saat **perceived duration** tercapai, beda dengan `onComplete` animasi yang menunggu settle penuh [web/easings__spring.md].
- **Stagger** [repo-anime/src/utils/stagger.js]: nilai_i = `start + spacing·round(dist_i, 2) (+ jitter)`; `dist` = |from − i| (1D) / euclid di `grid: [c, r(, d)]` / jarak piksel pusat `getBoundingClientRect()` dinormalisasi ke jarak terdekat bila `grid: true` (auto-grid, 4.4.0; 3D 4.5.0); `axis: 'x'|'y'|'z'` pakai jarak bertanda; `ease` meredistribusi `dist` (`ease(dist/max)·max`); **range** `[a, b]` → `spacing = (b−a)/max` = total dibagi rata (vs angka = per-item); `reversed`, `from: 'random'` (bisa `seed`), `total`, `use` (index kustom), `modifier`.
- **Posisi timeline** (beda dengan GSAP/Motion!): `'<'` = **akhir** elemen sebelumnya, `'<<'` = **awal** elemen sebelumnya, `'<<+=250'`, `'+=100'`/`'-=100'` relatif ke elemen terakhir, `'*=.5'`, label, atau `stagger(…)` [web/timeline__time-position.md].
- **onScroll threshold** urutannya **"container target"**: `enter: 'bottom top'` = bawah container bertemu atas target; default `enter: 'end start'`, `leave: 'start end'` [web/events__onscroll__scrollobserver-thresholds.md] — kebalikan Motion (`"target container"`) dan GSAP (`"trigger scroller"`).

## Setup minimal (API terverifikasi)
```js
import { animate, createTimeline, stagger, spring, onScroll, createDraggable, createScope, svg, splitText, utils } from 'animejs'
const a = animate('.card', { y: { from: 24 }, opacity: { from: 0 }, delay: stagger(60), ease: 'out(3)', duration: 700 })
a.revert()                                   // pulihkan style asli (cleanup)
const scope = createScope({ root: '#app', mediaQueries: { reduceMotion: '(prefers-reduced-motion)' } })
  .add(self => { /* semua instance di sini ter-scope; self.matches.reduceMotion */ })
scope.revert()                               // revert semua sekaligus (React: di cleanup useEffect)
```
Sumber: [web/getting-started__using-with-react.md, web/scope.md, web/animation__animation-methods__revert.md]. Subpath standalone: `animejs/text` (splitText, sejak 4.2.0), `animejs/scope`, `animejs/animatable`, `animejs/events` [web/text__splittext.md, web/animatable.md, web/events__onscroll.md].

## Breaking changes v3 → v4 [web/wiki__Migrating-from-v3-to-v4.md, web/github-releases.md]
`anime({ targets })` → `animate(targets, params)` · `easing` → `ease`, nama tanpa prefix (`'easeOutQuad'` → `'outQuad'`), default `'out(2)'` · `value` → `to` · `endDelay` → `loopDelay` (tidak menambah delay di akhir iterasi terakhir) · `direction: 'reverse'/'alternate'` → `reversed: true` / `alternate: true` · `loop: 1` kini = ulang sekali (2 iterasi) · `round` → `modifier: utils.round(2)` · callback ber-prefix `on` (`onUpdate`, `onBegin` setelah delay, `onLoop` gantikan loopBegin/loopComplete, `onRender` gantikan change) · `.finished` → `.then()` · `anime.timeline()` → `createTimeline({ defaults: {…} })` · `play()` selalu maju, `reverse()` selalu mundur, `alternate()` membalik · `anime.path` → `svg.createMotionPath` (return `translateX/translateY/rotate`) · `setDashoffset` → `svg.createDrawable` + `draw: '0 1'` · `easing: 'spring(1,80,10,0)'` → `ease: spring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 })` · stagger `direction` → `reversed`, `easing` → `ease`.

## Knob yang menentukan rasa gerak
| Knob | Efek | Default |
|---|---|---|
| `ease` | `'linear'`, `'in/out/inOut/outIn(power)'` (power 1.675), `'…Quad/Cubic/Quart/Quint/Sine/Expo/Circ/Bounce'`, `'…Back(overshoot=1.70158)'`, `'…Elastic(amplitude=1, period=.3)'`, `cubicBezier()`, `steps()`, `linear(…)`, `irregular()`, `spring()` | `'out(2)'` [web/easings__built-in-eases.md] |
| `spring({ bounce, duration })` | perseptual; docs sarankan bounce −0.5..0.5 | 0.5 / 628 ms |
| `spring({ stiffness, damping, mass, velocity })` | physics | 100 / 10 / 1 / 0 |
| `playbackEase` | ease atas progress keseluruhan (bukan per keyframe) | null [web/animation__animation-playback-settings__playbackease.md] |
| `composition` | `'replace'` / `'blend'` (aditif) / `'none'` | replace |
| `stagger(v, { from, grid, axis, ease, reversed, start, jitter, seed, total, use, modifier })` | lihat mental model | from 0 |
| `createTimeline({ defaults, loop, alternate, playbackEase, playbackRate })` | orkestrasi | — |
| `onScroll({ container, target, axis, enter, leave, sync, repeat, debug })` | `sync: true` (progress), angka 0–1 (smooth catch-up), nama ease (eased), `'play pause'` (method) | sync method default `'play pause'` [web/events__onscroll__scrollobserver-synchronisation-modes__*.md] |
| Draggable `releaseStiffness/releaseDamping/releaseMass/releaseEase` | rasa lemparan; `releaseEase: spring()` menimpa mass/stiffness/damping dan **`velocity` spring diganti velocity aktual elemen** (hand-off otomatis) | 80 / 10 / 1 / `eases.outQuint` [web/draggable__draggable-settings__*.md, releaseease.md] |
| Draggable `containerFriction`, `releaseContainerFriction`, `velocityMultiplier`, `minVelocity/maxVelocity`, `dragThreshold`, `snap` | gesekan tepi, lemparan | 0.8 / =containerFriction / 1 / 0–50 / `{mouse:3, touch:7}` / 0 |
| `createAnimatable(t, { x: 500, ease: 'out(3)' })` | setter teranimasi untuk input frekuensi tinggi | [web/animatable.md] |
| `createLayout` settings | `duration 350, ease 'inOut(3.5)', delay 0, children '*'`; states `enterFrom/leaveTo/swapAt` | [web/layout__layout-settings__*.md, layout__states-parameters__*.md] |

## Integrasi
- **React**: `useEffect(() => { scope.current = createScope({ root }).add(self => {...}); return () => scope.current.revert() }, [])`; `self.add('name', fn)` untuk method dipanggil dari handler [web/getting-started__using-with-react.md].
- **Three.js**: adapter resmi (object property, transforms, materials/uniforms, instanced/batched) [web/adapters__threejs-adapter*.md]; auto-grid stagger 3D memakai `z` objek (4.5.0).
- **WAAPI**: `waapi.animate()` untuk off-main-thread; `waapi.convertEase()` mengubah ease JS ke `linear()` [web/web-animation-api*.md].
- **Scroll + Lenis**: onScroll membaca posisi scroll container; [UNVERIFIED] pola resmi dengan Lenis tidak ditemukan di docs lokal.

## Resep non-generik
1. **Ripple fisik dari titik klik** —
   ```js
   animate('.dot', { scale: [{ to: 1.4, duration: 180 }, { to: 1, ease: spring({ bounce: .35, duration: 420 }) }],
     delay: stagger(28, { grid: true, from: [clickXRatio, clickYRatio], jitter: [0, 40], seed: 7 }) })
   ```
   *Mahal karena:* delay dari jarak piksel nyata (auto-grid) + jitter yang membesar ke tepi (`[start,end]` diinterpolasi oleh progress jarak) [repo-anime/src/utils/stagger.js].
2. **Scene timeline dengan overlap di awal elemen sebelumnya** —
   ```js
   createTimeline({ defaults: { ease: 'out(4)', duration: 600 } })
     .label('intro')
     .add('.title .char', { y: { from: '100%' }, delay: stagger(18) }, 'intro')
     .add('.subtitle', { opacity: { from: 0 }, y: { from: 12 } }, '<<+=240')
     .add('.cta', { scale: { from: .9 }, ease: spring({ bounce: .3, duration: 400 }) }, '<-=100')
   ```
   *Mahal karena:* follow mulai 240 ms setelah *awal* lead, CTA overlap 100 ms dengan akhir subtitle.
3. **Reveal per baris yang tahan reflow** — `const split = splitText('h1', { lines: { wrap: 'clip' }, words: true })` lalu `split.addEffect(({ lines }) => animate(lines, { y: { from: '100%' }, delay: stagger(80) }))` [web/text__splittext*.md]. *Mahal karena:* masking clip + re-split otomatis saat font/resize.
4. **Scroll scrub dengan lag halus** — `animate('.panel', { x: '-60vw', ease: 'linear', autoplay: onScroll({ target: '.section', enter: 'bottom top', leave: 'top bottom', sync: .25 }) })` [web/events__onscroll__scrollobserver-synchronisation-modes__smooth-scroll.md]. *Mahal karena:* playhead mengejar scroll dengan inersia, bukan menempel kaku.
5. **Garis tergambar + objek mengikuti path** — `animate(svg.createDrawable('.track'), { draw: ['0 0', '0 1'] })` + `animate('.car', { ...svg.createMotionPath('.track'), ease: 'linear', duration: 5000 })` [web/svg__createdrawable.md, web/svg__createmotionpath.md]. *Mahal karena:* draw & rotate tangen sinkron di satu path.
6. **Throw dengan rilis bouncy** — `createDraggable('.puck', { container: '.table', releaseEase: spring({ bounce: .6 }), containerFriction: .9 })` [web/draggable__draggable-settings__releaseease.md, getting-started__using-with-react.md]. *Mahal karena:* rilis memantul dengan spring perseptual, bukan berhenti dingin.

## Performa, aksesibilitas, mobile
- Reduced motion: lewat `createScope({ mediaQueries: { reduceMotion: '(prefers-reduced-motion)' } })` dan cek `self.matches.reduceMotion` (contoh resmi) [web/scope.md]; tidak ada switch global otomatis [UNVERIFIED: tidak ditemukan di docs].
- `engine.pauseOnDocumentHidden` default true, `engine.fps` 240, `precision` 4 desimal [web/engine__engine-parameters__*.md].
- `splitText` `accessible: true` default (aria) [web/text__splittext__textsplitter-settings__accessible.md].
- `createDrawable` + `vector-effect: non-scaling-stroke` bisa lambat (skala dihitung ulang tiap tick) [web/svg__createdrawable.md].
- Draggable `dragThreshold` touch 7 px mencegah konflik scroll [web/draggable__draggable-settings__dragthreshold.md].

## Sumber lokal
- web/_index.md — index 419 halaman docs (animation, timeline, stagger, draggable, onScroll, svg, text, layout, scope, engine, waapi, utilities, adapters)
- web/wiki__Migrating-from-v3-to-v4.md — migrasi resmi v3→v4
- web/github-releases.md — catatan rilis v1→v4.5.0 (fitur per versi)
- repo-anime/src/utils/stagger.js — algoritme stagger lengkap
- repo-anime/src/easings/spring/index.js — solver spring + rumus perseptual
- repo-anime/src/timeline/position.js — parser posisi timeline
- repo-anime/src/events/scroll.js, src/draggable/draggable.js, src/layout/layout.js, src/text/split.js
- repo-anime/examples/** — contoh resmi (advanced-grid-staggering, onscroll-sticky, draggable carousels, text split effects, timeline-seamless-loop)
- repo-anime/dist/modules/**/*.d.ts — tipe parameter
