#!/usr/bin/env python
"""Taste replay: re-judge the films and frames that taught us the taste, after every change to the eye's rules
(eyelib), the taste formulas or the kiblat. It is the "experience replay" of continual learning: a new rule may
not erase an old lesson. Each golden film carries what it must still prove (score bands, tells that must keep
firing on the film that taught them, tells that must never fire on liked work); pairs keep liked vs disliked apart.

  python -I replay.py                      judge the golden set (golden.json) + drift vs baseline.json; exit 1 on a regression
  python -I replay.py --quick              films, pairs and posters only (skips the kiblat members)
  python -I replay.py --update -m "why"    accept the current numbers as the new baseline (after a deliberate change)
  python -I replay.py --selftest           break the rules on purpose (in memory only) and prove the alarm rings

Data lives in the workspace: my-ref/_eye/replay/{golden.json, baseline.json, history.jsonl, last_report.md, frames/, sheets/}.
Read-only towards projects: it never edits a film, a skill or a rule.
"""
import argparse
import hashlib
import importlib.util
import json
import os
import statistics
import sys
import time
from types import SimpleNamespace

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
_spec = importlib.util.spec_from_file_location("eye_cli", os.path.join(HERE, "eye.py"))
eye = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(eye)
from eyelib import poster, review  # noqa: E402  (the same module objects eye.py uses)
from eyelib import video as V  # noqa: E402

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass


def find_root(start):
    p = os.path.abspath(start)
    while True:
        if os.path.exists(os.path.join(p, "my-ref", "_eye", "replay", "golden.json")):
            return p
        q = os.path.dirname(p)
        if q == p:
            return os.path.abspath(start)
        p = q


def ns(crop=None):
    return SimpleNamespace(fps=10.0, start=0.0, seconds=None, crop=crop, src_fps=30.0, fresh=False, channel=None, allow_neon=False)


def judge_hash(root, golden_path):
    h = hashlib.sha1()
    files = [os.path.join(HERE, "eye.py")] + sorted(os.path.join(HERE, "eyelib", f) for f in os.listdir(os.path.join(HERE, "eyelib")) if f.endswith(".py"))
    files += [os.path.join(root, "my-ref", "_eye", "kiblat", "kiblat.json"), golden_path]
    for f in files:
        if os.path.exists(f):
            h.update(open(f, "rb").read())
    return h.hexdigest()[:12]


# ---------- synthetic negative posters: what the taste already rejected, drawn deterministically ----------
def make_negatives(folder):
    from PIL import Image, ImageDraw, ImageFilter, ImageFont
    os.makedirs(folder, exist_ok=True)
    def font(sz):
        for f in ("C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/arial.ttf", "/System/Library/Fonts/Menlo.ttc", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
            if os.path.exists(f):
                return ImageFont.truetype(f, sz)
        return ImageFont.load_default()
    out = {}
    # 1. video-3's failure as a still: one dark navy field, ghost code, small glowing pastel accents in many hues
    p = os.path.join(folder, "neg_dark_mud_neon.png")
    if not os.path.exists(p):
        im = Image.new("RGB", (1920, 1080), (11, 15, 26)); d = ImageDraw.Draw(im)
        for i in range(26):
            d.text((120 + (i % 3) * 40, 90 + i * 36), "const frame = render(t) // compile " + "x" * (i % 7), fill=(34, 42, 62), font=font(26))
        glow = Image.new("RGB", (1920, 1080), (0, 0, 0)); g = ImageDraw.Draw(glow)
        for j, (txt, col) in enumerate([("compile", (126, 231, 199)), ("render", (180, 140, 255)), ("director", (255, 207, 92)), ("cut", (255, 122, 154))]):
            g.text((1180, 300 + j * 90), txt, fill=col, font=font(44))
        glow = glow.filter(ImageFilter.GaussianBlur(9))
        im = Image.composite(glow, im, glow.convert("L").point(lambda v: min(255, v * 3)))
        d = ImageDraw.Draw(im)
        for j, (txt, col) in enumerate([("compile", (126, 231, 199)), ("render", (180, 140, 255)), ("director", (255, 207, 92)), ("cut", (255, 122, 154))]):
            d.text((1180, 300 + j * 90), txt, fill=col, font=font(44))
        im.save(p)
    out["neg_dark_mud_neon"] = p
    # 2. clutter: many colours, many small lines, two competing stars, nothing designed
    p = os.path.join(folder, "neg_clutter.png")
    if not os.path.exists(p):
        im = Image.new("RGB", (1920, 1080), (238, 236, 230)); d = ImageDraw.Draw(im)
        cols = [(230, 57, 70), (42, 157, 143), (233, 196, 106), (69, 123, 157), (244, 162, 97), (131, 56, 236), (6, 214, 160)]
        for i in range(60):
            x, y = (i * 211) % 1800, (i * 137) % 1000
            d.rectangle([x, y, x + 90 + (i % 5) * 30, y + 40 + (i % 3) * 20], fill=cols[i % len(cols)])
            d.text((x + 6, y + 50), f"label {i} — click here", fill=cols[(i + 3) % len(cols)], font=font(22))
        d.text((200, 380), "BIG OFFER", fill=(230, 57, 70), font=font(150)); d.text((1050, 640), "NEW!!", fill=(69, 123, 157), font=font(150))
        im.save(p)
    out["neg_clutter"] = p
    return out


# ---------- judging ----------
def judge_film(root, item, refs, n_posters, sheets_dir):
    path = os.path.join(root, item["path"])
    a = ns(item.get("crop"))
    d, _ = eye.get_dna(path, a, eye.default_out(path))
    crits, _ = eye.run_posters(path, eye.pick_times(d, n_posters), a, sheets_dir, prefix=item["id"])
    res = {}
    for chk in item["checks"]:
        r = review.score(d["summary"], crits, ref=refs[chk["ref"]]["summary"])
        res[chk["ref"]] = {"score": r["score"], "cats": {c["key"]: c["pts"] for c in r["cats"]}, "tells": [t for t, _ in r["tells"]]}
    return res


def judge_kiblat(root, spec, refs, n_posters, sheets_dir):
    ref = refs[spec["ref"]]["summary"]
    out = {}
    folder = os.path.join(root, spec["dir"])
    for name in sorted(os.listdir(folder)):
        path = os.path.join(folder, name)
        if not name.lower().endswith(V.VIDEO_EXT):
            continue
        stem = os.path.splitext(name)[0]
        cached = os.path.join(folder, "_eye", stem, "dna.json")
        crop = json.load(open(cached, encoding="utf-8")).get("sig", {}).get("crop") if os.path.exists(cached) else None
        a = ns(crop)
        d, _ = eye.get_dna(path, a, os.path.join(folder, "_eye", stem))
        crits, _ = eye.run_posters(path, eye.pick_times(d, n_posters), a, sheets_dir, prefix="kiblat_" + stem[-14:].replace(" ", "_"))
        r = review.score(d["summary"], crits, ref=ref)
        out[stem] = {"score": r["score"], "tells": [t for t, _ in r["tells"]]}
    return out


def judge_poster(root, item, neg):
    path = neg.get(item.get("synthetic")) if item.get("synthetic") else os.path.join(root, item["path"])
    rgb = V.frame_at(path, 0.0, long_side=1280, src_fps=30.0, crop=None)
    c = poster.critique(rgb, channel=item.get("channel"), allow_neon=False)
    return {"score": c["score"], "fails": [i["key"] for i in c["items"] if i["ok"] is False]}


def run_all(root, golden, quick=False):
    rp = os.path.join(root, "my-ref", "_eye", "replay")
    sheets_dir = os.path.join(rp, "sheets"); os.makedirs(sheets_dir, exist_ok=True)
    refs = {k: eye.load_dna(os.path.join(root, v)) for k, v in golden["refs"].items()}
    n = 4 if quick else golden.get("posters_per_film", 8)
    cur = {"films": {}, "posters": {}, "kiblat": {}}
    for f in golden["films"]:
        print(f"· film {f['id']} …", flush=True)
        cur["films"][f["id"]] = judge_film(root, f, refs, n, sheets_dir)
    neg = make_negatives(os.path.join(rp, "frames"))
    for p in golden.get("posters", []):
        cur["posters"][p["id"]] = judge_poster(root, p, neg)
    if not quick and golden.get("kiblat_members"):
        print("· kiblat members …", flush=True)
        cur["kiblat"] = judge_kiblat(root, golden["kiblat_members"], refs, golden["kiblat_members"].get("posters", 4), sheets_dir)
    return cur


# ---------- the lessons (golden.json) and drift (baseline.json) ----------
POSTER_TELLS = {"Hierarki tipe tanggung", "Licin plastik (tanpa grain) di atas gelap"}  # depend on which frames are sampled


def evaluate(golden, cur, base, quick=False):
    fails, warns = [], []
    drift = golden.get("drift_warn", 6)
    # a quick run (4 posters) vs a full baseline (8): poster-sampled tells and the poster category are not comparable
    same_mode = bool((base or {}).get("quick", False)) == quick
    noisy = set() if same_mode else POSTER_TELLS
    for f in golden["films"]:
        r = cur["films"][f["id"]]
        for chk in f["checks"]:
            x = r[chk["ref"]]
            s, tells = x["score"], set(x["tells"])
            if "min" in chk and s < chk["min"]:
                fails.append(f"{f['id']} vs {chk['ref']}: {s} < min {chk['min']} — karya yang disukai turun nilainya")
            if "max" in chk and s > chk["max"]:
                fails.append(f"{f['id']} vs {chk['ref']}: {s} > max {chk['max']} — karya yang ditolak dinilai bagus lagi")
            for t in f.get("must_tell", []):
                if t not in tells:
                    fails.append(f"{f['id']} vs {chk['ref']}: tell '{t}' tidak menyala lagi — pelajaran dari film ini terlupa")
            for t in f.get("must_not_tell", []):
                if t in tells:
                    fails.append(f"{f['id']} vs {chk['ref']}: tell '{t}' menyala di karya yang disukai")
            b = (((base or {}).get("films") or {}).get(f["id"]) or {}).get(chk["ref"])
            if b:
                if abs(s - b["score"]) >= drift:
                    warns.append(f"{f['id']} vs {chk['ref']}: skor {b['score']} → {s}")
                for k, v in x["cats"].items():
                    if k == "poster" and not same_mode:
                        continue
                    if k in b["cats"] and v != b["cats"][k]:
                        warns.append(f"{f['id']} vs {chk['ref']}: kategori {k} {b['cats'][k]} → {v}")
                gone, new = (set(b["tells"]) - tells) - noisy, (tells - set(b["tells"])) - noisy
                if gone:
                    warns.append(f"{f['id']} vs {chk['ref']}: tell hilang {sorted(gone)}")
                if new:
                    warns.append(f"{f['id']} vs {chk['ref']}: tell baru {sorted(new)}")
    for p in golden.get("pairs", []):
        g = cur["films"][p["good"]][p["ref"]]["score"]; b = cur["films"][p["bad"]][p["ref"]]["score"]
        if g - b < p["margin"]:
            fails.append(f"jarak {p['good']} − {p['bad']} vs {p['ref']} = {g - b} < {p['margin']} — mata tidak lagi membedakan yang disukai dari yang ditolak")
    for p in golden.get("posters", []):
        x = cur["posters"][p["id"]]
        if "min" in p and x["score"] < p["min"]:
            fails.append(f"poster {p['id']}: {x['score']} < min {p['min']} (gagal di {x['fails']})")
        if "max" in p and x["score"] > p["max"]:
            fails.append(f"poster {p['id']}: {x['score']} > max {p['max']} — frame yang mestinya ditolak lolos")
        b = (((base or {}).get("posters") or {}).get(p["id"]))
        if b and abs(x["score"] - b["score"]) >= drift:
            warns.append(f"poster {p['id']}: {b['score']} → {x['score']}")
    km = golden.get("kiblat_members")
    if km and cur.get("kiblat"):
        sc = [v["score"] for v in cur["kiblat"].values()]
        med, lo = statistics.median(sc), min(sc)
        if med < km["min_median"]:
            fails.append(f"kiblat: median {med} < {km['min_median']} — mata tidak lagi menyukai video yang Ikhsan sukai")
        if lo < km["min_each"]:
            worst = min(cur["kiblat"], key=lambda k: cur["kiblat"][k]["score"])
            fails.append(f"kiblat: {worst} = {lo} < {km['min_each']}")
        b = (base or {}).get("kiblat") or {}
        for k, v in cur["kiblat"].items():
            if k in b and abs(v["score"] - b[k]["score"]) >= drift:
                warns.append(f"kiblat {k}: {b[k]['score']} → {v['score']}")
    return fails, warns


def report(golden, cur, fails, warns, jh, path):
    L = [f"# Taste replay — {time.strftime('%Y-%m-%d %H:%M')} · judge {jh}", "", "| item | vs | skor | target | tells |", "|---|---|---|---|---|"]
    for f in golden["films"]:
        for chk in f["checks"]:
            x = cur["films"][f["id"]][chk["ref"]]
            tgt = (f"≥ {chk['min']}" if "min" in chk else "") + (f"≤ {chk['max']}" if "max" in chk else "")
            L.append(f"| {f['id']} ({f['role']}) | {chk['ref']} | {x['score']} | {tgt} | {', '.join(x['tells']) or '–'} |")
    for p in golden.get("posters", []):
        x = cur["posters"][p["id"]]
        tgt = (f"≥ {p['min']}" if "min" in p else "") + (f"≤ {p['max']}" if "max" in p else "")
        L.append(f"| poster {p['id']} ({p['role']}) | poster | {x['score']} | {tgt} | gagal: {', '.join(x['fails']) or '–'} |")
    if cur.get("kiblat"):
        sc = sorted(cur["kiblat"].items(), key=lambda kv: kv[1]["score"])
        L.append(f"| kiblat ×{len(sc)} | kiblat | median {statistics.median(v['score'] for _, v in sc)}, min {sc[0][1]['score']} ({sc[0][0][-14:]}) | ≥ {golden['kiblat_members']['min_median']} / {golden['kiblat_members']['min_each']} | |")
    L += ["", f"**{'REGRESI' if fails else 'LULUS'}** — {len(fails)} gagal, {len(warns)} peringatan"]
    L += [f"- ✗ {x}" for x in fails] + [f"- ⚠ {x}" for x in warns]
    open(path, "w", encoding="utf-8").write("\n".join(L) + "\n")
    return "\n".join(L)


def selftest(root, golden, base):
    """Break three rules in memory and check that the replay fails each time (an alarm that never rings is no alarm)."""
    cases = []
    orig_tells, orig_score, orig_crit = review.tells, review.score, poster.critique
    def forget_mud(s, posters=(), ref=None):
        return [t for t in orig_tells(s, posters, ref) if t[0] not in ("Lumpur gelap", "Satu latar gelap sepanjang film")]
    def inflate(*a, **k):
        r = orig_score(*a, **k); r["score"] = min(100, r["score"] + 30); return r
    def blind(*a, **k):
        c = orig_crit(*a, **k); c["score"], c["pass"] = 100, True; return c
    for name, patch, restore in [
        ("lupa pelajaran 'lumpur gelap' (tell dihapus)", lambda: setattr(review, "tells", forget_mud), lambda: setattr(review, "tells", orig_tells)),
        ("semua skor film +30 (hakim jadi murah hati)", lambda: setattr(review, "score", inflate), lambda: setattr(review, "score", orig_score)),
        ("poster selalu 100 (mata buta frame diam)", lambda: setattr(poster, "critique", blind), lambda: setattr(poster, "critique", orig_crit)),
    ]:
        patch()
        try:
            cur = run_all(root, golden, quick=True)
            fails, _ = evaluate(golden, cur, base, quick=True)
        finally:
            restore()
        cases.append((name, len(fails), fails[:2]))
    ok = all(n > 0 for _, n, _ in cases)
    for name, n, ex in cases:
        print(f"{'✓' if n else '✗'} {name}: {n} kegagalan terdeteksi" + (f" — mis. {ex[0]}" if ex else " — ALARM DIAM"))
    print("SELFTEST " + ("LULUS: replay menangkap ketiga jenis lupa" if ok else "GAGAL: ada kerusakan yang lolos"))
    return ok


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", default=".")
    ap.add_argument("--quick", action="store_true")
    ap.add_argument("--update", action="store_true")
    ap.add_argument("-m", "--message", default="")
    ap.add_argument("--selftest", action="store_true")
    a = ap.parse_args()
    root = find_root(a.root)
    rp = os.path.join(root, "my-ref", "_eye", "replay")
    gpath = os.path.join(rp, "golden.json")
    golden = json.load(open(gpath, encoding="utf-8"))
    bpath = os.path.join(rp, "baseline.json")
    base = json.load(open(bpath, encoding="utf-8")) if os.path.exists(bpath) else None
    jh = judge_hash(root, gpath)
    if a.selftest:
        sys.exit(0 if selftest(root, golden, base) else 1)
    if a.update and not a.message:
        sys.exit("--update needs -m \"why the taste changed\" (it goes into history.jsonl)")
    t0 = time.time()
    cur = run_all(root, golden, quick=a.quick)
    fails, warns = evaluate(golden, cur, None if a.update else base, quick=a.quick)
    txt = report(golden, cur, fails, warns, jh, os.path.join(rp, "last_report.md"))
    print("\n" + txt + f"\n\n({time.time() - t0:.0f} s) files: {os.path.join(rp, 'last_report.md')}  ·  sheets: {os.path.join(rp, 'sheets')}")
    entry = {"ts": time.strftime("%Y-%m-%dT%H:%M:%S"), "judge": jh, "quick": a.quick, "update": a.update, "message": a.message,
             "fails": fails, "warns": len(warns), "films": {k: {r: v[r]["score"] for r in v} for k, v in cur["films"].items()},
             "posters": {k: v["score"] for k, v in cur["posters"].items()},
             "kiblat_median": statistics.median(v["score"] for v in cur["kiblat"].values()) if cur.get("kiblat") else None}
    with open(os.path.join(rp, "history.jsonl"), "a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
    if a.update:
        if fails:
            sys.exit("baseline NOT updated: the golden lessons fail — fix the rule or change golden.json on purpose first")
        if a.quick and base:
            cur["kiblat"] = base.get("kiblat", {})
        json.dump({"judge": jh, "ts": entry["ts"], "message": a.message, "quick": a.quick, **cur}, open(bpath, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"baseline updated ({jh}): {a.message}")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
