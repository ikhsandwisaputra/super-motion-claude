// <Bab> — times (VO seconds of take VO: tools/words.py <VO> prints word@time), transition hits, SFX, music bed.
// Strict JSON inside (tools/mix_chapter.py reads it too). Film time = VO time + VOFF. Anchors: "beat±s" or absolute seconds. No curly braces in these comments.
export default {
  "VO": "04", "VOFF": 0.3, "END": 12.0, "TAIL": 0.9, "HITDB": -7,
  "V": { "satu": 0.0, "dua": 4.0, "tiga": 8.0, "kunci": 9.2 },
  "HITS": [["stk1", "dua-0.1", 0.85], ["cmc1", "tiga-0.07", 0.85]],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 0, "rms": -30, "duck": 0.55, "fin": 2.5, "fout": 2.5, "gaps": [["kunci-0.15", 0.8]] },
  "SFX": [
    ["satu+0.2", "pop", -22, 0],
    ["dua-0.4", "travel", -19, 0],
    ["tiga-0.4", "whoosh:0.6", -21, 0.2],
    ["kunci", "strike", -18, 0]
  ]
}
