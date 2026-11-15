"""Scan a film for subtitles that sit on top of on-screen text (Ikhsan v17 v2: "subtitle kadang tertimpa").
Plays the fast preview with two probes: captions report their pill rect (globalThis.__C), every text() call reports its
box (globalThis.__T); world-canvas boxes are mapped to the screen (2D transform minus overscan; the small GL tilt is ignored).

  .venv/bin/python -I tools/studio/cap_collide.py <project> [--fps 5]   ->  build/cap_collisions.json (+ printed spans)
"""
import argparse, asyncio, json, os, sys, time, http.server, functools, threading
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import project_cfg
from playwright.async_api import async_playwright

JS = r"""
async ([t0, t1, fps]) => {
  const hits = [];
  for (let f = Math.round(t0 * fps); f <= Math.round(t1 * fps); f++) {
    const t = f / fps; let cap = null; const boxes = [];
    globalThis.__C = (cv, x, y, w, h, s) => { cap = { cv, x, y, w, h, s }; };
    globalThis.__T = (ctx, s, x, y, w) => {
      if (!s || !String(s).trim()) return;
      const m = /(\d+(?:\.\d+)?)px/.exec(ctx.font); const sz = m ? +m[1] : 20; if (sz < 18) return;
      const T = ctx.getTransform(), pts = [[x, y - sz * 0.78], [x + w, y - sz * 0.78], [x, y + sz * 0.22], [x + w, y + sz * 0.22]].map(([a, b]) => [T.a * a + T.c * b + T.e, T.b * a + T.d * b + T.f]);
      const ox = (ctx.canvas.width - 1920) / 2, oy = (ctx.canvas.height - 1080) / 2;
      const xs = pts.map(p => p[0] - ox), ys = pts.map(p => p[1] - oy), a = ctx.globalAlpha;
      boxes.push({ cv: ctx.canvas, s: String(s), x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys), a });
    };
    await window.preview(t);
    if (!cap) continue;
    const C = { x0: cap.x, x1: cap.x + cap.w, y0: cap.y, y1: cap.y + cap.h };
    for (const b of boxes) {
      if (b.cv === cap.cv || b.a < 0.35) continue;                       // the subtitle's own text / faded text
      const ix = Math.min(C.x1, b.x1) - Math.max(C.x0, b.x0), iy = Math.min(C.y1, b.y1) - Math.max(C.y0, b.y0);
      if (ix <= 0 || iy <= 0) continue;
      const frac = ix * iy / ((b.x1 - b.x0) * (b.y1 - b.y0));
      if (frac > 0.08 && (b.y1 - b.y0) > 16) hits.push({ t: +t.toFixed(2), text: b.s.slice(0, 60), cap: cap.s.slice(0, 60), frac: +frac.toFixed(2) });
    }
  }
  delete globalThis.__C; delete globalThis.__T;
  return hits;
}
"""

async def main():
    ap = argparse.ArgumentParser(); ap.add_argument("project"); ap.add_argument("--fps", type=float, default=5)
    ap.add_argument("--t0", type=float, default=0); ap.add_argument("--t1", type=float)
    a = ap.parse_args(); C = project_cfg(a.project); root = C["root"]
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *x): pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=root))
    threading.Thread(target=srv.serve_forever, daemon=True).start(); t = time.time()
    async with async_playwright() as p:
        br = await p.chromium.launch(executable_path="/opt/google/chrome/chrome", args=["--enable-gpu", "--ignore-gpu-blocklist"])
        pg = await br.new_page(viewport={"width": 1000, "height": 600})
        await pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/src/index.html")
        await pg.wait_for_function("window.ready !== undefined", timeout=120000); await pg.evaluate("window.ready")
        t1 = a.t1 if a.t1 is not None else await pg.evaluate("window.NFRAMES / window.FILM_FPS")
        hits, c0 = [], a.t0
        while c0 < t1:
            c1 = min(t1, c0 + 60); hits += await pg.evaluate(JS, [c0, c1, a.fps]); c0 = c1
            print(f"  {c1:.0f}/{t1:.0f}s hits {len(hits)} ({time.time() - t:.0f}s)", flush=True)
        await br.close()
    spans = []                                                            # group per text into time spans
    for h in sorted(hits, key=lambda h: (h["text"], h["t"])):
        s = spans[-1] if spans and spans[-1]["text"] == h["text"] and h["t"] - spans[-1]["t1"] <= 2.5 / a.fps else None
        if s: s["t1"] = h["t"]; s["frac"] = max(s["frac"], h["frac"])
        else: spans.append({"t0": h["t"], "t1": h["t"], "text": h["text"], "cap": h["cap"], "frac": h["frac"]})
    spans.sort(key=lambda s: s["t0"])
    json.dump(spans, open(os.path.join(root, "build/cap_collisions.json"), "w"), ensure_ascii=False, indent=1)
    for s in spans: print(f"{int(s['t0'] // 60):02d}:{s['t0'] % 60:05.2f}-{int(s['t1'] // 60):02d}:{s['t1'] % 60:05.2f}  {s['frac']:.0%}  scene: {s['text']!r}  sub: {s['cap']!r}")
    print(len(spans), "collision spans")

asyncio.run(main())
