# Bab 4 · Kalau AI belajar dari AI — STATE (2026-11-15, fork Ahtor)

**Status:** built, mixed, Studio running at http://localhost:8796/ — waiting for Ikhsan's check. No full render done.
Duration 269.04 s (END 267.84 + VOFF .3 + tail .9). Mix: VO RMS −20.5, music −37.3, SFX −40.4 (peak −10.4), mix peak −4.2 dB, 202 SFX events, 7 hits.

## Concept
KARTU-GAYA idea 1, **Salinan Pudar (kaca pindai)**: under-copier digital glass and light, not paper. "Jarak = Generasi": each copy is a deeper glass plate.
New technique: **live generational copy degradation**. `copyOf` chains run each generation for real on the A05 toner textures (no pre-baked fade), applied to the recipe card, the word MODEL COLLAPSE, the 6 recipe cards and the idiom. Also the W2 restore cascade, and windows W1/W2 enter with a scan-bar wipe.

## Structure
- W0 copier opener 0 → nah−.3 (copier.js)
- W1 "copy 10x again" kayak2−.1 → dampak4−.3 (scan-bar wipe in)
- W2 restore cascade balik−.3 → bahan+.5 (scan-bar wipe in)
- Everything else is one depth row (makeChapter), stations below (time = station `at` in the film):

```
 13.94 Model collapse        74.14 Keragaman turun       151.74 Arsip sebelum banjir   213.63 AI Index 2026
 18.50 Bukti: Nature 2024    80.86 AI mirip satu sama    158.78 wordfreq berhenti      218.14 (W2 kaca pindai · pulih)
 22.14 Cacatnya permanen     87.66 Beranda paduan suara  167.02 delve ×10              224.82 AlphaGeometry · pemeriksa
 27.02 Pinggiran hilang      96.10 Dampak 3 · Thompson   176.14 SynthID                234.38 Skor 25/30
 31.82 Ekor = langka        104.14 Terkubur terjemahan   186.30 Tanda air rapuh        242.54 AlphaProof
 39.10 Resep kue kampung    109.58 Opini · bahasa daerah 194.12 Pasti makin bodoh?     247.82 Perak IMO 2024
 47.58 Kelompok terpinggir  119.02 Ungkapan khas pudar   199.18 Skenario diganti       254.14 Wasit
 54.60 Suara siapa          128.94 Dampak 4 · antik      207.93 Skenario disimpan      260.66 Manusia
 60.46 MAD                  136.06 Baja tua PRA-1945                                   265.14 Indonesia
 65.58 Tanpa data asli      145.46 lowbackgroundsteel.ai
 70.90 Dampak 2 · seragam
```

## Files
- src/film.js: loads, chains and window routing (the template film.js is backed up in the scratchpad as bab4-film.template.js.bak)
- src/copier.js: copyOf/chain/glass/bar + W0/W1/W2
- src/st1.js: stations 1–18 · src/st2.js: stations 19–37 · src/ui.js: helpers
- src/beats.js: unchanged (HITS stk1/hw3/gr3/stk4/cmc2/hw2/gr1, BED voxscape)
- build/chk: check frames · build/mix.wav: the mix

## Assets
- All 11 cited kutipan are used: nat, mad, madn, thom, lbs, wf, syn, ger, hai, ag, ap.
- Stock video: kereta, buku (../assets/vid), tenang, macro, go, digital.
- The 4 A05 textures from Ahpo.
- The Nature quote is typed. The Indonesia map is studio-made (dotted ellipses). "delve" has no source, so it has no srcTag.

## Open issues
- hw2 hit (bahan+.18): the handwriting footage ("…urn of passion", English) sweeps over the W2 end and the AlphaGeometry opening. This is the kit hit as designed. If it feels off, move it to bahan+.6 or swap it for another hit.
- studi3 opens on the evidence alone for about 1 s before the scenario builds.
- End of W0 (~420): the kereta clip carries a pink/purple light leak. Not graded; check it doesn't read as vintage.
- Not measured: eye.py sense/--flow (it needs a render), the real-time feel of the motion, and how the mix sounds.

## Kit proposals (not applied)
1. Add buku to the shared vid CLIPS.
2. Add Caveat and Reenie Beanie to the template index.html fonts.
3. A neutral non-sepia plate grade for stock clips.
4. copyOf/chain/glass as kit helpers.
5. Add `E.outBack`; it is missing, so station code silently fails.
6. drawRow draws far stations (i+2) regardless of time: footage plates ghost early. Gate them on `t > s.at − lead − 1`.
