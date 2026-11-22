"""VO-first timeline: every beat of the film is placed on a spoken word.
Reads the ElevenLabs alignment, writes src/timeline.json (film + mixer read it), build/lines_film.json and
build/cues.json (Motion Studio). Usage: python -I tools/place.py [audio/voiceover/<name>.align.json]

Per episode: the hook/question word indices below follow the script in build/vo.txt; re-point them when the
script changes (print the numbered words with --words)."""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WS = ROOT.parents[2]
src = Path(sys.argv[1]) if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else WS / (json.load(open(ROOT.parent / 'film.json'))['vo'].format(n='01') + '.align.json')   # film.json vo, take 01
al = json.load(open(src, encoding='utf-8'))['alignment']
VO0 = 0.5                                              # the lamp is on before she speaks
words, cur, t0, t1 = [], '', 0, 0
for c, s, e in zip(al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']):
    if c.isspace():
        if cur: words.append([cur, round(t0 + VO0, 3), round(t1 + VO0, 3)]); cur = ''
    else:
        if not cur: t0 = s
        cur += c; t1 = e
if cur: words.append([cur, round(t0 + VO0, 3), round(t1 + VO0, 3)])
words = [x for x in words if not (x[0].startswith('[') and x[0].endswith(']'))]   # eleven_v4 audio tags are not words
if '--words' in sys.argv:
    for i, w in enumerate(words): print(i, *w)
    sys.exit()
w = lambda i: words[i][1]
we = lambda i: words[i][2]

def k(tok, n=1):                                         # index of the n-th word that reads `tok` (punctuation ignored)
    c = 0
    for i, (tx, *_) in enumerate(words):
        if tx.lower().strip('.,?!:;…') == tok:
            c += 1
            if c == n: return i
    raise SystemExit(f'word? {tok} #{n}')
W = lambda tok, n=1: w(k(tok, n))

# cara-rockstar-bikin-gta-6 VO 01: Vice City sign → Deadline → "cuma mainan" → GTA 6 slab → 3 planes (sehari / Sensor Tower / US$2,36 M) → channel → disclaimer → title (silent)
A = {}
A['lock1'] = 0.46; A['hero1'] = W('kewalahan'); A['strike1'] = None
A['lock2'] = round(W('pendapatannya') - 0.03, 3); A['hero2'] = W('hollywood'); A['strike2'] = None
A['lock3'] = round(W('banyak') - 0.02, 3); A['lab'] = [W('orang'), W('tua')]; A['cuma'] = W('game', 2); A['batu'] = W('mainan')
A['diasah'] = W('pengisi')
A['leadT'] = [W('satu'), W('sehari'), W('game', 2)]; A['tailT'] = [None, W('terbesar'), W('pengisi')]
A['jam'] = W('tapi'); A['tiba'] = W('19'); A['ada1'] = W('2026'); A['ai'] = W('grand'); A['cut1'] = round(we(k('meluncur')) + 0.12, 3)
A['q1'] = W('belum'); A['q1h'] = W('sehari', 2); A['q2'] = W('sensor'); A['q2h'] = W('sulit'); A['q3'] = W('game', 3)
A['q3lead'] = [W('game', 3), W('ditaksir')]; A['manusia'] = W('2,36'); A['sama'] = W('dua'); A['q3h'] = A['sama']
A['back'] = round(we(k('jam')) + 0.02, 3)
A['lockW'] = round(W('relentless') - 0.07, 3); A['slab'] = W('non-conformist')
i0 = k('angka', 2); A['cut3'] = round(w(i0) - 0.02, 3); A['dlead'] = [[w(i), we(i)] for i in range(i0, i0 + 7)]
A['src'] = [W('take-two'), W('digital'), W('variety'), W('forbes'), W('kompas'), W('streams')]; A['dtail'] = W('ini', 4); A['hib'] = W('edukasi')
# the title is silent (VO ends on "Ini video edukasi."): it lands on its own clock after the last word
e0 = we(k('edukasi')); A['jadi'] = A['stepT'] = round(e0 + 0.35, 3); A['lead'] = round(A['stepT'] + 0.30, 3); A['jika'] = round(A['stepT'] + 0.55, 3)
A['tAI'] = round(A['stepT'] + 0.95, 3); A['ada'] = round(A['stepT'] + 1.20, 3); A['zaman'] = round(A['stepT'] + 1.50, 3); A['batu2'] = A['zaman']
A['out'] = round(A['batu2'] + 2.6, 3); A['end'] = round(A['out'] + 0.75, 3)

# the film strip only exists in the channel section: it runs from the cut and registers on the wordmark frame
steps, t = [], A['back'] + 0.10
while t < A['lockW'] - 0.05: steps.append({'t': round(t, 3)}); t += 0.09
steps.append({'t': A['lockW'], 'lock': 'wm'})

# captions for Studio: sentences
lines, cur = [], []
for i, (tx, s, e) in enumerate(words):
    cur.append(i)
    if tx[-1] in '.?…' :
        lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': e}); cur = []
if cur: lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': words[cur[-1]][2]})

tl = {'vo0': VO0, 'vo': str(src.with_suffix('').with_suffix('.mp3').relative_to(WS)), 'dur': A['end'], 'A': A, 'steps': steps, 'words': words}
json.dump(tl, open(ROOT / 'src/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open(ROOT / 'build/lines_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
chapters = [{'chap': 'Hook: papan Vice City → Deadline → cuma mainan? (zoom ke belakang)', 'start': 0}, {'chap': 'GTA 6: slab lime membanjiri frame', 'start': A['jam']},
            {'chap': 'Pertanyaan (zoom maju)', 'start': A['cut1']}, {'chap': 'Channel: barisan lewat, rem di wordmark', 'start': A['back']},
            {'chap': 'Disclaimer', 'start': A['cut3']}, {'chap': 'Judul: mesin uang bernama GTA 6 (pintu lime)', 'start': A['stepT']}]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [A['lock1'], A['hero1'], A['lock2'], A['hero2'], A['lock3'], A['batu'], A['ai'], A['q1h'], A['q2h'],
        A['q3h'], A['lockW'], A['slab'], *A['src'], A['hib'], A['tAI'], A['zaman'], A['batu2']]
json.dump({'dur': A['end'], 'trans': [A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"dur {A['end']} s · {len(words)} words · {len(steps)} steps · cuts {A['cut1']} / {A['back']} / {A['cut3']} · title step {A['stepT']}")
