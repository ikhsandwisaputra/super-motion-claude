# LAPIS · Dari Nvidia ke Dompet Kita (🎨 Ahpo → 🎬 Ahtor) · 14 Nov 2026

Status: **P1 lengkap (A01–A04)** · **P2: A05–A06 selesai**, A07–A10 menyusul di kiriman berikutnya.
Semua dibangun live di PhotoCraft (shape vektor + layer bernama). File kerja:
`/home/ikhsands/Proyek/ikhsan-crafting-art/photocraft-work/ai-bubble-dompet/A0x-*-v0x.pcraft`

## Cara pasang

- **Semua PNG berukuran 4000×2250 dengan registrasi identik per aset.** Tumpuk sesuai nomor urut (`_01` paling bawah).
  Kalau dipasang di comp 1920×1080 dengan skala 0,6, bingkai = area tengah 3200×1800 (x 400–3600, y 225–2025) dan sisanya
  overscan 2400×1350. Sama seperti paket Indo vs AS.
- `_01_BG` opaque (RGB), lapis lain RGBA transparan. Sudah dicek otomatis: ukuran benar, alfa ada, tidak ada yang kosong,
  dan komposit ulang dari PNG sama dengan tampilan live.
- **Tidak ada blend mode khusus.** Bayangan (Multiply di file kerja) keluar sebagai hitam ber-alfa (Normal). Pantulan lantai
  sudah dipanggang dengan opacity 20–22 %.
- Cahaya kunci: softbox tengah-atas. Bayangan kontak tajam lalu melembut, jatuh lurus ke bawah.
- Folder `besar/` = bagian kecil dirender ulang lebih besar (vektor, bukan upscale), sisi panjang ≥ 1400 px.
  Ukurannya sendiri, jadi tidak satu registrasi dengan kanvas 4000×2250.
- Teks: tidak ada teks tertanam. Semua kartu, label, layar, dan stempel kosong untuk diisi engine (tinta gelap di atas lime).

## Konsep (satu kalimat)

**Yang NYATA punya berat.** Setiap benda berdiri di lantai studio gelap yang mengilap dan meninggalkan **pantulan + bayangan**.
Gelembung buatanmu tidak punya pantulan, jadi "gelembung atau nyata?" terbaca dari fisikanya, tanpa teks.
- Medium: foto produk still-life semi-3D (muka depan + sisi samping bervolume). Materialnya logam sikat, silikon, dan kaca
  layar. Ruang #0B0C09, gading #F1EFE6, satu aksen lime #C8F53C per benda (LED, label harga, pita papan, stempel, kabel serat).
- Beda dari Indo vs AS: di sana maket matte di lantai doff. Di sini benda keras, lantai cermin, dan pantulan jadi alat cerita.
- Saran gerak: saat gelembung pecah dan angka asli jatuh ke lantai, angka itu baru mendapat pantulan (pakai lapis `pantulan`
  yang sama sebagai acuan opacity 20 % + blur 6 px).

## Grain

Grain monokrom hanya ada di lapis BG, dan sengaja tidak ada di objek: grain per lapis akan ikut bergeser saat kamera 3D
paralaks. **Saran: tambahkan grain 2–3 % + halation tipis di comp final**, supaya seluruh frame punya tekstur yang sama
(design_review menandai "licin plastik" di objek; inilah jawabannya).

---

## A01 · Rak server pusat data (Hook: "tersangkanya… pusat data AI")
| # | Lapis | Isi |
|---|---|---|
| 01 | BG_studio | dinding gelap, sorot softbox, lantai mengilap |
| 02 | BG_lorong-rak-belakang | 4 rak samar kiri-kanan (redup 50 %) = lorong pusat data, ada LED samar |
| 03 | MG_pantulan-rak | pantulan rak + LED di lantai |
| 04 | MG_bayangan-rak | kontak + lembut |
| 05 | MG_rak-rangka-server | rak 970×1610, 14 unit server (switch, bay drive, storage, GPU), sisi kanan berventilasi |
| 06 | MG_led-lime-fase-a | LED lime kelompok A (kedip bergantian dengan B) |
| 07 | MG_led-lime-fase-b | LED lime kelompok B |
| 08 | MG_led-gading-aktivitas | LED gading kedip cepat (aktivitas disk) |
| 09 | FG_kabel-atas | bundel kabel naik keluar frame, satu kabel lime |

## A02 · Chip memori (Hook + tes 3 detik gelembung)
| # | Lapis | Isi |
|---|---|---|
| 01 | BG_studio | |
| 02 | MG_pantulan | pantulan modul + die |
| 03 | MG_bayangan-modul-ram | |
| 04 | MG_modul-ram-belakang | modul RAM vektor 1760×440 (opacity 85 % dipanggang = lebih jauh) |
| 05 | MG_modul-ram-depan | modul RAM 1800×400, 8 chip, kontak logam, takik, stiker lime kosong |
| 06 | FG_bayangan-die | |
| 07 | FG_die-dram-plakat | **foto die MT4C1024** sebagai plakat spesimen berdiri (1551×921, perspektif kanan menjauh, sisi tebal, 2 kaki), grade ter-clip |
| 08 | FG_kilau-kaca-die | kilau kaca pelindung (bisa disapu untuk "glint") |

Catatan: `commons-dimms.jpg` hanya 439×273, jauh di bawah 1400 px. Jadi modul RAM **saya gambar sendiri (vektor)** dan
foto itu tidak dipakai.

## A03 · HP + label harga (Hook, Bab 4, thumbnail)
| # | Lapis | Isi |
|---|---|---|
| 01 | BG_studio | |
| 02 | MG_pantulan | |
| 03 | MG_bayangan-hp | |
| 04 | MG_hp-badan-dudukan | HP 820×1600 tampak depan (bingkai logam, sisi tebal, tombol) di dudukan akrilik |
| 05 | MG_layar-kosong | layar kosong 740×1520 (isi oleh engine) |
| 06 | MG_kilau-layar | pantulan softbox di kaca (taruh di atas isi layar) |
| 07 | MG_kamera-depan | lubang kamera (taruh di atas isi layar) |
| 08 | FG_tali-label | tali dari pojok HP ke lubang label |
| 09 | FG_bayangan-label | |
| 10 | FG_label-harga-miring | label lime runcing, mata logam, area tulisan kosong. **Miring naik ke kanan (+13°) = "harga naik"**. Poros ayun = lubang (≈ x 2332, y 680) |

`besar/`: tali, bayangan, dan label (1584×1408, label 1414 px).

## A04 · Papan Tersangka (Hook → IHSG "BUKAN AI")
| # | Lapis | Isi |
|---|---|---|
| 01 | BG_studio | |
| 02 | MG_pantulan | |
| 03 | MG_bayangan-papan | |
| 04 | MG_papan-bingkai-kaki | papan 2720×1600 berkaki, pita judul lime kosong (x 750–1870, y 400–520), 3 ceruk baris + kotak nomor kosong |
| 05–07 | MG_kartu-1/2/3-kosong | baris split-flap 9 modul (2292×250), y = 600 / 920 / 1240. Flap atas/bawah + celah engsel di y+125 untuk animasi balik |
| 08 | MG_lampu-baris | 3 lampu indikator (mati, lime gelap). Nyalakan yang jadi tersangka |
| 09 | FG_stempel-kosong | bingkai ganda lime miring, tinta aus, tengah kosong untuk "BUKAN AI" |

`besar/`: stempel 1534×754 (bingkai 1490 px).

## A05 · Menara bursa dipotong dari langit (Bab 3)
| # | Lapis | Isi |
|---|---|---|
| 01 | BG_langit-malam-studio | langit malam gelap + pendar kota rendah |
| 02 | MG_menara-dipotong | foto menara (1900×1922): langit, jalan, orang, dan papan iklan berorang dibuang. Grade siang biru → senja redup, grain dokumenter |
| 03 | MG_layar-menara-kosong | **layar silinder dan logo bursa ditutup layar kosong vektor** (872×1438) supaya tidak ada logo/merek. Taruh ticker/angka di atasnya |
| 04 | FG_kabut-dasar | kabut gelap di kaki menara |

## A06 · Puncak "yang tersisa"
| # | Lapis | Isi |
|---|---|---|
| 01 | BG_langit-malam-tanah | langit malam, bintang samar, pendar cakrawala, tanah, grain |
| 02 | MG_tiang-transmisi-kabel-udara | tiang baja + 4 kabel udara (2 masuk dari luar frame kiri) |
| 03 | MG_bayangan-gedung | |
| 04 | MG_gedung-pusat-data | pusat data 1910×830: louver, pintu gulung, 5 unit pendingin + genset di atap |
| 05 | MG_lampu-jendela-gedung | strip jendela lime (gedungnya masih hidup setelah gelembung pecah) |
| 06 | FG_bayangan-gulungan | |
| 07 | FG_gulungan-kabel-serat-optik | drum kabel 3/4 (lilitan grafit + lime), ujung kabel lime menjulur ke kiri bawah sampai x ≈ 700 |

Massa A06 sengaja berat ke kanan (gulungan FG 77 %). Itu lapis terdekat untuk paralaks; kamera mundur akan menyeimbangkannya.

---

## Kredit / lisensi
- **A02 die:** "MT4C1024-HD" oleh ZeptoBars, Wikimedia Commons, **CC BY 3.0**
  (https://creativecommons.org/licenses/by/3.0/). Diubah: perspektif, grade, plakat.
- **A05 menara:** "Nasdaq Tower May 2026" oleh Nielsoncaetanosalmeron, Wikimedia Commons, **CC BY 4.0**
  (https://creativecommons.org/licenses/by/4.0/). Diubah: langit/jalan/orang/iklan dipotong, layar dan logo ditutup, grade.
- Semua lain: digambar Ahpo (vektor), tanpa aset pihak ketiga.
- Dua kredit CC BY di atas wajib masuk deskripsi video (sudah sama dengan `assets/cc/*.json` dari Ahri).

## Skor design_review (target 95)
| Aset | Skor | Keseimbangan | Catatan "bau AI" |
|---|---|---|---|
| A01 | 83 | 100 | glow di 3 lapis LED: sengaja, LED memang sumber cahaya (glow kecil 14 px) |
| A02 | 80 | 85 | licin plastik → grain di comp (lihat Grain) |
| A03 | 80 | 80 | idem |
| A04 | 84 | 100 | idem |
| A05 | 92 | 71 | idem; menara sengaja tegak di tengah sebagai subjek tunggal |
| A06 | 74 | 48 | idem; berat kanan sengaja (lihat A06) |

"Kebersihan 0" muncul di semua aset karena bagian satu benda saling menumpuk (chip di atas PCB, kartu di ceruk). Itu
konstruksi, bukan tabrakan tata letak.
