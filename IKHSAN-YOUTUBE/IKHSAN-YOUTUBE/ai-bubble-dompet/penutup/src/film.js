// Penutup · the answer in one sentence (VO abd_vo_ahmad_09, 43.2 s). The theme closes: GELEMBUNG atau NYATA → the real part is
// the RAM price in our pocket. Peta Jalur returns as four arcs NVIDIA → DOMPET KITA (memory brightest) · the HP price tag swings
// up · the three suspects from the hook return, card 3 gets TERBUKTI · the comment field (template only, no invented values) ·
// NEW TECHNIQUE — KOMENTAR JADI PETA: mini comment cards fly in arcs and dock as pins on the dot map of Indonesia, each pin a "?"
// (no data implied, labelled ILUSTRASI) · the camera dives to Batam: listrik? air? · end screen + subscribe click.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DISP, SER, MONO, rnd, D2R, timing, makeChapter,
  loadImg, loadVid, plate, fall, typeOn, markLine, srcTag, slab, txt, grainRect, gone } from './kit.js';
import { kq, pop, stamp } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const INK = '#1D1E18', TILE = '#191A15';
const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const sp = (t, t0, z = .45, T = .5) => t <= t0 ? 0 : spring(t - t0, z, T);
const withA = (ctx, a, fn) => { if (a <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * Math.min(1, a); fn(); ctx.globalAlpha = a0; };
const qp = (p0, c, p2, u) => [(1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * c[0] + u * u * p2[0], (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * c[1] + u * u * p2[1]];
function cover(ctx, im, x, y, w, h) { const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s; ctx.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, x, y, w, h); }

// line-art icons (S5)
function bolt(ctx, s) {
  const P = [[8, -48], [-22, 6], [-2, 6], [-10, 48], [24, -10], [4, -10], [16, -48]]; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x * s, y * s) : ctx.moveTo(x * s, y * s)); ctx.closePath();
  ctx.fillStyle = TILE; ctx.fill(); ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.stroke();
}
function drop(ctx, s) {
  ctx.beginPath(); ctx.moveTo(0, -48 * s); ctx.bezierCurveTo(20 * s, -18 * s, 34 * s, 0, 34 * s, 16 * s); ctx.arc(0, 16 * s, 34 * s, 0, Math.PI); ctx.bezierCurveTo(-34 * s, 0, -20 * s, -18 * s, 0, -48 * s);
  ctx.fillStyle = TILE; ctx.fill(); ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.stroke();
}

// ── dot map of Indonesia (BlankMap-World CC0 grid, C 170 × R 88; cells [col, row]) ─────────────────────────────────
const isID = (c, r) => r >= 41 && r <= 49 && c >= 59 && c <= 84 && !(r <= 41 && c >= 67);
// pins = rough city cells on land (Medan … Merauke), no names on screen: the map only shows WHERE comments would land
const PINS = [[61, 42], [63, 43], [62, 44], [64, 45], [64, 46], [65, 47], [67, 48], [66, 43], [68, 45], [69, 44], [71, 46], [71, 44], [77, 45], [82, 46], [81, 48]];
const PORD = PINS.map((_, i) => i).sort((a, b) => rnd(a * 3.3 + 1) - rnd(b * 3.3 + 1));
const BATAM = [63.2, 40.7];

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {}; let GRID = null;

  async function load() {
    const vb = '../assets/shared/vid/';
    await Promise.all([
      ...['hp_scroll', 'lorong_jar'].map(async n => { V[n] = await loadVid(vb, n); }),
      (async () => { IM.dolar = await loadImg('../assets/shared/hook-intro/doc2.png', 1200); })(),
      (async () => { IM.pajak = await loadImg('../assets/shared/humanis/B2/B2_3_kalkulator-uang-struk.jpg', 1200); })(),
      (async () => { IM.pusat = await loadImg('../assets/shared/hook-intro/qr.png', 1200); })(),
      (async () => { GRID = await (await fetch('../assets/shared/cc/peta-dunia-grid.json')).json(); })(),
    ]);
  }

  // the map: cs = cell px, (ox, oy) = where cell (72, 44.5) sits; reveal k sweeps west → east
  const MX = (c, m) => (c - 72) * m.cs + m.ox, MY = (r, m) => (r - 44.5) * m.cs + m.oy;
  function dotMap(ctx, t, m, k = 1) {
    if (!GRID || k <= 0) return; const rd = m.cs * .3 * Math.pow(46 / m.cs, .6);
    const c0 = Math.max(0, Math.floor(72 + (-1000 - m.ox) / m.cs)), c1 = Math.min(GRID.C - 1, Math.ceil(72 + (1000 - m.ox) / m.cs));
    const r0 = Math.max(0, Math.floor(44.5 + (-580 - m.oy) / m.cs)), r1 = Math.min(GRID.R - 1, Math.ceil(44.5 + (580 - m.oy) / m.cs));
    for (const id of [false, true]) {
      ctx.beginPath();
      for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
        if (GRID.rows[r][c] !== '1' || isID(c, r) !== id) continue;
        if ((c - c0) / Math.max(1, c1 - c0) > k * 1.25 - rnd(c * 7 + r * 13) * .25) continue;
        const x = MX(c, m), y = MY(r, m); ctx.moveTo(x + rd, y); ctx.arc(x, y, rd, 0, 7);
      }
      ctx.fillStyle = id ? ivo(.5) : ivo(.13); ctx.fill();
    }
  }
  function mapPin(ctx, x, y, t, tl, sc = 1, q = true) {               // a docked comment: dot + ripple + small "?" bubble
    const s = t - tl; if (s <= 0) return; const k = Math.min(1.2, spring(s, .5, .3));
    if (s < 1.1) { const u = s / 1.1; ctx.strokeStyle = ivo(.6 * (1 - u)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, (12 + 70 * E.outCubic(u)) * sc, 0, 7); ctx.stroke(); }
    ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, y, 9 * k * sc, 0, 7); ctx.fill();
    ctx.strokeStyle = '#0B0C09'; ctx.lineWidth = 3; ctx.stroke();
    if (!q) return; const kb = kq(t, tl + .12, .35); if (kb <= 0) return;
    withA(ctx, kb, () => { const bx = x + 14 * sc, by = y - 52 * sc, bs = 36 * sc;
      ctx.fillStyle = TILE; ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; rr(ctx, bx, by, bs, bs, 8 * sc); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + 6 * sc, by + bs); ctx.lineTo(bx, by + bs + 10 * sc); ctx.lineTo(bx + 16 * sc, by + bs); ctx.fill();
      setFont(ctx, MN(22 * sc), 0); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('?', bx + bs / 2, by + bs * .72); ctx.textAlign = 'left'; });
  }
  function miniComment(ctx, x, y, s, rot, i) {                         // a comment card in flight: avatar + two grey lines (no words)
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10; ctx.fillStyle = TILE; rr(ctx, -95, -40, 190, 80, 14); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = ivo(.45); ctx.beginPath(); ctx.arc(-62, -6, 16, 0, 7); ctx.fill();
    ctx.fillStyle = ivo(.55); ctx.fillRect(-36, -16, 80 + 30 * rnd(i + 5), 9); ctx.fillStyle = ivo(.28); ctx.fillRect(-36, 4, 60 + 50 * rnd(i + 9), 9);
    ctx.restore();
  }

  // ── stations ────────────────────────────────────────────────────────────────────────────────────────────────
  const AR = [['MEMORI', -360], ['IHSG', -140], ['PUSAT DATA', 80], ['STARTUP', 300]], EY = -150, P0 = [-680, EY], P2 = [680, EY];
  const TAGS = [['TERSANGKA 1', 'DOLAR', 'dolar'], ['TERSANGKA 2', 'PAJAK', 'pajak'], ['TERSANGKA 3', 'PUSAT DATA AI', 'pusat']];
  const ST = [
    { at: 0, draw(ctx, t) {      // S0 · four routes, memory brightest
      txt(ctx, 'Kalau dirangkum dalam satu kalimat aja:', 0, -420, t, .05, SRF(54), { align: 'center' });
      const hot = E.outCubic(inv(A.ram - .05, A.ram + .35, t));
      for (const id of [false, true]) {
        const k0 = kq(t, .2, .5); if (k0 <= 0) break; ctx.globalAlpha = k0;
        ctx.fillStyle = id ? IVORY : '#0B0C09'; ctx.strokeStyle = IVORY; ctx.lineWidth = 3;
        if (id) for (const [x, lab, t0] of [[-680, 'NVIDIA', A.nvidia], [680, 'DOMPET KITA', A.dompet]]) {
          const pu = t > t0 ? 1 + .25 * Math.exp(-(t - t0) / .25) * Math.sin((t - t0) * 30) : 1;
          ctx.save(); ctx.translate(x, EY); ctx.scale(pu, pu); ctx.fillStyle = IVORY; ctx.fillRect(-15, -15, 30, 30); ctx.restore();
          setFont(ctx, MN(22), 5); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.8); ctx.fillText(lab, x, EY + 62); ctx.textAlign = 'left';
        }
        ctx.globalAlpha = 1;
      }
      AR.forEach(([lab, off], i) => {
        const t0 = A.satu - .1 + i * .14, u = E.inOutCubic(inv(t0, t0 + .7, t)); if (u <= 0) return;
        const C = [0, EY + off], mem = i === 0, al = mem ? lerp(.55, 1, hot) : lerp(.55, .14, hot) * (i === 1 ? 1 - .4 * inv(A.grafik, A.saham, t) : 1);
        ctx.strokeStyle = ivo(al); ctx.lineWidth = mem ? lerp(3, 7, hot) : 3; ctx.lineCap = 'round'; ctx.beginPath();
        for (let s = 0; s <= 48; s++) { const [x, y] = qp(P0, C, P2, Math.min(u, s / 48)); s ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        if (mem && hot > 0) for (let j = 0; j < 3; j++) {                                     // light running NVIDIA → DOMPET on the memory arc
          const ph = ((t - A.ram) * .45 + j / 3) % 1, [px, py] = qp(P0, C, P2, ph), g = ctx.createRadialGradient(px, py, 0, px, py, 44);
          g.addColorStop(0, ivo(.85 * hot)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(px - 44, py - 44, 88, 88); }
        if (u < 1) return; const [nx, ny] = qp(P0, C, P2, .5), kn = pop(t, t0 + .7);
        withA(ctx, mem ? 1 : lerp(1, .35, hot), () => {
          if (mem && hot > 0) { ctx.strokeStyle = `rgba(200,245,60,${.5 * hot})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(nx, ny, 30 + 9 * Math.sin(t * 6), 0, 7); ctx.stroke(); }
          ctx.fillStyle = mem && hot > .5 ? LIME : IVORY; ctx.beginPath(); ctx.arc(nx, ny, 18 * Math.min(1.15, kn) * (mem ? 1 + .2 * hot : 1), 0, 7); ctx.fill();
          setFont(ctx, MN(17), 0); ctx.textAlign = 'center'; ctx.fillStyle = mem && hot > .5 ? LIME_INK : INK; ctx.fillText(String(i + 1), nx, ny + 6);
          setFont(ctx, MN(mem ? 24 : 20), 4); ctx.textAlign = 'left'; ctx.fillStyle = ivo(mem ? .95 : .7); ctx.fillText(lab, nx + (mem ? 50 : 34), ny + 8);
        });
      });
      // the answer, two columns
      slab(ctx, 'NYATA', -760, 250, t, A.ram - .05, { lime: true, size: 26 });
      fall(ctx, 'HARGA RAM & HP', -766, 380, t, A.ram, DSP(100), {});
      slab(ctx, 'KAMBING HITAM', 60, 250, t, A.bukan - .05, { size: 26 });
      const tw = fall(ctx, '"IHSG JATUH KARENA AI"', 54, 380, t, A.grafik - .1, DSP(84), { col: ivo(.5) });
      const ks = E.outCubic(inv(A.nvidia, A.nvidia + .3, t)); if (ks > 0) { ctx.fillStyle = IVORY; ctx.fillRect(44, 348, (tw + 20) * ks, 6); }
    } },
    { at: A.jadi - .12, via: 'whip', draw(ctx, t) {                    // S1 · the HP price tag swings in and ticks up
      plate(ctx, V.hp_scroll, t, 400, -10, 980, 720, kq(t, A.jadi - .2, .6), { t0: A.jadi, dim: .35 });
      const t0 = A.jadi - .05, k = sp(t, t0, .55, .45); if (k > 0) {
        const s = t - t0, sw = (14 * Math.exp(-s / .9) * Math.sin(s * 4.2) + 1.6 * Math.sin(t * 1.4)) * D2R, HX = -420, HY = -470;
        ctx.strokeStyle = ivo(.7); ctx.lineWidth = 2.5; ctx.save(); ctx.translate(HX, HY); ctx.rotate(sw);
        const dy = (1 - Math.min(k, 1.15)) * -260; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120 + dy); ctx.stroke();
        ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 7, 0, 7); ctx.fill();
        ctx.translate(0, 110 + dy); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 24;
        ctx.beginPath(); ctx.moveTo(-110, 0); ctx.lineTo(110, 0); ctx.lineTo(230, 110); ctx.lineTo(230, 600); ctx.lineTo(-230, 600); ctx.lineTo(-230, 110); ctx.closePath();
        ctx.fillStyle = IVORY; ctx.fill(); ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#0B0C09'; ctx.beginPath(); ctx.arc(0, 55, 20, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(29,30,24,.35)'; ctx.lineWidth = 3; ctx.stroke();
        setFont(ctx, MN(24), 8); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(29,30,24,.6)'; ctx.fillText('LABEL HARGA', 0, 160);
        setFont(ctx, DSP(190), 2); ctx.fillStyle = INK; ctx.fillText('HP', 0, 345);
        ctx.fillStyle = 'rgba(29,30,24,.25)'; ctx.fillRect(-180, 385, 360, 3);
        setFont(ctx, DSP(78), 0); ctx.textAlign = 'left'; ctx.fillStyle = INK; ctx.fillText('Rp', -186, 515);
        const up = E.outCubic(inv(A.naik - .05, A.naik + .5, t));                            // digits roll (blurred, no real price), upward at "naik"
        ctx.save(); ctx.beginPath(); ctx.rect(-90, 430, 290, 105); ctx.clip(); ctx.filter = 'blur(9px)';
        const roll = (t * (3 + 9 * up)) % 1; setFont(ctx, DSP(78), 4); ctx.fillStyle = INK;
        for (let j = -1; j <= 1; j++) { const f = Math.floor(t * (3 + 9 * up)) + j, str = Array.from({ length: 6 }, (_, q) => Math.floor(rnd(f * 11 + q) * 10)).join('');
          ctx.fillText(str.replace(/(\d{3})(\d{3})/, '$1.$2'), -84, 515 + (roll - j) * 92); }
        ctx.restore(); ctx.filter = 'none';
        const ka = pop(t, A.naik - .03); if (ka > 0) {                                        // lime up-arrow badge
          ctx.save(); ctx.translate(200, 130); ctx.scale(Math.min(ka, 1.15), Math.min(ka, 1.15)); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 58, 0, 7); ctx.fill();
          ctx.strokeStyle = LIME_INK; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(0, -28); ctx.moveTo(-22, -6); ctx.lineTo(0, -28); ctx.lineTo(22, -6); ctx.stroke(); ctx.restore(); }
        ctx.textAlign = 'left'; ctx.restore();
      }
      txt(ctx, 'Jadi, lain kali kamu liat…', 400, -400, t, A.jadi, SRF(50), { align: 'center' });
      fall(ctx, 'HARGA HP NAIK LAGI', 400, 420, t, A.harga2 - .05, DSP(104), { align: 'center' });
      typeOn(ctx, '— DI TOKO', 400, 470, t, A.toko - .05, MN(24), { ls: 6, cps: 30, align: 'center', col: ivo(.7) });
    } },
    { at: A.inget - .12, via: 'push', draw(ctx, t) {                   // S2 · the three suspects return, card 3 = TERBUKTI
      const kz = E.inOutCubic(inv(A.tapi - .05, A.tapi + .8, t)), ims = [IM.dolar, IM.pajak, IM.pusat];
      withA(ctx, gone(t, A.bukan2 - .2), () => txt(ctx, 'Inget lagi tersangka ketiga tadi.', 0, -410, t, A.inget - .05, SRF(54), { align: 'center' }));
      txt(ctx, 'Bukan cuma gara-gara dolar atau pajak…', 0, -410, t, A.bukan2 - .05, SRF(54), { align: 'center' });
      TAGS.forEach(([tag, name, key], i) => {
        const t0 = A.inget + i * .1, k = sp(t, t0, .6, .42); if (k <= 0) return; const im = ims[i]; if (!im) return;
        const lift = i === 2 ? E.outCubic(inv(A.ketiga - .05, A.ketiga + .3, t)) : 0, hi = i < 2 ? kq(t, A[key] - .05, .25) * (1 - kq(t, A[key] + .55, .4)) : 0;
        let x = (i - 1) * 580, y = 10 + (1 - Math.min(k, 1.1)) * 300 - 26 * lift - 18 * hi, s = (.82 + .18 * Math.min(k, 1.06)) * (1 + .05 * hi), rot = (i - 1) * 2.5 * D2R * (1 - k);
        let al = 1; if (i < 2) { x -= 150 * kz; y += 30 * kz; s *= lerp(1, .8, kz); al = lerp(1, .3, kz); } else { x = lerp(x, 300, kz); s *= lerp(1, 1.34, kz); }
        withA(ctx, al * clamp(k * 3), () => {
          const w = 500, h = 340; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
          ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = '#0B0C09'; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); ctx.shadowColor = 'transparent';
          cover(ctx, im, -w / 2, -h / 2, w, h); grainRect(ctx, -w / 2, -h / 2, w, h, t, .18);
          ctx.strokeStyle = ivo(i === 2 ? .35 + .5 * lift : .3); ctx.lineWidth = 3; ctx.strokeRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12);
          setFont(ctx, MN(20), 5); ctx.fillStyle = ivo(.7); ctx.fillText(tag, -w / 2, -h / 2 - 26);
          setFont(ctx, DSP(i === 2 ? 70 : 64), 2); ctx.fillStyle = IVORY; ctx.fillText(name, -w / 2, h / 2 + 76);
          ctx.restore();
        });
      });
      typeOn(ctx, 'REBUTAN CHIP RAM', 300, 420, t, A.rebutan - .05, MN(34), { ls: 8, cps: 28, align: 'center' });
      stamp(ctx, 'TERBUKTI', 560, -190, t, A.data, { size: 104, rot: -6 });
    } },
    { at: A.sekarang - .12, via: 'whip', draw(ctx, t) {                // S3 · the comment field: template only, the lime caret visits each blank
      fall(ctx, 'GILIRAN KAMU.', 0, -300, t, A.sekarang - .05, DSP(150), { align: 'center' });
      txt(ctx, 'Tulis di kolom komentar:', 0, -200, t, A.tulis - .05, SRF(50), { align: 'center' });
      const kb = kq(t, A.tulis - .1, .5); if (kb <= 0) return;
      withA(ctx, kb, () => {
        const X0 = -560, Y0 = -130 + (1 - kb) * 60, BW = 1120, BH = 520; ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = TILE; rr(ctx, X0, Y0, BW, BH, 22); ctx.fill(); ctx.shadowColor = 'transparent';
        ctx.strokeStyle = ivo(.18); ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ivo(.4); ctx.beginPath(); ctx.arc(X0 + 70, Y0 + 70, 28, 0, 7); ctx.fill();
        setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.55); ctx.fillText('KOMENTAR KAMU', X0 + 120, Y0 + 78);
        ctx.fillStyle = ivo(.12); ctx.fillRect(X0 + 40, Y0 + 130, BW - 80, 2);
        const rows = [['HP / RAM', '', A.harga3], ['NAIK JADI', 'Rp', A.naiknya], ['KOTA', '', A.kota]];
        let cx = null, cy = 0;
        rows.forEach(([lab, pre, ta], j) => {
          const y = Y0 + 220 + j * 112; txt(ctx, lab + ':', X0 + 70, y, t, A.tulis + .15 + j * .1, MN(36), { ls: 3, col: ivo(.9), rise: 16 });
          const bx = X0 + 470; if (pre) txt(ctx, pre, bx, y, t, A.tulis + .2 + j * .1, MN(36), { col: ivo(.9), rise: 16 });
          const lx = bx + (pre ? 80 : 0), lw = BW - 540 - (pre ? 80 : 0), on = t > ta - .05;
          withA(ctx, clamp((t - A.tulis - .25 - j * .1) / .3), () => { ctx.fillStyle = on ? ivo(.85) : ivo(.3); ctx.fillRect(lx, y + 12, lw * (on ? 1 : .9), on ? 4 : 3); });
          if (on) { const n = Math.max(0, Math.min(9, Math.floor((t - ta) * 14))); setFont(ctx, MN(36), 6); ctx.fillStyle = ivo(.55); ctx.fillText('·'.repeat(n), lx + 10, y); cx = lx + 18 + n * 27.7; cy = y; }
        });
        if (cx !== null && Math.floor(t * 2.4) % 2 === 0 || (cx !== null && t - A.harga3 < .3)) { ctx.fillStyle = LIME; ctx.fillRect(cx, cy - 36, 6, 46); }
        ctx.restore();
      });
    } },
    { at: A.nanti - .12, via: 'push', draw(ctx, t) {                   // S4 · KOMENTAR JADI PETA: comments fly in and dock as pins
      const m = { cs: 46, ox: 40, oy: 40 }; dotMap(ctx, t, m, E.outCubic(inv(A.nanti - .1, A.nanti + .9, t)));
      PINS.forEach(([c, r], i) => {
        const o = PORD.indexOf(i), tl = A.kumpulin + .2 + o * .085, tf = tl - .55, x = MX(c, m), y = MY(r, m);
        const u = inv(tf, tl, t); if (u > 0 && u < 1) {
          const S = [760 + 160 * rnd(i + 3), 560], Cc = [lerp(S[0], x, .5) + 120, Math.min(S[1], y) - 380 - 120 * rnd(i + 7)], e = E.inOutCubic(u), [px, py] = qp(S, Cc, [x, y], e);
          withA(ctx, clamp(u * 5) * (1 - inv(.85, 1, u)), () => miniComment(ctx, px, py, lerp(1, .25, e), lerp(-.25, 0, e) + .1 * Math.sin(u * 6), i));
        }
        mapPin(ctx, x, y, t, tl);
      });
      fall(ctx, 'PETA HARGA', -880, -330, t, A.peta - .1, DSP(124), {});
      slab(ctx, 'DARI PENONTON', -874, -255, t, A.penonton - .05, { lime: true, size: 26 });
      slab(ctx, 'ILUSTRASI', 880, -420, t, A.nanti + .2, { size: 18, align: 'right' });
      srcTag(ctx, 'Peta: BlankMap-World, Wikimedia Commons (CC0)', -840, 445, t, A.nanti + .4);
    } },
    { at: A.terus - .12, via: 'push', draw(ctx, t) {                   // S5 · dive to Batam: listrik? air?
      const z = E.outCubic(inv(A.terus - .2, A.terus + 1.4, t)), cs = lerp(110, 150, z), BXp = -300, BYp = -40;
      const m = { cs, ox: BXp - (BATAM[0] - 72) * cs, oy: BYp - (BATAM[1] - 44.5) * cs }; dotMap(ctx, t, m, 1);
      PINS.forEach(([c, r]) => mapPin(ctx, MX(c, m), MY(r, m), t, -10, 1.2, false));
      txt(ctx, 'Apa yang sebenarnya dibangun di Batam?', 400, -420, t, A.penasaran - .1, SRF(48), { align: 'center' });
      const kb = pop(t, A.batam - .05); if (kb > 0) {                                        // the Batam pin, lime
        const s = t - A.batam; ctx.strokeStyle = `rgba(200,245,60,${.5 * clamp(s / .3)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(BXp, BYp, 34 + 10 * Math.sin(t * 6), 0, 7); ctx.stroke();
        ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(BXp, BYp, 18 * Math.min(kb, 1.2), 0, 7); ctx.fill(); }
      slab(ctx, 'BATAM', BXp - 40, BYp - 76, t, A.batam + .05, { size: 30, align: 'right' });
      [[bolt, 'LISTRIKNYA', 330, A.listriknya], [drop, 'AIRNYA', 680, A.airnya]].forEach(([ic, lab, x, t0]) => {
        const k = pop(t, t0 - .05); if (k <= 0) return; const y = -250;
        const kl = E.outCubic(inv(t0 - .05, t0 + .35, t)); ctx.setLineDash([8, 10]); ctx.strokeStyle = ivo(.45); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(BXp + 24, BYp - 12);
        ctx.lineTo(lerp(BXp + 24, x - 70, kl), lerp(BYp - 12, y + 10, kl)); ctx.stroke(); ctx.setLineDash([]);
        ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(k, 1.15), Math.min(k, 1.15)); ctx.fillStyle = '#0B0C09'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, 7); ctx.fill();
        ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.stroke(); ic(ctx, .95); ctx.restore();
        txt(ctx, lab, x, y + 118, t, t0 + .05, MN(24), { ls: 5, align: 'center', col: ivo(.85) });
        txt(ctx, 'dari mana?', x, y + 172, t, A.mana2 - .1, SRF(44), { align: 'center' });
      });
      const kc = kq(t, A.tulis2 - .1, .45); if (kc > 0) withA(ctx, kc, () => {                  // comment field types "Batam"
        const X0 = 130, Y0 = 360 + (1 - kc) * 40, BW = 730, BH = 84; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16;
        ctx.fillStyle = TILE; rr(ctx, X0, Y0, BW, BH, 42); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ivo(.4); ctx.beginPath(); ctx.arc(X0 + 44, Y0 + BH / 2, 22, 0, 7); ctx.fill();
        const n = t > A.batam2 - .05 ? Math.min(5, Math.ceil((t - A.batam2 + .05) * 10)) : 0; setFont(ctx, MN(34), 1);
        if (n) { ctx.fillStyle = IVORY; ctx.fillText('Batam'.slice(0, n), X0 + 92, Y0 + 55); } else { ctx.fillStyle = ivo(.35); ctx.fillText('Tulis komentar…', X0 + 92, Y0 + 55); }
        if (Math.floor(t * 2.4) % 2 === 0 || n && n < 5) { const cw = n ? ctx.measureText('Batam'.slice(0, n)).width : 0; ctx.fillStyle = IVORY; ctx.fillRect(X0 + 96 + cw, Y0 + 22, 4, 42); }
        ctx.strokeStyle = n >= 5 ? IVORY : ivo(.35); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const ax = X0 + BW - 50, ay = Y0 + BH / 2;
        ctx.beginPath(); ctx.moveTo(ax - 16, ay); ctx.lineTo(ax + 16, ay); ctx.moveTo(ax + 3, ay - 13); ctx.lineTo(ax + 16, ay); ctx.lineTo(ax + 3, ay + 13); ctx.stroke();
      });
    } },
    { at: A.sambil - .12, via: 'push', draw(ctx, t) {                  // S6 · calm plate under the end screen
      plate(ctx, V.lorong_jar, t, 0, 0, 1840, 1000, kq(t, A.sambil - .3, .6), { t0: A.sambil, dim: .6, marks: false });
      withA(ctx, gone(t, A.video + .1, .4), () => txt(ctx, 'Sambil nunggu…', 0, 20, t, A.sambil - .05, SRF(64), { align: 'center' }));
    } },
  ];
  for (const s of ST) if (!Number.isFinite(s.at)) throw new Error('station key missing: ' + s.draw);

  // ── end screen (screen space): left = title + subscribe, right = two calm video slots ─────────────────────────
  function subscribe(o, t) {
    const m = A.layar, c1 = m + 1.86, c2 = m + 2.91, BX = 146, BY = 730, BW = 430, BH = 108;
    const kb = E.outQuint(inv(m + .4, m + 1.0, t)); if (kb <= 0) return;
    const on = t > c1 + .06, press = 1 - .06 * Math.sin(Math.PI * clamp((t - c1 + .04) / .16)), hov = .025 * clamp((t - m - 1.55) / .2) * (on ? 0 : 1);
    o.save(); o.globalAlpha = kb; o.translate(BX + BW / 2, BY + BH / 2); const s = lerp(.82, 1, kb) * (press + hov); o.scale(s, s);
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 40; o.shadowOffsetY = 16; o.fillStyle = on ? LIME : IVORY; rr(o, -BW / 2, -BH / 2, BW, BH, BH / 2); o.fill();
    o.shadowColor = 'transparent'; o.fillStyle = on ? LIME_INK : '#11120E'; o.beginPath(); o.arc(-BW / 2 + 56, 0, 30, 0, 7); o.fill();
    setFont(o, DSP(40), 0); o.fillStyle = on ? LIME : IVORY; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('R', -BW / 2 + 56, 2);
    setFont(o, DSP(62), 3); o.fillStyle = on ? LIME_INK : '#11120E'; o.textAlign = 'left'; o.fillText(on ? 'SUBSCRIBED' : 'SUBSCRIBE', -BW / 2 + 106, 4);
    if (on) { const kc = E.outCubic(inv(c1 + .06, c1 + .3, t)); o.strokeStyle = LIME_INK; o.lineWidth = 7; o.lineCap = 'round'; o.beginPath();
      o.moveTo(BW / 2 - 64, 0); o.lineTo(BW / 2 - 64 + 12 * kc, 13 * kc); if (kc > .5) o.lineTo(BW / 2 - 52 + 22 * (kc - .5) * 2, 13 - 30 * (kc - .5) * 2); o.stroke(); }
    o.textBaseline = 'alphabetic'; o.restore();
    const kr = inv(c1, c1 + .55, t); if (kr > 0 && kr < 1) { o.save(); o.globalAlpha = (1 - kr) * .8; o.strokeStyle = LIME; o.lineWidth = 4;
      rr(o, BX - 30 * E.outCubic(kr), BY - 30 * E.outCubic(kr), BW + 60 * E.outCubic(kr), BH + 60 * E.outCubic(kr), BH / 2 + 30 * kr); o.stroke(); o.restore(); }
    const BLX = BX + BW + 84, kl = E.outQuint(inv(c1 + .25, c1 + .7, t));             // bell (swings silently)
    if (kl > 0) { const on2 = t > c2 + .05, sw = t > c2 ? Math.sin((t - c2) * 26) * Math.exp(-(t - c2) * 3.2) * 20 * D2R : 0;
      o.save(); o.globalAlpha = kl; o.translate(BLX, BY + BH / 2); const p2 = 1 - .07 * Math.sin(Math.PI * clamp((t - c2 + .04) / .16)); o.scale(lerp(.6, 1, kl) * p2, lerp(.6, 1, kl) * p2);
      o.fillStyle = on2 ? IVORY : 'rgba(11,12,9,.6)'; o.strokeStyle = ivo(.7); o.lineWidth = 3; o.beginPath(); o.arc(0, 0, 54, 0, 7); o.fill(); o.stroke();
      o.rotate(sw); o.translate(0, -2); o.fillStyle = on2 ? '#11120E' : IVORY; o.beginPath(); o.moveTo(-22, 14); o.lineTo(-16, 7); o.lineTo(-16, -5);
      o.bezierCurveTo(-16, -25, 16, -25, 16, -5); o.lineTo(16, 7); o.lineTo(22, 14); o.closePath(); o.fill(); o.beginPath(); o.arc(0, 19, 5, 0, 7); o.fill(); o.fillRect(-2.5, -27, 5, 6);
      o.restore(); }
    const kp = E.inOutCubic(inv(m + .9, m + 1.6, t)), kq2 = E.inOutCubic(inv(c1 + .45, c1 + .95, t)), kx = E.inOutCubic(inv(c2 + .5, c2 + 1.2, t));   // cursor
    if (kp > 0) { let x = lerp(980, BX + BW * .62, kp), y = lerp(1030, BY + BH * .62, kp);
      x = lerp(x, BLX + 10, kq2); y = lerp(y, BY + BH / 2 + 14, kq2); x += 60 * kx; y += 40 * kx;
      const cs = 1.5 * (1 - .12 * Math.sin(Math.PI * clamp((t - c1 + .04) / .16)) - .12 * Math.sin(Math.PI * clamp((t - c2 + .04) / .16)));
      o.save(); o.globalAlpha = clamp(kp * 3) * (1 - kx); o.translate(x, y); o.scale(cs, cs); o.shadowColor = 'rgba(0,0,0,.5)'; o.shadowBlur = 12; o.shadowOffsetY = 5;
      o.beginPath(); o.moveTo(0, 0); o.lineTo(0, 34); o.lineTo(8, 26); o.lineTo(14, 39); o.lineTo(20, 36); o.lineTo(14, 23); o.lineTo(25, 23); o.closePath();
      o.fillStyle = '#fff'; o.fill(); o.shadowColor = 'transparent'; o.strokeStyle = '#11120E'; o.lineWidth = 2; o.lineJoin = 'round'; o.stroke(); o.restore(); }
  }
  function endScreen(o, t) {
    const k = E.outCubic(inv(A.video + .3, A.video + 1.4, t)); if (k <= 0) return;
    o.setTransform(1, 0, 0, 1, 0, 0); o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    const g = o.createLinearGradient(0, 0, 1050, 0); g.addColorStop(0, 'rgba(11,12,9,.78)'); g.addColorStop(1, 'rgba(11,12,9,0)'); o.globalAlpha = k; o.fillStyle = g; o.fillRect(0, 0, 1050, H);
    for (const [y, t0] of [[150, A.layar], [570, A.layar + .3]]) { const q = E.outQuint(inv(t0, t0 + .8, t)); if (q <= 0) continue;
      o.save(); o.globalAlpha = q; o.translate(1120 + 320, y + 180); const s = lerp(.94, 1, q); o.scale(s, s);
      o.fillStyle = 'rgba(11,12,9,.55)'; rr(o, -320, -180, 640, 360, 18); o.fill(); o.setLineDash([14, 10]); o.lineDashOffset = -t * 10; o.strokeStyle = ivo(.34); o.lineWidth = 2; o.stroke(); o.setLineDash([]); o.restore(); }
    subscribe(o, t);
    o.globalAlpha = 1; const kb = kq(t, A.video + .2, .6); o.fillStyle = LIME; o.fillRect(146, 350, 120 * kb, 6);
    fall(o, 'VIDEO BERIKUTNYA', 140, 470, t, A.video - .2, DSP(116), { ls: 3, stag: .03 });
    txt(o, 'tonton di layar ini, ya.', 146, 545, t, A.layar, SRF(50), { col: ivo(.9) });
  }
  const over = (o, t) => { if (t > A.video) { o.save(); endScreen(o, t); o.restore(); } };

  return makeChapter({ B, ST, load, label: 'PENUTUP · GELEMBUNG ATAU NYATA?', over, full: () => [] });
}
