"""Render frames of a scene in headless Chrome.

  python -I tools/render.py --scene a --out build/a            # all frames -> build/a/f_00000.jpg
  python -I tools/render.py --scene a3 --still --out styleframes/A3.jpg
  python -I tools/render.py --scene a --frames 30,60 --out build/a_check
"""
import argparse, asyncio, base64, functools, http.server, os, sys, threading, time
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/opt/google/chrome/chrome"


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k):
            pass
    h = functools.partial(Quiet, directory=ROOT)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


async def worker(ctx, url, frames, out, still, errors):
    pg = await ctx.new_page()
    pg.on("pageerror", lambda e: errors.append(str(e)))
    await pg.goto(url)
    await pg.wait_for_function("window.ready !== undefined")
    await pg.evaluate("window.ready")
    for f in frames:
        data = await pg.evaluate(f"window.render({f}, {'true' if still else 'false'})")
        path = out if still else os.path.join(out, f"f_{f:05d}.jpg")
        with open(path, "wb") as fh:
            fh.write(base64.b64decode(data.split(",", 1)[1]))
    await pg.close()


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scene", default="a")
    ap.add_argument("--out", required=True)
    ap.add_argument("--frames")
    ap.add_argument("--still", action="store_true")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--k", type=int, help="override sub-frames (animatic: 3)")
    a = ap.parse_args()
    srv = serve()
    url = f"http://127.0.0.1:{srv.server_address[1]}/src/index.html?scene={a.scene}" + (f"&K={a.k}" if a.k else "")
    errors = []
    t0 = time.time()
    async with async_playwright() as p:
        br = await p.chromium.launch(executable_path=CHROME, args=["--enable-gpu", "--ignore-gpu-blocklist"])
        ctx = await br.new_context(viewport={"width": 1000, "height": 600})
        if a.still:
            os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
            await worker(ctx, url, [0], a.out, True, errors)
            n = 1
        else:
            os.makedirs(a.out, exist_ok=True)
            probe = await ctx.new_page()
            await probe.goto(url)
            await probe.wait_for_function("window.ready !== undefined")
            await probe.evaluate("window.ready")
            nf = await probe.evaluate("window.NFRAMES")
            await probe.close()
            frames = [int(x) for x in a.frames.split(",")] if a.frames else list(range(nf))
            chunks = [frames[i::a.workers] for i in range(a.workers)]
            await asyncio.gather(*(worker(ctx, url, c, a.out, False, errors) for c in chunks if c))
            n = len(frames)
        await br.close()
    if errors:
        print("PAGE ERRORS:", *errors, sep="\n  ")
        sys.exit(1)
    print(f"{n} frame(s) -> {a.out} in {time.time() - t0:.1f}s")


asyncio.run(main())
