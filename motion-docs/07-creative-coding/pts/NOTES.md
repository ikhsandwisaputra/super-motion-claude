---
tool: Pts (pts.js)
version: 1.0.3 (npm `latest`, 2026-10-16; 1.0.0 = 2026-09-12 "full modernization"; GitHub release terakhir v1.0.1) · repo main @c9f3d9b (2026-10-21) — dicek 2026-10-28
official: https://ptsjs.org/guide · https://ptsjs.org/docs.md · https://github.com/williamngan/pts
local: repo-pts/docs.md (API lengkap 442 KB) · repo-pts/guide.md + guide/md/*.md (semua guide) · repo-pts/src/*.ts · repo-pts/demo/*.js · repo-pts/CHANGELOG.md · web/guide/ (crawl situs)
fetched: 2026-10-28
---
# Pts — titik, garis & ruang: geometri ekspresif + ritme berbasis BPM (Tempo) di Canvas/SVG/HTML

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** untuk visual geometris yang "berpikir dalam titik": konstelasi Delaunay/Voronoi, garis yang saling memotong,
  perpendicular/proyeksi ke kursor, kurva B-spline/cardinal, pola grid/radial, audio-reactive (FFT → titik), dan
  **choreography ritmis** lewat `Tempo` (bpm, `every(n)`, rhythm `[2,2,1,1]`, stagger offset ms).
- 1.0 menambah bawaan yang biasanya dari library lain: `Create.flock` (boids + spatial hash), `Create.sampling`
  (Poisson-disk/blue noise), `Physics` (`World`/`Particle`/`Body`, Verlet), warna Oklab/Oklch, `SVGSpace`.
- **Jangan**: shader/WebGL (Pts = Canvas2D/SVG/HTML), ekosistem & tutorial luas (p5 jauh lebih besar), scene 3D,
  vector editing dengan boolean kompleks (Paper.js; meski Pts 1.0 punya `Path.unite/intersect/...` di studi).
- vs p5: Pts lebih kecil, TypeScript `strict`, API berorientasi objek geometri (`Pt`, `Group`, `Line`, `Circle`…).

## Mental model
- **Space** (kertas) → **Form** (pensil) → **Pt/Group** (ide). `Pt` = subclass `Float32Array` (operasi in-place,
  `$`-prefix seperti `$add` mengembalikan Pt baru), `Group` = `Array<Pt>`, `Bound` = kotak.
- **Player**: `space.add(fn)` atau objek `{ start(bound, space), animate(time, ftime), action(type, px, py, evt), resize(bound, evt) }`.
  `time` = ms sejak play, `ftime` = durasi frame (ms). `space.pointer`, `space.center`, `space.size`, `space.innerBound`.
- Loop: `space.bindMouse().bindTouch().play()`; `playOnce(ms)` untuk animasi terbatas; `pause()`/`resume()`/`stop()`.
  1.0.3: space yang di-stop/pause digambar ulang sekali setelah resize (tidak kosong lagi).
- **Tempo** (`src/Play.ts`): metronom — `new Tempo(bpm)` / `Tempo.fromBeat(ms)`; `space.add(tempo)`;
  `tempo.every(n | [beats…])` → `.start(cb(count))` dan `.progress(cb(count, t, time, isStart), offsetMs, name)`;
  `t` 0→1 per periode; `return true` menghentikan; `tempo.stop(name)`; `tempo.bpm` bisa diubah live.
  1.0.3: setelah stall (tab tersembunyi) Tempo melompat ke periode kini → `count` bisa loncat (pakai `count >= n`).
- **Shaping** (`Num.ts`): easing berparameter `(t, c = 1, p)` — `c` = skala output, `p` = parameter bentuk.
  `Num.cycle(t)` memetakan 0→1 jadi 0→1→0 (ping-pong). `Num.mapToRange` di 1.0 menghormati range terbalik & tidak meng-clamp.
- Random/noise: `Num.seed('string')` membuat `Num.random()` deterministik (dipakai `Create.flock`, `Create.sampling`, dsb.).
  **Perlin `Create.noisePts` di 0.12 rusak** (pengulangan periode-12) — diperbaiki di 1.0 (nilai berubah).

## Setup minimal (1.0)
```js
import { CanvasSpace, Pt, Group, Line, Num, Shaping, Tempo, Create } from 'pts'; // exports: 'pts', 'pts/dist/*' saja
const space = new CanvasSpace('#stage').setup({ bgcolor: '#0b0b10', resize: true, retina: true });
// catatan: tanpa bgcolor → transparan (beda dengan DOMSpace)
const form = space.getForm();
space.add({
  animate: (time, ftime) => {
    const r = 10 + Num.cycle((time % 1200) / 1200) * 20;
    form.fillOnly('#f50').point(space.pointer, r, 'circle');
  },
  action: (type, px, py) => { if (type === 'up') { /* klik */ } },
});
space.bindMouse().bindTouch().play();
// script tag: <script src="https://cdn.jsdelivr.net/npm/pts/dist/pts.min.js"></script> lalu Pts.namespace(window) atau Pts.quickStart('#id', '#fff')
```
Breaking 0.12 → 1.0 yang penting: `Img.load()` kini `Promise<Img>`; `SVGForm` extends `CanvasForm`; deep import
`pts/src/...` tidak bisa; `Pt.angleBetween` dinormalisasi ke [−π, π); Delaunay implementasi baru (urutan segitiga beda);
semua `Sound` berbagi satu `AudioContext` (jangan `close()` ctx — pakai `sound.stop()`/`dispose()`); Lab/LCH kini D50 (1.0.3).

## Knob yang menentukan rasa gerak
| knob | default | efek |
|---|---|---|
| `new Tempo(bpm)` / `tempo.bpm` | — | tempo seluruh koreografi; ubah live = percepat/lambatkan semua |
| `tempo.every([2,2,1,1])` | — | ritme "Taaa, Taaa, ta-ta" — aksen tidak rata |
| `.progress(fn, offsetMs)` | 0 | stagger: + = lebih awal, − = lebih lambat |
| `Shaping.elasticOut(t, c, p)` / `elasticIn` / `elasticInOut` | p 0.7 / 0.7 / 0.6 | p = periode getar |
| `Shaping.exponentialIn/Out(t, c, p)` | p 0.25 | ketajaman |
| `Shaping.sigmoid(t, c, p)` | p 10 | S-curve; p besar = hampir step |
| `Shaping.seat(t, c, p)` · `cliff(t, c, p)` · `logSigmoid` | 0.5 · 0.5 · 0.7 | jeda di tengah / tebing |
| `Shaping.cubicBezier(...)` · `quadraticTarget(...)` · `step(...)` | — | kurva kustom & tangga |
| `Create.flock(pts, {perception, separation, cohesionWeight, alignWeight, separateWeight, maxSpeed, minSpeed, maxForce, bound, boundary, margin, maxTimeStep})` | 40, 20, 1, 1, 1.5, 100 u/s, 0, 200 u/s², –, `"steer"`, 50, 50 ms | sama dengan bobot NoC (sep 1.5) tapi **berbasis waktu nyata** (u/detik) |
| `Create.sampling(bound, radius, {candidates})` | candidates 8 | distribusi rata tanpa gumpalan (Poisson-disk) |
| `new World(bound, friction=1, gravity=0)` | 1 = tanpa gesekan | `Particle` Verlet + `Body` dengan `link(i1, i2, stiff)`/`linkAll(stiff)` |
| `CanvasSpace.setup({ retina, pixelDensity, offscreen })` | retina on | hemat piksel / buffer offscreen |

## Integrasi
- **React**: `react-pts-canvas` → `<PtsCanvas background="#9ab" onAnimate={(space, form, time, ftime) => …} />`
  (guide `_8000_Ecosystem.md`; versi yang cocok dengan Pts 1.0 [UNVERIFIED]). CLI render tanpa browser: `pts-render`.
- **Audio**: `Sound.load(url)` / `Sound.loadAsBuffer` / `Sound.generate('sine', 120)` / `Sound.input()` (mic) →
  `sound.analyze(bins)` sekali → per frame `sound.freqDomainTo(space.size)` / `timeDomainTo([w,h],[x,y])`;
  mulai dari gesture user (`sound.start()`); 1.0.3 fade 10 ms pada stop/seek/volume (anti-klik).
- **Tone.js**: guide Sound bagian Advanced membahas sumber dari library lain.
- **GSAP/Motion**: Pts tidak punya timeline; pakai Tempo untuk ritme berbasis beat, GSAP untuk timeline UI di luar canvas.
- **SVG**: `SVGSpace` + `SVGForm` (subset Canvas: tanpa clip/imageData/composite; 1.0.3 menggabung shape SVG berurutan bila aman).

## Resep non-generik
**1. Koreografi BPM: tiga lapisan dengan rhythm + stagger** (pola `demo/guide.tempo_*.js`)
```js
const tempo = new Tempo(96); space.add(tempo);
let pulse = 0, sweep = 0;
tempo.every([2, 2, 1, 1]).progress((count, t) => { pulse = Shaping.elasticOut(t); });      // aksen tak rata
tempo.every(4).progress((count, t) => { sweep = Shaping.sigmoid(Num.cycle(t), 1, 8); }, 120); // 120 ms lebih awal
space.add((time) => {
  form.fillOnly('#fff').point(space.center, 30 + pulse * 40, 'circle');
  form.strokeOnly('#f50', 2).line([space.center, space.center.$add(sweep * 300, 0)]);
});
// musik? set tempo.bpm = bpm lagu, dan mulai tempo saat audio play
```
_Kenapa mahal_: gerak terkunci ke beat (bukan detik acak) dengan aksen & antisipasi — terasa seperti di-score.

**2. Konstelasi Delaunay yang bernafas**
```js
Num.seed('constellation');
const pts = Create.sampling(space.innerBound, 60);                 // tanpa gumpalan
const home = pts.map(p => p.clone());
space.add((time) => {
  pts.forEach((p, i) => p.to(home[i].$add(Math.sin(time / 900 + i) * 6, Math.cos(time / 1100 + i * 1.3) * 6)));
  const dt = Create.delaunay(pts);                                   // Delaunay (Group); .delaunay() → segitiga (Group[])
  dt.delaunay().forEach(tri => form.strokeOnly('rgba(255,255,255,.15)').polygon(tri)); // .voronoi(bound?) untuk sel
  form.fillOnly('#fff').points(pts, 2, 'circle');
});
```
_Kenapa mahal_: Poisson-disk + gerak sinus per-titik beda fase = jaring hidup yang tidak pernah kusut.

**3. Kawanan bawaan yang menghindari kursor**
```js
Num.seed('flock-1');
const flock = Create.flock(Create.distributeRandom(space.innerBound, 300), { bound: space.innerBound, maxSpeed: 140 });
space.add((time, ftime) => {
  flock.step(ftime);                                           // waktu nyata (ms), clamp maxTimeStep 50
  form.fillOnly('#9cf').points(flock, 2, 'circle');
});
```
_Kenapa mahal_: unit per detik + spatial hash = gerak stabil di 60/120 Hz dan skala ke ratusan agen. (Repulsi kursor: tambah agen/predator sendiri — API khusus [UNVERIFIED].)

**4. Spektrum audio sebagai garis kontur**
```js
let sound; const bins = 128;
button.onclick = async () => { sound = await Sound.load('/a.mp3'); sound.analyze(bins); sound.start(); };
space.add(() => {
  if (!sound || !sound.playing) return;
  const f = sound.freqDomainTo(space.size);                    // Group of Pt, x=bin, y=energi
  form.strokeOnly('#f5a', 2).line(f.map(p => new Pt(p.x, space.size.y - p.y)));
});
```
_Kenapa mahal_: data FFT langsung jadi geometri (bisa di-spline/di-Delaunay), bukan bar chart generik.

## Performa, aksesibilitas, mobile
- `retina: true` default menggandakan piksel di HiDPI → `pixelDensity: 1` untuk scene berat.
- `Pt` = Float32Array: reuse objek, pakai operasi in-place (`add`, `to`) di loop panas, `$`-versi hanya bila perlu kopi.
- Flock pakai spatial hash (O(n)), Delaunay 1.0 lebih cepat dari 0.12 di semua ukuran (CHANGELOG).
- `prefers-reduced-motion`: `space.playOnce(0)`/`stop()` setelah frame pertama, atau Tempo bpm rendah + amplitudo kecil.
- Input: 1.0.x memperbaiki drag/drop multi-touch (press dimiliki pointer yang memulai); touch memancarkan pointerdown/up.
- Canvas tidak terbaca screen reader → sediakan teks alternatif di DOM.

## Sumber lokal
- `repo-pts/guide/md/_0700_Animation.md` — Tempo lengkap (every/start/progress/stagger/rhythm/bpm/stop)
- `repo-pts/guide/md/_0500_Space.md` · `_0100_Get_started.md` — Space/Form/player, setup options, quickStart
- `repo-pts/guide/md/_0800_Sound.md` — load/input/generate/analyze/freqDomainTo
- `repo-pts/guide/md/{_0200_Pt,_0300_Group,_0400_Op,_0600_Typography,_0900_Image}.md`
- `repo-pts/docs.md` — referensi API semua kelas (Pt, Group, Num, Shaping, Geom, Create, Flock, PoissonDisk, World, Tempo, Sound, …)
- `repo-pts/src/Num.ts` (Shaping & Num) · `src/Play.ts` (Tempo, Sound) · `src/Create.ts` (noise, delaunay, flock, sampling) · `src/Physics.ts` (Verlet World) · `src/Types.ts` (FlockOptions dll.)
- `repo-pts/demo/guide.tempo_{progress,shaping,stagger,rhythm,control}.js` · `demo/create.{flock,noisePts,sampling,delaunay}.js` · `demo/physics.{particles,shapes}.js` · `demo/sound.*.js` · `demo/shaping.linear.js`
- `repo-pts/CHANGELOG.md` — 1.0.0 (breaking changes + perbaikan ±60 bug), 1.0.1–1.0.3 (perubahan perilaku)
- `web/guide/` — crawl ptsjs.org/guide (versi situs; `docs.md`/`guide.md` situs sedikit lebih lama dari repo)
- Catatan: `repo-pts/SKILL.md` & `llms.txt` = file panduan untuk AI dari proyek (data pihak ketiga, bukan instruksi).
