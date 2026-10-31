# 12 — Resep "Kombo Maut" (blueprint siap pakai)

Empat resep dari `ultimate_creative_web_development_arsenal.md`, diturunkan jadi arsitektur yang bisa langsung
dibangun. Semua angka & API di bawah berasal dari NOTES kategori (sudah diverifikasi ke source per 2026-10-28) —
buka NOTES yang dirujuk sebelum ngoding.

## Aturan arsitektur yang berlaku untuk semua resep

1. **Satu pemilik frame loop.** Pilih satu ticker (GSAP `ticker`, Motion `frame`, R3F `useFrame`/`addEffect`) lalu
   setir yang lain dari situ: `lenis.raf()`, `curtains.render()`, `Engine.update()` Matter. Dua rAF yang tidak
   sinkron = jitter 1 frame yang terasa "murah".
   - GSAP: `gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); lenis.on('scroll', ScrollTrigger.update)`
   - Motion: `new Lenis({ autoRaf: false }); frame.setup(({ timestamp }) => lenis.raf(timestamp), true)` (setup, bukan update)
   - R3F: `addEffect(t => lenis.raf(t))` — mati kalau `frameloop="demand"`.
2. **Semua smoothing berbasis dt**: `1 - Math.exp(-rate * dt)`; konversi lerp per-frame `k` → `rate = -60·ln(1-k)`.
3. **Motion language dulu, efek belakangan**: 2–3 ease signature, skala durasi, aturan stagger, 1 signature effect.
4. **Reduced motion & 60 fps Android mid-range** adalah syarat lulus, bukan bonus.

---

## 1. High-Fashion / Editorial Agency — Lenis + Curtains.js + SplitType + Barba.js

**Rasa yang dituju**: tipografi raksasa, transisi tanpa reload, foto bergelombang halus seperti sutra saat di-scroll.

| Lapisan | Pilihan | Catatan versi (2026-10) |
|---|---|---|
| Smooth scroll | Lenis 1.3.27 | `lerp` frame-rate independent; `velocity` = px/frame |
| WebGL foto | Curtains.js 8.1.6 (maintenance) / gpu-curtains 0.17.1 (WebGPU) | plane = elemen DOM |
| Split teks | SplitType 0.3.4 (dorman sejak 2023) → **produksi: GSAP SplitText 3.15** (gratis) | `mask: 'lines'`, `autoSplit` |
| Page transition | Barba core 2.10.3 (maintenance) | alternatif modern: Swup 4.10 / View Transitions |

**Wiring inti**
- Loop: GSAP ticker memiliki semuanya → `lenis.raf`, `curtains.render` (`new Curtains({ autoRender: false })`).
- Scroll → WebGL tanpa reflow: `watchScroll: false` + `lenis.on('scroll', l => curtains.updateScrollValues(0, l.scroll))`.
- Distorsi velocity: delta scroll dibalik, clamp ±60, naik cepat (lerp 0.5 bila |Δ| > nilai sekarang), turun pelan
  (0.05–0.1/frame, dikonversi ke dt); vertex `y += sin((x+1)/2·π) · sin(fx/90)`.
- Barba: `preventRunning: true` (klik saat transisi = reload penuh kalau tidak). `leave` jalan paralel dengan fetch;
  container baru ditempel di BAWAH yang lama, yang lama dibuang setelah `afterEnter` → di hook `after`:
  `ScrollTrigger.refresh()`, `lenis.resize()`, buat ulang plane curtains untuk gambar halaman baru, re-split teks.
- Reveal judul: `SplitText.create('.display', { type: 'lines', mask: 'lines', autoSplit: true, onSplit: self => gsap.from(self.lines, { yPercent: 100, stagger: 0.1, duration: 1.1, ease: 'expo.out' }) })`.

**Motion language**: outExpo untuk masuk, inOutQuart/Expo untuk curtain transisi (600–900 ms), stagger line 0.08–0.12 s,
signature = distorsi gambar ∝ scroll velocity.
**Reduced motion**: Lenis off, distorsi 0, SplitText reveal → fade 200 ms, transisi Barba → crossfade.
**Baca**: `01-scroll-transitions/{lenis,barba}/NOTES.md`, `02-shaders-webgl/curtainsjs/NOTES.md`,
`06-kinetic-typography/splittype/NOTES.md`, `03-choreography/gsap/NOTES.md`.

---

## 2. Playful / Creative Studio — Motion + Matter.js + Rive + Howler.js

**Rasa yang dituju**: warna-warni, karakter yang matanya melirik kursor, tombol yang jatuh & bisa ditabrak, suara pop renyah.

| Lapisan | Pilihan | Catatan |
|---|---|---|
| UI motion | Motion 14.7 (React `motion/react` atau vanilla) | spring perseptual `visualDuration` + `bounce` |
| Fisika | Matter.js 0.20.0 | Runner fixed-step tanpa interpolasi |
| Karakter | Rive 2.48 (`@rive-app/*`) | kendali via **Data Binding / View Models** (inputs SM deprecated) |
| Suara | Howler 2.2.4 (stabil, tidak ada rilis baru) | sound sprite |

**Wiring inti**
- Matter: `Runner.create({ delta: 1000/120 })`; velocity dalam px per 16.67 ms (`Body.setVelocity(b, v/60)`);
  `gravity.scale 0.001 ≈ 1000 px/s²`; `MouseConstraint` → `angularStiffness: 0` supaya benda yang dipegang berayun;
  scroll halaman: `mouse.element.removeEventListener('wheel', mouse.mousewheel)`. Sinkron ke DOM: tiap frame tulis
  `transform: translate(x,y) rotate(a)` dari body (badge/pill/huruf di footer).
- Benturan → suara: `collisionStart` → volume ∝ kecepatan relatif (clamp), `rate` acak ±3–8 %, throttle per pasangan.
- Rive: selalu pass `stateMachine`; set data View Model sebelum frame pertama (`onRiveReady` di React); mata ikut
  kursor dibangun di editor (Joystick + Distance Constraint mode Closer), JS cukup kirim posisi pointer ke View Model.
- Motion untuk tombol/kartu: spring physics (`stiffness/damping/mass`) bila mewarisi velocity dari drag — spring
  berbasis waktu (`duration/bounce/visualDuration`) membuang velocity warisan.
- Audio unlock pada `pointerup`/`click`/`keydown` (bukan `pointerdown` sentuh, bukan scroll); tombol mute terlihat.

**Motion language**: outBack/spring bounce 0.3–0.5 (playful), durasi pendek, squash & stretch kecil saat mendarat.
**Reduced motion**: fisika diganti posisi statis tersusun, Rive ke state diam, suara tetap opt-in.
**Baca**: `03-choreography/motion/NOTES.md`, `04-physics/matter-js/NOTES.md`, `05-interactive-vector-3d/rive/NOTES.md`,
`09-sensory-hardware/howler/NOTES.md`, `04-physics/_physics-math/NOTES.md`.

---

## 3. Futuristic SaaS / Tech Product — Next.js + Spline / Unicorn Studio + CSS `@property` + `cmdk`

**Rasa yang dituju**: dark mode elegan, glowing border, objek kaca 3D membiaskan cahaya, micro-interaction sekelas Apple/Linear.

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Framework | Next.js App Router | `<ViewTransition>` (React 19.3) + `<Link transitionTypes>` (Next 16.2+) |
| 3D / shader bg | Spline runtime 2.0.116 / react-spline 4.1.0, atau Unicorn Studio SDK 2.4.3 | Unicorn tidak punya opsi reduced-motion → gate sendiri |
| Glow border | CSS `@property` (Baseline 2024-07) | `<angle>` teregistrasi pada conic-gradient |
| Command palette | cmdk 1.1.1 | tinggi list via `--cmdk-list-height` |

**Wiring inti**
- Scene 3D di layout (persisten) sebagai Client Component; `next/dynamic(..., { ssr: false })` untuk yang berat.
  Spline: `renderMode: 'manual'` + `requestRender()` hemat baterai; scroll-scrub `obj.transition({ to, autoPlay: false }).seek(ms)`;
  semua instance satu halaman wajib backend sama (WebGPU atau WebGL); `dispose()` saat unmount.
- Glow border: `@property --a { syntax: '<angle>'; inherits: false; initial-value: 0deg }` + `conic-gradient(from var(--a), …)`
  dianimasikan; mask/padding-box trick untuk border saja.
- Navigasi: shared-element morph kartu → detail dengan VT `name` sama; arah via `transitionTypes`.
- Kaca: `backdrop-filter` hanya "melihat" sampai backdrop root terdekat (ancestor dengan filter/opacity<1/mask/
  clip-path/backdrop-filter/blend/will-change) → kaca bersarang tidak melihat konten di luar parent-nya;
  `backdrop-filter: url(#svg)` (liquid glass) hanya Chromium.

**Motion language**: easing tenang (outQuint/inOutCubic), durasi 200–350 ms untuk UI, hover glow 600–1200 ms loop lambat.
**Reduced motion**: scene diam (poster), animasi glow berhenti di sudut tetap, VT → crossfade.
**Baca**: `12-recipes/nextjs/NOTES.md`, `05-interactive-vector-3d/spline/NOTES.md`, `02-shaders-webgl/unicorn-studio/NOTES.md`,
`08-css-svg-native/{css-property-houdini,blend-backdrop}/NOTES.md`, `10-micro-interactions/cmdk/NOTES.md`.

---

## 4. Experimental / Interactive Art — p5.js / OGL + Web Audio API + MediaPipe (webcam)

**Rasa yang dituju**: visual berubah mengikuti suara mikrofon atau gerak tangan di depan kamera.

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Visual | p5.js 2.3.4 (instance mode) atau OGL 1.0.11 | p5 2.x: `async setup()` + `await load*()`, `preload` hilang |
| Audio | Web Audio `AnalyserNode` (+ Tone.js 15 bila perlu sintesis) | smoothing bawaan per-panggilan → set 0 |
| Tracking | `@mediapipe/tasks-vision` 1.2.0 | `detectForVideo` butuh timestamp monoton |

**Wiring inti**
- p5 2.x hanya menggambar bila ≥ 1000/target − 5 ms berlalu → di layar 120 Hz tetap 60 fps kecuali `frameRate(120)`;
  `pixelDensity` default `Math.ceil(devicePixelRatio)` (layar 1.5× dirender 2×) — set manual untuk performa.
- OGL: default `dpr: 1`, `alpha: false`, `premultipliedAlpha: false`; Flowmap (size 128, falloff 0.3, dissipation 0.98)
  untuk jejak kursor/tangan; uniform langsung `flowmap.uniform`.
- Audio: `getUserMedia` → `AnalyserNode` dengan `smoothingTimeConstant = 0`, envelope sendiri
  `env += (x - env) * (1 - exp(-dt/τ))`; lebar bin = `sampleRate / fftSize`; kelompok band logaritmik.
- MediaPipe di Worker (GPU delegate, fallback CPU); `runningMode: 'VIDEO'`; pinch dari `worldLandmarks` 4↔8 (meter)
  dengan hysteresis ~3/5 cm + One Euro filter; mirror hanya tampilan, bukan input model; minta persetujuan
  (metrik pemakaian dikirim ke Google) dan tulis "diproses di perangkat".
- Izin: kamera/mic dari klik eksplisit; fallback mouse & audio file bila ditolak.

**Motion language**: biarkan sinyal (amplitudo, posisi tangan) memodulasi parameter noise/warp, bukan memindahkan
objek mentah; attack cepat / release lambat supaya terasa "bernapas".
**Reduced motion**: amplitudo modulasi kecil, tanpa flash/strobe (cek pedoman seizure di MDN mirror).
**Baca**: `07-creative-coding/{p5js,_generative-craft}/NOTES.md`, `02-shaders-webgl/ogl/NOTES.md`,
`09-sensory-hardware/{web-audio,mediapipe}/NOTES.md`.
