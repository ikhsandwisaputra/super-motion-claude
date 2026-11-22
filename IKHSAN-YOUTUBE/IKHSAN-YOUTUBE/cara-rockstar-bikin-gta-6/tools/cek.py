"""Headless still check (no render): cek.py <bab> t1 t2 … [--k 8] [--w 480] → build/cek/<bab>.jpg (3-col sheet) + page errors.
Also: cek.py <bab> --every 2 (a still every 2 s). Fonts/assets load exactly like Motion Studio (index.html?studio=1)."""
import functools, http.server, json, socketserver, sys, threading
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

PROJ = Path(__file__).resolve().parents[1]
a = sys.argv[1:]; ch = a.pop(0)
opt = lambda k, d: (float(a.pop(a.index(k) + 1)), a.remove(k))[0] if k in a else d
K, TW, EV, COLS = int(opt('--k', 1)), int(opt('--w', 480)), opt('--every', 0), int(opt('--cols', 3))
out = PROJ / 'build/cek'; out.mkdir(parents=True, exist_ok=True)

class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *x): pass
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Q, directory=str(PROJ))); srv.daemon_threads = True
threading.Thread(target=srv.serve_forever, daemon=True).start(); port = srv.server_address[1]

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/google/chrome/chrome', args=['--enable-gpu', '--ignore-gpu-blocklist', '--no-sandbox', '--headless=new'])
    pg = b.new_page(viewport={'width': 1920, 'height': 1080}); errs = []
    pg.on('pageerror', lambda e: errs.append('PAGE ' + str(e)))
    pg.on('console', lambda m: errs.append('CONSOLE ' + m.text) if m.type == 'error' and 'Failed to load resource' not in m.text else None)
    pg.on('response', lambda r: errs.append(f'HTTP {r.status} {r.url}') if r.status >= 400 and 'favicon' not in r.url else None)
    pg.goto(f'http://127.0.0.1:{port}/{ch}/src/index.html?studio=1', wait_until='networkidle', timeout=90000)
    try: pg.wait_for_function('window.ready && typeof window.renderAt === "function"', timeout=90000); pg.evaluate('window.ready')
    except Exception as e: errs.append('READY ' + str(e)[:200])
    dur = pg.evaluate('window.NFRAMES / window.FILM_FPS || 0')
    times = [float(x) for x in a] or ([round(i * EV, 2) for i in range(int(dur / EV) + 1)] if EV else [])
    tiles = []
    for i, t in enumerate(times):
        if t > dur: continue
        pg.evaluate(f'window.renderAt({t}, {K})'); pg.wait_for_timeout(30)
        f = out / f'_{ch}_{i:03d}.png'; pg.locator('canvas').first.screenshot(path=str(f)); tiles.append((t, f))
    b.close()
srv.shutdown()
for e in errs[:12]: print(e[:240])
if tiles:
    th = TW * 9 // 16; rows = (len(tiles) + COLS - 1) // COLS
    sh = Image.new('RGB', (TW * COLS, (th + 18) * rows), (16, 17, 14)); d = ImageDraw.Draw(sh)
    for i, (t, f) in enumerate(tiles):
        x, y = (i % COLS) * TW, (i // COLS) * (th + 18)
        sh.paste(Image.open(f).convert('RGB').resize((TW, th), Image.Resampling.LANCZOS), (x, y)); d.text((x + 6, y + th + 3), f'{ch} t={t:.2f}', fill=(210, 215, 200))
    sh.save(out / f'{ch}.jpg', quality=84)
    if len(tiles) == 1: Image.open(tiles[0][1]).convert('RGB').resize((1280, 720)).save(out / f'{ch}_1.jpg', quality=88)
print(f'{ch}: dur={dur:.2f} tiles={len(tiles)} errs={len(errs)} → {out / (ch + ".jpg")}')
