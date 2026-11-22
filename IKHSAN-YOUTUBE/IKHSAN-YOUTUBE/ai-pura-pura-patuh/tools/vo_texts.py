"""NARASI.md -> one VO text per take (build/vo/NN.txt). Narration = lines in '## Naskah' that are not cues ('>'), headers or blank.
  python -I tools/vo_texts.py -> writes files + prints chars per take
Map: Hook+pembuka Peta=01 (+ RNC channel line + sources), Peta 3 tanya=03, Bab 1..4=04..07, Puncak=08, Penutup=09."""
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

# Split Peta into: intro setup (lines before "Hari ini kita bedah tiga teka-teki besar") vs Peta 3-question roadmap
peta_all = list(secs.get('Peta', []))
split_idx = next((i for i, l in enumerate(peta_all) if 'Hari ini kita bedah tiga teka-teki besar' in l), len(peta_all))
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

out = ROOT / 'build/vo'
out.mkdir(parents=True, exist_ok=True)
tot = 0
for name, n in MAP.items():
    lines = list(secs[name])
    if n == '01':
        lines += [
            'Ini Relentless Non-Conformist.',
            'Angka di video ini dari sumber resmi: makalah ilmiah di arXiv, Redwood Research, Apollo Research, Palisade Research, NIST, serta aturan Komdigi, UU PDP, dan OJK. Ini video edukasi.',
        ]
    if n == '09':
        # Sesuai standar §9.7: arahkan ke video yang SUDAH terbit (AGI Setara Manusia)
        lines = [
            l.replace(
                'tonton investigasi kita berikutnya di layar akhir!',
                'tonton juga investigasi kita soal apakah AI bisa setara manusia di layar akhir!'
            ) for l in lines
        ]
    # Bersihkan nada marah/teriak/slow-AI agar pembawaan natural mengalir ala Video 1 (teknologi-indo-vs-as, eleven_v3):
    # buang tag over-acting ([shouts], [serious], [mischievously], [excited], [sarcastic], [laughs], [calm]) dan ubah CAPS teriak jadi normal.
    clean = []
    for idx_l, l in enumerate(lines):
        l = re.sub(r'\[(shouts|serious|mischievously|excited|sarcastic|laughs|calm|whispers)\]\s*', '', l, flags=re.I)
        # Pertahankan [curious] hanya di baris pembuka jika memang pertanyaan ringan, sisanya natural polos seperti Video 1
        if idx_l > 0:
            l = re.sub(r'\[curious\]\s*', '', l, flags=re.I)
        l = l.replace('TUJUH PULUH DELAPAN', 'tujuh puluh delapan')
        l = l.replace('TUJUH PULUH SEMBILAN', 'tujuh puluh sembilan')
        # Kurangi tanda seru berlebih yang bikin ElevenLabs terdengar marah/membentak
        l = l.replace('!', '.')
        clean.append(l.strip())
    t = '\n'.join(clean)
    left = re.findall(r'\d+[.,]\d+', t)
    (out / f'{n}.txt').write_text(t + '\n', encoding='utf-8')
    tot += len(t)
    print(n, f'{name:10s}', len(t), 'chars', ('  !! nums: ' + ' '.join(left)) if left else '')
print('total', tot)
