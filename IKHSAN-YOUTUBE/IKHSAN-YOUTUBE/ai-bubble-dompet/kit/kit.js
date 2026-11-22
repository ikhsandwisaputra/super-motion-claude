// Chapter kit (teknologi-indo-vs-as). One depth row of stations, a look-at camera that holds (drifting) and snaps between them,
// documentary footage plates, article evidence cards, kinetic type helpers, transition hits from the shared tx library.
// A chapter links it as src/kit.js and writes only: src/beats.js (times, hits, sfx, bed) + src/film.js (stations).
import { W, H, clamp, inv, lerp, E, spring } from './engine.js';
import { loadTx, drawTx, react } from './txlib.js';
export { W, H, clamp, inv, lerp, E, spring };

export const ROOM = '#0B0C09', IVORY = '#F1EFE6', LIME = '#C8F53C', LIME_INK = '#1B2400', TILE = '#191A15', GREY = '#7C7D74';
export const DISP = 'League Gothic', SER = 'Fraunces', MONO = 'Space Mono', D2R = Math.PI / 180;
export const ivo = a => `rgba(241,239,230,${a})`;
export const setFont = (ctx, css, ls = 0) => { ctx.font = css; ctx.letterSpacing = `${ls}px`; };
export const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const fmt = (n, d = 0) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });
export const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };

// ── times: beats.js holds VO word times; film time = VO time + VOFF ─────────────────────────────────────────
export function timing(B) {
  const T = {}; for (const k in B.V) T[k] = B.V[k] + B.VOFF;
  const at = s => { if (typeof s === 'number') return s; const m = /^([A-Za-z_]\w*)\s*([+-]\s*[\d.]+)?$/.exec(s); if (!m || !(m[1] in T)) throw new Error('beat? ' + s);
    return T[m[1]] + (m[2] ? +m[2].replace(/\s/g, '') : 0); };
  return { T, at, DUR: B.END + B.VOFF + B.TAIL };
}

// ── camera ────────────────────────────────────────────────────────────────────────────────────────────────
export function camera(c) {                                 // look-at camera, world y down, +z away
  const yaw = c.yaw * D2R, pitch = c.pitch * D2R;
  const F = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
  const R = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const Dn = [F[1] * R[2] - F[2] * R[1], F[2] * R[0] - F[0] * R[2], F[0] * R[1] - F[1] * R[0]];
  const C = [c.tx - c.dist * F[0], c.ty - c.dist * F[1], c.tz - c.dist * F[2]], cr = Math.cos((c.roll || 0) * D2R), sr = Math.sin((c.roll || 0) * D2R);
  return (x, y, z) => {
    const dx = x - C[0], dy = y - C[1], dz = z - C[2], cz = dx * F[0] + dy * F[1] + dz * F[2], s = c.f / Math.max(cz, 1);
    const u = s * (dx * R[0] + dy * R[1] + dz * R[2]), v = s * (dx * Dn[0] + dy * Dn[1] + dz * Dn[2]);
    return { x: W / 2 + u * cr - v * sr, y: H / 2 + u * sr + v * cr, s, z: cz };
  };
}
// a vertical plane at world (cx, cy, z), turned ry° about y: local units = world units, then draw vector content (DOF blur by depth)
export function onPlane(ctx, pr, cx, cy, z, foc, fn, ry = 0) {
  const o = pr(cx, cy, z); if (o.z < 90) return;
  const cs = Math.cos(ry * D2R), sn = Math.sin(ry * D2R), a = pr(cx + 100 * cs, cy, z + 100 * sn), b = pr(cx, cy + 100, z);
  ctx.setTransform((a.x - o.x) / 100, (a.y - o.y) / 100, (b.x - o.x) / 100, (b.y - o.y) / 100, o.x, o.y);
  const bl = Math.min(28, Math.abs(o.z - foc) / o.z * 24);
  ctx.filter = bl > .6 ? `blur(${bl.toFixed(1)}px)` : 'none';
  ctx.globalAlpha = 1; fn(o); ctx.filter = 'none'; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}

const POSE = ['yaw', 'pitch', 'dist', 'tx', 'ty', 'tz', 'roll', 'foc'];
// Stations: { at, x, z, py, yaw:[a,b], dist:[a,b], pitch, via:'whip'|'rise'|'push'|'truck'|'cut', side, lead, dur, cam(t), mod(c,t) }.
// The camera holds on station i with a slow drift, then snaps to i+1 (the move starts `lead` s before `at`).
export function rowCam(ST, t, DUR) {
  let i = 0; while (i < ST.length - 1 && t >= ST[i + 1].at - (ST[i + 1].lead ?? .3)) i++;
  const pose = j => {
    const s = ST[j], t1 = j < ST.length - 1 ? ST[j + 1].at : DUR, u = inv(s.at, t1, t);
    const p = s.cam ? s.cam(t) : { yaw: lerp(s.yaw[0], s.yaw[1], u), dist: lerp(s.dist[0], s.dist[1], u), tx: s.x, ty: s.py - 20, tz: s.z, pitch: s.pitch ?? 6 };
    p.roll = p.roll ?? 0; p.pitch = p.pitch ?? 6; p.foc = p.foc ?? p.dist; if (s.mod) s.mod(p, t); return p;
  };
  const c = pose(i); c.f = 1500; c.i = i; c.k = 1;
  if (i > 0) {
    const s = ST[i], l = s.lead ?? .3, k = s.via === 'cut' ? 1 : E.snap(inv(s.at - l, s.at - l + (s.dur ?? .75), t));
    if (k < 1) {
      const q = pose(i - 1), a = Math.sin(Math.PI * k), sd = s.side ?? (i % 2 ? -1 : 1);
      for (const key of POSE) c[key] = lerp(q[key], c[key], k);
      if (s.via === 'rise') { c.ty -= 620 * a; c.pitch += 9 * a; c.dist += 380 * a; }
      else if (s.via === 'push') { c.roll += sd * 5 * a; c.dist += 160 * a; }
      else if (s.via === 'truck') { c.dist += 520 * a; c.yaw += sd * 6 * a; }
      else { c.tx += sd * 1100 * a; c.yaw -= sd * 10 * a; c.dist += 500 * a; }   // whip: pass the old station on one side
      c.k = k;
    }
  }
  return c;
}
export function fillStations(ST, gapZ = 2600) {              // defaults: one row along z, alternating drift
  ST.forEach((s, i) => { const sg = i % 2 ? -1 : 1; s.x = s.x ?? 0; s.z = s.z ?? i * gapZ; s.py = s.py ?? -560; s.yaw = s.yaw ?? [3.5 * sg, -2.5 * sg]; s.dist = s.dist ?? [1520, 1410]; });
  return ST;
}

// ── the world: room, floor dots, bokeh motes, stations far → near ───────────────────────────────────────────
function floor(ctx, pr, c) {
  const hz = pr(c.tx, 0, c.tz + 1e6).y;
  const gr = ctx.createLinearGradient(0, hz - 200, 0, H); gr.addColorStop(0, ivo(0)); gr.addColorStop(.35, ivo(.045)); gr.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gr; ctx.fillRect(-300, -300, W + 600, H + 600);
  ctx.fillStyle = ivo(.26); const z0 = Math.floor((c.tz - 2600) / 380), x0 = Math.round(c.tx / 380);
  for (let zi = z0; zi < z0 + 34; zi++) for (let xi = x0 - 7; xi <= x0 + 7; xi++) {
    const p = pr(xi * 380, 0, zi * 380); if (p.z < 120) continue;
    const r = Math.max(.8, 5 * p.s); ctx.globalAlpha = clamp(1.4 - p.z / 9000); ctx.fillRect(p.x - r, p.y - r * .4, r * 2, r * .8);
  }
  ctx.globalAlpha = 1;
}
function mote(ctx, pr, x, y, z, r, foc) {
  const p = pr(x, y, z); if (p.z < 120) return;
  const bl = Math.abs(p.z - foc) / p.z, R = r * p.s * (1 + bl * 3);
  if (R < 1 || p.x < -R || p.x > W + R) return;
  const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R); gr.addColorStop(0, ivo(.10)); gr.addColorStop(.6, ivo(.05)); gr.addColorStop(1, ivo(0));
  ctx.fillStyle = gr; ctx.fillRect(p.x - R, p.y - R, 2 * R, 2 * R);
}
export function drawRow(ctx, t, ST, DUR) {
  const c = rowCam(ST, t, DUR), pr = camera(c);
  const foc = c.foc + 1600 * (1 - E.outCubic(inv(0, 1.0, t)));                 // the chapter opens on a focus rack
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
  const plane = (cx, cy, z, fn, ry) => onPlane(ctx, pr, cx, cy, z, foc, fn, ry);
  floor(ctx, pr, c);
  const items = [];
  for (let j = Math.max(0, c.i - 1); j <= Math.min(ST.length - 1, c.i + 2); j++) {
    const s = ST[j];
    if (j < c.i && c.k >= 1) continue;
    if (s.tag && j > c.i) { const ga = .15 * (1 - inv(s.at - .6, s.at - .1, t)); if (ga > 0) items.push({ z: s.z + 5, x: s.x, f: () => plane(s.x, s.py, s.z, () => {
      ctx.globalAlpha = ga; setFont(ctx, `400 330px "${DISP}"`, 4); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(s.tag, 0, 110); ctx.textAlign = 'left'; }) }); }
    if (s.draw) items.push({ z: s.z, x: s.x, f: () => plane(s.x, s.py, s.z, () => s.draw(ctx, t, c), s.ry || 0) });
    for (const L of s.layers || []) items.push({ z: s.z + L.dz, x: s.x + (L.dx || 0), f: () => plane(s.x + (L.dx || 0), s.py + (L.dy || 0), s.z + L.dz, () => L.fn(ctx, t, c), L.ry || 0) });
    if (s.world) s.world(ctx, t, pr, foc, items, c);
  }
  const zmax = ST[ST.length - 1].z + 3000, nm = Math.ceil((zmax + 1500) / 340);
  for (let i = 0; i < nm; i++) {                                               // bokeh motes along the whole row: parallax on every move
    const z = -1500 + rnd(i) * (zmax + 1500); if (z < c.tz - 3200 || z > c.tz + 7200) continue;
    const x = c.tx * .0 + (rnd(i + 40) < .5 ? -1 : 1) * (700 + rnd(i + 80) * 1300), y = -150 - rnd(i + 120) * 1300;
    items.push({ z, x, f: () => { mote(ctx, pr, x, y, z, 26 + rnd(i + 9) * 40, foc); } });
  }
  items.map(it => ({ ...it, d: it.d ?? pr(it.x || 0, -500, it.z).z })).sort((a, b) => b.d - a.d).forEach(it => { it.f(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; });
  return c;
}

// ── chapter scene: stations + hits + post ───────────────────────────────────────────────────────────────────
export function makeChapter({ B, ST, load, label, over, full }) {
  const { T, at, DUR } = timing(B);
  let TX = { meta: {}, img: {} };
  const HITS = (B.HITS || []).map(([n, a, al = 1]) => [n, at(a), al]);
  fillStations(ST);
  function post(o, t) {
    react(o, TX, HITS, t);                                 // exposure + lens breath follow the hit's own light
    const gr = o.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * 1.05); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.55)');
    o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.filter = 'none'; o.fillStyle = gr; o.fillRect(0, 0, W, H);
    if (label) { const a = .5 * E.outCubic(inv(.6, 1.4, t)) * (1 - inv(DUR - .8, DUR - .2, t)); o.globalAlpha = a; o.fillStyle = LIME; o.fillRect(64, 58, 10, 10);
      setFont(o, `700 17px "${MONO}"`, 4); o.fillStyle = IVORY; o.textAlign = 'left'; o.fillText(label, 88, 69); o.globalAlpha = 1; }
    if (over) over(o, t);
    if (full) for (const f of full()) if (f.im) evidFull(o, f, t);
    for (const [name, a, al] of HITS) drawTx(o, TX, name, t, a, al);
  }
  return { dur: DUR, cuts: ST.filter(s => s.via === 'cut').map(s => s.at - (s.lead ?? .3)), K: 8, grain: .035, post,
    load: async () => { TX = await loadTx('../assets/txlib/', [...new Set(HITS.map(h => h[0]))]); if (load) await load(); },
    draw: (ctx, t) => drawRow(ctx, t, ST, DUR),
    cues: () => ({ cues: { dur: DUR, trans: ST.slice(1).map(s => ({ t: s.at })), keys: Object.values(T).map(t => ({ t })), beats: [] },
      chapters: ST.map(s => ({ chap: s.name || s.tag || 'stasiun', start: Math.max(0, s.at) })) }) };
}

// ── assets ──────────────────────────────────────────────────────────────────────────────────────────────────
export async function loadImg(url, maxW = 1500) {           // screenshot / photo → canvas, long side capped
  const bm = await createImageBitmap(await (await fetch(url)).blob()), s = Math.min(1, maxW / bm.width), [c, g] = mk(Math.round(bm.width * s), Math.round(bm.height * s));
  g.imageSmoothingQuality = 'high'; g.drawImage(bm, 0, 0, c.width, c.height); return c;
}
export async function loadVid(base, name) {                 // frames cut by tools/vid_frames.py (lazy-decoded <img>, light on memory)
  const m = (await (await fetch(base + 'vid.json')).json())[name]; if (!m) throw new Error('clip not in vid.json: ' + name);
  const img = await Promise.all(Array.from({ length: m.n }, (_, i) => new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no;
    im.src = `${base}${name}/f_${String(i + 1).padStart(3, '0')}.jpg`; })));
  return { ...m, img };
}
let NOISE; const noise = () => { if (NOISE) return NOISE; const [c, g] = mk(256, 256), d = g.createImageData(256, 256);
  for (let i = 0; i < 65536; i++) { const v = 128 + (rnd(i * 1.37) - .5) * 250; d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255; } g.putImageData(d, 0, 0); return NOISE = c; };
export function grainRect(ctx, x, y, w, h, t, a = .16) {     // documentary grain, 12 fps
  const f = Math.floor(t * 12), ox = rnd(f) * 400, oy = rnd(f + 7) * 400, a0 = ctx.globalAlpha, fl = ctx.filter;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.filter = 'none'; ctx.globalAlpha = a0 * a; ctx.globalCompositeOperation = 'overlay';
  for (let yy = y - oy; yy < y + h; yy += 512) for (let xx = x - ox; xx < x + w; xx += 512) ctx.drawImage(noise(), xx, yy, 512, 512);
  ctx.restore(); ctx.filter = fl;
}
const GRADE = 'saturate(.42) contrast(1.16) brightness(.9) sepia(.08)';
// documentary footage plate, centre (x, y): gate opens by k, gate weave, slow push, grade, gate vignette, grain, corner marks
export function plate(ctx, V, t, x, y, w, h, k = 1, o = {}) {
  if (k <= 0 || !V) return;
  const lt = Math.max(0, t - (o.t0 || 0)), n = V.n, per = 2 * (n - 1), m = Math.floor(lt * V.fps * (o.speed || 1)) % per, im = V.img[m < n ? m : per - m];
  const f12 = Math.floor(t * 12), wx = (rnd(f12 * 3.1) - .5) * 2.4, wy = (rnd(f12 * 5.7) - .5) * 1.6, hh = h * k, a0 = ctx.globalAlpha;
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - hh / 2, w, hh); ctx.clip();
  const s = Math.max(w / im.width, h / im.height) * (1.05 + .05 * inv(0, 9, lt)), fl = ctx.filter;
  ctx.filter = (fl === 'none' ? '' : fl + ' ') + (o.grade || GRADE);
  ctx.drawImage(im, x - im.width * s / 2 + wx + (o.ox || 0), y - im.height * s / 2 + wy + (o.oy || 0), im.width * s, im.height * s); ctx.filter = fl;
  const g = ctx.createRadialGradient(x, y, h * .3, x, y, w * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${o.vig ?? .6})`); ctx.fillStyle = g; ctx.fillRect(x - w / 2, y - h / 2, w, h);
  if (o.dim) { ctx.fillStyle = `rgba(11,12,9,${o.dim})`; ctx.fillRect(x - w / 2, y - h / 2, w, h); }
  grainRect(ctx, x - w / 2, y - h / 2, w, h, t, o.grain ?? .22); ctx.restore();
  if (o.marks !== false) { ctx.globalAlpha = a0 * .7 * k; ctx.fillStyle = IVORY; const L = 26, T2 = 2.5, x0 = x - w / 2 - 12, x1 = x + w / 2 + 12, y0 = y - hh / 2 - 12, y1 = y + hh / 2 + 12;
    for (const [px, py, dx, dy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) { ctx.fillRect(px, py, L * dx, T2 * dy); ctx.fillRect(px, py, T2 * dx, L * dy); } ctx.globalAlpha = a0; }
}
// an article / data-page screenshot as evidence, centre (x, y): page springs in, source tab on top, lime marker over fractions of the page
export function evid(ctx, im, x, y, w, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + .55, t)); if (k <= 0) return;
  const cr = o.crop || [0, 0, 1, 1], sw = im.width * cr[2], sh = im.height * cr[3], h = w * sh / sw, a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x, y + (1 - k) * 110); ctx.rotate(((o.rot || 0) + (1 - k) * (o.spin ?? 5)) * D2R); ctx.globalAlpha = a0 * clamp(k * 1.6);
  ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = o.dark ? '#0d0d0d' : '#fff'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.drawImage(im, im.width * cr[0], im.height * cr[1], sw, sh, -w / 2, -h / 2, w, h);
  for (const m of o.hl || []) { const kh = E.outCubic(inv(m[4], m[4] + .45, t)); if (kh <= 0) continue;
    ctx.globalCompositeOperation = o.dark ? 'screen' : 'multiply'; ctx.fillStyle = o.dark ? 'rgba(200,245,60,.42)' : LIME;
    ctx.fillRect(-w / 2 + m[0] * w, -h / 2 + m[1] * h, m[2] * w * kh, m[3] * h); ctx.globalCompositeOperation = 'source-over'; }
  ctx.fillStyle = `rgba(11,12,9,${o.dim ?? .06})`; ctx.fillRect(-w / 2, -h / 2, w, h);
  grainRect(ctx, -w / 2, -h / 2, w, h, t, .12);
  if (o.tab) { setFont(ctx, `700 19px "${MONO}"`, 3); const tw = ctx.measureText(o.tab).width + 62; ctx.fillStyle = IVORY; ctx.fillRect(-w / 2, -h / 2 - 42, tw, 42);
    ctx.fillStyle = LIME_INK; ctx.fillRect(-w / 2 + 16, -h / 2 - 27, 12, 12); ctx.fillStyle = '#11120E'; ctx.textAlign = 'left'; ctx.fillText(o.tab, -w / 2 + 42, -h / 2 - 14); }
  ctx.restore(); ctx.globalAlpha = a0;
}

// full-frame article (screen space, drawn in post): the page fills the screen on a tilted 3D plane (rotateY via column strips,
// exact for a vertical axis), a lime highlighter sweeps the key phrase on its word, then the page whips off.
// f: { im, t0, t1, crop, tab, hl: [[x, y, w, h, t]], dir: ±1, dark }   (hold t1 − t0 ≥ 2.5 s: evidence must be readable)
const FULL = new WeakMap();                                   // keyed by the image (one crop per article per chapter)
export function evidFull(o, f, t) {
  if (t < f.t0 || t > f.t1) return;
  const ki = E.outQuint(inv(f.t0, f.t0 + .55, t)), ko = E.inCubic(inv(f.t1 - .4, f.t1, t)), dir = f.dir || 1, hold = inv(f.t0, f.t1, t);
  const cr = f.crop || [0, 0, 1, 1], sw = f.im.width * cr[2], sh = f.im.height * cr[3], PW = 1600, PH = Math.round(PW * sh / sw), TB = 62;
  let base = FULL.get(f.im);
  if (!base) { const [c, x] = mk(PW, PH + TB); x.fillStyle = f.dark ? '#0d0d0d' : '#fff'; x.fillRect(0, TB, PW, PH);
    x.drawImage(f.im, f.im.width * cr[0], f.im.height * cr[1], sw, sh, 0, TB, PW, PH); x.fillStyle = 'rgba(11,12,9,.05)'; x.fillRect(0, TB, PW, PH);
    if (f.tab) { setFont(x, `700 26px "${MONO}"`, 4); const tw = x.measureText(f.tab).width + 84; x.fillStyle = IVORY; x.fillRect(0, 0, tw, TB);
      x.fillStyle = LIME_INK; x.fillRect(22, 24, 16, 16); x.fillStyle = '#11120E'; x.textBaseline = 'middle'; x.fillText(f.tab, 56, TB / 2 + 1); }
    base = { c, work: mk(PW, PH + TB) }; FULL.set(f.im, base); }
  const [wc, w] = base.work; w.globalCompositeOperation = 'copy'; w.drawImage(base.c, 0, 0); w.globalCompositeOperation = 'source-over';
  for (const [hx, hy, hw, hh, th] of f.hl || []) {                     // highlighter: a slightly skewed, ragged-edged lime stroke
    const kh = E.inOutCubic(inv(th, th + .5, t)); if (kh <= 0) continue;
    const x0 = hx * PW - 6, y0 = TB + hy * PH, ww = (hw * PW + 12) * kh, h = hh * PH;
    w.globalCompositeOperation = f.dark ? 'screen' : 'multiply'; w.fillStyle = f.dark ? 'rgba(200,245,60,.5)' : LIME;
    w.beginPath(); w.moveTo(x0 + 3, y0 + h * .1); w.lineTo(x0 + ww, y0 + h * .02); w.lineTo(x0 + ww + 5, y0 + h * .95); w.lineTo(x0 - 2, y0 + h); w.closePath(); w.fill();
    w.globalAlpha = .35; w.fillRect(x0, y0 + h * .02, ww, h * .07); w.fillRect(x0 + 4, y0 + h * .9, ww, h * .07); w.globalAlpha = 1; w.globalCompositeOperation = 'source-over'; }
  const a = ki * (1 - ko); o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.filter = 'none'; o.globalCompositeOperation = 'source-over';
  o.fillStyle = `rgba(11,12,9,${.9 * a})`; o.fillRect(0, 0, W, H);                       // the world drops back behind the page
  const ar = (PH + TB) / PW, Wp = Math.min(1560, 900 / ar), Hp = Wp * ar, D = 2300;
  const th = dir * D2R * (lerp(62, 21, ki) - 8 * hold - 40 * ko), s = lerp(.82, 1, ki) * (1 + .06 * hold);
  const cx = W / 2 + dir * ((1 - ki) * 700 - 1700 * ko) - dir * 30, cy = H / 2 + 18 + (1 - ki) * 60;
  o.translate(cx, cy); o.rotate(dir * D2R * (-2.2 + 1.2 * hold)); o.scale(s, s); o.globalAlpha = clamp(ki * 1.8) * (1 - ko * .6);
  const N = 220, X = [], V = [];
  for (let i = 0; i <= N; i++) { const u = -Wp / 2 + Wp * i / N, Z = D + u * Math.sin(th); X.push(D * u * Math.cos(th) / Z); V.push(D / Z); }
  const yT = -Hp / 2 + TB * Hp / (PH + TB), quad = () => { o.beginPath(); o.moveTo(X[0], yT * V[0]); o.lineTo(X[N], yT * V[N]); o.lineTo(X[N], Hp / 2 * V[N]); o.lineTo(X[0], Hp / 2 * V[0]); o.closePath(); };
  o.shadowColor = 'rgba(0,0,0,.7)'; o.shadowBlur = 80; o.shadowOffsetY = 36; quad(); o.fillStyle = '#000'; o.fill(); o.shadowColor = 'transparent'; o.shadowBlur = 0; o.shadowOffsetY = 0;
  for (let i = 0; i < N; i++) { const v = (V[i] + V[i + 1]) / 2, h = Hp * v; o.drawImage(wc, PW * i / N, 0, PW / N, PH + TB, X[i], -h / 2, X[i + 1] - X[i] + .8, h); }
  const g = o.createLinearGradient(X[0], 0, X[N], 0), far = dir > 0 ? 1 : 0;           // the far side falls into shade, a sheen on the near side
  g.addColorStop(far, 'rgba(0,0,0,.34)'); g.addColorStop(.5, 'rgba(0,0,0,.06)'); g.addColorStop(1 - far, 'rgba(255,255,255,.05)'); quad(); o.fillStyle = g; o.fill();
  o.restore();
}

// ── type ───────────────────────────────────────────────────────────────────────────────────────────────────
// kinetic letters: each one drops in on a spring, staggered. o: { ls, col, align, stag, drop }
export function fall(ctx, str, x, y, t, t0, css, o = {}) {
  if (t <= t0) return 0; setFont(ctx, css, o.ls || 0); const tw = ctx.measureText(str).width, a0 = ctx.globalAlpha, stag = o.stag ?? .028;
  const x0 = o.align === 'center' ? x - tw / 2 : o.align === 'right' ? x - tw : x; ctx.textAlign = 'left'; ctx.fillStyle = o.col || IVORY;
  for (let i = 0; i < str.length; i++) { const s = t - t0 - i * stag; if (s <= 0) break; if (str[i] === ' ') continue;
    ctx.globalAlpha = a0 * clamp(s / .09); ctx.fillText(str[i], x0 + ctx.measureText(str.slice(0, i)).width, y + (1 - spring(s, .55, .36)) * (o.drop ?? -80)); }
  ctx.globalAlpha = a0; return tw;
}
export function typeOn(ctx, str, x, y, t, t0, css, o = {}) {  // typed on at o.cps chars/s (mono labels, sources)
  if (t <= t0) return; setFont(ctx, css, o.ls || 0); ctx.textAlign = o.align || 'left'; ctx.fillStyle = o.col || IVORY;
  ctx.fillText(str.slice(0, Math.ceil((t - t0) * (o.cps || 45))), x, y); ctx.textAlign = 'left';
}
// a line with one word under the lime marker: pre + [word] + post, centred on x (or left at x with o.align 'left'); marker snaps at tm
export function markLine(ctx, pre, word, post, x, y, t, t0, tm, css, o = {}) {
  const k = E.outQuint(inv(t0, t0 + .5, t)); if (k <= 0) return; const a0 = ctx.globalAlpha;
  setFont(ctx, css, o.ls ?? 1); ctx.textAlign = 'left'; const wa = ctx.measureText(pre).width, wb = ctx.measureText(word).width, wc = ctx.measureText(post).width;
  const x0 = o.align === 'left' ? x : x - (wa + wb + wc) / 2, size = parseFloat(/(\d+(\.\d+)?)px/.exec(css)[1]), kb = E.snap(inv(tm, tm + .3, t));
  ctx.save(); ctx.translate(0, (1 - k) * (o.rise ?? 60)); ctx.globalAlpha = a0 * k;
  ctx.fillStyle = LIME; ctx.fillRect(x0 + wa - size * .12, y - size * .9, (wb + size * .24) * kb, size * 1.12);
  ctx.fillStyle = o.col || IVORY; ctx.fillText(pre, x0, y); ctx.fillText(post, x0 + wa + wb, y);
  ctx.fillStyle = kb > .55 ? LIME_INK : (o.col || IVORY); ctx.fillText(word, x0 + wa, y); ctx.restore(); ctx.globalAlpha = a0;
}
// source line: lime square + mono text typed on (bottom-left of a station by convention: x −840, y 440)
export function srcTag(ctx, text, x, y, t, t0) {
  if (t <= t0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * .85; ctx.fillStyle = LIME; ctx.fillRect(x, y - 13, 11, 11);
  typeOn(ctx, text, x + 26, y, t, t0, `400 21px "${MONO}"`, { ls: 1, cps: 60, col: ivo(.82) }); ctx.globalAlpha = a0;
}
// annotation label (ivory slab, dark mono text) that wipes open at t0; optional leader line to (o.lx, o.ly)
export function slab(ctx, text, x, y, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + .35, t)); if (k <= 0) return; const size = o.size || 24, a0 = ctx.globalAlpha;
  setFont(ctx, `700 ${size}px "${MONO}"`, o.ls ?? 3); const tw = ctx.measureText(text).width + size * 1.3, hh = size * 1.75, x0 = o.align === 'right' ? x - tw : o.align === 'center' ? x - tw / 2 : x;
  if (o.lx !== undefined) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(o.lx, o.ly); ctx.lineTo(lerp(o.lx, x0 + (o.align === 'right' ? tw : 0), k), lerp(o.ly, y, k)); ctx.stroke();
    ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(o.lx, o.ly, 6, 0, 7); ctx.fill(); }
  ctx.fillStyle = o.lime ? LIME : IVORY; ctx.fillRect(x0, y - hh / 2, tw * k, hh);
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y - hh / 2, tw * k, hh); ctx.clip(); ctx.fillStyle = o.lime ? LIME_INK : '#11120E'; ctx.textAlign = 'left'; ctx.fillText(text, x0 + size * .65, y + size * .34); ctx.restore(); ctx.globalAlpha = a0;
}
// plain text, with fade/rise in
export function txt(ctx, str, x, y, t, t0, css, o = {}) {
  const k = E.outQuint(inv(t0, t0 + (o.dur ?? .45), t)); if (k <= 0) return 0; const a0 = ctx.globalAlpha;
  setFont(ctx, css, o.ls || 0); ctx.textAlign = o.align || 'left'; ctx.fillStyle = o.col || IVORY; ctx.globalAlpha = a0 * k * (o.a ?? 1);
  ctx.fillText(str, x, y + (1 - k) * (o.rise ?? 30)); const wd = ctx.measureText(str).width; ctx.textAlign = 'left'; ctx.globalAlpha = a0; return wd;
}
export const countTo = (a, b, t, t0, dur = .8) => lerp(a, b, E.outCubic(inv(t0, t0 + dur, t)));
// fade-out helper for elements that leave before the station ends
export const gone = (t, t0, dur = .3) => 1 - E.inCubic(inv(t0, t0 + dur, t));
