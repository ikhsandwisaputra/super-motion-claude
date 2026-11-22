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
words = [x for x in words if not x[0].startswith('[')]   # v4 audio tags are not spoken
if '--words' in sys.argv:
    for i, w in enumerate(words): print(i, *w)
    sys.exit()
w = lambda i: words[i][1]
we = lambda i: words[i][2]

A = {}
# ai-bubble-dompet vo/01 (eleven_v4, Ahmad) — word indices from --words, tags skipped
A['lock1'] = 0.46; A['hero1'] = w(5); A['strike1'] = None                                   # Harga HP … NAIK
A['lock2'] = w(6) - 0.03; A['hero2'] = w(9); A['strike2'] = None                            # Biasanya … DOLAR · PAJAK
A['lock3'] = w(12) - 0.02; A['lab'] = [w(13), w(13) + 0.3]; A['cuma'] = w(12); A['batu'] = w(14); A['diasah'] = w(19)   # tersangkanya … PUSAT DATA AI · rebutan chip
A['jam'] = w(22); A['tiba'] = w(27); A['ada1'] = w(30); A['ai'] = w(32); A['cut1'] = round(w(32) + 0.9, 3)   # Chip yang sama … di HP kita … 45%
A['q1'] = w(36); A['q1h'] = w(37); A['q2'] = w(38); A['q2h'] = w(40); A['q3'] = w(41); A['q3h'] = w(47)
A['q3lead'] = [w(42), w(44)]; A['manusia'] = w(45); A['sama'] = w(47)                        # Kalau pecah… APA YANG TERSISA?
A['back'] = round(we(47) + 0.02, 3)
A['lockW'] = round(w(49) - 0.07, 3); A['slab'] = w(50)
A['cut3'] = round(w(51) - 0.02, 3); A['dlead'] = [[w(i), we(i)] for i in range(51, 58)]
A['src'] = [w(58), w(59), w(61), w(63)]; A['dtail'] = w(65); A['hib'] = w(67)
A['stepT'] = round(w(70) - 0.30, 3); A['lead'] = w(71); A['jika'] = w(73); A['tAI'] = w(77); A['ada'] = w(78); A['zaman'] = w(81); A['batu2'] = w(81)
A['out'] = round(we(81) + 0.95, 3); A['end'] = round(A['out'] + 0.75, 3)
A['jadi'] = w(70)

# the film strip only exists in the channel section: it runs from the cut and registers on the wordmark frame
steps, t = [], A['back'] + 0.10
while t < A['lockW'] - 0.05: steps.append({'t': round(t, 3)}); t += 0.09
steps.append({'t': A['lockW'], 'lock': 'wm'})

# captions for Studio: sentences
lines, cur = [], []
for i, (tx, s, e) in enumerate(words):
    cur.append(i)
    if tx[-1] in '.?…' and not tx.endswith('...'):
        lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': e}); cur = []
if cur: lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': words[cur[-1]][2]})

tl = {'vo0': VO0, 'vo': str(src.with_suffix('').with_suffix('.mp3').relative_to(WS)), 'dur': A['end'], 'A': A, 'steps': steps, 'words': words}
json.dump(tl, open(ROOT / 'src/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open(ROOT / 'build/lines_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
chapters = [{'chap': 'Hook: harga HP naik → dolar/pajak → pusat data AI (zoom ke belakang)', 'start': 0}, {'chap': '45%: slab lime membanjiri frame', 'start': A['jam']},
            {'chap': 'Pertanyaan (zoom maju)', 'start': A['cut1']}, {'chap': 'Channel: barisan lewat, rem di wordmark', 'start': A['back']},
            {'chap': 'Disclaimer', 'start': A['cut3']}, {'chap': 'Judul: apa itu AI bubble? dampaknya buat Indonesia? (pintu lime)', 'start': A['stepT']}]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [A['lock1'], A['hero1'], A['lock2'], A['hero2'], A['lock3'], A['batu'], A['ai'], A['q1h'], A['q2h'],
        A['q3h'], A['lockW'], A['slab'], *A['src'], A['hib'], A['tAI'], A['zaman'], A['batu2']]
json.dump({'dur': A['end'], 'trans': [A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"dur {A['end']} s · {len(words)} words · {len(steps)} steps · cuts {A['cut1']} / {A['back']} / {A['cut3']} · title step {A['stepT']}")
