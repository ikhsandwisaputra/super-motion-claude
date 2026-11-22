"""Generic chapter mix: VO + procedural non-tonal SFX + transition-hit sounds + calm music bed, all driven by <chapter>/src/beats.js.
  python -I tools/mix_chapter.py bab-1        → bab-1/build/mix.wav
beats.js = `export default { VO, VOFF, END, TAIL, V:{beat: voSeconds}, HITS:[[hit, "beat+off", alpha]], BED:{…}, SFX:[["beat+off", "kind[:arg…]", dB, pan]] }` (strict JSON).
SFX kinds (never glass/bell/chime): travel whoosh[:dur] slide swish rise[:dur] thud impact sub pop card click strike cut drop whistle
  keys:n:span ticks:n:span flaps drops:n:span cards:n:span  f:<part of a file name in assets/stok-situs>[:dur[:start]]."""
import json, re, subprocess, sys, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt

PROJ = Path(__file__).resolve().parents[1]; WS = PROJ.parents[1]; ROOT = PROJ / sys.argv[1]; SR = 48000
src = (ROOT / 'src/beats.js').read_text(); B = json.loads(src[src.index('{'):src.rindex('}') + 1])
VOFF = B['VOFF']; DUR = B['END'] + VOFF + B['TAIL']; T = {k: v + VOFF for k, v in B['V'].items()}
def at(s):
    if isinstance(s, (int, float)): return float(s)
    m = re.fullmatch(r'([A-Za-z_]\w*)\s*([+-]\s*[\d.]+)?', s); return T[m[1]] + (float(m[2].replace(' ', '')) if m[2] else 0)
n = int(SR * DUR); sfx = np.zeros((n, 2)); rng = np.random.default_rng(int(B['VO']) * 7 + 23)

def dec(path, ss=None, t=None, loop=False):
    cmd = ['ffmpeg', '-v', 'error'] + (['-stream_loop', '-1'] if loop else []) + (['-ss', str(ss)] if ss is not None else []) + (['-t', str(t)] if t else []) + ['-i', str(path), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).astype(float)
sys.path.insert(0, str(PROJ / 'tools')); import film   # noqa: E402
vo0 = dec(film.vo(B['VO'])); o = int(VOFF * SR)
if o < 0: vo0, o = vo0[-o:], 0                         # negative VOFF = start mid-take (Studio tests)
if 'VOCUT' in B: vo0 = vo0[:int((B['VOCUT'] + min(VOFF, 0)) * SR)].copy(); vo0[-1200:] *= np.linspace(1, 0, 1200)[:, None]   # VOCUT = VO s where the take stops (25 ms fade)
vo = np.zeros((n, 2)); m = min(len(vo0), n - o); vo[o:o + m] = vo0[:m]

def band(x, lo, hi):
    sos = butter(2, [lo, hi], 'bandpass', fs=SR, output='sos') if lo and hi else butter(2, hi or lo, 'lowpass' if hi else 'highpass', fs=SR, output='sos')
    return sosfilt(sos, x)
def sm(a, b, k=1.0):
    m = max(len(a), len(b)); return np.pad(a, (0, m - len(a))) + k * np.pad(b, (0, m - len(b)))
def norm(x): return x / (np.abs(x).max() + 1e-9)
def add(sig, t0, db=0.0, pan=0.0):
    i = max(0, int(t0 * SR)); sig = sig[: max(0, n - i)] * 10 ** (db / 20)
    if sig.ndim == 2: sfx[i:i + len(sig)] += sig; return
    th = (pan + 1) * np.pi / 4; sfx[i:i + len(sig), 0] += sig * np.cos(th) * 1.414; sfx[i:i + len(sig), 1] += sig * np.sin(th) * 1.414
def burst(dur, lo, hi, decay):
    m = int(dur * SR); return norm(band(rng.standard_normal(m), lo, hi) * np.exp(-np.arange(m) / SR / decay))
def thump(f0, dur, decay, drop=.5):
    m = int(dur * SR); tt = np.arange(m) / SR; f = f0 * (1 + drop * np.exp(-tt / .03))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / decay)
def whoosh(dur, lo, hi, peak=.6, air=.35):
    m = int(dur * SR); k = np.arange(m) / m; x = rng.standard_normal(m)
    env = np.where(k < peak, (k / peak) ** 2.2, np.exp(-(k - peak) / (1 - peak) * 4.5))
    return norm((band(x, lo, hi) * (1 - k) + band(x, lo * 2.2, hi * 2.2) * k + air * band(x, 5000, 11000) * k ** 2) * env)
def card(): return norm(sm(burst(.03, 900, 5200, .006), burst(.05, 250, 900, .012), .5))
def click(): return norm(sm(burst(.012, 1500, 7000, .003), burst(.03, 200, 900, .008), .6))
def one(kind, a):
    f = lambda i, d: float(a[i]) if len(a) > i else d
    if kind == 'travel': return whoosh(.8, 300, 2600, .55, .6)
    if kind == 'whoosh': return whoosh(f(0, .5), 500, 4000, .55, .5)
    if kind == 'slide': return whoosh(.4, 900, 5000, .6, .5)
    if kind == 'swish': return whoosh(.3, 1500, 6000, .4, .6)
    if kind == 'rise': return whoosh(f(0, 1.0), 200, 1800, .92, .3)
    if kind == 'thud': return norm(sm(thump(62, .45, .12, .4), burst(.07, 250, 2000, .015), .7))
    if kind == 'impact': return norm(sm(thump(50, .6, .2, .35), burst(.08, 300, 2500, .015), .8))
    if kind == 'sub': return thump(45, .8, .25, .3)
    if kind == 'pop': return norm(sm(burst(.06, 600, 4500, .012), thump(140, .08, .02, .8), .7))
    if kind == 'card': return card()
    if kind == 'click': return click()
    if kind == 'cut': return whoosh(.28, 3000, 9000, .3, .8)
    if kind == 'drop': return norm(sm(thump(180, .1, .03, .6), burst(.03, 800, 3000, .008), .6))
    if kind == 'strike':
        m2 = int(.5 * SR); sc = band(rng.standard_normal(m2), 1500, 7000) * (0.6 + 0.4 * np.abs(np.sin(np.arange(m2) / SR * 2 * np.pi * 38)))
        return norm(sc * np.exp(-np.arange(m2) / SR / .35))
    if kind == 'crack':                                    # glass crack: broadband snaps spreading outward + a dull body, no ring (no ting)
        m2 = int(.7 * SR); x = np.zeros(m2); L = int(SR * .006)
        for i in range(46):
            p = int(SR * .5 * (i / 46) ** 1.8 + rng.random() * 300)
            if p + L < m2: x[p:p + L] += band(rng.standard_normal(L), 2000, 9000) * np.exp(-np.arange(L) / (SR * .0015)) * (1 - i / 60)
        return norm(sm(norm(x), thump(70, .35, .08, .5), .8))
    if kind == 'whistle':                                  # breathy referee whistle: narrow noise band with a pea trill, no pure tone
        m2 = int(.42 * SR); tt = np.arange(m2) / SR; x = band(rng.standard_normal(m2), 2500, 3300) * (.65 + .35 * np.sin(2 * np.pi * 28 * tt))
        return norm(x * np.clip(tt / .02, 0, 1) * np.clip((.42 - tt) / .08, 0, 1))
    raise SystemExit('sfx kind? ' + kind)
STOK = PROJ / 'assets/stok-situs'
def event(t0, spec, db, pan):
    kind, *a = spec.split(':')
    if kind == 'f':
        f = next(p for p in sorted(STOK.iterdir()) if a[0] in p.name and p.suffix in ('.wav', '.mp3')); x = dec(f)
        if len(a) > 2: x = x[int(float(a[2]) * SR):]; x[:480] *= np.linspace(0, 1, 480)[:, None]   # f:name:dur:start (skip into the file)
        if len(a) > 1: x = x[: int(float(a[1]) * SR)]; x[-2400:] *= np.linspace(1, 0, 2400)[:, None]
        return add(x / (np.abs(x).max() + 1e-9), t0, db)
    if kind in ('keys', 'ticks', 'drops', 'cards'):
        cnt, span = int(a[0]), float(a[1]); g = {'keys': click, 'ticks': click, 'cards': card, 'drops': lambda: one('drop', [])}[kind]
        for i in range(cnt): add(g(), t0 + span * i / cnt + .01 * rng.random(), db - 3 * rng.random(), pan)
        return
    if kind == 'flaps':
        for j in range(4):
            for k in range(14): add(card(), t0 + .15 + j * .05 + k * .05, db - 4 * rng.random(), pan)
        return
    add(one(kind, a), t0, db, pan)

add(.25 * norm(band(rng.standard_normal(n), 60, 400)), 0, -40)                                   # room tone
for e in B.get('SFX', []): event(at(e[0]), e[1], e[2] if len(e) > 2 else -20, e[3] if len(e) > 3 else 0.0)
TXM = json.load(open(PROJ / 'tx/tx.json'))
for name, a, *_ in B.get('HITS', []):                                                             # each hit's own sound, peak on the cut
    w = wave.open(str(PROJ / f'tx/{name}.wav')); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).reshape(-1, 2) / 32768
    start = at(a) - TXM[name]['peak']
    if start < 0: x, start = x[int(-start * SR):], 0.0
    i0 = int(start * SR); x = x[: n - i0] * 10 ** (B.get('HITDB', -6) / 20); sfx[i0:i0 + len(x)] += x

mus = np.zeros((n, 2)); bed = B.get('BED')
if bed:                                                                                           # calm bed: RMS-set, soft fades, ducked, optional gaps
    kind, name = bed['file'].split(':', 1); f = (STOK if kind == 'stok' else WS) / name
    mu = dec(f, bed.get('ss', 0), DUR, bed.get('loop', False))[:n]; mu *= 10 ** (bed.get('rms', -30) / 20) / (np.sqrt((mu ** 2).mean()) + 1e-9)
    tt = np.arange(len(mu)) / SR; g = np.clip(tt / bed.get('fin', 2.0), 0, 1) * np.clip((DUR - tt) / bed.get('fout', 2.5), 0, 1)
    for a, d in bed.get('gaps', []): g *= 1 - np.clip((tt - at(a)) / .12, 0, 1) * np.clip((at(a) + d - tt) / .5, 0, 1)
    win = int(.25 * SR); env = np.sqrt(np.convolve(vo.mean(1) ** 2, np.ones(win) / win, 'same')); duck = 1 - bed.get('duck', .55) * np.clip(env / .03, 0, 1)
    k = int(.4 * SR); duck = np.convolve(duck, np.ones(k) / k, 'same'); mus[:len(mu)] = mu * (g * duck[:len(mu)])[:, None]
mix = vo + sfx + mus; mix /= max(1.0, np.abs(mix).max() / .95)
(ROOT / 'build').mkdir(exist_ok=True)
with wave.open(str(ROOT / 'build/mix.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
rms = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
print(f"{sys.argv[1]}: {DUR:.2f} s · {len(B.get('SFX', []))} sfx events · {len(B.get('HITS', []))} hits · music RMS {rms(mus):.1f} · VO RMS {rms(vo):.1f} · SFX RMS {rms(sfx):.1f} · SFX peak {20*np.log10(np.abs(sfx).max()+1e-9):.1f} · mix peak {20*np.log10(np.abs(mix).max()):.1f} dB")
