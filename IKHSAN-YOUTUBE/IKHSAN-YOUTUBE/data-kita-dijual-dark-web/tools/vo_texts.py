"""NARASI.md -> one VO text per take (build/vo/NN.txt).
Narration = lines in '## Naskah' that are not cues ('>'), headers or blank.
  .venv/bin/python -I aset/data-kita-dijual-dark-web/tools/vo_texts.py
Map: Hook+pembuka Peta=01 (+ RNC channel line + sources), Peta 4 teka-teki=03,
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

# Split Peta: lines before "Hari ini kita mengobrol santai" go into intro (01);
# the 4-puzzle roadmap starts bab-peta (03).
peta_all = list(secs.get('Peta', []))
split_idx = next((i for i, l in enumerate(peta_all) if 'Hari ini kita mengobrol santai' in l), len(peta_all))
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
    ('3x24 jam', 'tiga kali dua puluh empat jam'),
    ('PP 33/2026', 'PP Nomor 33 Tahun 2026'),
    ('Rp0,49', 'empat puluh sembilan sen'),
    ('Rp4,30', 'empat rupiah tiga puluh sen'),
    ('Rp5,86', 'lima rupiah delapan puluh enam sen'),
    ('Rp33,6', 'tiga puluh tiga koma enam rupiah'),
    ('Rp31.924', 'tiga puluh satu ribu sembilan ratus dua puluh empat rupiah'),
    ('Rp131 miliar', 'seratus tiga puluh satu miliar rupiah'),
    ('Rp160 juta', 'seratus enam puluh juta rupiah'),
    ('Rp25', 'dua puluh lima rupiah'),
    ('pukul 23.15', 'pukul dua puluh tiga lewat lima belas'),
    ('pukul 00.54', 'pukul nol nol lewat lima puluh empat'),
    ('sidalih.kpu.go.id', 'sidalih titik kpu titik go titik id'),
]

out = ROOT / 'build/vo'
out.mkdir(parents=True, exist_ok=True)
tot = 0
for name, n in MAP.items():
    lines = list(secs[name])
    if n == '01':
        lines += [
            'Ini Relentless Non-Conformist.',
            'Angka di video ini dari sumber resmi: investigasi Harian Kompas, Kompas dot com, BBC News Indonesia, CNBC Indonesia, Katadata, Surfshark, Kaspersky, BSSN, Komdigi, JDIH BPK, JDIH DPR RI, serta kajian ELSAM. Ini video edukasi.',
        ]
    if n == '09':
        # Sesuai standar §9.7: rekomendasikan video yang SUDAH terbit (AI Sudah Mulai Lapar Data Manusia?)
        lines = [
            l.replace(
                'Yuk, klik juga tayangan bedah kasus kami lainnya di pojok layar!',
                'Yuk, tonton juga investigasi kami soal apakah AI mulai kehabisan data manusia di pojok layar.'
            ) for l in lines
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
