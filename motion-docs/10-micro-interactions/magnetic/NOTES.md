---
tool: Magnetic elements (pola, bukan library)
version: pola; rujukan kanonik Codrops "Magnetic Buttons" (2020-08-05, repo codrops/MagneticButtons @ b2ee8ac) + MDN Pointer Events (mirror bersama)
official: https://tympanus.net/codrops/2020/08/05/magnetic-buttons/ · https://github.com/codrops/MagneticButtons
local: repo-codrops-MagneticButtons/src/js/demo{1..6}/buttonCtrl.js, src/js/cursor.js, src/js/utils.js · web/codrops-2020-08-magnetic-buttons.md · ../../_shared/mdn-content/files/en-us/web/api/pointer_events/
fetched: 2026-10-28
---
# Magnetic elements — tombol/link "tertarik" ke kursor di dalam radius, lalu membal pulang seperti karet

## Kapan pakai / kapan jangan
- **Pakai** pada sedikit elemen hero/CTA/nav (1–6 per viewport) di perangkat `hover:hover` + `pointer:fine`.
- **Jangan** di list panjang, di form, di touch (tak ada hover — efek hanya muncul saat tap = aneh), atau pada elemen
  yang harus presisi diklik (target bergerak menjauh dari kursor di tepi radius = frustrasi).
- Library alternatif: GSAP `quickTo` / Motion `useSpring` (lihat `../../03-choreography/`), tapi polanya cukup 30 baris.

## Mental model
1. Tiap frame: jarak kursor ke pusat elemen `d = hypot(mx - cx, my - cy)`.
2. Di dalam radius (`d < triggerDist`) → target translasi = `(m - c) × pull`; di luar → target 0.
3. Nilai tampil mengejar target dengan smoothing (lerp/spring) → "lengket" saat masuk, "karet" saat lepas.
4. Lapisan dalam (teks/ikon) bergerak dengan faktor berbeda → paralaks mikro (kedalaman).
Angka dari repo Codrops (per demo): `triggerDist = rect.width × 0.7` (demo1/4), `×0.8` (demo6), `×1` (demo3),
`×1.5` (demo2/5) · `pull = 0.3` (demo6: 0.2) · teks dalam `×-0.6` (berlawanan, demo1/4/6), `×-0.2` (demo2),
`×+0.5` (searah, demo3/5) · smoothing `lerp amt 0.1` (translasi), `0.2` (scale deko → 1.3 saat enter), `0.05`
(lapisan kedua lebih malas, demo5) · tilt 3D demo6: `rotateX = dy×0.07°`, `rotateY = dx×0.09°`.
Enter/leave teks (demo1): keluar `0.15s power2.in` ke `y:-20%, opacity 0`, masuk dari `y:100%` ke 0 `0.2s expo.out`
(leave: arah dibalik).

## Setup minimal (framework-agnostic, frame-rate independent)
```js
const fine = matchMedia('(hover: hover) and (pointer: fine)')
const reduce = matchMedia('(prefers-reduced-motion: reduce)')
export function magnetic(hit, { pull = 0.3, radius = 0.7, inner = -0.6, rate = 6.3 } = {}) {
  // hit = area tak bergerak (wrapper ber-padding); vis = lapisan yang digeser; txt = konten dalam
  const vis = hit.firstElementChild, txt = vis.querySelector('[data-magnetic-text]')
  let mx = 0, my = 0, x = 0, y = 0, tx = 0, ty = 0, raf = 0, last = 0, r
  const measure = () => { r = hit.getBoundingClientRect() }            // viewport-space, ukur ulang saat enter
  const onMove = (e) => { if (e.pointerType !== 'mouse') return; mx = e.clientX; my = e.clientY; start() }
  const onLeave = () => { mx = my = NaN; start() }
  function tick(t) {
    const dt = Math.min((t - (last || t)) / 1000, 1 / 30) || 1 / 60; last = t
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    const inside = Number.isFinite(mx) && Math.hypot(mx - cx, my - cy) < r.width * radius
    tx = inside ? (mx - cx) * pull : 0; ty = inside ? (my - cy) * pull : 0
    const k = 1 - Math.exp(-rate * dt)                                 // = lerp 0.1 @60fps bila rate≈6.3
    x += (tx - x) * k; y += (ty - y) * k
    vis.style.transform = `translate3d(${x}px, ${y}px, 0)`
    if (txt) txt.style.transform = `translate3d(${x * inner}px, ${y * inner}px, 0)`
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(tick); else { raf = 0; last = 0 }
  }
  const start = () => { if (!raf && fine.matches && !reduce.matches) raf = requestAnimationFrame(tick) }
  hit.addEventListener('pointerenter', measure); hit.addEventListener('pointermove', onMove)
  hit.addEventListener('pointerleave', onLeave); measure()
  return () => { cancelAnimationFrame(raf); hit.removeEventListener('pointerenter', measure)
    hit.removeEventListener('pointermove', onMove); hit.removeEventListener('pointerleave', onLeave) }
}
```
```css
.magnetic { display:inline-block; padding: 1.5rem; margin: -1.5rem; }   /* hit-area statis lebih besar dari visual */
.magnetic > * { will-change: transform; }
```
Konversi lerp-per-frame → rate: `rate = -60 · ln(1 - amt)` → amt 0.05 ≈ 3.1/s, 0.1 ≈ 6.3/s, 0.2 ≈ 13.4/s.

## Knob yang menentukan rasa gerak
| Knob | Efek | Rentang |
|---|---|---|
| `pull` | seberapa jauh elemen "dicuri" kursor | 0.2–0.4 (≥0.5 terasa lepas kendali) |
| `radius` (× lebar) | jarak mulai tertarik | 0.7–1.5; besar = efek terasa dari jauh |
| `rate` (1/s) | kelekatan; rendah = berat/telat | 5–9 tombol; 3 untuk lapisan dekoratif |
| `inner` | paralaks konten | -0.6 (konten "tertinggal") s/d +0.5 (konten "memimpin") |
| spring (opsional) | overshoot saat dilepas | k≈170, c≈18 (sedikit bounce); c=2√k≈26 = kritis tanpa bounce |
Spring semi-implicit Euler bila mau "karet": `v += (-k*(x - tx) - c*v) * dt; x += v * dt` (dt di-clamp ≤ 1/30).

## Integrasi
- **GSAP**: `const xTo = gsap.quickTo(vis, 'x', {duration:.6, ease:'power3'})` lalu `xTo(dx*pull)` per pointermove;
  leave: `gsap.to(vis, {x:0, y:0, duration:.9, ease:'elastic.out(1, 0.3)'})` [API GSAP: lihat `../../03-choreography/gsap/`].
- **Motion (React)**: `useSpring` pada motion value x/y [lihat `../../03-choreography/motion/`].
- **Custom cursor**: saat masuk radius, kirim event `magnetic:enter` → cursor membesar & "menempel" ke pusat elemen
  (lihat `../custom-cursor/NOTES.md`, pola "stuck" Codrops 2019).
- **Lenis/scroll**: rect diukur ulang pada `pointerenter` (viewport-space) → aman saat scroll. Repo Codrops menghitung
  rect sekali saat init lalu membandingkan dengan `mouse + window.scrollX/Y` → salah bila init tidak di scroll 0.

## Resep non-generik
1. **Hit-area statis, visual bergerak** (pola di atas). Kenapa mahal: kalau elemen yang di-hover ikut bergeser, tepi
   hover ikut pindah → efek "berkedip" masuk-keluar di batas radius. Memisah hit-area menghilangkan jitter.
2. **Paralaks dua lapis (Codrops demo5)**: lapisan background `rate` lebih rendah (amt 0.05) dari tombol (0.1) →
   saat dilepas, tombol pulang dulu, latar menyusul. Kenapa mahal: dua massa berbeda = kedalaman fisik.
3. **Tilt 3D magnetik (demo6)**: `rotateX(${dy*0.07}deg) rotateY(${dx*0.09}deg)` + `perspective: 600px` di parent,
   pull 0.2. Kenapa mahal: tombol seperti kartu yang dimiringkan jari.
4. **Swap label saat enter/leave** (demo1): out ke atas 0.15 s power2.in → masuk dari bawah 0.2 s expo.out; balik arah
   saat leave. Kenapa mahal: teks "berguling" mengikuti arah gerak masuk/keluar kursor.
5. **Fill sirkular dari arah masuk**: hitung sudut masuk `atan2(my-cy, mx-cx)`, set `--x/--y` lalu
   `clip-path: circle(0 at var(--x) var(--y))` → `circle(150% …)` saat hover (CSS transition). Kenapa mahal: warna
   "tumpah" dari sisi datangnya kursor.

## Performa, aksesibilitas, mobile & browser
- Hanya `transform` (compositor). rAF berhenti saat diam (cek selisih < 0.05 px). Satu listener per elemen, tanpa
  `mousemove` global yang selalu jalan (repo Codrops menjalankan rAF selamanya per tombol — boros).
- `prefers-reduced-motion: reduce` → nonaktifkan translasi; pertahankan perubahan warna/underline.
- Touch: `pointerType !== 'mouse'` diabaikan; gate dengan `(hover: hover) and (pointer: fine)`
  (`../custom-cursor/web/mdn-extra/css_reference_at-rules__media_{hover,pointer}.md`).
- Fokus keyboard tak memicu magnet → wajib `:focus-visible` yang jelas.

## Sumber lokal
- `repo-codrops-MagneticButtons/src/js/demo1/buttonCtrl.js` — implementasi dasar (jarak, pull, lerp, label swap).
- `repo-codrops-MagneticButtons/src/js/demo{2,3,4,5,6}/buttonCtrl.js` — variasi scale deko, dua lapis, filler, tilt 3D.
- `repo-codrops-MagneticButtons/src/css/demo*/button.css` — styling & transisi hover.
- `repo-codrops-MagneticButtons/src/js/cursor.js` — cursor pendamping (scale 4, opacity 0.2 saat enter).
- `web/codrops-2020-08-magnetic-buttons.md` — artikel (ringkas).
- `../../_shared/mdn-content/files/en-us/web/api/pointer_events/using_pointer_events/index.md` — pointer events.
