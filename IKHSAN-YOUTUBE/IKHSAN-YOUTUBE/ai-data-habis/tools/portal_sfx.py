"""Portal sound (Garis Pindai since ai-data-habis 15 Nov; was Portal QR) at every chapter join, laid over the concatenated film audio (before loudnorm).

  portal_sfx.py <in.wav> <out.wav> <join_s> [<join_s> …]

Per join (J = the cut): a soft card pop as the code lands (J−.6), a dark rising air pulled into the dive (J−.5 → J),
a low sub-thud on the cut, and a wide travel whoosh opening out of the lime door (J → J+.6). All noise/sub, no tones."""
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

def scan(dur):                                                # band noise, rattled at ~34 Hz by the carriage motor, swells as it crosses
    m = int(dur * SR); k = np.arange(m) / m; x = rng.standard_normal(m)
    am = .55 + .45 * (np.sin(2 * np.pi * 34 * np.arange(m) / SR) > 0)
    env = np.sin(np.pi * k) ** 1.5
    return norm((band(x, 900, 4800) * .8 + band(x, 5000, 9000) * .3 * k) * am * env)

def stem():                                                   # 1.4 s stereo, the cut sits at 0.7 s
    s = np.zeros((int(1.4 * SR), 2))
    def put(sig, t0, db, pan=0.0, spread=0.0):
        i = int(t0 * SR); sig = sig[: len(s) - i] * 10 ** (db / 20); th = (pan + 1) * np.pi / 4
        if spread:                                            # decorrelate L/R by a few ms for width
            d = int(spread * SR); L = sig; R = np.pad(sig, (d, 0))[: len(sig)]
            s[i:i + len(sig), 0] += L; s[i:i + len(sig), 1] += R; return
        s[i:i + len(sig), 0] += sig * np.cos(th) * 1.414; s[i:i + len(sig), 1] += sig * np.sin(th) * 1.414
    put(scan(.42), .10, -23, spread=.004)                     # Garis Pindai: the scan lamp passing (motor rattle, no tone)
    put(whoosh(.5, 180, 1600, .96, .35), .20, -20, spread=.006)
    b = burst(.06, 200, 1500, .015); put(norm(thump(46, .7, .22, .35) + .5 * np.pad(b, (0, int(.7 * SR) - len(b)))), .70, -17)
    put(whoosh(.6, 400, 3200, .18, .6), .70, -21, spread=.009)
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
