"""Rebuild the final MP4 from the master frames in minutes: the film is encoded in 30 s chunks, and only chunks
whose frames changed since the last run are re-encoded; the rest are stream-copied. Audio (build/mix_full.wav)
is loudnormed two-pass to -14 LUFS and muxed last, so an audio-only revision never touches the video.

  python -I tools/studio/splice.py <project> --out out/film_v2.mp4 [--chunk 30] [--audio build/mix_full.wav]
"""
import argparse, json, os, re, subprocess, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import project_cfg, FF, VIDEO_ARGS, frame_count


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project"); ap.add_argument("--out", required=True); ap.add_argument("--chunk", type=float, default=30)
    ap.add_argument("--audio"); ap.add_argument("--frames")
    a = ap.parse_args()
    C = project_cfg(a.project); root, fps = C["root"], C["fps"]
    fdir = os.path.join(root, a.frames) if a.frames else C["frames_abs"]
    audio = os.path.join(root, a.audio) if a.audio else C["audio_abs"]
    N = frame_count(fdir)
    if not N: sys.exit(f"no frames in {fdir}")
    if not os.path.exists(os.path.join(fdir, f"f_{N - 1:05d}.jpg")): sys.exit("frames are not contiguous from f_00000")
    cdir = os.path.join(root, "build/chunks", os.path.basename(fdir)); os.makedirs(cdir, exist_ok=True)
    man_p = os.path.join(cdir, "manifest.json")
    man = json.load(open(man_p)) if os.path.exists(man_p) else {}
    step = int(a.chunk * fps); t = time.time(); redo = 0; parts = []
    for i, f0 in enumerate(range(0, N, step)):
        f1 = min(N, f0 + step) - 1
        newest = max(os.path.getmtime(os.path.join(fdir, f"f_{f:05d}.jpg")) for f in range(f0, f1 + 1))
        name = f"c_{i:03d}.mp4"; out = os.path.join(cdir, name); key = f"{f0}-{f1}"
        if not (os.path.exists(out) and man.get(name, {}).get("range") == key and man[name]["newest"] >= newest):
            subprocess.run([FF, "-v", "error", "-y", "-framerate", str(fps), "-start_number", str(f0), "-i", os.path.join(fdir, "f_%05d.jpg"),
                            "-frames:v", str(f1 - f0 + 1)] + VIDEO_ARGS + ["-an", out], check=True)
            man[name] = {"range": key, "newest": newest}; redo += 1
            json.dump(man, open(man_p, "w"), indent=0)
            print(f"  chunk {i} ({f0 / fps:.0f}-{(f1 + 1) / fps:.0f}s) encoded", flush=True)
        parts.append(name)
    lst = os.path.join(cdir, "list.txt"); open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    vid = os.path.join(cdir, "_video.mp4")
    subprocess.run([FF, "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", vid], check=True)
    m = subprocess.run([FF, "-hide_banner", "-i", audio, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", m, re.S).group(0))
    ln = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:"
          f"measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
    out = os.path.join(root, a.out); os.makedirs(os.path.dirname(out), exist_ok=True)
    subprocess.run([FF, "-v", "error", "-y", "-i", vid, "-i", audio, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-af", ln,
                    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", "-movflags", "+faststart", out], check=True)
    print(f"{out}  ({len(parts)} chunks, {redo} re-encoded, {time.time() - t:.0f}s; audio {j['input_i']} LUFS -> -14)")


if __name__ == "__main__":
    main()
