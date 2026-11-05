"""Ting meter: how much of a sound is pitched high 'ting' (plucks, bells, glass, blips) — no-ting-sfx rule.

python -I tools/ting_meter.py <audio> [...]
Per 46 ms frame: strongest spectral peak in 1.2-8 kHz vs the band's median (peak/median, dB). A frame is 'ting' when
the peak stands >= 24 dB above the band and carries >= 12 % of the band energy. Reports % ting frames and ting onsets/s.
"""
import subprocess, sys, numpy as np, imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe(); SR = 48000; N = 2048; HOP = 1024
for p in sys.argv[1:]:
    raw = subprocess.run([FF, "-v", "error", "-i", p, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
    x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    f = np.fft.rfftfreq(N, 1 / SR); band = np.where((f >= 1500) & (f <= 8000))[0]; w = np.hanning(N)
    pk_bin, strong, loud = [], [], []
    for i in range(0, len(x) - N, HOP):
        S = np.abs(np.fft.rfft(x[i:i + N] * w)) ** 2; B = S[band]
        j = int(np.argmax(B)); loud.append(10 * np.log10(S.sum() + 1e-12)); pk_bin.append(j)
        strong.append(10 * np.log10(B[j] / (np.median(B) + 1e-12)) >= 30 and B[j] / (B.sum() + 1e-12) >= 0.2)
    pk_bin, strong, loud = np.array(pk_bin), np.array(strong), np.array(loud)
    act = loud > loud.max() - 35
    # a ting = the same high partial (+-1 bin) dominating >= 3 consecutive frames (>= ~140 ms of ringing)
    notes, run = 0, 0; ting = np.zeros(len(strong), bool)
    for i in range(len(strong)):
        if strong[i] and act[i] and (run == 0 or abs(pk_bin[i] - pk_bin[i - 1]) <= 1): run += 1
        else:
            if run >= 3: notes += 1; ting[i - run:i] = True
            run = 1 if (strong[i] and act[i]) else 0
    if run >= 3: notes += 1; ting[len(strong) - run:] = True
    t = ting; onsets = notes
    print(f"{p.split('/')[-1]:34s} ting frames {100 * t.sum() / max(1, act.sum()):5.1f} %   ting onsets {onsets / (len(x) / SR):4.2f}/s")
