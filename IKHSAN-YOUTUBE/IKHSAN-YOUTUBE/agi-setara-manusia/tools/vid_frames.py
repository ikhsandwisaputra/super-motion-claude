"""Cut Ahri's stock clips into frame runs for the chapter kit (plate() in kit/kit.js).
  python -I tools/vid_frames.py lab kabel …      → assets/vid/<name>/f_###.jpg (960×540, 15 fps) + assets/vid/vid.json
Re-cutting a clip: move its folder to assets/vid/_old/ first (stale frames would inflate n)."""
import json, subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; SRC = ROOT / 'assets/stok-situs'; OUT = ROOT / 'assets/vid'; FPS = 15
CLIPS = {  # agi-setara-manusia (16 Nov): every Ahri clip, auto-named; ss/len generic (1 s in, ≤ 6 s)
    'central_processor': ('a-central-processor-on-an-35977437', 1.0, 6.0),
    'child_mother': ('a-child-and-mother-bonding-over-7270074', 1.0, 6.0),
    'laptop_displays': ('a-laptop-displays-code-on-its-11274341', 1.0, 6.0),
    'man_irons': ('a-man-irons-clothes-on-an-5901671', 1.0, 6.0),
    'robot_dances': ('a-robot-dances-rhythmically-8084504', 1.0, 6.0),
    'animated_journey': ('animated-journey-through-a-31301243', 1.0, 6.0),
    'barista_skillfully': ('barista-skillfully-pours-water-40047520', 0.6, 5.31),
    'busy_night': ('busy-night-traffic-on-jakarta-s-37589611', 1.0, 6.0),
    'child_engaging': ('child-engaging-in-creative-play-7270073', 0.68, 6.0),
    'hand_making': ('close-up-of-a-hand-making-a-6687506', 0.63, 5.55),
    'humanoid_robot': ('close-up-of-a-humanoid-robot-5854603', 0.9, 6.0),
    'hands_typing': ('close-up-of-hands-typing-on-a-4352275', 1.0, 6.0),
    'metal_hard': ('close-up-of-metal-hard-drives-in-38496193', 0.75, 6.0),
    'neatly_stacked': ('close-up-of-neatly-stacked-8346823', 1.0, 6.0),
    'pour_coffee': ('close-up-of-pour-over-coffee-8447242', 0.96, 6.0),
    'network_cables': ('close-up-shot-of-network-cables-1085656', 1.0, 6.0),
    'hand_holding': ('close-up-view-of-a-hand-holding-12611453', 0.65, 5.73),
    'hands_typing2': ('close-up-view-of-hands-typing-on-31183719', 1.0, 6.0),
    'electronic': ('detailed-close-up-of-electronic-6754820', 1.0, 6.0),
    'programming': ('detailed-view-of-programming-29458457', 1.0, 6.0),
    'server_units': ('detailed-view-of-server-units-7140928', 0.94, 6.0),
    'dynamic_traffic': ('dynamic-traffic-in-central-37438592', 0.9, 6.0),
    'efficient_folding': ('efficient-folding-of-denim-jeans-6961718', 1.0, 6.0),
    'futuristic_robot': ('futuristic-robot-demonstrates-8084617', 1.0, 6.0),
    'hands_typing3': ('hands-typing-on-a-laptop-in-a-4841394', 1.0, 6.0),
    'high_tech': ('high-tech-robotic-arm-operating-32386532', 0.99, 6.0),
    'robotic_arm': ('robotic-arm-in-warehouse-stacks-16938947', 1.0, 6.0),
    'showcase_cutting': ('showcase-of-cutting-edge-8084493', 1.0, 6.0),
    'tattooed_hands': ('tattooed-hands-preparing-coffee-5499724', 1.0, 6.0),
    'vibrant_visualizatio': ('vibrant-visualization-of-neural-29184317', 1.0, 6.0),
    'yellow_robotic': ('yellow-robotic-arm-operates-in-a-32386518', 1.0, 6.0),
    'young_child': ('young-child-stacking-colorful-3676970', 1.0, 6.0),
    'brain_nervous': ('brain-nervous-sci-fi-free-stock-159049', 1.0, 6.0),
    'brain_think': ('brain-think-nervous-system-free-94745', 1.0, 6.0),
    'chess_board': ('chess-board-chess-pieces-chess-32384', 1.0, 6.0),
    'clouds_skies': ('clouds-skies-moving-free-stock-123409', 1.0, 6.0),
    'code_coding': ('code-coding-programming-free-32767', 1.0, 6.0),
    'jakarta_indonesia': ('jakarta-indonesia-city-free-337951', 1.0, 6.0),
    'neuron_brain': ('neuron-brain-mind-free-stock-91633', 0.54, 4.8),
    'robot_robotic': ('robot-robotic-arm-production-160986', 1.0, 6.0),
}
OUT.mkdir(parents=True, exist_ok=True); mp = OUT / 'vid.json'; meta = json.load(open(mp)) if mp.exists() else {}
for name in sys.argv[1:] or CLIPS:
    part, ss, ln = CLIPS[name]; f = next(SRC.glob(f'*{part}.mp4')); d = OUT / name
    if d.exists() and any(d.iterdir()): print('skip (exists):', name); continue
    d.mkdir(exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(ln), '-i', str(f), '-an',
                    '-vf', f'fps={FPS},scale=960:540:force_original_aspect_ratio=increase,crop=960:540', '-q:v', '4', str(d / 'f_%03d.jpg')], check=True)
    meta[name] = {'n': len(list(d.glob('f_*.jpg'))), 'fps': FPS, 'src': f.name, 'ss': ss, 'len': ln}; print(name, meta[name]['n'])
json.dump(meta, open(mp, 'w'), indent=1)
