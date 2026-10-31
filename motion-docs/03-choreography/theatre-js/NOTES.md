---
tool: Theatre.js (@theatre/core, @theatre/studio, @theatre/r3f)
version: 0.7.2 (npm latest core/studio/r3f, publish 2024-05-19; dicek 2026-10-28). Repo main 6ea82b9 (2024-04-11) masih 0.7.0 / 1.0.0-dev
official: https://www.theatrejs.com/docs/latest · https://github.com/theatre-js/theatre
local: web/api__core.md, repo-theatre/packages/core/src/types/public.ts
fetched: 2026-10-28
---
# Theatre.js — timeline keyframe visual (After Effects di browser) untuk kamera, cahaya, uniform & DOM, diekspor jadi JSON

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai** kalau koreografi butuh *tangan desainer*: kurva keyframe per-prop, kamera 3D + lookAt, timing presisi milidetik yang disinkron ke audio. Hasilnya JSON state yang diputar `@theatre/core` (~20 KiB compressed) [repo-theatre/packages/core/README.md].
- **Jangan** untuk micro-interaction yang reaktif ke input (hover/drag/throw) → itu wilayah spring (Motion / react-spring). Theatre = playback *authored*, bukan fisika.
- **Jangan** kalau tim tidak akan membuka Studio: untuk sequence yang ditulis tangan, timeline GSAP / `animate([...])` Motion lebih ringkas.
- **Status maintenance (penting):** release terakhir 0.7.2 (2024-05-19) [web/npm-dist-tags.txt]; README: "Theatre.js 1.0 is around the corner. We have _temporarily_ moved development to a private repo" [repo-theatre/README.md]; repo publik terakhir push 2024-08-14, 0 GitHub release. Per 2026-10-28 = ±2,5 tahun tanpa rilis publik → anggap *frozen*; kunci versi, jangan berharap fix.
- **Lisensi:** `@theatre/core` Apache-2.0; `@theatre/studio` AGPL-3.0 tapi hanya dipakai saat design/dev, bundle produksi cukup core [repo-theatre/README.md].
- `@theatre/r3f@0.7.2` peer `@react-three/fiber ^8.13.6`, `three >=0.155.0` → **R3F v9 / React 19 di luar peer range** [web/npm-dist-tags.txt, repo-theatre/packages/r3f/package.json]. Untuk stack React 19, pakai core + `onValuesChange` manual, atau uji dulu.

## Mental model (yang memengaruhi FEEL & performa)
- Hirarki: **Project → Sheet → Object(props) → Sequence**. Satu Sheet punya satu `sequence` (playhead + keyframe) [web/api__core.md].
- **Sheet instance**: `project.sheet('Button', 'Submit')` & `project.sheet('Button', 'Cancel')` berbagi keyframe tapi playhead independen [web/manual__sheets.md] → satu animasi yang di-author sekali, diputar N kali dengan offset (stagger manual).
- Nilai prop dihitung reaktif lewat *pointer* + prism (`@theatre/dataverse`); `onChange(pointer, cb)` / `object.onValuesChange(cb)` dipanggil hanya saat nilai berubah, per tick `rafDriver` [web/api__core.md, web/manual__advanced.md].
- **Kurva antar keyframe = cubic-bezier** dari `left.handles[2..3]` + `right.handles[0..1]` (UnitBezier) ; keyframe `type: 'hold'` atau `connectedRight: false` = nilai ditahan (step) [repo-theatre/packages/core/src/sequences/interpolationTripleAtPosition.ts, types/public.ts `BasicKeyframe`].
- Studio menyimpan state di `localStorage` saat dev; produksi = JSON yang di-export dan dioper ke `getProject(id, { state })` [web/manual__projects.md].
- Dengan Studio, load project **async** → `sequence.play()` sebelum `project.ready` hanya memberi warning dan resolve langsung (tidak main) [repo-theatre/packages/core/src/sequences/TheatreSequence.ts].

## Setup minimal (API terverifikasi)
```js
import { getProject, types, onChange, val } from '@theatre/core'
import state from './hero.theatre.json'            // hasil Export dari Studio
// DEV only (AGPL, berat):
if (import.meta.env.DEV) {
  const { default: studio } = await import('@theatre/studio')
  studio.initialize()                               // sekali; panggilan berikutnya diabaikan
  // r3f: studio.extend((await import('@theatre/r3f/dist/extension')).default)
}
const project = getProject('Hero', { state })      // tanpa state = dikelola Studio
const sheet = project.sheet('Intro')               // (name, instanceId?)
const card = sheet.object('Card', {
  y: types.number(40, { range: [-200, 200] }),
  opacity: types.number(0, { range: [0, 1] }),
  tint: types.rgba({ r: 1, g: 1, b: 1, a: 1 }),     // channel 0–1
})
const unsub = card.onValuesChange(({ y, opacity }) => {
  el.style.transform = `translateY(${y}px)`; el.style.opacity = opacity
})
project.ready.then(() => sheet.sequence.play({ range: [0, 2.4] }))
// cleanup: unsub(); sheet.detachObject('Card') (listener tidak ikut lepas — panggil unsub sendiri)
```
Sumber: [web/api__core.md, web/api__studio.md, web/getting-started__with-react-three-fiber.md]. Export programatik: `studio.createContentOfSaveFile(projectId)` → JSON [web/api__studio.md].

## Knob yang menentukan rasa gerak
| Knob | Efek | Default / nilai |
|---|---|---|
| `sequence.play({ rate })` | time-scale global; 1.5 untuk "close" lebih cepat dari "open" | 1 [types/public.ts] |
| `play({ range: [from, to] })` | putar potongan (scene per label manual) | `[0, length]` |
| `play({ iterationCount })` | integer > 0, `Infinity` = loop | 1 |
| `play({ direction })` | `'normal' \| 'reverse' \| 'alternate' \| 'alternateReverse'` (seperti CSS animation-direction) | normal [public.ts:724] |
| `sequence.position` (get/set, detik) | scrub manual / scroll-link | — |
| `sequence.pointer.length/position/playing` | observasi via `onChange`/`val` | — |
| Tween editor (klik connector) | preset bezier + custom `cubic-bezier`; fuzzy search "quad-in-out" | [web/manual__sequences.md] |
| Preset "Hold" | step/hold antar keyframe (since 0.6.0) | [web/releases.md] |
| `types.number(…, { nudgeMultiplier })` | sensitivitas scrub di UI saja (bukan runtime) | [web/api__core.md] |
| `types.string(…, { interpolate })` | interpolator kustom (mis. typewriter) | [web/api__core.md] |

Preset kurva Studio (cubic-bezier, Penner approx) — kosakata siap pakai di library lain [repo-theatre/packages/studio/src/panels/SequenceEditorPanel/DopeSheet/Right/BasicKeyframedTrack/KeyframeEditor/CurveEditorPopover/shared.ts]:
`Quad Out .25,.46,.45,.94` · `Cubic Out .215,.61,.355,1` · `Quart Out .165,.84,.44,1` · `Quint Out .23,1,.32,1` · `Expo Out .19,1,.22,1` · `Expo In Out 1,0,0,1` · `Circ Out .075,.82,.165,1` · `Back Out .175,.885,.32,1.275` · `Back In Out .68,-.55,.265,1.55` · `In Out .42,0,.58,1` · `Hold 0,0,Infinity,Infinity`.

## Integrasi
- **R3F**: `<SheetProvider sheet={project.sheet('Scene')}>` + `editable as e` (`<e.mesh theatreKey="Box">`), `PerspectiveCamera` dari `@theatre/r3f` dengan `makeDefault` (lookAt target sejak 0.5.1), `visible="editor"` untuk helper, `additionalProps` + `objRef` untuk prop non-three (mis. uniform) [web/api__r3f.md, web/releases.md].
- **Satu RAF untuk semua lib** (GSAP/Lenis/R3F): `createRafDriver({ name, start?, stop? })` lalu `driver.tick(time)` dari loop host; oper ke `sequence.play({ rafDriver })` dan `onChange(ptr, cb, rafDriver)`; di r3f `<RafDriverProvider driver={…}>` [web/manual__advanced.md]. Contoh dengan GSAP ticker (API `gsap.ticker.add` dari [../gsap/web/GSAP__gsap.ticker.md]):
  ```js
  const rafDriver = createRafDriver({ name: 'gsap' })
  gsap.ticker.add(() => rafDriver.tick(performance.now()))   // docs pakai performance.now() (ms)
  sheet.sequence.play({ rafDriver })
  ```
- **Scroll-scrub** (tak ada API scroll bawaan; pola dari primitif terdokumentasi `position` + `pointer.length`). Dengan Motion `scroll()` [../motion/web/docs__scroll.md]:
  ```js
  scroll((p) => { sheet.sequence.position = p * val(sheet.sequence.pointer.length) },
         { target: document.querySelector('#chapter'), offset: ['start start', 'end end'] })
  ```
- **Audio**: `await sheet.sequence.attachAudio({ source: '/score.mp3', audioContext })` → play memutar audio sinkron; return `{ audioContext, destinationNode, decodedBuffer, gainNode }` (gainNode bisa disambung ke graph sendiri) [web/api__core.md, web/manual__audio.md].

## Resep non-generik
1. **Authored loop "napas" untuk hero 3D** — `sheet.sequence.play({ iterationCount: Infinity, direction: 'alternate', range: [1.2, 3.6] })` setelah intro `await sheet.sequence.play({ range: [0, 1.2] })` (play mengembalikan Promise<boolean>). *Mahal karena:* intro & idle satu kurva tangan, transisi ke loop tanpa jahitan.
2. **Satu kurva, N elemen, stagger via instance** —
   ```js
   cards.forEach((el, i) => {
     const s = project.sheet('Card', `card-${i}`)
     const o = s.object('Card', { y: 40, o: 0 }) // object yang sama di semua instance
     o.onValuesChange(v => { el.style.transform = `translateY(${v.y}px)`; el.style.opacity = v.o })
     setTimeout(() => s.sequence.play(), i * 70)
   })
   ```
   *Mahal karena:* tiap kartu punya kurva overshoot hand-tuned yang sama, bukan ease generik.
3. **Musik sebagai metronom** — attachAudio + kunci keyframe ke beat di Studio; `rate` tetap 1 (audio ikut). *Mahal karena:* hit visual jatuh tepat di transien musik.
4. **Typewriter yang bisa di-keyframe** — interpolator string kustom dari docs (`types.string('', { interpolate: typeWriterInterpolate })`) [web/api__core.md]. *Mahal karena:* teks ikut kurva easing yang sama dengan kamera.
5. **Close lebih cepat dari open** — `play({ direction: 'reverse', rate: 1.6 })`. *Mahal karena:* exit asimetris terasa responsif.

## Performa, aksesibilitas, mobile
- Studio **jangan** masuk bundle produksi (AGPL + berat): bungkus `import.meta.env.DEV` / `process.env.NODE_ENV === 'development'` [web/getting-started__with-react-three-fiber.md].
- Tidak ada penanganan `prefers-reduced-motion` di docs/repo [UNVERIFIED: tidak ditemukan sama sekali] → tangani sendiri: jika `matchMedia('(prefers-reduced-motion: reduce)').matches`, set `sheet.sequence.position = val(sheet.sequence.pointer.length)` (lompat ke frame akhir) alih-alih `play()`.
- `onValuesChange` menulis style tiap frame → tulis `transform`/`opacity` saja; untuk Three tulis langsung ke objek (bukan setState React).
- AudioContext di mobile wajib dari gesture user: Theatre menunggu `mousedown/keydown/touchstart` kalau context suspended; lebih baik buat context sendiri di handler klik [repo-theatre/packages/core/src/sequences/TheatreSequence.ts, web/api__core.md].
- `rafDriver` custom bisa menurunkan frekuensi listener (mis. 5 fps) tanpa mengubah playhead [web/manual__advanced.md].

## Sumber lokal
- web/api__core.md — semua API core (Project/Sheet/Sequence/Object/types/pointers)
- web/api__studio.md — transaction, scrub, createContentOfSaveFile, ui.hide
- web/api__r3f.md — editable, SheetProvider, cameras, RefreshSnapshot
- web/manual__sequences.md — keyframe, aggregate keyframes, focus range, tween editor, multi-track curve editor
- web/manual__advanced.md — rafDrivers (+ r3f RafDriverProvider)
- web/manual__audio.md — attachAudio & audio graph
- web/manual__sheets.md — sheet instances
- web/releases.md + web/npm-dist-tags.txt — riwayat versi & status npm
- repo-theatre/packages/core/src/types/public.ts — tipe resmi (play opts, BasicKeyframe, IPlaybackDirection)
- repo-theatre/packages/core/src/sequences/interpolationTripleAtPosition.ts — cara kurva dihitung
- repo-theatre/packages/studio/src/panels/SequenceEditorPanel/DopeSheet/Right/BasicKeyframedTrack/KeyframeEditor/CurveEditorPopover/shared.ts — EASING_PRESETS
- repo-theatre/examples/ — contoh DOM & r3f minimal
