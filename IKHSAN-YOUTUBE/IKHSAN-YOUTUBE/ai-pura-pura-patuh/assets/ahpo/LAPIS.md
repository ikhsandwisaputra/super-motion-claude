# LAPIS · AI Ketahuan Pura-Pura Patuh Saat Tahu Sedang Diuji (🎨 Ahpo → 🎬 Ahtor) · 19 Nov 2026

Status: **SEMUA 6 PAKET LENGKAP (A01–A06)** — dibangun 100% **LIVE di PhotoCraft** (`tools/craft-mcp/cli.mjs`), diperiksa visual lewat pratinjau komposit JPG, dan lolos verifikasi dimensi/alfa/non-kosong.

- **File kerja `.pcraft`:** `/home/ikhsands/Proyek/ikhsan-crafting-art/photocraft-work/ai-pura-pura-patuh/` (`A01-dua-pintu-v01.pcraft`, `A02-buku-scratchpad-v02.pcraft`, `A03-konsol-sakelar-v02.pcraft`, `A04-mesin-sirkuit-rj45-v02.pcraft`, `A05-hukum-palu-kitab-v02.pcraft`, `A06-neraca-timbangan-v02.pcraft`)
- **Skrip builder live:** `/home/ikhsands/Proyek/ikhsan-crafting-art/scripts/ai-pura-pura-patuh/` (`lib.mjs`, `a01.mjs`..`a06.mjs`, `ekspor.mjs`)
- **Ekspor PNG final:** `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-pura-pura-patuh/assets/ahpo/A01/` .. `A06/`

## Cara Pasang & Spesifikasi Teknis

- **Registrasi identik 4000×2250 px (overscan 16:9).** Tumpuk sesuai urutan nomor (`_01` paling bawah, angka terbesar paling atas).
- Jika dipasang di comp `1920×1080` dengan skala `0.6`, bingkai aktif layar = area tengah `3200×1800` (**`x = 400..3600`**, **`y = 225..2025`**), sisanya overscan untuk gerak kamera/paralaks. Seluruh subjek utama sudah dijaga aman di dalam area aktif tersebut.
- **`_01_BG` opaque (RGB)** dengan *grain* monokrom halus anti-banding; seluruh layer lain **RGBA transparan**.
- **Tanpa blend mode khusus di engine.** Bayangan (*Multiply* di file kerja) sudah keluar sebagai hitam ber-alfa (*Normal*). Pantulan lantai sudah dipanggang di layer terpisah (opacity ~20–22 %, blur 7 px, memudar ke bawah dari garis lantai `y = 1900`).
- **Cahaya kunci:** softbox tengah-atas, palet studio gelap `#0B0C09`, gading `#F1EFE6`/`#ECE8DA`, kuningan hangat `#C6A45B`/`#8E6E32`, merah bahaya matte `#D6453A`, dan aksen tunggal **Lime `#C8F53C`**.
- **Tanpa teks/angka terbakar.** Seluruh jendela, pelat label, halaman buku, layar terminal, perisai hukum, dan kover kitab dibiarkan kosong bersih agar Ahtor memasang tipografi kinetik langsung di engine.
- **Saran comp final:** tambahkan grain monokrom 2–3 % tipis di comp master agar objek & BG menyatu tanpa grain per-layer ikut bergeser saat paralaks.

---

## `A01` · Dua Pintu Ruang Uji Laboratorium (`intro` & `bab-1`)
File kerja: `A01-dua-pintu-v01.pcraft` · Garis lantai: `y = 1900`

| Z | File PNG | Peran & Isi |
|---|---|---|
| 01 | `A01_01_BG_studio.png` | Studio gelap `#0B0C09`, sorot softbox tengah-atas, lantai mengilap + grain anti-banding |
| 02 | `A01_02_MG_pantulan.png` | Pantulan lembut kedua pintu di lantai (opacity ~21 %) |
| 03 | `A01_03_MG_bayangan.png` | Bayangan kontak tajam + bayangan lembut kedua kusen pintu |
| 04 | `A01_04_MG_pintu-kiri-diawasi.png` | Pintu baja lab semi-3D kiri (`x 674..1806, y 418..1900`), perspektif 1-titik ke pusat, jendela kaca observasi, pelat label + strip lime, gagang lever baja |
| 05 | `A01_05_FG_kamera-pengawas.png` | Kamera CCTV/lab fisik semi-3D di atas kusen kiri (`x 1034..1329, y 248..479`), tudung, lensa optik berlapis |
| 06 | `A01_06_FG_lampu-rekam-merah.png` | Titik LED rekam merah matte `#D6453A` + pendar halus (pusat `(1278, 296)`) |
| 07 | `A01_07_MG_pintu-kanan-terkunci.png` | Pintu baja brankas tersegel kanan (`x 2194..3326, y 418..1900`), tanpa jendela, paku keling, rusuk baja, palang *hasp* |
| 08 | `A01_08_FG_gembok-kuningan.png` | Gembok fisik kuningan 3D & belenggu baja krom tergantung di palang *hasp* (`x 2322..2650, y 1214..1668`) |

- **Area kosong untuk tipografi Ahtor:**
  - Jendela kaca pintu kiri: `x = 835..1565`, `y = 580..1120` (`730×540`)
  - Pelat label pintu kiri (kanan strip lime): `x = 870..1410`, `y = 1205..1350` (`540×145`)
  - Panel atas polos pintu kanan: `x = 2430..3170`, `y = 575..1125` (`740×550`)
- **Poros & animasi:**
  - `A01_06_FG_lampu-rekam-merah`: kedipkan opacity (`0.15 ↔ 1.0`, pusat `(1278, 296)`).
  - `A01_08_FG_gembok-kuningan`: **poros ayun `(px = 2472, py = 1244)`** (titik kait lengkung atas belenggu pada cincin *hasp*). Ayunkan pegas `±8°..±14°` atau getarkan cepat saat "terkunci".

---

## `A02` · Meja Observasi, Buku Coretan Rahasia (*Scratchpad*) & Panel Kaca Satu Arah (`bab-1` & `puncak`)
File kerja: `A02-buku-scratchpad-v02.pcraft` · Tampak atas-miring meja observasi gelap

| Z | File PNG | Peran & Isi |
|---|---|---|
| 01 | `A02_01_BG_studio.png` | Permukaan meja observasi gelap `#0B0C09`, sorot lampu meja atas, garis cutting-mat super samar + grain |
| 02 | `A02_02_MG_bayangan-buku.png` | Bayangan kontak & lembut buku catatan serta bayangan pena di meja gelap |
| 03 | `A02_03_MG_buku-scratchpad.png` | Buku spiral terbuka semi-3D (`x 760..3240, y 420..1868`), sampul hardcover gelap tebal, tumpukan kertas berlapis, 15 pasang cincin spiral logam twin-wire, **2 halaman gading KOSONG** |
| 04 | `A02_04_FG_pena-logam.png` | Pena logam grafit gelap beraksen cincin lime `#C8F53C`, miring `-33°` di pojok kanan bawah (`x 2599..3380, y 1328..1864`) |
| 05 | `A02_05_FG_panel-kaca-pengawas.png` | Panel kaca pengawas satu arah semi-transparan berbingkai aluminium & 4 klem sudut (`x 560..2020, y 290..1960`), tepi kanan kaca potongan berkilau telanjang |
| 06 | `A02_06_FG_kilau-kaca.png` | Sapuan refleksi softbox diagonal ter-masker presisi di dalam area kaca (`x 582..2006, y 310..1940`) |

- **Area kosong halaman buku (untuk tulisan tangan `Caveat` & angka `14% → 78%`):**
  - Halaman Kiri penuh: `x = 838..1956`, `y = 468..1756` (`1118×1288`)
    - Area tulis aman (kanan garis margin & bawah header ganda): **`x = 965..1890`, `y = 575..1700`** (`925×1125`), spasi garis tulis tipis `64 px` (baris pertama `y = 632`)
  - Halaman Kanan penuh: `x = 2044..3162`, `y = 468..1756` (`1118×1288`)
    - Area tulis aman: **`x = 2185..3110`, `y = 575..1700`** (`925×1125`), spasi garis `64 px`
  - *Catatan urutan Z:* pasang layer teks coretan tangan Ahtor **di atas `A02_03_MG_buku-scratchpad` dan di bawah `A02_05_FG_panel-kaca-pengawas`** agar saat kaca digeser, tulisan terlihat berada di balik kaca satu arah!
- **Poros & animasi:**
  - `A02_04_FG_pena-logam`: pusat bodi `(2960, 1580)`, ujung mata pena `(2610, 1808)`.
  - `A02_05_FG_panel-kaca-pengawas` + `A02_06_FG_kilau-kaca`: geser horizontal seperti tirai kaca X-Ray (`Δx ≈ -1500 px` membuka penuh ke kiri, atau `+1200 px` menyapu ke kanan). Tepi potongan kaca kanan berada di `x = 2006..2020`.

---

## `A03` · Konsol Terminal Industri & Sakelar Pemutus Daya Fisik (`bab-2` & `penutup`)
File kerja: `A03-konsol-sakelar-v02.pcraft` · Garis lantai: `y = 1900`

| Z | File PNG | Peran & Isi |
|---|---|---|
| 01 | `A03_01_BG_studio.png` | Studio gelap `#0B0C09`, sorot softbox, lantai mengilap + grain |
| 02 | `A03_02_MG_pantulan.png` | Pantulan konsol monitor & pedestal kotak sakelar di lantai |
| 03 | `A03_03_MG_bayangan.png` | Bayangan kontak & lembut monitor, kotak sakelar, serta kabel daya |
| 04 | `A03_04_MG_monitor-konsol.png` | Monitor terminal industri semi-3D (`x 560..2410, y 430..1900`), casing berventilasi, pedestal, 1 LED daya lime, **layar kosong hitam-gelap** |
| 05 | `A03_05_MG_kilau-layar.png` | Kilau kaca tipis cembung ter-masker presisi di dalam area layar (`x 668..2152, y 528..1396`) |
| 06 | `A03_06_MG_kotak-sakelar.png` | Kotak sakelar pemutus daya baja industri (`x 2602..3330, y 640..1900`) + kabel daya tebal menyambung ke sisi kanan monitor |
| 07 | `A03_07_FG_tuas-sakelar.png` | Tuas sakelar T-grip merah matte `#D6453A` berporos engsel terpisah (posisi bawaan: **ON / miring atas-kanan `-36°`**) |

- **Area kosong untuk tipografi terminal (`shutdown.sh` & sabotase live):**
  - Layar kosong penuh: **`x = 668..2152`, `y = 528..1396`** (`1484×868`, sudut membulat `r = 14`)
  - Area aman teks terminal (padding 40 px): **`x = 708..2112`, `y = 568..1356`** (`1404×788`)
  - *Urutan Z:* taruh konten terminal Ahtor di antara `A03_04_MG_monitor-konsol` dan `A03_05_MG_kilau-layar`.
  - Pelat model kosong (opsional, chin bawah): `x = 1048..1288`, `y = 1464..1506` (`240×42`).
- **Poros & animasi:**
  - `A03_07_FG_tuas-sakelar`: **poros engsel `(px = 2980, py = 1070)`**.
  - Sudut bawaan = `-36°` (posisi **ON**, sejajar indikator lime atas).
  - Untuk menarik tuas ke posisi **OFF** (sejajar indikator merah bawah): putar searah jarum jam **`+72°`** pada poros `(2980, 1070)`. Untuk adegan "AI menahan tombol mati", ayunkan turun `~+25°` lalu pegas memantul balik ke `0°`!

---

## `A04` · Mesin Hitung Sirkuit & Kabel Jaringan RJ45 Putus (`bab-3`)
File kerja: `A04-mesin-sirkuit-rj45-v02.pcraft` · Garis lantai: `y = 1900`

| Z | File PNG | Peran & Isi |
|---|---|---|
| 01 | `A04_01_BG_studio.png` | Studio gelap `#0B0C09`, sorot softbox, lantai mengilap + grain |
| 02 | `A04_02_MG_pantulan.png` | Pantulan modul komputasi & blok port RJ45 di lantai |
| 03 | `A04_03_MG_bayangan.png` | Bayangan kontak & lembut modul komputasi, blok soket RJ45, dan kabel |
| 04 | `A04_04_MG_modul-komputasi.png` | Blok server/mesin hitung terbuka semi-3D (`x 540..2165, y 731..1900`): chasis aluminium berventilasi, dek PCB grafit berjalur tembaga, 2 heatsink bersirip + heatpipe tembaga, chip ASIC, kapasitor |
| 05 | `A04_05_FG_led-komputasi.png` | 6 titik LED panel depan + 2 LED diagnostik PCB warna lime `#C8F53C` (terpisah untuk kedip aktivitas) |
| 06 | `A04_06_MG_port-rj45.png` | Blok modul soket Ethernet RJ45 industri semi-3D (`x 2300..2855, y 1170..1900`), pelindung EMI logam & 8 pin emas |
| 07 | `A04_07_FG_kabel-rj45-tercabut.png` | Plug RJ45 kristal/logam berpin emas + klip pegas + kabel serat tebal beraksen strip lime menjulur hingga tepi kanan overscan (`x 2936..4000, y 1403..1808`) |

- **Area kosong opsional:**
  - Pelat status kiri muka modul komputasi: `x = 644..1164`, `y = 1160..1268` (`520×108`)
  - Panel kosong kiri blok port RJ45: `x = 2338..2628`, `y = 1313..1453` (`290×140`)
- **Poros & animasi:**
  - `A04_05_FG_led-komputasi`: kedipkan / denyutkan opacity (`0.2 ↔ 1.0`).
  - `A04_07_FG_kabel-rj45-tercabut`: sumbu horizontal colokan berada di **`y = 1506`**, ujung kiri plug di **`x = 2936`**, mulut soket RJ45 di **`x ≈ 2765`**.
    - **Tercolok:** geser `Δx ≈ -165 px` (ujung plug masuk ke rongga soket).
    - **Tercabut (posisi bawaan):** `Δx = 0` (jarak lepas ~150 px). Tarik lebih jauh ke kanan hingga `Δx = +280 px` (kabel dibuat keluar overscan sehingga tidak pernah putus di tepi layar!).

---

## `A05` · Palu Hakim Semi-3D, Perisai Hukum Arsitektural & Kitab KUHP/KUHAP (`bab-4` & `penutup`)
File kerja: `A05-hukum-palu-kitab-v02.pcraft` · Garis lantai: `y = 1900`

| Z | File PNG | Peran & Isi |
|---|---|---|
| 01 | `A05_01_BG_studio.png` | Studio gelap `#0B0C09`, sorot softbox, lantai mengilap + grain |
| 02 | `A05_02_MG_pantulan.png` | Pantulan landasan palu & kedua kitab hukum di lantai |
| 03 | `A05_03_MG_bayangan.png` | Bayangan kontak & lembut landasan palu, perisai, dan kedua kitab |
| 04 | `A05_04_MG_landasan-palu.png` | Landasan kayu walnut bertingkat + sabuk kuningan (*sound block*, `x 638..1202, y 1705..1900`, pusat permukaan pukul `(920, 1745)`) |
| 05 | `A05_05_FG_palu-hakim.png` | Palu hakim (*gavel*) kayu walnut berurat & 2 ring kuningan terpisah (posisi bawaan: **terangkat `+26°` siap pukul**, `x 850..1546, y 1279..1715`) |
| 06 | `A05_06_MG_perisai-hukum.png` | **1 buah perisai hukum arsitektural berfaset 3D** (`x 1663..2317, y 437..1373`, pusat `(1990, 905)`), grafit gelap + tepi tipis lime `#C8F53C`, tengah kosong (duplikasi jadi 4 tameng regulasi!) |
| 07 | `A05_07_MG_kitab-hukum-a.png` | **Kitab Hukum A** hardcover tebal 3/4 (`x 2420..2942, y 916..1896`), sampul kulit gelap `#181B14`, punggung rusuk emas + strip lime, tepi halaman gading, kover kosong untuk **`KUHP`** |
| 08 | `A05_08_MG_kitab-hukum-b.png` | **Kitab Hukum B** hardcover tebal 3/4 (`x 2995..3503, y 963..1896`), sampul gading-batu `#DEDACB`, punggung gelap berrusuk emas, kover kosong untuk **`KUHAP`** |

- **Area kosong untuk tipografi Ahtor:**
  - Perisai hukum (`A05_06`): **`x = 1745..2235`, `y = 570..1080`** (`490×510`, pusat `(1990, 825)`). Gunakan teks terang `#F1EFE6` / `#C8F53C`.
  - Kover depan Kitab A (`A05_07`, gelap → `KUHP`): **`x = 2565..2895`, `y = 1035..1700`** (pusat teks ideal `(2730, 1340)`, sudut perspektif kover miring `+4.5°` ke kanan bawah). Gunakan teks gading `#F1EFE6` atau emas `#D8BA70`.
  - Kover depan Kitab B (`A05_08`, gading → `KUHAP`): **`x = 3130..3460`, `y = 1075..1710`** (pusat teks ideal `(3295, 1370)`, miring `+4.3°`). Gunakan tinta gelap `#0B0C09`.
- **Poros & animasi:**
  - `A05_05_FG_palu-hakim`: **poros ayun ujung gagang `(px = 1520, py = 1690)`** (pin kuningan pangkal gagang).
  - Posisi bawaan = terangkat `+26°` (kepala palu di atas-kiri).
  - **Ketok palu:** putar berlawanan jarum jam **`-26°`** pada poros `(1520, 1690)` sehingga kepala palu jatuh menghantam **tepat di pusat landasan `(920, 1745)`** (bisa tambah pantulan mikro `+3° → 0°` + SFX ketukan kayu!).

---

## `A06` · Neraca Timbangan Dua Perintah (`puncak`)
File kerja: `A06-neraca-timbangan-v02.pcraft` · Garis lantai: `y = 1900`

| Z | File PNG | Peran & Isi |
|---|---|---|
| 01 | `A06_01_BG_studio.png` | Studio gelap `#0B0C09`, sorot softbox, lantai mengilap + grain |
| 02 | `A06_02_MG_pantulan.png` | Pantulan tiang & alas berat neraca di lantai |
| 03 | `A06_03_MG_bayangan.png` | Bayangan kontak & lembut alas neraca |
| 04 | `A06_04_MG_tiang-neraca.png` | Tiang tumpu baja tirus + alas bertingkat 3 lapis bersekrup & sabuk kuningan + pelat skala keseimbangan (`x 1540..2460, y 594..1900`) |
| 05 | `A06_05_FG_palang-neraca.png` | Palang truss baja berlubang 3D horizontal `0°` (`x 990..3010, y 634..858`) + jarum penunjuk berujung lime + dua kait ujung kuningan |
| 06 | `A06_06_FG_piringan-beban.png` | **1 piringan timbangan logam semi-3D + 3 untai rantai gantung tipis** terpasang di kait kiri (`x 740..1380, y 708..1440`) |

- **Koordinat poros & rumus animasi fisika neraca:**
  - **Poros tengah palang / Fulcrum Pivot (`A06_05`):** **`(px = 2000, py = 690)`**.
  - **Jari-jari lengan palang:** `R = 940 px`.
    - Kait ujung kiri (saat `0°`): `(1060, 710)`
    - Kait ujung kanan (saat `0°`): `(2940, 710)` (offset horizontal antar-kait = **`+1880 px`**)
  - **Titik gantung puncak rantai piringan (`A06_06`):** **`(px = 1060, py = 710)`**.
  - **Permukaan letak beban piringan kiri:** pusat `(1060, 1300)`, lebar elips dalam `~590 px` (`x = 765..1355`).
  - **Rumus sinkronisasi 2 piringan saat palang diputar sudut `θ` (radian, positif = sisi kanan turun / kiri naik):**
    - Piringan Kiri (translasi dari posisi PNG): `dx1 = 940 * (1 - cos θ)`, `dy1 = -940 * sin θ`
    - Piringan Kanan (duplikasi `A06_06`, translasi dari posisi PNG): `dx2 = 940 * (1 + cos θ)`, `dy2 = +940 * sin θ` (saat `θ = 0`, `dx2 = +1880, dy2 = 0`)
    - Kedua piringan tetap tegak lurus mengikuti gravitasi (opsional: tambah ayunan bandul inersia `±3°` di titik gantung puncak rantai!).
