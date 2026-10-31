"""Frame strip: python -I tools/strip.py build/frames START END out.jpg [cols] [w]"""
import sys, os, cv2, numpy as np
d, a, b, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
cols = int(sys.argv[5]) if len(sys.argv) > 5 else 6
tw = int(sys.argv[6]) if len(sys.argv) > 6 else 320
fr = list(range(a, b + 1))
_im0 = cv2.imread(os.path.join(d, f"f_{a:05d}.jpg"))
th = tw * _im0.shape[0] // _im0.shape[1] if _im0 is not None else tw * 9 // 16  # follows the film's aspect
rows = (len(fr) + cols - 1) // cols
S = np.zeros((rows * (th + 16), cols * tw, 3), np.uint8)
for i, f in enumerate(fr):
    im = cv2.imread(os.path.join(d, f"f_{f:05d}.jpg"))
    if im is None: continue
    im = cv2.resize(im, (tw, th), interpolation=cv2.INTER_AREA)
    r, c = divmod(i, cols)
    S[r*(th+16)+16:r*(th+16)+16+th, c*tw:(c+1)*tw] = im
    cv2.putText(S, f"{f} {f/30:.2f}", (c*tw+4, r*(th+16)+12), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (0,255,255), 1)
cv2.imwrite(out, S, [cv2.IMWRITE_JPEG_QUALITY, 85])
