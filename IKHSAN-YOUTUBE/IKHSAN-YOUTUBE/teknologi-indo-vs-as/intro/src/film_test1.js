// Intro "GATE" — Relentless non-conformist (template per episode: edit CFG only).
// Projector room (2.35:1) → film steps through the gate → locks on the wordmark frame → jams, burns through
// → camera dives into the burn → letterbox rips open → the title frame registers in the gate.
import { W, H, FPS, clamp, inv, lerp, E, spring } from './engine.js';

export const CFG = {
  channel: ['RELENTLESS', 'non-conformist'],
  lead: 'Bagaimana jika', midHi: 'AI', mid: ' ADA DI', hero: 'ZAMAN BATU?',
  disclaimer: ['Konten di video ini merupakan hasil riset dari artikel, jurnal ilmiah,',
    'blog, dan opini pribadi, dan bersifat hiburan.'],
  reel: 'REEL 01', frameNo: 428,
};
const COL = { ink: '#16100B', lime: '#C8F53C', limeInk: '#1B2400', base: '#150E09', room: '#060504' };
const DISP = 'League Gothic', SER = 'Fraunces', MONO = 'Space Mono';
const D2R = Math.PI / 180, PITCH = 1000, FX = 40;               // FX = frame centre x on the strip
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const noise1 = x => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(rnd(i), rnd(i + 1), u); };
const setFont = (ctx, css, ls = 0) => { ctx.font = css; ctx.fontStretch = '100%'; ctx.letterSpacing = `${ls}px`; };

// ── timeline ────────────────────────────────────────────────────────────────────────────────────────
const T_JAM = 2.38, T_CUT = 3.0, DUR = 5.4;
const STEPS = []; { let t = 0.12; for (const p of [.1, .1, .1, .1, .1, .1, .1, .1, .12, .15, .19]) { STEPS.push(t); t += p; } STEPS.push(t); }
const N = STEPS.length, T_LOCK = STEPS[N - 1];                  // claw pulls 12 frames, the 12th registers with a bounce
function filmPos(t) {
  let p = 0;
  for (let i = 0; i < N; i++) { const s = t - STEPS[i]; if (s <= 0) break; p += i < N - 1 ? E.inOutCubic(s / 0.06) : spring(s, 0.5, 0.24); }
  if (t > T_JAM) p += 0.006 * Math.sin((t - T_JAM) * 95) * inv(T_JAM, T_JAM + 0.15, t);   // the jam shudder
  return p;
}
function camAt(t) {
  const a = E.inOutSine(inv(0, T_LOCK, t)), b = E.expo16(inv(T_LOCK, T_LOCK + 0.34, t)),
    c = inv(T_LOCK + 0.34, T_JAM, t), d = Math.pow(inv(T_JAM + 0.04, T_CUT, t), 2.4);
  const path = (v0, v1, v2, v3, v4) => lerp(lerp(lerp(lerp(v0, v1, a), v2, b), v3, c), v4, d);
  const f = Math.floor(t * FPS);
  const hit = Math.exp(-Math.max(0, t - T_LOCK) * 16) * (t >= T_LOCK ? 7 : 0), jam = 9 * inv(T_JAM, T_CUT, t) ** 2;
  return {
    tx: FX, ty: 0, tz: 0, f: 1400,
    dist: Math.exp(path(Math.log(4300), Math.log(3600), Math.log(2300), Math.log(2150), Math.log(560))),
    yaw: path(-20, -13, -8, -6.5, 0), pitch: path(9, 6, 3, 2.4, 0), roll: path(-7, -4, -2, -1.5, 9),
    sx: (rnd(f * 2.3) - .5) * 2 * (hit + jam), sy: (rnd(f * 5.3) - .5) * (2.4 + 2 * (hit + jam)),
  };
}

// ── camera (look-at, world y down, +z away) ─────────────────────────────────────────────────────────
function camera(c) {
  const yaw = c.yaw * D2R, pitch = c.pitch * D2R, f = c.f, dist = c.dist;
  const F = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
  const R = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const Dn = [F[1] * R[2] - F[2] * R[1], F[2] * R[0] - F[0] * R[2], F[0] * R[1] - F[1] * R[0]];
  const C = [c.tx - dist * F[0], c.ty - dist * F[1], c.tz - dist * F[2]];
  const ox = W / 2 + c.sx, oy = H / 2 + c.sy;
  return (x, y, z) => {
    const dx = x - C[0], dy = y - C[1], dz = z - C[2], cz = dx * F[0] + dy * F[1] + dz * F[2], s = f / Math.max(cz, 1);
    return { x: ox + s * (dx * R[0] + dy * R[1] + dz * R[2]), y: oy + s * (dx * Dn[0] + dy * Dn[1] + dz * Dn[2]), s, z: cz };
  };
}
let BASE = [1, 0, 0, 1, 0, 0];
const setBase = roll => { const c = Math.cos(roll * D2R), s = Math.sin(roll * D2R); BASE = [c, s, -s, c, W / 2 - c * W / 2 + s * H / 2, H / 2 - s * W / 2 - c * H / 2]; };
const useBase = ctx => ctx.setTransform(...BASE);
// a textured world plane drawn as a grid of small affine cells (per-cell perspective)
function planeTex(ctx, proj, img, x0, y0, w, h, z, nx, ny) {
  const sw = img.width / nx, sh = img.height / ny, cw = w / nx, ch = h / ny;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const wx = x0 + cw * i, wy = y0 + ch * j, P = proj(wx, wy, z);
    if (P.z < 40) continue;
    const Px = proj(wx + cw, wy, z), Py = proj(wx, wy + ch, z);
    if (Math.max(P.x, Px.x, Py.x) < -700 || Math.min(P.x, Px.x, Py.x) > W + 700 || Math.max(P.y, Px.y, Py.y) < -700 || Math.min(P.y, Px.y, Py.y) > H + 700) continue;
    useBase(ctx);
    ctx.transform((Px.x - P.x) / sw, (Px.y - P.y) / sw, (Py.x - P.x) / sh, (Py.y - P.y) / sh, P.x, P.y);
    ctx.drawImage(img, i * sw, j * sh, sw, sh, 0, 0, sw + 0.9, sh + 0.9);
  }
}

// ── art (code placeholders, same sizes as the layers asked from Ahpo) ───────────────────────────────
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
function backlit(g, w, h, dim = 0) {
  const gr = g.createRadialGradient(w / 2, h * .48, 40, w / 2, h / 2, w * .68);
  gr.addColorStop(0, dim ? '#F2DDB2' : '#FFF6E0'); gr.addColorStop(.6, dim ? '#DDBD85' : '#F4E2BC'); gr.addColorStop(1, dim ? '#A97A40' : '#CFA162');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
}
function frameArt(g, v) {            // 1600×900, origin = frame top-left
  backlit(g, 1600, 900, v !== 'wm');
  g.fillStyle = COL.ink; g.strokeStyle = COL.ink; g.textBaseline = 'alphabetic';
  if (v === 'wm') {
    setFont(g, `400 100px "${DISP}"`); const size = 1240 / g.measureText(CFG.channel[0]).width * 100;
    setFont(g, `400 ${size}px "${DISP}"`); const m = g.measureText(CFG.channel[0]), cap = m.actualBoundingBoxAscent;
    const x = 180, top = 190, base = top + cap;
    g.fillText(CFG.channel[0], x, base);
    setFont(g, `italic 420 150px "${SER}"`); const w2 = g.measureText(CFG.channel[1]).width, x2 = x + 1240 - w2, b2 = base + 176;
    g.fillStyle = COL.lime; g.fillRect(x2 - 26, b2 - 122, w2 + 52, 164);
    g.fillStyle = COL.limeInk; g.fillText(CFG.channel[1], x2, b2);
    g.fillStyle = COL.ink; setFont(g, `700 26px "${MONO}"`, 3);
    g.fillText(`${CFG.reel} — HEAD`, x, 118); g.textAlign = 'right'; g.fillText('24 FPS · SAFETY FILM', 1420, 118); g.textAlign = 'left';
  } else if (v === 0) {
    g.lineWidth = 10; g.beginPath(); g.arc(800, 450, 300, 0, 7); g.stroke(); g.beginPath(); g.arc(800, 450, 190, 0, 7); g.stroke();
    g.lineWidth = 6; g.beginPath(); g.moveTo(120, 450); g.lineTo(1480, 450); g.moveTo(800, 60); g.lineTo(800, 840); g.stroke();
  } else if (v === 1) {
    setFont(g, `400 640px "${DISP}"`); g.textAlign = 'center'; g.fillText(String(CFG.frameNo - 3), 800, 690); g.textAlign = 'left';
  } else if (v === 2) {
    for (let i = 0; i < 9; i++) { g.globalAlpha = .12 + .1 * i; g.fillRect(90 + i * 160, 90, 150, 720); } g.globalAlpha = 1;
  } else {
    setFont(g, `400 560px "${DISP}"`, 30); g.textAlign = 'center'; g.fillText('RNC', 800, 650); g.textAlign = 'left';
    g.fillRect(140, 730, 1320, 14);
  }
}
function makeTile(v, n) {             // one frame pitch of 35 mm film, 2080×1000
  const [c, g] = mk(2080, 1000);
  const gr = g.createLinearGradient(0, 0, 2080, 0); gr.addColorStop(0, '#1E140C'); gr.addColorStop(.5, '#120C08'); gr.addColorStop(1, '#1A110A');
  g.fillStyle = gr; g.fillRect(0, 0, 2080, 1000);
  for (const px of [52, 1922]) for (let k = 0; k < 4; k++) {     // perforations: the lamp seen through
    const py = 125 + 250 * k - 37; g.fillStyle = '#FFE7B4'; g.beginPath(); g.roundRect(px, py, 106, 74, 15); g.fill();
    g.strokeStyle = 'rgba(120,60,10,.8)'; g.lineWidth = 3; g.stroke();
  }
  g.fillStyle = '#070504'; g.fillRect(176, 0, 92, 1000);         // optical sound track
  g.fillStyle = '#E9D9B4'; g.beginPath(); g.moveTo(222, 0);
  for (let y = 0; y <= 1000; y += 3) g.lineTo(222 + 6 + 30 * Math.abs(noise1((y + n * 1000) * .045) - .5) * (1 + noise1((y + n * 1000) * .004)), y);
  for (let y = 1000; y >= 0; y -= 3) g.lineTo(222 - 6 - 30 * Math.abs(noise1((y + n * 1000) * .045) - .5) * (1 + noise1((y + n * 1000) * .004)), y);
  g.fill();
  g.save(); g.beginPath(); g.roundRect(280, 50, 1600, 900, 12); g.clip(); g.translate(280, 50); frameArt(g, v); g.restore();
  g.fillStyle = 'rgba(232,160,60,.75)'; setFont(g, `700 17px "${MONO}"`, 4);
  g.save(); g.translate(30, 990); g.rotate(-Math.PI / 2); g.fillText(`RNC · SAFETY FILM · ${String(CFG.frameNo - 12 + n).padStart(4, '0')} ▸`, 0, 0); g.restore();
  g.save(); g.translate(2064, 990); g.rotate(-Math.PI / 2); g.fillText('RELENTLESS NON-CONFORMIST  ●  ●', 0, 0); g.restore();
  return c;
}
function makeGate() {                 // out-of-focus gate bracket in front of the film
  const [c, g] = mk(2100, 1300);
  g.filter = 'blur(7px)'; g.fillStyle = '#0B0908'; g.beginPath(); g.roundRect(50, 50, 2000, 1200, 110); g.roundRect(205, 170, 1690, 960, 48); g.fill('evenodd');
  g.strokeStyle = 'rgba(255,186,104,.55)'; g.lineWidth = 6; g.beginPath(); g.roundRect(205, 170, 1690, 960, 48); g.stroke();
  g.strokeStyle = 'rgba(255,220,170,.10)'; g.lineWidth = 3; g.beginPath(); g.roundRect(50, 50, 2000, 1200, 110); g.stroke();
  return c;
}
function makeBokeh() {
  const [c, g] = mk(96, 96), gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
  gr.addColorStop(0, 'rgba(255,214,150,.9)'); gr.addColorStop(.72, 'rgba(255,190,110,.75)'); gr.addColorStop(.86, 'rgba(255,170,80,.35)'); gr.addColorStop(1, 'rgba(255,170,80,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 96, 96); return c;
}

export function makeFilm() {
  const OV = { lampA: 39, shut: 20, washA: 34, burnA: 17, perf: 24 }, ovImg = {};
  let tiles, gate, bokeh, TL = null;
  const [small, sctx] = mk(480, 270);

  async function load() {
    for (const [name, n] of Object.entries(OV))
      ovImg[name] = await Promise.all(Array.from({ length: n }, async (_, i) =>
        createImageBitmap(await (await fetch(`../assets/ov/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`)).blob())));
    tiles = Array.from({ length: N + 4 }, (_, n) => makeTile(n === N ? 'wm' : n % 4, n));
    gate = makeGate(); bokeh = makeBokeh();
  }
  function ov(ctx, name, t, start, alpha, mode = 'screen') {
    const i = Math.floor((t - start) * 30); if (i < 0 || i >= OV[name] || alpha <= 0) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = mode; ctx.globalAlpha = alpha;
    ctx.drawImage(ovImg[name][i], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }
  const blob = (ctx, r, t, ph) => {
    ctx.beginPath();
    for (let k = 0; k <= 72; k++) {
      const a = k / 72 * Math.PI * 2, rr = r * (1 + .16 * Math.sin(3 * a + 1.3 + t * 2 + ph) + .10 * Math.sin(7 * a + 4.1 - t * 3 + ph) + .06 * Math.sin(13 * a + 2.2 + t * 5));
      ctx[k ? 'lineTo' : 'moveTo'](Math.cos(a) * rr * 1.25, Math.sin(a) * rr);
    }
    ctx.closePath();
  };

  // ── act 1: the projector room ─────────────────────────────────────────────────────────────────────
  function drawRoom(ctx, t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.room; ctx.fillRect(0, 0, W, H);
    const c = camAt(t), proj = camera(c); setBase(c.roll);
    const lampK = clamp(E.outCubic(inv(0.02, 0.4, t)) * (0.9 + 0.1 * noise1(t * 40)));
    const g0 = proj(FX, 0, 0);
    useBase(ctx);                                                   // BG: lamp haze behind the strip
    let gr = ctx.createRadialGradient(g0.x, g0.y, 0, g0.x, g0.y, 2300 * g0.s);
    gr.addColorStop(0, `rgba(255,200,130,${.34 * lampK})`); gr.addColorStop(.35, `rgba(206,96,28,${.13 * lampK})`); gr.addColorStop(1, 'rgba(90,30,6,0)');
    ctx.fillStyle = gr; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    const p = filmPos(t), n0 = Math.floor(p);                       // MG: the film
    for (let n = Math.max(0, n0 - 5); n <= Math.min(N + 3, n0 + 6); n++) planeTex(ctx, proj, tiles[n], -1040, (p - n) * PITCH - 500, 2080, 1000, 0, 13, 5);
    useBase(ctx); ctx.globalCompositeOperation = 'multiply';        // only the gate is lit
    gr = ctx.createRadialGradient(g0.x, g0.y, 0, g0.x, g0.y, 2500 * g0.s);
    gr.addColorStop(0, '#fff'); gr.addColorStop(.3, '#fff'); gr.addColorStop(.52, '#8a6039'); gr.addColorStop(1, '#1c1009');
    ctx.fillStyle = gr; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.globalCompositeOperation = 'source-over';
    if (lampK < 1) { ctx.fillStyle = `rgba(4,3,2,${1 - lampK})`; ctx.fillRect(-W, -H, 3 * W, 3 * H); }

    const bk = inv(T_JAM, T_CUT, t);                                // the burn: blister → char → white-hot hole
    if (bk > 0) {
      const y = (p - N) * PITCH, P = proj(FX, y, 0), Px = proj(FX + 1, y, 0), Py = proj(FX, y + 1, 0);
      useBase(ctx); ctx.transform(Px.x - P.x, Px.y - P.y, Py.x - P.x, Py.y - P.y, P.x, P.y);
      const r = 46 * E.outCubic(inv(0, .16, bk)) + 1500 * E.inCubic(inv(.08, 1, bk));
      ctx.save(); ctx.filter = 'blur(10px)'; ctx.fillStyle = 'rgba(52,22,6,.82)'; blob(ctx, r * 1.34 + 26, t, 0); ctx.fill(); ctx.restore();
      ctx.fillStyle = '#FF7B1C'; blob(ctx, r * 1.07 + 7, t, .6); ctx.fill();
      ctx.fillStyle = '#FFF4D6'; blob(ctx, r, t, 1.1); ctx.fill();
      for (let i = 0; i < 7; i++) {                                 // satellite blisters
        const rs = (30 + 60 * rnd(i + 3)) * E.outCubic(inv(.12 + .07 * i, .5 + .07 * i, bk)) * (1 + 6 * inv(.5, 1, bk)); if (rs <= 0) continue;
        ctx.save(); ctx.translate((rnd(i * 7) - .5) * 1300, (rnd(i * 13 + 1) - .5) * 700);
        ctx.fillStyle = '#FF7B1C'; blob(ctx, rs * 1.12 + 5, t, i); ctx.fill(); ctx.fillStyle = '#FFF4D6'; blob(ctx, rs, t, i + 2); ctx.fill(); ctx.restore();
      }
    }
    planeTex(ctx, proj, gate, FX - 1050, -650, 2100, 1300, -140, 6, 4);   // FG: gate bracket
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen';   // FG: dust in the beam
    for (let i = 0; i < 46; i++) {
      const q = proj((rnd(i) * 2 - 1) * 1700 + t * 30 * (rnd(i + 5) - .5), (rnd(i + 50) * 2 - 1) * 1000 - t * 24 * rnd(i + 9), -150 - rnd(i + 99) * 3700);
      if (q.z < 70) continue; const r = clamp(3 + 3000 / q.z, 3, 110);
      ctx.globalAlpha = clamp(lampK * 5 / r, .035, .5); ctx.drawImage(bokeh, q.x - r, q.y - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    ov(ctx, 'lampA', t, 0.0, .42);
    ov(ctx, 'shut', t, T_LOCK - 0.03, .9);
    ov(ctx, 'washA', t, 1.66, .16);
    ov(ctx, 'burnA', t, T_CUT - 0.50, 1);
    ov(ctx, 'perf', t, T_CUT - 0.40, .9);
    const wk = inv(T_CUT - 0.08, T_CUT - 0.005, t) ** 2;
    if (wk > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(255,246,225,${wk})`; ctx.fillRect(0, 0, W, H); }
  }

  // ── act 2: the title frame ────────────────────────────────────────────────────────────────────────
  function titleLayout(ctx) {
    const M = 150, L = { M };
    setFont(ctx, `400 100px "${DISP}"`); L.heroSize = Math.min(540, 1620 / ctx.measureText(CFG.hero).width * 100);
    setFont(ctx, `400 ${L.heroSize}px "${DISP}"`); L.cap = ctx.measureText('Z').actualBoundingBoxAscent;
    L.hx = Array.from(CFG.hero, (_, i) => ctx.measureText(CFG.hero.slice(0, i)).width); L.hw = ctx.measureText(CFG.hero).width;
    L.hcw = Array.from(CFG.hero, ch => ctx.measureText(ch).width);
    setFont(ctx, `italic 380 122px "${SER}"`); L.leadW = ctx.measureText(CFG.lead).width;
    setFont(ctx, `400 200px "${DISP}"`); L.midCap = ctx.measureText('A').actualBoundingBoxAscent;
    const mid = CFG.midHi + CFG.mid; L.mx = Array.from(mid, (_, i) => ctx.measureText(mid.slice(0, i)).width); L.hiW = ctx.measureText(CFG.midHi).width;
    L.yLead = 404; L.heroTop = 478; L.heroBase = L.heroTop + L.cap; L.rule = L.heroBase + 70;
    return L;
  }
  function drawTitle(ctx, t) {
    const s = t - T_CUT, f = Math.floor(t * FPS); TL = TL || titleLayout(ctx); const L = TL, M = L.M;
    const land = 0.42 + (CFG.hero.length - 1) * 0.02 + 0.15, hit = s >= land ? Math.exp(-(s - land) * 15) : 0;
    const reg = spring(s, 0.5, 0.26), yOff = (1 - reg) * -260;
    const push = 1.10 - 0.10 * E.outQuint(inv(0, .5, s)) + 0.045 * inv(.3, 5, s) + 0.022 * hit;
    const roll = 5 * (1 - E.outQuint(inv(0, .45, s)));
    const sx = (rnd(f * 2.3) - .5) * 20 * hit, sy = (rnd(f * 5.3) - .5) * (2.4 + 16 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.room; ctx.fillRect(0, 0, W, H);
    ctx.translate(W / 2 + sx, H / 2 + sy); ctx.rotate(roll * D2R); ctx.scale(push, push); ctx.translate(-W / 2, -H / 2 + yOff);
    for (const oy of [0, 1200]) {
      const gr = ctx.createRadialGradient(960, oy + 500, 60, 960, oy + 540, 1280);
      gr.addColorStop(0, '#FFF8E6'); gr.addColorStop(.55, '#F6E7C6'); gr.addColorStop(1, '#D9B67E');
      ctx.fillStyle = gr; ctx.fillRect(-200, oy, W + 400, 1080);
    }
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    // micro labels
    ctx.globalAlpha = inv(.2, .5, s); ctx.fillStyle = COL.ink;
    setFont(ctx, `400 44px "${DISP}"`, 4); ctx.fillText(`${CFG.channel[0]} ${CFG.channel[1].toUpperCase()}`, M, 120);
    setFont(ctx, `700 22px "${MONO}"`, 2); ctx.textAlign = 'right';
    ctx.fillText(`${CFG.reel} · FRAME ${String(CFG.frameNo).padStart(4, '0')} · 24 FPS`, W - M, 116);
    ctx.fillText(`TC 00:00:${String(Math.floor(t)).padStart(2, '0')}:${String(f % FPS).padStart(2, '0')}`, W - M, 1012); ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
    // lead (serif italic), wiped in
    let k = E.outQuint(inv(.10, .42, s));
    if (k > 0) { ctx.save(); ctx.beginPath(); ctx.rect(M - 20, L.yLead - 140, (L.leadW + 40) * k, 200); ctx.clip();
      setFont(ctx, `italic 380 122px "${SER}"`); ctx.fillText(CFG.lead, M, L.yLead + (1 - k) * 18); ctx.restore(); }
    // mid: lime slab on the twist word, letters pop
    const mx0 = M + L.leadW + 52, mid = CFG.midHi + CFG.mid;
    k = E.snap(inv(.22, .44, s));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(mx0 - 20, L.yLead - L.midCap - 20, (L.hiW + 40) * k, L.midCap + 40); }
    setFont(ctx, `400 200px "${DISP}"`);
    for (let i = 0; i < mid.length; i++) {
      const si = s - .26 - i * .018; if (si <= 0 || mid[i] === ' ') continue;
      const sc = .84 + .16 * spring(si, .65, .3), cx = mx0 + L.mx[i];
      ctx.save(); ctx.translate(cx, L.yLead); ctx.scale(sc, sc); ctx.globalAlpha = inv(0, .05, si);
      ctx.fillStyle = i < CFG.midHi.length ? COL.limeInk : COL.ink; ctx.fillText(mid[i], 0, 0); ctx.restore();
    }
    // hero: letters fall in from the lens, 1 landing = 1 hit
    setFont(ctx, `400 ${L.heroSize}px "${DISP}"`); ctx.fillStyle = COL.ink;
    for (let i = 0; i < CFG.hero.length; i++) {
      const si = s - .42 - i * .02; if (si <= 0 || CFG.hero[i] === ' ') continue;
      const kk = E.expo16(si / .2), sc = lerp(2.3, 1, kk), cx = M + L.hx[i] + L.hcw[i] / 2, cy = L.heroBase - L.cap / 2;
      ctx.save(); ctx.translate(cx, cy + (1 - kk) * 70); ctx.scale(sc, sc); ctx.globalAlpha = inv(0, .04, si);
      ctx.fillText(CFG.hero[i], -L.hcw[i] / 2, L.cap / 2); ctx.restore();
    }
    // disclaimer
    k = E.outQuint(inv(.95, 1.4, s));
    if (k > 0) {
      ctx.fillStyle = COL.ink; ctx.globalAlpha = .55; ctx.fillRect(M, L.rule, 1620 * k, 2); ctx.globalAlpha = 1;
      setFont(ctx, `700 24px "${MONO}"`, 5); ctx.globalAlpha = inv(1.0, 1.2, s); ctx.fillText('DISCLAIMER', M, L.rule + 56);
      setFont(ctx, `400 27px "${MONO}"`);
      CFG.disclaimer.forEach((ln, j) => { const kj = E.outQuint(inv(1.05 + j * .09, 1.4 + j * .09, s)); ctx.globalAlpha = kj; ctx.fillText(ln, M + 250, L.rule + 56 + j * 44 + (1 - kj) * 12); });
      ctx.globalAlpha = 1;
    }
    ov(ctx, 'perf', t, T_CUT - 0.40, .9);
    const wk = 1 - E.outCubic(inv(0, .3, s));
    if (wk > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(255,246,225,${wk})`; ctx.fillRect(0, 0, W, H); }
  }

  function post(o, t, f) {
    const title = t >= T_CUT;
    o.setTransform(1, 0, 0, 1, 0, 0);
    sctx.filter = 'brightness(0.58) contrast(2.8) saturate(0.7) blur(7px)'; sctx.drawImage(o.canvas, 0, 0, 480, 270);   // halation
    o.globalCompositeOperation = 'screen'; o.globalAlpha = title ? .10 : .34; o.drawImage(small, 0, 0, W, H);
    o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
    o.fillStyle = `rgba(0,0,0,${rnd(f * 3.1) * (title ? .03 : .06)})`; o.fillRect(0, 0, W, H);            // lamp flicker
    if (rnd(f + 7) > .5) { o.fillStyle = title ? 'rgba(60,30,8,.16)' : 'rgba(255,238,206,.16)'; o.fillRect(rnd(f * 1.7) * W, 0, 1.5, H); }
    for (let i = 0, n = Math.floor(rnd(f + 3) * 4); i < n; i++) {                                        // dust on the print
      o.fillStyle = title ? 'rgba(40,20,6,.5)' : 'rgba(255,236,200,.4)'; o.beginPath();
      o.ellipse(rnd(f * 9.1 + i) * W, rnd(f * 4.7 + i) * H, 1.5 + 4 * rnd(f + i), 1 + 2.5 * rnd(f * 2 + i), rnd(i + f) * 3, 0, 7); o.fill();
    }
    const v = o.createRadialGradient(W / 2, H / 2, H * .5, W / 2, H / 2, W * .64);
    v.addColorStop(0, 'rgba(20,9,2,0)'); v.addColorStop(1, title ? 'rgba(70,34,8,.5)' : 'rgba(6,3,1,.62)');
    o.fillStyle = v; o.fillRect(0, 0, W, H);
    const bar = 131 * (1 - E.outExpo(inv(T_CUT - 0.09, T_CUT + 0.08, t)));                               // 2.35:1 rips open
    if (bar > .5) { o.fillStyle = '#000'; o.fillRect(0, 0, W, bar); o.fillRect(0, H - bar, W, bar); }
  }

  return { dur: DUR, cuts: [T_CUT], K: 8, grain: 0.07, load, post, draw: (ctx, t) => (t < T_CUT ? drawRoom : drawTitle)(ctx, t) };
}
