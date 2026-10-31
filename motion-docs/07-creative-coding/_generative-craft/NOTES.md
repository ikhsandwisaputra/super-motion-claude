---
tool: Generative craft (teknik, bukan library) — esai kanonik Tyler Hobbs + Inigo Quilez, plus simplex-noise.js
version: simplex-noise 4.0.3 (npm `latest`, rilis 2024-07-26; repo @6bfff87) · esai Hobbs 2014–2021 (+ deep dive Fidenza/QQL) · artikel IQ warp/fbm/palettes — diambil 2026-10-28
official: https://www.tylerxhobbs.com/words · https://iquilezles.org/articles/ · https://github.com/jwagner/simplex-noise.js
local: web/tylerxhobbs/ (15 esai) · web/iquilezles/{warp,fbm,palettes}.md · repo-simplex-noise/{README.md,simplex-noise.ts,examples/plasma.js}
fetched: 2026-10-28
---
# Generative craft — noise yang tidak terlihat "noise", flow field, palet, distribusi, seed & komposisi

## Kapan pakai / kapan jangan
- Pakai catatan ini saat **mendesain** visual generatif (background hero, flow field, tekstur, partikel reaktif) —
  apa pun renderernya (p5, Canvas2D, OGL/three shader, Pts). Rumusnya portable ke GLSL.
- Library noise: `simplex-noise` (2D/3D/4D, ~2 KB gz, tanpa dependensi, seedable via PRNG) bila tidak memakai p5,
  atau butuh **4D** (loop mulus), atau butuh nilai **[-1, 1]** simetris. p5 `noise()` = Perlin [0,1], maks 3D (lihat ../p5js/NOTES.md).
- Jangan pakai Perlin mentah sebagai "desain" — Hobbs sendiri menyarankan bikin distorsi sendiri karena noise polos
  sudah terlalu sering dipakai. Noise adalah bahan, bukan hasil.

## Mental model — karakter gerak berasal dari 6 keputusan, bukan dari fungsi noise-nya
1. **Skala domain** (frekuensi spasial): langkah antar sampel. Hobbs: noise Processing paling enak di langkah ≈0.005 per
   titik grid; contoh p5 memakai 0.002–0.02 per px. Nyatakan ukuran sebagai **persentase lebar** (resolusi grid ≈0.5%
   lebar, step kurva 0.1–0.5% lebar) → komposisi identik di resolusi berapa pun (render ulang besar dengan seed sama).
2. **Skala waktu**: z/w dimensi = waktu; field ikut berubah serentak. Kecil = arus "bernafas"; besar = gelisah.
   Pakai waktu nyata (ms × k), bukan frame.
3. **Oktaf & gain (fBm, IQ)**: tiap oktaf frekuensi ×2, amplitudo ×G; **G = 2^(−H)**. H=1 → G=0.5 (default p5
   `noiseDetail(4, 0.5)`; "favorit grafis", spektrum −9 dB/oktaf, isotropik seperti gunung); H=½ → G≈0.707
   (Brownian, −6 dB/okt, lebih kasar); G=1 → pink noise. Detune lacunarity (2.01, 1.99) agar puncak/nol antar-oktaf tidak sejajar.
4. **Domain warping (IQ)**: `f(p + 4·q)` dengan `q = (fbm(p), fbm(p + (5.2,1.3)))`; lapis kedua
   `r = (fbm(p + 4q + (1.7,9.2)), fbm(p + 4q + (8.3,2.8)))` → `f(p + 4·r)`. Offset konstanta hanya untuk
   mendekorelasi 2 sampel 1D jadi vektor 2D. Hasil: aliran organik, lipatan seperti asap/marmer.
5. **Pemetaan ke gerak**: noise → sudut (`n·TAU` atau `n·2·TAU` untuk lebih berbelit; simplex [-1,1] → `n·PI`);
   **non-kontinu** sengaja: bulatkan sudut ke kelipatan π/10 (bentuk "terpahat") atau π/4 (kacau) — Hobbs;
   Fidenza: mode "Shape Angles: Sharp" = kelipatan 0.2π, "spiral" field, turbulensi none/low/medium/high.
6. **Integrator yang membaca field**: posisi langsung (= kaku, terbaca noise) vs **gaya/steering dengan inersia**
   (= "alive", lihat ../nature-of-code/NOTES.md). Trail/akumulasi alpha rendah mengubah titik jadi "cat".

## Setup minimal (simplex-noise 4.x, dari README)
```js
import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise'; // 4.x: fungsi, bukan class
import alea from 'alea';                         // PRNG seedable (paket terpisah)
const seed = new URLSearchParams(location.search).get('seed') ?? String(Date.now());
const noise3D = createNoise3D(alea(seed));       // default Math.random → tidak reproducible
const noise4D = createNoise4D(alea(seed));       // instance alea BARU per create (pola README; kompatibel 3.x)
noise3D(x, y, z);                                // → [-1, 1]
// 3.x lama: new SimplexNoise('seed').noise2D(x,y)  →  4.x: createNoise2D(alea('seed'))(x,y)
```

## Knob yang menentukan rasa (rangkuman esai)
| keputusan | pilihan | efek (sumber) |
|---|---|---|
| titik awal kurva/partikel | grid / uniform random / circle packing (atau Poisson-disk) | grid kaku, random menggumpal, packing rata-santai (Hobbs, Flow Fields) |
| panjang kurva `num_steps` | pendek / panjang | pendek = tekstur "bulu", warna terpisah; panjang = garis pemandu mata, warna terseret (Hobbs) |
| batas grid | lebih besar dari kanvas (±50%) | kurva keluar bisa berbelok masuk lagi; mulai di luar frame (Hobbs) |
| jarak minimum antar kurva | collision check, stop saat terlalu dekat | garis sejajar rapi tanpa tumpuk (Hobbs Mirror Removal, Fidenza "No Overlap/Relaxed/Anything Goes") |
| distribusi angka | uniform / Gaussian / Pareto | uniform menggumpal & ber-"run"; Gaussian = mirip-mirip dengan outlier (paling sering dipakai Hobbs); Pareto = banyak kecil, sedikit besar (Hobbs, Probability Distributions) |
| warna | HSB + jitter hue kecil; gradien (juga gradien _probabilitas_); palet berbobot 70/20/10; clumping; urutan tersortir; inheritance parent→child; bentuk komposisi besar | "squint test": struktur warna harus tetap terbaca saat mata disipitkan (Hobbs, Color Arrangement) |
| palet kosinus (IQ) | `col(t) = a + b·cos(2π(c·t + d))`, a,b,c,d vec3 | c bilangan bulat → siklik mulus; contoh `a=b=(.5,.5,.5), c=(1,1,1), d=(0,.33,.67)` |
| kapan randomness masuk | detail halus vs struktur | random di struktur awal = variasi seri yang besar (Hobbs, Randomness in Composition) |
| subdivisi segitiga | titik bagi Gaussian di sekitar 0.5 **pada sisi terpanjang** | self-balancing, tanpa segitiga kurus (Hobbs) |
| watercolor | poligon dasar ~7 putaran deformasi midpoint-Gaussian; tiap layer +4–5 putaran; opasitas ~4%; 30–100 layer; varians per segmen; mask tekstur per layer | tepi lembut & keras bercampur seperti cat air (Hobbs) |
| soft texture | tumpuk poligon offset alpha rendah (2–10%); lebih banyak layer = transisi lebih halus | kedalaman tanpa blur filter (Hobbs) |

## Integrasi (audio / mouse / seed)
- **Seed sekali, turunkan semuanya**: satu seed → `randomSeed`/`noiseSeed` (p5) atau `alea(seed)` per sistem (simplex),
  `d3.randomLcg(seed)` (d3), `Num.seed(seed)` (Pts). Simpan seed di URL & nama file ekspor (praktik Hobbs: seed + timestamp di filename).
- **Audio-reactive**: `AnalyserNode` default `fftSize 2048`, `smoothingTimeConstant 0.8`, `minDecibels −100`,
  `maxDecibels −30` (MDN bersama: `_shared/mdn-content/files/en-us/web/api/analysernode/*`). Pola rasa (heuristik):
  bass → laju waktu noise & skala; mid → amplitudo warp; high → spawn partikel/kilau. Haluskan lagi dengan
  attack cepat / release lambat (`v += (target − v) · (target > v ? 0.5 : 0.08)`) supaya berdenyut, bukan bergetar.
- **Mouse-reactive yang tidak murahan**: jangan tempel objek ke kursor; jadikan kursor **pusat warp** (offset domain
  meluruh dengan jarak) atau **percepatan waktu lokal**; tambah inersia (pegas/arrive).
- Shader: rumus warp/fbm/palette IQ langsung dipakai di GLSL atau p5.strands (`noise()` strands = simplex Gustavson, [0,1]).

## Resep non-generik
**1. Loop noise sempurna (GIF/hero yang berulang tanpa sambungan)** — jalan melingkar di 2 dimensi ekstra
```js
const n4 = createNoise4D(alea('loop-7'));
const PERIOD = 6000, R = 0.9;                                    // ms per loop, radius lingkaran di ruang noise
function field(x, y, ms) {
  const a = (ms % PERIOD) / PERIOD * Math.PI * 2;
  return n4(x * 0.004, y * 0.004, R * Math.cos(a), R * Math.sin(a)); // titik awal = titik akhir → mulus
}
```
_Kenapa mahal_: siklus tertutup tanpa crossfade; R mengatur seberapa jauh field berubah dalam satu putaran.

**2. Domain warp 2 lapis di JS (CPU) untuk field sudut**
```js
const n = createNoise2D(alea('warp'));
const fbm = (x, y) => { let s = 0, a = 0.5, f = 1; for (let o = 0; o < 4; o++) { s += a * n(x * f, y * f); f *= 2.01; a *= 0.5; } return s; };
function angleAt(px, py, t) {
  const x = px * 0.0025, y = py * 0.0025;
  const qx = fbm(x + t, y), qy = fbm(x + 5.2, y + 1.3 - t);
  return fbm(x + 4 * qx, y + 4 * qy) * Math.PI * 2;              // IQ: f(p + 4q)
}
```
_Kenapa mahal_: lekuk berlapis seperti asap — tidak bisa ditebak sebagai "Perlin" oleh mata yang terlatih.

**3. Flow field ala Hobbs (kurva tak bertumpuk)**
```js
// grid lebih besar 50% di tiap sisi; res = round(W*0.005); step = W*0.002; jarak min antar kurva d = W*0.004
// seed titik awal dengan Poisson-disk; untuk tiap titik: jalan maju sepanjang sudut grid,
// berhenti bila keluar grid ATAU ada titik kurva lain dalam radius d (cek via spatial hash sel = d)
// gambar sebagai shape tebal (lebar dari Gaussian, panjang dari Pareto) — bukan garis 1px
```
_Kenapa mahal_: spacing + variasi ukuran berdistribusi alami = struktur kuat (rasa Fidenza) dari algoritma sederhana.

**4. Palet kosinus + jitter HSB terkontrol**
```js
const pal = (t, a=[.5,.5,.5], b=[.5,.5,.5], c=[1,1,1], d=[0,.1,.2]) =>
  a.map((ai, i) => ai + b[i] * Math.cos(6.28318 * (c[i] * t + d[i])));      // rgb 0..1
// t = noise atau posisi y (gradien) + randomGaussian kecil (σ≈0.03) → variasi natural tanpa keluar palet
```
_Kenapa mahal_: semua warna berasal dari satu kurva → harmonis; jitter Gaussian kecil memberi "tangan manusia".

**5. Watercolor/soft blob untuk transisi section** — deformasi midpoint Gaussian rekursif (dasar ~7 putaran,
per-layer +4–5), 30–100 layer alpha ~4%, animasikan dengan mengganti seed per-layer secara bertahap (bukan semua sekaligus).
_Kenapa mahal_: tepi berbulu yang tumbuh pelan terasa seperti pigmen menyebar, bukan mask CSS.

## Performa, aksesibilitas, mobile
- simplex-noise: ~70 juta `noise2D`/detik (README, Ryzen 5950X) — CPU field 200×200 per frame aman; per-piksel layar
  penuh → pindah ke shader.
- Cache field statis; untuk field berubah per waktu cukup sampel di grid kasar lalu interpolasi.
- Layering alpha rendah (watercolor/soft texture) mahal → render sekali ke offscreen/framebuffer, animasikan transform-nya.
- `prefers-reduced-motion`: hentikan sumbu waktu (field statis), pertahankan komposisi; hindari kedip >3 Hz
  (`_shared/mdn-content/files/en-us/web/accessibility/guides/seizure_disorders/index.md`).
- Seed reproducible juga alat QA: bug visual bisa direproduksi persis.

## Sumber lokal
- `web/tylerxhobbs/flow-fields.md` — grid sudut, resolusi 0.5% lebar, step 0.1–0.5%, titik awal, distorsi non-kontinu, collision
- `web/tylerxhobbs/probability-distributions-for-algorithmic-artists.md` — uniform/Gaussian/Pareto secara estetis
- `web/tylerxhobbs/working-with-color-in-generative-art.md` · `color-arrangment-in-generative-art.md` — HSB, gradien, palet berbobot, clumping, sorting, inheritance
- `web/tylerxhobbs/utilizing-random-number-generator-seeds.md` · `randomness-in-the-composition-of-artwork.md` · `incomplete-control.md`
- `web/tylerxhobbs/a-randomized-approach-to-circle-packing.md` (2000 gagal berturut lalu turun ukuran) · `aesthetically-pleasing-triangle-subdivision.md`
- `web/tylerxhobbs/a-guide-to-simulating-watercolor-paint-with-generative-art.md` · `creating-soft-textures-generatively.md` · `texture-study-dormant-grass.md`
- `web/tylerxhobbs/fidenza.md` · `the-design-philosophy-of-the-qql-algorithm.md` · `on-sketching-and-the-life-cycle-of-artistic-ideas.md` — keputusan desain algoritma long-form
- `web/iquilezles/warp.md` (domain warping) · `fbm.md` (H, G, spektrum, detune) · `palettes.md` (palet kosinus + tabel contoh)
  — koleksi IQ yang lebih lengkap (functions, smoothsteps, sigmoids, gradientnoise, morenoise, smoothvoronoi, …) ada di
  `../../02-shaders-webgl/inigo-quilez/web/` (dimirror kategori shader)
- `repo-simplex-noise/README.md` (API 4.x, seed, migrasi 3→4, benchmark) · `simplex-noise.ts` (sumber) · `examples/plasma.js`
- `web/simplex-noise-github-releases.md` — riwayat versi
