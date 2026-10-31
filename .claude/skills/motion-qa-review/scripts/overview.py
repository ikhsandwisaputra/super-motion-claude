"""Contact sheet of a rendered film (one tile every N seconds) for a whole-film look at pacing,
colour script and composition. Compare it side by side with the reference overview.

python -I tools/overview.py build/frames build/overview.jpg [--every 1.0] [--fps 30] [--cols 10] [--w 192] [--from 0] [--to 999]
"""
import argparse, os
import cv2, numpy as np

ap = argparse.ArgumentParser(); ap.add_argument("frames"); ap.add_argument("out")
ap.add_argument("--every", type=float, default=1.0); ap.add_argument("--fps", type=int, default=30)
ap.add_argument("--cols", type=int, default=10); ap.add_argument("--w", type=int, default=192)
ap.add_argument("--from", dest="t0", type=float, default=0); ap.add_argument("--to", dest="t1", type=float, default=1e9)
a = ap.parse_args()
n = len([f for f in os.listdir(a.frames) if f.endswith(".jpg")])
fr = [int(round(t * a.fps)) for t in np.arange(a.t0, min(a.t1, n / a.fps), a.every)]
_im0 = cv2.imread(os.path.join(a.frames, f"f_{fr[0]:05d}.jpg")) if fr else None
th = a.w * _im0.shape[0] // _im0.shape[1] if _im0 is not None else a.w * 9 // 16  # follows the film's aspect (9:16 too)
rows = (len(fr) + a.cols - 1) // a.cols
S = np.zeros((rows * (th + 14), a.cols * a.w, 3), np.uint8)
for k, f in enumerate(fr):
    im = cv2.imread(os.path.join(a.frames, f"f_{f:05d}.jpg"))
    if im is None: continue
    r, c = divmod(k, a.cols)
    S[r * (th + 14) + 14: r * (th + 14) + 14 + th, c * a.w:(c + 1) * a.w] = cv2.resize(im, (a.w, th), interpolation=cv2.INTER_AREA)
    cv2.putText(S, f"{f / a.fps:.1f}s", (c * a.w + 3, r * (th + 14) + 11), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 255, 255), 1)
cv2.imwrite(a.out, S, [cv2.IMWRITE_JPEG_QUALITY, 85])
print(a.out, len(fr), "tiles")
