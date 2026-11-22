"""Cut the chosen hits out of aset/_transisi into assets/tx/<name>/f_###.jpg (30 fps, 1280x720, full colour)
and write assets/tx/tx.json {name: {folder, ss, n, peak}} — peak = brightest frame offset (s), used to land the hit on a cut.
Licence: see aset/_transisi/*/LISENSI.md (draft use; swap before monetised upload)."""
import json, subprocess
from pathlib import Path
import numpy as np
ROOT = Path(__file__).resolve().parents[1]; TR = ROOT.parents[1] / '_transisi'
HITS = {  # name: (folder, ss, length)
    'shA': ('camera-shutter-thinkmakepush', 9.15, 1.15), 'shB': ('camera-shutter-thinkmakepush', 5.75, 1.15),
    'shC': ('camera-shutter-thinkmakepush', 17.4, 1.15), 'burn1': ('film-burn-vfxasto', 3.2, .95),
    'burn2': ('film-burn-vfxasto', 9.8, 1.05), 'leakW': ('light-leak-film-burn-copyrightfree820', 13.0, 1.3),
    'leakL': ('light-leak-flatmedia', 0.9, 1.1), 'leakR': ('light-leak-film-burn-copyrightfree820', 26.5, 1.2),
}
meta = {}
for name, (folder, ss, ln) in HITS.items():
    src = next((TR / folder).glob('*h264*.mp4')); out = ROOT / 'assets/tx' / name; out.mkdir(parents=True, exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vf', 'fps=30,scale=1280:720',
                    '-q:v', '3', str(out / 'f_%03d.jpg')], check=True)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vf', 'fps=30,scale=32:18', '-pix_fmt', 'gray',
                          '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
    v = np.frombuffer(raw, np.uint8).reshape(-1, 18, 32).mean((1, 2))
    meta[name] = {'folder': folder, 'ss': ss, 'len': ln, 'n': len(list(out.glob('f_*.jpg'))), 'peak': round(float(np.argmax(v)) / 30, 3),
                  'curve': [round(float(x)) for x in v]}
(ROOT / 'assets/tx/tx.json').write_text(json.dumps(meta, indent=1))
for k, m in meta.items(): print(k, m['n'], 'peak', m['peak'], 'curve', m['curve'][::3])
