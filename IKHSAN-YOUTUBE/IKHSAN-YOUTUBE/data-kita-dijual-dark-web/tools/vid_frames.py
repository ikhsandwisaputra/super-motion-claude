"""Cut Ahri's stock clips into frame runs for the chapter kit (layarFoto / plate).
  .venv/bin/python -I aset/data-kita-dijual-dark-web/tools/vid_frames.py [names...]
  -> assets/vid/<name>/f_###.jpg (1280x720, 15 fps) + assets/vid/vid.json
"""
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'assets/stok-situs'
OUT = ROOT / 'assets/vid'
FPS = 15

CLIPS = {  # data-kita-dijual-dark-web: all 3 Ahri stock videos
    'code_flow': ('dynamic-computer-code-and-data-852292', 0.5, 7.0),
    'terminal_monitor': ('close-up-of-a-monitor-displaying-6804121', 0.5, 7.0),
    'hands_typing': ('hands-typing-on-a-laptop-with-8720756', 0.5, 7.0),
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
mp.write_text(json.dumps(meta, indent=1))
