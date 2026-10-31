"""Screenshot a page of src/ (Edge headless, GPU). python -I tools/shot.py sheet.html build/sheet.png [WxH]"""
import asyncio, functools, http.server, os, sys, threading
from playwright.async_api import async_playwright

ROOT = os.getcwd()

def serve():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k): pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

async def main():
    page_rel, out = sys.argv[1], sys.argv[2]
    w, h = (int(v) for v in (sys.argv[3] if len(sys.argv) > 3 else "1920x1080").split("x"))
    srv = serve()
    errs = []
    async with async_playwright() as p:
        br = await p.chromium.launch(channel="msedge", args=["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"])
        pg = await br.new_page(viewport={"width": w, "height": h})
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/src/{page_rel}")
        await pg.wait_for_function("window.ready === true", timeout=60000)
        await pg.screenshot(path=out)
        await br.close()
    srv.shutdown()
    for e in errs: print("ERR", e)

asyncio.run(main())
