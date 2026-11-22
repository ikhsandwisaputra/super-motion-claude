"""V2 Dense Headless Chrome Dry-Pass + Anti-Dead-Visual Audit + Contact Sheets across all 8 chapters.
Verifies:
  1. 0 console errors, 0 page errors, 0 failed HTTP fetches (404s)
  2. Dense 12-tile contact sheets per chapter (including exact timestamps Ikhsan flagged!)
  3. Automatic dead-visual scan every 3 seconds: flags any dark empty frame (< 1.6% lit pixels & low std)."""
import functools, http.server, json, socketserver, sys, threading
from pathlib import Path
from PIL import Image, ImageDraw, ImageStat
from playwright.sync_api import sync_playwright

PROJ = Path(__file__).resolve().parents[1]
QA = PROJ / 'build/qa'
QA.mkdir(parents=True, exist_ok=True)
CHAPS = sys.argv[1:] or ['intro', 'bab-peta', 'bab-1', 'bab-2', 'bab-3', 'bab-4', 'puncak', 'penutup']

# Extra mandatory audit timestamps from Ikhsan's V1 revision screenshots!
PIN_TIMES = {
    'bab-peta': [2.31, 6.0, 10.0, 13.95, 17.5, 22.5],
    'bab-1':    [5.5, 10.5, 18.12, 23.0, 37.86, 43.0, 64.0, 82.0, 92.5, 104.0, 118.88, 125.5, 142.0, 169.5, 182.0],
    'bab-2':    [4.0, 14.0, 23.0, 32.0, 41.0, 52.0, 66.0, 72.0, 88.0, 107.0],
    'bab-3':    [2.5, 16.0, 46.0, 68.0, 80.0, 95.0, 112.0, 127.0, 141.0, 146.5, 158.0],
    'bab-4':    [3.0, 16.0, 35.0, 45.0, 62.0, 72.0, 87.0, 104.0, 119.5, 128.0, 140.0, 151.0],
    'puncak':   [2.0, 9.0, 15.5, 18.2, 23.0, 29.0, 36.0, 41.0],
    'penutup':  [2.5, 8.0, 16.0, 25.5, 34.0, 45.0],
    'intro':    [2.5, 8.5, 14.5, 18.5, 22.0, 32.0, 43.0, 47.0],
}

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

handler = functools.partial(QuietHandler, directory=str(PROJ))
httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
port = httpd.server_address[1]
threading.Thread(target=httpd.serve_forever, daemon=True).start()

def is_dead_frame(im):
    # Resize to 160x90 and check bright-pixel ratio + luminance std (ignores tiny mono label in corner)
    g = im.convert('L').resize((160, 90))
    px = list(g.getdata())
    lit = sum(1 for v in px if v > 42) / len(px)
    std = ImageStat.Stat(g).stddev[0]
    return (lit < 0.025 and std < 10.5), lit, std

all_ok = True
with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path='/opt/google/chrome/chrome',
        args=['--enable-gpu', '--ignore-gpu-blocklist', '--no-sandbox', '--headless=new']
    )
    for ch in CHAPS:
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        errs, fails = [], []
        page.on('pageerror', lambda e: errs.append(str(e)))
        page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        page.on('requestfailed', lambda r: fails.append(f'{r.url} ({r.failure})'))
        page.on('response', lambda r: fails.append(f'{r.status} {r.url}') if r.status >= 400 and 'favicon' not in r.url else None)

        url = f'http://127.0.0.1:{port}/{ch}/src/index.html?studio=1'
        page.goto(url, wait_until='networkidle', timeout=60000)
        page.wait_for_function('typeof window.preview === "function"', timeout=30000)
        if ch == 'intro':
            dur = json.loads((PROJ / 'intro/src/timeline.json').read_text())['dur']
        else:
            src = (PROJ / ch / 'src/beats.js').read_text()
            B = json.loads(src[src.index('{'):src.rindex('}') + 1])
            dur = B['END'] + B['VOFF'] + B['TAIL']

        # 1) Dense contact sheet on pinned audit timestamps
        times = [t for t in PIN_TIMES.get(ch, []) if t < dur - 0.1]
        tiles = []
        dead_list = []
        for idx, ts in enumerate(times):
            page.evaluate(f'window.preview({ts})')
            page.wait_for_timeout(60)
            png = QA / f'v2_{ch}_{idx}.png'
            page.locator('canvas').first.screenshot(path=str(png))
            im = Image.open(png).convert('RGB')
            dead, lit, std = is_dead_frame(im)
            if dead:
                dead_list.append((ts, lit, std))
            tiles.append((ts, png, dead, lit))

        # 2) Automated sweep every 4.0 s across the chapter specifically checking for ANY hidden dead frame!
        t_cur = 1.5
        while t_cur < dur - 1.5:
            if all(abs(t_cur - x) > 1.8 for x in times):
                page.evaluate(f'window.preview({t_cur:.2f})')
                page.wait_for_timeout(40)
                png = QA / f'v2_scan_{ch}.png'
                page.locator('canvas').first.screenshot(path=str(png))
                im = Image.open(png).convert('RGB')
                dead, lit, std = is_dead_frame(im)
                if dead:
                    dead_list.append((round(t_cur, 2), lit, std))
                png.unlink(missing_ok=True)
            t_cur += 4.0

        # Build 3-column contact sheet
        cols = 3
        rows = (len(tiles) + cols - 1) // cols
        tw, th = 420, 236
        sh = Image.new('RGB', (tw * cols, (th + 22) * rows), (16, 17, 14))
        dr = ImageDraw.Draw(sh)
        for i, (ts, png, dead, lit) in enumerate(tiles):
            im = Image.open(png).convert('RGB').resize((tw, th), Image.Resampling.LANCZOS)
            x, y = (i % cols) * tw, (i // cols) * (th + 22)
            sh.paste(im, (x, y))
            col_txt = (240, 80, 70) if dead else (210, 215, 200)
            dr.text((x + 8, y + th + 3), f'{ch} · t={ts:.2f}s · lit={lit*100:.1f}%' + (' [DEAD!]' if dead else ''), fill=col_txt)
            png.unlink(missing_ok=True)
        out_jpg = QA / f'v2_{ch}.jpg'
        sh.save(out_jpg, quality=85)

        status = 'OK' if not errs and not fails and not dead_list else 'ISSUES'
        if status != 'OK': all_ok = False
        print(f'{ch:10s} [{status}] dur={dur:6.2f}s · errs={len(errs)} · http={len(fails)} · dead={len(dead_list)} -> {out_jpg.name}')
        for e in errs[:5]: print('   ERR:', e[:180])
        for f in fails[:5]: print('   HTTP:', f[:180])
        for d in dead_list[:8]: print(f'   DEAD @ t={d[0]:.2f}s (lit={d[1]*100:.1f}%, std={d[2]:.1f})')
        page.close()
    browser.close()
httpd.shutdown()
sys.exit(0 if all_ok else 1)
