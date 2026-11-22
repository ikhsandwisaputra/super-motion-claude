"""Cut Ahri's stock clips into frame runs for the chapter kit (layarFoto / plate).
  python -I tools/vid_frames.py [names...]   → assets/vid/<name>/f_###.jpg (1280×720, 15 fps) + assets/vid/vid.json
"""
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'assets/stok-situs'
OUT = ROOT / 'assets/vid'
FPS = 15

CLIPS = {  # batam-swro-data-center: all 10 Ahri stock clips
    'server_units': ('detailed-view-of-server-units-7140928', 0.5, 6.5),
    'server_rack': ('detailed-shot-of-a-poweredge-7140931', 0.5, 6.5),
    'server_room': ('data-center-server-room-cloud-380332', 0.5, 6.5),
    'network_cables': ('close-up-shot-of-network-cables-1085656', 1.0, 6.5),
    'ocean_waves': ('drone-captures-powerful-ocean-9806390', 1.0, 6.5),
    'ocean_aerial': ('drone-footage-of-ocean-waves-1918465', 1.0, 6.5),
    'waduk_surut': ('drone-captures-a-bridge-over-a-33598090', 2.0, 6.5),
    'tanah_retak': ('drone-footage-of-a-vast-cracked-30124780', 1.0, 6.5),
    'keran_tetes': ('water-tap-fountain-waterdrop-147074', 1.0, 6.5),
    'cooling_tower': ('aerial-footage-of-a-geothermal-36498924', 1.0, 6.5),
}

OUT.mkdir(parents=True, exist_ok=True)
mp = OUT / 'vid.json'
meta = json.load(open(mp)) if mp.exists() else {}
for name in sys.argv[1:] or CLIPS:
    part, ss, ln = CLIPS[name]
    f = next(SRC.glob(f'*{part}.mp4'))
    d = OUT / name
    if d.exists() and any(d.iterdir()):
        print('skip (exists):', name)
        continue
    d.mkdir(exist_ok=True)
    subprocess.run([
        'ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(ln), '-i', str(f), '-an',
        '-vf', f'fps={FPS},scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720',
        '-q:v', '3', str(d / 'f_%03d.jpg')
    ], check=True)
    meta[name] = {'n': len(list(d.glob('f_*.jpg'))), 'fps': FPS, 'src': f.name, 'ss': ss, 'len': ln}
    print(name, meta[name]['n'])
json.dump(meta, open(mp, 'w'), indent=1)
