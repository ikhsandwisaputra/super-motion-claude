"""Tes B · panggang depth16 lorong server → grid z metrik (Float32) + parameter (JSON) untuk mesh three.js.
Anggapan: depth = inverse depth affine (d = A/z + b). Lantai, plafon dan dinding rak harus linear di baris/kolom;
titik temunya = horizon (v0, u0) dan d∞ = b. Skala A dari tinggi kamera h (m) dan hFOV yang diasumsikan.
Pakai: /home/ikhsands/Proyek/super-motion-claude-ikhsan/.venv/bin/python -I tools/bake_depth.py"""
import json
import pathlib

import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates, median_filter

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAME = 'pixabay-modern-server-racks-in-a-clean-7388620'
OUT = ROOT / 'assets/depth/lorong-server'
HFOV, CAM_H, ZMAX, GW, GH = 60.0, 1.5, 60.0, 321, 181

d = median_filter(np.asarray(Image.open(ROOT / f'assets/depth/{NAME}.depth16.png')).astype(np.float64) / 65535, 3)
H0, W0 = d.shape
f = (W0 / 2) / np.tan(np.radians(HFOV / 2))


def fit(x, y):
    a, c = np.polyfit(x, y, 1)
    r2 = 1 - np.sum((y - (a * x + c)) ** 2) / np.sum((y - y.mean()) ** 2)
    return a, c, r2


col = np.median(d[:, W0 // 2 - 40:W0 // 2 + 40], axis=1)
vf = int(np.argmin(col))
v = np.arange(H0, dtype=float)
a1, c1, r_f = fit(v[vf + 70:], col[vf + 70:])
a2, c2, r_c = fit(v[:max(vf - 70, 20)], col[:max(vf - 70, 20)])
v0 = (c2 - c1) / (a1 - a2)
b = a1 * v0 + c1
row = np.median(d[int(v0) - 25:int(v0) + 25, :], axis=0)
uf = int(np.argmin(row))
u = np.arange(W0, dtype=float)
a3, c3, r_l = fit(u[:uf - 90], row[:uf - 90])
a4, c4, r_r = fit(u[uf + 90:], row[uf + 90:])
u0 = (c4 - c3) / (a3 - a4)
A = a1 * CAM_H * f
z = lambda dd: np.clip(A / np.maximum(dd - b, 1e-6), .3, ZMAX)
ceil_h = A / (a2 * f)                      # plafon di atas kamera
w_l, w_r = -A / (a3 * f), A / (a4 * f)     # dinding kiri/kanan dari sumbu kamera

gu, gv = np.meshgrid(np.linspace(0, W0 - 1, GW), np.linspace(0, H0 - 1, GH))
Z = z(map_coordinates(d, [gv, gu], order=1))
P = np.pad(Z, 1, mode='edge')
ratio = np.max([np.maximum(P[1:-1, 1:-1] / P[a:a + GH, c:c + GW], P[a:a + GH, c:c + GW] / P[1:-1, 1:-1])
                for a, c in ((0, 1), (2, 1), (1, 0), (1, 2))], axis=0)
np.stack([Z, ratio], -1).astype('<f4').tofile(f'{OUT}.bin')
meta = dict(name=NAME, gw=GW, gh=GH, w0=W0, h0=H0, f=f, cx=W0 / 2, cy=H0 / 2, hfov=HFOV, cam_h=CAM_H, zmax=ZMAX,
            v0=v0, u0=u0, b=b, A=A, ceil_h=ceil_h, wall_l=w_l, wall_r=w_r, r2=dict(floor=r_f, ceil=r_c, left=r_l, right=r_r))
pathlib.Path(f'{OUT}.json').write_text(json.dumps(meta, indent=1))
print({k: (round(v, 3) if isinstance(v, float) else v) for k, v in meta.items() if k not in ('name', 'r2')})
print('R²', {k: round(v, 3) for k, v in meta['r2'].items()}, '· z grid', round(Z.min(), 2), '…', round(Z.max(), 2),
      '· median', round(float(np.median(Z)), 2), '· ratio>1.15:', f'{(ratio > 1.15).mean() * 100:.1f} %')
