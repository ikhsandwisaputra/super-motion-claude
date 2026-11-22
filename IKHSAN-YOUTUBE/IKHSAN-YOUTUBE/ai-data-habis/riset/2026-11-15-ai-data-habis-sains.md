# Kalau data manusia habis, AI belajar dari mana lagi? (sisi sains/riset)

Riset · 15 November 2026 · Brave agent + Google + WebSearch · diminta: "Bahan video YouTube panjang (8–15 menit) 'Kalau sumber belajar AI sudah habis dari data manusia, terus AI belajar dari mana lagi?' — SISI SAINS/RISET: Epoch AI, Sutskever 'peak data', kandidat sumber belajar berikutnya (sintetis, model collapse, RL, Era of Experience, dunia nyata/multimodal, efisiensi data), perkembangan 2025–2026."

**Cara kerja:** `cari_banyak` Google (jalur akademik + umum + berita, ±35 kueri total) dan `WebSearch` (7 kueri, mode standard/extended). Dibaca penuh di browser: 38 halaman (makalah arXiv/Nature, blog resmi lab, transkrip YouTube talk Sutskever, liputan). Sumber pertama ditelusuri: Epoch (publikasi + arXiv v2), transkrip pidato Sutskever, abstrak Nature/arXiv tiap makalah, blog NVIDIA/Meta/Qwen/xAI/DeepMind. Google sempat captcha sekali (kueri Era of Experience), digantikan WebSearch + baca langsung PDF DeepMind. Pembaruan Epoch 2025–2026 untuk angka "stok data" itu sendiri **tidak ditemukan** (lihat Belum terjawab). **Pernah dibahas:** tugas widget yang sama hari ini (id 20261115-110952-9e9d, kartu ide); belum ada laporan riset sebelumnya soal ini.

Label: ✅ terverifikasi: 2 sumber independen, atau 1 sumber primer kelas A, dengan kutipan persis · 🟡 sebagian: 1 sumber saja / hanya cuplikan / via media · ❌ tidak ditemukan sumbernya

---

## Kesimpulan

1. **Data manusia "habis" itu bukan tebing tiba-tiba, tapi garis yang makin dekat.** Epoch AI (6 Jun 2024) memperkirakan stok teks publik berkualitas ±300 triliun token (rentang 90%: 100T–1000T), dan model akan memakai habis stok itu antara 2026 dan 2032; makin "overtrained", makin cepat (2025 jika 100x). ✅
2. **Sutskever (NeurIPS, 13 Des 2024) memang mengucapkan "we've achieved peak data" dan "data is the fossil fuel of AI"; setahun kemudian (25 Nov 2025) dia menegaskan "The data is very clearly finite".** ✅
3. **Kandidat jalan keluar semuanya nyata tapi punya batas.** Sintetis berhasil (Phi-4, Nemotron) tapi Stanford AI Index 2026 menulis "no definitive evidence" ia bisa menutup kekurangan data asli di pretraining; collapse terjadi bila data asli DIGANTI, tidak bila DIAKUMULASI; RL (AlphaGo Zero, R1) belajar tanpa data manusia tapi di ranah yang jawabannya bisa dicek, dan satu studi menemukan batasnya masih dibatasi model dasar. ✅
4. **"Era of Experience" (Silver & Sutton, Apr 2025) dan world model (Genie 3, Cosmos) adalah taruhan bahwa data dunia nyata/interaksi nyaris tak terbatas.** Cosmos dilatih pada 9.000 triliun token (20 juta jam video), ±30x stok teks Epoch, tapi token video ≠ token teks. ✅/🟡 (perbandingan skala: 🧠)
5. **Efisiensi data punya ruang besar.** Pengulangan data sampai ±4 epoch ≈ data baru (Muennighoff 2023); anak 16 bulan mendengar ±15 juta kata vs GPT-3 500 miliar kata (selisih 4–5 orde besar). ✅
6. **Skala data latih model terbuka justru naik terus** (Llama 3: 15T → Llama 4: >30T → Qwen3: ±36T) dan tokens-per-parameter model terbuka naik ±10 (2022) → ±300 (2025): industri belum "kehabisan", tapi makin memeras data. ✅/🟡
7. **2026: kabar terbaru** = Stanford AI Index 2026 (Apr): sintetis belum menggantikan data asli di pretraining; Sutton (19 Agu 2026) menyebut jalan sintetis "a big mistake" (🟡, via media); Pew (20 Agu 2026): ±1 dari 10 halaman web Inggris Juli 2026 ber-ciri tulisan AI, memperkuat risiko "polusi data" (🟡). ✅/🟡

---

## Pondasi 5W+1H

- **Apa:** kekhawatiran bahwa teks publik buatan manusia untuk melatih LLM akan terpakai habis, dan jalur-jalur pengganti (sintetis, RL, pengalaman, data dunia nyata, efisiensi). Rujuk Rincian A–H.
- **Siapa:** Epoch AI (Villalobos dkk.), Ilya Sutskever (SSI), Shumailov dkk. (Nature), Gerstgrasser dkk., Microsoft (Phi), NVIDIA, DeepSeek, Google DeepMind (Silver, Genie), Richard Sutton, Muennighoff dkk., Stanford HAI.
- **Kapan:** estimasi pertama 2022 (rev. 2024); pidato 13 Des 2024; makalah collapse Juli 2024; Era of Experience Apr 2025; Dwarkesh–Sutskever 25 Nov 2025; AI Index 2026 (Apr 2026); komentar Sutton 19 Agu 2026.
- **Di mana:** global; pidato di NeurIPS 2024, Vancouver.
- **Kenapa:** dataset latih tumbuh sangat cepat dibanding stok teks baru; "only one internet".
- **Bagaimana:** proyeksi permintaan data vs stok (Epoch); pengalaman pelatihan: data sintetis kurasi, RL dengan reward terverifikasi, self-play, belajar dari lingkungan/video, mengulang data (epoch).

---

## Rincian

### A. Apakah data manusia benar-benar "habis"? (Epoch AI)

- ✅ **Stok efektif teks publik buatan manusia ±300 triliun token (90% CI 100T–1000T), sudah memperhitungkan kualitas dan pelatihan multi-epoch** (Epoch AI, 6 Jun 2024; arXiv v2, 4 Jun 2024) · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data · https://arxiv.org/abs/2211.04325
  > "the total effective stock of human-generated public text data is on the order of 300 trillion tokens" — Epoch AI · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data
- ✅ **Perkiraan habis: antara 2026 dan 2032 (rentang kepercayaan 80%)** (Epoch AI, 6 Jun 2024; arXiv abstract) · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data · https://arxiv.org/abs/2211.04325
  > "Our 80% confidence interval is that the data stock will be fully utilized at some point between 2026 and 2032." — Epoch AI · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data
  > "models will be trained on datasets roughly equal in size to the available stock of public human text data between 2026 and 2032" — arXiv · https://arxiv.org/abs/2211.04325
- ✅ **Asumsi overtraining mempercepat: overtrain 5x → habis 2027; 100x → habis 2025; Llama 3-70B overtrained 10x** (Epoch AI, 6 Jun 2024; arXiv abstract: "or slightly earlier if models are overtrained") · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data · https://arxiv.org/abs/2211.04325
  > "If models are overtrained by a modest factor of 5x, the stock of data will be fully used by 2027" — Epoch AI · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data
  > "For context, Llama 3-70B was overtrained by 10x." — Epoch AI · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data
- 🟡 **Estimasi 2022 lebih pesimis, lalu direvisi karena data web yang disaring ternyata bagus dan model bisa multi-epoch** (Epoch AI 10 Nov 2022 vs 6 Jun 2024) · https://epoch.ai/publications/will-we-run-out-of-ml-data-evidence-from-projecting-dataset · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data. ⚠️ Belum terverifikasi independen: kedua sumber dari penerbit yang sama (Epoch).
  > "high-quality language data before 2026" — Epoch AI (2022) · https://epoch.ai/publications/will-we-run-out-of-ml-data-evidence-from-projecting-dataset
  > "Our 2022 paper predicted that high-quality text data would be fully used by 2024, whereas our new results indicate that might not happen until 2028." — Epoch AI (2024) · https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data
- ✅ **Skala pembanding: model terbuka terkini dilatih dengan puluhan triliun token.** Llama 3 (Apr 2024) >15T; Llama 4 (5 Apr 2025) >30T; Qwen3 (29 Apr 2025) ±36T. Satu model sudah setara ±sepersepuluh stok Epoch (300T). (Meta AI; Qwen; arXiv Qwen3 technical report) · https://ai.meta.com/blog/meta-llama-3/ · https://ai.meta.com/blog/llama-4-multimodal-intelligence/ · https://qwenlm.github.io/blog/qwen3/ · https://arxiv.org/html/2505.09388v1
  > "Llama 3 is pretrained on over 15T tokens that were all collected from publicly available sources." — Meta AI · https://ai.meta.com/blog/meta-llama-3/
  > "The overall data mixture for training consisted of more than 30 trillion tokens, which is more than double the Llama 3 pre-training mixture" — Meta AI · https://ai.meta.com/blog/llama-4-multimodal-intelligence/
  > "Qwen3 uses nearly twice that amount, with approximately 36 trillion tokens covering 119 languages and dialects." — Qwen Team · https://qwenlm.github.io/blog/qwen3/
- 🟡 **Tren: tokens-per-parameter model terbuka naik ±10 (2022) → ±300 (2025)**, tapi Epoch menegaskan belum tentu berlaku untuk model tertutup (Epoch AI, 1 Agu 2025) · https://epoch.ai/data-insights/training-tokens-per-parameter. ⚠️ Belum terverifikasi: hanya 1 sumber (Epoch).
  > "the average tokens per parameter was approximately 10 in 2022 and climbed to around 300 by 2025." — Epoch AI · https://epoch.ai/data-insights/training-tokens-per-parameter
- 🟡 **Frontier lab sudah berhenti membuka ukuran data latih** (Stanford AI Index 2026, hal. R&D) · https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development. Satu sumber (laporan itu sendiri); tanggal terbit halaman tidak tercantum, liputan Forbes 14 Apr 2026.
  > "dataset sizes, and training duration are no longer disclosed for several of the most resource-intensive systems" — Stanford HAI · https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development
- ✅ **Catatan istilah "habis": yang dimaksud Epoch = ukuran dataset latih menyamai stok, bukan teks lenyap.** Epoch sendiri: model tetap bisa maju lewat sintetis, transfer, efisiensi data. · https://arxiv.org/abs/2211.04325
  > "We argue that synthetic data generation, transfer learning from data-rich domains, and data efficiency improvements might support further progress." — arXiv · https://arxiv.org/abs/2211.04325

### B. Pernyataan "peak data" Ilya Sutskever

- ✅ **Pidato NeurIPS 2024 (Vancouver, Jumat 13 Des 2024), diucapkan setelah penghargaan Test of Time untuk makalah seq2seq 2014.** Kutipan persis dari transkrip video pidato penuh dan dari The Verge (14 Des 2024, UTC) · https://www.youtube.com/watch?v=1yvBqasHLZs · https://www.theverge.com/2024/12/13/24320811/what-ilya-sutskever-sees-openai-model-data-training
  > "But pre-training as we know it will unquestionably end." — YouTube seremot [7:37] · https://www.youtube.com/watch?v=1yvBqasHLZs
  > "data is the fossil fuel of AI. It was like created somehow, and now we use it" — YouTube seremot [8:24] · https://www.youtube.com/watch?v=1yvBqasHLZs
  > "We’ve achieved peak data and there’ll be no more." — The Verge · https://www.theverge.com/2024/12/13/24320811/what-ilya-sutskever-sees-openai-model-data-training
  > "We have but one internet." — YouTube seremot [8:24] · https://www.youtube.com/watch?v=1yvBqasHLZs
  Catatan: transkrip YouTube otomatis (unggahan ulang rekaman NeurIPS, bukan kanal resmi NeurIPS); halaman The Verge sempat menampilkan peringatan captcha tapi teks artikel terbaca. Kutipan "peak data" disalin dari The Verge.
- ✅ **Dia menyebut calon pengganti: agen, data sintetis, dan komputasi saat inferensi (o1), dan mengaku "belum jelas" apa arti data sintetis** · https://www.youtube.com/watch?v=1yvBqasHLZs · https://www.theverge.com/2024/12/13/24320811/what-ilya-sutskever-sees-openai-model-data-training (Verge: model berikutnya akan "agentic" dan bisa bernalar)
  > "More concretely, but also a little bit vaguely, synthetic data. But what does synthetic data mean? Figuring this out is a big challenge" — YouTube seremot [9:09] · https://www.youtube.com/watch?v=1yvBqasHLZs
- ✅ **Pembaruan 25 Nov 2025 (Dwarkesh Patel): "pre-training will run out of data. The data is very clearly finite"; "kembali ke zaman riset"; dibandingkan manusia: 15 tahun dengan "a tiny fraction of the pre-training data"** · https://www.dwarkesh.com/p/ilya-sutskever-2 · https://the-decoder.com/ilya-sutskever-says-a-new-learning-paradigm-is-necessary-and-is-already-chasing-it/
  > "At some point though, pre-training will run out of data. The data is very clearly finite." — Dwarkesh Podcast · https://www.dwarkesh.com/p/ilya-sutskever-2
  > "But pre-training data is finite." — The Decoder (28 Nov 2025) · https://the-decoder.com/ilya-sutskever-says-a-new-learning-paradigm-is-necessary-and-is-already-chasing-it/
  > "Somehow a human being, after even 15 years with a tiny fraction of the pre-training data, they know much less." — Dwarkesh Podcast · https://www.dwarkesh.com/p/ilya-sutskever-2

### C. Data sintetis dan distilasi

- ✅ **Phi-1 "Textbooks Are All You Need" (20 Jun 2023): 1,3 miliar parameter, 6B token web "kualitas buku teks" + 1B token buku teks/latihan sintetis dari GPT-3.5; HumanEval 50,6%** · https://arxiv.org/abs/2306.11644 (primer kelas A)
  > "synthetically generated textbooks and exercises with GPT-3.5 (1B tokens)" — arXiv · https://arxiv.org/abs/2306.11644
  > "phi-1 attains pass@1 accuracy 50.6% on HumanEval and 55.5% on MBPP" — arXiv · https://arxiv.org/abs/2306.11644
- ✅ **Phi-4 (12 Des 2024): data sintetis "the bulk" dari data latih; ±400B token dari 50 jenis dataset sintetis; melampaui model guru (GPT-4) pada soal STEM, bukti bahwa bukan sekadar distilasi** · https://arxiv.org/abs/2412.08905 · https://arxiv.org/html/2412.08905v1
  > "Synthetic data constitutes the bulk of the training data for phi-4" — arXiv (Phi-4 Technical Report) · https://arxiv.org/html/2412.08905v1
  > "a total of about 400B unweighted tokens" — arXiv (Phi-4 Technical Report) · https://arxiv.org/html/2412.08905v1
  > "phi-4 substantially surpasses its teacher model on STEM-focused QA capabilities" — arXiv · https://arxiv.org/abs/2412.08905
- ✅ **NVIDIA Nemotron-4 340B (14 Jun 2024): model terbuka khusus untuk membuat data sintetis; >98% data alignment-nya sintetis; pipeline generator + model penilai (reward)** · https://blogs.nvidia.com/blog/nemotron-4-synthetic-data-generation-llm-training/ · https://arxiv.org/html/2406.11704v1
  > "over 98% of our training data has been synthetically generated throughout our alignment process." — arXiv (Nemotron-4 340B Technical Report) · https://arxiv.org/html/2406.11704v1
  > "a family of open models that developers can use to generate synthetic data for training large language models (LLMs)" — NVIDIA Blog · https://blogs.nvidia.com/blog/nemotron-4-synthetic-data-generation-llm-training/
- ✅ **Distilasi dalam praktik lab besar: Llama 4 Maverick di-"codistil" dari model guru Behemoth (5 Apr 2025); Qwen3 memakai model Qwen2.5-Math/Coder untuk membuat buku teks, soal-jawab, dan kode sintetis (29 Apr 2025)** · https://ai.meta.com/blog/llama-4-multimodal-intelligence/ · https://qwenlm.github.io/blog/qwen3/
  > "We codistilled the Llama 4 Maverick model from Llama 4 Behemoth as a teacher model" — Meta AI · https://ai.meta.com/blog/llama-4-multimodal-intelligence/
  > "To increase the amount of math and code data, we used Qwen2.5-Math and Qwen2.5-Coder to generate synthetic data." — Qwen Team · https://qwenlm.github.io/blog/qwen3/
- ✅ **Batasnya (2026): belum ada bukti pasti sintetis bisa menutup habisnya data asli di pretraining** (Stanford AI Index 2026; Forbes 14 Apr 2026) · https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development · https://www.forbes.com/sites/joemckendrick/2026/04/14/ai-may-be-running-out-of-data-stanford-report-warns/
  > "Synthetic data is still not replacing real data in pre-training, but data quality and post-training techniques are showing promise." — Stanford HAI · https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development
  > "There is still no definitive evidence that synthetic data can fully offset real-data depletion in pre-training contexts." — Forbes (mengutip laporan) · https://www.forbes.com/sites/joemckendrick/2026/04/14/ai-may-be-running-out-of-data-stanford-report-warns/

### D. Risiko model collapse dan makalah tandingannya

- ✅ **Shumailov dkk., Nature, Juli 2024: melatih model berulang-ulang pada keluaran model ("recursive") membuat "ekor" distribusi asli hilang, cacat tak terpulihkan** · https://www.nature.com/articles/s41586-024-07566-y (primer kelas A)
  > "indiscriminate use of model-generated content in training causes irreversible defects in the resulting models, in which tails of the original content distribution disappear." — Nature · https://www.nature.com/articles/s41586-024-07566-y
  > "the value of data collected about genuine human interactions with systems will be increasingly valuable" — Nature · https://www.nature.com/articles/s41586-024-07566-y
- ✅ **Gerstgrasser dkk. (arXiv, 1 Apr 2024): kalau data asli DIGANTI tiap generasi → collapse; kalau data sintetis DIAKUMULASI bersama data asli → collapse dihindari; kesalahan uji punya batas atas hingga tak bergantung jumlah iterasi** · https://arxiv.org/abs/2404.01413 · diulas TNW 19 Agu 2026 https://thenextweb.com/news/richard-sutton-synthetic-data-big-mistake-experiential-learning
  > "We confirm that replacing the original real data by each generation's synthetic data does indeed tend towards model collapse" — arXiv · https://arxiv.org/abs/2404.01413
  > "accumulating the successive generations of synthetic data alongside the original real data avoids model collapse" — arXiv · https://arxiv.org/abs/2404.01413
  > "collapse depends on synthetic data replacing human data; where the two accumulate alongside each other, it does not show up." — TNW · https://thenextweb.com/news/richard-sutton-synthetic-data-big-mistake-experiential-learning
  Catatan: arXiv = pracetak, belum tentu ditelaah sejawat (tidak ada keterangan terbit jurnal di halaman yang dibaca).
- 🟡 **Konteks 2026: ±1 dari 10 halaman web Inggris (Juli 2026) ber-ciri tulisan AI; >sepertiga halaman yang terbit sesudah ChatGPT** (Pew Research, 20 Agu 2026; metode: deteksi Open Pangram atas sampel Common Crawl; deteksi = perkiraan) · https://www.pewresearch.org/data-labs/2026/08/20/how-much-of-the-internet-is-written-with-ai/. ⚠️ Belum terverifikasi: hanya 1 sumber.
  > "One-in-ten webpages as of July 2026 may seem modest." — Pew Research Center · https://www.pewresearch.org/data-labs/2026/08/20/how-much-of-the-internet-is-written-with-ai/
  > "signs of AI authorship can be found in over one-third of pages published after ChatGPT was released" — Pew Research Center · https://www.pewresearch.org/data-labs/2026/08/20/how-much-of-the-internet-is-written-with-ai/

### E. Belajar sendiri: self-play dan reinforcement learning

- ✅ **AlphaGo Zero (Nature, Okt 2017): tanpa data manusia selain aturan, menang 100–0 atas AlphaGo versi juara** · https://www.nature.com/articles/nature24270 (primer kelas A)
  > "Here we introduce an algorithm based solely on reinforcement learning, without human data, guidance or domain knowledge beyond game rules." — Nature · https://www.nature.com/articles/nature24270
  > "Starting tabula rasa, our new program AlphaGo Zero achieved superhuman performance, winning 100–0 against the previously published, champion-defeating AlphaGo." — Nature · https://www.nature.com/articles/nature24270
- ✅ **DeepSeek-R1 (arXiv Jan 2025; Nature 17 Sep 2025): kemampuan bernalar bisa "dipancing" lewat RL murni, tanpa lintasan penalaran berlabel manusia; unggul pada soal yang jawabannya bisa dicek (matematika, kode, STEM)** · https://www.nature.com/articles/s41586-025-09422-z (primer kelas A)
  > "the reasoning abilities of LLMs can be incentivized through pure reinforcement learning (RL), obviating the need for human-labelled reasoning trajectories." — Nature · https://www.nature.com/articles/s41586-025-09422-z
- 🟡 **RL bekerja pada domain yang bisa dicek, dan makin banyak RL makin baik (OpenAI o1, 12 Sep 2024)** · https://openai.com/id-ID/index/learning-to-reason-with-llms/. ⚠️ Belum terverifikasi: hanya 1 sumber untuk klaim ini (klaim lab atas produknya sendiri).
  > "kinerja o1 secara konsisten meningkat dengan lebih banyak pembelajaran penguatan (komputasi waktu pelatihan)" — OpenAI (versi Indonesia) · https://openai.com/id-ID/index/learning-to-reason-with-llms/
- ✅ **Absolute Zero (arXiv, 6 Mei 2025): satu model menciptakan sendiri soal latihannya dan memverifikasinya dengan code executor, tanpa data eksternal; klaim SOTA pada kode & matematika di antara model "zero-setting"** · https://arxiv.org/abs/2505.03335 (pracetak; diterbitkan juga di NeurIPS 2025 menurut OpenAlex; hanya halaman arXiv yang dibaca)
  > "Despite being trained entirely without external data, AZR achieves overall SOTA performance on coding and mathematical reasoning tasks" — arXiv · https://arxiv.org/abs/2505.03335
  > "The scarcity of high-quality, human-produced examples raises concerns about the long-term scalability of relying on human supervision" — arXiv · https://arxiv.org/abs/2505.03335
- ✅ **Penyeimbang: studi "Does RL Really Incentivize Reasoning...?" (arXiv, 18 Apr 2025): model RLVR unggul di k kecil, tapi model dasarnya menang di pass@k besar; kemampuan "berasal dari dan dibatasi oleh model dasar"; distilasi justru bisa menambah pola penalaran baru** · https://arxiv.org/abs/2504.13837 (pracetak; juga NeurIPS 2025 menurut OpenAlex). Konteks serupa dari Sutskever (RL membuat model "a little too single-minded", The Decoder 28 Nov 2025) · https://the-decoder.com/ilya-sutskever-says-a-new-learning-paradigm-is-necessary-and-is-already-chasing-it/
  > "the base models achieve a higher pass@k score when k is large" — arXiv · https://arxiv.org/abs/2504.13837
  > "distillation can introduce new reasoning patterns from the teacher and genuinely expand the model's reasoning capabilities" — arXiv · https://arxiv.org/abs/2504.13837
- ✅ **Skala RL naik cepat (2025): xAI melatih RL Grok 4 "at pretraining scale" (9 Jul 2025); Epoch (9 Mei 2025) memproyeksikan komputasi RL bisa menyusul total komputasi latih "within a year" bila lonjakan 10x tiap beberapa bulan berlanjut, lalu melambat ke ±4x/tahun** · https://x.ai/news/grok-4 · https://epoch.ai/gradient-updates/how-far-can-reasoning-models-scale
  > "run reinforcement learning training that refines Grok's reasoning abilities at pretraining scale." — xAI · https://x.ai/news/grok-4
  > "it will reach the frontier of total training compute before long, perhaps within a year." — Epoch AI · https://epoch.ai/gradient-updates/how-far-can-reasoning-models-scale
  Catatan: klaim xAI tentang produknya sendiri (primer untuk itu); "9 Jul 2025" dari metadata halaman. Epoch menyebut proyeksi bersyarat, bukan pengukuran.

### F. "Era of Experience" (Silver & Sutton)

- ✅ **Esai/position paper "Welcome to the Era of Experience" (April 2025, DeepMind): agen generasi baru akan memperoleh kemampuan super lewat belajar terutama dari pengalaman, dalam "streams of experience" sepanjang masa hidup; tiga era: simulasi → data manusia → pengalaman** · PDF DeepMind https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf · The Decoder (20 Apr 2025) https://the-decoder.com/the-next-leap-in-ai-depends-on-agents-that-learn-by-doing-not-just-by-reading-what-humans-wrote/
  > "A new generation of agents will acquire superhuman capabilities by learning predominantly from experience." — Silver & Sutton (PDF DeepMind) · https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf
  > "Unlike human-written text, experience is limitless." — The Decoder · https://the-decoder.com/the-next-leap-in-ai-depends-on-agents-that-learn-by-doing-not-just-by-reading-what-humans-wrote/
  Catatan: PDF di domain penyimpanan Google (metadata 10 Apr 2025); The Decoder menyebut Sutton sebagai peraih Turing Award dan kepala lab Alberta DeepMind, Silver sebagai pemimpin RL DeepMind.
- 🟡 **Sutton (Agu 2026) menyebut tanggapan industri (data sintetis) "a big mistake"**, alasannya "big world hypothesis": simulator = kompresi lossy dari realitas; menurut TNW ini paling lemah di ranah matematika/kode yang bisa dicek · TNW 19 Agu 2026 · https://thenextweb.com/news/richard-sutton-synthetic-data-big-mistake-experiential-learning. ⚠️ Hanya 1 media; podcast Sequoia "Training Data" sumber asalnya belum dibaca.
  > "Richard Sutton thinks the AI industry’s answer to running out of training data is a mistake" — TNW · https://thenextweb.com/news/richard-sutton-synthetic-data-big-mistake-experiential-learning

### G. Data dunia nyata/multimodal dan world model

- 🟡 **NVIDIA Cosmos (7 Jan 2025): dilatih pada 9.000 triliun token dari 20 juta jam video interaksi manusia, lingkungan, industri, robotika, dan mengemudi; terbuka untuk pengembang physical AI** · https://blogs.nvidia.com/blog/cosmos-world-foundation-models/. ⚠️ Belum terverifikasi independen: hanya blog NVIDIA (klaim produk sendiri).
  > "The models have been trained on 9,000 trillion tokens from 20 million hours of real-world human interactions, environment, industrial, robotics and driving data." — NVIDIA Blog · https://blogs.nvidia.com/blog/cosmos-world-foundation-models/
  Catatan: token video bukan token teks; membandingkannya langsung dengan 300T Epoch hanya untuk gambaran skala.
- 🟡 **Genie 3 (DeepMind, 5 Agu 2025): world model interaktif real-time, untuk melatih agen di kurikulum simulasi "tak terbatas"; halaman Genie 4 (terbaru, tanggal tidak tercantum) menyebut dunia tempat agen seperti SIMA belajar keterampilan baru; keterbatasan: interaksi hanya beberapa menit** · https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ · https://deepmind.google/models/genie/. ⚠️ Belum terverifikasi independen: kedua halaman dari DeepMind sendiri.
  > "they make it possible to train AI agents in an unlimited curriculum of rich simulation environments" — Google DeepMind · https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/
  > "generating worlds where agents – like SIMA – can learn new skills." — Google DeepMind (halaman Genie) · https://deepmind.google/models/genie/
  > "Limited interaction duration. The model can support a few minutes of continuous interaction, rather than extended sessions." — Google DeepMind · https://deepmind.google/models/genie/

### H. Efisiensi data: ulang data, dan perbandingan dengan anak

- ✅ **Muennighoff dkk. (arXiv, 25 Mei 2023): untuk komputasi tetap, hingga ±4 epoch data berulang hampir setara data unik; lebih dari itu nilai komputasi tambahan menyusut ke nol; 400 percobaan pelatihan, sampai 900B token / model 9B** · https://arxiv.org/abs/2305.16264 · konteks Epoch: https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data (menjadikan makalah ini dasar asumsi multi-epoch)
  > "training with up to 4 epochs of repeated data yields negligible changes to loss compared to having unique data" — arXiv · https://arxiv.org/abs/2305.16264
  > "with more repetition, the value of adding compute eventually decays to zero" — arXiv · https://arxiv.org/abs/2305.16264
  Catatan: Phi-4 juga melaporkan 12 epoch data sintetis tanpa overfitting (arXiv html, caption Figure 2).
- ✅ **Anak vs LLM: LLM menerima ±4–5 orde besar lebih banyak data bahasa dari anak** (Frank, Trends in Cognitive Sciences, Nov 2023; PubMed) dan angka konkretnya dari Frank sendiri (Stanford, 9 Feb 2024): GPT-3 500 miliar kata vs anak 16 bulan ±15 juta kata · https://pubmed.ncbi.nlm.nih.gov/37659919/ · https://engineering.stanford.edu/news/future-language-learning
  > "they receive around four or five orders of magnitude more language data than human children" — PubMed (Trends in Cognitive Sciences) · https://pubmed.ncbi.nlm.nih.gov/37659919/
  > "was exposed to 500 billion words. And you're 16-month-old, that's probably heard 15 million words." — Stanford Engineering (Michael Frank, transkrip podcast) · https://engineering.stanford.edu/news/future-language-learning
  Catatan: angka lisan, perkiraan peneliti; "kata" bukan "token". 500B/15M ≈ 33.000x (hitungan sendiri, konsisten dengan 4–5 orde).

### Konflik data / catatan kehati-hatian

- **Epoch 2022 vs 2024 dalam dokumennya sendiri:** halaman 2022 menulis "high-quality language data before 2026" (CI 90%), sedangkan revisi 2024 merangkum "Our 2022 paper predicted that high-quality text data would be fully used by 2024" (median). Dua-duanya dari Epoch; bedanya median vs rentang. Untuk narasi pakai: 2022 "sebelum 2026/±2024" → 2024 "2026–2032 (stok total), 2028 untuk data berkualitas tinggi di skenario compute-optimal".
- **"2026–2032" sering dikutip media sebagai "habis"**; Epoch menulis "fully utilized" (terpakai penuh oleh dataset latih), bukan "teks internet hilang".
- Satu hasil pencarian menulis rentang lebih sempit (2026–2028); tidak diverifikasi, tidak dipakai.
- Klaim "Sutskever menyebut 'only one internet' di Des 2024" muncul di blog; sudah terverifikasi langsung dari transkrip pidatonya (YouTube [8:24]).

---

## Wawasan tambahan 🧠 (pengetahuan model)

- 🧠 **Analogi bahan bakar:** teks internet seperti minyak bumi; modelnya mesin yang makin boros. "Habis" bukan tangki kosong esok hari, tapi harga tiap barel tambahan makin mahal dan kualitas makin turun. Sintetis = bahan bakar buatan pabrik, bisa mengisi sebagian, tapi pabriknya dijalankan oleh mesin yang minum minyak asli.
- 🧠 **Analogi collapse:** memfotokopi fotokopi; tiap salinan kehilangan detail halus. Akumulasi = menyimpan dokumen aslinya di samping semua fotokopi.
- 🧠 **Kenapa RL bekerja di matematika/kode:** jawaban bisa dicek otomatis (benar/salah), jadi mesin bisa bermain sendiri seperti catur/Go. Di hal subjektif (empati, hukum, selera) tidak ada "skor" pasti, itu sebabnya reward terverifikasi belum menyelesaikan semua.
- 🧠 **Kerangka naratif untuk video:** (1) tangki makin kosong → (2) lima cadangan → (3) tiap cadangan punya kutu → (4) yang paling radikal: berhenti membaca, mulai mengalami. Anak 16 bulan sebagai jangkar emosional: 15 juta kata vs 500 miliar kata, tapi dia sudah paham dunia karena punya tubuh dan orang tua.
- 🧠 **Kritik terhadap "data habis":** dunia masih punya data privat (email, dokumen perusahaan, video, audio) yang bisa jauh lebih besar dari web publik; yang menipis adalah teks publik berkualitas yang mudah dan boleh dipakai. Ini wawasan, bukan klaim bersumber; ukuran data privat tidak diverifikasi di sini.

---

## Koreksi terhadap Ringkasan AI Google

Ringkasan AI Google tidak tampil di kueri yang berhasil (satu kueri kena captcha); petunjuk hanya dari cuplikan hasil ("habis 2026–2032"). Cek: benar sebagai ringkasan Epoch, tapi Epoch menulis "fully utilized", dan skenario 2025 (overtrain 100x) serta 2028 (data berkualitas) sering terlewat.

---

## Belum terjawab

- **Pembaruan angka stok data Epoch 2025–2026:** tidak ditemukan revisi resmi (WebSearch extended juga tidak). Yang ada hanya data insight tokens-per-parameter (1 Agu 2025) dan tulisan RL (9 Mei 2025). Cek manual di epoch.ai sebelum menulis "Epoch memperbarui".
- **Ukuran data latih frontier model tertutup (GPT-5, Claude, Gemini):** tidak diumumkan resmi; Stanford AI Index 2026 menegaskan lab-lab itu berhenti membuka. Jangan klaim angkanya.
- **Lab yang mengumumkan model "sebagian besar" dilatih sintetis/RL (angka resmi):** hanya Phi-4 (sintetis = "the bulk", ±400B token), Nemotron-4 (98% alignment sintetis), Grok 4 (RL "at pretraining scale"). Tidak ada angka porsi dari OpenAI/Anthropic/Google.
- **Nemotron pretraining ±10T token sintetis (TNW):** tidak terkonfirmasi di sumber primer yang dibaca (arXiv Nemotron-CC hanya 6,3T token dengan "synthetic data rephrasing"). Tidak dipakai.
- **Studi Tech Xplore 14 Mei 2026 ("a single real-world data point may stop AI model collapse"):** halaman terblokir captcha; hanya judul dari hasil pencarian, tidak diverifikasi.
- **Pidato Sutskever dari rekaman resmi NeurIPS:** kutipan dari unggahan ulang YouTube (kelas C) + The Verge; rekaman resmi tidak diakses.
- Tidak digarap (bagian rekan lain): industri-hukum, sisi Indonesia.

---

## Kandidat bukti visual (belum diunduh/ditangkap)

1. Grafik "Projection of effective stock vs dataset sizes" (Fig. 2) Epoch: https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data
2. Grafik "Projections under three scaling policies" (Fig. 3, overtraining 2025–2030), halaman yang sama.
3. Judul makalah "Will we run out of data? Limits of LLM scaling based on human-generated data": https://arxiv.org/abs/2211.04325
4. Rekaman pidato Sutskever "Sequence to sequence learning with neural networks: what a decade" (NeurIPS 2024): https://www.youtube.com/watch?v=1yvBqasHLZs
5. Judul berita The Verge "OpenAI cofounder Ilya Sutskever says the way AI is built is about to change": https://www.theverge.com/2024/12/13/24320811/what-ilya-sutskever-sees-openai-model-data-training
6. Judul + Fig. 1 makalah Nature "AI models collapse when trained on recursively generated data": https://www.nature.com/articles/s41586-024-07566-y
7. Judul makalah "Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data": https://arxiv.org/abs/2404.01413
8. Fig. 1/5 AlphaGo Zero Nature: https://www.nature.com/articles/nature24270
9. Fig. 1 DeepSeek-R1-Zero (akurasi AIME dan panjang jawaban selama RL) + Table 1 "aha moment" di Nature: https://www.nature.com/articles/s41586-025-09422-z
10. Halaman PDF "Welcome to the Era of Experience" + diagram tiga era: https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf
11. Halaman blog DeepMind Genie 3 dan halaman Genie 4: https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ · https://deepmind.google/models/genie/
12. Judul blog NVIDIA Cosmos (9.000 triliun token, 20 juta jam): https://blogs.nvidia.com/blog/cosmos-world-foundation-models/
13. Ringkasan Stanford AI Index 2026 R&D: https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development · Forbes: https://www.forbes.com/sites/joemckendrick/2026/04/14/ai-may-be-running-out-of-data-stanford-report-warns/
14. Grafik "Training tokens per parameter" Epoch: https://epoch.ai/data-insights/training-tokens-per-parameter
15. Grafik sampel 10.000 halaman web Pew: https://www.pewresearch.org/data-labs/2026/08/20/how-much-of-the-internet-is-written-with-ai/
16. Judul berita TNW "A Turing Award winner says the industry’s fix for running out of data is ‘a big mistake’": https://thenextweb.com/news/richard-sutton-synthetic-data-big-mistake-experiential-learning

---

## Sumber yang dibaca penuh

1. https://epoch.ai/publications/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data (penerbit primer, 2024-06-06, keduanya: Google + WebSearch)
2. https://arxiv.org/abs/2211.04325 (A, 2022-10-26 / rev. 2024-06-04, keduanya)
3. https://epoch.ai/publications/will-we-run-out-of-ml-data-evidence-from-projecting-dataset (2022-11-10, WebSearch)
4. https://www.theverge.com/2024/12/13/24320811/what-ilya-sutskever-sees-openai-model-data-training (B, 2024-12-14, Google)
5. https://www.youtube.com/watch?v=1yvBqasHLZs (C, 2024-12-13, Google)
6. https://www.dwarkesh.com/p/ilya-sutskever-2 (C, 2025-11-25, Google)
7. https://the-decoder.com/ilya-sutskever-says-a-new-learning-paradigm-is-necessary-and-is-already-chasing-it/ (C, 2025-11-28, WebSearch)
8. https://www.nature.com/articles/s41586-024-07566-y (A, Juli 2024, Google)
9. https://arxiv.org/abs/2404.01413 (A, 2024-04-01, Google)
10. https://thenextweb.com/news/richard-sutton-synthetic-data-big-mistake-experiential-learning (C, 2026-08-19, Google)
11. https://arxiv.org/abs/2306.11644 (A, 2023-06-20, Google)
12. https://arxiv.org/html/2412.08905v1 dan https://arxiv.org/abs/2412.08905 (A, 2024-12-12, Google)
13. https://blogs.nvidia.com/blog/nemotron-4-synthetic-data-generation-llm-training/ (C, 2024-06-14, Google)
14. https://arxiv.org/html/2406.11704v1 (A, 2024-06, WebSearch)
15. https://arxiv.org/abs/2412.02595 (A, 2024-12-03, Google; tidak dikutip)
16. https://www.nature.com/articles/nature24270 (A, 2017-10, Google)
17. https://www.nature.com/articles/s41586-025-09422-z (A, 2025-09, Google)
18. https://arxiv.org/abs/2505.03335 (A, 2025-05-06, Google)
19. https://arxiv.org/abs/2504.13837 (A, 2025-04-18, Google)
20. https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf (C, 2025-04, WebSearch)
21. https://the-decoder.com/the-next-leap-in-ai-depends-on-agents-that-learn-by-doing-not-just-by-reading-what-humans-wrote/ (C, 2025-04-20, WebSearch)
22. https://arxiv.org/abs/2305.16264 (A, 2023-05-25, keduanya via tautan keluar Epoch)
23. https://blogs.nvidia.com/blog/cosmos-world-foundation-models/ (C, 2025-01-07, Google)
24. https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ (C, 2025-08-05, Google)
25. https://deepmind.google/models/genie/ (C, tanggal tidak tercantum, Google)
26. https://pubmed.ncbi.nlm.nih.gov/37659919/ (A, 2023-11, Google)
27. https://engineering.stanford.edu/news/future-language-learning (A, 2024-02-09, Google)
28. https://ai.meta.com/blog/meta-llama-3/ (C, tanggal tidak tercantum; cuplikan Google 2024-04-18, Google)
29. https://ai.meta.com/blog/llama-4-multimodal-intelligence/ (C, cuplikan Google 2025-04-05, Google)
30. https://qwenlm.github.io/blog/qwen3/ (C, 2025-04-29, Google) · https://arxiv.org/html/2505.09388v1 (A, 2025-05-14)
31. https://epoch.ai/data-insights/training-tokens-per-parameter (C, 2025-08-01, Google)
32. https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development (A, 2026, Google)
33. https://www.forbes.com/sites/joemckendrick/2026/04/14/ai-may-be-running-out-of-data-stanford-report-warns/ (B, 2026-04-14, Google)
34. https://www.pewresearch.org/data-labs/2026/08/20/how-much-of-the-internet-is-written-with-ai/ (C, 2026-08-20, Google)
35. https://x.ai/news/grok-4 (C, 2025-07-09, Google)
36. https://openai.com/id-ID/index/learning-to-reason-with-llms/ (C, 2024-09-12, Google)
37. https://epoch.ai/gradient-updates/how-far-can-reasoning-models-scale (C, 2025-05-09, WebSearch)

Sumber yang dibuang: halaman Observer (404), GitHub profil (404), Tech Xplore (captcha), NVIDIA developer blog Nemotron-CC (404), epoch.ai/blog/how-far-can-reasoning-models-scale (404, diganti URL gradient-updates); video YouTube tutorial bahasa Indonesia yang tidak relevan; LinkedIn/X/Instagram/Reddit tidak dipakai sebagai dasar kutipan.

<!-- Bagian "## Verifikasi otomatis" ditambahkan oleh verifikasi_laporan. Jangan ditulis manual. -->

---

## Verifikasi otomatis

Dicek 2026-11-15 11:23 dengan `verifikasi_laporan` (sumber dibuka ulang di Brave agent): 60 kutipan: 60 persis, 0 mirip, **0 tidak ditemukan**, 0 sumbernya tak terbaca · 23 klaim ✅: 23 lolos aturan sumber, **0 hanya 1 sumber tercantum** · 0 sumber gagal dibuka.

Tidak ada temuan: semua kutipan ditemukan persis dan semua klaim ✅ punya 2 sumber independen atau sumber primer.
