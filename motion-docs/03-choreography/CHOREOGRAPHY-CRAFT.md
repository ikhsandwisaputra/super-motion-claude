# CHOREOGRAPHY-CRAFT — ilmu ritme lintas library (Motion · GSAP · Anime.js · react-spring · Theatre · use-gesture)

Distilasi dari mirror di folder ini (2026-10-28). Setiap klaim konkret diberi sitasi `[path]` relatif ke `03-choreography/`.
Yang berupa heuristik/opini (bukan dari docs) ditandai **heuristik**. Versi: Motion 14.7.1, GSAP 3.15.0, Anime 4.5.0,
react-spring 10.1.2/11-beta, Theatre 0.7.2, use-gesture 10.3.1.

---

## 1. Hierarki timing: lead → follow
Gerak yang terasa "mahal" punya pemimpin (container / elemen utama) dan pengikut (isi / detail) yang datang sedikit terlambat.

| Library | Primitif lead/follow |
|---|---|
| Motion (variants) | parent `transition: { when: "beforeChildren" \| "afterChildren", delayChildren: stagger(0.1) }` — anak menunggu parent selesai / parent menunggu anak [motion/web/docs__react-transitions.md]. `staggerChildren/staggerDirection` **deprecated** → `delayChildren: stagger(…)` [motion/repo-motion/packages/motion-dom/src/animation/types.ts] |
| Motion (sequence) | segmen berikutnya default mulai di akhir segmen sebelumnya; segmen setelah stagger dijadwalkan setelah elemen stagger *terakhir* [motion/web/docs__animate.md, motion/web/docs__stagger.md] |
| GSAP | `tl.from(lead…).from(follow…, "<0.15")` — follow mulai 0.15 s setelah *awal* lead [gsap/web/resources__position-parameter.md] |
| Anime.js | `.add(follow, {...}, '<<+=240')` — 240 ms setelah *awal* elemen sebelumnya [animejs/web/timeline__time-position.md] |
| react-spring | `useChain([containerRef, itemsRef])` → items mulai setelah container **diam (rest)**; atau `useChain(refs, [0, 0.1])` → items mulai 10% × 1000 ms [react-spring/repo-react-spring/packages/core/src/hooks/useChain.ts] |
| Theatre | aggregate keyframe di track object/compound memindahkan keyframe anak bersama (grup lead/follow tetap rapat saat retime) [theatre-js/web/manual__sequences.md] |

Contoh resmi yang menunjukkan hirarki: kontainer membesar dulu, isi menyusul 100 ms saat buka; saat tutup isi pergi dulu dan kontainer menyusut di 600 ms — urutan ref **dibalik** [react-spring/repo-react-spring/demo/src/sandboxes/chain/src/App.tsx].

## 2. Overlap: offset negatif & position parameter
Overlap (follow mulai sebelum lead selesai) adalah sumber utama "kelancaran". Sintaksnya **beda arti antar library**:

| Maksud | GSAP | Motion `at` | Anime.js |
|---|---|---|---|
| Absolut | `3` (detik) | `3` (detik) | `3000` (ms default) |
| Mulai bareng awal sebelumnya | `"<"` | `"<"` | `'<<'` |
| Di akhir sebelumnya | `">"` | default / `"+0"` | `'<'` |
| X sebelum akhir sebelumnya | `">-0.5"` | `"-0.5"` (relatif **akhir segmen sebelumnya**) | `'<-=500'` |
| X setelah awal sebelumnya | `"<0.3"` = `"<+=0.3"` | `"<0.3"` | `'<<+=300'` |
| Relatif akhir **timeline** | `"-=1"` / `"+=1"` | — | `'-=100'`/`'+=100'` (relatif elemen terakhir) |
| Persen | `"-=25%"` (durasi yang disisipkan), `"<25%"` (durasi sebelumnya) | — | `'*=.5'` |
| Label | `"label"`, `"label+=2"` | `"label"`, `"label+0.5"` (14.7) | `'label'` |
| Stagger sebagai posisi | `stagger` di vars | `delay: stagger()` per segmen | `stagger(10)` sebagai argumen posisi |
Sumber: [gsap/web/resources__position-parameter.md], [motion/web/docs__animate.md, motion/repo-motion/packages/framer-motion/src/animation/sequence/utils/calc-time.ts, …/sequence/create.ts], [animejs/web/timeline__time-position.md].

Trik overlap lain:
- **Delay negatif = mulai di tengah animasi** (Motion `delay: -1`), dan `stagger(0.05, { startDelay: -1 })` membuat semua segmen spinner langsung "sedang berjalan" [motion/web/docs__react-transitions.md, motion/web/docs__stagger.md].
- GSAP stagger negatif (`stagger: -0.1`) = urutan terbalik [gsap/web/resources__getting-started__Staggers.md].
- GSAP: `repeat` di **dalam** objek stagger → tiap sub-tween berulang sendiri (gelombang abadi), di luar → seluruh grup menunggu [gsap/web/resources__getting-started__Staggers.md].

## 3. Distribusi stagger
**Origin (`from`)** — semua mendukung first/center/last/index/random; edges: Motion & GSAP; koordinat pecahan `[rx, ry]`: GSAP & Anime.
- Motion `stagger(step, { from: "first"|"center"|"last"|"edges"|"random"|i, grid: [cols, rows], ease, startDelay })`; jarak = `|i − origin|` atau `hypot(dx, dy)` di grid; `"edges"` = jarak ke tepi terdekat; `"random"` = shuffle (setiap elemen dapat step unik) [motion/repo-motion/packages/motion-dom/src/utils/stagger.ts, motion/web/docs__stagger.md].
- GSAP `stagger: { each | amount, from, grid: [rows, cols] | "auto", axis, ease }` (di balik layar `gsap.utils.distribute`) [gsap/web/resources__getting-started__Staggers.md, gsap/web/GSAP__UtilityMethods__distribute__.md].
- Anime `stagger(v, { from, grid: [c, r(, d)] | true, axis, ease, reversed, start, jitter, seed, total, use, modifier })`; `grid: true` = **jarak piksel nyata** dari pusat `getBoundingClientRect()` (4.4.0), 3D (4.5.0) [animejs/repo-anime/src/utils/stagger.js, animejs/web/utilities__stagger__stagger-parameters__stagger-grid.md].

**Per-item vs total (jumlah ter-ease)**
- *Per-item*: GSAP `each`, Motion `stagger(step)`, Anime `stagger(100)` → grup besar = total lama (100 item × 50 ms = 5 s).
- *Total*: GSAP `amount: 1` → 100 elemen = 0.01 s per elemen [gsap/web/resources__getting-started__Staggers.md]; Anime range `stagger([0, 500])` → `spacing = (b−a)/maxDist` [animejs/repo-anime/src/utils/stagger.js, animejs/web/utilities__stagger__stagger-value-types__range-value.md]. Pakai *total* saat jumlah elemen dinamis (teks per huruf, grid responsif) supaya durasi scene konstan.
- *Eased*: distribusi waktu mulai melalui kurva. Motion: `delay = ease(delay/maxDelay)·maxDelay`, `maxDelay = step·total` (non-grid) [motion/…/stagger.ts]; Anime: `dist' = ease(dist/max)·max` [animejs/…/stagger.js]; GSAP `ease` di objek stagger, `"power2"` = jarak awal lebar lalu merapat [gsap/web/resources__getting-started__Staggers.md].
- *Jitter* (Anime 4.5): offset acak per item, `jitter: [start, end]` membesar sesuai jarak, `seed` agar reproducible [animejs/web/utilities__stagger__stagger-parameters__stagger-jitter.md].

**Stagger nilai, bukan waktu**: GSAP `scale: gsap.utils.distribute({ base: 0.5, amount: 2.5, from: "center" })`; Anime `y: stagger(['2.75rem', '-2.75rem'])` [gsap/web/GSAP__UtilityMethods__distribute__.md, animejs/web/utilities__stagger__stagger-value-types__range-value.md] → bentuk (gelombang, kubah) lahir dari distribusi, bukan keyframe.

**Follow-the-leader vs time-offset**: `useTrail` react-spring tidak memakai delay; tiap item men-target spring item sebelumnya (`to: parent.springs`) → jeda membesar saat kepala cepat dan menutup saat berhenti [react-spring/repo-react-spring/packages/core/src/hooks/useTrail.ts]. Contoh resmi: `{ mass: 5, tension: 2000, friction: 200 }` [react-spring/repo-react-spring/demo/src/sandboxes/trail/src/App.tsx]. Pakai untuk ekor kursor/teks yang harus *bereaksi*, time-offset untuk reveal yang diputar sekali.

## 4. Asimetri entrance vs exit
Masuk = informatif (lebih lama, ease-out/bounce), keluar = menyingkir (lebih cepat, ease-in, urutan terbalik).
- Motion: `AnimatePresence mode="wait"` + exit `ease: "easeIn"`, enter `ease: "easeOut"` = kesan easeInOut total [motion/web/docs__react-animate-presence.md]. Stagger buka `delayChildren: stagger(0.1)`, tutup `stagger(0.01, { from: "last" })` [motion/web/docs__stagger.md]. `transition.out` (14.7) mendefinisikan transisi saat *meninggalkan* state (hover end) [motion/repo-motion/packages/motion-dom/src/animation/types.ts].
- GSAP 3.15 `easeReverse` (ease berbeda saat mundur, dihitung ulang dari titik balik) + `tl.timeScale(1.5).reverse()` untuk close lebih cepat [gsap/web/blog__3-15.md].
- react-spring: urutan ref dibalik + timeSteps berbeda (buka `[0, 0.1]`, tutup `[0, 0.6]`) [react-spring/repo-react-spring/demo/src/sandboxes/chain/src/App.tsx]; v11 `usePresenceList` `mode: 'wait'` [react-spring/repo-react-spring/.changeset/pre/use-presence.md].
- Theatre: `play({ direction: 'reverse', rate: 1.6 })` memutar kurva yang sama mundur lebih cepat [theatre-js/repo-theatre/packages/core/src/types/public.ts].
- Anime: `play()` selalu maju, `reverse()` selalu mundur, `alternate()` membalik arah sekarang [animejs/web/wiki__Migrating-from-v3-to-v4.md].
- Catatan: membalik tween juga membalik ease (ease-out jadi ease-in) — alasan easeReverse ada [gsap/web/blog__3-15.md].

## 5. Durasi mengikuti jarak, ukuran & kecepatan
- **Physics spring = durasi lahir dari fisika**: ODE linear `x'' = (−k·x − c·v)/m` [motion/repo-motion/packages/motion-dom/src/animation/generators/spring.ts, react-spring/repo-react-spring/packages/core/src/SpringValue.ts] → karakter (overshoot, waktu settle relatif) sama untuk jarak kecil/besar; hanya ambang rest yang absolut (Motion: restDelta 0.5 atau 0.005 bila |Δ|<5) [motion/…/spring.ts].
- **Inertia/decay = jarak ∝ kecepatan**: Motion `target = origin + power·velocity`, ekor `e^(−t/timeConstant)` [motion/repo-motion/packages/motion-dom/src/animation/generators/inertia.ts]; react-spring decay jarak total `v0/(1−decay)` = 500·v0 (px/ms) untuk 0.998 [react-spring/…/SpringValue.ts]; GSAP InertiaPlugin menghitung durasi sendiri dari velocity & resistance (lemparan cepat → tween lebih lama), batasi dengan `minDuration` 0.2 / `maxDuration` 10 [gsap/web/Plugins__InertiaPlugin.md, gsap/web/Plugins__Draggable.md].
- **Snap berbasis jarak**: ScrollTrigger `snap.duration: { min: 0.2, max: 3 }` — berhenti dekat titik snap = snap singkat, jauh = lebih lama [gsap/web/Plugins__ScrollTrigger.md].
- **Scrub**: durasi tween di timeline ter-scrub = proporsi jarak scroll (1 s : 3 s : 1 s = 20% : 60% : 20% jarak) [gsap/web/Plugins__ScrollTrigger.md FAQ].
- Tween manual **heuristik**: hitung durasi dari jarak dengan `gsap.utils.mapRange(inMin, inMax, outMin, outMax, distance)` + `clamp` [gsap/web/GSAP__UtilityMethods__mapRange__.md, …clamp__.md]; kalibrasi konstanta secara visual (tidak ada angka resmi di docs lokal).

## 6. Kosakata ease (kurva konkret)
| Nama | Kurva | Sumber |
|---|---|---|
| CSS `ease` | `cubic-bezier(.25,.1,.25,1)` | [../_shared/mdn-content/files/en-us/web/css/reference/values/easing-function/index.md] |
| CSS `ease-in` / `ease-out` / `ease-in-out` | `(.42,0,1,1)` / `(0,0,.58,1)` / `(.42,0,.58,1)` (= Motion `easeIn/easeOut/easeInOut`) | [MDN idem, motion/repo-motion/packages/motion-utils/src/easing/ease.ts] |
| Motion default tween (opacity/warna) | `(.25,.1,.35,1)` "sedikit lebih landai dari default browser", 0.3 s | [motion/repo-motion/packages/motion-dom/src/animation/utils/default-transitions.ts] |
| Motion `backOut` | `(.33,1.53,.69,.99)`; `backIn` = reverse, `backInOut` = mirror; `anticipate` = setengah backIn + ekor expo | [motion/repo-motion/packages/motion-utils/src/easing/back.ts, anticipate.ts] |
| GSAP `power1..4` | power1 = Quad (t²), power2 = Cubic (t³), power3 = Quart (t⁴), power4 = Quint/Strong (t⁵); `.out = 1−(1−p)^n` | [gsap/repo-gsap/src/gsap-core.js:1066] |
| Default lib | GSAP `"power1.out"` = Anime `'out(2)'` = quad-out | [gsap/web/Eases.md, animejs/web/animation__tween-parameters__ease.md] |
| Anime `in/out/inOut/outIn(p)` | power parametrik (docs: default 1.675) | [animejs/web/easings__built-in-eases.md] |
| Back / Elastic | Anime `outBack(1.70158)`, `outElastic(1, .3)`; GSAP `"back.out(1.7)"`, `"elastic.out(1, 0.3)"` | [animejs/web/easings__built-in-eases.md, gsap/web/gsap.com__llms-full.txt] |
| Penner bezier (Studio Theatre) | Quad Out `.25,.46,.45,.94` · Cubic Out `.215,.61,.355,1` · Quart Out `.165,.84,.44,1` · Quint Out `.23,1,.32,1` · Expo Out `.19,1,.22,1` · Circ Out `.075,.82,.165,1` · Back Out `.175,.885,.32,1.275` · Expo In Out `1,0,0,1` · Back In Out `.68,-.55,.265,1.55` | [theatre-js/repo-theatre/packages/studio/src/panels/SequenceEditorPanel/DopeSheet/Right/BasicKeyframedTrack/KeyframeEditor/CurveEditorPopover/shared.ts] |
| Spring sebagai CSS | Motion `spring(0.5)` → string `"<ms> linear(…)"` untuk `transition`; WAAPI memakai `linear()` sejak 12.7.5 | [motion/web/docs__spring.md, motion/repo-motion/CHANGELOG.md, ../_shared/mdn-content/files/en-us/web/css/reference/values/easing-function/linear/index.md] |
| Ekspresif | GSAP `CustomEase` (path SVG), `CustomWiggle` (`wiggles`, type `easeOut/easeInOut/anticipate/uniform/random`), `CustomBounce` (`strength`, `squash` + ease squash sinkron) | [gsap/web/Eases__Custom*.md] |
| Timing global | Anime `playbackEase` (ease atas seluruh progress, bukan per keyframe); GSAP `tweenTo/tweenFromTo` dengan ease di timeline | [animejs/web/animation__animation-playback-settings__playbackease.md, gsap/web/GSAP__Timeline__tweenTo__.md] |

Arah pakai (konvensi docs): enter = ease-out, exit = ease-in [motion/web/docs__react-animate-presence.md].

## 7. Tween vs spring; interupsi & hand-off velocity
**Tween** = durasi + kurva, bisa di-scrub/reverse deterministik (cocok timeline & scroll). **Spring** = state fisika, *retarget* membawa velocity (cocok input user).

**Kesetaraan spring lintas library** (model SwiftUI yang sama, mass 1):
- Physics: Motion `stiffness/damping/mass` = react-spring `tension/friction/mass` = Anime `stiffness/damping/mass` (semua per-detik) [motion/…/spring.ts, react-spring/…/SpringValue.ts (1e-6/ms² = 1/s²), animejs/repo-anime/src/easings/spring/index.js] → preset react-spring `default {170,26}`, `stiff {210,20}`, `wobbly {180,12}` [react-spring/repo-react-spring/packages/core/src/constants.ts] bisa ditempel ke Motion/Anime.
- Perseptual: `k = (2π/T)²`, `c = 2ζ√k`, dengan **T = Anime `duration`/1000 = react-spring `frequency` = 1.2 × Motion `visualDuration`**, dan **ζ = 1 − bounce** (Motion & Anime, bounce ≥ 0) = react-spring `damping` [motion/…/spring.ts, animejs/…/spring/index.js, react-spring/repo-react-spring/packages/core/src/AnimationConfig.ts]. Contoh: Motion `{ visualDuration: 0.5, bounce: 0.2 }` ≡ Anime `spring({ duration: 600, bounce: 0.2 })` ≡ react-spring `{ frequency: 0.6, damping: 0.8 }` ≈ `k ≈ 109.7, c ≈ 16.8`.
- Default berbeda: Motion bounce 0.3 / vd 0.3 s; Anime bounce 0.5 / 628 ms; react-spring default critical (`{170, 26}`, ζ≈1) [sumber idem].

**Siapa yang mewarisi velocity saat interupsi?**
- Motion physics spring: ya (retarget memakai velocity sekarang); **time-defined (`duration`/`bounce`/`visualDuration`) di-nol-kan** [motion/…/spring.ts], ditegaskan docs [motion/web/docs__react-transitions.md, motion/web/docs__spring-value.md].
- react-spring: ya — `lastVelocity` dibawa ke target baru; hanya di-null-kan bila node sudah selesai (`reset()`: `if (done) this.lastVelocity = null`) [react-spring/…/SpringValue.ts, react-spring/repo-react-spring/packages/animated/src/AnimatedValue.ts]; `config.velocity` hanya dipakai bila belum ada `lastVelocity`. v11: `onRest` tidak lagi terpicu saat retarget [react-spring/repo-react-spring/.changeset/pre/onrest-not-on-retarget.md].
- Anime Draggable `releaseEase: spring()` — velocity spring **diganti velocity aktual** elemen [animejs/web/draggable__draggable-settings__releaseease.md].
- GSAP: tween tidak membawa velocity; untuk lemparan pakai InertiaPlugin (`velocity: "auto"` setelah `InertiaPlugin.track()` ≥ 0.5 s sebelumnya) [gsap/web/Plugins__InertiaPlugin.md]; untuk retarget kontinu `gsap.quickTo` (restart ke nilai baru) [gsap/web/GSAP__gsap.quickTo__.md]; `easeReverse` menghitung ulang ease dari titik balik [gsap/web/blog__3-15.md].

**Satuan velocity saat hand-off**: use-gesture `velocity` px/ms **tanpa tanda** (kalikan `direction`) [use-gesture/repo-use-gesture/packages/core/src/engines/Engine.ts]; react-spring `config.velocity` unit/ms (cocok langsung) [react-spring/…/SpringValue.ts]; Motion unit/detik (×1000) [motion/…/spring.ts `millisecondsToSeconds`]; GSAP Inertia px/detik [gsap/web/Plugins__InertiaPlugin.md]. Kinematik use-gesture tidak dihitung di `pointerup` kecuali jeda > 32 ms → berhenti sebelum melepas = velocity 0 [use-gesture/…/Engine.ts].

**Pola keputusan lepas** (resmi): komit bila posisi melewati ambang **atau** velocity > ambang searah (`oy > h·0.5 || (vy > 0.5 && dy > 0)`), lalu spring dengan `velocity: vy` [use-gesture/repo-use-gesture/demo/src/sandboxes/action-sheet/src/App.jsx]; swipe default 50 px / 0.5 px/ms / ≤250 ms [use-gesture/repo-use-gesture/packages/core/src/config/dragConfigResolver.ts].

**Elastis di batas**: use-gesture rubberband `d·D·c/(D + c·d)`, c = 0.15 (komentar: iOS 0.55) [use-gesture/…/utils/maths.ts]; Motion `dragElastic` 0.35 **linear** [motion/repo-motion/packages/motion-dom/src/gestures/drag/utils/constraints.ts]; GSAP `edgeResistance` 0–1 [gsap/web/Plugins__Draggable.md]; Anime `containerFriction` 0.8 [animejs/web/draggable__draggable-settings__containerfriction.md].

## 8. Scroll-scrub vs scroll-trigger
- **Trigger (sekali/toggle)** = animasi berbasis waktu yang dimulai saat masuk viewport: Motion `inView` (IntersectionObserver, lazy) [motion/web/docs__inview.md, motion/web/docs__migrate-from-gsap-to-motion.md]; GSAP `toggleActions: "play none none none"` default (onEnter, onLeave, onEnterBack, onLeaveBack), `once`, `ScrollTrigger.batch` [gsap/web/Plugins__ScrollTrigger.md, …static.batch__.md]; Anime `onScroll({ sync: 'play pause' })` (default) [animejs/web/events__onscroll__scrollobserver-synchronisation-modes__method-names.md].
- **Scrub (terhubung progress)**: Motion `scroll(animation, { target, offset })` (ScrollTimeline/ViewTimeline bila bisa) [motion/web/docs__scroll.md]; GSAP `scrub: true` (kaku) / `scrub: 1` (mengejar 1 s) [gsap/web/Plugins__ScrollTrigger.md]; Anime `sync: true` (kaku), `sync: .25` (smooth catch-up), `sync: 'inOutCirc'` (eased) [animejs/web/events__onscroll__scrollobserver-synchronisation-modes__*.md]; Theatre `sequence.position = p·length` [theatre-js/NOTES.md].
- Scrub harus memakai ease linear di animasi container (GSAP `containerAnimation` mewajibkan `ease: "none"`; Motion contoh `ease: "linear"`) dan easing dipindah ke *smoothing* (scrub angka / useSpring / sync angka) [gsap/web/Plugins__ScrollTrigger.md, motion/web/docs__scroll.md, motion/web/docs__react-use-spring.md].
- **Urutan string offset beda**: Motion `"start end"` = *target* start bertemu *container* end; GSAP `"top bottom"` = *trigger* top bertemu *scroller* bottom; Anime `'bottom top'` = *container* bottom bertemu *target* top [motion/web/docs__scroll.md, gsap/web/Plugins__ScrollTrigger.md, animejs/web/events__onscroll__scrollobserver-thresholds.md]. Default: Motion `["start start","end end"]`; GSAP start `"top bottom"` (pin: `"top top"`), end `"bottom top"`; Anime enter `'end start'`, leave `'start end'`.
- **Pin**: GSAP `pin` + `pinSpacing` + `anticipatePin`; Motion menyarankan `position: sticky` [gsap/web/Plugins__ScrollTrigger.md, motion/web/docs__scroll.md].
- **Snap ke komposisi**: GSAP `snap: "labelsDirectional"` (arah scroll terakhir) [gsap/web/Plugins__ScrollTrigger.md].
- Smooth scroll: Motion menyetir Lenis dari `frame.setup` agar `scroll()` main-thread tidak tertinggal 1 frame [motion/web/docs__lenis.md]; GSAP `lagSmoothing(0)` bila ticker disetir loop luar [gsap/web/GSAP__gsap.ticker.md].

## 9. Label & timeline untuk scene multi-elemen
- **GSAP**: `addLabel`, posisi `"label+=x"`, `tweenTo("label")` / `tweenFromTo(a, b)` (timeline dianimasikan oleh tween — bisa diberi ease), `nextLabel/previousLabel/currentLabel`, `addPause`, nested timeline via `add(tl)` [gsap/web/GSAP__Timeline__*.md]; helper `getNestedLabelTime`, `progressiveBuild`, `seamlessLoop` [gsap/web/HelperFunctions__helpers__*.md].
- **Motion 14.7**: string label di array sequence, `"label+0.5"`, `animate()` → `Timeline` mutable (`add/move/remove/call/addPause/seek/playTo/reverse`, `autoplay: false`) [motion/repo-motion/packages/framer-motion/src/animation/timeline/index.ts]; komposisi `[...seqA, ...seqB]` [motion/web/docs__migrate-from-gsap-to-motion.md].
- **Anime**: `tl.label(name, pos)`, `tl.call`, `tl.sync(animation, pos)` (sinkron animasi/WAAPI lain), `tl.set`, `defaults` [animejs/web/timeline__timeline-methods__*.md, animejs/web/timeline__sync-timelines.md].
- **Theatre**: scene = rentang (`play({ range })`), marker berlabel (0.6.0), focus range untuk edit potongan [theatre-js/web/releases.md, theatre-js/web/manual__sequences.md].
- **react-spring**: tidak ada label; skrip async `to: async (next) => {…}` / array `to: [...]` + `useChain` [react-spring/web/advanced__async-animations.md].

## 10. Checklist anti-generik (sebelum ship)
1. Ada lead & follow yang jelas (§1), follow overlap dengan lead (§2) — bukan semua elemen mulai serentak.
2. Stagger punya origin yang bermakna (titik klik/pusat/tepi) dan **total** yang konstan untuk jumlah dinamis (§3).
3. Exit lebih cepat + ease-in + urutan terbalik dari entrance (§4).
4. Input user → spring physics (bukan time-defined) dengan velocity hand-off dalam satuan yang benar (§7).
5. Scroll-linked memakai ease linear + smoothing; offset string dicek urutannya per library (§8).
6. Reduced motion: Motion `MotionConfig reducedMotion="user"`; react-spring `useReducedMotion()` (set `skipAnimation`); GSAP `gsap.matchMedia` dengan `(prefers-reduced-motion: reduce)`; Anime `createScope({ mediaQueries })`; Theatre: lompat ke akhir sequence manual [motion/web/docs__react-accessibility.md, react-spring/repo-react-spring/packages/shared/src/hooks/useReducedMotion.ts, gsap/web/GSAP__gsap.matchMedia__.md, animejs/web/scope.md, theatre-js/NOTES.md].
