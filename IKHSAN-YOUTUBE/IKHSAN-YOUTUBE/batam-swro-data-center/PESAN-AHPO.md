# Untuk 🎨 Ahpo · dari 🎬 Ahtor · video "Batam Bangun Pabrik Air Laut Rp600 Miliar untuk Data Center. Kenapa?"

Video YouTube panjang 16:9 (±10 menit, Indonesia). Riset dan naskah oleh Ahri, sudah ada di proyek:
- Brief lengkap: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/batam-swro-data-center/BRIEF.md`
- Naskah + cue per beat: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/batam-swro-data-center/NARASI.md`
- Bank fakta ✅: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/batam-swro-data-center/riset/fakta.json`
- Kredit konten: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/batam-swro-data-center/KREDIT-KONTEN.md`
- Kartu Gaya Ahtor (G0): `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/batam-swro-data-center/KARTU-GAYA.md`

## Pembagian kerja Ahpo (PhotoCraft) × Ahtor (Super Motion)
Supaya pengerjaan tidak kena timeout dan hasilnya maksimal:
- **Ahpo (PhotoCraft)** mengerjakan **aset objek/ilustrasi berlapis & thumbnail** dengan kualitas seni studio (cut-out, shading, volume, tekstur dokumenter, pencahayaan atas-tengah, layer terpisah untuk bagian yang digerakkan Ahtor).
- **Ahtor (Super Motion)** mengerjakan **animasi aliran air, gelembung uap, partikel garam 35.000 → 70.000 ppm, kamera 3D, riak air WebGL, dan tipografi kinetik** di atas layer Ahpo.
- Jadi di diagram yang butuh animasi, Ahpo **TIDAK** perlu membakar teks angka/panah animasi ke dalam PNG — cukup pisahkan layer benda/wadah/ikonnya, dan sertakan `LAPIS.md` (urutan Z + posisi).

## Bahasa visual & palet (wajib serasi dengan Super Motion)
- Ruang gelap `#0B0C09` · biru-laut dalam `#0A161E` · gading `#F1EFE6` · **satu aksen lime `#C8F53C`** (teks gelap di atas lime).
- Objek bervolume (ilustrasi semi-3D bersih / editorial modern), cahaya kunci dari tengah-atas, bayangan lembut di layer terpisah.
- **DILARANG:** gaya kertas/sobekan, look film jadul/sepia, efek neon menyala-nyala, emoji sistem, wajah tokoh asli yang bisa dikenali, logo merek asli (BP Batam, Citramas, merek air mineral/galon, dll.), atau teks angka/panah yang tertanam permanen di dalam objek yang akan digerakkan.

## Format kiriman
- Tiap komponen/layer: **PNG transparan**, sisi panjang **≥ 1400 px** (BG overscan ≥ 2400×1350 untuk 16:9).
- Penamaan file: `<id>_<urut>_<BG|MG|FG|BAYANGAN>.png` + `LAPIS.md` di tiap folder aset.
- Folder simpan final untuk Ahtor: `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/batam-swro-data-center/assets/ahpo/<id>/`
- File kerja `.pcraft` tetap di `/home/ikhsands/Proyek/ikhsan-crafting-art/photocraft-work/batam-swro-data-center/` dan akhiri dengan `design_review`.

## Daftar Prioritas 1 (P1 — untuk Hook & Tes Awal)
1. **`E01-awan-kabel-laut`** (Hook literal + Puncak *callback*):
   - `E01_1_awan.png`: ikon awan putih-gading bervolume bersih (`#F1EFE6`, bukan kartun murahan).
   - `E01_2_kabel.png`: segmen kabel jaringan/daya bervolume (tutup/konektor mengarah ke bawah).
   - `E01_3_rak.png`: siluet/miniatur rak server semi-3D sudut 3/4, LED netral (titik lampu `#C8F53C` dipisah di `E01_4_led.png` bila perlu).
   - `E01_5_ombak.png`: potongan lapisan ombak laut bervolume biru-gelap (`#0E2635`–`#1B4358`) dengan puncak buih tipis, siap diparalaks Ahtor.
2. **`E02-peta-batam`** (Bab 1 — Peta Pulau Batam):
   - `E02_1_laut_bg.png`: tekstur latar laut/selat gelap bersih 2400×1350 (tanpa teks).
   - `E02_2_pulau_batam.png`: siluet/relief Pulau Batam & pulau sekitar yang akurat (tanpa label teks terbakar; Ahtor akan menaruh pin 6 waduk: Duriangkang, Sei Ladi, Mukakuning, Piayu, Sei Harapan, Nongsa + KEK Nongsa + Kabil + animasi pipa 12 km secara presisi dengan koordinat peta).
   - `E02_3_ikon_waduk.png` & `E02_4_ikon_server.png`: ikon penanda bervolume (pin waduk & pin gedung server) ukuran bersih untuk di-stamp di atas peta.

## Daftar Prioritas 2 (P2 — Bab 2, Bab 3, Bab 4)
3. **`E03-menara-pendingin`** (Bab 2 — *Evaporative Cooling* vs *Dry Cooling*):
   - `E03_1_rak_chip.png`: modul rak/chip server panas (layer terpisah untuk warna panas).
   - `E03_2_penukar_panas.png`: unit pipa penukar panas tertutup.
   - `E03_3_menara.png`: potongan penampang (*cutaway*) menara pendingin industri semi-3D bersih (lubang atas terbuka agar Ahtor bisa memancarkan animasi uap 70–90% menguap).
   - `E03_4_dry_cooler.png`: unit pendingin kering/kipas industri terpisah sebagai pembanding `+25–35% listrik`.
4. **`E04-galon-skala`** (Bab 3 — Skala 300 LPS ≈ 1,36 juta galon 19L/hari):
   - `E04_1_galon.png`: 1 buah galon air bening 19 liter semi-3D tanpa merek, bagian air biru-jernih terlihat bervolume, sisi tinggi ≥ 1400 px (Ahtor akan menggandakan & menganimasikan deretan skalanya di engine).
   - `E04_2_bayangan.png`: bayangan kontak bawah galon terpisah.
5. **`E05-membran-swro`** (Bab 3 & 4 — *Reverse Osmosis*):
   - `E05_1_pompa.png`: pompa tekanan tinggi industri semi-3D (sisi kiri).
   - `E05_2_tabung_membran.png`: penampang selongsong *pressure vessel* SWRO + sekat membran semipermeabel di tengah (bagian tengah dibiarkan transparan/terbuka supaya partikel 35.000 ppm → air tawar + 70.000 ppm *brine* dari Ahtor terlihat lewat di dalamnya).

## Daftar Prioritas 3 (Menyusul setelah cut final)
6. **`E06-thumbnail`** (1280×720):
   - Komposisi split kontras 16:9: kiri rak server panas mengepulkan uap, kanan ombak laut masuk ke pipa industri desalinasi raksasa.
   - Teks besar (3 kata, terbaca ukuran kecil): **`BUTUH AIR LAUT?`** (aksen `#C8F53C` di satu kata atau bingkai kontras tinggi).
   - *Faceless*: tanpa wajah tokoh, tanpa logo merek.
