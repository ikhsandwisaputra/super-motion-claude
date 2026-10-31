---
tool: Web Speech API (SpeechRecognition + SpeechSynthesis)
version: "W3C CG spec. BCD 2026-10-28: SpeechRecognition unprefixed Chrome 139 (prefix webkit sejak 33), Safari 14.1 prefix webkit, Firefox hanya 'preview'; processLocally / available() / install() Chrome 139 desktop (Android TIDAK); phrases (contextual biasing) Chrome 142; SpeechSynthesis Chrome 33 / Firefox 49 / Safari 7 / Edge 14; event boundary Chrome 'partial' (bug)"
official: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
local: ../../_shared/mdn-content/files/en-us/web/api/web_speech_api/ (index + using guide) + web/ (SpeechRecognition on-device, phrases, synthesis, events, BCD)
fetched: 2026-10-28
---
# Web Speech — suara sebagai input (perintah) dan output (narasi tersinkron tipografi)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk: perintah suara pendek di instalasi/pengalaman sensorik ("next", "lebih gelap"), dikte, kinetic typography yang mengikuti kata yang diucapkan (TTS `boundary`), alternatif input aksesibilitas.
- **ml5 soundClassifier** (`../ml5/`): keyword spotting kosakata tetap (SpeechCommands18w) on-device lintas browser (TF.js) — pilih bila kata sedikit & Firefox/offline penting.
- **Jangan** andalkan recognition sebagai satu-satunya input: Firefox belum rilis, Safari prefixed, default-nya **mengirim audio ke server** (MDN), butuh izin mic. Jangan untuk kosakata kritikal tanpa konfirmasi visual.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Recognition default = engine **server** (audio dikirim ke layanan web; tidak jalan offline — MDN guide). On-device: set `recognition.processLocally = true` sebelum `start()`; butuh language pack: `SpeechRecognition.available({ langs, processLocally: true, quality? })` → `"available" | "downloadable" | "downloading" | "unavailable"`; `SpeechRecognition.install({ langs, quality? })` → `true/false`. `quality`: `"command"` (default, frasa pendek) | `"dictation"` | `"conversation"`. Akses diatur Permissions-Policy `on-device-speech-recognition` (default `self`).
- Contextual biasing (Chrome 142): `recognition.phrases = [new SpeechRecognitionPhrase("azure", 5.0)]` — dorong kata khusus (nama brand, istilah). Error `phrases-not-supported` bila engine tak mendukung.
- Urutan event: `start → audiostart → soundstart → speechstart → result* → speechend → soundend → audioend → end`; plus `nomatch`, `error` (`event.error`: `no-speech`, `aborted`, `audio-capture`, `network`, `not-allowed`, `service-not-allowed`, `language-not-supported`, `phrases-not-supported`).
- `interimResults = true` → hasil sementara cepat (untuk feedback visual), `results[i].isFinal` untuk aksi. `continuous`: Chrome Android bisa di-set tapi **tanpa efek**; Safari mengembalikan beberapa hasil walau `false` (catatan BCD).
- `SpeechGrammarList` deprecated — gunakan `phrases` untuk biasing.
- Butuh dilayani lewat web server (bukan `file://`) — catatan BCD Chrome; mic memicu prompt izin.
- Synthesis: `speechSynthesis.speak(new SpeechSynthesisUtterance(text))`; `rate` 0.1–10 (1 = normal), `pitch` 0–2 (1 = normal; engine bisa membatasi). Daftar suara dimuat async → `voiceschanged` (Safari 16+). Event `boundary` (`SpeechSynthesisEvent`: `charIndex`, `charLength`, `elapsedTime`, `name`) = jam untuk menyinkronkan visual per kata — **Chrome partial** (bug crbug 40715888).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```js
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;     // Safari & Chrome lama: prefixed
export function createRecognizer({ lang = "id-ID", onCommand, onState }) {
  if (!SR) return null;                                                       // Firefox: sediakan UI non-suara
  const r = new SR();
  r.lang = lang; r.interimResults = true; r.continuous = false; r.maxAlternatives = 3;
  r.addEventListener("speechstart", () => onState("hearing"));
  r.addEventListener("speechend", () => onState("thinking"));
  r.addEventListener("end", () => onState("idle"));
  r.addEventListener("error", (e) => onState(e.error === "not-allowed" ? "blocked" : "idle"));
  r.addEventListener("result", (e) => {
    const res = e.results[e.results.length - 1];
    onCommand(res[0].transcript.trim().toLowerCase(), res.isFinal, res[0].confidence);
  });
  return r;
}
// mulai dari tombol (izin mic): micBtn.onclick = () => rec.start();   stop: rec.stop() (proses sisa) / rec.abort() (buang)
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Efek | Default | Saran |
|---|---|---|---|
| `interimResults` | latency persepsi | false | true → visual bereaksi saat user masih bicara |
| `continuous` | sesi panjang vs sekali ucap | false | false untuk perintah; restart manual di `end` bila perlu |
| `maxAlternatives` | toleransi salah dengar | 1 | 3 + cocokkan ke daftar perintah |
| `processLocally` | privasi & offline vs dukungan | false | true bila `available()` = "available" |
| `phrases` boost | akurasi istilah khusus | — | boost 2–5 untuk 3–10 kata kunci (contoh MDN memakai 2.0–5.0) |
| `quality` (available/install) | ukuran model vs kemampuan | "command" | "command" untuk perintah suara |
| TTS `rate` | energi narasi | 1 | 0.9–1.15 untuk UI; ekstrem untuk efek kreatif |
| TTS `pitch` | karakter | 1 | 0.8–1.2 |
| debounce perintah | anti ganda | — | abaikan perintah sama < 800 ms (heuristik) |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **State → koreografi**: `onState` memetakan `idle/hearing/thinking/blocked` ke timeline GSAP/Motion (orb mic bernapas → berdenyut → memproses). Event recognition adalah sumber kebenaran, bukan timer.
- **Interim → tipografi**: tampilkan transcript sementara dengan opacity rendah + caret, final → "mengeras" (weight variable font naik) — lihat kategori kinetic typography.
- **TTS + Web Audio**: interface SpeechSynthesis di MDN tidak menyediakan node/stream untuk dirutekan ke AudioContext → efek audio/analyser pada suara TTS tidak tersedia lewat API ini; sinkron visual pakai `boundary`/`start`/`end`.
- **Barba/Swup**: `rec.abort()` dan `speechSynthesis.cancel()` di hook leave.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Command palette suara: bereaksi di interim, eksekusi di final**
```js
const COMMANDS = { "berikutnya": next, "sebelumnya": prev, "gelap": () => setTheme("dark") };
let lastCmd = "", lastAt = 0;
const rec = createRecognizer({
  onState: (s) => orb.dataset.state = s,                                     // CSS anim per state
  onCommand: (text, isFinal) => {
    const key = Object.keys(COMMANDS).find((k) => text.includes(k));
    preview.textContent = text;                                              // interim terlihat "mendengar"
    if (key) highlight(key);                                                 // feedback sebelum final
    if (isFinal && key && (key !== lastCmd || performance.now() - lastAt > 800)) {
      lastCmd = key; lastAt = performance.now(); COMMANDS[key]();
    }
  },
});
```
Kenapa mahal: UI menyorot perintah saat kata masih diucapkan — terasa dipahami, bukan menunggu jeda server.

**2. On-device dulu, cloud hanya dengan persetujuan**
```js
async function startPrivate(rec, lang = "en-US") {
  if (!("available" in SR)) return askCloudConsent(rec);                    // Safari/Chrome lama
  const status = await SR.available({ langs: [lang], processLocally: true });
  if (status === "available") { rec.processLocally = true; return rec.start(); }
  if (status === "unavailable") return askCloudConsent(rec);
  showToast("Mengunduh paket bahasa…");                                     // "downloadable" | "downloading"
  if (await SR.install({ langs: [lang] })) { rec.processLocally = true; rec.start(); } else askCloudConsent(rec);
}
```
Kenapa mahal: suara user tidak meninggalkan perangkat secara default — privasi sebagai fitur yang terasa.

**3. Narasi TTS dengan kata yang menyala (boundary) + fallback**
```js
function speakWithHighlight(text, el) {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.02; u.pitch = 1;
  const words = [...text.matchAll(/\S+/g)];
  el.innerHTML = words.map((m, i) => `<span data-i="${i}">${m[0]}</span>`).join(" ");
  let gotBoundary = false;
  u.addEventListener("boundary", (e) => {
    if (e.name !== "word") return; gotBoundary = true;
    const i = words.findIndex((m) => m.index >= e.charIndex);
    el.querySelectorAll("span").forEach((s, j) => s.classList.toggle("on", j === i));
  });
  u.addEventListener("start", () => setTimeout(() => { if (!gotBoundary) estimateByTimer(words, el, u.rate); }, 600));
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
```
Kenapa mahal: teks "dibacakan" secara visual seperti karaoke — kinetic typography yang dikendalikan suara nyata, dengan fallback saat Chrome tidak mengirim boundary.

**4. Pilih suara setelah daftar siap**
```js
function pickVoice(lang = "id-ID") {
  return new Promise((res) => {
    const pick = () => res(speechSynthesis.getVoices().find((v) => v.lang === lang) ?? null);
    const v = speechSynthesis.getVoices();
    v.length ? pick() : speechSynthesis.addEventListener("voiceschanged", pick, { once: true });
  });
}
```
Kenapa mahal: tidak ada suara default robotik yang "keceplosan" di ucapan pertama.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Mic & speech = data sensitif: jelaskan apakah audio diproses lokal (`processLocally`) atau dikirim ke layanan; tombol mic eksplisit; indikator "mendengar" selalu terlihat; `abort()` saat tab hidden.
- Selalu ada padanan non-suara (tombol/keyboard) — speech adalah enhancement. TTS jangan autoplay; panggil dari gesture (kebijakan aktivasi untuk `speak()` di Chrome: [UNVERIFIED lokal]).
- `prefers-reduced-motion` → animasi orb/karaoke dikurangi ke perubahan warna/opacity.
- Dukungan: Chrome/Edge desktop paling lengkap (on-device + phrases); Chrome Android: recognition ya, on-device tidak, `continuous` tanpa efek; Safari: prefixed `webkitSpeechRecognition`; Firefox: hanya synthesis.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `../../_shared/mdn-content/files/en-us/web/api/web_speech_api/index.md` — interface, deprecated grammar, Permissions-Policy.
- `../../_shared/mdn-content/files/en-us/web/api/web_speech_api/using_the_web_speech_api/index.md` — color changer, on-device, contextual biasing, speech synthesizer.
- `web/mdn__speechrecognition.md` — properti & event lengkap.
- `web/mdn__speechrecognition__available_static.md` / `web/mdn__speechrecognition__install_static.md` — paket bahasa on-device, quality level.
- `web/mdn__speechrecognition__processlocally.md` / `web/mdn__speechrecognition__phrases.md` / `web/mdn__speechrecognitionphrase.md` — on-device & biasing.
- `web/mdn__speechrecognitionerrorevent__error.md` — daftar kode error.
- `web/mdn__speechsynthesisutterance__rate.md` / `…__pitch.md` / `…__boundary_event.md` — rentang & event kata.
- `web/mdn__speechsynthesisevent.md` — `charIndex`, `charLength`, `elapsedTime`, `name`.
- `web/bcd-support.md` — dukungan per browser + catatan (continuous Android, Safari multiple results, boundary Chrome).
