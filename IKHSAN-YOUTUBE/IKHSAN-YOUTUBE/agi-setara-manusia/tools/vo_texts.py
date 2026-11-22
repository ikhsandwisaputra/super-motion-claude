"""NARASI.md -> one VO text per take (build/vo/NN.txt). Narration = lines in '## Naskah' that are not cues ('>'), headers or blank.
  python -I tools/vo_texts.py            -> writes files + prints chars per take
Map: Hook=01 (+ RNC channel line + sources), Peta=03, Bab 1..5=04..08, Puncak=09, Penutup=10."""
import re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
src = (ROOT / 'NARASI.md').read_text(encoding='utf-8').split('## Naskah', 1)[1].split('\n## ', 1)[0]
secs, cur = {}, None
for line in src.splitlines():
    if line.startswith('### '): cur = line[4:].split(' ·')[0].strip(); secs[cur] = []; continue
    if cur and line.strip() and not line.lstrip().startswith('>'): secs[cur].append(line.strip())
MAP = {'Hook': '01', 'Peta': '03', 'Bab 1': '04', 'Bab 2': '05', 'Bab 3': '06', 'Bab 4': '07', 'Bab 5': '08', 'Puncak': '09', 'Penutup': '10'}
NUM = {  # decimals read out (Indonesian comma decimals are easy to misread)
    '62,7': 'enam puluh dua koma tujuh', '99,9': 'sembilan puluh sembilan koma sembilan', '21,7': 'dua puluh satu koma tujuh',
    '81,2': 'delapan puluh satu koma dua', '97,7': 'sembilan puluh tujuh koma tujuh', '65,1': 'enam puluh lima koma satu',
    '99,1': 'sembilan puluh sembilan koma satu', '18,2': 'delapan belas koma dua', '27,3': 'dua puluh tujuh koma tiga',
    '46,6': 'empat puluh enam koma enam', 'Fable 5.2': 'Fable lima titik dua'}
out = ROOT / 'build/vo'; out.mkdir(parents=True, exist_ok=True); tot = 0
for name, n in MAP.items():
    lines = list(secs[name])
    if n == '01':   # RNC intro: channel + sources before the title question
        last = lines.pop()
        q = re.split(r'(?<=\?)\s+(?=Dan apa itu AGI\?)', last)
        lines += [q[0], 'Ini Relentless Non-Conformist.',
                  'Angka di video ini dari sumber riset: ARC Prize, METR, makalah ilmiah di arXiv, dan laporan resmi perusahaan AI. Ini video edukasi.',
                  '[thoughtful] Jadi... sebenarnya apa itu AGI?',
                  'Dan kalau memang datang, apakah dia datang tiba-tiba, kayak saklar lampu? Klik, langsung nyala. Atau pelan-pelan, kayak naik tangga, satu anak tangga demi satu?']
    t = '\n'.join(lines)
    for k, v in NUM.items(): t = t.replace(k, v)
    left = re.findall(r'\d+,\d+', t)
    (out / f'{n}.txt').write_text(t + '\n', encoding='utf-8'); tot += len(t)
    print(n, name, len(t), 'chars', ('  !! decimals left: ' + ' '.join(left)) if left else '')
print('total', tot)
