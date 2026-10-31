"""Scaffold a new video project from the engine template + the sibling skills' tools.

python -I <skills>/motion-video-engine/scripts/new_video.py aset/video-3 [--sfx-from <dir with *.mp3>] [--no-install]

Creates:
  <dest>/src/        engine (main.js, lib/*, demo timeline.js) + npm deps (three, @fontsource fonts)
  <dest>/tools/      render, checks, VO (tts/words/vo_edit), sound (mix/generate_sfx/measure_levels/encode), QA (strip/sheet/overview)
  <dest>/build/      words_edit.json = 21 demo words, so `python -I tools/render.py --frames 30,150` works at once
  <dest>/audio/      sfx/ (copied from --sfx-from when given, otherwise generate them) + voiceover/
  <dest>/out/
"""
import argparse, os, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SKILLS = os.path.abspath(os.path.join(HERE, "..", ".."))
ap = argparse.ArgumentParser(); ap.add_argument("dest"); ap.add_argument("--sfx-from"); ap.add_argument("--no-install", action="store_true")
a = ap.parse_args()
dest = os.path.abspath(a.dest)
if os.path.exists(dest) and os.listdir(dest):
    sys.exit(f"{dest} exists and is not empty — pick a new folder")
shutil.copytree(os.path.join(SKILLS, "motion-video-engine", "assets", "template"), dest, dirs_exist_ok=True)
tools = os.path.join(dest, "tools")
for skill, files in {
    "motion-vo-pipeline": ["tts.py", "words.py", "vo_edit.py"],
    "motion-sound-design": ["mix.py", "generate_sfx.py", "measure_levels.py", "encode.py"],
    "motion-qa-review": ["strip.py", "sheet.py", "overview.py"],
}.items():
    for f in files:
        shutil.copy(os.path.join(SKILLS, skill, "scripts", f), tools)
for d in ("audio/sfx", "audio/voiceover", "build", "out"):
    os.makedirs(os.path.join(dest, d), exist_ok=True)
if a.sfx_from:
    n = 0
    for f in os.listdir(a.sfx_from):
        if f.endswith(".mp3"): shutil.copy(os.path.join(a.sfx_from, f), os.path.join(dest, "audio", "sfx")); n += 1
    print(f"copied {n} SFX")
if not a.no_install:
    subprocess.run("npm install --no-audit --no-fund", cwd=os.path.join(dest, "src"), shell=True, check=True)
print(f"ready: {dest}\nnext: cd {a.dest} && python -I tools/render.py --frames 30,150,240 --out build/stills")
