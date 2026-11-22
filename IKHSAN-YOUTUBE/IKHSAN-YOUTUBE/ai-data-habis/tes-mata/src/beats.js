// Tes "Mata Mesin" (ide #2, ai-data-habis) — Bab 1 (VO 04) 7.30–16.08 s:
// "Token itu potongan kecil tulisan, kira-kira sepotong kata. AI nyicil baca dunia per potongan ini, persis kayak kita makan nasi per suap."
// Negative VOFF = the test starts mid-take; VOCUT stops the take after "suap." ("Tahap" follows 30 ms later).
// Strict JSON inside. No curly braces in these comments.
export default {
  "VO": "04", "VOFF": -7.30, "VOCUT": 16.08, "END": 16.08, "TAIL": 0.7, "HITDB": -7,
  "V": { "token": 7.52, "itu": 7.84, "potongan": 8.24, "kecil": 8.56, "tulisan": 8.88, "kira": 9.65, "sepotong": 10.24, "kata": 10.60,
         "ai": 11.36, "nyicil": 11.80, "baca": 12.12, "dunia": 12.40, "per": 12.80, "potongan2": 12.96, "ini": 13.36,
         "persis": 14.00, "kayak": 14.36, "kita": 14.56, "makan": 14.80, "nasi": 15.04, "per2": 15.36, "suap": 15.52 },
  "HITS": [],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 0, "rms": -31, "duck": 0.55, "fin": 0.5, "fout": 0.6, "gaps": [] },
  "SFX": [
    ["token-0.06", "swish", -21, -0.3],
    ["token-0.02", "keys:7:0.55", -25, 0],
    ["potongan-0.06", "ticks:6:0.55", -23, 0.1],
    ["kira-0.05", "travel", -20, 0],
    ["sepotong-0.02", "click", -19, -0.1],
    ["kata-0.02", "click", -19, 0.1],
    ["ai-0.16", "whoosh", -16, 0],
    ["ai+0.28", "thud", -21, 0],
    ["nyicil-0.12", "keys:16:1.9", -25, 0],
    ["nyicil-0.1", "rise:1.9", -25, 0],
    ["makan-0.2", "travel", -20, 0],
    ["nasi-0.06", "card", -18, -0.15],
    ["nasi-0.02", "sub", -22, 0],
    ["per2-0.04", "pop", -20, -0.2],
    ["suap-0.02", "pop", -19, 0.2],
    ["suap+0.28", "swish", -25, 0]
  ]
}
