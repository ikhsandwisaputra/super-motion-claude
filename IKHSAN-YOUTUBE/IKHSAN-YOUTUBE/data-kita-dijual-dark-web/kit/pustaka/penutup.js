// penutup.js — how a film says goodbye: the subscribe pill a cursor clicks (it turns lime, ticks, the bell swings), the end-screen
// layout (dark left gradient, closing line, two marching-ants slots for YouTube's elements, subscribe), the next-video card flying in
// with a queue bar, and the "intinya" recap board (one lime anchor line, the big statement, options hanging on ropes).
// Pustaka kode Super Motion (aset/_pustaka) · in a chapter: import { subscribe, endScreen } from './pustaka/penutup.js';
// endScreen is screen-space: in the chapter's over(o, t) call o.setTransform(1, 0, 0, 1, 0, 0) first, then endScreen(o, 960, 540, t, E0, {…}).
// rr / tick / the arrow cursor / UIF are private copies here (ui.js has the public kursor + UIF; js/ modules may not import each other).
import { clamp, inv, lerp, E, D2R, INK, LIME, LIME_INK, CARD, CARD_INK, BGRGB, SHD, ivo, setFont, DSP, SRF, MN, fall, txt, markLine, slab } from '../kit.js';
import { kq } from '../draw.js';
import { cover } from './dasar.js';

const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const tick = (ctx, x, y, s, k) => { ctx.beginPath(); ctx.moveTo(x - .5 * s, y); const a = Math.min(1, 2 * k); ctx.lineTo(x - .5 * s + .35 * s * a, y + .35 * s * a);
  if (k > .5) ctx.lineTo(x - .15 * s + .65 * s * (k - .5) * 2, y + .35 * s - .75 * s * (k - .5) * 2); ctx.stroke(); };
const PANAH = [[0, 0], [0, 34], [8, 26], [14, 39], [20, 36], [14, 23], [25, 23]];
function panah(ctx, x, y, s, a) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; ctx.beginPath(); PANAH.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
  ctx.closePath(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 5; ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = '#11120E'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
const dip = (t, tk) => Math.sin(Math.PI * clamp((t - tk + .04) / .16));

// the subscribe pill a cursor clicks: it springs in, the cursor glides over and clicks (pill dips, turns lime, label flips, tick draws, lime ripple), the bell slides in and is clicked too (swings, fills) — silent, no "ting" · x, y = pill centre · o.klik (t0 + 1.46) · o.lonceng (t0 + 2.51; false = no bell) · o.label · o.labelOn · o.inisial 'R' · o.w 430 (grows to fit) · o.h 108 · o.kursor false · asal: ai-data-habis penutup/src/film.js:280 · ledger: cursor-click-subscribe
export function subscribe(ctx, x, y, t, t0, o = {}) {
  const kb = E.outQuint(inv(t0, t0 + .6, t)); if (kb <= 0) return; const a0 = ctx.globalAlpha, c1 = o.klik ?? t0 + 1.46, c2 = o.lonceng ?? t0 + 2.51, BH = o.h ?? 108;
  const lab = o.label ?? 'SUBSCRIBE', labOn = o.labelOn ?? 'SUBSCRIBED'; setFont(ctx, DSP(BH * .574), 3); const BW = Math.max(o.w ?? 430, BH * .98 + ctx.measureText(labOn).width + 80);
  const on = t > c1 + .06, press = 1 - .06 * dip(t, c1), hov = .025 * clamp((t - c1 + .31) / .2) * (on ? 0 : 1), s = lerp(.82, 1, kb) * (press + hov);
  ctx.save(); ctx.globalAlpha = a0 * kb; ctx.translate(x, y); ctx.scale(s, s);
  ctx.shadowColor = `rgba(0,0,0,${(.85 * SHD).toFixed(2)})`; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; ctx.fillStyle = on ? LIME : CARD; rr(ctx, -BW / 2, -BH / 2, BW, BH, BH / 2); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.fillStyle = on ? LIME_INK : CARD_INK; ctx.beginPath(); ctx.arc(-BW / 2 + BH * .52, 0, BH * .28, 0, 7); ctx.fill();
  setFont(ctx, DSP(BH * .37), 0); ctx.fillStyle = on ? LIME : CARD; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.inisial ?? 'R', -BW / 2 + BH * .52, 2);
  setFont(ctx, DSP(BH * .574), 3); ctx.fillStyle = on ? LIME_INK : CARD_INK; ctx.textAlign = 'left'; ctx.fillText(on ? labOn : lab, -BW / 2 + BH * .98, 4); ctx.textBaseline = 'alphabetic';
  if (on) { ctx.strokeStyle = LIME_INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; tick(ctx, BW / 2 - 52, -2, 30, E.outCubic(inv(c1 + .06, c1 + .3, t))); }
  ctx.restore();
  const kr = inv(c1, c1 + .55, t); if (kr > 0 && kr < 1) { const e = E.outCubic(kr); ctx.save(); ctx.globalAlpha = a0 * (1 - kr) * .8; ctx.strokeStyle = LIME; ctx.lineWidth = 4;
    rr(ctx, x - BW / 2 - 30 * e, y - BH / 2 - 30 * e, BW + 60 * e, BH + 60 * e, BH / 2 + 30 * kr); ctx.stroke(); ctx.restore(); }
  const BLX = x + BW / 2 + 84, kl = o.lonceng === false ? 0 : E.outQuint(inv(c1 + .25, c1 + .7, t));
  if (kl > 0) { const on2 = t > c2 + .05, sw = t > c2 ? Math.sin((t - c2) * 26) * Math.exp(-(t - c2) * 3.2) * 20 * D2R : 0, p2 = 1 - .07 * dip(t, c2), sb = lerp(.6, 1, kl) * p2;
    ctx.save(); ctx.globalAlpha = a0 * kl; ctx.translate(BLX, y); ctx.scale(sb, sb); ctx.fillStyle = on2 ? CARD : `rgba(${BGRGB},.6)`; ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, 0, 54, 0, 7); ctx.fill(); ctx.stroke(); ctx.rotate(sw); ctx.translate(0, -2); ctx.fillStyle = on2 ? CARD_INK : INK;
    ctx.beginPath(); ctx.moveTo(-22, 14); ctx.lineTo(-16, 7); ctx.lineTo(-16, -5); ctx.bezierCurveTo(-16, -25, 16, -25, 16, -5); ctx.lineTo(16, 7); ctx.lineTo(22, 14); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(0, 19, 5, 0, 7); ctx.fill(); ctx.fillRect(-2.5, -27, 5, 6); ctx.restore(); }
  if (o.kursor === false) return;
  const kp = E.inOutCubic(inv(c1 - .96, c1 - .26, t)), k3 = o.lonceng === false ? 0 : E.inOutCubic(inv(c1 + .45, c1 + .95, t)), tx = o.lonceng === false ? c1 + .6 : c2 + .5, kx = E.inOutCubic(inv(tx, tx + .7, t));
  if (kp > 0) { let cx = lerp(x + 619, x + BW * .12, kp), cy = lerp(y + 246, y + BH * .12, kp); cx = lerp(cx, BLX + 10, k3); cy = lerp(cy, y + 14, k3); cx += 60 * kx; cy += 40 * kx;
    panah(ctx, cx, cy, 1.5 * (1 - .12 * dip(t, c1) - (o.lonceng === false ? 0 : .12 * dip(t, c2))), clamp(kp * 3) * (1 - kx)); }
}

function kartu(ctx, t, o) {                                    // the next-video thumbnail, 1000 × 562 centred at 0,0 (dark object: fixed ivory text)
  const W = 1000, H = 562; ctx.save(); rr(ctx, -W / 2, -H / 2, W, H, 20); ctx.clip(); const g = ctx.createLinearGradient(0, -H / 2, 0, H / 2);
  g.addColorStop(0, '#23241D'); g.addColorStop(1, '#0D0E0A'); ctx.fillStyle = g; ctx.fillRect(-W / 2, -H / 2, W, H);
  const im = o.gambar; if (im) { if (o.potong) { const hh = o.tinggi ?? 470, hw = im.width * hh / im.height; ctx.drawImage(im, 300 - hw * .58, 205 - hh * .97, hw, hh); }
    else cover(ctx, im, -W / 2 + 380, -H / 2, 620, H); }
  const f = ctx.createLinearGradient(-W / 2, 0, -W / 2 + 620, 0); f.addColorStop(0, 'rgba(13,14,10,.92)'); f.addColorStop(.6, 'rgba(13,14,10,.55)'); f.addColorStop(1, 'rgba(13,14,10,0)');
  ctx.fillStyle = f; ctx.fillRect(-W / 2, -H / 2, 620, H);
  setFont(ctx, MN(17), 4); ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(241,239,230,.7)'; ctx.fillText(o.kanal ?? 'RELENTLESS NON-CONFORMIST', -450, -205);
  setFont(ctx, DSP(96), 2); ctx.fillStyle = '#F1EFE6'; (o.judul || ['JUDUL', 'VIDEO', 'BERIKUTNYA']).slice(0, 3).forEach((l, i) => ctx.fillText(l, -450, -40 + 100 * i));
  if (o.centang) { ctx.strokeStyle = '#F1EFE6'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; tick(ctx, 340, 150, 90, E.outCubic(inv(o.centang, o.centang + .35, t))); }
  ctx.restore(); ctx.strokeStyle = 'rgba(241,239,230,.25)'; ctx.lineWidth = 2; rr(ctx, -W / 2, -H / 2, W, H, 20); ctx.stroke();
}

// the next-video card flies in from the right with a turn and lands floating, a lime-square label above it and a queue bar below that fills ('MEMUAT…' → 'SEGERA TAYANG') · x, y = card centre (1000 × 562) · o.judul [≤3 lines] · o.kanal · o.gambar (o.potong = cut-out anchored bottom) · o.centang (time) · o.label · o.antri [start, end] · o.teks [loading, done] · asal: ai-data-habis penutup/src/film.js:228 (+:198 card)
export function kartuNext(ctx, x, y, t, t0, o = {}) {
  const kc = E.outQuint(inv(t0, t0 + .67, t)); if (kc <= 0) return; const a0 = ctx.globalAlpha, lift = (o.ayun ?? 6) * Math.sin((t - t0) * 1.3);
  ctx.save(); ctx.translate(x + 760 * (1 - kc), y + lift); ctx.rotate((1 - kc) * 7 * D2R); ctx.globalAlpha = a0 * clamp(2 * kc);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 30; ctx.fillStyle = '#0D0E0A'; rr(ctx, -500, -281, 1000, 562, 20); ctx.fill(); ctx.restore();
  kartu(ctx, t, o); ctx.fillStyle = LIME; ctx.fillRect(-500, -330, 13, 13); setFont(ctx, MN(20), 5); ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText(o.label ?? 'VIDEO BERIKUTNYA', -476, -318);
  const [q0, q1] = o.antri || [t0 + .6, t0 + 2.4], kp = E.inOutCubic(inv(q0, q1, t)); ctx.fillStyle = ivo(.18); ctx.fillRect(-500, 305, 1000, 6); ctx.fillStyle = INK; ctx.fillRect(-500, 305, 1000 * kp, 6);
  setFont(ctx, MN(18, 400), 3); ctx.textAlign = 'right'; ctx.fillStyle = ivo(.7); const tx = o.teks || ['MEMUAT…', 'SEGERA TAYANG']; ctx.fillText(kp < 1 ? tx[0] : tx[1], 500, 350);
  ctx.textAlign = 'left'; ctx.restore();
}

// the end-screen layout (screen space, 1920 × 1080 around x, y): a dark gradient from the left, a lime rule, the closing line (markLine triple or a falling string) with a serif sub, two marching-ants slots on the right where YouTube places its elements (the first may show the next card), and the subscribe pill · o.judul ['JAGA ', 'ISINYA', '.'] or 'VIDEO BERIKUTNYA' · o.sub · o.slot [label1, label2] · o.kartu {kartuNext options} · o.subscribe {options} or false · asal: ai-data-habis penutup/src/film.js:305 (variants: teknologi-indo-vs-as penutup:248, ai-bubble-dompet penutup:284)
export function endScreen(ctx, x, y, t, t0, o = {}) {
  const k = E.outCubic(inv(t0, t0 + 1.1, t)); if (k <= 0) return; const a0 = ctx.globalAlpha, L = x - 960;
  const g = ctx.createLinearGradient(L, 0, L + 1180, 0); g.addColorStop(0, `rgba(${BGRGB},.88)`); g.addColorStop(.62, `rgba(${BGRGB},.6)`); g.addColorStop(1, `rgba(${BGRGB},0)`);
  ctx.globalAlpha = a0 * k; ctx.fillStyle = g; ctx.fillRect(L, y - 540, 1180, 1080); ctx.globalAlpha = a0;
  const lab = o.slot || ['VIDEO BERIKUTNYA', 'PILIHAN UNTUKMU'];
  [[y - 210, t0 + .25], [y + 210, t0 + .55]].forEach(([sy, st], i) => { const q = E.outQuint(inv(st, st + .8, t)); if (q <= 0) return; const sc = lerp(.94, 1, q);
    ctx.save(); ctx.translate(x + 480, sy); ctx.scale(sc, sc); ctx.globalAlpha = a0 * q; ctx.fillStyle = `rgba(${BGRGB},.6)`; rr(ctx, -320, -180, 640, 360, 18); ctx.fill();
    if (i === 0 && o.kartu) { ctx.save(); rr(ctx, -320, -180, 640, 360, 18); ctx.clip(); ctx.scale(.64, .64); kartu(ctx, t, o.kartu === true ? {} : o.kartu); ctx.restore(); }
    ctx.setLineDash([14, 10]); ctx.lineDashOffset = -10 * (t - t0); ctx.strokeStyle = ivo(.36); ctx.lineWidth = 2; rr(ctx, -320, -180, 640, 360, 18); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = LIME; ctx.fillRect(-320, -212, 11, 11); setFont(ctx, MN(17), 4); ctx.fillStyle = ivo(.8); ctx.textAlign = 'left'; ctx.fillText(lab[i], -300, -202); ctx.restore(); });
  ctx.fillStyle = LIME; ctx.fillRect(x - 814, y - 210, 120 * kq(t, t0 + .1, .6), 6);
  const J = o.judul ?? ['JAGA ', 'ISINYA', '.'];
  if (Array.isArray(J)) markLine(ctx, J[0], J[1], J[2], x - 814, y - 60, t, t0 + .15, t0 + .55, DSP(140), { align: 'left', ls: 3 });
  else fall(ctx, J, x - 818, y - 70, t, t0 + .15, DSP(116), { ls: 3 });
  txt(ctx, o.sub ?? 'tulis yang asli, pakai bahasamu.', x - 810, y + 25, t, t0 + .6, SRF(50), { col: ivo(.9) });
  if (o.subscribe !== false) subscribe(ctx, x - 599, y + 244, t, t0 + .4, o.subscribe || {});
}

// the "intinya" recap board: a lime anchor bar across the top holding the one true line, a mono kicker, the big statement dropping in, a serif tail, and options hanging from the bar on ropes that swing and settle · centred on (x, y), fills ≈ 1640 × 960 · o.kicker · o.baris [2 lines] · o.ekor · o.jangkar [display, serif] · o.gantung [[label, dx, dy, freq]…] · o.tGantung (t0 + 1.2) · asal: ai-data-habis penutup/src/film.js:60
export function intinya(ctx, x, y, t, t0, o = {}) {
  if (t <= t0) return; const a0 = ctx.globalAlpha, BY = y - 430, [jA, jB] = o.jangkar || ['TULISAN MANUSIA', 'yang jujur.'], kb = E.outQuint(inv(t0 + .2, t0 + .6, t));
  if (kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(x - 820, BY - 50, 1640 * kb, 100); ctx.save(); ctx.beginPath(); ctx.rect(x - 820, BY - 50, 1640 * kb, 100); ctx.clip();
    fall(ctx, jA, x - 790, BY + 32, t, t0 + .3, DSP(86), { ls: 3, col: LIME_INK, drop: -40, stag: .02 });
    txt(ctx, jB, x + 790, BY + 26, t, t0 + .6, SRF(62), { align: 'right', col: LIME_INK }); ctx.restore(); }
  const kk = E.outQuint(inv(t0, t0 + .4, t)); ctx.globalAlpha = a0 * kk; ctx.fillStyle = LIME; ctx.fillRect(x - 820, y - 345, 13, 13); ctx.globalAlpha = a0;
  txt(ctx, o.kicker ?? 'INTINYA SIMPEL', x - 796, y - 332, t, t0, MN(22), { ls: 6, col: ivo(.78) });
  const B = o.baris || ['AI NGGAK', 'KEHABISAN']; fall(ctx, B[0], x - 824, y - 120, t, t0 + .5, DSP(170), { ls: 2 }); if (B[1]) fall(ctx, B[1], x - 824, y + 50, t, t0 + .75, DSP(170), { ls: 2 });
  txt(ctx, o.ekor ?? 'cara belajar.', x - 818, y + 168, t, t0 + 1.05, SRF(84), { col: ivo(.92) });
  const tg = o.tGantung ?? t0 + 1.2;
  (o.gantung || [['DATA SINTETIS', 40, -40, 1.7], ['BELAJAR SENDIRI', 360, 40, 1.35], ['DUNIA NYATA', 660, -90, 1.9]]).forEach(([s, dx, dy, f], i) => {
    const tb = tg + .06 * i, ks = E.outCubic(inv(tb, tb + .3, t)); if (ks <= 0) return; const L = dy + 430, u = t - tb;
    const th = (9 * Math.exp(-1.3 * u) * Math.sin(2 * Math.PI * f * u) - 4 * (1 - ks) * (i - 1)) * D2R;
    ctx.save(); ctx.translate(x + dx, BY); ctx.rotate(th); ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(0, 50 + (L - 70) * ks); ctx.stroke();
    ctx.fillStyle = LIME_INK; ctx.beginPath(); ctx.arc(0, 50, 7, 0, 7); ctx.fill(); slab(ctx, s, 0, L, t, tb + .13 + .07 * i, { size: 21, align: 'center' }); ctx.restore(); });
}
