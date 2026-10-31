"""Drawing the sheets Claude looks at (PIL only)."""
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFont

INK = (17, 17, 21)
PANEL = (28, 28, 34)
PAPER = (236, 233, 226)
DIM = (140, 140, 150)
GOOD = (110, 200, 140)
WARN = (240, 180, 70)
BAD = (235, 90, 90)
CUT = (240, 240, 240)
ACCENT = (255, 80, 200)
SERIES = [(255, 120, 90), (90, 200, 255), (250, 210, 80), (150, 230, 140), (200, 140, 255), (255, 160, 200)]

_FONT_DIR = os.path.join(os.environ.get('WINDIR', r'C:\Windows'), 'Fonts')
_cache = {}


def font(size, bold=False, mono=False):
    key = (size, bold, mono)
    if key in _cache:
        return _cache[key]
    names = ['consola.ttf', 'DejaVuSansMono.ttf'] if mono else (
        ['segoeuib.ttf', 'arialbd.ttf', 'DejaVuSans-Bold.ttf'] if bold else ['segoeui.ttf', 'arial.ttf', 'DejaVuSans.ttf'])
    f = None
    for n in names:
        p = os.path.join(_FONT_DIR, n)
        if os.path.exists(p):
            f = ImageFont.truetype(p, size)
            break
    _cache[key] = f or ImageFont.load_default()
    return _cache[key]


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def verdict_color(ok):
    return GOOD if ok is True else BAD if ok is False else WARN


class Sheet:
    def __init__(self, w, h, bg=INK):
        self.im = Image.new('RGB', (int(w), int(h)), bg)
        self.d = ImageDraw.Draw(self.im, 'RGBA')

    def text(self, x, y, s, size=14, color=PAPER, bold=False, mono=False, anchor='la'):
        self.d.text((x, y), str(s), fill=color, font=font(size, bold, mono), anchor=anchor)

    def text_w(self, s, size=14, bold=False, mono=False):
        return self.d.textlength(str(s), font=font(size, bold, mono))

    def paste(self, img, x, y, w=None, h=None):
        im = Image.fromarray(img) if isinstance(img, np.ndarray) else img
        if w or h:
            iw, ih = im.size
            if w and h:
                size = (int(w), int(h))
            elif w:
                size = (int(w), max(1, int(round(ih * w / iw))))
            else:
                size = (max(1, int(round(iw * h / ih))), int(h))
            im = im.resize(size, Image.LANCZOS)
        self.im.paste(im, (int(x), int(y)))
        return im.size

    def rect(self, x, y, w, h, fill=None, outline=None, width=1):
        self.d.rectangle([x, y, x + w - 1, y + h - 1], fill=fill, outline=outline, width=width)

    def line(self, pts, color=PAPER, width=1):
        self.d.line([tuple(map(float, p)) for p in pts], fill=color, width=width)

    def circle(self, x, y, r, outline=ACCENT, fill=None, width=2):
        self.d.ellipse([x - r, y - r, x + r, y + r], outline=outline, fill=fill, width=width)

    def arrow(self, x0, y0, x1, y1, color=PAPER, width=2, head=7):
        self.d.line([(x0, y0), (x1, y1)], fill=color, width=width)
        v = np.array([x1 - x0, y1 - y0], float)
        n = np.linalg.norm(v)
        if n < 1:
            return
        v /= n
        p = np.array([-v[1], v[0]])
        a = np.array([x1, y1]) - v * head
        self.d.polygon([(x1, y1), tuple(a + p * head * 0.55), tuple(a - p * head * 0.55)], fill=color)

    def graph(self, x, y, w, h, series, t0, t1, vmin, vmax, marks=(), mark_color=(255, 255, 255, 90), title=None,
              spans=(), span_color=(255, 255, 255, 28), hlines=(), labels=True):
        """series: [(xs, ys, color, label)]; marks: vertical lines at x; spans: [(a, b)] shaded; hlines: [(v, color)]."""
        self.rect(x, y, w, h, fill=PANEL)
        sx = lambda t: x + (t - t0) / max(1e-9, (t1 - t0)) * (w - 1)
        sy = lambda v: y + h - 1 - (min(max(v, vmin), vmax) - vmin) / max(1e-9, (vmax - vmin)) * (h - 1)
        for a, b in spans:
            self.d.rectangle([sx(a), y, sx(b), y + h - 1], fill=span_color)
        for v, c in hlines:
            self.d.line([(x, sy(v)), (x + w - 1, sy(v))], fill=c, width=1)
        for m in marks:
            self.d.line([(sx(m), y), (sx(m), y + h - 1)], fill=mark_color, width=1)
        lx = x + 6
        for xs, ys, color, label in series:
            pts = [(sx(a), sy(b)) for a, b in zip(xs, ys) if b is not None and np.isfinite(b)]
            if len(pts) > 1:
                self.d.line(pts, fill=color, width=2)
            if labels and label:
                self.text(lx, y + 3, label, 11, color)
                lx += self.text_w(label, 11) + 14
        if title:
            self.text(x + w - 6, y + 3, title, 11, DIM, anchor='ra')
        return sx, sy

    def save(self, path, quality=90):
        os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
        if path.lower().endswith(('.jpg', '.jpeg')):
            self.im.save(path, quality=quality, subsampling=0)
        else:
            self.im.save(path)
        return path


def thumb(rgb, long_side):
    im = Image.fromarray(rgb)
    w, h = im.size
    s = long_side / max(w, h)
    return np.asarray(im.resize((max(1, int(w * s)), max(1, int(h * s))), Image.LANCZOS))
