# Template long-form — "Studio Teknologi Indonesia"

Dasar untuk setiap video panjang 8–15 menit, 16:9, bahasa Indonesia. Dibangun dari **Indo vs AS** (2026-11-14, master 12:07,
Ikhsan: "kesuksesan terbesar kita"). Semua yang sudah terbukti ada di sini, jadi film baru tidak mulai dari nol:
engine, kit bab, hit library, pengantar RNC "Satu Baris", Portal QR, mixer, caption, dan render aman.
Playbook kreatifnya ada di skill `studio-global` (tema, hook, gaya, kosakata station).

## Mulai film baru
```sh
sh aset/_template-longform/new_film.sh <slug> <vo-prefix>     # dari root workspace; contoh: ai-di-sawah ads
cd aset/<slug>
sh tools/new_chapter.sh bab-peta                                # satu per bab, urutan sesuai film.json
.venv/bin/python -I aset/<slug>/tools/film.py                   # tabel bab: VO, offset, durasi, frame
```
`new_film.sh` tidak pernah menimpa: kalau `aset/<slug>` sudah ada, ia berhenti.

## Alur (tiap fase ditutup dengan catatan di STATE.md)
1. **Brief → Ahri.** Ahri menulis riset + NARASI.md (`### Bab N`, Hook, Janji, Peta, Bab, Puncak, Penutup) + aset
   (kutipan/artikel, grafik, stok-situs). Semua angka harus bersumber. Pakai SEMUA aset Ahri; kalau ada yang ditinggal, tanya dulu.
2. **Tema 1 kalimat** (Indo vs AS = "PEMAKAI atau PENCIPTA?") + 2–3 ide visual khas film → Ikhsan pilih.
3. **VO Ahmad** (`film.json → voice`; eleven_v3), satu take per bab: `<prefix>_vo_ahmad_01..08`. Konfirmasi kredit ElevenLabs dulu.
   Lalu transkrip/align (`.align.json`, `.transkrip.srt`) → `tools/words.py 04 [t0 t1]` mencetak kata@detik.
4. **Pengantar** (`intro/`, RNC v2 "Satu Baris"): ganti `EP` di `intro/src/film.js`, `build/vo.txt`, foto hook
   `intro/assets/hook/{doc1,doc2,qr}.png`, lalu `tools/place.py` → `src/timeline.json` (indeks kata hook/pertanyaan
   ikut naskah baru). Skor intro (satu-satunya musik yang "nyetir"): `film.json → score_intro` + `score_off`; generate
   baru per film setelah Ikhsan setuju kredit. Mix: `intro/tools/mix.py` → `build/mix_full.wav`.
5. **Tes 3 detik** satu ide spasial (mis. "Jarak = Kedalaman") di Studio → Ikhsan OK → baru bangun bab.
6. **Per bab**: `src/beats.js` (waktu kata V, HITS, BED, SFX) + `src/film.js` (stations) → `tools/mix_chapter.py <bab>` →
   Studio (`tools/studio/studio.py aset/<slug>/<bab> --port 87xx`). Contoh lengkap di `contoh/`.
7. **Studio check WAJIB** sebelum render apa pun. Ikhsan bilang OK → render.
8. **Render penuh**: `sh aset/<slug>/tools/render_safe.sh` (systemd user unit, tahan OOM, lanjut sendiri, tidak tidur).
   Hasil `out/<out>_v<versi>.mp4` (−14 LUFS) + `build/captions_full.srt`. Render utama saja → tanya sebelum QA/share/reels.

## Peta file
| Path | Isi |
|---|---|
| `film.json` | satu config film: slug, nama master, pola VO, suara, bed, skor intro, urutan bab |
| `tools/film.py` | loader config; `film.py sync` menulis `<bab>/src/portal.json` (Portal QR masuk/keluar + seed) |
| `kit/kit.js` | `makeChapter`, `timing`, stations, `evid`, `evidFull` (artikel miring layar penuh + stabilo), `fall`, `markLine`, `srcTag`, `slab`, `txt`, `countTo`, `fmt` |
| `kit/draw.js` | prop line-art: kq, pop, doc, mini, bulb, phone, apps, chip, coin, stack, dotGrid, dotCity, stamp, slot |
| `kit/portal.js` | Portal QR antar bab (OUT .62 s dive ke modul lime, IN .5 s pintu persegi) |
| `tx/` | hit library: stk1–4 (light streak), cmc1–2 (komik, kunci ke lime), ldr1 (leader), shD/shE (shutter) + suaranya |
| `_chapter/` | kerangka bab (engine, index.html, render.py, starter beats.js + film.js 3 station) |
| `intro/` | pengantar RNC "Satu Baris" (spesifik film: `EP`, `build/vo.txt`, `assets/hook/`, `src/timeline.json`) |
| `contoh/` | film.js/beats.js asli Indo vs AS (bab-1, bab-peta, puncak, penutup + subscribe) — baca, jangan disalin mentah |
| `assets/stok-situs/` | bed bab tenang `mixkit-musik-voxscape-571.mp3` |
| `tools/render_full.py` | render resumable: batch frame + Chrome segar, watchdog GTT → CPU, encode per bab, concat, portal SFX, loudnorm 2-pass, caption |
| `tools/render_safe.sh` | jalankan render_full sebagai service (MemoryMax 9G, Restart=on-failure, inhibit sleep) |
| `tools/portal_sfx.py` | suara portal di tiap sambungan bab (pop, air naik, sub-thud, whoosh; tanpa nada) |
| `tools/captions.py` | SRT dari teks naskah + timing kata ElevenLabs → `build/captions_full.srt` |
| `tools/portal_finish.py` | hanya untuk film lama tanpa portal.json (portal ditempel setelah render); film baru tidak perlu |

## Pelajaran yang sudah dibayar (jangan diulang)
- **Gaya**: Vox + dokumenter + motion. Bukan PPT: tidak ada still > 4 s, kamera selalu bergerak di satu baris kedalaman.
  Lime `#C8F53C` satu-satunya aksen, satu kata lime per kalimat. Tidak ada look jadul (burn/sepia/proyektor) atau kertas.
- **Bukti**: artikel/kutipan masuk di awal shot dan terbaca ≥ 2 s; tiap angka ada `srcTag`. 4–6 artikel per film dibuat
  layar penuh miring + stabilo (`evidFull`) — itu yang "terasa mahal".
- **Musik**: skor nyetir hanya di intro. Bab = bed tenang (RMS ≈ −30 sebelum duck, duck 0.55, ~5 dB di bawah VO),
  diam sebelum punchline. VO ≈ −18 dB RMS. SFX tiap aksi UI (pop/click/travel/strike), **tanpa ting/bell/chime**, tidak per kata.
- **Hit `tx/`**: 4–5 per bab, di sambungan whip antar station, bervariasi, tidak spam.
- **Portal QR** antar bab menyambung 7 bab jadi satu film; suaranya diletakkan render_full otomatis.
- **Penutup**: kursor klik SUBSCRIBE → lime SUBSCRIBED ✓ + ripple, lalu lonceng berayun (diam). Lihat `contoh/penutup.film.js`.
- **Performa**: jangan gambar ribuan primitive terpisah di dalam `onPlane` (filter blur jalan per draw call) — gabungkan
  dalam satu path. Render 12 menit ±3,5 jam; systemd-oomd pernah membunuh scope VS Code → selalu lewat `render_safe.sh`.
- **beats.js** JSON ketat di dalam `export default {…}`: komentar di atasnya tidak boleh berisi kurung kurawal.
- **Caption** dikirim sebagai file SRT, tidak dibakar ke video.
- **Kejujuran**: angka hasil hitung sendiri diberi label; prop yang distilisasi (uang, gerobak) bukan replika.
