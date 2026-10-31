---
tool: fluid simulation (teknik, Navier–Stokes WebGL) — referensi utama PavelDoGreat/WebGL-Fluid-Simulation
version: WebGL-Fluid-Simulation tanpa versi/npm (demo 1 file; HEAD @a2d2929 2024-11-12, MIT). Kanonik: GPU Gems 1 ch.38 (Harris 2004), Stam "Real-Time Fluid Dynamics for Games" (GDC 2003). Alternatif murah: ripple wave-equation (Hugo Elias; Evan Wallace webgl-water @73eda8b 2016). Dicek 2026-10-28
official: https://github.com/PavelDoGreat/WebGL-Fluid-Simulation · https://developer.nvidia.com/gpugems/gpugems/part-vi-beyond-triangles/chapter-38-fast-fluid-dynamics-simulation-gpu
local: 04-physics/fluid-simulation/repo-WebGL-Fluid-Simulation/script.js, fluid-simulation/web/*.md, fluid-simulation/repo-webgl-water/water.js
fetched: 2026-10-28
---
# Fluid simulation — jejak asap/tinta warna-warni mengikuti kursor, riak air, distorsi "cair" (GPU ping-pong)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
| Butuh | Pilih | Biaya |
|---|---|---|
| Asap/tinta berputar realistis, kursor = sumber gaya | **Pavel stable fluids** (advect + pressure Jacobi + vorticity) | ±30 pass/frame + bloom; mobile berat |
| Riak air yang memantul di tepi, klik = tetes | **Wave equation height field** (Elias/Wallace) | 1–2 pass/step, sangat murah |
| Distorsi gambar/teks ikut kursor (liquid hover) | **FBO trail** (splat + decay, opsional advect) | 2 pass @256², termurah |
| Cairan CPU kecil (UI 64×64, mis. tombol) | Stam 2003 / Ten Minute Physics 17-fluidSim | CPU, grid kecil saja |
| Percikan/partikel air | FLIP (Ten Minute Physics 18-flip) | partikel + grid |
- **Jangan**: di atas teks panjang (kontras/keterbacaan), di device low-end tanpa fallback, sebagai efek yang selalu
  aktif di halaman dengan video/scroll berat (bersaing GPU).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Stable fluids** (Stam 1999 → GPU Gems ch.38): velocity field di-advect **semi-Lagrangian** (ambil nilai dari
  `uv − dt·u(uv)` = backtrace) → stabil untuk dt sembarang; lalu **projection** (Helmholtz–Hodge): hitung divergence,
  selesaikan Poisson-pressure dengan Jacobi, kurangi gradient tekanan → velocity bebas divergensi (incompressible =
  pusaran, bukan "menyebar").
- **Pipeline Pavel per frame** (`step(dt)` di script.js): `curl` → `vorticity` (vorticity confinement, kuat = `CURL`;
  velocity di-clamp ±1000) → `divergence` → `clear` (pressure × `PRESSURE`) → `pressure` Jacobi × `PRESSURE_ITERATIONS`
  → `gradientSubtract` → `advection` velocity (`VELOCITY_DISSIPATION`) → `advection` dye (`DENSITY_DISSIPATION`).
  Render: dye (+ `SHADING` dari gradien dye) + `BLOOM` + `SUNRAYS`.
- **Dissipation** di advection shader: `result / (1 + dissipation·dt)` (≈ `exp(−d·dt)`) → half-life ≈ `ln2/d` detik:
  `DENSITY_DISSIPATION 1` ≈ 0.7 s, `VELOCITY_DISSIPATION 0.2` ≈ 3.5 s.
- **`PRESSURE` bukan "kekuatan tekanan"**: faktor *warm start* — tekanan frame lalu dikali 0.8 sebagai tebakan awal
  Jacobi (`clearProgram value = config.PRESSURE`). Itu sebabnya Pavel cukup 20 iterasi, padahal GPU Gems menyarankan
  40–80 dan "not a good idea to go below 20" (dengan tebakan awal nol).
- **Splat** = Gaussian `exp(−dot(p,p)/radius)·color` ditambahkan ke velocity (warna = (dx,dy)·`SPLAT_FORCE`) dan ke dye;
  radius shader = `SPLAT_RADIUS/100`, dikoreksi aspect. Delta pointer dalam satuan **uv per event** → *frame-rate &
  pointer-rate dependent* (mouse 1000 Hz / layar 120 Hz = splat beda kekuatan). Fix: velocity pointer (uv/s) × dt.
- `dt = min(Δt_nyata, 1/60)` (`calcDeltaTime`) → di 120 Hz dt kecil, simulasi tetap kontinu; di < 60 fps simulasi melambat.
- **Format tekstur**: half-float RGBA16F/RG16F/R16F (WebGL2) atau `OES_texture_half_float` (WebGL1). Tanpa linear
  filtering (`OES_texture_(half_)float_linear`): `DYE_RESOLUTION 512`, SHADING/BLOOM/SUNRAYS dimatikan, bilerp manual.
- **Ripple** (Elias/Wallace): `h_new = 0.5·Σ4tetangga − h_old` ⇔ `v += (avg − h)·2.0; v *= 0.995; h += v`. Koefisien 2.0
  tepat di batas stabil CFL 2D (c·Δt/Δx = 1/√2): **teruji** 2.0 stabil, 2.2 → NaN (`snippets/test-ripple-cfl.mjs`).
  Müller (20-heightFieldWater.html) meng-clamp `waveSpeed ≤ 0.5·spacing/dt` + damping posisi/velocity per detik.
  Riak dijalankan **per step** (Wallace: 2 step/frame) → di 120 Hz riak 2× lebih cepat kecuali pakai fixed step.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
Pavel = **demo, bukan library** (tanpa export/npm resmi; config global, dat.gui, promo popup, listener di canvas).
Cara pakai: salin `script.js` → hapus promo/GUI → panggil `initFramebuffers()` & `update()`; atau port pipeline-nya.
Kerangka (nama fungsi asli di script.js):
```js
// 1) context: getWebGLContext(canvas) → { gl, ext } (WebGL2, fallback WebGL1 + extensions)
// 2) FBO: createDoubleFBO(w, h, internalFormat, format, type, filter) → { read, write, swap() }
//    velocity (RG, SIM_RESOLUTION), dye (RGBA, DYE_RESOLUTION), pressure/divergence/curl (R)
// 3) loop: dt = calcDeltaTime(); resizeCanvas() && initFramebuffers(); applyInputs(); step(dt); render(null)
// 4) input: splat(x, y, dx, dy, color) — x,y dalam uv (0..1, y ke atas)
// cleanup: cancelAnimationFrame + gl.deleteTexture/Framebuffer/Program; atau
//          gl.getExtension('WEBGL_lose_context')?.loseContext() saat unmount
```

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob | Default | Efek ke feel | Rentang bagus |
|---|---|---|---|
| `SIM_RESOLUTION` | 128 | detail pusaran (grid velocity) | 32–64 = gumpalan lembut & murah; 256 = detail halus |
| `DYE_RESOLUTION` | 1024 (mobile 512) | ketajaman warna | 512 cukup bila bloom aktif |
| `DENSITY_DISSIPATION` | 1 | panjang jejak warna (half-life ≈ 0.69/d s) | 0.3 jejak panjang – 3 jejak pendek "kuas" |
| `VELOCITY_DISSIPATION` | 0.2 | berapa lama fluida terus bergerak | 0 (abadi) – 1 (cepat diam) |
| `PRESSURE` | 0.8 | warm start Jacobi (lihat Mental model) | 0.6–0.9 |
| `PRESSURE_ITERATIONS` | 20 | inkompresibilitas (pusaran rapat) | 10 mobile – 40 |
| `CURL` | 30 | vorticity confinement: keriting/turbulen | 0 laminar (tinta) – 50 asap ribut |
| `SPLAT_RADIUS` | 0.25 | ukuran kuas | 0.1 garis tipis – 0.5 semburan |
| `SPLAT_FORCE` | 6000 | dorongan kursor | 2000 lembut – 8000 |
| `SHADING` | true | relief 3D dari gradien dye | matikan untuk tampilan flat/brand |
| `COLORFUL` / `COLOR_UPDATE_SPEED` | true / 10 | warna acak berganti | false + warna brand tetap |
| `BLOOM` (+`ITERATIONS 8`, `RESOLUTION 256`, `INTENSITY 0.8`, `THRESHOLD 0.6`, `SOFT_KNEE 0.7`) | true | glow | intensity 0.2–0.5 lebih elegan |
| `SUNRAYS` (+`RESOLUTION 196`, `WEIGHT 1.0`) | true | god rays | mahal; off di mobile |
| `BACK_COLOR` / `TRANSPARENT` | hitam / false | komposit di atas halaman | `TRANSPARENT: true` untuk overlay |
| Ripple: koef `2.0`, damping `0.995`/step | — | kecepatan & umur riak | koef ≤ 2.0 (CFL!); damping 0.98–0.998 |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Overlay halaman**: canvas `position:fixed; inset:0; pointer-events:none; mix-blend-mode: screen|difference`;
  dengarkan `pointermove` di `window` (bukan canvas) lalu panggil `splat` sendiri. `TRANSPARENT: true` agar halaman
  terlihat di bawahnya.
- **three.js/R3F**: port shader ke `WebGLRenderTarget` ping-pong (dua RT + swap), lalu dye texture → `uniform` material
  (distorsi/warna objek). Satu GL context — jangan dua canvas WebGL bila bisa.
- **Scroll (Lenis)**: velocity scroll → splat vertikal kecil di tepi layar (fluida "terseret" scroll).
- **Audio**: amplitudo/onset → `multipleSplats(n)` atau CURL sementara naik (sinkron beat).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Brand ink trail (tenang, mahal)**
```js
Object.assign(config, { SIM_RESOLUTION: 64, DYE_RESOLUTION: 512, DENSITY_DISSIPATION: 2.5, VELOCITY_DISSIPATION: 0.6,
  CURL: 4, SPLAT_RADIUS: 0.12, SPLAT_FORCE: 3000, COLORFUL: false, SHADING: false, BLOOM: false, SUNRAYS: false,
  TRANSPARENT: true });
// splat dengan velocity ter-normalisasi dt (fix frame-rate dependency):
// splat(u, v, vxUVperSec * dt * K, vyUVperSec * dt * K, brandRGB)   (K ≈ 6000 * 60 agar setara default @60 Hz)
```
Kenapa terasa mahal: curl rendah + dissipation tinggi = goresan tinta yang cepat larut, bukan "screensaver RGB".

**2. Ripple air murah (GLSL ES 1.0, state RG = height, velocity; pola dari water.js)**
```glsl
precision highp float; uniform sampler2D uState; uniform vec2 uTexel; varying vec2 vUv;
void main() {
  vec4 s = texture2D(uState, vUv);
  float avg = 0.25 * (texture2D(uState, vUv - vec2(uTexel.x, 0.)).r + texture2D(uState, vUv + vec2(uTexel.x, 0.)).r
                    + texture2D(uState, vUv - vec2(0., uTexel.y)).r + texture2D(uState, vUv + vec2(0., uTexel.y)).r);
  s.g += (avg - s.r) * 2.0;   // JANGAN > 2.0 (batas stabil CFL, teruji)
  s.g *= 0.995;               // damping per step
  s.r += s.g;
  gl_FragColor = s;
}
// drop (water.js): float d = max(0., 1. - length(center - vUv) / radius); d = 0.5 - cos(d * PI) * 0.5; s.r += d * strength;
// render (Elias): offset = vec2(h(x-1)-h(x+1), h(y-1)-h(y+1)); color = texture2D(uImage, vUv + offset * k) + shading
```
Jalankan dalam fixed-step (mis. 120 step/s) agar kecepatan riak sama di 60/120 Hz. Kenapa terasa mahal: riak memantul
dari tepi & berinterferensi — mustahil dipalsukan dengan keyframe.

**3. Liquid hover distortion (FBO trail, tanpa solver)**
```glsl
// pass 1 (trail RT 256², RG16F): decay + splat velocity kursor
uniform sampler2D uTrail; uniform vec2 uPoint, uForce; uniform float uDecay, uRadius, uAspect; varying vec2 vUv;
void main() {
  vec2 v = texture2D(uTrail, vUv).xy * uDecay;          // uDecay = exp(-dt / tau), tau ≈ 0.25–0.6 s (CPU)
  vec2 p = vUv - uPoint; p.x *= uAspect;
  v += exp(-dot(p, p) / uRadius) * uForce;               // uForce = velocity kursor (uv/s) * dt * k
  gl_FragColor = vec4(v, 0., 1.);
}
// pass 2 (layar): vec2 o = texture2D(uTrail, vUv).xy * uStrength;
// gl_FragColor = vec4(texture2D(uScene, vUv - o * 1.0).r, texture2D(uScene, vUv - o * 0.9).g, texture2D(uScene, vUv - o * 0.8).b, 1.);
```
Kenapa terasa mahal: distorsi mengikuti **arah & kecepatan** gerakan lalu meluruh eksponensial; RGB split kecil memberi
kesan lensa cair. Tambah 1 pass advection (shader `advectionShader` Pavel) bila ingin jejak "terbawa arus".
(Pola rakitan dari `splatShader` + `advectionShader` script.js — belum dites di GPU.)

**4. Fluida reaktif audio**: tiap onset beat → `multipleSplats(1 + energy*4)` dan `config.CURL` di-tween 30 → 60 → 30.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Biaya dominan: `PRESSURE_ITERATIONS` × resolusi sim + bloom (8 iterasi) + sunrays. Mobile: SIM 64, DYE 512,
  PRESSURE_ITERATIONS 10–20, BLOOM/SUNRAYS off. Pause saat tab hidden / canvas di luar viewport (IntersectionObserver).
- `prefers-reduced-motion: reduce` → jangan auto-splat; hentikan step (dye statis) atau ganti gradient statis.
- Kontras: fluida di belakang teks → batasi luminance (BLOOM off, DENSITY_DISSIPATION tinggi) atau mask area teks.
- WebGL2 diutamakan; WebGL1 butuh `OES_texture_half_float` (+ linear) — fallback otomatis di `getWebGLContext`.
- Epilepsi/flash: hindari COLORFUL cepat + bloom kuat (lihat MDN `_shared/mdn-content/files/en-us/web/accessibility/guides/seizure_disorders/index.md`).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-WebGL-Fluid-Simulation/script.js` — config (l.≈60), shaders (splat/advection/divergence/curl/vorticity/pressure/gradientSubtract l.≈726–905), `step` (l.≈1230), input & `splat` (l.≈1420–1560).
- `web/gpugems1_ch38_fast_fluid_dynamics_simulation_on_the_gpu.md` — teori lengkap, iterasi Jacobi 40–80, boundary, vorticity confinement.
- `web/stam_2003_real_time_fluid_dynamics_for_games__GDC03.md` — solver CPU lengkap (C): add_source/diffuse (Gauss-Seidel 20 iter)/advect/project.
- `web/hugo_elias__2d_water__x_water.md` — algoritma ripple 2 buffer + render refraksi.
- `repo-webgl-water/water.js` — ripple GPU (drop/update/normal shader), `main.js` (2 step per frame).
- `../_physics-math/repo-tenMinutePhysics/tenMinutePhysics/{17-fluidSim,18-flip,20-heightFieldWater}.html` — Euler grid CPU (overRelaxation 1.9), FLIP, height-field water.
- `snippets/test-ripple-cfl.mjs` — uji stabilitas koefisien ripple (2.0 stabil, 2.2 NaN).
