"""SKOR RASA: the whole film judged like a senior motion designer would, with numbers.

Ten categories x 10 points. With a reference DNA the targets come from the reference (relative bands), without
one they come from the defaults below (social explainer / kinetic type). Every miss names the number, the target
and the move that fixes it. "Bau template" tells are measured, never a list of forbidden styles: each one is
answered "sengaja, karena …" or fixed.
"""
import numpy as np

DEFAULT = {'fields_per_10s': 0.8, 'step_dE': 15.0, 'L_range': 25.0, 'contrast': 50.0, 'shot_lo': 0.8, 'shot_hi': 3.0,
           'burst_lo': 0.12, 'burst_hi': 0.45, 'punch': 4.0, 'camera': 0.6, 'jump_big': 0.30}


def _pct(v):
    return '–' if v is None else f'{v * 100:.0f}%'


def score(s, posters=(), ref=None, allow_neon=False, flow=False):
    """s: our dna summary; posters: critique dicts of sampled frames; ref: reference dna summary (optional)."""
    dur = s['duration']
    cats = []

    def cat(key, title, pts, got, target, fix):
        cats.append({'key': key, 'title': title, 'pts': pts, 'got': got, 'target': target, 'fix': fix})

    # 1 colour script
    if ref:
        f_t = max(2, round(ref['colour_fields'] / ref['duration'] * dur * 0.7))
        st_t = 0.6 * ref['colour_step_dE']
        lr_t = 0.5 * ref['shot_L_range']
    else:
        f_t = max(2, round(DEFAULT['fields_per_10s'] * dur / 10))
        st_t, lr_t = DEFAULT['step_dE'], DEFAULT['L_range']
    ok = [s['colour_fields'] >= f_t, s['colour_step_dE'] >= st_t, s['shot_L_range'] >= lr_t]
    cat('warna_seksi', 'Color script (field warna per seksi)', 10 if all(ok) else 6 if sum(ok) == 2 else 2,
        f"{s['colour_fields']} field, ΔE antar shot {s['colour_step_dE']}, rentang L {s['shot_L_range']}",
        f"≥ {f_t} field, ΔE ≥ {st_t:.0f}, rentang L ≥ {lr_t:.0f}",
        'Tulis color script per seksi (hook / isi / punchline / CTA) dan ganti LATAR-nya, bukan cuma warna aksen teks; '
        'tiap belokan seksi = field warna atau nilai baru.')
    # 2 value contrast (frame spread, or ink against background for minimal frames with small type)
    c_of = lambda x: max(x['contrast'], x.get('ink_contrast') or 0)
    c = c_of(s)
    c_t = 0.8 * c_of(ref) if ref else DEFAULT['contrast']
    ok = [c >= c_t, s['mud_frames'] <= 0.25]
    cat('kontras', 'Kontras nilai', 10 if all(ok) else 6 if any(ok) else 2,
        f"Δ L p5–p95 {s['contrast']}, tinta vs latar {s.get('ink_contrast', '–')}, frame lumpur {_pct(s['mud_frames'])}",
        f"≥ {c_t:.0f}, lumpur ≤ 25%",
        'Tipe off-white (L ≥ 90) di atas latar yang benar-benar gelap atau benar-benar berwarna; satu seksi boleh latar terang. '
        'Jangan semua elemen di L 5–20.')
    # 3 palette discipline per frame
    cu, ah = s['colours_used'], s['accent_hues']
    cu_t = max(3, ref['colours_used']) if ref else 3   # sets with characters carry more colours than type frames
    ah_t = max(2, ref['accent_hues']) if ref else 2
    pts = 10 if cu <= cu_t and ah <= ah_t else 6 if cu <= cu_t + 1 and ah <= ah_t + 1 else 2
    if s['accent_hues_film'] > max(3, s['colour_fields'] + 2):
        pts = min(pts, 6)  # many accent colours sprinkled over too few colour fields
    cat('palet', 'Disiplin palet', pts,
        f"{cu:g} warna/frame (median), {ah:g} aksen/frame, {s['accent_hues_film']} keluarga aksen sefilm",
        f'≤ {cu_t:g} warna/frame (latar, tipe, aksen), ≤ {ah_t:g} aksen, keluarga aksen sefilm ≤ field + 2',
        'Satu aksen per seksi; aksen kedua hanya untuk satu kata kunci. Ganti variasi warna dengan variasi nilai & skala.')
    # 4 neon / glow budget
    g_t = (ref['glow_halo'] + 0.5) if ref else 1.0
    ok_n = allow_neon or (s['neon_frames'] <= 0.2 and s['glow_halo'] <= g_t)
    cat('neon', 'Anggaran neon/glow', 10 if ok_n else 6 if s['neon_frames'] <= 0.35 else 2,
        f"neon di {_pct(s['neon_frames'])} frame, halo {s['glow_halo']}%/frame", f"≤ 20% frame, halo ≤ {g_t:.1f}%",
        'Satu sumber cahaya per adegan; tipe tanpa glow; aksen solid. Glow hanya untuk practical light di set.')
    # 5 focus and space (minimal styles in the kiblat are meant to be airy: targets follow the reference)
    e_t = max(0.15, ref['empty_frames'] + 0.10) if ref else 0.15
    cr_t = max(0.15, ref['crowded_frames'] + 0.10) if ref else 0.15
    if flow:   # layered collage flow (CLAUDE.md law 2): density is the look; mud/neon tells stay untouched
        cr_t = max(cr_t, 0.35)
    mud_empty = s['empty_frames'] > 0.15 and s['mud_frames'] >= 0.3   # empty AND dark mud = tiny type lost in the void
    ok = [s['empty_frames'] <= e_t and not mud_empty, s['crowded_frames'] <= cr_t, s['one_star'] >= (0.35 if flow else 0.5)]
    cat('fokus_ruang', 'Fokus & ruang', 10 if all(ok) else 6 if sum(ok) == 2 else 2,
        f"kosong melompong {_pct(s['empty_frames'])}, sesak {_pct(s['crowded_frames'])}, satu-bintang {_pct(s['one_star'])}",
        f'kosong ≤ {_pct(e_t)} (dan tidak gelap-lumpur), sesak ≤ {_pct(cr_t)}, satu-bintang ≥ 50%',
        'Hero ≥ 5% (9:16) / 8% (16:9) tinggi frame; ruang kosong dirancang 25–65%, bukan sisa.')
    # 6 eye trace
    j_t = max(DEFAULT['jump_big'], ref['eye_jump_big'] + 0.05) if ref and ref.get('eye_jump_big') is not None else DEFAULT['jump_big']
    jb = s['eye_jump_big']
    cat('jejak_mata', 'Jejak mata di cut', 6 if jb is None else 10 if jb <= j_t else 6 if jb <= j_t + 0.15 else 2,
        f"lompatan besar {_pct(jb)}, median {s['eye_jump'] if s['eye_jump'] is not None else '–'}",
        f"lompatan > 35% diagonal ≤ {_pct(j_t)}",
        'Taruh elemen baru di titik mendarat mata, atau pakai tongkat estafet visual (titik/garis yang meluncur ke posisi berikutnya).')
    # 7 rhythm of bursts and holds
    if ref:
        b_lo, p_t = max(0.08, 0.5 * ref['burst_share']), max(3.0, 0.5 * ref['punch'])
    else:
        b_lo, p_t = DEFAULT['burst_lo'], DEFAULT['punch']
    ok = [b_lo <= s['burst_share'] <= DEFAULT['burst_hi'], s['punch'] >= p_t]
    cat('ritme', 'Ritme gerak (snap vs hold)', 10 if all(ok) else 6 if any(ok) else 2,
        f"burst {_pct(s['burst_share'])}, hold {_pct(s['hold_share'])}, punch {s['punch']}×",
        f"burst {_pct(b_lo)}–{_pct(DEFAULT['burst_hi'])}, punch ≥ {p_t:.0f}×",
        'Snap 85% jarak dalam ±4 frame lalu cushion panjang; hold baca ≥ 1 s + 0,3 s/kata; aksen besar setelah jeda VO.')
    # 8 camera breathes (flat 2D product styles barely move the camera: follow the reference)
    ca = s['camera_alive']
    ca_t = DEFAULT['camera']
    if ref and ref.get('camera_alive') is not None:
        ca_t = min(DEFAULT['camera'], max(0.1, ref['camera_alive'] - 0.1))
    cat('kamera', 'Kamera bernapas saat hold', 6 if ca is None else 10 if ca >= ca_t else 6 if ca >= ca_t * 0.6 else 2,
        f"kamera hidup di {_pct(ca)} hold", f'≥ {_pct(ca_t)}',
        'Drift mikro terus-menerus (dolly ±1–2% atau pan pelan) selama teks dibaca; jangan berhenti mati.')
    # 9 pacing
    if ref:
        lo, hi = 0.6 * ref['shot_median'], 1.7 * ref['shot_median']
    else:
        lo, hi = DEFAULT['shot_lo'], DEFAULT['shot_hi']
    if flow:   # one continuous camera journey replaces many cuts: a long 'shot' is a fly-through, not a stall
        hi *= 1.5
    sm = s['shot_median'] or 0
    cat('pacing', 'Pacing perubahan visual', 10 if lo <= sm <= hi else 6 if lo / 2 <= sm <= hi * 1.6 else 2,
        f"median shot {sm}s, {s['cuts_per_10s']} cut/10 s, {s['transitions']} transisi", f"{lo:.1f}–{hi:.1f}s",
        'Perubahan visual (cut, field warna, gerak kamera besar) mengikuti frasa VO; satu frasa = satu perubahan.')
    # 10 poster test
    if posters:
        passed = sum(1 for p in posters if p['pass'])
        rate = passed / len(posters)
        cat('poster', 'Poster test (momen hold)' if flow else 'Poster test (pause acak)', 10 if rate >= 0.75 else 6 if rate >= 0.5 else 2,
            f"{passed}/{len(posters)} frame ≥ 70", '≥ 75% lolos',
            'Perbaiki frame terlemah dulu sebagai desain diam (styleframe), baru gerakkan.')
    total = sum(c['pts'] for c in cats)
    total = round(total * 100 / (10 * len(cats)))
    return {'score': total, 'cats': cats, 'tells': tells(s, posters, ref), 'advisory': sorted(cats, key=lambda c: c['pts'])[:3]}


def tells(s, posters=(), ref=None):
    t = []
    if s['colour_fields'] <= 1 and s['L50'] < 20:
        t.append(('Satu latar gelap sepanjang film', f"{s['colour_fields']} field warna, L median {s['L50']}"))
    if s['mud_frames'] >= 0.4:
        t.append(('Lumpur gelap', f"{_pct(s['mud_frames'])} frame dengan L median < 22 dan kontras < 45"))
    if (s['glow_halo'] > 2.5 and s['L50'] < 20) or s['neon_frames'] > 0.25:
        t.append(('Neon/glow di latar gelap', f"halo {s['glow_halo']}%/frame, neon di {_pct(s['neon_frames'])} frame"))
    if s['accent_hues_film'] >= 4 and s['colour_fields'] <= 1 and s['L50'] < 20:
        t.append(("Look template 'dark mode + aksen neon/pastel'",
                  f"{s['accent_hues_film']} keluarga aksen ditabur di atas 1 latar gelap (L {s['L50']})"))
    elif s['accent_hues_film'] >= 5 and s['colour_fields'] <= 2:
        t.append(('Aksen pelangi tanpa field warna', f"{s['accent_hues_film']} keluarga aksen, {s['colour_fields']} field"))
    # Ken Burns slideshow: everything drifts at mid speed, never snaps, never rests. Calibrated 2026-11-09 on the
    # 41 kiblat videos (mid-speed share max 0.69, median ≈ 0.35), our films (0.15–0.36) and the hybrid-demo-15s
    # that read as "slide PPT" (0.82). A repeated layout alone is NOT the tell: liked UI promos repeat theirs.
    mid = 1.0 - s['burst_share'] - s['hold_share']
    if mid > 0.75:
        t.append(('Slide ngambang (Ken Burns)', f"{_pct(mid)} waktu gerak setengah-setengah: burst {_pct(s['burst_share'])}, "
                  f"hold {_pct(s['hold_share'])} — snap 4 frame lalu diam, kamera pindah tempat, bukan drift terus"))
    if s['empty_frames'] >= 0.2 and s['mud_frames'] >= 0.3:
        t.append(('Teks kecil di ruang kosong yang gelap', f"{_pct(s['empty_frames'])} frame > 85% ruang tenang, {_pct(s['mud_frames'])} lumpur"))
    if s['punch'] < 4:
        t.append(('Semua gerak rata', f"punch {s['punch']}× (bursts tidak menonjol dari hold)"))
    ref_cam = (ref or {}).get('camera_alive')
    if s['camera_alive'] is not None and s['camera_alive'] < 0.35 and (ref_cam is None or ref_cam >= 0.5):
        t.append(('Kamera mati saat hold', f"hidup di {_pct(s['camera_alive'])} hold"))
    if s['eye_jump_big'] is not None and s['eye_jump_big'] > 0.45:
        t.append(('Mata dilempar-lempar', f"{_pct(s['eye_jump_big'])} cut memindah fokus > 35% diagonal"))
    if (s.get('flash_max_per_s') or 0) > 3:
        t.append(('Kedip melewati batas aman (fotosensitif)', f"{s['flash_max_per_s']} kedip dalam 1 detik (maks 3)"))
    if (s.get('impacts_per_min') or 0) > 20:
        t.append(('Impact 1-frame terlalu sering', f"{s['impact_frames']} kejadian, {s['impacts_per_min']}/menit (≈ maks 1 per 3 s)"))
    if s.get('ca_rest') is not None and s['ca_rest'] >= 0.005:   # ≥ 0.5 % of the width (compressed refs read ~0.4 %)
        fast = f", saat cepat {s['ca_fast'] * 100:.2f}%" if s.get('ca_fast') is not None else ''
        t.append(('Optik nyala terus (CA saat diam)', f"pecah RGB {s['ca_rest'] * 100:.2f}% lebar frame saat hold{fast}"))
    if posters:
        with_text = [p for p in posters if p['lines']]
        weak_type = [p for p in with_text if not next(i for i in p['items'] if i['key'] == 'tipe')['ok']]
        if len(with_text) >= 4 and len(weak_type) / len(with_text) >= 0.6:
            t.append(('Hierarki tipe tanggung', f"{len(weak_type)}/{len(with_text)} frame bertipe gagal aturan double-triple"))
        # grainless is legit for clean product styles (the kiblat is clean digital); only flag it next to dark mud
        if sum(1 for p in posters if p['grain'] < 1.0) >= len(posters) / 2 and s['mud_frames'] >= 0.4:
            t.append(('Licin plastik (tanpa grain) di atas gelap', 'grain < 1 di separuh frame'))
    return t


def text(name, r, s, ref_name=None):
    out = [f"SKOR RASA {name}: {r['score']}/100" + (f"  (target dari referensi {ref_name})" if ref_name else '')]
    for c in r['cats']:
        mark = 'OK ' if c['pts'] == 10 else '~  ' if c['pts'] >= 6 else 'X  '
        out.append(f"  {mark}{c['title']:<34} {c['pts']:>2}/10  {c['got']}  [target {c['target']}]")
    if r['tells']:
        out.append('\nBau template (jawab "sengaja, karena …" atau perbaiki):')
        out += [f"  ⚑ {a}: {b}" for a, b in r['tells']]
    out.append('\n[Motion Review & Advisory] 3 perbaikan terbesar:')
    for i, c in enumerate(r['advisory'], 1):
        out.append(f"  {i}. {c['title']} ({c['got']} → {c['target']}): {c['fix']}")
    return '\n'.join(out)
