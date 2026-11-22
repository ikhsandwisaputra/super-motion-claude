// Tes 3 dtk · batam-swro-data-center · "Data di Awan -> Air Laut" + "Membran Tekanan Osmosis" + WebGL2 Ripple/Caustic.
// Belum ada take VO: VOFILE = build/sunyi.wav, waktu V = detik film langsung (VOFF 0). Gambar + SFX + bed tenang.
// Strict JSON inside. No curly braces in these comments.
export default {
  "VO": "00", "VOFILE": "build/sunyi.wav", "VOFF": 0.0, "END": 6.8, "TAIL": 0.4, "HITDB": -8,
  "V": { "awan": 0.12, "buka": 0.65, "air": 0.80, "rp600": 1.10, "masuk": 2.45, "pompa": 2.95, "tekan": 3.50, "lolos": 3.85, "brine": 4.35 },
  "HITS": [],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 2, "rms": -31, "duck": 0.55, "fin": 0.4, "fout": 0.6, "gaps": [["tekan-0.08", 0.45]] },
  "SFX": [
    ["awan", "pop", -22, 0],
    ["buka", "click", -16, 0],
    ["buka+0.03", "swish", -21, 0],
    ["air", "strike", -20, 0.1],
    ["rp600", "drop", -19, 0.2],
    ["masuk-0.28", "travel", -18, 0],
    ["pompa", "slide", -20, -0.3],
    ["tekan", "thud", -15, -0.1],
    ["tekan+0.04", "impact", -18, 0],
    ["lolos", "whoosh:0.55", -20, 0.2],
    ["brine", "card", -21, 0.2],
    ["brine+0.12", "ticks:8:0.45", -25, 0.2]
  ]
}
