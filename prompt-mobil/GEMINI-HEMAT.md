# Versi hemat untuk Gemini (1 upload, 1 chat)

Prinsip: **upload foto sekali**, semua sudut dibuat di **chat yang sama** (Gemini masih ingat
mobil dan studionya), dan **video Veo cuma 3**. Sudut lain dianimasikan di engine motion
(push-in, parallax, light sweep buatan) dari gambar diamnya.

## Langkah 1 — Buka chat baru, upload foto, kirim ini (sekali saja)

```text
Use the uploaded photo as the exact reference car. Keep its shape, proportions, paint, carbon parts, wheels and details identical in every image I ask for. Place it, stationary and with an empty cockpit, in a minimalist dark anthracite charcoal studio: seamless cyclorama wall, satin dark slate floor with a soft subtle reflection, one long overhead softbox light strip, neutral colour temperature, deep contrast, rich soft shadows. Every image: vertical 9:16, photorealistic high-end automotive commercial, the car in the lower 60% of the frame with clean empty dark space above it, nothing cropped, no text, no people, no extra cars, no logo changes. First image: front three-quarter view from the left, camera at headlight height.
```

## Langkah 2 — Sudut berikutnya, di chat yang sama (tanpa upload lagi)

Kirim satu baris per pesan. Studio dan aturannya sudah diingat, jadi cukup sebut sudutnya:

```text
Same car, same studio, same light. Now: exact left side profile, camera at door-handle height.
```
```text
Same car, same studio, same light. Now: rear three-quarter view from the right, camera slightly above tail-light height.
```
```text
Same car, same studio, same light. Now: straight rear view, perfectly centred and symmetrical.
```
```text
Same car, same studio, same light. Now: straight front view, perfectly centred and symmetrical.
```
```text
Same car, same studio, same light. Now: low angle front three-quarter view, camera close to the floor looking slightly up.
```
```text
Same car, same studio, same light. Now: close-up of the rear wing and its mount filling the lower two thirds of the frame, soft darkness above.
```
```text
Same car, same studio, same light. Now: close-up of the front wheel and brake caliper filling the lower two thirds of the frame, soft darkness above.
```

Kalau ada yang mulai melenceng (bentuk berubah), balas: `Too different from the reference. Redo it, keep the car identical to the first image.`

Minimal yang wajib jadi: **depan 3/4, samping, belakang 3/4**. Sisanya bonus.

## Langkah 3 — Video Veo: cukup 3

Pakai gambar dari Langkah 1–2 sebagai frame awal:

| Gambar | Prompt video |
|---|---|
| Depan 3/4 | `Stationary car, wheels not turning. Slow straight camera push-in, no orbit, steady. The overhead light strip sweeps from the front splitter over the bonnet to the rear wing, elegant highlights on the orange paint and carbon. Keep the car identical, no morphing, no text.` |
| Samping | `Stationary car, wheels not turning. Slow straight lateral tracking from front to rear, parallel to the car, no orbit. The light strip travels along the side line from nose to tail. Keep the car identical, no morphing, no text.` |
| Belakang 3/4 | `Stationary car, wheels not turning. Slow straight camera pull-back, no orbit, steady. The light strip glides over the rear wing and down the rear haunch. Keep the car identical, no morphing, no text.` |

## Langkah 4 — Kirim ke gue

Simpan semua gambar dan video ke satu folder. Sisanya gue yang kerjain di motion: potong
1–2 detik per klip, animasi gambar diam, blueprint, angka, tipografi, SFX.

> File 01–14 tetap dipakai sebagai cadangan kalau satu sudut perlu prompt lengkap.
