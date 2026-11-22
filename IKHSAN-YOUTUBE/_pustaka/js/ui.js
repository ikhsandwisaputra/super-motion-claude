// ui.js — the screens the viewer already knows, simulated (never screenshots): an arrow cursor that acts (glides, clicks, ripples),
// a browser window whose URL types itself and that can flip to its back, a pill button that squashes, an on/off toggle, a settings
// dialog with a verdict bar, chat bubbles, a social comment card, the comment compose box, a notification that changes its mind,
// and small comment chips for crowds.
// Pustaka kode Super Motion (aset/_pustaka) · in a chapter: import { browser, kursorJalan } from './pustaka/ui.js';
// Already in the kit: phone · apps (draw.js), typeOn · txt (kit.js); verdict discs check / cross live in dasar.js.
// Windows and cards are dark by default (the films' look) with their own fixed ivory text; o.terang gives the light version.
// UIF(size, weight) = Plus Jakarta Sans for app chrome (installed system-wide; falls back to system-ui) — display / serif / mono stay the kit's.
import { clamp, inv, lerp, E, INK, LIME, LIME_INK, CARD, CARD_INK, TILE, LIGHT, ivo, setFont, SRF, MN, DSP, rnd, fall } from '../kit.js';
import { pop } from '../draw.js';
import { check } from './dasar.js';

export const UIF = (s, w = 600) => `${w} ${s}px "Plus Jakarta Sans", system-ui, sans-serif`;
const sz = css => parseFloat(/(\d+(\.\d+)?)px/.exec(css)[1]);
const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const WIN = { gelap: { bg: '#14150F', bar: '#1D1E18', well: '#0D0E0A', card: '#1A1B15', trk: '#2A2B24', rgb: '241,239,230' },
  terang: { bg: '#F4F2EA', bar: '#E2DFD4', well: '#FFFFFF', card: '#F7F5EE', trk: '#D9D6CB', rgb: '17,18,14' } };
const pal = o => o.terang ? WIN.terang : WIN.gelap;
const ca = (P, a) => `rgba(${P.rgb},${a})`;
const PANAH = [[0, 0], [0, 34], [8, 26], [14, 39], [20, 36], [14, 23], [25, 23]];
const dip = (t, tk) => Math.sin(Math.PI * clamp((t - tk + .04) / .16));                 // 0 → 1 → 0 around a click
const blink = (t, t0) => Math.floor((t - t0) * 2.4) % 2 === 0;
const typed = (str, t, ts, cps) => str.slice(0, Math.max(0, Math.ceil((t - ts) * cps)));
const heart = (ctx, x, y, s) => { ctx.beginPath(); ctx.moveTo(x, y + s * .38); ctx.bezierCurveTo(x - s * .95, y - s * .2, x - s * .45, y - s * .9, x, y - s * .38);
  ctx.bezierCurveTo(x + s * .45, y - s * .9, x + s * .95, y - s * .2, x, y + s * .38); ctx.closePath(); };

// arrow pointer with its tip at (x, y): white, dark rim, soft drop shadow · o.s 1.5 · o.a 1 · o.tekan 0..1 (click dip, −12 %) · o.isi '#FFFFFF' · o.garis '#11120E' · asal: ai-data-habis penutup/src/film.js:191
export function kursor(ctx, x, y, o = {}) {
  const a = o.a ?? 1, s = (o.s ?? 1.5) * (1 - .12 * (o.tekan || 0)); if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; ctx.beginPath(); PANAH.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath();
  ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 5; ctx.fillStyle = o.isi || '#FFFFFF'; ctx.fill(); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = o.garis || '#11120E'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}

// the cursor as an actor: glides key to key (inOutCubic), dips on each click and leaves a lime ripple; returns { x, y } · keys [[time, x, y, klik]…] absolute + sorted · o.dur .7 (longest glide) · o.masuk (fade-in, default first key −.3) · o.keluar (fade-out time) · o.s · o.riak false · o.col · asal: ai-data-habis penutup/src/film.js:296 · ledger: cursor-as-actor
export function kursorJalan(ctx, keys, t, o = {}) {
  let x = keys[0][1], y = keys[0][2], tekan = 0;
  for (let i = 1; i < keys.length; i++) { const [tk, kx, ky] = keys[i], d = Math.min(o.dur ?? .7, (tk - keys[i - 1][0]) * .85), k = E.inOutCubic(inv(tk - d, tk, t)); x = lerp(x, kx, k); y = lerp(y, ky, k); }
  const a = clamp((t - (o.masuk ?? keys[0][0] - .3)) / .2) * (o.keluar !== undefined ? 1 - E.inOutCubic(inv(o.keluar, o.keluar + .3, t)) : 1);
  if (a <= 0) return { x, y }; const a0 = ctx.globalAlpha;
  for (const [tk, kx, ky, klik] of keys) { if (!klik) continue; tekan = Math.max(tekan, dip(t, tk)); const u = inv(tk, tk + .5, t);
    if (o.riak !== false && u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = a0 * a * (1 - u) * .85; ctx.strokeStyle = o.col || LIME; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(kx, ky, 8 + 50 * E.outCubic(u), 0, 7); ctx.stroke(); ctx.restore(); } }
  kursor(ctx, x, y, { s: o.s, a, tekan }); return { x, y };
}

// a browser window: three dots, an address bar whose URL types itself with a caret, then code lines typed in (hot lines bright) or your own page; o.balik = time it flips like a card to o.belakang · w 1120 · h 640 · o.url · o.baris [[text, hot]…] · o.isi(ctx, w, h, t) (window-centred, clipped below the bar) · o.belakang(ctx, w, h, t) · o.cps 22 · o.terang · asal: ai-data-habis bab-2/src/film.js:126 · ledger: ui-sim-kit
export function browser(ctx, x, y, w, h, t, t0, o = {}) {
  const k = pop(t, t0, .6, .32); if (k <= 0) return; const P = pal(o), a0 = ctx.globalAlpha, L = -w / 2, T = -h / 2, R = 22;
  const fl = o.balik !== undefined ? E.inOutCubic(inv(o.balik, o.balik + .6, t)) : 0, cw = Math.cos(Math.PI * fl), s = lerp(.9, 1, Math.min(k, 1.04));
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 40); ctx.scale(s * Math.max(.002, Math.abs(cw)), s); ctx.globalAlpha = a0 * clamp((t - t0) / .15);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 24; ctx.fillStyle = P.bg; rr(ctx, L, T, w, h, R); ctx.fill(); ctx.restore();
  ctx.save(); rr(ctx, L, T, w, h, R); ctx.clip();
  if (cw < 0) { if (o.belakang) o.belakang(ctx, w, h, t); }
  else {
    ctx.fillStyle = P.bar; ctx.fillRect(L, T, w, 84); ctx.fillStyle = ca(P, .35);
    for (let d = 0; d < 3; d++) { ctx.beginPath(); ctx.arc(L + 40 + 30 * d, T + 42, 8, 0, 7); ctx.fill(); }
    ctx.fillStyle = P.well; rr(ctx, L + 150, T + 20, w - 220, 44, 22); ctx.fill();
    const url = o.url ?? 'situsmu.id/robots.txt', cps = o.cps ?? 22, tu = t0 + .35, su = typed(url, t, tu, cps);
    setFont(ctx, MN(24, 400), 0); ctx.textAlign = 'left'; ctx.fillStyle = ca(P, .9); ctx.fillText(su, L + 180, T + 51);
    if ((t > tu && su.length < url.length) || blink(t, t0)) { ctx.fillStyle = ca(P, 1); ctx.fillRect(L + 182 + ctx.measureText(su).width, T + 28, 3, 28); }
    if (o.isi) { ctx.save(); ctx.beginPath(); ctx.rect(L, T + 84, w, h - 84); ctx.clip(); o.isi(ctx, w, h, t); ctx.restore(); }
    else { const tl = tu + url.length / cps + .25;
      (o.baris || []).forEach(([str, hot], i) => { const ti = tl + i * (o.jeda ?? .3); if (t <= ti) return; setFont(ctx, MN(o.ukuran ?? 40, hot ? 700 : 400), 0);
        ctx.fillStyle = hot ? ca(P, 1) : ca(P, .6); ctx.fillText(typed(str, t, ti, 30), L + 60, T + 170 + 70 * i); }); }
  }
  if (fl > 0 && fl < 1) { ctx.fillStyle = `rgba(0,0,0,${(.4 * (1 - Math.abs(cw))).toFixed(3)})`; ctx.fillRect(L, T, w, h); }
  ctx.restore(); ctx.strokeStyle = ca(P, .28); ctx.lineWidth = 2; rr(ctx, L, T, w, h, R); ctx.stroke(); ctx.restore();
}

// a pill button that springs in and squashes when pressed (o.tekan = press time); o.lime (true or a time) turns it to the accent · label · o.w 420 · o.h 96 · o.font MN(28) · o.ls 4 · o.isi CARD · o.tinta CARD_INK · asal: ai-data-habis bab-2/src/film.js:259
export function tombol(ctx, x, y, label, t, t0, o = {}) {
  const k = pop(t, t0, .55, .3); if (k <= 0) return; const w = o.w ?? 420, h = o.h ?? 96, a0 = ctx.globalAlpha, tp = o.tekan, ls = o.ls ?? 4;
  const sq = tp !== undefined && t >= tp ? 1 - .06 * Math.exp(-14 * (t - tp)) : 1, on = o.lime === true || (typeof o.lime === 'number' && t >= o.lime), s = lerp(.7, 1, Math.min(k, 1.05)) * sq;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a0 * clamp((t - t0) / .1);
  ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; ctx.fillStyle = on ? LIME : (o.isi || CARD); rr(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill(); ctx.shadowColor = 'transparent';
  setFont(ctx, o.font || MN(28), ls); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = on ? LIME_INK : (o.tinta || CARD_INK); ctx.fillText(label, ls / 2, 2);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.restore();
}

// an on/off toggle: the knob springs across at o.ubah and the track turns lime; a ring pulses out once to point at it · o.awal false (starts off) · o.label ['MATI', 'NYALA'] · o.w 150 · o.h 76 · o.riak (ring time, default t0 + .3; false = none) · o.terang · asal: ai-data-habis bab-2/src/film.js:259
export function saklar(ctx, x, y, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + .35, t)); if (k <= 0) return; const P = pal(o), w = o.w ?? 150, h = o.h ?? 76, a0 = ctx.globalAlpha, r = h / 2 - 10, lab = o.label || ['MATI', 'NYALA'];
  const ks = o.ubah !== undefined ? pop(t, o.ubah, .6, .22) : 0, pos = o.awal ? 1 - ks : ks, on = pos > .5;
  const tr = o.riak === false ? -1 : o.riak ?? t0 + .3, u = tr < 0 ? -1 : inv(tr, tr + 1.2, t);
  ctx.save(); ctx.translate(x, y); ctx.scale(lerp(.8, 1, k), lerp(.8, 1, k)); ctx.globalAlpha = a0 * k;
  if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = a0 * k * (1 - u) * .8; ctx.strokeStyle = LIME; ctx.lineWidth = 3; const g = 48 * E.outCubic(u); rr(ctx, -w / 2 - g, -h / 2 - g, w + 2 * g, h + 2 * g, h / 2 + g); ctx.stroke(); ctx.restore(); }
  ctx.fillStyle = on ? LIME : P.trk; rr(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill(); if (!on) { ctx.strokeStyle = ca(P, .5); ctx.lineWidth = 2; ctx.stroke(); }
  const kx = lerp(-w / 2 + h / 2, w / 2 - h / 2, pos), avail = w - h - 14, str = on ? lab[1] : lab[0]; let fs = o.fs ?? 20;
  setFont(ctx, MN(fs), 2); const mw = ctx.measureText(str).width; if (mw > avail) { fs *= avail / mw; setFont(ctx, MN(fs), 2); }
  ctx.textAlign = on ? 'left' : 'right'; ctx.fillStyle = on ? LIME_INK : ca(P, .7); ctx.fillText(str, on ? -w / 2 + 14 : w / 2 - 12, fs * .36);
  ctx.fillStyle = on ? LIME_INK : ca(P, .8); ctx.beginPath(); ctx.arc(kx, 0, r, 0, 7); ctx.fill(); ctx.textAlign = 'left'; ctx.restore();
}

// a settings dialog: mono header typed on, a hairline, a serif question with a toggle beside it, then a mono caption and a lime verdict bar whose words drop in · w 880 · h 600 · o.judul · o.tanya [lines] · o.saklar {saklar options} or false · o.cap · o.putusan · o.tPutusan (t0 + 1.3) · o.isi(ctx, w, h, t) · o.terang · asal: ai-data-habis bab-2/src/film.js:259 · ledger: ui-sim-kit
export function dialog(ctx, x, y, w, h, t, t0, o = {}) {
  const k = pop(t, t0, .6, .32); if (k <= 0) return; const P = pal(o), a0 = ctx.globalAlpha, L = -w / 2, T = -h / 2, tP = o.tPutusan ?? t0 + 1.3;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 30); ctx.scale(lerp(.9, 1, Math.min(k, 1.04)), lerp(.9, 1, Math.min(k, 1.04))); ctx.globalAlpha = a0 * clamp((t - t0) / .12);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 28; ctx.fillStyle = P.bg; rr(ctx, L, T, w, h, 26); ctx.fill(); ctx.restore();
  ctx.strokeStyle = ca(P, .25); ctx.lineWidth = 2; rr(ctx, L, T, w, h, 26); ctx.stroke();
  setFont(ctx, MN(22), 2); ctx.textAlign = 'left'; ctx.fillStyle = ca(P, .7); ctx.fillText(typed(o.judul ?? 'PENGATURAN SITUS', t, t0 + .25, 45), L + 50, T + 70);
  ctx.fillStyle = ca(P, .15); ctx.fillRect(L + 50, T + 98, (w - 100) * E.outQuint(inv(t0 + .3, t0 + .8, t)), 2);
  setFont(ctx, SRF(56), 0); (o.tanya || ['Izinkan robot AI', 'membaca situsmu?']).forEach((l, i) => { const kk = E.outQuint(inv(t0 + .45 + .1 * i, t0 + .95 + .1 * i, t));
    if (kk > 0) { ctx.globalAlpha = a0 * kk; ctx.fillStyle = ca(P, .95); ctx.fillText(l, L + 50, T + 200 + 64 * i + (1 - kk) * 20); } });
  ctx.globalAlpha = a0;
  if (o.saklar !== false) saklar(ctx, w / 2 - 135, T + 228, t, t0 + .7, { terang: o.terang, ...(o.saklar || {}) });
  if (o.isi) o.isi(ctx, w, h, t);
  if (o.putusan !== false) { const kb = E.outQuint(inv(tP, tP + .4, t)), BY = T + 400, bw = Math.min(620, w - 100);
    if (t > tP - .3) { ctx.globalAlpha = a0 * E.outCubic(inv(tP - .3, tP, t)); setFont(ctx, MN(22), 4); ctx.fillStyle = ca(P, .6); ctx.fillText(o.cap ?? 'SETELAN BAWAAN', L + 50, BY - 22); ctx.globalAlpha = a0; }
    if (kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(L + 50, BY, bw * kb, 100); ctx.save(); ctx.beginPath(); ctx.rect(L + 50, BY, bw * kb, 100); ctx.clip();
      fall(ctx, o.putusan ?? 'ROBOT AI DILARANG', L + 74, BY + 83, t, tP + .1, DSP(92), { ls: 2, col: LIME_INK, drop: -40, stag: .02 }); ctx.restore(); } }
  ctx.restore();
}

// a chat bubble that springs up from its tail, with a small sender / language tag above it; x = the bubble's outer edge (right; left with o.kiri) · text · o.tag · o.font SRF(40) · o.isi CARD · o.tinta CARD_INK · returns its width · asal: teknologi-indo-vs-as bab-2/src/film.js:76
export function gelembungChat(ctx, x, y, text, t, t0, o = {}) {
  const k = pop(t, t0, .6, .3); if (k <= 0) return 0; const css = o.font || SRF(40), q = sz(css) / 40, a0 = ctx.globalAlpha, sg = o.kiri ? -1 : 1;
  setFont(ctx, css, 0); const w = ctx.measureText(text).width + 64 * q, s = lerp(.7, 1, Math.min(k, 1.05));
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 40); ctx.scale(s, s); ctx.globalAlpha = a0 * clamp((t - t0) / .12); ctx.fillStyle = o.isi || CARD;
  rr(ctx, o.kiri ? 0 : -w, -40 * q, w, 80 * q, 34 * q); ctx.fill(); ctx.beginPath(); ctx.moveTo(-26 * q * sg, 30 * q); ctx.lineTo(8 * q * sg, 46 * q); ctx.lineTo(-8 * q * sg, 18 * q); ctx.fill();
  ctx.fillStyle = o.tinta || CARD_INK; ctx.textAlign = 'left'; ctx.fillText(text, (o.kiri ? 0 : -w) + 32 * q, 14 * q);
  if (o.tag) { setFont(ctx, MN(16), 4); ctx.fillStyle = ivo(.6); ctx.textAlign = o.kiri ? 'left' : 'right'; ctx.fillText(o.tag, 0, -54 * q); ctx.textAlign = 'left'; }
  ctx.restore(); return w;
}

// a social comment card: avatar with initials, handle and time, the comment typed in serif, then a like / reply / share row; o.suka = time the heart fills lime and the count ticks up · o.nama '@kamu' · o.inisial 'KM' · o.waktu '3 mnt' · o.baris [lines] · o.jumlah 38 · o.w 860 · o.terang · asal: ai-data-habis bab-2/src/film.js:443
export function komentar(ctx, x, y, t, t0, o = {}) {
  const k = pop(t, t0, .6, .32); if (k <= 0) return; const P = pal(o), a0 = ctx.globalAlpha, lines = o.baris || ['AI-nya pintar,', 'tapi tulisannya dari kita juga.'];
  const w = o.w ?? 860, h = 300 + 54 * Math.max(0, lines.length - 2), L = -w / 2, T = -h / 2, s = lerp(.8, 1, Math.min(k, 1.04));
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 60); ctx.scale(s, s); ctx.globalAlpha = a0 * clamp((t - t0) / .12);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = P.card; rr(ctx, L, T, w, h, 26); ctx.fill(); ctx.restore();
  ctx.strokeStyle = ca(P, .22); ctx.lineWidth = 2; rr(ctx, L, T, w, h, 26); ctx.stroke();
  ctx.fillStyle = ca(P, .8); ctx.beginPath(); ctx.arc(L + 60, T + 60, 30, 0, 7); ctx.fill();
  setFont(ctx, MN(20), 0); ctx.textAlign = 'center'; ctx.fillStyle = P.bg; ctx.fillText(o.inisial ?? 'KM', L + 60, T + 67); ctx.textAlign = 'left';
  setFont(ctx, MN(22), 0); ctx.fillStyle = ca(P, 1); const nm = o.nama ?? '@kamu'; ctx.fillText(nm, L + 110, T + 54); const xw = L + 110 + ctx.measureText(nm).width + 16;
  setFont(ctx, MN(18, 400), 0); ctx.fillStyle = ca(P, .55); ctx.fillText('· ' + (o.waktu ?? '3 mnt'), xw, T + 54);
  setFont(ctx, SRF(40), 0); ctx.fillStyle = ca(P, .95); let ts = t0 + .35;
  lines.forEach((l, i) => { ctx.fillText(typed(l, t, ts, 45), L + 110, T + 120 + 54 * i); ts += l.length / 45 + .15; });
  const ka = E.outCubic(inv(ts, ts + .3, t)); if (ka > 0) { const yA = T + h - 40, liked = o.suka !== undefined && t >= o.suka, kp = liked ? pop(t, o.suka, .45, .25) : 0;
    ctx.globalAlpha = a0 * ka; ctx.save(); ctx.translate(L + 122, yA - 7); const hs = liked ? lerp(1.5, 1, Math.min(1, kp)) : 1; ctx.scale(hs, hs);
    heart(ctx, 0, 0, 22); if (liked) { ctx.fillStyle = LIME; ctx.fill(); } else { ctx.strokeStyle = ca(P, .55); ctx.lineWidth = 2.5; ctx.stroke(); } ctx.restore();
    setFont(ctx, MN(18, 400), 2); ctx.fillStyle = ca(P, .55); const n = (o.jumlah ?? 38) + (liked ? 1 : 0); ctx.fillText(String(n), L + 146, yA);
    ctx.fillText('BALAS', L + 260, yA); ctx.fillText('BAGIKAN', L + 380, yA); }
  ctx.restore();
}

// the comment compose box (YouTube-like): header and sort label, avatar, placeholder, the focus line growing from the centre, the comment typed with a lime caret, then 'Batal' + a button that lights up when there is text · centred on (x, y), spans ≈ 1360 × 400 · o.baris [lines] · o.fokus (t0 + .6) · o.cps [30, 34] · o.judul · o.urut · o.tombol 'Komentari' · o.font UIF · asal: ai-data-habis penutup/src/film.js:158
export function kotakKomentar(ctx, x, y, t, t0, o = {}) {
  if (t <= t0) return; const F = o.font || UIF, a0 = ctx.globalAlpha, X = x - 560, R1 = y - 30, R2 = y + 56, tf = o.fokus ?? t0 + .6, cps = o.cps || [30, 34];
  const lines = o.baris || ['Menurutku yang harus dikejar duluan:', 'riset dasar, baru alatnya.'], kh = E.outQuint(inv(t0, t0 + .45, t));
  ctx.globalAlpha = a0 * kh; setFont(ctx, F(36, 700), 0); ctx.textAlign = 'left'; ctx.fillStyle = INK; ctx.fillText(o.judul ?? 'Komentar', x - 680, y - 150 + (1 - kh) * 20);
  setFont(ctx, MN(18, 400), 3); ctx.fillStyle = ivo(.55); ctx.fillText(o.urut ?? 'URUTKAN: TERBARU', x - 470, y - 152 + (1 - kh) * 20);
  const kv = pop(t, t0 + .15, .55, .3); if (kv > 0) { ctx.save(); ctx.translate(x - 640, R1 - 14); ctx.scale(Math.min(1.08, kv), Math.min(1.08, kv)); ctx.globalAlpha = a0 * clamp((t - t0 - .15) / .1);
    ctx.fillStyle = ivo(.16); ctx.beginPath(); ctx.arc(0, 0, 42, 0, 7); ctx.fill(); ctx.clip(); ctx.fillStyle = ivo(.55); ctx.beginPath(); ctx.arc(0, -12, 14, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 26, 26, 18, 0, 0, 7); ctx.fill(); ctx.restore(); }
  const kl = E.outCubic(inv(t0 + .25, t0 + .6, t)); ctx.globalAlpha = a0 * kl; ctx.fillStyle = ivo(.3); ctx.fillRect(X, R2 + 44, 1240, 2);
  const kf = E.outCubic(inv(tf, tf + .35, t)); if (kf > 0) { ctx.fillStyle = INK; ctx.fillRect(X + 620 - 620 * kf, R2 + 43, 1240 * kf, 3); }
  const tk = tf + .2, tk2 = tk + lines[0].length / cps[0] + .15, typing = t > tk && t < tk2 + (lines[1] || '').length / cps[1];
  if (t < tk + .05) { setFont(ctx, F(44, 500), 0); ctx.fillStyle = ivo(.45); ctx.globalAlpha = a0 * kl * (1 - E.outCubic(inv(tf, tk, t))); ctx.fillText(o.kosong ?? 'Tambahkan komentar…', X, R1); }
  ctx.globalAlpha = a0; setFont(ctx, F(44, 500), 0); ctx.fillStyle = INK; const s1 = typed(lines[0], t, tk, cps[0]), s2 = lines[1] ? typed(lines[1], t, tk2, cps[1]) : '';
  ctx.fillText(s1, X, R1); if (s2) ctx.fillText(s2, X, R2);
  if (kf > 0 && (typing || blink(t, t0))) { const cx = X + 4 + ctx.measureText(s2 || s1).width, cy = s2 ? R2 : R1; ctx.fillStyle = LIME; ctx.fillRect(cx, cy - 40, 4, 50); }
  const done = tk2 + (lines[1] || '').length / cps[1], on = t >= done, kb = E.outCubic(inv(t0 + .35, t0 + .7, t));
  if (kb > 0) { ctx.globalAlpha = a0 * kb; setFont(ctx, F(30, 600), 0); ctx.fillStyle = ivo(.8); ctx.fillText('Batal', x + 380, R2 + 128);
    const pr = on ? 1 - .05 * Math.sin(Math.PI * clamp((t - done) / .2)) : 1; ctx.save(); ctx.translate(x + 570, R2 + 118); ctx.scale(pr, pr);
    ctx.fillStyle = on ? CARD : ivo(.12); rr(ctx, -110, -32, 220, 64, 32); ctx.fill(); setFont(ctx, F(28, 700), 0); ctx.textAlign = 'center'; ctx.fillStyle = on ? CARD_INK : ivo(.4);
    ctx.fillText(o.tombol ?? 'Komentari', 0, 10); ctx.restore(); ctx.textAlign = 'left'; }
  ctx.globalAlpha = a0;
}

const NT = { g0: '#F1EFE6', g1: '#E6E3DA', ikon: '#11120E', glyph: LIME, app: '#4A4A45', waktu: '#7A7A72', judul: '#11120E', isi: '#3A3A35', jalur: '#D3D0C6', cap: '#6A6A62' };
const NR = { g0: '#5E5E58', g1: '#575752', ikon: '#6E6E68', glyph: '#A4A39B', app: '#A4A39B', waktu: '#8A8A82', judul: '#DCDAD0', isi: '#C4C2B8', jalur: '#6E6E68', cap: '#A4A39B' };
function roll(ctx, a, b, x, y, k, size, d = 46) {                                  // a slides up and out, b rises in, clipped to the line
  const a0 = ctx.globalAlpha; ctx.save(); ctx.beginPath(); ctx.rect(x - 2000, y - size * 1.05, 4000, size * 1.4); ctx.clip();
  if (k < 1) { ctx.globalAlpha = a0 * (1 - k); ctx.fillText(a, x, y - d * k); } if (k > 0 && b !== undefined) { ctx.globalAlpha = a0 * k; ctx.fillText(b, x, y + d * (1 - k)); } ctx.restore();
}
// a phone-style notification card that drops in: app icon, app name, time, bold title, body, optional progress bar; o.ganti {t, judul, waktu, isi} rolls it to new news (old title struck first), o.centang pops a lime check with a ripple · x, y = card centre · o.w 1320 · o.app · o.waktu · o.judul · o.isi · o.progres [from, to] + o.tProgres + o.ket · o.ikon(ctx, s) · o.redup (grey back card) · o.font UIF · asal: ai-data-habis penutup/src/film.js:240
export function notif(ctx, x, y, t, t0, o = {}) {
  const k = pop(t, t0, .62, .34); if (k <= 0) return; const a0 = ctx.globalAlpha, w = o.w ?? 1320, F = o.font || UIF, C = o.redup ? NR : NT, g = o.ganti;
  const kg = g ? E.outQuint(inv(g.t, g.t + .3, t)) : 0, isiA = [].concat(o.isi ?? []), isiB = g && g.isi !== undefined ? [].concat(g.isi) : isiA, nB = Math.max(isiA.length, isiB.length);
  const TY = 236, BY0 = TY + 66, last = nB ? BY0 + 52 * (nB - 1) : TY, PY = last + 48, h = o.progres ? PY + 96 : last + 60, L = -w / 2, T = -h / 2;
  ctx.save(); ctx.translate(x, y - (1 - Math.min(1, k)) * 300); ctx.globalAlpha = a0 * clamp((t - t0) / .12);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 26; const gr = ctx.createLinearGradient(0, T, 0, T + h); gr.addColorStop(0, C.g0); gr.addColorStop(1, C.g1);
  ctx.fillStyle = gr; rr(ctx, L, T, w, h, 48); ctx.fill(); ctx.restore();
  ctx.fillStyle = C.ikon; rr(ctx, L + 56, T + 50, 92, 92, 20); ctx.fill(); ctx.save(); ctx.translate(L + 102, T + 96);
  if (o.ikon) o.ikon(ctx, 92); else { ctx.strokeStyle = C.glyph; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.arc(0, 0, 26, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, 11, 26, 0, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.stroke(); } ctx.restore();
  setFont(ctx, F(34, 700), 5); ctx.textAlign = 'left'; ctx.fillStyle = C.app; ctx.fillText(o.app ?? 'INTERNET', L + 176, T + 108);
  setFont(ctx, F(30, 400), 0); ctx.textAlign = 'right'; ctx.fillStyle = C.waktu; roll(ctx, o.waktu ?? 'sekarang', g && g.waktu, L + w - 56, T + 108, g && g.waktu ? kg : 0, 30, 34); ctx.textAlign = 'left';
  setFont(ctx, F(64, 800), 0); ctx.fillStyle = C.judul; const jA = o.judul ?? 'Kuota data hampir habis', jw = ctx.measureText(jA).width;
  roll(ctx, jA, g && g.judul, L + 56, T + TY, g && g.judul ? kg : 0, 64);
  if (g && g.judul) { const ks = E.outCubic(inv(g.t - .4, g.t - .12, t)); if (ks > 0 && kg < 1) { ctx.globalAlpha = a0 * (1 - kg); ctx.fillRect(L + 52, T + TY - 22, (jw + 8) * ks, 5); ctx.globalAlpha = a0; } }
  setFont(ctx, F(38, 400), 0); ctx.fillStyle = C.isi; for (let i = 0; i < nB; i++) roll(ctx, isiA[i] ?? '', isiB[i], L + 56, T + BY0 + 52 * i, isiB !== isiA ? kg : 0, 38, 40);
  if (o.progres) { const [p0, p1] = o.progres, tp = o.tProgres ?? t0 + .5, kp = E.inOutCubic(inv(tp, tp + .9, t)), bw = w - 112, p = lerp(p0, p1, kp);
    ctx.fillStyle = C.jalur; rr(ctx, L + 56, T + PY, bw, 22, 11); ctx.fill(); ctx.save(); rr(ctx, L + 56, T + PY, bw, 22, 11); ctx.clip();
    ctx.fillStyle = C.ikon; ctx.fillRect(L + 56, T + PY, bw * Math.min(p0, p), 22); if (p > p0) { ctx.fillStyle = o.redup ? C.glyph : LIME; ctx.fillRect(L + 56 + bw * p0, T + PY, bw * (p - p0), 22); } ctx.restore();
    setFont(ctx, F(28, 600), 0); ctx.fillStyle = C.cap; ctx.fillText(o.ket ?? 'sisa kuota', L + 56, T + PY + 66); ctx.textAlign = 'right'; ctx.fillStyle = C.judul;
    setFont(ctx, F(28, 700), 0); ctx.fillText(`${Math.round(p * 100)} %`, L + w - 56, T + PY + 66); ctx.textAlign = 'left'; }
  if (o.centang !== undefined && t > o.centang) { const cx = L + w - 96, cy = T + TY - 22, u = inv(o.centang + .1, o.centang + .7, t);
    if (u > 0 && u < 1) { ctx.save(); ctx.globalAlpha = a0 * (1 - u) * .8; ctx.strokeStyle = LIME; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, 40 + 46 * E.outCubic(u), 0, 7); ctx.stroke(); ctx.restore(); }
    check(ctx, cx, cy, 40, t, o.centang); }
  ctx.restore();
}

// a small comment chip (avatar dot + two text bars) for crowds of reactions; springs in · o.s 1 · o.rot (deg) · o.seed (bar lengths) · o.isi (tile colour) · asal: ai-bubble-dompet penutup/src/film.js:78
export function miniKomentar(ctx, x, y, t, t0, o = {}) {
  const k = pop(t, t0, .55, .3); if (k <= 0) return; const s = (o.s ?? 1) * lerp(.6, 1, Math.min(k, 1.06)), i = o.seed ?? 1, a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 30); ctx.rotate((o.rot || 0) * Math.PI / 180); ctx.scale(s, s); ctx.globalAlpha = a0 * clamp((t - t0) / .1);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10; ctx.fillStyle = o.isi || (LIGHT ? '#F7F5EE' : TILE); rr(ctx, -95, -40, 190, 80, 14); ctx.fill(); ctx.restore();
  ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; rr(ctx, -95, -40, 190, 80, 14); ctx.stroke();
  ctx.fillStyle = ivo(.45); ctx.beginPath(); ctx.arc(-62, -6, 16, 0, 7); ctx.fill();
  ctx.fillStyle = ivo(.55); ctx.fillRect(-36, -16, 80 + 30 * rnd(i + 5), 9); ctx.fillStyle = ivo(.28); ctx.fillRect(-36, 4, 60 + 50 * rnd(i + 9), 9); ctx.restore();
}
