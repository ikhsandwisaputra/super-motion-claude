# STATE: pustaka kode (2026-11-16)

## Keputusan
- `aset/_pustaka` menyimpan kosakata visual. Pipa produksi tetap di `aset/_template-longform`.
- Ada tiga lapis: ciri, alat, bintang. Bintang kena cooldown 2 film. Tiap film wajib menyumbang ≥ 1 bintang baru, ≥ 2 hit baru, dan portal bab sendiri.
- Film lama tidak disentuh. Film baru mendapat snapshot `kit/pustaka/` lewat `new_film.sh` (`pustaka.py pakai`).
- Larangan ada di `register.json`: QR ("jangan qrcode lagi"), film-burn (jadul), dan light-leak (cek dulu).
- Template sudah di-backup sebelum diubah: `aset/_arsip/template-longform-20261116-sebelum-pustaka.tgz`. Template tidak masuk git, jadi tgz ini satu-satunya jalan rollback.

## Sudah
- `tools/pustaka.py` punya perintah index, cari, lihat, pakai, panen, segar, dan cek. Uji e2e di scratchpad lolos: `new_film.sh` membuat snapshot dan symlink per bab, lalu rangka bab dirender di detik 1,5, 5, dan 9.
- `js/dasar.js` dan galeri dasar + hits selesai. Lembar `galeri/lembar/dasar.jpg` dan `galeri/lembar/hits.jpg` sudah dilihat.
- Template:
  - kit = superset adh
  - hit hw1–3 dan gr1–3 (total 15)
  - mixer: loop + crack
  - tts eleven_v4
  - intro mix = adh
  - `align_local.py`
  - `new_chapter.sh` membuat symlink pustaka
  - `film.js` import dari kit
  - README: QR pensiun
- Dokumen yang diperbarui:
  - studio-global SKILL §0 dan §5
  - register standar-kasta-tinggi
  - CLAUDE.md hukum 11 (sub-bullet code vault, QR pensiun)
  - memori `pustaka-kode.md`
- Ledger mendapat 5 teknik adh berstatus experimental.

## Panen selesai (2026-11-16)
- 136 entri, 11 modul, 26 file js, 114 demo galeri. `pustaka.py cek` = 0 galat, 0 peringatan.
- Rincian: prop 32, tipo 13, ui 11, penutup 4, data 16, peta 7, efek 23, bintang 3, portal 3, hits 15, dasar 9.
- INDEX.md ≈ 5,1 rb token. Itulah yang dibaca di G0 sebagai ganti kode 3 film.
- Lembar: `galeri/lembar/*.jpg`. Saya melihat prop, efek, hits, dan dasar; lembar lain dilihat oleh agen.
- `cek` sekarang membaca baris `// demo-ids:` untuk id demo yang dibuat lewat loop (g_hits.js).

## Catatan terbuka
- Lisensi `peta.petaTitik` CC BY-SA 3.0, jadi KREDIT wajib tampil di layar.
- Font Plus Jakarta Sans belum dimuat di `galeri/src/index.html` (lembar notif mungkin fallback).
- Usulan helper untuk dipindah ke dasar: kick, teksTengah, badan, jalurOrang, tween, rounded-rect/cursor/UIF, sst.
- `prop.gerobak` memakai stiker QR sebagai benda cerita, bukan portal QR yang dilarang.

## Berikutnya
3. Lapor ke Ikhsan.
4. Draf log Odoo IDS-DEV: tanya project dulu, tulis hanya setelah dia bilang "ya".
5. Dokumentasi edig-prd belum dikerjakan.
6. Usulan Standar Kasta Tinggi masih menunggu OK Ikhsan.
