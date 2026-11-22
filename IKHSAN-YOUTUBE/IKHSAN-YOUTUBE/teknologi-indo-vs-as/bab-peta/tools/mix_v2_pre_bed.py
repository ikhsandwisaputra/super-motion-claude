"""Mix for chapter Peta: VO ivs_vo_ahmad_03 (offset 0.3 s) + procedural non-tonal SFX (no tonal ticks)."""
import json, subprocess, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parents[1]; WS = ROOT.parents[2]
SR, VOFF = 48000, .3
DUR = 39.52 + VOFF + .9
V = dict(pemakai=2.56, pencipta=5.57, pemakai2=6.40, jago=7.64, resep=11.15, pabrik=11.88, paten=13.08, bedah=13.80,
         r1=15.66, r2=17.64, r3=20.20, lalu=22.70, kebalik=25.60, catatan=26.54, kalimat=28.86, kami=31.81, tidak=33.64,
         metode=35.24, jadi=36.00, takkan=37.57)
T = {k: v + VOFF for k, v in V.items()}
n = int(SR * DUR); sfx = np.zeros((n, 2)); rng = np.random.default_rng(23)

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(WS / 'audio/voiceover/ivs_vo_ahmad_03.mp3'),
                      '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
vo0 = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); o = int(VOFF * SR)
vo = np.zeros((n, 2)); m = min(len(vo0), n - o); vo[o:o + m] = vo0[:m]


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

def keys(t0, count, span, db, pan=0.):               # type-on: soft non-tonal key clicks
    for i in range(count): add(norm(sm(burst(.012, 1500, 7000, .003), burst(.03, 200, 900, .008), .6)), t0 + span * i / count + .01 * rng.random(), db - 3 * rng.random(), pan)
def flaps(t0, db, pan):                              # split-flap shuffle, 4 tiles x ~14 flaps
    for j in range(4):
        for k in range(14): add(card(), t0 + .15 + j * .05 + k * .05, db - 4 * rng.random(), pan)

add(.25 * norm(band(rng.standard_normal(n), 60, 400)), 0, -40)                                   # room tone
add(whoosh(1.1, 200, 1800, .25, .3), 0, -20)                                                     # push-in out of the dark
add(norm(sm(burst(.06, 300, 2200, .012), thump(75, .35, .1))), T['pemakai'] + .05, -13, -.4)   # beam tips to PEMAKAI
add(norm(sm(burst(.06, 600, 4500, .012), thump(140, .08, .02, .8), .7)), T['pemakai'] + .3, -16, -.4)  # lime box
add(card(), T['pencipta'] - .05, -22, .4)                                                         # PENCIPTA label
add(whoosh(.42, 600, 3500, .85, .3), T['pemakai2'] - .04, -18, -.4)                             # phone falls
add(norm(sm(thump(62, .45, .12, .4), burst(.07, 250, 2000, .015), .7)), T['pemakai2'] + .38, -10, -.4)  # phone lands
add(norm(sm(burst(.02, 1500, 6000, .004), burst(.05, 400, 1200, .01))), T['pemakai2'] + .52, -24, -.4) # small rattle
for i in range(12): add(card(), T['jago'] + .17 + i * .05, -28, -.4)                           # app tiles pop
for k in ('resep', 'pabrik', 'paten'): add(whoosh(.3, 1500, 6000, .4, .6), T[k] - .15, -24, .45)  # dashed ghosts breathe in
add(whoosh(.8, 300, 2600, .55, .6), T['bedah'] - .25, -19, -.5)                                # travel A → B
add(card(), T['bedah'] + .32, -22)                                                                # header rule
for k in ('r1', 'r2', 'r3', 'lalu'):
    add(whoosh(.4, 900, 5000, .6, .5), T[k] - .2, -18, .6); flaps(T[k], -27, .45)              # row slides + flap shuffle
add(whoosh(.55, 500, 4000, .55, .5), T['kebalik'] - .25, -14)                                   # row 04 flips
add(norm(sm(thump(55, .5, .14, .4), burst(.08, 300, 2500, .015), .8)), T['kebalik'] + .32, -11)  # lands upside-down
add(norm(sm(burst(.06, 600, 4500, .012), thump(140, .08, .02, .8), .7)), T['kebalik'] + .4, -17, -.2)  # lime tiles
add(whoosh(.8, 300, 2600, .55, .6), T['catatan'] - .35, -19, -.5)                              # travel B → C
keys(T['kalimat'] - .4, 31, .6, -26, -.3)                                                        # label types on
lens = T['metode'] - T['kami']; add(whoosh(lens, 400, 2400, .5, .4), T['kami'], -27, 0)          # lens sweep, low air
keys(T['tidak'], 30, 1.0, -25, -.2)                                                              # METODE HITUNG types
m2 = int(.5 * SR); sc = band(rng.standard_normal(m2), 1500, 7000) * (0.6 + 0.4 * np.abs(np.sin(np.arange(m2) / SR * 2 * np.pi * 38)))
add(norm(sc * np.exp(-np.arange(m2) / SR / .35)), T['jadi'], -16, -.3)                          # marker strike
add(whoosh(.5, 300, 2800, .7, .4), T['takkan'] - .3, -16)                                        # verdict rises
add(thump(50, .6, .2, .35), T['takkan'] + .05, -12)
add(norm(sm(burst(.06, 600, 4500, .012), thump(140, .08, .02, .8), .7)), T['takkan'] + .5, -15, -.1)  # lime TERUKUR

# ── transition hits with their own sound (same times as HITS in src/film.js) ─────────────────────────────
TXM = json.load(open(ROOT.parent / 'tx/tx.json'))
def txhit(name, at, db):
    m = TXM[name]; w = wave.open(str(ROOT.parent / f'tx/{name}.wav')); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).reshape(-1, 2) / 32768
    start = at - m['peak']
    if start < 0: x, start = x[int(-start * SR):], 0.0
    i0 = int(start * SR); x = x[: n - i0] * 10 ** (db / 20); sfx[i0:i0 + len(x)] += x
txhit('stk1', T['bedah'] + .17, -6); txhit('cmc1', T['catatan'] + .07, -6)

# ── score (ElevenLabs music_v2, conditioned on the intro theme): +0.49 s puts its 100 BPM grid on both station whips
#    (14.27 s, 26.91 s); it ends ≈ 39.3 s, right after the verdict. Ducked under the voice.
mus = np.zeros((n, 2)); MUS, MOFF = WS / 'audio/music/ivs_score_peta.mp3', .49
if MUS.exists():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(MUS), '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    i0 = int(MOFF * SR); mu = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)[:n - i0]; mu = mu / (np.abs(mu).max() + 1e-9)
    win = int(.25 * SR); env = np.sqrt(np.convolve(vo.mean(1) ** 2, np.ones(win) / win, 'same')); duck = 1 - .62 * np.clip(env / .03, 0, 1)   # ≈ -8 dB while he speaks
    k = int(.3 * SR); duck = np.convolve(duck, np.ones(k) / k, 'same')
    mus[i0:i0 + len(mu)] = mu * duck[i0:i0 + len(mu), None] * 10 ** (-13 / 20)
mix = vo + sfx + mus; mix /= max(1.0, np.abs(mix).max() / .95)
(ROOT / 'build').mkdir(exist_ok=True)
with wave.open(str(ROOT / 'build/mix.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
rms = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
print(f'music RMS {rms(mus):.1f} dB · ', end='')
print(f'VO RMS {rms(vo):.1f} dB · SFX RMS {rms(sfx):.1f} dB · SFX peak {20*np.log10(np.abs(sfx).max()):.1f} dB · mix peak {20*np.log10(np.abs(mix).max()):.1f} dB')
