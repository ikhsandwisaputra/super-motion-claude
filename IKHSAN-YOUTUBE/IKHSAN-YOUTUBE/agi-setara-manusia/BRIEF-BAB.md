# Brief bersama · build bab paralel · agi-setara-manusia (16 Nov 2026)

Kamu satu dari beberapa builder yang mengerjakan bab film ini bersamaan. Film: "Apa Itu AGI? Mungkinkah AI Setara
Manusia?", long-form 16:9 1920×1080 30 fps, bahasa Indonesia, channel "Relentless Non-Conformist". Mesin = Super Motion
(Canvas 2D + kamera look-at). Ikhsan (creative director, panggil "boss") akan menonton tiap bab di Motion Studio.
**Tidak ada render final**: tugasmu berakhir di Studio yang jalan + laporan.

## Tema & motif (terkunci, disetujui Ikhsan setelah tes 3 dtk)
- Tema: **SAKLAR atau TANGGA?** AGI bukan saklar lampu yang tiba-tiba "klik, nyala", tapi tangga yang dinaiki
  tidak rata. Kata lime film = **TANGGA** (dan kata kunci per kalimat lewat `markLine`, satu kata lime per kalimat).
- Motif lock ≤ 3: **penggaris** (alat ukur sebagai benda fisik, bisa melar pakai pegas), **anak tangga 3D** (baris
  station = tangga naik menjauh; kamera naik satu pijakan), **lime TANGGA**.
- Rujukan yang sudah disetujui: `aset/agi-setara-manusia/tes-tangga/src/film.js` + `beats.js` (saklar bisu, tangga,
  penggaris elastis 62,7→99,9, label STANDAR→VENDOR, jarum lime, srcTag). Tiru kualitas & fisikanya, jangan salin stationnya.
- Kartu gaya lengkap: `aset/agi-setara-manusia/KARTU-GAYA.md`.

## Path (semua relatif ke `/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/agi-setara-manusia/` = FILM)
- Naskah per bab + petunjuk VISUAL/ASET/SFX/TEKS Ahri: `NARASI.md` (baca HANYA bagianmu, pakai `sed -n`):
  Hook 8–23 · Peta 24–39 · Bab 1 40–77 · Bab 2 78–111 · Bab 3 112–157 · Bab 4 158–199 · Bab 5 200–241 ·
  Puncak 242–257 · Penutup 258–267 · Fakta+sumber 268–304. Teks yang benar-benar diucapkan VO: `build/vo/NN.txt`.
- VO sudah jadi (Ahmad, eleven_v4): `audio/voiceover/agi_vo_ahmad_NN.mp3` di root workspace.
  Durasi: 01 64,4 s · 03 59,8 · 04 125,2 · 05 127,4 · 06 144,6 · 07 138,0 · 08 152,8 · 09 58,6 · 10 42,5.
  Waktu kata: `cd FILM && ../../.venv/bin/python -I tools/words.py NN [t0 t1]`.
- Kit: `kit/kit.js` (makeChapter, timing, camera, onPlane, fillStations, drawRow, evid, evidFull, fall, typeOn,
  markLine, srcTag, slab, txt, countTo, gone, plate, loadImg, loadVid, grainRect, theme…), `kit/draw.js` (prop line-art),
  **`kit/agi.js` (motif film: makeSteps/stairs, saklar, ruler, needle, springSp, diukur, rgbMix)**. Baca dengan
  `rg -n`/`sed -n`, jangan seluruh file. Komponen pustaka: `kit/pustaka/` + indeks `../_pustaka/INDEX.md`.
- Contoh bab utuh dari film sukses (pola struktur, JANGAN disalin mentah, ide di dalamnya cooldown):
  `contoh/bab-1.film.js` + `contoh/bab-1.beats.js`, `contoh/bab-peta.film.js`, `contoh/puncak.film.js`,
  `contoh/penutup.film.js` + `.beats.js`.
- Folder bab kamu: `FILM/<bab>/src/{film.js,beats.js}` (starter 3 station) — symlink kit.js/draw.js/agi.js/portal.js/
  txlib.js/pustaka sudah ada. Aset: `<bab>/assets/shared` → `FILM/assets`, `<bab>/assets/txlib` → `FILM/tx`.
- Aset Ahri: `assets/kutipan/*.png` (+ `.json`: url, media, `sumberTeks`), `assets/grafik/*.{png,svg}`,
  `assets/cc/*.jpg` (Commons, kredit di `.json`), `assets/stok-situs/` (foto pexels, musik, SFX),
  klip video sudah dipotong ke frame: `assets/vid/<nama>/` (90 frame 15 fps 960×540, `loadVid(base, nama)`);
  peta file mp4 Ahri → nama di tabel CLIPS `tools/vid_frames.py`.
- Hit transisi: `tx/<id>` + `tx/<id>.wav` (lihat `../_pustaka/galeri/lembar/hits.jpg`), cara pakai di `contoh/bab-1.beats.js` (HITS).
- Mixer: `cd FILM && ../../.venv/bin/python -I tools/mix_chapter.py <bab>` → `<bab>/build/mix.wav`
  (jenis SFX: travel whoosh slide swish rise thud impact sub pop card click cut drop strike crack keys:n:dur ticks:n:dur
  cards:n:span f:<potongan nama file di assets/stok-situs>[:dur[:start]] — lihat docstring `tools/mix_chapter.py`).

## Pembagian (jangan sentuh file bab lain)
| Bab | VO | Warna (skrip warna, ΔE antar bab ≥ 18) | Bed tenang | Hit (4–5, variasikan) | Studio |
|---|---|---|---|---|---|
| intro | 01 | malam server | skor intro `audio/music/ivs_score_intro.mp3` (satu-satunya musik nyetir) | dari RNC | 8800 |
| bab-peta | 03 | subuh dingin | voxscape | stk1, cvo1, shD | 8801 |
| bab-1 | 04 | **dunia terang** (lab ukur gading, `theme(true)`) | vastness | cvo2, hw1, stk2, gr1 | 8802 |
| bab-2 | 05 | arsip abu-baja dokumenter, TANPA sepia | feedback-dreams | cmc1, gr2, hw2, stk4, cvo1 | 8803 |
| bab-3 | 06 | terang dingin (ruang ujian = layar UI, bukan kertas) | voxscape (ss lain) | shE, hw3, stk4, cvo2, gr3 | 8804 |
| bab-4 | 07 | malam kota + pusat data | fallen-asper (cek tenang; kalau nyetir pakai vastness) | cmc2, stk1, shD, cvo1, ldr1 | 8805 |
| bab-5 | 08 | siang hangat Jakarta | vastness (ss lain) | gr1, hw1, stk2, cvo2, shE | 8806 |
| puncak | 09 | senja, lampu tangga menyala satu per satu | feedback-dreams | stk3, cmc1, gr2 | 8807 |
| penutup | 10 | hangat | voxscape | hw2, stk4 | 8808 |
Bed: `stok:<nama file mixkit-musik-…mp3>` dari `assets/stok-situs/`, RMS ≈ −30 sebelum duck, duck 0,55, ~5 dB di bawah VO,
gap (diam) sebelum punchline.

**Artikel layar penuh (`evidFull`, total 4–6 sefilm)**: Bab 1 = OpenAI Charter · Bab 3 = arXiv "A Definition of AGI" ·
Bab 4 = ARC Prize Astra + satu lagi (METR atau blog Altman) · Bab 5 = Komdigi. Artikel lain = `evid` biasa / kolase.

## Aturan Ikhsan (semua WAJIB, hasil revisi yang sudah dibayar)
1. **Bukan PPT.** Kamera selalu bergerak di baris kedalaman (stations, gap z ±2600, `via` rise/whip/push/truck/cut);
   tidak ada still > 4 s; teks bergerak tiap ≤ 2 s; zoom ke artikel/diagram = rotasi kamera 3D 8–12°, bukan scale 2D.
   Energi: ±20 % Tier A (spektakel 3D/kamera), 50 % Tier B (modular dinamis), 30 % Tier C (tenang). 15–26 station per bab
   130–180 s (skala ke durasi VO-mu); ≥ 1 lapisan baru tiap 3–5 s.
2. **Visual mengikuti kata VO.** Tiap beat ditaruh di kata yang diucapkan (`V` di beats.js dari `words.py`). Ikuti
   petunjuk VISUAL/TEKS Ahri di NARASI bagianmu. **Pakai SEMUA aset Ahri yang disebut di bagianmu** (klip, kutipan,
   grafik, foto, SFX); kalau ada yang tidak bisa dipakai, tulis alasannya di laporan.
3. **Bukti**: artikel/kutipan masuk di awal shot dan terbaca ≥ 2 s; tiap angka di layar ada `srcTag` (teks dari
   `sumberTeks`/Fakta NARASI); angka turunan/ilustrasi diberi label (mis. "ILUSTRASI"). Angka & nama model harus persis
   seperti VO/NARASI (mis. "Fable 5.2", "GPT-6 Astra", "Gemini 4 Carbon"). Kutipan tokoh selalu "menurut X".
4. **Gaya**: Vox + dokumenter + motion. Ruang `#0B0C09`, gading `#F1EFE6`, **lime `#C8F53C` satu-satunya aksen** (tinta
   gelap di atas lime), tanpa neon/glow berlebihan. Display League Gothic untuk angka, Fraunces italic untuk kalimat
   diucapkan, Space Mono untuk label/srcTag. Foto orang/tempat: grade + grain dokumenter (`grainRect`); dokumen grain tipis.
   **Dilarang**: look jadul (burn, proyektor, sepia, film leader cokelat), konsep kertas/prop dunia kertas, kotak
   Bento/Tailwind generik (rounded rect + border tipis + pill badge + angka di tengah), pill subtitle kaku, emoji sistem,
   ikon palsu (kotak + huruf). Logo/ikon = SVG asli atau tidak sama sekali.
5. **Bingkai penuh**: tidak ada ruang mati/blur kosong. Teks di zona aman, tidak bertabrakan; caption foto di bawah
   gambar, bebas dari garis HUD. Craft harus TERLIHAT (huruf kinetik, dive, flip 3D, pegas penggaris).
6. **Audio**: VO-first. SFX di setiap aksi UI/kamera (pop, click, keys sepanjang teks diketik, card tiap panel, travel/
   whoosh tiap perpindahan, strike tiap stabilo, thud/sub di punch) — ramai tapi tidak per kata. **Tanpa ting/bell/
   chime/ping/glass** (SFX lonceng Ahri sudah diganti klik/pop). Tiap hit punya suaranya sendiri (`tx/<id>.wav`).
7. **Fisika**: gerak pakai ease/pegas yang sudah ada (`E.*`, `spring`, `springSp`), snap→hold, tidak linear, tidak
   melayang lambat (Ikhsan suka tempo cepat, transisi ±0,3–0,6 s).
8. **Teknik baru L3 (bab-3 & bab-5)**: **Two-wave dot morph** — foto/klip → ribuan titik, tiap titik dengan jam sendiri
   (gelombang 1 lepas, gelombang 2 menyusun bentuk baru), lalu kembali. Gambar titik dalam satu path / `fillRect` batch
   (JANGAN ribuan draw call di dalam `onPlane` — filter blur jalan per draw call).
9. **Portal antar bab** dikerjakan Ahtor di `kit/portal.js` ("Anak Tangga"); jangan diubah. Sisakan ±0,6 s di akhir dan
   ±0,5 s di awal bab yang tidak berisi teks penting.
10. **Performa**: bab harus jalan di preview Studio. Gambar berat (ribuan titik, banyak foto) di-cache ke offscreen canvas.

## Larangan file
- JANGAN ubah: `kit/*.js`, `tools/*.py` (kecuali bab intro boleh `intro/tools/place.py` & `intro/tools/mix.py`),
  `film.json`, `assets/` bersama, folder bab lain, `.env.local`. Butuh helper → tulis di `<bab>/src/<nama>.js`.
  Butuh aset turunan (crop, potongan) → `<bab>/assets/own/`. Bug di kit → catat di laporan, akali di bab-mu.
- Tidak ada panggilan ElevenLabs/API berbayar. Tidak ada git commit. Tidak ada hapus file (arsipkan dengan rename `.bak`).

## Alur kerja per bab
1. Baca: bagian NARASI-mu, `build/vo/NN.txt`, `words.py NN` (seluruh take), tes-tangga film.js, `kit/agi.js`,
   satu contoh terdekat. Tulis rencana station singkat (komentar di atas film.js: idea per station + kata VO).
2. `beats.js`: VO, VOFF (0,3–0,5), END (= durasi VO + VOFF + ±1,2 s), TAIL, V (waktu kata), HITS, BED, SFX.
   Komentar di atas `export default` TANPA kurung kurawal; isi = JSON ketat.
3. `film.js`: stations + world + over, mengikuti pola makeChapter.
4. Mix: `tools/mix_chapter.py <bab>`.
5. Cek frame (RENDER DIKUNCI supaya RAM 13 GB tidak jebol — wajib pakai flock):
   `cd FILM/<bab> && flock /tmp/claude-1000/agi-render.lock ../../../.venv/bin/python -I tools/render.py --scene a --frames <daftar frame dipisah koma, mis. tiap 45 frame + momen kunci> --out build/cek --k 1 --workers 2`
   lalu `../../../.venv/bin/python -I ../tools/sheet.py build/cek build/cek_sheet.jpg 6 320` dan BUKA sheet-nya (Read).
   Render cek SELURUH durasi (minimal tiap 1,5 s) setidaknya sekali supaya tidak ada error JS / frame kosong di tengah.
   Perbaiki yang jelek (teks bertabrakan, ruang kosong, aset tidak muncul, terlalu gelap, still terlalu lama), ulangi.
6. Studio (biarkan jalan setelah kamu selesai):
   `cd /home/ikhsands/Proyek/super-motion-claude-ikhsan && setsid nohup .venv/bin/python -I tools/studio/studio.py aset/agi-setara-manusia/<bab> --port <port> > /tmp/claude-1000/studio-<bab>.log 2>&1 &`
   lalu cek `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:<port>/` = 200.
7. Laporan akhir (≤ 25 baris, bahasa Indonesia): URL Studio, durasi bab, jumlah station, daftar momen kunci
   (mm:ss → apa), aset Ahri yang dipakai/yang tidak (+alasan), hit yang dipakai, apa yang sudah DIUKUR/DILIHAT vs yang
   tidak bisa dicek (kamu tidak bisa mendengar mix atau menonton gerak real-time), masalah terbuka, ide ★ baru bab ini.
