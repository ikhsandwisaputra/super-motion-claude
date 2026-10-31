#!/usr/bin/env python
"""Technique ledger: one entry per motion technique we have learned, with where it came from, which film used it,
what was measured and what Ikhsan said. It is the knowledge log of continual learning: techniques are not
forgotten between films, a rejected one is not quietly reused, and a new film starts from a menu ranked by proof.

  python -I ledger.py menu [--recipe clean] [--kind transition] [-q "spring"]   ranked menu for the next film (G0)
  python -I ledger.py list [--status proven] [--kind type]                     table of entries
  python -I ledger.py show <id>
  python -I ledger.py add --id ID --name NAME --kind KIND --status STATUS --lesson "rule" [--source PATH ...]
                          [--recipe clean ...] [--visible] [--film video-4 --where file:line --evidence "numbers"]
  python -I ledger.py verdict <id> --film video-4 --verdict liked|rejected|mixed --note "Ikhsan's words"
  python -I ledger.py render                                                   rewrite technique-ledger.md
  python -I ledger.py check                                                    schema + source paths exist

Status, strongest first: proven (in a film Ikhsan liked, or he asked for it) · kiblat (seen in ≥ 2 liked references,
not yet ours) · experimental (used by us, no verdict yet) · candidate (learned from a note or docs, not used in a film
yet) · retired (part of a rejected film) · avoid (breaks the kiblat signatures or originality). A verdict moves the
status: liked -> proven, rejected -> retired, mixed -> stays. Using a candidate in a film: re-add it as experimental.
Data: ../references/technique-ledger.jsonl (source of truth) and ../references/technique-ledger.md (rendered view).
"""
import argparse
import datetime
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(HERE, "..", "references")
DATA = os.environ.get("MOTION_LEDGER") or os.path.join(REF, "technique-ledger.jsonl")   # env override = test on a copy
VIEW = os.path.splitext(DATA)[0] + ".md"
STATUS = ["proven", "kiblat", "experimental", "candidate", "retired", "avoid"]
KINDS = ["transition", "entrance", "type", "camera", "physics", "timing", "shape", "texture", "optics", "colour", "structure", "sound", "process"]
RECIPES = ["clean", "brutal", "cinematic", "character", "soft", "data", "luxury", "playful", "showreel", "any"]

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass


def load():
    if not os.path.exists(DATA):
        return []
    return [json.loads(l) for l in open(DATA, encoding="utf-8") if l.strip()]


def save(items):
    items = sorted(items, key=lambda e: (STATUS.index(e["status"]), e["kind"], e["id"]))
    with open(DATA, "w", encoding="utf-8") as f:
        for e in items:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")


def find(items, i):
    for e in items:
        if e["id"] == i:
            return e
    sys.exit(f"no technique '{i}' (ledger.py list)")


def today():
    return datetime.date.today().isoformat()


def rank(e):
    liked = sum(1 for f in e.get("films", []) if f.get("verdict") == "liked")
    return (STATUS.index(e["status"]), -liked, e["id"])


def table(rows):
    out = ["| id | status | kind | visible | films | lesson |", "|---|---|---|---|---|---|"]
    for e in rows:
        films = ", ".join(f"{f['film']}:{f.get('verdict', '?')}" for f in e.get("films", [])) or "–"
        out.append(f"| `{e['id']}` | {e['status']} | {e['kind']} | {'yes' if e.get('visible') else 'no'} | {films} | {e['lesson']} |")
    return "\n".join(out)


def cmd_menu(a, items):
    rows = [e for e in items if e["status"] not in ("retired", "avoid")]
    if a.recipe:
        rows = [e for e in rows if a.recipe in e.get("recipes", []) or "any" in e.get("recipes", [])]
    if a.kind:
        rows = [e for e in rows if e["kind"] == a.kind]
    if a.q:
        q = a.q.lower()
        rows = [e for e in rows if q in (e["id"] + e["name"] + e["lesson"] + " ".join(e.get("tags", []))).lower()]
    rows.sort(key=rank)
    print(f"Menu ({len(rows)} techniques, strongest proof first). Visible ones count toward the motif lock (max 3 per film).\n")
    print(table(rows))
    banned = [e for e in items if e["status"] in ("retired", "avoid") and (not a.kind or e["kind"] == a.kind)]
    if banned:
        print("\nNot on the menu (say why if you reuse one): " + "; ".join(f"`{e['id']}` ({e['status']}: {e['lesson']})" for e in banned))


def cmd_list(a, items):
    rows = [e for e in items if (not a.status or e["status"] == a.status) and (not a.kind or e["kind"] == a.kind)]
    print(table(sorted(rows, key=rank)))


def cmd_show(a, items):
    print(json.dumps(find(items, a.id), ensure_ascii=False, indent=1))


def cmd_add(a, items):
    if any(e["id"] == a.id for e in items):
        sys.exit(f"'{a.id}' exists — use verdict, or edit the jsonl on purpose")
    e = {"id": a.id, "name": a.name, "kind": a.kind, "visible": a.visible, "status": a.status, "lesson": a.lesson,
         "recipes": a.recipe or ["any"], "source": a.source or [], "tags": a.tag or [], "films": [], "updated": today()}
    if a.film:
        e["films"].append({"film": a.film, "where": a.where or "", "verdict": "pending", "evidence": a.evidence or ""})
    items.append(e); save(items); render(items)
    print(f"added {a.id} ({a.status})")


def cmd_verdict(a, items):
    e = find(items, a.id)
    f = next((x for x in e.get("films", []) if x["film"] == a.film), None)
    if f is None:
        f = {"film": a.film, "where": ""}
        e.setdefault("films", []).append(f)
    f["verdict"] = a.verdict
    if a.note:
        f["note"] = a.note
    old = e["status"]
    if a.verdict == "liked" and old in ("experimental", "kiblat", "candidate"):
        e["status"] = "proven"
    elif a.verdict == "rejected" and old in ("experimental", "kiblat", "candidate", "proven"):
        e["status"] = "retired"
    e["updated"] = today()
    save(items); render(items)
    print(f"{a.id}: {a.film} {a.verdict} · status {old} -> {e['status']}")


def render(items):
    L = ["# Technique ledger (rendered from technique-ledger.jsonl — edit through `scripts/ledger.py`)", "",
         "Every motion technique we have learned: where it came from, which film used it, what was measured and what "
         "Ikhsan said. Start every film with `ledger.py menu --recipe <recipe>`; after his verdict run `ledger.py verdict`. "
         "Film-level verdicts are his words; technique-level evidence says when it is only measured.", ""]
    for s in STATUS:
        rows = sorted([e for e in items if e["status"] == s], key=rank)
        if not rows:
            continue
        L += [f"## {s} ({len(rows)})", "", table(rows), ""]
        for e in rows:
            src = "; ".join(e.get("source", [])) or "–"
            ev = " · ".join(f"{f['film']}: {f.get('evidence') or f.get('note') or ''}".strip() for f in e.get("films", []) if f.get("evidence") or f.get("note"))
            L.append(f"- **{e['name']}** (`{e['id']}`) — source: {src}" + (f" — evidence: {ev}" if ev else ""))
        L.append("")
    open(VIEW, "w", encoding="utf-8").write("\n".join(L))


def cmd_render(a, items):
    render(items); print(VIEW)


def cmd_check(a, items):
    root = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
    bad, ids = [], set()
    for e in items:
        for k in ("id", "name", "kind", "status", "lesson"):
            if not e.get(k):
                bad.append(f"{e.get('id')}: missing {k}")
        if e["id"] in ids:
            bad.append(f"duplicate id {e['id']}")
        ids.add(e["id"])
        if e["status"] not in STATUS:
            bad.append(f"{e['id']}: status {e['status']}")
        if e["kind"] not in KINDS:
            bad.append(f"{e['id']}: kind {e['kind']}")
        for r in e.get("recipes", []):
            if r not in RECIPES:
                bad.append(f"{e['id']}: recipe {r}")
        for s in e.get("source", []):
            p = s.split("#")[0].strip()   # paths may contain spaces (the WhatsApp reference folders)
            if "/" in p and not p.startswith("memory:") and not os.path.exists(os.path.join(root, p)):
                bad.append(f"{e['id']}: source not found {p}")
    print("\n".join(bad) if bad else f"ledger ok: {len(items)} techniques, " + ", ".join(f"{s} {sum(1 for e in items if e['status'] == s)}" for s in STATUS))
    sys.exit(1 if bad else 0)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("menu"); p.add_argument("--recipe", choices=RECIPES); p.add_argument("--kind", choices=KINDS); p.add_argument("-q")
    p = sub.add_parser("list"); p.add_argument("--status", choices=STATUS); p.add_argument("--kind", choices=KINDS)
    p = sub.add_parser("show"); p.add_argument("id")
    p = sub.add_parser("add")
    for k in ("--id", "--name", "--lesson"):
        p.add_argument(k, required=True)
    p.add_argument("--kind", choices=KINDS, required=True); p.add_argument("--status", choices=STATUS, required=True)
    p.add_argument("--source", nargs="*"); p.add_argument("--recipe", nargs="*", choices=RECIPES); p.add_argument("--tag", nargs="*")
    p.add_argument("--visible", action="store_true"); p.add_argument("--film"); p.add_argument("--where"); p.add_argument("--evidence")
    p = sub.add_parser("verdict"); p.add_argument("id"); p.add_argument("--film", required=True)
    p.add_argument("--verdict", choices=["liked", "rejected", "mixed"], required=True); p.add_argument("--note")
    sub.add_parser("render"); sub.add_parser("check")
    a = ap.parse_args()
    items = load()
    {"menu": cmd_menu, "list": cmd_list, "show": cmd_show, "add": cmd_add, "verdict": cmd_verdict,
     "render": cmd_render, "check": cmd_check}[a.cmd](a, items)


if __name__ == "__main__":
    main()
