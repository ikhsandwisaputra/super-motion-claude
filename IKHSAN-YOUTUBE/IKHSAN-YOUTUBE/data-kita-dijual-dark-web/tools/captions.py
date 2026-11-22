"""Caption files (SRT, not burned in) from the exact narration text + ElevenLabs word timing — not from the Whisper transcript.
  python -I tools/captions.py                 → <chapter>/build/captions.srt for every chapter + build/captions_full.srt
  python -I tools/captions.py --gap 1.2       → same, with 1.2 s between chapters in the full file (portal transitions)
Chapters in film order: (dir, VO id, VO offset in the chapter, chapter duration). Kit chapters read VOFF/END/TAIL from src/beats.js."""
import json, sys
from pathlib import Path
PROJ = Path(__file__).resolve().parents[1]; WS = PROJ.parents[1]
sys.path.insert(0, str(PROJ / 'tools')); from words import words   # noqa: E402  (tools/words.py, tags skipped)

def kit(d, vo):
    p = PROJ / d / 'src/beats.js'
    if not p.exists(): return None
    s = p.read_text(); B = json.loads(s[s.index('{'):s.rindex('}') + 1]); return (d, vo, B['VOFF'], B['END'] + B['VOFF'] + B['TAIL'])
import film   # noqa: E402  (film.json: film order, VO ids, offsets, durations)
CH = [(c['dir'], c['vo'], c.get('voff', 0), c['dur']) for c in film.chapters()]

MAXC, MAXD, MIND = 42, 5.5, 1.0                         # chars per cue line (≤ 2 lines), max/min cue duration
def cues(vo, off):
    W = words(vo); out, cur = [], []
    def flush():
        if cur: out.append([cur[0][1] + off, cur[-1][2] + off, ' '.join(w for w, *_ in cur)]); cur.clear()
    for i, w in enumerate(W):
        if cur and (len(' '.join(x for x, *_ in cur + [w])) > 2 * MAXC or w[2] - cur[0][1] > MAXD or (w[1] - cur[-1][2] > .45)): flush()
        cur.append(w)
        if w[0][-1] in '.?!' and len(' '.join(x for x, *_ in cur)) > 14: flush()
        elif w[0][-1] in ',;:' and len(' '.join(x for x, *_ in cur)) > MAXC: flush()
    flush()
    for a, b in zip(out, out[1:]): a[1] = min(max(a[1], a[0] + MIND), b[0] - .04)   # min duration, never overlap
    return out
def wrap(s):
    if len(s) <= MAXC: return s
    ws = s.split(); best = min(range(1, len(ws)), key=lambda k: abs(len(' '.join(ws[:k])) - len(' '.join(ws[k:]))))
    return ' '.join(ws[:best]) + '\n' + ' '.join(ws[best:])
def ts(t): t = max(0, t); return f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{int(round(t % 1 * 1000)) % 1000:03}'
def srt(cs): return '\n'.join(f'{i}\n{ts(a)} --> {ts(b)}\n{wrap(s)}\n' for i, (a, b, s) in enumerate(cs, 1))

gap = float(sys.argv[sys.argv.index('--gap') + 1]) if '--gap' in sys.argv else 0.0
full, t0 = [], 0.0
for d, vo, off, dur in CH:
    cs = cues(vo, off); (PROJ / d / 'build').mkdir(exist_ok=True); (PROJ / d / 'build/captions.srt').write_text(srt(cs), encoding='utf-8')
    full += [[a + t0, b + t0, s] for a, b, s in cs]; print(f'{d:9} VO {vo} · {len(cs):3} cues · starts {ts(t0)} · {dur:.2f} s'); t0 += dur + gap
(PROJ / 'build').mkdir(exist_ok=True); (PROJ / 'build/captions_full.srt').write_text(srt(full), encoding='utf-8')
print(f'full: {len(full)} cues · {ts(t0 - gap)} → {PROJ / "build/captions_full.srt"}')
