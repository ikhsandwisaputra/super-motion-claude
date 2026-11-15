"""Render ONLY a slice of a film at final quality and make a before/after preview clip.

  python -I tools/studio/patch.py <project> --t0 330 --t1 338            # -> build/patch/<id>/{frames,clip.mp4,compare.mp4}
  python -I tools/studio/patch.py <project> --t0 330 --t1 338 --draft    # K=1, ~8x faster, for a quick look only
  python -I tools/studio/patch.py <project> --apply <id>                 # copy the patch frames into the master frames dir
                                                                          # (old frames are kept in build/patch/<id>/old, never deleted)
Then rebuild the film in minutes with tools/studio/splice.py (only the touched chunks re-encode).
"""
import argparse, json, os, shutil, subprocess, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import project_cfg, VENV_PY, FF, VIDEO_ARGS


def make_clip(frames_dir, start_frame, n, audio, t0, fps, out, label=None):
    vf = VIDEO_ARGS[1]
    if label:
        vf = f"drawtext=text='{label}':x=24:y=24:fontsize=36:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=10," + vf
    args = [FF, "-v", "error", "-y", "-framerate", str(fps), "-start_number", str(start_frame), "-i", os.path.join(frames_dir, "f_%05d.jpg"),
            "-ss", f"{t0:.3f}", "-t", f"{n / fps:.3f}", "-i", audio, "-map", "0:v", "-map", "1:a?", "-frames:v", str(n),
            "-vf", vf] + VIDEO_ARGS[2:] + ["-preset", "veryfast", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out]
    subprocess.run(args, check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project"); ap.add_argument("--t0", type=float); ap.add_argument("--t1", type=float)
    ap.add_argument("--draft", action="store_true"); ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--note", default=""); ap.add_argument("--apply")
    a = ap.parse_args()
    C = project_cfg(a.project); fps = C["fps"]; root = C["root"]

    if a.apply:
        d = os.path.join(root, "build/patch", a.apply)
        meta = json.load(open(os.path.join(d, "patch.json")))
        if meta.get("draft"):
            sys.exit("draft patch (K=1) is preview only; render it again without --draft before applying")
        os.makedirs(os.path.join(d, "old"), exist_ok=True)
        n = 0
        for f in range(meta["f0"], meta["f1"] + 1):
            name = f"f_{f:05d}.jpg"; src = os.path.join(d, "frames", name); dst = os.path.join(C["frames_abs"], name)
            if not os.path.exists(src): continue
            if os.path.exists(dst) and not os.path.exists(os.path.join(d, "old", name)):
                shutil.copy2(dst, os.path.join(d, "old", name))      # backup, never delete
            shutil.copy2(src, dst); os.utime(dst); n += 1
        meta["applied"] = time.strftime("%Y-%m-%d %H:%M:%S"); json.dump(meta, open(os.path.join(d, "patch.json"), "w"), indent=1)
        print(f"applied {n} frames -> {C['frames_abs']} (backup: {d}/old). Next: splice.py {a.project}")
        return

    f0, f1 = int(round(a.t0 * fps)), int(round(a.t1 * fps)) - 1
    pid = time.strftime("%m%d_%H%M%S") + f"_{a.t0:.0f}s" + ("_draft" if a.draft else "")
    d = os.path.join(root, "build/patch", pid); fr = os.path.join(d, "frames"); os.makedirs(fr)
    meta = {"id": pid, "t0": a.t0, "t1": a.t1, "f0": f0, "f1": f1, "draft": a.draft, "note": a.note, "status": "rendering",
            "started": time.strftime("%Y-%m-%d %H:%M:%S")}
    json.dump(meta, open(os.path.join(d, "patch.json"), "w"), indent=1)
    print("PATCH", pid, flush=True)
    cmd = [VENV_PY, "-I", os.path.join(root, "tools/render.py"), "--out", fr, "--range", f"{f0}-{f1}", "--workers", str(a.workers)]
    if a.draft: cmd += ["--k", "1"]
    t = time.time()
    r = subprocess.run(cmd, cwd=root)
    if r.returncode:
        meta["status"] = "error"; json.dump(meta, open(os.path.join(d, "patch.json"), "w"), indent=1); sys.exit(r.returncode)
    n = f1 - f0 + 1
    make_clip(fr, f0, n, C["audio_abs"], a.t0, fps, os.path.join(d, "clip.mp4"))
    have_old = all(os.path.exists(os.path.join(C["frames_abs"], f"f_{f:05d}.jpg")) for f in (f0, f1))
    if have_old:   # side by side: left = current master frames, right = this patch
        make_clip(C["frames_abs"], f0, n, C["audio_abs"], a.t0, fps, os.path.join(d, "_old.mp4"), "SEBELUM")
        make_clip(fr, f0, n, C["audio_abs"], a.t0, fps, os.path.join(d, "_new.mp4"), "SESUDAH" + (" (draft)" if a.draft else ""))
        subprocess.run([FF, "-v", "error", "-y", "-i", os.path.join(d, "_old.mp4"), "-i", os.path.join(d, "_new.mp4"),
                        "-filter_complex", "[0:v]scale=960:-2[a];[1:v]scale=960:-2[b];[a][b]hstack", "-map", "1:a?", "-c:v", "libx264",
                        "-preset", "veryfast", "-crf", "20", "-c:a", "copy", "-movflags", "+faststart", os.path.join(d, "compare.mp4")], check=True)
        for x in ("_old.mp4", "_new.mp4"): os.remove(os.path.join(d, x))   # our own temp encodes from this run
    meta.update(status="done", secs=round(time.time() - t, 1), compare=have_old)
    json.dump(meta, open(os.path.join(d, "patch.json"), "w"), indent=1)
    print(f"done in {meta['secs']}s -> {d}/clip.mp4" + (f" + compare.mp4" if have_old else ""))


if __name__ == "__main__":
    main()
