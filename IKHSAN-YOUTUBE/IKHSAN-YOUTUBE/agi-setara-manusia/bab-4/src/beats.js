// Bab 4 · November 2026, seberapa dekat? — times (VO seconds of agi_vo_ahmad_07, 135,8 s after the 2026-11-17 trim (ends on "siapa yang benar?"); tools/words.py 07), hits, SFX, bed.
// Strict JSON inside (tools/mix_chapter.py reads it too). Film time = VO time + VOFF. Anchors: "beat±s" or absolute seconds. No curly braces in these comments.
// Bed: fallen-asper from 100 s = its calmest span (high-band flux 0,6–1,3 per 10 s, measured), gaps before the four punchlines.
// SFX offsets mirror the visual event times in film.js (same "beat+offset"), so every action has its sound.
export default {
  "VO": "07", "VOFF": 0.4, "END": 136.4, "TAIL": 0.9, "HITDB": -7,
  "V": {
    "dari": 0.08, "satu": 0.76, "melompat": 2.28, "tangga": 3.44, "bulan": 4.88,
    "sept": 5.68, "astra": 7.28, "mencetak": 8.64, "enam": 9.28, "persen1": 10.48, "pemb1": 11.20, "standar1": 11.68,
    "tanggal": 12.56, "nov9": 13.32, "fable": 14.16, "anthropic": 15.68, "meraih": 16.24, "delapan": 16.64, "persen2": 18.08,
    "sehari": 18.88, "gemini": 20.00, "google": 21.28, "menyusul": 21.76, "enam2": 22.40, "persen3": 23.68,
    "dengan": 24.48, "pemb2": 24.80, "pembuatnya": 25.52, "ketiganya": 26.88, "tembus": 27.44, "s97": 28.36, "persen4": 28.72,
    "nah": 30.12, "pemb3": 31.12, "istilah": 32.13, "harness": 33.20, "program": 34.16, "sekeliling": 35.04, "mengatur": 36.20,
    "soal": 36.96, "alat": 38.32, "dipakai": 39.60,
    "bayangkan": 40.53, "koki": 41.20, "rendang": 42.00, "dapur": 42.88,
    "di1": 43.64, "panitia": 44.00, "standar2": 45.52, "di2": 46.20, "sendiri": 46.72, "tata": 48.36, "hasilnya": 50.24, "beda": 51.04,
    "padahal": 51.84, "kokinya": 52.48, "sama": 52.96,
    "arc": 53.64, "mengklaim": 55.04, "agi1": 55.76, "chollet": 56.60, "bukan": 57.96, "agi2": 58.64, "mengakui": 59.73, "lebih": 60.88, "dugaannya": 61.76,
    "penggaris": 62.69, "metr": 64.16, "mengukur": 65.09, "panjang": 66.00, "agen": 68.16, "yaitu": 69.12, "menjalankan": 70.16, "sendiri2": 71.52,
    "panjangnya": 72.24, "diukur": 72.72, "ahli": 74.20, "peluang": 76.24, "berhasil": 76.88, "separuh": 78.08,
    "agustus": 78.88, "gpt5": 80.72, "dua": 82.72, "menit": 83.57, "maret": 84.32, "claude2": 86.56, "mythos": 86.88, "enambelas": 88.80, "jam16": 89.00,
    "enam3": 89.88, "hari": 91.60, "kantoran": 92.04, "trennya": 93.00, "berlipat": 93.44, "tujuh": 95.04,
    "tapi": 95.88, "metr2": 96.48, "atas": 97.52, "alatukur": 98.72, "belum": 99.68, "andal": 99.92,
    "lalu": 100.68, "tokoh": 101.52, "bagaimana": 102.16,
    "greg": 103.00, "pendiri": 104.40, "mengaku": 105.60, "pribadi": 106.40, "kita": 107.52, "sampai": 108.28,
    "sam": 108.96, "time": 110.32, "belum2": 111.92, "tapi2": 112.61, "sebelum": 113.60, "habis": 114.40, "sistem": 116.24, "layak": 117.36, "agi3": 118.24,
    "seberang": 119.16, "yann": 120.08, "ilmuwan": 121.08, "keluar": 122.32, "meta": 123.08, "yakin": 123.52, "chatgpt": 125.84, "bukan2": 126.80,
    "jalan": 127.20, "setara": 128.32, "manusia": 128.80,
    "beliau": 129.60, "mendirikan": 130.20, "ami": 130.80, "membuktikan": 132.05, "lain": 133.12,
    "jadi": 133.64, "siapa": 134.32, "benar": 134.80
  },
  "HITS": [["stk1", "tanggal-0.12", 0.85], ["cmc2", "bayangkan-0.05", 0.85], ["shD", "penggaris-0.05", 0.8], ["cvo1", "lalu-0.08", 0.85], ["ldr1", "jadi-0.08", 0.85]],
  "BED": { "file": "stok:mixkit-musik-fallen-asper-565.mp3", "ss": 100, "rms": -30, "duck": 0.55, "fin": 2.5, "fout": 2.5,
    "gaps": [["tembus-0.2", 0.9], ["sama-0.15", 0.8], ["andal-0.1", 0.9], ["benar-0.1", 0.8]] },
  "SFX": [
    ["dari-0.1", "rise:1.2", -25, 0], ["dari+0.25", "cards:7:0.45", -28, 0], ["satu+0.1", "pop", -20, -0.3],
    ["melompat", "whoosh:0.5", -22, 0.2], ["melompat+0.5", "thud", -18, 0.2], ["tangga", "ticks:6:0.5", -28, 0], ["bulan", "slide", -24, 0],

    ["sept-0.35", "travel", -20, 0], ["sept+0.15", "card", -20, -0.3], ["mencetak", "ticks:10:0.8", -28, 0.3], ["persen1", "impact", -16, 0.3],
    ["standar1", "strike", -21, 0],

    ["tanggal", "f:industrial-machine-hum:17", -38, 0],
    ["tanggal-0.35", "travel", -20, 0], ["tanggal+0.15", "slide", -23, -0.3],
    ["fable+0.4", "card", -20, -0.2], ["meraih+0.4", "slide", -22, 0], ["meraih+0.45", "ticks:10:0.45", -27, 0], ["delapan+0.4", "drop", -19, 0.2],
    ["persen2+0.4", "pop", -18, 0.2],
    ["gemini+0.4", "card", -20, -0.2], ["menyusul+0.4", "slide", -22, 0], ["menyusul+0.45", "ticks:10:0.45", -27, 0], ["enam2+0.4", "drop", -19, 0.2],
    ["persen3+0.4", "pop", -18, 0.2],
    ["pemb2", "whoosh:0.5", -22, 0.5], ["pemb2+0.15", "thud", -15, 0.4], ["pemb2+0.2", "ticks:12:0.6", -25, 0.4],
    ["pembuatnya+0.1", "thud", -16, 0.3], ["pembuatnya+0.15", "ticks:12:0.6", -25, 0.3],
    ["pembuatnya+0.7", "thud", -16, 0.2], ["pembuatnya+0.75", "ticks:12:0.6", -25, 0.2],
    ["ketiganya", "card", -21, 0.5], ["tembus", "sub", -20, 0], ["s97+0.4", "strike", -18, 0],

    ["nah-0.35", "travel", -20, 0], ["nah+0.1", "pop", -19, 0], ["harness", "strike", -20, 0], ["program", "swish", -23, -0.3],
    ["soal", "swish", -23, 0.3], ["alat", "swish", -23, -0.2], ["dipakai", "click", -22, 0],

    ["bayangkan-0.4", "whoosh:0.6", -21, 0], ["koki", "pop", -21, 0], ["dapur", "slide", -23, 0],

    ["di1-0.35", "travel", -20, 0], ["panitia", "card", -21, -0.4], ["standar2", "click", -22, -0.4], ["di2", "card", -21, 0.4],
    ["tata", "cards:4:0.4", -25, 0.4], ["hasilnya", "swish", -23, 0], ["sama", "strike", -17, 0],

    ["arc-0.3", "whoosh:0.8", -23, 0], ["mengklaim", "strike", -21, 0], ["chollet+0.3", "swish", -24, 0],
    ["bukan", "pop", -20, -0.3], ["lebih", "pop", -20, 0.3], ["dugaannya", "click", -23, 0],

    ["penggaris-0.4", "rise:0.8", -24, 0], ["penggaris+0.1", "whoosh:0.8", -23, 0], ["metr", "strike", -21, 0], ["panjang", "strike", -21, 0],
    ["panjang+1.8", "swish", -24, 0], ["agen", "pop", -20, 0], ["menjalankan", "keys:8:1.0", -27, 0],

    ["panjangnya-0.35", "travel", -20, 0], ["ahli", "pop", -21, 0], ["ahli+0.1", "f:big-old-clock-ticking:1.8", -27, 0],
    ["peluang", "cards:5:0.5", -25, 0], ["separuh", "strike", -20, 0],

    ["agustus-0.4", "rise:0.8", -24, 0], ["agustus", "slide", -22, -0.3], ["gpt5", "pop", -20, -0.3], ["dua", "f:ticking-timer:1.0", -22, -0.3],
    ["menit+0.2", "thud", -19, -0.3], ["maret", "slide", -22, 0.3], ["mythos", "pop", -20, 0.3], ["enambelas-0.6", "f:ticking-timer:1.0", -22, 0.3],
    ["jam16", "impact", -15, 0.3],

    ["enam3-0.35", "travel", -20, 0], ["hari", "ticks:16:0.8", -27, 0], ["kantoran", "strike", -20, 0], ["berlipat", "cards:5:0.6", -25, 0],
    ["tujuh", "pop", -20, 0],

    ["tapi-0.35", "travel", -20, 0], ["atas", "slide", -22, 0], ["alatukur", "crack", -18, 0.2], ["andal", "strike", -17, 0],

    ["lalu-0.4", "rise:0.8", -23, 0], ["tokoh", "pop", -21, -0.4], ["tokoh+0.4", "pop", -21, 0], ["tokoh+0.8", "pop", -21, 0.4],

    ["greg-0.35", "whoosh:0.6", -21, 0], ["greg+0.1", "slide", -22, 0], ["mengaku", "click", -23, 0], ["kita", "card", -21, 0], ["sampai", "strike", -19, 0],

    ["sam-0.35", "travel", -20, 0], ["time", "card", -19, -0.4], ["belum2", "thud", -17, 0.3], ["sebelum", "keys:12:2.0", -27, 0.3],
    ["layak", "strike", -20, 0.3],

    ["seberang-0.35", "whoosh:0.6", -21, 0], ["yann", "slide", -22, 0], ["keluar", "card", -22, 0], ["chatgpt", "pop", -21, 0],
    ["jalan", "strike", -18, 0], ["manusia", "click", -23, 0],

    ["beliau-0.35", "travel", -20, 0], ["ami", "impact", -17, 0], ["membuktikan", "swish", -23, 0],

    ["jadi-0.4", "rise:1.0", -22, 0], ["siapa", "pop", -20, 0], ["benar", "thud", -18, 0]
  ]
}
