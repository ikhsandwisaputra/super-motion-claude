"""Silent encode (the film has no audio track by design): JPEG frames -> x264 master (+ 720p share copy).

  python -I tools/encode.py build/frames out/v15_bisu_v1.mp4 [--share]
JPEG frames are full range -> scaled to TV range explicitly; crf 19 + maxrate 30M (grain).
"""
import argparse, subprocess
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
ap = argparse.ArgumentParser()
ap.add_argument("frames"); ap.add_argument("out")
ap.add_argument("--fps", type=int, default=30); ap.add_argument("--crf", type=int, default=19)
ap.add_argument("--share", action="store_true")
a = ap.parse_args()
subprocess.run([FF, "-v", "error", "-y", "-framerate", str(a.fps), "-i", f"{a.frames}/f_%05d.jpg",
                "-vf", "scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p",
                "-c:v", "libx264", "-preset", "medium", "-crf", str(a.crf), "-maxrate", "30M", "-bufsize", "60M",
                "-profile:v", "high", "-color_range", "tv", "-colorspace", "bt709", "-color_primaries", "bt709",
                "-color_trc", "bt709", "-an", "-movflags", "+faststart", a.out], check=True)
print(a.out)
if a.share:
    share = a.out.replace(".mp4", "_share.mp4")
    subprocess.run([FF, "-v", "error", "-y", "-i", a.out, "-vf", "scale=1280:-2", "-c:v", "libx264", "-crf", "23",
                    "-preset", "medium", "-an", "-movflags", "+faststart", share], check=True)
    print(share)
