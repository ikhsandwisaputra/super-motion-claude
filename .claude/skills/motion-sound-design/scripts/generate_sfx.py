"""Generate the SFX library with ElevenLabs sound-generation (costs credits: confirm with the user first).

Run from the video project folder, with your own key in the environment:
    uvx --from "python-dotenv[cli]" dotenv -f <path>/.env.local run -- \
        python -I tools/generate_sfx.py <skills>/motion-sound-design/references/sfx-prompts.json [--only a,b] [--force] [--archive <dir>]
Writes audio/sfx/<name>.mp3 and skips files that already exist (so a shared library can be reused).
"""
import argparse, json, os, shutil, sys, urllib.error, urllib.request

ap = argparse.ArgumentParser()
ap.add_argument("prompts"); ap.add_argument("--only"); ap.add_argument("--force", action="store_true"); ap.add_argument("--archive")
a = ap.parse_args()
key = os.environ.get("ELEVENLABS_API_KEY")
if not key:
    sys.exit("ELEVENLABS_API_KEY is not set in the environment")
P = {k: v for k, v in json.load(open(a.prompts, encoding="utf-8")).items() if not k.startswith("_")}
only = set(a.only.split(",")) if a.only else None
os.makedirs("audio/sfx", exist_ok=True)
for name, spec in P.items():
    if only and name not in only: continue
    out = os.path.join("audio", "sfx", name + ".mp3")
    if os.path.exists(out) and not a.force:
        print("skip", name); continue
    body = {"text": spec["text"], "duration_seconds": max(0.5, min(5.0, spec.get("dur", 1.0))), "prompt_influence": 0.4}
    req = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", method="POST",
                                 data=json.dumps(body).encode(), headers={"xi-api-key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            open(out, "wb").write(r.read())
        print("ok  ", name)
        if a.archive:
            os.makedirs(a.archive, exist_ok=True); shutil.copy(out, a.archive)
    except urllib.error.HTTPError as e:
        print("FAIL", name, e.code, e.read()[:200])
