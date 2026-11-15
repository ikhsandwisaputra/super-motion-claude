# Motion Studio — lihat & revisi sebelum full render

Konsep diambil dari HyperFrames Studio (preview live + timeline), dibangun ulang untuk engine kita (three.js + motion blur).

## Jalankan
    .venv/bin/python -I tools/studio/studio.py aset/video-ikhsan-channel/video-17
    # buka http://127.0.0.1:8765  (lokal saja)

- **Live (cepat)**: digambar langsung dari source, real-time (±6–30 ms/frame). Sama dengan final kecuali motion blur.
- **Hasil render**: frame dari render terakhir (`studio.json` → `frames`).
- **Timeline**: Chapter · Subtitle · Beat · SFX · Catatan · Cuplikan. Klik = lompat, Shift+drag = rentang, Ctrl+scroll = zoom.
- **Catatan revisi** → `build/studio_notes.json` + `build/studio_notes.md` (Claude baca dari sini).
- **Render cuplikan** → `tools/studio/patch.py`: render rentang itu saja di kualitas final + `compare.mp4` (Sebelum | Sesudah).

## Catatan → eksekusi
- Ikhsan: tulis catatan → **Simpan & kirim ke Claude** (Ctrl+Enter), atau **Kirim semua**.
- Server menulis `build/studio_queue.log` (`ANTRI id=… mm:ss-mm:ss :: teks`). Sesi Claude memantau file itu
  (Monitor: `tail -n 0 -F build/studio_queue.log | grep --line-buffered ANTRI`) dan langsung mengerjakan.
- Claude memberi status lewat `notes.py`: `set <id> dikerjakan`, lalu `set <id> "siap dicek" --reply "…"`. Studio memperbarui sendiri (±2,5 s) + toast.
- Ikhsan cek di Live → **Oke → render cuplikan** / **Oke, selesai** / **Belum, ulang** (catatan tambahan, otomatis dikirim lagi).
- Kalau sesi Claude tidak aktif, antrian tetap tersimpan; sesi berikutnya jalankan `notes.py <proyek> list --status antri`.

## Alur revisi (tanpa full render)
1. Ikhsan tonton di Studio, tulis catatan di menit yang salah.
2. Claude ubah source → cek di Live → `patch.py --t0 A --t1 B` → Ikhsan lihat Sebelum|Sesudah.
3. Disetujui → `patch.py --apply <id>` (frame lama dibackup ke `build/patch/<id>/old`).
4. `splice.py <proyek> --out out/film_vN.mp4` → hanya chunk 30 detik yang berubah di-encode ulang.
   Revisi audio saja = mix ulang lalu splice (gambar tidak dirender).

## Kontrak proyek
`src/main.js` menyediakan `window.preview(t)` (gambar tanpa readback), `render`, `renderAt`, `NFRAMES`, `collectCues`;
`engine.renderFrame(film, f, still, noRead)`; `tools/render.py --range`; `build/{chapters,lines_film,cues}.json`; `build/mix_full.wav`.
Opsional `studio.json`: `{"frames": "build/frames_v2", "audio": "build/mix_full.wav", "fps": 30}`.

## Alat audit (tanpa render)
- `sfx_probe.py <proyek> [--fps 15]` → `build/sfx_events.json`: semua event UI di layar (ketik, jendela/bubble/chip muncul, centang,
  toggle, angka berjalan, klik kursor, sapuan seleksi) dari probe `globalThis.__P` di primitif gambar. Dipakai `tools/mix17_cine.py`.
- `cap_collide.py <proyek> [--fps 5]` → `build/cap_collisions.json`: subtitle yang menimpa teks adegan (probe `__C` di captions, `__T` di text()).
  Tervalidasi: menangkap bug v17 05:32.20–05:34.00 saat fix-nya dimatikan.
- Timeline Studio track SFX membaca `build/sfx_placed.json` (hasil mixer) bila ada.
