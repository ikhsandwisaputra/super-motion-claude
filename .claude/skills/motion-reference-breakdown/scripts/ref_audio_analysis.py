"""Analyse the reference audio: music-bed presence, SFX events, spectrogram strips.

Usage: python -I tools/ref_audio_analysis.py ref/ref_audio.wav build/ref_analysis
"""
import sys, json, wave, os
import numpy as np
import cv2

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
with wave.open(src) as w:
    sr = w.getframerate(); ch = w.getnchannels()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
x = x.reshape(-1, ch)
mono = x.mean(1)
side = (x[:, 0] - x[:, 1]) / 2 if ch == 2 else np.zeros_like(mono)

# STFT
n, hop = 2048, 512
win = np.hanning(n)
frames = np.lib.stride_tricks.sliding_window_view(mono, n)[::hop] * win
S = np.abs(np.fft.rfft(frames, axis=1))
freqs = np.fft.rfftfreq(n, 1 / sr)
t = np.arange(S.shape[0]) * hop / sr
db = 20 * np.log10(S + 1e-9)

rms = np.sqrt((frames ** 2).mean(1)) + 1e-9
rms_db = 20 * np.log10(rms)
side_frames = np.lib.stride_tricks.sliding_window_view(side, n)[::hop]
side_db = 20 * np.log10(np.sqrt((side_frames ** 2).mean(1)) + 1e-9)

# Band energies
def band(lo, hi):
    m = (freqs >= lo) & (freqs < hi)
    return 10 * np.log10((S[:, m] ** 2).sum(1) + 1e-12)
sub = band(20, 80); low = band(80, 300); mid = band(300, 3000); high = band(5000, 12000)

# Speech-ish flatness: spectral flatness
flat = np.exp(np.log(S[:, 5:400] + 1e-9).mean(1)) / (S[:, 5:400].mean(1) + 1e-9)

# Pauses: rms below -50 dB
quiet = rms_db < -50
print(f"sr={sr} ch={ch} dur={len(mono)/sr:.2f}s")
print(f"frames quiet(<-50dB): {quiet.mean()*100:.1f}%")
print(f"stereo side level median {np.median(side_db):.1f} dB vs mid {np.median(rms_db):.1f} dB")

# Onsets via spectral flux in high band (SFX transients)
flux = np.maximum(0, np.diff(db, axis=0)).clip(0, 60)
hf = flux[:, (freqs[1:] > 0)[:flux.shape[1]] & (freqs[:flux.shape[1]] > 4000)].mean(1) if False else flux[:, freqs > 4000][:, :].mean(1) if flux.shape[1] == len(freqs) else None
flux_all = np.maximum(0, np.diff(S, axis=0)).sum(1)
flux_hi = np.maximum(0, np.diff(S[:, freqs > 4000], axis=0)).sum(1)
flux_sub = np.maximum(0, np.diff(S[:, (freqs > 20) & (freqs < 120)], axis=0)).sum(1)

def peaks(sig, k=3.0, mind=6):
    med = np.median(sig); mad = np.median(np.abs(sig - med)) + 1e-9
    thr = med + k * 1.4826 * mad * 4
    idx = []
    for i in range(1, len(sig) - 1):
        if sig[i] > thr and sig[i] >= sig[i - 1] and sig[i] >= sig[i + 1]:
            if not idx or i - idx[-1] >= mind:
                idx.append(i)
    return idx

hi_on = peaks(flux_hi, mind=8)
sub_on = peaks(flux_sub, mind=8)
res = {
    "hi_onsets_s": [round(float(t[i + 1]), 2) for i in hi_on],
    "sub_onsets_s": [round(float(t[i + 1]), 2) for i in sub_on],
}
print("hi-band onsets (SFX transients / sibilants):", len(hi_on))
print("sub onsets (booms):", res["sub_onsets_s"])

# Per-second profile table
rows = []
for s in range(int(t[-1])):
    m = (t >= s) & (t < s + 1)
    rows.append((s, float(rms_db[m].mean()), float(rms_db[m].min()), float(sub[m].mean()), float(low[m].mean()), float(mid[m].mean()), float(high[m].mean()), float(side_db[m].mean())))
with open(os.path.join(out, "per_second.tsv"), "w") as f:
    f.write("s\trms\trms_min\tsub\tlow\tmid\thigh\tside\n")
    for r in rows:
        f.write("\t".join(f"{v:.1f}" for v in r) + "\n")

# Background floor during speech gaps that are NOT digital silence: estimate bed
# Look at min-rms in 0.25s windows that are > -50 (quiet but not silent)
gaps = (rms_db > -55) & (rms_db < -35)
print(f"frames in -55..-35 dB (possible bed/room): {gaps.mean()*100:.1f}%")

# Spectrogram strips 0-120 s in 10 s chunks, log-freq
H = 256
logf = np.geomspace(40, 16000, H)
idx = np.searchsorted(freqs, logf).clip(0, len(freqs) - 1)
img = db[:, idx].T[::-1]
img = np.clip((img + 40) / 80, 0, 1)
for c in range(0, 120, 10):
    m = (t >= c) & (t < c + 10)
    strip = (img[:, m] * 255).astype(np.uint8)
    strip = cv2.applyColorMap(strip, cv2.COLORMAP_INFERNO)
    strip = cv2.resize(strip, (2000, H * 2), interpolation=cv2.INTER_NEAREST)
    # rms curve overlay
    rr = rms_db[m]
    ys = (H * 2 - 1 - ((rr + 70) / 70).clip(0, 1) * (H * 2 - 1)).astype(int)
    xs = np.linspace(0, 1999, len(rr)).astype(int)
    for i in range(1, len(xs)):
        cv2.line(strip, (xs[i - 1], ys[i - 1]), (xs[i], ys[i]), (255, 255, 255), 1)
    for k in range(11):
        x0 = int(k * 199.9)
        cv2.line(strip, (x0, 0), (x0, 14), (0, 255, 0), 1)
        cv2.putText(strip, f"{c + k}", (x0 + 2, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 0), 1)
    cv2.imwrite(os.path.join(out, f"spec_{c:03d}.png"), strip)
json.dump(res, open(os.path.join(out, "onsets.json"), "w"), indent=1)
