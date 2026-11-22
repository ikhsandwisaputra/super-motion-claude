"""Print word start times of a VO take: words.py 04 [t0 t1]  (from the ElevenLabs alignment, audio tags skipped)."""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent)); import film   # noqa: E402
def words(n):
    a = json.load(open(film.vo(n, '.align.json')))['alignment']
    ch, st, en = a['characters'], a['character_start_times_seconds'], a['character_end_times_seconds']
    out, cur, t0, tag = [], '', None, False
    for c, s, e in zip(ch, st, en):
        if c == '[': tag = True
        if tag:
            if c == ']': tag = False
            continue
        if c.isspace():
            if cur: out.append((cur, t0, last)); cur = ''
            continue
        if not cur: t0 = s
        cur += c; last = e
    if cur: out.append((cur, t0, last))
    return out
if __name__ == '__main__':
    w = words(sys.argv[1]); a, b = (float(sys.argv[2]), float(sys.argv[3])) if len(sys.argv) > 3 else (0, 1e9)
    line = ''
    for x, s, e in w:
        if not a <= s <= b: continue
        line += f'{x}@{s:.2f} '
        if x[-1] in '.?!':
            print(line); line = ''
    print(line); print('END', w[-1][2])
