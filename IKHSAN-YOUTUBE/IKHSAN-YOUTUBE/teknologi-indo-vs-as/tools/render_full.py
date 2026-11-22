"""Full render of the whole film, safe to stop and restart (it resumes): frames → chapter mixes → encode → one MP4 + captions.

  setsid nohup nice -n 5 .venv/bin/python -I aset/teknologi-indo-vs-as/tools/render_full.py > …/build/render_full.log 2>&1 &
  (re-run the same command after a crash/reboot: finished frames, mixes and encodes are kept, only what is missing is redone)

Lane A renders frames per chapter into <ch>/build/full/ in batches (a fresh Chrome per batch, 3 tries per batch; a frame counts
as done only if its JPEG is complete). Lane B re-mixes chapters whose beats.js is newer than their mix.wav, one at a time.
Then: video-only encode per chapter → concat → audio concat padded to each chapter's exact frame count → two-pass loudnorm
(−14 LUFS, −1.5 dBTP) → mux to out/indo-vs-as_v1.mp4 → captions (build/captions_full.srt). Progress in build/render_full.status."""
import fcntl, json, os, subprocess, sys, threading, time
from pathlib import Path
import imageio_ffmpeg

P = Path(__file__).resolve().parents[1]; WS = P.parents[1]; PY = str(WS / '.venv/bin/python'); FF = imageio_ffmpeg.get_ffmpeg_exe()
CH = ['intro', 'bab-peta', 'bab-1', 'bab-2', 'bab-3', 'puncak', 'penutup']
WAV = {'intro': 'build/mix_full.wav'}
DUR = {'intro': 36.2, 'bab-peta': 40.72}
REMIX = ['bab-1', 'bab-2', 'bab-3', 'puncak', 'penutup']
OUT = P / ('out/_test.mp4' if os.environ.get('TESTN') else 'out/indo-vs-as_v1.mp4'); STATUS = P / 'build/render_full.status'
BATCH = int(os.environ.get('BATCH', 450)); WORKERS = os.environ.get('WORKERS', '3')   # smaller = less RAM per fresh Chrome

def log(*a):
    s = time.strftime('%H:%M:%S ') + ' '.join(map(str, a)); print(s, flush=True)
    with open(STATUS, 'a') as f: f.write(s + '\n')

def dur(ch):
    if ch in DUR: return DUR[ch]
    s = (P / ch / 'src/beats.js').read_text(); B = json.loads(s[s.index('{'):s.rindex('}') + 1]); return B['END'] + B['VOFF'] + B['TAIL']
TEST = int(os.environ.get('TESTN', 0))                        # TESTN=60: dry run on the first 60 frames of each chapter, no remix
def nframes(ch): return TEST or round(dur(ch) * 30)
def ok(f):
    try:
        if f.stat().st_size < 2000: return False
        with open(f, 'rb') as h: h.seek(-2, 2); return h.read(2) == b'\xff\xd9'
    except OSError: return False
def missing(ch):
    d = P / ch / 'build/full'; return [i for i in range(nframes(ch)) if not ok(d / f'f_{i:05d}.jpg')]

GTT = Path('/sys/class/drm/card1/device/mem_info_gtt_used'); GTT_MAX = int(os.environ.get('GTT_MAX_MB', 3500)) << 20; CPU_RUN = 30
def gtt():
    try: return int(GTT.read_text())
    except (OSError, ValueError): return 0

def kill_render_chrome():
    """Headless Chrome calls setsid and moves to its own scope, so killpg on render.py misses it (seen 2026-11-14: the orphan's GPU
    process kept 6.9 GB). Kill every Playwright Chrome (only render.py starts them; runs are sequential, so none is a CPU run)."""
    for d in Path('/proc').iterdir():
        try:
            if d.name.isdigit() and b'playwright_chromiumdev_profile' in (d / 'cmdline').read_bytes(): os.killpg(os.getpgid(int(d.name)), 9)
        except (OSError, ProcessLookupError): pass
    time.sleep(2)

def render(ch, frames, cpu):
    """One render.py run. GPU watchdog (2026-11-14): some frames (bab-2 ~2076-2098, the 5.427-dot field under motion blur) make
    Chrome's GPU process fill all GTT (~7 GB of system RAM on this APU) → the desktop swaps and systemd-oomd kills everything.
    Over GTT_MAX the run is killed (whole process group) and reported as a spike; the caller renders the next frames on CPU."""
    env = dict(os.environ, CHROME_EXTRA='--disable-gpu' if cpu else os.environ.get('CHROME_EXTRA', ''))
    p = subprocess.Popen([PY, '-I', 'tools/render.py', '--scene', 'a', '--frames', ','.join(map(str, frames)), '--out', 'build/full',
                          '--workers', WORKERS], cwd=P / ch, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, start_new_session=True)
    out = []; threading.Thread(target=lambda: out.extend(p.stdout), daemon=True).start(); spike = False
    while p.poll() is None:
        if not cpu and gtt() > GTT_MAX:
            spike = True; os.killpg(p.pid, 9); p.wait(); kill_render_chrome(); break
        time.sleep(.5)
    time.sleep(.5); return p.returncode, spike, ''.join(out)

def lane_frames(res):
    for ch in CH:
        miss = missing(ch); log(f'[frames] {ch}: {nframes(ch)} frames, {len(miss)} to render')
        for b in range(0, len(miss), BATCH):
            part, cpu_until, fails = miss[b:b + BATCH], -1, 0
            while part and fails < 3:
                cpu = part[0] <= cpu_until; chunk = [i for i in part if i <= cpu_until] if cpu else part
                rc, spike, out = render(ch, chunk, cpu)
                left = [i for i in part if not ok(P / ch / f'build/full/f_{i:05d}.jpg')]
                if spike:
                    cpu_until = left[0] + CPU_RUN - 1 if left else -1
                    log(f'[frames] {ch}: GPU memory spike at frame {left[0] if left else "?"} → frames up to {cpu_until} on CPU'); time.sleep(3)
                elif len(left) == len(part):
                    fails += 1; log(f'[frames] {ch} batch {b}: no progress, try {fails} ({"cpu" if cpu else "gpu"}, rc {rc}): {out[-300:]}'); time.sleep(5)
                if rc and 'PAGE ERRORS' in out: log(f'[frames] {ch} page errors: {out[-500:]}')
                part = left
            log(f'[frames] {ch}: {min(b + BATCH, len(miss))}/{len(miss)}')
    res['frames'] = all(not missing(ch) for ch in CH)

def lane_mix(res):
    good = True
    for ch in REMIX:
        w, b = P / ch / 'build/mix.wav', P / ch / 'src/beats.js'
        if w.exists() and w.stat().st_mtime > b.stat().st_mtime: log(f'[mix] {ch}: up to date'); continue
        log(f'[mix] {ch}: mixing'); r = subprocess.run(['nice', '-n', '10', PY, '-I', 'tools/mix_chapter.py', ch], cwd=P, capture_output=True, text=True)
        log(f'[mix] {ch}: rc {r.returncode} {r.stdout.strip()[-300:]} {r.stderr.strip()[-300:]}'); good &= r.returncode == 0
    res['mix'] = good

def ff(*a):
    r = subprocess.run([FF, '-v', 'error', '-y', *a], capture_output=True, text=True)
    if r.returncode: log('!!! ffmpeg failed:', r.stderr[-800:]); r.check_returncode()
    return r

def main():
    (P / 'build').mkdir(exist_ok=True); (P / 'out').mkdir(exist_ok=True)
    lock = open(P / 'build/render_full.lock', 'w')
    try: fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except OSError: print('already running'); sys.exit(1)
    log('=== start', ', '.join(f'{c} {dur(c):.2f}s' for c in CH), f'total {sum(dur(c) for c in CH):.1f}s')
    res = {}; ta = threading.Thread(target=lane_frames, args=(res,)); tb = threading.Thread(target=lane_mix, args=(res,))
    ta.start()
    if TEST: res['mix'] = True
    else: tb.start(); tb.join()
    ta.join()
    if not res.get('frames') or not res.get('mix'): log('!!! stopped: frames or mix incomplete', res); sys.exit(2)
    parts = []
    for ch in CH:                                                       # video-only per chapter (exact frame count)
        v = P / ch / ('build/test_v.mp4' if TEST else 'build/full_v.mp4'); last = max((P / ch / 'build/full').glob('f_*.jpg'), key=lambda f: f.stat().st_mtime).stat().st_mtime
        if not (v.exists() and v.stat().st_mtime > last):
            log(f'[enc] {ch}'); ff('-framerate', '30', '-i', str(P / ch / 'build/full/f_%05d.jpg'), '-frames:v', str(nframes(ch)),
                '-vf', 'scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17',
                '-maxrate', '30M', '-bufsize', '60M', '-profile:v', 'high', '-g', '60', '-color_range', 'tv', '-colorspace', 'bt709',
                '-color_primaries', 'bt709', '-color_trc', 'bt709', '-an', str(v))
        parts.append(v)
    (P / 'build/concat.txt').write_text(''.join(f"file '{v}'\n" for v in parts))
    log('[enc] concat video'); ff('-f', 'concat', '-safe', '0', '-i', str(P / 'build/concat.txt'), '-c', 'copy', str(P / 'build/full_v.mp4'))
    ins, flt = [], []                                                   # audio: each chapter padded/trimmed to its frame count
    for i, ch in enumerate(CH):
        ins += ['-i', str(P / ch / WAV.get(ch, 'build/mix.wav'))]
        flt.append(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo,apad,atrim=0:{nframes(ch) / 30:.6f},asetpts=N/SR/TB[a{i}]')
    flt.append(''.join(f'[a{i}]' for i in range(len(CH))) + f'concat=n={len(CH)}:v=0:a=1[out]')
    log('[aud] concat'); ff(*ins, '-filter_complex', ';'.join(flt), '-map', '[out]', '-c:a', 'pcm_s24le', str(P / 'build/full_a.wav'))
    joins, acc = [], 0.0                                              # Portal QR sound at every chapter join
    for ch in CH[:-1]: acc += nframes(ch) / 30; joins.append(f'{acc:.4f}')
    r = subprocess.run([PY, '-I', 'tools/portal_sfx.py', str(P / 'build/full_a.wav'), str(P / 'build/full_ap.wav'), *joins], cwd=P, capture_output=True, text=True)
    log('[aud] portal', r.returncode, r.stdout.strip()[-300:], r.stderr.strip()[-300:]); r.check_returncode()
    r = subprocess.run([FF, '-hide_banner', '-i', str(P / 'build/full_ap.wav'), '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'],
                       capture_output=True, text=True); m = json.loads(r.stderr[r.stderr.rindex('{'):r.stderr.rindex('}') + 1]); log('[aud] measured', m)
    ln = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
          f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    log('[mux]'); ff('-i', str(P / 'build/full_v.mp4'), '-i', str(P / 'build/full_ap.wav'), '-af', ln + ',aresample=48000', '-map', '0:v', '-map', '1:a',
                     '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', str(OUT))
    if not TEST: r = subprocess.run([PY, '-I', 'tools/captions.py'], cwd=P, capture_output=True, text=True); log('[srt]', r.stdout.strip()[-400:], r.stderr.strip()[-300:])
    d = subprocess.run([FF, '-i', str(OUT)], capture_output=True, text=True).stderr; log('=== DONE', OUT, [l.strip() for l in d.splitlines() if 'Duration' in l])

main()
