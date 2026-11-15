# Transisi depan 3/4 → samping kiri

Pakai fitur **start frame + end frame**. Start = gambar awal `01-depan-3-4-kiri.md`, end = gambar awal `03-samping-kiri.md`.
Kedua gambar harus dari studio dan cahaya yang sama, kalau tidak AI akan mengarang di tengah.

```text
same car as the reference image, identical shape, proportions, paint, wheels and details, locked vehicle geometry, strict structural consistency, photorealistic, high-end automotive commercial. stationary car, wheels not turning, empty cockpit in a minimalist dark anthracite charcoal studio, seamless cyclorama wall, satin dark slate floor with a soft subtle reflection, one long overhead softbox light strip, neutral colour temperature, deep contrast, rich soft shadows. Camera: one slow, smooth, continuous arc from the start frame to the end frame at constant height, steady, no shake. Light stays fixed in the studio while the reflections slide across the orange gloss paint and exposed carbon fibre. vertical 9:16, the car in the lower 60% of the frame, clean empty dark space above it, generous breathing room on both sides, nothing cropped. Luxury flagship presentation, commercial grade cinematography.
```

| Pengaturan | Nilai |
|---|---|
| Rasio | 9:16 |
| Durasi | 5 detik (pakai potongan terbaik 1–2 detik) |
| Motion strength | 3/10–4/10 |
| Creativity / Relevance | Strict / Relevance |
| Negative prompt | isi dari `00-negative.md` |

## Cek hasil (buang kalau salah satu gagal)
- [ ] Bentuk mobil sama dengan referensi dari awal sampai akhir klip
- [ ] Velg, lampu, badge tidak berubah atau meleleh
- [ ] Studio, lantai, dan arah cahaya sama dengan sudut lain
- [ ] Sepertiga atas tetap kosong untuk teks
- [ ] Kamera halus, tanpa goyang atau orbit
- [ ] Bagian tengah busur tidak mengarang detail baru (paling sering gagal; generate beberapa kali)
