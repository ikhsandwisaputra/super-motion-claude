---
tool: The Book of Shaders
version: repo commit 5a537e7 (2026-02-27), dicek 2026-10-28. Buku tanpa nomor rilis; bab 14 (Fractals), 16 (Image operations), 17 (Kernel convolutions), 18 (Filters) masih STUB.
official: https://thebookofshaders.com/ (repo https://github.com/patriciogonzalezvivo/thebookofshaders)
local: book-of-shaders/repo-thebookofshaders/
fetched: 2026-10-28
---
# The Book of Shaders — kurikulum fragment shader 2D: shaping → warna → bentuk → pola → random → noise → cellular → fBM/domain warp (bahan baku semua visual shader eksperimental)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk *mengerti* dan *menulis* fragment shader 2D dari nol: background generatif, transisi gambar, hover distortion di plane DOM (curtains/OGL), custom Filter Pixi, efek pattern/tiling. Ini fondasi berpikir, bukan library.
- **Jangan** jadikan library runtime → pakai **LYGIA** (`../lygia/NOTES.md`) untuk fungsi siap `#include`, dan **Inigo Quilez** (`../inigo-quilez/NOTES.md`) untuk rumus SDF/smin/noise yang presisi.
- **Jangan** salin setup WebGL bab 04 apa adanya: contoh three.js-nya pakai `THREE.PlaneBufferGeometry` + `THREE.Camera()` gaya lama (lihat `04/README.md`). Ambil konsep uniform-nya saja; wiring modern ada di NOTES host (`../curtainsjs`, `../ogl`, `../pixijs`, `../webgpu`).
- Bab yang kosong: `14/README.md` = "Coming soon", `17` & `18` cuma judul, `16` cuma contoh `.frag` (add/blend/diff/div/inv/mult/sub). Untuk blur/konvolusi/filter → LYGIA `filter/*`.
- Konvensi uniform buku: `u_resolution`, `u_mouse` (px), `u_time` (detik) — Shadertoy pakai `iResolution` (vec3), `iMouse` (vec4: xy current, zw click), `iTime` (`03/README.md`). Saat port, rename saja.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- Fragment shader = **fungsi murni per pixel**: `(posisi, uniforms) → warna`. Tidak ada memori antar-frame, tidak ada "objek". Semua gerak datang dari **uniform yang berubah** (`u_time`, mouse, scroll, progress tween) atau dari **texture feedback** (ping-pong, di luar cakupan buku).
- Normalisasi baku: `vec2 st = gl_FragCoord.xy/u_resolution.xy;` lalu koreksi aspek `st.x *= u_resolution.x/u_resolution.y;`. Center-kan: `st = st*2.-1.` (lihat `07/rect-df.frag`, `07/shapes.frag`).
- "Pagar 0..1" (bab 05): hampir semua trik = memetakan 0..1 → 0..1 dengan shaping function. Komposisi fungsi ini = koreografi easing *di dalam* shader.
- `step`/`smoothstep` dikali = logika AND; `1.-x` = NOT; `max/min` = union/intersection field (bab 07).
- **Tiling**: `fract(st*N)` = koordinat lokal sel; `floor(st*N)` = ID sel → `random(ID)` = variasi per sel. Ini cara bikin **stagger** di GPU: setiap sel punya fase/arah/kecepatan sendiri (bab 09–10, contoh `10/ikeda-03.frag`).
- Random = hash deterministik `fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123)` (`10/2d-random.frag`). Noise = random di grid yang **diinterpolasi** (value noise) atau gradien yang diinterpolasi (gradient noise); simplex pakai N+1 sudut (3 di 2D) → lebih murah di dimensi tinggi (`11/README.md`).
- Cellular/Voronoi = jarak ke feature point terdekat; dengan tiling cukup cek 3x3 tetangga (9 sampel) per pixel (`12/cellnoise-02.frag`).
- fBM = penjumlahan oktaf noise (frekuensi ×lacunarity, amplitudo ×gain); domain warping = noise mengubah *koordinat* noise lain (`13/clouds.frag`).
- **Biaya** = (instruksi per pixel) × (lebar×tinggi×DPR²). fBM 6 oktaf × warp 3 level = 18+ panggilan noise per pixel — itulah yang membunuh mobile, bukan "jumlah objek".
- `gl_FragCoord` = koordinat **window/canvas** (px dari kiri-bawah), bukan koordinat lokal plane. Di plane DOM-synced (curtains/OGL) pakai varying UV (`vTextureCoord` curtains, `vUv` di contoh OGL) — lihat Integrasi.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
Buku memakai **glslCanvas** (`04/README.md`):
```html
<canvas class="glslCanvas" data-fragment-url="yourShader.frag" data-textures="yourInputImage.png" width="500" height="500"></canvas>
```
dan **glslViewer** CLI (`glslViewer yourShader.frag yourInputImage.png -w 500 -h 500 -E screenshot,out.png`). Untuk produksi web, tempel fragment ke host (curtains/OGL/Pixi/three). Template fragment yang dipakai di semua bab (GLSL ES 1.00 / WebGL1):
```glsl
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(st.x, st.y, abs(sin(u_time)));
    gl_FragColor = vec4(color, 1.0);
}
```
- WebGL2/GLSL ES 3.00 (Pixi v8 filter, three ShaderMaterial glslVersion 3): `in/out`, `out vec4 finalColor;`, `texture()` bukan `texture2D()`. Pixi v8 filter default sudah begitu (`../pixijs/repo-pixijs/src/filters/defaults/alpha/alpha.frag`: `in vec2 vTextureCoord; out vec4 finalColor; uniform sampler2D uTexture;`). LYGIA otomatis pilih `texture` vs `texture2D` via `__VERSION__ >= 300` (`../lygia/repo-lygia/sampler.glsl`).
- Cleanup: buku tidak punya runtime. Destroy diatur host (lihat NOTES host).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob (file) | Efek ke feel | Default di buku | Rentang bagus |
|---|---|---|---|
| `pow(x,k)` (`05/expo.frag`) | k>1 = mulai lambat lalu melesat (ease-in); k<1 = langsung naik lalu landai (ease-out) | 5.0 | buku menyarankan coba 20, 2, 1, 0, 0.2, 0.02 |
| `smoothstep(e0,e1,x)` lebar tepi | 0.01–0.02 = garis tajam ber-AA; lebar = glow/blur | plot: `smoothstep(0.02,0.0,abs(st.y-st.x))` | AA ≈ 1–2 px → hitung `1.5/u_resolution.y` daripada konstanta |
| `impulse(k,x)=h*exp(1.-h), h=k*x` (`05/impulse.frag`) | envelope "pukul lalu meluruh" — hover/klik ripple | k=12 | puncak di x=1/k (IQ) → k=4..20 |
| `cubicPulse(c,w,x)` (`05/cubicpulse.frag`) | jendela halus di sekitar c (spotlight, scanline lewat) | c=.5, w=.2 | animasikan c dengan progress 0..1 → "sapuan" |
| `expStep(x,k,n)=exp(-k*pow(x,n))` (`05/expstep.frag`) | decay; n menajamkan bahu | k=10, n=1 | n 1..4 |
| `parabola(x,k)=pow(4x(1-x),k)` (`05/parabola.frag`) | 0→1→0 (yoyo dalam satu progress) | k=1 | k 0.5..8 |
| `pcurve(x,a,b)` (`05/pcurve.frag`) | bump asimetris (attack cepat, release lambat) | a=3,b=1 | a,b 0.5..6 |
| Easing GLSL (`05/easing.frag`, `06/easing.frag`) | Penner-style di GPU: `exponentialInOut`, `elasticOut` (`sin(-13.*(t+1.)*HALF_PI)*pow(2.,-10.*t)+1.`), `backOut`, `bounceOut` | — | pakai untuk transisi berbasis `uProgress` |
| Kecepatan waktu noise (`11/lava-lamp.frag`) | drift lambat = "mahal"; cepat = glitchy | `u_time*.1`, rotasi arah `u_time*0.15` | 0.03–0.2 per detik untuk background |
| Dua kecepatan tak-sebanding (`13/clouds.frag`) | gerak tidak pernah terlihat berulang | `0.15*u_time` dan `0.126*u_time` | rasio irasional-ish (1.19) |
| fBM oktaf/lacunarity/gain (`13/2d-fbm.frag`) | detail & kekasaran | 6 oktaf, ×2.0, amplitudo awal .5, gain .5 | 3–6 oktaf (mobile 3–4) |
| Rotasi antar-oktaf (`13/clouds.frag`) | menghilangkan artefak sumbu/grid | `mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50))` + shift `vec2(100.)`, 5 oktaf | sudut 0.5 rad |
| Gerak feature point Voronoi (`12/cellnoise-02.frag`) | sel "bernapas", tiap sel beda fase | `point = 0.5 + 0.5*sin(u_time + 6.2831*point);` | kalikan u_time 0.2–1.0 |
| Kepadatan via mouse (`10/ikeda-03.frag`) | user "menyetel" kepadatan data | threshold `0.5+u_mouse.x/u_resolution.x` | — |
| `hsb2rgb` (`06/hsb.frag`) | pemilihan warna intuitif; ada smoothing kubik `rgb = rgb*rgb*(3.0-2.0*rgb);` → transisi hue tanpa "pita" | — | animasikan hue pelan (≤0.05/s) |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
Buku tidak punya API integrasi; ini pola *porting* fragment BoS ke host (nama varying/uniform host sudah dicek di mirror):
- **curtains.js** (coba context `webgl2` dulu, fallback `webgl` — `src/core/Renderer.js`; shader default tetap gaya GLSL ES 1.00): attribute `aVertexPosition`, `aTextureCoord`; varying `vVertexPosition`, `vTextureCoord` (`../curtainsjs/repo-curtainsjs/src/shaders/chunks/default.*.glsl.js`). Ganti `st = gl_FragCoord.xy/u_resolution` → `st = vTextureCoord` dan kirim ukuran plane (px) sebagai uniform untuk koreksi aspek. API plane/uniform → `../curtainsjs/NOTES.md`.
- **OGL**: contoh full-screen pakai `attribute vec2 uv; varying vec2 vUv;` (`../ogl/repo-ogl/examples/triangle-screen-shader.html`). Shader BoS bisa ditempel hampir 1:1 dengan `vUv`.
- **Pixi v8 Filter**: GLSL ES 3.00, input `vTextureCoord`, sampler `uTexture`, output `finalColor`; vertex default menghitung `vTextureCoord = aPosition * (uOutputFrame.zw * uInputSize.zw)` → `vTextureCoord` BUKAN 0..1 penuh di sprite (tergantung padding/frame filter). Untuk pola berbasis posisi, normalisasi pakai `uInputSize`/`uOutputFrame` (`../pixijs/repo-pixijs/src/filters/defaults/defaultFilter.vert`). Detail di `../pixijs/NOTES.md`.
- **three / TSL / WebGPU**: GLSL BoS jalan di `ShaderMaterial` (WebGLRenderer). Untuk WebGPURenderer harus di-port ke TSL/WGSL — lihat `../webgpu/NOTES.md`.
- **GSAP / Motion / scroll lib → uniform**: tween objek JS biasa lalu salin ke uniform tiap frame (`uniforms.uProgress = state.p`). Easing bisa di JS (GSAP) *atau* di shader (`05/easing.frag`) — jangan dobel (ease di JS lalu ease lagi di GLSL = kaku/terlambat).
- **Scroll velocity** (Lenis dll., lihat `../../01-scroll-transitions/`): kirim `uVelocity` yang sudah di-*smooth* (lerp) di JS; di shader pakai sebagai amplitudo distorsi/RGB shift (resep 6). Wiring persis scroll lib ada di NOTES kategori 01.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Sel Voronoi "bernapas" + gooey metaball** (gabungan `12/cellnoise-02.frag` + trik `12/metaballs.frag`)
```glsl
vec2 random2(vec2 p){ return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453); }
// di main: st *= 5.;
vec2 i_st = floor(st), f_st = fract(st);
float m_dist = 1.;
for (int y=-1; y<=1; y++) for (int x=-1; x<=1; x++) {
    vec2 nb = vec2(float(x),float(y));
    vec2 p  = random2(i_st + nb);
    p = 0.5 + 0.5*sin(u_time*0.6 + 6.2831*p);      // tiap sel fase sendiri
    float d = length(nb + p - f_st);
    m_dist = min(m_dist, m_dist*d);                 // metaballs.frag: PRODUK jarak → menyatu seperti cairan
}
color = vec3(step(0.060, m_dist));
```
Kenapa mahal: gerak per-sel dengan fase acak = stagger organik; produk jarak membuat gumpalan "menempel lalu lepas" seperti merkuri.

**2. Awan domain-warp yang tidak pernah terlihat loop** (`13/clouds.frag`, dipangkas)
```glsl
float fbm(vec2 p){ float v=0., a=.5; mat2 r=mat2(cos(.5),sin(.5),-sin(.5),cos(.5));
  for(int i=0;i<5;i++){ v+=a*noise(p); p=r*p*2.+vec2(100.); a*=.5; } return v; }
vec2 q = vec2(fbm(st), fbm(st + vec2(1.0)));
vec2 r = vec2(fbm(st + q + vec2(1.7,9.2) + 0.15*u_time),
              fbm(st + q + vec2(8.3,2.8) + 0.126*u_time));
float f = fbm(st + r);
// warna: mix 3 warna dengan f*f*4., length(q), r.x lalu kali (f*f*f+.6*f*f+.5*f)
```
Kenapa mahal: waktu hanya masuk di lapis kedua dengan dua kecepatan tak-sebanding → aliran mengalir seperti asap, bukan "geser texture".

**3. Baris data ala Ryoji Ikeda** (`10/ikeda-03.frag`)
```glsl
vec2 grid = vec2(100.,50.); st *= grid;
vec2 ipos = floor(st), fpos = fract(st);
vec2 vel = vec2(u_time*2.*max(grid.x,grid.y));
vel *= vec2(-1.,0.) * random(1.0+ipos.y);          // tiap baris kecepatan sendiri
float t = 0.5 + u_mouse.x/u_resolution.x;           // mouse = kepadatan
color.r = pattern(st+vec2(.1,0.), vel, t);           // offset per kanal = RGB split gratis
color.g = pattern(st, vel, t);
color.b = pattern(st-vec2(.1,0.), vel, t);
color *= step(0.2, fpos.y);
```
Kenapa mahal: ritme poliritmik per baris + split kanal = estetika "data art" tanpa satu pun texture. **Hati-hati flashing** (lihat Performa).

**4. Ubin berbaris dua fase (call-and-response)** (`09/marching_dots.frag`)
```glsl
vec2 movingTiles(vec2 st, float zoom, float speed){
  st *= zoom; float t = u_time*speed;
  if (fract(t)>0.5){ if (fract(st.y*0.5)>0.5) st.x += fract(t)*2.0; else st.x -= fract(t)*2.0; }
  else             { if (fract(st.x*0.5)>0.5) st.y += fract(t)*2.0; else st.y -= fract(t)*2.0; }
  return fract(st);
}
```
Kenapa mahal: baris genap/ganjil bergerak berlawanan lalu bergantian sumbu — koreografi bertahap seperti timeline, tapi 0 JS. Tambah easing: ganti `fract(t)*2.0` dengan `cubicInOut(fract(t*2.))` agar ada "tarikan napas" di tiap fase.

**5. Distorsi gambar mengalir (noise menentukan ARAH, bukan offset)** (`15/texture-noise.frag`)
```glsl
float angle = noise(st + u_time*0.1) * PI;
st += radius * vec2(cos(angle), sin(angle));        // buku: radius = 0.5 (efek ekstrem)
vec4 color = texture2D(u_tex0, st);
```
Untuk hover plane: `radius = uHover*0.02` (uHover di-tween 0→1). Kenapa mahal: vektor displacement koheren (searah lokal) → terlihat seperti cairan/kaca, bukan getar acak.

**6. Lingkaran berombak hidup** (`11/circleWave-noise.frag`)
```glsl
float shape(vec2 st, float radius){
  st = vec2(0.5)-st; float r = length(st)*2.0; float a = atan(st.y,st.x);
  float m = abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;
  float f = radius;
  m += noise(st+u_time*0.1)*.5;
  f += sin(a*50.)*noise(st+u_time*.2)*.1;
  f += (sin(a*20.)*.1*pow(m,2.));
  return 1.-smoothstep(f,f+0.007,r);
}
// outline: shape(st,0.8)-shape(st,0.8-0.02)
```
Kenapa mahal: frekuensi tinggi (50) dimodulasi noise lambat + "gelombang berjalan" `m` mengelilingi bentuk → blob audio-reactive siap (ganti `.1` dengan `uLevel`).

Bonus pola polar (`07/polar.frag`): `f = cos(a*3.)`, `abs(cos(a*12.)*sin(a*3.))*.8+.1`, `smoothstep(-.5,1.,cos(a*10.))*0.2+0.5` → bunga/gear/roda gigi; animasikan `a + u_time` untuk rotasi tanpa matriks.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- **Hash `fract(sin(...)*43758.5453)` rusak di `mediump`/input besar** (pola terlihat berulang/bergaris, terutama mobile). Opsi: `precision highp float`, jaga input kecil, atau LYGIA `random` dengan `RANDOM_SINLESS` (`../lygia/repo-lygia/generative/random.glsl`). Buku sendiri mengingatkan `u_time` membesar dan membuat grafik susah dibaca (`05/README.md`) → wrap waktu di JS (mis. modulo periode loop) sebelum dikirim.
- Mahal → murah: kurangi oktaf fBM (6→3–4), turunkan lapis warp (2→1), Voronoi 3x3 → Gustavson 2x2 (`12/2d-cnoise-2x2.frag`, lebih murah tapi ada artefak — `12/README.md`), render ke target setengah resolusi lalu upscale (host-side), cap DPR (host-side).
- `sqrt`/`length` mahal relatif → lingkaran bisa pakai `dot(dist,dist)` (`07/circle.frag`).
- **prefers-reduced-motion**: shader tidak tahu media query — baca di JS (`matchMedia('(prefers-reduced-motion: reduce)')`) lalu bekukan `u_time` atau set amplitudo distorsi ≈0; pertahankan warna/komposisi statis. Ref MDN: `../../_shared/mdn-content/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md`.
- **Flashing/strobe** (resep Ikeda, glitch, random per frame): MDN mencatat flash berbahaya bila ≥3 Hz, luminans ≥20 cd/m², area ≥~10% bidang pandang; merah lebih berisiko; pola garis juga pemicu (`../../_shared/mdn-content/files/en-us/web/accessibility/guides/seizure_disorders/index.md`). Batasi kontras & frekuensi kedip < 3/s.
- Dukungan: semua contoh GLSL ES 1.00 → jalan di WebGL1 & WebGL2 di semua browser modern. WGSL/WebGPU perlu port (`../webgpu/NOTES.md`).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-thebookofshaders/05/README.md` — shaping functions, step/smoothstep, sin/cos, link Golan Levin & IQ.
- `repo-thebookofshaders/05/easing.frag` — easing Penner versi GLSL (exponential/elastic/back/bounce/...).
- `repo-thebookofshaders/05/{impulse,cubicpulse,expstep,parabola,pcurve}.frag` — port fungsi IQ (urutan argumen versi lama).
- `repo-thebookofshaders/06/hsb.frag`, `06/hsb-colorwheel.frag` — rgb2hsb/hsb2rgb + roda warna polar.
- `repo-thebookofshaders/07/README.md` + `07/shapes.frag`, `07/polar.frag`, `07/rect-df.frag` — distance field, polygon N-sisi, bentuk polar.
- `repo-thebookofshaders/08/cross-rotate.frag`, `08/cross-scale.frag`, `08/matrices.frag` — matriks 2D di sekitar pusat (translate→rotate→translate balik).
- `repo-thebookofshaders/09/bricks.frag`, `09/truchet.frag`, `09/marching_dots.frag` — tiling, offset bata, Truchet, ubin bergerak.
- `repo-thebookofshaders/10/2d-random.frag`, `10/2d-random-truchet.frag`, `10/ikeda-03.frag` — hash, mosaik random, data-art bergerak.
- `repo-thebookofshaders/11/2d-noise.frag`, `11/2d-snoise.frag`, `11/wood.frag`, `11/lava-lamp.frag`, `11/circleWave-noise.frag` — value/simplex noise + pemakaian bergerak.
- `repo-thebookofshaders/12/cellnoise-02.frag`, `12/metaballs.frag`, `12/vorono-01.frag`, `12/2d-voronoise.frag` — cellular, metaball, voronoi warna-per-sel.
- `repo-thebookofshaders/13/2d-fbm.frag`, `13/turbulence.frag`, `13/ridge.frag`, `13/clouds.frag` — fBM, turbulence (abs), ridge, domain warp.
- `repo-thebookofshaders/15/texture-noise.frag`, `15/texture-kaleidoscope.frag` — distorsi texture berbasis noise/kaleidoskop.
- `repo-thebookofshaders/glossary/<fungsi>/README.md` — referensi fungsi built-in GLSL (sebagian entri masih tipis).
