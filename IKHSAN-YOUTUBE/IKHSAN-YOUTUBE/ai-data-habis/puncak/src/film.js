// Puncak · Jangkar (VO 09, 35.6 s). S1 pertanyaan awal kembali (TIPIS menipis, "?" berayun) → S2 tiga jalan menyala bergantian →
// S3 tiga jalan bertemu di satu jangkar (dunia nyata) → S4 turun ke lautan tulisan mesin (abu-abu seragam, 5 lapis kedalaman),
// jangkar jatuh: konstan → slow-mo (rantai menegang) → banting ke dasar tulisan manusia (Ahpo A02 + A01-2) → warna kembali dari
// dasar jangkar + serat optik (macro) → KITA SENDIRI + cap ASLI → putih.
// New technique: verlet chain (precomputed in load, sampled at 120 Hz) that rains down and piles on the bed after the slam.
// Rules kept: lime = ASLI only · glyphs batched (prose textures cached + pre-blurred to their depth, chain = 4 batched paths).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, GREY, D2R, ivo, setFont, rnd, mk, DISP, SER, MONO, timing, makeChapter,
  onPlane, loadImg, loadVid, fall, typeOn, markLine, txt, gone } from './kit.js';
import { pop, popAt, stamp } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const sst = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
const smax = (a, b, k) => (a + b + Math.sqrt((a - b) * (a - b) + k * k)) / 2;
const rgb = (a, b, k) => `rgb(${Math.round(lerp(a[0], b[0], k))},${Math.round(lerp(a[1], b[1], k))},${Math.round(lerp(a[2], b[2], k))})`;
const MESIN = ['Tentu! Berikut adalah', 'Sebagai model bahasa AI,', 'Semoga membantu!', 'Di era digital ini,', 'Mari kita selami lebih dalam.',
  'Kesimpulannya,', 'Penting untuk dicatat bahwa', 'Dalam lanskap yang terus berkembang,', 'Berikut beberapa poin penting:',
  'Secara keseluruhan,', 'Tentu saja!', 'Hal ini menunjukkan bahwa'];
const MACH4 = ['Tentu! Berikut adalah beberapa', 'poin penting yang perlu Anda', 'ketahui. Semoga membantu!', 'Sebagai model bahasa AI, saya'];

// uniform grey machine prose (one weight, one colour, the same phrases): paragraph blocks, pre-blurred to the layer's depth
function proseTex(L, seed) {
  const [s, g] = mk(Math.round(L.w * L.r), Math.round(L.h * L.r)); g.scale(L.r, L.r); setFont(g, MN(L.size, 400), 0);
  g.fillStyle = 'rgba(124,125,116,.9)'; g.textBaseline = 'alphabetic';
  const lh = L.size * 1.5, colW = L.size * 26, gut = L.size * 2.4, nc = Math.max(1, Math.floor((L.w + gut) / (colW + gut))), chars = Math.floor(colW / (L.size * .6));
  let k = seed * 101;
  for (let ci = 0; ci < nc; ci++) {
    const x = ci * (colW + gut) + gut / 2; let y = lh * (1.2 + rnd(seed + ci * 7) * 3);
    while (y < L.h - lh) {
      const n = 2 + Math.floor(rnd(k++) * 6); let str = '';
      while (str.length < chars * n) str += MESIN[Math.floor(rnd(k++ * 1.31) * MESIN.length)] + ' ';
      for (let l = 0; l < n && y < L.h - lh * .6; l++, y += lh) g.fillText(str.slice(l * chars, (l + 1) * chars - (l === n - 1 ? Math.floor(rnd(k++) * chars * .6) : 0)).trim(), x, y);
      y += lh * (.8 + rnd(k++) * 1.4);
    }
  }
  if (L.bl < .6) return s;
  const [c, g2] = mk(s.width, s.height); g2.filter = `blur(${(L.bl * L.r).toFixed(1)}px)`; g2.drawImage(s, 0, 0); return c;
}
// anchor in local units, crown (base) at 0,0, ring centre (0,-520) r 40. p = draw-on 0..1 (shank → stock → arms → flukes)
function anchorGeo(ctx, p, lw, col, rim, noRing) {
  const e = (a, b) => E.outCubic(inv(a, b, p)), e1 = e(0, .35), e2 = e(.15, .45), e3 = e(.35, .85), e4 = e(.7, 1), e5 = e(.45, .6);
  const S = new Path2D(), F = new Path2D();
  if (!noRing) { S.moveTo(40, -520); S.arc(0, -520, 40, 0, Math.PI * 2); }
  S.moveTo(0, -480); S.lineTo(0, lerp(-480, -30, e1));
  if (e2 > 0) { S.moveTo(-170 * e2, -400); S.lineTo(170 * e2, -400); }
  if (e3 > 0) { S.moveTo(0, 0); S.arc(0, -250, 250, Math.PI / 2, Math.PI / 2 - 75 * D2R * e3, true); S.moveTo(0, 0); S.arc(0, -250, 250, Math.PI / 2, Math.PI / 2 + 75 * D2R * e3, false); }
  if (e4 > 0) for (const sx of [-1, 1]) { const tx = sx * 241, ty = -185, q = (x, y) => [tx + (x - tx) * e4, ty + (y - ty) * e4];
    F.moveTo(...q(sx * 300, -262)); F.lineTo(...q(sx * 190, -170)); F.lineTo(...q(sx * 262, -118)); F.closePath(); }
  if (e5 > 0) for (const sx of [-1, 1]) { F.moveTo(sx * 170 + 18 * e5, -400); F.arc(sx * 170, -400, 18 * e5, 0, Math.PI * 2); }
  if (e3 >= 1) { F.moveTo(26, 0); F.arc(0, 0, 26, 0, Math.PI * 2); }
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (rim) { ctx.strokeStyle = rim; ctx.lineWidth = lw + 10; ctx.stroke(S); ctx.lineWidth = 10; ctx.stroke(F); ctx.fillStyle = rim; ctx.fill(F); }
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(S); ctx.fillStyle = col; ctx.fill(F);
}
// chain links along a polyline P (flat x,y): face rings and edge bars alternate; 4 batched passes
function chainDraw(ctx, P, n) {
  const Fp = new Path2D(), Bp = new Path2D();
  for (let j = 0; j < n - 1; j++) {
    const x0 = P[2 * j], y0 = P[2 * j + 1], x1 = P[2 * j + 2], y1 = P[2 * j + 3], dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    if (j % 2 === 0) { Fp.moveTo(mx + ux * 25, my + uy * 25); Fp.ellipse(mx, my, 25, 12.5, Math.atan2(dy, dx), 0, Math.PI * 2); }
    else { const hl = 27, hw = 4.5; Bp.moveTo(mx - ux * hl - uy * hw, my - uy * hl + ux * hw); Bp.lineTo(mx + ux * hl - uy * hw, my + uy * hl + ux * hw);
      Bp.lineTo(mx + ux * hl + uy * hw, my + uy * hl - ux * hw); Bp.lineTo(mx - ux * hl + uy * hw, my - uy * hl - ux * hw); Bp.closePath(); }
  }
  ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(6,7,6,.9)'; ctx.lineWidth = 13; ctx.stroke(Fp); ctx.lineWidth = 6; ctx.stroke(Bp);
  ctx.strokeStyle = '#D6D2C5'; ctx.lineWidth = 6.5; ctx.stroke(Fp); ctx.fillStyle = '#D6D2C5'; ctx.fill(Bp);
}
function check(ctx, x, y, s, k, col) {                         // tick drawn on (k 0..1)
  if (k <= 0) return; const L1 = Math.hypot(.35, .35), L2 = Math.hypot(.65, .8), d = k * (L1 + L2);
  ctx.strokeStyle = col; ctx.lineWidth = s * .17; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x, y);
  if (d <= L1) ctx.lineTo(x + s * .35 * d / L1, y + s * .35 * d / L1); else { const u = (d - L1) / L2; ctx.lineTo(x + s * .35, y + s * .35); ctx.lineTo(x + s * (.35 + .65 * u), y + s * (.35 - .8 * u)); }
  ctx.stroke();
}
function cross(ctx, x, y, s, k, col) {
  if (k <= 0) return; const h = s / 2, a = clamp(k * 2), b = clamp(k * 2 - 1); ctx.strokeStyle = col; ctx.lineWidth = s * .15; ctx.lineCap = 'round'; ctx.beginPath();
  ctx.moveTo(x - h, y - h); ctx.lineTo(x - h + s * a, y - h + s * a); if (b > 0) { ctx.moveTo(x + h, y - h); ctx.lineTo(x + h - s * b, y - h + s * b); } ctx.stroke();
}

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, OC = [];
  const Z4 = 5200, P4 = 3000, ANX = 420, RY = -520;                 // S4: the ocean column (plane origin) and the anchor's x
  const tJ = A.jangkar2, tA = A.itu + .26, tI = A.ternyata, tB = tI - .12;
  // ── the fall, speed-ramped: constant acceleration into frame → slow-mo brake (chain catches) → slam (Hermite) ──
  const yJ = -3050, v0 = 2600, v1 = 4000, acc = (v1 - v0) / (tA - tJ), yAe = yJ + v0 * (tA - tJ) + .5 * acc * (tA - tJ) ** 2;
  const vE = 260, lam = 11, dB = tB - tA, yBe = yAe + vE * dB + (v1 - vE) * (1 - Math.exp(-lam * dB)) / lam, vBe = vE + (v1 - vE) * Math.exp(-lam * dB);
  function ay(t) {
    if (t < tA) { const s = Math.max(t - tJ, -v0 / acc); return yJ + v0 * s + .5 * acc * s * s; }
    if (t < tB) { const s = t - tA; return yAe + vE * s + (v1 - vE) * (1 - Math.exp(-lam * s)) / lam; }
    if (t < tI) { const s = (t - tB) / (tI - tB), d = -yBe, m0 = vBe * (tI - tB), m1 = 7800 * (tI - tB); return yBe + (m1 + m0 - 2 * d) * s ** 3 + (3 * d - 2 * m0 - m1) * s * s + m0 * s; }
    return 0;
  }
  function pose(t) {                                                // base x/y, rotation (deg) about pivot y (ring while hanging, crown after)
    if (t < tI) return { x: ANX, y: ay(t), r: t < tA ? -1.2 + 2 * inv(tJ, tA, t) : .8 + 3 * Math.sin((t - tA) * 3.4) * Math.exp(-(t - tA) * .9), pv: RY };
    const s = t - tI; return { x: ANX, y: 10 * (1 - Math.exp(-s * 9)) - 24 * Math.exp(-s * 8) * Math.abs(Math.sin(s * 17)),
      r: 5 * (1 - Math.exp(-s * 3)) + 2.4 * Math.exp(-s * 6) * Math.sin(s * 15), pv: 0 };
  }
  function ringPos(t) { const p = pose(t), dy = RY - p.pv, a = p.r * D2R; return { x: p.x - dy * Math.sin(a), y: p.y + p.pv + dy * Math.cos(a) }; }
  // ── chain: analytic while falling, verlet after the slam ──
  function chainLive(t, out) {
    const r = ringPos(t), n = 60;
    for (let j = 0; j < n; j++) { let x = r.x; const y = r.y - 40 - j * 36;
      if (t < tA) x += 16 * Math.sin(j * .33 - t * 11) * Math.min(1, j / 5);
      else { const s = t - tA; x += 44 * Math.exp(-s * 5) * Math.sin(s * 24) * Math.sin(Math.min(1, j / 40) * Math.PI) + 9 * Math.sin(j * .18 - t * 2.4) * Math.min(1, j / 6); }
      if (t > tB) x += 34 * Math.sin(Math.PI * inv(tB, tI, t)) * Math.sin(j * .5 - t * 14) * Math.min(1, j / 4);
      out[2 * j] = x; out[2 * j + 1] = y; }
    return n;
  }
  let CH = null;
  function simChain() {
    const N = 50, n = N + 1, l = 36, dt = 1 / 240, G = 2700, P = new Float64Array(n * 2), Q = new Float64Array(n * 2), r0 = ringPos(tI + 1e-4);
    for (let j = 0; j < n; j++) { P[2 * j] = r0.x; P[2 * j + 1] = r0.y - 40 - j * l;
      const vx = (120 + 380 * Math.sin(j * .21 + .6)) * Math.min(1, j / 8), vy = 2300 * Math.min(1, j / 3); Q[2 * j] = P[2 * j] - vx * dt; Q[2 * j + 1] = P[2 * j + 1] - vy * dt; }
    const m = Math.ceil((DUR - tI) * 120) + 2, buf = new Float32Array(m * n * 2);
    for (let s = 0; s < m * 2; s++) {
      if (s % 2 === 0) buf.set(P, (s / 2) * n * 2);
      const rp = ringPos(tI + (s + 1) * dt);
      for (let j = 1; j < n; j++) { const k = 2 * j, x = P[k], y = P[k + 1], vx = (x - Q[k]) * .996, vy = (y - Q[k + 1]) * .996; Q[k] = x; Q[k + 1] = y; P[k] = x + vx; P[k + 1] = y + vy + G * dt * dt; }
      P[0] = rp.x; P[1] = rp.y - 40;
      for (let it = 0; it < 20; it++) {
        for (let j = 0; j < N; j++) { const a = 2 * j, b = a + 2, dx = P[b] - P[a], dy = P[b + 1] - P[a + 1], d = Math.hypot(dx, dy) || 1e-6, e = (d - l) / d;
          if (j === 0) { P[b] -= dx * e; P[b + 1] -= dy * e; } else { P[a] += dx * e * .5; P[a + 1] += dy * e * .5; P[b] -= dx * e * .5; P[b + 1] -= dy * e * .5; } }
        for (let j = 1; j < n; j++) if (P[2 * j + 1] > -8) P[2 * j + 1] = -8;
      }
      for (let j = 1; j < n; j++) if (P[2 * j + 1] >= -8.01) { const k = 2 * j; Q[k] = P[k] - (P[k] - Q[k]) * .55; Q[k + 1] = P[k + 1]; }
    }
    CH = { n, m, buf };
  }
  function chainSim(t, out) {
    const n2 = CH.n * 2, f = clamp((t - tI) * 120, 0, CH.m - 1.001), i = Math.floor(f), u = f - i, a = i * n2;
    for (let k = 0; k < n2; k++) out[k] = CH.buf[a + k] * (1 - u) + CH.buf[a + n2 + k] * u; return CH.n;
  }
  const CB = new Float32Array(160);
  // ── S4 camera: sink through the prose → grab the falling anchor → overtake it in the slow-mo and pull back → slam shake ──
  const camY = t => { const s0 = -3300 + 840 * E.inOutSine(inv(A.dan - .3, tJ + .1, t)), y = smax(s0, ay(t) - 270, 260);
    return lerp(y, -270, sst(tA - .05, tB + .1, t)) - 25 * inv(tI, DUR, t); };
  function camS4(t) {
    const sI = t - tI, sh = sI > 0 ? Math.exp(-sI * 8) : 0;
    let dist = lerp(1500, 1440, inv(A.dan, tJ, t)); dist = lerp(dist, 1960, sst(tA - .1, tB + .05, t)); dist -= 150 * E.outCubic(inv(tI, tI + .7, t)) + 70 * inv(tI + .7, DUR, t);
    const tx = lerp(lerp(-40, 140, inv(A.dan, tJ, t)), ANX - 40, sst(tJ - .1, tJ + .35, t));
    return { tx: lerp(tx, 0, sst(tA, tB + .15, t)), ty: P4 + camY(t) + (sI > 0 ? 18 * sh * Math.sin(sI * 70) : 0), tz: Z4, dist,
      yaw: lerp(-2, 1.5, inv(A.dan, DUR, t)), pitch: 3 + 18 * (1 - E.outCubic(inv(A.dan - .3, A.dan + 1.2, t))), roll: sI > 0 ? .7 * sh * Math.sin(sI * 55) : 0 };
  }
  function viewY(c, zp) {                                           // plane-local y range the camera sees on the plane z = zp
    const p = c.pitch * D2R, cz = c.tz - c.dist * Math.cos(c.yaw * D2R) * Math.cos(p), cy = c.ty - c.dist * Math.sin(p), Dz = zp - cz;
    if (Dz < 80) return null; const yc = cy + Dz * Math.tan(p) - P4, half = Dz * .36 / Math.cos(p) * 1.3 + 140; return [yc - half, yc + half];
  }
  function ocean(ctx, L, a, yA, yB, dx) {                           // tiled prose over [yA, yB], thinning out above the bed (y > -800)
    const yEnd = -150, f0 = -800, y1 = Math.min(yB, yEnd); if (y1 <= yA) return;
    const a0 = ctx.globalAlpha, x0 = -L.w / 2 + dx, C = L.c, r = C.height / L.h;
    const seg = (ya, yb, al) => { let y = ya; while (y < yb - .5) { const ty = Math.floor(y / L.h) * L.h, ye = Math.min(yb, ty + L.h), sy = (y - ty) * r, sh = Math.min(C.height - sy, (ye - y) * r);
      if (sh > .5) { ctx.globalAlpha = a0 * al; ctx.drawImage(C, 0, sy, C.width, sh, x0, y, L.w, ye - y); } y = ye; } };
    if (yA < f0) seg(yA, Math.min(y1, f0), a);
    for (let y = Math.max(yA, f0); y < y1; y += 65) seg(y, Math.min(y1, y + 65), a * (1 - sst(f0, yEnd, y + 32)));
    ctx.globalAlpha = a0;
  }
  // ── the bed of human writing: grey until the slam, colour returns in a ring from the anchor's crown ──
  const revR = t => 2800 * E.outCubic(inv(tI + .02, tI + 1.3, t));
  function bed(ctx, t, G, C, glow) {
    ctx.drawImage(G, -1500, -420, 3000, 900); const R = revR(t); if (R <= 0) return;
    ctx.save(); ctx.beginPath(); ctx.arc(ANX, 0, R, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(C, -1500, -420, 3000, 900); ctx.restore();
    if (R < 2700) { ctx.strokeStyle = `rgba(255,214,150,${(.3 * (1 - R / 2800)).toFixed(3)})`; ctx.lineWidth = 26; ctx.beginPath(); ctx.arc(ANX, 0, R, 0, Math.PI * 2); ctx.stroke(); }
    if (glow) { const k = E.outCubic(inv(tI, tI + .8, t)) * (1 - .35 * inv(tI + 1, tI + 4, t)), g = ctx.createRadialGradient(ANX, -40, 0, ANX, -40, 1000);
      g.addColorStop(0, `rgba(255,196,120,${(.22 * k).toFixed(3)})`); g.addColorStop(1, 'rgba(255,196,120,0)'); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(ANX - 1000, -1040, 2000, 2000); ctx.globalCompositeOperation = 'source-over'; }
  }
  const [MC, MG] = mk(960, 540);
  function bloom(ctx, t) {                                          // fibre-optic macro (NARASI asset) grows out of the bed at the crown, screen-blended
    const V = IM.macro, s = t - tI, k = E.outCubic(clamp((s - .03) / 1.0)), a = .8 * k * (1 - .45 * inv(2.2, 4.5, s)); if (!V || a < .01) return;
    const n = V.n, per = 2 * (n - 1), m = Math.floor(s * V.fps) % per, im = V.img[m < n ? m : per - m];
    MG.globalCompositeOperation = 'source-over'; MG.clearRect(0, 0, 960, 540); MG.drawImage(im, 0, 0, 960, 540);
    MG.globalCompositeOperation = 'destination-in'; MG.save(); MG.translate(480, 540); MG.scale(1.6, 1); const R = 40 + 520 * k, g = MG.createRadialGradient(0, 0, 0, 0, 0, R);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(.55, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,0)'); MG.fillStyle = g; MG.fillRect(-R, -R, 2 * R, 2 * R); MG.restore();
    MG.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = a; ctx.globalCompositeOperation = 'screen'; ctx.drawImage(MC, ANX - 760, -760, 1520, 856); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  }
  const BURST = Array.from({ length: 66 }, (_, i) => ({ ch: 'abcdefghijklmnopqrstuvwxyz'[Math.floor(rnd(i * 3.3) * 26)], vx: (rnd(i * 5.1) - .5) * 2300,
    vy: -(500 + rnd(i * 7.7) * 1500), sz: [28, 40, 56][i % 3], sp: (rnd(i * 2.9) - .5) * 14, x0: (rnd(i * 1.7) - .5) * 180 }));
  function impact(ctx, t) {                                         // grey glyphs knocked out of the bed, a flat shock ring, dust
    const s = t - tI; if (s <= 0 || s > 1.4) return; const a0 = ctx.globalAlpha, u = E.outCubic(clamp(s / .8));
    if (s < .8) { ctx.strokeStyle = ivo(.55 * (1 - s / .8)); ctx.lineWidth = 7 * (1 - u) + 1; ctx.beginPath(); ctx.ellipse(ANX, -6, 80 + 1500 * u, (80 + 1500 * u) * .07, 0, 0, Math.PI * 2); ctx.stroke(); }
    for (let i = 0; i < 16; i++) { const x = ANX + (rnd(i * 4.1) - .5) * (240 + 1000 * u), y = -20 - 90 * u * rnd(i * 2.3), r = 40 + 130 * u * (.6 + rnd(i)), al = .2 * (1 - s / 1.4);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(150,146,134,${al.toFixed(3)})`); g.addColorStop(1, 'rgba(150,146,134,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
    ctx.fillStyle = GREY; ctx.textAlign = 'center';
    for (const sz of [28, 40, 56]) { setFont(ctx, MN(sz, 400), 0);
      for (const b of BURST) { if (b.sz !== sz) continue; ctx.globalAlpha = a0 * (1 - s / 1.4); ctx.save(); ctx.translate(ANX + b.x0 + b.vx * s, -20 + b.vy * s + 1100 * s * s); ctx.rotate(b.sp * s); ctx.fillText(b.ch, 0, 0); ctx.restore(); } }
    ctx.textAlign = 'left'; ctx.globalAlpha = a0;
  }
  function motes(ctx, t) {                                          // warm dust rising off the coloured bed: the hold keeps breathing
    const s = t - tI - .2; if (s <= 0) return; const a0 = ctx.globalAlpha;
    for (let i = 0; i < 38; i++) { const d = rnd(i * 6.1) * 1.5, q = s - d; if (q <= 0) continue; const x = ANX - 1100 + rnd(i * 2.7) * 2000 + 30 * Math.sin(q * .9 + i), y = 40 - q * (35 + rnd(i * 8.3) * 75), r = 3 + rnd(i * 1.9) * 5;
      ctx.globalAlpha = a0 * .55 * clamp(q / .5) * (1 - clamp((-y - 400) / 300)); ctx.fillStyle = i % 3 ? 'rgb(255,214,160)' : IVORY; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = a0;
  }
  function anchorS4(ctx, t) {
    const p = pose(t); ctx.save(); ctx.translate(p.x, p.y + p.pv); ctx.rotate(p.r * D2R); ctx.translate(0, -p.pv);
    anchorGeo(ctx, 1, 40, rgb([233, 229, 216], [246, 228, 198], E.outCubic(inv(tI, tI + 1.2, t))), 'rgba(5,6,5,.88)'); ctx.restore();
  }
  function world4(ctx, t, pr, foc, items, c) {
    if (t < A.dan - .9) return;
    const kb = c.i === 3 ? c.k : 0;
    if (kb > 0) items.push({ d: 1e7, f: () => { const deep = sst(-3300, -500, c.ty - P4), g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, rgb([24, 26, 29], [13, 14, 15], deep)); g.addColorStop(1, 'rgb(7,8,8)'); ctx.globalAlpha = kb; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); } });
    const P = (dz, fn) => items.push({ z: Z4 + dz, x: 0, f: () => onPlane(ctx, pr, 0, P4, Z4 + dz, foc, () => { ctx.filter = 'none'; fn(); }) });
    for (const L of OC) {
      const a = L.a * E.outCubic(inv(A[L.on] - .45, A[L.on] + .55, t)) * (1 - (L.dz > 2000 ? .75 : 1) * E.inOutSine(inv(tI + .1, tI + 1.5, t)));
      const v = a > .004 && viewY(c, Z4 + L.dz); if (v) P(L.dz, () => ocean(ctx, L, a, v[0], v[1], L.x * 16 * (t - A.dan)));
    }
    if (t > A.mesin2 && IM.bedG) { P(40, () => bed(ctx, t, IM.bedG, IM.bedC, true)); P(-220, () => bed(ctx, t, IM.frG, IM.frC, false)); }
    if (t > tI) { P(20, () => bloom(ctx, t)); P(-30, () => impact(ctx, t)); P(-150, () => motes(ctx, t)); }
    if (t > tJ - .3) { P(0, () => anchorS4(ctx, t)); P(-12, () => { const n = t < tI || !CH ? chainLive(t, CB) : chainSim(t, CB); chainDraw(ctx, CB, n); }); }
  }

  // ── S2/S3: three paths (S2 nodes, S3 lines into the anchor ring) ──
  const NODE = [{ x: -560, y: -150, k: 'dari', l: ['SOAL YANG BISA', 'DICEK MESIN'] }, { x: 0, y: -230, k: 'dari2', l: ['COBA-COBA &', 'PENGALAMAN'] },
    { x: 560, y: -150, k: 'sama', l: ['TULISAN AI'] }];
  const RING = { x: 60, y: -238 };                                  // S3-local; S2 plane sits 1000 above S3 (py −1500 vs −500)
  const PATH = NODE.map((n, i) => { const p0 = [n.x, n.y - 1000 + 56], p1 = [n.x, -640], p2 = [RING.x + (i - 1) * 16, RING.y - 38], pts = [];
    for (let k = 0; k <= 60; k++) { const u = k / 60, a = (1 - u) ** 2, b = 2 * u * (1 - u), q = u * u; pts.push([a * p0[0] + b * p1[0] + q * p2[0], a * p0[1] + b * p1[1] + q * p2[1]]); } return pts; });
  const prog = (i, t) => { const t0 = A[NODE[i].k]; return .5 * E.outCubic(inv(t0 + .1, t0 + 1.4, t)) + .5 * E.inOutCubic(inv(A.soalnya - .35, A.berhasil + .3, t)); };
  const onPath = (pts, u) => { const f = clamp(u) * 60, i = Math.min(59, Math.floor(f)), v = f - i; return [lerp(pts[i][0], pts[i + 1][0], v), lerp(pts[i][1], pts[i + 1][1], v)]; };
  const LAB = ['wasit', 'alam', 'tulisan3'];
  function paths(ctx, t) {
    const a0 = ctx.globalAlpha;
    PATH.forEach((pts, i) => {
      const p = prog(i, t); if (p <= 0) return; const tl = A[LAB[i]], lit = t > tl ? 1 : 0, hot = lit ? Math.exp(-(t - tl) * 2.5) : 0, f = p * 60, e = onPath(pts, p);
      ctx.strokeStyle = ivo(.6 + .3 * lit + .1 * hot); ctx.lineWidth = 4 + 2 * lit + 6 * hot; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...pts[0]);
      for (let k = 1; k <= Math.floor(f); k++) ctx.lineTo(...pts[k]); ctx.lineTo(...e); ctx.stroke();
      ctx.fillStyle = IVORY;
      for (let q = 0; q < 2; q++) { const u = ((t - A[NODE[i].k]) * .32 + q * .5) % 1; if (u > p) continue; const [x, y] = onPath(pts, u);
        ctx.globalAlpha = a0 * .22; ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = a0; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill(); }
      if (p < 1) { ctx.beginPath(); ctx.arc(e[0], e[1], 8, 0, Math.PI * 2); ctx.fill(); }
    });
    ctx.globalAlpha = a0;
  }
  function nodes(ctx, t) {
    NODE.forEach((n, i) => {
      const t0 = A[n.k] - .03, lit = t > t0, k = pop(t, t0, .45, .3), s = lit ? .7 + .3 * k : 1;
      if (lit && t - t0 < .9) { const u = (t - t0) / .9; ctx.strokeStyle = ivo(.5 * (1 - u)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(n.x, n.y, 54 + 140 * E.outCubic(u), 0, Math.PI * 2); ctx.stroke(); }
      ctx.save(); ctx.translate(n.x, n.y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2);
      if (lit) { ctx.fillStyle = IVORY; ctx.fill(); } else { ctx.strokeStyle = ivo(.3); ctx.lineWidth = 4; ctx.stroke(); }
      setFont(ctx, DSP(72), 0); ctx.textAlign = 'center'; ctx.fillStyle = lit ? '#11120E' : ivo(.35); ctx.fillText(String(i + 1), 0, 26); ctx.textAlign = 'left'; ctx.restore();
      const ly = n.l.length === 2 ? [n.y - 152, n.y - 88] : [n.y - 88];
      n.l.forEach((s2, j) => { if (!lit) txt(ctx, s2, n.x, ly[j], t, A.dari - .4, DSP(64), { align: 'center', col: ivo(.22), rise: 0 });
        else fall(ctx, s2, n.x, ly[j], t, t0 + .06 + j * .08, DSP(64), { align: 'center' }); });
    });
  }

  async function load() {
    const AH = '../assets/shared/ahpo/', put = {
      lontarA: ['A02/A02-2_daun-lontar-Bali-a_H3-2', 3100], lontarB: ['A02/A02-3_daun-lontar-Bali-b_H3-2', 3000], emas: ['A02/A02-8_aksara-Bali-emas_B3-4', 1000],
      tump: ['A02/A02-1_tumpukan-lontar_H3-1', 600], lontara: ['A02/A02-5_lembar-Lontara_H3-4', 800], batak: ['A02/A02-6_pustaha-Batak_H3-5', 700],
      babad: ['A02/A02-4_naskah-Jawa-Babad_H3-3', 800], papan: ['A02/A02-7_aksara-Jawa-papan_B3-1', 2000], tangan: ['A01/A01-2_tangan-pena-cincin_H2-3', 800] };
    await Promise.all(Object.entries(put).map(async ([k, [f, w]]) => { IM[k] = await loadImg(AH + f + '.png', w); IM[k + '_s'] = await loadImg(AH + f + '_bayangan.png', w); }));
    IM.macro = await loadVid('../assets/shared/vid/', 'macro');
    // prose layers (far → near): dz, texture w×h (units), px/unit, font size, pre-blur (units, = kit DOF at dist 1500), alpha, cue, drift
    for (const [i, L] of [{ dz: 2200, w: 5800, h: 2600, r: .38, size: 40, bl: 35, a: .5, on: 'dan', x: 1 }, { dz: 900, w: 4000, h: 2000, r: .55, size: 34, bl: 14, a: .55, on: 'dan', x: -1 },
      { dz: 60, w: 3000, h: 1700, r: 1, size: 28, bl: 0, a: .62, on: 'internet', x: 1 }, { dz: -350, w: 2600, h: 1400, r: .8, size: 26, bl: 6, a: .55, on: 'makin2', x: -1 },
      { dz: -900, w: 2000, h: 1100, r: .9, size: 30, bl: 11, a: .5, on: 'rame', x: 1 }].entries()) OC.push({ ...L, c: proseTex(L, 3 + i * 17) });
    // bed composites at 1 px/unit, local x −1500..1500, y −420..480 (bed surface y 0)
    const comp = (pieces, base) => { const [c, g] = mk(3000, 900);
      if (base) { const gr = g.createLinearGradient(0, 380, 0, 900); gr.addColorStop(0, 'rgba(21,19,15,0)'); gr.addColorStop(.12, 'rgb(21,19,15)'); gr.addColorStop(1, 'rgb(11,10,8)'); g.fillStyle = gr; g.fillRect(0, 380, 3000, 520); }
      for (const [k, x, top, w, rot] of pieces) { const im = IM[k], h = w * im.height / im.width; g.save(); g.translate(x + w / 2 + 1500, top + h / 2 + 420); g.rotate((rot || 0) * D2R);
        g.globalAlpha = .85; g.drawImage(IM[k + '_s'], -w / 2, -h / 2, w, h); g.globalAlpha = 1; g.drawImage(im, -w / 2, -h / 2, w, h); g.restore(); }
      return c; };
    const grade = (src, f, bl) => { const [c, g] = mk(src.width, src.height); g.filter = f + (bl ? ` blur(${bl}px)` : ''); g.drawImage(src, 0, 0); return c; };
    const back = comp([['babad', 1000, -330, 560, 6], ['tangan', 640, -250, 640, -3], ['tump', -1180, -150, 380, -4], ['lontara', -800, -95, 560, -2.5],
      ['batak', -300, -80, 420, 3], ['lontarA', -1550, 20, 3100, -.8], ['lontarB', -1500, 175, 3000, 1], ['emas', ANX - 450, -45, 900, 0]], true);
    const front = comp([['papan', -1250, 95, 1900, -1]], false);
    IM.bedC = grade(back, 'saturate(1.08) contrast(1.04)'); IM.bedG = grade(back, 'grayscale(1) brightness(.38) contrast(1.15)');
    IM.frC = grade(front, 'saturate(1.05)', 3); IM.frG = grade(front, 'grayscale(1) brightness(.34) contrast(1.15)', 3);
    simChain();
  }

  const ST = [
    { at: 0, name: 'Pertanyaan awal', layers: [{ dz: 900, fn: (ctx, t) => {        // S1 · the title question returns; faint machine prose far behind
      const L = OC[1]; if (!L) return; ctx.filter = 'none'; ctx.globalAlpha = .22 * gone(t, A.dari - .45, .4); const sc = (t * 26) % L.h;
      for (let k = -1; k <= 1; k++) ctx.drawImage(L.c, -L.w / 2, -L.h / 2 - sc + k * L.h, L.w, L.h); } }],
      draw(ctx, t) {
        typeOn(ctx, 'JADI, BALIK KE PERTANYAAN AWAL', -840, -330, t, A.jadi + .05, MN(22), { ls: 4, cps: 40, col: ivo(.7) });
        fall(ctx, 'KALAU TULISAN MANUSIA', -840, -150, t, A.kalau - .04, DSP(150));
        const wM = fall(ctx, 'MAKIN ', -840, 0, t, A.makin - .04, DSP(150));
        if (t > A.makin + .12) {                                    // TIPIS thins: squeezed + fill gives way to a hairline
          const k = E.inOutCubic(inv(A.tipis - .02, A.tipis + .7, t)), a0 = ctx.globalAlpha; ctx.save(); ctx.translate(-840 + wM, (1 - spring(t - A.makin - .12, .55, .36)) * -80);
          ctx.scale(1 - .5 * k, 1); setFont(ctx, DSP(150), 0); ctx.globalAlpha = a0 * clamp((t - A.makin - .12) / .1);
          ctx.fillStyle = ivo(1 - .94 * k); ctx.fillText('TIPIS,', 0, 0); if (k > 0) { ctx.strokeStyle = ivo(.9 * k); ctx.lineWidth = 1.8 / (1 - .5 * k); ctx.strokeText('TIPIS,', 0, 0); }
          ctx.restore(); ctx.globalAlpha = a0; }
        fall(ctx, 'AI BELAJAR DARI MANA', -840, 220, t, A.ai - .04, DSP(190));
        if (t > A.mana - .02) {                                     // the "?" hangs from its top and swings, never quite still
          setFont(ctx, DSP(190), 0); const wA = ctx.measureText('AI BELAJAR DARI MANA').width, qw = ctx.measureText('?').width, s = t - A.mana + .02;
          const ang = (14 * Math.exp(-2.5 * s) * Math.sin(7 * s) + 1.2 * Math.sin(t * 2.1)) * D2R, a0 = ctx.globalAlpha;
          ctx.save(); ctx.translate(-840 + wA + 12 + qw / 2, 80); ctx.rotate(ang); ctx.globalAlpha = a0 * clamp(s / .08); ctx.fillStyle = IVORY; ctx.fillText('?', -qw / 2, 140); ctx.restore(); ctx.globalAlpha = a0; }
      } },
    { at: A.dari, via: 'whip', name: 'Tiga jalan', x: 0, z: 2600, py: -1500,             // S2 · three paths light up in turn
      cam: t => { const u = E.inOutSine(inv(A.dari, A.soalnya, t)); return { tx: lerp(-120, 140, u), ty: -1540, tz: 2600, dist: lerp(1580, 1440, u), yaw: lerp(4, -3, u), pitch: 5 }; },
      draw(ctx, t) {
        nodes(ctx, t);
        typeOn(ctx, '2 + 2 = 4', -900, 50, t, A.dicek - .05, MN(34), { cps: 24, col: ivo(.85) });
        check(ctx, -665, 40, 34, E.outCubic(inv(A.mesin - .05, A.mesin + .25, t)), IVORY);
        for (let j = 0; j < 3; j++) cross(ctx, 80 + j * 56, 30, 30, E.outCubic(inv(A.cobacoba + j * .26, A.cobacoba + j * .26 + .18, t)), ivo(.5));
        check(ctx, 80 + 3 * 56 - 14, 36, 32, E.outCubic(inv(A.pengalaman - .05, A.pengalaman + .25, t)), IVORY);
        MACH4.forEach((s, j) => typeOn(ctx, s, 620, -14 + j * 30, t, A.tulisan2 - .05 + j * .12, MN(19, 400), { cps: 70, col: GREY }));
        txt(ctx, 'asal nggak ngebuang', 620, 160, t, A.asal - .05, SRF(40), { col: IVORY });
        markLine(ctx, 'yang ', 'ASLI', '.', 620, 222, t, A.ngebuang - .05, A.asli - .03, SRF(46), { align: 'left' });
      } },
    { at: A.soalnya, via: 'push', dur: 1.0, name: 'Jangkar', x: 0, z: 2600, py: -500, dist: [1580, 1500],   // S3 · the paths meet in one anchor
      draw(ctx, t) {
        paths(ctx, t);
        popAt(ctx, RING.x, RING.y, t, A.satu - .03, () => { ctx.strokeStyle = IVORY; ctx.lineWidth = 11; ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.stroke(); });
        if (t > A.jangkar - .05) { const s = t - A.jangkar + .05, p = E.outCubic(clamp(s / .85)); ctx.save(); ctx.translate(RING.x, RING.y);
          ctx.rotate(6 * Math.exp(-3 * s) * Math.sin(6 * s) * D2R); ctx.translate(0, -RING.y + (1 - Math.min(1, spring(s, .5, .4))) * -50); ctx.scale(.9, .9);
          ctx.translate(0, 230 / .9); anchorGeo(ctx, p, 12, IVORY, null, true); ctx.restore(); }
        if (t > A.dunia - .05) { const k = E.outCubic(inv(A.dunia - .05, A.dunia + .6, t)); ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60 - 860 * k, 262); ctx.lineTo(60 + 860 * k, 262); ctx.stroke();
          ctx.fillStyle = ivo(.35); for (let i = -8; i <= 8; i++) if (Math.abs(i * 100) <= 860 * k) ctx.fillRect(60 + i * 100 - 1, 262, 2, 14); }
        if (t > A.nyata - .05 && t < A.nyata + 1.2) { const s = t - A.nyata + .05, a0 = ctx.globalAlpha; ctx.fillStyle = IVORY;
          for (let i = 0; i < 14; i++) { ctx.globalAlpha = a0 * .3 * (1 - s / 1.25); ctx.beginPath(); ctx.arc(60 + (rnd(i * 3.7) - .5) * 300 * (1 + 1.5 * s), 255 - 110 * s * rnd(i + 3), 6 + 26 * s * rnd(i * 1.3), 0, Math.PI * 2); ctx.fill(); }
          ctx.globalAlpha = a0; }
        fall(ctx, 'SATU SYARAT:', -860, -200, t, A.satu - .03, DSP(96));
        fall(ctx, 'JANGKAR KE', -860, -40, t, A.jangkar - .03, DSP(150));
        fall(ctx, 'DUNIA NYATA.', -860, 110, t, A.dunia - .03, DSP(150));
        [['WASIT YANG JUJUR', 'wasit', -150], ['ALAM NYATA', 'alam', -40], ['TULISAN MANUSIA', 'tulisan3', 70]].forEach(([s, k, y], i) => {
          const t0 = A[k] - .03; if (t <= t0) return;
          popAt(ctx, 372, y - 26, t, t0, () => { ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.stroke();
            setFont(ctx, DSP(30), 0); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(String(i + 1), 0, 11); ctx.textAlign = 'left'; });
          fall(ctx, s, 410, y, t, t0 + .05, DSP(72)); });
        markLine(ctx, 'YANG ', 'ASLI', '.', 410, 180, t, A.manusia2 - .05, A.asli2 - .03, DSP(72), { align: 'left' });
      } },
    { at: A.dan, via: 'push', dur: 1.0, name: 'Lautan & dasar', x: 0, z: Z4, py: P4, cam: camS4, world: world4 },   // S4 · dive, fall, slam, colour
  ];

  function over(o, t) {                                             // screen space: slam flash, the final line, ASLI stamp, white
    if (t < tI - .05) return;
    const s = t - tI, fl = s > 0 ? .5 * Math.exp(-s * 10) : 0, w = E.inOutSine(inv(A.sendiri + 1.45, A.sendiri + 2.25, t)), wa = Math.min(1, fl + .94 * w);
    if (wa > .003) { o.globalAlpha = wa; o.fillStyle = '#F1EFE6'; o.fillRect(0, 0, W, H); o.globalAlpha = 1; }
    const ink = a => { const c = [lerp(241, 21, w), lerp(239, 22, w), lerp(230, 15, w)].map(Math.round); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };
    o.save(); const z = 1 + .025 * inv(A.ya, DUR, t); o.translate(150, 500); o.scale(z, z); o.translate(-150, -500);
    txt(o, 'jangkar itu… ternyata ya', 150, 300, t, A.ya - .3, SRF(52), { col: ink(.88) });
    fall(o, 'KITA', 140, 500, t, A.kita - .04, DSP(210), { col: ink(1) });
    fall(o, 'SENDIRI.', 140, 700, t, A.sendiri - .04, DSP(210), { col: ink(1) });
    o.restore();
    stamp(o, 'ASLI', 935, 625, t, A.sendiri + .55, { size: 110, rot: -8 });
  }
  return makeChapter({ B, ST, load, label: 'PUNCAK · JANGKAR', over });
}
