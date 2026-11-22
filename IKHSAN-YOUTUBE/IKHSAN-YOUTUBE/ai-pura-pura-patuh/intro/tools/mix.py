"""Pengantar mix (AI Pura-Pura Patuh v2): VO eleven_v3 natural + FULL RNC Video-1 transition sounds
(light-leak-film-burn, whoosh+thump+shA/shB/shC/cvo1 on every depth lock, riser + lime flood,
full row-whip + 3x stereo pass swipes + camera-shutter +2dB + light-leak-flatmedia on RELENTLESS brake,
fly-in/land on every source, dive + dive-out into Tirai Kaca Satu Arah portal). Zero silent -180dB hits!
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
SR = 48000
TL = json.load(open(ROOT / 'src/timeline.json', encoding='utf-8'))
A, DUR = TL['A'], TL['dur']
n = int(SR * DUR)
sfx = np.zeros((n, 2))
rng = np.random.default_rng(19)
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
    m = int(dur * SR); k = np.arange(m) / max(1, m)
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
    i = max(0, int(at * SR)); a = a[:max(0, n - i)] * 10 ** (gain_db / 20); sfx[i:i + len(a)] += a
    placed.append({'t': round(at, 3), 'name': name})

# ── 0. room tone + Video-1 film-burn opening + cold open impact ──────────────────────────────────────
bed(0, DUR, -36)
clip('light-leak-film-burn-copyrightfree820', 21.18, 1.27, 0.00, -16, 'leak')
slam(A['open'][0], -8, 0, 58, heavy=True)
add(whoosh(0.55, 220, 2600, peak=0.65, air=0.45), A['dive0'] - 0.14, -9, 0, 'whoosh dive0', A['dive0'])
slam(A['tanya0'][0] + 0.08, -7, 0.1, 56, heavy=True)

# ── 1. hook depth corridor: strong whoosh + thump + stereo pan on EVERY card lock ────────────────────
SIDE = [1, 1, -1, 1]
for i, L in enumerate(A['locks']):
    pan = 0.55 * SIDE[i]
    add(whoosh(0.60, 160, 1400, peak=0.62, air=0.4), L - 0.40, -10, pan, 'whoosh', L - 0.34)
    add(thump(72, 0.30, 0.07), L, -13, pan * 0.5)
    if A['lab'][i]:
        for tw in A['lab'][i]: add(tick(), tw, -14, -pan, 'tick')
    if A['lead'][i]: add(swipe(0.18), A['lead'][i][0] - 0.02, -18, -pan * 0.5)
    if A['tail'][i]: add(swipe(0.18), A['tail'][i] - 0.02, -18, -pan * 0.5)
for i in [0, 1, 3]:
    slam(A['hero'][i][0] + 0.12, -9, 0.25 * SIDE[i], 60)
for hT in A['hl']:
    if hT: add(swipe(0.28), hT, -16, 0.2, 'marker')
for td in A['doors']:
    add(clack(), td, -11, 0.25, 'door')
add(swipe(0.24), A['flipOff'], -11, -0.2, 'flip')

# ── 2. riser + lime flood into question plane (Video-1 signature) ────────────────────────────────────
t_rise = max(A['locks'][-1] + 1.0, A['cut1'] - 1.35)
m_r = int(max(0.2, A['cut1'] - 0.12 - t_rise) * SR)
r_env = np.arange(m_r) / max(1, m_r)
add(norm(band(rng.standard_normal(m_r), 240, 2800) * r_env ** 2.2), t_rise, -12, 0, 'riser')
add(whoosh(0.52, 220, 3200, peak=0.45, air=0.55), A['cut1'] - 0.20, -7, -0.25, 'lime flood', A['cut1'] - 0.10)
slam(A['q1h'][0] + 0.12, -8, -0.15, 58, heavy=True)

# ── 3. channel brake: FULL row whip + 3x stereo pass swipes + camera shutter (+2 dB) + light leak! ───
add(whoosh(0.45, 200, 2400, peak=0.5, air=0.45), A['back'] - 0.22, -8, 0.3, 'wipe', A['back'] - 0.14)
run = max(0.4, A['lockW'] - A['back'] + 0.14)
add(whoosh(run + 0.12, 120, 1400, peak=0.55, air=0.30), A['back'] - 0.14, -8, 0, 'row whip')
for kk, pan in ((0.22, 0.6), (0.36, -0.6), (0.50, 0.6)):
    add(swipe(0.16), A['back'] - 0.14 + kk * run, -13, pan, 'pass')
clip('camera-shutter-thinkmakepush', 14.50, 0.90, A['lockW'] - 0.06, +2, 'shutter')
add(clack(), A['lockW'], -8, 0, 'lock')
add(thump(60, 0.5, 0.13), A['lockW'], -7)
add(thump(40, 0.8, 0.26, 0.25), A['lockW'], -10)
clip('light-leak-flatmedia', 7.20, 1.12, A['lockW'] + 0.35, -19, 'air')
add(swipe(0.18), A['slab'] - 0.05, -11, 0.25, 'swipe')
slam(A['slab'] + 0.12, -8, 0.2, 60)

# ── 4. disclaimer: dock whoosh + stereo fly-in & land clack on every source ──────────────────────────
add(whoosh(0.42, 280, 2600, peak=0.42, air=0.4), A['cut3'] - 0.24, -11, 0.5, 'dock', A['cut3'] - 0.18)
add(thump(46, 0.5, 0.18, 0.3), A['cut3'] + 0.05, -11)
for i, ts in enumerate(A['src2']):
    pan = 0.45 if i % 2 == 0 else -0.45
    add(whoosh(0.36, 260, 2100, peak=0.8), ts - 0.04, -13, pan, 'fly-in', ts)
    add(clack(), ts + 0.28, -12, pan * 0.4, 'land')
    add(thump(82, 0.22, 0.05), ts + 0.28, -14, pan * 0.4)
add(swipe(0.16), A['hib'] - 0.05, -12, -0.2, 'swipe')
slam(A['hib'] + 0.16, -9, -0.2, 64)

# ── 5. title: dive + heavy hero slam + dive out into Tirai Kaca Satu Arah portal ─────────────────────
add(whoosh(0.44, 200, 2600, peak=0.82, air=0.45), A['stepT'] - 0.22, -8, -0.1, 'dive', A['stepT'] - 0.14)
add(thump(44, 0.6, 0.2, 0.3), A['stepT'] + 0.08, -9)
add(swipe(0.24), A['stepT'] + 0.12, -13, 0.4, 'wipe')
slam(A['tMid'] + 0.14, -9, -0.1, 62)
add(swipe(0.17), A['tHero'] - 0.05, -11, 0.1, 'swipe')
slam(A['tHero'] + 0.14, -6, 0.15, 52, heavy=True)
add(swipe(0.32), A['tSub'] - 0.02, -17, -0.2, 'subtitle')
m_out = int(max(0.25, A['end'] - A['out']) * SR); r_out = np.arange(m_out) / max(1, m_out)
add(norm(band(rng.standard_normal(m_out), 220, 3000) * r_out ** 2.2), A['out'], -8, 0, 'dive out')
add(thump(42, 0.32, 0.12, 0.3), A['end'] - 0.28, -9, 0, 'portal door')

# ── 6. _transisi hits (ALL verified loud audio tracks: -0.7..-16 dB normalized to -4 dBFS!) ───────────
TXM = {**json.load(open(ROOT.parent / 'tx/tx.json')), **json.load(open(ROOT / 'assets/tx/tx.json'))}
HITS = [
    ('shA', A['dive0'] + .05, -2), ('shB', A['locks'][0] - .1, -2), ('shC', A['locks'][1] - .1, -3),
    ('cvo1', A['locks'][2] - .1, -3), ('stk3', A['cut1'], -1), ('leakW', A['back'] + .05, -2),
    ('leakL', A['cut3'], -3), ('stk4', A['stepT'], -1), ('leakR', A['end'] - .25, -2),
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
    i0 = int(start * SR); x = x[:max(0, n - i0)] * 10 ** (g / 20); sfx[i0:i0 + len(x)] += x
    placed.append({'t': round(at, 3), 'name': 'tx ' + name})

# ── 7. VO + intro score cuts + master ────────────────────────────────────────────────────────────────
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(WS / TL['vo']), '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
v = np.frombuffer(raw, np.float32).astype(float); v = v / np.abs(v).max() * 0.82
vo = np.zeros((n, 2)); i = int(TL['vo0'] * SR); v = v[:max(0, n - i)]; vo[i:i + len(v)] = v[:, None]
f = int(0.04 * SR); sfx[-f:] *= np.linspace(1, 0, f)[:, None]
sfx *= 10 ** (-5.5 / 20)   # crisp audible RNC transitions (Video-1 balance)

mus = np.zeros((n, 2)); FJ = json.load(open(ROOT.parent / 'film.json')); MUS = WS / FJ['score_intro']
if MUS.exists():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(MUS), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    mu = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    mu *= 10 ** (-24.5 / 20) / (np.sqrt((mu[int(10 * SR):int(26 * SR)] ** 2).mean()) + 1e-9)
    SL = len(mu) / SR
    def seg(t0, ss, t1, fin=.05, fout=.15):
        ln = min(t1 - t0, SL - ss)
        if ln <= 0: return
        a = mu[int(ss * SR):int((ss + ln) * SR)].copy(); m_ = len(a); tt = np.arange(m_) / SR
        a *= (np.clip(tt / fin, 0, 1) * np.clip((ln - tt) / fout, 0, 1))[:, None]
        i0 = int(t0 * SR); a = a[:max(0, n - i0)]; mus[i0:i0 + len(a)] += a
    seg(0.5, 4.0, A['cut1'] - 0.15, .4, .2)
    seg(A['back'], 22.0, A['cut3'] + 14.0, .25, .4)
    seg(A['stepT'], 36.0, A['end'], .1, .35)
    win = int(.2 * SR); env = np.sqrt(_ma(vo[:, 0] ** 2, win))
    duck = 1 - .58 * np.clip(env / .04, 0, 1)
    k = int(.35 * SR); duck = _ma(duck, k); mus *= duck[:, None]

mix = vo + sfx + mus; pk = np.abs(mix).max()
if pk > 0.94: mix *= 0.94 / pk
with wave.open(str(ROOT / 'build/mix_full.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
placed.sort(key=lambda p: p['t']); json.dump(placed, open(ROOT / 'build/sfx_placed.json', 'w'), indent=0)
db = lambda x: 20 * np.log10(max(x, 1e-9))
print(f"intro mix v2 OK: {DUR:.2f} s · {len(placed)} SFX · SFX peak {db(np.abs(sfx).max()):.1f} dBFS · mix peak {db(pk):.1f} dBFS")
