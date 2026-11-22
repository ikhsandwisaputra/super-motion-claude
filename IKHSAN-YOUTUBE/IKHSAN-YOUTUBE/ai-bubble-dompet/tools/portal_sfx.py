"""Portal Gelembung sound at every chapter join, laid over the concatenated film audio (before loudnorm). The QR version is tools/portal_sfx_qr.py.

  portal_sfx.py <in.wav> <out.wav> <join_s> [<join_s> …]

Per join (J = the cut): a soft rising air as the bubble swells past the lens (J−.6 → J), a dry pop + small low thump
when it bursts (J+.1, the pop frame in kit/portal.js), a scatter of droplet ticks and a wide air release (J+.1 → J+.6).
All noise/sub, no tones, no chime."""
import subprocess, sys
import numpy as np
from scipy.signal import butter, sosfilt
import imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe(); SR = 48000; rng = np.random.default_rng(97)

def band(x, lo, hi):
    sos = butter(2, [lo, hi], 'bandpass', fs=SR, output='sos'); return sosfilt(sos, x)
def norm(x): return x / (np.abs(x).max() + 1e-9)
def whoosh(dur, lo, hi, peak, air):
    m = int(dur * SR); k = np.arange(m) / m; x = rng.standard_normal(m)
    env = np.where(k < peak, (k / peak) ** 2.2, np.exp(-(k - peak) / (1 - peak) * 4.5))
    return norm((band(x, lo, hi) * (1 - k) + band(x, lo * 2.2, hi * 2.2) * k + air * band(x, 5000, 11000) * k ** 2) * env)
def thump(f0, dur, decay, drop):
    m = int(dur * SR); tt = np.arange(m) / SR; f = f0 * (1 + drop * np.exp(-tt / .03))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / decay)
def burst(dur, lo, hi, decay):
    m = int(dur * SR); return norm(band(rng.standard_normal(m), lo, hi) * np.exp(-np.arange(m) / SR / decay))

def stem():                                                   # 1.4 s stereo, the cut sits at 0.7 s
    s = np.zeros((int(1.4 * SR), 2))
    def put(sig, t0, db, pan=0.0, spread=0.0):
        i = int(t0 * SR); sig = sig[: len(s) - i] * 10 ** (db / 20); th = (pan + 1) * np.pi / 4
        if spread:                                            # decorrelate L/R by a few ms for width
            d = int(spread * SR); L = sig; R = np.pad(sig, (d, 0))[: len(sig)]
            s[i:i + len(sig), 0] += L; s[i:i + len(sig), 1] += R; return
        s[i:i + len(sig), 0] += sig * np.cos(th) * 1.414; s[i:i + len(sig), 1] += sig * np.sin(th) * 1.414
    put(whoosh(.62, 160, 1400, .97, .3), .08, -21, spread=.006)                                          # swell into the glass
    pb = burst(.05, 900, 6000, .008); th = thump(160, .06, .015, .9); put(norm(np.pad(pb, (0, len(th) - len(pb))) + .5 * th), .77, -14)                       # the film tears
    b = burst(.05, 200, 1200, .012); put(norm(thump(52, .5, .14, .3) + .4 * np.pad(b, (0, int(.5 * SR) - len(b)))), .77, -20)
    for i in range(7): put(norm(burst(.03, 1500, 7000, .006)), .82 + .06 * i + .02 * rng.random(), -30 - 3 * rng.random(), pan=rng.uniform(-.7, .7))
    put(whoosh(.55, 600, 5000, .12, .7), .77, -24, spread=.009)                                             # air released
    return s

def main():
    src, dst, joins = sys.argv[1], sys.argv[2], [float(j) for j in sys.argv[3:]]
    raw = subprocess.run([FF, '-v', 'error', '-i', src, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); st = stem()
    for j in joins:
        i = int(round((j - .7) * SR)); a[i:i + len(st)] += st[: len(a) - i]
    subprocess.run([FF, '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s24le', dst],
                   input=a.astype(np.float32).tobytes(), check=True)
    print(f'portal sfx at {len(joins)} joins:', ', '.join(f'{j:.2f}' for j in joins), f'· peak {20 * np.log10(np.abs(a).max() + 1e-9):.1f} dBFS')

main()
