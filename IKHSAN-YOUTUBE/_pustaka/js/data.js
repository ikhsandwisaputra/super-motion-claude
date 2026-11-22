// data.js — the data stations of the first three long-forms: bar chart with a stock column + lime slice, horizontal bars, a
// two-bar race, waffle grid, year timeline with growth curves, Peta Jalur route, the split-flap board (events, cell, board),
// voice waves + level meter, and the ladder / wall / tower / cycle / retry diagrams. Plus tween(), a keyframe helper.
// Pustaka kode Super Motion (aset/_pustaka) · in a chapter: import { barChart, splitFlap, tween } from './pustaka/data.js';
// Already in the kit (import from './kit.js' / './draw.js'): countTo slot srcTag slab markLine dotGrid dotCity stamp node check …
// Every function draws centred on (x, y) in station units, runs on (t, t0), is deterministic and respects ctx.globalAlpha.
import { clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, TILE, INK, BG, LIGHT, ivo, setFont, DSP, MN, rnd, txt, fall, typeOn, countTo } from '../kit.js';
import { kq, pop, slot } from '../draw.js';
import { check, PAPER, tileTex } from './dasar.js';

const TAU = Math.PI * 2;
const tileFill = () => LIGHT ? '#D9D5C7' : TILE;
function texIn(ctx, tex, x, y, w, h, a, scroll = 0) {           // optional texture (letterTex canvas) clipped into a rect
  if (!tex || a <= 0) return; ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.globalAlpha *= a; tileTex(ctx, tex, x, y, w, h, scroll); ctx.restore();
}

// ── helpers ─────────────────────────────────────────────────────────────────────────────────────────────────
// keyframe value: keys [[time, value, ease?]] (ease = E name or fn, applied INTO that key; default inOutCubic) · asal: baru (pola dari ai-data-habis bab-3 balapan)
export function tween(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) { const [tb, vb, e] = keys[i]; if (t < tb) { const [ta, va] = keys[i - 1], f = typeof e === 'function' ? e : E[e || 'inOutCubic']; return lerp(va, vb, f(inv(ta, tb, t))); } }
  return keys[keys.length - 1][1];
}

// ── charts ──────────────────────────────────────────────────────────────────────────────────────────────────
// vertical bars vs a tall textured stock column, then a lime slice + dashed leader + '±1/10' drop · bars [{v, s?, label}] · o{stock{v,label,sub}, slice{v,label,at}, grid, sc, tex} · asal: ai-data-habis bab-peta/src/film.js:132
export function barChart(ctx, x, y, bars, t, t0, o = {}) {
  const fa = kq(t, t0, .4); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
  const SC = o.sc ?? 2.3, BY = y + (o.by ?? 330), grid = o.grid ?? [100, 200, 300], X0 = x + 330, X1 = x + 630, mid = (X0 + X1) / 2;
  ctx.strokeStyle = ivo(.12); ctx.lineWidth = 2; ctx.setLineDash([6, 10]); ctx.beginPath();
  for (const v of grid) { ctx.moveTo(x - 760, BY - v * SC); ctx.lineTo(x + 820, BY - v * SC); } ctx.stroke(); ctx.setLineDash([]);
  setFont(ctx, MN(18, 400), 1); ctx.fillStyle = ivo(.45); ctx.textAlign = 'right'; for (const v of [0, ...grid]) ctx.fillText(String(v), x - 780, BY - v * SC + 6); ctx.textAlign = 'left';
  ctx.fillStyle = ivo(.4); ctx.fillRect(x - 760, BY, 1580, 3);
  const st = o.stock, sl = o.slice, sAt = sl ? (sl.at ?? t0 + 1.7) : 1e9;
  if (st) {
    const sv = countTo(0, st.v, t, t0 + .25, 1.3), sh = sv * SC, dim = 1 - .55 * kq(t, sAt, .4);
    if (sv > .5) {
      ctx.fillStyle = LIGHT ? '#D3CFC0' : '#0E0F0B'; ctx.fillRect(X0, BY - sh, X1 - X0, sh); texIn(ctx, o.tex, X0, BY - sh, X1 - X0, sh, dim, t * 10);
      ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.strokeRect(X0, BY - sh, X1 - X0, sh);
      slot(ctx, sv, mid, BY - sh - 24, DSP(96), { align: 'center', col: INK });
    }
    txt(ctx, st.label || 'STOK', mid, BY + 44, t, t0 + .5, MN(18), { align: 'center', ls: 2, rise: 0 });
    if (st.sub) txt(ctx, st.sub, mid, BY + 72, t, t0 + .6, MN(18, 400), { align: 'center', ls: 2, col: ivo(.55), rise: 0 });
  }
  bars.forEach((b, i) => {
    const bx = x - 640 + i * 260, ta = t0 + .5 + i * .26, k = pop(t, ta, .5, .3); if (k <= 0) return; const h = b.v * SC * k;
    ctx.fillStyle = ivo(.86); ctx.fillRect(bx - 75, BY - h, 150, h);
    txt(ctx, b.s ?? String(b.v), bx, BY - h - 22, t, ta + .1, DSP(64), { align: 'center', rise: 0 });
    txt(ctx, b.label || '', bx, BY + 44, t, ta, MN(18), { align: 'center', ls: 1, col: ivo(.75), rise: 0 });
  });
  if (st && sl) {
    const lk = kq(t, sAt - .02, .45);
    if (lk > 0) {
      const h = sl.v * SC, lx = x - 640 + (bars.length - 1) * 260 + 75; ctx.fillStyle = LIME; ctx.fillRect(X0, BY - h * lk, X1 - X0, h * lk);
      ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(lx, BY - h); ctx.lineTo(lerp(lx, X0, lk), BY - h); ctx.stroke(); ctx.setLineDash([]);
      fall(ctx, sl.label ?? '±1/10', mid, BY - h - 60, t, sAt + .1, DSP(120), { align: 'center' });
    }
  }
  ctx.globalAlpha = a0;
}

// horizontal bars growing from one axis, counter rides the bar tip, hot row gets a lime edge · rows [{label, v, hot, fmt}] · o{sc, tex, gap} · asal: ai-data-habis bab-2/src/film.js:187
export function hBars(ctx, x, y, rows, t, t0, o = {}) {
  const fa = kq(t, t0, .35); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
  const X0 = x - 780, SC = o.sc ?? 1300 / 30, G = o.gap ?? 260, Y0 = y - (rows.length - 1) * G / 2 - 70;
  ctx.fillStyle = ivo(.35); ctx.fillRect(X0 - 2, Y0 - 50, 3, (rows.length - 1) * G + 140 + 70);
  rows.forEach((r, i) => {
    const ry = Y0 + i * G, ta = t0 + .2 + i * .35, w = r.v * SC * E.outCubic(inv(ta, ta + .9, t)), landed = t >= ta + .9;
    txt(ctx, r.label, X0, ry - 18, t, ta - .1, MN(22), { ls: 4, col: ivo(.75), rise: 0 });
    if (w > 1) {
      ctx.fillStyle = tileFill(); ctx.fillRect(X0, ry, w, 140); texIn(ctx, o.tex, X0, ry, w, 140, r.hot ? .75 : .45, t * 8);
      ctx.strokeStyle = r.hot && landed ? (LIGHT ? INK : LIME) : ivo(.7); ctx.lineWidth = 3; ctx.strokeRect(X0, ry, w, 140);
      if (r.hot && LIGHT && landed) { ctx.fillStyle = LIME; ctx.fillRect(X0, ry + 134, w, 6); }
    }
    if (t >= ta) slot(ctx, r.v * E.outCubic(inv(ta, ta + .9, t)), X0 + w + 26, ry + 112, DSP(r.hot ? 130 : 96), { col: INK, fmt: r.fmt || (q => q + '%') });
  });
  ctx.globalAlpha = a0;
}

// two-bar race: a fixed reference bar vs a learner bar that runs, stalls, then overtakes in lime · o{a, b, note, win, base} · asal: ai-data-habis bab-3/src/film.js:172
export function balapan(ctx, x, y, t, t0, o = {}) {
  const fa = kq(t, t0, .35); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
  const L = x - 420, base = o.base ?? 900, win = o.win ?? t0 + 1.7, won = t >= win;
  setFont(ctx, MN(22), 3); ctx.fillStyle = ivo(.75); ctx.fillText(o.a ?? 'GURU', x - 820, y - 52); ctx.fillText(o.b ?? 'MURID', x - 820, y + 88);
  ctx.fillStyle = INK; ctx.fillRect(L, y - 90, base * E.outCubic(inv(t0, t0 + .6, t)), 60);
  const w = tween(t, [[t0 + .3, 0], [t0 + 1.2, base * .8, 'outQuint'], [win, base * .8]]) + base * .4 * Math.min(1.08, pop(t, win, .5, .3));
  if (w > 0) { ctx.fillStyle = won ? LIME : ivo(.5); ctx.fillRect(L, y + 50, w, 60); if (won) { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(L, y + 50, w, 60); } }
  ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(L + base, y - 130); ctx.lineTo(L + base, y + 150); ctx.stroke(); ctx.setLineDash([]);
  txt(ctx, o.note ?? 'ilustrasi, bukan skor', L, y + 190, t, t0 + .5, MN(17, 400), { ls: 2, col: ivo(.5), rise: 0 });
  ctx.globalAlpha = a0;
}

// waffle grid: cells pop in one by one, the first n turn lime and shrink ('eaten') · o{cols, rows, cs, gap, title, eat (time), tex, lime} · asal: ai-data-habis bab-1/src/film.js:140
export function waffle(ctx, x, y, n, t, t0, o = {}) {
  const C = o.cols ?? 20, R = o.rows ?? 15, CS = o.cs ?? 48, GP = o.gap ?? 7, P = CS + GP, GX0 = x - (C * P - GP) / 2, GY0 = y - (R * P - GP) / 2, eat = o.eat ?? t0 + 1.4;
  if (o.title) typeOn(ctx, o.title, GX0, GY0 - 40, t, t0, MN(20), { ls: 2, cps: 70 });
  const rest = new Path2D(), eaten = [];
  for (let i = 0; i < C * R; i++) {
    const v = clamp((t - (t0 + .05 + i * .004)) / .25); if (v <= 0) break;
    const cx = GX0 + (i % C) * P + CS / 2, cy = GY0 + Math.floor(i / C) * P + CS / 2, e = i < n ? kq(t, eat + i * .012, .35) : 0;
    if (e > 0) { eaten.push([cx, cy, CS * (1 - .45 * e) * v]); continue; }
    const s = CS * v; rest.rect(cx - s / 2, cy - s / 2, s, s);
  }
  ctx.fillStyle = tileFill(); ctx.fill(rest); ctx.save(); ctx.clip(rest); texIn(ctx, o.tex, GX0, GY0, C * P, R * P, .38, t * 6); ctx.restore();
  ctx.strokeStyle = ivo(.32); ctx.lineWidth = 2.5; ctx.stroke(rest);
  ctx.fillStyle = o.lime === false ? ivo(.9) : LIME; ctx.beginPath(); for (const [cx, cy, s] of eaten) ctx.rect(cx - s / 2, cy - s / 2, s, s); ctx.fill();
}

// year axis + shaded window + threshold line + growth curves that hit it (year drops in) + lime 'KITA DI SINI' pin · o{from, to, step, band[y0,y1], line{label}, curves[{from,to,at}], pin, pinAt, pinLabel} · asal: ai-data-habis bab-1/src/film.js:166
export function timeline(ctx, x, y, t, t0, o = {}) {
  const fa = kq(t, t0, .4); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
  const from = o.from ?? 2024, to = o.to ?? 2034, step = o.step ?? 1600 / (to - from), X = yr => x - 800 + (yr - from) * step, AY = y + 220, SY = y - 230;
  if (o.band) { const k = E.inOutCubic(inv(t0 + .4, t0 + 1.2, t)); ctx.fillStyle = ivo(.09); ctx.fillRect(X(o.band[0]), SY - 40, (X(o.band[1]) - X(o.band[0])) * k, AY - SY + 40); }
  ctx.fillStyle = ivo(.4); ctx.fillRect(X(from), AY - 1.5, (X(to) - X(from)) * kq(t, t0, .7), 3);
  setFont(ctx, MN(20, 400), 1); ctx.textAlign = 'center'; ctx.beginPath();
  for (let yr = from; yr <= to; yr++) { if (t < t0 + (yr - from) * .03) continue; ctx.rect(X(yr) - 1, AY - 10, 2, 20); ctx.fillStyle = ivo(.55); ctx.fillText(String(yr), X(yr), AY + 44); }
  ctx.fillStyle = ivo(.4); ctx.fill(); ctx.textAlign = 'left';
  if (o.line) { const k = kq(t, t0 + .2, .8); ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(X(from), SY); ctx.lineTo(lerp(X(from), X(to), k), SY); ctx.stroke(); ctx.setLineDash([]);
    txt(ctx, o.line.label || '', X(to), SY - 18, t, t0 + .5, MN(20), { align: 'right', ls: 3, col: ivo(.75), rise: 0 }); }
  for (const c of o.curves || []) {
    const at = c.at ?? t0 + .6, k = kq(t, at, 1.6); if (k <= 0) continue; const xa = X(c.from ?? from), xb = X(c.to);
    ctx.save(); ctx.beginPath(); ctx.rect(xa - 4, SY - 60, (xb - xa + 8) * k, AY - SY + 70); ctx.clip();
    ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let px = xa; px <= xb + .1; px += 8) { const u = (Math.min(px, xb) - xa) / (xb - xa); px === xa ? ctx.moveTo(px, AY - (AY - SY) * u ** 2.4) : ctx.lineTo(Math.min(px, xb), AY - (AY - SY) * u ** 2.4); }
    ctx.stroke(); ctx.restore();
    fall(ctx, String(c.to), xb, SY - 70, t, at + 1.35, DSP(110), { align: 'center' });
  }
  if (o.pin != null) {
    const pa = o.pinAt ?? t0 + 2, k = pop(t, pa, .55, .35);
    if (k > 0) { const px = lerp(x - 900, X(o.pin), E.outCubic(inv(pa, pa + .5, t))), lab = o.pinLabel ?? 'KITA DI SINI';
      ctx.fillStyle = LIME; ctx.fillRect(px - 3, lerp(AY + 70, SY, Math.min(1, k)), 6, (AY + 70 - SY) * Math.min(1, k));
      setFont(ctx, MN(24), 3); const w = ctx.measureText(lab).width + 28; ctx.fillRect(px - w / 2, AY + 78, w, 44);
      ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText(lab, px + 1.5, AY + 109); ctx.textAlign = 'left'; }
  }
  ctx.globalAlpha = a0;
}

// ── route / boards ──────────────────────────────────────────────────────────────────────────────────────────
// Peta Jalur: numbered route, progress line runs to node n with a glow head, current node = springy lime disc + ring · nodes [label] · o{w, from} · asal: ai-bubble-dompet bab-4/src/film.js:160 · ledger: peta-jalur
export function jalur(ctx, x, y, nodes, n, t, t0, o = {}) {
  const fa = E.outCubic(inv(t0 - .15, t0 + .45, t)); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
  const N = nodes.length, W = o.w ?? 1500, X = i => x - W / 2 + i * W / (N - 1), u = E.inOutCubic(inv(t0, t0 + .9, t)), hx = lerp(X(o.from ?? Math.max(0, n - 1)), X(n), u);
  ctx.strokeStyle = ivo(.2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(0), y); ctx.lineTo(X(N - 1), y); ctx.stroke();
  ctx.strokeStyle = ivo(.85); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(0), y); ctx.lineTo(hx, y); ctx.stroke();
  const g = ctx.createRadialGradient(hx, y, 0, hx, y, 60); g.addColorStop(0, ivo(.35)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(hx - 60, y - 60, 120, 120);
  const s = t - (t0 + .9);
  nodes.forEach((lab, i) => {
    const nx = X(i), end = i === 0 || i === N - 1, cur = i === n && s > 0, done = i < n;
    if (cur) { const r = 19 * Math.min(1.15, spring(s, .5, .3)); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(nx, y, r, 0, TAU); ctx.fill();
      ctx.strokeStyle = LIME; ctx.globalAlpha = a0 * fa * .45 * clamp(s / .3); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(nx, y, 26 + 10 * Math.sin(6 * t), 0, TAU); ctx.stroke(); ctx.globalAlpha = a0 * fa; }
    else { ctx.fillStyle = done ? INK : BG; ctx.beginPath(); end ? ctx.rect(nx - 13, y - 13, 26, 26) : ctx.arc(nx, y, 15, 0, TAU); ctx.fill();
      if (!done) { ctx.strokeStyle = ivo(.4); ctx.lineWidth = 2; ctx.stroke(); }
      if (!end) { setFont(ctx, MN(17), 0); ctx.fillStyle = done ? BG : ivo(.6); ctx.textAlign = 'center'; ctx.fillText(String(i), nx, y + 6); } }
    if (end || i <= n) { setFont(ctx, MN(17), 4); ctx.fillStyle = i === n ? INK : ivo(.6); ctx.textAlign = 'center'; ctx.fillText(lab, nx + 2, y + 58); }
  });
  ctx.textAlign = 'left'; ctx.globalAlpha = a0;
}

export const FLAP_CH = 'ABCDEFGHIJKLMNOPRSTUVWY0123456789?';
// split-flap timing for tile i of row r: blank settle, then each word [[time, word, look?]] flips in left→right · asal: ai-bubble-dompet bab-4/src/film.js:190 · ledger: split-flap-board
export function flapEvents(t0, words, i, r = 0) {
  const ev = [[t0 + .05 + r * .08 + i * .03, t0 + .55 + r * .1 + i * .035, ' ', null]]; let prev = '';
  for (const [tw, word, look] of words) { if (i < Math.max(word.length, prev.length)) ev.push([tw - .32 + i * .015, tw - .05 + i * .045, word[i] || ' ', look ?? null]); prev = word; }
  return ev;
}
// state of one tile at t: {cur, prev, p (flap progress, 1 = still), look (only once landed)} · o{chars, fl = .065 s per flap} · asal: ai-bubble-dompet bab-4/src/film.js:196
export function flapState(ev, t, seed, o = {}) {
  const CH = o.chars ?? FLAP_CH, FL = o.fl ?? .065, chr = k => CH[Math.floor(rnd(k) * CH.length)];
  let j = -1; for (let q = 0; q < ev.length; q++) if (t >= ev[q][0]) j = q;
  if (j < 0) return { cur: ' ', prev: ' ', p: 1, look: null };
  const [a, b, fin, look] = ev[j], n = Math.max(2, Math.round((b - a) / FL)), k = Math.floor((t - a) / FL), before = j ? ev[j - 1][2] : ' ';
  if (k >= n) return { cur: fin, prev: fin, p: 1, look };
  return { cur: k === n - 1 ? fin : chr(seed + k), prev: k ? chr(seed + k - 1) : before, p: (t - a) / FL - k, look: null };
}
function glyph(ctx, c, h, ink) {                                 // ▲ ▼ - drawn as shapes, the rest as display type
  if (c === ' ') return; ctx.fillStyle = ink;
  if (c === '▲' || c === '▼') { const s = h * .2, d = c === '▲' ? -1 : 1; ctx.beginPath(); ctx.moveTo(-s, -d * s * .7); ctx.lineTo(s, -d * s * .7); ctx.lineTo(0, d * s * .8); ctx.fill(); return; }
  if (c === '-') { ctx.fillRect(-h * .16, -h * .035, h * .32, h * .07); return; }
  setFont(ctx, DSP(h * .86), 0); ctx.textAlign = 'center'; ctx.fillText(c, 0, h * .31); ctx.textAlign = 'left';
}
// one split-flap cell (state from flapState): two faces, hinge, folding flap with dark falloff · o{fill, ink, r, shadow = LIGHT}; look 'lime' = lime tile · asal: ai-data-habis bab-3/src/film.js:96 + ai-bubble-dompet bab-4:209
export function flap(ctx, x, y, w, h, s, o = {}) {
  const lime = s.p >= 1 && s.look === 'lime' && s.cur !== ' ', fill = lime ? LIME : (o.fill ?? '#1C1D17'), ink = lime ? LIME_INK : (o.ink ?? IVORY), r = o.r ?? Math.min(12, w * .1);
  if (o.shadow ?? LIGHT) { ctx.save(); ctx.shadowColor = 'rgba(21,22,15,.3)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14; ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, r); ctx.fill(); ctx.restore(); }
  const face = (c, half, dark = 0) => {                            // half: 0 full, -1 top, 1 bottom (in local 0,0 space)
    ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, half > 0 ? 0 : -h / 2, w, half ? h / 2 : h); ctx.clip();
    ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, r); ctx.fillStyle = fill; ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.fillRect(-w / 2, -h / 2, w, h / 2); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(-w / 2, 0, w, h / 2);
    glyph(ctx, c, h, ink); if (dark > 0) { ctx.fillStyle = `rgba(0,0,0,${dark})`; ctx.fillRect(-w / 2, -h / 2, w, h); } ctx.restore();
  };
  ctx.save(); ctx.translate(x, y);
  if (s.p >= 1) face(s.cur, 0);
  else { face(s.cur, -1); face(s.prev, 1);
    ctx.save(); if (s.p < .5) { ctx.scale(1, Math.max(.001, 1 - 2 * s.p)); face(s.prev, -1, .4 * s.p); } else { ctx.scale(1, Math.max(.001, 2 * s.p - 1)); face(s.cur, 1, .3 * (1 - s.p)); } ctx.restore(); }
  ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(-w / 2, -2, w, 4); ctx.restore();
}
// full split-flap board (dark panel in both worlds): screws, lime title, numbered rows that slide in, words flip per tile, lamp when a row lands · rows [{no, label, words: [[time, word, look]]}] · o{cols, cw, ch, gap, title, lamp} · asal: ai-bubble-dompet bab-4/src/film.js:216 + teknologi-indo-vs-as puncak/src/film.js:61 · ledger: split-flap-board
export function splitFlap(ctx, x, y, rows, t, t0, o = {}) {
  const fa = kq(t, t0 - .3, .35); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
  const C = o.cols ?? 9, cw = o.cw ?? 96, ch = o.ch ?? 132, gp = o.gap ?? 8, RH = ch + 58, tilesW = C * (cw + gp) - gp, PW = tilesW + 300, PH = rows.length * RH + 150;
  const L = x - PW / 2, T = y - PH / 2 + (1 - fa) * 30, TX = L + 140;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.fillStyle = '#121310'; ctx.beginPath(); ctx.roundRect(L, T, PW, PH, 22); ctx.fill(); ctx.restore();
  ctx.strokeStyle = 'rgba(241,239,230,.08)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(L + 1, T + 1, PW - 2, PH - 2, 21); ctx.stroke();
  ctx.fillStyle = '#2A2B24'; ctx.beginPath(); for (const [sx, sy] of [[L + 26, T + 26], [L + PW - 26, T + 26], [L + 26, T + PH - 26], [L + PW - 26, T + PH - 26]]) { ctx.moveTo(sx + 7, sy); ctx.arc(sx, sy, 7, 0, TAU); } ctx.fill();
  if (o.title) typeOn(ctx, o.title, TX, T + 70, t, t0 + .1, MN(30), { ls: 6, cps: 28, col: LIME });
  rows.forEach((row, r) => {
    const ry = T + 125 + r * RH + ch / 2, sl = (1 - kq(t, t0 + r * .08, .6)) * 80, words = row.words || [];
    setFont(ctx, MN(28), 2); ctx.fillStyle = 'rgba(241,239,230,.5)'; ctx.fillText(row.no ?? String(r + 1).padStart(2, '0'), L + 50 + sl, ry + 10);
    if (row.label) { setFont(ctx, MN(16), 4); ctx.fillStyle = 'rgba(241,239,230,.42)'; ctx.fillText(row.label, TX + sl, ry - ch / 2 - 12); }
    for (let i = 0; i < C; i++) flap(ctx, TX + sl + i * (cw + gp) + cw / 2, ry, cw, ch, flapState(flapEvents(t0, words, i, r), t, r * 97 + i * 13 + words.length * 7), { shadow: false });
    const on = words.length && o.lamp !== false ? clamp((t - words[words.length - 1][0]) / .25) : 0;
    if (on > 0) { const lx = TX + tilesW + 70, g = ctx.createRadialGradient(lx, ry, 0, lx, ry, 40);
      g.addColorStop(0, `rgba(241,239,230,${.9 * on})`); g.addColorStop(.3, `rgba(241,239,230,${.35 * on})`); g.addColorStop(1, 'rgba(241,239,230,0)'); ctx.fillStyle = g; ctx.fillRect(lx - 40, ry - 40, 80, 80); }
  });
  ctx.globalAlpha = a0;
}

// ── sound ───────────────────────────────────────────────────────────────────────────────────────────────────
// adds one voice wave to a path (ctx or Path2D): 3 seeded sines under a sin^.6 envelope, o.pure = clean sine · o{n, speed} · asal: ai-data-habis bab-4/src/ui.js:17
export function wave(p, x0, x1, y, amp, t, seed, o = {}) {
  const n = o.n || 160, f1 = 2 + 3 * rnd(seed), f2 = 7 + 5 * rnd(seed + 1), f3 = 13 + 9 * rnd(seed + 2), ph = t * (o.speed ?? 1.4);
  p.moveTo(x0, y);
  for (let i = 1; i <= n; i++) { const u = i / n, env = Math.sin(Math.PI * u) ** .6;
    const v = o.pure ? Math.sin(u * TAU * 4 - ph * 3) : .55 * Math.sin(u * f1 * 6.28 + ph + seed) + .3 * Math.sin(u * f2 * 6.28 - ph * 1.7 + seed * 2) + .25 * Math.sin(u * f3 * 6.28 + ph * 2.3);
    p.lineTo(lerp(x0, x1, u), y + amp * env * v); }
}
// level meter: mono label + %, rail with ticks, ink fill v (0..1), drawn from its left edge x · asal: ai-data-habis bab-4/src/ui.js:27
export function meter(ctx, x, y, w, v, label, a = 1) {
  const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * a;
  setFont(ctx, MN(22), 4); ctx.fillStyle = ivo(.75); ctx.textAlign = 'left'; ctx.fillText(label, x, y - 30);
  ctx.fillStyle = ivo(.14); ctx.fillRect(x, y - 9, w, 18);
  ctx.beginPath(); for (let i = 0; i <= 10; i++) ctx.rect(x + w * i / 10 - 1, y + 14, 2, i % 5 ? 8 : 16); ctx.fillStyle = ivo(.4); ctx.fill();
  ctx.fillStyle = INK; ctx.fillRect(x, y - 9, w * clamp(v), 18);
  setFont(ctx, MN(22), 2); ctx.textAlign = 'right'; ctx.fillStyle = ivo(.85); ctx.fillText(`${Math.round(clamp(v) * 100)}%`, x + w, y - 30); ctx.textAlign = 'left';
  ctx.globalAlpha = a0;
}

// ── diagrams ────────────────────────────────────────────────────────────────────────────────────────────────
// ladder that grows to a ceiling slab which snaps down with a bump; a climber steps up rung by rung and hits it (impact rays) · o{atap, ceil, steps, climber(ctx, x, y, hit)} · asal: ai-data-habis bab-3/src/film.js:326
export function tangga(ctx, x, y, t, t0, o = {}) {
  const fa = kq(t, t0, .3); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
  const F = y + 300, cA = o.ceil ?? t0 + .1, nS = o.steps ?? 6, hit = t0 + .9 + nS * .2;
  const bump = (tb, a) => t > tb && t < tb + .6 ? a * Math.exp(-(t - tb) * 8) * Math.sin((t - tb) * 40) : 0;
  const cy = lerp(y - 700, y - 330, E.snap(inv(cA, cA + .5, t))) + bump(hit, 10);
  ctx.fillStyle = INK; ctx.fillRect(x - 960, cy - 30, 1920, 60);
  typeOn(ctx, o.atap ?? 'BATAS ATAS', x, cy + 9, t, cA + .3, MN(24), { align: 'center', ls: 6, cps: 40, col: BG });
  const top = lerp(F, cy + 30, E.outCubic(inv(t0, t0 + .7, t)));
  ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 70, F); ctx.lineTo(x - 70, top); ctx.moveTo(x + 70, F); ctx.lineTo(x + 70, top);
  for (let yy = F - 40; yy > top + 10; yy -= 64) { ctx.moveTo(x - 70, yy); ctx.lineTo(x + 70, yy); } ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 600, F + 2); ctx.lineTo(x + 600, F + 2); ctx.stroke(); ctx.lineCap = 'butt';
  const st = clamp((t - t0 - .9) / .2, 0, nS), stk = Math.min(nS, Math.floor(st) + E.outCubic(st % 1)), yTop = cy + 30 + 30, yb = lerp(F - 30, yTop, stk / nS) - bump(hit, -12);
  if (o.climber) o.climber(ctx, x, yb, t >= hit);
  else { const k = pop(t, t0 + .5, .5, .3); ctx.fillStyle = LIME; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, yb, 24 * Math.min(1.1, k), 0, TAU); ctx.fill(); if (k > 0) ctx.stroke(); }
  if (t > hit && t < hit + .5) { const q = t - hit; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.globalAlpha = a0 * fa * (1 - q / .5);
    ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = Math.PI * (.15 + i * .175), r0 = 70 + q * 120; ctx.moveTo(x + Math.cos(a) * r0, cy + 30 + Math.sin(a) * r0 * .6); ctx.lineTo(x + Math.cos(a) * (r0 + 30), cy + 30 + Math.sin(a) * (r0 + 30) * .6); } ctx.stroke(); }
  ctx.globalAlpha = a0;
}

// two-lane comparison: lane 1 bar accelerates into a wall and bounces ('TERBATAS'), lane 2 arrow runs on past it · o{a, b, kata, hit, run} · asal: ai-data-habis bab-3/src/film.js:355
export function batas(ctx, x, y, t, t0, o = {}) {
  const L = x - 420, hit = o.hit ?? t0 + .9, run = o.run ?? t0 + 1.3;
  typeOn(ctx, o.a ?? 'TULISAN MANUSIA', L, y - 160, t, t0 - .1, MN(20), { ls: 4, cps: 45 });
  if (t > t0) { const k = E.inCubic(inv(t0, hit, t)), bb = t > hit ? -10 * Math.exp(-(t - hit) * 10) * Math.abs(Math.sin((t - hit) * 30)) : 0;
    ctx.fillStyle = INK; ctx.fillRect(L, y - 138, 420 * k + bb, 44); ctx.fillRect(L + 430, y - 180, 14, 128); }
  fall(ctx, o.kata ?? 'TERBATAS', L, y - 10, t, hit - .05, DSP(90), { ls: 3 });
  typeOn(ctx, o.b ?? 'PENGALAMAN', L, y + 120, t, run - .15, MN(20), { ls: 4, cps: 45 });
  if (t > run) { const x1 = L + 900 * E.inOutCubic(inv(run, run + 1.1, t)); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(L, y + 160); ctx.lineTo(x1, y + 160); ctx.moveTo(x1 - 22, y + 142); ctx.lineTo(x1, y + 160); ctx.lineTo(x1 - 22, y + 178); ctx.stroke(); ctx.lineCap = 'butt'; }
}

// a tower of n books (3 tone passes, page edges, jitter) that builds up and scrolls the view once it passes 760 px · o{n, dur, w, clipW} · asal: ai-data-habis bab-3/src/film.js:391
export function menara(ctx, x, y, t, t0, o = {}) {
  const BH = 28, n = (o.n ?? 1100) * E.inOutCubic(inv(t0, t0 + (o.dur ?? 2), t)), vy = Math.max(0, n * BH - 760), F = y + 420 + vy, cw = o.clipW ?? 480;
  const tones = LIGHT ? [INK, '#3E3F37', '#66675E'] : [IVORY, '#BDBBB2', '#8C8B83'], bw = o.w ?? 300;
  ctx.save(); ctx.beginPath(); ctx.rect(x - cw, y - 560, cw * 2, 980); ctx.clip();
  const i0 = Math.max(0, Math.floor((F - y - 600) / BH)), i1 = Math.min(n, (F - y + 600) / BH);
  for (let c = 0; c < 3; c++) { ctx.beginPath();
    for (let i = i0; i < i1; i++) { if (i % 3 !== c && !(c === 0 && rnd(i * 1.7) < .2)) continue;
      const yy = F - (i + 1) * BH, w = bw + rnd(i + .5) * bw * .3, bx = x - w / 2 + (rnd(i * 2.3) - .5) * 26; ctx.rect(bx, yy + 2, w * Math.min(1, n - i), BH - 3); }
    ctx.fillStyle = tones[c]; ctx.fill(); }
  ctx.fillStyle = LIGHT ? PAPER : '#2A2B24'; ctx.beginPath();
  for (let i = i0; i < Math.min(n - 1, i1); i++) { const yy = F - (i + 1) * BH, w = bw + rnd(i + .5) * bw * .3, bx = x - w / 2 + (rnd(i * 2.3) - .5) * 26; ctx.rect(bx + w - 22, yy + 7, 14, BH - 13); }
  ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - cw + 40, F + 1); ctx.lineTo(x + cw - 40, F + 1); ctx.stroke(); ctx.restore();
}
// one thin book dropping onto a floor at y with a stiff bounce (the '±15 juta' answer to menara) · asal: ai-data-habis bab-3/src/film.js:412
export function bukuJatuh(ctx, x, y, t, t0, o = {}) {
  const kb = E.outCubic(inv(t0 - .2, t0 + .02, t)); if (kb <= 0) return; const bb = t > t0 ? 6 * Math.exp(-(t - t0) * 12) * Math.sin((t - t0) * 50) : 0, w = o.w ?? 320;
  const yy = lerp(y - 900, y - 28, kb) + bb; ctx.fillStyle = INK; ctx.fillRect(x - w / 2, yy, w, 26); ctx.fillStyle = LIGHT ? PAPER : '#2A2B24'; ctx.fillRect(x + w / 2 - 20, yy + 6, 14, 14);
  ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2 - 100, y); ctx.lineTo(x + w / 2 + 100, y); ctx.stroke();
}

// three-step cycle list: ✗ JATUH / ↻ COBA LAGI / ✓ BERHASIL, icons pop, words fall in · steps [[word, time]] · asal: ai-data-habis bab-3/src/film.js:240
export function siklus(ctx, x, y, steps, t, t0) {
  steps.forEach(([s, ts], i) => { const yy = y - 160 + i * 140, k = pop(t, ts ?? t0 + i * .5, .5, .28); if (k <= 0) return; const ix = x - 70, iy = yy - 38;
    if (i < 2) { ctx.save(); ctx.translate(ix, iy); ctx.scale(Math.min(1.1, k), Math.min(1.1, k)); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath();
      if (i === 0) { ctx.moveTo(-22, -22); ctx.lineTo(22, 22); ctx.moveTo(22, -22); ctx.lineTo(-22, 22); }
      else { ctx.arc(0, 0, 26, .4, Math.PI * 1.8); ctx.moveTo(14, 0); ctx.lineTo(25, 13); ctx.lineTo(36, -2); }
      ctx.stroke(); ctx.restore(); }
    else check(ctx, ix, iy, 34, t, ts ?? t0 + i * .5);
    fall(ctx, s, x, yy, t, ts ?? t0 + i * .5, DSP(108), { ls: 3, stag: .02 }); });
}
// retry glyph: open arc with arrowhead that spins one full turn (inOutCubic .9 s) — sits after a word like 'coba-coba' · o{r, lw, col} · asal: ai-data-habis bab-3/src/film.js:218
export function ulang(ctx, x, y, t, t0, o = {}) {
  if (t < t0) return; const r = o.r ?? 28, sp = E.inOutCubic(inv(t0, t0 + .9, t)) * TAU;
  ctx.save(); ctx.translate(x, y); ctx.rotate(sp); ctx.strokeStyle = o.col ?? INK; ctx.lineWidth = o.lw ?? 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.arc(0, 0, r, .3, Math.PI * 1.75); const ax = Math.cos(Math.PI * 1.75) * r, ay = Math.sin(Math.PI * 1.75) * r;
  ctx.moveTo(ax - r * .45, ay - r * .1); ctx.lineTo(ax, ay); ctx.lineTo(ax - r * .05, ay + r * .45); ctx.stroke(); ctx.restore();
}
