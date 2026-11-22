# cara-rockstar-bikin-gta-6 — STATE (fase: build semua bab → cek Studio Ikhsan)

Long-form 16:9 Indonesia, dari `aset/_template-longform`. Playbook: skill `studio-global`. Gaya **Season 3**: Aksa (maskot ASCII), Selam Detail, Foto Jadi Ruang (komponen `kit/s3.js`).

## Brief Ikhsan (2026-11-20)
- "garap video ini … teknik style baru season 3 … aksa maskot narator, tidak muncul terus … sfx aksa-sfx + new-sfx … bikin full semua bab sekaligus, di akhir gue cek di Studio".
- Naskah + aset Ahri: NARASI.md, assets/{kutipan,grafik,rockstar-resmi,cc,peta,vid,stok-situs}.
- VO Ahmad eleven_v4 sudah jadi: `audio/voiceover/gta_vo_ahmad_{01,03..09}` (tanpa 02).

## Keputusan
- Portal bab: "Peta Mini Waypoint" (`kit/portal.js`, minimap + rute lime ke pin bab berikutnya).
- Aksa ≤ 1× per bab, ≤ 4 s: peta (kaget "24 jam?!"), bab-1 cringe 212 GB, bab-2 mikir→sedih, bab-3 smug Spotify, bab-4 lompat Windah #1, puncak kaget→curiga Fire Stick, penutup dadah di CTA.
- Hit baru film ini: stk5, stk6, stk7 (tx/).
- Intro: struktur RNC "Satu Baris" versi ai-data-habis (leadT/tailT), hook = aerial malam Vice City → Deadline → Jason & Lucia "CUMA MAINAN", slab GTA 6, 3 bidang (SEHARI / SULIT DIPERCAYA / US$2,36 MILIAR · 24 JAM.), 6 baris sumber, judul diam "Cara Rockstar membangun MESIN UANG BERNAMA GTA 6". Label EPISODE dihapus (nomor episode = keputusan Ikhsan). Skor intro: pakai ulang ivs_score_intro (hemat kredit).
- Alat cek tanpa render: `tools/cek.py <bab> t… | --every N` → `build/cek/<bab>.jpg`.

## Bab
| Bab | VO | Durasi | Studio port | Status |
|---|---|---|---|---|
| intro | 01 | 47.7 | 8772 | dibangun + mix (cek still OK) |
| bab-peta | 03 | 44.2 | 8774 | dibangun + mix (Selam BIOSKOP→jam, Ruang MESIN UANG, peta Leonida 4 pin) |
| bab-1 | 04 | 185.2 | 8775 | SELESAI — siap cek Studio (0 error, mix OK; skyline dipakai 2×, 3 transisi buka gelap 0.1–0.5 s) |
| bab-2 | 05 | 123.15 | 8776 | SELESAI — siap cek Studio (0 error, mix OK) |
| bab-3 | 06 | 123.3 | 8777 | SELESAI — siap cek Studio (0 error, mix OK; klip klub ±80 s ada logo merek, hit ldr1 88.3 putih sesaat) |
| bab-4 | 07 | 181.3 | 8778 | SELESAI — siap cek Studio (0 error, mix OK; catatan: box S15 gelap, paket 212 GB kecil) |
| puncak | 08 | 84.2 | 8779 | SELESAI — siap cek Studio (0 error, mix OK; highlight BBC belum pas) |
| penutup | 09 | 40.9 | 8780 | SELESAI — siap cek Studio (0 error, mix OK; frame lime 0.0 = portal masuk kit) |

## Catatan terbuka
- Intro 6.5 s: "HOLLYWOOD" sedikit menimpa ujung judul Deadline (2 huruf).
- Hook cut-out papan Vice City (birefnet) bolong → diganti foto aerial malam; file lama di `intro/assets/hook/_lama/`.

## Revisi 1 (Ikhsan 2026-11-21: "benerin 7 catatan" + Aksa tak kelihatan + rupiah)
- **Aksa v2** (`kit/s3.js`, backup `.bak-20261121-aksa`): stay 5.5–7.5 s, s .75–.85, kedip otomatis, 2–3 ganti muka + say-line; say-line pindah ke atas kepala kalau mentok kanan; `tag` hanya di bab-peta ("AKSA · TEMAN NONTON KAMU"). 2× di bab ≥120 s (bab-1/2/3/4), 1× di peta/puncak/penutup.
- **Rupiah di layar (tidak diucap)**: kurs JISDOR BI 17 Nov 2026 Rp18.264/US$ (sumber kontan + databoks 12 Nov 2026). Format "≈ Rp43,1 triliun", ivory/abu (bukan lime), 0.3 s setelah angka US$, ≥2 s. Baris kurs 1× per stasiun.
  - intro: caption layar tetap kanan atas (23.4–26.2), Deadline h 172 (HOLLYWOOD lepas) · peta: counter Rp ikut US$ · bab-2: Rp144 miliar · bab-3: Rp36,5 T di headline Deadline · bab-4: Rp1,46 juta.
- Catatan 4 (logo klub, bab-3): hanya 15 frame bersih dipakai. Catatan 5 (box bab-4): diterangi + label "BOKS FISIK GTA VI".

## Berikutnya
0. Revisi 1 DONE 2026-11-21: 7 catatan + Aksa v2 + rupiah, semua bab 0 error + mix ulang, kit fix muka bangun (backup `kit/s3.js.bak-20261121-wake`). Usulan sisa: bab-1 176.8 klip logo di belakang 98 masih ramai (dim .74→.8); puncak 28–31 tanda "!" Aksa menimpa thumbnail S3; puncak S3 "US$5 JUTA" kini masuk 0.6 s sebelum diucap (perlu OK Ikhsan). MENUNGGU cek Studio Ikhsan.
1. DONE 2026-11-21 01:40 — semua bab 0 error + mix, 8 Studio nyala (8772, 8774–8780). Usulan perbaikan kecil di laporan: bab-1 166–169 teks Aksa "// tidak muat" mepet tepi kanan; bab-1 172 kartu 99 menimpa "hasil kerja keras itu"; bab-1 157–161 frame kosong ±3.5 s sebelum 212 GB.
2. Setelah OK Ikhsan: `sh tools/render_safe.sh` (render utama saja), captions.
3. Ledger: DONE 2026-11-21 (selam-detail-dive, foto-jadi-ruang, peta-mini-waypoint-portal, leonida-waypoint-flight, hits-stk5-7). Panen pustaka saat delivery.
4. Odoo: tanya project untuk catatan sesi; edig-prd (dokumentasi) setelah delivery.

## Render master 2026-11-21 — DONE 13:09
- out/cara-rockstar-bikin-gta-6_v1.mp4 (13:49, 1920×1080, 24 Mb/s) + build/captions_full.srt (211 cue). Fix: bab-4 film.js:401 arc radius Math.max(0,…) (backup .bak-20261121-render). Belum review/QA (tanya Ikhsan).
