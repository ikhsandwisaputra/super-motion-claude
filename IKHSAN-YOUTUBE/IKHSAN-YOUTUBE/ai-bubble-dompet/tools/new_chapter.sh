#!/bin/sh
# New kit chapter from the skeleton: sh tools/new_chapter.sh bab-1   (run in the project folder; never overwrites)
# Then: add {"dir": "bab-1"} to film.json in film order · write src/beats.js (words: python -I tools/words.py <VO>) + src/film.js
#       · mix: python -I tools/mix_chapter.py bab-1 · Studio: .venv/bin/python -I tools/studio/studio.py aset/<slug>/bab-1 --port 87xx
set -e; d="$1"; [ -n "$d" ] || { echo "usage: sh tools/new_chapter.sh <dir>"; exit 1; }; [ -e "$d" ] && { echo "exists: $d"; exit 1; }
cp -r _chapter "$d"; mkdir -p "$d/build"
ln -s ../../tx/txlib.js "$d/src/txlib.js"; ln -s ../../kit/kit.js "$d/src/kit.js"; ln -s ../../kit/draw.js "$d/src/draw.js"; ln -s ../../kit/portal.js "$d/src/portal.js"; ln -s ../../kit/gelembung.js "$d/src/gelembung.js"
ln -s ../../tx "$d/assets/txlib"; ln -s ../../assets "$d/assets/shared"
PY="$(cd ../.. && pwd)/.venv/bin/python"; "$PY" -I tools/film.py sync >/dev/null 2>&1 || true
echo "ok: $d  (film.json → add it in order, then: python -I tools/film.py sync)"
