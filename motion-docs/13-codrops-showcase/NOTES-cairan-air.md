---
group: cairan-air
repos:
  - https://github.com/Noniv/web-ocean@a07c7fd
  - https://github.com/Humpalumps/Ultra-Water@30ea65e
  - https://github.com/wass08/under-the-sea@326edad
  - https://github.com/wass08/aquarium@6d8d330
  - https://github.com/argofowl/ferro-toggle@3425e1c
  - https://github.com/spite/codevember-2026@f0b44d6   # folder 3/ ("Melt")
  - https://github.com/akella/codevember-2026@6db1a36  # folder 03-melt/
fetched: 2026-11-15
---

# NOTES — cairan-air (air, laut, cairan, ferrofluid, lelehan)

Cara baca: tiap repo punya **Tampilan · Teknik · Mekanisme · Kenapa terasa mahal · Kode inti (file:line) · Lisensi ·
Adaptasi · Fit**. Path file relatif ke `repo-<owner>--<repo>/`. Semua klaim API/shader diambil dari mirror; yang
belum dicek ditandai **(belum diverifikasi)**. Angka biaya render di bagian Adaptasi = **perkiraan**, bukan ukuran.

Status "sudah ada" dicek dengan `rg` di `motion-taste/references/{studio-tricks,transitions,light-atmosphere,
experimental-motion,colour-finish}.md` + `motion-video-engine/references/engine-api.md`:
- **sudah ada:** metaball / `smin` (studio-tricks.md §3, baris 55–60), refractive glass (light-atmosphere.md:34),
  chromatic aberration (beberapa file), urutan lens stack CA→bloom→vignette→tonemap→LUT→grain (colour-finish.md:42),
  halftone/dither sebagai *gaya* (light-atmosphere.md:37), counter-space lag spring (studio-tricks.md:70),
  shatter hanya sebagai ide Blender (experimental-motion.md:63).
- **belum ada (baru):** caustics (Worley maupun area-ratio), ripple ring closed-form, Snell's window, glint Poisson,
  AgX, TPDF dither anti-banding, matcap, softbox/card reflection env, ink-film flood, ferrofluid spike SDF,
  Young–Laplace drop, p-norm kernel blend, ω-quantised loop, rekaman loop mulus dengan pre-roll.

Catatan engine: engine bab 2D (`aset/_template-longform/_chapter/src/engine.js`) saat ini cuma pakai context `2d`
(dicek: tidak ada `webgl` di file itu). Semua look GLSL di bawah masuk lewat **offscreen WebGL2 canvas → `drawImage`**
(lihat helper di Resep 1). Engine kakak (`motion-video-engine`) three.js r186 WebGL2 → bisa langsung.

---

## Noniv/web-ocean

- **Tampilan:** laut senja fotoreal, ombak FFT sampai riak milimeter, kilau matahari, langit fisik + awan, tanpa engine.
- **Teknik:** Tessendorf FFT 6 cascade (256², 1103 m → 0,26 m) · JONSWAP + Donelan-Banner spreading + swell ·
  dispersi kapiler ω = √(gk + σk³) · ω dikuantisasi ke loop 600 s · foam dari Jacobian lipatan permukaan (clipmap,
  decay, drift) · LEAN mapping (momen slope ber-mip) · sun glitter Gaussian anisotropik + Smith masking ·
  backlit crest SSS · langit Hillaire (LUT) · bloom 8 level + AgX + highlight desat + TPDF dither.
- **Mekanisme:**
  1. Spektrum `h0(k)` dibuat sekali; tiap frame `h(k,t) = h0(k)·e^{-iωt} + conj(h0(-k))·e^{iωt}` → IFFT radix-2
     (compute) → displacement, slope, Jacobian. **Murni fungsi t** (tidak ada state).
  2. **Loop eksak:** `w0 = 2π/LOOP; ω = floor(ω/w0)·w0` → semua fase kembali sama setelah LOOP detik, dan fp32
     tidak drift (main.js:424 `LOOP = 600`, dipakai sim.js:146–148; main.js:724 `simTime -= LOOP`).
  3. Foam: `J = (1+jxx)(1+jzz) − jxz²`; inject = `clamp((thresh − J)·gain)`; state `f = max(prev·e^{-dt·decay}, inject)`
     → **ber-state** (sim.js:368–406). Versi frame-pure sudah ada di repo: foam instan dari Jacobian per piksel
     (ocean.js:213–222, komentar "instantaneous crest foam").
  4. Shading air: Schlick F0 0,02 (n = 1,333); glitter = PDF Gaussian slope anisotropik × G Smith × Fresnel;
     body = warna air × hemisphere langit; SSS = `crest² · pow(toSun,4) · thin · e^{-dist/600}`.
  5. Post: bloom → exposure → vignette → white balance → **desat highlight** `mix(c, lum, smoothstep(0.7,6,lum)·0.55)`
     → AgX → AgX look (sat, power) → EOTF → **TPDF dither** (2 IGN dijumlah − 1, /255).
- **Kenapa terasa mahal:** highlight sangat terang jadi putih (bukan oranye jenuh) + dither membuat gradasi langit
  halus tanpa banding — itu yang memisahkan "render" dari "gradient web".
- **Kode inti:**
  ```wgsl
  // js/wgsl/sim.js:146-153 — fase dikuantisasi ke loop, lalu evolusi spektrum (WGSL, ringkas)
  let w0 = 2.0 * PI / S.misc.z;              // S.misc.z = LOOP (main.js:438 simF[50] = LOOP)
  let w  = floor(omegaOf(kl) / w0) * w0;
  let ph = w * S.timeP.x;  let e = vec2f(cos(ph), sin(ph));
  let h  = cmul(H0.xy, vec2f(e.x, -e.y)) + cmul(H0.zw, e);
  ```
  ```wgsl
  // js/wgsl/post.js:112-126 — urutan finishing (ringkas)
  c = mix(c, bloom/8, U.p.y); c *= exposure; c *= 1 - vig*dot(d,d);
  c *= vec3(1+warm, 1, 1-warm);
  let lum = dot(c, vec3(0.2126,0.7152,0.0722));
  c = mix(c, vec3(lum), smoothstep(0.7, 6.0, lum) * 0.55);   // highlight → putih
  o = agxEotf(agxLook(agx(c), sat, power));
  o += (ign(px + frame*5.588) + ign(px*1.37 + 17 + frame*3.1) - 1.0) / 255.0;  // TPDF dither
  ```
  Fungsi `agx()` / `agxContrast()` polinomial ada di post.js:78–99 (matriks inset/outset + kurva derajat 6).
- **Lisensi:** MIT (© 2026 Maksymilian Dendura) → boleh di-port dengan atribusi di komentar.
- **Adaptasi:**
  - **WebGPU/WGSL saja** → bisa gagal di headless Chrome kita. Jalur WebGL2 untuk laut FFT = Ultra-Water (di bawah).
    Yang langsung bisa dipindah ke engine mana pun: AgX + highlight desat + TPDF dither (pure per piksel) dan trik
    ω-quantised loop (pure in t).
  - Frame-pure: ombak ya (set `simTime = t % LOOP`); foam clipmap tidak → pakai foam instan Jacobian, atau
    deterministik sequential dari frame 0 (dt = 1/30 tetap).
  - Biaya: README menyebut 6–8 ms/frame di 2560×1440 RTX 5070 Ti — ringan untuk render offline.
  - Pemakaian: establishing shot laut (topik maritim, iklim, logistik kapal), chapter card. Finishing AgX + dither
    berguna di **semua** film yang punya gradasi gelap besar.
  - Risiko kiblat: laut senja = oranye-biru generik "stock footage"; kalau dipakai, grade dingin netral, matahari
    tidak jenuh, aksen lime tetap di tipografi saja.
- **Fit: 2/5** (scene laut jarang; nilai utamanya di finishing dan trik loop).

---

## Humpalumps/Ultra-Water

- **Tampilan:** laut + pulau tropis real-time three.js: ombak pecah di pantai, caustics di dasar pasir, bawah air
  dengan Snell's window, sinar matahari volumetrik, benda mengapung.
- **Teknik:** FFT 4 cascade (Stockham, 1 MRT draw per stage) · ω dikuantisasi ke loop 300 s · **caustics area-ratio
  splatting** (ala Evan Wallace) · **glint Poisson** (lobe GGX dipecah jadi faset berkedip) · **ripple
  Cauchy–Poisson** dari benda jatuh · **Snell's window + total internal reflection** dari bawah · shafts
  Henyey-Greenstein 24 langkah · shore breaker pada eikonal travel-time field · lens droplets · AgX.
- **Mekanisme:**
  1. **Caustics** (src/water/Caustics.js): grid mesh di atas tile cascade 12 m; vertex shader membiaskan arah
     matahari lewat slope (`refract(-sun, n, 1/1.33)`), memindahkan vertex ke titik jatuhnya di bidang kedalaman
     1,5 / 4 / 10 m; fragment menulis **rasio luas** `|det(dFdx(vOld), dFdy(vOld))|` dengan blending additive
     (One, One). Hasil: tekstur rata-rata = 1 yang tinggal dikalikan ke cahaya matahari langsung. Slope disampling
     cubic B-spline (4 tap bilinear) supaya garis kaustik tidak jadi manik-manik. Target 4× MSAA.
  2. **Glint:** per sel seukuran piksel, jumlah faset yang memantulkan matahari = Poisson(λ),
     `λ = FACETS · D · NoH · 6.8e-5 / (4·VoH) · luas sel`; spec dikali `n/λ` (energi rata-rata tetap), crossfade
     antar undian tiap `uTime·3` → berkedip. Dua level sel diblend (mip-like).
  3. **Ripple impact (closed form):** stationary phase: `k = g·age² / (4r²)`, fase `k·r`, amplitudo
     `∝ (kL)² e^{-(kL)²}` → gelombang panjang lari duluan, pendek tertinggal di dalam. Pure in t.
  4. **Snell's window:** dari bawah, `cosI` vs `COS_CRIT = 0.6614` (√(1 − 1/1.33²)); di dalam jendela = langit/frame
     di atas lewat `refract`, di luar = TIR memantulkan warna air dalam; tepi jendela di-smoothstep oleh roughness.
- **Kenapa terasa mahal:** caustics-nya hemat energi (rata-rata 1), jadi dasar laut tidak "dicat putih"; glint
  pecah jadi titik hanya di tempat yang jarang, halus di pusat lobe — persis kamera asli.
- **Kode inti:**
  ```glsl
  // src/water/Caustics.js:62-72 (VERT) dan :80-85 (FRAG), ringkas
  vec2 s  = slopeBSpline(t, uLod);
  vec3 r  = refract(-uSun, normalize(vec3(-s.x, 1.0, -s.y)), ETA);
  vec3 rf = refract(-uSun, vec3(0.0, 1.0, 0.0), ETA);
  vec2 d  = (r.xz / max(-r.y, 0.05) - rf.xz / -rf.y) * (uDepth / L);
  d = clamp(d, -uMargin, uMargin);
  vOld = t * uRes;  gl_Position = vec4((t + d) * 2.0 - 1.0, 0.0, 1.0);
  // FRAG: rasio luas = luas asal per piksel jatuh
  vec2 a = dFdx(vOld), b = dFdy(vOld);
  outColor = vec4(uMask * min(abs(a.x*b.y - a.y*b.x), MAX_RATIO), 0.0);
  // material: blending CustomBlending, One/One, side DoubleSide (Caustics.js:126-132)
  ```
  ```glsl
  // src/water/OceanSurface.js:183-200 — ripple Cauchy-Poisson (ringkas, per impact i)
  vec2 dv = xz - e.xy;  float r = length(dv) + 1e-3, L = uImpactSize[i];
  float k = 9.81 * e.z * e.z / (4.0 * r * r);          // e.z = umur (s)
  float kl2 = k*k*L*L;
  float amp = e.w * 2.72 * kl2 * exp(-kl2 - k*k/(kMax*kMax) - 0.12*e.z) * L/(L + r);
  h += amp * cos(k*r);  grad += dv/r * (amp * k * sin(k*r));
  ```
  Glint: OceanSurface.js:408–413 (`poisson()` inverse-CDF + aproksimasi logistik untuk λ > 6) dan :616–637.
  Snell's window: OceanSurface.js:469–500. Loop ω: OceanSim.js:17–19, :128–130.
- **Lisensi:** MIT (© 2026 Humpalumps) + THIRD_PARTY_NOTICES.md: potongan dari three.js (MIT), "Hash without Sine"
  Dave Hoskins (MIT), UnrealEngineSkyAtmosphere Hillaire/Epic (MIT). Kalau port bagian itu, bawa juga notice-nya.
- **Adaptasi:**
  - **Cocok langsung** dengan engine three.js r186 WebGL2 kita (package.json: three ^0.186.1).
  - Frame-pure: FFT + caustics + glint + ripple + Snell = pure kalau `OceanSim.time = t % 300` (sekarang diakumulasi
    dari dt di OceanSim.js:304–309 → ganti jadi set langsung). **Tidak pure:** auto exposure adaptif (pakai exposure
    tetap), floaters rigid body 240 Hz (deterministik sequential atau buang), lens droplets "beberapa detik setelah
    muncul" (jadikan fungsi waktu sejak event).
  - Biaya: README 3,3–5,9 ms/frame di 3,3 MP RTX 3060; caustics 0,22–0,37 ms. Murah.
  - Pemakaian: (a) **caustics sebagai layer cahaya** di atas foto/peta (multiply map 1 → aman energi);
    (b) **Snell's window sebagai transisi "menyelam"** dari dunia atas ke bab bawah (data tersembunyi, "di balik
    layar"); (c) ripple impact untuk momen "satu keputusan menyebar".
  - Risiko kiblat: warna preset air (tropical/toxic) jenuh → pakai preset "clear" + grade netral; jangan jadikan
    look laut tropis utuh (generik).
- **Fit: 3/5** (teknik kelas atas, WebGL2, MIT; tapi scene laut utuh jarang dipakai, ambil per bagian).

---

## wass08/under-the-sea

- **Tampilan:** laut malam berkabut, rakit + lentera, sekolah ikan terbang (boids GPGPU), sinar bulan tembus air,
  alga berpendar.
- **Teknik:** gelombang "peaked sine" + beat groups + envelope 2D · **riak dispersif** (paket Gaussian per panjang
  gelombang, kecepatan grup sendiri) · **god-ray aperture**: noise tileable via embedding torus 4D, di-threshold
  berbasis rank histogram **sebelum** mip · kabut tinggi eksponensial analitik · halo lokal sebagai "bloom lokal"
  · boids compute (TSL) dengan prewarm 25 s · Snell-refracted absorption · glitter jalur lentera.
- **Mekanisme:**
  1. Ombak: `s = max(0, ½ + ½ sin φ)`, elevasi `(s^p − mean)·a` → puncak runcing, lembah lebar. Pasangan gelombang
     kembar beda tipis → *beating* = kelompok ombak berjalan (src/lib/ocean.ts:7–19, 194–209). Pure in t, dan ada
     **mirror CPU** yang identik dengan GPU (berguna untuk menaruh objek di atas air di 2D).
  2. **Riak dispersif** (ocean.ts:46–66, 211–235): 5 komponen λ = 2,2 / 1,4 / 0,85 / 0,22 / 0,1;
     `ω = √(g k + T k³)`, `cg = (g + 3Tk²)/(2ω)`; tiap komponen = paket Gaussian berpusat di `r = cg·age`, lebar
     `width + spreading·age`, energi dijaga `√(w0/w)`, onset di-smoothstep, decay `decay + viscosity·k²`; plus
     "cavity" (cekungan) di pusat yang cepat hilang. Gelombang gravitasi panjang memimpin, kapiler halus lari di
     depan sebagai pinggiran.
  3. **Aperture shaft** (src/scene/rays.ts:13–46): 4 kanal simplex 4D di torus (cos a·r, sin a·r, cos b·r, sin b·r)
     → tile 256² tanpa sambungan; tiap kanal di-rank (CDF histogram 512 bin) lalu `ease(0.48, 0.82, rank)` →
     **threshold dulu, baru mip** ("deep blur widens a real opening instead of blurring raw noise toward 0.5").
     Shaft = `broad.r × fine.g`, dua lapis scroll beda arah + warp dari kanal lain.
- **Kenapa terasa mahal:** cahaya bawah air membelah dan melebar (bukan kerucut statis), celah gelap tetap gelap
  di kedalaman; riak punya "pinggiran kapiler" seperti tetes air asli.
- **Kode inti:**
  ```ts
  // src/lib/ocean.ts:225-233 — satu komponen riak (CPU mirror, ringkas)
  const width = c.width + c.spreading * age, ring = dist - c.cg * age;
  const onset = clamp01(age / c.onset);
  const env = Math.exp(-ring*ring/(width*width) - age*c.decay) * Math.sqrt(c.width/width)
            * onset*onset*(3 - 2*onset);
  h += Math.sin(c.k*dist - c.omega*age + c.phase) * packetAmp * c.amplitude * env;
  ```
  ```ts
  // src/scene/rays.ts:31-38 — threshold berbasis rank SEBELUM mip (ringkas)
  const rank = cumulative[Math.floor(raw[i] * 512)];           // CDF histogram
  const value = c === 0 ? ease(0.48, 0.82, rank) : c === 1 ? ease(0.45, 0.8, rank) : raw[i];
  data[i] = Math.round(value * 255);  // lalu DataTexture + generateMipmaps
  ```
- **Lisensi:** **tidak ada LICENSE**, package.json tanpa field license → **belajar saja, jangan salin kode.**
  README menyebut refraksi/filter spektral "informed by" dgreenheck/tidewater (lisensi tidak dicek — belum
  diverifikasi).
- **Adaptasi:**
  - **WebGPU/TSL** (three 0.186 `three/webgpu`) → risiko headless. Semua rumusnya portable ke GLSL WebGL2 (tulis
    ulang sendiri).
  - Frame-pure: ombak, riak (waktu event ditulis di timeline), shaft (scroll × t) = pure. Boids = ber-state
    (deterministik sequential + prewarm, atau bake posisi ke JSON).
  - Biaya: riak = 5 komponen × N slot per piksel, murah; shaft raymarch 12–32 langkah (perkiraan sedang).
  - Pemakaian: **riak dispersif** untuk momen dampak (titik di peta, "pengumuman" menyebar); **aperture shaft**
    untuk ambience bab yang tenang (cahaya menembus layar UI / kolase dari atas).
  - Risiko kiblat: **tinggi** untuk alga berpendar (cyan/magenta/ungu = neon). Ambil mekanismenya, bukan paletnya;
    shaft putih netral, intensitas rendah.
- **Fit: 3/5.**

---

## wass08/aquarium

- **Tampilan:** akuarium kaca berisi pulau low-poly, cahaya kaustik bergerak di dasar; klik → kaca retak radial,
  pecah, air tumpah jadi genangan; bisa di-rewind.
- **Teknik:** **caustics Worley F2 − F1** dua lapis berlawanan arah, di-pow-sharpen, offset RGB (dispersi) ·
  diproyeksikan sepanjang arah lampu · Gerstner 6 gelombang · riak cincin Gaussian · **shatter Voronoi radial**
  (inti padat + spoke di 4 cincin + Lloyd hanya di luar) · shaft raymarch 16 langkah · rewind quintic.
- **Mekanisme:**
  1. **Worley animasi** (src/lib/worley.ts:5–14): sel 3×3, titik fitur `sin(hash·2π + t)·0.36 + 0.5` (bergerak
     memutar di dalam selnya, tidak melompat); simpan F1 dan F2.
  2. **Garis cahaya:** `edge = (1 − clamp(F2 − F1))^sharpness` → nol tepat di tepi Voronoi = garis tipis terang.
     Dua lapis: A (`scale 2.3`, scroll `(+0.33, +0.12)·t`) dan B (`scale 3.7`, scroll `(−0.20, −0.29)·t`, offset 7.3,
     waktu ×0.83); gabung `sqrt(edgeA·edgeB)` → hanya persilangan yang terang, pola tidak berulang terbaca.
  3. RGB: sampel di `uv ± (rgbOffset, 0)` untuk R/B → pinggiran warna halus. Fade dengan kedalaman
     `smoothstep(0, 0.15, depth)`; di lighting.ts dikalikan `e^{-0.30·depth}` dan diproyeksikan pada koordinat
     sejajar arah lampu (`along`, `across`) dengan drift `−0.10·t`.
  4. Shatter (src/lib/shatter.ts:55–74): 55 % seed di inti (`r = coreR · rng^0.8`), spoke di cincin
     `coreR × [1.45, 2.8, 4.9, 7.8]`, sisanya acak dengan probabilitas `0.035/(0.035 + d²)`, Lloyd 1 iterasi hanya
     untuk seed luar → inti tetap bergerigi, luar rapi.
- **Default param** (worley.ts:23): `scaleA 2.3, scaleB 3.7, speed 0.32, sharpness 18, intensity 1.65,
  rgbOffset 0.012`.
- **Kenapa terasa mahal:** dua lapis yang bergerak berlawanan + sqrt-product memberi garis yang "hidup" dan tidak
  kelihatan tiling; dispersi RGB tipis memberi kesan optik nyata tanpa neon.
- **Kode inti:**
  ```ts
  // src/lib/worley.ts:7-12 dan :40-45 (TSL, ringkas)
  for (y,x in -1..1) { phase = hash2(cell + off) * 2π;
    feature = sin(phase + time) * 0.36 + 0.5;  d = length(off + feature - local);
    second = min(second, max(first, d)); first = min(first, d); }
  a = worley(uv*scaleA + vec2(t*0.33, t*0.12), t);
  b = worley(uv*scaleB - vec2(t*0.20, t*0.29) + 7.3, t*0.83);
  edgeA = (1 - clamp(a.f2 - a.f1)) ^ sharpness;  edgeB = (1 - clamp(b.f2 - b.f1)) ^ sharpness;
  field = sqrt(edgeA * edgeB);
  ```
  ```ts
  // src/scene/water.ts:20-24 — riak cincin Gaussian (ringkas)
  age = simTime - t0;  ring = radius - age*1.35;
  env = exp(-7*ring²) * exp(-1.3*age) * strength;
  h += sin(ring*22) * env;
  ```
- **Lisensi:** **tidak ada LICENSE**, package.json tanpa field license → **belajar saja, jangan salin kode.**
  (Algoritma Worley/Voronoi sendiri umum — tulis ulang dengan kode kita.) HDRI Poly Haven CC0.
- **Adaptasi:**
  - **WebGPU/TSL** → port ke GLSL WebGL2 (lihat Resep 1, ditulis ulang).
  - Frame-pure: caustics dan riak **sepenuhnya pure in t**. Shatter: pola Voronoi = pure dari seed; terbangnya
    pecahan di repo pakai Rapier (ber-state) → untuk video ganti dengan lintasan balistik closed-form per pecahan
    (`p = p0 + v0·t + ½g·t²`, rotasi `ω·t`).
  - Biaya: 2 lapis × 9 sel × 3 kanal RGB = 54 evaluasi sel per piksel → ringan di GPU (perkiraan < 2 ms 1080p).
  - Pemakaian: **layer cahaya kaustik** di atas kolase foto / peta laut / chapter card (blend `screen` atau
    `soft-light`, gain rendah); shatter radial untuk transisi "retak" (bukan grup cairan, tapi pola Voronoi-nya
    baru buat kita).
  - Risiko kiblat: warna default teal/biru → pakai **monokrom putih hangat**, opacity 0.12–0.3, jangan aksen.
- **Fit: 4/5.**

---

## argofowl/ferro-toggle

- **Tampilan:** saklar dark-mode berisi ferrofluid hitam mengilap: cairan ditarik magnet, berdiri jadi mahkota
  duri, lalu lapisan tinta hitam membanjiri permukaan.
- **Teknik:** raymarch SDF satu file WebGL2 · **duri ferrofluid**: cincin spike (1 + 6 + 12 + 17) dengan profil
  `r0·(1 − t)^1.55`, koreksi Lipschitz untuk duri miring · `smin` (sudah ada) untuk menyatukan badan, tetes,
  percikan · **rantai spring** head → body → tail → 2 tetes · **env softbox analitik** (`panel()`) untuk material
  hitam glossy · **ink-film flood** dengan depan bergerigi domain-warp + **meniscus** di tepi + cincin kejut ·
  tonemap neutral + grain + CA · SFX prosedural WebAudio (bisa `OfflineAudioContext`).
- **Mekanisme:**
  1. **Spike** (index.html:181–189): `q.xz -= lean·clamp(q.y,0,h)`; `r = r0·(1−t)^1.55 + 0.0022`;
     `d = (length(q.xz) − r)·kn` dengan `kn = 1/√(1 + s² + lean²)` → SDF tetap aman walau duri ramping/miring.
     Konstanta cincin (index.html:128–135): radius `[0, .155, .275, .372]`, jumlah `[1, 6, 12, 17]`,
     tinggi `[.66, .50, .335, .19]`, alas `[.13, .105, .08, .062]`, lean `[0, .15, .33, .56]`.
  2. **Crown** (index.html:192–249): sektor dipilih per sudut (`floor((ang − RO)/sector + .5)`), tiap duri dapat
     variasi tinggi `±9 %` dari hash dan "napas" `1 + 0.025·sin(t·2.2 + seed·2.39)`; tepi sektor dibulatkan supaya
     tidak ada lipatan di permukaan blend.
  3. **Badan cairan** (index.html:269–290): dua `sdRoundCone` (tail–body–head) di-`smin` k 0.14, dipipihkan
     `uSquash`, diberi riak `sin` kecil, lalu tetes `sdEll` dan 8 percikan bola, semuanya `smin`.
  4. **Gerak** (index.html:757–760, 837–845): spring semi-implicit
     `v += (−ω²(x − target) − 2ζωv)·dt; x += v·dt`; magnet ω 24 ζ 1 → head ω 26 ζ 0.5 → body ω 17 ζ 0.6 →
     tail ω 12.5 ζ 0.66 → dA ω 10 ζ 0.55 → dB ω 8.6 ζ 0.5. Tiap mata rantai mengejar yang di depannya → cairan
     molor lalu menyusul. Benturan ujung: `v *= −0.22` + event "plop".
  5. **Material hitam** (index.html:503–511): `col = 0.0045·(0.4+ao) + reflect(env)·fresnel(F0 0.06)·(0.3+0.7ao)`.
     Semua "kemewahan" ada di **env()** (index.html:372–386): latar gradasi gelap + 5–6 panel softbox persegi
     (intensitas 12–24) di arah berbeda → tiap kubah duri menangkap garis cahaya.
  6. **Ink flood** (index.html:388–410): `f = d + (n − 0.5)·(0.3 + 0.38·min(d,3)) − R` (noise domain-warp 2 oktaf,
     amplitudo naik dengan jarak → depan makin bergerigi saat menjauh); di pita `|f| < 0.12` normal dibengkokkan oleh
     gradien `f` dengan bobot `e^{−f²/0.0016}·0.9` → **tepi tinta menggembung dan menangkap cahaya**; cincin kejut
     `sin(k·26)·e^{−k²/0.03}` lewat normal.
- **Kenapa terasa mahal:** hitam pekat yang hanya "digambar" oleh pantulan softbox (seperti foto produk studio),
  plus tepi tinta yang memantulkan cahaya — detail kecil yang langsung terbaca sebagai cairan asli.
- **Kode inti:**
  ```glsl
  // index.html:362-371 — panel softbox di arah c, ukuran s (MIT, boleh port + atribusi)
  float panel(vec3 r, vec3 c, vec2 s, float soft) {
    float k = dot(r, c); if (k <= 0.0) return 0.0;
    vec3 u = normalize(vec3(c.z, 0.0, -c.x)); vec3 v = cross(c, u);
    vec2 q = abs(vec2(dot(r, u), dot(r, v)) / k);
    vec2 e = 1.0 - smoothstep(s - soft, s + soft, q);
    vec2 f = q / s;
    return e.x * e.y * (1.0 - 0.32 * dot(f, f));
  }
  // index.html:388-393 — depan tinta (f < 0 = di dalam film)
  float inkField(vec2 q) {
    float d = length(q - vec2(uInk.z, 0.0));
    vec2 w = vec2(vnoise(q*0.8 + 3.1), vnoise(q*0.8 - 7.3)) - 0.5;
    float n = vnoise(q*1.7 + w*2.4)*0.65 + vnoise(q*4.6 - w*1.6)*0.35;
    return d + (n - 0.5) * (0.3 + 0.38*min(d, 3.0)) - uInk.x;
  }
  ```
  Tonemap neutral: index.html:68–81 (`start 0.76`, `desat 0.07`); finish (vignette, sRGB, grain 0.014):
  index.html:87–93.
- **Lisensi:** MIT (© 2026 argofowl) → boleh port + atribusi.
- **Adaptasi:**
  - WebGL2 satu file → **cocok** untuk offscreen layer di engine 2D maupun three.js.
  - Frame-pure: render SDF pure terhadap uniform. Uniform berasal dari rantai spring (ber-state) →
    **deterministik sequential** (dt tetap 1/240 substep dari frame 0, murah di CPU; lihat Resep 5). Ink flood:
    `uInk.x = R(t)` → **pure**.
  - Biaya: raymarch + soft shadow + AO + 1 refleksi per piksel → berat di 1080p penuh (repo default render
    resolusi turun kecuali `?hq`); perkiraan tetap aman untuk render offline, tapi batasi ke area objek.
  - Pemakaian: **ink-flood sebagai transisi bab** (terang → gelap, "mode gelap", banjir/rob di peta) dan
    **objek hook** ferrofluid untuk topik magnet/hard disk/chip/"data ditarik"; env softbox untuk semua objek
    hitam glossy di engine three.js.
  - Risiko kiblat: rendah (hitam + highlight netral = calm-premium). Jaga glow aksen ≤ 1 %. **SFX `bubble()`
    (index.html:1130–1136) = sinus naik nada → masuk larangan "ting"**; yang boleh hanya grain/sweep/sub
    (noise berfilter, sub sweep).
- **Fit: 4/5.**

---

## spite/codevember-2026 — folder `3/` ("Melt")

- **Tampilan:** objek (Suzanne, hati, torus…) dilapisi cairan glossy: gumpalan merembes, mengalir turun,
  meninggalkan jejak basah, menggantung jadi tetes, jatuh ke genangan.
- **Teknik:** **p-norm blend kernel kompak** (gumpalan menyatu halus) · kernel anisotropik memanjang ke arah turun
  + menyempit ke ekor · **jejak basah** sebagai film datar dengan lebar ∝ √tebal · profil **tetes Young–Laplace**
  (RK4 shooting, ditabulasi) · genangan height-field dengan pinning · **cincin percik closed-form** · **env studio
  analitik** (key softbox, rim strip, flag gelap, *cards* dekat kamera) · roughness basah vs kering · wax SSS wrap.
- **Mekanisme:**
  1. Kernel gumpalan (3/materials.js:133–163): koordinat lokal (u turun, v samping, w normal); `s² = u²/ax² +
     v²/av² + w²/r²`; `h = k·(1 − s²)²`; sumbu ax pakai panjang ekor kalau u < 0, av menyempit (`TAPER 0.5`).
  2. Gabung: `H = (Σ h^p)^{1/p}` dengan `p = 2.5` (3/field.js:6 `BLOB_P`), gradien `grad = Σ(h^{p−1}·∇h)·H^{1−p}`
     (3/materials.js:250–259) → dua gumpalan dekat **menyatu tanpa lipatan**, gumpalan jauh tetap terpisah; jejak
     di-gabung di dalam rantainya dengan `CHAIN_P` lalu masuk ke p-norm yang sama.
  3. Jejak (3/materials.js:165–200): film datar tebal `th`, setengah lebar `trailAspect·√th`, ujung bebas
     di-smoothstep.
  4. Tetes menggantung (3/dropShape.js:26–40): integrasi RK4 `φ' = 2/b − z − sin φ / x` sepanjang busur → profil
     lensa → setengah bola → pir; leher sintetis lalu putus.
  5. Cincin percik genangan (3/materials.js:493–507): `x = (dist − 0.4·age)/0.035`,
     `g = w·e^{−x² − 3age}/(1 + 5age)`, hanya tampil setelah keluar dari kubah tetes.
  6. Env (3/reflectionEnv.js:34–58): langit-langit/dinding/lantai bergradasi lewat horizon, flag gelap di samping
     (memberi tepi pada metal), key softbox, rim strip, strip samping opsional, dan sampai 3 *card* kecil dekat
     kamera; panel = superelips (`(|x|⁴+|y|⁴)^{1/4}`) dengan pusat "hot". Dibake ke PMREM (import
     `PMREMGenerator` di baris 1). Untuk lacquer hitam (3/materials.js:8–12): 3 card kecil "supaya tiap kubah
     menangkap highlight, permukaan datar tetap hitam".
- **Kenapa terasa mahal:** fisika volume terasa benar (tetes jatuh dengan volume yang tadi tergambar) dan lighting
  studio foto produk: hitam tetap hitam, hanya bentuk lengkung yang menyala.
- **Kode inti (untuk belajar, jangan disalin):**
  ```glsl
  // 3/materials.js:154-162 dan :258-259 — kernel + p-norm (ringkas)
  float q = 1.0 - s2;             // s2 = jarak ellipsoidal ternormalisasi
  float h = k * q * q;            // kernel kompak, turunan 0 di batas
  float hp = pow(h, blobP - 1.0);
  sum += hp * h;  gsum += hp * dh;
  ...
  float H = pow(sum, 1.0 / blobP);
  grad = gsum * pow(H, 1.0 - blobP);
  ```
- **Lisensi:** **tidak ada LICENSE** di mirror (root hanya `.gitignore`, `index.html`, folder `3/`) →
  **belajar saja, jangan salin kode.** Catatan: `3/main.js` mengimpor `modules/pipeline/*` dan `common` yang
  **tidak ada di mirror** (PCSS, SSAO, motion blur, AgX di sana belum diverifikasi).
- **Adaptasi:**
  - three.js WebGL (GLSL `ShaderMaterial`/pipeline material, bukan TSL) → engine three.js kita cocok secara API.
  - Frame-pure: **tidak** — gumpalan berjalan di mesh dengan gravitasi, genangan berstate. Jalur: deterministik
    sequential (seed tetap, dt tetap, warm-up) atau bake posisi kernel per frame ke JSON. Cincin percik dan env
    studio = pure.
  - Biaya: kernel 96 gumpalan + 160 jejak dengan grid 8³ akselerasi → sedang; ada mode lite.
  - Pemakaian: **env studio + cards** untuk hero object di three.js (chip, ponsel, koin, logo 3D);
    **p-norm blend** sebagai alternatif `smin` untuk banyak blob (misal "data mencair", harga meleleh);
    cincin percik untuk momen "tetes jatuh" kecil.
  - Risiko kiblat: finish Candy/Blueberry jenuh → pakai Lacquer hitam atau Mercury; jangan wax kuning (kesan jadul).
- **Fit: 3/5.**

---

## akella/codevember-2026 — folder `03-melt/`

- **Tampilan:** topeng berongga melayang di atas lantai, "menangis" logam cair; tetes jatuh jadi percikan di
  lantai cermin; look berganti (chrome, silver, bronze, jade, amber).
- **Teknik:** raymarch SDF hasil bake (`tools/bake_sdf.mjs`) · walker CPU mengikuti gradien field ke bawah ·
  untaian menggantung yang menipis lalu jatuh · splat + droplet berpola jari-jari di height map lantai ·
  **matcap** (dari arah sinar, bukan sumbu kamera; bisa diputar) · **jade = absorpsi tebal**
  `exp(−σ·tebal)`, `σ = (6.5, 2.6, 4.2)` · lantai cermin = scene dari kamera yang dibalik ·
  **rekaman loop mulus** (`tools/film.mjs`).
- **Mekanisme:**
  1. Sim: `mulberry(seed = 7)` (src/drips.js:9–17), `advance(1/60)` dt tetap, `warm(steps)` (src/index.js:769–777)
     → **deterministik sequential**.
  2. **film.mjs** (tools/film.mjs:15–64): 60 fps, 25 s, `warm = 45·60` langkah (drip sudah jalan), mulai rekam
     `lead = seconds − fadeOut[0]` detik **sebelum t = 0**; frame negatif dipetakan ke ujung film
     (`index = f < 0 ? f + total : f`), jadi akhir film menyambung ke awal *termasuk tetesannya*. Kamera
     `degrees = −13·cos(2π·index/total)` (periodik). Tiap langkah sim, frame dirender **dua kali** (look A dan B)
     dari state yang sama; `film_blend.py` mencampur `k = ease(t; 9.5→12.5) − ease(t; 19.5→22.5)` (smoothstep).
     Render `dpr = 2` lalu Lanczos turun (AA untuk raymarch).
  3. Matcap (src/matcap.js:25–37): basis dari `view = −rd` (bukan sumbu kamera, supaya refleksi tidak meluncur di
     lensa lebar), `uv = rot(spin)·(x·n, y·n)·fit + 0.5`, `fit 0.495`. "Memutar matcap memindah lampu di sekitar
     bentuk" = cara tercepat mengatur letak highlight.
  4. Jade (src/index.js:131–161): `passes(th) = exp(−σ·th·depth)`; badan hijau tua + cahaya ruang tembus + backlit
     + polish (Fresnel `0.04 + 0.5(1−facing)^5`).
- **Kenapa terasa mahal:** material berganti tanpa gerak berubah (dua render dari state sama) → terasa seperti
  satu benda yang "berganti kulit"; loop tanpa jahitan.
- **Kode inti (belajar saja):**
  ```js
  // tools/film.mjs:50-60 (ringkas) — pre-roll + dua look per langkah
  for (let f = first; f < last; f++) {               // first = -lead*fps
    const index = f < 0 ? f + total : f;
    const degrees = -swing * Math.cos(2*Math.PI*index/total);
    if (t < fadeIn[1])  save(await shoot(from), `a${index}.jpg`);
    if (t >= fadeIn[0]) save(await shoot(to),   `b${index}.jpg`);
    await page.evaluate(() => window.__film.step());  // advance(1/60)
  }
  // film_blend.py: k = ease((t-in0)/(in1-in0)) - ease((t-out0)/(out1-out0)); Image.blend(a, b, k)
  ```
- **Lisensi:** **tidak ada LICENSE** (root package.json dan 03-melt/package.json tanpa field license) →
  **belajar saja, jangan salin kode.** `film.mjs` memakai puppeteer-core + path Chrome macOS → jangan dijalankan.
- **Adaptasi:**
  - **WebGPU/TSL** (`three/webgpu`, three 0.187) → risiko headless. Matcap dan absorpsi tebal mudah ditulis ulang
    di GLSL/three r186 (`MeshMatcapMaterial` three = jalur alternatif, belum diverifikasi apakah setara "dari arah
    sinar").
  - Frame-pure: sim = deterministik sequential; **pola rekamannya sendiri adalah pelajaran pipeline** (warm,
    pre-roll, dua look dari satu state, swing kamera periodik).
  - Pemakaian: loop latar bab yang mulus; **ganti material sebagai transisi** (objek yang sama: chrome → jade →
    kaca, saat narasi ganti sudut pandang); matcap untuk logo 3D murah tanpa lampu.
  - Risiko kiblat: chrome + gradient matcap bisa jadi "Y2K/AI template"; jade/amber jenuh → grade turun.
- **Fit: 3/5** (visual 2–3, pelajaran pipeline 4).

---

## Pola lintas repo

1. **Waktu yang bisa di-loop eksak.** Web-ocean dan Ultra-Water mengkuantisasi ω ke kelipatan `2π/LOOP`; akella
   merekam pre-roll lalu menyambung. Untuk kita: semua osilator latar (`sin(ωt)`) sebaiknya pakai ω yang
   dikuantisasi ke durasi shot kalau shot itu perlu loop.
2. **Hitam yang mahal = env, bukan material.** Ferro (`panel()` di env) dan spite (key + rim + flag + cards)
   sama-sama: material hitam hampir tanpa difus, semua bentuk "digambar" oleh pantulan beberapa softbox persegi.
   Card kecil dekat kamera = tiap kubah dapat satu titik highlight.
3. **Konservasi energi bikin realistis.** Caustics area-ratio rata-rata 1 (Ultra-Water), glint Poisson dibagi λ
   (mean 1), riak dispersif menjaga energi paket `√(w0/w)` (under-the-sea). Efek cahaya dikalikan, bukan ditambah
   putih → tidak "dicat".
4. **Threshold sebelum blur.** under-the-sea me-rank histogram lalu threshold sebelum mip; aquarium pow-sharpen
   F2−F1; ferro menajamkan tepi tinta pakai pita Gaussian. Pola umum: bentuk garis/celah ditentukan dulu, baru
   dihaluskan — celah gelap tetap gelap.
5. **Riak = paket gelombang closed-form dengan waktu event.** Empat repo punya riak (aquarium Gaussian ring, spite
   cincin genangan, Ultra-Water Cauchy–Poisson, under-the-sea paket dispersif). Semuanya fungsi `(jarak, umur)`
   → **pure in t** asalkan waktu event ditulis di timeline.
6. **Gerak cairan = rantai spring / walker dengan dt tetap dan seed tetap.** Ferro (spring chain), spite (walker
   + gravitasi), akella (walker + mulberry), aquarium (Rapier 60 Hz, seed terpisah dari timing render). Untuk kita
   = deterministik sequential + cache checkpoint.
7. **Finishing seragam:** bloom ringan → (desat highlight) → tonemap (AgX / neutral) → grain/dither tipis. Urutan
   ini sudah ada di colour-finish.md:42; yang baru: **AgX**, **desat highlight sebelum tonemap**, **TPDF dither**.
8. **WebGPU makin umum** (4 dari 7 repo). Ultra-Water dan ferro membuktikan WebGL2 masih cukup untuk kelas ini.

---

## Resep untuk engine kita

Semua kode di bawah ditulis ulang untuk kita (bukan salinan repo tanpa lisensi). Bagian yang di-port dari repo MIT
diberi atribusi di komentar.

### Resep 1 — Kaustik Worley sebagai layer cahaya (engine 2D lewat offscreen WebGL2)
- **Pakai untuk:** ambience bab bertema laut/air/peta maritim; chapter card; cahaya bergerak di atas kolase foto
  (blend `screen` 0.12–0.3 atau `soft-light`). Mekanisme dari wass08/aquarium (dipelajari, ditulis ulang).
- **Frame-pure:** ya, hanya `t`.
```js
// gl-layer.js — helper umum: makeGLLayer(w,h,fs) → draw(t, uni) mengembalikan canvas siap drawImage
export function makeGLLayer(w, h, fs) {
  const cv = new OffscreenCanvas(w, h), gl = cv.getContext('webgl2', { premultipliedAlpha: false });
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const p = gl.createProgram();
  gl.attachShader(p, sh(gl.VERTEX_SHADER, `#version 300 es
    void main(){ vec2 v[3]=vec2[3](vec2(-1,-1),vec2(3,-1),vec2(-1,3)); gl_Position=vec4(v[gl_VertexID],0,1);}`));
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p); gl.useProgram(p);
  return (t, uni = {}) => {
    gl.viewport(0, 0, w, h);
    gl.uniform2f(gl.getUniformLocation(p, 'R'), w, h); gl.uniform1f(gl.getUniformLocation(p, 'T'), t);
    for (const [k, v] of Object.entries(uni)) gl.uniform1f(gl.getUniformLocation(p, k), v);
    gl.drawArrays(gl.TRIANGLES, 0, 3); return cv;   // drawImage di task yang sama
  };
}
export const CAUSTIC_FS = `#version 300 es
precision highp float; out vec4 o; uniform vec2 R; uniform float T, sA, sB, sharp, gain, rgb;
vec2 h2(vec2 p){ return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453); }
vec2 wor(vec2 uv, float t){ vec2 c=floor(uv), l=fract(uv); float f1=9., f2=9.;
  for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){ vec2 g=vec2(x,y);
    float d=length(g + sin(h2(c+g)*6.2832 + t)*.36 + .5 - l); f2=min(f2,max(f1,d)); f1=min(f1,d); }
  return vec2(f1,f2); }
float edge(vec2 uv, float t){ vec2 a=wor(uv*sA + vec2(.33,.12)*t, t), b=wor(uv*sB - vec2(.20,.29)*t + 7.3, t*.83);
  return sqrt(pow(1.-clamp(a.y-a.x,0.,1.),sharp) * pow(1.-clamp(b.y-b.x,0.,1.),sharp)); }
void main(){ vec2 uv=gl_FragCoord.xy/R.y; float t=T*.32;
  o=vec4(vec3(edge(uv+vec2(rgb,0.),t), edge(uv,t), edge(uv-vec2(rgb,0.),t))*gain, 1.); }`;
// pakai: const cau = makeGLLayer(960,540,CAUSTIC_FS);  // setengah res cukup, diskalakan
// ctx.globalCompositeOperation='screen'; ctx.globalAlpha=.2; ctx.drawImage(cau(t,{sA:2.3,sB:3.7,sharp:18,gain:1.2,rgb:.004}),0,0,1920,1080);
```
- **Knobs:** `sA 2.3 / sB 3.7` (skala sel; naikkan = garis lebih rapat), `sharp 12–24` (ketebalan garis),
  `speed 0.32` (di `T*.32`), `rgb 0–0.012` (dispersi; 0 = monokrom aman kiblat), `gain`, opacity layer 0.12–0.3.
  Untuk loop: ganti scroll linear dengan lingkaran `r·(cos 2πT/L, sin 2πT/L)` dan `t` di `sin(...)` pakai ω
  kuantisasi.
- Catatan: hash `sin()` bisa beda tipis antar GPU (belum diverifikasi di mesin render kita); dalam satu mesin
  hasilnya deterministik.

### Resep 2 — Riak cincin sebagai refraksi di atas UI / foto / peta
- **Pakai untuk:** pin jatuh di peta lalu dampaknya menyebar; "satu kebijakan → efek ke mana-mana"; transisi
  lembut antar UI. Gabungan pola aquarium (cincin Gaussian), Ultra-Water (MIT, Cauchy–Poisson) dan under-the-sea
  (paket dispersif, dipelajari).
- **Frame-pure:** ya; waktu event `t0` ditulis di timeline.
```glsl
#version 300 es
precision highp float; out vec4 o;
uniform sampler2D img; uniform vec2 R; uniform float T;
uniform vec4 drops[4];            // x, y (px), t0 (s), kekuatan (0 = mati)
const float C = 700.0, LAM = 34.0, W = 46.0, DEC = 1.3, REFR = 10.0, SPEC = 0.5;
vec3 ripple(vec2 p) {             // (h, dh/dx, dh/dy)
  vec3 s = vec3(0.0); float K = 6.2832 / LAM;
  for (int i = 0; i < 4; i++) {
    vec4 d = drops[i]; float age = T - d.z;
    if (d.w <= 0.0 || age < 0.0) continue;
    vec2 dv = p - d.xy; float r = length(dv) + 1e-3, x = r - C * age;
    float env = exp(-x*x/(W*W) - DEC*age) * d.w;
    float dh = (cos(x*K)*K - sin(x*K)*2.0*x/(W*W)) * env;
    s += vec3(sin(x*K)*env, dv/r*dh);
  }
  return s;
}
void main() {
  vec2 p = gl_FragCoord.xy; vec3 r = ripple(p);
  vec2 uv = (p + r.yz * REFR * LAM) / R;              // geser sampel = refraksi
  vec3 c = texture(img, vec2(uv.x, 1.0 - uv.y)).rgb;  // canvas 2D di-upload tanpa flip
  vec3 n = normalize(vec3(-r.yz * LAM, 1.0));
  c += SPEC * pow(max(dot(n, normalize(vec3(-0.4, 0.5, 1.0))), 0.0), 80.0) * step(0.001, length(r.yz));
  o = vec4(c, 1.0);
}
```
- **Knobs:** `C` 500–900 px/s (kecepatan cincin), `LAM` 24–40 px (jarak puncak), `W` 30–60 px (tebal paket),
  `DEC` 1–2 (redaman), `REFR` (besar geseran), `SPEC` (kilau tepi, jaga netral). Versi dispersif: ulangi loop untuk
  3–5 komponen dengan `cg` sendiri dari `ω = √(gk + Tk³)` → gelombang panjang memimpin, kapiler di depan.
- Integrasi 2D: render frame 2D ke canvas sumber → `gl.texImage2D(..., sourceCanvas)` tiap frame → shader ini →
  `drawImage` balik (biaya upload 1080p per frame: beberapa ms, perkiraan).

### Resep 3 — Ink-flood wipe dengan tepi meniscus (transisi bab)
- **Pakai untuk:** pindah dari scene terang ke gelap (atau sebaliknya), banjir/rob menjalar di peta, reveal judul
  bab dari tinta. Di-port dari argofowl/ferro-toggle (MIT) — `inkField` + meniscus, diadaptasi ke 2D piksel.
- **Frame-pure:** ya, radius `R(t)`.
```glsl
#version 300 es
// Adapted from argofowl/ferro-toggle (MIT, (c) 2026 argofowl): inkField + meniscus normal bend.
precision highp float; out vec4 o;
uniform sampler2D A, B; uniform vec2 R, C; uniform float T, T0, T1, S, RMAX;
float hsh(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hsh(i),hsh(i+vec2(1,0)),f.x), mix(hsh(i+vec2(0,1)),hsh(i+1.),f.x), f.y); }
float field(vec2 px, float rad){ vec2 q=px/S; float d=length(q-C/S);
  vec2 w=vec2(vn(q*.8+3.1), vn(q*.8-7.3))-.5;
  float n=vn(q*1.7+w*2.4)*.65 + vn(q*4.6-w*1.6)*.35;
  return d + (n-.5)*(.3 + .38*min(d,3.)) - rad/S; }      // satuan S px
void main(){
  float u = clamp((T-T0)/(T1-T0), 0., 1.);
  float rad = mix(-S, RMAX, 1. - pow(2., -10.*u));          // ease-out expo
  vec2 p = gl_FragCoord.xy, uv = vec2(p.x/R.x, 1.-p.y/R.y);
  float f = field(p, rad);
  vec2 g = vec2(field(p+vec2(2,0),rad)-field(p-vec2(2,0),rad), field(p+vec2(0,2),rad)-field(p-vec2(0,2),rad))/4.;
  float aa = length(g) * 1.5 + 1e-4;
  vec3 c = mix(texture(A,uv).rgb, texture(B,uv).rgb, smoothstep(aa, -aa, f));
  float rim = exp(-f*f/0.0016);                             // pita meniscus (satuan S)
  vec3 n = normalize(vec3(-g*S*0.9*rim, 1.));
  c += rim * pow(max(dot(n, normalize(vec3(-.5,.6,1.))),0.), 24.) * 0.35;
  o = vec4(c, 1.);
}
```
- **Knobs:** `S` 120–220 px (skala noise; kecil = depan lebih rewel), amplitudo gerigi `0.3 + 0.38·min(d,3)`
  (naik saat menjauh), `T1−T0` 0.6–1.0 s (kiblat: cepat), `RMAX` > diagonal frame, kilau rim 0.2–0.4 (warna
  netral; boleh lime hanya bila itu satu-satunya aksen di frame). Tambahan opsional: cincin kejut setelah penuh
  (`sin(k·26)·e^{−k²/0.03}` lewat normal, ferro index.html:401–405).

### Resep 4 — Studio softbox + cards untuk objek hitam glossy (three.js r186)
- **Pakai untuk:** hero object (chip, ponsel, koin, logo 3D, ferrofluid) dengan look foto produk; hitam tetap
  hitam, lengkungan menyala. Fungsi `panel()` di-port dari ferro-toggle (MIT); ide flag + cards dari spite
  (dipelajari, tidak disalin).
- **Frame-pure:** env dibake **sekali** (pure); objeknya bergerak menurut `t` seperti biasa.
```js
// Adapted from argofowl/ferro-toggle (MIT, (c) 2026 argofowl): panel() softbox.
import * as THREE from 'three';
export function bakeStudioEnv(renderer, { key = [-0.42, 1, -0.4], cards = [] } = {}) {
  const dirs = [key, [0.5, 0.3, -1], ...cards.map(c => c.dir)].map(v => new THREE.Vector3(...v).normalize());
  const mat = new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false,
    uniforms: { D: { value: dirs }, S: { value: [[0.5, 0.28], [0.06, 0.6], ...cards.map(c => c.size)].map(s => new THREE.Vector2(...s)) },
                I: { value: [22, 6, ...cards.map(c => c.intensity)] }, N: { value: dirs.length } },
    vertexShader: `varying vec3 vd; void main(){ vd = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `varying vec3 vd; uniform vec3 D[5]; uniform vec2 S[5]; uniform float I[5]; uniform int N;
      float panel(vec3 r, vec3 c, vec2 s, float soft){ float k = dot(r,c); if (k <= 0.) return 0.;
        vec3 u = normalize(vec3(c.z,0.,-c.x)), v = cross(c,u);
        vec2 q = abs(vec2(dot(r,u), dot(r,v))/k), e = 1. - smoothstep(s-soft, s+soft, q), f = q/s;
        return e.x*e.y*(1. - .32*dot(f,f)); }
      void main(){ vec3 r = normalize(vd);
        float L = mix(.07, .30, smoothstep(-.15, .9, r.y));            // latar gelap bergradasi
        for (int i = 0; i < 5; i++) if (i < N) L += I[i] * panel(r, D[i], S[i], .02);
        gl_FragColor = vec4(vec3(L), 1.); }` });
  const sc = new THREE.Scene(); sc.add(new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), mat));
  const pm = new THREE.PMREMGenerator(renderer), tex = pm.fromScene(sc, 0).texture; pm.dispose();
  return tex;   // scene.environment = tex; material: MeshPhysicalMaterial({ color: 0x0b0b0c, roughness: .06, clearcoat: 1 })
}
// cards contoh (dekat kamera, kecil): [{ dir:[.65,.55,1], size:[.12,.12], intensity:6 }, { dir:[1,.05,.45], size:[.1,.3], intensity:4 }]
```
- **Knobs:** jumlah/posisi card (tiap card = satu titik highlight di tiap kubah), ukuran key (besar = highlight
  lebar lembut), latar 0.05–0.3 (hitam butuh latar gelap supaya terbaca hitam), roughness 0.03–0.08.
- Catatan: `PMREMGenerator.fromScene(scene, sigma)` dipakai sesuai pola spite `reflectionEnv.js` (import baris 1);
  signature persis di r186 dan array uniform `vec3 D[5]` di `ShaderMaterial` **belum diverifikasi** di engine kita
  — cek `motion-video-engine/references/engine-api.md` sebelum dipakai.

### Resep 5 — Sim cairan deterministik + loop mulus (rantai spring, walker, tetes)
- **Pakai untuk:** semua gerak cairan yang ber-state (rantai spring ferro, walker tetes, percikan) supaya tetap
  render per frame acak/berpotong (patch render Motion Studio) dengan hasil identik. Pola dari ferro (MIT, spring),
  akella (dipelajari: warm + pre-roll + dua look) dan web-ocean (MIT, ω kuantisasi).
- **Frame-pure:** deterministik sequential + cache checkpoint → `stateAt(f)` memberi hasil sama untuk f yang sama.
```js
// Spring: adapted from argofowl/ferro-toggle (MIT, (c) 2026 argofowl), index.html:757-760, 837-845.
const FPS = 30, SUB = 8, DT = 1 / (FPS * SUB);            // 240 Hz substep, tetap
const spring = (s, target, w, z, dt) => { s.v += (-w*w*(s.x - target) - 2*z*w*s.v) * dt; s.x += s.v * dt; };
const CHAIN = [[24, 1.0], [26, 0.5], [17, 0.6], [12.5, 0.66], [10, 0.55], [8.6, 0.5]];  // magnet→head→…→dB
function init() { return { links: CHAIN.map(() => ({ x: -1, v: 0 })) }; }
function step(s, tSec, targetAt) {                        // targetAt(t) = jalur magnet yang ditulis di timeline
  let tgt = targetAt(tSec);
  s.links.forEach((l, i) => { spring(l, tgt, CHAIN[i][0], CHAIN[i][1], DT); tgt = l.x; });
}
export function makeSim(targetAt, { every = 30, warm = 0 } = {}) {
  const ck = [structuredClone(init())];                   // ck[j] = state di frame j*every
  for (let i = 0; i < warm * SUB; i++) step(ck[0], (i - warm * SUB) * DT, targetAt);   // pre-warm
  return function stateAt(f) {
    let j = Math.min(Math.floor(f / every), ck.length - 1), s = structuredClone(ck[j]);
    for (let g = j * every; g < f; g++) {
      for (let k = 0; k < SUB; k++) step(s, (g * SUB + k) * DT, targetAt);
      if ((g + 1) % every === 0 && ck.length === (g + 1) / every) ck.push(structuredClone(s));
    }
    return s;
  };
}
// Loop eksak untuk osilator latar (web-ocean sim.js:146-148): w = Math.floor(w / w0) * w0, w0 = 2*Math.PI/LOOP.
// Loop untuk sim ber-state (pola akella film.mjs): sim mulai di -lead, frame [-lead,0) dipakai sebagai ekor film,
// crossfade smoothstep ke sana di [L-lead, L]; kamera periodik −A·cos(2π·f/total).
// Ganti material tanpa ganti gerak: render dua look dari stateAt(f) yang sama, campur dengan k(t).
```
- **Knobs:** pasangan `(ω, ζ)` per mata rantai (ω turun + ζ naik ke ekor = cairan molor lalu menyusul), `SUB`
  (≥ 8 supaya ω 26 stabil), `every` (jarak checkpoint), `warm` (detik sebelum frame 0), `lead` dan panjang
  crossfade untuk loop (akella: 3 s fade di film 25 s).
- Wajib: semua `Math.random` diganti PRNG ber-seed (mulberry32 seperti akella) — **jangan** sentuh waktu nyata.
