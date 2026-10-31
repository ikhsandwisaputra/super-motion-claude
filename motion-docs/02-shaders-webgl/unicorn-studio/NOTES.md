---
tool: Unicorn Studio (editor + runtime SDK unicornstudio.js)
version: SDK v2.4.3 (tag 2026-10-16; README + GitHub releases + semua snippet docs pin @v2.4.3) · unicornstudio-react 2.4.0 (npm, wrapper komunitas yang direkomendasikan docs) · editor changelog terakhir 2026-10-07 (Scroll Timeline, butuh SDK ≥2.4.0) — dicek 2026-10-28
official: https://www.unicorn.studio/docs/ · https://github.com/hiunicornstudio/unicornstudio.js
local: unicorn-studio/repo-unicornstudio.js/README.md · unicorn-studio/web/
fetched: 2026-10-28
---
# Unicorn Studio — background/hero shader ber-layer dari editor visual, di-embed lewat runtime proprietary (~40–50 KB gz) yang dikendalikan via Variables & Events

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai kalau:**
- Butuh hero/background shader "mahal" (aurora, fluted glass, liquid/ripple, ASCII 3D, particles, cloth, video sequence) yang **didesain** desainer di canvas ber-layer (mirip Figma), bukan ditulis dari nol.
- Interaksi standar cukup dari editor: Appear / Scroll (posisi & velocity) / Hover / Mousemove + spring/momentum, plus breakpoint Desktop/Tablet/Mobile.
- Kode host cuma perlu memutar "knob" yang sudah di-publish: `scene.setVariable()`, preset tema, CMS image/text, audio level.
- Target Framer / Webflow / Figma Sites / React / HTML biasa (tombol export siap-tempel).

**Jangan kalau:**
- Butuh kontrol shader graph/pipeline sendiri, render loop sendiri, atau mencampur kode WebGL sendiri ke scene → FAQ: scene "isn't a Three.js project or arbitrary WebGL code, so you can't add your own rendering code". Pakai **OGL / curtainsjs / PixiJS / three**.
- Butuh banyak elemen DOM yang tersinkron jadi plane WebGL (galeri scroll, transisi gambar per item) → **curtainsjs / gpu-curtains** (lihat `../curtainsjs/`).
- Proyek komersial di plan Free: Free = "Personal and non-commercial use", maks **8 publish** dengan branding Unicorn, maks **3 variables per scene**. Komersial & tanpa watermark = Legend ($168/thn atau $20/bln) (`web/pricing.md`, `web/changelog.md` 2026-05-28).
- Butuh vendor-independence: runtime **proprietary** — lisensi README melarang derivatif, reverse engineering, dan pemakaian dengan project non-Unicorn; JSON export (self-host) hanya Legend dan tetap **wajib** SDK.
- Banyak WebGL lain di halaman (three.js, peta): semuanya berbagi budget context browser yang sama.

**vs alternatif:** Spline = 3D object/scene; Rive = vector + state machine; cables.gl = node patch yang bisa self-host penuh; Polygon = procedural 3D; Unicorn = *layer-based 2D/2.5D shader compositing* paling cepat untuk desainer.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Scene = JSON** (layer, efek, animasi) → runtime merender dengan WebGL **satu shader pass per layer**, dirantai lewat render target. **Flatten (Beta)** menggabungkan layer kompatibel jadi satu shader (reuse fungsi, cull kerja, skip pixel di luar mask). Efek **multi-pass** (90s VHS) dan **ping-pong** (mouse ripple, mouse trail, light draw) memutus rantai merge → taruh di **paling atas** stack (`web/performance.md`).
- Runtime dibangun di atas **curtains.js** (bukti di changelog README: v1.4.31 "Removes curtains log", v2.2.7 "deferring heavy WebGL/Curtains setup") → model mentalnya sama dengan DOM-plane curtains: plane per layer, render target chaining, ping-pong untuk trail.
- **Precedence properti**: `authored base value -> breakpoint value -> variable/runtime override -> active event animation`. Artinya event (scroll/hover) selalu "menang" di atas variable selama aktif → jangan drive properti yang sama dari variable *dan* event.
- **Event timeline (SDK ≥2.4.0)**: event pada properti sama → berurutan (stage); tipe event berbeda pada properti sama → **dijumlah** (layer bisa drift ikut mouse sambil fade-in saat scroll). Hover jalan maju saat hover, mundur saat lepas. **Spring melewati ujung track** scroll/mouse (overshoot nyata, bukan clamp).
- **Ruler scroll** = jarak, dalam % viewport yang sudah dilewati tepi atas scene terhadap tepi atas viewport; mulai **−100%** (tepi atas scene baru masuk dari bawah). Delay −100…200% vh, Duration 0…200% vh. Pindah event Appear→Scroll: **1 detik = ½ viewport scroll**.
- **SDK memiliki semuanya**: rAF loop, gating visibilitas (pause saat offscreen), resize, tab visibility, listener mouse/touch global passive, dan budget WebGL context. README eksplisit: jangan tambah IntersectionObserver/render loop/resize observer sendiri untuk hal-hal itu.
- **Budget context**: browser ±16 context live/halaman (8 di Android). Sejak v2.4.1 scene berlebih berbagi context: scene terlihat dapat duluan, offscreen menahan frame terakhir lalu dibangun ulang saat masuk viewport. v2.4.3: desktop menyimpan **14 live** → sisakan 2 untuk WebGL lain.
- **Custom effect** (semua plan): editor **GLSL ES 3.00** untuk vertex+fragment; uniform bawaan `uTexture` (layer di bawahnya), `uTime`, `uMousePos`, `uResolution`; uniform yang kamu deklarasikan otomatis jadi kontrol panel; `sampler2D` untuk gambar sendiri; multi-pass termasuk ping-pong (simpan frame sebelumnya) (`web/faqs.md`).
- `scene.getMouse()` → `{ x, y, inBounds, moved }`, **y dari bawah ke atas** (konvensi GL, bukan DOM).

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

```html
<!-- head: pin versi (README: "Load the SDK once and pin a version") -->
<script src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js"></script>

<!-- container WAJIB punya width & height sebelum init -->
<div class="unicorn-embed" style="width:100%;aspect-ratio:16/9"
     data-us-project="YOUR_PROJECT_EMBED_ID"
     data-us-scale="1" data-us-dpi="1.5"
     data-us-lazyload="true" data-us-production="true"
     data-us-alttext="Hero visual" data-us-arialabel="Animated background"></div>
<script>
  UnicornStudio.init()                // Promise<scene[]>; aman dipanggil ulang (hanya init elemen baru)
    .then((scenes) => { /* ready */ })
    .catch(console.error);
</script>
```

Dinamis (SPA / komponen):
```js
const scene = await UnicornStudio.addScene({
  elementId: "unicorn",            // atau element: HTMLElement
  projectId: "YOUR_PROJECT_EMBED_ID", // atau filePath: "/x.json" (self-host, Legend) — jangan dua-duanya
  fps: 60, scale: 1, dpi: 1.5,     // fps 1–120, scale 0.25–1
  lazyLoad: true, production: true, fixed: false,
  altText: "…", ariaLabel: "…",
  initialPreset: "Brand Dark",
  initialVariables: { brandColor: "#7c3aed", intensity: 0.65 },
  interactivity: { mouse: { disableMobile: false, disabled: false } },
  breakpoints: [ { name:'Desktop', max:Infinity, min:992 }, { name:'Tablet', max:991, min:576 }, { name:'Mobile', max:575, min:0 } ],
});
scene.paused = true;  scene.paused = false;   // pause/resume
scene.resize();       // setelah container berubah ukuran / tampil dari display:none
scene.destroy();      // cleanup per komponen (unmount). UnicornStudio.destroy() = hancurkan SEMUA scene di halaman
```

Gotcha terverifikasi (README):
- Atribut boolean `data-us-*` butuh nilai `"true"`. **Nilai apa pun yang tidak kosong menyalakan, termasuk `"false"`**; atribut telanjang (`data-us-lazyload`) diabaikan. Untuk mematikan: hapus atributnya. Pengecualian: `data-us-controls` boleh telanjang.
- SDK membaca `window` saat load → di Next.js/SSR import hanya di client (`useEffect`) atau pakai `unicornstudio-react/next`.
- Cache: scene ter-cache browser+CDN; bump `data-us-project="ID?update=1.0.1"`. Production CDN butuh 1–2 menit propagasi.
- Debug: `?controls=1` di URL halaman membuka panel kontrol runtime tanpa ubah markup.
- Republish scene dengan SDK lama di situs = penyebab #1 "tiba-tiba rusak" → samakan versi CDN/React (`sdkUrl`).

Public API lengkap (README): `UnicornStudio.init() / addScene(opts) / destroy() / setScroll(y) / useNativeScroll()`; scene: `resize, destroy, paused, setVariable(s), getVariable(s), getVariableDefinition(s), getVariableManifest, onVariableChange(cb) → unsubscribe, getPresets, getPreset, setPreset, setProp(layer, prop, v), setTexture(layer, sampler, url), getLayers, getLayer(idOrName) → {hide, show, onLoad (model)}, getMouse`. Setter mengembalikan scene (chainable); nama variable tak dikenal → warning, tak ada perubahan.

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Efek ke feel / biaya | Default | Rentang bagus |
|---|---|---|---|
| `scale` / `data-us-scale` | skala render canvas; turun = lebih soft & jauh lebih murah | 1 | 0.5–0.75 untuk ambient lembut |
| `dpi` / `data-us-dpi` | densitas pixel; 2 = 4× kerja dibanding 1 | 1.5 (docs embed) | 1–1.5 |
| `fps` / `data-us-fps` | cap rAF; 30 menggandakan budget GPU | — | 30 ambient · 60+ untuk mouse/fast motion |
| Layer **downsample** (editor test page) | 0.5 = **75% lebih sedikit pixel**; blur/glow/fog/noise lembut tak kelihatan bedanya | 1 | 0.25–0.5 untuk layer soft; 1 untuk teks/shape tajam |
| Scroll trigger **Momentum** / **Spring** | inertia & overshoot respons scroll | — | Momentum 0–100%, Spring 0–100%; spring sedikit = "elastis mahal" |
| While Scrolling (velocity) **Ignore Direction** | efek ikut kecepatan scroll, positif dua arah | off | on untuk distorsi kecepatan |
| Mousemove **Sensitivity / Momentum / Delay** | seberapa cepat bereaksi, seberapa halus, kapan balik | — | Sensitivity 0–1, Momentum 0–1, Delay ms (0 = langsung reset) |
| Appear **Duration / Delay / Easing / Loop** | intro choreography | — | Duration 0–1000 ms, Delay 0–2500 ms |
| Hover **Forwards Only**, **Trigger On** canvas/element | hover satu arah vs reversible | reversible | element-hover hanya untuk efek yang child dari Shape/Image/Text |
| Layer mouse tracking + momentum + 3D axis tilt | parallax/tilt ke kursor | — | intensitas 0–100% |
| Variables (`number/boolean/string/color/vec2/vec3/texture`) | kontrol runtime dari host | authored | jaga `number` di `validation.min/max` dari manifest |

Variable vektor wajib bertipe: `scene.setVariable("position", { type: "Vec2", x: 0.5, y: 0.35 })`; warna = hex string.

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

**Lenis (virtual scroll, SDK ≥2.1.12)** — wajib kalau scroll di-transform sehingga `window.scrollY` tak mencerminkan posisi visual:
```js
UnicornStudio.init().then(() => {
  const lenis = new Lenis();
  lenis.on('scroll', ({ scroll }) => UnicornStudio.setScroll(scroll));
  function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
});
// saat Lenis di-destroy: UnicornStudio.useNativeScroll();
```

**GSAP / ScrollTrigger → Variables** (API Unicorn terverifikasi; nama opsi ScrollTrigger lihat NOTES GSAP — [UNVERIFIED di mirror ini]):
```js
const proxy = { intensity: 0 };
gsap.to(proxy, { intensity: 1, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  onUpdate: () => scene.setVariable('intensity', proxy.intensity) });
```
Jangan juga pasang Scroll event di editor pada properti yang sama (event menimpa variable selama aktif).

**React / Next.js** — `unicornstudio-react` (docs: "unofficial but totally awesome"):
```jsx
import UnicornScene from "unicornstudio-react";           // Next: "unicornstudio-react/next"
<UnicornScene projectId="ID" width={800} height={600} preset="Dark Theme"
  variables={{ brandColor: "#7c3aed", intensity: 0.65 }}
  onVariableChange={(name, value, values) => {}} />       // sceneRef → API scene; sdkUrl untuk override SDK
```
Prop `variables`/`preset` disinkron ke scene hidup **tanpa re-init**.

**Barba / SPA routing**: `scene.destroy()` pada leave/unmount (bukan sekadar hide), `UnicornStudio.init()` pada enter (idempoten). `UnicornStudio.destroy()` hanya bila semua scene memang harus hilang.

**Framer**: komponen `https://framer.com/m/UnicornStudioEmbed-wWy9.js` (tidak render di edit mode; samakan "SDK Version" antar komponen). **Webflow**: custom attribute `data-us-project` + loader script di footer; JSON self-host diunggah sebagai `nama.json.txt`. **Figma Sites**: komponen khusus (bukan Figma Design).

**Web Audio** (demo resmi Variables): RMS mic → EMA asimetris → `setVariables` tiap frame (lihat resep 3).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Tween antar preset (setPreset itu instan)** — `setPreset()` langsung lompat; untuk transisi tema yang mengalir, tween variable numerik/warna sendiri:
```js
const from = scene.getVariables();
const to = { ...from, ...scene.getPreset('Brand Dark')?.values }; // bentuk objek preset: cek console.log(scene.getPreset(...)) — [UNVERIFIED field `values`]
const p = { t: 0 };
gsap.to(p, { t: 1, duration: 0.9, ease: 'power3.inOut', onUpdate() {
  scene.setVariable('intensity', gsap.utils.interpolate(from.intensity, to.intensity, p.t));
  scene.setVariable('accentColor', gsap.utils.interpolate(from.accentColor, to.accentColor, p.t));
}});
```
(`gsap.utils.interpolate` & opsi tween = API GSAP, verifikasi di NOTES GSAP — [UNVERIFIED di mirror ini].)
Kenapa mahal: tema "melebur" di GPU alih-alih cut keras — terasa seperti grading film, bukan toggle CSS.

**2. Flash-glitch saat ganti tema (pola demo HTML Clock resmi)**
```js
let token = 0;
function flashTheme(target /* {foreground, background} */) {
  const t = ++token, inv = { foreground: target.background, background: target.foreground };
  const set = (c, g) => t === token && scene.setVariables({ ...c, glitchAmount: g });
  set(target, 0.85);
  setTimeout(() => set(inv, 1), 70);
  setTimeout(() => set(target, 0.55), 140);
  setTimeout(() => set(inv, 0.9), 210);
  setTimeout(() => set(target, 0), 300);
}
```
Kenapa mahal: 4 flicker dalam 300 ms dengan amplitudo menurun = "CRT settling", token mencegah race saat diklik beruntun.

**3. Audio-reactive mic dengan attack cepat / release lambat (demo resmi)**
```js
// analyser.fftSize = 1024; analyser.smoothingTimeConstant = 0; data = new Uint8Array(1024)
function level() { analyser.getByteTimeDomainData(data); let s = 0;
  for (const v of data) { const x = (v - 128) / 128; s += x * x; }
  return Math.min(1, Math.max(0, (Math.sqrt(s / data.length) - 0.02) * 7)); }
let sm = 0;
(function loop() { const l = level(); sm += (l - sm) * (l > sm ? 0.28 : 0.08);
  scene.setVariables({ Amplitude: Math.min(1, 0.29 + sm * 0.65), Brightness: Math.min(1.75, 1 + sm * 0.75) });
  requestAnimationFrame(loop); })();
```
Kenapa mahal: attack 0.28 vs release 0.08 = transien "memukul" tapi ekor meluruh halus, tanpa flicker di momen sunyi. (Mic hanya setelah klik user.)

**4. Velocity-scroll dari host (kalau scene tidak punya event While Scrolling)**
```js
let last = 0, v = 0;
lenis.on('scroll', ({ scroll }) => { UnicornStudio.setScroll(scroll); v = scroll - last; last = scroll; });
(function tick() { v *= 0.9;                       // decay → efek mereda saat berhenti
  scene.setVariable('distort', Math.min(1, Math.abs(v) / 60)); requestAnimationFrame(tick); })();
```
Kenapa mahal: distorsi ikut momentum jari/trackpad lalu "mengendap" — bahasa fisik yang sama dengan Lenis.

**5. Kontrol berbasis manifest (UI internal / art direction)** — bangun slider dari `scene.getVariableManifest()` (punya `type`, `defaultValue`, `currentValue`, `validation.min/max/step`, jumlah binding); kalau `setVariable` diam: cek nama di `getVariableDefinitions()`, binding ≥1, tipe cocok, dan sudah dipublish.
Kenapa mahal: art director bisa nge-tune intensitas live di staging tanpa republish.

**6. Custom effect ping-pong di editor** — tulis GLSL ES 3.00 dengan `uTexture`, `uTime`, `uMousePos`, `uResolution` + pass ping-pong untuk trail; simpan ke Effect Library (klik kanan) agar reusable antar project.
Kenapa mahal: trail/feedback yang "bernafas" tapi tetap dapat lazy-load, context budgeting, dan breakpoints gratis dari runtime.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- **4 langkah wajib** (performance guide): downsample layer soft → DPI 1 + Scale 0.75 → cap 30 fps untuk ambient → nyalakan Flatten. **Republish** (optimasi baru sampai ke embed setelah publish).
- Efek mahal: Aurora, 3D Shape, Bokeh blur, Noise blur, Nebula, Bloom, FBM, Godrays, Mouse trail, Mouse ripple, Light draw (+ 2D Light di FAQ). Terapkan efek sekali ke seluruh scene ketimbang per layer; yang kompleks tapi diam → pre-render jadi image.
- Ukur: tekan **F** di editor → cost score 0–100; test page (toggle `C` / `Ctrl+.`) → label Excellent/Good/Strained/Poor + "budget usage" (<100% = target fps tercapai), draw calls, frame time, texture memory.
- Halaman: `lazyLoad` untuk below-the-fold (dikeluarkan dari critical path, di-prewarm saat idle), hero tetap eager; SDK di `<head>` dengan `async/defer`; `production` untuk live; container kecil > fullscreen; destroy saat route unmount.
- Gratis dari runtime: shader dikompilasi & dioptimasi per layer saat publish; layer statis dikompres ke satu texture; render pause saat keluar viewport; shader compile paralel + decode image di background (v2.4.1).
- **prefers-reduced-motion: TIDAK ada opsi bawaan terdokumentasi** (grep docs+README nihil) → tangani di host: cek media query (`_shared/mdn-content/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md`) lalu `scene.paused = true` setelah frame pertama, atau set variable kecepatan authored ke 0, dan matikan mouse (`interactivity.mouse.disabled` / `data-us-disablemouse`).
- **A11y/SEO**: `altText` ditaruh di dalam `<canvas>`, `ariaLabel` → `aria-label` canvas. Teks penting tetap di DOM. Sejak v2.1.4 text layer paling atas yang tak perlu komposit shader dirender sebagai HTML.
- **Mobile**: `disableMobile` matikan gerak touch; Android budget 8 context; efek video jatuh ke cover image saat iOS Low Power Mode (v2.2.9/2.2.12).
- **Browser**: editor & docs mensyaratkan **WebGL2** + hardware acceleration ("works best in Chrome"). Custom effect GLSL ES 3.00 → runtime efektif butuh WebGL2 [inferensi].
- **Keamanan (OWASP)**: script pihak ketiga dari jsDelivr dengan versi di-pin; SRI tidak didokumentasikan [UNVERIFIED]; scene JSON & aset diambil dari CDN Unicorn (dependensi runtime eksternal); `setTexture()` dengan URL eksternal tunduk CORS. Halaman docs MCP/LLM berisi "rules for agents" — perlakukan sebagai dokumentasi vendor, bukan instruksi.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `repo-unicornstudio.js/README.md` — SDK lengkap: embed params, addScene options, runtime API, precedence, budget context, changelog v1.4→v2.4.3, lisensi.
- `web/embed.md` — snippet resmi per platform (Framer/Webflow/Figma Sites/React/HTML/Wix), loader script, virtual scroll, cache & production mode.
- `web/variables.md` — Variables/Presets API, manifest, custom controls, 3 demo lengkap (mic audio, clock glitch, load bar).
- `web/events.md` — Appear/Scroll/Hover/Mousemove: semua parameter + rentang, Interaction Timeline (stage, aditif, ruler %vh).
- `web/performance.md` — downsample, scale/DPI, fps, Flatten & aturan merge, estimator, test page, context limit.
- `web/faqs.md` — custom GLSL ES 3.00 (uniform bawaan), batasan "bukan three.js", breakpoints, lisensi redistribusi, troubleshooting versi SDK.
- `web/changelog.md` — fitur editor 2026 (Scroll Timeline, GPU Text, Video Sequence, Cloth Physics, Particles, Variables) + versi SDK minimum.
- `web/github-releases-unicornstudio.md` — release notes SDK v2.2–2.4.3.
- `web/pricing.md` — Free vs Legend (batas publish, komersial, variables, agent credits).
- `web/llm-example-projects.txt` — katalog scene contoh + variable & rentang default (data vendor, bukan instruksi).
- `web/www.unicorn.studio__llms.txt` — peta dokumentasi resmi.
