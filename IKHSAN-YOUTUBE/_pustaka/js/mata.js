// pustaka · bintang.mata — Mata Mesin (bintang ai-data-habis bab-1, ledger mata-mesin-ascii-token). Cooldown 2 film: di film berikutnya
// hanya beat kecil atau remix, bukan headline. Dunia dilihat seperti model membacanya: kolom scan menyapu foto dan tiap sel 12×20 berubah
// jadi huruf yang bentuk tinta 2×3-nya paling mirip gambar setempat (bukan ASCII gelap-terang biasa), lalu baris dipotong jadi kotak
// token dan kursor lime berjalan per token; cara 'blok' memakan foto blok demi blok dalam urutan baca, makin cepat.
// Beda dari film: grid lokal (ikut onPlane/kamera, dihitung sekali di bacaMesin); film menghitung ulang di grid layar tiap frame (K = 1).
// Koreografi film (kamera, whip, gigitan, HUD 'TOKEN DIBACA') tetap di film: makeMata, ai-data-habis bab-1/src/mata.js:24.
import { clamp, inv, lerp, E, LIME, LIME_INK, MONO, LIGHT, BG, INK, INKRGB, ivo, setFont, MN, mk } from '../kit.js';

export const HURUF = ' .,:;\'"-_=+*^~!/\\|()[]<>ilIjtfrcxvzoaeumnwOQ0#%@';
const ATL = new Map(), VEC = new Map();
function atlas(col, aw, ah) {                                          // one strip of glyphs per colour and size, cached
  const key = `${col}|${aw}|${ah}`; let A = ATL.get(key); if (A) return A;
  const [C, g] = mk(aw * HURUF.length, ah); g.font = `400 ${ah * .85}px "${MONO}"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col;
  [...HURUF].forEach((h, i) => g.fillText(h, (i + .5) * aw, ah / 2)); ATL.set(key, C); return C;
}
function vectors(aw, ah) {                                             // ink shape per glyph: 2×3 sub-block sums, each component / its max
  const key = `${aw}|${ah}`; let V = VEC.get(key); if (V) return V;
  const A = atlas('#fff', aw, ah), d = A.getContext('2d').getImageData(0, 0, A.width, ah).data;
  V = [...HURUF].map((_, i) => { const v = [0, 0, 0, 0, 0, 0];
    for (let y = 0; y < ah; y++) for (let x = 0; x < aw; x++) v[(x * 2 / aw | 0) + 2 * (y * 3 / ah | 0)] += d[4 * (y * A.width + i * aw + x) + 3] / 255;
    return v; });
  for (let k = 0; k < 6; k++) { const m = Math.max(...V.map(v => v[k])) || 1; V.forEach(v => v[k] /= m); }
  VEC.set(key, V); return V;
}
const MODE = {                                                         // what the machine weighs (0..1 = glyph ink), f(L, u, v, Lb)
  tinta: L => clamp((1 - L - .28) / .55),                              // dark ink (signs, print) → bright glyphs
  terang: L => clamp((L - .28) / .55),                                 // light things (lamps, screens) → bright glyphs
  tepi: (L, u, v, Lb) => clamp(5.5 * Math.max(0, Lb - L) + 1.6 * Math.max(0, L - Lb) + .16 * L) ** .8,   // strokes + contours, flats → dust
};
const lum = (d, i) => (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255;

// (load, async) foto → apa yang ditimbang mesin: grid sel ±cw×ch unit lokal, tiap sel memilih huruf yang bentuk tinta 2×3-nya paling mirip foto setempat → M untuk mataMesin · o: mode 'tinta'|'tepi'|'terang' atau f(L, u, v, Lb), cw=12, ch=20, bl (blur rata-rata lokal px; tepi = 6), grade (filter foto), res=1.5 (tajam huruf saat di-zoom) · asal: ai-data-habis bab-1/src/mata.js:27 · ledger: mata-mesin-ascii-token
export async function bacaMesin(img, w, h, o = {}) {
  await document.fonts.load(`400 17px "${MONO}"`);
  const cols = Math.max(1, Math.round(w / (o.cw ?? 12))), rows = Math.max(1, Math.round(h / (o.ch ?? 20)));
  const mode = o.mode ?? 'tinta', f = o.f ?? MODE[mode] ?? MODE.tinta, bl = o.bl ?? (mode === 'tepi' ? 6 : 0);
  const mw = Math.max(2 * cols, Math.round(w / 2)), mh = Math.max(3 * rows, Math.round(h / 2));
  const [Mc, g] = mk(mw, mh); g.imageSmoothingQuality = 'high'; g.drawImage(img, 0, 0, mw, mh);
  const im = g.getImageData(0, 0, mw, mh), d = im.data;
  let b = null; if (bl) { const [, hb] = mk(mw, mh); hb.filter = `blur(${bl}px)`; hb.drawImage(Mc, 0, 0); b = hb.getImageData(0, 0, mw, mh).data; }
  for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) {
    const i = 4 * (y * mw + x), L = lum(d, i), m = 255 * clamp(f(L, x / mw, y / mh, b ? lum(b, i) : L));
    d[i] = d[i + 1] = d[i + 2] = m; d[i + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  const [S, s] = mk(2 * cols, 3 * rows); s.imageSmoothingQuality = 'high'; s.drawImage(Mc, 0, 0, S.width, S.height);
  const sd = s.getImageData(0, 0, S.width, S.height).data, res = o.res ?? 1.5, aw = Math.round((o.cw ?? 12) * res), ah = Math.round((o.ch ?? 20) * res);
  const V = vectors(aw, ah), G = new Uint8Array(cols * rows).fill(255), P = new Float32Array(cols * rows), v = [0, 0, 0, 0, 0, 0];
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    for (let k = 0; k < 6; k++) v[k] = sd[4 * ((3 * r + (k >> 1)) * S.width + 2 * q + (k & 1))] / 255;
    const pk = Math.max(...v); if (pk < .03) continue;
    for (let k = 0; k < 6; k++) v[k] = (v[k] / pk) ** 1.5 * pk;        // sharpen the shape, keep the weight
    let best = 0, bd = 1e9;
    for (let j = 0; j < V.length; j++) { const gv = V[j]; let e = 0; for (let k = 0; k < 6; k++) e += (gv[k] - v[k]) ** 2; if (e < bd) { bd = e; best = j; } }
    G[r * cols + q] = best; P[r * cols + q] = pk;
  }
  const [F, fg] = mk(img.width, img.height); fg.filter = o.grade ?? 'saturate(.6) contrast(1.08) brightness(.95)'; fg.drawImage(img, 0, 0);
  return { w, h, cols, rows, cw: w / cols, ch: h / rows, aw, ah, G, P, foto: F, n: G.reduce((n, x) => n + (x < 255), 0) };
}

function box(ctx, R, p, col, lw) {                                     // outline drawn on clockwise by p
  const per = 2 * (R.w + R.h); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(p < 1 ? [per * p, per] : []);
  ctx.strokeRect(R.x, R.y, R.w, R.h); ctx.setLineDash([]);
}
// Mata Mesin di bidang lokal (pusat x, y, ukuran M.w×M.h): kolom scan menyapu kiri→kanan (inOutCubic), sel di belakangnya jadi huruf bentuk-tinta di atas BG, lalu kotak token tergambar searah jarum jam (label T01…) dan kursor lime 'TOKEN' melompat per token (hurufnya ikut lime) · cara 'blok': foto dimakan blok demi blok urutan baca, makin cepat, kepala lime di blok berikutnya · o: cara='scan'|'blok', dur (.66 | 2.4), pad=160, tok [[u, v, uw, vh] 0..1], tokT, langkah=.45, kursor [[t, i]…]|false, blok {bw=10, bh=4 sel}, keluar (t tanda pudar), foto=true, warna (huruf, INK), bg (BG), lw=2.4, ls=22 · kembali: token + blok terbaca (untuk HUD) · asal: ai-data-habis bab-1/src/mata.js:107 · ledger: mata-mesin-ascii-token
export function mataMesin(ctx, M, x, y, t, t0, o = {}) {
  const a0 = ctx.globalAlpha, s = t - t0, L = x - M.w / 2, T = y - M.h / 2, { cols, rows, cw } = M, chh = M.ch;
  if (o.foto !== false) ctx.drawImage(M.foto, L, T, M.w, M.h);
  if (s < 0) return 0;
  const blok = o.cara === 'blok', dur = o.dur ?? (blok ? 2.4 : .66), pad = o.pad ?? 160, lw = o.lw ?? 2.4, ls = o.ls ?? 22;
  const keluar = o.keluar ? 1 - inv(o.keluar, o.keluar + .25, t) : 1;
  const tok = (o.tok || []).map(([u, v, uw, vh]) => ({ x: L + u * M.w, y: T + v * M.h, w: uw * M.w, h: vh * M.h }));
  const tokT = o.tokT ?? t0 + dur + .06, tokAt = i => tokT + i * .09;
  const CUR = o.kursor === false ? [] : (o.kursor ?? tok.map((_, i) => [tokT + .3 + i * (o.langkah ?? .45), i]));
  let cr = null;                                                       // lime cursor: lerps from the previous token (outQuint .16 s)
  { let i = -1, p = 1, prev = -1; for (const [a, j] of CUR) if (t >= a) { prev = i; i = j; p = E.outQuint(inv(a, a + .16, t)); }
    if (i >= 0 && tok[i]) { const R = tok[i], P = prev >= 0 && tok[prev] ? tok[prev] : R;
      cr = { x: lerp(P.x, R.x, p), y: lerp(P.y, R.y, p), w: lerp(P.w, R.w, p), h: lerp(P.h, R.h, p), a: E.outCubic(inv(CUR[0][0], CUR[0][0] + .15, t)) * keluar }; } }
  const bw = o.blok?.bw ?? 10, bh = o.blok?.bh ?? 4, nbx = Math.ceil(cols / bw), NB = nbx * Math.ceil(rows / bh);
  const te = i => t0 + dur * ((i + 1) / NB) ** .3;                     // slow first bites, then a rush
  const sq = blok ? 1 : E.inOutCubic(clamp(s / dur)), X = lerp(L - pad, L + M.w + pad, sq);
  const md = new Uint8Array(cols * rows);                              // 0 photo · 1 glyph · 2 lime glyph · +4 fresh (just eaten)
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    const cx = L + (q + .5) * cw, cy = T + (r + .5) * chh; let m = 1;
    if (!blok) { if (cx >= X) continue; }
    else { const e = te((r / bh | 0) * nbx + (q / bw | 0)); if (t < e) continue; if (t - e < .14) m += 4; }
    if (cr && cr.a > .5 && cx >= cr.x && cx < cr.x + cr.w && cy >= cr.y && cy < cr.y + cr.h) m = (m & 4) | 2;
    md[r * cols + q] = m;
  }
  ctx.fillStyle = o.bg ?? BG; ctx.beginPath();                         // paper behind read cells, one path (no seams)
  for (let r = 0; r < rows; r++) { let q0 = -1;
    for (let q = 0; q <= cols; q++) { const on = q < cols && md[r * cols + q] > 0;
      if (on && q0 < 0) q0 = q; else if (!on && q0 >= 0) { ctx.rect(L + q0 * cw, T + r * chh, (q - q0) * cw, chh); q0 = -1; } } }
  ctx.fill();
  const GI = atlas(o.warna ?? INK, M.aw, M.ah), GL = atlas(LIME, M.aw, M.ah);
  for (let i = 0; i < md.length; i++) {
    const m = md[i], gi = M.G[i]; if (!m || gi === 255) continue;
    ctx.globalAlpha = a0 * (m & 4 ? 1 : .25 + .75 * M.P[i]);
    ctx.drawImage((m & 3) === 2 ? GL : GI, gi * M.aw, 0, M.aw, M.ah, L + (i % cols) * cw, T + (i / cols | 0) * chh, cw, chh);
  }
  ctx.globalAlpha = a0; ctx.save();
  if (sq > 0 && sq < 1) {                                              // scan column: soft glow + hard line (lighter on dark, ink on light)
    const k = Math.sin(Math.PI * sq), g = ctx.createLinearGradient(X - 90, 0, X + 30, 0);
    g.addColorStop(0, `rgba(${INKRGB},0)`); g.addColorStop(.75, `rgba(${INKRGB},${(LIGHT ? .18 : .32) * k})`); g.addColorStop(1, `rgba(${INKRGB},0)`);
    ctx.globalCompositeOperation = LIGHT ? 'source-over' : 'lighter'; ctx.fillStyle = g; ctx.fillRect(X - 90, T - 40, 120, M.h + 80);
    ctx.fillStyle = ivo(.8 * k); ctx.fillRect(X + 22, T - 40, 3, M.h + 80); ctx.globalCompositeOperation = 'source-over';
  }
  let n = 0;
  tok.forEach((R, i) => { const p = E.outCubic(inv(tokAt(i), tokAt(i) + .26, t)); if (p <= 0) return; n++;
    ctx.globalAlpha = a0 * keluar; box(ctx, R, p, ivo(.75), lw);
    ctx.globalAlpha = a0 * keluar * clamp(p * 2); setFont(ctx, MN(ls), 3); ctx.fillStyle = ivo(.7); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(`T${String(i + 1).padStart(2, '0')}`, R.x + 4, R.y - 12); });
  if (cr && cr.a > 0) {
    const ts = ls * .8; ctx.globalAlpha = a0 * cr.a; box(ctx, cr, 1, LIME, lw * 1.67);
    setFont(ctx, MN(ts), 3); const tw = ctx.measureText('TOKEN').width + ts;
    ctx.fillStyle = LIME; ctx.fillRect(cr.x, cr.y + cr.h + 6, tw, 1.6 * ts); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('TOKEN', cr.x + ts / 2, cr.y + cr.h + 6 + 1.15 * ts);
  }
  if (blok) { let e = 0; for (let i = 0; i < NB; i++) e += t >= te(i); n += e;
    if (e > 0 && e < NB) { ctx.globalAlpha = a0 * .9; box(ctx, { x: L + (e % nbx) * bw * cw, y: T + (e / nbx | 0) * bh * chh, w: Math.min(bw, cols - (e % nbx) * bw) * cw, h: Math.min(bh, rows - (e / nbx | 0) * bh) * chh }, 1, LIME, lw * 1.25); } }
  ctx.restore(); ctx.globalAlpha = a0;
  return n;
}
