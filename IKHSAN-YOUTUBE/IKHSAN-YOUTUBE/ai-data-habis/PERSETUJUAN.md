# Persetujuan · Brief · Kalau Data Manusia Habis, AI Belajar dari Mana Lagi?

Baca dulu sebelum diserahkan ke studio. Setuju → tombol "Setujui & serahkan" di notifikasi, atau jawab "gas/setuju".

## 1. Riset

Laporan lengkap: /home/ikhsands/Proyek/asisten-agi-claude/laporan/2026-11-15-kartu-ide-ai-data-habis.md

**Pondasi 5W+1H:**

- **Apa:** ukuran data latih AI mendekati seluruh stok teks publik buatan manusia (±300 triliun token, Epoch AI).
- **Siapa:**
  - Epoch AI (peneliti proyeksi data).
  - Ilya Sutskever (salah satu pendiri OpenAI): "peak data".
  - Lab AI: Meta, Qwen, Microsoft (Phi), Google DeepMind, DeepSeek, NVIDIA.
  - Penjaga pagar: pemilik situs, Cloudflare, Reddit, penerbit.
  - Indonesia: GoTo + Indosat (Sahabat-AI), media lokal, Komdigi.
- **Kapan:** proyeksi habis 2026–2032; Sutskever Des 2024; pagar Cloudflare Jul 2025; Anthropic US$1,5 miliar disetujui
  20 Jul 2026; Perpres AI tinggal tanda tangan per 4 Sep 2026.
- **Di mana:** internet terbuka (Common Crawl), pusat data, laboratorium AI, Indonesia.
- **Kenapa:** model makin besar butuh data makin banyak, sementara situs mulai memagari dan menjual datanya.
- **Bagaimana:** tiga jalan keluar: data sintetis, belajar sendiri (RL/pengalaman), dan dunia nyata + efisiensi. Masing-masing
  punya dampak.

## 2. Narasi ElevenLabs

±797 dtk (target 720 dtk) · 1992 kata · 9 beat · humor salah-sambung + skala-absurd + deadpan · 21 tag

```
[curious] Internet hampir habis. Bukan kuotamu... tapi isinya.
[serious] Gitu kata salah satu pendiri OpenAI, pembuat ChatGPT.
[warmly] Namanya Ilya Sutskever. Di kumpul ilmuwan AI dunia, NeurIPS, Desember 2024, dia bilang tulisan manusia itu udah kayak minyak buminya AI.
Cadangan bacaan kita udah mentok, katanya. Nggak ada sumur baru, soalnya internet kan cuma satu.
Grafiknya emang bikin kaget. Satu model AI sekarang aja udah ngelahap kira-kira sepersepuluh stok tulisan manusia di internet.
Nah, kalau tulisan manusia ini habis, terus AI mau belajar dari mana lagi?
Di video ini kita bakal bahas lima hal. Pertama, emang beneran habis? Kedua, kenapa internet mulai dipagerin. Ketiga, tiga jalan keluarnya. Keempat, gimana kalau AI belajar dari AI—ini bagian paling penting. Terakhir, artinya buat kita di Indonesia.
Termasuk buat status dan foto yang baru kamu upload tadi pagi.
[curious] Tapi tunggu dulu. Internet kan luas banget ya. Masa iya sih bisa habis?
Kenalan dulu sama satuannya: token. Token itu potongan kecil tulisan, kira-kira sepotong kata.
AI nyicil baca dunia per potongan ini, persis kayak kita makan nasi per suap.
Tahap belajar AI paling awal dan paling rakus namanya pretraining. Ibarat masa sekolah dasarnya AI: semua bacaan dilahap dulu, urusan paham belakangan.
Terus, lembaga riset Epoch AI ngitung: ada berapa banyak tulisan manusia di internet yang layak dipake? Sekitar tiga ratus triliun token.
Angka segitu udah nyaring tulisan yang bagus aja, termasuk kebiasaan baca ulang bahan yang sama.
Sekarang liat nafsu makannya. Llama 3 buatan Meta dilatih pakai lebih dari lima belas triliun token. Adiknya, Llama 4, lebih dari tiga puluh triliun. Qwen3 sekitar tiga puluh enam triliun.
Satu model aja udah ngabisin sepersepuluh tulisan publik manusia. [deadpan] Ya... lumayan lahap buat sekali makan.
Kapan habisnya? Kata Epoch, bahan belajar AI bakal nyamain seluruh stok itu antara 2026 sampai 2032.
Perhatiin tahun pertamanya: dua ribu dua puluh enam. Itu kan tahun ini! Masa kritisnya bukan masa depan lagi, kita udah di dalamnya.
[thoughtful] Tapi jangan salah paham dulu soal kata "habis". Tulisan di internet nggak ilang. Blog resep ibumu masih aman kok di sana.
Maksud Epoch tuh gini: jatah bacaan AI udah mentok nyamain stok yang ada. Kayak santri yang udah khatam semua kitab di perpustakaan pondoknya. Bukunya sih masih ada, cuma yang belum dibaca aja udah habis.
Setahun kemudian, Sutskever masih bilang hal yang sama: bekal bacaan awal AI emang terbatas.
Begitu sadar stoknya terbatas, kejadian deh hal yang selalu nimpa barang langka. Orang mulai masang pagar.
[curious] Kalau tulisanmu ternyata jadi bahan baku AI bernilai miliaran, sebenarnya siapa yang berhak jual?
Tiap situs punya catatan kecil bernama robots.txt. Anggap aja papan di pagar rumah: robot boleh masuk, atau dilarang.
Robot di sini maksudnya program penyedot halaman milik perusahaan AI.
Nah, peneliti Data Provenance Initiative ngecek C4, gudang bacaan web favorit buat ngelatih AI.
Hasilnya bikin kaget. Dalam setahun sampai April 2024, lebih dari dua puluh delapan persen isi sumber utamanya resmi dikunci lewat papan tadi.
Bayangin perpustakaan umum yang dalam setahun, lebih dari seperempat rak terbaiknya mendadak digembok.
Juli 2025, Cloudflare ikut ngubah aturan main. Penjaga lalu lintas banyak situs ini otomatis langsung ngeblokir robot AI dari awal.
Bikin situs baru langsung ditanya soal izin. Dari setelan awalnya, robot AI dilarang masuk kecuali mau bayar.
Ujungnya, dari pagar lahirlah loket. Reddit dikabarin nerima sekitar enam puluh juta dolar setahun dari Google buat akses datanya.
Urusan buku juga rame. Anthropic, pembuat chatbot Claude, digugat sekelompok penulis buku.
Kata hakim, ngelatih AI pakai buku yang dibeli resmi itu masih wajar. Masalahnya, ada buku dari situs bajakan.
Akhirnya Anthropic pilih damai satu koma lima miliar dolar, sekitar tiga ribu dolar per karya. Disahin pengadilan Juli 2026.
[thoughtful] Menurutku, ini titik balik. Dulu tulisan manusia dianggep kayak air hujan—bebas ditampung. Sekarang udah ada meterannya.
Di Indonesia juga mulai kerasa. Sahabat-AI, program AI lokal garapan GoTo dan Indosat, ngegandeng Tempo, Kompas, Republika, dan Hukumonline.
Tujuannya simpel: biar AI lokal ini beneran paham bahasa dan konteks kita.
[curious] Nah, kalau berita aja ada harganya, terus gimana sama komentar dan curhatanmu di medsos? Simpan dulu ya, jawabannya di bab terakhir.
Karena pagar makin tinggi dan loket makin mahal, pembuat AI muter otak. Ada tiga jalan keluar.
[curious] Nggak boleh lagi nyontek catatan temen? Pilihannya tinggal tiga nih: bikin catatan sendiri, praktik langsung, atau belajar lebih irit.
Pertama, AI ngajarin AI. Namanya data sintetis, bahan belajar bikinan mesin. Mirip guru les yang bikinin soal latihan buat muridnya.
Contohnya Phi-4 dari Microsoft, akhir 2024. Sebagian besar bahannya bikinan mesin. Eh, dia malah ngalahin gurunya, GPT-4, di soal sains dan matematika.
Cuma ya gitu, laporan Stanford AI Index 2026 ngingetin jangan keburu seneng. Belum ada bukti kuat data mesin bisa ngegantiin tulisan manusia di tahap belajar awal.
Kedua, AI belajar sendiri lewat coba-coba. Istilahnya reinforcement learning.
Mirip belajar naik sepeda: jatuh, coba lagi, seneng pas berhasil. Bedanya, rasa seneng diganti poin. Bener dapet nilai, salah nggak.
Contoh tenarnya AlphaGo Zero dari DeepMind, tahun 2017. Pas belajar papan Go, dia nggak dikasih contoh main manusia. Cuma dikasih aturan main aja.
Habis itu dia ngelawan versi lama yang pernah ngalahin juara dunia. Skornya telak: seratus banding nol.
Jurus serupa dipake DeepSeek-R1, yang masuk jurnal Nature September 2025. Nalarnya dipancing lewat coba-coba murni, tanpa contoh langkah mikir manusia.
Cara ini ampuh banget buat soal yang jawabannya pasti, kayak matematika dan kode program.
Tapi ada tapinya. Studi 2025 nemuin hasil coba-coba ini tetap mentok di bekal model dasarnya. Muridnya makin jago, tapi nggak jauh lewatin modalnya.
Peneliti DeepMind sampai nulis esai soal "era pengalaman". Pesannya simpel: tulisan manusia terbatas, pengalaman nggak.
Jalan ketiga paling nampar gengsi mesin: belajar dari dunia nyata, dan lebih irit.
Peneliti Stanford, Michael Frank, ngebandingin gini. GPT-3 belajar dari lima ratus miliar kata. Anak enam belas bulan? Cuma sekitar lima belas juta kata aja.
[pause] Selisihnya kira-kira tiga puluh tiga ribu kali lipat!
[deadpan] Dan bocahnya udah pinter banget minta susu.
Ketiga jalan ini keliatannya menjanjikan. Cuma, jalan pertama nyimpen satu pertanyaan gede. Gimana kalau AI terus-terusan belajar dari tulisan AI?
[curious] Pernah nggak fotokopi dari hasil fotokopian? Terus difotokopi lagi berulang-ulang?
Lembar pertama masih tajam. Lembar ketiga mulai buram. Pas lembar kesepuluh, tanda tangan di pojok udah ilang, tinggal noda abu-abu doang.
Nah, itu gambaran model collapse, alias runtuhnya mutu AI. Buktinya terbit di jurnal Nature, Juli 2024.
Pas AI dilatih berulang pakai tulisan AI sebelumnya, cacatnya permanen. Dan yang ilang duluan bukan tengahnya, tapi pinggirannya—atau ekornya.
Ekor ini maksudnya hal-hal unik dan langka. Kejadian jarang, pendapat nggak pasaran, atau cerita yang jarang ditulis.
Bayangin AI generasi pertama masih tau resep kue khas satu kampung. Eh di generasi kelima, yang nyisa tinggal resep bolu paling pasaran.
Peneliti makalah itu ngasih catatan penting. Hal langka kayak gini sering nyangkut kelompok masyarakat yang terpinggirkan.
[serious] Jadi yang terancam bukan cuma mutu jawabannya aja. Tapi siapa yang suaranya masih kedengeran.
Ada istilah lain yang lebih ngeri: MAD, plesetan penyakit sapi gila. Intinya sama: tanpa data asli segar, mutu dan keragaman bahasa AI merosot.
Dampak kedua, gaya jawabannya jadi seragam. Studi 2024 nyatet keragaman bahasa AI turun tiap generasi, paling parah buat tugas kreatif.
Studi lain nemuin jawaban berbagai merek AI ternyata lebih mirip satu sama lain, dibanding jawaban antarmanusia.
Artinya buat kamu: kalau semua orang minta caption ke AI, jangan kaget beranda HP kedengeran kayak paduan suara. Satu nada semua.
Dampak ketiga paling deket sama kita nih. Peneliti Amazon, Thompson dan timnya, ngecek isi web di bahasa yang stok tulisannya dikit.
Ternyata, terjemahan mesin udah jadi bagian gede banget dari isi web di bahasa-bahasa itu.
[thoughtful] Nah, ini tebakanku sendiri ya, belum ada risetnya. Bahasa daerah kita, kayak Jawa, Sunda, Bali, atau Batak, bisa masuk kelompok paling rawan.
Tulisan aslinya emang sedikit sih, tapi terjemahan mesinnya makin banyak. Kalau AI belajar dari situ, ungkapan khasnya bisa pudar, kayak fotokopian kesepuluh tadi.
Dampak keempat kayak fiksi ilmiah. Tulisan murni manusia sebelum era ChatGPT mulai diburu kayak barang antik.
Mirip kisah besi baja. Habis uji bom atom dulu, baja baru ikut kecemar radiasi tipis. Alat ukur peka akhirnya butuh baja tua sebelum era bom.
Analogi ini dipake buat tulisan. John Graham-Cumming bikin arsip lowbackgroundsteel.ai. Isinya antara lain salinan Wikipedia Inggris Agustus 2022, sebelum banjir tulisan AI.
Terus ada wordfreq, alat ngitung seringnya kata dipake manusia. Pembuatnya berhenti update gara-gara sumbernya udah kecemar tulisan AI.
Gejalanya lucu: kata Inggris "delve", artinya mendalami, tiba-tiba loncat sepuluh kali lipat. [deadpan] Coba tebak deh siapa yang paling hobi make kata itu.
Gimana cara bedain tulisan AI? Google DeepMind punya SynthID, tanda air tak kasatmata di tulisan AI. Udah diuji di hampir dua puluh juta jawaban Gemini.
Masalahnya, tanda air ini rapuh. Ditulis ulang dikit kalimatnya, atau diterjemahin bolak-balik, jejaknya langsung luntur jauh.
[serious] Jadi, apakah AI pasti makin bodoh? Kabar baiknya, nggak harus gitu kok.
Studi 2024 nguji dua skenario. Kalau data asli dibuang terus diganti tulisan AI tiap generasi, kepintaran mesin emang ambruk. Tapi kalau data aslinya disimpen dan tulisan AI cuma tambahan, keruntuhan bisa dihindari.
Laporan Stanford AI Index 2026 juga nyimpulin hal yang sama.
Balik ke fotokopi tadi. Masalahnya bukan di mesinnya. Masalah baru muncul kalau lembar aslinya ikut dibuang.
Bahan latihan bikinan mesin malah bisa sukses gede, asal ada pemeriksanya. AlphaGeometry dilatih pakai sekitar seratus juta soal geometri buatan mesin.
Hasilnya, dua puluh lima dari tiga puluh soal geometri olimpiade berhasil dipecahin. Metode terbaik sebelumnya cuma sanggup sepuluh.
Adiknya, AlphaProof, nulis bukti matematika yang dicek komputer langkah demi langkah. Bareng AlphaGeometry 2, nilainya setara perak Olimpiade Matematika Internasional 2024.
Kuncinya satu: ada wasit yang nggak bisa dibohongin. Di matematika, komputer bisa jadi wasitnya. Di obrolan sehari-hari, wasitnya ya... masih kita, manusia.
Nah, di sinilah Indonesia masuk ke cerita.
[curious] Kalau tulisan manusia udah langka, stok tulisan bahasa Indonesia di internet itu masuk yang mana? Banyak, atau tipis?
Menurut statistik Common Crawl, arsip web raksasa buat ngelatih AI, porsi halaman bahasa Indonesia itu masih jauh di bawah bahasa Inggris.
Gimana sama bahasa daerah kita? Wah, kemungkinan jauh lebih tipis lagi.
Celah ini yang coba ditambal Sahabat-AI. Model raksasanya punya tujuh puluh miliar parameter, ibarat sel penghubung di otak buatan. Rilis Juni 2025, dia udah bisa bahasa Indonesia, Jawa, Sunda, Bali, dan Batak.
Tapi sepinter apa pun AI lokal kita, dia tetap butuh bacaan lokal yang beneran ditulis manusia.
Terus gimana aturannya? Dua rancangan Perpres soal peta jalan dan etika AI udah rampung dibahas antarkementerian Mei 2026.
Awal September, kabarnya tinggal nunggu tanda tangan Presiden aja. Cuma sampai riset ini kelar, belum ada bukti keduanya udah terbit.
Sekarang jawaban pertanyaan bab dua tadi. Meta udah bilang terang-terangan kalau postingan publik di Facebook dan Instagram, termasuk foto dan tulisannya, dipake ngelatih AI mereka.
Artinya buat kamu: tiap status dan komentar publikmu bisa jadi bahan belajar mesin. Kalau keberatan, gembok aja akunmu jadi privat biar risikonya lebih kecil.
Tapi liat juga sisi lainnya. Makin penuh internet sama tulisan mesin, tulisan asli manusia justru makin berharga. Makalah Nature tadi juga bilang gitu.
Ulasan warung di kampungmu, resep nenek, atau cerita bahasa Sunda dan Bugis. Itu bukan remah internet, tapi penjaga yang bikin mesin tetap waras.
Jadi, balik ke pertanyaan awal. Kalau tulisan manusia makin tipis, AI belajar dari mana?
Dari soal yang bisa dicek langsung sama mesin. Dari coba-coba dan pengalaman. Sama dari tulisan AI juga, asal nggak ngebuang yang asli.
Soalnya semua jalan yang berhasil punya satu syarat: jangkar ke dunia nyata. Wasit yang jujur, alam nyata, atau tulisan manusia yang asli.
[pause] Dan di internet yang makin rame ditulis mesin, jangkar itu... ternyata ya kita sendiri.
Intinya simpel: AI nggak kehabisan cara belajar, tapi makin bergantung sama tulisan manusia yang jujur.
[warmly] Menurutku ini kabar baik yang bikin senyum. Di era mesin pintar, yang paling langka justru suara asli kita.
Sekarang giliran kamu cerita. Tulis di komentar ya: bahasa daerahmu apa, dan pernah nggak kamu nulis pakai bahasa itu di internet?
Kalau tulisan manusia makin mahal, sebenarnya ada lho orang yang dibayar khusus buat ngajarin AI. Siapa mereka? Itu cerita kita berikutnya.
[mischievously] Dan tenang aja... kuotamu aman kok. Yang perlu kita jaga, itu isinya.
```

## 3. Timeline media (perkiraan)

Detik dihitung dari panjang kalimat (±2,5 kata/dtk). Ini PERKIRAAN untuk editor: geser, potong, atau tahan sesuai VO asli
dan ritme; tidak harus plek-ketiplek.

| Detik | Beat | Kalimat | Cue | Isi |
|---|---|---|---|---|
| 0:00–0:03 | Hook | Internet hampir habis. Bukan kuotamu... tapi isinya. | SFX | klik notifikasi lalu hening sesaat → assets/stok-situs/mixkit-sfx-mouse-click-close-1113.wav |
| 0:00–0:03 | Hook | Internet hampir habis. Bukan kuotamu... tapi isinya. | VISUAL | Cold Open — layar HP dengan notifikasi "Kuota hampir habis", dicoret keras, diganti "ISI INTERNET HAMPIR HABIS" |
| 0:00–0:03 | Hook | Internet hampir habis. Bukan kuotamu... tapi isinya. | ASET | Mockup notifikasi kuota HP generik |
| 0:03–0:06 | Hook | Gitu kata salah satu pendiri OpenAI, pembuat ChatGPT. | SFX | whoosh pendek → assets/stok-situs/mixkit-sfx-fast-whoosh-transition-1490.wav |
| 0:03–0:06 | Hook | Gitu kata salah satu pendiri OpenAI, pembuat ChatGPT. | MUSIK | bed tegang pelan masuk (Vastness) |
| 0:03–0:06 | Hook | Gitu kata salah satu pendiri OpenAI, pembuat ChatGPT. | ASET | Musik Vastness |
| 0:06–0:14 | Peta | Namanya Ilya Sutskever. Di kumpul ilmuwan AI dunia, NeurIPS, | VISUAL | Kartu Nama — "Ilya Sutskever — salah satu pendiri OpenAI" |
| 0:06–0:14 | Peta | Namanya Ilya Sutskever. Di kumpul ilmuwan AI dunia, NeurIPS, | ASET | Kartu nama grafis Sutskever |
| 0:14–0:20 | Peta | Cadangan bacaan kita udah mentok, katanya. Nggak ada sumur b | VISUAL | Kutipan Dokumen — judul The Verge, sorot kata "peak data" |
| 0:14–0:20 | Peta | Cadangan bacaan kita udah mentok, katanya. Nggak ada sumur b | ASET | Judul The Verge soal Sutskever dan peak data |
| 0:14–0:20 | Peta | Cadangan bacaan kita udah mentok, katanya. Nggak ada sumur b | TEKS | Sumber: The Verge, 14 Des 2024 |
| 0:20–0:28 | Peta | Grafiknya emang bikin kaget. Satu model AI sekarang aja udah | VISUAL | Grafik Data — batang model AI tumbuh mendekati garis stok |
| 0:20–0:28 | Peta | Grafiknya emang bikin kaget. Satu model AI sekarang aja udah | ASET | Grafik data latih vs stok teks manusia |
| 0:20–0:28 | Peta | Grafiknya emang bikin kaget. Satu model AI sekarang aja udah | TEKS | Sumber: Epoch AI 2024; Meta; Qwen 2025 |
| 0:28–0:33 | Peta | Nah, kalau tulisan manusia ini habis, terus AI mau belajar d | VISUAL | teks kinetik — pertanyaan judul memenuhi layar |
| 0:28–0:33 | Peta | Nah, kalau tulisan manusia ini habis, terus AI mau belajar d | MUSIK | satu ketukan hening |
| 0:33–0:48 | Peta | Di video ini kita bakal bahas lima hal. Pertama, emang bener | VISUAL | Peta Bab — lima ikon menyala satu per satu, ikon keempat paling besar |
| 0:33–0:48 | Peta | Di video ini kita bakal bahas lima hal. Pertama, emang bener | ASET | Peta lima bab |
| 0:33–0:48 | Peta | Di video ini kita bakal bahas lima hal. Pertama, emang bener | SFX | klik kecil per ikon |
| 0:48–0:53 | Peta | Termasuk buat status dan foto yang baru kamu upload tadi pag | VISUAL | B-roll — jari mengetik di laptop |
| 0:48–0:53 | Peta | Termasuk buat status dan foto yang baru kamu upload tadi pag | ASET | Tangan mengetik di laptop |
| 0:53–0:58 | Bab 1 · Benarkah habis? | Tapi tunggu dulu. Internet kan luas banget ya. Masa iya sih  | SFX | whoosh transisi bab → assets/stok-situs/pixabay-sfx-whoosh-sound-effect-cinematic-376875.mp3 |
| 0:53–0:58 | Bab 1 · Benarkah habis? | Tapi tunggu dulu. Internet kan luas banget ya. Masa iya sih  | VISUAL | B-roll — lorong server berlampu LED |
| 0:53–0:58 | Bab 1 · Benarkah habis? | Tapi tunggu dulu. Internet kan luas banget ya. Masa iya sih  | ASET | Ruang server gelap berlampu LED |
| 0:53–0:58 | Bab 1 · Benarkah habis? | Tapi tunggu dulu. Internet kan luas banget ya. Masa iya sih  | TEKS | Bab 1 — Benarkah Habis? |
| 0:58–1:04 | Bab 1 · Benarkah habis? | Kenalan dulu sama satuannya: token. Token itu potongan kecil | VISUAL | Concept Explainer — kalimat "Aku suka nasi goreng" dipotong jadi keping-keping berwarna |
| 0:58–1:04 | Bab 1 · Benarkah habis? | Kenalan dulu sama satuannya: token. Token itu potongan kecil | ASET | Animasi token |
| 1:04–1:09 | Bab 1 · Benarkah habis? | AI nyicil baca dunia per potongan ini, persis kayak kita mak | VISUAL | keping token masuk ke ikon kepala robot satu per satu |
| 1:09–1:18 | Bab 1 · Benarkah habis? | Tahap belajar AI paling awal dan paling rakus namanya pretra | VISUAL | B-roll — rak buku perpustakaan |
| 1:09–1:18 | Bab 1 · Benarkah habis? | Tahap belajar AI paling awal dan paling rakus namanya pretra | ASET | Lorong perpustakaan penuh buku |
| 1:09–1:18 | Bab 1 · Benarkah habis? | Tahap belajar AI paling awal dan paling rakus namanya pretra | TEKS | Pretraining = tahap belajar awal dari bacaan dalam jumlah raksasa |
| 1:18–1:26 | Bab 1 · Benarkah habis? | Terus, lembaga riset Epoch AI ngitung: ada berapa banyak tul | VISUAL | Kutipan Dokumen — halaman Epoch, sorot angka |
| 1:18–1:26 | Bab 1 · Benarkah habis? | Terus, lembaga riset Epoch AI ngitung: ada berapa banyak tul | ASET | Halaman studi Epoch AI soal habisnya data |
| 1:18–1:26 | Bab 1 · Benarkah habis? | Terus, lembaga riset Epoch AI ngitung: ada berapa banyak tul | TEKS | ±300 triliun token |
| 1:18–1:26 | Bab 1 · Benarkah habis? | Terus, lembaga riset Epoch AI ngitung: ada berapa banyak tul | TEKS | Sumber: Epoch AI, 6 Jun 2024 |
| 1:26–1:32 | Bab 1 · Benarkah habis? | Angka segitu udah nyaring tulisan yang bagus aja, termasuk k | VISUAL | Kutipan Dokumen — abstrak arXiv versi makalah |
| 1:26–1:32 | Bab 1 · Benarkah habis? | Angka segitu udah nyaring tulisan yang bagus aja, termasuk k | ASET | Abstrak makalah Epoch di arXiv |
| 1:26–1:32 | Bab 1 · Benarkah habis? | Angka segitu udah nyaring tulisan yang bagus aja, termasuk k | TEKS | Sumber: arXiv 2211.04325, versi 4 Jun 2024 |
| 1:32–1:44 | Bab 1 · Benarkah habis? | Sekarang liat nafsu makannya. Llama 3 buatan Meta dilatih pa | VISUAL | Grafik Data — tiga batang naik berurutan, garis stok di atas |
| 1:32–1:44 | Bab 1 · Benarkah habis? | Sekarang liat nafsu makannya. Llama 3 buatan Meta dilatih pa | ASET | Grafik data latih vs stok teks manusia |
| 1:32–1:44 | Bab 1 · Benarkah habis? | Sekarang liat nafsu makannya. Llama 3 buatan Meta dilatih pa | TEKS | Sumber: Meta 2024–2025; Qwen 2025 |
| 1:44–1:50 | Bab 1 · Benarkah habis? | Satu model aja udah ngabisin sepersepuluh tulisan publik man | MUSIK | turun sesaat |
| 1:44–1:50 | Bab 1 · Benarkah habis? | Satu model aja udah ngabisin sepersepuluh tulisan publik man | VISUAL | piring raksasa berisi tumpukan buku, garpu robot |
| 1:50–1:57 | Bab 1 · Benarkah habis? | Kapan habisnya? Kata Epoch, bahan belajar AI bakal nyamain s | VISUAL | Linimasa — rentang 2026–2032 menyala |
| 1:50–1:57 | Bab 1 · Benarkah habis? | Kapan habisnya? Kata Epoch, bahan belajar AI bakal nyamain s | TEKS | Sumber: Epoch AI, 6 Jun 2024 |
| 1:57–2:06 | Bab 1 · Benarkah habis? | Perhatiin tahun pertamanya: dua ribu dua puluh enam. Itu kan | VISUAL | penanda "KITA DI SINI" jatuh di angka 2026 |
| 1:57–2:06 | Bab 1 · Benarkah habis? | Perhatiin tahun pertamanya: dua ribu dua puluh enam. Itu kan | SFX | impact berat |
| 2:06–2:14 | Bab 1 · Benarkah habis? | Tapi jangan salah paham dulu soal kata "habis". Tulisan di i | VISUAL | B-roll — map dan dokumen digital beterbangan |
| 2:06–2:14 | Bab 1 · Benarkah habis? | Tapi jangan salah paham dulu soal kata "habis". Tulisan di i | ASET | Animasi map dan dokumen |
| 2:14–2:28 | Bab 1 · Benarkah habis? | Maksud Epoch tuh gini: jatah bacaan AI udah mentok nyamain s | VISUAL | Concept Explainer — rak kitab, semua punggung buku diberi centang |
| 2:14–2:28 | Bab 1 · Benarkah habis? | Maksud Epoch tuh gini: jatah bacaan AI udah mentok nyamain s | TEKS | "Habis" = dataset menyamai stok, bukan teks lenyap |
| 2:28–2:33 | Bab 1 · Benarkah habis? | Setahun kemudian, Sutskever masih bilang hal yang sama: beka | VISUAL | Kutipan Dokumen — halaman wawancara Dwarkesh |
| 2:28–2:33 | Bab 1 · Benarkah habis? | Setahun kemudian, Sutskever masih bilang hal yang sama: beka | ASET | Wawancara Sutskever di Dwarkesh Podcast |
| 2:28–2:33 | Bab 1 · Benarkah habis? | Setahun kemudian, Sutskever masih bilang hal yang sama: beka | TEKS | Sumber: Dwarkesh Podcast, 25 Nov 2025 |
| 2:33–2:40 | Bab 1 · Benarkah habis? | Begitu sadar stoknya terbatas, kejadian deh hal yang selalu  | SFX | gembok mengunci |
| 2:33–2:40 | Bab 1 · Benarkah habis? | Begitu sadar stoknya terbatas, kejadian deh hal yang selalu  | VISUAL | B-roll — gerbang terkunci gembok kuning |
| 2:33–2:40 | Bab 1 · Benarkah habis? | Begitu sadar stoknya terbatas, kejadian deh hal yang selalu  | ASET | Gerbang terkunci gembok kuning |
| 2:40–2:45 | Bab 2 · Internet mulai dipagari, lalu dijual | Kalau tulisanmu ternyata jadi bahan baku AI bernilai miliara | SFX | whoosh transisi bab → assets/stok-situs/pixabay-sfx-whoosh-sound-effect-cinematic-376875.mp3 |
| 2:40–2:45 | Bab 2 · Internet mulai dipagari, lalu dijual | Kalau tulisanmu ternyata jadi bahan baku AI bernilai miliara | MUSIK | bed pindah ke Tutorial Explainer, tempo sedang |
| 2:40–2:45 | Bab 2 · Internet mulai dipagari, lalu dijual | Kalau tulisanmu ternyata jadi bahan baku AI bernilai miliara | ASET | Musik Tutorial Explainer |
| 2:40–2:45 | Bab 2 · Internet mulai dipagari, lalu dijual | Kalau tulisanmu ternyata jadi bahan baku AI bernilai miliara | TEKS | Bab 2 — Internet Mulai Dipagari |
| 2:45–2:53 | Bab 2 · Internet mulai dipagari, lalu dijual | Tiap situs punya catatan kecil bernama robots.txt. Anggap aj | VISUAL | Concept Explainer — ikon situs bergembok dan papan robots.txt |
| 2:45–2:53 | Bab 2 · Internet mulai dipagari, lalu dijual | Tiap situs punya catatan kecil bernama robots.txt. Anggap aj | ASET | Ilustrasi internet dipagari |
| 2:53–2:57 | Bab 2 · Internet mulai dipagari, lalu dijual | Robot di sini maksudnya program penyedot halaman milik perus | VISUAL | B-roll — jaringan node digital bergerak |
| 2:53–2:57 | Bab 2 · Internet mulai dipagari, lalu dijual | Robot di sini maksudnya program penyedot halaman milik perus | ASET | Jaringan node digital |
| 2:57–3:02 | Bab 2 · Internet mulai dipagari, lalu dijual | Nah, peneliti Data Provenance Initiative ngecek C4, gudang b | VISUAL | Kutipan Dokumen — judul "Consent in Crisis" |
| 2:57–3:02 | Bab 2 · Internet mulai dipagari, lalu dijual | Nah, peneliti Data Provenance Initiative ngecek C4, gudang b | ASET | Makalah Consent in Crisis di arXiv |
| 2:57–3:02 | Bab 2 · Internet mulai dipagari, lalu dijual | Nah, peneliti Data Provenance Initiative ngecek C4, gudang b | TEKS | Sumber: Longpre dkk., arXiv, 20 Jul 2024 |
| 3:02–3:11 | Bab 2 · Internet mulai dipagari, lalu dijual | Hasilnya bikin kaget. Dalam setahun sampai April 2024, lebih | VISUAL | Grafik Data — batang "dibatasi" melompat |
| 3:02–3:11 | Bab 2 · Internet mulai dipagari, lalu dijual | Hasilnya bikin kaget. Dalam setahun sampai April 2024, lebih | ASET | Grafik internet dipagari (C4) |
| 3:02–3:11 | Bab 2 · Internet mulai dipagari, lalu dijual | Hasilnya bikin kaget. Dalam setahun sampai April 2024, lebih | TEKS | 28%+ token sumber kritis C4 |
| 3:02–3:11 | Bab 2 · Internet mulai dipagari, lalu dijual | Hasilnya bikin kaget. Dalam setahun sampai April 2024, lebih | TEKS | Sumber: Data Provenance Initiative, 2024 |
| 3:11–3:16 | Bab 2 · Internet mulai dipagari, lalu dijual | Bayangin perpustakaan umum yang dalam setahun, lebih dari se | VISUAL | B-roll — gembok emas di pagar kawat |
| 3:11–3:16 | Bab 2 · Internet mulai dipagari, lalu dijual | Bayangin perpustakaan umum yang dalam setahun, lebih dari se | ASET | Gembok emas di pagar kawat |
| 3:16–3:24 | Bab 2 · Internet mulai dipagari, lalu dijual | Juli 2025, Cloudflare ikut ngubah aturan main. Penjaga lalu  | VISUAL | Kutipan Dokumen — siaran pers Cloudflare |
| 3:16–3:24 | Bab 2 · Internet mulai dipagari, lalu dijual | Juli 2025, Cloudflare ikut ngubah aturan main. Penjaga lalu  | ASET | Siaran pers Cloudflare blokir crawler AI |
| 3:16–3:24 | Bab 2 · Internet mulai dipagari, lalu dijual | Juli 2025, Cloudflare ikut ngubah aturan main. Penjaga lalu  | TEKS | Sumber: Cloudflare, 1 Jul 2025 |
| 3:24–3:31 | Bab 2 · Internet mulai dipagari, lalu dijual | Bikin situs baru langsung ditanya soal izin. Dari setelan aw | VISUAL | Kutipan Dokumen — blog "pay per crawl" |
| 3:24–3:31 | Bab 2 · Internet mulai dipagari, lalu dijual | Bikin situs baru langsung ditanya soal izin. Dari setelan aw | ASET | Blog Cloudflare pay per crawl |
| 3:24–3:31 | Bab 2 · Internet mulai dipagari, lalu dijual | Bikin situs baru langsung ditanya soal izin. Dari setelan aw | TEKS | Sumber: Cloudflare Blog, 1 Jul 2025 |
| 3:31–3:39 | Bab 2 · Internet mulai dipagari, lalu dijual | Ujungnya, dari pagar lahirlah loket. Reddit dikabarin nerima | SFX | mesin kasir |
| 3:31–3:39 | Bab 2 · Internet mulai dipagari, lalu dijual | Ujungnya, dari pagar lahirlah loket. Reddit dikabarin nerima | VISUAL | Kutipan Dokumen — judul laporan Reuters via The Star |
| 3:31–3:39 | Bab 2 · Internet mulai dipagari, lalu dijual | Ujungnya, dari pagar lahirlah loket. Reddit dikabarin nerima | ASET | Laporan Reddit-Google lisensi konten AI |
| 3:31–3:39 | Bab 2 · Internet mulai dipagari, lalu dijual | Ujungnya, dari pagar lahirlah loket. Reddit dikabarin nerima | TEKS | Angka dilaporkan media, bukan resmi |
| 3:31–3:39 | Bab 2 · Internet mulai dipagari, lalu dijual | Ujungnya, dari pagar lahirlah loket. Reddit dikabarin nerima | TEKS | Sumber: Reuters via The Star, 22 Feb 2024 |
| 3:39–3:44 | Bab 2 · Internet mulai dipagari, lalu dijual | Urusan buku juga rame. Anthropic, pembuat chatbot Claude, di | VISUAL | Kutipan Dokumen — judul TechCrunch |
| 3:39–3:44 | Bab 2 · Internet mulai dipagari, lalu dijual | Urusan buku juga rame. Anthropic, pembuat chatbot Claude, di | ASET | Judul TechCrunch soal penyelesaian Anthropic US$1,5 miliar |
| 3:44–3:51 | Bab 2 · Internet mulai dipagari, lalu dijual | Kata hakim, ngelatih AI pakai buku yang dibeli resmi itu mas | VISUAL | teks kinetik — dua kolom "buku dibeli sah = penggunaan wajar" vs "buku dari situs bajakan = dipersoalkan" |
| 3:51–3:58 | Bab 2 · Internet mulai dipagari, lalu dijual | Akhirnya Anthropic pilih damai satu koma lima miliar dolar,  | SFX | impact berat di angka |
| 3:51–3:58 | Bab 2 · Internet mulai dipagari, lalu dijual | Akhirnya Anthropic pilih damai satu koma lima miliar dolar,  | VISUAL | angka US$1,5 miliar menghantam layar, lalu pecah jadi "≈US$3.000 per karya" |
| 3:51–3:58 | Bab 2 · Internet mulai dipagari, lalu dijual | Akhirnya Anthropic pilih damai satu koma lima miliar dolar,  | TEKS | Sumber: TechCrunch, 21 Jul 2026 |
| 3:58–4:05 | Bab 2 · Internet mulai dipagari, lalu dijual | Menurutku, ini titik balik. Dulu tulisan manusia dianggep ka | VISUAL | ilustrasi talang air hujan dengan meteran air |
| 3:58–4:05 | Bab 2 · Internet mulai dipagari, lalu dijual | Menurutku, ini titik balik. Dulu tulisan manusia dianggep ka | MUSIK | satu ketukan hening |
| 4:05–4:13 | Bab 2 · Internet mulai dipagari, lalu dijual | Di Indonesia juga mulai kerasa. Sahabat-AI, program AI lokal | VISUAL | Kutipan Dokumen — berita Tempo |
| 4:05–4:13 | Bab 2 · Internet mulai dipagari, lalu dijual | Di Indonesia juga mulai kerasa. Sahabat-AI, program AI lokal | ASET | Berita Tempo soal media gabung Sahabat-AI |
| 4:05–4:13 | Bab 2 · Internet mulai dipagari, lalu dijual | Di Indonesia juga mulai kerasa. Sahabat-AI, program AI lokal | TEKS | Sumber: Tempo, 21 Jun 2025 |
| 4:13–4:18 | Bab 2 · Internet mulai dipagari, lalu dijual | Tujuannya simpel: biar AI lokal ini beneran paham bahasa dan | VISUAL | Kutipan Dokumen — siaran pers GoTo, sorot daftar mitra media |
| 4:13–4:18 | Bab 2 · Internet mulai dipagari, lalu dijual | Tujuannya simpel: biar AI lokal ini beneran paham bahasa dan | ASET | Siaran pers GoTo Sahabat-AI 70B |
| 4:13–4:18 | Bab 2 · Internet mulai dipagari, lalu dijual | Tujuannya simpel: biar AI lokal ini beneran paham bahasa dan | TEKS | Sumber: GoTo, 2 Jun 2025 |
| 4:18–4:26 | Bab 2 · Internet mulai dipagari, lalu dijual | Nah, kalau berita aja ada harganya, terus gimana sama koment | VISUAL | teks kinetik — "Komentarmu dihargai berapa?" lalu stempel "DIJAWAB DI BAB 5" |
| 4:26–4:33 | Bab 2 · Internet mulai dipagari, lalu dijual | Karena pagar makin tinggi dan loket makin mahal, pembuat AI  | SFX | whoosh pendek |
| 4:26–4:33 | Bab 2 · Internet mulai dipagari, lalu dijual | Karena pagar makin tinggi dan loket makin mahal, pembuat AI  | VISUAL | tiga jalan setapak bercabang |
| 4:33–4:40 | Bab 3 · Tiga jalan keluar | Nggak boleh lagi nyontek catatan temen? Pilihannya tinggal t | SFX | whoosh transisi bab → assets/stok-situs/mixkit-sfx-fast-whoosh-transition-1490.wav |
| 4:33–4:40 | Bab 3 · Tiga jalan keluar | Nggak boleh lagi nyontek catatan temen? Pilihannya tinggal t | VISUAL | Concept Explainer — peta tiga jalan keluar |
| 4:33–4:40 | Bab 3 · Tiga jalan keluar | Nggak boleh lagi nyontek catatan temen? Pilihannya tinggal t | ASET | Peta tiga jalan keluar |
| 4:33–4:40 | Bab 3 · Tiga jalan keluar | Nggak boleh lagi nyontek catatan temen? Pilihannya tinggal t | TEKS | Bab 3 — Tiga Jalan Keluar |
| 4:40–4:48 | Bab 3 · Tiga jalan keluar | Pertama, AI ngajarin AI. Namanya data sintetis, bahan belaja | VISUAL | ikon robot besar menulis lembar soal untuk robot kecil |
| 4:40–4:48 | Bab 3 · Tiga jalan keluar | Pertama, AI ngajarin AI. Namanya data sintetis, bahan belaja | TEKS | Data sintetis = bahan belajar buatan mesin |
| 4:48–4:58 | Bab 3 · Tiga jalan keluar | Contohnya Phi-4 dari Microsoft, akhir 2024. Sebagian besar b | VISUAL | Kutipan Dokumen — makalah Phi-4 |
| 4:48–4:58 | Bab 3 · Tiga jalan keluar | Contohnya Phi-4 dari Microsoft, akhir 2024. Sebagian besar b | ASET | Makalah Phi-4 di arXiv |
| 4:48–4:58 | Bab 3 · Tiga jalan keluar | Contohnya Phi-4 dari Microsoft, akhir 2024. Sebagian besar b | TEKS | Sumber: Microsoft (arXiv), 12 Des 2024 |
| 4:58–5:08 | Bab 3 · Tiga jalan keluar | Cuma ya gitu, laporan Stanford AI Index 2026 ngingetin janga | VISUAL | Kutipan Dokumen — halaman AI Index |
| 4:58–5:08 | Bab 3 · Tiga jalan keluar | Cuma ya gitu, laporan Stanford AI Index 2026 ngingetin janga | ASET | Stanford AI Index 2026 bab riset |
| 4:58–5:08 | Bab 3 · Tiga jalan keluar | Cuma ya gitu, laporan Stanford AI Index 2026 ngingetin janga | TEKS | Sumber: Stanford HAI, AI Index 2026 |
| 5:08–5:12 | Bab 3 · Tiga jalan keluar | Kedua, AI belajar sendiri lewat coba-coba. Istilahnya reinfo | VISUAL | B-roll — papan Go kayu disusun |
| 5:08–5:12 | Bab 3 · Tiga jalan keluar | Kedua, AI belajar sendiri lewat coba-coba. Istilahnya reinfo | ASET | Tangan menyusun papan Go |
| 5:12–5:20 | Bab 3 · Tiga jalan keluar | Mirip belajar naik sepeda: jatuh, coba lagi, seneng pas berh | VISUAL | ilustrasi sepeda goyang lalu stabil, poin +1 muncul |
| 5:12–5:20 | Bab 3 · Tiga jalan keluar | Mirip belajar naik sepeda: jatuh, coba lagi, seneng pas berh | TEKS | Reinforcement learning = belajar dari coba-coba dan nilai |
| 5:20–5:30 | Bab 3 · Tiga jalan keluar | Contoh tenarnya AlphaGo Zero dari DeepMind, tahun 2017. Pas  | VISUAL | Kutipan Dokumen — makalah Nature AlphaGo Zero |
| 5:20–5:30 | Bab 3 · Tiga jalan keluar | Contoh tenarnya AlphaGo Zero dari DeepMind, tahun 2017. Pas  | ASET | Makalah Nature AlphaGo Zero |
| 5:20–5:30 | Bab 3 · Tiga jalan keluar | Contoh tenarnya AlphaGo Zero dari DeepMind, tahun 2017. Pas  | TEKS | Sumber: Nature, 19 Okt 2017 |
| 5:30–5:36 | Bab 3 · Tiga jalan keluar | Habis itu dia ngelawan versi lama yang pernah ngalahin juara | SFX | impact berat |
| 5:30–5:36 | Bab 3 · Tiga jalan keluar | Habis itu dia ngelawan versi lama yang pernah ngalahin juara | VISUAL | papan skor 100–0 slam |
| 5:36–5:45 | Bab 3 · Tiga jalan keluar | Jurus serupa dipake DeepSeek-R1, yang masuk jurnal Nature Se | VISUAL | Kutipan Dokumen — makalah Nature DeepSeek-R1 |
| 5:36–5:45 | Bab 3 · Tiga jalan keluar | Jurus serupa dipake DeepSeek-R1, yang masuk jurnal Nature Se | ASET | Makalah Nature DeepSeek-R1 |
| 5:36–5:45 | Bab 3 · Tiga jalan keluar | Jurus serupa dipake DeepSeek-R1, yang masuk jurnal Nature Se | TEKS | Sumber: Nature, 17 Sep 2025 |
| 5:45–5:50 | Bab 3 · Tiga jalan keluar | Cara ini ampuh banget buat soal yang jawabannya pasti, kayak | VISUAL | centang hijau di jawaban soal hitungan |
| 5:50–6:00 | Bab 3 · Tiga jalan keluar | Tapi ada tapinya. Studi 2025 nemuin hasil coba-coba ini teta | VISUAL | teks kinetik — robot memanjat tangga yang berujung plafon |
| 5:50–6:00 | Bab 3 · Tiga jalan keluar | Tapi ada tapinya. Studi 2025 nemuin hasil coba-coba ini teta | TEKS | Sumber: Yue dkk., arXiv, 18 Apr 2025 |
| 6:00–6:06 | Bab 3 · Tiga jalan keluar | Peneliti DeepMind sampai nulis esai soal "era pengalaman". P | VISUAL | Kutipan Dokumen — halaman pertama esai "Welcome to the Era of Experience" |
| 6:00–6:06 | Bab 3 · Tiga jalan keluar | Peneliti DeepMind sampai nulis esai soal "era pengalaman". P | ASET | Esai Era of Experience |
| 6:00–6:06 | Bab 3 · Tiga jalan keluar | Peneliti DeepMind sampai nulis esai soal "era pengalaman". P | TEKS | Sumber: Google DeepMind (Silver & Sutton), Apr 2025 |
| 6:06–6:11 | Bab 3 · Tiga jalan keluar | Jalan ketiga paling nampar gengsi mesin: belajar dari dunia  | VISUAL | B-roll — lengan robot di pabrik |
| 6:06–6:11 | Bab 3 · Tiga jalan keluar | Jalan ketiga paling nampar gengsi mesin: belajar dari dunia  | ASET | Lengan robot di fasilitas produksi |
| 6:11–6:21 | Bab 3 · Tiga jalan keluar | Peneliti Stanford, Michael Frank, ngebandingin gini. GPT-3 b | VISUAL | Kutipan Dokumen — artikel Stanford |
| 6:11–6:21 | Bab 3 · Tiga jalan keluar | Peneliti Stanford, Michael Frank, ngebandingin gini. GPT-3 b | ASET | Artikel Stanford Engineering soal anak vs GPT-3 |
| 6:11–6:21 | Bab 3 · Tiga jalan keluar | Peneliti Stanford, Michael Frank, ngebandingin gini. GPT-3 b | TEKS | Sumber: Stanford Engineering, 9 Feb 2024 |
| 6:11–6:21 | Bab 3 · Tiga jalan keluar | Peneliti Stanford, Michael Frank, ngebandingin gini. GPT-3 b | ASET | Anak menunjuk buku cerita |
| 6:21–6:25 | Bab 3 · Tiga jalan keluar | Selisihnya kira-kira tiga puluh tiga ribu kali lipat! | JEDA | 1 dtk sebelum angka |
| 6:21–6:25 | Bab 3 · Tiga jalan keluar | Selisihnya kira-kira tiga puluh tiga ribu kali lipat! | VISUAL | Skala Absurd — gunung buku setinggi gedung di sisi GPT-3, satu buku tipis di sisi anak |
| 6:21–6:25 | Bab 3 · Tiga jalan keluar | Selisihnya kira-kira tiga puluh tiga ribu kali lipat! | ASET | Skala absurd anak vs GPT-3 |
| 6:21–6:25 | Bab 3 · Tiga jalan keluar | Selisihnya kira-kira tiga puluh tiga ribu kali lipat! | SFX | impact berat |
| 6:25–6:28 | Bab 3 · Tiga jalan keluar | Dan bocahnya udah pinter banget minta susu. | VISUAL | B-roll anak membaca dipertahankan sejenak |
| 6:25–6:28 | Bab 3 · Tiga jalan keluar | Dan bocahnya udah pinter banget minta susu. | MUSIK | naik lagi |
| 6:28–6:36 | Bab 3 · Tiga jalan keluar | Ketiga jalan ini keliatannya menjanjikan. Cuma, jalan pertam | SFX | dengung pelan |
| 6:28–6:36 | Bab 3 · Tiga jalan keluar | Ketiga jalan ini keliatannya menjanjikan. Cuma, jalan pertam | MUSIK | turun ke bed gelap |
| 6:28–6:36 | Bab 3 · Tiga jalan keluar | Ketiga jalan ini keliatannya menjanjikan. Cuma, jalan pertam | VISUAL | kamera mendekat ke ikon robot yang membaca tulisan robot |
| 6:36–6:40 | Bab 4 · Kalau AI belajar dari AI | Pernah nggak fotokopi dari hasil fotokopian? Terus difotokop | SFX | suara mesin fotokopi → assets/stok-situs/pixabay-sfx-hit-copy-machine-sound-effect-77968.mp3 |
| 6:36–6:40 | Bab 4 · Kalau AI belajar dari AI | Pernah nggak fotokopi dari hasil fotokopian? Terus difotokop | VISUAL | B-roll — mesin cetak berputar cepat |
| 6:36–6:40 | Bab 4 · Kalau AI belajar dari AI | Pernah nggak fotokopi dari hasil fotokopian? Terus difotokop | ASET | Mesin cetak koran berkecepatan tinggi |
| 6:36–6:40 | Bab 4 · Kalau AI belajar dari AI | Pernah nggak fotokopi dari hasil fotokopian? Terus difotokop | TEKS | Bab 4 — Kalau AI Belajar dari AI |
| 6:40–6:49 | Bab 4 · Kalau AI belajar dari AI | Lembar pertama masih tajam. Lembar ketiga mulai buram. Pas l | VISUAL | Concept Explainer — diagram fotokopi dari fotokopi, tiap generasi makin pudar, detail pinggir hilang duluan |
| 6:40–6:49 | Bab 4 · Kalau AI belajar dari AI | Lembar pertama masih tajam. Lembar ketiga mulai buram. Pas l | ASET | Diagram fotokopi dari fotokopi |
| 6:49–6:56 | Bab 4 · Kalau AI belajar dari AI | Nah, itu gambaran model collapse, alias runtuhnya mutu AI. B | VISUAL | Kutipan Dokumen — makalah Nature model collapse |
| 6:49–6:56 | Bab 4 · Kalau AI belajar dari AI | Nah, itu gambaran model collapse, alias runtuhnya mutu AI. B | ASET | Makalah Nature soal model collapse |
| 6:49–6:56 | Bab 4 · Kalau AI belajar dari AI | Nah, itu gambaran model collapse, alias runtuhnya mutu AI. B | TEKS | Model collapse = model rusak karena belajar dari keluaran model |
| 6:49–6:56 | Bab 4 · Kalau AI belajar dari AI | Nah, itu gambaran model collapse, alias runtuhnya mutu AI. B | TEKS | Sumber: Nature, 24 Jul 2024 |
| 6:56–7:04 | Bab 4 · Kalau AI belajar dari AI | Pas AI dilatih berulang pakai tulisan AI sebelumnya, cacatny | VISUAL | kurva lonceng, kedua ujungnya terkikis tiap generasi |
| 7:04–7:11 | Bab 4 · Kalau AI belajar dari AI | Ekor ini maksudnya hal-hal unik dan langka. Kejadian jarang, | VISUAL | ujung kurva diberi label "langka" |
| 7:11–7:20 | Bab 4 · Kalau AI belajar dari AI | Bayangin AI generasi pertama masih tau resep kue khas satu k | VISUAL | ilustrasi kartu resep makin pudar, tinggal satu kartu "bolu" |
| 7:11–7:20 | Bab 4 · Kalau AI belajar dari AI | Bayangin AI generasi pertama masih tau resep kue khas satu k | TEKS | Ilustrasi |
| 7:20–7:26 | Bab 4 · Kalau AI belajar dari AI | Peneliti makalah itu ngasih catatan penting. Hal langka kaya | VISUAL | Kutipan Dokumen — sorot kalimat "often relevant to marginalized groups" di halaman Nature |
| 7:20–7:26 | Bab 4 · Kalau AI belajar dari AI | Peneliti makalah itu ngasih catatan penting. Hal langka kaya | TEKS | Sumber: Nature, 24 Jul 2024 |
| 7:26–7:32 | Bab 4 · Kalau AI belajar dari AI | Jadi yang terancam bukan cuma mutu jawabannya aja. Tapi siap | MUSIK | hening satu ketukan |
| 7:26–7:32 | Bab 4 · Kalau AI belajar dari AI | Jadi yang terancam bukan cuma mutu jawabannya aja. Tapi siap | SFX | impact pelan |
| 7:32–7:41 | Bab 4 · Kalau AI belajar dari AI | Ada istilah lain yang lebih ngeri: MAD, plesetan penyakit sa | VISUAL | Kutipan Dokumen — makalah MAD |
| 7:32–7:41 | Bab 4 · Kalau AI belajar dari AI | Ada istilah lain yang lebih ngeri: MAD, plesetan penyakit sa | ASET | Makalah MAD (Model Autophagy Disorder) di arXiv |
| 7:32–7:41 | Bab 4 · Kalau AI belajar dari AI | Ada istilah lain yang lebih ngeri: MAD, plesetan penyakit sa | TEKS | Sumber: Alemohammad dkk. (Rice), arXiv, 4 Jul 2023 |
| 7:32–7:41 | Bab 4 · Kalau AI belajar dari AI | Ada istilah lain yang lebih ngeri: MAD, plesetan penyakit sa | ASET | Berita Rice "Breaking MAD" |
| 7:41–7:49 | Bab 4 · Kalau AI belajar dari AI | Dampak kedua, gaya jawabannya jadi seragam. Studi 2024 nyate | VISUAL | palet warna yang makin abu-abu tiap generasi |
| 7:41–7:49 | Bab 4 · Kalau AI belajar dari AI | Dampak kedua, gaya jawabannya jadi seragam. Studi 2024 nyate | TEKS | Sumber: Guo dkk., NAACL Findings 2024 |
| 7:49–7:55 | Bab 4 · Kalau AI belajar dari AI | Studi lain nemuin jawaban berbagai merek AI ternyata lebih m | VISUAL | deretan gelembung chat AI identik vs gelembung manusia beraneka bentuk |
| 7:49–7:55 | Bab 4 · Kalau AI belajar dari AI | Studi lain nemuin jawaban berbagai merek AI ternyata lebih m | TEKS | Sumber: Wenger & Kenett, PNAS Nexus 2026 |
| 7:55–8:04 | Bab 4 · Kalau AI belajar dari AI | Artinya buat kamu: kalau semua orang minta caption ke AI, ja | VISUAL | linimasa media sosial fiktif, semua caption kembar |
| 7:55–8:04 | Bab 4 · Kalau AI belajar dari AI | Artinya buat kamu: kalau semua orang minta caption ke AI, ja | ASET | Mockup linimasa caption kembar |
| 8:04–8:12 | Bab 4 · Kalau AI belajar dari AI | Dampak ketiga paling deket sama kita nih. Peneliti Amazon, T | VISUAL | Kutipan Dokumen — makalah Thompson dkk. |
| 8:04–8:12 | Bab 4 · Kalau AI belajar dari AI | Dampak ketiga paling deket sama kita nih. Peneliti Amazon, T | ASET | Makalah Thompson dkk. soal web terjemahan mesin |
| 8:04–8:12 | Bab 4 · Kalau AI belajar dari AI | Dampak ketiga paling deket sama kita nih. Peneliti Amazon, T | TEKS | Sumber: Thompson dkk., ACL Findings 2024 |
| 8:12–8:18 | Bab 4 · Kalau AI belajar dari AI | Ternyata, terjemahan mesin udah jadi bagian gede banget dari | VISUAL | peta bahasa dunia, bahasa kecil tertutup lapisan teks terjemahan |
| 8:18–8:27 | Bab 4 · Kalau AI belajar dari AI | Nah, ini tebakanku sendiri ya, belum ada risetnya. Bahasa da | VISUAL | Ilustrasi Ekor — bahasa Indonesia dan bahasa daerah sebagai ujung tipis kurva |
| 8:18–8:27 | Bab 4 · Kalau AI belajar dari AI | Nah, ini tebakanku sendiri ya, belum ada risetnya. Bahasa da | ASET | Ilustrasi bahasa daerah sebagai ekor tipis |
| 8:18–8:27 | Bab 4 · Kalau AI belajar dari AI | Nah, ini tebakanku sendiri ya, belum ada risetnya. Bahasa da | TEKS | Opini narator |
| 8:27–8:36 | Bab 4 · Kalau AI belajar dari AI | Tulisan aslinya emang sedikit sih, tapi terjemahan mesinnya  | VISUAL | kembali ke lembar fotokopi kesepuluh sekilas |
| 8:27–8:36 | Bab 4 · Kalau AI belajar dari AI | Tulisan aslinya emang sedikit sih, tapi terjemahan mesinnya  | SFX | suara mesin fotokopi pelan |
| 8:36–8:42 | Bab 4 · Kalau AI belajar dari AI | Dampak keempat kayak fiksi ilmiah. Tulisan murni manusia seb | VISUAL | B-roll — rak buku tua |
| 8:36–8:42 | Bab 4 · Kalau AI belajar dari AI | Dampak keempat kayak fiksi ilmiah. Tulisan murni manusia seb | ASET | Buku dan perpustakaan |
| 8:42–8:52 | Bab 4 · Kalau AI belajar dari AI | Mirip kisah besi baja. Habis uji bom atom dulu, baja baru ik | VISUAL | ilustrasi lempeng baja tua bercap "PRA-1945" vs baja baru bercahaya radiasi |
| 8:42–8:52 | Bab 4 · Kalau AI belajar dari AI | Mirip kisah besi baja. Habis uji bom atom dulu, baja baru ik | TEKS | Low-background steel = baja latar rendah |
| 8:52–9:02 | Bab 4 · Kalau AI belajar dari AI | Analogi ini dipake buat tulisan. John Graham-Cumming bikin a | VISUAL | Kutipan Dokumen — beranda arsip |
| 8:52–9:02 | Bab 4 · Kalau AI belajar dari AI | Analogi ini dipake buat tulisan. John Graham-Cumming bikin a | ASET | Beranda arsip lowbackgroundsteel.ai |
| 8:52–9:02 | Bab 4 · Kalau AI belajar dari AI | Analogi ini dipake buat tulisan. John Graham-Cumming bikin a | TEKS | Sumber: lowbackgroundsteel.ai, diakses 15 Nov 2026 |
| 9:02–9:10 | Bab 4 · Kalau AI belajar dari AI | Terus ada wordfreq, alat ngitung seringnya kata dipake manus | VISUAL | Kutipan Dokumen — halaman SUNSET wordfreq di GitHub |
| 9:02–9:10 | Bab 4 · Kalau AI belajar dari AI | Terus ada wordfreq, alat ngitung seringnya kata dipake manus | ASET | Catatan penghentian wordfreq (SUNSET.md) |
| 9:02–9:10 | Bab 4 · Kalau AI belajar dari AI | Terus ada wordfreq, alat ngitung seringnya kata dipake manus | TEKS | Sumber: wordfreq (Robyn Speer), Sep 2024 |
| 9:10–9:19 | Bab 4 · Kalau AI belajar dari AI | Gejalanya lucu: kata Inggris "delve", artinya mendalami, tib | VISUAL | kata "delve" membesar sepuluh kali, ikon chatbot mengintip dari pojok |
| 9:10–9:19 | Bab 4 · Kalau AI belajar dari AI | Gejalanya lucu: kata Inggris "delve", artinya mendalami, tib | SFX | glitch pendek → assets/stok-situs/pixabay-sfx-sound-effect-digital-sound-438248.mp3 |
| 9:19–9:29 | Bab 4 · Kalau AI belajar dari AI | Gimana cara bedain tulisan AI? Google DeepMind punya SynthID | VISUAL | Kutipan Dokumen — makalah Nature SynthID-Text |
| 9:19–9:29 | Bab 4 · Kalau AI belajar dari AI | Gimana cara bedain tulisan AI? Google DeepMind punya SynthID | ASET | Makalah Nature SynthID-Text |
| 9:19–9:29 | Bab 4 · Kalau AI belajar dari AI | Gimana cara bedain tulisan AI? Google DeepMind punya SynthID | TEKS | Sumber: Nature, 23 Okt 2024 |
| 9:29–9:36 | Bab 4 · Kalau AI belajar dari AI | Masalahnya, tanda air ini rapuh. Ditulis ulang dikit kalimat | VISUAL | tanda air luntur saat kalimat diacak ulang |
| 9:29–9:36 | Bab 4 · Kalau AI belajar dari AI | Masalahnya, tanda air ini rapuh. Ditulis ulang dikit kalimat | TEKS | Sumber: NIST AI 100-4, Nov 2024 |
| 9:36–9:40 | Bab 4 · Kalau AI belajar dari AI | Jadi, apakah AI pasti makin bodoh? Kabar baiknya, nggak haru | MUSIK | bed gelap berganti nada lebih terang |
| 9:36–9:40 | Bab 4 · Kalau AI belajar dari AI | Jadi, apakah AI pasti makin bodoh? Kabar baiknya, nggak haru | SFX | whoosh pendek |
| 9:40–9:53 | Bab 4 · Kalau AI belajar dari AI | Studi 2024 nguji dua skenario. Kalau data asli dibuang terus | VISUAL | Kutipan Dokumen — makalah Gerstgrasser dkk. |
| 9:40–9:53 | Bab 4 · Kalau AI belajar dari AI | Studi 2024 nguji dua skenario. Kalau data asli dibuang terus | ASET | Makalah akumulasi data (Gerstgrasser dkk.) |
| 9:40–9:53 | Bab 4 · Kalau AI belajar dari AI | Studi 2024 nguji dua skenario. Kalau data asli dibuang terus | TEKS | Diganti = runtuh; disimpan + ditambah = aman |
| 9:40–9:53 | Bab 4 · Kalau AI belajar dari AI | Studi 2024 nguji dua skenario. Kalau data asli dibuang terus | TEKS | Sumber: Gerstgrasser dkk., arXiv, 1 Apr 2024 |
| 9:53–9:57 | Bab 4 · Kalau AI belajar dari AI | Laporan Stanford AI Index 2026 juga nyimpulin hal yang sama. | VISUAL | Kutipan Dokumen — halaman AI Index sekilas |
| 9:53–9:57 | Bab 4 · Kalau AI belajar dari AI | Laporan Stanford AI Index 2026 juga nyimpulin hal yang sama. | ASET | Stanford AI Index 2026 bab riset |
| 9:53–9:57 | Bab 4 · Kalau AI belajar dari AI | Laporan Stanford AI Index 2026 juga nyimpulin hal yang sama. | TEKS | Sumber: Stanford HAI, AI Index 2026 |
| 9:57–10:04 | Bab 4 · Kalau AI belajar dari AI | Balik ke fotokopi tadi. Masalahnya bukan di mesinnya. Masala | VISUAL | lembar asli diselipkan kembali ke tumpukan fotokopi, warnanya pulih |
| 10:04–10:12 | Bab 4 · Kalau AI belajar dari AI | Bahan latihan bikinan mesin malah bisa sukses gede, asal ada | VISUAL | Kutipan Dokumen — makalah AlphaGeometry |
| 10:04–10:12 | Bab 4 · Kalau AI belajar dari AI | Bahan latihan bikinan mesin malah bisa sukses gede, asal ada | ASET | Makalah Nature AlphaGeometry |
| 10:04–10:12 | Bab 4 · Kalau AI belajar dari AI | Bahan latihan bikinan mesin malah bisa sukses gede, asal ada | TEKS | Sumber: Nature, 17 Jan 2024 |
| 10:12–10:19 | Bab 4 · Kalau AI belajar dari AI | Hasilnya, dua puluh lima dari tiga puluh soal geometri olimp | VISUAL | papan skor 25/30 vs 10/30 |
| 10:19–10:28 | Bab 4 · Kalau AI belajar dari AI | Adiknya, AlphaProof, nulis bukti matematika yang dicek kompu | VISUAL | Kutipan Dokumen — makalah AlphaProof |
| 10:19–10:28 | Bab 4 · Kalau AI belajar dari AI | Adiknya, AlphaProof, nulis bukti matematika yang dicek kompu | ASET | Makalah Nature AlphaProof |
| 10:19–10:28 | Bab 4 · Kalau AI belajar dari AI | Adiknya, AlphaProof, nulis bukti matematika yang dicek kompu | TEKS | Sumber: Nature, 12 Nov 2025 |
| 10:28–10:37 | Bab 4 · Kalau AI belajar dari AI | Kuncinya satu: ada wasit yang nggak bisa dibohongin. Di mate | VISUAL | peluit wasit, lalu siluet orang banyak |
| 10:28–10:37 | Bab 4 · Kalau AI belajar dari AI | Kuncinya satu: ada wasit yang nggak bisa dibohongin. Di mate | SFX | peluit pendek |
| 10:37–10:40 | Bab 4 · Kalau AI belajar dari AI | Nah, di sinilah Indonesia masuk ke cerita. | SFX | whoosh transisi |
| 10:37–10:40 | Bab 4 · Kalau AI belajar dari AI | Nah, di sinilah Indonesia masuk ke cerita. | VISUAL | peta Indonesia menyala pelan |
| 10:37–10:40 | Bab 4 · Kalau AI belajar dari AI | Nah, di sinilah Indonesia masuk ke cerita. | ASET | Peta Indonesia sederhana |
| 10:40–10:47 | Bab 5 · Apa artinya buat kita di Indonesia | Kalau tulisan manusia udah langka, stok tulisan bahasa Indon | VISUAL | timbangan, satu sisi "Bahasa Inggris", satu sisi "Bahasa Indonesia" |
| 10:40–10:47 | Bab 5 · Apa artinya buat kita di Indonesia | Kalau tulisan manusia udah langka, stok tulisan bahasa Indon | TEKS | Bab 5 — Apa Artinya buat Kita |
| 10:47–10:55 | Bab 5 · Apa artinya buat kita di Indonesia | Menurut statistik Common Crawl, arsip web raksasa buat ngela | VISUAL | Kutipan Dokumen — halaman statistik bahasa Common Crawl, jangan sorot atau perbesar angka persentase (masih 🟡) |
| 10:47–10:55 | Bab 5 · Apa artinya buat kita di Indonesia | Menurut statistik Common Crawl, arsip web raksasa buat ngela | ASET | Halaman statistik bahasa Common Crawl |
| 10:47–10:55 | Bab 5 · Apa artinya buat kita di Indonesia | Menurut statistik Common Crawl, arsip web raksasa buat ngela | TEKS | Sumber: statistik Common Crawl, CC-MAIN-2026-43, diakses 15 Nov 2026 |
| 10:55–10:60 | Bab 5 · Apa artinya buat kita di Indonesia | Gimana sama bahasa daerah kita? Wah, kemungkinan jauh lebih  | VISUAL | ekor kurva makin tipis berlabel bahasa daerah |
| 10:55–10:60 | Bab 5 · Apa artinya buat kita di Indonesia | Gimana sama bahasa daerah kita? Wah, kemungkinan jauh lebih  | TEKS | Opini narator |
| 10:60–11:13 | Bab 5 · Apa artinya buat kita di Indonesia | Celah ini yang coba ditambal Sahabat-AI. Model raksasanya pu | VISUAL | Kutipan Dokumen — siaran pers GoTo, sorot lima bahasa |
| 10:60–11:13 | Bab 5 · Apa artinya buat kita di Indonesia | Celah ini yang coba ditambal Sahabat-AI. Model raksasanya pu | ASET | Siaran pers GoTo Sahabat-AI 70B |
| 10:60–11:13 | Bab 5 · Apa artinya buat kita di Indonesia | Celah ini yang coba ditambal Sahabat-AI. Model raksasanya pu | TEKS | Sumber: GoTo, 2 Jun 2025 |
| 11:13–11:19 | Bab 5 · Apa artinya buat kita di Indonesia | Tapi sepinter apa pun AI lokal kita, dia tetap butuh bacaan  | VISUAL | B-roll — kabel jaringan dan router |
| 11:13–11:19 | Bab 5 · Apa artinya buat kita di Indonesia | Tapi sepinter apa pun AI lokal kita, dia tetap butuh bacaan  | ASET | Kabel ethernet tersambung ke router |
| 11:19–11:26 | Bab 5 · Apa artinya buat kita di Indonesia | Terus gimana aturannya? Dua rancangan Perpres soal peta jala | VISUAL | Kutipan Dokumen — berita JDIH Komdigi |
| 11:19–11:26 | Bab 5 · Apa artinya buat kita di Indonesia | Terus gimana aturannya? Dua rancangan Perpres soal peta jala | ASET | Berita JDIH Komdigi rampungnya RPerpres AI |
| 11:19–11:26 | Bab 5 · Apa artinya buat kita di Indonesia | Terus gimana aturannya? Dua rancangan Perpres soal peta jala | TEKS | Sumber: JDIH Komdigi, Mei 2026 |
| 11:26–11:34 | Bab 5 · Apa artinya buat kita di Indonesia | Awal September, kabarnya tinggal nunggu tanda tangan Preside | VISUAL | Kutipan Dokumen — judul Kontan |
| 11:26–11:34 | Bab 5 · Apa artinya buat kita di Indonesia | Awal September, kabarnya tinggal nunggu tanda tangan Preside | ASET | Judul Kontan dua Perpres AI tunggu tanda tangan |
| 11:26–11:34 | Bab 5 · Apa artinya buat kita di Indonesia | Awal September, kabarnya tinggal nunggu tanda tangan Preside | TEKS | Per September 2026 belum ditandatangani |
| 11:26–11:34 | Bab 5 · Apa artinya buat kita di Indonesia | Awal September, kabarnya tinggal nunggu tanda tangan Preside | TEKS | Sumber: Kontan, 4 Sep 2026 |
| 11:34–11:45 | Bab 5 · Apa artinya buat kita di Indonesia | Sekarang jawaban pertanyaan bab dua tadi. Meta udah bilang t | VISUAL | teks kinetik — "Postingan publik = bahan belajar AI" |
| 11:34–11:45 | Bab 5 · Apa artinya buat kita di Indonesia | Sekarang jawaban pertanyaan bab dua tadi. Meta udah bilang t | TEKS | Sumber: Jala Hoaks Pemprov DKI; CNN Indonesia, 17 Apr 2025 |
| 11:45–11:54 | Bab 5 · Apa artinya buat kita di Indonesia | Artinya buat kamu: tiap status dan komentar publikmu bisa ja | VISUAL | Tips — ikon gembok di pengaturan akun fiktif |
| 11:45–11:54 | Bab 5 · Apa artinya buat kita di Indonesia | Artinya buat kamu: tiap status dan komentar publikmu bisa ja | ASET | Ilustrasi tombol akun privat |
| 11:45–11:54 | Bab 5 · Apa artinya buat kita di Indonesia | Artinya buat kamu: tiap status dan komentar publikmu bisa ja | TEKS | Tips: atur akun jadi privat |
| 11:54–12:04 | Bab 5 · Apa artinya buat kita di Indonesia | Tapi liat juga sisi lainnya. Makin penuh internet sama tulis | VISUAL | B-roll — jari mengetik di laptop |
| 11:54–12:04 | Bab 5 · Apa artinya buat kita di Indonesia | Tapi liat juga sisi lainnya. Makin penuh internet sama tulis | ASET | Tangan mengetik di laptop (sudut dekat) |
| 11:54–12:04 | Bab 5 · Apa artinya buat kita di Indonesia | Tapi liat juga sisi lainnya. Makin penuh internet sama tulis | TEKS | Sumber: Nature, 24 Jul 2024 |
| 12:04–12:13 | Bab 5 · Apa artinya buat kita di Indonesia | Ulasan warung di kampungmu, resep nenek, atau cerita bahasa  | VISUAL | kolase kartu ilustrasi warung, resep, dan aksara daerah menempel di ujung kurva |
| 12:04–12:13 | Bab 5 · Apa artinya buat kita di Indonesia | Ulasan warung di kampungmu, resep nenek, atau cerita bahasa  | MUSIK | naik hangat |
| 12:13–12:18 | Puncak | Jadi, balik ke pertanyaan awal. Kalau tulisan manusia makin  | VISUAL | pertanyaan judul kembali memenuhi layar |
| 12:13–12:18 | Puncak | Jadi, balik ke pertanyaan awal. Kalau tulisan manusia makin  | MUSIK | bed menipis |
| 12:18–12:28 | Puncak | Dari soal yang bisa dicek langsung sama mesin. Dari coba-cob | VISUAL | tiga jalan dari Bab 3 menyala bergantian |
| 12:28–12:36 | Puncak | Soalnya semua jalan yang berhasil punya satu syarat: jangkar | VISUAL | tiga jalan bertemu di satu jangkar |
| 12:36–12:42 | Puncak | Dan di internet yang makin rame ditulis mesin, jangkar itu.. | JEDA | 1 dtk sebelum "ternyata" |
| 12:36–12:42 | Puncak | Dan di internet yang makin rame ditulis mesin, jangkar itu.. | SFX | impact berat |
| 12:36–12:42 | Puncak | Dan di internet yang makin rame ditulis mesin, jangkar itu.. | VISUAL | B-roll serat optik berwarna, lalu putih |
| 12:36–12:42 | Puncak | Dan di internet yang makin rame ditulis mesin, jangkar itu.. | ASET | Serat optik warna-warni |
| 12:42–12:48 | Penutup | Intinya simpel: AI nggak kehabisan cara belajar, tapi makin  | MUSIK | Vastness naik pelan |
| 12:42–12:48 | Penutup | Intinya simpel: AI nggak kehabisan cara belajar, tapi makin  | VISUAL | B-roll jaringan berdenyut |
| 12:42–12:48 | Penutup | Intinya simpel: AI nggak kehabisan cara belajar, tapi makin  | ASET | Jaringan internet berdenyut |
| 12:48–12:55 | Penutup | Menurutku ini kabar baik yang bikin senyum. Di era mesin pin | VISUAL | teks kinetik — "SUARA ASLI = LANGKA" |
| 12:55–13:04 | Penutup | Sekarang giliran kamu cerita. Tulis di komentar ya: bahasa d | VISUAL | kartu komentar |
| 12:55–13:04 | Penutup | Sekarang giliran kamu cerita. Tulis di komentar ya: bahasa d | TEKS | Bahasa daerahku: ___ — Pernah kutulis di internet: ya / belum |
| 13:04–13:12 | Penutup | Kalau tulisan manusia makin mahal, sebenarnya ada lho orang  | VISUAL | layar akhir — kartu video berikutnya "Siapa yang Dibayar untuk Mengajari AI?" |
| 13:04–13:12 | Penutup | Kalau tulisan manusia makin mahal, sebenarnya ada lho orang  | ASET | Kartu layar akhir |
| 13:12–13:17 | Penutup | Dan tenang aja... kuotamu aman kok. Yang perlu kita jaga, it | VISUAL | callback — notifikasi kuota dari hook muncul lagi, kini bertanda centang |
| 13:12–13:17 | Penutup | Dan tenang aja... kuotamu aman kok. Yang perlu kita jaga, it | SFX | klik notifikasi → assets/stok-situs/mixkit-sfx-mouse-click-close-1113.wav |
| 13:12–13:17 | Penutup | Dan tenang aja... kuotamu aman kok. Yang perlu kita jaga, it | MUSIK | tutup |

## 4. Media yang dipakai

- ⏳ **Mockup notifikasi kuota HP generik** (0:00–0:03): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — notifikasi fiktif tanpa logo operator
- ✅ **Musik Vastness** (0:03–0:06) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/mixkit-musik-vastness-184.mp3 · Mixkit Stock Music Free License · Musik: Andrew Ev / Mixkit
- ⏳ **Kartu nama grafis Sutskever** (0:06–0:14): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — kartu nama + kutipan, tanpa foto
- ✅ **Judul The Verge soal Sutskever dan peak data** (0:14–0:20) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/theverge-openai-cofounder-ilya-sutskever-says-the.png · kutipan · Sumber: The Verge, 14 Des 2024
- ✅ **Grafik data latih vs stok teks manusia** (0:20–0:28) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/grafik/data-latih-vs-stok-2.png · grafik · Sumber: ai.meta.com, qwenlm.github.io, arXiv, dll. (diolah)
- ⏳ **Peta lima bab** (0:33–0:48): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — lima ikon bab bergaya seragam
- ✅ **Tangan mengetik di laptop** (0:48–0:53) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-close-up-of-hands-typing-on-a-1395943.mp4 · Pexels License · Video: Drew Rae / Pexels
- ✅ **Ruang server gelap berlampu LED** (0:53–0:58) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-detailed-view-of-server-units-7140928.mp4 · Pexels License · Video: MrColo / Pexels
- ⏳ **Animasi token** (0:58–1:04): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — kalimat dipecah jadi keping token
- ✅ **Lorong perpustakaan penuh buku** (1:09–1:18) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-explore-the-tranquility-of-a-38668053.mp4 · Pexels License · Video: Sai zainalin ZN / Pexels
- ✅ **Halaman studi Epoch AI soal habisnya data** (1:18–1:26) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/epoch-will-we-run-out-of-data-limits-of-llm.png · kutipan · Sumber: Epoch AI, 6 Jun 2024
- ✅ **Abstrak makalah Epoch di arXiv** (1:26–1:32) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/arxiv-computer-science-machine-learning.png · kutipan · Sumber: arXiv, diakses 15 Nov 2026
- ✅ **Grafik data latih vs stok teks manusia** (1:32–1:44) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/grafik/data-latih-vs-stok-2.png · grafik · Sumber: ai.meta.com, qwenlm.github.io, arXiv, dll. (diolah)
- ✅ **Animasi map dan dokumen** (2:06–2:14) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pixabay-video-file-folder-document-free-stock-349087.mp4 · Pixabay Content License · Video: u_rfx8q32uw5 / Pixabay
- ✅ **Wawancara Sutskever di Dwarkesh Podcast** (2:28–2:33) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/dwarkesh-dwarkesh-podcast.png · kutipan · Sumber: dwarkesh.com, 26 Nov 2025
- ✅ **Gerbang terkunci gembok kuning** (2:33–2:40) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-close-up-of-a-locked-gate-with-a-3999371.mp4 · Pexels License · Video: 8 / Pexels
- ✅ **Musik Tutorial Explainer** (2:40–2:45) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pixabay-musik-tutorial-explainer-corporate-632759.mp3 · Pixabay Content License · Musik: AtlasAudio / Pixabay
- ⏳ **Ilustrasi internet dipagari** (2:45–2:53): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — ikon situs bergembok + papan robots.txt
- ✅ **Jaringan node digital** (2:53–2:57) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-visual-depiction-of-a-digital-30607101.mp4 · Pexels License · Video: Jakub Zerdzicki / Pexels
- ✅ **Makalah Consent in Crisis di arXiv** (2:57–3:02) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/arxiv-computer-science-computation-and.png · kutipan · Sumber: arXiv, diakses 15 Nov 2026
- ✅ **Grafik internet dipagari (C4)** (3:02–3:11) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/grafik/internet-dipagari-c4.png · grafik · Sumber: arXiv, The New York Times (diolah)
- ✅ **Gembok emas di pagar kawat** (3:11–3:16) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-golden-padlock-on-a-chain-link-4976967.mp4 · Pexels License · Video: Nang Kpa / Pexels
- ✅ **Siaran pers Cloudflare blokir crawler AI** (3:16–3:24) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/cloudflare-cloudflare-just-changed-how-ai-crawlers.png · kutipan · Sumber: cloudflare.com, diakses 15 Nov 2026
- ✅ **Blog Cloudflare pay per crawl** (3:24–3:31) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/blog-introducing-pay-per-crawl-enabling.png · kutipan · Sumber: Cloudflare Blog, 1 Jul 2025
- ✅ **Laporan Reddit-Google lisensi konten AI** (3:31–3:39) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/thestar-exclusive-reddit-in-ai-content-licensing-2.png · kutipan · Sumber: The Star, 22 Feb 2024
- ✅ **Judul TechCrunch soal penyelesaian Anthropic US$1,5 miliar** (3:39–3:44) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/techcrunch-anthropic-s-landmark-1-5b-copyright.png · kutipan · Sumber: TechCrunch, 21 Jul 2026
- ✅ **Berita Tempo soal media gabung Sahabat-AI** (4:05–4:13) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/tempo-tempo-dan-sejumlah-media-bergabung.png · kutipan · Sumber: Tempo, 21 Juni 2025 | 13.43 WIB
- ✅ **Siaran pers GoTo Sahabat-AI 70B** (4:13–4:18) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/gotocompany-sahabat-ai-gets-smarter-indosat-and-goto.png · kutipan · Sumber: GoTo, diakses 15 Nov 2026
- ⏳ **Peta tiga jalan keluar** (4:33–4:40): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — AI mengajari AI / AI belajar sendiri / AI belajar dari dunia, ikon + risiko
- ✅ **Makalah Phi-4 di arXiv** (4:48–4:58) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/arxiv-computer-science-computation-and-2.png · kutipan · Sumber: arXiv, diakses 15 Nov 2026
- ✅ **Stanford AI Index 2026 bab riset** (4:58–5:08) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/hai-research-and-development-the-2026-ai.png · kutipan · Sumber: hai.stanford.edu, diakses 15 Nov 2026
- ✅ **Tangan menyusun papan Go** (5:08–5:12) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-hands-setting-up-traditional-go-39277761.mp4 · Pexels License · Video: Audrey Bory / Pexels
- ✅ **Makalah Nature AlphaGo Zero** (5:20–5:30) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/nature-mastering-the-game-of-go-without-human.png · kutipan · Sumber: Nature, 19 Okt 2017
- ✅ **Makalah Nature DeepSeek-R1** (5:36–5:45) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/nature-deepseek-r1-incentivizes-reasoning-in.png · kutipan · Sumber: Nature, 17 Sep 2025
- ✅ **Esai Era of Experience** (6:00–6:06) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/storage-tanpa-judul.png · kutipan · Sumber: storage.googleapis.com, diakses 15 Nov 2026
- ✅ **Lengan robot di fasilitas produksi** (6:06–6:11) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-high-tech-robotic-arm-operating-32386532.mp4 · Pexels License · Video: Usman AbdulrasheedGambo / Pexels
- ✅ **Artikel Stanford Engineering soal anak vs GPT-3** (6:11–6:21) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/engineering-the-future-of-language-learning.png · kutipan · Sumber: Stanford University School of Engineering, 9 Feb 2024
- ✅ **Anak menunjuk buku cerita** (6:11–6:21) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-a-young-child-points-to-a-7308352.mp4 · Pexels License · Video: Leeloo The First / Pexels
- ⏳ **Skala absurd anak vs GPT-3** (6:21–6:25): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — 15 juta vs 500 miliar kata, ±33.000×
- ✅ **Mesin cetak koran berkecepatan tinggi** (6:36–6:40) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-close-up-of-a-high-speed-38826405.mp4 · Pexels License · Video: Somogro Bangladesh / Pexels
- ⏳ **Diagram fotokopi dari fotokopi** (6:40–6:49): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — visual inti bab, ekor hilang duluan
- ✅ **Makalah Nature soal model collapse** (6:49–6:56) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/nature-ai-models-collapse-when-trained-on.png · kutipan · Sumber: Nature, 24 Jul 2024
- ✅ **Makalah MAD (Model Autophagy Disorder) di arXiv** (7:32–7:41) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/arxiv-computer-science-machine-learning-3.png · kutipan · Sumber: arXiv, diakses 15 Nov 2026
- ✅ **Berita Rice "Breaking MAD"** (7:32–7:41) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/news-breaking-mad-generative-ai-could-break.png · kutipan · Sumber: Rice News | News and Media Relations | Rice University, diakses 15 Nov 2026
- ⏳ **Mockup linimasa caption kembar** (7:55–8:04): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — akun fiktif, tanpa logo platform
- ✅ **Makalah Thompson dkk. soal web terjemahan mesin** (8:04–8:12) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/arxiv-computer-science-computation-and-3.png · kutipan · Sumber: arXiv, diakses 15 Nov 2026
- ⏳ **Ilustrasi bahasa daerah sebagai ekor tipis** (8:18–8:27): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — ekor kurva berlabel bahasa daerah
- ✅ **Buku dan perpustakaan** (8:36–8:42) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pixabay-video-books-library-education-free-204243.mp4 · Pixabay Content License · Video: u_0wfe54skss / Pixabay
- ✅ **Beranda arsip lowbackgroundsteel.ai** (8:52–9:02) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/lowbackgroundsteel-low-background-steel.png · kutipan · Sumber: lowbackgroundsteel.ai, diakses 15 Nov 2026
- ✅ **Catatan penghentian wordfreq (SUNSET.md)** (9:02–9:10) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/github-sunset-md-2.png · kutipan · Sumber: GitHub, diakses 15 Nov 2026
- ✅ **Makalah Nature SynthID-Text** (9:19–9:29) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/nature-scalable-watermarking-for-identifying-2.png · kutipan · Sumber: Nature, 23 Okt 2024
- ✅ **Makalah akumulasi data (Gerstgrasser dkk.)** (9:40–9:53) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/arxiv-computer-science-machine-learning-2.png · kutipan · Sumber: arXiv, diakses 15 Nov 2026
- ✅ **Stanford AI Index 2026 bab riset** (9:53–9:57) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/hai-research-and-development-the-2026-ai.png · kutipan · Sumber: hai.stanford.edu, diakses 15 Nov 2026
- ✅ **Makalah Nature AlphaGeometry** (10:04–10:12) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/nature-solving-olympiad-geometry-without-human.png · kutipan · Sumber: Nature, 17 Jan 2024
- ✅ **Makalah Nature AlphaProof** (10:19–10:28) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/nature-olympiad-level-formal-mathematical.png · kutipan · Sumber: Nature, 12 Nov 2025
- ⏳ **Peta Indonesia sederhana** (10:37–10:40): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — siluet peta datar
- ✅ **Halaman statistik bahasa Common Crawl** (10:47–10:55) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/commoncrawl-statistics-of-common-crawl-monthly-2.png · kutipan · Sumber: commoncrawl.github.io, diakses 15 Nov 2026
- ✅ **Siaran pers GoTo Sahabat-AI 70B** (10:60–11:13) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/gotocompany-sahabat-ai-gets-smarter-indosat-and-goto.png · kutipan · Sumber: GoTo, diakses 15 Nov 2026
- ✅ **Kabel ethernet tersambung ke router** (11:13–11:19) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-ethernet-cables-connected-to-a-7140937.mp4 · Pexels License · Video: MrColo / Pexels
- ✅ **Berita JDIH Komdigi rampungnya RPerpres AI** (11:19–11:26) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/jdih-berita-2.png · kutipan · Sumber: Komdigi, diakses 15 Nov 2026
- ✅ **Judul Kontan dua Perpres AI tunggu tanda tangan** (11:26–11:34) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/kutipan/nasional-dua-perpres-ai-tinggal-tunggu-tanda.png · kutipan · Sumber: kontan.co.id, 4 Sep 2026
- ⏳ **Ilustrasi tombol akun privat** (11:45–11:54): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — UI fiktif tanpa logo Meta
- ✅ **Tangan mengetik di laptop (sudut dekat)** (11:54–12:04) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-close-up-view-of-hands-typing-on-4873238.mp4 · Pexels License · Video: Nothing Ahead / Pexels
- ✅ **Serat optik warna-warni** (12:36–12:42) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pexels-video-stunning-macro-video-of-colorful-33717724.mp4 · Pexels License · Video: Pachon in Motion / Pexels
- ✅ **Jaringan internet berdenyut** (12:42–12:48) · /home/ikhsands/Proyek/super-motion-claude-ikhsan/aset/ai-data-habis/assets/stok-situs/pixabay-video-network-internet-data-free-stock-14900.mp4 · Pixabay Content License · Video: u_8d7i02wb3q / Pixabay
- ⏳ **Kartu layar akhir** (13:04–13:12): belum diunduh, akan diminta studio lewat asisten-minta: dibuat studio — kartu end screen 16:9
