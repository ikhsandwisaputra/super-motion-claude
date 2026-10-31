---
tool: LYGIA Shader Library
version: 1.4.1 (npm `lygia`, dicek 2026-10-28); repo commit aa7580b (2026-10-24, "marble")
official: https://lygia.xyz (repo https://github.com/patriciogonzalezvivo/lygia)
local: lygia/repo-lygia/ (mirror ramping: hanya .glsl + .wgsl untuk generative, sdf, math, distort, filter, color, animation, space, draw, simulate + root *.md; HLSL/MSL/CUDA/WESL/lighting/sample TIDAK di-mirror)
fetched: 2026-10-28
---
# LYGIA — perpustakaan fungsi shader granular (1 fungsi = 1 file) untuk noise, SDF, distorsi, blur, warna, easing & simulasi ping-pong; "lodash"-nya GLSL/WGSL

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** saat butuh fungsi shader teruji tanpa menulis ulang: simplex/flow noise, fBM, Voronoi/Worley, curl, chromatic aberration, radial/gaussian blur, kuwahara, palet, Oklab mix, easing di GPU, ripple/reaction-diffusion/fluid sederhana. Cocok ditempel ke curtains/OGL/Pixi Filter/three ShaderMaterial (GLSL) dan WebGPU (via WESL).
- **Jangan** kalau proyek komersial tanpa lisensi (lihat ⚠️ di bawah) — pakai file berlisensi MIT di LYGIA, atau snippet IQ (MIT, `../inigo-quilez/NOTES.md`), atau tulis sendiri dari Book of Shaders (`../book-of-shaders/NOTES.md`).
- **Jangan** pakai resolver online `lygia.xyz` di produksi (runtime fetch ke server pihak ketiga = latency + titik gagal); resolve saat build.
- vs Book of Shaders: BoS mengajarkan *kenapa*; LYGIA memberi *implementasi*. vs IQ: IQ = rumus kanonik dengan analisis (smin, SDF eksak); banyak fungsi LYGIA memang turunan IQ/Gustavson.

### ⚠️ Lisensi (penting untuk kerja klien)
- `LICENSE.md` = **Prosperity Public License 3.0.0**: gratis untuk non-komersial; komersial hanya **trial 30 hari per perusahaan** ("your company gets one trial period for all personnel"). Komersial permanen = **Patron License** (otomatis untuk sponsor GitHub & kontributor) atau lisensi permanen terikat satu versi (README "License").
- File dengan header **MIT** sendiri (aman dipakai komersial dengan atribusi): `generative/snoise`, `cnoise`, `pnoise`, `psrdnoise` (Gustavson & McEwan), `generative/random`, `generative/wavelet` (Steinrucken), `distort/grain`, `color/mixOklab`. File tanpa header lisensi (mis. `generative/curl`, `noised`, `voronoise`, `simulate/ripple`, `grayscott`, `simpleAndFastFluid`, `color/palette`, `space/kaleidoscope`, `math/aastep`, easing) → ikut lisensi repo (Prosperity/Patron). `fbm`, `voronoi`, `worley`, `chromaAB`, `displace`, `marble`, `gaussianBlur`, `radialBlur`, `noiseBlur`, `ratio`, `rotate`, `circleSDF`, `fill` = Prosperity/Patron eksplisit.
- Ingat: include menarik dependensi (mis. `fbm` Prosperity → `snoise` MIT). Cek header tiap file yang benar-benar ter-bundle.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Granular**: `myFunc.glsl` berisi `myFunc()`; folder punya file indeks (`color/blend.glsl` meng-include `color/blend/*.glsl`, `animation/easing.glsl` meng-include semua easing) — include indeks = kode membengkak; include file spesifik (DESIGN.md).
- **Guard anti-tabrakan**: setiap file dibungkus `#ifndef FNC_<NAMA> / #define FNC_<NAMA>` → aman di-include berkali-kali.
- **Templating via `#define` SEBELUM `#include`**: opsi bernama `<NAMAFUNGSI>_*` (mis. `FBM_OCTAVES`, `GAUSSIANBLUR_2D`, `RADIALBLUR_KERNELSIZE`, `WORLEY_JITTER`), sampler global `SAMPLER_FNC(TEX,UV)` & `SAMPLER_TYPE` (default `texture` bila `__VERSION__ >= 300`, else `texture2D`; `sampler2D` — `sampler.glsl`). Per-fungsi ada `<NAMA>_SAMPLER_FNC` untuk mengganti cara sampling (clamp, decode, dll.).
- **Header YAML** di tiap file: `contributors`, `description`, `use:` (signature), `options:` (define), `license:` — baca header dulu, jangan tebak.
- **Overload GLSL** untuk vec2/vec3/vec4; **WGSL tidak punya overload** → nama ber-suffix: `random2(vec2f)->f32`, `random22(vec2f)->vec2f`, `snoise2/snoise3/snoise22`, `psrdnoise2/2a/2b/...`, `curl2/curl3`, `worley2/worley22`, `voronoi2/voronoi2a/voronoi3` (DESIGN.md + file .wgsl).
- **Port WGSL belum rata**: `generative/fbm.wgsl` masih bersintaks GLSL (`FBM_NOISE_TYPE fbm(in vec2 st)`), `generative/psrdnoise.wgsl` menulis ke parameter `gradient` (tidak valid di WGSL) → untuk WebGPU pakai jalur **WESL/npm** (README_WebGPU: "Most (but not all) Lygia GLSL shaders are now available for WebGPU using WESL") atau port manual + uji compile.
- **Simulasi = state di texture**: `simulate/*` dan `distort/marble|displace` membaca texture frame sebelumnya → wajib **ping-pong FBO** di host (2 render target bergantian). Tanpa itu, fungsi ini tidak "bergerak".
- **Biaya tersembunyi**: `radialBlur` default **64 sampel**/pixel (`RADIALBLUR_KERNELSIZE 64`), `stretch` 20, `gaussianBlur` default `gaussianBlur13`, `grayscott` 9 iterasi (`GRAYSCOTT_ITERATIONS 9`), `fbm` 4 oktaf × simplex. Turunkan sebelum ke mobile.
- `PLATFORM_WEBGL` = define konvensi untuk batasan WebGL1 (loop berbatas konstanta, mis. `distort/stretch.glsl` memakai `for(i<50){ if(i==i_samples) break; }`); dipakai 25 file yang di-mirror.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
**A. GLSL lokal (disarankan untuk produksi)** — README "LYGIA Locally":
```bash
npx degit https://github.com/patriciogonzalezvivo/lygia.git lygia   # tanpa histori git (README: proyek 9MB+)
python prune.py --all --keep glsl                                     # opsional: buang bahasa lain
```
Resolve `#include` saat build: vite-plugin-glsl (UstymUkhman), esbuild-plugin-glsl-include, webpack-glsl-loader (README_GLSL.md). Lalu di shader:
```glsl
#include "lygia/space/ratio.glsl"
#include "lygia/math/decimate.glsl"
#include "lygia/draw/circle.glsl"
void main(void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = ratio(st, u_resolution);
    vec3 color = vec3(st.x, st.y, abs(sin(u_time)));
    color = decimate(color, 20.);
    color += circle(st, .5, .1);
    gl_FragColor = vec4(color, 1.0);
}
```
**B. Resolver online (prototipe/CodePen saja)**:
```html
<script src="https://lygia.xyz/resolve.js"></script>
<!-- atau --> <script type="module">import resolveLygia from "https://lygia.xyz/resolve.esm.js"</script>
```
```js
fragSource = resolveLygia(fragSource);            // sync, satu include per panggilan
// fragSource = await resolveLygiaAsync(fragSource); // paralel; README menulis tanpa await — tipe return [UNVERIFIED], perlakukan sebagai Promise
```
Pin versi lewat path: `#include "lygia/v1.2.1/math/decimation.glsl"` (format `lygia/vX.X/...` / `lygia/vX.X.X/...`). Versi npm online: paket `resolve-lygia` (README_GLSL).

**C. WebGPU (WESL)** — README_WebGPU.md:
```bash
npm install lygia wesl wesl-plugin
```
```ts
import appWesl from "../shaders/app.wesl?link";   // runtime link (bisa @if kondisional)
import { link } from "wesl";
const linked = await link(appWesl);
linked.createShaderModule(gpuDevice);
// atau statis: import appWgsl from "../shaders/app.wesl?static";  (hemat ~15KB linker)
```
Di shader WESL: `import lygia::math::consts::PI;` (tree-shaken). CLI: `npx wesl-link ./shaders/main.wesl`.
- Cleanup: tidak ada runtime (kode di-inline ke shader). Resource (FBO ping-pong, texture) dihancurkan oleh host.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Define / argumen (file) | Efek | Default | Rentang/catatan |
|---|---|---|---|
| `FBM_OCTAVES` (`generative/fbm.glsl`) | detail/kekasaran awan | 4 | 3 (mobile) – 6 |
| `FBM_NOISE_FNC(UV)` | jenis noise per oktaf | `snoise(UV)` | ganti `gnoise`/`cnoise`/`worley` untuk karakter beda |
| `FBM_SCALE_SCALAR` / `FBM_AMPLITUDE_SCALAR` / `FBM_AMPLITUDE_INITIAL` | lacunarity / gain / amplitudo awal | 2.0 / 0.5 / 0.5 | 1.9–2.1 (detune) / 0.45–0.6 |
| catatan fbm | **tidak ada rotasi antar-oktaf** | — | untuk awan "mahal" tulis fbm sendiri dengan `mat2(0.8,-0.6,0.6,0.8)` (IQ) |
| `psrdnoise(x, period, alpha, out gradient)` | flow noise; `alpha` = rotasi gradien (radian), `period>0` = tiling | period 0 = tanpa wrap | `alpha = TAU*t/T` → loop sempurna periode T (gradien = `cos/sin(hash*0.07482 + alpha)`) |
| `voronoi(vec2 uv, float time)` → vec3 | `.xy` = posisi titik sel, `.z` = jarak; titik bergerak `0.5+0.5*sin(time+TAU*rand)` | — | `voronoi(vec3 p)` memakai `p.z` sebagai time |
| `WORLEY_JITTER` | 1 = acak, 0 = grid simetris | 1.0 | animasikan 0→1 untuk "kristal meleleh" |
| `WORLEY_DIST_FNC` | metrik sel | `distEuclidean` | `distManhattan`, `distChebychev`, `distMinkowski` (`math/dist.glsl`) |
| `WAVELET_VORTICITY` (`generative/wavelet.glsl`) | putaran/spin pada wavelet noise | off (0) | >1 boleh |
| `curl(p)` (`generative/curl.glsl`) | medan vektor bebas-divergensi untuk aliran partikel | ternormalisasi | `CURL_UNNORMALIZED` untuk magnitudo asli |
| `chromaAB(tex, st, vec2 dir, vec3 distortion)` | RGB split: `c.r = tex(st + dir*distortion.r)` dst. | — | dir = velocity scroll/mouse; distortion ±0.005–0.03 |
| `chromaAB(tex, st [, sdf|offset, pct])` | versi cepat; `CHROMAAB_PCT` 1.5, tanpa arg memakai `lengthSq(st-.5)` | 1.5 | ⚠️ men-scale `st` terhadap (0,0), bukan pusat → pakai overload `dir` untuk CA radial yang benar |
| `radialBlur(tex, st, dir [, strength])` | zoom/motion blur sepanjang `dir` | `KERNELSIZE 64`, `STRENGTH .125` | dir=`0.5-st` (zoom), dir=`vec2(0,uVel)` (motion); kernel 16–24 di mobile |
| `gaussianBlur(tex, st, pixel_dir [, kernelSize])` | blur 1D (2 pass) default; `GAUSSIANBLUR_2D` = 1 pass 2D | `gaussianBlur13` | 2-pass 1D jauh lebih murah dari 2D |
| `noiseBlur(tex, st, pixel, radius)` | blur berbintik/filmic | `NOISEBLUR_SAMPLES 4.0` | radius 1–8 px |
| `kuwahara(tex, st, pixel, radius)` | look "lukisan cat minyak" | — | radius 2–6 (mahal) |
| `grain(tex, st, resolution [, t, multiplier])` | film grain bergerak (simplex+periodic noise) | multiplier 2.5 | `t = u_time` agar hidup |
| `mixOklab(a, b, pct)` (`color/mixOklab.glsl`) | gradien warna perseptual (tanpa "lumpur abu-abu") | `MIXOKLAB_SRGB` jika input sRGB | — |
| `palette(t,a,b,c,d)` (`color/palette.glsl`) | `a + b*cos(TAU*(c*t+d))` (IQ) | — | c bilangan bulat → siklus mulus |
| `kaleidoscope(coord, segmentCount, phase)` | simetri radial; `phase` = rotasi animasi | 8 segmen | 3–12; `CENTER_2D` untuk pusat lain |
| `rotate(v, r [, c])`, `scale(st, s [, center])` | transform di sekitar pusat (`CENTER_2D` default 0.5) | — | — |
| `sqTile(st, scale)` → `vec4(fract, floor)` | tiling + ID sel sekaligus | — | `hexTile`, `brickTile`, `mirrorTile` setara |
| easing `cubicInOut`, `elasticOut`, `backOut`, ... (`animation/easing/*`) | easing Penner di GPU | — | `elasticOut = sin(-13*(t+1)*HALF_PI)*pow(2,-10t)+1` |
| `aastep(threshold, value)` (`math/aastep.glsl`) | step anti-alias pakai derivatif: lebar `0.7*length(vec2(dFdx(v),dFdy(v)))` | — | fallback `AA_EDGE` / `step` tanpa derivatif |
| `ripple(tex, st, pixel)` | gelombang air; redaman `d *= 0.99`, state disimpan sekitar 0.5 | — | redaman tetap di kode → edit file untuk 0.97–0.995 |
| `grayscott(tex, st, pixel, src [, diffU, diffV, f, k])` | reaction-diffusion | 0.25, 0.05, 0.1, 0.063; 9 iterasi | f/k kecil berubah = pola beda total |
| `simpleAndFastFluid(tex, st, pixel, force)` | fluida murah | DT .15, DX 1.0, VISCOSITY .16 | force = delta mouse |
| `MARBLE_PERIOD` / `MARBLE_FADE` / `MARBLE_FLOW_SPEED` (`distort/marble.glsl`) | marbling via inverse map | 60 frame / 0.985 / 1.0 | lihat resep 5 |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Urutan wajib**: semua `#define` opsi → `#include` → kode. Define setelah include tidak berefek (guard `#ifndef`).
- **curtains.js / OGL / three ShaderMaterial**: resolve include di build (vite-plugin-glsl) lalu string hasilnya dipakai sebagai fragment. Ganti `gl_FragCoord.xy/u_resolution` dengan UV varying host (`vTextureCoord` curtains, `vUv` OGL — lihat `../book-of-shaders/NOTES.md` §Integrasi). Fungsi sampler LYGIA memakai `SAMPLER_FNC` → di GLSL ES 3.00 otomatis `texture()`.
- **Pixi v8 Filter**: fragment GLSL ES 3.00 (`in vec2 vTextureCoord; out vec4 finalColor; uniform sampler2D uTexture;`), jadi `SAMPLER_FNC` → `texture` otomatis; texture input diberi nama `uTexture` — kirim itu ke fungsi distort/filter LYGIA. Wiring Filter/GlProgram di `../pixijs/NOTES.md`.
- **WebGPU / three WebGPURenderer**: pakai WESL (`npm install lygia wesl wesl-plugin`) atau port manual; jangan asumsikan file `.wgsl` repo valid (lihat Mental model). Jalur TSL → `../webgpu/NOTES.md`.
- **Scroll/GSAP → uniform**: kirim `uVelocity` (sudah di-lerp di JS) ke `chromaAB(... dir = vec2(0., uVelocity) ...)` atau `radialBlur(..., vec2(0., uVelocity*0.02))`; kirim `uProgress` (GSAP) lalu bentuk di shader dengan `cubicInOut(uProgress)` — ease di salah satu sisi saja.
- **Ping-pong (simulate/*, marble)**: host menyediakan 2 render target A/B; frame n: baca A → tulis B → tampilkan/pakai B; swap. Contoh pola host: curtains `PingPongPlane` (`../curtainsjs/NOTES.md`), OGL `Flowmap`/RenderTarget (`../ogl/NOTES.md`).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Flow noise yang loop sempurna (untuk hero background / video loop)**
```glsl
#include "lygia/math/const.glsl"
#include "lygia/generative/psrdnoise.glsl"   // MIT
uniform float u_time;
// di main, st = UV
const float T = 12.0;                         // detik per loop
float a = TAU * fract(u_time / T);
vec2 g;  float n  = psrdnoise(st*3.0,              vec2(0.0), a,      g);
vec2 g2; float n2 = psrdnoise(st*6.0 + 0.15*g,     vec2(0.0), 2.0*a,  g2); // oktaf 2 di-"advect" gradien oktaf 1 (pola flow ala Gustavson; koefisien bebas)
float f = 0.5 + 0.35*n + 0.15*n2;
```
Kenapa mahal: yang berputar adalah *gradien* (bukan menggeser texture) → pola berputar di tempat seperti cairan; `2.0*a` tetap kelipatan bulat → seluruh komposisi kembali identik tiap T detik.

**2. RGB split digerakkan kecepatan scroll (bukan konstan)**
```glsl
#include "lygia/distort/chromaAB.glsl"
uniform sampler2D uTexture; uniform float uVelocity;   // velocity scroll ter-lerp, kira-kira -1..1
vec2 dir = (vTextureCoord - 0.5) * abs(uVelocity) + vec2(0.0, uVelocity*0.5);
vec3 col = chromaAB(uTexture, vTextureCoord, dir, vec3(0.02, 0.0, -0.02));
```
Kenapa mahal: aberasi muncul hanya saat bergerak dan menyebar radial dari pusat → terasa seperti lensa/inersia fisik, hilang saat diam.

**3. Zoom-blur transisi halaman (impact frame)**
```glsl
#define RADIALBLUR_KERNELSIZE 24             // dari 64 → hemat 62%
#include "lygia/filter/radialBlur.glsl"
uniform float uImpact;                       // GSAP: 0 → 1 → 0 dalam ~0.4s, ease expo
vec4 c = radialBlur(uTexture, vTextureCoord, vec2(0.5) - vTextureCoord, 0.25*uImpact);
```
Kenapa mahal: blur radial singkat pada momen potong = "kamera menyentak" (smear frame ala animasi), bukan fade biasa.

**4. Kristal Worley yang meleleh**
```glsl
#define WORLEY_JITTER uJitter                 // uniform float uJitter, tween 0 → 1
#define WORLEY_DIST_FNC distChebychev
#include "lygia/generative/worley.glsl"
vec2 w = worley2(vec3(st*6.0, u_time*0.1));   // return vec2(distF1, distF2); versi vec3 = 27 sel (2D = 9)
float edge = 1.0 - smoothstep(0.0, 0.05, w.y - w.x);  // F2-F1 kecil = dekat tepi sel
```
Kenapa mahal: grid persegi sempurna (jitter 0, Chebychev) berubah jadi sel organik secara kontinu — transisi "keteraturan → alam". (`WORLEY_JITTER` boleh berupa uniform: di kode hanya dipakai di ekspresi `random2(n+g) * WORLEY_JITTER`.)

**5. Marbling tanpa blur menumpuk (`distort/marble`)**
Ide dari header file: simpan **inverse map** (dari mana pixel harus membaca warna) dalam fixed-point 16-bit (2 kanal 8-bit per sumbu, `marbleEncode/marbleDecode`), advect map tiap frame `map(st) = map'(st - v*pixel)`, baca tinta sekali via `marble(inkTex, mapTex, st)`; tiap `MARBLE_PERIOD` (60) frame "bake" tinta (`marbleBake(frame)`) lalu reset map ke identitas (`marbleReset(frame)`), `MARBLE_FADE` 0.985 tinta tersisa per bake.
Kenapa mahal: warna di-resample sekali per siklus, bukan per frame → detail tetap tajam walau terus diaduk (efek tinta suminagashi), kebalikan dari feedback blur murahan.

**6. Riak air dari kursor (ping-pong `simulate/ripple`)**
```glsl
#include "lygia/simulate/ripple.glsl"
uniform sampler2D uPrev; uniform vec2 uPixel; uniform vec2 uMouse; uniform float uDown;
// default: #define RIPPLE_SAMPLER_FNC(UV) SAMPLER_FNC(tex, UV) — tidak perlu override
vec3 s = ripple(uPrev, vTextureCoord, uPixel);       // return vec3(d, rta.x, 0.0): r = tinggi baru, g = tinggi lama
s.r += uDown * 0.5 * smoothstep(0.02, 0.0, distance(vTextureCoord, uMouse)); // injeksi impuls
fragColor = vec4(s, 1.0);
// pass tampilan: offset UV gambar dengan gradien (r - 0.5) tetangga
```
Kenapa mahal: gelombang memantul & meredam (0.99/frame) mengikuti fisika diskret, bukan riak sinus yang "dilukis". Simpan state di texture RGBA8 cukup karena nilai di-encode sekitar 0.5 (`saturate(d*0.5+0.5)`).

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- Hitung sampel per pixel sebelum ship: radialBlur 64, stretch 20, gaussian13 ×2 pass, kuwahara (besar), voronoi 9 cell, fbm 4×simplex. Kurangi via define, atau render efek di target ½ resolusi.
- `random()` default memakai hash berbasis `RANDOM_SCALE vec4(.1031,.1030,.0973,.1099)`; opsi `RANDOM_HIGHER_RANGE`, `RANDOM_SINLESS` ("tolerates bigger values before producing pattern") — pakai SINLESS bila input besar (mis. `u_time` lama berjalan) di mobile `mediump`.
- Simulasi ping-pong butuh render target float/half-float untuk akurasi; `marble` sengaja memakai encoding 16-bit di 2 kanal 8-bit agar jalan di buffer 8-bit (aman untuk device tanpa float RT).
- prefers-reduced-motion: matikan input `u_time`/velocity di JS (bekukan alpha psrdnoise, set `uVelocity=0`) — efek tetap jadi still frame yang indah. MDN: `../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md`.
- Glitch/RGB split/grain yang berkedip cepat: patuhi batas flash <3 Hz (`../../_shared/mdn-content/files/en-us/web/accessibility/guides/seizure_disorders/index.md`).
- Dukungan: GLSL ES 1.00/3.00 → semua browser WebGL; WGSL/WESL → browser ber-WebGPU (status di `../webgpu/NOTES.md`).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-lygia/README.md` — cara pakai, resolver lokal/online, desain `#define`, lisensi.
- `repo-lygia/DESIGN.md` — konvensi FNC_ guard, opsi `<FUNC>_*`, urutan argumen, aturan penamaan WGSL.
- `repo-lygia/README_GLSL.md` — daftar resolver include (vite/esbuild/webpack/npm resolve-lygia).
- `repo-lygia/README_WebGPU.md` — WESL: npm, `?link` vs `?static`, `wesl-link`.
- `repo-lygia/LICENSE.md` — Prosperity 3.0.0 (trial komersial 30 hari).
- `repo-lygia/sampler.glsl` — `SAMPLER_FNC`/`SAMPLER_TYPE` default.
- `repo-lygia/generative/psrdnoise.glsl` — flow noise periodik + gradien analitik (MIT).
- `repo-lygia/generative/fbm.glsl`, `snoise.glsl`, `curl.glsl`, `voronoi.glsl`, `worley.glsl`, `wavelet.glsl`, `voronoise.glsl` — generator utama.
- `repo-lygia/distort/chromaAB.glsl`, `displace.glsl`, `stretch.glsl`, `barrel.glsl`, `grain.glsl`, `marble.glsl` — distorsi post-process.
- `repo-lygia/filter/radialBlur.glsl`, `gaussianBlur.glsl`, `noiseBlur.glsl`, `kuwahara.glsl` — blur & stilisasi.
- `repo-lygia/simulate/ripple.glsl`, `grayscott.glsl`, `simpleAndFastFluid.glsl`, `rayleighTaylor.glsl` — simulasi ping-pong.
- `repo-lygia/color/palette.glsl`, `color/palette/*.glsl`, `color/mixOklab.glsl` — warna generatif.
- `repo-lygia/space/kaleidoscope.glsl`, `sqTile.glsl`, `hexTile.glsl`, `rotate.glsl`, `ratio.glsl` — transform ruang.
- `repo-lygia/animation/easing/*.glsl` — easing Penner di GPU.
- `repo-lygia/math/aastep.glsl`, `math/dist.glsl`, `math/gain.glsl` — AA step, metrik jarak, gain.
- `repo-lygia/sdf/*.glsl` + `draw/fill.glsl`, `draw/stroke.glsl` — SDF 2D/3D + rasterisasi ber-AA.
