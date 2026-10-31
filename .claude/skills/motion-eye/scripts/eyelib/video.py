"""Reading pictures and sound: videos (any ffmpeg format), rendered frame folders (f_00000.jpg|png) and stills.

Everything is decoded with the ffmpeg bundled in imageio-ffmpeg (no PATH needed). Frames come back as RGB uint8.
"""
import os
import re
import subprocess

import cv2
import numpy as np
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
VIDEO_EXT = ('.mp4', '.mov', '.m4v', '.webm', '.mkv', '.avi', '.mpg', '.mpeg', '.wmv')
IMG_EXT = ('.png', '.jpg', '.jpeg', '.webp', '.bmp')


def kind_of(path):
    if os.path.isdir(path):
        return 'frames'
    ext = os.path.splitext(path)[1].lower()
    if ext in VIDEO_EXT:
        return 'video'
    if ext in IMG_EXT:
        return 'image'
    raise ValueError(f'unknown input: {path}')


def _frame_files(folder):
    names = sorted(n for n in os.listdir(folder) if n.lower().endswith(IMG_EXT))
    if not names:
        raise ValueError(f'no frames in {folder}')
    return [os.path.join(folder, n) for n in names]


def probe(path, src_fps=30.0):
    """{w, h, fps, duration, audio} of a video, a frames folder (src_fps) or an image."""
    k = kind_of(path)
    if k == 'image':
        im = cv2.imread(path, cv2.IMREAD_COLOR)
        return {'kind': k, 'w': im.shape[1], 'h': im.shape[0], 'fps': 0, 'duration': 0, 'audio': False}
    if k == 'frames':
        files = _frame_files(path)
        im = cv2.imread(files[0], cv2.IMREAD_COLOR)
        return {'kind': k, 'w': im.shape[1], 'h': im.shape[0], 'fps': src_fps,
                'duration': len(files) / src_fps, 'audio': False, 'files': files}
    err = subprocess.run([FFMPEG, '-hide_banner', '-i', path], capture_output=True, text=True,
                         errors='replace').stderr
    m = re.search(r'Video:.*?(\d{2,5})x(\d{2,5})', err)
    if not m:
        raise ValueError(f'no video stream in {path}')
    w, h = int(m.group(1)), int(m.group(2))
    rot = re.search(r'rotation of (-?\d+(?:\.\d+)?)', err)
    if rot and abs(round(float(rot.group(1)))) % 180 == 90:
        w, h = h, w  # ffmpeg autorotates while decoding
    fm = re.search(r'(\d+(?:\.\d+)?) fps', err)
    dm = re.search(r'Duration: (\d+):(\d+):(\d+(?:\.\d+)?)', err)
    dur = int(dm.group(1)) * 3600 + int(dm.group(2)) * 60 + float(dm.group(3)) if dm else 0.0
    return {'kind': k, 'w': w, 'h': h, 'fps': float(fm.group(1)) if fm else 30.0, 'duration': dur,
            'audio': bool(re.search(r'Stream #.*Audio:', err))}


def fit_size(w, h, long_side):
    """Even-sized (w, h) whose long side is long_side (never upscaled)."""
    if not long_side or max(w, h) <= long_side:
        return w - w % 2, h - h % 2
    s = long_side / max(w, h)
    return max(2, int(round(w * s / 2)) * 2), max(2, int(round(h * s / 2)) * 2)


def parse_crop(crop):
    """'x0,y0,x1,y1' (pixels of the source, as in motion-reference-breakdown) -> (x, y, w, h) or None."""
    if not crop:
        return None
    if isinstance(crop, str):
        crop = [int(float(v)) for v in crop.split(',')]
    x0, y0, x1, y1 = crop
    return x0, y0, x1 - x0, y1 - y0


def _cut(im, crop):
    if not crop:
        return im
    x, y, w, h = crop
    return im[y:y + h, x:x + w]


def iter_frames(path, fps=10.0, long_side=360, start=0.0, duration=None, src_fps=30.0, crop=None):
    """Yield (t_seconds, rgb) sampled at `fps`, scaled so the long side is `long_side` (None = full size).
    crop = (x, y, w, h) of the real canvas when the motion graphic was filmed on a screen."""
    info = probe(path, src_fps)
    k = info['kind']
    if k == 'image':
        im = _cut(cv2.cvtColor(cv2.imread(path, cv2.IMREAD_COLOR), cv2.COLOR_BGR2RGB), crop)
        w, h = fit_size(im.shape[1], im.shape[0], long_side)
        yield 0.0, cv2.resize(im, (w, h), interpolation=cv2.INTER_AREA)
        return
    end = info['duration'] if duration is None else min(info['duration'], start + duration)
    if k == 'frames':
        files = info['files']
        t = start
        while t < end - 1e-6:
            i = min(len(files) - 1, int(round(t * src_fps)))
            im = _cut(cv2.cvtColor(cv2.imread(files[i], cv2.IMREAD_COLOR), cv2.COLOR_BGR2RGB), crop)
            w, h = fit_size(im.shape[1], im.shape[0], long_side)
            yield t, cv2.resize(im, (w, h), interpolation=cv2.INTER_AREA) if (w, h) != im.shape[1::-1] else im
            t += 1.0 / fps
        return
    cw, ch = (crop[2], crop[3]) if crop else (info['w'], info['h'])
    w, h = fit_size(cw, ch, long_side)
    cmd = [FFMPEG, '-hide_banner', '-loglevel', 'error']
    if start > 0:
        cmd += ['-ss', f'{start:.3f}']
    cmd += ['-i', path]
    if duration is not None:
        cmd += ['-t', f'{end - start:.3f}']
    vf = f'fps={fps},' + (f'crop={crop[2]}:{crop[3]}:{crop[0]}:{crop[1]},' if crop else '') + f'scale={w}:{h}:flags=area'
    cmd += ['-an', '-vf', vf, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    size = w * h * 3
    i = 0
    try:
        while True:
            buf = proc.stdout.read(size)
            if len(buf) < size:
                break
            yield start + i / fps, np.frombuffer(buf, np.uint8).reshape(h, w, 3)
            i += 1
    finally:
        proc.stdout.close()
        proc.wait()


def frame_at(path, t, long_side=None, src_fps=30.0, crop=None):
    """One frame (RGB) at time t; full size unless long_side is given."""
    info = probe(path, src_fps)
    if info['kind'] == 'image':
        return next(iter_frames(path, long_side=long_side, crop=crop))[1]
    if info['kind'] == 'frames':
        files = info['files']
        im = _cut(cv2.cvtColor(cv2.imread(files[min(len(files) - 1, int(round(t * src_fps)))], cv2.IMREAD_COLOR),
                               cv2.COLOR_BGR2RGB), crop)
        w, h = fit_size(im.shape[1], im.shape[0], long_side)
        return cv2.resize(im, (w, h), interpolation=cv2.INTER_AREA) if (w, h) != im.shape[1::-1] else im
    cw, ch = (crop[2], crop[3]) if crop else (info['w'], info['h'])
    w, h = fit_size(cw, ch, long_side)
    t = max(0.0, min(t, info['duration'] - 0.5 / max(info['fps'], 1)))
    vf = (f'crop={crop[2]}:{crop[3]}:{crop[0]}:{crop[1]},' if crop else '') + f'scale={w}:{h}:flags=area'
    cmd = [FFMPEG, '-hide_banner', '-loglevel', 'error', '-ss', f'{t:.3f}', '-i', path, '-frames:v', '1',
           '-an', '-vf', vf, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    buf = subprocess.run(cmd, capture_output=True).stdout
    if len(buf) < w * h * 3:
        raise ValueError(f'no frame at {t:.2f}s in {path}')
    return np.frombuffer(buf[:w * h * 3], np.uint8).reshape(h, w, 3)


def detect_bars(path, samples=12, thr=18, src_fps=30.0):
    """Letterbox/pillarbox bars that stay black in every sampled frame -> 'x0,y0,x1,y1' or None."""
    info = probe(path, src_fps)
    if info['kind'] == 'image':
        return None
    dur = info['duration']
    rows = cols = None
    for k in range(samples):
        im = frame_at(path, dur * (k + 0.5) / samples, long_side=None, src_fps=src_fps)
        g = cv2.cvtColor(im, cv2.COLOR_RGB2GRAY).astype(np.float32)
        r, c = g.mean(axis=1), g.mean(axis=0)
        rows = r if rows is None else np.maximum(rows, r)
        cols = c if cols is None else np.maximum(cols, c)
    h, w = len(rows), len(cols)
    live_r = np.nonzero(rows > thr)[0]
    live_c = np.nonzero(cols > thr)[0]
    if not len(live_r) or not len(live_c):
        return None
    y0, y1, x0, x1 = int(live_r[0]), int(live_r[-1]) + 1, int(live_c[0]), int(live_c[-1]) + 1
    if y0 < 0.02 * h and h - y1 < 0.02 * h and x0 < 0.02 * w and w - x1 < 0.02 * w:
        return None
    # keep even sizes for ffmpeg
    return f'{x0},{y0},{x0 + ((x1 - x0) // 2) * 2},{y0 + ((y1 - y0) // 2) * 2}'


def audio(path, sr=22050):
    """Mono float32 samples in [-1, 1] (empty when there is no audio track)."""
    if kind_of(path) != 'video':
        return np.zeros(0, np.float32), sr
    cmd = [FFMPEG, '-hide_banner', '-loglevel', 'error', '-i', path, '-vn', '-ac', '1', '-ar', str(sr),
           '-f', 's16le', '-']
    raw = subprocess.run(cmd, capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0, sr
