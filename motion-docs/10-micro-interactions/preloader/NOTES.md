---
tool: Choreographed preloader (counter 0–100% + curtain split + staggered hero reveal) — pola, bukan library
version: pola; rujukan kanonik: Codrops "RapidLayersAnimation" (repo codrops/RapidLayersAnimation @ ea8afca — splash/page transition berlapis), Codrops "IntroGridMotionTransition" (2024, @ 07ec398), Codrops "7 Must-Know GSAP Animation Tips" (2025-09-03, SplitText mask), Codrops "Making Stagger Reveal Animations for Text" (2020-06-17) + MDN (img.decode, FontFaceSet, Streams, load/readyState)
official: https://github.com/codrops/RapidLayersAnimation · https://github.com/codrops/IntroGridMotionTransition · https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/
local: repo-codrops-RapidLayersAnimation/src/js/revealer.js · repo-codrops-IntroGridMotionTransition/js/{index,smoothscroll}.js · web/codrops-2025-09-gsap-tips-splittext-mask.md · web/codrops-2020-06-stagger-reveal-text.md · web/mdn-extra/
fetched: 2026-10-28
---
# Preloader terkoreografi — angka yang jujur pada progres aset, lalu tirai membelah dan hero masuk berirama

## Kapan pakai / kapan jangan
- **Pakai** saat halaman pertama memang menunggu aset berat (hero video, WebGL texture, font display besar) — preloader
  mengubah waktu tunggu jadi bagian cerita (ritme). Sekali per sesi (`sessionStorage`) atau hanya first visit.
- **Jangan** sebagai hiasan pada halaman yang sebenarnya siap < 300 ms (preloader palsu = memperlambat LCP & merusak
  kepercayaan), di navigasi internal (pakai page transition), atau tanpa batas waktu maksimum.
- Konten harus tetap ada di HTML (SEO/LCP); preloader hanya overlay yang dilepas.

## Mental model (tiga fase, satu timeline)
1. **Progres nyata**: `p = Σ wᵢ·pᵢ / Σ wᵢ` dari aset kritis — gambar (`img.decode()` resolve saat sudah ter-decode →
   tidak ada jank decode di frame pertama hero), font (`document.fonts.load('700 1em Display')` / `document.fonts.ready`),
   video (`canplaythrough`), file besar via `fetch` + `ReadableStream` reader (byte terbaca / `Content-Length`), texture
   WebGL (LoadingManager/`useProgress` — pola Lunardi infinite canvas: simpan `maxProgress` agar angka tak pernah turun).
2. **Angka yang ditampilkan ≠ progres mentah**: `shown` mengejar `min(p, elapsed / MIN_MS)` dengan damping
   `1 - e^(-r·dt)`, monoton naik, ditahan di 99 sampai semua resolve; batas atas waktu `MAX_MS` → lanjut walau belum 100.
3. **Exit** = timeline: 100 → hold 150–250 ms → counter keluar (mask) → **tirai belah** (dua panel ke arah berlawanan,
   0.9–1.2 s `power4.inOut`/`expo.inOut`) → **hero reveal** dimulai saat tirai ±60% (overlap negatif), stagger baris
   0.06–0.1 s `expo.out`. Layout/scroll di-unlock di bawah tirai (Lenis `start()`), bukan setelahnya.
Pola Codrops yang dipakai:
- **RapidLayersAnimation** (`revealer.js`): N panel gambar masuk berurutan `y:0`, `duration 1`, `Power2.easeInOut`,
  jeda **0.15 s** per panel; label `'halfway'` = `0.15·(N-1) + 1`; di halfway: sembunyikan panel selain terakhir +
  ganti layout (lepas class `intro`) **di balik layer**; panel terakhir keluar dengan wrapper `y:'-101%'` dan gambar di
  dalamnya `y:'101%'` (**counter-translate** → gambar tampak diam, maskernya yang menyapu), `Expo.easeInOut`; item grid
  masuk dari `y` acak 100–500 px, `duration 2`, `Expo.easeOut`, mulai di `'halfway'`.
- **IntroGridMotionTransition**: lerp per baris berdasar jarak dari baris tengah `amt = max(0.1 - dist·0.03, 0.05)` →
  baris luar tertinggal (gelombang); kontras/brightness dipetakan kuadratik dari posisi mouse; Lenis `lerp 0.15` di
  `gsap.ticker` + `lagSmoothing(0)`; `Flip` untuk gambar tengah → fullscreen.
- **SplitText (Codrops 2025)**: `mask: 'lines'` (+ split chars) → wrapper hanya per baris (mask per char = 2 div per
  huruf); stagger object `{ each, from: 'start'|'center'|'end'|'edges'|'random' }`. Split **setelah font siap**.

## Setup minimal (framework-agnostic; animasi exit pakai WAAPI/GSAP sesuka hati)
```js
const MIN_MS = 1400, MAX_MS = 8000, t0 = performance.now()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const tasks = [], promises = []                                    // tasks: { w, p }
function track(w, run) {                                           // run(task) → Promise; boleh update task.p sendiri
  const t = { w, p: 0 }; tasks.push(t)
  promises.push(Promise.resolve().then(() => run(t)).finally(() => (t.p = 1)))   // gagal tetap "selesai" (jangan macet)
}
document.querySelectorAll('img[data-critical]').forEach((img) => track(3, () => img.decode()))
track(2, () => document.fonts.load('700 1em "Display"'))
const video = document.querySelector('video[data-critical]')
if (video) track(4, () => new Promise((r) => video.readyState >= 4 ? r() : video.addEventListener('canplaythrough', r, { once: true })))
track(5, async (t) => {                                            // byte-accurate (butuh Content-Length)
  const res = await fetch('/hero.glb'); const total = +res.headers.get('Content-Length') || 0
  const reader = res.body.getReader(); let got = 0; const chunks = []
  for (;;) { const { done, value } = await reader.read(); if (done) break
    chunks.push(value); got += value.length; if (total) t.p = got / total }
  return new Blob(chunks)
})
const raw = () => tasks.reduce((s, t) => s + t.w * t.p, 0) / (tasks.reduce((s, t) => s + t.w, 0) || 1)
let shown = 0, last = 0, done = false
Promise.race([Promise.allSettled(promises), sleep(MAX_MS)]).then(() => (done = true))
const counter = document.querySelector('[data-counter]')            // CSS: font-variant-numeric: tabular-nums
function tick(t) {
  const dt = Math.min((t - (last || t)) / 1000, 1 / 30) || 1 / 60; last = t
  const elapsed = t - t0
  const target = Math.min(done ? 1 : Math.min(raw(), 0.99), elapsed / MIN_MS)   // tak boleh mendahului waktu minimum
  shown += (target - shown) * (1 - Math.exp(-5 * dt)); shown = Math.max(shown, 0)
  counter.textContent = String(Math.round(shown * 100)).padStart(2, '0')
  if (done && shown > 0.995) return exit()                          // timeline curtain + hero
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)
```
Catatan: `img.decode()` reject bila gambar rusak/di-abort → pakai `allSettled`, bukan `all`. Saat `MAX_MS` lewat,
`done` jadi true walau aset belum lengkap → counter tetap merayap ke 100 lalu exit.

## Knob yang menentukan rasa gerak
| Knob | Efek | Nilai bagus |
|---|---|---|
| `MIN_MS` | ritme minimum (angka sempat "dibaca") | 1200–1800 ms first visit; 0 untuk repeat visit |
| `MAX_MS` | jaminan tidak macet | 6–8 s, lalu lanjut dengan konten parsial |
| rate damping counter | angka "berat" vs "gugup" | 4–6/s; terlalu tinggi = lompat-lompat mengikuti tiap aset |
| hold di 100 | jeda napas sebelum aksi | 150–250 ms |
| tirai: durasi/ease | karakter transisi | 0.9–1.2 s `power4.inOut` / `expo.inOut` (Codrops: panel 1 s, stagger 0.15 s) |
| overlap hero | kontinuitas | mulai di 55–65% tirai (`"-=0.45"`) |
| stagger hero | ritme baca | baris 0.06–0.1 s; char 0.015–0.03 s; `from:'center'` untuk judul simetris |
| `font-variant-numeric: tabular-nums` | angka tidak goyang lebar | wajib untuk counter |

## Integrasi
- **Lenis**: `lenis.stop()` selama preloader (+ `history.scrollRestoration = 'manual'`, `scrollTo(0,{immediate:true,
  force:true})`), `lenis.start()` saat tirai mulai membuka.
- **GSAP**: satu timeline: `tl.to(counterLines, {yPercent:-100, stagger:.04, ease:'power3.in', duration:.5})
  .to('.curtain--top', {yPercent:-100, ease:'power4.inOut', duration:1.1}, '+=.15')
  .to('.curtain--bottom', {yPercent:100, ease:'power4.inOut', duration:1.1}, '<')
  .from(split.lines, {yPercent:100, stagger:.08, ease:'expo.out', duration:1.2}, '-=.45')
  .from('.hero img', {scale:1.2, ease:'expo.out', duration:1.6}, '<')` [API GSAP: `../../03-choreography/gsap/`].
- **Barba/swup**: preloader = transisi `once` (Barba `once` hook / swup hanya initial load); navigasi berikutnya pakai
  page transition yang lebih pendek (curtain tanpa counter).
- **R3F/WebGL**: progres dari texture manager; jangan buka tirai sebelum frame pertama render (`requestAnimationFrame`
  ganda setelah ready).
- **View Transitions**: untuk MPA, tirai bisa dibuat dengan `::view-transition-old(root)` + `pagereveal`, tapi
  counter tetap butuh JS.

## Resep non-generik
1. **Counter tak pernah bohong & tak pernah tergesa** (setup di atas): `target = min(realProgress, elapsed/MIN)`,
   damping 5/s, cap 99 sampai selesai. Kenapa mahal: angka bergerak dengan ritme konstan tapi berhenti/merayap jujur
   saat jaringan lambat — terasa "hidup", bukan animasi kalengan.
2. **Counter digit-roll**: tiap digit = kolom `0–9` dalam mask (`overflow:clip`, tinggi 1em), set
   `translateY(-${d * 10}%)` dengan transition `0.6s cubic-bezier(.2,.8,.2,1)`; digit puluhan berubah lebih jarang →
   gerak berlapis alami. Kenapa mahal: odometer mekanis, bukan teks yang berganti.
3. **Tirai split dengan counter-translate mask (RapidLayers)**: wrapper `y:-101%` + gambar/teks di dalamnya `y:+101%`
   bersamaan → isi tampak diam sementara jendela menyapu. Kenapa mahal: kesan kamera diam, panel kaca bergerak.
4. **Layout swap di balik tirai**: ganti class layout/scroll reset/inisialisasi ScrollTrigger tepat di label `halfway`
   (layar tertutup) → saat tirai terbuka semuanya sudah final, tak ada lompatan.
5. **Grid burst sebagai reveal** (Codrops 2025 infinite grid intro): item terlihat di-`set` ke pusat layar lalu
   `to({x:0, y:0}, {duration:2, ease:'expo.inOut', stagger:.05})` → "ledakan" dari satu titik ke layout.
6. **Repeat visit**: `sessionStorage.getItem('seen')` → MIN_MS 0, counter disembunyikan, hanya fade 300 ms.

## Performa, aksesibilitas, mobile & browser
- Jangan tahan render HTML (preloader = overlay `position:fixed`, konten tetap di DOM) → LCP tetap dihitung dari hero.
- `aria-live="polite"` hanya untuk status singkat ("Loading 40%"), atau `aria-hidden` pada counter + `aria-busy` di main;
  pindahkan fokus ke `h1` setelah reveal.
- `prefers-reduced-motion`: skip counter & tirai → crossfade 200 ms; MIN_MS 0.
- Mobile: hindari menunggu video besar (sering tidak autoplay sebelum interaksi) → gunakan poster sebagai aset kritis.
- `Content-Length` tidak tersedia untuk respons terkompresi/chunked → fallback ke bobot per-aset (tanpa byte progress).

## Sumber lokal
- `repo-codrops-RapidLayersAnimation/src/js/revealer.js` — timeline panel berlapis, label halfway, counter-translate.
- `repo-codrops-RapidLayersAnimation/src/css/base.css` — struktur `.layers__item`, `.layers__item-img`.
- `repo-codrops-IntroGridMotionTransition/js/index.js` — lerp per baris, mapping kuadratik, Flip ke fullview.
- `repo-codrops-IntroGridMotionTransition/js/smoothscroll.js` — Lenis lerp 0.15 + gsap.ticker.
- `web/codrops-2025-09-gsap-tips-splittext-mask.md` — SplitText mask lines/chars, stagger `from`.
- `web/codrops-2020-06-stagger-reveal-text.md` — reveal teks bertahap (overflow hidden).
- `web/mdn-extra/api_htmlimageelement_decode.md`, `api_fontfaceset_{ready,load}.md`, `api_document_fonts.md`,
  `api_streams_api_using_readable_streams.md`, `api_htmlmediaelement_canplaythrough_event.md`,
  `api_window_load_event.md`, `api_document_readystate.md`, `api_performanceresourcetiming.md`.
- `../infinite-canvas/repo-JorgeCapillo-infinite-layers-grid/src/js/components/infinite-grid.js` — intro grid burst.
- `../infinite-canvas/repo-edoardolunardi-infinite-canvas/src/loader/index.tsx` — loader progres texture (R3F).
