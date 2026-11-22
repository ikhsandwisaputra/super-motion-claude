"""Mix for the 'Jarak = Kedalaman' test: VO slice (ivs_vo_ahmad_04 24.0 s →) + procedural non-tonal SFX."""
import subprocess, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parents[1]; WS = ROOT.parents[2]
SR, T0, DUR = 48000, 24.0, 8.4
T = dict(seribu=.46, permohonan=1.58, amerika=3.87, dua=5.68, ribu=6.92)
n = int(SR * DUR); sfx = np.zeros((n, 2)); rng = np.random.default_rng(11)

raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(T0), '-t', str(DUR), '-i', str(WS / 'audio/voiceover/ivs_vo_ahmad_04.mp3'),
                      '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
vo = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); vo = np.pad(vo, ((0, max(0, n - len(vo))), (0, 0)))[:n]
fade = int(.08 * SR); vo[:fade] *= np.linspace(0, 1, fade)[:, None]; vo[-int(.3 * SR):] *= np.linspace(1, 0, int(.3 * SR))[:, None]

def band(x, lo, hi):
    sos = butter(2, [lo, hi], 'bandpass', fs=SR, output='sos') if lo and hi else butter(2, hi or lo, 'lowpass' if hi else 'highpass', fs=SR, output='sos')
    return sosfilt(sos, x)
def sm(a, b, k=1.0):
    m = max(len(a), len(b)); return np.pad(a, (0, m - len(a))) + k * np.pad(b, (0, m - len(b)))
def norm(x): return x / (np.abs(x).max() + 1e-9)
def add(sig, at, db=0.0, pan=0.0):
    i = max(0, int(at * SR)); sig = sig[: max(0, n - i)] * 10 ** (db / 20); th = (pan + 1) * np.pi / 4
    sfx[i:i + len(sig), 0] += sig * np.cos(th) * 1.414; sfx[i:i + len(sig), 1] += sig * np.sin(th) * 1.414
def burst(dur, lo, hi, decay):
    m = int(dur * SR); return norm(band(rng.standard_normal(m), lo, hi) * np.exp(-np.arange(m) / SR / decay))
def thump(f0, dur, decay, drop=.5):
    m = int(dur * SR); tt = np.arange(m) / SR; f = f0 * (1 + drop * np.exp(-tt / .03))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / decay)
def whoosh(dur, lo, hi, peak=.6, air=.35):
    m = int(dur * SR); k = np.arange(m) / m; x = rng.standard_normal(m)
    env = np.where(k < peak, (k / peak) ** 2.2, np.exp(-(k - peak) / (1 - peak) * 4.5))
    return norm((band(x, lo, hi) * (1 - k) + band(x, lo * 2.2, hi * 2.2) * k + air * band(x, 5000, 11000) * k ** 2) * env)
def card(): return norm(sm(burst(.03, 900, 5200, .006), burst(.05, 250, 900, .012), .5))   # paper-card flick, non-tonal

add(.25 * norm(band(rng.standard_normal(n), 60, 400)), 0, -40)                       # room tone
add(whoosh(.5, 500, 3500, .7), T['seribu'] - .38, -17, -.5)                          # ID card slides in
for i in range(5): add(card(), T['seribu'] + .05 + i * .03 + .1, -24, .2)            # 1.931 digits land
add(norm(sm(burst(.05, 300, 2500, .01), thump(110, .12, .04))), T['permohonan'], -22)   # caption tick
add(whoosh(.36, 1200, 6000, .55, .5), T['amerika'] - .2, -13, .6)                    # whip to the US lane
for i in range(12): add(card(), T['amerika'] - .1 + i * .025, -27 - i * .6, .5)      # row riffles in
t0, t1 = T['dua'] - .15, T['ribu'] + .02                                              # fly the row
add(whoosh(t1 - t0 + .1, 300, 2600, .92, .6), t0, -15)
u = np.linspace(0, 1, 140); ts = t0 + (t1 - t0) * (np.arccos(1 - 2 * u) / np.pi)     # card passes follow the inOutCubic-ish speed
for i, tt in enumerate(ts): add(card(), tt, -29 + 6 * np.sin(np.pi * u[i]), .35 + .3 * rng.random())
add(whoosh(.7, 2500, 9000, .15, .8)[::-1].copy(), T['ribu'] - .65, -17)              # suck back
add(thump(48, .6, .2, .35), T['ribu'] + .05, -11)                                    # brake / reveal
add(norm(sm(burst(.08, 400, 3500, .015), thump(70, .3, .07), .8)), T['ribu'] + .18, -13)   # 270.295 lands
add(norm(sm(burst(.07, 600, 4500, .012), thump(140, .08, .02, .8), .7)), T['ribu'] + .75, -14, -.3)  # lime tag snaps

mix = vo + sfx; mix /= max(1.0, np.abs(mix).max() / .95)
(ROOT / 'build').mkdir(exist_ok=True)
with wave.open(str(ROOT / 'build/mix.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
rms = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
print(f'VO RMS {rms(vo):.1f} dB · SFX RMS {rms(sfx):.1f} dB · SFX peak {20*np.log10(np.abs(sfx).max()):.1f} dB · mix peak {20*np.log10(np.abs(mix).max()):.1f} dB')
