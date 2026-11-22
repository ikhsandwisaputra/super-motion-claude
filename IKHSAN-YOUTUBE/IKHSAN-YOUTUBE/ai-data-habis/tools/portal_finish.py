"""After the first full render: re-render the Portal QR frames at every chapter join, then re-run render_full.py.

  normally started by tools/render_safe.sh after render_full.py; alone: .venv/bin/python -I aset/<slug>/tools/portal_finish.py

Waits for any running render_full.py, keeps the portal-less master as out/<out>_v<versi>_tanpa-portal.mp4 (a rename, nothing is
deleted), overwrites the last 20 frames (portal out) and first 16 frames (portal in) of each chapter in <ch>/build/full/, then
runs render_full.py, which re-encodes the changed chapters, lays the portal SFX at the joins and writes the master again.
Safe to re-run: a marker file build/portal_frames.done skips the frame step once it has finished."""
import json, os, subprocess, sys, time
from pathlib import Path
P = Path(__file__).resolve().parents[1]; WS = P.parents[1]; PY = str(WS / '.venv/bin/python')
sys.path.insert(0, str(P / 'tools')); import film   # noqa: E402
CH = [c['dir'] for c in film.chapters()]; DUR = {c['dir']: c['dur'] for c in film.chapters()}
STATUS = P / 'build/render_full.status'; MARK = P / 'build/portal_frames.done'

def log(*a):
    s = time.strftime('%H:%M:%S ') + '[portal] ' + ' '.join(map(str, a)); print(s, flush=True)
    with open(STATUS, 'a') as f: f.write(s + '\n')
def nframes(ch):
    if ch in DUR: return round(DUR[ch] * 30)
    s = (P / ch / 'src/beats.js').read_text(); B = json.loads(s[s.index('{'):s.rindex('}') + 1]); return round((B['END'] + B['VOFF'] + B['TAIL']) * 30)
def running(): return subprocess.run(['pgrep', '-f', 'tools/render_full.py'], capture_output=True).returncode == 0

log('waiting for the running full render');
while running(): time.sleep(30)
v1 = film.master(); keep = v1.with_name(v1.stem + '_tanpa-portal.mp4')
if not MARK.exists():
    if v1.exists() and not keep.exists(): v1.rename(keep); log('kept the portal-less master as', keep.name)
    for i, ch in enumerate(CH):
        n = nframes(ch); fr = (list(range(16)) if i else []) + (list(range(n - 20, n)) if i < len(CH) - 1 else [])
        for attempt in range(3):
            r = subprocess.run([PY, '-I', 'tools/render.py', '--scene', 'a', '--frames', ','.join(map(str, fr)), '--out', 'build/full', '--workers', '3'],
                               cwd=P / ch, capture_output=True, text=True)
            if r.returncode == 0: break
            log(ch, f'try {attempt + 1} rc {r.returncode}', r.stdout[-300:], r.stderr[-300:]); time.sleep(5)
        else: log('!!! frames failed for', ch); sys.exit(2)
        log(ch, f'{len(fr)} join frames re-rendered (of {n})')
    MARK.write_text(time.strftime('%F %T\n'))
log('re-running render_full.py')
r = subprocess.run([PY, '-I', str(P / 'tools/render_full.py')], cwd=WS, stdout=open(P / 'build/render_full.log', 'a'), stderr=subprocess.STDOUT)
log('render_full rc', r.returncode)
