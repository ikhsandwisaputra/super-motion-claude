// Puncak · Kalau pecah, apa yang tersisa? (VO abd_vo_ahmad_08, 74.3 s). The theme flips: the bubble pops and what stays is NYATA.
// New techniques — KABEL GELAP (a fibre-bundle cross-section: 20 cores, 19 die out one by one and later relight core by core for
// cloud + streaming) and JAM USANG (two clocks side by side: the fibre's hand barely moves, the chip's hand spins itself old).
// Gelembung carries over (the dot-com bubble, the big twist bubble, the GPU daydream). Ahpo A06 is the closing layered parallax.
// Numbers only from Ahri's sourced facts (Seattle Times 2002, Forbes 2025, TechFinitive sponsored, small); analysis is labelled.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DISP, SER, MONO, rnd, D2R, timing, makeChapter,
  loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, mk } from './kit.js';
import { kq, pop, chip } from './draw.js';
import { bubble, bubblePop, pumped, wobble } from './gelembung.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const INK = '#1D1E18', TILE = '#191A15', SOIL = '#13140F';
const still = im => ({ n: 2, fps: 1, img: [im, im] });
const shake = (p, t, t0, amp = 16) => { const s = t - t0; if (s > 0 && s < .6) p.ty += amp * Math.exp(-s / .12) * Math.sin(s * 80); };
const sp = (t, t0, z = .45, T = .5) => t <= t0 ? 0 : spring(t - t0, z, T);

// ── Kabel Gelap: one fibre bundle, 20 cores (1 centre + 7 + 12) ─────────────────────────────────────────────
const FIB = [[0, 0], ...Array.from({ length: 7 }, (_, i) => [.4, i / 7 * 2 * Math.PI + .3]), ...Array.from({ length: 12 }, (_, i) => [.76, i / 12 * 2 * Math.PI])]
  .map(([r, a]) => [r * Math.cos(a), r * Math.sin(a)]);
const RANK = (() => { const o = Array.from({ length: 19 }, (_, i) => i + 1).sort((a, b) => rnd(a * 7.7) - rnd(b * 7.7)), r = [0]; o.forEach((f, k) => r[f] = k); return r; })();
function bundle(ctx, x, y, R, t, lit) {
  const a0 = ctx.globalAlpha; ctx.save(); ctx.translate(x, y);
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.fillStyle = '#10110D'; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.strokeStyle = ivo(.6); ctx.lineWidth = 5; ctx.stroke();
  ctx.strokeStyle = ivo(.14); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, R * .93, 0, 7); ctx.stroke();
  for (let k = 0; k < 40; k++) { const a = k / 40 * 2 * Math.PI; ctx.beginPath(); ctx.moveTo(Math.cos(a) * R * .93, Math.sin(a) * R * .93); ctx.lineTo(Math.cos(a) * R * .97, Math.sin(a) * R * .97); ctx.stroke(); }
  const rf = R * .105;
  FIB.forEach(([fx, fy], i) => {
    const L = clamp(lit(i)), cx = fx * R, cy = fy * R;
    ctx.fillStyle = '#1E1F19'; ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rf, 0, 7); ctx.fill(); ctx.stroke();
    if (L > .01) { const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rf * 2.8); g.addColorStop(0, ivo(.55 * L)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(cx - rf * 2.8, cy - rf * 2.8, rf * 5.6, rf * 5.6); }
    ctx.fillStyle = L > .01 ? `rgba(255,253,244,${.12 + .88 * L})` : '#0B0C09'; ctx.beginPath(); ctx.arc(cx, cy, rf * .55, 0, 7); ctx.fill();
  });
  ctx.restore(); ctx.globalAlpha = a0;
}
const flick = (t, i) => rnd(Math.floor(t * 30) * 3.7 + i * 11) > .45 ? 1 : .15;
const dieOut = (t, t0, i, step = .035) => { if (i === 0) return 1; const a = t0 + RANK[i] * step, u = inv(a - .12, a, t); return u <= 0 ? 1 : u >= 1 ? 0 : flick(t, i) * (1 - u); };
const relight = (t, t0, i, step = .07) => { if (i === 0) return 1; const a = t0 + RANK[i] * step, u = inv(a, a + .1, t); return u <= 0 ? 0 : u >= 1 ? 1 : flick(t, i) * u; };

// soil cross-section (S3/S4)
const GY = -90, DOTS = Array.from({ length: 260 }, (_, i) => [(rnd(i + 500) - .5) * 1960, GY + 14 + rnd(i + 900) * 560, 1 + rnd(i + 1300) * 2.4]);
function soil(ctx) {
  ctx.fillStyle = SOIL; ctx.fillRect(-1000, GY, 2000, 620);
  ctx.fillStyle = ivo(.07); for (const [x, y, r] of DOTS) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
  const g = ctx.createLinearGradient(0, GY, 0, GY + 120); g.addColorStop(0, 'rgba(241,239,230,.06)'); g.addColorStop(1, 'rgba(241,239,230,0)'); ctx.fillStyle = g; ctx.fillRect(-1000, GY, 2000, 120);
  ctx.fillStyle = ivo(.55); ctx.fillRect(-1000, GY - 1.5, 2000, 3);
}
function fibreLine(ctx, x0, x1, y, L, t, seed) {             // one buried fibre: dark sheath, a lit core with a travelling pulse
  ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x0, y + 2); ctx.lineTo(x1, y + 2); ctx.stroke();
  ctx.strokeStyle = ivo(.13 + .72 * L); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  if (L > .05 && x1 - x0 > 80) { const ph = ((t * .55 + rnd(seed)) % 1), px = lerp(x0, x1, ph), g = ctx.createRadialGradient(px, y, 0, px, y, 40);
    g.addColorStop(0, ivo(.7 * L)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(px - 40, y - 40, 80, 80); }
}

// line-art icons for S7
function cloudIcon(ctx, s) {
  ctx.beginPath(); ctx.moveTo(-1.1 * s, .5 * s); ctx.arc(-.75 * s, .1 * s, .42 * s, Math.PI * .55, Math.PI * 1.45); ctx.arc(-.15 * s, -.25 * s, .6 * s, Math.PI * 1.1, Math.PI * 1.95);
  ctx.arc(.62 * s, .08 * s, .46 * s, Math.PI * 1.5, Math.PI * .45); ctx.closePath(); ctx.fillStyle = TILE; ctx.fill(); ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.stroke();
}
function playIcon(ctx, s) {
  ctx.fillStyle = TILE; ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(-1.05 * s, -.68 * s, 2.1 * s, 1.36 * s, 14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = IVORY; ctx.beginPath(); ctx.moveTo(-.25 * s, -.36 * s); ctx.lineTo(.42 * s, 0); ctx.lineTo(-.25 * s, .36 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = ivo(.35); ctx.fillRect(-.9 * s, .48 * s, 1.8 * s, 5); ctx.fillStyle = IVORY; ctx.fillRect(-.9 * s, .48 * s, .7 * s, 5);
}

// Jam Usang: a clock face, hand angle a (radians, 0 = 12 o'clock); ghost hands when it spins
function clock(ctx, x, y, R, a, o = {}) {
  ctx.save(); ctx.translate(x, y);
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = '#121310'; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.strokeStyle = ivo(.75); ctx.lineWidth = 5; ctx.stroke();
  for (let i = 0; i < 60; i++) { const q = i / 60 * 2 * Math.PI, l = i % 5 ? .05 : .12; ctx.strokeStyle = ivo(i % 5 ? .25 : .7); ctx.lineWidth = i % 5 ? 2 : 4;
    ctx.beginPath(); ctx.moveTo(Math.sin(q) * R * .9, -Math.cos(q) * R * .9); ctx.lineTo(Math.sin(q) * R * (.9 - l), -Math.cos(q) * R * (.9 - l)); ctx.stroke(); }
  if (o.inner) o.inner(ctx);
  const hand = (q, al) => { ctx.strokeStyle = o.col ? o.col.replace('1)', al + ')') : ivo(al); ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-Math.sin(q) * R * .14, Math.cos(q) * R * .14); ctx.lineTo(Math.sin(q) * R * .76, -Math.cos(q) * R * .76); ctx.stroke(); };
  for (let g = (o.ghost || 0); g > 0; g--) hand(a - g * (o.dA || 0) / (o.ghost + 1), .14 * (o.ghost + 1 - g) / o.ghost);
  hand(a, 1); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill(); ctx.restore();
}

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {};

  async function load() {
    const kb = '../assets/shared/kutipan/', hb = '../assets/shared/humanis/', vb = '../assets/shared/vid/', AB = '../assets/shared/ahpo/';
    await Promise.all([
      (async () => { IM.tf = await loadImg(kb + 'techfinitive-the-infrastructure-nobody-wanted-is-the.png', 1800); })(),
      ...['gel_ranting', 'kabel', 'lorong_jar'].map(async n => { V[n] = await loadVid(vb, n); }),
      (async () => { const im = await loadImg(hb + 'B3/B3_2_teknisi-kabel-rak.jpg', 1400), [c, g] = mk(1050, 700);   // hands + cables only, no face
        g.drawImage(im, im.width * .25, im.height * .25, im.width * .75, im.height * .75, 0, 0, 1050, 700); V.b32 = still(c); })(),
    ]);
    const bmp = async f => createImageBitmap(await (await fetch(AB + f + '.png')).blob());
    const comp = async names => { const [c, g] = mk(2000, 1125); g.imageSmoothingQuality = 'high'; for (const n of names) g.drawImage(await bmp(`A06/A06_${n}`), 0, 0, 2000, 1125); return c; };
    IM.sky = await comp(['01_BG_langit-malam-tanah']); IM.tower = await comp(['02_MG_tiang-transmisi-kabel-udara']);
    IM.bld = await comp(['03_MG_bayangan-gedung', '04_MG_gedung-pusat-data', '05_MG_lampu-jendela-gedung']);
    IM.reel = await comp(['06_FG_bayangan-gulungan', '07_FG_gulungan-kabel-serat-optik']);
    { const [c, g] = mk(1304, 589), sx = 2000 / 4000; g.drawImage(IM.bld, 1151 * sx, 810 * sx, 2608 * sx, 1178 * sx, 0, 0, 1304, 589); IM.bldCut = c; }   // the building alone (S9)
  }

  const withA = (ctx, a, fn) => { if (a <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * Math.min(1, a); fn(); ctx.globalAlpha = a0; };
  const tagR = (ctx, text, t, t0) => txt(ctx, text, 880, -440, t, t0, MN(18), { ls: 4, align: 'right', col: ivo(.55) });
  const ap = (ctx, im, cx, cy, s) => ctx.drawImage(im, cx - 2000 * s, cy - 1125 * s, 4000 * s, 2250 * s);
  const AP = (cx, cy, s, px, py) => [cx + (px - 2000) * s, cy + (py - 1125) * s];
  function pin(ctx, x, y, t, t0, lab) {
    const k = pop(t, t0); if (k <= 0) return; ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, y, 10 * Math.min(k, 1.2), 0, 7); ctx.fill();
    ctx.strokeStyle = ivo(.5 * clamp(t - t0)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 24 + 8 * Math.sin(t * 7), 0, 7); ctx.stroke();
    if (lab) { withA(ctx, clamp((t - t0 - .1) / .25), () => { setFont(ctx, MN(24), 5); const w = ctx.measureText(lab).width; ctx.fillStyle = 'rgba(11,12,9,.82)'; ctx.fillRect(x + 26, y - 22, w + 24, 42); });
      txt(ctx, lab, x + 38, y + 9, t, t0 + .1, MN(24), { ls: 5 }); }
  }
  const strike = (ctx, x0, x1, y, t, t0, w = 6) => { const k = E.outCubic(inv(t0, t0 + .3, t)); if (k <= 0) return; ctx.fillStyle = IVORY; ctx.fillRect(x0, y - w / 2, (x1 - x0) * k, w); };

  // GPU daydream chips (S11)
  const GPU = Array.from({ length: 15 }, (_, i) => ({ x: (rnd(i + 40) - .5) * 360, ts: i * .062, rot: (rnd(i + 60) - .5) * 1.4, sc: .2 + rnd(i + 80) * .06,
    py: 210 - Math.floor(i / 5) * 78 - rnd(i + 90) * 20, px: -180 + (i % 5) * 90 + (rnd(i + 70) - .5) * 30, tag: i % 3 === 0 }));

  // ── stations ────────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, mod(p, t) { shake(p, t, A.meletus, 12); }, draw(ctx, t) {            // S0 · "Sekarang anggap aja gelembungnya beneran meletus."
      // the real frozen bubble (pixabay 7141), centre (-229, 40) r 312 in this plate; at meletus smash-cut to the room + code burst on the same spot
      const BX = -229, BY = 40, BR = 312, sP = t - A.meletus;
      if (sP < 0) {
        plate(ctx, V.gel_ranting, t, 0, 10, 1500, 780, kq(t, -.2, .6), { t0: 0, dim: .06, grade: 'grayscale(1) contrast(1.12) brightness(.92)' });
        const kr = E.inOutCubic(inv(A.gelembungnya - .05, A.gelembungnya + .7, t));
        if (kr > 0) { ctx.save(); ctx.strokeStyle = ivo(.9); ctx.lineWidth = 3; ctx.setLineDash([14, 10]); ctx.lineDashOffset = -t * 40;
          ctx.beginPath(); ctx.arc(BX, BY, BR + 26, -Math.PI / 2, -Math.PI / 2 + kr * 2 * Math.PI); ctx.stroke(); ctx.restore(); }
      } else bubblePop(ctx, BX, BY, BR, sP, { seed: 5, n: 170 });
      txt(ctx, 'Sekarang anggap aja gelembungnya', 0, -420, t, A.sekarang - .05, SRF(58), { align: 'center' });
      fall(ctx, 'MELETUS', 0, 190, t, A.meletus - .02, DSP(300), { align: 'center' });
    } },
    { at: A.terus - .12, via: 'whip', draw(ctx, t) {              // S1 · "Terus, apa yang nyisa?"
      const s = t - (A.terus - .2); if (s > 0 && s < 1.6) bubblePop(ctx, 0, -30, 380, s, { seed: 3, flash: false, n: 150 });
      txt(ctx, 'Terus,', 0, -170, t, A.terus - .1, SRF(64), { align: 'center', col: ivo(.85) });
      fall(ctx, 'APA YANG NYISA?', 0, 90, t, A.nyisa - .08, DSP(220), { align: 'center' });
    } },
    { at: A.sejarah - .12, via: 'push', draw(ctx, t) {            // S2 · split-flap year 2026 → 2000
      txt(ctx, 'Sejarah heboh internet', 0, -300, t, A.sejarah - .05, SRF(60), { align: 'center' });
      const k = kq(t, A.sejarah - .1, .45); if (k > 0) withA(ctx, k, () => {
        ctx.fillStyle = TILE; ctx.beginPath(); ctx.roundRect(-400, -150, 800, 330, 18); ctx.fill(); ctx.strokeStyle = ivo(.18); ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(-400, 13, 800, 4); });
      const v = lerp(2026, 2000, E.inOutCubic(inv(A.sejarah + .15, A.th2000 - .05, t)));
      if (k > 0) withA(ctx, k, () => {
        setFont(ctx, DSP(300)); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.save(); ctx.beginPath(); ctx.rect(-400, -150, 800, 330); ctx.clip();
        const n = Math.round(v), off = v - n; ctx.fillText(String(n), 0, 125 - off * 260); if (Math.abs(off) > .02) ctx.fillText(String(n + Math.sign(off)), 0, 125 - off * 260 + Math.sign(off) * 260);
        ctx.restore(); ctx.textAlign = 'left'; });
      typeOn(ctx, 'ERA DOT-COM', 0, 260, t, A.th2000 + .1, MN(30), { ls: 8, cps: 30, align: 'center' });
      txt(ctx, 'kasih kita gambaran.', 0, 370, t, A.gambaran - .1, SRF(50), { align: 'center', col: ivo(.85) });
    } },
    { at: A.akhir - .12, via: 'rise', draw(ctx, t) {              // S3 · akhir 1990-an, telcos race to bury fibre
      soil(ctx);
      fall(ctx, '1990-AN', -860, -150, t, A.th1990 - .1, DSP(200));
      txt(ctx, 'Perusahaan telekomunikasi', 860, -330, t, A.perusahaan - .1, SRF(50), { align: 'right' });
      txt(ctx, 'lomba-lomba nanem', 860, -250, t, A.lomba - .1, SRF(50), { align: 'right', col: ivo(.85) });
      typeOn(ctx, 'KABEL SERAT OPTIK', 860, -160, t, A.kabel - .05, MN(30), { ls: 6, cps: 32, align: 'right' });
      ['TELKO A', 'TELKO B', 'TELKO C'].forEach((lab, i) => {
        const y = 40 + i * 130, u = E.outCubic(inv(A.lomba + i * .14, A.lomba + 1.5 + i * .28, t)), hx = lerp(-940, 900 - i * 120, u);
        if (kq(t, A.telekomunikasi + i * .13, .3) <= 0) return;
        withA(ctx, kq(t, A.telekomunikasi + i * .13, .3), () => { setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.6); ctx.fillText(lab, -860, y - 22); });
        if (u > 0) { fibreLine(ctx, -940, hx, y, 1, t, i); const g = ctx.createRadialGradient(hx, y, 0, hx, y, 60); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g; ctx.fillRect(hx - 60, y - 60, 120, 120); }
      });
      [-520, -200, 120, 440, 760].forEach((x, i) => { const k = E.inCubic(inv(A.nanem + i * .14, A.nanem + i * .14 + .22, t)); if (k <= 0) return;
        ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(x, GY); ctx.lineTo(x, GY + k * 400); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, GY + k * 400, 6, 0, 7); ctx.fill(); });
      tagR(ctx, 'ILUSTRASI', t, A.telekomunikasi);
    } },
    { at: A.begitu - .12, via: 'whip', draw(ctx, t) {             // S4 · the bubble pops, ±95 % of the fibre goes dark
      soil(ctx);
      for (let i = 0; i < 20; i++) { const y = 20 + i * 19, kin = E.outCubic(inv(A.begitu - .2 + i * .02, A.begitu + .5 + i * .02, t));
        const L = i === 7 ? 1 : 1 - inv(A.nganggur + RANK[i === 0 ? 7 : i] * .063 - .1, A.nganggur + RANK[i === 0 ? 7 : i] * .063, t);
        if (kin > 0) fibreLine(ctx, -940, lerp(-940, 940, kin), y, L, t, i + 30); }
      const r = 170 * pumped(t, A.begitu - .25, [], .04);
      if (t < A.pecah) bubble(ctx, 0, -290, r, t, { wob: wobble(t, [], [A.pecah - .5, A.pecah]), ten: inv(A.pecah - .6, A.pecah, t), seed: 2,
        inner: c => { setFont(c, MN(26), 5); c.textAlign = 'center'; c.fillStyle = ivo(.8); c.fillText('DOT-COM', 0, -280); c.textAlign = 'left'; } });
      else bubblePop(ctx, 0, -290, r, t - A.pecah, { seed: 9, floor: GY });
      fall(ctx, '95%', 0, -140, t, A.n95 - .05, DSP(250), { align: 'center' });
      typeOn(ctx, 'SERAT OPTIK NGANGGUR · PERKIRAAN 85–95 %', 0, -40, t, A.nganggur - .1, MN(22), { ls: 4, cps: 40, align: 'center' });
      srcTag(ctx, 'Seattle Times, 13 Jan 2002 · Forbes, 24 Mar 2025', -860, 455, t, A.n95 + .2);
    } },
    { at: A.kabel2 - .12, via: 'push', draw(ctx, t) {             // S5 · KABEL GELAP: the bundle dies core by core
      const kb = pop(t, A.kabel2 - .2); if (kb > 0) { ctx.save(); ctx.translate(-420, -20); ctx.scale(Math.min(kb, 1.1), Math.min(kb, 1.1)); bundle(ctx, 0, 0, 330, t, i => dieOut(t, A.gelap - .05, i)); ctx.restore(); }
      txt(ctx, 'Istilahnya,', 120, -300, t, A.kabel2 - .2, SRF(46), { col: ivo(.8) });
      slab(ctx, 'KABEL GELAP', 120, -190, t, A.gelap - .05, { size: 64, lime: true });
      txt(ctx, 'udah ketanam rapi,', 120, -30, t, A.udah - .1, SRF(56));
      txt(ctx, 'tapi nggak kepake.', 120, 60, t, A.tapi - .1, SRF(56), { col: ivo(.88) });
      plate(ctx, V.kabel, t, 430, 300, 880, 240, kq(t, A.kabel2, .6), { t0: A.kabel2, dim: .2 + .6 * inv(A.gelap, A.kepake + .3, t) });
    } },
    { at: A.kebanyakan - .12, via: 'truck', draw(ctx, t) {        // S6 · harga turun hampir dua pertiga dalam tiga tahun
      txt(ctx, 'Kebanyakan kabel nganggur itu akhirnya…', -860, -400, t, A.kebanyakan - .1, SRF(50));
      typeOn(ctx, 'HARGA KONEKSI INTERNET CEPAT', -860, -320, t, A.harga - .1, MN(26), { ls: 5, cps: 36 });
      const x0 = -760, bw = 340, yb = 380, H0 = 600, kin = E.outCubic(inv(A.kebanyakan, A.kebanyakan + .6, t)), sh = E.inOutCubic(inv(A.turun - .05, A.pertiga, t)), h = H0 * kin * (1 - .64 * sh);
      if (kin > 0) {
        if (sh > 0) { ctx.strokeStyle = ivo(.4); ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.strokeRect(x0, yb - H0, bw, H0); ctx.setLineDash([]);
          withA(ctx, sh, () => { setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.55); ctx.fillText('AWAL', x0 + 16, yb - H0 - 18); }); }
        ctx.fillStyle = IVORY; ctx.fillRect(x0, yb - h, bw, h); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(x0 + bw - 24, yb - h, 24, h);
        ctx.fillStyle = ivo(.5); ctx.fillRect(-900, yb, 1100, 3);
        if (sh >= 1) withA(ctx, kq(t, A.tiga, .4), () => { setFont(ctx, MN(20), 4); ctx.fillStyle = INK; ctx.fillText('3 TAHUN', x0 + 16, yb - h + 36); });
      }
      txt(ctx, 'HAMPIR', -260, -150, t, A.hampir - .1, MN(32), { ls: 8, col: ivo(.75) });
      fall(ctx, '−2/3', -270, 100, t, A.pertiga - .05, DSP(280), { col: LIME });
      typeOn(ctx, 'DALAM 3 TAHUN', -260, 190, t, A.tiga - .05, MN(34), { ls: 6, cps: 30 });
      srcTag(ctx, 'Seattle Times, 13 Jan 2002', -860, 455, t, A.pertiga + .2);
    } },
    { at: A.kabel3 - .12, via: 'whip', draw(ctx, t) {             // S7 · dicap buang-buang duit → relit for cloud + streaming
      txt(ctx, 'Kabel yang dulunya…', -860, -400, t, A.kabel3 - .1, SRF(48), { col: ivo(.85) });
      bundle(ctx, -470, 20, 300, t, i => relight(t, A.kepake2, i));
      stamp2(ctx, t);
      const kd = inv(A.cloud + .2, A.cloud + .5, t);
      if (kd > 0) for (const [tx, ty, ph] of [[180, -80, 0], [470, -80, .5]]) { ctx.strokeStyle = ivo(.25 * kd); ctx.lineWidth = 2; ctx.setLineDash([4, 10]);
        ctx.beginPath(); ctx.moveTo(-170, 20); ctx.quadraticCurveTo(0, -140, tx - 80, ty); ctx.stroke(); ctx.setLineDash([]);
        for (let d = 0; d < 3; d++) { const u = (t * .9 + ph + d / 3) % 1, mx = (1 - u) * (1 - u) * -170 + 2 * u * (1 - u) * 0 + u * u * (tx - 80), my = (1 - u) * (1 - u) * 20 + 2 * u * (1 - u) * -140 + u * u * ty;
          ctx.fillStyle = ivo(.9 * kd); ctx.beginPath(); ctx.arc(mx, my, 5, 0, 7); ctx.fill(); } }
      for (const [x, t0, fn, lab] of [[260, A.cloud, cloudIcon, 'CLOUD'], [560, A.streaming, playIcon, 'STREAMING']]) { const k = pop(t, t0 - .05); if (k <= 0) continue;
        ctx.save(); ctx.translate(x, -80); ctx.scale(Math.min(k, 1.15), Math.min(k, 1.15)); fn(ctx, 80); ctx.restore();
        txt(ctx, lab, x, 40, t, t0 + .05, MN(22), { ls: 5, align: 'center' }); }
      evid(ctx, IM.tf, 420, 280, 760, t, A.kabel3 + .4, { crop: [.02, .08, .96, .42], tab: 'techfinitive.com · 7 Agu 2026 · bersponsor', rot: -1.5 });
      srcTag(ctx, 'Seattle Times, 13 Jan 2002 · TechFinitive (bersponsor), 7 Agu 2026', -860, 460, t, A.kepake2);
    } },
    { at: A.menurut - .12, via: 'push', draw(ctx, t) {            // S8 · Menurut kami, polanya bisa mirip
      txt(ctx, 'Menurut kami, polanya nanti bisa…', -860, -390, t, A.menurut - .1, SRF(50));
      tagR(ctx, 'ANALISIS REDAKSI', t, A.menurut);
      for (const [y, yr, why, left, t0] of [[-170, '2000', 'DOT-COM', 'KABEL SERAT OPTIK', A.polanya - .1], [170, '2026', 'AI', 'PUSAT DATA ?', A.polanya + .2]]) {
        fall(ctx, yr, -860, y + 60, t, t0, DSP(170));
        typeOn(ctx, why, -520, y + 18, t, t0 + .1, MN(38), { ls: 6, cps: 30 });
        const ka = E.outCubic(inv(t0 + .25, t0 + .55, t)); if (ka > 0) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-180, y); ctx.lineTo(lerp(-180, 20, ka), y); ctx.stroke();
          if (ka > .9) { ctx.beginPath(); ctx.moveTo(4, y - 14); ctx.lineTo(22, y); ctx.lineTo(4, y + 14); ctx.stroke(); } }
        typeOn(ctx, left, 70, y + 18, t, t0 + .45, MN(38), { ls: 6, cps: 34 });
      }
      const km = E.outBack ? E.outBack(inv(A.mirip - .1, A.mirip + .3, t)) : E.outCubic(inv(A.mirip - .1, A.mirip + .3, t));
      if (km > 0) { ctx.strokeStyle = LIME; ctx.lineWidth = 12; ctx.lineCap = 'round';
        for (const dy of [-18, 18]) { ctx.beginPath(); for (let i = 0; i <= 24; i++) { const x = -760 + i * 6 * km, y = dy + Math.sin(i / 24 * 2 * Math.PI) * 10; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        txt(ctx, 'MIRIP', -580, 14, t, A.mirip, MN(30), { ls: 8 }); }
    } },
    { at: A.perusahaannya - .12, via: 'rise', draw(ctx, t) {      // S9 · the twist: company falls, investor drops, the building stays = NYATA
      tagR(ctx, 'ANALISIS REDAKSI', t, A.perusahaannya);
      const k0 = kq(t, A.perusahaannya - .2, .5), popd = t >= A.infrastrukturnya;
      if (k0 > 0) { ctx.fillStyle = ivo(.5 * k0); ctx.fillRect(-900 * k0, 300, 1800 * k0, 3); }
      withA(ctx, k0 * (popd ? 1 : .6), () => ctx.drawImage(IM.bldCut, -300, 109, 600, 271));
      if (popd) { const g = ctx.createRadialGradient(0, 250, 0, 0, 250, 420); g.addColorStop(0, ivo(.08 * clamp((t - A.infrastrukturnya) / .3))); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(-420, -170, 840, 470); }
      { const s = t - A.tumbang, a0 = ctx.globalAlpha, rot = s > 0 ? Math.PI / 2 * E.inCubic(clamp(s / .45)) : 0, dy = s > .45 ? 1600 * (s - .45) * (s - .45) : 0, al = clamp(1 - (s - .6) / .5);
        if (t > A.perusahaannya && al > 0) { setFont(ctx, DSP(130)); const w = ctx.measureText('PERUSAHAAN').width, px = w / 2, py = -200;
          ctx.save(); ctx.translate(px, py + dy); ctx.rotate(rot); ctx.globalAlpha = a0 * al; fall(ctx, 'PERUSAHAAN', -w, 0, t, A.perusahaannya, DSP(130)); ctx.restore(); ctx.globalAlpha = a0; } }
      { const s = t - A.rugi, a0 = ctx.globalAlpha, dy = s > 0 ? 1400 * s * s : 0, al = clamp(1 - (s - .3) / .4);
        if (al > 0) { ctx.save(); ctx.translate(0, dy); ctx.globalAlpha = a0 * al; fall(ctx, 'INVESTOR', 0, -60, t, A.investornya - .05, DSP(110), { align: 'center' }); ctx.restore(); ctx.globalAlpha = a0; } }
      const r = 430 * pumped(t, A.perusahaannya - .25, [], .02);
      if (!popd) bubble(ctx, 0, -20, r, t, { wob: wobble(t, [[A.perusahaannya + .1]], [A.tapi2, A.infrastrukturnya]), ten: inv(A.tapi2, A.infrastrukturnya, t), floor: 300, seed: 4 });
      else bubblePop(ctx, 0, -20, r, t - A.infrastrukturnya, { seed: 21, floor: 300, n: 220 });
      fall(ctx, 'TETAP TINGGAL', 0, -230, t, A.tetap - .1, DSP(170), { align: 'center' });
      slab(ctx, 'INI YANG NYATA', 0, 440, t, A.infrastrukturnya + .45, { size: 40, lime: true, align: 'center' });
    } },
    { at: A.cuma - .12, via: 'whip', draw(ctx, t) {               // S10 · Jam Usang: fibre (decades) vs AI chip (a few years)
      txt(ctx, 'Cuma bedanya,', 0, -410, t, A.cuma - .1, SRF(54), { align: 'center' });
      tagR(ctx, 'ANALISIS REDAKSI', t, A.cuma);
      const kL = pop(t, A.serat2 - .25);
      if (kL > 0) { const steps = [0, 1, 2, 3].reduce((s, i) => s + .1 * E.snap(inv(A.puluhan + i * .4, A.puluhan + i * .4 + .12, t)), 0), a = .9 + .03 * Math.max(0, t - A.serat2) + steps;
        ctx.save(); ctx.translate(-430, -70); ctx.scale(Math.min(kL, 1.1), Math.min(kL, 1.1)); clock(ctx, 0, 0, 200, a); ctx.restore(); }
      typeOn(ctx, 'SERAT OPTIK', -430, 205, t, A.serat2, MN(30), { ls: 8, cps: 28, align: 'center' });
      fall(ctx, 'PULUHAN TAHUN', -430, 320, t, A.puluhan - .05, DSP(100), { align: 'center' });
      const kR = pop(t, A.chip - .25);
      if (kR > 0) { const d = A.ketinggalan - A.cepat, s = t - A.cepat, rev = s <= 0 ? 0 : s < d ? 3 * s * s / (2 * d) : 3 * (d / 2 + s - d), rate = 3 * clamp(s / d);
        const age = E.outCubic(inv(A.zaman - .1, A.zaman + .5, t));
        ctx.save(); ctx.translate(430, -70); ctx.scale(Math.min(kR, 1.1), Math.min(kR, 1.1));
        clock(ctx, 0, 0, 200, .4 + rev * 2 * Math.PI, { col: 'rgba(200,245,60,1)', ghost: rate > .3 ? 5 : 0, dA: Math.min(2.4, rate * .9),
          inner: c => { c.save(); c.globalAlpha *= 1 - .6 * age; c.scale(.36, .36); c.filter = age > 0 ? `grayscale(${age}) brightness(${1 - .35 * age})` : 'none'; chip(c, 250); c.restore();
            if (age > 0) { c.strokeStyle = ivo(.75 * age); c.lineWidth = 3; c.beginPath(); c.moveTo(-40, -52); c.lineTo(-8, -10); c.lineTo(-22, 14); c.lineTo(18, 52); c.stroke(); } } });
        ctx.restore(); }
      typeOn(ctx, 'CHIP AI', 430, 205, t, A.chip, MN(30), { ls: 8, cps: 28, align: 'center' });
      fall(ctx, 'BEBERAPA TAHUN', 430, 320, t, A.beberapa - .05, DSP(100), { align: 'center' });
      txt(ctx, 'ketinggalan zaman', 430, 400, t, A.zaman - .1, SRF(38), { align: 'center', col: ivo(.7) });
    } },
    { at: A.jadi - .12, via: 'push', draw(ctx, t) {               // S11 · the GPU daydream pops
      txt(ctx, 'Jadi jangan keburu bayangin…', 0, -410, t, A.jangan - .1, SRF(54), { align: 'center' });
      tagR(ctx, 'ILUSTRASI', t, A.jadi);
      [[-340, 330, 26], [-290, 270, 40]].forEach(([x, y, rr], i) => { const k = pop(t, A.bayangin - .4 + i * .1); if (k > 0 && t < A.pasar + .1) bubble(ctx, x, y, rr * Math.min(k, 1.1), t, { seed: 7 + i }); });
      const R = 330 * pumped(t, A.bayangin - .25, [], .03), cy = -30;
      const chips = (c, fallAway) => { for (const g of GPU) { const s = t - (A.gpu - .15 + g.ts); if (s <= 0) continue;
          let y = Math.min(g.py, -340 + 1500 * s * s), x = g.px; if (fallAway > 0) { y += 1300 * fallAway * fallAway; x += g.x * fallAway * 1.5; }
          c.save(); if (fallAway > 0) c.globalAlpha *= clamp(1 - fallAway * 2.4); c.translate(x, cy + y); c.rotate(g.rot * (fallAway > 0 ? 1 + fallAway * 4 : 1)); c.scale(g.sc, g.sc); chip(c, 250); c.restore();
          if (g.tag && t > A.murah - .1 + g.ts * .5 && fallAway <= 0) { const k = pop(t, A.murah - .1 + g.ts * .5); if (k <= 0) continue;
            c.save(); c.translate(x + 40, cy + y - 46); c.rotate(-.12); c.scale(Math.min(k, 1.1), Math.min(k, 1.1)); c.fillStyle = IVORY; c.fillRect(-4, -20, 104, 34);
            setFont(c, MN(18), 3); c.fillStyle = INK; c.fillText('MURAH', 8, 3); c.restore(); } } };
      if (t < A.pasar) { bubble(ctx, 0, cy, R, t, { seed: 11, wob: wobble(t, [[A.gpu]], [A.ngebanjirin, A.pasar]), ten: inv(A.ngebanjirin, A.pasar, t),
          inner: c => { chips(c, 0); typeOn(c, 'BESOK PAGI', 0, cy - 220, t, A.besok - .05, MN(24), { ls: 6, cps: 30, align: 'center' }); } }); }
      else { chips(ctx, t - A.pasar); bubblePop(ctx, 0, cy, R, t - A.pasar, { seed: 13, n: 200 }); }
      typeOn(ctx, 'GPU MURAH NGEBANJIRIN PASAR?', 0, 400, t, A.gpu - .1, MN(28), { ls: 5, cps: 40, align: 'center' });
      setFont(ctx, MN(28), 5); const sw = ctx.measureText('GPU MURAH NGEBANJIRIN PASAR?').width; strike(ctx, -sw / 2 - 10, sw / 2 + 10, 390, t, A.pasar + .05, 5);
    } },
    { at: A.buat - .12, via: 'truck', draw(ctx, t) {              // S12 · Ahpo A06 layered parallax: gedung · listrik · orang
      const u = E.inOutSine(inv(A.buat - .4, A.semua, t)), k = kq(t, A.buat - .3, .6), s0 = .46;
      const L = d => ({ dx: -150 * d * u + 60 * d, sc: 1 + .08 * d * u });
      withA(ctx, k, () => { for (const [im, d] of [[IM.sky, .1], [IM.tower, .35], [IM.bld, .55], [IM.reel, 1]]) { const q = L(d); ap(ctx, im, q.dx, 20, s0 * q.sc); } });
      const at = (d, px, py) => { const q = L(d); return AP(q.dx, 20, s0 * q.sc, px, py); };
      txt(ctx, 'Buat Indonesia, yang nyisa nanti:', -860, -400, t, A.buat - .05, SRF(50));
      { const [x, y] = at(.55, 1740, 1030); pin(ctx, x, y, t, A.gedung - .05, 'GEDUNG'); }
      { const [x, y] = at(.35, 750, 880); pin(ctx, x, y, t, A.listrik - .1, 'JARINGAN LISTRIK'); }
      plate(ctx, V.b32, t, 610, -300, 500, 270, kq(t, A.orang - .1, .5), { t0: A.orang, dim: .05 });
      slab(ctx, 'ORANG-ORANG KITA', 360, -132, t, A.orang + .05, { size: 22 });
      txt(ctx, 'yang udah terlatih ngurusnya', 360, -70, t, A.terlatih - .1, SRF(36), { col: ivo(.9) });
    } },
    { at: A.semua - .12, via: 'push', draw(ctx, t) {              // S13 · the scale: WARISAN vs BEBAN, tergantung kita siap
      plate(ctx, V.lorong_jar, t, 0, 0, 1840, 1000, kq(t, A.semua - .3, .6), { t0: A.semua, dim: .58, marks: false });
      txt(ctx, 'Semua itu bisa jadi…', 0, -410, t, A.semua - .05, SRF(52), { align: 'center' });
      const tg = A.tergantung, ang = (-8 * sp(t, A.berharga) + 16 * sp(t, A.beban) - 8 * sp(t, tg) + (t > tg ? 2.5 * Math.sin((t - tg) * 6) * Math.exp(-(t - tg) / 1.1) : 0)) * D2R;
      const kin = kq(t, A.semua - .1, .5); if (kin > 0) withA(ctx, kin, () => {
        const py = -200, HL = 500; ctx.strokeStyle = IVORY; ctx.fillStyle = IVORY; ctx.lineWidth = 6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(0, 250); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-110, 270); ctx.lineTo(110, 270); ctx.lineTo(70, 250); ctx.lineTo(-70, 250); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.arc(0, py, 14, 0, 7); ctx.fill();
        const ends = [-1, 1].map(sg => [sg * HL * Math.cos(ang), py + sg * HL * Math.sin(ang)]);
        ctx.beginPath(); ctx.moveTo(ends[0][0], ends[0][1]); ctx.lineTo(ends[1][0], ends[1][1]); ctx.stroke();
        ends.forEach(([ex, ey], i) => { const hy = ey + 230; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 150, hy); ctx.moveTo(ex, ey); ctx.lineTo(ex + 150, hy); ctx.stroke();
          ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ex - 175, hy); ctx.quadraticCurveTo(ex, hy + 90, ex + 175, hy); ctx.stroke();
          const [w, t0] = i ? ['BEBAN', A.beban - .1] : ['WARISAN', A.warisan - .1]; fall(ctx, w, ex, hy - 14, t, t0, DSP(110), { align: 'center' });
          if (!i) txt(ctx, 'BERHARGA', ex, hy + 80, t, A.berharga - .05, MN(22), { ls: 6, align: 'center', col: ivo(.75) }); });
      });
      markLine(ctx, 'tergantung kita ', 'siap', ' manfaatinnya atau nggak.', 0, 420, t, A.tergantung - .1, A.siap, SRF(54), { align: 'center' });
    } },
  ];
  for (const s of ST) if (!Number.isFinite(s.at)) throw new Error('station key missing: ' + s.draw);

  // S7 stamp: BUANG-BUANG DUIT lands on "dicap", an ivory strike crosses it on "malah"
  function stamp2(ctx, t) {
    const s = t - (A.dicap - .05); if (s <= 0) return; const k = spring(s, .5, .28), a0 = ctx.globalAlpha, size = 80;
    ctx.save(); ctx.translate(420, -330); ctx.rotate(-5 * D2R); const sc = 1 + (1 - Math.min(k, 1.2)) * 1.1; ctx.scale(sc, sc); ctx.globalAlpha = a0 * clamp(s / .07);
    setFont(ctx, DSP(size), 4); const tw = ctx.measureText('BUANG-BUANG DUIT').width; ctx.fillStyle = LIME; ctx.fillRect(-tw / 2 - 18, -size * .56, tw + 36, size * 1.08);
    ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText('BUANG-BUANG DUIT', 0, size * .36); ctx.textAlign = 'left';
    const ks = E.outCubic(inv(A.malah - .05, A.malah + .25, t)); if (ks > 0) { ctx.fillStyle = '#11120E'; ctx.fillRect(-tw / 2 - 30, -5, (tw + 60) * ks, 10); }
    ctx.restore(); ctx.globalAlpha = a0;
  }

  return makeChapter({ B, ST, load, label: 'PUNCAK · KALAU PECAH, APA YANG TERSISA?', full: () => [] });
}
