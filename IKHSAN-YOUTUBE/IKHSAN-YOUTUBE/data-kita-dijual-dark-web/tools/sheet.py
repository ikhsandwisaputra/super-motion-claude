"""Contact sheet of check frames: sheet.py <frames_dir> <out.jpg> [cols=6] [w=320]. Labels each tile with its file name."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

d, out = Path(sys.argv[1]), Path(sys.argv[2])
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 6
tw = int(sys.argv[4]) if len(sys.argv) > 4 else 320
fs = sorted(p for p in d.iterdir() if p.suffix.lower() in ('.png', '.jpg', '.jpeg'))
if not fs: sys.exit(f'no frames in {d}')
th = tw * 9 // 16
rows = (len(fs) + cols - 1) // cols
sh = Image.new('RGB', (cols * tw, rows * (th + 16)), (20, 20, 20))
dr = ImageDraw.Draw(sh)
for i, p in enumerate(fs):
    im = Image.open(p).convert('RGB').resize((tw, th))
    x, y = (i % cols) * tw, (i // cols) * (th + 16)
    sh.paste(im, (x, y)); dr.text((x + 4, y + th + 2), p.stem, fill=(200, 200, 200))
sh.save(out, quality=82)
print(out, len(fs), 'tiles')
