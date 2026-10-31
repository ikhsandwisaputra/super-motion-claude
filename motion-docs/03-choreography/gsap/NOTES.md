---
tool: GSAP 3 (paket `gsap` + `@gsap/react`)
version: gsap 3.15.0 (rilis 2026-04-13, npm latest per 2026-10-28; repo HEAD 13e2b79 2026-04-13) · @gsap/react 2.1.2
official: https://gsap.com/docs/v3/ · https://github.com/greensock/GSAP
local: web/*.md (202 halaman via llms.txt `.md`), web/gsap.com__llms-full.txt, repo-gsap/src/*.js, repo-gsap/types/*.d.ts
fetched: 2026-10-28
---
# GSAP — standar industri timeline + plugin (ScrollTrigger, SplitText, Flip, Draggable/Inertia, MorphSVG…), kini gratis termasuk semua bonus plugin

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk koreografi panjang ber-label (position parameter terkaya), scrollytelling (`ScrollTrigger` scrub/pin/snap/containerAnimation/batch), teks (`SplitText` rewrite 3.13), FLIP (`Flip`), lempar (`Draggable` + `InertiaPlugin`), SVG (`MorphSVG`, `DrawSVG`, `MotionPath`), ease kustom (`CustomEase/CustomWiggle/CustomBounce`).
- **Lisensi**: "Standard 'no charge' license" — gratis termasuk komersial dan semua plugin eks-Club (3.13, 2025-04-29) [web/blog__3-13.md, repo-gsap/README.md]. **Larangan**: memakai GSAP di tool *visual no-code* yang bersaing dengan visual animation builder Webflow; kode hasil AI eksplisit diizinkan [web/standard-license.md]. Bukan MIT — catat untuk produk builder.
- **Pilih Motion/react-spring** bila feel harus physics + velocity (GSAP tidak punya spring; ada `elastic`, `CustomBounce`, Inertia). Pilih CSS scroll-driven / Motion `scroll()` bila cukup scroll-linked yang bisa diakselerasi (ScrollTrigger mengukur & update tiap frame di main thread [../motion/web/docs__migrate-from-gsap-to-motion.md]).

## Mental model (yang memengaruhi FEEL & performa)
- Default tween: `duration: 0.5`, `ease: "power1.out"`, `overwrite: false`, `delay: 0` [repo-gsap/src/gsap-core.js `_defaults`, web/Eases.md]. Durasi dalam **detik**.
- **Strict timing + lagSmoothing**: GSAP merender sesuai waktu nyata (stagger tetap sinkron), kecuali jeda > 500 ms antar tick → jam internal dianggap hanya maju 33 ms (default `lagSmoothing(500, 33)`); `lagSmoothing(0)` mematikan (perlu saat ticker disetir loop lain, mis. Lenis) [web/GSAP__gsap.ticker.md, repo-gsap/src/gsap-core.js].
- **Position parameter** [web/resources__position-parameter.md]: angka = absolut; `"+=1"`/`"-=1"` relatif ke **akhir timeline** (bukan elemen sebelumnya!); `"<"` = awal animasi sebelumnya, `">"` = akhir animasi sebelumnya; `"<2"` = `"<+=2"`; `"label+=2"`; persen: `"-=25%"` (dari durasi animasi yang **disisipkan**), `"<25%"` (dari durasi animasi **sebelumnya**). Default `"+=0"` (sambung di akhir).
- `from()`/`tl.from()` `immediateRender: true` default → elemen langsung ke nilai from saat dibuat (penting untuk stacked reveal; sumber FOUC/bug kalau tidak paham) [web/gsap.com__llms-full.txt, web/resources__immediaterender.md].
- **Stagger = `utils.distribute`** di balik layar: `each` (per item) vs `amount` (total dibagi), `from: "start"|"center"|"end"|"edges"|"random"|index|[rx, ry]`, `grid: [rows, cols]|"auto"`, `axis: "x"|"y"`, `ease` mendistribusi waktu mulai (default `"none"`); `repeat/yoyo` di dalam objek stagger = per sub-tween [web/resources__getting-started__Staggers.md, web/GSAP__UtilityMethods__distribute__.md].
- **scrub**: `true` = progress terkunci ke scroll; angka = detik "catch-up" (smoothing). Durasi tween dalam timeline ter-scrub = **proporsi jarak scroll** [web/Plugins__ScrollTrigger.md FAQ].
- **easeReverse** (3.15.0): ease berbeda saat playhead mundur, dihitung ulang dari titik balik (aman diinterupsi); `easeReverse: true` = ease yang sama "diadaptasi" untuk arah balik; `yoyoEase` deprecated & dipetakan ke `easeReverse` [web/blog__3-15.md, web/GSAP__Tween.md, repo-gsap/src/gsap-core.js:2125].

## Setup minimal (API terverifikasi)
```js
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
gsap.registerPlugin(ScrollTrigger, SplitText)       // wajib sekali per plugin
const ctx = gsap.context(() => { /* tween & ScrollTrigger di sini */ }, rootEl)
ctx.revert()                                       // cleanup semua (kill + revert inline style)
```
React: `npm i gsap @gsap/react` → `gsap.registerPlugin(useGSAP)`; `useGSAP(() => {...}, { scope: container, dependencies: [x], revertOnUpdate: true })`; handler event dibungkus `contextSafe` [web/resources__React.md]. Next app router butuh `"use client"`. Jangan pakai sintaks lama `gsap.to(el, 1, {...})` / `Power2.easeOut` [web/gsap.com__llms-full.txt].

## Knob yang menentukan rasa gerak
| Knob | Efek | Default / nilai |
|---|---|---|
| `ease` string | `"none"`, `"power1..4.in/out/inOut"`, `"back.out(1.7)"`, `"elastic.out(1, 0.3)"`, `"expo"`, `"circ"`, `"sine"`, `"steps(n)"` | `"power1.out"` [web/Eases.md] |
| `easeReverse` | ease arah balik (toggle UI) | 3.15.0 |
| `CustomEase.create(id, "M0,0 C…1,1")` | kurva SVG bebas (bisa > 1 untuk overshoot) | [web/Eases__CustomEase.md] |
| `CustomWiggle.create(id, { wiggles, type: "easeOut"\|"easeInOut"\|"anticipate"\|"uniform"\|"random", amplitudeEase, timingEase })` | goyang; kekuatan = besar nilai tween | type default easeOut [web/Eases__CustomWiggle.md] |
| `CustomBounce.create(id, { strength: 0–1, squash, squashID })` | pantul + ease squash/stretch sinkron | [web/Eases__CustomBounce.md] |
| `stagger: { each \| amount, from, grid, axis, ease }` | distribusi | ease `"none"` |
| `scrollTrigger: { start, end, scrub, pin, pinSpacing, snap, toggleActions, anticipatePin, fastScrollEnd, preventOverlaps, containerAnimation }` | lihat bawah | start `"top bottom"` (`"top top"` bila pin), end `"bottom top"`, toggleActions `"play none none none"` [web/Plugins__ScrollTrigger.md] |
| `snap: { snapTo, duration: {min, max}, delay, ease, directional, inertia }` | rasa "magnet" setelah scroll | snap ease default `"power3"`, delay = ½ scrub (atau 0.1), directional true sejak 3.8 |
| `fastScrollEnd` | paksa selesai bila keluar > 2500 px/s | [web/Plugins__ScrollTrigger.md] |
| `gsap.quickTo(target, prop, { duration, ease })` | retarget murah tiap pointermove | [web/GSAP__gsap.quickTo__.md] |
| `utils.mapRange/interpolate/clamp/snap/wrap/wrapYoyo/normalize/distribute/random/shuffle/pipe` | glue matematika choreography | [web/GSAP__UtilityMethods*.md] |
| Draggable `inertia: true`, `throwResistance` (1000), `minDuration` (0.2 s), `maxDuration` (10 s), `overshootTolerance` (1), `edgeResistance`, `dragResistance` | rasa lempar | [web/Plugins__Draggable.md] |
| InertiaPlugin `{ velocity: "auto"\|n, min, max, end: n\|[...]\|fn, resistance }`, `InertiaPlugin.track()` | luncur & snap ke "notch" | durasi otomatis dari velocity [web/Plugins__InertiaPlugin.md] |

## Integrasi
- **Lenis / loop eksternal**: kendalikan dari `gsap.ticker.add(fn)` dan `gsap.ticker.lagSmoothing(0)` supaya waktu tidak "diloncat" [web/GSAP__gsap.ticker.md]; wiring `lenis.raf()` lihat kategori smooth scroll [UNVERIFIED di folder ini].
- **Theatre**: `createRafDriver` + `gsap.ticker.add(() => driver.tick(performance.now()))` → satu loop (lihat ../theatre-js/NOTES.md).
- **Motion/WAAPI**: `gsap.parseEase("power2.out")` bisa dipakai sebagai `ease` Motion yang tetap di-akselerasi [../motion/web/magazine__how-to-use-your-favourite-gsap-easings-with-waapi.md].
- **Responsif + reduced motion**: `gsap.matchMedia().add({ isDesktop: "(min-width: 800px)", reduceMotion: "(prefers-reduced-motion: reduce)" }, (ctx) => { const { reduceMotion } = ctx.conditions; gsap.to(".x", { x: 300, duration: reduceMotion ? 0 : 2 }) })` — auto-revert saat query tak cocok [web/GSAP__gsap.matchMedia__.md].

## Resep non-generik
1. **Scene ber-label dengan lead/follow & toggle asimetris (3.15)** —
   ```js
   const tl = gsap.timeline({ paused: true, defaults: { duration: 0.6, ease: "expo.out", easeReverse: "power2.in" } })
   tl.addLabel("open")
     .from(".panel", { yPercent: 100 }, "open")
     .from(".panel h2", { y: 30, autoAlpha: 0 }, "<0.15")
     .from(".panel li", { y: 20, autoAlpha: 0, stagger: { each: 0.05, ease: "power2.in" } }, "<0.1")
   btn.onclick = () => open ? tl.timeScale(1).play() : tl.timeScale(1.5).reverse()
   ```
   *Mahal karena:* follow mulai 150 ms setelah lead, tutup 1.5× lebih cepat dengan ease balik sendiri [web/blog__3-15.md].
2. **Scroll-scrub sinematik + snap ke label** — `gsap.timeline({ scrollTrigger: { trigger: ".chapter", start: "top top", end: "+=300%", pin: true, scrub: 1, snap: { snapTo: "labelsDirectional", duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" } } })` [web/Plugins__ScrollTrigger.md]. *Mahal karena:* playhead mengejar 1 s (inersia), berhenti hanya di frame komposisi (label).
3. **Horizontal track dengan trigger di dalamnya** — tween kontainer `x` dengan `ease: "none"` lalu ScrollTrigger anak `containerAnimation: tween` (tanpa pin/snap untuk anak) [web/Plugins__ScrollTrigger.md]. *Mahal karena:* elemen bereaksi saat masuk viewport secara horizontal.
4. **Cursor follower** — `const xTo = gsap.quickTo(".dot", "x", { duration: 0.4, ease: "power3" })` + `pipe(clamp, snap, quickTo)` [web/GSAP__gsap.quickTo__.md]. *Mahal karena:* retarget tanpa alokasi tween baru tiap event.
5. **Reveal baris yang tahan reflow** — `SplitText.create(".split", { type: "lines, words", mask: "lines", autoSplit: true, onSplit: (self) => gsap.from(self.words, { y: 100, autoAlpha: 0, stagger: 0.05 }) })` (return animasi → otomatis dibersihkan & disinkron ulang saat re-split; `aria: "auto"` default) [web/Plugins__SplitText.md]. *Mahal karena:* clip-mask per baris + tidak rusak saat font load/resize.
6. **Batch reveal list** — `ScrollTrigger.batch(".card", { interval: 0.1, batchMax: 6, onEnter: (els) => gsap.from(els, { y: 40, autoAlpha: 0, stagger: 0.06 }) })` [web/Plugins__ScrollTrigger__static.batch__.md]. *Mahal karena:* elemen yang masuk bersamaan di-stagger sebagai satu grup, bukan muncul serentak.
7. **Squash & stretch pantulan** — `CustomBounce.create("myBounce", { strength: 0.7, squash: 3 })` lalu tween `y` dengan `"myBounce"` + `scaleY/scaleX` dengan `"myBounce-squash"` (`transformOrigin: "bottom"`) [web/Eases__CustomBounce.md]. *Mahal karena:* deformasi sinkron tepat di titik kontak.

## Performa, aksesibilitas, mobile
- Animasikan transform (`x, y, rotation, scale, xPercent`) & `opacity/autoAlpha` [web/gsap.com__llms-full.txt]. ScrollTrigger: buat trigger urut atas→bawah (atau `refreshPriority`), `ScrollTrigger.refresh()` setelah layout berubah; `invalidateOnRefresh` untuk nilai fungsi [web/Plugins__ScrollTrigger.md].
- Pin: `pinType` fixed hanya bila scroller = body; `will-change: transform` pada ancestor merusak `position: fixed`; `anticipatePin: 1` untuk flash saat scroll cepat [web/Plugins__ScrollTrigger.md].
- Reduced motion via `gsap.matchMedia` (lihat Integrasi) dan [web/resources__a11y.md]. SplitText menambah `aria-label`/`aria-hidden` otomatis.
- FOUC: sembunyikan elemen awal dengan CSS `visibility: hidden` + `autoAlpha` [web/resources__fouc.md]. Kesalahan umum: [web/resources__mistakes.md], [web/resources__st-mistakes.md].
- `gsap.ticker.fps(n)` hanya bisa menurunkan fps; `deltaRatio(60)` untuk logika frame-independent [web/GSAP__gsap.ticker.md].

## Sumber lokal
- web/gsap.com__llms.txt (index 412 halaman `.md`) · web/gsap.com__llms-full.txt (panduan agen: lisensi, pola benar/salah)
- web/resources__position-parameter.md, web/resources__getting-started__{timelines,Staggers,Easing,control}.md, web/resources__keyframes.md, web/resources__immediaterender.md
- web/GSAP__*.md — core (to/from/fromTo/set/quickTo/quickSetter/matchMedia/context/ticker/utils/Timeline/Tween)
- web/Eases*.md — semua ease + CustomEase/Wiggle/Bounce/RoughEase/SlowMo/ExpoScaleEase
- web/Plugins__ScrollTrigger*.md (36), Plugins__ScrollSmoother*.md, Plugins__Flip*.md, Plugins__Draggable*.md, Plugins__InertiaPlugin*.md, Plugins__Observer*.md, Plugins__SplitText*.md, Plugins__MorphSVGPlugin.md, Plugins__DrawSVGPlugin*.md, Plugins__MotionPathPlugin*.md
- web/HelperFunctions__helpers__*.md — helper resmi (seamlessLoop, blendEases, easeToLinear, getDirectionalSnapFunc, imageSequenceScrub, splitTextAnimator, trackDirection…)
- web/blog__3-13.md, blog__3-14.md, blog__3-15.md — perubahan 2025–2026 (gratis + SplitText rewrite; MorphSVG `smooth`/`curveMode`; easeReverse)
- web/standard-license.md — teks lisensi
- repo-gsap/src/*.js (sumber semua plugin), repo-gsap/types/*.d.ts (opsi lengkap ber-JSDoc)
