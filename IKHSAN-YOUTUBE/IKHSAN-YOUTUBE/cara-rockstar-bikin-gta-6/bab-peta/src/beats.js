// Bab Peta · VO 03 (42.56 s). Film time = VO time + VOFF. Strict JSON inside (tools/mix_chapter.py reads it). No curly braces in these comments.
export default {
  "VO": "03", "VOFF": 0.4, "END": 42.9, "TAIL": 0.9, "HITDB": -7,
  "V": { "juta": 2.16, "kopi": 2.48, "ps": 4.40, "xbox": 5.36,
         "bayang": 6.40, "film": 7.60, "bulan": 9.52, "miliar": 11.36, "rock": 12.40, "terbit": 14.64,
         "tanya": 16.24, "mesin": 19.44, "ini": 20.40,
         "kita": 21.04, "empat": 22.12, "mulai": 23.68, "grafis": 25.36, "lalu": 27.56, "india": 30.72,
         "setelah": 32.00, "iklan": 35.44, "tv": 35.80, "akhir": 36.64, "streamer": 38.16, "indo": 39.68, "satu": 41.52 },
  "HITS": [["stk5", "bayang-0.12", 0.85], ["stk6", "tanya-0.1", 0.85], ["stk7", "kita-0.08", 0.85]],
  "BED": { "file": "stok:mixkit-musik-voxscape-571.mp3", "ss": 10, "rms": -30, "duck": 0.55, "fin": 1.6, "fout": 2.0, "gaps": [["rock-0.2", 0.7]] },
  "SFX": [
    ["juta-1.7", "f:Data_Counter_Loop:1.6", -25, 0],
    ["juta+0.1", "f:Dry_Hit_NoBell", -21, 0],
    ["ps-0.05", "slide", -22, -0.3],
    ["xbox-0.05", "slide", -23, 0.3],
    ["film-0.1", "cards:4:0.5", -25, 0],
    ["miliar", "ticks:8:0.6", -27, 0],
    ["rock-1.25", "f:Selam_Dive_Ramp:1.4", -18, 0],
    ["rock", "impact", -17, 0],
    ["rock+0.1", "f:aksa_24", -18, 0.4],
    ["rock+1.0", "f:aksa_08", -16, 0.4],
    ["tanya+0.35", "f:aksa_06", -19, 0.4],
    ["rock+7.32", "f:aksa_25", -20, 0.4],
    ["terbit-0.3", "ticks:6:0.9", -26, 0],
    ["mesin-0.05", "f:Blackout_Wave", -19, 0],
    ["empat-0.05", "drops:4:0.4", -21, 0],
    ["mulai-0.35", "travel", -20, -0.2],
    ["lalu-0.35", "travel", -20, 0.2],
    ["setelah-0.35", "travel", -20, -0.2],
    ["akhir-0.2", "travel", -20, 0.2],
    ["satu-0.05", "strike", -18, 0]
  ]
}
