# ai-data-habis — STATE (fase: brief + plan) · video 3 long-form

Long-form 16:9 Indonesia. Template `aset/_template-longform` disalin ke folder ini 2026-11-15 dengan
`rsync --ignore-existing` (folder sudah berisi kiriman Ahri, new_film.sh menolak folder yang ada). Playbook: skill `studio-global`.

## Brief Ikhsan
- Topik: "Kalau Data Manusia Habis, AI Belajar dari Mana Lagi?" — BRIEF.md + NARASI.md + PERSETUJUAN.md dari Ahri (15 Nov).
  Permintaan Ikhsan: dampak AI belajar dari AI (Bab 4) wajib tuntas.
- Penonton: awam sampai lansia · edukasi · naskah 13.232 karakter VO → perkiraan ±14 menit (target Ahri 720 s).
- Aset Ahri: assets/kutipan (35), assets/grafik (2), assets/stok-situs (video/musik/SFX). Semua path di NARASI ada di disk.
  13 elemen "belum ada: dibuat studio" → dibuat di kode / Ahpo.

## Keputusan
- VO: Ahmad, **eleven_v4, setelan default ElevenLabs** (WAJIB, Ikhsan 15 Nov) · prefix `adh` (film.json).
- Musik: pakai punya video 1/2 (hemat, Ikhsan 15 Nov): intro `audio/music/ivs_score_intro.mp3`, bed `voxscape`. Tanpa skor baru.
- Kerja sama Ahri/Ahpo: LANGSUNG di sesi (bukan Telegram/tim.py), Ikhsan 15 Nov. Permintaan tetap ditulis ke PESAN-*.md.
- Kredit ElevenLabs 15 Nov: 26.819 / 40.000 terpakai → sisa 13.181. VO ±13,2 rb karakter × ±0,4 ≈ 5,3 rb kredit (cukup).
- Tema + ide visual DISETUJUI (Ikhsan 15 Nov "gassss semuaa, odoo nanti"): T1 "ASLI atau SALINAN?"; headline
  Salinan Pudar + Mata Mesin/ASCII (wajib tes 3 detik), Sumur Huruf + Jangkar sebagai alat bab; portal Garis Pindai;
  hit baru handwriting + grunge; kredit VO OK; durasi apa adanya (±14 menit). Odoo: nanti.
- VO (15 Nov, eleven_v4 default, SEMUA JADI): 01 45,4 · 03 45,2 · 04 111,1 · 05 127,5 · 06 138,4 · 07 267,8 · 08 98,2 ·
  09 32,4 · 10 36,6 s → total ±902 s (±15 menit + portal). Tes Salinan Pudar = VO 07 5,16–13,28 s.

## Bab (rencana, ikut NARASI)
| Bab | VO | Studio port | Status |
|---|---|---|---|
| intro (Hook) | 01 | 8791 | DISETUJUI 15 Nov ("mantabbbbb lanjutkannnn") |
| bab-peta | 03 | 8792 | DISETUJUI 15 Nov ("udah gue cek, oke") |
| bab-1 Benarkah habis? | 04 | 8793 | DISETUJUI 15 Nov ("udah gue cek, oke lanjut bab-2") |
| bab-2 Dipagari, dijual | 05 | 8794 | DISETUJUI 15 Nov ("mantabbb lanjutkann") |
| bab-3 Tiga jalan keluar | 06 | 8795 | di Studio, menunggu cek |
| bab-4 AI belajar dari AI | 07 | 8796 | di Studio, menunggu cek (catatan: bab-4/STATE-BAB.md) |
| bab-5 Indonesia | 08 | 8797 | di Studio, menunggu cek (catatan: bab-5/STATE-BAB.md) |
| puncak | 09 | 8798 | di Studio, menunggu cek (agen kena limit setelah nulis film.js; cek frame + mix + Studio diselesaikan Ahtor) |
| penutup | 10 | 8799 | di Studio, menunggu cek (catatan: penutup/STATE-BAB.md) |
film.json `chapters` belum diubah (masih kerangka template 7 bab) — sesuaikan saat bab dibuat.

## Tes 3 detik
- tes-salinan/ (Salinan Pudar, VO 07 4,70–13,40 s, 9,4 s): kartu resep tulisan tangan (font OFL Caveat + Reenie Beanie,
  sementara sampai foto H2 Ahri) → 10 generasi dihitung sungguhan (blur + kurva toner per piksel + bintik + geser),
  kaca berderet di Z, bar pindai menyapu sumber & salinan, kamera 0→1→3→10 lalu cut-in pojok; hantu tanda tangan lime
  pada "ilang". Mixer: f:nama:durasi:mulai + VOFF negatif (juga masuk template). Studio http://127.0.0.1:8790 → tunggu cek Ikhsan.
  → DISETUJUI Ikhsan 15 Nov ("udah gue cek, oke lanjut tes mata mesin"); ledger salinan-pudar-generasi = liked.
- tes-mata/ (Mata Mesin, VO 04 7,30–16,08 s, 9,5 s, K=1): papan desa B3_1 (Latin + aksara Jawa) disapu kolom pindai →
  glyph bentuk-vektor R5 (sel 12×20, Space Mono) → 6 kotak token + 11 potongan aksara, kursor lime T01→T04 (KALUR/AHAN);
  "AI" whip ke warung B1_2 (smear manual), dimakan blok 120×75 urut baca (pelan → ngebut), kotak lime "Nasi goreng" pada
  "nasi", foto balik dalam 3 gigitan "per suap". Sumber mesin: papan = tinta dibalik; warung = coretan lebih gelap dari
  sekitarnya + kontur. Mixer baru: `VOCUT` (potong take di tengah, juga di template). Studio http://127.0.0.1:8789 → tunggu cek.
  → DISETUJUI Ikhsan 15 Nov ("gokilll niatt sih inii lanjuttt"); ledger mata-mesin-ascii-token = liked. Lanjut intro.

## Intro (15 Nov)
- Template RNC "Satu Baris" diadaptasi: EP baru di intro/src/film.js (hook notif fiktif → The Verge Sutskever → Epoch AI,
  twist "TAHUN INI.", 3 pertanyaan, disclaimer sumber riset, judul "AI BELAJAR / DARI MANA LAGI?", EPISODE 03).
  place.py cari kata per teks (tag eleven_v4 dibuang), leadT/tailT per item. Gambar: intro/assets/hook/{notif,verge,epoch}.png
  (notif dari notif.src.html, Plus Jakarta Sans). Backup: *.bak-ivs.
- Musik: ivs_score_intro offset 12 s (hit di "TAHUN INI", drop di disclaimer, habis pas dive-out) + pre-roll skor 0,4 s → 16 s
  (film.json score_pre). Mix: VO RMS -16,5, peak -1,8 dBFS. Studio http://127.0.0.1:8791.

## Tim
- Ahri SELESAI 15 Nov: 18 foto Wikimedia di assets/humanis/ (H1–H3, B1–B3, sidecar .jpg.json, kredit di KREDIT-KONTEN.md).
  Lemah: H1 (tangan+HP Indonesia) praktis kosong, H2 tanpa tulisan Indonesia, B2 resep cuma Inggris. Kunci Pexels/Pixabay/Unsplash belum ada.
- Ahpo SELESAI 15 Nov: A01 hook, A02 ekor bahasa (8), A03 perpustakaan digembok (review 84), A04 kolase Bab 5 (review 96),
  A05 tekstur toner (4) → assets/ahpo/ + LAPIS.md. Catatan: wajah orang biasa di A01-3 & A04-3 (pakai kecil); lambang Pemkot
  di A04-6; pagar = jaring ambientCG (bukan chain-link); kredit CC BY/BY-SA di KREDIT-KONTEN.md.

## Berikutnya
1. Ikhsan pilih tema + ide (KARTU-GAYA.md) + OK kredit VO.
2. VO eleven_v4 per bab (`intro/tools/tts.py --model eleven_v4`, punya timestamps) → align → words.py.
3. Tes 3 detik: Salinan Pudar + Mata Mesin (Studio) → OK → intro → bab.
4. Odoo: tanya project untuk catatan sesi (AI Bubble: Ikhsan "gk usah").

## Bab Peta (15 Nov)
- 8 stasiun: badge Sutskever + kerumunan → layar NeurIPS → tetes huruf "minyak bumi" → The Verge (crop judul, kutipan diketik
  EN + markLine ID) → sumur → grafik dibangun ulang dari grafik.json (lime cuma potongan 1/10) → peta 5 ubin (mapCam wide 3520,
  centre 130) → B-roll ketik + kartu unggah warung.
- Hits: hw1 (dia), gr1 (grafik), stk2 (divideo; oranye sekilas = paket Indo vs AS), gr2 (termasuk; ganti shD yang oranye).
- Hit baru di tools/tx_lib.py: hw1–3 (handwriting), gr1–3 (grunge, grayscale). Klip baru tools/vid_frames.py: ketik, ketik2,
  server3, kabel3, gembok, gerbang, cetak, robot, anak_tunjuk, go, digital, macro, kereta, tenang.
- Studio http://127.0.0.1:8792 → tunggu OK. Berikutnya bab-1 (VO 04, 8793, Mata Mesin dari tes-mata).

## Portal = Garis Pindai (15 Nov, Ikhsan: "transisinya jangan qrcode lagi cari yang lain")
- kit/portal.js ditulis ulang (backup kit/portal.js.bak-qr): OUT batang pindai kiri→kanan, di belakangnya salinan toner
  (abu, kontras, geser seed, bintik) → dipipih jadi garis lampu lime; IN garis membuka jadi pita bab baru, batang kedua
  memindai salinan → asli. Seed IN = seed-1 (cocok dengan OUT bab sebelumnya). portal_sfx.py: pop kartu → desis pindai
  (backup .bak-qr). bab-peta/src/portal.json diset manual inn/out true; jalankan `tools/film.py sync` saat semua bab ada.

## Bab 1 — Benarkah Habis? (15 Nov, VO 04, 112.3 s, Studio 8793)
- `bab-1/src/film.js` + `beats.js`: 12 station. Urutannya: server opener → jendela Mata Mesin (K=1, potong di MATA0/MATA1) → pretraining → sekolah/word river → Epoch 300 T (angka bertekstur huruf) → arXiv (hl "estimate the total stock of public human text data.") → grid 300 sel dimakan 15/30/36 + ±1/10 → linimasa 2026–2032 + pin KITA DI SINI → habis ≠ lenyap (blog 2009) → dinding STOK → rak 14 kitab santri → Dwarkesh (parafrase, bukan kutipan) → pagar.
- 2 evidFull Epoch (hl 300 T, lalu "between 2026 and 2032,"). Portal masuk/keluar = Garis Pindai (portal.json inn/out true, seed 3).
- Mix: 76 SFX, 5 hit, bed voxscape; VO RMS -20.9, musik -37.2, peak -4.2 dB.
- Status: DISETUJUI 15 Nov. Belum render penuh (render penuh setelah semua bab OK).
- Berikutnya: bab-2 (VO 05, port 8794).

## Bab 2 — Dipagari, Dijual (15 Nov, VO 05, 127.5 s, Studio 8794)
- `bab-2/src/film.js` + `beats.js`: 18 station. Urutannya: tulisanmu + label harga MILIARAN → browser robots.txt yang diflip jadi papan di pagar (BOLEH MASUK / DILARANG) → robot penyedot (klip digital) → arXiv Consent in Crisis + C4 → grafik 5 % / 28 %+ digambar ulang (isi tekstur huruf, gembok jatuh) → perpustakaan Ahpo A03 (4 lapis parallax, pagar kawat jatuh, gembok slam) → JULI 2025 + evidFull Cloudflare + gerbang yang memantulkan chip bot → dialog situs baru (toggle MATI) + blog pay per crawl → pagar membuka jadi LOKET DATA (signature) → Reddit (The Star) + struk ±US$60 JT → buku + DIGUGAT → dua kolom hakim → US$1,5 bertekstur huruf PECAH jadi US$3.000 per karya + TechCrunch (abu-abu) → hujan kata ke bak + meteran token → Tempo (hl per nama) + Sahabat-AI → GoTo hl → komentar + label Rp ??? + DIJAWAB DI BAB 5 → klip gembok + pagar naik + 3 jalan keluar.
- Teknik baru di bab ini: pagar→loket, hujan kata + meteran, angka yang pecah.
- Bed = musik Ahri "Tutorial Explainer" (pixabay 632759), bukan voxscape. Semua aset Ahri terpakai: 7 artikel, klip digital/gembok (+kabel3), 5 SFX stok (digital-sound dipasang di "robot").
- Tanggal TechCrunch: halamannya 20 Jul 2026, NARASI menulis 21 Jul. Di layar tertulis "Juli 2026" + srcTag 20 Jul 2026.
- hl Tempo dan GoTo diukur ulang dengan crop penggaris.
- Mix: 102 SFX, 5 hit; VO RMS -20.6, musik -37.3, peak -3.6 dB.
- Status: DISETUJUI 15 Nov ("mantabbb lanjutkann"). Belum render penuh.
- Berikutnya: bab-3 … penutup dibangun sekaligus (Ikhsan 15 Nov: "kerjain barengan sekaligus semua nya full jadi gue tinggal cek studionya aja"). bab-3 dikerjakan Ahtor langsung; bab-4, bab-5, puncak, penutup oleh 4 agen paralel (catatan masing-masing di `<bab>/STATE-BAB.md`). Render cek antre lewat flock `scratchpad/render.lock`.

## bab-3 Tiga jalan keluar (VO 06, 8795)
- `bab-3/src/film.js` + `beats.js`: 19 station, dunia TERANG (kit `theme(true)`). Urutannya: nyontek dicoret → peta tiga jalan → AI ngajarin AI (robot guru nulis soal, lembar pindah ke robot murid, SINTETIS) → Phi-4 arXiv + bar murid nyalip guru ("ilustrasi, bukan skor") → AI Index 2026 + cap BELUM ADA BUKTI KUAT → AI belajar sendiri (RL) → sepeda jatuh/coba lagi/berhasil, senyum jadi koin +1, BENER/SALAH → AlphaGo Zero (klip go + Nature, CONTOH MAIN MANUSIA dicoret) → papan split-flap 100 : 0 → DeepSeek-R1 Nature → AMPUH BANGET buat soal PASTI (17×3, assert) → tangga mentok plafon BEKAL MODEL DASAR (Yue dkk.) → Era of Experience (TERBATAS / NGGAK.) → jalan ketiga dunia nyata (klip robot) → Michael Frank Stanford + klip anak → menara buku GPT-3 tilt-up vs satu buku tipis → ±33.000 (angka berisi kata) × → minta susu → rekap: satu pertanyaan gede → robot membaca tulisan robot, layar meredup, TULISAN AI?
- Teknik baru: **drawOn** (kontur tiap huruf digambar serentak lewat dash per kontur, lalu tinta naik dari baseline), papan split-flap, menara buku tilt-up. Helper bab ini sendiri (robot/sepeda/flap pakai INK), kit tidak diubah.
- Aset Ahri terpakai: 6 kutipan (arXiv Phi-4, AI Index, Nature AlphaGo, Nature DeepSeek, Era of Experience, Stanford Frank) + klip go/robot/anak_tunjuk.
- Mix: 78 SFX, 5 hit; VO RMS -20.5, musik -37.3 (bed tutorial-explainer ss 40, trek 202 s cukup), peak -3.9 dB. Durasi 140.2 s.
- Dicek: 40 frame diam (31 per stasiun + 9 drawOn/rekap). Diperbaiki: teks rekap pindah ke atas (tadinya ketabrak garis jalur), "cuma sekitar" → "cuma segini.".
- Status: di Studio, MENUNGGU cek boss. Belum render penuh.


## 15 Nov malam: semua bab DISETUJUI Ikhsan, kecuali peta Indonesia bab-4
- Catatan Ikhsan: peta Indonesia bab-4 "hancur, gak mirip". Diperbaiki: elips buatan diganti peta asli Wikimedia
  (Indonesia blank map.svg, CC BY-SA 3.0) → 1615 titik di bab-4/src/peta.js (backup st2.js.bak-20261115-peta).
  4 frame cek di bab-4/build/chk-peta. Menunggu Ikhsan cek ulang Studio 8796 (stasiun terakhir, ±4:25).
- Sesudah OK: film.py sync → render_safe.sh (render penuh).

## 15 Nov 23:15: RENDER PENUH v1 JALAN (Ikhsan OK semua bab + peta)
- Uji kering sebelum render: 9 bab × semua frame × 5 titik sub-frame (−.219/−.094/0/+.094/+.219) = 0 error, 0 pageerror.
- film.py sync dijalankan (portal Garis Pindai di 8 sambungan). Mulai `render_safe.sh` 23:15:48 (unit render-ai-data-habis).
- Hasil: out/ai-data-habis_v1.mp4 + build/captions_full.srt. Progres: build/render_full.status.
- Tidak ada yang memantau setelah sesi Claude berakhir; unit coba ulang sendiri 5×. Cek: systemctl --user status render-ai-data-habis
- 16 Nov 01:59: RENDER v1 SELESAI. out/ai-data-habis_v1.mp4 (15:22.43, 1920×1080, h264 16 Mb/s, AAC 48k, 1,88 GB),
  loudnorm −14,4 LUFS / −1,5 dBTP, portal sfx di 8 sambungan. Satu batch bab-5 (fr 2872) gagal sekali (GPU spike → CPU,
  "Failed to fetch"), lolos di percobaan ulang. captions_full.srt (282 cue) ditulis ulang manual 02:00 (pass otomatis tidak menulis file).
  Belum: eye.py / motion-qa-review / dengar mix / tonton penuh (tunggu Ikhsan).
