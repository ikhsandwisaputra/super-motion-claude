"""ElevenLabs character alignment -> per-word timings (with line index and pause after).

python -I tools/words.py audio/voiceover/<take>.align.json build/words.json [--display build/display_map.json]

--display maps the phonetic spelling you fed the TTS back to the real spelling shown on screen,
e.g. {"Iksan": "Ikhsan", "Dwee": "Dwi"}.
"""
import argparse, json, re

ap = argparse.ArgumentParser(); ap.add_argument("align"); ap.add_argument("out"); ap.add_argument("--display")
a = ap.parse_args()
al = json.load(open(a.align, encoding="utf-8"))
DISPLAY = json.load(open(a.display, encoding="utf-8")) if a.display else {}
A = al["alignment"]; chars = A["characters"]; st = A["character_start_times_seconds"]; en = A["character_end_times_seconds"]
words, cur, line = [], None, 0
for i, c in enumerate(chars):
    if c == "\n":
        if cur: words.append(cur); cur = None
        line += 1; continue
    if c.isspace():
        if cur: words.append(cur); cur = None
        continue
    if cur is None: cur = {"raw": "", "start": st[i], "end": en[i], "line": line}
    cur["raw"] += c; cur["end"] = en[i]
if cur: words.append(cur)
for k, w in enumerate(words):
    core = re.sub(r"[^\w'’-]", "", w["raw"])
    w["word"] = DISPLAY.get(core, core)
    w["punct"] = re.sub(r"[\w'’-]", "", w["raw"])
    w["i"] = k
    w["gap_after"] = round((words[k + 1]["start"] - w["end"]) if k + 1 < len(words) else 0, 3)
    w["start"] = round(w["start"], 3); w["end"] = round(w["end"], 3)
json.dump(words, open(a.out, "w", encoding="utf-8"), indent=0, ensure_ascii=False)
print(len(words), "words, dur", words[-1]["end"])
