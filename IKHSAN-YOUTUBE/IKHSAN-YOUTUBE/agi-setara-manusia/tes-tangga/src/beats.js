// Tes 3 dtk · ide headline "Saklar Bisu -> Tangga" + "Penggaris Elastis" (agi-setara-manusia, sebelum VO ada).
// Belum ada take: VOFILE = build/sunyi.wav, waktu V = detik film langsung (VOFF 0). Gambar + SFX saja.
// Strict JSON inside. No curly braces in these comments.
export default {
  "VO": "00", "VOFILE": "build/sunyi.wav", "VOFF": 0.0, "END": 7.4, "TAIL": 0.4, "HITDB": -7,
  "V": { "klaim": 0.25, "klik": 0.95, "naik": 1.85, "tangga": 2.35, "naik2": 3.45, "model": 3.65, "ukur": 3.95, "jarum": 4.45,
         "vendor": 5.15, "tekan": 5.55, "sama": 6.45 },
  "HITS": [],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 0, "rms": -31, "duck": 0.55, "fin": 0.4, "fout": 0.6, "gaps": [["klik+0.05", 0.75]] },
  "SFX": [
    ["klaim", "keys:14:0.55", -27, 0],
    ["klik", "click", -12, 0],
    ["klik+0.02", "thud", -24, 0],
    ["naik-0.35", "rise:0.7", -21, 0],
    ["naik-0.05", "travel", -20, 0],
    ["tangga+0.02", "strike", -21, 0.1],
    ["naik2-0.3", "travel", -20, 0],
    ["model", "pop", -21, -0.2],
    ["ukur", "slide", -22, 0.1],
    ["ukur+0.1", "ticks:10:0.45", -27, 0.1],
    ["jarum", "drop", -19, 0],
    ["vendor", "slide", -21, 0.4],
    ["tekan", "thud", -18, 0.3],
    ["tekan+0.05", "ticks:12:0.6", -25, 0.2],
    ["sama", "card", -22, -0.2]
  ]
}
