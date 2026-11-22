# Resep "Teknologi Indonesia vs AS" (2026-11-14) — the reference long-form

Master `aset/teknologi-indo-vs-as/out/indo-vs-as_v1.mp4` (12:07.67, 1920×1080 30 fps, −14 LUFS), captions
`build/captions_full.srt` (224 cues). Ikhsan: "okeemantab … kesuksesan terbesar kita". Full history in its `STATE.md`.
Learn the structure and the decisions; a new film keeps the grammar and invents its own theme, devices and stations.

## Why it worked (his words → the rule)
| His words | Rule now in the template |
|---|---|
| "i love it well done" (RNC v2 depth row) | Hook = one depth row, zoom-back, blur → sharp sweeps, lime door |
| "jadul, generik" (v1 film gate) | no burn / projector / sepia / paper |
| "i love it" (Peta) | the theme device (balance) + split-flap + the method rule, all on one camera row |
| Vox + documentary, "jangan PPT" | stations on a depth row, documentary grade on photos, evidence held ≥ 2 s |
| "kayak mau balapan" (score in the chapters) | driving score only in the intro; calm stock bed in the chapters |
| _transisi: TMP first, no spam, not jadul | `tx/` hit library, 4–5 per chapter on whip joins, each hit with its own sound |
| "jossss ilove it well done" (Bab 1) | Jarak = Kedalaman as the chapter's spatial hero |
| "artikel full layar … perspektif miring … stabilo" | `evidFull`: 6 pages across the film |
| "elemen klik subscribe" | cursor → SUBSCRIBED ✓ lime + ripple → bell swings (silent) |
| "transisi antar bab … mulus kan?" | Portal QR at every chapter join, with its own sound |

## Chapters (station tags in order; via = the camera move into the station)
- **Intro** 36.2 s (VO 01): EP hook = Dokumen resmi AMERIKA · Daftar yang MENGGANJAL · STIKER QR di gerobak bakso →
  twist "Padahal paten kita… 140×" → Kok BISA? / Siapa yang MENCIPTA? / Siapa yang CUMA MEMAKAI? → sources
  (WIPO, Bank Dunia, OECD, Bank Indonesia) → "Indonesia vs Amerika. PEMAKAI ATAU PENCIPTA?". Score `ivs_score_intro.mp3` +0.30 s.
- **Bab Peta** 40.7 s (VO 03): 3 stations. A balance (phone drops on PEMAKAI; ghosts RESEP/PABRIK/PATEN) ·
  split-flap rows 01–03 + row 04 flips to lime "¿¿" · quote "tertinggal sekian puluh tahun" → METODE HITUNG: TIDAK
  DITEMUKAN, struck → HANYA ANGKA TERUKUR (lime TERUKUR).
- **Bab 1** 181.6 s (VO 04), patents and research: LAB · HAK · 11:00 · **1.931 vs 270.295 (Jarak = Kedalaman, 140 cards)** ·
  Rp10.000 · ×4 · 1 JUTA · Rp12 T · ÷ · #55 · JALAN. Hits stk2, cmc2, shE, stk4, stk1. Full-frame: CNBC (nol),
  Merdeka (Rp8 → Rp12).
- **Bab 2** 175.8 s (VO 05), hardware/digital: KUIS · HP · RUMAH · 1 GB · LUCU · GUDANG · 5.427 · AI · $285,9 · 23× · 59 ·
  CHIP · CHIPS · 70 M · KENOP · 1 GW · SATRIA-1 · FLORIDA · JALAN. Hits stk1, cmc1, stk3, shD, ldr1. Full-frame: Medcom.
- **Bab 3** 130.6 s (VO 06), people and skills: US$119 · KUE · 364 (PISA) · LEVEL 2 · 17 · SKOR. Hits cmc1, stk3, shD, stk2.
  Full-frame: Kompas (seratus), Jakarta Globe (48th).
- **Puncak** 114.1 s (VO 07), the twist: Skor Kebalik board flips to PEMBAYARAN DIGITAL · 595 vs 476 · QR (stickers
  collapse into one code) · WARUNG · GPN route · 2026 trade agreement · ×140 vs QRIS/GPN → "ATURAN MAIN." "KITA PERNAH
  MENCIPTA" "TEPUK DADA." Hits stk4, cmc1, shD, stk3, shE. Full-frame: Jakarta Post (QRIS trade barrier).
- **Penutup** 48.7 s (VO 08): HULU · 4 · KOMEN · QR · subscribe. Hits shD, stk1, ldr1.

## Open doubts at delivery (unresolved, for the next film to avoid)
- shD's flash is red-orange, off the palette: pick hits whose colour stays inside the palette.
- Some Bab 2 stations look sparse in their first ~1.5 s: the first layer should land on frame 1 of a station.
- A dense dot field (5.427 dots) reads as a grey block: use fewer, larger marks or a counter.
- Penutup props drawn in code (bakso cart) read weaker than a real photo: ask Ahri/Ahpo for the photo early.
- Licences: the shutter hit is a paid product (reference only); 3 hits are doubtful re-uploads. Swap them before a
  monetised upload.

## Production facts
- Ahri: NARASI + kutipan/grafik/stok-situs. Ahpo's job ran > 30 min and was stopped → chapter objects built in code.
- 5 kit chapters were built in parallel by forks using the same kit and rules; the Studio ports were 8772–8779.
- Render: 3.5 h. systemd-oomd killed the VS Code scope twice → `render_safe.sh`. Draw many primitives as one path
  inside `onPlane`.
