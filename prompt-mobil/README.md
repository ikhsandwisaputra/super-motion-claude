# Prompt mobil — semua sudut, satu kualitas

Satu file = satu sudut kamera. Semua file dibangun dari blok yang sama di `buat.py`
(studio, kunci bentuk, komposisi 9:16, negative), jadi setiap hasil generate punya dunia,
cahaya, dan level yang sama.

## Kenapa tiap sudut butuh gambar awal sendiri
Dari satu foto depan, AI tidak tahu bentuk belakang atau samping mobil — kalau kamera
disuruh muter, AI mengarang dan bentuknya berubah. Jadi "lihat dari segala sisi" dibuat
dengan cara: **gambar diam per sudut dulu (Langkah 1), baru dianimasikan pelan (Langkah 2)**,
lalu dipotong-sambung di editor/motion. Hasilnya terasa seperti kamera mengelilingi mobil,
tanpa mobilnya meleleh.

Paling aman: kalau ada **foto asli mobil dari sudut itu**, pakai foto itu sebagai gambar awal
(Langkah 1 cukup untuk mindahin ke studio).

## Urutan kerja
1. `01-depan-3-4-kiri.md` dulu. Generate gambar awal sampai benar-benar mirip.
2. Pakai hasil 01 (plus foto asli) sebagai **referensi** untuk gambar awal sudut lain.
   Kalau tool-nya punya seed, pakai seed yang sama.
3. Video tiap sudut: gambar awal → prompt Langkah 2. Generate beberapa kali, simpan yang lolos cek.
4. Transisi (13, 14) terakhir, setelah gambar awal kedua sudutnya sudah jadi.
5. Isi negative prompt dari `00-negative.md` di setiap generate.

## Daftar file
| File | Sudut | Untuk apa di film |
|---|---|---|
| 01 | Depan 3/4 kiri | hero, referensi semua sudut |
| 02 | Depan lurus | angka besar simetris |
| 03 / 04 | Samping kiri / kanan | callout panjang, "kamera menyeberang" |
| 05 | Belakang 3/4 kanan | sayap + diffuser |
| 06 | Belakang lurus | penutup |
| 07 | Low angle | gagah |
| 08 | Atas | peta untuk blueprint |
| 09–12 | Macro lampu, velg, sayap, karbon | detail mewah 1 detik |
| 13–14 | Transisi start→end frame | busur kamera antar sudut |

## Ganti mobil
Ubah `MOBIL` dan `WARNA` di `buat.py`, lalu jalankan:

```
python3 /home/ikhsands/Proyek/super-motion-claude-ikhsan/prompt-mobil/buat.py
```

Semua file sudut ditulis ulang otomatis. Prompt ini **mendeskripsikan** mobil tanpa
menyebut merek, supaya AI tidak menempelkan logo palsu.
