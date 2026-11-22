#!/bin/sh
# Start a new long-form film from this template:  sh aset/_template-longform/new_film.sh <slug> [vo-prefix]
#   e.g. sh aset/_template-longform/new_film.sh ai-di-sawah ads      → aset/ai-di-sawah, VO files audio/voiceover/ads_vo_ahmad_NN.mp3
# Copies kit, tx hit library, tools, intro (RNC "Satu Baris"), chapter skeleton, examples and the calm bed, then snapshots aset/_pustaka into kit/pustaka. Never overwrites.
set -e; T="$(cd "$(dirname "$0")" && pwd)"; A="$(dirname "$T")"; s="$1"; p="${2:-xxx}"
[ -n "$s" ] || { echo "usage: sh new_film.sh <slug> [vo-prefix]"; exit 1; }; D="$A/$s"; [ -e "$D" ] && { echo "exists: $D"; exit 1; }
rsync -a --exclude new_film.sh --exclude build --exclude out --exclude __pycache__ "$T/" "$D/"
mkdir -p "$D/build" "$D/out" "$D/assets/kutipan" "$D/assets/grafik" "$D/assets/foto"
sed -i "s#\"slug\": \"_template-longform\"#\"slug\": \"$s\"#; s#\"out\": \"judul-singkat\"#\"out\": \"$s\"#; s#xxx_vo_ahmad#${p}_vo_ahmad#" "$D/film.json"
sed -i "s#<slug>#$s#g" "$D/STATE.md"
"$(dirname "$A")/.venv/bin/python" -I "$A/_pustaka/tools/pustaka.py" pakai "$s" || echo "⚠ pustaka belum tersalin: .venv/bin/python -I aset/_pustaka/tools/pustaka.py pakai $s"
echo "ok: $D"; echo "next: README.md (alur) · NARASI.md dari Ahri · G0: aset/_pustaka/INDEX.md + pustaka.py segar --film $s · film.json (chapters) · STATE.md"
