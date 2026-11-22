# Usulan Season 3: bahasa visual baru, DNA channel tetap (USULAN, menunggu pilihan Ikhsan)

Ditulis Ahtor, 2026-11-20. Permintaan Ikhsan: penonton bilang mulai jenuh. Dia minta visual baru yang lebih wow (kamera
3D, zoom-in, tipografi lebih kuat, artikel lebih manteb, mungkin maskot ala Kurzgesagt yang muncul di momen tertentu),
tapi ciri khas tetap: ruang gelap, hit transisi film, kolaborasi Ahpo. Ini masih tahap arah. Belum ada kode atau render.

## 1. Diagnosis: kenapa jenuh (diukur cepat + dilihat)
Sampel: 8 frame per film (12–88 % durasi), dari AGI v1, Batam v1, dan AI Pura-pura Patuh v2. Total 24 frame. Lembar
sampelnya ada di scratchpad sesi. Ini hitungan cepat. Belum menjalankan `eye.py dna` penuh.

| Ukuran | AGI (dia merinding) | Batam | AI Pura-pura Patuh |
|---|---|---|---|
| Massa terang (median porsi piksel luma > 0,30) | **17,3 %** | 7,4 % | 7,1 % (1 frame 0,0 %) |
| Luma rata-rata | 39,7 | 25,7 | 11,5 |
| Frame dengan lockup sama (judul League Gothic / italic Fraunces + 1 kata di slab lime + label mono kecil) | 5/8 | 7/8 | 4/8 |

Bacaan (sinyal, bukan vonis):
1. **Yang bikin jenuh bukan kurang efek.** Season 2 sudah menambah 13 jurus. Masalahnya ada di *tata bahasa default*
   yang mengisi sekitar 80 % durasi dan sama di setiap film. Polanya: layar gelap, satu prop kecil di tengah
   (timbangan, perisai, buku, HP), lockup judul+italic+slab, label mono di atas, sumber di kiri bawah, kamera frontal.
   Lockup ini muncul di 16 dari 24 frame.
2. **Gelapnya sudah jadi "kosong", bukan "ruang".** AGI masih punya massa terang 17 % karena foto full-bleed dan
   tangga putih. Dua film sesudahnya turun ke 7 %. Penonton kita kebanyakan nonton di HP, jadi elemen kecil di
   tengah layar gelap hampir tidak terlihat.
3. **Belum ada wajah atau perasaan.** Isinya label, prop, dan bukti. Belum ada "seseorang" yang ikut kaget atau sedih
   bareng penonton.
4. **Kamera masih frontal.** Kedalaman cuma ada di momen bintang (tangga AGI, intro RNC). Stasiun biasa tetap datar.

## 2. Tiga pertanyaan saringan (disimpulkan dari kata-kata Ikhsan dan kiblat)
1. **Siapa yang menonton, di mana:** penonton awam Indonesia, termasuk lansia (§8.4). Long-form 16:9, kebanyakan di HP.
   Sebagian sudah nonton beberapa episode, jadi templatenya sudah mereka hafal.
2. **Satu rasa setelah menonton:** *merinding + penasaran* (rasa AGI / AI Bubble), ditambah *ikut merasakan*.
3. **Kepadatan informasi:** tinggi (angka, artikel, hukum), tapi wajib terbaca (bukti tahan ≥ 2,5 s).

## 3. DNA yang DIKUNCI (tidak berubah di arah mana pun)
Warna `#0B0C09` / gading `#F1EFE6` / lime `#C8F53C` dengan satu aksen per frame. Font League Gothic, Fraunces dan
Space Mono. Intro RNC Satu Baris. Hit transisi film `tx/` (S8, wajib). Portal orisinal per film. Stabilo blok bersih.
Foto dokumenter full-bleed. VO ramah awam. Jurus Season 2 tetap jadi senjata khusus.
Yang berubah cuma **tata bahasa default**: cara foto, kata dan artikel tampil di 80 % durasi.
Satu catatan: gelap tetap gelap, tapi diperlakukan sebagai **ruang** (cahaya jatuh, kabut, kedalaman), bukan latar kosong.

## 4. Tiga arah (Aman · Berani · Eksperimental)

### A · Aman: "SELAM DETAIL" (kamera nggak pernah reset)
- **Ide:** setiap jawaban sembunyi di dalam detail adegan sebelumnya. Ini evolusi zoom RNC: Satu Baris zoom ke
  belakang, Selam Detail zoom ke depan.
- **Kamera:** satu tarikan panjang per bab dengan pola *rush-hang-rush*. Kamera ngebut di antara stasiun, lalu berhenti
  ≥ 2,5 s di setiap stasiun supaya terbaca. Hit film mendarat tepat saat kamera menembus ambang. Contoh: foto warga
  pegang HP → layar HP → artikel Kompas "Rp0,49" → stabilo menyapu → kamera masuk ke lubang angka "0" → lorong server
  PDNS.
- **Lapisan:** FG = kata-kata di titik cek kedalaman yang melesat lewat lensa (blur kecepatan). MG = stasiun. BG =
  stasiun berikutnya yang sudah terlihat di dalam "jendela" detail.
- **Codrops/menu:** `speed-ramp-integrated`, `ghost-trail-rush-hang`, `curved-smear-taper` (kandidat),
  ditambah `world-fold-bend` (sudah terbukti).
- **Ahpo:** pelat bersarang (4000 px). Wilayah jendela di pelat N disejajarkan dengan pelat N+1. Artikel ditempel ke
  layar HP/laptop/TV di foto dokumenter dengan perspektif, pantulan dan cahaya layar.
- **Risiko:** jadi gimik kalau tiap stasiun menyelam. Batasnya 1 rantai selam per bab. Zoom makro butuh aset beresolusi
  tinggi.
- **Biaya render:** sama seperti sekarang (Canvas 2D).

### B · Berani: "FOTO JADI RUANG" (penonton berdiri di dalam fotonya)
- **Ide:** foto dokumenter berubah jadi ruang 3D sungguhan. Rasanya seperti efek Spatial Scene di iPhone, tapi
  digrade dokumenter.
- **Kamera:** dolly dengan paralaks asli, orbit 8–12°, crane, dan rack focus dari FG ke BG. Setelah itu snap ke
  ruang berikutnya.
- **Lapisan:** FG = benda depan hasil potongan Ahpo (blur/bokeh). MG = subjek (tajam). BG = latar dengan kabut tipis,
  ditambah debu dan sinar volumetrik dari sumber cahaya fotonya sendiri (fisika cahaya).
- **Tipografi:** kata raksasa berdiri di dalam ruang, di antara MG dan BG. Kata itu tertutup bahu subjek dan menjatuhkan
  bayangan ke latar.
- **Artikel:** lempeng kaca/HP melayang di ruang itu dan memantulkan cahaya ruangan. Stabilo tampil sebagai cahaya.
- **Codrops/menu:** `thin-lens-accum-dof`, `defocus-dust-energy`, `horizon-matched-fog`,
  `glass-slab-spectral-rim`, `racing-line-rail`, `agx-desat-tpdf-finish` (semua kandidat, belum pernah dipakai).
  `softbox-card-studio` sudah terbukti.
- **Ahpo:** setiap foto kunci dipotong jadi 3–4 lapis. Latar di belakang subjek diisi ulang, lalu digrade dokumenter.
- **Peta kedalaman:** cukup potongan manual Ahpo untuk tes. Untuk produksi 13 menit, usul memasang **Depth Anything
  V2 Small** secara lokal (Apache-2.0; varian Base/Large NC jadi tidak boleh). Paketnya onnxruntime + model ~100 MB.
  **Perlu izin dulu.**
- **Risiko:** kulit "melar" di tepi kedalaman, jadi amplitudo kamera dibatasi dan latar diisi Ahpo. Biaya render di
  laptop Vega **belum diukur**. Usulan teknisnya: akumulasi sub-frame motion blur di dalam GL, lalu satu readback per
  frame. Tes 3 detik yang membuktikan apakah ini jalan.

### C · Eksperimental: "SI PIKSEL" (ada teman yang ikut kaget)
- **Ide:** maskot orisinal yang lahir dari aksen lime channel. Bentuknya kubus lime kecil, bahan vinyl matte, bevel
  lembut, dua mata tinta `#11120E`, tanpa mulut. Dia adalah *kita sebagai data*: wakil penonton di dunia digital.
- **Aturan muncul:** 5–7 kali per film, ≤ 4 s per kemunculan, hanya di momen emosi. Contohnya kaget di angka `Rp0,49`,
  sedih di kursi kosong, lega di solusi, dan menunjuk di CTA. Dia tidak bicara; VO tetap manusia. Aktingnya lewat mata
  dan kelopak, squash & stretch, antisipasi, dan diam.
- **Hidup di dunia dokumenter:** kena cahaya scene, punya bayangan kontak, ikut DOF. Bukan stiker kartun.
- **Kontras skala:** Piksel kecil di depan data center atau KTP raksasa. Pelajaran dari Kurzgesagt, tanpa mengambil gaya
  flat pastel atau burungnya.
- **Aturan aksen:** saat Piksel di layar, dia satu-satunya lime. Saat dia tidak ada, lime adalah jejaknya (stabilo,
  slab).
- **Thumbnail:** ekspresi Piksel jadi pengenal channel (Ahpo).
- **Alternatif untuk distyleframe:** **Sorot** (ujung stabilo bermata, hidup di artikel) dan **Kursor** (panah mouse
  tanpa wajah yang berakting seperti lampu Pixar).
- **Risiko:** ini keputusan identitas jangka panjang (sekali masuk, ikut di setiap video). Bisa jadi kekanakan kalau
  terlalu sering atau terlalu imut, jadi aturan muncul harus ketat.

## 5. Upgrade bersama (berlaku di arah mana pun)
- **Tipografi, 3 register baru:**
  1. Kata raksasa di dalam ruang (B).
  2. Kata yang dilewati kamera (A).
  3. Huruf yang menempel di permukaan foto (dinding, layar), dengan perspektif dan oklusi.

  Lockup judul+italic+slab dipakai hanya sebagai tanda baca, targetnya ≤ 30 % stasiun. Kedatangan per huruf mengikuti
  ketukan VO.
- **Artikel, "Bukti di Tangan":**
  1. Artikel muncul di tempat aslinya: HP di tangan, laptop, TV warung di foto dokumenter.
  2. Kamera menyelam ke layar.
  3. Halaman dibaca makro dengan rack focus per kata.
  4. Stabilo menyapu.
  5. Judul terangkat 3D dengan bayangan.

  Artikel di-capture ulang di 3× DPR supaya zoom makro tetap tajam. Saat bukti menumpuk, artikel jatuh bertumpuk
  memakai fisika `season2.gravityBake`. Tab "Sumber:" tetap ada.

## 6. Rekomendasi Ahtor
**B jadi tulang punggung, A jadi jurus zoom per bab, C dites dulu sebagai styleframe.**
Motif lock-nya 3: Foto Jadi Ruang, Selam Detail, dan Piksel (kalau disetujui).

Alasannya:
1. Film yang bikin merinding (AGI) itu film paling imersif: foto penuh dan kamera naik. B meneruskan arah itu ke 3D
   sungguhan dan mengubah ±50–60 % durasi (semua stasiun foto). A cuma mengubah sambungan antar stasiun.
2. A adalah "teknik zoom-in" yang Ikhsan minta, sekaligus kelanjutan alami dari intro RNC.
3. Maskot adalah keputusan identitas. Ikhsan harus lihat dulu sebelum memutuskan.

## 7. Target terukur (usulan, di atas target §6)
- Massa terang median ≥ 15 % per bab (ukuran cepat dari §1; levelnya AGI).
- Lockup judul+italic+slab ≤ 30 % stasiun.
- Setiap stasiun foto punya paralaks asli (≥ 2 lapis kedalaman). Ken Burns datar tidak boleh.
- 1 rantai Selam Detail per bab.
- Maskot ≤ 7 kemunculan per film (kalau disetujui).
- Target §6 tetap berlaku: burst ≥ 20 %, tanda baca ≤ 8 s, ΔE ≥ 18, kontras ≥ 40.

## 8. Rencana tes (Lab Season 3, `aset/demo-style-season3/`)
Tiga tes 3 detik, dibangun di Super Motion dan ditinjau live di Motion Studio. Tidak ada render sebelum Ikhsan bilang
OK. Bahannya aset film dark-web yang sudah ada di disk (foto, artikel, pelat Ahpo `D01`–`D07`, VO dan SFX yang sudah
jadi), jadi **tidak memakai kredit ElevenLabs**.

| Tes | Isi 3 detik |
|---|---|
| Tes A | Foto warga + HP → layar → artikel → kata ber-stabilo → masuk lubang "0" → foto berikutnya, dengan hit film di ambang. |
| Tes B | Satu foto dokumenter jadi ruang (dolly + orbit + rack focus). Kata raksasa di belakang subjek, ada bayangannya. Lempeng artikel kaca. Hasil ukur ms/frame di laptop. |
| Tes C | 3 styleframe desain maskot (Piksel / Sorot / Kursor) di adegan dokumenter, plus 2 detik reaksi Piksel ke "Rp0,49". |

Setelah Ikhsan memberi putusan:
- Jalankan `ledger.py verdict` dengan kata-kata Ikhsan.
- Tulis standar §11 di `standar-kasta-tinggi.md`.
- Masukkan kit ke `_template-longform` / `_pustaka`.

## 9. Status
Menunggu Ikhsan memilih:
1. Arah (atau ketiganya dites).
2. Maskot: ya/tidak, dan desain mana yang dibuat styleframe-nya.
3. Topik video berikutnya; kalau belum ada, tes pakai aset dark-web.
4. Izin memasang Depth Anything V2 Small, hanya kalau B dipilih.
