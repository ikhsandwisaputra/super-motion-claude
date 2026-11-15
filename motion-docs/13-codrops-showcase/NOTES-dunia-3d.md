---
group: dunia-3d
repos:
  - https://github.com/greggman/cyber-web-city@0f66ac6
  - https://github.com/jeantimex/tokyo@1984760
  - https://github.com/mrdoob/slop-newyork@2813185
  - https://github.com/billpwchan/sakura-fantasy@0d0562a
  - https://github.com/codrops/isle-thorne-collective@0d859ac
  - https://github.com/Emotion-Agency/emotion-halloween-2026@f0e214d
  - https://github.com/PabloMesquida/rock-demo@e3f7ac0
fetched: 2026-11-15
---

# NOTES — dunia-3d (kota prosedural, dunia, perjalanan kamera, atmosfer)

Dibaca read-only dari mirror di folder ini (tidak ada npm/build/script yang dijalankan). Semua klaim API/shader di
bawah diambil dari source mirror dengan pointer `file:line`; yang tidak bisa dicek di mirror ditandai **(belum
diverifikasi)**. Angka biaya render 1080p di sini **estimasi, belum diukur** kecuali disebut dari `performance.md` repo.

Konteks engine kita: chapter engine Canvas 2D (`aset/_template-longform/_chapter/src/engine.js`) memanggil
`scene.draw(ctx, t)` **K = 8 kali per frame** (motion blur sub-frame, `scene.K` bisa diubah) lalu `scene.post`.
Jadi semua yang mahal (Path2D, tabel kecepatan, geometri) dibangun **sekali di module load**, dan `draw` hanya lookup
murni dari `t`. WebGL2 offscreen yang di-`drawImage` juga ikut ter-render K kali: untuk bab WebGL berat pakai
`scene.K = 2–4`.

Cek "sudah ada" (rg di `motion-taste/references/{studio-tricks,transitions,light-atmosphere,experimental-motion,
colour-finish,eye-camera-space}.md` + `motion-video-engine/references/engine-api.md`): **sudah ada** = parallax 3 plane,
DOF, dolly/orbit kecil saat hold (eye-camera-space), rim light (light-atmosphere:17), halftone/dither shading
(light-atmosphere:37), urutan lens stack CA → bloom → vignette → tonemap → LUT → grain (colour-finish:42), grain,
aturan bake untuk efek ber-state (engine-api:78). **Belum ada** (baru): height fog analitik, aerial perspective,
sun shafts, split-tone/AgX, interior mapping, racing-line speed profile, arc-length rail, chase-cam wander, max/lighten
light map, peta Path2D + proyeksi ENU, colour script time-of-day, scotopic shift, rakit-kepingan, kawanan closed-form.

---

## greggman/cyber-web-city

- **Tampilannya:** terbang malam menembus megacity cyberpunk prosedural; kamera mobil terbang yang mengerem di
  tikungan, kabut tebal, fasad LED, hologram, hujan.
- **Teknik:** racing-line speed profile (batas akselerasi lateral + rem/gas) → tabel waktu→jarak; heading/bank
  low-pass dengan `SIM_DT` tetap; shot vocabulary yang di-blend smoothstep; chase-cam "wander" sinus tak
  sebanding; height fog eksponensial analitik yang warnanya = langit di horizon; interior mapping (kamar palsu di balik
  jendela); AgX + kurva hue-preserving; split-tone; tema sebagai data (palette/saturasi/gaudy).
- **Mekanisme:**
  - Konstanta jalur `src/camera/flight.ts:23–31`: `CRUISE 38 m/s`, `LATERAL_ACCEL 3.4`, `BRAKE 2.5`, `ACCEL 2.0`,
    `TABLE_DT 0.05`, `SIM_DT 1/30`, `HEADING_LAG 0.35`, `BANK_LAG 0.5`. Track = lurus + busur lingkaran eksak, lalu
    dihaluskan Gaussian σ 8 m ("seperti clothoid"). Kecepatan: `v = min(CRUISE, √(a_lat/κ))`, pass mundur (rem),
    pass maju (gas), integrasi → `timeToDist[]` (`flight.ts:244–269`).
  - Heading/bank (`flight.ts:336–337`): `kf = 1−exp(−SIM_DT/HEADING_LAG)`, bank target
    `clamp(atan(v²κ/9.81)·0.9, ±0.5)`, disimpan di Float32Array, `pose(t)` interpolasi → lookup murni.
  - Shot (`flight.ts:409–440`): 5 framing `{back, side, up, lookAhead, fov}`, mis. klasik `{11,0,2.6,6,55}`, low
    `{9,−2.2,0.5,10,60}`, high-wide `{18,5,4.5,4,48}`; `SHOT_LEN 22 s`, 4 s terakhir di-blend smoothstep. Closed form.
  - Wander (`flight.ts:537`): `0.65·sin(t·a+c) + 0.35·sin(t·b+2.3c)` dengan pasangan (0.21,0.57), (0.29,0.71),
    (0.16,0.43). Smoothing offset kamera relatif terhadap mobil (bukan dunia) → stateful.
  - Fog (`src/shaders/sky.wgsl:81–112`): `base = density·exp(−f·camY)`, `k = f·dirY·dist`,
    `integral = base·dist·(1−e^{−k})/k`, `fog = max(1−e^{−integral}, 1−e^{−dist/6500})`; warna kabut rendah =
    `sky_base(horizon)` dicampur glow kota, kabut tinggi/jauh → "steel". `main.ts:384–385`: `fogDensity 0.0009·theme`,
    `fogHeightFalloff 0.0022`. Langit juga ikut di-fog dengan skyDist 16000 (`composite.wgsl:173–203`).
  - Tema "ash" (`src/city/theme.ts:138–157`): `saturation 0.35`, palette `grey`, `gaudy 0.1`, `signs 0.35`,
    `windowsLit 0.6`, fogLow/High/skyHorizon abu kebiruan ~0.09–0.13, `fogDensity ×1.8`.
  - Interior (`src/shaders/facade.wgsl:104–150`): ray-box di tangent space, dinding belakang/plafon dengan panel lampu
    tiap 3.5 m, falloff `mix(1.15, 0.6, depth)`, siluet di bidang `zMid = room.z·(0.35+0.3·rand)`.
  - Post (`tonemap.wgsl`): split tone shadow `(0.97,1,1.03)` / highlight hangat via `smoothstep(0.05,0.6,l)`, bloom
    mix 0.12, grain di-quantize 24 Hz waktu scene; `agx.wgsl` AgX polinomial + varian hue-preserving.
- **Kenapa terasa mahal:** kamera berperilaku seperti kendaraan sungguhan (mengerem sebelum tikungan, miring sesuai
  fisika) dan kabut yang warnanya persis langit horizon menyatukan semua lapisan jarak jadi satu udara.
- **Kode inti** (`src/camera/flight.ts:248–268`):
  ```ts
  for (let k = 0; k < m; k++) {
    const c = Math.max(this.curvature(k * DS), 1e-5);
    vmax[k] = Math.min(CRUISE, Math.sqrt(LATERAL_ACCEL / c));
  }
  for (let k = m - 2; k >= 0; k--) {
    vmax[k] = Math.min(vmax[k], Math.sqrt(vmax[k + 1] ** 2 + 2 * BRAKE * DS));
  }
  vmax[0] = Math.min(vmax[0], CRUISE * 0.6);
  for (let k = 1; k < m; k++) {
    vmax[k] = Math.min(vmax[k], Math.sqrt(vmax[k - 1] ** 2 + 2 * ACCEL * DS));
  }
  let s = 0;
  this.timeToDist.push(0);
  while (s < this.totalLength - 200) {
    const f = s / DS;
    const k = Math.min(m - 2, Math.floor(f));
    const v = vmax[k] + (vmax[k + 1] - vmax[k]) * (f - k);
    s += Math.max(v, 1) * TABLE_DT;
    this.timeToDist.push(s);
  }
  ```
- **Lisensi:** MIT (Gregg Tavares 2026) → boleh port dengan atribusi di komentar. Tanpa data pihak ketiga (prosedural,
  seed). **Raw WebGPU, tidak ada jalur WebGL** → semua shader harus di-port ke GLSL/Canvas, jangan diharap jalan headless.
- **Adaptasi:**
  - Frame-pure? Tabel kecepatan + heading/bank = *deterministic precompute* (seed tetap, `SIM_DT` tetap) lalu lookup
    murni. `shotAt` = closed form. ChaseCamera smoothing = sequential → ganti dengan look-ahead jarak (efek low-pass
    yang sama, tapi murni). README punya param capture deterministik (`seed=`, `t=`, `paused=1`, `cam=`) → tanda
    penulisnya juga berpikir frame-pure.
  - Drive dari t: `s = sAt(t)` dari tabel, retime piecewise supaya tiba di "stasiun" tepat pada timestamp VO (Resep 2).
  - Biaya: rail-nya gratis (JS). Fog sebagai GLSL post ±0.1 ms. Kota neon-nya sendiri tidak kita port.
  - Tempat di film: hook 3D fly-through kolase, transisi antar-stasiun, perjalanan kamera di bab peta 3D.
  - Kiblat risk: **tinggi** untuk tampilan (neon/LED/hologram). Ambil tekniknya, buang neon: pakai pola tema-as-data
    ala "ash" (sat 0.35, gaudy 0.1), lampu hangat netral, satu aksen lime di satu elemen saja.
- **Fit: 4/5** (rail + fog sangat cocok; visual asli off-kiblat; port WebGPU→GLSL wajib).

## jeantimex/tokyo

- **Tampilannya:** Tokyo nyata (PLATEAU 3D + OSM + DEM 5 m + foto udara) dengan jam bebas: siang berkabut biru,
  senja oranye, malam lampu jalan, burung beterbangan, sungai memantul.
- **Teknik:** ramp senja berbasis elevasi matahari (lampu menyala sebelum gelap); auto-exposure ber-clamp; grade
  shader (S-curve parsial, saturasi, split tone, vignette); burung GPU closed-form dengan orientasi dari beda-hingga;
  light map lampu jalan top-down dengan blend **max** (tumpang tindih tidak menumpuk jadi silau).
- **Mekanisme:**
  - Ramp (`src/world/environment.js:118–126`, `smoothstep(deg, min, max)` pada elevasi matahari):
    `night = 1−s(0,9)`, `dark = 1−s(−13,5)`, `daylight = s(−5,9)`, `moonlight = 1−s(−14,−5.5)`,
    `warmth = 1−s(3,24)`; matahari tak pernah grazing (`y ≥ 0.06`).
  - `EXPOSURE {target 1.8, least 0.38, most 1.7}`, `BLOOM {day 0.12, night 0.45}` (`environment.js:21–22`); exposure =
    `clamp(target/light, least, most)`.
  - Urutan pass (`src/world/atmosphere.js:214–257`): Render → window reflections → N8AO (radius 7, intensity 2.6,
    half-res) → fog → clouds + aerial perspective → sky → lens flare → final (bloom 0.5/threshold 0.9, curve, grade,
    dithering) → SMAA. Warna: `FOG_DAY (0.72,0.75,0.79)`, `HAZE_DAY (0.56,0.68,0.86)`, `HAZE_WARM (1.05,0.56,0.3)`,
    `FOG_NIGHT (0.035,0.04,0.055)`.
  - Burung (`src/world/birds.js:62–83`): `place(t, flock, perch)` di vertex shader; pusat kawanan
    `reach·sin(t·(0.05+0.06·hash)+2π·hash)`, tinggi `22+230·hash²+14·sin(0.05t+…)`; tiap burung lingkaran radius
    `8+55·seed`; arah hadap dari `place(uTime+0.25) − place(uTime)`.
  - Lamp map (`src/world/lamplight.js:29`): `blendEquation: THREE.MaxEquation`, ortho top-down 2048².
- **Kenapa terasa mahal:** urutan senja yang benar secara fisik (lampu dulu, gelap belakangan) dan kabut/haze yang
  berubah warna dengan matahari — penonton merasakan "jam" tanpa diberi tahu.
- **Kode inti** (`environment.js:122–126` + `atmosphere.js:34–38`):
  ```js
  this.night = 1 - step(deg, 0, 9);
  this.dark = 1 - step(deg, -13, 5);
  this.daylight = step(deg, -5, 9);
  this.moonlight = 1 - step(deg, -14, -5.5);
  this.warmth = 1 - step(deg, 3, 24);
  ```
  ```glsl
  g = mix(g, g * g * (3.0 - 2.0 * g), 0.4 * amount);                 // S-curve parsial
  // (35–36: saturasi mix(vec3(l), g, 1 + 0.16*amount))
  g += amount * (vec3(0.03, 0.012, -0.022) * smoothstep(0.45, 1.0, l)
               + vec3(-0.016, 0.0, 0.026) * (1.0 - smoothstep(0.0, 0.45, l)));   // split tone
  g *= 1.0 - 0.26 * amount * smoothstep(0.35, 1.0, length(uv - 0.5) * 1.3);       // vignette
  ```
- **Lisensi:** kode MIT (Yong Su). **Data tetap ikut lisensi sumbernya** (README:170–179): PLATEAU (MLIT Japan), GSI,
  © OpenStreetMap contributors **ODbL** (database turunan juga ODbL), Poly Haven CC0, ez-tree MIT, takram MIT.
  Syarat PLATEAU/GSI rinci **(belum diverifikasi)**.
- **Adaptasi:**
  - Frame-pure? Ramp & grade = murni. Burung = closed form jika seed di-PRNG (sekarang `Math.random` di `birds.js:32`
    dan state machine kawanan di CPU `:115–137`) dan `perch` dikunci aloft. `bakeEnvironment` di-throttle pakai
    `performance.now()` → ganti dengan "re-bake tiap N frame". Awan takram kemungkinan temporal **(belum
    diverifikasi; tidak ada node_modules di mirror)** → jangan dipakai, atau bake.
  - Biaya: `performance.md` (repo, diukur headless Chrome 4K RTX 5090): radius 900 m siang 3.6 ms / malam 9.6 ms;
    seluruh kota malam 32.9 ms, CPU-bound oleh draw call. Kita cuma port ramp/grade/max-blend → murah.
  - Tempat di film: colour script per bab (Resep 4); peta malam Indonesia dengan titik lampu kota `lighten` (bukan
    `lighter`) supaya Jabodetabek tidak jadi blob putih; burung/kawanan titik sebagai ambience di kolase langit.
  - Kiblat risk: rendah (palet natural). Hati-hati bloom malam 0.45 → turunkan supaya neon tetap ≈1 %.
- **Fit: 3/5** (tekniknya berguna, tapi stack-nya berat dan datanya Jepang; kita ambil resepnya saja).

## mrdoob/slop-newyork

- **Tampilan:** Manhattan nyata dari data terbuka: kota 3D WebGPU dengan 11 preset kamera, plus peta 2D Canvas yang
  rapi gaya kartografi gelap (blok, taman, dermaga, footprint gedung tiga tone).
- **Teknik:** proyeksi local tangent plane (ENU, radius WGS84) + rotasi ke grid jalan + origin di persimpangan
  bernama; kuantisasi 0.5 m; inferensi tinggi gedung dari tag OSM; ekstrusi footprint (quad dinding per edge + tutup
  `triangulateShape`) di-merge per sel; **peta Canvas2D world-metre**: Path2D per layer, tile 500 m dengan culling
  bounds, kamera = satu `setTransform`, `px(n) = n/s` untuk lebar garis, LOD by scale, jalan = ruang negatif antar blok;
  label jalan menempel di dunia (tiap ~260 m, tak pernah terbalik).
- **Mekanisme:**
  - Proyeksi (`tools/geo-base.mjs:25–49`): `NRAD = A/√(1−e²sin²φ0)`, `MRAD = A(1−e²)/(1−e²sin²φ0)^1.5`,
    `KX = π/180·NRAD·cosφ0`, `KY = π/180·MRAD`; rotasi `THETA` = median berbobot panjang dari bearing avenue (segmen
    ≥ 60 m, mod 180°, `:285–319`) → 29.02°; `ORIGIN` = titik temu "5 AVE" & "42 ST".
  - Data (`js/nyc-geodata.js`, 1.1 MB hasil generate): `GEO = {frame:{bearingDeg, units:'m', …}, manhattan, boroughs,
    streets, avenues, roads[3246], roadGraph, blocks[2691], parks[116], piers, bridges, landmarks, points}`; semua
    polygon/polyline flat `[x0,z0,x1,z1,…]` dalam meter.
  - `tools/build-osm.mjs`: `PRECISION 0.5` (`:30`); tinggi gedung (`:103–116`): tag `height` → `(levels+roof:levels)
    ·3.2 m` → default per jenis (house 2 lantai) → fallback 3 lantai; skip underground/`min_height>0`; ring
    disimplifikasi eps 0.25 lalu dibulatkan ke grid 0.5 (`:198`). `PORTING.md`: script yang sama jalan untuk kota OSM
    mana pun (`--bbox --bearing --origin`); gaya fasad dari tahun bangun (<1945 masonry, 1945–79 campuran, ≥1980 kaca).
  - Ekstrusi (`js/building-footprints.js:40–110`): per edge 4 vertex, normal `(−dz, dx)/w`, sampling tinggi party wall di
    t 0.15/0.5/0.85; tutup `THREE.ShapeUtils.triangulateShape(rings[0], rings.slice(1))`.
  - Peta 2D (`js/nyc-map.js`): `addRing` membetulkan winding (hole dibalik) `:133–145`; `TiledLayer(500)` + `each(view)`
    culling `:160–200`; `world(ctx)` `:355–358`; urutan gambar `:755–830`: land → pier → Manhattan (warna jalan) →
    taman → blok (stroke kalau `s ≥ 0.22`) → park blocks (`s ≥ 0.1`) → footprint 3 tone menurut tinggi (`h > 95`, `> 45`)
    kalau `s ≥ 0.18`, edge kalau `s ≥ 0.6`. Palet `:44–62`: water `#0a1118`, land `#151a20`, gedung
    `#242a32/#2b323c/#343c48`.
  - Kamera 3D "drone" (`js/cameras.js:314–324`) closed form: `angle = 0.07t+0.65`, `r = 720+140·sin(0.23t)`,
    `alt = 330+90·cos(0.19t)`. Fog udara (`js/lighting.js:226–247`): warna = env PMREM di arah horizon, densitas rata
    `(ea−eb)·H/dy` (H 900), `factor = 1−exp(−τ²)`; preset golden `fogDensity 0.00024` (`:26–62`).
- **Kenapa terasa mahal:** peta yang **benar secara geometri** (meter nyata, grid lurus ke layar, garis selalu 1 px
  berapa pun zoom-nya) dan detail yang muncul bertahap sesuai zoom — itu kualitas kartografer, bukan template infografik.
- **Kode inti** (`tools/geo-base.mjs:31–49` + `js/nyc-map.js:357`, `:755`):
  ```js
  const NRAD = A / Math.sqrt(1 - E2 * SIN0 * SIN0);
  const MRAD = (A * (1 - E2)) / Math.pow(1 - E2 * SIN0 * SIN0, 1.5);
  const KX = (Math.PI / 180) * NRAD * Math.cos(PHI0);
  const KY = (Math.PI / 180) * MRAD;
  const enu = (lon, lat) => [(lon - LON0) * KX, (lat - LAT0) * KY];
  function gridUV(lon, lat) {
    const [e, n] = enu(lon, lat);
    const c = Math.cos(THETA), s = Math.sin(THETA);
    return [e * c - n * s, -(e * s + n * c)];
  }
  // nyc-map.js
  ctx.setTransform(s * dpr, 0, 0, s * dpr, dpr * (this.w * 0.5 - this.cx * s), dpr * (this.h * 0.5 - this.cz * s));
  const px = (n) => n / s; // screen pixels -> metres (line widths)
  ```
- **Lisensi:** kode MIT (Mr.doob 2026). Data: NYC Open Data (footprint/tinggi `5zhs-2jue`, pohon `hn5i-inap`), MTA
  subway entrances, DCP/CSCL/Parks, © OSM (**ODbL**) — README: data pihak ketiga tetap lisensi masing-masing. Syarat
  NYC Open Data **(belum diverifikasi)**. `nyc-geodata.js` = database turunan OSM+NYC → **jangan disalin ke film**.
  3D memakai `WebGPURenderer` + TSL via CDN r187 (`js/main.js:84–92`); fallback WebGL2 ada di three, tapi engine kita
  r186 → port ke GLSL. Peta Canvas2D = 2D murni, langsung pakai.
- **Adaptasi:**
  - Frame-pure? Ya. Path2D dibangun sekali; `draw(ctx,t)` cuma `setTransform` dari `cam(t)` + fill/stroke. Proyeksi &
    ekstrusi = precompute.
  - Untuk Indonesia: skala negara (95°–141° BT, ~5.100 km) pakai equirectangular dengan `cos(φ0)` (φ0 ≈ −2.5°,
    cos ≈ 1, distorsi kecil karena dekat ekuator); skala kota pakai ENU + rotasi ke grid jalan dominan (Jakarta tidak
    punya grid tunggal → `THETA = 0`, atau median bearing jalan utama Sudirman–Thamrin). Data kandidat: Natural Earth
    (public domain) untuk negara/provinsi, OSM (ODbL, atribusi) untuk jalan kota — **di luar mirror, cek lagi lisensi
    sebelum pakai**.
  - Biaya: estimasi ribuan Path2D fill di 1080p × K 8 masih ringan bila di-tile + di-cull; footprint ribuan gedung
    → pakai LOD seperti repo.
  - Tempat di film: semua bab peta (Indonesia vs negara lain, zoom ke kota, data di atas peta), chapter card berlatar
    peta, hook zoom-from-space ke kota.
  - Kiblat risk: rendah — palet gelap tenang, satu aksen lime untuk wilayah yang dibahas.
- **Fit: 5/5** (paling langsung menaikkan kualitas map animation kita).

## billpwchan/sakura-fantasy

- **Tampilan:** perahu menyusuri lembah sungai Jepang 4 musim pada jam apa pun: kabut tipis di air, avenue sakura,
  jembatan, desa pagoda, ngarai bambu, 41 torii; kabut ketinggian + god rays.
- **Teknik:** dunia ditulis sebagai **tabel kontrol di sepanjang jalur** (Catmull-Rom); terrain = fungsi jarak bertanda
  dari air (kamera tak pernah menabrak); path perahu arc-length; **progres perjalanan → jam** (colour script di data);
  6 jenis shot relatif subjek dengan `u ∈ [0,1]`; fog eksponensial analitik + kabut air; sun shafts depth-mask 2 pass;
  grade post (CA, scotopic, split, grain).
- **Mekanisme:**
  - `src/world/layout.js:1–150`: baris CP `[z, x, w, v, d, cliff]` (26 baris, z 700 → −2900); x via Catmull-Rom,
    lainnya smoothstep; tepi sungai ber-fbm supaya tidak pernah sejajar; `waterSd` jarak bertanda (danau + pulau);
    bukit `foot·(…) + ridged·210·smoothstep(90,520,t)`, cap 330.
  - `src/journey/journey.js:10–55`: centreline sampel tiap 2 m, box-smooth ±8, Bézier ke danau, orbit pulau 160 titik
    (R 80), tabel arc-length, `cruise 4.6 m/s`. Tabel jam `:44–47`
    `[[0,5.75],[0.06,6.6],[0.16,8.4],[0.3,11.2],…,[0.92,21],[1,22]]`, `hourAt` smoothstep antar key (`:80–87`).
  - Shot (`src/journey/camera.js:89`, `:128–160`): `['low','crane','bank','bow','aerial','beside']`, dur 9.5 s (bank 11),
    sisi bergantian; mis. crane `y = 4+16u`, mundur `6+12u`, look maju `4+25u`; aerial berputar `0.4+0.8u` rad di r 34,
    turun `26−6u`. Selalu ≥ terrain+0.45. Lerp `1−exp(−dt·6)` (sequential).
  - Fog (`src/core/shared.js:23–25`, `:94–121`): `uFogParams (0.00035 haze/m, 0.012 k, 0.035 falloff)`,
    `uFogSun (1,0.7,0.4)`, `uFogAway (0.4,0.5,0.6)`; warna fog `mix(away, sun, pow(s,5)·0.75 + pow(s,40)·0.6)`.
  - Post (`src/core/post.js`): shaft mask `:82–97` (sky = depth ≥ 0.99999, radial falloff), blur 12 tap w·0.93, dua
    pass step 0.055 lalu 0.018 di quarter-res `:99–114`; composite `:160–208`: CA 0.0015, bloom mix 0.05, scotopic
    `:185–186`, ACES, split shadow `(0.94,1,1.04)` / high `(1.04,1,0.93)`, sat 1.06, vignette 0.55, grain 0.018 (+0.012
    malam).
  - Bonus sound design (`src/main.js:326`, `:330`): delay bunyi petir/kembang api = `d/343` (kecepatan suara).
- **Kenapa terasa mahal:** setiap tempat punya jam dan udaranya sendiri, dan kamera bergerak seperti kru film (crane,
  bank, bow) relatif terhadap subjek — bukan orbit acak.
- **Kode inti** (`src/core/shared.js:94–100`, `:112–121`):
  ```glsl
  float sfExpLayer(float k, float b, float y0, float dy, float dist){
    float h0 = k * exp(-b * y0);
    return abs(dy) > 0.01 ? h0 * (1.0 - exp(-b * dy)) / (b * dy / dist) : h0 * dist;
  }
  float od = uFogParams.x * dist + sfExpLayer(uFogParams.y, uFogParams.z, ro.y, dy, dist);
  vec3 sfFogColor(vec3 rd){
    float s = max(dot(rd, uTrueSun), 0.0);
    float glow = pow(s, 5.0) * 0.75 + pow(s, 40.0) * 0.6;
    return mix(uFogAway, uFogSun, glow);
  }
  vec3 sfAtmos(vec3 col, vec3 wp){
    vec3 v = wp - cameraPosition; float dist = length(v); vec3 rd = v / max(dist, 1e-4);
    float T = exp(-sfOptical(cameraPosition, rd, dist));
    return col * T + sfFogColor(rd) * (1.0 - T);
  }
  ```
- **Lisensi:** kode MIT (Bill Chan). `CREDITS.md`: tanaman CC0 (scan ffish.asia/floraZia), Poly Haven & ambientCG CC0,
  **patung CC BY 4.0 (wajib atribusi kalau dipakai)**; tidak ada NC/ND. WebGL2, three r186 = sama dengan engine kita.
- **Adaptasi:**
  - Frame-pure? Terrain/sungai/fog/grade = fungsi murni posisi + `uTime`. Shot = closed form dalam `u` (buang lerp
    exp atau precompute). 44 `Math.random` di `src` → ganti `rng(seed)` mulberry32 yang sudah ada di
    `src/lib/math.js:9–11`. URL param `h`, `s`, `z`, `cam`, `look` (`src/main.js:201–220`) menunjukkan scene bisa
    ditaruh di jam/posisi pasti.
  - Biaya: fog GLSL murah; shaft quarter-res 2 pass ±0.3 ms (estimasi). Terrain + vegetasi penuh berat → kita pakai
    resep fog/shaft/grade saja.
  - Tempat di film: ambience dunia kolase (kabut menyatukan lapisan foto), colour script per bab, shot vocabulary untuk
    stasiun 3D, delay suara = jarak/343 untuk SFX "dampak jauh".
  - Kiblat risk: kecil; sun veil/bloom jangan sampai jadi "glow neon"; grain kecil OK (bukan film jadul).
- **Fit: 4/5.**

## codrops/isle-thorne-collective

- **Tampilan:** template toko furnitur Astro; bukan dunia 3D. Yang relevan: library transisi halaman "Interlude"
  (WebGL: channel, dissolve, dither, ink, particles, spiral, velvet; DOM: curtain, peel, slices, stack, tear, wipe, …).
- **Teknik:** shader cakupan per piksel `alpha = f(position, progress)`; tirai velvet prosedural (lipatan sinus +
  normal palsu + sheen, hem mengekor saat bergerak); dither Bayer 4×4 bertingkat (kotak besar → kecil, tiap kotak punya
  momen sendiri).
- **Mekanisme:**
  - Kontrak (`src/lib/interlude/webgl.ts:1–60`): input `position` (y 0 atas..1, x 0..aspect), `origin`, `progress`
    0→1, `reveal`, `direction`, `aspect`, `time`; output `alpha` atau `{alpha, color}`. Helper `below(field, threshold,
    softness)` = tepi anti-alias pakai `fwidth` (`:72–75`); `reach(origin)` = jarak ke sudut terjauh.
  - Velvet (`src/transitions/velvet.ts:33–134`): `FOLDS 10`, `DEPTH 0.5`, `TRAIL 0.3`, `SWAY 0.35`, `SHEEN 0.35`,
    `DIM 0.55`, durasi 1.2 s `power2.inOut`. Tepi `travel = mix(aspect+PAD, −PAD, progress)` + `trail = y^1.5·TRAIL·
    sin(π·progress)` (hem mengekor paling jauh di tengah gerak) + ripple noise. Lipatan rapat saat terkumpul, renggang
    saat terbuka (`across = inside/(aspect−edge)`); `fwidth(phase)` meratakan lipatan yang lebih rapat dari piksel (anti
    flicker). Halaman di sampingnya meredup (lampu gedung turun).
  - Dither (`src/transitions/dither.ts:19–86`): `LEVELS [{1/8, 0.4}, {1/16, 0.5}, {1/32, 1}]`, `STAGGER 0.16`,
    `FILL 0.2`, `DOTS 256`/tinggi layar; `bayer(x,y)` dari 2×2 `(2x+3y) mod 4`; `density = max(levels)`;
    `step(bayer(dot), density)`.
- **Kenapa terasa mahal:** detail fisik kecil yang jujur (hem mengekor sesuai kecepatan, lipatan tak berkedip, ruang
  meredup) membuat transisi terasa seperti benda, bukan wipe.
- **Kode inti** (`src/transitions/velvet.ts:66–72`, `dither.ts:60–75`):
  ```ts
  const travel = mix(aspect.add(PAD), float(-PAD), progress);
  const moving = sin(progress.mul(Math.PI));
  const way = mix(float(1), float(-1), reveal);
  const trail = pow(y, 1.5).mul(TRAIL).mul(moving).mul(way);
  const ripple = mx_noise_float(vec3(y.mul(2.5), time.mul(0.4), 0)).mul(0.008);
  const edge = travel.add(trail).add(ripple);
  // dither: tiap kotak ukuran ini punya momen sendiri
  const takesPart = step(hash(id), share);
  const moment = hash(id.add(50021)).mul(span).add(level * STAGGER);
  const filled = clamp(progress.sub(moment).div(FILL), 0, 1);
  density = max(density, takesPart.mul(filled));
  ```
- **Lisensi:** MIT (Codrops 2026). README Credits: peel terinspirasi eminente.art, stack dari situs Olga Prudka, frame
  dari situs Benoît Marzouvanlian, corner dari post Oli di X, typewriter dari The Manifest (Studio Freight) — level ide,
  bukan kode. Foto = stand-in hasil AI; desain Elena Smirnova dipakai dengan izin → **jangan pakai foto/desainnya**.
  Font Instrument Sans OFL. TSL lewat `WebGPURenderer` dengan fallback WebGL2 (`webgl.ts` `forceWebGL: !adapter`).
- **Adaptasi:**
  - Frame-pure? Ya: `progress = ease(inv(t0, t1, t))`, `time = t`. Port TSL → GLSL fragment (offscreen WebGL2) atau,
    untuk dither, Canvas2D: isi kotak per level dengan `hash(id)` seeded, lalu pola Bayer via `createPattern` 4×4.
  - Biaya: satu fullscreen quad, sangat murah.
  - Tempat di film: transisi bab (dither kotak besar→kecil cocok gaya editorial; sudah dekat dengan "halftone/dither
    shading" yang sudah ada, yang baru adalah dither sebagai **coverage transisi bertingkat**); konsep hem mengekor
    `trail ∝ sin(π·p)` bisa dipakai untuk wipe foto/kertas apa pun.
  - Kiblat risk: velvet merah = teatrikal, warna wajib diganti (tinta gelap + aksen lime di tepi); "channel" (TV
    statis) = vintage → **jangan** (no-vintage rule).
- **Fit: 3/5** (bukan dunia 3D, tapi dua transisinya berguna).

## Emotion-Agency/emotion-halloween-2026

- **Tampilan:** labu jack-o'-lantern prosedural di hutan berkabut bulan; bisa dihancurkan lalu **merakit dirinya bata
  demi bata**; hantu, poster tipografi yang digambar GPU.
- **Teknik:** rakit ulang berurutan (urut baris lalu sudut sapuan, jeda 0.03 s per keping, jalur Bézier kuadrat yang
  terangkat, rotasi "duduk" sebelum mendarat, event `lock` per keping); intro orbit 360° ease-out cubic sambil
  mendekat & turun; kabut volumetrik ground-hugging 18 step dengan offset Bayer, 1/3 res + blur; flicker lilin dari
  jumlah sinus tak sebanding; poster: posisi huruf diukur dari layout DOM lalu digambar ulang di shader.
- **Mekanisme:**
  - Rebuild (`src/pumpkin.js:449–468`, `:709–725`): sort `rb − ra` per baris (tutup paling akhir), lalu
    `wrapAngle(angle − 2.4)`; `delay = i·0.03 (+0.35 tutup)`; tiap keping `dur = 0.75 + rand·0.25`; `ctrl` = tengah
    antara posisi sekarang & rumah + `dir·(0.35+0.2r)` + `y += 0.45+0.2r`; posisi = Bézier kuadrat dengan `easeInOut`,
    rotasi `slerp` ke identitas pakai `smooth01(min(1, t·1.15))` (selesai ±13 % lebih cepat); di akhir `emit('lock')`
    + kecepatan kecil ke dalam (efek "klik masuk").
  - Intro (`src/main.js:462`, `:494–525`): `INTRO {length 2.6, far 0.6, rise 0.26, settle 1.2}`;
    `out = 1−(1−u)³`; `turned = 2π·out`, `far = 0.6·(1−out)`, `rise = 0.26·(1−out)`.
  - Fog (`src/environment.js:608–634`): `VolumeNodeMaterial`, `steps 18`, `offsetNode = bayer16(screenCoordinate)`;
    densitas `exp(−max(y,0)/0.45)·(fbm·1.6+0.2) + 0.16`, drift `time·(0.07, 0.015, −0.04)`; pass sendiri 0.33 res,
    `gaussianBlur`, ditambahkan ×5 (`main.js:233–270`). Fog jarak `rangeFogFactor(4, 34)` warna `0x0d1320`.
  - Post (`main.js:96–97`, `:296`, `:351`): ACES exposure 1.05, bloom (0.55, 0.45, 0.62), grain hash 0.035.
- **Kenapa terasa mahal:** perakitan punya **urutan yang bisa dibaca mata** (sapuan melingkar, baris demi baris) dan
  tiap keping punya irama sendiri yang berakhir di "klik" — terasa seperti mesin presisi.
- **Kode inti** (`src/pumpkin.js:453–465`, `:711–717`):
  ```js
  order.sort((a, b) => {
    const ra = a.type === 'lid' ? -10 : a.row, rb = b.type === 'lid' ? -10 : b.row;
    if (ra !== rb) return rb - ra;
    return wrapAngle(a.angle - 2.4) - wrapAngle(b.angle - 2.4);
  });
  order.forEach((p, i) => { p.delay = i * 0.03 + (p.type === 'lid' ? 0.35 : 0); p.pendingReturn = true; });
  // stepReturn
  p.t += dt / p.dur;
  const t = Math.min(1, p.t);
  const e = easeInOut(t);
  const a = (1 - e) * (1 - e), b = 2 * (1 - e) * e;
  p.p.set(0, 0, 0).addScaledVector(p.p0, a).addScaledVector(p.ctrl, b);
  p.q.slerpQuaternions(p.q0, _q.identity(), smooth01(Math.min(1, t * 1.15)));
  ```
- **Lisensi:** MIT (Emotion Agency 2026). Model/tekstur/HDRI Poly Haven CC0; cdt2d & polygon-clipping MIT. Font
  **Thunder** (gumroad) — lisensi tidak ada di mirror → **jangan pakai fontnya**. WebGPURenderer + TSL, fallback WebGL2
  (README) → port GLSL.
- **Adaptasi:**
  - Frame-pure? Rebuild = closed form kalau posisi awal (`p0`) dari scatter seeded, bukan hasil fisika ledakan
    (`burst` = sim, kalau mau dipakai → bake). `p.t += dt/dur` diganti `u = (t − T0 − delay)/dur`. Intro orbit =
    closed form. Fog volumetrik = murni per frame tapi berat → di 2D cukup lapisan noise.
  - Biaya: rakit kepingan Canvas2D ratusan keping × K 8 ringan (estimasi). Volumetric 18 step 1/3 res di WebGL2 ±1 ms
    (estimasi).
  - Tempat di film: **data reveal** — peta Indonesia dirakit dari provinsi, bar chart dari bata, logo/perangkat dari
    potongan; event `lock` = daftar cue SFX non-tonal (thock/klik, bukan "ting"). Intro orbit 360° = hook objek.
  - Kiblat risk: tampilan Halloween (oranye-hitam, hantu) off-kiblat; tekniknya netral.
- **Fit: 3/5** (teknik rakit = 4, repo sebagai keseluruhan 3).

## PabloMesquida/rock-demo

- **Tampilan:** batu berputar di studio gelap, batu kecil jatuh menempel, kerikil berputar mengorbit.
- **Teknik:** rig studio produk (key dingin-netral grazing dari kiri atas, rim redup dari belakang kanan, env map
  "night studio" prosedural 2 softbox redup via PMREM); backdrop radial gradient dikomposit **setelah** tonemap di sRGB +
  dither anti-banding; orbit spiral-masuk (elips yang mengecil eksponensial ke ukuran aslinya, start di luar layar,
  tidak lewat depan lensa); tempel-batu pakai fisika Rapier.
- **Mekanisme:**
  - `src/Experience/World/Environment.js:31–81`: key `DirectionalLight('#dfe5ee', 2.3)` di `(−2.6, 1.9, 1.07)`; rim
    `('#58606f', 1.2)` di `(2.4, 0, −2.8)`; shadow 2048², env intensity 0.6, PMREM `fromScene(studio, 0.04)`.
  - `src/Experience/Background.js`: center `#161c27`, edge `#0c0b0e`, radius 0.64 (relatif setengah diagonal), falloff
    1.6: `strength = pow(1 − smoothstep(0,1,t), falloff)`.
  - `src/Experience/World/Orbiters.js:13–30`, `:50–61`, `:144–199`: `approachTime 2.5` ("~95 % setelah 3× ini"),
    `eccentricity ≤ 0.02`, `tilt 0.55`, `speed 0.74 rad/s` di r 1 (orbit lebar lebih lambat); titik start dipilih
    `dot(dir, toCamera) < 0.3` dan sejarak `camera.getExitDistance(dir) + margin` (tepat di luar frame); `r(θ) =
    a(1−e²)/(1+e·cosθ)` (`:235`).
- **Kenapa terasa mahal:** pencahayaan produk yang menahan diri (dua lampu, backdrop redup tanpa banding) membuat
  material terbaca jelas — gaya foto produk Apple.
- **Kode:** tidak dikutip — **tidak ada LICENSE** (package.json tanpa license) → **belajar saja, jangan salin kode**.
  Model GLB juga tanpa lisensi.
- **Adaptasi:**
  - Frame-pure? Orbit spiral → tulis ulang sendiri closed form: `scale(t) = 1 + (S0 − 1)·exp(−t/τ)`,
    `θ(t) = θ0 + ω·t`. Tempel batu (Rapier) = sequential → bake atau ganti rakit closed-form (lihat Resep 5).
  - Tempat di film: kartu bab "objek pahlawan" (chip, ponsel, produk) dengan rig 2 lampu + backdrop radial; satelit
    data yang spiral masuk mengelilingi topik (ide, bukan kode).
  - Kiblat risk: rendah (tenang, gelap, premium) — cocok rasa Apple.
- **Fit: 2/5** (ide bagus, lisensi menutup kode).

---

## Pola lintas repo

1. **Dunia = data sepanjang jalur.** Sakura (tabel CP per z), cyber-web-city (legs + arc), slop-newyork (GEO meter).
   Kamera tidak "terbang bebas": ada rail, tabel arc-length, dan dunia dibangun di sekitar rail supaya kamera tak
   pernah menabrak. Untuk kolase kita: taruh stasiun foto di sepanjang spline, bukan sebaliknya.
2. **Precompute sekali, lookup per frame.** Speed profile, heading/bank, Path2D, geometri ekstrusi — semua dibangun di
   load. Cocok sekali dengan K 8 sub-frame engine kita.
3. **Shot vocabulary relatif subjek + blend.** Cyber (5 framing, blend 4 s smoothstep), sakura (6 jenis, `u ∈ [0,1]`),
   slop (11 preset), halloween (intro orbit). Shot = data `{back, side, up, lookAhead, fov}`, bukan keyframe tangan.
4. **Kabut analitik yang warnanya = langit horizon.** Tiga repo memakai integral eksponensial ketinggian yang sama
   (cyber `sky.wgsl:81–112`, sakura `shared.js:94–121`, slop `lighting.js:226–247`) + glow arah matahari. Inilah lem
   kedalaman yang membuat lapisan menjadi satu udara.
5. **Waktu sebagai colour script.** Tokyo (ramp elevasi), sakura (progress → jam). Urutan senja yang benar: lampu dulu,
   gelap belakangan, biru scotopic di bayangan.
6. **Tema sebagai data.** cyber-web-city "ash"/"dust" membuktikan teknik yang sama bisa netral tanpa neon: turunkan
   saturasi, `gaudy`, `signs`, palet abu, satu aksen.
7. **Gerak kecil closed-form dari sinus tak sebanding / hash.** Wander kamera, burung Tokyo, flicker lilin, hover bob.
   Semua murni fungsi `t`; arah hadap dari beda-hingga `place(t+δ) − place(t)`.
8. **Post yang menahan diri:** split-tone kecil (±0.03), vignette 0.26–0.55, grain 0.018–0.035, bloom mix 0.05–0.12.
   Semua jauh di bawah default "AI template".
9. **WebGPU makin umum.** cyber-web-city WebGPU-only; slop/halloween/isle/rock pakai `WebGPURenderer` + TSL (fallback
   WebGL2). Di pipeline headless kita: port ke GLSL r186 / Canvas2D; jangan bergantung pada WebGPU.

## Resep untuk engine kita

Semua frame-pure: tabel dibangun di module load, `draw(ctx, t)` hanya lookup. Helper `clamp/inv/lerp/E` dari
`aset/_template-longform/_chapter/src/engine.js`. Kode di bawah **tulisan kita** (mengikuti mekanisme repo MIT di atas),
belum dijalankan.

### Resep 1 — Peta kartografer Canvas2D (Indonesia → kota)

Pakai: semua bab peta, zoom dari negara ke kota, wilayah yang dibahas menyala lime. Sumber: slop-newyork.

```js
// module load: rings [[lon,lat],…] dari Natural Earth/OSM (cek lisensi; OSM = ODbL + atribusi di layar)
const LAT0 = -2.5, LON0 = 118, D = Math.PI / 180, A = 6378137, E2 = 6.69437999014e-3, S0 = Math.sin(LAT0 * D);
const KX = D * A / Math.sqrt(1 - E2 * S0 * S0) * Math.cos(LAT0 * D);      // NRAD·cosφ0 (geo-base.mjs:31, :33)
const KY = D * A * (1 - E2) / Math.pow(1 - E2 * S0 * S0, 1.5);             // MRAD (geo-base.mjs:32, :34)
const P = (lon, lat) => [(lon - LON0) * KX, -(lat - LAT0) * KY];  // meter, y ke bawah
const pathOf = rings => { const p = new Path2D();
  for (const r of rings) r.forEach(([lo, la], i) => { const [x, y] = P(lo, la); i ? p.lineTo(x, y) : p.moveTo(x, y); });
  return p; };
const PROV = provinces.map(v => ({ id: v.id, path: pathOf(v.rings) }));
const CAM = [[0, 118, -2.5, 4200], [3.2, 106.85, -6.2, 900], [6.5, 106.82, -6.19, 60]]; // [t, lon, lat, m/px]
function camAt(t) {
  let i = 0; while (i < CAM.length - 2 && t > CAM[i + 1][0]) i++;
  const [ta, la, pa, za] = CAM[i], [tb, lb, pb, zb] = CAM[i + 1], k = E.inOutCubic(inv(ta, tb, t));
  const [ax, ay] = P(la, pa), [bx, by] = P(lb, pb);
  const z = Math.exp(lerp(Math.log(za), Math.log(zb), k));        // zoom log: kecepatan zoom terasa rata
  return { cx: lerp(ax, bx, k), cy: lerp(ay, by, k), s: 1 / z };
}
export function drawMap(ctx, t, focusId) {
  const { cx, cy, s } = camAt(t), px = n => n / s;               // lebar garis selalu n piksel
  ctx.save(); ctx.setTransform(s, 0, 0, s, W / 2 - cx * s, H / 2 - cy * s);
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.fillStyle = '#161b22'; for (const p of PROV) ctx.fill(p.path);
  if (s > 1 / 2500) { ctx.strokeStyle = 'rgba(230,236,245,.16)'; ctx.lineWidth = px(1); for (const p of PROV) ctx.stroke(p.path); }
  const f = PROV.find(p => p.id === focusId); if (f) { ctx.fillStyle = '#C8F53C'; ctx.fill(f.path); }
  ctx.restore();
}
```

Knob: `CAM` (rail peta di timeline, satu baris per beat VO), ambang LOD `s` (garis provinsi, label, jalan), tile 500 m +
culling kalau layer jalan kota ribuan path. Pusat yang di-lerp linear + zoom log bisa "melayang" sedikit saat zoom besar
— kalau mengganggu, interpolasi pusat dalam ruang layar target (van Wijk) **(belum diverifikasi di engine kita)**.

### Resep 2 — Rail kamera "racing line" untuk fly-through kolase

Pakai: hook 3D, perjalanan antar-stasiun foto, transisi bab. Sumber: cyber-web-city `flight.ts`.

```js
// module load. CTRL = titik kontrol rail; posAt(s)/curvAt(s) dari polyline Catmull-Rom ber-arc-length (helper kita)
const DS = 0.5, DT = 1 / 120, m = Math.ceil(L / DS) + 1, v = new Float32Array(m);
for (let k = 0; k < m; k++) v[k] = Math.min(VMAX, Math.sqrt(A_LAT / Math.max(curvAt(k * DS), 1e-5)));
for (let k = m - 2; k >= 0; k--) v[k] = Math.min(v[k], Math.sqrt(v[k + 1] ** 2 + 2 * BRAKE * DS));
v[0] = Math.min(v[0], VMAX * 0.6);
for (let k = 1; k < m; k++) v[k] = Math.min(v[k], Math.sqrt(v[k - 1] ** 2 + 2 * ACCEL * DS));
const T2S = [0]; for (let s = 0; s < L;) { s += Math.max(v[Math.min(m - 1, Math.floor(s / DS))], 0.2) * DT; T2S.push(Math.min(s, L)); }
const tNat = s => { let i = 0; while (i < T2S.length - 1 && T2S[i] < s) i++; return i * DT; };
// retime ke edit: stasiun j di jarak STA[j].s harus tiba tepat di STA[j].tVO (piecewise linear)
const MAP = STA.map(st => [st.tVO, tNat(st.s)]);
const natT = t => { let j = 0; while (j < MAP.length - 2 && t > MAP[j + 1][0]) j++;
  const [ea, na] = MAP[j], [eb, nb] = MAP[j + 1]; return lerp(na, nb, clamp((t - ea) / (eb - ea))); };
export function camAt(t) {
  const f = natT(t) / DT, i = Math.min(T2S.length - 2, Math.floor(f)), s = lerp(T2S[i], T2S[i + 1], f - i);
  const sp = v[Math.min(m - 1, Math.floor(s / DS))];
  const roll = clamp(Math.atan(sp * sp * curvAt(s) / 9.81) * 0.9, -0.5, 0.5) * ROLL_K;   // miring fisik
  const w = 0.65 * Math.sin(t * 0.21 + 1.3) + 0.35 * Math.sin(t * 0.57 + 3.0);          // wander
  return { pos: posAt(s), look: posAt(Math.min(L, s + LOOK)), roll, yaw: w * WANDER };
}
```

Knob: `VMAX`, `A_LAT` (makin kecil makin ngerem di tikungan), `BRAKE/ACCEL`, `LOOK` (jarak look-ahead = pengganti
low-pass heading, murni), `ROLL_K` 0.2–0.5 (jangan mabuk), `WANDER` 0.01–0.03 rad. Untuk Canvas2D: proyeksikan
tiap lapisan kolase di kedalaman `z` dengan skala `f/(z − cam.z)`. Retime piecewise per segmen bisa membuat kecepatan
melompat di batas stasiun → beri stasiun di titik lambat (hold) supaya sambungannya tidak terasa.

### Resep 3 — Kabut ketinggian + horizon yang sama warnanya

Pakai: menyatukan lapisan kolase/dunia 3D jadi satu udara; ambience bab. Sumber: sakura `shared.js`, cyber `sky.wgsl`.

```glsl
// WebGL2 offscreen (GLSL, tiap fragment dunia)
uniform vec3 uCam, uSun, uFogAway, uFogSun; uniform vec3 uFog; // x haze/m, y k, z falloff
float expLayer(float k, float b, float y0, float dy, float d){
  float h0 = k * exp(-b * y0);
  return abs(dy) > 0.01 ? h0 * (1.0 - exp(-b * dy)) / (b * dy / d) : h0 * d;
}
vec3 atmos(vec3 col, vec3 wp){
  vec3 v = wp - uCam; float d = length(v); vec3 rd = v / max(d, 1e-4);
  float T = exp(-(uFog.x * d + expLayer(uFog.y, uFog.z, uCam.y, rd.y * d, d)));
  float s = max(dot(rd, uSun), 0.0);
  vec3 fc = mix(uFogAway, uFogSun, pow(s, 5.0) * 0.75 + pow(s, 40.0) * 0.6);
  return col * T + fc * (1.0 - T);            // langit di horizon WAJIB = fc di rd.y≈0
}
```
```js
// Canvas2D, lapisan kolase jauh→dekat: "lembar kabut" di antara lapisan = transmitansi eksponensial yang benar
const Tz = z => Math.exp(-HAZE * z);                       // z = jarak lapisan dari kamera (unit dunia)
LAYERS.forEach((L, i) => {                                 // urut jauh → dekat
  L.draw(ctx, t);
  const zN = LAYERS[i + 1] ? LAYERS[i + 1].z(t) : 0;       // lapisan berikutnya, atau kamera (z 0)
  const a = 1 - Tz(L.z(t)) / Tz(zN);                       // Π(1−a) dari i ke kamera = Tz(z_i)
  const g = ctx.createLinearGradient(0, H * 0.35, 0, H);   // lebih tebal di bawah = height fog
  g.addColorStop(0, rgba(FOG, a * 0.6)); g.addColorStop(1, rgba(FOG, a));
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
});
```

Knob (dari repo): haze 0.00035/m, k 0.012, falloff 0.035 (sakura); `fogDensity 0.0009`, falloff 0.0022 (cyber).
Warna away netral-dingin `(0.4,0.5,0.6)`, sun hangat `(1,0.7,0.4)`; untuk kiblat turunkan saturasi keduanya. Lembar
kabut tidak boleh menutup tipografi depan (tipe selalu di atas lembar terakhir). Faktor 0.6 di gradien atas = selera
(height fog palsu), membuat transmitansi tidak eksak lagi; set 1 kalau mau fisik murni.

### Resep 4 — Colour script per bab dari progres cerita

Pakai: 12 menit terasa berjalan dari siang ke malam (atau sebaliknya) tanpa disebut; peta malam dengan lampu kota.
Sumber: sakura `journey.js:44–87` (progress → jam), Tokyo `environment.js:122–126` (ramp), sakura `post.js:185–186`.

```js
const KEYS = [[0, 15.5], [0.35, 17.2], [0.6, 18.4], [0.8, 19.3], [1, 20.5]];   // progres film → jam (contoh)
const ss = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
function hourAt(p) { let i = 0; while (i < KEYS.length - 2 && p > KEYS[i + 1][0]) i++;
  const [pa, ha] = KEYS[i], [pb, hb] = KEYS[i + 1]; return lerp(ha, hb, ss(pa, pb, p)); }
const sunDeg = h => 60 * Math.sin((h - 6) / 12 * Math.PI);   // kurva elevasi kasar (tulisan kita, bukan dari repo)
export function lookAt(tFilm, dur) {
  const d = sunDeg(hourAt(clamp(tFilm / dur)));
  return {
    lightsOn: 1 - ss(0, 9, d),      // lampu kota/jendela menyala SEBELUM gelap
    dark:     1 - ss(-13, 5, d),    // exposure turun pelan, belakangan
    warmth:   1 - ss(3, 24, d),     // highlight hangat saat matahari rendah
    nightK:   1 - ss(-6, 2, d),     // bobot biru scotopic di bayangan
  };
}
// GLSL post: float l = dot(c, vec3(.2126,.7152,.0722));
//   c = mix(c, vec3(l*.75, l*.9, l*1.35), nightK * .6 * smoothstep(.25, 0., l));
// Lampu kota di peta (Canvas2D): ctx.globalCompositeOperation = 'lighten' (≈ MaxEquation Tokyo), bukan 'lighter'.
```

Knob: `KEYS` (satu per bab), ambang ramp. `warmth` hanya menggeser split-tone ±0.03, jangan sampai sepia (no vintage).

### Resep 5 — Rakit dari kepingan (provinsi, bata data, perangkat)

Pakai: data reveal, peta Indonesia dirakit provinsi demi provinsi, chapter card. Sumber: halloween `pumpkin.js`.

```js
// module load. pieces: {home:[x,y], row, ang} ; scatter & rot0 dari PRNG seeded (mulberry32)
const rng = mulberry32(17), wrap = a => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
const order = pieces.slice().sort((a, b) => (b.row - a.row) || (wrap(a.ang - SWEEP0) - wrap(b.ang - SWEEP0)));
order.forEach((p, i) => {
  p.delay = i * GAP;                                        // repo: 0.03 s
  p.dur = 0.75 + rng() * 0.25;
  p.from = [p.home[0] + (rng() - 0.5) * SPREAD, p.home[1] + (rng() - 0.5) * SPREAD]; p.rot0 = (rng() - 0.5) * 2.4;
  const out = [p.from[0] - p.home[0], p.from[1] - p.home[1]], n = Math.hypot(...out) || 1;
  p.ctrl = [(p.from[0] + p.home[0]) / 2 + out[0] / n * 0.35 * LIFT, (p.from[1] + p.home[1]) / 2 - (0.45 + rng() * 0.2) * LIFT];
});
export const LOCKS = order.map(p => T0 + p.delay + p.dur);  // cue SFX klik/thock non-tonal, dijarangkan bila rapat
export function pieceAt(p, t) {
  const u = clamp((t - T0 - p.delay) / p.dur), e = E.inOutCubic(u);
  const a = (1 - e) ** 2, b = 2 * (1 - e) * e, c = e * e;   // Bézier kuadrat terangkat
  const x = a * p.from[0] + b * p.ctrl[0] + c * p.home[0];
  const y = a * p.from[1] + b * p.ctrl[1] + c * p.home[1];
  const rot = p.rot0 * (1 - E.inOutSine(Math.min(1, u * 1.15)));       // rotasi duduk sebelum mendarat
  const s = t - T0 - p.delay - p.dur;                                   // setelah lock: klik masuk kecil
  const settle = s > 0 ? Math.exp(-s * 14) * Math.sin(s * 40) * SETTLE : 0;
  return { x, y: y + settle, rot, alpha: clamp(u * 4) };
}
```

Knob: `GAP` 0.02–0.05 s (jangan terlalu rapat: SFX lock dijarangkan, maksimal ±6/detik), `SWEEP0` sudut awal
sapuan, `LIFT` tinggi busur, `SETTLE` 1–3 px. Variasi dari rock-demo (ide saja): satelit data spiral-masuk dengan
`scale(t) = 1 + (S0 − 1)·exp(−t/2.5)` dari luar frame, tidak melintas depan lensa.
