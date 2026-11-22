# LAPIS — aset Ahpo untuk "Kalau Data Manusia Habis, AI Belajar dari Mana Lagi?"

Dibuat Ahpo, 2026-11-15. Semua PNG RGBA (kecuali A03-1 opak). Sumber kerja + skrip: `photocraft-work/ai-data-habis/`.
Setiap `*_bayangan.png` = bayangan kontak (hitam, lembut) di kanvas yang SAMA ukurannya dengan objeknya: taruh di posisi/skala yang sama, tepat di bawah objeknya. Parallax = faktor gerak relatif kamera (BG 0.2 … FG 1.0+).
Lisensi: turunan dari foto CC BY-SA tetap CC BY-SA (kredit wajib); CC BY wajib kredit; CC0/PD kredit sukarela. Kredit lengkap: `KREDIT-KONTEN.md` (bagian "Foto humanis" + "Ahpo A03/A05").

## A03 — kolase "perpustakaan digembok" (Bab 2), kanvas 4096×2304
| Z | File | px | Peran | Parallax | Sumber · lisensi |
|---|---|---|---|---|---|
| 1 | A03/A03-1_BG_rak-perpustakaan.png | 4096×2304 | BG, opak, digelapkan (luma rata 0.18), dingin, hitam = #0B0C09 | 0.2 | "UIUC Library Main Stacks", Chevsapher, Wikimedia · CC0 |
| 2 | A03/A03-2b_MG_pagar-kawat_bayangan.png | 4096×2304 | bayangan pagar di rak | 0.45 | turunan A03-2 |
| 3 | A03/A03-2_MG_pagar-kawat.png | 4096×2304 | MG, pagar kawat jaring baja (rope mesh, bukan anyaman chain-link), kilap amber | 0.5 | ambientCG "Fence 003" (peta PBR, dishading ulang) · CC0 |
| 4 | A03/A03-3b_FG_gembok_bayangan.png | 1830×2910 | bayangan gembok | 0.95 | turunan A03-3 |
| 5 | A03/A03-3_FG_gembok.png | 1830×2910 | FG, gembok kuningan (hue ≈36°, jauh dari lime), merek dihapus, busur shackle direkonstruksi | 1.0–1.2 | "…white gate with brass-colored padlock…", Bich Tran, Wikimedia · CC0 |

Susunan contoh (gembok 62 %, pusat 2860,1240): `A03/A03-stack.pcraft`. Kiri/tengah sengaja kosong untuk tipografi ivory.

## A05 — tekstur "Salinan Pudar", 3840×2160, toner (16,16,14) di alpha
| File | Isi | Pakai |
|---|---|---|
| A05/A05-1_toner-speckle-tepi.png | bintik toner menggumpal, makin padat di tepi | Multiply/Normal di atas kartu, 60–100 % |
| A05/A05-2_drum-streak-scanline.png | garis drum vertikal 1–6 px putus-putus + banding pindai halus | 40–80 %; geser y sedikit per salinan |
| A05/A05-3_noda-toner-abu.png | noda toner abu terseka (arah −9°), tengah bersih, alpha ≤ 0.45 | 50–100 % |
| A05/A05-4_butir-toner-halus.png | butir toner 1–2 px menggumpal, rata 4 % | overlay seluruh frame |
Semua prosedural (dibuat Ahpo), tanpa sumber luar. Tumpuk 1→4 makin banyak untuk "salinan ke-n".

## A01 — potongan hook (tepi bersih, dicek di #0B0C09)
| File | px | Peran | Parallax | Sumber · lisensi |
|---|---|---|---|---|
| A01/A01-1_tangan-pena_H2-2.png (+ _bayangan) | 2560×2506 (×1.35) | FG tangan + pena; lengan baju memudar di kanan | 1.0 | H2_2 "Pen-writing-notes-studying", Tookapic · CC0 |
| A01/A01-2_tangan-pena-cincin_H2-3.png (+ _bayangan) | 2560×1623 (×1.10) | FG tangan + pena + cincin; lengan memudar di kiri | 1.0 | H2_3 "Woman writing on a notebook with a pen", Kristin Hardwick · CC0 |
| A01/A01-3_orang-ber-HP_H1-1_setengah-badan.png (+ _bayangan) | 1412×2560 (×1.60) | MG orang ber-HP, setengah badan (pagar menutupi kaki, jadi dipotong di pinggang dengan fade) | 0.7 | H1_1 "Man using smartphone", Adrian disini · CC BY 4.0 |
Catatan A01-3: wajah orang biasa terlihat (topi, menunduk). Pakai kecil/latar, jangan zoom ke wajah. A01-2: ada tulisan merek kecil di batang pena.

## A02 — keping "ekor bahasa" (grade dokumenter netral, satu keping per PNG)
| File | px | Isi | Sumber · lisensi |
|---|---|---|---|
| A02/A02-1_tumpukan-lontar_H3-1.png | 2560×2325 (×1.11) | tumpukan naskah lontar terikat | H3_1 Carma citrawati · CC BY-SA 4.0 |
| A02/A02-2_daun-lontar-Bali-a_H3-2.png | 5489×719 | sehelai lontar Bali, aksara penuh | H3_2 Eka343 · CC BY-SA 4.0 |
| A02/A02-3_daun-lontar-Bali-b_H3-2.png | 5482×685 | sehelai lontar Bali kedua | H3_2 Eka343 · CC BY-SA 4.0 |
| A02/A02-4_naskah-Jawa-Babad_H3-3.png | 4407×3302 | naskah Jawa beriluminasi (Babad, Yogyakarta) | H3_3 Daderot · CC0 |
| A02/A02-5_lembar-Lontara_H3-4.png | 4000×2599 | lembar-lembar Lontara + simpul | H3_4 Gunarta · CC BY-SA 4.0 |
| A02/A02-6_pustaha-Batak_H3-5.png | 2560×1550 (×1.67) | pustaha Batak terbuka | H3_5 (objek museum) · Public domain |
| A02/A02-7_aksara-Jawa-papan_B3-1.png | 3280×500 | strip papan nama berbaris aksara Jawa (keping opak) | B3_1 RaFaDa20631 · CC BY-SA 4.0 |
| A02/A02-8_aksara-Bali-emas_B3-4.png | 2560×950 (×1.46) | huruf aksara Bali emas saja (batu dihilangkan) — paling kuat di atas gelap | B3_4 Schnobby · CC BY-SA 3.0 |
Tiap keping punya `_bayangan.png`. Parallax usul: daun lontar & aksara 0.8–1.1 (melayang beruntun = "ekor"), buku/tumpukan 0.5–0.7.

## A04 — kolase Bab 5 "tulisan asli kita" (tiap foto 1 layer + bayangan, pad transparan 140 px)
| Z usul | File | px | Isi | Parallax | Sumber · lisensi |
|---|---|---|---|---|---|
| 1 | A04/A04-6_papan-aksara-Lontara-Makassar_B3-3.png | 4120×2840 | papan kantor lurah, motif/aksara Lontara | 0.4 | B3_3 Wadaihangit · CC BY-SA 4.0 |
| 2 | A04/A04-4_papan-aksara-Jawa-Sleman_B3-1.png | 4120×2544 | papan kalurahan dengan aksara Jawa | 0.5 | B3_1 RaFaDa20631 · CC BY-SA 4.0 |
| 3 | A04/A04-1_warung-tegal_B1-1.png | 2840×2200 (×1.33) | warteg pinggir jalan | 0.55 | B1_1 Taman Renyah · CC BY-SA 3.0 |
| 4 | A04/A04-2_warung-bakmi-Jawa_B1-2.png | 2840×2200 (×1.33) | warung bakmi Jawa, spanduk menu | 0.6 | B1_2 Midori · CC BY 3.0 |
| 5 | A04/A04-5_papan-jalan-Braga-aksara-Sunda_B3-2.png | 2840×2253 (×1.33) | papan Jl. Braga + aksara Sunda | 0.7 | B3_2 J-lorentz · CC BY-SA 4.0 |
| 6 | A04/A04-3_angkringan-malam_B1-3.png | 2840×1720 (×1.33) | angkringan malam | 0.8 | B1_3 SATELITBM · CC BY-SA 4.0 |
| 7 | A04/A04-7_prasasti-aksara-Bali_B3-4.png | 2840×1987 (×1.33) | prasasti pura, aksara Bali emas | 0.9 | B3_4 Schnobby · CC BY-SA 3.0 |
Tiap file punya `_bayangan.png` (offset 22,34 · blur 26 · 55 %). Susunan contoh: `A04/A04-review-kolase.pcraft` (3840×2160, pita tengah kosong untuk teks).
Orang biasa: B1_1 kecil di latar (aman); B1_3 penjual angkringan cukup jelas — jangan zoom ke wajah. B3_3 memuat lambang Pemkot Makassar; B1_1/B1_2 memuat nama warung. B2 (resep berbahasa Inggris) tidak dipakai.
