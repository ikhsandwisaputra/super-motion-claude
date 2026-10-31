---
tool: D3 (d3.js)
version: d3 7.9.0 (rilis 2024-03-12, masih `latest` di npm per 2026-10-28; repo main @3d1a90c 2026-10-21 = update docs) · modul: d3-force 3.0.0 · d3-delaunay 6.0.4 · d3-ease 3.0.1 · d3-timer 3.0.1 · d3-transition 3.0.1 · d3-interpolate 3.0.1 · d3-zoom 3.0.0 · d3-drag 3.0.0 · d3-shape 3.2.0 · d3-geo 3.1.1 · d3-random 3.0.1 · d3-scale-chromatic 3.1.0 · d3-quadtree 3.0.1
official: https://d3js.org · https://github.com/d3/d3
local: repo-d3/docs/**/*.md (sumber situs d3js.org, VitePress) · repo-d3/docs/components/*.vue (contoh interaktif: force, ease, curve) · repo-d3/CHANGES.md · web/github-releases.md
fetched: 2026-10-28
---
# D3 — mesin fisika-graf, Voronoi, easing, interpolator & zoom/drag untuk motion data-driven (bukan cuma chart)

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai modul satuan** (semua ESM, tree-shakeable):
  - `d3-force`: rasi bintang/jaringan yang saling tarik, bubble cluster yang menghindar kursor, layout "fisika" tanpa engine.
  - `d3-delaunay`: Voronoi untuk **hover magnetis** (titik terdekat dari kursor, area hit tak terlihat), mosaic, relaksasi Lloyd.
  - `d3-ease` + `d3-transition`: tween SVG/DOM data-driven dengan **stagger per indeks/datum** dan chaining.
  - `d3-interpolate`: warna di ruang perseptual (Lab/Hcl/Cubehelix), `interpolateZoom` (zoom-pan halus van Wijk), `piecewise`.
  - `d3-zoom`/`d3-drag`: infinite canvas (Figma-like) untuk SVG **atau** Canvas.
  - `d3-shape` curves, `d3-geo` (globe berputar), `d3-random` (distribusi + seed), `d3-scale-chromatic` (palet).
- **Jangan**: animasi UI umum/timeline (GSAP/Motion lebih ergonomis), fisika benda kaku dengan tumbukan poligon
  (Matter/Rapier), 3D. Ribuan elemen SVG yang ditransisi → pindah ke Canvas (d3 tetap untuk matematika).

## Mental model
- **d3-force tick** (`docs/d3-force/simulation.md`): tiap iterasi `alpha += (alphaTarget − alpha) × alphaDecay` →
  setiap force dipanggil dengan alpha (gaya diskalakan alpha) → `velocity −= velocity × velocityDecay` →
  `position += velocity`. Alpha = "suhu" (simulated annealing). Default: `alpha 1`, `alphaMin 0.001`,
  `alphaDecay ≈ 0.0228 = 1 − 0.001^(1/300)` → **300 tick** lalu timer internal berhenti; `alphaTarget 0`;
  `velocityDecay 0.4` (gesekan udara). Node: `x, y, vx, vy`; **`fx/fy`** = posisi dipaku (vx=0 tiap tick); `null` = lepas.
- **Re-heating** = kunci feel interaktif: `simulation.alphaTarget(0.3).restart()` saat drag/hover mulai,
  `alphaTarget(0)` saat selesai → sistem "hidup" selama interaksi lalu dingin pelan (pola di `docs/components/Example*Force.vue`).
- Simulasi memakai **d3-timer** (antrian bersama, rAF; `setTimeout` bila delay >24 ms; `d3.now()` dibekukan per frame →
  semua animasi d3 dalam satu frame sinkron). `simulation.stop()` + `simulation.tick(n)` untuk layout statis atau
  menggerakkan dari loop sendiri (tick manual tidak memancarkan event).
- **Transition**: per elemen, bernama; dibuat → dijadwalkan di akhir frame → saat **mulai** meng-interrupt transition
  bernama sama di elemen itu (bukan saat dibuat). Default `duration 250 ms`, `ease d3.easeCubic` (= CubicInOut).
  `transition.transition()` = segmen berikutnya mulai saat ini selesai (mewarisi durasi/ease/nama). `transition.end()`
  = Promise (reject jika di-interrupt). `easeVarying(d => …)` = ease beda per datum.
- **Alias easing tidak seragam** (sering bikin salah): `easePoly/Quad/Cubic/Sin/Exp/Circle/Back` = **InOut**, tapi
  `easeElastic` dan `easeBounce` = **Out**.
- **delaunay.find(x, y, i)** berjalan dari titik `i` (default 0) menyusuri triangulasi → kirim indeks hasil sebelumnya
  saat `pointermove` agar hampir O(1). `delaunay.update()` setelah titik diubah in-place (bisa per frame).
- **d3-zoom**: transform `{k, x, y}`; wheel: `k *= 2^Δ` dengan `Δ = −deltaY × (deltaMode===1 ? 0.05 : deltaMode ? 1 : 0.002) × (ctrlKey ? 10 : 1)`
  (ctrlKey = pinch trackpad); dblclick zoom 250 ms memakai `interpolateZoom`.

## Setup minimal
```js
import { forceSimulation, forceManyBody, forceCollide, forceX, forceY } from 'd3-force';
import { select, pointer } from 'd3-selection';

const nodes = Array.from({ length: 120 }, () => ({ r: 4 + Math.random() * 14 }));
const sim = forceSimulation(nodes)
  .velocityDecay(0.2)                                   // < 0.4 = lebih licin/kenyal
  .force('x', forceX(0).strength(0.02))                 // gravitasi lembut ke tengah
  .force('y', forceY(0).strength(0.02))
  .force('collide', forceCollide(d => d.r + 1).iterations(3))
  .force('charge', forceManyBody().strength(-2))
  .on('tick', draw);                                    // render ke canvas/SVG di sini
// cleanup (SPA): sim.stop();
```

## Knob yang menentukan rasa gerak
| knob | default | efek |
|---|---|---|
| `velocityDecay` | 0.4 | 0.1 = meluncur jauh & memantul; 0.6 = kental/lembam |
| `alphaDecay` | 0.0228 (300 tick) | kecil = lama "hidup", layout lebih baik; 0 = tak pernah dingin |
| `alphaTarget` | 0 | >alphaMin = simulasi terus berjalan (0.3 saat drag); kembali 0 = mengendap |
| `forceManyBody().strength` | −30 | negatif tolak (muatan), positif tarik; `theta` 0.9 (Barnes–Hut), `distanceMin` 1, `distanceMax` ∞ (batasi utk "lokal") |
| `forceLink().distance / strength / iterations` | 30 / `1/min(count(src),count(tgt))` / 1 | pegas antar node; iterations ↑ = kaku |
| `forceCollide(r).strength / iterations` | r 1, 1 / 1 | constraint lunak anti-tumpuk; iterations 3–4 = rapat tanpa jitter |
| `forceX/forceY().strength` | 0.1 | 0.01–0.05 = gravitasi lembut; dipakai ganti `forceCenter` utk kumpulan terpisah |
| `forceCenter().strength` | 1 | geser rata-rata (bukan gaya); 0.05 melunakkan saat node masuk/keluar |
| `forceRadial(r, x, y)` | — | tarik ke lingkaran (orbit/ring) |
| `transition.delay((d, i) => i * 10)` | 0 | stagger; atau fungsi dari data (urut nilai) |
| `easePoly.exponent(e)` | 3 | 1 linear … 4–5 "snappy" |
| `easeElastic.amplitude(a ≥ 1).period(p)` | 1, 0.3 | p kecil = getar cepat |
| `easeBack.overshoot(s)` | 1.70158 | antisipasi/overshoot |
| `interpolateZoom.rho(ρ)` | √2 | 0 ≈ linear; besar = lebih "zoom out lalu masuk" |
| `interpolateRgb.gamma(g)` | 1.0 | 2.2 = gradien RGB lebih terang/rata |
| `curveCatmullRom.alpha` / `curveCardinal.tension` / `curveBundle.beta` | 0.5 / 0 / 0.85 | centripetal tanpa loop / tegangan / kekuatan bundling |

## Integrasi
- **Canvas renderer** (wajib untuk >~1k node): `sim.on('tick', () => { ctx.clearRect(...); for (const d of nodes) …})`;
  `d3.line().context(ctx)` dan `d3.geoPath(projection, ctx)` menggambar langsung ke canvas.
- **Drag pada canvas**: `drag().subject(({x, y}) => sim.find(x, y, 40))` + `fx/fy` + reheating (Setup di bawah).
- **GSAP/Motion**: d3 untuk hitung (force/interpolate/ease), GSAP untuk timeline UI; atau jalankan `sim.stop()` lalu
  `sim.tick()` dari ticker GSAP agar satu jam.
- **Lenis/scroll**: progress scroll → `alphaTarget` atau `forceX(target)` → "membangunkan" layout saat section masuk.
- **React**: buat simulasi di `useEffect`, return `() => sim.stop()`; simpan nodes di ref (d3 memutasi objek node).
- **p5/Pixi/three**: d3-force/delaunay murni matematika → tulis `x/y` ke sprite renderer apa pun.

## Resep non-generik
**1. Bubble field yang menyibak di sekitar kursor** (pola resmi `ExampleCollideForce.vue`)
```js
const nodes = Array.from({ length: 200 }, () => ({ r: 4 + Math.random() * 12 }));
const sim = d3.forceSimulation(nodes)
  .velocityDecay(0.1)                                         // licin
  .force('x', d3.forceX().strength(0.01)).force('y', d3.forceY().strength(0.01))
  .force('collide', d3.forceCollide(d => d.r + 1).iterations(4))
  .force('charge', d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3)) // node 0 = kursor tak terlihat
  .on('tick', draw);
svg.on('pointerenter', () => sim.alphaTarget(0.3).restart())
   .on('pointerleave', () => sim.alphaTarget(0))
   .on('pointermove', (e) => { [nodes[0].fx, nodes[0].fy] = d3.pointer(e); });
```
_Kenapa mahal_: kursor menjadi "benda" bermuatan — bubble mengalir menyibak lalu menutup lagi dengan inersia nyata.

**2. Drag dengan re-heating (graf terasa elastis)** (pola `ExampleLinkForce.vue`)
```js
const drag = d3.drag()
  .subject(({ x, y }) => sim.find(x - w / 2, y - h / 2, 40))
  .on('start', (e) => { if (!e.active) sim.alphaTarget(0.3).restart(); e.subject.fx = e.subject.x; e.subject.fy = e.subject.y; })
  .on('drag',  (e) => { e.subject.fx = e.x; e.subject.fy = e.y; })
  .on('end',   (e) => { if (!e.active) sim.alphaTarget(0); e.subject.fx = e.subject.fy = null; });
// grid 20×20 + forceLink(links).strength(1).distance(10).iterations(10) = "kain" yang bisa ditarik
```
_Kenapa mahal_: `iterations(10)` membuat link hampir kaku seperti kain; tarik satu titik → gelombang merambat ke seluruh jaring.

**3. Hover magnetis via Voronoi (tanpa hit area manual)**
```js
const delaunay = d3.Delaunay.from(points, d => d.x, d => d.y);
let last = 0;
canvas.addEventListener('pointermove', (e) => {
  const [mx, my] = d3.pointer(e);
  last = delaunay.find(mx, my, last);            // mulai dari hasil sebelumnya → nyaris O(1)
  highlight(points[last]);                       // radius bisa dibatasi: abaikan bila jarak > 60 px
});
// titik bergerak? mutasi delaunay.points in-place lalu delaunay.update() tiap frame
```
_Kenapa mahal_: target selalu "terdekat" — terasa seperti kursor ditarik ke data, bukan harus tepat mengenai titik kecil.

**4. Stagger koreografis + chaining + await**
```js
const tf = (a, b) => () => d3.interpolateTransformCss(a, b);   // JANGAN .style('transform', …): itu interpolateString
await d3.selectAll('.card').transition('enter')                 // vs nilai computed "matrix(…)" → hasil kacau
    .delay((d, i) => i * 45).duration(700).ease(d3.easeBackOut.overshoot(1.2))
    .styleTween('transform', tf('translateY(40px) scale(0.96)', 'translateY(0px) scale(0.96)'))
    .style('opacity', 1)                                        // angka → interpolateNumber, aman
  .transition()                                                 // mulai saat segmen 1 selesai, mewarisi durasi/ease
    .ease(d3.easeElastic.period(0.45))
    .styleTween('transform', tf('translateY(0px) scale(0.96)', 'translateY(0px) scale(1)'))
  .end();                                                       // Promise → lanjut ke fase berikutnya
```
_Kenapa mahal_: overshoot kecil + delay per indeks + fase berantai = ritme jelas, bukan semua bergerak serentak.
(`transition.style/attr` memilih interpolator dari tipe nilai target: number → Number, warna → Rgb, sisanya → String.)

**5. Zoom kamera halus antar titik (van Wijk)**
```js
const i = d3.interpolateZoom([cx0, cy0, w0], [cx1, cy1, w1]);   // [pusat x, pusat y, lebar viewport]
d3.transition().duration(i.duration * 0.8).ease(d3.easeCubicInOut)
  .tween('camera', () => (t) => { const [x, y, w] = i(t); setView(x, y, width / w); });
// atau: svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity) — pakai interpolateZoom otomatis
```
_Kenapa mahal_: lintasan zoom-out-lalu-masuk dengan durasi yang dihitung dari jarak — gerak kamera "sinematik".

**6. Globe berputar di canvas** — `const proj = d3.geoOrthographic(); const path = d3.geoPath(proj, ctx);`
lalu tiap frame `proj.rotate([λ0 + elapsed * 0.01, -20]); ctx.beginPath(); path(land); ctx.fill();` +
`d3.geoInterpolate(a, b)(t)` untuk titik bergerak di busur lingkaran besar.
_Kenapa mahal_: rotasi proyeksi (bukan gambar) menjaga garis graticule & busur tetap benar secara geometri.

## Performa, aksesibilitas, mobile
- SVG + transition per elemen nyaman sampai ratusan elemen; ribuan → Canvas (atau WebGL) dan d3 hanya menghitung.
- Many-body memakai aproksimasi Barnes–Hut berbasis quadtree (`theta` 0.9; kecil = akurat tapi lambat); batasi
  `distanceMax` untuk graf besar; `collide.iterations` dan `link.iterations` menambah biaya linear per tick.
- Simulasi berhenti sendiri saat alpha < alphaMin → hemat baterai; jangan `alphaTarget > 0` permanen tanpa alasan.
- `prefers-reduced-motion`: jalankan `sim.stop(); sim.tick(300)` lalu render statis; transisi → `duration(0)`.
- Mobile: d3-drag/zoom menangani touch & pinch (`zoom.touchable`, `tapDistance`, `clickDistance`); cegah scroll
  halaman saat drag (`touchmove` `preventDefault`, seperti contoh collide).
- Voronoi/Delaunay memberi area sentuh besar untuk titik kecil — bagus untuk jari.

## Sumber lokal
- `repo-d3/docs/d3-force/simulation.md` (+ `many-body.md`, `link.md`, `collide.md`, `position.md`, `center.md`) — semua default & algoritma tick
- `repo-d3/docs/components/ExampleCollideForce.vue` · `ExampleLinkForce.vue` · `ExampleDisjointForce.vue` — pola interaksi force (reheat, kursor-sebagai-node)
- `repo-d3/docs/d3-ease.md` (+ `components/ExampleEase.vue`) — katalog easing & parameter
- `repo-d3/docs/d3-transition/{timing,control-flow,selecting,modifying}.md` — delay/duration/ease/easeVarying, life-cycle, `end()`, chaining
- `repo-d3/docs/d3-timer.md` — timer/timeout/interval, `now()` per-frame
- `repo-d3/docs/d3-interpolate/{value,color,zoom,transform}.md` — piecewise, Lab/Hcl/Cubehelix, gamma, interpolateZoom
- `repo-d3/docs/d3-delaunay/{delaunay,voronoi}.md` — `find`, `update`, `voronoi(bounds)`, render ke canvas
- `repo-d3/docs/d3-zoom.md` · `d3-drag.md` — wheelDelta, extents, constrain, subject, event.active
- `repo-d3/docs/d3-shape/curve.md` · `line.md` — kurva + `context(ctx)` untuk canvas
- `repo-d3/docs/d3-geo/{projection,path,math,azimuthal}.md` — rotate, geoPath(context), geoInterpolate
- `repo-d3/docs/d3-random.md` (distribusi + `source(randomLcg(seed))`) · `d3-scale-chromatic/*.md` (Turbo/Viridis/Magma/Sinebow…)
- `repo-d3/CHANGES.md` — perubahan mayor v4–v7 (ESM murni sejak 7.0, event dikirim ke listener sejak 6.0, d3-delaunay menggantikan d3-voronoi)
