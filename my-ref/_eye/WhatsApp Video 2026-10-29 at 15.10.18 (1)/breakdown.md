# Breakdown 15.10.18 (1): UI ponsel yang hidup, morph antar-state (untuk belajar, bukan ditiru)
Sumber: dna.md, dna_sheet.jpg, look_1.55 / 5.55 / 6.80 / 9.60, poster/ (12.2 = outro TikTok, 3.5, 8.0, 10.3). 13.0 s · 1024×576 · ±29.3 fps.
## Gaya & dunia
- Keluarga: clean tech, product UI motion ala keynote. Isinya rekreasi UI ponsel 2D/2.5D (ikon, badge, tombol pill, halaman toko aplikasi) yang di-morph dari satu state ke state berikutnya.
- Dunia: satu ikon aplikasi berjalan melewati state UI (layar terang → dark mode → home screen → tombol → logo). Metaforanya: produk tumbuh dari satu titik.
## Color script & palet
- 5 field (putih, abu, hitam, wallpaper warna-warni, biru muda), ΔE antar shot 41.7, rentang L 98.3. L median 65.1, kontras Δ14.4 (sangat lembut), chroma 0.9 (hampir grayscale), lumpur 20%, neon 1%, halo 0.04%.
- 2 warna/frame, 0 aksen/frame. Warna datang hanya sekali sebagai kejadian (wallpaper 5.4–7.0 s, badge merah). Sisanya netral, plus biru #4fa5f2 untuk huruf yang sedang diketik.
- Ruang kosong 84%, satu-bintang 87% (tertinggi), lompatan mata 0.122 (mata dikunci di tengah).
## Tipografi
- Grotesk UI-native (gaya SF Pro), regular–semibold. Judul app 5.6% dan subjudul 3.9% (1:1.4). Baris statistik: label caps kecil ber-tracking lebar di atas angka besar. Wordmark akhir 9.4% tinggi frame, rasio 4.0 ke pendukung.
- Masuk:
  - Type-on per huruf: biru dulu, lalu gelap ("Cha…", 3 huruf dalam 6 frame ≈ 2 frame/huruf, 1.50–1.67 s).
  - Huruf label tombol pop dari bawah bertangga dengan overshoot kecil dan kilau bintang (8.0 s).
- Highlight: biru berperan sebagai kursor atau pre-tint huruf baru. Tidak ada slam.
## Elemen & properti grafis
- Tile ikon rounded-square putih berisi logo, badge notifikasi merah, bar prompt, tombol pill 3D bergaya clay (bevel dan bayangan lembut), sparkle, wallpaper, status bar, grid ikon aplikasi, halaman toko aplikasi (rating, usia, chart).
## Kamera & angle
- 2D/2.5D: "kamera" berupa skala layer. Zoom-out dari tile ke grid home screen (5.57–5.68, ±3 frame), push pelan saat hold (kamera hidup 38%).
- Tanpa dutch. DOF diganti blur kaca buram (6.74–6.94). Optik bersih saat diam (pecah RGB 0.3 px), pecah hanya saat cepat (2.6 px).
## Transisi
- Fade latar terang → hitam di bawah tile yang tetap (1.40–1.67, 9 frame). L turun hampir linear ±11 per frame: anchor-nya tetap, dunianya berganti.
- SIGNATURE match-morph, dua tahap:
  - 5.40–5.67 (8 frame): blob putih jadi tile ikon, titik jadi badge "3", wallpaper fade-in dari hitam, lalu zoom-out.
  - 6.74–6.94 (7 frame): badge memanjang jadi pill tombol, home screen larut ke kaca buram putih.
- Logo drop: smear vertikal + spin 4 frame (9.47–9.57), lalu settle 5 frame dengan scale-up kecil dan cincin ripple lembut.
## Rasa gerak
- Halus, ease-out seperti spring UI (sedikit overshoot di huruf, tanpa getar). Burst 22% / hold 25%, punch 8.3×, shot median 1.4 s, 4.62 cut/10 s. Cut pas onset 75%, tertinggi di batch ini.
- Trik:
  - Ada: smear (logo drop), optik reaktif-kecepatan (0.3 → 2.6 px), metaball/liquid morph ringan (badge melar jadi pill).
  - Tidak ada: 1-frame impact, slit-scan, echo, kinetic wrapping.
- Kedip maks 1/detik.
## Suara (diukur dari angka, tidak didengar)
- 126.0 BPM, beat 0.53, 2.48 onset/s, terang 33%, berat 0%, senyap 13% (0–0.25 s dan 10.8–11.2 s), rentang dinamik 20.2 dB. Cut pas onset 75% (cut 0.05–0.16 s dari onset).
- Bacaan: musik-driven, cut dikunci ke beat, onset terang kemungkinan pop/klik UI. Ada jeda 0.4 s sebelum outro. Tidak ada tanda VO.
## 3 teknik yang boleh dipindah
1. Match-morph 7–8 frame: elemen kecil di scene A menjadi hero scene B (titik → badge → pill → logo) sementara latarnya fade atau blur. Kontinuitas didapat tanpa transisi "efek".
2. Grayscale (chroma ±1) dengan satu ledakan warna sebagai kejadian. Mata dikunci di tengah (lompatan ±0.12). Fade latar ±11 L/frame di bawah anchor yang diam.
3. Logo drop: smear + spin 4 frame, settle 5 frame dengan ripple. Type-on 2 frame per huruf dengan pre-tint aksen, lalu turun ke tinta.
## Ekspresi yang tidak boleh ditiru
- Logo & wordmark ChatGPT/OpenAI, rekreasi home screen & halaman toko aplikasi iOS, ikon-ikon aplikasi, angka rating/chart, wallpaper, handle kreator.
