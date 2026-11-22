// Tes "Salinan Pudar" (ide #1, ai-data-habis) — Bab 4 (VO 07) 4.70–13.40 s:
// "Lembar pertama masih tajam. Lembar ketiga mulai buram. Pas lembar kesepuluh, tanda tangan di pojok udah ilang, tinggal noda abu-abu doang."
// Negative VOFF = the test starts mid-take (film 0 = VO 4.70). Copier clunk = salinan 1 lands; strobe of scan bars in the rush to 10.
// Strict JSON inside. No curly braces in these comments.
export default {
  "VO": "07", "VOFF": -4.70, "END": 13.40, "TAIL": 0.7, "HITDB": -7,
  "V": { "l1": 5.16, "pertama": 5.44, "tajam": 6.16, "l3": 6.93, "ketiga": 7.20, "buram": 8.08, "pas": 8.88, "sepuluh": 9.28,
         "tanda": 10.08, "pojok": 10.72, "ilang": 11.28, "tinggal": 12.00, "noda": 12.20, "abu": 12.48, "doang": 12.88 },
  "HITS": [],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 0, "rms": -31, "duck": 0.55, "fin": 0.5, "fout": 0.6, "gaps": [["ilang-0.25", 0.7]] },
  "SFX": [
    ["l1-0.02", "f:hit-copy-machine:0.5:1.6", -15, 0],
    ["l1-0.02", "swish", -22, 0.1],
    ["tajam-0.15", "swish", -23, -0.1],
    ["tajam+0.3", "swish", -24, 0.1],
    ["l3-0.03", "travel", -19, 0],
    ["l3+0.5", "thud", -22, 0],
    ["pas-0.2", "rise:0.9", -22, 0],
    ["pas-0.05", "ticks:7:1.05", -24, 0],
    ["pas+0.05", "travel", -18, 0],
    ["tanda-0.1", "thud", -17, 0],
    ["tanda-0.08", "slide", -21, 0.2],
    ["ilang-0.02", "strike", -21, 0.15],
    ["ilang+0.02", "sub", -20, 0],
    ["tinggal+0.1", "swish", -27, 0.2]
  ]
}
