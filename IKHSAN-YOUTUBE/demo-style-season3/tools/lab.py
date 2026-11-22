"""Lab Season 3 · cek di Chrome headless: error konsol, cues (build/cues_src.json), still (build/stills/<nama>.jpg), ms/frame preview.
Pakai: .venv/bin/python -I tools/lab.py [--still C1:11.0 C2:11.8 …] [--K 1|8] [--perf 10:15]
K 1 = still persis (seperti Studio), K 8 = motion blur seperti render."""
import argparse
import base64
import functools
import http.server
import json
import pathlib
import socketserver
import threading
import time

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--still', nargs='*', default=[])
    ap.add_argument('--K', type=int, default=1)
    ap.add_argument('--perf', default='')
    ap.add_argument('--eval', default='', help='ekspresi JS, hasil dicetak (mis. JSON.stringify(window.__A))')
    a = ap.parse_args()
    srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=str(ROOT)))
    srv.daemon_threads = True
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    log = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/opt/google/chrome/chrome', args=['--enable-gpu', '--ignore-gpu-blocklist'])
        pg = b.new_page(viewport={'width': 1920, 'height': 1080})
        pg.on('console', lambda m: log.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
        pg.on('pageerror', lambda e: log.append(f'pageerror: {e}'))
        pg.on('response', lambda r: log.append(f'{r.status} {r.url}') if r.status >= 400 else None)
        t0 = time.time()
        pg.goto(f'http://127.0.0.1:{srv.server_address[1]}/src/index.html')
        pg.wait_for_function('window.ready !== undefined', timeout=60000)
        pg.evaluate('window.ready')
        print(f'siap {time.time() - t0:.1f} s')
        cues = pg.evaluate('window.collectCues()')
        (ROOT / 'build/stills').mkdir(parents=True, exist_ok=True)
        (ROOT / 'build/cues_src.json').write_text(json.dumps(cues, ensure_ascii=False, indent=1))
        print('cues:', {k: len(v) if isinstance(v, list) else v for k, v in cues.items()})
        if a.eval:
            print('eval:', str(pg.evaluate(a.eval))[:600])
        for s in a.still:
            name, t = s.split(':')
            url = pg.evaluate(f'window.renderAt({float(t)}, {a.K})')
            (ROOT / f'build/stills/{name}.jpg').write_bytes(base64.b64decode(url.split(',', 1)[1]))
        if a.still:
            print('still:', ' '.join(s.split(':')[0] for s in a.still), f'(K {a.K})')
        if a.perf:
            t0, t1 = (float(x) for x in a.perf.split(':'))
            ms = pg.evaluate(f'(() => {{ const a = performance.now(); let n = 0; for (let f = Math.round({t0} * 30); f < Math.round({t1} * 30); f += 3, n++) window.preview(f / 30); return (performance.now() - a) / n; }})()')
            print(f'preview {t0}–{t1} s: {ms:.1f} ms/frame (K 1, termasuk lensa Kstill)')
        b.close()
    srv.shutdown()
    print(f'error/warning konsol: {len(log)}')
    for line in log[:12]:
        print('  ', line[:300])


if __name__ == '__main__':
    main()
