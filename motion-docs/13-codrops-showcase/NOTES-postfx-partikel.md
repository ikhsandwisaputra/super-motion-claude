---
group: postfx-partikel
repos:
  - https://github.com/niccolofanton/smear-blur-showreel@d9a9567
  - https://github.com/agargaro/instanced-mesh-showcase@ef17af3
  - https://github.com/Makio64/dreamfold@08ec3e5
  - https://github.com/akella/codevember-2026@6db1a36   # hanya 02-shatter/ (+ blender/)
  - https://github.com/mrdoob/codevember-2026@6d4c24e   # hanya 05/ (Moss) dan 10/ (Caustic)
  - https://github.com/willeastcott/splat-fashion@18aac6a
fetched: 2026-11-15
---

# NOTES — post-FX & partikel (smear, instancing, fold, shatter, bokeh, splat morph)

Cara baca:
- **Sifat waktu** = salah satu dari tiga: **frame-pure** (bentuk tertutup dalam t), **deterministik-sekuensial** (dt tetap + seed tetap dari frame 0, bisa di-cache/replay), **pre-baked** (tekstur/JSON, seperti VAT).
- **sudah ada** = sudah dimiliki engine atau skill kita (dicek dengan `rg` ke `motion-taste/references/{studio-tricks,transitions,light-atmosphere,experimental-motion,colour-finish}.md`, `motion-video-engine/references/engine-api.md` dan `aset/_template-longform/_chapter/src/engine.js`). Yang ditandai begitu cukup dicatat deltanya, tidak diajarkan ulang.
- Semua klaim API/shader diambil dari mirror (file:line). Yang tidak bisa dicek ditulis **(belum diverifikasi)**.
- Kode di bagian repo = kutipan padat atau terjemahan TSL→GLSL yang setia. Kode di **Resep** = tulisan ulang kita sendiri (skeleton, **belum dirender**).
- Tidak ada satu pun skrip repo yang dijalankan (read-only).

Engine kita, untuk konteks:
- `engine.js` 2D sudah punya: **sub-frame accumulation motion blur** (K=8, shutter 0.5/FPS, sampel dijepit ke segmen cut: `engine.js:96-104`); `spring()` step response (`engine.js:39`); ease Bézier (`E.snap`, `E.brake`); grain tile (`engine.js:70-82`).
- Engine 3D sibling punya `kick()` impulse (`motion-video-engine/assets/template/src/lib/util.js:56`), DOF focusDist/aperture/maxblur, `post.ca`, `blurX/Y`.

---

## niccolofanton/smear-blur-showreel

**Tampilan:** reel 15 dtk @128 BPM. Huruf 3D dan bentuk primitif melesat dengan ekor *smear* yang melengkung mengikuti lintasan, ditambah motion blur screen-space. Grain halus dan vignette 6 %. Pakai WebGPURenderer + TSL.

**Teknik:**
- smear frame lengkung (vertex deform sepanjang Bézier dari posisi masa lalu)
- velocity smear yang konsisten dengan velocity buffer
- McGuire 2012 reconstruction-filter motion blur (TileMax → NeighborMax → gather)
- interleaved gradient noise (IGN) jitter
- `tanh` soft clamp
- aktor analitik `position(t)`
- trail yang dijepit di cut
- envelope beat pulse

**Mekanisme:**
1. Tiap aktor punya fungsi murni `position(t)`, `rotation(t)`, `scale(t)`, `squash(t)`, `smear(t)` dan daftar `cuts` (`src/reel.js`). Timeline-nya `track(keys)` dengan ease outExpo/outBack/inOutQuint, plus `wobble = exp(-decay·t)·sin(2πft)` (`src/timeline.js`).
2. Untuk smear (`src/trail.js:52-102`):
   - Ambil tiga sampel masa lalu di `t − exposure·{1/3, 2/3, 1}`, **dalam ruang kamera**. Hasilnya: kamera whip ikut membuat smear, sedangkan subjek yang di-track kamera tidak.
   - Kurangi posisi sekarang dari ketiganya, lalu fit Bézier kubik yang melewati ketiga titik itu.
   - Panjang ekor diredam lunak: `gain = strength·limit·tanh(len/limit)/len` dengan `limit = maxStretch·radius`.
   - Taper (penyempitan ekor) baru aktif setelah ekor ≥ 1.5×radius.
3. Vertex shader (`src/velocitySmear.js:21-31`) menggeser vertex sisi belakang sepanjang kurva itu. Sisi depan tetap utuh. Pose **sebelumnya** di-deform juga (`:33-37`), jadi velocity buffer ikut melengkung dan blur jatuh di arah yang benar.
4. Blur (`src/directionalMotionBlur.js:16-114`):
   - MRT warna/velocity/depth.
   - radius = `velocity·res·strength·smoothstep(0, onsetPixels)`, di-clamp ke `maxBlurPixels`, lalu ×0.5.
   - TileMax baris lalu kolom, NeighborMax 3×3.
   - Gather 9/17/25 tap (pilih menurut <5.5 px / <11 px / lebih), jitter IGN.
   - Bobot: `softDepthCompare` (0.5) × cone + cylinder²×2.
5. Urutan pass dan parameter (`src/main.js:130-170`):
   - Tone mapping **sebelum** blur ("lit materials are tone mapped before the blur").
   - `blurLimit = round(height·0.019)` ≈ 20 px @1080, `blurOnset 3.5`, exposure dinormalisasi ke 1/120 dtk.
   - Grain hash ±0.016, vignette 6 %.

**Kenapa terasa mahal:** ekornya **melengkung** mengikuti busur gerak dan menipis ke belakang, bukan sekadar stretch lurus. Siluet depan tidak pernah rusak, jadi mata membaca "tenaga", bukan "blur".

**Kode inti:**
```glsl
// src/velocitySmear.js:21-31 (TSL → GLSL, dipadatkan)
vec3 deform(vec3 p, vec3 dir, vec3 c1, vec3 c2, vec3 end, float taper, float taperCurve){
  float t   = pow(smoothstep(-0.4, 0.7, -dot(p, dir)), 1.3); // 0 = sisi depan, 1 = ekor
  float inv = 1.0 - t;
  vec3 off  = c1*(3.0*inv*inv*t) + c2*(3.0*inv*t*t) + end*(t*t*t); // Bézier, P0 = 0
  return p * (1.0 - taper*pow(t, taperCurve)) + off;               // ekor menyempit
}
// :33-37 — positionPrevious = deform(..., previous*) → velocity buffer ikut smear
```
```js
// src/trail.js:4-17, 21-33, 69-99 (dipadatkan)
const FRACTIONS = [1/3, 2/3, 1];
c1 =  3*near - 1.5*mid + far/3;          // Bézier lewat near@1/3, mid@2/3, far@1
c2 = -1.5*near + 3*mid - 5*far/6;   end = far;
// sampleTime(t, back, cuts): kalau t-back melewati cut → pakai waktu cut (ekor tak lintas cut)
off[i] = viewPos(actor, sampleTime(t, exposure*FRACTIONS[i], actor.cuts)) - viewPos(actor, t);
const limit = maxStretch * radius;
const gain  = strength * limit * Math.tanh(len/limit) / len;   // soft clamp
direction = normalize(-end);                                   // dari chord ekor → tak flip
taper = settings.taper * clamp(|end| / (radius*1.5));          // smearTailActivation
// reel.js:549  SMEAR = { exposure: 0.08, maxStretch: 1.5, taper: 0.76, taperCurve: 1.3 }
```

**Lisensi:** TIDAK ADA LICENSE. `package.json` private dan tanpa field license → **belajar saja, jangan salin kode**. Font di repo OFL.

**Adaptasi:**
- **Sifat waktu:** frame-pure. Aktor sudah analitik. "previous uniforms" di repo diambil dari update frame sebelumnya (sekuensial); di kita cukup hitung ulang pose di `t − 1/FPS`.
- **Status kita:**
  - Accumulation blur **sudah ada** dan lebih benar daripada McGuire untuk render offline. McGuire tidak perlu diport.
  - Smear lurus (stretch + multiples) **sudah ada** (`studio-tricks.md` §1).
  - Yang **baru**: Bézier lewat 3 sampel, taper, gain `tanh`, velocity dalam ruang kamera.
- **Knob yang bisa dicuri:**
  - `blurOnset` (gerak < 3.5 px/frame tidak di-blur, UI drift tetap tajam).
  - Batas blur 1.9 % tinggi frame.
  - Shutter 1/120 dtk (≈90° @30 fps; kita 180°). Bisa dipakai per scene untuk UI yang harus tajam.
- **Biaya:** 2D versi tile (Resep R3) ≈ 150 drawImage per kata hanya di 2–3 frame smear. Matikan K di layer itu (smear + blur = bubur, `studio-tricks.md` §1).
- **Dipakai di:** title card, slam kata kunci, whip transisi antar-stasiun.
- **Risiko kiblat:** `studio-tricks` melarang smear di UI "clean tech". Di long-form kalem, pakai hanya pada momen tenaga (≤ 1 per bab).

**Fit: 3/5**

---

## agargaro/instanced-mesh-showcase

**Tampilan:** sabuk asteroid berisi ribuan batu, kapal dan pasukan 10k karakter (animasi di-bake), tembakan beam, ledakan partikel. Batu jauh larut ke bintang, bukan nongol dari kabut. Ada `src/intro.ts` = "opening shot for videos".

**Teknik:**
- instancing (`@three.ez/instanced-mesh` 1.0.0-beta.1)
- dither dissolve berbasis kedalaman (IGN)
- premultiplied blending (satu material untuk additive + translucent)
- gaya partikel HDR
- beam quad menghadap kamera
- jittered grid + mulberry32
- skeletal animation bake ke tekstur

**Mekanisme:**
- **Fade** (`src/fade.ts:14-37`): `discard` kalau `IGN(gl_FragCoord) < smoothstep(near, far, viewZ)`. Di WebGPU: `maskNode = interleavedGradientNoise(screenCoordinate) >= fade`. Tidak perlu sort alpha.
- **Partikel** (`src/particles.ts`):
  - Blend `ONE, ONE_MINUS_SRC_ALPHA` (`:80-89`), `depthWrite false`, sort belakang-ke-depan.
  - Gaya (`:31-36`) pakai warna HDR >1 (mis. 1.4/1.05/0.7), `fadeIn 0–0.12`, `drag 0–2.5`.
  - Penuaan: `v *= exp(-drag·dt)` (`:135-159`).
  - `write()` (`:258-294`): ukuran ease-out kuadrat, `fade²`, warna premultiplied; additive = opacity 0.
  - Tekstur lembut (`:301+`): radial² × gumpalan gaussian.
- **Asteroid** (`src/asteroids.ts:205-240`):
  - Satu batu per sel grid dengan posisi di-jitter.
  - Ukuran power-law `1.2·(1−r)^−0.7`, maks 80.
  - Zona awal dikosongkan; medan diduplikasi di seam supaya periodik.
- **Intro** (`src/intro.ts`): 7 dtk smootherstep. Kamera berayun di busur dari offset (36,9,46) ke chase cam; penghitung instance naik dengan `ease(t/3)`.

**Kenapa terasa mahal:** kepadatan nyata (ribuan objek) + hilang lewat dither (bukan pop/kabut) + partikel HDR yang menyatu dengan bloom.

**Kode inti:**
```glsl
// src/fade.ts:28-31 — jalur WebGL (onBeforeCompile pada MeshLambertMaterial)
float fadeNoise(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); } // IGN
if (fadeNoise(gl_FragCoord.xy) < smoothstep(fadeNear, fadeFar, vViewPosition.z)) discard;
```
```js
// src/particles.ts:258-294 (dipadatkan)
const t = age / life, eased = 1 - (1 - t) * (1 - t);
size  = lerp(size0, size1, eased);
const fade  = t < fadeIn ? t / fadeIn : (1 - t) / (1 - fadeIn);
const alpha = peak * fade * fade;
color = lerp(start, end, Math.min(1, t * 1.5)) * alpha;   // premultiplied
opacity = additive ? 0 : alpha;   // blend ONE/ONE_MINUS_SRC_ALPHA: opacity 0 = additive murni
// beam: quad dari muzzle ke titik akhir, basis (axisX = axisY × toCamera) → selalu menghadap kamera
```

**Lisensi:** TIDAK ADA LICENSE → **belajar saja, jangan salin kode**. Model Quaternius CC0. Isi `SkeletalAnimationBake`, `setAnimationBake` dan `playAnimationAt` ada di library dan tidak ada di mirror **(belum diverifikasi)**.

**Adaptasi:**
- **Sifat waktu:**
  - Dither dan asteroid: frame-pure.
  - Partikel: di repo deterministik-sekuensial (`dt`). Bisa diubah jadi frame-pure dengan drag bentuk tertutup `x = x0 + v0·(1−e^{−k·age})/k` dan spawn time ber-seed.
  - Pasukan: pre-baked (tekstur animasi).
- **Renderer:** jalur WebGL ada (`?renderer=webgl|fallback|webgpu`, README) → aman headless.
- **Biaya:** rendah. Di Canvas 2D, alpha sudah gratis, jadi dither dissolve kurang berguna. Hanya relevan untuk layer WebGL2 dengan banyak objek opaque.
- **Dipakai di:** ambience luar angkasa/data center (jarang di tema kita), counter instance di intro, percikan impact.
- **Risiko kiblat:** HDR oranye + bloom = mudah jadi "neon/sci-fi generik". Di kita warna partikel netral, lime hanya untuk satu percikan.

**Fit: 2/5**

---

## Makio64/dreamfold

**Tampilan:** kota fotorealistik (Google 3D tiles) yang melengkung naik seperti di film *Inception*. Jalanan terlipat ke langit; ada mode double-fold, bowl, tube. Rantai post: awan, tilt-shift, bloom, chromatic aberration.

**Teknik:**
- cylindrical bend/fold di vertex shader, versi aman-float
- curl cap dengan lanjutan tangen
- mode fold/double/bowl lewat campuran sumbu
- cut lewat `Discard`
- fog diukur di ruang belum-dilipat
- kamera shot berbasis track `[time, value, ease]`
- tilt-shift
- CA ditaruh terakhir
- recorder frame-locked dengan jam virtual

**Mekanisme:**
- **Matematika lipat** (header `src/world/fold.js:1-55`): `t = max(s − s0, 0)`, `θ = k·t`.
  - Bentuk naif `r = 1/k` meledak saat k→0. Penulis memakai bentuk yang aman: `s' = s + (t·sinθ/θ − t) − y·sinθ`, `y' = t(1−cosθ)/θ + y·cosθ`.
  - Implementasi (`bendPosition`, `:293-330`):
    - floor θ di 1e-6 di semua tempat (bukan cuma di penyebut);
    - `capped = min(θ, curl)`; sisa panjang `straight = t − arc` diteruskan lurus searah tangen;
    - `1−cosθ` ditulis sebagai `2·sin²(θ/2)` supaya tidak terjadi cancellation.
  - `setBend(amount)` → `curvature = amount·π/foldLength`.
  - `FOLD_SHAPES`: fold curl π; dream 0.94π + cut; box double + cut; bowl π; tube π/2. Cut = `Discard` (`:458`).
- **Fog:** near/far 500/2400, dihitung pada geometri yang belum dilipat. Akibatnya kota yang melengkung ke atas tidak tiba-tiba berkabut.
- **Ease** (`src/camera/shots.js:91-99`):
  - accelerate `t²`
  - eager `1−(1−t)²`
  - responsive `−1.8t³+2.6t²+0.2t` (start dengan dorongan kecil 0.2, mendarat dengan kecepatan 0)
  - smoother `t³(t(6t−15)+10)`
  - Track `ABERRATION_GROWS` 0→0.6, `HAZE_CLEARS`, `SHOT_RATE 1.25`.
- **Post** (`src/world/World.js:410-505`): awan → tilt-shift (gaussianBlur setengah resolusi, dicampur lewat band smoothstep) → bloom → `chromaticAberration(img, aberration, centre, 1.4)` paling akhir.
- **Recorder** (`src/record/Recorder.js`, header):
  - jam virtual: seek ke N/fps;
  - tunggu tiles settle;
  - fade LOD dimajukan 1/fps;
  - encoder mediabunny, dengan `await CanvasSource.add` sebagai backpressure.

**Kenapa terasa mahal:** dunia nyata (foto) diperlakukan sebagai kertas yang bisa dilipat. Skala dan ketidakmungkinan fisika menghasilkan "wah" tanpa satu pun partikel. Lengkungnya mulus (aman-float), tidak ada sobekan atau jitter.

**Kode inti:**
```glsl
// src/world/fold.js:293-330 (TSL → GLSL, dipadatkan). s = posisi sepanjang sumbu, y = tinggi di atas tanah
float t       = max(s - hinge, 0.0);            // hanya bagian lewat engsel yang melengkung
float theta   = max(t * curvature, 1e-6);       // THETA_EPSILON
float capped  = min(theta, curl);               // curl = sudut maks (π = lipat balik penuh)
float arc     = t * (capped / theta);
float straight= t - arc;                        // lewat curl: lanjut lurus searah tangen
float sn = sin(capped), cs = cos(capped), hs = sin(0.5 * capped);
float arcAlong= arc * sn / capped;
float arcUp   = arc * 2.0 * hs * hs / capped;   // = arc(1-cos)/θ tanpa cancellation
float plan    = s + (arcAlong - t) + straight * cs;
float bentS   = plan - y * sn;
float bentY   = arcUp + y * cs + straight * sn;
// axis = mix(axis, mirrored, min(mode,1)) → mix(…, radial, max(mode-1,0)): 0 fold, 1 double, 2 bowl
```

**Lisensi:**
- Kode MIT (© 2026 David Ronai).
- Data **Google Photorealistic 3D Tiles (© Google) + token Cesium**: bukan milik kita, jangan dipakai. Pakai peta/foto/kolase kita sendiri.

**Adaptasi:**
- **Sifat waktu:** frame-pure (murni matematika vertex, `amount(t)` dari track).
- **Renderer:** di repo TSL/WebGPU. Port ke GLSL WebGL2 lurus (fungsinya cuma sin/cos/min).
- **2D:** bend 1D bisa digambar sebagai strip `drawImage` dengan transform affine per strip (Resep R2).
- **Biaya:** strip 96 × drawImage per sub-frame (murah). WebGL2: plane 256×256 segmen (murah).
- **Dipakai di:** hook ("dunia terlipat"); map animation (peta Indonesia menggulung dan memperlihatkan sisi lain); chapter card (kolase foto menggulung jadi tabung lalu kamera masuk). Ini kandidat **teknik baru per film**: `rg` fold/bend → hanya ide "folded space" di `experimental-motion.md:21`, belum ada implementasi.
- **Knob lain:**
  - Ease `responsive` cocok untuk kamera dokumenter.
  - CA tumbuh hanya saat lipatan bergerak. `studio-tricks.md:80` sudah melarang CA konstan, itu **sudah ada**.
- **Risiko kiblat:** tilt-shift = efek miniatur, cepat terasa gimmick. Maksimal satu shot, atau skip saja.

**Fit: 4/5**

---

## akella/codevember-2026 (02-shatter)

**Tampilan:** bola krom menembus tiga panel (kaca tipis, kaca tebal, batu) dalam loop 21 dtk. Retak menjalar radial lalu melingkar, pecahan lepas dalam slow-motion, lalu kecepatan kembali normal. WebGPURenderer (`src/stage.ts:26`).

**Teknik:**
- rigid-body pre-bake di Blender 240 fps
- reduksi keyframe biner dengan toleransi
- kuantisasi uint16/int16
- playback lerp + slerp
- **time remap lewat integrasi rate** (speed ramp)
- pola retak radial + cincin (seeded)
- retak menjalar per sudut dengan `reach = r/speed`
- normal "slab utuh" sampai retak tiba
- `lensClear` (pecahan yang hampir menabrak lensa dihilangkan duluan)
- loop export yang eksak

**Mekanisme:**
1. **Sim** (`blender/sim_blender.py`):
   - FPS 240, durasi 2 dtk, `BALL_SPEED 7`, `T_HIT 0.08`.
   - `GRAVITY 1.6` (sengaja "far below real"), `BURST 1.5`, `PUSH 0.75`.
   - substeps 12, solver iterations 24; pecahan friction 0.35, restitution 0.25, mass 0.25 + volume·6; bentuk konveks dipecah di sudut refleks.
   - Pecahan baru dilepas pada `T_HIT + (0.03 + (inner − reach)/HOLD_SPEED)·rand(0.85–1.2)`, `HOLD_SPEED 3.5`.
   - Key dipaksa linear (bola dengan ease tiba 0.17 dtk terlambat).
2. **Pack** (`blender/pack_bake.py:14-55`):
   - `keys_of` cari segmen terpanjang yang masih lolos toleransi: posisi 0.0004, sudut 0.0025.
   - Caranya menggandakan langkah lalu bisect. Error = deviasi maks lerp posisi / nlerp quaternion.
   - Tanda quaternion di-flip agar kontinu (`:73`).
   - Posisi uint16 dalam (low, span) per chunk, quat int16 ×32767.
   - Hasil: 47.6 MB → 5.9 MB (README).
3. **Playback** (`src/piece.ts:739-780`):
   - `f = time·fps` → lerp posisi, slerp quat.
   - `arrived = smooth(0, 0.006, time − arrival[i])`.
   - `lensClear` (`config 0.45`): pecahan yang akan menyentuh lensa diskalakan ke 0 sebelum sempat jadi kilatan 1 frame.
   - Fade di akhir lifetime.
4. **Retak** (`src/piece.ts:121-195, 543-552`):
   - Atribut per sudut = [r, jenis radial/cincin, acak, rim].
   - `reach = mix(r/crackSpeed, r/ringSpeed + 0.008, kind)·(1 + 0.35·rand)`.
   - `opened = smoothstep(0, 0.005, since − reach)`; normal berubah dari slab datar ke normal asli.
   - Default `crackSpeed 30`, `ringSpeed 16`.
5. **Pola** (`src/crackPattern.ts`, preset `blender/pattern.ts:8-24`):
   - `radials` 9/12, `radialJitter 0.6`, `kink 0.4`.
   - `ringStart` 0.2/0.05, `ringGrowth` 1.75/1.5, `ringGrowthOuter` 1.85/1.62.
   - `ringJitter 0.14`, `ringDrop 0.25`, `forks` 0.15/0.3, `secondary` 0.1/0.3; mulberry32.
   - Cincin tumbuh geometris di skala log. Sel dibuat per sektor sebagai chord, jadi cincin "patah" di tiap radial.
6. **Waktu** (`src/piece.ts:240-271`):
   - Integrasikan `1/rate` sepanjang sim, lalu balik jadi tabel fase (N=4096). Hasilnya slow-mo setelah hit (`slowdown 0.015`, `window 0.09`, `brake 0.015`, `travel 0.35`).
   - README: "Timing is free to change without re-running anything … only remap time over the bake."
   - `keyframes()` (`:273-297`): loop Catmull-Rom/Hermite tertutup.
   - `src/export.ts`: step loop persis frame-per-frame; frame setelah yang terakhir = frame pertama.

**Kenapa terasa mahal:** fisika nyata (bukan pecahan acak), tapi waktunya diarahkan seperti sutradara: retak muncul **sebelum** pecahan lepas, slow-mo hanya di jendela sempit setelah hit, dan tidak ada kilatan pecahan di lensa.

**Kode inti:**
```js
// src/piece.ts:240-271 — speed ramp: integrasi 1/rate lalu inversi (dipadatkan)
function timeCurve(slowdown, travel, contact, width, brake) {
  const N = 4096, seconds = new Float64Array(N + 1), table = new Float64Array(N + 1);
  for (let i = 1; i <= N; i++) {
    const g = (i - 0.5) / N, past = g - contact;
    const slowed = smooth(0, brake, past) * (1 - smooth(width * 2, width * 3.2, past));
    seconds[i] = seconds[i - 1] + 1 / (travel + (slowdown - travel) * slowed) / N;
  }
  for (let k = 0, i = 0; k <= N; k++) {
    const target = (k / N) * seconds[N];
    while (i < N && seconds[i + 1] < target) i++;
    table[k] = (i + (target - seconds[i]) / (seconds[i + 1] - seconds[i] || 1)) / N;
  }
  return { at: ph => { const x = ph * N, k = Math.min(N - 1, Math.floor(x));
                       return table[k] + (table[k + 1] - table[k]) * (x - k); } };
}
```
```glsl
// src/piece.ts:547-549 (TSL → GLSL)
float reach  = mix(r / crackSpeed, r / ringSpeed + 0.008, kind) * (1.0 + 0.35 * rnd);
float opened = max(broken, smoothstep(0.0, 0.005, since - reach));   // since = time - hit
vec3  N      = normalize(mix(flatSlabNormal, realNormal, opened));   // sebelum retak tiba: tampak utuh
```

**Lisensi:** TIDAK ADA LICENSE (root maupun `02-shatter/`) → **belajar saja, jangan salin kode**, termasuk skrip Blender.

**Adaptasi:**
- **Sifat waktu:**
  - Sim: **pre-baked**. Kalau dipakai, bake sendiri di Blender lalu JSON/tekstur dibaca dengan `f = warp(t)·fps`.
  - Retak, `timeCurve`, `arrived`: **frame-pure**.
  - Versi ringan 2D tanpa Blender: pola retak seeded + pecahan dengan balistik bentuk tertutup (Resep R5).
- **Renderer:** WebGPU di repo. Matematikanya port langsung.
- **Biaya:** pre-bake berat di produksi (Blender, toleransi, packing). Versi 2D ringan.
- **Dipakai di:**
  - **Speed ramp** berguna di semua scene, bukan hanya kaca: slow-mo sempit saat angka kunci mendarat atau impact kamera. `rg` speed ramp/time remap = 0 hit → **baru**.
  - Retak: beat "mitos pecah" (headline/dokumen retak lalu runtuh), sekali per film.
- **Risiko kiblat:** kaca pecah biru = transisi stock klise, dan biru tidak cocok dengan palet. Pakai pada material dokumen/kertas berita atau layar ponsel, dengan ink netral, tanpa glow.

**Fit: 3/5** (speed ramp sendiri 4/5)

---

## mrdoob/codevember-2026 (05 Moss, 10 Caustic)

**Tampilan:**
- **05:** batu berlumut di senja, kunang-kunang yang jadi bokeh saat keluar fokus, batu bereaksi lembut terhadap sentuhan.
- **10:** dasar laut, berkas cahaya kaustik, debu air melayang, kawanan ikan.

Keduanya **WebGPU wajib** (three r187 meshlets; r188dev SVGF). Tidak ada jalur WebGL2 di repo.

**Teknik:**
- spring "kick" bentuk tertutup (dorongan eksponensial, bukan impuls)
- sim fixed-step 60 Hz + reset saat waktu mundur
- bokeh sprite hemat energi
- DOF **interval fokus** + gather 64 tap golden-angle yang hanya menerima sampel di sisi yang sama
- debu frame-pure
- light shaft raymarch (64 sampel, Henyey-Greenstein)
- fog kuadrat
- split-tone yang menjaga luminans
- capture deterministik

**Mekanisme:**
- **Kick** (`05/rock-reaction.js:4-17`):
  - Respons spring terhadap dorongan yang meluruh `e^{−P·age}`: mulai diam, puncak ±0.6 dtk, recoil ±20 %.
  - Ekor dipensiunkan lewat smootherstep di detik 5–6.
  - Gesture ditumpuk, di-soft-clamp `tanh` (0.28/0.26).
  - Dievaluasi terhadap waktu animasi: "Evaluate against animation time so playback and offline capture agree".
- **Kunang** (`05/firefly-flight.js`):
  - `STEP 1/60`, persepsi tertunda lewat ring buffer, akselerasi/kecepatan dibatasi.
  - Reset kalau waktu mundur, interpolasi antar-step.
  - Pulse: `smoothstep(0,.38,age)·(1−smoothstep(.42,1,age))` (`05/fireflies.js:15`).
- **Bokeh sprite** (`05/fireflies.js:40-66`):
  - Inti: `core = √(blur² + src² + (0.6 px)²)`.
  - Energi: `energy = (src/core)²·0.9994 + 0.0006`. Titik yang membesar jadi redup, total energinya tetap.
  - Gaussian berubah jadi disk saat blur > 1–4 px. Halo `exp(−6r²)·0.16·(0.1/halo)²`.
  - Warna `tint^0.45·core·28`; diuji kedalaman terhadap scene; additive.
- **DOF** (`05/post-processing.js`, `05/lens.js`, `05/focus-volume.js`):
  - Interval `[focusNear, focusFar]` di-fit tiap frame dari sudut bbox subjek.
  - CoC = `(d/tr)²/((d/tr)²+1)`, dengan d = jarak di luar interval.
  - Gather 64 tap (sudut `i·2.39996323`, radius `√((i+0.5)/64)`). Sampel diterima hanya kalau sisinya sama (depan/belakang interval, `smoothstep(0,.08)`) → tidak ada halo bocor.
  - Setengah resolusi + gaussian; ACES → grade; vignette 16 %.
- **Grade** (`05/color-grading.js`):
  - Kerja di `pow 1/2.2`.
  - Bayangan diberi tint (−.08, .015, .16), highlight (.065, .012, −.09), lewat smoothstep luma.
  - Luminans dinormalisasi ulang (warna bergeser, terang tetap); kontras di sekitar 0.35.
- **Debu** (`10/particles.js:58-118`):
  - `progress = fract(seed.y − clock·(seed.w·0.001 + 0.0015))`.
  - x/z = seed + jumlah sin dengan frekuensi sudut 0.15/0.07/0.12/0.09 (rad/dtk), amplitudo 0.12–0.25.
  - Lifetime `smoothstep(0,.04,p)·(1−smoothstep(.96,1,p))`.
  - Ukuran render `max(d, 1.5 px)`, opacity × `(d/rendered)²`.
  - Soft intersection 0.12 dengan depth scene; disc `exp(−3r²)`; seed LCG 8157; 32k butir.
- **Shafts** (`10/light-shafts.js`):
  - Volume kotak, 64 sampel titik-tengah (tanpa jitter atau history), setengah resolusi.
  - Kerucut gaussian `exp(−1.6·|a|²)`, lebar `(below·0.3+1)·width`.
  - Tekstur kaustik di mip 6 memecah kerucut jadi berkas.
  - Fase `(1.2025 − 0.9cos)^−1.5·0.8` (HG g=0.45).
  - Ekstingsi `exp(−(.08,.025,.015)·below·haze)`.
  - Fog `exp(−((max(d−4.5,0)·density·0.06)²))`.
- **Ikan** (`10/fish-simulation.js`): `FISH_STEP 1/60`, seed LCG 1073, array posisi sebelumnya untuk motion vector → deterministik-sekuensial.
- **Capture:**
  - `05/scripts/capture-video.js:95-160`:
    - `app.manual`, damping kontrol mati, `time = frame/FPS`;
    - warmup di titik tengah tiap shot (3 render), reset reaksi, 40 render warmup;
    - di cut ada 3 render tambahan tanpa memajukan waktu;
    - render 1536 → output 1024 (supersample);
    - PNG lossless lewat `toBlob` → POST ke receiver, dengan backpressure dan cek urutan; error scope validasi WebGPU;
    - receiver memverifikasi jumlah frame, fps, durasi.
  - `10/scripts/capture-video.js:115-180`:
    - `preview(frame)` = reset lalu replay `advance(1/FPS)` tanpa render → akses acak;
    - `draw(frame)` memaksa urutan;
    - `settle()` = 16 render di cut tanpa memajukan waktu (history temporal SSR).

**Kenapa terasa mahal:** fisika lensa yang jujur. Bokeh tidak bertambah terang saat membesar, fokus mengikuti subjek sebagai volume (bukan satu titik), debu bergerak sangat pelan. Grade menggeser warna tanpa mengubah terang, jadi kontras nilai tetap rapi.

**Kode inti:**
```js
// 05/rock-reaction.js:4-17 — spring didorong push yang meluruh (mulai diam, puncak ~0.6 s, recoil ~20 %)
const D = 1.15, F = 2.2, P = 10, DUR = 6;   // SPRING_DECAY, SPRING_FREQUENCY, PUSH_DECAY
function spring(age) {
  const ratio = F / (P - D);
  const osc = Math.exp(-D * age) * (Math.sin(F * age) - ratio * Math.cos(F * age)) + ratio * Math.exp(-P * age);
  return osc * 2.195 * (1 - smootherstep(0, 1, age - DUR + 1));   // 2.195 = normalisasi puncak pertama
}
```
```glsl
// 05/fireflies.js:52-62 (TSL → GLSL, dipadatkan) — sprite bokeh hemat energi
float core   = sqrt(blur*blur + srcR*srcR + pow(worldPerPx*0.6, 2.0));
float haloR  = blur + 0.10;
float disk   = 1.0 - smoothstep(core - edge, core + edge, r);
float coreS  = mix(exp(-2.0*pow(r/core, 2.0)), disk, smoothstep(1.0, 4.0, blur/worldPerPx));
float energy = pow(srcR/core, 2.0) * 0.9994 + 0.0006;     // area naik → kecerahan turun
float halo   = exp(-6.0*pow(r/haloR, 2.0)) * 0.16 * pow(0.10/haloR, 2.0);
color = pow(tint, vec3(0.45)) * coreS * 28.0 * energy + tint * halo;
// 05/post-processing.js:46-52 — tap i: angle = i*2.39996323, radius = sqrt((i+0.5)/64),
// accepted = smoothstep(0, .08, foreground ? focusNear - tapDepth : tapDepth - focusFar)
```

**Lisensi:** MIT (© 2026 mrdoob). Kode boleh dipakai dengan menyertakan notice.

**Adaptasi:**
- **Sifat waktu:**
  - Kick, debu, bokeh, DOF, shafts, grade: frame-pure.
  - Kunang dan ikan: deterministik-sekuensial (replay dari 0, cache per frame, atau ganti dengan jalur analitik).
- **Renderer:** WebGPU wajib di repo. Di headless Chrome kita belum terbukti jalan **(belum diverifikasi)**. Port matematikanya ke Canvas 2D (debu, bokeh: Resep R4) atau GLSL WebGL2 (DOF, shafts).
- **Status kita:**
  - `kick` impuls **sudah ada** (`util.js:56`); delta = onset lembut dari push (tidak ada sentakan di frame pertama). Cocok untuk UI "disenggol" dan kartu yang menahan beban angka.
  - DOF titik fokus **sudah ada** di engine 3D; interval fokus dan gather sisi-sama **baru**.
  - Bokeh hemat energi, light shaft, split-tone: **baru** (0 hit `rg`).
  - Grain/vignette **sudah ada**.
- **Biaya:**
  - Debu 400–800 sprite 2D: murah.
  - DOF 64 tap setengah resolusi dan shaft 64 sampel: sedang (WebGL2).
- **Dipakai di:**
  - Debu dan bokeh: layer FG/BG pada fly-through kolase (udara dokumenter).
  - Split-tone: finishing semua bab.
  - Shaft: momen "pencerahan" atau ruang server (jarang).
  - Interval fokus: rak dokumen 3D dengan beberapa kartu tajam sekaligus.
- **Risiko kiblat:** kunang = titik terang berwarna → hitung ke neon ≈1 %. Debu putih hangat dan redup, jangan lime. Shaft teal laut = cast warna; pakai netral. Shot gelap harus tetap punya kontras nilai.

**Fit: 4/5**

---

## willeastcott/splat-fashion

**Tampilan:** model gaussian-splat berdiri dengan idle prosedural. Pakaian berganti lewat dua gelombang: kain larut jadi titik-titik berkilau, titik meluncur ke pasangannya, lalu mekar jadi pakaian baru dengan swell dan pita glow. Label callout dengan garis penunjuk ikut menempel di tubuh. PlayCanvas; WebGPU atau WebGL2 (`?device=webgl2`).

**Teknik:**
- **dot morph dua gelombang** dengan jam per elemen
- korespondensi lewat rank-pairing
- konservasi tampilan (dot lebih terang saat kecil)
- mirror CPU dari jam shader untuk elemen yang menempel
- callout dengan hysteresis sisi
- skinning tanpa bobot (bobot = fungsi posisi)
- idle prosedural sin-sum
- **clock hijack** untuk capture

**Mekanisme:**
- **Jam per gaussian** (`src/morph.js:117-124`):
  - `along = (y + tiltX·x + tiltZ·z)/height`, `order = mix(1 − along, hash, noise)`, `raw = P·(1+S) − order·S`.
  - `raw ≤ 0` → pakaian lama; `≥ 1` → pakaian baru.
  - Default: `duration 3.6`, `stagger S = 3`, `noise 0.05`, `tilt [0.42, 0.18]`, `dot 0.001`, `dotOpacity 1.2`, `swell 0.035`, glow (1, .76, .42).
  - Ease progress: `P + (smooth(P) − P)·0.5` (`:721-723`).
- **Tahap** (`:157-184`):
  - `glide = smoothstep(.08,.80,raw)` (pindah);
  - `dots = smoothstep(0,.16,raw)·(1−smoothstep(.70,1,raw))`;
  - `edge = bump(raw,.09,.07)` dengan `bump = exp(−((x−c)/w)²)`;
  - `swell = sin(π·smoothstep(.62,1,raw))`; `shimmer = sin(time·5 + h·2π)·dots`.
  - Posisi `mix(a,b,glide)` + dorongan keluar `swell·(0.3·dots + swell)`.
  - Skala menyusut ke dot `dot·(0.75+0.5h₂)·(1+1.2·edge)`.
  - Warna dicampur lalu: +15 % saat jadi dot, + tint dot di edge, + pita glow `bump(raw,.84,.08)`. Alpha × `dotOpacity` saat jadi dot.
- **CPU mirror** (`:725-760`):
  - `progressAt(y)` dan `waveHeight` = rumus shader yang sama di JS, supaya lampu pita glow dan label ganti tepat saat titik di sekitarnya berganti.
  - "Matches 'glide' in the shader, so anything pinned to the figure can change over as the dots around it do."
- **Pasangan** (`tools/build-morph.mjs:14-47, 386-445`):
  - Pecah per blok (±10 cm antar-landmark) → irisan tinggi dengan jumlah sama (SLICES 20) → bin sudut → radius.
  - Pasangkan menurut rank (median jarak 7 cm). Semua outfit disimpan dalam urutan slot yang sama.
- **Callout** (`src/callouts.js`):
  - Titik anchor melewati skinning yang sama di CPU.
  - Kolom kiri/kanan dipilih dari sisi yang terlihat, dengan slack (hysteresis).
  - Teks fade-out → ganti → fade-in. Path SVG `M anchor → L x,y → L x + side·lw`.
  - Alpha `1 − exp(−rate·dt)` (6 naik / 14 turun) → **tidak** frame-pure, perlu ditulis ulang berbasis t.
- **Rig** (`src/rig.js:53-160`, `src/rig-shader.js`):
  - Idle = jumlah sin bertitik-periode 9, 5.3, 4.2 (napas), 11, 7.1, 13 dtk.
  - Bobot skin = fungsi posisi istirahat (rantai vertikal menurut tinggi; kaki dipisah bidang).
- **Capture** (`tools/capture-video.mjs:88-160`, puppeteer):
  - `evaluateOnNewDocument` menelan `requestAnimationFrame`.
  - `setTimeout/clearTimeout` diganti peta timer jam-virtual.
  - `advance()` = jam += 1000/fps, jalankan timer jatuh tempo, `app.tick(stamp)`, pause semua `document.getAnimations()` lalu set `currentTime` manual.
  - Step di dalam rAF asli, lalu tunggu satu rAF lagi sebelum screenshot. Ada tes bahwa screenshot = frame yang di-step.
- **README:**
  - Tanpa post-FX (bloom di linear light membuat kain hitam jadi abu-abu).
  - Palet SH 65.536 entri.
  - Warna diperbarui tiap 2° (`colorUpdateAngle = 0` saat capture supaya tidak pop).

**Kenapa terasa mahal:** perpindahan disembunyikan "di depan mata". Titik tetap tajam saat kain kabur, gelombang punya tepi terang dan ekor mekar, dan semua yang menempel (label, lampu) ikut gelombang yang sama. Satu jam master, ribuan jam lokal, tetap koheren.

**Kode inti:**
```glsl
// src/morph.js:117-184 (dipadatkan; a/b = posisi lama/baru, h/h2 = hash per gaussian)
float along = (a.y + uMorphFx.x*a.x + uMorphFx.y*a.z) / uMorphFx.z;   // tilt x/z, tinggi figur
float order = mix(1.0 - clamp(along, 0.0, 1.0), h, uMorphFx.w);       // noise di gelombang
float raw   = uMorph.z * (1.0 + uMorph.w) - order * uMorph.w;          // progress, stagger
if (raw <= 0.0 || raw >= 1.0) { /* pakai splat a atau b apa adanya */ }
float glide = smoothstep(0.08, 0.80, raw);
float dots  = smoothstep(0.0, 0.16, raw) * (1.0 - smoothstep(0.70, 1.0, raw));
float edge  = morphBump(raw, 0.09, 0.07);                 // exp(-((x-c)/w)^2)
float swell = sin(3.14159265 * smoothstep(0.62, 1.0, raw));
vec3  p     = mix(a, b, glide);   // + radial: uMorphFx2.y * (0.3*dots + swell)
float dotSize = uMorphFx2.x * (0.75 + 0.5*h2) * (1.0 + 1.2*edge);
vec4  c = mix(ca, cb, glide);
c.rgb = c.rgb*(1.0 + 0.15*dots) + uMorphDot.rgb*uMorphDot.w*(0.1*dots + edge)
      + uMorphGlow.rgb*uMorphGlow.w*morphBump(raw, 0.84, 0.08);
c.a   = min(1.0, c.a * mix(1.0, uMorphFx2.w, dots));
```
```js
// tools/capture-video.mjs:88-160 (dipadatkan) — jam virtual untuk halaman yang tidak frame-pure
await page.evaluateOnNewDocument(() => {
  let now = 0; const timers = new Map(); let id = 0;
  window.__raf = window.requestAnimationFrame; window.requestAnimationFrame = () => 0;   // ditelan
  window.setTimeout = (fn, ms) => (timers.set(++id, { fn, at: now + (ms || 0) }), id);
  window.clearTimeout = k => timers.delete(k);
  window.__advance = fps => { now += 1000 / fps;
    for (const [k, t] of [...timers]) if (t.at <= now) { timers.delete(k); t.fn(); }
    for (const a of document.getAnimations()) { a.pause(); a.currentTime = now; }  // CSS/WAAPI
    app.tick(now); };
});
// lalu: step di dalam rAF asli → tunggu 1 rAF lagi → screenshot
```

**Lisensi:**
- Kode MIT.
- Capture/data `public/morph-*` = **CC BY 4.0 (Christoph Schindelar)**: wajib kredit kalau dipakai (kita tidak memakainya).
- Logo PlayCanvas milik PlayCanvas.

**Adaptasi:**
- **Sifat waktu:** morph frame-pure, cukup set `progress = (t − t0)/dur`. Idle rig frame-pure (sin-sum). Callout perlu ditulis ulang: alpha dari t, bukan `exp(−rate·dt)`.
- **Renderer:** WebGL2 tersedia di repo. Untuk kita, cukup Canvas 2D dengan titik (Resep R1).
- **Status kita:** morph bentuk **sudah ada** sebagai ide (`transitions.md:24`); morph **point-cloud dua gelombang** = **baru**.
- **Biaya:** 4–8k titik `arc` per sub-frame (sedang). Matikan K di segmen itu, karena blur titik = bubur.
- **Dipakai di:** transisi stasiun "foto → titik → grafik/peta → foto", data reveal (foto kerumunan jadi titik-titik lalu jadi bar chart), chapter card. Pola CPU-mirror dipakai untuk callout/angka yang muncul tepat saat gelombang melewati posisinya.
- **Risiko kiblat:** glow hangat + tint dot bisa jadi "sparkle AI". Edge pakai lime tipis (≤ 1 % piksel) atau putih, tanpa glow, dan swell kecil.

**Fit: 4/5** (teknik dot morph sendiri 5/5)

---

## Pola lintas repo

1. **Waktu selalu analitik, state hanya kalau terpaksa.** Contoh: aktor `position(t)` (smear), track `[time, value, ease]` (dreamfold), kick dievaluasi terhadap waktu absolut (mrdoob), debu `fract(seed − clock·speed)`. Ini sama dengan hukum engine kita (`engine-api.md:76`).
2. **Kalau sim tidak bisa bentuk tertutup, ada dua jalan:**
   - **pre-bake** + kompresi key bertoleransi + playback lerp/slerp (akella);
   - **fixed-step 60 Hz + seed tetap + reset saat mundur + replay tanpa render untuk akses acak** (mrdoob `preview(frame)`).
   Untuk kita: pilih yang pertama kalau sim mahal, yang kedua kalau murah (< 1 ms per step).
3. **Satu jam master, ribuan jam lokal:**
   - `raw = P·(1+S) − order·S` (splat);
   - `reach = r/speed` (retak akella);
   - `t = max(s − hinge, 0)` (lipat dreamfold).
   Stagger kontinu dari posisi lebih rapi daripada stagger indeks. Untuk elemen yang menempel, **mirror rumus shader di CPU** supaya label/lampu/SFX berganti tepat bersama gelombang.
4. **Clamp lunak, bukan potong keras:** `limit·tanh(x/limit)` (gain smear, reaksi batu). Nilai yang mendekati batas melambat alami, tanpa patahan di kurva kecepatan.
5. **Jaga energi saat sesuatu membesar atau kabur:** energi bokeh `(src/core)²`, debu `(d/rendered)²`, dot splat × `dotOpacity`. Bokeh besar jadi redup, titik kecil diberi boost. Inilah yang membedakan "lensa" dari "lingkaran glow".
6. **Jangan pernah lintas cut, dan buru kilatan 1 frame:**
   - trail dijepit ke cut (smear `sampleTime`; di kita **sudah ada** lewat `segOf`);
   - `lensClear` (pecahan dekat lensa dihapus duluan);
   - `colorUpdateAngle = 0` (splat);
   - settle N render di cut (mrdoob).
7. **Urutan post:** tone map sebelum blur (smear) → … → CA paling akhir (dreamfold). Di kita grain paling akhir (**sudah ada**, `colour-finish.md:42`).
8. **Efek dihitung di ruang istirahat, bukan ruang terdeformasi:** fog dreamfold diukur di geometri belum-dilipat, bobot skin splat dari posisi istirahat. Deformasi tidak menggoyang shading.
9. **Checklist capture deterministik** (tiga implementasi berbeda):
   - jam manual / jam virtual (rAF ditelan, timer virtual, `document.getAnimations()` di-step);
   - warmup per shot; settle di cut;
   - supersample 1.5× (1536 → 1024);
   - PNG lossless berurutan dengan backpressure;
   - verifikasi jumlah frame, fps dan durasi; tes "screenshot = frame yang di-step".
   Di kita `render(f)` sudah frame-pure dan menulis JPEG 0.93 (`engine.js:112`). Yang layak dipinjam: supersample untuk shot penuh garis tipis/titik, PNG untuk gradien halus (banding), dan jam virtual kalau kita menyematkan halaman/komponen pihak ketiga yang memakai rAF/CSS animation.
10. **WebGPU/TSL:**
    - smear, dreamfold, shatter, mrdoob 05/10 = WebGPU/TSL. mrdoob tegas wajib WebGPU. Untuk yang lain, fallback otomatis WebGPURenderer→WebGL2 **belum diverifikasi** untuk repo ini.
    - agargaro punya jalur WebGL (README: "WebGPURenderer with forceWebGL and WebGLRenderer"); splat punya `?device=webgl2`.
    - Untuk kita: port matematika ke GLSL WebGL2 (offscreen canvas → `drawImage`) atau langsung Canvas 2D. Alur offscreen WebGL2 → `drawImage` di dalam `render(f)` sendiri **belum diverifikasi** di pipeline kita (perhatikan `preserveDrawingBuffer`, atau gambar di task yang sama).

---

## Resep untuk engine kita

Semua resep untuk `aset/_template-longform/_chapter/src/engine.js`. Helper yang dipakai: `clamp`, `lerp`, `E` dari engine, plus `smooth(a,b,x)` = smoothstep. Semua frame-pure (hanya t). Semua ditulis ulang oleh kita dan **belum dirender**: wajib uji 3 dtk + `eye.py sense` sebelum masuk film.

### R1 — Titik dua gelombang (foto → titik → grafik/peta → foto)
**Pakai:** transisi stasiun, data reveal, chapter card. Sumber: splat-fashion `morph.js`.

**Persiapan (sekali, di `init`):**
- Sampel N titik dari gambar A dan B (grid tiap `cell` px, simpan warna).
- Urutkan keduanya menurut (irisan y berisi jumlah sama, lalu x), lalu pasangkan menurut indeks = rank-pairing.
- Kalau jumlahnya beda, duplikasi titik di sisi yang kurang.
```js
const bump = (x, c, w) => Math.exp(-(((x - c) / w) ** 2));
const hash = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
function drawDotMorph(ctx, t, o) {
  const { t0, dur = 3.6, S = 3, noise = 0.05, imgA, imgB, A, B, cell = 10, dot = 2.2,
          swell = 12, edgeInk = 'rgb(200,245,60)', cx = 960, cy = 540 } = o;
  let P = clamp((t - t0) / dur); P = P + (P * P * (3 - 2 * P) - P) * 0.5;   // ease morph.js:721
  const R = P * (1 + S), yA = 1080 * R / S, yB = 1080 * (R - 1) / S;          // front gelombang 1 & 2
  ctx.save(); ctx.beginPath(); ctx.rect(0, yA, 1920, 1080); ctx.clip(); ctx.drawImage(imgA, 0, 0); ctx.restore();
  if (yB > 0) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1920, yB); ctx.clip(); ctx.drawImage(imgB, 0, 0); ctx.restore(); }
  for (let i = 0; i < A.length; i++) {
    const a = A[i], b = B[i], h = hash(i);
    const raw = R - lerp(a.y / 1080, h, noise) * S;                          // jam lokal (atas duluan)
    if (raw <= 0 || raw >= 1) continue;
    const glide = smooth(.08, .8, raw), dots = smooth(0, .16, raw) * (1 - smooth(.7, 1, raw));
    const edge = bump(raw, .09, .07), sw = Math.sin(Math.PI * smooth(.62, 1, raw));
    let x = lerp(a.x, b.x, glide), y = lerp(a.y, b.y, glide);
    const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1, push = swell * (0.3 * dots + sw);
    x += dx / d * push; y += dy / d * push;                                  // mekar keluar sedikit
    const r = lerp(cell * 0.62, dot * (0.75 + 0.5 * hash(i + 9)) * (1 + 1.2 * edge), dots);
    ctx.globalAlpha = Math.min(1, 0.85 + 0.35 * dots);                       // dot sedikit di-boost
    ctx.fillStyle = edge > 0.6 ? edgeInk : (glide < 0.5 ? a.c : b.c);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
```
**Knob:**
- `dur` 2.4–3.6 dtk; `S` 2–4 (makin besar makin banyak yang sedang jadi titik); `noise` 0.03–0.1; `cell` 8–14 px (N ≈ 10–30k → turunkan ke 6–8k dengan `cell` 14–18).
- Tilt gelombang: ganti `a.y/1080` dengan `(a.y + 0.4·a.x)/1080`, dan clip pakai poligon miring yang sama.
- Edge lime hanya di pita tipis (neon ≈1 %); di B-roll gelap pakai putih.
- Untuk callout/angka yang muncul bersama gelombang: hitung `R − (y/1080)·S` di CPU untuk posisinya (pola CPU-mirror).
- `scene.K = 1` di segmen ini.

### R2 — Lipat peta / kolase (fold bend, strip renderer)
**Pakai:** hook "dunia terlipat", peta menggulung memperlihatkan negara lain, kolase menggulung jadi tabung sebelum kamera masuk. Sumber: dreamfold `fold.js` (MIT).
```js
function bend(s, y, hinge, k, curl) {                       // versi 1D aman-float dari fold.js:293-330
  const t = Math.max(s - hinge, 0), th = Math.max(t * k, 1e-6), c = Math.min(th, curl);
  const arc = t * c / th, straight = t - arc, sn = Math.sin(c), cs = Math.cos(c), hs = Math.sin(c / 2);
  const plan = s + (arc * sn / c - t) + straight * cs;
  return [plan - y * sn, arc * 2 * hs * hs / c + y * cs + straight * sn, c];   // [s', naik, sudut]
}
function drawFold(ctx, img, t, o) {
  const { t0, dur = 1.8, hinge = 0.5, foldLen = 0.4, curl = Math.PI, N = 96, cam = 2.4, tilt = 0.5, up = -1 } = o;
  const k = E.inOutCubic(clamp((t - t0) / dur)) * Math.PI / foldLen;     // setBend: amount·π/foldLength
  const iw = img.width, ih = img.height, sw = iw / N, hh = 0.28;          // hh = setengah tinggi (unit lebar)
  const P = (sx, z, sy) => {                                              // perspektif sederhana, kamera miring
    const yy = sy * Math.cos(tilt) - z * Math.sin(tilt), zz = cam + sy * Math.sin(tilt) + z * Math.cos(tilt);
    const f = cam / zz; return [960 + (sx - 0.5) * 1920 * f, 540 + yy * 1920 * f];
  };
  for (let i = 0; i < N; i++) {
    const [a0, z0, c0] = bend(i / N, 0, hinge, k, curl), [a1, z1] = bend((i + 1) / N, 0, hinge, k, curl);
    const p0 = P(a0, up * z0, -hh), p1 = P(a1, up * z1, -hh), q0 = P(a0, up * z0, hh);
    ctx.setTransform((p1[0] - p0[0]) / sw, (p1[1] - p0[1]) / sw, (q0[0] - p0[0]) / ih, (q0[1] - p0[1]) / ih, p0[0], p0[1]);
    ctx.drawImage(img, i * sw, 0, sw + 0.8, ih, 0, 0, sw + 0.8, ih);     // +0.8 px: tutup celah seam
    const shade = 0.42 * (1 - Math.cos(c0)) * 0.5;                        // makin melengkung makin gelap
    if (shade > 0.01) { ctx.fillStyle = `rgba(8,10,12,${shade})`; ctx.fillRect(0, 0, sw + 0.8, ih); }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
```
**Knob:**
- `hinge` 0.3–0.7 (letak engsel); `foldLen` 0.25–0.6 (makin kecil makin tajam).
- `curl` π/2 (tabung) … π (lipat balik); `up` −1 = melengkung ke arah kamera.
- `tilt` 0.3–0.7 rad (kamera menunduk); `N` 64–128 strip.
- Double fold: panggil `bend(|s−0.5|+0.5, …)` (cermin, seperti mode 1).
- Painter's order: kalau curl menjauhi kamera, balik urutan strip.
- Untuk lengkung 2 sumbu (bowl) pakai WebGL2 plane + vertex shader dengan fungsi yang sama.

### R3 — Smear lengkung untuk kinetic type
**Pakai:** slam kata kunci, whip ke stasiun berikutnya. Ini upgrade dari smear lurus di `studio-tricks.md` §1. Sumber ide: smear-blur-showreel (tanpa lisensi → ini tulisan ulang dari rumusnya).
```js
// word = offscreen canvas berisi kata; pose(t) → {x,y} pusat kata DI RUANG LAYAR (sudah termasuk kamera)
function drawCurvedSmear(ctx, word, pose, t, cuts, o = {}) {
  const { exposure = 0.08, maxStretch = 1.5, taper = 0.76, taperCurve = 1.3, GX = 24, GY = 6 } = o;
  const p = pose(t), wW = word.width, wH = word.height, radius = 0.5 * Math.max(wW, wH);
  const cut = Math.max(-1e9, ...cuts.filter(c => c <= t));
  const q = [1 / 3, 2 / 3, 1].map(f => { const s = pose(Math.max(t - exposure * f, cut)); return [s.x - p.x, s.y - p.y]; });
  const len = Math.hypot(...q[2]);
  if (len < 3) { ctx.drawImage(word, p.x - wW / 2, p.y - wH / 2); return; }
  const g = maxStretch * radius * Math.tanh(len / (maxStretch * radius)) / len;   // soft clamp
  const [n, m, f] = q;
  const c1 = [0, 1].map(k => g * (3 * n[k] - 1.5 * m[k] + f[k] / 3));
  const c2 = [0, 1].map(k => g * (-1.5 * n[k] + 3 * m[k] - 5 * f[k] / 6));
  const e = [g * f[0], g * f[1]], el = Math.hypot(...e), dir = [-e[0] / el, -e[1] / el];
  const tp = taper * clamp(el / (1.5 * radius)), tw = wW / GX, th = wH / GY;
  for (let j = 0; j < GY; j++) for (let i = 0; i < GX; i++) {
    const lx = (i + .5) * tw - wW / 2, ly = (j + .5) * th - wH / 2;
    const u = Math.pow(smooth(-0.4, 0.7, -(lx * dir[0] + ly * dir[1]) / radius), 1.3), v = 1 - u;
    const b = k => c1[k] * 3 * v * v * u + c2[k] * 3 * v * u * u + e[k] * u * u * u;
    const sc = 1 - tp * Math.pow(u, taperCurve), x = p.x + lx * sc + b(0), y = p.y + ly * sc + b(1);
    ctx.drawImage(word, i * tw, j * th, tw, th, x - tw * sc / 2 - .3, y - th * sc / 2 - .3, tw * sc + .6, th * sc + .6);
  }
}
```
**Knob:**
- `exposure` 0.05–0.1 dtk (panjang memori ekor); `maxStretch` 1–2× radius; `taper` 0.6–0.85; `GX×GY` 16×4 … 32×8.
- Hanya aktif di 2–3 frame tercepat. Di luar itu ekor otomatis < 3 px → gambar biasa.
- Karena `pose` di ruang layar, pan kamera ikut menghasilkan smear dan subjek yang di-track tidak.
- Matikan K di layer ini. Cek dengan `eye.py curve` / `eye.py look --around`.

### R4 — Debu cahaya + bokeh hemat energi (interval fokus)
**Pakai:** layer FG/BG di fly-through kolase dan stasiun dokumenter (udara di ruangan), ambience chapter card. Sumber: mrdoob 05/10 (MIT).
```js
function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const SPR = (() => { const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  for (let k = 0; k <= 8; k++) { const r = k / 8; gr.addColorStop(r, `rgba(255,246,232,${Math.exp(-3 * r * r) * (1 - smooth(.7, 1, r))})`); }
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return c; })();                 // disc exp(-3r²), particles.js:107
const RND = mulberry32(8157), MOTES = Array.from({ length: 500 }, () => ({ x: RND(), y: RND(), z: RND(), w: RND(), ph: RND() * 6.283 }));
function drawMotes(ctx, t, o = {}) {
  const { focusNear = 0.35, focusFar = 0.55, trans = 0.2, aperture = 22, size = 2.4, rate = 0.03, camX = 0, amount = 0.55 } = o;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const m of MOTES) {
    const p = ((m.y - t * rate * (0.6 + 0.8 * m.w)) % 1 + 1) % 1;                // fract progress, naik pelan
    const life = smooth(0, .04, p) * (1 - smooth(.96, 1, p));
    const z = 0.1 + 0.9 * m.z;                                                 // 0 dekat … 1 jauh
    const x = (m.x + 0.12 * Math.sin(t * 0.15 + m.ph) + 0.14 * Math.sin(t * 0.09 + m.x * 9) - camX / (0.3 + z)) * 1920;
    const y = (1 - p) * 1080;
    const out = Math.max(z - focusFar, 0) + Math.max(focusNear - z, 0), q = (out / trans) ** 2;
    const coc = q / (q + 1);                                                   // lens.js defocusAmount
    const src = size * (0.4 + 0.6 * m.w) / (0.3 + z), blur = aperture * coc;
    const core = Math.sqrt(blur * blur + src * src + 0.36), draw = Math.max(core, 1.5);
    const energy = (src / core) ** 2 * 0.9994 + 0.0006;                        // fireflies.js energi tetap
    ctx.globalAlpha = Math.min(1, amount * life * energy * (core / draw) ** 2);
    ctx.drawImage(SPR, x - draw, y - draw, draw * 2, draw * 2);
  }
  ctx.restore();
}
```
**Knob:**
- `rate` 0.01–0.05 /dtk (debu lambat = mahal); `aperture` 10–35 px.
- `focusNear/Far` = interval kedalaman subjek (di-fit ke kartu/foto yang sedang dibaca).
- `camX` = offset kamera untuk parallax; `amount` 0.3–0.7.
- Warna putih hangat; jangan lime. `lighter` hanya di latar gelap/menengah. Di latar terang pakai `screen` dengan `amount` lebih rendah.
- Untuk bokeh "lampu" (kunang), tambah halo `exp(−6r²)` kedua dengan radius `blur + 0.1·H`, hemat (hitung ke neon ≈1 %).

### R5 — Speed ramp lewat integrasi rate + retak menjalar
**Pakai:** slow-mo sempit tepat setelah angka/headline "menghantam", lalu kecepatan kembali (bisa di scene apa pun). Retak = beat "mitos pecah" pada dokumen/layar ponsel. Sumber ide: akella 02-shatter (tanpa lisensi → tulisan ulang).
```js
function speedRamp({ contact = 0.4, slow = 0.08, brake = 0.03, width = 0.09, N = 2048 } = {}) {   // bangun SEKALI
  const sec = new Float64Array(N + 1), tab = new Float64Array(N + 1);
  for (let i = 1; i <= N; i++) {
    const past = (i - 0.5) / N - contact;
    const slowed = smooth(0, brake, past) * (1 - smooth(width * 2, width * 3.2, past));
    sec[i] = sec[i - 1] + 1 / (1 + (slow - 1) * slowed) / N;                 // rate 1 → slow → 1
  }
  for (let k = 0, i = 0; k <= N; k++) {
    const target = k / N * sec[N];
    while (i < N - 1 && sec[i + 1] < target) i++;
    tab[k] = (i + (target - sec[i]) / ((sec[i + 1] - sec[i]) || 1)) / N;
  }
  return ph => { const x = clamp(ph) * N, k = Math.min(N - 1, Math.floor(x)); return tab[k] + (tab[k + 1] - tab[k]) * (x - k); };
}
// pemakaian: const warp = speedRamp({contact: .35}); const g = warp((t - t0) / dur); actionT = g * actionDur;
// segs = garis retak buatan sendiri (radial ber-seed + cincin log-geometris), r0/r1 = jarak ujung dari titik hantam
function drawCracks(ctx, since, segs, { crackSpeed = 2200, ringRatio = 0.53, ink = 'rgba(236,240,232,.9)' } = {}) {
  if (since <= 0) return;
  ctx.strokeStyle = ink; ctx.lineWidth = 1.5; ctx.beginPath();
  for (const s of segs) {
    const reach = r => (s.ring ? r / (crackSpeed * ringRatio) + 0.008 : r / crackSpeed) * (1 + 0.35 * s.rnd);
    const k = clamp((since - reach(s.r0)) / Math.max(reach(s.r1) - reach(s.r0), 1e-4));
    if (k > 0) { ctx.moveTo(s.x0, s.y0); ctx.lineTo(lerp(s.x0, s.x1, k), lerp(s.y0, s.y1, k)); }
  }
  ctx.stroke();
}
```
**Knob:**
- `contact` = fase hit (0–1 dari durasi aksi); `slow` 0.03–0.15 (0.015 di sumber = hampir beku); `width` 0.05–0.12 (lebar jendela slow); `brake` 0.015–0.05 (seberapa cepat rem masuk).
- Retak: rasio cincin/radial 16/30 ≈ 0.53 seperti sumber. Kecepatan di sumber 30 unit/dtk pada kaca ±2.5 unit (melintas ±2 frame). Di layar pilih supaya melintas 0.3–0.6 dtk.
- Pola: radial 9–12, `kink` 0.4, cincin mulai 0.05–0.2 lalu tumbuh ×1.5–1.85.
- Pecahan 2D (opsional): poligon sel → balistik bentuk tertutup `x = x0 + v0(1−e^{−k·a})/k`, `y += ½·g·a²` dengan g kecil (sumber: 1.6, "far below real"), rotasi `ω·a`. Lepas tiap sel pada `tHit + reach(r_dalam)·(0.85–1.2)`.
- Pecahan yang mendekati lensa dibuang sebelum menyentuh frame (pola `lensClear`).
- SFX: crack = non-tonal (bukan "ting", sesuai memory).
