---
tool: PixiJS v8 (+ pixi-filters)
version: pixi.js 8.22.0 (rilis 2026-10-01; npm latest dicek 2026-10-28) · pixi-filters 6.1.5 (2025-11-28)
official: https://pixijs.com/8.x/guides · https://github.com/pixijs/pixijs · https://github.com/pixijs/filters
local: repo-pixijs/skills/ · repo-pixijs/src/filters/ · repo-pixijs.com/docs/guides/ · web/pixijs.com__llms-full.txt
fetched: 2026-10-28
---
# PixiJS v8 — renderer 2D GPU (WebGL2/WebGPU) untuk ribuan objek, filter distorsi/post-FX, mesh ribbon, dan feedback buffer

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai PixiJS kalau:**
- Canvas 2D yang isinya *banyak & hidup*: partikel 10k–1M (`ParticleContainer`), debu/serbuk yang bereaksi ke kursor, confetti, grid gambar infinite-drag.
- Distorsi gambar/teks berbasis tekstur: `DisplacementFilter` (air, lensa hover, kain), filter chain post-FX (`pixi-filters`: Shockwave, RGBSplit, Glitch, ZoomBlur, MotionBlur, AdvancedBloom, Godray, CRT, OldFilm…).
- Trail/ribbon yang mengikuti path (`MeshRope`), deformasi grid gambar (`MeshPlane`), feedback/echo trail via 2× `RenderTexture`.
- Kinetic type di canvas: `SplitText` / `SplitBitmapText` (v8.11+, experimental) + GSAP stagger.
- Butuh scene graph + event pointer (federated events, `globalpointermove`) + accessibility overlay bawaan.

**Jangan / pilih lain kalau:**
- Gambar DOM yang harus *nempel* ke layout & scroll otomatis → **Curtains.js / gpu-curtains** (sync DOM→plane bawaan). Di Pixi kamu ukur `getBoundingClientRect()` sendiri (lihat Integrasi).
- Satu full-screen shader tanpa scene graph, atau 3D beneran → **OGL** (lebih tipis) / Three.js. `PerspectiveMesh` Pixi cuma 2.5D tanpa depth buffer.
- Desainer tanpa koding → **Unicorn Studio** (embed). Efek teks shader ala Blotter → Pixi `SplitBitmapText` + filter jauh lebih terawat.
- Komputasi GPU (compute shader partikel jutaan) → WebGPU langsung / Three TSL; Pixi `ParticleContainer` tetap update posisi di **JS/CPU** (blog resmi: sengaja tidak memindah gerak ke GPU).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Loop**: `app.ticker` (rAF) memanggil listener urut prioritas `INTERACTION 50 > HIGH 25 > NORMAL 0 > LOW -25 > UTILITY -50`; `app.render()` didaftarkan TickerPlugin di **LOW** → semua update di NORMAL selesai sebelum frame digambar. Per-objek ada `container.onRender = () => {}` (dipanggil saat traversal, sebelum GPU).
- **Matematika waktu (Ticker.ts, terverifikasi)**: `elapsedMS` = selisih mentah; `deltaMS = min(elapsedMS, 100) * speed` (cap 100 ms = `minFPS` default 10); `deltaTime = deltaMS * 0.06` (`Ticker.targetFPMS`) → **1.0 di 60fps, 0.5 di 120Hz, max 6×speed**. `speed` men-scale `deltaMS/deltaTime` tapi **tidak** `elapsedMS`. Konsekuensi: kalau `uTime` shader digerakkan pakai `elapsedMS` (seperti contoh shader-toy resmi), slow-mo global `ticker.speed = 0.3` tidak ikut melambat — pakai `deltaMS`.
- **Render group** (`new Container({ isRenderGroup: true })` / `enableRenderGroup()`): transform grup di-apply di GPU sekali; anak cuma hitung `localTransform`/`groupTransform`. Root yang di-render otomatis render group. Tiap grup = instruction set sendiri → tidak bisa batch lintas grup → pakai di level kasar (world, HUD, strip parallax), bukan per-entity.
- **Batching**: sprite dengan ≤16 tekstur per batch (tergantung hardware) jadi satu draw call; selang-seling tipe (sprite/graphics/sprite) dan ganti blend mode memecah batch. Mesh dengan custom shader selalu draw sendiri.
- **Filter = render-to-texture**: subtree dirender ke tekstur pool (`TexturePool`) → quad fullscreen per pass → komposit. Biaya ∝ luas piksel × jumlah pass. Sejak **8.21** tekstur pool di-cap ke ukuran layar (dulu dibulatkan ke power-of-two: HP 1170×2532 dapat 2048×4096) → upgrade ≥8.21 kalau pakai filter fullscreen di mobile.
- **`Filter.defaultOptions.resolution = 1`** (bukan DPR!) → filter di layar retina dirender 1× lalu di-upscale = sedikit lembut. Untuk blur/bloom itu bonus (murah); untuk displacement yang harus tajam pakai `resolution: 'inherit'` (4× piksel di DPR2).
- **Uniform filter global** (FilterSystem.ts `_updateFilterUniforms`): `uInputSize = (texW, texH, 1/texW, 1/texH)` dari tekstur input (bisa lebih besar dari frame), `uOutputFrame.zw = (frameW, frameH)`, `uInputClamp` = batas UV valid (setengah texel ke dalam), `uGlobalFrame` = offset & ukuran root × resolution, `uOutputTexture` dipakai vertex. Artinya **`vTextureCoord` BUKAN 0..1 atas objek**; UV ternormalisasi = `vTextureCoord * uInputSize.xy / uOutputFrame.zw`; 1 px = `uInputSize.zw`.
- **Displacement (displacement.frag, terverifikasi)**: `offset = uInputSize.zw * (uRotation * (map.rg - 0.5)) * uScale` → offset dalam **piksel**: warna peta netral `#808080` (0.5,0.5) = diam, nilai ekstrem 0/1 = geser ±`scale/2` px. Peta dibaca lewat `worldTransform` sprite peta (`uFilterMatrix`, `calculateSpriteMatrix` memperhitungkan anchor) → **gerakkan/scale/rotasi sprite peta = animasi distorsi**, rotasinya juga memutar arah offset (`uRotation`).
- **Graphics**: bentuk di-tessellate jadi segitiga sekali. `clear()`+redraw tiap frame = tessellate ulang (CPU) → swap `GraphicsContext` yang sudah jadi (`g.context = frames[i]`, "very cheap").
- **ParticleContainer**: satu draw call; properti `dynamicProperties` di-upload ulang tiap frame, sisanya static (ubah static → `container.update()`). Default: hanya `position` dinamis. Partikel = struct datar (`x,y,scaleX,scaleY,anchorX,anchorY,rotation,color,texture`), satu base texture (atlas OK), tanpa filter per partikel.
- **Alpha premultiplied** di jalur filter: `noise.frag` resmi meng-unpremultiply sebelum ubah warna lalu premultiply lagi → tiru pola ini di filter warna kustom.
- **GLSL preprocessing (GlProgram + addProgramDefines.ts)**: tanpa `#version 300 es` shader dikompilasi sebagai GLSL ES 1.00 dengan macro `#define in varying`, `#define texture texture2D`, `#define finalColor gl_FragColor` (baris `out vec4 finalColor;` dihapus otomatis) → gaya ES3 (`in`, `texture()`, `finalColor`) jalan di dua mode. Dengan `#version 300 es` di fragment → mode ES3 murni. `GlProgram` **tidak** menyuntik vertex default: selalu kirim `vertex` (pakai `defaultFilterVert` yang diekspor `pixi.js`).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

```ts
import { Application, Assets, Sprite, Container } from 'pixi.js';

const app = new Application();                 // constructor TANPA argumen (opsi di sini diabaikan + warning)
await app.init({
  resizeTo: window,                            // ResizePlugin hanya listen 'resize' milik window (lihat catatan)
  resolution: Math.min(window.devicePixelRatio, 2),
  autoDensity: true,                           // unit stage = CSS px (penting buat sync ke DOM)
  antialias: false,                            // MSAA hanya kalau ada garis vektor tipis
  backgroundAlpha: 0,                          // TIDAK bisa diubah setelah init (alokasi canvas ber-alpha)
  preference: 'webgl',                         // default; bisa array ['webgpu','webgl'] (8.18+)
  powerPreference: 'high-performance',         // diteruskan ke WebGL ctx / requestAdapter
});
document.body.appendChild(app.canvas);        // v8: app.canvas (app.view deprecated)

const tex = await Assets.load('/img/hero.jpg'); // v8: Texture.from(url) tidak lagi memuat; load dulu
const world = new Container({ isRenderGroup: true });
world.addChild(new Sprite(tex));
app.stage.addChild(world);

app.ticker.add((ticker) => {                   // v8: argumen = Ticker, BUKAN delta number
  world.rotation += 0.002 * ticker.deltaTime;
});

// Cleanup (Barba/Swup leave, unmount React): global pools ikut dibuang
app.destroy(
  { removeView: true, releaseGlobalResources: true },
  { children: true, texture: true, textureSource: true },
);
```

- `app.renderer`, `app.canvas`, `app.screen` baru ada setelah `init()` resolve.
- `app.start()` / `app.stop()` = start/stop ticker (dari TickerPlugin). `autoStart: false` → kamu panggil `app.ticker.update(time)` + `app.render()` sendiri.
- `resizeTo: element` tetap cuma bereaksi ke `window.resize` (ResizePlugin.ts: `globalThis.addEventListener('resize', …)`, baca `clientWidth/Height`). Elemen berubah ukuran tanpa resize window → panggil `app.resize()` dari `ResizeObserver` sendiri. `app.queueResize()` = defer ke frame berikutnya.
- Override per renderer: `webgl: { useBackBuffer: true }`, `webgpu: { … }`, `canvasOptions: { … }` di-merge di atas opsi top-level hanya untuk renderer terpilih.
- Uniform type string: `f32`, `i32`, `vec2<f32>` (`Float32Array(2)` / `[x,y]` / `{x,y}`), `vec3<f32>`, `vec4<f32>`, `mat3x3<f32>` (`Matrix` OK), `mat4x4<f32>`.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Default | Efek ke feel | Rentang / patokan |
|---|---|---|---|
| `ticker.speed` | 1 | slow-mo/fast-forward global semua logika berbasis `deltaMS/deltaTime` | 0.2–0.5 untuk "bullet time" saat hover/klik (tween balik ke 1) |
| `ticker.maxFPS` | 0 (off) | cap frame; skip update | 30 untuk background ambient → hemat baterai |
| `ticker.minFPS` | 10 | cap `deltaMS` ≤ 100 ms → tidak ada "lompatan" setelah tab kembali aktif | biarkan |
| Damping `1 - Math.pow(1 - k, ticker.deltaTime)` | — | lerp yang sama rasanya di 60/120 Hz (deltaTime = frame @60fps) | k 0.08 (berat, mewah) – 0.25 (snappy) |
| `DisplacementFilter.scale` | 20 (px, efektif ±scale/2) | kekuatan distorsi | contoh resmi: 50 (air fishPond), {x:60,y:120} (bendera), 150 (lensa hover) |
| skala/posisi sprite peta displacement | sprite-mu | scale besar = frekuensi rendah (gelombang lebar); geser per frame = aliran | contoh bendera: `x++` per frame + `addressMode='repeat'` |
| `Filter.resolution` | 1 | 0.5 = blur/bloom murah & lembut; `'inherit'` = tajam di retina | blur/glow 0.5; displacement/RGB-split `'inherit'` |
| `Filter.padding` | 0 | ruang ekstra agar efek yang keluar bounds tidak terpotong | ≥ offset maks (displacement: ~scale/2) |
| `BlurFilter({ strength, quality, kernelSize })` | 8 / 4 / 5 (BlurFilter.ts) | `kernelSize` ganjil 5–15; `repeatEdgePixels:true` untuk fullscreen | strength 2–8 untuk depth-of-field UI; tween strength = rack focus |
| `ShockwaveFilter` | speed 500 px/s, amplitude 30, wavelength 160, brightness 1, radius -1 (∞), `time` detik | gelombang kejut klik/beat | demo resmi: speed 500–2000, amplitude 1–100, wavelength 2–400, radius 100–2000 |
| `RGBSplitFilter` | red {-10,0}, green {0,10}, blue {0,0} (px) | aberasi kromatik | ikat ke kecepatan scroll/drag, 0–15 px |
| `ZoomBlurFilter` | strength 0.1, center px, innerRadius 0, radius -1, maxKernelSize 32 | dash/warp ke titik | strength 0.05–0.3 saat transisi masuk |
| `MotionBlurFilter` | velocity {0,0}, kernelSize 5 (ganjil ≥5), offset 0 | blur searah gerak | isi `velocity` = delta posisi objek per frame |
| `GlitchFilter` | slices 5, offset 100, direction 0, seed 0 | potongan horizontal | demo: `seed = Math.random()` per frame/beat; `refresh()` acak ulang slice |
| `AdvancedBloomFilter` | threshold .5, bloomScale 1, brightness 1, blur 8, quality 4 | glow highlight | threshold .6–.8 biar hanya highlight yang mekar |
| `BulgePinchFilter` | center {.5,.5} (**ternormalisasi**), radius 100 px, strength 1 (-1 pinch … 1 bulge) | lensa cembung/cekung | hover magnifier: strength 0.2–0.5 |
| `TwistFilter` | radius 200, angle 4, offset {0,0}, padding 20 | pusaran | angle di-tween 0→4→0 untuk transisi |
| `GodrayFilter` | angle 30, gain .5, lacunarity 2.5, parallel true, time 0 | sinar volumetrik | `time += deltaMS/1000` |
| `SimplexNoiseFilter` | strength .5, noiseScale 10, offsetX/Y/Z 0, step -1 | noise overlay hidup | animasikan `offsetZ` (evolusi), `step>0` = blok |
| `CRTFilter` / `OldFilmFilter` | lihat DEFAULT_OPTIONS (vignetting .3, noise…) | tekstur analog | demo: `seed = Math.random()` per frame |
| `MeshPlane({ verticesX, verticesY })` | 10 × 10 | kehalusan deformasi | 20–30 untuk gelombang; >50×50 mulai berat di device lemah |
| `MeshRope({ textureScale, width })` | — | `textureScale:0` = stretch, `>0` = repeat; `width` (8.18+) = tebal | contoh trail: history 20 titik, rope 100 titik |
| `ParticleContainer.dynamicProperties` | `{ position:true }` lain false | tiap flag dinamis = upload ulang tiap frame | nyalakan hanya yang dianimasikan (`rotation`, `color`…) |
| `container.origin` (8.11, experimental) | (0,0) | rotasi/scale di sekitar titik **tanpa** menggeser posisi (beda dari `pivot`) | hover tilt/pop kartu di tengah |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

- **GSAP (contoh resmi `examples/gsap_*.ts`)**: tween langsung properti Pixi — `gsap.to(sprite, { x, alpha })`, `gsap.to(sprite.scale, { x: 1.2, y: 1.2 })`, `gsap.to(displacementFilter.scale, { x: 0, y: 0 })` (Point biasa), `gsap.to(shockwave, { time: 1 })`. `PixiPlugin`: `gsap.registerPlugin(PixiPlugin)` lalu `pixi: { scaleX, scaleY }`. Throw/tactile: `InertiaPlugin` dengan `inertia: { x: { velocity: deltaX * 30, end: 0 } }` (gsap_interaction_inertia.ts). Uniform filter non-static di-upload tiap frame → tween nilainya langsung tanpa `update()`.
- **Satu loop (hindari 2 rAF yang urutannya tak dijamin)**: `await app.init({ autoStart: false })` lalu dari loop master panggil `app.ticker.update(time)` (signature `update(currentTime = performance.now())`, timebase sama dengan timestamp rAF) + `app.render()`. Contoh dengan GSAP: `gsap.ticker.add(() => { app.ticker.update(); app.render(); })`; dengan Lenis: di fungsi rAF `lenis.raf(time); app.ticker.update(time); app.render();` — API `gsap.ticker`/`lenis.raf` **[UNVERIFIED di folder ini — cek mirror GSAP/Lenis di kategori 01/03]**; sisi Pixi terverifikasi.
- **Scroll-velocity → shader**: simpan `velocity` dari smooth-scroller (px/frame) ke variabel, lalu di `app.ticker` haluskan dengan damping fps-independent dan tulis ke uniform (Resep 2). Jangan tulis uniform langsung di callback scroll (bisa >1×/frame).
- **DOM → Pixi (pengganti Curtains)**: canvas `position: fixed; inset: 0` + `autoDensity: true` (1 unit = 1 CSS px). Ukur sekali saat resize: `docTop = rect.top + scrollY`, `docLeft = rect.left + scrollX`, `sprite.width/height = rect.width/height`; per frame cukup `sprite.position.set(docLeft - scrollX, docTop - scrollY)` (atau nilai scroll Lenis). Jangan `getBoundingClientRect()` per frame per elemen (layout thrash). Elemen asli `visibility: hidden` tapi tetap untuk SEO/a11y.
- **DOM di atas scene**: `DOMContainer` (8.9) menempel elemen HTML ke node scene (`app.domContainerRoot`). **HTML-in-Canvas** (`import { HTMLSource } from 'pixi.js/html-source'`, 8.19) merender DOM *hidup* jadi tekstur — butuh flag browser (Chrome, proposal WICG), elemen harus anak langsung `app.canvas`; feature-detect `canvas.requestPaint`. Eksperimental — jangan untuk produksi.
- **Three.js / R3F berbagi context** (guide `third-party/mixing-three-and-pixi.mdx`): `pixiRenderer.init({ context: threeRenderer.getContext(), clearBeforeRender: false })`; tiap frame `threeRenderer.resetState(); threeRenderer.render(...); pixiRenderer.resetState(); pixiRenderer.render({ container: stage })`.
- **React**: `@pixi/react` v8 (React 19): `<Application>` + JSX ber-prefix `pixi` (`<pixiSprite/>`, `<pixiGraphics draw={…}/>`). Hook lain (`extend`, `useTick`) **[UNVERIFIED — tidak ada di mirror]**.
- **Barba/Swup**: lebih baik canvas persisten di luar container yang di-swap (tanpa biaya re-init); kalau harus re-init, `app.destroy({ releaseGlobalResources: true })` — tanpa itu pool lama bocor → flicker/tekstur basi.
- **Kinetic type**: `new SplitBitmapText({ text, style })` → `text.chars` / `text.words` / `text.lines` adalah display object → `gsap.from(char, { alpha: 0, delay: i * 0.05 })`. Anchor per level: `lineAnchor`, `wordAnchor`, `charAnchor`.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

Semua resep mengasumsikan `app` sudah `init` seperti di Setup (`autoDensity: true`).

**1) Lensa hover cair — DisplacementFilter yang kekuatannya ikut kecepatan kursor**
```ts
import { Assets, Sprite, DisplacementFilter } from 'pixi.js';
const photo = new Sprite(await Assets.load('/img/photo.jpg'));
const map = await Assets.load('/img/lens-map.png');   // radial RG, TEPI = #808080 (netral)
map.source.addressMode = 'clamp-to-edge';
const lens = new Sprite(map); lens.anchor.set(0.5);
app.stage.addChild(photo, lens);           // WAJIB di scene graph: tanpa parent, worldTransform tak update
const fx = new DisplacementFilter({ sprite: lens, scale: 0, resolution: 'inherit' }); // lens.renderable=false otomatis
photo.filters = [fx];

let tx = 0, ty = 0, px = 0, py = 0;
app.stage.eventMode = 'static'; app.stage.hitArea = app.screen;
app.stage.on('globalpointermove', (e) => { tx = e.global.x; ty = e.global.y; });
app.ticker.add((t) => {
  const k = 1 - Math.pow(1 - 0.16, t.deltaTime);
  lens.x += (tx - lens.x) * k; lens.y += (ty - lens.y) * k;
  const speed = Math.min(Math.hypot(lens.x - px, lens.y - py) / Math.max(t.deltaTime, 1e-3), 40);
  px = lens.x; py = lens.y;
  const target = 20 + speed * 4;           // diam ≈ 20 px, ngebut ≈ 180 px
  fx.scale.x += (target - fx.scale.x) * k; fx.scale.y = fx.scale.x;
  lens.scale.set(1 + speed * 0.015);       // lensa melebar saat cepat
});
```
Kenapa mahal: distorsi bereaksi ke *kecepatan*, bukan posisi — gambar terasa punya massa & viskositas, lalu "mengendap" saat kursor berhenti.

**2) Scroll-velocity RGB shift + noise warp — custom Filter v8 (GLSL)**
```ts
import { Filter, GlProgram, defaultFilterVert } from 'pixi.js';
const fragment = `precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
uniform vec4 uInputSize;   // xy = ukuran tekstur input px, zw = 1/size
uniform vec4 uInputClamp;  // batas UV valid
uniform vec4 uOutputFrame; // zw = ukuran area filter px
uniform float uTime; uniform float uShift; uniform float uWarp; uniform vec2 uDir;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p), u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x), u.y); }
vec4 tap(vec2 uv){ return texture(uTexture, clamp(uv, uInputClamp.xy, uInputClamp.zw)); }
void main(){
  vec2 nuv = vTextureCoord * uInputSize.xy / uOutputFrame.zw;   // 0..1 di area filter
  vec2 px  = uInputSize.zw;                                     // 1 px dalam UV
  float n  = vnoise(vec2(nuv.x * 3.0, nuv.y * 8.0 - uTime * 0.8)) - 0.5;
  vec2 uv  = vTextureCoord + uDir.yx * n * uWarp * px;          // warp tegak lurus arah gerak
  vec2 o   = uDir * uShift * px;
  vec4 c   = tap(uv);
  finalColor = vec4(tap(uv + o).r, c.g, tap(uv - o).b, c.a);    // alpha dari tengah (pola RGBSplit resmi)
}`;
const fx = new Filter({
  glProgram: GlProgram.from({ vertex: defaultFilterVert, fragment, name: 'scroll-rgb-warp' }),
  resources: { fx: {
    uTime: { value: 0, type: 'f32' }, uShift: { value: 0, type: 'f32' },
    uWarp: { value: 0, type: 'f32' }, uDir: { value: new Float32Array([0, 1]), type: 'vec2<f32>' },
  } },
});
gallery.filters = [fx];
gallery.filterArea = app.screen;                 // skip pengukuran bounds per frame
const u = fx.resources.fx.uniforms;
let scrollVel = 0;                               // isi dari smooth-scroller (px/frame)
app.ticker.add((t) => {
  u.uTime += t.deltaMS / 1000;                   // ikut ticker.speed
  const k = 1 - Math.pow(1 - 0.12, t.deltaTime), v = Math.min(Math.abs(scrollVel), 60);
  u.uShift += (v * 0.35 - u.uShift) * k;
  u.uWarp  += (v * 0.6  - u.uWarp)  * k;
  fx.enabled = u.uShift > 0.05;                  // diam = tanpa pass filter sama sekali
});
```
Catatan: string fragment dimulai langsung dengan `precision` (ensurePrecision.ts cek 9 karakter pertama) supaya `uInputSize` highp sama dengan vertex (aturan GLSL ES: uniform VS/FS harus sama precision; `displacement.frag` resmi menulis `uniform highp vec4 uInputSize`). Hanya `glProgram` → filter dilewati di WebGPU; pakai `preference: 'webgl'` atau tambah `gpuProgram` (template WGSL: `src/filters/defaults/noise/noise.wgsl`, entry `mainVertex`/`mainFragment`, `@group(0)` = global filter uniforms + `uTexture` + `uSampler`, `@group(1)` = uniform kamu).
Kenapa mahal: aberasi & warp hanya muncul saat *bergerak* dan meluruh dengan damping → konten terasa "melar" oleh inersia scroll, bukan efek statis yang murahan.

**3) Feedback/echo trail — ping-pong 2× RenderTexture**
```ts
import { RenderTexture, Sprite, Container } from 'pixi.js';
const W = app.screen.width, H = app.screen.height;
let rtA = RenderTexture.create({ width: W, height: H });
let rtB = RenderTexture.create({ width: W, height: H });
const echo = new Sprite(rtA); echo.anchor.set(0.5); echo.position.set(W / 2, H / 2);
const live = new Container();                    // blob kursor, partikel, teks…
const loopRoot = new Container(); loopRoot.addChild(echo, live); // TIDAK masuk app.stage
const display = new Sprite(rtB); app.stage.addChild(display);

app.ticker.add((t) => {
  echo.texture = rtA;
  echo.alpha = Math.pow(0.92, t.deltaTime);      // decay per detik konsisten di 60/120 Hz
  echo.scale.set(1.004); echo.rotation = 0.002;  // smear keluar + spiral halus
  app.renderer.render({ container: loopRoot, target: rtB, clear: true });
  display.texture = rtB;
  [rtA, rtB] = [rtB, rtA];                       // jangan pernah baca & tulis RT yang sama
});
// resize: rtA.resize(w, h); rtB.resize(w, h);
```
Kenapa mahal: frame lama "diingat" lalu dideformasi sedikit demi sedikit → jejak organik ala video feedback analog, padahal biayanya cuma satu render tambahan.

**4) Ribbon trail kursor — MeshRope + interpolasi kubik (dari `examples/mesh_mouse-trail.ts`)**
```ts
import { Assets, MeshRope, Point } from 'pixi.js';
const HIST = 20, ROPE = 100, hx = Array(HIST).fill(0), hy = Array(HIST).fill(0);
const points = Array.from({ length: ROPE }, () => new Point());
const rope = new MeshRope({ texture: await Assets.load('/img/trail.png'), points, textureScale: 0 });
rope.blendMode = 'add';
app.stage.addChild(rope);
let m = null;
app.stage.eventMode = 'static'; app.stage.hitArea = app.screen;
app.stage.on('globalpointermove', (e) => { m = { x: e.global.x, y: e.global.y }; });
const clip = (k, a) => a[Math.max(0, Math.min(a.length - 1, k))];
const tan = (k, a) => (clip(k + 1, a) - clip(k - 1, a)) / 2;
const cubic = (a, t) => { const k = Math.floor(t), f = t - k, f2 = f * f, f3 = f2 * f;
  return (2*f3 - 3*f2 + 1) * clip(k, a) + (f3 - 2*f2 + f) * tan(k, a) + (-2*f3 + 3*f2) * clip(k + 1, a) + (f3 - f2) * tan(k + 1, a); };
app.ticker.add(() => {
  if (!m) return;
  hx.pop(); hx.unshift(m.x); hy.pop(); hy.unshift(m.y);
  for (let i = 0; i < ROPE; i++) { const t = (i / ROPE) * HIST; points[i].set(cubic(hx, t), cubic(hy, t)); }
});
```
Kenapa mahal: Hermite spline mengubah 20 sampel kursor yang patah-patah jadi pita mulus dengan blend `add` — terasa seperti cahaya, bukan garis.

**5) Debu reaktif 20k partikel — ParticleContainer + spring kembali ke "rumah"**
```ts
import { Assets, ParticleContainer, Particle, Rectangle } from 'pixi.js';
const dot = await Assets.load('/img/dot.png');   // SATU tekstur/atlas untuk semua partikel
const N = 20000, home = new Float32Array(N * 2), vel = new Float32Array(N * 2);
const particles = Array.from({ length: N }, (_, i) => {
  const x = Math.random() * app.screen.width, y = Math.random() * app.screen.height;
  home[i * 2] = x; home[i * 2 + 1] = y;
  return new Particle({ texture: dot, x, y, anchorX: 0.5, anchorY: 0.5, alpha: 0.3 + Math.random() * 0.7 });
});
const pc = new ParticleContainer({
  texture: dot, particles,                        // via constructor: tanpa update per-add
  boundsArea: new Rectangle(0, 0, app.screen.width, app.screen.height), // tanpa ini bounds = 0 → ter-cull
  dynamicProperties: { position: true },          // alpha/scale static (diset sekali)
});
app.stage.addChild(pc);
let mx = -1e4, my = -1e4;
app.stage.eventMode = 'static'; app.stage.hitArea = app.screen;
app.stage.on('globalpointermove', (e) => { mx = e.global.x; my = e.global.y; });
app.ticker.add((t) => {
  const dt = t.deltaTime, R2 = 120 * 120, damp = Math.pow(0.86, dt), ps = pc.particleChildren;
  for (let i = 0; i < N; i++) {
    const p = ps[i], j = i * 2, dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
    if (d2 < R2) { const f = (1 - d2 / R2) * 2.5 / Math.sqrt(d2 + 1); vel[j] += dx * f * dt; vel[j + 1] += dy * f * dt; }
    vel[j] += (home[j] - p.x) * 0.02 * dt; vel[j + 1] += (home[j + 1] - p.y) * 0.02 * dt;
    vel[j] *= damp; vel[j + 1] *= damp;
    p.x += vel[j] * dt; p.y += vel[j + 1] * dt;
  }
});
```
Kenapa mahal: setiap butir punya pegas + gesekan sendiri → kursor "membelah" medan lalu medan pulih dengan sedikit overshoot, terasa fisik bukan sekadar parallax.

**6) Shockwave klik dengan siklus hidup filter (pixi-filters)**
```ts
import { ShockwaveFilter } from 'pixi-filters/shockwave';
let waves = [];
app.stage.on('pointertap', (e) => {
  const w = new ShockwaveFilter({ center: { x: e.global.x, y: e.global.y }, // px relatif input filter
    speed: 900, amplitude: 22, wavelength: 140, radius: 900, brightness: 1.08 });
  waves = [...waves, w]; world.filters = waves;   // assign ulang array, jangan mutasi in-place
  const tick = (t) => {
    w.time += t.deltaMS / 1000;
    w.amplitude *= Math.pow(0.96, t.deltaTime);   // energi meluruh
    if (w.time > 1.1) { app.ticker.remove(tick); waves = waves.filter((f) => f !== w);
      world.filters = waves.length ? waves : null; w.destroy(); }
  };
  app.ticker.add(tick);
});
```
Kenapa mahal: gelombang merambat dengan kecepatan nyata (px/s) dan kehilangan energi — klik terasa punya *impact*; filter dilepas begitu selesai jadi idle cost nol.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

**Performa**
- Cap DPR: `resolution: Math.min(devicePixelRatio, 2)`; `resolution: 2` = 4× piksel, di mobile bisa memotong FPS setengah (skill performance). `antialias: false` kalau konten foto/bitmap; `backgroundAlpha: 1` (opaque) lebih cepat.
- Filter: set `filterArea` kalau bounds diketahui; `filters = null` untuk lepas memori; `filter.enabled = false` saat idle (FilterSystem skip kalau semua disabled); satu filter di parent jauh lebih murah dari filter per anak; blur fullscreen `repeatEdgePixels: true`. `blendRequired: true` = copy GPU ekstra tiap frame dan di WebGL butuh `useBackBuffer: true` (WebGPU selalu punya back buffer).
- Mask: rectangle axis-aligned (scissor) < Graphics (stencil) < Sprite mask (lewat filter — mahal).
- Graphics: jangan `clear()`+redraw per frame; swap `GraphicsContext`; Graphics ≤~100 titik ikut batch seperti sprite; bentuk kompleks statis → `cacheAsTexture(true | { resolution, antialias, scaleMode })`, refresh `updateCacheTexture()`, **matikan `cacheAsTexture(false)` sebelum destroy**.
- Culling opt-in: `extensions.add(CullerPlugin)` sebelum init + `cullable = true`/`cullArea`; untung saat GPU-bound, rugi saat CPU-bound.
- GC terpadu (8.15+): `gcActive` true, `gcMaxUnusedTime` 60000 ms, `gcFrequency` 30000 ms. Destroy banyak tekstur sekaligus → freeze; cicil per frame. Tekstur >4096 px gagal di sebagian GPU mobile. Teks yang berubah tiap frame → `BitmapText`.
- **Pause**: Pixi tidak punya handler `visibilitychange` (grep src: nihil). rAF memang berhenti di tab background dan `minFPS` meng-cap delta saat kembali. Untuk canvas yang di-scroll keluar viewport: `IntersectionObserver` → `app.stop()` / `app.start()`. `ticker.maxFPS = 30` untuk scene ambient.
- WebGPU khusus: render bundle, `transient: true` MSAA RT (8.19/8.22), partial `buffer.update(bytes, offset)` (8.20) — fitur lanjut, lihat `skills/pixijs-custom-rendering`.
- CSP ketat tanpa `unsafe-eval` → `import 'pixi.js/unsafe-eval'` sekali di startup (UBO/WebGPU melempar error tanpa ini).

**Aksesibilitas & reduced motion**
- Tidak ada flag reduced-motion bawaan (tidak ditemukan di docs/skills lokal). Pola: `const reduce = matchMedia('(prefers-reduced-motion: reduce)')` → matikan FX bergerak (`fx.enabled = false`, jangan pasang shockwave/feedback), atau render satu frame statis lalu `app.stop()`; dengarkan `reduce.addEventListener('change', …)`.
- Glitch/CRT/strobe: jaga di bawah 3 kilatan/detik (rujukan: `../../_shared/mdn-content/files/en-us/web/accessibility/guides/seizure_disorders/index.md`); jangan acak `seed` tiap frame dengan kontras tinggi lama-lama.
- Konten canvas tak terbaca screen reader: `AccessibilitySystem` (`obj.accessible = true`, `accessibleTitle`, `accessibleHint`, `tabIndex`) membuat overlay DOM bayangan; aktif setelah Tab kecuali `enabledByDefault: true`. Untuk galeri DOM-sync, tetap pertahankan `<img alt>` asli di DOM.

**Mobile & dukungan browser**
- Default renderer **WebGL2** (`preferWebGLVersion: 2`, WebGL1 = fallback legacy). Docs resmi: WebGL "Recommended" untuk produksi; **WebGPU "feature complete" tapi experimental** (inkonsistensi antar browser). Pakai `preference: ['webgpu', 'webgl']` — array yang tidak memuat `'webgl'` gagal init di browser tanpa WebGPU. Cek `await isWebGPUSupported()`; `app.renderer.name` = `'webgl' | 'webgpu' | 'canvas'`.
- Status WebGPU per browser (snapshot 2026-10): Chrome/Edge 113+ desktop, Android 12+ (121+), Firefox 141 Windows & 145/147 macOS, Safari 26 (macOS/iOS/iPadOS/visionOS) — sumber `../webgpu/web/gpuweb-implementation-status.md`.
- **Canvas renderer** (8.16, fallback otomatis kalau WebGL/WebGPU tak ada): tanpa filter, tanpa custom shader, mask terbatas → semua FX shader-mu *hilang diam-diam*; desain fallback statis yang tetap bagus.
- Context loss: WebGL renderer pulih setelah `webglcontextrestored`; WebGPU minta device baru saat `GPUDevice.lost` dan rebuild di render berikutnya.
- Event pointer: `eventMode: 'static'` + `hitArea`; `globalpointermove` untuk tracking di luar objek; `interactiveChildren = false` di container tanpa anak interaktif.

**Gotcha v8 (migrasi)**: `new Application(opts)` → `app.init(opts)`; ticker callback `(ticker) =>`; `beginFill/drawRect/endFill` → `rect().fill()`; `lineStyle` → `.stroke({ width, color })`; `beginHole` → `.cut()`; `cacheAsBitmap` → `cacheAsTexture()`; `name` → `label`; `updateTransform` → `onRender`; `WRAP_MODES.REPEAT` / `baseTexture.wrapMode` → `texture.source.addressMode = 'repeat'` (contoh flag & tutorial fishPond resmi masih pakai cara lama yang deprecated); `ParticleContainer` tidak menerima `Sprite` (`addParticle(new Particle(...))`, anak ada di `particleChildren`); filter komunitas: `pixi-filters/<nama>` (bukan `@pixi/filter-*`).
- Klaim skill resmi "`Filter.from` cukup fragment, vertex default disediakan" **tidak didukung source** (`GlProgram`/`GpuProgram` tidak punya fallback vertex; semua filter bawaan & contoh resmi mengirim vertex) → selalu kirim `vertex: defaultFilterVert`.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `repo-pixijs/skills/pixijs-application/SKILL.md` + `references/application-options.md` — semua opsi `app.init` (default, efek, per-renderer override, GC).
- `repo-pixijs/skills/pixijs-ticker/SKILL.md` — deltaTime/deltaMS/elapsedMS, prioritas, maxFPS/minFPS, loop manual.
- `repo-pixijs/skills/pixijs-filters/SKILL.md` — filter bawaan, opsi Filter, advanced blend modes, kesalahan umum.
- `repo-pixijs/skills/pixijs-custom-rendering/SKILL.md` + `references/uniform-types.md` — Shader.from, UniformGroup/UBO, tekstur sebagai resource, uBackTexture.
- `repo-pixijs/skills/pixijs-scene-particle-container/SKILL.md` — API Particle/ParticleContainer lengkap + batasan.
- `repo-pixijs/skills/pixijs-scene-graphics/SKILL.md` — Graphics v8 chainable, GraphicsContext sharing, FillGradient, svg().
- `repo-pixijs/skills/pixijs-scene-mesh/SKILL.md` + `references/mesh-plane.md`, `references/mesh-rope.md` — deformasi grid & rope.
- `repo-pixijs/skills/pixijs-performance/SKILL.md` — batching, cacheAsTexture, culling, GC, biaya filter/mask, WebGPU low-level.
- `repo-pixijs/skills/pixijs-scene-core-concepts/references/render-groups.md` — kapan render group menang/kalah.
- `repo-pixijs/skills/pixijs-core-concepts/references/renderers.md` — status WebGPU/WebGL/Canvas, preference array, context loss.
- `repo-pixijs/skills/pixijs-html-source/SKILL.md` — HTML-in-Canvas (eksperimental) + feature detection.
- `repo-pixijs/skills/pixijs-migration-v8/SKILL.md` — semua breaking change v7→v8.
- `repo-pixijs/src/filters/defaults/defaultFilter.vert` — konvensi vertex filter (aPosition, uOutputFrame, uOutputTexture).
- `repo-pixijs/src/filters/FilterSystem.ts` — `_updateFilterUniforms` (arti uInputSize/uInputClamp/uGlobalFrame) & `calculateSpriteMatrix`.
- `repo-pixijs/src/filters/defaults/displacement/DisplacementFilter.ts` + `displacement.frag` — rumus offset piksel & rotasi peta.
- `repo-pixijs/src/filters/defaults/noise/NoiseFilter.ts` + `noise.wgsl` — template filter dual GLSL/WGSL (bind group layout).
- `repo-pixijs/src/ticker/Ticker.ts` — matematika update (cap 100 ms, speed, targetFPMS 0.06).
- `repo-pixijs/src/rendering/renderers/gl/shader/program/preprocessors/addProgramDefines.ts` — macro kompat ES1 (`finalColor`, `in`, `texture`).
- `repo-pixijs/src/app/ResizePlugin.ts` — resizeTo hanya mendengar window resize.
- `repo-pixijs/examples/filters_displacement.ts` · `filters_displacement_interactive.ts` — peta repeat bergerak & lensa kursor (scale 150).
- `repo-pixijs/examples/filters_custom-shader_glsl/` — custom Filter + GlProgram + uTime.
- `repo-pixijs/examples/rendering_render-texture_buffer.ts` — ping-pong RenderTexture (feedback).
- `repo-pixijs/examples/mesh_mouse-trail.ts` · `mesh_multipass_shader_effects/` · `mesh_shader-toy/` — rope trail, multipass ke RT, fullscreen shader Mesh.
- `repo-pixijs/examples/gsap_interaction_inertia.ts` · `gsap_animation_physics_particles.ts` — InertiaPlugin & PixiPlugin.
- `repo-pixijs.com/docs/guides/components/filters.md` — guide filter + vertex default lengkap.
- `repo-pixijs.com/docs/guides/components/scene-objects/graphics/index.md` — pola swap GraphicsContext.
- `repo-pixijs.com/docs/guides/concepts/performance-tips.md` · `render-loop.md` · `render-groups.md` — konsep resmi.
- `repo-pixijs.com/docs/guides/third-party/mixing-three-and-pixi.mdx` — berbagi context dengan Three.
- `repo-pixijs.com/blog/2024-10-03-pixi-v8-particle-container.md` — angka resmi: Sprite+Container 200k @60fps vs ParticleContainer 1.000.000 @60fps, >3× v7 (mesin tidak disebut).
- `repo-pixijs.com/blog/2026-06-12-pixi-june-update.mdx` — HTML-in-Canvas, SVG export, agent skills (8.18/8.19).
- `repo-pixijs.com/src/tutorials/v8.0.0/fishPond/step5/` — displacement air fullscreen (scale 50).
- `repo-filters/README.md` — daftar 37 filter + import path; `repo-filters/src/<nama>/<Nama>Filter.ts` — DEFAULT_OPTIONS & setter.
- `repo-filters/examples/src/filters/*.mjs` — cara animasi tiap filter di demo resmi + rentang GUI.
- `web/pixijs.com__llms-full.txt` — semua guide + API reference lengkap (grep, jangan baca utuh).
- `web/github-releases-pixijs.md` — release notes v8.8 → v8.22 (perubahan API 2025–2026).
