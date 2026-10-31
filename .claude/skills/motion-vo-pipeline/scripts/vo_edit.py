"""Tight VO edit: shorten silences by context, snap word timings to real speech energy.

python -I tools/vo_edit.py build/vo_take1.wav build/words.json build/vo_edit.wav build/words_edit.json [--rules build/vo_rules.json]

Decode the TTS mp3 to 48 kHz mono wav first (ffmpeg -i take.mp3 -ac 1 -ar 48000 build/vo_take1.wav).
--rules (all optional):
  {"slam_words": ["WRONG", "NEVER"],            # keep a short breath before these
   "long_before_line": {"2": 0.36, "12": 0.42},  # line index -> pause before it (section turns / punchlines)
   "list_lines": [20],                           # lines read as a list ("A. B. C.") get an even rhythm
   "insert_before_word": {"26": 0.16},           # add a breath before a slam (spliced at the quietest point)
   "nudge_start": {"28": -0.15},                 # move one word's onset by hand (seconds)
   "pauses": {"line": 0.2, "sentence": 0.2, "comma": 0.12, "ellipsis": 0.24, "mid": 0.07, "slam": 0.22, "list": 0.17, "end": 0.6}}
"""
import sys, json, wave
import numpy as np

src, wjs, out_wav, out_js = sys.argv[1:5]
RULES = json.load(open(sys.argv[sys.argv.index("--rules") + 1], encoding="utf-8")) if "--rules" in sys.argv else {}
PZ = {"line": 0.2, "sentence": 0.2, "comma": 0.12, "ellipsis": 0.24, "mid": 0.07, "slam": 0.22, "list": 0.17, "end": 0.6, **RULES.get("pauses", {})}
with wave.open(src) as w:
    sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
words = json.load(open(wjs, encoding="utf-8"))

# --- silence map (5 ms hop) ---
hop = int(sr * 0.005); n = len(x) // hop
db = 20 * np.log10(np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)
thr = np.percentile(db, 99) - 45
sil = db < thr
runs, i = [], 0
while i < n:
    if sil[i]:
        j = i
        while j < n and sil[j]: j += 1
        if (j - i) * 0.005 >= 0.05: runs.append([i * 0.005, j * 0.005])
        i = j
    else:
        i += 1

# --- snap word start/end to speech energy ---
# Aligners often lump trailing silence into a word's end and start the next word late, so each silence
# run closes the word before it and opens the first word after it (if that word starts within 0.35 s).
for a, b in runs:
    before = [w for w in words if w["start"] < a]
    after = [w for w in words if w["start"] >= a - 0.01]
    if before and before[-1]["end"] > a:
        before[-1]["end"] = a
    if after and after[0]["start"] - b < 0.35:
        after[0]["start"] = b
for w in words:
    w["end"] = max(w["end"], w["start"] + 0.05)

# --- target pause per context ---
SLAM = set(RULES.get("slam_words", []))
LONG_BEFORE_LINE = {int(k): v for k, v in RULES.get("long_before_line", {}).items()}
LIST_LINES = set(RULES.get("list_lines", []))

def target(prev, nxt, dur):
    if prev is None: return min(dur, 0.12)
    if nxt is None: return min(dur, PZ["end"])
    if nxt["line"] != prev["line"]:
        return min(dur, LONG_BEFORE_LINE.get(nxt["line"], PZ["line"]))
    p = prev["punct"]
    if "..." in p or "…" in p: return min(dur, PZ["ellipsis"])
    if any(c in p for c in ".?!:"):
        return min(dur, PZ["list"] if prev["line"] in LIST_LINES else PZ["sentence"])
    if "," in p: return min(dur, PZ["comma"])
    if nxt["word"] in SLAM: return min(dur, PZ["slam"])
    return min(dur, PZ["mid"])

segs = []  # (cut_start, cut_end) removed time
for a, b in runs:
    prev = None; nxt = None
    for w in words:
        if w["end"] <= a + 0.02: prev = w
        if w["start"] >= b - 0.02 and nxt is None: nxt = w
    dur = b - a
    keep = target(prev, nxt, dur)
    if dur - keep > 0.02:
        mid = a + keep * 0.45  # keep a little tail after the word, most of it before the next word
        segs.append((mid, mid + (dur - keep)))

# --- render with 6 ms equal-power crossfades at each splice ---
fade = int(sr * 0.006)
pieces, last = [], 0
for a, b in segs:
    ia, ib = int(a * sr), int(b * sr)
    pieces.append((last, ia)); last = ib
pieces.append((last, len(x)))
outp = np.zeros(sum(e - s for s, e in pieces) + fade * 2, dtype=np.float32)
pos = 0
for k, (s, e) in enumerate(pieces):
    seg = x[s:e].copy()
    if k > 0 and len(seg) > fade:
        seg[:fade] *= np.sin(np.linspace(0, np.pi / 2, fade)) ** 2
    if k < len(pieces) - 1 and len(seg) > fade:
        seg[-fade:] *= np.cos(np.linspace(0, np.pi / 2, fade)) ** 2
    outp[pos:pos + len(seg)] += seg
    pos += len(seg)
outp = outp[:pos]

def remap(t):
    removed = 0.0
    for a, b in segs:
        if t >= b: removed += b - a
        elif t > a: removed += t - a
    return t - removed

for w in words:
    w["start"] = remap(w["start"]); w["end"] = remap(w["end"])

# --- optional: insert a breath before a slam word ("insert_before_word": {"26": 0.16}) ---
# The splice goes at the quietest 10 ms window around the boundary (word timings are approximate, so the
# search reaches 0.12 s into both words; a stop closure or breath dip is the natural place), with 4 ms fades.
INS = sorted(((int(k), v) for k, v in RULES.get("insert_before_word", {}).items()), reverse=True)
for wi, dur in INS:
    p = words[wi - 1] if wi > 0 else {"start": 0.0, "end": 0.0}
    a = max(p["start"], p["end"] - 0.12)
    b = words[wi]["start"] + 0.12
    ia, ib = int(a * sr), int(b * sr)
    win = int(sr * 0.01)
    e = np.convolve(outp[ia:ib] ** 2, np.ones(win), "valid")
    cut = ia + int(np.argmin(e)) + win // 2
    print(f"insert {dur:.2f}s before {words[wi]['word']} at {cut / sr:.3f}s, splice level {10 * np.log10(e.min() / win + 1e-12):.1f} dBFS")
    f4 = int(sr * 0.004)
    head, tail = outp[:cut].copy(), outp[cut:].copy()
    head[-f4:] *= np.linspace(1, 0, f4); tail[:f4] *= np.linspace(0, 1, f4)
    n_ins = int(dur * sr)
    outp = np.concatenate([head, np.zeros(n_ins, np.float32), tail])
    tc = cut / sr
    words[wi]["start"] = max(words[wi]["start"], tc)   # the onset is after the quiet point we cut at
    if wi > 0: words[wi - 1]["end"] = min(words[wi - 1]["end"], tc)
    for w in words:
        if w["start"] >= tc: w["start"] += dur
        if w["end"] > tc: w["end"] += dur
# --- optional manual nudges for onsets the energy map can't see ("nudge_start": {"28": -0.15}) ---
for k, v in RULES.get("nudge_start", {}).items():
    words[int(k)]["start"] += v
for w in words:
    w["start"] = round(w["start"], 3); w["end"] = round(w["end"], 3)
for k, w in enumerate(words):
    w["gap_after"] = round(words[k + 1]["start"] - w["end"], 3) if k + 1 < len(words) else 0
with wave.open(out_wav, "wb") as o:
    o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr)
    o.writeframes((np.clip(outp, -1, 1) * 32767).astype(np.int16).tobytes())
json.dump(words, open(out_js, "w", encoding="utf-8"), indent=0, ensure_ascii=False)
print(f"cuts {len(segs)}, removed {sum(b - a for a, b in segs):.2f}s, new dur {len(outp) / sr:.2f}s")
ln = -1
for w in words:
    if w["line"] != ln:
        ln = w["line"]; print(f"\nL{ln:02d} {w['start']:6.2f} ", end="")
    print(w["word"] + w["punct"].replace("'", "") + (f"[{w['gap_after']:.2f}]" if w["gap_after"] > 0.15 else "") + " ", end="")
print()
