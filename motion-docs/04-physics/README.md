# 04 — Physics engine & simulasi alam (tactile web)

Pilar: **fisika / tactile feel** — benda yang bisa dipegang, dilempar, ditabrak, ditarik; kain, tali, jelly, cairan.
Sumber daftar: arsenal §4 (Matter.js, Rapier, Verlet, Fluid) + docs-resmi §2. Dicek 2026-10-28.

| Alat | Folder | Peran dalam motion (1 baris) | Versi | URL resmi |
|---|---|---|---|---|
| Matter.js | `matter-js/` | rigid body 2D pure-JS: pill/badge/huruf jatuh, diaduk kursor, gyro→gravity | 0.20.0 (2024-06-23) | https://brm.io/matter-js/ |
| Rapier (JS/WASM) | `rapier/` | engine 2D/3D cepat: ratusan–ribuan body, CCD, joint, **soft body (0.21)**, snapshot/determinisme | 0.21.0 (2026-09-25; core 0.36) | https://rapier.rs/docs/user_guides/javascript/getting_started_js |
| react-three-rapier | `react-three-rapier/` | Rapier 3D deklaratif di R3F: lanyard badge, plinko, joint hooks, interpolasi | 2.2.0 (2025-11-03; pin rapier3d-compat 0.19.2) | https://github.com/pmndrs/react-three-rapier |
| Verlet / PBD / XPBD (teknik) | `verlet/` | kain, tali, blob bertekanan, robek, grab kursor — implementasi teruji `snippets/verlet-mini.mjs` | Jakobsen 2001 · Müller XPBD · verlet-js 1.0.0 (2014) | https://github.com/subprotocol/verlet-js |
| Fluid simulation (teknik) | `fluid-simulation/` | asap/tinta Navier–Stokes WebGL, riak air, distorsi trail kursor | Pavel WebGL-Fluid-Simulation @2024-11-12 · GPU Gems ch.38 · Stam 2003 | https://github.com/PavelDoGreat/WebGL-Fluid-Simulation |
| Physics math | `_physics-math/` | cheat sheet: pegas ζ/ω0 ↔ bounce/visualDuration, damping fps-independent, momentum, rubber band, velocity lempar, fixed timestep, substep | Motion v14.7.1 src + kanon (Gaffer, Holden, Driscoll, Catto, Müller) | https://gafferongames.com/post/fix_your_timestep/ |

Setiap folder: `NOTES.md` (cheat sheet ahli) + `repo-*/` (sparse clone resmi) + `web/` (halaman → Markdown) +
`snippets/` (kode sendiri yang sudah dites di Node, bila ada).

## Pilih yang mana?
| Situasi | Pilih | Alasan |
|---|---|---|
| 10–200 pill/badge/huruf DOM jatuh & bisa diambil, tanpa build WASM | **Matter.js** + DOM sync (`afterTick`) | sinkron, kecil, MouseConstraint siap; dinding tebal (tanpa CCD) |
| Ratusan–ribuan objek 2D, objek cepat, stack stabil, perlu replay/scrub | **Rapier2D** (`-compat` bila tanpa bundler; `-deterministic` bila harus identik lintas device) | WASM cepat, CCD otomatis vs fixed, snapshot |
| Scene 3D di React Three Fiber | **react-three-rapier** | `<Physics interpolate>`, joint hooks, events deklaratif |
| Lanyard/ID badge interaktif | r3r rope joints (pola Vercel) — atau 2D: `verlet/` | rope + spherical + kinematic drag + Catmull-Rom |
| Kain/curtain/tali dekoratif ditarik kursor, bisa robek | **verlet/XPBD sendiri** (`verlet/snippets`) | < 1 ms, stabil, tanpa dependensi |
| Kain/tali/jelly yang bertabrakan dengan rigid body | **Rapier 0.21 soft body** (`SoftBodyDesc.rope/grid/disk`, `setSoftness(Hz, ζ)`) | collision 2 arah, tearing, FEM |
| Asap/tinta warna mengikuti kursor | **Pavel fluid** (SIM 64–128, bloom off di mobile) | stable fluids + vorticity |
| Riak air / klik = tetes | **ripple wave-equation** (koef ≤ 2.0) | 1 pass, sangat murah |
| Distorsi gambar "cair" saat hover | **FBO trail** (decay + splat, RGB split) | 2 pass low-res |
| Satu elemen UI terasa "berbobot" (follower, magnetic, sheet) | **spring math** (`_physics-math`) / Motion spring | tanpa engine; closed form, warisi velocity |
| Flick lalu meluncur & snap | **decay τ + projection + spring** (`_physics-math` resep 1) | mendarat tepat, kontinu |

## Aturan lintas alat (paling sering salah)
1. **Fixed timestep + interpolasi** (Gaffer). Matter Runner 0.20 fixed tapi tanpa interpolasi → set `delta: 1000/120`
   atau render α sendiri; Rapier mentah tidak punya akumulator; r3r punya (clamp 0.5 s).
2. **Satuan**: Matter velocity = px per 16.67 ms, gravity 0.001 ≈ 1000 px/s²; Rapier = meter (atau set
   `world.lengthUnit` = px/m — kalau tidak, velocity cap 400 unit/s membuat lemparan px "mati").
3. **Velocity pointer** dari jendela 100 ms (Motion PanSession) — bukan delta event terakhir.
4. **Frame-rate independence**: `1 − exp(−λ·dt)`, jangan `lerp(a, b, 0.1)` per frame; ripple/fluid Pavel per-step/per-event
   → normalisasi dengan dt.
5. **Reduced motion**: pre-settle (step N kali offscreen lalu render statis), matikan gyro/auto-splat.
6. Hidden tab / resize: clamp dt, rebuild dinding; `free()` objek WASM Rapier saat unmount.
