"""One config for the whole film: <project>/film.json, read by every tool (render_full, portal_finish, captions, mix_chapter, words).

  python -I tools/film.py            → prints the chapter table (dir, VO id, VO offset, duration, frames)
  python -I tools/film.py sync       → writes <chapter>/src/portal.json for every chapter in film order (portal in/out + seed)

film.json:
  slug     project folder name (aset/<slug>)            out   master name → out/<out>_v<versi>.mp4
  vo       VO path pattern from the workspace root, {n} = take id, no extension (e.g. "audio/voiceover/xyz_vo_ahmad_{n}")
  bed      calm chapter music bed (beats.js BED.file "stok:<name>" reads assets/stok-situs/<name>)
  chapters film order. Kit chapters (src/beats.js present) need only {"dir"}; their VO/VOFF/duration come from beats.js.
           Custom chapters (intro) give {"dir","vo","voff","dur","wav"} themselves. A chapter not built yet is skipped."""
import json, sys
from pathlib import Path
PROJ = Path(__file__).resolve().parents[1]; WS = PROJ.parents[1]
F = json.loads((PROJ / 'film.json').read_text())

def vo(n, ext='.mp3'): return WS / (F['vo'].format(n=n) + ext)
def beats(d):
    s = (PROJ / d / 'src/beats.js').read_text(); return json.loads(s[s.index('{'):s.rindex('}') + 1])
def chapters():
    out = []
    for c in F['chapters']:
        c = dict(c); c.setdefault('wav', 'build/mix.wav')
        if (PROJ / c['dir'] / 'src/beats.js').exists() and 'dur' not in c:
            B = beats(c['dir']); c.update(vo=c.get('vo', B['VO']), voff=B['VOFF'], dur=B['END'] + B['VOFF'] + B['TAIL'], kit=True)
        c.setdefault('kit', False)
        if 'dur' in c: out.append(c)
    return out
def master(test=False): return PROJ / ('out/_test.mp4' if test else f"out/{F['out']}_v{F.get('versi', 1)}.mp4")
def sync():
    CH = chapters()
    for i, c in enumerate(CH):
        p = PROJ / c['dir'] / 'src/portal.json'
        p.write_text(json.dumps({'inn': i > 0, 'out': i < len(CH) - 1, 'seed': i + 1}) + '\n'); print('portal', c['dir'], p.read_text().strip())

if __name__ == '__main__':
    if sys.argv[1:] == ['sync']: sync()
    else:
        for c in chapters(): print(f"{c['dir']:<10} VO {c.get('vo', '-'):>3} · voff {c.get('voff', 0):.2f} · {c['dur']:7.2f} s · {round(c['dur'] * 30)} fr · {'kit' if c['kit'] else 'custom'}")
        print(f"total {sum(c['dur'] for c in chapters()):.1f} s → {master()}")
