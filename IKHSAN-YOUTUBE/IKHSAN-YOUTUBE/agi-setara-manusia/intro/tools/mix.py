"""Pengantar mix (varian TANGGA, AGI): VO first, then the night server room (hum, room tone, Ahri's mixkit SFX) and non-tonal SFX on every
visual beat (no ting/bell/chime: noise bursts, thumps, swipes only). Every time comes from src/timeline.json.
Writes build/mix_full.wav (48 kHz stereo), build/sfx_placed.json (Studio markers) and prints a level table.
Usage: python -I tools/mix.py"""
import json, subprocess, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt
def _ma(x, w):                                                     # moving average == np.convolve(x, ones(w)/w, 'same'), O(n) via cumsum
    p = np.concatenate([np.zeros(w - 1), x, np.zeros(w - 1)]); c = np.concatenate([[0.], np.cumsum(p)]); f = (c[w:] - c[:-w]) / w
    s = (w - 1) // 2; return f[s:s + len(x)]

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


STOK = ROOT.parent / 'assets/stok-situs'                    # Ahri's mixkit SFX (licence in their .json)
def stok(name, ss, ln, at, gain_db, pan=0.0, label=None, loop=False):
    raw = subprocess.run(['ffmpeg', '-v', 'error', *(['-stream_loop', '-1'] if loop else []), '-ss', str(ss), '-t', str(ln), '-i', str(STOK / name),
                          '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).astype(float); a = a / (np.abs(a).max() + 1e-9)
    f = min(int(0.25 * SR), len(a) // 4); a[:f] *= np.linspace(0, 1, f); a[-f:] *= np.linspace(1, 0, f)
    add(a, at, gain_db, pan, label)


# ── beds: night server room ──────────────────────────────────────────────────────────────────────────
bed(0, DUR, -36, 'room')
stok('mixkit-sfx-low-electricity-humming-2132.wav', 0, A['ai'] - 0.1, 0.0, -31, 0, 'server hum', loop=True)
stok('mixkit-sfx-low-electricity-humming-2132.wav', 0, A['stepT'] - A['back'], A['back'], -33, 0, loop=True)

# ── 0 cold open: someone types "AGI sudah tiba." ─────────────────────────────────────────────────────
stok('mixkit-sfx-fast-laptop-keyboard-typing-1392.wav', 0.3, 2.0, 0.15, -22, -0.2, 'typing')
slam(A['open'][0] + 0.12, -10, 0, 60); add(swipe(0.2), A['open'][1] - 0.03, -19, 0.3)

# ── 1 hook: eight steps (7 evidence + the exam analogy), each lock a climb ───────────────────────────────────────────────────────────
SIDE = [0, 1, 0, -1, 1, -1, 1, 0]
for i, L in enumerate(A['locks']):
    pan = 0.5 * SIDE[i] if SIDE[i] else (0.3 if i % 2 else -0.3)
    add(whoosh(0.42, 200, 2200, peak=0.7), L - 0.36, -12, pan, 'step', L - 0.34); add(thump(70, 0.25, 0.06), L + 0.02, -15, pan)
    if A['lab'][i]:
        for tw in A['lab'][i]: add(tick(), tw, -15, -pan, 'tick')
    if A['lead'][i]: add(swipe(0.18), A['lead'][i][0] - 0.02, -21, -pan * 0.5)
    if A['tail'][i]: add(swipe(0.2), A['tail'][i] - 0.02, -21, -pan * 0.5)
    stok('mixkit-sfx-keyboard-slow-typing-1391.wav', 0.4, 0.55, A['src'][i], -29, -0.4)            # the srcTag types itself
for i in range(5): slam(A['hero'][i][0] + 0.16, -10, 0.25 * SIDE[i], 62)
for hT in A['hl']:
    if hT: add(swipe(0.3), hT, -19, 0.2, 'marker')
for j, h in enumerate(A['hero'][5]): add(clack(), h + 0.12, -14 + (j == 4) * 2, -0.35, 'digit')
for j, h in enumerate(A['hero'][6][:4]): add(clack(), h + 0.12, -14, 0.35, 'digit')
slam(A['hero'][6][4] + 0.16, -6, 0.3, 52, heavy=True)
stok('mixkit-sfx-glitchy-cinematic-suspense-hit-679.wav', 0, 1.6, A['melonjak'], -15, 0.2, 'jump')
# the exam analogy: bracket "SOAL SAMA", labels, the toolkit docks module by module, both scores land
add(swipe(0.3), A['anaLead'][3], -17, 0, 'bracket')
for tw in (A['anaL'][0], A['anaR'][0]): add(tick(), tw, -15, -0.3 if tw == A['anaL'][0] else 0.3, 'tick')
for j, tj in enumerate(A['tools']):
    add(whoosh(0.3, 400, 3200, peak=0.7, air=0.5), tj - 0.06, -16, 0.55, 'dock in', tj)
    add(clack(), tj + 0.27, -13, 0.45, 'dock'); add(thump(110, 0.08, 0.02, 0.7), tj + 0.27, -15, 0.45)
add(clack(), A['anaL'][1] + 0.1, -13, -0.4, 'score'); slam(A['tools'][2] + 0.3, -10, 0.4, 62)
# "Tunggu… putar ulang": digital glitch + a reversed whoosh as the stairs run backwards
stok('mixkit-sfx-digital-glitch-break-2951.wav', 0, 0.9, A['putar'], -15, 0, 'glitch')
rw = whoosh(A['rewEnd'] - A['putar'], 160, 2400, peak=0.85, air=0.5)[::-1]; add(rw, A['putar'] + 0.05, -14, -0.3, 'rewind')
add(thump(48, 0.4, 0.12, 0.3), A['rewEnd'] + 0.25, -13)

# ── 2 twist: pull back, riser, lime flood "CARA NGETESNYA." ──────────────────────────────────────────────
add(thump(48, 0.5, 0.16, 0.3), A['jam'], -14, 0, 'sub')
add(whoosh(1.2, 120, 1200, peak=0.5, air=0.2), A['jam'] - 0.1, -16, 0, 'pull back')
m = int((A['ai'] - 0.1 - A['jam']) * SR); r = np.arange(m) / m
add(norm(band(rng.standard_normal(m), 250, 2600) * r ** 2.4), A['jam'], -14, 0, 'riser')
add(whoosh(0.5, 240, 3200, peak=0.45, air=0.5), A['ai'] - 0.2, -7, -0.25, 'lime flood', A['ai'] - 0.12)
slam(A['ai'] + 0.1, -6, 0.1, 52, heavy=True)
add(clack(), A['aiH'][0] + 0.1, -14, -0.1, 'CARA'); add(clack(), A['aiH'][1] + 0.1, -13, 0.1, 'NGETESNYA')

# ── 3 questions: forward zoom through the type planes ────────────────────────────────────────────────
for i, (q, qh) in enumerate(((A['q1'], A['q1h']), (A['q2'], A['q2h'][0]), (A['q3'], A['q3h']))):
    pan = (-0.35, 0.35, 0)[i]
    add(whoosh(0.52, 220, 1500), q - 0.36, -10, pan, 'whoosh', q - 0.3)
    slam(qh + 0.2, -9, pan * 0.5, 60)
add(clack(), A['manusia'] + 0.18, -15, -0.2, 'slam')
add(swipe(0.18), A['sama'] - 0.03, -12, 0.3, 'swipe'); slam(A['sama'] + 0.2, -9, 0.2, 58)

# ── 4 channel: the stairs whip past, brake on the wordmark ───────────────────────────────────────────
add(whoosh(0.42, 200, 2400, peak=0.5, air=0.45), A['back'] - 0.22, -9, 0.3, 'wipe', A['back'] - 0.14)
run = A['lockW'] - A['back'] + 0.14
add(whoosh(run + 0.1, 120, 1300, peak=0.55, air=0.25), A['back'] - 0.14, -9, 0, 'row whip')
for kk, pan in ((0.22, 0.6), (0.33, -0.6), (0.44, 0.6)): add(swipe(0.14), A['back'] - 0.14 + kk * run, -15, pan, 'pass')
clip('camera-shutter-thinkmakepush', 14.50, 0.90, A['lockW'] - 0.06, +2, 'shutter')
add(clack(), A['lockW'], -9, 0, 'lock'); add(thump(60, 0.5, 0.13), A['lockW'], -8); add(thump(40, 0.8, 0.26, 0.25), A['lockW'], -11)
add(swipe(0.18), A['slab'] - 0.05, -12, 0.25, 'swipe'); slam(A['slab'] + 0.12, -9, 0.2, 60)

# ── 5 disclaimer: sources fly in on their names ──────────────────────────────────────────────────────
add(whoosh(0.4, 300, 2600, peak=0.4), A['cut3'] - 0.24, -13, 0.5, 'dock', A['cut3'] - 0.2)
add(thump(46, 0.5, 0.18, 0.3), A['cut3'] + 0.05, -12)
for i, ts in enumerate(A['src2']):
    pan = 0.45 if i % 2 == 0 else -0.45
    add(whoosh(0.36, 260, 2000, peak=0.8), ts - 0.04, -15, pan, 'fly-in', ts)
    add(clack(), ts + 0.3, -14, pan * 0.4, 'land'); add(thump(82, 0.22, 0.05), ts + 0.3, -16, pan * 0.4)
add(swipe(0.16), A['hib'] - 0.06, -13, -0.2, 'swipe'); slam(A['hib'] + 0.18, -10, -0.2, 64)

# ── 6 switch: climb, KLIK → the lamp comes ON (music already out), then one step per beat → dive ───────
stok('mixkit-sfx-cinematic-tunnel-reverb-woosh-1486.wav', 0, 1.3, A['jadi'] - 0.15, -17, -0.2, 'climb')
for k, tw in enumerate(A['tanya'][1:] + A['tanya2'][::2]): add(swipe(0.16), tw - 0.02, -22, 0.2 * (-1) ** k)
add(norm(np.pad(burst(0.03, 1800, 7000, 0.004), (0, int(0.03 * SR))) + 0.8 * burst(0.06, 400, 2500, 0.01)), A['klik'] - 0.01, -5, -0.15, 'KLIK')   # dry plastic snap, non-tonal
add(thump(120, 0.09, 0.02, 0.6), A['klik'], -10, -0.15)
m = int(1.6 * SR); r = np.arange(m) / SR                                       # the lamp: a soft electrical swell, non-tonal (filtered noise)
add(norm(band(rng.standard_normal(m), 90, 900) * np.clip(r / 0.06, 0, 1) * np.exp(-r * 1.6)), A['klik'] + 0.02, -17, 0.35, 'lamp on')
stok('mixkit-sfx-low-electricity-humming-2132.wav', 0, A['stepT'] - A['klik'], A['klik'] + 0.05, -27, 0.35, 'filament hum', loop=True)
add(swipe(0.2), A['nyala'][0] - 0.02, -21, 0.2)
for j, st in enumerate(A['steps']):                                              # one footfall per climbed step
    add(thump(66, 0.3, 0.07, 0.4), st + 0.06, -11 + j * 0.5, 0, 'step'); add(burst(0.05, 300, 2400, 0.012), st + 0.05, -17, 0.1 * (-1) ** j)
    add(whoosh(0.28, 200, 1800, peak=0.75, air=0.3), st - 0.2, -18, 0)
add(whoosh(0.4, 200, 2600, peak=0.85, air=0.4), A['stepT'] - 0.3, -9, -0.1, 'dive', A['dive'])
add(thump(44, 0.6, 0.2, 0.3), A['stepT'] + 0.08, -10)

# ── 7 title: SAKLAR ATAU TANGGA? ─────────────────────────────────────────────────────────────────────
add(swipe(0.24), A['stepT'] + 0.12, -14, 0.4, 'wipe')
slam(A['tMid'] + 0.2, -10, -0.1, 64)
add(swipe(0.17), A['tHero'] - 0.05, -12, 0.1, 'swipe'); slam(A['tHero'] + 0.2, -6, 0.15, 52, heavy=True)
add(swipe(0.4), A['tSub'] - 0.02, -20, -0.2, 'subtitle')   # the chapter portal (kit/portal.js) owns the last .95 s

# ── _transisi hits with their own sound (same landing times as HITS in src/film.js) ──────────────────────
TXM = {**json.load(open(ROOT.parent / 'tx/tx.json')), **json.load(open(ROOT / 'assets/tx/tx.json'))}   # shared library + intro's own hits
L_ = A['locks']
HITS = [('shA', L_[0] - .1, -3), ('shB', L_[1] - .12, -4), ('shC', L_[2] - .12, -4), ('shD', L_[4] - .12, -6), ('shE', L_[6] - .12, -6),
        ('stk3', A['cut1'], -1), ('leakW', A['back'] + .05, -3), ('leakL', A['cut3'], -4), ('stk1', A['jadi'], -5), ('stk4', A['stepT'], -1)]
for name, at, g in HITS:
    m = TXM[name]; start = at - m['peak']; ss, ln = m['ss'], m['len']
    if start < 0: ss, ln, start = ss - start, ln + start, 0.0
    src = next((TR / m['folder']).glob('*h264*.mp4'))
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(ln), '-i', str(src), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float)
    if not len(x): continue
    x = x / (np.abs(x).max() + 1e-9) * 10 ** (-4 / 20)   # peak -4 dBFS, then hit gain
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
# ── score (film.json score_intro = ivs_score_intro.mp3, 37.3 s, its drop at ≈19 s): four cuts of the same score, each placed so the
#    drop lands on a beat: A cold open → stops on "Tunggu"; B from the ARC step, drop on "melonjak", out before "Padahal";
#    C from "Jadi penasaran", drop on the wordmark, hard stop just before KLIK (the gag is silent); D = the score's ending under the title.
mus = np.zeros((n, 2)); FJ = json.load(open(ROOT.parent / 'film.json')); MUS = WS / FJ['score_intro']
if MUS.exists():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(MUS), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    mu = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(float); tm = np.arange(len(mu)) / SR
    loud = mu[int(20 * SR):int(33 * SR)]; mu *= 10 ** (-23.5 / 20) / (np.sqrt((loud ** 2).mean()) + 1e-9)        # drop section RMS -23.5 dBFS
    mu *= (10 ** (7 / 20) + (1 - 10 ** (7 / 20)) * np.clip((tm - 18.6) / .6, 0, 1))[:, None]                 # sparse first half lifted +7 dB
    SL = len(mu) / SR
    def seg(t0, ss, t1, fin=.05, fout=.12):
        ln = min(t1 - t0, SL - ss); a = mu[int(ss * SR): int((ss + ln) * SR)].copy(); m_ = len(a); tt = np.arange(m_) / SR
        a *= (np.clip(tt / fin, 0, 1) * np.clip((ln - tt) / fout, 0, 1))[:, None]
        i0 = int(t0 * SR); a = a[: n - i0]; mus[i0:i0 + len(a)] += a
    seg(0.9, 0.0, A['tunggu'] + .05, .4, .18)                       # A
    seg(A['melonjak'] - 19.0, 0.0, A['twist'][0][0] - .05, .3, .25)  # B: score drop (≈19 s) on "melonjak"
    seg(A['q1'] - .3, 19.0 - (A['lockW'] - (A['q1'] - .3)), A['klik'] - .25, .5, .08)   # C: drop on the wordmark lock
    seg(A['stepT'], max(0.0, SL - (A['end'] - A['stepT'])), A['end'], .05, .3)   # D: the score's ending
    win = int(.2 * SR); env = np.sqrt(_ma(vo[:, 0] ** 2, win)); duck = 1 - .58 * np.clip(env / .04, 0, 1)
    k = int(.35 * SR); duck = _ma(duck, k); mus *= duck[:, None]                 # ≈ -7.5 dB while he speaks
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
print(f"MUSIC peak {db(np.abs(mus).max()):.1f} dBFS")
print(f"SFX  peak {db(np.abs(sfx).max()):.1f} · loudest 50 ms {db(e.max()):.1f} · median 50 ms {db(np.median(e)):.1f} dBFS")
for name, a, b in (('cold open', 0, A['locks'][0]), ('hook', A['locks'][0], A['locks'][7]), ('analogy', A['locks'][7], A['jam']), ('twist', A['jam'], A['cut1']), ('questions', A['cut1'], A['back']),
                   ('channel', A['back'], A['cut3']), ('disclaimer', A['cut3'], A['jadi']), ('switch', A['jadi'], A['klik']), ('klik+climb', A['klik'], A['stepT']), ('title', A['stepT'], DUR)):
    s = slice(int(a * SR), int(b * SR)); va = act[s]
    vr = db(np.sqrt((vo[s, 0][va] ** 2).mean())) if va.any() else float('nan')
    print(f"  {name:10s} VO {vr:6.1f} · SFX RMS {db(np.sqrt((sfx[s] ** 2).mean())):6.1f} · MUS RMS {db(np.sqrt((mus[s] ** 2).mean())):6.1f} · SFX peak {db(np.abs(sfx[s]).max()):6.1f}")
