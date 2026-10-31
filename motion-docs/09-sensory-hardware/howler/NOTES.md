---
tool: howler.js
version: "2.2.4 (npm latest, dipublish 2023-09-19; repo HEAD 1d30535, package.json 2.2.4). Tidak ada rilis baru sejak 2023 — dicek 2026-10-28"
official: https://howlerjs.com · docs = https://github.com/goldfire/howler.js#documentation
local: repo-howler/README.md (dokumentasi lengkap), repo-howler/src/howler.core.js, repo-howler/src/plugins/howler.spatial.js
fetched: 2026-10-28
---
# howler.js — pemutar sample serbaguna: sprite sfx UI, unlock mobile otomatis, stereo/3D sederhana

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk "Playful/Creative Studio" (resep arsenal: Motion + Matter.js + Rive + Howler): banyak sfx pendek dalam **satu file sprite**, butuh `rate`/`fade`/`stereo` per instance, auto-unlock iOS/Android, fallback HTML5 Audio. ~7 KB gzip (README).
- **Native Web Audio** (`../web-audio/`) kalau butuh analyser/visual reaktif, synth tanpa aset, atau jadwal sample-accurate (howler tidak mengekspos penjadwalan di waktu audio).
- **Tone.js** (`../tonejs/`) untuk ritme/BPM/sinkron visual musikal.
- Proyek ini *maintenance mode* de facto (2.2.4 sejak 2023) — API stabil, tapi jangan berharap fitur baru.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Default Web Audio; `html5: true` memaksa HTML5 Audio (untuk file besar/streaming — tidak perlu tunggu decode penuh).
- `new Howl()` = **grup**; satu Howl = satu file. `play()` mengembalikan **sound id** (satu-satunya method yang tidak chainable); id itu dipakai di `volume/rate/fade/stereo/pos(…, id)`. Tanpa id → berlaku ke semua sound di grup.
- `sprite: { name: [offsetMs, durationMs, loop?] }` → `play("name")` membuat instance baru tiap panggilan (bisa overlap).
- `pool` default 5 = jumlah sound *inactive* yang disimpan untuk didaur ulang.
- `rate` 0.5–4.0. Mode Web Audio menyetel `bufferSource.playbackRate` (source) → **pitch ikut berubah** (efek "vinyl"); mode HTML5 menyetel `audio.playbackRate` (time-stretch di level elemen; pitch-preservation tergantung browser [UNVERIFIED lokal]).
- `fade()` di Web Audio = `gain.setValueAtTime(from)` + `linearRampToValueAtTime(to)` (source) — linear, jadi fade-out terdengar "lama di atas, jatuh di akhir"; untuk telinga, fade pendek lebih aman.
- Unlock (source `_unlockAudio`): listener capture `touchstart`, `touchend`, `click`, `keydown` di `document`; memutar buffer senyap 1-sample + `ctx.resume()`; setelah sukses emit event `unlock`. Jika `ctx.sampleRate !== 44100` saat unlock pertama di mobile, howler **unload & membuat context baru** (workaround bug Safari 44.1↔48 kHz).
- `Howler.autoSuspend` (default true) men-suspend context setelah **30 s** idle; resume otomatis saat play.
- Spatial plugin: `stereo(pan)` memakai `StereoPannerNode` bila ada, kalau tidak fallback `PannerNode` `equalpower`; `pannerAttr` default `panningModel: "HRTF"`, `distanceModel: "inverse"`, `refDistance 1`, `rolloffFactor 1`.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
import { Howl, Howler } from "howler";                  // npm i howler

export const ui = new Howl({
  src: ["/sfx/ui.webm", "/sfx/ui.mp3"],                  // urutan preferensi; howler pilih yang didukung
  sprite: { tick: [0, 80], press: [200, 140], whoosh: [500, 420], success: [1000, 650] },
  volume: 0.6,
  preload: true,
  onloaderror: (id, err) => console.warn("sfx load", err),
  onplayerror: () => ui.once("unlock", () => {/* boleh retry play di sini */}),
});

Howler.volume(0.8);                                       // master
// mute toggle global: Howler.mute(true|false)
// cleanup: ui.unload();  (atau Howler.unload() untuk semua + buang context)
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek ke feel | Default | Rentang bagus |
|---|---|---|---|
| `rate(r, id)` per play | variasi pitch+durasi (Web Audio) → anti machine-gun | 1.0 | 0.94–1.06 acak (heuristik); 0.5–4 valid |
| `volume(v, id)` | tekanan/kedekatan | 1.0 | 0.4–0.8 untuk UI; jitter ±10% (heuristik) |
| `stereo(pan, id)` (spatial) | posisi kiri/kanan sesuai elemen di layar | null | −0.6…0.6 (jangan ekstrem; heuristik) |
| `fade(from, to, ms, id)` | masuk/keluar | — | 80–250 ms untuk ambience/loop |
| `sprite` durasi | snappy | — | sfx UI 40–250 ms (heuristik) |
| `html5` | streaming vs presisi/latency | false | `true` hanya untuk musik panjang |
| `pool` | daur ulang instance | 5 | naikkan bila banyak overlap cepat |
| `Howler.autoSuspend` | hemat baterai vs latency bangun | true (30 s) | biarkan |
| `Howler.html5PoolSize` | jumlah node HTML5 ter-unlock | 10 | — |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Motion / GSAP**: bunyikan di event yang sama dengan start animasi (`onClick`, `onPointerUp`, `onComplete` untuk "landing"). Untuk impact fisika (Matter.js `collisionStart`), map kecepatan relatif ke `volume`/`rate` dan throttle (lihat resep 2; API Matter.js sendiri diverifikasi di NOTES kategori physics, bukan di folder ini).
- **Matter.js**: posisi x body → `stereo(((x / innerWidth) * 2 - 1) * 0.6, id)` agar tabrakan terdengar di sisi tempat terjadinya.
- **Barba/Swup**: `whoosh` di hook leave, `fade` ambience ke 0 lalu stop; Howl global (jangan dibuat ulang tiap halaman).
- **Native Web Audio bersama**: `Howler.ctx` (AudioContext) & `Howler.masterGain` (GainNode) tersedia di mode Web Audio → bisa tap ke `AnalyserNode` milik sendiri.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Sprite UI dengan variasi + throttle per nama**
```js
const last = {};
export function sfx(name, { gap = 45, jitter = 0.05, vol = 0.6 } = {}) {
  const now = performance.now();
  if (now - (last[name] ?? -1e9) < gap) return;          // hover cepat tidak jadi "brrrt"
  last[name] = now;
  const id = ui.play(name);
  ui.rate(1 + (Math.random() * 2 - 1) * jitter, id);
  ui.volume(vol * (0.9 + Math.random() * 0.2), id);
  return id;
}
```
Kenapa mahal: satu file, nol jeda, tiap pemicuan sedikit berbeda — kesan "objek nyata", bukan rekaman yang diulang.

**2. Tabrakan fisika (Matter.js) yang terdengar di posisinya**
```js
Matter.Events.on(engine, "collisionStart", ({ pairs }) => {
  for (const { bodyA, bodyB } of pairs.slice(0, 3)) {    // batasi voice per step
    const speed = Math.hypot(bodyA.velocity.x - bodyB.velocity.x, bodyA.velocity.y - bodyB.velocity.y);
    if (speed < 1.5) continue;                            // kontak diam tidak berbunyi
    const id = sfx("press", { gap: 30, vol: Math.min(1, speed / 12) });
    if (id != null) ui.stereo(((bodyA.position.x / innerWidth) * 2 - 1) * 0.6, id);
  }
});
```
Kenapa mahal: keras/pelan dan kiri/kanan mengikuti fisika di layar — telinga mengonfirmasi apa yang dilihat mata.

**3. Loop ambience yang "bernapas" dengan scroll**
```js
const amb = new Howl({ src: ["/sfx/room.webm", "/sfx/room.mp3"], loop: true, volume: 0 });
let ambId = null;
export function ambienceOn() { ambId ??= amb.play(); amb.fade(0, 0.35, 600, ambId); }
export function onScrollVelocity(v) {                     // v 0..1
  if (ambId != null) amb.rate(0.9 + v * 0.25, ambId);     // makin cepat scroll, makin "tegang"
}
```
Kenapa mahal: ruang suara bereaksi pada momentum, bukan sekadar musik latar statis.

**4. Toggle suara aksesibel + autoplay aman**
```js
const btn = document.querySelector("#sound");
let on = localStorage.getItem("sound") === "on";
Howler.mute(!on); btn.setAttribute("aria-pressed", String(on));
btn.addEventListener("click", () => {                     // click = user activation → sekaligus unlock
  on = !on; Howler.mute(!on); btn.setAttribute("aria-pressed", String(on));
  localStorage.setItem("sound", on ? "on" : "off");
  if (on) sfx("success");
});
```
Kenapa mahal: suara opt-in yang diingat, konfirmasi audio langsung saat dinyalakan — sopan dan terasa dirancang.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Format: pakai minimal dua codec, urutkan sesuai preferensi (README Format Recommendations); WebM perlu cues (`ffmpeg -i in.wav -dash 1 out.webm`) agar seekable di Firefox.
- Web Audio memuat file via XHR + decode penuh → sprite UI kecil = ideal; musik panjang → `html5: true`.
- Mobile/Chrome: audio terkunci sampai interaksi; auto-unlock aktif default (`Howler.autoUnlock = true`). Pola resmi bila autoplay gagal: `onplayerror` → `sound.once("unlock", () => sound.play())`.
- Batasi instance bersamaan (throttle + slice) — pool hanya mendaur ulang yang selesai/stop; sound yang di-pause tidak dikembalikan ke pool (README).
- A11y: tidak ada sinyal OS untuk "kurangi suara" → toggle + `Howler.mute`; `prefers-reduced-motion` hanya untuk visual.
- Browser: README menyebut Chrome 7+/Firefox 4+/Safari 5.1.4+/Mobile Safari 6+ (setelah input user) — praktis semua browser modern.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-howler/README.md` — semua opsi Howl, method, global Howler, spatial, Mobile/Chrome Playback, format.
- `repo-howler/CHANGELOG.md` — riwayat (2.2.x; unlock via keydown sejak 2.2.2).
- `repo-howler/src/howler.core.js` — `_unlockAudio` (baris ~301), `_autoSuspend` (30 s), `fade` (linear ramp), `rate`.
- `repo-howler/src/plugins/howler.spatial.js` — stereo vs panner fallback, default `pannerAttr`.
- `repo-howler/examples/sprite/sprite.js` — contoh resmi sprite UI.
- `repo-howler/examples/3d/js/sound.js` — contoh resmi spatial 3D (pos/orientation listener).
