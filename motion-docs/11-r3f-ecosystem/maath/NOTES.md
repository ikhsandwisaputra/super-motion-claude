---
tool: maath (pmndrs) — dan penerusnya `math`
version: "maath 0.10.8 = npm latest (publish 2024-07-07) — masih jadi dependency drei 10.7.9 & @react-three/postprocessing 3.2.2. Repo github.com/pmndrs/maath sekarang 301 → pmndrs/math: branch main = paket baru `math` 0.1.0 (npm 2026-09-11, canary 2026-10-26); kode maath lama di branch `maath` (@626d198, 2024-07-07). npm maath juga punya tag canary 1.0.0-canary-39fbc9bc-20260817. Dicek 2026-10-28"
official: https://github.com/pmndrs/maath (→ https://github.com/pmndrs/math) · npm maath · npm math
local: maath/repo-maath-legacy/README.md + packages/maath/src/easing.ts (maath 0.10.8) · maath/repo-maath/{README.md,API.md,src/time/*} (math 0.1.0)
fetched: 2026-10-28
---
# maath — fungsi damping frame-rate-independent (SmoothDamp) untuk semua gerak kontinu di R3F

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai `easing.damp*`** untuk SEMUA nilai yang mengejar target yang berubah-ubah (pointer, scroll, hover, state UI → posisi/rotasi/
  warna/uniform): interruptible, refresh-rate independent, tanpa alokasi, tanpa timeline.
- **Jangan** untuk koreografi berdurasi pasti / bertahap (intro 1.2 s, stagger, sequencing) → GSAP timeline / Theatre (`03-choreography/`).
  Untuk spring bouncy dengan overshoot → paket baru `math` (`spring*.update` dampingRatio < 1) atau react-spring / Motion.
- vs `THREE.MathUtils.damp(x, y, lambda, dt)`: three versi lerp eksponensial (1-orde, tanpa velocity) — oke untuk skalar, tapi maath
  menyimpan **velocity** → start lebih halus saat target melompat, + vector/euler/quat/color/maxSpeed.
- `lerp(a, b, 0.1)` per frame (contoh di docs pitfalls R3F) **tidak** frame-rate independent → di 120 Hz dua kali lebih cepat.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- `damp` = SmoothDamp Unity / Game Programming Gems 4 §1.10: **pegas kritis teredam** (tanpa overshoot). `omega = 2 / smoothTime`,
  faktor `t = easing(omega * delta)` dengan easing default `exp(t) = 1 / (1 + t + 0.48t² + 0.235t³)` (aproksimasi e^-t).
- **`smoothTime` ≈ waktu (detik) untuk *kira-kira* mencapai target**. Bukan durasi pasti; gerak mendekati target secara asimptotik lalu
  di-snap saat `|current - target| <= eps` (default `eps = 0.001`) → fungsi **return `false`** (berhenti). Return `true` = masih bergerak.
- Velocity disimpan di objek target: `current.__damp.velocity_<prop>` → setiap objek/properti punya memori kecepatan sendiri;
  mengganti target di tengah jalan mempertahankan momentum (interruptible).
- `maxSpeed` (default ∞) membatasi perubahan maksimum (`maxSpeed * smoothTime` per langkah) → lompatan jauh jadi "berjalan" dengan
  kecepatan konstan lalu melambat; mencegah teleport saat scroll loncat jauh.
- Proteksi overshoot bawaan (output di-clamp ke target bila terlewati). Delta besar (tab kembali aktif) → `t ≈ 0` → langsung ke target (aman).
- `damp3/damp2/damp4/dampC/dampQ/dampS/dampM` = `damp` per komponen. `dampE` & `dampS` pakai `dampAngle` (shortest path, wrap ±π).
  `dampQ` menormalisasi & membuang komponen velocity paralel (stabil untuk rotasi). Semua menerima target berupa angka (scalar ke semua
  komponen), array, objek three, atau objek `{x,y,z}`; `dampC` menerima string CSS/hex/Color/[r,g,b].
- Return OR seluruh komponen → `if (easing.damp3(...)) invalidate()` = render-on-demand otomatis.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
import { easing } from 'maath'              // atau: import * as easing from 'maath/easing'
// signature (maath 0.10.8, packages/maath/src/easing.ts):
// damp(obj, prop, target, smoothTime = 0.25, delta = 0.01, maxSpeed = Infinity, easing = exp, eps = 0.001) → boolean
// damp3(vec3, target, smoothTime?, delta?, maxSpeed?, easing?, eps?) → boolean   (sama: damp2, damp4, dampE, dampC, dampQ, dampS, dampM)
// dampAngle(obj, prop, targetAngle, ...) · dampLookAt(object3D, target, smoothTime?, delta?, ...)
useFrame((state, delta) => {
  easing.damp3(ref.current.position, hovered ? [0, 0.3, 0] : [0, 0, 0], 0.2, delta)
  easing.dampE(ref.current.rotation, [0, state.pointer.x * 0.4, 0], 0.35, delta)
  easing.dampC(ref.current.material.color, hovered ? '#ff5a36' : '#e8e2d6', 0.3, delta)
  easing.damp(ref.current.material, 'opacity', visible ? 1 : 0, 0.4, delta)
})
```
Tanpa init/cleanup (stateless kecuali `__damp` di objek). Catatan README: contoh `dampAngle(angle, targetAngle, 0.25, delta)` **salah**;
signature nyata `dampAngle(obj, 'prop', target, ...)`.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Param | Default | Feel (rentang = rekomendasi selera) |
|---|---|---|
| `smoothTime` | 0.25 | 0.08–0.15 snappy UI/hover; 0.2–0.35 objek "berat"; 0.4–0.8 kamera sinematik/parallax latar. Beda smoothTime per properti = koreografi berlapis |
| `maxSpeed` | ∞ | Unit/detik. Isi saat target bisa lompat jauh (scroll ke section jauh, klik nav) agar perjalanan terasa terkendali |
| `easing` | `exp` | Ganti hanya untuk eksperimen; `exp` = karakter SmoothDamp |
| `eps` | 0.001 | Untuk nilai kecil (offset 0–1, uniform halus) pakai 1e-5 (ScrollControls memakai 0.00001) agar tidak snap terlihat |
| `delta` | 0.01 | **Selalu** pass `delta` dari `useFrame` |

Fungsi lain maath 0.10.8 (terverifikasi di source): `misc` (`clamp`, `repeat`, `deltaAngle`, `remap(x,[a,b],[c,d])`, `lerp`, `inverseLerp`,
`fade`, `fibonacciOnSphere`, `convexHull`, …), `random` (`inSphere`, `onSphere`, `inCircle`, `onCircle`, `inRect`, `onRect`, `inBox`, `onBox`
mengisi TypedArray; `Generator` seeded; `noise.simplex2/3`, `perlin2/3`), `buffer` (`swizzle`, `addAxis`, `lerp`, `translate`, `rotate`,
`map`, `center`, `sort`), `geometry` (`RoundedPlaneGeometry`, `applyBoxUV`, …), easing kurva `sine/cubic/quint/circ/quart/expo .in/.out/.inOut`,
`rsqw` (rounded square wave), `linear`.

**Paket baru `math` 0.1.0** (data-oriented, array polos, tanpa alokasi): `import { spring, spring3, easing } from 'math/time'`.
- `spring3.update(state, target, smoothTime, dampingRatio, delta)` — solusi analitik eksak (stabil di delta apa pun); `dampingRatio`
  1 = kritis (= maath `damp`), < 1 = **bouncy/overshoot**, > 1 = lamban. `spring3.damp(state, target, smoothTime, delta)` = ratio 1.
- `spring.fromResponse(responseSec)` = konversi gaya SwiftUI (periode natural) → smoothTime: `spring3.update(s, t, spring.fromResponse(0.5), 0.3, dt)` = bouncy ~0.5 s.
- State: `const s = spring3.create([0,0,0])` → `{ value, velocity }`; salin ke three: `mesh.position.fromArray(s.value)`.
- Juga: `math/noise` (simplex/perlin/worley, `fbm`, `ridged`, `curl3`, `domainWarp3`), `math/random` (`mulberry32` seeded), `math/ik` (`fabrik2/3`).
  Belum dipakai drei/postprocessing; API 0.x bisa berubah.

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **R3F**: semua di `useFrame((state, delta) => …)`; target dari ref/zustand `getState()` (bukan state React reaktif).
- **Scroll (Lenis/native)**: simpan progress mentah di ref, `easing.damp(obj, 't', progress, 0.1–0.2, delta)` — Lenis sudah smooth,
  damping kedua kecil saja (atau nol) agar tidak terasa "karet" dua lapis.
- **Pointer**: `state.pointer` (-1..1) → `damp3(camera.position, [px*k, py*k, z], 0.35–0.6, delta)`.
- **drei**: ScrollControls (`damping` 0.25 + `eps` 1e-5), PresentationControls (`damping` 0.25), MotionPathControls (`damping` 0.1) memakai
  fungsi yang sama → angka smoothTime di komponenmu sebanding langsung dengan prop drei.
- **Demand mode**: `const moving = easing.damp3(...); if (moving) state.invalidate()`.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Hover berlapis (scale cepat, warna lambat, lift sedang)**
```jsx
useFrame((_, d) => {
  easing.damp3(ref.current.scale, hovered ? 1.08 : 1, 0.12, d)
  easing.damp(ref.current.position, 'y', hovered ? 0.15 : 0, 0.25, d)
  easing.dampC(ref.current.material.emissive, hovered ? '#2a1a10' : '#000000', 0.45, d)
})
```
Kenapa mahal: tiga smoothTime berbeda = respons beruntun alami, bukan satu tween seragam.

**2. Tilt kartu mengikuti pointer dengan inersia (shortest-path)**
```jsx
useFrame((state, d) => easing.dampE(card.current.rotation, [-state.pointer.y * 0.25, state.pointer.x * 0.35, 0], 0.3, d))
```
Kenapa mahal: kartu terasa punya massa; `dampE` tidak "memutar balik" saat melewati ±π.

**3. Kamera menoleh halus ke objek yang dipilih**
```jsx
useFrame((state, d) => {
  easing.damp3(state.camera.position, focusPos, 0.6, d, 8)   // maxSpeed 8 unit/s untuk jarak jauh
  easing.dampLookAt(state.camera, focusTarget, 0.5, d)
})
```
Kenapa mahal: posisi & arah pandang punya lag sendiri; maxSpeed membuat perjalanan jauh tetap terkendali.

**4. Render-on-demand yang berhenti sendiri**
```jsx
useFrame((state, d) => { if (easing.damp3(ref.current.position, target, 0.25, d)) state.invalidate() })
```
Kenapa mahal: baterai aman — GPU idle begitu gerakan selesai (return `false` di bawah `eps`).

**5. Pegas bouncy (paket `math`)**
```jsx
import { spring, spring3 } from 'math/time'
const s = spring3.create([0, 0, 0]); const st = spring.fromResponse(0.45)
useFrame((_, d) => { spring3.update(s, pressed ? [0, -0.2, 0] : [0, 0, 0], st, 0.35, d); ref.current.position.fromArray(s.value) })
```
Kenapa mahal: overshoot terkontrol (ratio 0.35) memberi "pantulan" taktil tombol 3D.

**6. Distribusi partikel yang seragam**
```jsx
import { random } from 'maath'
const positions = useMemo(() => random.inSphere(new Float32Array(3000 * 3), { radius: 1.5 }), [])
<Points positions={positions} stride={3}><PointMaterial size={0.01} transparent depthWrite={false} /></Points> // drei
```
Kenapa mahal: sebaran volume benar (u^(1/3)), bukan menumpuk di tengah seperti `Math.random()` per sumbu.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Zero-alloc (vektor temp di module scope). Aman dipanggil ratusan kali per frame; untuk ribuan instance lebih baik shader/TSL.
- `__damp` menempel di objek target; jangan pakai objek target yang sama untuk dua animasi berbeda properti yang sama.
- Reduced motion: perbesar perubahan menjadi instan (`smoothTime` kecil + tanpa idle motion) atau set nilai langsung tanpa damping.
- Murni JS, tidak tergantung renderer (jalan di WebGL & WebGPU, v9 & v10).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-maath-legacy/README.md` — referensi API maath (easing, misc, random, buffer, geometry).
- `repo-maath-legacy/packages/maath/src/easing.ts` — implementasi damp/dampE/dampQ/dampLookAt (sumber kebenaran default).
- `repo-maath-legacy/packages/maath/src/random/index.ts` — inSphere/onSphere/inCircle + Generator seeded.
- `repo-maath-legacy/packages/maath/src/misc.ts` — remap, deltaAngle, fibonacciOnSphere, dll.
- `repo-maath-legacy/packages/maath/CHANGELOG.md` — riwayat versi sampai 0.10.8.
- `repo-maath/README.md` + `repo-maath/API.md` — paket `math` baru (spring, noise, ik, shapes).
- `repo-maath/src/time/spring.ts`, `spring-core.ts` — solver pegas analitik + `fromResponse`.
- `repo-maath/examples/src/example-spring.ts`, `example-easing.ts` — contoh resmi spring/easing.
