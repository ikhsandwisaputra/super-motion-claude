"""Test mix for the G1 motion test: the clips' own audio at the overlay offsets + synthesised projector layer.
All non-tonal (no ting). Usage: python -I tools/test_audio.py out.wav"""
import subprocess, sys, wave
from pathlib import Path
import numpy as np

SR, DUR = 48000, 5.4
ROOT = Path(__file__).resolve().parents[1]
TR = ROOT.parent / '_transisi'
T_LOCK, T_JAM, T_CUT, T_HERO = 1.38, 2.38, 3.0, 3.77
STEPS = [0.12, 0.22, 0.32, 0.42, 0.52, 0.62, 0.72, 0.82, 0.92, 1.04, 1.19, 1.38]
# (folder, source in, length, placed at, gain dB)
CLIPS = [('light-leak-film-burn-copyrightfree820', 21.18, 1.27, 0.00, -10),
         ('camera-shutter-thinkmakepush', 14.50, 0.90, 1.35, +10),
         ('light-leak-flatmedia', 7.20, 1.12, 1.66, -14),
         ('film-burn-vfxasto', 9.93, 1.00, 2.50, -3),
         ('light-leak-flatmedia', 15.48, 1.00, 2.60, -9)]
rng = np.random.default_rng(7)
n = int(SR * DUR); mix = np.zeros((n, 2)); t = np.arange(n) / SR


def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x): acc = a * acc + (1 - a) * v; y[i] = acc
    return y


def add(sig, at, gain_db=0.0, pan=0.0):
    i = int(at * SR); sig = sig[: max(0, n - i)] * 10 ** (gain_db / 20)
    mix[i:i + len(sig), 0] += sig * (1 - max(0, pan)); mix[i:i + len(sig), 1] += sig * (1 + min(0, pan))


def burst(dur, fc_lo, fc_hi, decay):
    m = int(dur * SR); x = rng.standard_normal(m); x = lp(x, fc_hi) - lp(x, fc_lo)
    return x * np.exp(-np.arange(m) / SR / decay)


def thump(f0, dur, decay, drop=0.5):
    m = int(dur * SR); tt = np.arange(m) / SR
    return np.sin(2 * np.pi * f0 * (tt - drop * tt * tt / dur / 2 * 1.2)) * np.exp(-tt / decay)


# projector motor: brown-ish noise with a 24 Hz shutter flutter, dies at the cut, stays as room air after
motor = lp(rng.standard_normal(n), 420) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 24 * t)))
env = np.clip(t / 0.35, 0, 1) * np.where(t < T_CUT, 1.0, 0.22 + 0.78 * np.exp(-(t - T_CUT) / 0.08))
env *= np.clip((DUR - t) / 0.4, 0, 1)
add(motor * env, 0, -9)
for k, s in enumerate(STEPS[:-1]):                                   # claw ticks
    add(burst(0.05, 900, 5200, 0.009), s, -9 + (k % 2), pan=0.15 * (-1) ** k); add(thump(110, 0.06, 0.02), s, -13)
add(thump(62, 0.5, 0.11), T_LOCK, -2); add(burst(0.12, 300, 3000, 0.03), T_LOCK, -5)      # the frame registers
m = int((T_CUT - T_JAM) * SR); r = np.arange(m) / m                                       # jam: crackle + riser
riser = lp(rng.standard_normal(m), 2600) * r ** 2.2
crack = (rng.random(m) < 0.0018 + 0.006 * r) * rng.standard_normal(m) * (0.4 + r)
add(riser, T_JAM, -6); add(lp(crack, 6000) * 3, T_JAM, -7)
add(thump(46, 0.9, 0.22), T_CUT, 0); add(burst(0.35, 150, 7000, 0.09), T_CUT, -4)          # the cut
add(thump(70, 0.4, 0.09), T_HERO, -5); add(burst(0.09, 400, 3500, 0.02), T_HERO, -9)      # hero lands

for folder, ss, ln, at, g in CLIPS:
    src = next((TR / folder).glob('*h264*.mp4'))
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vn', '-ac', '2',
                          '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    f = int(0.03 * SR); a[:f] *= np.linspace(0, 1, f)[:, None]; a[-f:] *= np.linspace(1, 0, f)[:, None]
    i = int(at * SR); a = a[: n - i] * 10 ** (g / 20); mix[i:i + len(a)] += a

peak = np.abs(mix).max(); mix *= 0.89 / peak
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
print(f'{sys.argv[1]}  peak before norm {20 * np.log10(peak):.1f} dBFS')
