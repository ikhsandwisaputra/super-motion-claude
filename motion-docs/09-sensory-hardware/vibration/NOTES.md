---
tool: Vibration API (navigator.vibrate) + haptic switch Safari iOS
version: "Web standard. BCD 2026-10-28: Chrome/Chrome Android 32+, Samsung Internet, WebView 4.4.3+; Firefox desktop DIHAPUS di 129; Firefox Android: API ada tapi getaran dinonaktifkan; Safari macOS/iOS TIDAK ADA. <input type=checkbox switch>: Safari 17.4+ (experimental di BCD); haptic saat toggle di iOS 18 (WebKit, Safari 18.0)"
official: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
local: ../../_shared/mdn-content/files/en-us/web/api/{vibration_api,navigator/vibrate}/ + web/ (BCD, WebKit Safari 17.4 & 18.0)
fetched: 2026-10-28
---
# Vibration / haptics — konfirmasi taktil untuk momen yang disebabkan user (Android), switch native untuk iOS

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk konfirmasi diskret yang *disebabkan user*: toggle, snap/detent slider, drop berhasil, ambang long-press tercapai, error input. Pasangkan dengan suara + visual di event yang sama.
- **iOS**: `navigator.vibrate` tidak ada (BCD). Satu-satunya haptic web resmi: **`<input type="checkbox" switch>`** — iOS 18 memberi satu ketukan haptic saat user mengetuk switch (WebKit Safari 18.0). Untuk toggle → pakai switch native, haptic gratis.
- **Jangan** untuk gerak kontinu (scroll, hover, animasi dekoratif), notifikasi beruntun, atau pola panjang (> ~300 ms terasa seperti panggilan masuk — heuristik). Jangan jadikan satu-satunya kanal informasi.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- `navigator.vibrate(pattern)` → boolean. `pattern` = angka (ms) atau array bergantian *getar, jeda, getar, …*; panggilan baru **menghentikan** pola sebelumnya; `0`/`[]`/semua nol = batal; pola terlalu panjang dipotong (maks tergantung implementasi). Perangkat silent/DND bisa tidak bergetar (MDN).
- Butuh **sticky user activation** (MDN): user pernah berinteraksi di sesi itu. Chrome 60+: tanpa gesture → `false`. Tidak jalan di iframe cross-origin (Chrome 55+, Firefox 72+).
- Firefox Android: mengembalikan `true` tapi **tidak bergetar** (dinonaktifkan karena abuse, bug 1653318) → nilai return bukan bukti getaran terjadi.
- Kualitas rasa ditentukan motor (LRA tajam vs ERM lembek): pulsa < ~10 ms bisa tidak terasa di motor murah, pulsa > 40 ms terasa "dengung" (heuristik, tidak ada di docs). API tidak punya kontrol intensitas → intensitas disimulasikan lewat durasi & ritme.
- Switch iOS: haptic muncul dari interaksi native pada kontrol. WebKit bug 285120 ("haptic feedback for `<input type=checkbox switch>` should require user activation") **RESOLVED FIXED** (commit Jan 2025) → memicu dari script tanpa aktivasi tidak didukung. Trik pihak ketiga (klik `<label>` switch tersembunyi di dalam handler gesture, mis. paket `ios-haptics`) rapuh antar versi iOS: [UNVERIFIED]; klaim bahwa iOS 26.5 menutup trik ini: [UNVERIFIED].

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
// haptics.js — vocabulary + toggle + throttle
const canVibrate = typeof navigator.vibrate === "function";
export const HAPTIC = {               // durasi ms (heuristik; uji di beberapa HP Android)
  tick: 10,                           // detent slider, pilihan berubah
  tap: 18,                            // tombol utama ditekan
  arm: 25,                            // ambang long-press tercapai
  success: [12, 60, 24],              // dua pulsa naik = "beres"
  warn: [30, 50, 30],
  error: [40, 40, 40, 40, 80],        // tiga ketukan, terakhir lebih panjang
};
let enabled = localStorage.getItem("haptics") !== "off";
let last = 0;
export function haptic(name, { minGap = 50 } = {}) {
  if (!enabled || !canVibrate) return false;
  const now = performance.now();
  if (now - last < minGap) return false;            // jangan "berdengung" saat event cepat
  last = now;
  return navigator.vibrate(HAPTIC[name]);
}
export function setHaptics(on) { enabled = on; localStorage.setItem("haptics", on ? "on" : "off"); if (!on && canVibrate) navigator.vibrate(0); }
export const hapticsSupported = canVibrate;         // sembunyikan toggle bila false (iOS/desktop)
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek | Saran (heuristik) |
|---|---|---|
| durasi tick | "klik" mekanis vs dengung | 8–15 ms |
| durasi tap | konfirmasi tegas | 15–25 ms |
| pola success/error | makna lewat ritme (naik = sukses, berulang = salah) | 2 pulsa vs 3 pulsa |
| jeda dalam pola | terbaca sebagai pulsa terpisah | ≥ 40 ms |
| throttle `minGap` | anti-dengung pada slider/drag | 50–80 ms |
| total durasi pola | sopan vs mengganggu | ≤ 250 ms |
| sinkron dengan suara | kesatuan sensorik | panggil di handler yang sama, durasi getar ≈ transien suara |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Motion/GSAP drag & snap**: panggil `haptic("tick")` di callback snap (bukan per frame drag); `haptic("tap")` di `onDragEnd` bila drop valid, `haptic("error")` bila ditolak + animasi shake.
- **Matter.js**: tabrakan dengan kecepatan relatif > ambang → `navigator.vibrate(Math.min(40, 8 + speed * 2))` + throttle 80 ms (heuristik; API Matter di NOTES physics).
- **Audio**: bunyikan sfx dari `../web-audio/` atau `../howler/` di baris yang sama — telinga + tangan + mata menerima event dalam frame yang sama.
- **Form**: `invalid` event → `haptic("error")` + fokus ke field + pesan teks (getaran bukan satu-satunya kanal).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Slider ber-detent: tick taktil + bunyi + notch visual**
```js
import { haptic } from "./haptics.js";
let lastStep = Number(range.value);
range.addEventListener("input", () => {
  const step = Math.round(Number(range.value) / 10);           // detent tiap 10
  if (step !== lastStep) { lastStep = step; haptic("tick", { minGap: 40 }); sfx("tick"); pulseNotch(step); }
});
```
Kenapa mahal: slider terasa punya "gigi" seperti knob hardware — tiga indra mengonfirmasi tiap langkah.

**2. Long-press yang "mengunci"**
```js
let timer;
btn.addEventListener("pointerdown", () => {
  btn.classList.add("charging");                                // CSS: ring mengisi 450 ms
  timer = setTimeout(() => { haptic("arm"); btn.classList.add("armed"); }, 450);
});
for (const t of ["pointerup", "pointerleave", "pointercancel"])
  btn.addEventListener(t, () => { clearTimeout(timer); btn.classList.remove("charging"); });
```
Kenapa mahal: ada momen fisik "klik" tepat saat aksi siap — user tidak perlu menebak kapan boleh melepas.

**3. Toggle native = haptic iOS gratis + parity Android**
```html
<label class="pref"><input type="checkbox" switch id="snd"> Suara antarmuka</label>
<script type="module">
  import { haptic } from "./haptics.js";
  document.querySelector("#snd").addEventListener("change", (e) => {
    haptic("tap");                                              // Android; iOS 18+ sudah bergetar dari switch native
    setSound(e.target.checked);
  });
</script>
```
Kenapa mahal: di iPhone terasa persis seperti Settings, di Android dapat getaran setara, browser lain dapat checkbox biasa (degrade gracefully — WebKit 17.4).

**4. Pola error yang bisa dibaca**
```js
form.addEventListener("invalid", (e) => {
  haptic("error");
  e.target.animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
    { duration: 240, easing: "cubic-bezier(.36,.07,.19,.97)" });
}, true);
```
Kenapa mahal: ritme getar sama dengan ritme shake visual — kesalahan "dirasakan" sebelum dibaca.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Murah secara CPU; risikonya UX: sediakan toggle "Getaran" (hanya tampil bila `hapticsSupported`), simpan preferensi, default ON hanya untuk konfirmasi penting (heuristik).
- Tidak ada media query khusus haptics; `prefers-reduced-motion` tidak mengatur getaran — tetap hormati toggle user. Pengguna dengan sensitivitas sensorik → pola singkat, jarang.
- Jangan andalkan nilai return (Firefox Android `true` tanpa getar). Desktop: no-op.
- Dukungan: Chromium Android (Chrome, Samsung, WebView) saja yang benar-benar bergetar; iOS hanya via switch native.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `../../_shared/mdn-content/files/en-us/web/api/vibration_api/index.md` — konsep pola, cancel, getar berulang.
- `../../_shared/mdn-content/files/en-us/web/api/navigator/vibrate/index.md` — return value, truncation, silent/DND, sticky activation.
- `web/bcd-support.md` — dukungan + catatan BCD (Firefox 129 removal, Android disabled, user gesture Chrome 60).
- `web/webkit-blog__safari-18.0.md` — "Switch": haptic iOS 18 untuk `<input type=checkbox switch>` (+ bagian WebXR visionOS).
- `web/webkit-blog__safari-17.4.md` — switch control diperkenalkan, styling `accent-color`, `::track`/`::thumb` (STP).
- `web/webkit-bug-285120__summary.md` — ringkasan bug "haptic … should require user activation" (RESOLVED FIXED).
- `../web-audio/web/mdn__security__user_activation.md` — vibrate = sticky activation.
