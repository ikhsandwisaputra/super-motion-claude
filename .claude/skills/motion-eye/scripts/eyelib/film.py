"""Film DNA: measure a whole video (reference or our render) as a designer would scrub it.

Per analysed frame: light/colour (Lab), palette, hue families, neon + glow halo, negative space, focal point and
how many elements compete for the eye, motion energy, camera motion (pan/zoom/roll from optical flow).
Per film: cuts/transitions, shots with their dominant colour (the colour script), eye jumps across cuts, rhythm
of bursts and holds, whether the camera breathes during holds, and (with sound) onsets and silences.
"""
import math
import os

import cv2
import numpy as np

from . import measure as M
from . import video as V

SUM_VERSION = 2   # bump when only the summary changes: cached frames are re-summarised without decoding again
HOLD_E = 0.006    # mean |diff| per analysed frame below this = a hold (reading time)
BURST_E = 0.035   # above this = a burst (entrance, slam, transition)
CUT_D = 0.30      # histogram distance spike for a hard cut
TRANS_D = 0.16    # sustained change above this = a transition in progress


def _onsets(y, sr, hop=256, n_fft=1024):
    if len(y) < n_fft * 4:
        return [], [], None, {}
    win = np.hanning(n_fft).astype(np.float32)
    n = 1 + (len(y) - n_fft) // hop
    idx = np.arange(n_fft)[None, :] + hop * np.arange(n)[:, None]
    S = np.abs(np.fft.rfft(y[idx] * win, axis=1))
    flux = np.maximum(0, np.diff(np.log1p(S * 20), axis=0)).sum(axis=1)
    flux = np.convolve(flux, np.ones(3) / 3, mode='same')
    times = (np.arange(1, n) * hop + n_fft / 2) / sr
    freqs = np.fft.rfftfreq(n_fft, 1.0 / sr)
    on, cents = [], []
    w = int(0.05 * sr / hop) + 1
    k = int(1.5 * sr / hop)
    for i in range(1, len(flux) - 1):
        a, b = max(0, i - k), min(len(flux), i + k)
        thr = np.median(flux[a:b]) + 1.5 * np.std(flux[a:b])
        if flux[i] > thr and flux[i] == flux[max(0, i - w):i + w + 1].max():
            on.append(round(float(times[i]), 3))
            spec = S[i + 1]
            cents.append(float((spec * freqs).sum() / (spec.sum() + 1e-9)))
    # beat regularity: autocorrelation of the onset envelope between 60 and 180 BPM
    env = flux - flux.mean()
    ac = np.correlate(env, env, mode='full')[len(env) - 1:]
    ac = ac / (ac[0] + 1e-9)
    fr = sr / hop
    lags = np.arange(int(fr * 60 / 180), min(len(ac) - 1, int(fr * 60 / 60)))
    beat = {}
    if len(lags):
        best = lags[np.argmax(ac[lags])]
        beat = {'tempo_bpm': round(60 * fr / best, 1), 'beat_strength': round(float(ac[best]), 2)}
    # silences: RMS in 50 ms windows under -42 dBFS for >= 0.15 s
    win_n = int(0.05 * sr)
    m = len(y) // win_n
    rms = np.sqrt(np.mean(y[:m * win_n].reshape(m, win_n) ** 2, axis=1) + 1e-12)
    db = 20 * np.log10(rms)
    sil = []
    start = None
    for i, v in enumerate(db):
        if v < -42 and start is None:
            start = i
        elif v >= -42 and start is not None:
            if (i - start) * 0.05 >= 0.15:
                sil.append([round(start * 0.05, 2), round(i * 0.05, 2)])
            start = None
    dur = len(y) / sr
    live = db[db > -60]
    char = dict(beat)
    char.update({
        'onsets_per_s': round(len(on) / max(dur, 1e-6), 2),
        'bright_onsets': round(float(np.mean([c > 3000 for c in cents])), 2) if cents else None,   # clicks, whooshes, ticks
        'boomy_onsets': round(float(np.mean([c < 300 for c in cents])), 2) if cents else None,     # booms, kicks, sub hits
        'silence_share': round(float(np.mean(db < -42)), 2),
        'dyn_range_db': round(float(np.percentile(live, 95) - np.percentile(live, 10)), 1) if len(live) else None,
    })
    return on, sil, round(float(np.percentile(db, 95)), 1), char


def analyze(path, fps=10.0, side=360, start=0.0, seconds=None, src_fps=30.0, log=print, keep_thumbs=True, crop=None):
    info = V.probe(path, src_fps)
    if crop:
        info = dict(info, w=crop[2], h=crop[3])
    frames = []
    thumbs = []
    prev_sig = prev_small = None
    for t, rgb in V.iter_frames(path, fps=fps, long_side=side, start=start, duration=seconds, src_fps=src_fps,
                                crop=crop):
        lab = M.to_lab(rgb)
        small = cv2.cvtColor(cv2.resize(rgb, V.fit_size(rgb.shape[1], rgb.shape[0], 160), interpolation=cv2.INTER_AREA),
                             cv2.COLOR_RGB2GRAY)
        sig = M.hist_sig(lab)
        rec = {'t': round(t, 3)}
        bg = M.dominant_lab(lab)
        ink = M.ink_mask(lab, bg)
        rec.update(M.light_stats(lab, ink))
        rec['pal'] = M.palette(lab)
        rec['inkpal'] = M.ink_palette(lab, ink)
        rec['fams'] = M.hue_families(lab)
        rec['accents'] = M.hue_families(lab, mask=ink, fam_min=0.04)
        sp, _ = M.space_stats(rgb)
        rec.update(sp)
        diff = None
        if prev_small is not None:
            diff = cv2.absdiff(small, prev_small).astype(np.float32) / 255.0
            rec['energy'] = round(float(diff.mean()), 4)
            rec['dist'] = round(M.hist_dist(prev_sig, sig), 3)
            cam = M.camera_motion(prev_small, small)
            rec['cam'] = {k: round(v, 5) for k, v in cam.items()}
        else:
            rec['energy'], rec['dist'], rec['cam'] = 0.0, 0.0, None
        rec['focal'] = M.focal(M.saliency(rgb, lab, motion=diff))
        rec['ca'] = M.chroma_shift(rgb)
        frames.append(rec)
        if keep_thumbs:
            thumbs.append(cv2.resize(rgb, V.fit_size(rgb.shape[1], rgb.shape[0], 200), interpolation=cv2.INTER_AREA))
        prev_sig, prev_small = sig, small
        if len(frames) % 100 == 0:
            log(f'  … {t:.1f}s')
    if not frames:
        raise ValueError('no frames decoded')

    # ---- cuts and transitions
    dist = np.array([f['dist'] for f in frames])
    events = []
    i = 1
    n = len(frames)
    while i < n:
        a, b = max(1, i - 15), min(n, i + 15)
        med = float(np.median(dist[a:b]))
        if dist[i] >= CUT_D and dist[i] >= 2.5 * max(med, 0.02):
            events.append({'i': i, 'kind': 'cut', 'span': 1})
            i += 2
            continue
        if dist[i] >= TRANS_D:
            j = i
            while j < n and dist[j] >= TRANS_D * 0.75:
                j += 1
            if j - i >= 3:
                events.append({'i': i, 'kind': 'transisi', 'span': j - i})
                i = j + 1
                continue
        i += 1

    # ---- shots
    bounds = [0] + [e['i'] for e in events] + [n]
    shots = []
    for s in range(len(bounds) - 1):
        a, b = bounds[s], bounds[s + 1]
        if b - a < 1:
            continue
        mid = (a + b) // 2
        seg = frames[a:b]
        dom = frames[mid]['pal'][0] if frames[mid]['pal'] else {'hex': '#000000', 'L': 0, 'C': 0, 'hue': 'netral'}
        shots.append({
            'n': len(shots) + 1, 't0': frames[a]['t'], 't1': frames[b - 1]['t'] + 1.0 / fps,
            'dur': round((b - a) / fps, 2), 'mid': mid, 'dominant': dom, 'palette': frames[mid]['pal'][:5],
            'L50': round(float(np.mean([f['L50'] for f in seg])), 1),
            'contrast': round(float(np.mean([f['contrast'] for f in seg])), 1),
            'energy_mean': round(float(np.mean([f['energy'] for f in seg])), 4),
            'energy_peak': round(float(np.max([f['energy'] for f in seg])), 4),
            'focal_in': seg[min(1, len(seg) - 1)]['focal'], 'focal_out': seg[-1]['focal'],
        })
    for e in events:
        e['t'] = frames[e['i']]['t']
        before = frames[max(0, e['i'] - 1)]['focal']
        after = frames[min(n - 1, e['i'] + e['span'])]['focal']
        e['jump'] = round(math.hypot((after['x'] - before['x']) * info['w'], (after['y'] - before['y']) * info['h'])
                          / math.hypot(info['w'], info['h']), 3)

    # ---- sound
    snd = None
    if info.get('audio'):
        y, sr = V.audio(path)
        if seconds is not None or start > 0:
            y = y[int(start * sr):int((start + (seconds or 1e9)) * sr)]
        on, sil, p95, char = _onsets(y, sr)
        on = [round(o + start, 3) for o in on]
        sil = [[round(a + start, 2), round(b + start, 2)] for a, b in sil]
        snd = {'onsets': on, 'silences': sil, 'rms_p95_db': p95, 'character': char}

    log('  kedip & impact (tiap frame) …')
    flash = flash_pass(path, info['fps'] or src_fps, crop, start, seconds, src_fps)
    dna = {'file': os.path.abspath(path), 'name': os.path.splitext(os.path.basename(path.rstrip('/\\')))[0],
           'w': info['w'], 'h': info['h'], 'src_fps': info['fps'], 'duration': round(info['duration'], 2),
           'start': start, 'crop': list(crop) if crop else None, 'analysis_fps': fps, 'frames': frames,
           'events': events, 'shots': shots, 'sound': snd, 'flash': flash}
    dna['summary'] = summarize(dna)
    dna['sum_v'] = SUM_VERSION
    return dna, thumbs


def refresh(dna):
    """Re-summarise a cached DNA whose summary is older than this code (no decoding). True when it changed."""
    if dna.get('sum_v') == SUM_VERSION:
        return False
    dna['summary'] = summarize(dna)
    dna['sum_v'] = SUM_VERSION
    return True


def _ink_contrast(f):
    """Per-frame ink-vs-background lightness difference: measured, or from the palettes of older caches."""
    if f.get('ink_contrast') is not None:
        return f['ink_contrast']
    pal, ink = f.get('pal') or [], [p for p in (f.get('inkpal') or []) if p['share'] >= 0.1]
    if not pal or not ink:
        return None
    return max(abs(p['L'] - pal[0]['L']) for p in ink)


def flash_pass(path, fps, crop, start, seconds, src_fps):
    """Every source frame, tiny: 1-frame impact events and general flashes per second (WCAG 2.3.1 style:
    a flash = a pair of opposing luminance changes >= 0.1 where the darker side is < 0.8, over >= 25 % of the frame;
    > 3 flashes in any second fails). An approximation from the pixels, not an official PEAT test."""
    Y, G, T = [], [], []
    for t, rgb in V.iter_frames(path, fps=fps, long_side=64, start=start, duration=seconds, src_fps=src_fps, crop=crop):
        Y.append(M.rel_luminance(rgb))
        G.append(cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(np.float32) / 255.0)
        T.append(round(t, 3))
    impacts, trans = [], []
    # luminance per area (4x4 cells, each 1/16 of the frame): a moving pattern averages out inside a cell,
    # a real flash (whiteout, invert, strobe) changes the cell means
    C = [cv2.resize(y, (4, 4), interpolation=cv2.INTER_AREA) for y in Y]
    for i in range(1, len(Y)):
        d = C[i] - C[i - 1]
        dark = np.minimum(C[i], C[i - 1]) < 0.8
        up = int(((d >= 0.1) & dark).sum())
        down = int(((d <= -0.1) & dark).sum())
        if up >= 4 or down >= 4:   # >= 25 % of the frame changing together
            trans.append((T[i], 1 if up >= down else -1))
        if 1 <= i < len(G) - 1:
            dp = float(np.abs(G[i] - G[i - 1]).mean())
            dn = float(np.abs(G[i] - G[i + 1]).mean())
            ds = float(np.abs(G[i + 1] - G[i - 1]).mean())
            if min(dp, dn) >= 0.12 and ds <= 0.4 * min(dp, dn):
                impacts.append(T[i])
    # neighbouring 1-frame events are a strobe burst, not separate impacts
    groups = []
    for t in impacts:
        if groups and t - groups[-1][-1] <= 2.5 / max(fps, 1):
            groups[-1].append(t)
        else:
            groups.append([t])
    impacts = [g[0] for g in groups if len(g) <= 2]
    strobes = [[g[0], g[-1]] for g in groups if len(g) > 2]
    flashes, last = [], 0
    for t, s in trans:
        if last and s == -last:
            flashes.append(t)
            last = 0
        else:
            last = s
    worst, at = 0, None
    for t in flashes:
        n = sum(1 for u in flashes if t <= u < t + 1.0)
        if n > worst:
            worst, at = n, t
    return {'impacts': impacts, 'strobes': strobes, 'flashes': flashes, 'max_per_s': worst, 'worst_at': at,
            'frames': len(Y)}


def _cluster_colors(hexes, de=15.0):
    labs = [M.hex_lab(h) for h in hexes]
    reps = []
    for l in labs:
        if not any(np.linalg.norm(l - r) < de for r in reps):
            reps.append(l)
    return len(reps)


def summarize(dna):
    fr = dna['frames']
    sh = dna['shots']
    ev = dna['events']
    fps = dna['analysis_fps']
    dur = len(fr) / fps
    q = lambda key, p=50: float(np.percentile([f[key] for f in fr], p))
    energy = np.array([f['energy'] for f in fr[1:]] or [0.0])
    holds = energy < HOLD_E
    cams = [f['cam'] for f in fr[1:]]
    alive = []
    for h, c in zip(holds, cams):
        if h and c and c['texture'] > 0.004:
            alive.append(c['pan'] > 0.0004 or abs(c['zoom']) > 0.02 or abs(c['roll']) > 0.01)
    dom_hex = [s['dominant']['hex'] for s in sh]
    de_steps = [float(np.linalg.norm(M.hex_lab(a) - M.hex_lab(b))) for a, b in zip(dom_hex, dom_hex[1:])]
    shot_L = [s['L50'] for s in sh]
    jumps = [e['jump'] for e in ev]
    one_star = [f['focal']['stars'] <= 2 and f['focal']['clarity'] >= 0.45 for f in fr]
    mud = [f['L50'] < 22 and f['contrast'] < 45 for f in fr]
    snd = dna.get('sound')
    sync = None
    hit_after_pause = None
    if snd and ev:
        on = np.array(snd['onsets']) if snd['onsets'] else np.array([1e9])
        sync = round(float(np.mean([np.min(np.abs(on - e['t'])) <= 0.12 for e in ev])), 2)
        bursts = [f['t'] for f, e in zip(fr[1:], energy) if e >= BURST_E]
        ends = [b for _, b in snd['silences']]
        if ends:
            hit_after_pause = sum(1 for b in ends if any(0.0 <= t - b <= 0.4 for t in bursts))
    s = {
        'duration': round(dur, 2),
        'shots': len(sh),
        'shot_median': round(float(np.median([x['dur'] for x in sh])), 2) if sh else None,
        'cuts_per_10s': round(sum(1 for e in ev if e['kind'] == 'cut') / dur * 10, 2),
        'transitions': sum(1 for e in ev if e['kind'] == 'transisi'),
        'colour_fields': _cluster_colors(dom_hex) if dom_hex else 0,
        'colour_step_dE': round(float(np.mean(de_steps)), 1) if de_steps else 0.0,
        'shot_L_range': round(float(np.ptp(shot_L)), 1) if shot_L else 0.0,
        'L50': round(q('L50'), 1),
        'contrast': round(q('contrast'), 1),
        'ink_contrast': round(float(np.median([c for c in (_ink_contrast(f) for f in fr) if c is not None] or [0])), 1),
        'chroma': round(q('C_mean'), 1),
        'neon_ink': round(float(np.mean([f['neon_ink'] for f in fr])), 2),
        'neon_frames': round(float(np.mean([f['neon_ink'] > 0.25 for f in fr])), 2),
        'glow_halo': round(float(np.mean([f['glow_halo'] for f in fr])) * 100, 2),
        'palette_size': float(np.median([len(f['pal']) for f in fr])),
        'colours_used': float(np.median([len(M.colour_groups(f['pal'][:1] + f['inkpal'])) for f in fr])),
        'accent_hues': float(np.median([len(f['accents']) for f in fr])),
        'accent_hues_film': len({a['name'] for f in fr for a in f['accents']}),
        'hue_families': float(np.median([len(f['fams']) for f in fr])),
        'rainbow_frames': round(float(np.mean([len(f['fams']) >= 4 for f in fr])), 2),
        'negative_space': round(q('negative_space'), 2),
        'empty_frames': round(float(np.mean([f['negative_space'] > 0.85 for f in fr])), 2),
        'crowded_frames': round(float(np.mean([f['negative_space'] < 0.12 for f in fr])), 2),
        'one_star': round(float(np.mean(one_star)), 2),
        'mud_frames': round(float(np.mean(mud)), 2),
        'eye_jump': round(float(np.median(jumps)), 3) if jumps else None,
        'eye_jump_big': round(float(np.mean([j > 0.35 for j in jumps])), 2) if jumps else None,
        'energy_mean': round(float(energy.mean()), 4),
        'punch': round(float(np.percentile(energy, 95) / max(1e-4, np.median(energy))), 1),
        'hold_share': round(float(holds.mean()), 2),
        'burst_share': round(float((energy >= BURST_E).mean()), 2),
        'camera_alive': round(float(np.mean(alive)), 2) if alive else None,
        'cut_sync': sync,
        'hits_after_pause': hit_after_pause,
    }
    # optics: chromatic split while holding vs while moving fast (fraction of frame width)
    ca_hold = [f['ca'] for f, e in zip(fr[1:], energy) if e < HOLD_E and f.get('ca') is not None]
    ca_fast = [f['ca'] for f, e in zip(fr[1:], energy) if e >= BURST_E and f.get('ca') is not None]
    s['ca_rest'] = round(float(np.median(ca_hold)), 5) if ca_hold else None
    s['ca_fast'] = round(float(np.percentile(ca_fast, 90)), 5) if ca_fast else None   # the spikes on hits
    fl = dna.get('flash') or {}
    s['impact_frames'] = len(fl.get('impacts', []))
    s['strobe_bursts'] = len(fl.get('strobes', []))
    s['impacts_per_min'] = round(len(fl.get('impacts', [])) / max(dur, 1e-6) * 60, 1)
    s['flash_max_per_s'] = fl.get('max_per_s')
    ch = (snd or {}).get('character') or {}
    for k in ('onsets_per_s', 'bright_onsets', 'boomy_onsets', 'silence_share', 'dyn_range_db', 'tempo_bpm', 'beat_strength'):
        s['snd_' + k] = ch.get(k)
    return s
