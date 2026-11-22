// Bab Peta (VO abd_vo_ahmad_03, 35.3 s): three glass bubbles = the three questions, then the 4-route map to the wallet,
// the "edukasi" disclaimer, and the empty Papan Tersangka (NYATA vs KAMBING HITAM). Strict JSON inside. No curly braces in comments.
export default {
  "VO": "03", "VOFF": 0.3, "END": 35.28, "TAIL": 0.9, "HITDB": -7,
  "V": {
    "nah": 0.09, "tiga": 2.59, "hal": 2.85,
    "pertama": 3.52, "gelembung": 5.59, "itu": 6.14,
    "kedua": 7.04, "curiga": 8.27, "ai": 9.13, "gembung": 9.80,
    "ketiga": 11.42, "jalur": 12.14, "dompet": 14.49, "kita": 14.96,
    "ada": 16.02, "empat": 16.10, "harga": 17.18, "hp": 17.73, "bursa": 18.00, "saham": 18.41, "pusat": 19.56, "batam": 20.34, "startup": 21.07, "lokal": 21.58,
    "biar": 22.64, "edukasi": 25.26, "bukan": 26.40, "saham2": 27.97, "pun": 28.70,
    "tujuan": 29.09, "misahin": 30.48, "nyata": 32.56, "kambing": 34.31, "hitam": 34.73
  },
  "HITS": [["stk2", "kedua-0.12", 0.85], ["cmc1", "tujuan-0.1", 0.9]],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 20, "rms": -30, "duck": 0.55, "fin": 0.8, "fout": 0.8, "gaps": [["nyata-0.25", 0.5]] },
  "SFX": [
    [0.15, "rise:0.7", -25, 0],
    ["tiga", "pop", -17, -0.35], ["tiga+0.12", "pop", -18, 0], ["tiga+0.24", "pop", -17, 0.35],
    ["pertama-0.35", "whoosh:0.5", -22, 0.2],
    ["gelembung", "f:soap-bubble:0.9", -21, -0.2],
    ["curiga", "slide", -24, -0.2],
    ["gembung-0.05", "rise:0.35", -20, 0.2],
    ["ketiga-0.35", "rise:0.6", -22, 0],
    ["dompet", "click", -18, 0],
    ["dompet+0.05", "thud", -22, 0],
    ["ada-0.3", "travel", -22, 0],
    ["harga", "swish", -24, -0.3], ["bursa", "swish", -24, -0.1], ["pusat", "swish", -24, 0.1], ["startup", "swish", -24, 0.3],
    ["lokal+0.75", "drops:4:0.4", -24, 0.4],
    ["lokal+1.0", "thud", -21, 0.4],
    ["biar-0.32", "whoosh:0.5", -23, -0.2],
    ["edukasi", "click", -18, 0],
    ["bukan", "keys:10:0.9", -28, 0],
    ["saham2", "strike", -24, 0],
    ["tujuan+0.05", "flaps", -22, 0],
    ["nyata-0.3", "flaps", -21, -0.2],
    ["kambing-0.3", "flaps", -21, 0.1],
    ["hitam-0.25", "card", -19, 0.2]
  ]
}
