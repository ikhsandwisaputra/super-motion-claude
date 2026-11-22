// Bab 4 · Dari Nvidia ke dompet kita (VO abd_vo_ahmad_07, 336.4 s). Spine = PETA JALUR: one route line NVIDIA → ①②③④ → DOMPET KITA,
// each jalur opens on it. New techniques — EMBUN BEKU (frost dendrites grow in from the screen edges while the promo coupons freeze
// mid-fall, callback on "kedinginan"), LABEL AYUN (Ahpo's A03 price tag swings on a spring at 7 % and 45 %), REL ORDERAN (kitchen
// ticket rail, the big order jumps the queue) and STRUK TERMAL (the receipt feeds down line by line). Garis Retak carries over.
// Jalur 1 RAM · Jalur 2 IHSG (KSSK board, Kompas full, Papan Tersangka reflip) · Jalur 3 pusat data (Jakarta Globe full) ·
// Jalur 4 startup (Bisnis full). Numbers only from Ahri's sourced facts; derived/illustrative visuals are labelled.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DISP, SER, MONO, rnd, D2R, timing, makeChapter,
  loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, fmt, gone, mk } from './kit.js';
import { kq, pop, popAt, doc, stamp, coin, stack, slot } from './draw.js';
import { bubble, bubblePop, pumped, wobble } from './gelembung.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const INK = '#1D1E18', TILE = '#191A15';
const still = im => ({ n: 2, fps: 1, img: [im, im] });

// ── Garis Retak (from Bab 3) ──────────────────────────────────────────────────────────────────────────────────
const part = (ctx, pts, vis, dx = 0, dy = 0) => { ctx.moveTo(pts[0][0] + dx, pts[0][1] + dy); for (let i = 1; i < pts.length; i++) { const p = pts[i], q = pts[i - 1];
  if (p[2] <= vis) { ctx.lineTo(p[0] + dx, p[1] + dy); continue; } const u = (vis - q[2]) / (p[2] - q[2]); ctx.lineTo(lerp(q[0], p[0], u) + dx, lerp(q[1], p[1], u) + dy); break; } };
const ptAt = (pts, vis) => { for (let i = 1; i < pts.length; i++) if (pts[i][2] >= vis) { const p = pts[i], q = pts[i - 1], u = (vis - q[2]) / ((p[2] - q[2]) || 1); return [lerp(q[0], p[0], u), lerp(q[1], p[1], u)]; }
  const l = pts[pts.length - 1]; return [l[0], l[1]]; };
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
  path(0, 0); ctx.strokeStyle = `rgba(241,239,230,${.07 * (o.glow ?? 1)})`; ctx.lineWidth = 16 * w; ctx.stroke();
  path(1.6 * w, 2.2 * w); ctx.strokeStyle = 'rgba(0,0,0,.62)'; ctx.lineWidth = 5.5 * w; ctx.stroke();
  path(0, 0); ctx.strokeStyle = 'rgba(241,239,230,.93)'; ctx.lineWidth = 2.3 * w; ctx.stroke();
  if (o.head && vis < C.L) { const [hx, hy] = ptAt(C.P, vis), g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 34 * w);
    g.addColorStop(0, 'rgba(255,255,255,.85)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(hx - 34 * w, hy - 34 * w, 68 * w, 68 * w); }
}
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

const K0 = crackLine([[-940, 30], [-560, -6], [-250, 60], [60, 0], [380, 80], [940, 40]], 11, { jag: 16, br: [2, 3, 4] });
const K16 = crackLine([[-880, -170], [-760, -190], [-640, -150], [-520, -200], [-400, -175], [-330, 150], [-80, 200]], 161, { jag: 8, step: 24, br: [4, 5] });
const K19 = crackLine([[-880, -170], [-640, -140], [-430, -70], [-210, -20], [0, 50], [210, 80], [430, 160], [640, 200], [880, 250]], 191, { jag: 10, br: [2, 4, 6] });
const K23 = crackLine([[-860, -220], [-640, -200], [-470, -245], [-330, -215], [-250, 10], [-60, 50]], 231, { jag: 8, step: 24, br: [3, 4] });
const K27 = crackLine([[-940, -20], [-430, 30], [-80, -10], [200, 60], [600, 10], [940, 40]], 271, { jag: 18, br: [2, 3] });
const UP23 = [[20, 330], [170, 280], [300, 300], [440, 200], [580, 220], [720, 100], [870, 40]];

// ── Embun Beku: frost dendrites from the screen edges (screen space, drawn in over) ─────────────────────────────
let FROST = null;
function frostBuild() {
  const BIN = 24, bins = []; let sd = 7000;
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
  const N = 64, PER = 2 * (W + H);
  for (let i = 0; i < N; i++) {
    const p = (i + rnd(i * 3.3) * .8) / N * PER; let x, y, n, cn;
    if (p < W) { x = p; y = 0; n = Math.PI / 2; cn = 1 - Math.min(x, W - x) / (W / 2); }
    else if (p < W + H) { x = W; y = p - W; n = Math.PI; cn = 1 - Math.min(y, H - y) / (H / 2); }
    else if (p < 2 * W + H) { x = 2 * W + H - p; y = H; n = -Math.PI / 2; cn = 1 - Math.min(x, W - x) / (W / 2); }
    else { x = 0; y = PER - p; n = 0; cn = 1 - Math.min(y, H - y) / (H / 2); }
    grow(x, y, n + (rnd(i + 91) - .5) * 1.1, 90 + 330 * Math.pow(cn, 1.6) + rnd(i + 57) * 70, 0, 0);
  }
  return { bins, BIN };
}
function frost(o, F, a) {
  if (a <= .002 || F <= 0) return; FROST ??= frostBuild(); const a0 = o.globalAlpha;
  o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.filter = 'none'; o.globalCompositeOperation = 'source-over'; o.lineCap = 'round'; o.lineJoin = 'round';
  const D = 70 + F * .38, fog = (x0, y0, x1, y1, rx, ry, rw, rh) => { const g = o.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, ivo(.22 * a)); g.addColorStop(1, ivo(0)); o.fillStyle = g; o.fillRect(rx, ry, rw, rh); };
  fog(0, 0, 0, D, 0, 0, W, D); fog(0, H, 0, H - D, 0, H - D, W, D); fog(0, 0, D, 0, 0, 0, D, H); fog(W, 0, W - D, 0, W - D, 0, D, H);
  const nb = F / FROST.BIN; o.strokeStyle = IVORY;
  for (let b = 0; b < Math.min(Math.ceil(nb), FROST.bins.length); b++) { const bn = FROST.bins[b]; if (!bn) continue; const ea = a * clamp(nb - b);
    o.globalAlpha = a0 * ea * .13; o.lineWidth = 6; o.stroke(bn.a);
    o.globalAlpha = a0 * ea * .8; o.lineWidth = 1.8; o.stroke(bn.a);
    o.globalAlpha = a0 * ea * .55; o.lineWidth = 1; o.stroke(bn.b); }
  o.restore(); o.globalAlpha = a0;
}

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {}; let GRID = null;

  async function load() {
    const kb = '../assets/shared/kutipan/', hb = '../assets/shared/humanis/', vb = '../assets/shared/vid/', AB = '../assets/shared/ahpo/';
    const K = { dup: 'thedailyupside-from-ipads-to-xboxes-device-prices-soar', kompas: 'kompas-ihsg-menanjak-di-tengah-guncangan-sektor',
      jg: 'jakartaglobe-firmus-nvidia-lead-indonesia-s-ai-data', bis: 'teknologi-2-tahun-prabowo-gibran-pendanaan-startup',
      tr: 'techradar-memory-price-skyrockets-as-demand-for-ai', tf: 'trendforce-press-center', kdHP: 'katadata-harga-hp-naik-hingga-45-di-indonesia',
      cnbc: 'cnbcindonesia-pedagang-itc-takut-jualan-harga-ram', peri: 'periskop-gelembung-ai-mulai-retak-mengapa-bursa', cna: 'cna-bubble-ai-china-mulai-pecah-apa',
      china: 'teknologi-ai-bubble-di-china-disebut-pecah-rp8-700', mkt: 'market-daya-tahan-ihsg-kala-bubble-ai-konflik', fort: 'fortuneidn-bukan-indonesia-india-jadi-magnet',
      dan: 'cnnindonesia-danantara-minta-proyek-data-center-ai', tfin: 'techfinitive-the-infrastructure-nobody-wanted-is-the', kdPem: 'katadata-pemerintah-waspadai-ledakan-investasi-ai',
      kdKet: 'katadata-ketika-data-center-tumbuh-lebih-cepat', telkom: 'teknologi-telkom-pembangunan-data-center-neutradc', kdList: 'katadata-konsumsi-listrik-data-center-yang',
      kdInv: 'katadata-jumlah-investor-yang-berinvestasi-di' };
    const HU = { b11: 'B1/B1_1_konter-etalase-hp', b12: 'B1/B1_2_lorong-pusat-elektronik', b13: 'B1/B1_3_pedagang-hp-pasar', b21: 'B2/B2_1_tukar-dolar-loket',
      b22: 'B2/B2_2_booth-papan-kurs', b23: 'B2/B2_3_kalkulator-uang-struk', b24: 'B2/B2_4_perempuan-cek-struk', b31: 'B3/B3_1_teknisi-rak-server',
      b32: 'B3/B3_2_teknisi-kabel-rak', b33: 'B3/B3_3_tangan-pegang-ram', b34: 'B3/B3_4_tangan-board-memori' };
    const jobs = [
      ...Object.entries(K).map(async ([k, f]) => { IM[k] = await loadImg(kb + f + '.png', 1800); }),
      ...Object.entries(HU).map(async ([k, f]) => { V[k] = still(await loadImg(hb + f + '.jpg', 1400)); }),
      ...['hp_scroll', 'charger', 'grafik_turun', 'saham', 'kabel', 'poweredge', 'gel_beku', 'celengan'].map(async n => { V[n] = await loadVid(vb, n); }),
      (async () => { V.dimm = still(await loadImg('../assets/shared/cc/commons-dimms.jpg', 1200)); IM.dimm = V.dimm.img[0]; })(),
      (async () => { GRID = await (await fetch('../assets/shared/cc/peta-dunia-grid.json')).json(); })(),
    ];
    await Promise.all(jobs);
    const bmp = async f => createImageBitmap(await (await fetch(AB + f + '.png')).blob());
    const comp = async (dir, names) => { const [c, g] = mk(2000, 1125); g.imageSmoothingQuality = 'high'; for (const n of names) g.drawImage(await bmp(`${dir}/${dir}_${n}`), 0, 0, 2000, 1125); return c; };
    IM.ram = await comp('A02', ['02_MG_pantulan', '03_MG_bayangan-modul-ram', '04_MG_modul-ram-belakang', '05_MG_modul-ram-depan', '06_FG_bayangan-die', '07_FG_die-dram-plakat', '08_FG_kilau-kaca-die']);
    IM.hp = await comp('A03', ['02_MG_pantulan', '03_MG_bayangan-hp', '04_MG_hp-badan-dudukan', '05_MG_layar-kosong']);
    IM.hpTop = await comp('A03', ['06_MG_kilau-layar', '07_MG_kamera-depan']);
    IM.tag = await comp('A03', ['08_FG_tali-label', '09_FG_bayangan-label', '10_FG_label-harga-miring']);
    IM.rack = await comp('A01', ['02_BG_lorong-rak-belakang', '03_MG_pantulan-rak', '04_MG_bayangan-rak', '05_MG_rak-rangka-server', '08_MG_led-gading-aktivitas']);
    IM.ledA = await comp('A01', ['06_MG_led-lime-fase-a']); IM.ledB = await comp('A01', ['07_MG_led-lime-fase-b']); IM.cable = await comp('A01', ['09_FG_kabel-atas']);
    { const [bc, bg] = mk(2000, 1125); bg.imageSmoothingQuality = 'high';
      for (const f of ['02_MG_pantulan', '03_MG_bayangan-papan', '04_MG_papan-bingkai-kaki', '05_MG_kartu-1-kosong', '06_MG_kartu-2-kosong', '07_MG_kartu-3-kosong', '08_MG_lampu-baris']) {
        const bm = await bmp(`A04/A04_${f}`); bg.drawImage(bm, 0, 0, 2000, 1125);
        if (f.startsWith('05')) { const sx = bm.width / 2000, [tc, tg] = mk(255, 250); tg.drawImage(bm, 912 * sx, 600 * sx, 255 * sx, 250 * sx, 0, 0, 255, 250); IM.tile = tc; } }
      IM.board = bc; }
    { const bm = await bmp('A04/A04_09_FG_stempel-kosong'), sx = bm.width / 4000, [sc, sg] = mk(1146, 550); sg.drawImage(bm, 1877 * sx, 1005 * sx, 1146 * sx, 550 * sx, 0, 0, 1146, 550); IM.stamp = sc; }
  }

  // ── small helpers ───────────────────────────────────────────────────────────────────────────────────────────
  const withA = (ctx, a, fn) => { if (a <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * Math.min(1, a); fn(); ctx.globalAlpha = a0; };
  const tagR = (ctx, text, t, t0) => txt(ctx, text, 880, -440, t, t0, MN(18), { ls: 4, align: 'right', col: ivo(.55) });
  const credit = (ctx, text, t, t0, x = -860, y = 500) => txt(ctx, text, x, y, t, t0, MN(15), { ls: 2, col: ivo(.42) });
  const ap = (ctx, im, cx, cy, s) => ctx.drawImage(im, cx - 2000 * s, cy - 1125 * s, 4000 * s, 2250 * s);
  const AP = (cx, cy, s, px, py) => [cx + (px - 2000) * s, cy + (py - 1125) * s];
  const kick = (t, t0, amp, d = .55, f = 9) => t <= t0 ? 0 : amp * D2R * Math.exp(-(t - t0) / d) * Math.sin((t - t0) * f);
  function lines2(ctx, str, x, y, css, size, o = {}) {          // centred multi-line label (\n), returns nothing
    setFont(ctx, css, o.ls || 0); ctx.textAlign = 'center'; ctx.fillStyle = o.col || INK; const L = str.split('\n');
    L.forEach((s, i) => ctx.fillText(s, x, y + (i - (L.length - 1) / 2) * size * .92 + size * .34)); ctx.textAlign = 'left';
  }

  // ── Peta Jalur: the route line, one node lights per jalur ──────────────────────────────────────────────────────
  const RX = [-820, -490, -160, 170, 500, 820], RT = ['', 'MEMORI', 'IHSG', 'PUSAT DATA', 'STARTUP'];
  function route(ctx, t, t0, n, topic, tT, sub, tS, Vb) {
    const k = E.outCubic(inv(t0 - .15, t0 + .45, t)); if (k <= 0) return; const a0 = ctx.globalAlpha, y = -330;
    ctx.globalAlpha = a0 * k; ctx.lineCap = 'round';
    ctx.strokeStyle = ivo(.2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(RX[0], y); ctx.lineTo(RX[5], y); ctx.stroke();
    const u = E.inOutCubic(inv(t0, t0 + .9, t)), hx = lerp(RX[n - 1], RX[n], u);
    ctx.strokeStyle = ivo(.85); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(RX[0], y); ctx.lineTo(hx, y); ctx.stroke();
    RX.forEach((x, i) => {
      const end = i === 0 || i === 5;
      if (i === n && u >= 1) { const s = t - t0 - .9, pr = 26 + 10 * Math.sin(t * 6); ctx.strokeStyle = `rgba(200,245,60,${.45 * clamp(s / .3)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, pr, 0, 7); ctx.stroke();
        ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(x, y, 19 * Math.min(1.15, spring(s, .5, .3)), 0, 7); ctx.fill(); }
      else if (i < n || (i === 0)) { ctx.fillStyle = IVORY; ctx.beginPath(); end ? ctx.rect(x - 13, y - 13, 26, 26) : ctx.arc(x, y, 15, 0, 7); ctx.fill(); }
      else { ctx.fillStyle = '#0B0C09'; ctx.strokeStyle = ivo(.4); ctx.lineWidth = 3; ctx.beginPath(); end ? ctx.rect(x - 13, y - 13, 26, 26) : ctx.arc(x, y, 15, 0, 7); ctx.fill(); ctx.stroke(); }
      if (!end) { setFont(ctx, MN(17), 0); ctx.textAlign = 'center'; ctx.fillStyle = i === n && u >= 1 ? LIME_INK : i < n ? INK : ivo(.5); ctx.fillText(String(i), x, y + 6); }
      setFont(ctx, MN(17), 4); ctx.textAlign = 'center'; ctx.fillStyle = ivo(i <= n ? .7 : .3);
      if (end) ctx.fillText(i ? 'DOMPET KITA' : 'NVIDIA', x, y + 58); else if (i < n || (i === n && u >= 1)) ctx.fillText(RT[i], x, y + 58);
      ctx.textAlign = 'left';
    });
    if (u > 0 && u < 1) { const g = ctx.createRadialGradient(hx, y, 0, hx, y, 60); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(hx - 60, y - 60, 120, 120); }
    ctx.globalAlpha = a0;
    fall(ctx, 'JALUR ' + n, 0, -20, t, t0 + .25, DSP(210), { align: 'center' });
    typeOn(ctx, topic, 0, 70, t, tT, MN(34), { ls: 8, cps: 30, align: 'center' });
    if (sub) txt(ctx, sub, 0, 150, t, tS, SRF(50), { align: 'center', col: ivo(.88) });
    if (Vb) plate(ctx, Vb, t, 0, 365, 1720, 190, kq(t, tT, .6), { t0: tT, dim: .4 });
  }

  // ── Papan Tersangka (Ahpo A04) generalised: rows = [[time, word], …] so a board can reflip ──────────────────────
  const BS = .45, BFL = 380, TW = 254.67, ROWY = [725, 1045, 1365], FL = .065, CH = 'ABCDEFGHIJKLMNOPRSTUVWY0123456789?';
  const chr = k => CH[Math.floor(rnd(k) * CH.length)];
  function tileEvents(t0, row, r, i) {
    const ev = [[t0 + .05 + r * .08 + i * .03, t0 + .55 + r * .1 + i * .035, ' ']]; let prev = '';
    for (const [tw, word] of row) { if (i < Math.max(word.length, prev.length)) ev.push([tw - .32 + i * .015, tw - .05 + i * .045, word[i] || ' ']); prev = word; }
    return ev;
  }
  function tileState(ev, t, sd) {
    let j = -1; for (let q = 0; q < ev.length; q++) if (t >= ev[q][0]) j = q;
    if (j < 0) return { cur: ' ', prev: ' ', p: 1 };
    const [a, b, fin] = ev[j], n = Math.max(2, Math.round((b - a) / FL)), k = Math.floor((t - a) / FL), before = j ? ev[j - 1][2] : ' ';
    if (k >= n) return { cur: fin, prev: fin, p: 1 };
    return { cur: k === n - 1 ? fin : chr(sd + k), prev: k ? chr(sd + k - 1) : before, p: (t - a) / FL - k };
  }
  function face(ctx, c, x, y, w, h, half) {
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, half > 0 ? y : y - h / 2, w, half ? h / 2 : h); ctx.clip();
    ctx.drawImage(IM.tile, x - w / 2, y - h / 2, w, h);
    if (c !== ' ') { setFont(ctx, DSP(h * .78)); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(c, x, y + h * .28); ctx.textAlign = 'left'; }
    ctx.restore();
  }
  function flapTile(ctx, s, x, y, w, h) {
    if (s.p >= 1) { face(ctx, s.cur, x, y, w, h, 0); return; }
    face(ctx, s.cur, x, y, w, h, -1); face(ctx, s.prev, x, y, w, h, 1);
    ctx.save(); ctx.translate(x, y);
    if (s.p < .5) { ctx.scale(1, 1 - 2 * s.p); face(ctx, s.prev, 0, 0, w, h, -1); } else { ctx.scale(1, 2 * s.p - 1); face(ctx, s.cur, 0, 0, w, h, 1); }
    ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(x - w / 2, y - 1.5, w, 3);
  }
  function board(ctx, t, t0, title, ROWS, ox = 0) {
    const fa = clamp((t - t0 + .4) / .3); if (fa <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * fa;
    const L = (px, py) => [ox + (px - 2000) * BS, BFL + (py - 1890) * BS];
    const [bx, by] = L(0, 0); ctx.drawImage(IM.board, bx, by, 4000 * BS, 2250 * BS);
    const [hx, hy] = L(790, 470); typeOn(ctx, title, hx, hy, t, t0 + .35, MN(30), { ls: 5, cps: 24, col: LIME_INK });
    ROWS.forEach((row, r) => {
      for (let i = 0; i < 9; i++) { const [x, y] = L(912 + TW * (i + .5), ROWY[r]); flapTile(ctx, tileState(tileEvents(t0, row, r, i), t, r * 97 + i * 13 + row.length * 7), x, y, TW * BS - 2, 250 * BS - 2); }
      const on = row.length ? clamp((t - row[row.length - 1][0]) / .25) : 0; if (on <= 0) return;
      const [lx, ly] = L(3266, ROWY[r]), g = ctx.createRadialGradient(lx, ly, 0, lx, ly, 40);
      g.addColorStop(0, `rgba(241,239,230,${.9 * on})`); g.addColorStop(.3, `rgba(241,239,230,${.35 * on})`); g.addColorStop(1, 'rgba(241,239,230,0)'); ctx.fillStyle = g; ctx.fillRect(lx - 40, ly - 40, 80, 80);
    });
    ctx.globalAlpha = a0;
    return L;
  }

  // ── props ───────────────────────────────────────────────────────────────────────────────────────────────────
  function ticket(ctx, x, y, w, h, ang, no, tA, tB, f) {      // kitchen order ticket hanging from the rail clip at (x, y); title tA flips to tB (f 0→1)
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    doc(ctx, 0, h / 2 + 8, w, h, { r: 3, blur: 34, sy: 16 });
    ctx.fillStyle = 'rgba(29,30,24,.18)'; for (let i = 0; i < w / 14; i++) { ctx.beginPath(); ctx.arc(-w / 2 + 7 + i * 14, h + 8, 4, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#2C2D27'; ctx.fillRect(-34, -12, 68, 34); ctx.fillStyle = ivo(.55); ctx.fillRect(-34, -12, 68, 4);
    setFont(ctx, MN(Math.round(w * .055)), 3); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('ORDER #' + no, 0, 8 + h * .13);
    ctx.strokeStyle = 'rgba(29,30,24,.45)'; ctx.lineWidth = 2; ctx.setLineDash([7, 6]); ctx.beginPath(); ctx.moveTo(-w * .42, 8 + h * .19); ctx.lineTo(w * .42, 8 + h * .19); ctx.stroke(); ctx.setLineDash([]);
    const tt = f < .5 ? tA : tB, sy = Math.max(.02, Math.abs(1 - 2 * f)), size = w * .21;
    ctx.save(); ctx.translate(0, 8 + h * .38); ctx.scale(1, sy); lines2(ctx, tt, 0, 0, DSP(size), size, { ls: 2 }); ctx.restore();
    ctx.fillStyle = 'rgba(29,30,24,.22)'; for (let i = 0; i < 3; i++) ctx.fillRect(-w * .36, 8 + h * (.66 + i * .09), w * (.72 - (i % 2) * .22), h * .022);
    ctx.textAlign = 'left'; ctx.restore();
  }
  function hangTag(ctx, x, y, ang, l1, l2) {                   // plain ivory price tag on a string, pivot (x, y)
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 236); ctx.stroke();
    ctx.translate(0, 210); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
    ctx.fillStyle = '#ECE9DC'; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(60, 0); ctx.lineTo(150, 70); ctx.lineTo(150, 250); ctx.lineTo(-150, 250); ctx.lineTo(-150, 70); ctx.closePath(); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.fillStyle = '#0B0C09'; ctx.beginPath(); ctx.arc(0, 30, 12, 0, 7); ctx.fill();
    setFont(ctx, MN(22), 4); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText(l1, 0, 110); setFont(ctx, DSP(96), 2); ctx.fillText(l2, 0, 212); ctx.textAlign = 'left';
    ctx.restore();
  }
  function coupon(ctx, w, h, lab, fz) {                        // generic promo coupon (no brand, no %), fz = frost 0..1
    ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#EFECDF'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 8); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#0B0C09'; ctx.beginPath(); ctx.arc(-w / 2 + w * .3, -h / 2, 9, 0, 7); ctx.arc(-w / 2 + w * .3, h / 2, 9, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(29,30,24,.4)'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(-w / 2 + w * .3, -h / 2 + 12); ctx.lineTo(-w / 2 + w * .3, h / 2 - 12); ctx.stroke(); ctx.setLineDash([]);
    ctx.save(); ctx.translate(-w / 2 + w * .15, 0); ctx.rotate(-Math.PI / 2); setFont(ctx, MN(13), 3); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('KUPON', 0, 5); ctx.restore();
    const sz = Math.min(h * .42, w * .62 / Math.max(4, lab.length) * 1.9); setFont(ctx, DSP(sz), 1); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText(lab, w * .15, sz * .3);
    setFont(ctx, MN(11), 2); ctx.fillStyle = 'rgba(29,30,24,.55)'; ctx.fillText('S&K BERLAKU', w * .15, h / 2 - 12); ctx.textAlign = 'left';
    if (fz > 0) { ctx.fillStyle = `rgba(232,238,240,${.5 * fz})`; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 8); ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${.85 * fz})`; ctx.lineWidth = 3; ctx.stroke(); }
  }
  function factory(ctx, x, yb, w, h, dashed) {                 // sawtooth-roof factory outline, base centre (x, yb)
    ctx.beginPath(); const x0 = x - w / 2; ctx.moveTo(x0, yb); ctx.lineTo(x0, yb - h * .55);
    for (let i = 0; i < 4; i++) { const sx = x0 + i * w * .17; ctx.lineTo(sx + w * .17, yb - h * .75); ctx.lineTo(sx + w * .17, yb - h * .55); }
    ctx.lineTo(x0 + w * .78, yb - h * .55); ctx.lineTo(x0 + w * .78, yb - h); ctx.lineTo(x0 + w * .86, yb - h); ctx.lineTo(x0 + w * .86, yb - h * .55); ctx.lineTo(x0 + w, yb - h * .55); ctx.lineTo(x0 + w, yb); ctx.closePath();
    if (dashed) ctx.setLineDash([14, 10]); ctx.stroke(); ctx.setLineDash([]);
  }
  function building(ctx, x, yb, w, h, t) {                     // data-centre block with vent rows and blinking LEDs
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20;
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#24251F'); g.addColorStop(1, '#16170F'); ctx.fillStyle = g; ctx.fillRect(x - w / 2, yb - h, w, h); ctx.restore();
    ctx.strokeStyle = ivo(.8); ctx.lineWidth = 3; ctx.strokeRect(x - w / 2, yb - h, w, h);
    ctx.fillStyle = '#2E2F28'; ctx.fillRect(x - w * .38, yb - h - 36, w * .22, 36); ctx.fillRect(x + w * .1, yb - h - 28, w * .28, 28);
    for (let r = 0; r < 5; r++) { const ry = yb - h + 30 + r * (h - 60) / 5; ctx.fillStyle = ivo(.12); ctx.fillRect(x - w / 2 + 26, ry, w - 52, (h - 60) / 5 - 14);
      for (let c = 0; c < 10; c++) { const on = rnd(r * 31 + c + Math.floor(t * 4 + c * .3)) > .45; ctx.fillStyle = on ? ivo(.85) : ivo(.2); ctx.fillRect(x - w / 2 + 44 + c * (w - 88) / 10, ry + 10, 7, 7); } }
  }
  const bolt = (ctx, x, y, s) => { ctx.beginPath(); ctx.moveTo(x + .1 * s, y - .5 * s); ctx.lineTo(x - .28 * s, y + .06 * s); ctx.lineTo(x - .02 * s, y + .06 * s); ctx.lineTo(x - .12 * s, y + .5 * s); ctx.lineTo(x + .3 * s, y - .1 * s); ctx.lineTo(x + .04 * s, y - .1 * s); ctx.closePath(); };
  const drop = (ctx, x, y, s) => { ctx.beginPath(); ctx.moveTo(x, y - s * .55); ctx.bezierCurveTo(x + s * .1, y - s * .3, x + s * .38, y - s * .05, x + s * .38, y + s * .18); ctx.arc(x, y + s * .18, s * .38, 0, Math.PI); ctx.bezierCurveTo(x - s * .38, y - s * .05, x - s * .1, y - s * .3, x, y - s * .55); ctx.closePath(); };
  function dotMap(ctx, cc, cr, S, o = {}) {                    // GRID world map in dots, cell (cc, cr) at (ox, oy)
    if (!GRID) return null; const X = c => (c - cc) * S + (o.ox || 0), Y = r => (r - cr) * S + (o.oy || 0), R = o.R ?? Math.max(2.4, S * .3);
    const xl = o.xl ?? -1000, xr = o.xr ?? 1000, yt = o.yt ?? -560, yb = o.yb ?? 560, hot = [];
    ctx.fillStyle = ivo(o.a ?? .28); ctx.beginPath();
    GRID.rows.forEach((row, r) => { const y = Y(r); if (y < yt || y > yb) return; for (let c = 0; c < row.length; c++) if (row[c] === '1') { const x = X(c); if (x < xl || x > xr) continue;
      if (o.idn && r >= 37 && r <= 47 && c >= 57 && c <= 75) { hot.push([x, y]); continue; } ctx.moveTo(x + R, y); ctx.arc(x, y, R, 0, 7); } });
    ctx.fill(); if (hot.length) { ctx.fillStyle = o.idn; ctx.beginPath(); for (const [x, y] of hot) { ctx.moveTo(x + R, y); ctx.arc(x, y, R, 0, 7); } ctx.fill(); }
    return { X, Y };
  }
  function notes(ctx, x, y, s, cur) {                          // line-art banknote stack (money without a coin cylinder)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
    for (let i = 2; i >= 0; i--) { ctx.save(); ctx.translate(i * 18, -i * 22); ctx.rotate((i - 1) * .05);
      ctx.fillStyle = '#0B0C09'; ctx.strokeStyle = ivo(i ? .45 : 1); ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(-150, -80, 300, 160, 12); ctx.fill(); ctx.stroke();
      if (!i) { ctx.lineWidth = 3; ctx.strokeRect(-130, -60, 260, 120); ctx.beginPath(); ctx.arc(0, 0, 38, 0, 7); ctx.stroke();
        setFont(ctx, DSP(46), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(cur, 0, 16); ctx.textAlign = 'left'; }
      ctx.restore(); }
    ctx.restore();
  }
  function pin(ctx, x, y, t, t0, lab) {
    const k = pop(t, t0); if (k <= 0) return; ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, y, 10 * Math.min(k, 1.2), 0, 7); ctx.fill();
    ctx.strokeStyle = ivo(.5 * clamp(t - t0)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 24 + 8 * Math.sin(t * 7), 0, 7); ctx.stroke();
    if (lab) { withA(ctx, clamp((t - t0 - .1) / .25), () => { setFont(ctx, MN(24), 5); const w = ctx.measureText(lab).width; ctx.fillStyle = 'rgba(11,12,9,.82)'; ctx.fillRect(x + 26, y - 22, w + 24, 42); });
      txt(ctx, lab, x + 38, y + 9, t, t0 + .1, MN(24), { ls: 5 }); }
  }

  // geometry for the coupons (Embun Beku) and drips
  const CPN = Array.from({ length: 24 }, (_, i) => { const far = i % 4 === 3, sg = i % 2 ? 1 : -1;
    return { far, x: far ? (rnd(i + 300) - .5) * 700 : sg * (640 + rnd(i + 300) * 300), ts: i * .18 + rnd(i + 340) * .1, r0: (rnd(i + 310) - .5) * .9, sp: 210 + rnd(i + 320) * 90,
      ph: rnd(i + 330) * 6, s: far ? .55 : .85 + rnd(i + 350) * .3, lab: ['DISKON', 'GRATIS ONGKIR', 'PROMO', 'CASHBACK', 'GRATIS ONGKIR', 'DISKON'][i % 6] }; });
  let DRIPS = null;
  const RECEIPT = () => [[A.hitungannya, 'HITUNGAN REDAKSI', '', 1], [A.hitungannya + .25, '- - - - - - - - - - - - - -', '', 0], [A.n3, 'HP incaran', 'Rp3.000.000', 0],
    [A.n210 - .1, 'naik 7%', '+Rp210.000', 0], [A.n135 - .1, 'naik 45%', '+Rp1.350.000', 0], [A.tinggi, '- - - - - - - - - - - - - -', '', 0], [A.tinggi + .3, 'contoh hitungan, bukan harga resmi', '', 2]];

  // ── stations ────────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, mod(p, t) { shake(p, t, A.goyang + .1, 12); }, draw(ctx, t) {       // S0 · "Oke, bursa Amerika goyang." A crack runs through it
      txt(ctx, 'Oke, bursa Amerika', 0, -230, t, A.oke - .05, SRF(64), { align: 'center' });
      fall(ctx, 'GOYANG', 0, 120, t, A.goyang - .1, DSP(260), { align: 'center' });
      drawCrack(ctx, K0, K0.L * E.inOutCubic(inv(A.goyang - .05, A.goyang + .45, t)), { head: true, w: 1.1 });
      star(ctx, 60, 0, t, A.goyang + .3, 40, 120); shards(ctx, 60, 0, t, A.goyang + .3, 14, 4);
      txt(ctx, 'Tapi kita di sini…', 0, 330, t, A.tapi - .1, SRF(50), { align: 'center', col: ivo(.85) });
    } },
    { at: A.hp - .12, via: 'push', draw(ctx, t) {                 // S1 · kita cuma mau beli HP baru
      plate(ctx, V.hp_scroll, t, -440, -10, 840, 600, kq(t, A.hp - .1, .6), { t0: A.hp });
      fall(ctx, 'HP BARU', 80, -130, t, A.hp - .05, DSP(220));
      txt(ctx, 'buat anak sekolah,', 80, -20, t, A.sekolah - .35, SRF(56));
      txt(ctx, 'atau buat kerja.', 80, 55, t, A.kerja - .3, SRF(56), { col: ivo(.85) });
      markLine(ctx, 'Emang apa ', 'urusannya', ' sama kita?', 80, 300, t, A.emang - .15, A.urusannya, SRF(58), { align: 'left' });
    } },
    { at: A.ini - .12, via: 'whip', draw(ctx, t) {                // S2 · Peta Jalur, jalur 1
      route(ctx, t, A.ini, 1, 'RAM · CHIP MEMORI', A.ram, 'yang paling kerasa di dompet', A.kerasa - .3);
    } },
    { at: A.soalnya - .12, via: 'truck', draw(ctx, t) {           // S3 · HP, laptop, server AI: all need RAM (Ahpo A02 + DIMM + hands)
      withA(ctx, kq(t, A.soalnya, .6), () => ap(ctx, IM.ram, 330, 60, .3));
      slab(ctx, 'HP', -40, -360, t, A.hp2, { size: 26, lx: 160, ly: -110 });
      slab(ctx, 'LAPTOP', 250, -400, t, A.laptop, { size: 26, lx: 330, ly: -110 });
      slab(ctx, 'SERVER AI', 560, -360, t, A.server, { size: 26, lx: 500, ly: -110 });
      evid(ctx, IM.dimm, -640, -190, 460, t, A.soalnya + .1, { rot: -3 });
      plate(ctx, V.b34, t, -640, 200, 460, 280, kq(t, A.termasuk - .2, .6), { t0: A.termasuk });
      slab(ctx, 'CHIP PENYIMPANAN', -870, 375, t, A.penyimpanannya - .2, { size: 20 });
      txt(ctx, 'semuanya sama-sama butuh RAM', 330, 420, t, A.butuh - .3, SRF(50), { align: 'center' });
      credit(ctx, 'Foto: Grendelkhan, CC BY-SA 3.0 · Yuriy Vertikov / Unsplash', t, A.soalnya + .5);
    } },
    { at: A.bayangin - .12, via: 'rise', draw(ctx, t) {           // S4 · Rel Orderan: one kitchen, two orders
      txt(ctx, 'Satu dapur katering, dua orderan', 0, -420, t, A.dapur - .2, SRF(56), { align: 'center' });
      tagR(ctx, 'ILUSTRASI', t, A.bayangin);
      const rk = E.outCubic(inv(A.bayangin, A.bayangin + .6, t));
      ctx.strokeStyle = ivo(.75); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-860, -300); ctx.lineTo(-860 + 1720 * rk, -300); ctx.stroke();
      ctx.fillStyle = ivo(.25); ctx.fillRect(-860, -296, 1720 * rk, 3);
      const x1 = lerp(-1100, -380, E.outQuint(inv(A.satu, A.satu + .6, t)));
      if (t > A.satu) ticket(ctx, x1, -300, 300, 380, kick(t, A.satu + .45, 7), 1, 'WARUNG\nKECIL', 'WARUNG\nKECIL', 0);
      const x2 = lerp(1200, 260, E.outQuint(inv(A.satu2, A.satu2 + .7, t)));
      if (t > A.satu2) ticket(ctx, x2, -300, 440, 560, kick(t, A.satu2 + .55, 9) + kick(t, A.bayar, 3), 2, 'HAJATAN\nRAKSASA', 'HAJATAN\nRAKSASA', 0);
      stamp(ctx, 'BAYAR LEBIH MAHAL', 260, 160, t, A.bayar, { size: 54, rot: -8 });
    } },
    { at: A.padahal - .12, via: 'truck', draw(ctx, t) {           // S5 · capacity is limited, the big order jumps the queue; relabel on "Nah"
      ctx.strokeStyle = ivo(.75); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-860, -360); ctx.lineTo(860, -360); ctx.stroke();
      const j = E.inOutCubic(inv(A.diduluin - .1, A.diduluin + .6, t)), f = inv(A.nah - .05, A.nah + .35, t);
      const xs = lerp(-300, 300, j), xb = lerp(300, -300, j), yb = -360 - 130 * Math.sin(Math.PI * j);
      ctx.save(); ctx.scale(.78, .78);
      ticket(ctx, xs / .78, -360 / .78, 300, 380, kick(t, A.diduluin + .5, 5), 1, 'WARUNG\nKECIL', 'HP ·\nLAPTOP', f);
      ticket(ctx, xb / .78, yb / .78, 440, 560, kick(t, A.diduluin + .55, 8) + (j > 0 && j < 1 ? -.1 * Math.sin(Math.PI * j) : 0), 2, 'HAJATAN\nRAKSASA', 'PUSAT\nDATA AI', f);
      ctx.restore();
      const bk = E.outCubic(inv(A.cuma - .2, A.cuma + .5, t)), hot = E.outCubic(inv(A.gede - .2, A.gede + .4, t));
      withA(ctx, bk, () => { for (let i = 0; i < 4; i++) { const x = -540 + i * 360, y = 270;
        if (hot > 0) { const g = ctx.createRadialGradient(x, y, 0, x, y, 150); g.addColorStop(0, ivo(.35 * hot)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(x - 150, y - 150, 300, 300); }
        ctx.strokeStyle = ivo(.8); ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, y, 130, 38, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y, 70, 20, 0, 0, 7); ctx.stroke();
        ctx.lineWidth = 3; ctx.beginPath(); for (let s = 0; s < 6; s++) { const a = s / 6 * Math.PI * 2; ctx.moveTo(x + Math.cos(a) * 70, y + Math.sin(a) * 20); ctx.lineTo(x + Math.cos(a) * 130, y + Math.sin(a) * 38); } ctx.stroke(); } });
      typeOn(ctx, 'KAPASITAS DAPUR · TERBATAS', 0, 370, t, A.terbatas - .3, MN(24), { ls: 6, cps: 34, align: 'center' });
      markLine(ctx, 'Ya pasti yang ', 'diduluin', ' yang gede', 0, 465, t, A.ya - .1, A.diduluin, SRF(52));
      tagR(ctx, 'ILUSTRASI', t, A.padahal);
    } },
    { at: A.kejadian - .12, via: 'whip', draw(ctx, t) {           // S7 · TrendForce + Counterpoint: AI data centres push memory prices
      typeOn(ctx, 'TRENDFORCE', -860, -400, t, A.trendforce, MN(30), { ls: 6, cps: 30 });
      typeOn(ctx, '+ COUNTERPOINT', -860, -350, t, A.counterpoint, MN(30), { ls: 6, cps: 30 });
      txt(ctx, 'dua lembaga riset pasar chip', -860, -275, t, A.lembaga - .2, SRF(46), { col: ivo(.88) });
      evid(ctx, IM.tf, -470, 0, 700, t, A.trendforce - .1, { rot: -2, crop: [0, 0, 1, .55], tab: 'trendforce.com · 3 Jul 2026' });
      evid(ctx, IM.tr, 450, -110, 720, t, A.nyatet - .2, { rot: 2, crop: [0, 0, 1, .6], tab: 'techradar.com · 11 Nov 2026' });
      fall(ctx, 'HARGA RAM & MEMORI NAIK', -860, 300, t, A.naiknya - .05, DSP(96));
      markLine(ctx, 'didorong ', 'permintaan pusat data AI', '', -860, 400, t, A.permintaan - .4, A.permintaan, SRF(48), { align: 'left' });
      srcTag(ctx, 'TrendForce, 3 Jul 2026 · Counterpoint via Katadata, 6 Sep 2026', -860, 480, t, A.nyatet);
    } },
    { at: A.toko - .12, via: 'push', draw(ctx, t) {               // S8 · Di toko, efeknya langsung kerasa · ITC
      plate(ctx, V.b12, t, -440, -60, 820, 560, kq(t, A.toko - .1, .6), { t0: A.toko });
      txt(ctx, 'Di toko, efeknya', 60, -360, t, A.toko - .15, SRF(56));
      txt(ctx, 'langsung kerasa.', 60, -290, t, A.kerasa - .3, SRF(56));
      evid(ctx, IM.cnbc, 470, 30, 700, t, A.itc - .3, { rot: 2, crop: [0, 0, 1, .55], tab: 'cnbcindonesia.com · 2 Feb 2026' });
      txt(ctx, 'pedagang ITC sampai ngaku takut jualan', 60, 400, t, A.takut - .3, SRF(44), { col: ivo(.9) });
      credit(ctx, 'Foto: Jimmy Liao / Pexels', t, A.toko + .5);
    } },
    { at: A.setahun - .12, via: 'truck', draw(ctx, t) {           // S9 · dalam setahun ≈ 2× (kata pedagang)
      plate(ctx, V.b13, t, -560, -170, 620, 380, kq(t, A.setahun - .1, .6), { t0: A.setahun });
      plate(ctx, V.b33, t, -560, 250, 620, 300, kq(t, A.setahun + .3, .6), { t0: A.setahun + .3 });
      txt(ctx, 'dalam setahun, harga RAM di sini', 60, -300, t, A.setahun - .15, SRF(50));
      fall(ctx, '≈2×', 60, 120, t, A.dua2 - .05, DSP(330), { col: LIME });
      slab(ctx, 'KIRA-KIRA · KATA PEDAGANG', 60, 230, t, A.lipat, { size: 22 });
      srcTag(ctx, 'CNBC Indonesia, 2 Feb 2026 · Kompas.tv, 20 Des 2025', 60, 330, t, A.lipat + .2);
      credit(ctx, 'Foto: Quang Nguyen Vinh / Pexels · Aleksandr Eremin / Unsplash', t, A.setahun + .5);
    } },
    { at: A.ujung - .12, via: 'whip', draw(ctx, t) {              // S10 · Label Ayun: Ahpo's A03 phone, the price tag swings at 7 and 45
      const cx = -330, cy = 30, s = .42, k = kq(t, A.ujung, .6);
      withA(ctx, k, () => {
        ap(ctx, IM.hp, cx, cy, s);
        const [sx0, sy0] = AP(cx, cy, s, 1620, 270), [sx1, sy1] = AP(cx, cy, s, 2360, 1790), sw = sx1 - sx0, sh = sy1 - sy0, mx = (sx0 + sx1) / 2;
        ctx.save(); ctx.beginPath(); ctx.roundRect(sx0, sy0, sw, sh, 34); ctx.clip();
        setFont(ctx, MN(18), 4); ctx.fillStyle = ivo(.6); ctx.textAlign = 'center'; ctx.fillText('HARGA HP', mx, sy0 + 90);
        const pct = t < A.n45 - .05 ? 7 * clamp((t - A.n7 + .1) / .3) : countTo(7, 45, t, A.n45 - .05, .7);
        if (t > A.n7 - .1) { setFont(ctx, DSP(104), 1); ctx.fillStyle = IVORY; ctx.fillText('+' + Math.round(pct) + '%', mx, sy0 + sh * .5); }
        setFont(ctx, MN(13), 2); ctx.fillStyle = ivo(.45); ctx.fillText('VS TAHUN LALU', mx, sy0 + sh * .5 + 40);
        const gx0 = sx0 + 34, gx1 = sx1 - 34, gy = sy1 - 70, gh = sh * .26, rise = pct / 45;     // price line climbing with the counter
        ctx.strokeStyle = ivo(.14); ctx.lineWidth = 1; for (let g = 0; g < 4; g++) { ctx.beginPath(); ctx.moveTo(gx0, gy - g * gh / 3); ctx.lineTo(gx1, gy - g * gh / 3); ctx.stroke(); }
        ctx.strokeStyle = IVORY; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.beginPath();
        for (let q = 0; q <= 16; q++) { const u = q / 16, yy = gy - gh * (.12 + .88 * rise * Math.pow(u, 1.6)) + Math.sin(q * 2.3) * 5 * (1 - u); q ? ctx.lineTo(lerp(gx0, gx1, u), yy) : ctx.moveTo(gx0, yy); }
        ctx.stroke(); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(gx1, gy - gh * (.12 + .88 * rise), 7, 0, 7); ctx.fill();
        ctx.textAlign = 'left'; ctx.restore();
        ap(ctx, IM.hpTop, cx, cy, s);
        const [px, py] = AP(cx, cy, s, 2325, 252), ang = .02 * Math.sin(t * 1.7) + kick(t, A.n7, 14) + kick(t, A.n45, 20, .7, 8);
        ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.translate(-px, -py); ap(ctx, IM.tag, cx, cy, s);
        const [tx, ty] = AP(cx, cy, s, 2575, 625); ctx.translate(tx, ty); ctx.rotate(-17 * D2R); setFont(ctx, DSP(78), 3); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText('NAIK', 0, 26); ctx.textAlign = 'left';
        ctx.restore();
      });
      txt(ctx, 'Ujung-ujungnya kena ke harga HP.', 120, -300, t, A.ujung, SRF(48), { col: ivo(.85) });
      txt(ctx, 'Itu tadi yang bikin harganya naik', 120, -200, t, A.itu, SRF(50));
      const w7 = fall(ctx, '7', 120, 90, t, A.n7 - .05, DSP(270));
      fall(ctx, '–45%', 120 + (w7 || 0) + 6, 90, t, A.n45 - .05, DSP(270));
      srcTag(ctx, 'Counterpoint via Katadata, 20 Mei & 6 Sep 2026', 120, 200, t, A.n45 + .2);
    } },
    { at: A.di - .12, via: 'push', draw(ctx, t) {                 // S11 · −9 % shipments: 9 of 100 phone boxes drop out
      const C0 = 66, R0 = 70, x0 = -840, y0 = -350, kk = E.outCubic(inv(A.di - .1, A.di + .6, t));
      for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), x = x0 + c * C0, y = y0 + r * R0, drop = i < 9, s = t - A.turun - .05 - i * .05;
        const ka = clamp(kk * 3 - (c + r) * .12); if (ka <= 0) continue;
        if (drop && s > 0) { ctx.strokeStyle = ivo(.35 * ka); ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.strokeRect(x, y, 52, 58); ctx.setLineDash([]);
          if (s < 1.4) withA(ctx, ka * clamp((1.4 - s) / .4), () => { ctx.save(); ctx.translate(x + 26, y + 29 + 900 * s * s); ctx.rotate(s * (i % 2 ? 2 : -2)); ctx.fillStyle = ivo(.85); ctx.fillRect(-26, -29, 52, 58); ctx.restore(); });
          continue; }
        withA(ctx, ka, () => { ctx.fillStyle = ivo(.82); ctx.fillRect(x, y, 52, 58); ctx.fillStyle = 'rgba(11,12,9,.55)'; ctx.fillRect(x + 16, y + 12, 20, 34); ctx.fillStyle = ivo(.82); ctx.fillRect(x + 19, y + 15, 14, 24); });
      }
      txt(ctx, '1 kotak = 1% pengiriman (ilustrasi)', -840, 380, t, A.di + .4, MN(17), { ls: 2, col: ivo(.5) });
      typeOn(ctx, 'PENGIRIMAN HP · INDONESIA', 60, -390, t, A.pengiriman - .1, MN(28), { ls: 6, cps: 34 });
      txt(ctx, 'tiga bulan pertama 2026', 60, -320, t, A.tiga - .2, SRF(50));
      fall(ctx, '−9%', 60, -60, t, A.n9 - .05, DSP(270));
      markLine(ctx, 'banyak yang ', 'nahan', ' dulu ganti HP', 60, 80, t, A.nahan - .4, A.nahan, SRF(48), { align: 'left' });
      evid(ctx, IM.kdHP, 500, 270, 480, t, A.th2026, { rot: 2, crop: [0, 0, 1, .5], tab: 'katadata.co.id · 6 Sep 2026' });
      srcTag(ctx, 'Counterpoint Research, 20 Mei 2026', -840, 470, t, A.n9 + .2);
    } },
    { at: A.hitungannya - .12, via: 'truck', draw(ctx, t) {        // S12 · Struk Termal: the receipt feeds up out of the printer, line by line
      tagR(ctx, 'HITUNGAN REDAKSI', t, A.hitungannya);
      const RC = RECEIPT(), LH = 62, px = -400, pw = 560, slotY = 400;
      let L = 40; const off = []; for (const [tp] of RC) { L += LH * E.outCubic(inv(tp, tp + .28, t)); off.push(L); }
      const kk = E.outCubic(inv(A.hitungannya - .1, A.hitungannya + .4, t));
      withA(ctx, kk, () => {
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = '#F3F1E7';
        ctx.beginPath(); ctx.moveTo(px - pw / 2, slotY); ctx.lineTo(px + pw / 2, slotY); ctx.lineTo(px + pw / 2, slotY - L);
        for (let i = 0; i <= 20; i++) ctx.lineTo(px + pw / 2 - i * pw / 20, slotY - L - (i % 2 ? 12 : 0)); ctx.closePath(); ctx.fill(); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.rect(px - pw / 2, slotY - L - 14, pw, L + 14); ctx.clip();
        RC.forEach(([tp, a, b, kind], i) => { if (t < tp) return; const y = slotY - (L - off[i]) - LH * .3;
          setFont(ctx, kind === 1 ? MN(24) : kind === 2 ? MN(17, 400) : MN(23, 400), kind === 1 ? 4 : 1); ctx.fillStyle = kind === 2 ? 'rgba(29,30,24,.6)' : INK;
          ctx.textAlign = kind ? 'center' : 'left'; ctx.fillText(a, kind ? px : px - pw / 2 + 34, y);
          if (b) { setFont(ctx, MN(26), 0); ctx.textAlign = 'right'; ctx.fillText(b, px + pw / 2 - 34, y); } ctx.textAlign = 'left'; });
        ctx.restore();
        ctx.fillStyle = '#24251F'; ctx.beginPath(); ctx.roundRect(px - pw / 2 - 40, slotY - 14, pw + 80, 78, 14); ctx.fill(); ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#0B0C09'; ctx.fillRect(px - pw / 2 - 6, slotY - 4, pw + 12, 10);
      });
      const kb = kq(t, A.hitungannya + .2, .6), kc = gone(t, A.garagara - .2, .4);
      plate(ctx, V.b23, t, 480, -250, 720, 360, kb * kc, { t0: A.hitungannya });
      plate(ctx, V.b24, t, 480, -250, 720, 360, kq(t, A.garagara - .2, .5), { t0: A.garagara });
      fall(ctx, '+Rp210.000', 120, 110, t, A.n210 - .05, DSP(130));
      txt(ctx, 'kalau kena naik paling ringan · 7%', 120, 160, t, A.ringan - .3, MN(20, 400), { ls: 1, col: ivo(.7) });
      fall(ctx, '+Rp1.350.000', 120, 360, t, A.n135 - .05, DSP(170), { col: LIME });
      txt(ctx, 'kalau kena yang paling tinggi · 45%', 120, 410, t, A.tinggi - .3, MN(20, 400), { ls: 1, col: ivo(.7) });
      credit(ctx, 'Foto: kaboompics / Pexels', t, A.hitungannya + .6, 120, 500);
    } },
    { at: A.nah2 - .12, via: 'whip', draw(ctx, t) {               // S13 · the bubble pops, the price tag stays: belum tentu
      txt(ctx, 'Nah, di sini orang sering salah sangka.', 0, -420, t, A.nah2, SRF(54), { align: 'center' });
      const cx = -470, cy = -10, R = 250 * pumped(t, A.nah2 - .1, [], .015);
      if (t < A.pecah) { bubble(ctx, cx, cy, R, t, { wob: wobble(t, [[A.gelembung]]), film: .16, seed: 6 });
        txt(ctx, 'SAHAM AI', cx, cy + 12, t, A.nah2 + .2, MN(30), { ls: 6, align: 'center' }); }
      else bubblePop(ctx, cx, cy, R, t - A.pecah, { seed: 6 });
      if (t > A.pecah) txt(ctx, 'PECAH', cx, cy + 20, t, A.pecah + .15, DSP(120), { align: 'center', col: ivo(.35) });
      hangTag(ctx, 470, -390, .03 * Math.sin(t * 1.3) + kick(t, A.pecah + .12, 6, .8, 6), 'HARGA HP', 'Rp ···');
      txt(ctx, 'langsung turun?', 470, 220, t, A.turun2 - .3, SRF(48), { align: 'center', col: ivo(.88) });
      fall(ctx, '≠', 0, 60, t, A.belum - .1, DSP(200), { align: 'center' });
      slab(ctx, 'BELUM TENTU', 0, 360, t, A.belum, { size: 40, lime: true, align: 'center' });
    } },
    { at: A.idc - .12, via: 'rise', draw(ctx, t) {                // S14 · year ruler: mahal sampai 2027, agak longgar 2028
      typeOn(ctx, 'IDC', -860, -400, t, A.idc, MN(30), { ls: 6 }); typeOn(ctx, 'TRENDFORCE', -700, -400, t, A.trendforce2 + .1, MN(30), { ls: 6 });
      typeOn(ctx, 'COUNTERPOINT', -380, -400, t, A.counterpoint2, MN(30), { ls: 6 });
      txt(ctx, 'harga RAM & memori bakal tetap mahal', -860, -320, t, A.mahal2 - .4, SRF(50));
      const YX = [-700, 0, 700], YS = ['2026', '2027', '2028'], YT = [A.idc + .3, A.th2027, A.th2028], ay = 160;
      const ka = E.outCubic(inv(A.idc, A.idc + .6, t)); ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-880, ay); ctx.lineTo(-880 + 1760 * ka, ay); ctx.stroke();
      for (let i = 0; i < 3; i++) { const k = E.outCubic(inv(YT[i] - .2, YT[i] + .2, t)); if (k <= 0) continue; ctx.fillStyle = ivo(.8 * k); ctx.fillRect(YX[i] - 1.5, ay - 18, 3, 36);
        fall(ctx, YS[i], YX[i], ay + 110, t, YT[i] - .2, DSP(90), { align: 'center' }); }
      for (let m = 0; m < 36; m++) { const x = -880 + m * 1760 / 36; if (ka * 36 < m) break; ctx.fillStyle = ivo(.3); ctx.fillRect(x, ay - 6, 2, 12); }
      const bw = E.inOutCubic(inv(A.mahal2 - .2, A.th2027 + .4, t)), x1 = lerp(-700, 350, bw), bh = 140;
      if (bw > 0) { ctx.fillStyle = ivo(.86); ctx.fillRect(-700, ay - 40 - bh, x1 + 700, bh);
        const tk = E.inOutCubic(inv(A.counterpoint3, A.longgar, t)); if (tk > 0) { ctx.beginPath(); ctx.moveTo(350, ay - 40 - bh); ctx.lineTo(lerp(350, 700, tk), ay - 40 - lerp(bh, 34, tk)); ctx.lineTo(lerp(350, 700, tk), ay - 40); ctx.lineTo(350, ay - 40); ctx.closePath(); ctx.fill(); }
        ctx.save(); ctx.beginPath(); ctx.rect(-700, ay - 40 - bh, x1 + 700, bh); ctx.clip(); setFont(ctx, DSP(120), 8); ctx.fillStyle = '#11120E'; ctx.fillText('TETAP MAHAL', -660, ay - 40 - 20); ctx.restore(); }
      slab(ctx, 'BARU AGAK LONGGAR', 700, 360, t, A.longgar, { size: 30, lime: true, align: 'center', lx: 700, ly: ay - 60 });
      srcTag(ctx, 'IDC, 26 Feb 2026 · TrendForce, 30 Sep 2026 · Counterpoint, 3 Nov 2026', -860, 480, t, A.th2027 + .3);
    } },
    { at: A.kok - .12, via: 'truck', draw(ctx, t) {               // S15 · girders rise slowly; the contracts are already tied
      txt(ctx, 'Kok bisa selama itu?', 0, -420, t, A.kok - .1, SRF(60), { align: 'center' });
      ctx.strokeStyle = ivo(.35); ctx.lineWidth = 3; withA(ctx, kq(t, A.pabrik - .3, .5), () => factory(ctx, -420, 330, 760, 520, true));
      const g = .34 * E.inOutSine(inv(A.pabrik, A.sementara + 1, t));
      for (let i = 0; i < 7; i++) { const x = -770 + i * 115, h = 520 * .55 * clamp(g * 3 - i * .12) ; if (h <= 0) continue;
        ctx.fillStyle = ivo(.85); ctx.fillRect(x - 7, 330 - h, 14, h); ctx.fillRect(x - 18, 330 - h, 36, 6);
        if (i) { ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 115, 330); ctx.lineTo(x, 330 - h); ctx.stroke(); } }
      typeOn(ctx, 'PABRIK MEMORI BARU', -800, 400, t, A.pabrik, MN(24), { ls: 5, cps: 34 });
      const yr = t < A.bertahun ? 1 : Math.min(3, 1 + (t - A.bertahun) * 2.2);
      if (t > A.pabrik + .3) { txt(ctx, 'TAHUN', -800, -250, t, A.pabrik + .3, MN(22), { ls: 6, col: ivo(.6) }); slot(ctx, yr, -800, -150, DSP(110)); }
      txt(ctx, 'butuh bertahun-tahun', -800, -90, t, A.bertahun - .2, SRF(40), { col: ivo(.85) });
      typeOn(ctx, 'PEMBELI RAKSASA', 300, -300, t, A.raksasa2 - .1, MN(24), { ls: 5, cps: 34 });
      for (let i = 0; i < 5; i++) { const t0 = A.raksasa2 + .1 + i * .16; popAt(ctx, 560 + i * 8, 120 - i * 26, t, t0, () => {
        doc(ctx, 0, 0, 420, 300, { blur: 26, sy: 10 }); setFont(ctx, DSP(70), 3); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('KONTRAK', 0, -40);
        ctx.fillStyle = 'rgba(29,30,24,.25)'; for (let r = 0; r < 3; r++) ctx.fillRect(-150, 10 + r * 30, 300 - r * 50, 8); ctx.textAlign = 'left'; }, { rise: 80, from: .9, rot: (i - 2) * 2 }); }
      stamp(ctx, 'SUDAH DIIKAT', 600, 80, t, A.kontrak + .1, { size: 72, rot: -7 });
    } },
    { at: A.harga - .12, via: 'whip', mod(p, t) { shake(p, t, A.jatuh, 14); }, draw(ctx, t) {   // S16 · saham jatuh sehari ≠ pabrik jadi sehari
      tagR(ctx, 'ANALISIS REDAKSI', t, A.harga);
      ctx.fillStyle = ivo(.25); ctx.fillRect(-1, -380, 2, 680 * E.outCubic(inv(A.harga, A.harga + .5, t)));
      typeOn(ctx, 'HARGA SAHAM', -860, -300, t, A.harga, MN(28), { ls: 6 });
      const v5 = K16.VL[4]; drawCrack(ctx, K16, v5 * E.inOutSine(inv(A.harga + .1, A.jatuh - .05, t)) + (K16.L - v5) * E.outExpo(inv(A.jatuh - .05, A.jatuh + .35, t)), { head: true });
      star(ctx, -400, -175, t, A.jatuh - .05, 160, 100); shards(ctx, -400, -175, t, A.jatuh - .05, 12, 16);
      fall(ctx, 'BISA JATUH SEHARI', -860, 340, t, A.sehari - .1, DSP(90));
      typeOn(ctx, 'PABRIK BARU', 80, -300, t, A.pabrik2, MN(28), { ls: 6 });
      const pk = E.outCubic(inv(A.pabrik2 + .2, A.pabrik2 + .9, t));
      if (pk > 0) { ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.strokeRect(80, -120, 780 * pk, 90); ctx.fillStyle = ivo(.9); ctx.fillRect(80, -120, 22 * pk, 90);
        txt(ctx, '1 HARI', 80, 10, t, A.pabrik2 + .6, MN(20), { ls: 4, col: ivo(.75) }); txt(ctx, 'BERTAHUN-TAHUN →', 860, 10, t, A.pabrik2 + .9, MN(20), { ls: 4, col: ivo(.45), align: 'right' });
        ctx.strokeStyle = ivo(.12); ctx.lineWidth = 2; for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo(80 + i * 65, -120); ctx.lineTo(80 + i * 65, -30); ctx.stroke(); } }
      markLine(ctx, 'tapi pabrik nggak bisa jadi ', 'dalam sehari', '', 0, 440, t, A.tapi2 + .1, A.sehari2, SRF(50));
    } },
    { at: A.jadi - .12, via: 'push', draw(ctx, t) {               // S17 · HP lama masih sehat? dirawat aja dulu (saran redaksi)
      tagR(ctx, 'SARAN REDAKSI', t, A.jadi);
      plate(ctx, V.charger, t, -420, -40, 860, 560, kq(t, A.jadi - .1, .6), { t0: A.jadi });
      plate(ctx, V.b11, t, 560, -260, 520, 300, kq(t, A.itu2 - .2, .6), { t0: A.itu2 });
      txt(ctx, 'HP lamamu masih sehat?', 100, 60, t, A.sehat - .4, SRF(64));
      markLine(ctx, '', 'Dirawat', ' aja dulu.', 100, 200, t, A.dirawat - .2, A.dirawat, SRF(84), { align: 'left' });
      txt(ctx, 'lebih masuk akal daripada nungguin harga anjlok', 100, 300, t, A.akal - .3, SRF(33), { col: ivo(.8) });
      credit(ctx, 'Foto: NSYS Group / Unsplash', t, A.itu2, 300, 500);
    } },
    { at: A.masuk - .12, via: 'whip', draw(ctx, t) {              // S18 · Peta Jalur, jalur 2
      route(ctx, t, A.masuk, 2, 'IHSG · BURSA SAHAM KITA', A.ihsg - .3, 'yang paling sering bikin orang rame', A.rame - .3, V.saham);
    } },
    { at: A.sepanjang - .12, via: 'truck', mod(p, t) { shake(p, t, A.n167, 12); }, draw(ctx, t) {   // S19 · IHSG Oktober −16,7 %
      plate(ctx, V.grafik_turun, t, 450, -240, 800, 380, kq(t, A.sepanjang, .6), { t0: A.sepanjang, dim: .3 });
      typeOn(ctx, 'IHSG', -860, -390, t, A.sepanjang - .1, MN(30), { ls: 6 });
      txt(ctx, 'sepanjang Oktober 2026', -860, -310, t, A.oktober - .2, SRF(54));
      drawCrack(ctx, K19, K19.L * E.inOutSine(inv(A.ihsg2 - .3, A.n167 - .05, t)), { head: true });
      star(ctx, 880, 250, t, A.n167 - .05, 190, 110); shards(ctx, 860, 250, t, A.n167 - .05, 14, 19);
      fall(ctx, '−16,7%', -860, 320, t, A.n167 - .05, DSP(240));
      txt(ctx, 'ditutup 5.057,05 · 30 Okt 2026', -860, 390, t, A.persen2, MN(22, 400), { ls: 2, col: ivo(.7) });
      srcTag(ctx, 'KSSK via OJK, 3 Nov 2026 · Katadata, 4 Nov 2026', -860, 470, t, A.persen2 + .2);
    } },
    { at: A.godaannya - .12, via: 'push', draw(ctx, t) {          // S20 · the temptation: blame AI (three headlines)
      evid(ctx, IM.peri, -540, -60, 640, t, A.godaannya - .05, { rot: -4, crop: [0, 0, 1, .5], tab: 'periskop.id · 16 Okt 2026' });
      evid(ctx, IM.cna, 60, -200, 640, t, A.godaannya + .25, { rot: 3, crop: [0, 0, 1, .5], tab: 'cna.id · 5 Nov 2026' });
      evid(ctx, IM.china, 600, 20, 580, t, A.godaannya + .55, { rot: -2, crop: [0, 0, 1, .5], tab: 'teknologi.bisnis.com · 30 Okt 2026' });
      markLine(ctx, 'godaannya gede banget buat langsung ', 'nyalahin AI', '', 0, 400, t, A.godaannya, A.nyalahin, SRF(50));
    } },
    { at: A.tapi3 - .12, via: 'truck', draw(ctx, t) {             // S21 · KSSK: who is in it
      txt(ctx, 'Tapi coba kita intip', 80, -410, t, A.tapi3 - .1, SRF(48));
      popAt(ctx, -420, 20, t, A.tapi3 + .25, () => {
        doc(ctx, 0, 0, 620, 800, { r: 6 }); ctx.fillStyle = LIME; ctx.fillRect(-310, -400, 620, 14);
        setFont(ctx, MN(18), 4); ctx.fillStyle = 'rgba(29,30,24,.6)'; ctx.fillText('SIARAN PERS · 3 NOV 2026', -260, -320);
        setFont(ctx, DSP(66), 2); ctx.fillStyle = INK; ctx.fillText('KETERANGAN', -260, -230); ctx.fillText('RESMI KSSK', -260, -165);
        setFont(ctx, SRF(26), 0); ctx.fillText('Komite Stabilitas Sistem Keuangan', -260, -110);
        ctx.fillStyle = 'rgba(29,30,24,.18)'; for (let r = 0; r < 11; r++) ctx.fillRect(-260, -50 + r * 36, 520 - (r % 3) * 70, 10);
      }, { rise: 90, from: .9, rot: -2 });
      txt(ctx, 'ilustrasi dokumen', -420, 470, t, A.intip + .4, MN(15), { ls: 2, col: ivo(.42), align: 'center' });
      txt(ctx, 'isinya:', 80, -330, t, A.kementerian - .5, SRF(48), { col: ivo(.8) });
      const M = [['KEMENTERIAN KEUANGAN', A.kementerian], ['BANK INDONESIA', A.bank], ['OJK', A.ojk], ['LPS', A.lps]];
      M.forEach(([s, t0], i) => { fall(ctx, s, 80, -200 + i * 130, t, t0 - .1, DSP(88), { stag: .015 }); withA(ctx, clamp((t - t0) / .3), () => { ctx.fillStyle = ivo(.2); ctx.fillRect(80, -180 + i * 130, 780, 2); }); });
    } },
    { at: A.penyebab - .12, via: 'whip', draw(ctx, t) {           // S22 · Papan: penyebab versi KSSK
      board(ctx, t, A.penyebab - .1, 'PENYEBAB VERSI KSSK', [[[A.konflik, 'KONFLIK']], [[A.energi, 'ENERGI']], [[A.suku + .2, 'BUNGA']]], -300);
      txt(ctx, 'antarnegara', 420, -130, t, A.konflik + .2, SRF(46));
      txt(ctx, 'harga energi', 420, 15, t, A.energi + .1, SRF(46));
      txt(ctx, 'suku bunga dunia', 420, 145, t, A.suku + .2, SRF(46)); txt(ctx, 'yang masih tinggi', 420, 200, t, A.tinggi2 - .2, SRF(40), { col: ivo(.75) });
      srcTag(ctx, 'Siaran pers KSSK via OJK, 3 Nov 2026', -860, 480, t, A.konflik);
    } },
    { at: A.ditambah - .12, via: 'push', draw(ctx, t) {           // S22b · duit beredar lagi seret (faucet) + MSCI
      const fx = -420, fy = -40, kk = kq(t, A.ditambah - .1, .5);
      withA(ctx, kk, () => {
        ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const P = () => { ctx.beginPath(); ctx.moveTo(fx - 480, fy - 200); ctx.lineTo(fx - 70, fy - 200); ctx.quadraticCurveTo(fx, fy - 200, fx, fy - 130); ctx.lineTo(fx, fy - 30); };
        P(); ctx.strokeStyle = IVORY; ctx.lineWidth = 46; ctx.stroke(); P(); ctx.strokeStyle = TILE; ctx.lineWidth = 38; ctx.stroke();
        ctx.fillStyle = IVORY; ctx.fillRect(fx - 30, fy - 34, 60, 12); ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(fx - 220, fy - 223); ctx.lineTo(fx - 220, fy - 290); ctx.stroke();
        ctx.save(); ctx.translate(fx - 220, fy - 300); ctx.rotate(E.inOutCubic(inv(A.seret - .4, A.seret + .3, t)) * 1.4); ctx.beginPath(); ctx.arc(0, 0, 50, 0, 7); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(50, 0); ctx.moveTo(0, -50); ctx.lineTo(0, 50); ctx.stroke(); ctx.restore();
        if (!DRIPS) { DRIPS = []; let tt = A.ditambah; while (tt < A.ada2) { DRIPS.push(tt); tt += tt < A.seret ? .2 : .2 + (tt - A.seret) * .45; } }
        for (const d0 of DRIPS) { const s = t - d0; if (s < 0 || s > 1) continue; const y = fy - 20 + 1200 * s * s;
          if (y < 380) { ctx.fillStyle = ivo(.85); drop(ctx, fx, y, 30); ctx.fill(); }
          else { const q = (y - 380) / 300; ctx.strokeStyle = ivo(.5 * clamp(1 - q)); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(fx, 390, 30 + 90 * q, 8 + 18 * q, 0, 0, 7); ctx.stroke(); } }
        ctx.fillStyle = ivo(.2); ctx.fillRect(fx - 300, 390, 600, 3);
      });
      typeOn(ctx, 'DUIT BEREDAR DI DALAM NEGERI', -880, -400, t, A.ditambah + .4, MN(24), { ls: 5, cps: 34 });
      slab(ctx, 'LAGI SERET', -620, 300, t, A.seret, { size: 34, lime: true });
      fall(ctx, 'MSCI', 180, -60, t, A.msci - .1, DSP(220));
      txt(ctx, 'lembaga pembuat daftar saham', 180, 40, t, A.msci + .5, SRF(46));
      txt(ctx, 'yang jadi patokan investor asing', 180, 105, t, A.asing - .4, SRF(46), { col: ivo(.85) });
      txt(ctx, 'plus ada pengumuman', 180, -300, t, A.plus - .1, SRF(44), { col: ivo(.75) });
    } },
    { at: A.ada2 - .12, via: 'whip', draw(ctx, t) {               // S23 · Juli 2026: chip stocks crack down, IHSG rises (Kompas full rides over the start)
      fall(ctx, 'JULI 2026', -860, -360, t, A.chip2 - .3, DSP(120));
      typeOn(ctx, 'SAHAM CHIP DUNIA', -860, -275, t, A.chip2, MN(24), { ls: 5 });
      const v3 = K23.VL[3]; drawCrack(ctx, K23, v3 * E.inOutSine(inv(A.chip2, A.dijualin, t)) + (K23.L - v3) * E.outExpo(inv(A.dijualin, A.dijualin + .4, t)), { head: true });
      star(ctx, -330, -215, t, A.dijualin, 230, 90);
      txt(ctx, 'dijualin, takut saham AI kemahalan', -860, 150, t, A.kemahalan - .4, SRF(40), { col: ivo(.85) });
      const uk = E.inOutCubic(inv(A.ihsg3 - .1, A.naik + .3, t));
      if (uk > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const n = UP23.length - 1, m = uk * n;
        for (let i = 0; i <= Math.floor(m); i++) i ? ctx.lineTo(UP23[i][0], UP23[i][1]) : ctx.moveTo(UP23[0][0], UP23[0][1]);
        const i0 = Math.min(n - 1, Math.floor(m)), f = m - i0, hx = lerp(UP23[i0][0], UP23[i0 + 1][0], f), hy = lerp(UP23[i0][1], UP23[i0 + 1][1], f); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(hx, hy, 11, 0, 7); ctx.fill(); setFont(ctx, MN(26), 5); ctx.fillText('IHSG', hx - 60, hy - 30); }
      slab(ctx, 'IHSG KITA MALAH NAIK', 40, 420, t, A.naik, { size: 30, lime: true });
    } },
    { at: A.investor - .12, via: 'push', draw(ctx, t) {           // S24 · asing beli bersih Rp1,2 T
      txt(ctx, 'Investor asing justru tercatat', -860, -300, t, A.investor - .1, SRF(52));
      txt(ctx, 'beli bersih', -860, -220, t, A.beli - .3, SRF(52));
      fall(ctx, 'Rp1,2 T', -860, 100, t, A.n12 - .05, DSP(280));
      txt(ctx, 'JULI 2026', -860, 170, t, A.n12 + .2, MN(22), { ls: 6, col: ivo(.6) });
      evid(ctx, IM.mkt, 470, -150, 680, t, A.investor, { rot: 2, crop: [0, 0, 1, .5], tab: 'market.bisnis.com · 20 Jul 2026' });
      plate(ctx, V.b22, t, 470, 300, 600, 260, kq(t, A.beli - .2, .6), { t0: A.beli });
      srcTag(ctx, 'Kompas.id & Bisnis.com, 20 Jul 2026', -860, 470, t, A.n12 + .3);
      credit(ctx, 'Foto: nhavantuonglai / Pexels', t, A.beli + .3, 180, 500);
    } },
    { at: A.jadi2 - .12, via: 'whip', draw(ctx, t) {              // S25 · Papan Tersangka: IHSG / JATUH / AI? → SALAH / KAMBING / HITAM
      board(ctx, t, A.jadi2 + .1, 'PAPAN TERSANGKA', [[[A.ihsg4, 'IHSG'], [A.salah, 'SALAH']], [[A.jatuh2 + .1, 'JATUH'], [A.kambing, 'KAMBING']], [[A.ai4 + .1, 'AI?'], [A.hitam, 'HITAM']]], -300);
      txt(ctx, 'kalau ada yang bilang begitu,', 400, -250, t, A.ihsg4, SRF(36), { col: ivo(.8) });
      txt(ctx, 'jangan langsung ditelan', 400, -185, t, A.jangan - .2, SRF(42));
      slab(ctx, 'MINTA BUKTINYA', 400, -80, t, A.buktinya - .1, { size: 34 });
      txt(ctx, 'salah pilih kambing hitam,', 400, 120, t, A.salah + .2, SRF(36), { col: ivo(.85) });
      txt(ctx, 'salah baca situasi', 400, 180, t, A.situasi - .4, SRF(36), { col: ivo(.85) });
    } },
    { at: A.ya2 - .12, via: 'rise', mod(p, t) { shake(p, t, A.seratus + .1, 14); }, draw(ctx, t) {   // S27 · bukan berarti kebal 100 %
      txt(ctx, 'Bukan berarti pasar saham kita', 0, -260, t, A.ya2, SRF(56), { align: 'center' });
      fall(ctx, 'KEBAL 100%?', 0, 130, t, A.kebal - .1, DSP(240), { align: 'center' });
      drawCrack(ctx, K27, K27.L * E.outExpo(inv(A.seratus, A.seratus + .45, t)), { head: true, w: 1.1 });
      star(ctx, 200, 60, t, A.seratus + .1, 270, 130); shards(ctx, 200, 60, t, A.seratus + .1, 16, 27);
    } },
    { at: A.kalau2 - .12, via: 'truck', draw(ctx, t) {            // S28 · investor dunia panik: duit kabur (analisis redaksi)
      tagR(ctx, 'ANALISIS REDAKSI', t, A.kalau2);
      if (GRID) { const nr = GRID.rows.length, nc = GRID.rows[0].length, S = 1700 / nc, ka = E.outCubic(inv(A.kalau2 - .1, A.kalau2 + .5, t));
        withA(ctx, ka, () => {
          const M = dotMap(ctx, nc / 2, nr / 2, S, { oy: -30, idn: LIME, R: S * .3 }); const JK = [62, 44], NY = [141, 26], CP = [104, 4];
          const bz = u => [(1 - u) ** 2 * JK[0] + 2 * (1 - u) * u * CP[0] + u * u * NY[0], (1 - u) ** 2 * JK[1] + 2 * (1 - u) * u * CP[1] + u * u * NY[1]];
          const fk = E.outCubic(inv(A.kabur - .3, A.kabur + .5, t));
          if (fk > 0) { ctx.strokeStyle = ivo(.3 * fk); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const [c, r] = bz(i / 40); i ? ctx.lineTo(M.X(c), M.Y(r)) : ctx.moveTo(M.X(c), M.Y(r)); } ctx.stroke(); ctx.setLineDash([]);
            for (let i = 0; i < 36; i++) { const u = ((t - A.kabur) * .32 + rnd(i + 700)) % 1; if (t < A.kabur - .3 + rnd(i + 710) * .6) continue; const [c, r] = bz(u);
              ctx.fillStyle = ivo(.9 * fk * Math.sin(Math.PI * u)); ctx.beginPath(); ctx.arc(M.X(c), M.Y(r), 5, 0, 7); ctx.fill(); } }
        }); }
      txt(ctx, 'Kalau investor dunia panik barengan,', -860, -380, t, A.kalau2 - .1, SRF(50));
      fall(ctx, 'DUIT BISA KABUR', -860, 330, t, A.kabur - .2, DSP(130));
      txt(ctx, 'dari negara berkembang kayak kita', -860, 400, t, A.kabur + .5, SRF(42), { col: ivo(.85) });
      plate(ctx, V.b21, t, 640, 330, 420, 240, kq(t, A.panik, .6), { t0: A.panik });
      credit(ctx, 'Foto: Audy of Course / Pexels · Peta: BlankMap-World (CC0)', t, A.panik + .4);
    } },
    { at: A.tapi4 - .12, via: 'push', mod(p, t) { shake(p, t, A.bukan + .05, 16); }, draw(ctx, t) {   // S29 · efek samping, bukan biang kerok (A04 stamp frame)
      fall(ctx, 'EFEK SAMPING', -860, -150, t, A.efek - .1, DSP(170));
      txt(ctx, 'nggak langsung', -860, -50, t, A.samping + .5, SRF(70), { col: ivo(.9) });
      const s = t - A.bukan; if (s > 0) {
        const k = spring(s, .5, .28), sc = 1 + (1 - Math.min(k, 1.2)) * 1.1; ctx.save(); ctx.translate(380, 220); ctx.scale(sc, sc); ctx.globalAlpha = clamp(s / .07);
        const w = 800, h = w * 550 / 1146; ctx.drawImage(IM.stamp, -w / 2, -h / 2, w, h);
        ctx.rotate(-10 * D2R); setFont(ctx, DSP(72), 6); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText('BUKAN', 0, -24); setFont(ctx, DSP(104), 4); ctx.fillText('BIANG KEROK', 0, 74);
        ctx.textAlign = 'left'; ctx.restore(); }
      txt(ctx, 'utamanya', 380, 430, t, A.utamanya - .2, SRF(44), { align: 'center', col: ivo(.75) });
    } },
    { at: A.lanjut - .12, via: 'whip', draw(ctx, t) {             // S30 · Peta Jalur, jalur 3
      route(ctx, t, A.lanjut, 3, 'PUSAT DATA', A.ketiga, 'gedung beneran, di tanah kita sendiri', A.gedung - .3, V.kabel);
    } },
    { at: A.batam - .12, via: 'truck', draw(ctx, t) {             // S31 · Batam, 360 MW (Jakarta Globe full rides over the start)
      const z = lerp(26, 34, E.inOutSine(inv(A.batam, A.isinya, t)));
      const M = dotMap(ctx, 61, 42, z, { ox: -400, oy: -150, idn: LIME, R: z * .3, xr: 60 }); if (M) pin(ctx, M.X(61), M.Y(42), t, A.nvidia + 1.5, 'BATAM');
      typeOn(ctx, 'FIRMUS · DAYONE · NVIDIA', 180, -380, t, A.nvidia + 1.8, MN(26), { ls: 5, cps: 30 });
      fall(ctx, '360 MW', 180, -150, t, A.n360 - .1, DSP(220));
      txt(ctx, 'kawasan pusat data AI', 180, -70, t, A.megawatt - .2, SRF(48));
      credit(ctx, 'Peta: BlankMap-World, Wikimedia Commons (CC0)', t, A.nvidia + 1.9);
    } },
    { at: A.isinya - .12, via: 'push', draw(ctx, t) {             // S32 · 170.000 GPU, bertahap 2027 → 2028 (Ahpo A01 rack)
      const cx = -470, cy = 0, s = .34;
      withA(ctx, kq(t, A.isinya - .1, .6), () => { ap(ctx, IM.rack, cx, cy, s); const ph = (t * 2.6) % 2, a = ph < 1 ? 1 : 0;
        withA(ctx, a ? 1 : .25, () => ap(ctx, IM.ledA, cx, cy, s)); withA(ctx, a ? .25 : 1, () => ap(ctx, IM.ledB, cx, cy, s)); ap(ctx, IM.cable, cx, cy, s); });
      const n = Math.round(countTo(0, 170000, t, A.n170 - .1, 1.1)); if (t > A.n170 - .1) { setFont(ctx, DSP(200), 2); ctx.fillStyle = IVORY; ctx.fillText(fmt(n), 40, -190); }
      typeOn(ctx, 'GPU', 40 + 470, -190, t, A.gpu, MN(44), { ls: 8 });
      txt(ctx, 'chip yang jadi otot utamanya AI', 40, -110, t, A.otot - .5, SRF(46));
      const tk = E.outCubic(inv(A.bertahap - .2, A.th2028b + .3, t));
      if (tk > 0) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, 60); ctx.lineTo(60 + 760 * tk, 60); ctx.stroke(); }
      typeOn(ctx, 'dipasang bertahap', 40, 10, t, A.bertahap - .2, MN(20, 400), { ls: 2, col: ivo(.65) });
      popAt(ctx, 60, 60, t, A.th2027b - .1, () => { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill(); });
      fall(ctx, 'AWAL 2027', 40, 140, t, A.th2027b - .2, DSP(64));
      popAt(ctx, 820, 60, t, A.th2028b - .1, () => { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill(); });
      fall(ctx, 'AWAL 2028', 860, 140, t, A.th2028b - .2, DSP(64), { align: 'right' });
      plate(ctx, V.b31, t, 450, 340, 560, 220, kq(t, A.otot, .6) * gone(t, A.th2028b - .3, .4), { t0: A.otot });
      plate(ctx, V.b32, t, 450, 340, 560, 220, kq(t, A.th2028b - .3, .5), { t0: A.th2028b - .3 });
      credit(ctx, 'Foto: panumas nikhomkhai / Pexels · Field Engineer / Pexels', t, A.otot);
    } },
    { at: A.microsoft - .12, via: 'whip', draw(ctx, t) {          // S33 · Microsoft US$1,7 miliar ≈ Rp28,3 T
      typeOn(ctx, 'MICROSOFT', -860, -380, t, A.microsoft, MN(30), { ls: 6 });
      txt(ctx, 'udah janji investasi', -860, -310, t, A.microsoft + .3, SRF(48), { col: ivo(.85) });
      fall(ctx, 'US$1,7 MILIAR', -860, -110, t, A.n17 - .05, DSP(190));
      fall(ctx, '≈ Rp28,3 TRILIUN', -860, 40, t, A.n283 - .1, DSP(110), { col: ivo(.8) });
      txt(ctx, 'buat pusat data di Indonesia', -860, 130, t, A.indonesia2 - .4, SRF(48));
      popAt(ctx, 560, 280, t, A.n17, () => notes(ctx, 0, 0, 1.1, 'US$'), { rise: 70 });
      evid(ctx, IM.fort, 470, -220, 600, t, A.microsoft + .2, { rot: 2, crop: [0, 0, 1, .45], tab: 'fortuneidn.com · 11 Des 2025' });
      srcTag(ctx, 'Fortune Indonesia, 11 Des 2025', -860, 470, t, A.n17 + .3);
    } },
    { at: A.ini2 - .12, via: 'rise', draw(ctx, t) {               // S34 · the bubble around the building pops, the building stays
      txt(ctx, 'proyek gede, ditanam di tanah kita', 0, -420, t, A.ini2 - .1, SRF(54), { align: 'center' });
      ctx.fillStyle = ivo(.25); ctx.fillRect(-460, 300, 920, 3);
      building(ctx, 0, 300, 420, 330, t);
      const R = 330 * pumped(t, A.ini2 - .1, [], .01);
      if (t < A.pecah2) bubble(ctx, 0, 100, R, t, { wob: wobble(t, [[A.gelembung2]]), film: .15, seed: 12 }); else bubblePop(ctx, 0, 100, R, t - A.pecah2, { seed: 12 });
      evid(ctx, IM.dan, -650, -120, 400, t, A.ditanam - .2, { rot: -4, crop: [0, 0, 1, .5], tab: 'cnnindonesia.com · 23 Okt 2026' });
      evid(ctx, IM.tfin, 650, -120, 400, t, A.ditanam + .1, { rot: 3, crop: [0, 0, 1, .5], tab: 'techfinitive.com · 7 Agu 2026' });
      markLine(ctx, 'gedungnya ', 'nggak bakal ikut ngilang', '', 0, 430, t, A.pecah2 + .3, A.ngilang, SRF(50));
    } },
    { at: A.pertanyaannya - .12, via: 'push', draw(ctx, t) {      // S35 · siapa yang nanggung risikonya kalau yang nyewa sepi
      plate(ctx, V.poweredge, t, -120, -90, 1300, 560, kq(t, A.pertanyaannya - .1, .6), { t0: A.pertanyaannya, dim: .2 + .45 * E.inOutSine(inv(A.sepi - .3, A.sepi + .8, t)) });
      evid(ctx, IM.kdPem, 590, -260, 420, t, A.pertanyaannya + .4, { rot: 3, crop: [0, 0, 1, .5], tab: 'katadata.co.id · 11 Jun 2026' });
      markLine(ctx, 'siapa yang nanggung ', 'risikonya', '?', 0, 340, t, A.pertanyaannya, A.risikonya, SRF(58));
      txt(ctx, 'kalau nanti yang nyewa sepi', 0, 420, t, A.sepi - .5, SRF(44), { align: 'center', col: ivo(.8) });
    } },
    { at: A.padahal2 - .12, via: 'truck', draw(ctx, t) {          // S36 · yang macet justru bukan gara-gara gelembung (lime barrier)
      const s = t - A.macet + .15, ang = s <= 0 ? -78 : lerp(-78, 0, spring(s, .42, .34)), a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * kq(t, A.padahal2 - .1, .4);
      ctx.fillStyle = '#2C2D27'; ctx.fillRect(-640, -60, 60, 380); ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.strokeRect(-640, -60, 60, 380);
      ctx.save(); ctx.translate(-610, -30); ctx.rotate(ang * D2R); ctx.fillStyle = LIME; ctx.fillRect(0, -26, 1080, 52); ctx.fillStyle = LIME_INK;
      for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(60 + i * 120, -26); ctx.lineTo(120 + i * 120, -26); ctx.lineTo(90 + i * 120, 26); ctx.lineTo(30 + i * 120, 26); ctx.closePath(); ctx.fill(); }
      ctx.restore(); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(-610, -30, 20, 0, 7); ctx.fill(); ctx.globalAlpha = a0;
      txt(ctx, 'Padahal sejauh ini, proyek yang', -860, -380, t, A.padahal2 - .1, SRF(50));
      fall(ctx, 'MACET', -500, 260, t, A.macet - .05, DSP(220));
      txt(ctx, 'justru bukan gara-gara gelembung', -500, 340, t, A.bukan2 - .2, SRF(48));
      evid(ctx, IM.kdKet, 560, -230, 480, t, A.padahal2 + .3, { rot: 2, crop: [0, 0, 1, .5], tab: 'katadata.co.id · 8 Okt 2026' });
    } },
    { at: A.jatiluhur - .12, via: 'whip', draw(ctx, t) {          // S37 · Jatiluhur: disetop, izinnya belum beres
      ctx.save(); ctx.beginPath(); ctx.rect(-920, -480, 860, 900); ctx.clip();
      const M = dotMap(ctx, 62.3, 45.2, 64, { ox: -490, oy: -40, idn: ivo(.6), R: 18, xl: -940, xr: -40 }); ctx.restore();
      if (M) pin(ctx, M.X(62.3), M.Y(45.2), t, A.jatiluhur, 'JATILUHUR');
      txt(ctx, 'JAWA BARAT', -860, -400, t, A.jatiluhur + .3, MN(20), { ls: 6, col: ivo(.6) });
      evid(ctx, IM.telkom, -500, 300, 400, t, A.izin - .4, { rot: -3, crop: [0, 0, 1, .5], tab: 'teknologi.bisnis.com · 13 Okt 2026' });
      txt(ctx, 'Pemprov Jawa Barat sempat nyetop', 40, -380, t, A.jatiluhur + .7, SRF(46));
      fall(ctx, 'BDx · Rp3,5 T', 40, -200, t, A.n35 - .1, DSP(130));
      txt(ctx, 'proyek pusat data AI milik BDx', 40, -140, t, A.bdx - .2, MN(18, 400), { ls: 2, col: ivo(.65) });
      stamp(ctx, 'DISETOP', 700, 50, t, A.nyetop, { size: 76, rot: 8 });
      [['izin lingkungan', A.izin], ['izin bangunan', A.izin2]].forEach(([s, t0], i) => { const y = 0 + i * 90; withA(ctx, clamp((t - t0 + .2) / .3), () => {
        ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.strokeRect(40, y - 30, 40, 40); const xk = E.outCubic(inv(A.beres - .1, A.beres + .3, t));
        if (xk > 0) { ctx.beginPath(); ctx.moveTo(48, y - 22); ctx.lineTo(lerp(48, 72, xk), lerp(y - 22, y + 2, xk)); ctx.moveTo(72, y - 22); ctx.lineTo(lerp(72, 48, xk), lerp(y - 22, y + 2, xk)); ctx.stroke(); }
        setFont(ctx, SRF(46), 0); ctx.fillStyle = IVORY; ctx.fillText(s, 110, y + 6); }); });
      fall(ctx, 'BELUM BERES', 40, 290, t, A.beres - .1, DSP(110));
      srcTag(ctx, 'Bisnis.com, 13 Okt 2026 · Katadata, 8 Okt 2026', 40, 380, t, A.n35);
      credit(ctx, 'Peta: BlankMap-World, Wikimedia Commons (CC0)', t, A.jatiluhur + .4, 40, 500);
    } },
    { at: A.pln - .12, via: 'push', draw(ctx, t) {                // S38 · PLN: 159 pelanggan pusat data
      const x0 = -860, y0 = -230, S = 38;
      for (let i = 0; i < 160; i++) { const c = i % 16, r = Math.floor(i / 16), x = x0 + c * S + 14, y = y0 + r * S + 14, on = i < 159 ? clamp((t - A.n159 + .5 - i * .008) / .15) : 0;
        const ka = clamp((t - A.pln - c * .02 - r * .02) / .3); if (ka <= 0) continue;
        ctx.fillStyle = ivo(lerp(.14, .92, on) * ka); ctx.beginPath(); ctx.arc(x, y, on ? 11 : 9, 0, 7); ctx.fill(); }
      txt(ctx, '1 titik = 1 pelanggan', -860, 220, t, A.pln + .6, MN(17), { ls: 2, col: ivo(.5) });
      typeOn(ctx, 'PLN', 60, -360, t, A.pln, MN(30), { ls: 8 });
      txt(ctx, 'sekarang udah ngelayanin', 60, -290, t, A.pln + .4, SRF(46), { col: ivo(.85) });
      fall(ctx, '159', 60, 40, t, A.n159 - .05, DSP(300));
      txt(ctx, 'pelanggan pusat data', 60, 120, t, A.pelanggan - .3, SRF(54));
      evid(ctx, IM.kdList, 520, 290, 440, t, A.pelanggan, { rot: 2, crop: [0, 0, 1, .5], tab: 'katadata.co.id · 26 Sep 2026' });
      srcTag(ctx, 'Katadata, 26 Sep 2026', -860, 470, t, A.n159 + .3);
    } },
    { at: A.jadi3 - .12, via: 'truck', draw(ctx, t) {             // S39 · duit investor, listrik, air: dipake bareng-bareng
      txt(ctx, 'Jadi urusannya bukan cuma', 0, -400, t, A.jadi3 - .1, SRF(54), { align: 'center' });
      popAt(ctx, -560, -60, t, A.duit - .1, () => notes(ctx, 0, 0, 1, 'Rp'), { rise: 60 });
      popAt(ctx, 0, -60, t, A.listrik - .1, () => { ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.lineJoin = 'round'; bolt(ctx, 0, 0, 260); ctx.stroke(); }, { rise: 60 });
      popAt(ctx, 560, -60, t, A.air - .1, () => { ctx.strokeStyle = IVORY; ctx.lineWidth = 6; drop(ctx, 0, -10, 230); ctx.stroke(); }, { rise: 60 });
      txt(ctx, 'DUIT INVESTOR', -560, 170, t, A.duit, MN(26), { ls: 6, align: 'center' });
      txt(ctx, 'LISTRIK', 0, 170, t, A.listrik, MN(26), { ls: 6, align: 'center' });
      txt(ctx, 'AIR', 560, 170, t, A.air, MN(26), { ls: 6, align: 'center' });
      const bk = E.outCubic(inv(A.listrik, A.listrik + .5, t)); if (bk > 0) { ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(-170, 260); ctx.lineTo(-170 + 340 * bk, 260); ctx.moveTo(390, 260); ctx.lineTo(390 - 340 * bk, 260); ctx.stroke(); ctx.setLineDash([]); }
      slab(ctx, 'YANG KITA PAKE BARENG-BARENG', 0, 330, t, A.bareng - .1, { size: 30, lime: true, align: 'center' });
    } },
    { at: A.terakhir - .12, via: 'whip', draw(ctx, t) {           // S40 · Peta Jalur, jalur 4
      route(ctx, t, A.terakhir, 4, 'STARTUP', A.keempat, 'yang ini udah pernah kita rasain sendiri', A.jujur);
    } },
    { at: A.masih - .12, via: 'rise', draw(ctx, t) {              // S41 · Embun Beku: coupons fall, then freeze mid-air (frost in over)
      const D = .6, fz = E.outCubic(inv(A.habis, A.habis + 1.2, t));
      const drawC = far => { for (const [i, c] of CPN.entries()) { if (c.far !== far) continue; const ts = A.bakar - .4 + c.ts; if (t < ts) continue;
        const tau = t <= A.habis ? t - ts : (A.habis - ts) + D * (1 - Math.exp(-(t - A.habis) / D)), y = -640 + c.sp * tau; if (y > 640) continue;
        ctx.save(); ctx.translate(c.x + 40 * Math.sin(1.6 * tau + c.ph), y); ctx.rotate(c.r0 + .45 * Math.sin(1.1 * tau + c.ph)); ctx.scale(c.s, c.s); ctx.globalAlpha = far ? .4 : .95;
        coupon(ctx, 300, 150, c.lab, fz); ctx.restore(); } };
      drawC(true);
      withA(ctx, gone(t, A.habis - .1, .5), () => { txt(ctx, 'Masih inget zaman startup jor-joran', 0, -380, t, A.masih - .1, SRF(54), { align: 'center' });
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.85)'; ctx.shadowBlur = 40; fall(ctx, 'BAKAR UANG', 0, 90, t, A.bakar - .1, DSP(240), { align: 'center' }); ctx.restore();
        txt(ctx, 'promo, diskon, gratis ongkir di mana-mana', 0, 190, t, A.promo - .2, SRF(44), { align: 'center', col: ivo(.88) }); });
      drawC(false);
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.85)'; ctx.shadowBlur = 40;
      fall(ctx, 'SERET MODAL', 0, 30, t, A.seret2 - .1, DSP(190), { align: 'center' }); ctx.restore();
      slab(ctx, 'MUSIM DINGIN TEKNOLOGI', 0, 140, t, A.musim, { size: 36, lime: true, align: 'center' });
      tagR(ctx, 'ILUSTRASI', t, A.masih);
    } },
    { at: A.lihat - .12, via: 'truck', draw(ctx, t) {             // S42 · pendanaan 2025 US$356–358 juta, turun ±separuh (Bisnis full rides over the start)
      txt(ctx, 'suntikan dana buat startup Indonesia', -860, -360, t, A.th2025 - .2, SRF(48), { col: ivo(.88) });
      typeOn(ctx, 'TAHUN 2025', -860, -290, t, A.th2025, MN(26), { ls: 6 });
      fall(ctx, 'US$356–358', -860, -100, t, A.n356 - .05, DSP(180));
      fall(ctx, 'JUTA', -860, 50, t, A.juta2 - .1, DSP(150));
      slab(ctx, 'TURUN KIRA-KIRA SEPARUHNYA', -860, 200, t, A.separuhnya, { size: 28, lime: true });
      const yb = 360, h2 = 300 * E.outCubic(inv(A.n356 - .1, A.n356 + .6, t)), h1 = 600 * E.outCubic(inv(A.separuhnya - .2, A.separuhnya + .5, t));
      if (h1 > 0) { ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.setLineDash([12, 9]); ctx.strokeRect(220, yb - h1, 220, h1); ctx.setLineDash([]);
        txt(ctx, 'SEBELUMNYA', 330, yb + 50, t, A.separuhnya, MN(20), { ls: 4, align: 'center', col: ivo(.6) }); txt(ctx, '≈2× · ilustrasi skala', 330, yb + 82, t, A.separuhnya + .2, MN(15, 400), { ls: 1, align: 'center', col: ivo(.45) }); }
      if (h2 > 0) { ctx.fillStyle = ivo(.9); ctx.fillRect(560, yb - h2, 220, h2); txt(ctx, '2025', 670, yb + 50, t, A.n356, MN(20), { ls: 4, align: 'center' }); }
      ctx.fillStyle = ivo(.3); ctx.fillRect(160, yb, 700, 3);
      srcTag(ctx, 'Jawa Pos, 1 Jun 2026 · Bisnis.com, 27 Okt 2026', -860, 470, t, A.n356 + .3);
    } },
    { at: A.dari - .12, via: 'push', draw(ctx, t) {               // S43 · Jan–Sep 2026: 14 pendanaan, 0 IPO
      typeOn(ctx, 'JANUARI – SEPTEMBER 2026', -860, -380, t, A.dari, MN(26), { ls: 6, cps: 34 });
      ctx.strokeStyle = IVORY; ctx.lineWidth = 7; ctx.lineCap = 'round';
      for (let i = 0; i < 14; i++) { const g = Math.floor(i / 5), j = i % 5, gx = -840 + g * 220, y0 = -290, k = E.outCubic(inv(A.n14 - .45 + i * .065, A.n14 - .33 + i * .065, t)); if (k <= 0) continue;
        ctx.beginPath(); if (j < 4) { const x = gx + j * 38 + (rnd(i + 900) - .5) * 6; ctx.moveTo(x, y0); ctx.lineTo(x + 6 * k, y0 + 170 * k); }
        else { ctx.moveTo(gx - 22, y0 + 140); ctx.lineTo(gx - 22 + 180 * k, y0 + 140 - 110 * k); } ctx.stroke(); }
      fall(ctx, '14', -860, 160, t, A.n14 - .05, DSP(220));
      txt(ctx, 'kali pendanaan baru', -660, 150, t, A.pendanaan - .3, SRF(52));
      fall(ctx, '0', 200, 160, t, A.satu3 - .1, DSP(300), { col: LIME });
      txt(ctx, 'IPO STARTUP TEKNOLOGI', 200, 230, t, A.bursa - .3, MN(22), { ls: 5 });
      txt(ctx, 'belum ada satu pun yang masuk bursa saham', 200, 290, t, A.saham - .2, SRF(34), { col: ivo(.85) });
      evid(ctx, IM.kdInv, 540, -250, 440, t, A.dari + .3, { rot: 2, crop: [0, 0, 1, .5], tab: 'katadata.co.id · 28 Okt 2026' });
      srcTag(ctx, 'Tracxn via Katadata, 28 Okt 2026', -860, 470, t, A.n14 + .3);
    } },
    { at: A.jadi4 - .12, via: 'truck', draw(ctx, t) {             // S44 · AI belum pecah, startup kita udah kedinginan duluan (frost callback)
      const R = 220 * pumped(t, A.jadi4 - .2, [], .01);
      bubble(ctx, -430, -60, R, t, { wob: wobble(t, [[A.gelembung4]]), film: .16, seed: 9 });
      txt(ctx, 'AI · BELUM PECAH', -430, 260, t, A.belum3 - .1, MN(26), { ls: 6, align: 'center' });
      plate(ctx, V.gel_beku, t, 430, -60, 700, 460, kq(t, A.jadi4, .6), { t0: A.jadi4 });
      txt(ctx, 'STARTUP KITA', 430, 260, t, A.belum3 + .6, MN(26), { ls: 6, align: 'center' });
      slab(ctx, 'UDAH KEDINGINAN DULUAN', 0, 380, t, A.kedinginan - .1, { size: 36, lime: true, align: 'center' });
    } },
    { at: A.pelajarannya - .12, via: 'push', draw(ctx, t) {       // S45 · duit gampang berhenti ngalir; yang bertahan punya pelanggan (opini)
      tagR(ctx, 'OPINI REDAKSI', t, A.pelajarannya);
      plate(ctx, V.celengan, t, -400, -40, 860, 540, kq(t, A.pelajarannya - .1, .6), { t0: A.pelajarannya });
      ctx.save(); ctx.beginPath(); ctx.rect(-830, -560, 860, 250); ctx.clip();
      for (let i = 0; i < 40; i++) { const t0 = A.pelajarannya + i * .2; if (t0 > A.berhenti) break; const s = t - t0; if (s < 0 || s > .8) continue;
        coin(ctx, -400 + (rnd(i + 800) - .5) * 60, -560 + 900 * s * s, 28, 6); }
      ctx.restore();
      txt(ctx, 'begitu duit gampang', 120, -230, t, A.duit2 - .3, SRF(52));
      fall(ctx, 'BERHENTI NGALIR', 120, -80, t, A.berhenti - .1, DSP(130));
      txt(ctx, 'yang bertahan hidup cuma', 120, 40, t, A.bertahan - .3, SRF(46), { col: ivo(.85) });
      markLine(ctx, 'bisnis yang punya ', 'pelanggan', '', 120, 150, t, A.bertahan + .6, A.pelanggan2, SRF(58), { align: 'left' });
    } },
  ];
  for (const s of ST) if (!Number.isFinite(s.at)) throw new Error('station key missing: ' + s.draw);

  let FULLS;
  return makeChapter({ B, ST, load, label: 'BAB 4 · DARI NVIDIA KE DOMPET KITA',
    over(o, t) {                                                // Embun Beku: frost from the edges (under the fulls)
      const k1 = E.outCubic(inv(A.habis - .1, A.habis + 1.4, t)) * (1 - inv(A.lihat - .35, A.lihat + .1, t));
      if (k1 > 0) frost(o, 600 * E.outCubic(inv(A.habis - .1, A.habis + 2.6, t)), k1);
      const k2 = E.outCubic(inv(A.kedinginan - .15, A.kedinginan + .9, t)) * (1 - inv(A.pelajarannya - .1, A.pelajarannya + .5, t));
      if (k2 > 0) frost(o, 420 * E.outCubic(inv(A.kedinginan - .15, A.kedinginan + 1.8, t)), .85 * k2);
    },
    full: () => FULLS ??= [
      { im: IM.dup, t0: A.ujung - .1, t1: A.itu + .75, dir: 1, tab: 'thedailyupside.com · 2 Agu 2026', crop: [.24, .05, .74, .9], hl: [[.62, .12, .36, .14, A.ujung + .35], [.07, .30, .86, .14, A.hp3]] },
      { im: IM.kompas, t0: A.ada2 - .1, t1: A.chip2 - .1, dir: -1, dark: true, tab: 'kompas.id · 20 Jul 2026', crop: [.28, .05, .62, .85], hl: [[.10, .165, .40, .13, A.juli + .1], [.19, .74, .68, .07, A.juli + 1.2]] },
      { im: IM.jg, t0: A.batam - .1, t1: A.nvidia + 1.9, dir: 1, tab: 'jakartaglobe.id · 14 Jul 2026', crop: [.1, .06, .55, .5], hl: [[.06, .14, .36, .11, A.firmus + .1], [.06, .26, .45, .11, A.nvidia + .3]] },
      { im: IM.bis, t0: A.lihat - .1, t1: A.th2025 - .1, dir: -1, tab: 'bisnis.com · 27 Okt 2026', crop: [0, 0, 1, .55], hl: [[.61, .25, .27, .21, A.suntikan], [.03, .49, .43, .22, A.startup2]] },
    ] });
}
