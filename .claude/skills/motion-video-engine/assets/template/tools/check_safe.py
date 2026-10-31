"""Report words whose settled glyph box leaves the safe area: python -I tools/check_safe.py [--all]"""
import asyncio, functools, http.server, os, sys, threading
from playwright.async_api import async_playwright
ROOT = os.getcwd()
def serve():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k): pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start(); return srv
async def main():
    srv = serve()
    async with async_playwright() as p:
        br = await p.chromium.launch(channel="msedge", args=["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"])
        pg = await br.new_page(viewport={"width": 1920, "height": 1080})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/src/index.html")
        await pg.wait_for_function("window.ready !== undefined", timeout=180000)
        await pg.evaluate("window.ready")
        res = await pg.evaluate("window.checkSafe()")
        ov = await pg.evaluate("window.checkOverlap()")
        await br.close()
    srv.shutdown()
    for e in errs: print("ERR", e)
    for r in res:
        if r["bad"] or "--all" in sys.argv:
            print(("BAD " if r["bad"] else "ok  ") + f"{r['shot']:5s} {r['text']!r:24s} x {r['box'][0]:.3f}-{r['box'][2]:.3f}  y {r['box'][1]:.3f}-{r['box'][3]:.3f}")

    for o in ov:
        print(f"OVERLAP {o['shot']:5s} {o['a']!r} x {o['b']!r} {int(o['frac']*100)}% @ {o['t']}s")
asyncio.run(main())
