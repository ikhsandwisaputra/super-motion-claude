"""Headless frame capture: Edge (GPU) + Playwright -> JPEG frames.

Usage (from aset/video-2):
  python -I tools/render.py                       # all frames -> build/frames
  python -I tools/render.py --frames 0,90,480     # single frames -> build/preview
  python -I tools/render.py --range 0-240 --out build/preview_open
  add --debug for the safe-zone guide + frame HUD
"""
import argparse
import asyncio
import functools
import http.server
import os
import sys
import threading
import time

from playwright.async_api import async_playwright

ROOT = os.getcwd()


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k):
            pass
    handler = functools.partial(Quiet, directory=ROOT)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


async def worker(ctx, url, frames, out, wid, errors):
    page = await ctx.new_page()
    page.on("pageerror", lambda e: errors.append(f"[w{wid}] {e}"))
    page.on("console", lambda m: errors.append(f"[w{wid}] {m.text}") if m.type == "error" else None)
    await page.goto(url)
    await page.wait_for_function("window.ready !== undefined", timeout=180000)
    total = await page.evaluate("window.ready")
    for f in frames:
        if f > total:
            continue
        await page.evaluate("f => window.renderFrame(f)", f)
        await page.screenshot(path=os.path.join(out, f"f_{f:05d}.jpg"), type="jpeg", quality=95,
                              clip={"x": 0, "y": 0, "width": 1920, "height": 1080})
    await page.close()
    return total


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--frames")
    ap.add_argument("--range")
    ap.add_argument("--out")
    ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--debug", action="store_true")
    a = ap.parse_args()
    srv = serve()
    url = f"http://127.0.0.1:{srv.server_address[1]}/src/index.html" + ("?debug=1" if a.debug else "")
    errors = []
    async with async_playwright() as p:
        br = await p.chromium.launch(channel=("msedge" if sys.platform == "win32" else "chrome"), args=["--use-angle=" + ("d3d11" if sys.platform == "win32" else "vulkan"), "--enable-gpu", "--ignore-gpu-blocklist"])
        ctx = await br.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
        probe = await ctx.new_page()
        probe.on("pageerror", lambda e: errors.append(str(e)))
        await probe.goto(url)
        await probe.wait_for_function("window.ready !== undefined", timeout=180000)
        total = await probe.evaluate("window.ready")
        await probe.close()
        if a.frames:
            frames = [int(x) for x in a.frames.split(",")]
            out = a.out or "build/preview"
        elif a.range:
            s, e = a.range.split("-")
            frames = list(range(int(s), int(e) + 1))
            out = a.out or "build/preview"
        else:
            frames = list(range(0, total))
            out = a.out or "build/frames"
        os.makedirs(out, exist_ok=True)
        n = max(1, min(a.workers, len(frames)))
        t0 = time.time()
        await asyncio.gather(*[worker(ctx, url, frames[i::n], out, i, errors) for i in range(n)])
        await br.close()
    dt = time.time() - t0
    print(f"rendered {len(frames)} frames of {total} in {dt:.1f}s ({1000 * dt / max(1, len(frames)):.0f} ms/frame) -> {out}")
    for e in errors[:20]:
        print("ERR", e)
    srv.shutdown()
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    asyncio.run(main())
