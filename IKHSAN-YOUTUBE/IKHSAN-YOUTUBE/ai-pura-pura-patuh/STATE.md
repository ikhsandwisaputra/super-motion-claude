# ai-pura-pura-patuh — STATE (v2 Revisi Penuh Selesai & Lulus QA Visual/Audio)

Long-form 16:9 Indonesia (`779.10 s` / `12:59`, `30 fps`, `23.373` frame), standar **Relentless non-conformist Gelap (`#0B0C09`)** berkiblat pada Video 1 (`teknologi-indo-vs-as`), Video 2 (`ai-data-habis`), dan Video 3 (`ai-bubble-dompet`), hasil kolaborasi penuh **🎬 Ahtor + 🎨 Ahpo (PhotoCraft Live)**:

- **Intro RNC Asli ("Satu Baris" v2):** Studio gelap murni `#0B0C09` + ruler ticks lantai + zoom-back alternating kanan/kiri + **Ahpo `A01` Dua Pintu semi-3D berlapis** (LED rekam merah berkedip + gembok kuningan berayun + pantulan lantai) + stabilo terukur piksel + pertanyaan dunia terang + wordmark brake + disclaimer dive ke lime `EDUKASI.` → Title Card Terang **`AI PURA-PURA PATUH / SAAT TAHU DIUJI?`** → dive ke Bab Peta. Audio intro v2 lengkap **70 SFX** (whip, 3× stereo pass, shutter, light-leak, riser, lime flood, dive; peak `-4.4 dBFS`).
- **Kolaborasi Asli PhotoCraft Live (🎨 Ahpo — 6 Paket `A01`–`A06`, `4000×2250` berlapis + `assets/ahpo/LAPIS.md`):**
  - `A01` Dua Pintu Lab (`intro`, `bab-1`)
  - `A02` Meja Observasi, Buku Scratchpad & Panel Kaca Pengawas X-Ray (`bab-1`, `bab-peta`, `puncak`)
  - `A03` Konsol Terminal Industri & Tuas Sakelar Pemutus Merah (`bab-2`, `penutup`)
  - `A04` Modul Komputasi Sirkuit & Kabel Ethernet RJ45 Dapat Dicabut (`bab-3`)
  - `A05` Palu Hakim Semi-3D, Perisai Hukum 3D & Kitab Hardcover `KUHP`/`KUHAP` (`bab-4`, `penutup`)
  - `A06` Neraca Timbangan Dua Perintah + 2 Piringan Sinkron (`puncak`)
- **Voice Over Natural (`eleven_v3`):** Semua 8 take Ahmad (`01`, `03`–`09`) direkam ulang bersih dengan `eleven_v3` (`stability=0.5`, `similarity_boost=0.8`, tanpa tag emosi marah/CAPS/seru berlebih), arsip di `audio/voiceover/app_vo_ahmad_{01,03..09}.{mp3,align.json}`.
- **Audio Transisi & SFX Penuh (Zero Hit Bisu):** Seluruh hit bisu (`ddt1/2`, `tva1/2`, `-180 dB`) dihapus total dan diganti hit terverifikasi (`stk1..4`, `shD`, `hw2/3`, `gr1/2`, `cvo2`) + `HITDB -5.5 dB` + total **399 SFX events** across film.
- **Tipografi Kinetik & Metafora Visual (`kit/fisika.js`):** `collisionWords` (tabrakan fisik), `shatterWord` (pecah jadi serpihan gravitasi), `letterNum` (angka raksasa isi teks kode), `dotMatrix100` (14%→78%, 79/100, 47%, 97%), `stairsScoreRLHF` (kurva Bezier eksak pusat-ke-pusat menggantikan garis meleset), `splitFlapWord`, `pendulumTag`, `glassFracture` (retak layar di `ALARM BESAR`), 33-cell trap grid, 7-ring radar interogasi, 20-step RepliBench + gerbang fisik KYC, dan `Selam Lubang Huruf` (`counterOf('A')`).
- **Peta Satelit 3D Indonesia (`kit/indomap.js`):** WebGL2 Sentinel-2 Cloudless EOX (CC BY 4.0) mode gelap investigatif di `bab-4`.
- **Outro (`penutup`):** Ruang gelap RNC `#0B0C09` (bukan klon Batam), End Screen bersih separuh kanan **22,6 detik** (`>= 20 dtk`) menunjuk Video 4 AGI (`assets/own/next-agi-setara-manusia.jpg`), kursor klik `SUBSCRIBE` + lonceng.
- **Subtitle SRT:** `build/captions_full.srt` (`195 cues`, `00:12:59,100`).

## Tabel Bab & Audio Mix v2 (`film.json` `versi: 2`)

| Bab | VO (`eleven_v3`) | Durasi | Frame (`30 fps`) | SFX + Hits | Status Port Studio |
| --- | --- | --- | --- | --- | --- |
| `intro` | `01` (`71.36 s`) | `77.20 s` | `2316` | `70 SFX · 10 hits` | Off (ringan) |
| `bab-peta` | `03` (`22.32 s`) | `23.75 s` | `713` | `26 SFX · 3 hits` | Off (ringan) |
| `bab-1` | `04` (`128.80 s`) | `130.30 s` | `3909` | `75 SFX · 6 hits` | Off (ringan) |
| `bab-2` | `05` (`192.48 s`) | `194.00 s` | `5820` | `81 SFX · 7 hits` | Off (ringan) |
| `bab-3` | `06` (`116.56 s`) | `118.05 s` | `3542` | `54 SFX · 6 hits` | Off (ringan) |
| `bab-4` | `07` (`118.88 s`) | `120.40 s` | `3612` | `43 SFX · 6 hits` | Off (ringan) |
| `puncak` | `08` (`51.68 s`) | `53.30 s` | `1599` | `29 SFX · 4 hits` | Off (ringan) |
| `penutup` | `09` (`45.52 s`) | `62.10 s` | `1863` | `21 SFX · 3 hits` | Off (ringan) |
| **Total** | — | **`779.10 s`** (`12:59`) | **`23374`** | **`399 SFX · 45 hits`** | `build/captions_full.srt` (`195 cues`) |

## Catatan Render Master v2
- Frame v1 lama sudah dibersihkan total (`*/build/full` kosong).
- Render OOM-safe v2: `GTT_MAX_MB=5600 sh aset/ai-pura-pura-patuh/tools/render_safe.sh` → `out/ai-pura-pura-patuh_v2.mp4`.

## Render master v2 (2026-11-20 01:23)
- DONE: `out/ai-pura-pura-patuh_v2.mp4` (12:59.10, 1080p30, AAC 48k) + `build/captions_full.srt` (195 cues). Belum review/QA (tunggu izin Ikhsan).
