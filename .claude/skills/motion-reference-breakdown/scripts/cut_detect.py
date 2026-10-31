"""Shot cuts and pacing stats of a reference video (HSV histogram distance + frame difference).

python -I cut_detect.py ref.mp4 [--crop x0,y0,x1,y1] [--thr 0.45] [--json cuts.json]
Prints every cut time, shot lengths and median/mean/min/max. Multi-frame transitions (mosaics,
white-outs) can split or merge shots: expect about +-10%, then confirm by eye on a strip.
"""
import argparse, json
import cv2, numpy as np

ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--crop"); ap.add_argument("--thr", type=float, default=0.45); ap.add_argument("--json")
a = ap.parse_args()
cap = cv2.VideoCapture(a.video); fps = cap.get(cv2.CAP_PROP_FPS) or 30
crop = [int(v) for v in a.crop.split(",")] if a.crop else None
prev_h, prev_g, scores, f = None, None, [], 0
while True:
    ok, fr = cap.read()
    if not ok: break
    if crop: fr = fr[crop[1]:crop[3], crop[0]:crop[2]]
    small = cv2.resize(fr, (160, 90))
    hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV)
    h = cv2.calcHist([hsv], [0, 1], None, [32, 16], [0, 180, 0, 256]); cv2.normalize(h, h)
    g = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY).astype(np.float32)
    if prev_h is not None:
        d = cv2.compareHist(prev_h, h, cv2.HISTCMP_BHATTACHARYYA); diff = np.mean(np.abs(g - prev_g)) / 255
        scores.append((f, d * 0.7 + diff * 1.6))
    prev_h, prev_g = h, g; f += 1
cuts = [0.0]
for fi, s in scores:
    if s > a.thr and (fi / fps - cuts[-1]) > 0.08: cuts.append(fi / fps)
cuts.append(f / fps)
L = np.diff(cuts)
print(f"{len(cuts) - 2} cuts over {f / fps:.1f}s")
print("cut times:", " ".join(f"{c:.2f}" for c in cuts[1:-1]))
print(f"shot length: median {np.median(L):.2f}s mean {L.mean():.2f}s min {L.min():.2f}s max {L.max():.2f}s; <0.5s: {(L < 0.5).sum()}  >5s: {(L > 5).sum()}")
if a.json: json.dump({"cuts": cuts, "lengths": L.tolist()}, open(a.json, "w"), indent=1)
