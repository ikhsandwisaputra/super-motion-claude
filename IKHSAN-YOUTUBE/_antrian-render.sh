#!/usr/bin/env bash
# Antrian render 2026-11-19: Batam -> AI Pura-Pura Patuh (berurutan, satu-satu).
A=/home/ikhsands/Proyek/super-motion-claude-ikhsan/aset; LOG=$A/_antrian-render.log
log(){ echo "$(date '+%F %T') $*" >> "$LOG"; }
jalan(){ slug=$1; gtt=$2; unit=render-$slug
  log "mulai $slug (GTT_MAX_MB=$gtt)"
  GTT_MAX_MB=$gtt sh $A/$slug/tools/render_safe.sh >> "$LOG" 2>&1
  sleep 20
  while systemctl --user is-active -q "$unit" || systemctl --user is-activating -q "$unit"; do sleep 60; done
  mp4=$(ls -t $A/$slug/out/*.mp4 2>/dev/null | head -1)
  if [ -n "$mp4" ]; then log "SELESAI $slug -> $mp4"; else log "GAGAL $slug: tidak ada mp4 (lihat $A/$slug/build/render_full.log)"; fi
}
jalan batam-swro-data-center 3500
jalan ai-pura-pura-patuh 5600
log "antrian selesai"
