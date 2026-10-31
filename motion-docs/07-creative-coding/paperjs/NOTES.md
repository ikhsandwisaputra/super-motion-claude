---
tool: Paper.js
version: 0.16.0 (npm `latest`, rilis 2026-10-21; repo develop @c8457b1 2026-10-28) — dicek 2026-10-28
official: http://paperjs.org (redirect ke https) · https://github.com/paperjs/paper.js
local: repo-paper.js/src/ (JSDoc = reference) · repo-paper.js/CHANGELOG.md + changelog/unreleased/ · repo-paper.js/examples/ · web/{tutorials,reference}/
fetched: 2026-10-28
---
# Paper.js — scene graph vektor di canvas: matematika Bézier, boolean path, smoothing, hit-test, tool gambar

## Status maintenance (penting)
- Lama dorman: 0.12.16 (2022-10) → 0.12.17 (2022-11) → 0.12.18 (2024-07). Lalu **dihidupkan lagi Oktober 2026**
  oleh penulis aslinya (Jürg Lehni): 0.12.19 (2026-10-18, **fix XSS `importSVG()`** — SVG kini dirender di iframe
  sandbox), 0.12.20, 0.13.0, 0.14.0 (2026-10-19), 0.15.0, 0.16.0 (2026-10-21) — 6 rilis dalam 4 hari, commit harian.
- Fokus rilis baru banyak ke "hosted projects" (host dokumen eksternal, `paper-sourced.js`), mesin teks
  (`PathText`, `AreaText`, `TextRange`, `Item#textWrap`, 0.15), SVG round-trip. API inti path/curve stabil sejak 0.12.
- Konsekuensi: pin versi persis (`paper@0.16.0`), baca `CHANGELOG.md` sebelum upgrade (0.14 mengubah urutan segmen
  `Path.RegularPolygon`; 0.14 hit-test fill transparan seperti SVG). Situs paperjs.org sudah menampilkan v0.16.0.

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai**: bentuk organik yang butuh _geometri path sungguhan_ — metaballs/gooey via tangen lingkaran, rantai/tali,
  morph antar path (`interpolate`), boolean animasi (unite/subtract/…), teks di atas path, sampling titik/normal/tangen
  sepanjang kurva (`getPointAt(offset)`), simplify coretan tangan, alat gambar interaktif (Tool + `minDistance`),
  hit-test per objek (hover per bentuk tanpa matematika manual), ekspor frame ke SVG.
- **Jangan**: ribuan partikel per frame (scene graph retained = overhead per item → p5/Pixi/WebGL), 3D, animasi DOM,
  efek piksel/shader (gooey berbasis blur → SVG filter atau shader). Untuk sekadar menggambar kurva cepat, p5 cukup.
- vs SVG+GSAP: Paper memberi matematika kurva (offset, intersection, boolean) yang tidak ada di DOM SVG.

## Mental model
- **Retained scene graph**: `Project → Layer → Group → Item` (`Path`, `CompoundPath`, `Shape`, `Raster`, `PointText`,
  `SymbolItem`). Ubah properti item → view otomatis menggambar ulang (`view.autoUpdate`, default on di browser).
- **Path = Segment[]**; tiap `Segment` = `point` + `handleIn` + `handleOut` (relatif ke point); `Curve` = potongan
  antar dua segmen. Posisi di sepanjang path diukur dengan **offset (panjang)**: `path.length`, `getPointAt(o)`,
  `getTangentAt(o)`, `getNormalAt(o)`, `getCurvatureAt(o)`, `getOffsetOf(point)`, `getNearestPoint(point)`.
- **Loop**: `view.onFrame = (e) => …` dengan `e.delta` (detik sejak frame lalu), `e.time` (total detik),
  `e.count` (frame) — dari `src/view/View.js`; per item juga ada `item.onFrame`. `view.pause()`/`view.play()`.
- **PaperScript** (`paper-full.js`): dialek JS dengan operator overloading (`p1 + p2`, `view.center / [10, 1]`,
  `vector.length = 35`), dikompilasi Acorn. **JS murni / bundler** (`paper` / `paper-core.js`): pakai method
  (`p1.add(p2)`, `.subtract()`, `.multiply()`), tanpa Acorn → lebih kecil.
- **Tween bawaan**: `item.tween(from?, to, options|ms)` jalan di event `frame` item; easing string
  (`'linear'`, `easeIn/Out/InOut` × `Quad|Cubic|Quart|Quint` + sejak 0.13 `Sine|Expo|Circ`); `tween.onUpdate(event)`
  memberi `event.factor`. Properti bersarang & relatif: `{'position.x': '+= 50', 'fillColor.hue': '+= 90'}`.

## Setup minimal (ESM / bundler — dari README 0.16)
```js
import paper from 'paper';                 // default export = PaperScope global; 'paper/dist/paper-core' tanpa PaperScript
paper.setup(document.getElementById('canvas'));  // <canvas resize> agar ikut ukuran elemen
const { Path, Point } = paper;
const c = new Path.Circle({ center: paper.view.center, radius: 30, fillColor: 'tomato' });
paper.view.onFrame = (e) => { c.rotate(60 * e.delta); };   // derajat/detik, frame-rate independent
```
Komponen React/SPA (scope terisolasi + cleanup):
```js
const scope = new paper.PaperScope();
scope.setup(canvasEl);          // view & project milik scope ini
scope.activate();               // jadikan scope aktif sebelum membuat item
// ... item, scope.view.onFrame = ...
return () => scope.remove();    // clear(): hapus semua project & tool + handler, lalu lepas scope
```

## Knob yang menentukan rasa gerak
| API | default | efek ke feel |
|---|---|---|
| `path.smooth({ type, factor, from, to })` | type `'asymmetric'` (legacy, "akan dihapus"); factor 0.5 (`'catmull-rom'`), 0.4 (`'geometric'`) | `'continuous'` = turunan 1 & 2 kontinu, paling halus (dipakai contoh Chain); catmull-rom factor 0 uniform / 0.5 centripetal (tanpa self-intersection) / 1 chordal; geometric factor = tension 0…1 |
| `path.simplify(tolerance)` | 2.5 | coretan tangan → sedikit segmen Bézier; besar = lebih "dibentuk" |
| `path.flatten(flatness)` | 0.25 | Bézier → polyline (untuk sampling/fisika) |
| `tool.minDistance` / `maxDistance` / `eventInterval` | — | jarak sampling drag (goresan rata); `eventInterval` (0.14) = drag event berulang walau mouse diam |
| `ToolEvent.delta` / `middlePoint` | — | kecepatan goresan → lebar kuas variabel |
| `item.tween(..., {duration, easing})` | easing `'linear'` | tween sederhana tanpa lib |
| `smooth` + jumlah segmen | — | sedikit segmen + smooth = blob kenyal; banyak = detail tapi mahal |
| `Group#isolated` (0.14) | false | blend mode anak hanya berlaku di dalam grup (seperti CSS `isolation`) |
| `View#fitBounds(rect, 'contain'|'cover')` (0.13) | — | framing/zoom ke bentuk |

## Integrasi
- **GSAP/Motion**: tween objek JS biasa lalu tulis ke item di `view.onFrame`, atau set `item.position`/`segments[i].point`
  langsung dari onUpdate tween — view menggambar ulang otomatis.
- **Scroll (Lenis)**: progress scroll → `path.getPointAt(progress * path.length)` untuk objek mengikuti jalur.
- **Physics**: Paper tidak punya fisika; jalankan pegas/steering (../nature-of-code/NOTES.md) lalu tulis ke `segment.point`
  dan panggil `path.smooth()`.
- **SVG pipeline**: `project.importSVG()` (pakai ≥0.12.19 untuk SVG tak tepercaya) → animasi → `exportSVG()` per frame.
- **Web Worker / Node**: 0.14 menambah `View#dispatchMouseEvent()` dan memperbaiki `onFrame` di worker.

## Resep non-generik
**1. Rantai/tali follow-the-leader (contoh resmi Chain, versi JS murni)**
```js
const N = 25, L = 35;
const path = new paper.Path({ strokeColor: '#E4141B', strokeWidth: 20, strokeCap: 'round' });
for (let i = 0; i < N; i++) path.add(new paper.Point(80 + i * L, 200));
paper.view.onMouseMove = (e) => {
  path.firstSegment.point = e.point;
  for (let i = 0; i < N - 1; i++) {
    const s = path.segments[i], n = s.next;
    const v = n.point.subtract(s.point).normalize(L);     // constraint jarak tetap
    n.point = s.point.add(v);
  }
  path.smooth({ type: 'continuous' });
};
```
_Kenapa mahal_: constraint jarak + smoothing `'continuous'` (C2) menghasilkan tali yang "berbobot" tanpa simulasi fisika.

**2. Metaballs / gooey dengan geometri, bukan blur** — buka `repo-paper.js/examples/Paperjs.org/MetaBalls.html`:
fungsi `metaball(ball1, ball2, v=0.5, handle_len_rate=2.4, maxDistance=300)` menghitung titik singgung di kedua
lingkaran + panjang handle Bézier proporsional jarak; path jembatan dibuat ulang tiap gerak (`removeOnMove()`).
_Kenapa mahal_: tepi tetap tajam & vektor (bisa di-stroke/diekspor SVG), beda dengan gooey blur+threshold yang buram.

**3. Blob kenyal (pegas per segmen + smooth)**
```js
const R = 120, M = 10, blob = new paper.Path({ closed: true, fillColor: '#111' });
const nodes = [...Array(M)].map((_, i) => ({ a: i / M * Math.PI * 2, r: R, v: 0 }));
nodes.forEach(n => blob.add(paper.view.center.add(new paper.Point({ angle: n.a * 180 / Math.PI, length: R }))));
paper.view.onFrame = (e) => {
  const dt = Math.min(e.delta, 0.05) * 60;
  nodes.forEach((n, i) => {
    const target = R + 14 * Math.sin(e.time * 2 + n.a * 3);          // napas
    n.v = (n.v + (target - n.r) * 0.08 * dt) * Math.pow(0.86, dt);    // Hooke + damping
    n.r += n.v * dt;
    blob.segments[i].point = paper.view.center.add(new paper.Point({ angle: n.a * 180 / Math.PI, length: n.r }));
  });
  blob.smooth({ type: 'continuous' });
};
// sentuhan: pada onMouseMove, beri impuls n.v -= 6 ke node terdekat kursor
```
_Kenapa mahal_: hanya 10 titik tapi smoothing kontinu membuatnya tampak seperti membran fisik.

**4. Morph antar bentuk dengan tween + `interpolate`** (pola dari JSDoc `Item#tween`)
```js
const from = shapeA.clone({ insert: false }), to = shapeB.clone({ insert: false }); // jumlah segmen HARUS sama
const morph = shapeA;                                                               // item yang terlihat
morph.tween(1200).onUpdate = (ev) => morph.interpolate(from, to, ev.factor);
```
_Kenapa mahal_: morph segmen-ke-segmen (bukan crossfade) — samakan jumlah segmen dulu (mis. `flatten()`/resample).

**5. Kuas variabel dari kecepatan goresan** (tutorial "Working with Mouse Vectors")
```js
const tool = new paper.Tool(); tool.minDistance = 6; let path;
tool.onMouseDown = (e) => { path = new paper.Path({ fillColor: '#222' }); path.add(e.point); };
tool.onMouseDrag = (e) => {
  const step = e.delta.divide(2); step.angle += 90;               // tegak lurus arah gerak, panjang ∝ kecepatan
  path.add(e.middlePoint.add(step)); path.insert(0, e.middlePoint.subtract(step));
};
tool.onMouseUp = (e) => { path.add(e.point); path.closed = true; path.smooth(); };
```
_Kenapa mahal_: tinta menebal saat cepat & menipis saat pelan, seperti kuas asli.

## Performa, aksesibilitas, mobile
- Boolean (`unite/intersect/subtract/exclude/divide`) mahal → jangan per frame untuk path rumit; pakai
  `{ insert: false }` dan cache hasil. Ribuan objek identik → `SymbolDefinition` + `SymbolItem`.
- Hindari membuat/menghapus ratusan item per frame; ubah `segment.point` yang sudah ada. `settings.applyMatrix` default
  `true` → `rotate/scale` pada `Path` **memanggang** transform ke semua segmen tiap panggilan; `Shape`, `Raster`, teks
  (`_applyMatrix: false`) hanya mengubah matrix → lebih murah untuk objek yang terus berputar/berskala.
  Symbol: instansi merujuk item asli → hemat memori & cepat dipindah (tutorial Working with Symbols).
- `view.pause()` untuk `prefers-reduced-motion` (gambar satu keadaan statis); canvas = beri label ARIA/teks alternatif di DOM.
- Mobile/HiDPI: atribut canvas `resize` (atau `data-paper-resize`) = ikut ukuran elemen; HiDPI aktif default,
  matikan dengan `hidpi="off"` (`src/view/CanvasView.js`) untuk hemat piksel. 0.14 memperbaiki scroll sentuh di area kosong canvas.
- Keamanan: `importSVG()` sebelum 0.12.19 rentan XSS untuk SVG dari user.

## Sumber lokal
- `repo-paper.js/README.md` — setup bundler/ESM (0.16), paper-full vs paper-core, paper-jsdom
- `repo-paper.js/CHANGELOG.md` — 0.12.x → 0.16.0 (fitur & perubahan perilaku); `changelog/unreleased/*.md` (yang akan datang)
- `repo-paper.js/src/path/PathItem.js` — `smooth()` (tipe & factor), `interpolate()`, `getNearestPoint()`
- `repo-paper.js/src/path/Path.js` · `Curve.js` · `Segment.js` — `getPointAt/TangentAt/NormalAt`, `simplify`, `flatten`, offset
- `repo-paper.js/src/path/PathItem.Boolean.js` — unite/intersect/subtract/exclude/divide (+ opsi `insert`, `trace`)
- `repo-paper.js/src/item/Item.js` — `tween()/tweenTo()/tweenFrom()`, `onFrame`, `hitTest` opsi, `removeOn*`
- `repo-paper.js/src/anim/Tween.js` — daftar easing; `src/view/View.js` — frame event (`delta/time/count`), `pause/play`
- `repo-paper.js/src/tool/Tool.js` · `ToolEvent.js` — `minDistance`, `maxDistance`, `eventInterval`, `delta`, `middlePoint`
- `repo-paper.js/examples/Paperjs.org/{MetaBalls,Chain,Tadpoles,Voronoi,PathIntersections,BouncingBalls}.html` · `examples/Animated/{Smoothing,BooleanOperations,Lines}.html` · `examples/Tools/*.html`
- `web/tutorials/` (31 hal.: geometry, paths, interaction/mouse vectors, animation) · `web/reference/` (36 kelas, situs v0.16)
- Catatan: `web/examples/*.md` THIN (kode PaperScript ada di `<script>` yang dibuang crawler) → pakai `repo-paper.js/examples/`.
