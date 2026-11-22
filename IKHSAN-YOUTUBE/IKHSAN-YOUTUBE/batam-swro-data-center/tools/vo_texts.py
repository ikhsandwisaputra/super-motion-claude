"""NARASI.md -> one VO text per take (build/vo/NN.txt). Narration = lines in '## Naskah' that are not cues ('>'), headers or blank.
  python -I tools/vo_texts.py            -> writes files + prints chars per take
Map: Hook+pembuka Peta=01 (+ RNC channel line + sources), Peta 4 tanya=03, Bab 1..4=04..07, Puncak=08, Penutup=09."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
src = (ROOT / 'NARASI.md').read_text(encoding='utf-8').split('## Naskah', 1)[1].split('\n## ', 1)[0]
secs, cur = {}, None
for line in src.splitlines():
    if line.startswith('### '):
        cur = line[4:].split(' ·')[0].strip()
        secs[cur] = []
        continue
    if cur and line.strip() and not line.lstrip().startswith('>'):
        secs[cur].append(line.strip())

# Split Peta into: intro setup (lines before "Supaya terang semua") vs Peta 4-question roadmap
peta_all = list(secs.get('Peta', []))
split_idx = next((i for i, l in enumerate(peta_all) if 'Supaya terang semua' in l), len(peta_all))
secs['HookFull'] = list(secs.get('Hook', [])) + peta_all[:split_idx]
secs['PetaMap'] = peta_all[split_idx:]

MAP = {
    'HookFull': '01',
    'PetaMap': '03',
    'Bab 1': '04',
    'Bab 2': '05',
    'Bab 3': '06',
    'Bab 4': '07',
    'Puncak': '08',
    'Penutup': '09',
}

NUM = {
    'Rp600 miliar': 'enam ratus miliar rupiah',
    '1,4': 'satu koma empat',
    '1.394.459': 'satu juta tiga ratus sembilan puluh empat ribu empat ratus lima puluh sembilan',
    '25,5': 'dua puluh lima koma lima',
    '1,8': 'satu koma delapan',
    '1,36': 'satu koma tiga puluh enam',
    '2,7': 'dua koma tujuh',
    '35.000': 'tiga puluh lima ribu',
    '70.000': 'tujuh puluh ribu',
}

out = ROOT / 'build/vo'
out.mkdir(parents=True, exist_ok=True)
tot = 0
for name, n in MAP.items():
    lines = list(secs[name])
    if n == '01':
        lines += [
            'Ini Relentless Non-Conformist.',
            'Angka di video ini dari sumber resmi: BP Batam, Ombudsman RI, Disdukcapil Batam, Departemen Energi Amerika Serikat, serta jurnal Nature dan makalah ilmiah di arXiv. Ini video edukasi.',
        ]
    t = '\n'.join(lines)
    for k, v in NUM.items():
        t = t.replace(k, v)
    left = re.findall(r'\d+,\d+', t)
    (out / f'{n}.txt').write_text(t + '\n', encoding='utf-8')
    tot += len(t)
    print(n, name, len(t), 'chars', ('  !! decimals left: ' + ' '.join(left)) if left else '')
print('total', tot)
