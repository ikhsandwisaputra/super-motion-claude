"""Cut Ahri's stock clips into frame runs for the chapter kit (layarFoto / plate).
  python -I tools/vid_frames.py [names...]   → assets/vid/<name>/f_###.jpg (1280×720, 15 fps) + assets/vid/vid.json
"""
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'assets/stok-situs'
OUT = ROOT / 'assets/vid'
FPS = 15

CLIPS = {  # ai-pura-pura-patuh: all 3 Ahri stock clips
    'terminal_screen': ('terminal-screen-displaying-35475314', 0.5, 7.0),
    'text_and_code': ('close-up-view-of-text-and-code-35475054', 0.5, 7.0),
    'terminal_cmds': ('close-up-of-terminal-commands-on-6804117', 0.5, 7.0),
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
