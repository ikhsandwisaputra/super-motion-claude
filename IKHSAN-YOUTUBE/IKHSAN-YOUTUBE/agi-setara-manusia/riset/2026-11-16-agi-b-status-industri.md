# AGI bagian B: status terkini, perlombaan industri, perdebatan, risiko (per 16 November 2026)

Riset · 16 November 2026 · Brave agent + WebSearch · diminta: "riset untuk full video YouTube 'Apa itu AI AGI? Membuat AI setara seperti manusia?' bagian B: status terkini (Nov 2026), perlombaan industri, perdebatan, risiko" (bagian A konsep/sejarah dan C jangkar Indonesia dikerjakan peneliti lain)

**Cara kerja:** Google tab berita (1 kueri berhasil; `cari_banyak` Google timeout dua kali, 1 batch berhasil) + ±25 kueri WebSearch (benchmark, tokoh, regulasi, kabar terbaru). Semua kutipan dari `baca` di browser: ±45 halaman dibaca (halaman resmi ARC Prize, METR, TIME, Anthropic, Google, Microsoft, Gedung Putih, Komisi Eropa, CAIS, FLI, blog Altman/Amodei dibaca langsung). Sumber pertama yang ditelusuri: leaderboard dan blog ARC Prize, halaman METR, blog Microsoft, teks perintah eksekutif Gedung Putih, teks pernyataan CAIS dan FLI. Fourweekmba (Cloudflare) dan jair.org tidak terbuka. Browser utama dipegang sesi riset lain (serah-terima captcha) sepanjang sesi ini, jadi `tangkap` ditolak berulang (lihat bagian bukti visual). **Pernah dibahas:** `ingat` hanya mencatat permintaan tugas ini sendiri; bank fakta AI bubble 14 Nov 2026 dipakai ulang untuk capex dan Huang (`/home/ikhsands/Proyek/asisten-agi-claude/laporan/2026-11-14-ai-bubble-a-apa-dan-status.md`).

Label: ✅ terverifikasi: 2 sumber independen, atau 1 sumber primer kelas A, dengan kutipan persis · 🟡 sebagian: 1 sumber saja / hanya cuplikan / via media (termasuk halaman resmi pihak itu sendiri yang tidak berpasangan sumber kedua) · ❌ tidak ditemukan sumbernya. Klaim tokoh ditulis "menurut X", bukan fakta.

---

## Kesimpulan

1. **Skor benchmark ARC-AGI-3 di leaderboard resmi sudah nyaris penuh, tapi angkanya bergantung "harness" (perangkat lunak pembungkus model).** Per 10 Nov 2026 Gemini 4 Carbon tercatat 99,09% dan Claude Fable 5.2 97,72% (9 Nov); namun di harness standar ARC Prize yang netral, Gemini 4 Carbon 65,1% dan Fable 5.2 81,2%. ARC Prize sendiri menyatakan tidak mengklaim itu AGI.
2. **Klaim "AGI sudah tiba" ada, tapi bukan dari lembaga yang bisa memverifikasi.** Jensen Huang menulis "AGI has arrived" (6-7 Sep 2026), Greg Brockman bilang "I do think we're there"; Altman (TIME, 26 Agu 2026) bilang "not quite yet" tapi akhir tahun akan ada sistem internal yang ia sebut AGI. Tidak ada definisi tunggal dan tidak ada penguji independen resmi. Huang mundur dari Nvidia 12 Nov 2026 (bukan soal teknologi).
3. **Peta tokoh: optimis dekat vs skeptis jalur LLM.** Dari "bisa secepat 2026" (Amodei, 2024) sampai "50% dalam dekade ini, bukan lewat model seperti sekarang" (Hassabis, Jan 2026). LeCun bertaruh melawan LLM lewat AMI Labs (US$1,03 miliar, Mar 2026).
4. **Prediksi kolektif: Metaculus kini median 1 Jun 2030** (rentang 5 Feb 2028 sampai Mar 2036; diakses 16 Nov 2026); survei 2.778 peneliti (fall 2023): 50% mesin mengungguli manusia di semua tugas pada 2047.
5. **Uang besar karena klausul AGI.** Kesepakatan Microsoft-OpenAI 28 Okt 2025: deklarasi AGI oleh OpenAI harus diverifikasi panel pakar independen. Capex hyperscaler 2026 sekitar US$170-205 miliar per perusahaan, total diperkirakan lebih dari US$1 triliun tahun depan; pasar sedang goyah (bank fakta 14 Nov).
6. **Risiko dan aturan:** pernyataan CAIS (kepunahan), Statement on Superintelligence FLI (78.759 tanda tangan, 16 Nov 2026), esai Amodei "We Must Pace the Frontier" (12 Sep 2026) yang disetujui Altman, EU AI Act (kewajiban GPAI sejak 2 Agu 2025). **Kabar "Trump ganti istilah AI" benar tapi sempit:** Perintah Eksekutif 29 Sep 2026 mengganti "Artificial Intelligence" jadi "Super Intelligence" di dokumen non-statuta lembaga eksekutif, bukan soal AGI dan bukan mengubah hukum.

---

## Pondasi 5W+1H

- **Apa:** perlombaan membuat AI setara/melampaui manusia (AGI). Benchmark terbaru nyaris tuntas di harness vendor tapi tidak di harness netral; ada klaim "sudah AGI" yang dibantah penyelenggara benchmark (Rincian 1, 2).
- **Siapa:** OpenAI (Altman, Brockman), Google DeepMind (Hassabis), Anthropic (Amodei), Meta (Zuckerberg, LeCun yang keluar), xAI (Musk), Nvidia (Huang), Microsoft (Nadella), ARC Prize (Chollet, Knoop), METR, Gedung Putih, Komisi Eropa, FLI, CAIS.
- **Kapan:** ARC-AGI-3 mendekati saturasi Sep-Nov 2026; klaim Huang 6-7 Sep 2026; janji Altman 26 Agu 2026; esai Amodei 12 Sep 2026; EO 29 Sep 2026; Gemini 4 Carbon 10 Nov 2026; Fable 5.2 9 Nov 2026.
- **Di mana:** terutama AS (lab dan pemerintah), Eropa (AI Act, AMI Labs di Paris), global (International AI Safety Report).
- **Kenapa:** AGI = target misi OpenAI dan pemicu klausul kontrak Microsoft-OpenAI; belanja ratusan miliar dolar dipertaruhkan pada janji ini (Rincian 4).
- **Bagaimana:** kemajuan lewat model penalaran + agen jangka panjang; tiap pihak mendefinisikan AGI sendiri, penguji netral (ARC Prize, METR) menahan klaim (Rincian 1, 2).

---

## Rincian

### 1. Seberapa dekat: benchmark terbaru

- 🟡 **ARC-AGI-3 mengukur efisiensi belajar agen di game baru; 100% berarti sama efisien dengan manusia. Semua lingkungannya bisa diselesaikan manusia.** (ARC Prize, halaman ARC-AGI-3, tanpa tanggal; dibaca 16 Nov 2026; 1 sumber, penerbit benchmark sendiri) · https://arcprize.org/arc-agi/3
  > "A 100% score means AI agents can beat every game as efficiently as humans." — ARC Prize · https://arcprize.org/arc-agi/3
  > "As long as there is a gap between AI and human learning, we do not have AGI." — ARC Prize · https://arcprize.org/arc-agi/3
- 🟡 **Skor "manusia" di ARC-AGI-3: lingkungan 100% bisa diselesaikan manusia, tetapi rata-rata penguji manusia menurut estimasi OpenAI hanya 48% pada metrik efisiensi (RHAE).** Jangan disajikan "manusia 100% vs AI x%" tanpa penjelasan. (OpenAI, 6 Nov 2026; terjemahan Indonesia, estimasi OpenAI bukan angka ARC Prize) · https://openai.com/id-ID/index/how-two-settings-tripled-our-arc-agi-3-scores/
  > "kami memperkirakan skor rata-rata penguji manusia adalah 48%" — OpenAI · https://openai.com/id-ID/index/how-two-settings-tripled-our-arc-agi-3-scores/
- ✅ **GPT-6 Astra (OpenAI, rilis 3 Sep 2026): 62,7% di harness Standard ARC Prize vs 99,9% di harness Provider Adapter.** Sama modelnya, beda pembungkus. ARC Prize: Astra memakai lebih sedikit aksi daripada median manusia penguji pada 96% level. (ARC Prize blog; TNW, 6 Sep 2026) · https://arcprize.org/blog/astra · https://thenextweb.com/news/openai-astra-arc-agi-3-harness-62-7-vs-99-9-benchmark-revisions
  > "GPT-6 Astra scores 62.7% for $26K on ARC-AGI-3 Semi-Private with our Standard harness, and 99.9% for $19K with a Provider Adapter harness." — ARC Prize · https://arcprize.org/blog/astra
  > "It used fewer actions than the median tested human on 96% of levels." — ARC Prize · https://arcprize.org/blog/astra
  > "Same weights, different scaffolding, different score." — TNW · https://thenextweb.com/news/openai-astra-arc-agi-3-harness-62-7-vs-99-9-benchmark-revisions
- ✅ **ARC Prize tidak mengklaim itu AGI; Chollet: bukan bukti AGI, tapi lebih cepat dari perkiraannya.** (TNW, 7 Sep 2026; The Decoder, 4 Sep 2026) · https://thenextweb.com/news/jensen-huang-agi-has-arrived-gpt-6-astra · https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/
  > "ARC Prize said it was not claiming AGI, and co-founder Mike Knoop wrote that the evidence was not there yet." — TNW · https://thenextweb.com/news/jensen-huang-agi-has-arrived-gpt-6-astra
  > "Solving it is not proof of AGI. It is not intended as a finish line." — Chollet (via The Decoder) · https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/
  > "Sooner, because progress is happening faster than I expected." — Chollet (via The Decoder) · https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/
- 🟡 **ARC-AGI-4 sedang disiapkan, dijadwalkan kuartal pertama 2027** (The Decoder, 4 Sep 2026; 1 sumber) · https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/
  > "ARC-AGI-4 has been in development since the release of ARC-AGI-3 and is scheduled for release in the first quarter of 2027." — The Decoder · https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/
- ✅ **Gemini 4 Carbon (Google, 10 Nov 2026): ARC-AGI-3 99,1% di Provider Adapter, 65,1% di Standard.** (ARC Prize, 10 Nov 2026; Google, 10 Nov 2026 untuk rilis modelnya) · https://arcprize.org/results/google-gemini-4-carbon · https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
  > "On v3, it reaches 65.1% with the Standard harness at low reasoning and 99.1% with the Provider Adapter harness at medium reasoning." — ARC Prize · https://arcprize.org/results/google-gemini-4-carbon
  > "Carbon is our strongest model with frontier performance in cybersecurity capabilities and long-horizon agentic workflows" — Google · https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
- ✅ **Claude Fable 5.2 (Anthropic, 9 Nov 2026): ARC-AGI-3 81,2% Standard, 97,7% Provider Adapter.** Anthropic merilis Fable 5.2 dan Mythos 5.2; evaluator eksternal termasuk UK AI Security Institute dan METR. (ARC Prize; Anthropic, 9 Nov 2026) · https://arcprize.org/results/anthropic-claude-fable-5-2 · https://www.anthropic.com/claude-fable-and-mythos-5-2
  > "On v3, it reaches 81.2% with the Standard harness at xhigh reasoning and 97.7% with the Provider Adapter harness at high reasoning." — ARC Prize · https://arcprize.org/results/anthropic-claude-fable-5-2
  > "The model was also tested before release by external evaluators, including the UK AI Security Institute, Frontier Design, and METR." — Anthropic · https://www.anthropic.com/claude-fable-and-mythos-5-2
- 🟡 **Tabel ringkas leaderboard ARC Prize (10 Nov 2026): Gemini 4 Carbon 98,5% / 94,2% / 99,09% (ARC-AGI-1/2/3); Fable 5.2 98,5% / 93,8% / 97,72%; GPT-6 (2 Sep) 98,5% / 95,0% / 99,95%; Opus 5 (24 Jul) hanya 30,16% di ARC-AGI-3.** Tabel ini tidak memberi label harness per baris; angka ARC-AGI-3 di tabel = skor tertinggi (harness vendor). (ARC Prize, dibaca 16 Nov 2026) · https://arcprize.org/results
  > "Claude Opus 5 sets a new high score on ARC-AGI-3. As of July 24, 2026, Claude Opus 5 (High) is the highest-performing model on ARC-AGI-3, scoring 30.2%." — ARC Prize · https://arcprize.org/results/anthropic-claude-opus-5
- 🟡 **NVIDIA melaporkan arsitektur AVO mencapai 100% di set publik ARC-AGI-3 (Agu 2026) memakai Claude Opus 5 yang baseline-nya sekitar 30%.** (VentureBeat, 3 Sep 2026; klaim NVIDIA, 1 sumber) · https://venturebeat.com/technology/welcome-to-the-agi-era-openai-launches-gpt-6-astra
  > "AVO used Claude Opus 5, and NVIDIA said the underlying model's baseline was roughly 30%." — VentureBeat · https://venturebeat.com/technology/welcome-to-the-agi-era-openai-launches-gpt-6-astra
- 🟡 **ARC-AGI-2: semua tugas sudah diselesaikan minimal 2 manusia dalam maksimal 2 percobaan (uji publik 400+ orang, San Diego).** Skor AI terbaik di leaderboard: 95,0% (GPT-6, 2 Sep 2026). (ARC Prize; 1 sumber) · https://arcprize.org/arc-agi/2
  > "100% of tasks have been solved by at least 2 humans (many by more) in under 2 attempts." — ARC Prize · https://arcprize.org/arc-agi/2
- 🟡 **Humanity's Last Exam (HLE): 2.500 soal akhir (hampir 1.000 kontributor pakar). Skor terbaik menurut agregator BenchLM (13 Nov 2026): Claude Fable 5.2 74,2%; angka papan resmi Scale tidak tampil di teks halaman.** Agregator, bukan angka resmi; pakai "menurut BenchLM". (BenchLM, 13 Nov 2026; Scale Labs) · https://benchlm.ai/benchmarks/hle · https://labs.scale.com/leaderboard/humanitys_last_exam
  > "According to BenchLM.ai, Claude Fable 5.2 leads the HLE benchmark with a score of 74.2%" — BenchLM · https://benchlm.ai/benchmarks/hle
  > "resulted in a finalized dataset of 2,500 questions" — Scale Labs · https://labs.scale.com/leaderboard/humanitys_last_exam
- ✅ **METR time horizon: frontier menggandakan panjang tugas kira-kira tiap 7 bulan sejak 2019, mungkin dipercepat 2024; GPT-5 (Agu 2025) sekitar 2 jam 17 menit; Claude Mythos Preview (versi awal, diuji Mar 2026) paling sedikit 16 jam, CI 95% 8,5 sampai 55 jam; METR: pengukuran di atas 16 jam tidak andal dan halamannya tidak diperbarui lagi (entri terakhir 8 Mei 2026).** Time horizon = tingkat kesulitan tugas (waktu manusia ahli), bukan lama AI bekerja otomatis. (METR paper arXiv, 18 Mar 2025; halaman METR; The Decoder, 10 Mei 2026) · https://arxiv.org/abs/2503.14499 · https://metr.org/time-horizons/ · https://the-decoder.com/metr-says-it-can-barely-measure-claude-mythos-palo-alto-networks-warns-of-autonomous-ai-attackers/
  > "frontier AI time horizon has been doubling approximately every seven months since 2019, though the trend may have accelerated in 2024." — METR (arXiv) · https://arxiv.org/abs/2503.14499
  > "Measurements above 16 hrs are unreliable with our current task suite" — METR · https://metr.org/time-horizons/
  > "estimates a 50 percent time horizon of at least 16 hours, with a 95 percent confidence interval of 8.5 to 55 hours." — The Decoder · https://the-decoder.com/metr-says-it-can-barely-measure-claude-mythos-palo-alto-networks-warns-of-autonomous-ai-attackers/
  > "No. The 50%-time horizon is the length of task in our suite (measured by how long it takes a human expert)" — METR · https://metr.org/time-horizons/
- ✅ **IMO 2025 (Jul 2025): Google DeepMind (Gemini Deep Think) 35 dari 42 poin = standar medali emas, dikonfirmasi koordinator IMO; OpenAI juga melaporkan level emas. International AI Safety Report 2026 menyebut keduanya.** Penilaian OpenAI dilaporkan swadaya (belum dibaca langsung). (Google DeepMind, 21 Jul 2025; International AI Safety Report, Feb 2026) · https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/ · https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026
  > "We can confirm that Google DeepMind has reached the much-desired milestone, earning 35 out of a possible 42 points — a gold medal score." — Google DeepMind (kutipan IMO) · https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/
  > "models from Google DeepMind and OpenAI reached gold medal-level scores at the International Mathematical Olympiad" — International AI Safety Report · https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026
- 🟡 **Kemampuan "bergerigi" (jagged): hebat di tugas terstandar, lemah di dunia nyata.** (International AI Safety Report, Feb 2026; 1 sumber) · https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026
  > "Yet the performance profile these systems display is also ‘jagged’: their capabilities vary widely among different tasks and contexts." — International AI Safety Report · https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026
- 🟡 **Kabar "bukti baru" yang belum cukup untuk hook:** klaim OpenAI soal masalah matematika Hadiah Milenium. The Conversation (via repost, 29 Okt 2026) menyebut bukti Navier-Stokes 8 Sep 2026 berasal dari model internal tak dirilis, belum diperiksa komunitas matematika; halaman OpenAI (6 Nov 2026) justru membahas persamaan Euler dengan jumlah agen dan jam berbeda. Jangan dipakai sebelum jelas. · https://newspaceeconomy.ca/2026/10/29/what-is-artificial-general-intelligence-and-is-it-already-here/?noamp=mobile · https://openai.com/id-ID/index/navier-stokes-solution/
  > "The proof has not yet been checked by the mathematical community." — The Conversation (repost) · https://newspaceeconomy.ca/2026/10/29/what-is-artificial-general-intelligence-and-is-it-already-here/?noamp=mobile

### 2. Klaim dan prediksi tokoh (menurut mereka, bukan fakta)

**Optimis / klaim dekat**
- ✅ **Menurut Sam Altman (OpenAI): awal Jan 2025 "we are now confident we know how to build AGI"; wawancara TIME 26 Agu 2026: belum AGI, tapi akhir tahun ada sistem internal yang ia sebut AGI.** Halaman blog Altman tidak mencantumkan tanggal (isinya merujuk ulang tahun kedua ChatGPT sebulan lalu). Definisi AGI OpenAI: "highly autonomous systems that outperform humans at most economically valuable work". (blog Altman; TIME, 26 Agu 2026; The Decoder, 26 Agu 2026; OpenAI Charter) · https://blog.samaltman.com/reflections · https://time.com/article/2026/08/26/openai-sam-altman-interview/ · https://the-decoder.com/sam-altman-says-openai-will-have-agi-by-the-end-of-2026-if-you-accept-his-definition/ · https://openai.com/charter/
  > "We are now confident we know how to build AGI as we have traditionally understood it." — Altman, blog "Reflections" · https://blog.samaltman.com/reflections
  > "by the end of the year the company would have an internal system he would call AGI" — TIME (Alex Heath) · https://time.com/article/2026/08/26/openai-sam-altman-interview/
  > "highly autonomous systems that outperform humans at most economically valuable work" — OpenAI Charter · https://openai.com/charter/
- ✅ **Menurut Mark Chen (OpenAI): OpenAI "80% of the way" ke AGI; menurut Greg Brockman (pengarahan pers GPT-6 Astra, Sep 2026): "For me personally, I do think we're there."** TNW mencatat akun resmi OpenAI tidak memakai istilah AGI di peluncuran, sedangkan VentureBeat menulis perusahaan "says likely marks the onset" (konflik data, lihat bawah). (TIME, 26 Agu 2026; The Conversation repost, 29 Okt 2026; VentureBeat, 3 Sep 2026) · https://time.com/article/2026/08/26/openai-sam-altman-interview/ · https://newspaceeconomy.ca/2026/10/29/what-is-artificial-general-intelligence-and-is-it-already-here/?noamp=mobile · https://venturebeat.com/technology/welcome-to-the-agi-era-openai-launches-gpt-6-astra
  > "estimated OpenAI is “80% of the way” to AGI." — TIME · https://time.com/article/2026/08/26/openai-sam-altman-interview/
  > "For me personally, I do think we’re there." — Brockman (via The Conversation repost) · https://newspaceeconomy.ca/2026/10/29/what-is-artificial-general-intelligence-and-is-it-already-here/?noamp=mobile
  > "Everyone has a different definition of AGI," — Brockman (via VentureBeat) · https://venturebeat.com/technology/welcome-to-the-agi-era-openai-launches-gpt-6-astra
- ✅ **Menurut Jensen Huang (Nvidia): di X, 6 Sep 2026 malam waktu AS, "AGI has arrived", memuji GPT-6 Astra dan menjanjikan 400.000 GPU lagi. Huang mundur sebagai CEO 12 Nov 2026 (CFO Colette Kress CEO sementara) menyusul pemberitaan skandal pribadi.** Ditulis netral: pengunduran diri tidak terkait klaim AGI. (TNW, 7 Sep 2026; AP, 12 Nov 2026) · https://thenextweb.com/news/jensen-huang-agi-has-arrived-gpt-6-astra · https://apnews.com/article/nvidia-megaspeed-china-singapore-huang-5403f152a601cf82ce939f1d24fffa0f
  > "Jensen Huang wrote on X on Sunday that AGI has arrived, crediting OpenAI's GPT-6 Astra and promising 400,000 more GPUs." — TNW · https://thenextweb.com/news/jensen-huang-agi-has-arrived-gpt-6-astra
  > "Nvidia CEO Jensen Huang resigned Thursday, capping a spectacular downfall for a poster boy of the artificial intelligence boom" — AP · https://apnews.com/article/nvidia-megaspeed-china-singapore-huang-5403f152a601cf82ce939f1d24fffa0f
- ✅ **Menurut Dario Amodei (Anthropic): "country of geniuses in a datacenter", powerful AI "could come as early as 2026" (esai Oktober 2024); ia tidak suka istilah AGI. Davos Jan 2026: model akan mencapai riset level Nobel dalam dua tahun.** Apakah prediksi 2026 "terbukti": belum terverifikasi; belum ada sumber netral yang menyatakan "country of geniuses" tercapai. (Machines of Loving Grace, 1 Okt 2024; Fortune, 23 Jan 2026) · https://darioamodei.com/essay/machines-of-loving-grace · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/
  > "I think it could come as early as 2026, though there are also ways it could take much longer." — Amodei · https://darioamodei.com/essay/machines-of-loving-grace
  > "We could summarize this as a “country of geniuses in a datacenter”." — Amodei · https://darioamodei.com/essay/machines-of-loving-grace
  > "would reach “Nobel-level” scientific research in multiple fields within two years" — Fortune (Davos) · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/
- 🟡 **Menurut Demis Hassabis (Google DeepMind), Davos Jan 2026: AI sekarang "nowhere near" setara manusia; peluang 50% AGI dalam dekade ini, bukan lewat model persis seperti sekarang; definisinya ketat ("all" kemampuan kognitif manusia).** Kabar WSJ 21 Okt 2026 "dua sampai tiga tahun" hanya terbaca lewat ringkasan WebSearch, belum bisa dibaca: belum terverifikasi. (Fortune, 23 Jan 2026; 1 sumber) · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/
  > "nowhere near” human-level artificial general intelligence, or AGI." — Fortune (Hassabis) · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/
  > "Hassabis said that there was a 50% chance AGI might be achieved within the decade" — Fortune · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/
- 🟡 **Menurut Mark Zuckerberg (Meta): Meta Superintelligence Labs merilis Muse Spark (8 Apr 2026), "on our way to personal superintelligence".** Tidak ada klaim tahun AGI dari Meta di sumber yang dibaca. (Meta Newsroom, 8 Apr 2026; 1 sumber primer) · https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/
  > "We are on our way to personal superintelligence: an assistant that can help anyone, anywhere with the things that matter most to them." — Meta · https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/
- 🟡 **Menurut Elon Musk (X, 17 Sep 2025): xAI "has a chance of reaching AGI with Grok 5".** Status Grok 5 per Nov 2026 belum terverifikasi (leaderboard ARC Prize hanya mencatat Grok 4.7, 21 Sep 2026). (TechRadar, 23 Sep 2025; 1 sumber) · https://www.techradar.com/ai-platforms-assistants/elon-musk-thinks-grok-5-might-actually-reach-agi-and-thats-something-we-should-all-be-worried-about
  > "I now think @xAI has a chance of reaching AGI with @Grok 5," — Musk (via TechRadar) · https://www.techradar.com/ai-platforms-assistants/elon-musk-thinks-grok-5-might-actually-reach-agi-and-thats-something-we-should-all-be-worried-about

**Skeptis / pembanding**
- ✅ **Menurut Yann LeCun: LLM bukan jalan ke kecerdasan level manusia; ia meninggalkan Meta (Nov 2025) dan mendirikan AMI Labs; Mar 2026 AMI mengumpulkan US$1,03 miliar, valuasi US$3,5 miliar, berencana menghindari pendekatan generatif seperti LLM.** (Fortune, 23 Jan 2026; SiliconANGLE, 10 Mar 2026) · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/ · https://siliconangle.com/2026/03/10/yann-lecuns-new-startup-ami-labs-raises-1-03b-train-world-models/
  > "The AI industry is completely LLM-pilled" — LeCun (via Fortune) · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/
  > "AMI Labs, a new startup co-founded by artificial intelligence pioneer Yann LeCun, today announced that it has raised $1.03 billion in funding." — SiliconANGLE · https://siliconangle.com/2026/03/10/yann-lecuns-new-startup-ami-labs-raises-1-03b-train-world-models/
- 🟡 **Menurut Gary Marcus (skeptis lama): LLM "hardly qualify" menurut kriteria AGI klasik (esai 18 Okt 2023).** Tanggapan Marcus soal Astra 2026 hanya terbaca lewat cuplikan WebSearch, belum terverifikasi. (Substack Marcus, 18 Okt 2023; 1 sumber, lama) · https://garymarcus.substack.com/p/reports-of-the-birth-of-agi-are-greatly
  > "by the classical criteria for AGI [Artificial General Intelligence], LLM’s hardly qualify" — Marcus · https://garymarcus.substack.com/p/reports-of-the-birth-of-agi-are-greatly
- 🟡 **Makalah Apple "The Illusion of Thinking": model penalaran mengalami "complete accuracy collapse" pada kompleksitas tinggi di teka-teki terkontrol.** Halaman tidak mencantumkan tanggal; liputan sekunder (belum dibaca) menyebut Juni 2025; kritik balasan ada. (Apple ML Research) · https://machinelearning.apple.com/research/illusion-of-thinking
  > "frontier LRMs face a complete accuracy collapse beyond certain complexities" — Apple ML Research · https://machinelearning.apple.com/research/illusion-of-thinking
- 🟡 **Menurut Satya Nadella (Microsoft), podcast Feb 2025: klaim milestone AGI oleh diri sendiri = "nonsensical benchmark hacking"; ukuran sebenarnya pertumbuhan ekonomi 5-10%.** Pernyataan 2025, belum ada pernyataan 2026 yang terbaca. (The Decoder, 21 Feb 2025; 1 sumber) · https://the-decoder.com/microsoft-ceo-satya-nadella-says-self-claiming-agi-is-nonsensical-benchmark-hacking/
  > "He dismissed self-proclaimed AGI milestones as "nonsensical benchmark hacking"" — The Decoder · https://the-decoder.com/microsoft-ceo-satya-nadella-says-self-claiming-agi-is-nonsensical-benchmark-hacking/
- ✅ **Beda definisi AGI inilah akar perdebatan:** definisi ekonomi OpenAI vs definisi Hassabis ("all" kemampuan kognitif manusia) vs LeCun yang ingin istilahnya diganti "human-level AI". (The Decoder, 26 Agu 2026; Fortune, 23 Jan 2026) · https://the-decoder.com/sam-altman-says-openai-will-have-agi-by-the-end-of-2026-if-you-accept-his-definition/ · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/
  > "The term itself has no precise definition, though, so it's partly a matter of interpretation." — The Decoder · https://the-decoder.com/sam-altman-says-openai-will-have-agi-by-the-end-of-2026-if-you-accept-his-definition/
  > "My definition of [AGI] is a system that can exhibit all the cognitive capabilities humans can" — Hassabis (via Fortune) · https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/

### 3. Prediksi kolektif

- 🟡 **Metaculus (pertanyaan "When will the first general AI system be devised, tested, and publicly announced?"): median komunitas 1 Jun 2030, rentang 5 Feb 2028 sampai Mar 2036 (diakses 16 Nov 2026).** Angka forecasting = sinyal, bukan fakta. Pergeseran: cuplikan WebSearch (belum dibaca) menunjukkan snapshot lama di 2032-2033, jadi arah bergeser lebih cepat; belum terverifikasi. · https://www.metaculus.com/questions/5121/
  > "01 Jun 2030: (05 Feb 2028 - Mar 2036)" — Metaculus · https://www.metaculus.com/questions/5121/
- 🟡 **Survei AI Impacts (fall 2023, 2.778 peneliti): peluang 50% mesin mengungguli manusia di semua tugas tanpa bantuan pada 2047 (10% pada 2027), maju 13 tahun dari survei 2022; 70% responden ingin riset mitigasi risiko diprioritaskan.** Definisi "semua tugas" sangat ketat, responden sangat beragam, tingkat respons rendah. (The Decoder, 5 Jan 2024; AI Impacts, 4 Jan 2024) · https://the-decoder.com/a-survey-of-2778-researchers-shows-how-fragmented-the-ai-science-community-is/ · https://blog.aiimpacts.org/p/2023-ai-survey-of-2778-six-things
  > "the probability that machines will outperform humans in all possible tasks without outside help is estimated at 10 percent by 2027 and 50 percent by 2047." — The Decoder · https://the-decoder.com/a-survey-of-2778-researchers-shows-how-fragmented-the-ai-science-community-is/
  > "Expected time to human-level performance dropped 1-5 decades since the 2022 survey." — AI Impacts (Katja Grace) · https://blog.aiimpacts.org/p/2023-ai-survey-of-2778-six-things

### 4. Kenapa diperebutkan dengan uang besar

- 🟡 **Klausul AGI Microsoft-OpenAI (28 Okt 2025): deklarasi AGI oleh OpenAI kini diverifikasi panel pakar independen; hak IP dan pembagian pendapatan Microsoft terkait titik itu; Microsoft memegang sekitar 27% OpenAI Group PBC (sekitar US$135 miliar), boleh mengejar AGI sendiri.** Susunan dan prosedur panel tidak diumumkan (cuplikan WebSearch, belum terverifikasi). (Microsoft Official Blog, 28 Okt 2025; 1 sumber primer) · https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/
  > "Once AGI is declared by OpenAI, that declaration will now be verified by an independent expert panel." — Microsoft · https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/
  > "Microsoft can now independently pursue AGI alone or in partnership with third parties." — Microsoft · https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/
  > "The revenue share agreement remains until the expert panel verifies AGI" — Microsoft · https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/
- 🟡 **Capex hyperscaler (CNBC, 29 Okt 2026): Microsoft turunkan target tahun ini ke US$170 miliar (dari 175), Alphabet US$195-205 miliar (arus kas bebas negatif lebih dari US$9 miliar), Meta US$135-145 miliar; total diperkirakan di atas US$1 triliun tahun depan.** Bank fakta 14 Nov 2026 (DW menambah estimasi Goldman); di laporan ini hanya CNBC yang dibaca ulang. Angka bisa berubah. · https://www.cnbc.com/2026/10/29/microsoft-google-ai-capex-estimates.html
  > "Microsoft reduced its capex forecast for the year to $170 billion from $175 billion, and Alphabet held its guidance at $195 billion to $205 billion." — CNBC · https://www.cnbc.com/2026/10/29/microsoft-google-ai-capex-estimates.html
  > "As a group, hyperscaler capex is expected to top $1 trillion next year and, according to some estimates, continue rising from there." — CNBC · https://www.cnbc.com/2026/10/29/microsoft-google-ai-capex-estimates.html
- 🟡 **Stargate (OpenAI/Oracle/SoftBank): kapasitas terencana hampir 7 GW dan investasi lebih dari US$400 miliar menuju komitmen US$500 miliar dan 10 GW.** Isi halaman ini berasal dari pengumuman Sep 2025 (menyebut "akhir 2025"); stempel tanggal halaman 12 Nov 2026 kemungkinan artefak, jadi bukan status terkini. Status 2026 belum terverifikasi. (OpenAI, id-ID) · https://openai.com/id-ID/index/five-new-stargate-sites/
  > "membawa Stargate ke kapasitas terencana hampir 7 gigawatt dan investasi lebih dari USD 400 miliar selama tiga tahun ke depan" — OpenAI · https://openai.com/id-ID/index/five-new-stargate-sites/
- 🟡 **Pasar sedang goyah (konteks gelembung):** 5 Nov 2026 Nasdaq turun 5,5% sehari dan Nvidia jatuh; detail lengkap dan sumbernya di laporan 14 Nov 2026 (`/home/ikhsands/Proyek/asisten-agi-claude/laporan/2026-11-14-ai-bubble-a-apa-dan-status.md`). Tidak diulang di sini.

### 5. Risiko dan aturan main

- 🟡 **Pernyataan CAIS (2023): risiko kepunahan akibat AI.** Halaman tidak mencantumkan tanggal. (CAIS; 1 sumber primer) · https://safe.ai/work/statement-on-ai-extinction-risk
  > "Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war." — CAIS · https://safe.ai/work/statement-on-ai-extinction-risk
- 🟡 **Statement on Superintelligence (FLI, dirilis Okt 2025): seruan larangan pengembangan superintelligence sampai ada konsensus ilmiah luas dan dukungan publik kuat; penanda tangan termasuk Geoffrey Hinton, Stuart Russell, Steve Wozniak, Richard Branson, Pangeran Harry dan Meghan; 78.759 tanda tangan per 16 Nov 2026 (termasuk 5.000 dari petisi Ekō).** (superintelligence-statement.org; FLI; keduanya milik penyusun pernyataan) · https://superintelligence-statement.org/ · https://futureoflife.org/press-release/prominent-scientists-faith-leaders-policymakers-and-artists-call-for-a-prohibition-on-superintelligence/
  > "78,759 signatures" — Statement on Superintelligence · https://superintelligence-statement.org/
  > "We call for a prohibition on the development of superintelligence, not lifted before there is" — Statement on Superintelligence · https://superintelligence-statement.org/
  > "AI pioneers Geoffrey Hinton and Stuart Russell" — FLI · https://futureoflife.org/press-release/prominent-scientists-faith-leaders-policymakers-and-artists-call-for-a-prohibition-on-superintelligence/
- 🟡 **Menurut Dario Amodei, esai "We Must Pace the Frontier" (12 Sep 2026): laju kemampuan AI harus diperlambat; rencana tiga langkah dimulai dari evaluator pihak ketiga yang tertanam (contoh: METR); Anthropic menjalankan langkah pertama sepihak. Altman setuju ("we will do the same"). Trump menepis kekhawatiran ("a lot of negative forces").** Ini kebalikan perlombaan: pelaku utamanya sendiri minta rem. (darioamodei.com; Newsweek, 12 Sep 2026) · https://darioamodei.com/post/we-must-pace-the-frontier · https://www.newsweek.com/anthropic-ceo-calls-for-ai-slowdown-warns-of-dangers-of-bot-swarms-12435379
  > "We must slow the pace at which we improve the capabilities of AI models." — Amodei · https://darioamodei.com/post/we-must-pace-the-frontier
  > "I agree with Dario that we need to pace the frontier," — Altman (via Newsweek) · https://www.newsweek.com/anthropic-ceo-calls-for-ai-slowdown-warns-of-dangers-of-bot-swarms-12435379
- 🟡 **International AI Safety Report 2026 (edisi kedua, Feb 2026): dipimpin Yoshua Bengio, 100+ pakar, didukung 30+ negara dan organisasi internasional.** (International AI Safety Report; 1 sumber primer) · https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026
  > "Led by Turing Award winner Yoshua Bengio and authored by over 100 AI experts" — International AI Safety Report · https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026
  > "backed by over 30 countries and international organisations" — International AI Safety Report · https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026
- 🟡 **EU AI Act, model AI serba guna (GPAI): kewajiban berlaku 2 Agu 2025 (dokumentasi teknis, kebijakan hak cipta, ringkasan data latih); model di atas 10^25 FLOP dianggap berisiko sistemik (penilaian risiko, pelaporan insiden, keamanan siber); ambang sedang ditinjau.** Kewenangan denda sejak 2 Agu 2026: cuplikan WebSearch saja, belum terverifikasi. (Komisi Eropa, laman diperbarui 1 Agu 2025; 1 sumber primer) · https://digital-strategy.ec.europa.eu/en/factpages/general-purpose-ai-obligations-under-ai-act
  > "These obligations enter into application on 2 August 2025." — Komisi Eropa · https://digital-strategy.ec.europa.eu/en/factpages/general-purpose-ai-obligations-under-ai-act
  > "GPAI models are presumed to pose systemic risk if they are trained with more than 10^25 FLOP" — Komisi Eropa · https://digital-strategy.ec.europa.eu/en/factpages/general-purpose-ai-obligations-under-ai-act
- 🟡 **Kabar "Trump ganti istilah Artificial Intelligence": benar, tapi sempit.** Perintah Eksekutif "Inaugurating The Era Of Super Intelligence" (29 Sep 2026): lembaga eksekutif memakai "Super Intelligence"/"SI" menggantikan "Artificial Intelligence"/"AI" di dokumen non-statuta, "to the maximum extent permitted by law"; definisinya merujuk definisi AI di hukum yang berlaku (15 U.S.C. 9401(3)), jadi tidak mengubah teknologinya dan tidak mengubah undang-undang; Gedung Putih diminta mengusulkan definisi baru. Bukan soal AGI. (Whitehouse.gov, 29 Sep 2026, teks resmi dibaca; cuplikan WebSearch: nomor EO 14434, Federal Register 2 Okt 2026, belum dibaca; liputan media sindikasi AP belum dibaca) · https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/
  > "shall use the terms “Super Intelligence” and “SI” in place of “Artificial Intelligence” and “AI”" — Gedung Putih · https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/
  > "the terms “Super Intelligence” and “SI” mean the technologies and systems encompassed by the term “artificial intelligence”" — Gedung Putih · https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/

### 6. Kabar AGI terbaru (Agu-Nov 2026): kandidat hook

1. **"AGI has arrived" dari CEO Nvidia (6-7 Sep), lalu ia mundur 12 Nov** (Rincian 2): cerita siapa boleh bilang AGI sudah ada, dan siapa yang untung (Nvidia menjual cip).
2. **Skor sama, model sama, 99,9% vs 62,7%** (Rincian 1): angka "AGI" ternyata soal pembungkus. Gemini 4 Carbon 10 Nov: 99,1% vs 65,1%.
3. **Altman: akhir 2026 ada sistem internal yang ia sebut AGI, tapi definisinya buatan sendiri** (Rincian 2): dua bulan lagi, siapa yang menilai?
4. **Pengembang minta rem sendiri** (Amodei 12 Sep, Altman setuju) bersamaan dengan lomba capex lebih dari US$1 triliun.
5. **Pemerintah AS mengganti kata "AI" jadi "Super Intelligence" lewat perintah eksekutif** (29 Sep): hook ringan tapi sempit, jangan dilebihkan.

### Konflik data

- **Skor ARC-AGI-3 satu model, dua angka:** Astra 99,9% (Provider Adapter) vs 62,7% (Standard) pada rilis yang sama; TNW juga mencatat angka awal draf pers 98,6% vs 99,99% di posting hidup, dan Chollet menyebut 66% vs 62,7% di tabel (blog ARC Prize = catatan primer). Selalu sebut harness. Angka di tabel ringkas leaderboard (99,09%, 97,72%, 99,95%) tidak berlabel harness.
- **Apakah OpenAI "mendeklarasikan AGI" saat peluncuran GPT-6 Astra?** VentureBeat: perusahaan "says likely marks the onset" AGI; TNW: akun resmi OpenAI tidak memakai istilah itu dan Brockman menyerahkan penilaian ke pembaca. Pakai kata "menyiratkan/mengisyaratkan" dan atribusi.
- **Skor manusia ARC-AGI-3:** "100% bisa diselesaikan manusia" (desain ARC Prize) vs rata-rata penguji 48% pada skor efisiensi (estimasi OpenAI). Dua hal berbeda.
- **Navier-Stokes vs Euler** (Rincian 1): klaim OpenAI dilaporkan berbeda antara The Conversation dan halaman OpenAI.

---

## Wawasan tambahan 🧠 (pengetahuan model)

- 🧠 Analogi harness: sama-sama atlet, tetapi yang satu lari dengan sepatu dan pelatih yang menyiapkan jalur, yang lain lari tanpa. Skornya berbeda walau kakinya sama. Untuk awam: "angka 99% itu nilai ujian dengan contekan yang sah di aturan satu pihak, tapi bukan di aturan penyelenggara".
- 🧠 Mengapa definisi AGI licin: "setara manusia" bisa berarti rata-rata manusia, ahli, atau gabungan semua ahli; bisa diukur lewat tes (ARC), pekerjaan ekonomi (definisi OpenAI), atau kemampuan penemuan baru (Hassabis).
- 🧠 Time horizon mirip "seberapa panjang tugas yang bisa dititipkan ke karyawan baru dan separuh waktu berhasil": naik terus, tapi tidak sama dengan "bisa bekerja sendiri berjam-jam".
- 🧠 Ada insentif: pernyataan "sudah AGI" memengaruhi harga saham, valuasi, dan klausul kontrak, sehingga pengamat netral lebih bisa dipercaya daripada penjual.

---

## Koreksi terhadap Ringkasan AI Google

Google tidak menampilkan Ringkasan AI untuk kueri tab berita yang berhasil dijalankan ("AGI news"; hasilnya didominasi saham perusahaan bernama "AGI Inc", bukan artificial general intelligence). Petunjuk dari WebSearch/agregator yang dikoreksi lewat baca langsung:

| Petunjuk (WebSearch/agregator) | Hasil cek |
|---|---|
| Claude Opus 5 memimpin ARC-AGI-3 di 30,2% (agregator) | Benar untuk 24 Jul 2026; sudah terlampaui: halaman resmi ARC Prize per 10 Nov mencatat Gemini 4 Carbon 99,09% dan Fable 5.2 97,72% (harness vendor) |
| ARC-AGI-3 "semua model di bawah 1%" (artikel peluncuran) | Usang; digantikan leaderboard di atas |
| "97,72% untuk Fable 5.2 tidak ada dasarnya" (satu hasil WebSearch) | Salah: angka itu ada di tabel resmi ARC Prize; di harness Standard 81,2% |
| Hassabis "2-3 tahun" (WSJ 21 Okt) | Tidak bisa dibuka; belum terverifikasi |
| Panel verifikasi AGI sudah dibentuk dan diumumkan | Belum terverifikasi; blog Microsoft hanya menyebut panel akan ada |

---

## Belum terjawab

- Prakiraan Hassabis terbaru (WSJ, 21 Okt 2026): paywall/tidak terbuka; hanya Fortune Jan 2026 yang terbaca.
- Tanggapan Gary Marcus dan pernyataan Satya Nadella tahun 2026 soal klaim AGI: belum ditemukan teks asli.
- Grok 5 dan status klaim Musk per Nov 2026; Zuckerberg tidak punya klaim tahun AGI di sumber yang dibaca.
- Tren Metaculus (arah pergeseran) dan skor HLE resmi Scale: hanya angka terkini/agregator.
- Susunan panel ahli verifikasi AGI Microsoft-OpenAI; status Stargate 2026; Fourweekmba tidak dapat dibuka (Cloudflare, tidak penting).
- Apple "Illusion of Thinking": tanggal terbit dari halaman resmi tidak tercantum.
- `tangkap` bukti visual: ditolak karena browser utama sedang diserahkan ke Ikhsan oleh sesi riset lain (captcha Google).

---

## Kandidat bukti visual

**Sudah ditangkap (`tangkap`, app supermotion, slug `agi-setara-manusia`, 🟠 kutipan):** belum ada. Setiap panggilan `tangkap` pada 16 Nov 2026 ditolak ("Browser utama sedang diserahkan ke Ikhsan (Captcha Google, riset suara komunitas AGI Indonesia)"). `serahkan {lanjut:true}` dicoba 2 kali, masih menunggu. Perlu diulang oleh orkestrator setelah serah-terima selesai (12 URL di bawah sudah dibaca dan siap ditangkap).

**Kandidat (URL + apa), urut prioritas:**
1. https://arcprize.org/results · tabel leaderboard (Gemini 4 Carbon 99,09%, Fable 5.2 97,72%, GPT-6 99,95%)
2. https://arcprize.org/blog/astra · "62.7% vs 99.9%" dua harness (judul + angka)
3. https://time.com/article/2026/08/26/openai-sam-altman-interview/ · "Inside OpenAI's Reboot" (TIME, 26 Agu 2026)
4. https://thenextweb.com/news/jensen-huang-agi-has-arrived-gpt-6-astra · "Jensen Huang says AGI has arrived" (TNW, 7 Sep 2026)
5. https://blog.samaltman.com/reflections · kalimat "confident we know how to build AGI"
6. https://darioamodei.com/post/we-must-pace-the-frontier · esai Amodei 12 Sep 2026
7. https://superintelligence-statement.org/ · hitung tanda tangan 78.759 + teks pernyataan
8. https://metr.org/time-horizons/ · grafik time horizon (halaman resmi, "no longer actively updated")
9. https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/ · judul perintah eksekutif
10. https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/ · klausul panel ahli AGI
11. https://safe.ai/work/statement-on-ai-extinction-risk · kalimat satu pernyataan CAIS
12. https://www.cnbc.com/2026/10/29/microsoft-google-ai-capex-estimates.html · "AI buildout hits snag" (capex)

**Angka terverifikasi yang cocok dibuat `grafik`:**
- ARC-AGI-3: GPT-6 Astra Standard 62,7% vs Provider Adapter 99,9% (✅); Gemini 4 Carbon 65,1% vs 99,1% (✅); Fable 5.2 81,2% vs 97,7% (✅). Batang berpasangan "pembungkus netral vs pembungkus vendor" (ARC Prize).
- ARC-AGI-3 Claude Opus 5 30,2% (24 Jul 2026) untuk garis waktu (ARC Prize, 🟡).
- METR time horizon 50% (✅): Claude 3.7 Sonnet sekitar 50 menit (Mar 2025, paper), GPT-5 sekitar 2 jam 17 menit (Agu 2025), Claude Mythos Preview paling sedikit 16 jam (diuji Mar 2026; CI 8,5-55 jam). Ganda tiap sekitar 7 bulan.
- Capex 2026 (🟡): Microsoft US$170 miliar, Alphabet US$195-205 miliar, Meta US$135-145 miliar (CNBC, 29 Okt 2026).
- Peta prediksi tahun (🟡): Metaculus 2030 (rentang 2028-2036), peneliti AI 2047 (survei 2023), Amodei "secepat 2026", Hassabis 50% dalam dekade ini.
- Tanda tangan Statement on Superintelligence: 78.759 (16 Nov 2026, 🟡).

---

## Sumber yang dibaca penuh

1. https://arcprize.org/results (C, tanpa tanggal, dibaca 16 Nov 2026, WebSearch)
2. https://arcprize.org/blog/astra (C, Sep 2026, WebSearch)
3. https://arcprize.org/arc-agi/3 (C, WebSearch)
4. https://arcprize.org/arc-agi/2 (C, WebSearch)
5. https://arcprize.org/results/google-gemini-4-carbon (C, 10 Nov 2026, WebSearch)
6. https://arcprize.org/results/anthropic-claude-fable-5-2 (C, 9 Nov 2026, WebSearch)
7. https://arcprize.org/results/anthropic-claude-opus-5 (C, 24 Jul 2026, WebSearch)
8. https://thenextweb.com/news/jensen-huang-agi-has-arrived-gpt-6-astra (C, 7 Sep 2026, WebSearch)
9. https://thenextweb.com/news/openai-astra-arc-agi-3-harness-62-7-vs-99-9-benchmark-revisions (C, 6 Sep 2026, WebSearch)
10. https://the-decoder.com/benchmarks-disagree-on-gpt-6-astra-but-its-human-beating-efficiency-on-arc-agi-3-pulls-chollets-agi-forecast-forward/ (C, 4 Sep 2026, WebSearch)
11. https://time.com/article/2026/08/26/openai-sam-altman-interview/ (B, 26 Agu 2026, WebSearch)
12. https://the-decoder.com/sam-altman-says-openai-will-have-agi-by-the-end-of-2026-if-you-accept-his-definition/ (C, 26 Agu 2026, WebSearch)
13. https://venturebeat.com/technology/welcome-to-the-agi-era-openai-launches-gpt-6-astra (C, 3 Sep 2026, WebSearch)
14. https://newspaceeconomy.ca/2026/10/29/what-is-artificial-general-intelligence-and-is-it-already-here/?noamp=mobile (C, 29 Okt 2026, repost The Conversation, keduanya)
15. https://openai.com/id-ID/index/how-two-settings-tripled-our-arc-agi-3-scores/ (C, 6 Nov 2026)
16. https://openai.com/id-ID/index/navier-stokes-solution/ (C, 6 Nov 2026)
17. https://openai.com/id-ID/index/five-new-stargate-sites/ (C, stempel 12 Nov 2026)
18. https://openai.com/charter/ (C, tanpa tanggal)
19. https://blog.samaltman.com/reflections (C, awal Jan 2025, tanpa tanggal di halaman)
20. https://darioamodei.com/essay/machines-of-loving-grace (C, 1 Okt 2024)
21. https://darioamodei.com/post/we-must-pace-the-frontier (C, 12 Sep 2026, WebSearch)
22. https://www.newsweek.com/anthropic-ceo-calls-for-ai-slowdown-warns-of-dangers-of-bot-swarms-12435379 (C, 12 Sep 2026, WebSearch)
23. https://fortune.com/2026/01/23/deepmind-demis-hassabis-anthropic-dario-amodei-yann-lecun-ai-davos/ (C, 23 Jan 2026, WebSearch)
24. https://siliconangle.com/2026/03/10/yann-lecuns-new-startup-ami-labs-raises-1-03b-train-world-models/ (C, 10 Mar 2026, WebSearch)
25. https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/ (C, 8 Apr 2026, WebSearch)
26. https://www.techradar.com/ai-platforms-assistants/elon-musk-thinks-grok-5-might-actually-reach-agi-and-thats-something-we-should-all-be-worried-about (C, 23 Sep 2025, WebSearch)
27. https://garymarcus.substack.com/p/reports-of-the-birth-of-agi-are-greatly (C, 18 Okt 2023, WebSearch)
28. https://the-decoder.com/microsoft-ceo-satya-nadella-says-self-claiming-agi-is-nonsensical-benchmark-hacking/ (C, 21 Feb 2025, WebSearch)
29. https://machinelearning.apple.com/research/illusion-of-thinking (C, tanpa tanggal, WebSearch)
30. https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/ (C, 10 Nov 2026, WebSearch)
31. https://www.anthropic.com/claude-fable-and-mythos-5-2 (C, 9 Nov 2026, WebSearch)
32. https://metr.org/time-horizons/ (C, halaman hidup; entri terakhir 8 Mei 2026, keduanya)
33. https://arxiv.org/abs/2503.14499 (A, 18 Mar 2025, WebSearch)
34. https://the-decoder.com/metr-says-it-can-barely-measure-claude-mythos-palo-alto-networks-warns-of-autonomous-ai-attackers/ (C, 10 Mei 2026, WebSearch)
35. https://benchlm.ai/benchmarks/hle (C, 13 Nov 2026, WebSearch)
36. https://labs.scale.com/leaderboard/humanitys_last_exam (C, diakses 16 Nov 2026, WebSearch)
37. https://www.metaculus.com/questions/5121/ (C, diakses 16 Nov 2026, WebSearch)
38. https://the-decoder.com/a-survey-of-2778-researchers-shows-how-fragmented-the-ai-science-community-is/ (C, 5 Jan 2024, WebSearch)
39. https://blog.aiimpacts.org/p/2023-ai-survey-of-2778-six-things (C, 4 Jan 2024, WebSearch)
40. https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/ (C, 28 Okt 2025, WebSearch)
41. https://www.cnbc.com/2026/10/29/microsoft-google-ai-capex-estimates.html (B, 29 Okt 2026, ingatan + WebSearch)
42. https://apnews.com/article/nvidia-megaspeed-china-singapore-huang-5403f152a601cf82ce939f1d24fffa0f (B, 12 Nov 2026, ingatan bank fakta)
43. https://superintelligence-statement.org/ (C, diakses 16 Nov 2026, WebSearch)
44. https://futureoflife.org/press-release/prominent-scientists-faith-leaders-policymakers-and-artists-call-for-a-prohibition-on-superintelligence/ (C, WebSearch)
45. https://safe.ai/work/statement-on-ai-extinction-risk (C, tanpa tanggal, WebSearch)
46. https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026 (C, Feb 2026, WebSearch)
47. https://digital-strategy.ec.europa.eu/en/factpages/general-purpose-ai-obligations-under-ai-act (A, 1 Agu 2025, WebSearch)
48. https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/ (A, 29 Sep 2026, WebSearch)

Sumber yang dibuang: halaman repost/blog kecil dan agregator tanpa teks asli sebagai kutipan (mis. pasqualepillitteri, aiweekly, lumichats, skynetcountdown); fourweekmba (Cloudflare); jair.org (tidak terbuka); halaman tentang saham "AGI Inc" (nama sama, tidak relevan); epoch.ai METR (hanya metodologi, tidak dikutip).

<!-- Bagian "## Verifikasi otomatis" ditambahkan oleh verifikasi_laporan. Jangan ditulis manual. -->

---

## Verifikasi otomatis

Dicek 2026-11-16 02:49 dengan `verifikasi_laporan` (sumber dibuka ulang di Brave agent): 70 kutipan: 57 persis, 0 mirip, **0 tidak ditemukan**, 13 sumbernya tak terbaca · 12 klaim ✅: 12 lolos aturan sumber, **0 hanya 1 sumber tercantum** · 0 sumber gagal dibuka.

Tidak ada temuan: semua kutipan ditemukan persis dan semua klaim ✅ punya 2 sumber independen atau sumber primer.
