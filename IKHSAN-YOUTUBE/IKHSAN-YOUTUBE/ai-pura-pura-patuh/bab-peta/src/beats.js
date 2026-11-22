// Bab Peta · 3 Teka-Teki Besar — v2 (VO take 03 eleven_v3, 22.32 s + VOFF 0.35 + TAIL 0.90 -> 23.75 s)
// Zero silent hits (ddt/tva banned). Verified loud hits: stk2, hw2, stk4.
export default {
  "VO": "03", "VOFF": 0.35, "END": 22.50, "TAIL": 0.90, "HITDB": -5.5,
  "V": {
    "hari": 0.00,
    "bedah": 0.76,
    "tiga": 1.20,
    "teka": 1.49,
    "layar": 2.78,
    "pertama": 4.29,
    "angka": 5.36,
    "melonjak": 6.60,
    "empatBelas": 7.33,
    "tujuhDelapan": 8.21,
    "kedua": 9.66,
    "lima": 10.70,
    "berbohong": 12.44,
    "interogasi": 13.25,
    "tombol": 14.85,
    "ketiga": 15.90,
    "cara": 17.01,
    "indonesia": 19.10,
    "melarang": 19.66,
    "palu": 21.02
  },
  "HITS": [
    ["stk2", "pertama-0.02", 0.85],
    ["hw2", "kedua-0.02", 0.85],
    ["stk4", "ketiga-0.02", 0.88]
  ],
  "BED": {
    "file": "stok:mixkit-musik-voxscape-571.mp3",
    "ss": 0,
    "rms": -30,
    "duck": 0.55,
    "fin": 1.0,
    "fout": 1.6,
    "loop": true
  },
  "SFX": [
    ["hari-0.15", "rise:0.8", -20, 0],
    ["bedah", "flaps", -22, 0],
    ["tiga-0.04", "impact", -14, 0],
    ["teka+0.05", "cards:3:0.35", -20, 0],
    ["layar", "swish", -19, 0.25],
    ["pertama-0.30", "travel", -18, -0.4],
    ["pertama+0.04", "card", -16, -0.3],
    ["angka", "ticks:6:0.7", -22, -0.2],
    ["melonjak-0.05", "rise:0.6", -20, 0],
    ["empatBelas", "pop", -17, -0.25],
    ["tujuhDelapan-0.02", "impact", -13, 0.2],
    ["tujuhDelapan+0.05", "sub", -18, 0],
    ["kedua-0.30", "travel", -18, 0.4],
    ["kedua+0.04", "card", -16, 0.3],
    ["lima", "drops:5:0.75", -18, 0.15],
    ["berbohong", "slide", -19, 0],
    ["interogasi", "ticks:5:0.7", -21, -0.2],
    ["tombol-0.03", "cut", -14, 0],
    ["tombol+0.04", "thud", -15, 0],
    ["ketiga-0.30", "travel", -18, -0.4],
    ["ketiga+0.04", "card", -16, -0.25],
    ["cara", "keys:8:0.8", -23, -0.2],
    ["indonesia", "slide", -19, 0.2],
    ["melarang", "strike", -16, 0],
    ["palu-0.03", "impact", -13, 0],
    ["palu+0.06", "sub", -17, 0]
  ]
}
