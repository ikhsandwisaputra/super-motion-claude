// bab-1 helpers (dunia terang · lab ukur gading). Kit tidak diubah; semua di sini.
//  - stairsT : agi.stairs() dipakai apa adanya lewat proxy ctx yang memetakan warna gelap kit (BGC/STEP/TREAD) ke dunia terang
//              (pijakan lebih terang dari latar, muka anak tangga lebih gelap; bibir tetap ivo() = tinta tema).
//  - akrilik : penggaris kaca-akrilik berdiri (tebal, bayangan, kilau sapu) — garis ukurnya agi.ruler() yang diputar −90°.
//  - tangga  : anak tangga "AGI" kecil yang menempel di penggaris pada tinggi f (lime = penggaris aktif, jarum agi.needle()).
//  - rak     : empat penggaris berjajar (OpenAI, DeepMind, Chollet, Hendrycks), panjang beda, tiap tangga AGI di tinggi beda.
import { clamp, inv, lerp, E } from './engine.js';
import { ivo, setFont, MN, SRF, DSP, LIME, LIME_INK, INK, INKRGB, BGRGB } from './kit.js';
import { stairs, ruler, needle, springSp } from './agi.js';

const mixC = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * clamp(k))).join(',')})`;
const BGL = [231, 228, 216], TREAD_L = [249, 247, 240], RISER_L = [192, 188, 174];

/** agi.stairs() in the light world: same geometry/fog/lips, colours remapped per item (first fill = tread, gradient = riser). */
export function stairsT(ctx, t, pr, items, S, lit, o) {
  let n = 0;
  const P = new Proxy(ctx, {
    get(c, k) {
      if (k === 'setTransform') return (...a) => { n = 0; c.setTransform(...a); };
      if (k === 'createLinearGradient') return (...a) => { const g = c.createLinearGradient(...a), add = g.addColorStop.bind(g);
        g.addColorStop = (p, col) => { const m = /^rgb\((\d+),(\d+),(\d+)\)$/.exec(col); add(p, m ? mixC(BGL, RISER_L, (+m[2] - 12) / 19) : col); }; return g; };
      const v = c[k]; return typeof v === 'function' ? v.bind(c) : v;
    },
    set(c, k, v) {
      if (k === 'fillStyle' && typeof v === 'string') { const m = /^rgb\((\d+),(\d+),(\d+)\)$/.exec(v); if (m) { v = n === 0 ? mixC(BGL, TREAD_L, (+m[2] - 12) / 27) : v; n++; } }
      c[k] = v; return true;
    },
  });
  // o.zPlane: the station plane z — stair items nearer than the plane are re-sorted just behind it, so the station's text/evidence
  // is never cut by the front lip of its own landing (kit sorts the landing by its front edge, 730 px in front of the plane).
  const dp = o.zPlane == null ? null : pr(o.xPlane || 0, -500, o.zPlane).z + 2;
  stairs(P, t, pr, dp == null ? items : { push: it => { if (it.d < dp) it.d = dp; items.push(it); } }, S, lit, o);
}

/** Vertical acrylic ruler standing on (x, yb) (x = left edge), length L px (scale 0..100). o: lit 0..1, sheen 0..1 (sweep), every, engrave, w. */
export function akrilik(ctx, x, yb, L, o = {}) {
  if (L < 6) return; const w = o.w ?? 118, lit = o.lit ?? 0, sp = L / 100;
  ctx.save(); ctx.translate(x, yb);
  ctx.fillStyle = `rgba(${INKRGB},${.07 + .03 * lit})`; ctx.beginPath(); ctx.roundRect(22, -L - 22, w + 8, L + 58, 18); ctx.fill();   // cast shadow on the wall
  ctx.fillStyle = `rgba(120,138,122,${.22 + .18 * lit})`; ctx.beginPath(); ctx.roundRect(w - 6, -L - 28, 16, L + 60, 6); ctx.fill();   // acrylic edge thickness
  const g = ctx.createLinearGradient(0, 0, w, 0);
  g.addColorStop(0, `rgba(255,255,255,${.5 + .35 * lit})`); g.addColorStop(.55, `rgba(248,251,244,${.3 + .3 * lit})`); g.addColorStop(1, `rgba(214,222,210,${.5 + .3 * lit})`);
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(0, -L - 34, w, L + 68, 14); ctx.fill();
  ctx.strokeStyle = ivo(.22 + .5 * lit); ctx.lineWidth = 2 + 1.5 * lit; ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(7, -L - 20); ctx.lineTo(7, 22); ctx.stroke();   // polished edge
  const sh = o.sheen ?? -1;
  if (sh > 0 && sh < 1) { const yy = lerp(60, -L - 80, E.inOutCubic(sh)), s = ctx.createLinearGradient(0, yy - 110, 0, yy + 110);
    s.addColorStop(0, 'rgba(255,255,255,0)'); s.addColorStop(.5, 'rgba(255,255,255,.85)'); s.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.save(); ctx.beginPath(); ctx.roundRect(0, -L - 34, w, L + 68, 14); ctx.clip(); ctx.fillStyle = s; ctx.fillRect(0, yy - 110, w, 220); ctx.restore(); }
  ctx.rotate(-Math.PI / 2); ruler(ctx, 0, 0, sp, { max: 100, every: o.every ?? 1000, h: w, label: o.engrave, alpha: .5 + .5 * lit });
  ctx.restore();
}

/** The AGI step on a ruler: a small 3D tread sticking out right of the ruler at height f (0..1), springing out at t0. */
export function tangga(ctx, x, yb, L, f, t, t0, o = {}) {
  const s = t0 == null ? 1 : clamp(spring1(t - t0)); if (s <= 0) return;
  const w = o.w ?? 118, y = yb - f * L, len = 150 * s, lime = o.lime, a0 = ctx.globalAlpha;
  ctx.save(); ctx.translate(x + w + 6, y);
  ctx.fillStyle = lime ? LIME : `rgba(${INKRGB},.14)`;                          // tread top (seen from above)
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len, 0); ctx.lineTo(len + 26 * s, -20); ctx.lineTo(18, -20); ctx.closePath(); ctx.fill();
  ctx.fillStyle = lime ? '#9DBF2C' : `rgba(${INKRGB},.32)`; ctx.fillRect(0, 0, len, 30);   // riser face
  ctx.fillStyle = lime ? LIME_INK : `rgba(${INKRGB},.8)`; ctx.fillRect(0, -1, len, 3);
  if (s > .7) { ctx.globalAlpha = a0 * clamp((s - .7) / .3); setFont(ctx, MN(17), 4); ctx.fillStyle = lime ? LIME_INK : `rgba(${BGRGB},.95)`; ctx.fillText('AGI', 14, 22); }
  ctx.restore(); ctx.globalAlpha = a0;
  if (lime) { ctx.save(); ctx.translate(x, yb); ctx.rotate(-Math.PI / 2); needle(ctx, f * L, -16, w + 22, clamp(s)); ctx.restore(); }
  else { ctx.fillStyle = ivo(.55); ctx.fillRect(x - 10, y - 1.5, w + 16, 3); }
}
const spring1 = s => s <= 0 ? 0 : 1 - Math.exp(-.5 * 13 * s) * Math.cos(13 * .86 * s);   // ζ≈.5 snap-out with small overshoot

// the four rulers of the chapter (lengths deliberately different; f = where each puts the AGI step)
export const RUL = [
  { name: 'OPENAI', sub: 'pembuat ChatGPT', L: 720, f: .84, every: 1000, engrave: 'OPENAI · CHARTER', ans: 'pekerjaan' },
  { name: 'GOOGLE DEEPMIND', sub: '2023', L: 860, f: .5, every: 10, engrave: 'LEVELS OF AGI · PERSENTIL', ans: 'peringkat' },
  { name: 'F. CHOLLET', sub: 'perancang ARC', L: 520, f: .32, every: 1000, engrave: 'CEPAT BELAJAR', ans: 'cepat belajar' },
  { name: 'HENDRYCKS DKK.', sub: 'Okt 2025', L: 660, f: 1, every: 10, engrave: 'A DEFINITION OF AGI · %', ans: '10 kemampuan' },
];

/** Draw one ruler of RUL (index i) with rise/act/notch timing. o: { x, yb, sc, tIn, tAct, tNotch, lime, lit, dim, label, ans, tAns } */
export function satu(ctx, t, i, o) {
  const R = RUL[i], sc = o.sc ?? 1, a0 = ctx.globalAlpha;
  let L = R.L * sc;
  if (o.tIn != null) { if (t < o.tIn) return; L = springSp(t, o.tIn, L * .06, L, .5, .6); }
  if (o.tAct != null && t > o.tAct) L = springSp(t, o.tAct, L * .9, L, .3, .5);              // elastic kick when the VO names it
  const lit = o.lit ?? (o.tAct != null ? E.outCubic(inv(o.tAct, o.tAct + .3, t)) : 0);
  ctx.globalAlpha = a0 * (o.dim ?? 1) * (o.tIn != null ? clamp((t - o.tIn) / .12) : 1);
  akrilik(ctx, o.x, o.yb, L, { lit, sheen: o.tAct != null ? inv(o.tAct, o.tAct + .7, t) : -1, every: R.every, engrave: R.engrave });
  if (o.tNotch !== undefined) tangga(ctx, o.x, o.yb, L, R.f, t, o.tNotch, { lime: o.lime });
  if (o.label !== false) {
    const cx = o.x + 59, ka = o.tIn != null ? E.outQuint(inv(o.tIn + .1, o.tIn + .5, t)) : 1;
    ctx.globalAlpha = a0 * (o.dim ?? 1) * ka; setFont(ctx, MN(o.lsz ?? 21), 3); ctx.textAlign = 'center'; ctx.fillStyle = INK; ctx.fillText(R.name, cx, o.labelTop ? o.yb - L - 58 : o.yb + 76);
    if (o.ans && !o.labelTop && t > o.tAns) { ctx.globalAlpha = a0 * (o.dim ?? 1) * E.outQuint(inv(o.tAns, o.tAns + .4, t)); setFont(ctx, SRF(34), 0); ctx.fillText(R.ans, cx, o.yb + 122 + 20 * (1 - E.outQuint(inv(o.tAns, o.tAns + .4, t)))); }
    ctx.textAlign = 'left';
  }
  ctx.globalAlpha = a0;
  return o.yb - L - 34;                                                                       // top of the ruler body
}
export { DSP };
