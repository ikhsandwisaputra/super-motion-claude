# Kalau AI belajar dari keluaran AI: dampaknya ke depan (sisi dampak + penutup celah lama)

Riset · 15 November 2026 · Brave agent + Google (jalur akademik) + WebSearch · diminta: "kalau AI belajar dari data sintetis / keluaran AI sendiri, DAMPAKNYA KE DEPAN apa?" (tugas widget 20261115-110952-9e9d, lanjutan)

**Cara kerja:** `cari_banyak` jalur akademik (OpenAlex) berhasil untuk 5 putaran kueri. Google biasa (`cari`, tab semua/berita, kueri umum) mengembalikan 0 hasil terbaca sepanjang sesi ini, jadi penemuan sumber non-akademik lewat `WebSearch` (±17 kueri). Sekitar 45 halaman/PDF dibaca lewat `baca` (kutipan hanya dari sana); grafik Common Crawl dibaca lewat `lihat`. Beberapa halaman berpenjaga (ScienceDirect, Wiley, OUP, OSF) diblok captcha/Cloudflare dan tidak ditembus. **Pernah dibahas:** ya, sisi sains 15 Nov 2026 di `/home/ikhsands/Proyek/asisten-agi-claude/laporan/2026-11-15-ai-data-habis-sains.md` (Epoch, Sutskever, Phi-4, Nemotron, Nature collapse, Gerstgrasser, AlphaGo Zero, DeepSeek-R1, Pew, Graphite) dan sisi industri di `/home/ikhsands/Proyek/asisten-agi-claude/laporan/2026-11-15-ai-data-habis-industri.md` (Mercor, Consent in Crisis, lisensi data). Isi di bawah adalah tambahan, bukan ulangan.

Label: ✅ terverifikasi: 2 sumber independen, atau 1 sumber primer kelas A, dengan kutipan persis · 🟡 sebagian: 1 sumber saja / via media / sumber ber-preprint / dibaca sebagai gambar · ❌ tidak ditemukan sumbernya

---

## Kesimpulan

1. **Yang hilang duluan adalah ekor distribusi: hal langka dan sudut pandang minoritas.** Makalah Nature (24 Jul 2024) sendiri bilang "tails of the original content distribution disappear", dan penulisnya mengaitkannya ke keadilan bagi kelompok terpinggirkan. Keluaran jadi seragam (Guo dkk., Wenger & Kenett, Sui). ✅
2. **Efek lain: bias bisa naik diam-diam sebelum kualitas kelihatan turun** (preprint 4 Agu 2026, satu dataset: 🟡). "Halusinasi diwariskan" sebagai angka terukur belum ketemu; yang ada hanya klaim umum Musk/media. 🟡
3. **Bahasa sumber daya rendah paling rentan bila web penuh terjemahan mesin** (Thompson dkk., ACL Findings 2024: ✅). Bahasa Indonesia ada di Common Crawl terbaru sebesar 1,0636% halaman vs Inggris 42,5647% (CC-MAIN-2026-43), dan pangsanya menurun tiga crawl terakhir (🟡, dibaca dari grafik). Bukti bahwa bahasa daerah Indonesia sudah "terkikis" oleh ini: belum ketemu.
4. **Data manusia pra-2022 jadi barang langka, dan ada "arsip baja bersih"-nya.** lowbackgroundsteel.ai mengarsip dump Wikipedia Agu 2022 dkk.; pustaka wordfreq berhenti diperbarui karena web tercemar teks AI. ✅ (kata "mahal": lihat laporan industri, Mercor)
5. **Penandaan asal-usul (SynthID, C2PA) membantu tapi bocor:** SynthID-Text sudah dipakai di produksi, tapi parafrase/terjemah-balik menurunkan deteksinya (NIST + preprint: ✅). Google melaporkan >180 miliar gambar/video ditandai (klaim sendiri: 🟡). Data pelatihan: cara aman = akumulasi data nyata + data sintetis yang diverifikasi mesin.
6. **Sisi optimis jujur:** AlphaGeometry (Nature 2024) dan AlphaProof (Nature, online 12 Nov 2025) belajar dari data sintetis yang bisa dicek mesin, dan hasilnya setara medali olimpiade matematika. Stanford AI Index 2026: tetap "no definitive evidence" bahwa data sintetis menutup kekurangan data nyata di pra-pelatihan. ✅
7. **Celah lama:** (a) Common Crawl 2026-43: ind 1,0636%, eng 42,5647% (🟡). (b) Dua Perpres AI: tidak ada bukti ditandatangani setelah 4 Sep 2026; tidak ada nomor; pasal "data latih" tidak ketemu (🟡/belum terverifikasi). (c) Sahabat-AI: empat media = mitra (✅); "menyumbang data latih" hanya dari Tempo (🟡).

---

## Pondasi 5W+1H

- **Apa:** Web makin terisi keluaran AI; model baru berisiko belajar dari keluaran model lama. Dampak: keragaman menyusut, bias bisa menguat, bahasa kecil rentan, data manusia murni jadi langka, dan industri mencari penanda asal-usul serta data sintetis yang diverifikasi.
- **Siapa:** Shumailov dkk. (Cambridge/Oxford, Nature), Alemohammad & Baraniuk (Rice), Thompson dkk. (Amazon), Guo dkk., Wenger & Kenett, Google DeepMind (SynthID, AlphaGeometry, AlphaProof), Stanford HAI, John Graham-Cumming, Robyn Speer (wordfreq), Komdigi, GoTo/Indosat.
- **Kapan:** Nature 24 Jul 2024; MAD Jul 2023 (ICLR 2024); Thompson Jan 2024; AlphaProof Nature 12 Nov 2025; Common Crawl 2026-43; Kontan 4 Sep 2026 (Perpres).
- **Di mana:** global (web berbahasa Inggris dominan); Indonesia (Komdigi, Sahabat-AI).
- **Kenapa:** model generatif mengambil sampel dari distribusinya sendiri: peristiwa langka makin jarang terambil sampai hilang (Nature, bagian "Discrete distributions").
- **Bagaimana:** putaran umpan balik: model N menulis web, model N+1 dilatih dari web itu. Mitigasi: simpan/akumulasi data nyata segar, tandai konten AI, verifikasi mesin.

---

## Rincian

### 1. Penyeragaman dan hilangnya ekor distribusi

- ✅ **Makalah Nature 2024: yang hilang pertama kali adalah "ekor" distribusi (kejadian berprobabilitas rendah), dan efeknya dikaitkan ke keadilan bagi kelompok terpinggirkan.** (Shumailov dkk., Nature, 24 Jul 2024; Rice/ScienceDaily + MAD sebagai penguat independen) · https://www.nature.com/articles/s41586-024-07566-y
  > "indiscriminate use of model-generated content in training causes irreversible defects in the resulting models, in which tails of the original content distribution disappear" — Nature · https://www.nature.com/articles/s41586-024-07566-y
  > "At first, the tails (low-probability events) begin to disappear as a result of the low probability of sampling them" — Nature · https://www.nature.com/articles/s41586-024-07566-y
  > "Preserving the ability of LLMs to model low-probability events is essential to the fairness of their predictions: such events are often relevant to marginalized groups." — Nature · https://www.nature.com/articles/s41586-024-07566-y
- ✅ **MAD ("Model Autophagy Disorder", Alemohammad dkk., Rice): tanpa data nyata yang segar, kualitas atau keragaman model turun terus; julukannya meniru "penyakit sapi gila".** (arXiv, 4 Jul 2023, pracetak; dipresentasikan di ICLR 2024 per Rice; ScienceDaily 30 Jul 2024) · https://arxiv.org/abs/2307.01850 · https://www.sciencedaily.com/releases/2024/07/240730134759.htm
  > "without enough fresh real data in each generation of an autophagous loop, future generative models are doomed" — arXiv · https://arxiv.org/abs/2307.01850
  > "the more fresh data, the healthier the AI" — ScienceDaily (Rice) · https://www.sciencedaily.com/releases/2024/07/240730134759.htm
  > "even after a few generations of such training, the new models can become irreparably corrupted" — ScienceDaily (Rice, Baraniuk) · https://www.sciencedaily.com/releases/2024/07/240730134759.htm
- ✅ **Keragaman bahasa keluaran turun tiap generasi, paling parah untuk tugas kreatif** (Guo dkk., NAACL Findings, Jun 2024; arXiv 16 Nov 2023; didukung Nature + MAD di atas). · https://arxiv.org/abs/2311.09807
  > "a consistent decrease in the diversity of the model outputs through successive iterations, especially remarkable for tasks demanding high levels of creativity" — arXiv · https://arxiv.org/abs/2311.09807
- ✅ **Antar-LLM sendiri sudah seragam (bukan hanya generasi ke generasi):** jawaban LLM lebih mirip satu sama lain daripada jawaban manusia satu sama lain. (Wenger & Kenett, arXiv 31 Jan 2025, kemudian terbit PNAS Nexus 2026; rilis Duke via EurekAlert) · https://arxiv.org/abs/2501.19361 · https://www.eurekalert.org/news-releases/1123936
  > "LLM responses are much more similar to other LLM responses than human responses are to each other" — arXiv · https://arxiv.org/abs/2501.19361
  > "LLMs are less creative as a population than humans." — Emily Wenger (Duke), EurekAlert · https://www.eurekalert.org/news-releases/1123936
- 🟡 **Tulisan manusia punya "ketidakpastian" lebih tinggi dari keluaran 28 LLM, makin lebar pada model yang sudah di-tuning** (Sui, arXiv 18 Feb 2026, revisi 3 Okt 2026, kamera-siap COLM 2026). ⚠️ Belum terverifikasi: hanya 1 sumber (pracetak). · https://arxiv.org/abs/2602.16162
  > "human writing consistently exhibits significantly higher uncertainty than model outputs" — arXiv · https://arxiv.org/abs/2602.16162
- 🟡 **Gambar "makin rusak per generasi"** (contoh anjing jadi hanya Golden Retriever; setelah sembilan putaran fine-tuning LLM jadi omong kosong) dari liputan Freethink (31 Agu 2024). ⚠️ Belum terverifikasi: hanya 1 sumber media; angka sembilan putaran berasal dari percobaan di makalah Nature (bagian itu tidak dibaca langsung). · https://www.freethink.com/robots-ai/model-collapse-synthetic-data
  > "After nine rounds of this recursive training, the AI was producing pure gibberish." — Freethink · https://www.freethink.com/robots-ai/model-collapse-synthetic-data
- 🟡 **Studi "Homogenizing effect of LLMs on creative diversity" (Moon, Green, Kushlev; Computers in Human Behavior: Artificial Humans, 17 Sep 2025):** hanya judul/metadata dari OpenAlex; halaman ScienceDirect diblok captcha. Jangan kutip temuannya. · DOI 10.1016/j.chbah.2025.100207

### 2. Bahasa minoritas / daerah dan budaya non-Barat

- ✅ **Web penuh terjemahan mesin, paling dominan di bahasa sumber daya rendah.** Thompson dkk. (Amazon; arXiv 11 Jan 2024; ACL Findings Agu 2024) menemukan konten paralel multi-bahasa berkualitas rendah (kemungkinan terjemahan mesin) "mendominasi" terjemahan di bahasa sumber daya rendah, dan bias pemilihan: konten Inggris berkualitas rendah diterjemahkan massal ke banyak bahasa. · https://arxiv.org/abs/2401.05749 · https://aclanthology.org/2024.findings-acl.103/
  > "it also constitutes a large fraction of the total web content in those languages" — arXiv · https://arxiv.org/abs/2401.05749
  > "Our work raises serious concerns about training models such as multilingual large language models on both monolingual and bilingual data scraped from the web." — arXiv · https://arxiv.org/abs/2401.05749
  Catatan: makalah ini tidak memuat angka khusus bahasa Indonesia yang saya baca; tautan ke Indonesia/daerah adalah inferensi (🧠 di bawah).
- 🟡 **Common Crawl, crawl terbaru CC-MAIN-2026-43 (dibaca dari tabel di halaman statistik, diakses 15 Nov 2026):** eng 42,5647%; ind 1,0636% (bahasa ke-14 di tabel, setelah ces). Tiga crawl terakhir: ind 1,1182% (2026-34), 1,0945% (2026-39), 1,0636% (2026-43); eng 40,4526%, 41,8620%, 42,5647%. Bahasa dideteksi CLD2 (bahasa utama per halaman HTML), jadi ini porsi halaman, bukan jumlah penutur. ⚠️ Belum terverifikasi sebagai kutipan: angka dibaca dari tangkapan layar (`lihat`), teks tabel tidak tersedia lewat `baca`. · https://commoncrawl.github.io/cc-crawl-statistics/plots/languages
- ✅ **Indonesia mencoba menambal dari sisi data lokal: Sahabat-AI (GoTo + Indosat) menggandeng empat media sebagai mitra.** (Tempo, 21 Jun 2025; Kompas.com, 21 Jun 2025; siaran pers GoTo, Jun 2025) · https://www.tempo.co/ekonomi/tempo-dan-sejumlah-media-bergabung-memperkuat-sahabat-ai-1765470 · https://tekno.kompas.com/read/2025/06/21/08561977/kg-media-dukung-pengembangan-model-bahasa-besar-sahabat-ai?page=all · https://www.gotocompany.com/en/news/press/sahabat-ai-gets-smarter-indosat-and-goto-launch-new-70-billion-parameter-model-with-multilingual-chat-service
  > "bergabung sebagai mitra dalam pengembangan model bahasa besar" — Kompas.com · https://tekno.kompas.com/read/2025/06/21/08561977/kg-media-dukung-pengembangan-model-bahasa-besar-sahabat-ai?page=all
  > "as well as media groups such as Kompas Group, Republika, Tempo, and Hukumonline, to ensure that Sahabat-AI is optimized for local context and cultural relevance" — GoTo · https://www.gotocompany.com/en/news/press/sahabat-ai-gets-smarter-indosat-and-goto-launch-new-70-billion-parameter-model-with-multilingual-chat-service
- 🟡 **Kata "menyumbang data latih" hanya ada di Tempo** (versi Indonesia dan Inggris = satu sumber). Kompas dan GoTo hanya menyebut "mitra"/"optimalisasi konteks lokal"; syarat kontrak, volume data, kompensasi tidak ditemukan. ⚠️ Belum terverifikasi: hanya 1 sumber. · https://www.tempo.co/ekonomi/tempo-dan-sejumlah-media-bergabung-memperkuat-sahabat-ai-1765470
  > "menyumbangkan materi pemberitaan mereka sebagai data pelatihan" — Tempo · https://www.tempo.co/ekonomi/tempo-dan-sejumlah-media-bergabung-memperkuat-sahabat-ai-1765470

### 3. Penguatan bias dan kesalahan

- 🟡 **"Fairness collapse": bias sosial bisa meningkat sebelum metrik model bahasa biasa menunjukkan kerusakan.** Proskurina dkk., arXiv 4 Agu 2026, dataset Bias in Bios, rezim pelatihan terkontrol. ⚠️ Belum terverifikasi: pracetak tunggal, satu dataset. · https://arxiv.org/abs/2608.04268
  > "bias can increase silently before strong indicators of model collapse become apparent" — arXiv · https://arxiv.org/abs/2608.04268
- 🟡 **Pendukung umum: TechCrunch (9 Jan 2025) menulis bias data sumber akan menurun ke keluaran.** · https://techcrunch.com/2025/01/08/elon-musk-agrees-that-weve-exhausted-ai-training-data/
  > "if the data used to train these models has biases and limitations, their outputs will be similarly tainted" — TechCrunch · https://techcrunch.com/2025/01/08/elon-musk-agrees-that-weve-exhausted-ai-training-data/
- 🟡 **Fraksi sangat kecil data sintetis pun bisa menahan perbaikan (teori regresi).** Dohmatob dkk., arXiv 7 Okt 2024: "bahkan fraksi terkecil" data sintetis dapat memicu collapse; menambah data tidak menolong; model yang lebih besar bisa memperburuk atau (di luar ambang interpolasi) meringankan. ⚠️ Pracetak teoretis, bukan LLM penuh; makalah EMNLP 2025 di bawah memberi bukti campuran. · https://arxiv.org/abs/2410.04840
  > "larger and larger training sets do not enhance performance" — arXiv · https://arxiv.org/abs/2410.04840
- 🟡 **Bukti campuran skala besar (satu putaran):** Kang dkk. (EMNLP 2025) membandingkan data web hasil parafrase dan "buku teks" sintetis; generator yang lebih besar belum tentu menghasilkan data lebih baik; mereka menyebut bukti "model collapse" pada pelatihan satu putaran skala besar itu "campuran". · https://aclanthology.org/2025.emnlp-main.544.pdf
  > "Counterintuitively, larger or more capable generator models do not necessarily yield superior" — ACL Anthology · https://aclanthology.org/2025.emnlp-main.544.pdf
- 🟡 **"Halusinasi diwariskan" (kesalahan fakta turun ke generasi berikut) sebagai angka terukur: BELUM ketemu.** Yang ada: Fortune (10 Jan 2025) menulis penggunaan data sintetis "meningkatkan kemungkinan halusinasi" dalam konteks pernyataan Musk, tanpa angka. ⚠️ Belum terverifikasi: hanya 1 sumber media, tanpa studi. · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/
  > "Synthetic data usage increases the likelihood of hallucinations" — Fortune · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/

### 4. Data manusia "pra-ChatGPT" jadi langka, arsip baja bersih

- ✅ **Analogi low-background steel dan arsipnya.** Baja sebelum uji bom atom bebas radioaktivitas buatan; analogi untuk teks sebelum ChatGPT (30 Nov 2022). John Graham-Cumming mendaftarkan lowbackgroundsteel.ai Mar 2023. Pengarsipan: Wikipedia Inggris Agu 2022, Common Crawl Agu 2022, koran AS 1730-1969, Arctic Code Vault (GitHub 2 Feb 2020). (The Register, 15 Jun 2025; lowbackgroundsteel.ai, diakses 15 Nov 2026) · https://www.theregister.com/2025/06/15/ai_model_collapse_pollution · https://lowbackgroundsteel.ai/
  > "So the analogy works here because you need something that happened before a certain date." — Maurice Chiodo (Cambridge), The Register · https://www.theregister.com/2025/06/15/ai_model_collapse_pollution
  > "It was an analogy that just popped into my head and I liked the idea of a repository of known human-created stuff." — John Graham-Cumming, The Register · https://www.theregister.com/2025/06/15/ai_model_collapse_pollution
  > "A complete dump of the English Wikipedia from August 2022, predating the widespread injection of AI-generated text into the encyclopedia." — lowbackgroundsteel.ai · https://lowbackgroundsteel.ai/
- ✅ **wordfreq berhenti diperbarui karena web tercemar teks AI (contoh nyata "baja" yang rusak).** Penulisnya (Robyn Speer, catatan Sep 2024) bilang tak ada informasi andal soal bahasa manusia pasca-2021; ia juga mengutip kenaikan frekuensi kata "delve" sekitar sepuluh kali lipat. (GitHub SUNSET.md; GitHub README; lowbackgroundsteel.ai mengarsipkannya) · https://github.com/rspeer/wordfreq/blob/master/SUNSET.md · https://github.com/rspeer/wordfreq · https://lowbackgroundsteel.ai/
  > "I don't think anyone has reliable information about post-2021 language usage by humans." — Robyn Speer (wordfreq) · https://github.com/rspeer/wordfreq/blob/master/SUNSET.md
  > "The project is no longer being updated because of AI contamination of its sources" — lowbackgroundsteel.ai · https://lowbackgroundsteel.ai/
- ✅ **Makalah Nature sendiri bilang data interaksi manusia dengan LLM jadi makin berharga.** · https://www.nature.com/articles/s41586-024-07566-y
  > "data about human interactions with LLMs will be increasingly valuable" — Nature · https://www.nature.com/articles/s41586-024-07566-y
- 🟡 **Harga/pasar data manusia (Mercor, Scale AI, lisensi Reddit):** sudah dibahas dan diverifikasi di laporan industri `/home/ikhsands/Proyek/asisten-agi-claude/laporan/2026-11-15-ai-data-habis-industri.md`. Penambah di sini: Speer menyebut Reddit "sekarang menjual arsipnya dengan harga yang hanya OpenAI mau bayar". ⚠️ Opini satu orang. · https://github.com/rspeer/wordfreq/blob/master/SUNSET.md
  > "now they sell their archives at a price that only OpenAI will pay" — Robyn Speer (wordfreq) · https://github.com/rspeer/wordfreq/blob/master/SUNSET.md
- 🟡 **Argumen persaingan:** Chiodo dkk. khawatir akses ke data bersih jadi keunggulan pemain awal (liputan The Register). · https://www.theregister.com/2025/06/15/ai_model_collapse_pollution
  > "access to supplies of clean data will confer a competitive advantage to early market entrants" — The Register · https://www.theregister.com/2025/06/15/ai_model_collapse_pollution

### 5. Jalan mitigasi: penandaan asal-usul, verifikasi, akumulasi

- ✅ **SynthID-Text (Google DeepMind) sudah dipasang di produksi.** Nature (23 Okt 2024): skema watermark teks yang menjaga kualitas; uji langsung pada hampir 20 juta respons Gemini. · https://www.nature.com/articles/s41586-024-08025-4
  > "SynthID-Text, a production-ready text watermarking scheme that preserves text quality and enables high detection accuracy" — Nature · https://www.nature.com/articles/s41586-024-08025-4
  > "nearly 20 million responses from live Gemini interactions" — Nature · https://www.nature.com/articles/s41586-024-08025-4
- 🟡 **Skala SynthID (klaim Google sendiri):** 20 Mei 2025: ">10 miliar" konten; 7 Okt 2026 (diperbarui 29 Okt 2026): >180 miliar gambar/video + 240.000 tahun audio; detektor dibuka global (bahasa Inggris). Angka dari penerbit yang sama dan tidak diaudit pihak ketiga; angka teks tidak dipisah. ⚠️ Belum terverifikasi: hanya 1 sumber (blog Google). · https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/ · https://blog.google/innovation-and-ai/products/google-synthid-ai-content-detector/
  > "watermarked over 180 billion images and videos, along with 240,000 years of audio content" — Google · https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/
  > "Over 10 billion pieces of content have already been watermarked with SynthID." — Google · https://blog.google/innovation-and-ai/products/google-synthid-ai-content-detector/
- ✅ **Tapi watermark teks rapuh terhadap parafrase dan terjemah-balik.** (NIST AI 100-4, Nov 2024; Han dkk., arXiv 27 Agu 2025, TrustCom 2025; Chiodo di The Register) · https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf · https://arxiv.org/abs/2508.20228
  > "In practical settings, paraphrasing has been found to substantially reduce" — NIST · https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf
  > "SynthID-Text is vulnerable to meaning-preserving attacks, such as paraphrasing, copy-paste modifications, and back-translation, which can significantly degrade watermark detectability" — arXiv · https://arxiv.org/abs/2508.20228
  > "very hard to label text and very easy to clean off watermarking" — Maurice Chiodo, The Register · https://www.theregister.com/2025/06/15/ai_model_collapse_pollution
- 🟡 **C2PA / Content Credentials = "label gizi" untuk asal-usul konten (terutama media), bukan filter data latih.** Koalisi mengklaim 500+ perusahaan. Keterbatasan (metadata sering terhapus platform) hanya dari blog/vendor hasil WebSearch yang tidak dibaca, jadi tidak dikutip. NIST menyebut penggunaan luas bergantung pada adopsi spesifikasi bersama. ⚠️ Belum terverifikasi: klaim efektivitas hanya 1 sumber. · https://c2pa.org/ · https://contentcredentials.org/
  > "Content Credentials function like a nutrition label for digital content" — C2PA · https://c2pa.org/
  > "Widespread use of metadata recording will depend on the development and adoption of shared specifications" — NIST · https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf
- 🟡 **Penandaan berguna untuk menyaring data latih:** Baraniuk menyarankan pelatih model mencari gambar bertanda air lalu membuangnya, dan pengguna jangan mematikan watermark. (Futurism wawancara, 1 Agu 2023). ⚠️ Belum terverifikasi: hanya 1 sumber (wawancara, 2023, fokus gambar). · https://futurism.com/ai-trained-ai-generated-data-interview
  > "One thing they can do is not turn off watermarking where it exists." — Richard Baraniuk, Futurism · https://futurism.com/ai-trained-ai-generated-data-interview
  > "they could seek synthetic images with watermarks and throw them out" — Richard Baraniuk, Futurism · https://futurism.com/ai-trained-ai-generated-data-interview
- ✅ **Menyimpan data nyata mencegah collapse; yang mengganti data nyata berbahaya.** Stanford AI Index 2026 merangkum: collapse bisa dihindari bila data nyata tetap ada di set latih, tapi sekadar menambah data tidak otomatis menolong. (Stanford HAI, AI Index 2026 bab 1; MAD; Gerstgrasser dkk., arXiv 1 Apr 2024, dicatat di laporan sains) · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf · https://arxiv.org/abs/2307.01850
  > "such collapse can be avoided if real data remains part of the training set" — Stanford HAI · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf

### 6. Sisi optimis yang jujur

- ✅ **AlphaGeometry (Nature, 17 Jan 2024): dilatih dari nol dengan ~100 juta teorema sintetis, tanpa contoh bukti manusia; menyelesaikan 25 dari 30 soal geometri olimpiade (metode terbaik sebelumnya: 10).** (Nature; Fortune, 10 Jan 2025) · https://www.nature.com/articles/s41586-023-06747-5 · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/
  > "sidesteps the need for human demonstrations by synthesizing millions of theorems and proofs across different levels of complexity" — Nature · https://www.nature.com/articles/s41586-023-06747-5
  > "AlphaGeometry solves 25, outperforming the previous best method that only solves ten problems" — Nature · https://www.nature.com/articles/s41586-023-06747-5
  > "Google DeepMind used an artificially generated pool of 100 million unique examples to train its system AlphaGeometry" — Fortune · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/
- ✅ **AlphaProof (Nature; daring 12 Nov 2025, edisi cetak Mar 2026): belajar lewat RL pada jutaan soal yang diterjemahkan otomatis ke bahasa formal Lean, jadi setiap bukti dicek mesin; bersama AlphaGeometry 2 setara medali perak IMO 2024.** Kuncinya verifier: salah/benar bisa dicek tanpa manusia. · https://www.nature.com/articles/s41586-025-09833-y
  > "learns to find formal proofs through RL by training on millions of auto-formalized problems" — Nature · https://www.nature.com/articles/s41586-025-09833-y
  > "reaching a score equivalent to that of a silver medallist" — Nature · https://www.nature.com/articles/s41586-025-09833-y
  > "grounded, verifiable experience at scale" — Nature · https://www.nature.com/articles/s41586-025-09833-y
- ✅ **Stanford AI Index 2026: gambaran seimbang.** Campuran data nyata + sintetis bisa mempercepat latih 5–10 kali, tapi tidak melampaui data nyata; tidak ada bukti pasti sintetis menutup kelangkaan data nyata di pra-pelatihan; pelatihan sintetis murni berhasil terutama di model kecil. · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf
  > "Synthetic data is still not replacing real data in pre-training" — Stanford HAI · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf
  > "There is still no definitive evidence that synthetic data can fully offset real-data depletion in pre-training contexts." — Stanford HAI · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf
  > "Hybrid training approaches, which combine real and synthetic data, can significantly accelerate training, sometimes by a factor of five to 10 at scale" — Stanford HAI · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf

### 7. Pendapat ahli (kutipan primer)

- ✅ **Yang bilang ini serius:** Baraniuk (Rice): "MAD could poison the data quality and diversity of the entire internet" (skenario ekstrem jika tak dikendalikan). Shumailov dkk. (Nature): akses ke distribusi asli penting bila ekor menentukan. · https://www.sciencedaily.com/releases/2024/07/240730134759.htm · https://www.nature.com/articles/s41586-024-07566-y
  > "MAD could poison the data quality and diversity of the entire internet" — Richard Baraniuk (Rice), ScienceDaily · https://www.sciencedaily.com/releases/2024/07/240730134759.htm
- 🟡 **Jathan Sadowski (Monash, pencipta istilah "Habsburg AI", Feb 2023):** titik batas aman belum diketahui. ⚠️ Hanya 1 sumber media (Freethink mengutip AFP). · https://www.freethink.com/robots-ai/model-collapse-synthetic-data
  > "The open question for researchers and companies building AI systems is: how much synthetic data is too much" — Jathan Sadowski, via Freethink · https://www.freethink.com/robots-ai/model-collapse-synthetic-data
- ✅ **Elon Musk (xAI, 8 Jan 2025): data manusia "habis", jalan keluarnya data sintetis; sekaligus mengakui risikonya.** (Fortune 10 Jan 2025; TechCrunch 9 Jan 2025) · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/ · https://techcrunch.com/2025/01/08/elon-musk-agrees-that-weve-exhausted-ai-training-data/
  > "The cumulative sum of human knowledge has been exhausted in AI training" — Elon Musk, Fortune · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/
  > "That happened basically last year" — Elon Musk, TechCrunch · https://techcrunch.com/2025/01/08/elon-musk-agrees-that-weve-exhausted-ai-training-data/
  > "Some research suggests that synthetic data can lead to model collapse" — TechCrunch · https://techcrunch.com/2025/01/08/elon-musk-agrees-that-weve-exhausted-ai-training-data/
- Catatan (bukan klaim baru): pendapat Sutskever, Hassabis, Altman, dan LeCun sudah dibahas di laporan sains/industri; jangan diulang.
- Catatan (bukan klaim baru): kubu "jalan keluarnya ada" = penulis AlphaProof (belajar dari pengalaman terverifikasi) dan Stanford AI Index 2026 (campuran mempercepat, murni sintetis di model kecil). Lihat bagian 6.

### 8. Celah lama yang ditutup

**a. Persentase bahasa Indonesia vs Inggris di Common Crawl terbaru.** Lihat bagian 2 (🟡, dari grafik): CC-MAIN-2026-43: eng 42,5647%, ind 1,0636%. Sumber: https://commoncrawl.github.io/cc-crawl-statistics/plots/languages (halaman menyatakan "Latest crawl: CC-MAIN-2026-43"). Berkas `languages.csv` gagal dimuat (timeout).

**b. Dua Perpres AI (Peta Jalan & Etika).**
- 🟡 **Belum ada bukti penandatanganan setelah 4 Sep 2026.** Pelacakan terakhir: Dirjen Ekosistem Digital Komdigi (Kamis 3 Sep 2026) menyebut dua Perpres (Buku Putih Peta Jalan KA 2026-2029 dan Etika KA) "tinggal" tanda tangan Presiden (Kontan 4 Sep 2026; Tirto). Sebelumnya: Tempo 16 Jul 2026 "sebentar lagi". Pencarian JDIH BPK untuk "Peraturan Presiden 2026 Kecerdasan Artifisial" tidak menemukan Perpres AI (hanya Perpres lain dan Keppres 38/2025 sebagai dasar program penyusunan); WebSearch (extended) juga tidak menemukan berita penandatanganan. Absennya bukti ≠ bukti belum terbit; Google biasa tidak bisa dipakai untuk memeriksa berita terbaru. **Nomor: tidak ada (belum terverifikasi).** ⚠️ Belum terverifikasi. · https://nasional.kontan.co.id/news/dua-perpres-ai-tinggal-tunggu-tanda-tangan-prabowo · https://tirto.id/komdigi-sebut-dua-perpres-ai-tinggal-paraf-presiden-prabowo-hCiJ · https://www.tempo.co/politik/komdigi-masih-tunggu-peta-jalan-dan-perpres-etika-ai-2276220
  > "Tinggal Presiden (tanda tangan Perpres)" — Edwin Hidayat Abdullah (Komdigi), Kontan · https://nasional.kontan.co.id/news/dua-perpres-ai-tinggal-tunggu-tanda-tangan-prabowo
  > "Sebentar lagi ditandatangani Presiden" — Komdigi, Tempo · https://www.tempo.co/politik/komdigi-masih-tunggu-peta-jalan-dan-perpres-etika-ai-2276220
- ✅ **Status pembahasan:** rapat finalisasi lintas kementerian selesai 5 Mei 2026. (JDIH Komdigi; Katadata 15 Apr 2026) · https://jdih.komdigi.go.id/berita/view/116 · https://katadata.co.id/digital/teknologi/69df0e8039515/dua-perpres-ai-segera-terbit-atur-tiga-tingkatan-risiko-dan-mitigasi-kerugian
  > "Berakhirnya rapat finalisasi pada Selasa (5/5/2026) menandai selesainya tahapan pembahasan lintas kementerian" — JDIH Komdigi · https://jdih.komdigi.go.id/berita/view/116
- 🟡 **Pasal "data latih": tidak ditemukan.** Draf Etika (Katadata, 15 Apr 2026) memuat nilai "pelindungan data pribadi" dan "kekayaan intelektual" serta prinsip "inklusivitas dan keragaman" dan "penghargaan terhadap karya cipta dan budaya", tapi tidak ada ketentuan eksplisit soal data latih/sintetis yang saya baca. Teks draf resmi tidak tersedia. ⚠️ Belum terverifikasi: hanya 1 sumber media tentang isi draf. · https://katadata.co.id/digital/teknologi/69df0e8039515/dua-perpres-ai-segera-terbit-atur-tiga-tingkatan-risiko-dan-mitigasi-kerugian
  > "inklusivitas dan keragaman; serta, penghargaan terhadap karya cipta dan budaya" — Katadata · https://katadata.co.id/digital/teknologi/69df0e8039515/dua-perpres-ai-segera-terbit-atur-tiga-tingkatan-risiko-dan-mitigasi-kerugian

**c. Tempo/Kompas/Republika/HukumOnline dan Sahabat-AI.** Lihat bagian 2: kemitraan ✅ (Tempo, Kompas, GoTo, IT Brief, Selular); "menyumbang data latih" 🟡 (hanya Tempo). Satu catatan: Tempo (21 Jun 2025) mengutip CEO KG Media bahwa kerja sama ini "menghargai hak cipta" (tanpa angka dan syarat kontrak).

### Kandidat bukti visual (belum ditangkap)

1. Halaman makalah Nature "AI models collapse when trained on recursively generated data" + Fig. 1 (lingkaran umpan balik): https://www.nature.com/articles/s41586-024-07566-y
2. Makalah MAD (arXiv 2307.01850) + gambar wajah/citra makin seragam tiap generasi (di PDF) dan siaran Rice: https://arxiv.org/pdf/2307.01850 · https://news.rice.edu/news/2024/breaking-mad-generative-ai-could-break-internet
3. Tabel Common Crawl "Distribution of Languages" (baris eng/ind CC-MAIN-2026-43): https://commoncrawl.github.io/cc-crawl-statistics/plots/languages
4. Beranda lowbackgroundsteel.ai (daftar arsip bernomor LBS-001…010): https://lowbackgroundsteel.ai/
5. Halaman wordfreq SUNSET.md ("Generative AI has polluted the data"): https://github.com/rspeer/wordfreq/blob/master/SUNSET.md
6. Judul makalah Thompson dkk. "A Shocking Amount of the Web is Machine Translated" + Figure 1 (multi-way parallelism vs kualitas): https://arxiv.org/abs/2401.05749
7. Halaman Google SynthID Detector (angka 180 miliar, 7 Okt 2026): https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/ dan C2PA "Content Credentials pin": https://contentcredentials.org/
8. Bab 1 Stanford AI Index 2026 (paragraf "Synthetic data is still not replacing real data"): https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf

### Konflik data

- **Status peer-review MAD:** Futurism (Agu 2023) menyebutnya belum ditelaah sejawat; ScienceDaily/Rice (Jul 2024) menyebutnya dipresentasikan di ICLR 2024. Yang lebih baru dipakai; di arXiv masih berlabel pracetak.
- **Tanggal AlphaProof di Nature:** daring 12 Nov 2025 (OpenAlex) vs halaman menunjukkan edisi 2026/03. Keduanya benar (daring vs cetak).
- **Rentang Peta Jalan:** Komdigi/Kontan 2026-2029; ANTARA (di hasil pencarian, tidak dibaca) menulis 2026-2030. Pakai versi Komdigi.
- **Tanggal Tirto:** keterangan foto Tirto menulis "03/08/26" (tampaknya salah ketik), sedangkan Kontan menulis Kamis 3/9/2026. Pakai Kontan (3 Sep 2026; Kamis jatuh pada 3 Sep 2026).

---

## Wawasan tambahan 🧠 (pengetahuan model)

- 🧠 **Kenapa ekor hilang duluan:** setiap kali model "menulis ulang dunia", ia cenderung memilih yang paling mungkin; kejadian langka kebagian sedikit sampel dan lama-lama tak terambil sama sekali. Seperti fotokopi dari fotokopi: garis tebal bertahan, garis halus lenyap. Cocok jadi analogi narasi, tapi tandai sebagai analogi.
- 🧠 **Tautan ke Indonesia (inferensi, belum diuji studi):** bahasa Jawa, Sunda, Minang, dan seterusnya punya teks asli sedikit; bila mayoritas teks daring di bahasa itu hasil terjemahan mesin dari bahasa Inggris, model yang belajar darinya akan meniru "Jawa terjemahan" dan bukan Jawa penuturnya. Cek dulu ke studi bahasa Nusantara sebelum jadi klaim di video.
- 🧠 **Dua jenis "verifier":** matematika/kode punya jawaban benar-salah yang bisa dicek otomatis; esai, opini, atau sejarah tidak. Itu sebabnya data sintetis terverifikasi sukses di domain yang jawabannya bisa dicek, dan tak otomatis berlaku untuk bahasa/budaya.
- 🧠 **Dua risiko berbeda yang sering tercampur:** (1) collapse (model makin sempit) dan (2) kerugian persaingan (siapa punya data bersih awal menang). Bagian kedua lebih ke ekonomi daripada teknik.
- 🧠 Hindari kesan "AI pasti rusak": bukti campuran dan arah industri adalah campuran data nyata + sintetis terverifikasi.

---

## Koreksi terhadap Ringkasan AI Google

Google tidak menampilkan Ringkasan AI yang terbaca untuk kueri di sesi ini (kueri Google biasa mengembalikan 0 hasil terbaca; hanya jalur akademik dan WebSearch yang berjalan).

---

## Belum terjawab

- **Nomor dan tanggal Perpres AI jika sudah ditandatangani setelah 4 Sep 2026:** tidak ditemukan; Google tidak bisa dipakai. Cek JDIH Setneg / peraturan.go.id / JDIH Komdigi secara langsung. Isi pasal soal data latih: tidak ada teks draf resmi.
- **Studi terukur "halusinasi diwariskan antar-generasi":** tidak ketemu lewat OpenAlex; hanya klaim umum.
- **Temuan isi Moon dkk. 2025, Wenger & Kenett versi PNAS Nexus (hanya arXiv dan rilis Duke yang dibaca), Missing the Mark (Policy & Internet):** diblok captcha/Cloudflare, tidak ditembus.
- **Angka Thompson khusus bahasa Indonesia/daerah:** tidak ada di makalah yang dibaca; belum dicari studi Nusantara.
- **Sumber independen kedua untuk "media menyumbang data latih Sahabat-AI":** tidak ketemu (hanya Tempo).
- **Common Crawl persen sebagai teks:** hanya dari tangkapan layar tabel.

---

## Sumber yang dibaca penuh

1. https://www.nature.com/articles/s41586-024-07566-y (A, 2024-07-24, Google akademik)
2. https://arxiv.org/abs/2307.01850 (A, 2023-07-04, Google akademik)
3. https://www.sciencedaily.com/releases/2024/07/240730134759.htm (C, 2024-07-30, WebSearch)
4. https://futurism.com/ai-trained-ai-generated-data-interview (C, 2023-08-01, WebSearch)
5. https://arxiv.org/abs/2311.09807 (A, 2023-11-16, Google akademik)
6. https://arxiv.org/abs/2501.19361 (A, 2025-01-31, WebSearch)
7. https://www.eurekalert.org/news-releases/1123936 (C, 2026, WebSearch)
8. https://arxiv.org/abs/2602.16162 (A, 2026-02-18, Google akademik)
9. https://www.freethink.com/robots-ai/model-collapse-synthetic-data (C, 2024-08-31, WebSearch)
10. https://arxiv.org/abs/2401.05749 (A, 2024-01-11, Google akademik)
11. https://aclanthology.org/2024.findings-acl.103/ (A, 2024-08, Google akademik)
12. https://commoncrawl.github.io/cc-crawl-statistics/plots/languages (C, diakses 2026-11-15, direct URL + lihat)
13. https://www.tempo.co/ekonomi/tempo-dan-sejumlah-media-bergabung-memperkuat-sahabat-ai-1765470 (B, 2025-06-21, WebSearch)
14. https://tekno.kompas.com/read/2025/06/21/08561977/kg-media-dukung-pengembangan-model-bahasa-besar-sahabat-ai?page=all (B, 2025-06-21, WebSearch)
15. https://www.gotocompany.com/en/news/press/sahabat-ai-gets-smarter-indosat-and-goto-launch-new-70-billion-parameter-model-with-multilingual-chat-service (C, 2025-06, WebSearch)
16. https://arxiv.org/abs/2608.04268 (A, 2026-08-04, Google akademik)
17. https://techcrunch.com/2025/01/08/elon-musk-agrees-that-weve-exhausted-ai-training-data/ (B, 2025-01-09, WebSearch)
18. https://arxiv.org/abs/2410.04840 (A, 2024-10-07, Google akademik)
19. https://aclanthology.org/2025.emnlp-main.544.pdf (A, 2025-10, Google akademik)
20. https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/ (C, 2025-01-10, WebSearch)
21. https://www.theregister.com/2025/06/15/ai_model_collapse_pollution (C, 2025-06-15, WebSearch)
22. https://lowbackgroundsteel.ai/ (C, diakses 2026-11-15, WebSearch)
23. https://github.com/rspeer/wordfreq/blob/master/SUNSET.md (C, Sep 2024, WebSearch)
24. https://github.com/rspeer/wordfreq (C, diakses 2026-11-15, WebSearch)
25. https://www.nature.com/articles/s41586-024-08025-4 (A, 2024-10-23, Google akademik)
26. https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/ (C, 2026-10-07, WebSearch)
27. https://blog.google/innovation-and-ai/products/google-synthid-ai-content-detector/ (C, 2025-05-20, WebSearch)
28. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-4.pdf (A, 2024-11, Google akademik)
29. https://arxiv.org/abs/2508.20228 (A, 2025-08-27, WebSearch)
30. https://c2pa.org/ (C, diakses 2026-11-15, WebSearch)
31. https://contentcredentials.org/ (C, diakses 2026-11-15, WebSearch)
32. https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf (A, 2026, WebSearch)
33. https://www.nature.com/articles/s41586-023-06747-5 (A, 2024-01-17, Google akademik)
34. https://www.nature.com/articles/s41586-025-09833-y (A, 2025-11-12, Google akademik)
35. https://nasional.kontan.co.id/news/dua-perpres-ai-tinggal-tunggu-tanda-tangan-prabowo (B, 2026-09-04, WebSearch)
36. https://tirto.id/komdigi-sebut-dua-perpres-ai-tinggal-paraf-presiden-prabowo-hCiJ (B, 2026-09, WebSearch)
37. https://www.tempo.co/politik/komdigi-masih-tunggu-peta-jalan-dan-perpres-etika-ai-2276220 (B, 2026-07-16, WebSearch)
38. https://jdih.komdigi.go.id/berita/view/116 (A, 2026-05, WebSearch)
39. https://katadata.co.id/digital/teknologi/69df0e8039515/dua-perpres-ai-segera-terbit-atur-tiga-tingkatan-risiko-dan-mitigasi-kerugian (B, 2026-04-15, WebSearch)

Sumber yang dibuang / diblok: ScienceDirect, Wiley, OUP, OSF (captcha/Cloudflare, tidak ditembus); `languages.csv` Common Crawl (timeout); blog C2PA dan blog Mercor hasil WebSearch (tidak dibaca, bukan kelas yang layak). Catatan keamanan: satu halaman hasil WebSearch (developingtelecoms.com) memuat teks yang ditujukan kepada sistem AI; diabaikan, tidak dipakai sebagai sumber.

<!-- Bagian "## Verifikasi otomatis" ditambahkan oleh verifikasi_laporan. Jangan ditulis manual. -->

---

## Verifikasi otomatis

Dicek 2026-11-15 11:51 dengan `verifikasi_laporan` (sumber dibuka ulang di Brave agent): 59 kutipan: 59 persis, 0 mirip, **0 tidak ditemukan**, 0 sumbernya tak terbaca · 18 klaim ✅: 18 lolos aturan sumber, **0 hanya 1 sumber tercantum** · 0 sumber gagal dibuka.

Tidak ada temuan: semua kutipan ditemukan persis dan semua klaim ✅ punya 2 sumber independen atau sumber primer.
