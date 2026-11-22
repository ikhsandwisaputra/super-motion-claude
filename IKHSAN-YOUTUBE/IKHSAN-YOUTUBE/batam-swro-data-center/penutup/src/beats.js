// Bab Penutup — "Pendapatku & Giliranmu" (VO take 09, 36.88 s + End Screen AGI Video 4, total 51.15 s).
// Strict JSON inside (tools/mix_chapter.py reads it too). Film time = VO time + VOFF. Anchors: "beat±s" or absolute seconds. No curly braces in these comments.
// Subscribe & lonceng memakai click/pop non-tonal saja (TANPA bell/ting/chime).
export default {
  "VO": "09", "VOFF": 0.35, "END": 46.8, "TAIL": 4.0, "HITDB": -7,
  "V": {
    "pendapat": 0.07, "pribadi": 0.61,
    "mewajibkan": 1.44, "pusat": 2.08, "data": 2.32, "mengolah": 2.60, "laut": 3.20, "sendiri": 3.48,
    "jauh": 4.08, "lebih": 4.52, "adil": 4.80, "berebut": 6.24, "waduk": 6.64, "warga": 7.28,
    "syarat": 8.08, "satu": 8.88, "pengawasan": 9.60, "izin": 10.28,
    "pembuangan": 10.68, "garam": 11.44, "lautnya": 11.88, "terbuka": 13.52, "publik": 14.24,
    "nah": 15.08, "sekarang": 15.68, "giliran": 16.16, "kamu": 16.56, "berpendapat": 17.04,
    "tulis": 18.08, "komentar": 18.68, "kalau": 19.44, "daerahmu": 19.68, "lokasi": 20.84, "raksasa": 21.80,
    "syarat2": 22.64, "penting": 23.32, "apa": 24.24,
    "oh": 24.96, "iya": 25.12, "gedung": 25.84, "ai1": 26.16, "batam": 27.36, "pabrik": 28.05, "miliar": 29.44,
    "sebenarnya": 30.16, "ai2": 30.96, "sekarang2": 31.24, "setara": 31.84, "manusia": 32.16, "belum": 33.12,
    "tonton": 33.80, "video": 34.16, "agi": 35.20, "layar": 36.00
  },
  "HITS": [["cvo1", "syarat-0.25", 0.65], ["cvo2", "oh-0.12", 0.72]],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 150, "rms": -30, "duck": 0.55, "fin": 2.0, "fout": 4.2 },
  "SFX": [
    ["pendapat+0.25", "card", -22, -0.3],
    ["mewajibkan-0.1", "pop", -22, -0.3],
    ["laut", "drop", -23, -0.3],
    ["adil-0.05", "thud", -19, 0],
    ["berebut", "strike", -21, 0],
    ["waduk", "pop", -23, 0.3],
    ["syarat-0.3", "travel", -21, 0],
    ["izin", "card", -21, -0.3],
    ["garam", "card", -21, 0.3],
    ["terbuka-0.05", "thud", -19, 0.2],
    ["nah-0.55", "f:dramatic-whoosh-swing-cinematic:1.65", -20, 0],
    ["kamu", "thud", -20, -0.2],
    ["tulis-0.1", "card", -22, -0.3],
    ["kalau", "keys:18:1.8", -25, -0.3],
    ["kalau+0.45", "click", -16, -0.4],
    ["kalau+1.45", "click", -20, -0.2],
    ["kalau+1.48", "pop", -27, -0.2],
    ["raksasa-0.1", "keys:14:1.4", -25, -0.3],
    ["apa-0.1", "pop", -24, -0.3],
    ["oh+0.15", "card", -22, -0.3],
    ["setara-0.05", "thud", -21, -0.2],
    ["tonton-0.05", "swish", -22, 0.1],
    ["agi", "pop", -24, -0.1],
    ["layar", "pop", -24, 0.4]
  ]
}
