#!/usr/bin/env python3
"""Pustaka kode Super Motion: katalog, cari, lihat, pakai, panen, segar, cek. Hanya stdlib.

  .venv/bin/python -I aset/_pustaka/tools/pustaka.py index                  # katalog.json, INDEX.md, RESEP.md, galeri/src/sections.js
  .venv/bin/python -I aset/_pustaka/tools/pustaka.py cari gembok kunci      # id, lihat, tag, catatan (+ stasiun film lama di RESEP.md)
  .venv/bin/python -I aset/_pustaka/tools/pustaka.py lihat prop.gembok      # entri + komentar + tanda tangan + ledger + cooldown
  .venv/bin/python -I aset/_pustaka/tools/pustaka.py pakai <slug> [--portal garis-pindai]    # snapshot js/ → aset/<slug>/kit/pustaka
  .venv/bin/python -I aset/_pustaka/tools/pustaka.py panen <slug> [--catat --bintang "Nama:kunci+kunci;Nama2:kunci" --portal portal.x]
  .venv/bin/python -I aset/_pustaka/tools/pustaka.py segar [--film <slug>]  # kartu kesegaran untuk G0
  .venv/bin/python -I aset/_pustaka/tools/pustaka.py cek                    # export, node --check, determinisme, import, galeri, INDEX
Film yang sudah dirender hanya dibaca. `pakai` menolak film yang sudah punya out/*.mp4 (kecuali --paksa) dan tidak pernah menimpa
file: portal dan sfx lama digeser ke .bak-<waktu>, snapshot hanya menambah file yang belum ada.
"""
import argparse, bisect, datetime, fnmatch, hashlib, json, os, re, shutil, subprocess, sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]                  # aset/_pustaka
ASET, WS = ROOT.parent, ROOT.parent.parent
KAT, JS, GAL, SFX = ROOT / 'katalog.d', ROOT / 'js', ROOT / 'galeri', ROOT / 'sfx'
SRC, REG = GAL / 'src', ROOT / 'register.json'
TPL, TRANS = ASET / '_template-longform', ASET / '_transisi'
LEDGER = WS / '.claude' / 'skills' / 'motion-taste' / 'references' / 'technique-ledger.jsonl'
ORDER = ['dasar', 'prop', 'tipo', 'ui', 'data', 'peta', 'efek', 'hits', 'penutup', 'bintang', 'portal']
MARK = {'bintang': '★ ', 'ciri': '◆ ', 'alat': ''}
NEED = ('id', 'nama', 'file', 'tier', 'lihat', 'panggil', 'asal')
TODAY = datetime.date.today().isoformat()
STAMP = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
KIT_IMPORTS = ('../kit.js', '../draw.js', '../engine.js', '../txlib.js')


def rel(p):
    return os.path.relpath(p, WS)


def sha(p):
    return hashlib.sha1(Path(p).read_bytes()).hexdigest()[:12]


def mod_key(name):
    base = name.split('-')[0]
    return (ORDER.index(base) if base in ORDER else len(ORDER), base, name)


def write_if_changed(p, text):
    if p.exists() and p.read_text(encoding='utf-8') == text:
        return False
    p.write_text(text, encoding='utf-8')
    return True


# ── data ──────────────────────────────────────────────────────────────────────────────────────────────────────────
def load_katalog():
    items, errs = [], []
    for p in sorted(KAT.glob('*.json'), key=lambda p: mod_key(p.stem)):
        try:
            arr = json.loads(p.read_text(encoding='utf-8'))
        except (json.JSONDecodeError, UnicodeDecodeError) as e:
            errs.append(f'{p.name}: JSON rusak: {e}')
            continue
        if not isinstance(arr, list):
            errs.append(f'{p.name}: isinya harus array')
            continue
        for e in arr:
            if not isinstance(e, dict):
                errs.append(f'{p.name}: ada entri yang bukan objek')
                continue
            e['_frag'] = p.stem
            miss = [k for k in NEED if not e.get(k)]
            if miss:
                errs.append(f"{p.name}: {e.get('id', '?')} tanpa {', '.join(miss)}")
            if e.get('tier') not in MARK:
                errs.append(f"{p.name}: {e.get('id', '?')} tier '{e.get('tier')}' (harus ciri/alat/bintang)")
            e.setdefault('id', '?'); e.setdefault('film', []); e.setdefault('tag', [])
            items.append(e)
    for i, n in Counter(e['id'] for e in items).items():
        if n > 1:
            errs.append(f'id ganda: {i} ×{n}')
    return items, errs


def load_reg():
    r = json.loads(REG.read_text(encoding='utf-8')) if REG.exists() else {}
    r.setdefault('film', []); r.setdefault('aturan', {}); r.setdefault('larangan', {})
    r['film'].sort(key=lambda f: f.get('urut', 0))
    return r


def kode(reg, slug):
    return next((f.get('kode') or slug for f in reg['film'] if f['slug'] == slug), slug)


def load_ledger():
    last = {}
    if LEDGER.exists():
        for line in LEDGER.read_text(encoding='utf-8').splitlines():
            try:
                r = json.loads(line) if line.strip() else None
            except json.JSONDecodeError:
                r = None
            if r and 'id' in r:
                last[r['id']] = r
    return last


def cooldown(reg, film=None):
    """{kunci: (kode film, nama)} for the headline ideas + portal of the last N films before `film` (or the newest)."""
    n = reg['aturan'].get('cooldown_film', 2)
    films = [f for f in reg['film'] if f['slug'] != film][-n:]
    out = {}
    for f in films:
        for b in f.get('bintang', []) + ([f['portal']] if f.get('portal') else []):
            for k in b.get('kunci', []):
                out[k] = (f.get('kode', f['slug']), b.get('nama', k))
    return out, films


def larangan(reg, key):
    for pat, why in reg['larangan'].items():
        if fnmatch.fnmatch(key, pat):
            return why
    return ''


# ── JS parsing (heuristic, enough for our own code style) ─────────────────────────────────────────────────────────
EXP_FN = re.compile(r'^export\s+(?:async\s+)?function\s*\*?\s*([\w$]+)', re.M)
EXP_VAR = re.compile(r'^export\s+(?:const|let|var)\s+', re.M)
EXP_LIST = re.compile(r'^export\s*\{([^}]*)\}', re.M)


def decl_names(s, i):
    """Names declared by `a = 1, b = (x, y) => …` starting at s[i], up to `;` or a line end at bracket depth 0."""
    out, depth, n, expect = [], 0, len(s), True
    while i < n:
        if expect:
            m = re.compile(r'\s*([\w$]+)\s*=(?![=>])').match(s, i)
            if not m:
                break
            out.append(m.group(1)); i = m.end(); expect = False
            continue
        c = s[i]
        if c in '([{':
            depth += 1
        elif c in ')]}':
            depth -= 1
        elif c in '\'"`':
            j = i + 1
            while j < n and s[j] != c:
                j += 2 if s[j] == '\\' else 1
            i = j
        elif depth == 0 and c == ',':
            expect = True
        elif depth == 0 and c == ';':
            break
        elif depth == 0 and c == '\n' and s[:i].rstrip()[-1:] not in (',', '=', '(', '[', '{', '?', ':', '+', '-', '*', '|', '&'):
            break
        i += 1
    return out


def exports(path):
    s = Path(path).read_text(encoding='utf-8')
    names = EXP_FN.findall(s)
    for m in EXP_VAR.finditer(s):
        names += decl_names(s, m.end())
    for m in EXP_LIST.finditer(s):
        names += [p.split(' as ')[-1].strip() for p in m.group(1).split(',') if p.strip()]
    return names


def vault_exports():
    """{name: module path relative to js/} for every js module except portals."""
    out = {}
    for p in sorted(JS.glob('*.js')):
        for n in exports(p):
            out.setdefault(n, p.name)
    return out


def kit_exports():
    names = set()
    for p in (TPL / 'kit' / 'kit.js', TPL / 'kit' / 'draw.js', TPL / '_chapter' / 'src' / 'engine.js'):
        if p.exists():
            names |= set(exports(p))
    return names


def skip_to_close(s, i):
    """s[i] is an opening bracket: index just past its match (strings and comments skipped)."""
    depth, n = 0, len(s)
    while i < n:
        c = s[i]
        if c in '\'"`':
            j = i + 1
            while j < n and s[j] != c:
                j += 2 if s[j] == '\\' else 1
            i = j + 1
            continue
        if c == '/' and s[i + 1:i + 2] == '/':
            j = s.find('\n', i)
            i = n if j < 0 else j
            continue
        if c == '/' and s[i + 1:i + 2] == '*':
            j = s.find('*/', i + 2)
            i = n if j < 0 else j + 2
            continue
        if c in '([{':
            depth += 1
        elif c in ')]}':
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return n


FN_DEF = re.compile(r'^[ \t]*(?:export\s+)?(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)\s*\(|'
                    r'^[ \t]*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?'
                    r'(?:\([^()]*(?:\([^()]*\)[^()]*)*\)|[A-Za-z_$][\w$]*)\s*=>', re.M)


def functions(s):
    """[(name, line, n_lines, comment above, uses film beats A.*)] for named functions and arrow consts."""
    starts = [0] + [m.end() for m in re.finditer('\n', s)]
    lines = s.split('\n')
    out = []
    for m in FN_DEF.finditer(s):
        name, line = m.group(1) or m.group(2), bisect.bisect_right(starts, m.start())
        if m.group(1):
            b = s.find('{', skip_to_close(s, m.end() - 1))
        else:
            b = m.end()
            while b < len(s) and s[b] in ' \t':
                b += 1
            if s[b:b + 1] != '{':
                continue                                              # expression body: a one-liner
        if b < 0:
            continue
        e = skip_to_close(s, b)
        prev = lines[line - 2].strip() if line >= 2 else ''
        out.append((name, line, s.count('\n', m.start(), e) + 1, prev[2:].strip() if prev.startswith('//') else '',
                    bool(re.search(r'\bA\.\w', s[b:e]))))
    return out


HITS_RE = re.compile(r'"HITS"\s*:\s*\[')


def beats_hits(text):
    out = Counter()
    for m in HITS_RE.finditer(text):
        i = m.end() - 1
        out.update(re.findall(r'\[\s*"([\w-]+)"\s*,', text[i:skip_to_close(text, i)]))
    return out


# ── film helpers ──────────────────────────────────────────────────────────────────────────────────────────────────
def chapters(film):
    """Chapter dirs in film order (film.json), else every */src/film.js that is not a skeleton or a test."""
    fj = film / 'film.json'
    if fj.exists():
        try:
            dirs = [c['dir'] for c in json.loads(fj.read_text(encoding='utf-8')).get('chapters', [])]
            return [d for d in dirs if (film / d / 'src' / 'film.js').exists()]
        except (json.JSONDecodeError, KeyError, TypeError):
            pass
    return sorted(p.parent.parent.name for p in film.glob('*/src/film.js')
                  if not p.parent.parent.name.startswith(('_', 'tes', 'contoh')))


def film_hits(film):
    c = Counter()
    for d in chapters(film):
        b = film / d / 'src' / 'beats.js'
        if b.exists():
            c.update(beats_hits(b.read_text(encoding='utf-8')))
    return c


def live_js(src):
    """A chapter's own source files: no symlinks into the kit, no engine/beats, no dated copies (film_v1_pre_tx.js, *.bak)."""
    return [p for p in sorted(src.glob('*.js')) if not p.is_symlink() and p.name not in ('engine.js', 'beats.js')
            and not re.search(r'_v\d|_pre|_old|_lama|\.bak|copy|^tes', p.name)]


def film_sources(film):
    out = [p for d in chapters(film) for p in live_js(film / d / 'src')]
    for p in sorted((film / 'kit').glob('*.js')):
        t = TPL / 'kit' / p.name
        if not p.is_symlink() and not (t.exists() and sha(t) == sha(p)):
            out.append(p)
    return out


IMP = re.compile(r"import\s*\{([^}]*)\}\s*from\s*['\"](?:\.{1,2}/)+pustaka/([\w/-]+)\.js['\"]")


def film_imports(film, items):
    """Counter of katalog ids imported from ./pustaka/ by the film's chapters."""
    by = {(e['file'], e['nama']): e['id'] for e in items}
    c = Counter()
    for p in film_sources(film):
        for m in IMP.finditer(p.read_text(encoding='utf-8')):
            for nm in (x.split(' as ')[0].strip() for x in m.group(1).split(',')):
                if nm:
                    c[by.get((f'js/{m.group(2)}.js', nm), f'{m.group(2)}.{nm}')] += 1
    return c


# ── index ─────────────────────────────────────────────────────────────────────────────────────────────────────────
def galeri_sections():
    return sorted((p.stem[2:] for p in SRC.glob('g_*.js')), key=mod_key)


def galeri_demos():
    out = {}
    for p in sorted(SRC.glob('g_*.js')):
        s = p.read_text(encoding='utf-8')
        for m in re.finditer(r"\bid:\s*'([\w.\-]+)'", s):
            out.setdefault(m.group(1), p.name)
        # generated ids: `// demo-ids: hit.stk1 hit.stk2 …` declares what a loop builds (e.g. g_hits.js)
        for m in re.finditer(r'//\s*demo-ids:\s*(.+)', s):
            for d in m.group(1).split():
                out.setdefault(d, p.name)
        for m in re.finditer(r"\bid:\s*'([\w.\-]+)'\s*\+", s):
            out.pop(m.group(1), None)
    return out


def index_line(e, reg):
    films = '/'.join(kode(reg, s) for s in e.get('film', [])) or 'baru'
    return f"- {MARK.get(e.get('tier'), '')}`{e['id']}` {e.get('lihat', '')} · `{e.get('panggil', '')}` · {films}"


def build_index(items, reg):
    by = defaultdict(list)
    for e in items:
        by[e['_frag']].append(e)
    out = ['# INDEX pustaka (dibangun `pustaka.py index`, jangan diedit tangan)',
           'Baca ini di G0, bukan kode film lama. ★ bintang: cek cooldown dengan `pustaka.py segar` · ◆ ciri channel · tanpa tanda = alat, wajib restyle per film.',
           "Di bab: `import { nama } from './pustaka/<modul>.js'` · opsi lengkap: `pustaka.py lihat <id>` · bentuk: `galeri/lembar/<modul>.jpg` · "
           'portal: `pustaka.py pakai <slug> --portal <nama>` · stasiun utuh film lama: `rg -n <kata> aset/_pustaka/RESEP.md`.',
           'Film: ' + ' · '.join(f"{f.get('kode')} = {f['slug']}" for f in reg['film']), '']
    secs = galeri_sections()
    for frag in sorted(by, key=mod_key):
        files = sorted({e['file'] for e in by[frag]})
        look = [f'galeri/lembar/{s}.jpg' for s in secs if s.split('-')[0] == frag]
        if frag in ('bintang', 'portal'):
            look.append('galeri/pratinjau/<id>.jpg')
        out.append(f"## {frag} · {', '.join(files)}" + (f" · {', '.join(look)}" if look else ''))
        out += [index_line(e, reg) for e in by[frag]] + ['']
    return '\n'.join(out)


ST_OBJ = re.compile(r'^\s*\{\s*at:')
ST_NAME = re.compile(r"\bname:\s*'([^']+)'")
ST_VIA = re.compile(r"\bvia:\s*'([\w-]+)'")
ST_COM = re.compile(r'//\s*(S\d+[a-z]?\b.*?)\s*$')
HDR = re.compile(r'^\s*//\s*──\s*(.*?)\s*─*\s*$')
SNUM = re.compile(r'^(S\d+[a-z]?)\b')


def stations(path):
    out, seen = [], set()
    for i, l in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
        h = HDR.match(l)
        if h and SNUM.match(h.group(1)):
            out.append((i, h.group(1), '')); seen.add(SNUM.match(h.group(1)).group(1))
        elif ST_OBJ.match(l):
            nm, com, via = ST_NAME.search(l), ST_COM.search(l), ST_VIA.search(l)
            if nm or (com and SNUM.match(com.group(1)).group(1) not in seen):
                out.append((i, nm.group(1) if nm else com.group(1), via.group(1) if via else ''))
    return out


def build_resep(reg):
    out = ['# RESEP: stasiun utuh di film yang sudah dirender (dibangun `pustaka.py index`)',
           'Jangan dibaca utuh. Cari: `rg -n "<kata>" aset/_pustaka/RESEP.md`, lalu buka bagian itu saja: `sed -n "<baris>,+60p" <file>`.',
           'Komponen yang sudah digeneralisasi ada di INDEX.md (pakai itu dulu). Path relatif ke folder kerja.', '']
    for f in reg['film']:
        film = ASET / f['slug']
        if not film.exists():
            continue
        out.append(f"## {f.get('kode', f['slug'])} · {f.get('judul', '')} ({f['slug']}, {f.get('tanggal', '')})")
        for d in chapters(film):
            for p in live_js(film / d / 'src'):
                st = stations(p)
                if st:
                    out.append(f'### {d} · {rel(p)}')
                    out += [f"- {lab[:110]}{f' [{via}]' if via else ''} · :{i}" for i, lab, via in st]
        out.append('')
    return '\n'.join(out)


def build_sections():
    return ('// Dibangun pustaka.py index dari galeri/src/g_*.js (jangan diedit tangan).\n'
            'export default [' + ', '.join(f"'{s}'" for s in galeri_sections()) + '];\n')


def cmd_index(a):
    items, errs = load_katalog()
    reg = load_reg()
    kat = [{k: v for k, v in e.items() if not k.startswith('_')} | {'modul': e['_frag']} for e in items]
    files = {ROOT / 'katalog.json': json.dumps(kat, indent=1, ensure_ascii=False) + '\n',
             ROOT / 'INDEX.md': build_index(items, reg) + '\n', ROOT / 'RESEP.md': build_resep(reg) + '\n',
             SRC / 'sections.js': build_sections()}
    for p, text in files.items():
        ch = write_if_changed(p, text)
        print(f"{'tulis' if ch else 'sama '} {rel(p)}  {len(text):,} char ≈ {len(text) / 3.6:,.0f} token")
    print(f'{len(items)} entri · {len({e["_frag"] for e in items})} modul · {len(galeri_sections())} bagian galeri')
    for e in errs:
        print('  ⚠', e)
    return 1 if errs else 0


# ── cari / lihat ──────────────────────────────────────────────────────────────────────────────────────────────────
def cmd_cari(a):
    items, _ = load_katalog()
    reg, words = load_reg(), [w.lower() for w in a.kata]
    hits = [e for e in items if all(w in ' '.join([e['id'], e.get('nama', ''), e.get('lihat', ''), ' '.join(e['tag']),
                                                   e.get('catatan', ''), e.get('panggil', '')]).lower() for w in words)]
    for e in hits:
        print(index_line(e, reg))
    rs = []
    resep = ROOT / 'RESEP.md'
    if resep.exists():
        cur = ''
        for l in resep.read_text(encoding='utf-8').splitlines():
            if l.startswith('### '):
                cur = l.split(' · ', 1)[-1]
            elif l.startswith('- ') and all(w in l.lower() for w in words):
                rs.append(f"{l[2:].rsplit(' · :', 1)[0]} · {cur}:{l.rsplit(':', 1)[-1]}")
    if rs:
        print(f'\nstasiun di film lama ({len(rs)}):')
        for l in rs[:8]:
            print(' ', l)
        if len(rs) > 8:
            print(f'  … +{len(rs) - 8}: rg -n "{" ".join(a.kata)}" aset/_pustaka/RESEP.md')
    if not hits and not rs:
        print('tidak ketemu. coba kata lain, atau baca INDEX.md')
    return 0


def find_entry(items, q):
    for test in (lambda e: e['id'] == q, lambda e: e['id'].endswith('.' + q) or e.get('nama') == q,
                 lambda e: e['id'].startswith(q)):
        c = [e for e in items if test(e)]
        if len(c) == 1:
            return c[0], []
        if c:
            return None, c
    return None, []


def code_info(path, name):
    lines = Path(path).read_text(encoding='utf-8').splitlines()
    pat = re.compile(rf'^\s*export\s+(?:async\s+)?(?:function\s*\*?\s*{re.escape(name)}\s*\(|(?:const|let|var)\s+(?:[^=]*,\s*)?{re.escape(name)}\s*=)')
    for i, l in enumerate(lines):
        if pat.search(l):
            com, j = [], i - 1
            while j >= 0 and lines[j].lstrip().startswith('//') and not HDR.match(lines[j]) and len(com) < 6:
                com.insert(0, lines[j].strip()); j -= 1
            return i + 1, com, l.strip()
    return None, [], ''


def cmd_lihat(a):
    items, _ = load_katalog()
    e, cand = find_entry(items, a.id)
    if not e:
        print('tidak ada:', a.id if not cand else 'beberapa cocok: ' + ', '.join(c['id'] for c in cand))
        return 1
    reg, f = load_reg(), ROOT / e['file']
    line, com, sig = code_info(f, e['nama']) if f.suffix == '.js' and f.exists() else (None, [], '')
    print(f"{e['id']}  [{e['tier']}]  {rel(f)}{f':{line}' if line else ''}")
    print(f"  {e.get('lihat', '')}\n  panggil: {e.get('panggil', '')}")
    for c in com:
        print('  ' + c[:200])
    if sig:
        print('  ' + sig[:220])
    print(f"  asal: {e.get('asal', '')} · film: {', '.join(kode(reg, s) for s in e['film']) or '-'} · tag: {', '.join(e['tag'])}")
    if e.get('catatan'):
        print('  catatan:', e['catatan'])
    led = load_ledger().get(e.get('ledger') or '')
    if led:
        v = led.get('films', [])[-1] if led.get('films') else {}
        print(f"  ledger: {led['id']} · {led.get('status')} · terakhir: {v.get('verdict', '-')} ({v.get('film', '')}) {v.get('note', '')}"[:220])
    demo = galeri_demos().get(e['id'])
    sec = demo[2:-3] if demo else ''
    pv = GAL / 'pratinjau' / f"{e['id']}.jpg"
    print(f"  galeri: {f'{demo} · lembar {rel(GAL / 'lembar' / (sec + '.jpg'))} · live galeri/src/index.html?g={sec}&id={e['id']}&play=1' if demo else '-'}"
          + (f' · pratinjau {rel(pv)}' if pv.exists() else ''))
    cd, _ = cooldown(reg)
    keys = [k for k in (e['id'], e.get('ledger')) if k]
    hit = next((cd[k] for k in keys if k in cd), None)
    ban = next((larangan(reg, k) for k in keys if larangan(reg, k)), '')
    print('  status: ' + (f'DILARANG ({ban})' if ban else f'COOLDOWN: headline {hit[0]} "{hit[1]}" → hanya beat kecil / remix' if hit
                          else 'bebas' + (' (remix, jangan salin)' if e['tier'] == 'bintang' else ', restyle per film')))
    return 0


# ── pakai ─────────────────────────────────────────────────────────────────────────────────────────────────────────
def cmd_pakai(a):
    film = ASET / a.slug
    if not (film / 'film.json').exists():
        sys.exit(f'bukan film long-form: {rel(film)} (film.json tidak ada; buat dulu dengan new_film.sh)')
    if any((film / 'out').glob('*.mp4')) and not a.paksa:
        sys.exit(f'{a.slug} sudah punya render di out/. pakai hanya untuk film baru (--paksa kalau memang perlu).')
    reg = load_reg()
    dst = film / 'kit' / 'pustaka'
    sp = dst / 'SNAPSHOT.json'
    snap = json.loads(sp.read_text(encoding='utf-8')) if sp.exists() else {'dibuat': TODAY, 'sumber': rel(JS), 'file': {}}
    new, differ = [], []
    for p in sorted(JS.glob('*.js')):
        q = dst / p.name
        if q.exists():
            if sha(q) != sha(p):
                differ.append(p.name)
            continue
        dst.mkdir(parents=True, exist_ok=True)
        shutil.copy2(p, q); new.append(p.name); snap['file'][p.name] = sha(p)
    if new:
        snap['diperbarui'] = TODAY
        sp.write_text(json.dumps(snap, indent=1, ensure_ascii=False) + '\n', encoding='utf-8')
    links = []
    for src in sorted(film.glob('*/src')):
        ln = src / 'pustaka'
        if (src / 'film.js').exists() and not (ln.exists() or ln.is_symlink()):
            ln.symlink_to('../../kit/pustaka'); links.append(src.parent.name)
    print(f'snapshot {rel(dst)}: {len(new)} modul baru' + (f" · berbeda dari pustaka (dibiarkan): {', '.join(differ)}" if differ else ''))
    print('link src/pustaka:', ', '.join(links) or '(sudah ada semua)')
    if a.portal:
        name = a.portal.removeprefix('portal.')
        cd, _ = cooldown(reg, a.slug)
        ban, hot = larangan(reg, 'portal.' + name), cd.get('portal.' + name)
        if ban and not a.paksa:
            sys.exit(f'portal.{name} DILARANG: {ban} (--paksa kalau Ikhsan sendiri yang minta)')
        if hot:
            print(f'⚠ portal.{name} masih cooldown (portal {hot[0]}): remix, jangan dipakai utuh sebagai portal utama')
        for s, d in ((JS / 'portal' / f'{name}.js', film / 'kit' / 'portal.js'), (SFX / f'portal_sfx_{name}.py', film / 'tools' / 'portal_sfx.py')):
            if not s.exists():
                print('  tidak ada di pustaka:', rel(s)); continue
            if d.exists():
                if sha(d) == sha(s):
                    print('  sudah sama:', rel(d)); continue
                d.rename(d.with_name(f'{d.name}.bak-{STAMP}'))
            shutil.copy2(s, d)
            print(f'  {rel(s)} → {rel(d)}' + (f'  (lama: {d.name}.bak-{STAMP})' if d.with_name(f'{d.name}.bak-{STAMP}').exists() else ''))
    mods = sorted(p.stem for p in dst.glob('*.js'))
    print("di bab: import { … } from './pustaka/<modul>.js'  · modul:", ', '.join(mods))
    print('daftar + tanda tangan: aset/_pustaka/INDEX.md · kartu segar: pustaka.py segar --film', a.slug)
    return 0


# ── panen ─────────────────────────────────────────────────────────────────────────────────────────────────────────
def cmd_panen(a):
    film = ASET / a.slug
    if not film.exists():
        sys.exit(f'tidak ada: {rel(film)}')
    items, _ = load_katalog()
    reg, vex, kex = load_reg(), vault_exports(), kit_exports()
    chs, srcs = chapters(film), film_sources(film)
    print(f"PANEN {a.slug} · {len(chs)} bab · {len(srcs)} file sumber ({', '.join(chs)})")
    used = film_imports(film, items)
    print('dipakai dari pustaka:', ', '.join(f'{k} ×{n}' for k, n in used.most_common()) or '(belum ada import ./pustaka/)')
    sp = film / 'kit' / 'pustaka' / 'SNAPSHOT.json'
    if sp.exists():
        snap = json.loads(sp.read_text(encoding='utf-8'))['file']
        mine = [n for n, h in snap.items() if (film / 'kit' / 'pustaka' / n).exists() and sha(film / 'kit' / 'pustaka' / n) != h]
        moved = [n for n, h in snap.items() if (JS / n).exists() and sha(JS / n) != h]
        print('snapshot: diubah di film →', ', '.join(mine) or 'tidak ada', '· pustaka sudah lebih baru →', ', '.join(moved) or 'tidak ada')
    else:
        print('snapshot: tidak ada (film dibuat sebelum pustaka, atau belum `pakai`)')
    portal = film / 'kit' / 'portal.js'
    if portal.exists() and not portal.is_symlink():
        same = [p.stem for p in (JS / 'portal').glob('*.js') if sha(p) == sha(portal)]
        print('portal:', f'portal.{same[0]} (sudah di pustaka)' if same else
              'BARU → salin ke aset/_pustaka/js/portal/<nama>.js + tools/portal_sfx.py ke sfx/portal_sfx_<nama>.py + entri katalog.d/portal.json')
    hits = film_hits(film)
    others = Counter()
    for f in reg['film']:
        if f['slug'] != a.slug and (ASET / f['slug']).exists():
            others.update(film_hits(ASET / f['slug']))
    print('hit tx:', ', '.join(f'{k} ×{n}' for k, n in sorted(hits.items())) or '-',
          '· baru (belum ada di film lain):', ', '.join(k for k in hits if k not in others) or 'TIDAK ADA')
    redef, comp, stat = [], [], 0
    for p in srcs:
        for name, line, n, com, beats in functions(p.read_text(encoding='utf-8')):
            where = f'{rel(p)}:{line}'
            if name in vex:
                redef.append(f'{name} ({where})')
            if name in vex or name in kex or name in ('makeFilm', 'load', 'draw', 'over', 'init') or n < a.min or n > 400:
                continue
            if beats:
                stat += 1
            else:
                comp.append((n, name, where, com))
    if redef and sp.exists():
        print(f'⚠ nama pustaka didefinisikan ulang di film (bukan import), {len(redef)}:', ', '.join(redef[:10]))
    elif redef:
        names = sorted({r.split(' (')[0] for r in redef})
        print(f'sudah dipanen ke pustaka: {len(names)} fungsi ({", ".join(names[:12])}{" …" if len(names) > 12 else ""})')
    comp.sort(key=lambda c: -c[0])
    print(f'kandidat komponen (≥{a.min} baris, tanpa beat A.*): {len(comp)}; {a.top} terbesar:')
    for n, name, where, com in comp[:a.top]:
        print(f'  {n:4d}  {name:<18} {where}' + (f'  // {com[:70]}' if com else ''))
    print(f'fungsi stasiun (memakai beat A.*): {stat} → dicatat RESEP.md lewat `pustaka.py index` (setelah film masuk register)')
    if a.catat:
        catat(reg, a, hits, used)
    print('langkah: 1) yang layak: generalisasi ke js/<modul>.js + demo g_<modul>.js + katalog.d (aturan di README)'
          ' 2) ledger.py add / verdict  3) panen --catat --bintang … --portal …  4) pustaka.py index && pustaka.py cek'
          ' 5) sheet.py --g <modul>  6) baris register di studio-global standar-kasta-tinggi.md')
    return 0


def catat(reg, a, hits, used):
    f = next((x for x in reg['film'] if x['slug'] == a.slug), None)
    if f is None:
        f = {'slug': a.slug, 'kode': a.kode or a.slug[:3], 'judul': a.judul or a.slug,
             'urut': max([x.get('urut', 0) for x in reg['film']] + [0]) + 1, 'bintang': [], 'portal': None, 'perangkat': []}
        reg['film'].append(f)
    f['tanggal'] = a.tanggal or f.get('tanggal') or TODAY
    f['hits'], f['alat'] = dict(sorted(hits.items())), sorted(used)
    if a.judul:
        f['judul'] = a.judul
    if a.bintang:
        f['bintang'] = [{'nama': b.split(':')[0].strip(), 'kunci': [k.strip() for k in b.partition(':')[2].split('+') if k.strip()]}
                        for b in a.bintang.split(';') if b.strip()]
    if a.portal:
        f['portal'] = {'nama': a.portal_nama or a.portal, 'kunci': [a.portal]}
    if REG.exists():
        shutil.copy2(REG, REG.with_name(f'register.json.bak-{STAMP}'))
    out = {k: v for k, v in reg.items() if k not in ('film',)} | {'film': reg['film']}
    REG.write_text(json.dumps(out, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f"register: {a.slug} dicatat (bintang {len(f.get('bintang', []))}, portal {(f.get('portal') or {}).get('nama', '-')}, "
          f"{len(f['hits'])} hit, {len(f['alat'])} alat) · cadangan register.json.bak-{STAMP}")


# ── segar ─────────────────────────────────────────────────────────────────────────────────────────────────────────
def cmd_segar(a):
    items, _ = load_katalog()
    reg, led = load_reg(), load_ledger()
    hot, last = cooldown(reg, a.film)
    hist = [f for f in reg['film'] if f['slug'] != a.film]
    print(f"KARTU SEGAR · {'film ' + a.film if a.film else 'film berikutnya'} · {TODAY}")
    print(f"cooldown {len(last)} film terakhir ({', '.join(f.get('kode', f['slug']) for f in last)}): boleh muncul hanya sebagai beat kecil/remix, bukan headline")
    for f in reversed(last):
        b = ' · '.join(x['nama'] for x in f.get('bintang', []))
        print(f"  {f.get('kode')}: {b} · portal {(f.get('portal') or {}).get('nama', '-')}")
    free = [f for f in hist if f not in last]
    for f in free:
        p = f.get('portal') or {}
        ban = next((larangan(reg, k) for k in p.get('kunci', []) if larangan(reg, k)), '')
        print(f"  bebas lagi (remix, jangan salin) {f.get('kode')}: " + ' · '.join(x['nama'] for x in f.get('bintang', []))
              + f" · portal {p.get('nama', '-')}" + (f' (DILARANG: {ban})' if ban else ''))
    print(f"wajib: ≥{reg['aturan'].get('bintang_baru_per_film', 1)} bintang baru + portal bab milik film ini; pustaka hanya untuk alat dan ciri.")
    # transition hits
    cat = {}
    for tj in [TPL / 'tx' / 'tx.json'] + [ASET / f['slug'] / 'tx' / 'tx.json' for f in reg['film']]:
        if tj.exists():
            for k, v in json.loads(tj.read_text(encoding='utf-8')).items():
                cat.setdefault(k, v.get('folder', '?'))
    use = {f['slug']: (film_hits(ASET / f['slug']) if (ASET / f['slug']).exists() else Counter(f.get('hits') or {})) for f in hist}
    tot = sum(use.values(), Counter())
    every = [k for k in cat if use and all(u[k] for u in use.values())]
    never = [k for k in cat if not tot[k]]
    print(f"hit tx ({len(cat)} hit): dipakai di semua film: {', '.join(f'{k} ×{tot[k]}' for k in every) or '-'} → kurangi/ganti")
    print(f"  belum pernah dipakai: {', '.join(never) or '-'}")
    packs = sorted(p.name for p in TRANS.iterdir() if p.is_dir()) if TRANS.exists() else []
    cut = set(cat.values())
    fresh = [p for p in packs if p not in cut]
    print(f"  paket _transisi belum dipotong jadi hit ({len(fresh)}):")
    for p in fresh:
        why = larangan(reg, f'_transisi/{p}')
        print(f'    {p}' + (f'  ⚠ {why}' if why else ''))
    print(f"  target film ini: ≥{reg['aturan'].get('hit_baru_per_film', 2)} hit baru dari paket yang belum dipakai (tools/tx_lib.py), variasi, tidak spam")
    # tools
    alat = [e for e in items if e['tier'] == 'alat']
    recent = {f['slug'] for f in hist[-3:]}
    seen = {e['id']: set(e['film']) | {f['slug'] for f in hist if e['id'] in f.get('alat', [])} for e in alat}
    busy = [e['id'] for e in alat if len(seen[e['id']] & recent) >= 2]
    print(f"alat yang muncul di ≥2 dari 3 film terakhir ({len(busy)}): {', '.join(busy[:14]) or '-'}" + (' …' if len(busy) > 14 else '')
          + (' → restyle besar atau istirahatkan' if busy else ''))
    calm = sorted((e for e in alat if not seen[e['id']] & {f['slug'] for f in last} and e['_frag'] != 'dasar'),
                  key=lambda e: hashlib.sha1(f"{a.film or TODAY}{e['id']}".encode()).hexdigest())
    print(f"ide alat yang belum muncul di {len(last)} film terakhir (urutan acak per film): {', '.join(e['id'] for e in calm[:8]) or '-'}")
    exp = [r['id'] for r in led.values() if r.get('status') == 'experimental' and r.get('visible', True)
           and all(v.get('verdict') == 'pending' for v in r.get('films', []))]
    print(f"teknik ledger eksperimen yang belum dinilai ({len(exp)}): {', '.join(exp[:8])}" + (' …' if len(exp) > 8 else ''))
    if a.film and (ASET / a.film).exists():
        used = film_imports(ASET / a.film, items)
        warn = [k for k in used if k in hot or any(k == e['id'] and e.get('ledger') in hot for e in items)]
        print(f"{a.film} memakai {len(used)} id pustaka" + (f" · ⚠ masih cooldown: {', '.join(warn)}" if warn else ''))
    return 0


# ── cek ───────────────────────────────────────────────────────────────────────────────────────────────────────────
BAD = re.compile(r'Math\.random\(|Date\.now\(|performance\.now\(|new Date\(')
IMPORTS = re.compile(r"^\s*import\b[^;]*?from\s*['\"]([^'\"]+)['\"]|^\s*import\s*['\"]([^'\"]+)['\"]", re.M)


def cmd_cek(a):
    items, errs = load_katalog()
    warns, reg, cache = [], load_reg(), {}
    for e in items:
        f = ROOT / e.get('file', '')
        if not f.exists():
            errs.append(f"{e['id']}: file {e.get('file')} tidak ada"); continue
        if f.suffix == '.js' and e.get('nama') not in cache.setdefault(f, set(exports(f))):
            errs.append(f"{e['id']}: '{e.get('nama')}' tidak di-export dari {e['file']}")
    js = sorted(JS.rglob('*.js')) + sorted(SRC.glob('g_*.js')) + [SRC / 'film.js']
    for p in js:
        r = subprocess.run(['node', '--check', str(p)], capture_output=True, text=True)
        if r.returncode:
            errs.append(f"node --check {rel(p)}: {(r.stderr.strip().splitlines() or ['?'])[-1][:160]}")
        for i, l in enumerate(p.read_text(encoding='utf-8').splitlines(), 1):
            m = BAD.search(re.sub(r'//.*$', '', l))
            if m and p.parent != SRC:
                errs.append(f'{rel(p)}:{i}: tidak deterministik ({m.group(0)})')
    for p in sorted(JS.glob('*.js')):
        for m in IMPORTS.finditer(p.read_text(encoding='utf-8')):
            spec = m.group(1) or m.group(2)
            if spec not in KIT_IMPORTS and not (re.fullmatch(r'\./[\w-]+\.js', spec) and (JS / spec[2:]).exists()):
                errs.append(f'{rel(p)}: import "{spec}" (boleh: {", ".join(KIT_IMPORTS)}, ./<modul>.js)')
    demos, ids = galeri_demos(), {e['id'] for e in items}
    for e in items:
        if e.get('demo') is not False and e['id'] not in demos:
            errs.append(f"{e['id']}: belum ada demo galeri (g_{e['_frag']}.js) atau \"demo\": false")
    warns += [f'demo {d} ({f}) tidak ada di katalog' for d, f in demos.items() if d not in ids]
    for s in galeri_sections():
        sheet, g = GAL / 'lembar' / f'{s}.jpg', SRC / f'g_{s}.js'
        mods = [JS / f"{s.split('-')[0]}.js"]
        newest = max(p.stat().st_mtime for p in [g] + [m for m in mods if m.exists()])
        if not sheet.exists() or sheet.stat().st_mtime < newest:
            warns.append(f'lembar {s} belum ada / lebih tua dari kodenya: sheet.py --g {s}')
    for p, text in ((ROOT / 'INDEX.md', build_index(items, reg) + '\n'), (SRC / 'sections.js', build_sections())):
        if not p.exists() or p.read_text(encoding='utf-8') != text:
            errs.append(f'{rel(p)} basi: jalankan pustaka.py index')
    led = load_ledger()
    for f in reg['film']:
        for b in f.get('bintang', []) + ([f['portal']] if f.get('portal') else []):
            for k in b.get('kunci', []):
                if k not in ids and k not in led:
                    warns.append(f"register {f.get('kode')}: kunci '{k}' bukan id katalog atau ledger")
    for w in warns:
        print('  ⚠', w)
    for e in errs:
        print('  ✗', e)
    print(f"cek: {len(items)} entri · {len(js)} file js · {len(demos)} demo · {len(errs)} galat · {len(warns)} peringatan"
          + (' · OK' if not errs else ''))
    return 1 if errs else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('index')
    p = sub.add_parser('cari'); p.add_argument('kata', nargs='+')
    p = sub.add_parser('lihat'); p.add_argument('id')
    p = sub.add_parser('pakai'); p.add_argument('slug'); p.add_argument('--portal'); p.add_argument('--paksa', action='store_true')
    p = sub.add_parser('panen'); p.add_argument('slug'); p.add_argument('--min', type=int, default=6); p.add_argument('--top', type=int, default=20)
    p.add_argument('--catat', action='store_true'); p.add_argument('--bintang'); p.add_argument('--portal'); p.add_argument('--portal-nama')
    p.add_argument('--kode'); p.add_argument('--judul'); p.add_argument('--tanggal')
    p = sub.add_parser('segar'); p.add_argument('--film')
    sub.add_parser('cek')
    a = ap.parse_args()
    sys.exit({'index': cmd_index, 'cari': cmd_cari, 'lihat': cmd_lihat, 'pakai': cmd_pakai, 'panen': cmd_panen,
              'segar': cmd_segar, 'cek': cmd_cek}[a.cmd](a))


if __name__ == '__main__':
    main()
