"""ElevenLabs VO per take, eleven_v4 with the ElevenLabs default voice settings (no voice_settings sent), with timestamps.
  set -a; . ./.env.local; set +a; .venv/bin/python -I aset/<slug>/tools/vo_gen.py 01 03 04 …   (text: build/vo/<id>.txt)
Writes <film.json vo>.mp3 + .align.json. Skips takes that already exist (never overwrites). The key is never printed."""
import base64, json, os, sys, urllib.error, urllib.request
from pathlib import Path
PROJ = Path(__file__).resolve().parents[1]; WS = PROJ.parents[1]
F = json.loads((PROJ / 'film.json').read_text()); key = os.environ['ELEVENLABS_API_KEY']
for n in sys.argv[1:]:
    base = WS / F['vo'].format(n=n); mp3 = base.with_suffix('.mp3')
    if mp3.exists(): print(n, 'exists, skip'); continue
    text = (PROJ / 'build/vo' / f'{n}.txt').read_text(encoding='utf-8').strip()
    body = {'text': text, 'model_id': F['voice']['model']}
    req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{F['voice']['id']}/with-timestamps?output_format=mp3_44100_128",
                                 method='POST', data=json.dumps(body).encode(), headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=900) as r: res = json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(n, 'HTTP', e.code, e.read()[:300]); sys.exit(1)
    mp3.parent.mkdir(parents=True, exist_ok=True); mp3.write_bytes(base64.b64decode(res['audio_base64']))
    al = {'text': text, 'model': body['model_id'], 'voice': F['voice']['id'], 'alignment': res.get('alignment'), 'normalized_alignment': res.get('normalized_alignment')}
    base.with_suffix('.align.json').write_text(json.dumps(al, ensure_ascii=False))
    ends = (res.get('alignment') or {}).get('character_end_times_seconds') or [0]
    print(n, 'ok', f'{ends[-1]:.2f}s', mp3.name, flush=True)
