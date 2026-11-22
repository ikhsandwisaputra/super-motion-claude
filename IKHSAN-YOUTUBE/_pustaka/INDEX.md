# INDEX pustaka (dibangun `pustaka.py index`, jangan diedit tangan)
Baca ini di G0, bukan kode film lama. ★ bintang: cek cooldown dengan `pustaka.py segar` · ◆ ciri channel · tanpa tanda = alat, wajib restyle per film.
Di bab: `import { nama } from './pustaka/<modul>.js'` · opsi lengkap: `pustaka.py lihat <id>` · bentuk: `galeri/lembar/<modul>.jpg` · portal: `pustaka.py pakai <slug> --portal <nama>` · stasiun utuh film lama: `rg -n <kata> aset/_pustaka/RESEP.md`.
Film: ivs = teknologi-indo-vs-as · abd = ai-bubble-dompet · adh = ai-data-habis

## dasar · js/dasar.js · galeri/lembar/dasar.jpg
- `dasar.cover` foto di-crop tengah ke kotak bersudut · `cover(g, im, x, y, w, h, r=0)` · adh/abd
- `dasar.shadowed` foto + kanvas bayangan lembut terpisah · `shadowed(img, pad, o) → [img, shadow]` · adh
- `dasar.padOf` (ukur) margin transparan layer potongan · `padOf(canvas) → px` · adh
- `dasar.letterTex` Sumur Huruf: tekstur baris kata Indonesia · `letterTex(font, rows, seed, a=.5, o) + tileTex(ctx, tex, x, y, w, h, scroll)` · adh
- `dasar.strike` coretan menyambar satu baris teks · `strike(ctx, x0, x1, y, size, t, t0, col=INK)` · adh/ivs
- `dasar.node` cakram nomor lime yang memantul · `node(ctx, x, y, n, t, t0, r=54, o)` · adh
- `dasar.check` centang lime digambar; cross() = silang · `check(ctx, x, y, r, t, t0, o) · cross(ctx, x, y, r, t, t0, o)` · adh
- `dasar.paper` lembar kertas gading berbayang + garis tinta · `paper(ctx, w, h, r=10, o)` · adh
- `dasar.dummyFoto` foto prosedural FOTO CONTOH (demo saja) · `dummyFoto(w, h, seed, o)` · baru

## prop · js/prop.js · galeri/lembar/prop.jpg, galeri/lembar/prop-terang.jpg
- `prop.gembok` gembok garis jatuh berpegas, bisa terbuka · `gembok(ctx, x, y, s, t, t0, o)` · adh
- `prop.labelHarga` label harga berayun di tali, bisa ditendang · `labelHarga(ctx, x, y, 400, t, t0, {l1, l2, kick})` · adh
- `prop.pagar` pagar besi jatuh batang demi batang + rel · `pagar(ctx, x, y, 1120, t, t0, {cut})` · adh
- `prop.tumpukHuruf` huruf berjatuhan satu-satu jadi gundukan · `tumpukHuruf(ctx, x, y, 22, t, t0, {huruf, baris})` · adh
- `prop.timbangan` timbangan gading/garis yang miring ke sisi berat · `timbangan(ctx, x, y, s, t, t0, {style, tilt, left, right, labels, lime})` · ivs/adh
- `prop.robot` robot garis: lihat, kedip, kacamata, antena lime · `robot(ctx, x, y, s, {look, blink, glasses, rh, lime})` · adh
- `prop.sepeda` sepeda garis; kembalikan titik sadel & setang · `sepeda(ctx, x, y, r, {spin}) → {seat, bar}` · adh
- `prop.orang` orang: garis, isi menyala, piktogram, siluet berpapan · `orang(ctx, x, y, s, {style, on, label, chip})` · abd/ivs/adh
- `prop.kerumunan` grid 100 orang menyala, baris kepala, dada dari sisi · `kerumunan(ctx, x, y, s, t, t0, {pattern, lit})` · ivs/adh/abd
- `prop.globe` globe garis berputar, tipis · `globe(ctx, x, y, r, t, t0, {a, speed})` · abd
- `prop.monitorCRT` monitor tabung, halaman dial-up memuat · `monitorCRT(ctx, x, y, 620, t, t0, {url, tDone})` · abd
- `prop.pusatData` rak server tumbuh / gedung pusat data LED · `pusatData(ctx, x, y, s, t, t0, {style})` · abd
- `prop.ember` ember terisi gelombang, melimpah lewat bibir · `ember(ctx, x, y, s, t, t0, {to, level})` · abd
- `prop.tiketOrder` tiket order dapur di rel, judul berbalik · `tiketOrder(ctx, x, y, 300, t, t0, {no, title, title2, tFlip})` · abd
- `prop.kupon` kupon promo generik, bisa membeku · `kupon(ctx, x, y, 420, t, t0, {label, tFrost})` · abd
- `prop.jam` jam dengan jarum makin cepat + jarum hantu · `jam(ctx, x, y, R, t, t0, {speed, rgb})` · abd
- `prop.uangKertas` uang kertas bergaya (bukan replika), kanvas cache · `uangKertas({angka, teks, catatan}) → canvas 1200×500` · ivs
- `prop.troli` troli kawat, paket berjatuhan ke dalamnya · `troli(ctx, x, y, s, t, t0, {tFill, n})` · ivs
- `prop.kalender` kalender meja pop, halaman disobek · `kalender(ctx, x, y, 220, t, t0, {month, day, tTear, month2, day2})` · ivs
- `prop.pintu` pintu membuka, cahaya tumpah, ikon di daun · `pintu(ctx, x, y, s, t, t0, {icon, no, label, tOpen})` · ivs
- `prop.ikon` 14 ikon garis film (labu…pagar), bisa putus-putus · `ikon(ctx, x, y, 200, t, t0, {name, dash})` · ivs/abd/adh
- `prop.gerobak` gerobak bakso, stiker QR dipindai · `gerobak(ctx, x, y, s, t, t0, {text, tScan})` · ivs
- `prop.rakBuku` rak kitab muncul, dibaca satu-satu (centang) · `rakBuku(ctx, x, y, s, t, t0, {titles, tRead}) → belum dibaca` · adh
- `prop.tetes` tetes berisi kata jatuh, kolam, riak, cipratan kata · `tetes(ctx, x, y, 250, t, t0, {words})` · adh
- `prop.sumur` sumur potongan: kata surut (data habis) · `sumur(ctx, x, y, s, t, t0, {from, to})` · adh
- `prop.kick` (alat) sudut tendangan teredam untuk benda gantung · `kick(t, t0, amp, d, f)` · abd
- `prop.teksTengah` (alat) teks tengah multi-baris · `teksTengah(ctx, str, x, y, css, size, o)` · abd
- `prop.badan` (alat) isi badan line-art per tema · `badan()` · adh
- `prop.jalurTetes` (alat) path tetesan · `jalurTetes(ctx, r)` · adh
- `prop.jalurOrang` (alat) path piktogram orang, banyak sekali fill · `jalurOrang(ctx, x, y, s)` · adh
- `prop.paket` (alat) kotak paket kraft · `paket(ctx, w, h)` · ivs
- `prop.stikerQR` (alat) kanvas stiker mirip-QR deterministik · `stikerQR(seed) → canvas` · ivs

## tipo · js/tipo.js · galeri/lembar/tipo.jpg
- `tipo.drawOn` garis huruf tergambar, lalu tinta naik bergelombang · `drawOn(ctx, str, x, y, t, t0, css, o)` · adh
- `tipo.angkaHuruf` angka dipotong dari tekstur kata, bisa pecah · `angkaHuruf(ctx, str, x, y, size, t, t0, o{pecah, tex})` · adh
- `tipo.rapat` spasi huruf merapat saat kata mendarat · `rapat(ctx, str, x, y, t, t0, css, o{dari 90, ke 34})` · adh
- `tipo.hurufCampur` satu kata, tiap huruf font sendiri + goyang · `hurufCampur(ctx, str, x, y, size, t, t0, o{fonts, stag})` · adh
- `tipo.garisTangan` coretan tangan melengkung di bawah kata · `garisTangan(ctx, x0, x1, y, t, t0, o{sag, lw, col})` · adh
- `tipo.ketikSiklus` jawaban terketik-hapus bergiliran + caret · `ketikSiklus(ctx, list, x, y, t, t0, css, o{P 1.2, garis})` · ivs
- `tipo.slotKata` slot kata bergulir lalu berhenti di jawaban · `slotKata(ctx, words, x, y, t, t0, css, o{henti, akhir})` · adh
- `tipo.gantiKata` label bergulir dari kata a ke b · `gantiKata(ctx, a, b, x, y, t, t0, css, o{d, dur})` · adh
- `tipo.lensa` kaca pembesar menyapu klaim, temuan diketik · `lensa(ctx, x, y, t, t0, isi(ctx), o{R, zoom, lebar})` · ivs
- `tipo.kutipan` kutipan serif per baris, redup + dicoret · `kutipan(ctx, lines, x, y, t, t0, o{redup, coret})` · ivs
- `tipo.terbang` kata terbang dari samping, besar + blur · `terbang(ctx, str, x, y, t, t0, css, o{sisi, skala})` · adh/ivs/abd
- `tipo.ejaan` kerangka kata dulu, huruf diisi satu-satu · `ejaan(ctx, str, x, y, t, t0, css, o{step, hantu})` · adh
- `tipo.ucap` kalimat terbuka kata per kata ikut narator · `ucap(ctx, words, x, y, t, t0, css, o{step .3})` · adh/ivs/abd

## ui · js/ui.js · galeri/lembar/ui.jpg
- `ui.kursor` panah kursor: skala, ditekan, warna sendiri · `kursor(ctx, x, y, o{s, a, tekan})` · adh
- `ui.kursorJalan` kursor meluncur antar target, klik + riak lime · `kursorJalan(ctx, [[t, x, y, klik]…], t, o) → {x, y}` · adh
- `ui.browser` jendela browser: URL terketik, kode, lalu berbalik · `browser(ctx, x, y, w, h, t, t0, o{url, baris, isi, balik, belakang})` · adh
- `ui.tombol` tombol pil: pegas masuk, ditekan, jadi lime · `tombol(ctx, x, y, label, t, t0, o{tekan, lime})` · adh
- `ui.saklar` saklar on/off, track jadi lime, riak sekali · `saklar(ctx, x, y, t, t0, o{awal, ubah, label})` · adh
- `ui.dialog` dialog setelan: tanya serif + saklar + putusan · `dialog(ctx, x, y, w, h, t, t0, o{judul, tanya, saklar, putusan})` · adh
- `ui.gelembungChat` gelembung chat muncul dari ekor, tag bahasa · `gelembungChat(ctx, x, y, text, t, t0, o{kiri, tag}) → lebar` · ivs
- `ui.komentar` kartu komentar diketik, hati lime + angka · `komentar(ctx, x, y, t, t0, o{nama, baris, suka, jumlah})` · adh
- `ui.kotakKomentar` kotak tulis komentar, caret lime, tombol nyala · `kotakKomentar(ctx, x, y, t, t0, o{baris, fokus, cps})` · adh
- `ui.notif` notifikasi jatuh, progres, berita ganti, centang · `notif(ctx, x, y, t, t0, o{judul, isi, progres, ganti, centang})` · adh
- `ui.miniKomentar` chip komentar mini untuk kerumunan reaksi · `miniKomentar(ctx, x, y, t, t0, o{s, rot, seed})` · abd

## data · js/data.js · galeri/lembar/data.jpg, galeri/lembar/data-terang.jpg
- `data.tween` (alat) nilai keyframe [[waktu, nilai, ease]] · `tween(t, [[t0, 0], [t1, 720, 'outQuint'], [t2, 720]])` · adh
- `data.barChart` batang kecil vs kolom stok bertekstur + irisan lime · `barChart(ctx, x, y, [{v, s, label}], t, t0, {stock:{v,label,sub}, slice:{v,label,at}, tex, sc, grid})` · adh
- `data.hBars` batang mendatar, angka slot di ujung, baris panas lime · `hBars(ctx, x, y, [{label, v, hot, fmt}], t, t0, {sc, tex, gap})` · adh
- `data.balapan` dua batang balapan, penantang tertahan lalu menyalip · `balapan(ctx, x, y, t, t0, {a, b, note, win, base})` · adh
- `data.waffle` grid sel muncul berurutan, n sel pertama jadi lime · `waffle(ctx, x, y, n, t, t0, {cols, rows, cs, gap, title, eat, tex, lime})` · adh
- `data.timeline` sumbu tahun, kurva naik menabrak ambang, pin KITA DI SINI · `timeline(ctx, x, y, t, t0, {from, to, band, line:{label}, curves:[{to, at}], pin, pinAt})` · adh
- `data.jalur` Peta Jalur bernomor, titik aktif pegas lime + cincin · `jalur(ctx, x, y, ['MULAI', …], n, t, t0, {w, from})` · abd
- `data.flap` satu petak split-flap: dua muka, engsel, lipatan gelap · `flap(ctx, x, y, w, h, flapState(flapEvents(t0, [[tw, 'KATA', 'lime']], i), t, seed), {fill, ink, shadow})` · adh/abd
- `data.splitFlap` papan split-flap gelap, kata membalik per baris + lampu · `splitFlap(ctx, x, y, [{no, label, words:[[t, 'KATA', look]]}], t, t0, {cols, cw, ch, gap, title, lamp})` · ivs/abd/adh
- `data.meter` meter level: label mono, rel bertick, isi tinta + % · `meter(ctx, x, y, w, v, label, a = 1)` · adh
- `data.wave` gelombang suara 3 sinus berselubung, ke path · `wave(path, x0, x1, y, amp, t, seed, {n, speed, pure})` · adh
- `data.tangga` tangga tumbuh, plafon turun, pemanjat mentok · `tangga(ctx, x, y, t, t0, {atap, ceil, steps, climber(ctx, x, y, hit)})` · adh
- `data.batas` batang menabrak dinding TERBATAS, panah kedua lepas · `batas(ctx, x, y, t, t0, {a, b, kata, hit, run})` · adh
- `data.menara` menara buku menumpuk, layar ikut naik · `menara(ctx, x, y, t, t0, {n, dur, w, clipW}) · bukuJatuh(ctx, x, yLantai, t, t0)` · adh
- `data.siklus` 3 langkah ✗ jatuh · ↻ coba lagi · ✓ berhasil · `siklus(ctx, x, y, [['JATUH', t1], ['COBA LAGI', t2], ['BERHASIL', t3]], t, t0)` · adh
- `data.ulang` glyph ulang: busur + panah berputar sekali · `ulang(ctx, x, y, t, t0, {r, lw, col})` · adh

## peta · js/peta.js · galeri/lembar/peta.jpg
- `peta.lonLat` (alat) bujur/lintang → titik peta Indonesia · `lonLat(lon, lat) → [x, y] (skala 1, pusat 0) · KOTA.jakarta …` · adh/ivs
- `peta.petaTitik` Indonesia 1615 titik bercahaya + kredit CC BY-SA · `petaTitik(ctx, x, y, s, t, t0, {hot(i, x, y), kredit, kreditAt, col, dur}) → n` · adh
- `peta.petaDunia` peta dunia titik Robinson, zoom ke Indonesia · `petaDunia(ctx, x, y, cs, t, t0, {fokus:[lon, lat], hot(c, r), lime, view}) → {at(lon, lat)}` · abd
- `peta.pin` pin riak: komentar ?, label mono, atau fokus lime · `pin(ctx, x, y, t, t0, {q, label, lime, s, right})` · abd
- `peta.petaPulau` garis pulau tersapu masuk + batas negara putus · `petaPulau(ctx, x, y, s, t, t0, {batas, label}) → P(lon, lat) · pinKota(ctx, x, y, t, t0, label, right)` · ivs
- `peta.ruteBusur` rute busur lime + cincin tiba, atau putus ✗ · `ruteBusur(ctx, x0, y0, x1, y1, t, t0, {bow, dur, putus, stop})` · ivs
- `peta.ruteKipas` rute mengipas dari satu sumber, denyut cahaya · `ruteKipas(ctx, x0, y0, x1, y1, [{label, yo, at}], t, t0, {end})` · abd

## efek · js/efek.js · galeri/lembar/efek.jpg
- `efek.screenCrack` Layar retak dari satu titik, kaca membiaskan isi · `screenCrack(ctx, x, y, t, t0, {r, src, rect})` · abd
- `efek.drawCrack` Retakan kaca menjalar titik demi titik · `drawCrack(ctx, crackLine(v, seed), vis, {head})` · abd
- `efek.crackLine` (geometri) retakan bergerigi lewat titik-titik · `crackLine([[x,y],…], seed, {br})` · abd
- `efek.crackStar` Jaring retak pendek di titik patah · `crackStar(ctx, x, y, t, t0, {R})` · abd
- `efek.shards` Serpih kaca terlempar lalu jatuh · `shards(ctx, x, y, t, t0, {n})` · abd
- `efek.shake` (gerak) guncangan teredam sesudah benturan · `shake(t, t0, amp)` · abd
- `efek.frost` Embun beku tumbuh dari tepi kotak · `frost(ctx, x, y, w, h, t, t0, {dur})` · abd
- `efek.fibreBundle` Penampang kabel serat, inti padam lalu menyala · `fibreBundle(ctx, x, y, R, t, t0, {mati, nyala})` · abd
- `efek.fibreLine` Serat terkubur dengan denyut cahaya berjalan · `fibreLine(ctx, x, y, w, t, t0, {L, seed})` · abd
- `efek.soil` Penampang tanah gelap berbutir · `soil(ctx, x, y, w, h)` · abd
- `efek.chainSim` (fisika) rantai verlet jatuh dan menumpuk · `S = chainSim({n, l, top})  // sekali di load` · adh
- `efek.chainLinks` Mata rantai sepanjang polyline · `chainLinks(ctx, P, n, {k})` · adh
- `efek.chainDrop` Rantai jatuh lalu menumpuk di lantai · `chainDrop(ctx, x, y, S, t, t0)` · adh
- `efek.proseTex` (tekstur) paragraf klise tulisan mesin · `T = proseTex(w, h, size, seed, {bl})` · adh
- `efek.proseSea` Lautan tulisan mesin bergulir · `proseSea(ctx, x, y, w, h, T, t, t0, {v, pudar})` · adh
- `efek.colourRing` Warna kembali dalam cincin dari satu titik · `colourRing(ctx, x, y, w, h, grey, col, t, t0, {at})` · adh
- `efek.bloom` Gambar mekar cahaya dari satu titik · `bloom(ctx, x, y, w, h, src, t, t0, {oy})` · adh
- `efek.impact` Benturan: cincin pipih, debu, huruf terpental · `impact(ctx, x, y, t, t0, {R})` · adh
- `efek.motes` Debu hangat naik pelan, hold tetap bernapas · `motes(ctx, x, y, w, h, t, t0)` · adh
- `efek.wordRain` Hujan kata jatuh ke permukaan · `wordRain(ctx, x, y, w, h, t, t0, {dasar})` · adh
- `efek.tank` Tangki kaca berisi tulisan bergulir · `tank(ctx, x, y, w, h, k, t, t0, {tex})` · adh
- `efek.tankLevel` (ukur) y permukaan tangki untuk isi k · `tankLevel(y, h, k)` · adh
- `efek.imageShatter` Gambar pecah jadi keping terlempar · `imageShatter(ctx, x, y, w, h, im, t, t0)` · adh

## hits · ../_template-longform/tx/tx.json · galeri/lembar/hits.jpg
- ◆ `hit.stk1` hit garis cahaya 0.95 s, puncak +0.40 s · rasa: energi, data mengalir, layar menyala · `beats.js "HITS": [["stk1", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.stk2` hit garis cahaya 0.60 s, puncak +0.17 s · rasa: energi, data mengalir, layar menyala · `beats.js "HITS": [["stk2", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.stk3` hit garis cahaya 1.05 s, puncak +0.60 s · rasa: energi, data mengalir, layar menyala · `beats.js "HITS": [["stk3", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.stk4` hit garis cahaya 0.85 s, puncak +0.13 s · rasa: energi, data mengalir, layar menyala · `beats.js "HITS": [["stk4", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.cmc1` hit komik 1.00 s, puncak +0.53 s · rasa: punchline, kejutan, nada ringan · `beats.js "HITS": [["cmc1", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.cmc2` hit komik 1.10 s, puncak +0.93 s · rasa: punchline, kejutan, nada ringan · `beats.js "HITS": [["cmc2", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.ldr1` hit film leader 1.10 s, puncak +0.27 s · rasa: hitung mundur, babak baru · `beats.js "HITS": [["ldr1", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.shD` hit rana kamera 1.40 s, puncak +0.87 s · rasa: jepret bukti, foto, momen terekam · `beats.js "HITS": [["shD", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.shE` hit rana kamera 1.40 s, puncak +0.90 s · rasa: jepret bukti, foto, momen terekam · `beats.js "HITS": [["shE", "<anchor>", .85]]` · ivs/abd/adh
- ◆ `hit.hw1` hit tulisan tangan 1.00 s, puncak +0.63 s · rasa: manusia, catatan, karya asli · `beats.js "HITS": [["hw1", "<anchor>", .85]]` · adh
- ◆ `hit.hw2` hit tulisan tangan 1.10 s, puncak +0.10 s · rasa: manusia, catatan, karya asli · `beats.js "HITS": [["hw2", "<anchor>", .85]]` · adh
- ◆ `hit.hw3` hit tulisan tangan 1.00 s, puncak +0.77 s · rasa: manusia, catatan, karya asli · `beats.js "HITS": [["hw3", "<anchor>", .85]]` · adh
- ◆ `hit.gr1` hit grunge 1.00 s, puncak +0.57 s · rasa: salinan, toner, rusak, kualitas turun · `beats.js "HITS": [["gr1", "<anchor>", .85]]` · adh
- ◆ `hit.gr2` hit grunge 1.30 s, puncak +0.53 s · rasa: salinan, toner, rusak, kualitas turun · `beats.js "HITS": [["gr2", "<anchor>", .85]]` · adh
- ◆ `hit.gr3` hit grunge 1.00 s, puncak +0.37 s · rasa: salinan, toner, rusak, kualitas turun · `beats.js "HITS": [["gr3", "<anchor>", .85]]` · adh

## penutup · js/penutup.js · galeri/lembar/penutup.jpg
- ◆ `penutup.subscribe` kursor klik SUBSCRIBE (lime + centang), lonceng · `subscribe(ctx, x, y, t, t0, o{klik, lonceng, inisial})` · adh/ivs/abd
- `penutup.kartuNext` kartu video berikutnya terbang masuk + antrean · `kartuNext(ctx, x, y, t, t0, o{judul, gambar, antri, centang})` · adh
- ◆ `penutup.endScreen` layar akhir: kalimat penutup, 2 slot, subscribe · `endScreen(ctx, x, y, t, t0, o{judul, sub, slot, kartu, subscribe})` · adh/ivs/abd
- `penutup.intinya` papan intinya: jangkar lime, opsi bergantung tali · `intinya(ctx, x, y, t, t0, o{kicker, baris, ekor, jangkar, gantung})` · adh

## bintang · js/gelembung.js, js/mata.js, js/salinan.js · galeri/pratinjau/<id>.jpg
- ★ `bintang.gelembung` Gelembung kaca dipompa, tegang, lalu pecah · `bubble(ctx, cx, cy, r*pumped(t, t0, P), t, {wob: wobble(t, P), inner}); bubblePop(ctx, cx, cy, r, t - tPecah)` · abd
- ★ `bintang.salinan` Salinan dari salinan memudar per generasi · `CH = chain(kartu(), 8); pudar(ctx, CH, x, y, w, h, t, t0, {step})` · adh
- ★ `bintang.mata` Foto dibaca mesin jadi huruf, dipotong token · `M = await bacaMesin(img, w, h, {mode}); mataMesin(ctx, M, x, y, t, t0, {tok, cara})` · adh

## portal · js/portal/garis-pindai.js, js/portal/gelembung.js, js/portal/qr.js · galeri/pratinjau/<id>.jpg
- ★ `portal.qr` Portal bab lewat kode QR (DILARANG) · `addPortal(…)  // salin ke src film` · ivs
- ★ `portal.gelembung` Portal bab: tembus selaput gelembung · `addPortal(…)  // salin ke src film, butuh src/pustaka/gelembung.js` · abd
- ★ `portal.garis-pindai` Portal bab: garis pindai lime menyapu · `addPortal(…)  // salin ke src film` · adh

## season2 · js/season2.js · galeri/lembar/season2.jpg
- `season2.stripAccordion` Foto terbelah 4 strip horisontal bergeser & ubah tinggi di ketukan VO · `stripAccordion(ctx, im, x, y, w, h, t, t0, {n, shiftAt, accent})` · demo-style-season2
- `season2.valueFlip` Flip bidang gelap ↔ aksen ↔ terang di jangkar tetap + garis 12 fps on-twos · `valueFlip(ctx, ['A','B','C'], x, y, t, t0, {pill, sub, flips, accent})` · demo-style-season2
- `season2.wordToSearchUI` Kata kalimat bermetamorfosis jadi search bar, diklik & diketik kursor live · `wordToSearchUI(ctx, lead, word, query, x, y, t, t0, {btn, accent})` · demo-style-season2
- `season2.kineticBento` 3 panel bento hidup (Apple Spring) — panel aktif membesar, tetangga menyusut · `kineticBento(ctx, x, y, w, h, panes, t, t0, {expandAt, split0, split1})` · demo-style-season2
- `season2.kutipanLepas` Setelah stabilo bukti, halaman meredup & frasa kunci terangkat jadi tipografi hero · `kutipanLepas(ctx, x, y, w, h, headline, t, t0, {tag, sub, accent})` · demo-style-season2
- `season2.gravityBake` (fisika) bake simulasi rigid-body gravitasi 120 Hz deterministik sekali di load() · `S = gravityBake({n:20, w:720, floorY:260})` · demo-style-season2
- `season2.gravityBlocks` Balok perbandingan skala jatuh di bawah gravitasi, bertumpuk + cincin benturan · `gravityBlocks(ctx, S, x, y, t, t0, {accent})` · demo-style-season2
- `season2.dotMorphBuild` (data) sampling piksel foto asli untuk two-wave dot morph ke grafik batang · `M = dotMorphBuild(img, bars, {accentRgb})` · demo-style-season2
- `season2.dotMorph` Two-Wave Dot Morph: foto asli terurai jadi ribuan piksel & menyusun grafik batang · `dotMorph(ctx, M, x, y, t, t0, {img, accent})` · demo-style-season2
- `season2.kineticRing3D` Teks marquee 3D melingkari silinder miring dengan depth dimming sisi belakang · `kineticRing3D(ctx, text, cx, cy, t, t0, {r, size, tilt, hi})` · demo-style-season2
- `season2.slitScanText` 12-Slice Slit-Scan Time Displacement: teks melengkung organik lalu tajam saat diam · `slitScanText(ctx, text, cx, cy, size, t, t0, {slices, delay, accent})` · demo-style-season2
- `season2.metaballMerge` Liquid Metaball Merge: bola konsep berputar & meleleh menyatu jadi 1 inti · `metaballMerge(ctx, cx, cy, t, t0, {cols, label})` · demo-style-season2
- `season2.renderLumaSeam` WebGL2 Shadow-First Luma + Ink Seam Wipe antar 2 kanvas dengan rim aksen · `cv = renderLumaSeam(canA, canB, p, [0.784,0.961,0.235])` · demo-style-season2
- `season2.render3DStudioBench` WebGL2 Raymarched 3D Softbox Monolith + Radiograph X-Ray Blueprint + Dolly Zoom · `cv = render3DStudioBench({camPos, target, fovDeg, xrayY, xrayAmt})` · demo-style-season2
- `season2.renderFoldWorld` WebGL2 3D Cylinder Fold / Bend the World transition antar 2 kanvas · `cv = renderFoldWorld(canA, canB, p)` · demo-style-season2

