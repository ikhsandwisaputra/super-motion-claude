// Mata Mesin for bab-1 — generated from tes-mata/src/film.js (approved test); edit the test's lessons here, not the template.
// Tes "Mata Mesin" (signature motif #2, ai-data-habis · tema ASLI atau SALINAN?). One shot, own camera, two real photos.
// Idea: we see the world the way the model reads it. A village sign (Latin + aksara Jawa, B3_1) is swept by a scan column and
// turns into shape-vector glyphs (each 12×20 cell picks the character whose 2×3 ink shape matches the local picture, recipe R5),
// then the text line is cut into token boxes; a lime cursor walks the tokens ("sepotong kata"). On "AI nyicil baca dunia" the
// camera whips down to a warung (B1_2) that the machine eats block by block in reading order, accelerating. On "nasi" a lime
// token box locks on the banner's "Nasi goreng"; on "per suap" the photo comes back in three bites.
// The only lime: the token being read. Ivory glyphs on room ink. K = 1 (frame-pure ASCII); the whip gets a manual smear.
import { W, H, clamp, inv, lerp, E, IVORY, LIME, ROOM, ivo, setFont, DISP, MONO, txt, rnd, mk, loadImg, grainRect } from './kit.js';

const MN = (s, w = 700) => `${w} ${s}px "${MONO}"`, DSP = s => `400 ${s}px "${DISP}"`;
const CW = 12, CH = 20, COLS = W / CW | 0, ROWS = Math.ceil(H / CH);            // 160 × 54 cells
const CHARS = ' .,:;\'"-_=+*^~!/\\|()[]<>ilIjtfrcxvzoaeumnwOQ0#%@';
const SIGN = { x: -1200, y: -708, w: 2400, h: 1416 };                             // B3_1 3840×2264 → world units
const WAR = { x: -1350, y: 1287.5, w: 2700, h: 2025 };                            // B1_2 1920×1440
const gx = (px, R, gw) => R.x + px / gw * R.w;                                    // measured on 1280-wide grids
const TOK = [[118, 292], [292, 458], [470, 640], [640, 800], [815, 978], [978, 1168]]
  .map(([a, b]) => ({ x: gx(a, SIGN, 1280) - 6, y: -176, w: gx(b, SIGN, 1280) - gx(a, SIGN, 1280) + 12, h: 140 }));
const AKS = (() => { const r = [], x0 = gx(135, SIGN, 1280), x1 = gx(1150, SIGN, 1280); let x = x0;
  for (let i = 0; i < 11; i++) { const w = i === 10 ? x1 - x : (x1 - x0) / 11 * (.75 + .5 * rnd(i + 90)); r.push({ x, y: -8, w, h: 222 }); x += w; } return r; })();
const NASI = { x: -472, y: 1820, w: 585, h: 105, a: -.11 };                     // "Nasi goreng" on the banner, rotated
const BW = 120, BH = 75, NBX = Math.ceil(WAR.w / BW), NBY = 21, NB = NBX * NBY;    // eat region: the visible upper warung

export function makeMata(A, END) {          // ported 1:1 from tes-mata (approved 15 Nov); END = end of the window in film time
  let PS, PW, MS, MW, GI, GL, VEC, SRC, sx, SM, sm, TMP;

  function machine(c, f, bl = 0) {                                    // photo → grey "what the model weighs" source (bl: local mean for edges)
    const [o, g] = mk(c.width >> 1, c.height >> 1); g.imageSmoothingQuality = 'high'; g.drawImage(c, 0, 0, o.width, o.height);
    const im = g.getImageData(0, 0, o.width, o.height), d = im.data;
    let b = null; if (bl) { const [, h] = mk(o.width, o.height); h.filter = `blur(${bl}px)`; h.drawImage(o, 0, 0); b = h.getImageData(0, 0, o.width, o.height).data; }
    for (let y = 0; y < o.height; y++) for (let x = 0; x < o.width; x++) {
      const i = 4 * (y * o.width + x), L = (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255, m = 255 * f(L, x / o.width, y / o.height, b ? (.2126 * b[i] + .7152 * b[i + 1] + .0722 * b[i + 2]) / 255 : L);
      d[i] = d[i + 1] = d[i + 2] = m; d[i + 3] = 255;
    }
    g.putImageData(im, 0, 0); return o;
  }
  function graded(c, filter) { const [o, g] = mk(c.width, c.height); g.filter = filter; g.drawImage(c, 0, 0); return o; }
  function atlas(ink) {
    const [a, g] = mk(CW * CHARS.length, CH); g.font = `400 ${CH * .85}px "${MONO}"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = ink;
    [...CHARS].forEach((ch, i) => g.fillText(ch, (i + .5) * CW, CH / 2)); return a;
  }
  async function load() {
    await document.fonts.load(`400 17px "${MONO}"`);
    const s = await loadImg('../assets/shared/humanis/B3_1.jpg', 2400), w = await loadImg('../assets/shared/humanis/B1_2.jpg', 1920);
    PS = graded(s, 'saturate(.6) contrast(1.08) brightness(.95)'); PW = graded(w, 'saturate(.72) contrast(1.12)');
    MS = machine(s, (L, u, v) => clamp((1 - L - .28) / .55) * (u < .03 || u > .975 || v < .09 || v > .93 ? .25 : 1));  // ink letters → bright
    MW = machine(w, (L, u, v, Lb) => clamp(5.5 * Math.max(0, Lb - L) + 1.6 * Math.max(0, L - Lb) + .16 * L) ** .8, 6);   // warung: strokes darker than their surround → bright (like the sign), contours, flats → dust
    GI = atlas(IVORY); GL = atlas(LIME);
    const d = GI.getContext('2d').getImageData(0, 0, GI.width, CH).data;
    VEC = [...CHARS].map((_, i) => { const v = [0, 0, 0, 0, 0, 0];
      for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) v[(x * 2 / CW | 0) + 2 * (y * 3 / CH | 0)] += d[4 * (y * GI.width + i * CW + x) + 3] / 255;
      return v; });
    for (let k = 0; k < 6; k++) { const m = Math.max(...VEC.map(v => v[k])) || 1; VEC.forEach(v => v[k] /= m); }
    [SRC, sx] = mk(W >> 1, H >> 1); [SM, sm] = mk(2 * COLS, 3 * ROWS); sm.imageSmoothingQuality = 'high'; sx.imageSmoothingQuality = 'high';
    [TMP] = mk(W, H);
  }

  // ── timeline ──────────────────────────────────────────────────────────────────────────────────────────────
  const scanQ = t => E.inOutCubic(inv(A.token - .04, A.token + .62, t));
  const scanX = t => lerp(SIGN.x - 160, SIGN.x + SIGN.w + 160, scanQ(t));
  const tokAt = i => A.potongan - .05 + i * .09, aksAt = i => A.kira - .02 + i * .035;
  const CUR = [[A.tulisan - .05, 0], [A.kira - .05, 1], [A.sepotong - .04, 2], [A.kata - .04, 3]];
  const EAT0 = A.nyicil - .15, EAT1 = A.ini + .25;
  const TE = Array.from({ length: NB }, (_, i) => EAT0 + (EAT1 - EAT0) * ((i + 1) / NB) ** .3);   // slow first bites, then a rush
  const BITES = [[NASI.x, NASI.y, A.per2 - .04, A.per2 + .2, 560], [-40, 2060, A.suap - .04, A.suap + .22, 980], [NASI.x, NASI.y, A.suap + .3, A.suap + .78, 2700]];
  const CAM = [[A.token - .1, A.potongan + .5, E.outCubic, [0, -60, .95]], [A.kira - .05, A.sepotong + .2, E.brake, [-10, -60, 1.62]],
    [A.ai - .14, A.ai + .36, E.inOutQuart, [0, 1880, .74]], [A.nyicil, A.persis + .1, E.inOutSine, [-100, 1960, .79]],
    [A.makan - .22, A.nasi + .3, E.brake, [-470, 1840, 1.42]], [A.per2 - .05, A.suap + .9, E.outCubic, [-380, 1880, 1.28]]];
  function cam(t) {
    let x = 0, y = -30, k = .8 + .04 * inv(0, A.token, t);
    for (const [a, b, e, [X, Y, K]] of CAM) { const q = e(inv(a, b, t)); x = lerp(x, X, q); y = lerp(y, Y, q); k = Math.exp(lerp(Math.log(k), Math.log(K), q)); }
    const w = inv(A.ai - .14, A.ai + .36, t);
    return { x: x + 5 * Math.sin(t * .8), y: y + 3 * Math.cos(t * .67), k, r: .004 * Math.sin(t * .5) + .022 * Math.sin(Math.PI * w) };
  }
  const apply = (g, c, s = 1) => { g.setTransform(s, 0, 0, s, 0, 0); g.translate(W / 2, H / 2); g.rotate(c.r); g.scale(c.k, c.k); g.translate(-c.x, -c.y); };
  const inR = (R, x, y) => x >= R.x && x < R.x + R.w && y >= R.y && y < R.y + R.h;
  function inNasi(x, y) { const dx = x - NASI.x, dy = y - NASI.y, cs = Math.cos(-NASI.a), sn = Math.sin(-NASI.a);
    return Math.abs(dx * cs - dy * sn) < NASI.w / 2 && Math.abs(dx * sn + dy * cs) < NASI.h / 2; }
  function bitten(x, y, t) {
    for (const [bx, by, a, b, R] of BITES) { const q = E.outCubic(inv(a, b, t)); if (q <= 0) continue;
      const dx = x - bx, dy = y - by, an = Math.atan2(dy, dx), r = R * q * (1 + .07 * Math.sin(an * 7 + bx) + .04 * Math.sin(an * 13));
      if (dx * dx + dy * dy < r * r) return true; }
    return false;
  }
  function cursor(t) {                                                // lime token cursor on the sign: [rect, alpha]
    let i = -1, p = 1, prev = -1; for (const [a, j] of CUR) if (t >= a) { prev = i; i = j; p = E.outQuint(inv(a, a + .16, t)); }
    if (i < 0) return null; const R = TOK[i], P = prev >= 0 ? TOK[prev] : R;
    return { x: lerp(P.x, R.x, p), y: R.y, w: lerp(P.w, R.w, p), h: R.h, a: E.outCubic(inv(A.tulisan - .05, A.tulisan + .1, t)) * (1 - inv(A.ai - .1, A.ai + .1, t)) };
  }
  // 0 photo · 1 glyph · 2 lime glyph · +4 fresh (just eaten)
  function mode(x, y, t, cr) {
    if (inR(SIGN, x, y)) { if (x >= scanX(t)) return 0; return cr && cr.a > .5 && inR(cr, x, y) ? 2 : 1; }
    if (inR(WAR, x, y)) {
      if (bitten(x, y, t)) return 0;
      const v = (y - WAR.y) / BH | 0, te = v >= NBY ? EAT1 : TE[v * NBX + ((x - WAR.x) / BW | 0)];
      if (t < te) return 0;
      return (t > A.nasi - .08 && inNasi(x, y) ? 2 : 1) + (t - te < .14 ? 4 : 0);
    }
    return t > A.token ? 1 : 0;
  }
  const counted = t => TOK.reduce((n, _, i) => n + (t > tokAt(i)), 0) + AKS.reduce((n, _, i) => n + (t > aksAt(i)), 0)
    + TE.reduce((n, te) => n + (t >= te), 0);

  function box(g, R, p, col, lw) {                                    // outline drawn on clockwise by p
    const per = 2 * (R.w + R.h); g.strokeStyle = col; g.lineWidth = lw; g.setLineDash(p < 1 ? [per * p, per] : []);
    g.strokeRect(R.x, R.y, R.w, R.h); g.setLineDash([]);
  }

  function ascii(ctx, c, t) {
    sx.setTransform(1, 0, 0, 1, 0, 0); sx.fillStyle = '#000'; sx.fillRect(0, 0, SRC.width, SRC.height);
    apply(sx, c, .5); sx.drawImage(MS, SIGN.x, SIGN.y, SIGN.w, SIGN.h); sx.drawImage(MW, WAR.x, WAR.y, WAR.w, WAR.h);
    sm.clearRect(0, 0, SM.width, SM.height); sm.drawImage(SRC, 0, 0, SM.width, SM.height);
    const d = sm.getImageData(0, 0, SM.width, SM.height).data, cr = cursor(t);
    const cs = Math.cos(-c.r), sn = Math.sin(-c.r), M = new Uint8Array(COLS * ROWS);
    for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
      const dx = q * CW + CW / 2 - W / 2, dy = r * CH + CH / 2 - H / 2;
      M[r * COLS + q] = mode(c.x + (dx * cs - dy * sn) / c.k, c.y + (dx * sn + dy * cs) / c.k, t, cr);
    }
    ctx.fillStyle = ROOM;                                              // ink behind glyph cells, merged per row
    for (let r = 0; r < ROWS; r++) { let q0 = -1;
      for (let q = 0; q <= COLS; q++) { const on = q < COLS && M[r * COLS + q] > 0;
        if (on && q0 < 0) q0 = q; else if (!on && q0 >= 0) { ctx.fillRect(q0 * CW, r * CH, (q - q0) * CW, CH); q0 = -1; } } }
    const v = [0, 0, 0, 0, 0, 0];
    for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) {
      const m = M[r * COLS + q]; if (!m) continue;
      for (let k = 0; k < 6; k++) { const i = 4 * ((3 * r + (k >> 1)) * SM.width + 2 * q + (k & 1)); v[k] = d[i] / 255; }
      const pk = Math.max(...v); if (pk < .03) continue;
      for (let k = 0; k < 6; k++) v[k] = (v[k] / pk) ** 1.5 * pk;
      let best = 0, bd = 1e9;
      for (let j = 0; j < VEC.length; j++) { const g = VEC[j]; let e = 0; for (let k = 0; k < 6; k++) e += (g[k] - v[k]) ** 2; if (e < bd) { bd = e; best = j; } }
      ctx.globalAlpha = m & 4 ? 1 : .25 + .75 * pk;
      ctx.drawImage((m & 3) === 2 ? GL : GI, best * CW, 0, CW, CH, q * CW, r * CH, CW, CH);
    }
    ctx.globalAlpha = 1;
  }

  function draw(ctx, t) {
    const c = cam(t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    apply(ctx, c); ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(PS, SIGN.x, SIGN.y, SIGN.w, SIGN.h); ctx.drawImage(PW, WAR.x, WAR.y, WAR.w, WAR.h);
    ctx.setTransform(1, 0, 0, 1, 0, 0); grainRect(ctx, 0, 0, W, H, t, .12);
    if (t > A.token - .1) ascii(ctx, c, t);

    apply(ctx, c);                                                     // in-plane marks: scan column, token boxes, cursors
    const sq = scanQ(t);
    if (sq > 0 && sq < 1) { const X = scanX(t), g = ctx.createLinearGradient(X - 90, 0, X + 30, 0);
      g.addColorStop(0, 'rgba(241,239,230,0)'); g.addColorStop(.75, `rgba(241,239,230,${.32 * Math.sin(Math.PI * sq)})`); g.addColorStop(1, 'rgba(241,239,230,0)');
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(X - 90, SIGN.y - 40, 120, SIGN.h + 80);
      ctx.fillStyle = ivo(.8 * Math.sin(Math.PI * sq)); ctx.fillRect(X + 22, SIGN.y - 40, 3 / c.k, SIGN.h + 80); ctx.restore(); }
    const sgn = 1 - inv(A.ai + .05, A.ai + .3, t);
    if (sgn > 0) {
      ctx.globalAlpha = sgn;
      AKS.forEach((R, i) => { const p = E.outCubic(inv(aksAt(i), aksAt(i) + .22, t)); if (p > 0) box(ctx, R, p, ivo(.34), 2 / c.k); });
      TOK.forEach((R, i) => { const p = E.outCubic(inv(tokAt(i), tokAt(i) + .26, t)); if (p <= 0) return;
        box(ctx, R, p, ivo(.75), 2.4 / c.k);
        ctx.globalAlpha = sgn * clamp(p * 2); setFont(ctx, MN(16 / Math.sqrt(c.k) * 1.4, 700), 3); ctx.fillStyle = ivo(.7); ctx.textAlign = 'left';
        ctx.fillText(`T${String(i + 1).padStart(2, '0')}`, R.x + 4, R.y - 12); ctx.globalAlpha = sgn; });
      const cr = cursor(t);
      if (cr && cr.a > 0) { ctx.globalAlpha = cr.a * sgn; box(ctx, cr, 1, LIME, 4 / c.k);
        const s = 18 / c.k; setFont(ctx, MN(s, 700), 3); const tw = ctx.measureText('TOKEN').width + s;
        ctx.fillStyle = LIME; ctx.fillRect(cr.x, cr.y + cr.h + 6 / c.k, tw, 1.6 * s); ctx.fillStyle = '#1B2400'; ctx.textAlign = 'left'; ctx.fillText('TOKEN', cr.x + s / 2, cr.y + cr.h + 6 / c.k + 1.15 * s); }
      ctx.globalAlpha = 1;
    }
    let n = 0; for (const te of TE) n += t >= te;                     // the eating head: lime outline on the next block
    if (n > 0 && n < NB && t < EAT1) { const bx = WAR.x + (n % NBX) * BW, by = WAR.y + (n / NBX | 0) * BH;
      ctx.globalAlpha = .9; box(ctx, { x: bx, y: by, w: BW, h: BH }, 1, LIME, 3 / c.k); ctx.globalAlpha = 1; }
    const nq = E.outCubic(inv(A.nasi - .1, A.nasi + .22, t)), nout = inv(A.suap + .7, A.suap + 1.2, t);
    if (nq > 0 && nout < 1) {                                          // the nasi token: the one lime read, survives the bites
      ctx.save(); ctx.translate(NASI.x, NASI.y); ctx.rotate(NASI.a); ctx.globalAlpha = 1 - nout;
      const R = { x: -NASI.w / 2, y: -NASI.h / 2, w: NASI.w, h: NASI.h }; box(ctx, R, nq, LIME, 4 / c.k);
      const s = 18 / c.k; setFont(ctx, MN(s, 700), 3); const tw = ctx.measureText('TOKEN').width + s;
      ctx.globalAlpha = (1 - nout) * clamp(nq * 2); ctx.fillStyle = LIME; ctx.fillRect(R.x, R.y - 1.9 * s, tw, 1.6 * s);
      ctx.fillStyle = '#1B2400'; ctx.textAlign = 'left'; ctx.fillText('TOKEN', R.x + s / 2, R.y - .75 * s); ctx.restore();
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;

    for (let i = 0; i < 6; i++) {                                      // FG: big out-of-focus characters, strongest parallax
      const px = ((rnd(i + 700) * W * 1.5 - c.x * c.k * .5) % (W * 1.5) + W * 1.5) % (W * 1.5) - W * .25;
      const py = ((rnd(i + 701) * H * 2 - c.y * c.k * .5) % (H * 2) + H * 2) % (H * 2) - H * .5;
      ctx.save(); ctx.filter = `blur(${9 + 6 * rnd(i + 702)}px)`; ctx.globalAlpha = .07 + .05 * rnd(i + 703); ctx.fillStyle = IVORY;
      setFont(ctx, `700 ${220 + 160 * rnd(i + 704)}px "${MONO}"`, 0); ctx.fillText(CHARS[8 + (rnd(i + 705) * 40 | 0)], px, py); ctx.restore();
    }
    const c0 = cam(t - .017), c1 = cam(t + .017), vy = (c1.y - c0.y) * c.k, vx = (c1.x - c0.x) * c.k, L = Math.hypot(vx, vy);
    if (L > 14) {                                                      // whip smear (K = 1): equal-weight average along the move
      const tg = TMP.getContext('2d'); tg.setTransform(1, 0, 0, 1, 0, 0); tg.globalAlpha = 1; tg.drawImage(ctx.canvas, 0, 0);
      const n = 6, l = Math.min(L, 220); for (let i = 1; i <= n; i++) { const f = (i / n - .5) * l / L; ctx.globalAlpha = 1 / (i + 1); ctx.drawImage(TMP, -vx * f, -vy * f); }
      ctx.globalAlpha = 1;
    }

    const sc = ctx.createLinearGradient(0, H - 330, 0, H); sc.addColorStop(0, 'rgba(11,12,9,0)'); sc.addColorStop(1, 'rgba(11,12,9,.78)');   // scrim under HUD
    ctx.fillStyle = sc; ctx.fillRect(0, H - 330, W, 330);
    const hud = E.outCubic(inv(A.potongan - .1, A.potongan + .25, t)) * (1 - inv(END - .5, END - .1, t));
    if (hud > 0) {                                                     // HUD: tokens read so far
      ctx.globalAlpha = hud; txt(ctx, 'TOKEN DIBACA', 92, 860, t, A.potongan - .1, MN(22), { ls: 5, col: ivo(.7), rise: 10 });
      setFont(ctx, DSP(200), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(String(counted(t)).padStart(4, '0'), 86, 1040); ctx.globalAlpha = 1;
    }
    const c1a = E.outCubic(inv(A.kata - .05, A.kata + .2, t)) * (1 - inv(A.ai - .2, A.ai, t));
    if (c1a > 0) { ctx.globalAlpha = c1a; txt(ctx, '1 TOKEN ≈ SEPOTONG KATA', 1828, 1000, t, A.kata - .05, MN(30), { ls: 5, col: ivo(.92), align: 'right', rise: 14 }); ctx.globalAlpha = 1; }
    if (t > A.suap + .2) {
      ctx.globalAlpha = 1 - inv(END - .4, END - .05, t);
      txt(ctx, 'DIBACA PER POTONGAN', 1828, 960, t, A.suap + .2, MN(30), { ls: 5, col: ivo(.92), align: 'right', rise: 14 });
      txt(ctx, 'kayak makan: per suap', 1828, 1004, t, A.suap + .45, MN(22, 400), { ls: 2, col: ivo(.65), align: 'right', rise: 10 });
      ctx.globalAlpha = 1;
    }
  }

  return { load, draw };
}
