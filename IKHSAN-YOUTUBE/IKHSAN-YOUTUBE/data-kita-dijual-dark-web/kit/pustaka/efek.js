// pustaka · efek.js — efek, partikel, tekstur, retak, embun beku, cahaya, kabel, hujan kata, pecahan gambar. Dipanen dari
// ai-bubble-dompet (Retak Layar, Garis Retak, Embun Beku, Kabel Gelap) dan ai-data-habis (Jangkar: rantai, lautan tulisan,
// cincin warna, mekar cahaya, benturan, debu; hujan kata + tangki; pecahan grid). Semua unit lokal stasiun berpusat di (x, y),
// deterministik (rnd), hormati alpha yang masuk. Efek layar penuh (screenCrack snap, frost) juga jalan di post/over (transform identitas).
import { clamp, inv, lerp, E, GREY, INK, INKRGB, ivo, setFont, MN, SRF, rnd, mk } from '../kit.js';
import { KATA, tileTex } from './dasar.js';

const IV = a => `rgba(241,239,230,${a})`;                 // highlight on dark material (glass edge, lit core): stays ivory in both themes
const TAU = Math.PI * 2;
const sst = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
// partial polyline: pts [[x, y, cumLen], …] drawn up to length vis (shared by the crack effects)
const part = (ctx, pts, vis, dx = 0, dy = 0) => { ctx.moveTo(pts[0][0] + dx, pts[0][1] + dy); for (let i = 1; i < pts.length; i++) { const p = pts[i], q = pts[i - 1];
  if (p[2] <= vis) { ctx.lineTo(p[0] + dx, p[1] + dy); continue; } const u = (vis - q[2]) / (p[2] - q[2]); ctx.lineTo(lerp(q[0], p[0], u) + dx, lerp(q[1], p[1], u) + dy); break; } };
const ptAt = (pts, vis) => { for (let i = 1; i < pts.length; i++) if (pts[i][2] >= vis) { const p = pts[i], q = pts[i - 1], u = (vis - q[2]) / ((p[2] - q[2]) || 1); return [lerp(q[0], p[0], u), lerp(q[1], p[1], u)]; }
  const l = pts[pts.length - 1]; return [l[0], l[1]]; };

// ── Retak Layar ─────────────────────────────────────────────────────────────────────────────────────────────
const RETAK = new Map(), SNAP = new Map();
function crackGeo(seed, nr, k) {                            // 13 jagged rays from the impact + 2 sprigs each + ring cracks at R 48/120/250
  const rays = [], br = [], rings = [], S = seed * 1000;
  for (let i = 0; i < nr; i++) {
    let a = i / nr * TAU + (rnd(S + i + 300) - .5) * .35, x = 0, y = 0, len = 0; const pts = [[0, 0, 0]], L = (1300 + rnd(S + i + 310) * 700) * k;
    for (let j = 0; len < L; j++) { const st = (40 + rnd(S + i * 31 + j) * 70) * k; a += (rnd(S + i * 17 + j * 3.3) - .5) * .32; x += Math.cos(a) * st; y += Math.sin(a) * st; len += st; pts.push([x, y, len]); }
    rays.push({ pts, L, d: rnd(S + i + 330) * .07 });
  }
  rays.forEach((r, i) => { for (let b = 0; b < 2; b++) {
    const j = 2 + Math.floor(rnd(S + i * 7 + b) * (r.pts.length - 4)), p = r.pts[j];
    let a = Math.atan2(p[1], p[0]) + (rnd(S + i * 9 + b) < .5 ? -1 : 1) * (.5 + rnd(S + i + b * 5) * .5), x = p[0], y = p[1], len = 0; const pts = [[x, y, 0]], L = (120 + rnd(S + i * 5 + b) * 260) * k;
    for (let q = 0; len < L; q++) { const st = (26 + rnd(S + q + i * 13 + b) * 40) * k; a += (rnd(S + q * .7 + i * 3 + b) - .5) * .5; x += Math.cos(a) * st; y += Math.sin(a) * st; len += st; pts.push([x, y, len]); }
    br.push({ ray: i, at: p[2], pts, L }); } });
  const nearR = (r, R) => r.pts.find(p => Math.hypot(p[0], p[1]) >= R) || r.pts[r.pts.length - 1];
  [48, 120, 250].forEach((R0, q) => rays.forEach((r, i) => { if (rnd(S + i * 11 + q) > .72) return; const a = nearR(r, R0 * k), b = nearR(rays[(i + 1) % nr], R0 * k);
    rings.push({ R: R0, pts: [a, [(a[0] + b[0]) / 2 + (rnd(S + i + q * 7) - .5) * 18 * k, (a[1] + b[1]) / 2 + (rnd(S + i * 2 + q) - .5) * 18 * k], b] }); }));
  return { rays, br, rings };
}
const wedge = (ctx, r, r2, f) => { ctx.beginPath(); const p0 = f(0, 0); ctx.moveTo(p0[0], p0[1]); r.pts.forEach(p => { const q = f(p[0], p[1]); ctx.lineTo(q[0], q[1]); });
  for (let i = r2.pts.length - 1; i >= 0; i--) { const q = f(r2.pts[i][0], r2.pts[i][1]); ctx.lineTo(q[0], q[1]); } ctx.closePath(); };
// layar retak dari satu titik: 13 sinar bergerigi melesat (outExpo .42 s), retak cincin, inti beku, kilat, 26 serpih kaca; tiap irisan membiaskan isi beberapa px · o: seed, r skala (1 = selebar layar), n sinar, geser=5 px, w tebal, src+rect [x,y,w,h] gambar yang dibiaskan, snap:true bias kanvas (pakai di post), flash:false, chip=26 · asal: ai-bubble-dompet bab-2/src/film.js:363 · ledger: retak-layar
export function screenCrack(ctx, x, y, t, t0, o = {}) {
  const s = t - t0; if (s <= 0) return;
  const k = o.r ?? 1, nr = o.n ?? 13, key = `${o.seed ?? 0}|${nr}|${k}`;
  let G = RETAK.get(key); if (!G) RETAK.set(key, G = crackGeo(o.seed ?? 0, nr, k));
  const { rays, br, rings } = G, a0 = ctx.globalAlpha, w = o.w ?? 1, vis = r => r.L * E.outExpo(clamp((s - r.d) / .42));
  const m = (o.geser ?? 5) * E.outCubic(clamp(s / .5));      // refraction: each wedge between two rays shifts a few px
  const shift = i => { const r = rays[i], r2 = rays[(i + 1) % nr], a = Math.atan2(r.pts[3][1] + r2.pts[3][1], r.pts[3][0] + r2.pts[3][0]), mm = m * (.4 + rnd(i + 70)); return [Math.cos(a) * mm, Math.sin(a) * mm]; };
  const tint = i => rnd(i + 90) < .5 ? `rgba(255,255,255,${.035 * m / 5})` : `rgba(0,0,0,${.06 * m / 5})`;
  if (m > .05 && o.src) {                                      // local: refract the given image (a phone screen, a photo)
    const [rx, ry, rw, rh] = o.rect;
    rays.forEach((r, i) => { const [dx, dy] = shift(i); ctx.save(); ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip(); wedge(ctx, r, rays[(i + 1) % nr], (px, py) => [x + px, y + py]); ctx.clip();
      ctx.drawImage(o.src, rx + dx, ry + dy, rw, rh); ctx.fillStyle = tint(i); ctx.fillRect(rx, ry, rw, rh); ctx.restore(); });
  } else if (m > .05 && o.snap) {                              // screen: snapshot what is already on the canvas, in device pixels
    const c = ctx.canvas, T = ctx.getTransform(), sk = `${c.width}x${c.height}`;
    let S = SNAP.get(sk); if (!S) SNAP.set(sk, S = mk(c.width, c.height)); const [sc, sx] = S; sx.globalCompositeOperation = 'copy'; sx.drawImage(c, 0, 0);
    const f = (px, py) => [T.a * (x + px) + T.c * (y + py) + T.e, T.b * (x + px) + T.d * (y + py) + T.f];
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    rays.forEach((r, i) => { const [dx, dy] = shift(i); ctx.save(); wedge(ctx, r, rays[(i + 1) % nr], f); ctx.clip();
      ctx.drawImage(sc, T.a * dx + T.c * dy, T.b * dx + T.d * dy); ctx.fillStyle = tint(i); ctx.fillRect(0, 0, c.width, c.height); ctx.restore(); });
    ctx.restore();
  }
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lines = () => { ctx.beginPath(); rays.forEach(r => part(ctx, r.pts, vis(r)));
    br.forEach(b => { const v = vis(rays[b.ray]) - b.at; if (v > 0) part(ctx, b.pts, v * .8); });
    rings.forEach(g => { if (s > .05 + g.R / 2400) { ctx.moveTo(g.pts[0][0], g.pts[0][1]); ctx.lineTo(g.pts[1][0], g.pts[1][1]); ctx.lineTo(g.pts[2][0], g.pts[2][1]); } }); };
  lines(); ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = 3.2 * w; ctx.stroke();
  ctx.translate(-w, -w); lines(); ctx.strokeStyle = IV(.78); ctx.lineWidth = 1.2 * w; ctx.stroke(); ctx.translate(w, w);
  const rc = 70 * k, gl = ctx.createRadialGradient(0, 0, 0, 0, 0, rc); gl.addColorStop(0, IV(.32)); gl.addColorStop(1, IV(0));
  ctx.fillStyle = gl; ctx.fillRect(-rc, -rc, 2 * rc, 2 * rc);           // the frosted impact core stays
  const fl = Math.exp(-s / .07), rf = 240 * k; if (fl > .02 && o.flash !== false) { const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, rf);
    g2.addColorStop(0, `rgba(255,255,255,${.85 * fl})`); g2.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g2; ctx.fillRect(-rf, -rf, 2 * rf, 2 * rf); }
  if (s < .9) { ctx.fillStyle = INK; ctx.globalAlpha = a0 * clamp(1 - s / .9); ctx.beginPath();   // glass chips thrown off the impact (one path)
    for (let i = 0; i < (o.chip ?? 26); i++) {
      const a = rnd(i + 500) * TAU, v = (300 + rnd(i + 510) * 700) * k, px = Math.cos(a) * v * s, py = Math.sin(a) * v * s + 900 * s * s, z = 3 + rnd(i + 520) * 7, ro = s * 12 + i, cs = Math.cos(ro), sn = Math.sin(ro);
      const P = (u, v2) => [px + u * cs - v2 * sn, py + u * sn + v2 * cs], A = P(-z, -z * .4), B = P(z, -z * .7), C = P(z * .2, z);
      ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.lineTo(C[0], C[1]); ctx.closePath(); }
    ctx.fill(); }
  ctx.restore(); ctx.globalAlpha = a0;
}

// ── Garis Retak ─────────────────────────────────────────────────────────────────────────────────────────────
// (geometri) retakan melewati titik-titik v [[x, y], …]: bergerigi di antaranya (tidak di titik), panjang kumulatif, ranting di indeks o.br → C untuk drawCrack · o: jag=12, step=30, br, sprig=120 · asal: ai-bubble-dompet bab-3/src/film.js:24 · ledger: garis-retak
export function crackLine(v, seed, o = {}) {
  const jag = o.jag ?? 12, step = o.step ?? 30, P = [[v[0][0], v[0][1], 0]], VL = [0]; let len = 0;
  for (let i = 1; i < v.length; i++) { const [ax, ay] = v[i - 1], [bx, by] = v[i], d = Math.hypot(bx - ax, by - ay) || 1, n = Math.max(1, Math.round(d / step)), nx = -(by - ay) / d, ny = (bx - ax) / d;
    for (let j = 1; j <= n; j++) { const u = j / n, e = j === n ? 0 : (rnd(seed + i * 37 + j * 1.7) - .5) * 2 * jag, x = lerp(ax, bx, u) + nx * e, y = lerp(ay, by, u) + ny * e, q = P[P.length - 1];
      len += Math.hypot(x - q[0], y - q[1]); P.push([x, y, len]); } VL.push(len); }
  const br = [];
  for (const vi of o.br || []) for (let b = 0; b < 2; b++) {
    const [ax, ay] = v[vi], nb = v[Math.min(vi + 1, v.length - 1)], pv = v[Math.max(vi - 1, 0)];
    let a = Math.atan2(nb[1] - pv[1], nb[0] - pv[0]) + (b ? 1 : -1) * (.9 + rnd(seed + vi * 13 + b) * .9), x = ax, y = ay, l = 0; const pts = [[x, y, 0]], L = 50 + rnd(seed + vi * 7 + b * 3) * (o.sprig ?? 120);
    for (let k = 0; l < L; k++) { const st = 14 + rnd(seed + k * 3.1 + vi + b) * 18; a += (rnd(seed + k * .7 + vi * 3 + b) - .5) * .7; x += Math.cos(a) * st; y += Math.sin(a) * st; l += st; pts.push([x, y, l]); }
    br.push({ at: VL[vi], P: pts, L: l });
  }
  return { P, L: len, VL, br };
}
// retakan kaca menjalar sampai panjang vis: halo beku, badan gelap tergeser, tepi kaca terang, kepala bercahaya (o.head) · C.VL[i] = panjang di titik i (untuk memukul beat) · o: w, glow, head · asal: ai-bubble-dompet bab-3/src/film.js:39 · ledger: garis-retak
export function drawCrack(ctx, C, vis, o = {}) {
  if (vis <= 0) return; const w = o.w ?? 1; ctx.save(); ctx.lineJoin = 'miter'; ctx.lineCap = 'round';
  const path = (dx, dy) => { ctx.beginPath(); part(ctx, C.P, Math.min(vis, C.L), dx, dy); for (const b of C.br) if (vis > b.at) part(ctx, b.P, (vis - b.at) * 2.2, dx, dy); };
  path(0, 0); ctx.strokeStyle = IV(.07 * (o.glow ?? 1)); ctx.lineWidth = 16 * w; ctx.stroke();    // frost halo
  path(1.6 * w, 2.2 * w); ctx.strokeStyle = 'rgba(0,0,0,.62)'; ctx.lineWidth = 5.5 * w; ctx.stroke();   // the dark body of the crack
  path(0, 0); ctx.strokeStyle = IV(.93); ctx.lineWidth = 2.3 * w; ctx.stroke();                         // the lit glass edge
  if (o.head && vis < C.L) { const [hx, hy] = ptAt(C.P, vis), g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 34 * w);
    g.addColorStop(0, 'rgba(255,255,255,.85)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(hx - 34 * w, hy - 34 * w, 68 * w, 68 * w); }
  ctx.restore();
}
const STARS = new Map();
// jaring laba-laba di titik garis patah: 9 retak pendek melesat (.18 s) · o: seed=1, R=120, n=9, w=.55, glow=.6 · asal: ai-bubble-dompet bab-3/src/film.js:50 · ledger: garis-retak
export function crackStar(ctx, x, y, t, t0, o = {}) {
  const s = t - t0; if (s <= 0) return; const seed = o.seed ?? 1, R = o.R ?? 120, n = o.n ?? 9, key = `${seed}|${R}|${n}`;
  let G = STARS.get(key); if (!G) STARS.set(key, G = Array.from({ length: n }, (_, i) => { const a = i / n * TAU + (rnd(seed + i) - .5) * .5, L = R * (.45 + rnd(seed + i + 20) * .6);
    return crackLine([[0, 0], [Math.cos(a) * L, Math.sin(a) * L]], seed + i * 11, { jag: 5, step: 14 }); }));
  const k = E.outExpo(clamp(s / .18)); ctx.save(); ctx.translate(x, y); for (const c of G) drawCrack(ctx, c, c.L * k, { w: o.w ?? .55, glow: o.glow ?? .6 }); ctx.restore();
}
// serpih kaca segitiga terlempar ke atas lalu jatuh (gravitasi 1100, hidup 1,6 s) · o: n=14, seed=1, spread=2.6 rad, rgb · shake(t, t0, amp=16) → px guncang kamera sesudah benturan · asal: ai-bubble-dompet bab-3/src/film.js:56 · ledger: garis-retak
export function shards(ctx, x, y, t, t0, o = {}) {
  const s = t - t0; if (s <= 0 || s > 1.6) return; const a0 = ctx.globalAlpha, n = o.n ?? 14, sd = (o.seed ?? 1) * 50, c = o.rgb ?? '241,239,230';
  ctx.save(); ctx.globalAlpha = a0 * clamp((1.6 - s) / .5);
  for (const al of [.88, .42]) { ctx.fillStyle = `rgba(${c},${al})`; ctx.beginPath();
    for (let i = 0; i < n; i++) { if ((i % 3 ? .88 : .42) !== al) continue;
      const a = -Math.PI / 2 + (rnd(sd + i) - .5) * (o.spread ?? 2.6), v = 180 + rnd(sd + i + 9) * 420, z = 5 + rnd(sd + i + 17) * 12;
      const px = x + Math.cos(a) * v * s, py = y + Math.sin(a) * v * s + 1100 * s * s, ro = s * (6 + i % 5) + i, cs = Math.cos(ro), sn = Math.sin(ro);
      const P = (u, w) => [px + u * cs - w * sn, py + u * sn + w * cs], A = P(-z, -z * .35), B = P(z, -z * .8), C = P(z * .25, z);
      ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.lineTo(C[0], C[1]); ctx.closePath(); }
    ctx.fill(); }
  ctx.restore();
}
// (gerak) guncangan teredam setelah benturan: tambahkan ke posisi kamera/objek, 0 di luar .6 s · asal: ai-bubble-dompet bab-3/src/film.js:64 · ledger: garis-retak
export const shake = (t, t0, amp = 16) => { const s = t - t0; return s > 0 && s < .6 ? amp * Math.exp(-s / .12) * Math.sin(s * 80) : 0; };

// ── Embun Beku ──────────────────────────────────────────────────────────────────────────────────────────────
const FROST = new Map();
function frostBuild(w, h, seed, N) {                        // dendrites from N edge seeds, Path2D binned by growth distance (24 px)
  const BIN = 24, bins = []; let sd = 7000 + seed * 10007;
  const seg = (d, x0, y0, x1, y1, th) => { const b = Math.floor(d / BIN), bn = bins[b] ??= { a: new Path2D(), b: new Path2D() }, P = th ? bn.a : bn.b; P.moveTo(x0, y0); P.lineTo(x1, y1); };
  function grow(x, y, a, L, dep, d) {
    let l = 0;
    while (l < L) {
      const st = 8 + rnd(sd++) * 9; a += (rnd(sd++) - .5) * .32; const nx = x + Math.cos(a) * st, ny = y + Math.sin(a) * st;
      seg(d, x, y, nx, ny, dep < 2); x = nx; y = ny; l += st; d += st;
      if (dep < 3 && rnd(sd++) < .2) grow(x, y, a + (rnd(sd++) < .5 ? -1 : 1) * (.65 + rnd(sd++) * .45), (L - l) * (.4 + rnd(sd++) * .3), dep + 1, d);
      else if (rnd(sd++) < .16) grow(x, y, a + (rnd(sd++) < .5 ? -1.15 : 1.15), 12 + rnd(sd++) * 22, 4, d);
    }
  }
  const PER = 2 * (w + h), so = seed * 131;
  for (let i = 0; i < N; i++) {
    const p = (i + rnd(i * 3.3 + so) * .8) / N * PER; let x, y, n, cn;
    if (p < w) { x = p; y = 0; n = Math.PI / 2; cn = 1 - Math.min(x, w - x) / (w / 2); }
    else if (p < w + h) { x = w; y = p - w; n = Math.PI; cn = 1 - Math.min(y, h - y) / (h / 2); }
    else if (p < 2 * w + h) { x = 2 * w + h - p; y = h; n = -Math.PI / 2; cn = 1 - Math.min(x, w - x) / (w / 2); }
    else { x = 0; y = PER - p; n = 0; cn = 1 - Math.min(y, h - y) / (h / 2); }
    grow(x, y, n + (rnd(i + 91 + so) - .5) * 1.1, 90 + 330 * Math.pow(cn, 1.6) + rnd(i + 57 + so) * 70, 0, 0);
  }
  return { bins, BIN };
}
// embun beku: dendrit es tumbuh dari tepi kotak w×h ke dalam (paling panjang di sudut) + kabut tepi; layar penuh = (W/2, H/2, W, H) di post · o: dur=2.7, jauh=600 px tumbuh, p 0..1 manual, a, rgb (default tinta tema), seed, n=64 · asal: ai-bubble-dompet bab-4/src/film.js:71 · ledger: embun-beku
export function frost(ctx, x, y, w, h, t, t0, o = {}) {
  const p = o.p ?? E.outCubic(inv(t0, t0 + (o.dur ?? 2.7), t)), F = (o.jauh ?? 600) * p, a = o.a ?? 1; if (a <= .002 || F <= 0) return;
  const key = `${w}|${h}|${o.seed ?? 0}|${o.n ?? 64}`; let FR = FROST.get(key); if (!FR) FROST.set(key, FR = frostBuild(w, h, o.seed ?? 0, o.n ?? 64));
  const a0 = ctx.globalAlpha, rgb = o.rgb ?? INKRGB, c = al => `rgba(${rgb},${al})`;
  ctx.save(); ctx.translate(x - w / 2, y - h / 2); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const D = 70 + F * .38, fog = (x0, y0, x1, y1, rx, ry, rw, rh) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, c(.22 * a)); g.addColorStop(1, c(0)); ctx.fillStyle = g; ctx.fillRect(rx, ry, rw, rh); };
  fog(0, 0, 0, D, 0, 0, w, D); fog(0, h, 0, h - D, 0, h - D, w, D); fog(0, 0, D, 0, 0, 0, D, h); fog(w, 0, w - D, 0, w - D, 0, D, h);
  const nb = F / FR.BIN; ctx.strokeStyle = c(1);
  for (let b = 0; b < Math.min(Math.ceil(nb), FR.bins.length); b++) { const bn = FR.bins[b]; if (!bn) continue; const ea = a * clamp(nb - b);
    ctx.globalAlpha = a0 * ea * .13; ctx.lineWidth = 6; ctx.stroke(bn.a);
    ctx.globalAlpha = a0 * ea * .8; ctx.lineWidth = 1.8; ctx.stroke(bn.a);
    ctx.globalAlpha = a0 * ea * .55; ctx.lineWidth = 1; ctx.stroke(bn.b); }
  ctx.restore(); ctx.globalAlpha = a0;
}

// ── Kabel Gelap ─────────────────────────────────────────────────────────────────────────────────────────────
const FIB = [[0, 0], ...Array.from({ length: 7 }, (_, i) => [.4, i / 7 * TAU + .3]), ...Array.from({ length: 12 }, (_, i) => [.76, i / 12 * TAU])]
  .map(([r, a]) => [r * Math.cos(a), r * Math.sin(a)]);
const RANK = (() => { const o = Array.from({ length: 19 }, (_, i) => i + 1).sort((a, b) => rnd(a * 7.7) - rnd(b * 7.7)), r = [0]; o.forEach((f, k) => r[f] = k); return r; })();
const flick = (t, i) => rnd(Math.floor(t * 30) * 3.7 + i * 11) > .45 ? 1 : .15;
const dieOut = (t, t0, i, step) => { if (i === 0) return 1; const a = t0 + RANK[i] * step, u = inv(a - .12, a, t); return u <= 0 ? 1 : u >= 1 ? 0 : flick(t, i) * (1 - u); };
const relight = (t, t0, i, step) => { if (i === 0) return 1; const a = t0 + RANK[i] * step, u = inv(a, a + .1, t); return u <= 0 ? 0 : u >= 1 ? 1 : flick(t, i) * u; };
// penampang kabel serat optik: selubung gelap, 20 inti (1+7+12) menyala; o.mati = detik inti padam satu-satu sambil berkedip, o.nyala = detik menyala lagi (inti tengah tetap) · o: lit(i) → 0..1, step=.035, step2=.07 · asal: ai-bubble-dompet puncak/src/film.js:22 · ledger: kabel-gelap-bundle
export function fibreBundle(ctx, x, y, R, t, t0, o = {}) {
  const lit = o.lit ?? (i => o.nyala != null && t >= o.nyala ? relight(t, o.nyala, i, o.step2 ?? .07) : o.mati != null ? dieOut(t, o.mati, i, o.step ?? .035) : 1);
  const a0 = ctx.globalAlpha; ctx.save(); ctx.translate(x, y);
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.fillStyle = '#10110D'; ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.strokeStyle = IV(.6); ctx.lineWidth = 5; ctx.stroke();
  ctx.strokeStyle = IV(.14); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, R * .93, 0, TAU);
  for (let k = 0; k < 40; k++) { const a = k / 40 * TAU; ctx.moveTo(Math.cos(a) * R * .93, Math.sin(a) * R * .93); ctx.lineTo(Math.cos(a) * R * .97, Math.sin(a) * R * .97); }
  ctx.stroke();
  const rf = R * .105;
  FIB.forEach(([fx, fy], i) => {
    const L = clamp(lit(i)), cx = fx * R, cy = fy * R;
    ctx.fillStyle = '#1E1F19'; ctx.strokeStyle = IV(.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rf, 0, TAU); ctx.fill(); ctx.stroke();
    if (L > .01) { const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rf * 2.8); g.addColorStop(0, IV(.55 * L)); g.addColorStop(1, IV(0)); ctx.fillStyle = g; ctx.fillRect(cx - rf * 2.8, cy - rf * 2.8, rf * 5.6, rf * 5.6); }
    ctx.fillStyle = L > .01 ? `rgba(255,253,244,${.12 + .88 * L})` : '#0B0C09'; ctx.beginPath(); ctx.arc(cx, cy, rf * .55, 0, TAU); ctx.fill();
  });
  ctx.restore(); ctx.globalAlpha = a0;
}
// satu serat terkubur: selubung gelap + inti terang dengan denyut cahaya berjalan (.55 putaran/s) · o: L 0..1 terang, seed · asal: ai-bubble-dompet puncak/src/film.js:50 · ledger: kabel-gelap-bundle
export function fibreLine(ctx, x, y, w, t, t0, o = {}) {
  const x0 = x - w / 2, x1 = x + w / 2, L = o.L ?? 1; ctx.save();
  ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x0, y + 2); ctx.lineTo(x1, y + 2); ctx.stroke();
  ctx.strokeStyle = IV(.13 + .72 * L); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  if (L > .05 && w > 80) { const ph = (((t - t0) * .55 + rnd(o.seed ?? 0)) % 1 + 1) % 1, px = lerp(x0, x1, ph), g = ctx.createRadialGradient(px, y, 0, px, y, 40);
    g.addColorStop(0, IV(.7 * L)); g.addColorStop(1, IV(0)); ctx.fillStyle = g; ctx.fillRect(px - 40, y - 40, 80, 80); }
  ctx.restore();
}
// penampang tanah gelap: butir, cahaya permukaan, garis tanah terang (kotak w×h, atas = permukaan) · o: col='#13140F', n butir (default per luas), seed · asal: ai-bubble-dompet puncak/src/film.js:42 · ledger: kabel-gelap-bundle
export function soil(ctx, x, y, w, h, o = {}) {
  const x0 = x - w / 2, y0 = y - h / 2, n = o.n ?? Math.round(260 * w * h / (2000 * 620)), sd = o.seed ?? 0; ctx.save();
  ctx.fillStyle = o.col ?? '#13140F'; ctx.fillRect(x0, y0, w, h);
  ctx.fillStyle = IV(.07); ctx.beginPath();
  for (let i = 0; i < n; i++) { const px = x0 + rnd(i + 500 + sd) * w, py = y0 + 14 + rnd(i + 900 + sd) * (h - 60), r = 1 + rnd(i + 1300 + sd) * 2.4; ctx.moveTo(px + r, py); ctx.arc(px, py, r, 0, TAU); }
  ctx.fill();
  const g = ctx.createLinearGradient(0, y0, 0, y0 + 120); g.addColorStop(0, IV(.06)); g.addColorStop(1, IV(0)); ctx.fillStyle = g; ctx.fillRect(x0, y0, w, 120);
  ctx.fillStyle = IV(.55); ctx.fillRect(x0, y0 - 1.5, w, 3); ctx.restore();
}

// ── Rantai verlet (Jangkar) ─────────────────────────────────────────────────────────────────────────────────
// (fisika, sekali di load) rantai verlet 240 Hz, 20 iterasi, disampel 120 Hz: mata 0 ikut top(s) → [x, y], sisanya jatuh dan menumpuk di lantai · o: n=50, l=36, g=2700, dur=4, floor=-8, top(s), v0(j) → [vx, vy] · asal: ai-data-habis puncak/src/film.js:109
export function chainSim(o = {}) {
  const N = o.n ?? 50, n = N + 1, l = o.l ?? 36, dt = 1 / 240, G = o.g ?? 2700, fl = o.floor ?? -8, dur = o.dur ?? 4, top = o.top ?? (() => [0, -560]);
  const v0 = o.v0 ?? (j => [(120 + 380 * Math.sin(j * .21 + .6)) * Math.min(1, j / 8), 2300 * Math.min(1, j / 3)]);
  const P = new Float64Array(n * 2), Q = new Float64Array(n * 2), r0 = top(0);
  for (let j = 0; j < n; j++) { P[2 * j] = r0[0]; P[2 * j + 1] = r0[1] - j * l; const [vx, vy] = v0(j); Q[2 * j] = P[2 * j] - vx * dt; Q[2 * j + 1] = P[2 * j + 1] - vy * dt; }
  const m = Math.ceil(dur * 120) + 2, buf = new Float32Array(m * n * 2);
  for (let s = 0; s < m * 2; s++) {
    if (s % 2 === 0) buf.set(P, (s / 2) * n * 2);
    const rp = top((s + 1) * dt);
    for (let j = 1; j < n; j++) { const k = 2 * j, x = P[k], y = P[k + 1], vx = (x - Q[k]) * .996, vy = (y - Q[k + 1]) * .996; Q[k] = x; Q[k + 1] = y; P[k] = x + vx; P[k + 1] = y + vy + G * dt * dt; }
    P[0] = rp[0]; P[1] = rp[1];
    for (let it = 0; it < 20; it++) {
      for (let j = 0; j < N; j++) { const a = 2 * j, b = a + 2, dx = P[b] - P[a], dy = P[b + 1] - P[a + 1], d = Math.hypot(dx, dy) || 1e-6, e = (d - l) / d;
        if (j === 0) { P[b] -= dx * e; P[b + 1] -= dy * e; } else { P[a] += dx * e * .5; P[a + 1] += dy * e * .5; P[b] -= dx * e * .5; P[b + 1] -= dy * e * .5; } }
      for (let j = 1; j < n; j++) if (P[2 * j + 1] > fl) P[2 * j + 1] = fl;
    }
    for (let j = 1; j < n; j++) if (P[2 * j + 1] >= fl - .01) { const k = 2 * j; Q[k] = P[k] - (P[k] - Q[k]) * .55; Q[k + 1] = P[k + 1]; }
  }
  return { n, m, buf, l, out: new Float32Array(n * 2) };
}
// mata rantai sepanjang polyline P (x, y datar): cincin muka dan batang sisi bergantian, 4 path · o: k skala (default l/36), col='#D6D2C5', dark · asal: ai-data-habis puncak/src/film.js:56
export function chainLinks(ctx, P, n, o = {}) {
  const Fp = new Path2D(), Bp = new Path2D(), k = o.k ?? 1;
  for (let j = 0; j < n - 1; j++) {
    const x0 = P[2 * j], y0 = P[2 * j + 1], x1 = P[2 * j + 2], y1 = P[2 * j + 3], dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    if (j % 2 === 0) { Fp.moveTo(mx + ux * 25 * k, my + uy * 25 * k); Fp.ellipse(mx, my, 25 * k, 12.5 * k, Math.atan2(dy, dx), 0, TAU); }
    else { const hl = 27 * k, hw = 4.5 * k; Bp.moveTo(mx - ux * hl - uy * hw, my - uy * hl + ux * hw); Bp.lineTo(mx + ux * hl - uy * hw, my + uy * hl + ux * hw);
      Bp.lineTo(mx + ux * hl + uy * hw, my + uy * hl - ux * hw); Bp.lineTo(mx - ux * hl + uy * hw, my - uy * hl - ux * hw); Bp.closePath(); }
  }
  ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = o.dark ?? 'rgba(6,7,6,.9)'; ctx.lineWidth = 13 * k; ctx.stroke(Fp); ctx.lineWidth = 6 * k; ctx.stroke(Bp);
  ctx.strokeStyle = o.col ?? '#D6D2C5'; ctx.lineWidth = 6.5 * k; ctx.stroke(Fp); ctx.fillStyle = o.col ?? '#D6D2C5'; ctx.fill(Bp); ctx.restore();
}
// rantai jatuh lalu menumpuk: sampel chainSim S pada t - t0 (sebelum t0 = pose awal), digambar di (x, y) · o: col, dark, k · asal: ai-data-habis puncak/src/film.js:131
export function chainDrop(ctx, x, y, S, t, t0, o = {}) {
  const n2 = S.n * 2, f = clamp((t - t0) * 120, 0, S.m - 1.001), i = Math.floor(f), u = f - i, a = i * n2, P = S.out;
  for (let k = 0; k < n2; k++) P[k] = S.buf[a + k] * (1 - u) + S.buf[a + n2 + k] * u;
  ctx.save(); ctx.translate(x, y); chainLinks(ctx, P, S.n, { k: S.l / 36, ...o }); ctx.restore();
}

// ── Lautan tulisan mesin ────────────────────────────────────────────────────────────────────────────────────
export const FRASA_MESIN = ['Tentu! Berikut adalah', 'Sebagai model bahasa AI,', 'Semoga membantu!', 'Di era digital ini,', 'Mari kita selami lebih dalam.',
  'Kesimpulannya,', 'Penting untuk dicatat bahwa', 'Dalam lanskap yang terus berkembang,', 'Berikut beberapa poin penting:',
  'Secara keseluruhan,', 'Tentu saja!', 'Hal ini menunjukkan bahwa'];
const PROSE = new Map();
// (tekstur, cache) kolom paragraf tulisan mesin abu-abu seragam (frasa klise AI), bisa di-blur sesuai kedalaman · o: r resolusi=1, bl blur px, col, frasa · asal: ai-data-habis puncak/src/film.js:23
export function proseTex(w, h, size, seed = 0, o = {}) {
  const r = o.r ?? 1, bl = o.bl ?? 0, F = o.frasa ?? FRASA_MESIN, key = `${w}|${h}|${size}|${seed}|${r}|${bl}|${o.col}|${F.join('/')}`;
  let C = PROSE.get(key); if (C) return C;
  const [s, g] = mk(Math.round(w * r), Math.round(h * r)); g.scale(r, r); setFont(g, MN(size, 400), 0);
  g.fillStyle = o.col ?? 'rgba(124,125,116,.9)'; g.textBaseline = 'alphabetic';
  const lh = size * 1.5, colW = size * 26, gut = size * 2.4, nc = Math.max(1, Math.floor((w + gut) / (colW + gut))), chars = Math.floor(colW / (size * .6));
  let k = seed * 101;
  for (let ci = 0; ci < nc; ci++) {
    const x = ci * (colW + gut) + gut / 2; let y = lh * (1.2 + rnd(seed + ci * 7) * 3);
    while (y < h - lh) {
      const n = 2 + Math.floor(rnd(k++) * 6); let str = '';
      while (str.length < chars * n) str += F[Math.floor(rnd(k++ * 1.31) * F.length)] + ' ';
      for (let l = 0; l < n && y < h - lh * .6; l++, y += lh) g.fillText(str.slice(l * chars, (l + 1) * chars - (l === n - 1 ? Math.floor(rnd(k++) * chars * .6) : 0)).trim(), x, y);
      y += lh * (.8 + rnd(k++) * 1.4);
    }
  }
  C = s; if (bl >= .6) { const [c, g2] = mk(s.width, s.height); g2.filter = `blur(${(bl * r).toFixed(1)}px)`; g2.drawImage(s, 0, 0); C = c; }
  C.lw = w; C.lh = h; PROSE.set(key, C); return C;
}
// lautan tulisan: tekstur T (proseTex) diubin di kotak w×h, bisa bergulir, menipis ke dasar dalam pita 65 px · o: a, v px/s gulir, pudar px di bawah (0 = tidak) · asal: ai-data-habis puncak/src/film.js:147
export function proseSea(ctx, x, y, w, h, T, t, t0, o = {}) {
  const a0 = ctx.globalAlpha, a = o.a ?? 1, lw = T.lw || T.width, lh = T.lh || T.height, r = T.height / lh, x0 = x - w / 2, y0 = y - h / 2, y1 = y + h / 2;
  const off = (((o.v || 0) * (t - t0)) % lh + lh) % lh, f0 = y1 - (o.pudar ?? 0);
  const seg = (ya, yb, al) => { if (al <= .003) return; ctx.globalAlpha = a0 * al; let yy = ya;
    while (yy < yb - .5) { const v = ((yy - y0 + off) % lh + lh) % lh, ye = Math.min(yb, yy - v + lh), sy = v * r, sh = Math.min(T.height - sy, (ye - yy) * r);
      if (sh > .5) for (let xx = x0; xx < x0 + w - .5; xx += lw) { const ww = Math.min(lw, x0 + w - xx); ctx.drawImage(T, 0, sy, ww * r, sh, xx, yy, ww, ye - yy); }
      yy = ye; } };
  if (f0 > y0) seg(y0, Math.min(y1, f0), a);
  for (let yy = Math.max(y0, f0); yy < y1; yy += 65) seg(yy, Math.min(y1, yy + 65), a * (1 - sst(f0, y1, yy + 32)));
  ctx.globalAlpha = a0;
}

// ── Warna kembali, mekar cahaya, benturan, debu ─────────────────────────────────────────────────────────────
// warna kembali dalam cincin: gambar abu → lingkaran tumbuh dari satu titik membuka gambar berwarna, tepi hangat + cahaya hangat · o: at [x, y] (default tengah), R maks (default diagonal), dur=1.28, glow:false · asal: ai-data-habis puncak/src/film.js:158
export function colourRing(ctx, x, y, w, h, grey, col, t, t0, o = {}) {
  const x0 = x - w / 2, y0 = y - h / 2, [px, py] = o.at ?? [x, y], Rm = o.R ?? Math.hypot(w, h), a0 = ctx.globalAlpha;
  if (grey) ctx.drawImage(grey, x0, y0, w, h); const R = Rm * E.outCubic(inv(t0 + .02, t0 + (o.dur ?? 1.28), t)); if (R <= 0) return;
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip(); ctx.beginPath(); ctx.arc(px, py, R, 0, TAU); ctx.save(); ctx.clip(); ctx.drawImage(col, x0, y0, w, h); ctx.restore();
  if (R < Rm * .965) { ctx.strokeStyle = `rgba(255,214,150,${(.3 * (1 - R / Rm)).toFixed(3)})`; ctx.lineWidth = 26 * Math.max(.4, w / 3000); ctx.stroke(); }
  if (o.glow !== false) { const k = E.outCubic(inv(t0, t0 + .8, t)) * (1 - .35 * inv(t0 + 1, t0 + 4, t)), gr = w / 3, g = ctx.createRadialGradient(px, py - 40, 0, px, py - 40, gr);
    g.addColorStop(0, `rgba(255,196,120,${(.22 * k).toFixed(3)})`); g.addColorStop(1, 'rgba(255,196,120,0)'); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(px - gr, py - 40 - gr, 2 * gr, 2 * gr); }
  ctx.restore(); ctx.globalAlpha = a0;
}
let BLM = null;
// mekar cahaya: gambar/klip (src = canvas atau {n, fps, img} bolak-balik) tumbuh dari satu titik lewat masker elips lembut, dicampur screen (untuk dunia gelap) · o: a=.8, dur=1, oy titik asal (1 = bawah tengah, .5 = tengah) · asal: ai-data-habis puncak/src/film.js:167
export function bloom(ctx, x, y, w, h, src, t, t0, o = {}) {
  const s = t - t0, k = E.outCubic(clamp((s - .03) / (o.dur ?? 1))), a = (o.a ?? .8) * k * (1 - .45 * inv(2.2, 4.5, s)); if (!src || a < .01) return;
  let im = src; if (src.img) { const n = src.n, per = Math.max(1, 2 * (n - 1)), m = Math.floor(Math.max(0, s) * src.fps) % per; im = src.img[m < n ? m : per - m]; }
  BLM ??= mk(960, 540); const [MC, MG] = BLM;
  MG.globalCompositeOperation = 'source-over'; MG.clearRect(0, 0, 960, 540); MG.drawImage(im, 0, 0, 960, 540);
  MG.globalCompositeOperation = 'destination-in'; MG.save(); MG.translate(480, 540 * (o.oy ?? 1)); MG.scale(1.6, 1); const R = 40 + 520 * k, g = MG.createRadialGradient(0, 0, 0, 0, 0, R);
  g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(.55, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,0)'); MG.fillStyle = g; MG.fillRect(-R, -R, 2 * R, 2 * R); MG.restore();
  MG.globalCompositeOperation = 'source-over';
  const a0 = ctx.globalAlpha, op = ctx.globalCompositeOperation; ctx.globalAlpha = a0 * a; ctx.globalCompositeOperation = 'screen'; ctx.drawImage(MC, x - w / 2, y - h / 2, w, h);
  ctx.globalCompositeOperation = op; ctx.globalAlpha = a0;
}
const BURST = new Map();
// benturan ke permukaan: cincin kejut pipih, 16 kepul debu, huruf abu terpental (66, gravitasi 1100, hidup 1,4 s) · o: R=1500 cincin, flat=.07, n=66, seed, huruf, col=GREY, sz skala huruf · asal: ai-data-habis puncak/src/film.js:177
export function impact(ctx, x, y, t, t0, o = {}) {
  const s = t - t0; if (s <= 0 || s > 1.4) return; const a0 = ctx.globalAlpha, u = E.outCubic(clamp(s / .8)), R = o.R ?? 1500, q = R / 1500, n = o.n ?? 66, sd = o.seed ?? 0, hf = o.huruf ?? 'abcdefghijklmnopqrstuvwxyz';
  const key = `${n}|${sd}|${hf}`; let B = BURST.get(key);
  if (!B) BURST.set(key, B = Array.from({ length: n }, (_, i) => ({ ch: hf[Math.floor(rnd(i * 3.3 + sd) * hf.length)], vx: (rnd(i * 5.1 + sd) - .5) * 2300,
    vy: -(500 + rnd(i * 7.7 + sd) * 1500), sz: [28, 40, 56][i % 3], sp: (rnd(i * 2.9 + sd) - .5) * 14, x0: (rnd(i * 1.7 + sd) - .5) * 180 })));
  ctx.save();
  if (s < .8) { ctx.strokeStyle = ivo(.55 * (1 - s / .8)); ctx.lineWidth = 7 * (1 - u) + 1; ctx.beginPath(); ctx.ellipse(x, y - 6, 80 + R * u, (80 + R * u) * (o.flat ?? .07), 0, 0, TAU); ctx.stroke(); }
  for (let i = 0; i < 16; i++) { const px = x + (rnd(i * 4.1 + sd) - .5) * (240 + 1000 * u) * q, py = y - 20 - 90 * u * rnd(i * 2.3 + sd), r = (40 + 130 * u * (.6 + rnd(i + sd))) * Math.max(.5, q), al = .2 * (1 - s / 1.4);
    const g = ctx.createRadialGradient(px, py, 0, px, py, r); g.addColorStop(0, `rgba(150,146,134,${al.toFixed(3)})`); g.addColorStop(1, 'rgba(150,146,134,0)'); ctx.fillStyle = g; ctx.fillRect(px - r, py - r, 2 * r, 2 * r); }
  ctx.fillStyle = o.col ?? GREY; ctx.textAlign = 'center'; ctx.globalAlpha = a0 * (1 - s / 1.4);
  for (const sz of [28, 40, 56]) { setFont(ctx, MN(sz * (o.sz ?? 1), 400), 0);
    for (const b of B) { if (b.sz !== sz) continue; ctx.save(); ctx.translate(x + b.x0 + b.vx * s, y - 20 + b.vy * s + 1100 * s * s); ctx.rotate(b.sp * s); ctx.fillText(b.ch, 0, 0); ctx.restore(); } }
  ctx.restore(); ctx.globalAlpha = a0;
}
// debu hangat naik pelan di kotak w×h (dari bawah), memudar di atas: hold tetap bernapas · o: n=38, seed, rgb='255,214,160' (1 dari 3 = tinta tema), sz · asal: ai-data-habis puncak/src/film.js:187
export function motes(ctx, x, y, w, h, t, t0, o = {}) {
  const s = t - t0; if (s <= 0) return; const a0 = ctx.globalAlpha, n = o.n ?? 38, sd = o.seed ?? 0, yb = y + h / 2;
  for (const warm of [true, false]) { ctx.fillStyle = warm ? `rgb(${o.rgb ?? '255,214,160'})` : INK;
    for (let i = 0; i < n; i++) { if (!!(i % 3) !== warm) continue; const d = rnd(i * 6.1 + sd) * 1.5, q = s - d; if (q <= 0) continue;
      const px = x - w / 2 + rnd(i * 2.7 + sd) * w + 30 * Math.sin(q * .9 + i), py = yb - q * (35 + rnd(i * 8.3 + sd) * 75), r = (3 + rnd(i * 1.9 + sd) * 5) * (o.sz ?? 1);
      ctx.globalAlpha = a0 * .55 * clamp(q / .5) * (1 - clamp((yb - py - .55 * h) / (.4 * h))); ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill(); } }
  ctx.globalAlpha = a0;
}

// ── Hujan kata + tangki ─────────────────────────────────────────────────────────────────────────────────────
// hujan kata: kata sehari-hari jatuh (gravitasi 2400) di kolom selebar w dari atas kotak sampai dasar, makin rapat · o: n=90, kata (default KATA), dasar y lokal (mis. permukaan tangki), g, seed, col · asal: ai-data-habis bab-2/src/film.js:385
export function wordRain(ctx, x, y, w, h, t, t0, o = {}) {
  const n = o.n ?? 90, kata = o.kata ?? KATA, top = y - h / 2, lvl = o.dasar ?? y + h / 2, g = o.g ?? 2400, sd = o.seed ?? 0, a0 = ctx.globalAlpha;
  ctx.save(); ctx.fillStyle = o.col ?? INK; ctx.textAlign = 'center';
  for (let i = 0; i < n; i++) { const s = t - (t0 + i * .07 * (1 - i / 260)); if (s <= 0) continue; const py = top + .5 * g * s * s; if (py > lvl) continue;
    ctx.globalAlpha = a0 * (.55 + .4 * rnd(i + 3 + sd)); setFont(ctx, i % 3 ? SRF(30 + 10 * rnd(i + sd)) : MN(20), 1); ctx.fillText(kata[(i * 7 + sd) % kata.length], x + (rnd(i + 1 + sd) - .5) * (w - 120), py); }
  ctx.restore(); ctx.globalAlpha = a0;
}
// tangki kaca berisi tulisan: isi gelap sampai k (0..1) dengan tekstur huruf bergulir, permukaan bergelombang hidup, dinding terbuka di atas · level di y = lvl(k) → tankLevel(y, h, k) · o: tex (letterTex), fill='#0E0F0B', col dinding (tinta tema) · asal: ai-data-habis bab-2/src/film.js:393
export function tank(ctx, x, y, w, h, k, t, t0, o = {}) {
  const a0 = ctx.globalAlpha, tk = E.outQuint(inv(t0, t0 + .5, t)); if (tk <= 0) return;
  const x0 = x - w / 2, yb = y + h / 2, lv = tankLevel(y, h, k), col = o.col ?? INK;
  ctx.save(); ctx.globalAlpha = a0 * tk; ctx.beginPath(); ctx.rect(x0, lv, w, yb - lv); ctx.fillStyle = o.fill ?? '#0E0F0B'; ctx.fill(); ctx.clip();
  if (o.tex) { ctx.globalAlpha = a0 * tk * .7; tileTex(ctx, o.tex, x0, lv, w, Math.max(600, yb - lv), (t - t0) * 18); }
  ctx.restore(); ctx.save(); ctx.globalAlpha = a0 * tk * .8; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath();
  for (let px = x0; px <= x0 + w; px += 8) ctx.lineTo(px, lv + Math.sin(px * .04 + t * 7) * 4); ctx.stroke();
  ctx.globalAlpha = a0 * tk; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, y - h / 2); ctx.lineTo(x0, yb); ctx.lineTo(x0 + w, yb); ctx.lineTo(x0 + w, y - h / 2); ctx.stroke();
  ctx.restore(); ctx.globalAlpha = a0;
}
// (ukur) y permukaan tangki untuk isi k: 20 px di atas dasar (k = 0) sampai 20 px di bawah bibir (k = 1); pakai sebagai o.dasar hujan kata · asal: ai-data-habis bab-2/src/film.js:389
export const tankLevel = (y, h, k) => y + h / 2 - 20 - (h - 40) * clamp(k);

// ── Pecahan gambar ──────────────────────────────────────────────────────────────────────────────────────────
// gambar apa pun pecah jadi grid nx×ny keping yang terlempar keluar dari pusat, naik sedikit, jatuh dan berputar (hidup 1,1 s); sebelum t0 gambar utuh · o: nx=14, ny=6, v=520 (520..1040), up=380, g=1500, life=1.1, seed, utuh:false · asal: ai-data-habis bab-2/src/film.js:97 (huruf→angka milik modul tipografi)
export function imageShatter(ctx, x, y, w, h, im, t, t0, o = {}) {
  const s = t - t0, life = o.life ?? 1.1;
  if (s <= 0) { if (o.utuh !== false) ctx.drawImage(im, x - w / 2, y - h / 2, w, h); return; } if (s > life) return;
  const nx = o.nx ?? 14, ny = o.ny ?? 6, cw = w / nx, ch = h / ny, sw = im.width / nx, sh = im.height / ny, a0 = ctx.globalAlpha, sd = o.seed ?? 0, v = o.v ?? 520, up = o.up ?? 380, g = o.g ?? 1500;
  ctx.save(); ctx.globalAlpha = a0 * clamp(1 - s / (life - .1));
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const cx = -w / 2 + cw * (i + .5), cy = -h / 2 + ch * (j + .5), id = i + j * nx + sd * 977, d = Math.hypot(cx, cy) + 1, sp = v + v * rnd(id + 5);
    ctx.save(); ctx.translate(x + cx + cx / d * sp * s, y + cy + (cy / d * sp - up) * s + g * s * s); ctx.rotate((rnd(id + 9) - .5) * 7 * s);
    ctx.drawImage(im, sw * i, sh * j, sw, sh, -cw / 2, -ch / 2, cw, ch); ctx.restore();
  }
  ctx.restore(); ctx.globalAlpha = a0;
}
