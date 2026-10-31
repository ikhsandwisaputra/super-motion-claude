"""Kiblat: the taste DNA shared by many references the user likes (different creators, one taste).

Every reference is read by `dna` first. Here their summaries are combined: per number the median and the spread;
a number that hardly varies across the references is a SIGNATURE of the taste (keep it), one that varies is FREE
(decide it from the concept). The result (kiblat.json) has a `summary` of medians, so `review --ref kiblat.json`
judges a render against the whole taste instead of one video.
"""
import glob
import json
import math
import os

import numpy as np

from . import draw as D
from . import sheets as S
from . import video as V

PCT = {'mud_frames', 'neon_frames', 'negative_space', 'empty_frames', 'crowded_frames', 'one_star', 'eye_jump_big',
       'burst_share', 'hold_share', 'camera_alive', 'cut_sync', 'rainbow_frames', 'snd_bright_onsets',
       'snd_boomy_onsets', 'snd_silence_share'}
LABEL = {
    'shot_median': 'median shot (s)', 'cuts_per_10s': 'cut per 10 s', 'transitions': 'transisi', 'colour_fields': 'field warna',
    'colour_step_dE': 'ΔE antar shot', 'shot_L_range': 'rentang L antar shot', 'L50': 'L median', 'contrast': 'kontras Δ',
    'ink_contrast': 'kontras tinta vs latar',
    'chroma': 'chroma rata2', 'mud_frames': 'frame lumpur', 'neon_frames': 'frame neon', 'glow_halo': 'halo %',
    'colours_used': 'warna/frame', 'accent_hues': 'aksen/frame', 'accent_hues_film': 'keluarga aksen sefilm',
    'negative_space': 'ruang kosong', 'empty_frames': 'kosong melompong', 'crowded_frames': 'sesak',
    'one_star': 'satu bintang', 'eye_jump': 'lompatan mata median', 'eye_jump_big': 'lompatan mata besar',
    'energy_mean': 'energi rata2', 'punch': 'punch ×', 'burst_share': 'burst', 'hold_share': 'hold',
    'camera_alive': 'kamera hidup', 'cut_sync': 'cut pas onset', 'impacts_per_min': 'impact 1-frame /menit',
    'flash_max_per_s': 'kedip maks /detik',
    'snd_onsets_per_s': 'onset audio /detik', 'snd_bright_onsets': 'onset terang (klik/whoosh)',
    'snd_boomy_onsets': 'onset berat (boom/bass)', 'snd_silence_share': 'senyap', 'snd_dyn_range_db': 'rentang dinamik dB',
    'snd_tempo_bpm': 'tempo BPM', 'snd_beat_strength': 'kekuatan beat',
}
ORDER = list(LABEL.keys())


def find_dnas(paths):
    out = []
    for p in paths:
        if os.path.isdir(p):
            hits = sorted(glob.glob(os.path.join(p, '_eye', '*', 'dna.json')) + glob.glob(os.path.join(p, '*', 'dna.json')))
            if os.path.exists(os.path.join(p, 'dna.json')):
                hits.append(os.path.join(p, 'dna.json'))
            out += hits
        elif p.lower().endswith('.json'):
            out.append(p)
    seen, uniq = set(), []
    for p in out:
        k = os.path.abspath(p)
        if k not in seen:
            seen.add(k)
            uniq.append(k)
    return uniq


def combine(dnas):
    keys = [k for k in ORDER if any(isinstance(d['summary'].get(k), (int, float)) for d in dnas)]
    med, spread, sig, free = {}, {}, [], []
    for k in keys:
        v = np.array([d['summary'][k] for d in dnas if isinstance(d['summary'].get(k), (int, float))], float)
        if not len(v):
            continue
        q1, m, q3 = np.percentile(v, [25, 50, 75])
        med[k] = round(float(m), 4)
        spread[k] = [round(float(q1), 4), round(float(q3), 4)]
        iqr = q3 - q1
        tight = iqr <= 0.15 if k in PCT else (iqr <= 0.35 * abs(m) if abs(m) > 1e-9 else iqr < 1e-6)
        (sig if tight else free).append(k)
    summ = dict(med)
    summ['duration'] = round(float(np.median([d['summary']['duration'] for d in dnas])), 2)
    return {'name': 'kiblat', 'members': [d['name'] for d in dnas], 'n': len(dnas), 'summary': summ,
            'spread': spread, 'signature': sig, 'free': free}


def fmt(k, v):
    if v is None:
        return '–'
    if k in PCT:
        return f'{v * 100:.0f}%'
    if k in ('ca_rest', 'ca_fast'):
        return f'{v * 100:.2f}%W'
    return f'{v:g}' if isinstance(v, int) else f'{v:.3g}'


def report(k, dnas):
    s = k['summary']
    lines = [f"# Kiblat rasa — {k['n']} referensi", '',
             'Median dan sebaran (kuartil 25–75 %) dari semua referensi. SIGNATURE = hampir sama di semua video '
             '(itulah selera yang dipegang); BEBAS = berbeda-beda (diputuskan per konsep).', '',
             '| metrik | median | sebaran | sifat |', '|---|---|---|---|']
    for key in ORDER:
        if key in s:
            a, b = k['spread'][key]
            lines.append(f"| {LABEL[key]} | {fmt(key, s[key])} | {fmt(key, a)}–{fmt(key, b)} | "
                         f"{'**SIGNATURE**' if key in k['signature'] else 'bebas'} |")
    lines += ['', '## Per video', '', '| video | durasi | format | shot med | field | kontras | lumpur | burst | punch | onset/s | BPM |',
              '|---|---|---|---|---|---|---|---|---|---|---|']
    for d in dnas:
        x = d['summary']
        lines.append(f"| {d['name']} | {x['duration']}s | {d['w']}×{d['h']} | {x['shot_median']}s | {x['colour_fields']} | "
                     f"{x['contrast']} | {fmt('mud_frames', x['mud_frames'])} | {fmt('burst_share', x['burst_share'])} | "
                     f"{x['punch']} | {fmt('snd_onsets_per_s', x.get('snd_onsets_per_s'))} | {fmt('snd_tempo_bpm', x.get('snd_tempo_bpm'))} |")
    return '\n'.join(lines) + '\n'


def board(dnas, path, n_thumbs=8, th=96):
    """One row per reference: name, colour script and n frames across the film — the taste at a glance."""
    rows = []
    for d in dnas:
        crop = tuple(d['crop']) if d.get('crop') else None   # stored as (x, y, w, h)
        dur = d['duration']
        ims = []
        for i in range(n_thumbs):
            t = (d.get('start') or 0) + dur * (i + 0.5) / n_thumbs
            try:
                im = V.frame_at(d['file'], t, long_side=None, crop=crop)
                h, w = im.shape[:2]
                ims.append(np.asarray(D.thumb(im, max(th, int(th * w / h)) if w >= h else th)))
            except Exception:
                pass
        rows.append((d, ims))
    tw = max((sum(i.shape[1] + 4 for i in ims) for _, ims in rows), default=800)
    W = max(1400, 320 + tw + 20)
    H = 60 + len(rows) * (th + 40)
    sh = D.Sheet(W, H)
    sh.text(20, 14, f'KIBLAT — {len(rows)} referensi yang disukai (warna script + {n_thumbs} frame merata per video)', 18,
            D.PAPER, bold=True)
    y = 56
    for d, ims in rows:
        s = d['summary']
        sh.text(20, y, d['name'][:34], 12, D.PAPER, bold=True)
        sh.text(20, y + 18, f"{s['duration']}s · {d['w']}×{d['h']}", 11, D.DIM)
        sh.text(20, y + 34, f"shot {s['shot_median']}s · {s['colour_fields']} field", 11, D.DIM)
        sh.text(20, y + 50, f"kontras Δ{s['contrast']} · punch {s['punch']}×", 11, D.DIM)
        sh.paste(S._barcode(d['frames'], 280, 14), 20, y + 70)
        x = 320
        for im in ims:
            h, w = im.shape[:2]
            sh.paste(im, x, y + (th - h) // 2)
            x += w + 4
        y += th + 40
    return sh.save(path)
