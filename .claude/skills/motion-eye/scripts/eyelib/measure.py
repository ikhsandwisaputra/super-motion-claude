"""Measuring a frame (and a pair of frames) the way a motion designer looks at it.

All functions take RGB uint8 frames. Colour is measured in CIELAB (L 0-100, C = chroma, h = hue angle).
Numbers are perception aids, not taste: the eye still has to look at the sheets.
"""
import math

import cv2
import numpy as np

cv2.setRNGSeed(7)


# ---------------------------------------------------------------- colour
def to_lab(rgb):
    return cv2.cvtColor(rgb.astype(np.float32) / 255.0, cv2.COLOR_RGB2LAB)


def lab_to_rgb(lab):
    px = np.array(lab, np.float32).reshape(1, 1, 3)
    return np.clip(cv2.cvtColor(px, cv2.COLOR_LAB2RGB)[0, 0] * 255 + 0.5, 0, 255).astype(np.uint8)


def hexof(rgb):
    return '#%02x%02x%02x' % tuple(int(v) for v in rgb)


def hex_lab(h):
    h = h.lstrip('#')
    return to_lab(np.array([[[int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)]]], np.uint8))[0, 0]


# Lab hue angle -> family name (measured: pink 356, red 40, orange 60, amber 85, lime 116, mint 171,
# teal 196, cyan 215, sky 280, blue/violet 306, magenta 328)
HUE_NAMES = [(15, 'merah muda'), (50, 'merah'), (75, 'oranye'), (110, 'kuning'), (160, 'hijau'),
             (205, 'mint-toska'), (290, 'cyan-biru'), (322, 'biru-ungu'), (340, 'magenta'), (361, 'merah muda')]


def hue_name(h):
    for lim, name in HUE_NAMES:
        if h < lim:
            return name
    return 'merah muda'


def palette(lab, k=7, sample=5000, min_share=0.03, merge_de=12.0, seed=7):
    """Perceptually distinct colours with their share of the frame (k-means in Lab, close centres merged)."""
    px = lab.reshape(-1, 3)
    rng = np.random.default_rng(seed)
    if len(px) > sample:
        px = px[rng.choice(len(px), sample, replace=False)]
    k = min(k, len(px))
    crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 25, 0.5)
    _, labels, centers = cv2.kmeans(px.astype(np.float32), k, None, crit, 2, cv2.KMEANS_PP_CENTERS)
    counts = np.bincount(labels.ravel(), minlength=k).astype(float)
    cl = [[centers[i].astype(float), counts[i]] for i in range(k) if counts[i] > 0]
    merged = True
    while merged:
        merged = False
        for i in range(len(cl)):
            for j in range(i + 1, len(cl)):
                if np.linalg.norm(cl[i][0] - cl[j][0]) < merge_de:
                    w = cl[i][1] + cl[j][1]
                    cl[i][0] = (cl[i][0] * cl[i][1] + cl[j][0] * cl[j][1]) / w
                    cl[i][1] = w
                    del cl[j]
                    merged = True
                    break
            if merged:
                break
    total = sum(c[1] for c in cl)
    out = []
    for c, n in sorted(cl, key=lambda x: -x[1]):
        share = n / total
        if share < min_share:
            continue
        C = float(math.hypot(c[1], c[2]))
        h = (math.degrees(math.atan2(c[2], c[1])) + 360) % 360
        out.append({'hex': hexof(lab_to_rgb(c)), 'share': round(share, 3), 'L': round(float(c[0]), 1),
                    'C': round(C, 1), 'hue': hue_name(h) if C >= 15 else 'netral'})
    return out


def dominant_lab(lab):
    """The background colour: mean of the densest coarse Lab bin."""
    flat = lab.reshape(-1, 3)
    if len(flat) > 20000:
        flat = flat[:: len(flat) // 20000 + 1]
    q = np.floor((flat - np.array([0, -128, -128])) / np.array([8, 10, 10])).astype(np.int64)
    keys = q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2]
    _, inv, counts = np.unique(keys, return_inverse=True, return_counts=True)
    return flat[inv.ravel() == np.argmax(counts)].mean(axis=0)


def ink_mask(lab, bg=None, de=18.0):
    """Everything that is not background (type, shapes, props): Lab distance from the dominant colour."""
    if bg is None:
        bg = dominant_lab(lab)
    return np.linalg.norm(lab - bg, axis=2) > de


def ink_palette(lab, mask, k=6, min_share=0.06, merge_de=15.0):
    """Colours of the ink (non-background) pixels, share relative to the ink."""
    if mask.sum() < 50:
        return []
    sub = lab[mask].reshape(-1, 1, 3)
    return palette(sub, k=k, sample=4000, min_share=min_share, merge_de=merge_de)


def colour_groups(entries):
    """Colours as a designer counts them: every chromatic hue family is one colour (its tints and shades are
    the same colour), plus dark neutral and light neutral."""
    groups = set()
    for p in entries:
        if p['C'] < 12:
            groups.add('netral-gelap' if p['L'] < 50 else 'netral-terang')
        else:
            groups.add(p['hue'])
    return sorted(groups)


def hue_families(lab, cmin=30.0, bin_deg=10, bin_min=0.002, fam_min=0.015, mask=None):
    """Saturated hue families (contiguous bins on the hue circle) that each cover >= fam_min of the frame
    (of the masked pixels when a mask is given)."""
    if mask is not None:
        lab = lab[mask].reshape(-1, 1, 3)
        if lab.size == 0:
            return []
    a, b = lab[..., 1], lab[..., 2]
    C = np.hypot(a, b)
    m = C >= cmin
    n = C.size
    if not m.any():
        return []
    H = (np.degrees(np.arctan2(b[m], a[m])) + 360) % 360
    nb = 360 // bin_deg
    hist = np.bincount((H // bin_deg).astype(int) % nb, minlength=nb) / n
    on = hist >= bin_min
    if not on.any():
        return []
    groups = []
    if on.all():
        groups = [list(range(nb))]
    else:
        start = int(np.argmin(on))
        cur = []
        for s in range(1, nb + 1):
            i = (start + s) % nb
            if on[i]:
                cur.append(i)
            elif cur:
                groups.append(cur)
                cur = []
        if cur:
            groups.append(cur)
    fams = []
    for g in groups:
        s = float(hist[g].sum())
        if s < fam_min:
            continue
        ang = np.radians((np.array(g) + 0.5) * bin_deg)
        w = hist[g]
        hm = (math.degrees(math.atan2(float((w * np.sin(ang)).sum()), float((w * np.cos(ang)).sum()))) + 360) % 360
        fams.append({'hue': round(hm), 'share': round(s, 3), 'name': hue_name(hm)})
    return sorted(fams, key=lambda f: -f['share'])


def light_stats(lab, ink=None):
    L = lab[..., 0]
    C = np.hypot(lab[..., 1], lab[..., 2])
    p5, p50, p95 = np.percentile(L, [5, 50, 95])
    dark_bg = p50 < 25
    neon = (L >= 55) & (C >= 35)
    neon_share = float(neon.mean()) if dark_bg else 0.0
    neon_ink = 0.0
    neon_bright = 0.0
    if dark_bg and ink is not None and ink.sum() >= 50:
        neon_ink = float((neon & ink).sum() / ink.sum())
        bright = ink & (L >= 55)
        if bright.sum() >= 30:
            neon_bright = float((neon & bright).sum() / bright.sum())
    halo = 0.0
    if dark_bg and neon.any():
        r = max(3, int(round(min(L.shape) * 0.02)))
        dil = cv2.dilate(neon.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1)))
        ring = (dil > 0) & ~neon & (C >= 12) & (L > p50 + 4) & (L < 55)
        halo = float(ring.mean())
    # contrast of the ink (type, shapes) against the background — p5–p95 misses small dark type on a white field
    ink_c = None
    if ink is not None and ink.sum() >= 30 and (~ink).sum() >= 30:
        # p98 of the ink's distance from the background lightness: the type itself, not soft shadows or pastel cards
        ink_c = round(float(np.percentile(np.abs(L[ink] - np.median(L[~ink])), 98)), 1)
    return {
        'L5': round(float(p5), 1), 'L50': round(float(p50), 1), 'L95': round(float(p95), 1),
        'contrast': round(float(p95 - p5), 1), 'ink_contrast': ink_c,
        'C_mean': round(float(C.mean()), 1), 'C90': round(float(np.percentile(C, 90)), 1),
        'vivid': round(float((C >= 40).mean()), 3),
        'neon': round(neon_share, 4), 'neon_ink': round(neon_ink, 3), 'neon_bright': round(neon_bright, 3),
        'glow_halo': round(halo, 4),
        'ink': round(float(ink.mean()), 3) if ink is not None else None,
        'pure_black': round(float((L <= 1.5).mean()), 3),
        'pure_white': round(float(((L >= 99) & (C < 2)).mean()), 3),
    }


# ---------------------------------------------------------------- space
def grid_shape(w, h):
    """Cells of roughly square shape: 9x16 for portrait, 16x9 landscape, 12x12 square."""
    if h > w * 1.2:
        return 16, 9
    if w > h * 1.2:
        return 9, 16
    return 12, 12


def busy_grid(rgb, rows, cols):
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(np.float32) / 255.0
    g = cv2.GaussianBlur(g, (0, 0), 0.8)
    gx = cv2.Sobel(g, cv2.CV_32F, 1, 0, ksize=3)
    gy = cv2.Sobel(g, cv2.CV_32F, 0, 1, ksize=3)
    mag = np.sqrt(gx * gx + gy * gy)
    return cv2.resize(mag, (cols, rows), interpolation=cv2.INTER_AREA)


CALM = 0.05  # cell mean gradient below this = calm (flat or soft gradient; grain stays under it)


def space_stats(rgb, rows=None, cols=None):
    h, w = rgb.shape[:2]
    if rows is None:
        rows, cols = grid_shape(w, h)
    cells = busy_grid(rgb, rows, cols)
    calm = cells < CALM
    return {'negative_space': round(float(calm.mean()), 3), 'busy_mean': round(float(cells.mean()), 3)}, cells


# ---------------------------------------------------------------- where the eye goes
def saliency(rgb, lab=None, motion=None, width=96):
    """Spectral-residual saliency + distance from the dominant colour (+ motion when given), 0..1, small map."""
    h, w = rgb.shape[:2]
    sw = width
    sh = max(8, int(round(h * sw / w)))
    g = cv2.resize(cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY), (sw, sh), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
    F = np.fft.fft2(g)
    A = np.log(np.abs(F) + 1e-6)
    P = np.angle(F)
    R = A - cv2.blur(A.astype(np.float32), (3, 3))
    S = np.abs(np.fft.ifft2(np.exp(R + 1j * P))) ** 2
    S = cv2.GaussianBlur(S.astype(np.float32), (0, 0), 2.0)
    S /= S.max() + 1e-9
    if lab is None:
        lab = to_lab(rgb)
    small = cv2.resize(lab, (sw, sh), interpolation=cv2.INTER_AREA)
    flat = small.reshape(-1, 3)
    # dominant colour = densest coarse Lab bin
    q = np.floor((flat - np.array([0, -128, -128])) / np.array([8, 10, 10])).astype(int)
    keys = q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2]
    vals, inv, counts = np.unique(keys, return_inverse=True, return_counts=True)
    bg = flat[inv == np.argmax(counts)].mean(axis=0)
    D = np.linalg.norm(small - bg, axis=2).astype(np.float32)
    D = cv2.GaussianBlur(D, (0, 0), 1.5)
    D /= D.max() + 1e-9
    sal = 0.45 * S + 0.55 * D
    # mild centre bias (viewers start near the centre; keeps busy photo texture at the edges from stealing focus)
    yy, xx = np.mgrid[0:sh, 0:sw]
    sal = sal * (0.65 + 0.35 * np.exp(-(((xx / (sw - 1) - 0.5) ** 2 + (yy / (sh - 1) - 0.5) ** 2) / (2 * 0.3 ** 2))))
    if motion is not None:
        mo = cv2.resize(motion.astype(np.float32), (sw, sh), interpolation=cv2.INTER_AREA)
        mo = cv2.GaussianBlur(mo, (0, 0), 1.5)
        if mo.max() > 1e-6:
            sal = 0.7 * sal + 0.3 * (mo / mo.max())
    return sal / (sal.max() + 1e-9)


def focal(sal, top=0.04):
    """Focal point of the strongest salient blob, how many blobs compete ('stars') and how clear the lead is."""
    sh, sw = sal.shape
    thr = np.quantile(sal, 1 - top)
    m = (sal >= thr).astype(np.uint8)
    n, lab_cc, stats, cents = cv2.connectedComponentsWithStats(m, 8)
    masses = []
    for i in range(1, n):
        sel = lab_cc == i
        masses.append((float(sal[sel].sum()), i))
    if not masses:
        return {'x': 0.5, 'y': 0.5, 'stars': 0, 'clarity': 0.0}
    masses.sort(reverse=True)
    total = sum(mm for mm, _ in masses)
    best = masses[0][1]
    ys, xs = np.nonzero(lab_cc == best)
    wv = sal[ys, xs]
    cx = float((xs * wv).sum() / wv.sum()) / (sw - 1)
    cy = float((ys * wv).sum() / wv.sum()) / (sh - 1)
    stars = sum(1 for mm, _ in masses if mm >= 0.15 * total)
    return {'x': round(cx, 3), 'y': round(cy, 3), 'stars': int(stars), 'clarity': round(masses[0][0] / total, 3)}


# ---------------------------------------------------------------- type (estimate from pixels)
def text_lines(rgb, max_lines=30):
    """Estimate text lines with MSER letters grouped by height and baseline. Returns boxes in px with height."""
    H, W = rgb.shape[:2]
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    area = H * W
    mser = cv2.MSER_create(5, max(12, int(area * 0.00002)), int(area * 0.03))
    cand = []
    for img in (g, 255 - g):
        regions, boxes = mser.detectRegions(img)
        for reg, (x, y, w, h) in zip(regions, boxes):
            if h < 0.007 * H or h > 0.28 * H or w > 1.8 * h or w < 0.06 * h:
                continue
            fill = len(reg) / float(w * h)
            if fill < 0.12 or fill > 0.95:
                continue
            x0, y0, x1, y1 = max(0, x - 2), max(0, y - 2), min(W, x + w + 2), min(H, y + h + 2)
            inside = float(img[reg[:, 1], reg[:, 0]].mean())
            ring = np.concatenate([img[y0, x0:x1], img[y1 - 1, x0:x1], img[y0:y1, x0], img[y0:y1, x1 - 1]]).astype(float)
            if abs(inside - ring.mean()) < 28:
                continue
            cand.append((x, y, w, h))
    # non-maximum suppression (keep larger)
    cand.sort(key=lambda b: -b[2] * b[3])
    keep = []
    for b in cand:
        x, y, w, h = b
        dup = False
        for k in keep:
            ix = max(0, min(x + w, k[0] + k[2]) - max(x, k[0]))
            iy = max(0, min(y + h, k[1] + k[3]) - max(y, k[1]))
            if ix * iy > 0.5 * min(w * h, k[2] * k[3]):
                dup = True
                break
        if not dup:
            keep.append(b)
    # group letters into lines: similar height, overlapping vertical band, small horizontal gap
    keep.sort(key=lambda b: b[0])
    parent = list(range(len(keep)))

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    for i, a in enumerate(keep):
        for j in range(i + 1, len(keep)):
            b = keep[j]
            if b[0] - (a[0] + a[2]) > 1.2 * max(a[3], b[3]):
                break
            hr = max(a[3], b[3]) / max(1, min(a[3], b[3]))
            ca, cb = a[1] + a[3] / 2, b[1] + b[3] / 2
            if hr < 1.7 and abs(ca - cb) < 0.45 * max(a[3], b[3]):
                parent[find(j)] = find(i)
    groups = {}
    for i in range(len(keep)):
        groups.setdefault(find(i), []).append(keep[i])
    lines = []
    for mem in groups.values():
        if len(mem) < 3:
            continue
        x0 = min(m[0] for m in mem)
        y0 = min(m[1] for m in mem)
        x1 = max(m[0] + m[2] for m in mem)
        y1 = max(m[1] + m[3] for m in mem)
        hmed = float(np.median([m[3] for m in mem]))
        lines.append({'box': [int(x0), int(y0), int(x1 - x0), int(y1 - y0)], 'h': round(hmed / H, 4), 'n': len(mem)})
    lines.sort(key=lambda l: -l['h'])
    return lines[:max_lines]


def type_scale(lines):
    """Hero line height (fraction of frame height) and hero : support ratio."""
    if not lines:
        return {'hero_h': 0.0, 'ratio': None, 'lines': 0}
    hero = lines[0]['h']
    # hero against the small supporting type (a 2x sub-head between them is fine: two-tier hierarchy)
    small = [l['h'] for l in lines[1:] if l['h'] < 0.6 * hero]
    ratio = round(hero / float(np.percentile(small, 25)), 2) if small else None
    return {'hero_h': round(hero, 4), 'ratio': ratio, 'lines': len(lines)}


# ---------------------------------------------------------------- between two frames
def hist_sig(lab):
    L = lab[..., 0]
    a = np.clip(lab[..., 1] + 128, 0, 255)
    b = np.clip(lab[..., 2] + 128, 0, 255)
    hL = np.histogram(L, bins=32, range=(0, 100))[0].astype(np.float32)
    hab = np.histogram2d(a.ravel(), b.ravel(), bins=16, range=[[0, 256], [0, 256]])[0].astype(np.float32).ravel()
    return hL / (hL.sum() + 1e-9), hab / (hab.sum() + 1e-9)


def hist_dist(s0, s1):
    bL = 1 - float(np.sum(np.sqrt(s0[0] * s1[0])))
    bab = 1 - float(np.sum(np.sqrt(s0[1] * s1[1])))
    return 0.5 * max(0.0, bL) ** 0.5 + 0.5 * max(0.0, bab) ** 0.5


def grain_level(rgb, cells=None):
    """Film-grain / texture level in the calm areas (std of the fine residual, 0-255 scale)."""
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(np.float32)
    res = g - cv2.GaussianBlur(g, (0, 0), 1.5)
    if cells is not None:
        h, w = g.shape
        calm = cv2.resize((cells < CALM).astype(np.uint8), (w, h), interpolation=cv2.INTER_NEAREST) > 0
        if calm.sum() > 500:
            return round(float(res[calm].std()), 2)
    return round(float(np.median(np.abs(res)) * 1.4826), 2)


def chroma_shift(rgb, grid=3, min_resp=0.3):
    """Red/blue misregistration (chromatic aberration) as a fraction of the frame width: 75th percentile of
    per-tile phase correlations between the EDGE maps of the R and B channels (edges ignore colour differences)."""
    h, w = rgb.shape[:2]
    th, tw = h // grid, w // grid
    if th < 16 or tw < 16:
        return None

    def edges(c):
        c = c.astype(np.float32)
        return cv2.magnitude(cv2.Sobel(c, cv2.CV_32F, 1, 0, ksize=3), cv2.Sobel(c, cv2.CV_32F, 0, 1, ksize=3))

    R, B = edges(rgb[..., 0]), edges(rgb[..., 2])
    win = cv2.createHanningWindow((tw, th), cv2.CV_32F)
    shifts = []
    for r in range(grid):
        for c in range(grid):
            a = np.ascontiguousarray(R[r * th:(r + 1) * th, c * tw:(c + 1) * tw])
            b = np.ascontiguousarray(B[r * th:(r + 1) * th, c * tw:(c + 1) * tw])
            if a.std() < 10 or b.std() < 10:   # needs real edges; dark/flat tiles only give noise
                continue
            (dx, dy), resp = cv2.phaseCorrelate(a, b, win)
            if resp >= min_resp and abs(dx) < tw / 4 and abs(dy) < th / 4:
                shifts.append(math.hypot(dx, dy))
    if not shifts:
        return None
    return round(float(np.percentile(shifts, 75)) / w, 5)


def rel_luminance(rgb):
    """WCAG relative luminance per pixel (0..1) from sRGB."""
    c = rgb.astype(np.float32) / 255.0
    lin = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * lin[..., 0] + 0.7152 * lin[..., 1] + 0.0722 * lin[..., 2]


UI_ZONES = {
    # fractions of the frame: (x0, y0, x1, y1)
    '9:16': [(0, 0, 1, 0.12), (0, 0.80, 1, 1), (0.84, 0.45, 1, 0.80)],   # Reels/TikTok/Shorts top bar, caption, rail
    '16:9': [(0, 0, 1, 0.05), (0, 0.95, 1, 1), (0, 0, 0.05, 1), (0.95, 0, 1, 1)],  # title-safe 5 %
    '4:5': [(0, 0, 1, 0.05), (0, 0.95, 1, 1)],
    'none': [],
}


def zones_for(w, h, channel=None):
    if channel in UI_ZONES:
        return UI_ZONES[channel]
    if h > w * 1.4:
        return UI_ZONES['9:16']
    if w > h * 1.4:
        return UI_ZONES['16:9']
    return UI_ZONES['4:5']


def camera_motion(g0, g1):
    """Similarity fit of the dense optical flow: pan (fraction of diagonal/frame), zoom (%/frame), roll (deg/frame),
    and the local motion left over (objects moving against the camera). g0/g1: small grey uint8 frames."""
    h, w = g0.shape
    tex = float(np.mean(np.abs(cv2.Sobel(g0, cv2.CV_32F, 1, 0)))) / 255.0
    flow = cv2.calcOpticalFlowFarneback(g0, g1, None, 0.5, 3, 15, 3, 5, 1.2, 0)
    ys, xs = np.mgrid[2:h - 2:4, 2:w - 2:4]
    fx = flow[ys, xs, 0].ravel()
    fy = flow[ys, xs, 1].ravel()
    X = (xs - w / 2.0).ravel()
    Y = (ys - h / 2.0).ravel()
    n = len(X)
    A = np.zeros((2 * n, 4), np.float32)
    A[:n, 0], A[:n, 1], A[:n, 2] = X, -Y, 1
    A[n:, 0], A[n:, 1], A[n:, 3] = Y, X, 1
    bvec = np.concatenate([fx, fy])
    sol = np.linalg.lstsq(A, bvec, rcond=None)[0]
    res = np.abs(A @ sol - bvec)
    good = res < max(0.5, 2.5 * float(np.median(res)))
    if good.sum() > 8:
        sol = np.linalg.lstsq(A[good], bvec[good], rcond=None)[0]
    s, r, tx, ty = (float(v) for v in sol)
    diag = math.hypot(w, h)
    resid = np.hypot(fx - (s * X - r * Y + tx), fy - (r * X + s * Y + ty))
    return {'pan': math.hypot(tx, ty) / diag, 'zoom': s * 100.0, 'roll': math.degrees(r),
            'local': float(np.percentile(resid, 90)) / diag, 'texture': tex}
