#!/bin/sh
# Scaffold a chapter folder on the kit: sh tools/new_chapter.sh bab-1   (run from the project folder; never overwrites)
set -e; d="$1"; [ -e "$d" ] && { echo "exists: $d"; exit 1; }
mkdir -p "$d/src" "$d/tools" "$d/assets" "$d/build"
cp -r bab-peta/fonts "$d/fonts"; cp bab-peta/src/engine.js bab-peta/src/index.html "$d/src/"; cp bab-peta/tools/render.py bab-peta/tools/encode.py "$d/tools/"; cp bab-peta/studio.json "$d/"
ln -s ../../tx/txlib.js "$d/src/txlib.js"; ln -s ../../kit/kit.js "$d/src/kit.js"
ln -s ../../tx "$d/assets/txlib"; ln -s ../../assets "$d/assets/shared"
echo "ok: $d  (write src/beats.js + src/film.js; mix: python -I tools/mix_chapter.py $d)"

ln -s ../../kit/draw.js "$d/src/draw.js"
