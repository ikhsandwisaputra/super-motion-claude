"""Pull frames out of a reference video for study.

  overview: contact sheets, one tile every --every seconds, 24 s per sheet, labelled with absolute time
  strip:    every frame of a short window (frame-by-frame recipes: slams, transitions, entrances)
  crops:    full-resolution crops at given times (typography, fonts, colours)

python -I extract_frames.py ref.mp4 outdir overview [--every 0.5]
python -I extract_frames.py ref.mp4 outdir strip --t0 6.7 --t1 7.7 [--name slam]
python -I extract_frames.py ref.mp4 outdir crops --times 4.4,6.3,12.2
Add --crop x0,y0,x1,y1 (pixels) when the motion graphic sits inside a filmed screen (e.g. a laptop in a TikTok).
"""
import argparse, os
import cv2, numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("outdir"); ap.add_argument("mode", choices=["overview", "strip", "crops"])
ap.add_argument("--every", type=float, default=0.5); ap.add_argument("--t0", type=float); ap.add_argument("--t1", type=float)
ap.add_argument("--times"); ap.add_argument("--crop"); ap.add_argument("--name", default="strip"); ap.add_argument("--tile", type=int, default=256)
a = ap.parse_args()
os.makedirs(a.outdir, exist_ok=True)
cap = cv2.VideoCapture(a.video)
fps = cap.get(cv2.CAP_PROP_FPS) or 30; n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)); dur = n / fps
crop = [int(v) for v in a.crop.split(",")] if a.crop else None

def grab(t):
    cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000); ok, fr = cap.read()
    if not ok: return None
    if crop: fr = fr[crop[1]:crop[3], crop[0]:crop[2]]
    return fr

def sheet(times, path, cols=6, rel=None):
    tiles = []
    for t in times:
        fr = grab(t)
        if fr is None: continue
        h = int(a.tile * fr.shape[0] / fr.shape[1])
        im = cv2.resize(fr, (a.tile, h), interpolation=cv2.INTER_AREA)
        lab = f"{t - rel:.2f}s" if rel is not None else f"{t:.2f}s"
        cv2.putText(im, lab, (4, 14), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (0, 255, 255), 1)
        tiles.append(im)
    if not tiles: return
    h = tiles[0].shape[0]; rows = (len(tiles) + cols - 1) // cols
    S = np.zeros((rows * h, cols * a.tile, 3), np.uint8)
    for k, im in enumerate(tiles):
        r, c = divmod(k, cols); S[r * h:(r + 1) * h, c * a.tile:(c + 1) * a.tile] = im[:h]
    cv2.imwrite(path, S, [cv2.IMWRITE_JPEG_QUALITY, 88]); print(path)

if a.mode == "overview":
    for s0 in np.arange(0, dur, 24):
        sheet(list(np.arange(s0, min(dur, s0 + 24), a.every)), os.path.join(a.outdir, f"overview_{int(s0):03d}-{int(min(dur, s0 + 24)):03d}s.jpg"))
elif a.mode == "strip":
    ts = list(np.arange(a.t0, a.t1, 1 / fps))
    sheet(ts, os.path.join(a.outdir, f"strip_t{a.t0:05.1f}_{a.name}.jpg"), cols=6, rel=a.t0)
else:
    for t in [float(v) for v in a.times.split(",")]:
        fr = grab(t)
        if fr is not None:
            p = os.path.join(a.outdir, f"crop_{t:06.2f}s.jpg"); cv2.imwrite(p, fr, [cv2.IMWRITE_JPEG_QUALITY, 95]); print(p)
