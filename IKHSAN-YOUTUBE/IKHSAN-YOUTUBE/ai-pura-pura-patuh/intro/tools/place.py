"""VO-first timeline (AI Pura-Pura Patuh Intro, "PATUH atau AKTING?"): every beat sits on a spoken word.
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
# 0 cold open: "Kabar genting." (0..1) -> "Mesin pintar kita kepergok... akting patuh di depan penguji." (2..10)
A['open'] = [w(0), w(1), w(2), w(3), w(4), w(5)]
A['dive0'] = round(w(6) - 0.08, 3)
A['tanya0'] = [w(6), w(7), w(8), w(9), w(10)]

# 1 hook depth row: 4 stations (3 evidence/doc sprites + 1 Ahpo A01 layered dual-door!)
#   0: arXiv 2412.14093 -> DESEMBER 2024 (11..24)
#   1: Redwood Research -> BUKU CATATAN RAHASIA (25..48)
#   2: Ahpo A01 Dua Pintu Obrolan semi-3D (Gratis Diawasi vs Berbayar Terkunci) (49..77)
#   3: TechCrunch + 78% Scratchpad Leak -> PURA-PURA NURUT / TOLAK PERINTAH (78..108)
A['locks'] = [
    round(w(11) - 0.05, 3),
    round(w(25) - 0.05, 3),
    round(w(49) - 0.05, 3),
    round(w(78) - 0.05, 3),
]
A['lab'] = [
    [w(15), w(16)],     # RUANG | UJI
    [w(29), w(31)],     # BUKU | RAHASIA
    [w(52), w(53)],     # DUA | PINTU
    [w(83), w(86)],     # INTIP | CATATAN
]
A['lead'] = [
    [w(11), w(12), w(13), w(19)],   # Bayangkan kejadian unik Desember
    [w(25), w(26), w(27), w(28)],   # Tim peneliti keamanan memberi
    None,
    [w(88), w(90), w(91)],          # Mesin tadi menulis rencana
]
A['hero'] = [
    [w(19), w(24)],                 # DESEMBER 2024
    [w(29), w(31)],                 # SCRATCHPAD
    None,
    [w(93), w(94)],                 # PURA-PURA NURUT
]
A['tail'] = [None, w(44), None, w(105)]     # tidak bakal diintip / langsung balik menolak
A['hl'] = [w(16), w(38), None, w(93)]
A['src'] = [w(11) + 0.5, w(25) + 0.5, w(49) + 0.5, w(78) + 0.5]
A['doors'] = [w(59), w(70)]                 # Di pintu gratis (59), Di pintu berbayar (70)
A['flipOff'] = w(99)                        # Begitu pengawasnya pergi -> balik menolak

# 2 twist / bright question wipe: "Kok bisa kumpulan rumus hitung-hitungan punya kelakuan mirip murid nyontek?" (109..118)
A['cut1'] = round(w(109) - 0.04, 3)
A['q1'] = w(109)
A['q1lead'] = [w(109), w(110), w(111), w(112), w(113)]
A['q1h'] = [w(116), w(117), w(118)]          # MIRIP MURID NYONTEK?
A['q2'] = round(w(117) - 0.12, 3)
A['q2lead'] = [w(114), w(115)]
A['q2h'] = [w(117), w(118)]                  # AKTING PATUH?

# 3 channel brake: "Ini Relentless Non-Conformist." (119..121)
A['back'] = round(we(118) + 0.04, 3)
A['lockW'] = round(w(120) - 0.04, 3)
A['slab'] = w(121)

# 4 disclaimer: sources (122..149)
A['cut3'] = round(w(122) - 0.04, 3)
A['dlead'] = [[w(i), we(i)] for i in range(122, 129)]
# 6 source stamps: ARXIV, REDWOOD, APOLLO, PALISADE, NIST, KOMDIGI/OJK
A['src2'] = [w(132), w(133), w(135), w(137), w(139), w(142)]
A['dtail'] = [w(147), w(148)]
A['hib'] = w(149)

# 5 title reveal: AI PURA-PURA PATUH / SAAT TAHU DIUJI? -> Tirai Kaca Satu Arah portal OUT (last 0.90 s)
A['stepT'] = round(we(149) + 0.14, 3)
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
    if tx.rstrip('"”')[-1] in '.?…':
        lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': e})
        cur = []
if cur:
    lines.append({'text': ' '.join(words[j][0] for j in cur), 'start': words[cur[0]][1], 'end': words[cur[-1]][2]})

tl = {'vo0': VO0, 'vo': str(src.with_suffix('').with_suffix('.mp3').relative_to(WS)), 'dur': A['end'], 'A': A, 'steps': steps, 'words': words}
(ROOT / 'build').mkdir(exist_ok=True)
json.dump(tl, open(ROOT / 'src/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open(ROOT / 'build/lines_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
chapters = [
    {'chap': 'Cold open: Mesin pintar kepergok akting patuh', 'start': 0},
    {'chap': 'Hook: Catatan rahasia arXiv & Dua Pintu Uji', 'start': A['locks'][0]},
    {'chap': 'Pertanyaan terang: Kok bisa mirip murid nyontek?', 'start': A['cut1']},
    {'chap': 'Channel: Relentless Non-Conformist', 'start': A['back']},
    {'chap': 'Disclaimer: Sumber riset & aturan RI', 'start': A['cut3']},
    {'chap': 'Judul: AI PURA-PURA PATUH SAAT TAHU DIUJI?', 'start': A['stepT']},
]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [A['open'][2], A['tanya0'][0], *A['locks'], A['cut1'], A['q1h'][0], A['lockW'], A['slab'], *A['src2'], A['hib'], A['tHero'], A['out']]
json.dump({'dur': A['end'], 'trans': [A['dive0'], A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"dur {A['end']} s · {len(words)} words · locks {A['locks']} · cuts {A['cut1']}/{A['back']}/{A['cut3']}/{A['stepT']}")
