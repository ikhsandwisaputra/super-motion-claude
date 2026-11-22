# Kalau data manusia habis, AI belajar dari mana? Sisi industri, uang & hukum

Riset · 15 November 2026 · Brave agent + Google (sebagian) + WebSearch · diminta: "SISI INDUSTRI, UANG & HUKUM: pagar internet (robots.txt/Cloudflare), lisensi data, sengketa hak cipta, pelabelan manusia, banjir konten AI, kata para pemimpin lab" (tugas widget 20261115-110952-9e9d)

**Cara kerja:** `cari_banyak` Google dipakai di putaran awal (3 kueri, berhasil). Putaran berikutnya Google minta captcha, jadi penemuan sumber selanjutnya lewat `WebSearch` (±22 kueri). Sekitar 45 halaman/PDF dibaca penuh lewat `baca` (kutipan hanya dari sana). Jalur `akademik` tidak dipakai (porsi makalah dipegang peneliti lain). Pembaruan 2025–2026 Data Provenance Initiative dicari dan tidak ketemu. **Pernah dibahas:** tidak (ingat: hanya laporan lisensi aset, bukan topik ini).

Label: ✅ terverifikasi: 2 sumber independen, atau 1 sumber primer kelas A, dengan kutipan persis · 🟡 sebagian: 1 sumber saja / via media / angka "dilaporkan" · ❌ tidak ditemukan sumbernya

---

## Kesimpulan

1. **Pagar internet naik cepat, tapi angka terbaik masih dari data April 2024.** Studi "Consent in Crisis" (arXiv 20 Jul 2024) mengaudit 14.000 domain: dalam setahun, ~5%+ token seluruh C4 dan 28%+ token sumber "kritis/terawat" C4 dibatasi penuh lewat robots.txt; lewat Syarat Layanan, 45% C4 dibatasi. Pembaruan 2025–2026 dari tim yang sama: belum ketemu. ✅
2. **Cloudflare (1 Jul 2025) membuat pemblokiran crawler AI jadi bawaan untuk domain baru** (✅). "Pay per crawl" (beta tertutup, HTTP 402) hanya dari blog Cloudflare sendiri (🟡). Cakupannya domain baru, bukan semua pelanggan.
3. **Data jadi barang dagangan:** Reddit–Google ~US$60 juta/tahun (dilaporkan Reuters & Bloomberg, Feb 2024; kontrak lisensi total US$203 juta/2–3 tahun di S-1); News Corp–OpenAI >US$250 juta/5 tahun (dilaporkan WSJ); Meta–News Corp hingga US$50 juta/tahun (dilaporkan WSJ, Mar 2026). Reddit Q2 2026: pendapatan "other" (termasuk lisensi data) US$43 juta, kontrak Google disebut berakhir paruh pertama 2027. Semua angka non-resmi diberi tanda "dilaporkan". ✅/🟡
4. **Hukum:** Bartz v. Anthropic disetujui final 20 Jul 2026 (US$1,5 miliar, ≈US$3.000/karya, ±500 ribu karya); pelatihan pada buku yang dibeli sah dinyatakan fair use, perolehan dari situs bajakan yang dipersoalkan. NYT v. OpenAI/Microsoft masih berjalan (belum ada putusan inti yang ketemu). Getty v. Stability (UK, 4 Nov 2025): klaim pelanggaran sekunder ditolak, kemenangan merek dagang Getty "sangat terbatas". ✅/🟡
5. **Manusia mengajari AI jadi industri:** Meta ambil 49% Scale AI senilai US$14,3 miliar (Juni 2025, tanpa hak suara; 🟡 pada verifikasi otomatis); Mercor US$350 juta pada valuasi US$10 miliar, membayar kontraktor >US$1,5 juta/hari (Okt 2025, ✅).
6. **Konten AI membanjiri web:** Graphite (data hingga Q1 2026): ±50% artikel baru "terutama dibuat AI", stagnan sejak Q1 2025; Ahrefs (Apr 2025): 74,2% halaman baru mengandung konten AI. Definisi berbeda; keduanya studi vendor SEO dengan detektor AI. 🟡
7. **Para pemimpin:** Sutskever (Nov 2025): "pre-training will run out of data. The data is very clearly finite." Hassabis (Jan 2025): sebagian karena "running out of real-world tokens and data". Altman (Jul 2026): hambatan bergeser dan kini kembali ke ide riset. LeCun: teks saja tak cukup (anak 4 tahun ≈ data teks internet). Amodei: tidak ketemu pernyataan "data habis" 2025–2026. Semua 🟡 (sumber tunggal atau sekunder).

---

## Pondasi 5W+1H

- **Apa:** Data publik berkualitas makin terbatas (dikunci pemilik, dijual berlisensi, dipersoalkan di pengadilan, dan makin tercemar konten AI), sehingga industri beralih ke data berlisensi, pelabelan oleh pakar manusia, dan data sintetis. Rujukan: bagian Pagar, Lisensi, Hukum, Pelabelan, Banjir konten.
- **Siapa:** Data Provenance Initiative (MIT-led), Cloudflare, Reddit, Google, OpenAI, News Corp, Meta, Anthropic, NYT, Getty, Stability AI, Scale AI, Mercor, Surge AI, Graphite, Ahrefs, Sutskever, Hassabis, Altman, LeCun.
- **Kapan:** Jul 2024 (studi Consent in Crisis); Feb 2024 (Reddit–Google); Mei 2024 (News Corp–OpenAI); Jun 2025 (Meta–Scale; putusan fair use Bartz); 1 Jul 2025 (Cloudflare); 4 Nov 2025 (Getty); 20 Jul 2026 (persetujuan final Bartz); Mar 2026 (Meta–News Corp).
- **Di mana:** AS (SDNY, N.D. Cal.), Inggris (High Court), Jerman (Munich, GEMA v OpenAI).
- **Kenapa:** Situs-situs berkualitas membatasi crawler karena merasa diambil tanpa izin atau bayaran; perusahaan AI butuh data segar/berkualitas; pengadilan menentukan batas hukumnya.
- **Bagaimana:** Lewat robots.txt/ToS dan pemblokiran di tingkat CDN; lewat kontrak lisensi; lewat gugatan dan penyelesaian; lewat jaringan pakar berbayar; sementara web terisi konten AI.

---

## Rincian

### 1. Pagar internet

- ✅ **Studi "Consent in Crisis" (Longpre dkk.; Data Provenance Initiative):** audit 14.000 domain di balik C4, RefinedWeb, Dolma. Dalam setahun (2023-04 s.d. 2024-04) ~5%+ token seluruh C4, atau 28%+ token sumber kritis C4, dibatasi penuh via robots.txt; 45% C4 dibatasi via ToS. (arXiv, 2024-07-20; NYT, 2024-07-19) · https://arxiv.org/abs/2407.14933 · https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html
  > "rendering ~5%+ of all tokens in C4, or 28%+ of the most actively maintained, critical sources in C4, fully restricted from use." — arXiv · https://arxiv.org/abs/2407.14933
  > "For Terms of Service crawling restrictions, a full 45% of C4 is now restricted." — arXiv · https://arxiv.org/abs/2407.14933
  > "5 percent of all data, and 25 percent of data from the highest-quality sources, has been restricted" — The New York Times · https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html
- ✅ **Lonjakan terjadi setelah GPTBot dan sejenisnya diumumkan:** sekitar 1% token (pertengahan 2023) menjadi 5-7% (Apr 2024); di domain "kepala" 20-33%. (arXiv PDF, 2024-07-25; The Register, 2024-07-22) · https://arxiv.org/pdf/2407.14933 · https://www.theregister.com/software/2024/07/22/ai-training-data-pool-shrinks-as-sites-ban-creepy-crawlers/754225
  > "~1% of C4, RefinedWeb, and Dolma tokens were restricted in mid 2023, as compared to 5-7% of tokens in April 2024." — arXiv PDF · https://arxiv.org/pdf/2407.14933
  > "between 20 and 33 percent of the top domains have enacted complete restrictions on crawlers" — The Register · https://www.theregister.com/software/2024/07/22/ai-training-data-pool-shrinks-as-sites-ban-creepy-crawlers/754225
- 🟡 **Pembaruan 2025–2026 oleh Data Provenance Initiative: tidak ditemukan.** Situs mereka (dibaca) mencantumkan publikasi dan "AI Observatory" tapi halaman paper hanya memuat tautan PDF. Jangan sebut angka lebih baru dari April 2024 sebagai milik studi ini. · https://www.dataprovenance.org/consent-in-crisis-paper
- ✅ **Cloudflare 1 Jul 2025:** "pertama" penyedia infrastruktur internet yang memblokir crawler AI tanpa izin/bayaran secara bawaan; setiap domain baru ditanya saat mendaftar; pelanggan lama bisa mengatur sendiri. Cloudflare menyebut mengelola lalu lintas "20% of the web" dan >1 juta pelanggan sudah memilih opsi blokir satu klik (sejak Sep 2024). (Cloudflare, 2025-07-01; Help Net Security, 2025-07-01) · https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/ · https://www.helpnetsecurity.com/2025/07/01/cloudflare-blocks-ai-crawlers/
  > "AI companies will now be required to obtain explicit permission from a website before scraping." — Cloudflare · https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/
  > "More than one million customers have since chosen this option" — Cloudflare · https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/
  > "Cloudflare is now the first major internet infrastructure company to block AI crawlers by default" — Help Net Security · https://www.helpnetsecurity.com/2025/07/01/cloudflare-blocks-ai-crawlers/
  > "is changing the default to block AI crawlers unless they pay creators for their content." — Cloudflare Blog · https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation
- 🟡 **"Pay per crawl" (⚠️ Belum terverifikasi: hanya 1 sumber, blog Cloudflare sendiri):** beta tertutup; crawler yang tak membayar menerima respons HTTP 402 berisi harga; Cloudflare jadi Merchant of Record. (Cloudflare Blog, 2025-07-01) · https://blog.cloudflare.com/introducing-pay-per-crawl/
  > "Pay per crawl, in private beta, is our first experiment in this area." — Cloudflare Blog · https://blog.cloudflare.com/introducing-pay-per-crawl/
- 🟡 **Catatan cakupan:** sebagian liputan menulis seolah semua situs Cloudflare langsung diblokir. Siaran pers Cloudflare sendiri menyebut default untuk domain baru. Aturan Cloudflare 2026 (pemisahan crawler Search/Agent/Training, 15 Sep 2026) hanya terlihat di blog kecil di hasil pencarian dan tidak diverifikasi (lihat Belum terjawab).

### 2. Kesepakatan lisensi data

- ✅ **Reddit–Google ≈ US$60 juta/tahun (dilaporkan, bukan angka resmi perusahaan):** Reuters (2024-02-22) berdasar satu dari tiga sumber; Bloomberg lebih dulu melaporkan US$60 juta tanpa menyebut pembeli. Reddit & Google mengumumkan kemitraan 22 Feb 2024 tanpa angka. · https://www.thestar.com.my/tech/tech-news/2024/02/22/exclusive-reddit-in-ai-content-licensing-deal-with-google-sources-say · https://www.dailymaverick.co.za/article/2024-02-23-reddit-trumpets-revenue-source-besides-ads-lucrative-ai-deals
  > "The contract with Alphabet-owned Google is worth about $60 million per year, according to one of the sources." — Reuters via The Star · https://www.thestar.com.my/tech/tech-news/2024/02/22/exclusive-reddit-in-ai-content-licensing-deal-with-google-sources-say
  > "Bloomberg had earlier reported the existence of a $60 million AI deal." — Bloomberg via Daily Maverick · https://www.dailymaverick.co.za/article/2024-02-23-reddit-trumpets-revenue-source-besides-ads-lucrative-ai-deals
- ✅ **S-1 Reddit (Feb 2024): kontrak lisensi data total US$203 juta, 2–3 tahun** (angka perusahaan, dikutip media; S-1 aslinya tidak dibaca langsung). · https://www.dailymaverick.co.za/article/2024-02-23-reddit-trumpets-revenue-source-besides-ads-lucrative-ai-deals · https://www.404media.co/reddit-we-are-in-the-early-stages-of-monetizing-our-user-base-2/
  > "entered into licensing agreements with an aggregate value of $203 million, with terms ranging from two to three years" — Bloomberg via Daily Maverick · https://www.dailymaverick.co.za/article/2024-02-23-reddit-trumpets-revenue-source-besides-ads-lucrative-ai-deals
  > "will pay it at least $203 million over the next 2-3 years" — 404 Media · https://www.404media.co/reddit-we-are-in-the-early-stages-of-monetizing-our-user-base-2/
- 🟡 **Reddit–OpenAI:** kemitraan ada (Engadget menyebut OpenAI mengumumkan kemitraan dengan Reddit di antara sejumlah penerbit; Crypto Briefing: OpenAI dan Google sama-sama menandatangani awal 2024). **Nilai kontrak OpenAI tidak ketemu** dari sumber yang layak (satu situs agregator menyebut ±US$70 juta/tahun, tidak ada sumber kedua: jangan dipakai). · https://www.engadget.com/openai-will-reportedly-pay-250-million-to-put-news-corps-journalism-in-chatgpt-214615249.html · https://cryptobriefing.com/reddit-data-licensing-revenue-openai-google/
  > "OpenAI and Google both signed licensing agreements in early 2024" — Crypto Briefing · https://cryptobriefing.com/reddit-data-licensing-revenue-openai-google/
- ✅ **Reddit Q2 2026 (dilaporkan 30 Jul 2026):** pendapatan iklan US$762 juta; lini "other" yang membawa lisensi data US$43 juta (+24%). (PPC Land, 2026-07-31; Crypto Briefing, 2026-08-17) · https://ppc.land/reddit-ad-revenue-hits-762-million-as-stock-drops-12-5-on-search-fears/ · https://cryptobriefing.com/reddit-data-licensing-revenue-openai-google/
  > "with other revenue, the line that carries data licensing, contributing $43 million on 24% growth." — PPC Land · https://ppc.land/reddit-ad-revenue-hits-762-million-as-stock-drops-12-5-on-search-fears/
- 🟡 **Kontrak Google disebut berakhir paruh pertama 2027, dan Reddit dikabarkan menimbang memblokir Google (Jul 2026):** hanya dari FourWeekMBA (analisis blog) dan laporan "Reports in July" di PPC Land; belum dibaca laporan WSJ aslinya. · https://fourweekmba.com/ai-reddit-ai-curse-q2-2026-earnings/ · https://ppc.land/reddit-ad-revenue-hits-762-million-as-stock-drops-12-5-on-search-fears/
  > "the Google deal alone is worth approximately $60 million annually and is set to expire in the first half of 2027." — FourWeekMBA · https://fourweekmba.com/ai-reddit-ai-curse-q2-2026-earnings/
- 🟡 **News Corp–OpenAI (22 Mei 2024): dilaporkan >US$250 juta/5 tahun** (tunai + kredit teknologi OpenAI); kedua perusahaan tidak mengungkap angka. Kedua sumber di bawah bersumber dari WSJ, jadi dihitung satu asal. · https://www.engadget.com/openai-will-reportedly-pay-250-million-to-put-news-corps-journalism-in-chatgpt-214615249.html · https://www.mediaweek.com.au/meta-to-pay-news-corp-up-to-us50m-a-year-for-ai-content
  > "a report in The Wall Street Journal estimated that News Corp would get $250 million over five years in cash and credits" — Engadget · https://www.engadget.com/openai-will-reportedly-pay-250-million-to-put-news-corps-journalism-in-chatgpt-214615249.html
  > "which was reported at the time as being worth more than US$250 million over five years" — Mediaweek · https://www.mediaweek.com.au/meta-to-pay-news-corp-up-to-us50m-a-year-for-ai-content
- 🟡 **Meta–News Corp (3 Mar 2026): dilaporkan hingga US$50 juta/tahun, 3 tahun**; News Corp mengonfirmasi kesepakatan tapi bukan angkanya. Meta juga disebut punya kesepakatan dengan USA Today, People, CNN, Fox News. CEO News Corp memakai istilah strategi "woo and a sue". Satu asal (WSJ). · https://www.engadget.com/ai/meta-signs-a-multimillion-dollar-ai-licensing-deal-with-news-corp-234157902.html · https://www.mediaweek.com.au/meta-to-pay-news-corp-up-to-us50m-a-year-for-ai-content
  > "Meta has signed a multiyear AI content licensing deal with News Corp, worth up to US$50 million a year" — Mediaweek · https://www.mediaweek.com.au/meta-to-pay-news-corp-up-to-us50m-a-year-for-ai-content
  > "We have what you might call a woo and a sue strategy" — Robert Thomson (News Corp) via Engadget · https://www.engadget.com/ai/meta-signs-a-multimillion-dollar-ai-licensing-deal-with-news-corp-234157902.html
  > "previously signed multi-year agreements with USA Today, People, CNN, Fox News and other outlets" — Engadget · https://www.engadget.com/ai/meta-signs-a-multimillion-dollar-ai-licensing-deal-with-news-corp-234157902.html
- ✅ **Shutterstock–OpenAI (11 Jul 2023):** perjanjian enam tahun; OpenAI mendapat lisensi data latih gambar, video, musik. Nilai tidak diumumkan (jangan pakai angka "US$50 juta" dari situs SEO). (siaran pers Shutterstock; VentureBeat 2023-07-13) · https://www.aap.com.au/aapreleases/cision20230711ae52967/ · https://venturebeat.com/ai/shutterstock-signs-6-year-training-data-agreement-with-openai
  > "OpenAI has secured a license for access to additional Shutterstock training data" — Shutterstock (siaran pers) · https://www.aap.com.au/aapreleases/cision20230711ae52967/
- ✅ **Associated Press–OpenAI (2023):** kesepakatan dua tahun untuk akses sebagian arsip teks AP (sejak 1985), AP disebut yang pertama mengumumkan kesepakatan semacam ini dengan OpenAI. (VentureBeat 2023-07-13; Al Jazeera 2026-07-09; siaran pers AP sendiri belum dibaca) · https://venturebeat.com/ai/shutterstock-signs-6-year-training-data-agreement-with-openai · https://www.aljazeera.com/economy/2026/7/9/nyt-led-group-asks-court-to-sanction-openai-in-us-copyright-dispute
  > "the Associated Press (AP) has entered a two-year agreement with OpenAI to share access to select news content and technology." — VentureBeat · https://venturebeat.com/ai/shutterstock-signs-6-year-training-data-agreement-with-openai
  > "The Associated Press was the first to announce such a deal with OpenAI in 2023." — Al Jazeera · https://www.aljazeera.com/economy/2026/7/9/nyt-led-group-asks-court-to-sanction-openai-in-us-copyright-dispute
- 🟡 **Penerbit ilmiah 2026:** Wiley melaporkan pendapatan lisensi AI US$49 juta (FY2026, tahun buku s.d. 30 Apr 2026), >US$110 juta sepanjang waktu; angka T&F/Springer Nature ("dilaporkan") juga ada. Sumber tunggal: ulasan CASRAI, laporan keuangan Wiley belum dibaca. · https://casrai.org/news/scholarly-publisher-ai-licensing-deals-2026
  > "show $49 million in AI licensing revenue and lifetime AI revenue surpassing $110 million" — CASRAI · https://casrai.org/news/scholarly-publisher-ai-licensing-deals-2026

### 3. Sengketa hak cipta (bahasa netral: "digugat/diduga" kecuali ada putusan)

- ✅ **Bartz v. Anthropic:** persetujuan final 20 Jul 2026 oleh Hakim Araceli Martínez-Olguín (Hakim Alsup yang memberi persetujuan awal tahun 2025 sudah pensiun). Penyelesaian US$1,5 miliar; ≈US$3.000 per karya untuk ±500 ribu karya (dibagi penulis dan penerbit); biaya pengacara US$101,6 juta; ±350 penulis memilih keluar. Putusan Alsup Juni 2025: pelatihan pada buku yang dibeli secara sah = fair use, tetapi mengunduh jutaan buku dari perpustakaan bayangan (LibGen, PiLiMi) tidak. Karena berakhir damai, tidak ada preseden banding. (TechCrunch 2026-07-21; TNW 2026-07-21; LA Times via News Tribune 2026-07-24) · https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/ · https://thenextweb.com/news/anthropic-1-5-billion-copyright-settlement-approved · https://www.newstribune.com/news/2026/jul/24/judge-approves-anthropics-15b-settlement-with/
  > "The payout will deliver $3,000 per work across an estimated 500,000 works" — TechCrunch · https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/
  > "granted final approval on 20 July" — TNW · https://thenextweb.com/news/anthropic-1-5-billion-copyright-settlement-approved
  > "Judge William Alsup found that training a model on lawfully purchased books was fair use" — TNW · https://thenextweb.com/news/anthropic-1-5-billion-copyright-settlement-approved
  > "Some 350 authors in the Anthropic lawsuit opted out of the settlement" — LA Times via News Tribune · https://www.newstribune.com/news/2026/jul/24/judge-approves-anthropics-15b-settlement-with/
  > "Their lawyers were awarded $101.6 million in fees." — LA Times via News Tribune · https://www.newstribune.com/news/2026/jul/24/judge-approves-anthropics-15b-settlement-with/
- 🟡 **NYT v. OpenAI & Microsoft (SDNY, No. 1:23-cv-11195):** NYT menggugat akhir 2023; masih berjalan. 25 Jun 2026 NYT mencabut satu klaim terhadap OpenAI (kontribusi pelanggaran oleh pengguna) dan memperkuat klaim sejenis terhadap Microsoft; 9 Jul 2026 NYT dkk. meminta sanksi terhadap OpenAI atas dugaan menyembunyikan bukti. Mosi summary judgment tertunda dan penolakan penambahan klaim (Agustus 2026) hanya dari ringkasan pencarian, belum dibaca di sumber. Kasus Oktober–November 2026: tidak ketemu. Putusan inti: belum ada yang ketemu. · https://www.aljazeera.com/economy/2026/7/9/nyt-led-group-asks-court-to-sanction-openai-in-us-copyright-dispute · https://news.bgov.com/ip-law/new-york-times-narrows-openai-suit-targets-microsofts-conduct
  > "The New York Times (NYT) sued OpenAI and Microsoft in late 2023" — Al Jazeera · https://www.aljazeera.com/economy/2026/7/9/nyt-led-group-asks-court-to-sanction-openai-in-us-copyright-dispute
  > "are asking a United States federal judge to impose sanctions on OpenAI" — Al Jazeera · https://www.aljazeera.com/economy/2026/7/9/nyt-led-group-asks-court-to-sanction-openai-in-us-copyright-dispute
  > "dropped its claim accusing OpenAI Inc. of contributing to ChatGPT users" — Bloomberg Law · https://news.bgov.com/ip-law/new-york-times-narrows-openai-suit-targets-microsofts-conduct
- 🟡 **Getty Images v. Stability AI (High Court Inggris & Wales, putusan 4 Nov 2025, [2025] EWHC 2863 (Ch), Hakim Joanna Smith):** Getty menggugurkan klaim pelanggaran primer di tengah sidang; klaim pelanggaran sekunder ditolak (Stable Diffusion tidak pernah menyimpan salinan karya Getty); beberapa klaim merek dagang dikabulkan tetapi "sangat terbatas". Tanggal dan nomor putusan dari situs peradilan (primer); isi putusan dari ulasan firma hukum Cleary (LexBlog adalah salinan teksnya, dihitung satu). Izin banding 17 Des 2025: hanya dari ringkasan pencarian, belum diverifikasi. · https://www.judiciary.uk/judgments/getty-images-v-stability-ai/ · https://www.clearygottlieb.com/news-and-insights/publication-listing/uk-high-court-issues-landmark-ruling-in-getty-images-v-stability-ai
  > "Neutral Citation Number: [2025] EWHC 2863 (Ch)" — Courts and Tribunals Judiciary · https://www.judiciary.uk/judgments/getty-images-v-stability-ai/
  > "after Getty abandoned its primary infringement claims during trial" — Cleary Gottlieb · https://www.clearygottlieb.com/news-and-insights/publication-listing/uk-high-court-issues-landmark-ruling-in-getty-images-v-stability-ai
  > "extremely limited in scope" — Cleary Gottlieb · https://www.clearygottlieb.com/news-and-insights/publication-listing/uk-high-court-issues-landmark-ruling-in-getty-images-v-stability-ai
  > "As the court found that this was not the case for Stable Diffusion" — LexBlog (Cleary) · https://www.lexblog.com/2025/11/05/uk-high-court-issues-landmark-ruling-in-getty-images-v-stability-ai-with-narrow-trademark-infringement-win-for-getty-claim-of-secondary-copyright-infringement-fails/
- 🟡 **GEMA v. OpenAI (Pengadilan Munich, 11 Nov 2025; tingkat pertama):** lirik lagu yang "dihafal" model dan dikeluarkan lagi di keluaran chatbot; pengadilan menolak pembelaan pengecualian penambangan teks & data. Sumber tunggal: pelacak kasus CMS (2026-02-02). Banding/lanjutan tidak dicek. · https://cms.law/en/rou/publication/artificial-intelligence-and-copyright-case-tracker/united-kingdom-getty-images-us-inc-ors-v-stability-ai-ltd2
  > "GEMA has filed an action against OpenAI before the Munich District Court" — CMS · https://cms.law/en/rou/publication/artificial-intelligence-and-copyright-case-tracker/united-kingdom-getty-images-us-inc-ors-v-stability-ai-ltd2
  > "The court held that the infringements were not justified by any legal basis." — CMS · https://cms.law/en/rou/publication/artificial-intelligence-and-copyright-case-tracker/united-kingdom-getty-images-us-inc-ors-v-stability-ai-ltd2
- 🟡 **Gugatan lain Juli 2026:** TechCrunch menyebut sekelompok penerbit/penulis (Hachette, Cengage, Elsevier, Scott Turow, dll.) mengajukan gugatan class action terhadap Google terkait pelatihan Gemini ("accusations"/dugaan; belum ada putusan). · https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/

### 4. Pelabelan data oleh manusia

- 🟡 **Meta–Scale AI (Juni 2025) (⚠️ Belum terverifikasi otomatis: CNBC terbaca saat riset tetapi gagal dibuka ulang saat verifikasi, jadi hanya SiliconANGLE yang terhitung):** Meta menanam US$14,3 miliar untuk 49% saham tanpa hak suara; CEO Alexandr Wang pindah ke Meta, Jason Droege jadi CEO Scale. Scale menyatakan pelanggan lain (termasuk Google dan OpenAI) tak terpengaruh. (CNBC 2025-06-13; SiliconANGLE 2025-09-10) · https://www.cnbc.com/2025/06/12/scale-ai-founder-wang-announces-exit-for-meta-part-of-14-billion-deal.html · https://siliconangle.com/2025/09/10/report-investors-offered-fund-ai-data-startup-mercor-10b-valuation/
  > "will have a 49% stake in the artificial intelligence startup, but will not have any voting power" — CNBC · https://www.cnbc.com/2025/06/12/scale-ai-founder-wang-announces-exit-for-meta-part-of-14-billion-deal.html
  > "That month, the latter company sold a 49% stake to Meta Platforms Inc. for $14.3 billion." — SiliconANGLE · https://siliconangle.com/2025/09/10/report-investors-offered-fund-ai-data-startup-mercor-10b-valuation/
- 🟡 **Skala Scale AI (dilaporkan):** pendapatan ±US$870 juta (2024), proyeksi US$2 miliar (2025). Sumber: The Decoder mengutip CNBC. · https://the-decoder.com/meta-invests-14b-in-scale-ai-acquires-49-stake-and-superintelligence-lab-leader/
  > "Scale AI posted revenue of roughly $870 million in 2024, with a forecast of $2 billion for 2025" — The Decoder · https://the-decoder.com/meta-invests-14b-in-scale-ai-acquires-49-stake-and-superintelligence-lab-leader/
- ✅ **Mercor Seri C (27 Okt 2025):** US$350 juta, dipimpin Felicis, valuasi US$10 miliar (5x Seri B). Pelanggannya disebut termasuk OpenAI dan Nvidia; jaringan kontraktor >US$1,5 juta/hari. (blog Mercor, primer; News IO 2025-10-27; Benzinga 2025-11-22) · https://www.mercor.com/blog/series-c · https://newsio.com/2025/10/27/ai-startup-mercor-now-valued-at-10-billion-with-new-350-million-funding-round/ · https://www.benzinga.com/news/topics/25/11/49021486/mercor-ceo-brendan-foody-calls-it-a-new-category-of-work-as-his-10-billion-company-pays-humans-over-1
  > "This round values Mercor at $10 billion, 5x our Series B valuation." — Mercor (blog resmi) · https://www.mercor.com/blog/series-c
  > "who are collectively paid over $1.5 million each day" — News IO · https://newsio.com/2025/10/27/ai-startup-mercor-now-valued-at-10-billion-with-new-350-million-funding-round/
  > "Mercor is paying more than $1.5 million a day to people training artificial intelligence systems." — Benzinga · https://www.benzinga.com/news/topics/25/11/49021486/mercor-ceo-brendan-foody-calls-it-a-new-category-of-work-as-his-10-billion-company-pays-humans-over-1
- 🟡 **ARR Mercor & Surge AI (dilaporkan, bukan resmi):** ARR Mercor melonjak dari US$100 juta (Mar 2025) ke >US$450 juta; Surge AI dikabarkan beromzet >US$1 miliar (2024) dan mencari pendanaan hingga US$1 miliar (valuasi dikabarkan US$15 miliar). Sumber: SiliconANGLE (2025-09-10) mengutip TechCrunch/Reuters. · https://siliconangle.com/2025/09/10/report-investors-offered-fund-ai-data-startup-mercor-10b-valuation/
  > "annualized recurring revenue jumped from $100 million in March to over $450 million today" — SiliconANGLE · https://siliconangle.com/2025/09/10/report-investors-offered-fund-ai-data-startup-mercor-10b-valuation/
  > "Its revenue reportedly topped $1 billion in 2024." — SiliconANGLE · https://siliconangle.com/2025/09/10/report-investors-offered-fund-ai-data-startup-mercor-10b-valuation/
- 🟡 **Pesan pendiri Mercor soal pasar ini:** "Millions of people will spend the next decade teaching machines the judgment, nuance, and taste that only humans possess." (blog resmi, 2025-10-27; pernyataan promosi perusahaan, bukan fakta pasar). · https://www.mercor.com/blog/series-c
  > "Millions of people will spend the next decade teaching machines the judgment, nuance, and taste that only humans possess." — Mercor · https://www.mercor.com/blog/series-c

### 5. Konten buatan AI membanjiri web

- 🟡 **Graphite, versi baru (15 Mei 2026; data hingga Q1 2026):** 55,4 ribu artikel berbahasa Inggris dari Common Crawl (Jan 2020 s.d. Mar 2026), dinilai tiga detektor (Pangram, GPTZero, Copyleaks), tingkat positif-palsu & negatif-palsu <2%. Porsi artikel "terutama dibuat AI": 36% dalam 12 bulan pertama sejak ChatGPT, 48% di bulan ke-24, lalu mendatar ±50% sejak Q1 2025 (49,6% Q1 2025; 50,9% Q4 2025; 49,9% Q1 2026). Keterbatasan penulisnya: tidak mengukur lalu lintas/peringkat, artikel campuran AI+manusia tidak dievaluasi, Common Crawl tidak memuat situs berbayar. Graphite vendor SEO; hanya satu studi (dua versi). · https://graphite.io/research/ai-now-writes-as-many-online-articles-as-humans-do
  > "since Q1 2025 the percentage of primarily AI-generated articles has plateaued at roughly 50%." — Graphite · https://graphite.io/research/ai-now-writes-as-many-online-articles-as-humans-do
  > "In Q4 2025, primarily AI-generated articles surpassed human-written at 50.9%, before returning to 49.9% in Q1 2026." — Graphite · https://graphite.io/research/ai-now-writes-as-many-online-articles-as-humans-do
- 🟡 **Graphite versi pertama (14 Okt 2025):** satu detektor (Surfer), ~43 ribu artikel; AI melampaui manusia sejak November 2024; versi baru memperkirakan angkanya 3,3 poin persentase lebih rendah. Positif-palsu 4,2% pada artikel pra-ChatGPT. Graphite sendiri menyarankan membaca versi baru. · https://graphite.io/research/more-articles-are-now-created-by-ai-than-humans
  > "We classify an article as AI-generated if the algorithm predicts that more than 50% of the content is AI-generated" — Graphite · https://graphite.io/research/more-articles-are-now-created-by-ai-than-humans
- 🟡 **Ahrefs (19 Mei 2025):** 900.000 halaman web baru (April 2025, satu halaman per domain, bahasa Inggris) dengan detektor milik sendiri `bot_or_not`: 74,2% mengandung konten AI; 25,8% "pure human" (sisanya campuran atau murni AI). Ahrefs mengakui detektor tak sempurna dan menjual alatnya. · https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated/
  > "We analyzed 900,000 newly created web pages in April 2025 and found that 74.2% of them contained AI-generated content." — Ahrefs · https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated/
  > "No AI content detector is perfect." — Ahrefs · https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated/
- **Cara membandingkan:** jangan menyandingkan 74% (Ahrefs: "mengandung" AI, termasuk campuran) dan ~50% (Graphite: "terutama" AI) sebagai satu tren. Definisi, sampel, dan detektor berbeda (lihat Konflik data).

### 6. Kata para pemimpin lab

- 🟡 **Ilya Sutskever (Dwarkesh Podcast, 25 Nov 2025) (⚠️ Belum terverifikasi: hanya 1 sumber, transkrip di situs pewawancara):** "pre-training will run out of data". Ia menempatkan 2012–2020 sebagai era riset dan 2020–2025 sebagai era penskalaan; kini "kembali ke era riset" dengan komputasi besar. Transkrip ini bukti untuk "X mengatakan", bukan bukti isinya benar. · https://www.dwarkesh.com/p/ilya-sutskever-2
  > "At some point though, pre-training will run out of data. The data is very clearly finite." — Dwarkesh Podcast (Sutskever) · https://www.dwarkesh.com/p/ilya-sutskever-2
- 🟡 **Demis Hassabis (wawancara Semafor, 24 Jan 2025):** kemajuan pra-pelatihan tidak sehalus dulu, sebagian karena kehabisan token dunia nyata; jalan keluarnya data sintetis dan menggali lebih banyak data video. Sumber tunggal; belum ada kutipan 2026 yang spesifik soal data (wawancara Semafor Jan 2026 membahas laju dan komersialisasi). · https://www.semafor.com/article/01/24/2025/demis-hassabis-on-whats-next-after-his-nobel-prize
  > "running out of real-world tokens and data" — Demis Hassabis via Semafor · https://www.semafor.com/article/01/24/2025/demis-hassabis-on-whats-next-after-his-nobel-prize
- 🟡 **Sam Altman (Invest Like The Best, tayang 28 Jul 2026):** jawaban atas "apa yang paling langka di frontier?": hambatan bergeser (ide riset → komputasi → data → kini kembali ke ide riset). Dikutip dari dua catatan sekunder atas wawancara yang sama (TechFlow, Bit.Fan), bukan transkrip resmi. Tidak ketemu pernyataan Altman 2025–2026 yang menyatakan data akan habis. · https://www.techflowpost.com/en-US/article/32881 · https://www.bit.fan/en/news/list/sam-altman-openai-next-12-months-compute-agi-safety-en-12d339a6-en-keyName-e2d9dc16
  > "There is always a bottleneck, but it moves." — Sam Altman via TechFlow · https://www.techflowpost.com/en-US/article/32881
- 🟡 **Dario Amodei (Dwarkesh Podcast, 13 Feb 2026):** menyebut kuantitas dan kualitas/sebaran data sebagai dua dari lima faktor penskalaan, dan mengakui selisih efisiensi sampel dengan manusia. Tidak ketemu ucapannya soal "data habis" di 2025–2026. · https://www.dwarkesh.com/p/dario-amodei-2
  > "in pre-training we use trillions of tokens." — Dwarkesh Podcast (Amodei) · https://www.dwarkesh.com/p/dario-amodei-2
- 🟡 **Yann LeCun (⚠️ dua media sekunder, bukan rekaman primer):** teks saja tidak cukup; hitungannya, ±10^14 byte teks publik ≈ data visual yang diterima anak 4 tahun. Diucapkan 2025 dan diulang di RAISE Summit Paris 2026. (OfficeChai 2025-03-13; TNW 2026-07-09) · https://officechai.com/ai/yann-lecun-explains-why-text-data-alone-will-never-create-human-level-ai/ · https://thenextweb.com/news/yann-lecun-ami-world-models-raise-summit-llms
  > "In four years a young child has seen as much information or data as the biggest LLMs." — Yann LeCun via OfficeChai · https://officechai.com/ai/yann-lecun-explains-why-text-data-alone-will-never-create-human-level-ai/
  > "A four-year-old child, through vision alone, has already taken in about the same amount." — TNW · https://thenextweb.com/news/yann-lecun-ami-world-models-raise-summit-llms
- 🟡 **Elon Musk (bukan lab besar yang diminta, tambahan kutipan kuat; Jan 2025):** menyatakan "kumpulan pengetahuan manusia" sudah habis dipakai melatih AI "tahun lalu" dan beralih ke data sintetis; Fortune juga mengutip proyeksi Epoch AI: data teks publik habis antara 2028–2032 (Epoch: bagian peneliti sains). · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/
  > "The cumulative sum of human knowledge has been exhausted in AI training" — Elon Musk via Fortune · https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/

### Konflik data

- **Persentase robots.txt "Consent in Crisis":** arXiv menulis ~5%+ token C4 dan 28%+ token sumber kritis C4; NYT menulis "5 persen semua data dan 25 persen data dari sumber berkualitas tertinggi" untuk tiga korpus sekaligus; arXiv PDF memberi rentang 5-7% (semua) dan 20-33% (domain kepala). Pakai angka arXiv (primer) dan sebut korpusnya (C4) atau rentang tiga korpus.
- **Jumlah karya Bartz:** TechCrunch/LA Times "±500 ribu karya"; kuasa hukum penggugat sempat menyebut ±465 ribu judul di daftar (ringkasan pencarian, tidak dibaca). Pakai "±500 ribu karya (perkiraan)".
- **Scale/Meta:** CNBC/Scale US$14,3 miliar; Axios menulis US$15 miliar (hanya judul terbaca, sumber anonim). Pakai US$14,3 miliar.
- **Mercor:** jaringan ">300.000 pakar" (SiliconANGLE, kata perusahaan) vs ">30.000 kontraktor" yang dikelola dan dibayar (News IO/Benzinga/TechCrunch). Dua hal berbeda (jaringan vs yang aktif dibayar); jangan dicampur.
- **Graphite vs Ahrefs:** ~50% "terutama AI" (Graphite) vs 74,2% "mengandung AI" (Ahrefs). Bukan kontradiksi, definisi berbeda.
- **Angka lisensi (dilaporkan):** News Corp–OpenAI ada yang menulis "up to US$250 juta", ada yang "lebih dari US$250 juta", ada versi "US$50 juta/tahun"; semuanya turunan WSJ. Meta–News Corp: satu situs menulis "US$150 juta" (tiga tahun x hingga US$50 juta, hitungan sendiri, bukan pernyataan sumber).

---

## Kandidat bukti visual (belum ditangkap/diunduh)

1. Halaman abstrak arXiv "Consent in Crisis" (judul + abstrak) · https://arxiv.org/abs/2407.14933
2. Judul NYT "The Data That Powers A.I. Is Disappearing Fast" (19 Jul 2024) · https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html
3. Siaran pers Cloudflare 1 Jul 2025 (judul "Cloudflare Just Changed How AI Crawlers Scrape the Internet-at-Large") · https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/
4. Blog Cloudflare "Content Independence Day" dan "Introducing pay per crawl" · https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation · https://blog.cloudflare.com/introducing-pay-per-crawl/
5. Reuters (via The Star) "Exclusive-Reddit in AI content licensing deal with Google" (22 Feb 2024) · https://www.thestar.com.my/tech/tech-news/2024/02/22/exclusive-reddit-in-ai-content-licensing-deal-with-google-sources-say
6. Judul TechCrunch "Anthropic's landmark $1.5B copyright settlement is approved" (21 Jul 2026) · https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/
7. Halaman putusan Getty v Stability AI di judiciary.uk (kepala putusan, 4 Nov 2025) · https://www.judiciary.uk/judgments/getty-images-v-stability-ai/
8. Judul Al Jazeera "NYT-led group asks court to sanction OpenAI" (9 Jul 2026) · https://www.aljazeera.com/economy/2026/7/9/nyt-led-group-asks-court-to-sanction-openai-in-us-copyright-dispute
9. Judul CNBC "Scale AI's Alexandr Wang confirms departure for Meta as part of $14.3 billion deal" (12–13 Jun 2025) · https://www.cnbc.com/2025/06/12/scale-ai-founder-wang-announces-exit-for-meta-part-of-14-billion-deal.html
10. Blog Mercor "Unlocking Human Potential in the AI Economy" (27 Okt 2025) · https://www.mercor.com/blog/series-c
11. Grafik "Primarily AI-generated articles (%)" di Graphite (15 Mei 2026) · https://graphite.io/research/ai-now-writes-as-many-online-articles-as-humans-do
12. Halaman transkrip Dwarkesh–Sutskever (25 Nov 2025) · https://www.dwarkesh.com/p/ilya-sutskever-2

Catatan: beberapa halaman ditolak/meminta captcha (Jurist, MarketBeat, GV Wire; Cloudflare "verifikasi keamanan") dan sebagian tautan media (Reuters/AP/PCMag/CBS/MIT Technology Review) 404/diblokir saat dibaca langsung: tangkapan visual untuk situs itu perlu uji.

---

## Wawasan tambahan 🧠 (pengetahuan model)

- 🧠 robots.txt itu "kesepakatan sopan santun", bukan kunci: crawler yang tak patuh tetap bisa mengambil. Itu alasan pemain besar pindah ke blokir tingkat jaringan (Cloudflare) dan ke kontrak lisensi.
- 🧠 Pelabelan manusia berbeda dari data mentah: pakar menulis jawaban ideal atau menilai jawaban model (RLHF/penilaian), jadi yang dibeli adalah penilaian dan penalaran manusia, bukan arsip yang sudah ada.
- 🧠 Putusan "pelatihan = fair use, tapi perolehan bajakan melanggar" memisahkan dua pertanyaan: boleh tidaknya belajar dari data, dan sah tidaknya cara mendapatkannya. Itu mendorong lab membeli/ memindai buku dan menandatangani lisensi.
- 🧠 Analogi untuk penonton awam: internet = perpustakaan umum yang kini sebagian rak dikunci, sebagian rak dijual lewat kontrak, sementara lorong penuh fotokopi buatan mesin.

---

## Koreksi terhadap Ringkasan AI Google

| Klaim Ringkasan Google (kueri "Consent in Crisis…") | Hasil cek |
|---|---|
| >5% token C4 dan 28% sumber kritis dibatasi robots.txt | Cocok dengan abstrak arXiv ("~5%+", "28%+"). |
| 45% C4 dibatasi lewat ToS | Cocok (abstrak arXiv). |
| Crawler OpenAI dibatasi pada ~25,9% token "head" C4 | Tidak diverifikasi: angka itu hanya di cuplikan pencarian, tidak muncul di bagian PDF yang terbaca. Jangan dipakai. |

Ringkasan AI hanya terbaca untuk kueri pertama; kueri lain diblok captcha Google.

---

## Belum terjawab

- Pembaruan 2025–2026 dari Data Provenance Initiative (persentase robots.txt terbaru): tidak ditemukan.
- Aturan baru Cloudflare 2026 (pemisahan Search/Agent/Training, tanggal 15 Sep 2026) dan status pay per crawl 2026: hanya terlihat di blog pihak ketiga; tidak diverifikasi.
- Nilai kontrak Reddit–OpenAI; nilai resmi kesepakatan AP, Shutterstock; Reddit–Google kedaluwarsa H1 2027 (sumber tunggal).
- NYT v. OpenAI: jadwal sidang, status summary judgment per Nov 2026, dan hasil mosi sanksi.
- Getty: izin banding (17 Des 2025) dan hasil bandingnya.
- Altman 2025–2026 soal "data habis": hanya satu wawancara (sekunder); Amodei: tidak ada pernyataan langsung 2025–2026; Hassabis 2026 soal data: tidak ketemu kutipan spesifik.
- Surge AI (angka resmi): hanya "dilaporkan".

---

## Sumber yang dibaca penuh

1. https://arxiv.org/abs/2407.14933 (A, 2024-07-20, Google + WebSearch)
2. https://arxiv.org/pdf/2407.14933 (A, 2024-07-25, keduanya)
3. https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html (B, 2024-07-19, Google)
4. https://www.theregister.com/software/2024/07/22/ai-training-data-pool-shrinks-as-sites-ban-creepy-crawlers/754225 (C, 2024-07-22, WebSearch)
5. https://www.dataprovenance.org/consent-in-crisis-paper (C, tanpa tanggal, keduanya)
6. https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/ (C, 2025-07-01, keduanya)
7. https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation (C, 2025-07-01, WebSearch)
8. https://blog.cloudflare.com/introducing-pay-per-crawl/ (C, 2025-07-01, Google)
9. https://www.helpnetsecurity.com/2025/07/01/cloudflare-blocks-ai-crawlers/ (C, 2025-07-01, WebSearch)
10. https://www.thestar.com.my/tech/tech-news/2024/02/22/exclusive-reddit-in-ai-content-licensing-deal-with-google-sources-say (C, 2024-02-22, keduanya)
11. https://www.dailymaverick.co.za/article/2024-02-23-reddit-trumpets-revenue-source-besides-ads-lucrative-ai-deals (C, 2024-02-23, WebSearch)
12. https://www.404media.co/reddit-we-are-in-the-early-stages-of-monetizing-our-user-base-2/ (C, 2024-02-22, WebSearch)
13. https://ppc.land/reddit-ad-revenue-hits-762-million-as-stock-drops-12-5-on-search-fears/ (C, 2026-07-31, WebSearch)
14. https://cryptobriefing.com/reddit-data-licensing-revenue-openai-google/ (C, 2026-08-17, keduanya)
15. https://fourweekmba.com/ai-reddit-ai-curse-q2-2026-earnings/ (C, 2026-07-31, WebSearch)
16. https://www.engadget.com/openai-will-reportedly-pay-250-million-to-put-news-corps-journalism-in-chatgpt-214615249.html (C, 2024-05-22, WebSearch)
17. https://www.engadget.com/ai/meta-signs-a-multimillion-dollar-ai-licensing-deal-with-news-corp-234157902.html (C, 2026-03-03, WebSearch)
18. https://www.mediaweek.com.au/meta-to-pay-news-corp-up-to-us50m-a-year-for-ai-content (C, 2026-03-05, WebSearch)
19. https://www.aap.com.au/aapreleases/cision20230711ae52967/ (C, siaran pers 2023-07-11, WebSearch)
20. https://venturebeat.com/ai/shutterstock-signs-6-year-training-data-agreement-with-openai (C, 2023-07-13, WebSearch)
21. https://casrai.org/news/scholarly-publisher-ai-licensing-deals-2026 (C, 2026-07-23, WebSearch)
22. https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/ (B, 2026-07-21, WebSearch)
23. https://thenextweb.com/news/anthropic-1-5-billion-copyright-settlement-approved (C, 2026-07-21, WebSearch)
24. https://www.newstribune.com/news/2026/jul/24/judge-approves-anthropics-15b-settlement-with/ (C, 2026-07-24, WebSearch)
25. https://www.aljazeera.com/economy/2026/7/9/nyt-led-group-asks-court-to-sanction-openai-in-us-copyright-dispute (B, 2026-07-09, WebSearch)
26. https://news.bgov.com/ip-law/new-york-times-narrows-openai-suit-targets-microsofts-conduct (C, 2026-06-25, WebSearch)
27. https://www.judiciary.uk/judgments/getty-images-v-stability-ai/ (A, 2025-11-04, WebSearch)
28. https://www.clearygottlieb.com/news-and-insights/publication-listing/uk-high-court-issues-landmark-ruling-in-getty-images-v-stability-ai (C, 2025-11-05, WebSearch)
29. https://www.lexblog.com/2025/11/05/uk-high-court-issues-landmark-ruling-in-getty-images-v-stability-ai-with-narrow-trademark-infringement-win-for-getty-claim-of-secondary-copyright-infringement-fails/ (C, 2025-11-06, WebSearch; salinan teks Cleary)
30. https://cms.law/en/rou/publication/artificial-intelligence-and-copyright-case-tracker/united-kingdom-getty-images-us-inc-ors-v-stability-ai-ltd2 (C, 2026-02-02, WebSearch)
31. https://www.cnbc.com/2025/06/12/scale-ai-founder-wang-announces-exit-for-meta-part-of-14-billion-deal.html (B, 2025-06-13, WebSearch)
32. https://siliconangle.com/2025/09/10/report-investors-offered-fund-ai-data-startup-mercor-10b-valuation/ (C, 2025-09-10, WebSearch)
33. https://the-decoder.com/meta-invests-14b-in-scale-ai-acquires-49-stake-and-superintelligence-lab-leader/ (C, 2025-06-11, WebSearch)
34. https://www.mercor.com/blog/series-c (C, 2025-10-27, WebSearch)
35. https://newsio.com/2025/10/27/ai-startup-mercor-now-valued-at-10-billion-with-new-350-million-funding-round/ (C, 2025-10-27, WebSearch)
36. https://www.benzinga.com/news/topics/25/11/49021486/mercor-ceo-brendan-foody-calls-it-a-new-category-of-work-as-his-10-billion-company-pays-humans-over-1 (C, 2025-11-22, WebSearch)
37. https://graphite.io/research/ai-now-writes-as-many-online-articles-as-humans-do (C, 2026-05-15, WebSearch)
38. https://graphite.io/research/more-articles-are-now-created-by-ai-than-humans (C, 2025-10-14, WebSearch)
39. https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated/ (C, 2025-05-19, WebSearch)
40. https://www.dwarkesh.com/p/ilya-sutskever-2 (C, 2025-11-25, WebSearch)
41. https://www.dwarkesh.com/p/dario-amodei-2 (C, 2026-02-13, WebSearch)
42. https://www.semafor.com/article/01/24/2025/demis-hassabis-on-whats-next-after-his-nobel-prize (C, 2025-01-24, WebSearch)
43. https://www.techflowpost.com/en-US/article/32881 (C, 2026-07-29, WebSearch)
44. https://www.bit.fan/en/news/list/sam-altman-openai-next-12-months-compute-agi-safety-en-12d339a6-en-keyName-e2d9dc16 (C, 2026-07-29, WebSearch)
45. https://officechai.com/ai/yann-lecun-explains-why-text-data-alone-will-never-create-human-level-ai/ (C, 2025-03-13, WebSearch)
46. https://thenextweb.com/news/yann-lecun-ami-world-models-raise-summit-llms (C, 2026-07-09, WebSearch)
47. https://fortune.com/2025/01/10/elon-musk-ai-training-data-running-out-human-synthetic-slop/ (C, 2025-01-10, WebSearch)

Sumber yang dibuang: situs agregator/tracker tanpa sumber jelas (llmpulse, aipaypercrawl.pages.dev, creatiai, ainvest, techdefused) karena angkanya tak bersumber dan tidak ada konfirmasi kedua; blog Pascal's Chatbot (konten AI). Halaman yang gagal dibaca: Jurist, MarketBeat, GV Wire, Las Vegas Sun (captcha/404), Reuters, AP, CBS, PCMag, MIT Technology Review, Axios, Seeking Alpha (404/paywall/kosong).

<!-- Bagian "## Verifikasi otomatis" ditambahkan oleh verifikasi_laporan. Jangan ditulis manual. -->

---

## Verifikasi otomatis

Dicek 2026-11-15 11:26 dengan `verifikasi_laporan` (sumber dibuka ulang di Brave agent): 61 kutipan: 55 persis, 0 mirip, **0 tidak ditemukan**, 6 sumbernya tak terbaca · 10 klaim ✅: 10 lolos aturan sumber, **0 hanya 1 sumber tercantum** · 0 sumber gagal dibuka.

Tidak ada temuan: semua kutipan ditemukan persis dan semua klaim ✅ punya 2 sumber independen atau sumber primer.
