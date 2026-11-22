# Kartu G0 · batam-swro-data-center (USULAN — menunggu pilihan Ikhsan)

Film: "Batam Bangun Pabrik Air Laut Rp600 Miliar untuk Data Center. Kenapa?" · naskah Ahri `NARASI.md` (14 fakta ✅, ±10 menit, 16:9) · standar `studio-global/references/standar-kasta-tinggi.md`.

## Tema (pilih 1 kalimat, 2 sisi)
- **T1 · AWAN atau PIPA?** *(usul utama)* — kontras Hook & Puncak Ahri ("data di awan" vs "butuh air laut Rp600 miliar").
  Sisi `AWAN`: kesan ringan di layar HP kita (chat AI, foto, cloud). Sisi `PIPA`: beban fisik nyata — panas rak server, 70–90% air menguap, waduk Batam menyusut, pipa transmisi 12 km, dan sisa garam *brine* 70.000 ppm. Kata aksen lime (`#C8F53C`): kata kunci air/pipa/angka hero (`markLine`, 1 kata per kalimat).
- **T2 · WADUK atau LAUT?** — fokus rebutan air antara warga Batam dan pusat data (kuat di Bab 1 & Bab 3, kurang merangkum Bab 2).
- **T3 · SOLUSI atau TAGIHAN?** — fokus ongkos tersembunyi di Bab 4, kurang terasa di Hook & Bab 1.

## Bahan dasar film (metafora-fisika L2): TEKANAN, PIPA & MEMBRAN
Semua ide memakai satu dunia fisik yang lahir dari naskah: **aliran air bertekanan yang memisah dan menguap**. Tidak memakai tangga/saklar (pensiun), gelembung pecah (cooldown `abd`), atau salinan pudar/mata mesin (cooldown `adh`).

| # | Ide khas | Bab | Fisika | Tes 3 dtk |
|---|---|---|---|---|
| 1 | **Membran Tekanan Osmosis** | Bab 3 · Bab 4 · **tes-membran** | Dinding membran semipermeabel di ruang 3D: partikel air tawar & garam bergerak. Pompa tekanan tinggi mendorong `35.000 ppm` air laut menembus pori — `50%` lolos jadi air bersih (bening/dingin), `50%` tertahan jadi *brine* pekat `70.000 ppm` dengan riak refraksi air. | **SUDAH DIBANGUN (`tes-membran/`)** |
| 2 | **Katup Pembelah Awan → Pipa** | Hook · Puncak (*callback*) | Ikon awan lembut di atas frame terbuka oleh aliran air bertekanan yang mengalir ke pipa transmisi menuju rak server panas dan ombak laut. Di Puncak, seluruh alur pipa menyambung balik ke awan di layar HP. | opsional |
| 3 | **Gelas Ukur 6 Waduk Batam** *(benda tulang punggung S4)* | Peta · Bab 1 · Bab 3 | Silinder pengukur ketinggian air (*sight-glass*) untuk 6 waduk tadah hujan Batam. Permukaan menyusut drastis (`90 → 25 LPS` → berhenti 20 Okt 2026), lalu pipa cabang SWRO Kabil (`300 → 700 LPS`) mengambil alih beban dari laut. | — |

Motif lock (≤ 3): **jalur pipa tekanan**, **selaput membran**, **gelombang riak air**.

## Tanda tangan channel (sumbu segar sesuai `standar-kasta-tinggi.md`)
- **S1 Satu Baris (`intro/`)** → sumbu *material + path*: potongan bukti (BP Batam, Antara, Kompas.com) berbaris di sepanjang jalur pipa di kedalaman; kamera meluncur maju-mundur dengan *rack focus* dan *depth bokeh*, lalu masuk ke gerbang pipa Kabil menuju slab judul `#C8F53C`.
- **S2 Bukti Stabilo (`evidFull`)** → sumbu *after*: **Tone-Layer Lift** — setelah stabilo `#C8F53C` menyapu frasa di halaman miring (BP Batam, Ombudsman, detikSumut, Batam Pos, Nature, arXiv, DOE — 5–6 halaman di seluruh film), frasa terangkat sebagai tipe bersih sementara halaman surut ke kedalaman.
- **S3 Latar penuh dokumenter** → seluruh B-roll video (server, keran menetes, tanah waduk retak, menara pendingin, ombak laut) & foto CC (`commons-reverse-osmosis-desalination-plant.jpg` + kredit layar wajib) tampil *full-bleed* dengan grade dokumenter, grain, vignette, dan scrim gelap di sisi teks.
- **S5 Portal antar bab** → **Katup Pipa Laut** (`kit/portal.js` baru, 0.65 s OUT / 0.65 s IN): dua pelat katup gelap menutup dengan celah batas `#C8F53C` + label `BAB N` dan subjudul gading besar yang terbaca jelas, lalu membuka dengan embusan uap tipis ke bab berikutnya.
- **S8 Hit film (WAJIB)** → kurangi `stk3`/`cmc1` (sudah ×10 di `pustaka.py segar`), pakai base 9 secara hemat + potong **≥ 2 hit baru** dari paket `_transisi` yang belum pernah dipakai: **`cinematic-overlay-vfxasto`** + **`dark-dust-overlay-vfxasto`** (`IZIN-IKHSAN.md` ✅).

## Teknik baru L3 (`webgl-showcase-craft.md`, ≤ 2 per film)
1. **Closed-form ripple refraction + Worley caustic** (`makeGL` WebGL2 → Canvas 2D) — riak bias air & kilau kaustik tipis di atas permukaan laut, waduk, dan sisi membran SWRO (tetap dalam batas palet ink/ivory/cool-slate, tanpa neon).
2. **Cartographer map in real metres** (`peta` baru untuk Batam) — peta Pulau Batam dengan ketebalan garis jalan/pipa konstan saat kamera zoom dari seluruh pulau ke jalur pipa 12 km Kabil–Nongsa.

## Skrip warna per bab (ΔE ≥ 18, kontras ≥ 40, aksen tunggal `#C8F53C`)
- **Intro**: malam server `#0B0C09` → biru-baja laut → slab judul `#C8F53C`.
- **Peta**: abu-biru laut dokumenter `#0F1418`.
- **Bab 1 (Krisis Air Batam)**: gading terang `#EAE7DC` (data Disdukcapil/Ombudsman) → bergeser ke abu-tanah kering `#1A1814` (El Niño & IPAM berhenti).
- **Bab 2 (Server & Uap)**: ruang server gelap `#0B0C09` + uap putih-perak + hitungan Nature/arXiv.
- **Bab 3 (SWRO Kabil Rp600 M)**: biru-laut dalam `#0A161E` + pipa gading `#F1EFE6`.
- **Bab 4 (Brine & Listrik)**: gelap pekat `#0B0C09` + endapan garam abu-gading `#D9D6CA`.
- **Puncak & Penutup**: ruang hangat tenang `#121410` + layar akhir & cursor click SUBSCRIBE.

## Cooldown (dari `pustaka.py segar`)
- Tidak memakai headline/portal dari `ai-bubble-dompet` (Gelembung Pecah, Tembus Selaput) dan `ai-data-habis` (Salinan Pudar, Mata Mesin, Garis Pindai), maupun `agi-setara-manusia` (Saklar, Anak Tangga).
- `prop.timbangan`, `prop.kerumunan`, `data.splitFlap` diistirahatkan / di-restyle penuh bila dipakai sebagai detail kecil.

## Kredit ElevenLabs (perlu persetujuan sebelum generate)
- Jalankan `.venv/bin/python -I aset/batam-swro-data-center/tools/vo_texts.py` untuk jumlah karakter eksak per take (Ahmad, `eleven_v4`).
