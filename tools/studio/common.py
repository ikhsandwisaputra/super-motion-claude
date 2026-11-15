"""Shared helpers for the super-motion studio tools (stdlib only + system ffmpeg)."""
import json, os, shutil

WS = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VENV_PY = os.path.join(WS, ".venv/bin/python")
FF = shutil.which("ffmpeg") or "ffmpeg"


def project_cfg(proj):
    """Project contract: src/index.html (window.preview/render/NFRAMES), tools/render.py, build/mix_full.wav.
    Optional <proj>/studio.json overrides {"frames": "build/frames_v2", "audio": "build/mix_full.wav", "fps": 30}."""
    proj = os.path.abspath(proj)
    cfg = {"fps": 30, "audio": "build/mix_full.wav", "frames": None}
    p = os.path.join(proj, "studio.json")
    if os.path.exists(p):
        cfg.update(json.load(open(p)))
    if not cfg["frames"]:
        cands = [d for d in os.listdir(os.path.join(proj, "build")) if d.startswith("frames") and os.path.isdir(os.path.join(proj, "build", d))] if os.path.isdir(os.path.join(proj, "build")) else []
        cands.sort(key=lambda d: os.path.getmtime(os.path.join(proj, "build", d)), reverse=True)
        cfg["frames"] = "build/" + (cands[0] if cands else "frames")
    cfg["root"] = proj
    cfg["frames_abs"] = os.path.join(proj, cfg["frames"])
    cfg["audio_abs"] = os.path.join(proj, cfg["audio"])
    return cfg


def frame_count(frames_dir):
    if not os.path.isdir(frames_dir):
        return 0
    return sum(1 for f in os.listdir(frames_dir) if f.startswith("f_") and f.endswith(".jpg"))


VIDEO_ARGS = ["-vf", "scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p", "-c:v", "libx264", "-preset", "medium",
              "-crf", "19", "-maxrate", "30M", "-bufsize", "60M", "-profile:v", "high", "-color_range", "tv", "-colorspace", "bt709",
              "-color_primaries", "bt709", "-color_trc", "bt709"]
