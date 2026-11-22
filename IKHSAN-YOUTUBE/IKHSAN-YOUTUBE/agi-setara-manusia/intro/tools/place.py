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
if '--words' in sys.argv:
    for i, w in enumerate(words): print(i, *w)
    sys.exit()
w = lambda i: words[i][1]
we = lambda i: words[i][2]

A = {}
# hook: seven evidence steps + one analogy step, each lock on a spoken word (agi-setara-manusia, take 01 v2, 2026-11-17)
A['open'] = [w(1), w(2), w(3)]                                   # cold open: "AGI sudah tiba."
A['locks'] = [round(w(4) - .04, 3), round(w(14) - .04, 3), round(w(36) - .03, 3), round(w(50) - .03, 3), round(w(59) - .03, 3), round(w(67) - .03, 3), round(w(81) - .03, 3), round(w(99) - .03, 3)]
A['lab'] = [None, [w(15), w(18)], [w(37), w(38)], None, None, [w(70), w(71)], [w(85), w(87)], None]
A['lead'] = [[w(5)], [w(20), w(22)], [w(41), w(42), w(43)], [w(51), w(53), w(54)], [w(59)], None, None, None]
A['hero'] = [[w(6), w(7)], [w(24), w(25)], [w(45), w(46)], [w(57), w(58)], [w(61), w(62)],
             [w(75), w(77), w(78), w(79), w(80)], [w(93), w(95), w(96), w(97), w(98)], None]
A['tail'] = [w(8), None, w(48), None, w(64), None, None, None]
A['hl'] = [w(5), w(18), None, None, None, None, None, None]      # lime marker on the document itself
A['ukur'] = [None, None, None, None, None, w(73), w(88), None]    # "DIUKUR: …" ruler under the label
A['src'] = [w(4) + .5, w(14) + .5, w(36) + .5, w(50) + .5, w(59) + .5, w(67) + .6, w(81) + .6, w(99) + .6]
A['tunggu'] = w(28); A['putar'] = w(32); A['rewEnd'] = round(A['locks'][2] - .30, 3)
A['melonjak'] = w(91)
# analogy step (8th): the same exam on two glass panels, one bare, one with its own toolkit docked on
A['anaLead'] = [w(99), w(100), w(101), w(102)]; A['anaL'] = [w(106), w(107)]; A['anaR'] = [w(112), w(113)]; A['tools'] = [w(113), w(114), w(115)]
A['jam'] = w(118); A['twist'] = [[w(118), w(119), w(120)], [w(121), w(122), w(123)], [w(124), w(125)]]
A['ai'] = w(126); A['aiH'] = [w(126), w(127)]; A['cut1'] = round(w(126) + 0.9, 3)
A['q1'] = w(128); A['q1h'] = w(129); A['q2'] = w(131); A['q2h'] = [w(132), w(133)]
A['q3'] = w(134); A['q3lead'] = [w(134), w(135)]; A['manusia'] = w(136); A['q3h'] = w(137); A['sama'] = w(138)
A['back'] = round(we(139) + 0.02, 3)
A['lockW'] = round(w(141) - 0.07, 3); A['slab'] = w(142)
A['cut3'] = round(w(143) - 0.02, 3); A['dlead'] = [[w(i), we(i)] for i in range(143, 150)]
A['src2'] = [w(150), w(152), w(156), w(158)]; A['dtail'] = [w(162), w(163)]; A['hib'] = w(164)
A['jadi'] = w(166); A['tanya'] = [w(166), w(167), w(168), w(169)]; A['tanya2'] = [w(177), w(178), w(179), w(180), w(181)]
A['klik'] = round(w(182) + .04, 3); A['nyala'] = [w(183), w(184)]
A['climbL'] = [[w(185), w(186)], [w(187), w(188), w(189)], [w(190), w(191), w(192), w(193), w(194)]]
A['steps'] = [round(w(i) - .06, 3) for i in (186, 188, 190, 192, 194)]   # one step per beat on "pelan-pelan · naik · satu · tangga · satu"
A['dive'] = round(we(194) + .05, 3); A['stepT'] = round(A['dive'] + .38, 3)
A['tMid'] = round(A['stepT'] + .35, 3); A['tHero'] = round(A['stepT'] + .75, 3); A['tSub'] = round(A['stepT'] + 1.25, 3)
A['end'] = round(A['tSub'] + .5 + 2.4 + .95, 3); A['out'] = round(A['end'] - .95, 3)   # subtitle fully read ≥ 2.4 s before the portal's last .95 s

steps = []
# captions for Studio: sentences
lines, cur = [], []
for i, (tx, s, e) in enumerate(words):
    cur.append(i)
    if tx.startswith('['): cur.pop(); continue                      # audio tags ([curious] …) are not words
    if tx.rstrip('"”')[-1] in '.?…' and tx not in ('dulu...', 'cuma...', 'Jadi...'):
        lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': e}); cur = []
if cur: lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': words[cur[-1]][2]})

tl = {'vo0': VO0, 'vo': str(src.with_suffix('').with_suffix('.mp3').relative_to(WS)), 'dur': A['end'], 'A': A, 'steps': steps, 'words': words}
json.dump(tl, open(ROOT / 'src/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open(ROOT / 'build/lines_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
chapters = [{'chap': 'Hook: tangga bukti (naik & menjauh)', 'start': 0}, {'chap': 'Putar ulang', 'start': A['putar']},
            {'chap': 'Ibarat ujian: apa adanya vs bawa alat bantu', 'start': A['locks'][7]},
            {'chap': 'Twist: bedanya cuma CARA NGETESNYA', 'start': A['jam']}, {'chap': 'Pertanyaan (zoom maju)', 'start': A['cut1']},
            {'chap': 'Channel: rem di wordmark', 'start': A['back']}, {'chap': 'Disclaimer sumber', 'start': A['cut3']},
            {'chap': 'Saklar AGI: klik, lampu menyala', 'start': A['jadi']}, {'chap': 'Naik tangga satu per satu', 'start': A['steps'][0]}, {'chap': 'Judul: SAKLAR ATAU TANGGA?', 'start': A['stepT']}]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [*A['locks'], *[h[0] for h in A['hero'] if h], A['putar'], A['ai'], A['q1h'], A['q3h'], A['lockW'], A['slab'], *A['src2'], A['hib'], A['klik'], *A['steps'], A['tHero'], A['tSub']]
json.dump({'dur': A['end'], 'trans': [A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"dur {A['end']} s · {len(words)} words · cuts {A['cut1']} / {A['back']} / {A['cut3']} · klik {A['klik']} · title {A['stepT']}")
