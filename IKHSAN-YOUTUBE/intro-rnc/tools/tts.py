"""Generate the voice-over with per-character timestamps (ElevenLabs /with-timestamps).

The API key is read from the environment (ELEVENLABS_API_KEY) and never printed or written.
Load it from your own key file, e.g.:
    uvx --from "python-dotenv[cli]" dotenv -f <path>/.env.local run -- python -I tts.py ...

Usage (run from the video project folder):
    python -I tools/tts.py build/vo.txt vo_take1 --voice <voice_id> [--model eleven_v3] [--speed 1.0] [--archive <dir>]
Writes audio/voiceover/<name>.mp3 and <name>.align.json. --archive also copies both to another
folder (e.g. a workspace-wide audio library).
"""
import argparse, base64, json, os, shutil, sys, urllib.error, urllib.request

HOSTS = ["https://api.elevenlabs.io", "https://api.us.elevenlabs.io"]
ap = argparse.ArgumentParser()
ap.add_argument("text_file"); ap.add_argument("out")
ap.add_argument("--voice", required=True, help="voice id (pick it with the user first)")
ap.add_argument("--model", default="eleven_v3")
ap.add_argument("--stability", type=float, default=0.5)
ap.add_argument("--speed", type=float, default=1.0)
ap.add_argument("--format", default="mp3_44100_128", help="192 kbps needs Creator tier or above")
ap.add_argument("--archive")
a = ap.parse_args()

key = os.environ.get("ELEVENLABS_API_KEY")
if not key:
    sys.exit("ELEVENLABS_API_KEY is not set in the environment")
text = open(a.text_file, encoding="utf-8").read().strip()
body = {"text": text, "model_id": a.model, "voice_settings": {"stability": a.stability, "similarity_boost": 0.8}}
if a.model != "eleven_v3":
    body["voice_settings"].update({"style": 0.0, "use_speaker_boost": True, "speed": a.speed})

res = None
for host in HOSTS:
    req = urllib.request.Request(f"{host}/v1/text-to-speech/{a.voice}/with-timestamps?output_format={a.format}", method="POST",
                                 data=json.dumps(body).encode(), headers={"xi-api-key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            res = json.loads(r.read()); print("ok via", host); break
    except urllib.error.HTTPError as e:
        print("fail", host, e.code, e.read()[:300])
if res is None:
    sys.exit(1)
os.makedirs("audio/voiceover", exist_ok=True)
mp3 = os.path.join("audio", "voiceover", a.out + ".mp3")
open(mp3, "wb").write(base64.b64decode(res["audio_base64"]))
js = os.path.join("audio", "voiceover", a.out + ".align.json")
json.dump({"text": text, "model": a.model, "voice": a.voice, "alignment": res.get("alignment"),
           "normalized_alignment": res.get("normalized_alignment")}, open(js, "w", encoding="utf-8"), ensure_ascii=False)
if a.archive:
    os.makedirs(a.archive, exist_ok=True)
    for p in (mp3, js): shutil.copy(p, a.archive)
ends = (res.get("alignment") or {}).get("character_end_times_seconds") or [0]
print(f"wrote {mp3} ~{ends[-1]:.2f}s, {len(text)} chars")
