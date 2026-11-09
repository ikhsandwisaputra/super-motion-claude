"""Poster test: pause anywhere — the frame must hold up as a still design.

Scores one frame out of 100 on value contrast, colour discipline, neon/glow budget, one focal point, negative
space, type hierarchy, safe zones/edges, pure black/white and texture, and draws what the eye sees.
"""
import cv2
import numpy as np

from . import draw as D
from . import measure as M


def critique(rgb, channel=None, allow_neon=False, flow=False):
    # flow=True (CLAUDE.md law 2, 2026-11-09): judge a frame caught mid camera-flow through a layered 3D collage.
    # It relaxes only what layering legitimately changes (focal stars, density, edge bleed, colours from real
    # photos/logos). Neon/glow, value contrast, mud and the 3-of-5 cap stay strict: the video-3 look must still fail.
    h, w = rgb.shape[:2]
    lab = M.to_lab(rgb)
    bg = M.dominant_lab(lab)
    ink = M.ink_mask(lab, bg)
    ls = M.light_stats(lab, ink)
    pal = M.palette(lab)
    inkpal = M.ink_palette(lab, ink)
    accents = M.hue_families(lab, mask=ink, fam_min=0.04)
    sp, cells = M.space_stats(rgb)
    sal = M.saliency(rgb, lab)
    foc = M.focal(sal)
    lines = M.text_lines(rgb)
    ts = M.type_scale(lines)
    grain = M.grain_level(rgb, cells)
    zones = M.zones_for(w, h, channel)
    in_zone, at_edge = [], []
    for ln in lines:
        x, y, bw, bh = ln['box']
        for zx0, zy0, zx1, zy1 in zones:
            ix = max(0, min(x + bw, zx1 * w) - max(x, zx0 * w))
            iy = max(0, min(y + bh, zy1 * h) - max(y, zy0 * h))
            if ix * iy > 0.3 * bw * bh:
                in_zone.append(ln)
                break
        m = 0.03
        if x < m * w or y < m * h or x + bw > (1 - m) * w or y + bh > (1 - m) * h:
            at_edge.append(ln)
    portrait = h > w
    hero_target = 0.05 if portrait else 0.08
    groups = M.colour_groups(pal[:1] + inkpal)

    items = []

    def item(key, pts, got, ok, msg, fix=None):
        items.append({'key': key, 'pts': pts, 'max': maxpts[key], 'ok': ok, 'got': got, 'msg': msg, 'fix': fix})

    maxpts = {'kontras': 15, 'warna': 15, 'neon': 10, 'fokus': 15, 'ruang': 10, 'tipe': 15, 'zona': 10,
              'murni': 5, 'tekstur': 5}
    c = max(ls['contrast'], ls['ink_contrast'] or 0)   # minimal white frames: small dark type is still high contrast
    mud = ls['L50'] < 22 and c < 45
    lowkey = ls['L95'] < 30 and ls['L50'] < 22          # everything dark except a little type: flat value structure
    small = []
    if flow and not mud and not lowkey and not (ls['neon_bright'] > 0.25 and ls['glow_halo'] > 0.006):
        # real app icons / logos / cut-outs bring their own small hues (Ps blue, Ai orange, Pr purple…): a hue family
        # under 2.5 % of the whole frame is an asset, not a design accent. Up to 4 of them; past that it is confetti.
        # Never on a dark-mud / low-key / glowing-neon frame: that is the rejected video-3 look (replay.py guards it).
        ink_share = float(ink.mean())
        small = [a for a in accents if a['share'] * ink_share < 0.025]
        if len(small) <= 4:
            big = {a['name'] for a in accents if a not in small}
            accents = [a for a in accents if a not in small]
            groups = [g for g in groups if g in big or g.startswith('netral') or g not in {a['name'] for a in small}]
        else:
            small = []
    colours = len(groups)
    item('kontras', 15 if c >= 55 and not lowkey else 9 if c >= 40 else 3,
         f"L p5–p95 {ls['L5']:.0f}–{ls['L95']:.0f}, tinta vs latar Δ{ls['ink_contrast'] or 0:.0f} → Δ{c:.0f}",
         c >= 55 and not lowkey,
         'lumpur gelap: semua nilai mepet hitam' if mud else ('low-key datar: hanya teks yang terang' if lowkey else
                                                               ('kontras nilai cukup' if c >= 55 else 'kontras nilai rendah')),
         ('beri area terang/berwarna (field, cahaya, set), jangan cuma teksnya yang terang' if lowkey else
          'naikkan beda gelap-terang ≥ 55 L: latar lebih terang/berwarna atau tipe lebih putih') if (c < 55 or lowkey) else None)
    col_t = 5 if flow else 3   # real cut-outs/photos carry their own colours; accents stay at the kiblat's ≤ 2
    ok_col = colours <= col_t and len(accents) <= 2
    item('warna', 15 if ok_col else 9 if colours <= col_t + 1 and len(accents) <= 3 else 4,
         f"{colours} warna ({', '.join(groups)}), aksen: {', '.join(a['name'] for a in accents) or '-'}"
         + (f", aset kecil: {', '.join(a['name'] for a in small)}" if small else ''),
         ok_col, 'palet disiplin' if ok_col else 'warna terlalu banyak untuk satu frame',
         None if ok_col else f'maks {col_t} warna (latar, tipe, 1 aksen' + (', foto/aset' if flow else '') + ') + netral; aksen ke-2 hanya untuk 1 kata')
    nb, gh = ls['neon_bright'], ls['glow_halo']
    # a saturated solid accent on dark is a brand colour; it reads as "neon" only when it also glows
    neon_ok = allow_neon or nb <= 0.25 or gh <= 0.006
    item('neon', 10 if neon_ok else 6 if nb <= 0.45 else 2,
         f"neon {nb * 100:.0f}% dari tinta terang, halo {gh * 100:.2f}% frame", neon_ok,
         'glow terkendali' if neon_ok else 'neon/glow di latar gelap (bau template)',
         None if neon_ok else 'satu sumber cahaya; tipe off-white tanpa glow, aksen solid (bukan pendar)')
    st_t, cl_t = (3, 0.35) if flow else (2, 0.45)   # flow: FG bokeh/BG plane may register as extra stars
    ok_f = foc['stars'] <= st_t and foc['clarity'] >= cl_t
    item('fokus', 15 if ok_f else 9 if foc['stars'] <= st_t + 1 else 4,
         f"{foc['stars']} bintang, kejelasan {foc['clarity']:.2f}", ok_f,
         'satu titik fokus jelas' if ok_f else 'mata bingung: beberapa elemen berebut',
         None if ok_f else 'satu bintang per momen: kecilkan/redupkan yang lain, atau tunda masuknya')
    ns = sp['negative_space']
    # airy minimal frames are a taste (kiblat: 72 % negative space): fine when one clear, contrasty focal point
    # holds them and the frame is not dark mud; emptiness only fails when nothing strong holds the space
    minimal_ok = ns > 0.70 and foc['stars'] <= 2 and c >= 50 and not lowkey
    ns_lo = 0.12 if flow else 0.25   # flow: a dense multi-plane collage is a look, not clutter
    ok_s = ns_lo <= ns <= 0.70 or minimal_ok
    item('ruang', 10 if ok_s else 6 if 0.15 <= ns <= 0.85 else 2,
         f"ruang kosong {ns * 100:.0f}%" + (' (minimal, fokus jelas)' if minimal_ok else ''), ok_s,
         'ruang bernapas' if ok_s else ('kosong melompong: tidak ada yang kuat menahan ruang' if ns > 0.70 else 'sesak'),
         None if ok_s else ('besarkan/terangkan fokus, atau isi dengan field warna atau set' if ns > 0.70 else 'buang 1/3 elemen'))
    if lines:
        # hierarchy matters when there is a composition (several lines, or a busy frame); a single quiet set-up
        # line in a minimal frame needs no hero size
        composed = len(lines) >= 3 or ns < 0.6
        ok_h = ts['hero_h'] >= hero_target or not composed
        ok_r = ts['ratio'] is None or ts['ratio'] >= 2.5 or not composed
        pts = 15 if ok_h and ok_r else 9 if ok_h or ok_r else 4
        item('tipe', pts, f"hero ≈{ts['hero_h'] * 100:.1f}% tinggi frame, rasio ≈{ts['ratio'] or '-'}", ok_h and ok_r,
             'hierarki tegas' if ok_h and ok_r else 'hierarki tipe tanggung',
             None if ok_h and ok_r else f"hero ≥ {hero_target * 100:.0f}% tinggi frame, pendukung ≤ 1/3 hero (aturan double-triple)")
    else:
        item('tipe', 10, 'tidak ada teks terdeteksi', None, 'frame tanpa teks')
    ok_z = not in_zone and (flow or not at_edge)   # flow: oversized type may bleed past the edge; UI zones never
    item('zona', 10 if ok_z else 4, f"{len(in_zone)} baris di zona UI, {len(at_edge)} " + ('bleed tepi' if flow else 'mepet tepi'), ok_z,
         'aman' if ok_z else 'teks masuk zona UI / mepet tepi', None if ok_z else 'geser ke area aman kanal')
    # the rule is "never pure #000 and pure #FFF TOGETHER"; one of them alone is a legit clean look
    ok_m = not (ls['pure_black'] >= 0.05 and ls['pure_white'] >= 0.05)
    item('murni', 5 if ok_m else 2, f"hitam murni {ls['pure_black'] * 100:.0f}%, putih murni {ls['pure_white'] * 100:.0f}%",
         ok_m, 'tidak hitam-murni + putih-murni bersamaan' if ok_m else 'hitam murni dan putih murni bersamaan',
         None if ok_m else 'pakai off-black (#111115) dan/atau off-white (#F4F1EA)')
    ok_g = grain >= 1.0
    item('tekstur', 5 if ok_g else 4, f"grain {grain:.1f}", True if ok_g else None,
         'ada tekstur' if ok_g else 'bersih digital (sah untuk gaya produk; beri grain bila ada gradien luas)')
    score = sum(i['pts'] for i in items)
    # points add up, design does not: a frame that fails three of the five fundamentals is not a poster, however
    # strong the rest is (found by replay.py: a 7-colour clutter frame and the video-3 look as a still both "passed")
    core = [i['key'] for i in items if i['key'] in ('kontras', 'warna', 'fokus', 'ruang', 'tipe') and i['ok'] is False]
    capped = len(core) >= 3 and score > 64
    if capped:
        score = 64
    return {'score': int(score), 'pass': score >= 70, 'capped': core if capped else None, 'w': w, 'h': h, 'light': ls,
            'palette': pal, 'ink': inkpal, 'accents': accents, 'space': sp, 'focal': foc, 'type': ts, 'lines': lines,
            'grain': grain, 'zones': zones, 'items': items, '_cells': cells, '_sal': sal}


def render(rgb, crit, title='', panel_w=380, max_h=900):
    """Annotated poster: thirds, UI zones, calm cells, text lines, focal point + the numbers beside it."""
    h, w = rgb.shape[:2]
    s = min(1.0, max_h / h)
    fw, fh = int(w * s), int(h * s)
    img = cv2.resize(rgb, (fw, fh), interpolation=cv2.INTER_AREA) if s < 1 else rgb.copy()
    sheet = D.Sheet(fw + panel_w + 24, max(fh, 560) + 16)
    sheet.paste(img, 8, 8)
    d = sheet.d
    ox, oy = 8, 8
    cells = crit['_cells']
    rows, cols = cells.shape
    for r in range(rows):
        for c in range(cols):
            if cells[r, c] < M.CALM:
                d.rectangle([ox + c * fw / cols, oy + r * fh / rows, ox + (c + 1) * fw / cols - 1, oy + (r + 1) * fh / rows - 1],
                            fill=(60, 130, 255, 34))
    for zx0, zy0, zx1, zy1 in crit['zones']:
        d.rectangle([ox + zx0 * fw, oy + zy0 * fh, ox + zx1 * fw - 1, oy + zy1 * fh - 1], fill=(255, 60, 60, 46))
    for k in (1, 2):
        d.line([(ox + fw * k / 3, oy), (ox + fw * k / 3, oy + fh)], fill=(255, 255, 255, 60))
        d.line([(ox, oy + fh * k / 3), (ox + fw, oy + fh * k / 3)], fill=(255, 255, 255, 60))
    for i, ln in enumerate(crit['lines'][:12]):
        x, y, bw, bh = ln['box']
        col = (255, 220, 60, 230) if i == 0 else (255, 220, 60, 140)
        d.rectangle([ox + x * s, oy + y * s, ox + (x + bw) * s, oy + (y + bh) * s], outline=col, width=2 if i == 0 else 1)
        if i < 4:
            sheet.text(ox + x * s, oy + y * s - 13, f"{ln['h'] * 100:.1f}%", 10, (255, 220, 60))
    f = crit['focal']
    sheet.circle(ox + f['x'] * fw, oy + f['y'] * fh, 10 + 22 * f['clarity'], outline=D.ACCENT, width=3)
    # panel
    px = fw + 20
    y = 10
    sc = crit['score']
    sheet.text(px, y, title, 13, D.DIM)
    y += 20
    sheet.text(px, y, f"POSTER {sc}/100", 24, D.GOOD if sc >= 70 else D.WARN if sc >= 55 else D.BAD, bold=True)
    if crit.get('capped'):
        sheet.text(px + 190, y + 8, f"dibatasi: {', '.join(crit['capped'])} gagal", 11, D.WARN)
    y += 38
    sw = panel_w - 20
    xs = px
    for p in crit['palette'][:6]:
        ww = max(4, int(sw * p['share']))
        sheet.rect(xs, y, ww, 16, fill=D.hex_rgb(p['hex']))
        xs += ww
    y += 20
    sheet.text(px, y, 'tinta: ' + '  '.join(p['hex'] for p in crit['ink'][:5]), 11, D.DIM, mono=True)
    xs = px
    y += 16
    for p in crit['ink'][:6]:
        sheet.rect(xs, y, 26, 12, fill=D.hex_rgb(p['hex']))
        xs += 30
    y += 22
    for it in crit['items']:
        col = D.verdict_color(it['ok'])
        sheet.text(px, y, f"{it['key']:<8} {it['pts']:>2}/{it['max']:<2}", 12, col, mono=True)
        sheet.text(px + 118, y, it['got'], 11, D.PAPER)
        y += 15
        if it['ok'] is False and it['fix']:
            for chunk in _wrap('→ ' + it['fix'], 52):
                sheet.text(px + 118, y, chunk, 10, D.DIM)
                y += 13
        y += 3
    sheet.text(px, sheet.im.size[1] - 22, 'biru = ruang tenang · merah = zona UI · kuning = baris teks · magenta = fokus', 10, D.DIM)
    return sheet


def _wrap(s, n):
    out, cur = [], ''
    for word in s.split():
        if len(cur) + len(word) + 1 > n:
            out.append(cur)
            cur = word
        else:
            cur = (cur + ' ' + word).strip()
    if cur:
        out.append(cur)
    return out
