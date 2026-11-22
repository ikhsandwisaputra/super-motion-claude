"""VO-first timeline (Data KTP Kita Dijual Rp0,49 Intro, "DIJAGA atau DIOBRAL?"): every beat sits on a spoken word.
Reads ElevenLabs alignment (take 01, Ahmad v4), writes src/timeline.json, build/lines_film.json,
build/chapters.json and build/cues.json."""
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

w = lambda i: words[min(i, len(words) - 1)][1]
we = lambda i: words[min(i, len(words) - 1)][2]

A = {}
# 0 cold open: "Apa yang harganya cuma setengah perak? Permen karet?" (1..8) -> "...Bukan. Itu harga data KTP kita." (9..14)
A['open'] = [w(1), w(2), w(3), w(4), w(5), w(6), w(7), w(8)]
A['dive0'] = round(w(9) - 0.06, 3)
A['tanya0'] = [w(9), w(10), w(11), w(12), w(13), w(14)]

# 1 hook depth row: 3 rich stations (Ahpo D01 KTP + Rp0,49 tag -> Kompas.id Rp0,49 -> KOMPAS.com 1,3M SIM)
#   0: D01 Kartu Biru + Label Harga Rp0,49 (15..31: "Coba kamu buka dompet... jatuh di jalan.")
#   1: Kompas.id Investigasi Rp0,49 (32..40: "Mau daftar telepon atau berobat, semuanya butuh nomor itu.")
#   2: KOMPAS.com 1,3 Miliar SIM Card (41..48: "Sayangnya, di pasar gelap, rahasia kita diobral murah.")
A['locks'] = [
    round(w(15) - 0.05, 3),
    round(w(32) - 0.05, 3),
    round(w(41) - 0.05, 3),
]
A['lab'] = [
    [w(18), w(21)],   # KARTU | BIRU
    [w(34), w(36)],   # SATU | NOMOR
    [w(43), w(44)],   # PASAR | GELAP
]
A['lead'] = [
    [w(15), w(17), w(18)],        # Coba buka dompet
    [w(32), w(33), w(34), w(36)], # Mau daftar telepon berobat
    [w(41), w(43), w(44)],        # Sayangnya di pasar gelap
]
A['hero'] = [
    [w(21), w(22)],   # KARTU BIRU
    [w(38), w(39)],   # KUNCI SEMUA
    [w(47), w(48)],   # DIOBRAL Rp0,49
]
A['tail'] = [w(25), w(39), w(48)]
A['hl'] = [None, w(34), w(45)]
A['src'] = [w(15) + 0.45, w(32) + 0.45, w(41) + 0.45]
A['tagSwing'] = w(25)  # "menjaganya erat"

# 2 bright light-world flash question right before channel brake (compact 1.2s punch between w(48) and w(49))
A['cut1'] = round(w(47) - 0.04, 3)
A['q1'] = w(47)
A['q1lead'] = [w(45), w(46)]
A['q1h'] = [w(47), w(48)]

# 3 channel brake: "Ini Relentless Non-Conformist." (49..51)
A['back'] = round(w(49) - 0.14, 3)
A['lockW'] = round(w(50) - 0.04, 3)
A['slab'] = w(51)

# 4 disclaimer: sources (52..85)
A['cut3'] = round(w(52) - 0.04, 3)
A['dlead'] = [[w(i), we(i)] for i in range(52, 59)]
# 6 source pairs: KOMPAS, BBC, CNBC/KATADATA, SURFSHARK/KASPERSKY, BSSN/KOMDIGI, JDIH/ELSAM
A['src2'] = [w(61), w(65), w(68), w(71), w(73), w(75)]
A['dtail'] = [w(83), w(84)]
A['hib'] = w(85)

# 5 title reveal: DATA KTP KITA DIJUAL Rp0,49 / KOK BELUM ADA DENDA? -> Vault Dial Shutter OUT (last 0.90 s)
A['stepT'] = round(we(85) + 0.14, 3)
A['tMid'] = round(A['stepT'] + 0.25, 3)
A['tHero'] = round(A['stepT'] + 0.65, 3)
A['tSub'] = round(A['stepT'] + 1.15, 3)
A['out'] = round(A['tSub'] + 0.5 + 2.55, 3)
A['end'] = round(A['out'] + 0.90, 3)

# Sync dur into film.json intro entry
fj_path = ROOT.parent / 'film.json'
fj = json.loads(fj_path.read_text(encoding='utf-8'))
for ch in fj['chapters']:
    if ch['dir'] == 'intro':
        ch['dur'] = A['end']
fj_path.write_text(json.dumps(fj, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

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

tl = {'vo0': VO0, 'vo': str(src.with_suffix('').with_suffix('.mp3').relative_to(WS)), 'dur': A['end'], 'A': A, 'steps': [], 'words': words}
(ROOT / 'build').mkdir(exist_ok=True)
json.dump(tl, open(ROOT / 'src/timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(lines, open(ROOT / 'build/lines_film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
chapters = [
    {'chap': 'Cold open: Harga data KTP setengah perak', 'start': 0},
    {'chap': 'Hook: Kartu Biru D01 & Bukti Pasar Gelap', 'start': A['locks'][0]},
    {'chap': 'Flash Terang: Diobral Rp0,49?', 'start': A['cut1']},
    {'chap': 'Channel: Relentless Non-Conformist', 'start': A['back']},
    {'chap': 'Disclaimer: Sumber investigasi & lembaga RI', 'start': A['cut3']},
    {'chap': 'Judul: DATA KTP KITA DIJUAL Rp0,49 · KOK BELUM ADA DENDA?', 'start': A['stepT']},
]
json.dump(chapters, open(ROOT / 'build/chapters.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
keys = [A['open'][4], A['tanya0'][0], *A['locks'], A['cut1'], A['lockW'], A['slab'], *A['src2'], A['hib'], A['tHero'], A['out']]
json.dump({'dur': A['end'], 'trans': [A['dive0'], A['cut1'], A['back'], A['cut3'], A['stepT']], 'keys': [{'t': t} for t in keys], 'beats': []},
          open(ROOT / 'build/cues.json', 'w'), indent=1)
print(f"intro dur {A['end']} s · {len(words)} words · locks {A['locks']} · cuts {A['cut1']}/{A['back']}/{A['cut3']}/{A['stepT']}")
