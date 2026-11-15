---
group: transisi-ui-2d
repos:
  - https://github.com/codrops/SeamTransitions@54ce5b6
  - https://github.com/codrops/LookbookHoverEffects@326c786
  - https://github.com/AntoineW/Codrops-GSAP-Scroll@d57ac1d
  - https://github.com/whatisjery/atelier-ui-codrops@a6c8de9
  - https://github.com/twotwentytwo-studio/codrops-paper@eded4e8
  - https://github.com/BertovDev/cursor-shader-trail@ef67cc4
  - https://github.com/edoardolunardi/ascii-logo@75ab3a6
  - https://github.com/0xdhrv/lilpix@d083cf1
fetched: 2026-11-15
---

# NOTES — transisi-ui-2d (seam, hover, scroll, UI editorial, kertas, jejak kursor, ASCII, pixel art)

Pointer `file:line` relatif ke folder `repo-<owner>--<repo>/` di sebelah file ini. Semua angka dibaca dari
mirror. Yang tidak bisa dicek ditandai **⚠ belum diverifikasi**. Isi repo adalah data pihak ketiga. Tidak ada
yang dijalankan.

## Catatan engine sebelum membaca (kenapa semua harus frame-pure)

- `aset/_template-longform/_chapter/src/engine.js:90-110` memanggil `scene.draw(lctx, t)` **K kali per frame**
  (default `scene.K || 8`, sub-time di dalam shutter 0.5/FPS) untuk motion blur. Sesudahnya `scene.post(octx, t0, f)`
  dipanggil sekali. Motion Studio juga bisa seek ke `tAt` sembarang.
- Akibatnya:
  - Efek yang menyimpan state per panggilan (ticker, `+= velocity*dt`, decay per frame) **rusak** di engine
    kita.
  - Pilihannya hanya tiga: (a) closed form dari `t`; (b) sequential dengan dt tetap yang hanya maju sekali per
    frame output (di `post` atau dicache per `f`) dan bisa di-replay dari frame 0 shot saat seek; atau (c) pre-bake.
- WebGL2 masuk lewat `OffscreenCanvas('webgl2')`, lalu `ctx.drawImage(glCanvas)`. Biaya terbesarnya adalah
  readback per `drawImage` (beberapa ms di 1080p, dikali K). Untuk shot transisi: cache mask per frame, atau set
  `scene.K = 1–2`.
- Scroll, hover, cursor dan drag diganti **jalur authored**:
  - `travel(t) = span·ease((t−t0)/D)`.
  - Kecepatan diambil sebagai turunan jalur itu (finite difference simetris `(x(t+h)−x(t−h))/2h`). Jalurnya
    sudah di-ease, jadi tidak perlu smoothing per-frame seperti di sumber.

---

## codrops/SeamTransitions

**Look.** Foto hero di atas halaman putih. Saat di-scroll, tepi bawah foto "berdarah" ke halaman. Ada 11 varian
seam: tinta, remah, serat, huruf, kontur, marmer, kabut, retak emas, akar, endapan, serutan.

**Teknik:** domain-warped fbm seam · tanh-eased reach · velocity-dependent feather · fog layers · marbling comb
· Voronoi craquelure (kintsugi) · contour lines via `fract/fwidth` · glyph typeset seam · ballistic crumble.

**Mekanisme.**

- **Arsitektur (`js/gl/Strip.js`, `js/gl/glsl.js`).**
  - Kanvas WebGL2 hanya selebar *seam box*: `above` px masuk ke hero dan `below` px masuk ke halaman.
    Satu segitiga dibuat via `gl_VertexID`.
  - Uniform: `uSize`, `uEdge` (=above), `uTravel` (px tepi hero naik dari bawah layar), `uProgress` 0–1,
    `uVelocity` px/s, `uHero` (tekstur), `uHeroBox`, `uVeil`, `uHeroSpan`, `uPaper`.
  - `glsl.js:21-45` berisi hash, value noise, dan fbm 5 oktaf (`p*2.03+17.1`, dibagi 0.97).
  - `paint()` (`glsl.js:72-`) bersifat premultiplied dan **hanya melukis selisih dengan halaman**
    (`a = abs(h − page)`).
- **Input (`js/index.js:168-181`).**
  - `speed = (y−last.y)/max(dt,1/120)`, lalu `velocity += (speed−velocity)*0.3` dan di-nol-kan kalau `|v|<2`.
  - `travel = y + innerHeight − hero`, `progress = clamp(travel/innerHeight)`.
  - Memakai ScrollSmoother `smooth:1`.
- **01 Ink (`js/seams/ink.js:41-65`).**
  - Medan `g` = lobes (fbm warp, skala 300 px) + fray (px/24) + runs (serat vertikal, `pow(fbm,3)`).
  - Spread: `spread = smoothstep(0,.35,p) + min(|v|/3000,.35)`.
  - Reach: `reach = g>0 ? down·tanh(g·spread·.9) : −up·tanh(−g·spread·.5)`. Tanh membuat tinta mendekati
    ruangnya tanpa pernah kehabisan.
  - Feather: `soft = (0.8 + min(|v|·.004, 8))·smoothstep(0,.03,p)`. Tepi tajam saat diam, lembut saat cepat.
  - Rim 14 px digelapkan 45%. Yang jadi "tinta" adalah **foto itu sendiri** (`photo(px)`).
- **07 Mist (`js/seams/mist.js:36-51`).**
  - 3 lapis kabut, ukuran `260−70i` px, drift `(.15,.6)·travel·(1−.3i)`.
  - `rise = smoothstep(0,.85,p)`; `fog = smoothstep(0,.45, wisp+reach−.3)·(1−.25i)`; `clear *= 1−fog`
    (multiplikatif).
  - Ground bank `(20+70·fbm)·sqrt(rise)`.
- **06 Marble (`js/seams/marble.js:37-54`).**
  - `amount = grown·reach²`, `grown = smoothstep(0,.6,p)`, `t = travel/160`.
  - Sisir halus: `q.x −= amount·(1−smoothstep(30,110,|d|))·18·sin(q.y/6 − 1.3t + feather)`.
  - Lidah lebar: `q.y −= amount·50·swell·sin(q.x/26 + wander + t)`.
  - Garis-garis: `s=(q.y−uEdge)/16`, `bands = 4·grown`, AA via `fwidth`.
- **08 Craquelure (`js/seams/craquelure.js:79-107`).**
  - Pelat Voronoi (cari 3×3 lalu 5×5 untuk border), jitter `.1+.8·hash`, wander fbm `.35·CELL`.
  - `dry = clamp(p·1.7 − max(h,0)·1.3 + (id−.5)·.3·min(10p,1))`, `crack = dry²·open`,
    `turn = (id−.5)·.5·dry·give`, pelat menyusut `1/(1−.3·dry·give)`.
  - Celah emas `mix((.72,.55,.24),(.95,.82,.5),noise)`, bayangan retak 12%.
- **05 Contour (`js/seams/contour.js:30-72`).**
  - Tone kasar diambil dari `textureLod(uHero, uv, 3.5)`. `level = p·1.4 − .25`;
    `shore = −d/uEdge + .35(tone−.5) + .1(fbm−.5)`.
  - `g = ground·LINES(10) + travel/FLOW(240)`; `dist = |fract(g+.5)−.5| / fwidth(g)`. Ketebalan garis konstan
    dalam px, securam apa pun "tanahnya".
  - Setiap garis ke-5 tebal (1.1 vs .45). Garis air paling tebal. Warna BROWN (.62,.43,.27), INDEX (.42,.27,.15).
- **04 Typeset (`js/seams/typeset.js:148-164`).**
  - Atlas glyph + tekstur teks. `reach = p·(rows+below)·1.5 + (noise−.5)·8`.
  - Glyph mengambil warna `photo(px)` dicampur 15% tinta.
  - Scramble: `beat = floor(travel/32)`. Kalau `hash(cell + beat·.37) < min(|v|/4000,.6)`, glyph diacak.
- **02 Crumble (`js/seams/crumble.js`, Canvas2D + Physics2D).**
  - Blok 4×4 di-split quad secara rekursif, lalu jatuh berurutan.
  - `v = rand(.8,1.2)·(90+150k)`, sudut `−90±30°`, GRAVITY 1200 px/s².
  - `duration = (−rise + sqrt(rise² + 2g·drop))/g`. Spin `±(40..120)(.5+k)` power1.in. Opacity → 0 di paruh
    kedua.
  - Dipicu ambang travel, lalu jalan real-time.
- **Sim stateful:** fray (ticker), roots (pertumbuhan `Math.random`), sediment dan shavings (Physics2D).

**Kenapa terasa mahal.**

- Tepi tidak pernah garis lurus, tapi juga tidak "noise acak": ada tiga skala noise dengan peran berbeda
  (lobus, serat, rumbai).
- Tepi bereaksi pada kecepatan (tajam saat diam, lembut saat ngebut). Tinta yang luber adalah gambar itu sendiri.
- Ketebalan garis kontur dikunci dalam px lewat `fwidth`.
- Shader hanya melukis selisih, jadi halaman tetap bersih.

```glsl
// js/seams/ink.js:41-61 (MIT, Codrops)
vec2 q = (px + uTravel * vec2(0.08, 0.47)) / 300.0;
vec2 w = vec2(fbm(q), fbm(q + vec2(5.2, 1.3)));
float lobes = fbm(q * 1.2 + 2.2 * w);
float fray = fbm(px / 24.0 + 3.0 * w);
float runs = pow(fbm(vec2(px.x / 26.0, (px.y - uTravel * 0.16) / 140.0)), 3.0);
float g = (lobes - 0.42) * 2.8 + (fray - 0.5) * 0.35 + runs * 0.9;
float spread = smoothstep(0.0, 0.35, uProgress) + min(abs(uVelocity) / 3000.0, 0.35);
float reach = g > 0.0 ? down * tanh(g * spread * 0.9) : -up * tanh(-g * spread * 0.5);
float s = d - reach; // in the ink where negative
float soft = max((0.8 + min(abs(uVelocity) * 0.004, 8.0)) * smoothstep(0.0, 0.03, uProgress), 0.001);
float h = 1.0 - smoothstep(-soft, soft, s);
float rim = 1.0 - smoothstep(0.0, 14.0, -s);
```

**Lisensi:** MIT (Codrops). Kode boleh dipakai dengan menyertakan notice.

**Adaptasi.**

- **Frame-pure:**
  - Semua varian GLSL (ink, mist, marble, craquelure, contour, typeset) hanya butuh `travel(t)`, `progress(t)`
    dan `velocity(t)`. Ketiganya diturunkan dari jalur authored (lihat Resep 1).
  - Crumble jadi closed-form per tile (balistik + RNG ber-seed) dengan waktu lahir dari ambang `travel(t)`.
  - Fray, roots, sediment, shavings tidak frame-pure: lewati, atau pre-bake.
- **Jalur render:**
  - Ink, mist, marble cukup **mask** WebGL2 tanpa upload tekstur. Komposit A/B dikerjakan di Canvas2D.
  - Contour dan craquelure butuh tekstur foto A (upload sekali kalau A diam).
  - Typeset butuh atlas glyph.
- **Biaya:** fbm 5 oktaf × ±5 panggilan per px sangat ringan di GPU. Yang mahal readback `drawImage` × K subframe,
  jadi cache per frame atau pakai `scene.K=2` di shot transisi.
- **Tempat di film:**
  - Ink dan mist untuk transisi antarbab (foto stasiun lama luber ke kartu bab baru).
  - **Contour untuk masuk ke bab peta**: foto berubah jadi garis topografi lalu jadi peta. Ini jembatan yang
    jarang dipakai.
  - Typeset untuk bab teknologi/AI (foto terurai jadi grid huruf).
  - Crumble untuk "angka yang runtuh" di bab data.
- **Risiko kiblat:**
  - Marble dan craquelure emas = ornamen kertas/antik, jadi rawan "jadul" dan "kertas lagi". Hindari kecuali
    filmnya soal seni/sejarah.
  - Palet coklat contour ganti ke tinta + lime untuk satu garis indeks saja.
  - Mist rawan lumpur nilai; tahan ≤1 s dan pastikan B berkontras tinggi.

**Sudah ada?**

- "seam", kontur topografi, Voronoi, marbling, kabut: **tidak ada** di 6 file referensi, jadi baru.
- Prinsip velocity → feather adalah saudara *speed-reactive optics*, yang sudah ada
  (`motion-taste/references/studio-tricks.md:79-82`).

**Skor cocok: 5/5.**

---

## codrops/LookbookHoverEffects

**Look.** Hover pada foto lookbook memasukkan kartu warna dengan 8 gaya: shadow-first, glass, reach, lift, peel,
melt, liquid, channel.

**Teknik:** luminance-keyed wipe (shadow-first) · tone-layer separation slide (lift) · superellipse liquid-glass drop
dengan refraksi + chromatic fringe · page peel via refleksi garis lipat · banded channel-change · jagged clip-path
dengan lag per titik.

**Mekanisme.**

- **Dasar:**
  - `js/gl.js` menggambar segitiga fullscreen (−1,−1),(3,−1),(−1,3) dan menyediakan helper program, uniform,
    tekstur, dan float field (R16F/RG16F).
  - `js/wipe.js:55-90` mengatur dua tepi, `lead` dan `trail`, masing-masing 0→1 dari sisi masuk, dengan
    `toggle()` GSAP 3.15 `easeReverse`.
- **01 Shadow-first (`js/effects/shadow-first.js:42-80`).**
  - CONFIG: `.8 s power1.out`, `pull .75`, `light .2`.
  - Waktu tiba per piksel: `t = mix(d, mix(tone(uv,2), tone(uv,4.5), .5), uPull)`.
    - `d` = posisi di sepanjang arah sapuan.
    - `tone` = luminance dari mip level 2 dan 4.5, dinormalisasi ke persentil 2 dan 98 foto.
    - Piksel gelap dicapai lebih dulu.
  - `covered = (1−smoothstep(lead−1.5w, lead, t))·smoothstep(trail−1.5w, trail, t)`, dengan `w = fwidth(t)`.
  - Hairline cahaya ±2 px berwarna (1,.97,.92), hanya pada piksel yang dicapai hampir bersamaan
    (`near = 1−smoothstep(0,.02,|t−edge|)`).
- **04 Lift (`js/effects/lift.js:21-63`, `:98-103`).**
  - CONFIG: `1.4 s power2.inOut`, `stagger .1`, `smooth 6` px blur pada peta tone selebar 240 px.
  - Foto dipotong jadi 3 lapis (terang/tengah/gelap) di persentil 1/3 dan 2/3. Tiap lapis sedikit menyelip di
    bawah lapis atasnya (smoothstep overlap, `:60-63`).
  - Tiap lapis bergeser `OFF = 1.02` lebar. Progres lapis: `ease(clamp((t − k·stagger)/(1−2·stagger)))`.
    Lapis terang berangkat duluan (`:11`, `:39-40`).
- **02 Glass (`js/effects/glass.js:24-58`).**
  - CONFIG: `1.3 s power3.out`, `edge 25`, `bend .9`, `pull 44`, `pullBend .65`, `fringe .64`, `dome .1`,
    `wobble .1`.
  - SDF superellipse `g = (|x/a|^n + |y/b|^n)^(1/n)`, dengan `n` 2→5 seiring p (bulat → squircle).
  - Wobble `1 + w(.6·sin(3θ+φ) + .4·sin(5θ−1.3φ))`, dengan `uPhase = ticker.time·2`.
  - Offset kuadratik di dalam (bend) dan di luar (pull). Per kanal dikali `(1+fringe(1−k))`.
  - Kartu diperbesar `(1−uDome)`.
- **05 Peel (`js/effects/peel.js:21-75`).**
  - CONFIG: `.7 s power1.inOut`, `showThrough .38`, `shadow .35`, `shade .6`.
  - `t = dot(p−corner, n) − fold`; `was = p − 2t·n` (refleksi melintasi garis lipat).
  - Flap = kertas belakang + foto tercermin tembus .38. Bayangan 22 px. `uFold = p·(2·len+2)`.
- **08 Channel (`js/effects/channel.js:19-59`).**
  - CONFIG: `1 s power1.inOut`, `bands [6,14]`, `settle .3`, `deals 4/s`, `grain 3 px`, `redraws 30/s`,
    `scatter .25`, `photo .6`.
  - Momen tiap band: `r = mix(rand(floor(uv.y·6), deal), rand(floor(uv.y·14), deal+3.1), .5)`;
    `since = (changed − r(1−settle))/settle`.
  - `uDeal` dan `uFrame` = `floor(time·rate) % 97`.
- **Yang stateful:**
  - 03 Reach: CSS clip-path 8 titik, tiap titik `gsap.quickTo` .4–1 s expo, mengejar pointer.
  - Melt: heat grid CPU 48 kolom.
  - Liquid: metaball via ticker.

**Kenapa terasa mahal.**

- **Foto yang menentukan koreografinya sendiri** (bayangan duluan, lapis tone duluan). Transisinya terasa keluar
  dari dalam gambar, bukan tirai yang ditempel.
- Persentil 2/98 membuat foto pucat maupun kontras dapat rentang penuh.
- Hairline cahaya 2 px tepat di garis depan.
- Stagger antarlapis memberi kedalaman 2.5D tanpa 3D.

```glsl
// js/effects/shadow-first.js:42-57, 66-80 (MIT, Codrops) — dipotong
float tone(vec2 uv, float level) {
  float l = dot(textureLod(uPhoto, uv, level).rgb, vec3(0.2126, 0.7152, 0.0722));
  return clamp((l - uTones.x) / (uTones.y - uTones.x), 0.0, 1.0);
}
float rim(float t, float edge, float w, float side) {
  float px = side * (t - edge) / w; // pixels from the edge
  float band = smoothstep(-1.0, 0.0, px) * (1.0 - smoothstep(1.0, 2.5, px));
  float near = 1.0 - smoothstep(0.0, 0.02, abs(t - edge));
  return band * near;
}
// main():
  float t = mix(d, mix(tone(uv, 2.0), tone(uv, 4.5), 0.5), uPull);
  float w = max(fwidth(t), 1e-5);
  float lead = mix(-0.01, 1.01, uLead);
  float trail = mix(-0.01, 1.01, uTrail);
  float covered = (1.0 - smoothstep(lead - 1.5 * w, lead, t)) * smoothstep(trail - 1.5 * w, trail, t);
  float light = max(rim(t, lead, w, 1.0), rim(t, trail, w, -1.0)) * uLight * (1.0 - covered);
  color = vec4(card * covered + vec3(1.0, 0.97, 0.92) * light, covered + light);
```

**Lisensi:** MIT (Codrops). Font Nyght Serif di repo memakai OFL.

**Adaptasi.**

- **Frame-pure:** shadow-first, lift, glass, peel, channel murni fungsi p. `uPhase` diganti `2t`; `uDeal` dan
  `uFrame` diganti `floor(t·rate)%97`. Reach, melt, liquid dilewati (atau reach diberi titik-titik closed-form).
- **Jalur render:**
  - Shadow-first: 1 pass WebGL2 + upload foto sekali (mipmap). Lihat Resep 2.
  - Lift: **Canvas2D murni**, tiga kanvas lapis dihitung sekali per foto lalu 3 `drawImage` per subframe.
    Lihat Resep 3.
  - Glass dan peel: 1 pass, butuh tekstur kartu + foto.
- **Tempat di film:**
  - Shadow-first untuk ganti foto antar stasiun dokumenter (gelap lebih dulu = rasa "dibakar" tanpa
    vintage).
  - Lift untuk memecah foto bukti jadi lapis tone yang meluncur, lalu muncul kartu fakta di bawahnya. Bisa juga
    sebagai title card bab.
  - Glass squircle untuk UI sim ala Apple (kapsul/tombol yang "menetes").
  - Channel hanya untuk cerita TV/siaran.
- **Risiko kiblat:**
  - Peel = prop kertas, risiko "kertas lagi". Hindari.
  - Channel = glitch preset, hanya boleh kalau ada sebab.
  - Fringe glass .64 terlalu pelangi; turunkan ke .2–.3 dan hanya saat bergerak.

**Sudah ada?**

- Refractive glass (`motion-taste/references/light-atmosphere.md:34`), CA (`colour-finish.md:39`), dan transisi
  glitch (`motion-video-engine/references/engine-api.md:57`) sudah ada.
- **Baru:** luminance-keyed wipe, tone-layer lift, squircle morph `n` 2→5, peel lewat refleksi, waktu
  band channel.

**Skor cocok: 5/5.**

---

## AntoineW/Codrops-GSAP-Scroll

**Look.** Kata-kata besar terbang melintasi layar saat scroll. Tiap huruf membawa 5 jejak warna (ghost). Huruf bisa
"dilempar" lalu jatuh balistik. Di belakangnya ada grid 24 px.

**Teknik:** ghost-layer colour trail · SlowMo ease (rush → hang → rush) · CustomEase scale dari pusat kata · ballistic
throw closed-form · grid pixel-aligned.

**Mekanisme.**

- **Settings (`src/js/script.js:20-35`):** `ghostCount 6` (1 depan krem + 5 jejak), windup 40 px / .1 s,
  `trailDelay .0125`, recovery 1.5 s, `velocityRange [.75,1.125]`×min viewport (px/s), `angleRange [−120,−60]`,
  `gravityFactor 1.6`×tinggi viewport (px/s²), rotasi ±100°.
- **Eases.**
  - `moveEase = SlowMo slow(0.25, 0.95, false)`. Diverifikasi dari bundle dist GSAP: `n=(1−lin)/2`,
    `u = l + (.5−l)·pow`. Di bawah `n` hasilnya `u − (1−l/n)^4·u`; di atas `n+lin` hasilnya
    `u + (l−u)·((l−o)/n)^4`. Untuk (.25,.95), sepanjang l∈[.375,.625] output hampir diam di sekitar .5.
  - `scaleEase = CustomEase 'M0,0 C0.445,0 0.39,0.583 0.426,0.707 0.457,0.816 0.424,1 1,1'` (2 segmen
    bezier).
- **Huruf dan ghost:**
  - SplitText per char. Tiap char punya 6 span ghost `content: attr(data-char)`.
  - Palet di `src/scss/style.scss:218`: `#fffbf0,#ffbd00,#ff5400,#ff0054,#9e0059,#3e0074`.
- **Step timeline (`script.js:328-390`).**
  - y bergerak dari `(innerH·.5 + textH·.5)/0.3` ke minus nilai itu dalam .9 s.
  - Stagger `each .005` pada semua ghostStates dalam urutan DOM. Ghost dalam satu huruf telat 5 ms satu sama
    lain; antarhuruf ±30 ms. Lag 5 ms × kecepatan ribuan px/s inilah yang jadi jejak warna.
  - Skala `.3→1` .4 s (stagger amount .1, scaleEase) mulai di .25.
  - Kata terakhir memakai `stopAtCenter`: `p => moveEase(p·.5)·2`, .45 s (hanya setengah masuk).
- **Pemicu scroll:** ScrollTrigger `'top bottom'` → `'bottom top'`, scrub 0, `tl.progress(self.progress)`. Ini
  langsung p(t).
- **Throw (`script.js:572-588`):** `duration = (−vy + sqrt(vy² + 2g·fall))/g`.
- **`Grid.js`:** garis 24 px `#9000FF33`, offset scroll·0.05, stroke pixel-aligned.

**Kenapa terasa mahal.**

- SlowMo membuat kata yang lewat cepat tetap terbaca karena ada "gantungan" di tengah.
- Jejak warna lahir dari lag waktu, bukan blur, jadi tajam per lapis.
- Skala dari pusat kata membuat kata terasa satu benda.

```js
// src/js/script.js:358-372 (MIT, Antoine Wodniack)
tl.fromTo(
  ghostStates,
  { y: getTravelDistance },
  {
    y: () => stopAtCenter ? 0 : -getTravelDistance(),
    duration: stopAtCenter ? 0.45 : 0.9,
    stagger: { each: 0.005 },
    // The final word uses only the entrance half of the same movement curve.
    ease: stopAtCenter ? progress => moveEase(progress * 0.5) * 2 : moveEase,
  },
  0
```

**Lisensi:** MIT (Antoine Wodniack 2026). Dependensi: GSAP 3.15 + Lenis.

**Adaptasi.**

- **Frame-pure:** semua tween adalah fungsi p. Throw dihitung closed-form per huruf dengan RNG ber-seed.
- **Render:** Canvas2D `fillText`. Murah: ±20 char × 6 ghost per subframe.
- **Palet:** 5 warna pelangi diganti ramp 1 aksen (krem depan → lime → olive → tinta). Lihat Resep 4.
- **Tempat di film:** kata kunci bab sebagai title card ("CHIP", "UTANG") dan punchline VO.
- **Hold:** pakai varian stopAtCenter + hold ≥1.5 s. Jangan pakai versi lewat penuh untuk kata penting.
- **Risiko kiblat:** palet asli = multi-aksen/neon ✗.

**Sudah ada?**

- Echo stacking (`motion-taste/references/studio-tricks.md:73`) adalah inti jejaknya, jadi sudah ada.
- **Baru:** SlowMo rush-hang-rush, lag ghost dari stagger urutan DOM, throw balistik closed-form per huruf.

**Skor cocok: 3/5.**

---

## whatisjery/atelier-ui-codrops

**Look.** Kit komponen UI (Next 16, R3F 9, drei 10, three ^0.186, motion 14, lenis): pixel transition halaman,
lensa dispersi, riak cair, grid piksel, text roll, galeri bola, fluid.

**Teknik:** shuffled pixel cover + hint flash · lens dispersion (spectral taps) · ripple-stamp displacement FBO ·
pixel-grid velocity displacement · slot text roll · sphere gallery (tile di dalam bola → morph datar) + fbm dissolve.

**Mekanisme.**

- **Pixel transition (`src/components/pixel-transition/pixel-transition.tsx:8-101`).**
  - Kolom = `pixels` (10), baris = `round(10·.6)`. Diacak Fisher-Yates dengan `Math.random` (`:24-27`).
  - Tiap sel muncul pada `delay = slot/cells·duration` (`:77`). Default duration ⚠ belum dicek.
  - Setiap sel ke-5 (`HINT_EVERY`) berkedip abu `#818181` selama `FLASH .2 s` sebelum warna penutup.
  - Saat keluar urutannya sama.
- **Lens (`lens-media/lens-media.tsx:49-66`).**
  - Uniform: `uSize .12`, `uSoftness .5`, `uAberration .18`, `uRefraction .4`, `uDispersion 35`.
  - Mask lingkaran: `refracted = uv − toCenter·refr·mask`.
  - Loop spektral dengan bobot `clamp(1−2|t−(0,.5,1)|)`.
  - Pointer di-`damp`.
- **Liquid (`liquid-media/liquid-media.tsx:12-207`).**
  - Sprite riak di-render ke FBO yang di-clear tiap frame. Konstanta: `INITIAL_OPACITY .22`,
    `ROTATION_SPEED .1`, `SPAWN_SPACING .2`, maks 100 sprite, `radius 12`, `expandRate 11`, `decayRate 3`.
  - Per sprite: opacity `damp→0` (λ=decay), skala `+= dt·expand·s0`, rotasi `+= 2·dt·.1`.
  - Displacement: `θ = r·2π; uv += (sin θ, cos θ)·r·intensity(.2)`.
- **Pixel media (`pixel-media/pixel-media.tsx`).**
  - Grid 22×22 float NearestFilter berisi kecepatan × falloff (radius 4), dipudarkan
    `trail(.93)^(delta·REFERENCE_FPS)`.
  - Shader: `uv − offset·1.65`, RGB split .25.
- **Text roll (`text-roll/text-roll.tsx`):** `y: dir·cycles·100% → 0%`, cubic-bezier [0.84,0,0.22,1], .8 s,
  stagger per huruf.
- **Sphere gallery (`sphere-gallery/sphere-gallery.tsx:158-170`).**
  - Default: rows 7, cols 12, latitudeRange 85, gap .01, padding .03, cornerRadius .02, lensBlur .4, fov 70,
    reveal 2 s, focus 1 s, focusScale 1.7, mouseParallax .2.
  - Eases: FOCUS [0.7,0.03,0.26,0.99], REVEAL [0.4,0.2,0.15,1].
  - Vertex: posisi patch bola dari lon/lat, `mix(spherePosition, position, uFocus)`.
  - Fragment: tile `sdRoundBox` + dissolve fbm dengan ambang `mix(−.1,.95,uDissolve)`.
- **Lainnya:** fluid-distortion (DYE 512, SIM 128) stateful; page-transition = wrapper promise cover in/out.

**Kenapa terasa mahal.**

- Hint flash abu memberi ritme pada mosaic, jadi tidak terasa "random".
- Dispersi 35 tap spektral halus, bukan RGB split 3 tap yang kasar.
- Bola → datar cukup satu uniform, ditambah dissolve per tile.

```glsl
// src/components/lens-media/lens-media.tsx:52-66 (MIT per README)
float mask = (1.0 - smoothstep(uSize, uSize + uSoftness, radius)) * uHover;
vec2 refracted = vUv - toCenter * uRefraction * mask;
vec2 shift = toCenter * uAberration * mask;
vec3 color = vec3(0.0);
vec3 total = vec3(0.0);
for (int i = 0; i < MAX_DISPERSION; i++) {
    if (i >= uDispersion) break;
    float t = (float(i) + 0.5) / float(uDispersion);
    vec3 weight = clamp(1.0 - 2.0 * abs(t - vec3(0.0, 0.5, 1.0)), 0.0, 1.0);
    color += sampleMap(refracted + shift * (1.0 - 2.0 * t)) * weight;
    total += weight;
}
```

**Lisensi:** README menyebut "MIT", tapi **tidak ada file LICENSE** dan `package.json` tidak punya field
`license`. Perlakukan sebagai MIT yang belum tegas: belajar dan tulis ulang. Kalau menyalin, sertakan atribusi.

**Adaptasi.**

- **Frame-pure:**
  - Pixel cover: shuffle dengan RNG ber-seed (mis. mulberry32).
  - Liquid: closed form per stamp `{x,y,birth}` dari jalur kursor authored, dengan
    `opacity = .22·exp(−3·age)`, `scale = s0(1 + 11·age)`, `rot = .2·age`.
  - Pixel media: sequential dt tetap, atau jumlah stamp closed-form.
  - Text roll dan sphere: fungsi t.
- **Jalur render:**
  - Sphere masuk engine three.js (`motion-video-engine`), dengan `uFocus` dan `uDissolve` dari t.
  - Lens: 1 pass WebGL2.
  - Pixel cover dan text roll: Canvas2D.
- **Tempat di film:**
  - **Sphere gallery** untuk pembuka bab "dinding bukti": kamera di tengah bola foto, lalu satu foto mendatar
    dan fokus. Ini pas dengan bahasa "3D camera through collage".
  - Lens untuk menyorot detail dokumen/UI.
  - Text roll untuk angka/label di UI sim.
  - Pixel cover hanya untuk dunia piksel (`motion-taste/references/transitions.md:27`).
- **Risiko kiblat:** dispersi berlebih jadi neon. Lens hanya saat bergerak.

**Sudah ada?**

- Mosaic dan whipMosaic (`engine-api.md:55-56`), CA, refractive glass sudah ada. Hint flash pada mosaic baru.
- Slot/text roll **tidak ada** di 6 file.
- Sphere gallery baru. Yang ada hanya marquee teks melingkar di `studio-tricks.md:86`.

**Skor cocok: 4/5.**

---

## twotwentytwo-studio/codrops-paper

**Look.** Situs bertema kertas: halaman berkerut dan terlipat dengan tinta fluida, seam sobek antarsection, slide
foto di dalam bingkai, lensa barrel. **WebGPU/WGSL saja** (Nuxt/Vue).

**Teknik:** paper warp (swirl + twist di sekitar "tangan") · paper relief (folds/crumples) dimask tinta · ragged seam
dengan soft dari velocity · barrel lens 17-tap dispersion · LUT ease 25 sampel · critically-damped hand spring.

**Mekanisme.**

- **`app/shaders/paper.ts:4-74` (port Apache dari @paper-design/shaders 0.0.80).**
  - Konstanta: `DISTORTION .25`, `SWIRL .8` ×10 iterasi, `SHAPE_SCALE .5`, `TWIST 2.1`, `REACH 2.4`,
    `DRAW_IN .3`.
  - Urutan: displacement sudut valueNoise → `spin2` di sekitar tangan → loop swirl → stripes.
  - `paperSheet`: `crumpled()` (bobot jittered grid) dan `sheetFolds()` (titik lipat terdekat dari 15 titik
    acak).
- **`app/gl/paperPost.ts:24-122`.**
  - Normal relief = `folds·min(5·CONTRAST,1)·4·creases + crumples`, dimask oleh dye (tinta fluida, gain 2.4).
  - `uv += normal·lift·.02`; `lightness = 1 + (dot(normalize(vec3(n,z)), normalize(1,2,1)) − lit.z)·relief`.
  - Default: relief .5, folds .65, crumples .61, lift .6, SCALE .51, CONTRAST .26, FOLD_COUNT 5.
- **`app/materials/seam.ts:8-58` (tanpa lisensi, diringkas, tidak dikutip).**
  - Tepi ragged = `uv.y + field·noise(.18)`. Lebar soft = `.012 + |velocity|/60`, di-clamp.
  - `over = smoothstep(.5−soft, .5+soft, ragged)`. Garis 2 px via `fwidth`.
  - Tangan menarik tepi (`DRAG .55`).
- **`materials/slide.ts`:** ZOOM 1.5, LAG .16 untuk parallax di dalam bingkai.
- **`materials/lens.ts` (Apache).**
  - Barrel: `map = tan(min(rn·bulge, 1.53))/tan(bulge)`. Di-clamp di bawah π/2, jadi tidak pernah meledak.
  - 17 tap dispersi dengan swirl, bobot `1−hueColor(.6+t)`.
  - Parameter: spread .25, swirl .08, lens .9, bulge .5, zoom .05.
- **`utils/snappy.ts`:** LUT ease 25 sampel (0, .0191, .062, .1566, .3378, .5335, .6892, .8, .8686, .912, …, 1).
- **`plugins/pointer.client.ts`:** tangan memakai spring kritis (response .28, dampingRatio 1, pull .35).
- **`SiteCurtain`:** fade 350 ms.

**Kenapa terasa mahal.** Cahaya mengikuti lipatan, dan lipatan hanya muncul di tempat bertinta. Barrel `tan()`
aman di tepi. Ease diambil dari LUT hasil ukur, bukan bezier standar.

```wgsl
// app/shaders/paper.ts:58-70 (Apache-2.0 port of Paper Shaders — "Powered by Paper Shaders")
let n1 = valueNoise(uv * 1.0 + t);
let n2 = valueNoise(uv * 2.0 - t);
let angle = n1 * 6.28318530718;
uv.x = uv.x + 4.0 * ${f(DISTORTION)} * n2 * cos(angle);
uv.y = uv.y + 4.0 * ${f(DISTORTION)} * n2 * sin(angle);
uv = hand + spin2(uv - hand, near * ${f(TWIST)}) * (1.0 - near * ${f(DRAW_IN)});
for (var i = 1.0; i <= ${f(SWIRL_ITERATIONS)}; i = i + 1.0) {
  uv.x = uv.x + ${f(SWIRL)} / i * cos(t + i * 1.5 * uv.y);
  uv.y = uv.y + ${f(SWIRL)} / i * cos(t + i * 1.0 * uv.x);
}
```

**Lisensi: CAMPUR, RED FLAG.**

- `vendor/domgl` dan `vendor/motion` (`@domgl/motion`) berlabel **"UNLICENSED"**, proprietary, all rights
  reserved (Jesper Landberg). **Jangan disentuh atau disalin.**
- Port Paper Shaders (`app/shaders/paper.ts`, `app/gl/paperPost.ts`, `app/materials/lens.ts`, `paperDot` di
  domgl) berlisensi Apache-2.0. Kalau dipakai, wajib membawa NOTICE (`THIRD-PARTY-NOTICES.md`).
- Kode app lainnya (komponen Vue, `seam.ts`, `slide.ts`) **tanpa lisensi**: belajar saja, jangan salin kode.

**Adaptasi.**

- **Frame-pure:** semua fungsi t, kecuali tinta fluida (sim) dan spring tangan (sequential).
- **WebGPU headless ⚠ belum pasti jalan.** Port WGSL ke GLSL ES 3.0 untuk WebGL2 (`let/var` → `float`,
  `vec2f` → `vec2`, `fn` → fungsi GLSL).
- **Tempat di film:** barrel lens Apache untuk sorotan UI/dokumen; prinsip velocity → soft (sudah tercakup di
  Seam).
- **Risiko kiblat tinggi:** kertas berkerut/terlipat = "kertas lagi" (konsep kertas sudah ditolak Ikhsan).

**Sudah ada?** Lens/refraksi dan CA sudah ada. Relief kertas baru, tapi bertentangan dengan kiblat.

**Skor cocok: 2/5.**

---

## BertovDev/cursor-shader-trail

**Look.** Teks/logo besar disingkap oleh jejak kursor bertinta. Jejaknya menyebar di grid, di-dither Bayer, dan
warnanya berubah dengan kecepatan. Intro memakai kursor authored yang menyapu sendiri.

**Teknik:** grid trail DataTexture (flow + speed) · brush stamp patterns · flow-warped UV · simplex ink threshold +
directional blur · Bayer 4×4 dither · speed colour ramp + edge bloom · authored intro sweep.

**Mekanisme.**

- **Renderer:** three ^0.182 **WebGPU + TSL**. `components/webgpu-scene.tsx` memanggil `new WebGPURenderer(...)`
  dan `await renderer.init()`. Tidak ada `forceWebGL` di source. Fallback ke WebGL2 ⚠ belum diverifikasi di
  mirror.
- **`lib/tsl/interactivity/use-grid-trail-texture.ts:81-264`.**
  - Tiap frame RGB dikali `decay` (`:241-243`, `:264`). Decay ini **per frame display, tidak dinormalisasi dt**:
    default hook .75 (`:81`), demo .97 (`components/shader-trail/…:153`).
  - Deposit dalam `mouseRadius = size·radius`. Gaya lingkaran `clamp(r/dist,0,10)`.
  - Pola brush `(1−rNorm)^falloff·mask·brushScale`: hatch, corner, crossSquareCorner, cross, star.
  - Isi tekstur: R/G = arah (dx, dy dibalik), B = speed (di-clamp 1).
  - Demo: grid 202, radius .05, strength .7, influenceGain .3, gamma .9, brushRepeat 6, thickness .44,
    falloff 2.6, scale 2, filter nearest. `pointerOverrideRef` memungkinkan jalur authored menggantikan mouse.
- **`lib/tsl/shader-trail/build-color-node.ts`.**
  - Blur jejak 9 tap; `warpedUv = uv + flow·.45`.
  - Ambang tinta simplex (threshold .54, softness .01, jitter .08) + blur noise berarah 12 tap (.044).
  - Bayer 4×4 (pixel 2, spread .44, levels 3, opacity .17), grain .3.
  - Ramp warna low/mid/high menurut speed, bloom `pow(edge/(1−speed), 1.4)` (edge .05), vignette .45.
- **`bayer-texture.ts`:** `BAYER_4X4 = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5]`.

**Kenapa terasa mahal.**

- Jejak punya **arah** (flow), bukan cuma intensitas, jadi tinta tertarik searah gerakan.
- Brush pattern di grid memberi tekstur cetak.
- Intro authored membuat demo hidup tanpa interaksi.

```ts
// components/shader-trail/shader-trail-experience.tsx:228-245 (MIT, Bautista Berto)
uniforms.introReveal.value = p * p * (3 - 2 * p)
// The cursor keeps easeOutCubic, so it still leaves fast and settles.
const t = 1 - (1 - p) ** 3
const rad = (params.intro.direction * Math.PI) / 180
const dirX = Math.cos(rad)
const dirY = Math.sin(rad)
const span = Math.abs(dirX) + Math.abs(dirY)
const swing = Math.sin(t * Math.PI * 2) * params.intro.wave * 0.5
// UV space: x right, y up.
const uvX = 0.5 + dirX * (t - 0.5) * span - dirY * swing
const uvY = 0.5 + dirY * (t - 0.5) * span + dirX * swing
```

**Lisensi:** MIT (Bautista Berto 2026).

**Adaptasi.**

- **Deterministic sequential:**
  - Sim grid dimajukan **sekali per frame output** dengan dt tetap 1/30, mulai dari frame 0 shot. Taruh di
    `post`, atau cache per `f`.
  - Konversi decay: kalau demo di-tune di 60 Hz (⚠ asumsi), decay kita per frame 30 fps = `decay^2`.
  - Seek di Motion Studio = replay dari awal shot. 202² sel × N frame masih ringan. Cache sim kalau sering seek.
- **Jalur render:** port TSL ke GLSL WebGL2, atau Canvas2D (grid 202² di-upscale nearest + dither).
- **Tempat di film:**
  - UI sim: kursor authored menyapu tombol/judul dan "menyingkap" layar. Jalurnya = intro sweep di atas.
  - Bab teknologi (AI "melihat").
- **Risiko kiblat:** dither dan grain = resep brutal/editorial, tidak boleh dicampur dengan glass/UI bersih dalam
  satu frame (`light-atmosphere.md:37`). Ramp warna diganti 1 aksen.

**Sudah ada?**

- Bayer 4×4 dither (`motion-taste/references/light-atmosphere.md:37`) dan visual handoff kursor
  (`transitions.md:20`) sudah ada.
- **Baru:** grid trail dengan flow + brush stamps, dan kursor intro authored ber-swing.

**Skor cocok: 3/5.**

---

## edoardolunardi/ascii-logo

**Look.** Logo 3D diterangi lampu studio lalu dirender sebagai ASCII yang **membentuk tepi**. Karakter dipilih
menurut bentuk lokal (`/ \ | _ ( )`), bukan hanya kepadatan.

**Teknik:** 3-pass ASCII (scene → cell → glyph) · shape vector 6 sampel lingkaran berselang · directional contrast
dari 10 sampel luar · nearest-glyph brute force · studio light + ACES sebelum konversi.

**Mekanisme.**

- **`src/ascii-logo/renderer.js`:** tiga pass.
  1. Scene ke target offscreen, `SCENE_CELL_PX = 12` per baris sel.
  2. Cell pass: satu fragment per sel ke target cols×rows. Index glyph disimpan di `alpha/255`.
  3. Post: glyph diambil dari atlas (`textureGrad`) dengan warna tinta.
- **`shaders/cell.frag.glsl`.**
  - INNER: 6 lingkaran di (0.28,.26), (0.72,.14), (0.28,.56), (0.72,.44), (0.28,.86), (0.72,.74). Kolom kiri
    dan kanan berselang naik-turun.
  - OUTER: 10 titik. Tiap lingkaran = 7 tap (ring `r = cellH·0.161`).
  - Lalu `dirContrast`: `pow(v/max(v,ext), EDGE_CONTRAST 3.0)·peak` (`:68-76`, `:99-104`), disusul kontras
    global `pow(v/peak, CONTRAST 1.5)·peak` (`:18`, `:110`).
  - Glyph terdekat dari 95 dicari brute force (`texelFetch tShapes`, `:114-`).
- **`glyph-atlas.js`.**
  - ASCII 32–126, tinggi sel 64, PAD 8.
  - Vektor bentuk = coverage alpha dalam lingkaran `r = cellH·.26` di titik INNER, **dinormalisasi per sampel
    oleh maksimumnya di semua glyph**.
- **`scene.frag.glsl`.**
  - Dome gradien .05→.4, key lobe pow 6 ×1.85, rim pow 40 ×4.5, Fresnel, ACES, sRGB.
  - Di kertas terang, tone dibalik dengan lantai .18.
- **`element.js`.**
  - Konfigurasi: cellW 6, lineRatio 1.6, maxCells 4600.
  - Idle: `wave = elapsed/4`, `rotX = cos(wave)/8`, `rotY = sin(wave)/8`, `rotZ = sin(wave)/20`,
    `bob = sin(elapsed/1.5)/10·1.4`.
  - Damp `1−exp(−dt/tau)`, orbitTau 70.

**Kenapa terasa mahal.** Karakter mengikuti arah tepi (shape vector + kontras berarah), jadi terbaca seperti
ilustrasi garis, bukan hujan "Matrix". Cahaya studio dikerjakan dulu, baru dikonversi, jadi volumenya tetap terasa.

```glsl
// src/ascii-logo/shaders/cell.frag.glsl:68-76, 99-104 (MIT, Codrops)
float dirContrast(float value, float ext) {
  float peak = max(value, ext);
  if (peak < 1e-4) {
    return value;
  }
  return pow(value / peak, EDGE_CONTRAST) * peak;
}
v[0] = dirContrast(v[0], max(max(e[0], e[1]), max(e[2], e[4])));
v[1] = dirContrast(v[1], max(max(e[0], e[1]), max(e[3], e[5])));
v[2] = dirContrast(v[2], max(e[2], max(e[4], e[6])));
v[3] = dirContrast(v[3], max(e[3], max(e[5], e[7])));
v[4] = dirContrast(v[4], max(max(e[4], e[6]), max(e[8], e[9])));
v[5] = dirContrast(v[5], max(max(e[5], e[7]), max(e[8], e[9])));
```

**Lisensi:** MIT (Codrops). Shader boleh diport langsung dengan notice.

**Adaptasi.**

- **Frame-pure:** pose idle sudah fungsi waktu. Damp diganti closed form `exp`.
- **Jalur render:**
  - Versi penuh = port 3 pass ke engine three.js (WebGL2, murah).
  - Versi Canvas2D yang disederhanakan ada di Resep 5. Biayanya 10–20 ms/panggilan, jadi set `scene.K = 1`.
  - Di 1080p, cellW 6 menghasilkan ±35k sel, di atas maxCells 4600. Untuk video pakai sel 12–16 px.
- **Tempat di film:**
  - Title card bab teknologi ("cara AI melihat").
  - Logo perusahaan dalam cerita data.
  - **Transisi foto → ASCII → foto** sebagai teknik baru satu film.
- **Risiko kiblat:** klise "Matrix hijau" + neon ✗. Pakai tinta di off-white atau putih di tinta; lime hanya untuk
  satu kata/area.

**Sudah ada?** ASCII **tidak ada** di 6 file, jadi baru.

**Skor cocok: 4/5.**

---

## 0xdhrv/lilpix

**Look.** Robot kubus kecil dengan wajah piksel (eye grid via satu InstancedMesh), LED RGB dengan bloom,
15 ekspresi, kostum beranimasi, 17 backdrop, dan transisi halaman "prism sweep".

**Teknik:** luminance-normalised glow gain · bloom threshold 1 (hanya emissive yang glow) · LED modes
(breathe/blink/chase/rainbow) · squash-open expression swap · jittered pulse envelope · Fibonacci-sphere burst
closed-form · clip overscan mengikuti sweep shader.

**Mekanisme.**

- **LED (`src/Bot.tsx:134-163`).**
  - Gain = `min(14, LED_GLOW(2)/luminance(color))`, dengan luminance Rec.709. Biru glow sekuat hijau.
  - Mode: breathe `.25 + .75(.5+.5·sin((t·speed + i·.15)·2π))`; blink `(t·speed)%1 < .5 ? 1 : .06`; chase
    `floor(t·speed)%3 == i ? 1 : .1`; rainbow lewat HSL.
- **Mata (`Bot.tsx:247-265`).**
  - Kedip: `elapsed % 4 > 3.85`, lalu `scale.y` di-damp (λ 18).
  - Ganti ekspresi: `scale.y = .05`, lalu damp ke 1 (squash-open).
- **Bloom (`App.tsx:303-309`):** `mipmapBlur`, `luminanceThreshold 1`, `luminanceSmoothing 0`, intensity 1.4 di
  tema gelap / 2 di tema terang, radius .7. Hanya emissive LED yang dipaksa >1.
- **`costume-motion.ts`.**
  - Bentuk umum: `Motion = (t, rig) => Pose`, fungsi waktu (ms).
  - Eases: out (.22,1,.36,1), in (.55,0,1,.45), inOut (.65,0,.35,1), snap (.2,0,0,1).
  - `pulse()` (`:69-86`): attack/hold/release dengan jitter `hash(k)` per beat.
  - `spring()` (`:88-111`): substep 1/240 s dengan state, jadi sequential.
  - `fireworks()` (`:436-479`):
    - 18 arah Fibonacci sphere (golden angle 2.39996).
    - Shell naik selama 520 ms (ease.out).
    - Ledakan: `spread 19·ease.out(f)`, `fall 9f²`, `r 1.8(1−f)^.6`, posisi di-hash per siklus.
- **`src/sweep.ts`.**
  - Cross-document View Transition + paket `glimm` (`playSweep`, palette "prism", 550 ms).
  - Clip `inset` mengikuti `edge = clamp(−0.2 + 1.4p)`, jadi pita shader lewat dulu dan clip menyusul.
  - Shader glimm tidak ada di mirror ⚠ belum diverifikasi.
- **`scripts/loop-svg.ts`:** SVG animasi SMIL (`calcMode="discrete"` keyTimes per ekspresi, keySplines
  `.45 0 .55 1`).

**Kenapa terasa mahal.**

- Warna berbeda punya terang glow yang sama.
- Hanya satu jenis sumber yang melewati ambang bloom.
- Pulse diberi jitter supaya tidak metronomik.
- Ekspresi berganti dengan squash, bukan cut.

```ts
// src/costume-motion.ts:69-86 (MIT, Dhruv Suthar)
function pulse(t: number, period: number, delay: number, attack: number,
  hold: number, release: number, jitter: number) {
  if (t < delay) return 0;
  const a = t - delay;
  const k = Math.floor(a / period);
  const x = a - k * period - hash(k) * jitter * (period - attack - hold - release);
  if (x < 0) return 0;
  if (x < attack) return ease.snap(x / attack);
  if (x < attack + hold) return 1;
  return 1 - ease.inOut(clamp01((x - attack - hold) / release));
}
```

**Lisensi:** MIT (Dhruv Suthar 2026).

**Adaptasi.**

- **Frame-pure:** hampir semua sudah fungsi t. `spring` diganti `spring(s)` closed-form milik engine
  (`engine.js:39`); damp diganti `exp`.
- **Tempat di film:**
  - `pulse` jitter untuk indikator "hidup" di UI sim (dot rekam, status online).
  - Prinsip bloom-threshold-1 untuk memastikan glow lime hanya di satu elemen (neon ≈1%).
  - Fibonacci burst untuk ledakan angka/partikel closed-form.
- **Risiko kiblat:** maskot imut, LED pelangi, dan backdrop gradien off-tone. Ambil prinsipnya saja.

**Sudah ada?** "Exponential glow profile" (`light-atmosphere.md:57`) mirip. **Baru:** glow gain dinormalisasi
luminance dan jittered pulse.

**Skor cocok: 2/5.**

---

## Pola lintas repo

1. **Tiga angka menyetir semuanya.** Sumbernya `progress` (0–1), `travel` (px) untuk menggeser noise, dan
   `velocity` (px/s). Seam, Lookbook dan Paper sama. Begitu velocity = turunan jalur authored, semuanya
   frame-pure.
2. **Overscan progress.** Tepi dimulai dan diakhiri di luar frame, supaya tidak ada frame "setengah garis di tepi
   layar":
   - `mix(−.01, 1.01, lead)` (Lookbook)
   - `p·1.4 − .25` (contour)
   - `clamp(−.2 + 1.4p)` (lilpix)
3. **Gambar menentukan koreografinya** (paling penting untuk film dokumenter kita).
   - Waktu tiba per piksel = `mix(geometri, tone foto, pull)`: shadow-first, lift, contour, garis air.
   - Transisi terasa lahir dari foto, bukan tirai tempel.
4. **Tepi reaktif kecepatan.** Tajam saat diam, feather/spread naik saat cepat (ink, paper seam, typeset
   scramble). Ini prinsip *speed-reactive optics* yang sudah ada, kini diterapkan ke tepi transisi.
5. **`fwidth` untuk lebar konstan dalam px.** Dipakai untuk hairline rim 1–2 px, garis kontur, dan rule line
   seam. Satu garis cahaya tipis di tepi depan = rasa "mahal" yang murah.
6. **Lukis selisih saja / premultiplied.** Halaman tidak pernah dicat ulang, jadi tidak ada banding atau warna
   kotor.
7. **Acak deterministik.**
   - `hash(cell + floor(t·rate))` untuk deal/beat/scramble.
   - `Math.random` + Fisher-Yates (pixel transition, crumble, liquid) wajib diganti RNG ber-seed.
8. **State → stamp.**
   - Riak, jejak dan ledakan bisa ditulis sebagai daftar kejadian `{pos, birth}` dengan rumus closed-form
     (`exp(−λ·age)`, `s0(1+k·age)`, balistik).
   - Grid sim (cursor trail, pixel-media) = sequential dt tetap, maju sekali per frame output.
9. **Durasi dan ease yang dipakai.**
   - Hover 0.7–1.4 s (power1/2/3).
   - Sweep halaman 550 ms; curtain 350 ms.
   - Lift stagger .1.
   - Text roll .8 s [0.84,0,0.22,1].
   - Sphere focus [0.7,0.03,0.26,0.99].
   - Untuk film: transisi bab 1.2–1.6 s, swap foto stasiun 0.8–1.2 s.
10. **WebGPU/TSL** (paper, cursor-trail) ⚠ belum pasti jalan headless. Rute aman = port ke GLSL ES 3.0 (WebGL2).
    Semua repo WebGL2 lain sudah GLSL 300 es dan bisa diport langsung.

---

## Resep untuk engine kita

### Bekal bersama — satu pass WebGL2 offscreen untuk engine Canvas2D

```js
// GLSL noise sama dengan SeamTransitions/js/gl/glsl.js:21-45 (MIT, Codrops)
export const NOISE = `
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+1.),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+17.1; a*=.5; } return v/.97; }`;
export function makeGLPass(frag, w, h) {
  const cv = new OffscreenCanvas(w, h), gl = cv.getContext('webgl2', { premultipliedAlpha: true });
  const sh = (ty, src) => { const s = gl.createShader(ty); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const pg = gl.createProgram();
  gl.attachShader(pg, sh(gl.VERTEX_SHADER, '#version 300 es\nvoid main(){ vec2 p = vec2((gl_VertexID<<1)&2, gl_VertexID&2); gl_Position = vec4(p*2.-1., 0., 1.); }'));
  gl.attachShader(pg, sh(gl.FRAGMENT_SHADER, '#version 300 es\nprecision highp float;\nout vec4 o;\n' + NOISE + frag));
  gl.linkProgram(pg); gl.useProgram(pg); gl.bindVertexArray(gl.createVertexArray());
  const loc = {}, L = n => (loc[n] ??= gl.getUniformLocation(pg, n));
  return { cv, gl,
    texture(name, src, unit = 0) {                     // sekali per foto (mipmap untuk tone(uv, lod))
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src); gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); gl.uniform1i(L(name), unit); },
    draw(u) {
      for (const [n, v] of Object.entries(u)) Array.isArray(v) ? gl[`uniform${v.length}fv`](L(n), v) : gl.uniform1f(L(n), v);
      gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3); return cv; } };
}
```

Catatan: `draw()` mengembalikan kanvas yang sama. Langsung `drawImage` sebelum `draw()` berikutnya. Untuk shot
transisi, cache hasil per frame (kunci `Math.round(t·FPS)`) atau set `scene.K = 2`.

### Resep 1 — Seam tinta antarbab (SeamTransitions 01 Ink, digerakkan `travel(t)`)

**Pakai:** pergantian Bab N → N+1. Foto/kolase stasiun terakhir (A) "luber" ke kartu bab baru (B) sambil tepinya
naik dari bawah. Varian peta: ganti medan `g` dengan contour (`fract(g·10 + travel/240)/fwidth`) untuk masuk ke
bab peta. **Frame-pure.**

```js
const INK_FRAG = `uniform vec2 uSize; uniform float uEdge, uUp, uDown, uTravel, uProgress, uVelocity, uMode;
void main(){
  vec2 px = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);          // y ke bawah seperti vPx
  float d = px.y - uEdge;                                             // >0 = di bawah tepi A
  vec2 q = (px + uTravel*vec2(.08,.47))/300.; vec2 w = vec2(fbm(q), fbm(q+vec2(5.2,1.3)));
  float g = (fbm(q*1.2+2.2*w)-.42)*2.8 + (fbm(px/24.+3.*w)-.5)*.35
          + pow(fbm(vec2(px.x/26., (px.y-uTravel*.16)/140.)), 3.)*.9;
  float spread = smoothstep(0.,.35,uProgress) + min(abs(uVelocity)/3000., .35);
  float reach = g > 0. ? uDown*tanh(g*spread*.9) : -uUp*tanh(-g*spread*.5);
  float s = d - reach;
  float soft = max((.8 + min(abs(uVelocity)*.004, 8.))*smoothstep(0.,.03,uProgress), .001);
  float h = 1. - smoothstep(-soft, soft, s);                          // 1 = masih A
  float rim = (1. - smoothstep(0., 14., -s)) * step(0., d);
  o = uMode < .5 ? vec4(h) : vec4(0., 0., 0., .45*rim*h);            // 0: mask A, 1: gelap tepi tinta
}`;
const ink = makeGLPass(INK_FRAG, W, H), bufA = new OffscreenCanvas(W, H), ax = bufA.getContext('2d');
const trav = (t, t0, D, up) => (H + up + 40) * E.brake(clamp((t - t0) / D));   // "scroll" authored, px
function drawInkSeam(ctx, t, { t0, D = 1.4, A, B, up = 420, down = 380 }) {
  const tr = trav(t, t0, D, up), h = 1 / FPS;
  const vel = (trav(t + h, t0, D, up) - trav(t - h, t0, D, up)) / (2 * h);   // turunan jalur, px/s
  const u = { uSize: [W, H], uEdge: H - tr, uUp: up, uDown: down, uTravel: tr, uProgress: clamp(tr / H), uVelocity: vel };
  B(ctx, t);                                                           // bab baru di bawah
  ax.globalCompositeOperation = 'source-over'; ax.clearRect(0, 0, W, H); A(ax, t);
  ax.globalCompositeOperation = 'destination-in'; ax.drawImage(ink.draw({ ...u, uMode: 0 }), 0, 0);
  ax.globalCompositeOperation = 'source-over'; ax.drawImage(ink.draw({ ...u, uMode: 1 }), 0, 0);
  ctx.drawImage(bufA, 0, 0);
}
```

**Knobs:**

- `D` 1.2–1.6 s.
- Ease jalur:
  - `E.brake`: cepat lalu mengerem panjang, jadi feather lebar di awal lalu tajam.
  - `E.inOutCubic` lebih tenang.
- `up/down` (ruang tinta), skala noise 300/24/26/140 px.
- Batas spread `/3000`, batas feather `.004`, gelap rim .45.
- SFX: satu tekstur basah/serat pada `t0` + riser lembut. Bukan whoosh per tepi.

### Resep 2 — Sapuan kunci-luma "shadow-first" (Lookbook 01)

**Pakai:** ganti foto antar stasiun dokumenter. Foto B masuk lewat bayangan foto A dulu, baru terangnya, dengan
satu hairline cahaya di tepi depan. **Frame-pure.** Biaya: 1 upload foto + 1 pass per frame.

```js
const LUMA_FRAG = `uniform sampler2D uPhoto; uniform vec2 uSize, uTones; uniform vec3 uSweep;
uniform float uPull, uLead, uTrail, uLight, uMode;
float tone(vec2 uv, float lod){ float l = dot(textureLod(uPhoto, uv, lod).rgb, vec3(.2126,.7152,.0722));
  return clamp((l - uTones.x)/(uTones.y - uTones.x), 0., 1.); }
float rim(float t, float e, float w, float side){ float px = side*(t-e)/w;
  return smoothstep(-1.,0.,px)*(1.-smoothstep(1.,2.5,px)) * (1.-smoothstep(0.,.02,abs(t-e))); }
void main(){
  vec2 uv = gl_FragCoord.xy / uSize; float d = dot(uv, uSweep.xy) + uSweep.z;
  float t = mix(d, mix(tone(uv,2.), tone(uv,4.5), .5), uPull);        // gelap = t kecil = tercapai duluan
  float w = max(fwidth(t), 1e-5), lead = mix(-.01,1.01,uLead), trail = mix(-.01,1.01,uTrail);
  float cov = (1.-smoothstep(lead-1.5*w, lead, t)) * smoothstep(trail-1.5*w, trail, t);
  float light = max(rim(t,lead,w,1.), rim(t,trail,w,-1.)) * uLight * (1.-cov);
  o = uMode < .5 ? vec4(cov) : vec4(vec3(1.,.97,.92)*light, light);
}`;
function percentiles(img, lo = .02, hi = .98) {                      // sekali per foto, salinan 240 px
  const c = new OffscreenCanvas(240, 135), x = c.getContext('2d'); x.drawImage(img, 0, 0, 240, 135);
  const d = x.getImageData(0, 0, 240, 135).data, L = [];
  for (let i = 0; i < d.length; i += 4) L.push((.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255);
  L.sort((a, b) => a - b); return [L[(lo * L.length) | 0], L[(hi * L.length) | 0]];
}
const lw = makeGLPass(LUMA_FRAG, W, H), bufB = new OffscreenCanvas(W, H), bx = bufB.getContext('2d');
// sekali: lw.texture('uPhoto', frameA); const tones = percentiles(frameA);
function drawLumaWipe(ctx, t, { t0, D = 1.0, A, B, tones, pull = .75, light = .2, sweep = [1, 0, 0] }) {
  const k = clamp((t - t0) / D), u = { uSize: [W, H], uTones: tones, uSweep: sweep, uPull: pull,
    uLead: 1 - (1 - k) ** 2, uTrail: 0, uLight: light };                // power1.out (CONFIG asli), trail diam
  A(ctx, t);
  bx.globalCompositeOperation = 'source-over'; bx.clearRect(0, 0, W, H); B(bx, t);
  bx.globalCompositeOperation = 'destination-in'; bx.drawImage(lw.draw({ ...u, uMode: 0 }), 0, 0);
  ctx.drawImage(bufB, 0, 0); ctx.drawImage(lw.draw({ ...u, uMode: 1 }), 0, 0);   // hairline cahaya
}
```

**Knobs:**

- `pull` .5–.85: semakin besar, semakin foto yang mengatur.
- `D` .8–1.2 s, `light` .15–.25.
- `sweep` (arah xy + offset z): `[1,0,0]` kiri→kanan, `[0,-1,1]` bawah→atas.
- Persentil (dihitung di sRGB, ⚠ sumber tidak menyebut ruang warnanya).
- Kalau A bergerak (camera drift), upload ulang `frameA` per frame (±2–4 ms + mipmap) atau tahan A diam
  selama wipe.
- `uTrail` beranimasi = kartu lewat lalu pergi (B hanya numpang).

### Resep 3 — Lift: foto pecah jadi 3 lapis tone yang meluncur (Lookbook 04, Canvas2D murni)

**Pakai:**

- Foto bukti "terkelupas" per terang → tengah → gelap, menyingkap kartu fakta/angka di bawahnya.
- Title card bab dengan kedalaman 2.5D tanpa 3D.

**Frame-pure.** Precompute sekali per foto (±100 ms). Per subframe cukup 3 `drawImage`.

```js
function makeLiftLayers(img, smooth = 6, wE = .02) {                  // CONFIG.smooth = 6 px di foto 240 px
  const tw = 240, th = Math.round(240 * H / W), sm = new OffscreenCanvas(tw, th), sx = sm.getContext('2d');
  sx.filter = `blur(${smooth}px)`; sx.drawImage(img, 0, 0, tw, th);
  const big = new OffscreenCanvas(W, H), gx = big.getContext('2d', { willReadFrequently: true });
  gx.drawImage(sm, 0, 0, W, H);                                       // naikkan dulu, potong di resolusi penuh
  const d = gx.getImageData(0, 0, W, H).data, n = W * H, L = new Float32Array(n);
  for (let i = 0; i < n; i++) L[i] = (.2126 * d[4 * i] + .7152 * d[4 * i + 1] + .0722 * d[4 * i + 2]) / 255;
  const s = L.slice().sort(), c1 = s[(n / 3) | 0], c2 = s[(2 * n / 3) | 0];
  const ss = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
  return [[c2, 9], [c1, c2], [-9, c1]].map(([lo, hi]) => {            // 0 terang, 1 tengah, 2 gelap
    const m = new ImageData(W, H);                                    // menyelip sedikit di bawah lapis atas
    for (let i = 0; i < n; i++) m.data[4 * i + 3] = 255 * ss(lo - wE, lo + wE, L[i]) * (1 - ss(hi + wE, hi + 3 * wE, L[i]));
    const lc = new OffscreenCanvas(W, H), lx = lc.getContext('2d'); lx.putImageData(m, 0, 0);
    lx.globalCompositeOperation = 'source-in'; lx.drawImage(img, 0, 0, W, H); return lc;
  });
}
const io2 = k => k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;      // power2.inOut
function drawLift(ctx, t, { t0, layers, under, D = 1.4, stagger = .1, dir = [1, 0], OFF = 1.02 }) {
  const p = clamp((t - t0) / D);
  under(ctx, t);                                                      // kartu fakta / foto B
  for (let k = 2; k >= 0; k--) {                                      // gelap digambar dulu, terang di atas
    const own = io2(clamp((p - k * stagger) / (1 - 2 * stagger)));    // terang (k=0) berangkat duluan
    ctx.drawImage(layers[k], dir[0] * OFF * W * own, dir[1] * OFF * H * own);
  }
}
```

**Knobs:**

- `stagger` .08–.15, `D` 1.2–1.6 s, `dir` (keluar ke samping/atas).
- `smooth` (kehalusan outline lapis), `wE` (lebar selipan, ⚠ nilai `w` asli tidak terbaca; .02 adalah pilihanku).
- Tambahan opsional yang tetap frame-pure: shadow tipis per lapis (`ctx.shadowBlur` 20–40, alpha .25) dan skala
  1→1.03 di lapis terang untuk parallax.
- SFX: tiga gesekan kertas-foto pendek (non-tonal), mengikuti stagger.

### Resep 4 — Kata bab dengan jejak ghost + SlowMo (AntoineW), 1 aksen

**Pakai:** title card bab dan punchline. Kata menerjang masuk, menggantung tepat di tengah, lalu diam (hold
≥1.5 s). Kata yang lewat penuh hanya untuk kata pendukung. **Frame-pure**, Canvas2D.

```js
// GSAP SlowMo, dibaca dari bundle dist: slow(.25, .95, false) = moveEase di script.js
const slowMo = (lin = .25, pow = .95) => { const r = lin < 1 ? pow : 0, n = (1 - lin) / 2, o = n + lin;
  return l => { const u = l + (.5 - l) * r;
    if (l < n) return u - (1 - l / n) ** 4 * u;
    return l > o ? u + (l - u) * ((l - o) / n) ** 4 : u; }; };
const MOVE = slowMo(.25, .95);
const GHOSTS = ['#F4F1EA', '#C8F53C', '#9CBF2E', '#5F7420', '#2C3410']; // depan krem, jejak lime→tinta (bukan pelangi)
// chars: [{ ch, x }] dengan x relatif ke pusat kata (dari layout() engine)
function drawGhostWord(ctx, t, { t0, chars, cx, cy, size, D = 1.8, each = .005, settle = true, fam = 'Inter' }) {
  const span = (H * .5 + size * .5) / .3;                            // getTravelDistance di sumber
  const dur = settle ? D * .5 : D, lagK = D / .9;                     // lag ikut diregang agar jejak px tetap
  const sc = .3 + .7 * E.brake(clamp((t - t0 - .25 * lagK) / (.4 * lagK)));  // ≈ scaleEase (lihat catatan)
  ctx.font = `800 ${size * sc}px ${fam}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let g = GHOSTS.length - 1; g >= 0; g--) {                      // jejak di belakang, depan terakhir
    ctx.fillStyle = GHOSTS[g];
    chars.forEach((c, i) => {
      const k = clamp((t - t0 - (i * GHOSTS.length + g) * each * lagK) / dur);   // stagger urutan DOM
      const y = settle ? span * (1 - MOVE(k * .5) * 2) : span * (1 - 2 * MOVE(k));
      ctx.fillText(c.ch, cx + c.x * sc, cy + y);
    });
  }
}
```

**Knobs:**

- `D` (durasi aslinya .9 s; untuk video 1.4–2.4 s).
- `each`: jejak px = lag × kecepatan.
- `GHOSTS` 3–5 lapis. Di latar terang: depan tinta `#161614`, jejak lime → `#4B6800`.
- `settle` (`stopAtCenter`).
- **Catatan:** skala memakai pendekatan `E.brake`. CustomEase asli terdiri dari 2 segmen (naik ke .707 di
  x≈.43, lalu ekor panjang); tulis piecewise-bezier kalau perlu persis.
- Motion blur engine (K subframe) akan menyambung jejak secara alami.

### Resep 5 — Judul/teknologi sebagai ASCII yang mengikuti bentuk (ascii-logo, versi Canvas2D)

**Pakai:**

- Title card bab teknologi, logo dalam cerita data.
- Transisi foto → ASCII → foto (crossfade dua lapis), sebagai teknik baru di satu film.

**Frame-pure.** Set `scene.K = 1` di shot ini (±10–20 ms per panggilan). Versi penuh = port 3 pass
`cell.frag.glsl` (MIT) ke three.js.

```js
// sekali: atlas + vektor bentuk 6 sampel (2 kolom × 3 baris), dinormalisasi per sampel atas semua glyph
function buildGlyphs(chars = ' .,:;\'"-_=+*^~!/\\|()[]<>ilIjtfrcxvzoaeumnwOQ0#%@', cw = 12, ch = 20, ink = '#F4F1EA') {
  const A = new OffscreenCanvas(cw * chars.length, ch), a = A.getContext('2d', { willReadFrequently: true });
  a.font = `500 ${ch * .85}px "JetBrains Mono"`; a.textAlign = 'center'; a.textBaseline = 'middle'; a.fillStyle = ink;
  [...chars].forEach((c, i) => a.fillText(c, (i + .5) * cw, ch / 2));
  const d = a.getImageData(0, 0, A.width, ch).data, vec = [...chars].map((_, i) => { const s = [0, 0, 0, 0, 0, 0];
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++)
      s[(x * 2 / cw | 0) + 2 * (y * 3 / ch | 0)] += d[4 * (y * A.width + i * cw + x) + 3] / 255;
    return s; });
  for (let k = 0; k < 6; k++) { const m = Math.max(...vec.map(v => v[k])) || 1; vec.forEach(v => v[k] /= m); }
  return { A, vec, cw, ch, sm: new OffscreenCanvas(2 * (W / cw | 0), 3 * (H / ch | 0)) };
}
// per frame: src = kanvas adegan (logo, peta, render 3D di latar gelap) → satu glyph per sel
function drawAscii(ctx, src, G, { gamma = 1.5, invert = false } = {}) {
  const cols = W / G.cw | 0, rows = H / G.ch | 0, sx = G.sm.getContext('2d', { willReadFrequently: true });
  sx.imageSmoothingQuality = 'high'; sx.clearRect(0, 0, G.sm.width, G.sm.height);
  sx.drawImage(src, 0, 0, G.sm.width, G.sm.height); const d = sx.getImageData(0, 0, G.sm.width, G.sm.height).data;
  const v = [0, 0, 0, 0, 0, 0];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    for (let k = 0; k < 6; k++) { const i = 4 * ((3 * r + (k >> 1)) * G.sm.width + 2 * c + (k & 1));
      const l = (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255; v[k] = invert ? 1 - l : l; }
    const pk = Math.max(...v); if (pk < .02) continue;
    for (let k = 0; k < 6; k++) v[k] = (v[k] / pk) ** gamma * pk;     // CONTRAST 1.5 (cell.frag.glsl:18)
    let best = 0, bd = 1e9;
    G.vec.forEach((g, j) => { let e = 0; for (let k = 0; k < 6; k++) e += (g[k] - v[k]) ** 2; if (e < bd) { bd = e; best = j; } });
    ctx.drawImage(G.A, best * G.cw, 0, G.cw, G.ch, c * G.cw, r * G.ch, G.cw, G.ch);
  }
}
```

**Knobs:**

- Ukuran sel `cw/ch` 10–16 / 16–26.
- Charset: makin banyak glyph berarah (`/ \ | _ ( )`), makin "menggambar".
- `gamma` 1.2–2.
- `invert` untuk kertas terang. Sumber membalik tone dengan lantai .18.
- Atlas kedua berwarna lime untuk satu area aksen saja.
- **Penyederhanaan ⚠:**
  - Sampel di sini berupa kotak 2×3 (area average via `imageSmoothingQuality='high'`). Sumber memakai 6
    lingkaran berselang × 7 tap, ditambah `dirContrast` dari 10 sampel luar.
  - Tepinya kalah tajam dibanding aslinya. Port versi WebGL kalau ASCII jadi signature film.
