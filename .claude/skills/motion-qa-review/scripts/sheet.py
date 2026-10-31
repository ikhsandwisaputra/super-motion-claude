"""Contact sheet of stills: python -I tools/sheet.py build/stills build/sheet_a.jpg [cols] [width]"""
import sys, os, cv2, numpy as np
d, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 3
tw = int(sys.argv[4]) if len(sys.argv) > 4 else 640
fs = sorted(f for f in os.listdir(d) if f.endswith(".jpg"))
th = tw * 9 // 16
rows = (len(fs) + cols - 1) // cols
sheet = np.zeros((rows * (th + 22), cols * tw, 3), np.uint8)
for i, f in enumerate(fs):
    im = cv2.resize(cv2.imread(os.path.join(d, f)), (tw, th), interpolation=cv2.INTER_AREA)
    r, c = divmod(i, cols)
    sheet[r * (th + 22) + 22: r * (th + 22) + 22 + th, c * tw:(c + 1) * tw] = im
    fr = int(f.split("_")[1].split(".")[0])
    cv2.putText(sheet, f"f{fr} {fr/30:.2f}s", (c * tw + 6, r * (th + 22) + 16), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 1)
cv2.imwrite(out, sheet, [cv2.IMWRITE_JPEG_QUALITY, 88])
