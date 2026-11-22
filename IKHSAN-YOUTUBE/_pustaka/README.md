# Pustaka kode Super Motion (`aset/_pustaka`)

Ini gudang komponen yang dipanen dari film yang sudah tayang. Tujuannya film baru tidak mulai dari nol (hemat token, produksi lebih cepat) tapi tetap terasa segar.
Template (`aset/_template-longform`) menyimpan *pipa produksi*: kit, mixer, render, intro, portal. Pustaka menyimpan *kosakata visual*: props, UI sim, chart, peta, tipografi, efek, dan teknik bintang.

## Tiga lapis (supaya cepat tanpa jadi template)
| Lapis | Isi | Aturan |
|---|---|---|
| **ciri** | DNA channel di kit template: row kedalaman, lime satu kata, label mono, kartu bukti + stabilo, hit tx, intro RNC, subscribe | selalu ada; tiap film geser **satu sumbu** (warna dunia, lensa, ritme) |
| **alat** | komponen kerja: gembok, label harga, browser, chart, peta titik, papan… | bebas dipakai ulang, **wajib di-restyle** per film (warna, material, gerak, komposisi) |
| **bintang** | teknik headline satu film: Gelembung Pecah, Salinan Pudar, Mata Mesin, Retak Layar, portal… | **cooldown 2 film**: di 2 film berikutnya hanya boleh muncul sebagai beat kecil atau remix, bukan headline |

Setiap film **wajib menyumbang ≥ 1 bintang baru** (lihat `panen`). Pustaka membesar, film tetap baru.

## Alur per film
1. **G0 (kartu gaya):** baca `INDEX.md`, bukan kode film lama, lalu jalankan `pustaka.py segar`. Hasilnya: bintang yang masih cooldown, hit tx dan paket `_transisi` yang belum pernah dipakai, dan alat yang terlalu sering muncul.
2. **Mulai:** `new_film.sh` menyalin pustaka ke `aset/<slug>/kit/pustaka/` sebagai snapshot. Film lama tidak berubah saat pustaka diperbarui. Bab baru (`tools/new_chapter.sh`) dapat symlink `src/pustaka`.
3. **Pakai:** di `film.js` tulis `import { gembok } from './pustaka/prop.js';`. `pustaka.py lihat <id>` memberi tanda tangan dan opsinya; `galeri/lembar/<modul>.jpg` menunjukkan bentuknya.
4. **Ide baru** ditulis di film dulu. Jangan mengedit pustaka di tengah produksi.
5. **Delivery:** `pustaka.py panen <slug>` mendaftar fungsi baru atau yang berubah. Yang layak masuk pustaka digeneralisasi, diberi demo galeri dan entri katalog, lalu dicatat di ledger (`ledger.py add`) dan register.

## Aturan kode modul (`js/<modul>.js`)
- Import hanya dari `../kit.js`, `../draw.js`, `../engine.js` dan modul pustaka lain (`./dasar.js`). Kit menyediakan `DSP SRF MN HND addF still gateStations theme INK CARD …`; versi kit minimal 2026-11-16.
- Bentuk tanda tangan `fn(ctx, x, y, …ukuran, t, t0, o = {})`: unit lokal stasiun, berpusat di (x, y). Gerak dihitung dari `(t, t0)`. `o` dipakai untuk restyle (`col`, `lime`, `ink`, `a`…).
- Hormati alpha yang masuk (gate stasiun): `const a0 = ctx.globalAlpha; … ctx.globalAlpha = a0 * k`. Jangan pernah mengisi alpha mutlak.
- Deterministik: pakai `rnd(seed)`. Tidak boleh ada `Math.random()` atau jam, karena worker render menggambar frame acak.
- Tidak boleh ada closure ke data film (beat `A.*`, `IM.*`, konstanta film). Gambar, waktu, dan teks masuk sebagai parameter.
- Warna default diambil dari kit yang sadar tema (`INK`, `CARD`, `CARD_INK`, `LIME`). Lime hanya untuk satu aksen.
- Ribuan primitif digambar sebagai satu path. Tekstur berat di-cache per parameter (Map dengan kunci string).
- Satu baris komentar di atas tiap export: apa yang terlihat, opsinya, dan `asal: <film> <bab>/src/<file>:<baris>` (ditambah `ledger: <id>` kalau ada).

## Galeri (`galeri/`)
Galeri ini bab sungguhan: kamera, DOF, grain, dan vinyet sama dengan film. Satu demo = satu stasiun 3,2 detik. Demo hanya memakai gambar prosedural (`dummyFoto`), tidak pernah foto klien atau stok.
- Lembar kontak: `.venv/bin/python -I aset/_pustaka/galeri/tools/sheet.py --g prop` → `galeri/lembar/prop.jpg`
- Strip gerak satu demo: `… --g prop --id prop.gembok --strip`
- Live: `src/index.html?g=prop&play=1`, atau Motion Studio dengan folder `aset/_pustaka/galeri`.
- Bagian galeri = `galeri/src/g_<nama>.js` (contohnya `g_dasar.js`): `{ modul, light?, load(IM), demos: [{ id, judul, hold?, hit?, draw(ctx, t, t0, IM) }] }`.

## Katalog
`katalog.d/<modul>.json` berisi array entri. `pustaka.py index` menggabungkannya menjadi `katalog.json`, `INDEX.md`, `RESEP.md` (penunjuk stasiun utuh di film yang sudah tayang), dan `galeri/src/sections.js`.

```json
{ "id": "prop.gembok", "nama": "gembok", "file": "js/prop.js", "tier": "alat",
  "lihat": "gembok garis, bisa terbuka", "panggil": "gembok(ctx, x, y, s, t, t0, o)",
  "asal": "ai-data-habis bab-5/src/film.js:170", "film": ["ai-data-habis"], "ledger": "", "tag": ["kunci", "akses"],
  "catatan": "o.open 0..1 membuka kait" }
```

## Perintah
`.venv/bin/python -I aset/_pustaka/tools/pustaka.py <cmd>`

| cmd | guna |
|---|---|
| `index` | bangun ulang `katalog.json`, `INDEX.md`, `RESEP.md`, `sections.js` |
| `cari <kata…>` | cari di id, lihat, tag |
| `lihat <id>` | entri + komentar dan tanda tangan dari kodenya + status ledger |
| `pakai <slug> [--portal <nama>]` | snapshot pustaka ke film, symlink di tiap bab, salin portal pilihan |
| `panen <slug>` | yang dipakai film, fungsi baru atau berubah sebagai kandidat, pengingat ledger dan register |
| `segar [--film <slug>]` | kartu kesegaran untuk G0: cooldown bintang, hit dan paket yang belum dipakai, alat yang terlalu sering |
| `cek` | export ada, `node --check`, cakupan galeri, INDEX terbaru |
