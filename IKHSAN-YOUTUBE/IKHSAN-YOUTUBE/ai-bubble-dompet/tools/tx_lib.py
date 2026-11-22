"""Shared transition-hit library for every chapter of this film.
Cuts hits out of aset/_transisi into tx/<name>/f_###.jpg (30 fps, 1280x720) + tx/<name>.wav (the hit's own sound, 48 kHz stereo)
and writes tx/tx.json {name: {folder, ss, len, n, peak, curve, filter, rms}}.
peak = offset (s) of the brightest frame: a chapter lands that frame on its cut / whip midpoint, picture and sound together.
filter = house grade per pack (keeps the hits modern: no sepia, comic yellow pulled to the channel lime).
Use (Ikhsan 2026-11-14, aset/_transisi/IZIN-IKHSAN.md): Think Make Push packs preferred, varied, never spammed.
Run:  .venv/bin/python -I aset/<slug>/tools/tx_lib.py [name ...]   (no names = all)"""
import json, subprocess, sys, wave
from pathlib import Path
import numpy as np
from PIL import Image
def lime_key(folder):
    """One accent: keep only the pack's yellow paint and move it to the channel lime (#C8F53C, hue 74°); every other colour
    (red, cyan, orange) falls to a dim neutral, so a comic hit never brings a second accent into the film."""
    for f in sorted(folder.glob('f_*.jpg')):
        a = np.asarray(Image.open(f).convert('HSV')).astype(float); h, sa, v = a[..., 0] / 255 * 360, a[..., 1] / 255, a[..., 2]
        w = np.clip((40 - np.abs(h - 60)) / 15, 0, 1) * np.clip((sa - .2) / .2, 0, 1)
        out = np.stack([np.full_like(h, 74 / 360 * 255), sa * w * 255 * .92, v * (.22 + .78 * w)], -1)
        Image.fromarray(out.clip(0, 255).astype(np.uint8), 'HSV').convert('RGB').save(f, quality=92)
ROOT = Path(__file__).resolve().parents[1]; TR = ROOT.parent / '_transisi'; OUT = ROOT / 'tx'
STK, CMC, LDR, SHT = 'light-streaks-overlay-thinkmakepush', 'comic-overlay-transitions-thinkmakepush', 'film-leader-transitions-thinkmakepush', 'camera-shutter-thinkmakepush'
G_STK, G_CMC, G_LDR, G_SHT = 'contrast(1.22) saturate(.85) brightness(.95)', 'contrast(1.2)', 'grayscale(1) contrast(1.35)', 'contrast(1.28) brightness(.94)'
HITS = {  # name: (folder, ss, length, filter)
    'stk1': (STK, 12.7, .95, G_STK), 'stk2': (STK, 22.1, .6, G_STK), 'stk3': (STK, 33.1, 1.05, G_STK), 'stk4': (STK, 24.6, .85, G_STK),
    'cmc1': (CMC, 6.9, 1.0, G_CMC), 'cmc2': (CMC, 22.6, 1.1, G_CMC),
    'ldr1': (LDR, 22.2, 1.1, G_LDR),
    'shD': (SHT, 12.6, 1.4, G_SHT), 'shE': (SHT, 21.0, 1.4, G_SHT),
}
SR = 48000
mp = OUT / 'tx.json'; meta = json.loads(mp.read_text()) if mp.exists() else {}
for name, (folder, ss, ln, flt) in HITS.items():
    if sys.argv[1:] and name not in sys.argv[1:]: continue
    src = next((TR / folder).glob('*h264*.mp4')); out = OUT / name; out.mkdir(parents=True, exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vf', 'fps=30,scale=1280:720', '-q:v', '3', str(out / 'f_%03d.jpg')], check=True)
    if folder == CMC: lime_key(out)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vf', 'fps=30,scale=32:18', '-pix_fmt', 'gray', '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
    v = np.frombuffer(raw, np.uint8).reshape(-1, 18, 32).mean((1, 2))
    a = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(a, np.float32).reshape(-1, 2).astype(float); pk = np.abs(x).max()
    x = x / (pk + 1e-9) * 10 ** (-4 / 20); f = int(.02 * SR); x[:f] *= np.linspace(0, 1, f)[:, None]; x[-3 * f:] *= np.linspace(1, 0, 3 * f)[:, None]   # peak -4 dBFS, soft edges
    with wave.open(str(OUT / f'{name}.wav'), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes())
    q = SR // 30; mono = x.mean(1)[: len(x) // q * q]; e = np.sqrt((mono ** 2).reshape(-1, q).mean(1)) if len(mono) else np.zeros(1)
    n = len(sorted(out.glob('f_*.jpg')))
    meta[name] = {'folder': folder, 'ss': ss, 'len': ln, 'n': n, 'peak': round(float(np.argmax(v)) / 30, 3), 'filter': flt,
                  'curve': [round(float(q)) for q in v], 'src_peak_db': round(float(20 * np.log10(pk + 1e-9)), 1), 'apeak': round(float(np.argmax(e)) / 30, 3)}
    print(f"{name:5s} n {n:3d} · picture peak {meta[name]['peak']:.3f} s · sound peak {meta[name]['apeak']:.3f} s · source audio peak {meta[name]['src_peak_db']} dB · curve {meta[name]['curve'][::4]}")
mp.write_text(json.dumps(meta, indent=1))
