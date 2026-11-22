// Shared vector props for chapters (link as src/draw.js -> ../../kit/draw.js). Everything draws in station-local units, centre-anchored.
import { clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, TILE, DISP, MONO, D2R, ivo, setFont, rnd, mk } from './kit.js';

export const kq = (t, t0, d = .5) => E.outQuint(inv(t0, t0 + d, t));
export const pop = (t, t0, z = .55, T = .32) => t <= t0 ? 0 : spring(t - t0, z, T);          // 0 → 1 with overshoot
// scale/alpha pop around (x, y): fn draws centred on 0,0
export function popAt(ctx, x, y, t, t0, fn, o = {}) {
  const k = pop(t, t0, o.z, o.T); if (k <= 0) return; const a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * (o.rise ?? 0)); ctx.rotate((o.rot || 0) * D2R); ctx.scale(lerp(o.from ?? .6, 1, k), lerp(o.from ?? .6, 1, k));
  ctx.globalAlpha = a0 * clamp((t - t0) / .1); fn(k); ctx.restore(); ctx.globalAlpha = a0;
}
// ivory document sheet with shadow, centred
export function doc(ctx, x, y, w, h, o = {}) {
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = o.blur ?? 50; ctx.shadowOffsetY = o.sy ?? 22;
  const g = ctx.createLinearGradient(x - w / 2, y - h / 2, x + w / 2, y + h / 2); g.addColorStop(0, o.c0 || '#FBFAF4'); g.addColorStop(1, o.c1 || '#E2DFD1');
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, o.r ?? 12); ctx.fill(); ctx.restore();
  ctx.strokeStyle = 'rgba(0,0,0,.14)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x - w / 2 + 1, y - h / 2 + 1, w - 2, h - 2, o.r ?? 12); ctx.stroke();
}
// a small patent/application card (w×h centred): tone 0 = ivory (local) … 1 = grey (foreign)
export function mini(ctx, x, y, w, h, tone = 0, o = {}) {
  const c = k => Math.round(lerp(k[0], k[1], tone)), a0 = ctx.globalAlpha;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 8;
  ctx.fillStyle = `rgb(${c([247, 108])},${c([245, 109])},${c([236, 101])})`; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, w * .07); ctx.fill(); ctx.restore();
  ctx.fillStyle = 'rgba(11,12,9,.75)'; ctx.fillRect(x - w * .36, y - h * .36, w * .34, h * .05);
  ctx.globalAlpha = a0 * .22; ctx.fillStyle = '#0B0C09'; for (let i = 0; i < 4; i++) ctx.fillRect(x - w * .36, y - h * .2 + i * h * .12, w * (i === 3 ? .4 : .72 - (i % 2) * .12), h * .05);
  ctx.globalAlpha = a0 * .4; ctx.lineWidth = Math.max(1.5, w * .025); ctx.strokeStyle = '#0B0C09'; ctx.beginPath(); ctx.arc(x + w * .24, y + h * .32, w * .1, 0, 7); ctx.stroke(); ctx.globalAlpha = a0;
  if (o.ring) { ctx.strokeStyle = LIME; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(x - w / 2 - 8, y - h / 2 - 8, w + 16, h + 16, w * .1); ctx.stroke(); }
}
export function bulb(ctx, r) {                              // line-art light bulb, centre of the glass at 0,0
  ctx.beginPath(); ctx.arc(0, -r * .25, r, Math.PI * .75, Math.PI * .25); ctx.lineTo(r * .42, r * .95); ctx.lineTo(-r * .42, r * .95); ctx.closePath(); ctx.stroke();
  for (const y of [1.14, 1.33]) { ctx.beginPath(); ctx.moveTo(-r * .36, r * y); ctx.lineTo(r * .36, r * y); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-r * .22, r * .95); ctx.lineTo(-r * .14, r * .05); ctx.lineTo(0, r * .38); ctx.lineTo(r * .14, r * .05); ctx.lineTo(r * .22, r * .95); ctx.stroke();
}
export function phone(ctx, w = 210, h = 420) {              // line-art phone with a lit screen
  ctx.fillStyle = TILE; ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 36); ctx.fill(); ctx.stroke();
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, ivo(.16)); g.addColorStop(1, ivo(.04)); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 26); ctx.fill();
  ctx.fillStyle = '#0B0C09'; ctx.beginPath(); ctx.roundRect(-30, -h / 2 + 24, 60, 16, 8); ctx.fill();
  ctx.fillStyle = ivo(.5); ctx.fillRect(-w / 2 + 30, -h / 2 + 70, w * .42, 10); ctx.fillStyle = ivo(.22); for (let i = 0; i < 4; i++) ctx.fillRect(-w / 2 + 30, -h / 2 + 100 + i * 26, w - 60 - (i % 2) * 34, 8);
  ctx.fillStyle = ivo(.14); ctx.beginPath(); ctx.roundRect(-w / 2 + 30, 40, w - 60, 110, 14); ctx.fill(); ctx.fillStyle = ivo(.6); ctx.fillRect(-34, h / 2 - 26, 68, 5);
}
export function apps(ctx, s = 92, g = 24) {                 // 3×3 app grid
  for (let i = 0; i < 9; i++) { const x = (i % 3 - 1) * (s + g), y = (Math.floor(i / 3) - 1) * (s + g);
    ctx.fillStyle = ivo(.12 + rnd(i + 3) * .5); ctx.beginPath(); ctx.roundRect(x - s / 2, y - s / 2, s, s, s * .24); ctx.fill();
    ctx.fillStyle = 'rgba(11,12,9,.45)'; ctx.beginPath(); if (i % 3 === 0) ctx.arc(x, y, s * .2, 0, 7); else if (i % 3 === 1) ctx.roundRect(x - s * .22, y - s * .22, s * .44, s * .44, 6); else { ctx.moveTo(x - s * .2, y + s * .2); ctx.lineTo(x, y - s * .22); ctx.lineTo(x + s * .2, y + s * .2); } ctx.fill(); }
}
export function chip(ctx, s = 250) {                        // line-art chip with pins and a die
  ctx.strokeStyle = IVORY; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const p = -s / 2 + s * (i + .5) / 8;
    for (const [x0, y0, x1, y1] of [[p, -s / 2, p, -s / 2 - 34], [p, s / 2, p, s / 2 + 34], [-s / 2, p, -s / 2 - 34, p], [s / 2, p, s / 2 + 34, p]]) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); } }
  ctx.fillStyle = TILE; ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2, s, s, 16); ctx.fill(); ctx.stroke();
  ctx.fillStyle = ivo(.14); ctx.beginPath(); ctx.roundRect(-s * .26, -s * .26, s * .52, s * .52, 8); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = ivo(.55); ctx.stroke();
  ctx.strokeStyle = ivo(.3); for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-s * .26, -s * .26 + s * .13 * i); ctx.lineTo(s * .26, -s * .26 + s * .13 * i); ctx.moveTo(-s * .26 + s * .13 * i, -s * .26); ctx.lineTo(-s * .26 + s * .13 * i, s * .26); ctx.stroke(); }
  ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(-s / 2 + 26, -s / 2 + 26, 6, 0, 7); ctx.fill();
}
export function coin(ctx, x, y, rx = 100, th = 20) {         // one coin seen from above-front, bottom centre of the top face at (x, y)
  const ry = rx * .3; ctx.fillStyle = '#7F7C6E'; ctx.beginPath(); ctx.ellipse(x, y + th, rx, ry, 0, 0, Math.PI); ctx.lineTo(x - rx, y); ctx.lineTo(x + rx, y); ctx.fill();
  const g = ctx.createLinearGradient(x - rx, y, x + rx, y); g.addColorStop(0, '#EDEAD9'); g.addColorStop(.6, '#D2CFBE'); g.addColorStop(1, '#A9A696');
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(11,12,9,.3)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, rx * .74, ry * .74, 0, 0, 7); ctx.stroke();
}
// a stack of n coins dropping in one by one from t0 (step s apart); base of the lowest coin at (x, y)
export function stack(ctx, x, y, n, t, t0, o = {}) {
  const th = o.th ?? 20, rx = o.rx ?? 100, a0 = ctx.globalAlpha;
  for (let i = 0; i < n; i++) { const s = t - t0 - i * (o.step ?? .07); if (s <= 0) break; ctx.globalAlpha = a0 * clamp(s / .08); coin(ctx, x, y - i * th - (1 - spring(s, .7, .26)) * 260, rx, th); }
  ctx.globalAlpha = a0;
}
// 100×100 dot city (1 dot = 100 people of a million) with `hot` researchers; returns { base, pts } for dotCity()
export function dotGrid(hot, seed = 1) {
  const [c, g] = mk(600, 600); g.fillStyle = ivo(.34); for (let y = 0; y < 100; y++) for (let x = 0; x < 100; x++) g.fillRect(x * 6 + 1.5, y * 6 + 1.5, 3, 3);
  const pts = [], used = new Set(); let i = 0; while (pts.length < hot) { const x = 6 + Math.floor(rnd(seed * 31 + i) * 88), y = 6 + Math.floor(rnd(seed * 57 + i * 1.7) * 88); i++; if (used.has(x * 100 + y)) continue; used.add(x * 100 + y); pts.push([x, y]); }
  return { base: c, pts };
}
export function dotCity(ctx, G, x, y, size, t, t0, tHot, o = {}) {
  const k = kq(t, t0, .7); if (k <= 0) return; const a0 = ctx.globalAlpha, u = size / 600;
  ctx.save(); ctx.beginPath(); ctx.rect(x - size / 2, y - size / 2, size, size * k); ctx.clip(); ctx.drawImage(G.base, x - size / 2, y - size / 2, size, size); ctx.restore();
  G.pts.forEach(([px, py], i) => { const s = t - tHot - i * (o.step ?? .02); if (s <= 0) return; const cx = x - size / 2 + (px * 6 + 3) * u, cy = y - size / 2 + (py * 6 + 3) * u, kk = spring(s, .5, .3);
    ctx.globalAlpha = a0 * clamp(1 - s / .9) * .8; ctx.strokeStyle = LIME; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cy, 6 + 46 * E.outCubic(clamp(s / .9)), 0, 7); ctx.stroke();
    ctx.globalAlpha = a0; ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(cx, cy, (o.r ?? 6.5) * kk, 0, 7); ctx.fill(); });
  ctx.globalAlpha = a0;
}
// lime block with dark display type that slams in (stamp); centred
export function stamp(ctx, text, x, y, t, t0, o = {}) {
  const s = t - t0; if (s <= 0) return; const k = spring(s, .5, .28), size = o.size || 160, a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot ?? -4) * D2R); ctx.scale(1 + (1 - Math.min(k, 1.2)) * 1.1, 1 + (1 - Math.min(k, 1.2)) * 1.1); ctx.globalAlpha = a0 * clamp(s / .07);
  setFont(ctx, `400 ${size}px "${DISP}"`, o.ls ?? 4); const tw = ctx.measureText(text).width; ctx.fillStyle = LIME; ctx.fillRect(-tw / 2 - size * .22, -size * .56, tw + size * .44, size * 1.08);
  ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText(text, 0, size * .36); ctx.textAlign = 'left'; ctx.restore(); ctx.globalAlpha = a0;
}
// rolling number (slot): value v drawn with the fractional part as a vertical slip, clipped to one line
export function slot(ctx, v, x, y, css, o = {}) {
  const n = Math.round(v), off = (v - n), size = parseFloat(/(\d+(\.\d+)?)px/.exec(css)[1]); setFont(ctx, css, o.ls || 0); ctx.textAlign = o.align || 'left'; ctx.fillStyle = o.col || IVORY;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 2000, y - size * .86, 4000, size * 1.02); ctx.clip(); const f = o.fmt || (q => (o.pre || '') + q);
  ctx.fillText(f(n), x, y - off * size * .9); if (Math.abs(off) > .02) ctx.fillText(f(n + Math.sign(off)), x, y - off * size * .9 + Math.sign(off) * size * .9); ctx.restore(); ctx.textAlign = 'left';
}
