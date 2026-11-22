// b3.js — helpers bab 3 "Pintar ujian, belum tentu pintar hidup" (ruang ujian = layar UI, dunia terang-dingin).
//  stairsL  : anak tangga film (agi.js) dalam warna dunia terang + LUBANG yang runtuh di waktunya
//  box      : menara kaca 3D (Rapor Bergerigi) · footprint : kavling kosong garis putus lime
//  dotsFrom / morph / drawMorph : ★ Morf Titik Dua Gelombang — foto larut jadi ribuan titik, tiap titik punya jam sendiri
//            (gelombang 1 lepas, gelombang 2 merakit), digambar 8 path (satu per nada) ke kanvas offscreen → satu drawImage
//  panel (jendela aplikasi), medal, kalender sobek, grid ARC, glitch, coret, corat (arsiran asal), memo (kartu ingatan UI)
import { clamp, inv, lerp, E, spring, LIME, LIME_INK, INK, CARD, CARD_INK, ivo, setFont, DSP, MN, SRF, rnd, mk, D2R } from './kit.js';

export const rgbMix = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;
const poly = (ctx, P) => { ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i].x, P[i].y); ctx.closePath(); };

// ── anak tangga terang dengan lubang ─────────────────────────────────────────────────────────────────────────
const BGC = [187, 207, 222], STEP = [138, 163, 183], TREAD = [221, 232, 240];
/** S = makeSteps(...) dari agi.js · holes = { indeks: tRuntuh } · lit(i,t) 0..1 */
export function stairsL(ctx, t, pr, items, S, lit = () => 1, o = {}) {
  const X0 = o.x0 ?? -1400, X1 = o.x1 ?? 1400, holes = o.holes || {};
  S.forEach((s, i) => {
    const L = lit(i, t), th = holes[i], fall = th !== undefined ? E.inCubic(inv(th, th + .45, t)) : 0;
    items.push({ z: s.z - 2, x: 0, d: pr(0, s.y1, s.z).z + 1, f: () => {
      const P = [pr(X0, s.y0, s.z), pr(X1, s.y0, s.z), pr(X1, s.y1, s.z), pr(X0, s.y1, s.z), pr(X1, s.y1, s.z1), pr(X0, s.y1, s.z1)];
      if (P.some(p => p.z < 120)) return;
      const fog = clamp(1.15 - (P[2].z - 1500) / 10000) * L;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1;
      if (fall < 1) {                                                   // pijakan (jatuh + memudar saat bolong)
        const dy = 900 * fall, Q = [pr(X0, s.y1 + dy, s.z), pr(X1, s.y1 + dy, s.z), pr(X1, s.y1 + dy, s.z1), pr(X0, s.y1 + dy, s.z1)];
        if (!Q.some(p => p.z < 120)) { ctx.globalAlpha = 1 - fall; ctx.fillStyle = rgbMix(BGC, TREAD, fog); poly(ctx, Q); ctx.fill(); ctx.globalAlpha = 1; }
      }
      if (th !== undefined && t > th) {                                 // lubang: sumur gelap + bibir lime putus-putus
        const k = E.outCubic(inv(th, th + .4, t));
        ctx.fillStyle = `rgba(15,26,34,${.55 * k * fog})`; poly(ctx, [P[3], P[2], P[4], P[5]]); ctx.fill();
        ctx.strokeStyle = `rgba(200,245,60,${.95 * k})`; ctx.lineWidth = Math.max(1.5, 5 * P[3].s); ctx.setLineDash([18 * P[3].s + 4, 12 * P[3].s + 3]);
        poly(ctx, [P[3], P[2], P[4], P[5]]); ctx.stroke(); ctx.setLineDash([]);
      }
      const g = ctx.createLinearGradient(0, P[0].y, 0, P[3].y);
      g.addColorStop(0, rgbMix(BGC, STEP, .45 * fog)); g.addColorStop(1, rgbMix(BGC, STEP, fog));
      ctx.fillStyle = g; poly(ctx, P.slice(0, 4)); ctx.fill();
      if (L > 0 && th === undefined || (th !== undefined && t < th)) {
        ctx.strokeStyle = ivo(.6 * fog); ctx.lineWidth = Math.max(1, 3 * P[3].s); ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
      }
    } });
  });
}

// ── menara kaca ──────────────────────────────────────────────────────────────────────────────────────────────
/** kotak kaca berdiri di lantai (y 0), pusat alas (x, z), lebar w, dalam d, tinggi h. o.a alpha, o.ink garis, o.solid (isi lebih pekat), o.wire (hanya kerangka) */
export function box(ctx, pr, x, z, w, d, h, o = {}) {
  if (h < 1 && !o.wire) return;
  const x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2, y1 = -h;
  const a = pr(x0, 0, z0), b = pr(x1, 0, z0), c = pr(x1, 0, z1), dd = pr(x0, 0, z1), A = pr(x0, y1, z0), B = pr(x1, y1, z0), C = pr(x1, y1, z1), D = pr(x0, y1, z1);
  if ([a, b, c, dd, A, B, C, D].some(p => p.z < 60)) return;
  const al = (o.a ?? 1) * clamp(1.25 - a.z / 14000), lw = Math.max(1, (o.lw ?? 2.2) * a.s);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = al;
  if (o.wire) { ctx.strokeStyle = ivo(o.wa ?? .16); ctx.lineWidth = lw * .7; ctx.setLineDash([6, 8]);
    for (const F of [[A, B, C, D], [a, A], [b, B], [c, C], [dd, D]]) { ctx.beginPath(); ctx.moveTo(F[0].x, F[0].y); for (const p of F.slice(1)) ctx.lineTo(p.x, p.y); if (F.length > 2) ctx.closePath(); ctx.stroke(); }
    ctx.setLineDash([]); ctx.globalAlpha = 1; return; }
  ctx.fillStyle = 'rgba(15,26,34,.14)'; poly(ctx, [a, b, c, dd]); ctx.fill();                    // bayangan alas
  const sideL = [a, dd, D, A], sideR = [b, c, C, B], back = [dd, c, C, D], top = [A, B, C, D], front = [a, b, B, A];
  const zL = (a.z + D.z) / 2, zR = (b.z + C.z) / 2, S = o.solid ? 1.6 : 1;
  const fill = (P, c0, c1) => { const g = ctx.createLinearGradient(0, Math.min(...P.map(p => p.y)), 0, Math.max(...P.map(p => p.y))); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; poly(ctx, P); ctx.fill(); };
  fill(back, `rgba(225,236,244,${.18 * S})`, `rgba(190,208,222,${.22 * S})`);
  for (const P of zL > zR ? [sideL, sideR] : [sideR, sideL]) fill(P, `rgba(240,247,252,${.32 * S})`, `rgba(160,184,202,${.4 * S})`);
  fill(top, `rgba(255,255,255,${.62 * S})`, `rgba(235,244,250,${.55 * S})`);
  fill(front, `rgba(248,252,255,${.42 * S})`, `rgba(150,176,196,${.45 * S})`);
  ctx.strokeStyle = o.ink || ivo(.55); ctx.lineWidth = lw;
  for (const P of [front, top, zL > zR ? sideR : sideL]) { poly(ctx, P); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = lw * 1.4; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();   // kilau bibir atas
  if (o.cap) { ctx.strokeStyle = o.cap; ctx.lineWidth = lw * 2.4; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); }
  ctx.globalAlpha = 1;
}
/** kavling kosong: footprint garis putus lime yang berkedip (k 0..1 = muncul, blink 0..1) */
export function footprint(ctx, pr, x, z, w, d, k, blink = 1) {
  if (k <= 0) return; const P = [pr(x - w / 2, 0, z - d / 2), pr(x + w / 2, 0, z - d / 2), pr(x + w / 2, 0, z + d / 2), pr(x - w / 2, 0, z + d / 2)];
  if (P.some(p => p.z < 60)) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = k;
  ctx.fillStyle = `rgba(200,245,60,${.22 * blink})`; poly(ctx, P); ctx.fill();
  ctx.strokeStyle = `rgba(120,160,20,${.5 + .5 * blink})`; ctx.lineWidth = Math.max(2, 6 * P[0].s); ctx.setLineDash([20 * P[0].s + 4, 14 * P[0].s + 3]); ctx.lineDashOffset = -40 * k;
  poly(ctx, P); ctx.stroke(); ctx.setLineDash([]); ctx.lineDashOffset = 0;
  ctx.strokeStyle = `rgba(200,245,60,${blink})`; ctx.lineWidth = Math.max(1.5, 3 * P[0].s); poly(ctx, P); ctx.stroke(); ctx.globalAlpha = 1;
}

// ── ★ Morf Titik Dua Gelombang ───────────────────────────────────────────────────────────────────────────────
/** titik dari kanvas c (konten tergambar di ukuran lokal, berpusat): grid langkah step, buang yang gelap (< thr). → { X, Y, V, n } */
export function dotsFrom(c, step, thr = .12, seed = 1) {
  const w = Math.floor(c.width / step), h = Math.floor(c.height / step), [, g] = mk(w, h); g.drawImage(c, 0, 0, w, h);
  const d = g.getImageData(0, 0, w, h).data, X = [], Y = [], V = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4, L = (.3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]) / 255 * d[i + 3] / 255;
    if (L < thr) continue; const k = X.length + seed * 977;
    X.push((x + .5) * step - c.width / 2 + (rnd(k) - .5) * step * .45); Y.push((y + .5) * step - c.height / 2 + (rnd(k + 5) - .5) * step * .45); V.push(clamp((L - thr) / (1 - thr) * 1.15)); }
  return { X, Y, V, n: X.length };
}
/** pasangkan titik A (sumber) ke B (target): urut pita-y lalu x di keduanya → aliran rapi; awan acak di antaranya; jam tiap titik */
export function morph(A, B) {
  const ord = P => [...Array(P.n).keys()].sort((i, j) => (Math.floor(P.Y[i] / 36) - Math.floor(P.Y[j] / 36)) || (P.X[i] - P.X[j]));
  const ia = ord(A), ib = ord(B), N = A.n, F = () => new Float32Array(N);
  const M = { N, ax: F(), ay: F(), av: F(), bx: F(), by: F(), bv: F(), cx: F(), cy: F(), dl: F(), w: F() };
  let xmin = 1e9, xmax = -1e9; for (const x of A.X) { xmin = Math.min(xmin, x); xmax = Math.max(xmax, x); }
  for (let k = 0; k < N; k++) {
    const i = ia[k], j = ib[Math.floor(k * B.n / N)];
    M.ax[k] = A.X[i]; M.ay[k] = A.Y[i]; M.av[k] = A.V[i]; M.bx[k] = B.X[j]; M.by[k] = B.Y[j]; M.bv[k] = B.V[j];
    const ang = Math.atan2(M.ay[k], M.ax[k]) + (rnd(k * 1.3) - .5) * 1.6, r = 120 + rnd(k * 2.7) * 420;
    M.cx[k] = (M.ax[k] + M.bx[k]) * .5 + Math.cos(ang) * r * 1.3; M.cy[k] = (M.ay[k] + M.by[k]) * .5 + Math.sin(ang) * r * .8;
    M.dl[k] = .6 * (M.ax[k] - xmin) / (xmax - xmin + 1) + .4 * rnd(k * 3.3); M.w[k] = rnd(k * 5.1) * 6.28;
  }
  return M;
}
const BINS = Array.from({ length: 8 }, () => null);
/** tulis titik ke g (kanvas offscreen, sudah dibersihkan, pusat di cx,cy). k = { r1, a1, r2, a2 } waktu gelombang (lepas, rakit, lepas, kembali).
 *  o.sp sebaran jam (s) · o.du durasi tiap titik · o.bT = { s, ox, oy } transform pose B · o.rgb warna · o.r0/o.r1 ukuran titik */
export function drawMorph(g, M, t, k, o = {}) {
  const SP = o.sp ?? 1.1, DU = o.du ?? .75, bs = o.bT?.s ?? 1, bx0 = o.bT?.ox ?? 0, by0 = o.bT?.oy ?? 0, cx = o.cx ?? g.canvas.width / 2, cy = o.cy ?? g.canvas.height / 2;
  const r0 = o.r0 ?? 1.3, r1 = o.r1 ?? 2.6;
  for (let b = 0; b < 8; b++) BINS[b] = new Path2D();
  for (let i = 0; i < M.N; i++) {
    const d = M.dl[i] * SP;
    const u1 = E.inOutCubic(clamp((t - k.r1 - d) / DU)), u2 = E.outQuint(clamp((t - k.a1 - d) / DU));
    const u3 = E.inOutCubic(clamp((t - k.r2 - d) / DU)), u4 = E.outQuint(clamp((t - k.a2 - d) / DU));
    const wob = (u1 - u2 + u3 - u4) * 14, ph = t * 1.9 + M.w[i];
    const bx = M.bx[i] * bs + bx0, by = M.by[i] * bs + by0;
    let x = M.ax[i], y = M.ay[i];
    x = lerp(x, M.cx[i] + Math.cos(ph) * wob, u1); y = lerp(y, M.cy[i] + Math.sin(ph) * wob, u1);
    x = lerp(x, bx, u2); y = lerp(y, by, u2);
    const c2x = M.cx[i] * .7 + bx0 * .6, c2y = M.cy[i] * .7;
    x = lerp(x, c2x + Math.sin(ph) * wob, u3); y = lerp(y, c2y + Math.cos(ph) * wob, u3);
    x = lerp(x, M.ax[i], u4); y = lerp(y, M.ay[i], u4);
    const v = M.av[i] + (M.bv[i] - M.av[i]) * clamp(u2 - u4), r = (r0 + v * r1) * (u2 > .5 && u4 < .5 ? lerp(1, bs, .5) : 1);
    BINS[Math.min(7, Math.floor(v * 8))].rect(cx + x - r, cy + y - r, r * 2, r * 2);
  }
  const rgb = o.rgb || '236,244,250', a = o.alpha ?? 1;
  for (let b = 0; b < 8; b++) { g.fillStyle = `rgba(${rgb},${(a * (.28 + .72 * b / 7)).toFixed(3)})`; g.fill(BINS[b]); }
}

// ── jendela aplikasi (UI terang, bukan kertas) ──────────────────────────────────────────────────────────────
/** pusat (x, y), w×h; pegas masuk di t0; o.title mono di bilah; o.dark; o.isi(ctx, L, T, w, h) di koordinat jendela */
export function panel(ctx, x, y, w, h, t, t0, o = {}) {
  const s0 = t - t0; if (s0 <= 0) return; const k = spring(s0, .62, .34), a0 = ctx.globalAlpha, L = -w / 2, T = -h / 2, dk = !!o.dark;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 50); const sc = lerp(.92, 1, Math.min(k, 1.03)); ctx.scale(sc, sc); ctx.globalAlpha = a0 * clamp(s0 / .14);
  ctx.save(); ctx.shadowColor = 'rgba(15,26,34,.38)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 30; ctx.fillStyle = dk ? '#0F1A22' : '#F4F7F9'; ctx.beginPath(); ctx.roundRect(L, T, w, h, 22); ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.roundRect(L, T, w, h, 22); ctx.clip();
  ctx.fillStyle = dk ? '#1A2833' : '#DCE5EC'; ctx.fillRect(L, T, w, 64);
  for (let d = 0; d < 3; d++) { ctx.fillStyle = dk ? 'rgba(236,244,250,.3)' : 'rgba(15,26,34,.28)'; ctx.beginPath(); ctx.arc(L + 34 + 26 * d, T + 32, 7, 0, 7); ctx.fill(); }
  if (o.title) { setFont(ctx, MN(19), 3); ctx.fillStyle = dk ? 'rgba(236,244,250,.8)' : 'rgba(15,26,34,.75)'; ctx.textAlign = 'left'; ctx.fillText(o.title, L + 128, T + 39); }
  if (o.tag) { setFont(ctx, MN(16), 4); ctx.textAlign = 'right'; ctx.fillStyle = dk ? 'rgba(236,244,250,.55)' : 'rgba(15,26,34,.5)'; ctx.fillText(o.tag, L + w - 28, T + 39); ctx.textAlign = 'left'; }
  if (o.isi) o.isi(ctx, L, T, w, h);
  ctx.restore(); ctx.strokeStyle = dk ? 'rgba(236,244,250,.22)' : 'rgba(15,26,34,.22)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(L, T, w, h, 22); ctx.stroke();
  ctx.restore(); ctx.globalAlpha = a0;
}

// ── medali line-art yang berputar 3D (cos sudut = lebar), sisi depan bintang, sisi belakang teks ─────────────
export function medal(ctx, x, y, r, ang, o = {}) {
  const cw = Math.cos(ang), a0 = ctx.globalAlpha; ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = o.ink || INK; ctx.lineWidth = o.lw ?? 4; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-r * .55, -r * 2.3); ctx.lineTo(-r * .12, -r * .95); ctx.moveTo(r * .55, -r * 2.3); ctx.lineTo(r * .12, -r * .95);
  ctx.moveTo(-r * .2, -r * 2.3); ctx.lineTo(r * .05, -r * 1.3); ctx.moveTo(r * .2, -r * 2.3); ctx.lineTo(-r * .05, -r * 1.3); ctx.stroke();
  ctx.scale(Math.max(.03, Math.abs(cw)), 1);
  ctx.fillStyle = o.fill || 'rgba(244,247,249,.9)'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.lineWidth = (o.lw ?? 4) * .6; ctx.beginPath(); ctx.arc(0, 0, r * .8, 0, 7); ctx.stroke();
  for (let i = 0; i < 36; i++) { const q = i / 36 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(q) * r * .86, Math.sin(q) * r * .86); ctx.lineTo(Math.cos(q) * r * .94, Math.sin(q) * r * .94); ctx.stroke(); }
  if (cw >= 0) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const q = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .22 : r * .52; ctx.lineTo(Math.cos(q) * rr, Math.sin(q) * rr); } ctx.closePath(); ctx.lineWidth = o.lw ?? 4; ctx.stroke(); }
  else { ctx.scale(-1, 1); setFont(ctx, MN(r * .2), 2); ctx.fillStyle = o.ink || INK; ctx.textAlign = 'center'; ctx.fillText(o.back1 || 'IMO', 0, -r * .05); ctx.fillText(o.back2 || '2025', 0, r * .25); ctx.textAlign = 'left'; }
  ctx.restore(); ctx.globalAlpha = a0;
}

// ── kalender UI yang lembarnya disobek (a → b) di tT ────────────────────────────────────────────────────────
export function kalender(ctx, x, y, t, t0, tT, a, b, o = {}) {
  const k = spring(t - t0, .6, .32); if (t <= t0) return; const w = o.w ?? 560, h = o.h ?? 640, a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 60); ctx.globalAlpha = a0 * clamp((t - t0) / .15);
  const page = (m, yy) => { ctx.fillStyle = '#F4F7F9'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2 + 90, w, h - 90, [0, 0, 22, 22]); ctx.fill();
    setFont(ctx, MN(30), 8); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(15,26,34,.6)'; ctx.fillText(m[1], 0, -h / 2 + 160);
    setFont(ctx, DSP(300), 4); ctx.fillStyle = '#0F1A22'; ctx.fillText(m[0], 0, 150); ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(15,26,34,.12)'; for (let i = 0; i < 5; i++) ctx.fillRect(-w / 2 + 50 + i * ((w - 100) / 5), h / 2 - 70, (w - 100) / 5 - 16, 22); };
  ctx.save(); ctx.shadowColor = 'rgba(15,26,34,.35)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = '#F4F7F9'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 22); ctx.fill(); ctx.restore();
  page(b);
  const u = E.inCubic(inv(tT, tT + .55, t));
  if (u < 1) { ctx.save(); ctx.translate(-w / 2 + 40, -h / 2 + 90 + 900 * u * u); ctx.rotate(u * 26 * D2R); ctx.translate(w / 2 - 40, h / 2 - 90); ctx.globalAlpha = a0 * (1 - u * u);
    const lift = E.outCubic(inv(tT - .25, tT, t)); ctx.rotate(-lift * 3 * D2R); page(a);
    if (t > tT - .25) { ctx.strokeStyle = 'rgba(15,26,34,.5)'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 28; i++) ctx.lineTo(-w / 2 + i * w / 28, -h / 2 + 92 + (i % 2 ? 9 : 0)); ctx.stroke(); }
    ctx.restore(); }
  ctx.fillStyle = '#0F1A22'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, 92, [22, 22, 0, 0]); ctx.fill();
  for (const rx of [-w * .28, w * .28]) { ctx.fillStyle = '#BBCFDE'; ctx.beginPath(); ctx.arc(rx, -h / 2 + 46, 13, 0, 7); ctx.fill(); }
  setFont(ctx, MN(18), 6); ctx.fillStyle = 'rgba(236,244,250,.8)'; ctx.textAlign = 'center'; ctx.fillText(o.head || 'KALENDER', 0, -h / 2 + 53); ctx.textAlign = 'left';
  ctx.restore(); ctx.globalAlpha = a0;
}

// ── grid ARC (kode, bukan tangkapan layar): '.' kosong, '#' tinta, '+' abu, '*' lime; reveal sel per sel dari t0 ──
export function grid(ctx, x, y, cell, rows, t, t0, o = {}) {
  if (t <= t0) return; const n = rows.length, m = rows[0].length, w = m * cell, h = n * cell, a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x - w / 2, y - h / 2);
  ctx.fillStyle = 'rgba(244,247,249,.92)'; ctx.fillRect(-6, -6, w + 12, h + 12);
  for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) { const ch = rows[r][c]; if (ch === '.') continue;
    const s = t - t0 - (o.stag ?? .012) * (r * m + c); if (s <= 0) continue; const kk = Math.min(1, spring(s, .6, .22));
    ctx.fillStyle = ch === '#' ? '#0F1A22' : ch === '*' ? LIME : 'rgba(15,26,34,.38)'; const q = cell * (1 - kk) / 2;
    ctx.fillRect(c * cell + 2 + q, r * cell + 2 + q, cell - 4 - 2 * q, cell - 4 - 2 * q); }
  ctx.strokeStyle = 'rgba(15,26,34,.18)'; ctx.lineWidth = 1; ctx.beginPath();
  for (let i = 0; i <= m; i++) { ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, h); } for (let i = 0; i <= n; i++) { ctx.moveTo(0, i * cell); ctx.lineTo(w, i * cell); } ctx.stroke();
  ctx.strokeStyle = 'rgba(15,26,34,.55)'; ctx.lineWidth = 2; ctx.strokeRect(-6, -6, w + 12, h + 12);
  ctx.restore(); ctx.globalAlpha = a0;
}

// ── teks bergetar glitch (irisan horizontal bergeser, dua bayangan) ──────────────────────────────────────────
const GL = new Map();
export function glitch(ctx, str, x, y, t, t0, css, o = {}) {
  if (t <= t0) return; const key = str + css; let G = GL.get(key);
  if (!G) { const [c0, g0] = mk(10, 10); setFont(g0, css, o.ls || 0); const tw = Math.ceil(g0.measureText(str).width) + 40, size = parseFloat(/(\d+(\.\d+)?)px/.exec(css)[1]);
    const [c, g] = mk(tw, Math.ceil(size * 1.2)); setFont(g, css, o.ls || 0); g.fillStyle = INK; g.fillText(str, 20, size * .95); G = { c, w: tw, h: c.height }; GL.set(key, G); }
  const s = t - t0, f = Math.floor(t * 24), amp = (o.amp ?? 1) * (s < .5 ? 1.6 - s : .35 + .65 * (rnd(f * 3) > .82 ? 1 : 0)), a0 = ctx.globalAlpha, x0 = x - G.w / 2, y0 = y - G.h * .8;
  ctx.globalAlpha = a0 * clamp(s / .08);
  const N = 14, sh = G.h / N;
  for (const [dx, al] of [[-14 * amp, .18], [11 * amp, .14]]) { ctx.globalAlpha = a0 * al; ctx.drawImage(G.c, x0 + dx + (rnd(f) - .5) * 8 * amp, y0); }
  ctx.globalAlpha = a0;
  for (let i = 0; i < N; i++) { const off = rnd(f * 7 + i) > .7 ? (rnd(f * 11 + i) - .5) * 60 * amp : (rnd(f + i) - .5) * 4 * amp;
    ctx.drawImage(G.c, 0, i * sh, G.w, sh + .5, x0 + off, y0 + i * sh, G.w, sh + .5); }
  if (amp > .5) { ctx.fillStyle = ivo(.5); for (let i = 0; i < 3; i++) { const yy = y0 + rnd(f * 13 + i) * G.h; ctx.fillRect(x0 + rnd(f * 17 + i) * G.w * .6, yy, G.w * (.1 + rnd(f + i * 9) * .3), 3); } }
}

// ── coret: dua garis tangan bergelombang yang tergores berurutan (gaya bab 3, bukan strike pustaka) ─────────
export function coret(ctx, x0, x1, y, t, t0, o = {}) {
  const a0 = ctx.globalAlpha; ctx.save(); ctx.strokeStyle = o.col || INK; ctx.lineWidth = o.lw ?? 7; ctx.lineCap = 'round';
  for (let j = 0; j < 2; j++) { const k = E.outCubic(inv(t0 + j * .12, t0 + j * .12 + .25, t)); if (k <= 0) continue;
    ctx.beginPath(); const n = 24, xe = lerp(x0, x1, k);
    for (let i = 0; i <= n; i++) { const xx = lerp(x0 - 10, xe + 10, i / n), yy = y + (j ? -8 : 6) + Math.sin(i * 1.3 + j * 2) * 3 + (j ? 1 : -1) * (i / n) * 10; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
    ctx.stroke(); }
  ctx.restore(); ctx.globalAlpha = a0;
}
// ── corat: arsiran asal-asalan mengisi lingkaran (jawaban yang ditebak) ──────────────────────────────────────
export function corat(ctx, x, y, r, t, t0, o = {}) {
  const k = clamp((t - t0) / (o.dur ?? .6)); if (k <= 0) return; const n = 22, m = Math.floor(n * k), a0 = ctx.globalAlpha;
  ctx.save(); ctx.strokeStyle = o.col || INK; ctx.lineWidth = o.lw ?? 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= m; i++) { const yy = -r * .8 + i / n * r * 1.6, hw = Math.sqrt(Math.max(0, r * r * .8 - yy * yy)), sg = i % 2 ? 1 : -1;
    const xx = sg * hw * (.8 + rnd(i + 3) * .35) + (rnd(i) - .5) * 10; i ? ctx.lineTo(x + xx, y + yy + (rnd(i + 7) - .5) * 6) : ctx.moveTo(x + xx, y + yy); }
  ctx.stroke(); ctx.restore(); ctx.globalAlpha = a0;
}
// ── memo: kartu "DIINGAT" UI; jatuh (gravitasi + putar) mulai tF ────────────────────────────────────────────
export function memo(ctx, x, y, text, t, t0, tF, o = {}) {
  const s = t - t0; if (s <= 0) return; const k = spring(s, .6, .28), fa = tF !== undefined ? Math.max(0, t - tF - (o.dl || 0)) : 0;
  const a0 = ctx.globalAlpha, w = o.w ?? 420, h = 118; if (fa > 1.4) return;
  ctx.save(); ctx.translate(x + fa * (o.vx ?? 60), y + 1400 * fa * fa); ctx.rotate(((o.rot ?? 0) + fa * (o.spin ?? 50)) * D2R);
  const sc = lerp(.7, 1, Math.min(1, k)); ctx.scale(sc, sc); ctx.globalAlpha = a0 * clamp(s / .1) * (1 - clamp((fa - .9) / .5));
  ctx.save(); ctx.shadowColor = 'rgba(15,26,34,.3)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; ctx.fillStyle = '#F4F7F9'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#0F1A22'; ctx.beginPath(); ctx.arc(-w / 2 + 34, -h / 2 + 34, 9, 0, 7); ctx.fill();
  setFont(ctx, MN(15), 4); ctx.fillStyle = 'rgba(15,26,34,.55)'; ctx.fillText(o.label || 'DIINGAT · HARI 1', -w / 2 + 56, -h / 2 + 40);
  setFont(ctx, SRF(30), 0); ctx.fillStyle = '#0F1A22'; ctx.fillText(text, -w / 2 + 28, h / 2 - 26);
  ctx.restore(); ctx.globalAlpha = a0;
}
