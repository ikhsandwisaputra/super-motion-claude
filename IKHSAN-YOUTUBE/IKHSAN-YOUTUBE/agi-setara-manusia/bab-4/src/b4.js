// Bab 04 helpers (chapter-local): Penggaris Tiga Vendor lanes, kitchen props, extruded blocks, keyframed station camera.
import { clamp, inv, lerp, E, spring, IVORY, LIME, TILE, ivo, setFont, MN, DSP, fmt, fall, countTo, mk } from './kit.js';
import { ruler, needle, springSp } from './agi.js';

// keyframed station camera: keys = [[t, {yaw, dist, ty, tx, pitch, foc}] …] (ty/tx offsets from the station), inOutCubic between keys
export function camKF(S, keys) {
  return t => {
    let i = 0; while (i < keys.length - 1 && t >= keys[i + 1][0]) i++;
    const [t0, a] = keys[i], [t1, b] = keys[Math.min(i + 1, keys.length - 1)], u = t1 > t0 ? E.inOutCubic(inv(t0, t1, t)) : 0;
    const g = k => lerp(a[k] ?? 0, b[k] ?? a[k] ?? 0, u);
    return { yaw: g('yaw'), dist: g('dist'), tx: S.x + g('tx'), ty: S.py - 20 + g('ty'), tz: S.z, pitch: a.pitch === undefined ? 6 : g('pitch') };
  };
}

// grey copy of a blue chart so the lime highlighter stays the only colour
export function grey(im) { const [c, g] = mk(im.width, im.height); g.filter = 'grayscale(1) contrast(1.12) brightness(1.04)'; g.drawImage(im, 0, 0); return c; }

// one lane of the elastic ruler: the model card (never changes), the standard ruler, the vendor clamp that springs the ruler shorter
// L = { y, name, maker, clampTxt, std, ven, tCard, tRuler, tNeedle, tKick }, X0 = zero of every ruler, SP = px per point on the standard ruler
export function lane(ctx, t, L, X0, SP) {
  const a0 = ctx.globalAlpha, y = L.y, len = L.std * SP;
  const ka = clamp((t - L.tCard) / .12); if (ka <= 0) return;
  const kb = spring(t - L.tCard, .62, .42);
  ctx.save(); ctx.globalAlpha = a0 * ka; ctx.translate(X0, y - 66); ctx.scale(.86 + .14 * kb, .86 + .14 * kb); ctx.translate(-X0, -(y - 66));
  ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; ctx.fillStyle = TILE;
  ctx.beginPath(); ctx.roundRect(X0, y - 116, len, 96, 16); ctx.fill(); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = ivo(.28); ctx.lineWidth = 1.5; ctx.strokeRect(X0 + 18, y - 100, 64, 64); ctx.beginPath();     // die grid
  for (let i = 1; i < 4; i++) { ctx.moveTo(X0 + 18 + 16 * i, y - 100); ctx.lineTo(X0 + 18 + 16 * i, y - 36); ctx.moveTo(X0 + 18, y - 100 + 16 * i); ctx.lineTo(X0 + 82, y - 100 + 16 * i); }
  ctx.stroke(); ctx.fillStyle = ivo(.16); ctx.fillRect(X0 + len - 70, y - 100, 52, 6); ctx.fillRect(X0 + len - 70, y - 88, 36, 6);
  setFont(ctx, MN(28), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(L.name, X0 + 100, y - 66);
  setFont(ctx, MN(15), 3); ctx.fillStyle = ivo(.55); ctx.fillText(L.maker, X0 + 100, y - 38);
  ctx.restore(); ctx.globalAlpha = a0;
  // ruler: same standard scale for everyone; the vendor clamp shortens it, the card stays the same length
  const kr = E.outQuint(inv(L.tRuler, L.tRuler + .5, t)); if (kr <= 0) return;
  const sp = t < L.tKick ? SP : springSp(t, L.tKick, SP, len / L.ven), up = 100 * E.outCubic(inv(L.tRuler + .08, L.tRuler + .6, t));
  ctx.save(); ctx.translate(0, 60 * (1 - kr));
  ruler(ctx, X0, y - 8, sp, { upto: up, alpha: kr, h: 108, label: t < L.tKick + .12 ? 'STANDAR · ARC PRIZE' : 'PEMBUNGKUS ' + L.clampTxt });
  const kv = E.outQuint(inv(L.tKick - .3, L.tKick + .02, t));                    // vendor clamp slides in, then the kick
  if (kv > 0) { const end = X0 + 100 * sp, cx = end + 40 + 600 * (1 - kv);
    ctx.globalAlpha = a0 * kv; ctx.fillStyle = '#2A2B24'; ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(cx, y - 30, 64, 164, 12); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = ivo(.22); ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(cx + 44, y + 2 + i * 24); ctx.lineTo(cx + 56, y + 2 + i * 24); } ctx.stroke();
    ctx.save(); ctx.translate(cx + 28, y + 52); ctx.rotate(-Math.PI / 2); setFont(ctx, MN(14), 3); ctx.fillStyle = ivo(.85); ctx.textAlign = 'center'; ctx.fillText(L.clampTxt, 0, 5); ctx.restore();
    ctx.globalAlpha = a0; }
  ctx.restore();
  // lime needle at the card's end: the thing measured never moves, only the number does
  const kn = E.outQuint(inv(L.tNeedle, L.tNeedle + .3, t)); if (kn <= 0) return;
  const nx = X0 + len; needle(ctx, nx, y - 126, 252, kn);
  const val = t < L.tKick ? countTo(0, L.std, t, L.tNeedle, .7) : lerp(L.std, L.ven, E.outCubic(inv(L.tKick, L.tKick + .75, t)));
  fall(ctx, fmt(val, 1) + '%', nx + 30, y - 22, t, L.tNeedle + .04, DSP(118));
  const fl = inv(L.tKick + .05, L.tKick + .25, t), sy = Math.abs(Math.cos(fl * Math.PI));
  ctx.save(); ctx.translate(nx + 34, y + 20); ctx.scale(1, Math.max(.02, sy)); setFont(ctx, MN(16), 3);
  ctx.fillStyle = ivo(.72); ctx.globalAlpha = a0 * clamp((t - L.tNeedle - .2) / .25); ctx.fillText(fl < .5 ? 'PEMBUNGKUS STANDAR' : 'PEMBUNGKUS VENDOR', 0, 0); ctx.restore();
  ctx.globalAlpha = a0;
}

// extruded block (front + top + side), bottom-left (x, base), width w, height h; top edge lime when o.lime
export function block(ctx, x, base, w, h, o = {}) {
  if (h <= 0) return; const dx = 46, dy = -30, a0 = ctx.globalAlpha;
  ctx.fillStyle = '#23241E'; ctx.beginPath(); ctx.moveTo(x + w, base - h); ctx.lineTo(x + w + dx, base - h + dy); ctx.lineTo(x + w + dx, base + dy); ctx.lineTo(x + w, base); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#34352D'; ctx.beginPath(); ctx.moveTo(x, base - h); ctx.lineTo(x + dx, base - h + dy); ctx.lineTo(x + w + dx, base - h + dy); ctx.lineTo(x + w, base - h); ctx.closePath(); ctx.fill();
  const g = ctx.createLinearGradient(0, base - h, 0, base); g.addColorStop(0, '#2C2D26'); g.addColorStop(1, '#191A15'); ctx.fillStyle = g; ctx.fillRect(x, base - h, w, h);
  ctx.strokeStyle = ivo(.45); ctx.lineWidth = 2; ctx.strokeRect(x, base - h, w, h);
  if (o.lime) { ctx.globalAlpha = a0 * o.lime; ctx.fillStyle = LIME; ctx.fillRect(x - 2, base - h - 3, w + 4, 6); ctx.globalAlpha = a0; }
}

// line-art cook (same drawing in both kitchens): figure, chef hat, a stirring arm into the pot
export function koki(ctx, x, y, t, ph = 0) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = ivo(.72); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -165, 34, 0, 7); ctx.moveTo(-86, 0); ctx.bezierCurveTo(-86, -112, 86, -112, 86, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-30, -196); ctx.lineTo(-30, -222); ctx.arc(-14, -238, 22, Math.PI * .9, Math.PI * 1.7); ctx.arc(12, -246, 24, Math.PI * 1.2, Math.PI * 1.9);
  ctx.arc(26, -228, 18, Math.PI * 1.5, Math.PI * .35); ctx.lineTo(30, -196); ctx.closePath(); ctx.fillStyle = ivo(.12); ctx.fill(); ctx.stroke();
  const a = Math.sin(t * 5.2 + ph) * .35, hx = 70, hy = -68, ex = hx + Math.cos(-.5 + a) * 90, ey = hy + Math.sin(-.5 + a) * 40 + 40;
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(hx + 50, hy - 10, ex, ey); ctx.lineTo(ex + 30, ey + 70); ctx.stroke();
  ctx.restore(); return [x + (hx + Math.cos(-.5 + a) * 90) + 30, y + hy + 110];
}
export function panci(ctx, x, y, t, ph = 0) {                     // pot with steam
  ctx.strokeStyle = ivo(.72); ctx.lineWidth = 4; ctx.fillStyle = '#1E1F19';
  ctx.beginPath(); ctx.roundRect(x - 110, y - 70, 220, 110, [6, 6, 26, 26]); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 130, y - 70); ctx.lineTo(x + 130, y - 70); ctx.moveTo(x - 110, y - 40); ctx.lineTo(x - 140, y - 40); ctx.moveTo(x + 110, y - 40); ctx.lineTo(x + 140, y - 40); ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath();
  for (let k = 0; k < 3; k++) { const sx = x - 50 + k * 50, u = (t * .7 + k * .33 + ph) % 1;
    for (let j = 0; j <= 12; j++) { const yy = y - 90 - j * 12 - u * 40, xx = sx + Math.sin(j * .7 + t * 3 + k) * 10; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } }
  ctx.strokeStyle = ivo(.3); ctx.stroke();
}
export function cobek(ctx, x, y) {                                // stone mortar + pestle
  ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3.5; ctx.fillStyle = '#26271F';
  ctx.beginPath(); ctx.ellipse(x, y - 30, 80, 18, 0, Math.PI, 0); ctx.quadraticCurveTo(x + 70, y + 10, x, y + 12); ctx.quadraticCurveTo(x - 70, y + 10, x - 80, y - 30); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y - 30, 80, 18, 0, 0, 7); ctx.stroke();
  ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 10, y - 34); ctx.lineTo(x + 70, y - 110); ctx.stroke(); ctx.lineCap = 'butt';
}
export function toples(ctx, x, y, h, lv) {                        // spice jar
  ctx.strokeStyle = ivo(.65); ctx.lineWidth = 3; ctx.fillStyle = ivo(.08 + lv * .25); ctx.fillRect(x - 26, y - h * lv, 52, h * lv);
  ctx.beginPath(); ctx.roundRect(x - 28, y - h, 56, h, 8); ctx.stroke(); ctx.fillStyle = ivo(.45); ctx.fillRect(x - 32, y - h - 16, 64, 14);
}
export function sendok(ctx, x, y) {                               // plain ladle
  ctx.strokeStyle = ivo(.55); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 160); ctx.lineTo(x, y - 30); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y - 14, 22, 0, Math.PI); ctx.stroke(); ctx.lineCap = 'butt';
}
export function talenan(ctx, x, y) {                              // board + knife
  ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.fillStyle = '#24251E'; ctx.beginPath(); ctx.roundRect(x - 100, y - 24, 200, 24, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = ivo(.5); ctx.beginPath(); ctx.moveTo(x - 60, y - 34); ctx.lineTo(x + 40, y - 40); ctx.lineTo(x + 40, y - 30); ctx.closePath(); ctx.fill(); ctx.fillRect(x + 40, y - 40, 44, 10);
}
