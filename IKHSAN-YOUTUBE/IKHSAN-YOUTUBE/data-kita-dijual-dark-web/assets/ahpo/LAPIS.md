# LAPIS.md · data-kita-dijual-dark-web (6 Paket Semi-3D PhotoCraft Live, 4000×2250 px)

Semua file PNG diekspor dengan registrasi kanvas identik `4000×2250 px` (skala `0.48×` terhadap `1920×1080`). Seluruh permukaan teks/angka dibiarkan kosong polos untuk tipografi kinetik Super Motion.

## `D01` · Kartu Identitas Biru, Label Harga Tali & Karcis Parkir (`intro`, `bab-1`, `puncak`, `penutup`)
- Z-order: `D01_01_BG_studio.png` → `D01_02_MG_pantulan.png` → `D01_03_MG_bayangan.png` → `D01_04_MG_kartu-identitas.png` → `D01_05_FG_label-harga-tali.png` → `D01_06_FG_karcis-parkir.png`
- Bidang kartu: `x=1040..2800, y=560..1640` (pita atas `y=588..742`)
- **Pivot ayun label harga (lubang tali kartu):** `(2724, 650)`
- **Area angka label harga:** pusat `(3040, 1020)`, miring `+11.5°` (siap tulisan `Rp0,49`)
- **Area teks karcis parkir:** `x=600..1120, y=1440..1720` (siap tulisan `PARKIR MOTOR Rp2.000`)

## `D02` · Mesin Kasir Pasar Gelap, Pita Struk Kosong & Scanner (`bab-1`)
- Z-order: `D02_01_BG_studio.png` → `D02_02_MG_bayangan.png` → `D02_03_MG_mesin-struk.png` → `D02_04_FG_pita-struk-kosong.png` → `D02_05_FG_scanner-barcode.png` → `D02_06_FG_sinar-scanner.png`
- **Area pita struk kosong:** `x=1450..2310, y=210..1210` (`860×1000 px`), bibir celah printer `y=1240`

## `D03` · Tiga Pintu Jebol: Brankas Kaca, Kunci Admin + Kail & Folder Unduhan (`bab-3`)
- Z-order: `D03_01_BG_studio.png` → `D03_02_MG_bayangan.png` → `D03_03_MG_brankas-kaca.png` → `D03_06_MG_folder-unduhan.png` → `D03_07_FG_berkas-terinfeksi.png` → `D03_04_FG_kunci-admin.png` → `D03_05_FG_kail-phishing.png`
- **Rongga kaca brankas (plaintext):** `x=500..1300, y=820..1700`
- **Pivot cincin kunci admin:** `(2000, 960)`
- **Berkas menyembul di folder:** `x=2810..3350, y=700..1240`

## `D04` · Tangki Brankas PDNS 2 Surabaya (`98%` vs `2%` Batam) & Gembok (`bab-3`, `bab-4`, `penutup`)
- Z-order: `D04_01_BG_studio.png` → `D04_02_MG_pantulan.png` → `D04_03_MG_bayangan.png` → `D04_04_MG_tangki-brankas.png` → `D04_05_MG_pipa-batam.png` → `D04_07_FG_belenggu-gembok.png` → `D04_06_FG_badan-gembok.png` → `D04_08_FG_kunci-dekripsi.png`
- **Jendela isi tangki:** `x=760..2160, y=420..1760` (`1400×1340 px`) — bawah 2% (`27 px`) = Batam `#C8F53C`, atas 98% (`1313 px`) = terkunci `#D6453A`
- **Pivot engsel belenggu gembok kanan:** `(1618, 930)` (putar searah jarum jam `+42°` saat terbuka gratis!)
- **Lubang kunci badan gembok:** `(1460, 1210)` · **Ujung kunci dekripsi:** `(2530, 720)`

## `D05` · Kursi Kosong Lembaga PDP, Sorot Lampu & Kitab UU PDP (`bab-4`, `penutup`)
- Z-order: `D05_01_BG_studio.png` → `D05_02_MG_pantulan.png` → `D05_03_MG_bayangan.png` → `D05_06_MG_kitab-uu-pdp.png` → `D05_04_MG_kursi-kosong.png` → `D05_05_FG_sorot-lampu.png`
- **Area sampul Kitab UU PDP:** `x=760..1310, y=970..1620` (siap tulisan `UU NO. 27 / 2022` & `PP 33/2026`)
- **Pusat kursi kosong:** `(2560, 1080)`

## `D06` · Ponsel Gelap & Perisai Kunci Ganda 2FA (`puncak`)
- Z-order: `D06_01_BG_studio.png` → `D06_02_MG_bayangan.png` → `D06_03_MG_ponsel-gelap.png` → `D06_04_FG_perisai-2fa.png`
- **Layar ponsel kosong:** `x=928..1692, y=402..1718` (`764×1316 px`)
