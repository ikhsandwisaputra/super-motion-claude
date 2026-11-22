"""VO-first timeline (Batam SWRO Intro, "AWAN atau PIPA?"): every beat sits on a spoken word.
Reads ElevenLabs alignment (take 01, Ahmad v4), writes src/timeline.json, build/lines_film.json,
build/chapters.json and build/cues.json. Usage: python -I tools/place.py [--words | align.json]"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WS = ROOT.parents[2]
src = Path(sys.argv[1]) if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else WS / (
    json.load(open(ROOT.parent / 'film.json'))['vo'].format(n='01') + '.align.json'
)
al = json.load(open(src, encoding='utf-8'))['alignment']
VO0 = 0.5
words, cur, t0, t1 = [], '', 0, 0
for c, s, e in zip(al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']):
    if c.isspace():
        if cur:
            words.append([cur, round(t0 + VO0, 3), round(t1 + VO0, 3)])
            cur = ''
    else:
        if not cur:
            t0 = s
        cur += c
        t1 = e
if cur:
    words.append([cur, round(t0 + VO0, 3), round(t1 + VO0, 3)])
if '--words' in sys.argv:
    for i, w in enumerate(words):
        print(i, *w)
    sys.exit()
w = lambda i: words[i][1]
we = lambda i: words[i][2]

A = {}
# 0 cold open: "Data kita disimpan di awan." (1..5) -> "Terus... kenapa butuh air laut?" (6..10)
A['open'] = [w(1), w(2), w(3), w(4), w(5)]
A['dive0'] = round(w(6) - 0.08, 3)
A['tanya0'] = [w(6), w(7), w(8), w(9), w(10)]

# 1 hook depth row: 3 evidence cards + 1 cloud-to-rack panel (indices 0..3)
#   0: 5 Nov 2026 -> KABIL, BATAM (12..25)
#   1: pabrik air laut -> Rp600 MILIAR (26..38)
#   2: bukan diminum warga -> DATA CENTER (39..53)
#   3: ribuan komputer -> FOTO / WHATSAPP / OBROLAN AI (54..67)
A['locks'] = [
    round(w(12) - 0.04, 3),
    round(w(26) - 0.04, 3),
    round(w(39) - 0.04, 3),
    round(w(54) - 0.04, 3),
]
A['lab'] = [
    None,
    [w(28), w(30)],     # PABRIK | AIR LAUT
    [w(43), w(45)],     # BUKAN | DIMINUM WARGA
    None,
]
A['lead'] = [
    [w(12), w(13), w(14), w(15)],   # Tanggal 5 November 2026
    None,
    [w(48), w(50)],                 # khusus mendinginkan
    None,
]
A['hero'] = [
    [w(24), w(25)],                 # KABIL, BATAM
    [w(35), w(37)],                 # Rp600 MILIAR
    [w(52), w(53)],                 # DATA CENTER
    None,
]
A['tail'] = [None, w(33), None, None]  # senilai sekitar
A['hl'] = [w(20), None, w(48), None]
A['src'] = [w(12) + 0.5, w(26) + 0.5, w(39) + 0.5, w(54) + 0.5]
A['rpCount'] = [w(35), we(36)]
A['nodeLead'] = [w(58), w(59), w(60), w(61)]
A['nodes'] = [w(61), w(63), w(65)]     # foto, WhatsApp, obrolan AI

# 2 twist / bright question wipe: "Lho, memangnya gedung komputer tidak bisa pakai air keran atau air waduk biasa?" (69..81)
A['cut1'] = round(w(68) - 0.02, 3)
A['q1'] = w(69)
A['q1lead'] = [w(71), w(72), w(73), w(74), w(75)]
A['q1h'] = [w(76), w(77)]              # AIR KERAN?
A['q2'] = round(w(78) - 0.08, 3)
A['q2lead'] = [w(78), w(79)]
A['q2h'] = [w(80), w(81)]              # WADUK BIASA?

# 3 channel brake: "Ini Relentless Non-Conformist." (82..84)
A['back'] = round(we(81) + 0.02, 3)
A['lockW'] = round(w(83) - 0.04, 3)
A['slab'] = w(84)

# 4 disclaimer: sources (85..112)
A['cut3'] = round(w(85) - 0.04, 3)
A['dlead'] = [[w(i), we(i)] for i in range(85, 92)]
A['src2'] = [w(92), w(94), w(96), w(98), w(104), w(109)]  # BP BATAM, OMBUDSMAN RI, DISDUKCAPIL, DEPT ENERGI AS, NATURE, ARXIV
A['dtail'] = [w(110), w(111)]
A['hib'] = w(112)

# 5 title reveal: AWAN ATAU / PIPA? -> Katup Pipa Laut portal OUT (last 0.90 s)
A['stepT'] = round(we(112) + 0.14, 3)
A['tMid'] = round(A['stepT'] + 0.25, 3)
A['tHero'] = round(A['stepT'] + 0.65, 3)
A['tSub'] = round(A['stepT'] + 1.15, 3)
A['out'] = round(A['tSub'] + 0.5 + 2.65, 3)
A['end'] = round(A['out'] + 0.90, 3)

steps = []
lines, cur = [], []
for i, (tx, s, e) in enumerate(words):
    if tx.startswith('['):
        continue
    cur.append(i)
    if tx.rstrip('"”')[-1] in '.?…' and tx not in ('Terus...',):
        lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': e})
        cur = []
if cur:
    lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': words[cur[-1]][2]})

tl = {'vo0': VO0, 'vo': str(src.with_suffix('').with_suffix('.mp3').relative_to(WS)), 'dur': A['end'], 'A': A, 'steps': steps, 'words': words}
(ROOT / 'build').mkdir(exist_ok=True)
json.dump(tl, open(ROOT / 'src/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open(ROOT / 'build/lines_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
chapters = [
    {'chap': 'Cold open: Data di awan -> kenapa butuh air laut?', 'start': 0},
    {'chap': 'Hook: Kabil Rp600 M -> Data Center', 'start': A['locks'][0]},
    {'chap': 'Pertanyaan terang: Air keran atau air waduk?', 'start': A['cut1']},
    {'chap': 'Channel: Relentless Non-Conformist', 'start': A['back']},
    {'chap': 'Disclaimer: Sumber resmi & Edukasi', 'start': A['cut3']},
    {'chap': 'Judul: DATA DI CLOUD, BUTUH AIR LAUT?', 'start': A['stepT']},
]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [A['open'][4], A['tanya0'][4], *A['locks'], A['cut1'], A['q1h'][1], A['q2h'][0], A['lockW'], A['slab'], *A['src2'], A['hib'], A['tHero'], A['out']]
json.dump({'dur': A['end'], 'trans': [A['dive0'], A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"dur {A['end']} s · {len(words)} words · locks {A['locks']} · cuts {A['cut1']}/{A['back']}/{A['cut3']}/{A['stepT']}")
