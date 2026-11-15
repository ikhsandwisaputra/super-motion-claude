"""super-motion Studio: live preview + timeline + revision notes for a code-generated film, before any full render.

  .venv/bin/python -I tools/studio/studio.py aset/video-ikhsan-channel/video-17   ->  http://127.0.0.1:8765

Local only (binds 127.0.0.1). Serves the studio UI at /, the project at /p/..., and a small API:
  GET  /api/meta            chapters, subtitle lines, beats, SFX cues, frame cache info
  GET  /api/notes           POST /api/notes {op: add|edit|status|send|archive}  (tools/studio/notes.py, build/studio_notes.json)
  POST /api/patch {t0,t1,draft,note}  render that slice only (tools/studio/patch.py) ; GET /api/patches
"""
import argparse, http.server, json, mimetypes, os, re, subprocess, sys, threading, time, urllib.parse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import project_cfg, frame_count, VENV_PY
import notes as NOTES

UI = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ui")
C = None
JOBS = {}


def jload(p, default):
    try: return json.load(open(p, encoding="utf-8"))
    except Exception: return default


def meta():
    r = C["root"]; b = lambda x: os.path.join(r, "build", x)
    cues = jload(b("cues.json"), {})
    return {"name": os.path.basename(r), "fps": C["fps"], "dur": cues.get("dur"),
            "chapters": jload(b("chapters.json"), []), "lines": jload(b("lines_film.json"), []),
            "beats": cues.get("beats", []), "sfx": jload(b("sfx_placed.json"), None) or cues.get("sfx", []), "trans": cues.get("trans", []), "keys": cues.get("keys", []),
            "audio": "/p/" + C["audio"] if os.path.exists(C["audio_abs"]) else None,
            "frames": "/p/" + C["frames"], "frames_n": frame_count(C["frames_abs"]),
            "stems": [{"name": n, "url": f"/p/build/stems/{n}.m4a?v={int(os.path.getmtime(os.path.join(r, 'build/stems', n + '.m4a')))}"}
                      for n in ("vo", "music", "sfx") if os.path.exists(os.path.join(r, "build/stems", n + ".m4a"))]}


def version():
    """newest mtime of the film's source + cue/caption data: the studio reloads the live preview when it changes"""
    r = C["root"]; newest = 0.0
    for d in ("src",):
        for dp, dn, fn in os.walk(os.path.join(r, d)):
            for f in fn: newest = max(newest, os.path.getmtime(os.path.join(dp, f)))
    for f in ("cues.json", "lines_film.json", "chapters.json", "words_film.json", "sfx_placed.json"):
        p = os.path.join(r, "build", f)
        if os.path.exists(p): newest = max(newest, os.path.getmtime(p))
    if os.path.exists(C["audio_abs"]): newest = max(newest, os.path.getmtime(C["audio_abs"]))
    sd = os.path.join(r, "build/stems")
    if os.path.isdir(sd):
        for f in os.listdir(sd): newest = max(newest, os.path.getmtime(os.path.join(sd, f)))
    return {"v": newest}


def patches():
    d = os.path.join(C["root"], "build/patch"); out = []
    if os.path.isdir(d):
        for pid in sorted(os.listdir(d), reverse=True):
            m = jload(os.path.join(d, pid, "patch.json"), None)
            if m:
                m["clip"] = f"/p/build/patch/{pid}/clip.mp4" if os.path.exists(os.path.join(d, pid, "clip.mp4")) else None
                m["compare_url"] = f"/p/build/patch/{pid}/compare.mp4" if os.path.exists(os.path.join(d, pid, "compare.mp4")) else None
                out.append(m)
    return out


def run_patch(body):
    t0, t1 = float(body["t0"]), float(body["t1"])
    if not (0 <= t0 < t1) or t1 - t0 > 120: raise ValueError("range must be 0 <= t0 < t1, max 120 s")
    cmd = [VENV_PY, "-I", os.path.join(os.path.dirname(os.path.abspath(__file__)), "patch.py"), C["root"], "--t0", str(t0), "--t1", str(t1),
           "--note", str(body.get("note", ""))[:300]]
    if body.get("draft"): cmd.append("--draft")
    log = os.path.join(C["root"], "build", f"studio_patch_{int(time.time())}.log")
    p = subprocess.Popen(cmd, stdout=open(log, "w"), stderr=subprocess.STDOUT, cwd=C["root"])
    JOBS[p.pid] = {"t0": t0, "t1": t1, "log": log, "proc": p}
    return {"pid": p.pid}


class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def _json(self, obj, code=200):
        b = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code); self.send_header("Content-Type", "application/json"); self.send_header("Content-Length", str(len(b)))
        self.send_header("Cache-Control", "no-store"); self.end_headers(); self.wfile.write(b)

    def _file(self, path):
        if not os.path.isfile(path): return self.send_error(404)
        size = os.path.getsize(path); ctype = mimetypes.guess_type(path)[0] or "application/octet-stream"
        if path.endswith(".js"): ctype = "text/javascript"
        rng = self.headers.get("Range"); a, b = 0, size - 1
        m = re.match(r"bytes=(\d*)-(\d*)", rng or "")
        if m and (m.group(1) or m.group(2)):
            if m.group(1): a = int(m.group(1)); b = int(m.group(2)) if m.group(2) else size - 1
            else: a = size - int(m.group(2))
            b = min(b, size - 1)
            self.send_response(206); self.send_header("Content-Range", f"bytes {a}-{b}/{size}")
        else:
            self.send_response(200)
        self.send_header("Content-Type", ctype); self.send_header("Accept-Ranges", "bytes"); self.send_header("Content-Length", str(b - a + 1))
        self.send_header("Cache-Control", "no-cache"); self.end_headers()
        with open(path, "rb") as fh:
            fh.seek(a); left = b - a + 1
            try:
                while left > 0:
                    chunk = fh.read(min(1 << 20, left))
                    if not chunk: break
                    self.wfile.write(chunk); left -= len(chunk)
            except (BrokenPipeError, ConnectionResetError): pass

    def _safe(self, base, rel):
        p = os.path.normpath(os.path.join(base, rel))   # normpath, not realpath: node_modules may be a symlink
        return p if p == base or p.startswith(base + os.sep) else None

    def do_GET(self):
        u = urllib.parse.urlparse(self.path); path = urllib.parse.unquote(u.path)
        if path == "/api/meta": return self._json(meta())
        if path == "/api/version": return self._json(version())
        if path == "/api/notes": return self._json(NOTES.load(C["root"]))
        if path == "/api/patches":
            for pid, j in list(JOBS.items()):
                if j["proc"].poll() is not None: JOBS.pop(pid)
            return self._json({"patches": patches(), "running": [{"pid": k, "t0": v["t0"], "t1": v["t1"]} for k, v in JOBS.items()]})
        if path.startswith("/p/"):
            p = self._safe(C["root"], path[3:]); return self._file(p) if p else self.send_error(403)
        p = self._safe(UI, (path.lstrip("/") or "index.html"))
        return self._file(p) if p else self.send_error(403)

    def do_POST(self):
        if self.headers.get("Origin") not in (None, f"http://127.0.0.1:{self.server.server_port}", f"http://localhost:{self.server.server_port}"):
            return self._json({"error": "origin"}, 403)
        n = int(self.headers.get("Content-Length") or 0)
        if n > 9_000_000: return self._json({"error": "too big"}, 413)
        try: body = json.loads(self.rfile.read(n) or b"null")
        except Exception: return self._json({"error": "bad json"}, 400)
        path = urllib.parse.urlparse(self.path).path
        if path == "/api/notes":
            if not isinstance(body, dict) or body.get("op") not in ("add", "edit", "status", "send", "archive"): return self._json({"error": "op"}, 400)
            if body.get("op") == "status" and body.get("status") not in ("baru", "selesai"): return self._json({"error": "status"}, 400)   # Claude-side states come from notes.py
            try: return self._json(NOTES.apply_op(C["root"], body))
            except (KeyError, ValueError, TypeError) as e: return self._json({"error": str(e)}, 400)
        if path == "/api/patch":
            try: return self._json(run_patch(body))
            except (KeyError, ValueError, TypeError) as e: return self._json({"error": str(e)}, 400)
        return self._json({"error": "unknown"}, 404)


def fmt(t):
    t = float(t); return f"{int(t // 60):02d}:{t % 60:05.2f}"


def main():
    global C
    ap = argparse.ArgumentParser(); ap.add_argument("project"); ap.add_argument("--port", type=int, default=8765)
    a = ap.parse_args()
    C = project_cfg(a.project)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", a.port), H)
    print(f"Studio {os.path.basename(C['root'])}: http://127.0.0.1:{a.port}   (frames: {C['frames']}, audio: {C['audio']})", flush=True)
    srv.serve_forever()


if __name__ == "__main__":
    main()
