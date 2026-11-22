// Bab 5 (VO 08): Apa artinya buat kita di Indonesia — dunia siang hangat (pasir), mata mesin = panel tinta berisi glyph.
// timbangan huruf Inggris vs Indonesia → Common Crawl (tanpa sorot persen) → ekor bahasa daerah (keping A02) → Sahabat-AI 70 M
// parameter + jaringan sel → terima kasih dalam 5 bahasa → kabel: butuh bacaan lokal ASLI → RPerpres (JDIH) → Kontan: tunggu
// tanda tangan → umpan fiktif dibaca batang pindai jadi glyph → setelan akun fiktif + gembok → ketik: internet penuh tulisan mesin,
// tangan ASLI pulih → Nature (halaman penuh) → kolase A04: tiap foto lahir sebagai glyph lalu PULIH SEL → PENJAGA, kamera mundur.
// Teknik baru "Pulih Sel": sel glyph mesin kembali jadi foto asli sel demi sel, gelombang dari pusat dengan muka lime.
import B from './beats.js';
import { clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, rnd, mk, DISP, SER, MONO, theme, timing, makeChapter,
  loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone, INK, BGRGB, CARD, CARD_INK } from './kit.js';
import { kq, popAt } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const ACC = '#4B6800', PANEL = '#15120D', PAPER = '#FBF8F1', TXT = '#1A140C', SUB = '#7A7264';

// ── mata mesin: glyph atlas + 6-cell shape match (from tes-mata) ─────────────────────────────────────────────
const CW = 12, CH = 20, CHARS = ' .,:;\'"-_=+*^~!/\\|()[]<>ilIjtfrcxvzoaeumnwOQ0#%@';
const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d', { willReadFrequently: true })]; };
let GI, GL, GD, VEC;
function atlas(ink) {
  const [a, g] = mk(CW * CHARS.length, CH); g.font = `400 ${CH * .85}px "${MONO}"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = ink;
  [...CHARS].forEach((ch, i) => g.fillText(ch, (i + .5) * CW, CH / 2)); return a;
}
function initGlyphs() {
  GI = atlas(IVORY); GL = atlas(LIME); GD = atlas(TXT);
  const [c, g] = cv(GI.width, CH); g.drawImage(GI, 0, 0); const d = g.getImageData(0, 0, GI.width, CH).data;
  VEC = [...CHARS].map((_, i) => { const v = [0, 0, 0, 0, 0, 0];
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) v[(x * 2 / CW | 0) + 2 * (y * 3 / CH | 0)] += d[4 * (y * c.width + i * CW + x) + 3] / 255;
    return v; });
  for (let k = 0; k < 6; k++) { const m = Math.max(...VEC.map(v => v[k])) || 1; VEC.forEach(v => v[k] /= m); }
}
let PK = 0;
function match(v) {                                          // best glyph for a 6-cell brightness vector (PK = its peak)
  PK = 0; for (let k = 0; k < 6; k++) if (v[k] > PK) PK = v[k]; if (PK < .03) return -1;
  for (let k = 0; k < 6; k++) v[k] = (v[k] / PK) ** 1.5 * PK;
  let best = 0, bd = 1e9;
  for (let j = 0; j < VEC.length; j++) { const g = VEC[j]; let e = 0; for (let k = 0; k < 6; k++) { const q = g[k] - v[k]; e += q * q; } if (e < bd) { bd = e; best = j; } }
  return best;
}
const BUF = {};
const buf = (key, w, h) => { let b = BUF[key]; if (!b || b[0].width !== w || b[0].height !== h) b = BUF[key] = cv(w, h); return b; };
const lum = (d, i) => (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255;
// what the machine weighs: f(L, Lb) per pixel (Lb = local mean) → glyph index + peak per cell of a cols × rows grid over (sx, sy, sw, sh)
function analyse(src, sx, sy, sw, sh, cols, rows, f, bl = 3, key = 'x') {
  const w = 4 * cols, h = 6 * rows, [A, a] = buf(key + 'a', w, h), [, b] = buf(key + 'b', w, h);
  a.clearRect(0, 0, w, h); a.imageSmoothingQuality = 'high'; a.drawImage(src, sx, sy, sw, sh, 0, 0, w, h);
  b.clearRect(0, 0, w, h); b.filter = `blur(${bl}px)`; b.drawImage(A, 0, 0); b.filter = 'none';
  const d = a.getImageData(0, 0, w, h).data, e = b.getImageData(0, 0, w, h).data;
  const idx = new Int16Array(cols * rows), pk = new Float32Array(cols * rows), v = [0, 0, 0, 0, 0, 0];
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    v.fill(0);
    for (let yy = 0; yy < 6; yy++) for (let xx = 0; xx < 4; xx++) {
      const i = 4 * ((6 * r + yy) * w + 4 * q + xx), al = d[i + 3] / 255; if (al < .05) continue;
      v[(xx >> 1) + 2 * (yy >> 1)] += al * f(lum(d, i), lum(e, i)) / 4;
    }
    idx[r * cols + q] = match(v); pk[r * cols + q] = PK;
  }
  return { idx, pk };
}
const PHOTO = (L, Lb) => clamp(.85 * L ** 1.3 + 3.5 * Math.abs(L - Lb));        // photos: light + edges
const LIVE = (L, Lb) => clamp(1.5 * L + 4 * Math.abs(L - Lb));                    // dark footage: lift the light
const UI = (L, Lb) => clamp(1.15 * (1 - L) + 2.2 * Math.abs(L - Lb));            // white UI: ink + edges, paper → empty

// a photo the machine reads: P = graded photo over its baked shadow, G = ink panel + ivory glyphs, L = same with lime glyphs
function piece(img, sh, o) {
  const s = o.w / img.width, w = Math.round(o.w), h = Math.round(img.height * s), pad = Math.round((o.pad || 0) * s);
  const ix = pad, iy = pad, iw = w - 2 * pad, ih = h - 2 * pad, cols = Math.floor(iw / CW), rows = Math.floor(ih / CH);
  const ox = ix + Math.floor((iw - cols * CW) / 2), oy = iy + Math.floor((ih - rows * CH) / 2);
  const [P, p] = mk(w, h); p.imageSmoothingQuality = 'high'; if (sh) p.drawImage(sh, 0, 0, w, h);
  p.filter = o.grade || 'saturate(.86) contrast(1.05)'; p.drawImage(img, 0, 0, w, h); p.filter = 'none';
  const res = analyse(img, ox / s, oy / s, cols * CW / s, rows * CH / s, cols, rows, o.f || PHOTO, o.bl ?? 3, 'pc');
  const [G, g] = mk(w, h), [L, l] = mk(w, h);
  for (const [c, at] of [[g, GI], [l, GL]]) {
    c.fillStyle = PANEL; c.fillRect(ix, iy, iw, ih);
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { const i = r * cols + q, j = res.idx[i]; if (j < 0) continue;
      c.globalAlpha = at === GL ? 1 : .25 + .75 * res.pk[i]; c.drawImage(at, j * CW, 0, CW, CH, ox + q * CW, oy + r * CH, CW, CH); }
    c.globalAlpha = 1;
  }
  return { P, G, L, w, h, ix, iy, iw, ih, cols, rows, ox, oy, C: mk(w, h), fi: -1, rt: null };
}
// Pulih Sel: each cell's restore time grows with its distance from (cx, cy) (fractions), jittered
function ripple(pc, tr, cx = .5, cy = .5, spread = .55, seed = 0) {
  const n = pc.cols * pc.rows, rt = new Float32Array(n), X = cx * pc.cols, Y = cy * pc.rows * CH / CW; let md = 1;
  for (let r = 0; r < pc.rows; r++) for (let q = 0; q < pc.cols; q++) { const d = Math.hypot(q + .5 - X, (r + .5) * CH / CW - Y); rt[r * pc.cols + q] = d; if (d > md) md = d; }
  for (let i = 0; i < n; i++) rt[i] = tr + rt[i] / md * spread + .08 * rnd(i * 1.37 + seed);
  pc.rt = rt; return pc;
}
// per frame: photo, then glyph cells (before their restore time) and the lime wavefront (the last .12 s before it), merged in row runs
function compose(pc, t) {
  const fi = Math.round(t * 30); if (pc.fi === fi) return pc.C[0]; pc.fi = fi;
  const [C, c] = pc.C, rt = pc.rt; c.clearRect(0, 0, pc.w, pc.h); c.drawImage(pc.P, 0, 0);
  const st = i => t < rt[i] - .12 ? 1 : t < rt[i] ? 2 : 0;
  for (let r = 0; r < pc.rows; r++) {
    let q0 = 0, s0 = st(r * pc.cols);
    for (let q = 1; q <= pc.cols; q++) { const s = q < pc.cols ? st(r * pc.cols + q) : -1; if (s === s0) continue;
      if (s0 > 0) { const x0 = q0 === 0 ? pc.ix : pc.ox + q0 * CW, x1 = q === pc.cols ? pc.ix + pc.iw : pc.ox + q * CW,
        y0 = r === 0 ? pc.iy : pc.oy + r * CH, y1 = r === pc.rows - 1 ? pc.iy + pc.ih : pc.oy + (r + 1) * CH;
        c.drawImage(s0 === 1 ? pc.G : pc.L, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0); }
      q0 = q; s0 = s; }
  }
  return C;
}
function padOf(c) {                                           // transparent margin of an Ahpo layer (scan the middle row)
  const [, g] = cv(c.width, 1); g.drawImage(c, 0, c.height >> 1, c.width, 1, 0, 0, c.width, 1); const d = g.getImageData(0, 0, c.width, 1).data;
  for (let x = 0; x < c.width >> 1; x++) if (d[4 * x + 3] > 200) return x; return 0;
}
function shadowed(img, pad, o = {}) {                        // a plain photo on a padded canvas with a soft drop shadow
  const [c, g] = mk(img.width + 2 * pad, img.height + 2 * pad), [s, h] = mk(c.width, c.height);
  h.shadowColor = `rgba(40,25,5,${o.a ?? .45})`; h.shadowBlur = pad * .8; h.shadowOffsetY = pad * .35; h.fillStyle = '#000'; h.fillRect(pad, pad, img.width, img.height);
  h.shadowColor = 'transparent'; h.globalCompositeOperation = 'destination-out'; h.fillRect(pad, pad, img.width, img.height);
  g.drawImage(img, pad, pad); return [c, s];
}
function cover(g, im, x, y, w, h, r = 0) {                   // centre-crop an image into a rect
  const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
  g.save(); if (r) { g.beginPath(); g.roundRect(x, y, w, h, r); g.clip(); }
  g.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, x, y, w, h); g.restore();
}

// ── S1: timbangan huruf ─────────────────────────────────────────────────────────────────────────────────────
const EN = 'theandofinisthatforwithwasonbyfromtheyhavewouldthereabout', ID = 'yangdanditu';
const PILE_EN = [], PILE_ID = [];
{ let j = 0; for (let r = 0; r < 11; r++) { const n = Math.max(2, Math.floor((380 - r * 30) / 19));
    for (let q = 0; q < n; q++, j++) PILE_EN.push({ x: (q - (n - 1) / 2) * 19 + (rnd(j * 3.3) - .5) * 6, y: -r * 21 + (rnd(j * 7.1) - .5) * 4, ch: EN[j % EN.length], rot: (rnd(j * 5.7) - .5) * 36 }); }
  for (let q = 0; q < 10; q++) PILE_ID.push({ x: (q - 4.5) * 19 + (rnd(q * 9.1) - .5) * 6, y: 0, ch: ID[q], rot: (rnd(q * 4.3) - .5) * 36 }); }

// ── S4a: jaringan sel ───────────────────────────────────────────────────────────────────────────────────────
const NODES = [], LINKS = [];
for (let r = 0; r < 6; r++) for (let q = 0; q < 8; q++) { const i = r * 8 + q; if (rnd(i + 300) < .06) continue;
  NODES.push({ x: 300 + q * 80 + (rnd(i + 11) - .5) * 50, y: -80 + r * 84 + (rnd(i + 51) - .5) * 44 }); }
{ const src = NODES.reduce((b, n) => Math.hypot(n.x - 300, n.y - 130) < Math.hypot(b.x - 300, b.y - 130) ? n : b);
  NODES.forEach(n => { n.d = Math.hypot(n.x - src.x, n.y - src.y); });
  for (let a = 0; a < NODES.length; a++) for (let b = a + 1; b < NODES.length; b++) if (Math.hypot(NODES[a].x - NODES[b].x, NODES[a].y - NODES[b].y) < 122) LINKS.push([NODES[a], NODES[b]]); }

const EN_LINES = 'the of and to in is that for it was on with as by at from this are we be or have not but they you all can more', ID_LINES = 'yang dan di ke dari ini itu dengan untuk tidak';
function column(words, n, seed) {                            // a stack of mono text rows (illustration of "how much text")
  const [c, g] = mk(340, n * 22); setFont(g, MN(15, 400), 0); g.fillStyle = TXT; const w = words.split(' ');
  for (let r = 0; r < n; r++) { let s = ''; for (let i = 0; s.length < 34; i++) s += w[Math.floor(rnd(seed + r * 31 + i * 2.3) * w.length)] + ' ';
    g.globalAlpha = .55 + .3 * rnd(seed + r); g.fillText(s.slice(0, 32), 0, r * 22 + 16); }
  return c;
}

// ── S8: umpan fiktif (no platform logo) ───────────────────────────────────────────────────────────────────────
const FEED_W = 760, FEED_H = 2400, WIN_H = 824;
function buildFeed(ph) {
  const [F, f] = mk(FEED_W, FEED_H); f.fillStyle = PAPER; f.fillRect(0, 0, FEED_W, FEED_H);
  const posts = [['RA', 'Rina Ayu', '2 j', ['Akhirnya nyobain soto di pasar lama.', 'Kuahnya juara, antre dikit gapapa.'], null, '#C9B48A'],
    ['PA', 'Putu A.', '3 j', ['Sore tadi mampir ke pura dekat rumah.'], ph.pura, '#A9B38A'],
    ['BP', 'Bayu P.', '5 j', ['Ada yang tahu bengkel jujur', 'di daerah Sleman? Butuh banget.'], null, '#B9A48F'],
    ['SW', 'Sekar W.', '6 j', ['Nulis resep dulu sebelum lupa.'], ph.tulis, '#C4A98C'],
    ['MS', 'Maya S.', '8 j', ['Puding cokelat ala ibu, gampang!'], ph.puding, '#B3B08F'],
    ['JS', 'Joko S.', '1 h', ['Macet lagi. Sabar ya semuanya.'], null, '#BFAE8E']];
  let y = 16;
  for (const [ini, nm, tm, lines, im, col] of posts) {
    f.fillStyle = col; f.beginPath(); f.arc(58, y + 42, 28, 0, 7); f.fill();
    setFont(f, MN(18), 1); f.fillStyle = TXT; f.textAlign = 'center'; f.fillText(ini, 58, y + 49); f.textAlign = 'left';
    setFont(f, MN(21), 0); f.fillText(nm, 102, y + 36); setFont(f, MN(15, 400), 1); f.fillStyle = SUB; f.fillText(`${tm} · Publik`, 102, y + 62);
    y += 104; setFont(f, MN(21, 400), 0); f.fillStyle = TXT; for (const s of lines) { f.fillText(s, 40, y); y += 34; }
    if (im) { cover(f, im, 40, y - 8, 680, 340, 14); y += 350; }
    setFont(f, MN(15, 400), 2); f.fillStyle = SUB; f.fillText('Suka   ·   Komentar   ·   Bagikan', 40, y + 14);
    y += 44; f.fillStyle = 'rgba(26,20,12,.12)'; f.fillRect(0, y, FEED_W, 2); y += 18;
  }
  const cols = Math.floor(FEED_W / CW), rows = Math.floor(FEED_H / CH), res = analyse(F, 0, 0, cols * CW, rows * CH, cols, rows, UI, 2, 'feed');
  const [G, g] = mk(FEED_W, FEED_H), [L, l] = mk(FEED_W, FEED_H);
  for (const [c, at] of [[g, GI], [l, GL]]) { c.fillStyle = PANEL; c.fillRect(0, 0, FEED_W, FEED_H);
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) { const i = r * cols + q, j = res.idx[i]; if (j < 0) continue;
      c.globalAlpha = at === GL ? 1 : .25 + .75 * res.pk[i]; c.drawImage(at, j * CW, 0, CW, CH, q * CW, r * CH, CW, CH); }
    c.globalAlpha = 1; }
  return { P: F, G, L, C: mk(FEED_W, WIN_H), fi: -1 };
}

function padlock(ctx, x, y, s, open, col, hole) {           // line-art padlock, body centre (x, y); open 0 → 1 lifts the shackle
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = col; ctx.lineWidth = s * .17; ctx.lineCap = 'butt';
  ctx.save(); ctx.translate(0, -s * .32 * open); ctx.beginPath(); ctx.moveTo(-s * .4, -s * .1 + s * .32 * open); ctx.lineTo(-s * .4, -s * .5);
  ctx.arc(0, -s * .5, s * .4, Math.PI, 0); ctx.lineTo(s * .4, -s * .1); ctx.stroke(); ctx.restore();
  ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-s * .68, -s * .2, s * 1.36, s * 1.05, s * .12); ctx.fill();
  ctx.fillStyle = hole; ctx.beginPath(); ctx.arc(0, s * .22, s * .13, 0, 7); ctx.fill(); ctx.fillRect(-s * .05, s * .25, s * .1, s * .3); ctx.restore();
}

export function makeFilm() {
  theme(true, { bg: '#EBD2A6', bgrgb: '235,210,166', ink: '#1A140C', inkrgb: '26,20,12', vig: .2 });
  const { T: A } = timing(B);
  const IM = {}, PC = {};
  let VC, VK, FEED, COL_EN, COL_ID;
  const A02 = [['A02-4_naskah-Jawa-Babad_H3-3', 'JAWA', -330, 230], ['A02-2_daun-lontar-Bali-a_H3-2', 'BALI', -80, 190],
    ['A02-5_lembar-Lontara_H3-4', 'BUGIS', 150, 160], ['A02-6_pustaha-Batak_H3-5', 'BATAK', 360, 130], ['A02-8_aksara-Bali-emas_B3-4', '', 540, 110],
    ['A02-7_aksara-Jawa-papan_B3-1', '', 690, 90], ['A02-1_tumpukan-lontar_H3-1', '', 800, 75], ['A02-3_daun-lontar-Bali-b_H3-2', '', 880, 60]];
  // finale collage: [file, local width, x, y, dz, restore time, caption, rotation]
  const KOL = [['A04-1_warung-tegal_B1-1', 560, -560, -150, 0, A.warung + .05, 'ulasan warung', -1.5],
    ['A04-2_warung-bakmi-Jawa_B1-2', 430, -120, 250, -100, A.kampungmu, 'warung di kampungmu', 1.2],
    ['H2_1', 300, 250, -150, 60, A.resep + .1, 'resep nenek', 2],
    ['A04-5_papan-jalan-Braga-aksara-Sunda_B3-2', 470, 590, 190, -60, A.sunda2 - .05, 'aksara Sunda', -1.8],
    ['A04-6_papan-aksara-Lontara-Makassar_B3-3', 480, -690, 300, 120, A.bugis - .05, 'aksara Lontara · Bugis', 1.5],
    ['A04-4_papan-aksara-Jawa-Sleman_B3-1', 420, 640, -300, 160, A.cerita, '', 1],
    ['A04-7_prasasti-aksara-Bali_B3-4', 360, -60, -400, 180, A.itu, '', -1.2],
    ['A04-3_angkringan-malam_B1-3', 250, -380, -470, 220, A.bukan, '', 2.5]];

  async function load() {
    await document.fonts.load(`400 20px "${MONO}"`); initGlyphs();
    const K = '../assets/shared/kutipan/', AH = '../assets/shared/ahpo/', HU = '../assets/shared/humanis/', VD = '../assets/shared/vid/';
    const jobs = [
      ...Object.entries({ cc: 'commoncrawl-statistics-of-common-crawl-monthly-2.png', goto: 'gotocompany-sahabat-ai-gets-smarter-indosat-and-goto.png',
        jdih: 'jdih-berita-2.png', kontan: 'nasional-dua-perpres-ai-tinggal-tunggu-tanda.png', nature: 'nature-ai-models-collapse-when-trained-on.png' })
        .map(async ([k, f]) => { IM[k] = await loadImg(K + f, 1800); }),
      ...A02.map(async a => { IM[a[0]] = await loadImg(AH + 'A02/' + a[0] + '.png', 900); IM[a[0] + 'sh'] = await loadImg(AH + 'A02/' + a[0] + '_bayangan.png', 900); }),
      ...KOL.filter(k => k[0].startsWith('A04')).map(async k => { IM[k[0]] = await loadImg(AH + 'A04/' + k[0] + '.png', 1400); IM[k[0] + 'sh'] = await loadImg(AH + 'A04/' + k[0] + '_bayangan.png', 1400); }),
      ...['H2_1', 'H2_2', 'B3_4', 'B2_1'].map(async n => { IM[n] = await loadImg(HU + n + '.jpg', 900); }),
      (async () => { VC = await loadVid(VD, 'kabel3'); VK = await loadVid(VD, 'ketik2'); })()];
    await Promise.all(jobs);
    for (const [f, w, , , , tr] of KOL) {
      if (f === 'H2_1') { const [c, s] = shadowed(IM.H2_1, 60); PC[f] = piece(c, s, { w: w * c.width / IM.H2_1.width, pad: 60 }); }
      else PC[f] = piece(IM[f], IM[f + 'sh'], { w, pad: padOf(IM[f]) });
      ripple(PC[f], tr, .5, .5, .55, w);
    }
    FEED = buildFeed({ pura: IM.B3_4, tulis: IM.H2_2, puding: IM.B2_1 });
    COL_EN = column(EN_LINES, 34, 11); COL_ID = column(ID_LINES, 3, 71);
  }

  // ── S1 helpers ─────────────────────────────────────────────────────────────────────────────────────────────
  const PILE = {};
  function pile(key, P, t0, span, t) {                       // a pan's glyph heap, falling in one by one (offscreen, cached per frame)
    const fi = Math.round(t * 30); let o = PILE[key]; if (!o) o = PILE[key] = { C: mk(460, 900), fi: -1 };
    if (o.fi !== fi) { o.fi = fi; const [, g] = o.C; g.clearRect(0, 0, 460, 900); setFont(g, MN(22), 0); g.fillStyle = TXT; g.textAlign = 'center';
      P.forEach((p, j) => { const ta = t0 + span * (j / P.length) ** .85, u = inv(ta, ta + .5, t); if (u <= 0) return;
        g.save(); g.globalAlpha = clamp(u * 4); g.translate(230 + p.x, 860 + p.y - 600 * (1 - u * u)); g.rotate(p.rot * u * D2R); g.fillText(p.ch, 0, 0); g.restore(); }); }
    return o.C[0];
  }
  function balance(ctx, t) {
    const kb = E.outQuint(inv(A.stok - .15, A.stok + .4, t)); if (kb <= 0) return;
    const th = 5.5 * E.outCubic(inv(A.stok, A.mana, t)) - inv(A.indonesia, A.mana, t) + (t > A.tipis - .05 ? 6 * spring(t - A.tipis + .05, .35, .45) : 0) + .4 * Math.sin(2.1 * t);
    const ang = -th * D2R, px = 0, py = -180, a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * clamp(kb * 1.5); ctx.save(); ctx.translate(0, (1 - kb) * 80);
    ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, 320); ctx.stroke();                            // post + foot
    ctx.beginPath(); ctx.moveTo(-170, 336); ctx.lineTo(170, 336); ctx.lineTo(120, 316); ctx.lineTo(-120, 316); ctx.closePath(); ctx.fill();
    const ends = [-1, 1].map(sg => ({ sg, x: px + sg * 580 * Math.cos(ang), y: py + sg * 580 * Math.sin(ang) }));
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.fillRect(-590, -6, 1180, 12); ctx.fillRect(-596, -16, 12, 32); ctx.fillRect(584, -16, 12, 32); ctx.restore();
    ctx.beginPath(); ctx.arc(px, py, 18, 0, 7); ctx.fill(); ctx.fillStyle = BG_(); ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill(); ctx.fillStyle = INK;
    for (const e of ends) {
      const rx = e.x, ry = e.y + 210; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.lineTo(rx - 170, ry); ctx.moveTo(e.x, e.y); ctx.lineTo(rx + 170, ry); ctx.stroke();
      const pc = e.sg < 0 ? pile('en', PILE_EN, A.stok + .1, 2.9, t) : pile('id', PILE_ID, A.indonesia + .3, 1.8, t);
      ctx.drawImage(pc, rx - 230, ry + 34 - 860);
      ctx.beginPath(); ctx.moveTo(rx - 200, ry); ctx.quadraticCurveTo(rx, ry + 128, rx + 200, ry); ctx.closePath(); ctx.fill();
      const lab = e.sg < 0 ? 'BAHASA INGGRIS' : 'BAHASA INDONESIA'; setFont(ctx, MN(22), 4); ctx.textAlign = 'center';
      ctx.globalAlpha = a0 * clamp(kb * 1.5) * kq(t, e.sg < 0 ? A.stok + .2 : A.indonesia, .4); ctx.fillText(lab, rx, ry + 112);
      if (e.sg > 0) { const w = ctx.measureText(lab).width; ctx.fillStyle = LIME; ctx.fillRect(rx - w / 2 - 26, ry + 95, 14, 14); ctx.fillStyle = INK; }
      ctx.globalAlpha = a0 * clamp(kb * 1.5); ctx.textAlign = 'left';
    }
    ctx.restore(); ctx.globalAlpha = a0;
  }
  const BG_ = () => `rgb(${BGRGB})`;

  // ── S8 / S10 per-frame composites ──────────────────────────────────────────────────────────────────────────
  const feedScroll = t => Math.round(1400 * E.inOutSine(inv(A.meta, A.artinya + .3, t)));
  const feedGlyph = t => { const sc = feedScroll(t); return sc + (WIN_H + CH) * E.inOutCubic(inv(A.postingan - .1, A.ngelatih2, t)); };
  function feedWin(t) {
    const fi = Math.round(t * 30), [C, c] = FEED.C; if (FEED.fi === fi) return C; FEED.fi = fi;
    const sc = feedScroll(t), gy = feedGlyph(t), rb = Math.floor(gy / CH) * CH;
    c.drawImage(FEED.P, 0, sc, FEED_W, WIN_H, 0, 0, FEED_W, WIN_H);
    if (rb > sc) c.drawImage(FEED.G, 0, sc, FEED_W, Math.min(WIN_H, rb - sc), 0, 0, FEED_W, Math.min(WIN_H, rb - sc));
    if (gy > sc && rb - sc < WIN_H) c.drawImage(FEED.L, 0, rb, FEED_W, CH, 0, rb - sc, FEED_W, CH);
    return C;
  }
  const S10 = { O: null, fi: -1, gt: null, rt: null };
  const PC_ = 133, PR_ = 45, HX = 720, HY = 530;            // ketik2 plate grid; hands centre in the offscreen
  function typing(t) {
    const fi = Math.round(t * 30); if (!S10.O) S10.O = mk(1640, 940); const [O, o] = S10.O; if (S10.fi === fi) return O; S10.fi = fi;
    o.clearRect(0, 0, 1640, 940); plate(o, VK, t, 820, 470, 1600, 900, 1, { t0: A.tapi2 - .5, dim: .05, vig: .25, marks: false, grade: 'brightness(1.7) contrast(1.15) saturate(.8)' });
    if (t < A.makin - .1) return O;
    if (!S10.gt) { const n = PC_ * PR_; S10.gt = new Float32Array(n); S10.rt = new Float32Array(n);
      for (let r = 0; r < PR_; r++) for (let q = 0; q < PC_; q++) { const i = r * PC_ + q, d = Math.hypot(22 + q * CW + 6 - HX, 20 + r * CH + 10 - HY);
        S10.gt[i] = A.makin + .7 * (r / PR_) + .35 * rnd(i * .71); S10.rt[i] = d < 520 ? A.asli - .05 + d / 520 * .65 + .06 * rnd(i * 1.9) : 1e9; } }
    const res = analyse(O, 22, 20, PC_ * CW, PR_ * CH, PC_, PR_, LIVE, 2, 'live'), gt = S10.gt, rt = S10.rt;
    const st = i => t < gt[i] ? 0 : t < gt[i] + .1 ? 2 : t < rt[i] - .12 ? 1 : t < rt[i] ? 2 : 0;
    o.fillStyle = PANEL;
    for (let r = 0; r < PR_; r++) { let q0 = -1;
      for (let q = 0; q <= PC_; q++) { const on = q < PC_ && st(r * PC_ + q) > 0;
        if (on && q0 < 0) q0 = q; else if (!on && q0 >= 0) { o.fillRect(22 + q0 * CW, 20 + r * CH, (q - q0) * CW, CH); q0 = -1; } } }
    for (let r = 0; r < PR_; r++) for (let q = 0; q < PC_; q++) { const i = r * PC_ + q, s = st(i); if (!s) continue; const j = res.idx[i]; if (j < 0) continue;
      o.globalAlpha = s === 2 ? 1 : .25 + .75 * res.pk[i]; o.drawImage(s === 2 ? GL : GI, j * CW, 0, CW, CH, 22 + q * CW, 20 + r * CH, CW, CH); }
    o.globalAlpha = 1; return O;
  }
  const shade = (ctx, on) => { if (on) { ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 22; } else { ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; } };
  const tail = x => 330 - 700 / (1 + Math.max(0, (x + 860) / 110) ** 1.3);

  const ST = [
    { at: 0, name: 'Timbangan huruf', draw(ctx, t) {
        const k = E.inOutQuart(inv(A.langka + .1, A.stok - .05, t)), sc = lerp(1, .36, k);
        ctx.save(); ctx.translate(0, lerp(-20, -430, k)); ctx.scale(sc, sc);
        ctx.globalAlpha = 1 - k; fall(ctx, 'BAB 5', 0, -170, t, .1, MN(30), { align: 'center', ls: 10 }); ctx.globalAlpha = 1;
        fall(ctx, 'APA ARTINYA BUAT KITA', 0, 40, t, .2, DSP(210), { align: 'center', ls: 2 });
        txt(ctx, 'di Indonesia?', 0, 160, t, .6, SRF(100), { align: 'center' }); ctx.restore();
        balance(ctx, t);
        txt(ctx, 'Banyak,', -18, 440, t, A.banyak - .05, SRF(66), { align: 'right' });
        txt(ctx, 'atau tipis?', 18, 440, t, A.atau - .05, SRF(66));
      } },
    { at: A.menurut, via: 'whip', name: 'Common Crawl', draw(ctx, t) {
        const k = E.inOutCubic(inv(A.porsi - .1, A.porsi + .5, t)), s = lerp(1, .6, k);
        ctx.save(); ctx.translate(lerp(-420, -560, k), lerp(10, -40, k)); ctx.scale(s, s); ctx.globalAlpha = lerp(1, .6, k);
        evid(ctx, IM.cc, 0, 0, 900, t, A.menurut - .05, { crop: [.17, .05, .67, .95], tab: 'commoncrawl.org', hl: [[.424, .029, .40, .045, A.statistik]] });
        ctx.restore(); ctx.globalAlpha = 1;
        const g = gone(t, A.porsi - .2, .3);
        if (g > 0) { ctx.globalAlpha = g; typeOn(ctx, 'COMMON CRAWL', 120, -210, t, A.common - .05, MN(52), { cps: 30, ls: 2 });
          txt(ctx, 'arsip web raksasa', 120, -120, t, A.arsip, SRF(60)); txt(ctx, 'buat ngelatih AI', 120, -50, t, A.ngelatih, SRF(60)); ctx.globalAlpha = 1; }
        if (t > A.porsi) {
          const ne = 34 * E.outCubic(inv(A.porsi + .1, A.inggris + .2, t)), ni = 3 * E.outCubic(inv(A.indonesia2 - .1, A.indonesia2 + .4, t));
          if (ne > .05) ctx.drawImage(COL_EN, 0, (34 - ne) * 22, 340, ne * 22, 60, 360 - ne * 22, 340, ne * 22);
          if (ni > .05) ctx.drawImage(COL_ID, 0, (3 - ni) * 22, 340, ni * 22, 520, 360 - ni * 22, 340, ni * 22);
          ctx.fillStyle = INK; ctx.fillRect(60, 366, 340, 4); ctx.fillRect(520, 366, 340, 4);
          txt(ctx, 'INGGRIS', 230, 432, t, A.porsi + .2, DSP(64), { align: 'center' }); txt(ctx, 'INDONESIA', 690, 432, t, A.indonesia2 - .1, DSP(64), { align: 'center' });
          const kj = E.outQuint(inv(A.jauh - .05, A.jauh + .55, t));
          if (kj > 0) { const y0 = 360 - 3 * 22, y1 = lerp(y0, 360 - 34 * 22, kj); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
            ctx.beginPath(); ctx.moveTo(420, y1); ctx.lineTo(890, y1); ctx.stroke(); ctx.setLineDash([]);
            ctx.beginPath(); ctx.moveTo(880, y0 - 10); ctx.lineTo(880, y1 + 4); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(868, y0 - 24); ctx.lineTo(880, y0 - 8); ctx.lineTo(892, y0 - 24); ctx.stroke(); }
          txt(ctx, 'jauh di bawah', 860, -40, t, A.bawah - .05, SRF(50), { align: 'right' });
          txt(ctx, 'ilustrasi · bukan skala', 880, -420, t, A.porsi + .3, MN(18), { align: 'right', a: .7 });
        }
        srcTag(ctx, 'Sumber: statistik Common Crawl, CC-MAIN-2026-43, diakses 15 Nov 2026', -880, 456, t, A.statistik);
      } },
    { at: A.gimana, via: 'rise', name: 'Ekor bahasa daerah', draw(ctx, t) {
        const px = lerp(260, -260, E.inOutSine(inv(A.gimana - .3, A.celah, t))), kd = E.outCubic(inv(A.gimana - .1, A.daerah + .6, t)), xe = lerp(-860, 900, kd);
        ctx.save(); ctx.translate(px, 0);
        ctx.fillStyle = INK; ctx.fillRect(-880, 342, 1800, 3);
        ctx.beginPath(); ctx.moveTo(-860, 342); for (let x = -860; x <= xe; x += 14) ctx.lineTo(x, tail(x)); ctx.lineTo(xe, 342); ctx.closePath(); ctx.fillStyle = ivo(.08); ctx.fill();
        ctx.beginPath(); for (let x = -860; x <= xe; x += 14) { const y = tail(x); ctx.rect(x - 3.5, y - 3.5, 7, 7); } ctx.fillStyle = INK; ctx.fill();
        txt(ctx, 'INGGRIS', -836, -392, t, A.gimana - .1, MN(22), { ls: 4 });
        txt(ctx, 'INDONESIA', -660, 36, t, A.gimana + .3, MN(22), { ls: 4 });
        A02.forEach(([f, lab, x, hh], i) => {
          const im = IM[f], asp = im.width / im.height, w = Math.min(260, hh * asp), h = w / asp, cy = tail(x), t0 = A.daerah + i * .16;
          if (t < t0) return; const al = [1, .95, .9, .8, .7, .55, .45, .35][i];
          ctx.globalAlpha = al * clamp((t - t0) / .15); ctx.strokeStyle = INK; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy - 30 * kq(t, t0, .3)); ctx.stroke(); ctx.globalAlpha = 1;
          popAt(ctx, x, cy - 30 - h / 2, t, t0, () => { ctx.globalAlpha *= al; ctx.drawImage(IM[f + 'sh'], -w / 2, -h / 2, w, h); ctx.drawImage(im, -w / 2, -h / 2, w, h); }, { rise: 30, from: .7 });
          if (lab) txt(ctx, lab, x, cy + 44, t, t0 + .1, MN(20), { align: 'center', ls: 3 });
        });
        ctx.restore();
        txt(ctx, 'BAHASA DAERAH?', 880, -300, t, A.daerah - .05, DSP(120), { align: 'right' });
        fall(ctx, 'LEBIH TIPIS LAGI', 880, -160, t, A.tipis2 - .05, DSP(150), { align: 'right' });
        slab(ctx, 'OPINI NARATOR', 880, -436, t, A.wah - .05, { size: 18, align: 'right' });
        txt(ctx, 'ilustrasi', 880, 392, t, A.daerah, MN(16), { align: 'right', a: .6 });
      } },
    { at: A.celah, via: 'whip', name: 'Sahabat-AI', draw(ctx, t) {
        evid(ctx, IM.goto, -360, -220, 1000, t, A.celah - .05, { crop: [.2, .5, .6, .34], rot: -1.5, tab: 'gotocompany.com',
          hl: [[.668, .37, .232, .15, A.tujuh], [.24, .545, .24, .15, A.parameter]] });
        slab(ctx, 'SAHABAT-AI · GOTO × INDOSAT', -860, -10, t, A.sahabat - .05, { size: 24 });
        if (t > A.tujuh - .05) { txt(ctx, String(Math.round(countTo(0, 70, t, A.tujuh - .05, .55))), -860, 300, t, A.tujuh - .05, DSP(280), { dur: .2 });
          txt(ctx, 'MILIAR', -600, 205, t, A.miliar - .05, DSP(110)); txt(ctx, 'PARAMETER', -600, 300, t, A.parameter - .05, DSP(110), { col: ACC }); }
        const km = kq(t, A.parameter - .2, .6);
        if (km > 0) {
          const lit = n => t > A.sel + n.d / 700, a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * km;
          ctx.beginPath(); for (const [a, b] of LINKS) if (!(lit(a) && lit(b))) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); } ctx.strokeStyle = ivo(.24); ctx.lineWidth = 1.6; ctx.stroke();
          ctx.beginPath(); for (const [a, b] of LINKS) if (lit(a) && lit(b)) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); } ctx.strokeStyle = ACC; ctx.lineWidth = 3; ctx.stroke();
          ctx.fillStyle = INK; LINKS.forEach(([a, b], i) => { if (!(lit(a) && lit(b))) return; const u = ((t - A.sel - Math.max(a.d, b.d) / 700) * 1.3 + rnd(i)) % 1;
            ctx.fillRect(lerp(a.x, b.x, u) - 3, lerp(a.y, b.y, u) - 3, 6, 6); });
          for (const n of NODES) { if (lit(n)) { const p = Math.min(1.25, spring(t - A.sel - n.d / 700, .5, .3)); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(n.x, n.y, 9 * p, 0, 7); ctx.fill();
              ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke(); } else { ctx.fillStyle = ivo(.4); ctx.beginPath(); ctx.arc(n.x, n.y, 5, 0, 7); ctx.fill(); } }
          ctx.globalAlpha = a0;
        }
        txt(ctx, 'ibarat sel penghubung di otak buatan', 880, 432, t, A.ibarat, SRF(44), { align: 'right' });
        srcTag(ctx, 'Sumber: GoTo, 2 Jun 2025', -860, 456, t, A.celah + .3);
      } },
    { at: A.rilis, via: 'push', name: 'Lima bahasa', draw(ctx, t) {
        const g = gone(t, A.dia - .25, .3);
        if (g > 0) { ctx.globalAlpha = g; txt(ctx, 'RILIS', 0, -190, t, A.rilis - .1, MN(40), { align: 'center', ls: 14 });
          fall(ctx, 'JUNI 2025', 0, 80, t, A.juni - .05, DSP(260), { align: 'center', ls: 4 }); ctx.globalAlpha = 1; }
        typeOn(ctx, 'RILIS JUNI 2025 · TERIMA KASIH DALAM 5 BAHASA', -860, -400, t, A.dia, MN(22), { cps: 50, ls: 2 });
        const W5 = [['INDONESIA', 'terima kasih', A.indonesia3], ['JAWA', 'matur nuwun', A.jawa], ['SUNDA', 'hatur nuhun', A.sunda], ['BALI', 'suksma', A.bali], ['BATAK', 'mauliate', A.batak]];
        W5.forEach(([w, s, t0], i) => { const y = -250 + i * 160, nx = W5[i + 1] ? W5[i + 1][2] : 1e9, dim = lerp(1, .5, inv(nx - .1, nx + .2, t));
          if (t < t0 - .05) return; ctx.globalAlpha = dim;
          popAt(ctx, -860, y, t, t0 - .05, () => { setFont(ctx, DSP(150), 2); ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.fillText(w, 0, 0); }, { rise: 40, from: .85 });
          const kr = kq(t, t0 + .05, .4); ctx.fillStyle = INK; ctx.fillRect(-330, y - 40, 70 * kr, 3);
          txt(ctx, s, -240, y - 14, t, t0 + .1, SRF(72)); ctx.globalAlpha = 1; });
        srcTag(ctx, 'Sumber: GoTo, 2 Jun 2025', -860, 456, t, A.dia + .3);
      } },
    { at: A.tapi, via: 'truck', name: 'Bacaan lokal', draw(ctx, t) {
        plate(ctx, VC, t, 0, -20, 1560, 878, E.outQuint(inv(A.tapi - .4, A.tapi + .2, t)), { t0: A.tapi - .6, dim: .5 });
        txt(ctx, 'sepinter apa pun AI lokal kita,', 0, -60, t, A.sepinter, SRF(66), { col: IVORY, align: 'center' });
        markLine(ctx, 'butuh bacaan lokal ', 'ASLI', ' tulisan manusia', 0, 80, t, A.butuh - .05, A.beneran, SRF(84), { col: IVORY });
        txt(ctx, 'BACAAN = DATA LATIH', 0, 180, t, A.bacaan, MN(22), { col: IVORY, align: 'center', ls: 4, a: .8 });
      } },
    { at: A.terus, via: 'rise', name: 'Rancangan Perpres', draw(ctx, t) {
        fall(ctx, 'TERUS, GIMANA ATURANNYA?', -860, -330, t, A.terus, DSP(110));
        typeOn(ctx, '2 RANCANGAN PERPRES', -860, -262, t, A.dua - .05, MN(24), { ls: 3, cps: 40 });
        txt(ctx, 'RPERPRES', -860, -184, t, A.peta - .15, MN(18), { col: ACC, ls: 4 }); fall(ctx, 'PETA JALAN AI', -860, -60, t, A.peta - .05, DSP(150));
        txt(ctx, 'RPERPRES', -860, 54, t, A.etika - .15, MN(18), { col: ACC, ls: 4 }); fall(ctx, 'ETIKA AI', -860, 178, t, A.etika - .05, DSP(150));
        evid(ctx, IM.jdih, 440, 20, 900, t, A.perpres - .1, { crop: [.14, .25, .72, .13], rot: 1.2, tab: 'jdih.komdigi.go.id',
          hl: [[.685, .262, .295, .278, A.rampung], [.377, .565, .262, .268, A.dibahas]] });
        slab(ctx, 'RAMPUNG DIBAHAS · MEI 2026', 40, 250, t, A.mei - .1, { size: 26 });
        srcTag(ctx, 'Sumber: JDIH Komdigi, Mei 2026', -860, 456, t, A.perpres);
      } },
    { at: A.awal, via: 'push', name: 'Tunggu tanda tangan', draw(ctx, t) {
        evid(ctx, IM.kontan, 0, -250, 1180, t, A.awal - .1, { crop: [0, 0, .96, .58], tab: 'nasional.kontan.co.id',
          hl: [[.335, .29, .32, .19, A.tinggal - .05], [.664, .29, .27, .19, A.tanda - .05]] });
        fall(ctx, 'AWAL SEPTEMBER 2026', 0, 40, t, A.september - .05, DSP(90), { align: 'center', ls: 3 });
        const kl = E.outQuint(inv(A.tanda - .1, A.tanda + .6, t));
        if (kl > 0) { ctx.fillStyle = INK; ctx.fillRect(-420, 196, 840 * kl, 3); txt(ctx, '×', -446, 188, t, A.tanda - .1, SRF(60));
          if (t > A.presiden && Math.floor((t - A.presiden) * 2.4) % 2 === 0) ctx.fillRect(-392, 128, 4, 58); }
        txt(ctx, 'TANDA TANGAN PRESIDEN', -420, 238, t, A.presiden - .05, MN(18), { ls: 3 });
        txt(ctx, 'per 4 Sep 2026', 420, 238, t, A.presiden + .2, MN(18, 400), { align: 'right', ls: 1 });
        txt(ctx, 'SAMPAI RISET INI KELAR:', 0, 322, t, A.riset - .2, MN(22), { align: 'center', ls: 3 });
        slab(ctx, 'BELUM ADA BUKTI TERBIT', 0, 386, t, A.belum - .05, { size: 30, align: 'center' });
        srcTag(ctx, 'Sumber: Kontan, 4 Sep 2026', -860, 466, t, A.awal + .4);
      } },
    { at: A.sekarang, via: 'whip', name: 'Postingan publik', draw(ctx, t, c) {
        const ga = gone(t, A.meta - .3, .3);
        if (ga > 0) { ctx.globalAlpha = ga; typeOn(ctx, 'PERTANYAAN BAB 2', 0, -230, t, A.sekarang - .1, MN(24), { align: 'center', ls: 6, cps: 40 });
          txt(ctx, 'Komentar & curhatanmu di medsos?', 0, -110, t, A.sekarang + .1, SRF(84), { align: 'center' });
          fall(ctx, 'JAWABANNYA', 0, 150, t, A.jawaban - .05, DSP(200), { align: 'center', ls: 4 }); ctx.globalAlpha = 1; }
        const kw = E.outQuint(inv(A.meta - .35, A.meta + .3, t));
        if (kw > 0 && c.i >= 7) {
          const a0 = ctx.globalAlpha; ctx.save(); ctx.translate(0, (1 - kw) * 140); ctx.globalAlpha = a0 * clamp(kw * 1.6);
          ctx.shadowColor = 'rgba(40,25,5,.35)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = PAPER;
          ctx.beginPath(); ctx.roundRect(-760, -420, 760, 880, 22); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
          setFont(ctx, MN(20), 1); ctx.fillStyle = TXT; ctx.fillText('Beranda', -730, -384); setFont(ctx, MN(14, 400), 1); ctx.fillStyle = SUB; ctx.textAlign = 'right';
          ctx.fillText('umpan contoh · fiktif', -28, -384); ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(26,20,12,.12)'; ctx.fillRect(-760, -366, 760, 2);
          ctx.save(); ctx.beginPath(); ctx.roundRect(-760, -364, 760, WIN_H, [0, 0, 22, 22]); ctx.clip(); ctx.drawImage(feedWin(t), -760, -364); ctx.restore();
          const sc = feedScroll(t), gy = feedGlyph(t), ly = -364 + Math.floor(gy / CH) * CH + CH - sc;
          if (gy > sc && ly < -364 + WIN_H) { ctx.fillStyle = INK; ctx.fillRect(-760, ly, 760, 3); const ty = ly - 28 < -362 ? ly + 3 : ly - 28; ctx.fillStyle = CARD; ctx.fillRect(-760, ty, 150, 28);
            setFont(ctx, MN(14), 2); ctx.fillStyle = CARD_INK; ctx.fillText('MEMBACA…', -748, ty + 19); }
          ctx.restore(); ctx.globalAlpha = a0;
        }
        slab(ctx, 'META, TERANG-TERANGAN', 80, -330, t, A.meta - .05, { size: 26 });
        fall(ctx, 'POSTINGAN PUBLIK', 80, -170, t, A.postingan - .05, DSP(120));
        typeOn(ctx, 'FACEBOOK · INSTAGRAM', 80, -96, t, A.facebook - .1, MN(28), { cps: 30, ls: 3 });
        fall(ctx, 'FOTO + TULISAN', 80, 40, t, A.foto - .05, DSP(96));
        slab(ctx, '= BAHAN BELAJAR AI', 80, 150, t, A.dipake - .05, { size: 40, lime: true, ls: 2 });
        srcTag(ctx, 'Sumber: Jala Hoaks Pemprov DKI; CNN Indonesia, 17 Apr 2025', 80, 456, t, A.meta + .3);
      } },
    { at: A.artinya, via: 'push', name: 'Akun privat', draw(ctx, t) {
        const k = kq(t, A.artinya - .3, .5);
        if (k > 0) {
          const a0 = ctx.globalAlpha, kp = E.inOutCubic(inv(A.privat - .05, A.privat + .3, t)), kc = clamp(spring(Math.max(0, t - A.gembok + .05), .45, .3));
          ctx.save(); ctx.translate(0, (1 - k) * 100); ctx.globalAlpha = a0 * clamp(k * 1.5);
          ctx.shadowColor = 'rgba(40,25,5,.35)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = PAPER;
          ctx.beginPath(); ctx.roundRect(-760, -410, 760, 820, 26); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
          setFont(ctx, MN(15), 4); ctx.fillStyle = SUB; ctx.fillText('SETELAN · CONTOH FIKTIF', -712, -346);
          setFont(ctx, DSP(78), 1); ctx.fillStyle = TXT; ctx.fillText('Privasi akun', -712, -262);
          const row = (y, lab, sub, t0) => popAt(ctx, -380, y, t, t0, () => {
            setFont(ctx, MN(24), 0); ctx.fillStyle = TXT; ctx.textAlign = 'left'; ctx.fillText(lab, -332, -6); setFont(ctx, MN(15, 400), 1); ctx.fillStyle = SUB; ctx.fillText(sub, -332, 24);
            setFont(ctx, MN(21), 1); ctx.textAlign = 'right'; ctx.fillStyle = kp > .5 ? ACC : TXT; ctx.fillText(kp > .5 ? 'Privat' : 'Publik', 300, 4);
            ctx.fillStyle = SUB; ctx.fillText('›', 332, 4); ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(26,20,12,.12)'; ctx.fillRect(-332, 56, 664, 2); }, { from: .92, rise: 20 });
          row(-170, 'Status', 'Siapa yang bisa lihat statusmu', A.status - .05);
          row(-60, 'Komentar', 'Siapa yang bisa lihat komentarmu', A.komentar - .05);
          popAt(ctx, -380, 60, t, A.keberatan - .1, () => {
            setFont(ctx, MN(24), 0); ctx.fillStyle = TXT; ctx.textAlign = 'left'; ctx.fillText('Akun privat', -332, -6); setFont(ctx, MN(15, 400), 1); ctx.fillStyle = SUB;
            ctx.fillText('Cuma pengikut yang kamu setujui', -332, 24);
            ctx.fillStyle = kp > .5 ? LIME : 'rgba(26,20,12,.18)'; ctx.beginPath(); ctx.roundRect(236, -26, 96, 52, 26); ctx.fill();
            ctx.fillStyle = kp > .5 ? LIME_INK : '#FFFFFF'; ctx.beginPath(); ctx.arc(lerp(262, 306, kp), 0, 21, 0, 7); ctx.fill(); }, { from: .92, rise: 20 });
          if (t > A.kalau2 - .1) { ctx.globalAlpha = a0 * clamp(k * 1.5) * kq(t, A.kalau2 - .1, .3); padlock(ctx, -380, 270, 92, 1 - kc, TXT, PAPER); }
          ctx.restore(); ctx.globalAlpha = a0;
        }
        const dm = lerp(1, .42, inv(A.keberatan - .2, A.keberatan + .2, t)); ctx.globalAlpha = dm;
        fall(ctx, 'KAMU', 80, -210, t, A.kamu - .05, DSP(180));
        txt(ctx, 'tiap status & komentar publikmu', 80, -130, t, A.status - .05, SRF(50));
        txt(ctx, '= bahan belajar mesin', 80, -62, t, A.bahan - .05, SRF(50)); ctx.globalAlpha = 1;
        txt(ctx, 'KALAU KEBERATAN:', 80, 60, t, A.keberatan - .05, MN(24), { ls: 4 });
        fall(ctx, 'GEMBOK AKUNMU', 80, 186, t, A.gembok - .05, DSP(120));
        txt(ctx, 'biar risikonya lebih kecil', 80, 268, t, A.risikonya - .05, SRF(50));
        slab(ctx, 'TIPS: ATUR AKUN JADI PRIVAT', 80, 372, t, A.privat - .05, { size: 24 });
      } },
    { at: A.tapi2, via: 'whip', name: 'Sisi lain', draw(ctx, t, c) {
        if (c.i < 9) return;
        const kg = E.outQuint(inv(A.tapi2 - .45, A.tapi2 + .2, t)); if (kg <= 0) return;
        ctx.save(); ctx.beginPath(); ctx.rect(-820, -470 * kg - 10, 1640, 940 * kg); ctx.clip(); ctx.drawImage(typing(t), -820, -480); ctx.restore();
        shade(ctx, true);
        const g1 = gone(t, A.makin - .2, .3); if (g1 > 0) { ctx.globalAlpha = g1; fall(ctx, 'SISI LAINNYA', -760, -300, t, A.sisi - .05, DSP(130), { col: IVORY }); ctx.globalAlpha = 1; }
        typeOn(ctx, 'INTERNET MAKIN PENUH TULISAN MESIN', -760, -380, t, A.mesin2 - .25, MN(30), { cps: 34, ls: 2, col: IVORY });
        markLine(ctx, 'tulisan ', 'ASLI', ' manusia', 0, 330, t, A.asli - .1, A.asli, SRF(92), { col: IVORY });
        txt(ctx, 'justru makin berharga', 0, 418, t, A.justru, SRF(60), { col: IVORY, align: 'center' });
        shade(ctx, false);
      } },
    { at: A.ulasan, via: 'rise', name: 'Penjaga', mod: (p, t) => {
        const k = E.inOutCubic(inv(A.penjaga - .2, A.penjaga + 2.6, t)), kf = E.inOutCubic(inv(A.penjaga - .25, A.penjaga + .35, t));
        p.dist += 700 * k; p.foc = p.dist - 700 * kf; },
      layers: [
        ...KOL.map(([f, w, x, y, dz, , cap, rot], i) => ({ dz, fn: (ctx, t, c) => {
          if (c.i < 10) return; const t0 = A.ulasan - .4 + i * .07, ka = E.outQuint(inv(t0, t0 + .5, t)); if (ka <= 0) return;
          const P = PC[f], C = compose(P, t), a0 = ctx.globalAlpha;
          ctx.save(); ctx.translate(x, y + (1 - ka) * 70); ctx.rotate(rot * D2R); ctx.globalAlpha = a0 * clamp(ka * 1.5);
          ctx.drawImage(C, -P.w / 2, -P.h / 2);
          if (cap) { const tc = P.rt ? Math.max(...[P.rt[0]]) : 0; txt(ctx, cap, -P.w / 2 + P.ix + 4, P.h / 2 - P.iy + 34, t, tc + .1, MN(18), { ls: 2 }); }
          ctx.restore(); ctx.globalAlpha = a0; } })),
        { dz: -30, fn: (ctx, t, c) => {                                    // remah: glyph crumbs fall off the collage
          if (c.i < 10 || t < A.remah - .1 || t > A.remah + 1.6) return; const a0 = ctx.globalAlpha;
          for (let i = 0; i < 160; i++) { const s = t - (A.remah - .05 + .3 * rnd(i * 2.1)); if (s <= 0) continue;
            const x0 = -820 + 1640 * rnd(i * 3.7), y0 = -380 + 620 * rnd(i * 5.3), j = 9 + (rnd(i * 7.9) * 40 | 0);
            ctx.globalAlpha = a0 * clamp(1 - s / 1.2); ctx.save(); ctx.translate(x0 + (rnd(i) - .5) * 120 * s, y0 + 900 * s * s); ctx.rotate((rnd(i * 1.3) - .5) * 4 * s);
            ctx.drawImage(GD, j * CW, 0, CW, CH, -CW * .75, -CH * .75, CW * 1.5, CH * 1.5); ctx.restore(); }
          ctx.globalAlpha = a0; } },
        { dz: -700, fn: (ctx, t, c) => {
          if (c.i < 10) return;
          slab(ctx, 'BUKAN REMAH INTERNET', 0, 330, t, A.bukan - .05, { size: 22, align: 'center' });
          if (t > A.tapi3 - .05 && t < A.penjaga + .4) { const ks = E.outQuint(inv(A.tapi3 - .05, A.tapi3 + .25, t)), a0 = ctx.globalAlpha;
            ctx.globalAlpha = a0 * gone(t, A.penjaga + .1, .3); ctx.fillStyle = LIME; ctx.fillRect(-190, 327, 380 * ks, 5); ctx.globalAlpha = a0; }
          const kd = E.inOutCubic(inv(A.penjaga - .15, A.penjaga + .6, t)); if (kd <= 0) return;
          ctx.fillStyle = `rgba(${BGRGB},${.62 * kd})`; ctx.fillRect(-1400, -900, 2800, 1800);
          fall(ctx, 'PENJAGA', 0, 60, t, A.penjaga - .04, DSP(300), { align: 'center', ls: 8, drop: -160 });
          markLine(ctx, 'yang bikin mesin tetap ', 'waras', '', 0, 190, t, A.bikin - .05, A.waras, SRF(72));
        } }],
      draw() {} }];

  let FULLS;
  return makeChapter({ B, ST, load, label: 'BAB 5 · APA ARTINYA BUAT KITA',
    full: () => FULLS ??= [{ im: IM.nature, t0: A.makalah - .5, t1: A.ulasan - .09, crop: [0, .05, 1, .55], tab: 'nature.com · 24 Jul 2024', dir: 1,
      hl: [[.035, .225, .375, .19, A.nature]] }] });
}
