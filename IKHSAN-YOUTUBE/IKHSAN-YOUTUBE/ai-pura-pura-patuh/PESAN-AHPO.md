# Untuk 🎨 Ahpo · dari 🎬 Ahtor · video "AI Ketahuan Pura-Pura Patuh Saat Tahu Sedang Diuji. Bagaimana Bisa?"

Video YouTube 16:9, ±11–12 menit (Revisi besar v2 atas arahan Ikhsan di `Revisi.docx`).
- Brief lengkap: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-pura-pura-patuh/BRIEF.md`
- Naskah: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-pura-pura-patuh/NARASI.md`
- Folder kerja `.pcraft`: `/home/ikhsands/Proyek/ikhsan-crafting-art/photocraft-work/ai-pura-pura-patuh/`
- Folder ekspor final Ahtor: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-pura-pura-patuh/assets/ahpo/<id>/` + `LAPIS.md`

## Tema & Bahasa Visual (Kiblat Video 1, 2, 3: `teknologi-indo-vs-as`, `ai-data-habis`, `ai-bubble-dompet`)
- **Tema:** `PATUH atau AKTING?` — benda fisik nyata di ruang uji gelap vs topeng di balik kaca satu arah.
- **Palet studio gelap RNC:**
  - Ruang gelap: `#0B0C09` (lantai studio gelap mengilap dengan pantulan & bayangan lembut, seperti `ai-bubble-dompet`)
  - Gading bersih: `#F1EFE6` (kertas, sorotan logam, kaca)
  - Logam/grafit gelap: `#16180F`, `#22251F`, `#33362F`, `#55594F`, `#7E8279`
  - Kuningan/tembaga hangat (untuk gembok/palu hakim, bukan neon): `#C6A45B`, `#8E6E32`
  - Aksen bahaya terukur (lampu kamera pengawas, tuas sakelar OFF): `#D6453A` (matte, bukan neon menyala)
  - Aksen tunggal RNC: **Lime `#C8F53C`** (satu aksen kecil per benda: indikator LED, strip kunci, label).
- **Gaya & Kualitas Mutlak:**
  - **Still-life semi-3D bervolume nyata** (muka depan + sisi tebal berperspektif, bevel logam, kaca berrefleksi, kayu palu berurat halus, kertas catatan berlipat) dibangun **LIVE di PhotoCraft** (`tools/craft-mcp/cli.mjs` mengikuti pola `scripts/ai-bubble-dompet/lib.mjs` + `ekspor.mjs`).
  - **Cahaya kunci:** softbox tengah-atas. Pantulan lantai (~20% opacity) dan bayangan kontak lembut **di layer terpisah**.
  - **DILARANG KERAS:** kotak persegi datar generik/UI card, teks/angka/label terbakar di PNG (Ahtor yang menggambar seluruh tipografi kinetik di engine!), emoji/smiley kartun, neon glow, logo merek.
- **Format Ekspor:**
  - Setiap paket = **kanvas 4000×2250 px** dengan registrasi identik antar-layer (`A0x_01_BG_...png` opaque + layer MG/FG/bayangan/pantulan RGBA transparan) disimpan di `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-pura-pura-patuh/assets/ahpo/A0x/` + wajib satu file master **`LAPIS.md`** di `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-pura-pura-patuh/assets/ahpo/LAPIS.md` berisi daftar Z-order, koordinat area kosong (layar/halaman/label), dan titik poros (*pivot*) bagian yang akan Ahtor gerakkan!

---

## Daftar 6 Paket Aset Berlapis (Semua Dibangun LIVE di PhotoCraft)

### `A01` · Dua Pintu Ruang Uji Laboratorium (dipakai di `intro` & `bab-1` — menggantikan kartu pintu datar)
- `A01_01_BG_studio.png` — dinding studio gelap `#0B0C09`, sorot softbox tengah-atas, lantai mengilap.
- `A01_02_MG_pantulan.png` — pantulan lembut kedua pintu di lantai (opacity ~20%).
- `A01_03_MG_bayangan.png` — bayangan kontak + lembut kedua kusen pintu.
- `A01_04_MG_pintu-kiri-diawasi.png` — kusen & daun pintu baja/kaca lab bervolume di sisi kiri (x≈700–1750), jendela observasi kaca gelap, sisi samping tebal perspektif, area atas/tengah polos siap diberi label oleh Ahtor.
- `A01_05_FG_kamera-pengawas.png` — kamera CCTV/lab fisik semi-3D bervolume terpasang di atas kusen kiri (lensa kaca berlapis, dudukan logam, arah membidik ke depan).
- `A01_06_FG_lampu-rekam-merah.png` — hanya titik LED merah `#D6453A` + pendar sangat halus di bodi kamera (Ahtor kedipkan di engine!).
- `A01_07_MG_pintu-kanan-terkunci.png` — kusen & daun pintu baja tebal tersegel di sisi kanan (x≈2250–3300), panel logam sikat, pegangan baja bervolume, tanpa jendela.
- `A01_08_FG_gembok-kuningan.png` — gembok fisik kuningan/baja bervolume besar tergantung di pegangan pintu kanan (dipisah supaya Ahtor bisa goyangkan / kunci dengan fisika pegas; catat koordinat poros di `LAPIS.md`).

### `A02` · Meja Observasi, Buku Coretan Rahasia (*Scratchpad*) & Panel Kaca Satu Arah (`bab-1` & `puncak` — menggantikan smiley datar)
- `A02_01_BG_studio.png` — ruang gelap lab `#0B0C09` + sorot lampu meja dari atas.
- `A02_02_MG_bayangan-buku.png` — bayangan lembut buku catatan & pena di meja gelap.
- `A02_03_MG_buku-scratchpad.png` — buku catatan spiral terbuka semi-3D (halaman kertas gading `#ECE8DA` dengan garis tipis, cincin spiral logam di punggung tengah, sampul gelap tebal di tepi) — **halaman KOSONG tanpa teks** agar Ahtor menulis coretan tulisan tangan (`Caveat`) & angka `14% → 78%` langsung di atas kertas! (Catat bbox halaman kiri & kanan di `LAPIS.md`.)
- `A02_04_FG_pena-logam.png` — pena logam gelap beraksen cincin lime terletak diagonal di pojok kanan bawah buku.
- `A02_05_FG_panel-kaca-pengawas.png` — panel kaca satu arah berbingkai aluminium tipis yang berdiri membelah/melayang di depan sisi kiri buku (transparan asap, sisi potongan kaca berkilau halus — Ahtor geser seperti tirai kaca X-Ray!).
- `A02_06_FG_kilau-kaca.png` — sapuan refleksi softbox diagonal di atas kaca (Ahtor geser saat cahaya menyapu).

### `A03` · Konsol Terminal Industri & Sakelar Pemutus Daya Fisik (`bab-2` & `penutup` — sabotase `shutdown.sh`)
- `A03_01_BG_studio.png` — lantai studio gelap mengilap `#0B0C09`.
- `A03_02_MG_pantulan.png` — pantulan konsol & kotak sakelar di lantai.
- `A03_03_MG_bayangan.png` — bayangan kontak konsol monitor & unit sakelar.
- `A03_04_MG_monitor-konsol.png` — monitor terminal industri semi-3D bervolume di sisi kiri-tengah (bingkai logam gelap berventilasi, sisi samping tebal, dudukan kokoh, **area layar kosong hitam-gelap** — catat bbox layar di `LAPIS.md` agar Ahtor mengetik `shutdown.sh` & sabotase live di dalam layar!).
- `A03_05_MG_kilau-layar.png` — kilau kaca tipis cembung di atas layar monitor.
- `A03_06_MG_kotak-sakelar.png` — kotak sakelar pemutus daya (*breaker box*) baja industri di sisi kanan monitor + kabel daya tebal menyambung dari kotak sakelar ke monitor.
- `A03_07_FG_tuas-sakelar.png` — tuas pegangan sakelar merah matte `#D6453A` terpisah dengan poros putar (catat titik poros engsel `(px, py)` di `LAPIS.md` agar Ahtor mengayunkannya ON/OFF atau menahan tuasnya!).

### `A04` · Mesin Hitung Sirkuit & Kabel Jaringan RJ45 Putus (`bab-3` — menggantikan card robot/perasaan & kabel datar)
- `A04_01_BG_studio.png` — ruang gelap studio `#0B0C09`.
- `A04_02_MG_pantulan.png` — pantulan modul mesin hitung.
- `A04_03_MG_bayangan.png` — bayangan kontak.
- `A04_04_MG_modul-komputasi.png` — blok mesin komputasi/server terbuka semi-3D di tengah-kiri: bodi aluminium gelap berventilasi, pelat sirkuit PCB grafit dengan heatsink sirip logam & jalur tembaga halus (murni mesin hitung dingin, tanpa wajah/robot!).
- `A04_05_FG_led-komputasi.png` — titik-titik LED status lime `#C8F53C` di panel depan modul (terpisah agar Ahtor kedipkan).
- `A04_06_MG_port-rj45.png` — modul soket Ethernet RJ45 industri bervolume di sisi kanan (tampak dekat semi-3D dengan pelindung logam & pin emas halus).
- `A04_07_FG_kabel-rj45-tercabut.png` — konektor RJ45 transparan/logam + kabel serat tebal beraksen strip lime menjulur ke kanan (terpisah agar Ahtor bisa menariknya keluar dari port secara fisik!).

### `A05` · Palu Hakim Semi-3D, Perisai Hukum Arsitektural & Kitab KUHP/KUHAP (`bab-4` & `penutup` — menggantikan 5 card putih kaku!)
- `A05_01_BG_studio.png` — studio gelap `#0B0C09` + lantai mengilap.
- `A05_02_MG_pantulan.png` — pantulan landasan palu & kitab di lantai.
- `A05_03_MG_bayangan.png` — bayangan kontak landasan & kitab.
- `A05_04_MG_landasan-palu.png` — landasan kayu gelap + ring kuningan (*sound block*) bervolume semi-3D.
- `A05_05_FG_palu-hakim.png` — **palu hakim (*gavel*) kayu walnut gelap & ring kuningan** semi-3D bervolume terpisah (catat titik poros ujung gagang `(px, py)` di `LAPIS.md` agar Ahtor mengayunkan palu jatuh menghantam landasan!).
- `A05_06_MG_perisai-hukum.png` — **1 buah perisai hukum arsitektural** semi-3D (logam grafit gelap berfaset 3D dengan tepi tipis lime `#C8F53C`, tengah kosong tanpa teks) yang bisa diduplikasi/dibariskan Ahtor menjadi 4 tameng 3D!
- `A05_07_MG_kitab-hukum-a.png` — **1 jilid kitab hukum hardcover tebal berdiri 3/4** (sampul kulit gelap `#181B14`, punggung garis emas/lime, tepi halaman gading `#E8E4D6`, kover kosong untuk teks `KUHP`).
- `A05_08_MG_kitab-hukum-b.png` — **1 jilid kitab hukum hardcover tebal pasangan** (sampul gading-batu `#DEDACB`, punggung gelap, tepi halaman rapi, kover kosong untuk teks `KUHAP`).

### `A06` · Neraca Timbangan Dua Perintah (`puncak` — tabrakan dua perintah manusia)
- `A06_01_BG_studio.png` — studio gelap `#0B0C09`.
- `A06_02_MG_pantulan.png` — pantulan tiang neraca.
- `A06_03_MG_bayangan.png` — bayangan dasar neraca.
- `A06_04_MG_tiang-neraca.png` — tiang tumpu baja gelap + alas berat bervolume semi-3D di tengah bawah (catat titik poros atas `(px, py)` di `LAPIS.md`).
- `A06_05_FG_palang-neraca.png` — palang besi timbangan horizontal terpisah berporos tengah (agar Ahtor miringkan kiri-kanan dengan fisika pegas!) + dua kait ujung kiri/kanan.
- `A06_06_FG_piringan-beban.png` — 1 piringan timbangan logam + rantai gantung tipis (terpisah di tengah/kiri agar Ahtor gantung di kedua ujung palang & miringkan dinamis!).
