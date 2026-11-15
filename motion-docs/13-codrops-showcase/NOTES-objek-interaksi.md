---
group: objek-interaksi
repos:
  - https://github.com/rauchg/vinyl@bcc9264
  - https://github.com/dmtrbrl/discography@431c1ee
  - https://github.com/Emotion-Agency/iphone-duo-sim@15f2e43
  - https://github.com/nestorrig/footballs@9c3c950
  - https://github.com/Sujenphea/xylophone@8e4f9a8
  - https://github.com/thibautlfr/ocarina@c6cadb6
  - https://github.com/PabloMesquida/the-hand@cb59619
  - https://github.com/davidyen1124/organ-bank@bba2615
  - https://github.com/davidyen1124/slice-of-life-crisis@1f74693
fetched: 2026-11-15
---

# NOTES · objek-interaksi (9 repo WebGL "objek yang dipegang")

Semua path `file:line` di bawah relatif ke folder mirror
`/home/ikhsands/Proyek/super-motion-claude-ikhsan/motion-docs/13-codrops-showcase/repo-<owner>--<repo>/`.
Klaim API/shader diambil dari source yang di-mirror. Kalau ada yang belum dicek, ditandai **(belum diverifikasi)**.
Kode kutipan dipakai hanya untuk belajar. Kalau lisensinya bukan MIT, jangan disalin ke film. Tulis ulang dari rumusnya.

**Cara baca kolom "frame-pure":**
- **A**: closed form f(t).
- **B**: deterministic sequential (fixed dt + seed, cache per frame).
- **C**: pre-bake (rekam transform per frame ke JSON).

**Peringatan engine kita**
- `makeRenderer` memanggil `scene.draw(ctx, t)` sebanyak **K = 8 kali per frame** pada t pecahan (shutter 0.5/FPS). Rujukan: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/_template-longform/_chapter/src/engine.js:101-107`.
  - Semua state wajib di-index oleh t, bukan oleh jumlah panggilan.
  - Biaya WebGL dan `ctx.filter blur` juga ikut ×8.
  - Untuk shot WebGL berat, set `scene.K = 4` di shot itu, atau render WebGL sekali per frame lalu terima tanpa subframe blur. Biayanya **belum diukur**.
- SFX cue masuk ke `beats.js` dengan format `SFX:[["beat+off","kind[:arg]", dB, pan]]`. Rujukan: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/_template-longform/tools/mix_chapter.py:3-4`.
  - Kind non-tonal yang ada: `travel whoosh slide swish rise thud impact sub pop card click strike cut drop whistle`.
  - `at()` menerima angka atau `"beat+off"` (`mix_chapter.py:14-16`). Apakah angka mentah sudah termasuk VOFF? Cek dulu sebelum dipakai.

---

## rauchg/vinyl

- **Lisensi:** MIT © 2026 Guillermo Rauch (`LICENSE`). Boleh diadaptasi dengan atribusi. Tanpa dependency: WebGL2 polos.
- **Wujudnya:** turntable 3D. Piringannya digambar dari groove spiral asli: garis cahaya anisotropik melebar mengikuti modulasi musik, label kertas prosedural, kamera bisa "nyelam" sampai ke ujung stylus.
- **Teknik:**
  - procedural softbox environment (tanpa HDRI)
  - GGX + Schlick Fresnel
  - anisotropic groove sheen (radial fan of 45° mirrors)
  - analytic anti-aliased spiral groove
  - lathe brushing
  - ACES-fit tonemap + dither
  - vertex warp 3 harmonics
  - macro-dive camera dengan near-plane lerp
  - procedural paper label
- **Mekanisme:**
  - **Environment** `env(r, rough)` (`src/shaders.js:24-31`):
    - Basisnya ruang gelap `0.010`.
    - Ditambah 3 softbox berbobot 7 / 3 / 4, masing-masing dikali `k = 1/(1+7·rough²)`.
    - Softness `s = 0.02 + 0.9·rough`. Material kasar otomatis "melihat" softbox yang lebih lebar dan lebih redup.
    - `softbox()` (`:18-23`) memproyeksikan arah refleksi ke bidang di arah `d` lalu memakai smoothstep persegi.
  - **Arah dan warna lampu:** arah di `:7-8`, warna KEYC `(2.5,2.38,2.2)` dan RIMC `(0.55,0.62,0.75)` di `:16`.
  - **Shading:**
    - Shadow PCF 3×3 di shadow map 2048 (`:32-38`).
    - `pool()` membuat key light jadi spot (`:39`).
    - GGX D di-clamp ke 40 (`:40-46`).
  - **Groove** (`:117-165`):
    - `g = revs − ph`, `dist = abs(fract(g+.5)−.5)·pitch`.
    - Dari dekat: tepi tajam `clamp((uW−dist)/px+.5)`.
    - Dari jauh (`px/pitch` besar): blend ke coverage rata-rata `2·uW/pitch`, jadi tidak ada moiré (`:140-141`).
  - **Streak** (`:143-150`), untuk tiap lampu:
    - Lobe Gaussian pada `th = dot(Tw, H)`, dengan σ = `0.014 + 0.085·vis`.
    - Amplitudo `0.0085/σ` (area-normalised: makin lebar makin redup).
    - Dikali `(0.3+0.7·NdotH)`.
    - Tint abu hangat + `0.28·cos(2π(th·9 + r·55 + (0,.33,.67)))`, memberi kilau spektral samar.
  - **Lathe brushing** (`:78-81`): `hash(floor(r·5000))` menggoyang N dan rough sekitar 0.10, dipudarkan oleh fwidth.
  - **Tone** (`:56-59`):
    - ACES fit `(x(2.51x+.03))/(x(2.43x+.59)+.14)`.
    - Gamma 1/2.2.
    - Dither ±0.5/255.
  - **Kamera** (`src/render.js:115-124`):
    - FOV 30°.
    - `zoom` 0 = seluruh deck, 1 = di stylus.
    - `dist = lerp(base, 0.06, z)`; untuk z<0 jadi `base·exp(−0.9z)`.
    - Near plane `lerp(0.05, 0.004, zi)`.
    - `draw(st)` (`:148`) murni terhadap `st = {thp, al, zt, zoom, az, el, motor, rpm}`.
- **Kenapa terasa mahal:** pantulannya menampilkan studio nyata (softbox key + rim strip), bukan HDRI generik. Highlight-nya streak yang diturunkan dari fisika groove. Hitamnya terbaca "hitam glossy", bukan hitam datar.
- **Kode inti** (`src/shaders.js:24-31` dan `:143-150`, MIT):

```glsl
vec3 env(vec3 r, float rough) {
  float s = 0.02 + 0.9 * rough, k = 1.0 / (1.0 + 7.0 * rough * rough);
  vec3 c = vec3(0.010, 0.010, 0.013) + 0.022 * smoothstep(-0.3, 0.7, r.z);
  c += 7.0 * k * softbox(r, L1, vec3(1.0, 0.0, 0.0), vec2(0.55, 0.30), s) * vec3(1.0, 0.95, 0.88);
  c += 3.0 * k * softbox(r, LS, vec3(0.0, 1.0, 0.0), vec2(0.60, 0.07), s) * vec3(0.80, 0.88, 1.0);
  c += 4.0 * k * softbox(r, L3, vec3(0.0, 0.0, 1.0), vec2(0.34, 0.10), s) * vec3(0.85, 0.92, 1.0);
  return c;
}
// groove walls: a radial fan of 45-degree mirrors -> anisotropic streaks
float sig = 0.014 + 0.085 * vis;
for (int i = 0; i < 3; i++) {
  vec3 L = i == 0 ? L1 : (i == 1 ? L3 : LS), H = normalize(L + V);
  float th = dot(Tw, H), s = exp(-th * th / (2.0 * sig * sig)) * 0.0085 / sig * (0.3 + 0.7 * max(dot(N, H), 0.0));
  groove += s * lc * (vec3(0.72, 0.70, 0.67) + 0.28 * cos(6.2832 * (th * 9.0 + r * 55.0 + vec3(0.0, 0.33, 0.67))));
}
```

- **Adaptasi:**
  - **Frame-pure A.**
    - `thp = 2π·(100/3)/60·t` (33⅓ rpm ≈ 3.49 rad/s).
    - `zoom(t)` dari ease kita. Ganti `S.zoom += (S.zoomT−S.zoom)·0.12` di `src/main.js:434`, yang stateful per frame.
  - **Biaya:** full-screen fragment, loop 3 lampu + LUT groove. Kalau masuk 2D lewat offscreen WebGL2, ingat ×8 subframe (lihat peringatan di atas).
  - **Yang paling portabel:** `env()` + `tone()` sebagai `onBeforeCompile` / ShaderMaterial di `motion-video-engine` (three r186) untuk objek hero glossy (HP, chip, kartu, piringan). Anisotropic lobe cocok untuk permukaan bersalur (logam brushed, CD, disk, kipas).
  - **Di film:**
    - hook: macro dive dari objek utuh ke detail
    - data reveal: tekstur modulasi = deret data, misalnya lebar groove = volume per tahun
    - topik industri musik/audio
  - **Risiko kiblat:** rendah (dark glossy, calm). Hindari nuansa "toko piringan hitam" yang hangat dan vintage; pakai rim dingin.
- **Sudah ada:** softbox cuma sebagai set prop (`/home/ikhsands/Proyek/super-motion-claude-ikhsan/.claude/skills/motion-video-engine/references/engine-api.md:40`).
- **Baru:** env-reflection softbox analitik, anisotropic streak, macro-dive near-plane lerp, ACES + dither.
- **Fit: 4/5**

---

## dmtrbrl/discography

- **Lisensi:** **PolyForm Noncommercial 1.0.0** (`LICENSE.md:1`).
  - **RED FLAG:** channel YouTube kita komersial. **Belajar saja, jangan salin kode.** Rumus boleh ditulis ulang.
  - Stack: three 0.186.1, solid-js, leafthrough.
- **Wujudnya:**
  - Deretan CD jewel case melengkung seperti carousel.
  - Saat di-drag, seluruh deret condong (lean), miring (bank), dan turun sedikit (dip). Case yang jauh tertinggal.
  - Satu case terbuka seperti buku (tilt 24°, scale 0.62) sambil tetangganya menyingkir.
  - Piringan CD memunculkan baji pelangi difraksi dari pusat.
- **Teknik:**
  - CD diffraction grating (Zucconi spectral fit, order 1–2, 3 tap per order)
  - zero-order white sheen
  - track lines `sin(r·520)` yang dipudarkan oleh fwidth
  - soft-band reflection di plastik case
  - velocity lean/bank/dip (√flow)
  - distance-graded follow rate (cascade trail)
  - room-making saat case dibuka
  - snap spring
- **Mekanisme:**
  - **Material:**
    - `src/scene.ts:28-37`: diffractionStrength 1.1, saturation 0.8, focus 1.5, spacing 1600; lampu `[-0.3,0.75,0.6,1]` dan `[0.7,-0.2,0.7,0.6]`.
    - `:54` caseSheen 0.12, width 0.1.
    - `:70-77` openDuration 1.3, openTilt 24, openScale 0.62, FOV 40, exposure 0.86, fog `#ebe3d4`.
  - **`cdDiffract`** (`:962-974`):
    - `h = light+view`, `u = |h·tangent|`.
    - `focus = exp(−(h·radial)²·1.5)` menjaga warna hanya di baji yang lewat pusat.
    - Warna = Σ n=1..2, k=−1..1 dari `cdSpectrum((u+0.03k)·1600/n)/(3n)`.
    - `sheen = exp(−14u²)·focus`.
    - `cdSpectrum` (`:952-957`) = fit bump 400–700 nm.
    - Disuntik lewat `onBeforeCompile` ke MeshPhysicalMaterial (metal 1, rough 0.2, clearcoat 0.5), sekitar `:903-1000`.
  - **Soft band** (`:771-777`): `exp(−(asin(dot(reflect(−V,N), plane))/width)²)`.
  - **Layout** (`:4995-5030`):
    - `angle = offset·0.35`
    - `x = sin(angle)·gap·2.4`
    - `z = depth − cos(angle)·depth`
    - `rotY = −angle + lean`
    - `rotZ = −lean·0.32`
    - `y −= dip`
    - `lean = sign(flow)·√|flow|·0.055`, di-clamp ±0.3
    - `dip = min(0.09, |flow|·0.014)`
    - Tetangga menyingkir dengan `power3InOut(room/0.6)`.
  - **Follow** (`:5123-5124`):
    - `k = clamp(follow − dist·1.15, 6.5, 15)`, dengan follow 11 (15 saat drag).
    - `amount = min(1, dt·k)`.
    - Hasilnya: makin jauh dari pusat, makin lambat, jadi deretnya "mengekor".
- **Kenapa terasa mahal:**
  - Warna piringan dihitung dari arah cahaya + mata per pixel, jadi pelangi bergerak benar saat kamera bergerak. Mata langsung membaca "CD asli".
  - Deretnya bereaksi pada kecepatan seperti benda bermassa: lean ∝ √speed, yang jauh telat.
- **Kode inti** (`src/scene.ts:962-974`, **kutipan studi, PolyForm NC, jangan disalin**):

```glsl
vec3 cdDiffract(vec3 light, vec3 view, vec3 tangent, vec3 radial, out float sheen) {
  vec3 h = light + view;
  float u = abs(dot(h, tangent));
  float across = dot(h, radial);
  float focus = exp(-across * across * FOCUS);
  vec3 colour = vec3(0.0);
  for (int n = 1; n <= 2; n++)
    for (int k = -1; k <= 1; k++)
      colour += cdSpectrum((u + float(k) * 0.03) * SPACING / float(n)) / (3.0 * float(n));
  sheen = exp(-u * u * 14.0) * focus;
  return colour * focus;
}
```

- **Adaptasi:**
  - **Diffraction:** frame-pure A (geometri + kamera). Murah: 6 evaluasi spektrum per lampu.
    - Di three: tulis sendiri dari grating equation, bukan dari file ini.
    - Di 2D (approx, **belum diverifikasi** kualitasnya): conic gradient di piringan yang sudutnya mengikuti azimuth lampu palsu ± parameter kamera.
  - **Lean/bank:** frame-pure A kalau posisi deret `P(t)` di-author. `flow = dP/dt` analitik atau central difference.
  - **Distance-graded follow:** asli stateful (exp filter). Ada dua jalan:
    - Konversi A: time-shift `P(t − 1/k_i)`. 1/k adalah group delay frekuensi rendah filter orde-1. Sudut tajam tidak ikut dihaluskan; ini adaptasi.
    - Atau B: fixed dt, cache per frame. Hati-hati dengan subframe t pecahan.
  - **Di film:** deret evidence card / headline di stasiun Vox, "rak arsip" yang di-scroll ghost hand, chapter card (satu case terbuka berisi judul bab).
  - **Risiko kiblat:** pelangi CD = neon. Pakai hanya untuk topik media fisik/optik, saturasi ≤ 0.8, area kecil.
- **Sudah ada:** snap spring (`spring()` engine), deret objek (`rowCam`/`drawRow` di `kit/kit.js`).
- **Baru:** lean/bank/dip dari kecepatan, trail bergradasi jarak, difraksi.
- **Fit: 4/5** (sebagai pelajaran; kode tidak boleh dipakai)

---

## Emotion-Agency/iphone-duo-sim

- **Lisensi:** **tidak ada** (tidak ada file LICENSE, tidak ada field `license` di package.json). **Belajar saja, jangan salin kode.** Stack: three ^0.186, GLSL.
- **Wujudnya:**
  - HP dengan cover depan yang terbuka seperti buku (φ 180°→0°) dan menyingkap UI layar lebar.
  - Selama melipat, UI di bawah cover blur dan redup.
  - Dekat lipatan, gambar dibelokkan grid/lens/liquid + RGB split.
  - Ada bayangan lipatan tipis.
- **Teknik:**
  - **single-scalar unfold envelope pack**
  - segment timeline murni `progressAt(t)`
  - ray-plane projection (muka dalam cover mengambil sampel UI layar lebar yang diproyeksikan ke bidang dasar, jadi gambar menyambung)
  - distortion envelope e² dekat front lipatan
  - Poisson 8-tap blur + LOD
  - crease darkening Gaussian
  - preset (Subtle/Dramatic/Glitch/Clean/Slow motion)
- **Mekanisme:**
  - **Timeline** (`src/main.ts:13-34`): hold 0.9 s → open 4.6 s → hold 2.2 s → close 3.6 s. `phi = lerp(180, 0, easeInOutSine(p))` (`:242`).
  - **`computeUnfold(phi)`** (`src/device.ts:125-142`):
    - `open = 1−φ/180`
    - hinge bergeser `drift·W·open`
    - `zoom = 1 + 0.06·(1−open)`
    - `blurIn = blur·clamp(φ/90)^0.8`
    - `litFront = sstep(90,0,φ)^0.8`
    - `distortEnv = clamp(φ/90)^0.7`
    - `shadeIn = 0.8+0.2·max(cosθ,0)`
    - `outerBright = 0.12+0.88·sstep(92,178,φ)`
    - `outerBlur = 0.6·blur·sstep(178,120,φ)`
    - `baseBright = 0.08 + 0.92·sstep(150,92,φ)`
    - Default di `:39-58`.
  - **Distorsi** (`src/shaders/cover.frag.glsl:40-58`):
    - `e = smoothstep(front−.15, front+.35, q)·distortEnv`, lalu dipakai `e²`.
    - Grid cellNoise 22 sel × 0.035.
    - Lens 0.05.
    - Liquid `sin(uv.y·25 + t·1.4)·0.01`.
    - CA 0.01.
    - Semua diredam di 6 % tepi.
  - **Crease** (`:61-63`): `1 − 0.07·exp(−(x/0.008)²)`.
  - **Blur dan helper** (`src/shaders/common.glsl`): Poisson taps di `:23-25`, `softClip` tanh di `:32-36`.
- **Kenapa terasa mahal:** satu angka (φ) menggerakkan sekitar 10 envelope dengan kurva berbeda (pow 0.7/0.8, jendela smoothstep di 90°, 150°, 178°). Cahaya, blur, distorsi, zoom, dan geser engsel datang berurutan tapi terkunci satu sama lain, persis 10 property yang di-keyframe tangan oleh motion designer.
- **Kode inti** (`src/device.ts:125-142`, **tanpa lisensi, kutipan studi**):

```ts
export function computeUnfold(phi: number, s: EffectSettings = settings): UnfoldParams {
  const theta = phi * DEG;
  const open = 1 - phi / 180;
  const hingeX = -DIM.W / 2 + s.drift * DIM.W * open;
  const zoom = 1 + s.parallaxZoom * (1 - open);
  const blurIn = s.blur * Math.pow(clamp(phi / 90, 0, 1), 0.8);
  const litFront = Math.pow(sstep(s.revealStart, 0, phi), 0.8);
  const distortEnv = Math.pow(clamp(phi / 90, 0, 1), 0.7);
  const shadeIn = 0.8 + 0.2 * Math.max(Math.cos(theta), 0);
  const outerBright = 0.12 + 0.88 * sstep(s.outerFadeEnd, 178, phi);
  const outerBlur = 0.6 * s.blur * sstep(178, 120, phi);
  const baseBright = s.baseDim + (1 - s.baseDim) * sstep(150, 92, phi);
  return { theta, hingeX, zoom, blurIn, litFront, distortEnv, shadeIn, outerBright, outerBlur, baseBright };
}
```

- **Adaptasi:**
  - **Frame-pure A** dari awal (`progressAt(t)`).
  - **Di 2D:**
    - Cover dilipat dengan strip-slicing: kolom gambar di-`drawImage` dengan tinggi berubah menurut perspektif cosθ. Kualitasnya **belum diverifikasi**.
    - Envelope dipetakan ke `ctx.filter = blur(px) brightness()` dan `globalAlpha`.
    - Zona distorsi = strip yang digeser sin-wave × e².
    - Atau pakai shader kecil di offscreen WebGL2.
  - **Biaya:** rendah–sedang. Blur besar × 8 subframe itu mahal; cap ≤ 24 px atau blur di kanvas ¼.
  - **Di film:**
    - Apple-style UI demo (panel/HP "dibuka" menyingkap layar penuh)
    - chapter card (cover terbuka, judul bab di dalamnya)
    - transisi "di balik layar"
  - **Risiko kiblat:** sangat cocok (Apple-style, calm). Hindari preset Glitch, jaga CA ≤ 0.01.
- **Sudah ada:** `phone()` line-art di `aset/_template-longform/kit/draw.js`.
- **Baru:** unfold/hinge + envelope pack + distorsi lipatan.
- **Fit: 5/5**

---

## nestorrig/footballs

- **Lisensi:** README `## License`: **"Private project. All rights reserved."** (`README.md:83-85`).
  - **RED FLAG: jangan salin kode**; ide umum (Voronoi di bola, fan-out ring) adalah pengetahuan umum.
  - Stack: R3F, drei, rapier, gsap CustomEase, three-custom-shader-material.
- **Wujudnya:**
  - Bola sepak dengan panel prosedural: pentagon `#004bff`, heksagon `#f3f2ed`, sambungan timbul.
  - Ada tumpukan fisika.
  - Di scene 4, tumpukan bola naik sambil berputar lalu mengembang jadi cincin.
- **Teknik:**
  - spherical Voronoi panel (12 titik ikosahedron = pentagon + 20 pusat muka = heksagon)
  - seam F2−F1 via `aastep`
  - panel bulge / edge inset sebagai vertex displacement
  - bump normal finite difference 4-tap
  - drei Lightformer env
  - Rapier attractor / impulse
  - GSAP CustomEase fan-out ring
- **Mekanisme:**
  - **`nearestPanel`** (`components/shaders/footballDepthShader.tsx:70-90`): dot terbesar dan kedua ke seed. `dist = √(2−2·dot)`.
  - **Seam** (`:209`): `edge = 1 − aastep(0.03, second−nearest)`.
  - **Ketinggian panel:** `mask·bulge − (1−mask)·inset` (`:98-101`).
  - **Ring** (`app/(balls)/(pbr)/4/Scene.tsx:158`):
    - `angle = π/2 + (2π/n)·i·increment`.
    - `increment` 0→1 selama 2 s dengan `C(0.19,0.753,−0.181,0.943)`, yaitu ease-out tajam **tanpa overshoot** (y < 1).
    - Grup naik 1.2 s dengan `C(0.328,0.231,0.142,1)` sambil berputar 4 kali dalam 6 s.
  - **Physics:** Rapier attractor `0.3·delta·60·mass`, linearDamping 0.6 (scene 1). Impulse 25, restitution 0.85 (scene 5).
- **Kenapa terasa mahal:** geometri panel eksak secara matematis, tanpa seam tekstur. Cincin mengembang dengan kurva custom, jadi terasa "napas" keluar, bukan sebaran linear.
- **Kode inti** (`Scene.tsx:158`, **All rights reserved, kutipan studi**):

```ts
const angle = Math.PI / 2 + ((Math.PI * 2) / items) * i * increment;
mesh.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
```

- **Adaptasi:**
  - **Frame-pure:**
    - Shader dan ring = A, karena timeline GSAP bisa di-seek. Di 2D cukup kartu di elips dengan `increment(t)` lewat `bez()` engine. Apakah `bez()` kita menerima x negatif? **Belum diverifikasi.**
    - Rapier = C (bake) atau buang.
  - **Di film:** data reveal ("12 negara / 12 produk" dari tumpukan jadi lingkaran). Voronoi-di-bola bisa untuk globe bersegmen (wilayah/region).
  - **Risiko kiblat:** sporty/toy. Bola sendiri hanya untuk topik olahraga.
- **Sudah ada:** stagger/spring.
- **Baru:** fan-out ring dengan satu skalar `increment`.
- **Fit: 2/5**

---

## Sujenphea/xylophone

- **Lisensi:** MIT © 2009–2026 Codrops (`LICENSE`). Stack: three ^0.182 + postprocessing.
- **Wujudnya:**
  - 64 bilah kaca buram di heliks berputar.
  - Di-hover: bilah berayun seperti bandul yang dipukul dan membunyikan nada.
  - Fluid sim memunculkan tint.
  - Tepi iridescent, latar ter-frost.
- **Teknik:**
  - helix conveyor instanced `wrap(i+phase)`
  - **closed-form strike pendulum** di vertex shader, dikunci ke `aStrikeTime` per instance
  - frosted transmission (blurred backdrop disampel di `screenUV + N.xy·k`)
  - Fresnel sheen + procedural env ramp
  - cosine-palette iridescence di tepi grazing
  - SSAO sebagai contact shadow
  - FrostBackdropPass
- **Mekanisme:**
  - **Swing** (`src/shaders/xylophone/xylophoneVert.glsl:43-48`, konstanta `:17-19`):
    - `dt = u_time − aStrikeTime`
    - `env = step(0,dt)·exp(−4.5dt)`
    - `ang = env·0.58·sin(16dt)`, jadi quaternion di sumbu ayun.
  - **Helix** (`src/js/components/xylophone/helix.ts:42-69`):
    - `s = wrap(i+phase, n)`, `θ = s·0.175 + π`
    - `pos = (r cosθ, s·h − halfH, r sinθ)`
    - `tiltX = atan2(h, r·falloff)`
    - Config `XylophoneConfig.ts:27-43`: count 64, radius 1, spin 0.3, rot grup (25°, 30°).
  - **Frag** (`xylophoneFrag.glsl:98-122`):
    - transmission `mix(body, texture(backdrop, screenUV + N.xy·0.2), 0.84·(1−0.6·reveal))`
    - Fresnel `edge^3`, sheen mix 0.35, rim lift 0.06
    - iridescence `0.5+0.5cos(2π(phase+(0,.33,.67)))` (`:51-53`) dengan `phase = edge·3 + N.y·0.5 + shift`
    - Nilai uniform dari `Xylophone.ts:79-95`.
  - **Env ramp** (`:65-71`): ground .12 → horizon .60 → sky .95.
  - **Backdrop** (`FrostBackdropPass.ts:71`): GaussianBlurPass kernel 35, 3 iterasi, resolusi ×0.25, isolasi layer.
  - **Audio** (`XylophoneAudio.ts`): satu sampel, `playbackRate = freq/base`, pentatonik, **tonal**. Yang ditransfer hanya mekanismenya: timestamp yang sama menggerakkan audio dan ayunan.
- **Kenapa terasa mahal:** kaca yang benar-benar menembuskan latar + tepi iridescent tipis membuat material terbaca sebagai objek fisik. Tiap pukulan meluruh secara fisika, jadi deretan pukulan terasa seperti instrumen sungguhan.
- **Kode inti** (`xylophoneVert.glsl:43-48` dan `xylophoneFrag.glsl:100-122`, MIT):

```glsl
float dt = u_time - aStrikeTime;
float env = step(0.0, dt) * exp(-dt * SWING_DECAY);           // 4.5
float ang = env * SWING_AMP * sin(dt * SWING_FREQ) * u_swingScale; // 0.58, 16
vec4 swing = vec4(normalize(u_swingAxis) * sin(ang * 0.5), cos(ang * 0.5));
rot = qmul(rot, swing);
// --- frag ---
vec2 buv = vScreenUv + N.xy * u_refractStrength;
vec3 trans = texture2D(u_tBackdrop, buv).rgb;
vec3 frosted = mix(body, trans, u_transmission * (1.0 - TINT_OPACITY_DROP * reveal));
float edge = clamp(1.0 - max(dot(N, V), 0.0), 0.0, 1.0);
float fres = pow(edge, u_fresnelPower);
vec3 color = mix(frosted, proceduralEnv(reflect(-V, N)), fres * SHEEN_MIX) + fres * RIM_LIFT;
float phase = edge * u_iridCycles + N.y * 0.5 + u_iridShift;
color += iridescence(phase) * (pow(edge, u_iridPower) * u_iridStrength + u_iridBody * edge);
```

- **Adaptasi:**
  - **Frame-pure:** swing = A kalau strike time berasal dari daftar cue; helix = A (`phase = 0.3·t`); fluid tint = stateful, **buang**.
  - **Di 2D, panel UI di atas kolase:**
    - Latar digambar ke kanvas ¼ dengan `blur()`.
    - Gambar di dalam panel dengan offset refraksi di dekat tepi.
    - Garis Fresnel = gradient stroke di tepi.
    - Iridescence = gradient cosine-palette alpha ≤ 0.15, **hanya di tepi**.
  - **Di film:**
    - data reveal: helix arsip/tahun berputar
    - list item "dipukul" serentak VO (lihat Resep 3)
    - panel UI kaca premium
  - **Audio:** pakai `strike`/`click`/`thud` non-tonal, bukan nada.
  - **Risiko kiblat:** iridescence dan tint fluid = pelangi/neon. Turunkan iridStrength ke ≤ 0.2, desaturasi ke ivory/lime.
- **Sudah ada:** panel frosted / jendela kaca (ledger `glass-lookat-tilt`, `hybrid-kinetic-captions`, `/home/ikhsands/Proyek/super-motion-claude-ikhsan/.claude/skills/motion-taste/references/technique-ledger.md:252`).
- **Baru:** refraksi offset + rim iridescent, helix conveyor, strike pendulum closed form.
- **Fit: 4/5**

---

## thibautlfr/ocarina

- **Lisensi:**
  - Kode MIT © 2026 Thibaut Lefrançois (`LICENSE`).
  - **RED FLAG aset:** model dan suara adalah milik Nintendo, "unofficial, non-commercial fan project" (`README.md:58-60`). **Jangan pernah pakai asetnya.**
  - Stack: gsap, steerkit, three 0.184.
- **Wujudnya:**
  - Okarina melayang.
  - Tiap tombol nada membuat instrumen miring/turun ke pose khas tombol itu, lalu berayun halus makin kecil selama ditahan.
  - Dilepas, ia kembali dengan back.out.
  - Kamera drift sedikit sebagai petunjuk "bisa diputar".
- **Teknik:**
  - per-input pose table
  - press envelope dengan decaying held swings
  - release overshoot
  - shortest-angle facing follow
  - float bob
  - camera hint drift
- **Mekanisme:**
  - **`NOTE_POSES`** (`src/experience/world/ocarina.ts:39-46`):
    - A: y −0.05, rotX 0.04, scale 0.98
    - CDown: rotX 0.13
    - CRight: rotY 0.18, rotZ −0.05 (CLeft cermin)
    - CUp: rotX −0.13
  - **`pressParams`** (`:69-80`): attack 0.32, duration 0.42, holdReturn 0.4, holdCycles 3, holdDecay 0.5, release 0.55.
  - **`playPress`** (`:201-231`):
    - `sine.out` ke pose.
    - Lalu 3× ayun ke `(1−swing)·pose` dan balik, `sine.inOut`.
    - Tiap siklus 15 % lebih lambat, swing ×0.5.
  - **Release** (`:233-241`): `back.out(1.4)` ke rest.
  - **Gerak idle:** facing follow `1−exp(−6dt)` (`:255-265`); float `sin`, speed 1.5, intensitas 0.1 (`:267-276`).
  - **Kamera** (`src/experience/camera.ts:80-100`): drift 10° selama 2 s, delay 0.4.
- **Kenapa terasa mahal:** objek menjawab tiap input dengan bahasa tubuh berbeda dan tidak pernah berhenti mati. Ayunan meluruh dan melambat seperti benda yang dipegang tangan.
- **Kode inti** (`ocarina.ts:209-229`, MIT):

```ts
this.pressTimeline = gsap.timeline()
  .to(this.press, { ...pose, duration: attack, ease: "sine.out" });
let swing = holdReturn;
for (let i = 0; i < holdCycles; i++) {
  const swingDuration = duration * (1 + i * SWING_SLOWDOWN);
  this.pressTimeline
    .to(this.press, { ...this.scaledPose(button, 1 - swing), duration: swingDuration, ease: "sine.inOut" })
    .to(this.press, { ...pose, duration: swingDuration, ease: "sine.inOut" });
  swing *= holdDecay;
}
```

- **Adaptasi:**
  - **Frame-pure A.** Timeline-nya deterministik, jadi tulis `pressPose(τ)` piecewise: attack, lalu segmen ayun dengan `d_k = 0.42(1+0.15k)` dan `amp_k = 0.4·0.5^k`.
  - **Release dari posisi sembarang:** hitung `pressPose(tRel)` lalu `back.out` ke rest. Tetap murni.
  - **Di film:** Apple-style UI sim, perangkat (HP/laptop/kartu) miring ke arah tombol yang diklik ghost cursor. Kanan → rotY +, atas → rotX −. Tap feedback yang terasa bermassa.
  - **Risiko kiblat:** rendah (calm). Sampler vibrato = tonal, buang.
- **Sudah ada:** anticipation dip (`/home/ikhsands/Proyek/super-motion-claude-ikhsan/.claude/skills/motion-taste/references/studio-tricks.md:95`), spring kick (`enterprise-motion.md:41`).
- **Baru:** pose table per tombol + ayunan tahan yang meluruh.
- **Fit: 3/5**

---

## PabloMesquida/the-hand

- **Lisensi:** **tidak ada.** Belajar saja, jangan salin kode.
- **Stack:** **WebGPU + TSL** (`three/webgpu`, `WebGPURenderer` di `script.js:88`).
  - **FLAG:** WebGPU di headless Chrome/Playwright kita belum tentu jalan (**belum diverifikasi**).
  - Jalur WebGL2-nya ada di bawah.
- **Wujudnya:**
  - Tangan 3D ber-rig di belakang kaca buram.
  - Bagian yang menempel ke kaca tajam dan pekat; makin jauh makin blur dan pudar.
  - Kaca menggembung seperti lycra di titik jari mendorong.
- **Teknik:**
  - **depth-graded frosted glass:** MRT color + frost [coverage, distance]
  - blur pyramid
  - composite dengan coverage-weighted distance
  - trilinear level blend
  - scatter jitter
  - un-premultiply
  - opacity falloff
  - membrane (jump flood + spring, compute)
  - finger reach cascade
  - asymmetric smoothing
- **Mekanisme:**
  - **Pipeline** (`src/FrostedGlass.js:9-12`):
    - Scene di-render ke MRT.
    - Pyramid: tiap level ½ resolusi; color + frost di-blur bersama dengan Gaussian σ 2 texel, radius 5, linear-sampled pairs (`:84-105`).
    - Lalu composite.
  - **Uniform** (`:26-31`): maxDistance 8, curve 0.87, scatter 0, farOpacity 0.205.
  - **Distance** (`:74`): `((glassZ − z)/maxDistance)` di-saturate.
  - **Composite** (`:162-201`):
    - `frost = Σ tex_i·0.5^i`
    - `d = frost.g/frost.r`, supaya tepi tangan blur sama seperti isinya, **tanpa halo**
    - `level = d^0.87·maxLevel`
    - warna = Σ `tex_i·max(0, 1−|level−i|)`
    - un-premultiply
    - `opacity = α·mix(1, 0.205, d)`
  - **Tangan** (`src/Hand.js`):
    - reachAmounts per jari: jempol 0.2, telunjuk 1, tengah 0.6, manis 0.4, kelingking 0.3 (`:61-62`).
    - reachStrength 1.746 lalu di-clamp (`:79`), jadi tiap jari jenuh di waktu berbeda. Hasilnya **stagger lewat gain**, bukan lewat delay.
    - Smoothing naik 5 / turun 2.5 (`:294-302`).
  - **Membrane** (`src/Membrane.js:4-13`): compute WebGPU saja.
- **Kenapa terasa mahal:** blur adalah fungsi jarak nyata ke kaca per pixel, bukan satu blur per layer. Objek "muncul" menembus embun seperti di balik kaca kamar mandi, isyarat optik yang langsung dipercaya mata.
- **Kode inti** (`src/FrostedGlass.js:169-200`, **tanpa lisensi, kutipan studi**, TSL):

```js
const frost = vec4(0).toVar()
frostTextures.forEach((frostTexture, i) => {
    frost.addAssign(texture(frostTexture, screenUv).mul(Math.pow(0.5, i)))
})
const coverage = frost.r
const distance = select(coverage.greaterThan(0.0001), frost.g.div(coverage), float(1)).saturate()
const level = distance.pow(this.curve).mul(this.maxLevel)
const color = vec4(0).toVar()
colorTextures.forEach((colorTexture, i) => {
    const weight = level.sub(i).abs().oneMinus().max(0)
    color.addAssign(texture(colorTexture, colorUv).mul(weight))
})
const alpha = color.a
const rgb = color.rgb.div(alpha.max(0.0001))
const opacity = alpha.mul(mix(1, this.farOpacity, distance)).saturate()
```

- **Adaptasi:**
  - **Jalur WebGL2** (**belum diverifikasi**): `drawBuffers` MRT (color + [coverage, distance·coverage]), chain FBO ½ res dengan blur separable, composite shader yang sama dalam GLSL.
  - **Jalur 2D (disarankan, murah):**
    - Tiap layer kolase punya jarak `d(t)` ke bidang kaca.
    - `ctx.filter = blur(28·d^0.87 px)` dan `globalAlpha·= mix(1, 0.205, d)`.
    - Cut-out hero dipecah 2–3 irisan kedalaman agar ada gradasi di dalam satu objek (lihat Resep 4).
    - Frame-pure A.
  - **Membrane:** buang, atau palsukan dengan highlight radial (**belum diverifikasi**).
  - **Biaya:** blur ×8 subframe × N layer itu mahal; untuk blur > 24 px pakai kanvas ¼.
  - **Di film:**
    - hook (sosok/data menembus kaca buram: topik privasi, "di balik layar")
    - transisi (subjek mendorong kaca masuk ke stasiun berikut)
    - chapter card
  - **Risiko kiblat:** rendah (calm, tanpa neon). Pakai sebagai optika kedalaman, jangan jadi gaya kartu glassmorphism template.
- **Sudah ada:** DOF (`/home/ikhsands/Proyek/super-motion-claude-ikhsan/.claude/skills/motion-video-engine/references/engine-api.md:17`), panel frosted (ledger).
- **Baru:** blur + opacity bertingkat menurut jarak ke kaca, stagger lewat saturasi gain.
- **Fit: 4/5** (lewat jalur 2D)

---

## davidyen1124/organ-bank

- **Lisensi:** **tidak ada.** Belajar saja, jangan salin kode. Stack: three 0.186.1.
- **Wujudnya:** patung tumpukan TV tabung sebagai organ tubuh (otak, jantung, mata, …).
  - Tiap layar memutar loop yang murni fungsi waktu: jantung 72 bpm, napas 14/menit.
  - Transisi antar slide: vertical-hold slip, wipe dengan tepi panas, dissolve lewat snow, comb.
  - Layar menerangi ruangan.
  - Unit menyala bergiliran (power-on).
  - Kamera idle "reframe" tiap 1.9 s.
  - Suara: hum, hiss, thump per detak, klik relay per ganti slide.
- **Teknik:**
  - lub-dub envelope
  - `sequence(t,dur,tr)` hold + handover
  - stepped operator reframe
  - staggered power-on
  - **screen-as-light** (PointLight = level layar)
  - hot-edge noisy wipe
  - warm-up CRT
  - SFX sintetis non-tonal
- **Mekanisme:**
  - **Loop** (`src/loops.js:1-25`): "Everything is a pure function of time".
    - `BEAT = 60/72`.
    - lub: naik linear 0–3.5 % fase, lalu `exp(−12·…)`.
    - dub: 0.55 di 30–33 %, lalu `exp(−15·…)`.
  - **Lampu dan suara per unit** (`src/main.js:302-308`):
    - `power = clamp((t − POWER_ON[id])/1.6)`
    - `light.intensity = LAMP·lamp·level·power`
    - klik saat slide berganti
  - **Reframe** (`:297-300`):
    - `g = floor(t/1.9)`
    - offset `sin(g·12.9)·0.16·dist` dan `sin(g·7.3)·0.07·dist`
    - dikejar rig `1−exp(−3dt)` (`:269-275`)
  - **Wipe** (`src/scene/screen.js:101-105`):
    - `e = mix·2.7 − 1.35`
    - tepi = `p.y + 0.12·noise`
    - garis panas `0.6·exp(−((edge−e)·16)²)`
  - **Suara** (`src/sound.js`):
    - thump `:59-73`: sine 62/74 Hz → 34 Hz eksponensial dalam 0.16 s, attack 12 ms, decay 0.22 s.
    - relay click `:75-89`: noise HP 1800, gain 0.16 → 0 dalam 45 ms.
    - hum 60 Hz LP 260; hiss BP 5200.
- **Kenapa terasa mahal:** semuanya dikunci ke satu jam biologis, dan cahaya + suara lahir dari event yang sama dengan gambar. Layar menyala → ruangan terang; slide ganti → relay klik. Dunianya terasa "terkabel" secara sebab-akibat.
- **Kode inti** (`src/loops.js:11-25`, **tanpa lisensi, kutipan studi**):

```js
export function heartbeat(t) {
  const ph = frac(t / BEAT);
  const lub = ph < 0.035 ? ph / 0.035 : Math.exp(-(ph - 0.035) * 12);
  const dub = ph < 0.3 ? 0 : ph < 0.33 ? ((ph - 0.3) / 0.03) * 0.55 : 0.55 * Math.exp(-(ph - 0.33) * 15);
  return Math.min(1, lub + dub);
}
function sequence(t, dur, tr, offset) {
  const k = Math.floor(t / dur);
  const f = t - k * dur;
  return { a: (k + offset) % 4, b: (k + 1 + offset) % 4, mix: f > dur - tr ? (f - (dur - tr)) / tr : 0 };
}
```

- **Adaptasi:**
  - **Frame-pure A** sejak awal.
  - **Reframe ke closed form:** `pos = lerp(target_{g−1}, target_g, 1−exp(−3(t−1.9g)))`. Sisa step sebelumnya `exp(−5.7) ≈ 0.003`, jadi bisa diabaikan.
  - **Di 2D:**
    - screen-as-light = radial gradient `lighter`/`screen` di sekitar layar, alpha = level × power.
    - heartbeat menggerakkan skala/glow/angka.
    - wipe tepi panas = wipe noisy + garis terang tipis. Accent lime ≤ 1 % luas.
  - **Di film:** data reveal (topik kesehatan, server "berdetak", dashboard live), stasiun "dinding monitor" Vox, transisi wipe.
  - **SFX:** thump → kind `thud`/`sub`, relay → `click`.
  - **Risiko kiblat: TINGGI.** CRT/scanline/snow/warm-up = vintage (dilarang). Ambil jam, cahaya, reframe, dan SFX-nya saja.
- **Sudah ada:**
  - light-sweep transition (motion-video-engine), yang mirip wipe tepi panas.
  - "heartbeat" cuma muncul sebagai kata di `/home/ikhsands/Proyek/super-motion-claude-ikhsan/.claude/skills/motion-taste/references/studio-tricks.md:17`.
- **Baru:** lub-dub envelope, screen-as-light, stepped reframe, power-on bercahaya.
- **Fit: 3/5**

---

## davidyen1124/slice-of-life-crisis

- **Lisensi:** **tidak ada.** Belajar saja, jangan salin kode. Stack: rapier3d-compat, delaunator, constrainautor, three 0.186.1.
- **Wujudnya:** pisau memotong castella.
  - Gerak: melengkung ke atas kue, turun, menekan kulit (penyok), tembus, menggergaji, mengayun potongan, diam sebentar, naik, pulang.
  - Remah jatuh. Spons memampat dan menggembung.
  - Suara noise burst: crunch, saw, thud, hush.
- **Teknik:**
  - **phase-table choreography** (fase bernama + durasi, `k` dinormalisasi per fase, ease per fase)
  - press resistance k²
  - break → saw
  - dent spring-back
  - travel arc
  - squash spring + Poisson bulge
  - SFX dari noiseBurst
- **Mekanisme:**
  - **Konstanta** (`src/main.js:310-312`):
    - `PRESS = 0.0046`
    - `PH = {travel .36, descend .11, press .2, slice .46, flick .22, hold .08, lift .26, home .42}`
  - **`runJob`** (`:327-380`), per fase:
    - travel: lerp/slerp + `y += sin(πe)·0.06`
    - descend: outCubic
    - press: `y = top − PRESS·k²` + saw `0.004·sin(πk)`
    - slice: ke bawah dengan inOutCubic, saw `0.012·sin(2πk)`, penyok kembali `PRESS·exp(−6t)`
    - flick: lean
    - hold
    - lift
    - home: arc 0.04
  - **SFX:** dipicu di batas fase, misalnya `sound.saw(PH.slice/speed)` (`:392`).
  - **Squash** (`src/castella.js:377-386`):
    - ω = 2π·14, ζ 0.45, substep 4 ms
    - di-clamp [−0.03, 0.08]
    - bulge Poisson 0.18
  - **Suara** (`src/sound.js`):
    - `noiseBurst` `:49-66`: f, Q, gain, attack 4 ms, exp decay.
    - crunch `:69-74`: 4 burst berjarak 22 ms, 2600–4800 Hz, Q 1.4, + body 900 Hz.
    - saw `:77-82`: BP 1000 → 1900 → 1100.
    - thud `:105-108`: LP 260 + klik 1200.
    - **`tok` (`:84-103`) = sine modal 612/1390/2710 Hz, tonal**, jadi melanggar aturan no-ting. Buang.
- **Kenapa terasa mahal:** gerak alatnya bercerita tentang hambatan (tekan pelan → tembus → gergaji cepat). Tiap batas fase memicu suara dan respons material, sehingga aksi "tangan" terasa berbobot.
- **Kode inti** (`src/main.js:310-312`, `:344-357`, **tanpa lisensi, kutipan studi**):

```js
const PRESS = 0.0046
const PH = { travel: 0.36, descend: 0.11, press: 0.2, slice: 0.46, flick: 0.22, hold: 0.08, lift: 0.26, home: 0.42 }
// ...
case 'press': {
  const y = j.top - PRESS * k * k
  P = knifeAt(y, 0.004 * Math.sin(k * Math.PI))
  setDent(j.pieces, j.top - y)
  break
}
case 'slice': {
  const y0 = j.top - PRESS
  const y = y0 + (j.bottom - y0) * ease(k)
  P = knifeAt(y, 0.012 * Math.sin(k * Math.PI * 2))
  setDent(j.pieces, Math.max(0.0007, PRESS * Math.exp(-j.t * 6)) * (1 - k * 0.6))
  break
}
```

- **Adaptasi:**
  - **Frame-pure:**
    - `runJob` meng-integrasi `j.t += dt·speed/PH`, tapi dengan speed konstan setara dengan fase dari kumulatif durasi, jadi **A**.
    - Remah memakai `Math.random`: ganti hash ber-seed + balistik closed form (A). Atau bake (C).
    - Squash substep: ganti respons impuls `A·exp(−ζωτ)·sin(ω_d τ)` (A). Engine kita `spring()` = step response.
  - **Di film:**
    - ghost hand / cursor di UI sim: drag slider = tekan + hambatan + tembus.
    - data reveal: pisau memotong bar/pie untuk topik "dipotong" (pajak, anggaran, PHK).
    - SFX: press → `click`, break → `cut`, saw → `slide`/`swish`, flick → `whoosh`, landing → `thud`.
  - **Risiko kiblat:** kue = mainan. Ambil tata bahasa koreografinya untuk objek kita (grafik, dokumen, kartu).
- **Sudah ada:**
  - cursor glide + klik dasar (`/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/_template-longform/contoh/penutup.film.js:218`)
  - squash on impact (`/home/ikhsands/Proyek/super-motion-claude-ikhsan/.claude/skills/motion-taste/references/light-atmosphere.md:42`)
  - "sound follows physics" (`enterprise-motion.md:59`)
- **Baru:** phase table bernama dengan hambatan/tembus + emisi cue SFX di batas fase.
- **Fit: 4/5**

---

## Pola lintas repo

1. **Satu skalar → banyak envelope.**
   - Contoh: iphone φ, vinyl `zoom`, discography `open`/`room`, organ `level·power`.
   - Untuk scene kita: ekspos satu `progress` per beat, lalu turunkan semua properti dengan jendela smoothstep + pow berbeda. Hasilnya stagger yang terkunci, bukan 10 timeline lepas.
2. **Timestamp event = sumber kebenaran tunggal.**
   - Contoh: xylophone `aStrikeTime`, organ `changed → click`, slice batas fase → `sound.saw`.
   - Untuk kita: satu daftar cue `{t, kind}` dipakai **dua kali**: peluruhan visual closed form dan baris `SFX` di `beats.js`.
3. **Cahaya fisik yang murah:** softbox analitik / ramp env, bukan HDRI; layar sebagai sumber cahaya; ACES + dither melawan banding di hitam.
4. **Material dibaca lewat suku sudut:** Fresnel, anisotropic, diffraction, iridescence. Semuanya `dot()` terhadap arah kamera, jadi **gerak kamera yang menjual material**. Di 2D, kunci gradient ke parameter kamera.
5. **Gerak tidak pernah berhenti mati:** naik cepat / turun lambat (the-hand), follow bergradasi jarak (discography), ayunan tahan meluruh (ocarina), pendulum meluruh (xylophone).
6. **Tabel konversi stateful → frame-pure:**

   | Asal | Konversi |
   |---|---|
   | exp follow | time-shift `1/k`, atau jumlah step closed form |
   | spring substep | rumus damped oscillator |
   | GSAP timeline | seek (sudah A) |
   | Rapier / fluid | bake (C) atau buang |
   | `Math.random` | hash ber-seed |

7. **Audio:** event fisik → sintesis non-tonal (noise burst BP, thump dengan pitch drop). Ini cocok dengan aturan no-ting. Yang tonal (pentatonik xylophone, sampler ocarina, `tok` slice) tidak dipakai.
8. **WebGPU/TSL** hanya ada di the-hand. Sisanya WebGL2/three r182–186, segaris dengan engine kita (r186).

---

## Resep untuk engine kita

Semua kerangka frame-pure (fungsi `t`), memakai `E` dan `spring` dari `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/_template-longform/_chapter/src/engine.js:21-43`. Koordinat 2D: y ke bawah. Ini adaptasi kita, bukan API yang sudah ada.

### Resep 1 · Ghost hand phase table (slice + ocarina + the-hand)

**Dipakai untuk:** UI demo (kursor/tangan menekan, menggeser, memotong) dan data reveal (memotong bar/pie). Batas fase sekaligus jadi cue SFX.

```js
const PH = [['travel',.36],['descend',.11],['press',.20],['slice',.46],['flick',.22],['hold',.08],['lift',.26],['home',.42]];
export function phaseAt(s, speed = 1) {                 // s = detik sejak aksi mulai
  let t0 = 0;
  for (let i = 0; i < PH.length; i++) { const d = PH[i][1] / speed;
    if (s < t0 + d) return { name: PH[i][0], k: Math.max(0, (s - t0) / d), t0 }; t0 += d; }
  return { name: 'done', k: 1, t0 };
}
export function ghostHand(t, A, B, tStart, o = {}) {      // A = rest, B = titik target
  const { press = 14, depth = 120, saw = 8, arc = 70, lean = .25, speed = 1 } = o;
  const p = phaseAt(t - tStart, speed), L = (a, b, e) => a + (b - a) * e, top = B.y - 40;
  let x = A.x, y = A.y, rot = 0;
  switch (p.name) {
    case 'travel': { const e = E.inOutCubic(p.k); x = L(A.x, B.x, e); y = L(A.y, top, e) - Math.sin(Math.PI * e) * arc; break; }
    case 'descend': x = B.x; y = L(top, B.y, E.outCubic(p.k)); break;
    case 'press':  x = B.x + saw * .3 * Math.sin(Math.PI * p.k); y = B.y + press * p.k * p.k; break;   // hambatan k²
    case 'slice':  x = B.x + saw * Math.sin(2 * Math.PI * p.k); y = L(B.y + press, B.y + depth, E.inOutCubic(p.k)); break;
    case 'flick':  x = B.x; y = B.y + depth; rot = lean * E.outCubic(p.k); break;
    case 'hold':   x = B.x; y = B.y + depth; rot = lean; break;
    case 'lift':   { const e = E.inOutCubic(p.k); x = B.x; y = L(B.y + depth, top, e); rot = lean * (1 - e); break; }
    case 'home':   { const e = E.inOutCubic(p.k); x = L(B.x, A.x, e); y = L(top, A.y, e) - Math.sin(Math.PI * e) * arc * .6; break; }
  }
  const dent = p.name === 'press' ? press * p.k * p.k : p.name === 'slice' ? press * Math.exp(-6 * p.k * PH[3][1]) : 0;
  return { x, y, rot, dent, phase: p.name, k: p.k };      // dent → objek yang ditekan ikut penyok
}
export const handCues = (tStart, speed = 1, map = { press: 'click', slice: 'cut', flick: 'whoosh', lift: 'swish' }) => {
  let t = tStart; const out = [];
  for (const [n, d] of PH) { if (map[n]) out.push([+t.toFixed(3), map[n]]); t += d / speed; }
  return out;                                             // → SFX beats.js (ubah ke "beat+off" atau detik; cek VOFF)
};
```

**Knob:**
- `speed` (0.6–1.4)
- `press` 8–20 px
- `depth`
- `saw` 4–12 px
- `arc` 40–90 px
- `lean` 0.15–0.35 rad
- `map` SFX: kind non-tonal saja

**Variasi:** objek target ikut miring ke arah tekan (pose table ocarina, rotY ±0.18 · envelope tekan).

### Resep 2 · Unfold envelope pack (iphone-duo-sim)

**Dipakai untuk:** reveal UI Apple-style, chapter card "cover terbuka", transisi "di balik layar". Satu `phi(t)` menggerakkan semuanya.

```js
const sstep = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
const cl = x => Math.min(1, Math.max(0, x));
export function unfoldAt(t, t0, o = {}) {
  const { hold = .4, open = 2.4, blur = 18, baseDim = .08, drift = .5, zoomAmt = .06 } = o;
  const p = E.inOutSine(cl((t - t0 - hold) / open));
  const phi = 180 * (1 - p), th = phi * Math.PI / 180;     // 180 = tertutup, 0 = terbuka
  return {
    phi, p,
    coverScaleX: Math.cos(th),                                 // muka cover: lebar terproyeksi (strip-slicing)
    hingeShift: drift * p,                                     // engsel bergeser (fraksi lebar)
    zoom: 1 + zoomAmt * (1 - p),
    blurIn: blur * Math.pow(cl(phi / 90), .8),                 // UI di bawah: blur saat cover masih menutup
    distort: Math.pow(cl(phi / 90), .7),                       // amplitudo wobble dekat front lipatan (pakai e²)
    shade: .8 + .2 * Math.max(Math.cos(th), 0),
    outerBright: .12 + .88 * sstep(92, 178, phi),
    baseBright: baseDim + (1 - baseDim) * sstep(150, 92, phi),
  };
}
// draw: base UI → ctx.filter = `blur(${u.blurIn}px) brightness(${u.baseBright})`
//       cover   → per kolom 4 px: h = H·(1 + .08·(1-|cos th|)·x/W), alpha = u.outerBright·u.shade
//       crease  → linearGradient tipis 0.07 hitam di garis engsel
```

**Knob:**
- `open` 1.6–4.6 s (asli 4.6, untuk tempo kita sekitar 2.4)
- `blur` ≤ 24 px (biaya ×8)
- jendela `sstep` (92/150/178): urutan siapa terang duluan
- `distort` × `gridStrength` 0.035 / CA ≤ 0.01

### Resep 3 · Strike list → pendulum closed form + SFX (xylophone + organ-bank)

**Dipakai untuk:** item daftar / kartu bukti yang "dipukul" tepat saat VO menyebutnya, angka yang berdetak, dashboard "hidup".

```js
export const HITS = [[12.40, 0], [12.86, 1], [13.30, 2], [13.71, 4]];   // [t, indeks item] dari VO align
export function swing(t, i, o = {}) {                     // sudut ayun (rad), superposisi semua pukulan
  const { amp = .18, f = 16, decay = 4.5 } = o;           // asli: amp .58, 16 rad/s, decay 4.5
  let a = 0;
  for (const [th, j] of HITS) if (j === i && t >= th) { const d = t - th; a += amp * Math.exp(-d * decay) * Math.sin(d * f); }
  return a;
}
const frac = x => x - Math.floor(x);
export function heartbeat(t, bpm = 72) {                  // lub-dub 0..1 (rumus organ-bank, ditulis ulang)
  const ph = frac(t * bpm / 60);
  const lub = ph < .035 ? ph / .035 : Math.exp(-(ph - .035) * 12);
  const dub = ph < .3 ? 0 : ph < .33 ? (ph - .3) / .03 * .55 : .55 * Math.exp(-(ph - .33) * 15);
  return Math.min(1, lub + dub);
}
export function beatTimes(t0, t1, bpm = 72) {             // untuk SFX: satu 'thud' per detak, kuat tiap 4
  const out = [], T = 60 / bpm;
  for (let k = Math.ceil(t0 / T), t; (t = k * T) < t1; k++) out.push([+t.toFixed(3), k % 4 ? 'thud' : 'sub']);
  return out;
}
export const hitCues = () => HITS.map(([t]) => [t, 'strike']);   // gambar & suara dari daftar yang sama
```

**Knob:**
- `amp` 0.08–0.3 rad (UI kalem ~0.12)
- `f` 12–20 rad/s
- `decay` 3–6
- superposisi vs hanya pukulan terakhir (asli: terakhir saja, karena `aStrikeTime` ditimpa)
- `bpm`
- dB SFX ~8–12 dB di bawah VO

### Resep 4 · Depth-frosted glass collage (the-hand → 2D)

**Dipakai untuk:** hook atau transisi di mana foto/cut-out "menembus" kaca buram; makin dekat ke kaca makin tajam dan pekat.

```js
const cl = x => Math.min(1, Math.max(0, x));
const scratch = document.createElement('canvas'); scratch.width = 480; scratch.height = 270;   // kanvas ¼
const sctx = scratch.getContext('2d');
// layer: { img, x, y, w, h, d: t => 0..1 }  (0 = menempel kaca, 1 = jauh), digambar dari jauh ke dekat
export function frostLayer(ctx, L, t, o = {}) {
  const { maxBlur = 28, curve = .87, far = .205 } = o;
  const d = cl(L.d(t)), b = maxBlur * Math.pow(d, curve), a = 1 + (far - 1) * d;
  ctx.save(); ctx.globalAlpha *= a;
  if (b < 6) {                                            // blur kecil: langsung
    ctx.filter = b > .3 ? `blur(${b.toFixed(2)}px)` : 'none';
    ctx.drawImage(L.img, L.x, L.y, L.w, L.h);
  } else {                                                // blur besar: di ¼ res lalu upscale (lebih murah ×8 subframe)
    sctx.setTransform(1, 0, 0, 1, 0, 0); sctx.clearRect(0, 0, 480, 270); sctx.filter = `blur(${(b / 4).toFixed(2)}px)`;
    sctx.drawImage(L.img, L.x / 4, L.y / 4, L.w / 4, L.h / 4); sctx.filter = 'none';
    ctx.imageSmoothingQuality = 'high'; ctx.drawImage(scratch, 0, 0, 1920, 1080);
  }
  ctx.restore();
}
export function glassSheet(ctx, t, o = {}) {              // kaca: veil ivory tipis + kilau diagonal pelan
  const { veil = .06, sheen = .05 } = o, g = ctx.createLinearGradient(0, 0, 1920, 1080), s = .3 + .05 * Math.sin(t * .4);
  g.addColorStop(0, `rgba(241,239,230,${veil})`); g.addColorStop(s, `rgba(241,239,230,${veil + sheen})`);
  g.addColorStop(Math.min(1, s + .08), `rgba(241,239,230,${veil})`); g.addColorStop(1, `rgba(241,239,230,${veil})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
}
// hero cut-out dipecah 2–3 irisan (mis. tangan d−.1, lengan d, bahu d+.2) supaya gradasi terjadi di dalam satu objek
```

**Knob:**
- `maxBlur` 16–36 px
- `curve` 0.7–1.0
- `far` 0.15–0.35
- `d(t)` diease (outQuint saat "menempel")
- `veil` 0.04–0.08

**Variasi xylophone untuk panel UI:** backdrop ¼-blur disampel dengan offset kecil ke arah tepi + garis Fresnel ivory + rim iridescent alpha ≤ 0.15.

Biaya per layer belum diukur.

### Resep 5 · Deret bukti dengan velocity lean + trail bergradasi (discography)

**Dipakai untuk:** deret headline/artikel/kartu bukti yang di-scroll ghost hand di stasiun Vox; deret terasa bermassa.

```js
// P(t) = posisi deret dalam satuan kartu, di-author dengan ease (mis. 0 → 6 di 1.4 s, outQuint)
export function rowPose(P, t, i, o = {}) {
  const { lean = .055, leanMax = .3, bank = .32, dip = .014, dipMax = .09,
          gap = 300, depth = 260, spread = .35, kBase = 11, kFall = 1.15, kMin = 6.5, kMax = 15 } = o;
  const dist = Math.abs(i - P(t));
  const k = Math.min(kMax, Math.max(kMin, kBase - dist * kFall));
  const tl = t - 1 / k;                                   // time-shift = group delay exp-follow (adaptasi, sudut tajam tidak dihaluskan)
  const off = i - P(tl), h = 1 / 120;
  const v = (P(tl + h) - P(tl - h)) / (2 * h);            // kartu/detik
  const L = Math.max(-leanMax, Math.min(leanMax, Math.sign(v) * Math.sqrt(Math.abs(v)) * lean));
  const ang = off * spread;
  return {
    x: Math.sin(ang) * gap * 2.4, z: depth - Math.cos(ang) * depth,
    rotY: -ang + L, rotZ: -L * bank, dy: Math.min(dipMax, Math.abs(v) * dip),
  };                                                       // → proyeksikan lewat kamera 3D kit (cek signature onPlane/camera)
}
```

**Knob:**
- `spread` 0.25–0.45
- `lean` (satuan flow asli belum pasti; **kalibrasi ulang**, mulai 0.03–0.06)
- `bank` 0.2–0.4
- `kBase`/`kFall` (trail 2–5 frame)
- dip dalam satuan dunia kit

**Pasangan alami:** ghost hand Resep 1 sebagai penggerak `P(t)` (fase `travel` = drag).
