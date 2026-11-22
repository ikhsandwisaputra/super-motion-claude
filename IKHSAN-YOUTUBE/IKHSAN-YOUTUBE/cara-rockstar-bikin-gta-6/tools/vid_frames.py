"""Cut Ahri's stock clips into frame runs for the chapter kit (plate() in kit/kit.js).
  python -I tools/vid_frames.py lab kabel …      → assets/vid/<name>/f_###.jpg (960×540, 15 fps) + assets/vid/vid.json
Re-cutting a clip: move its folder to assets/vid/_old/ first (stale frames would inflate n)."""
import json, subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; SRC = ROOT / 'assets/rockstar-resmi'; OUT = ROOT / 'assets/vid'; FPS = 15
CLIPS = {  # name: (file stem part, start s, length s) — official Rockstar media, muted (assets/rockstar-resmi)
    'logo': ('clip-01-cover-art-animation-muted', 6.0, 14.0), 'jason': ('clip-02-jason-duval-muted', 0, 1.0), 'lucia': ('clip-03-lucia-caminos-muted', 0, 1.5),
    'klub': ('gameplay-01-out-now-muted', 0.2, 2.6), 'kapal': ('gameplay-01-out-now-muted', 7.0, 3.0), 'tangga': ('gameplay-01-out-now-muted', 9.6, 3.2),
    'telepon': ('gameplay-02-launch-trailer-muted', 0.2, 3.0), 'kotamalam': ('gameplay-02-launch-trailer-muted', 4.6, 3.0), 'mobil2': ('gameplay-02-launch-trailer-muted', 7.4, 3.0),
    'senja': ('gameplay-02-launch-trailer-muted', 12.2, 2.8), 'interogasi': ('gameplay-03-trailer-1-vice-city-muted', 0.1, 2.4), 'laut': ('gameplay-03-trailer-1-vice-city-muted', 2.5, 2.6),
    'pantai': ('gameplay-03-trailer-1-vice-city-muted', 5.0, 2.6), 'menara': ('gameplay-03-trailer-1-vice-city-muted', 9.4, 2.6), 'flamingo': ('gameplay-03-trailer-1-vice-city-muted', 12.0, 3.0),
    'lorong': ('gameplay-04-extended-look-ps5-a-muted', 0.0, 6.0), 'nyetir': ('gameplay-05-extended-look-ps5-b-muted', 0.0, 9.0), 'garasi': ('gameplay-06-extended-look-ps5-c-muted', 0.5, 7.0),
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
