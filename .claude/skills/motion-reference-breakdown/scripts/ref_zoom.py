"""Zoomed spectrograms around reference events + bed tempo.
python -I ref_zoom.py ref_audio.wav outdir "slam:6.4-7.8,mosaic:51.9-53.1"
Look for: silence before hits (bed cut), sub booms, rising gliss (power-up), dotted high blips (8-bit sparkle), clicks (glitch)."""
import sys, wave, numpy as np, cv2, os
src, out = sys.argv[1], sys.argv[2]
# events: name:t0-t1,name:t0-t1 (seconds) — the moments to inspect (slams, transitions, entrances)
EV = sys.argv[3] if len(sys.argv) > 3 else ""
with wave.open(src) as w:
    sr = w.getframerate(); ch = w.getnchannels()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
m = x.reshape(-1, ch).mean(1)
events = {e.split(":")[0]: tuple(float(v) for v in e.split(":")[1].split("-")) for e in EV.split(",") if e} or {"start": (0.0, 1.5)}
n, hop = 1024, 128
win = np.hanning(n)
tiles = []
for name, (a, b) in events.items():
    seg = m[int(a * sr):int(b * sr)]
    fr = np.lib.stride_tricks.sliding_window_view(seg, n)[::hop] * win
    S = 20 * np.log10(np.abs(np.fft.rfft(fr, axis=1)) + 1e-9)
    f = np.fft.rfftfreq(n, 1 / sr)
    H = 300
    logf = np.geomspace(30, 18000, H)
    idx = np.searchsorted(f, logf).clip(0, len(f) - 1)
    img = np.clip((S[:, idx].T[::-1] + 45) / 80, 0, 1)
    img = cv2.applyColorMap((img * 255).astype(np.uint8), cv2.COLORMAP_INFERNO)
    img = cv2.resize(img, (900, 300), interpolation=cv2.INTER_NEAREST)
    dur = b - a
    for k in np.arange(0, dur + 1e-6, 0.1):
        xx = int(k / dur * 899)
        cv2.line(img, (xx, 0), (xx, 8 if abs(k * 10 % 5) > 0.01 else 16), (0, 255, 0), 1)
        if abs((k * 10) % 5) < 0.01:
            cv2.putText(img, f"{a + k:.1f}", (xx + 2, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 0), 1)
    for hz in (100, 1000, 5000, 10000):
        yy = int(299 - np.searchsorted(logf, hz) / H * 299)
        cv2.putText(img, f"{hz}", (2, yy), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (255, 255, 0), 1)
    cv2.putText(img, name, (800, 290), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
    tiles.append(img)
for i in range(0, len(tiles), 2):
    cv2.imwrite(os.path.join(out, f"zoom_{i//2}.png"), np.hstack(tiles[i:i + 2]) if i + 1 < len(tiles) else tiles[i])
# bed tempo: sub band envelope autocorrelation over 46-96 s
n2, hop2 = 2048, 441
seg = m[int(46 * sr):int(96 * sr)]
fr = np.lib.stride_tricks.sliding_window_view(seg, n2)[::hop2] * np.hanning(n2)
S = np.abs(np.fft.rfft(fr, axis=1)); f = np.fft.rfftfreq(n2, 1 / sr)
for lo, hi, lab in ((30, 90, "sub"), (2000, 8000, "hat")):
    e = S[:, (f > lo) & (f < hi)].sum(1)
    on = np.maximum(0, np.diff(np.log(e + 1e-6)))
    on -= on.mean()
    ac = np.correlate(on, on, "full")[len(on) - 1:]
    lag = np.arange(len(ac)) * hop2 / sr
    sel = (lag > 0.3) & (lag < 1.5)
    best = lag[sel][np.argsort(ac[sel])[::-1][:5]]
    print(lab, "top lags (s):", np.round(best, 3), "-> bpm", np.round(60 / best, 1))
# long-term spectrum in "quiet-but-not-silent" frames (bed only)
rms = np.sqrt((fr ** 2).mean(1)) + 1e-9
