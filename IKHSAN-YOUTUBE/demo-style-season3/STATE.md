# STATE — Lab Season 3 (`aset/demo-style-season3`)

**Fase 1 · brief + usulan arah — selesai 2026-11-20, menunggu pilihan Ikhsan.**

Pemicu: penonton bilang "mulai jenuh". Ikhsan minta visual baru yang tetap khas (gelap, hit transisi film,
elemen Ahpo), kamera 3D / Codrops / three.js, zoom-in + tipografi lebih kuat, artikel lebih mantap,
opsi maskot yang muncul hanya di momen emosi.

Usulan lengkap: `aset/demo-style-season3/USULAN.md`
- Diagnosis (hitung cepat 24 frame, belum `eye.py dna` penuh): lockup yang sama 16/24 frame;
  lit mass median AGI 17,3 % → Batam 7,4 % / Pura-pura Patuh 7,1 %.
- Arah: A Selam Detail (zoom-dive berantai) · B Foto Jadi Ruang · C maskot Si Piksel (alt. Sorot / Kursor).
- Rekomendasi: B tulang punggung + A signature zoom per bab + C diuji dulu sebagai styleframe; motif lock 3.

## Menunggu Ikhsan
1. Arah yang dites (rekomendasi B + A + styleframe C, atau ketiganya).
2. Maskot ya/tidak + desain.
3. Topik video berikutnya (default tes: aset film dark-web).
4. Izin install Depth Anything V2 **Small** (Apache-2.0; Base/Large CC-BY-NC = tidak boleh) kalau B.
5. Project Odoo untuk log sesi (usul: `IDS-RST : Riset arah visual Season 3 (diagnosis jenuh + 3 arah)`).

## Langkah berikutnya (setelah dipilih)
- `ledger.py menu --recipe …`. Id Codrops sudah dicocokkan ke ledger 2026-11-20:
  A = `speed-ramp-integrated`, `ghost-trail-rush-hang`, `curved-smear-taper`, `world-fold-bend` (proven);
  B = `thin-lens-accum-dof`, `defocus-dust-energy`, `horizon-matched-fog`, `glass-slab-spectral-rim`,
  `racing-line-rail`, `agx-desat-tpdf-finish`, `softbox-card-studio` (proven).
- 3 tes × 3 detik di Motion Studio, preview saja (TIDAK render sebelum Ikhsan OK). Bahan dari
  `aset/data-kita-dijual-dark-web/`: foto, artikel, plate Ahpo `assets/ahpo/D01`–`D07`,
  VO `audio/voiceover/dkd_vo_ahmad_*` → 0 kredit ElevenLabs. Tes B: ukur ms/frame di laptop (Vega).
- Setelah verdict: `ledger.py verdict` dengan kata-kata Ikhsan → §11 di
  `.claude/skills/studio-global/references/standar-kasta-tinggi.md` → kit ke `_template-longform` / `_pustaka`.

## Penutupan 2026-11-20
Ikhsan menghentikan lab: "udah gak usah dilanjut… video selanjutnya pakai style baru ini, aksa dll".
- A (0–6 s) dan C/Aksa (10–15 s) sudah jadi dan live di Studio.
- B tidak dibangun. Yang ada baru depth bake (`tools/bake_depth.py` → `assets/depth/lorong-server.{bin,json}`). Formulanya ada di FORMULA.md §B.
- Film long-form berikutnya memakai gaya Season 3: Aksa + Selam Detail + Foto Jadi Ruang.
- Sumber kode: `src/aksa.js`, `src/testC.js`, `src/testA.js`. Pindahkan ke kit film dan `_pustaka` saat panen.
