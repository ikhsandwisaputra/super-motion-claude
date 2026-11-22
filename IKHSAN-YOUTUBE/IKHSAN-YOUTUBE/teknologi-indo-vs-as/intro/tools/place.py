"""VO-first timeline: every beat of the film is placed on a spoken word.
Reads the ElevenLabs alignment, writes src/timeline.json (film + mixer read it), build/lines_film.json and
build/cues.json (Motion Studio). Usage: python -I tools/place.py [audio/voiceover/<name>.align.json]

Per episode: the hook/question word indices below follow the script in build/vo.txt; re-point them when the
script changes (print the numbered words with --words)."""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WS = ROOT.parents[2]
src = Path(sys.argv[1]) if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else WS / 'audio/voiceover/ivs_vo_ahmad_01.align.json'
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
if '--words' in sys.argv:
    for i, w in enumerate(words): print(i, *w)
    sys.exit()
w = lambda i: words[i][1]
we = lambda i: words[i][2]

A = {}
A['lock1'] = 0.46; A['hero1'] = w(5); A['strike1'] = None
A['lock2'] = w(7) - 0.03; A['hero2'] = w(12); A['strike2'] = None
A['lock3'] = w(15) - 0.02; A['lab'] = [w(16), w(17)]; A['cuma'] = w(18); A['batu'] = w(21); A['diasah'] = w(23)
A['jam'] = w(27); A['ai'] = w(30); A['cut1'] = round(w(30) + 0.9, 3)
A['q1'] = w(36); A['q1h'] = w(37); A['q2'] = w(38); A['q2h'] = w(40); A['q3'] = w(41); A['q3h'] = w(44)
A['q3lead'] = [w(41), w(42)]
A['back'] = round(we(44) + 0.02, 3)
A['lockW'] = round(w(46) - 0.07, 3); A['slab'] = w(47)
A['cut3'] = round(w(48) - 0.02, 3); A['dlead'] = [[w(i), we(i)] for i in range(48, 55)]
A['src'] = [w(55), w(56), w(58), w(60)]; A['dtail'] = w(62); A['hib'] = w(64)
A['stepT'] = round(w(67) - 0.30, 3); A['lead'] = w(68); A['tAI'] = w(73); A['ada'] = w(74); A['zaman'] = w(75); A['batu2'] = w(75)
A['out'] = round(we(75) + 0.95, 3); A['end'] = round(A['out'] + 0.75, 3)

A['tiba'] = w(28); A['ada1'] = w(29); A['manusia'] = w(43); A['sama'] = w(44); A['jadi'] = w(67); A['jika'] = w(69)

# the film strip only exists in the channel section: it runs from the cut and registers on the wordmark frame
steps, t = [], A['back'] + 0.10
while t < A['lockW'] - 0.05: steps.append({'t': round(t, 3)}); t += 0.09
steps.append({'t': A['lockW'], 'lock': 'wm'})

# captions for Studio: sentences
lines, cur = [], []
for i, (tx, s, e) in enumerate(words):
    cur.append(i)
    if tx[-1] in '.?…' and not tx.endswith('tiba-tiba…') and tx != 'Jadi…':
        lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': e}); cur = []
if cur: lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': words[cur[-1]][2]})

tl = {'vo0': VO0, 'vo': str(src.with_suffix('').with_suffix('.mp3').relative_to(WS)), 'dur': A['end'], 'A': A, 'steps': steps, 'words': words}
json.dump(tl, open(ROOT / 'src/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open(ROOT / 'build/lines_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
chapters = [{'chap': 'Hook: dokumen AS → stiker QR (zoom ke belakang)', 'start': 0}, {'chap': '140×: slab lime membanjiri frame', 'start': A['jam']},
            {'chap': 'Pertanyaan (zoom maju)', 'start': A['cut1']}, {'chap': 'Channel: barisan lewat, rem di wordmark', 'start': A['back']},
            {'chap': 'Disclaimer', 'start': A['cut3']}, {'chap': 'Judul: pemakai atau pencipta? (pintu lime)', 'start': A['stepT']}]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [A['lock1'], A['hero1'], A['lock2'], A['hero2'], A['lock3'], A['batu'], A['ai'], A['q1h'], A['q2h'],
        A['q3h'], A['lockW'], A['slab'], *A['src'], A['hib'], A['tAI'], A['zaman'], A['batu2']]
json.dump({'dur': A['end'], 'trans': [A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"dur {A['end']} s · {len(words)} words · {len(steps)} steps · cuts {A['cut1']} / {A['back']} / {A['cut3']} · title step {A['stepT']}")
