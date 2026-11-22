# Penutup — STATE-BAB (2026-11-15)

**Status:** dibangun penuh sampai Studio. Belum render penuh (WAJIB: tunggu Ikhsan cek Studio + OK).
**Studio:** http://127.0.0.1:8799 (log: /tmp/claude-1000/-home-ikhsands-Proyek-super-motion-claude-ikhsan/d5765a46-ae40-4582-b0e1-c534a85cd555/scratchpad/penutup/studio.log)
**Durasi:** 42.46 s (VO 10 = 36.56 s + VOFF 0.3 + layar akhir 5.6 s). Dunia: ruang gelap default (tanpa theme()).

## Stasiun (waktu film)
| # | t | via | Isi |
|---|---|---|---|
| S1 Intinya | 0.0 | — | B-roll jaringan (switch LED, biru) + "AI NGGAK KEHABISAN cara belajar." + 3 chip jalan Bab 3; di "bergantung" (4.7) batang lime TULISAN MANUSIA *yang jujur.* turun, ketiga chip menggantung di tali (bandul teredam) |
| S2 Suara asli | 7.7 | push | "menurutku, ini KABAR BAIK." + senyum digores (9.8) → paduan suara mesin satu nada (17 baris teks seragam, naik-turun serempak, 10.5) → SUARA (tiap huruf font/nada sendiri) ASLI (lime) = LANGKA |
| (selam) | 14.47–15.04 | — | **Teknik baru "Selam Lubang Huruf"**: zoom eksponensial (log-z inCubic, ~44×) menembus lubang huruf A pada ASLI; kotak komentar sudah terlihat di dalam lubang |
| S3 Giliran kamu | 15.04 | cut | "GILIRAN KAMU CERITA." + UI kotak komentar ala YouTube: fokus garis, ketik "Bahasa daerahku: ___" (nama bahasa berputar), "Pernah kutulis di internet: ya / belum" + kursor bolak-balik |
| S4 Berikutnya | 22.7 | whip | "kalau tulisan manusia makin MAHAL." + garis naik → kartu VIDEO BERIKUTNYA (tangan+pena Ahpo A01-1, centang di "ngajarin") → "?" besar di "siapa" → bar MEMUAT…/SEGERA TAYANG |
| S5 Kuota aman | 31.7 | rise | notifikasi hook dibangun ulang (Plus Jakarta Sans): coret ditarik, "Kuota data aman" + centang lime (33.6), teks "Yang perlu kita jaga: isinya." (35.1), bar lime terisi "kita isi" (36.1) |
| Layar akhir | 36.69 | mod | kamera mundur; JAGA ISINYA. + *tulis yang asli, pakai bahasamu.* + SUBSCRIBE→SUBSCRIBED + lonceng (bisu); kanan 2 slot putus-putus (slot 1 = kartu video berikutnya) untuk elemen YouTube |

Hits: gr3 @menurutku, stk3 @kalau, hw3 @dan2. Bed: vastness ss 150, RMS -31 target (terukur -36.8 setelah duck). portal.json inn:true out:false (bab terakhir).

## Aset
- `assets/vid/jaringan/` (90 frame, 15 fps) dipotong lokal dari `pixabay-video-network-internet-data-free-stock-14900.mp4` ss 4 s, 6 s; `assets/vid/vid.json` sendiri.
- Tangan+pena `../assets/shared/ahpo/A01/A01-1_tangan-pena_H2-2.png` (CC0).
- Notifikasi hook digambar ulang di kode (salinan acuan: `assets/notif-hook.png`).
- Font Plus Jakarta Sans (variabel, terpasang lokal) dimuat lewat document.fonts.load di load().

## Terukur / dilihat / belum
- Terukur: mix 42.46 s, 48 SFX + 3 hits, VO RMS -21.1, musik -36.8, SFX -38.9 (peak -10.9), mix peak -4.2 dB. Studio HTTP 200 (halaman, film.js, mix.wav, aset).
- Dilihat: 35 frame cek (2 putaran). Diperbaiki: label MESIN ketabrak baris paduan suara (kini ada alas), kurva selam (inExpo → inCubic di log-z), "?" menimpa MAHAL (grup kiri naik+pudar), tumpukan notif mengganggu layar akhir (pudar 80 %, gradasi kiri ke 1180 px). Frame 15.03 s: lubang menutup layar penuh sebelum potong.
- Belum: suara tidak didengar; eye.py sense/--flow belum dijalankan (butuh render); ΔE ujung puncak → awal penutup belum dicek; gerak real-time belum ditonton.

## Terbuka / usulan kit
- Tambah `jaringan` ke CLIPS di tools/vid_frames.py + vid.json bersama (sekarang lokal di penutup).
- Hit stk3 (garis cahaya merah-oranye) keluar dari palet lime — usul cek apakah perlu di-grade di tx library.
- Batang lime S1 (1640×100) cukup luas; kalau terasa terlalu "lime", tipiskan jadi 70 px.
