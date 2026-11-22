# agi-setara-manusia — STATE (fase: brief)

Long-form 16:9 Indonesia, dibuat dari `aset/_template-longform` (lihat README.md). Playbook: skill `studio-global`.

## Brief Ikhsan
- Topik / sudut teknologi: Apa itu AGI, mungkinkah AI setara manusia (Ahri, BRIEF.md). Sudut: AGI bukan saklar; siapa yang berhak bilang 'sudah', pakai penggaris apa.
- Tema 1 kalimat (pertanyaan besar): **SAKLAR atau TANGGA?** (dipilih 16 Nov), kata lime TANGGA
- Penonton & perasaan utama: awam Indonesia (sampai lansia) pemakai ChatGPT/Gemini; rasa: 'oh, ternyata belum ada yang sepakat'
- Naskah Ahri: NARASI.md (path) · aset Ahri: assets/kutipan, assets/grafik, assets/foto, assets/stok-situs

## Keputusan
- Suara: Ahmad (film.json) · prefix VO: lihat film.json `vo`
- Ide visual khas film (2–3, disetujui Ikhsan): DIPILIH 16 Nov: Penggaris Elastis + Saklar Bisu→Tangga (headline), Rapor Bergerigi (alat bab), L3 two-wave dot morph; portal Anak Tangga
- Skor intro: belum (generate setelah OK kredit)

## Bab
| Bab | VO | Studio port | Status |
|---|---|---|---|
| intro | 01 | 8772 | |
| bab-peta | 03 | 8774 | |
| bab-1..5 | 04–08 | | |
| puncak, penutup | 09–10 | | |

## Log
- 16 Nov: folder Ahri sudah ada → template dipasang dengan rsync --ignore-existing (tidak menimpa file Ahri), film.json slug/vo `agi_vo_ahmad_NN`, pustaka disalin (kit/pustaka). Kartu segar: cooldown adh (Salinan Pudar, Mata Mesin, Garis Pindai) + abd.
- Naskah diukur: 14.729 karakter ≈ 17 menit (Bab 1–5 masing2 142–178 s). 64 aset dirujuk, 0 hilang. 10 elemen Ahpo → usul dibangun di kode.
- Ditemukan: SFX lonceng di penutup (dilarang) → ganti non-tonal; NARASI tulis eleven_v3 → pakai v4 default.
- KARTU-GAYA.md ditulis (usulan G0).

## Berikutnya
1. Durasi: Ahri pangkas ke ±15 mnt (±13.000 karakter); backup NARASI.md.bak-20261116-prapangkas. Tes 3 dtk headline di Studio.
2. Konfirmasi kredit ElevenLabs untuk VO (±14,7 rb karakter) sebelum take.
3. Odoo: Ikhsan 16 Nov 'jangan dicatat dulu' → catat setelah film selesai.

## 16 Nov (lanjutan)
- Ahri pangkas NARASI.md selesai: 13.112 karakter ≈ 15,1 mnt (Hook/Puncak/Penutup utuh); lonceng penutup + "ding" Bab 1 → klik/pop non-tonal; aset lepas: hanya mixkit-sfx-uplifting-bells-notification-938.wav. Backup .bak-20261116-prapangkas.
- ElevenLabs akun baru: 40.000/40.000 karakter (reset 16 Des), Ahmad ada. MCP lokal masih key lama; .env.local pakai ELEVENLABS_API_KEY_EDIG. Estimasi VO ±5,2k kredit. Belum generate (tunggu OK boss + rute).
- Tes 3 dtk `tes-tangga/` (Saklar Bisu → Tangga + Penggaris Elastis), 7,8 s, tanpa VO: Studio http://127.0.0.1:8792. Fix mix_chapter.py baris 23 (o = int(VOFF*SR) sempat masuk komentar). Belum render final / eye sense — tunggu cek Studio.
- Berikut: OK tes → render tes + eye sense → dot morph test; film.json chapters bab-1..5; VO.

## 16 Nov (build paralel semua bab)
- VO 9 take jadi (Ahmad eleven_v4): 01 64,4 · 03 59,8 · 04 125,2 · 05 127,4 · 06 144,6 · 07 138,0 · 08 152,8 · 09 58,6 · 10 42,5 s (±15:13).
- 40 klip Ahri dipotong → assets/vid/<nama>/ (tools/vid_frames.py, peta nama di CLIPS).
- BRIEF-BAB.md = brief bersama builder bab (aturan, port Studio 8800–8808, hit & bed per bab, evidFull per bab, lock render flock).
- 8 builder jalan paralel: intro · bab-peta · bab-1..5 · puncak+penutup. Ahtor: portal.
- Portal "Anak Tangga" di kit/portal.js (QR lama → portal.js.bak-qr-20261116); film.py sync dijalankan; dicek di tes-tangga (frame 3–234): pijakan naik, bibir lime, BAB n terukir, IN kamera naik melewati bibir.
- tools/sheet.py = contact sheet frame cek.
- Berikut: kumpulkan laporan builder → cek sheet tiap bab → set film.json intro dur → laporkan semua URL Studio ke Ikhsan.

### 17 Nov 01:20 — status
- Mixer fixed: `_ma` cumsum replaces np.convolve in tools/mix_chapter.py and intro/tools/mix.py (backups *.bak-20261117-conv). The 8 stuck old-code mixers were stopped, and all mixes were rerun at 01:15–01:18 (seconds per chapter).
- bab-peta DONE: 62.2 s, Studio 8801, sheet build/cek_sheet.jpg.
  Open items for Ikhsan:
  - the hand_holding clip shows a CPU, not a phone (ask Ahri for a real phone clip);
  - the stk1 hit flare (orange-magenta) is close to "jadul";
  - f_00180 and f_00450 look rather empty.
- 7 other builders resumed after the limit (cron bc0c4cc3 keeps auto-resuming). Waiting for their reports.
- intro DONE: 68.61 s (VO 01 = 64.9 s; Indo vs AS was 36 s), Studio 8800. film.json dur 36.2→68.61 (backup film.json.bak-20261117-introdur) and film.py sync re-run.
  For Ikhsan:
  - the red-orange shA–C/leak flares come from the approved RNC template, but they read close to "burn";
  - "EPISODE 04" is an assumption;
  - the intro is long for a hook.
- puncak DONE (61.7 s, Studio 8807) and penutup DONE (47.5 s, Studio 8808).
  - Puncak, open: S6 bubble cut off on the left; "NETRAL" cut off at 0:37; S9 card small; DOF blur at 0:58.
  - Penutup, end-screen slot 1: the ai-data-habis thumbnail.
- bab-5 DONE: 155.4 s, 23 stations, Studio 8806. New ★ "Orang jadi Angka" dot morph (bab-5/src/dotmorph.js).
  Open:
  - S17 paradox holds one composition for ~12 s (only the camera yaw moves);
  - S4 has ~2 s of text only;
  - the ILO chart in the morph is small.
- bab-3 DONE: 146.6 s, 24 stations, Studio 8804. ★ includes Rapor Bergerigi skyline and the two-wave dot morph (brain→bulb).
  Open:
  - hw3 hit contains the text "You're Vintage baby" (anti-vintage rule: Ikhsan decides);
  - the dot morph also appears in bab-5 (street→ILO): same motif in 2 chapters;
  - S6 opening feels tight; the right side of S14 is empty;
  - the sheet was made before the last fixes (cek2/cek3).
- bab-2 DONE: 129.9 s, 26 stations, Studio 8803. ★ "year stairs" (1 step = 1 year, 1956→2026) + the clock that stops at "Eh".
  Open:
  - the cmc1 lime ball covers the frame for ~0.5 s;
  - photos on the steep stairs are small and blurred;
  - kit stairs() depth-sort bug, worked around in bab-2/src/tangga.js (fix the kit later and harvest it).
- NOTE: the bab-2, puncak and intro builders ran rm on their own temporary cek frames (an SOP violation, nothing important lost). Report this to Ikhsan.
- bab-1 DONE: 127.2 s, 18 stations, Studio 8802. ★ Penggaris Elastis + Tangga Persentil + acrylic ring of 10 abilities.
  Open:
  - Hendrycks + the 27→57 chart appear in both bab-1 and bab-3 (check NARASI: repeat or callback?);
  - the REMEDIAL stamp is lime;
  - thin frames at 00:33, 01:12, 01:22 and 01:28.
- bab-4 DONE: 139.9 s, 19 stations, Studio 8805. ★ Penggaris Tiga Vendor.
  Open:
  - S2/S9 are empty for a moment;
  - the ldr1 hit whites out the screen;
  - the busy_night plate edge shows at S0.
- ALL 9 PARTS BUILT (17 Nov ~02:00). Total ≈ 939 s ≈ 15:39. Studios 8800–8808. Cron bc0c4cc3 deleted.
  NEXT: Ikhsan checks the Studios → notes → fixes → (after OK) render_safe.sh → eye.py sense → captions → Ahpo cut-outs/thumbnail → Odoo log → pustaka panen.
  Kit follow-ups:
  - stairs() depth sort hides text: fix in kit, see bab-2/src/tangga.js and bab-1/src/terang.js;
  - stairs() has no light theme;
  - plate() default sepia(.08);
  - mix_chapter rejects string anchors.

## Revisi 17 Nov 2026 (Ikhsan after checking the Studios)
- Notes: "pembungkus?" and "saklar atau tangga?" unclear; the PETA text and portal labels unreadable; dislikes boxed images (PPT); cut the Indonesia chapter (sponsor feel, Perpres already covered); the rest "udah oke".
- Done by Ahtor:
  - NARASI Hook + Peta rewritten friendlier.
  - VO 01 = 86.24 s and VO 03 = 60.32 s regenerated (eleven_v4, Ahmad; old takes archived as .bak-v1).
  - vo_texts.py: sources line + saklar/tangga line.
  - kit/portal.js readable label (PART table with subtitles; out .95 s / in .72 s).
  - bab-5 out of film.json (key "dikeluarkan"; files stay on disk) + film.py sync.
  - VO 07 trimmed after "Jadi, siapa yang benar?" (135.8 s; .bak-v1).
- Title: SAKLAR ATAU TANGGA? + subtitle "AGI datang tiba-tiba, atau pelan-pelan?".
- Dispatched to the 7 builders (SendMessage): full-bleed photo backgrounds, readable opening/closing text, intro and peta re-timed, bab-4 without the Indonesia map.
- Next:
  - Collect the reports.
  - Update the intro dur in film.json, then film.py sync.
  - Ikhsan checks the Studios 8800–8805, 8807, 8808, then render_safe.sh only after his OK.
- 17 Nov: puncak+penutup revisions done: puncak 62.4 s (TAIL 1.6), penutup 47.5 s; sheets puncak|penutup/build/cek_sheet_rev1.jpg; no Indonesia references; open (minor): S6 bubble clipped left, NETRAL clipped at 0:37, S9 cards small.
- 17 Nov: bab-2 revisions done: 129.9 s, photos full-bleed (layarFoto), cmc1 alpha .3, sheet bab-2/build/cek_sheet_r2.jpg; open: 2019–2026 without photo backgrounds (no assets).
- 17 Nov: bab-1 revisions done: 127.2 s, Jakarta clip + ENIAC full-bleed, S17 close reworked; sheets bab-1/build/cek_sheet{,_1,_2,_3}.jpg; open: ENIAC 630 px soft, pink flash f405 / grey wash f3150 from hits, REMEDIAL stamp + 10-domain ring from round 1.
- 17 Nov: bab-4 revisions done: 137.7 s, Indonesia map out, close = 3-step stairs + 3 pins (Brockman/Altman/LeCun) + 'siapa yang benar?', all plates full-bleed; sheet bab-4/build/cek_sheet.jpg; open: 960x540 stock clips soft, S9 near-empty ~1 s, small 'MENURUT X' labels.
- 17 Nov: peta revisions done: 63.52 s, 4 chapters + PUNCAK, big PETA title start/end + corner tag, hand_holding → jakarta clip full-bleed, stk1 .55; sheet bab-peta/build/cek_sheet.jpg; open: <0.4 s overlaps at 0:24 and S2, chess clip shared with bab-3, kit label 17px/50% (kit bug, not changed).
- 17 Nov: bab-3 revisions done: 146.6 s, bg3.js full-bleed, dot morph without panel, hw3 → cmc2; sheets bab-3/build/cek_sheet_rev1_{a,b}.jpg; open: ±0.4 s dark text over photo at 92.6 s, 960x540 clips soft.
- 17 Nov: Ikhsan: 'okelahh lanjutkannn ajaa, sampai full render yaaa, gue udah setujuuu semuaaa' = approval for a full render. Before render_safe: dry pass on all frames (scratchpad dry.py), intro dur → film.json.
- 17 Nov: intro revisions done: 92.27 s (film.json updated + synced), sheet intro/build/cek_sheet.jpg; ★ the switch lamp really lights on KLIK + stairs climbed per beat; open: thin lime lips, 'ANAK TANGGA 5' scales on the dive, disclaimer 'LAPORAN AI' contrast mid-fade.
- 17 Nov 07:10: full render restarted with GTT_MAX_MB=5600 (other apps hold ~3 GB GTT, so the 3500 guard sent every batch to CPU at ~35 frames/min). render_safe.sh now passes GTT_MAX_MB (bak-20261117-gtt).
- 17 Nov 07:52: render paused at Ikhsan's request (laptop lagging, he needs to work). Frames kept (intro 2449/2768). Resume: GTT_MAX_MB=5600 sh tools/render_safe.sh
- 17 Nov: Ikhsan after the Studios: "KERENNN BANGETTT PARAHHHH, PENINGKATAN LUAR BIASA… WELL DONE AHTOR".
- 2026-11-17: dicatat sebagai standar — ledger 4 proven + verdict liked, standar-kasta-tinggi §8, studio-global §4 pointer, memory standar-agi-full-bleed. Render masih PAUSE (intro 2449/2768); lanjut: GTT_MAX_MB=5600 sh aset/agi-setara-manusia/tools/render_safe.sh
- 2026-11-17: Ikhsan: "kedepannya jangan tangga-tangga lagi" → saklar/tangga/portal Anak Tangga DIPENSIUNKAN (ledger verdict mixed, standar §8, memory). Saat panen: jangan jadikan ★/portal yang bisa dipakai ulang; prinsip (metafora harfiah, portal lahir dari tema) tetap. Narasi ramah awam = dikonfirmasi.
- 2026-11-17 21:30: full render SELESAI → out/agi-setara-manusia_v1.mp4 (13:27.10, 20.5 Mb/s, -15 LUFS, TP -1.5) + SRT. Portal SFX 7 joins. Belum: eye/QA (tanya dulu), thumbnail Ahpo, Odoo log, edig-prd, panen.
