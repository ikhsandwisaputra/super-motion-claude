// Penutup · Palu Manusia, Komentar & Layar Akhir — v2 (VO take 09 eleven_v3, 45.52 s + VOFF 0.35 + TAIL 16.00 -> 62.10 s)
// End Screen right-half clean >= 22.6 s (39.47 s -> 62.10 s). Zero silent hits (ddt/tva banned).
export default {
  "VO": "09", "VOFF": 0.35, "END": 45.75, "TAIL": 16.00, "HITDB": -5.5,
  "V": {
    "kesimpulan": 0.00,
    "skor": 5.01,
    "palu": 6.30,
    "sakelar": 7.86,
    "dipegang": 10.29,
    "opini": 11.96,
    "bagus": 17.84,
    "pemeriksa": 20.80,
    "penting": 23.25,
    "giliran": 24.28,
    "bankRS": 26.86,
    "keputusan": 30.05,
    "wajib": 32.04,
    "tulis": 34.34,
    "komentar": 35.58,
    "bagikan": 36.64,
    "tonton": 39.12,
    "setara": 43.18,
    "layar": 44.44
  },
  "HITS": [
    ["stk1", "opini-0.02", 0.80],
    ["hw2", "giliran-0.02", 0.82],
    ["stk2", "tonton-0.05", 0.84]
  ],
  "BED": {
    "file": "stok:mixkit-musik-voxscape-571.mp3",
    "ss": 64,
    "rms": -30,
    "duck": 0.54,
    "fin": 1.2,
    "fout": 4.2,
    "loop": true
  },
  "SFX": [
    ["kesimpulan-0.1", "whoosh:0.6", -17, 0],
    ["skor", "ticks:5:0.7", -21, -0.2],
    ["palu-0.03", "impact", -13, -0.25],
    ["sakelar-0.02", "click", -14, 0.25],
    ["sakelar+0.06", "thud", -15, 0.25],
    ["dipegang", "pop", -16, 0],
    ["opini-0.25", "travel", -18, 0],
    ["opini+0.05", "card", -17, 0],
    ["bagus", "pop", -17, -0.2],
    ["pemeriksa", "thud", -15, 0],
    ["penting", "strike", -16, 0],
    ["giliran-0.25", "travel", -18, -0.3],
    ["bankRS", "cards:2:0.4", -18, -0.25],
    ["keputusan", "slide", -19, -0.2],
    ["wajib", "pop", -16, -0.2],
    ["tulis", "keys:14:1.9", -20, -0.3],
    ["komentar", "click", -15, -0.3],
    ["bagikan", "pop", -16, -0.25],
    ["tonton-0.25", "whoosh:0.6", -17, 0.2],
    ["setara", "slide", -18, 0.3],
    ["layar", "card", -16, 0.3]
  ]
}
