---
tool: Tone.js
version: "npm latest 15.1.22 (2025-04-27); npm next 15.5.64 (2026-10-28) = repo HEAD 28a689c (package.json 15.5.64). Docs: /docs/15.1.22 (latest), /docs/next → 15.5.62. Dicek 2026-10-28"
official: https://tonejs.github.io/ (API https://tonejs.github.io/docs/ · repo https://github.com/Tonejs/Tone.js · wiki https://github.com/Tonejs/Tone.js/wiki)
local: repo-tonejs/Tone/ (source TS), repo-tonejs-wiki/, web/ (84 halaman API 15.1.22 + 3 halaman next)
fetched: 2026-10-28
---
# Tone.js — DAW di browser: ritme musikal (BPM/swing/humanize) yang bisa mengendalikan koreografi visual

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** kalau gerak harus mengikuti *waktu musikal*: Transport (BPM, swing, loop), event berpola (`Loop`, `Sequence`, `Part`, `Pattern`) dengan `probability`/`humanize`, synth siap pakai (MembraneSynth "thump", MetalSynth "tick", NoiseSynth "whoosh"), efek, dan sinkron visual lewat `getDraw()`.
- **Native Web Audio** (`../web-audio/`) cukup untuk 3–5 micro-sound UI + analyser — lebih ringan, latency lebih rendah.
- **Howler** (`../howler/`) untuk sprite sample sederhana.
- **Jangan** pakai Tone untuk satu klik UI lalu lupa `lookAhead` (default 0.1 s → klik telat 100 ms, terasa "ngambang").

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Satu Context global dibuat saat import. `Tone.start()` = `getContext().resume()` (source `core/Global.ts`) → wajib dari gesture; sebelum itu `state === "suspended"` (wiki Autoplay).
- Context defaults (source `Context.ts`): `latencyHint: "interactive"`, `lookAhead: 0.1`, `updateInterval: 0.05`, `clockSource: "worker"`. Set `lookAhead` juga set `updateInterval = lookAhead/2` (atau 0.01 bila 0).
- `Tone.now()` = `currentTime + lookAhead`; `Tone.immediate()` = `currentTime`. Semua trigger tanpa argumen waktu memakai `now()` → **telat 100 ms by design** demi jadwal stabil. Source: jangan campur `now()` dan `immediate()` dalam satu timeline; kalau mau tanpa lookAhead, set `lookAhead = 0`.
- Callback Transport/`ToneEvent` dipanggil **sebelum** waktunya dan tidak sinkron frame (clock worker). Wajib teruskan argumen `time` ke trigger (wiki Accurate-Timing) dan **jangan** sentuh DOM di callback → pakai `getDraw().schedule(cb, time)` (wiki Performance).
- `DrawInstance` (source `core/util/Draw.ts`): callback dijalankan di rAF saat `currentTime ≥ time − anticipation`; `anticipation = 0.008`, `expiration = 0.25` → event yang telat > 250 ms (tab background) **dibuang**, bukan ditumpuk.
- Transport defaults: `bpm 120`, `swing 0`, `swingSubdivision "8n"`, `ppq 192`, `timeSignature 4`, `loopEnd "4m"`. `swing` 0–1 (1 = nada + setengah subdivisi). `progress` = posisi loop 0–1 (selalu 0 bila `loop = false`).
- ToneEvent defaults: `probability 1`, `humanize false` (atau Time, mis. `"32n"` = drift ±), `playbackRate 1`. `Sequence` default `subdivision "8n"`, `loop true`.
- Analysis (source `component/analysis`): `FFT` size 1024, smoothing 0.8, output dB (atau `normalRange: true` → 0–1). `Meter` smoothing 0.8: RMS **naik instan, turun** `prev * smoothing` per panggilan `getValue()` (frame-rate dependent). `Waveform` size 1024. `Follower` smoothing 0.05 s (envelope follower audio-rate). `Meter.getLevel()` deprecated → `getValue()`.
- Deprecated di 15.x (masih ada, jangan dipakai): `Tone.Transport`, `Tone.Destination`/`Master`, `Tone.Draw`, `Tone.Listener`, `Tone.context`, `Tone.Buffer*` → `getTransport()`, `getDestination()`, `getDraw()`, `getListener()`, `getContext()`, `ToneAudioBuffer`.
- **15.5.x (`tone@next`) vs 15.1.22**: `Player.progress` (detik terputar, memperhitungkan playbackRate), `Transport.setTicksAtTime/setSecondsAtTime`, efek `ReverseDelay`, AutoPanner `width`, `UserMedia.open()` menerima constraints, `getConstant` deprecated, perbaikan urutan event Clock/Part. Di 15.1.22 `getTransport()` mengembalikan `TransportClass` (halaman class tidak dipublish) — referensi lengkap ada di `web/next-15.5.62__interfaces__TransportInstance.md`.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
import * as Tone from "tone";                           // npm i tone   (atau tone@next)

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
playBtn.addEventListener("click", async () => {
  await Tone.start();                                   // resume AudioContext dari gesture
  await Tone.loaded();                                  // tunggu semua Player/Sampler buffer
  Tone.getTransport().start("+0.1");                    // mulai sedikit di depan → tanpa pop (wiki Performance)
});

// cleanup (unmount / route change)
function destroy() {
  const tr = Tone.getTransport();
  tr.stop(); tr.cancel();                               // hapus event terjadwal
  Tone.getDraw().cancel();
  synth.dispose();                                      // setiap node Tone punya dispose()
}
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek ke feel | Default | Rentang bagus |
|---|---|---|---|
| `getContext().lookAhead` | stabil (musik) vs responsif (UI) | 0.1 s | 0–0.02 untuk sfx UI; 0.05–0.15 untuk musik |
| `latencyHint` (context baru) | latency vs daya/glitch | "interactive" | "playback" untuk musik panjang (wiki Performance) |
| `getTransport().bpm` | tempo koreografi; `.rampTo(v, s)` = akselerasi musikal | 120 | bebas; ramp 2–10 s |
| `swing` + `swingSubdivision` | groove "manusia" pada stagger | 0, "8n" | 0.1–0.35 pada "16n" (heuristik) |
| `humanize` (event) | jitter waktu organik | false | "64n"–"32n" |
| `probability` (event) | pola generatif, tidak berulang | 1 | 0.4–0.85 |
| envelope `attack/decay/sustain/release` | snappy vs lembut | Synth 0.005/0.1/0.3/1 | UI: attack ≤0.005, release 0.05–0.3 |
| `attackCurve`/`releaseCurve` | bentuk ramp | linear / exponential | "exponential" release terdengar natural |
| `getDraw().anticipation/expiration` | presisi frame visual / drop telat | 0.008 / 0.25 s | biarkan; naikkan expiration hanya bila visual wajib muncul |
| `FFT(size)`, `.smoothing` | detail vs respons | 1024, 0.8 | 64–256 untuk band besar; smoothing 0.6–0.85 |
| `Meter.smoothing`, `normalRange` | lambat turun | 0.8, false | 0.85–0.95 untuk "breathing" UI; `normalRange:true` utk 0–1 |
| `Player.fadeIn/fadeOut`, `playbackRate` | potongan halus, pitch/tempo | 0, 0, 1 | fade 0.005–0.05 anti-klik |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **GSAP — event diskret**: dari callback Tone → `getDraw().schedule(() => gsap.to(el, {...}), time)`. Jangan `gsap.to` langsung di callback (dipanggil ~100 ms sebelum bunyi).
- **GSAP — kontinu**: timeline `paused: true`, lalu di `gsap.ticker.add(() => tl.progress(Tone.getTransport().progress))` dengan `transport.loop = true` → animasi ter-scrub persis oleh loop musik.
- **R3F**: `useFrame(() => { const v = meter.getValue(); mesh.scale.setScalar(1 + v * 0.3); })` dengan `new Tone.Meter({ normalRange: true, smoothing: 0.9 })`.
- **Lenis/scroll**: kecepatan → `filter.frequency.rampTo(hz, 0.1)` atau `getTransport().bpm.rampTo(bpm, 0.5)` (`Param.rampTo(value, rampTime = 0.1, startTime?)`).
- **Native/Howler bersama**: `Tone.setContext(existingAudioContext)` sebelum membuat node apa pun (wiki AudioContext) — node dari context berbeda tidak bisa disambung.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Kit sfx UI zero-asset, tanpa lookAhead, dengan variasi**
```js
Tone.getContext().lookAhead = 0;                        // sfx harus instan
const out = new Tone.Volume(-14).toDestination();
const thump = new Tone.MembraneSynth({ pitchDecay: 0.02, octaves: 4,
  envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.05 } }).connect(out);
const tick = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.05, release: 0.01 },
  harmonicity: 5.1, modulationIndex: 16, resonance: 3000, octaves: 1 }).connect(out);
const vary = (base, cents = 40) => base * 2 ** (((Math.random() * 2 - 1) * cents) / 1200);
export const sfx = {
  press: (v = 0.7) => thump.triggerAttackRelease(vary(70), "32n", Tone.immediate(), v),
  hover: () => tick.triggerAttackRelease(vary(300, 25), "64n", Tone.immediate(), 0.15),
};
```
Kenapa mahal: suara "fisik" (membran/logam) yang tidak pernah identik dua kali, dan nol delay antara jari dan bunyi.

**2. Stagger yang di-swing: grid menyala per 16th di atas groove**
```js
const tr = Tone.getTransport(); tr.bpm.value = 96; tr.swing = 0.25; tr.swingSubdivision = "16n";
const cells = [...document.querySelectorAll(".cell")];
new Tone.Sequence((time, i) => {
  thump.triggerAttackRelease(i % 4 ? 110 : 55, "32n", time, i % 4 ? 0.3 : 0.8);
  Tone.getDraw().schedule(() => cells[i].animate(
    [{ transform: "scale(1.15)", opacity: 1 }, { transform: "scale(1)", opacity: 0.6 }],
    { duration: 220, easing: "cubic-bezier(.2,.8,.2,1)" }), time);
}, [...cells.keys()], "16n").start(0);
tr.start("+0.1");
```
Kenapa mahal: stagger mengikuti groove (offbeat sedikit telat) — koreografi terasa "dimainkan", bukan di-loop rata.

**3. Ambient generatif yang tidak berulang + visual terkunci ke bunyi**
```js
const pluck = new Tone.PluckSynth({ dampening: 3000 }).connect(new Tone.Reverb(4).toDestination());
const notes = ["C4", "D4", "G4", "A4", "C5"];
const loop = new Tone.Loop((time) => {
  const n = notes[Math.floor(Math.random() * notes.length)];
  pluck.triggerAttackRelease(n, "8n", time);
  Tone.getDraw().schedule(() => spawnRipple(notes.indexOf(n) / (notes.length - 1)), time);
}, "8n").start(0);
loop.probability = 0.55; loop.humanize = "32n";
```
Kenapa mahal: kepadatan & timing organik (probability + humanize), tiap riak visual lahir tepat di onset nadanya.

**4. Meter/FFT → envelope visual "bernapas"**
```js
const meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
const fft = new Tone.FFT({ size: 64, normalRange: true });
player.connect(meter); player.connect(fft);
gsap.ticker.add(() => {
  const level = meter.getValue();                        // naik instan, turun pelan
  const bins = fft.getValue();                           // Float32Array 0..1
  blob.style.setProperty("--lvl", level.toFixed(3));
  blob.style.setProperty("--low", bins[1].toFixed(3));   // fft.getFrequencyOfIndex(1) → Hz bin
});
```
Kenapa mahal: peak-hold alami Meter memberi "punch" cepat dengan decay lembut — beda jauh dari bar yang berkedip.

**5. Scrub timeline visual dengan loop musik**
```js
const tr = Tone.getTransport(); tr.loop = true; tr.loopStart = 0; tr.loopEnd = "2m";
const tl = gsap.timeline({ paused: true }).to(".orb", { rotate: 360, ease: "none" });
gsap.ticker.add(() => tl.progress(tr.progress));         // progress 0..1 posisi loop
```
Kenapa mahal: animasi panjang terkunci ke bar musik — ubah BPM (`tr.bpm.rampTo(128, 4)`) dan semua visual ikut mempercepat tanpa drift.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Wiki Performance: jadwalkan sedikit di depan (`"+0.05"` untuk trigger dari mousedown) bila ada pop; `latencyHint: "playback"` untuk musik panjang: `Tone.setContext(new Tone.Context({ latencyHint: "playback" }))`.
- Mobile RAM: decode banyak/besar buffer bisa crash (wiki Performance) → pakai Sampler dengan sedikit sample + `baseUrl`, atau stream via `<audio>`.
- `dispose()` setiap node saat unmount; `getTransport().cancel()` untuk event; `Tone.getDraw().cancel()` untuk visual tertunda.
- Clock = Web Worker yang dibuat dari **Blob URL** (`core/clock/Ticker.ts`); bila pembuatan gagal (mis. CSP tanpa `worker-src blob:`) Tone diam-diam fallback ke `setTimeout` main-thread (rawan throttling di tab background — perilaku browser, [UNVERIFIED lokal]). Tambahkan `worker-src blob:` di CSP. Draw membuang callback yang telat > 250 ms → visual tidak "menyusul" ramai saat tab kembali.
- A11y: tombol play/mute eksplisit; tanpa autoplay; `prefers-reduced-motion` → kurangi amplitudo visual, pertahankan audio bila user sudah memilih menyalakan.
- Dukungan = dukungan Web Audio (lihat `../web-audio/web/bcd-support.md`); `latencyHint` diabaikan Firefox.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-tonejs/README.md` — start(), Transport, instruments, Player/Sampler, effects.
- `repo-tonejs/CHANGELOG.md` — perubahan 15.1.22 → 15.5.64.
- `repo-tonejs/Tone/core/context/Context.ts` — defaults lookAhead/latencyHint, `now()` vs `immediate()`.
- `repo-tonejs/Tone/core/util/Draw.ts` — anticipation/expiration Draw.
- `repo-tonejs/Tone/core/clock/Transport.ts` — bpm/swing/ppq/progress/loop.
- `repo-tonejs/Tone/component/analysis/Meter.ts` — algoritma RMS peak-hold.
- `repo-tonejs/Tone/event/ToneEvent.ts` — probability, humanize, playbackRate.
- `repo-tonejs/examples/animationSync.html` — contoh resmi sinkron animasi.
- `repo-tonejs-wiki/Performance.md` — lookAhead, latencyHint, Syncing Visuals.
- `repo-tonejs-wiki/Accurate-Timing.md` — selalu teruskan `time`.
- `repo-tonejs-wiki/Events.md` — Event/Loop/Part/Sequence/Pattern, probability, humanize.
- `web/_index.md` — indeks 84 halaman API 15.1.22 (classes Synth…Waveform, functions getTransport/getDraw/start).
- `web/next-15.5.62__interfaces__TransportInstance.md` — semua member Transport (cancel, scheduleRepeat, progress, setTicksAtTime…).
