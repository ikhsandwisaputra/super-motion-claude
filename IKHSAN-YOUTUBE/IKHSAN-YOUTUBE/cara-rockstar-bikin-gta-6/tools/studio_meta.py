"""Generate Studio timeline metadata (lines_film.json, chapters.json, cues.json, sfx_placed.json)
for every kit chapter so Motion Studio displays Subtitles, Chapters, Keyframes, and SFX tracks."""
import json, re, sys
from pathlib import Path

PROJ = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJ / 'tools'))
import film
from words import words

def parse_anchor(val, V, voff):
    if isinstance(val, (int, float)):
        return float(val) + voff
    m = re.match(r'^([A-Za-z0-9_]+)([+-][\d.]+)?$', str(val).strip())
    if not m:
        return voff
    base = V.get(m.group(1), 0.0)
    off = float(m.group(2)) if m.group(2) else 0.0
    return round(base + off + voff, 3)

def build_chapter_meta(ch):
    d = ch['dir']
    if not ch.get('kit'):
        return
    B = film.beats(d)
    V = B.get('V', {})
    voff = float(B.get('VOFF', 0.35))
    dur = round(float(B['END']) + voff + float(B['TAIL']), 3)
    bdir = PROJ / d / 'build'
    bdir.mkdir(exist_ok=True)

    # 1. lines_film.json (sentences from exact ElevenLabs alignment)
    ws = words(B['VO'])
    lines, cur = [], []
    for i, (tx, s, e) in enumerate(ws):
        cur.append((tx, round(s + voff, 3), round(e + voff, 3)))
        if tx.rstrip('"”')[-1] in '.?!…' and len(cur) >= 3:
            lines.append({'text': ' '.join(x[0] for x in cur), 'start': cur[0][1], 'end': cur[-1][2]})
            cur = []
    if cur:
        lines.append({'text': ' '.join(x[0] for x in cur), 'start': cur[0][1], 'end': cur[-1][2]})
    (bdir / 'lines_film.json').write_text(json.dumps(lines, ensure_ascii=False, indent=1), encoding='utf-8')

    # 2. chapters.json (from ST tag comments / keys in V evenly or from film.js tags)
    fsrc = (PROJ / d / 'src/film.js').read_text(encoding='utf-8')
    tags = re.findall(r"at:\s*([^,\n]+),\s*(?:via:[^,\n]+,\s*)?tag:\s*'([^']+)'", fsrc)
    chaps = []
    for expr, tag in tags:
        expr = expr.strip()
        if expr == '0':
            t = 0.0
        else:
            m = re.match(r'A\.([A-Za-z0-9_]+)(?:\s*([+-])\s*([\d.]+))?', expr)
            t = round(V.get(m.group(1), 0.0) + voff + (float(m.group(2) + m.group(3)) if m and m.group(2) else 0.0), 3) if m else 0.0
        chaps.append({'chap': tag, 'start': max(0.0, t)})
    if not chaps:
        chaps = [{'chap': d.upper(), 'start': 0.0}]
    chaps.sort(key=lambda c: c['start'])
    (bdir / 'chapters.json').write_text(json.dumps(chaps, ensure_ascii=False, indent=1), encoding='utf-8')

    # 3. cues.json & sfx_placed.json
    trans = sorted(set(parse_anchor(h[1], V, voff) for h in B.get('HITS', [])))
    keys = [{'t': round(v + voff, 3)} for v in sorted(set(V.values()))]
    sfx = [{'t': parse_anchor(s[0], V, voff), 'name': str(s[1]).split(':')[0]} for s in B.get('SFX', [])]
    sfx.sort(key=lambda x: x['t'])
    (bdir / 'cues.json').write_text(json.dumps({'dur': dur, 'trans': trans, 'keys': keys, 'beats': []}, indent=1), encoding='utf-8')
    (bdir / 'sfx_placed.json').write_text(json.dumps(sfx, indent=1), encoding='utf-8')
    print(f"{d:<10} dur={dur:6.2f}s · {len(lines):2} lines · {len(chaps):2} chaps · {len(trans):2} trans · {len(sfx):2} sfx")

for ch in film.chapters():
    build_chapter_meta(ch)
