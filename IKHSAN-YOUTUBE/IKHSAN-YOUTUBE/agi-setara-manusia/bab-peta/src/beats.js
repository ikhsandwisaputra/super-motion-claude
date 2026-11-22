// Bab Peta · Tiga Anak Tangga + Empat Bagian — times (VO seconds of take agi_vo_ahmad_03 v2, 60.32 s, tools/words.py 03), hits, SFX, bed.
// Strict JSON inside (tools/mix_chapter.py reads it too). Film time = VO time + VOFF. Anchors: "beat+-s" or absolute seconds. No curly braces in these comments.
// Bed = voxscape (pembagian BRIEF-BAB; NARASI Ahri menulis Vastness, tapi Vastness dipakai bab-1/bab-4/bab-5). Whoosh Ahri 1492 di perpindahan ke tangga film.
export default {
  "VO": "03", "VOFF": 0.4, "END": 60.32, "TAIL": 2.8, "HITDB": -7,
  "V": {
    "mulai": 0.0, "tiga": 2.40, "anak": 2.72, "tangga": 3.04, "ai": 3.36,
    "anak1": 4.32, "aisempit": 5.60, "sempit": 6.16, "jago": 7.56, "satu": 7.88,
    "misalnya": 8.80, "penyaring": 9.52, "spam": 10.08, "komputer": 11.68, "catur": 12.64,
    "anak2": 13.60, "agi": 14.96, "singkatan": 16.08, "artificial": 16.96, "general": 17.84, "intel": 18.32,
    "kata": 19.36, "general2": 20.32, "artinya": 21.24, "umum": 21.92, "serba": 22.68,
    "bayangkan": 23.68, "karyawan": 24.20, "belajar": 25.60, "pekerjaan": 26.00, "apa": 26.56,
    "pindah": 27.56, "bagian": 28.24, "mana": 28.56, "tanpa": 29.56, "sekolah": 30.16, "nol": 31.36,
    "anak3": 32.08, "kecerdasan": 33.36, "super": 34.24, "superint": 36.16,
    "mampu": 37.60, "melampaui": 38.56, "manusia": 39.04, "semua": 40.16,
    "nah": 41.28, "chatgpt": 41.96, "gemini": 42.96, "meta": 44.08, "hp": 46.48,
    "kira": 47.25, "tanggaq": 49.01, "manaq": 49.44,
    "kita": 50.36, "naiki": 50.60, "lima": 52.16, "definisi": 53.28, "sejarah": 54.40, "lemah": 55.80, "posisi": 57.04,
    "november": 58.64, "puncak": 60.0
  },
  "HITS": [["cvo1", "anak2+0.05", 0.85], ["shD", "anak3+0.05", 0.8], ["stk1", "kita+0.05", 0.55]],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 20, "rms": -30, "duck": 0.55, "fin": 2.0, "fout": 2.2, "gaps": [["kira-0.2", 0.9]] },
  "SFX": [
    ["mulai+0.1", "rise:1.6", -26, 0],
    ["tiga-0.04", "thud", -18, -0.4], ["anak-0.04", "thud", -19, 0], ["tangga-0.04", "thud", -17, 0.4], ["tangga+0.12", "strike", -20, 0.1], ["ai", "pop", -22, 0],
    ["anak1-0.35", "travel", -20, 0], ["aisempit", "slide", -22, -0.3], ["sempit", "thud", -17, -0.2], ["jago", "ticks:8:0.5", -27, 0.3], ["satu", "pop", -18, -0.4],
    ["misalnya-0.35", "whoosh:0.5", -21, 0.4], ["penyaring", "cards:6:1.4", -25, -0.4], ["spam", "click", -18, -0.4], ["spam+0.3", "swish", -22, -0.6],
    ["komputer-0.1", "slide", -21, 0.4], ["catur", "click", -19, 0.4],
    ["anak2-0.35", "rise:0.7", -21, 0], ["agi", "impact", -14, 0], ["artificial", "whoosh:0.4", -22, 0], ["artificial+0.05", "keys:10:0.5", -26, -0.3],
    ["general", "thud", -16, 0], ["intel", "keys:12:0.5", -27, 0.3],
    ["kata-0.35", "travel", -20, 0.3], ["artinya", "keys:14:0.5", -27, -0.3], ["umum+0.02", "strike", -19, 0.1], ["serba", "ticks:8:0.6", -26, 0.2], ["serba+0.4", "pop", -21, 0.4],
    ["bayangkan-0.35", "whoosh:0.6", -20, -0.4], ["karyawan", "card", -20, -0.3], ["pekerjaan", "flaps", -24, 0.4], ["apa+0.02", "strike", -19, 0],
    ["pindah-0.35", "travel", -20, 0.4], ["pindah+0.1", "slide", -22, -0.4], ["bagian", "pop", -20, 0], ["mana", "pop", -20, 0.4],
    ["tanpa", "keys:20:0.9", -26, 0], ["nol", "strike", -17, 0], ["nol+0.05", "thud", -18, 0],
    ["anak3-0.35", "rise:0.8", -21, 0], ["kecerdasan", "impact", -15, -0.3], ["kecerdasan+0.35", "card", -19, 0.5], ["super+0.3", "keys:16:0.5", -26, -0.3], ["superint+0.05", "swish", -22, 0.5],
    ["mampu-0.35", "travel", -20, -0.3], ["melampaui", "ticks:10:0.7", -25, 0], ["melampaui+0.35", "strike", -19, 0], ["manusia", "sub", -18, 0], ["semua", "pop", -21, 0.3],
    ["nah-0.35", "whoosh:0.6", -20, 0.4], ["nah+0.1", "card", -21, 0.4], ["chatgpt", "pop", -18, -0.4], ["gemini", "pop", -18, -0.3], ["meta", "pop", -18, -0.2], ["hp", "click", -19, 0.3],
    ["kira-0.35", "rise:1.0", -20, 0], ["kira", "pop", -22, -0.3], ["kira+0.93", "drop", -21, -0.3], ["tanggaq-0.12", "drop", -21, 0], ["tanggaq+0.1", "strike", -19, 0], ["manaq+0.48", "drop", -21, 0.3],
    ["kita-0.45", "f:cinematic-whoosh-fast-transition-1492:1.2", -16, 0], ["naiki+0.1", "slide", -22, -0.4], ["naiki+0.35", "ticks:14:0.7", -27, -0.4], ["lima", "card", -21, 0.3],
    ["definisi", "click", -18, -0.2], ["definisi-0.2", "rise:0.5", -27, 0], ["sejarah", "click", -18, -0.1], ["sejarah-0.2", "rise:0.5", -27, 0],
    ["lemah", "click", -18, 0], ["lemah-0.2", "rise:0.5", -27, 0], ["posisi", "click", -18, 0.1], ["posisi-0.2", "rise:0.5", -27, 0], ["posisi-0.15", "card", -20, 0.4],
    ["puncak-0.2", "rise:0.6", -26, 0], ["puncak", "thud", -17, 0], ["puncak+0.3", "impact", -19, 0], ["puncak+0.4", "drop", -20, 0.15]
  ]
}
