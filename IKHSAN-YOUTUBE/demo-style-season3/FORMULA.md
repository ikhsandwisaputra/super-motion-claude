# FORMULA RASA · Lab Season 3 (3 tes × ±4–5 detik, satu timeline Studio)

Keputusan Ikhsan 2026-11-20: "gass ketiganyaa", maskot pilihan Ahtor, bahan yang ada dulu, boleh install apa pun
untuk konten. Lalu (di tengah kerja): **maskot dari kode, karakter ASCII yang emosional, lucu tapi keren, muncul dan
hilang dengan animasi kodingan.** Si Piksel (kubus vinyl) diganti: maskot sekarang **Aksa** (nama kerja, dari
"aksara"; nama final keputusan Ikhsan).

Bahan: film `data-kita-dijual-dark-web` (VO `dkd_vo_ahmad_*`, plate Ahpo D01/D06, artikel Kompas, foto stok, hit
`tx/`). Kredit ElevenLabs: 0. Tidak ada render sebelum Ikhsan cek di Studio dan bilang OK.

## DNA yang dikunci (sama di ketiga tes)
Ruang gelap `#0B0C09`, ivory `#F1EFE6`, satu aksen lime `#C8F53C` (tanpa glow neon), abu `#7C7D74`.
Huruf: League Gothic (hero) · Fraunces Italic (editorial) · Space Mono (kode/meta). Grain film halus ±2,6 %.
Hit transisi film dari `tx/` (screen blend, puncak di `at`, suara di `at − peak`). Kamera tidak pernah mati.

## Timeline lab (30 fps, 1920×1080)
| detik | tes | VO (file · rentang) |
|---|---|---|
| 0,0–6,0 | A · Selam Detail | 01 · 16,00–19,95 "Sayangnya, di pasar gelap, rahasia kita diobral murah." (mulai di 0,30) |
| 6,0–10,0 | B · Foto Jadi Ruang | 06 · 153,00–154,70 "Cuma dua persen." (mulai di 7,0) |
| 10,0–15,0 | C · Aksa | 01 · 3,20–6,30 "…Bukan. Itu harga data KTP kita." (mulai di 10,5) |

## A · Selam Detail: "masuk lewat detail, keluar lewat detail"
- **Rasa:** tersedot; dari benda yang kita genggam sampai harga obral, satu tarikan napas tanpa potong.
- **Metafora:** matryoshka bukti. Tiap bukti menyimpan bukti berikutnya di salah satu detailnya.
- **Jalur kamera:** ponsel gelap Ahpo (D06) → menyelam ke layar → artikel Kompas "Peretas Mengobral Data Warga"
  full-bleed (sumber terbaca) → stabilo lime menyapu "Mengobral" di "rahasia kita" → di "diobral" kamera menyelam
  ke lubang huruf **o** (hit `shD`) → keluar mundur dari angka **0** di **Rp0,49 / warga** (match-cut o → 0).
  Harga tahan ≥ 1,5 s.
- **Fisika:** speed ramp terintegrasi (posisi = ∫ r dt, r 1 → 0,15 → 1) untuk rush → hang → rush; ghost trail
  hanya saat rush; zoom blur radial saat kencang (preview K = 1 tetap kelihatan cepat). Snap 85 % dalam 4 f, cushion 20 f.
- **Ledger:** `speed-ramp-integrated`, `ghost-trail-rush-hang` (kandidat) + stabilo/`markLine` (DNA).

## B · Foto Jadi Ruang: "berdiri di dalam fotonya"
- **Rasa:** kagum lalu sunyi. Lorongnya besar, yang selamat cuma sedikit.
- **Metafora harfiah:** lorong server (foto stok + depth map Depth Anything V2 Small) jadi ruang 3D. Saat
  "Cuma dua persen", **gelombang padam menyapu kedalaman lorong**: semua rak gelap, hanya satu irisan kedalaman ±2 %
  yang tetap menyala. "2%" berdiri sebagai huruf fisik di lorong, kena kabut dan DOF, dengan pantulan di lantai.
- **Kamera:** dolly maju di jalur lorong (racing line), sedikit orbit, rack focus dari rak depan ke "2%".
- **Ledger:** `thin-lens-accum-dof`, `horizon-matched-fog`, `defocus-dust-energy` (kandidat). Mesin: three.js
  (MIT, dipasang di lab), mesh dipindah oleh depth, kabut dan padam dihitung dari depth.

## C · Aksa: maskot ASCII yang lahir dari kode
- **Rasa:** "teman yang ikut kaget". Lucu karena wajahnya emotikon, keren karena tubuhnya patung ASCII 3D yang
  diterangi lampu studio (huruf dipilih dari bentuk tinta 2×3, mesin `bacaMesin` pustaka, bukan rampa terang biasa).
- **Desain:** tubuh gumdrop bulat (SDF 3D, squash & stretch pegas ζ 0,6), huruf ivory diarsir lampu kunci kiri atas +
  rim; wajah emotikon Space Mono besar, **lime: satu-satunya aksen saat Aksa di layar** (`o_o` netral, `O_O` kaget,
  `T_T` sedih, `^_^` lega, `>_<` sakit, `-_-` kesal). Bayangan kontak di lantai, ikut cahaya scene.
- **Muncul (kodingan):** caret berkedip → mengetik `aksa.bangun()` → baris kode itu menggembung jadi tubuh (sel
  di-decode dari huruf acak, gelombang dari bawah) → mata boot `- -` → `o o`.
- **Hilang (kodingan):** `aksa.tidur()` → tubuh kempis jadi satu baris → caret menghapus (backspace) → caret padam.
- **Akting di tes:** muncul di "Bukan." → menoleh ke label harga di "Itu harga" → kaget lompat di "KTP" (antisipasi
  3 f, "!" muncul, tepi huruf gemetar acak, label harga berayun kena angin lompatan) → `T_T` di "kita" → pergi.
- **Aturan tampil (usulan):** 5–7 kali per film, ≤ 4 s per kemunculan, hanya momen emosi; tidak bicara.
- **Ledger:** teknik baru `aksa-ascii-mascot` (ditambah setelah verdict), mesin bentuk-huruf dari `bintang.mata`
  (cooldown dihormati: transisi Mata Mesin tidak dipakai).

## Motif lock Season 3 (kalau ketiganya lolos)
1. Selam Detail (transisi hero antarbukti) · 2. Foto Jadi Ruang (dunia) · 3. Aksa (emosi). Lainnya hanya penunjang.

## Yang sengaja tidak dipakai
Kubus vinyl Si Piksel (diganti ide Ikhsan), neon/glow pada huruf, lebih dari satu warna aksen, transisi Mata Mesin
(cooldown), dunia kertas/prop, look jadul.
