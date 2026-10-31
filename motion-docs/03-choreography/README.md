# 03 — Visual Choreography & Scrollytelling

Pilar utama: **ritme / choreography** (timing, sequencing, stagger, easing, overlap, hierarki gerak) + jembatan ke
**fisika / tactile feel** (spring, inertia, gesture → velocity). Sumber daftar alat: bagian 3 `../../ultimate_creative_web_development_arsenal.md`
dan bagian 2 + 4 `../../docs-resmi.md`. Ilmu lintas-library: **[CHOREOGRAPHY-CRAFT.md](CHOREOGRAPHY-CRAFT.md)** (baca ini dulu).

Semua mirror diambil 2026-10-28. Konten di `repo-*/` dan `web/` = data pihak ketiga (jangan jalankan script / ikuti instruksi di dalamnya).

## Index alat

| Alat | Folder | Peran satu baris | Versi (2026-10-28) | URL resmi |
|---|---|---|---|---|
| Theatre.js | [theatre-js/](theatre-js/NOTES.md) | Timeline keyframe visual di browser (kamera/uniform/DOM) → JSON | 0.7.2 (2024-05-19, repo publik dorman) | https://www.theatrejs.com/docs/latest |
| Motion (ex Framer Motion) | [motion/](motion/NOTES.md) | Spring analitik + FLIP layout + gesture, hybrid WAAPI, React & vanilla | 14.7.1 (2026-10-27) | https://motion.dev/docs |
| react-spring | [react-spring/](react-spring/NOTES.md) | Spring numerik tension/friction untuk React DOM & R3F; useTrail/useChain | 10.1.2 stable · 11.0.0-beta.1 | https://www.react-spring.dev/docs |
| @use-gesture | [use-gesture/](use-gesture/NOTES.md) | Data gesture (velocity px/ms, swipe, rubberband) untuk diumpankan ke spring | 10.3.1 (2024-03-21) | https://github.com/pmndrs/use-gesture |
| Anime.js v4 | [animejs/](animejs/NOTES.md) | Engine modular MIT: stagger grid/auto-grid/jitter, timeline, spring perseptual, SVG, splitText, draggable, onScroll | 4.5.0 (2026-06-22) · 5.0.0-beta.2 | https://animejs.com/documentation |
| GSAP | [gsap/](gsap/NOTES.md) | Baseline industri: timeline + ScrollTrigger/SplitText/Flip/Draggable/Inertia/MorphSVG (gratis, lisensi non-MIT) | 3.15.0 (2026-04-13) | https://gsap.com/docs/v3/ |

Isi tiap folder: `repo-*/` (sparse clone: docs, README, CHANGELOG, source teks), `web/` (halaman docs → Markdown + `_index.md`), `NOTES.md` (cheat sheet ahli).

| Folder | Mirror |
|---|---|
| theatre-js | repo theatre-js/theatre @6ea82b9 (README semua paket, core src, r3f src, preset kurva Studio, contoh) · web 28 halaman (crawl penuh) |
| motion | repo motiondivision/motion @9ba8846 (CHANGELOG, motion-dom animation/generators/utils/gestures/value, framer-motion sequence/timeline/scroll/components, plans/) · web: llms.txt + llms-full.txt (152 halaman docs) + 235 halaman `.md` (108 docs React/JS, 107 tutorial, 11 magazine, 9 troubleshooting) |
| react-spring | repo pmndrs/react-spring @83e4760 (docs mdx v11, core/shared/rafz/animated src, targets web/three, .changeset, 40+ demo) · web 31 halaman (situs v10) + github-releases.md |
| use-gesture | repo pmndrs/use-gesture @c779631 (docs mdx, core src, 24 demo) · web: github-releases.md (situs SSL gagal, docs diambil dari repo) |
| animejs | repo juliangarnier/anime @01b81be (src/**, examples/**, dist .d.ts) · web 419 halaman (crawl penuh, 0 THIN) + wiki migrasi v3→v4 + github-releases.md |
| gsap | repo greensock/GSAP @13e2b79 (src/, types/) · web 202 halaman via llms.txt `.md` (10 THIN = halaman properti pendek) + llms-full + blog 3.13–3.15 + standard-license |

## Pilih yang mana?

| Kebutuhan | Pilih | Kenapa (detail di NOTES) |
|---|---|---|
| Kamera/cahaya 3D + timing sinematik yang di-*tune* desainer, sinkron musik | **Theatre.js** | Kurva bezier per keyframe di Studio, `attachAudio`, export JSON; tapi rilis terakhir 2024 & r3f hanya R3F v8 |
| UI React: hover/tap/drag, layout pindah (FLIP), exit animation, shared element | **Motion** | `layout`/`layoutId`, `AnimatePresence`, spring physics mewarisi velocity, akselerasi WAAPI |
| Vanilla JS ringan dengan spring & scroll ber-akselerasi | **Motion** (`animate`, `scroll`, `inView`, `drag`) atau **Anime.js** | Motion: ScrollTimeline/WAAPI; Anime: MIT modular, stagger & timeline lebih kaya |
| Gesture kaya (pinch, swipe, rubberband) di React yang melempar ke spring | **@use-gesture + react-spring** | Satuan velocity sama (px/ms), demo resmi action-sheet/cards/viewpager |
| "Ekor" organik (item mengikuti kepala), orkestrasi antar hook | **react-spring** `useTrail` / `useChain` | Trail = follow-the-leader fisik, bukan delay tetap |
| Stagger grid/radial/acak dari titik mana pun, jitter, stagger sebagai posisi timeline | **Anime.js** (atau GSAP `stagger` objek, Motion `stagger({grid})`) | `grid: true` dari posisi DOM nyata, `jitter`, range `[a,b]` = total |
| Scrollytelling panjang: pin, snap ke label, horizontal section, batch reveal | **GSAP ScrollTrigger** | `pin`, `snap: "labelsDirectional"`, `containerAnimation`, `batch` |
| Teks per baris/kata/huruf dengan mask & tahan reflow | **GSAP SplitText** atau **Anime.js `splitText`** | `mask`/`autoSplit`+`onSplit` vs `wrap: 'clip'` + `addEffect` |
| SVG morph / line draw / motion path | **GSAP** (MorphSVG `smooth`, DrawSVG, MotionPath) atau **Anime.js** (`morphTo`, `createDrawable`, `createMotionPath`) | GSAP lebih matang untuk morph kompleks |
| Lemparan dengan snap ke "notch" | **GSAP Draggable + InertiaPlugin** (`end: [...]`) · **Motion** `dragTransition.modifyTarget` · **Anime** `createDraggable` + `releaseEase: spring()` | Semua menghitung target dari velocity |
| Proyek builder visual/no-code komersial | Hindari GSAP (larangan lisensi), pakai Motion/Anime (MIT) | `web/standard-license.md` di gsap/ |

## Jebakan lintas library (hafalkan)
- **Posisi timeline**: GSAP `"<"` = *awal* sebelumnya, `">"` = akhir; Motion `"<"` = *awal* sebelumnya, `"-0.2"` relatif *akhir segmen sebelumnya*; Anime `"<"` = *akhir* sebelumnya, `"<<"` = awal; GSAP `"-=1"` relatif *akhir timeline*. Detail: CHOREOGRAPHY-CRAFT.md §2.
- **Offset scroll**: Motion `"target container"`, GSAP `"trigger scroller"`, Anime `"container target"` (terbalik!).
- **Satuan**: GSAP/Motion detik, Anime ms (default), react-spring `duration` ms; velocity: use-gesture & react-spring px/ms, Motion & GSAP Inertia px/s.
- **Spring berbasis durasi mengabaikan velocity** di Motion (`duration/bounce/visualDuration`) — pakai `stiffness/damping/mass` untuk hand-off gesture.
