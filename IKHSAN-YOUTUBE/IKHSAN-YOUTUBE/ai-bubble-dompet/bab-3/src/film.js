// Bab 3 · Retak pertama, 5 November 2026 (VO abd_vo_ahmad_06, 98.6 s). One depth row of 14 stations.
// New technique — GARIS RETAK: every price line is drawn as a glass crack (jagged polyline revealed by length, dark body +
// lit ivory edge + frost halo, branch sprigs, a spider-web star and falling shards where it breaks).
// S0 date stamp, a crack runs through it · S1 Nasdaq −5,5 % (Open Magazine full) · S2 S&P 500 −4,4 % (Fox full) · S3 Nvidia / AMD +
// Ahri's chart · S4 three triggers (Le Monde full) · S5 the lineup, spotlight on AI · S6 Nasdaq tower + a bubble that holds ·
// S7 jatuh sehari ≠ ambruk · S8 dot-com: 31 months vs one day at true scale (Fool full) · S9 the balance 2000 vs 2026 (analisis
// redaksi) · S10 cicilan due before income arrives · S11 two guesses (Krugman full) · S12 cek jalurnya · S13 dot map → Indonesia.
// Numbers only from Ahri's sourced fact list; derived/illustrative visuals are labelled.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DISP, SER, MONO, rnd, D2R, timing, makeChapter,
  loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, fmt, gone, mk } from './kit.js';
import { kq, pop, popAt, doc, stamp, stack, slot, chip } from './draw.js';
import { bubble, pumped, wobble } from './gelembung.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const INK = '#1D1E18';
const still = im => ({ n: 2, fps: 1, img: [im, im] });

// ── Garis Retak ───────────────────────────────────────────────────────────────────────────────────────────────
const part = (ctx, pts, vis, dx = 0, dy = 0) => { ctx.moveTo(pts[0][0] + dx, pts[0][1] + dy); for (let i = 1; i < pts.length; i++) { const p = pts[i], q = pts[i - 1];
  if (p[2] <= vis) { ctx.lineTo(p[0] + dx, p[1] + dy); continue; } const u = (vis - q[2]) / (p[2] - q[2]); ctx.lineTo(lerp(q[0], p[0], u) + dx, lerp(q[1], p[1], u) + dy); break; } };
const ptAt = (pts, vis) => { for (let i = 1; i < pts.length; i++) if (pts[i][2] >= vis) { const p = pts[i], q = pts[i - 1], u = (vis - q[2]) / ((p[2] - q[2]) || 1); return [lerp(q[0], p[0], u), lerp(q[1], p[1], u)]; }
  const l = pts[pts.length - 1]; return [l[0], l[1]]; };
// a crack through the given vertices: jagged in between (never at the vertices), cumulative length per point, sprigs at vertex indices o.br
function crackLine(v, seed, o = {}) {
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
function drawCrack(ctx, C, vis, o = {}) {
  if (vis <= 0) return; const w = o.w ?? 1; ctx.lineJoin = 'miter'; ctx.lineCap = 'round';
  const path = (dx, dy) => { ctx.beginPath(); part(ctx, C.P, Math.min(vis, C.L), dx, dy); for (const b of C.br) if (vis > b.at) part(ctx, b.P, (vis - b.at) * 2.2, dx, dy); };
  path(0, 0); ctx.strokeStyle = `rgba(241,239,230,${.07 * (o.glow ?? 1)})`; ctx.lineWidth = 16 * w; ctx.stroke();   // frost halo
  path(1.6 * w, 2.2 * w); ctx.strokeStyle = 'rgba(0,0,0,.62)'; ctx.lineWidth = 5.5 * w; ctx.stroke();            // the dark body of the crack
  path(0, 0); ctx.strokeStyle = 'rgba(241,239,230,.93)'; ctx.lineWidth = 2.3 * w; ctx.stroke();                 // the lit glass edge
  if (o.head && vis < C.L) { const [hx, hy] = ptAt(C.P, vis), g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 34 * w);
    g.addColorStop(0, 'rgba(255,255,255,.85)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(hx - 34 * w, hy - 34 * w, 68 * w, 68 * w); }
}
// spider-web star where the line breaks: short rays snapping out, plus two rings
const STARS = {};
function star(ctx, x, y, t, t0, seed, R = 120) {
  const s = t - t0; if (s <= 0) return; const key = `${x},${y},${seed}`;
  const G = STARS[key] ??= Array.from({ length: 9 }, (_, i) => { const a = i / 9 * 2 * Math.PI + (rnd(seed + i) - .5) * .5, L = R * (.45 + rnd(seed + i + 20) * .6);
    return crackLine([[x, y], [x + Math.cos(a) * L, y + Math.sin(a) * L]], seed + i * 11, { jag: 5, step: 14 }); });
  const k = E.outExpo(clamp(s / .18)); for (const c of G) drawCrack(ctx, c, c.L * k, { w: .55, glow: .6 });
}
function shards(ctx, x, y, t, t0, n = 14, seed = 1, o = {}) {
  const s = t - t0; if (s <= 0 || s > 1.6) return; const a0 = ctx.globalAlpha;
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (rnd(seed * 50 + i) - .5) * (o.spread ?? 2.6), v = 180 + rnd(seed * 50 + i + 9) * 420, z = 5 + rnd(seed * 50 + i + 17) * 12;
    const px = x + Math.cos(a) * v * s, py = y + Math.sin(a) * v * s + 1100 * s * s;
    ctx.save(); ctx.globalAlpha = a0 * clamp((1.6 - s) / .5); ctx.translate(px, py); ctx.rotate(s * (6 + i % 5) + i);
    ctx.fillStyle = i % 3 ? 'rgba(241,239,230,.88)' : 'rgba(241,239,230,.42)'; ctx.beginPath(); ctx.moveTo(-z, -z * .35); ctx.lineTo(z, -z * .8); ctx.lineTo(z * .25, z); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.globalAlpha = a0;
}
const shake = (p, t, t0, amp = 16) => { const s = t - t0; if (s > 0 && s < .6) p.ty += amp * Math.exp(-s / .12) * Math.sin(s * 80); };

// geometry (pure, built once)
const C0 = crackLine([[-940, -20], [-520, 14], [-200, -34], [120, 44], [470, 2], [940, 34]], 11, { jag: 16, br: [2, 3, 4] });
const C1 = crackLine([[-900, 60], [-720, 20], [-560, 50], [-380, -30], [-200, 0], [0, -60], [160, -20], [300, -50]], 21, { jag: 8, step: 26, br: [3, 5] });
const C1b = crackLine([[300, -50], [380, 250], [520, 200], [860, 330]], 22, { jag: 14, step: 22, br: [1, 2], sprig: 150 });
const C2 = crackLine([[60, -200], [220, -170], [380, -215], [520, -180], [600, -200], [660, 160], [880, 200]], 31, { jag: 8, br: [4, 5] });
const DOT = [100, 78, 90, 70, 62, 72, 55, 60, 48, 52, 40, 45, 38, 42, 33, 36, 30, 34, 28, 31, 26, 29, 25, 27, 24, 26, 23, 25, 23, 22, 24, 22];
const DX = m => -860 + m * 44.5, DY = v => -300 + (100 - v) / 80 * 600;
const C8 = crackLine(DOT.map((v, i) => [DX(i), DY(v)]), 81, { jag: 4, step: 18, br: [1, 3, 6, 10] });
const C8d = crackLine([[600, -200], [720, -200], [726, -159], [820, -162]], 82, { jag: 2, step: 10 });   // one day, −5,5 % at the same scale
const C10 = crackLine([[-330, -128], [-60, -142], [120, -134], [210, -100], [330, -88]], 101, { jag: 6, br: [2] });

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {}; let GRID = null;

  async function load() {
    const kb = '../assets/shared/kutipan/';
    V.brk = await loadVid('../assets/shared/vid/', 'broker');
    IM.open = await loadImg(kb + 'openthemagazine-quick-take-why-did-the-nasdaq-fall-5-5.png', 1800);
    IM.fox = await loadImg(kb + 'foxcarolina-a-brutal-sell-off-for-ai-stocks-sends.png', 1800);
    IM.lemonde = await loadImg(kb + 'lemonde-the-ai-bubble-faces-reality.png', 1800);
    IM.fool = await loadImg(kb + 'fool-if-an-ai-bubble-triggers-a-bear-market.png', 1800);
    IM.krugman = await loadImg(kb + 'paulkrugman-paul-krugman.png', 1800);
    IM.jatuh = await loadImg('../assets/shared/grafik/jatuh-5-nov-2026.png', 1400);
    IM.tower = await loadImg('../assets/shared/cc/commons-nasdaq-tower-may-2026.jpg', 1200);
    GRID = await (await fetch('../assets/shared/cc/peta-dunia-grid.json')).json();
  }

  // ── props ─────────────────────────────────────────────────────────────────────────────────────────────────
  function suspect(ctx, x, yb, t, t0, lab, o = {}) {           // lineup silhouette holding a black placard; o.chip = chip head
    popAt(ctx, x, yb, t, t0, () => {
      const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * (o.a ?? 1);
      const g = ctx.createLinearGradient(-110, 0, 110, 0); g.addColorStop(0, '#CFCCBE'); g.addColorStop(.5, IVORY); g.addColorStop(1, '#B4B1A3');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-105, 0); ctx.lineTo(-105, -380); ctx.quadraticCurveTo(-105, -440, -40, -450); ctx.lineTo(40, -450);
      ctx.quadraticCurveTo(105, -440, 105, -380); ctx.lineTo(105, 0); ctx.closePath(); ctx.fill();
      if (o.chip) { ctx.save(); ctx.translate(0, -540); chip(ctx, 84); ctx.restore(); } else { ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -528, 62, 0, 7); ctx.fill(); }
      ctx.fillStyle = INK; ctx.fillRect(-128, -300, 256, 92); ctx.strokeStyle = ivo(.8); ctx.lineWidth = 2; ctx.strokeRect(-128, -300, 256, 92);
      setFont(ctx, MN(lab.length > 9 ? 19 : 26), 3); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(lab, 0, -246); ctx.textAlign = 'left';
      ctx.globalAlpha = a0;
    }, { rise: 60, from: .85 });
  }
  function certi(ctx, x, y, w, h, word, size) {               // an ivory certificate / contract sheet with a title and ruled lines
    doc(ctx, x, y, w, h, { blur: 30, sy: 12 }); ctx.strokeStyle = 'rgba(29,30,24,.35)'; ctx.lineWidth = 2; ctx.strokeRect(x - w / 2 + 10, y - h / 2 + 10, w - 20, h - 20);
    setFont(ctx, DSP(size), 3); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText(word, x, y + size * .3); ctx.textAlign = 'left';
  }

  const ST = [
    { at: 0, mod(p, t) { shake(p, t, A.th2026, 10); }, draw(ctx, t) {          // S0 · Jawabannya: 5 November 2026 — and a crack runs through the date
      txt(ctx, 'Jawabannya:', 0, -230, t, A.jawabannya - .1, SRF(64), { align: 'center' });
      stamp(ctx, '5 NOV 2026', 0, 20, t, A.n5 - .05, { size: 170, rot: -3 });
      txt(ctx, 'KAMIS · BURSA AMERIKA', 0, 200, t, A.th2026, MN(26), { ls: 6, align: 'center', col: ivo(.75) });
      drawCrack(ctx, C0, C0.L * E.inOutCubic(inv(A.tanggal, A.th2026 + .1, t)), { head: true, w: 1.1 });
      star(ctx, 120, 44, t, A.th2026, 40, 110); shards(ctx, 120, 44, t, A.th2026, 14, 4);
    } },
    { at: A.hari - .12, via: 'whip', mod(p, t) { shake(p, t, A.anjlok, 18); }, draw(ctx, t) {  // S1 · Nasdaq: the price line is a crack, and it breaks
      plate(ctx, V.brk, t, 440, -230, 800, 420, kq(t, A.hari + .05, .6), { t0: A.hari, dim: .25 });
      typeOn(ctx, 'NASDAQ COMPOSITE', -860, -420, t, A.nasdaq, MN(26), { ls: 6, cps: 30 });
      txt(ctx, 'papan skor gabungan', -860, -340, t, A.papan - .1, SRF(54));
      txt(ctx, 'saham-saham teknologi Amerika', -860, -275, t, A.teknologi - .4, SRF(54));
      ctx.strokeStyle = ivo(.08); ctx.lineWidth = 2; ctx.beginPath(); for (const y of [-140, -40, 60, 160]) { ctx.moveTo(-900, y); ctx.lineTo(880, y); } ctx.stroke();
      drawCrack(ctx, C1, C1.L * E.inOutSine(inv(A.hari + .2, A.anjlok - .05, t)), { head: true });
      drawCrack(ctx, C1b, C1b.L * E.outExpo(inv(A.anjlok, A.anjlok + .45, t)), { w: 1.3 });
      star(ctx, 300, -50, t, A.anjlok, 60, 130); shards(ctx, 300, -50, t, A.anjlok, 18, 6);
      fall(ctx, '−5,5%', -860, 330, t, A.n55 - .05, DSP(240));
      slab(ctx, 'ANJLOK DALAM SEHARI', -200, 300, t, A.n55 + .15, { size: 26, lime: true });
      srcTag(ctx, 'AP via Fox Carolina, 5 Nov 2026', -860, 470, t, A.n55 + .2);
    } },
    { at: A.indeks - .12, via: 'truck', mod(p, t) { shake(p, t, A.n44, 10); }, draw(ctx, t) {   // S2 · S&P 500 −4,4 % (Open full rides over the start)
      typeOn(ctx, 'INDEKS', -860, -270, t, A.indeks, MN(24), { ls: 6, cps: 30, col: ivo(.7) });
      fall(ctx, 'S&P 500', -860, -120, t, A.sp - .05, DSP(150));
      const v4 = C2.VL[4], vis = v4 * E.inOutSine(inv(A.sp, A.turun + .2, t)) + (C2.L - v4) * E.outExpo(inv(A.n44 - .1, A.n44 + .3, t));
      drawCrack(ctx, C2, vis, { head: true });
      star(ctx, 600, -200, t, A.n44 - .1, 70, 100); shards(ctx, 600, -200, t, A.n44 - .1, 12, 8);
      fall(ctx, '−4,4%', -860, 200, t, A.n44 - .05, DSP(300));
      txt(ctx, 'hari terburuknya sejak April 2025', -860, 300, t, A.terburuknya - .3, SRF(48), { col: ivo(.85) });
      srcTag(ctx, 'AP via Fox Carolina, 5 Nov 2026', -860, 470, t, A.n44 + .2);
    } },
    { at: A.saham - .12, via: 'whip', mod(p, t) { shake(p, t, A.n173, 18); }, draw(ctx, t) {   // S3 · Nvidia −9,3 %, AMD −17,3 % + Ahri's chart
      evid(ctx, IM.jatuh, -430, -20, 920, t, A.saham, { rot: -2, dark: true });
      typeOn(ctx, 'NVIDIA', 170, -330, t, A.nvidia, MN(28), { ls: 6, cps: 30 });
      fall(ctx, '−9,3%', 170, -150, t, A.n93 - .05, DSP(180));
      typeOn(ctx, 'AMD', 170, 0, t, A.amd, MN(28), { ls: 6, cps: 30 });
      txt(ctx, 'pembuat chip lainnya', 280, 0, t, A.chip - .3, SRF(44), { col: ivo(.85) });
      fall(ctx, '−17,3%', 170, 250, t, A.n173 - .05, DSP(250));
      shards(ctx, 520, 160, t, A.n173, 16, 9); star(ctx, 520, 160, t, A.n173, 90, 140);
      slab(ctx, 'AMBLES', 170, 340, t, A.ambles, { size: 28, lime: true });
      srcTag(ctx, 'AP via Fox Carolina, 5 Nov · Le Monde, 7 Nov 2026 (diolah)', -860, 470, t, A.n93 + .3);
    } },
    { at: A.pemicunya - .12, via: 'rise', draw(ctx, t) {       // S4 · three triggers, typographic (Le Monde full rides over pemilu)
      markLine(ctx, 'Pemicunya ', 'CAMPUR ADUK', '', -860, -360, t, A.pemicunya - .1, A.campur, SRF(70), { align: 'left' });
      const COL = [[-860, '01', ['PEMILU', 'TENGAH PERIODE AS'], 'aturan AI terasa makin ketat', A.pemilu],
                   [-260, '02', ['BIAYA', 'PINJAMAN NAIK'], '', A.biaya],
                   [340, '03', ['INVESTOR', 'MULAI RAGU'], 'sama untungnya bisnis AI', A.investor]];
      for (const [x, n, tl, sub, t0] of COL) {
        const k = E.outQuint(inv(t0 - .1, t0 + .4, t)); if (k <= 0) continue;
        txt(ctx, n, x - 10, 60, t, t0 - .1, DSP(300), { col: ivo(.1), rise: 80 });
        ctx.fillStyle = ivo(.7); ctx.fillRect(x, -150, 520 * k, 3);
        fall(ctx, tl[0], x, -60, t, t0, DSP(84)); fall(ctx, tl[1], x, 20, t, t0 + .12, DSP(60), { stag: .018 });
        if (sub) txt(ctx, sub, x, 110, t, t0 + (n === '01' ? 2.4 : .7), SRF(38), { col: ivo(.85) });
      }
      srcTag(ctx, 'Le Monde, 7 Nov 2026', -860, 470, t, A.ditambah);
    } },
    { at: A.jadi - .12, via: 'push', mod(p, t) { const k = E.inOutCubic(inv(A.disorot - .2, A.disorot + .8, t)); p.dist -= 170 * k; p.tx += 150 * k; p.foc = p.dist; },
      draw(ctx, t) {                                          // S5 · the lineup: AI is not the only suspect, but the light finds it
      ctx.strokeStyle = ivo(.09); ctx.lineWidth = 2; ctx.beginPath(); for (let y = -380; y <= 320; y += 70) { ctx.moveTo(-900, y); ctx.lineTo(900, y); } ctx.stroke();
      ctx.fillStyle = ivo(.22); for (let y = -380; y <= 320; y += 70) { ctx.fillRect(-900, y - 1, 34, 3); ctx.fillRect(866, y - 1, 34, 3); }
      fall(ctx, 'BUKAN SATU-SATUNYA TERSANGKA', 0, -420, t, A.bukan, DSP(72), { align: 'center', stag: .016 });
      const kL = E.inOutCubic(inv(A.disorot - .1, A.disorot + .3, t)), dimA = 1 - .62 * kL;
      if (kL > 0) { ctx.save(); ctx.globalAlpha *= kL; const g = ctx.createLinearGradient(0, -560, 0, 340); g.addColorStop(0, 'rgba(241,239,230,.34)'); g.addColorStop(1, 'rgba(241,239,230,.05)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(580, -560); ctx.lineTo(680, -560); ctx.lineTo(880, 345); ctx.lineTo(380, 345); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(241,239,230,.22)'; ctx.beginPath(); ctx.ellipse(630, 348, 250, 34, 0, 0, 7); ctx.fill(); ctx.restore(); }
      [[-630, 'PEMILU'], [-210, 'BIAYA PINJAMAN'], [210, 'INVESTOR RAGU']].forEach(([x, lab], i) => suspect(ctx, x, 340, t, A.bukan + .3 + i * .22, lab, { a: dimA }));
      suspect(ctx, 630, 340 - 14 * E.outCubic(inv(A.ai, A.ai + .3, t)), t, A.tersangka + .2, 'AI', { chip: true });
      slab(ctx, 'PALING DISOROT', 630, -320, t, A.disorot, { size: 28, lime: true, align: 'center' });
    } },
    { at: A.terus - .12, via: 'whip', draw(ctx, t) {          // S6 · Nasdaq tower + a bubble that wobbles but holds
      plate(ctx, still(IM.tower), t, -420, -10, 600, 900, kq(t, A.terus, .6), { t0: A.terus, vig: .5 });
      txt(ctx, 'NASDAQ · NEW YORK', -720, 488, t, A.terus + .3, MN(20), { ls: 5, col: ivo(.7) });
      const r = 230 * pumped(t, A.gelembung - .2, [[A.pecah, .1]], .02), cy = -70 - 6 * Math.sin(t * 1.3);
      bubble(ctx, 430, cy, r, t, { wob: wobble(t, [[A.pecah], [A.pecah + .25]]), film: .16, seed: 6 });
      fall(ctx, '?', 430, cy + 85, t, A.gelembung + .1, DSP(250), { align: 'center' });
      txt(ctx, 'gelembungnya udah pecah?', 430, 290, t, A.gelembung - .1, SRF(52), { align: 'center' });
      slab(ctx, 'BELUM TENTU', 430, 390, t, A.belum - .05, { size: 30, lime: true, align: 'center' });
      srcTag(ctx, 'Foto: Nielsoncaetanosalmeron, CC BY 4.0', 80, 480, t, A.terus + .5);
    } },
    { at: A.saham2 - .12, via: 'truck', draw(ctx, t) {        // S7 · jatuh sehari ≠ besok ambruk semuanya
      txt(ctx, 'Saham jatuh sehari', 0, -260, t, A.saham2 - .1, SRF(70), { align: 'center' });
      slab(ctx, 'BUKAN BERARTI', 0, -140, t, A.bukan2 - .05, { size: 30, lime: true, align: 'center' });
      fall(ctx, 'BESOK AMBRUK SEMUANYA', 0, 70, t, A.besok - .05, DSP(130), { align: 'center', stag: .018 });
      const ks = E.outExpo(inv(A.semuanya + .15, A.semuanya + .45, t));
      if (ks > 0) { ctx.fillStyle = IVORY; ctx.save(); ctx.translate(0, 30); ctx.rotate(-2 * D2R); ctx.fillRect(-660, -5, 1320 * ks, 10); ctx.restore(); }
      for (let i = 0; i < 15; i++) {                          // a strip of days: only the first one drops
        const x = -630 + i * 90, s = i === 0 ? t - A.sehari : 0, k = E.outQuint(inv(A.saham2 + i * .03, A.saham2 + .4 + i * .03, t)); if (k <= 0) continue;
        ctx.save(); ctx.globalAlpha *= k * clamp(1 - (s - .8) / .4); ctx.translate(x, 330 + (s > 0 ? 900 * s * s : 0)); ctx.rotate(s > 0 ? s * 3 : 0);
        ctx.fillStyle = i === 0 ? IVORY : ivo(.35); ctx.fillRect(-5, -34, 10, 68); ctx.restore();
      }
      txt(ctx, 'SATU HARI', -630, 420, t, A.sehari, MN(18), { ls: 4, align: 'center', col: ivo(.7) });
    } },
    { at: A.buat - .12, via: 'whip', draw(ctx, t) {           // S8 · dot-com: 31 months of slow slide vs one day at the same scale (Fool full first)
      typeOn(ctx, 'NASDAQ · GELEMBUNG DOT-COM', -860, -440, t, A.dotcom, MN(24), { ls: 5, cps: 34 });
      ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-880, 320); ctx.lineTo(560, 320); ctx.stroke();
      for (let m = 0; m <= 30; m += 6) { ctx.fillStyle = ivo(.35); ctx.fillRect(DX(m) - 1, 320, 2, 12); }
      txt(ctx, 'MAR 2000', DX(0), 365, t, A.th2000, MN(18), { ls: 3, col: ivo(.6) });
      txt(ctx, 'OKT 2002', DX(31), 365, t, A.n31, MN(18), { ls: 3, col: ivo(.6), align: 'right' });
      const vis = C8.L * E.inOutSine(inv(A.nasdaq2 - .2, A.n31, t)); drawCrack(ctx, C8, vis, { head: true });
      fall(ctx, 'HAMPIR −80%', -40, -170, t, A.n80 - .05, DSP(150));
      if (t > A.nasdaq2 - .2) { const mo = clamp((ptAt(C8.P, vis)[0] + 860) / 44.5, 0, 31);
        slot(ctx, mo, -40, -20, DSP(104), { fmt: q => q + ' BULAN', col: t > A.n31 ? LIME : IVORY }); }
      txt(ctx, 'merosot pelan-pelan', -40, 60, t, A.merosot - .1, SRF(46), { col: ivo(.85) });
      txt(ctx, '5 NOV 2026 · 1 HARI', 600, -250, t, A.itu, MN(16), { ls: 3, col: ivo(.8) });
      drawCrack(ctx, C8d, C8d.L * E.outExpo(inv(A.itu + .2, A.itu + .6, t)), { w: .9 });
      txt(ctx, '−5,5%', 735, -110, t, A.itu + .5, MN(24), { col: ivo(.85) });
      txt(ctx, 'SKALA SAMA · BENTUK DIILUSTRASIKAN', -860, 420, t, A.nggak, MN(16), { ls: 4, col: ivo(.45) });
      srcTag(ctx, 'The Motley Fool, 12 Nov 2026 · DW, 13 Nov 2026 (diolah)', -860, 470, t, A.n80 + .3);
    } },
    { at: A.bedanya - .12, via: 'rise', draw(ctx, t) {        // S9 · the balance: 2000 saham vs 2026 utang + kontrak (analisis redaksi)
      txt(ctx, 'Bedanya sama tahun 2000?', 0, -415, t, A.bedanya - .1, SRF(56), { align: 'center' });
      markLine(ctx, 'salah satunya di cara nyari ', 'MODAL', '', 0, -320, t, A.cara - .5, A.modal, SRF(62));
      const th = 8 * E.inOutCubic(inv(A.utang, A.panjang + .3, t)) * D2R + .01 * Math.exp(-Math.max(0, t - A.panjang - .3) / .3) * Math.sin(Math.max(0, t - A.panjang) * 18),
        PY = -170, AR = 500, Lx = -AR * Math.cos(th), Ly = PY - AR * Math.sin(th), Rx = AR * Math.cos(th), Ry = PY + AR * Math.sin(th);
      const kb = E.outQuint(inv(A.bedanya, A.bedanya + .6, t)); if (kb <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * kb;
      ctx.fillStyle = ivo(.75); ctx.fillRect(-7, PY, 14, 500); ctx.beginPath(); ctx.moveTo(-90, 340); ctx.lineTo(90, 340); ctx.lineTo(50, 300); ctx.lineTo(-50, 300); ctx.closePath(); ctx.fill();
      ctx.save(); ctx.translate(0, PY); ctx.rotate(th); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.roundRect(-AR - 10, -8, 2 * AR + 20, 16, 8); ctx.fill(); ctx.restore();
      ctx.beginPath(); ctx.arc(0, PY, 16, 0, 7); ctx.fill();
      for (const [x, y] of [[Lx, Ly], [Rx, Ry]]) {
        ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 160, y + 240); ctx.moveTo(x, y); ctx.lineTo(x + 160, y + 240); ctx.stroke();
        ctx.fillStyle = ivo(.85); ctx.beginPath(); ctx.moveTo(x - 175, y + 238); ctx.quadraticCurveTo(x, y + 300, x + 175, y + 238); ctx.lineTo(x + 175, y + 246); ctx.quadraticCurveTo(x, y + 310, x - 175, y + 246); ctx.closePath(); ctx.fill();
      }
      ctx.globalAlpha = a0;
      popAt(ctx, Lx, Ly + 180, t, A.jualan - .1, () => { certi(ctx, -30, 10, 200, 100, '', 1); certi(ctx, 20, -10, 220, 110, 'SAHAM', 54); }, { rise: 120 });
      popAt(ctx, Rx, Ry + 180, t, A.utang - .05, () => certi(ctx, 0, 0, 240, 110, 'UTANG', 54), { rise: 120 });
      popAt(ctx, Rx, Ry + 70, t, A.kontrak - .05, () => certi(ctx, 0, 0, 290, 100, 'KONTRAK SEWA', 40), { rise: 120 });
      fall(ctx, '2000', Lx, Ly + 400, t, A.dulu - .05, DSP(84), { align: 'center' });
      txt(ctx, 'modal dari jualan saham', Lx, Ly + 450, t, A.jualan, SRF(34), { align: 'center', col: ivo(.85) });
      fall(ctx, '2026', Rx, Ry + 400, t, A.sekarang - .05, DSP(84), { align: 'center' });
      txt(ctx, 'utang + kontrak sewa jangka panjang', Rx, Ry + 450, t, A.sewa, SRF(34), { align: 'center', col: ivo(.85) });
      typeOn(ctx, 'ANALISIS REDAKSI · MENURUT KAMI', -860, 470, t, A.menurut, MN(18), { ls: 4, cps: 40, col: ivo(.6) });
    } },
    { at: A.jadi2 - .12, via: 'push', draw(ctx, t) {          // S10 · the bills fall due before the income arrives
      txt(ctx, 'kalau pemasukannya telat datang,', 0, -400, t, A.jadi2 - .1, SRF(58), { align: 'center' });
      txt(ctx, 'yang ketekan bukan cuma', 0, -300, t, A.ketekan - .2, SRF(44), { align: 'center', col: ivo(.85) });
      fall(ctx, 'HARGA SAHAM', 0, -170, t, A.harga - .05, DSP(110), { align: 'center' });
      drawCrack(ctx, C10, C10.L * E.outExpo(inv(A.saham4, A.saham4 + .4, t)), { w: .9 });
      const AX = 60, ph = lerp(-760, 760, E.inOutSine(inv(A.jadi2 + .2, A.ketekan + .4, t))), cx = Math.max(-800, ph - 500);
      ctx.strokeStyle = ivo(.4); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-820, AX); ctx.lineTo(800, AX); ctx.lineTo(780, AX - 12); ctx.moveTo(800, AX); ctx.lineTo(780, AX + 12); ctx.stroke();
      txt(ctx, 'WAKTU', 800, AX + 44, t, A.jadi2, MN(16), { ls: 4, align: 'right', col: ivo(.55) });
      if (t > A.jadi2) { ctx.fillStyle = ivo(.25); ctx.fillRect(ph - 1, AX - 150, 2, 190); }
      [-600, -300, 0, 300, 600].forEach((bx, i) => popAt(ctx, bx, AX - 60, t, A.jadi2 + .1 + i * .12, () => {
        const due = ph > bx && cx < bx, s = t - (A.jadi2 + .2 + (bx + 760) / 1520 * (A.ketekan + .2 - A.jadi2));
        ctx.rotate(due ? (6 * Math.exp(-Math.max(0, s) / .4) * Math.sin(Math.max(0, s) * 20) + 4) * D2R : 0);
        doc(ctx, 0, 0, 140, 92, { blur: 20, sy: 10 }); setFont(ctx, MN(16), 3); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('CICILAN', 0, -14);
        ctx.fillStyle = 'rgba(29,30,24,.2)'; ctx.fillRect(-46, 6, 92, 6); ctx.fillRect(-46, 20, 60, 6); ctx.textAlign = 'left';
        if (due) { ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.strokeRect(-76, -52, 152, 104); }
      }, { rise: 40 }));
      if (t > A.pemasukannya - .2) { stack(ctx, cx, 230, 5, t, A.pemasukannya - .2, { rx: 60, th: 14 }); txt(ctx, 'PEMASUKAN', cx, 280, t, A.pemasukannya, MN(18), { ls: 4, align: 'center', col: ivo(.75) }); }
      txt(ctx, 'tapi juga', 0, 360, t, A.tapi2 - .1, SRF(44), { align: 'center', col: ivo(.85) });
      slab(ctx, 'BAYAR CICILANNYA', 0, 430, t, A.bayar, { size: 30, lime: true, align: 'center' });
      typeOn(ctx, 'ILUSTRASI · ANALISIS REDAKSI', 500, -470, t, A.jadi2 + .3, MN(16), { ls: 4, cps: 40, col: ivo(.45) });
    } },
    { at: A.makanya - .12, via: 'whip', draw(ctx, t) {        // S11 · two confident guesses (Krugman full first)
      ctx.fillStyle = ivo(.25); ctx.fillRect(-1, -300 + 600 * (1 - E.outQuint(inv(A.makanya, A.makanya + .6, t))), 2, 600 * E.outQuint(inv(A.makanya, A.makanya + .6, t)));
      txt(ctx, 'yang pede', -470, -200, t, A.pede - .2, SRF(48), { align: 'center', col: ivo(.8) });
      fall(ctx, '"AI PASTI PECAH BESOK"', -470, -80, t, A.pasti - .05, DSP(76), { align: 'center', stag: .016 });
      txt(ctx, 'atau yang yakin', 470, -200, t, A.sebaliknya, SRF(48), { align: 'center', col: ivo(.8) });
      fall(ctx, '"PASTI AMAN-AMAN AJA"', 470, -80, t, A.yakin + .1, DSP(76), { align: 'center', stag: .016 });
      txt(ctx, 'dua-duanya', 0, 110, t, A.duaduanya - .1, SRF(48), { align: 'center', col: ivo(.85) });
      stamp(ctx, 'SAMA-SAMA NEBAK', 0, 250, t, A.nebak - .05, { size: 120, rot: -3 });
    } },
    { at: A.yang - .12, via: 'rise', draw(ctx, t) {           // S12 · cek jalurnya satu per satu
      txt(ctx, 'Yang paling masuk akal sekarang:', 0, -260, t, A.yang - .1, SRF(56), { align: 'center', col: ivo(.85) });
      markLine(ctx, 'cek ', 'JALURNYA', ' satu per satu', 0, -140, t, A.cek - .3, A.jalurnya, SRF(82));
      const XS = [-500, 0, 500], tt = [A.satu, A.per, A.satu2], kl = E.inOutCubic(inv(A.satu - .1, A.satu2 + .2, t));
      if (kl > 0) { ctx.strokeStyle = ivo(.5); ctx.lineWidth = 3; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.moveTo(-500, 150); ctx.lineTo(-500 + 1000 * kl, 150); ctx.stroke(); ctx.setLineDash([]); }
      XS.forEach((x, i) => popAt(ctx, x, 150, t, tt[i] - .03, () => {
        ctx.fillStyle = '#11120E'; ctx.beginPath(); ctx.arc(0, 0, 44, 0, 7); ctx.fill(); ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.stroke();
        setFont(ctx, MN(30), 0); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 11); ctx.textAlign = 'left'; }, { from: .3 }));
      txt(ctx, 'NVIDIA', -500, 250, t, A.satu, MN(22), { ls: 5, align: 'center', col: ivo(.8) });
      txt(ctx, '…', 0, 250, t, A.per, MN(22), { align: 'center', col: ivo(.6) });
      txt(ctx, 'DOMPET KITA', 500, 250, t, A.satu2, MN(22), { ls: 5, align: 'center', col: ivo(.8) });
    } },
    { at: A.dari - .12, via: 'truck', draw(ctx, t) {          // S13 · dot map: the camera rides the head from Wall Street to Indonesia
      if (!GRID) return; const S = 22, k = E.inOutCubic(inv(A.dari - .1, A.indonesia + .25, t)), z = lerp(1, 1.2, E.inOutSine(inv(A.dari, A.indonesia + .9, t)));
      const NY = [141, 26], JK = [62, 45], CP = [101.5, 12], bz = u => [(1 - u) * (1 - u) * NY[0] + 2 * (1 - u) * u * CP[0] + u * u * JK[0], (1 - u) * (1 - u) * NY[1] + 2 * (1 - u) * u * CP[1] + u * u * JK[1]];
      const [hx, hy] = bz(k), X = c => (c - hx) * S * z, Y = r => (r - hy) * S * z, a0 = ctx.globalAlpha, ka = E.outCubic(inv(A.dari - .1, A.dari + .4, t));
      ctx.globalAlpha = a0 * ka; ctx.fillStyle = ivo(.3); ctx.beginPath();
      GRID.rows.forEach((row, r) => { const y = Y(r); if (Math.abs(y) > 620) return; for (let c = 0; c < row.length; c++) if (row[c] === '1') { const x = X(c); if (Math.abs(x) < 1020) { ctx.moveTo(x + 3.2 * z, y); ctx.arc(x, y, 3.2 * z, 0, 7); } } });
      ctx.fill();
      const kI = E.outCubic(inv(A.indonesia - .05, A.indonesia + .35, t));
      if (kI > 0) { ctx.globalAlpha = a0 * ka * kI; ctx.fillStyle = LIME; ctx.beginPath();
        for (let r = 37; r <= 47; r++) for (let c = 57; c <= 75; c++) if (GRID.rows[r][c] === '1') { const x = X(c), y = Y(r); ctx.moveTo(x + 4 * z, y); ctx.arc(x, y, 4 * z, 0, 7); } ctx.fill(); }
      ctx.globalAlpha = a0 * ka; ctx.strokeStyle = ivo(.9); ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 0; i <= 60; i++) { const u = k * i / 60, [c, r] = bz(u); i ? ctx.lineTo(X(c), Y(r)) : ctx.moveTo(X(c), Y(r)); } ctx.stroke();
      ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(200,245,60,.4)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 22 + 6 * Math.sin(t * 8), 0, 7); ctx.stroke();
      ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(X(NY[0]), Y(NY[1]), 7, 0, 7); ctx.fill();
      setFont(ctx, MN(22), 5); ctx.fillText('WALL STREET', X(NY[0]) + 18, Y(NY[1]) - 16);
      ctx.globalAlpha = a0;
      fall(ctx, 'INDONESIA', X(JK[0]) - 40, Y(JK[1]) + 130, t, A.indonesia - .05, DSP(90), { align: 'center' });
      txt(ctx, 'dari sinilah ceritanya nyampe ke kita', 0, -400, t, A.dari, SRF(54), { align: 'center' });
      txt(ctx, 'Peta: BlankMap-World, Wikimedia Commons (CC0)', -860, 480, t, A.dari + .4, MN(16), { ls: 2, col: ivo(.45) });
    } },
  ];

  let FULLS;
  return makeChapter({ B, ST, load, label: 'BAB 3 · RETAK PERTAMA, 5 NOVEMBER 2026', full: () => FULLS ??= [
    { im: IM.open, t0: A.n55 + .45, t1: A.indeks + 1.9, dir: 1, tab: 'openthemagazine.com · 6 Nov 2026',
      hl: [[.035, .245, .6, .1, A.n55 + .9], [.25, .905, .41, .055, A.n55 + 1.75]] },
    { im: IM.fox, t0: A.terburuknya - .1, t1: A.saham - .15, dir: -1, tab: 'foxcarolina.com · 5 Nov 2026', crop: [0, .06, 1, .5],
      hl: [[.04, .19, .48, .19, A.terburuknya + .25], [.19, .43, .665, .19, A.terburuknya + .6]] },
    { im: IM.lemonde, t0: A.ada - .1, t1: A.ditambah - .15, dir: 1, tab: 'lemonde.fr · opini · 7 Nov 2026', crop: [0, .12, 1, .62],
      hl: [[.04, .13, .66, .18, A.ada + .25], [.555, .44, .42, .11, A.pemilu + .2], [.04, .58, .41, .11, A.pemilu + .7]] },
    { im: IM.fool, t0: A.buat - .1, t1: A.th2000 - .1, dir: -1, tab: 'fool.com · 12 Nov 2026', crop: [0, 0, 1, .8],
      hl: [[.035, .17, .7, .14, A.buat + .3], [.148, .85, .09, .06, A.perbandingan + .7]] },
    { im: IM.krugman, t0: A.makanya - .1, t1: A.sebaliknya - .15, dir: 1, tab: 'paulkrugman.substack.com · opini · 8 Nov 2026', crop: [.2, .3, .6, .7],
      hl: [[.13, .245, .57, .16, A.makanya + .25]] },
  ] });
}
