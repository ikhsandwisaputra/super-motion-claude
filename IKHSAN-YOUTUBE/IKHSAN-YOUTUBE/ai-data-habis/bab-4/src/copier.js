// Bab 4 · Salinan Pudar engine (ported from the approved tes-salinan). Seen from under the copier glass: every generation is
// a glass plate one step deeper (Jarak = Generasi), really computed from the one before it (blur + toner curve + grey +
// speckle + Ahpo A05 toner textures), so light marks go first and the ink bloats. Three windows use it:
//   W0  0 → nah        opener clip → scan-bar wipe → ASLI → salinan 1 / 3 / 10 → signature gone (lime ghost)
//   W1  kayak2 → dampak4   back to copy 10 for a beat ("ungkapan khas: pudar")
//   W2  balik → bahan      wide stack: ASLI slides back, copies restore (cascade), ASLI thrown away, copies drain again
import { W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ROOM, ivo, setFont, DISP, MONO, txt, fall, rnd, mk, markLine, plate as clip } from './kit.js';

export const HAND = 'Caveat', SIGF = 'Reenie Beanie';
export const DW = 1400, DH = 950, NG = 11;                             // card px = world units; plate 0 = ASLI, 1..10 = salinan
export const SIG = { x: 930, y: 735, w: 400, h: 170 };
export const NEUTRAL = 'saturate(.35) contrast(1.12) brightness(.9)';  // footage grade without the kit's sepia
const F = 1400, GAP = 900, DX = -560, DY = 70;
export const gpos = g => ({ x: g * DX, y: g * DY, z: g * GAP });
const MN = (s, w = 700) => `${w} ${s}px "${MONO}"`, DSP = s => `400 ${s}px "${DISP}"`;

export function paper(c, w, h, seed = 0) {                            // index-card stock: warm paper + fibres
  c.fillStyle = '#ECE4D0'; c.fillRect(0, 0, w, h);
  const n = Math.round(2600 * w * h / (DW * DH));
  for (let i = 0; i < n; i++) { c.fillStyle = `rgba(120,96,60,${.025 + .03 * rnd(i + 7 + seed)})`; c.fillRect(rnd(i + seed) * w, rnd(i + 3 + seed) * h, 1 + 2 * rnd(i + 5), 1); }
}
export function card(c) {                                             // the ASLI: index card, ruled, handwritten
  paper(c, DW, DH);
  c.strokeStyle = 'rgba(120,150,190,.55)'; c.lineWidth = 2;
  for (let y = 190; y < DH - 40; y += 62) { c.beginPath(); c.moveTo(40, y); c.lineTo(DW - 40, y); c.stroke(); }
  c.strokeStyle = 'rgba(200,110,100,.6)'; c.beginPath(); c.moveTo(96, 30); c.lineTo(96, DH - 30); c.stroke();
  const ring = c.createRadialGradient(1190, 230, 70, 1190, 230, 112);
  ring.addColorStop(0, 'rgba(160,120,70,0)'); ring.addColorStop(.55, 'rgba(160,120,70,.16)'); ring.addColorStop(.7, 'rgba(160,120,70,.05)'); ring.addColorStop(1, 'rgba(160,120,70,0)');
  c.fillStyle = ring; c.fillRect(1060, 100, 260, 260);
  c.fillStyle = '#1C2640'; c.textAlign = 'left';
  c.font = `700 84px "${HAND}"`; c.save(); c.translate(130, 128); c.rotate(-.012); c.fillText('Resep Kue Lumpur', 0, 0); c.restore();
  c.font = `600 50px "${HAND}"`;
  ['Bahan:', '– 250 gr kentang kukus', '– 3 butir telur', '– 400 ml santan', '– 150 gr gula pasir', '– 125 gr terigu', '– sejumput garam']
    .forEach((s, i) => { c.save(); c.translate(130 + (i ? 14 : 0), 236 + i * 62); c.rotate((rnd(i + 40) - .5) * .014); c.fillText(s, 0, 0); c.restore(); });
  ['Cara:', 'kocok telur + gula', 'sampai kental, masuk', 'kentang & santan', 'sedikit-sedikit.']
    .forEach((s, i) => { c.save(); c.translate(720, 236 + i * 62); c.rotate((rnd(i + 60) - .5) * .014); c.fillText(s, 0, 0); c.restore(); });
  c.fillStyle = 'rgba(70,70,74,.42)'; c.font = `500 40px "${HAND}"`;
  c.save(); c.translate(140, 700); c.rotate(-.03); c.fillText('*jangan dibuka sebelum 15 menit!', 0, 0); c.restore();
  sign(c, 'rgba(70,100,175,.62)');
}
export function sign(c, col) {                                        // blue ballpoint signature + flourish, thin & light
  c.save(); c.translate(SIG.x + 30, SIG.y + 105); c.rotate(-.08);
  c.fillStyle = col; c.strokeStyle = col; c.font = `400 104px "${SIGF}"`; c.textAlign = 'left'; c.fillText('Mbah Sum', 0, 0);
  c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(-10, 22); c.bezierCurveTo(90, 52, 230, -6, 340, 30); c.stroke();
  c.restore();
}
// one pass through the copier, any canvas size. o: { bs blur scale, seed, smear:[x,y] (from g 4), tex:[A05-1..4] }
export function copyOf(prev, g, o = {}) {
  const w = prev.width, h = prev.height, [C, c] = mk(w, h), ar = Math.sqrt(w * h / (DW * DH)), sd = o.seed || 0;
  c.fillStyle = '#ECEBE6'; c.fillRect(0, 0, w, h);
  c.filter = `blur(${((.7 + .06 * g) * (o.bs ?? 1)).toFixed(2)}px)`;
  c.save(); c.translate(w / 2 + (rnd(g * 3 + sd) - .5) * 4, h / 2 + (rnd(g * 3 + 1 + sd) - .3) * 3); c.rotate((rnd(g * 3 + 2 + sd) - .5) * .005);
  c.drawImage(prev, -w / 2, -h / 2); c.restore(); c.filter = 'none';
  const im = c.getImageData(0, 0, w, h), d = im.data, MIX = .3;      // toner curve: dark ink -> darker/fatter, light marks -> paper
  for (let i = 0; i < d.length; i += 4) {
    const L = (.3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]) / 255, s = 1 / (1 + Math.exp(-(L - .5) * 12)), tl = (.08 + .87 * s) * 255;
    for (let j = 0; j < 3; j++) { const gr = lerp(d[i + j], L * 255, .35); d[i + j] = lerp(gr, tl, MIX); }
  }
  c.putImageData(im, 0, 0);
  if (o.tex) {                                                       // Ahpo A05: the machine's own marks, same spots every pass
    const lay = (i, a) => { if (a > 0 && o.tex[i]) { c.globalAlpha = a; c.drawImage(o.tex[i], 0, 0, w, h); c.globalAlpha = 1; } };
    lay(3, .32 * clamp((g - 1) / 3)); lay(0, .5 * clamp((g - 3) / 3)); lay(1, .42 * clamp((g - 4) / 3)); lay(2, .5 * clamp((g - 6) / 3));
  }
  c.fillStyle = 'rgba(28,28,30,.6)'; c.beginPath();                  // toner speckle, denser at the edges (one path)
  const ed = 90 * ar;
  for (let i = 0; i < (120 + g * 45) * ar * ar; i++) {
    const e = rnd(i + g * 977 + sd), x = e < .5 ? rnd(i + 11 + g) * w : (rnd(i + 13 + g) < .5 ? rnd(i + 17) * ed : w - rnd(i + 17) * ed), y = rnd(i + 19 + g * 7) * h, r = .5 + rnd(i + 23);
    c.moveTo(x + r, y); c.arc(x, y, r, 0, 7);
  }
  c.fill();
  const lw = (40 + 6 * g) * ar, lg = c.createLinearGradient(0, 0, lw, 0);   // lid shadow on the left edge, grows
  lg.addColorStop(0, `rgba(30,30,32,${.08 + .035 * g})`); lg.addColorStop(1, 'rgba(30,30,32,0)'); c.fillStyle = lg; c.fillRect(0, 0, lw, h);
  c.fillStyle = `rgba(40,40,44,${.012 * g})`; c.fillRect(Math.round(w * .717), 0, 2, h);   // drum streak
  if (o.smear && g >= 4) {                                           // toner smear settles where a light mark was
    c.save(); c.translate(o.smear[0], o.smear[1]); c.scale(ar, ar);
    for (let i = 0; i < 7; i++) {
      const ex = (rnd(i + 70) - .5) * 260, ey = (rnd(i + 71) - .5) * 90, rx = 60 + 90 * rnd(i + 72), ry = 14 + 26 * rnd(i + 73);
      const r = c.createRadialGradient(ex, ey, 0, ex, ey, rx); r.addColorStop(0, `rgba(80,80,84,${.035 * (g - 3) * (.5 + rnd(i + 74))})`); r.addColorStop(1, 'rgba(80,80,84,0)');
      c.save(); c.translate(ex, ey); c.scale(1, ry / rx); c.rotate((rnd(i + 75) - .5) * .3); c.translate(-ex, -ey); c.fillStyle = r; c.fillRect(ex - rx, ey - rx, 2 * rx, 2 * rx); c.restore();
    }
    c.fillStyle = `rgba(70,70,74,${.03 * (g - 3)})`; for (let i = 0; i < 5; i++) c.fillRect(-170 + rnd(i + 80) * 60, -40 + i * 19 + rnd(i + 81) * 8, 220 + 120 * rnd(i + 82), 2 + 3 * rnd(i + 83));
    c.restore();
  }
  return C;
}
export function chain(first, n, o = {}) {                              // [ASLI, copy1, … copy n]
  const out = [first]; for (let g = 1; g <= n; g++) out.push(copyOf(out[g - 1], g, o)); return out;
}
// scan light: bright core + soft spill along a width (screen or local units; k = scale)
export function bar(ctx, x0, y0, w, k, alpha) {
  if (alpha <= 0) return; const h = 190 * k, op = ctx.globalCompositeOperation; ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createLinearGradient(0, y0 - h, 0, y0 + h); g.addColorStop(0, 'rgba(241,239,230,0)'); g.addColorStop(.5, `rgba(241,239,230,${.34 * alpha})`); g.addColorStop(1, 'rgba(241,239,230,0)');
  ctx.fillStyle = g; ctx.fillRect(x0 - 30 * k, y0 - h, w + 60 * k, 2 * h);
  ctx.fillStyle = `rgba(250,249,244,${.85 * alpha})`; ctx.fillRect(x0 - 30 * k, y0 - 2.5 * k - 1, w + 60 * k, 5 * k + 2);
  ctx.globalCompositeOperation = op;
}
// a card on a glass pane inside a station (local units, centre x,y). o: { q reveal 0..1 (scan-born), bar, asli, label, m, mix:[img,a] }
export function glass(ctx, im, x, y, w, h, o = {}) {
  const a0 = ctx.globalAlpha, m = o.m ?? 22, q = o.q ?? 1; if ((o.a ?? 1) <= 0) return;
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.globalAlpha = a0 * (o.a ?? 1);
  ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 26;
  ctx.fillStyle = 'rgba(30,31,27,.55)'; ctx.fillRect(-w / 2 - m, -h / 2 - m, w + 2 * m, h + 2 * m);
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.strokeRect(-w / 2 - m, -h / 2 - m, w + 2 * m, h + 2 * m);
  if (im && q > 0) {
    const yb = -h / 2 + lerp(-.04, 1.04, q) * h;
    ctx.save(); ctx.beginPath(); ctx.rect(-w / 2 - 2, -h / 2 - 2, w + 4, Math.max(0, yb + h / 2) + 2); ctx.clip();
    ctx.drawImage(im, -w / 2, -h / 2, w, h);
    if (o.mix && o.mix[1] > 0) { ctx.globalAlpha = a0 * (o.a ?? 1) * o.mix[1]; ctx.drawImage(o.mix[0], -w / 2, -h / 2, w, h); ctx.globalAlpha = a0 * (o.a ?? 1); }
    ctx.restore();
    const gl = ctx.createLinearGradient(-w / 2 - m, -h / 2 - m, -w / 2 + w * .6, h / 2); gl.addColorStop(0, ivo(.12)); gl.addColorStop(.35, ivo(0));
    ctx.fillStyle = gl; ctx.fillRect(-w / 2 - m, -h / 2 - m, w + 2 * m, h + 2 * m);
    if (q < 1) bar(ctx, -w / 2, yb, w, Math.max(.35, w / 1400), Math.sin(Math.PI * clamp(q * 1.02)));
  }
  if (o.bar > 0 && o.bar < 1) bar(ctx, -w / 2, -h / 2 + lerp(-.04, 1.04, o.bar) * h, w, Math.max(.35, w / 1400), .8 * Math.sin(Math.PI * o.bar));
  if (o.asli) { const s = o.ls || 22; setFont(ctx, MN(s), 3); const tw = ctx.measureText('ASLI').width + s * 1.3;
    ctx.fillStyle = LIME; ctx.fillRect(-w / 2 - m, -h / 2 - m - 1.9 * s, tw, 1.7 * s); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left'; ctx.fillText('ASLI', -w / 2 - m + .65 * s, -h / 2 - m - .7 * s); }
  else if (o.label) { setFont(ctx, MN(o.ls || 18), 4); ctx.fillStyle = ivo(.72); ctx.textAlign = 'left'; ctx.fillText(o.label, -w / 2 - m, -h / 2 - m - 14); }
  ctx.restore(); ctx.globalAlpha = a0;
}

export function makeCopier(A, X) {                                    // X: { GEN, SIGC, kereta } filled by load()
  const born = g => g === 0 ? [-1, -.5] : g === 1 ? [A.l1 - .32, A.l1 + .12] : g === 2 ? [A.tajam - .2, A.tajam + .24]
    : g === 3 ? [A.tajam + .3, A.l3 - .02] : [A.pas - .28 + (g - 4) * .15, A.pas - .06 + (g - 4) * .15];
  function fg(t) {
    let v = E.brake(inv(A.l1 - .06, A.l1 + .5, t));
    v = lerp(v, 3, E.snap(inv(A.l3 - .04, A.l3 + .5, t)));
    return lerp(v, 10, E.inOutQuart(inv(A.pas - .02, A.tanda - .08, t)));
  }
  function cam(t) {
    const g = fg(t), p = gpos(g), z = E.brake(inv(A.tanda - .1, A.tanda + .42, t));
    const dist = lerp(2060 - 70 * Math.sin(t * .55), 860 - 70 * inv(A.tanda + .4, A.doang + .6, t), z);
    const cx = p.x + DW / 2 + lerp(-300, SIG.x + SIG.w / 2 - DW / 2 - 120, z), cy = p.y + DH / 2 + lerp(30, SIG.y + SIG.h / 2 - DH / 2 - 60, z);
    const s = t - (A.tanda - .1), kick = s > 0 ? 7 * Math.exp(-s / .08) : 0;
    return { x: cx + 6 * Math.sin(t * .9), y: cy + 4 * Math.cos(t * .7) + kick * Math.sin(s * 90), z: p.z - dist, foc: p.z, g, roll: .006 * Math.sin(t * .6) };
  }
  const proj = (c, x, y, z) => { const k = F / (z - c.z); return [W / 2 + (x - c.x) * k, H / 2 + (y - c.y) * k, k]; };

  function drawPlate(ctx, c, g, t, o) {
    const p = gpos(g), of = o.off ? o.off(g, t) : [0, 0, 1], px = p.x + of[0], py = p.y + of[1], pa = of[2];
    const dz = p.z - c.z; if (dz < 260 || c.g - g > .67 || pa <= 0) return;
    const [x, y, k] = proj(c, px, py, p.z), w = DW * k, h = DH * k;
    if (x > W + 50 || x + w < -50 || y > H + 50 || y + h < -50) return;
    const near = clamp((dz - 260) / 700) * clamp(1 - (c.g - g) * 1.5), blur = Math.min(16, Math.abs(p.z - c.foc) / dz * (o.dof ?? 13));
    const [b0, b1] = born(g), q = o.born === false ? 1 : inv(b0, b1, t);
    ctx.save(); ctx.globalAlpha = near * pa;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.filter = `blur(${(26 * k + blur).toFixed(1)}px)`; ctx.fillRect(x + 18 * k, y + 30 * k, w, h);
    const m = 34 * k;
    ctx.filter = blur > .4 ? `blur(${blur.toFixed(1)}px)` : 'none';
    ctx.fillStyle = 'rgba(241,239,230,.035)'; ctx.fillRect(x - m, y - m, w + 2 * m, h + 2 * m);
    ctx.strokeStyle = ivo(.2); ctx.lineWidth = Math.max(1, 2 * k); ctx.strokeRect(x - m, y - m, w + 2 * m, h + 2 * m);
    if (q > 0) {
      const yb = y + lerp(-.04, 1.04, q) * h;
      ctx.save(); ctx.beginPath(); ctx.rect(x - 2, y - 2, w + 4, Math.max(0, yb - y) + 2); ctx.clip();
      ctx.drawImage(X.GEN[g], x, y, w, h);
      const mx = g > 0 && o.mix ? o.mix(g, t) : 0;                     // W2: re-copied straight from the ASLI = generation 1
      if (mx > 0) { ctx.globalAlpha = near * pa * mx; ctx.drawImage(X.GEN[1], x, y, w, h); ctx.globalAlpha = near * pa; }
      ctx.restore();
      const gl = ctx.createLinearGradient(x - m, y - m, x + w * .6, y + h);
      gl.addColorStop(0, ivo(.10)); gl.addColorStop(.35, ivo(0)); ctx.fillStyle = gl; ctx.fillRect(x - m, y - m, w + 2 * m, h + 2 * m);
      ctx.filter = 'none';
      if (q < 1) bar(ctx, x, yb, w, k, near * Math.sin(Math.PI * clamp(q * 1.02)));
    }
    ctx.filter = 'none';
    if (o.born !== false) { const [c0, c1] = born(g + 1), qs = inv(c0, c1, t);
      if (g + 1 < NG && qs > 0 && qs < 1) bar(ctx, x, y + lerp(-.04, 1.04, qs) * h, w, k, .7 * near * Math.sin(Math.PI * qs)); }
    const qb = o.bars ? o.bars(g, t) : -1;
    if (qb > 0 && qb < 1) bar(ctx, x, y + lerp(-.04, 1.04, qb) * h, w, k, .85 * near * pa * Math.sin(Math.PI * qb));
    if (q > .3 && blur < 9) {
      ctx.globalAlpha = near * pa * clamp((q - .3) * 3) * (1 - blur / 9);
      if (g === 0) { const s = Math.max(14, 30 * k); setFont(ctx, MN(s), 3); const tw = ctx.measureText('ASLI').width + s * 1.3;
        ctx.fillStyle = LIME; ctx.fillRect(x, y - m - 1.9 * s, tw, 1.7 * s); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left'; ctx.fillText('ASLI', x + .65 * s, y - m - .7 * s); }
      else { setFont(ctx, MN(Math.max(12, 26 * k)), 4); ctx.fillStyle = ivo(.72); ctx.textAlign = 'left'; ctx.fillText(`SALINAN ${String(g).padStart(2, '0')}`, x, y - m - 16 * k); }
    }
    ctx.restore();
  }

  function world(ctx, c, t, o = {}) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(W * .6, H * .45, 60, W * .6, H * .45, W * .75);   // cool light leaking under the glass
    bg.addColorStop(0, '#20262A'); bg.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(c.roll || 0); ctx.translate(-W / 2, -H / 2);
    for (let i = 0; i < 14; i++) {                                    // far toner dust between the plates
      const z = c.z + 600 + rnd(i + 300) * 9000, [x, y, k] = proj(c, -2400 + rnd(i + 301) * 4600 - 900 + (o.dustX || 0), -900 + rnd(i + 302) * 2600, z);
      ctx.fillStyle = ivo(.05 + .05 * rnd(i + 303)); ctx.beginPath(); ctx.arc(x, y, (3 + 6 * rnd(i + 304)) * k, 0, 7); ctx.fill();
    }
    for (let g = NG - 1; g >= 0; g--) drawPlate(ctx, c, g, t, o);
    if (o.extra) o.extra(ctx, c, proj);
    ctx.restore();
    const v = o.v || 0;
    for (let i = 0; i < 7; i++) {                                     // FG motes: strongest parallax, streak with camera speed
      const px = (rnd(i + 600) * W * 1.4 - c.x * .35 + 40000) % (W * 1.4) - W * .2, py = rnd(i + 601) * H, r = 18 + 34 * rnd(i + 602), L = Math.min(260, v * 26);
      ctx.save(); ctx.translate(px, py); ctx.scale(1 + L / r, 1);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, ivo(.06)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.restore();
    }
  }
  function hud(ctx, n, a, t, t0) {
    if (n < 1 || a <= 0) return; ctx.globalAlpha = a;
    txt(ctx, 'SALINAN KE-', 92, 860, t, t0, MN(22), { ls: 5, col: ivo(.7), rise: 10 });
    setFont(ctx, DSP(230), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(String(n).padStart(2, '0'), 86, 1060 - 40 * (1 - E.outQuint(inv(t0, t0 + .35, t))));
    ctx.globalAlpha = 1;
  }

  // ── W0: opener + the approved test sequence ─────────────────────────────────────────────────────────────
  function W0(ctx, t) {
    const c = cam(t), wa = A.terus - .1, wb = A.terus + .5;
    c.z -= 700 * (1 - E.outCubic(inv(wa, A.l1 + .2, t)));            // the camera settles into the ASLI after the wipe
    const v = Math.abs(fg(t + .02) - fg(t - .02)) / .04;
    if (t >= wa) world(ctx, c, t, { v, bars: (g, tt) => g === 0 ? inv(A.berulang - .3, A.berulang + .45, tt) : -1 });
    const z = E.brake(inv(A.tanda - .1, A.tanda + .42, t));
    if (t > A.ilang - .05 && t < A.tinggal + 1.2) {                     // the lime ghost of the original signature
      const p = gpos(10), [x, y, k] = proj(c, p.x, p.y, p.z), rv = E.outCubic(inv(A.ilang - .05, A.ilang + .35, t)), out = inv(A.tinggal - .1, A.tinggal + 1.0, t);
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(c.roll); ctx.translate(-W / 2, -H / 2);
      ctx.globalAlpha = .9 * (1 - E.inCubic(out)); ctx.filter = out > 0 ? `blur(${(10 * out).toFixed(1)}px)` : 'none';
      ctx.beginPath(); ctx.rect(x + SIG.x * k, y + (SIG.y - 40) * k, SIG.w * rv * k, (SIG.h + 80) * k); ctx.clip();
      ctx.drawImage(X.SIGC, x, y - 40 * out * k, DW * k, DH * k); ctx.restore(); ctx.filter = 'none'; ctx.globalAlpha = 1;
    }
    hud(ctx, Math.round(c.g), (1 - z * .85) * E.outCubic(inv(A.l1 - .1, A.l1 + .3, t)), t, A.l1 - .1);
    if (t > A.ilang - .1) {                                             // closing caption, beside the smudge
      txt(ctx, 'TANDA TANGAN: HILANG', 1760, 960, t, A.ilang - .1, MN(28), { ls: 5, col: ivo(.9), align: 'right', rise: 14 });
      txt(ctx, 'tinggal noda toner', 1760, 1004, t, A.noda - .05, MN(22, 400), { ls: 2, col: ivo(.65), align: 'right', rise: 10 });
    }
    if (t < wb) {                                                       // opener: the press, then the scan bar wipes us under the glass
      const u = E.inOutCubic(inv(wa, wb, t)), yb = H * u;
      ctx.save(); ctx.beginPath(); ctx.rect(0, yb, W, H - yb); ctx.clip();
      ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
      clip(ctx, X.kereta, t, W / 2, H / 2, W, H, 1, { marks: false, grade: NEUTRAL, vig: .55, grain: .2, speed: .8 });
      const sc = ctx.createLinearGradient(0, H * .35, 0, H); sc.addColorStop(0, 'rgba(11,12,9,0)'); sc.addColorStop(1, 'rgba(11,12,9,.82)'); ctx.fillStyle = sc; ctx.fillRect(0, 0, W, H);
      txt(ctx, 'BAB 4', 120, 742, t, .35, MN(26), { ls: 8, col: ivo(.8), rise: 12 });
      fall(ctx, 'FOTOKOPI DARI FOTOKOPIAN?', 112, 930, t, A.fotokopi - .1, DSP(200), { ls: 2, stag: .022 });
      ctx.restore();
      if (t > wa) bar(ctx, 0, yb, W, 1.4, Math.sin(Math.PI * clamp(u * 1.02)));
    }
  }
  // ── W1: copy 10 again, re-scanned (the idiom fades like it) ───────────────────────────────────────────────
  function W1(ctx, t) {
    const s0 = A.kayak2 - .1, u = inv(s0, A.dampak4 - .3, t), c = cam(A.doang + .8);
    c.z += 150 * E.outCubic(u) - 40; c.x += 50 * u; c.roll = .006 * Math.sin(t * .6);
    world(ctx, c, t, { born: false, bars: g => g === 10 ? inv(A.kayak2, A.kayak2 + 1.15, t) : -1 });
    hud(ctx, 10, .9, t, s0 - 1);
    txt(ctx, 'UNGKAPAN KHAS: PUDAR', 1760, 960, t, A.kayak2 + .05, MN(28), { ls: 5, col: ivo(.9), align: 'right', rise: 14 });
    txt(ctx, 'kayak fotokopian kesepuluh', 1760, 1004, t, A.kesepuluh2 - .1, MN(22, 400), { ls: 2, col: ivo(.65), align: 'right', rise: 10 });
  }
  // ── W2: the ASLI goes back into the stack, the copies recover; throw it away and they drain again ─────────
  function W2(ctx, t) {
    const s0 = A.balik - .3, u = E.inOutCubic(inv(s0, A.bahan + .2, t));
    const fr = E.inOutCubic(inv(A.mesinnya - .4, A.mesinnya + .8, t)) * (1 - E.inOutCubic(inv(A.lembar - .3, A.aslinya + .2, t)));
    const c = { x: -820 - 300 * u, y: 600 - 50 * u, z: -3050 + 520 * u, g: 0, foc: lerp(0, gpos(5).z, fr), roll: .004 * Math.sin(t * .6) };
    const rs = g => [A.mesinnya - .45 + g * .09, A.mesinnya + .05 + g * .09], dr = g => [A.dibuang2 + .12 + g * .07, A.dibuang2 + .55 + g * .07];
    world(ctx, c, t, { born: false, dof: 6, dustX: -1500,
      off: (g, tt) => g ? [0, 0, 1] : [1900 * (1 - E.outQuint(inv(s0, s0 + .75, tt))) + 2600 * E.inCubic(inv(A.dibuang2 - .2, A.dibuang2 + .3, tt)),
        -260 * E.outCubic(inv(A.aslinya - .25, A.aslinya + .35, tt)) - 700 * E.inCubic(inv(A.dibuang2 - .2, A.dibuang2 + .3, tt)), 1 - inv(A.dibuang2 + .1, A.dibuang2 + .3, tt)],
      mix: (g, tt) => E.inOutCubic(inv(...rs(g), tt)) * (1 - E.inOutCubic(inv(...dr(g), tt))),
      bars: (g, tt) => { if (!g) return -1; const a = inv(...rs(g), tt); return a > 0 && a < 1 ? a : inv(...dr(g), tt); } });
    txt(ctx, 'BALIK KE FOTOKOPI TADI', 120, 880, t, A.balik - .1, MN(26), { ls: 5, col: ivo(.85 * (1 - inv(A.mesinnya - .5, A.mesinnya - .2, t))), rise: 12 });
    if (t < A.lembar) { ctx.globalAlpha = 1 - inv(A.lembar - .45, A.lembar - .15, t);
      fall(ctx, 'MESINNYA AMAN', 112, 990, t, A.mesinnya - .15, DSP(150), { ls: 2 });
      txt(ctx, 'tiap salinan dibuat langsung dari lembar asli', 120, 870, t, A.mesinnya + .2, MN(22, 400), { ls: 2, col: ivo(.72), rise: 10 }); ctx.globalAlpha = 1; }
    markLine(ctx, 'LEMBAR ', 'ASLI', 'NYA DIBUANG', 112, 990, t, A.lembar - .1, A.aslinya, DSP(150), { align: 'left', ls: 2 });
    if (t > A.dibuang2 + .3) txt(ctx, 'salinan pudar lagi', 120, 870, t, A.dibuang2 + .3, MN(22, 400), { ls: 2, col: ivo(.72), rise: 10 });
  }
  return { W0, W1, W2 };
}
