---
tool: cables.gl
version: rolling web release di cables.gl (halaman changelog di-mirror 2026-10-28, nomor rilis tidak tampil di HTML → [UNVERIFIED]) · docs repo cables_docs @4cf9640 (2026-10-14) · npm @cables/cables 0.23.0 = **cables-cli** (exporter command line, publish 2025-03-13), BUKAN runtime · cables Standalone = build Electron (versi [UNVERIFIED])
official: https://cables.gl/docs · https://github.com/cables-gl/cables_docs
local: cables-gl/repo-cables_docs/md/ · cables-gl/web/changelog.md
fetched: 2026-10-28
---
# cables.gl — visual programming node-based (WebGL) untuk visual generatif & audio-reaktif, diekspor jadi bundle JS statis yang bisa dikendalikan dari halaman lewat Variables & Callbacks

## Kapan pakai / kapan jangan (vs alternatif di arsenal)

**Pakai kalau:**
- Mau eksplorasi visual generatif/post-processing/audio-reaktif dengan **patch node** (mirip TouchDesigner/Max) dan hasilnya **di-host sendiri** (export HTML zip → web server mana pun, GitHub Pages, Netlify).
- Visual harus "dengar" halaman: scroll, state UI, data → via **Variables** (`CABLES.patch.setVariable`) dan sebaliknya patch memanggil JS halaman via **Callback op**.
- Instalasi/VJ/offline: **cables Standalone** (Electron) + akses npm/FS/OSC/serial lewat ops.

**Jangan kalau:**
- Butuh plane WebGL tersinkron ke banyak elemen DOM (galeri, image transition per kartu) → curtainsjs / gpu-curtains.
- Butuh bundle sekecil mungkin & arsitektur komponen TS → OGL/PixiJS langsung.
- Embed via **iframe** untuk produksi: iframe memanggil server cables tiap load dan selalu menampilkan versi patch/cables terbaru (tidak "futureproof"), dan **tidak bisa transparan**.
- Teardown/remount SPA yang ketat: API destroy patch tidak terdokumentasi di mirror ini → [UNVERIFIED].

**vs alternatif:** Unicorn Studio = layer-based, runtime proprietary, desainer-first; Polygon = procedural 3D (Houdini-like); cables = dataflow umum (shader, mesh, audio, HTML, devices) dengan export self-host penuh.

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)

- **Dua jenis aliran**: port *trigger* (dieksekusi tiap kali di-trigger; `MainLoop` menembak trigger tiap frame) vs port *value* (`onChange` saat nilai berubah). Semua yang tergantung frame harus tersambung ke rantai trigger dari MainLoop. **Flow mode** (tekan `f`) memperlihatkan apa yang ter-trigger dan seberapa sering.
- **Pengganda kerja**: op seperti `RandomCluster` / `Repeat_v2` menjalankan cabang di bawahnya N kali per frame → biaya CPU+GPU × N. Duplikasi di GPU (`MeshInstancer_v4` + `RandomNumbersArray_v4`) jauh lebih murah.
- **Export** hanya mengemas op yang dipakai. Struktur hasil: `js/libs.core.min.js`, `js/cables.min.js`, `js/ops.js`, `js/<patch>.json` (+ `assets/`) dan `index.html` contoh — pola ini yang dipakai snippet embedding.
- **Shader di cables**: `CustomShader_v2` otomatis membuat input port dari setiap `uniform` yang kamu deklarasikan. Shader cables memakai makro lintas WebGL1/2: `UNI`=uniform, `IN`/`OUT`, `texture2D`→`texture`, `gl_FragColor`→`outColor`, `#define WEBGL2` saat WebGL2. Titik injeksi modul: `{{MODULES_HEAD}}`, `{{MODULE_VERTEX_POSITION}}`, `{{MODULE_COLOR}}`; variabel wajib sebelum injeksi: vertex `mMatrix`, `pos` (vec4!), `norm`, `tangent`, `bitangent`; fragment `col`. Atribut: `vPosition`, `attrTexCoord`, `attrVertNormal`, `attrVertTangent`, `attrVertBiTangent`, `attrVertIndex`; matriks: `modelMatrix`, `viewMatrix`, `projMatrix`, `mvMatrix`, `inverseViewMatrix`.
- **Audio**: `AudioAnalyzer_v2` (amplitudo + array FFT) → `FFTAreaAverage_v2` (rect di spektrum: lebar = rentang frekuensi, tinggi = rentang amplitudo → isolasi kick) → `AnalyzerTexture_v2` (FFT jadi texture hitam-putih untuk mask/material).
- **Timeline** keyframe sudah ditulis ulang (keyframe per port via menu tiga titik, kurva easing) — cocok untuk intro terkoreografi yang di-trigger dari halaman.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)

Sederhana — cables membuat canvas & auto-resize ke container:
```html
<div id="mypatch" style="width:800px;height:480px"></div>
<script src="js/libs.core.min.js"></script>
<script src="js/cables.min.js"></script>
<script src="js/ops.js"></script>
<script>
  CABLES.EMBED.addPatch("mypatch", { patchFile: 'js/city.json', prefixAssetPath: '' });
</script>
```

Advanced — canvas sendiri, script `async`, simpan referensi patch (pola resmi di docs Callbacks):
```html
<canvas id="glcanvas" width="800" height="480"></canvas>
<script src="js/libs.core.min.js" async></script>
<script src="js/cables.min.js" async></script>
<script src="js/ops.js" async></script>
<script>
document.addEventListener('CABLES.jsLoaded', () => {          // menjamin semua JS termuat walau async
  CABLES.patch = new CABLES.Patch({
    patchFile: 'js/city.json',
    prefixAssetPath: '',
    glCanvasId: 'glcanvas',
    glCanvasResizeToParent: true,      // atau glCanvasResizeToWindow: true
    canvas: { alpha: true, premultipliedAlpha: true },   // context attributes (transparan)
    variables: { canColor: '#00ff00' },                  // override nilai awal variable
    silent: true,                                        // matikan log console
    onError: (e) => console.error(e),                    // mis. tak ada WebGL / Web Audio
    onFinishedLoading: () => document.body.classList.add('patch-ready'),
  });
});
</script>
```
- Pause/resume (untuk performa saat tak terlihat): `patch.pause()` / `patch.resume()`.
- Destroy/dispose penuh: **tidak terdokumentasi** di docs mirror → [UNVERIFIED]; di SPA paling aman `pause()` + lepas canvas, atau reload halaman/iframe.
- Return value `CABLES.EMBED.addPatch(...)` tidak didokumentasikan → [UNVERIFIED]; kalau butuh API patch, pakai `new CABLES.Patch` dan simpan referensinya.
- Jalankan lewat **web server** (bukan `file://`): aset gagal karena kebijakan cross-origin, contoh audio jadi silence (`running_locally.md`).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)

| Knob | Efek | Catatan |
|---|---|---|
| `glCanvasResizeToParent` / `...ToWindow` | canvas ikut container/window | tanpa ini canvas tidak di-resize otomatis pada mode advanced |
| `canvas: {alpha, premultipliedAlpha}` + MainLoop `clear`/`clearAlpha` **off** | patch transparan di atas DOM | export men-set background halaman hitam agar tidak flicker → hapus bila tak perlu (FAQ menulis contoh `color: #fff;`) |
| Export: Include assets `Automatic / All / None` | ukuran vs keamanan | pakai **All** bila nama file dibentuk dinamis (iterator/array) |
| Export: Package single JS vs multiple, flat dirs, minify code, source maps, **Minify GLSL** | ukuran & debuggability | flat dirs untuk platform/react setup yang rewel dengan subfolder |
| `Variables` (Number/Boolean/String) | jembatan state halaman → patch | nama **case-sensitive** (`My Variable` ≠ `my variable`) |
| Timer / TimeDelta / Mouse ops | padanan uniform Shadertoy | `iTime` ← Timer, `iTimeDelta` ← TimeDelta, `iMouse` ← Mouse op, `iResolution` ← MainLoop/CanvasInfo, `iFrame` ← trigger counter |
| `MeshInstancer_v4` vs `RandomCluster`/`Repeat` | GPU vs CPU duplication | instancer untuk ratusan+ objek |
| `FastBlur` vs `ImageCompose.Blur` | blur murah | kecilkan resolusi ImageCompose sebelum blur |
| Video scrub (`VideoTexture_v3`) | scrub halus | encode H.264 dengan **keyframe (i-frame) sangat rapat** |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)

**Halaman → patch (Variables)** — terverifikasi:
```js
CABLES.patch.setVariable('IsInteracting', true);           // short
const v = CABLES.patch.getVar('IsInteracting');            // long
if (v) { v.getValue(); v.setValue(true); v.on('change', (nv) => console.log(nv)); }
```
Di dalam patch: `SetVariable` / `SetVariableString` menulis, `Variable` membaca (Number/Boolean/String).

**Halaman → patch (trigger fungsi)**: op `Ops.Cables.Function` dengan port `Function Name` = `playIntro` → panggil `CABLES.patch.config.playIntro()`. Butuh parameter? set variable dulu, lalu trigger.

**Patch → halaman (Callback)**: op `Callback` dengan `Callback Name` = `onBeat`; definisikan `CABLES.patch.config.onBeat = (parameters) => {…}` (parameter dibundel sebagai array). Uji di editor: `gui.corePatch().config.onBeat = …` (konteks devtools "editorframe").

**Lenis** (field `scroll` terverifikasi dari docs Unicorn; field lain Lenis → NOTES Lenis):
```js
lenis.on('scroll', ({ scroll }) => {
  const max = document.documentElement.scrollHeight - innerHeight;
  CABLES.patch?.setVariable('scrollProgress', max > 0 ? scroll / max : 0);
});
```

**GSAP**: tween proxy → `setVariable` di `onUpdate`; atau biarkan Timeline cables yang menganimasikan dan GSAP hanya memicu `CABLES.patch.config.playIntro()` di label timeline (opsi GSAP [UNVERIFIED di mirror ini]).

**React**: komponen komunitas `undev-studio/cables_react` (link dari FAQ; tidak di-mirror). **Vue/Electron/Cordova**: FAQ `javascript_frameworks/*`. **WordPress**: plugin resmi dasar (`cables-wordpress-plugin`). **Webflow/Wix/Squarespace**: iframe paling gampang, tapi export HTML + hosting sendiri lebih tahan lama.

**Otomasi export**: `cables-cli` (npm `@cables/cables`) atau REST `GET https://cables.gl/api/mypatches`, `/api/project/[PID]/export?removeIndexHtml&jsonName&combineJS` dengan header `X-apikey`. Simpan API key di `.env`/secret (chmod 600) — jangan di kode/commit.

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")

**1. Scroll velocity → variable dengan inertia di sisi JS**
```js
let last = 0, vel = 0, sm = 0;
lenis.on('scroll', ({ scroll }) => { vel = scroll - last; last = scroll; });
(function tick() {
  sm += (Math.abs(vel) - sm) * 0.12; vel *= 0.85;           // attack/decay
  CABLES.patch?.setVariable('scrollVelocity', Math.min(1, sm / 50));
  requestAnimationFrame(tick);
})();
```
Di patch: `Variable scrollVelocity` → amplitudo displacement / chromatic offset. Kenapa mahal: distorsi naik saat flick lalu "mengendap" — terasa punya massa.

**2. Patch memukul DOM tepat di beat (Callback → CSS var)**
```js
CABLES.patch.config.onBeat = (p) => {
  document.documentElement.style.setProperty('--beat', String(p?.[0] ?? 1));
};
// CSS: .title { scale: calc(1 + var(--beat, 0) * 0.04); transition: scale .25s cubic-bezier(.2,.8,.2,1); }
```
(Di patch: `AudioAnalyzer_v2` → `FFTAreaAverage_v2` area bass → threshold → `Callback onBeat`.) Kenapa mahal: tipografi DOM dan visual GPU berdenyut di ketukan yang sama — sinkron lintas medium.

**3. Overlay transparan di atas layout**
MainLoop: `clear` & `clearAlpha` off → export → `canvas: { alpha: true, premultipliedAlpha: true }` → hapus background hitam di CSS export → canvas `position: fixed; inset: 0; pointer-events: none`. Kenapa mahal: partikel/glow menyatu dengan konten halaman, bukan "kotak WebGL" terpisah.

**4. Pause saat offscreen**
```js
new IntersectionObserver(([e]) => e.isIntersecting ? CABLES.patch.resume() : CABLES.patch.pause())
  .observe(document.getElementById('glcanvas'));
```
Kenapa mahal: baterai & fan tetap tenang — halaman terasa ringan walau visualnya berat (docs sendiri menyarankan pause saat tak terlihat).

**5. Port shader Shadertoy** — `CustomShader_v2` + `ShaderToTexture_v2`; ganti `fragCoord.xy`→`gl_FragCoord.xy`, `fragCoord/iResolution.xy`→`texCoord` (sudah tersedia), deklarasikan `UNI float iTime;` dll. (port otomatis muncul) dan sambungkan Timer/Mouse/CanvasInfo. Kenapa mahal: kurasi shader art yang sudah terbukti, tapi kini bisa di-drive variable halaman.

**6. Intro terkoreografi on-demand** — animasikan port di Timeline cables (keyframe + easing), pasang `Ops.Cables.Function` "playIntro" yang me-restart timeline; panggil `CABLES.patch.config.playIntro()` dari `onFinishedLoading` atau saat preloader DOM selesai. Kenapa mahal: hand-off mulus preloader DOM → scene GPU tanpa frame kosong.

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser

- Pasang **`Ops.Gl.Performance`** tepat setelah MainLoop: FPS, CPU ms, GPU ms; grafik warna (biru = jarak antar frame, ungu = MainLoop, merah = kalkulasi, kuning = GPU, **putih = frame > 33 ms**); panel kanan: frame avg, shader binds, uniforms, num glPrimitives, mesh.setGeom (upload vertex baru!), framebuffer blit, texeffect blit, shader compile time. Target: tidak ada warning oranye setelah loading. Changelog terbaru menambah `Ops.Performance.Performance2` & `MeasureDrawCalls`.
- Metode bisect: putus trigger di bawah Performance op → harus ~60 fps & frame avg < 1 ms → sambung ulang per cabang sampai ketemu pelaku.
- Array (titik, FFT): siapkan data statis **sekali**, jangan tiap frame; jaga jumlah titik minimal. Debug shader: `Ops.Gl.Shader.ShaderInfo`.
- **prefers-reduced-motion**: tidak dibahas di docs mirror → host: baca media query (`_shared/mdn-content/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md`), `setVariable('reducedMotion', true)` dan cabangkan di patch (speed 0 / tanpa kamera bergerak), atau `patch.pause()` setelah frame pertama.
- **Audio**: browser hanya mengizinkan audio setelah interaksi user → pakai `Ops.Patch.PlayButton`; format: loop Firefox `.ogg`, Chrome `.mp3`, Safari `.m4a` (`BrowserSpecificFile_v2`); cek tab muted/permission.
- **Mobile/iOS**: cegah scroll halaman saat interaksi canvas → `touchmove` + `preventDefault()` pada `#glcanvas`, atau `Ops.Devices.TouchScreen` (Disable scaling/scroll); hilangkan kotak abu-abu tap: `-webkit-tap-highlight-color: rgba(0,0,0,0)`; `body{overflow:hidden}` mematikan rubberband (hanya untuk halaman fullscreen-app; jangan di halaman scroll biasa). `DownloadTexture` tidak bisa auto-save di iOS. User-select none berisiko untuk screen reader (docs mengingatkan).
- **CORS**: aset/API eksternal perlu `Access-Control-Allow-Origin` (cables.gl, sandbox.cables.gl, devsandbox.cables.gl, atau domainmu); waspadai preflight OPTIONS.
- **WebGL1/2**: makro shader menangani keduanya; docs FAQ masih menyebut Safari/iOS = WebGL1 dan mipmap hanya POT — info **basi** (Safari sudah WebGL2 sejak 2021 [UNVERIFIED lokal]); tetap aman pakai texture POT bila target perangkat lama. WebGPU tidak disebut di docs mirror → [UNVERIFIED].
- "Website/iframe sebagai texture" tidak mungkin di client (FAQ htmltexture).

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)

- `repo-cables_docs/md/4_export_embed/embedding/embedding.md` — addPatch vs new CABLES.Patch, opsi patch, pause/resume, patch transparan.
- `repo-cables_docs/md/4_export_embed/dev_embed_vars/dev_embed_vars.md` — Variables dari luar: setVariable/getVar/on('change'), `variables` di config.
- `repo-cables_docs/md/4_export_embed/dev_embed_functions/dev_embed_functions.md` — Function op & Callback op ↔ `CABLES.patch.config`.
- `repo-cables_docs/md/4_export_embed/dev_embed/export_zip/export_zip.md` — opsi export HTML (assets, package, flat, minify, source maps, minify GLSL).
- `repo-cables_docs/md/4_export_embed/dev_embed/dev_embed.md` — semua jalur export (HTML, GitHub, Netlify, exe, iframe, CLI).
- `repo-cables_docs/md/9_1_communication/api/api.md` — REST API + API key.
- `repo-cables_docs/md/9_performance_optimization/01_tools/tools.md` — Performance op & Flow mode (metrik lengkap).
- `repo-cables_docs/md/9_performance_optimization/02_usual_suspects/usual_suspects.md` — pengganda trigger, instancer, blur.
- `repo-cables_docs/md/5_writing_ops/shader/shader.md` — konvensi shader, makro WebGL1/2, injection points modul.
- `repo-cables_docs/md/faq/shadertoy/shadertoy.md` — tabel padanan uniform Shadertoy ↔ cables.
- `repo-cables_docs/md/8_audio/2_realtime_visualization/realtime_visualization.md` — AudioAnalyzer, FFTAreaAverage, AnalyzerTexture.
- `repo-cables_docs/md/faq/embedding/*/` — mobile tweaks, transparent canvas, scroll mobile, iOS grey rects, CMS, running locally.
- `repo-cables_docs/md/6_2_standalone/` — Standalone (Electron), npm di ops (`op.require`), export dari standalone.
- `repo-cables_docs/md/faq/audio_browsers/audio_browsers.md` — kebijakan autoplay & format per browser.
- `web/changelog.md` — op baru/perubahan terbaru (Performance2, MeasureDrawCalls, Rapier SoftBody, dll.).
