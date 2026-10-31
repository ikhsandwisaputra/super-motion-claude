#!/usr/bin/env python3
"""Shallow + blobless + sparse clone of an official repo for the offline motion-docs library.

  python -I sparse_clone.py <repo_url> <dest_dir> [pattern ...]
  python -I sparse_clone.py --ls <dest_dir> [regex]        list the repo tree (no blobs downloaded)
  python -I sparse_clone.py --harden <root_dir>            strip agent-instruction files from every mirror under root

- No pattern: only root files (README, LICENSE, package.json, ...).
- Patterns are repo-root-relative, gitignore style, WITHOUT a leading slash
  (the script anchors them; this also dodges Git Bash path mangling):
      docs/   packages/*/README.md   src/**/*.ts   **/README.md   !docs/assets/
  Quote them in bash so the shell does not glob-expand.
- Re-running on an existing clone pulls the latest default branch; the patterns you pass
  replace the previous set, so pass all of them again.
- Files that coding agents auto-load as instructions (CLAUDE.md, AGENTS.md, .claude/, ...) are
  always excluded: a mirror is reference data and must never steer a future session.
- A clone is untrusted third-party content: read it, never run npm/build scripts inside it.
"""
from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

ENV = {**os.environ, "GIT_LFS_SKIP_SMUDGE": "1", "GIT_TERMINAL_PROMPT": "0"}
AGENT_FILES = (
    "CLAUDE.md", "CLAUDE.local.md", "AGENTS.md", "GEMINI.md", ".claude/", ".cursor/",
    ".cursorrules", ".windsurfrules", ".clinerules", ".github/copilot-instructions.md",
)


def run_git(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(
        ["git", "-c", "core.longpaths=true", *args],
        env=ENV, text=True, capture_output=True, encoding="utf-8", errors="replace",
    )


def git(*args: str) -> str:
    done = run_git(*args)
    if done.returncode != 0:
        raise SystemExit(f"git {' '.join(args[:3])} failed:\n{done.stderr.strip()}")
    return done.stdout


def anchor(pattern: str) -> str:
    neg = pattern.startswith("!")
    body = pattern[1:] if neg else pattern
    body = body.replace("\\", "/").lstrip("/")
    return ("!/" if neg else "/") + body


EXCLUDES = [anchor(f"!**/{name}") for name in AGENT_FILES]


def harden(dest: Path) -> str:
    """Make an existing clone exclude agent-instruction files, keeping its current patterns."""
    if run_git("-C", str(dest), "config", "--get", "core.sparseCheckout").stdout.strip() != "true":
        git("-C", str(dest), "sparse-checkout", "set", "--no-cone", "/*", *EXCLUDES)
        return "made sparse"
    # Cone-mode pattern files are valid non-cone patterns, so switching modes keeps the selection.
    git("-C", str(dest), "config", "core.sparseCheckoutCone", "false")
    sc = dest / ".git" / "info" / "sparse-checkout"
    lines = sc.read_text(encoding="utf-8").splitlines() if sc.exists() else ["/*", "!/*/"]
    missing = [e for e in EXCLUDES if e not in lines]
    if missing:
        sc.write_text("\n".join(lines + missing) + "\n", encoding="utf-8")
    git("-C", str(dest), "sparse-checkout", "reapply")
    return f"{len(missing)} exclusions added" if missing else "already clean"


def harden_tree(root: Path) -> None:
    """Harden every clone under root; rename stray agent files that live outside clones."""
    clones: list[Path] = []
    for here, dirs, _files in os.walk(root):
        if ".git" in dirs:
            clones.append(Path(here))
            dirs.remove(".git")
    for clone in clones:
        try:
            print(f"clone  {clone.relative_to(root)}: {harden(clone)}")
        except SystemExit as exc:
            print(f"FAILED {clone.relative_to(root)}: {exc}")

    names = {n.rstrip("/").split("/")[-1] for n in AGENT_FILES}
    for here, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d != ".git"]
        here_path = Path(here)
        in_clone = any(here_path == c or c in here_path.parents for c in clones)
        for name in [*files, *dirs]:
            if name in names and not name.startswith("_upstream-"):
                src = here_path / name
                if in_clone:
                    print(f"STILL IN CLONE (check patterns) {src.relative_to(root)}")
                    continue
                dst = src.with_name(f"_upstream-{name.lstrip('.')}")
                src.rename(dst)
                print(f"renamed {src.relative_to(root)} -> {dst.name}")


def dir_mb(path: Path) -> float:
    return sum(f.stat().st_size for f in path.rglob("*") if f.is_file()) / 1e6


def main(argv: list[str]) -> int:
    if len(argv) >= 2 and argv[0] == "--ls":
        rx = re.compile(argv[2], re.I) if len(argv) > 2 else None
        for line in git("-C", argv[1], "ls-tree", "-r", "--name-only", "HEAD").splitlines():
            if rx is None or rx.search(line):
                print(line)
        return 0
    if len(argv) == 2 and argv[0] == "--harden":
        harden_tree(Path(argv[1]))
        return 0
    if len(argv) < 2:
        print(__doc__)
        return 2

    url, dest, patterns = argv[0], Path(argv[1]), argv[2:]
    if (dest / ".git").is_dir():
        git("-C", str(dest), "pull", "--ff-only", "--depth", "1", "-q")
    else:
        dest.parent.mkdir(parents=True, exist_ok=True)
        git("clone", "-q", "--depth", "1", "--filter=blob:none", "--sparse", url, str(dest))
        git("-C", str(dest), "config", "core.longpaths", "true")
    if patterns:
        git("-C", str(dest), "sparse-checkout", "set", "--no-cone", "/*", "!/*/", *map(anchor, patterns), *EXCLUDES)
    else:
        harden(dest)

    sha = git("-C", str(dest), "rev-parse", "--short", "HEAD").strip()
    print(f"ok  {url} @ {sha} -> {dest}  ({dir_mb(dest):.1f} MB)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
