"""Find every visual UI event of a film (typing, windows/bubbles/chips popping in, checks, toggles, counters, cursor
clicks, highlight sweeps) by playing it once in the fast preview with probes on, so SFX land on the exact frame.

  .venv/bin/python -I tools/studio/sfx_probe.py <project> [--fps 20] [--t0 0 --t1 60]   ->  <project>/build/sfx_events.json

Contract: the film's draw primitives call globalThis.__P(kind, id, value, x) (see video-17 src/ui.js, tpl.js, lib/draw2d.js);
src/main.js exposes window.preview(t). Pure read: nothing in the film changes.
"""
import argparse, asyncio, json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import project_cfg
from playwright.async_api import async_playwright

CHROME = "/opt/google/chrome/chrome"

JS = r"""
async ([t0, t1, fps]) => {
  const ev = [], st = new Map(), spans = new Map();
  let cur = new Map();
  globalThis.__P = (kind, id, v, x) => { const key = kind + '|' + id; const o = cur.get(key); if (!o || v > o.v) cur.set(key, { kind, id, v: +v || 0, x }); };
  const close = (key, t) => { const s = spans.get(key); if (!s) return; spans.delete(key); if (t - s.a >= 0.12) ev.push({ t: +s.a.toFixed(3), end: +t.toFixed(3), kind: s.kind, id: s.id, x: s.x, n: s.n }); };
  for (let f = Math.round(t0 * fps); f <= Math.round(t1 * fps); f++) {
    const t = f / fps; cur = new Map();
    await window.preview(t);
    for (const [key, o] of cur) {
      const p = st.get(key) ?? 0, v = o.v;
      if (o.kind === 'type' || o.kind === 'stream' || o.kind === 'count' || o.kind === 'sweep') {          // spans while 0 < v < 1
        const on = v > 0.001 && v < 0.999;
        if (on && !spans.has(key)) spans.set(key, { a: t, kind: o.kind, id: o.id, x: o.x, n: (o.kind === 'type' || o.kind === 'stream') ? String(o.id).length : 0 });
        if (!on && spans.has(key)) close(key, t);
      } else if (o.kind === 'toggle') { if (p < 0.5 && v >= 0.5 && st.has(key)) ev.push({ t: +t.toFixed(3), kind: 'toggle', id: o.id, x: o.x }); }
      else if (o.kind === 'press') { if (p < 0.5 && v >= 0.5) ev.push({ t: +t.toFixed(3), kind: 'press', id: o.id, x: o.x }); }
      else if (o.kind === 'ring') { if (!(p >= 0) || p > v || !st.has(key)) { if (v >= 0 && v < 0.2) ev.push({ t: +t.toFixed(3), kind: 'ring', id: o.id, x: o.x }); } }
      else { if (p <= 0 && v > 0) ev.push({ t: +t.toFixed(3), kind: o.kind, id: o.id, x: o.x }); }   // win, bubble, chip, check, doc: appear
      st.set(key, v);
    }
    for (const key of [...st.keys()]) if (!cur.has(key)) { st.delete(key); close(key, t); }   // primitive left the screen
  }
  for (const key of [...spans.keys()]) close(key, t1);
  delete globalThis.__P;
  return ev;
}
"""


async def main():
    ap = argparse.ArgumentParser(); ap.add_argument("project"); ap.add_argument("--fps", type=float, default=20)
    ap.add_argument("--t0", type=float, default=0); ap.add_argument("--t1", type=float); ap.add_argument("--out", default="build/sfx_events.json")
    a = ap.parse_args(); C = project_cfg(a.project); root = C["root"]
    import http.server, functools, threading
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *x): pass
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=root))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    t = time.time()
    async with async_playwright() as p:
        br = await p.chromium.launch(executable_path=CHROME, args=["--enable-gpu", "--ignore-gpu-blocklist"])
        pg = await br.new_page(viewport={"width": 1000, "height": 600}); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/src/index.html")
        await pg.wait_for_function("window.ready !== undefined", timeout=120000); await pg.evaluate("window.ready")
        dur = await pg.evaluate("window.NFRAMES / window.FILM_FPS")
        t1 = a.t1 if a.t1 is not None else dur
        ev = []
        step = 60.0                                   # chunks keep each evaluate call short
        c0 = a.t0
        while c0 < t1:
            c1 = min(t1, c0 + step)
            ev += await pg.evaluate(JS, [c0, c1, a.fps])
            print(f"  {c1:.0f}/{t1:.0f}s  events {len(ev)}  ({time.time() - t:.0f}s)", flush=True)
            c0 = c1
        await br.close()
    if errs: print("PAGE ERRORS", errs[:5])
    # chunk seams can split one span: merge same-id spans that touch
    ev.sort(key=lambda e: e["t"]); out = []
    for e in ev:
        m = next((o for o in reversed(out[-40:]) if o["kind"] == e["kind"] and o["id"] == e["id"] and "end" in o and abs(o["end"] - e["t"]) < 0.11), None)
        if m and "end" in e: m["end"] = e["end"]
        else: out.append(e)
    json.dump(out, open(os.path.join(root, a.out), "w"), ensure_ascii=False, indent=0)
    from collections import Counter
    print(len(out), "events", dict(Counter(e["kind"] for e in out)), f"in {time.time() - t:.0f}s -> {a.out}")


asyncio.run(main())
