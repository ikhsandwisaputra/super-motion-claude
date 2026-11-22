// Bab 1 · "Setara manusia" itu manusia yang mana? — dunia TERANG (lab ukur gading), bab terang pertama film.
// Tanda tangan: PENGGARIS ELASTIS — empat penggaris akrilik (OpenAI, DeepMind, Chollet, Hendrycks) berdiri di tangga dunia,
// panjang beda, tiap penggaris menaruh anak tangga AGI di tinggi beda; menyala saat VO menyebutnya (terang.js).
// ★ baru bab ini: "Tangga Persentil" — Levels of AGI dibangun sebagai tangga balok di atas skala persentil yang terukur
//   (p50 → p90 → p99 → di atas manusia: anak tangga makin pendek di puncak), kamera menaiki balok satu per satu.
// Tulang punggung: kamera naik anak tangga dunia (agi.makeSteps, 4 anak tangga + bordes per station, py = −520·i − 560).
import B from './beats.js';
import { theme, clamp, inv, lerp, E, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  evid, fall, markLine, srcTag, slab, txt, typeOn, plate, still, gone, rnd, addF, grainRect, W, H } from './kit.js';
import * as K from './kit.js';
import { kq, pop, bulb, stack, stamp } from './draw.js';
import { makeSteps, needle, springSp, diukur } from './agi.js';
import { stairsT, akrilik, tangga, satu, RUL } from './terang.js';
import { strike, check } from './pustaka/dasar.js';
import { orang } from './pustaka/prop.js';

theme(true);
const INK = () => K.INK, CARD = () => K.CARD, CARD_INK = () => K.CARD_INK;
const STEPS = makeSteps([...Array.from({ length: 18 }, () => [['run', 4], ['land', 1460]]).flat(), ['run', 12]], 730);

// camera that walks through keys [t, dx, dy, dist, yaw] (snap → hold, slow push while holding)
const keyCam = (s, KS, d = .7) => t => {
  let i = 0; while (i < KS.length - 1 && t >= KS[i + 1][0]) i++;
  const p = KS[Math.max(0, i - 1)], q = KS[i], k = i === 0 ? 1 : E.inOutCubic(inv(q[0], q[0] + d, t)), L = j => lerp(p[j], q[j], k);
  return { tx: s.x + L(1), ty: s.py - 20 + L(2), tz: s.z, dist: L(3) - 12 * Math.min(Math.max(t - q[0], 0), 6), yaw: L(4) + .3 * Math.sin(t * .45), pitch: 6 };
};

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};
  async function load() {
    const k = '../assets/shared/';
    [IM.charter, IM.dm, IM.hd, IM.graf, IM.eniac, IM.robot] = await Promise.all([
      loadImg(k + 'kutipan/openai-openai-charter.png', 2706), loadImg(k + 'kutipan/arxiv-computer-science-artificial-intelligence-2.png', 2000),
      loadImg(k + 'kutipan/arxiv-computer-science-artificial-intelligence.png', 2000), loadImg(k + 'grafik/skor-agi-gpt4-gpt5.png', 1600),
      loadImg(k + 'cc/commons-classic-shot-of-the-eniac.jpg', 1400), loadImg('../assets/own/robot.png', 800)]);
    IM.night = await loadVid(k + 'vid/', 'busy_night');
  }

  // ── small pieces ──────────────────────────────────────────────────────────────────────────────────────
  const rackGhost = (ctx, t, skip, a = .55) => { [[-840, 0], [-420, 1], [0, 2], [420, 3]].forEach(([x, i]) => { if (i === skip) return;
    ctx.globalAlpha = a; satu(ctx, t, i, { x, yb: 380, label: false, tNotch: null }); }); ctx.globalAlpha = 1; };
  function robot(ctx, x, yb, h, flip, dim = 1) {
    const im = IM.robot; if (!im) return; const w = h * im.width / im.height, a0 = ctx.globalAlpha;
    ctx.save(); ctx.translate(x, yb); if (flip) ctx.scale(-1, 1); ctx.globalAlpha = a0 * dim;
    ctx.fillStyle = `rgba(${K.INKRGB},.12)`; ctx.beginPath(); ctx.ellipse(0, 4, w * .5, 18, 0, 0, 7); ctx.fill();          // contact shadow
    const f0 = addF(ctx, 'saturate(.32) contrast(1.08)'); ctx.drawImage(im, -w / 2, -h, w, h); ctx.filter = f0;
    ctx.restore(); ctx.globalAlpha = a0;
  }
  function books(ctx, x, yb, n, t, t0) {
    for (let i = 0; i < n; i++) { const s = t - t0 - i * .07; if (s <= 0) break;
      const w = 230 + (rnd(i) - .5) * 44, dx = (rnd(i + 7) - .5) * 26, y = yb - (i + 1) * 25 - (1 - K.spring(s, .62, .28)) * 320;
      ctx.globalAlpha = clamp(s / .06); ctx.fillStyle = i % 3 === 1 ? '#5E6052' : i % 3 === 2 ? '#2A2B22' : '#44463A';
      ctx.fillRect(x - w / 2 + dx, y, w, 23); ctx.fillStyle = 'rgba(241,239,230,.55)'; ctx.fillRect(x - w / 2 + dx + 14, y + 4, 4, 15); ctx.fillRect(x + w / 2 + dx - 40, y + 9, 26, 3); }
    ctx.globalAlpha = 1;
  }
  function pcard(ctx, x, y, s, j, k, o = {}) {                      // a 3×3 pattern card (ARC-style example); j = shift of the diagonal
    if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(-s / 2 + 8, -s / 2 + 10, s, s);
    ctx.fillStyle = '#FBFAF5'; ctx.fillRect(-s / 2, -s / 2, s, s); ctx.strokeStyle = o.hot ? INK() : ivo(.35); ctx.lineWidth = o.hot ? 4 : 2; ctx.strokeRect(-s / 2, -s / 2, s, s);
    const c = s / 3.6, g = (s - 3 * c) / 4;
    for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) { const on = o.q ? false : q === (r + j) % 3;
      ctx.fillStyle = on ? INK() : ivo(.1); ctx.fillRect(-s / 2 + g + q * (c + g), -s / 2 + g + r * (c + g), c, c); }
    if (o.q) { setFont(ctx, DSP(s * .7)); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.55); ctx.fillText('?', 0, s * .26); ctx.textAlign = 'left'; }
    ctx.restore();
  }
  function arcGrid(ctx, x, y, s, seed, k) {                          // ARC mini task: 5×5 input → output
    if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; ctx.translate(x, y + (1 - k) * 40);
    const c = s / 5;
    for (const [ox, sh] of [[0, 0], [s + 70, 1]]) {
      ctx.fillStyle = '#FBFAF5'; ctx.fillRect(ox - 6, -6, s + 12, s + 12); ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.strokeRect(ox - 6, -6, s + 12, s + 12);
      for (let r = 0; r < 5; r++) for (let q = 0; q < 5; q++) { const v = rnd(seed * 31 + r * 5 + (sh ? (q + 1) % 5 : q));
        if (v > .62) { ctx.fillStyle = v > .86 ? INK() : ivo(.45); ctx.fillRect(ox + q * c + 2, r * c + 2, c - 4, c - 4); } }
    }
    ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(s + 14, s / 2); ctx.lineTo(s + 56, s / 2); ctx.moveTo(s + 44, s / 2 - 10); ctx.lineTo(s + 56, s / 2); ctx.lineTo(s + 44, s / 2 + 10); ctx.stroke();
    ctx.restore();
  }
  // the vertical acrylic ruler with a lime needle at value v (0..100+), x = left edge
  function gauge(ctx, x, yb, L, v, o = {}) {
    akrilik(ctx, x, yb, L, { lit: 1, every: o.every ?? 10, engrave: o.engrave, w: o.w ?? 108, sheen: o.sheen ?? -1 });
    if (v > .3) { ctx.save(); ctx.translate(x, yb); ctx.rotate(-Math.PI / 2); needle(ctx, v / 100 * L, -18, (o.w ?? 108) + 30, 1); ctx.restore(); }
  }

  // ── Levels of AGI as a measured stair scale ────────────────────────────────────────────────────────────
  const LV = [['COMPETENT', '≥ PERSENTIL 50', 'cukup mumpuni', 50, 'competent'], ['EXPERT', '≥ PERSENTIL 90', 'ahli', 90, 'expert'],
    ['EXCEPTIONAL', '≥ PERSENTIL 99', 'istimewa', 99, 'exceptional'], ['SUPERHUMAN', '> SEMUA MANUSIA', '', 105, 'superhuman']];
  const GY = 430, GL = 820, GX = -880;                                // percentile ruler: 0 at y 430, 100 at y −390
  function levels(ctx, t, s0) {
    const v = t < A.separuh ? 0 : t < A.n90 ? springSp(t, A.separuh, 0, 50) : t < A.n99 ? springSp(t, A.n90, 50, 90) : t < A.diatas ? springSp(t, A.n99, 90, 99) : springSp(t, A.diatas, 99, 105);
    const ka = kq(t, s0 + .05, .6);
    ctx.globalAlpha = ka; gauge(ctx, GX, GY, GL * (.2 + .8 * ka), v, { engrave: 'PERSENTIL MANUSIA', w: 100, sheen: inv(A.separuh, A.separuh + .8, t) }); ctx.globalAlpha = 1;
    txt(ctx, 'LEVELS OF AGI · GOOGLE DEEPMIND', -720, -398, t, s0 + .2, MN(20), { ls: 5, col: ivo(.75) });
    txt(ctx, 'lebih jago dari …', -720, -330, t, s0 + .35, SRF(46));
    // ten skilled adults: lit count follows the VO (5 → 9 → 10)
    const nLit = t > A.n99 ? 10 : t > A.n90 ? 9 : t > A.separuh ? 5 : 0;
    for (let i = 0; i < 10; i++) { const kk = pop(t, s0 + .4 + i * .04); if (kk <= 0) continue; const on = i < nLit, ko = on ? E.outCubic(inv(i < 5 ? A.separuh : i < 9 ? A.n90 : A.n99, (i < 5 ? A.separuh : i < 9 ? A.n90 : A.n99) + .3, t)) : 0;
      ctx.save(); ctx.translate(-700 + i * 42, -160); ctx.scale(1, Math.min(kk, 1.15)); orang(ctx, 0, 0, 74, { style: 'piktogram', col: `rgba(${K.INKRGB},${.16 + .74 * ko})` }); ctx.restore(); }
    txt(ctx, 'ORANG DEWASA TERAMPIL', -722, -118, t, s0 + .7, MN(16), { ls: 3, col: ivo(.62) });
    const big = t > A.diatas ? '100%+' : t > A.n99 ? '99%' : t > A.n90 ? '90%' : t > A.separuh ? '50%' : '';
    if (big) { const tk = t > A.diatas ? A.diatas : t > A.n99 ? A.n99 : t > A.n90 ? A.n90 : A.separuh; ctx.save(); ctx.translate(-722, -26); const sc = Math.min(pop(t, tk), 1.12); ctx.scale(sc, sc);
      setFont(ctx, DSP(104), 2); ctx.fillStyle = INK(); ctx.fillText(big, 0, 0); ctx.restore(); }
    txt(ctx, 'DI BANYAK TUGAS', -722, 0, t, A.separuh + 1.3, MN(18), { ls: 3, col: ivo(.7) });
    LV.forEach(([nm, pc, gl, p, key], i) => {
      const x0 = -640 + i * 385, w = 362, top = GY - Math.min(p, 105) / 100 * GL - (p > 100 ? 18 : 0), kr = E.outQuint(inv(s0 + .15 + i * .12, s0 + .8 + i * .12, t)); if (kr <= 0) return;
      const tl = A[key], lit = E.outCubic(inv(tl, tl + .35, t)), act = t > tl && (i === 3 || t < A[LV[i + 1][4]]), h = (GY - top) * kr, y = GY - h;
      ctx.fillStyle = `rgba(${K.INKRGB},.08)`; ctx.fillRect(x0 + 16, y + 16, w, h);                                       // shadow on the wall
      ctx.fillStyle = 'rgba(252,251,246,.72)'; ctx.fillRect(x0, y, w, h);
      if (lit > 0) { ctx.globalAlpha = lit; ctx.fillStyle = CARD(); ctx.fillRect(x0, y, w, h); ctx.globalAlpha = 1; }
      ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.strokeRect(x0, y, w, h);
      ctx.fillStyle = act ? LIME : lit > 0 ? ivo(.9) : ivo(.3); ctx.fillRect(x0 - 4, y - 6, w + 8, act ? 12 : 6);              // the tread lip
      if (lit > 0) { ctx.strokeStyle = ivo(.35 * lit); ctx.setLineDash([6, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(GX + 104, top); ctx.lineTo(x0 - 6, top); ctx.stroke(); ctx.setLineDash([]); }
      ctx.save(); ctx.beginPath(); ctx.rect(x0, y, w, h); ctx.clip();
      const col = lit > .5 ? K.CARD_INK : `rgba(${K.INKRGB},.32)`;
      setFont(ctx, DSP(78), 2); ctx.fillStyle = col; ctx.fillText(nm, x0 + 24, top + 88 + 30 * (1 - lit));
      setFont(ctx, MN(19), 3); ctx.fillStyle = lit > .5 ? 'rgba(241,239,230,.78)' : `rgba(${K.INKRGB},.4)`; ctx.fillText(pc, x0 + 24, top + 126);
      if (gl && lit > 0) { ctx.globalAlpha = E.outQuint(inv(tl + .9, tl + 1.4, t)); setFont(ctx, SRF(38)); ctx.fillStyle = K.CARD_INK; ctx.fillText(gl, x0 + 24, top + 180); ctx.globalAlpha = 1; }
      ctx.restore();
    });
    srcTag(ctx, 'Sumber: Morris dkk., Google DeepMind, arXiv, 4 Nov 2023', -720, -462, t, A.competent + .3);
  }

  // ── the ten-ability ring (Hendrycks ruler bent into a dial) ───────────────────────────────────────────
  const DOM = ['PENGETAHUAN UMUM', 'BACA & TULIS', 'MATEMATIKA', 'PENALARAN', 'MEMORI KERJA', 'SIMPAN MEMORI', 'PANGGIL MEMORI', 'VISUAL', 'AUDITORI', 'KECEPATAN'];
  function ring(ctx, t, cx, cy) {
    const R0 = 214, R1 = 292, hot = i => (t > A.pengetahuan && t < A.daya && i === 0) || (t > A.daya && i >= 4 && i <= 6);
    const ticks = new Path2D();
    DOM.forEach((d, i) => {
      const k = pop(t, A.sepuluh - .25 + i * .075); if (k <= 0) return;
      const a0 = -Math.PI / 2 + i * Math.PI / 5 + .035, a1 = a0 + Math.PI / 5 - .07, off = (1 - Math.min(k, 1.1)) * 50, r0 = R0 + off, r1 = R1 + off;
      ctx.globalAlpha = clamp(k * 2);
      ctx.beginPath(); ctx.arc(cx, cy, r1, a0, a1); ctx.arc(cx, cy, r0, a1, a0, true); ctx.closePath();
      const h = hot(i); ctx.fillStyle = h ? LIME : 'rgba(252,251,246,.86)'; ctx.fill(); ctx.strokeStyle = h ? LIME_INK : ivo(.4); ctx.lineWidth = 2; ctx.stroke();
      for (let q = 1; q < 8; q++) { const a = lerp(a0, a1, q / 8), l = q === 4 ? 26 : 13; ticks.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ticks.lineTo(cx + Math.cos(a) * (r1 - l), cy + Math.sin(a) * (r1 - l)); }
      const m = (a0 + a1) / 2, cs = Math.cos(m), lr = R1 + 34;
      setFont(ctx, MN(17), 2); ctx.textAlign = cs > .25 ? 'left' : cs < -.25 ? 'right' : 'center'; ctx.fillStyle = h ? INK() : ivo(.72);
      ctx.fillText(d, cx + cs * lr, cy + Math.sin(m) * (lr + (Math.abs(cs) < .25 ? 16 : 0)) + 6); ctx.textAlign = 'left';
    });
    ctx.globalAlpha = 1; ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; ctx.stroke(ticks);
  }

  // ── stations ────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, name: 'Kartu bab', draw(ctx, t) {                                                  // S0 · chapter card
      txt(ctx, 'BAB 1', -780, -250, t, .45, MN(26), { ls: 8 });
      ctx.fillStyle = LIME; ctx.fillRect(-780, -226, 96 * kq(t, .6, .5), 8);
      fall(ctx, 'SETARA MANUSIA', -780, 30, t, A.setara - .15, DSP(250), { ls: 3 });
      markLine(ctx, 'yang ', 'mana?', '', -780, 175, t, A.mana - .35, A.mana, SRF(104), { align: 'left' });
      diukur(ctx, -780, 215, 560, t, A.mana + .45, 'siapa?');
    }, layers: [{ dz: 900, dx: 900, fn(ctx, t) {                                              // the four rulers already wait in the lab
      [[-300, 0], [40, 1], [380, 2], [720, 3]].forEach(([x, i], j) => satu(ctx, t, i, { x, yb: 420, tIn: .3 + j * .18, label: false })); } }] },

    { at: A.dokter - .1, via: 'whip', name: 'Siapa?', draw(ctx, t) {                           // S1 · whose height is "human"?
      akrilik(ctx, -880, 420, 720, { lit: .4, every: 1000, w: 96 });
      const P = [[-420, 600, A.dokter, 'DOKTER BEDAH?'], [60, 640, A.las, 'TUKANG LAS?'], [520, 410, A.sd, 'ANAK SD?']];
      let bar = null;
      P.forEach(([x, h, t0, lb]) => { const k = pop(t, t0 - .05); if (k <= 0) return; bar = [x, h, t0];
        ctx.save(); ctx.translate(x, 420); ctx.scale(1, Math.min(k, 1.12)); orang(ctx, 0, 0, h, { style: 'piktogram', col: `rgba(${K.INKRGB},.86)` }); ctx.restore();
        slab(ctx, lb, x, 420 - h - 64, t, t0 + .05, { size: 26, align: 'center' }); });
      if (bar) { const i = P.findIndex(p => p[0] === bar[0]), yPrev = i > 0 ? 420 - P[i - 1][1] : 420, y = springSp(t, bar[2], yPrev, 420 - bar[1]);
        ctx.fillStyle = ivo(.8); ctx.fillRect(-784, y - 2, bar[0] + 784 - 70, 4); ctx.fillStyle = INK(); ctx.beginPath(); ctx.arc(-784, y, 7, 0, 7); ctx.fill(); }
    } },

    { at: A.atau, via: 'push', name: 'Jalan tikus', bg: 0, draw(ctx, t) {                    // S2 · the uncle who knows every shortcut (clip = full-bleed bg)
      const pts = [[-640, 150], [-420, 150], [-420, 10], [-150, 10], [-150, -150], [130, -150], [130, -300], [400, -300], [400, -80], [660, -80]].map(([x, y]) => [x, y - 20]);
      const pr = E.inOutCubic(inv(A.jalan - .1, A.jakarta + .9, t)) * (pts.length - 1);
      if (pr > 0) { ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        for (const [lw, col] of [[11, 'rgba(11,12,9,.55)'], [5, 'rgba(241,239,230,.95)']]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(...pts[0]);
          for (let i = 1; i <= Math.ceil(pr); i++) { const f = Math.min(1, pr - (i - 1)); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); } ctx.stroke(); }
        const i = Math.min(pts.length - 2, Math.floor(pr)), f = pr - i, hx = lerp(pts[i][0], pts[i + 1][0], f), hy = lerp(pts[i][1], pts[i + 1][1], f);
        ctx.fillStyle = '#F1EFE6'; ctx.beginPath(); ctx.arc(hx, hy, 12, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(11,12,9,.6)'; ctx.lineWidth = 3; ctx.stroke(); }
      txt(ctx, 'atau om kita,', -740, 300, t, A.om - .15, SRF(58));
      typeOn(ctx, 'YANG HAFAL SEMUA JALAN TIKUS DI JAKARTA', -740, 368, t, A.hafal, MN(30), { ls: 3, cps: 38 });
    } },

    { at: A.para, via: 'truck', name: 'Para ahli', draw(ctx, t) {                           // S3 · the experts don't agree
      fall(ctx, 'PARA AHLI', 0, -10, t, A.para - .05, DSP(240), { align: 'center', ls: 4 });
      markLine(ctx, 'pun belum ', 'sepakat.', '', 0, 140, t, A.para + .45, A.sepakat, SRF(96));
    }, layers: [{ dz: 650, fn(ctx, t) {
      [[-1050, 0, -9, .9], [-560, 1, 7, -.8], [560, 2, -6, 1], [1050, 3, 10, -.9]].forEach(([x, i, r0, kick]) => {
        const r = (r0 + springSp(t, A.sepakat, 0, 9 * kick, .35, .5)) * Math.PI / 180;
        ctx.save(); ctx.translate(x, 420); ctx.rotate(r); ctx.globalAlpha = .8; satu(ctx, t, i, { x: -59, yb: 0, sc: .8, label: false }); ctx.restore(); }); } }] },

    { at: A.ada, via: 'rise', name: 'Empat penggaris', draw(ctx, t) {                       // S4 · four rulers, four AGI steps
      txt(ctx, 'paling tidak', -860, -330, t, A.ada, SRF(50));
      fall(ctx, 'EMPAT', -860, -120, t, A.empat - .05, DSP(210), { ls: 3 });
      fall(ctx, 'PENGGARIS', -860, -10, t, A.penggaris, DSP(120), { ls: 3 });
      markLine(ctx, 'anak ', 'TANGGA', ' AGI', -860, 120, t, A.menaruh - .2, A.tangga, SRF(62), { align: 'left' });
      txt(ctx, 'di tinggi berbeda.', -860, 200, t, A.tinggi - .1, SRF(62));
      [-290, 0, 290, 580].forEach((x, i) => satu(ctx, t, i, { x, yb: 340, sc: .85, tIn: A.empat - .15 + i * .12, tNotch: A.menaruh + i * .25, lsz: 19, labelTop: true }));
    } },

    { at: A.p1, via: 'whip', tag: 'OPENAI', name: 'OpenAI', draw(ctx, t) {                    // S5 · ruler 1 lights up
      satu(ctx, t, 0, { x: -800, yb: 400, sc: 1.08, tAct: A.openai, tNotch: A.openai + .3, lime: true, label: false });
      txt(ctx, 'PENGGARIS 1', -380, -230, t, A.p1 + .1, MN(24), { ls: 6, col: ivo(.7) });
      fall(ctx, 'OPENAI', -390, 20, t, A.openai - .1, DSP(270), { ls: 4 });
      txt(ctx, 'pembuat ChatGPT', -380, 120, t, A.chatgpt - .15, SRF(66));
    }, layers: [{ dz: 1000, dx: 900, fn: (ctx, t) => rackGhost(ctx, t, 0, .5) }] },

    { at: A.pekerjaan - .1, via: 'push', name: 'Ukuran: pekerjaan', draw(ctx, t) {         // S6 · the yardstick is jobs
      txt(ctx, 'UKURAN:', -820, -250, t, A.pekerjaan, MN(36), { ls: 10 });
      markLine(ctx, '', 'PEKERJAAN', '', -820, -10, t, A.pekerjaan, A.pekerjaan + .2, DSP(250), { align: 'left', ls: 4 });
      typeOn(ctx, 'YANG MENGHASILKAN UANG', -820, 104, t, A.yang, MN(40), { ls: 4, cps: 24 });
      diukur(ctx, -820, 140, 640, t, A.uang + .25, 'vendor');
      stack(ctx, 570, 228, 9, t, A.uang - .2, { rx: 112, th: 22, step: .06 });
      const L = springSp(t, A.pekerjaan, 900, 1520, .45, .55);
      ctx.save(); ctx.translate(-820, 262); ctx.rotate(Math.PI / 2); akrilik(ctx, 0, 0, L, { lit: .6, every: 1000, engrave: 'OPENAI · CHARTER', w: 112, sheen: inv(A.pekerjaan, A.pekerjaan + .8, t) }); ctx.restore();
      srcTag(ctx, 'Sumber: OpenAI Charter', -840, 448, t, A.pekerjaan + .5);
    } },

    { at: A.p2, via: 'whip', tag: 'DEEPMIND', name: 'Google DeepMind', draw(ctx, t) {        // S7 · ruler 2 + Levels of AGI paper
      satu(ctx, t, 1, { x: -860, yb: 360, sc: .85, tAct: A.deepmind, tNotch: A.deepmind + .3, lime: true, label: false });
      if (IM.dm) evid(ctx, IM.dm, 190, -70, 1180, t, A.google - .25, { crop: [0, .02, .66, .5], rot: -1.2, tab: 'ARXIV.ORG · 2311.02462', hl: [[.018, .24, .79, .08, A.tahun]] });
      fall(ctx, 'GOOGLE DEEPMIND', -400, 330, t, A.deepmind - .05, DSP(124), { ls: 3 });
      txt(ctx, '2023', 330, 330, t, A.tahun, DSP(124), { ls: 3, col: ivo(.45) });
      slab(ctx, 'PERINGKAT DI KELAS', 520, 296, t, A.peringkat, { size: 24 });
      srcTag(ctx, 'Sumber: Morris dkk., Google DeepMind, arXiv, 4 Nov 2023', -840, 448, t, A.google + .4);
    }, layers: [{ dz: 1000, dx: 900, fn: (ctx, t) => rackGhost(ctx, t, 1, .45) }] },

    { at: A.lebih - .2, via: 'rise', name: 'Levels of AGI', draw(ctx, t) { levels(ctx, t, A.lebih - .2); } },   // S8 ★ stair scale

    { at: A.p3, via: 'whip', tag: 'CHOLLET', name: 'Chollet', draw(ctx, t) {                // S9 · ruler 3
      satu(ctx, t, 2, { x: -860, yb: 400, sc: 1.1, tAct: A.chollet, tNotch: A.chollet + .3, lime: true, label: false });
      txt(ctx, 'PENGGARIS 3', -560, -300, t, A.p3 + .1, MN(24), { ls: 6, col: ivo(.7) });
      fall(ctx, 'FRANÇOIS CHOLLET', -560, -120, t, A.chollet - .1, DSP(150), { ls: 3 });
      txt(ctx, 'peneliti yang merancang ujian', -560, -30, t, A.chollet + .7, SRF(56));
      slab(ctx, 'ARC', -560, 70, t, A.arc - .1, { size: 40, ls: 8 });
      [[-300, 160, 3], [180, 160, 7], [-60, 330, 11]].forEach(([x, y, sd], i) => arcGrid(ctx, x + 60, y - 30, 110, sd, kq(t, A.arc + .1 + i * .14, .45)));
    }, layers: [{ dz: 1000, dx: 900, fn: (ctx, t) => rackGhost(ctx, t, 2, .45) }] },

    { at: A.menurut, via: 'push', name: 'Cepat belajar', draw(ctx, t) {                    // S10 · kinetic type
      txt(ctx, 'menurut beliau, cerdas itu…', -820, -300, t, A.menurut - .05, SRF(76));
      satu(ctx, t, 2, { x: 560, yb: 420, sc: 1.05, tIn: A.menurut + .15, tAct: A.belajar, tNotch: A.menurut + .5, lime: true, label: false });
      const dimA = 1 - .55 * E.outCubic(inv(A.tapi + .3, A.tapi + .7, t));
      ctx.globalAlpha = dimA; const w = fall(ctx, 'BUKAN BANYAKNYA TAHU,', -820, -110, t, A.bukan - .05, DSP(170), { ls: 3 }); ctx.globalAlpha = 1;
      if (w) strike(ctx, -820, -820 + w, -110, 170, t, A.tapi, INK());
      markLine(ctx, 'TAPI CEPATNYA ', 'BELAJAR', '', -820, 100, t, A.tapi, A.belajar, DSP(170), { align: 'left', ls: 3 });
      txt(ctx, 'hal baru.', -820, 200, t, A.baru - .1, SRF(56), { col: ivo(.75) });
      srcTag(ctx, 'Sumber: Chollet, "On the Measure of Intelligence", arXiv, 5 Nov 2019', -840, 448, t, A.menurut + .6);
    }, layers: [{ dz: 1000, dx: -900, fn: (ctx, t) => rackGhost(ctx, t, 2, .35) }] },

    { at: A.bayangkan, via: 'truck', name: 'Dua murid', draw(ctx, t) {                      // S11 · two students (illustration)
      const dimA = 1 - .5 * E.outCubic(inv(A.cerdas2, A.cerdas2 + .4, t));
      ctx.fillStyle = INK(); setFont(ctx, MN(18), 5); const ki = kq(t, A.bayangkan + .1, .4);
      ctx.globalAlpha = ki; ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.strokeRect(-862, -478, 150, 36); ctx.fillText('ILUSTRASI', -848, -453); ctx.globalAlpha = 1;
      const kA = pop(t, A.satu - .2), kB = pop(t, A.satunya - .2);
      if (kA > 0) { ctx.save(); ctx.translate(0, (1 - Math.min(kA, 1)) * 60); robot(ctx, -560, 400, 500, false, clamp(kA * 2) * dimA); ctx.restore(); }
      if (kB > 0) { ctx.save(); ctx.translate(0, (1 - Math.min(kB, 1)) * 60); robot(ctx, 330, 400, 500, true, clamp(kB * 2)); ctx.restore(); }
      ctx.globalAlpha = dimA; books(ctx, -240, 400, 16, t, A.hafal2 - .1);
      txt(ctx, 'BANK SOAL', -330, -32, t, A.soal, MN(22), { ls: 5 });
      txt(ctx, 'MURID A', -620, 456, t, A.satu, MN(20), { ls: 5, col: ivo(.75) }); ctx.globalAlpha = 1;
      txt(ctx, 'MURID B', 270, 456, t, A.satunya, MN(20), { ls: 5, col: ivo(.75) });
      [[570, -230], [730, -230], [570, -70]].forEach(([x, y], j) => pcard(ctx, x, y, 130, j, Math.min(pop(t, A.tiga - .1 + j * .16), 1.1)));
      const k4 = Math.min(pop(t, A.tiga + .55), 1.1), solved = t > A.paham;
      pcard(ctx, 730, -70, 130, 3, k4 * (solved ? 1 + .08 * Math.exp(-(t - A.paham) * 7) : 1), { q: !solved, hot: solved });
      txt(ctx, '3 CONTOH', 500, -330, t, A.tiga + .1, MN(22), { ls: 5 });
      if (t > A.paham) { const kb = Math.min(pop(t, A.paham), 1.15); ctx.save(); ctx.translate(470, -200); ctx.scale(kb, kb); ctx.strokeStyle = INK(); ctx.lineWidth = 4; bulb(ctx, 34); ctx.restore(); }
      check(ctx, 330, -170, 46, t, A.cerdas2);
    }, mod(c, t) { const k = E.inOutCubic(inv(A.menurut2 - .2, A.menurut2 + .5, t)); c.tx += 260 * k; c.dist -= 170 * k; } },

    { at: A.p4, via: 'whip', tag: 'HENDRYCKS', name: 'Hendrycks', draw(ctx, t) {            // S12 · ruler 4 + A Definition of AGI
      satu(ctx, t, 3, { x: -860, yb: 360, sc: .85, tAct: A.hendrycks + .2, tNotch: A.hendrycks + .5, lime: true, label: false });
      if (IM.hd) evid(ctx, IM.hd, 190, -80, 1180, t, A.hendrycks - .45, { crop: [0, .02, .66, .5], rot: 1.1, tab: 'ARXIV.ORG · 2510.18212', hl: [[.018, .24, .24, .08, A.hendrycks + .1]] });
      fall(ctx, 'HENDRYCKS DKK.', -400, 316, t, A.hendrycks, DSP(116), { ls: 3 });
      slab(ctx, 'BERSAMA 33 PENELITI', 300, 284, t, A.n33, { size: 24 });
      txt(ctx, 'OKTOBER 2025', -400, 378, t, A.oktober, MN(28), { ls: 6, col: ivo(.75) });
      srcTag(ctx, 'Sumber: Hendrycks dkk., arXiv, 21 Okt 2025', -840, 448, t, A.hendrycks + .3);
    }, layers: [{ dz: 1000, dx: 900, fn: (ctx, t) => rackGhost(ctx, t, 3, .45) }] },

    { at: A.patokan, via: 'rise', name: 'Sepuluh kemampuan', draw(ctx, t) {                // S13 · ten abilities, bent ruler
      ring(ctx, t, -260, 10);
      txt(ctx, 'PATOKAN', -260, -78, t, A.patokan + .1, MN(20), { ls: 6, align: 'center', col: ivo(.6) });
      txt(ctx, 'ORANG DEWASA', -260, -28, t, A.dewasa - .2, MN(26), { ls: 3, align: 'center' });
      txt(ctx, 'BERPENDIDIKAN BAIK', -260, 8, t, A.dewasa + .2, MN(20), { ls: 2, align: 'center' });
      txt(ctx, '= 100%', -260, 100, t, A.dewasa + .5, DSP(96), { ls: 2, align: 'center' });
      fall(ctx, '10', 390, 80, t, A.sepuluh - .1, DSP(330), { ls: 2 });
      txt(ctx, 'KEMAMPUAN', 392, 150, t, A.sepuluh + .2, MN(30), { ls: 6 });
      txt(ctx, 'BERPIKIR', 392, 194, t, A.sepuluh + .3, MN(30), { ls: 6 });
      txt(ctx, 'dari pengetahuan umum', 392, 290, t, A.pengetahuan - .1, SRF(44));
      txt(ctx, 'sampai daya ingat', 392, 346, t, A.daya - .1, SRF(44));
      srcTag(ctx, 'Sumber: Hendrycks dkk., arXiv, 21 Okt 2025', -840, 448, t, A.patokan + .5);
    } },

    { at: A.hasilnya, via: 'push', name: '27 → 57', draw(ctx, t) {                        // S14 · GPT-4 27 % → GPT-5 57 %
      if (IM.graf) { const f0 = addF(ctx, 'saturate(.25)'); evid(ctx, IM.graf, -330, -40, 1000, t, A.gpt4 - .35, { dark: true, rot: -1, tab: 'GRAFIK · DIOLAH' }); ctx.filter = f0; }
      const L = 720, yb = 380, v = t < A.n27 ? 0 : t < A.n57 ? springSp(t, A.n27, 0, 27) : springSp(t, A.n57, 27, 57);
      ctx.globalAlpha = kq(t, A.hasilnya, .5); gauge(ctx, 400, yb, L, v, { engrave: 'A DEFINITION OF AGI · %', w: 108, sheen: inv(A.n57, A.n57 + .8, t) }); ctx.globalAlpha = 1;
      const y27 = yb - .27 * L, y57 = yb - .57 * L;
      txt(ctx, '27%', 560, y27 + 34, t, A.n27, DSP(110), { ls: 2 }); txt(ctx, 'GPT-4 · 2023', 562, y27 + 74, t, A.n27 + .15, MN(21), { ls: 3, col: ivo(.75) });
      txt(ctx, '57%', 560, y57 + 44, t, A.n57, DSP(140), { ls: 2 }); txt(ctx, 'GPT-5 · 2025', 562, y57 + 86, t, A.n57 + .15, MN(21), { ls: 3, col: ivo(.75) });
      const kb = E.outCubic(inv(A.dua + .2, A.dua + .7, t));
      if (kb > 0) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(530, y27); ctx.lineTo(530 + 0, lerp(y27, y57, kb)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(520, y27); ctx.lineTo(540, y27); ctx.moveTo(520, lerp(y27, y57, kb)); ctx.lineTo(540, lerp(y27, y57, kb)); ctx.stroke(); }
      slab(ctx, 'NAIK ± 2× DALAM 2 TAHUN', -830, 330, t, A.dua, { size: 26 });
      srcTag(ctx, 'Sumber: Hendrycks dkk., arXiv, Okt 2025 · grafik diolah', -840, 448, t, A.gpt4);
    } },

    { at: A.tapi2 - .1, via: 'whip', name: 'Remedial', draw(ctx, t) {                    // S15 · report card (analogy)
      txt(ctx, 'tapi kalau di rapor sekolah…', -560, -386, t, A.tapi2 + .05, SRF(56));
      const k = kq(t, A.tapi2, .5); if (k <= 0) return;
      ctx.save(); ctx.translate(0, 20 + (1 - k) * 90); ctx.rotate((-1.6 + (1 - k) * 4) * Math.PI / 180); ctx.globalAlpha = k;
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-548, -296, 1120, 610);
      ctx.fillStyle = CARD(); ctx.fillRect(-560, -310, 1120, 610);
      setFont(ctx, MN(24), 6); ctx.fillStyle = K.CARD_INK; ctx.fillText('RAPOR · NILAI AGI', -500, -236);
      ctx.strokeStyle = 'rgba(241,239,230,.5)'; ctx.lineWidth = 2; ctx.strokeRect(330, -266, 170, 40); setFont(ctx, MN(18), 5); ctx.fillText('ANALOGI', 352, -239);
      ctx.fillStyle = 'rgba(241,239,230,.25)'; ctx.fillRect(-500, -200, 1000, 2);
      [['GPT-4 (2023)', '27', -70, A.rapor + .1], ['GPT-5 (2025)', '57', 140, A.nilai]].forEach(([m, n, y, t0]) => { const kr = kq(t, t0, .4); if (kr <= 0) return;
        ctx.globalAlpha = k * kr; setFont(ctx, SRF(60)); ctx.fillStyle = K.CARD_INK; ctx.fillText(m, -500, y);
        setFont(ctx, DSP(150), 2); ctx.textAlign = 'right'; ctx.fillText(n, 480, y + 20); ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(241,239,230,.18)'; ctx.fillRect(-500, y + 50, 1000, 2); });
      ctx.restore(); ctx.globalAlpha = 1;
      stamp(ctx, 'REMEDIAL', 210, 150, t, A.remedial, { size: 120, rot: -11 });
      srcTag(ctx, 'Skor: Hendrycks dkk., arXiv, Okt 2025 · rapor = analogi', -840, 448, t, A.rapor);
    } },

    { at: A.empat2, via: 'truck', name: 'Pakai penggaris yang mana?', draw(ctx, t) {    // S16 · four rulers, four answers
      [-820, -500, -180, 140].forEach((x, i) => { const top = satu(ctx, t, i, { x, yb: 300, sc: .7, tIn: A.empat2 - .1 + i * .1, tNotch: A.empat2 + .5 + i * .1,
        ans: true, tAns: A.jawaban + i * .15, lsz: 17 });
        const kq2 = Math.min(pop(t, A.mana2 + i * .08), 1.15); if (kq2 > 0 && top != null) { ctx.save(); ctx.translate(x + 59, top - 30); ctx.scale(kq2, kq2);
          setFont(ctx, DSP(110)); ctx.textAlign = 'center'; ctx.fillStyle = INK(); ctx.fillText('?', 0, 0); ctx.textAlign = 'left'; ctx.restore(); } });
      slab(ctx, '"AGI SUDAH TIBA"', 380, -210, t, A.tiba - .2, { size: 30 });
      txt(ctx, 'benarkah?', 380, -80, t, A.benarkah - .1, SRF(66));
      strike(ctx, 380, 650, -80, 66, t, A.tapi3);
      txt(ctx, 'pakai penggaris', 380, 40, t, A.pakai - .1, SRF(60));
      markLine(ctx, 'yang ', 'mana', ' nih?', 380, 130, t, A.pakai + .3, A.mana2, SRF(74), { align: 'left' });
    } },

    { at: A.lagipula, via: 'rise', name: 'Lagipula', bg: 1, draw(ctx, t) {                // S17 · archive photo (full-bleed bg), the old belief
      txt(ctx, 'ARSIP · ENIAC', -840, -330, t, A.lagipula + .2, MN(22), { ls: 6, col: ivo(.8) });
      txt(ctx, 'ini bukan pertama kalinya', -840, 120, t, A.pertama - .3, SRF(72));
      txt(ctx, 'manusia yakin…', -840, 210, t, A.pertama + .2, SRF(72));
      markLine(ctx, 'anak ', 'TANGGA', ' terakhir sudah dekat.', -840, 330, t, A.tangga2 - .5, A.tangga2, SRF(80), { align: 'left' });
      txt(ctx, 'Foto: Unidentified U.S. Army photographer via Wikimedia Commons (domain publik)', -840, 448, t, A.lagipula + .4, MN(15), { ls: 1, col: ivo(.7) });
    } },
  ];
  // stairs backbone: station i stands on landing i (y = −520·i); the world is pushed once, by the current station
  // full-bleed documentary backgrounds (Ikhsan 17-11: foto/klip jangan "dikotakin" → jadi latar video). Screen-space cover-crop,
  // grade + scrim + grain, slow push/pan; sorted just behind the current station plane (in front of the stairs), so type sits on it.
  const BGW = [
    { at: A.atau, out: A.para, get: () => IM.night, speed: 1.2, grade: 'saturate(.5) contrast(1.15) brightness(.52)', pan: [-60, 24] },
    { at: A.lagipula, out: 1e9, get: () => IM.eniac && still(IM.eniac), grade: 'grayscale(1) contrast(1.25) brightness(.5) blur(1px)', pan: [70, -18] },
  ];
  const bgK = (b, t) => E.inOutCubic(inv(b.at - .35, b.at + .12, t)) * (1 - E.inOutCubic(inv(b.out - .4, b.out + .05, t)));
  const bgA = t => Math.max(0, ...BGW.map(b => bgK(b, t)));
  function bgDraw(ctx, t) {
    for (const b of BGW) { const a = bgK(b, t), V = a > 0 && b.get(); if (!V) continue;
      const lt = Math.max(0, t - b.at + .35), n = V.n, per = Math.max(1, 2 * (n - 1)), m = Math.floor(lt * V.fps * (b.speed || 1)) % per, im = V.img[m < n ? m : per - m];
      const k = E.outSine ? E.outSine(clamp(lt / 9)) : clamp(lt / 9), s = Math.max(W / im.width, H / im.height) * (1.07 + .09 * k);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.filter = b.grade;
      ctx.drawImage(im, W / 2 - im.width * s / 2 + b.pan[0] * k, H / 2 - im.height * s / 2 + b.pan[1] * k, im.width * s, im.height * s); ctx.filter = 'none';
      const g = ctx.createRadialGradient(W / 2, H / 2, H * .25, W / 2, H / 2, H * 1.0); g.addColorStop(0, 'rgba(11,12,9,.1)'); g.addColorStop(1, 'rgba(11,12,9,.72)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const lg = ctx.createLinearGradient(0, 0, W * .7, 0); lg.addColorStop(0, 'rgba(11,12,9,.55)'); lg.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);   // type scrim (left)
      grainRect(ctx, 0, 0, W, H, t, .26); ctx.globalAlpha = 1; }
  }
  ST.forEach((s, j) => {
    s.py = -520 * j - 560;
    s.world = (ctx, t, pr, foc, items, c) => { if (j !== c.i) return; const a = bgA(t);
      if (a < 1) stairsT(ctx, t, pr, items, STEPS, undefined, { zPlane: s.z, xPlane: s.x || 0 });
      if (a > 0) items.push({ d: pr(s.x || 0, -500, s.z).z + 1, f: () => bgDraw(ctx, t) }); };
    if (s.bg != null) { const d0 = s.draw; s.draw = (ctx, t, c) => { theme(false); try { d0(ctx, t, c); } finally { theme(true); } }; }   // ivory type on the photo
  });
  const S8 = ST[8];
  S8.cam = keyCam(S8, [[A.lebih - .5, -80, 0, 1560, 3], [A.separuh - .1, -300, -110, 1330, 2], [A.competent - .25, -400, 150, 1200, -2],
    [A.lebih2 - .1, -60, -110, 1200, 1], [A.kalah - .1, 200, -170, 1300, -1], [A.diatas - .1, 120, -200, 1500, 2], [A.superhuman + .5, 0, 0, 1660, -2]]);

  let FULLS;
  const CH = makeChapter({ B, ST, load, gate: true, label: 'BAB 1 · SETARA MANUSIA YANG MANA?', full: () => FULLS ??= [
    { im: IM.charter, t0: A.di - .15, t1: A.pekerjaan + .55, dir: 1, dark: true, crop: [.2, .15, .6, .7], tab: 'OPENAI.COM · CHARTER',
      hl: [[.227, .844, .655, .049, A.mandiri - .4], [.112, .896, .135, .049, A.pekerjaan - .6]] },
  ] });
  const post0 = CH.post; CH.post = (o, t) => { const dk = bgA(t) > .5; if (dk) theme(false); try { post0(o, t); } finally { if (dk) theme(true); } };
  return CH;
}
