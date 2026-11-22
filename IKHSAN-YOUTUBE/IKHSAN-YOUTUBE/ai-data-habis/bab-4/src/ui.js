// Bab 4 · small drawing helpers shared by the stations (fonts, filter compose, people, waves, meters, curves, glass text).
import { clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DISP, SER, MONO, rnd, mk } from './kit.js';

export const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
export const HND = (s, w = 600) => `${w} ${s}px "Caveat"`;
// add a filter on top of the DOF blur that onPlane set (never reset it to 'none' inside a station)
export const addF = (ctx, f) => { const f0 = ctx.filter; ctx.filter = (f0 === 'none' || !f0 ? '' : f0 + ' ') + f; return f0; };
export const zs = i => { const u = Math.max(1e-6, rnd(i * 2 + 1)), v = rnd(i * 2 + 2); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2832 * v); };  // normal sample
export const gpdf = z => Math.exp(-z * z / 2);

// a person pictogram added to the current path (feet at y, height s)
export function person(ctx, x, y, s) {
  ctx.moveTo(x + s * .17, y - s * .8); ctx.arc(x, y - s * .8, s * .17, 0, 7);
  ctx.moveTo(x - s * .3, y); ctx.lineTo(x - s * .3, y - s * .36); ctx.arc(x, y - s * .36, s * .3, Math.PI, 0); ctx.lineTo(x + s * .3, y); ctx.closePath();
}
// a voice waveform polyline across [x0, x1] (stroked by the caller): amp in px, seed picks the voice
export function wave(ctx, x0, x1, y, amp, t, seed, o = {}) {
  const n = o.n || 160, f1 = 2 + 3 * rnd(seed), f2 = 7 + 5 * rnd(seed + 1), f3 = 13 + 9 * rnd(seed + 2), sp = o.speed ?? 1.4;
  ctx.moveTo(x0, y);
  for (let i = 1; i <= n; i++) {
    const u = i / n, env = Math.sin(Math.PI * u) ** .6, ph = t * sp;
    const v = o.pure ? Math.sin(u * 6.2832 * 4 - ph * 3) : .55 * Math.sin(u * f1 * 6.28 + ph + seed) + .3 * Math.sin(u * f2 * 6.28 - ph * 1.7 + seed * 2) + .25 * Math.sin(u * f3 * 6.28 + ph * 2.3);
    ctx.lineTo(lerp(x0, x1, u), y + amp * env * v);
  }
}
// level meter: mono label, rail with ticks, ivory fill v (0..1)
export function meter(ctx, x, y, w, v, label, a = 1) {
  const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * a;
  setFont(ctx, MN(22), 4); ctx.fillStyle = ivo(.75); ctx.textAlign = 'left'; ctx.fillText(label, x, y - 30);
  ctx.fillStyle = ivo(.14); ctx.fillRect(x, y - 9, w, 18);
  ctx.beginPath(); for (let i = 0; i <= 10; i++) ctx.rect(x + w * i / 10 - 1, y + 14, 2, i % 5 ? 8 : 16); ctx.fillStyle = ivo(.4); ctx.fill();
  ctx.fillStyle = IVORY; ctx.fillRect(x, y - 9, w * clamp(v), 18);
  setFont(ctx, MN(22), 2); ctx.textAlign = 'right'; ctx.fillStyle = ivo(.85); ctx.fillText(`${Math.round(clamp(v) * 100)}%`, x + w, y - 30); ctx.textAlign = 'left';
  ctx.globalAlpha = a0;
}
// thin arrow from (x0,y0) to (x1,y1), drawn on by k
export function arrow(ctx, x0, y0, x1, y1, k = 1, col = ivo(.6), lw = 3) {
  if (k <= 0) return; const x = lerp(x0, x1, k), y = lerp(y0, y1, k), an = Math.atan2(y1 - y0, x1 - x0);
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y);
  ctx.moveTo(x - 14 * Math.cos(an - .45), y - 14 * Math.sin(an - .45)); ctx.lineTo(x, y); ctx.lineTo(x - 14 * Math.cos(an + .45), y - 14 * Math.sin(an + .45)); ctx.stroke();
}
// the lime ASLI tag (the only lime key word of the chapter), top-left corner at (x, y)
export function asliTag(ctx, x, y, s = 22) {
  setFont(ctx, MN(s), 3); const tw = ctx.measureText('ASLI').width + s * 1.3;
  ctx.fillStyle = LIME; ctx.fillRect(x, y, tw, 1.7 * s); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left'; ctx.fillText('ASLI', x + .65 * s, y + 1.2 * s);
}
// paper card with handwriting (for the copier chains): lines [[text, size]], title first
export function handCard(w, h, lines, o = {}) {
  const [C, c] = mk(w, h); c.fillStyle = o.bg || '#ECE4D0'; c.fillRect(0, 0, w, h);
  for (let i = 0; i < w * h / 520; i++) { c.fillStyle = `rgba(120,96,60,${.025 + .03 * rnd(i + 7 + (o.seed || 0))})`; c.fillRect(rnd(i + (o.seed || 0)) * w, rnd(i + 3) * h, 1 + 2 * rnd(i + 5), 1); }
  if (o.ruled !== false) { c.strokeStyle = 'rgba(120,150,190,.5)'; c.lineWidth = 2; for (let y = o.ruleY || 96; y < h - 16; y += o.rule || 46) { c.beginPath(); c.moveTo(18, y); c.lineTo(w - 18, y); c.stroke(); } }
  c.fillStyle = o.ink || '#1C2640'; c.textAlign = o.align || 'left';
  let y = o.y0 || 70;
  lines.forEach(([s, size, wt], i) => { c.font = `${wt || (i ? 600 : 700)} ${size}px "Caveat"`; c.save(); c.translate(o.align === 'center' ? w / 2 : (o.x0 || 34) + (i ? 6 : 0), y); c.rotate((rnd(i + 40 + (o.seed || 0)) - .5) * .02); c.fillText(s, 0, 0); c.restore(); y += (o.lh || size * 1.12); });
  return C;
}
