"""Level table: VO vs (bed + SFX) per section, so the mix stays VO-first.

python -I tools/measure_levels.py build/mix_full.wav build/vo_edit.wav [--sections build/cues.json] [--win 5]
Uses the bed sections from cues.json when given, otherwise fixed windows. Targets: bed+SFX sits
8-15 dB under the VO while the VO talks; a slam may come within ~2 dB for a frame or two; a pre-punchline
gap should read below -45 dBFS; a tail after the VO should not be silent (around -25..-30).
"""
import argparse, json, wave
import numpy as np

ap = argparse.ArgumentParser(); ap.add_argument("mix"); ap.add_argument("vo"); ap.add_argument("--sections"); ap.add_argument("--win", type=float, default=5)
a = ap.parse_args()
def load(p):
    with wave.open(p) as w:
        sr, ch = w.getframerate(), w.getnchannels()
        x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32).reshape(-1, ch).mean(1) / 32768
    return sr, x
sr, x = load(a.mix); _, v = load(a.vo)
v = v / (np.abs(v).max() + 1e-9) * 10 ** (-3 / 20)
v = np.pad(v, (0, max(0, len(x) - len(v))))[: len(x)]
rest = x - v
rms = lambda s: 20 * np.log10(np.sqrt(np.mean(s ** 2)) + 1e-9)
if a.sections:
    secs = [(b["t0"], b["t1"], b["kind"]) for b in json.load(open(a.sections))["bed"]]
else:
    n = len(x) / sr; secs = [(t, min(n, t + a.win), f"{t:.0f}s") for t in np.arange(0, n, a.win)]
print(f"{'section':16s} {'t':>13s}  {'mix':>6s} {'vo':>6s} {'bed+sfx':>8s}  gap")
for t0, t1, lab in secs:
    s = slice(int(t0 * sr), int(t1 * sr))
    if s.stop - s.start < sr * 0.2: continue
    m, vv, r = rms(x[s]), rms(v[s]), rms(rest[s])
    flag = "  <-- bed/SFX too loud" if vv > -60 and r > vv - 6 else ""
    print(f"{lab:16s} {t0:6.2f}-{t1:6.2f}  {m:6.1f} {vv:6.1f} {r:8.1f}  {vv - r:4.1f}{flag}")
