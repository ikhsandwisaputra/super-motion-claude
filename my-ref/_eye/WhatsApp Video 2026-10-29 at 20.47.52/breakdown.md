# Breakdown 20.47.52: making-of "langit pastel, kursor 3D menyelam ke layar" (untuk belajar, bukan ditiru)
Sumber: dna.md, dna_sheet.jpg, look_overview, look_0.00_open / 3.10 / 3.40_char / 9.00_laptop / 11.98_screen_dive / 12.90_tunnel_exit, poster/ (1.6, 6.6, 12.4; semua dengan --crop 22,131,554,798). 15.8 s · 576×1024 potret · 29.35 fps.
- Ini rekaman layar proses (making-of): preview komposisi After Effects 4:5 (532×667 px, crop di atas) dengan strip waveform audio di atasnya dan timeline layer di bawahnya. Kotak seleksi layer putih ikut terlihat di sekitar ikon.
- Caption "pov …" ber-highlight navy ditempel di atas preview. 13.8–15.8 s = end card TikTok navy (chrome platform, di luar bacaan).
- dna.json diukur pada layar penuh. Angka ruang/warna/sesak (ruang kosong 17%, sesak 35%, 4 warna/frame) ikut menghitung UI timeline gelap, jadi untuk rasa kanvas pakai poster ber-crop.
## Gaya & dunia
- Keluarga: ilustrasi 3D-ish / character explainer dengan ikon glossy (gaya "3D icon pack"), dibungkus sebagai konten proses. Yang tetap bisa dipelajari adalah koreografi satu kamera tanpa cut di dalam kanvas.
- Dunia: langit pastel berawan. Kursor 3D mengklik pill pencarian, kamera menembus labelnya ke karakter yang melayang dengan laptop. Ikon-ikon muncul mengelilinginya, karakter melompat pergi, laptop berputar, kamera menyelam ke layarnya, terbang di terowongan, lalu keluar lagi ke langit awal (loop).
## Color script & palet
- Satu dunia tanpa cut: gradien langit biru muda (atas) → pink-magenta (bawah), L 75–95, awan putih dan bokeh lingkaran. Terowongan (12.1–13.6) memakai palet yang sama (pink, biru langit, navy #32668f, putih). Tidak ada perubahan field, warna berubah karena kamera pindah tempat.
- Peran: latar gradien duotone, tinta putih, aksen magenta (pill, name tag) dan cyan-biru (kursor). Ikon membawa warna sendiri (oranye, teal, ungu). Poster 1.6 s 4 warna (77), 6.6 s 5 warna (83), 12.4 s 3 warna (86). Neon 1%, halo 0.02%, lumpur 0%.
- Nilai: L median 75.4, kontras Δ90.8 (layar penuh). Di kanvas kontras p5–p95 32–99, tinta vs latar Δ53–86. Terowongan rapat: ruang kosong hanya 11%.
## Tipografi
- Tipe sedikit. Label pill "…Motion Designer" berupa geometric/rounded sans semibold, putih di pill gradien magenta, 2.2–3.0% tinggi kanvas. Name tag dan tag kecil ("RENDER", "HIRE ME!") 2–3%.
- Momen tipe satu-satunya, dorong menembus label (2.90–3.27, ±11 frame): kata label membesar ke ±25–30% tinggi kanvas, blur, bergeser kiri, lalu larut ke langit sementara karakter muncul di baliknya.
- Caption pov besar (2.4%) adalah teks posting, bukan desain gerak.
## Elemen & properti grafis
- Kursor panah 3D extruded (gradien cyan→biru, bevel bercahaya), pill pencarian magenta, ring kotak outline membulat, karakter ilustrasi dengan laptop (stiker "HIRE ME!"), ikon glossy 3D (hati, bintang, bulan sabit, gerigi/badge), laptop frontal, terowongan ubin berpola bintang/bulan/heksagon.
- Lahirnya pill (0.00–0.60): mulai dari titik di 0.15, jadi garis tipis di 0.30, pill penuh di 0.45 (skala X dulu, lalu Y, ±9 frame). Di 0.60 pill flip 3D memperlihatkan labelnya (±3 frame) saat kursor mengetuk.
- Ripple klik (1.50–2.10): 2–3 kotak outline membulat menjalar keluar dari pill. Di 2.40 kursor menyelam ke label.
- Ikon tumpuk ritmis (4.3–6.5): hati 4.3, gerigi 4.6, bulan 5.5, bintang 6.0, tag render 6.5 (selang 0.3–0.9 s). Tiap ikon pop in lalu mengambang naik-turun.
## Kamera & angle
- Satu kamera 3D kontinu selama 13.8 s (0 cut terukur, temuan, bukan bug). Kamera hidup 33%.
- Gerakannya: push-in, menembus label, drift lambat di karakter, push ke laptop, dive ke layar, terbang di terowongan dengan roll ±45°, keluar lewat jendela.
- Angle frontal dengan ikon di kedalaman berbeda. Roll muncul di dive (±8°) dan di terowongan.
## Transisi
- Semua transisi adalah gerak kamera atau objek, tanpa cut.
- Tembus label (2.90–3.27): kursor tetap diam di depan sebagai jangkar mata, sementara label raksasa yang blur lewat di belakangnya dan dunia berganti.
- Lompat keluar (9.40–9.80): karakter melesat keluar frame ke kanan dengan motion blur berat (±6 frame) dan meninggalkan laptop. Laptop berputar di sumbu Y (edge-on di 10.6 s), lalu mendarat frontal sebagai laptop terbuka di 10.9 s.
- Layar jadi dunia (11.86–12.13): setelah push lambat ±30 frame, kamera mempercepat 8 frame ke dalam layar dengan roll ±8°. Di 12.13 terowongan di layar sudah memenuhi frame.
- Portal keluar (12.60–13.65, ±31 frame): jendela langit lavender di ujung terowongan membesar dan berputar ±45° sampai menjadi frame. Kursor kembali di posisi awal, jadi frame terakhir menyambung ke frame pertama (loop mulus).
## Rasa gerak
- Mengambang dan bouncy. Ikon pop in dengan overshoot lalu bobbing, gerak besar dibantu motion blur, ritme kamera pelan-cepat-pelan.
- Hold 15% / burst 16%, punch 8.4×. Energi tertinggi ada di dive dan terowongan (12.1–13.8).
- Trik:
  - Ada: motion blur nyata, dorong menembus tipe, screen-in-screen dive, loop.
  - Tidak ada: 1-frame impact (0), strobo (0), smear huruf, pecah RGB (diam 0.4 / cepat 1.2 px, nyaris nol).
- Kedip maks 1/detik (12.85 s, ubin terowongan).
## Suara (diukur dari angka, tidak didengar)
- 152 BPM tapi kekuatan beat 0.24 (lemah), 1.82 onset/s, onset terang 31%, berat 0%, senyap 14% (0–0.15 s dan 6.15–6.75 s), rentang dinamik 28.6 dB (lebar), RMS p95 −10.7 dB. Onset terakhir 14.36 s.
- Onset menggerombol di pembuka (0.35–0.49), di sekitar 11.6 s, dan di terowongan 12.1–13.3 (strip waveform AE di layar juga memuncak di situ).
- Bacaan: bed tipis dengan SFX whoosh/pop yang dipusatkan di momen dive. Bisa jadi itu audio preview AE, bukan mix final.
## 3 teknik yang boleh dipindah
1. Layar jadi dunia, lalu portal pulang:
   - Push lambat ±30 frame ke perangkat, percepat 8 frame masuk ke layarnya dengan roll ±8°, isi layar menjadi frame tanpa cut.
   - Untuk keluar: ujung terowongan berupa jendela yang memperlihatkan dunia pembuka, membesar dan berputar ±45° dalam ±31 frame sampai jadi frame, sehingga film nge-loop.
2. Komponen lahir titik → garis → pill (skala X lalu Y, ±9 frame), lalu flip 3D memperlihatkan label (±3 frame). Klik dibalas 2–3 ring kotak outline yang menjalar (±0.6 s), bukan flash.
3. Jangkar tetap saat menembus tipe: label diperbesar ke ±25–30% frame, blur, bergeser selama ±11 frame. Objek kecil (kursor) diam di depan supaya mata tidak kehilangan tempat, lalu dunia baru muncul di balik huruf yang larut.
## Ekspresi yang tidak boleh ditiru
- Karakter ilustrasi kreator dan name tag-nya, label "Find Motion Designer", stiker "HIRE ME!/RENDER", caption "pov: motion designer with 8 years+ experience", set ikon glossy dan terowongan berpolanya, handle @afif_sin, layar AE/timeline (konten proses).
