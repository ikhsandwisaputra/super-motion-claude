"""Generator file prompt mobil.

Semua file prompt dibangun dari blok yang sama (studio, kunci bentuk, komposisi, negative),
jadi setiap sudut kamera punya dunia, cahaya, dan kualitas yang identik.

Ganti mobil: ubah MOBIL dan WARNA di bawah, lalu jalankan:
    python3 /home/ikhsands/Proyek/super-motion-claude-ikhsan/prompt-mobil/buat.py
"""
from pathlib import Path

# --- 1. Mobil (satu-satunya bagian yang diganti per mobil) ---------------------------------
MOBIL = ("a bright orange mid-engine hypercar with an exposed carbon fibre bonnet and roof, "
         "dihedral doors, a deep front splitter, large side air intakes and a tall swan-neck "
         "carbon rear wing")
WARNA = "orange gloss paint and exposed carbon fibre"

# --- 2. Blok bersama (jangan diubah per sudut) ----------------------------------------------
STUDIO = ("minimalist dark anthracite charcoal studio, seamless cyclorama wall, satin dark slate "
          "floor with a soft subtle reflection, one long overhead softbox light strip, neutral "
          "colour temperature, deep contrast, rich soft shadows")
KUNCI = ("same car as the reference image, identical shape, proportions, paint, wheels and "
         "details, locked vehicle geometry, strict structural consistency, photorealistic, "
         "high-end automotive commercial")
KOMPOSISI = ("vertical 9:16, the car in the lower 60% of the frame, clean empty dark space above it, "
             "generous breathing room on both sides, nothing cropped")
KOMPOSISI_MACRO = ("vertical 9:16, the detail fills the lower two thirds of the frame, soft falloff "
                   "into darkness at the top for text")
DIAM = "stationary car, wheels not turning, empty cockpit"
NEGATIVE = ("morphing, melting body parts, shifting grille, spinning wheels, deforming rims, "
            "changing car proportions, changing badge, logo distortion, text, letters, license "
            "plate, extra cars, people, driver, camera orbit, camera shake, jittery camera, fast "
            "motion, cropped car, neon cyberpunk glow, oversaturated, blurry, watermark, unnatural "
            "reflections, CGI cartoon look, warps")

# --- 3. Sudut kamera -----------------------------------------------------------------------
# (nama file, judul, sudut untuk gambar awal, gerak kamera video, arah light sweep, catatan)
SUDUT = [
    ("01-depan-3-4-kiri", "Depan 3/4 kiri (hero)",
     "front three-quarter view from the left, camera at headlight height",
     "slow straight camera push-in toward the front wheel",
     "the light strip sweeps from the front splitter over the bonnet to the rear wing",
     "Shot utama. Hasil gambar awal ini jadi referensi untuk semua sudut lain."),
    ("02-depan-lurus", "Depan lurus",
     "straight front view, perfectly centred and symmetrical, camera at headlight height",
     "very slow straight push-in on the centre line",
     "a light line slides down the bonnet toward the splitter",
     "Simetris = terasa enterprise. Cocok untuk angka besar di atas mobil."),
    ("03-samping-kiri", "Samping kiri (profil)",
     "exact left side profile, camera at door-handle height, the whole car from bumper to bumper",
     "slow straight lateral tracking from front to rear, parallel to the car",
     "the light strip travels along the side line from nose to tail",
     "Profil paling aman untuk AI. Bagus untuk callout panjang mobil dan sayap."),
    ("04-samping-kanan", "Samping kanan (profil)",
     "exact right side profile, camera at door-handle height, the whole car from bumper to bumper",
     "slow straight lateral tracking from front to rear, parallel to the car",
     "the light strip travels along the side line from nose to tail",
     "Pasangan 03. Di edit: potong dari 03 ke 04 terasa seperti kamera menyeberang."),
    ("05-belakang-3-4-kanan", "Belakang 3/4 kanan",
     "rear three-quarter view from the right, camera slightly above tail-light height",
     "slow straight camera pull-back",
     "the light strip glides over the rear wing and down the rear haunch",
     "Pamerkan sayap belakang dan diffuser."),
    ("06-belakang-lurus", "Belakang lurus",
     "straight rear view, perfectly centred and symmetrical, camera at tail-light height",
     "very slow straight pull-back on the centre line",
     "a light line slides across the rear wing from left to right",
     "Penutup yang kuat: logo/akhir film di ruang kosong atas."),
    ("07-low-angle-hero", "Low angle hero",
     "low angle front three-quarter view, camera close to the floor looking slightly up",
     "slow pedestal rise, the camera lifts gently while staying aimed at the car",
     "a broad light sweep crosses the whole body from front to rear",
     "Terasa gagah dan mahal. Jaga agar mobil tidak terdistorsi lensa lebar."),
    ("08-atas", "Atas (top-down)",
     "top-down view from directly above, the whole car centred in the frame",
     "very slow straight descent toward the roof",
     "the light strip moves across the roof and bonnet from front to rear",
     "Bentuk keseluruhan dari atas; dipakai sebagai peta untuk blueprint."),
    ("09-macro-lampu", "Macro lampu depan",
     "close-up of the headlight and front intake, filling the frame",
     "ultra-slow straight micro-pan from left to right",
     "a thin light streak glides across the headlight lens and paint edge",
     "Gambar awal = CROP foto asli, jangan zoom dari foto full-body."),
    ("10-macro-velg", "Macro velg & rem",
     "close-up of the front wheel and brake caliper, filling the frame",
     "ultra-slow straight micro-pan, wheel stays still",
     "a soft light streak glides across the spokes and caliper",
     "Velg paling sering meleleh: motion strength rendah, wajib 'wheels not turning'."),
    ("11-macro-sayap", "Macro sayap belakang",
     "close-up of the rear wing and its swan-neck mount, filling the frame",
     "ultra-slow straight micro-pan along the wing",
     "a light streak runs along the wing edge",
     "Pas untuk info downforce."),
    ("12-macro-karbon", "Macro karbon",
     "close-up of the carbon fibre bonnet weave meeting the paint edge",
     "ultra-slow straight micro-pan",
     "a soft light streak reveals the carbon weave",
     "Tekstur = rasa mahal. Dipakai 1 detik saja."),
]

# Transisi antar sudut: butuh fitur start frame + end frame (Kling, Seedance, dll.)
TRANSISI = [
    ("13-transisi-depan-ke-samping", "Transisi depan 3/4 → samping kiri",
     "01-depan-3-4-kiri", "03-samping-kiri"),
    ("14-transisi-samping-ke-belakang", "Transisi samping kanan → belakang 3/4",
     "04-samping-kanan", "05-belakang-3-4-kanan"),
]

PENGATURAN = """| Pengaturan | Nilai |
|---|---|
| Rasio | 9:16 |
| Durasi | 5 detik (pakai potongan terbaik 1–2 detik) |
| Motion strength | 3/10–4/10 |
| Creativity / Relevance | Strict / Relevance |
| Negative prompt | isi dari `00-negative.md` |"""

CEK = """## Cek hasil (buang kalau salah satu gagal)
- [ ] Bentuk mobil sama dengan referensi dari awal sampai akhir klip
- [ ] Velg, lampu, badge tidak berubah atau meleleh
- [ ] Studio, lantai, dan arah cahaya sama dengan sudut lain
- [ ] Sepertiga atas tetap kosong untuk teks
- [ ] Kamera halus, tanpa goyang atau orbit"""


def komposisi(nama):
    return KOMPOSISI_MACRO if "macro" in nama else KOMPOSISI


def gambar_prompt(nama, sudut):
    return f"{MOBIL}. {KUNCI}. {sudut}. {DIAM}. {STUDIO}. {komposisi(nama)}."


def video_prompt(nama, gerak, cahaya):
    dof = " Shallow depth of field, tactile surface texture." if "macro" in nama else ""
    return (f"{KUNCI}. {DIAM} in a {STUDIO}. Camera: {gerak}, smooth and steady, no orbit. "
            f"Light: {cahaya}, creating elegant specular highlights across the {WARNA}.{dof} "
            f"{komposisi(nama)}. Luxury flagship presentation, commercial grade cinematography.")


def main():
    out = Path(__file__).parent
    (out / "00-negative.md").write_text(
        f"# Negative prompt (sama untuk semua file)\n\n```text\n{NEGATIVE}\n```\n")

    for nama, judul, sudut, gerak, cahaya, catatan in SUDUT:
        teks = f"""# {judul}

{catatan}

## Langkah 1 — Gambar awal ({"image, referensi = CROP foto asli di bagian ini" if "macro" in nama else "image, pakai foto asli sebagai referensi"})

```text
{gambar_prompt(nama, sudut)}
```

## Langkah 2 — Video (image-to-video, gambar awal = hasil langkah 1)

```text
{video_prompt(nama, gerak, cahaya)}
```

{PENGATURAN}

{CEK}
"""
        (out / f"{nama}.md").write_text(teks)

    for nama, judul, awal, akhir in TRANSISI:
        teks = f"""# {judul}

Pakai fitur **start frame + end frame**. Start = gambar awal `{awal}.md`, end = gambar awal `{akhir}.md`.
Kedua gambar harus dari studio dan cahaya yang sama, kalau tidak AI akan mengarang di tengah.

```text
{KUNCI}. {DIAM} in a {STUDIO}. Camera: one slow, smooth, continuous arc from the start frame to the end frame at constant height, steady, no shake. Light stays fixed in the studio while the reflections slide across the {WARNA}. {KOMPOSISI}. Luxury flagship presentation, commercial grade cinematography.
```

{PENGATURAN}

{CEK}
- [ ] Bagian tengah busur tidak mengarang detail baru (paling sering gagal; generate beberapa kali)
"""
        (out / f"{nama}.md").write_text(teks)

    print(f"{len(SUDUT) + len(TRANSISI) + 1} file prompt ditulis ke {out}")


if __name__ == "__main__":
    main()
