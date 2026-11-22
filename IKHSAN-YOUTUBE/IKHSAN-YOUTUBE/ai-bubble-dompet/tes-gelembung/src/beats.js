// Tes 3 detik "Gelembung pecah" — Bab 1 (VO 04) 28.0–33.3 s: "gelembung itu muncul pas harga sesuatu udah jauh lebih mahal dari nilai aslinya."
// Negative VOFF = the test starts mid-take (film 0 = VO 28.0). Pumps on harga / jauh / mahal, tremble on dari, pop on nilai, NILAI ASLI on aslinya.
// Strict JSON inside. No curly braces in these comments.
export default {
  "VO": "04", "VOFF": -28.0, "END": 33.3, "TAIL": 0.75, "HITDB": -7,
  "V": { "gel": 28.39, "harga": 29.73, "jauh": 30.89, "mahal": 31.44, "dari": 31.85, "nilai": 32.12, "asli": 32.38 },
  "HITS": [],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 0, "rms": -30, "duck": 0.55, "fin": 0.6, "fout": 0.6, "gaps": [["nilai-0.2", 0.6]] },
  "SFX": [
    ["gel-0.05", "rise:0.45", -24, 0],
    ["harga-0.04", "rise:0.32", -21, -0.1],
    ["jauh-0.04", "rise:0.32", -20, 0.1],
    ["mahal-0.04", "rise:0.4", -19, 0],
    ["dari", "strike", -27, 0],
    ["nilai-0.03", "pop", -12, 0],
    ["nilai-0.03", "impact", -16, 0],
    ["nilai-0.02", "swish", -18, 0],
    ["nilai+0.05", "drops:6:0.5", -26, 0],
    ["asli", "click", -20, -0.2]
  ]
}
