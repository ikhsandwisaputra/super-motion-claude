// Intro · "PATUH atau AKTING?" (VO app_vo_ahmad_01, 66.48 s + VOFF 0.45 + TAIL 1.20 -> 68.13 s)
export default {
  "VO": "01", "VOFF": 0.45, "END": 66.60, "TAIL": 1.20, "HITDB": -7,
  "V": {
    "kabar": 0.08,
    "akting": 3.20,
    "bayangkan": 5.25,
    "buku": 9.84,
    "rahasia": 14.72,
    "duaPintu": 19.76,
    "gratis": 24.32,
    "berbayar": 28.88,
    "melongo": 32.69,
    "puraPura": 36.72,
    "pengawasPergi": 41.36,
    "kokBisa": 46.14,
    "rnc": 50.16,
    "sumber": 52.56,
    "edukasi": 64.88
  },
  "HITS": [
    ["stk1", "bayangkan", 0.72],
    ["stk2", "duaPintu", 0.72],
    ["shD", "melongo", 0.75],
    ["cvo2", "kokBisa", 0.75],
    ["stk4", "rnc", 0.78]
  ],
  "BED": {
    "file": "stok:pixabay-musik-dark-ambient-sci-fi-documentary-268026.mp3",
    "ss": 0,
    "rms": -26,
    "duck": 0.45,
    "fin": 0.8,
    "fout": 2.0,
    "loop": true
  },
  "SFX": [
    ["kabar", "impact", -15, 0],
    ["akting", "strike", -17, 0],
    ["bayangkan", "travel", -19, -0.2],
    ["buku", "card", -18, 0.2],
    ["rahasia", "click", -19, -0.1],
    ["duaPintu", "thud", -17, 0],
    ["gratis", "pop", -19, -0.3],
    ["berbayar", "pop", -19, 0.3],
    ["melongo-0.1", "rise:0.5", -20, 0],
    ["melongo", "impact", -16, 0],
    ["puraPura", "keys:10:1.2", -22, 0.1],
    ["pengawasPergi", "slide", -19, 0],
    ["kokBisa", "whoosh:0.5", -18, 0],
    ["rnc", "thud", -16, 0],
    ["sumber", "cards:5:1.8", -21, 0],
    ["edukasi", "strike", -16, 0]
  ]
}
