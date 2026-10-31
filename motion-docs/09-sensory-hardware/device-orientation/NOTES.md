---
tool: Device Orientation & Motion Events (+ Generic Sensor API, Screen Orientation)
version: "Web standard. BCD 2026-10-28: deviceorientation Chrome 7 / Firefox 6 / Safari iOS 4.2 / Safari macOS 17; DeviceOrientationEvent.requestPermission() Safari iOS 14.5 & Chrome 152 (Firefox/desktop Safari tidak); deviceorientationabsolute Chrome 50 / Firefox 110 (Safari tidak); Gyroscope/AbsoluteOrientationSensor/RelativeOrientationSensor hanya Chromium 67+; ScreenOrientation.angle Safari 16.4+"
official: https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events
local: ../../_shared/mdn-content/files/en-us/web/api/{device_orientation_events,deviceorientationevent,devicemotionevent,window/deviceorientation_event,sensor_apis,gyroscope,relativeorientationsensor,screen_orientation_api}/ + web/
fetched: 2026-10-28
---
# Device Orientation — kemiringan HP jadi parallax, kilau (sheen) & "kaca" yang hidup di tangan

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk efek mobile yang "hidup di tangan": parallax layer, sheen/glare kartu, gravitasi Matter.js mengikuti kemiringan, kamera 3D yang condong sedikit.
- **Desktop**: tidak ada sensor → fallback pointer (`pointermove`) ke pipeline yang sama.
- **Generic Sensor API** (`RelativeOrientationSensor` → quaternion, tanpa gimbal lock) hanya Chromium 67+ (BCD) — progressive enhancement, bukan dasar.
- **Jangan** untuk navigasi wajib/kontrol utama (izin bisa ditolak, Firefox desktop & Safari macOS tanpa sensor) dan jangan memicu gerak besar tanpa izin/kontrol user (vestibular).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Event `deviceorientation`: `alpha` (sumbu z, 0–360, kompas relatif), `beta` (sumbu x, −180…180, condong depan/belakang), `gamma` (sumbu y, −90…90, kiri/kanan), `absolute` (bool). Semua derajat, frame **perangkat** (bukan layar). MDN contoh: batasi beta ke [−90, 90] karena "we don't want to have the device upside down".
- Euler angle: saat HP hampir tegak (beta → ±90°) gamma/alpha jadi tidak stabil (gimbal) — persis posisi orang membaca HP sambil berdiri. Jadi: kalibrasi baseline + clamp + smoothing, atau quaternion (`RelativeOrientationSensor`) di Chromium. (Penalaran matematis, bukan kutipan docs.)
- `devicemotion`: `acceleration`, `accelerationIncludingGravity`, `rotationRate`, `interval` (ms) — untuk shake/impulse, bukan sudut.
- **Izin**: `DeviceOrientationEvent.requestPermission(absolute?)` → Promise `"granted" | "denied"`; wajib **transient activation** (click/tap) — tanpa itu reject `NotAllowedError` saat state "prompt". `absolute = true` ikut meminta magnetometer (event `deviceorientationabsolute`). Secure context (HTTPS) wajib. Ada di Safari iOS 14.5+ dan **Chrome 152+** (BCD) → deteksi fitur `typeof DeviceOrientationEvent.requestPermission === "function"` sekarang true juga di Chrome terbaru; apakah Chrome benar-benar menampilkan prompt: [UNVERIFIED].
- `DeviceMotionEvent.requestPermission()` terpisah — minta keduanya di satu klik (`Promise.all`, contoh MDN).
- Chrome < 50 dulu mengirim nilai absolut di `deviceorientation`; sekarang relatif — butuh absolut → `deviceorientationabsolute` (BCD note).
- Rotasi layar: angle sensor tetap frame perangkat → koreksi dengan `screen.orientation.angle` (0/90/180/270; Safari 16.4+).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
// tilt.js — izin (iOS/Chrome baru), baseline, clamp, kompensasi rotasi layar, fallback pointer
const state = { x: 0, y: 0, tx: 0, ty: 0, base: null };
const MAX = 25;                                           // derajat → nilai penuh (heuristik)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function onOrient(e) {
  if (e.beta == null || e.gamma == null) return;          // sensor tidak ada / belum siap
  const a = ((screen.orientation?.angle ?? 0) * Math.PI) / 180;
  // putar vektor (gamma, beta) ke frame layar — cek tanda di device nyata
  const gx = e.gamma * Math.cos(a) + e.beta * Math.sin(a);
  const gy = -e.gamma * Math.sin(a) + e.beta * Math.cos(a);
  state.base ??= { x: gx, y: gy };                        // kalibrasi: posisi pegang saat mulai = netral
  state.tx = clamp((gx - state.base.x) / MAX, -1, 1);
  state.ty = clamp((gy - state.base.y) / MAX, -1, 1);
}
function onPointer(e) {                                    // desktop / izin ditolak
  state.tx = (e.clientX / innerWidth) * 2 - 1;
  state.ty = (e.clientY / innerHeight) * 2 - 1;
}
export async function enableTilt() {                       // panggil dari click handler
  try {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      const res = await DeviceOrientationEvent.requestPermission();
      if (res !== "granted") throw new Error("denied");
    }
    addEventListener("deviceorientation", onOrient);
    screen.orientation?.addEventListener("change", () => (state.base = null));  // re-kalibrasi saat rotasi
  } catch { addEventListener("pointermove", onPointer); }
}
export function disableTilt() {
  removeEventListener("deviceorientation", onOrient);
  removeEventListener("pointermove", onPointer);
}
export const recalibrate = () => (state.base = null);
export { state as tilt };
```
Smoothing dikerjakan di loop render (resep 1), bukan di handler event.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek ke feel | Saran (heuristik) |
|---|---|---|
| `MAX` derajat untuk nilai penuh | sensitivitas | 15–30° (tangan manusia nyaman ±20°) |
| deadzone di sekitar baseline | diam benar-benar diam | 0.5–1.5° |
| smoothing low-pass τ | "berat" vs "gelisah" | 80–200 ms (`1 - exp(-dt/τ)`) |
| spring (stiffness/damping) | overshoot "jelly" yang terkontrol | ζ ≈ 0.7–0.9, ω ≈ 8–14 rad/s |
| amplitudo parallax per layer | kedalaman | depan 12–24 px, belakang 2–6 px; total ≤ ~3% viewport |
| sheen angle mapping | kilau | sudut gradien = atan2(ty, tx); intensitas = hypot |
| re-kalibrasi | drift saat user ganti posisi | saat `orientationchange`, tombol "reset", atau idle lama |
| pointer fallback | parity desktop | sama pipeline; deadzone lebih kecil |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **GSAP**: satu `gsap.ticker` membaca `tilt.tx/ty`, smoothing, lalu `quickSetter`/CSS var `--tx/--ty` pada container; layer pakai `transform: translate3d(calc(var(--tx) * 18px), …)`. (API GSAP: lihat NOTES kategorinya.)
- **R3F**: `useFrame((state, delta) => { cam.position.x = damp(cam.position.x, tilt.tx * 0.3, 6, delta); … })` — kamera condong ≠ objek berputar; lebih natural.
- **Matter.js**: `engine.gravity.x = tilt.tx; engine.gravity.y = 1 + tilt.ty * 0.5` → pill/badge "tumpah" mengikuti kemiringan.
- **Barba/Swup**: listener global sekali; jangan minta izin ulang tiap halaman (izin iOS bertahan per sesi halaman — simpan flag sesi).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Parallax berlapis dengan spring frame-rate independent**
```js
import { tilt } from "./tilt.js";
const s = { x: 0, y: 0, vx: 0, vy: 0 }, K = 120, C = 18;       // ω≈11, ζ≈0.82
let last = performance.now();
function frame(t) {
  const dt = Math.min(0.05, (t - last) / 1000); last = t;
  for (const ax of ["x", "y"]) {
    const target = ax === "x" ? tilt.tx : tilt.ty, v = "v" + ax;
    s[v] += (K * (target - s[ax]) - C * s[v]) * dt; s[ax] += s[v] * dt;   // semi-implicit Euler
  }
  scene.style.setProperty("--tx", s.x.toFixed(4)); scene.style.setProperty("--ty", s.y.toFixed(4));
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
/* CSS: .layer { transform: translate3d(calc(var(--tx) * var(--depth) * 1px), calc(var(--ty) * var(--depth) * 1px), 0); } */
```
Kenapa mahal: layer punya massa (sedikit overshoot lalu settle) dan kedalaman berbeda — seperti diorama fisik, bukan gambar geser.

**2. Sheen/glare kartu holografik**
```css
.card { --tx: 0; --ty: 0; background:
  radial-gradient(circle at calc(50% + var(--tx) * 40%) calc(50% + var(--ty) * 40%), rgb(255 255 255 / .55), transparent 45%),
  linear-gradient(calc(110deg + var(--tx) * 25deg), #6ee7ff33, #c084fc33, #fde68a33), var(--art);
  background-blend-mode: overlay, color-dodge, normal;
  transform: perspective(800px) rotateY(calc(var(--tx) * 8deg)) rotateX(calc(var(--ty) * -8deg)); }
```
Kenapa mahal: pantulan bergerak berlawanan dengan rotasi kartu → mata membaca permukaan mengkilap 3D, bukan gradien statis.

**3. Shake → impulse (devicemotion), dengan cooldown**
```js
let lastShake = 0;
addEventListener("devicemotion", (e) => {
  const a = e.acceleration; if (!a || a.x == null) return;     // butuh izin DeviceMotionEvent di iOS
  const mag = Math.hypot(a.x, a.y, a.z);
  if (mag > 18 /* m/s², heuristik */ && performance.now() - lastShake > 800) { lastShake = performance.now(); scatterParticles(mag); }
});
```
Kenapa mahal: guncangan fisik menyebar partikel/huruf — interaksi yang memakai seluruh tubuh perangkat.

**4. Tombol izin yang jujur + re-kalibrasi**
```html
<button id="tilt">Aktifkan efek kemiringan</button> <button id="recal" hidden>Atur ulang posisi</button>
<script type="module">
  import { enableTilt, recalibrate } from "./tilt.js";
  const btn = document.querySelector("#tilt"), recal = document.querySelector("#recal");
  btn.addEventListener("click", async () => { await enableTilt(); btn.hidden = true; recal.hidden = false; });
  recal.addEventListener("click", recalibrate);
</script>
```
Kenapa mahal: prompt izin muncul hanya setelah user memilih, dan posisi pegang apa pun jadi "netral" — tidak ada kartu yang miring permanen.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Handler event hanya menyimpan angka; semua smoothing & tulis DOM di satu rAF. Animasikan `transform`/`opacity` saja.
- `prefers-reduced-motion: reduce` → matikan parallax/gerak kamera atau kecilkan amplitudo ≤ 20% dan tanpa spring overshoot; sediakan toggle.
- iOS Safari: wajib `requestPermission()` dari tap + HTTPS; kalau ditolak, tidak bisa diminta ulang secara programatik di sesi itu (perilaku umum Safari; [UNVERIFIED] di sumber lokal) → selalu siapkan fallback pointer/sentuh.
- Safari macOS 17+ punya event tetapi umumnya tanpa sensor; Firefox Android memakai event standar tanpa `requestPermission`.
- `screen.orientation.lock()` praktis tidak bisa dipakai (Chrome/Firefox desktop selalu `NotSupportedError`, Safari tidak ada — BCD) → desain responsif terhadap rotasi, jangan kunci.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `../../_shared/mdn-content/files/en-us/web/api/device_orientation_events/detecting_device_orientation/index.md` — contoh bola + izin `Promise.all`.
- `../../_shared/mdn-content/files/en-us/web/api/device_orientation_events/orientation_and_motion_data_explained/index.md` — definisi alpha/beta/gamma & frame koordinat.
- `../../_shared/mdn-content/files/en-us/web/api/device_orientation_events/using_device_orientation_with_3d_transforms/index.md` — orientasi → transform CSS 3D.
- `../../_shared/mdn-content/files/en-us/web/api/deviceorientationevent/requestpermission_static/index.md` — izin, parameter `absolute`, `NotAllowedError`.
- `../../_shared/mdn-content/files/en-us/web/api/devicemotionevent/` — acceleration, rotationRate, interval, requestPermission.
- `../../_shared/mdn-content/files/en-us/web/api/relativeorientationsensor/index.md` — quaternion (Chromium).
- `../../_shared/mdn-content/files/en-us/web/api/screen_orientation_api/index.md` — `screen.orientation` & event change.
- `web/mdn__screenorientation__angle.md` — `angle`.
- `web/bcd-support.md` — dukungan per browser (requestPermission Chrome 152 / iOS 14.5, sensor Chromium-only).
