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

# ai-data-habis VO 01: notif → Verge (Sutskever) → Epoch AI → "TAHUN INI" → 3 questions → channel → disclaimer → title
A = {}
A['lock1'] = 0.46; A['hero1'] = W('isinya'); A['strike1'] = None
A['lock2'] = round(W('kata') - 0.03, 3); A['hero2'] = W('minyak'); A['strike2'] = None
A['lock3'] = round(W('menurut') - 0.02, 3); A['lab'] = [W('epoch'), w(k('epoch') + 1)]; A['cuma'] = W('masa'); A['batu'] = W('dua')
A['diasah'] = W('sampai')
A['leadT'] = [W('bukan'), W('tulisan'), W('masa')]; A['tailT'] = [None, W('cuma'), W('sampai')]
A['jam'] = W('dan', 2); A['tiba'] = W('itu', 2); A['ada1'] = W('itu', 2); A['ai'] = W('tahun'); A['cut1'] = round(W('tahun') + 0.9, 3)
A['q1'] = W('beneran'); A['q1h'] = W('habis', 2); A['q2'] = W('terus'); A['q2h'] = W('dari'); A['q3'] = W('dan', 3)
A['q3lead'] = [W('kalau'), W('dari', 2)]; A['manusia'] = W('apa'); A['sama'] = W('hilang'); A['q3h'] = A['sama']
A['back'] = round(we(k('hilang')) + 0.02, 3)
A['lockW'] = round(W('relentless') - 0.07, 3); A['slab'] = W('non-conformist')
i0 = k('angka'); A['cut3'] = round(w(i0) - 0.02, 3); A['dlead'] = [[w(i), we(i)] for i in range(i0, i0 + 7)]
A['src'] = [W('epoch', 2), W('jurnal'), W('stanford'), W('laporan')]; A['dtail'] = W('ini', 4); A['hib'] = W('edukasi')
A['jadi'] = W('jadi'); A['stepT'] = round(A['jadi'] - 0.30, 3); A['lead'] = W('kalau', 2); A['jika'] = W('habis', 3)
A['tAI'] = w(k('habis', 3) + 1); A['ada'] = W('belajar', 3); A['zaman'] = W('dari', 4); A['batu2'] = W('lagi')
A['out'] = round(we(k('lagi')) + 0.95, 3); A['end'] = round(A['out'] + 0.75, 3)

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
chapters = [{'chap': 'Hook: notif → Sutskever → Epoch AI (zoom ke belakang)', 'start': 0}, {'chap': 'TAHUN INI: slab lime membanjiri frame', 'start': A['jam']},
            {'chap': 'Pertanyaan (zoom maju)', 'start': A['cut1']}, {'chap': 'Channel: barisan lewat, rem di wordmark', 'start': A['back']},
            {'chap': 'Disclaimer', 'start': A['cut3']}, {'chap': 'Judul: AI belajar dari mana lagi? (pintu lime)', 'start': A['stepT']}]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [A['lock1'], A['hero1'], A['lock2'], A['hero2'], A['lock3'], A['batu'], A['ai'], A['q1h'], A['q2h'],
        A['q3h'], A['lockW'], A['slab'], *A['src'], A['hib'], A['tAI'], A['zaman'], A['batu2']]
json.dump({'dur': A['end'], 'trans': [A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"dur {A['end']} s · {len(words)} words · {len(steps)} steps · cuts {A['cut1']} / {A['back']} / {A['cut3']} · title step {A['stepT']}")
