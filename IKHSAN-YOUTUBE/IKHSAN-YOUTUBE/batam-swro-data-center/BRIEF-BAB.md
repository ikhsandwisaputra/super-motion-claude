# BRIEF PRODUKSI BAB — Batam SWRO Data Center ("AWAN atau PIPA?")

Standar kualitas: **`agi-setara-manusia` (Kasta Tinggi)** + panduan visual yang disetujui Ikhsan:
- **Arah visual (keduanya dipakai):** Dunia ruang server gelap (`#0B0C09`, garis LED gading `#F1EFE6`, aksen tunggal `#C8F53C`) untuk hook & mesin komputasi panas → balik ke dunia laboratorium/arsitektur terang (`#EAE7DC`, tinta `#11120E`, `WebGL2 Worley caustic/ripple` + membran SWRO).
- **Latar dokumenter full-bleed:** Selalu pakai `layarFoto` (atau `bgPlate` full-bleed di intro) — **DILARANG menaruh foto/klip stok dalam kotak/bingkai**. Hanya bukti berita/artikel (`evid`, `evidFull`) dan `grafik` terverifikasi yang menjadi kartu bukti.
- **Tahan kartu bukti >= 2,0–2,5 dtk**; jangan ada jeda statis > 4 dtk; min 1 elemen visual baru per 3–5 dtk.
- **Semua angka `🟡` terlarang tidak boleh muncul.** Setiap `kutipan/*.png` wajib `srcTag` dengan `sumberTeks` persis ≥ 1,5 dtk. Setiap penggunaan foto CC `commons-reverse-osmosis-desalination-plant.jpg` wajib menampilkan `"Foto: James Grellier via Wikimedia Commons (CC BY-SA 3.0)"` di layar.
- **Portal antar-bab:** `kit/portal.js` ("Katup Pipa Laut"). Di `intro`, portal keluar pada `0.90 s` terakhir; di bab kit, `0.72 s` awal + `0.90 s` akhir aman dari teks krusial (`penutup` tanpa portal keluar, 20+ detik terakhir sisi kanan bersih untuk YouTube end-screen slots + tombol `SUBSCRIBE -> SUBSCRIBED ✓`).
- **Safety RAM render:** Cek frame wajib pakai `flock /tmp/bsw-render.lock .venv/bin/python -I tools/render_full.py <bab> --k 1 --workers 2 ...` dan **`--mode all` FULL RENDER DILARANG sampai Ikhsan memberi izin sesudah meninjau port Studio.**

---

## Port Motion Studio (`8800`–`8807`)

| Bab | VO (`bsw_vo_ahmad_{n}`) | Durasi VO | Dunia & Warna Utama | Musik (`BED` / Score) | Port |
| --- | --- | --- | --- | --- | --- |
| `intro` | `01` | `48.64s` | Ruang Server Malam (`#0B0C09`) → Dunia Terang (`#EFECE2` + caustic air) → Gelap Judul `"AWAN ATAU PIPA?"` | `mixkit-musik-cyberpunk-city-140.mp3` (potongan ber-drop) | `8800` |
| `bab-peta` | `03` | `26.56s` | Biru Samudra Gelap (`#0D151B`, aksen `#C8F53C`) — 4 Kartu Peta Bab | `mixkit-musik-vastness-184.mp3` (`ss: 0`) | `8801` |
| `bab-1` | `04` | `138.56s` | Terang Lab Arsitektur (`#EAE7DC`) → Kemarau Panas Gelap (`#141310`) | `mixkit-musik-vastness-184.mp3` (`ss: 25`) | `8802` |
| `bab-2` | `05` | `147.44s` | Awan Terang Singkat (`#EAE7DC`) → Gelap Server Panas (`#0B0C09`) | `mixkit-musik-cyberpunk-city-140.mp3` (`ss: 0`, loop/vastness mid) → `feedback-dreams` | `8803` |
| `bab-3` | `06` | `132.96s` | Laut Dalam (`#0A161E`) → Terang Lab SWRO (`#EAE7DC` + `watergl.js` caustic + `membranSWRO`) | `mixkit-musik-vastness-184.mp3` (`ss: 70`) | `8804` |
| `bab-4` | `07` | `66.32s` | Terang Semu (`#EAE7DC`) → Gelap Ongkos & Brine (`#0B0C09` + kristal garam `#D9D6CA`) | `mixkit-musik-feedback-dreams-588.mp3` (`ss: 10`) | `8805` |
| `puncak` | `08` | `36.56s` | Hangat Arang (`#121410`) — Awan Digital vs Air Nyata & Jejak Fisik | `mixkit-musik-vastness-184.mp3` (`ss: 150`) | `8806` |
| `penutup` | `09` | `34.32s` | Hangat Terang (`#ECE1CC`) — Timbangan Warga/Industri, Komentar, `SUBSCRIBE`, End Screen 24s | `mixkit-musik-voxscape-571.mp3` (`ss: 150`) | `8807` |

*(Studio test `tes-membran` tetap jalan di port `8772`.)*

---

## Alokasi 100% Aset Ahri (Verifikasi Bebas Celah)

### 1. Semua 18 Kutipan + `sumberTeks` Wajib + Target `evidFull`
*(Setiap bab memakai `evid(...)` atau `evidFull(...)` — minimal 5–6 `evidFull` miring + stabilo lime di seluruh film.)*

| File (`assets/kutipan/...`) | Ukuran | Bab & Mode | `sumberTeks` (Persis) |
| --- | --- | --- | --- |
| `bpbatam-groundbreaking-swro-kabil-investasi-rp.png` | `2482x760` | `intro` + `bab-3` (`evid`) | `Sumber: BP Batam, 5 Nov 2026` |
| `antaranews-batam-mulai-bangun-swro-untuk-penuhi.png` | `1556x674` | `intro` (`hook`) | `Sumber: Antara News, 5 Nov 2026` |
| `regional-batam-olah-air-laut-jadi-air-bersih-demi.png` | `2236x708` | `intro` + `bab-3` (`evid`) | `Sumber: KOMPAS.com, 5 Nov 2026` |
| `disdukcapil-monthly-archives-maret-2026.png` | `2706x1554` | `bab-1` (`evid`) | `Sumber: disdukcapil.batam.go.id, 27 Maret 2026` |
| `bpbatam-infrastruktur-batam-bp-batam.png` | `2706x1554` | `bab-1` (**`evidFull #1`** + `evid`) | `Sumber: BP Batam, 8 Nov 2025` |
| `ombudsman-artikel.png` | `2248x560` | `bab-1` (`evid`) | `Sumber: ombudsman.go.id, diakses 18 Nov 2026` |
| `detik-warga-sambau-batam-sebut-air-mati-sejak.png` | `2706x1554` | `bab-1` (**`evidFull #2`**) | `Sumber: detiksumut, 5 Okt 2026` |
| `cnbcindonesia-warga-batam-mengeluh-tak-dapat-air-sejak.png` | `1524x672` | `bab-1` (`evid`) | `Sumber: CNBC Indonesia, 6 Okt 2026` |
| `kompas-dugaan-krisis-air-akibat-pusat-data-di.png` | `2248x904` | `bab-1` (`evid`) | `Sumber: Kompas.id, 13 Okt 2026` |
| `rri-waduk-nongsa-kering-bukan-karena.png` | `1484x636` | `bab-1` (`evid`) | `Sumber: rri.co.id - Portal berita terpercaya, 7 Okt 2026` |
| `batampos-produksi-air-bersih-waduk-nongsa.png` | `2248x640` | `bab-1` (`evid`) | `Sumber: Batam Pos, 21 Okt 2026` |
| `kelbukittempayan-jaga-air-waduk-untuk-masyarakat-batam.png` | `2316x744` | `bab-1` (`evid`) | `Sumber: kelbukittempayan.batam.go.id, 28 September 2026` |
| `nature-data-centre-water-consumption.png` | `2706x1554` | `bab-2` (**`evidFull #3`** + `evid`) | `Sumber: Nature, 15 Feb 2021` |
| `arxiv-ai-data-centers-and-the-water-use.png` | `1696x596` | `bab-2` (`evid`) | `Sumber: arXiv, diakses 18 Nov 2026` |
| `ar5iv-2304-03271-1introduction.png` | `2706x1554` | `bab-2` (**`evidFull #4`**) | `Sumber: ar5iv, diakses 18 Nov 2026` |
| `arxiv-the-environmental-cost-of-digital.png` | `1696x748` | `bab-2` (`evid`) | `Sumber: arXiv, diakses 18 Nov 2026` |
| `bpbatam-bp-batam-dorong-data-center-bangun.png` | `2482x760` | `bab-3` (`evid`) | `Sumber: BP Batam, 24 Sep 2026` |
| `regional-pengembang-data-center-di-batam-kini.png` | `2236x708` | `bab-3` (**`evidFull #5`**, &/atau `evid` di `bab-4`) | `Sumber: KOMPAS.com, 16 Okt 2026` |

### 2. Grafik (`assets/grafik/`), Foto CC (`assets/cc/`), Foto (`assets/foto/`), & Video (`assets/vid/`)
- **Grafik (3/3 terpakai):**
  - `produksi-air-nongsa-kemarau.png` -> `bab-1` (sumber: `Sumber: CNBC Indonesia, detikcom, rri.co.id (diolah)`)
  - `swro-kabil-tahap-1-2030.png` -> `bab-3` (sumber: `Sumber: bpbatam.go.id, ANTARA, Kompas.com (diolah)`)
  - `salinitas-swro-brine.png` -> `bab-4` (sumber: `Sumber: energy.gov, osti.gov (diolah)`)
- **CC BY-SA 3.0 (1/1 terpakai):**
  - `commons-reverse-osmosis-desalination-plant.jpg` -> `bab-3` (`layarFoto` + `evid`) dengan label wajib: `Foto: James Grellier via Wikimedia Commons (CC BY-SA 3.0)`
- **Klip Video Full-Bleed `assets/vid/` (10/10 terpakai lewat `layarFoto` / `bgPlate`):**
  - `server_units` -> `intro`, `bab-2`
  - `server_rack` -> `intro`, `bab-2`, `puncak`
  - `server_room` -> `intro`, `bab-2`, `puncak`
  - `network_cables` -> `bab-peta`, `bab-1`, `penutup`
  - `ocean_waves` -> `intro`, `bab-peta`, `bab-3`, `bab-4`
  - `ocean_aerial` -> `intro`, `bab-3`, `penutup`
  - `waduk_surut` -> `bab-1`, `bab-3`
  - `tanah_retak` -> `bab-1`, `bab-2`
  - `keran_tetes` -> `bab-1`, `bab-4`
  - `cooling_tower` -> `bab-2`, `puncak`
- **Foto diam (`assets/foto/`):** `server_room.jpg`, `ocean_waves.jpg` -> digunakan sebagai fallback / lapis transisi di `intro` atau `puncak`.

### 3. Stock SFX (`assets/stok-situs/`) & Film Transitions (`tx/`)
- **4 SFX Ahri wajib terpakai lewat `"f:<substr>"` di `beats.js` & `intro/tools/mix.py`:**
  - `f:cinematic-swoosh-impact-sound` (`bab-peta`, `bab-3`, `puncak`)
  - `f:movie-impact-transition` (`intro`, `bab-1`, `bab-4`)
  - `f:dramatic-whoosh-swing-cinematic` (`bab-1`, `bab-2`, `penutup`)
  - `f:dramatic-cinematic-riser-impact` (`intro`, `bab-2`, `bab-4`)
- **Film transitions `tx/`:** Campurkan hits bawaan (`stk1`–`stk4`, `cmc1`–`cmc2`, `ldr1`, `gr1`–`gr3`, `hw1`–`hw2`, `shE` — hindari `shD` saat flip gelap→terang dan hindari `hw3`) dengan 4 hits baru: `cvo1`, `cvo2`, `ddt1`, `ddt2`.
  - **Penting:** `ddt1` dan `ddt2` sumber audionya hening (`-180 dB`), wajib selalu dipasangkan dengan SFX non-tonal (`whoosh`/`impact`/`f:...`) di detik yang sama dalam `SFX`!
