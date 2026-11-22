"""Galeri contact sheets: render each demo's hold frame (or a strip across one demo) in headless Chrome.

  .venv/bin/python -I aset/_pustaka/galeri/tools/sheet.py --g dasar                  # → galeri/lembar/dasar.jpg (3 per row, 1260 px)
  .venv/bin/python -I aset/_pustaka/galeri/tools/sheet.py --g prop --id prop.gembok --strip   # 8 frames across one demo
  .venv/bin/python -I aset/_pustaka/galeri/tools/sheet.py --all                      # every section listed in src/sections.js
  --full DIR also writes the 1920×1080 hold frames there (crop them for detail) · --light forces the light world
Exit code 1 when the page throws or logs an error, so a broken component never slips into the catalogue.
"""
import argparse, asyncio, base64, functools, http.server, io, os, re, sys, threading, time
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/opt/google/chrome/chrome"
SPAN = 3.2
TW, TH, CAP, COLS = 420, 236, 24, 3


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k):
            pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def sections():
    s = open(os.path.join(ROOT, "src", "sections.js"), encoding="utf-8").read()
    return re.findall(r"'([\w-]+)'", s.split("export default", 1)[1])


def font(sz):
    try:
        return ImageFont.truetype(os.path.join(ROOT, "fonts", "SpaceMono-Regular.ttf"), sz)
    except OSError:
        return ImageFont.load_default()


def compose(tiles, title, out):
    rows = (len(tiles) + COLS - 1) // COLS
    sheet = Image.new("RGB", (COLS * TW, 34 + rows * (TH + CAP)), (11, 12, 9))
    d = ImageDraw.Draw(sheet)
    d.text((10, 8), title, fill=(200, 245, 60), font=font(16))
    for i, (im, cap) in enumerate(tiles):
        x, y = (i % COLS) * TW, 34 + (i // COLS) * (TH + CAP)
        sheet.paste(im.resize((TW - 4, TH - 4), Image.LANCZOS), (x + 2, y + 2))
        d.text((x + 6, y + TH + 3), cap[:52], fill=(241, 239, 230), font=font(13))
    sheet.save(out, quality=88)
    return sheet.size


async def run(a):
    srv = serve()
    port = srv.server_address[1]
    secs = sections() if a.all else a.g.split(",")
    bad = 0
    async with async_playwright() as p:
        br = await p.chromium.launch(executable_path=CHROME, args=["--enable-gpu", "--ignore-gpu-blocklist"])
        ctx = await br.new_context(viewport={"width": 1000, "height": 600})
        for sec in secs:
            errors = []
            pg = await ctx.new_page()
            pg.on("pageerror", lambda e: errors.append(str(e)))
            pg.on("console", lambda m: errors.append("console: " + m.text) if m.type == "error" and "Failed to load resource" not in m.text else None)
            pg.on("response", lambda r: errors.append(f"HTTP {r.status}: {r.url}") if r.status >= 400 and not r.url.endswith("favicon.ico") else None)
            url = f"http://127.0.0.1:{port}/src/index.html?g={sec}" + (f"&id={a.id}" if a.id else "") + ("&light=1" if a.light else "")
            t0 = time.time()
            try:
                await pg.goto(url)
                await pg.wait_for_function("window.ready !== undefined")
                await pg.evaluate("window.ready")
                demos = await pg.evaluate("window.DEMOS")
                if a.strip:
                    d0 = demos[0]
                    shots = [(d0["at"] + i * (SPAN - .15) / 7, f"{d0['id']} +{i * (SPAN - .15) / 7:.2f}s") for i in range(8)]
                else:
                    shots = [(d["hold"], d["id"]) for d in demos]
                tiles = []
                for k, (t, cap) in enumerate(shots):
                    data = await pg.evaluate(f"window.renderAt({t:.4f})")
                    im = Image.open(io.BytesIO(base64.b64decode(data.split(",", 1)[1]))).convert("RGB")
                    if a.full:
                        os.makedirs(a.full, exist_ok=True)
                        im.save(os.path.join(a.full, f"{cap.split(' ')[0]}{'_%d' % k if a.strip else ''}.jpg"), quality=92)
                    tiles.append((im, cap))
                os.makedirs(os.path.join(ROOT, "lembar"), exist_ok=True)
                name = f"strip_{demos[0]['id']}" if a.strip else (sec + (f"_{a.id}" if a.id else ""))
                out = os.path.join(ROOT, "lembar", name + ".jpg")
                size = compose(tiles, f"PUSTAKA · {sec}" + (" · strip" if a.strip else ""), out)
                print(f"{sec}: {len(tiles)} frame(s) -> {out} {size[0]}x{size[1]} in {time.time() - t0:.1f}s")
            except Exception as e:  # noqa: BLE001 (report and continue with the next section)
                errors.append(f"{type(e).__name__}: {e}")
            if errors:
                bad += 1
                print(f"{sec}: PAGE ERRORS:", *errors[:12], sep="\n  ")
            await pg.close()
        await br.close()
    return bad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--g", help="section(s), comma separated")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--id", help="demo id prefix")
    ap.add_argument("--strip", action="store_true", help="8 frames across the first matching demo")
    ap.add_argument("--light", action="store_true")
    ap.add_argument("--full", help="also write full-size frames to this folder")
    a = ap.parse_args()
    if not (a.g or a.all):
        ap.error("--g <section> or --all")
    sys.exit(1 if asyncio.run(run(a)) else 0)


main()
