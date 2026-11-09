#!/usr/bin/env python
"""motion-eye: Claude's eyes and taste for motion. Measures a video (reference or our render), draws what a motion
designer would look at, and judges it with numbers. Read-only: it never edits a project.

  python -I eye.py dna     <video|frames dir|image> [--crop x0,y0,x1,y1] [--fps 10] [--start S] [--seconds N] [--out DIR] [--fresh]
  python -I eye.py review  <render> [--ref <dna.json|video> [--ref-crop x0,y0,x1,y1]] [--posters 8] [--allow-neon] [--flow] [--out DIR]
  python -I eye.py sense   <render|frames dir>          quick ⚑ lines after every render (fps 5, 6 posters)
  python -I eye.py compare <dna.json|dir> <dna.json|dir> [...] [--names a,b,...] [--out file.png]
  python -I eye.py poster  <video|frames|image> [--times 1.2,4.5 | --random 6] [--crop …] [--channel 9:16] [--out DIR]
  python -I eye.py look    <video|frames> --times 1.2,1.25,1.3 | --around 3.2 [--span 7] [--rect x,y,w,h] [--side 540]
  python -I eye.py onion   <video|frames> --from 3.2 --to 3.8 [--n 8] [--rect x,y,w,h] [--out file.jpg]
  python -I eye.py curve   outExpo "spring:zeta=0.65,T=0.35" snap [--frames 24] [--fps 30] [--travel 900] [--out file.png]
  python -I eye.py moments <video> [--autocrop]          where to look: strongest bursts, cuts, longest holds, impacts
  python -I eye.py kiblat  my-ref [more dirs or dna.json] [--out DIR]   taste DNA of many liked references -> kiblat.json
                           (then: review <render> --ref my-ref/_eye/kiblat/kiblat.json)

Add --autocrop to dna/review/sense/poster/look for videos with letterbox or pillarbox bars.
Every command prints the numbers AND writes pictures; open the pictures (Read tool) — the numbers are only half
of seeing. Frame folders default to 30 fps (--src-fps).
"""
import argparse
import json
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

from eyelib import film, poster, review, sheets  # noqa: E402
from eyelib import video as V  # noqa: E402


def log(s):
    print(s, file=sys.stderr, flush=True)


def default_out(inp, sub=None):
    p = os.path.abspath(inp.rstrip('/\\'))
    stem = os.path.splitext(os.path.basename(p))[0]
    parent = os.path.dirname(p)
    if os.path.basename(parent).lower() == 'out' and os.path.isdir(os.path.join(os.path.dirname(parent), 'build')):
        base = os.path.join(os.path.dirname(parent), 'build', 'eye', stem)
    elif os.path.basename(parent).lower() == 'build':
        base = os.path.join(parent, 'eye', stem)
    else:
        base = os.path.join(parent, '_eye', stem)
    return os.path.join(base, sub) if sub else base


DNA_VERSION = 5  # bump when the measurements change, so cached dna.json files are re-read


def _sig(path, a):
    st = os.stat(path) if os.path.isfile(path) else os.stat(os.path.join(path, sorted(os.listdir(path))[-1]))
    return {'size': st.st_size, 'mtime': int(st.st_mtime), 'fps': a.fps, 'start': a.start, 'seconds': a.seconds,
            'crop': a.crop, 'src_fps': a.src_fps, 'v': DNA_VERSION}


def get_dna(path, a, out, need_thumbs=False):
    """Cached film DNA (dna.json) — recomputed when the input or the parameters change, or with --fresh."""
    os.makedirs(out, exist_ok=True)
    jf = os.path.join(out, 'dna.json')
    sig = _sig(path, a)
    if os.path.exists(jf) and not getattr(a, 'fresh', False) and not need_thumbs:
        d = json.load(open(jf, encoding='utf-8'))
        if d.get('sig') == sig:
            if film.refresh(d):   # newer summary rules: re-summarise the cached frames, no decoding
                json.dump(d, open(jf, 'w', encoding='utf-8'))
            return d, None
    log(f'dna: membaca {os.path.basename(path)} @ {a.fps} fps …')
    d, thumbs = film.analyze(path, fps=a.fps, side=360, start=a.start, seconds=a.seconds, src_fps=a.src_fps, log=log,
                             crop=V.parse_crop(a.crop))
    d['sig'] = sig
    json.dump(d, open(jf, 'w', encoding='utf-8'))
    return d, thumbs


def load_dna(p):
    if os.path.isdir(p):
        p = os.path.join(p, 'dna.json')
    d = json.load(open(p, encoding='utf-8'))
    if 'frames' in d:            # a film DNA (a kiblat.json only carries the summary)
        film.refresh(d)
    return d


def dna_text(d):
    s = d['summary']
    pct = lambda v: '–' if v is None else f'{v * 100:.0f}%'
    lines = [f"DNA {d['name']}: {s['duration']}s, {d['w']}×{d['h']}",
             f"  ritme   : {s['shots']} shot, median {s['shot_median']}s, {s['cuts_per_10s']} cut/10 s, {s['transitions']} transisi",
             f"  warna   : {s['colour_fields']} field warna, ΔE antar shot {s['colour_step_dE']}, rentang L {s['shot_L_range']}, "
             f"{s['colours_used']:g} warna/frame, {s['accent_hues']:g} aksen/frame, {s['accent_hues_film']} keluarga aksen sefilm",
             f"  nilai   : L median {s['L50']}, kontras Δ{s['contrast']}, lumpur {pct(s['mud_frames'])}, neon {pct(s['neon_frames'])} frame, halo {s['glow_halo']}%",
             f"  ruang   : ruang kosong {pct(s['negative_space'])}, kosong melompong {pct(s['empty_frames'])}, sesak {pct(s['crowded_frames'])}, satu-bintang {pct(s['one_star'])}",
             f"  mata    : lompatan median {s['eye_jump']}, besar {pct(s['eye_jump_big'])}",
             f"  gerak   : burst {pct(s['burst_share'])}, hold {pct(s['hold_share'])}, punch {s['punch']}×, kamera hidup saat hold {pct(s['camera_alive'])}",
             f"  suara   : cut pas onset {pct(s['cut_sync'])}, hit setelah jeda VO {s['hits_after_pause'] if s['hits_after_pause'] is not None else '–'}"]
    px = lambda f: '–' if f is None else f'{f * d["w"]:.1f}px'
    if 'impact_frames' in s:
        fl = d.get('flash') or {}
        imp = ', '.join(f'{t:.2f}s' for t in fl.get('impacts', [])[:8]) + (' …' if len(fl.get('impacts', [])) > 8 else '')
        st = ', '.join(f'{a:.2f}–{b:.2f}s' for a, b in fl.get('strobes', [])[:4])
        lines.append(f"  optik   : impact 1-frame {s['impact_frames']} ({s['impacts_per_min']}/menit){': ' + imp if imp else ''}; "
                     f"strobo {s.get('strobe_bursts', 0)}{' (' + st + ')' if st else ''}; "
                     f"kedip maks {s['flash_max_per_s']}/detik{' (di ' + str(fl.get('worst_at')) + 's)' if fl.get('worst_at') is not None else ''}; "
                     f"pecah RGB diam {px(s['ca_rest'])} / cepat {px(s['ca_fast'])}")
    return '\n'.join(lines)


def pick_times(d, n, seed=7, flow=False):
    if flow:
        return pick_hold_times(d, n) or pick_times(d, n, seed)
    dur = d['summary']['duration']
    t0 = d.get('start', 0) or 0
    rnd = random.Random(seed)
    times = sorted(round(t0 + 0.4 + rnd.random() * max(0.1, dur - 0.8), 2) for _ in range(max(0, n - 2)))
    longest = sorted(d['shots'], key=lambda s: -s['dur'])[:2]
    times += [round((s['t0'] + s['t1']) / 2, 2) for s in longest]
    return sorted(set(times))[:n]


def pick_hold_times(d, n, min_len=0.4):
    """Flow pieces (CLAUDE.md law 2): a frame mid fly-through is motion, not a poster. Judge only the moments
    where the camera settles and the viewer reads: the middle of the longest holds (energy < film.HOLD_E)."""
    fr = d.get('frames') or []
    fps = d.get('analysis_fps') or 10.0
    runs, cur = [], []
    for f in fr[1:]:
        if f.get('energy', 1.0) < film.HOLD_E:
            cur.append(f['t'])
        elif cur:
            runs.append(cur); cur = []
    if cur:
        runs.append(cur)
    runs = [r for r in runs if len(r) / fps >= min_len]
    runs.sort(key=lambda r: -len(r))
    return sorted(round(r[len(r) // 2], 2) for r in runs[:n])


def run_posters(path, times, a, out, prefix='poster'):
    crits, imgs = [], []
    for t in times:
        rgb = V.frame_at(path, t, long_side=1280, src_fps=a.src_fps, crop=V.parse_crop(a.crop))
        c = poster.critique(rgb, channel=getattr(a, 'channel', None), allow_neon=getattr(a, 'allow_neon', False),
                            flow=getattr(a, 'flow', False))
        c['t'] = t
        crits.append(c)
        imgs.append(poster.render(rgb, c, title=f'{os.path.basename(path)}  t={t:.2f}s', max_h=760))
    grid = sheets.poster_grid(imgs, os.path.join(out, f'{prefix}_sheet.jpg'), cols=2 if len(imgs) > 1 else 1)
    return crits, grid


def cmd_dna(a):
    out = a.out or default_out(a.input)
    d, thumbs = get_dna(a.input, a, out, need_thumbs=True)
    sheet = sheets.dna_sheet(d, thumbs, os.path.join(out, 'dna_sheet.jpg'))
    open(os.path.join(out, 'dna.md'), 'w', encoding='utf-8').write(dna_text(d) + '\n')
    print(dna_text(d))
    print(f'\nfiles: {os.path.join(out, "dna.json")}\n       {sheet}')


def cmd_review(a):
    out = a.out or default_out(a.input)
    d, thumbs = get_dna(a.input, a, out, need_thumbs=True)
    ref = ref_name = None
    if a.ref:
        if a.ref.lower().endswith('.json') or os.path.isdir(a.ref):
            refd = load_dna(a.ref)
        else:
            ra = argparse.Namespace(**vars(a))
            ra.crop, ra.start, ra.seconds = a.ref_crop, 0.0, None
            refd, _ = get_dna(a.ref, ra, default_out(a.ref))
        ref, ref_name = refd['summary'], refd['name']
    times = [float(t) for t in a.times.split(',')] if a.times else pick_times(d, a.posters, flow=getattr(a, 'flow', False))
    crits, grid = run_posters(a.input, times, a, out)
    r = review.score(d['summary'], crits, ref=ref, allow_neon=a.allow_neon, flow=getattr(a, 'flow', False))
    txt = review.text(d['name'], r, d['summary'], ref_name)
    worst = sorted(crits, key=lambda c: c['score'])[:3]
    txt += '\n\nPoster terlemah: ' + ', '.join(f"t={c['t']:.2f}s {c['score']}" for c in worst)
    sheet = sheets.dna_sheet(d, thumbs, os.path.join(out, 'review_sheet.jpg'), review=r)
    open(os.path.join(out, 'review.md'), 'w', encoding='utf-8').write(dna_text(d) + '\n\n' + txt + '\n')
    print(dna_text(d) + '\n\n' + txt)
    print(f'\nfiles: {sheet}\n       {grid}\n       {os.path.join(out, "review.md")}')


def cmd_sense(a):
    a.fps = 5.0
    out = a.out or default_out(a.input, 'sense')
    d, _ = get_dna(a.input, a, out)
    times = pick_times(d, 6, flow=getattr(a, 'flow', False))
    crits, grid = run_posters(a.input, times, a, out, prefix='sense')
    r = review.score(d['summary'], crits, flow=getattr(a, 'flow', False))
    lines = [f"⚑ SENSOR motion: skor rasa ≈{r['score']}/100 · {d['summary']['shots']} shot · "
             f"{d['summary']['colour_fields']} field warna · kontras Δ{d['summary']['contrast']}"]
    lines += [f"⚑ {t}: {v}" for t, v in r['tells']]
    for c in r['cats']:
        if c['pts'] <= 2:
            lines.append(f"⚑ {c['title']}: {c['got']} → target {c['target']}")
    for c in crits:
        bad = [i for i in c['items'] if i['ok'] is False]
        if c['score'] < 70:
            lines.append(f"⚑ poster t={c['t']:.2f}s {c['score']}/100: " + '; '.join(f"{i['key']} ({i['got']})" for i in bad[:3]))
    if len(lines) == 1:
        lines.append('⚑ SENSOR: bersih ✓')
    open(os.path.join(out, 'sense.txt'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    print('\n'.join(lines))
    print(f'\nfiles: {grid}')


def cmd_compare(a):
    dnas = [load_dna(p) for p in a.inputs]
    names = a.names.split(',') if a.names else [d['name'] for d in dnas]
    out = a.out or os.path.join(os.path.dirname(os.path.abspath(a.inputs[0].rstrip('/\\'))), 'compare.jpg')
    sheets.compare_sheet(dnas, names, out)
    keys = list(dnas[0]['summary'].keys())
    print(f"{'metrik':<20}" + ''.join(f'{n[:14]:>15}' for n in names))
    for k in keys:
        print(f'{k:<20}' + ''.join(f"{str(d['summary'].get(k)):>15}" for d in dnas))
    print(f'\nfiles: {out}')


def cmd_poster(a):
    out = a.out or default_out(a.input, 'poster')
    os.makedirs(out, exist_ok=True)
    if V.kind_of(a.input) == 'image':
        times = [0.0]
    elif a.times:
        times = [float(t) for t in a.times.split(',')]
    else:
        info = V.probe(a.input, a.src_fps)
        rnd = random.Random(a.seed)
        times = sorted(round(0.3 + rnd.random() * max(0.1, info['duration'] - 0.6), 2) for _ in range(a.random))
    crits, grid = run_posters(a.input, times, a, out)
    for c in crits:
        bad = [i for i in c['items'] if i['ok'] is False]
        print(f"t={c['t']:.2f}s  POSTER {c['score']}/100 " + ('lolos' if c['pass'] else 'gagal')
              + (f"  (dibatasi 64: {len(c['capped'])} dasar gagal — {', '.join(c['capped'])})" if c.get('capped') else ''))
        for i in c['items']:
            mark = 'OK' if i['ok'] else '--' if i['ok'] is None else 'X '
            print(f"   {mark} {i['key']:<8} {i['pts']:>2}/{i['max']:<2} {i['got']}" + (f"  → {i['fix']}" if i['ok'] is False and i['fix'] else ''))
    print(f'\nfiles: {grid}')


def cmd_look(a):
    if a.around is not None:
        fps = V.probe(a.input, a.src_fps)['fps'] or a.src_fps
        n = max(1, a.span)
        f0 = round(a.around * fps) - n // 2
        times = [max(0.0, (f0 + k) / fps) for k in range(n)]
    elif a.times:
        times = [float(t) for t in a.times.split(',')]
    else:
        raise SystemExit('look: pakai --times t1,t2,… atau --around T [--span N]')
    rect = [int(v) for v in a.rect.split(',')] if a.rect else None
    out = a.out or os.path.join(default_out(a.input, 'look'), f'look_{times[0]:.2f}.jpg')
    print(sheets.look_strip(a.input, times, out, side=a.side, rect=rect, crop=V.parse_crop(a.crop), src_fps=a.src_fps))


def cmd_onion(a):
    rect = [int(v) for v in a.rect.split(',')] if a.rect else None
    out = a.out or os.path.join(default_out(a.input, 'onion'), f'onion_{a.t_from:.2f}-{a.t_to:.2f}.jpg')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    path, cents = sheets.onion(a.input, a.t_from, a.t_to, out, n=a.n, rect=rect, crop=V.parse_crop(a.crop), src_fps=a.src_fps)
    print(path)


def cmd_curve(a):
    out = a.out or os.path.join(os.getcwd(), 'curve.png')
    curves = sheets.curve_sheet(a.specs, a.frames, a.fps, out, travel=a.travel)
    print(f"{a.frames} frame @ {a.fps} fps — frame saat mencapai 50/85/90/99 %, overshoot, antisipasi, settle")
    for lab, vals, m in curves:
        f = lambda k: '–' if m[k] is None else f'f{m[k]}'
        print(f"  {lab:<40} 50%:{f('f50'):>4} 85%:{f('f85'):>4} 90%:{f('f90'):>4} 99%:{f('f99'):>4} settle f{m['settle']:<3}"
              f" overshoot {m['overshoot'] * 100:4.1f}%  antisipasi {m['anticipation'] * 100:4.1f}%")
        print('     spacing: ' + ' '.join(f'{v * 100:.0f}' for v in vals))
        if a.travel:
            print('     px/frame: ' + ' '.join(f"{p['v']:.0f}" for p in m['smear']))
            hot = [p for p in m['smear'] if p['stretch'] > 1.02]
            print('     smear: ' + ('  '.join(f"f{p['f']} {p['stretch']}× RGB {p['ca']:g}px" for p in hot) or 'tidak ada (gerak terlalu pelan)'))
    print(f'\nfiles: {out}')


def cmd_moments(a):
    """Where to look: the strongest bursts, the cuts/transitions, the calmest holds and 1-frame events."""
    d, _ = get_dna(a.input, a, a.out or default_out(a.input))
    fr = d['frames']
    e = [f['energy'] for f in fr]
    peaks = [i for i in range(1, len(e) - 1) if e[i] >= e[i - 1] and e[i] >= e[i + 1] and e[i] > 0.02]
    peaks = sorted(peaks, key=lambda i: -e[i])[:a.n]
    holds, run = [], []
    for i, v in enumerate(e):
        if v < film.HOLD_E:
            run.append(i)
        else:
            if len(run) >= 8:
                holds.append(run)
            run = []
    if len(run) >= 8:
        holds.append(run)
    holds = sorted(holds, key=len, reverse=True)[:3]
    fl = d.get('flash') or {}
    print(f"MOMENTS {d['name']} ({d['summary']['duration']}s)")
    print('  burst terkuat (lihat dengan look --around):', ', '.join(f"{fr[i]['t']:.2f}s" for i in sorted(peaks)))
    print('  cut/transisi:', ', '.join(f"{ev['t']:.2f}s{'~' if ev['kind'] == 'transisi' else ''}" for ev in d['events'][:20]))
    print('  hold terpanjang (poster/tipografi):', ', '.join(f"{fr[r[len(r) // 2]]['t']:.2f}s ({len(r) / d['analysis_fps']:.1f}s)" for r in holds))
    print('  impact 1-frame:', ', '.join(f'{t:.2f}s' for t in fl.get('impacts', [])) or '–',
          '· strobo:', ', '.join(f'{x:.2f}–{y:.2f}s' for x, y in fl.get('strobes', [])) or '–')


def cmd_kiblat(a):
    from eyelib import kiblat as K
    files = K.find_dnas(a.inputs)
    if not files:
        raise SystemExit('kiblat: belum ada dna.json — jalankan dulu: eye.py dna <video> --autocrop untuk tiap referensi')
    dnas = [load_dna(f) for f in files]
    base = a.inputs[0] if os.path.isdir(a.inputs[0]) else os.path.dirname(os.path.abspath(a.inputs[0]))
    out = a.out or os.path.join(base, '_eye', 'kiblat')
    os.makedirs(out, exist_ok=True)
    k = K.combine(dnas)
    json.dump(k, open(os.path.join(out, 'kiblat.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    md = K.report(k, dnas)
    open(os.path.join(out, 'kiblat.md'), 'w', encoding='utf-8').write(md)
    print(md)
    if not a.no_board:
        print('board:', K.board(dnas, os.path.join(out, 'kiblat_board.jpg')))
    print(f"files: {os.path.join(out, 'kiblat.json')}\n       {os.path.join(out, 'kiblat.md')}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)

    def common(p, frames=True):
        p.add_argument('--crop', help='x0,y0,x1,y1: the real canvas when the video was filmed on a screen')
        p.add_argument('--autocrop', action='store_true', help='detect letterbox/pillarbox bars and crop them')
        p.add_argument('--src-fps', type=float, default=30.0, help='fps of a frames folder (default 30)')
        p.add_argument('--out')
        if frames:
            p.add_argument('--fps', type=float, default=10.0, help='analysis fps (default 10)')
            p.add_argument('--start', type=float, default=0.0)
            p.add_argument('--seconds', type=float)
            p.add_argument('--fresh', action='store_true')

    p = sub.add_parser('dna'); p.add_argument('input'); common(p); p.set_defaults(fn=cmd_dna)
    p = sub.add_parser('review'); p.add_argument('input'); common(p)
    p.add_argument('--ref'); p.add_argument('--ref-crop'); p.add_argument('--posters', type=int, default=8)
    p.add_argument('--times'); p.add_argument('--channel'); p.add_argument('--allow-neon', action='store_true')
    p.add_argument('--flow', action='store_true', help='layered 3D collage / camera-flow piece (CLAUDE.md law 2): relaxes focus stars, density, edge bleed and photo colours; neon, mud and contrast stay strict')
    p.set_defaults(fn=cmd_review)
    p = sub.add_parser('sense'); p.add_argument('input'); common(p); p.add_argument('--channel')
    p.add_argument('--flow', action='store_true', help='layered 3D collage / camera-flow piece (CLAUDE.md law 2): relaxes focus stars, density, edge bleed and photo colours; neon, mud and contrast stay strict')
    p.set_defaults(fn=cmd_sense, allow_neon=False)
    p = sub.add_parser('compare'); p.add_argument('inputs', nargs='+'); p.add_argument('--names'); p.add_argument('--out')
    p.set_defaults(fn=cmd_compare)
    p = sub.add_parser('poster'); p.add_argument('input'); common(p, frames=False)
    p.add_argument('--times'); p.add_argument('--random', type=int, default=6); p.add_argument('--seed', type=int, default=7)
    p.add_argument('--channel'); p.add_argument('--allow-neon', action='store_true')
    p.add_argument('--flow', action='store_true', help='layered 3D collage / camera-flow piece (CLAUDE.md law 2): relaxes focus stars, density, edge bleed and photo colours; neon, mud and contrast stay strict')
    p.set_defaults(fn=cmd_poster)
    p = sub.add_parser('look'); p.add_argument('input'); common(p, frames=False)
    p.add_argument('--times'); p.add_argument('--around', type=float, help='frame-by-frame around this time')
    p.add_argument('--span', type=int, default=7, help='frames shown with --around (source fps)')
    p.add_argument('--rect'); p.add_argument('--side', type=int, default=540)
    p.set_defaults(fn=cmd_look)
    p = sub.add_parser('onion'); p.add_argument('input'); common(p, frames=False)
    p.add_argument('--from', dest='t_from', type=float, required=True); p.add_argument('--to', dest='t_to', type=float, required=True)
    p.add_argument('--n', type=int, default=8); p.add_argument('--rect'); p.set_defaults(fn=cmd_onion)
    p = sub.add_parser('curve'); p.add_argument('specs', nargs='+'); p.add_argument('--frames', type=int, default=24)
    p.add_argument('--fps', type=float, default=30.0); p.add_argument('--out')
    p.add_argument('--travel', type=float, help='move length in px: prints px/frame, smear stretch and reactive RGB split')
    p.set_defaults(fn=cmd_curve)
    p = sub.add_parser('moments'); p.add_argument('input'); common(p); p.add_argument('--n', type=int, default=6)
    p.set_defaults(fn=cmd_moments)
    p = sub.add_parser('kiblat'); p.add_argument('inputs', nargs='+'); p.add_argument('--out')
    p.add_argument('--no-board', action='store_true'); p.set_defaults(fn=cmd_kiblat)
    a = ap.parse_args()
    if getattr(a, 'autocrop', False) and not a.crop and V.kind_of(a.input) == 'video':
        a.crop = V.detect_bars(a.input, src_fps=a.src_fps)
        log(f'autocrop: {a.crop or "tidak ada bar"}')
    a.fn(a)


if __name__ == '__main__':
    main()
