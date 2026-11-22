"""Lab Season 3 · mix + berkas Motion Studio dari build/cues_src.json (tulis dulu dengan tools/lab.py).
Konvensi template: VO apa adanya (potong −ss/−t, fade 12 ms) · tiap SFX dinormalkan ke puncak lalu diberi dB (opsional dipotong d detik)
· hit transisi tx/<nama>.wav di t − peak, −6 dB · room tone (noise 60–400 Hz, −40) · loudnorm 2 lintasan −14 LUFS / TP −1,5 → build/mix.wav.
Juga menulis build/{chapters,lines_film,cues,sfx_placed}.json untuk Studio."""
import json
import pathlib
import subprocess
import wave

import imageio_ffmpeg
import numpy as np
from scipy.signal import butter, sosfilt

ROOT = pathlib.Path(__file__).resolve().parent.parent
WS = ROOT.parent.parent
SR = 48000
FF = imageio_ffmpeg.get_ffmpeg_exe()
C = json.loads((ROOT / 'build/cues_src.json').read_text())
DUR = C['dur']
n = int(SR * DUR)


def dec(path, ss=None, t=None):
    cmd = [FF, '-v', 'error'] + (['-ss', f'{ss}'] if ss is not None else []) + (['-t', f'{t}'] if t else []) + \
          ['-i', str(path), '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).astype(float)


def fade(x, a=.012, b=.012):
    x = x.copy(); fa, fb = int(a * SR), int(b * SR)
    if fa: x[:fa] *= np.linspace(0, 1, fa)[:, None]
    if fb: x[-fb:] *= np.linspace(1, 0, fb)[:, None]
    return x


def put(bus, x, t0):
    i = int(round(t0 * SR))
    if i < 0:
        x, i = x[-i:], 0
    m = min(len(x), n - i)
    if m > 0:
        bus[i:i + m] += x[:m]


vo, sfx, hit = np.zeros((n, 2)), np.zeros((n, 2)), np.zeros((n, 2))
for v in C['vo']:
    put(vo, fade(dec(WS / 'audio/voiceover' / f"{v['file']}.mp3", v['from'], round(v['to'] - v['from'], 3))), v['at'])
for s in C['sfx']:
    f = next((WS / 'audio/sfx').glob(s['f'] + '.*'))
    x = dec(f, None, s['d'] or None)
    x = x / (np.abs(x).max() + 1e-9) * 10 ** (s['db'] / 20)
    put(sfx, fade(x, .004, .08 if s['d'] else .01), s['t'])
TXM = json.loads((ROOT / 'tx/tx.json').read_text())
for h in C['hits']:
    w = wave.open(str(ROOT / f"tx/{h['name']}.wav"))
    x = np.frombuffer(w.readframes(w.getnframes()), np.int16).reshape(-1, 2) / 32768
    put(hit, x * 10 ** (-6 / 20), h['t'] - TXM[h['name']]['peak'])
noise = sosfilt(butter(2, [60, 400], 'bandpass', fs=SR, output='sos'), np.random.default_rng(7).standard_normal(n))
room = np.repeat((.25 * noise / np.abs(noise).max() * 10 ** (-40 / 20))[:, None], 2, 1)
mix = vo + sfx + hit + room
mix /= max(1.0, np.abs(mix).max() / .95)
pre = ROOT / 'build/mix_pre.wav'


def wav16(path, x):
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())


wav16(pre, mix)
r = subprocess.run([FF, '-hide_banner', '-i', str(pre), '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
m = json.loads(r.stderr[r.stderr.rindex('{'):r.stderr.rindex('}') + 1])
ln = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
      f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
subprocess.run([FF, '-v', 'error', '-y', '-i', str(pre), '-af', ln + ',aresample=48000', '-c:a', 'pcm_s16le', str(ROOT / 'build/mix.wav')], check=True)
r = subprocess.run([FF, '-hide_banner', '-i', str(ROOT / 'build/mix.wav'), '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
o = json.loads(r.stderr[r.stderr.rindex('{'):r.stderr.rindex('}') + 1])

B = ROOT / 'build'
(B / 'chapters.json').write_text(json.dumps(C['chapters'], ensure_ascii=False))
(B / 'lines_film.json').write_text(json.dumps(C['lines'], ensure_ascii=False))
placed = sorted([{'t': s['t'], 'label': s['label']} for s in C['sfx']] + [{'t': h['t'], 'label': f"hit {h['name']}"} for h in C['hits']], key=lambda e: e['t'])
(B / 'sfx_placed.json').write_text(json.dumps(placed, ensure_ascii=False))
(B / 'cues.json').write_text(json.dumps({'dur': DUR, 'trans': C['trans'], 'keys': C['keys'], 'beats': [], 'sfx': placed}, ensure_ascii=False))
db = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)
pk = lambda x: 20 * np.log10(np.abs(x).max() + 1e-12)
print(f"mix {DUR:.1f} s · VO {len(C['vo'])} · SFX {len(C['sfx'])} · hit {len(C['hits'])}")
print(f"sebelum norm: VO RMS {db(vo):.1f} / puncak {pk(vo):.1f} · SFX RMS {db(sfx):.1f} / puncak {pk(sfx):.1f} · hit puncak {pk(hit):.1f} dBFS")
print(f"terukur: masuk I {m['input_i']} LUFS TP {m['input_tp']} → keluar I {o['input_i']} LUFS TP {o['input_tp']} dBTP · mode {o.get('normalization_type', '?')}")
