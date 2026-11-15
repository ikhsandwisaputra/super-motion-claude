"""Revision notes shared by the Studio (Ikhsan) and Claude. One file per project: build/studio_notes.json.
Every change goes through apply_op() under a lock, so the Studio and Claude never overwrite each other.

Status flow: baru -> antri (Ikhsan clicked "Kirim ke Claude") -> dikerjakan -> siap dicek -> selesai
Each "antri" also appends a line to build/studio_queue.log, which Claude's session watches.

Claude CLI:
  python -I tools/studio/notes.py <project> list [--status antri]
  python -I tools/studio/notes.py <project> set <id> dikerjakan
  python -I tools/studio/notes.py <project> set <id> "siap dicek" --reply "subtitle dimatikan 05:32-05:35, cek di Live"
"""
import argparse, base64, fcntl, json, os, sys, time

STATUSES = ["baru", "antri", "dikerjakan", "siap dicek", "selesai"]


def _paths(root):
    b = os.path.join(root, "build"); os.makedirs(b, exist_ok=True)
    return os.path.join(b, "studio_notes.json"), os.path.join(b, "studio_notes.lock"), os.path.join(b, "studio_queue.log"), os.path.join(b, "studio_notes.md")


def fmt(t):
    t = float(t); return f"{int(t // 60):02d}:{t % 60:05.2f}"


def load(root):
    p = _paths(root)[0]
    try: notes = json.load(open(p, encoding="utf-8"))
    except Exception: notes = []
    for n in notes:   # migrate the first version (done flag only)
        n.setdefault("status", "selesai" if n.get("done") else "baru")
    return notes


def apply_op(root, op):
    """op: {op: add|edit|status|send|archive, id, ...}. Returns the full note list."""
    p, lock, queue, md = _paths(root)
    with open(lock, "w") as lk:
        fcntl.flock(lk, fcntl.LOCK_EX)
        notes = load(root)
        now = time.strftime("%Y-%m-%d %H:%M:%S")
        k = op.get("op")
        if k == "add":
            text = str(op.get("text", "")).strip()[:2000]
            if not text: raise ValueError("teks kosong")
            n = {"id": int(time.time() * 1000), "t0": round(float(op["t0"]), 2), "t1": round(float(op["t1"]), 2), "text": text,
                 "status": "baru", "created": now, "log": []}
            mk = op.get("marks")
            if isinstance(mk, dict) and isinstance(mk.get("boxes"), list):   # areas marked on the preview, film pixels (1920x1080)
                n["marks"] = {"t": round(float(mk.get("t", n["t0"])), 3),
                              "boxes": [[int(max(0, min(1920, float(v)))) for v in b[:4]] for b in mk["boxes"][:12] if isinstance(b, list) and len(b) >= 4]}
            shot = op.get("shot")
            if isinstance(shot, str) and shot.startswith("data:image/jpeg;base64,") and len(shot) < 8_000_000:
                d = os.path.join(root, "build/studio_shots"); os.makedirs(d, exist_ok=True)
                open(os.path.join(d, f"{n['id']}.jpg"), "wb").write(base64.b64decode(shot.split(",", 1)[1]))
                n["shot"] = f"build/studio_shots/{n['id']}.jpg"
            notes.append(n)
            if op.get("send"): k, op = "send", {"op": "send", "id": n["id"]}
        n = next((x for x in notes if x["id"] == op.get("id")), None) if k != "add" else None
        if k in ("edit", "status", "send", "archive") and n is None: raise ValueError("catatan tidak ditemukan")
        if k == "edit":
            n["text"] = str(op.get("text", n["text"])).strip()[:2000]
            if "t0" in op: n["t0"], n["t1"] = round(float(op["t0"]), 2), round(float(op["t1"]), 2)
        elif k == "status":
            st = op.get("status")
            if st not in STATUSES: raise ValueError("status tidak dikenal")
            n["status"] = st; n.setdefault("log", []).append({"at": now, "status": st, "by": op.get("by", "studio"), "msg": str(op.get("reply", ""))[:1000]})
            if op.get("reply"): n["reply"] = str(op["reply"])[:1000]
        elif k == "send":
            n["status"] = "antri"; n.setdefault("log", []).append({"at": now, "status": "antri", "by": "ikhsan"})
            with open(queue, "a", encoding="utf-8") as q:
                extra = ""
                if n.get("marks"): extra += f" || area@{fmt(n['marks']['t'])} (x,y,w,h film px): " + "; ".join(f"#{i + 1} {b}" for i, b in enumerate(n["marks"]["boxes"]))
                if n.get("shot"): extra += f" || shot: {os.path.join(root, n['shot'])}"
                q.write(f"ANTRI id={n['id']} {fmt(n['t0'])}-{fmt(n['t1'])} :: {n['text'].replace(chr(10), ' / ')}{extra}\n")
        elif k == "archive":
            n["archived"] = True
        notes.sort(key=lambda x: x["t0"])
        json.dump(notes, open(p + ".tmp", "w", encoding="utf-8"), ensure_ascii=False, indent=1); os.replace(p + ".tmp", p)
        lines = ["# Catatan revisi (Studio)\n"] + [f"- [{x['status']}] {fmt(x['t0'])}–{fmt(x['t1'])}  {x['text']}" + (f"\n  ↳ Claude: {x['reply']}" if x.get("reply") else "")
                                                for x in notes if not x.get("archived")]
        open(md, "w", encoding="utf-8").write("\n".join(lines) + "\n")
        return notes


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("project"); sub = ap.add_subparsers(dest="cmd", required=True)
    l = sub.add_parser("list"); l.add_argument("--status")
    s = sub.add_parser("set"); s.add_argument("id", type=int); s.add_argument("status", choices=STATUSES); s.add_argument("--reply", default="")
    a = ap.parse_args(); root = os.path.abspath(a.project)
    if a.cmd == "list":
        for n in load(root):
            if n.get("archived") or (a.status and n["status"] != a.status): continue
            print(f"{n['id']}  [{n['status']}]  {fmt(n['t0'])}-{fmt(n['t1'])}  {n['text']}" + (f"\n      area@{fmt(n['marks']['t'])}: {n['marks']['boxes']}" if n.get("marks") else "")
                  + (f"\n      shot: {os.path.join(root, n['shot'])}" if n.get("shot") else "") + (f"\n      ↳ {n['reply']}" if n.get("reply") else ""))
    else:
        apply_op(root, {"op": "status", "id": a.id, "status": a.status, "reply": a.reply, "by": "claude"}); print("ok")


if __name__ == "__main__":
    main()
