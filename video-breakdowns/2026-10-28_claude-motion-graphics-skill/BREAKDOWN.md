# Bedah Motion — TikTok "Tutorial 1 · Claude Motion Graphics skill"

**Sumber:** `WhatsApp Video 2026-10-28 at 22.44.40.mp4`: 2:03.86, 576×1024 (9:16), 30 fps, AAC stereo 44.1 kHz.
**Dianalisis:** 2026-10-28. Ekstraksi frame 30 fps, contact sheet per 0.5 s, optical flow Farneback + fit similarity transform (pan/zoom/rotasi kamera per frame), deteksi cut (histogram HSV + frame diff), klasifikasi transisi (warna + edge), envelope audio (RMS per frame + onset spectral-flux).
Semua angka diambil dari area layar laptop yang di-crop (x32–546, y344–602 dari frame 576×1024), kecuali disebut lain.
**Label:** 📏 terukur · 👁 pengamatan per-frame · 💭 inferensi.
**Prompt final:** [PROMPT.md](PROMPT.md).

---

## TL;DR — DNA gerak (7 aturan)

1. **VO jadi metronom.** Tiap kata yang diucapkan memicu satu event visual di frame yang sama. Teks dibangun kata per kata di samping karakter, bukan subtitle di tengah. 📏 ±2.5 event teks/detik.
2. **Satu frasa = satu beat.** VO punya ±50 jeda yang turun sampai senyap digital (≤ −55 dB), jadi ada frasa baru tiap ±2.4 s. Median shot 1.45 s. Hit besar (slam, mosaic, smash zoom) jatuh 0–5 frame setelah jeda, tepat di suku kata pertama frasa baru. 📏
3. **Hierarki 3 tingkat + slam.** Kata sambung kecil, kata isi sedang, dan kata kunci raksasa (condensed caps, merah) yang dibanting masuk dengan flash, shake, dan ganti warna background. 👁
4. **Transisi signature: pixel mosaic** merah/putih/hitam. Dipakai 13× dari ±56 pergantian shot (±23%), durasi 12–14 frame. Sisanya cut di awal frasa, white-out, dip/glitch ke hitam, whip, PiP shrink, dan smash zoom. 📏👁
5. **Kamera tidak pernah diam.** Tiap hold punya drift lambat 1–4%/s (mayoritas push-in). Move besar dipakai sebagai "fitur": dorong masuk ke monitor, pull-out reveal, truck menyamping 8 s. 📏
6. **Art direction yang code-native.** Karakter pixel-art 2D di set voxel 3D ala Minecraft. Semuanya bisa dibangun dari kubus dan grid pixel, dan cocok dengan transisi pixel. Pergantian pose karakter disamarkan burst partikel pixel 3–4 frame. 👁💭
7. **Kontras tempo.** Di ±33–38% durasi ada section kosmik monokrom yang tenang (teks tipis, tanpa merah) sebelum core message. CTA akhir hampir statis selama 8 s. 📏👁

---

## 1. Dua lapis video

| Lapis | Isi | Gerak |
|---|---|---|
| Luar (post TikTok 9:16) | MacBook di ruang gelap dengan lampu hangat, kamera tripod; 2 pill caption putih statis (atas: judul tutorial, bawah: CTA "skill in bio"); watermark TikTok | **Nol.** Flow global ≈ 0 (contoh 112–116 s: 0.01 px/frame). Semua perhatian dipaksa ke layar. 📏 |
| Dalam (video 16:9 di layar) | Motion graphic 2 menit | Semua gerak ada di sini, jadi analisis difokuskan ke lapis ini |

💭 Audionya turun sampai senyap digital (−78 dB). Itu mustahil kalau direkam lewat mic HP di ruangan, jadi audio asli ditempel langsung (atau wrapper-nya komposit).

## 2. Angka kunci

| Metrik | Nilai | Catatan |
|---|---|---|
| Durasi inti | 119.8 s (+4 s outro TikTok bawaan) | 📏 |
| Pergantian shot/transisi | ±56 | 📏 histogram + diff, akurasi ±10% |
| Panjang shot | median 1.45 s · mean 2.14 s · min 0.1 s · max 11.3 s | 11 shot < 0.5 s, 4 shot > 5 s |
| Event teks | ±2.5/detik | 📏 onset audio 2.2–3/s, setara laju kata |
| Jeda VO (≤ −55 dB) | ±50, masing-masing 1–8 frame | 📏 frasa tiap ±2.4 s |
| Drift kamera saat hold | ±1–4%/s (mayoritas push-in) | 📏 |
| Pixel mosaic | 13× | 📏 3.0 · 15.1 · 17.2 · 20.3 · 22.3 · 23.7 · 52.3 · 55.4 · 65.0 · 70.1 · 80.4 · 91.1 · 98.9 s |
| Flash/white-out | 7× | 📏 24.6 · 32.2 · 39.9 · 40.7 · 42.9 · 58.6 · 96.3 s |
| Dip/glitch ke hitam | ±6× | 📏 8.0 · 13.4 · 39.8 · 45.8 · 62.5 · 88.9 s |

## 3. Struktur (beat sheet)

| Section | Waktu | % | Fungsi | Visual dominan | Motion highlight |
|---|---|---|---|---|---|
| Hook | 0–8 s | 0–7 | klaim besar, lalu "semua orang menanyakan hal yang sama", lalu "pertanyaannya salah" | desktop retro → bg oranye radial → bg merah | color strobe 0.5 s, smear per huruf, slam + swap oranye→merah |
| Problem | 8–15 s | 7–13 | jawaban bernada pelan, lalu "minta X → dapat hasil jelek" | hitam + vignette merah, set voxel ber-DOF, ribbon kartu 3D | glitch ke hitam, typewriter, kartu melayang + whip |
| Reveal & bukti | 15–35 s | 13–30 | siapa dan apa; social proof | perpustakaan voxel, meja + monitor (UI chat/code), ilustrasi lofi malam | mosaic parsial antar-angle, push masuk ke monitor, counter naik, pull-out reveal −45%/s |
| Meta turn + kontras | 35–46 s | 30–38 | "video ini sendiri tutorialnya", "let's cook", section kosmik | kartu PiP, langit petir, galaksi/planet monokrom | PiP shrink + rewind montage, zoom langit cepat, teks tipis tanpa merah |
| Core value | 46–96 s | 38–80 | tidak ada prompt ajaib; isi "satu kru lengkap dalam satu file"; sistem, aturan, fix | panggung karpet merah, ruang kayu, grid teal, timeline editor | decode biner, pipeline ikon + truck 8 s, kipas kartu "6 versi" |
| Rasio & "kamu" | 96–108 s | 80–90 | semua masuk ke file; skill = framework; X% dikerjakan skill, sisanya kamu | panel teal 3D berisi 4 bar warna | counter %, digit pecah jadi pixel, smash zoom ke close-up |
| CTA | 108–119.8 s | 90–100 | "dia sudah mengerjakan bagian sulitnya", lalu comment keyword | set blur, input bar UI, toast | whip, hold hampir statis 8 s, typewriter + caret, toast slide-in |

## 4. Kamus motion (frame @ 30 fps)

### 4.1 Entrance teks

| Kode | Nama | Dipakai untuk | Mekanik | Durasi | Contoh |
|---|---|---|---|---|---|
| E1 | Blur-slide | kata isi & kata sambung (paling sering) | geser horizontal ±5–10% lebar frame + motion blur kuat, rotasi awal kecil → 0 | 2–3 f, ease-out tajam | 52.9 s, 59.7 s |
| E2 | Chromatic smear | baris hook | stagger 1 f per huruf; tiap huruf masuk dengan smear warna (pink→biru→kuning) lalu jadi putih | 5–7 f per huruf | 3.6–4.4 s |
| E3 | Tint-settle | emphasis tahap kedua | masuk putih (E1), lalu tween putih → merah | ±5 f | 15.7–15.9 s |
| E4 | Decode | kata kunci, angka | glyph acak/biner teal atau huruf warna-warni yang resolve ke kata final | 4–6 f | 63.5 · 81.0 · 105.5 s |
| E5 | Typewriter + caret | baris "UI", kutipan, CTA | 0.5–1 karakter/frame (CTA lebih lambat, ±4 f/karakter), caret kedip ±2 Hz | — | 21.0 · 25.0 · 112 s |
| E6 | Letter pop | kata caps pendek | huruf naik dari bawah, stagger 1 f, overshoot | ±4 f | 14.1 s |
| E7 | Slam | kata kunci di awal frasa | lihat 4.2 | ±6 f | 6.87 s |

Exit: ikut cut, atau pecah jadi pixel/noise glitch dalam 4–5 f. Hampir tidak ada fade pelan.

### 4.2 Resep slam (👁 frame per frame, 6.70–7.70 s)

| Frame | Yang terjadi |
|---|---|
| f0–1 | komposisi lama shake + directional blur |
| f2–3 | frame putih (overexposed); kata kunci muncul di skala ±170%, terpotong tepi frame |
| f3–6 | skala turun ke 100% (ease-out, overshoot kecil); background ganti oranye → merah; ring shockwave merah di bawah karakter; karakter ganti pose (jatuh) lewat burst |
| f8–14 | baris kedua (caps kecil) masuk blur-slide dari kanan |
| setelahnya | kata dari frasa sebelumnya mundur jadi latar: blur, merah, redup |

### 4.3 Transisi

| Kode | Nama | Resep | Durasi |
|---|---|---|---|
| T1 | Pixel mosaic | grid ±16×8 sel; sel muncul acak (merah, merah tua, putih, hitam, kadang salmon/hijau) sampai penuh, lalu hilang acak dan memperlihatkan scene baru | 4–5 f in · 2–4 f hold · 4–5 f out (12–14 f). Versi parsial 3–5 f untuk ganti angle di set yang sama |
| T2 | Whip exit | komposisi dipercepat keluar frame + blur searah gerak; biasanya disambung T1 | ±6 f |
| T3 | Light-sweep white-out | bilah cahaya diagonal → putih penuh → exposure turun ke scene baru | 3 + 4 + 3 f |
| T4 | Flash cut | 1–2 frame putih | 1–2 f |
| T5 | Glitch ke hitam | irisan RGB / bar cyan-putih → hitam → scene sunyi | 1–2 f + hitam |
| T6 | Pixelate-out | ukuran blok mosaic membesar → 2 f hitam → cut | ±5 f |
| T7 | Foreground wipe | karakter raksasa yang blur lewat di depan kamera dan menutupi cut | 4–6 f |
| T8 | PiP shrink + rewind | frame penuh mengecil jadi kartu "video player" (±55%, sedikit tilt 3D); isi kartu memutar mundur scene-scene sebelumnya | 5–6 f + montage ±2 s |
| T9 | Smash zoom | push-in yang makin cepat ke close-up | ±6 f |
| T10 | Hook strobe | 0.5 s pertama: treatment warna berganti tiap 1–3 f (invert, duotone merah, duotone cyan, threshold hitam-putih, overexposed) | ±15 f |
| T11 | Rack-focus open | scene 3D baru dimulai blur, lalu fokus | 8–10 f |
| T12 | Halftone wipe | grid titik/kotak kecil menyapu layar sambil karakter pecah jadi partikel | ±6 f (3.0 s) |

### 4.4 Kamera (📏 fit similarity dari optical flow)

- **Hold:** drift lambat. Mayoritas push-in +1 s/d +4%/s (contoh shot 16–30 s), sebagian pull-out pelan −1 s/d −4%/s. CTA adalah satu-satunya hold yang ±0.
- **Push masuk ke monitor:** +4 s/d +10%/s (28.4 · 85.3 · 87.9 s). Di 85.3 s disertai tilt (ty −118 px/s).
- **Pull-out reveal:** −45%/s selama ±2.9 s (32.1–35.0 s).
- **PiP shrink:** −81%/s dalam 0.57 s (35.0 s).
- **Truck menyamping:** ±28 px/s (±5.5% lebar frame per detik) selama 8.3 s (68.6–77.0 s), mengikuti deretan ikon pipeline.
- **Zoom langit epik:** terukur ±+60%/s selama 1.8 s (37.9 s). Angkanya kemungkinan sedikit membengkak karena kilat petir.
- **Slam:** shake 2–3 f. Ribbon kartu bergerak lokal sampai ±104 px/s (13.9 s).

### 4.5 Karakter & objek

- **Hero:** detektif/"sutradara" pixel-art (topi deerstalker, mantel, kaca pembesar), proporsi chibi, dirender tajam nearest-neighbor. Muncul dari full-body kecil sampai close-up raksasa.
- **Sidekick:** makhluk kubus oranye bertopi fedora abu-abu, wajah minimal (mata titik, kedip, mata ^^).
- **Ganti pose = sprite burst:** karakter meledak jadi ratusan partikel pixel berwarna dirinya sendiri (3–4 f), lalu menyusun pose baru tepat di kata VO (3.83 s, 4.37 s). 👁
- **Idle sangat halus.** Rasa "hidup" datang dari burst pose, drift kamera, dan props.
- **Props:** ikon file kertas voxel (bergoyang pelan, rotasi Y kecil), lampu ide, kunci inggris, gear, mic, waveform. Semua pop-in dengan overshoot lalu melayang.
- **Kartu thumbnail 3D:** tumble masuk, membentuk ribbon melengkung atau kipas, lalu "tersedot" masuk ke file.
- **Callout anotasi:** garis tipis + label kecil yang menunjuk karakter.

### 4.6 Elemen UI & data

- **Counter:** count-up ease-out (15→50 dalam 12 f; persentase merayap 47→75 dalam ±1.5 s), font pixel oranye. Keluar dengan digit pecah jadi pixel. Ada jejak busur titik-titik dari angka ke karakter.
- **Level meter:** 10 kotak yang terisi bertahap.
- **Panel teal 3D:** kosong → static TV → 4 bar warna bertekstur pixel, dengan tilt pelan.
- **Mock UI gelap ala macOS:** jendela chat, code editor dengan syntax color, timeline editor video (klip merah/teal/pink), input bar + tombol kirim, toast notifikasi di kanan bawah.

## 5. Art direction

- **Palet** (estimasi; sudah lewat kamera HP + kompresi TikTok, aslinya lebih terang): hitam #050505, oranye hook #E8641A ke tepi #A33808, merah alarm #B3000C, merah aksen #E3262F, teal #19C3B5, amber #F5A623, kuning #FFD60A, oranye counter #FF7A1A, putih.
  Porsi piksel bersaturasi tinggi 📏: oranye 41%, merah 44% (dua keluarga warna), teal ±8%, amber/kuning ±6%.
- **Color script:** oranye → merah → hitam → interior voxel hangat → ilustrasi malam → kosmik monokrom → panggung karpet merah → hitam + grid teal → CTA gelap + teal.
- **Tipografi** (kelas font, bukan identifikasi pasti): UI sans kecil (mirip Inter/SF), geometric heavy sans putih + drop shadow (mirip Poppins/Montserrat ExtraBold), condensed caps raksasa merah (mirip Anton/Bebas), script/brush italic sebagai aksen, pixel/LCD untuk angka & biner.
- **Layout teks:** tumpukan rata kiri yang bergerigi, di sepertiga frame sebelah karakter; 1–3 baris; frasa baru membersihkan frasa lama; kata slam boleh terpotong tepi frame.
- **Lighting & tekstur:** interior gelap dengan practical light hangat (lampu meja emissive), DOF dangkal + bokeh, bloom, vignette, grain halus, chromatic aberration hanya di momen hit.

## 6. Audio & sinkron

- 📏 **Mix VO-first.** ±50 jeda turun sampai senyap digital, artinya tidak ada music bed konstan (atau bed-nya sangat tipis / di-gate).
- 📏 **Hit visual besar jatuh 0–5 f setelah jeda VO:** 6.87 · 15.2 · 42.93 · 58.57 · 80.67 · 86.87 · 87.87 · 96.27 s.
- 📏 **Jeda lebih panjang (0.33–0.40 s) sebelum punchline:** 23.4 s dan 28.7 s.
- 💭 **SFX per event.** Onset terdeteksi di hampir semua transisi besar (52.30 · 55.47 · 80.47 · 99.02 · 104.71 s).

## 7. Kenapa terasa "mahal" (yang layak dicuri)

1. Sinkron per kata sampai level frame bikin video terasa diedit manusia, bukan template.
2. Jenis entrance terikat peran kata (bukan acak), jadi hierarki tetap terbaca walau tempo cepat.
3. Satu transisi signature yang nyambung dengan art style (pixel ↔ voxel) membentuk identitas.
4. Kamera selalu "bernapas", jadi tidak pernah terasa seperti slideshow.
5. Ganti pose disamarkan burst: animasi karakternya murah, tapi terasa hidup.
6. Section tenang di tengah bikin core message terasa lebih keras.
7. Meta self-reference ("video ini adalah buktinya") menaikkan retensi dan kredibilitas.
8. CTA sengaja statis supaya mata fokus ke keyword.

## 8. Mapping ke arsenal di repo ini

| Kebutuhan | Pilihan di `motion-docs` | Catatan |
|---|---|---|
| Render deterministik ke MP4 | **belum ada.** Rekomendasi: Remotion (React). Alternatif: timeline GSAP paused + capture per frame (Playwright) → ffmpeg | Remotion butuh company license untuk perusahaan di atas ukuran tertentu; cek dulu sebelum dipakai komersial |
| Timeline & easing | `03-choreography/gsap` (SplitText untuk per huruf), `03-choreography/animejs` (stagger) | |
| Set voxel 3D | `11-r3f-ecosystem/three-js`, `r3f`, `drei` | instanced cubes |
| Post FX (bloom, DOF, noise, chromatic aberration, pixelation, glitch) | `11-r3f-ecosystem/react-postprocessing` | |
| Partikel sprite burst, halftone, grid mosaic | `07-creative-coding/p5js`, `11-r3f-ecosystem/maath` | |
| Keyframe kamera presisi | `03-choreography/theatre-js` | opsional |
| Ikon/props vektor animasi | `05-interactive-vector-3d/lottie-dotlottie`, `rive` | opsional |

## 9. Referensi frame (`frames/`)

- `overview_*.jpg`: contact sheet tiap 0.5 s, label waktu absolut.
- `strip_tXXX.X_*.jpg`: tiap frame (30 fps). **Label waktu di strip relatif terhadap t0** yang tertulis di nama file (contoh `strip_t052.2_pixel-mosaic.jpg`: label 0.20s = 52.40 s).

| File | Yang dipelajari |
|---|---|
| `strip_t000.0_hook-strobe.jpg` | T10 strobe warna + smear kata pembuka |
| `strip_t003.4_chromatic-smear-sprite-burst.jpg` | E2 per huruf + burst ganti pose |
| `strip_t006.7_slam-bg-swap.jpg` | E7 slam + swap oranye→merah |
| `strip_t013.3_pixelate-out-card-ribbon.jpg` | T6 + kartu 3D + E6 |
| `strip_t014.7_whip-to-mosaic.jpg` | T2 → T1 → E1 + E3 |
| `strip_t020.0_partial-mosaic-typewriter.jpg` | T1 parsial antar-angle + E5 |
| `strip_t024.3_light-sweep-whiteout.jpg` | T3 |
| `strip_t034.9_pip-shrink-rewind.jpg` | T8 |
| `strip_t052.2_pixel-mosaic.jpg` | T1 penuh, timing in/hold/out |
| `strip_t059.0_idle-props-blur-slide.jpg` | props melayang + E1 |
| `strip_t065.3_counter-easeout.jpg` | counter ease-out + busur titik |
| `strip_t104.8_smash-zoom-decode.jpg` | T9 + E4 + digit pecah jadi pixel |

## Metodologi & batasan

- Sumbernya rekaman TikTok 576×1024, jadi layar laptop cuma ±514×258 px. Font dan hex warna adalah estimasi kelas, bukan identifikasi pasti.
- Deteksi cut otomatis bisa menggabungkan atau memecah shot (terutama di transisi multi-frame), jadi jumlah shot ±10%. Satu kandidat mosaic palsu (86.2 s, teks merah di atas kode) sudah dibuang lewat cek visual.
- VO tidak ditranskrip karena fokusnya motion. Laju kata diestimasi dari onset audio.
- Naskah video asli sengaja tidak disalin di sini; yang dicatat hanya struktur dan fungsinya.
