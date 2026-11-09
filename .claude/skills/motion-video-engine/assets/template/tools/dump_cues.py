"""Dump SFX cues + bed sections from the timeline (window.getCues) to build/cues.json."""
import asyncio, functools, http.server, json, os, sys, threading
from playwright.async_api import async_playwright

ROOT = os.getcwd()

def serve():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k): pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

async def main():
    srv = serve()
    async with async_playwright() as p:
        br = await p.chromium.launch(channel=("msedge" if sys.platform == "win32" else "chrome"), args=["--use-angle=" + ("d3d11" if sys.platform == "win32" else "vulkan"), "--enable-gpu", "--ignore-gpu-blocklist"])
        pg = await br.new_page(viewport={"width": 1920, "height": 1080})
        await pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/src/index.html")
        await pg.wait_for_function("window.ready !== undefined", timeout=180000)
        await pg.evaluate("window.ready")
        data = await pg.evaluate("window.getCues()")
        await br.close()
    srv.shutdown()
    json.dump(data, open("build/cues.json", "w"), indent=1)
    print(len(data["cues"]), "cues,", len(data["bed"]), "bed sections, duration", round(data["duration"], 2))

asyncio.run(main())
