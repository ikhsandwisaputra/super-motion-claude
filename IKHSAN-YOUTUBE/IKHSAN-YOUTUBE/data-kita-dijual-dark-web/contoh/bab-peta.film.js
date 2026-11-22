// Bab "Peta" (VO ivs_vo_ahmad_03, 39.5 s). One depth row, three stations the camera flies between:
// A  balance PEMAKAI vs PENCIPTA (z 0) → B split-flap scoreboard, 3 rows + row 4 flips (z 2600)
// → C the "tertinggal sekian puluh tahun" quote, searched with a lens, struck, replaced (z 5200).
import { W, H, clamp, inv, lerp, E, spring } from './engine.js';
import { loadTx, drawTx, react } from './txlib.js';

const ROOM = '#0B0C09', IVORY = '#F1EFE6', LIME = '#C8F53C', LIME_INK = '#1B2400', TILE = '#191A15';
const DISP = 'League Gothic', SER = 'Fraunces', MONO = 'Space Mono', D2R = Math.PI / 180;
const VOFF = .3, DUR = 39.52 + VOFF + .9;
const w = s => s + VOFF;                                   // VO time → film time
const T = {
  dugaan: w(.07), pemakai: w(2.56), belum: w(4.93), pencipta: w(5.57), pemakai2: w(6.40), jago: w(7.64), aplikasi: w(8.60),
  pencipta2: w(9.48), resep: w(11.15), pabrik: w(11.88), paten: w(13.08), bedah: w(13.80), skor: w(15.12),
  r1: w(15.66), r2: w(17.64), r3: w(20.20), lalu: w(22.70), bidang: w(24.22), kebalik: w(25.60), catatan: w(26.54),
  kalimat: w(28.86), q: [w(29.36), w(30.05), w(30.60), w(30.92), w(31.19)], kami: w(31.81), tidak: w(33.64),
  metode: w(35.24), jadi: w(36.00), takkan: w(37.57), sini: w(38.96),
};
const ZA = 0, ZB = 2600, ZC = 5200;

const setFont = (ctx, css, ls = 0) => { ctx.font = css; ctx.letterSpacing = `${ls}px`; };
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

function camera(c) {                                       // look-at camera, world y down, +z away
  const yaw = c.yaw * D2R, pitch = c.pitch * D2R;
  const F = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
  const R = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const Dn = [F[1] * R[2] - F[2] * R[1], F[2] * R[0] - F[0] * R[2], F[0] * R[1] - F[1] * R[0]];
  const C = [c.tx - c.dist * F[0], c.ty - c.dist * F[1], c.tz - c.dist * F[2]];
  return (x, y, z) => {
    const dx = x - C[0], dy = y - C[1], dz = z - C[2], cz = dx * F[0] + dy * F[1] + dz * F[2], s = c.f / Math.max(cz, 1);
    return { x: W / 2 + s * (dx * R[0] + dy * R[1] + dz * R[2]), y: H / 2 + s * (dx * Dn[0] + dy * Dn[1] + dz * Dn[2]), s, z: cz };
  };
}

export function makeFilm() {
  // transition hits (shared tx library, Think Make Push): brightest frame lands mid-whip; mix.py plays each hit's own sound at the same time
  let TX = { meta: {}, img: {} };
  const HITS = [['stk1', T.bedah + .17, .95], ['cmc1', T.catatan + .07, .9]];
  const scene = { dur: DUR, cuts: [], K: 8, grain: .035, load: async () => { TX = await loadTx('../assets/txlib/', HITS.map(h => h[0])); }, draw, post,
    cues: () => ({ cues: { dur: DUR, trans: [T.bedah, T.catatan].map(t => ({ t })), keys: [T.pemakai, T.pemakai2, T.resep, T.pabrik, T.paten, T.r1, T.r2, T.r3, T.kebalik, ...T.q, T.tidak, T.jadi, T.takkan].map(t => ({ t })), beats: [] },
      chapters: [{ chap: 'Peta · timbangan', start: 0 }, { chap: 'Peta · papan skor', start: T.bedah }, { chap: 'Peta · catatan', start: T.catatan }] }) };

  // ── camera: holds that drift, snaps that travel the row (passing each station on the left)
  function cam(t) {
    const into = E.outQuint(inv(0, 1.3, t));
    const kAB = E.snap(inv(T.bedah - .2, T.bedah + .55, t)), kBC = E.snap(inv(T.catatan - .3, T.catatan + .45, t));
    // station poses (each drifts while held), blended by the two snaps
    const A = { yaw: lerp(14, 5, into) - 8 * inv(0, T.bedah, t), dist: lerp(3200, 1640, into) - 110 * inv(1.3, T.bedah, t), ty: -470 };
    const B = { yaw: -2 + 6 * inv(T.bedah + .6, T.catatan, t), dist: 1380 - 90 * inv(T.bedah + .6, T.catatan, t), ty: -600 };
    const C = { yaw: -3 + 4 * inv(T.catatan + .5, DUR, t), dist: 1640 - 140 * inv(T.catatan + .5, DUR, t), ty: -600 + 30 * E.inOutCubic(inv(T.takkan, T.takkan + .6, t)) };
    const bl = key => lerp(lerp(A[key], B[key], kAB), C[key], kBC);
    const c = { yaw: bl('yaw'), pitch: 7, f: 1500, dist: bl('dist'), tx: 0, ty: bl('ty'), tz: lerp(lerp(ZA, ZB, kAB), ZC, kBC), roll: 0 };
    c.tx += -1100 * Math.sin(Math.PI * kAB) - 1200 * Math.sin(Math.PI * kBC);      // pass each station on the left
    c.yaw += 10 * Math.sin(Math.PI * kAB) + 10 * Math.sin(Math.PI * kBC);
    c.dist += 500 * Math.sin(Math.PI * kAB) + 500 * Math.sin(Math.PI * kBC);
    c.roll = -6 * Math.sin(Math.PI * clamp(spring(t - T.kebalik + .1, .45, .5) * .5)) * (t > T.kebalik - .1 ? 1 : 0) * (1 - kBC);
    const sh = t - T.pemakai2 - .38; if (sh > 0 && sh < .4) c.ty += 14 * Math.exp(-sh * 12) * Math.sin(sh * 70);   // phone drop shake
    return c;
  }

  // a vertical plane at world (cx, cy, z): local units = world units, then draw vector content
  function onPlane(ctx, pr, cx, cy, z, foc, fn) {
    const o = pr(cx, cy, z); if (o.z < 80) return;
    const a = pr(cx + 100, cy, z), b = pr(cx, cy + 100, z);
    ctx.setTransform((a.x - o.x) / 100, (a.y - o.y) / 100, (b.x - o.x) / 100, (b.y - o.y) / 100, o.x, o.y);
    const bl = Math.min(28, Math.abs(o.z - foc) / o.z * 24);
    ctx.filter = bl > .6 ? `blur(${bl.toFixed(1)}px)` : 'none';
    fn(o); ctx.filter = 'none'; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  }

  function draw(ctx, t) {
    const c = cam(t), pr = camera(c);
    const focRack = 1 - E.outCubic(inv(0, 1.0, t));
    const foc = c.dist + 1600 * focRack - (t > T.takkan ? 380 * E.inOutCubic(inv(T.takkan, T.takkan + .5, t)) : 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(c.roll * D2R); ctx.translate(-W / 2, -H / 2);
    floor(ctx, pr);
    const items = [
      { z: ZA, f: () => onPlane(ctx, pr, 0, 0, ZA, foc, () => balance(ctx, t)) },
      { z: ZB, f: () => onPlane(ctx, pr, 0, -560, ZB, foc, () => board(ctx, t)) },
      { z: ZC, f: () => onPlane(ctx, pr, 0, -620, ZC, foc, () => quote(ctx, t)) },
      { z: ZC - 400, f: () => onPlane(ctx, pr, 0, -380, ZC - 400, foc, () => verdict(ctx, t)) },
    ];
    for (let i = 0; i < 26; i++) {                        // foreground bokeh motes along the path, parallax on travel
      const z = -1400 + rnd(i) * 7400, x = (rnd(i + 40) < .5 ? -1 : 1) * (700 + rnd(i + 80) * 1300), y = -150 - rnd(i + 120) * 1300;
      items.push({ z, f: () => mote(ctx, pr, x, y, z, 26 + rnd(i + 9) * 40, foc) });
    }
    items.map(it => ({ ...it, d: pr(0, -500, it.z).z })).sort((a, b) => b.d - a.d).forEach(it => it.f());
    ctx.restore();
  }

  function floor(ctx, pr) {
    const hz = pr(0, 0, 1e6).y;
    const gr = ctx.createLinearGradient(0, hz - 200, 0, H); gr.addColorStop(0, 'rgba(241,239,230,0)'); gr.addColorStop(.35, 'rgba(241,239,230,.045)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr; ctx.fillRect(-200, -200, W + 400, H + 400);
    ctx.fillStyle = 'rgba(241,239,230,.26)';
    for (let zi = -6; zi < 26; zi++) for (let xi = -6; xi <= 6; xi++) {
      const p = pr(xi * 380, 0, zi * 380); if (p.z < 120) continue;
      const r = Math.max(.8, 5 * p.s); ctx.globalAlpha = clamp(1.4 - p.z / 9000); ctx.fillRect(p.x - r, p.y - r * .4, r * 2, r * .8);
    }
    ctx.globalAlpha = 1;
  }
  function mote(ctx, pr, x, y, z, r, foc) {
    const p = pr(x, y, z); if (p.z < 120) return;
    const bl = Math.abs(p.z - foc) / p.z, R = r * p.s * (1 + bl * 3);
    if (R < 1 || p.x < -R || p.x > W + R) return;
    const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R); gr.addColorStop(0, 'rgba(241,239,230,.10)'); gr.addColorStop(.6, 'rgba(241,239,230,.05)'); gr.addColorStop(1, 'rgba(241,239,230,0)');
    ctx.fillStyle = gr; ctx.fillRect(p.x - R, p.y - R, 2 * R, 2 * R);
  }

  // ── station A: the balance (plane origin = floor centre, v up = negative)
  const ivoryV = (ctx, x0, x1) => { const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, '#9D9A8F'); g.addColorStop(.45, '#F6F4EC'); g.addColorStop(1, '#8E8B80'); return g; };
  function balance(ctx, t) {
    const drop1 = spring(t - T.pemakai, .42, .9), drop2 = spring(t - T.pemakai2 - .38, .38, .6);
    const th = (-11 * drop1 - 4 * drop2) * D2R;
    // floor shadow + pedestal + pole
    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 420); g.addColorStop(0, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save(); ctx.scale(1, .12); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 420, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.fillStyle = ivoryV(ctx, -230, 230); ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(230, 0); ctx.lineTo(170, -64); ctx.lineTo(-170, -64); ctx.closePath(); ctx.fill();
    ctx.fillStyle = ivoryV(ctx, -20, 20); ctx.fillRect(-18, -800, 36, 740);
    // beam
    const piv = { x: 0, y: -800 }, L = 520;
    ctx.save(); ctx.translate(piv.x, piv.y); ctx.rotate(th);
    g = ctx.createLinearGradient(0, -12, 0, 12); g.addColorStop(0, '#FFFFFF'); g.addColorStop(.5, '#E2DFD3'); g.addColorStop(1, '#8E8B80');
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-L, -11, 2 * L, 22, 11); ctx.fill();
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(s * (L - 20), 0, 15, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = '#F6F4EC'; ctx.beginPath(); ctx.arc(piv.x, piv.y, 32, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(11,12,9,.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(piv.x, piv.y, 18, 0, Math.PI * 2); ctx.stroke();
    // pans hang straight down from the beam ends
    for (const s of [-1, 1]) {
      const hx = piv.x + s * (L - 20) * Math.cos(th), hy = piv.y + s * (L - 20) * Math.sin(th), py = hy + 340;
      ctx.strokeStyle = 'rgba(241,239,230,.55)'; ctx.lineWidth = 3;
      for (const dx of [-150, 0, 150]) { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + dx, py - (dx ? 0 : 14)); ctx.stroke(); }
      g = ctx.createLinearGradient(0, py, 0, py + 60); g.addColorStop(0, '#E9E6DA'); g.addColorStop(1, '#6F6D64');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(hx, py, 170, 62, 0, 0, Math.PI); ctx.fill();
      ctx.fillStyle = '#FBFAF4'; ctx.beginPath(); ctx.ellipse(hx, py, 170, 16, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(11,12,9,.18)'; ctx.beginPath(); ctx.ellipse(hx, py + 2, 150, 11, 0, 0, Math.PI * 2); ctx.fill();
      if (s < 0) phone(ctx, t, hx, py); else ghosts(ctx, t, hx, py);
      label(ctx, t, s, hx, py + 190);
    }
  }
  function label(ctx, t, s, x, y) {
    const k = E.outQuint(inv(s < 0 ? T.pemakai - .1 : T.pencipta - .1, (s < 0 ? T.pemakai : T.pencipta) + .45, t));
    if (k <= 0) return;
    setFont(ctx, `400 118px "${DISP}"`, 2); ctx.textAlign = 'center';
    const txt = s < 0 ? 'PEMAKAI' : 'PENCIPTA', wd = ctx.measureText(txt).width;
    ctx.save(); ctx.translate(x, y + (1 - k) * 60); ctx.globalAlpha = k;
    if (s < 0) { const kl = E.snap(inv(T.pemakai + .25, T.pemakai + .6, t)); ctx.fillStyle = LIME; ctx.fillRect(-wd / 2 - 26, -104, (wd + 52) * kl, 128); ctx.fillStyle = kl > .5 ? LIME_INK : IVORY; }
    else ctx.fillStyle = 'rgba(241,239,230,.55)';
    ctx.fillText(txt, 0, 0);
    setFont(ctx, `400 30px "${MONO}"`, 4); ctx.fillStyle = 'rgba(241,239,230,.62)';
    const sub = s < 0 ? 'KELAS DUNIA' : 'BELUM';
    ctx.globalAlpha = k * E.outCubic(inv(s < 0 ? T.pemakai + .9 : T.belum, (s < 0 ? T.pemakai + 1.3 : T.belum + .4), t)); ctx.fillText(sub, 0, 70);
    ctx.restore(); ctx.textAlign = 'left';
  }
  function phone(ctx, t, x, py) {                          // a generic phone drops onto the PEMAKAI pan
    const k = t - T.pemakai2; if (k < 0) return;
    const fall = E.inCubic(clamp(k / .38)), y = lerp(py - 1400, py - 14, fall), sq = k > .38 ? 1 - .12 * Math.exp(-(k - .38) * 14) * Math.cos((k - .38) * 40) : 1;
    ctx.save(); ctx.translate(x, y); ctx.scale(1 / sq, sq); ctx.rotate(-.08 * (1 - fall));
    const g = ctx.createLinearGradient(-80, 0, 80, 0); g.addColorStop(0, '#2A2B25'); g.addColorStop(.5, '#3A3B34'); g.addColorStop(1, '#1D1E19');
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-80, -330, 160, 330, 26); ctx.fill();
    ctx.strokeStyle = 'rgba(241,239,230,.5)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#0E0F0C'; ctx.beginPath(); ctx.roundRect(-68, -318, 136, 306, 18); ctx.fill();
    const on = inv(T.jago, T.jago + .3, t);
    if (on > 0) {
      const sg = ctx.createLinearGradient(0, -318, 0, -12); sg.addColorStop(0, `rgba(241,239,230,${.16 * on})`); sg.addColorStop(1, `rgba(241,239,230,${.04 * on})`);
      ctx.fillStyle = sg; ctx.beginPath(); ctx.roundRect(-68, -318, 136, 306, 18); ctx.fill();
      for (let i = 0; i < 12; i++) {                      // app tiles pop in, row by row
        const kk = E.outQuint(inv(T.jago + .15 + i * .05, T.jago + .45 + i * .05, t)), cx = -40 + (i % 3) * 40, cy = -280 + Math.floor(i / 3) * 46;
        if (kk <= 0) continue; ctx.globalAlpha = .9 * kk; ctx.fillStyle = i === 4 ? '#FFFFFF' : 'rgba(241,239,230,.62)';
        ctx.beginPath(); ctx.roundRect(cx - 14 * kk, cy - 14 * kk, 28 * kk, 28 * kk, 8 * kk); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }
  function ghosts(ctx, t, x, py) {                         // what PENCIPTA holds: recipe, factory, patent — not ours (dashed)
    const list = [[T.resep, 'RESEP', -230], [T.pabrik, 'PABRIK', 0], [T.paten, 'PATEN', 230]];
    list.forEach(([t0, name, dx], i) => {
      const k = E.outQuint(inv(t0 - .12, t0 + .4, t)); if (k <= 0) return;
      const cx = x + dx, cy = py + 470 + Math.sin((t - t0) * 2 + i) * 8 + (1 - k) * 80;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(.95, .95); ctx.globalAlpha = k;
      ctx.setLineDash([14, 10]); ctx.lineDashOffset = -(t - t0) * 40; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(241,239,230,.8)'; ctx.lineJoin = 'round';
      ctx.beginPath();
      if (i === 0) { ctx.roundRect(-52, -70, 104, 140, 8); ctx.moveTo(-30, -30); ctx.lineTo(30, -30); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.moveTo(-30, 30); ctx.lineTo(10, 30); }
      else if (i === 1) { ctx.moveTo(-80, 70); ctx.lineTo(-80, -10); ctx.lineTo(-40, 20); ctx.lineTo(-40, -10); ctx.lineTo(0, 20); ctx.lineTo(0, -10); ctx.lineTo(40, 20); ctx.lineTo(40, -80); ctx.lineTo(70, -80); ctx.lineTo(70, 70); ctx.closePath(); }
      else { ctx.roundRect(-50, -10, 100, 80, 10); ctx.moveTo(-32, -10); ctx.lineTo(-32, -38); ctx.arc(0, -38, 32, Math.PI, 0); ctx.lineTo(32, -10); }
      ctx.stroke(); ctx.setLineDash([]);
      setFont(ctx, `700 32px "${MONO}"`, 4); ctx.textAlign = "center"; ctx.fillStyle = "rgba(241,239,230,.75)"; ctx.fillText(name, 0, 112); ctx.textAlign = 'left';
      ctx.restore();
    });
  }

  // ── station B: split-flap scoreboard (plane origin = board centre)
  const ROWS = [['01', 'RISET & PATEN', T.r1], ['02', 'INTERNET & AI', T.r2], ['03', 'EKONOMI DIGITAL & SEKOLAH', T.r3], ['04', 'SATU BIDANG', T.lalu]];
  function tile(ctx, x, y, ch, flap, lime) {
    ctx.fillStyle = lime ? LIME : TILE; ctx.beginPath(); ctx.roundRect(x, y, 84, 116, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(241,239,230,.12)'; ctx.lineWidth = 2; ctx.stroke();
    if (ch) { setFont(ctx, `400 96px "${DISP}"`); ctx.textAlign = 'center'; ctx.fillStyle = lime ? LIME_INK : IVORY; ctx.fillText(ch, x + 42, y + 96); ctx.textAlign = 'left'; }
    if (flap > 0) { ctx.fillStyle = lime ? '#A9CF2E' : '#24251F'; ctx.fillRect(x, y + 58 - 58 * flap, 84, 58 * flap); }
    ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(x, y + 57, 84, 3);
  }
  function board(ctx, t) {
    const kIn = E.outQuint(inv(T.bedah + .2, T.bedah + .8, t)); if (kIn <= 0) return;
    ctx.globalAlpha = kIn;
    setFont(ctx, `700 34px "${MONO}"`, 6); ctx.fillStyle = 'rgba(241,239,230,.7)'; ctx.fillText('PAPAN SKOR', -760, -430);
    ctx.textAlign = 'center'; ctx.fillText('IDN', 384, -430); ctx.fillText('USA', 604, -430); ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(241,239,230,.2)'; ctx.fillRect(-760, -406, 1520 * E.outQuint(inv(T.bedah + .3, T.bedah + 1, t)), 2);
    ctx.globalAlpha = 1;
    ROWS.forEach(([no, name, t0], i) => {
      const k = E.outQuint(inv(t0 - .1, t0 + .45, t)); if (k <= 0) return;
      const y = -370 + i * 190, flip = i === 3 ? E.snap(inv(T.kebalik - .15, T.kebalik + .4, t)) : 0;
      ctx.save(); ctx.translate((1 - k) * 1700, y + 58); ctx.globalAlpha = k * (i === 3 ? lerp(.5, 1, flip) : 1);
      const sy = Math.cos(Math.PI * flip); ctx.scale(flip > .5 ? -1 : 1, sy); ctx.translate(0, -58);
      if (flip > .5) ctx.translate(0, 0);
      ctx.fillStyle = 'rgba(241,239,230,.035)'; ctx.fillRect(-760, -14, 1520, 144);
      setFont(ctx, `400 30px "${MONO}"`, 2); ctx.fillStyle = 'rgba(241,239,230,.55)'; ctx.fillText(no, -740, 74);
      setFont(ctx, `400 92px "${DISP}"`, 1); ctx.fillStyle = IVORY;
      const shown = name.slice(0, Math.round(name.length * E.outCubic(inv(t0, t0 + .5, t))));
      ctx.fillText(shown, -650, 92);
      for (let j = 0; j < 4; j++) {                        // flaps shuffle, then rest covered
        const x = j < 2 ? 300 + j * 88 : 520 + (j - 2) * 88, ts = t - t0 - .15 - j * .05, shuf = ts > 0 && ts < .7;
        const ch = shuf ? String(Math.floor(rnd(Math.floor(t * 20) + j * 7 + i * 31) * 10)) : (i === 3 && flip > .5 && j < 2 ? '?' : '');
        tile(ctx, x, 0, ch, shuf ? (t * 20 % 1) : 0, i === 3 && flip > .9 && j < 2);
      }
      setFont(ctx, `400 70px "${DISP}"`); ctx.fillStyle = 'rgba(241,239,230,.4)'; ctx.fillText(':', 488, 86);
      ctx.restore();
    });
  }

  // ── station C: the quote, a lens that finds no method, the strike, the rule
  const QL = [['“Indonesia', 0], ['tertinggal', 1]], QL2 = [['sekian', 2], ['puluh', 3], ['tahun.”', 4]];
  function quoteText(ctx, t) {
    setFont(ctx, `italic 380 150px "${SER}"`); 
    const line = (arr, y) => { let cx = -600; for (const [wd, i] of arr) { const k = E.outQuint(inv(T.q[i] - .08, T.q[i] + .35, t)); const ww = ctx.measureText(wd + ' ').width;
      if (k > 0) { ctx.globalAlpha *= 1; ctx.save(); ctx.translate(0, (1 - k) * 50); ctx.globalAlpha = k * ctx.globalAlpha; ctx.fillText(wd, cx, y); ctx.restore(); } cx += ww; } return cx; };
    ctx.fillStyle = IVORY; line(QL, -60); return line(QL2, 120);
  }
  function quote(ctx, t) {
    const kh = E.outCubic(inv(T.kalimat - .4, T.kalimat, t)); if (kh <= 0) return;
    const dim = 1 - .62 * E.outCubic(inv(T.jadi + .3, T.jadi + .8, t));
    ctx.globalAlpha = kh * dim; setFont(ctx, `700 26px "${MONO}"`, 6); ctx.fillStyle = 'rgba(241,239,230,.7)';
    const lbl = 'KALIMAT YANG SERING KAMU DENGAR'; ctx.fillText(lbl.slice(0, Math.round(lbl.length * inv(T.kalimat - .4, T.kalimat + .2, t))), -596, -250);
    ctx.globalAlpha = dim; quoteText(ctx, t);
    // lens sweep: magnifies the words under it
    const kl = inv(T.kami, T.metode, t);
    if (kl > 0 && t < T.jadi + .3) {
      const la = E.outCubic(inv(T.kami, T.kami + .3, t)) * (1 - inv(T.jadi, T.jadi + .3, t));
      const lx = lerp(-480, 480, E.inOutSine(kl)) + 40 * Math.sin(kl * 19), ly = 20 + 70 * Math.sin(kl * 7.3), R = 150;
      ctx.save(); ctx.globalAlpha = la; ctx.beginPath(); ctx.arc(lx, ly, R, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = 'rgba(30,31,26,.78)'; ctx.fillRect(lx - R, ly - R, 2 * R, 2 * R);
      ctx.translate(lx, ly); ctx.scale(1.55, 1.55); ctx.translate(-lx, -ly); ctx.globalAlpha = la; quoteText(ctx, t);
      ctx.restore();
      ctx.save(); ctx.globalAlpha = la; ctx.strokeStyle = '#E9E6DA'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(lx, ly, R, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx + R * .74, ly + R * .74); ctx.lineTo(lx + R * 1.6, ly + R * 1.6); ctx.stroke();
      const gl = ctx.createLinearGradient(lx - R, ly - R, lx + R, ly + R); gl.addColorStop(0, 'rgba(255,255,255,.16)'); gl.addColorStop(.5, 'rgba(255,255,255,0)');
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(lx, ly, R - 8, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    // the finding
    const kf = inv(T.tidak, T.tidak + 1.0, t);
    if (kf > 0) { ctx.globalAlpha = dim * (1 - inv(T.takkan - .2, T.takkan + .2, t)); setFont(ctx, `700 30px "${MONO}"`, 5); ctx.fillStyle = 'rgba(241,239,230,.82)';
      const s = 'METODE HITUNG: TIDAK DITEMUKAN'; ctx.fillText(s.slice(0, Math.round(s.length * kf)), -596, 260); }
    // the strike, drawn through both lines
    const ks = E.brake(inv(T.jadi, T.jadi + .45, t));
    if (ks > 0) { ctx.globalAlpha = 1; ctx.fillStyle = IVORY;
      ctx.save(); ctx.translate(-630, 66); ctx.rotate(-.05); ctx.fillRect(0, -8, 1300 * ks, 16); ctx.restore(); }
    ctx.globalAlpha = 1;
  }
  function verdict(ctx, t) {
    const k = E.outQuint(inv(T.takkan - .05, T.takkan + .55, t)); if (k <= 0) return;
    ctx.save(); ctx.translate(0, (1 - k) * 70); ctx.globalAlpha = k;
    setFont(ctx, `400 90px "${DISP}"`, 1); ctx.textAlign = "left";
    const a = 'HANYA ANGKA ', b = 'TERUKUR', c2 = ' DARI SUMBER RESMI.';
    const wa = ctx.measureText(a).width, wb = ctx.measureText(b).width, wc = ctx.measureText(c2).width, x0 = -(wa + wb + wc) / 2;
    const kb = E.snap(inv(T.takkan + .45, T.takkan + .75, t));
    ctx.fillStyle = LIME; ctx.fillRect(x0 + wa - 12, -80, (wb + 24) * kb, 100);
    ctx.fillStyle = IVORY; ctx.fillText(a, x0, 0); ctx.fillText(c2, x0 + wa + wb, 0);
    ctx.fillStyle = kb > .55 ? LIME_INK : IVORY; ctx.fillText(b, x0 + wa, 0);
    ctx.restore(); ctx.textAlign = 'left';
  }

  function post(o, t) {
    react(o, TX, HITS, t);                               // exposure + lens breath follow the hit's own light
    const gr = o.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * 1.05); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.55)');
    o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.fillStyle = gr; o.fillRect(0, 0, W, H);
    for (const [name, at, al] of HITS) drawTx(o, TX, name, t, at, al);
  }
  return scene;
}
