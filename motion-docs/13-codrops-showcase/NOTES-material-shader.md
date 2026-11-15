---
group: material-shader
repos:
  - https://github.com/phileeppov/glass@f56a62f
  - https://github.com/rock-biter/procedural-eye@42cb2cf
  - https://github.com/ismamz/amber@a0a317c
  - https://github.com/abhishekmill/R3FSketchMaterial@dbdfe82
  - https://github.com/kekkorider/codrops-tutorial-dark-cluster@f39816b
  - https://github.com/clementgrellier/unwoven@32c4bfc
  - https://github.com/krisyangdev/yarn-world@3e8401d
fetched: 2026-11-15
---

# NOTES — material & shader (kaca, material organik, NPR, permukaan prosedural)

Isi grup ini adalah material dan shading: kaca, optik lensa, material organik, gaya sketsa (NPR), dan permukaan prosedural.
Semua pointer `file:line` relatif ke folder ini (`repo-<owner>--<repo>/…`), dan semuanya sudah dibaca dari mirror.
Tanda yang dipakai:
- **[sudah ada]**: teknik ini sudah tercatat di skill/engine kita.
- **[belum diverifikasi]**: belum dicek di source, atau baru ide adaptasi kita yang belum dites.

Skor cocok memakai skala 1–5:
- 5 = langsung menaikkan film long-form kita (Vox + dokumenter, kolase 3D, UI Apple, diagram, peta).
- 1 = tidak relevan atau berisiko kiblat.

Engine yang dirujuk:
- Engine long-form, `aset/_template-longform/_chapter/src/engine.js`:
  - Canvas 2D: `makeRenderer(scene)`, `scene.draw(ctx, t)`.
  - K subframe motion blur dengan rata-rata berjalan `globalAlpha = 1/(i+1)`, di `engine.js:99-108`.
  - `grain()`, `spring()` (`engine.js:39`), dan easing `E.*` (`engine.js:21-35`).
- Engine three.js r186: `.claude/skills/motion-video-engine`.

---

## phileeppov/glass

- **File inti:**
  - `src/renderer.js`: satu fragment shader WebGL1 untuk semua optik, plus konteks WebGL di sekitar `:452`.
  - `src/sdf.js`: SDF dari alpha logo.
  - `src/app.js`: load logo, preset, clock loop, rekam video.
  - `src/sound.js`: band audio ke `u_bands`.
- **Look:** logo (atau tile squircle) jadi lempeng kaca tebal yang membiaskan latar. Ada fringe pelangi tipis di bibirnya dan kilau (glint) tipis yang menyapu, dalam loop 4 detik.
- **Teknik:**
  - SDF dari alpha logo lewat EDT Felzenszwalb–Huttenlocher (`src/sdf.js`, `SDF_SPREAD = 32` texel di `renderer.js:47`).
  - Jarak superellipse analitik plus normal dari gradien.
  - `snorm` (level set superellipse) untuk inset tanpa lipatan di sudut.
  - Refraksi lempeng (slab) dengan `refract()`.
  - Dispersi spektral 32 tap dengan jitter IGN.
  - Re-saturasi.
  - Fresnel ala Schlick.
  - Glint Gaussian di bibir.
  - Warna logo "bocor" ke badan kaca lewat blur 24/6/0 px (`app.js:337-372`).
- **Mekanisme:**
  - **Bentuk:** `shape()` di `renderer.js:113-122` menghitung `f = (|x|^n + |y|^n)^(1/n)` dan gradien `g`, lalu jarak ≈ `(f−1)/|g|`. `u_n`: 2 = lingkaran, 5 = rounded square (`renderer.js:70`).
  - **Inset:** memakai `snorm` (`:129-132`), bukan jarak konstan. Komentar source: inset konstan "breaks at a corner … the rim lens magnifies that kink" (`:126-128`).
  - **Slab:** `throughSlab` (`:157-161`) membiaskan sinar mata `(0,0,-1)` di normal `n3` dengan `1/ior` (ior dijepit ≥ 1.02 supaya tidak terjadi total internal reflection), lalu mendarat di lantai sejauh `h`.
  - **Dispersi** (`:356-390`):
    - 32 sampel, `x = (i + ign)/32`, bobot `spectrum(x)`.
    - Merah diproyeksikan lebih dalam, biru dekat tepi (`spread = (0.5 − x)·order`).
    - Hasilnya dibagi jumlah bobot, lalu disaturasi ulang ×1.35. Komentar source: "past this colored logos and photos turn acid".
  - **Besar pergeseran:** `k = u_refract·0.42·wave·swell·cornerReach·max(rimPull, flow·u_liquid)·side` (`:285`).
  - **Fresnel:** `0.04 + 0.96·(1 − n3.z)^3` (`:403`).
  - **Glint:** `exp(−((−d − 0.012)/(2px))²)` (`:394`), garis 1–2 px tepat di dalam tepi.
  - **Loop:** `PERIOD = 4000` ms (`app.js:11`), `u_phase` 0..1 (`renderer.js:74`).
  - **Preset slider** (`app.js:1346-1378`; pemetaan slider → uniform ada di `app.js:474-500`, angka akhirnya per uniform [belum diverifikasi]):

    | Slider | Rentang |
    |---|---|
    | refraction | 0.85–1.5 |
    | dispersion | 0.85–1 |
    | edge | 0.17–0.28 |
    | liquid | 0–0.85 |
    | thickness | 0.35–0.6 |
    | motion | 0.4–0.5 |

    Bentuknya squircle atau circle.
- **Kenapa terasa mahal:**
  - Kacanya bening, jadi badan kaca hampir sama dengan latar. Yang "bicara" hanya bibirnya: lensa, fringe tipis, dan glint 1 px.
  - Dispersinya fisik: merah di luar, cyan di dalam, dan dijitter supaya tidak berpita.
  - Ada batas saturasi yang disengaja.
  - Sudut squircle tetap mulus karena inset memakai norm, bukan offset.
- **Potongan kode:**
  ```glsl
  // repo-phileeppov--glass/src/renderer.js:157-161
  vec2 throughSlab(vec3 n3, float ior, float h) {
    vec3 t = refract(vec3(0.0, 0.0, -1.0), n3, 1.0 / max(ior, 1.02));
    return t.xy / max(-t.z, 0.25) * h;
  }
  // :360-370 (dipangkas)
  float jitter = ign(gl_FragCoord.xy);
  for (int i = 0; i < TAPS; i++) {
    float x = (float(i) + jitter) / float(TAPS);
    vec3 w = spectrum(x) * (1.0 + 0.6 * tone);
    float spread = (0.5 - x) * order * (1.0 + 0.5 * tone + 0.8 * u_light.z + 0.5 * reachHit);
    vec2 off = -dir * (k + kDisp * u_disp * spread * 0.75) + ripple + wake;
  ```
- **Lisensi:** MIT © 2026 Nikita Filippov. Kode boleh di-port dengan atribusi. Font Onest di `fonts/` memakai SIL OFL (`README.md:23`); boleh dipakai, tapi tidak relevan bagi kita.
- **Adaptasi:**
  - **Frame-pure:** ya. `u_phase = (t / 4) mod 1`. `u_bands` diisi envelope VO per frame yang sudah dianalisis (deterministik), atau 0. Tilt dan kursor jadi jalur ter-author.
  - **Render:** fullscreen quad di WebGL2 offscreen, lalu `drawImage` ke Canvas 2D. 32 tap pada 1080p berat kalau ×K subframe, jadi pakai 8 tap dan putar jitter per subframe (8×8 = 64 sampel efektif) [belum diverifikasi].
  - **Tempat di film:**
    - logo reveal di Portal QR atau penutup;
    - panel UI Apple ("liquid glass") di atas kolase;
    - kartu kutipan yang melayang di depan foto.
  - **[sudah ada]** Refractive glass versi SVG displacement (`light-atmosphere.md:34`) dan CA (`:35`). Repo ini **upgrade-nya**: bentuk squircle, slab, Fresnel, dan glint.
  - **Risiko kiblat:**
    - Fringe pelangi bisa jadi neon. Batasi dispersi di bibir saja, cerahkan hanya saat bergerak, dan biarkan nyaris hilang saat hold.
    - Kaca masuk hitungan motif lock (`light-atmosphere.md:56`).
    - Jangan dicampur dengan halftone/dither dalam satu frame (`:37`).
- **Skor cocok: 4**

## rock-biter/procedural-eye

- **File inti:**
  - Lensa: `src/camera/lensSampling.js`, `physicalCamera.js`, `cameraOptics.js`.
  - Akumulasi: `src/render/accumulationPass.js`, `src/shaders/accumulate-fragment.glsl`, `src/render/postProcessing.js`.
  - Debu: `src/atmosphere/dustField.js`, `src/shaders/dust-vertex.glsl`, `dust-fragment.glsl`.
  - Mata: `iris-sdf.glsl`, `iris-noise.glsl`, `cornea-optics.glsl`.
  - Atmosfer dan finishing: `light-shafts.glsl`, `scattering.glsl`, `film-grain-fragment.glsl`, `color-grade-fragment.glsl`.
- **Look:** foto makro mata manusia yang sepenuhnya prosedural. Serat iris, kornea membiaskan, debu melayang di berkas cahaya, dan DOF yang terasa foto asli, bukan blur post.
- **Teknik:**
  - DOF thin-lens dengan akumulasi progresif:
    - jitter subpiksel Halton(2,3);
    - sampel lensa Halton(5,7) dipetakan ke disk konsentris Shirley–Chiu;
    - kamera digeser di aperture dan frustum di-shear supaya bidang fokus tetap.
  - Running mean dengan guard NaN.
  - Debu defocus yang hemat energi, dengan drift closed-form.
  - Berkas cahaya Gaussian dengan integral erf dan fase Henyey–Greenstein.
  - Serat iris lewat domain repetition polar.
  - Grain statis per piksel.
  - Kontras log di pivot 0.18.
- **Mekanisme:**
  - **Sampel ke-i** (`lensSampling.js:36-46`): `i+1`, `jitter = halton(i,2|3) − 0.5`, `lens = concentricDisk(halton(i,5), halton(i,7))`.
  - **Shear proyeksi** (`cameraOptics.js:39-55`): `x = −lensX/halfWidth − 2·jitterX/widthPx` (y sama), ditambahkan ke `e[8]`, `e[9]` matriks proyeksi (`physicalCamera.js:75-87`).
  - **Akumulasi:**
    - Bobot `1/(n+1)` (`accumulationPass.js:81`), `mix(history, current, uWeight)`. Sampel NaN/Inf dibuang (`accumulate-fragment.glsl:12-18`).
    - DOF post hanya cadangan selama 16 sampel pertama: `weight = 1 − min(1, (samples−1)/15)` (`postProcessing.js:185`).
  - **Urutan pass** (`postProcessing.js:156-174`): render → accumulation → dof → dust → shock → effect (grade + grain) → AA → final.
  - **Debu** (`dust-vertex.glsl`):
    - Posisi closed-form di t: `mote·side + wind·t·(0.7 + 0.3·rate) + turbulence·sin(t·rate·(.071,.053,.062) + phase)`, lalu `mod` wrap di kotak (`:49-51`).
    - CoC thin-lens (`:73`). Radius `sqrt(coc² + w²/4 + 0.3)` (`:74`).
    - **Energi kekal:** `radiance · area/spread` (`:110-113`). Bayangan yang makin besar jadi makin redup, total cahayanya sama.
    - Kernel `(1 − s²)²` (`dust-fragment.glsl:19`). Serat bersilang dirotasi `mat2(.36,.93,−.93,.36)` (`:26`).
    - Cahaya berkas: `hgPhase` (`scattering.glsl:9`). Pola berkas Gaussian dengan erf Winitzki (`light-shafts.glsl:6,29`).
  - **Grain:** `hash12(floor(gl_FragCoord))`, `rgb·(1 + 2·noise·intensity)` (`film-grain-fragment.glsl:15-16`). Statis, tidak "mendidih".
  - **Grade:** `c = 0.18·pow(c/0.18, contrast)` (`color-grade-fragment.glsl:11`). Kontras berporos di abu-abu tengah, jadi mid-tone tidak bergeser.
  - **Iris:** `fiberFamily` (`iris-sdf.glsl:77`), sel sudut `TAU/count`, serat radial dan busur. Parameter di uniform `uFiberRadial`/`uFiberArc` (`:22-23`).
- **Kenapa terasa mahal:**
  - Blur-nya hasil lensa, bukan filter. Bokeh berbentuk disk, tepi objek in-focus tidak "bocor" ke belakang, dan foreground blur menutupi latar dengan benar.
  - Debu yang defocus tidak jadi bola glow yang terang, karena energinya kekal.
  - Semua besaran fisik punya satuan (mm, f-number).
- **Potongan kode:**
  ```glsl
  // repo-rock-biter--procedural-eye/src/shaders/dust-vertex.glsl:49-51, 73-74, 110-113 (dipangkas)
  vec3 wander = sin(uTime * rate * vec3(0.071, 0.053, 0.062) + motion.xyz);
  vec3 local = mote.xyz * side + uWind * uTime * (0.7 + 0.3 * rate) + uTurbulence * wander;
  local = mod(local + 0.5 * side, side) - 0.5 * side;
  float coc = 0.5 * uLens.x * (depth - uLens.y) / (depth * uLens.z) * uLens.w;
  float radius = sqrt(coc * coc + 0.25 * widthPx * widthPx + 0.3);
  float area = flake ? 0.785 * lengthPx * lengthPx : lengthPx * widthPx;
  float spread = 2.0 * halfLength * radius * 16.0 / 15.0 + PI * radius * radius / 3.0;
  vColor = radiance * uBrightness * fade * area / spread;
  ```
- **Lisensi:** tidak ada file LICENSE. Belajar saja, jangan salin kode; tulis ulang mekanismenya. Pengecualian: `hash12` adalah milik Dave Hoskins (MIT) menurut komentar `film-grain-fragment.glsl:7`.
- **Adaptasi:**
  - **Akumulasi DOF:** frame-pure dan deterministik.
    - N sampel Halton per frame output, dirata-rata. Biaya ×N.
    - Engine long-form kita **sudah** merata-rata K subframe dengan bobot `1/(i+1)` yang sama (`engine.js:99-108`, [sudah ada] untuk motion blur). Jadi sampel lensa bisa menumpang di loop yang sama: subframe ke-i memakai sampel lensa ke-i. Lihat Resep 1.
    - Untuk three.js: shear `projectionMatrix.elements[8/9]`, render N kali, rata-rata di render target float.
  - **Debu:** closed-form di t, jadi frame-pure. Murah sekali di Canvas 2D (Resep 2).
  - **Berkas cahaya:** analitik (erf), jadi frame-pure; port GLSL perlu waktu [belum diverifikasi biaya].
  - **Grade log 0.18 dan grain statis:** tambahan kecil di `scene.post`. Grain animasi kita [sudah ada] (`colour-finish.md:35`).
  - **Tempat di film:**
    - rack focus antar-bidang foto di stasiun kolase dokumenter;
    - debu di lapisan FG untuk foto arsip dan ruang;
    - kontras log untuk grade akhir.
  - **[sudah ada]** DOF post `BokehPass` (`engine-api.md:12,17,38`). Thin-lens akumulasi **baru**.
  - **Risiko kiblat:**
    - Rendah. Debu harus netral atau hangat dan jarang, bukan partikel neon.
    - Grain jangan sampai "jadul" (`no-vintage-film-look`).
- **Skor cocok: 5**

## ismamz/amber

- **File inti:**
  - `app/components/scene.tsx`: R3F scene, material, platform, post.
  - `app/lib/radiograph.ts`, `reveal.ts`, `eases.ts`, `specimens.ts`, `transition.ts`.
- **Look:** penampil spesimen ala museum. Serangga dalam blok amber madu di atas meja putar dengan grid blueprint teknis. Spesimen dibuat monokrom dingin ("radiograph"), judul editorial muncul lewat mask.
- **Teknik:**
  - `MeshPhysicalMaterial`: transmission dan attenuation volume.
  - Albedo monokrom lewat `onBeforeCompile`.
  - Grid blueprint shader dengan AA `fwidth`.
  - Post: Bokeh → un-premultiply → ACES.
  - Reveal judul dengan blok wipe plus baris `yPercent`.
  - CustomEase.
- **Mekanisme:**
  - **Amber** (`scene.tsx:497-505`):

    | Parameter | Nilai |
    |---|---|
    | `transmission` | 0.96 |
    | `ior` | 1.54 |
    | `roughness` | 0.22 |
    | `thickness` | 0.3 |
    | `attenuationColor` | `#e8a000` |
    | `attenuationDistance` | 0.7 |

    Warna madu datang dari tebal volume, bukan dari albedo. `transmissionResolutionScale = 0.5` untuk hemat (`:454-457`).
  - **Radiograph** (`radiograph.ts:21-31`): setelah `#include <map_fragment>`:
    - `mono = luma(diffuse)·gain + lift`;
    - `diffuse = mix(vec3(.12,.16,.19), vec3(.72,.82,.87), mono)`;
    - lighting, roughness, dan normal map tetap.
    - Per spesimen: gain 0.9–1.05, lift 0.03–0.2, roughness 0.62–0.88, normal 1.1–1.35 (`specimens.ts:18-58`).
  - **Grid** (`scene.tsx:1200-1229`):
    - Garis tiap sel (22 sel melintang), tebal `0.5/26` sel, AA `fwidth(grid)·0.5`.
    - Tanda plus tiap 4 sel.
    - Fade tepi radial `smoothstep(.43,.5,r)`.
    - Warna `(0.18,0.25,0.31)` dengan alpha 0.45 untuk garis, 0.9 untuk tanda.
  - **Post** (`scene.tsx:1332-1335`): `Bokeh(focus .07, dof .07, aperture .15, maxBlur .005)` → Straight (un-premultiply untuk kanvas transparan, `:60-80`) → ACES Filmic.
  - **Gerak:**
    - Turntable `rotation.y += delta·0.32` (`:546`).
    - Masuk platform: `y −3 → 0` dan skala 0.3 → 1 dengan power3.out 0.9 s, lalu amber `amount` 0 → 1 power3.out 0.6 s pada +0.9 s (`:829-846`).
  - **Reveal** (`reveal.ts:22-42`): blok `scaleX 0 → 1`, baris teks `yPercent 100 → 0` dengan stagger, lalu blok `scaleX → 0`. Durasi `0.85·pace`.
  - **Ease** (`eases.ts:6-7`): `im-quint-inout (.76,0,.2,1)` dan `im-quart-inout (.65,.01,.05,.99)`.
- **Kenapa terasa mahal:**
  - Kontras material: satu material hangat (amber) di dunia monokrom dingin (spesimen dan grid). Ini persis aturan satu aksen.
  - Grid tipis dengan AA sempurna memberi kesan "lab".
  - Ease quart-inout yang sangat tajam (.65,.01,.05,.99) bikin gerak terasa "snap → hold".
- **Potongan kode:**
  ```glsl
  // repo-ismamz--amber/app/lib/radiograph.ts:26-28 (inject setelah #include <map_fragment>)
  float mono = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  mono = clamp(mono * GAIN + LIFT, 0.0, 1.0);
  diffuseColor.rgb = mix(vec3(0.12, 0.16, 0.19), vec3(0.72, 0.82, 0.87), mono);
  // scene.tsx:1213-1214 — garis grid ber-AA
  vec2 softness = fwidth(grid) * 0.5 + 0.0001;
  vec2 toLine = abs(grid - floor(grid + 0.5));
  ```
- **Lisensi:** tidak ada LICENSE. Belajar saja, jangan salin kode. Rumus luma Rec.709 dan `fwidth` AA adalah pengetahuan umum; tulis ulang sendiri.
- **Adaptasi:**
  - **Frame-pure:** ya.
    - Rotasi `= t·0.32`.
    - Timeline GSAP jadi keyframe di t dengan `E.*`.
    - Reveal = tiga segmen waktu.
    - Transmission three.js deterministik.
  - **Biaya:** transmission = render pass tambahan (sedang). Radiograph dan grid murah.
  - **Tempat di film:**
    - stasiun "cara kerja" atau "bedah benda": HP, chip, atau produk diputar di atas grid blueprint, versi mono-radiograph, dan hanya bagian yang dibahas diberi warna (lime);
    - "x-ray" transisi dari foto ke skema.
  - **[sudah ada]** Bokeh (`engine-api.md:12`). Mask/wipe reveal judul ada di kinetic type [sudah ada secara umum].
  - **Risiko kiblat:**
    - Amber madu mudah jadi sepia/jadul. Pakai warna transmission netral atau dingin, atau lime hanya untuk satu objek.
    - Grid blueprint jangan sampai jadi "template tech".
- **Skor cocok: 4** (radiograph + grid). Amber madu sendiri: 2.

## abhishekmill/R3FSketchMaterial

- **File inti:**
  - `src/sketch/glsl.js`: hash, noise, rot, ellipse, tooth, scribble, hatch.
  - `src/sketch/SketchMaterial.jsx`: triplanar.
  - `src/sketch/reveal.js`: wash reveal.
  - `src/sketch/SketchOutline.jsx`: garis pena dan inverted hull.
- **Look:** objek 3D digambar tinta pena di kertas. Arsir coretan yang mengikuti tona, arsir silang di area gelap, garis tepi bergoyang yang kelewat di sudut, dan tinta yang "meresap" muncul seperti cat air.
- **Teknik:**
  - Tangga tona arsir (scribble hatching), proyeksi triplanar.
  - Tekstur gigi kertas.
  - Wash reveal noise dengan tepi basah.
  - Garis pena multi-pass yang bergoyang dan overshoot, plus inverted hull.
- **Mekanisme:**
  - **`sk_hatch`** (`glsl.js:68-86`):
    - Jarak baris `0.84/(density·mix(0.6,1.5,smoothstep(.2,.75,dark)))`.
    - Arsir silang muncul di `smoothstep(.62,.75,dark)` pada sudut `+0.8` rad.
    - "Tekanan" tinta `0.68 + 0.64·noise`.
    - Gabungan multiplicative `1 − (1−a)(1−b·.64)`.
  - **`sk_reveal`** (`reveal.js:20-26`):
    - `order = mix(noise, y/2.5, uRevealSweep)`;
    - `v = smoothstep(order, order + edge, uReveal·(1 + edge))`;
    - tepi basah `1 + wet·4·v(1−v)`.
    - Default: `uReveal` 0..1, `uRevealScale` 1.2, `uRevealEdge` .15, `uRevealSweep` .35, `uRevealWet` .6 (`reveal.js:5-12`).
  - **Outline** (`SketchOutline.jsx:11-15`): 3 pass. Lebar 1/.85/.75, opacity 1/.85/.7, wobble 1/1.3/1.6, overshoot `[.03,.13]`, `[0,.09]`, `[−.02,.07]` dari panjang tepi. Amplitudo goyang `jitter·min(len, r)·0.8·wobble` (`:57-59`). Hull `BackSide` (`:80`).
- **Kenapa terasa mahal:**
  - Tona dibangun seperti ilustrator sungguhan: kerapatan bertambah, lalu arsir silang baru muncul di area gelap.
  - Tekanan tinta tidak rata.
  - Garis tidak pernah persis menutup sudut.
  - Reveal punya "tepi basah" yang lebih gelap.
- **Potongan kode:**
  ```glsl
  // repo-abhishekmill--R3FSketchMaterial/src/sketch/reveal.js:20-26
  vec2 sk_reveal(vec3 world) {
    vec2 a = world.xz * uRevealScale, b = world.xy * uRevealScale + 7.3;
    float n = 0.5 * (sk_noise(a) + sk_noise(b)) * 0.7 + 0.5 * (sk_noise(a * 3.1) + sk_noise(b * 3.1)) * 0.3;
    float order = mix(n, clamp(world.y / 2.5, 0.0, 1.0), uRevealSweep);
    float v = smoothstep(order, order + uRevealEdge, uReveal * (1.0 + uRevealEdge));
    return vec2(v, 1.0 + uRevealWet * 4.0 * v * (1.0 - v));
  }
  ```
- **Lisensi:** MIT © 2026 Abhishek Verma. Boleh di-port dengan atribusi.
- **Adaptasi:**
  - **Frame-pure:** ya. `uReveal = E.inOutCubic(inv(t0, t1, t))`. Outline statis ber-seed (tanpa `Math.random`). Hatch statis atau di-seed per "boil" 12 fps kalau mau hidup [belum diverifikasi].
  - **Biaya:** murah sampai sedang (fragment noise).
  - **Pola reveal `order = mix(noise, gradien arah, sweep)`** bisa dipakai di luar NPR: reveal foto atau peta yang "meresap" dari bawah ke atas dengan tepi basah. Di Canvas 2D bisa lewat mask noise ter-precompute.
  - **Tempat di film:** satu momen kilas balik atau "sketsa ide", atau diagram konsep yang lalu diganti render bersih.
  - **Risiko kiblat:** TINGGI. Ikhsan menolak "kertas lagi" (`no-paper-concepts-brutal-aesthetic`). Kalau dipakai, versi tinta di latar gelap tanpa kertas, sekali per film, dan tanya dulu.
- **Skor cocok: 2**

## kekkorider/codrops-tutorial-dark-cluster

- **File inti:**
  - `src/main.js`: ekstrusi muka, BatchedMesh, post sobel dan bayer.
  - `src/materials/Cluster.js`, `src/materials/Inner.js`.
  - `src/behaviors/Spin.js`, `src/behaviors/HoverEffect.js`.
- **Look:** gugus gelap berisi prisma-prisma muka icosahedron yang "bernapas" mengikuti noise. Saat di-hover, pecahan berubah jadi matcap kuning. Outline Sobel dari depth dan dither Bayer di output.
- **Teknik:**
  - Tiap muka segitiga diekstrusi jadi instance BatchedMesh dan diarahkan keluar dari centroid.
  - Skala per muka dari noise di centroid.
  - Shading gelap `dot(normal, toOrigin)`.
  - Matcap per hover.
  - Post: Sobel depth + Bayer dither (TSL / WebGPU).
- **Mekanisme:**
  - **Arah muka:** `faceDirection = normalize(centroid − meshPos)` (`main.js:77-81`). Instance di `BatchedMesh` (`:50`).
  - **Napas:** `noise = mx_noise_float(centroid.yz + t)` di-remap ke `[scaleMin, scaleMax]`, lalu `centroid + centered·(noise + hover)` (`Cluster.js:63-70`).
  - **Gelap:** `dot(normalWorld, toOrigin)` remap −1..1 → 0..1 (`Cluster.js:42-45`). Muka yang menghadap pusat lebih terang, jadi bagian dalam gugus berpendar redup.
  - **Hover:** `mix(colorA, matcap, hover)` (`:50-52`). Matcap `yellow-18.png` (`main.js:29`).
  - **Output:** `scenePassColor + sobel(depth)`, lalu `bayerDither` (`main.js:162-169`).
- **Kenapa terasa mahal:**
  - Hampir hitam, dengan satu warna aksen yang hanya muncul di interaksi.
  - Sobel dari depth (bukan dari warna) memberi garis yang bersih di siluet saja.
  - Dither membuat gradien gelap tidak berpita.
- **Potongan kode:** tidak dikutip. Repo tanpa lisensi dan isinya TSL; mekanismenya sudah cukup di atas.
- **Lisensi:** tidak ada LICENSE. Belajar saja, jangan salin kode.
- **Adaptasi:**
  - **WebGPU/TSL:** mungkin tidak jalan di Chrome headless kita. Jalur WebGL2:
    - `InstancedMesh` + `onBeforeCompile` (skala per instance di vertex shader);
    - Sobel pada depth texture di `ShaderPass`;
    - matriks Bayer 4×4 di GLSL.
  - **Frame-pure:** `time` jadi uniform t, `spin = t·speed`, hover jadi jalur ter-author (bola pengaruh bergerak di t).
  - **Biaya:** sedang.
  - **Tempat di film:** metafora "data/serpihan" (mis. kebocoran data, jaringan) dengan aksen lime menyala di bagian yang dibahas.
  - **[sudah ada]** Bayer 4×4 dither (`light-atmosphere.md:37`).
  - **Risiko kiblat:** dither jangan dicampur dengan kaca/UI bersih dalam satu frame. Look "dark tech cluster" dekat ke template sci-fi.
- **Skor cocok: 2**

## clementgrellier/unwoven

- **File inti:** `index.html` (semua JS dan shader inline):
  - `CONFIG` di `:50-61`;
  - vertex shader `:180-240`;
  - fragment shader `:243-300`;
  - `buildRibbonGeometry` di `:302-345`.
- **Look:** karusel kartu foto yang bergulir horizontal. Di tepi viewport tiap kartu terurai jadi 26 benang pita horizontal. Benang meluncur keluar dengan kecepatan berbeda, berkibar, menipis, lalu "luntur" ke warna halaman.
- **Teknik:**
  - Geometri pita per benang (`aThread`).
  - Zona sobek di tepi.
  - Kecepatan lepas acak per benang.
  - Drift vertikal ∝ t².
  - Flutter sinus di sepanjang pita.
  - Inti benang menyusut.
  - Glint di inti.
  - Bleach ke halaman.
- **Mekanisme:**
  - **Config:** `threads 26`, `segments 20`, `tearZoneRatio 0.26` (maks 380 px), `cardRadius 20`, `scrollSpeed 95 px/s` (`:50-61`).
  - **Vertex** (`:205-238`):
    - `tear = max(1 − smoothstep(−hw, −hw + zone, x), smoothstep(hw − zone, hw, x))·uStrength`, dengan `t = tear^1.4`. Komentar: "card stays readable for longer, then lets go fast".
    - Lepas: `run = t·(60 + rA·420)·(0.85 + 0.15·sin(uTime·(1 + 2rB) + rA·τ))`.
    - Drift: `y += (rA − .5)·170·t²`.
    - Flutter: `y += sin(x·0.02 + uTime·(1.6 + 2.2rA) + rA·τ)·(5 + 13rA)·t·uWobble`.
  - **Fragment** (`:265-290`):
    - Inti: `coreWidth = mix(0.8, 0.16 + r·.12, smoothstep(0, .85, tear))`.
    - Alpha benang muncul di `smoothstep(.03,.30,tear)`.
    - Kartu: SDF rounded box.
    - `fade = 1 − smoothstep(.75,1,tear)·.65`.
    - Glint: `tear·0.18` di inti.
    - Bleach: `mix(color, white, smoothstep(.55,1,tear)·.8)`.
- **Kenapa terasa mahal:**
  - Tiap benang punya kecepatan sendiri, jadi tepi terbaca sebagai sisir benang, bukan satu lembar yang bergeser. Komentar source di `:224-225`.
  - Kurva `^1.4` menjaga gambar tetap terbaca lama, lalu lepas cepat (snap).
  - Hasilnya luntur ke halaman, tidak menghilang begitu saja.
  - Semua angka kecil dan halus: flutter 5–18 px.
- **Potongan kode:**
  ```glsl
  // repo-clementgrellier--unwoven/index.html:210-235 (dipangkas)
  float left  = 1.0 - smoothstep(-uHalfWidth, -uHalfWidth + uZone, x);
  float right = smoothstep(uHalfWidth - uZone, uHalfWidth, x);
  float tear  = max(left, right) * uStrength;
  float direction = x < 0.0 ? -1.0 : 1.0;
  float randomA = hash(aThread + uSeed * 57.0);
  float randomB = hash(aThread * 3.7 + uSeed * 91.0);
  float t = pow(tear, 1.4);
  float run = t * (60.0 + randomA * 420.0);
  run *= 0.85 + 0.15 * sin(uTime * (1.0 + randomB * 2.0) + randomA * 6.2831);
  world.x += direction * run;
  world.y += (randomA - 0.5) * 170.0 * t * t;
  world.y += sin(world.x * 0.02 + uTime * (1.6 + randomA * 2.2) + randomA * 6.2831)
             * (5.0 + 13.0 * randomA) * t * uWobble;
  ```
- **Lisensi:** MIT © Clément Grellier. Boleh di-port dengan atribusi. Catatan: halaman memuat three r128 dan GSAP 3.12.5 dari CDN (`index.html:28-29`). Jangan ikut pola CDN; kita pakai paket lokal.
- **Adaptasi:**
  - **Frame-pure:** ya.
    - Posisi scroll diganti progres sobek `p(t)` per kartu yang ditulis di timeline.
    - `uTime = t`.
    - Fling dan drag dibuang.
  - **Bisa di Canvas 2D:** strip `drawImage` per segmen (Resep 3), sekitar 520–1040 operasi per kartu per subframe [belum diverifikasi performanya]. Atau di WebGL2 offscreen kalau berat.
  - **Tempat di film:**
    - keluarnya kartu bukti/artikel/foto di kolase;
    - transisi bab ("faktanya terurai");
    - foto arsip yang "terurai" ke peta atau diagram berikutnya.
  - **Kiblat:** bersih, modern, tidak jadul. Bleach diarahkan ke warna latar gelap kita, bukan putih.
  - **Teknik baru:** belum ada di skill kita ("ribbon/thread unravel").
- **Skor cocok: 5**

## krisyangdev/yarn-world

- **File inti:**
  - `src/knit.js`: tekstur rajut prosedural.
  - `src/fuzz.js`: shell fur.
  - `src/weave.js`: front rajut, intro/unravel, spring.
  - `src/wind.js`: medan angin bersama.
  - `src/dof.js`: Bokeh dengan zona fokus.
  - `src/water.js`.
- **Look:** pulau mungil yang dirajut. Tanah rajutan berbulu wol "dirajut" keluar dari bola benang oleh front yang meluas. Hembusan angin menyapu rumput dan pohon sebagai satu pita. Objek yang mendarat memantul seperti pegas.
- **Teknik:**
  - Height field rajutan (kapsul "V" per jahitan), di-bake ke normal, AO, dan roughness.
  - Shell texturing untuk bulu.
  - Front reveal angular (96 bin) dengan scallop dan garis jahitan terang.
  - Notch Gaussian yang berputar dan memimpin front.
  - Hembusan angin sebagai pita Gaussian yang berjalan.
  - DOF dengan zona fokus mati.
  - Pegas ω 15, ζ 0.42.
- **Mekanisme:**
  - **Rajut** (`knit.js:82-156`): `paintCapsule`/`knitV` melukis tinggi jahitan. `finish()` (`:336-385`) menurunkan normal, AO, dan roughness dari tinggi. Material di `:600-625`.
  - **Bulu** (`fuzz.js:1-3, 75-115`):
    - Mesh digambar `layers` kali (default 12) sebagai `InstancedMesh`, tiap shell didorong keluar sepanjang normal.
    - Masker serat berbasis sel men-`discard` selain helai tipis (`:58-67`).
    - `length 0.025`, `density 300`.
  - **Front** (`weave.js`):
    - **Knob** (`:33-71`): `NB 96`, `SCALLOP .05`, `EDGE_LINE .08`, `INTRO_T 6.8 s`, `NOTCH .5`, `NOTCH_SIGMA .16`, `SCAN_SPEED 2.6 rad/s`, `POP_W 15`, `POP_Z .42` ("overshoots by ~23 %").
    - **Update** (`:923-934`): `thS += dt·SCAN_SPEED`. Per bin, `v = rhoF + NOTCH·exp(−(Δθ/σ)²)`, dan `if (v > edge[i]) edge[i] = v`. Ini monotonic max, jadi ber-state.
    - **Ease:** `easeUnravel(p) = 0.55p + 0.45·smooth(p)` (`:100`). Intro memakai `1 − easeUnravel(1−p)` (`:925`).
    - **Shader** `knitMargin` (`:129-142`): `mix(uKnit[i0], uKnit[i1], fr) + SCALLOP·|sin(52θ)| − a`, dengan `a` = norm superellipse pangkat 8 (front berbentuk rounded square). `discard` kalau < 0 (`:162`). Garis jahitan terang `1 − smoothstep(0, EDGE_LINE, d)` dicampur 0.5 ke krem (`:163-164`).
  - **Angin** (`wind.js:1-76`):
    - `breeze(s,t) + gustAmp·exp(−((s − gustS)/1.8)²)`, dengan `s` = jarak sepanjang `WIND_DIR (0.774, −0.633)`.
    - Pita bergerak 4.6 unit/s. Jeda hembusan 2.5–4.5 s acak (`Math.random`, `:50`).
    - Satu medan dipakai semua material lewat `WIND_GLSL`.
  - **DOF** (`dof.js:4-34`): patch `BokehShader`. Semua yang berada dalam ±`focusRange·focus` dari bidang fokus tetap tajam penuh: `factor = sign·max(|factor| − focus·focusRange, 0)`.
- **Kenapa terasa mahal:**
  - Front tidak bulat sempurna: notch berputar meninggalkan tonjolan permanen, plus gigi rajutan dan garis jahitan yang terang. Terasa dibuat tangan tapi presisi.
  - Satu medan angin untuk seluruh dunia, jadi hembusan terlihat berjalan melintasi pulau.
  - Pegas yang overshoot sekitar 23 % memberi karakter.
- **Potongan kode:**
  ```js
  // repo-krisyangdev--yarn-world/src/weave.js:923-935
  const moving = clock >= INTRO_START;
  const p = clamp01((clock - INTRO_START) / INTRO_T);
  const rhoF = lerp(RHO1, RHO0, 1 - easeUnravel(1 - p));
  if (moving && p < 1) {
    thS += dt * SCAN_SPEED;
    for (let i = 0; i < NB; i++) {
      let d = binA[i] - thS;
      d -= TAU * Math.round(d / TAU);
      d /= NOTCH_SIGMA;
      const v = rhoF + NOTCH * Math.exp(-d * d);
      if (v > edge[i]) edge[i] = v;
    }
  ```
- **Lisensi:** kode MIT. File suara CC0 dari freesound (`README.md:48-52`). Boleh di-port dengan atribusi. SFX-nya tidak kita butuhkan (aturan "no ting").
- **Adaptasi:**
  - **Front:** ber-state (monotonic max dengan dt). Buat frame-pure dengan menghitung ulang dari t0 dengan dt tetap setiap frame (deterministik, murah: 96 bin × ≤ 408 langkah). Lihat Resep 5.
  - **Angin:** jadwal hembusan ditulis di timeline (array waktu), bukan `Math.random`, sehingga `gustS(t) = from + 4.6·(t − tGust)` closed-form.
  - **Tekstur rajut dan bulu:** bake sekali di startup dengan seed tetap.
  - **Pegas:** [sudah ada] `spring()` (`engine.js:39`). Padanan ω/ζ ke parameter kita [belum diverifikasi].
  - **DOF zona fokus:** [sudah ada] DOF; "focusRange dead zone" itu baru dan bisa ditambahkan ke Bokeh three.js kita.
  - **Tempat di film:**
    - front angular untuk reveal wilayah di animasi peta, dengan garis tepi lime sebagai "jahitan hidup";
    - pita hembusan untuk menggerakkan rumput, kertas, atau partikel dalam satu arah.
  - **Risiko kiblat:** look rajut dan wol = dunia props/kriya. Itu risiko "kertas lagi" versi wol; jangan dipakai sebagai look. Yang diambil hanya mekanisme front dan angin.
- **Skor cocok: 3** (look 1; front dan angin 4)

---

## Pola lintas repo

1. **Mahal = optik yang jujur, bukan jumlah efek.**
   - Energi kekal pada debu defocus (eye).
   - Fresnel dan slab refraction (glass).
   - Warna dari tebal volume, bukan cat (amber).
   - Frustum shear yang menjaga bidang fokus (eye).

   Tiap efek punya alasan fisik dan satuan.
2. **Angka pengekang ditulis eksplisit di komentar.**
   - Re-saturasi berhenti di ×1.35 sebelum "acid" (glass).
   - `tear^1.4` supaya gambar terbaca lebih lama (unwoven).
   - Pegas ζ 0.42 dengan overshoot 23 % (yarn).
   - Inset memakai norm supaya sudut tidak terlipat (glass).

   Kita sebaiknya juga menulis alasan di samping setiap knob.
3. **Per-elemen acak dari `hash(id + seed)`.**
   - Per benang: kecepatan dan fase (unwoven).
   - Per debu: laju dan albedo (eye).
   - Per serat iris (eye).

   Inilah yang membuat sisir dan kerumunan terasa organik. Engine kita [sudah ada] `hash`/`rng(seed)` (`engine-api.md:75`).
4. **Waktu closed-form vs ber-state.**
   - Closed-form, langsung frame-pure: glass (`u_phase` loop), debu (wrap `mod`), unwoven (`uTime`), amber (rotasi linear).
   - Ber-state, perlu dt tetap dari t0 atau di-bake (`engine-api.md:78`): yarn (edge monotonic, jadwal hembusan `Math.random`), eye (akumulasi progresif lintas frame).
5. **Akumulasi = loop subframe kita.** Running mean `1/(n+1)` milik eye identik dengan cara `makeRenderer` merata-rata K subframe motion blur. Satu loop bisa sekaligus memberi motion blur dan DOF lensa: shutter-time jitter plus sampel lensa Halton per subframe.
6. **Satu dunia netral + satu material aksen.** Pola ini sama dengan aturan satu aksen kita:
   - amber: spesimen mono dingin dan grid slate, satu blok hangat;
   - dark-cluster: hampir hitam, matcap kuning hanya saat hover;
   - glass: badan kaca nyaris tak terlihat, hanya bibir yang "bicara".
7. **Urutan post yang dipakai.**
   - eye: render → accumulation → DOF → dust → (shock) → grade + grain → AA.
   - amber: Bokeh → un-premultiply → ACES.
   - dark-cluster: warna + Sobel(depth) → dither.

   Cocok dengan urutan kita (`colour-finish.md:42`: CA → bloom → vignette → tonemap → LUT → grain). Tambahannya: debu atau partikel defocus masuk **setelah** DOF tapi **sebelum** grade.
8. **Ease tajam untuk UI/transisi.** CustomEase `(.65,.01,.05,.99)` dan `(.76,0,.2,1)` milik amber adalah versi "snap → hold" yang sejalan dengan kiblat (lebih cepat, burst). Padanan terdekat di engine kita adalah `E.inOutQuart`/`E.expo16` [belum diverifikasi kemiripan kurvanya].
9. **Yang perlu dihindari dari grup ini:** look kertas/sketsa, wol/rajut (prop world), madu/sepia, dark-tech-cluster dengan dither. Ambil mekanismenya, bukan look-nya.

---

## Resep untuk engine kita

Semua resep frame-pure: fungsi murni dari `t` (dan indeks subframe). Tanpa `Math.random`/`Date`. Helper (`W`, `H`, `clamp`, `lerp`, `inv`, `E`, `hash`, `rng`) berasal dari `engine.js` dan util engine. `smooth(a,b,x)` = smoothstep. Semuanya **belum dites** di engine kita: wajib tes gerak 3 detik dan dicatat di ledger sebagai `candidate` sebelum dipakai di film.

### Resep 1 — Lensa Tipis 2.5D (rack focus kolase lewat akumulasi)

- **Sumber:** mekanisme procedural-eye (tanpa lisensi, ditulis ulang).
- **Pakai untuk:**
  - stasiun kolase dokumenter (foto di beberapa bidang z) dengan pindah fokus antar-foto;
  - FG bokeh yang benar-benar menutupi latar.

  Bokeh-nya berbentuk disk (bukan Gaussian) dan bidang fokus tajam sempurna.
- **Prinsip:** subframe ke-i memakai sampel lensa Halton ke-i. Bidang di z bergeser `A·(1 − zf/z)` px dikali titik disk. Engine merata-rata K subframe, jadi muncul blur lensa. Rumusnya setara geser lensa + shear proyeksi milik eye.

```js
// Ditulis ulang dari mekanisme rock-biter/procedural-eye (lensSampling.js, cameraOptics.js) — bukan salinan.
const halton = (i, b) => { let f = 1, r = 0; for (; i > 0; i = Math.floor(i / b)) { f /= b; r += f * (i % b); } return r; };
function disk(u, v) {                                    // Shirley–Chiu: [0,1]² → disk satuan, tanpa penggumpalan
  const a = 2 * u - 1, b = 2 * v - 1;
  if (a === 0 && b === 0) return [0, 0];
  const [r, th] = Math.abs(a) > Math.abs(b) ? [a, (Math.PI / 4) * (b / a)] : [b, Math.PI / 2 - (Math.PI / 4) * (a / b)];
  return [r * Math.cos(th), r * Math.sin(th)];
}
// planes: [{img, x, y, z, w, h}], cam: {f, x(t), y(t), focus(t), aperture(t)}; i/K = indeks subframe engine
function drawLensPlanes(ctx, t, planes, cam, i = 0, K = 1) {
  const [lx, ly] = K > 1 ? disk(halton(i + 1, 5), halton(i + 1, 7)) : [0, 0];
  const zf = cam.focus(t), A = cam.aperture(t);          // A = radius blur (px) di z → ∞
  for (const p of [...planes].sort((a, b) => b.z - a.z)) {
    const s = cam.f / p.z, coc = A * (1 - zf / p.z);    // + belakang fokus, − depan fokus, 0 di bidang fokus
    ctx.save();
    ctx.translate(W / 2 + (p.x - cam.x(t)) * s + lx * coc, H / 2 + (p.y - cam.y(t)) * s + ly * coc);
    ctx.scale(s, s); ctx.drawImage(p.img, -p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
}
// Engine: engine.js:105 memanggil scene.draw(lctx, t). Perlu diteruskan (i, K) → scene.draw(lctx, t, i, K)
// (perubahan 1 baris, kompatibel ke belakang; BELUM dibuat).
```

- **Knob:**
  - `A`: 0 saat hold teks, 6–14 px untuk kolase, 20–30 untuk FG hero.
  - `focus(t)`: rack focus memakai `E.inOutCubic` selama 0.5–0.8 s.
  - `K`: default 8. Kalau `|coc|` > ~8 px salinan mulai terlihat, jadi naikkan ke 16–24 untuk shot hero (biaya ×K), atau tambahkan `ctx.filter = blur(|coc|/√K px)` per bidang [ide kita, belum dites].
  - `still=true` (K=1) memberi gambar tajam untuk poster atau still Studio.

### Resep 2 — Debu fokus-lepas hemat energi

- **Sumber:** mekanisme procedural-eye `dust-vertex.glsl:49-74,104-113` (ditulis ulang).
- **Pakai untuk:**
  - lapisan FG/MG tipis di stasiun foto dokumenter, ruangan, dan intro;
  - membuat "udara" di antara bidang kolase.

  Murah, closed-form.

```js
// Ditulis ulang dari mekanisme rock-biter/procedural-eye (dust-vertex.glsl) — energi kekal: blur besar = redup.
function dust(ctx, t, { n = 120, seed = 7, wind = [14, -4, 0], box = [2400, 1400, 1], turb = 18,
                        zNear = 1.2, zFar = 9, f = 900, zf = 3, A = 26, light = 0.55, tint = '255,248,236' } = {}) {
  const r = rng(seed);                                   // seed tetap → urutan acak sama di setiap frame
  ctx.save(); ctx.globalCompositeOperation = 'screen';
  for (let k = 0; k < n; k++) {
    const m = [r(), r(), r()], ph = [r() * 6.283, r() * 6.283, r() * 6.283];
    const rate = 0.6 + 0.8 * r(), w = 1.2 + 2.2 * r(), alb = 0.6 + 0.4 * r();
    const q = m.map((v, a) => {
      const raw = v * box[a] + wind[a] * t * (0.7 + 0.3 * rate) + turb * Math.sin(t * rate * [0.071, 0.053, 0.062][a] + ph[a]);
      return a === 2 ? ((raw % 1) + 1) % 1 : (((raw + box[a] / 2) % box[a]) + box[a]) % box[a] - box[a] / 2;  // wrap closed-form
    });
    const z = lerp(zNear, zFar, q[2]), sw = w * f / (z * 300);
    const coc = A * Math.abs(1 - zf / z);
    const rad = Math.sqrt(coc * coc + 0.25 * sw * sw + 0.3);
    const e = light * alb * 0.75 * (sw * sw) / (rad * rad);   // ≈ area/spread milik eye untuk mote bulat
    const x = W / 2 + q[0] * f / (z * 300), y = H / 2 + q[1] * f / (z * 300);
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);  // kernel (1−s²)² didekati gradient (aproksimasi)
    g.addColorStop(0, `rgba(${tint},${Math.min(1, e)})`); g.addColorStop(0.5, `rgba(${tint},${Math.min(1, e) * 0.56})`);
    g.addColorStop(1, `rgba(${tint},0)`);
    ctx.fillStyle = g; ctx.fillRect(x - rad, y - rad, 2 * rad, 2 * rad);
  }
  ctx.restore();
}
```

- **Knob:**
  - `n`: 60–160. Lebih sedikit = lebih mahal kesannya.
  - `wind`: px/s, pelan dan searah gerak kamera.
  - `A` dan `zf`: samakan dengan Resep 1 supaya debu ikut rack focus.
  - `light`: 0.3–0.7.
  - `tint`: netral hangat, jangan lime (aksen hanya satu).
- **Catatan:**
  - Panggil sekali per frame di `scene.post` kalau tidak perlu motion blur. Biaya: n gradient per panggilan.
  - Hold teks: kurangi `light` di area teks atau pakai mask supaya kontras tetap aman.

### Resep 3 — Benang Lepas (photo card unravel)

- **Sumber:** diadaptasi dari clementgrellier/unwoven (MIT).
- **Pakai untuk:**
  - kartu bukti/artikel/foto yang keluar dari kolase;
  - transisi bab.

  Front sobek menyapu kartu dari satu tepi, dan tiap benang lepas dengan kecepatan sendiri.

```js
// Diadaptasi dari clementgrellier/unwoven (MIT, (c) Clement Grellier), index.html:205-290 — Canvas 2D, frame-pure.
// p = progres sobek 0..1 dari timeline (pengganti posisi scroll); dir +1 lepas ke kanan, −1 ke kiri.
function unravel(ctx, img, t, { x, y, w, h, p, dir = 1, threads = 26, segs = 20, zone = 0.35, seed = 3, page = '#0E0F12' }) {
  const th = h / threads, sw = w / segs, iw = img.width / segs, ih = img.height / threads;
  for (let i = 0; i < threads; i++) {
    const a = hash(i + seed * 57), b = hash(i * 3.7 + seed * 91);
    for (let s = 0; s < segs; s++) {
      const u = dir > 0 ? (s + 0.5) / segs : 1 - (s + 0.5) / segs;      // 1 = tepi yang lepas duluan
      const tear = clamp((p * (1 + zone) - (1 - u)) / zone);            // front sobek menyapu kartu
      if (tear <= 0) { ctx.drawImage(img, s * iw, i * ih, iw, ih, x + s * sw, y + i * th, sw + 0.5, th + 0.5); continue; }
      const k = Math.pow(tear, 1.4), sc = w / 600;                      // tetap terbaca lama, lalu lepas cepat
      const run = k * (60 + a * 420) * (0.85 + 0.15 * Math.sin(t * (1 + 2 * b) + a * 6.283)) * sc;
      const sx = x + s * sw + dir * run;
      const dy = ((a - 0.5) * 170 * k * k + Math.sin(sx * 0.02 + t * (1.6 + 2.2 * a) + a * 6.283) * (5 + 13 * a) * k) * sc;
      const core = lerp(1, 0.2 + 0.15 * a, smooth(0, 0.85, tear) * smooth(0.03, 0.3, tear));  // inti menipis
      const hh = th * core, sy = y + i * th + dy + (th - hh) / 2;
      ctx.globalAlpha = 1 - smooth(0.75, 1, tear) * 0.65;
      ctx.drawImage(img, s * iw, i * ih, iw, ih, sx, sy, sw + 0.5, hh);
      const bleach = smooth(0.55, 1, tear) * 0.8;                       // luntur ke warna latar (bukan putih)
      if (bleach > 0) { ctx.globalAlpha *= bleach; ctx.fillStyle = page; ctx.fillRect(sx, sy, sw + 0.5, hh); }
      ctx.globalAlpha = 1;
    }
  }
}
// Sudut kartu: clip rrect() untuk bagian yang belum sobek (engine.js:49). Glint inti (tear·0.18) dilewati.
```

- **Knob:**
  - `p(t)`: 0.7–1.1 s, dengan `E.inCubic` untuk keluar atau `E.outCubic` untuk masuk terbalik (p dari 1 ke 0).
  - `threads`: 18–34. Lebih sedikit = pita lebih tebal, lebih "grafis".
  - `zone`: 0.25–0.5.
  - `page`: warna latar frame.
  - `sc`: skala px. Angka asli ditulis untuk kartu ±340 px.
- **SFX:** satu "tear/rip" non-tonal pendek di awal lepas, bukan per benang.

### Resep 4 — Kaca squircle + rim spektral (WebGL2 offscreen → drawImage)

- **Sumber:** di-port dan dipangkas dari phileeppov/glass (MIT).
- **Pakai untuk:**
  - logo reveal (Portal QR, penutup);
  - panel UI ala Apple di atas kolase;
  - kartu kutipan.

  Latar (layer Canvas 2D) di-upload sebagai tekstur. Shader menggambar panel kaca, lalu hasilnya di-`drawImage` balik.

```glsl
// Di-port & dipangkas dari phileeppov/glass (MIT, (c) 2026 Nikita Filippov) renderer.js:113-122,157-161,202-205,356-403
#version 300 es
precision highp float;
uniform sampler2D uBg; uniform vec2 uRes, uCenter, uHalf;           // panel: pusat & setengah ukuran (px)
uniform float uN, uEdge, uRefract, uDisp, uIor, uDepth, uSweep, uSub; // uSub = indeks subframe (0..K-1)
out vec4 o;
float ign(vec2 c){ return fract(52.9829189 * fract(dot(c, vec2(0.06711056, 0.00583715)))); }
vec3 spectrum(float x){ float h = x * 0.8; return clamp(vec3(abs(h*6.-3.)-1., 2.-abs(h*6.-2.), 2.-abs(h*6.-4.)), 0., 1.); }
float shape(vec2 p, out vec2 n){ vec2 a = max(abs(p), vec2(1e-4)), an = pow(a, vec2(uN)); float s = an.x + an.y;
  vec2 g = sign(p) * pow(a, vec2(uN - 1.)) * pow(s, 1. / uN - 1.); float gl = max(length(g), 1e-4); n = g / gl;
  return (pow(s, 1. / uN) - 1.) / gl; }
void main(){
  vec2 px = gl_FragCoord.xy, nrm; float d = shape((px - uCenter) / uHalf, nrm);
  vec4 bg = texture(uBg, px / uRes);
  if (d > 0.0) { o = bg; return; }
  float rim = smoothstep(-uEdge, 0.0, d);                              // lensa hanya di bibir kaca
  vec3 n3 = normalize(vec3(nrm * rim, 1.0 - 0.9 * rim));
  vec3 acc = vec3(0), ws = vec3(0); float j = fract(ign(px) + uSub * 0.618);
  for (int i = 0; i < 8; i++) {                                         // 8 tap × K subframe ≈ 64 sampel
    float x = (float(i) + j) / 8.0; vec3 w = spectrum(x);
    vec3 r = refract(vec3(0, 0, -1), n3, 1.0 / max(uIor + uDisp * (0.5 - x) * 0.3, 1.02));
    vec2 off = -nrm * rim * uRefract * 0.42 + r.xy / max(-r.z, 0.25) * uDepth;
    acc += texture(uBg, (px + off * uHalf) / uRes).rgb * w; ws += w;
  }
  vec3 c = acc / ws; float l = dot(c, vec3(0.299, 0.587, 0.114)); c = l + (c - l) * 1.35;
  float fres = 0.04 + 0.96 * pow(max(1.0 - n3.z, 0.0), 3.0);
  float glint = exp(-pow((-d - 0.012) * uHalf.x / 2.0, 2.0)) * smoothstep(0.6, 1.0, dot(nrm, vec2(cos(uSweep), sin(uSweep))));
  o = vec4(c + fres * 0.3 + glint * 0.7, 1.0);
}
```

- **Knob:**
  - `uN`: 5 untuk squircle, 2 untuk lingkaran.
  - `uEdge`: 0.17–0.28.
  - `uRefract`: 0.03–0.08, dalam satuan panel [belum diverifikasi].
  - `uDisp`: 0.3–1, rendah saat hold.
  - `uIor`: 1.4–1.55.
  - `uSweep = 2π·((t/4) mod 1)`, atau di-author per beat.
- **Catatan:**
  - Upload layer dengan `UNPACK_FLIP_Y_WEBGL = true`.
  - Badan kaca = latar itu sendiri. Bayangan panel digambar terpisah di Canvas 2D.
  - Satu panel kaca per frame (motif lock).

### Resep 5 — Front rajut angular untuk reveal peta (closed-form)

- **Sumber:** diadaptasi dari krisyangdev/yarn-world (MIT).
- **Pakai untuk:**
  - reveal wilayah di animasi peta (provinsi/negara "tumbuh" dari satu titik);
  - garis tepi lime sebagai "jahitan hidup".

  Front tidak bulat sempurna, dan tonjolan notch yang berputar tertinggal permanen.

```js
// Diadaptasi dari krisyangdev/yarn-world (MIT) weave.js:33-71,100,129-165,923-934 — front dihitung ulang dari t0 (tanpa state).
const NB = 96, TAU = Math.PI * 2;
const easeUnravel = p => p * 0.55 + E.inOutSine(p) * 0.45;              // smooth() asli ≈ smoothstep [belum diverifikasi]
function frontRadii(t, { t0 = 0, dur = 2.4, notch = 0.18, sigma = 0.16, scan = 2.6, fps = 60 } = {}) {
  const edge = new Float32Array(NB);                                     // radius 0..1 (×R saat gambar)
  const steps = Math.max(0, Math.floor((Math.min(t, t0 + dur) - t0) * fps));
  for (let k = 0; k <= steps && t >= t0; k++) {                          // ulangi dengan dt tetap → sama di frame mana pun
    const tk = t0 + k / fps, p = clamp((tk - t0) / dur), rho = 1 - easeUnravel(1 - p), th = scan * (tk - t0);
    for (let i = 0; i < NB; i++) {
      let d = (i / NB) * TAU - th; d -= TAU * Math.round(d / TAU); d /= sigma;
      const v = rho * (1 + notch * (1 - p) * Math.exp(-d * d));          // notch mengecil di akhir (adaptasi kita)
      if (v > edge[i]) edge[i] = v;                                      // monotonic: tonjolan tertinggal
    }
  }
  return edge;
}
function frontPath(ctx, cx, cy, R, edge, scallop = 0.012) {
  ctx.beginPath();
  for (let j = 0; j <= 4 * NB; j++) {
    const th = (j / (4 * NB)) * TAU, fi = (j / 4) % NB, i0 = Math.floor(fi), i1 = (i0 + 1) % NB;
    const r = (lerp(edge[i0], edge[i1], fi - i0) + scallop * Math.abs(Math.sin(52 * th))) * R;
    ctx.lineTo(cx + r * Math.cos(th), cy + r * Math.sin(th));
  }
  ctx.closePath();
}
// Pakai: save → frontPath → clip → gambar peta/foto wilayah → restore → frontPath lagi → stroke lime 2–3 px.
```

- **Knob:**
  - `dur`: 1.6–3 s. Asli 6.8 s, terlalu lambat untuk kita.
  - `notch`: 0.1–0.25.
  - `scan`: rad/s, menentukan berapa kali notch mengitari.
  - `scallop`: 0.008–0.02. Asli 0.05 dalam satuan dunia, terlalu "rajutan".
  - `R`: radius yang menutup wilayah.
  - Pusat `(cx,cy)`: ibu kota atau titik cerita.
- **Catatan:**
  - Source memakai norm superellipse pangkat 8 (front kotak membulat). Di sini lingkaran.
  - Biaya: 96 × ≤ 180 langkah per panggilan, ringan.
  - Garis tepi lime itu aksen; tetap ≤ 1 aksen per frame.
