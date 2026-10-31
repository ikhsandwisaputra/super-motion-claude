# 10 — Micro-Interactions & High-Craft UI Patterns

Detail kecil yang membuat situs terasa "dibuat dengan tangan": elemen yang bereaksi pada niat user (magnet, kursor),
ruang yang bisa dijelajah (infinite canvas), momen pembuka yang berirama (preloader), dan navigasi keyboard yang cepat
(⌘K). Kecuali cmdk, semuanya **pola** — catatan memberi resep framework-agnostic yang frame-rate independent, dengan
angka nyata dari repo Codrops/Lunardi yang di-mirror.

| Alat / pola | Folder | Satu baris | Rujukan kanonik |
|---|---|---|---|
| cmdk 1.1.1 | [cmdk/](cmdk/NOTES.md) | Command palette React tanpa gaya; animasi via `--cmdk-list-height`, `data-selected`, Radix `data-state` | https://github.com/pacocoursey/cmdk |
| Magnetic elements | [magnetic/](magnetic/NOTES.md) | Elemen tertarik ke kursor dalam radius, lapisan dalam berparalaks, pulang seperti karet | Codrops Magnetic Buttons (2020) — github.com/codrops/MagneticButtons |
| Infinite canvas / drag grid | [infinite-canvas/](infinite-canvas/NOTES.md) | Bidang tanpa ujung: modulo wrap / 2×2 tile / chunk 3D, inersia, zoom-out saat ditahan | Lunardi (Codrops 2026, blog) · Codrops infinite parallax grid (2025) |
| Custom cursor | [custom-cursor/](custom-cursor/NOTES.md) | Dot 1:1 + ring ber-massa, state via data attribute, `mix-blend-mode: difference`, stuck/noise/goo | Codrops Custom Cursor Effects (2019), Animated Custom Cursor (2021), Gooey Cursor (2023) |
| Preloader terkoreografi | [preloader/](preloader/NOTES.md) | Counter jujur dari progres aset nyata + durasi minimum → tirai membelah → hero stagger | Codrops RapidLayersAnimation, IntroGridMotionTransition, GSAP tips 2025 + MDN |

Sumber MDN bersama: `../_shared/mdn-content/files/en-us/web/api/{pointer_events,pointerevent,element/setpointercapture}/`,
`.../css/reference/properties/mix-blend-mode/`, `.../css/reference/at-rules/@media/prefers-reduced-motion/`.

## Pilih yang mana?

| Kebutuhan | Pilih | Catatan |
|---|---|---|
| Navigasi/aksi cepat untuk power user (SaaS, docs, portfolio besar) | **cmdk** | pasang ⌘K sendiri; `data-lenis-prevent` pada list |
| CTA/hero/nav terasa "hidup" saat didekati | **magnetic** | maksimal beberapa elemen; hit-area statis, visual bergerak |
| Kursor menjelaskan aksi (Play/Drag/View) | **custom cursor** | hanya `(hover:hover) and (pointer:fine)`; dot 1:1 wajib |
| Index proyek eksploratif ala Figma | **infinite canvas** pola A (DOM) | ≤ ±150 item, a11y lebih mudah |
| Ribuan gambar / kedalaman 3D / fog | **infinite canvas** pola C (R3F chunk) | throttle update chunk, opacity fade |
| Grid yang bergerak berlapis dengan GSAP | **infinite canvas** pola B (2×2 tile) | tambahkan pointer events (repo asli mouse-only) |
| Halaman pertama berat (video/WebGL/font display) | **preloader** | progres nyata + MIN/MAX ms; skip di repeat visit |
| Halaman ringan / navigasi internal | **bukan preloader** → page transition (`../01-scroll-transitions/`) | preloader palsu merusak LCP |

## Rumus inti yang dipakai di semua catatan
- Smoothing frame-rate independent: `x += (target - x) * (1 - Math.exp(-rate * dt))`; konversi dari lerp-per-frame
  Codrops: `rate = -60 · ln(1 - amt)` → 0.05≈3.1/s, 0.1≈6.3/s, 0.2≈13.4/s.
- Inersia: `v *= Math.exp(-friction * dt); x += v * dt` (friction 3–6/s); velocity dari sampel pointer ≤ 100 ms terakhir.
- Spring semi-implicit Euler: `v += (-k·(x - target) - c·v)·dt; x += v·dt` (c = 2√k kritis; c < 2√k = bounce).
- Wrap tile: `k = Math.round((cam - itemCenter) / tile)` (salinan terdekat), tile ≥ viewport/minZoom + ukuran item + margin.
- Selalu: `pointer-events`/`touch-action` yang tepat, `setPointerCapture` untuk drag, `prefers-reduced-motion` → k = 1.
