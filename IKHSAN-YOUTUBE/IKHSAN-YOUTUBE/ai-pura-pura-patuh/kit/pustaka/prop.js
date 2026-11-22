// prop.js — physical objects, people and buildings that act: a padlock that drops and springs open, a price tag swinging on its
// string, a fence dropped bar by bar, a balance scale (ivory or line) that tips under letter heaps, a robot that rides a bike,
// people in four styles and crowds in three, a turning globe, a dial-up CRT, server racks and a data-centre block, a bucket
// that overflows, kitchen order tickets, coupons, a spinning clock, a banknote, a filling trolley, a tearing calendar, doors,
// a line-icon set, a QRIS food cart, a shelf of books that get read, an oil drop splash and a word well.
// Pustaka kode Super Motion (aset/_pustaka) · in a chapter: import { gembok, labelHarga, timbangan } from './pustaka/prop.js';
// Already in the kit (import from './draw.js'): doc (paper sheet) · chip · mini · coin · stamp · popAt; dasar.js: dummyFoto · paper.
// Conventions: station-local units, centred unless noted · motion as (t, t0) · deterministic (rnd, never Math.random) · respects the
// incoming globalAlpha · colours from the kit theme (INK / ivo / badan() / LIME as the one accent), each overridable with o.col.
import { clamp, inv, lerp, E, spring, INK, BGRGB, LIGHT, SHD, IVORY, LIME, LIME_INK, TILE, D2R, ivo, setFont, DSP, SRF, MN, rnd, mk, typeOn } from '../kit.js';
import { kq, pop, doc, chip } from '../draw.js';
import { KATA, PAPER, letterTex, tileTex } from './dasar.js';

const PINK = '#1D1E18';                                     // ink printed on paper props (same in both themes)
const lt = a => `rgba(241,239,230,${a})`;                   // ivory details on objects that are dark by nature (iron, screens, clocks)
const bgc = () => `rgb(${BGRGB})`;                          // holes and notches show the room
const sh = (ctx, a = .9, blur = 40, sy = 18) => { ctx.shadowColor = `rgba(0,0,0,${SHD * a})`; ctx.shadowBlur = blur; ctx.shadowOffsetY = sy; };
const noSh = ctx => { ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; };
const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const ivoryV = (ctx, x0, x1) => { const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, '#9D9A8F'); g.addColorStop(.45, '#F6F4EC'); g.addColorStop(1, '#8E8B80'); return g; };
const CACHE = new Map();                                    // cached canvases (heaps, QR stickers, banknotes, textures), string keys
function texOf(key, font, rows, seed, a) { let c = CACHE.get(key); if (c) return c; c = letterTex(font, rows, seed, a); if (document.fonts.check(font)) CACHE.set(key, c); return c; }

// body fill of line-art props: paper in the light world, tile in the dark one · asal: ai-data-habis bab-3/src/film.js:60 (PAPER fill)
export const badan = () => LIGHT ? PAPER : TILE;
// damped kick angle (radians) for a hung object: amp° · d decay s · f rad/s · asal: ai-bubble-dompet bab-4/src/film.js:154 · ledger: label-ayun
export const kick = (t, t0, amp, d = .55, f = 9) => t <= t0 ? 0 : amp * D2R * Math.exp(-(t - t0) / d) * Math.sin((t - t0) * f);
// centred multi-line label ('\n'), lines spaced .92·size around y · o.ls · o.col · asal: ai-bubble-dompet bab-4/src/film.js:155
export function teksTengah(ctx, str, x, y, css, size, o = {}) {
  setFont(ctx, css, o.ls || 0); ctx.textAlign = 'center'; ctx.fillStyle = o.col || INK; const L = String(str).split('\n');
  L.forEach((s, i) => ctx.fillText(s, x, y + (i - (L.length - 1) / 2) * size * .92 + size * .34)); ctx.textAlign = 'left';
}
// teardrop added as a new path, body centre 0,0, tip at −1.65 r · asal: ai-data-habis bab-peta/src/film.js:23
export function jalurTetes(ctx, r) {
  ctx.beginPath(); ctx.moveTo(0, -1.65 * r); ctx.bezierCurveTo(r * .5, -r * .95, r, -r * .5, r, 0); ctx.arc(0, 0, r, 0, Math.PI);
  ctx.bezierCurveTo(-r, -r * .5, -r * .5, -r * .95, 0, -1.65 * r); ctx.closePath();
}
// person pictogram ADDED to the current path (feet at y, height ≈ s), fill many in one go · asal: ai-data-habis bab-4/src/ui.js:12
export function jalurOrang(ctx, x, y, s) {
  ctx.moveTo(x + s * .17, y - s * .8); ctx.arc(x, y - s * .8, s * .17, 0, 7);
  ctx.moveTo(x - s * .3, y); ctx.lineTo(x - s * .3, y - s * .36); ctx.arc(x, y - s * .36, s * .3, Math.PI, 0); ctx.lineTo(x + s * .3, y); ctx.closePath();
}
// kraft parcel w×h centred, tape + glint (call inside your own transform) · asal: teknologi-indo-vs-as bab-3/src/film.js:27
export function paket(ctx, w, h) {
  const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, '#D9D2BB'); g.addColorStop(1, '#A79F86');
  ctx.fillStyle = g; rr(ctx, -w / 2, -h / 2, w, h, 5); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = 'rgba(60,55,40,.28)'; ctx.fillRect(-5, -h / 2, 10, h); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 5, w * .3, 5);
}
// a deterministic QR-like sticker canvas (not a real code: finders + random modules), cached per seed · asal: teknologi-indo-vs-as penutup/src/film.js:17
export function stikerQR(seed = 5) {
  const key = 'qr:' + seed; let c = CACHE.get(key); if (c) return c;
  const N = 25, M = 8, Q = 2, S = (N + 2 * Q) * M, [cv, g] = mk(S, S); g.fillStyle = '#F4F2EA'; g.fillRect(0, 0, S, S); g.fillStyle = '#11120E';
  const fin = (i, j) => [[0, 0], [N - 7, 0], [0, N - 7]].some(([a, b]) => i >= a && i < a + 7 && j >= b && j < b + 7);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if (!fin(i, j) && rnd(i * 31.7 + j * 7.3 + seed) < .47) g.fillRect((Q + i) * M, (Q + j) * M, M, M);
  for (const [a, b] of [[0, 0], [N - 7, 0], [0, N - 7]]) for (const [d, col] of [[0, '#11120E'], [1, '#F4F2EA'], [2, '#11120E']]) { g.fillStyle = col; g.fillRect((Q + a + d) * M, (Q + b + d) * M, (7 - 2 * d) * M, (7 - 2 * d) * M); }
  CACHE.set(key, cv); return cv;
}

// line-art padlock that drops in on a spring and (optionally) springs open · o.open 0..1 | o.tOpen · o.drop 600 · o.col · o.hole · asal: ai-data-habis bab-5/src/film.js:170 (+ bab-2:27)
export function gembok(ctx, x, y, s, t, t0, o = {}) {
  const k = t0 == null ? 1 : pop(t, t0, o.z ?? .5, o.T ?? .3); if (k <= 0) return;
  const open = o.open ?? (o.tOpen != null ? Math.min(1.15, pop(t, o.tOpen, .45, .3)) : 0), col = o.col || INK, a0 = ctx.globalAlpha;
  ctx.save(); ctx.globalAlpha = a0 * clamp(3 * k); ctx.translate(x, y - (o.drop ?? 600) * (1 - Math.min(1.08, k)));
  ctx.strokeStyle = col; ctx.lineWidth = s * .17; ctx.lineCap = 'butt';
  ctx.save(); ctx.translate(0, -s * .32 * open); ctx.beginPath(); ctx.moveTo(-s * .4, -s * .1 + s * .32 * open); ctx.lineTo(-s * .4, -s * .5);
  ctx.arc(0, -s * .5, s * .4, Math.PI, 0); ctx.lineTo(s * .4, -s * .1); ctx.stroke(); ctx.restore();
  ctx.fillStyle = col; rr(ctx, -s * .68, -s * .2, s * 1.36, s * 1.05, s * .12); ctx.fill();
  ctx.fillStyle = o.hole || bgc(); ctx.beginPath(); ctx.arc(0, s * .22, s * .13, 0, 7); ctx.fill(); ctx.fillRect(-s * .05, s * .25, s * .1, s * .3); ctx.restore();
}

// price tag on a string from a pin at (x, y): swings in, settles, can be kicked · s = tag width · o.l1 o.l2 · o.from 38° · o.rest 4° · o.kick [[t, deg]] · o.paper · o.ink · asal: ai-data-habis bab-2/src/film.js:35 · ledger: label-ayun
export function labelHarga(ctx, x, y, s = 400, t, t0, o = {}) {
  const u = t - t0; if (u <= 0) return; const w = s, h = o.h ?? .55 * w, L = o.len ?? .225 * w, c = .125 * w, a0 = ctx.globalAlpha;
  let ang = ((o.from ?? 38) * Math.exp(-u * 3.2) * Math.cos(u * 9.5) + (o.rest ?? 4)) * D2R; for (const [tk, d] of o.kick || []) ang += kick(t, tk, d);
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha = a0 * clamp(u / .1);
  ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, L + c * .52); ctx.stroke();
  ctx.translate(0, L); ctx.save(); sh(ctx, .85, 40, 18); ctx.beginPath(); ctx.moveTo(-w / 2 + c, 0); ctx.lineTo(w / 2 - c, 0); ctx.lineTo(w / 2, c); ctx.lineTo(w / 2, h);
  ctx.lineTo(-w / 2, h); ctx.lineTo(-w / 2, c); ctx.closePath(); ctx.fillStyle = o.paper || IVORY; ctx.fill(); ctx.restore();
  ctx.fillStyle = o.hole || bgc(); ctx.beginPath(); ctx.arc(0, c * .52, w * .0225, 0, 7); ctx.fill();
  ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(0, c * .52); ctx.stroke();
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -L, 7, 0, 7); ctx.fill();
  const s1 = o.s1 ?? w * .06; let s2 = o.s2 ?? w * .275; ctx.fillStyle = o.ink || '#15160F'; ctx.textAlign = 'center';
  if (o.l1) { setFont(ctx, MN(s1), 4); ctx.fillText(o.l1, 0, c + 2 + s1 * 1.4); }
  if (o.l2) { setFont(ctx, DSP(s2), 3); const wd = ctx.measureText(o.l2).width; if (wd > w * .86) { s2 *= w * .86 / wd; setFont(ctx, DSP(s2), 3); } ctx.fillText(o.l2, 0, h - .11 * h); }
  ctx.textAlign = 'left'; ctx.restore();
}

// iron fence dropped bar by bar, rails slide out; o.cut [x, y, w, h] (local units) leaves a window open · s = bar height 1120 · o.n 7 · o.gap 260 · o.rails [60, 360] · o.tRail · asal: ai-data-habis bab-2/src/film.js:49
export function pagar(ctx, x, y, s = 1120, t, t0, o = {}) {
  const n = o.n ?? 7, gap = o.gap ?? 260, sy = o.sy ?? 1, iron = o.iron || '#121310', gl = o.glint || lt(.4), sc = s / 1120;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  if (o.cut) { const [cx, cy, cw, ch] = o.cut; ctx.beginPath(); ctx.rect(-4000, -4000, 8000, 8000); ctx.rect(cx - cw / 2, cy - ch / 2, cw, ch); ctx.clip('evenodd'); }
  for (let i = 0; i < n; i++) {
    const k = pop(t, t0 + i * .07, .45, .25); if (k <= 0) continue; const bx = (i - (n - 1) / 2) * gap, top = -560 * sy + lerp(-1300, 0, Math.min(1.05, k));
    ctx.fillStyle = iron; ctx.fillRect(bx - 16, top, 32, 1120 * sy); ctx.fillStyle = gl; ctx.fillRect(bx - 16, top, 4, 1120 * sy);
  }
  const r = kq(t, o.tRail ?? t0 + .5, .3), hw = (n - 1) / 2 * gap + 120;
  if (r > 0) for (const ry of o.rails || [60, 360]) { ctx.fillStyle = iron; ctx.fillRect(-hw * r, ry, 2 * hw * r, 30); ctx.fillStyle = gl; ctx.fillRect(-hw * r, ry, 2 * hw * r, 4); }
  ctx.restore();
}

// a heap of letters falling one by one into a pile (base centre at x, y), cached per frame · s = font px 22 · o.huruf · o.baris 11 (1 = one row) · o.lebar 380 · o.span 2.9 · o.col · asal: ai-data-habis bab-5/src/film.js:219 (data :119)
export function tumpukHuruf(ctx, x, y, s = 22, t, t0, o = {}) {
  const str = o.huruf || 'theandofinisthatforwithwasonbyfrom', baris = o.baris ?? 11, lebar = o.lebar ?? 380, span = o.span ?? 2.9, col = o.col || INK;
  const key = `heap:${o.key || str}|${baris}|${lebar}|${col}|${t0}|${span}`, W = lebar + 80; let P = CACHE.get(key);
  if (!P) { const pts = []; let j = 0;
    for (let r = 0; r < baris; r++) { const n = baris === 1 ? str.length : Math.max(2, Math.floor((lebar - r * 30) / 19));
      for (let q = 0; q < n; q++, j++) pts.push({ x: (q - (n - 1) / 2) * 19 + (rnd(j * 3.3) - .5) * 6, y: -r * 21 + (rnd(j * 7.1) - .5) * 4, ch: str[j % str.length], rot: (rnd(j * 5.7) - .5) * 36 }); }
    P = { pts, C: mk(W, 900), fi: -1 }; CACHE.set(key, P); }
  const fi = Math.round(t * 30);
  if (P.fi !== fi) { P.fi = fi; const g = P.C[1], N = P.pts.length; g.clearRect(0, 0, W, 900); setFont(g, MN(22), 0); g.fillStyle = col; g.textAlign = 'center';
    P.pts.forEach((p, j) => { const ta = t0 + span * (j / N) ** .85, u = inv(ta, ta + .5, t); if (u <= 0) return;
      g.save(); g.globalAlpha = clamp(u * 4); g.translate(W / 2 + p.x, 860 + p.y - 600 * (1 - u * u)); g.rotate(p.rot * u * D2R); g.fillText(p.ch, 0, 0); g.restore(); }); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s / 22, s / 22); ctx.drawImage(P.C[0], -W / 2, -860); ctx.restore();
}

// balance scale, base = floor centre; tips toward the heavier side · s scale · o.style 'gading' (ivory 3D) | 'garis' (line) · o.tilt −8° (+ = right pan down) · o.tTilt · o.sway .4 · o.left/o.right (ctx, t) drawn at the pan rim · o.labels [l, r] · o.subs · o.lime −1|1|0 · o.tLabel · asal: teknologi-indo-vs-as bab-peta/src/film.js:113 + ai-data-habis bab-5/src/film.js:226
export function timbangan(ctx, x, y, s = 1, t, t0, o = {}) {
  const kb = t0 == null ? 1 : kq(t, t0, .6); if (kb <= 0) return;
  let th = o.tilt ?? -8; if (o.tTilt != null) th *= t > o.tTilt ? spring(t - o.tTilt, .42, .8) : 0; th += (o.sway ?? .4) * Math.sin(2.1 * t);
  const ang = th * D2R, a0 = ctx.globalAlpha, A = a0 * clamp(kb * 1.5), lab = o.labels || [], sub = o.subs || [], lime = o.lime ?? -1, col = o.col || INK;
  const tL = i => Array.isArray(o.tLabel) ? o.tLabel[i] : (o.tLabel ?? (t0 ?? 0) + .3) + i * .3;
  ctx.save(); ctx.translate(x, y + (1 - kb) * 80); ctx.scale(s, s); ctx.globalAlpha = A;
  if (o.style === 'garis') {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 7; const py = -516;
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(0, -16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(170, 0); ctx.lineTo(120, -20); ctx.lineTo(-120, -20); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.translate(0, py); ctx.rotate(ang); ctx.fillRect(-590, -6, 1180, 12); ctx.fillRect(-596, -16, 12, 32); ctx.fillRect(584, -16, 12, 32); ctx.restore();
    ctx.beginPath(); ctx.arc(0, py, 18, 0, 7); ctx.fill(); ctx.fillStyle = bgc(); ctx.beginPath(); ctx.arc(0, py, 7, 0, 7); ctx.fill(); ctx.fillStyle = col;
    [-1, 1].forEach((sg, i) => {
      const ex = sg * 580 * Math.cos(ang), ey = py + sg * 580 * Math.sin(ang), rx = ex, ry = ey + 210; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(rx - 170, ry); ctx.moveTo(ex, ey); ctx.lineTo(rx + 170, ry); ctx.stroke();
      const fn = sg < 0 ? o.left : o.right; if (fn) { ctx.save(); ctx.translate(rx, ry); fn(ctx, t); ctx.restore(); }
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(rx - 200, ry); ctx.quadraticCurveTo(rx, ry + 128, rx + 200, ry); ctx.closePath(); ctx.fill();
      if (lab[i]) { setFont(ctx, MN(22), 4); ctx.textAlign = 'center'; ctx.globalAlpha = A * kq(t, tL(i), .4); ctx.fillText(lab[i], rx, ry + 112);
        if (lime === sg) { const w = ctx.measureText(lab[i]).width; ctx.fillStyle = LIME; ctx.fillRect(rx - w / 2 - 26, ry + 95, 14, 14); ctx.fillStyle = col; }
        ctx.globalAlpha = A; ctx.textAlign = 'left'; }
    });
  } else {
    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 420); g.addColorStop(0, `rgba(0,0,0,${Math.min(1, SHD * 1.08)})`); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save(); ctx.scale(1, .12); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 420, 0, 7); ctx.fill(); ctx.restore();
    ctx.fillStyle = ivoryV(ctx, -230, 230); ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(230, 0); ctx.lineTo(170, -64); ctx.lineTo(-170, -64); ctx.closePath(); ctx.fill();
    ctx.fillStyle = ivoryV(ctx, -20, 20); ctx.fillRect(-18, -800, 36, 740);
    const L = 520; ctx.save(); ctx.translate(0, -800); ctx.rotate(ang);
    g = ctx.createLinearGradient(0, -12, 0, 12); g.addColorStop(0, '#FFFFFF'); g.addColorStop(.5, '#E2DFD3'); g.addColorStop(1, '#8E8B80');
    ctx.fillStyle = g; rr(ctx, -L, -11, 2 * L, 22, 11); ctx.fill(); ctx.beginPath(); for (const sg of [-1, 1]) { ctx.moveTo(sg * (L - 20) + 15, 0); ctx.arc(sg * (L - 20), 0, 15, 0, 7); } ctx.fill(); ctx.restore();
    ctx.fillStyle = '#F6F4EC'; ctx.beginPath(); ctx.arc(0, -800, 32, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(11,12,9,.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -800, 18, 0, 7); ctx.stroke();
    [-1, 1].forEach((sg, i) => {
      const hx = sg * (L - 20) * Math.cos(ang), hy = -800 + sg * (L - 20) * Math.sin(ang), py = hy + 340;
      ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.beginPath(); for (const dx of [-150, 0, 150]) { ctx.moveTo(hx, hy); ctx.lineTo(hx + dx, py - (dx ? 0 : 14)); } ctx.stroke();
      g = ctx.createLinearGradient(0, py, 0, py + 60); g.addColorStop(0, '#E9E6DA'); g.addColorStop(1, '#6F6D64');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(hx, py, 170, 62, 0, 0, Math.PI); ctx.fill();
      ctx.fillStyle = '#FBFAF4'; ctx.beginPath(); ctx.ellipse(hx, py, 170, 16, 0, 0, 7); ctx.fill();
      ctx.fillStyle = 'rgba(11,12,9,.18)'; ctx.beginPath(); ctx.ellipse(hx, py + 2, 150, 11, 0, 0, 7); ctx.fill();
      const fn = sg < 0 ? o.left : o.right; if (fn) { ctx.save(); ctx.translate(hx, py); fn(ctx, t); ctx.restore(); }
      if (!lab[i]) return; const k = E.outQuint(inv(tL(i) - .1, tL(i) + .45, t)); if (k <= 0) return;
      setFont(ctx, DSP(118), 2); ctx.textAlign = 'center'; const wd = ctx.measureText(lab[i]).width;
      ctx.save(); ctx.translate(hx, py + 190 + (1 - k) * 60); ctx.globalAlpha = A * k;
      if (lime === sg) { const kl = E.snap(inv(tL(i) + .25, tL(i) + .6, t)); ctx.fillStyle = LIME; ctx.fillRect(-wd / 2 - 26, -104, (wd + 52) * kl, 128); ctx.fillStyle = kl > .5 ? LIME_INK : col; }
      else ctx.fillStyle = ivo(.55);
      ctx.fillText(lab[i], 0, 0);
      if (sub[i]) { setFont(ctx, MN(30, 400), 4); ctx.fillStyle = ivo(.62); ctx.globalAlpha = A * k * E.outCubic(inv(tL(i) + .9, tL(i) + 1.3, t)); ctx.fillText(sub[i], 0, 70); }
      ctx.restore(); ctx.textAlign = 'left';
    });
  }
  ctx.restore();
}

// line-art robot (static): body + head, arms to hand points, eyes that look/blink, glasses, lime antenna · feet ≈ y + .62 s · o.look −1..1 · o.blink · o.glasses · o.rh/o.lh [x, y] · o.rot° · o.lime · o.col · o.fill · asal: ai-data-habis bab-3/src/film.js:58
export function robot(ctx, x, y, s, o = {}) {
  const col = o.col || INK, fill = o.fill || badan();
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot || 0) * D2R); ctx.lineWidth = Math.max(3, s * .045); ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const P = fn => { ctx.beginPath(); fn(); ctx.fillStyle = fill; ctx.fill(); ctx.stroke(); };
  ctx.beginPath(); ctx.moveTo(-.2 * s, .38 * s); ctx.lineTo(-.2 * s, .62 * s); ctx.moveTo(.2 * s, .38 * s); ctx.lineTo(.2 * s, .62 * s); ctx.moveTo(0, -.5 * s); ctx.lineTo(0, -.42 * s); ctx.stroke();
  const arm = (sx, h) => { ctx.beginPath(); ctx.moveTo(sx, -.25 * s); ctx.quadraticCurveTo(sx + (h[0] - sx) * .15, h[1] * .25 - .05 * s, h[0], h[1]); ctx.stroke();
    ctx.beginPath(); ctx.arc(h[0], h[1], .065 * s, 0, 7); ctx.fillStyle = col; ctx.fill(); };
  arm(-.42 * s, o.lh || [-.55 * s, .22 * s]); arm(.42 * s, o.rh || [.55 * s, .22 * s]);
  P(() => ctx.roundRect(-.42 * s, -.42 * s, .84 * s, .8 * s, .14 * s));
  ctx.beginPath(); ctx.roundRect(-.2 * s, -.24 * s, .4 * s, .2 * s, .05 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -1.22 * s); ctx.lineTo(0, -1.4 * s); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -1.46 * s, .075 * s, 0, 7); ctx.fillStyle = o.lime ? LIME : col; ctx.fill(); if (o.lime) ctx.stroke();
  P(() => ctx.roundRect(-.5 * s, -1.22 * s, s, .72 * s, .2 * s));
  const lx = (o.look || 0) * .1 * s; ctx.fillStyle = col;
  for (const ex of [-.2, .2]) { ctx.beginPath(); ctx.ellipse(ex * s + lx, -.86 * s, .075 * s, .075 * s * (o.blink ? .15 : 1), 0, 0, 7); ctx.fill(); }
  if (o.glasses) { ctx.lineWidth = Math.max(2, s * .03); ctx.beginPath(); ctx.arc(-.2 * s + lx, -.86 * s, .15 * s, 0, 7); ctx.moveTo(.35 * s + lx, -.86 * s);
    ctx.arc(.2 * s + lx, -.86 * s, .15 * s, 0, 7); ctx.moveTo(-.05 * s + lx, -.88 * s); ctx.lineTo(.05 * s + lx, -.88 * s); ctx.stroke(); }
  ctx.restore();
}

// line-art bicycle, ground at y, wheel radius r; returns { seat, bar } (relative to x, y) for a rider · o.spin rad · o.col · asal: ai-data-habis bab-3/src/film.js:77 (rider :236: robot s ≈ r·.78 at seat)
export function sepeda(ctx, x, y, r, o = {}) {
  const spin = o.spin || 0; ctx.save(); ctx.translate(x, y); ctx.strokeStyle = o.col || INK; ctx.lineWidth = r * .07; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const wb = r * 2.6, A = [-wb / 2, -r], Bw = [wb / 2, -r], C = [-r * .1, -r], S = [-r * .5, -r * 2.05], Hd = [r * .92, -r * 2.15];
  for (const [cx, cy] of [A, Bw]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(spin); ctx.lineWidth = r * .022; ctx.beginPath();
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...C); ctx.lineTo(...S); ctx.lineTo(...A); ctx.moveTo(...C); ctx.lineTo(...Hd); ctx.lineTo(S[0] + r * .1, S[1] + r * .1);
  ctx.moveTo(...Hd); ctx.lineTo(...Bw); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(S[0] - r * .28, S[1] - r * .1); ctx.lineTo(S[0] + r * .22, S[1] - r * .1); ctx.moveTo(...Hd); ctx.lineTo(Hd[0] - r * .1, Hd[1] - r * .38);
  ctx.lineTo(Hd[0] + r * .28, Hd[1] - r * .42); ctx.stroke();
  ctx.save(); ctx.translate(...C); ctx.rotate(spin * .5); ctx.lineWidth = r * .05; ctx.beginPath(); ctx.arc(0, 0, r * .16, 0, 7); ctx.moveTo(-r * .3, 0); ctx.lineTo(r * .3, 0); ctx.stroke(); ctx.restore();
  ctx.restore(); return { seat: [S[0], S[1] - r * .1], bar: [Hd[0] + r * .2, Hd[1] - r * .4] };
}

// a person (static, feet/base at y, height s): o.style 'garis' (line bust) | 'isi' (filled, lights up with o.on 0..1) | 'piktogram' | 'siluet' (lineup figure + o.label placard, o.chip head) · o.col · asal: ai-bubble-dompet bab-1/src/film.js:55 · teknologi-indo-vs-as bab-3/src/film.js:56 · ai-data-habis bab-4/src/ui.js:12 · ai-bubble-dompet bab-3/src/film.js:95
export function orang(ctx, x, y, s, o = {}) {
  const st = o.style || 'garis', a0 = ctx.globalAlpha; ctx.save(); ctx.translate(x, y);
  if (st === 'garis') { const k = s / 182; ctx.scale(k, k); ctx.strokeStyle = o.col || ivo(.5); ctx.lineWidth = o.lw ?? 4; ctx.beginPath();
    ctx.arc(0, -150, 32, 0, 7); ctx.moveTo(-78, 0); ctx.bezierCurveTo(-78, -104, 78, -104, 78, 0); ctx.stroke(); }
  else if (st === 'isi') { const k = s / 33.5; ctx.scale(k, k); const body = () => { ctx.beginPath(); ctx.arc(0, -26, 7.5, 0, 7); ctx.roundRect(-11, -16, 22, 16, [8, 8, 3, 3]); };
    ctx.fillStyle = o.dim || ivo(.2); body(); ctx.fill(); const on = o.on || 0; if (on > 0) { ctx.globalAlpha = a0 * on; ctx.fillStyle = o.col || LIME; body(); ctx.fill(); } }
  else if (st === 'piktogram') { ctx.fillStyle = o.col || INK; ctx.beginPath(); jalurOrang(ctx, 0, 0, s / .97); ctx.fill(); }
  else { const k = s / 590; ctx.scale(k, k);
    const g = ctx.createLinearGradient(-110, 0, 110, 0); g.addColorStop(0, '#CFCCBE'); g.addColorStop(.5, IVORY); g.addColorStop(1, '#B4B1A3');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-105, 0); ctx.lineTo(-105, -380); ctx.quadraticCurveTo(-105, -440, -40, -450); ctx.lineTo(40, -450);
    ctx.quadraticCurveTo(105, -440, 105, -380); ctx.lineTo(105, 0); ctx.closePath(); ctx.fill();
    if (o.chip) { ctx.save(); ctx.translate(0, -540); chip(ctx, 84); ctx.restore(); } else { ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -528, 62, 0, 7); ctx.fill(); }
    if (o.label) { ctx.fillStyle = PINK; ctx.fillRect(-128, -300, 256, 92); ctx.strokeStyle = lt(.8); ctx.lineWidth = 2; ctx.strokeRect(-128, -300, 256, 92);
      setFont(ctx, MN(o.label.length > 9 ? 19 : 26), 3); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(o.label, 0, -246); ctx.textAlign = 'left'; } }
  ctx.restore();
}

// crowds · o.pattern 'grid' (10×10 figures that light up: o.lit count, o.tLit, o.step .04, o.col) | 'baris' (a dark row of heads: o.n 9, o.gap 200, o.seed) | 'sisi' (8 busts rush in from both sides, o.tLeave makes them vanish) · s scale · asal: teknologi-indo-vs-as bab-3/src/film.js:60 · ai-data-habis bab-peta/src/film.js:65 · ai-bubble-dompet bab-1/src/film.js:60
export function kerumunan(ctx, x, y, s, t, t0, o = {}) {
  const p = o.pattern || 'grid', a0 = ctx.globalAlpha; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (p === 'grid') { const lit = o.lit ?? 0, tl = o.tLit ?? t0 + .8, step = o.step ?? .04;
    for (let i = 0; i < 100; i++) { const r = 9 - Math.floor(i / 10), c = i % 10, ka = kq(t, t0 + (c + 9 - r) * .025, .4); if (ka <= 0) continue;
      const on = i < lit ? kq(t, tl + i * step, .25) : 0; ctx.globalAlpha = a0 * ka; orang(ctx, -225 + c * 50, -225 + r * 50 + 17 + (1 - ka) * 20, 33.5, { style: 'isi', on, col: o.col }); } }
  else if (p === 'baris') { const n = o.n ?? 9, gap = o.gap ?? 200, sd = o.seed ?? 3, k = t0 == null ? 1 : kq(t, t0, .6);
    ctx.globalAlpha = a0 * k; ctx.translate(0, (1 - k) * 60); ctx.beginPath();
    for (let i = 0; i < n; i++) { const hx = (i - (n - 1) / 2) * gap + (rnd(sd * 13 + i) - .5) * 40, hy = rnd(sd * 7 + i) * 30, hr = 52 + rnd(sd + i * 3.1) * 12;
      ctx.moveTo(hx + hr, hy); ctx.arc(hx, hy, hr, 0, 7); ctx.moveTo(hx + 120, hy + 170 + 95); ctx.ellipse(hx, hy + 170 + 95, 120, 95, 0, 0, Math.PI, true); }
    ctx.fillStyle = o.fill || '#060705'; ctx.fill(); ctx.strokeStyle = ivo(o.a ?? .5); ctx.lineWidth = 3; ctx.stroke(); }
  else { for (let i = 0; i < 8; i++) { const sd = i % 2 ? 1 : -1, k2 = i >> 1, sc = .78 + .16 * rnd(i + 4), ta = t0 + i * .06; if (t < ta) continue;
      const k = spring(t - ta, .62, .45), tl = (o.tLeave ?? 1e9) + .05 + i * .05, lv = E.inCubic(inv(tl, tl + .3, t)); if (lv >= 1) continue;
      const px = lerp(sd * 1400, sd * (300 + 125 * k2 + 30 * rnd(i)), k);
      ctx.globalAlpha = a0 * (1 - lv) * clamp((t - ta) / .2); orang(ctx, px, -60 * lv, 182 * sc * (1 + .15 * lv), { style: 'garis', col: o.col }); } }
  ctx.restore();
}

// line-art globe turning (meridians sweep), faint · r radius · o.a .13 · o.lw 3 · o.speed .12 · fades in when t0 is given · asal: ai-bubble-dompet bab-1/src/film.js:86
export function globe(ctx, x, y, r, t, t0, o = {}) {
  const k = t0 == null ? 1 : kq(t, t0, .6); if (k <= 0) return; const a0 = ctx.globalAlpha;
  ctx.save(); ctx.globalAlpha = a0 * k; ctx.strokeStyle = ivo(o.a ?? .13); ctx.lineWidth = o.lw ?? 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 7);
  for (let i = 0; i < 6; i++) { const ph = ((t * (o.speed ?? .12) + i / 6) % 1) * Math.PI, rx = Math.abs(Math.cos(ph)) * r; ctx.moveTo(x + rx, y); ctx.ellipse(x, y, Math.max(1, rx), r, 0, 0, 7); }
  for (const q of [-.6, -.3, 0, .3, .6]) { const yy = y + q * r, rx = Math.sqrt(1 - q * q) * r; ctx.moveTo(x + rx, yy); ctx.lineTo(x - rx, yy); }
  ctx.stroke(); ctx.restore();
}

// year-2000 CRT monitor, a dial-up page loading in chunks + scanlines · s = body width 620 · o.url · o.tDone (page complete) · o.cps 14 · asal: ai-bubble-dompet bab-1/src/film.js:105
export function monitorCRT(ctx, x, y, s = 620, t, t0, o = {}) {
  const k = kq(t, t0 - .25, .45); if (k <= 0) return; const a0 = ctx.globalAlpha, sc = s / 620, tD = o.tDone ?? t0 + 2.2;
  ctx.save(); ctx.translate(x, y + (1 - k) * 40); ctx.scale(sc, sc); ctx.globalAlpha = a0 * k;
  ctx.fillStyle = '#12130F'; ctx.strokeStyle = INK; ctx.lineWidth = 5; rr(ctx, -310, -240, 620, 450, 28); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, 210); ctx.lineTo(-110, 300); ctx.lineTo(110, 300); ctx.lineTo(70, 210); ctx.moveTo(-170, 300); ctx.lineTo(170, 300); ctx.stroke();
  ctx.fillStyle = '#191A15'; ctx.strokeStyle = lt(.5); ctx.lineWidth = 3; rr(ctx, -260, -195, 520, 345, 14); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = lt(.45); ctx.lineWidth = 2; ctx.strokeRect(-235, -175, 470, 32);
  typeOn(ctx, o.url ?? 'http://www.', -222, -152, t, t0, MN(19, 400), { cps: o.cps ?? 14, col: lt(.75) });
  const p = Math.floor(inv(t0 + .2, tD, t) * 10) / 10;
  ctx.fillStyle = lt(.12); for (let i = 0; i < 5; i++) if (p > i * .2) ctx.fillRect(-235, -118 + i * 40, (i % 2 ? 330 : 440) * (i === 4 ? .6 : 1), 22);
  ctx.strokeStyle = lt(.5); ctx.strokeRect(-235, 104, 470, 22); ctx.fillStyle = lt(.7); ctx.fillRect(-232, 107, 464 * p, 16);
  for (let i = 0; i < 4; i++) { const q = Math.floor(t * 8 + i * 7) % 9; ctx.fillStyle = lt(.04 + .03 * (q / 9)); ctx.fillRect(-260, -195 + i * 86 + (t * 40 % 86), 520, 3); }
  ctx.restore();
}

// data centre, base at y, height s: o.style 'rak' (ivory server rack that grows up, o.w) | 'gedung' (dark block, vents, blinking LEDs, o.w 1.45 h) · asal: ai-bubble-dompet bab-2/src/film.js:34 · ai-bubble-dompet bab-4/src/film.js:269
export function pusatData(ctx, x, y, s, t, t0, o = {}) {
  const a0 = ctx.globalAlpha;
  if (o.style === 'gedung') { const k = t0 == null ? 1 : kq(t, t0, .7); if (k <= 0) return; const w = o.w ?? 1.45 * s, h = s, yb = y + (1 - k) * 60;
    ctx.save(); ctx.globalAlpha = a0 * k; ctx.save(); sh(ctx, .9, 50, 20);
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#24251F'); g.addColorStop(1, '#16170F'); ctx.fillStyle = g; ctx.fillRect(x - w / 2, yb - h, w, h); ctx.restore();
    ctx.strokeStyle = ivo(.8); ctx.lineWidth = 3; ctx.strokeRect(x - w / 2, yb - h, w, h);
    ctx.fillStyle = '#2E2F28'; ctx.fillRect(x - w * .38, yb - h - 36, w * .22, 36); ctx.fillRect(x + w * .1, yb - h - 28, w * .28, 28);
    for (let r = 0; r < 5; r++) { const ry = yb - h + 30 + r * (h - 60) / 5; ctx.fillStyle = lt(.12); ctx.fillRect(x - w / 2 + 26, ry, w - 52, (h - 60) / 5 - 14);
      for (let c = 0; c < 10; c++) { const on = rnd(r * 31 + c + Math.floor(t * 4 + c * .3)) > .45; ctx.fillStyle = on ? lt(.85) : lt(.2); ctx.fillRect(x - w / 2 + 44 + c * (w - 88) / 10, ry + 10, 7, 7); } }
    ctx.restore(); return; }
  const w = o.w ?? s * .3, h = s * (t0 == null ? 1 : kq(t, t0, .8)); if (h <= 0) return;
  const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#D9D6C8'); g.addColorStop(.45, IVORY); g.addColorStop(1, '#BDBAAD');
  ctx.fillStyle = g; ctx.fillRect(x - w / 2, y - h, w, h);
  ctx.fillStyle = 'rgba(29,30,24,.28)'; ctx.beginPath(); for (let yy = y - 16; yy > y - h + 4; yy -= 16) ctx.rect(x - w / 2 + 10, yy, w - 20, 2); ctx.fill();
  ctx.fillStyle = 'rgba(29,30,24,.5)'; ctx.beginPath(); for (let yy = y - 9; yy > y - h + 6; yy -= 16) ctx.rect(x + w / 2 - 22, yy - 2, 5, 4); ctx.fill();
}

// line-art bucket (base at y, s = rim width) filling with a wavy liquid; above 1 it spills drops over both rims · o.level | o.from 0 · o.to 1.15 · o.tFill · o.dur 2 · o.col · o.seed · asal: ai-bubble-dompet bab-2/src/film.js:54
export function ember(ctx, x, y, s, t, t0, o = {}) {
  const k = t0 == null ? 1 : kq(t, t0, .5); if (k <= 0) return; const a0 = ctx.globalAlpha, w = s, h = o.h ?? .82 * s, wb = w * .76, yb = y, seed = o.seed ?? 0;
  const lv = o.level ?? lerp(o.from ?? 0, o.to ?? 1.15, E.inOutSine(inv(o.tFill ?? t0 + .3, (o.tFill ?? t0 + .3) + (o.dur ?? 2), t)));
  const path = () => { ctx.beginPath(); ctx.moveTo(x - w / 2, yb - h); ctx.lineTo(x - wb / 2, yb); ctx.lineTo(x + wb / 2, yb); ctx.lineTo(x + w / 2, yb - h); };
  const top = yb - h * Math.min(lv, 1.02); ctx.save(); ctx.globalAlpha = a0 * k;
  ctx.save(); path(); ctx.closePath(); ctx.clip();
  if (lv > 0) { ctx.fillStyle = o.col || ivo(.82); ctx.beginPath(); ctx.moveTo(x - w, yb + 10);
    for (let xx = x - w; xx <= x + w; xx += 16) ctx.lineTo(xx, top + 5 * Math.sin(xx * .03 + t * 5 + seed)); ctx.lineTo(x + w, yb + 10); ctx.fill();
    ctx.strokeStyle = `rgba(${BGRGB},.25)`; ctx.lineWidth = 2; ctx.beginPath(); for (let yy = yb - 18; yy > top + 8; yy -= 22) { ctx.moveTo(x - w / 2, yy); ctx.lineTo(x + w / 2, yy); } ctx.stroke(); }
  ctx.restore();
  ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.lineJoin = 'round'; path(); ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, yb - h, w / 2, 16, 0, Math.PI, 0); ctx.stroke();
  if (lv > 1) { ctx.fillStyle = o.col || ivo(.8);
    for (let i = 0; i < 18; i++) { const sd = i % 2 ? 1 : -1, ph = (t * (1.1 + .5 * rnd(i + seed)) + rnd(i * 3 + seed)) % 1, dx = sd * (w / 2 + 6 + 30 * ph * ph), dy = yb - h + 560 * ph * ph;
      if (dy < yb + 30) { ctx.beginPath(); ctx.ellipse(x + dx, dy, 7, 10 + 6 * ph, 0, 0, 7); ctx.fill(); } } }
  ctx.restore();
}

// kitchen order ticket hanging from a rail clip at (x, y): drops in with a kick, its title flips tA → tB · s = width · o.no · o.title · o.title2 · o.tFlip · o.ang° · o.kick 7° · asal: ai-bubble-dompet bab-4/src/film.js:231 · ledger: rel-orderan
export function tiketOrder(ctx, x, y, s = 300, t, t0, o = {}) {
  const k = pop(t, t0, .55, .32); if (k <= 0) return; const w = s, h = o.h ?? 1.45 * w, a0 = ctx.globalAlpha;
  const f = o.tFlip != null ? E.inOutCubic(inv(o.tFlip, o.tFlip + .5, t)) : 0, ang = (o.ang || 0) * D2R + kick(t, t0 + .3, o.kick ?? 7);
  ctx.save(); ctx.translate(x, y - (1 - Math.min(1, k)) * 160); ctx.rotate(ang); ctx.globalAlpha = a0 * clamp((t - t0) / .12);
  doc(ctx, 0, h / 2 + 8, w, h, { r: 3, blur: 34, sy: 16 });
  ctx.fillStyle = 'rgba(29,30,24,.18)'; ctx.beginPath(); for (let i = 0; i < w / 14; i++) { ctx.moveTo(-w / 2 + 11 + i * 14, h + 8); ctx.arc(-w / 2 + 7 + i * 14, h + 8, 4, 0, 7); } ctx.fill();
  ctx.fillStyle = '#2C2D27'; ctx.fillRect(-34, -12, 68, 34); ctx.fillStyle = lt(.55); ctx.fillRect(-34, -12, 68, 4);
  setFont(ctx, MN(Math.round(w * .055)), 3); ctx.fillStyle = PINK; ctx.textAlign = 'center'; ctx.fillText('ORDER #' + (o.no ?? '0417'), 0, 8 + h * .13);
  ctx.strokeStyle = 'rgba(29,30,24,.45)'; ctx.lineWidth = 2; ctx.setLineDash([7, 6]); ctx.beginPath(); ctx.moveTo(-w * .42, 8 + h * .19); ctx.lineTo(w * .42, 8 + h * .19); ctx.stroke(); ctx.setLineDash([]);
  const tt = f < .5 ? (o.title ?? '') : (o.title2 ?? o.title ?? ''), sy = Math.max(.02, Math.abs(1 - 2 * f)), size = w * .21;
  ctx.save(); ctx.translate(0, 8 + h * .38); ctx.scale(1, sy); teksTengah(ctx, tt, 0, 0, DSP(size), size, { ls: 2, col: PINK }); ctx.restore();
  ctx.fillStyle = 'rgba(29,30,24,.22)'; for (let i = 0; i < 3; i++) ctx.fillRect(-w * .36, 8 + h * (.66 + i * .09), w * (.72 - (i % 2) * .22), h * .022);
  ctx.textAlign = 'left'; ctx.restore();
}

// generic promo coupon (no brand, no %), pops in; o.frost / o.tFrost ices it over · s = width · o.h .42 w · o.label · o.rot° · asal: ai-bubble-dompet bab-4/src/film.js:252
export function kupon(ctx, x, y, s = 420, t, t0, o = {}) {
  const k = t0 == null ? 1 : pop(t, t0, .55, .32); if (k <= 0) return; const w = s, h = o.h ?? .42 * w, lab = o.label ?? 'DISKON', a0 = ctx.globalAlpha;
  const fz = o.frost ?? (o.tFrost != null ? kq(t, o.tFrost, .6) : 0), sc = lerp(.6, 1, k);
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot || 0) * D2R); ctx.scale(sc, sc); ctx.globalAlpha = a0 * (t0 == null ? 1 : clamp((t - t0) / .1));
  ctx.save(); sh(ctx, .75, 24, 10); ctx.fillStyle = '#EFECDF'; rr(ctx, -w / 2, -h / 2, w, h, 8); ctx.fill(); ctx.restore();
  ctx.fillStyle = bgc(); ctx.beginPath(); ctx.arc(-w / 2 + w * .3, -h / 2, 9, 0, 7); ctx.moveTo(-w / 2 + w * .3 + 9, h / 2); ctx.arc(-w / 2 + w * .3, h / 2, 9, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(29,30,24,.4)'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(-w / 2 + w * .3, -h / 2 + 12); ctx.lineTo(-w / 2 + w * .3, h / 2 - 12); ctx.stroke(); ctx.setLineDash([]);
  ctx.save(); ctx.translate(-w / 2 + w * .15, 0); ctx.rotate(-Math.PI / 2); setFont(ctx, MN(13), 3); ctx.fillStyle = PINK; ctx.textAlign = 'center'; ctx.fillText('KUPON', 0, 5); ctx.restore();
  const sz = Math.min(h * .42, w * .62 / Math.max(4, lab.length) * 1.9); setFont(ctx, DSP(sz), 1); ctx.fillStyle = PINK; ctx.textAlign = 'center'; ctx.fillText(lab, w * .15, sz * .3);
  setFont(ctx, MN(11), 2); ctx.fillStyle = 'rgba(29,30,24,.55)'; ctx.fillText('S&K BERLAKU', w * .15, h / 2 - 12); ctx.textAlign = 'left';
  if (fz > 0) { ctx.fillStyle = `rgba(232,238,240,${.5 * fz})`; rr(ctx, -w / 2, -h / 2, w, h, 8); ctx.fill(); ctx.strokeStyle = `rgba(255,255,255,${.85 * fz})`; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore();
}

// clock face whose hand spins faster and faster with ghost hands (time running out / outdated) · R radius · o.angle rad | o.from 0 · o.speed 6 · o.tSpin · o.ghost · o.rgb hand colour · o.inner(ctx) · asal: ai-bubble-dompet puncak/src/film.js:69 · ledger: jam-usang-dua-jam
export function jam(ctx, x, y, R, t, t0, o = {}) {
  const k = t0 == null ? 1 : kq(t, t0, .5); if (k <= 0) return; const a0 = ctx.globalAlpha, ts = o.tSpin ?? (t0 ?? 0) + .4, sp = o.speed ?? 6;
  const u = Math.max(0, t - ts), a = o.angle ?? (o.from ?? 0) + sp * u ** 1.6, om = sp * 1.6 * u ** .6, dA = o.dA ?? Math.min(1.2, om * .08), gh = o.ghost ?? (dA > .05 ? 5 : 0), rgb = o.rgb || '241,239,230';
  ctx.save(); ctx.translate(x, y); ctx.scale(lerp(.85, 1, k), lerp(.85, 1, k)); ctx.globalAlpha = a0 * k;
  ctx.save(); sh(ctx, .9, 40, 18); ctx.fillStyle = '#121310'; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill(); ctx.restore();
  ctx.strokeStyle = lt(.75); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.stroke();
  for (let i = 0; i < 60; i++) { const q = i / 60 * 2 * Math.PI, l = i % 5 ? .05 : .12; ctx.strokeStyle = lt(i % 5 ? .25 : .7); ctx.lineWidth = i % 5 ? 2 : 4;
    ctx.beginPath(); ctx.moveTo(Math.sin(q) * R * .9, -Math.cos(q) * R * .9); ctx.lineTo(Math.sin(q) * R * (.9 - l), -Math.cos(q) * R * (.9 - l)); ctx.stroke(); }
  if (o.inner) o.inner(ctx);
  const hand = (q, al) => { ctx.strokeStyle = `rgba(${rgb},${al})`; ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-Math.sin(q) * R * .14, Math.cos(q) * R * .14); ctx.lineTo(Math.sin(q) * R * .76, -Math.cos(q) * R * .76); ctx.stroke(); };
  for (let g = gh; g > 0; g--) hand(a - g * dA / (gh + 1), .14 * (gh + 1 - g) / gh);
  hand(a, 1); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill(); ctx.restore();
}

// stylised banknote (NOT a replica): guilloche waves, border, numeral, words, rosette · returns a cached 1200×500 canvas · o.angka · o.teks · o.catatan · o.c0 o.c1 · asal: teknologi-indo-vs-as bab-1/src/film.js:28 · ledger: banknote-slice-magnifier
export function uangKertas(o = {}) {
  const angka = o.angka ?? '10.000', teks = o.teks ?? 'SEPULUH RIBU RUPIAH', cat = o.catatan ?? '', key = `uang:${angka}|${teks}|${cat}|${o.c0}|${o.c1}`;
  let c = CACHE.get(key); if (c) return c; const [cv, g] = mk(1200, 500);
  const gr = g.createLinearGradient(0, 0, 1200, 500); gr.addColorStop(0, o.c0 || '#ECE8D8'); gr.addColorStop(1, o.c1 || '#C9C4AF'); g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, 1200, 500, 16); g.fill();
  g.strokeStyle = 'rgba(30,32,26,.16)'; g.lineWidth = 1.5; for (let k = 0; k < 24; k++) { g.beginPath(); for (let x = 0; x <= 1200; x += 8) { const yy = 250 + Math.sin(x / 55 + k * .5) * (30 + 7 * k) * Math.cos(x / 310 + k * .7); x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
  g.strokeStyle = 'rgba(30,32,26,.55)'; g.lineWidth = 3; g.strokeRect(26, 26, 1148, 448);
  g.strokeStyle = 'rgba(30,32,26,.35)'; g.lineWidth = 4; g.beginPath(); for (const r of [150, 112, 74]) { g.moveTo(940 + r, 250); g.arc(940, 250, r, 0, 7); } g.stroke();
  g.fillStyle = '#1E201A'; setFont(g, DSP(190), 2); g.fillText(angka, 70, 230); setFont(g, MN(26), 6); g.fillText(teks, 76, 282);
  if (cat) { g.globalAlpha = .7; setFont(g, MN(20), 4); g.fillText(cat, 76, 438); g.globalAlpha = 1; }
  if (document.fonts.check(DSP(190))) CACHE.set(key, cv); return cv;
}

// wire shopping trolley that slides in, then parcels drop in one by one and settle · s scale · o.tFill · o.n 8 · asal: teknologi-indo-vs-as bab-3/src/film.js:40
const PARSEL = [[-62, 28, 70, 56], [14, 28, 66, 56], [90, 28, 60, 56], [-34, -28, 76, 54], [44, -30, 64, 58], [112, -26, 50, 50], [4, -86, 72, 56], [-72, -80, 58, 46]];
export function troli(ctx, x, y, s, t, t0, o = {}) {
  const k = kq(t, t0, .5); if (k <= 0) return; const a0 = ctx.globalAlpha, tf = o.tFill ?? t0 + .5, n = Math.min(8, o.n ?? 8);
  ctx.save(); ctx.translate(x + 30 * (1 - k) * s, y); ctx.scale(s, s); ctx.globalAlpha = a0 * k;
  for (let i = 0; i < n; i++) { const ti = tf + i * .08; if (t <= ti) continue; const sp = spring(t - ti, .6, .3), [px, py, pw, ph] = PARSEL[i];
    ctx.save(); ctx.translate(px, py - 440 * (1 - sp)); ctx.rotate((rnd(i + 9) - .5) * .14 + (rnd(i + 5) - .5) * .5 * (1 - sp)); paket(ctx, pw, ph); ctx.restore(); }
  ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-210, -120); ctx.lineTo(-156, -120); ctx.lineTo(-112, 62); ctx.lineTo(152, 62); ctx.lineTo(180, -60); ctx.lineTo(-140, -60); ctx.stroke();
  ctx.strokeStyle = ivo(.5); ctx.lineWidth = 3; ctx.beginPath();
  for (let i = 1; i < 6; i++) { const u = i / 6; ctx.moveTo(lerp(-140, 180, u), -60); ctx.lineTo(lerp(-112, 152, u), 62); } ctx.moveTo(-126, 0); ctx.lineTo(166, 0); ctx.stroke();
  ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-112, 62); ctx.lineTo(-98, 100); ctx.lineTo(152, 100); ctx.stroke();
  ctx.fillStyle = badan(); ctx.lineWidth = 6; for (const wx of [-70, 120]) { ctx.beginPath(); ctx.arc(wx, 128, 17, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}

// desk calendar page (dark header, rings, big day) that pops in; o.tTear tears it off to show month2/day2 · s = width 220 · o.month · o.day · o.rot° · asal: teknologi-indo-vs-as bab-3/src/film.js:33
export function kalender(ctx, x, y, s = 220, t, t0, o = {}) {
  const k = t0 == null ? 1 : pop(t, t0, .55, .32); if (k <= 0) return; const a0 = ctx.globalAlpha, sc = s / 220 * lerp(.6, 1, k);
  const page = (m, d) => { doc(ctx, 0, 0, 220, 250, { r: 14, blur: 30, sy: 14 }); ctx.fillStyle = '#24251F'; rr(ctx, -110, -125, 220, 62, [14, 14, 0, 0]); ctx.fill();
    ctx.textAlign = 'center'; setFont(ctx, MN(24), 8); ctx.fillStyle = IVORY; ctx.fillText(m, 0, -84); setFont(ctx, DSP(118), 2); ctx.fillStyle = '#11120E'; ctx.fillText(String(d), 0, 70); ctx.textAlign = 'left'; };
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 90); ctx.rotate((o.rot || 0) * D2R); ctx.scale(sc, sc); ctx.globalAlpha = a0 * clamp((t - (t0 ?? -9)) / .1);
  const u = o.tTear != null ? clamp((t - o.tTear) / .7) : 0;
  if (u > 0) { page(o.month2 ?? o.month ?? 'JAN', o.day2 ?? ''); ctx.save(); ctx.translate(40 * u, 900 * u * u); ctx.rotate(.6 * u); ctx.globalAlpha = a0 * (1 - u); page(o.month ?? 'JAN', o.day ?? 1); ctx.restore(); }
  else page(o.month ?? 'JAN', o.day ?? 1);
  ctx.fillStyle = IVORY; ctx.beginPath(); for (const rx of [-60, 60]) { ctx.moveTo(rx + 9, -125); ctx.arc(rx, -125, 9, 0, 7); } ctx.fill(); ctx.restore();
}

// a door in perspective that swings open, light spilling out, icon on its leaf · s scale · o.open 0..1 | o.tOpen · o.icon 'labu'|'steker'|'papan' · o.no · o.label · asal: teknologi-indo-vs-as bab-3/src/film.js:76
export function pintu(ctx, x, y, s, t, t0, o = {}) {
  const k = pop(t, t0 - .15, .55, .32); if (k <= 0) return; const a0 = ctx.globalAlpha, sc = s * lerp(.7, 1, k);
  const op = o.open ?? (o.tOpen != null ? .1 + .22 * kq(t, o.tOpen, .9) : .1), rx = -150 + 300 * (1 - .75 * op), lift = 34 * op;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a0 * clamp((t - t0 + .15) / .12);
  const g = ctx.createLinearGradient(0, -250, 0, 250); g.addColorStop(0, ivo(.1 + .5 * op)); g.addColorStop(1, ivo(.03)); ctx.fillStyle = g; ctx.fillRect(-150, -250, 300, 500);
  ctx.strokeStyle = ivo(.7); ctx.lineWidth = 6; ctx.strokeRect(-158, -258, 316, 516);
  const lg = ctx.createLinearGradient(-150, 0, rx, 0); lg.addColorStop(0, '#2A2B25'); lg.addColorStop(1, '#1A1B16');
  ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-150, -250); ctx.lineTo(rx, -250 - lift); ctx.lineTo(rx, 250 + lift); ctx.lineTo(-150, 250); ctx.closePath(); ctx.fill(); ctx.strokeStyle = ivo(.35); ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = ivo(.7); ctx.beginPath(); ctx.arc(rx - 26, 10, 7, 0, 7); ctx.fill();
  if (o.icon) { ctx.save(); ctx.translate((-150 + rx) / 2, -50); ctx.scale((rx + 150) / 300, 1); garisIkon(ctx, o.icon, lt(.9), 5, t, t0); ctx.restore(); }
  ctx.textAlign = 'center'; if (o.no != null) { setFont(ctx, MN(18), 6); ctx.fillStyle = ivo(.6); ctx.fillText('PINTU ' + o.no, 0, -284); }
  if (o.label) { setFont(ctx, DSP(70), 4); ctx.fillStyle = INK; ctx.fillText(o.label, 0, 338); } ctx.textAlign = 'left'; ctx.restore();
}

// icon names for ikon()
export const IKON = ['labu', 'steker', 'papan', 'resep', 'gembok', 'pabrik', 'petir', 'tetes', 'awan', 'bensin', 'dompet', 'uang', 'senyum', 'pagar'];
const NAT = { labu: 150, steker: 170, papan: 160, resep: 150, gembok: 150, pabrik: 200, petir: 180, tetes: 180, awan: 240, bensin: 260, dompet: 250, uang: 340, senyum: 200, pagar: 290 };
function garisIkon(ctx, name, col, lw, t, t0, o = {}) {                // native-size line icon, centred
  ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; const fill = o.fill || badan();
  const SF = () => { ctx.fillStyle = fill; ctx.fill(); ctx.stroke(); ctx.fillStyle = col; };
  ctx.beginPath();
  switch (name) {
    case 'labu': ctx.moveTo(-18, -62); ctx.lineTo(-18, -16); ctx.lineTo(-56, 54); ctx.quadraticCurveTo(-60, 68, -44, 68); ctx.lineTo(44, 68); ctx.quadraticCurveTo(60, 68, 56, 54);
      ctx.lineTo(18, -16); ctx.lineTo(18, -62); ctx.moveTo(-28, -62); ctx.lineTo(28, -62); ctx.moveTo(-38, 30); ctx.lineTo(38, 30); ctx.stroke(); break;
    case 'steker': ctx.translate(0, -17); ctx.roundRect(-32, -36, 64, 56, 8); ctx.moveTo(-14, -36); ctx.lineTo(-14, -66); ctx.moveTo(14, -36); ctx.lineTo(14, -66);
      ctx.moveTo(0, 20); ctx.bezierCurveTo(0, 60, 60, 50, 40, 80); ctx.bezierCurveTo(26, 100, -40, 84, -50, 100); ctx.stroke(); break;
    case 'papan': ctx.translate(0, -15); ctx.rect(-74, -56, 148, 92); ctx.moveTo(-50, -30); ctx.lineTo(10, -30); ctx.moveTo(-50, -8); ctx.lineTo(40, -8); ctx.moveTo(-50, 14); ctx.lineTo(-10, 14);
      ctx.moveTo(-50, 36); ctx.lineTo(-62, 86); ctx.moveTo(50, 36); ctx.lineTo(62, 86); ctx.stroke(); break;
    case 'resep': ctx.roundRect(-52, -70, 104, 140, 8); SF(); ctx.beginPath(); ctx.moveTo(-30, -30); ctx.lineTo(30, -30); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.moveTo(-30, 30); ctx.lineTo(10, 30); ctx.stroke(); break;
    case 'gembok': ctx.moveTo(-32, -10); ctx.lineTo(-32, -38); ctx.arc(0, -38, 32, Math.PI, 0); ctx.lineTo(32, -10); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-50, -10, 100, 80, 10); SF(); break;
    case 'pabrik': { const x0 = -100, yb = 80, w = 200, h = 160; ctx.moveTo(x0, yb); ctx.lineTo(x0, yb - h * .55);
      for (let i = 0; i < 4; i++) { const sx = x0 + i * w * .17; ctx.lineTo(sx + w * .17, yb - h * .75); ctx.lineTo(sx + w * .17, yb - h * .55); }
      ctx.lineTo(x0 + w * .78, yb - h * .55); ctx.lineTo(x0 + w * .78, yb - h); ctx.lineTo(x0 + w * .86, yb - h); ctx.lineTo(x0 + w * .86, yb - h * .55); ctx.lineTo(x0 + w, yb - h * .55); ctx.lineTo(x0 + w, yb); ctx.closePath(); SF(); break; }
    case 'petir': { const s = 180; ctx.moveTo(.1 * s, -.5 * s); ctx.lineTo(-.28 * s, .06 * s); ctx.lineTo(-.02 * s, .06 * s); ctx.lineTo(-.12 * s, .5 * s); ctx.lineTo(.3 * s, -.1 * s); ctx.lineTo(.04 * s, -.1 * s); ctx.closePath(); SF(); break; }
    case 'tetes': { const s = 180; ctx.moveTo(0, -s * .55); ctx.bezierCurveTo(s * .1, -s * .3, s * .38, -s * .05, s * .38, s * .18); ctx.arc(0, s * .18, s * .38, 0, Math.PI);
      ctx.bezierCurveTo(-s * .38, -s * .05, -s * .1, -s * .3, 0, -s * .55); ctx.closePath(); SF(); break; }
    case 'awan': { const s = 80; ctx.moveTo(-1.1 * s, .5 * s); ctx.arc(-.75 * s, .1 * s, .42 * s, Math.PI * .55, Math.PI * 1.45); ctx.arc(-.15 * s, -.25 * s, .6 * s, Math.PI * 1.1, Math.PI * 1.95);
      ctx.arc(.62 * s, .08 * s, .46 * s, Math.PI * 1.5, Math.PI * .45); ctx.closePath(); SF(); break; }
    case 'bensin': { ctx.translate(0, -20); ctx.arc(0, 40, 120, Math.PI, 0); ctx.stroke(); ctx.lineWidth = lw * .7; ctx.beginPath();
      for (let j = 0; j <= 6; j++) { const a = Math.PI + j * Math.PI / 6; ctx.moveTo(Math.cos(a) * 96, 40 + Math.sin(a) * 96); ctx.lineTo(Math.cos(a) * 118, 40 + Math.sin(a) * 118); } ctx.stroke();
      setFont(ctx, MN(26), 0); ctx.textAlign = 'center'; ctx.fillText('E', -100, 90); ctx.fillText('F', 100, 90); ctx.textAlign = 'left';
      const a = lerp(Math.PI * 1.82, Math.PI * 1.06, o.tEmpty != null ? kq(t, o.tEmpty, .7) : 0); ctx.lineWidth = lw * 1.15; ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(Math.cos(a) * 100, 40 + Math.sin(a) * 100); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 40, 14, 0, 7); ctx.fill(); break; }
    case 'dompet': { const w = 240, h = 168, L = o.lime; ctx.fillStyle = ivo(.12); ctx.roundRect(-w * .42, -h * .66, w * .5, h * .4, 8); ctx.fill(); ctx.stroke();
      ctx.fillStyle = L ? LIME : fill; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 22); ctx.fill(); ctx.strokeStyle = L ? LIME_INK : col; ctx.stroke();
      ctx.beginPath(); ctx.roundRect(w * .12, -h * .2, w * .44, h * .4, 14); ctx.fillStyle = L ? '#B5DE34' : fill; ctx.fill(); ctx.stroke();
      ctx.fillStyle = L ? LIME_INK : col; ctx.beginPath(); ctx.arc(w * .27, 0, 9, 0, 7); ctx.fill(); break; }
    case 'uang': ctx.translate(-18, 22); for (let i = 2; i >= 0; i--) { ctx.save(); ctx.translate(i * 18, -i * 22); ctx.rotate((i - 1) * .05);
        ctx.fillStyle = fill; ctx.strokeStyle = i ? ivo(.45) : col; ctx.beginPath(); ctx.roundRect(-150, -80, 300, 160, 12); ctx.fill(); ctx.stroke();
        if (!i) { ctx.lineWidth = lw * .6; ctx.strokeRect(-130, -60, 260, 120); ctx.beginPath(); ctx.arc(0, 0, 38, 0, 7); ctx.stroke();
          setFont(ctx, DSP(46), 1); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.fillText(o.cur ?? 'Rp', 0, 16); ctx.textAlign = 'left'; }
        ctx.restore(); } break;
    case 'senyum': { const r = 90; ctx.arc(0, 0, r, 0, 7); SF(); for (const ex of [-.33, .33]) { ctx.beginPath(); ctx.arc(ex * r, -.2 * r, r * .1, 0, 7); ctx.fill(); }
      ctx.beginPath(); ctx.arc(0, .02 * r, r * .5, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); break; }
    case 'pagar': { ctx.translate(0, -10); for (let j = 0; j < 6; j++) { const x = -125 + j * 50; ctx.moveTo(x, 120); ctx.lineTo(x, -80); ctx.lineTo(x + 10, -100); }
      ctx.moveTo(-140, -40); ctx.lineTo(140, -40); ctx.moveTo(-140, 70); ctx.lineTo(140, 70); ctx.stroke();
      const k = o.tLock != null ? pop(t, o.tLock, .5, .3) : 1, y = lerp(-260, 10, Math.min(1.15, k)); if (k <= 0) break; ctx.save(); ctx.globalAlpha *= clamp(k * 3);
      ctx.lineWidth = lw * 1.3; ctx.beginPath(); ctx.arc(0, y - 30, 34, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-55, y - 30, 110, 86, 10); SF();
      ctx.beginPath(); ctx.arc(0, y + 8, 9, 0, 7); ctx.fill(); ctx.fillRect(-3, y + 8, 6, 24); ctx.restore(); break; }
  }
}
// line icon from the films, fitted to an s-px box, pops in; dashed = a "ghost" that marches · o.name (see IKON) · o.dash · o.col · o.fill · o.lw 6 · o.tEmpty (bensin) · o.tLock (pagar) · o.cur (uang) · o.lime (dompet) · asal: teknologi-indo-vs-as bab-3/src/film.js:66 + bab-peta:185 · ai-bubble-dompet bab-4/src/film.js:263 + puncak:58 + bab-peta:38 · ai-data-habis bab-peta/src/film.js:162 + bab-3:90
export function ikon(ctx, x, y, s = 200, t, t0, o = {}) {
  const k = t0 == null ? 1 : pop(t, t0, .55, .32); if (k <= 0) return; const name = o.name || 'labu', f = s / (NAT[name] || 200) * lerp(.6, 1, k), a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x, y); ctx.scale(f, f); ctx.globalAlpha = a0 * (t0 == null ? 1 : clamp((t - t0) / .1));
  if (o.dash) { ctx.setLineDash([14, 10]); ctx.lineDashOffset = -(t - (t0 ?? 0)) * 40; }
  garisIkon(ctx, name, o.col || INK, (o.lw ?? 6) * (NAT[name] || 200) / s, t, t0, o); ctx.setLineDash([]); ctx.restore();
}

// QRIS street food cart: glass case with lettering, bowls, steaming pot, spoked wheels, a QR sticker that gets scanned (lime brackets + sweep) · s scale · o.text · o.label · o.qr canvas · o.tScan · o.tDone · asal: teknologi-indo-vs-as penutup/src/film.js:133
export function gerobak(ctx, x, y, s, t, t0, o = {}) {
  const k = kq(t, t0, .7); if (k <= 0) return; const a0 = ctx.globalAlpha, ts = o.tScan ?? t0 + .8, td = o.tDone ?? ts + 1.2, B = badan();
  ctx.save(); ctx.translate(x, y + (1 - k) * 60 * s); ctx.scale(s, s); ctx.globalAlpha = a0 * k; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  rr(ctx, -380, -430, 760, 34, 10); ctx.fillStyle = B; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-340, -396); ctx.lineTo(-340, -300); ctx.moveTo(340, -396); ctx.lineTo(340, -300); ctx.stroke();
  rr(ctx, -340, -300, 680, 250, 12); ctx.fillStyle = ivo(.05); ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
  ctx.strokeStyle = ivo(.35); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-340, -150); ctx.lineTo(340, -150); ctx.stroke();
  ctx.strokeStyle = ivo(.12); ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(-300, -70); ctx.lineTo(-220, -280); ctx.stroke();
  setFont(ctx, DSP(112), 8); ctx.fillStyle = ivo(.92); ctx.textAlign = 'center'; ctx.fillText(o.text ?? 'BAKSO', -110, -180); ctx.textAlign = 'left';
  ctx.strokeStyle = ivo(.7); ctx.lineWidth = 4; ctx.beginPath(); for (const bx of [-270, -190, -110]) { ctx.moveTo(bx + 30, -78); ctx.ellipse(bx, -78, 30, 12, 0, 0, 7); ctx.moveTo(bx - 30, -78); ctx.quadraticCurveTo(bx, -40, bx + 30, -78); } ctx.stroke();
  rr(ctx, 100, -140, 180, 86, 12); ctx.fillStyle = B; ctx.fill(); ctx.strokeStyle = INK; ctx.stroke();
  ctx.strokeStyle = ivo(.3); ctx.lineWidth = 4; ctx.beginPath(); for (const sx of [140, 190, 240]) { for (let j = 0; j <= 10; j++) { const yy = -150 - j * 12, xx = sx + 8 * Math.sin(j * .9 + t * 4 + sx); j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } } ctx.stroke();
  rr(ctx, -360, -50, 720, 250, 14); ctx.fillStyle = B; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke();
  ctx.strokeStyle = ivo(.12); ctx.lineWidth = 2; ctx.beginPath(); for (let yy = -10; yy < 200; yy += 40) { ctx.moveTo(-340, yy); ctx.lineTo(340, yy); } ctx.stroke();
  ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(360, 30); ctx.lineTo(500, -40); ctx.stroke();
  for (const wx of [-230, 230]) { ctx.save(); ctx.translate(wx, 232); ctx.fillStyle = bgc(); ctx.beginPath(); ctx.arc(0, 0, 72, 0, 7); ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
    ctx.rotate(t * 2); ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 66, Math.sin(a) * 66); } ctx.stroke();
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(165, 80); ctx.rotate(-.03); ctx.fillStyle = '#F4F2EA'; ctx.fillRect(-95, -112, 190, 224);
  setFont(ctx, MN(20), 6); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center'; ctx.fillText(o.label ?? 'QRIS', 0, -84); ctx.textAlign = 'left';
  ctx.drawImage(o.qr || stikerQR(), -80, -70, 160, 160);
  const ks = kq(t, ts - .1, .45);
  if (ks > 0) { const sc = lerp(1.45, 1, ks), H = 96 * sc, L = 34; ctx.globalAlpha = a0 * k * ks; ctx.strokeStyle = LIME; ctx.lineWidth = 7; ctx.lineCap = 'square'; ctx.beginPath();
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { ctx.moveTo(sx * H, 10 + sy * H - sy * L); ctx.lineTo(sx * H, 10 + sy * H); ctx.lineTo(sx * H - sx * L, 10 + sy * H); } ctx.stroke();
    if (t > ts && t < td) { const ly = 10 - Math.cos((t - ts) / (td - ts) * Math.PI * 2) * 76; ctx.fillStyle = 'rgba(200,245,60,.18)'; ctx.fillRect(-82, ly - 14, 164, 14); ctx.fillStyle = LIME; ctx.fillRect(-82, ly - 2, 164, 4); } }
  ctx.restore(); ctx.restore();
}

// a shelf of books that pop up in a wave, then get "read" one by one (dims + tick); returns how many are still unread · y = shelf top · s scale · o.titles (KITAB) · o.n 14 · o.tRead · o.durRead 1.6 · asal: ai-data-habis bab-1/src/film.js:228
export const KITAB = ['Safinah', 'Jurumiyah', 'Taqrib', 'Imrithi', 'Alfiyah', 'Aqidatul Awam', 'Sullam Taufiq', 'Arbain Nawawi', 'Fathul Qarib', 'Bulughul Maram', 'Tafsir Jalalain', 'Riyadhus Shalihin', "Ta'limul Muta'allim", 'Amtsilah Tashrifiyah'];
export function rakBuku(ctx, x, y, s, t, t0, o = {}) {
  const T = o.titles || KITAB, N = Math.min(o.n ?? 14, T.length), X0 = -(N - 1) / 2 * 104, a0 = ctx.globalAlpha; let unread = N;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a0 * kq(t, t0, .3); ctx.fillStyle = ivo(.3); ctx.fillRect(X0 - 76, 0, N * 104 + 48, 14); ctx.globalAlpha = a0;
  for (let i = 0; i < N; i++) { const k = pop(t, t0 + i * .03, .55, .3); if (k <= 0) continue; const h = 330 + rnd(i + 4) * 130, cx = X0 + i * 104;
    const tr = o.tRead != null ? o.tRead + i * (o.durRead ?? 1.6) / N : 1e9, rd = kq(t, tr, .35); if (rd > 0) unread--;
    ctx.save(); ctx.translate(cx, 0); ctx.scale(1, Math.min(1.08, k)); ctx.globalAlpha = a0 * (1 - .45 * rd);
    ctx.fillStyle = badan(); ctx.fillRect(-46, -h, 92, h); ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.strokeRect(-46, -h, 92, h);
    ctx.fillStyle = ivo(.35); ctx.fillRect(-46, -h + 26, 92, 6); ctx.fillRect(-46, -40, 92, 6);
    ctx.save(); ctx.rotate(-Math.PI / 2); setFont(ctx, SRF(30), 0); ctx.fillStyle = INK; ctx.fillText(T[i], 60, 10); ctx.restore(); ctx.restore();
    if (rd > 0) { const yb = -h * Math.min(1.08, k) - 40, P = [[cx - 22, yb], [cx - 6, yb + 16], [cx + 24, yb - 22]], d1 = clamp(rd * 2), d2 = clamp(rd * 2 - 1);
      ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...P[0]); ctx.lineTo(lerp(P[0][0], P[1][0], d1), lerp(P[0][1], P[1][1], d1));
      if (d2 > 0) ctx.lineTo(lerp(P[1][0], P[2][0], d2), lerp(P[1][1], P[2][1], d2)); ctx.stroke(); } }
  ctx.restore(); return unread;
}

// a drop full of moving words falls, squashes, spreads a word pool, ripples and splashes words out · (x, y) = drop centre at rest · r 250 · o.words (KATA) · asal: ai-data-habis bab-peta/src/film.js:81
export function tetes(ctx, x, y, r = 250, t, t0, o = {}) {
  const s = t - t0; if (s <= 0) return; const a0 = ctx.globalAlpha, land = t0 + .5, W = o.words || KATA;
  ctx.save(); ctx.translate(x, y); ctx.scale(r / 250, r / 250);
  if (t > land) { const pk = kq(t, land, 1.2), rx = 260 + 380 * pk, ry = 34 + 40 * pk;
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 265, rx, ry, 0, 0, 7); ctx.fillStyle = 'rgba(4,5,3,.9)'; ctx.fill(); ctx.clip(); ctx.globalAlpha = a0 * .5;
    tileTex(ctx, texOf('tt:pool', MN(19, 400), 36, 3, .5), -rx, 265 - ry, 2 * rx, 2 * ry, t * 8); ctx.restore();
    for (let j = 0; j < 2; j++) { const rk = kq(t, land + j * .15, 1); if (rk <= 0 || rk >= 1) continue; ctx.strokeStyle = ivo(.5 * (1 - rk)); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(0, 265, 120 + 600 * rk, 20 + 80 * rk, 0, 0, 7); ctx.stroke(); } }
  const fu = clamp(s / .5), dy = -1210 * (1 - E.inCubic(fu)), sl = Math.max(0, t - land), sq = t > land ? 1 - .12 * Math.exp(-7 * sl) * Math.cos(24 * sl) : 1;
  ctx.save(); ctx.translate(0, dy); ctx.scale(1 / sq, sq); jalurTetes(ctx, 250); ctx.fillStyle = '#0A0B08'; ctx.fill(); ctx.save(); ctx.clip();
  tileTex(ctx, texOf('tt:drop', SRF(30), 26, 11, .62), -280, -420, 560, 700, t * 40);
  const g = ctx.createRadialGradient(-.35 * 250, -.45 * 250, 10, 0, 0, 1.5 * 250); g.addColorStop(0, 'rgba(255,255,255,.22)'); g.addColorStop(.45, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.75)');
  ctx.fillStyle = g; ctx.fillRect(-280, -420, 560, 700); ctx.restore(); ctx.strokeStyle = ivo(.75); ctx.lineWidth = 3; jalurTetes(ctx, 250); ctx.stroke(); ctx.restore();
  if (t > land) { setFont(ctx, SRF(30), 0); ctx.textAlign = 'center';
    for (let j = 0; j < 9; j++) { const u = t - land; if (u > 1.1) break; const ang = -Math.PI * (.12 + .76 * rnd(j + 2)), v = 900 + 500 * rnd(j + 6);
      ctx.globalAlpha = a0 * (1 - u / 1.1) * .8; ctx.fillStyle = ivo(.7); ctx.fillText(W[j % W.length], -30 + Math.cos(ang) * v * u, 240 + Math.sin(ang) * v * u + 1400 * u * u); }
    ctx.textAlign = 'left'; }
  ctx.restore();
}

// a well in cutaway: a shaft of moving words whose level sinks (data running dry), a pipe down into it · (x, y) = rim centre · s scale · o.level px below rim | o.from 90 · o.to 470 · o.dur 2.4 · o.pipe true · asal: ai-data-habis bab-peta/src/film.js:113
export function sumur(ctx, x, y, s, t, t0, o = {}) {
  const k = t0 == null ? 1 : kq(t, t0, .6); if (k <= 0) return; const a0 = ctx.globalAlpha, RX = 360, RY = 82, D = 790;
  const lv = o.level ?? lerp(o.from ?? 90, o.to ?? 470, E.inOutCubic(inv((t0 ?? 0) + .3, (t0 ?? 0) + .3 + (o.dur ?? 2.4), t)));
  ctx.save(); ctx.translate(x, y + (1 - k) * 60); ctx.scale(s, s); ctx.globalAlpha = a0 * k;
  ctx.fillStyle = '#050604'; ctx.beginPath(); ctx.ellipse(0, 0, RX, RY, 0, Math.PI, 0); ctx.lineTo(RX, D); ctx.lineTo(-RX, D); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, lv, RX, RY * .9, 0, Math.PI, 0); ctx.lineTo(RX, D); ctx.lineTo(-RX, D); ctx.closePath(); ctx.clip();
  tileTex(ctx, texOf('tt:well', MN(22, 400), 30, 5, .55), -RX, lv - RY, 2 * RX, D - lv + RY, -t * 6);
  const g = ctx.createLinearGradient(0, lv, 0, D); g.addColorStop(0, 'rgba(5,6,4,.1)'); g.addColorStop(1, 'rgba(5,6,4,.95)'); ctx.fillStyle = g; ctx.fillRect(-RX, lv - RY, 2 * RX, D - lv + RY); ctx.restore();
  ctx.strokeStyle = lt(.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, lv, RX, RY * .9, 0, 0, 7); ctx.stroke();
  const wg = ctx.createLinearGradient(-RX, 0, RX, 0); wg.addColorStop(0, lt(.22)); wg.addColorStop(.25, lt(.02)); wg.addColorStop(.75, lt(.02)); wg.addColorStop(1, lt(.18));
  ctx.fillStyle = wg; ctx.fillRect(-RX, 0, 2 * RX, D);
  if (o.pipe !== false) { ctx.fillStyle = lt(.6); ctx.fillRect(-4 + 120, 0, 8, lv); }
  ctx.fillStyle = badan(); ctx.beginPath(); ctx.ellipse(0, 0, RX + 70, RY + 22, 0, 0, 7); ctx.ellipse(0, 0, RX, RY, 0, 0, 7); ctx.fill('evenodd');
  ctx.strokeStyle = ivo(.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(0, 0, RX + 70, RY + 22, 0, 0, 7); ctx.stroke();
  ctx.strokeStyle = ivo(.3); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, RX, RY, 0, 0, 7); ctx.stroke();
  if (o.pipe !== false) { ctx.fillStyle = ivo(.6); ctx.fillRect(-4 + 120, -450, 8, 450 - RY * .4); }
  ctx.restore();
}
