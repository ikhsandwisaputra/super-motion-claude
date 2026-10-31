---
tool: Web Audio API (native browser API)
version: "Living standard (W3C Web Audio API). Support dicek via mdn/browser-compat-data 2026-10-28: AudioContext unprefixed Chrome 35 / Firefox 25 / Safari 14.1; latencyHint Chrome 58 / Safari 14.1 / Firefox TIDAK; outputLatency Chrome 102 / Firefox 70 / Safari 18.4; cancelAndHoldAtTime Firefox TIDAK"
official: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API (spec https://webaudio.github.io/web-audio-api/)
local: ../../_shared/mdn-content/files/en-us/web/api/web_audio_api/ (+ web/ untuk Autoplay guide, AudioSession, user activation, BCD)
fetched: 2026-10-28
---
# Web Audio API — mesin suara native untuk micro-sound UI & visual yang "mendengar"

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai native** kalau butuh: (a) micro-sound UI pendek dengan variasi per trigger (AudioBuffer + `AudioBufferSourceNode`), (b) audio-reactive visual (`AnalyserNode`), (c) synth suara tanpa aset (Oscillator / noise + envelope di `AudioParam`). 0 KB bundle, kontrol penuh.
- **Howler** (`../howler/`) kalau cuma butuh sprite + fallback HTML5 + auto-unlock mobile. Rilis terakhir 2.2.4 (2023-09) — stabil tapi tidak berkembang.
- **Tone.js** (`../tonejs/`) kalau butuh BPM/Transport/swing/synth/efek + sinkron visual `getDraw()`.
- **Jangan** decode file musik panjang ke AudioBuffer (RAM besar + harus download penuh dulu) → pakai `<audio>` + `ctx.createMediaElementSource(el)` (streaming; MDN best practices).
- **Jangan** satu AudioContext per suara. Satu context global + master `GainNode`.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Graph diproses di audio rendering thread; JS hanya *menjadwal*. Jam = `ctx.currentTime` (detik, jam audio). Jadwal pakai waktu absolut = sample-accurate; callback JS (setTimeout/rAF) selalu jitter.
- `AudioParam` = timeline otomasi. Method (`setValueAtTime`, `linearRampToValueAtTime`, `setTargetAtTime`, …) **mengalahkan** set `.value` langsung (MDN best_practices) → untuk perubahan saat audio jalan selalu pakai method, bukan `.value` (sumber klik/zipper noise).
- `setTargetAtTime(target, startTime, timeConstant)`: pendekatan eksponensial, tiap τ menutup 63.2% sisa jarak; 3τ ≈ 95%, 5τ ≈ 99.3% (tabel MDN). Jadi "durasi terasa" ≈ 3τ. `exponentialRampToValueAtTime` **tidak bisa** dari/ke 0 → untuk fade-out ke senyap pakai `setTargetAtTime(0, t, τ)`.
- `AudioBufferSourceNode` hanya bisa `start()` sekali — bikin node baru tiap play, "very inexpensive" (MDN). `playbackRate` (k-rate) mengubah pitch **dan** durasi; `detune` dalam cents (±100 = 1 semitone).
- `AnalyserNode`: `fftSize` power of 2 dari 32 s/d 32768, default 2048; `frequencyBinCount = fftSize/2`; bin **linear** 0…Nyquist → lebar bin = `sampleRate/fftSize` (48 kHz/2048 ≈ 23.4 Hz). Jendela = `fftSize/sampleRate` (2048 @48 kHz ≈ 42.7 ms): FFT besar = detail frekuensi tapi transien "blur"/lambat (MDN: lebih detail di frekuensi, kurang di amplitudo).
- `smoothingTimeConstant` default 0.8 (0–1, di luar range = exception). Smoothing diterapkan **antar panggilan** `get*FrequencyData` (MDN) → rasanya ikut frame rate (60 vs 120 Hz beda). Untuk feel konsisten: set 0 lalu bikin envelope sendiri berbasis `dt`.
- `minDecibels` default −100, `maxDecibels` default −30. `getByteFrequencyData` memetakan [min,max] dB → 0…255 (≤min → 0, ≥max → 255). `getFloatFrequencyData` = dB mentah (bin senyap = `-Infinity`).
- **Autoplay**: context dibuat di luar gesture → `state === "suspended"`; `resume()` dari gesture. MDN "User activation": autoplay AudioContext digate **sticky activation**; event pemicu aktivasi hanya `keydown` (bukan Esc dll), `mousedown`, `pointerdown` (hanya pointerType mouse), `pointerup` (non-mouse), `touchend`. **Scroll/wheel/pointermove TIDAK membuka audio** → sound design berbasis scroll wajib punya tombol "sound on".
- `navigator.getAutoplayPolicy("audiocontext")` hanya Firefox 112+ (BCD) → jangan diandalkan; cukup cek `ctx.state`.
- `latencyHint`: `"interactive"` (default, latency terendah tanpa glitch), `"balanced"`, `"playback"`, atau angka detik. Firefox mengabaikan opsi ini (BCD). Latency nyata: `ctx.baseLatency` + `ctx.outputLatency` (buffer → speaker; tergantung hardware, Bluetooth besar). Konsekuensi: visual dari Analyser **mendahului** suara yang terdengar sebesar `outputLatency`.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
// audio.js — satu context, master gain, unlock di gesture pertama, mute persisten
export const ctx = new AudioContext({ latencyHint: "interactive" });
export const master = new GainNode(ctx, { gain: 0.8 });
master.connect(ctx.destination);

let muted = localStorage.getItem("sfx-muted") === "1";
master.gain.value = muted ? 0 : 0.8;                    // sebelum ada otomasi: aman set .value
export function setMuted(m) {                           // dipanggil dari <button aria-pressed>
  muted = m; localStorage.setItem("sfx-muted", m ? "1" : "0");
  master.gain.setTargetAtTime(m ? 0 : 0.8, ctx.currentTime, 0.02);   // fade 60 ms, tanpa klik
}
export const isMuted = () => muted;

const unlock = () => { if (ctx.state !== "running") ctx.resume(); };
for (const type of ["pointerup", "keydown", "touchend", "mousedown"])
  addEventListener(type, unlock, { capture: true, passive: true });

export async function loadBuffer(url) {
  const res = await fetch(url);
  return ctx.decodeAudioData(await res.arrayBuffer());
}
// Cleanup (unmount / route change Barba/Swup bila context per halaman): await ctx.close();
// Hemat baterai saat idle: await ctx.suspend(); lalu resume() saat dibutuhkan.
```
iOS/Safari 16.4+: `if ("audioSession" in navigator) navigator.audioSession.type = "ambient";` → UI sound boleh **mix** dengan musik user (MDN AudioSession.type: "ambient … can mix with other types of audio"); `"transient"` = seperti notifikasi (men-duck audio lain). Pengaruh ke tombol silent iPhone: [UNVERIFIED].

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek ke feel | Default | Rentang bagus |
|---|---|---|---|
| jitter `playbackRate` per trigger | hilangkan "machine-gun" (klik identik terdengar sintetis) | 1 | 1 ± 0.03–0.06 (heuristik) |
| jitter gain per trigger | variasi tekanan jari | — | ±1–2 dB (heuristik) |
| level UI sfx | "ada tapi tidak mengganggu" | — | ~−20…−12 dBFS puncak, di bawah konten (heuristik) |
| attack gain | anti-klik di onset | — | 2–5 ms ramp linear |
| release `setTargetAtTime` τ | ekor "kering" vs "beresonansi" | — | 15–60 ms (UI), 100–300 ms (ambience) |
| throttle per nama suara | cegah tumpukan saat hover cepat/scroll | — | 30–60 ms antar trigger sama + cap 4–8 voice (heuristik) |
| `fftSize` | respons vs detail | 2048 | 512–1024 band reaktif; 2048–4096 spektrum detail |
| `smoothingTimeConstant` | lembek vs gelisah | 0.8 | 0 + envelope sendiri, atau 0.6–0.85 |
| `minDecibels`/`maxDecibels` | rentang dinamis visual byte | −100/−30 | −90/−10 (contoh MDN) |
| envelope attack/release (visual) | "punch" vs "breath" | — | attack 10–30 ms, release 150–400 ms (heuristik) |
| beat refractory | cegah double-trigger | — | 250–350 ms (≤ ~200–240 BPM) (heuristik) |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **GSAP**: baca analyser di `gsap.ticker.add((time, deltaTime) => …)` (satu loop untuk semua) lalu tulis ke `gsap.quickSetter(el, "css")`/uniform. Jangan jalankan rAF terpisah per komponen.
- **R3F**: `useFrame((_, delta) => { an.getFloatFrequencyData(buf); mesh.scale.setScalar(1 + env * 0.25); })` — alokasi `Float32Array` sekali di luar loop.
- **Lenis / scroll**: map kecepatan scroll ke cutoff filter / gain ambience lewat `setTargetAtTime` (resep 5). Ingat: scroll bukan user activation → butuh toggle "sound on" dulu.
- **Barba/Swup**: jangan `close()` context di transisi halaman SPA-like; cukup fade `master` (τ 0.05) lalu play whoosh transisi di `ctx.currentTime`.
- **Tone.js/Howler bersama**: pakai satu context — Tone: `Tone.setContext(ctx)` (wiki AudioContext); Howler expose `Howler.ctx` & `Howler.masterGain`.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. UI tick dengan variasi + throttle + voice cap**
```js
import { ctx, master, loadBuffer, isMuted } from "./audio.js";
const sfx = { tick: await loadBuffer("/sfx/tick.webm") };
const last = new Map(); let voices = 0;
export function play(name, { db = -16, rateJitter = 0.04, minGapMs = 45, maxVoices = 6 } = {}) {
  if (isMuted() || ctx.state !== "running") return;
  const now = performance.now();
  if (now - (last.get(name) ?? -1e9) < minGapMs || voices >= maxVoices) return;
  last.set(name, now);
  const src = new AudioBufferSourceNode(ctx, { buffer: sfx[name], playbackRate: 1 + (Math.random() * 2 - 1) * rateJitter });
  const g = new GainNode(ctx, { gain: 10 ** ((db + (Math.random() * 2 - 1)) / 20) });
  src.connect(g); g.connect(master);
  voices++; src.onended = () => { voices--; g.disconnect(); };
  src.start();
}
```
Kenapa mahal: tiap klik terdengar sedikit berbeda seperti benda fisik, dan tidak pernah menumpuk jadi noise saat diulang cepat.

**2. "Thock" sintetis tanpa aset, reaktif ke kecepatan**
```js
export function thock(velocity = 0.5) {            // 0..1 dari kecepatan pointer/drag
  const t = ctx.currentTime;
  const osc = new OscillatorNode(ctx, { type: "sine", frequency: 180 + 120 * velocity });
  osc.frequency.setTargetAtTime(70, t, 0.03);       // pitch drop cepat = kesan massa
  const g = new GainNode(ctx, { gain: 0 });
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.25 + 0.3 * velocity, t + 0.004); // attack 4 ms
  g.gain.setTargetAtTime(0, t + 0.004, 0.035);      // τ 35 ms ≈ 100 ms terdengar
  osc.connect(g); g.connect(master);
  osc.start(t); osc.stop(t + 0.3);
}
```
Kenapa mahal: suara ikut "berat" gestur user (lempar kencang = lebih tinggi & keras) — fisika audio, bukan sample statis.

**3. Band log-spaced + envelope attack/release independen frame-rate → CSS var / uniform**
```js
const an = ctx.createAnalyser();
an.fftSize = 2048; an.smoothingTimeConstant = 0; an.maxDecibels = -20; an.minDecibels = -100;
source.connect(an);                                   // MediaElementSource / mic / tap dari master
const db = new Float32Array(an.frequencyBinCount), binHz = ctx.sampleRate / an.fftSize;
const N = 8, edges = Array.from({ length: N + 1 }, (_, i) => 30 * (16000 / 30) ** (i / N)); // 30 Hz–16 kHz
const env = new Float32Array(N); let lastT = performance.now();
function frame(t) {
  const dt = Math.min(0.1, (t - lastT) / 1000); lastT = t;
  an.getFloatFrequencyData(db);
  for (let b = 0; b < N; b++) {
    const lo = Math.max(1, Math.floor(edges[b] / binHz)), hi = Math.max(lo + 1, Math.ceil(edges[b + 1] / binHz));
    let p = 0; for (let i = lo; i < hi; i++) p += 10 ** (db[i] / 10);          // dB → power, rata-rata energi
    const level = Math.min(1, Math.max(0, (10 * Math.log10(p / (hi - lo) + 1e-12) + 90) / 70));
    const tau = level > env[b] ? 0.015 : 0.25;                                  // attack 15 ms / release 250 ms
    env[b] += (level - env[b]) * (1 - Math.exp(-dt / tau));
    stage.style.setProperty(`--band${b}`, env[b].toFixed(3));                 // set di elemen lokal, bukan :root
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```
Kenapa mahal: band log mengikuti telinga (bass tidak "makan" 1 bar saja), dan envelope naik cepat-turun pelan terasa seperti napas musik, bukan kedip.

**4. Beat detector adaptif + pulse decay**
```js
const hist = new Float32Array(48); let k = 0, lastBeat = -1e9, pulse = 0;   // ~0.8 s @60 fps
export function beat(lowLevel, tMs, dt) {             // lowLevel = level band ~40–150 Hz (nilai mentah resep 3)
  let m = 0; for (const v of hist) m += v; m /= hist.length;
  let s = 0; for (const v of hist) s += (v - m) ** 2; s = Math.sqrt(s / hist.length);
  hist[k++ % hist.length] = lowLevel;
  if (lowLevel > m + 1.5 * s + 0.03 && tMs - lastBeat > 280) { lastBeat = tMs; pulse = 1; }
  pulse *= Math.exp(-dt / 0.12);                       // decay τ 120 ms
  return pulse;                                        // → camera kick, scale punch, chromatic offset
}
```
Kenapa mahal: threshold ikut dinamika lagu (lagu pelan tetap "berdetak"), refractory mencegah double-hit, decay eksponensial terasa seperti pegas yang dilepas.

**5. Kecepatan gestur → lowpass "ruang" tanpa zipper**
```js
const lp = new BiquadFilterNode(ctx, { type: "lowpass", frequency: 400, Q: 0.7 });
ambience.connect(lp); lp.connect(master);
export function onVelocity(v) {                        // v 0..1 (scroll/drag ternormalisasi)
  lp.frequency.setTargetAtTime(400 * 2 ** (v * 5), ctx.currentTime, 0.05); // 400 Hz→12.8 kHz, eksponensial
}
```
Kenapa mahal: dunia terdengar "terbuka" saat bergerak dan "teredam" saat diam — perubahan kontinu tanpa klik karena lewat timeline AudioParam.

**6. Sinkron visual ke suara yang benar-benar terdengar**
```js
// jadwalkan suara di waktu audio T, lalu picu visual saat sample itu keluar speaker
function audioTimeToPerfMs(T) {
  const { contextTime, performanceTime } = ctx.getOutputTimestamp();
  return performanceTime + (T - contextTime) * 1000;
}
const T = ctx.currentTime + 0.05; src.start(T);
const fireAt = audioTimeToPerfMs(T);
const wait = (now) => (now >= fireAt ? flash() : requestAnimationFrame(wait));
requestAnimationFrame(wait);
```
Kenapa mahal: flash/impact jatuh tepat di "dentum" walau user pakai Bluetooth — kebanyakan situs telat/duluan 100+ ms.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Alokasi typed array sekali; satu `getFloatFrequencyData` per frame; jangan bikin node di loop render. Tulis CSS var ke elemen lokal/uniform (set di `:root` memicu style recalc seluruh dokumen).
- Idle → `ctx.suspend()` (Howler melakukan auto-suspend setelah 30 s; tiru polanya). Tab hidden → rAF berhenti, tapi audio tetap jalan: pause sumber sendiri.
- **A11y**: tidak ada media query untuk suara → default OFF atau toggle jelas (`<button aria-pressed>`), simpan preferensi, jangan autoplay (MDN best practices: beri kontrol play/stop/mute). `prefers-reduced-motion: reduce` → kecilkan amplitudo visual audio-reactive (bukan matikan suara).
- Mic untuk visual musik: `getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } })` (constraint ada di MDN; AGC "memompa" level sehingga dinamika visual mati — heuristik). Butuh secure context + izin.
- Mobile: unlock wajib dari `pointerup`/`touchend`/`click` (bukan `pointerdown` sentuh). Safari lama: `webkitAudioContext` < 14.1 (BCD) — abaikan di 2026.
- Firefox: tidak ada `latencyHint` & `cancelAndHoldAtTime` → fallback `param.cancelScheduledValues(t); param.setValueAtTime(param.value, t)`.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `../../_shared/mdn-content/files/en-us/web/api/web_audio_api/best_practices/index.md` — autoplay, user control, AudioParam vs `.value`.
- `../../_shared/mdn-content/files/en-us/web/api/web_audio_api/visualizations_with_web_audio_api/index.md` — pola dasar Analyser + canvas.
- `../../_shared/mdn-content/files/en-us/web/api/web_audio_api/advanced_techniques/index.md` — synth, noise buffer, scheduling (sequencer).
- `../../_shared/mdn-content/files/en-us/web/api/analysernode/` — fftSize, smoothingTimeConstant, min/maxDecibels, getFloat/ByteFrequencyData.
- `../../_shared/mdn-content/files/en-us/web/api/audioparam/settargetattime/index.md` — tabel 63.2%/95%/99.3% per τ.
- `../../_shared/mdn-content/files/en-us/web/api/audiocontext/audiocontext/index.md` — `latencyHint`, `sampleRate`, `sinkId`.
- `../../_shared/mdn-content/files/en-us/web/api/audiocontext/getoutputtimestamp/index.md` — mapping waktu audio ↔ performance.now.
- `../../_shared/mdn-content/files/en-us/web/api/audiobuffersourcenode/` — one-shot, playbackRate, detune (cents), loop.
- `web/mdn__media__guides__autoplay.md` — Autoplay guide (tidak ada di mirror bersama).
- `web/mdn__security__user_activation.md` — event mana yang memberi aktivasi; transient vs sticky.
- `web/mdn__audiosession__type.md` — `navigator.audioSession.type` (ambient/transient/playback).
- `web/bcd-support.md` — tabel dukungan browser hasil ekstrak BCD.
