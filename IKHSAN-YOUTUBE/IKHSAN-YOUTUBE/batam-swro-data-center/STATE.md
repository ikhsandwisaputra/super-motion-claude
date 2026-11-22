# batam-swro-data-center — STATE (fase: Revisi Putaran 2 selesai & terverifikasi di Studio — BELUM full render)

Long-form 16:9 Indonesia, standar **`agi-setara-manusia` (Kasta Tinggi)** + seluruh revisi putaran 2 Ikhsan:
- **Judul intro lebih deskriptif:** `DATA DI CLOUD, / BUTUH AIR LAUT?` + subjudul `"Kenapa Batam bangun pabrik air laut Rp600 miliar demi data center?"`. Pembuka menampilkan `CLOUD / AWAN` (VO Ahmad tetap `"awan."`).
- **Artikel intro tanpa coretan garis:** diganti stabilo fisik rapi (`multiply`/`screen`) tepat pada frasa inti artikel BP Batam, Antara News, dan Kompas.
- **Peta 3D Satelit Drone Batam & Singapura (`kit/mapgl.js` + `kit/batam.js`):** citra nyata *Sentinel-2 Cloudless 2023* (EOX, CC BY 4.0) 2048×1792 pada bidang 3D WebGL2 perspektif miring — menggantikan semua poligon datar lama di `bab-1` (termasuk pembuka S0 full-bleed) dan `bab-3` (termasuk pipa 12 km Kabil–Nongsa di pesisir timur asli).
- **Bab 2 visual baru:** langit awan foto editorial (`assets/own/cloud_sky_editorial.jpg`) + kipas turbin aksial industri 9 bilah bermesin (`drawAxialFan` di S2 & array 2×2 di S13).
- **Portal antar-bab baru (`kit/portal.js`):** *Lensa Iris Tekanan & Meniskus Air* (6 bilah iris optik + cincin kalibrasi tekanan 72-tick + kamera menyelam menembus bukaan tengah).
- **Nol neon / AI-slop:** seluruh kotak hitam bergaris tipis hijau menyala (`pillBadge` dsb.) dihapus di semua bab, diganti plate editorial matte + blok solid `#C8F53C` bertinta gelap `#11120E`, dengan pencahayaan & kontras dokumenter lebih dramatis.
- **Outro (`penutup`) video selesai & tayang:** VO `09` direkam ulang (Ahmad `eleven_v4`, `36.88 s`) + memakai thumbnail resmi buatan Ahpo (`assets/own/next-agi-setara-manusia.jpg`) untuk merekomendasikan *Apa Itu AGI? Mungkinkah AI Setara Manusia?* (`wpUW0hHwTFs`) dengan ~26 dtk kanan layar bersih untuk slot end-screen YouTube.
- **Timeline Motion Studio lengkap:** `tools/studio_meta.py` mengisi Subtitle, Chapter, Keyframe, dan SFX di seluruh port `8801`–`8807`.

## Tabel Bab & Port Motion Studio (`8800`–`8807`)

| Bab | VO | VOFF | Durasi | Frame (`30 fps`) | Port Studio |
| --- | --- | --- | --- | --- | --- |
| `intro` | `01` | `0.50` | `54.48 s` | `1634` | `http://127.0.0.1:8800` |
| `bab-peta` | `03` | `0.35` | `28.85 s` | `866` | `http://127.0.0.1:8801` |
| `bab-1` | `04` | `0.35` | `140.45 s` | `4214` | `http://127.0.0.1:8802` |
| `bab-2` | `05` | `0.35` | `149.25 s` | `4478` | `http://127.0.0.1:8803` |
| `bab-3` | `06` | `0.35` | `134.85 s` | `4046` | `http://127.0.0.1:8804` |
| `bab-4` | `07` | `0.35` | `68.00 s` | `2040` | `http://127.0.0.1:8805` |
| `puncak` | `08` | `0.35` | `38.65 s` | `1160` | `http://127.0.0.1:8806` |
| `penutup` | `09` | `0.35` | `51.15 s` | `1534` | `http://127.0.0.1:8807` |
| **Total** | — | — | **`665.7 s`** | **`19972`** | `build/captions_full.srt` (`172 cues`, `00:11:05,680`) |

## Catatan Render
- **BELUM full master render** (`render_safe.sh` / `render_full.py` tetap ditahan menunggu izin eksplisit Ikhsan).

## Render master (2026-11-19 23:44)
- DONE: `out/batam-swro-data-center_v1.mp4` (11:05.73, 1080p30, AAC 48k) + `build/captions_full.srt` (172 cues). Belum review/QA (tunggu izin Ikhsan).
