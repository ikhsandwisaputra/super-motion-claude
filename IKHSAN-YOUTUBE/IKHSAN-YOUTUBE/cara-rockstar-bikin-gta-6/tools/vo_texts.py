"""NARASI.md -> one VO text per take (build/vo/NN.txt).
Narration = lines in '## Naskah' that are not cues ('>'), headers or blank.
  .venv/bin/python -I aset/data-kita-dijual-dark-web/tools/vo_texts.py
Map (GTA 6): Hook+4 baris Peta=01 (+ RNC channel line + sources), Peta 4 teka-teki=03,
Bab 1..4=04..07, Puncak=08, Penutup=09."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
src = (ROOT / 'NARASI.md').read_text(encoding='utf-8').split('## Naskah', 1)[1].split('\n## ', 1)[0]
secs, cur = {}, None
for line in src.splitlines():
    if line.startswith('### '):
        cur = line[4:].split(' ·')[0].split(' /')[0].strip()
        secs[cur] = []
        continue
    if cur and line.strip() and not line.lstrip().startswith('>'):
        secs[cur].append(line.strip())

# Split Peta: the first 4 lines (orang tua -> 2,36 miliar) go into the intro (01); from "24,58 juta kopi" on = bab-peta (03).
peta_all = list(secs.get('Peta', []))
split_idx = next((i for i, l in enumerate(peta_all) if '24,58 juta kopi' in l), len(peta_all))
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

# Normalization so ElevenLabs reads Indonesian numbers/abbreviations naturally
SPOKEN_FIXES = [
    ('Rp1.321.000', 'satu juta tiga ratus dua puluh satu ribu rupiah'),
    ('Rp1.654.000', 'satu juta enam ratus lima puluh empat ribu rupiah'),
    ('182.000 persen', 'seratus delapan puluh dua ribu persen'),
    ('1440p', 'seribu empat ratus empat puluh p'),
    ('4K', 'empat K'),
    ('PSSR', 'P S S R'),
    ('PlayStation 5', 'PlayStation Lima'),
    ('PS5', 'PS Lima'),
    ('PS3', 'PS Tiga'),
    ('DE-CIX', 'Di-Siks'),
    ('Cfx.re', 'C F X titik R E'),
    ('IWGB', 'I W G B'),
    ('1,50 juta', 'satu setengah juta'),
]

out = ROOT / 'build/vo'
out.mkdir(parents=True, exist_ok=True)
tot = 0
for name, n in MAP.items():
    lines = list(secs[name])
    if n == '01':
        lines += [
            'Ini Relentless Non-Conformist.',
            'Angka di video ini dari sumber resmi: Take-Two Interactive, Sensor Tower, Digital Foundry, Variety, Deadline, Forbes, BBC News, Kompas dot com, dan Streams Charts. Ini video edukasi.',
        ]
    clean = []
    for idx_l, l in enumerate(lines):
        # Bersihkan tag over-acting agar pembawaan natural mengalir ala Video 1 & app v2 (eleven_v3)
        l = re.sub(r'\[(shouts|serious|mischievously|excited|sarcastic|laughs|calm|whispers|deadpan|warm)\]\s*', '', l, flags=re.I)
        if idx_l > 0:
            l = re.sub(r'\[curious\]\s*', '', l, flags=re.I)
        for a, b in SPOKEN_FIXES:
            l = l.replace(a, b)
        l = l.replace('!', '.')
        clean.append(l.strip())
    t = '\n'.join(clean)
    left = re.findall(r'\d+[.,]\d+', t)
    (out / f'{n}.txt').write_text(t + '\n', encoding='utf-8')
    tot += len(t)
    print(f'{n}  {name:10s}  {len(t):4d} chars  ({len(t.split()):3d} kata)' + (f'  !! nums: {" ".join(left)}' if left else ''))
print(f'TOTAL: {tot} chars')
