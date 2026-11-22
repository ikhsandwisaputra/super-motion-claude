# teknologi-indo-vs-as — STATE (2026-11-13, phase: VO done, intro draft in Studio 8772, waiting Ikhsan's check + Ahpo)

Long-form 16:9 ±11 min, Indonesian, channel "Relentless non-conformist". Script + research from Ahri:
`NARASI.md`, `BRIEF.md`, `KREDIT-KONTEN.md`, PDFs in `/home/ikhsands/Proyek/asisten-agi-claude/laporan/2026-11-13-indo-vs-as-*.pdf`.
Assets from Ahri in `assets/{grafik,kutipan,cc,stok-situs}`; 14 custom elements still to be made by Ahpo (BRIEF.md list).

## Ikhsan's brief (Telegram 2026-11-13)
- Build this video from Ahri's research; work with Ahpo on the assets (hand-offs via Ikhsan / minta-bantuan-tim).
- Intro = RNC pengantar **v2 "Satu Baris"** (`aset/intro-rnc`, not the `out/` v1 Gate), updated to this theme.
- His ideas: zoom-back depth row + blur→sharp sweeps. He asked Ahtor for more visual ideas.
- Narrator: **Ahmad** (ElevenLabs `d888tBvGmQT2u05J1xTv`, "Professional, Clear and Engaging"). SFX: generate freely.

## Measured
- VO text ≈ 10 889 chars (+ ≈ 450 pengantar). ElevenLabs starter: 15 913 / 40 000 used → ≈ 24 k left = one full take + small retakes.

## Proposed (sent to Ikhsan, waiting)
- Ideas on top of his zoom-row: (1) Jarak = Kedalaman (ratios as Z depth along the row, e.g. 1 vs 140 patent cards),
  (2) QR portal between chapters (dive through QR modules), (3) Skor Kebalik camera roll 180° once at the Puncak.
- Pengantar themed = Ahri's Hook + Janji in RNC form (draft lines in the Telegram reply); then Peta.
- Questions: ideas OK? intro order? VO spend OK? Odoo project?

## Next
1. Ikhsan's answers → formula rasa + styleframes + 3-s motion test in Studio.
2. Ahpo request (custom elements as layered PNGs ≥ 1400 px, BG/MG/FG) via minta-bantuan-tim.
3. VO Ahmad (after OK) → align → per-chapter build.

## Update 2026-11-13 (Ikhsan: "Yaa okee udah setuju" = ideas, merged intro, VO all approved)
- VO Ahmad eleven_v3 per section: `audio/voiceover/ivs_vo_ahmad_{01,03..08}.mp3` + `.align.json` (01 = new pengantar,
  02 dropped: Hook+Janji folded into 01; Ahri's originals kept in `vo/_hook_asli_ahri.txt`, `vo/_janji_asli_ahri.txt`).
  Durations 34.0 / 39.5 / 180.4 / 174.6 / 129.4 / 110.3 / 43.4 s = 711.6 s speech (≈ 12 min with gaps). Not yet transcribed for QA (only 01).
  Quota after: ≈ 13 k chars left.
- Intro engine = copy of intro-rnc v2 in `intro/` (paths fixed to parents[2]); EP texts + `tools/place.py` anchors re-pointed;
  bulb glow off (`glow` flag), title page `leadAbove` layout. Hook images are PLACEHOLDERS: doc1 = Bisnis.com, doc2 = Jakarta Post,
  qr = frame of pexels contactless 6602062. Mix = procedural SFX from tools/mix.py (−13.8 VO RMS, SFX peak −4.5).
  Check stills looked at: `intro/build/chk1_sheet.jpg`, `chk2_sheet.jpg`, `chk3_sheet.jpg`. Dur 36.2 s.
- Studio: `setsid nohup .venv/bin/python -I tools/studio/studio.py aset/teknologi-indo-vs-as/intro --port 8772` → http://127.0.0.1:8772
- Ahpo request f766ea6cb4 (PESAN-AHPO.md, P1 = A01–A04) posted, waiting for Ikhsan's button.
## Next
1. Ikhsan checks intro in Studio → notes/OK (no render before OK).
2. 3-s motion test "Jarak = Kedalaman" (1 vs 140 patent cards) for Peta/Bab 1.
3. Transcribe VO 03–08 for QA; per-chapter build (`### Bab N`).

## Update 2026-11-13 — 3-s test "Jarak = Kedalaman" ready in Studio 8773
- `tes-jarak/` (engine copy): `src/film.js` 8.4 s on VO 04 24.0→32.4 s ("seribu sembilan ratus … dua ratus tujuh puluh ribu").
  Beats: ID ivory card enters blur→sharp + "1.931" falls · snap whip to US lane (grey card, row riffles in, counter 001)
  · step beside the row + fly all 140 cards (counter → 140, depth fog + rim per card) · brake zoom-back to pose
  yaw −22 / pitch 7 (searched with scratch pose.py): lone ID card fg-left, US row to the horizon right; "270.295" + lime "±140×"; source line.
- Mix `tes-jarak/tools/mix.py` → build/mix.wav: VO slice + procedural non-tonal SFX (card flicks per passing card, whip, suck-back, brake). VO RMS −18, SFX peak −10.5. Not heard.
- Stills looked at: `tes-jarak/build/chk2..5_sheet.jpg`.
- Studio: `setsid nohup .venv/bin/python -I tools/studio/studio.py aset/teknologi-indo-vs-as/tes-jarak --port 8773`.
## Next
1. Ikhsan checks intro (8772) + tes-jarak (8773) → notes/OK. 2. Ahpo f766ea6cb4 result. 3. Transcribe VO 03–08, per-chapter build.

## 2026-11-14 · Bab Peta built (Studio 8774)
- `bab-peta/src/film.js`: one depth row, 3 stations (z 0 / 2600 / 5200), camera snaps between them passing on the left.
  A = code-built balance PEMAKAI (lime) vs PENCIPTA, phone drops onto PEMAKAI pan, dashed ghosts RESEP/PABRIK/PATEN under PENCIPTA.
  B = split-flap scoreboard (rows 01–03 + row 04 "SATU BIDANG" flips 180° → lime "¿¿" tiles, camera roll impulse).
  C = quote "Indonesia tertinggal sekian puluh tahun." + lens sweep + "METODE HITUNG: TIDAK DITEMUKAN" + strike → "HANYA ANGKA TERUKUR DARI SUMBER RESMI." (lime on TERUKUR).
- `bab-peta/tools/mix.py` → build/mix.wav (VO 03 offset 0.3 s; VO −18 dB RMS, SFX −36 dB RMS, peak −2.9 dB; all SFX non-tonal).
- Checked by stills only (build/chk1..3_sheet.jpg); not watched in real time, not heard.
- Ahpo job f766ea6cb4 was stopped by the bot (>30 min) → chapter objects built in code.
- Next: Ikhsan checks 8772 (intro) · 8773 (tes-jarak) · 8774 (Peta) → then Bab 1. No render before his OK. Odoo project still to be named.

## 2026-11-14 · Intro revisi: _transisi menonjol + foto dokumenter (Studio 8772)
- Ikhsan: "i love it" for Peta. Style = Vox + documentary + motion; no PPT (aset/video-ikhsan-channel). Assets short → ask Ahri.
- `intro/tools/tx_extract.py` → `intro/assets/tx/<hit>/` (8 hits, 30 fps, 1280×720, tx.json with peak). Earlier cuts kept in `assets/tx/_old/`.
- `intro/src/film.js` (backup `film_v2_pre_tx.js`): HITS in post(), screen blend, full colour, peaks on lock1/lock2/lock3 (shutter cine-markers), cut1 + stepT (film burn), back + end (warm/red leak), cut3 (white-blue leak).
  Hook photo `qr` = documentary: grade, gate weave 12 fps, grain, halation, gate vignette, h 540; docs get light grain.
- `intro/tools/mix.py` (backup `mix_v2_pre_tx.py`): the built-in sound of each hit at the same times, peak-normalised; mix peak −0.5 dBFS.
- LICENCE: camera-shutter = paid product (reference only); other three doubtful/reupload → draft only, swap before monetised upload (Ikhsan's call).
- Next: Ikhsan checks 8772 → then Bab 1 in the Vox/doc style.

## 2026-11-14 · Transisi di seluruh video + musik (Ikhsan: lisensi aman, TMP diutamakan, jangan spam/jadul, musik generate)
- **Shared hit library** `tx/` (built by `tools/tx_lib.py [name…]`): `tx.json` + `<name>/f_###.jpg` + `<name>.wav` (hit's own sound) + `txlib.js`
  (`loadTx(base, names)`, `drawTx`, `react` = hit-reactive exposure/scale). Hits: stk1–4 (light streaks), cmc1–2 (comic, keyed to lime only),
  ldr1 (film leader, grayscale), shD/shE (shutter). Old cuts in `tx/_old/`. A chapter links it: `assets/txlib -> ../../tx`, `src/txlib.js -> ../../tx/txlib.js`.
  Not used (too jadul / readable English text): grunge, handwriting, film-burn packs. Greenscreen laptop (café) + CRT TV: seen, not used yet.
- **bab-peta**: HITS = stk1 @ bedah+.17 (A→B whip), cmc1 @ catatan+.07 (B→C whip); mix plays their wavs (−6 dB), travel whooshes −19.
  Score `audio/music/ivs_score_peta.mp3` (41.5 s, conditioned on intro) at +0.49 s, ducked. Backups `film_v1_pre_tx.js`, `mix_v1_pre_tx.py`. Stills `build/chk4_sheet.jpg`, `chk5_sheet.jpg`.
- **intro**: burn1 → stk3 (cut1), burn2 → stk4 (stepT); loads only used hits. Score `audio/music/ivs_score_intro.mp3` (37.3 s) at +0.30 s
  (hit = "batu" 9.85, drop = zoom-back 19.48, grid on cut3 + stepT, hard stop 34.3). Backups `film_v3_pre_txlib.js`, `mix_v3_pre_txlib.py`. Stills `build/chk_tx2_sheet.jpg`.
  Known: stk3 over the lime plane is faint (screen blend on a bright field).
- ElevenLabs: 2 music generations (song ids znIe87YUh6IKgLUI4vLQ intro, YwiWenRaC5oIF16QPa9G peta); character counter stayed 20 244 / 40 000.
- Ledger: 9 techniques added (5 proven by his words). Memory `style-vox-documentary` updated.
- Studios restarted: intro 8772, bab-peta 8774 (8773 tes-jarak not running).
- Next: Ikhsan listens (music + hit sound are unheard by me) → then Bab 1 (vo 04) with hits from the library, Ahri's kutipan/grafik/cc/stok-situs with documentary treatment, greenscreen laptop as a screen for UI/article; one score per chapter conditioned on the intro. Odoo project still unanswered.

## 2026-11-14 · Musik bab tenang + Bab 1 built (Studio 8775)
- Ikhsan: driving score = intro only ("kayak mau balapan" in chapters) → chapters get a calm stock bed `assets/stok-situs/mixkit-musik-voxscape-571.mp3`
  set by RMS (−30 before duck), ducked 0.55 under VO, gap of silence before punchlines. Peta's bed should follow the same rule.
- **Chapter kit** `kit/kit.js` + `kit/draw.js` (stations row, ghost tags, plate/evid/slab/fall/markLine, line-art props, coins, dot city, stamp).
  New chapter: `sh tools/new_chapter.sh <dir>`; data in `<dir>/src/beats.js` (strict JSON: V word times, HITS, BED, SFX) → `tools/mix_chapter.py <dir>` → `<dir>/build/mix.wav`.
  Word times: `.venv/bin/python -I aset/teknologi-indo-vs-as/tools/words.py 04 [t0 t1]` (workspace root).
- **bab-1** `src/film.js`: 17 stations; S3 = "Jarak = Kedalaman" (1 ivory card vs 140 grey, camera flies the row), later stations sit past the row's end.
  Hits: stk2 @tahun, cmc2 @ikuti, shE @lalu, stk4 @pemerintah, stk1 @hasil. Mix: 181.6 s, music RMS −35.9, VO −17.3, SFX −38.9, peak −2.7 dB.
  Checked as stills only (`bab-1/build/chk1_a.jpg`, `chk1_b.jpg`, `chk2.jpg`); fixes: S3 reveal holds until "selama", note slice clear of numbers, dim plates behind the dot city, GII card inside the frame.
- Honesty: Rp10.000 note is stylised (not a banknote replica); 4,5 h scale = 140 US ticks; split-flap shows random digits then #17 only; 21.371 = own calculation, labelled.
- Next: Bab 2 (VO 05), Bab 3 (06), Puncak (07, Skor Kebalik 180° flip), Penutup (08) the same way; Portal QR between chapters; captions from .transkrip.srt. No MP4 before Ikhsan's Studio OK. Odoo project still unanswered.
- 2026-11-14: Ikhsan on Bab 1 report: "jossss ilove it well done" (from the stills + report; Studio 8775 viewing pending).

## 2026-11-14 · Bab 2, Bab 3, Puncak, Penutup built (Studios 8776–8779)
- All five kit chapters exist, each with `src/film.js` and `src/beats.js` (built by forks with the same kit and rules).
  - **bab-2** (VO 05): 175.8 s, 20 stations. Hits stk1, cmc1, stk3, shD, ldr1. Sheets `bab-2/build/chk1_*_s.jpg`, `chk2_s.jpg`.
    Doubts: some stations look sparse in their first ~1.5 s; coins read as cylinders; the 5.427-dot field reads as a grey block; the `nirsentuh` clip is unused; "<1/10" is derived.
  - **bab-3** (VO 06): sheets `bab-3/build/chk1_a_s.jpg`, `chk1_b_s.jpg`, `chk2.jpg`. Numbers checked against NARASI: 119/+16 %, 85 vs 340.2, PISA 364/463, Level 2 17/65, IMD #48 (from #40) vs #10.
  - **puncak** (VO 07): Skor Kebalik split-flap board flipped to PEMBAYARAN DIGITAL. Then 595 vs MY 261 + TH 215 = 476 (+119), QRIS stickers collapsing into one code, warung, USTR evidence, GPN route, trade agreement 2026, ×140 vs QRIS/GPN, "ATURAN MAIN.", "KITA PERNAH MENCIPTA", "TEPUK DADA.". Sheets `puncak/build/chk1_a_s.jpg`, `chk1_b_s.jpg`, `chk2_s.jpg`.
  - **penutup** (VO 08): 48.7 s. Hits shD, stk1, ldr1. Doubts: the shD flash is red-orange (off-palette); the bakso cart is drawn in code (no photo); the blurred cards read like smoke; end-screen slot positions still need matching.
- The machine rebooted ~03:13 and the bab-3/puncak mixes were relaunched; Studios restarted on 8772 intro, 8774 peta, 8775 bab-1, 8776 bab-2, 8777 bab-3, 8778 puncak, 8779 penutup.
- Captions: `tools/captions.py [--gap s]` builds SRT from the script text + ElevenLabs word timing → `<dir>/build/captions.srt` and `build/captions_full.srt`. Re-run after the portal gap is known.
- Next: Ikhsan views the Studios → Portal QR transitions between chapters → assembly (intro → peta → bab-1 → bab-2 → bab-3 → puncak → penutup) → captions. No MP4 before Ikhsan's Studio OK.

## 2026-11-14 04:16 · Ikhsan OK on all chapters → subscribe + full-frame articles → FULL RENDER running
- Ikhsan: "udah okee semuaa … di akhir kasih elemen klik subscribe … beberapa artikel dibikin full layar dengan perspektive miring sambil ada stabilonya, abis itu full render".
- **Full-frame articles:** kit `evidFull` (kit/kit.js), drawn in post through `makeChapter({ full })`. The page sits on a rotateY plane built from column strips, with shade on the far side; a ragged lime highlighter sweeps the phrase on its word; the world drops back to 90 % dark.
  - 6 pages: bab-1 CNBC (nol) + Merdeka (Rp8 → Rp12); bab-2 Medcom (rumah2); bab-3 Kompas (seratus) + Jakarta Globe (48th); puncak Jakarta Post (QRIS trade barrier).
  - Each gets SFX whoosh in, strike on the highlighter, swish out. Check stills `<ch>/build/chkF/`.
- **Subscribe** (penutup `subscribe()`): an ivory pill SUBSCRIBE; a cursor glides in and clicks it → lime SUBSCRIBED ✓ + ripple; then it clicks the bell, which swings silently. It replaces the dashed ring. SFX pop/click (no ting). Stills `penutup/build/chkS/`.
- Backups of film.js/beats.js before these edits: scratchpad `bak/` (session tmp). Portal QR between chapters NOT built (hard cuts between chapters).
- **Render:** `tools/render_full.py`, resumable; log `build/render_full.log`, progress `build/render_full.status`. Started under `systemd-inhibit` (no sleep). Re-run after a crash/reboot (workspace root):
  `setsid nohup systemd-inhibit --what=sleep:idle:handle-lid-switch nice -n 5 .venv/bin/python -I aset/teknologi-indo-vs-as/tools/render_full.py > aset/teknologi-indo-vs-as/build/render_full.log 2>&1 &`
  - Output: `out/indo-vs-as_v1.mp4` (−14 LUFS, AAC 320k) + `build/captions_full.srt`.
  - Dry run TESTN=60 passed (`out/_test.mp4`, 14 s).

## 04:26 · Portal QR between chapters (Ikhsan: "yaaaa gue tidur" = build it now)
- `kit/portal.js` (symlinked as `src/portal.js` in all 7 chapters), wired in each `src/index.html` after `scene.load()`:
  `if (q.get('portal') !== '0') addPortal(scene, { inn, out, seed })` (intro out only, penutup in only; seed = chapter 1–7, so the
  code you dive into at the end of chapter N is the code you come out of in N+1). `?portal=0` turns it off.
  - OUT, last .62 s: the world dims 62 %, a 25×25 QR (3 finders, ivory on ink, lime 3×3 centre) pops in, the camera dives ×95
    into the lime module, solid lime on the last 3 frames.
  - IN, first .5 s: lime with the next code rushing past, a square door grows ×110 from the centre with an ivory rim.
- Sound: `tools/portal_sfx.py` lays a 1.4 s stem at every join on the concatenated audio before loudnorm (pop J−.6, dark rise into
  the dive, sub-thud on the cut, wide travel whoosh out). Noise/sub only, no tones. Window RMS ≈ −27.7 vs VO ≈ −18.
  `render_full.py` now writes `build/full_ap.wav` (with portal) and muxes that.
- Checked: stills of the intro→peta join (scratchpad sheet), the SFX level. Not watched in real time, not heard.
- Running detached: `tools/portal_finish.py` (log `build/portal_finish.log`, progress lines `[portal]` in `build/render_full.status`)
  waits for the first full render, renames its master to `out/indo-vs-as_v1_tanpa-portal.mp4`, re-renders the 36 join frames per
  chapter, then re-runs `render_full.py` → `out/indo-vs-as_v1.mp4` with portals. Restart command is in its docstring.

## 04:51 · Render ke-kill OOM → dijalankan ulang sebagai service terpisah
- 04:00 & 04:46: systemd-oomd membunuh seluruh scope VS Code (RAM+swap > 90 %), render ikut mati karena berjalan di cgroup VS Code
  (`setsid nohup` tidak memindah cgroup). Frame aman: intro, peta, bab-1 lengkap; bab-2 2089/5273; bab-3/puncak/penutup baru 60.
- `tools/render_full.py`: `BATCH`/`WORKERS` bisa diatur via env (default tetap 450/3). Backup `tools/render_full.py.bak-0451`.
- `tools/render_safe.sh`: jalankan render_full (≤5 percobaan) → portal_finish sebagai unit `render-ivs` (systemd --user), BATCH=150,
  WORKERS=2, MemoryMax 9G, swap 3G, OOMPolicy=continue, Restart=on-failure, inhibit sleep. Restart: `sh tools/render_safe.sh`.
  Status: `systemctl --user status render-ivs`; stop: `systemctl --user stop render-ivs` (frame tetap, start lagi = lanjut).
- 05:15 Akar masalah: bab-2 stasiun "5.427 pusat data" menggambar 5.427 `fillRect` terpisah; saat transisi rise, `onPlane` (kit.js:43)
  memasang `ctx.filter = blur()` → blur dijalankan per rect × K=8 → GPU ~7 GB GTT / CPU >10 menit per frame. Fix: titik digambar
  sebagai satu path (`bab-2/src/film.js`, backup `src/film_v_pre_dotpath.js`). Frame 2089 lama vs baru SSIM 0,988; 3 frame berat 5,8 s, GTT 599 MB.
  render_full.py: watchdog GTT (>3,5 GB → kill termasuk Chrome Playwright yang setsid → 30 frame berikut via CPU `--disable-gpu`).
  Pelajaran: jangan menggambar ribuan primitive terpisah di dalam `onPlane` (filter blur per draw call) — satukan dalam satu path.

## 08:03 · FULL RENDER SELESAI (dengan Portal QR)
- `out/indo-vs-as_v1.mp4` — 12:07,67 · 1920×1080 · 30 fps · H.264 High ~15,9 Mb/s · AAC 48 kHz stereo 320k · 1,48 GB.
  Decode penuh tanpa error; −14,0 LUFS, peak −1,5 dBFS, LRA 2,7. Durasi × 30 = 21.830 frame = jumlah frame semua bab.
- Cadangan tanpa portal: `out/indo-vs-as_v1_tanpa-portal.mp4`. Caption: `build/captions_full.srt`.
- Dicek: stills sambungan peta→bab-1 (`build/_verify/portal_join.jpg`). Belum ditonton real-time / belum didengar.
- Selama render: 7 spike GPU di bab-2, beberapa di bab-3/puncak (transisi dengan blur DOF di atas banyak draw call) → otomatis via CPU.
  Kandidat optimasi engine (perlu OK Ikhsan, mengubah tampilan sedikit): onPlane menggambar ke offscreen lalu blur sekali.
- Scratch uji: `bab-2/build/_memtest/` (boleh diarsip).
- Next: Ikhsan menonton & mendengar master → QA motion-eye → upload PRIVATE (Ahyu).
