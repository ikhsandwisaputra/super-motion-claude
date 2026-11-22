#!/usr/bin/env bash
# Full render (render_full.py) as its own systemd user service, outside VS Code's cgroup.
# Why: on 2026-11-14 systemd-oomd killed the whole VS Code scope (render included) twice at RAM+swap > 90 %.
# As a separate unit: VS Code no longer dies with it, the unit is capped (MemoryMax), and it restarts itself
# after a crash — render_full.py resumes from the frames already on disk.
#
#   sh aset/<slug>/tools/render_safe.sh          # start (from anywhere)
#   systemctl --user status render-<slug>                         # state
#   tail -f aset/<slug>/build/render_full.status  # progress
#   systemctl --user stop render-<slug>                           # stop (frames are kept; start again to resume)
set -euo pipefail
P="$(cd "$(dirname "$0")/.." && pwd)"; WS="$(cd "$P/../.." && pwd)"
UNIT="render-$(basename "$P" | tr -c "a-z0-9\n" "-")"   # one unit per film, e.g. render-video-ai-sawah

if [[ "${1:-}" == "--inner" ]]; then          # runs inside the unit
  cd "$WS"
  for i in 1 2 3 4 5; do
    nice -n 5 .venv/bin/python -I "$P/tools/render_full.py" >> "$P/build/render_full.log" 2>&1 && break
    echo "$(date +%T) render_full try $i failed, retrying in 30 s" >> "$P/build/render_full.status"; sleep 30
  done
  # The portal is baked into the frames from the start (src/portal.json via `tools/film.py sync`), so no portal_finish pass.
  # Only for a film rendered without portals: run tools/portal_finish.py by hand.
  exit 0
fi

systemctl --user reset-failed "$UNIT" 2>/dev/null || true
systemd-run --user --unit="$UNIT" --description="Render $(basename "$P")" \
  --working-directory="$WS" \
  --setenv=BATCH="${BATCH:-150}" --setenv=WORKERS="${WORKERS:-2}" --setenv=GTT_MAX_MB="${GTT_MAX_MB:-3500}" \
  -p MemoryMax="${MEMMAX:-9G}" -p OOMPolicy=continue \
  -p Restart=on-failure -p RestartSec=30 -p StartLimitIntervalSec=3h -p StartLimitBurst=6 \
  systemd-inhibit --what=sleep:idle:handle-lid-switch --why="video render" \
  bash "$P/tools/render_safe.sh" --inner
echo "started: systemctl --user status "$UNIT" · progress: $P/build/render_full.status"
