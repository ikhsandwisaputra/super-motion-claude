"""Pengantar mix (Batam SWRO): VO first, server & sea atmosphere, Ahri stock SFX, non-tonal SFX on every beat.
Writes build/mix_full.wav (48 kHz stereo) & build/sfx_placed.json. Usage: python -I tools/mix.py"""
import json, subprocess, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt

def _ma(x, w):
    p = np.concatenate([np.zeros(w - 1), x, np.zeros(w - 1)])
    c = np.concatenate([[0.], np.cumsum(p)])
    f = (c[w:] - c[:-w]) / w
    s = (w - 1) // 2
    return f[s:s + len(x)]

ROOT = Path(__file__).resolve().parents[1]
WS = ROOT.parents[2]
TR = ROOT.parents[1] / '_transisi'
STOK = ROOT.parent / 'assets/stok-situs'
SR = 48000
TL = json.load(open(ROOT / 'src/timeline.json', encoding='utf-8'))
A, DUR = TL['A'], TL['dur']
n = int(SR * DUR)
sfx = np.zeros((n, 2))
rng = np.random.default_rng(7)
placed = []

def band(x, lo, hi):
    if lo and hi: sos = butter(2, [lo, hi], 'bandpass', fs=SR, output='sos')
    elif hi: sos = butter(2, hi, 'lowpass', fs=SR, output='sos')
    else: sos = butter(2, lo, 'highpass', fs=SR, output='sos')
    return sosfilt(sos, x)

def norm(x): return x / (np.abs(x).max() + 1e-9)

def add(sig, at, gain_db=0.0, pan=0.0, name=None, mark=None):
    i = max(0, int(at * SR))
    sig = sig[:max(0, n - i)] * 10 ** (gain_db / 20)
    th = (pan + 1) * np.pi / 4
    sfx[i:i + len(sig), 0] += sig * np.cos(th) * 1.414
    sfx[i:i + len(sig), 1] += sig * np.sin(th) * 1.414
    if name: placed.append({'t': round(mark if mark is not None else at, 3), 'name': name})

def burst(dur, lo, hi, decay):
    m = int(dur * SR); return norm(band(rng.standard_normal(m), lo, hi) * np.exp(-np.arange(m) / SR / decay))

def thump(f0, dur, decay, drop=0.5):
    m = int(dur * SR); tt = np.arange(m) / SR
    f = f0 * (1 + drop * np.exp(-tt / 0.03)); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / decay)

def whoosh(dur, lo, hi, peak=0.6, air=0.35):
    m = int(dur * SR); k = np.arange(m) / m
    env = np.where(k < peak, (k / peak) ** 2.2, np.exp(-(k - peak) / (1 - peak) * 4.5))
    x = rng.standard_normal(m)
    return norm((band(x, lo, hi) * (1 - k) + band(x, lo * 2.2, hi * 2.2) * k + air * band(x, 5000, 11000) * k ** 2) * env)

def swipe(dur=0.16): return whoosh(dur, 1800, 7000, peak=0.75, air=0.6)
def tick(): return burst(0.035, 1400, 6500, 0.007)
def clack(): return norm(burst(0.08, 500, 4200, 0.012) + 0.7 * thump(140, 0.08, 0.02, 0.8))

def slam(at, gain=-9, pan=0.0, f0=62, heavy=False):
    add(thump(f0, 0.5 if heavy else 0.36, 0.13 if heavy else 0.085), at, gain, pan, 'slam')
    add(burst(0.09, 350, 3200, 0.02), at, gain - 5, pan)
    if heavy: add(thump(38, 0.8, 0.26, 0.25), at, gain - 2, pan)

def bed(t0, t1, gain_db):
    m = int((t1 - t0) * SR); x = band(rng.standard_normal(m), 60, 420)
    f = int(0.25 * SR); x = norm(x) * 0.5; x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f)
    add(x, t0, gain_db)

def clip(folder, ss, ln, at, gain_db, name):
    src = next((TR / folder).glob('*h264*.mp4'))
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    f = int(0.03 * SR); a[:f] *= np.linspace(0, 1, f)[:, None]; a[-f:] *= np.linspace(1, 0, f)[:, None]
    i = int(at * SR); a = a[:n - i] * 10 ** (gain_db / 20); sfx[i:i + len(a)] += a
    placed.append({'t': round(at, 3), 'name': name})

def stok(name, ss, ln, at, gain_db, pan=0.0, label=None):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(STOK / name), '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).astype(float)
    a = a / (np.abs(a).max() + 1e-9)
    f = min(int(0.12 * SR), len(a) // 4); a[:f] *= np.linspace(0, 1, f); a[-f:] *= np.linspace(1, 0, f)
    add(a, at, gain_db, pan, label)

# ── room tone & ocean atmosphere ─────────────────────────────────────────────────────────────────────
bed(0, DUR, -36)
stok('pixabay-sfx-dramatic-cinematic-riser-impact-242635.mp3', 0, 2.8, A['dive0'] - 0.15, -18, 0, 'riser ocean')
slam(A['open'][4] + 0.12, -10, 0, 62)
slam(A['tanya0'][4] + 0.14, -7, 0.1, 56, heavy=True)

# ── 1 hook depth corridor ────────────────────────────────────────────────────────────────────────────
SIDE = [0, 1, -1, 0]
for i, L in enumerate(A['locks']):
    pan = 0.45 * SIDE[i] if SIDE[i] else 0.0
    add(whoosh(0.42, 200, 2200, peak=0.7), L - 0.34, -12, pan, 'step', L - 0.3)
    add(thump(70, 0.25, 0.06), L + 0.02, -15, pan)
    if A['lab'][i]:
        for tw in A['lab'][i]: add(tick(), tw, -15, -pan, 'tick')
    if A['lead'][i]: add(swipe(0.18), A['lead'][i][0] - 0.02, -21, -pan * 0.5)
    if A['tail'][i]: add(swipe(0.18), A['tail'][i] - 0.02, -20, -pan * 0.5)
for i in range(3):
    slam(A['hero'][i][0] + 0.14, -10, 0.25 * SIDE[i], 60)
for hT in A['hl']:
    if hT: add(swipe(0.28), hT, -18, 0.2, 'marker')
for tj in A['nodes']:
    add(whoosh(0.28, 400, 3200, peak=0.7, air=0.5), tj - 0.05, -16, -0.25, 'node')
    add(clack(), tj + 0.22, -13, 0.2, 'cable')

# ── 2 bright question wipe ───────────────────────────────────────────────────────────────────────────
add(whoosh(0.46, 220, 3000, peak=0.45, air=0.5), A['cut1'] - 0.16, -8, -0.2, 'bright wipe', A['cut1'])
slam(A['q1h'][0] + 0.14, -9, -0.15, 60)
add(whoosh(0.46, 220, 1600), A['q2'] - 0.25, -11, 0.25, 'q2')
slam(A['q2h'][0] + 0.14, -7, 0.15, 54, heavy=True)

# ── 3 channel brake ──────────────────────────────────────────────────────────────────────────────────
add(whoosh(0.42, 200, 2400, peak=0.5, air=0.45), A['back'] - 0.22, -9, 0.3, 'wipe', A['back'] - 0.14)
clip('camera-shutter-thinkmakepush', 14.50, 0.90, A['lockW'] - 0.06, +2, 'shutter')
add(clack(), A['lockW'], -9, 0, 'lock'); add(thump(60, 0.5, 0.13), A['lockW'], -8)
add(swipe(0.18), A['slab'] - 0.05, -12, 0.25, 'swipe'); slam(A['slab'] + 0.12, -9, 0.2, 60)

# ── 4 disclaimer: 6 official sources ─────────────────────────────────────────────────────────────────
add(whoosh(0.4, 300, 2600, peak=0.4), A['cut3'] - 0.24, -13, 0.4, 'dock', A['cut3'])
add(thump(46, 0.5, 0.18, 0.3), A['cut3'] + 0.05, -12)
for i, ts in enumerate(A['src2']):
    pan = 0.45 if i % 2 == 0 else -0.45
    add(whoosh(0.32, 260, 2000, peak=0.8), ts - 0.04, -16, pan, 'fly-in', ts)
    add(clack(), ts + 0.26, -14, pan * 0.4, 'land')
add(swipe(0.16), A['hib'] - 0.05, -13, -0.2, 'swipe'); slam(A['hib'] + 0.16, -10, -0.2, 64)

# ── 5 title: AWAN ATAU / PIPA? -> Katup Pipa Laut portal OUT ─────────────────────────────────────────
stok('mixkit-sfx-movie-impact-transition-2916.wav', 0.0, 2.2, A['stepT'] - 0.12, -13, 0, 'title impact')
add(swipe(0.22), A['stepT'] + 0.1, -14, 0.35, 'wipe')
slam(A['tMid'] + 0.18, -10, -0.1, 64)
add(swipe(0.17), A['tHero'] - 0.05, -12, 0.1, 'swipe'); slam(A['tHero'] + 0.18, -6, 0.15, 52, heavy=True)
add(swipe(0.35), A['tSub'] - 0.02, -20, -0.2, 'subtitle')
m_out = int((A['end'] - A['out']) * SR); r_out = np.arange(m_out) / max(1, m_out)
add(norm(band(rng.standard_normal(m_out), 200, 2800) * r_out ** 2.2), A['out'], -10, 0, 'portal out')

# ── _transisi hits (matching film.js HITS()) ──────────────────────────────────────────────────────────
TXM = {**json.load(open(ROOT.parent / 'tx/tx.json')), **json.load(open(ROOT / 'assets/tx/tx.json'))}
HITS = [
    ('shA', A['dive0'] + .05, -4), ('shB', A.get('locks')[0] - .1, -3), ('shC', A['locks'][1] - .1, -4),
    ('cvo1', A['locks'][2] - .1, -4), ('stk3', A['cut1'], -2), ('leakW', A['back'] + .05, -3),
    ('leakL', A['cut3'], -4), ('stk4', A['stepT'], -1),
]
for name, at, g in HITS:
    m = TXM[name]; start = at - m['peak']; ss, ln = m['ss'], m['len']
    if start < 0: ss, ln, start = ss - start, ln + start, 0.0
    src = next((TR / m['folder']).glob('*h264*.mp4'))
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    if not len(x) or np.abs(x).max() < 1e-6: continue
    x = x / (np.abs(x).max() + 1e-9) * 10 ** (-4 / 20)
    clip_f = int(0.02 * SR); x[:clip_f] *= np.linspace(0, 1, clip_f)[:, None]; x[-clip_f * 3:] *= np.linspace(1, 0, clip_f * 3)[:, None]
    i0 = int(start * SR); x = x[:n - i0] * 10 ** (g / 20); sfx[i0:i0 + len(x)] += x
    placed.append({'t': round(at, 3), 'name': 'tx ' + name})

# ── VO + cyberpunk-city score cuts + master ──────────────────────────────────────────────────────────
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(WS / TL['vo']), '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
v = np.frombuffer(raw, np.float32).astype(float); v = v / np.abs(v).max() * 0.82
vo = np.zeros((n, 2)); i = int(TL['vo0'] * SR); v = v[:n - i]; vo[i:i + len(v)] = v[:, None]
f = int(0.04 * SR); sfx[-f:] *= np.linspace(1, 0, f)[:, None]
sfx *= 10 ** (-6 / 20)

mus = np.zeros((n, 2)); FJ = json.load(open(ROOT.parent / 'film.json')); MUS = WS / FJ['score_intro']
if MUS.exists():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(MUS), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    mu = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    mu *= 10 ** (-24.5 / 20) / (np.sqrt((mu[int(20 * SR):int(36 * SR)] ** 2).mean()) + 1e-9)
    SL = len(mu) / SR
    def seg(t0, ss, t1, fin=.05, fout=.15):
        ln = min(t1 - t0, SL - ss)
        if ln <= 0: return
        a = mu[int(ss * SR):int((ss + ln) * SR)].copy(); m_ = len(a); tt = np.arange(m_) / SR
        a *= (np.clip(tt / fin, 0, 1) * np.clip((ln - tt) / fout, 0, 1))[:, None]
        i0 = int(t0 * SR); a = a[:n - i0]; mus[i0:i0 + len(a)] += a
    seg(0.6, 4.0, A['cut1'] - 0.15, .4, .2)                          # Hook under server & Kabil story
    seg(A['back'], 22.0, A['cut3'] + 12.0, .25, .4)                  # Channel + disclaimer sources
    seg(A['stepT'], 26.0, A['end'], .1, .35)                         # Drop for Title card!
    win = int(.2 * SR); env = np.sqrt(_ma(vo[:, 0] ** 2, win))
    duck = 1 - .58 * np.clip(env / .04, 0, 1)
    k = int(.35 * SR); duck = _ma(duck, k); mus *= duck[:, None]

mix = vo + sfx + mus; pk = np.abs(mix).max()
if pk > 0.94: mix *= 0.94 / pk
with wave.open(str(ROOT / 'build/mix_full.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
placed.sort(key=lambda p: p['t']); json.dump(placed, open(ROOT / 'build/sfx_placed.json', 'w'), indent=0)

db = lambda x: 20 * np.log10(max(x, 1e-9))
act = np.abs(vo[:, 0]) > 0.02
win = int(0.05 * SR); e = np.sqrt(_ma(sfx.mean(1) ** 2, win))
print(f"dur {DUR:.2f} s · {len(placed)} marked SFX · mix peak {db(pk):.1f} dBFS (written at {db(min(pk, 0.94)):.1f})")
print(f"VO   peak {db(np.abs(vo).max()):.1f} · RMS while speaking {db(np.sqrt((vo[act, 0] ** 2).mean())):.1f} dBFS")
print(f"MUSIC peak {db(np.abs(mus).max()):.1f} dBFS · SFX loudest 50 ms {db(e.max()):.1f} · median 50 ms {db(np.median(e)):.1f} dBFS")
