// Penutup — times (VO seconds of ivs_vo_ahmad_08), transition hits, SFX, music bed. Strict JSON inside: tools/mix_chapter.py reads it too.
export default {
  "VO": "08", "VOFF": 0.3, "END": 43.36, "TAIL": 5.0, "HITDB": -7,
  "V": {
    "jadi": 0.00, "sejauh": 0.56, "jarak": 1.28,
    "di": 2.11, "hulu": 2.52, "lab": 3.27, "paten": 4.56, "peneliti": 5.26, "jaraknya": 6.20, "belasan": 6.68, "ratusan": 7.64, "kali": 8.08,
    "hilir": 8.94, "cara": 9.47, "memakai": 10.28, "kita": 11.68, "bersaing": 12.38, "bahkan": 13.08, "memimpin": 13.58,
    "menurutku": 14.62, "dikejar": 15.89, "jelas": 16.48, "riset": 17.10, "swasta": 18.85, "lebih": 19.53, "peneliti2": 20.44,
    "internet": 21.40, "layak": 22.22, "matematika": 22.94, "sekolah": 24.14,
    "tulis": 25.02, "komentar": 25.72, "yang": 26.36, "dikejar2": 27.07, "duluan": 27.50, "blank": 28.20, "plus": 28.46, "kalimat": 29.56,
    "lain": 30.80, "kamu": 31.90, "memindai": 32.22, "qr": 32.80, "gerobak": 33.24, "bakso": 33.60, "ingat": 34.20, "salah": 35.36,
    "teknologi": 36.14, "buatan": 36.77, "kita2": 37.20, "dibahas": 38.38, "laporan": 39.00, "resmi": 39.49, "amerika": 39.83,
    "video": 40.73, "berikutnya": 41.24, "menunggu": 42.14, "layar": 42.62
  },
  "HITS": [["shD", "menurutku-0.1", 0.85], ["stk1", "lain-0.1", 0.85], ["ldr1", "video-0.05", 0.7]],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 150, "rms": -30, "duck": 0.55, "fin": 2.5, "fout": 4.5, "gaps": [["ingat-0.15", 0.8]] },
  "SFX": [
    ["menunggu+0.4", "pop", -22, -0.4], ["menunggu+1.86", "click", -14, -0.3], ["menunggu+2.11", "pop", -26, -0.2], ["menunggu+2.91", "click", -16, -0.2],
    ["jadi", "rise:1.0", -27, 0], ["jarak", "strike", -22, 0],
    ["di-0.35", "travel", -20, -0.4], ["hulu+0.1", "whoosh:0.9", -27, -0.5],
    ["lab", "pop", -18, -0.6], ["paten", "pop", -18, -0.5], ["peneliti", "pop", -18, -0.4],
    ["belasan", "slide", -21, -0.3], ["kali", "thud", -15, -0.3],
    ["hilir-0.35", "whoosh:0.8", -19, 0.5], ["memakai", "pop", -18, 0.3], ["bersaing", "pop", -18, 0.5],
    ["memimpin", "impact", -14, 0.4], ["memimpin+0.05", "pop", -17, 0.4], ["bahkan-0.1", "rise:0.8", -24, 0],
    ["menurutku-0.35", "travel", -20, 0.4],
    ["riset", "slide", -22, -0.2], ["swasta+0.25", "click", -14, -0.3],
    ["lebih", "slide", -22, -0.2], ["peneliti2+0.25", "click", -14, -0.3],
    ["internet", "slide", -22, -0.2], ["layak+0.25", "click", -14, -0.3],
    ["matematika", "slide", -22, -0.2], ["sekolah+0.25", "click", -14, -0.3], ["sekolah+0.3", "thud", -18, 0],
    ["tulis-0.35", "travel", -20, -0.4], ["yang", "cards:6:0.5", -26, 0], ["duluan+0.3", "slide", -23, 0],
    ["blank", "keys:10:0.5", -25, 0.1], ["blank+1.2", "keys:14:0.5", -25, 0.1], ["blank+2.4", "keys:10:0.4", -26, 0.1],
    ["plus", "card", -20, -0.2],
    ["kamu", "slide", -21, 0.5], ["memindai", "swish", -20, 0], ["qr", "click", -13, 0],
    ["ingat", "thud", -15, 0], ["buatan", "impact", -15, 0], ["buatan+0.05", "pop", -18, 0],
    ["dibahas", "card", -18, 0.5], ["laporan", "strike", -20, 0.5],
    ["video-0.45", "rise:1.4", -22, 0], ["video+0.8", "whoosh:2.2", -25, 0]
  ]
};
