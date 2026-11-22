"""Pengantar mix: VO first, then a film layer (room, projector motor, clip audio) and non-tonal SFX on every
visual beat (no ting/bell/chime: noise bursts, thumps, swipes only). Every time comes from src/timeline.json.
Writes build/mix_full.wav (48 kHz stereo), build/sfx_placed.json (Studio markers) and prints a level table.
Usage: python -I tools/mix.py"""
import json, subprocess, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parents[1]
WS = ROOT.parents[1]
TR = ROOT.parent / '_transisi'
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
bed(0, DUR, -37, 'room')
bed(0, A['cut1'], -33, 'motor'); bed(A['back'], A['cut3'] + 0.2, -27, 'motor'); bed(A['cut3'], DUR, -38, 'motor')

# ── 1 hook: the camera pulls back, each asset sweeps in from its side ────────────────────────────────
clip('light-leak-film-burn-copyrightfree820', 21.18, 1.27, 0.00, -16, 'leak')
for lock, pan in ((A['lock1'], 0.6), (A['lock2'], -0.6), (A['lock3'], 0.6)):
    add(whoosh(0.62, 160, 1100), lock - 0.40, -11, pan, 'whoosh', lock - 0.34)
    add(thump(74, 0.3, 0.07), lock, -15, pan * 0.5)
slam(A['hero1'] + 0.16, -10, -0.3); slam(A['hero2'] + 0.16, -10, 0.3)
for st, pan in ((A['strike1'], -0.3), (A['strike2'], 0.3)): add(swipe(0.17), st - 0.02, -13, pan, 'swipe', st)
add(burst(0.5, 200, 1800, 0.12) * (0.6 + 0.4 * rng.random(int(0.5 * SR))), A['strike1'] + 0.05, -20, 0.5, 'lamp off')   # the filament dies
for tw in A['lab']: add(tick(), tw, -14, -0.4, 'tick')
add(swipe(0.2), A['cuma'] - 0.02, -19, -0.3)
slam(A['batu'] + 0.2, -7, -0.25, 56, heavy=True)
m = int(0.5 * SR); g = norm(band(rng.standard_normal(m), 2600, 7500) * (0.35 + 0.65 * np.abs(np.sin(2 * np.pi * 31 * np.arange(m) / SR))) * np.sin(np.pi * np.arange(m) / m) ** 1.5)
add(g, A['diasah'] + 0.05, -15, 0.45, 'asah')                                             # stone on stone

# ── 2 twist: jam, burn through on "AI" ───────────────────────────────────────────────────────────────
add(clack(), A['jam'], -11, 0, 'jam'); add(thump(48, 0.5, 0.16, 0.3), A['jam'], -12)
m = int((A['ai'] - A['jam']) * SR); r = np.arange(m) / m
add(norm(band(rng.standard_normal(m), 250, 2600) * r ** 2.4), A['jam'], -12, 0, 'riser')
crackle(A['tiba'], A['cut1'], -13)
slam(A['ai'] + 0.02, -6, 0.2, 52, heavy=True); add(whoosh(0.55, 300, 2600, peak=0.2), A['ai'], -9, 0.2, 'burst')
clip('film-burn-vfxasto', 9.93, 1.00, A['cut1'] - 0.5, -8, 'burn clip'); clip('light-leak-flatmedia', 15.48, 1.00, A['cut1'] - 0.4, -14, 'perf clip')

# ── 3 questions: forward zoom through the type planes ────────────────────────────────────────────────
for i, (q, qh) in enumerate(((A['q1'], A['q1h']), (A['q2'], A['q2h']), (A['q3'], A['q3h']))):
    pan = (-0.35, 0.35, 0)[i]
    add(whoosh(0.52, 220, 1500), q - 0.36, -10, pan, 'whoosh', q - 0.3)
    slam(qh + 0.2, -9, pan * 0.5, 60)
add(clack(), A['manusia'] + 0.18, -15, -0.2, 'slam')
add(swipe(0.18), A['sama'] - 0.03, -12, 0.3, 'swipe'); slam(A['sama'] + 0.2, -9, 0.2, 58)
add(whoosh(0.5, 260, 2200, peak=0.85), A['back'] - 0.42, -8, 0, 'fly-through', A['back'] - 0.34)
add(thump(46, 0.6, 0.2, 0.3), A['back'], -9)

# ── 4 channel: the film runs and registers on the wordmark ───────────────────────────────────────────
clip('camera-shutter-thinkmakepush', 14.50, 0.90, A['lockW'] - 0.06, +4, 'shutter')
for i, st in enumerate(TL['steps']):
    if st.get('lock'): add(clack(), st['t'], -8, 0, 'lock'); add(thump(66, 0.4, 0.1), st['t'], -8)
    else: add(tick(), st['t'], -15 + 0.4 * i, 0.15 * (-1) ** i, 'step' if i % 3 == 0 else None)
clip('light-leak-flatmedia', 7.20, 1.12, A['lockW'] + 0.35, -19, 'wash clip')
add(swipe(0.18), A['slab'] - 0.05, -12, 0.25, 'swipe'); slam(A['slab'] + 0.12, -9, 0.2, 60)
push = A['cut3'] - A['slab'] - 0.35
add(whoosh(push, 140, 900, peak=0.92, air=0.2), A['slab'] + 0.35, -13, 0, 'push-in')
add(thump(44, 0.6, 0.2, 0.3), A['cut3'], -10, 0, 'cut')

# ── 5 disclaimer: one frame down, the sources pop on her words ───────────────────────────────────────
add(clack(), A['cut3'] + 0.03, -11, 0, 'step')
for i, ts in enumerate(A['src']):
    pan = (-0.4, 0.3, -0.4, 0.3)[i]; add(clack(), ts + 0.1, -13, pan, 'pop'); add(thump(82, 0.22, 0.05), ts + 0.1, -15, pan)
add(swipe(0.16), A['hib'] - 0.06, -13, -0.2, 'swipe'); slam(A['hib'] + 0.18, -10, -0.2, 64)

# ── 6 title: one more frame, the title lands, burn-out ───────────────────────────────────────────────
add(clack(), A['stepT'], -10, 0, 'step'); add(whoosh(0.4, 200, 1400), A['stepT'] - 0.1, -15)
add(swipe(0.22), A['lead'] - 0.02, -19, -0.4)
add(swipe(0.17), A['tAI'] - 0.05, -12, -0.1, 'swipe'); slam(A['tAI'] + 0.12, -10, -0.1, 64)
add(clack(), A['ada'] + 0.12, -15, 0.1, 'pop')
slam(A['zaman'] + 0.24, -8, -0.2, 58); land = A['batu2'] + 4 * 0.022 + 0.16; slam(land, -6, 0.2, 52, heavy=True)
crackle(A['out'] - 0.1, A['end'], -12)
m = int((A['end'] - A['out']) * SR); r = np.arange(m) / m
add(norm(band(rng.standard_normal(m), 300, 3200) * r ** 2), A['out'], -11, 0, 'riser')
clip('film-burn-vfxasto', 9.93, 0.56, A['end'] - 0.56, -8, 'burn clip')

# ── VO + master ──────────────────────────────────────────────────────────────────────────────────────
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(WS / TL['vo']), '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
v = np.frombuffer(raw, np.float32).astype(float); v = v / np.abs(v).max() * 0.82
vo = np.zeros((n, 2)); i = int(TL['vo0'] * SR); v = v[: n - i]; vo[i:i + len(v)] = v[:, None]
f = int(0.04 * SR); sfx[-f:] *= np.linspace(1, 0, f)[:, None]
sfx *= 10 ** (-6 / 20)                                      # SFX bus: slams land ≈ 8–12 dB under the voice
mix = vo + sfx; pk = np.abs(mix).max()
if pk > 0.94: mix *= 0.94 / pk
with wave.open(str(ROOT / 'build/mix_full.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
placed.sort(key=lambda p: p['t']); json.dump(placed, open(ROOT / 'build/sfx_placed.json', 'w'), indent=0)

db = lambda x: 20 * np.log10(max(x, 1e-9))
act = np.abs(vo[:, 0]) > 0.02
win = int(0.05 * SR); e = np.sqrt(np.convolve(sfx.mean(1) ** 2, np.ones(win) / win, 'same'))
print(f"dur {DUR:.2f} s · {len(placed)} marked SFX · mix peak {db(pk):.1f} dBFS (written at {db(min(pk, 0.94)):.1f})")
print(f"VO   peak {db(np.abs(vo).max()):.1f} · RMS while speaking {db(np.sqrt((vo[act, 0] ** 2).mean())):.1f} dBFS")
print(f"SFX  peak {db(np.abs(sfx).max()):.1f} · loudest 50 ms {db(e.max()):.1f} · median 50 ms {db(np.median(e)):.1f} dBFS")
for name, a, b in (('hook', 0, A['jam']), ('twist', A['jam'], A['cut1']), ('questions', A['cut1'], A['back']), ('channel', A['back'], A['cut3']),
                   ('disclaimer', A['cut3'], A['stepT']), ('title', A['stepT'], DUR)):
    s = slice(int(a * SR), int(b * SR)); va = act[s]
    vr = db(np.sqrt((vo[s, 0][va] ** 2).mean())) if va.any() else float('nan')
    print(f"  {name:10s} VO {vr:6.1f} · SFX RMS {db(np.sqrt((sfx[s] ** 2).mean())):6.1f} · SFX peak {db(np.abs(sfx[s]).max()):6.1f}")
