# GAYA IKHSAN — ringkasan ciri khas video (baca ini dulu)

Ringkasan untuk AI/kolaborator yang membaca repo ini. Sumber kebenaran tetap file yang ditautkan di bawah.

## Channel
- Long-form YouTube **bahasa Indonesia**, 8–15 menit, **16:9 1920×1080**, berbagai topik lewat **lensa teknologi**.
- Semua video dibuat dari **kode** (HTML/Canvas/SVG/Three.js/GSAP), render frame-by-frame — bukan editor timeline.
- Mesin: "Super Motion" (`.claude/skills/motion-video-engine`), pratinjau di Motion Studio (`tools/studio`).

## Ciri tetap (jangan diubah)
- Latar gelap, **satu aksen lime `#C8F53C`** (tinta gelap di atasnya). Tidak pernah neon, tidak pernah coral.
- Gaya **Vox + dokumenter**: foto dokumenter **full-bleed** jadi latar (bukan kotak/kartu), kartu hanya untuk bukti
  (artikel, headline — tahan ≥ 2 detik, ada tab "Sumber").
- Pembuka **RNC "Satu Baris"** (depth-row, kamera mundur), lalu bab-bab (`### Bab N`) dengan **portal bab** yang
  dirancang khusus per film (QR sudah pensiun).
- Transisi "hits" (`IKHSAN-YOUTUBE/_transisi`) sepanjang video, tiap film ≥ 2 potongan baru.
- VO Indonesia santai-baku ("kita/kamu"), ElevenLabs `eleven_v4`. Musik bab tenang dan pelan; skor kencang hanya di intro.
- SFX sinematik di tiap aksi UI (klik, ketik, popup) + lapisan film; **dilarang** bunyi "ting"/bel/chime.
- Tiap angka US$ diberi "≈ Rp…" di layar (kurs JISDOR + tanggal), warna ivory.
- Larangan: tampilan PPT/slide statis > 4 s, template Bento/Tailwind, ikon palsu, look vintage/film jadul, konsep kertas.

## Season 3 — gaya TERBARU (mulai 2026-11-20)
1. **Aksa** — maskot ASCII, "teman nonton kamu". Muncul 5.5–7.5 s, 2× di bab ≥ 120 s, 1× di bab pendek; kedip, 2–3
   ganti ekspresi + say-line; tag "AKSA · TEMAN NONTON KAMU" saat pertama muncul. Saat Aksa di layar, dia satu-satunya lime.
2. **Selam Detail** — kamera menyelam ke detail lalu match-cut ke adegan berikutnya.
3. **Foto Jadi Ruang** — foto dokumenter dijadikan ruang 3D (dolly + orbit + rack focus), kata raksasa berdiri di dalam
   ruang, tertutup subjek dan menjatuhkan bayangan.

Film contoh terbaru: `IKHSAN-YOUTUBE/IKHSAN-YOUTUBE/cara-rockstar-bikin-gta-6/` (komponen `kit/s3.js`, `STATE.md`).
Lab asal: `IKHSAN-YOUTUBE/demo-style-season3/` (`FORMULA.md`, `USULAN.md`, `src/aksa.js`).

## Baca selanjutnya
- `CLAUDE.md` — hukum dasar motion studio.
- `.claude/skills/studio-global/` — playbook long-form + `references/standar-kasta-tinggi.md`, `resep-indo-vs-as.md`.
- `.claude/skills/motion-taste/` — formula rasa, kiblat selera (`references/kiblat-ikhsan.md`).
- `IKHSAN-YOUTUBE/_pustaka/INDEX.md` — pustaka komponen kode.
- `IKHSAN-YOUTUBE/_template-longform/` — template awal tiap film.
- Tiap film: `NARASI.md` (naskah), `STATE.md` (keputusan), `kit/` + `src/` (kode).

Catatan: media (video, audio, foto, render) tidak ada di repo; hanya teks dan kode.
