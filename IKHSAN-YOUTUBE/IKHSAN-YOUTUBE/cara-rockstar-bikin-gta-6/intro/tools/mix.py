"""Pengantar mix: VO first, then a film layer (room, projector motor, clip audio) and non-tonal SFX on every
visual beat (no ting/bell/chime: noise bursts, thumps, swipes only). Every time comes from src/timeline.json.
Writes build/mix_full.wav (48 kHz stereo), build/sfx_placed.json (Studio markers) and prints a level table.
Usage: python -I tools/mix.py"""
import json, subprocess, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parents[1]
WS = ROOT.parents[2]
TR = ROOT.parents[1] / '_transisi'
SR = 48000
TL = json.load(open(ROOT / 'src/timeline.json', encoding='utf-8'))
A, DUR = TL['A'], TL['dur']
n = int(SR * DUR); sfx = np.zeros((n, 2)); rng = np.random.default_rng(7); placed = []


def band(x, lo, hi):
    if lo and hi: sos = butter(2, [lo, hi], 'bandpass', fs=SR, output='sos')
    elif hi: sos = butter(2, hi, 'lowpass', fs=SR, output='sos')
    else: sos = butter(2, lo, 'highpass', fs=SR, output='sos')
    return sosfilt(sos, x)


def norm(x): return x / (np.abs(x).max() + 1e-9)


def add(sig, at, gain_db=0.0, pan=0.0, name=None, mark=None):
    i = max(0, int(at * SR)); sig = sig[: max(0, n - i)] * 10 ** (gain_db / 20)
    th = (pan + 1) * np.pi / 4
    sfx[i:i + len(sig), 0] += sig * np.cos(th) * 1.414; sfx[i:i + len(sig), 1] += sig * np.sin(th) * 1.414
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


def slam(at, gain=-9, pan=0.0, f0=62, heavy=False):          # a hero word lands
    add(thump(f0, 0.5 if heavy else 0.36, 0.13 if heavy else 0.085), at, gain, pan, 'slam')
    add(burst(0.09, 350, 3200, 0.02), at, gain - 5, pan)
    if heavy: add(thump(38, 0.8, 0.26, 0.25), at, gain - 2, pan)


def bed(t0, t1, gain_db, kind):                              # room tone / projector motor
    m = int((t1 - t0) * SR); x = rng.standard_normal(m)
    if kind == 'motor': x = band(x, 90, 1500) * (0.55 + 0.45 * np.sign(np.sin(2 * np.pi * 24 * np.arange(m) / SR)))
    else: x = band(x, 60, 420)
    f = int(0.25 * SR); x = norm(x) * 0.5; x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f)
    add(x, t0, gain_db)


def crackle(t0, t1, gain_db, grow=True):                     # burning film
    m = int((t1 - t0) * SR); k = np.arange(m) / m; x = np.zeros(m)
    idx = rng.integers(0, m, int(90 * (t1 - t0))); x[idx] = rng.standard_normal(len(idx))
    x = band(x, 900, 7000) * (k ** 1.5 if grow else 1) + 0.25 * band(rng.standard_normal(m), 300, 2400) * (k ** 2 if grow else 1)
    add(norm(x), t0, gain_db, 0.2, 'burn')


def clip(folder, ss, ln, at, gain_db, name):
    src = next((TR / folder).glob('*h264*.mp4'))
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vn', '-ac', '2', '-ar', str(SR),
                          '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    f = int(0.03 * SR); a[:f] *= np.linspace(0, 1, f)[:, None]; a[-f:] *= np.linspace(1, 0, f)[:, None]
    i = int(at * SR); a = a[: n - i] * 10 ** (gain_db / 20); sfx[i:i + len(a)] += a
    placed.append({'t': round(at, 3), 'name': name})


# ── beds ─────────────────────────────────────────────────────────────────────────────────────────────
bed(0, DUR, -36, 'room')

# ── 1 hook: the camera pulls back, each asset sweeps in from its side ────────────────────────────────
clip('light-leak-film-burn-copyrightfree820', 21.18, 1.27, 0.00, -18, 'leak')
for lock, pan in ((A['lock1'], 0.6), (A['lock2'], -0.6), (A['lock3'], 0.6)):
    add(whoosh(0.62, 160, 1100), lock - 0.40, -11, pan, 'whoosh', lock - 0.34)
    add(thump(74, 0.3, 0.07), lock, -15, pan * 0.5)
slam(A['hero1'] + 0.16, -10, -0.3); slam(A['hero2'] + 0.16, -10, 0.3)
for st, pan in ((A['strike1'], -0.3), (A['strike2'], 0.3)):
    if st is not None: add(swipe(0.17), st - 0.02, -13, pan, 'swipe', st)
if A['strike1'] is not None: add(burst(0.5, 200, 1800, 0.12) * (0.6 + 0.4 * rng.random(int(0.5 * SR))), A['strike1'] + 0.05, -20, 0.5, 'lamp off')   # the filament dies
for tw in A['lab']: add(tick(), tw, -14, -0.4, 'tick')
add(swipe(0.2), A['cuma'] - 0.02, -19, -0.3)
for tt in (A.get('tailT') or [])[:2]:
    if tt: add(swipe(0.2), tt - 0.02, -19, 0.3, 'tail')
slam(A['batu'] + 0.2, -7, -0.25, 56, heavy=True)
m = int(0.5 * SR); g = norm(band(rng.standard_normal(m), 2600, 7500) * (0.35 + 0.65 * np.abs(np.sin(2 * np.pi * 31 * np.arange(m) / SR))) * np.sin(np.pi * np.arange(m) / m) ** 1.5)
add(g, A['diasah'] + 0.05, -24, 0.45, 'glint')                                             # stone on stone

# ── 2 "AI": the lime plane sweeps in from the left and takes the frame ───────────────────────────────
add(thump(48, 0.5, 0.16, 0.3), A['jam'], -14, 0, 'sub')
m = int((A['ai'] - 0.1 - A['jam']) * SR); r = np.arange(m) / m
add(norm(band(rng.standard_normal(m), 250, 2600) * r ** 2.4), A['jam'], -13, 0, 'riser')
add(whoosh(0.5, 240, 3200, peak=0.45, air=0.5), A['ai'] - 0.2, -7, -0.25, 'lime flood', A['ai'] - 0.12)
slam(A['ai'] + 0.1, -6, 0.1, 52, heavy=True)
add(clack(), A['ai'] + 0.26, -14, -0.1, 'AI'); add(clack(), A['ai'] + 0.31, -14, 0.1)

# ── 3 questions: forward zoom through the type planes ────────────────────────────────────────────────
for i, (q, qh) in enumerate(((A['q1'], A['q1h']), (A['q2'], A['q2h']), (A['q3'], A['q3h']))):
    pan = (-0.35, 0.35, 0)[i]
    add(whoosh(0.52, 220, 1500), q - 0.36, -10, pan, 'whoosh', q - 0.3)
    slam(qh + 0.2, -9, pan * 0.5, 60)
add(clack(), A['manusia'] + 0.18, -15, -0.2, 'slam')
add(swipe(0.18), A['sama'] - 0.03, -12, 0.3, 'swipe'); slam(A['sama'] + 0.2, -9, 0.2, 58)

# ── 4 channel: a dark wipe from the right, the row whips past, brake on the wordmark ─────────────────
add(whoosh(0.42, 200, 2400, peak=0.5, air=0.45), A['back'] - 0.22, -9, 0.3, 'wipe', A['back'] - 0.14)
run = A['lockW'] - A['back'] + 0.14
add(whoosh(run + 0.1, 120, 1300, peak=0.55, air=0.25), A['back'] - 0.14, -9, 0, 'row whip')
for kk, pan in ((0.22, 0.6), (0.33, -0.6), (0.44, 0.6)): add(swipe(0.14), A['back'] - 0.14 + kk * run, -15, pan, 'pass')
clip('camera-shutter-thinkmakepush', 14.50, 0.90, A['lockW'] - 0.06, +2, 'shutter')
add(clack(), A['lockW'], -9, 0, 'lock'); add(thump(60, 0.5, 0.13), A['lockW'], -8); add(thump(40, 0.8, 0.26, 0.25), A['lockW'], -11)
clip('light-leak-flatmedia', 7.20, 1.12, A['lockW'] + 0.35, -21, 'air')
add(swipe(0.18), A['slab'] - 0.05, -12, 0.25, 'swipe'); slam(A['slab'] + 0.12, -9, 0.2, 60)

# ── 5 disclaimer: the wordmark docks; every source arrives from the lens, from its side ──────────────
add(whoosh(0.4, 300, 2600, peak=0.4), A['cut3'] - 0.24, -13, 0.5, 'dock', A['cut3'] - 0.2)
add(thump(46, 0.5, 0.18, 0.3), A['cut3'] + 0.05, -12)
for i, ts in enumerate(A['src']):
    pan = 0.45 if i % 2 == 0 else -0.45
    add(whoosh(0.36, 260, 2000, peak=0.8), ts - 0.04, -14, pan, 'fly-in', ts)
    add(clack(), ts + 0.3, -13, pan * 0.4, 'land'); add(thump(82, 0.22, 0.05), ts + 0.3, -15, pan * 0.4)
add(swipe(0.16), A['hib'] - 0.06, -13, -0.2, 'swipe'); slam(A['hib'] + 0.18, -10, -0.2, 64)

# ── 6 title: dive into the lime slab, the title lands, dive into the lime "AI" ───────────────────────
add(whoosh(0.4, 200, 2600, peak=0.85, air=0.4), A['stepT'] - 0.22, -9, -0.1, 'dive', A['stepT'] - 0.16)
add(thump(44, 0.6, 0.2, 0.3), A['stepT'] + 0.08, -10)
add(swipe(0.24), A['stepT'] + 0.12, -14, 0.4, 'wipe')
add(swipe(0.22), A['lead'] - 0.02, -19, -0.4)
add(swipe(0.17), A['tAI'] - 0.05, -12, -0.1, 'swipe'); slam(A['tAI'] + 0.12, -10, -0.1, 64)
add(clack(), A['ada'] + 0.12, -15, 0.1, 'pop')
slam(A['zaman'] + 0.24, -8, -0.2, 58); land = A['batu2'] + 4 * 0.022 + 0.16; slam(land, -6, 0.2, 52, heavy=True)
m = int((A['end'] - A['out']) * SR); r = np.arange(m) / m
add(norm(band(rng.standard_normal(m), 220, 3000) * r ** 2.2), A['out'], -9, 0, 'dive out')
add(thump(42, 0.3, 0.12, 0.3), A['end'] - 0.3, -10, 0, 'door')

# ── _transisi hits with their own sound (same landing times as HITS in src/film.js) ──────────────────────
TXM = {**json.load(open(ROOT.parent / 'tx/tx.json')), **json.load(open(ROOT / 'assets/tx/tx.json'))}   # shared library + intro's own hits
HITS = [('shA', A['lock1'] - .1, -3), ('shB', A['lock2'] - .12, -4), ('shC', A['lock3'] - .12, -4), ('stk3', A['cut1'], -1),
        ('leakW', A['back'] + .05, -3), ('leakL', A['cut3'], -4), ('stk4', A['stepT'], -1), ('leakR', A['end'] - .25, -2)]
for name, at, g in HITS:
    m = TXM[name]; start = at - m['peak']; ss, ln = m['ss'], m['len']
    if start < 0: ss, ln, start = ss - start, ln + start, 0.0
    src = next((TR / m['folder']).glob('*h264*.mp4'))
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); x = x / (np.abs(x).max() + 1e-9) * 10 ** (-4 / 20)   # peak -4 dBFS, then hit gain
    clip_f = int(0.02 * SR); x[:clip_f] *= np.linspace(0, 1, clip_f)[:, None]; x[-clip_f * 3:] *= np.linspace(1, 0, clip_f * 3)[:, None]
    i0 = int(start * SR); x = x[: n - i0] * 10 ** (g / 20); sfx[i0:i0 + len(x)] += x
    placed.append({'t': round(at, 3), 'name': 'tx ' + name})

# ── VO + master ──────────────────────────────────────────────────────────────────────────────────────
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(WS / TL['vo']), '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
v = np.frombuffer(raw, np.float32).astype(float); v = v / np.abs(v).max() * 0.82
vo = np.zeros((n, 2)); i = int(TL['vo0'] * SR); v = v[: n - i]; vo[i:i + len(v)] = v[:, None]
f = int(0.04 * SR); sfx[-f:] *= np.linspace(1, 0, f)[:, None]
sfx *= 10 ** (-6 / 20)                                      # SFX bus: slams land ≈ 8–12 dB under the voice
# ── score (ElevenLabs music_v2, audio/music/ivs_score_intro.mp3): +0.30 s puts its hit on "batu", its drop on the zoom-back,
#    and its 100 BPM grid on cut3 and stepT; it stops hard at 34.3 s, a breath before the dive out. Ducked under the voice.
mus = np.zeros((n, 2)); FJ = json.load(open(ROOT.parent / 'film.json')); MUS, MOFF = WS / FJ['score_intro'], FJ.get('score_off', .30)   # film.json
if MUS.exists():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(MUS), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    mu = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); tm = np.arange(len(mu)) / SR
    loud = mu[int(20 * SR):int(33 * SR)]; mu *= 10 ** (-23.5 / 20) / (np.sqrt((loud ** 2).mean()) + 1e-9)        # drop section RMS -23.5 dBFS (v5: 3.5 dB quieter, Ikhsan 2026-11-14)
    mu *= (10 ** (7 / 20) + (1 - 10 ** (7 / 20)) * np.clip((tm - 18.6) / .6, 0, 1))[:, None]                 # sparse first half lifted +7 dB
    PRE = FJ.get('score_pre')                                    # [start s in the score, until s on the timeline]: a pre-roll copy fills a long hook
    i0 = int(MOFF * SR); mm = mu[: n - i0]; mus[i0:i0 + len(mm)] = mm
    if PRE:
        ss, until = PRE; tt = np.arange(n) / SR; xf = .8
        mus *= np.clip((tt - until + xf / 2) / xf, 0, 1)[:, None]  # main copy fades in at `until`
        pr = mu[int(ss * SR): int((ss + until + xf / 2) * SR)].copy(); m2 = min(len(pr), n)
        pr = pr[:m2] * np.clip((until + xf / 2 - np.arange(m2) / SR) / xf, 0, 1)[:, None]; mus[:m2] += pr
    win = int(.2 * SR); env = np.sqrt(np.convolve(vo[:, 0] ** 2, np.ones(win) / win, 'same')); duck = 1 - .58 * np.clip(env / .04, 0, 1)
    k = int(.35 * SR); duck = np.convolve(duck, np.ones(k) / k, 'same'); mus *= duck[:, None]                 # ≈ -7.5 dB while he speaks
mix = vo + sfx + mus; pk = np.abs(mix).max()
if pk > 0.94: mix *= 0.94 / pk
with wave.open(str(ROOT / 'build/mix_full.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
placed.sort(key=lambda p: p['t']); json.dump(placed, open(ROOT / 'build/sfx_placed.json', 'w'), indent=0)

db = lambda x: 20 * np.log10(max(x, 1e-9))
act = np.abs(vo[:, 0]) > 0.02
win = int(0.05 * SR); e = np.sqrt(np.convolve(sfx.mean(1) ** 2, np.ones(win) / win, 'same'))
print(f"dur {DUR:.2f} s · {len(placed)} marked SFX · mix peak {db(pk):.1f} dBFS (written at {db(min(pk, 0.94)):.1f})")
print(f"VO   peak {db(np.abs(vo).max()):.1f} · RMS while speaking {db(np.sqrt((vo[act, 0] ** 2).mean())):.1f} dBFS")
print(f"MUSIC RMS drop section {db(np.sqrt((mus[int(20.3 * SR):int(33 * SR)] ** 2).mean())):.1f} · first half {db(np.sqrt((mus[:int(19 * SR)] ** 2).mean())):.1f} · peak {db(np.abs(mus).max()):.1f} dBFS")
print(f"SFX  peak {db(np.abs(sfx).max()):.1f} · loudest 50 ms {db(e.max()):.1f} · median 50 ms {db(np.median(e)):.1f} dBFS")
for name, a, b in (('hook', 0, A['jam']), ('twist', A['jam'], A['cut1']), ('questions', A['cut1'], A['back']), ('channel', A['back'], A['cut3']),
                   ('disclaimer', A['cut3'], A['stepT']), ('title', A['stepT'], DUR)):
    s = slice(int(a * SR), int(b * SR)); va = act[s]
    vr = db(np.sqrt((vo[s, 0][va] ** 2).mean())) if va.any() else float('nan')
    print(f"  {name:10s} VO {vr:6.1f} · SFX RMS {db(np.sqrt((sfx[s] ** 2).mean())):6.1f} · SFX peak {db(np.abs(sfx[s]).max()):6.1f}")
