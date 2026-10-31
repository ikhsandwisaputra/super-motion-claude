"""The pictures: film DNA sheet, comparison sheet, curve sheet, onion skin, look strip, poster grid."""
import math

import cv2
import numpy as np

from . import draw as D
from . import ease as E
from . import film as F
from . import video as V


def _barcode(frames, w, h):
    arr = np.zeros((h, w, 3), np.uint8)
    n = len(frames)
    for j in range(w):
        pal = frames[min(n - 1, int(j / w * n))]['pal']
        tot = sum(p['share'] for p in pal) or 1
        y = 0
        for p in pal:
            hh = int(round(p['share'] / tot * h))
            arr[y:y + hh, j] = D.hex_rgb(p['hex'])
            y += hh
        if pal and y < h:
            arr[y:, j] = D.hex_rgb(pal[-1]['hex'])
    return arr


def _frac_px(frac, w):
    return '–' if frac is None else f'{frac * w:.1f}px'


def _ticks(sheet, x, y, w, t0, t1, step=None):
    span = t1 - t0
    step = step or (5 if span <= 60 else 10 if span <= 150 else 30)
    t = math.ceil(t0 / step) * step
    while t <= t1:
        xx = x + (t - t0) / span * (w - 1)
        sheet.line([(xx, y), (xx, y + 4)], D.DIM)
        sheet.text(xx, y + 5, f'{t:g}s', 10, D.DIM, anchor='ma')
        t += step


def dna_sheet(dna, thumbs, path, review=None):
    fr, sh, ev = dna['frames'], dna['shots'], dna['events']
    s = dna['summary']
    W = 1600
    x0, gw = 20, W - 40
    t0, t1 = fr[0]['t'], fr[-1]['t'] + 1.0 / dna['analysis_fps']
    portrait = dna['h'] > dna['w']
    tw = 64 if portrait else 112
    th = int(round(tw * dna['h'] / dna['w']))
    per_row = max(1, gw // (tw + 6))
    shot_rows = math.ceil(len(sh) / per_row)
    H = 70 + 120 + 22 + 96 + 10 + 96 + 30 + shot_rows * (th + 34) + 20 + 440
    sheet = D.Sheet(W, H)
    ca_txt = '–' if s['camera_alive'] is None else '%.0f%%' % (s['camera_alive'] * 100)
    jb_txt = '–' if s['eye_jump_big'] is None else '%.0f%%' % (s['eye_jump_big'] * 100)
    sheet.text(x0, 12, f"DNA  {dna['name']}", 22, D.PAPER, bold=True)
    sheet.text(x0, 42, f"{dna['duration']}s · {dna['w']}×{dna['h']} · {s['shots']} shot (median {s['shot_median']}s) · "
               f"{s['colour_fields']} field warna · kontras Δ{s['contrast']} · L median {s['L50']} · "
               f"lumpur {s['mud_frames'] * 100:.0f}% · punch {s['punch']}× · kamera hidup {ca_txt}", 13, D.DIM)
    if review:
        sc = review['score']
        sheet.text(W - 20, 14, f"SKOR RASA {sc}/100", 24, D.GOOD if sc >= 75 else D.WARN if sc >= 55 else D.BAD,
                   bold=True, anchor='ra')
    y = 70
    sheet.paste(_barcode(fr, gw, 120), x0, y)
    span = t1 - t0
    for e in ev:
        xx = x0 + (e['t'] - t0) / span * (gw - 1)
        sheet.line([(xx, y - 4), (xx, y + 124)], D.CUT if e['kind'] == 'cut' else D.WARN, 1)
    sheet.text(x0 + gw, y - 14, 'color script (palet tiap frame) · garis putih = cut · kuning = transisi', 10, D.DIM, anchor='ra')
    y += 122
    _ticks(sheet, x0, y, gw, t0, t1)
    y += 22
    ts = [f['t'] for f in fr]
    marks = [e['t'] for e in ev]
    sheet.graph(x0, y, gw, 96, [(ts, [f['L95'] for f in fr], (200, 200, 210), 'L p95'),
                                (ts, [f['L50'] for f in fr], D.SERIES[2], 'L median'),
                                (ts, [f['L5'] for f in fr], (110, 110, 130), 'L p5'),
                                (ts, [f['C_mean'] for f in fr], D.SERIES[4], 'chroma')],
                t0, t1, 0, 100, marks=marks, title='nilai & warna (0–100)', hlines=[(50, (255, 255, 255, 30))])
    y += 106
    snd = dna.get('sound') or {}
    spans = [tuple(x) for x in snd.get('silences', [])]
    emax = max(0.08, max(f['energy'] for f in fr) * 1.05)
    # chromatic split drawn on the energy scale (0.012 of width = top) so you can see whether optics follow speed
    ca_series = [None if f.get('ca') is None else min(1.0, f['ca'] / 0.012) * emax for f in fr]
    sx, sy = sheet.graph(x0, y, gw, 96, [(ts, [f['energy'] for f in fr], D.SERIES[0], 'energi gerak'),
                                         (ts, ca_series, D.SERIES[1], 'pecah RGB (skala)')], t0, t1, 0, emax,
                         marks=marks, spans=spans,
                         hlines=[(F.HOLD_E, (120, 180, 255, 120)), (F.BURST_E, (255, 120, 90, 120))],
                         title='biru = batas hold · merah = batas burst · arsir = senyap VO · titik = onset · magenta = impact 1-frame')
    for o in snd.get('onsets', []):
        if t0 <= o <= t1:
            sheet.line([(sx(o), y + 90), (sx(o), y + 95)], (255, 255, 255, 140))
    for im in (dna.get('flash') or {}).get('impacts', []):
        if t0 <= im <= t1:
            sheet.line([(sx(im), y), (sx(im), y + 10)], D.ACCENT, 2)
    y += 126
    sheet.text(x0, y - 22, 'shot (frame tengah) · swatch = warna dominan', 12, D.DIM)
    for i, shot in enumerate(sh):
        r, c = divmod(i, per_row)
        xx, yy = x0 + c * (tw + 6), y + r * (th + 34)
        if thumbs:
            sheet.paste(thumbs[min(len(thumbs) - 1, shot['mid'])], xx, yy, w=tw, h=th)
        sheet.rect(xx, yy + th + 2, tw, 8, fill=D.hex_rgb(shot['dominant']['hex']))
        sheet.text(xx, yy + th + 12, f"#{shot['n']} {shot['t0']:.1f}s", 10, D.PAPER)
        sheet.text(xx, yy + th + 22, f"{shot['dur']}s", 9, D.DIM)
    y += shot_rows * (th + 34) + 14
    # eye trace panel
    ph = 340
    pw = int(round(ph * dna['w'] / dna['h']))
    if pw > 600:
        pw, ph = 600, int(round(600 * dna['h'] / dna['w']))
    sheet.rect(x0, y, pw, ph, fill=D.PANEL)
    if thumbs:
        acc = np.mean([cv2.resize(thumbs[s_['mid']], (pw, ph)).astype(np.float32) for s_ in sh[: 40]], axis=0)
        sheet.paste((acc * 0.35).astype(np.uint8), x0, y)
    for k in (1, 2):
        sheet.line([(x0 + pw * k / 3, y), (x0 + pw * k / 3, y + ph)], (255, 255, 255, 40))
        sheet.line([(x0, y + ph * k / 3), (x0 + pw, y + ph * k / 3)], (255, 255, 255, 40))
    prev = None
    for i, shot in enumerate(sh):
        fi = shot['focal_in']
        px, py = x0 + fi['x'] * pw, y + fi['y'] * ph
        if prev is not None:
            ev_i = ev[i - 1] if i - 1 < len(ev) else None
            j = ev_i['jump'] if ev_i else 0
            col = D.GOOD if j <= 0.2 else D.WARN if j <= 0.35 else D.BAD
            sheet.arrow(prev[0], prev[1], px, py, col, 2)
        sheet.circle(px, py, 7, outline=D.PAPER, width=2)
        sheet.text(px + 8, py - 6, str(shot['n']), 10, D.PAPER)
        fo = shot['focal_out']
        prev = (x0 + fo['x'] * pw, y + fo['y'] * ph)
    sheet.text(x0, y + ph + 4, 'jejak mata antar shot: hijau ≤ 20% diagonal · kuning ≤ 35% · merah > 35%', 10, D.DIM)
    # numbers
    tx = x0 + pw + 30
    rows = [('durasi', f"{s['duration']}s"), ('shot / median', f"{s['shots']} / {s['shot_median']}s"),
            ('cut per 10 s', s['cuts_per_10s']), ('transisi', s['transitions']),
            ('field warna (seksi)', s['colour_fields']), ('ΔE antar shot', s['colour_step_dE']),
            ('rentang L antar shot', s['shot_L_range']), ('L median / kontras', f"{s['L50']} / {s['contrast']}"),
            ('frame lumpur', f"{s['mud_frames'] * 100:.0f}%"), ('warna/frame · aksen/frame', f"{s['colours_used']:g} · {s['accent_hues']:g}"),
            ('keluarga aksen sefilm', s['accent_hues_film']), ('neon frame / halo', f"{s['neon_frames'] * 100:.0f}% / {s['glow_halo']}%"),
            ('ruang kosong median', f"{s['negative_space'] * 100:.0f}%"), ('kosong melompong / sesak', f"{s['empty_frames'] * 100:.0f}% / {s['crowded_frames'] * 100:.0f}%"),
            ('satu bintang', f"{s['one_star'] * 100:.0f}%"), ('lompatan mata median / besar', f"{s['eye_jump']} / {jb_txt}"),
            ('burst / hold / punch', f"{s['burst_share'] * 100:.0f}% / {s['hold_share'] * 100:.0f}% / {s['punch']}×"),
            ('kamera hidup saat hold', ca_txt),
            ('cut pas onset audio', '–' if s['cut_sync'] is None else f"{s['cut_sync'] * 100:.0f}%"),
            ('hit setelah jeda VO', '–' if s['hits_after_pause'] is None else s['hits_after_pause']),
            ('impact 1-frame (per menit)', f"{s.get('impact_frames', '–')} ({s.get('impacts_per_min', '–')})"),
            ('kedip maks / detik', '–' if s.get('flash_max_per_s') is None else s['flash_max_per_s']),
            ('pecah RGB diam / cepat', f"{_frac_px(s.get('ca_rest'), dna['w'])} / {_frac_px(s.get('ca_fast'), dna['w'])}")]
    for i, (k, v) in enumerate(rows):
        sheet.text(tx, y + i * 17, k, 12, D.DIM)
        sheet.text(tx + 230, y + i * 17, str(v), 12, D.PAPER, mono=True)
    if review:
        rx = tx + 400
        for i, c in enumerate(review['cats']):
            col = D.GOOD if c['pts'] == 10 else D.WARN if c['pts'] >= 6 else D.BAD
            sheet.text(rx, y + i * 19, f"{c['pts']:>2}/10", 13, col, mono=True)
            sheet.text(rx + 50, y + i * 19, c['title'], 12, D.PAPER)
        yy = y + len(review['cats']) * 19 + 10
        for a, b in review['tells'][:6]:
            sheet.text(rx, yy, f"▲ {a}", 12, D.WARN)
            yy += 16
    return sheet.save(path)


def compare_sheet(dnas, names, path):
    W = 1600
    x0, gw = 20, W - 40
    keys = [('duration', 'durasi s'), ('shots', 'shot'), ('shot_median', 'median shot s'), ('cuts_per_10s', 'cut/10 s'),
            ('colour_fields', 'field warna'), ('colour_step_dE', 'ΔE antar shot'), ('shot_L_range', 'rentang L shot'),
            ('L50', 'L median'), ('contrast', 'kontras Δ'), ('mud_frames', 'frame lumpur'), ('colours_used', 'warna/frame'),
            ('accent_hues', 'aksen/frame'), ('accent_hues_film', 'aksen sefilm'), ('neon_frames', 'neon frame'),
            ('glow_halo', 'halo %'), ('negative_space', 'ruang kosong'), ('empty_frames', 'kosong melompong'),
            ('one_star', 'satu bintang'), ('eye_jump_big', 'lompatan mata besar'), ('burst_share', 'burst'),
            ('hold_share', 'hold'), ('punch', 'punch ×'), ('camera_alive', 'kamera hidup'), ('cut_sync', 'cut pas onset')]
    bh = 70
    H = 60 + len(dnas) * (bh + 30) + 30 + len(keys) * 18 + 30
    sheet = D.Sheet(W, H)
    sheet.text(x0, 14, 'BANDINGKAN RUMUS  ' + '  vs  '.join(names), 20, D.PAPER, bold=True)
    y = 56
    for dna, nm in zip(dnas, names):
        fr = dna['frames']
        sheet.text(x0, y, f"{nm}  ({dna['duration']}s, {dna['w']}×{dna['h']})", 12, D.DIM)
        # all films on the same relative time axis so the rhythm can be compared
        sheet.paste(_barcode(fr, gw, bh), x0, y + 16)
        span = fr[-1]['t'] - fr[0]['t'] + 1e-9
        for e in dna['events']:
            xx = x0 + (e['t'] - fr[0]['t']) / span * (gw - 1)
            sheet.line([(xx, y + 14), (xx, y + 16 + bh)], D.CUT if e['kind'] == 'cut' else D.WARN, 1)
        y += bh + 30
    sheet.text(x0, y, 'sumbu waktu tiap film dinormalkan ke lebar yang sama (ritme relatif)', 10, D.DIM)
    y += 24
    cw = 150
    sheet.text(x0, y, 'metrik', 12, D.DIM)
    for i, nm in enumerate(names):
        sheet.text(x0 + 260 + i * cw, y, nm, 12, D.PAPER, bold=True)
    y += 20
    for k, label in keys:
        sheet.text(x0, y, label, 12, D.DIM)
        for i, dna in enumerate(dnas):
            v = dna['summary'].get(k)
            if isinstance(v, float) and k in ('mud_frames', 'neon_frames', 'negative_space', 'empty_frames', 'one_star',
                                               'eye_jump_big', 'burst_share', 'hold_share', 'camera_alive', 'cut_sync'):
                v = f'{v * 100:.0f}%'
            sheet.text(x0 + 260 + i * cw, y, '–' if v is None else v, 12, D.PAPER, mono=True)
        y += 18
    return sheet.save(path)


def smear_profile(vals, travel, v0=40.0, v1=120.0, stretch=2.0, ca_max=20.0):
    """Per frame: speed in px/frame for a move of `travel` px, the smear stretch and the reactive RGB split (px)
    that the studio-tricks rules would give it (start at v0 px/frame, full at v1)."""
    out = []
    for i in range(1, len(vals)):
        v = abs(vals[i] - vals[i - 1]) * travel
        k = min(1.0, max(0.0, (v - v0) / (v1 - v0)))
        out.append({'f': i, 'v': round(v, 1), 'stretch': round(1 + k * (stretch - 1), 2), 'ca': round(k * ca_max, 1)})
    return out


def curve_sheet(specs, frames, fps, path, travel=None):
    curves = []
    for spec in specs:
        label, f, kind, steps = E.parse(spec)
        vals = E.sample(f, kind, frames, fps, steps)
        m = E.metrics(vals, fps)
        if travel:
            m['smear'] = smear_profile(vals, travel)
        curves.append((label, vals, m))
    W, gh = 1600, 300
    H = 70 + gh + 40 + len(curves) * 46 + 40 + len(curves) * 20 + 30 + (len(curves) * 20 + 30 if travel else 0)
    sheet = D.Sheet(W, H)
    sheet.text(20, 14, f'KURVA  {frames} frame @ {fps} fps ({frames / fps:.2f}s)', 20, D.PAPER, bold=True)
    sheet.text(20, 44, 'kiri: value graph (posisi) · kanan: speed graph (jarak per frame) · bawah: spacing chart '
               '(titik = posisi tiap frame; rapat = pelan, renggang = cepat)', 12, D.DIM)
    vmin = min(-0.1, min(min(v) for _, v, _ in curves) - 0.05)
    vmax = max(1.1, max(max(v) for _, v, _ in curves) + 0.05)
    xs = list(range(frames + 1))
    series = [(xs, v, D.SERIES[i % len(D.SERIES)], lab) for i, (lab, v, _) in enumerate(curves)]
    sheet.graph(20, 70, 770, gh, series, 0, frames, vmin, vmax, marks=range(0, frames + 1, max(1, frames // 12)),
                hlines=[(1.0, (255, 255, 255, 70)), (0.0, (255, 255, 255, 70)), (0.85, (255, 255, 255, 30))],
                mark_color=(255, 255, 255, 25), title='value')
    sp = [[0.0] + [v[i] - v[i - 1] for i in range(1, len(v))] for _, v, _ in curves]
    smax = max(0.05, max(max(abs(x) for x in s) for s in sp) * 1.1)
    sheet.graph(810, 70, 770, gh, [(xs, s, D.SERIES[i % len(D.SERIES)], None) for i, s in enumerate(sp)], 0, frames,
                -0.2 * smax, smax, marks=range(0, frames + 1, max(1, frames // 12)), mark_color=(255, 255, 255, 25),
                title='speed (Δ per frame)', hlines=[(0.0, (255, 255, 255, 70))])
    y = 70 + gh + 30
    for i, (lab, v, m) in enumerate(curves):
        col = D.SERIES[i % len(D.SERIES)]
        sheet.text(20, y, lab, 12, col)
        lx0, lx1 = 300, 1560
        sheet.line([(lx0, y + 20), (lx1, y + 20)], (255, 255, 255, 60))
        for k, val in enumerate(v):
            xx = lx0 + (val - vmin) / (vmax - vmin) * (lx1 - lx0)
            sheet.circle(xx, y + 20, 3, outline=col, fill=col, width=1)
            if k in (m['f85'], m['f99']):
                sheet.text(xx, y + 27, f'f{k}', 9, D.DIM, anchor='ma')
        for ref_v in (0.0, 1.0):
            xx = lx0 + (ref_v - vmin) / (vmax - vmin) * (lx1 - lx0)
            sheet.line([(xx, y + 12), (xx, y + 28)], D.PAPER)
        y += 46
    y += 10
    sheet.text(20, y, f"{'kurva':<40} {'50%':>5} {'85%':>5} {'90%':>5} {'99%':>5} {'settle':>7} {'overshoot':>10} {'antisipasi':>11} {'puncak':>8}",
               12, D.DIM, mono=True)
    y += 20
    for i, (lab, v, m) in enumerate(curves):
        f = lambda k: '–' if m[k] is None else f'f{m[k]}'
        sheet.text(20, y, f"{lab[:40]:<40} {f('f50'):>5} {f('f85'):>5} {f('f90'):>5} {f('f99'):>5} {('f' + str(m['settle'])):>7} "
                   f"{m['overshoot'] * 100:>9.1f}% {m['anticipation'] * 100:>10.1f}% {('f' + str(m['peak_speed_frame'])):>8}",
                   12, D.SERIES[i % len(D.SERIES)], mono=True)
        y += 20
    if travel:
        y += 10
        sheet.text(20, y, f'smear & optik reaktif untuk gerak {travel:g} px (mulai 40 px/frame, penuh 120 px/frame): '
                   'frame yang melar · pecah RGB px', 12, D.DIM)
        y += 20
        for i, (lab, v, m) in enumerate(curves):
            hot = [p for p in m['smear'] if p['stretch'] > 1.02]
            txt = '  '.join(f"f{p['f']} {p['stretch']}× {p['ca']:g}px" for p in hot) or 'tidak ada frame yang cukup cepat untuk smear'
            sheet.text(20, y, f"{lab[:28]:<28} puncak {max(p['v'] for p in m['smear']):.0f} px/f · {txt}"[:200], 12,
                       D.SERIES[i % len(D.SERIES)], mono=True)
            y += 20
    sheet.save(path)
    return curves


def look_strip(path_in, times, out, side=540, rect=None, crop=None, src_fps=30.0):
    ims = []
    for t in times:
        im = V.frame_at(path_in, t, long_side=None if rect else side, src_fps=src_fps, crop=crop)
        if rect:
            x, y, w, h = rect
            im = im[y:y + h, x:x + w]
            im = cv2.resize(im, V.fit_size(im.shape[1], im.shape[0], side) if max(im.shape[:2]) > side else
                            (im.shape[1] * max(1, side // max(im.shape[:2])), im.shape[0] * max(1, side // max(im.shape[:2]))),
                            interpolation=cv2.INTER_NEAREST)
        ims.append(im)
    h = max(i.shape[0] for i in ims)
    w = max(i.shape[1] for i in ims)
    cols = min(len(ims), max(1, 2400 // (w + 8)))   # wrap long frame-by-frame strips into rows
    rows = math.ceil(len(ims) / cols)
    sheet = D.Sheet(cols * (w + 8) + 8, rows * (h + 32) + 8)
    for k, (t, im) in enumerate(zip(times, ims)):
        r, c = divmod(k, cols)
        x, y = 8 + c * (w + 8), 8 + r * (h + 32)
        sheet.paste(im, x, y + 22)
        sheet.text(x, y, f'{t:.3f}s', 13, D.WARN, bold=True)
    return sheet.save(out)


def onion(path_in, t0, t1, out, n=8, side=720, rect=None, crop=None, src_fps=30.0, fps=None):
    """Onion skin + spacing chart of whatever moves between t0 and t1 (optionally inside rect of the frame)."""
    info = V.probe(path_in, src_fps)
    fps = fps or (info['fps'] or 30.0)
    times = [t0 + (t1 - t0) * i / max(1, n - 1) for i in range(n)]
    frames = [V.frame_at(path_in, t, long_side=side, src_fps=src_fps, crop=crop).astype(np.float32) for t in times]
    hh, ww = frames[0].shape[:2]
    if rect:
        s = ww / (crop[2] if crop else info['w'])
        rx, ry, rw, rh = [int(v * s) for v in rect]
    else:
        rx, ry, rw, rh = 0, 0, ww, hh
    base = frames[-1].copy()
    comp = base * 0.55
    cents = []
    prev = None
    for i, fimg in enumerate(frames):
        g = cv2.cvtColor(fimg.astype(np.uint8), cv2.COLOR_RGB2GRAY).astype(np.float32)
        if prev is not None:
            d = np.abs(g - prev)
            m = np.zeros_like(d)
            m[ry:ry + rh, rx:rx + rw] = d[ry:ry + rh, rx:rx + rw]
            m = cv2.GaussianBlur(m, (0, 0), 2)
            if m.max() > 8:
                ys, xs = np.nonzero(m > max(8, 0.35 * m.max()))
                wts = m[ys, xs]
                cents.append((float((xs * wts).sum() / wts.sum()), float((ys * wts).sum() / wts.sum()), i))
        prev = g
        a = 0.15 + 0.6 * i / max(1, n - 1)
        tint = np.array(D.SERIES[i % len(D.SERIES)], np.float32)
        diff = np.abs(fimg - base).mean(axis=2, keepdims=True)
        mask = np.clip(diff / 40.0, 0, 1) * a
        comp = comp * (1 - mask) + (fimg * 0.6 + tint * 0.4) * mask
    comp = np.clip(comp, 0, 255).astype(np.uint8)
    gw = 560
    sheet = D.Sheet(ww + gw + 40, max(hh, 420) + 50)
    sheet.paste(comp, 10, 40)
    sheet.text(10, 10, f'ONION {t0:.2f}–{t1:.2f}s · {n} frame · warna = urutan waktu', 14, D.PAPER, bold=True)
    if rect:
        sheet.rect(10 + rx, 40 + ry, rw, rh, outline=D.WARN, width=1)
    for k, (cx, cy, i) in enumerate(cents):
        sheet.circle(10 + cx, 40 + cy, 4, outline=D.PAPER, fill=D.SERIES[i % len(D.SERIES)], width=1)
        if k:
            px, py, _ = cents[k - 1]
            sheet.line([(10 + px, 40 + py), (10 + cx, 40 + cy)], (255, 255, 255, 120), 1)
    if len(cents) >= 2:
        steps = [math.hypot(cents[k][0] - cents[k - 1][0], cents[k][1] - cents[k - 1][1]) for k in range(1, len(cents))]
        gx = ww + 30
        sheet.graph(gx, 40, gw - 20, 200, [(list(range(1, len(steps) + 1)), steps, D.SERIES[0], 'jarak titik berat per sampel (px)')],
                    0.5, len(steps) + 0.5, 0, max(steps) * 1.15 + 1)
        tot = sum(steps) or 1
        cum = np.cumsum(steps) / tot
        sheet.text(gx, 250, 'spacing (kumulatif per sampel):', 12, D.DIM)
        sheet.text(gx, 268, ' '.join(f'{c * 100:.0f}%' for c in cum), 12, D.PAPER, mono=True)
        sheet.text(gx, 290, f'sampel tiap {(t1 - t0) / max(1, n - 1):.3f}s ({(t1 - t0) / max(1, n - 1) * fps:.1f} frame)', 11, D.DIM)
    return sheet.save(out), cents


def poster_grid(sheets_imgs, out, cols=2):
    ims = [s.im for s in sheets_imgs]
    cw = max(i.size[0] for i in ims)
    ch = max(i.size[1] for i in ims)
    rows = math.ceil(len(ims) / cols)
    big = D.Sheet(cw * min(cols, len(ims)), ch * rows)
    for k, im in enumerate(ims):
        r, c = divmod(k, cols)
        big.paste(im, c * cw, r * ch)
    return big.save(out)
