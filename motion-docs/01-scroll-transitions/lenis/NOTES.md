---
tool: Lenis (lenis, lenis/react, lenis/vue, lenis/snap)
version: 1.3.27 (repo HEAD e01eefb, 2026-10-15; dicek 2026-10-28). v2 baru ROADMAP, belum rilis.
official: https://github.com/darkroomengineering/lenis · https://lenis.darkroom.engineering/
local: repo-lenis/ (README.md, packages/core/src/*.ts, packages/*/README.md, V2-ROADMAP.md, playground/)
fetched: 2026-10-28
---
# Lenis — lapisan interpolasi di atas native scroll (smooth wheel + jam tunggal untuk sinkron DOM/WebGL)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** kalau butuh wheel yang "berat & mahal" tapi tetap native: `position: sticky`, IntersectionObserver,
  anchor, find-in-page, CSS scroll-driven animations, Motion `scroll()` semua tetap jalan karena Lenis memanggil
  `scrollTo({behavior:'instant'})` tiap frame — bukan translate wrapper (`web/tutorial-lunardi-smooth-scroll-2025.md`).
- **Pakai** sebagai *satu sumber waktu* untuk scroll-driven WebGL (velocity/progress/direction tersedia tiap frame).
- **Locomotive v5** = Lenis 1.3.17 + atribut `data-scroll-*` (parallax/inview/progress). Pilih Locomotive kalau mau
  no-code attributes; pilih Lenis polos kalau animasi dipegang GSAP/Motion.
- **GSAP ScrollSmoother** = transform-based (fixed wrapper) → sticky/IO native patah; Lenis lebih "platform-friendly".
- **Jangan** untuk situs dokumen/konten panjang yang butuh rasa native, halaman berat iframe (wheel tidak diteruskan
  dari iframe), atau yang mengandalkan CSS `scroll-snap` (tidak didukung → pakai `lenis/snap`).
- Touch secara default **tetap native** (`syncTouch:false`) — itu benar; jangan nyalakan syncTouch kecuali perlu
  sinkron WebGL di mobile / `infinite`.
- ⚠️ `web/lenis.darkroom.engineering__llms.txt` **usang** (menyebut `smoothTouch`, `touchMultiplier: 2`, snap
  `velocityThreshold`) — percayai `packages/core/src/types.ts`, bukan llms.txt.

## Mental model (cara kerja yang memengaruhi FEEL & performa)
1. `VirtualScroll` dengar `wheel/touchstart/touchmove/touchend` (`passive:false`) di `eventsTarget` (default = wrapper).
   Normalisasi `deltaMode`: line → ×(100/6 ≈ 16.67px), page → ×tinggi viewport; lalu ×`wheelMultiplier`.
2. `preventDefault()`, lalu `targetScroll += delta` → `animate.fromTo(animatedScroll, target, …)`.
3. Tiap `lenis.raf(timeMs)`: `Animate.advance(dt)` → `wrapper.scrollTo({top, behavior:'instant'})` (instant mem-bypass
   CSS `scroll-behavior`) → emit `'scroll'`.
4. **Mode lerp (default, `lerp: 0.1`)** = damping frame-rate-independent:
   `value = lerp(value, target, 1 - Math.exp(-lerp*60*dt))` (`maths.ts damp`). Di 60fps lerp 0.1 ≈ menutup 9.5% sisa
   jarak/frame; selesai saat `Math.round(value) === Math.round(target)`. Memoryless: wheel beruntun = "kejar target".
5. **Mode waktu** aktif kalau `duration` ATAU `easing` diberikan (yang satu lagi diisi otomatis: easing default
   `t => Math.min(1, 1.001 - 2**(-10*t))`, duration default 1 s). Di `Animate.advance`, duration+easing **menang atas
   lerp**. Tiap event wheel me-restart kurva dari posisi sekarang (`currentTime = 0`) → wheel cepat terus berada di
   bagian awal expo-out yang curam = terasa "snappy/berundak". README bilang default duration 1.2 — konstruktor TIDAK
   men-set duration, jadi default nyata = mode lerp.
6. **Touch**: native kecuali `syncTouch`. Dengan syncTouch: touchmove lerp 1 (1:1), di `touchend` inersia
   `delta = sign * |velocity|^touchInertiaExponent(1.7)` dengan `syncTouchLerp 0.075`. Tap saat inersia = stop.
7. **`velocity` = px per update (per frame), bukan px/s** → di 120 Hz nilainya ±setengah 60 Hz untuk gerak fisik yang
   sama. Normalisasi dengan dt sebelum dipakai untuk skew/blur. Native scroll: velocity di-reset 0 setelah 400 ms idle.
8. **Dimensions**: ResizeObserver (content + wrapper) di-*debounce* **250 ms** → `limit` bisa basi 250 ms setelah DOM
   berubah (page transition!). Panggil `lenis.resize()` setelah swap konten. `naiveDimensions:true` baca
   `scrollHeight` live setiap akses (lebih akurat, lebih mahal).
9. State class di root (`<html>` bila wrapper=window): `lenis`, `lenis-smooth`, `lenis-scrolling`, `lenis-stopped`,
   `lenis-locked`, `lenis-autoToggle`. `isScrolling`: `'smooth' | 'native' | false`.
10. Detail kecil yang sudah ditangani: `ctrl+wheel` diabaikan (pinch-zoom tetap), middle-click (button 1) → reset
    (autoscroll native), iOS: sentuhan ≤40 px dari handle seleksi teks tidak dianggap scroll, `scrollend` native
    ditahan saat smooth lalu Lenis dispatch `CustomEvent('scrollend', {detail:{lenisScrollEnd:true}})` saat selesai.

## Setup minimal (terverifikasi 1.3.27)
```js
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'            // WAJIB (lihat isi di bawah)
const lenis = new Lenis({ autoRaf: true })  // atau loop sendiri: lenis.raf(timeMs) tiap frame
const off = lenis.on('scroll', (l) => { /* l.scroll, l.velocity, l.direction, l.progress */ })
// cleanup
off(); lenis.destroy()
```
Isi `packages/core/lenis.css`: `html.lenis, html.lenis body {height:auto}` · `.lenis:not(.lenis-autoToggle).lenis-stopped
{overflow:clip}` · semua `[data-lenis-prevent*]` → `overscroll-behavior: contain` · `.lenis.lenis-smooth iframe
{pointer-events:none}` · `.lenis.lenis-autoToggle {transition-property:overflow; transition-duration:1ms;
transition-behavior:allow-discrete}` (trik: Lenis dengar `transitionend` overflow → auto stop/start saat lib modal
men-set `overflow:hidden` di html; butuh Safari>17.3, Chrome>116, Firefox>128).
No-code satu baris (README): `new Lenis({ autoRaf:true, autoToggle:true, anchors:true, allowNestedScroll:true,
naiveDimensions:true, stopInertiaOnNavigate:true })` — ini juga preview default v2.

## Knob yang menentukan rasa gerak
| Option (default) | Efek ke feel | Rentang bagus |
|---|---|---|
| `lerp` (0.1) | berat/inersia. kecil = melayang lama | 0.06–0.08 editorial "mahal"; 0.1–0.15 responsif (demo Codrops IntroGrid pakai 0.15) |
| `duration` / `easing` (–) | memaksa mode waktu, kurva di-restart tiap tick wheel | 1.0–1.4 s + expo-out untuk nav "lompat"; hindari untuk wheel kontinu |
| `wheelMultiplier` (1) | jarak per notch | 0.7–0.9 = lebih berat |
| `touchMultiplier` (1) | jarak per swipe (hanya syncTouch) | 1 |
| `syncTouch` (false) / `syncTouchLerp` (0.075) / `touchInertiaExponent` (1.7) | fling sintetis di touch | naikkan exponent = lemparan lebih jauh |
| `smoothWheel` (true) | matikan = wheel native, Lenis cuma jam/event | – |
| `orientation` ('vertical') / `gestureOrientation` | NB: kode men-default `gestureOrientation='both'` bila orientation horizontal (README bilang 'vertical') | – |
| `infinite` (false) | scroll = `modulo(animatedScroll, limit)`; scrollTo programatik ambil jalur terpendek (±limit/2) | butuh `syncTouch:true` di touch (README); pakai wrapper bersarang (resep 5) |
| `overscroll` (true) | false = nested Lenis menahan scroll chaining | – |
| `allowNestedScroll` (false) | auto-izinkan scroller bersarang; cek `getComputedStyle` (cache 2 s per node) → ada biaya | pakai `data-lenis-prevent` kalau perf penting |
| `prevent(node)` / `virtualScroll(data)` | filter per node / ubah delta sebelum dikonsumsi (`return false` = biarkan native) | – |
| `anchors` (false) | `true` atau `ScrollToOptions` (mis. `{offset:-80}`) | – |
| `stopInertiaOnNavigate` (false) | reset inersia saat klik link internal beda pathname | **true** di situs dengan page transition |
| `autoToggle` / `autoResize` / `naiveDimensions` | lihat mental model | – |
| `respectReducedMotion` (true) | reduce → lerp 1 untuk input user, scrollTo programatik = instant (live, tanpa reload) | biarkan true |

Atribut HTML: `data-lenis-prevent`, `-wheel`, `-touch`, `-vertical`, `-horizontal`.
`scrollTo(target, {offset, immediate, lock, duration, easing, lerp, onStart, onComplete, force, programmatic, userData})`
— target: px | selector | Element | keyword `top/left/start/#`→0, `bottom/right/end`→limit; `'#id'` via
`getElementById` (aman untuk id karakter aneh); menghormati `scroll-margin-top` target & `scroll-padding-top` wrapper.
`force:true` = jalan walau `stop()`; `lock:true` = user tak bisa scroll sampai tiba.

## Integrasi (wiring persis)
- **GSAP ScrollTrigger** (README): `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0)`. Untuk window **tidak perlu** `scrollerProxy` (scroll native). Untuk wrapper bersarang
  (infinite/iOS) pakai `scrollerProxy` (resep 5).
- **Motion (motion.dev)** — docs resmi Motion (`../../03-choreography/motion/web/docs__lenis.md`):
  `new Lenis({autoRaf:false}); frame.setup(({timestamp}) => lenis.raf(timestamp), true)`; cleanup `cancelFrame(fn);
  lenis.destroy()`. **`frame.setup` > `frame.update`**: setup jalan sebelum `read`, jadi `scroll()/useScroll` membaca
  posisi frame ini; README Lenis (`frame.update`) = scroll-linked main-thread tertinggal 1 frame.
- **React**: `<ReactLenis root options={{lerp:0.08}} />` + `useLenis(cb, deps, priority)`. Prop `autoRaf` komponen
  default **true**; untuk loop eksternal: `options={{autoRaf:false}}` + `ref` → `ref.current?.lenis?.raf(t)`.
  `root="asChild"` = render wrapper/content div tapi tetap global. Options dibandingkan via `JSON.stringify` → mengganti
  fungsi (`easing`, `prevent`) TIDAK membuat ulang instance.
- **R3F**: `addEffect((t) => lenis.raf(t))` (callback dapat timestamp rAF ms; terverifikasi di
  `../../11-r3f-ecosystem/r3f/repo-react-three-fiber/packages/fiber/src/core/loop.ts`) + `autoRaf:false`.
  Plugin rujukan README: r3f-scroll-rig (14islands).
- **lenis/snap**: `new Snap(lenis, {type:'proximity'|'mandatory'|'lock', distanceThreshold:'50%', debounce:500, lerp,
  easing, duration, onSnapStart, onSnapComplete})`; `add(px)` → fungsi remover; `addElement(el,{align:'start'|'center'|
  'end'|[..]})`, `addElements`, `next/previous/goTo(i)`, `start/stop/resize/destroy`. Snap dipicu dari
  `'virtual-scroll'` ter-debounce → snap terjadi `debounce` ms setelah input berhenti. Slideshow: `{type:'lock',
  distanceThreshold:'100%', debounce:0}`.
- **Barba / swup / View Transitions**: stop di awal transisi, `scrollTo(0,{immediate:true, force:true})` saat DOM swap,
  `resize()` + `start()` di akhir — detail di `../barba/NOTES.md`, `../swup/NOTES.md`, `../view-transitions/NOTES.md`.

## Resep non-generik
1. **Skew/stretch dari velocity yang frame-rate-safe**
```js
const lenis = new Lenis({ autoRaf: false }); let prev = 0, skew = 0
function tick(t) {
  const dt = prev ? Math.min((t - prev) / 1000, 0.05) : 1 / 60; prev = t
  lenis.raf(t)
  const vps = lenis.velocity / dt                         // px/frame → px/s
  const target = Math.max(-7, Math.min(7, vps * 0.0035))  // deg, clamp
  skew += (target - skew) * (1 - Math.exp(-10 * dt))      // damped follow, lepas lebih lambat dari scroll
  hero.style.transform = `skewY(${skew}deg)`
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)
```
Kenapa mahal: deformasi mengikuti *kecepatan* (bukan posisi) lalu "mengendap" dengan damping sendiri — terasa seperti
material yang punya massa, dan identik di 60/120 Hz.

2. **Slow-motion zone (ritme lewat konsumsi delta)**
```js
let slow = 1 // di-tween 1 → 0.35 saat section pin masuk, balik 1 saat keluar
const lenis = new Lenis({ virtualScroll: (d) => { d.deltaY *= slow; d.deltaX *= slow } }) // return undefined = lanjut
```
Kenapa mahal: halaman "menahan napas" di momen penting tanpa scrolljacking total; input tetap 1:1 arah.

3. **Spring scroll-to yang menyerahkan kontrol balik ke user** (docs Motion)
```js
import { animate } from 'motion'
function springTo(el) {
  const top = lenis.scroll + el.getBoundingClientRect().top
  if (lenis.prefersReducedMotion) return lenis.scrollTo(top)
  const a = animate(lenis.scroll, top, { type:'spring', visualDuration:0.8, bounce:0.2,
    onUpdate: (v) => lenis.scrollTo(v, { immediate: true }), onComplete: () => stop() })
  const stop = lenis.on('virtual-scroll', () => { a.stop(); stop() })
}
```
Kenapa mahal: overshoot kecil di tujuan (bounce) + user bisa merebut kontrol kapan saja.

4. **Nav jump yang dikunci & berirama**
```js
lenis.scrollTo('#work', { offset: -80, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4), lock: true,
  onComplete: () => document.querySelector('#work h2')?.focus({ preventScroll: true }) })
```
Kenapa mahal: durasi tetap + quart-out memberi "landing" yang konsisten di jarak berapa pun; fokus dipindah untuk a11y.

5. **Infinite loop tanpa seam (Codrops 2026, `web/codrops-2026-05-infinite-scroll-gsap-lenis.md`)**: duplikat section
   pertama di akhir (`aria-hidden`), `new Lenis({infinite:true, wrapper, content})` dengan wrapper `height:100svh;
   overflow:hidden` (infinite di html/body flicker di iOS — juga diakui V2-ROADMAP), `Snap {type:'mandatory',
   duration:0.9, easing:t=>1-(1-t)**4}`, dan `ScrollTrigger.scrollerProxy(wrapper, {scrollTop(v){ if(arguments.length)
   lenis.scrollTo(v,{immediate:true}); else return lenis.scroll }, getBoundingClientRect(){…}, pinType:'transform'})`.
   Kenapa mahal: halaman tak pernah "habis", snap memberi ketukan per section.

## Performa, aksesibilitas, mobile & browser
- Safari: smooth dibatasi **60 fps** (30 fps Low Power Mode) — keterbatasan compositor WebKit. Pre-M1 macOS Safari:
  `position:fixed` bisa lag.
- iframe tak meneruskan wheel → CSS bawaan mematikan `pointer-events` iframe saat `lenis-smooth`.
- `syncTouch` tidak stabil di iOS < 16. Rekomendasi praktis: biarkan touch native.
- `allowNestedScroll` memeriksa DOM tiap event → pilih `data-lenis-prevent` + `overscroll-behavior: contain`.
- Reduced motion: default dihormati (lerp 1, scrollTo instant) — tetap emit scroll sehingga sinkron WebGL tidak putus;
  baca `lenis.prefersReducedMotion` untuk mematikan efek velocity milikmu sendiri.
- Modal: `lenis.stop()` (class `lenis-stopped` → `overflow:clip` di html) + `data-lenis-prevent` di panel scroll modal.
- v2 (roadmap, belum rilis): default flip (autoRaf/autoToggle/anchors/allowNestedScroll/stopInertiaOnNavigate/
  naiveDimensions = true), opsi bersarang `wheel:{smooth,lerp,multiplier}` / `touch:{smooth,lerp,multiplier,inertia}`,
  auto-inject CSS, multi-axis. Jangan tulis kode v2 sebelum rilis.

## Sumber lokal
- `repo-lenis/README.md` — tabel options/properties/methods/events resmi 1.3.27.
- `repo-lenis/packages/core/src/lenis.ts` — kebenaran perilaku (scrollTo, onVirtualScroll, class, reduced motion).
- `repo-lenis/packages/core/src/animate.ts` + `maths.ts` — damp `1-exp(-λdt)`, mode waktu vs lerp.
- `repo-lenis/packages/core/src/types.ts` — semua option + default (JSDoc).
- `repo-lenis/packages/core/src/virtual-scroll.ts` — normalisasi deltaMode & touch delta.
- `repo-lenis/packages/core/src/dimensions.ts` — debounce 250 ms.
- `repo-lenis/packages/core/lenis.css` — CSS wajib.
- `repo-lenis/packages/react/README.md`, `packages/react/src/provider.tsx` — ReactLenis/useLenis, wiring GSAP/Motion.
- `repo-lenis/packages/snap/README.md`, `packages/snap/src/snap.ts` — Snap.
- `repo-lenis/V2-ROADMAP.md` — rencana breaking change.
- `repo-lenis/playground/{infinite,horizontal,snap,touch-debug}/` — contoh konfigurasi.
- `web/tutorial-lunardi-smooth-scroll-2025.md` — penjelasan arsitektur (scrollTo per frame vs transform).
- `web/codrops-2026-05-infinite-scroll-gsap-lenis.md` — infinite + snap + scrollerProxy + fix iOS.
- `../../03-choreography/motion/web/docs__lenis.md` — wiring Motion resmi (frame.setup, spring scroll).
