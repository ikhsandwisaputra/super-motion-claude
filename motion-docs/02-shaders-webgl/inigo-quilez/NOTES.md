---
tool: Inigo Quilez — articles (rujukan kanonik pihak ketiga, bukan library)
version: articles (site, no versioning) fetched 2026-10-28 — artikel diperbarui diam-diam; urutan argumen beberapa fungsi BERBEDA dari port lama di Book of Shaders
official: https://iquilezles.org/articles/
local: inigo-quilez/web/ (32 artikel .md + articles-index.md)
fetched: 2026-10-28
---
# Inigo Quilez (iquilezles.org) — rujukan kanonik matematika procedural: remapping/easing, SDF 2D/3D, smooth-min, palet kosinus, fBM & domain warp, Voronoi, domain repetition, feedback, filtering/bandlimiting, alpha & gamma

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** saat butuh rumus yang *benar*, bukan sekadar "kelihatan jalan": SDF eksak, `smin` dengan `k` ternormalisasi (satuan jarak), tepi Voronoi yang benar, fBM dengan parameter H, domain repetition yang tidak bocor, anti-aliasing pola procedural yang bergerak, premultiplied alpha saat canvas WebGL menumpuk DOM.
- **Lisensi** (`web/articles-index.md`): *"all technical code snippets … are under the MIT license … but the mathematical/shader art is protected and requires a license for use"* → snippet boleh dipakai di proyek klien (MIT); karya shader art/Shadertoy-nya jangan dijiplak.
- **Jangan** cari API/runtime di sini — tidak ada. Implementasi siap-include → `../lygia/NOTES.md` (banyak fungsi LYGIA = turunan IQ); belajar dari nol → `../book-of-shaders/NOTES.md`.
- ⚠️ **Perbedaan signature vs BoS** (BoS memakai versi lama): BoS `impulse(k,x)` ↔ IQ `expImpulse(x,k)`; BoS `cubicPulse(c,w,x)` ↔ IQ `cubicPulse(x,c,w)`; BoS `expStep(x,k,n)=exp(-k*pow(x,n))` ↔ IQ sekarang `expStep(x,k)=exp2(-pow(x,k))`. Jangan campur tanpa cek.
- `web/sigmoids.md` THIN (rumus berupa gambar) — tidak bisa diverifikasi lokal; pakai smoothstep/rational dari `smoothsteps.md`.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- **Semua adalah sinyal yang di-remap.** Easing, envelope, falloff, kontras = fungsi 1D pada [0,1] atau pada jarak. Pilih fungsi berdasarkan *turunan* di ujung (smoothstep: turunan 0 di kedua ujung; `almostUnitIdentity` x²(2−x): turunan 0 di 0, turunan 1 di 1 → "mulai lembut, keluar tetap melaju").
- **Posisi = integral kecepatan.** Animasi stateless (fungsi waktu murni) yang "mulai dari diam ke kecepatan konstan" harus pakai *integral* smoothstep, bukan `smoothstep(0,T,t)*t` (itu terlihat melesat lalu mengerem tidak wajar) — `smoothstepintegral.md`.
- **SDF**: nilai = jarak bertanda ke permukaan. Union = `min`, tapi `min`/`max` hanya menghasilkan *batas bawah* jarak di beberapa area (`interiordistance.md`); `max` (subtract/intersect) merusak SDF lebih parah. Penting untuk raymarching (langkah) dan untuk efek berbasis jarak (outline/glow konsisten).
- **smin**: blending dalam jarak `k` (satuan jarak dunia). IQ menormalisasi `k` per varian supaya lebar area blend ≈ sama. Keluarga polinomial (CD) **conservative** (tidak pernah overestimate → aman untuk raymarch) tapi **tidak asosiatif** (urutan blend berpengaruh); exponential & circular-geometrical asosiatif. Default IQ: quadratic polynomial (`smin.md`).
- **Domain repetition** `p - s*round(p/s)` memberi ID instance gratis, tapi begitu instance berbeda (ukuran/rotasi/jitter) SDF jadi salah di batas sel → cek tetangga (2×2 di 2D, 2×2×2 di 3D) atau trik mirror (`sdfrepetition.md`).
- **fBM** = jumlah oktaf `noise(f*x)` dengan `f*=2`, `a*=G`, `G = exp2(-H)`. H=1 (G=0.5) = "yellow noise", isotropik, paling mirip gunung nyata (−9 dB/oktaf); H=½ (G≈0.707) = Brownian; H=0 (G=1) = pink, paling berisik (`fbm.md`).
- **Domain warping** `f(p + 4.0*q)` dengan `q` = fBM 2D (dua fBM 1D ber-offset) → lapisan kedua `r` → `f(p + 4.0*r)` (`warp.md`). Nilai antara `q`, `r` adalah sumber warna gratis.
- **Aliasing paling terlihat saat BERGERAK** (pola frekuensi tinggi "merayap/berkilau"). Solusi tanpa supersampling: bandlimit — matikan gelombang yang lebih rapat dari ukuran pixel memakai `fwidth` (`bandlimiting.md`, `filtering.md`).
- **Komposit**: blending premultiplied commute dengan scaling/filtering texture; blending biasa menambah error `x(1−x)(c1a2 + a1c2 − a1c1 − a2c2)` → tepi gelap (`premultipliedalpha.md`). Blur/downsample/gradien harus di ruang linear (de-gamma dulu) atau hasil jadi terlalu gelap (`gamma.md`).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
Tidak ada runtime — salin snippet (MIT) ke shader host. Kit fungsi kecil yang terverifikasi dari `web/functions.md`, `smoothstepintegral.md`, `smoothsteps.md`, `ismoothstep.md`:
```glsl
// Identities
float almostIdentity(float x, float m, float e){ if(x>m) return x; float a=2.0*e-m; float b=2.0*m-3.0*e; float t=x/m; return (a*t+b)*t*t+e; }
float smoothAbs(float x, float n){ return sqrt(x*x+n*n); }                    // smooth abs versi akar
float integralSmoothstep(float x, float T){ if(x>T) return x-T/2.0; return x*x*x*(1.0-x*0.5/T)/T/T; }
// Impulses
float expImpulse(float x, float k){ float h=k*x; return h*exp(1.0-h); }        // maks = 1 tepat di x = 1/k
float quaImpulse(float k, float x){ return 2.0*sqrt(k)*x/(1.0+k*x*x); }        // puncak di x = sqrt(1/k)
float sustainedImpulse(float x, float f, float k){ float s=max(x-f,0.0); return min(x*x/(f*f), 1.0+(2.0/f)*s*exp(-k*s)); } // attack f, release k, mendarat di 1
float sinc(float x, float k){ float a=PI*(k*x-1.0); return sin(a)/a; }         // k bulat = jumlah pantulan
float trunc_fallof(float x, float m){ if(x>m) return 0.0; x/=m; return (x-2.0)*x+1.0; } // falloff kuadratik nol tepat di m
// Unitary remap [0,1]→[0,1]
float almostUnitIdentity(float x){ return x*x*(2.0-x); }
float gain(float x, float k){ float a=0.5*pow(2.0*((x<0.5)?x:1.0-x), k); return (x<0.5)?a:1.0-a; } // k=1 identitas, k<1 gain klasik, k>1 kurva S; k=a dan 1/a saling invers
float parabola(float x, float k){ return pow(4.0*x*(1.0-x), k); }
float pcurve(float x, float a, float b){ float k=pow(a+b,a+b)/(pow(a,a)*pow(b,b)); return k*pow(x,a)*pow(1.0-x,b); }
float tone(float x, float k){ return (k+1.0)*x/(1.0+k*x); }
// Bumps & steps
float cubicPulse(float x, float c, float w){ x=abs(x-c); if(x>w) return 0.0; x/=w; return 1.0-x*x*(3.0-2.0*x); }
float rationalBump(float x, float k){ return 1.0/(1.0+k*x*x); }
float expStep(float x, float k){ return exp2(-pow(x,k)); }
// Smoothstep family (domain 0..1)
float smoothstepQuartic(float x){ return x*x*(2.0-x*x); }                        // C1, hanya pangkat genap (enak untuk x = jarak²)
float smoothstepQuintic(float x){ return x*x*x*(x*(x*6.0-15.0)+10.0); }          // C2 (Perlin)
float smoothstepRational(float x, float n){ return pow(x,n)/(pow(x,n)+pow(1.0-x,n)); } // C(n-1); inversnya = fungsi sama dengan 1/n
float inverse_smoothstep(float y){ return 0.5 - sin(asin(1.0-2.0*y)/3.0); }     // invers smoothstep kubik
```
- `PI` didefinisikan sendiri (mis. `#define PI 3.14159265359`).
- Cleanup: tidak ada.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
**smin (`smin.md`)** — `k` = lebar blend dalam satuan jarak; faktor normalisasi di dalam fungsi:
| Varian | Normalisasi | Sifat |
|---|---|---|
| quadratic polynomial | `k *= 4.0; h = max(k-abs(a-b),0.0)/k; return min(a,b) - h*h*k*(1.0/4.0);` | default IQ: cepat, conservative, dekat sirkular, tidak lokal |
| cubic polynomial | `k *= 6.0; … - h*h*h*k*(1.0/6.0)` | kontinuitas lebih tinggi |
| quartic polynomial | `k *= 16.0/3.0; … - h*h*h*(4.0-h)*k*(1.0/16.0)` | — |
| exponential | `k *= 1.0; r = exp2(-a/k)+exp2(-b/k); return -k*log2(r);` | asosiatif (urutan bebas), tidak pernah persis a/b |
| root | `k *= 2.0; x=b-a; return 0.5*(a+b-sqrt(x*x+k*k));` | — |
| sigmoid | `k *= log(2.0); x=b-a; return a + x/(1.0-exp2(x/k));` | — |
| circular | `k *= 1.0/(1.0-sqrt(0.5)); … - k*0.5*(1.0+h-sqrt(1.0-h*(h-2.0)))` | profil lingkaran sempurna |
| circular geometrical | `k *= 1.0/(1.0-sqrt(0.5)); return max(k,min(a,b)) - length(max(k-vec2(a,b),0.0));` | lokal + asosiatif |
- **Mix factor** (warna/material ikut blend):
```glsl
vec2 sminQ(float a, float b, float k){            // quadratic
  float h = 1.0 - min(abs(a-b)/(4.0*k), 1.0); float w = h*h; float m = w*0.5; float s = w*k;
  return (a<b) ? vec2(a-s, m) : vec2(b-s, 1.0-m); }  // .x = jarak, .y = faktor mix
vec2 sminC(float a, float b, float k){            // cubic
  float h = 1.0 - min(abs(a-b)/(6.0*k), 1.0); float w = h*h*h; float m = w*0.5; float s = w*k;
  return (a<b) ? vec2(a-s, m) : vec2(b-s, 1.0-m); }
```
- 3D `opSmoothUnion` di `distfunctions.md`: `k *= 4.0; h = max(k-abs(a-b),0.0); return min(a,b) - h*h*0.25/k;`.

**Palet kosinus (`palettes.md`)** — `col = a + b*cos(6.283185*(c*t + d))`. `c` = jumlah osilasi, `d` = fase per kanal. Agar siklus 0..1 mulus: `c` kelipatan ½; agar C¹ (bahkan C∞) mulus saat t dibungkus: `c` bilangan bulat. Preset dari artikel (a | b | c | d):
| a | b | c | d |
|---|---|---|---|
| .5,.5,.5 | .5,.5,.5 | 1,1,1 | 0.00,0.33,0.67 (pelangi) |
| .5,.5,.5 | .5,.5,.5 | 1,1,1 | 0.00,0.10,0.20 |
| .5,.5,.5 | .5,.5,.5 | 1,1,1 | 0.30,0.20,0.20 |
| .5,.5,.5 | .5,.5,.5 | 1,1,0.5 | 0.80,0.90,0.30 |
| .5,.5,.5 | .5,.5,.5 | 1,0.7,0.4 | 0.00,0.15,0.20 |
| .5,.5,.5 | .5,.5,.5 | 2,1,0 | 0.50,0.20,0.25 |
| .8,.5,.4 | .2,.4,.2 | 2,1,1 | 0.00,0.25,0.25 |

**fBM (`fbm.md`, `morenoise.md`)** — `G = exp2(-H)`; H=1→G=0.5 (default "alam"), H=0.5→0.707, H=0→1. Detune lacunarity (2.01/1.99, atau `f=1.98`, `s=0.49` di fbm-derivatif) untuk mematahkan keselarasan antar-oktaf; IQ memutar domain tiap oktaf dengan `mat2(0.8,-0.6,0.6,0.8)` (~36.9°) di contoh terrain.

**Warp (`warp.md`)** — skala displacement `4.0`, offset pemisah `vec2(5.2,1.3)`, `vec2(1.7,9.2)`, `vec2(8.3,2.8)` (tidak bermakna khusus, hanya decorrelate).

**Voronoi** — `smoothVoronoi`: `res += exp2(-32.0*d); return -(1.0/32.0)*log2(res);` (32 = ketajaman; artikel memperlihatkan falloff 4/8/16…) atau `res += 1.0/pow(d,8.0); return pow(1.0/res, 1.0/16.0);` (`smoothvoronoi.md`). `voronoise(p,u,v)`: u = jitter grid (0 grid reguler → 1 Voronoi), v = metrik/smoothness; u=0,v=1 → noise; u=1,v=0 → Voronoi; u=0,v=0 → cell noise; u=1,v=1 → "voronoise" (`voronoise.md`).

**Raymarch** — soft shadow `res = min(res, k*h/t)` (k besar = bayangan keras) dalam loop `t += h` (`rmshadows.md`); normal tetrahedron `const vec2 k = vec2(1,-1); n = normalize(k.xyy*f(p+k.xyy*h) + k.yyx*f(p+k.yyx*h) + k.yxy*f(p+k.yxy*h) + k.xxx*f(p+k.xxx*h));` dengan `h = 0.0001` (4 evaluasi, bukan 6) (`normalsSDF.md`).

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- **Easing di JS juga sah**: fungsi IQ murni matematika → bisa dipakai sebagai custom ease di GSAP/Motion (`ease: t => gain(t, 2.0)`), atau di shader dengan `uProgress`. Pilih satu sisi.
- **Canvas WebGL transparan di atas DOM** (curtains/OGL): kedua lib default `premultipliedAlpha = false` (`../curtainsjs/repo-curtainsjs/src/core/Curtains.js`, `../ogl/repo-ogl/src/core/Renderer.js`). Bila canvas transparan & ada texture ber-alpha yang di-scale/blur → set `premultipliedAlpha: true` dan keluarkan `vec4(rgb*a, a)`; curtains lalu memakai `blendFuncSeparate(ONE, ONE_MINUS_SRC_ALPHA, …)` (`src/core/Renderer.js` `setBlendFunc`). MDN: `premultipliedAlpha` = compositor menganggap drawing buffer berisi warna premultiplied (`../../_shared/mdn-content/files/en-us/web/api/offscreencanvas/getcontext/index.md`). Pixi texture sudah premultiplied — filter bawaan Pixi meng-*un-premultiply* sebelum operasi warna (`../pixijs/repo-pixijs/src/filters/defaults/noise/noise.frag`, komentar issue #3539).
- **Blur/bloom/transisi gradien**: de-gamma → proses → gamma (`pow(x,2.2)` / `pow(x,1.0/2.2)`, atau `x*x` / `sqrt(x)` versi murah) — atau pakai texture sRGB di GPU (`gamma.md`).
- **Ping-pong host** untuk feedback (resep 6): curtains `PingPongPlane`, OGL RenderTarget/Flowmap, Pixi RenderTexture — lihat NOTES masing-masing.
- **three/TSL/WebGPU**: rumus portabel apa adanya ke WGSL (ganti `vec2`→`vec2f`, `mix`→`mix`, `fract`→`fract`, `atan(y,x)`→`atan2(y,x)`); TSL → `../webgpu/NOTES.md`.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Mulai bergerak tanpa "sentakan" (marquee/rotasi logo/orbit stateless)** (`smoothstepintegral.md`)
```glsl
float position(float t, float T){ if(t>=T) return t - 0.5*T; float f = t/T; return f*f*f*(T - t*0.5); }
float angle = position(u_time, 1.5) * uSpeed;   // akselerasi halus 1.5s lalu kecepatan konstan, kontinu C1
```
Kenapa mahal: kecepatan naik mulus ke konstan tanpa overshoot — `smoothstep(0,T,t)*t` (cara salah) terlihat melesat lalu mengerem.

**2. Blob gooey hover yang warnanya ikut melebur** (`smin.md`, `distfunctions2d.md`)
```glsl
float sdCircle(vec2 p, float r){ return length(p) - r; }
float sdRoundedBox(vec2 p, vec2 b, vec4 r){ r.xy = (p.x>0.0)?r.xy:r.zw; r.x = (p.y>0.0)?r.x:r.y;
  vec2 q = abs(p)-b+r.x; return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x; }
// r: .x=kanan-atas, .y=kanan-bawah, .z=kiri-atas, .w=kiri-bawah (dari percabangan p.x/p.y) → cocokkan border-radius DOM
vec2 sm  = sminQ(sdCircle(p - uMouse, 0.08), sdRoundedBox(p, vec2(0.3,0.12), vec4(0.06)), uK); // uK di-tween 0→0.05
vec3 col = mix(colBox, colCursor, sm.y);
float a  = 1.0 - smoothstep(0.0, fwidth(sm.x), sm.x);        // AA 1px dari derivatif
```
Kenapa mahal: kursor "menempel" ke tombol seperti cairan dan warnanya bercampur sesuai geometri blend, bukan crossfade datar.

**3. Marmer domain-warp dengan warna dari q & r** (`warp.md`, + palet)
```glsl
float pattern(vec2 p, out vec2 q, out vec2 r){
  q = vec2(fbm(p + vec2(0.0,0.0) + 0.05*u_time), fbm(p + vec2(5.2,1.3)));
  r = vec2(fbm(p + 4.0*q + vec2(1.7,9.2)), fbm(p + 4.0*q + vec2(8.3,2.8) + 0.03*u_time));
  return fbm(p + 4.0*r); }
vec2 q, r; float f = pattern(p, q, r);
vec3 col = palette(f, vec3(.5), vec3(.5), vec3(1.0), vec3(0.0,0.10,0.20));
col = mix(col, vec3(0.9,0.85,0.8), clamp(length(q),0.0,1.0));   // artikel: ramp f → campur via |q| → via r.y
col = mix(col, vec3(0.1,0.1,0.2), clamp(r.y,0.0,1.0));
```
(fbm pakai rotasi `mat2(0.8,-0.6,0.6,0.8)` per oktaf, G=0.5.) Kenapa mahal: waktu kecil di dua lapis berbeda membuat aliran berlapis seperti tinta di cairan; warna dari struktur internal (q,r) → kedalaman, bukan colormap datar.

**4. Kaca retak / reveal Voronoi dengan tepi yang benar** (`voronoilines.md`)
```glsl
float voronoiDistance(vec2 x){
  ivec2 p = ivec2(floor(x)); vec2 f = fract(x); ivec2 mb; vec2 mr; float res = 8.0;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ ivec2 b=ivec2(i,j); vec2 r=vec2(b)+random2f(p+b)-f;
    float d=dot(r,r); if(d<res){ res=d; mr=r; mb=b; } }
  res = 8.0;
  for(int j=-2;j<=2;j++) for(int i=-2;i<=2;i++){ ivec2 b=mb+ivec2(i,j); vec2 r=vec2(b)+random2f(p+b)-f;
    float d=dot(0.5*(mr+r), normalize(r-mr)); res=min(res,d); }   // jarak ke garis bisektor
  return res; }
float border = 1.0 - smoothstep(0.0, 0.05*uProgress, voronoiDistance(p*6.0));
```
(`random2f` = hash vec2→vec2 milik Anda; jaga `r-mr` ≠ 0.) Kenapa mahal: ketebalan garis seragam di semua sel (versi naif F2−F1 tebal-tipis) → retakan terlihat seperti kaca asli; 2 pass (9 + 25 sel) — pakai untuk hero, bukan full-screen mobile.

**5. Grid tak hingga yang tiap item beda, tanpa "bocor"** (`sdfrepetition.md`)
```glsl
float repeated(vec2 p, float s, vec2 size){          // limited & benar (2x2 tetangga)
  vec2 id = round(p/s); vec2 o = sign(p - s*id); float d = 1e20;
  for(int j=0;j<2;j++) for(int i=0;i<2;i++){
    vec2 rid = id + vec2(i,j)*o;
    rid = clamp(rid, -(size-1.0)*0.5, (size-1.0)*0.5);  // grid size.x × size.y item
    vec2 r = p - s*rid;
    d = min(d, sdItem(r, rid)); }                       // rid → fase/ukuran per item (stagger)
  return d; }
```
Alternatif murah: mirror tiap instance ganjil (`repeated_mirrored`, hanya untuk bentuk yang boleh dicermin). Kenapa mahal: stagger per-ID (ukuran/fase berbeda) tanpa artefak jahitan; "limited" via clamp ID membuat grid berujung rapi tanpa boolean box.

**6. Feedback trail / video-feedback (ping-pong)** (`feedbackfx.md`, diterjemahkan ke shader)
```glsl
// pass A: baca frame sebelumnya (uPrev) dengan UV diputar & di-zoom, diredam, lalu gambar konten baru di atasnya
float s = 0.8 + 0.3*sin(0.2*u_time);   // skala dari artikel
float a = 0.4*u_time;                  // rotasi dari artikel
vec2 c = vUv - 0.5; c = mat2(cos(a),-sin(a),sin(a),cos(a)) * c * s;
vec3 prev = texture(uPrev, c + 0.5).rgb * 0.75;    // glColor3f(0.75): tiap generasi meredup
vec3 col  = max(prev, newContent(vUv));
```
Artikel juga menjaga border 64 px bebas feedback (`glCopyTexSubImage2D` dengan offset) agar tepi tidak "bocor" ke dalam. Kenapa mahal: spiral tak berujung yang lahir dari satu gambar — kedalaman rekursif dengan biaya 1 sample texture.

**Bonus — deformasi 2D klasik (`deform.md`)**, dengan `r = length(p)`, `a = atan(p.y,p.x)`, lalu `texture(tex, vec2(u,v) + time)`: swirl `u = x*cos(2r) - y*sin(2r); v = y*cos(2r) + x*sin(2r)`; terowongan `u = cos(a)/r; v = sin(a)/r` (artikel: `cosf(a)/d`, `sinf(a)/d`); `u = 0.5*a/π; v = sin(7r)`; `u = r*cos(a+r); v = r*sin(a+r)`; lantai-langit `u = x/|y|; v = 1/|y|`.
**Bonus — popcorn flow (`popcorns.md`)**: `x += λ*cos(t0 + y + cos(t1 + π*x)); y += λ*cos(t2 + x + cos(t3 + π*y));` dengan `t0..t3` naik linear terhadap waktu → medan aliran fluida untuk partikel (vertex/compute) atau per-pixel "jarak tempuh".
**Bonus — loop mulus** (matematika umum, bukan dari artikel lokal): lintasan tertutup di domain noise ⇒ output periodik, mis. `noise(vec3(p, 0.0) + R*vec3(0.0, cos(TAU*t/T), sin(TAU*t/T)))`; untuk palet cukup `c` bulat (terverifikasi di `palettes.md`); untuk flow noise lihat `psrdnoise` alpha di `../lygia/NOTES.md`.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- **Bandlimit pola bergerak** (`bandlimiting.md`):
```glsl
float fcos(float x){ float w = fwidth(x); return cos(x) * sin(0.5*w)/(0.5*w); }          // box-filtered cos (= kali sinc)
// versi murah: return cos(x) * smoothstep(6.2831853, 0.0, w);
float fnoise(float x, float w){ return noise(x) * smoothstep(1.0, 0.5, w); }
float ffbm(float x){ float w=fwidth(x), f=1.0, a=0.5, t=0.0;
  for(int i=0;i<nOcts;i++){ t += a*fnoise(f*x, w); f *= 2.01; w *= 2.01; a *= 0.50; } return t; }
```
Oktaf yang lebih rapat dari ~1 osilasi/pixel dimatikan halus → tidak ada "kilau merayap" saat scroll/zoom. Lebar filter `w` harus ikut dikali bersama frekuensi.
- **Gamma**: blur/rata-rata di ruang sRGB = hasil terlalu gelap; de-gamma dulu (`gamma.md`).
- **Premultiplied alpha**: bila texture ber-alpha di-scale/di-filter lalu di-blend non-premultiplied → error parabola `x(1−x)…` antar texel = halo gelap (`premultipliedalpha.md`).
- Biaya: Voronoi tepi = 9 + 25 sel; repetition benar = ×4 (2D) / ×8 (3D) evaluasi SDF; normal tetrahedron = 4 evaluasi `map` (vs 6 central diff). Catatan compiler: IQ memakai `#define ZERO (min(iFrame,0))` sebagai loop start agar compiler tidak meng-inline `map()` 4× (`normalsSDF.md`) — di host Anda gunakan uniform frame/nol non-konstan serupa.
- prefers-reduced-motion: bekukan waktu (`t` konstan), matikan feedback/warp yang berdenyut, sisakan komposisi statis. Flash/strobe <3 Hz (MDN `../../_shared/mdn-content/files/en-us/web/accessibility/guides/seizure_disorders/index.md`).
- Dukungan: hampir semua rumus jalan di GLSL ES 1.00, kecuali `round()` (built-in baru di GLSL ES 3.00 — di WebGL1 pakai `floor(x+0.5)` atau polyfill LYGIA `math/round.glsl`) dan operasi bit `&` di `repeated_mirrored` (GLSL ES 3.00; di WebGL1 pakai `mod(id,2.0)`). `fwidth` di WebGL1 butuh ekstensi `OES_standard_derivatives` (LYGIA `math/aastep.glsl` mengecek `GL_OES_standard_derivatives`).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `web/articles-index.md` — daftar semua artikel + pernyataan lisensi (snippet MIT).
- `web/functions.md` — remapping functions (identity, impulse, bump, gain, parabola, pcurve, tone, expStep).
- `web/smoothsteps.md`, `web/ismoothstep.md`, `web/smoothstepintegral.md` — keluarga smoothstep, invers, integral untuk animasi.
- `web/smin.md` — semua smooth-minimum, normalisasi k, mix factor, sifat (rigid/local/conservative/asosiatif).
- `web/distfunctions2d.md` — 44 SDF 2D (mayoritas eksak) (rounded box per-sudut, segment, star, heart, arc, ring, bezier) + `opRound`/`opOnion`.
- `web/distfunctions.md` — SDF 3D + operator (smooth union, twist, bend, elongate, revolution, extrusion, displace).
- `web/distgradfunctions2d.md` — SDF 2D + gradien analitik (normal/arah tanpa sampling ulang).
- `web/palettes.md` — palet kosinus + preset.
- `web/warp.md`, `web/fbm.md`, `web/morenoise.md`, `web/gradientnoise.md` — domain warp, teori fBM (H/G), noise + turunan analitik, terrain erosi.
- `web/voronoilines.md`, `web/smoothvoronoi.md`, `web/voronoise.md`, `web/cellularffx.md` — Voronoi tepi benar, Voronoi halus, generalisasi noise↔Voronoi.
- `web/sdfrepetition.md` — domain repetition benar, mirror, rotasional, limited.
- `web/interiordistance.md`, `web/fbmsdf.md` — kenapa min/max merusak SDF; detail fBM yang tetap SDF.
- `web/feedbackfx.md`, `web/deform.md`, `web/popcorns.md` — efek feedback, deformasi 2D/terowongan, popcorn flow.
- `web/bandlimiting.md`, `web/filtering.md`, `web/texturerepetition.md` — anti-aliasing procedural, filtering, texture tanpa repetisi.
- `web/raymarchingdf.md`, `web/normalsSDF.md`, `web/rmshadows.md` — raymarching, normal tetrahedron, soft shadow.
- `web/gamma.md`, `web/premultipliedalpha.md` — kebenaran warna & alpha saat komposit.
