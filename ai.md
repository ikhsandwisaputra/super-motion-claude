## 1. The Master Prompt (Universal Enterprise Showroom)

Gunakan prompt ini sebagai andalan utama. Fokusnya adalah memamerkan kemewahan siluet, kilau clear coat bodi, dan pergerakan kamera smooth layaknya menggunakan robotic arm (Bolt Cinebot).

> **Aturan dasar semua prompt di file ini (revisi):**
> - **Jangan orbit / "pan around".** Dari satu foto, AI harus mengarang sisi mobil yang tidak terlihat → bentuk berubah. Pakai push-in, pull-back, tracking lurus, atau busur kecil (maks ±15°).
> - **Hapus kata "60fps", "Arri Alexa", "ray-traced".** Model video tetap mengeluarkan 24/30 fps; kata-kata ini hanya memakan perhatian prompt.
> - **Komposisi untuk motion graphic:** mobil di 55–60% bagian bawah frame, sepertiga atas kosong dan bersih untuk teks/angka.
> - **Kamera pelan dan minim.** Gerakan kamera besar dibuat nanti di editor/engine motion, bukan oleh AI.

**Prompt:**

```text
High-end automotive commercial, stationary vehicle, car placed in the lower 60% of the frame with clean empty space above it. Slow, smooth camera push-in along a straight path, no orbit. A soft, continuous studio light sweep glides seamlessly across the glossy paintwork, accentuating the sharp aerodynamic body lines, flawless clear coat and polished metallic surfaces, with accurate reflections on the glass and rims. 50mm lens look, subtle atmospheric rim lighting, luxury flagship presentation, locked vehicle proportions, exact vehicle geometry, strict structural consistency, photorealistic.
```

## 2. Variasi Prompt Berdasarkan Mood & Sudut Gambar

Pilih salah satu dari tiga variasi di bawah ini jika gambar awalmu punya kondisi pencahayaan atau sudut pengambilan tertentu:

### A. Fokus Kilau Bodi & Lekukan (Dramatic Light Sweep)

Cocok jika background gambar mobil agak gelap atau di dalam ruangan. Kamera bergerak sangat minim, tapi cahaya berjalan menyapu bodi mobil dari depan ke belakang.

**Prompt:**

```text
Luxury car reveal presentation, stationary vehicle in the lower 60% of the frame, clean empty space above. Subtle slow push-in camera movement, no orbit. Dynamic overhead softbox lighting slowly sweeps from the front hood to the rear, creating elegant specular highlights across the contoured bodywork and pristine glossy finish. Deep contrast, rich shadows, crisp chrome and headlight details, zero distortion, locked vehicle proportions, commercial grade cinematography.
```

### B. Gaya Sinematik Outdoor / Arsitektur Modern (Low-Angle Hero Shot)

Cocok jika gambar mobil berada di jalanan, depan gedung, atau area terbuka agar terlihat gagah dan mahal.

**Prompt:**

```text
Flagship automotive showcase, stationary vehicle, slow low-angle tracking shot moving gently and straight from left to right over a short distance, no orbit. Car in the lower part of the frame with open sky or clean architecture above. Natural golden hour reflections shift smoothly across the sleek, mirror-like car body and windshield. Crisp focus on the vehicle's design language, creamy bokeh background, 85mm telephoto lens compression, stable car structure without morphing, ultra-clean commercial aesthetic.
```

### C. Close-Up / Detail Eksterior (Elegance & Craftsmanship)

Cocok jika gambar input berupa half-body mobil, bagian lampu, velg, atau lekukan samping.

> Untuk macro, **jangan minta AI zoom dari foto full-body** — detail yang dikarang AI akan meleleh. Crop dulu foto aslinya ke bagian yang mau ditampilkan (lampu, velg, sayap), lalu pakai crop itu sebagai gambar awal.

**Prompt:**

```text
Macro automotive cinematography, ultra-slow micro-pan movement showcasing the vehicle's exquisite craftsmanship. Soft specular light dances across the metallic flake paint and sharp panel gaps. Shallow depth of field, cinematic studio grading, tactile surface textures, exact structural fidelity, high-fashion luxury brand vibe.
```

## 3. Negative Prompt (Wajib Diisi Jika Ada Kolomnya)

Jika platform AI yang kamu pakai menyediakan fitur Negative Prompt (seperti di Kling AI atau Stable Video), masukkan daftar ini untuk memblokir efek AI slop:

**Negative Prompt:**

```text
morphing, melting body parts, shifting grille, spinning wheels, deforming rims, changing car proportions, changing badge, logo distortion, text, letters, license plate, extra cars, people, camera orbit, camera shake, jittery camera, fast motion, neon cyberpunk glow, oversaturated, blurry, watermark, unnatural reflections, CGI cartoon look, warps.
```

## 4. Pengaturan Parameter agar Anti-Gagal

| Parameter / Fitur | Setelan Ideal | Alasan Teknis |
|---|---|---|
| Motion Scale / Strength | Rendah – Sedang (3/10 atau 4/10) | Nilai di atas 5 membuat AI berhalusinasi dan mengubah bentuk grille atau lampu mobil. |
| Status Mobil | Diam (Stationary) | Jangan minta mobil berjalan dari gambar statis kecuali angle-nya benar-benar lurus dari samping, karena putaran velg sering hancur di AI. |
| Durasi Generate | 5 Detik (tanpa slow-mo) | Generate 5 detik, pilih potongan terbaik 1–2 detik. Kesan mewah datang dari gerakan pelan di prompt, bukan dari slow-mo: optical flow 50%–70% sering membuat velg dan grille goyang. Kalau tetap perlu diperlambat, maksimal 80% speed. |
| Rasio | 9:16 sejak gambar awal | Jangan crop video 16:9 menjadi 9:16 — resolusi turun dan mobil terpotong. |
| Creativity / Relevance | Lebih condong ke Relevance / Strict | Memaksa AI patuh 100% pada piksel gambar asli, bukan mengarang bentuk mobil baru. |

---

Secara kualitas visual dan stabilitas bentuk, hasil videomu ini sudah sangat bersih dan jauh dari kesan AI slop:

- **Stabilitas Geometri & Detail:** Kisi-kisi grille krom, jari-jari velg (wire wheels), ban whitewall, hingga ornamen kap depan sama sekali tidak meleleh atau berubah bentuk saat kamera bergerak.
- **Pantulan Cahaya (Light Sweep):** Pergerakan kilau cahaya di atas spakbor depan dan bodi biru tua pada detik 00:00 hingga 00:04 terlihat sangat mulus dan meyakinkan.

## 1. Solusi Agar Bodi Mobil Tidak Kepotong (Terlalu Zoom-In)

Masalah bodi terpotong di videomu terjadi karena kombinasi rasio vertikal (9:16) dengan pergerakan panning menyamping pada jarak dekat, sehingga bagian lampu belakang dan ujung bemper keluar dari frame.

Ada 2 langkah wajib untuk mengatasinya:

- **Siapkan "Ruang Napas" pada Gambar Awal (Sebelum Masuk Video AI):**
  Jika gambar awalmu sudah mepet ke pinggir kanvas vertikal, AI otomatis akan memotong bodi mobil saat melakukan gerakan kamera. Gunakan fitur Expand / Outpainting (di Photoshop, Canva, atau Photoroom) agar ukuran mobil di gambar awal hanya menempati 60%–70% area tengah layar, menyisakan ruang kosong di kiri, kanan, atas, dan bawah.
- **Ganti Instruksi Lensa & Kamera di Prompt (Gunakan Pull-Back / Wide Angle):**
  Hapus kata 50mm lens dan dolly pan around (karena memicu AI melakukan crop maju), lalu ganti dengan instruksi 24mm wide-angle lens, full-body shot, dan slow camera pull-back (zoom out).

**Prompt Revisi (Khusus Anti-Kepotong & Full Body):**

```text
High-end automotive commercial, wide-angle full-body establishing shot showing the entire vehicle completely from front bumper to rear bumper within the frame. Ultra-slow, subtle straight camera pull-back, no orbit, keeping the whole car in the lower 60% of the frame with generous breathing room around the edges and clean empty space above. A soft studio light sweep glides seamlessly across the glossy paintwork and polished chrome, accentuating the full aerodynamic silhouette. 24mm wide lens look, deep depth of field so the entire car stays razor-sharp, accurate reflections, strict structural consistency, zero cropping, photorealistic.
```

## 2. Rekomendasi Background Terbaik untuk Semua Jenis & Warna Mobil

Di videomu saat ini, background biru muda polos (matte blue cyclorama) memang bersih, tetapi kurang memberikan kontras maksimal karena warna mobilnya juga biru tua. Selain itu, jika background biru itu dipakai untuk semua mobil (misalnya mobil warna merah, kuning, atau hijau), warnanya akan tabrakan (color clash).

Agar satu background bisa masuk ke semua warna cat (hitam, putih, silver, merah, biru, klasik, hingga supercar modern) dengan kesan enterprise luxury, pilih salah satu dari 3 konsep netral ini:

| Konsep Background | Karakter Visual & Keunggulan | Prompt Background (Untuk Gambar Awal) |
|---|---|---|
| 1. Dark Anthracite / Charcoal Studio (Paling Direkomendasikan) | Abu-abu arang gelap (bukan hitam pekat) dengan soft spotlight di tengah dan lantai sedikit memantul (satin floor). Mobil warna terang (putih/silver/kuning) langsung pop-out, sedangkan mobil gelap (hitam/biru tua) tetap tegas lekukannya berkat rim light dari lantai. | Minimalist luxury automotive studio, dark anthracite charcoal cyclorama wall, satin dark slate floor with subtle soft reflection, overhead diffused softbox light strip casting a warm white halo in the center, neutral color temperature, architectural enterprise showroom aesthetic. |
| 2. Titanium Mid-Grey Infinity Wall (Gaya Porsche / Polestar) | Abu-abu perak netral dengan gradasi gelap di sudut (vignette). 100% netral secara spektrum warna, sehingga tidak memantulkan warna palsu ke cat mobil atau bagian krom. | Clean titanium mid-grey infinity studio background, smooth subtle vignette edges, matte concrete floor, soft overhead commercial studio lighting, ultra-clean luxury presentation, zero color cast. |
| 3. Warm Champagne / Stone Gallery (Kesan Museum Eksklusif) | Krem batu alam redup (warm alabaster/taupe) dengan pencahayaan hangat. Sangat elegan untuk menonjolkan detail krom dan kaca, cocok jika katalogmu banyak berisi mobil klasik atau flagship sedan. | High-end private collector gallery background, warm muted stone beige cyclorama wall, polished dark travertine floor, soft golden-white studio lighting, timeless luxury atmosphere. |

Jika kamu ingin menyeragamkan semua katalog, Opsi 1 (Dark Anthracite Charcoal) adalah standar emas industri otomotif karena paling dramatis saat terkena efek light sweep dan dijamin tidak pernah mati gaya untuk warna bodi apa pun.

---

## 5. Alur Video AI + Motion Graphic

Klip AI dipakai untuk **kemewahan cat dan cahaya**; motion graphic (engine kode) mengurus **informasi, tipografi, blueprint, kamera, dan SFX**.

1. **Edit gambar awal:** pindahkan mobil ke studio (pakai prompt background Opsi 1), rasio 9:16, mobil di 55–60% bawah, sepertiga atas kosong. Hapus pengemudi kalau mobilnya dibuat diam di studio.
2. **Generate 3–4 klip × 5 detik:** light sweep (Master/A), low-angle (B), 2 macro dari crop foto (C). Background dan arah cahaya sama di semua klip supaya terasa satu dunia.
3. **Pilih potongan 1–2 detik** per klip; tempo film tetap cepat, klip AI jadi momen "napas" mewah di antara beat info.
4. **Blueprint → nyata:** garis teknik di-trace dari frame pertama klip AI, garis merakit mobil, lalu wipe menjadi klip AI-nya (posisi garis pas dengan mobil).
5. **Info di ruang kosong atas:** angka spec, counter, callout garis ke bagian mobil (pengganti exploded view kalau tidak ada model 3D).
6. **Kamera tambahan** (push kecil, parallax) dibuat di engine, bukan di AI.

### Prompt Khusus: Hypercar Oranye (Senna) — Siap Dipadukan Motion

**Gambar awal (image edit):**

```text
Same supercar, identical shape, paint and details, now stationary in a minimalist dark anthracite studio, satin dark slate floor with soft reflection, overhead softbox light strip, empty cockpit. Vertical 9:16, car in the lower 60% of the frame, front three-quarter view, clean empty dark space above.
```

**Video — light sweep:**

```text
High-end automotive commercial, vertical 9:16, stationary supercar in a dark anthracite studio, car in the lower 60% of the frame with clean empty space above. Slow subtle camera push-in, no orbit. A soft overhead light strip sweeps from the front splitter to the rear wing across the orange glossy paint and exposed carbon fibre. Satin floor reflection, deep contrast, locked vehicle proportions, exact structural consistency, photorealistic.
```

**Video — macro sayap / karbon (gambar awal = crop foto):**

```text
Macro automotive cinematography, stationary, ultra-slow straight micro-pan. A soft light streak glides across the carbon fibre weave and the orange paint edge. Shallow depth of field, dark studio, tactile surface texture, exact structural fidelity, no morphing.
```
