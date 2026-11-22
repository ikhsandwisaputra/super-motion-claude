# AGI bagian A: konsep, definisi, sejarah, dan sains (kenapa AI belum setara manusia)

Riset · 16 November 2026 · Brave agent + Google + WebSearch · diminta: "Apa itu AI AGI? Membuat AI setara seperti manusia?" (video YouTube Indonesia ±10–13 menit, bagian A = KONSEP & SAINS AGI; bagian B/C digarap peneliti lain)

**Cara kerja:** `cari_banyak` Google (jalur akademik + umum, ±16 kueri; Google kena captcha pada putaran ke-3 sehingga sisanya lewat WebSearch) dan `WebSearch` (±12 kueri). Dibaca penuh di browser: ±38 halaman/PDF (arXiv abs + PDF, OpenAI Charter, ARC Prize, UCL, Britannica, METR, DeepMind, TechCrunch, Decoder, FRI, Coefficient Giving, PDF Dartmouth/Turing/Life 1970, makalah Gubrud). Sumber pertama yang ditelusuri: makalah asli (Hendrycks, Morris, Chollet, Vaswani, Kaplan, Hoffmann, Kalai, ARC-AGI-3), PDF proposal Dartmouth, PDF Turing 1950, scan Life 1970, makalah Gubrud (Foresight). Science (Mitchell 2024) dan Wiley (Azevedo 2009) diblokir Cloudflare: abstraknya dibaca lewat Complexity Digest dan Europe PMC. WIRED (paywall) dan halaman Kuipers (Univ. Michigan, kini dialihkan) terbaca penuh saat riset tetapi tidak bisa dibuka ulang saat verifikasi, jadi kutipannya dicabut dari laporan dan klaim terkait diturunkan ke 🟡. Penemuan sumber: Google dan WebSearch dipakai bergantian (sumber yang ditemukan kedua mesin: arXiv Hendrycks, Dartmouth PDF). Catatan teknis: nomor hasil `cari` dipakai bersama regu paralel (state tertimpa), jadi semua bacaan akhir memakai URL. **Pernah dibahas:** topik AGI tidak pernah dibahas; fakta anak vs GPT-3 dipakai ulang dari `laporan/2026-11-15-ai-data-habis-sains.md` (bank fakta, 15 Nov 2026) dan dibuka ulang.

Label: ✅ terverifikasi: 2 sumber independen, atau 1 sumber primer kelas A, dengan kutipan persis · 🟡 sebagian: 1 sumber saja / hanya cuplikan / via media · ❌ tidak ditemukan sumbernya

---

## Kesimpulan

1. **Tidak ada satu definisi AGI yang disepakati; tiap pihak mengukurnya dengan penggaris berbeda.** OpenAI: sistem yang mengungguli manusia di sebagian besar pekerjaan bernilai ekonomi. DeepMind (Morris dkk.): tingkat 0–5 menurut persentil orang dewasa terampil. Chollet: kecerdasan = efisiensi memperoleh keterampilan. Hendrycks dkk. (Okt 2025): menyamai "orang dewasa berpendidikan baik", skor GPT-4 27% dan GPT-5 57%. ✅ (definisi OpenAI sendiri 🟡 satu sumber)
2. **Skor "AGI Score" Hendrycks dkk. menunjukkan AI itu "bergerigi" (jagged):** kuat di pengetahuan, hampir nol di memori jangka panjang (belajar terus-menerus). Mereka sendiri menulis skor 100% "tidak mungkin dalam setahun ke depan". ✅
3. **Sejarahnya penuh "sebentar lagi" yang meleset.** Dartmouth 1955 menduga tiap aspek belajar bisa disimulasikan mesin ✅; Turing 1950 menduga ±50 tahun ✅; Simon (1965 atau 1960, sumber berbeda) "20 tahun" 🟡; Minsky di Life 1970 "3 sampai 8 tahun" 🟡 (Minsky kemudian disebut membantah kutipan itu: "made up", 🟡). Istilah "artificial general intelligence" tercatat pertama oleh Mark Gubrud (makalah 1997) 🟡.
4. **Ujian ARC (Chollet) adalah visual terbaik "mudah buat manusia, sulit buat AI":** ARC-AGI-2 (2025) semua tugasnya dipecahkan ≥2 manusia dalam ≤2 percobaan (🟡 satu sumber); ARC-AGI-3 (24 Mar 2026) dipecahkan 100% oleh manusia, AI terdepan <1% (per Maret 2026). ✅
5. **Otak: ±86 miliar neuron, ±20 watt.** Pusat data AI besar: jutaan watt (Britannica). Anak 16 bulan ±15 juta kata vs GPT-3 500 miliar kata. ✅/🟡
6. **Empat jalur menuju AGI semua nyata, tidak ada yang terbukti cukup:** skala (hukum Kaplan 2020/Chinchilla 2022), penalaran (o1 12 Sep 2024; o3-preview 75–87% ARC-AGI-1 Des 2024), agen (METR: panjang tugas 50% berhasil menggandakan ±7 bulan), world model/robotika (Genie 3 5 Agu 2025; AMI Labs LeCun; Gemini Robotics 1.5). ✅/🟡

---

## Pondasi 5W+1H

- **Apa:** AGI = AI umum setara manusia; dibedakan dari AI sempit dan superintelligence; definisinya sendiri masih diperdebatkan. Rujuk Rincian A–D.
- **Siapa:** OpenAI, Google DeepMind (Morris, Legg dkk.), Chollet/ARC Prize, Hendrycks dkk. (33 penulis), Turing, McCarthy-Minsky-Rochester-Shannon, Simon, Gubrud, Legg & Goertzel, LeCun, METR, FRI.
- **Kapan:** Turing 1950; proposal Dartmouth 31 Agu 1955 (proyek musim panas 1956); Simon 1965/1960; Life 20 Nov 1970; Gubrud 1997; Chollet Nov 2019; Levels of AGI 4 Nov 2023; Hendrycks 21 Okt 2025; ARC-AGI-3 24 Mar 2026.
- **Di mana:** global (AS, Inggris, Kanada, Prancis); Dartmouth College, Hanover, New Hampshire.
- **Kenapa:** belum ada ukuran bersama; LLM kuat di tugas tertentu tapi lemah di belajar terus-menerus, penalaran baru, dunia fisik; janji historis terus meleset.
- **Bagaimana:** LLM belajar memprediksi kata di data raksasa (🧠, bagian Wawasan); kemampuan naik lewat skala, penalaran saat inferensi, agen, world model. Rujuk Rincian C–E.

---

## Rincian

### A. Definisi resmi (dan kenapa tidak sepakat)

- 🟡 **OpenAI Charter mendefinisikan AGI sebagai sistem yang mengungguli manusia pada sebagian besar pekerjaan bernilai ekonomi, dan mengakui jadwalnya tak pasti** (OpenAI Charter, halaman resmi; tanggal terbit tidak tercantum di halaman, tertulis "past two years" yang berarti revisi 2020-an) · https://openai.com/charter/. ⚠️ Belum terverifikasi: hanya 1 sumber (halaman perusahaan tentang definisinya sendiri; primer untuk definisi itu, tetapi tanpa tanggal).
  > "highly autonomous systems that outperform humans at most economically valuable work" — OpenAI · https://openai.com/charter/
  > "The timeline to AGI remains uncertain" — OpenAI · https://openai.com/charter/
- ✅ **Google DeepMind "Levels of AGI" (Morris, Sohl-Dickstein, Fiedel, Warkentin, Dafoe, Faust, Farabet, Legg; arXiv 2311.02462, diajukan 4 Nov 2023, v5 untuk ICML 2024): kerangka dua sumbu, kedalaman (performa) dan keluasan (generalitas), lima tingkat berdasarkan persentil orang dewasa terampil** · https://arxiv.org/abs/2311.02462 · https://arxiv.org/pdf/2311.02462
  > "providing a common language to compare models, assess risks, and measure progress along the path to AGI" — arXiv (abstrak) · https://arxiv.org/abs/2311.02462
  > "at least 90th percentile of skilled adults" — arXiv PDF (Level 3: Expert) · https://arxiv.org/pdf/2311.02462
  > "at least 99th percentile of skilled adults" — arXiv PDF (Level 4) · https://arxiv.org/pdf/2311.02462
  > "a Competent AGI must have performance at least at the 50th percentile for skilled adult humans on most cognitive tasks" — arXiv PDF · https://arxiv.org/pdf/2311.02462
  > "We updated the nomenclature of Level 4 to be" — arXiv (catatan versi 5: "Exceptional", sebelumnya "Virtuoso") · https://arxiv.org/abs/2311.02462
  Catatan: Tingkat: 1 Emerging, 2 Competent (≥50 persentil), 3 Expert (≥90), 4 Exceptional/Virtuoso (≥99), 5 Superhuman; diterapkan ke AI sempit maupun umum (mis. DALL-E 2 dinilai AI sempit tingkat 3). Sumbu otonomi terpisah.
  > "which we estimate as a Level 3 Narrow AI" — arXiv PDF (contoh DALL-E 2) · https://arxiv.org/pdf/2311.02462
- ✅ **Chollet (arXiv 1911.01547, 5 Nov 2019): kecerdasan = efisiensi memperoleh keterampilan; hanya mengukur keterampilan di satu tugas tidak mengukur kecerdasan karena data/pengetahuan awal tak terbatas bisa "membeli" keterampilan. ARC dibuat untuk mengukurnya.** · https://arxiv.org/abs/1911.01547
  > "describing intelligence as skill-acquisition efficiency" — arXiv · https://arxiv.org/abs/1911.01547
  > "unlimited priors or unlimited training data allow experimenters to "buy" arbitrary levels of skills for a system" — arXiv · https://arxiv.org/abs/1911.01547
  > "A typical human can solve most of the ARC evaluation set without any previous training." — arXiv PDF · https://arxiv.org/pdf/1911.01547
- 🟡 **ARC Prize meringkas definisi Chollet untuk awam: "AGI is a system that can match the learning efficiency of humans."** (ARC Prize, halaman "What is ARC-AGI?", tanpa tanggal) · https://arcprize.org/arc-agi. ⚠️ Belum terverifikasi: hanya 1 sumber untuk kalimat ringkasan ini (definisi Chollet aslinya ✅ di atas).
  > "AGI is a system that can match the learning efficiency of humans." — ARC Prize · https://arcprize.org/arc-agi
- ✅ **"A Definition of AGI" (Hendrycks dkk., 33 penulis, arXiv 2510.18212, 21 Okt 2025, v3 3 Des 2025): AGI = menyamai keluasan dan kemahiran kognitif orang dewasa berpendidikan baik; 10 domain kognitif dari teori Cattell-Horn-Carroll; skor GPT-4 (2023) 27%, GPT-5 (2025) 57%; kekurangan terbesar di memori jangka panjang.** Pracetak, belum tentu ditelaah sejawat. · https://arxiv.org/abs/2510.18212 · https://arxiv.org/pdf/2510.18212
  > "defining AGI as matching the cognitive versatility and proficiency of a well-educated adult" — arXiv · https://arxiv.org/abs/2510.18212
  > "The resulting AGI scores (e.g., GPT-4 at 27%, GPT-5 at 57%) concretely quantify both rapid progress and the substantial gap remaining before AGI." — arXiv · https://arxiv.org/abs/2510.18212
  > "current AI systems have critical deficits in foundational cognitive machinery, particularly long-term memory storage." — arXiv · https://arxiv.org/abs/2510.18212
  > "Long-Term Memory Storage (MS): The capability to continually learn new information" — arXiv PDF · https://arxiv.org/pdf/2510.18212
  > "Our AGI definition is about human-level AI, not economically-valuable AI" — arXiv PDF · https://arxiv.org/pdf/2510.18212
  > "OpenAI and Microsoft have reportedly considered AGI to be an AI that can generate $100 billion in" — arXiv PDF (contoh definisi lain yang dikutip) · https://arxiv.org/pdf/2510.18212
- ✅ **Definisi sendiri belum sepakat:** Hendrycks dkk. membuka dengan "kurangnya definisi konkret"; Melanie Mitchell (Science, 21 Mar 2024) menulis bahwa makna AGI "hotly debated"; dua definisi di atas (ekonomi vs kognitif) sengaja dibedakan oleh Hendrycks dkk. · https://arxiv.org/abs/2510.18212 · https://comdig.cssociety.org/2024/04/06/debates-on-the-nature-of-artificial-general-intelligence/ (kutipan abstrak Science; teks Science diblokir Cloudflare)
  > "The lack of a concrete definition for Artificial General Intelligence (AGI) obscures the gap between today's specialized AI and human-level cognition." — arXiv · https://arxiv.org/abs/2510.18212
  > "What AGI means, or whether it means anything coherent at all, is hotly debated in the AI community." — Mitchell, Science (via Complexity Digest, 6 Apr 2024) · https://comdig.cssociety.org/2024/04/06/debates-on-the-nature-of-artificial-general-intelligence/
- 🟡 **ANI/AGI/ASI:** Levels of AGI memetakan "ASI" ke Level 5 umum (superhuman) dan AI sempit ke "Narrow AI" per tingkat; istilah ANI/ASI populer bukan istilah baku di makalah. Teks "Level 5: Superhuman" ada di PDF; pemetaan "ASI" dibaca dari potongan kalimat (tanda kutip melengkung tidak dikutip). · https://arxiv.org/pdf/2311.02462. ⚠️ Belum terverifikasi: hanya 1 sumber.
  > "Level 5: Superhuman" — arXiv PDF · https://arxiv.org/pdf/2311.02462

### B. Sejarah "sebentar lagi"

- ✅ **Turing 1950 ("Computing Machinery and Intelligence", Mind 49): mengganti "Can machines think?" dengan "imitation game"; memperkirakan sekitar 50 tahun lagi komputer akan membuat penanya rata-rata tak lebih dari 70% benar setelah 5 menit.** PDF salinan UMBC (tanggal metadata 2003; makalah terbit 1950). · https://courses.cs.umbc.edu/471/papers/turing.pdf
  > "I propose to consider the question, "Can machines think?"" — Turing (1950) · https://courses.cs.umbc.edu/471/papers/turing.pdf
  > "in about fifty years' time it will be possible, to programme computers" — Turing (1950) · https://courses.cs.umbc.edu/471/papers/turing.pdf
  > "more than 70 per cent chance of making the right identification after five minutes of" — Turing (1950) · https://courses.cs.umbc.edu/471/papers/turing.pdf
- ✅ **Proposal Dartmouth (McCarthy, Minsky, Rochester, Shannon), tertanggal 31 Agustus 1955, untuk "studi 2 bulan, 10 orang" musim panas 1956 di Dartmouth College, Hanover; dasar dugaan: tiap aspek belajar/kecerdasan bisa dijelaskan cukup presisi untuk disimulasikan mesin.** PDF situs McCarthy (Stanford). · http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf
  > "August 31, 1955" — PDF Dartmouth · http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf
  > "every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it" — McCarthy dkk. (1955) · http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf
  > "machine behave in ways that would be called intelligent if a human were so behaving" — McCarthy dkk. (1955) · http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf
- 🟡 **Kutipan Minsky di majalah Life, 20 November 1970, artikel Brad Darrach tentang robot Shakey ("Meet Shaky/Shakey, the first electronic person"): Minsky "dengan keyakinan tenang" memperkirakan mesin berkecerdasan umum rata-rata manusia dalam 3–8 tahun.** Scan PDF di gwern.net (tanggal metadata 20 Nov 1970; salinan, bukan situs Life). Kata Darrach sendiri, kolega lain menilai jadwal Minsky "wishful". Kutipan sama dimuat banyak media, tetapi halaman perangkum Univ. Michigan (Kuipers) tidak bisa dibuka ulang. · https://gwern.net/doc/reinforcement-learning/robot/1970-darrach.pdf. ⚠️ Belum terverifikasi: hanya 1 sumber yang bisa dibuka ulang.
  > "three to eight years we will have a machine with the general intelligence of an average human being." — Darrach, Life (1970) · https://gwern.net/doc/reinforcement-learning/robot/1970-darrach.pdf
- 🟡 **Bantahan Minsky dan prediksi Simon:** Open Philanthropy/Coefficient Giving (1 Mei 2016) melaporkan bahwa dalam wawancara di Stork (1997), Minsky mengatakan kutipan Darrach itu "dibuat-buat" ("made up") dan bahwa sikapnya saat itu adalah ucapan McCarthy "from four to four hundred years". Simon: situs yang sama mengutip prediksi "20 tahun" dan menulisnya sebagai 1960, sedangkan sebagian besar sumber lain (termasuk perangkum Kuipers, UMich, yang tidak bisa dibuka ulang) menulis 1965 (buku *The Shape of Automation for Men and Management*). Hanya satu sumber untuk bantahan Minsky dan kutipan Simon (perantara, bukan sumber aslinya). · https://coefficientgiving.org/research/what-should-we-learn-from-past-ai-forecasts/
  > "In an interview published as chapter 2 of Stork (1997), Minsky said Darrach" — Coefficient Giving · https://coefficientgiving.org/research/what-should-we-learn-from-past-ai-forecasts/
  > "an intelligent system in from four to four hundred years." — Coefficient Giving (mengutip Minsky/McCarthy) · https://coefficientgiving.org/research/what-should-we-learn-from-past-ai-forecasts/
  > "machines will be capable, within twenty years, of doing any work that a man can do." — Coefficient Giving (menulis 1960) · https://coefficientgiving.org/research/what-should-we-learn-from-past-ai-forecasts/
- 🟡 **AI winter:** dua "musim dingin" besar sekitar 1974–1980 dan 1987–2000; laporan Lighthill (1973) dan pemotongan dana DARPA (Mansfield Amendment 1969). Sumber Wikipedia (kelas C), satu sumber. · https://en.wikipedia.org/wiki/AI_winter
  > "There were two major "winters", which lasted approximately from 1974–1980 and 1987–2000" — Wikipedia · https://en.wikipedia.org/wiki/AI_winter
  > "By 1974, funding for AI projects was hard to find." — Wikipedia · https://en.wikipedia.org/wiki/AI_winter
- 🟡 **Asal istilah "artificial general intelligence": Mark Gubrud, makalah 1997 "Nanotechnology and International Security" (Foresight Conference) memakai frasa "advanced artificial general intelligence"; menurut WIRED (Steven Levy, 31 Okt 2025, dibaca penuh saat riset tetapi kini tertutup paywall) Shane Legg kemudian mengusulkan nama "AGI" kepada Ben Goertzel untuk buku mereka.** Bagian Gubrud terverifikasi dari makalah aslinya; bagian Legg/Goertzel hanya dari WIRED (kutipan tidak bisa diverifikasi ulang). · https://legacy.foresight.org/Conferences/MNT05/Papers/Gubrud/index.html · https://www.wired.com/story/the-man-who-invented-agi/. ⚠️ Belum terverifikasi: bagian Legg/Goertzel dan tahun email-nya hanya 1 sumber yang tidak bisa dibuka ulang.
  > "By advanced artificial general intelligence, I mean AI systems that rival or surpass the human brain in complexity and speed" — Gubrud (1997), makalah asli · https://legacy.foresight.org/Conferences/MNT05/Papers/Gubrud/index.html
  Catatan: tahun persis email Legg-Goertzel (±2002) belum terbaca di teks hasil baca → "belum terverifikasi"; WIRED menulis bahwa Gubrud hadir di konferensi AGI kedua 2006.

### C. Kenapa AI sekarang belum dianggap setara manusia

- ✅ **Transformer (Vaswani dkk., arXiv 12 Jun 2017): arsitektur yang hanya memakai mekanisme perhatian (attention), tanpa recurrence/konvolusi; dasar LLM modern.** · https://arxiv.org/abs/1706.03762
  > "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely." — arXiv · https://arxiv.org/abs/1706.03762
- ✅ **GPT-3 (arXiv 28 Mei 2020): 175 miliar parameter, tanpa fine-tuning; makalahnya sendiri mencatat manusia bisa belajar tugas baru dari beberapa contoh saja, hal yang masih sulit bagi sistem.** · https://arxiv.org/abs/2005.14165
  > "we train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model" — arXiv · https://arxiv.org/abs/2005.14165
  > "humans can generally perform a new language task from only a few examples or from simple instructions" — arXiv · https://arxiv.org/abs/2005.14165
- ✅ **Tidak belajar terus-menerus setelah dilatih:** Hendrycks dkk. menilai memori jangka panjang (kemampuan "continually learn new information") sebagai hambatan terbesar, skor mendekati 0% pada GPT-4 maupun GPT-5; ARC-AGI-3 menyebut menguji kemampuan "learn continuously". · https://arxiv.org/pdf/2510.18212 · https://arcprize.org/arc-agi/3
  > "Both GPT-4 and GPT-5 lack appreciable long-term memory storage" — arXiv PDF · https://arxiv.org/pdf/2510.18212
  > "Long-term memory storage is perhaps the most significant bottleneck, scoring near 0% for current models." — arXiv PDF · https://arxiv.org/pdf/2510.18212
  > "build adaptable world models, and learn continuously" — ARC Prize · https://arcprize.org/arc-agi/3
- ✅ **Halusinasi: Kalai dkk. (arXiv 4 Sep 2025; hanya arXiv dibaca): model menebak saat ragu karena cara pelatihan dan penilaian memberi ganjaran pada tebakan, bukan pada mengaku tak tahu.** Pracetak. · https://arxiv.org/abs/2509.04664
  > "language models are optimized to be good test-takers, and guessing when uncertain improves test performance." — arXiv · https://arxiv.org/abs/2509.04664
- 🟡 **Paradoks Moravec (1988):** mudah membuat komputer bernalar seperti orang dewasa di tes/dam, sulit memberinya keterampilan persepsi dan gerak anak setahun. Rangkuman di Wikipedia (kelas C) dari buku *Mind Children* (halaman buku belum dibaca langsung). · https://en.wikipedia.org/wiki/Moravec%27s_paradox. ⚠️ Belum terverifikasi: hanya 1 sumber (Wikipedia), buku Moravec belum dibaca.
  > "it is comparatively easy to make computers exhibit adult level performance on intelligence tests or playing checkers, and difficult or impossible to give them the skills of a one-year-old when it comes to perception and mobility" — Wikipedia (mengutip Moravec 1988) · https://en.wikipedia.org/wiki/Moravec%27s_paradox
  > "Abstract thought, though, is a new trick, perhaps less than 100 thousand years old." — Wikipedia (mengutip Moravec) · https://en.wikipedia.org/wiki/Moravec%27s_paradox
- ✅ **Efisiensi data: anak vs model.** Frank (Trends in Cognitive Sciences, Nov 2023): LLM menerima 4–5 orde besar lebih banyak data bahasa dari anak; Frank (Stanford Engineering, 9 Feb 2024): GPT-3 500 miliar kata vs anak 16 bulan ±15 juta kata; Sutskever (25 Nov 2025): manusia 15 tahun "a tiny fraction of the pre-training data". (Dipakai ulang dari bank fakta 15 Nov 2026.) · https://pubmed.ncbi.nlm.nih.gov/37659919/ · https://engineering.stanford.edu/news/future-language-learning · https://www.dwarkesh.com/p/ilya-sutskever-2
  > "they receive around four or five orders of magnitude more language data than human children" — PubMed (Trends in Cognitive Sciences) · https://pubmed.ncbi.nlm.nih.gov/37659919/
  > "was exposed to 500 billion words. And you're 16-month-old, that's probably heard 15 million words." — Stanford Engineering (Michael Frank) · https://engineering.stanford.edu/news/future-language-learning
  > "Somehow a human being, after even 15 years with a tiny fraction of the pre-training data, they know much less." — Dwarkesh Podcast (Sutskever) · https://www.dwarkesh.com/p/ilya-sutskever-2
  Catatan: angka lisan, perkiraan; "kata" bukan "token"; 500 miliar ÷ 15 juta ≈ 33.000x (hitungan sendiri 🧠, konsisten dengan 4–5 orde).
- ✅ **Otak: ±86 miliar neuron.** Azevedo dkk. (J. Comparative Neurology, 2009; abstrak Europe PMC) dan UCL (16 Sep 2026) serta Britannica. 100 miliar adalah angka kutipan lama yang ternyata belum pernah dihitung (kata abstraknya). · https://europepmc.org/article/MED/19226510 · https://www.ucl.ac.uk/news/2026/sep/analysis-your-brain-runs-20-watts-could-brain-inspired-computing-do-same
  > "the adult male human brain contains on average 86.1 +/- 8.1 billion NeuN-positive cells ("neurons")" — Azevedo dkk. (2009) · https://europepmc.org/article/MED/19226510
  > "The human brain holds roughly 86 billion neurons" — UCL News · https://www.ucl.ac.uk/news/2026/sep/analysis-your-brain-runs-20-watts-could-brain-inspired-computing-do-same
- ✅ **Otak ±20 watt, setara bohlam; sistem AI besar bisa butuh pusat data berdaya jutaan watt.** UCL (16 Sep 2026) dan Britannica (tanggal: halaman terbaca 17 Jun 2026; cuplikan Google menulis 22 Okt 2026, lihat Konflik data). · https://www.ucl.ac.uk/news/2026/sep/analysis-your-brain-runs-20-watts-could-brain-inspired-computing-do-same · https://www.britannica.com/science/The-Human-Brain-Runs-on-Less-Power-than-a-Light-Bulb
  > "all on about 20 watts of power" — UCL News · https://www.ucl.ac.uk/news/2026/sep/analysis-your-brain-runs-20-watts-could-brain-inspired-computing-do-same
  > "the brain performs all of these tasks while consuming only about 20 watts of power" — Britannica · https://www.britannica.com/science/The-Human-Brain-Runs-on-Less-Power-than-a-Light-Bulb
  > "can require vast computing infrastructure and energy" — UCL News · https://www.ucl.ac.uk/news/2026/sep/analysis-your-brain-runs-20-watts-could-brain-inspired-computing-do-same
  > "Large artificial intelligence (AI) systems may rely on data centers consuming millions of watts of electricity." — Britannica · https://www.britannica.com/science/The-Human-Brain-Runs-on-Less-Power-than-a-Light-Bulb
- 🟡 **Sinapsis "triliunan":** Britannica menyebut jaringan dengan "trillions of interconnections known as synapses"; satu sumber, tanpa angka pasti. (Jangan menyebut angka sinapsis spesifik di video.) · https://www.britannica.com/science/The-Human-Brain-Runs-on-Less-Power-than-a-Light-Bulb
  > "trillions of interconnections known as synapses" — Britannica · https://www.britannica.com/science/The-Human-Brain-Runs-on-Less-Power-than-a-Light-Bulb

### D. Jalur yang diadu ilmuwan

- ✅ **Skala (scaling laws).** Kaplan dkk. (arXiv 23 Jan 2020): loss turun mengikuti hukum pangkat terhadap ukuran model, data, dan komputasi. Hoffmann dkk./Chinchilla (arXiv 29 Mar 2022): ukuran model dan jumlah token harus dinaikkan seimbang; model 70B dengan 4x data mengalahkan model 280B. Penantangnya: ARC Prize menulis skala saja tidak cukup untuk ARC-AGI-2. · https://arxiv.org/abs/2001.08361 · https://arxiv.org/abs/2203.15556 · https://arcprize.org/arc-agi/2
  > "The loss scales as a power-law with model size, dataset size, and the amount of compute used for training" — Kaplan dkk. · https://arxiv.org/abs/2001.08361
  > "for every doubling of model size the number of training tokens should also be doubled" — Hoffmann dkk. (Chinchilla) · https://arxiv.org/abs/2203.15556
  > "Log-linear scaling is insufficient to beat ARC-AGI-2." — ARC Prize · https://arcprize.org/arc-agi/2
- ✅ **Model penalaran.** OpenAI o1 (12 Sep 2024; halaman versi Indonesia): AIME 2024 GPT-4o hanya 12%, o1 74% (satu contoh), 93% (pemeringkatan ulang 1000 contoh). ARC Prize: o3-preview (Des 2024) 75% (komputasi rendah) dan 87% (tinggi) di ARC-AGI-1 setelah AI tak menembusnya sejak 2019 hingga akhir 2024. · https://openai.com/id-ID/index/learning-to-reason-with-llms/ · https://arcprize.org/arc-agi/1/
  > "o1 memperoleh rata-rata 74% (11,1/15) dengan satu contoh per soal" — OpenAI (id-ID) · https://openai.com/id-ID/index/learning-to-reason-with-llms/
  > "o3-preview at low compute scored 75% on ARC-AGI-1 and reached 87% accuracy with higher compute." — ARC Prize · https://arcprize.org/arc-agi/1/
  > "From its introduction in 2019 until late 2024, ARC-AGI remained unsolved by AI systems" — ARC Prize · https://arcprize.org/arc-agi/1/
  Catatan: klaim lab/penyelenggara tentang produk/ujiannya sendiri; kedua sumber menyebut o1/o3 sebagai awal paradigma penalaran (satu sama lain terpisah).
- 🟡 **Agen.** METR (19 Mar 2025): panjang tugas (diukur lama kerja profesional manusia) yang bisa diselesaikan agen dengan keberhasilan 50% menggandakan ±7 bulan dalam 6 tahun terakhir; model terbaik kala itu hanya andal pada tugas "beberapa menit". METR sendiri menandai angka statis mencerminkan data saat terbit (pembaruan TH1.1 ada). Satu sumber (METR; makalah arXiv belum dibaca). · https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
  > "doubling approximately every 7 months for the last 6 years" — METR · https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- ✅ **World model.** LeCun meninggalkan Meta (The Decoder, 20 Nov 2025) untuk AMI Labs; TechCrunch (24 Jan 2026): AMI = "Advanced Machine Intelligence", membangun world model; misi: "real intelligence does not start in language". DeepMind Genie 3 (5 Agu 2025): dunia interaktif real-time 24 fps, 720p, konsisten beberapa menit (satu sumber, DeepMind). · https://the-decoder.com/yann-lecun-leaves-meta-to-launch-new-ai-startup/ · https://techcrunch.com/2026/01/23/whos-behind-ami-labs-yann-lecuns-world-model-startup/ · https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/
  > "systems that understand the physical world, use persistent memory, can reason, and plan complex actions" — The Decoder (mengutip LeCun) · https://the-decoder.com/yann-lecun-leaves-meta-to-launch-new-ai-startup/
  > "has drawn intense attention since the AI scientist left Meta to found it" — TechCrunch · https://techcrunch.com/2026/01/23/whos-behind-ami-labs-yann-lecuns-world-model-startup/
  > "real intelligence does not start in language. It starts in the world." — AMI Labs (dikutip TechCrunch) · https://techcrunch.com/2026/01/23/whos-behind-ami-labs-yann-lecuns-world-model-startup/
  > "you can navigate in real time at 24 frames per second, retaining consistency for a few minutes at a resolution of 720p" — Google DeepMind · https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/
  Catatan: Decoder menyebut LeCun menyebut jalur LLM Meta "a dead end" (pendapat). Angka pendanaan AMI ($1,03 miliar) hanya dari cuplikan WebSearch, belum dibaca di sumber → belum terverifikasi (bagian B yang memegang industri).
- 🟡 **Robotika/embodied.** DeepMind Gemini Robotics 1.5 (25 Sep 2025): robot "berpikir sebelum bertindak" (VLA) bersama model penalaran ER 1.5; satu sumber (DeepMind). · https://deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/
  > "This model thinks before taking action and shows its process" — Google DeepMind · https://deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/

### E. Analogi dan uji yang mudah divisualkan

- ✅ **ARC-AGI-1: 800 tugas teka-teki grid; tiap tugas hanya ±3 pasang contoh masukan-keluaran; "mudah bagi manusia, sulit bagi AI".** Halaman memuat gambar tugas #3aa6fb7a. Makalah Chollet juga menyebut manusia umumnya bisa menyelesaikan sebagian besar ARC tanpa pelatihan. · https://arcprize.org/arc-agi/1/ · https://arxiv.org/pdf/1911.01547
  > "These tasks, easy for humans but challenging for AI, typically provide only a small number of example input-output pairs (usually around three)." — ARC Prize · https://arcprize.org/arc-agi/1/
- 🟡 **ARC-AGI-2: 100% tugas dipecahkan ≥2 manusia dari 400+ peserta publik (San Diego, awal 2025) dalam ≤2 percobaan.** · https://arcprize.org/arc-agi/2. ⚠️ Belum terverifikasi: hanya 1 sumber (ARC Prize, klaim atas ujiannya sendiri).
  > "100% of tasks have been solved by at least 2 humans (many by more) in under 2 attempts." — ARC Prize · https://arcprize.org/arc-agi/2
- ✅ **ARC-AGI-3 (arXiv 24 Mar 2026, rev. 17 Apr 2026): lingkungan interaktif tanpa instruksi; manusia 100%, AI terdepan <1% per Maret 2026.** Arxiv + halaman ARC Prize. · https://arxiv.org/abs/2603.24621 · https://arcprize.org/arc-agi/3
  > "Our testing shows humans can solve 100% of the environments, in contrast to frontier AI systems which, as of March 2026, score below 1%." — arXiv · https://arxiv.org/abs/2603.24621
  > "As long as there is a gap between AI and human learning, we do not have AGI." — ARC Prize · https://arcprize.org/arc-agi/3
- 🟡 **Tes kopi (Wozniak):** robot masuk rumah asing dan membuat kopi. Versi ketat menurut FRI (20 Apr 2026): tiga lingkungan tak terstruktur; Wozniak 2007: "we will never see a robot that makes a cup of coffee, never."; median pakar memperkirakan lulus 2034, superforecaster 2032, publik 2039. Satu sumber (FRI, laporan LEAP); rumusan "average American home" asli Wozniak belum dibaca di sumber pertama. · https://forecastingresearch.substack.com/p/when-will-robots-pass-the-coffee
  > "requires a robot to make a cup of coffee in three different unstructured, unfamiliar environments of equivalent complexity to an ordinary home" — Forecasting Research Institute · https://forecastingresearch.substack.com/p/when-will-robots-pass-the-coffee
  > "we will never see a robot that makes a cup of coffee, never." — Wozniak 2007 (dikutip FRI) · https://forecastingresearch.substack.com/p/when-will-robots-pass-the-coffee
  > "The median expert forecasts that an autonomous robot will first successfully complete the Coffee Test in 2034" — Forecasting Research Institute · https://forecastingresearch.substack.com/p/when-will-robots-pass-the-coffee

### Konflik data

- **Simon "20 tahun":** Coefficient Giving menulis 1960; sebagian besar sumber lain (hasil pencarian Google, Kuipers/UMich yang tidak bisa dibuka ulang) 1965 (*The Shape of Automation for Men and Management*). Aman di narasi: "tahun 1960-an".
- **Minsky:** artikel Life 1970 memuat kutipan itu (scan dibaca); Coefficient Giving melaporkan Minsky kemudian menyebutnya "made up" dan bahwa Darrach sendiri mencatat kolega lain menilai jadwalnya terlalu optimis. Aman di narasi: "dikutip di Life 1970", bukan "Minsky berjanji".
- **Tanggal Britannica:** alat membaca "2026-06-17"; cuplikan Google menulis "22 Okt 2026". Tidak memengaruhi isi (20 W tetap sama di UCL).
- **ARC-AGI-3 launch:** arXiv 24 Mar 2026; satu artikel DataCamp menulis 25 Mar (tidak dipakai). Pakai 24 Mar.
- **Tanggal Azevedo:** Europe PMC 1 Apr 2009; PubMed mencatat 10 Apr 2009. Cukup "2009".
- **Skor GPT-5 57%:** nilai dari makalah Hendrycks (pracetak, estimasi penulis, dengan baterai tes mereka); pihak lain bisa menilai berbeda. Penulis makalah sendiri menyebut skor tunggal "could be misleading".

---

## Wawasan tambahan 🧠 (pengetahuan model)

- 🧠 **Cara kerja LLM untuk awam:** model dilatih menebak potongan kata (token) berikutnya dari miliaran kalimat; dari tebakan raksasa itu muncul kemampuan merangkum, menulis kode, dst. Setelah dilatih, "otaknya" dibekukan; yang terasa seperti ingatan di percakapan hanyalah catatan di jendela konteks. (Sumber untuk "memori jangka panjang ~0%" di Rincian C.)
- 🧠 **Analogi:** LLM = mahasiswa yang membaca perpustakaan sedunia lalu dibekukan sebelum ujian; manusia = magang yang belajar setiap hari. Skor AGI yang "bergerigi" = nilai rapor 100 di IPA dan 0 di kemampuan mengingat pelajaran kemarin.
- 🧠 **ANI/AGI/ASI:** ANI = bisa satu hal (kamera pintar, catur, AlphaFold); AGI = bisa banyak hal seperti manusia; ASI = jauh di atas manusia di hampir semua hal. Ketiga istilah populer, bukan standar ilmiah (lihat definisi A yang berbeda-beda).
- 🧠 **Paradoks Moravec dalam kehidupan:** catur dan soal olimpiade dimenangkan komputer, tapi melipat cucian, menuang teh, atau naik tangga rumah orang masih sulit bagi robot; evolusi sudah "melatih" tubuh kita ratusan juta tahun, bernalar abstrak baru "trik baru" (sesuai ucapan Moravec di Rincian C).
- 🧠 **Analogi hemat energi:** otak = bohlam kecil; satu pusat data AI besar = pembangkit listrik kecil. (Angka pembanding persis hanya yang dikutip Britannica; jangan menambah angka lain tanpa riset.)
- 🧠 **Struktur narasi yang cocok:** hook = "Tes kopi" atau "Anak umur 16 bulan vs GPT-3"; Bab 1 definisi yang tak sepakat; Bab 2 sejarah janji "tiga sampai delapan tahun"; Bab 3 kenapa AI sekarang belum (belajar terus, halusinasi, data, energi); Bab 4 empat jalur; Puncak = ARC-AGI-3 (manusia 100%, AI <1%); penutup ke video B/C.

---

## Koreksi terhadap Ringkasan AI Google

| Klaim Ringkasan Google | Hasil cek |
|---|---|
| Proposal Dartmouth bertanggal 31 Agustus 1955, meminta dana $13.500 Rockefeller | Tanggal 31 Agustus 1955 dan kalimat konjektur ✅ (PDF). Angka $13.500 tidak ditemukan di potongan PDF yang dibaca → belum terverifikasi, tidak dipakai. |
| Minsky di Life 20 Nov 1970: "In from three to eight years... read Shakespeare, grease a car..." | Sesuai scan Life (🟡 satu sumber yang bisa dibuka ulang); Google tidak menyebut bantahan Minsky belakangan (🟡, Coefficient Giving). |
| Azevedo 2009: 86,1 miliar neuron, 84,6 miliar non-neuron | ✅ sesuai abstrak (Europe PMC). Detail serebelum 69,03 miliar/korteks 16,34 miliar tidak diverifikasi (tidak dipakai). |
| Otak ±20 watt, ±2% berat tapi ±20% energi | 20 W ✅ (UCL, Britannica). "20% energi" tidak diverifikasi, tidak dipakai. |

---

## Belum terjawab

- Tahun persis Legg-Goertzel menciptakan nama "AGI" (±2002 di memori model, tidak ada di teks yang terbaca) dan kutipan WIRED-nya (tertutup paywall saat verifikasi ulang).
- Teks asli buku Moravec *Mind Children* dan buku Simon 1965 (hanya kutipan sekunder).
- Jumlah sinapsis dengan sumber primer (hanya "triliunan" dari Britannica).
- Angka pendanaan AMI Labs ($1,03 miliar, Mar 2026) dari sumber yang dibaca langsung (hanya cuplikan pencarian) → ranah bagian B.
- Hasil terbaru model terdepan di ARC-AGI-2/3 (leaderboard tidak menampilkan angka di teks hasil baca; ARC-AGI-3 hanya angka Mar 2026).
- Jawaban Hendrycks per-domain GPT-5 (tabel angka tidak terambil dari PDF; hanya total 27%/57%).
- Bukti visual `tangkap` tertunda (browser utama sedang diserahkan ke Ikhsan oleh peneliti paralel selama sesi ini; lihat Kandidat bukti visual).

---

## Kandidat bukti visual

**Sudah ditangkap (app supermotion, slug `agi-setara-manusia`):** belum ada (alat `tangkap` menolak berulang kali: "Browser utama sedang diserahkan ke Ikhsan (Captcha Google)"). Daftar siap tangkap (URL + yang ditangkap), urut prioritas:
1. https://arxiv.org/abs/2510.18212 — judul + abstrak "A Definition of AGI", baris "GPT-4 at 27%, GPT-5 at 57%".
2. https://openai.com/charter/ — paragraf misi dengan definisi AGI.
3. https://arxiv.org/abs/2311.02462 — judul + abstrak Levels of AGI (DeepMind); tabel tingkatan ada di https://arxiv.org/pdf/2311.02462 (halaman 4; screenshot halaman PDF).
4. https://arcprize.org/arc-agi/1/ — contoh tugas ARC (#3aa6fb7a) + "easy for humans".
5. http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf — halaman 1 proposal Dartmouth ("August 31, 1955", kalimat konjektur).
6. https://gwern.net/doc/reinforcement-learning/robot/1970-darrach.pdf — halaman artikel Life 1970 dengan kutipan Minsky.
7. https://www.wired.com/story/the-man-who-invented-agi/ — judul "The Man Who Invented AGI" (Gubrud); hanya judul/paragraf awal terbuka (paywall).
8. https://arxiv.org/abs/2603.24621 — abstrak ARC-AGI-3 ("humans 100%, AI below 1%").
9. https://forecastingresearch.substack.com/p/when-will-robots-pass-the-coffee — judul + grafik median prediksi Coffee Test.
10. https://courses.cs.umbc.edu/471/papers/turing.pdf — halaman 1 makalah Turing 1950.
11. https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ — video/gambar Genie 3 (lisensi/embedding perlu dicek, 🟠).
12. https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ — grafik doubling 7 bulan.

**Angka yang cocok dijadikan `grafik` (semua ✅ kecuali yang ditandai):**
- AGI Score GPT-4 27% vs GPT-5 57% vs 100% (Hendrycks dkk., Okt 2025; estimasi penulis).
- Anak 16 bulan ±15 juta kata vs GPT-3 500 miliar kata (skala log; 4–5 orde besar).
- Otak 20 W vs pusat data jutaan W (🟡 angka jutaan watt dari Britannica) dan 86 miliar neuron.
- Garis waktu "sebentar lagi": 1950 (Turing +50 th), 1965 (Simon +20, 🟡), 1970 (Minsky +3–8, 🟡), 2034 (median pakar Coffee Test, 🟡).
- AIME 2024: GPT-4o 12% vs o1 74%/93% (OpenAI, Sep 2024).
- ARC-AGI-1: o3-preview 75% (rendah) dan 87% (tinggi), Des 2024.
- ARC-AGI-3: manusia 100% vs AI terdepan <1% (Mar 2026).
- Persentil Levels of AGI: 50/90/99 untuk Competent/Expert/Exceptional.

---

## Sumber yang dibaca penuh

1. https://openai.com/charter/ (kelas C primer-produsen, tanpa tanggal, WebSearch+Google)
2. https://arxiv.org/abs/2311.02462 dan PDF (A, 4 Nov 2023, keduanya)
3. https://arxiv.org/abs/2510.18212 dan PDF (A, 21 Okt 2025, keduanya)
4. https://arxiv.org/abs/1911.01547 dan PDF (A, 5 Nov 2019, keduanya)
5. https://arcprize.org/arc-agi, /arc-agi/1/, /arc-agi/2, /arc-agi/3 (C, tanpa tanggal, Google)
6. https://arxiv.org/abs/2603.24621 (A, 24 Mar 2026, WebSearch)
7. https://courses.cs.umbc.edu/471/papers/turing.pdf (A, 1950, Google)
8. http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf (A, 1955, keduanya)
9. https://gwern.net/doc/reinforcement-learning/robot/1970-darrach.pdf (C, 20 Nov 1970, WebSearch)
10. https://coefficientgiving.org/research/what-should-we-learn-from-past-ai-forecasts/ (C, 1 Mei 2016, Google)
11. https://www.wired.com/story/the-man-who-invented-agi/ (B, 31 Okt 2025, Google; dibaca penuh saat riset, kini paywall)
12. https://legacy.foresight.org/Conferences/MNT05/Papers/Gubrud/index.html (C, tanpa tanggal, dari tautan WIRED)
13. https://comdig.cssociety.org/2024/04/06/debates-on-the-nature-of-artificial-general-intelligence/ (C, 6 Apr 2024, WebSearch)
14. https://en.wikipedia.org/wiki/Moravec%27s_paradox dan /AI_winter (C, Google)
15. https://arxiv.org/abs/1706.03762, 2001.08361, 2203.15556, 2509.04664, 2005.14165 (A, Google akademik)
16. https://europepmc.org/article/MED/19226510 (C, 2009, Google+WebSearch)
17. https://www.ucl.ac.uk/news/2026/sep/analysis-your-brain-runs-20-watts-could-brain-inspired-computing-do-same (A, 16 Sep 2026, keduanya)
18. https://www.britannica.com/science/The-Human-Brain-Runs-on-Less-Power-than-a-Light-Bulb (C, 2026, Google)
19. https://openai.com/id-ID/index/learning-to-reason-with-llms/ (C, 12 Sep 2024, Google)
20. https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ (C, 19 Mar 2025, WebSearch)
21. https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/ dan /gemini-robotics-15-brings-ai-agents-into-the-physical-world/ (C, 5 Agu 2025 dan 25 Sep 2025, keduanya)
22. https://techcrunch.com/2026/01/23/whos-behind-ami-labs-yann-lecuns-world-model-startup/ (B, 24 Jan 2026, WebSearch) dan https://the-decoder.com/yann-lecun-leaves-meta-to-launch-new-ai-startup/ (C, 20 Nov 2025)
23. https://forecastingresearch.substack.com/p/when-will-robots-pass-the-coffee (C, 20 Apr 2026, WebSearch)
24. Bank fakta: https://pubmed.ncbi.nlm.nih.gov/37659919/, https://engineering.stanford.edu/news/future-language-learning, https://www.dwarkesh.com/p/ilya-sutskever-2

Sumber yang dibuang: halaman Instagram/Facebook/Medium/Substack blog pribadi (spam/sekunder, tidak relevan); cavac.at (teks berantakan); Science.org dan Wiley (Cloudflare, tidak ditembus); web.eecs.umich.edu/~kuipers (dialihkan saat verifikasi, kutipan dicabut).

<!-- Bagian "## Verifikasi otomatis" ditambahkan oleh verifikasi_laporan. Jangan ditulis manual. -->

---

## Verifikasi otomatis

Dicek 2026-11-16 02:56 dengan `verifikasi_laporan` (sumber dibuka ulang di Brave agent): 72 kutipan: 71 persis, 0 mirip, **0 tidak ditemukan**, 1 sumbernya tak terbaca · 18 klaim ✅: 18 lolos aturan sumber, **0 hanya 1 sumber tercantum** · 1 sumber gagal dibuka.

| Baris | Temuan | Detail |
|---|---|---|
| - | ⚠️ sumber gagal dibuka ulang | https://pubmed.ncbi.nlm.nih.gov/37659919/ (teks terlalu pendek/paywall) |
