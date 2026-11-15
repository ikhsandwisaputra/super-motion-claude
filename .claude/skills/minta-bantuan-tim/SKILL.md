---
name: minta-bantuan-tim
description: Minta bantuan rekan setim (🔎 Ahri riset+naskah, 🎨 Ahpo poster/PhotoCraft, 🎬 Ahtor motion, 📺 Ahyu ahli YouTube) lewat topik "Work as a Team" di grup Telegram Ikhsan. Gunakan SETIAP KALI tugasmu butuh keahlian rekan lain — mis. Ahri butuh poster dari Ahpo, Ahpo butuh naskah/fakta dari Ahri, Ahtor butuh aset dari Ahpo, siapa pun butuh angka channel dari Ahyu — alih-alih mengerjakan di luar keahlianmu atau menyuruh Ikhsan menyampaikan pesan. Ikhsan menyetujui tiap permintaan dengan satu tombol dan membaca percakapannya di topik itu.
---

# Minta bantuan rekan setim

Tim: **🔎 Ahri** (`ahri`, riset + naskah) · **🎨 Ahpo** (`ahpo`, studio poster) · **🎬 Ahtor** (`ahtor`, studio motion)
· **📺 Ahyu** (`ahyu`, analis + pengunggah YouTube). Ikhsan = direktur kreatif; setiap permintaan lewat mejanya.

## Cara

Jalankan lewat Bash dengan **timeout 600000** (permintaan menunggu tombol Ikhsan + rekan bekerja):

```bash
/home/ikhsands/Proyek/PEMROGRAMAN/chatbot-telegram/tim.py minta <id-kamu> <id-rekan> "<permintaan>"
```

Contoh (kamu Ahri, butuh poster):

```bash
/home/ikhsands/Proyek/PEMROGRAMAN/chatbot-telegram/tim.py minta ahri ahpo "Poster 1080x1350 untuk video 'AI di sawah'. Naskah: /home/ikhsands/Proyek/asisten-agi-claude/draft/naskah-03.md. Butuh 2 varian judul besar, warna gelap. Kembalikan path PNG."
```

- **Isi permintaan**: apa yang dibutuhkan, path file sumber (lengkap), format/ukuran hasil, dan apa yang harus
  dikembalikan. Rekan tidak melihat percakapanmu — tulis seolah memberi brief ke orang baru. Detail panjang → tulis ke
  file dulu, kirim path-nya (maks 3000 karakter).
- **Keluaran**: jawaban rekan tercetak di stdout. Kode 0 = ada jawaban · 1 = ditolak Ikhsan/gagal (jangan paksa lewat
  jalan lain; lanjutkan tanpa bantuan itu atau tanya Ikhsan) · 2 = belum selesai → lanjutkan bagian lain, lalu ambil
  dengan `tim.py hasil <id>` (juga timeout 600000).
- **Satu permintaan, satu kebutuhan.** Jangan minta untuk hal yang bisa kamu kerjakan sendiri dengan cepat — tiap
  permintaan memakai kuota Ikhsan dan butuh klik persetujuannya.
- Kalau kamu sendiri **sedang membantu rekan**, kamu tidak bisa meminta bantuan lagi (tim.py akan menolak). Sebutkan
  di jawabanmu siapa yang perlu dilibatkan.
- **File**: kirim file ke rekan dengan menyebut path lengkapnya di permintaan. Gambar/video/audio/PDF yang path
  lengkapnya disebut di jawaban (dan ada di folder asisten) otomatis tampil sebagai lampiran di topik.
- Jangan masukkan rahasia (token, password, key) atau data klien ke permintaan — isinya tampil di grup Telegram.
