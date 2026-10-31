---
tool: Infinite canvas / endless drag grid (pola, bukan library)
version: pola; rujukan kanonik: Edoardo Lunardi "Building an Endless Drag Grid in React, without WebGL" (blog 2025/26) + "useDraggable" (23 Aug 2025); Codrops "Infinite Canvas: Building a Seamless, Pan-Anywhere Image Space" (2026-01-07, repo edoardolunardi/infinite-canvas @ 528d811, R3F); Codrops "Building an Infinite Parallax Grid with GSAP and Seamless Tiling" (2025-06-11, repo JorgeCapillo/infinite-layers-grid @ 8e069a4)
official: https://tympanus.net/codrops/2026/01/07/infinite-canvas-building-a-seamless-pan-anywhere-image-space/ · https://tympanus.net/codrops/2025/06/11/building-an-infinite-parallax-grid-with-gsap-and-seamless-tiling/ · https://www.edoardolunardi.dev/blog/building-an-endless-drag-grid-in-react-without-webgl
local: web/lunardi-endless-drag-grid-react.md · web/lunardi-usedraggable-drag-react.md · web/codrops-2026-01-infinite-canvas-pan-anywhere.md · web/codrops-2025-06-infinite-parallax-grid-tiling.md · repo-edoardolunardi-infinite-canvas/src/infinite-canvas/ · repo-JorgeCapillo-infinite-layers-grid/src/js/components/infinite-grid.js · web/mdn-extra/
fetched: 2026-10-28
---
# Infinite canvas — bidang yang bisa di-drag ke segala arah tanpa ujung, dengan inersia dan zoom-out saat ditahan

## Kapan pakai / kapan jangan
- **Pakai** untuk index portfolio/arsip visual/moodboard ("papan Figma"), di mana eksplorasi > urutan.
- **Jangan** untuk konten yang harus dibaca berurutan/ditemukan cepat (sediakan juga list view), atau SEO-penting tanpa
  fallback (konten tetap harus ada di DOM/HTML).
- Pilih teknik: **DOM modulo-wrap** (≤ ±150 item, teks/link nyata, a11y) · **2×2 tile + wrap per item** (efek paralaks
  per item, GSAP) · **WebGL chunk prosedural** (ribuan gambar, 3D/z-zoom, fog) — R3F.

## Mental model (tiga arsitektur terverifikasi)
**A. Modulo wrap, item tak pernah mount/unmount (Lunardi, DOM):**
- Layout deterministik: hash integer (`Math.imul` + xorshift → `/2^32`) → server & client identik (no hydration tear).
- Ukuran **luas sama**: `w = S·√aspect, h = S/√aspect` → bidang tenang, tidak ada item dominan.
- Satu item per sel grid (sel disjoint ⇒ tidak overlap), scatter di dalam sel dengan inset gap; urutkan sel dari pusat
  keluar (`hypot(col-cc, row-cr)`) → item penting di tengah.
- Ukuran tile ≥ `viewport + maxItemExtent + margin` (dengan zoom: `viewport / minZoom`) → seam (teleport) selalu di luar
  layar.
- Tiap frame: kamera di-lerp ke target; per item `kx = Math.round((cam.x - item.cx) / tileW)` (salinan terdekat);
  tulis `transform` **hanya bila kx/ky berubah** + satu `translate3d(-cam)` di field. Loop diam = nol style work.
**B. 2×2 duplikasi + wrap saat keluar layar (Codrops 2025, DOM+GSAP):** item disalin di offset `[0, tileW] × [0, tileH]`,
  `tileSize *= 2`; saat `posX > winW` (gerak kanan) `extraX -= tileW`, saat `posX + w < 0` (gerak kiri) `extraX += tileW`
  (sama untuk Y). Paralaks per item: `5 × smoothedDelta × item.ease` (ease acak 0.5–1) + offset mouse `(mx-0.5)·w·0.6`.
  Scroll lerp `ease 0.06`; delta/mouse/press di-smooth `0.04`/frame. "Hold" (`mousedown`) → `press` 0→1 →
  gambar `scale(1.2 + 0.2·press·ease)` (zoom saat ditahan, per item berbeda).
**C. Chunk prosedural 3D (Codrops 2026, R3F):** dunia dibagi kubus `CHUNK_SIZE 110`; render chunk dengan jarak
  Chebyshev ≤ `RENDER_DISTANCE 2 + CHUNK_FADE_MARGIN 1` (7³ = 343 offset); tiap chunk 5 plane dari seed
  `hash("cx,cy,cz")` (revisit = posisi sama, tanpa storage), cache LRU 256 chunk. Update daftar chunk di-throttle
  **100 ms** (diam), **400 ms** (zooming), **500 ms** (zoom cepat). Opacity chunk lerp 0.18 ke target berdasar jarak,
  `depthWrite` hanya saat opacity ≥ 1 (hindari artefak sorting transparan), fog/depth fade 140–260.
  Kamera: `targetVel += input; vel = lerp(vel, targetVel, 0.16); pos += vel; targetVel *= 0.9` per frame, clamp
  `MAX_VELOCITY 3.2`; wheel `deltaY × 0.006` → zoom z; drag `Δpx × 0.025`; drift paralaks mouse `8 × zoomFactor`
  (dibekukan saat drag). Keyboard WASD/QE.

## Setup minimal (DOM, framework-agnostic)
```js
const S = { cam:{x:0,y:0}, target:{x:0,y:0}, vel:{x:0,y:0}, zoom:1, zoomT:1, drag:null, moved:false, last:0 }
const DRAG_THRESHOLD = 4, LINE = 100 / 6
surface.style.touchAction = 'none'                                     // pointer events tanpa scroll/zoom browser
surface.addEventListener('pointerdown', (e) => {
  surface.setPointerCapture(e.pointerId)                               // pan tetap hidup saat keluar elemen
  S.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, hist: [{ x: e.clientX, y: e.clientY, t: e.timeStamp }] }
  S.moved = false; S.zoomT = 0.82                                      // zoom-out saat ditahan
})
surface.addEventListener('pointermove', (e) => {
  const d = S.drag; if (!d || e.pointerId !== d.id) return
  const dx = e.clientX - d.x, dy = e.clientY - d.y
  if (!S.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return         // tap tetap jadi klik
  S.moved = true; d.x = e.clientX; d.y = e.clientY
  S.target.x -= dx / S.zoom; S.target.y -= dy / S.zoom                 // 1:1 di layar walau ter-zoom
  d.hist.push({ x: e.clientX, y: e.clientY, t: e.timeStamp }); while (d.hist.length > 6) d.hist.shift()
})
const end = (e) => {
  const d = S.drag; if (!d || e.pointerId !== d.id) return
  const a = d.hist[0], b = d.hist.at(-1), dt = Math.max((b.t - a.t) / 1000, 1 / 120)
  if (e.timeStamp - b.t < 80) { S.vel.x = -(b.x - a.x) / dt / S.zoom; S.vel.y = -(b.y - a.y) / dt / S.zoom }  // lempar
  S.drag = null; S.zoomT = 1
}
surface.addEventListener('pointerup', end); surface.addEventListener('pointercancel', end)
surface.addEventListener('click', (e) => { if (S.moved) { e.preventDefault(); e.stopPropagation() } }, true) // telan klik pasca-drag
surface.addEventListener('wheel', (e) => {
  e.preventDefault(); const m = e.deltaMode === 1 ? LINE : e.deltaMode === 2 ? innerHeight : 1
  S.target.x += e.deltaX * m / S.zoom; S.target.y += e.deltaY * m / S.zoom
}, { passive: false })
function frame(t) {
  const dt = Math.min((t - (S.last || t)) / 1000, 1 / 30) || 1 / 60; S.last = t
  if (!S.drag) { S.target.x += S.vel.x * dt; S.target.y += S.vel.y * dt
    const f = Math.exp(-4.5 * dt); S.vel.x *= f; S.vel.y *= f }        // gesekan inersia
  const k = 1 - Math.exp(-14 * dt), kz = 1 - Math.exp(-9 * dt)
  S.cam.x += (S.target.x - S.cam.x) * k; S.cam.y += (S.target.y - S.cam.y) * k
  S.zoom += (S.zoomT - S.zoom) * kz
  field.style.transform = `translate3d(${innerWidth/2}px, ${innerHeight/2}px, 0) scale(${S.zoom}) translate3d(${-S.cam.x}px, ${-S.cam.y}px, 0)`
  wrapItems(S.cam)                                                     // pola A: k = round((cam - c) / tile), tulis bila berubah
  requestAnimationFrame(frame)
}
requestAnimationFrame(frame)
```
Hentikan loop saat idle (selisih cam/target/zoom < ε dan vel ≈ 0) untuk hemat baterai.

## Knob yang menentukan rasa gerak
| Knob | Efek | Rujukan |
|---|---|---|
| follow rate kamera `k = 1-e^(-r·dt)` | "licin" vs "lengket" | Lunardi: lerp kamera; Codrops 2025: ease 0.06/frame (≈3.7/s, sangat licin) |
| gesekan inersia `v *= e^(-f·dt)` | jarak luncur setelah lempar | f 3–6/s; Codrops 2026 `targetVel *= 0.9`/frame ≈ f 6.3/s |
| velocity sample window | lemparan akurat | ≤ 100 ms terakhir; abaikan bila jeda > 80 ms sebelum pointerup (user berhenti dulu) |
| `MAX_VELOCITY` / clamp | cegah terbang | Codrops 2026: 3.2 unit/frame |
| zoom saat hold | kontekstualisasi ("lihat peta") | 0.8–0.85, rate lebih lambat dari pan (9/s) supaya terasa "mundur", bukan lompat |
| paralaks per item (ease 0.5–1) | kedalaman/organik | Codrops 2025: offset ∝ smoothed velocity × ease item |
| keyboard attack/release | rasa trackpad | Lunardi: attack cepat saat tahan, release lambat → meluncur; normalisasi diagonal |

Zoom di sekitar titik pointer (bukan pusat): sebelum mengubah zoom, `target += (p - center) · (1/zoomLama - 1/zoomBaru)`
(p = posisi pointer layar) → titik di bawah jari tetap diam.

## Integrasi
- **Custom cursor**: `data-cursor="drag"` → state `dragging` saat pointerdown (`../custom-cursor/NOTES.md`).
- **Lenis**: matikan untuk halaman canvas (`lenis.stop()` atau `data-lenis-prevent` pada surface); wheel dikonsumsi
  canvas sendiri.
- **GSAP**: `gsap.ticker` sebagai loop; `Flip` untuk transisi item → detail. Intro Codrops 2025 (`initIntro/intro`):
  item yang terlihat di-`set` ke pusat layar (`x = -rect.x + innerWidth/2 - rect.width/2`), lalu
  `gsap.to(items.reverse(), {x:0, y:0, duration:2, ease:'expo.inOut', stagger:0.05})` → grid "meledak" dari satu tumpukan
  (cocok sebagai akhir preloader, lihat `../preloader/NOTES.md`). **View Transitions**: item → halaman detail dengan
  `view-transition-name` sementara.
- **R3F**: pola C; loop di `useFrame`; texture on-demand dengan progress (`onTextureProgress`) untuk preloader.

## Resep non-generik
1. **Seam tak terlihat (pola A)**: tile = `max(cols·cellMin, viewport + maxExtent + margin)`; per item
   `kx = Math.round((cam.x - item.cx) / tileW)` dan cache → transform ditulis hanya saat item pindah periode.
   Kenapa mahal: ratusan item, tapi per frame hanya 1 transform field yang berubah → 120 fps stabil di DOM.
2. **Zoom-out saat ditahan + snap-back** (setup di atas): `zoomT 0.82` saat pointerdown, 1 saat lepas, rate 9/s.
   Kenapa mahal: user merasa "menarik kamera ke belakang" untuk melihat konteks, lalu kembali fokus saat melepas.
3. **Velocity → skew/scale item** (Codrops 2025): `item.ease ∈ [0.5,1]` acak, offset = `5 × smoothedDelta × ease`.
   Kenapa mahal: grid bergerak seperti lapisan dengan massa berbeda, bukan satu lembar kaku.
4. **Chunk fade-in prosedural** (pola C): chunk baru masuk opacity 0 → lerp 0.18, `depthWrite` setelah 1.
   Kenapa mahal: dunia "terbentuk" di tepi pandang tanpa pop-in.
5. **Focus recentering untuk keyboard**: `focusin` pada item → `S.target = item.center` (surface `overflow: clip` tak
   bisa scrollIntoView). Kenapa mahal: Tab menjelajah kanvas dengan kamera yang meluncur, bukan lompat.

## Performa, aksesibilitas, mobile & browser
- Hanya transform; `will-change: transform` di field; tulis per-item hanya saat berubah; hentikan loop saat idle.
- Touch: `touch-action: none` pada surface, Pointer Events + `setPointerCapture` (mouse/pen/touch satu jalur);
  pinch = 2 pointer, jarak antar pointer → zoom (`../../_shared/mdn-content/files/en-us/web/api/pointer_events/pinch_zoom_gestures/`).
  Repo Codrops 2025 hanya `mouse*` (tidak jalan di touch) → jangan disalin mentah.
- a11y: surface fokusable + petunjuk SR ("gunakan panah untuk menjelajah"), panah = velocity (bukan step), `focusin`
  recenter; sediakan list view alternatif.
- Reduced motion: follow rate → instan (k=1), matikan inersia/paralaks/zoom-hold.
- Gambar: lazy + `decode()` sebelum fade-in; WebGL: texture manager + throttle update chunk.

## Sumber lokal
- `web/lunardi-endless-drag-grid-react.md` — pola A lengkap (hash, sizing, seam, wrap, loop, keyboard, a11y).
- `web/lunardi-usedraggable-drag-react.md` — pointer capture, threshold, telan klik, `touch-action:none`.
- `repo-JorgeCapillo-infinite-layers-grid/src/js/components/infinite-grid.js` — pola B (2×2 wrap, paralaks, hold zoom).
- `web/codrops-2025-06-infinite-parallax-grid-tiling.md` — artikel pola B.
- `repo-edoardolunardi-infinite-canvas/src/infinite-canvas/{constants.ts,utils.ts,scene.tsx}` — pola C (chunk, LRU, throttle, velocity).
- `web/codrops-2026-01-infinite-canvas-pan-anywhere.md` — artikel pola C.
- `web/mdn-extra/` — touch-action, releasePointerCapture, lostpointercapture, wheel, deltaMode.
- `../../_shared/mdn-content/files/en-us/web/api/element/setpointercapture/index.md`, `.../api/pointer_events/` — dasar.
