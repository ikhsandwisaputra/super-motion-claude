"""Final encode: two-pass loudnorm (linear, -14 LUFS / -1.5 dBTP) + x264 master + 720p share copy.

python -I tools/encode.py build/frames build/mix_full.wav out/film.mp4 [--fps 30] [--share]
JPEG frames are full range -> scaled to TV range explicitly (otherwise blacks lift / clip).
crf 19 + maxrate 30M: grain makes the bitrate explode at lower crf.
"""
import argparse, json, re, subprocess
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
ap = argparse.ArgumentParser(); ap.add_argument("frames"); ap.add_argument("audio"); ap.add_argument("out")
ap.add_argument("--fps", type=int, default=30); ap.add_argument("--share", action="store_true"); ap.add_argument("--crf", type=int, default=19)
a = ap.parse_args()
m = subprocess.run([FF, "-hide_banner", "-i", a.audio, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                   capture_output=True, text=True).stderr
j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", m, re.S).group(0))
ln = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:"
      f"measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
subprocess.run([FF, "-v", "error", "-y", "-framerate", str(a.fps), "-i", f"{a.frames}/f_%05d.jpg", "-i", a.audio, "-map", "0:v", "-map", "1:a",
                "-vf", "scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p", "-c:v", "libx264", "-preset", "medium",
                "-crf", str(a.crf), "-maxrate", "30M", "-bufsize", "60M", "-profile:v", "high", "-color_range", "tv", "-colorspace", "bt709",
                "-color_primaries", "bt709", "-color_trc", "bt709", "-af", ln, "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
                "-shortest", "-movflags", "+faststart", a.out], check=True)
print(f"{a.out}  (input {j['input_i']} LUFS -> -14)")
if a.share:
    share = a.out.replace(".mp4", "_share.mp4")
    subprocess.run([FF, "-v", "error", "-y", "-i", a.out, "-vf", "scale='if(gt(iw,ih),1280,720)':-2", "-c:v", "libx264", "-crf", "24", "-preset", "medium",
                    "-c:a", "copy", "-movflags", "+faststart", share], check=True)
    print(share)
