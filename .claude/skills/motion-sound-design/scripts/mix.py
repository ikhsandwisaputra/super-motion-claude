"""Audio mix: VO (edited) + section bed (synthesised, drops to silence before punchlines)
+ SFX per event (ElevenLabs organics + synthesised 8-bit micro sounds).

Usage (from aset/video-3): python -I tools/mix.py [--out build/mix.wav] [--until SECONDS]
Mix rules (from the reference analysis): VO-first; bed is a low warm pad/drone that ducks under the
voice and cuts to digital silence right before slams; SFX sit 12-24 dB under the VO; repeated
sounds get a seeded pitch/rate offset so nothing machine-guns (motion-sensory-craft).
"""
import json, os, subprocess, sys, wave
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
SR = 48000
args = sys.argv[1:]
OUT = args[args.index("--out") + 1] if "--out" in args else "build/mix.wav"
cues = json.load(open("build/cues.json"))
DUR = float(args[args.index("--until") + 1]) if "--until" in args else cues["duration"]
N = int(DUR * SR) + SR

def h01(*v):
    x = 2166136261
    for a in v:
        x ^= int(a * 1000) & 0xffffffff; x = (x * 16777619) & 0xffffffff; x ^= x >> 13
    return (x & 0xffffff) / 0xffffff

def load(path):
    raw = subprocess.run([FF, "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()

def lp(x, f, o=2): return sosfilt(butter(o, f, "low", fs=SR, output="sos"), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, "high", fs=SR, output="sos"), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a, b], "band", fs=SR, output="sos"), x)
def env_exp(n, tau): return np.exp(-np.arange(n) / (tau * SR))
def db(g): return 10 ** (g / 20)
rng = np.random.default_rng(7)

# ---------------- synthesised micro SFX ----------------
def s_tick():
    n = int(0.035 * SR); t = np.arange(n) / SR
    sq = np.sign(np.sin(2 * np.pi * 2100 * t)) * 0.5 + np.sin(2 * np.pi * 4200 * t) * 0.3
    return (sq * env_exp(n, 0.008) + rng.standard_normal(n) * 0.2 * env_exp(n, 0.002)) * 0.7
def s_pop():
    n = int(0.09 * SR); t = np.arange(n) / SR
    f = 950 * np.exp(-t * 30) + 260
    ph = 2 * np.pi * np.cumsum(f) / SR
    a = np.minimum(1, t / 0.002) * env_exp(n, 0.03)
    return np.sin(ph) * a
def s_dissolve():  # crunchy sparkle blips (reference mosaic/white-out texture)
    n = int(0.32 * SR); out = np.zeros(n)
    for k in range(18):
        st = int(h01(k, 1) * 0.24 * SR); ln = int(0.018 * SR)
        f = 2200 + h01(k, 2) * 6500
        t = np.arange(ln) / SR
        out[st:st + ln] += np.sign(np.sin(2 * np.pi * f * t)) * env_exp(ln, 0.006) * (0.35 + 0.4 * h01(k, 3))
    crush = np.round(rng.standard_normal(n) * 3) / 3 * env_exp(n, 0.07) * 0.25
    return hp(out + crush, 900) * 0.8
def s_decode():  # rapid 8-bit data chirp
    notes = [880, 1046, 1318, 1568, 1760, 2093, 2637]
    seg = int(0.022 * SR); out = []
    for k in range(14):
        f = notes[int(h01(k, 9) * len(notes))] * (2 if h01(k, 4) > 0.7 else 1)
        t = np.arange(seg) / SR
        out.append(np.sign(np.sin(2 * np.pi * f * t)) * 0.4 * env_exp(seg, 0.012))
    x = np.concatenate(out)
    return bp(x, 500, 7000) * np.linspace(1, 0.5, len(x))
def s_riser_soft():
    n = int(1.3 * SR); t = np.arange(n) / SR
    f = 180 * (1 + 3.5 * (t / 1.3) ** 2)
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25
    nz = bp(rng.standard_normal(n), 1500, 6000) * 0.15
    return (tone + nz) * (t / 1.3) ** 1.6 * np.minimum(1, (1.3 - t) / 0.05)
def s_clack():  # film clapper: sharp wood transient + short hollow body (video-3)
    n = int(0.25 * SR); t = np.arange(n) / SR
    crack = bp(rng.standard_normal(n), 1800, 6500, 2) * env_exp(n, 0.006) * 1.4
    body = (np.sin(2 * np.pi * 690 * t) * 0.6 + np.sin(2 * np.pi * 1180 * t) * 0.35) * env_exp(n, 0.035)
    snap = np.zeros(n); k = int(0.004 * SR); snap[k:k + int(0.002 * SR)] = 0.9  # the two sticks meeting
    return hp(crack + body + bp(snap, 800, 9000), 120) * 0.9
SYN = {"clack": s_clack(), "tick": s_tick(), "pop": s_pop(), "dissolve": s_dissolve(), "decode": s_decode(), "riser_soft": s_riser_soft()}

def sample(name):
    if name in SYN: return SYN[name]
    p = os.path.join("audio", "sfx", name + ".mp3")
    if not os.path.exists(p):
        print("missing SFX (generate it with generate_sfx.py):", name); return np.zeros(1)
    x = load(p)
    return x / (np.max(np.abs(x)) + 1e-9)

def resample(x, rate):
    if abs(rate - 1) < 1e-3: return x
    idx = np.arange(0, len(x) - 1, rate)
    return np.interp(idx, np.arange(len(x)), x)

# ---------------- bed (A minor world, 84 BPM) ----------------
BPM = 84; BEAT = 60 / BPM
def note(m): return 440 * 2 ** ((m - 69) / 12)
def saw_pad(freqs, n, cutoff, det=0.006, amp=0.12):
    t = np.arange(n) / SR; x = np.zeros(n)
    for f in freqs:
        for d in (-det, 0, det):
            ph = (t * f * (1 + d) + h01(f, d)) % 1
            x += (2 * ph - 1)
    x = lp(x, cutoff, 2) / (len(freqs) * 3)
    return x * amp
def epiano(freqs, n, amp=0.16):
    t = np.arange(n) / SR; x = np.zeros(n)
    for i, f in enumerate(freqs):
        a = np.minimum(1, t / 0.01) * (0.55 * np.exp(-t / 1.6) + 0.45 * np.exp(-t / 5))
        x += (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / 0.4)) * a
    return x / len(freqs) * amp
def sub(f, n, amp=0.2):
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * f * t) * amp
def kick(n):
    t = np.arange(n) / SR
    f = 42 + 70 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.22) * 0.6

PROG = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60, 64], [48, 52, 55, 59]]  # Fmaj7 Em7 Dm9 Cmaj7
ROOTS = [41, 40, 38, 36]
# video-3 bed: D major, 80 BPM, Dmaj9 Bm9 Gmaj9 Asus (warm, hopeful, no drums)
BEAT3 = 60 / 80
PROG3 = [[50, 57, 61, 64, 66], [47, 54, 57, 62, 64], [43, 50, 54, 59, 62], [45, 52, 55, 59, 64]]
ROOTS3 = [38, 35, 31, 33]
def bed_section(kind, n, t0):
    t = np.arange(n) / SR + t0
    if kind == "hook":  # pumping Am9 pad + sub pulse + soft hats
        x = saw_pad([note(m) for m in (57, 64, 67, 71, 72)], n, 1500, amp=0.16)
        pump = 0.55 + 0.45 * np.clip(((t / (BEAT / 2)) % 1) * 3, 0, 1)
        x = x * pump + sub(note(33), n, 0.1) * (0.85 + 0.15 * np.cos(2 * np.pi * t / BEAT))
        hats = np.zeros(n)
        for k in range(int(t0 / (BEAT / 2)) + 1, int((t0 + n / SR) / (BEAT / 2)) + 1):
            st = int((k * BEAT / 2 - t0) * SR); ln = int(0.03 * SR)
            if 0 <= st < n - ln: hats[st:st + ln] += hp(rng.standard_normal(ln), 7000) * env_exp(ln, 0.01) * 0.03
        return (x + hats) * 1.4
    if kind == "red":
        return saw_pad([note(m) for m in (41, 48, 56, 60)], n, 700, amp=0.17) + sub(note(29), n, 0.13)
    if kind == "dark":
        eerie = np.sin(2 * np.pi * note(81) * t + 0.3 * np.sin(2 * np.pi * 5.2 * t)) * 0.02
        wind = lp(rng.standard_normal(n), 500) * 0.05
        return sub(note(33), n, 0.15) + eerie + wind
    if kind in ("lofi", "lofi2"):
        x = np.zeros(n)
        bar = BEAT * 4
        k0 = int(t0 // bar)
        for k in range(k0, int((t0 + n / SR) // bar) + 1):
            st = int((k * bar - t0) * SR); ln = int(bar * SR) + SR
            ch = PROG[k % 4]
            seg = epiano([note(m) for m in ch], ln, 0.2) + saw_pad([note(m) for m in ch], ln, 900, amp=0.05) + sub(note(ROOTS[k % 4]), ln, 0.08)
            a, b = max(0, st), min(n, st + ln)
            if b > a: x[a:b] += seg[a - st:b - st]
            for bt in (0, 2):  # soft kick on 1 and 3
                ks = int((k * bar + bt * BEAT - t0) * SR); kl = int(0.4 * SR)
                if 0 <= ks < n - kl: x[ks:ks + kl] += kick(kl) * 0.2
            if kind == "lofi2":  # plucked arpeggio for momentum
                for j in range(8):
                    ps = int((k * bar + j * BEAT / 2 - t0) * SR); pl = int(0.35 * SR)
                    if 0 <= ps < n - pl:
                        f = note(ch[j % len(ch)] + 12)
                        tt = np.arange(pl) / SR
                        x[ps:ps + pl] += np.sin(2 * np.pi * f * tt) * np.exp(-tt / 0.12) * 0.035
        crackle = np.zeros(n); idx = rng.integers(0, n, int(n / SR * 9)); crackle[idx] = rng.standard_normal(len(idx)) * 0.08
        return x + hp(crackle, 2000)
    if kind == "storm":  # rising tension under the sky zoom
        tt = (t - t0) / max(1e-6, n / SR)
        fr = [note(m) for m in (45, 52, 57, 60)]
        x = (saw_pad(fr, n, 500, amp=0.1) * (1 - tt) + saw_pad(fr, n, 3000, amp=0.1) * tt) * (0.4 + 0.6 * tt)
        return x + sub(note(33), n, 0.12) + lp(rng.standard_normal(n), 900) * 0.03 * tt
    if kind == "cosmic":  # airy, no drums, slow swells
        x = np.zeros(n)
        for m, ph in ((57, 0.0), (64, 1.3), (69, 2.1), (76, 0.7)):
            x += np.sin(2 * np.pi * note(m) * t + 0.4 * np.sin(2 * np.pi * 0.2 * t + ph)) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.11 * t + ph))
        return lp(x, 2500) * 0.035 + sub(note(33), n, 0.05)
    if kind in ("rhodes", "rhodes2", "swell"):  # video-3: warm Rhodes pad, no drums (VO-first, no booms)
        x = np.zeros(n); bar = BEAT3 * 4; k0 = int(t0 // bar)
        for k in range(k0, int((t0 + n / SR) // bar) + 1):
            ch = PROG3[k % 4]
            for bt, amp in ((0, 0.2), (2, 0.11)):  # chord on 1, softer re-strike on 3
                st = int((k * bar + bt * BEAT3 - t0) * SR); ln = int(bar * SR) + SR
                seg = epiano([note(m) for m in ch], ln, amp)
                a, b = max(0, st), min(n, st + ln)
                if b > a: x[a:b] += seg[a - st:b - st]
            if kind == "rhodes2":  # soft plucked arpeggio for momentum (HOW section)
                for j in range(8):
                    ps = int((k * bar + j * BEAT3 / 2 - t0) * SR); pl = int(0.3 * SR)
                    if 0 <= ps < n - pl:
                        tt = np.arange(pl) / SR
                        x[ps:ps + pl] += np.sin(2 * np.pi * note(ch[(j * 2) % len(ch)] + 12) * tt) * np.exp(-tt / 0.1) * 0.03
        pad = np.zeros(n)
        for k in range(k0, int((t0 + n / SR) // bar) + 1):
            st = int((k * bar - t0) * SR); ln = int(bar * SR)
            seg = saw_pad([note(m) for m in PROG3[k % 4][:3]], ln, 750, amp=0.06) + sub(note(ROOTS3[k % 4]), ln, 0.05)
            a, b = max(0, st), min(n, st + ln)
            if b > a: pad[a:b] += seg[a - st:b - st]
        flutter = 1 + 0.03 * np.sin(2 * np.pi * 0.7 * t)  # tape wow, keeps the pad alive
        y = (x + pad) * flutter
        if kind == "swell":
            tt = np.clip((t - t0) / max(1e-6, n / SR), 0, 1)
            y = lp(y, 900) * (1 - tt) + y * tt; y = y * (0.55 + 0.6 * tt)
        return y * {"rhodes2": 1.25, "swell": 1.2}.get(kind, 1.45)
    if kind == "calm":  # the honest beat: thin pad + airy swells, no attack
        x = saw_pad([note(m) for m in (50, 57, 64)], n, 600, amp=0.07)
        for m, ph in ((69, 0.3), (74, 1.4), (78, 2.2)):
            x += np.sin(2 * np.pi * note(m) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.17 * t + ph)) * 0.012
        return x * 1.6
    if kind == "cta3":  # soft Dmaj9 resolve that keeps ringing after the VO
        x = epiano([note(m) for m in (50, 57, 61, 64, 66)], n, 0.42) + saw_pad([note(m) for m in (50, 57, 64)], n, 850, amp=0.1)
        fade = np.clip((t0 + n / SR - t) / 1.8, 0, 1)
        return (x + sub(note(38), n, 0.07)) * fade * 0.8
    if kind == "cta":  # soft resolve
        x = epiano([note(m) for m in (48, 52, 55, 59, 64)], n, 0.45) + saw_pad([note(m) for m in (48, 55, 64)], n, 900, amp=0.14)
        fade = np.clip((t0 + n / SR - t) / 1.6, 0, 1)
        return (x + sub(note(36), n, 0.12)) * fade * 3.0
    return np.zeros(n)

def reverb(x, secs=1.6, mix=0.22):
    n = int(secs * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / (secs / 5 * SR))
    ir = lp(ir, 5000); ir /= np.sqrt(np.sum(ir ** 2))
    wet = fftconvolve(x, ir)[:len(x)]
    return x * (1 - mix) + wet * mix

def main():
    vo = np.zeros(N)
    if os.path.exists("build/vo_edit.wav"):
        with wave.open("build/vo_edit.wav") as w:
            v = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
            assert w.getframerate() == SR, "vo_edit.wav must be 48 kHz mono"
        v = v / (np.max(np.abs(v)) + 1e-9) * db(-3)
        vo[:min(N, len(v))] = v[:N]
    else:
        print("note: build/vo_edit.wav not found — mixing bed + SFX only")
    # VO envelope for ducking
    a = np.abs(vo); e = np.zeros_like(a); att, rel = np.exp(-1 / (0.01 * SR)), np.exp(-1 / (0.25 * SR))
    # fast envelope via block max then smoothing
    blk = 480; m = a[: len(a) // blk * blk].reshape(-1, blk).max(1)
    sm = np.zeros_like(m); acc = 0
    for i, x in enumerate(m):
        acc = x if x > acc else acc * 0.96
        sm[i] = acc
    env = np.repeat(sm, blk); env = np.pad(env, (0, N - len(env)))
    duck = 1 - 0.55 * np.clip(env / 0.25, 0, 1)

    bed = np.zeros(N)
    for s in cues["bed"]:
        a0, a1 = int(s["t0"] * SR), min(N, int(s["t1"] * SR))
        if a1 <= a0: continue
        seg = bed_section(s["kind"], a1 - a0, s["t0"])
        f = int(0.012 * SR)
        seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)  # hard drop, click-free
        bed[a0:a1] += seg
    # reverb tails must not ring into the gaps: the drop before a punchline is digital silence
    gate = np.zeros(N); fz = int(0.015 * SR)
    for s in cues["bed"]:
        a0, a1 = int(s["t0"] * SR), min(N, int(s["t1"] * SR))
        if a1 <= a0: continue
        gate[a0:a1] = 1; gate[a0:a0 + fz] = np.linspace(0, 1, fz); gate[max(a0, a1 - fz):a1] = np.linspace(1, 0, a1 - max(a0, a1 - fz))
    bed = reverb(bed, 1.8, 0.25) * gate * duck * db(-9)

    sfx = np.zeros(N)
    for i, c in enumerate(cues["cues"]):
        if c["t"] > DUR: continue
        x = sample(c["name"])
        rate = c.get("rate", 1) * (1 + (h01(i, 77) - 0.5) * 0.06)
        x = resample(x, rate) * db(c.get("db", -14))
        st = int(max(0, c["t"]) * SR)
        e = min(N, st + len(x)); sfx[st:e] += x[: e - st]
    sfx = reverb(sfx, 0.9, 0.12)

    mix = vo + bed + sfx
    # gentle stereo: bed/sfx widened with a short Haas offset, VO centred
    d = int(0.011 * SR)
    side = np.concatenate([np.zeros(d), (bed + sfx)[:-d]]) * 0.25
    L, R = mix + side, mix - side
    st = np.stack([L, R], 1)[: int(DUR * SR)]
    peak = np.max(np.abs(st))
    if peak > 0.97: st *= 0.97 / peak
    pcm = (st * 32767).astype(np.int16)
    with wave.open(OUT, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    print(f"wrote {OUT} {DUR:.2f}s peak {peak:.2f}")

main()
