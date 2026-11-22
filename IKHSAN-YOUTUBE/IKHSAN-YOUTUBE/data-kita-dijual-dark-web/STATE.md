# data-kita-dijual-dark-web — STATE (V2 Overhaul Selesai · Siap Cek di Motion Studio `8800`–`8807` · BELUM Full Render)

Long-form 16:9 Indonesia (**`816.10 s` / `13:36`**, `30 fps`, `24.483` frame), standar **Relentless Non-Conformist Gelap (`#0B0C09`) + §8 AGI + §9 Batam SWRO + §10 Paket Elemen Season 2**, VO **`eleven_v4`** (Ahmad), hasil kolaborasi **🎬 Ahtor + PhotoCraft Live (`D01`–`D07`)**.

## Pembaruan Besar V2 (Menjawab 100% Revisi Ikhsan)
1. **0 AI-Slop Card (100% Dihapus):** Seluruh kotak persegi gelap bertopi garis warna (`fillRect('#141611')`) di `bab-peta`, `bab-1`, `bab-2`, `bab-3`, `bab-4`, `puncak`, & `penutup` diganti arsitektur tipografi editorial terbuka (`editorialRow`, `heroStat`, `Peta Jalur`, `kineticBento` media hidup, 282-cell outage grid, 3 metafora fisik jam/meteran/kalender UU PDP, orbit partikel pajak, & `ui.saklar` toggle hidup di dalam ponsel `D06`).
2. **0 Dead Visual (`dead=0` di audit otomatis per 4 detik + titik revisi):**
   - `bab-peta` `00:02.31`: langsung buka hero `Rp0,49` + `D01` sejak Frame 1.
   - `bab-1` `00:18.12`: langsung isi simulasi browser `raidforums.com` akun "Kotz" + kursor klik tepat saat `evidFull` Kompas keluar.
   - `bab-1` `00:37.86`: langsung animasi pecahan hitung mundur `Rp133.050.000 ÷ 270.000.000 → Rp0,49` + `D01` sejak Frame 1 stasiun.
   - `puncak` `00:15.5–18.2s`: langsung tampil judul & orbit aliran uang pajak sejak Frame 1 stasiun.
3. **Tipografi Bersih Tanpa Outline Berantakan & Nol Tumpang Tindih:** `letterNum` bergaris tipis diganti `heroStat` (League Gothic padat + garis aksen + `wrapTxt` dengan jarak vertikal terjamin ≥ 58 px), kata sisa film AI (`scratchpad`/`shutdown.sh`) di `kit/fisika.js` sudah dibersihkan total, dan seluruh kolom kiri/kanan diberi `maxW` ketat.
4. **Stabilo 100% Pixel-Verified (`HL_MAP` di `kit/vault.js`):** Seluruh 18 screenshot artikel diukur lewat grid koordinat `build/qa/hl_grid_1.jpg` & `hl_grid_2.jpg` (`dark: true` + `screen` blend pada screenshot gelap `kompasSim`, `csirt`, `kompas2`, `komdigi`, `uupdp`; blok bersih §9.2 tanpa jajar genjang miring).
5. **Bukti Artikel & Visual Dokumenter Hidup:** `kit/kit.js` `evid` kini aktif bergerak (*push-in*, *floating drift*, *softbox sheen*, stabilo hidup), diperkaya `ui.browser`, `ui.kursorJalan`, `ui.notif`, `ui.saklar`, `ui.kotakKomentar`, `tipo.lensa`, `tipo.garisTangan`, `prop.jam`, `prop.kalender`, `prop.pintu`, `prop.pusatData`, `data.jalur`, `data.waffle`, `peta.petaDunia`, `peta.petaPulau` + `ruteBusur`, `efek.screenCrack`, `efek.wordRain`, & `season2.kineticBento`.
6. **Istilah Lebih Jelas untuk Awam:** `"WASIT"` diganti menjadi **`"POLISI DATA (LEMBAGA PDP)"`** di `bab-peta`, `bab-4`, & `penutup`.

## QA Visual Rapat V2 (`tools/qa_sheets.py` + inspeksi langsung semua 8 lembar `build/qa/v2_*.jpg`)
- **0 JS runtime error, 0 broken asset fetch (`http=0`), 0 dead visual (`dead=0`)** pada seluruh 8 bab.
- Semua 8 *micro-overlap* yang ditemukan saat inspeksi contact sheet pertama V2 sudah diperbaiki dan diverifikasi ulang lewat contact sheet `build/qa/v2_*.jpg`.

## Tabel Bab & Port Motion Studio (`8800`–`8807`)

| Bab | VO (`eleven_v4`) | Durasi | Frame (`30 fps`) | SFX + Hits | URL Motion Studio |
| --- | --- | ---: | ---: | --- | --- |
| `intro` | `01` (`42.48 s`) | `48.22 s` | `1447` | `56 SFX · 8 hits` | `http://127.0.0.1:8800` |
| `bab-peta` | `03` (`26.64 s`) | `28.34 s` | `850` | `12 SFX · 3 hits` | `http://127.0.0.1:8801` |
| `bab-1` | `04` (`190.08 s`) | `191.83 s` | `5755` | `30 SFX · 6 hits` | `http://127.0.0.1:8802` |
| `bab-2` | `05` (`112.48 s`) | `114.23 s` | `3427` | `22 SFX · 5 hits` | `http://127.0.0.1:8803` |
| `bab-3` | `06` (`173.28 s`) | `175.03 s` | `5251` | `30 SFX · 6 hits` | `http://127.0.0.1:8804` |
| `bab-4` | `07` (`157.36 s`) | `159.11 s` | `4773` | `30 SFX · 6 hits` | `http://127.0.0.1:8805` |
| `puncak` | `08` (`43.68 s`) | `45.43 s` | `1363` | `11 SFX · 3 hits` | `http://127.0.0.1:8806` |
| `penutup` | `09` (`36.40 s`) | `53.90 s` | `1617` | `12 SFX · 3 hits` | `http://127.0.0.1:8807` |
| **Total** | **8 take** | **`816.10 s`** (`13:36`) | **`24483`** | **`203 SFX · 40 hits`** | `build/captions_full.srt` (`197 cues`) |

## Catatan Render
- **BELUM full render MP4** (sesuai arahan Ikhsan: cek dulu revisi V2 lewat Motion Studio).
- Begitu Ikhsan setujui untuk render penuh:
  `GTT_MAX_MB=5600 sh aset/data-kita-dijual-dark-web/tools/render_safe.sh` → `out/data-kita-dijual-dark-web_v1.mp4`.

## Render master 2026-11-21 — DONE 12:01
- out/data-kita-dijual-dark-web_v1.mp4 (13:36, 1920×1080, 16 Mb/s) + build/captions_full.srt (197 cue). Fix: E.inOutQuint ditambah di semua engine.js (backup .bak-20261121-render). Belum review/QA (tanya Ikhsan).
