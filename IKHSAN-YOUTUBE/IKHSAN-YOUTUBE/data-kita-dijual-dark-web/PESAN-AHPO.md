# Untuk 🎨 Ahpo · dari 🎬 Ahtor · video "Data KTP Kita Dijual Rp0,49/Orang di Dark Web. Kok Belum Ada Denda?"

Video YouTube panjang 16:9, ±10–11 menit (Studio Teknologi Indonesia, slug `data-kita-dijual-dark-web`).
- Brief lengkap: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/data-kita-dijual-dark-web/BRIEF.md`
- Naskah + cue per beat: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/data-kita-dijual-dark-web/NARASI.md`
- Kartu Gaya Ahtor (G0): `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/data-kita-dijual-dark-web/KARTU-GAYA.md`
- Folder kerja `.pcraft`: `/home/ikhsands/Proyek/ikhsan-crafting-art/photocraft-work/data-kita-dijual-dark-web/`
- Folder ekspor final untuk Ahtor: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/data-kita-dijual-dark-web/assets/ahpo/<id>/` + `LAPIS.md`

---

## Tema & Bahasa Visual (DNA RNC Gelap + Standar `ai-pura-pura-patuh` v2 & Season 2)

- **Tema:** `DIJAGA atau DIOBRAL?` — benda fisik nyata di ruang gelap investigatif (kartu identitas, struk pasar gelap, brankas baja `98% vs 2%`, kursi wasit Lembaga PDP kosong).
- **Palet studio gelap RNC (wajib serasi dengan Super Motion):**
  - Ruang & lantai studio gelap mengilap: `#0B0C09` (pantulan & bayangan lembut terpisah)
  - Gading bersih (kertas struk, halaman kitab, sorotan): `#F1EFE6` / `#E7E4D8`
  - Baja/grafit gelap (brankas, mesin kasir, rangka kursi): `#16180F`, `#22251F`, `#33362F`, `#55594F`, `#7E8279`
  - Biru identitas editorial (kartu KTP bergaya, matte tidak norak): `#2D6E9E`, `#1D4B6E`
  - Kuningan/tembaga hangat (kunci master, engsel): `#C6A45B`, `#8E6E32`
  - Merah bahaya terukur (segel ransomware `98%`, peringatan): `#D6453A` (matte, bukan neon menyala)
  - Aksen tunggal RNC: **Lime `#C8F53C`** (satu aksen kecil per objek: strip tag harga, irisan 2% backup, lampu indikator).
- **Gaya & Kualitas Mutlak:**
  - **Still-life semi-3D bervolume nyata** (muka depan + sisi tebal perspektif, bevel baja, kaca transparan berefleksi, tekstur kertas termal halus, kulit kursi gelap) dibangun **LIVE di PhotoCraft** (`tools/craft-mcp/cli.mjs` + akhiri dengan `design_review`).
  - **Cahaya kunci:** softbox tengah-atas. Pantulan lantai (~20% opacity) dan bayangan kontak lembut **di layer terpisah**.
  - **DILARANG KERAS:** kotak persegi datar generik/AI-card, teks/angka/label terbakar di PNG untuk paket `D01`–`D06` (Ahtor yang menganimasikan seluruh angka `Rp0,49`, `2%`, `282`, dll. di engine!), emoji/kartun, neon glow, wajah tokoh/warga asli yang bisa dikenali, atau logo merek/instansi resmi (tanpa logo Garuda/BPJS/Tokopedia/Komdigi asli di prop ilustrasi).
- **Format Ekspor:**
  - Paket `D01`–`D06`: **kanvas 4000×2250 px** dengan registrasi piksel identik antar-layer (`D0x_01_BG_...png` opaque + layer MG/FG/bayangan/pantulan RGBA transparan) disimpan di `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/data-kita-dijual-dark-web/assets/ahpo/D0x/`
  - Wajib 1 file master **`LAPIS.md`** di `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/data-kita-dijual-dark-web/assets/ahpo/LAPIS.md` berisi daftar Z-order, koordinat area kosong (*bbox* layar/pita struk/tangki/tag harga/sampul buku), dan titik poros (*pivot* `(px, py)`) bagian yang digerakkan Ahtor!

---

## Daftar 6 Paket Aset Berlapis (`D01`–`D06`) + Thumbnail (`D07`)

### `D01` · Kartu Identitas Biru Semi-3D, Label Harga Obral & Karcis Parkir (`intro`, `bab-1`, `puncak`, `penutup`) — *Prioritas 1 (untuk Hook & Tes 3 dtk)*
- `D01_01_BG_studio.png` — dinding & lantai studio gelap `#0B0C09`, sorot softbox tengah-atas.
- `D01_02_MG_pantulan.png` — pantulan lembut kartu di lantai (~20%).
- `D01_03_MG_bayangan.png` — bayangan kontak lembut kartu & karcis.
- `D01_04_MG_kartu-identitas.png` — kartu identitas warga biru matte bergaya editorial semi-3D bervolume (sudut membulat, tepi tebal plastik mengilap, chip emas kecil, area kotak foto berisi siluet netral tanpa wajah asli, garis-garis bidang kosong **tanpa teks/NIK asli** — catat bbox bidang data di `LAPIS.md`).
- `D01_05_FG_label-harga-tali.png` — **label harga diskon gantung** (*hanging price tag*) semi-3D dengan lubang kuningan & tali tipis terikat di sudut kanan atas kartu; badan label berwarna lime/kuning-gading matte **kosong tanpa angka** (Ahtor tulis `"Rp0,49"` & ayunkan dengan fisika pendulum — **catat koordinat titik poros lubang tali `(px, py)` dan bbox area angka di `LAPIS.md`**).
- `D01_06_FG_karcis-parkir.png` — sobekan karcis parkir kertas bergaya editorial (tanpa logo/teks terbakar, permukaan polos siap ditulis `"PARKIR Rp2.000"` oleh Ahtor) terpisah di sisi kiri bawah.

### `D02` · Mesin Kasir Pasar Gelap & Pita Struk Memanjang (`bab-1` — *Concept Explainer 1: Struk Harga Obral*) — *Prioritas 1*
- `D02_01_BG_studio.png` — ruang gelap studio `#0B0C09` + meja kerja grafit gelap.
- `D02_02_MG_bayangan.png` — bayangan kontak mesin kasir & scanner.
- `D02_03_MG_mesin-struk.png` — mesin pencetak struk termal (*thermal receipt printer*) baja/grafit gelap semi-3D bervolume di bagian tengah-bawah, dengan celah keluar kertas gelap di sisi atasnya dan satu lampu LED status kecil `#C8F53C`.
- `D02_04_FG_pita-struk-kosong.png` — **pita kertas struk termal panjang** (gading `#F1EFE6` bergerigi halus di ujung atas, sedikit melengkung bervolume) menjulur naik keluar dari celah mesin — **100% polos tanpa teks** agar Ahtor mencetak daftar harga (`Parkir Motor Rp2.000` vs `BPJS Rp0,49`, `SIM Rp0,57`, `Tokopedia Rp0,82`, `Paspor Rp4,30`, `KPU Rp5,86`, `NPWP Rp25`, `ASN BKN Rp33,6`) baris demi baris secara kinetik! (**Catat bbox pita struk & koordinat bibir celah printer di `LAPIS.md`.**)
- `D02_05_FG_scanner-barcode.png` — pemindai *barcode* genggam gelap semi-3D terpisah di sisi kanan (mengarah ke pita struk).
- `D02_06_FG_sinar-scanner.png` — hanya berkas garis cahaya merah-tipis / lime lembut dari ujung scanner (terpisah agar Ahtor kedipkan saat tiap harga dipindai!).

### `D03` · Tiga Pintu Jebolnya Brankas: Kaca Plaintext, Kunci Admin & Folder Unduhan (`bab-3` — *Concept Explainer 2*) — *Prioritas 2*
- `D03_01_BG_studio.png` — ruang gelap lab `#0B0C09`.
- `D03_02_MG_bayangan.png` — bayangan kontak ketiga objek.
- `D03_03_MG_brankas-kaca.png` — brankas kubus berdinding **kaca bening transparan** berbingkai baja gelap di sisi kiri, ada gagang gembok kecil di pintu kaca, tapi bagian dalam 100% tembus pandang & kosong (**catat bbox bagian dalam kaca di `LAPIS.md`** agar Ahtor tampilkan nama & nomor HP *plaintext* terbuka di baliknya).
- `D03_04_FG_kunci-admin.png` — **kunci master kuningan/baja** semi-3D besar di tengah (**catat titik poros lubang kunci `(px, py)`**).
- `D03_05_FG_kail-phishing.png` — **kail pancing logam** (*phishing hook*) + tali tipis turun dari atas mengait cincin kunci master (terpisah agar Ahtor tarik naik ke atas!).
- `D03_06_MG_folder-unduhan.png` — **folder arsip industrial semi-3D** di sisi kanan, terbuka sebagian.
- `D03_07_FG_berkas-terinfeksi.png` — selembar berkas/ikon file gelap beraksen merah matte `#D6453A` menyembul dari dalam folder (terpisah agar Ahtor klik dengan kursor & memicu *infostealer* `35%`).

### `D04` · Penampang Tangki Brankas PDNS 2 Surabaya (`98%` vs `2%`) & Gembok Ransomware (`bab-3`, `bab-4`, `penutup` — *Concept Explainer 3*) — *Prioritas 1*
- `D04_01_BG_studio.png` — ruang gelap server `#0B0C09` + lantai mengilap.
- `D04_02_MG_pantulan.png` — pantulan tangki brankas di lantai.
- `D04_03_MG_bayangan.png` — bayangan kontak tangki & gembok.
- `D04_04_MG_tangki-brankas.png` — **modul tangki/brankas server baja silindris/kotak raksasa berpenampang depan kaca ukur** semi-3D di tengah-kiri, dengan skala garis ukur samping (tanpa angka) dan **jendela isi transparan kosong** (**catat bbox jendela isi di `LAPIS.md`** agar Ahtor animasikan `98%` terkunci merah `#D6453A` vs seiris tipis `2%` lime `#C8F53C` mengalir lewat pipa kecil ke kanan menuju Batam!).
- `D04_05_MG_pipa-batam.png` — pipa data kecil tipis menjulur dari dasar `2%` tangki ke modul *cold storage* kecil di pojok kanan bawah.
- `D04_06_FG_badan-gembok.png` — **badan gembok baja raksasa** semi-3D bervolume di depan area `98%` tangki (polos tanpa teks, catat lubang kunci).
- `D04_07_FG_belenggu-gembok.png` — **belenggu (shackle) baja U-shape gembok** terpisah di atas badan gembok (**catat titik poros engsel sisi kanan `(px, py)`** agar Ahtor bisa membukanya saat *Brain Cipher* memberi kunci gratis 3 Juli 2024!).
- `D04_08_FG_kunci-dekripsi.png` — kunci pembuka baja berkilau beraksen cincin lime `#C8F53C` terpisah (Ahtor gerakkan masuk ke lubang gembok!).

### `D05` · Kursi Kosong "Lembaga PDP" & Kitab UU PDP (`bab-4`, `penutup` — *Concept Explainer 4*) — *Prioritas 2*
- `D05_01_BG_studio.png` — ruang sidang gelap `#0B0C09` + lantai mengilap.
- `D05_02_MG_pantulan.png` — pantulan kursi & kitab di lantai.
- `D05_03_MG_bayangan.png` — bayangan kontak kursi & kitab.
- `D05_04_MG_kursi-kosong.png` — **kursi pimpinan/wasit kulit gelap berbingkai logam** semi-3D berdiri **kosong** di tengah-kanan (menghadap 3/4 ke depan, rasa sunyi & kosong yang kuat).
- `D05_05_FG_sorot-lampu.png` — berkas sorot lampu kerucut lembut (*volumetric top spotlight*) dari atas tepat menyorot kursi kosong (terpisah dengan alpha halus agar Ahtor nyalakan/kedipkan).
- `D05_06_MG_kitab-uu-pdp.png` — **1 jilid kitab undang-undang hardcover tebal** berdiri 3/4 di sisi kiri-depan (sampul kulit gelap `#181B14`, tepi halaman gading `#E8E4D6`, strip punggung lime tipis, **kover polos tanpa teks** agar Ahtor tuliskan `"UU NO. 27 / 2022"` & `"PP 33/2026"` — catat bbox kover di `LAPIS.md`).

### `D06` · Ponsel & Perisai Kunci Ganda Keluarga (`puncak` — 3 Langkah Pertahanan Rumah) — *Prioritas 2*
- `D06_01_BG_studio.png` — ruang gelap hangat `#121410`.
- `D06_02_MG_bayangan.png` — bayangan kontak ponsel & perisai.
- `D06_03_MG_ponsel-gelap.png` — ponsel pintar modern semi-3D berdiri 3/4 (bodi aluminium gelap, **layar hitam kosong** — catat bbox layar di `LAPIS.md` agar Ahtor tampilkan 3 checklist pengamanan keluarga).
- `D06_04_FG_perisai-2fa.png` — perisai logam grafit berfaset semi-3D dengan tepi tipis `#C8F53C` dan ikon gembok kecil bervolume (tanpa teks terbakar).

### `D07` · Thumbnail YouTube 1280×720 — *Prioritas 3 (bisa paralel)*
- Simpan di `/home/ikhsands/Proyek/ikhsan-crafting-art/photocraft-work/data-kita-dijual-dark-web/export/thumbnail-data-dark-web-v01.jpg` (dan salin preview ke `assets/ahpo/D07/`).
- Komposisi split kontras tinggi bergaya investigasi *faceless* (tanpa wajah tokoh asli, tanpa logo merek):
  - **Kiri:** kartu identitas warga biru semi-3D dengan *barcode* yang ditempeli label harga diskon menyala kuning-merah / lime bertuliskan **`Rp 0,49`**.
  - **Kanan:** brankas server gelap retak/tergembok merah dengan indikator tegas **`BACKUP 2%`**.
  - **Teks besar hero (3 kata, terbaca jelas di layar HP):** **`DIJUAL 49 PERAK?`** (buat 1 varian alternatif **`DATA KITA Rp0,49?`** jika sempat).
