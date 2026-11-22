// Pengantar "SATU BARIS" — Batam SWRO Data Center ("AWAN atau PIPA?").
// Dua dunia visual (disetujui Ikhsan): lorong pipa & server malam (#0B0C09, LED gading, aksen #C8F53C) ->
// dunia lab air terang (#F2EFE6 + WebGL2 caustic) di blok pertanyaan -> wordmark "RELENTLESS non-conformist" ->
// disclaimer 6 sumber resmi -> judul gelap "AWAN ATAU / PIPA?" -> portal Katup Pipa Laut (kit/portal.js).
import { W, H, FPS, clamp, inv, lerp, E } from './engine.js';
import { CFG, COL, DISP, SER, MONO, D2R, rnd, noise1, setFont, mk } from './lib.js';
import { loadTx, drawTx } from './txlib.js';
import { srcTag, loadVid, grainRect } from './kit.js';
import { makeWaterGL } from './watergl.js';

export const EP = {
  hook: [
    { img: 'kutipan/bpbatam-groundbreaking-swro-kabil-investasi-rp.png', side: 0, w: 1460, yo: -210, top: 690, max: 230,
      lead: ['Tanggal', '5', 'November', '2026'], hero: 'KABIL, BATAM', split: [0, 7],
      hl: { dark: true, rects: [[.47, .165, .395, .125], [.015, .315, .37, .125]] },
      src: 'Sumber: BP Batam, 5 Nov 2026', lit: ['#FFFFFF', '#989A92'] },
    { img: 'kutipan/antaranews-batam-mulai-bangun-swro-untuk-penuhi.png', side: 1, w: 880, yo: -10, top: 470, max: 290,
      label: ['PABRIK', 'AIR LAUT'], tail: 'senilai sekitar', hero: 'Rp600 MILIAR', split: [0, 6], countRp: true,
      hl: { dark: false, rects: [[.355, .17, .33, .11], [.235, .285, .36, .11]] },
      src: 'Sumber: Antara News, 5 Nov 2026', lit: ['#FFFFFF', '#969890'] },
    { img: 'kutipan/regional-batam-olah-air-laut-jadi-air-bersih-demi.png', side: -1, w: 940, yo: -10, top: 490, max: 290,
      label: ['BUKAN', 'DIMINUM WARGA'], lead: ['khusus', 'mendinginkan'], hero: 'DATA CENTER', split: [0, 5],
      hl: { dark: true, rects: [[.58, .165, .365, .12], [.245, .295, .225, .115]] },
      src: 'Sumber: KOMPAS.com, 5 Nov 2026', lit: ['#F6F6F0', '#8C8E86'] },
    { proc: 'rack', side: 0, w: 1460, yo: 24, src: 'ILUSTRASI · alur data ke pusat data',
      lead: ['Ribuan', 'komputer', 'penyimpan', 'data:'] },
  ],
  nodes: [
    { title: 'FOTO & VIDEO', sub: 'arsip kamera & awan', tag: 'UPLOAD' },
    { title: 'PESAN WHATSAPP', sub: 'jutaan obrolan aktif', tag: 'REALTIME' },
    { title: 'OBROLAN AI', sub: 'model bahasa & GPU', tag: 'KOMPUTASI' },
  ],
  q: [
    { lead: ['Memangnya', 'gedung', 'komputer', 'tidak', 'bisa', 'pakai'], hero: 'AIR KERAN?', split: [0, 4], hi: 99 },
    { lead: ['atau', 'air'], hero: 'WADUK BIASA?', split: [0, 6], hi: 0 },
  ],
  dLead: ['Angka', 'di', 'video', 'ini', 'dari', 'sumber', 'resmi:'],
  src: [['BP BATAM', 'OMBUDSMAN RI'], ['DISDUKCAPIL BATAM', 'DEPT. ENERGI AS'], ['NATURE', 'ARXIV']],
  dTail: ['Ini', 'video'], dHero: 'EDUKASI.',
  mid: 'DATA DI CLOUD,', hero: 'BUTUH AIR LAUT?', sub: 'Kenapa Batam bangun pabrik air laut Rp600 miliar demi data center?',
};

const ROOM = '#0B0C09', IVORY = '#F1EFE6', INK = '#11120E', BL = [0, 4, 9, 17, 30, 50];
const ZK = 0.72, RISE = 140, FLOOR = 360, XO = 440, ZF = 6, VY0 = 540, WM = 5;
const sOf = e => 1 / (1 + ZK * Math.max(e, -1.2));

function fitDisp(ctx, str, maxW, maxSize) {
  setFont(ctx, `400 100px "${DISP}"`);
  const size = Math.min(maxSize, maxW / ctx.measureText(str).width * 100);
  setFont(ctx, `400 ${size}px "${DISP}"`);
  return {
    str, size, w: ctx.measureText(str).width, cap: ctx.measureText('H').actualBoundingBoxAscent,
    xs: Array.from(str, (_, i) => ctx.measureText(str.slice(0, i)).width),
    cw: Array.from(str, ch => ctx.measureText(ch).width),
  };
}
function fall(ctx, L, x, base, t, start, col) {
  setFont(ctx, `400 ${L.size}px "${DISP}"`);
  for (let i = 0; i < L.str.length; i++) {
    if (L.str[i] === ' ') continue;
    const si = t - start(i); if (si <= 0) continue;
    const kk = E.expo16(si / .2), sc = lerp(2.2, 1, kk), cx = x + L.xs[i] + L.cw[i] / 2, cy = base - L.cap / 2;
    ctx.save(); ctx.translate(cx, cy + (1 - kk) * 60); ctx.scale(sc, sc); ctx.globalAlpha *= inv(0, .04, si);
    ctx.fillStyle = typeof col === 'function' ? col(i) : col; ctx.fillText(L.str[i], -L.cw[i] / 2, L.cap / 2); ctx.restore();
  }
}
const splitStart = (split, times, gap = .02) => j => {
  let g = 0; for (let q = 0; q < split.length; q++) if (j >= split[q]) g = q;
  return times[g] + (j - split[g]) * gap;
};
function flyWord(ctx, str, x, base, L, t, ts, side, col) {
  const s = t - ts; if (s <= 0) return;
  setFont(ctx, `400 ${L.size}px "${DISP}"`);
  const w = ctx.measureText(str).width, k = E.outQuart(s / .42), sc = lerp(2.7, 1, k);
  ctx.save(); ctx.translate(x + w / 2 + side * (1 - k) * 640, base - L.cap / 2); ctx.scale(sc, sc);
  ctx.globalAlpha *= inv(0, .06, s); const b = (1 - k) * 34; if (b > .7) ctx.filter = `blur(${b.toFixed(1)}px)`;
  ctx.fillStyle = col; ctx.fillText(str, -w / 2, L.cap / 2); ctx.restore();
}
function ghost(ctx, L, x, base, k, t, start, col) {
  if (k <= 0) return; setFont(ctx, `400 ${L.size}px "${DISP}"`);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 12, base - L.cap - 24, (L.w + 24) * k, L.cap + 48); ctx.clip();
  ctx.lineWidth = 2.5; ctx.strokeStyle = col;
  for (let i = 0; i < L.str.length; i++) if (L.str[i] !== ' ' && t < start(i)) ctx.strokeText(L.str[i], x + L.xs[i], base);
  ctx.restore();
}
function wipe(ctx, str, x, base, k, size, align = 'left') {
  if (k <= 0) return;
  const w = ctx.measureText(str).width, x0 = align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, base - size * 1.15, (w + 46) * k, size * 1.7); ctx.clip();
  ctx.fillText(str, x0, base + (1 - k) * 16); ctx.restore();
}
function wipeWords(ctx, words, starts, x, base, size, t, align = 'left') {
  const str = words.join(' '), full = ctx.measureText(str).width;
  const x0 = align === 'right' ? x - full : align === 'center' ? x - full / 2 : x;
  let acc = 0, rev = 0;
  words.forEach((_, j) => {
    const end = ctx.measureText(words.slice(0, j + 1).join(' ')).width;
    rev += (end - acc) * E.outCubic(inv(starts[j], starts[j] + .2, t));
    acc = end;
  });
  if (rev <= 0) return;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, base - size * 1.15, rev + 24, size * 1.7); ctx.clip();
  ctx.fillText(str, x0, base); ctx.restore();
}
const hitOf = (t, list) => { let h = 0; for (const [th, amp] of list) if (t >= th) h = Math.max(h, amp * Math.exp(-(t - th) * 15)); return h; };
const lightBg = ctx => {
  const gr = ctx.createRadialGradient(960, 480, 80, 960, 540, 1300);
  gr.addColorStop(0, '#FAFAF5'); gr.addColorStop(.62, '#EFECE2'); gr.addColorStop(1, '#DBD8CC');
  ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
};
function wipeIn(ctx, edge, fromLeft, inner) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.save(); ctx.beginPath();
  if (fromLeft) { ctx.moveTo(-10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(-10, H + 10); }
  else { ctx.moveTo(W + 10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(W + 10, H + 10); }
  ctx.closePath(); ctx.clip(); inner(); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export function makeFilm() {
  const OV = { lamp: 39, wash: 34 }, ovImg = {}, txImg = {}, VID = {}, NZ = [];
  let TXM = {}, LIB = { meta: {}, img: {} }, TL, A, bokeh, sprites, CUES, CHAPS, WGL;
  const [small, sctx] = mk(480, 270), [wmC, wmG] = mk(1600, 640);
  const HL = [], QL = {}, PL = {};
  const scene = { dur: 1, cuts: [], K: 8, grain: 0.035, load, post, draw, cues: () => ({ cues: CUES, chapters: CHAPS }) };
  const img = u => fetch(u).then(r => r.blob()).then(createImageBitmap);

  async function sprite(e) {
    const bm = await img(`../assets/${e.img}`);
    const P = 130, w = bm.width + 2 * P, h = bm.height + 2 * P, [base, g] = mk(w, h), [sh, q] = mk(w, h);
    g.filter = 'saturate(.86) contrast(1.1) brightness(.97)';
    g.drawImage(bm, P, P); g.filter = 'none';
    const gr = q.createLinearGradient(e.side > 0 ? P : w - P, 0, e.side > 0 ? w - P : P, h * .3);
    gr.addColorStop(0, e.lit[0]); gr.addColorStop(1, e.lit[1]); q.fillStyle = gr; q.fillRect(0, 0, w, h);
    q.globalCompositeOperation = 'destination-in'; q.drawImage(base, 0, 0);
    g.globalCompositeOperation = 'multiply'; g.drawImage(sh, 0, 0); g.globalCompositeOperation = 'source-over';
    const lv = BL.map((b, i) => {
      if (!i) return base;
      const [c, x] = mk(w >> 1, h >> 1); x.filter = `blur(${b / 2}px)`; x.drawImage(base, 0, 0, c.width, c.height); return c;
    });
    return { lv, w, h, iw: bm.width, ih: bm.height };
  }

  const RX = { L: [110, 230], R: [920, 230], P: 660, H: 620 };
  function rackSprite() {
    const iw = 1460, ih = 940, P = 130, w = iw + 2 * P, h = ih + 2 * P, [c, g] = mk(w, h);
    g.translate(P, P);
    // Left glass card: Cloud user data (clean matte editorial frame, zero neon borders)
    g.fillStyle = 'rgba(18,21,20,.88)'; g.beginPath(); g.roundRect(40, 140, 620, 640, 14); g.fill();
    g.strokeStyle = 'rgba(241,239,230,.22)'; g.lineWidth = 2; g.stroke();
    setFont(g, `700 22px "${MONO}"`, 4); g.fillStyle = 'rgba(241,239,230,.72)';
    g.fillText('CLOUD / AWAN  //  DATA PENGGUNA', 78, 198);
    // Right card: Fisik Server Rack Kabil / Nongsa (matte ivory border + solid lime top rule, zero neon glow)
    g.fillStyle = 'rgba(16,18,16,.92)'; g.beginPath(); g.roundRect(800, 140, 620, 640, 14); g.fill();
    g.strokeStyle = 'rgba(241,239,230,.24)'; g.lineWidth = 2; g.stroke();
    g.fillStyle = COL.lime; g.fillRect(800, 140, 620, 6);
    setFont(g, `700 22px "${MONO}"`, 4); g.fillStyle = IVORY;
    g.fillText('GEDUNG DATA CENTER  //  RAK PANAS', 838, 198);
    for (let u = 0; u < 8; u++) {
      const uy = 246 + u * 54;
      g.fillStyle = '#252720'; g.fillRect(838, uy, 544, 42);
      g.strokeStyle = 'rgba(241,239,230,.15)'; g.lineWidth = 1.5; g.strokeRect(838, uy, 544, 42);
      for (let d = 0; d < 6; d++) {
        g.fillStyle = d === 0 ? COL.lime : 'rgba(241,239,230,.45)';
        g.fillRect(856 + d * 18, uy + 16, 8, 8);
      }
      setFont(g, `700 14px "${MONO}"`, 2); g.fillStyle = 'rgba(241,239,230,.55)';
      g.fillText(`NODE 0${u + 1} · LOAD ${(78 + (u % 3) * 7)}%`, 990, uy + 26);
    }
    g.fillStyle = 'rgba(241,239,230,.75)'; setFont(g, `700 20px "${MONO}"`, 3);
    g.fillText('PENDINGIN AIR DIBUTUHKAN', 838, 742);
    const lv = BL.map((b, i) => {
      if (!i) return c;
      const [z, q] = mk(w >> 1, h >> 1); q.filter = `blur(${b / 2}px)`; q.drawImage(c, 0, 0, z.width, z.height); return z;
    });
    return { lv, w, h, iw, ih };
  }

  function rackOver(ctx, t, a) {
    ctx.save(); ctx.translate(-730, -470);
    EP.nodes.forEach((nd, j) => {
      const tj = A.nodes[j], k = E.outQuart(inv(tj - .05, tj + .28, t)); if (k <= 0) return;
      const bx = 78, by = 248 + j * 165, bw = 544, bh = 132;
      const slide = (1 - k) * -40;
      ctx.globalAlpha = a * inv(0, .3, k);
      ctx.fillStyle = '#242723'; ctx.beginPath(); ctx.roundRect(bx + slide, by, bw, bh, 10); ctx.fill();
      ctx.strokeStyle = 'rgba(241,239,230,.24)'; ctx.lineWidth = 1.8; ctx.stroke();
      ctx.fillStyle = j === 2 ? COL.lime : 'rgba(241,239,230,.65)'; ctx.fillRect(bx + slide, by + 16, 6, bh - 32);
      setFont(ctx, `700 32px "${MONO}"`, 2); ctx.fillStyle = IVORY; ctx.fillText(nd.title, bx + slide + 28, by + 56);
      setFont(ctx, `400 20px "${MONO}"`, 1); ctx.fillStyle = 'rgba(241,239,230,.65)'; ctx.fillText(nd.sub, bx + slide + 28, by + 94);
      // Animated data cable connecting left card -> right server rack
      const kc = E.outCubic(inv(tj + .12, tj + .36, t));
      if (kc > 0) {
        const yMid = by + bh / 2;
        ctx.strokeStyle = COL.lime; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(660, yMid); ctx.lineTo(lerp(660, 800, kc), yMid); ctx.stroke();
        ctx.fillStyle = COL.lime; ctx.beginPath(); ctx.arc(lerp(660, 800, kc), yMid, 6, 0, 7); ctx.fill();
      }
    });
    ctx.restore();
  }

  // Full-bleed documentary video plates (zero boxed video plates)
  const BGP = () => [
    [0, 'server_room'],
    [A.dive0 - .1, 'ocean_waves'],
    [A.locks[0] - .2, 'ocean_aerial'],
    [A.locks[2] - .2, 'server_rack'],
    [A.locks[3] - .2, 'server_units'],
    [A.cut1 - .1, null],
    [A.back - .14, 'server_room'],
    [A.stepT - .1, 'ocean_waves'],
  ];

  function bgPlate(ctx, t, VX, c, lampK) {
    const P = BGP(); let i = 0; for (let q = 0; q < P.length; q++) if (t >= P[q][0]) i = q;
    const cur = P[i], prev = P[i - 1], kx = inv(cur[0], cur[0] + .5, t);
    const one = (b, a) => {
      const V = b && VID[b[1]]; if (!V || a <= 0) return;
      const lt = Math.max(0, t - b[0]);
      const per = 2 * (V.n - 1), m = ((Math.floor(lt * V.fps) % per) + per) % per, im = V.img[m < V.n ? m : per - m];
      const s = Math.max(W / im.width, H / im.height) * (1.14 + .05 * inv(0, 8, lt));
      const ox = (VX - W / 2) * -.22 + 34 * Math.sin(c * .7), oy = 24 * Math.sin(c * .9 + 1);
      ctx.globalAlpha = a;
      ctx.filter = 'saturate(.38) contrast(1.16) brightness(.60)';
      ctx.drawImage(im, W / 2 - im.width * s / 2 + ox, H / 2 - im.height * s / 2 + oy, im.width * s, im.height * s);
      ctx.filter = 'none';
    };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (cur[1]) one(cur, (prev && prev[1] ? 1 : kx) * lampK);
    if (prev && prev[1]) one(prev, (1 - kx) * lampK);
    ctx.globalAlpha = 1;
    if (!cur[1] && !(prev && prev[1] && kx < 1)) return;
    let g = ctx.createLinearGradient(0, 0, W, 0);
    g.addColorStop(0, 'rgba(11,12,9,.82)'); g.addColorStop(.36, 'rgba(11,12,9,.32)');
    g.addColorStop(.64, 'rgba(11,12,9,.32)'); g.addColorStop(1, 'rgba(11,12,9,.82)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(11,12,9,.36)'); g.addColorStop(.5, 'rgba(11,12,9,0)'); g.addColorStop(1, 'rgba(11,12,9,.54)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    grainRect(ctx, 0, 0, W, H, t, .18);
  }

  async function load() {
    const j = async u => (await fetch(u)).json();
    TL = await j('./timeline.json'); A = TL.A;
    CUES = await j('../build/cues.json').catch(() => ({}));
    CHAPS = await j('../build/chapters.json').catch(() => []);
    scene.dur = A.end;
    WGL = makeWaterGL(960, 540);
    for (const [name, n] of Object.entries(OV))
      ovImg[name] = await Promise.all(Array.from({ length: n }, async (_, i) => {
        const bm = await img(`../assets/ov/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`);
        const [c, g] = mk(bm.width, bm.height); g.filter = 'grayscale(1) contrast(1.15)'; g.drawImage(bm, 0, 0); return c;
      }));
    const used = new Set(HITS().map(h => h[0]));
    LIB = await loadTx('../assets/txlib/', [...used].filter(nm => /^(stk|cmc|ldr|shD|shE|cvo|ddt|gr|hw)/.test(nm)));
    TXM = Object.fromEntries(Object.entries(await j('../assets/tx/tx.json')).filter(([nm]) => used.has(nm)));
    for (const [name, m] of Object.entries(TXM))
      txImg[name] = await Promise.all(Array.from({ length: m.n }, async (_, i) => {
        const bm = await img(`../assets/tx/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`);
        const [c, g] = mk(960, 540); g.filter = 'contrast(1.28) brightness(.94)'; g.drawImage(bm, 0, 0, 960, 540); return c;
      }));
    for (let k = 0; k < 4; k++) {
      const [c, g] = mk(256, 256), id = g.createImageData(256, 256);
      for (let q = 0; q < id.data.length; q += 4) {
        const v = 128 + (Math.random() + Math.random() + Math.random() - 1.5) * 120;
        id.data[q] = id.data[q + 1] = id.data[q + 2] = v; id.data[q + 3] = 255;
      }
      g.putImageData(id, 0, 0); NZ.push(c);
    }
    sprites = [];
    for (const e of EP.hook) sprites.push(e.proc ? rackSprite() : await sprite(e));
    for (const nm of new Set(BGP().map(b => b[1]).filter(Boolean))) VID[nm] = await loadVid('../assets/vid/', nm);
    let g, gr; [bokeh, g] = mk(96, 96); gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
    gr.addColorStop(0, 'rgba(220,240,235,.78)'); gr.addColorStop(.72, 'rgba(200,230,224,.58)');
    gr.addColorStop(.86, 'rgba(190,220,214,.25)'); gr.addColorStop(1, 'rgba(190,220,214,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
  }

  function ov(ctx, name, t, start, alpha) {
    const i = Math.floor((t - start) * 30); if (i < 0 || i >= OV[name] || alpha <= 0) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = alpha;
    ctx.drawImage(ovImg[name][i], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  // Camera position along the pipe/server depth row
  function rowC(t) {
    const L = A.locks;
    if (t < A.cut1) {
      let c = -1.25 + .05 * Math.min(t, A.dive0);
      c += .25 * E.outCubic(inv(A.dive0, L[0], t));
      for (let i = 0; i < L.length; i++) {
        c = lerp(c, i, E.outQuart(inv(L[i] - .34, L[i] + .22, t)));
        const hold = i < L.length - 1 ? L[i + 1] - .34 : A.cut1;
        if (t > L[i]) c += .008 * (Math.min(t, hold) - L[i]);
      }
      return c + .25 * E.outQuart(inv(A.cut1 - .18, A.cut1, t));
    }
    let c = lerp(-.6, WM, E.snap(inv(A.back - .14, A.lockW, t)));
    if (t > A.lockW) {
      const s = t - A.lockW;
      c += .07 * Math.exp(-s * 8) * Math.sin(s * 20) + .02 * Math.min(s, A.cut3 - A.lockW);
    }
    c += .85 * E.outQuart(inv(A.cut3 - .04, A.cut3 + .5, t)) + .018 * Math.max(0, t - A.cut3);
    return c + .3 * E.inCubic(inv(A.stepT - .3, A.stepT, t));
  }

  const levelOf = b => {
    if (b <= 0) return 0;
    for (let i = 1; i < BL.length; i++) if (b <= BL[i]) return i - 1 + (b - BL[i - 1]) / (BL[i] - BL[i - 1]);
    return BL.length - 1;
  };
  const blurOf = e => e < 0 ? 90 * Math.max(0, -e - .1) : 13 * Math.max(0, e - .3);

  function corridor(ctx, c, VX, VY, lampK, dim, t) {
    const p0 = Math.floor(c - .6), p1 = Math.ceil(c + 4.2);
    for (let p = p1; p >= p0; p--) {
      const e = p - c; if (e < -.62 || e > 4.2) continue;
      const s0 = sOf(e), s1 = sOf(e + 1), h0 = FLOOR - RISE * e, h1 = FLOOR - RISE * (e + 1);
      const fog = inv(4.2, 2.5, e) * lampK * dim * inv(-.62, -.35, e);
      if (fog <= 0) continue;
      const SWD = 1580, yl = VY + s0 * h0, yb = VY + s1 * h0, yn = VY + s1 * h1;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = fog;
      // Pipeline/rack floor rib
      ctx.fillStyle = '#141819';
      ctx.beginPath(); ctx.moveTo(VX - SWD * s1, yb); ctx.lineTo(VX + SWD * s1, yb);
      ctx.lineTo(VX + SWD * s1, yn); ctx.lineTo(VX - SWD * s1, yn); ctx.fill();
      // Subtle conduit lines + blinking ivory telemetry LEDs
      for (let k = 0; k < 14; k++) {
        const u = rnd(p * 31 + k) * 2 - 1, v = .25 + .5 * rnd(p * 17 + k * 3);
        const on = rnd(Math.floor(t * (2 + 3 * rnd(k + p))) * 7.7 + k + p * 3) > .38;
        if (!on) continue;
        ctx.fillStyle = k % 5 === 0 ? `rgba(200,245,60,${.55 * fog})` : `rgba(241,239,230,${.45 + .35 * rnd(k * 9 + p)})`;
        const r = Math.max(1.2, 3.0 * s1);
        ctx.fillRect(VX + u * SWD * .92 * s1 - r, lerp(yb, yn, v) - r * .5, 2 * r, r);
      }
      if (h0 > 0) {
        const gr = ctx.createLinearGradient(0, yl, 0, yb);
        gr.addColorStop(0, '#232829'); gr.addColorStop(1, '#16191A');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(VX - SWD * s0, yl); ctx.lineTo(VX + SWD * s0, yl);
        ctx.lineTo(VX + SWD * s1, yb); ctx.lineTo(VX - SWD * s1, yb); ctx.fill();
      }
      ctx.fillStyle = `rgba(241,239,230,${.45 * fog})`;
      ctx.fillRect(VX - SWD * s0, yl - 1, 2 * SWD * s0, Math.max(1.5, 2.5 * s0));
      for (let k = -8; k <= 8; k++) {
        const big = k % 4 === 0;
        ctx.fillRect(VX + k * 160 * s0 - 1, yl, Math.max(1, 2 * s0), (big ? 22 : 10) * s0);
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawAsset(ctx, i, e, t, VX, VY, lampK, f, dim) {
    if (e > 3.4 || e < -.62) return;
    const sp = sprites[i], ep = EP.hook[i], s = sOf(e), k = ep.w / sp.iw * s;
    const lvF = levelOf(blurOf(e) / k);
    const a = inv(3.4, 2.3, e) * inv(-.62, -.3, e) * lampK * dim;
    const x = VX + s * ep.side * XO, y = VY + s * (ep.yo - RISE * e + 6 * Math.sin(t * .9 + i * 2)), foc = inv(.6, .12, Math.abs(e));
    if (foc > 0) {
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.globalCompositeOperation = 'screen';
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 560 * s);
      gr.addColorStop(0, `rgba(216,232,224,${.13 * foc * a})`); gr.addColorStop(1, 'rgba(216,232,224,0)');
      ctx.fillStyle = gr; ctx.fillRect(-580 * s, -580 * s, 1160 * s, 1160 * s); ctx.globalCompositeOperation = 'source-over';
    }
    ctx.setTransform(1, 0, 0, 1, x, VY + s * (FLOOR - RISE * e) - 4 * s); ctx.scale(1, .14);
    const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 320 * s);
    gr.addColorStop(0, `rgba(0,0,0,${.62 * a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr; ctx.fillRect(-320 * s, -320 * s, 640 * s, 640 * s);
    ctx.setTransform(1, 0, 0, 1, x, y); ctx.rotate((ep.side * 4 * e + .9 * Math.sin(t * .7 + i)) * D2R); ctx.scale(k, k);
    const l0 = Math.floor(lvF), l1 = Math.min(BL.length - 1, l0 + 1), fr = lvF - l0;
    ctx.globalAlpha = a; ctx.drawImage(sp.lv[l0], -sp.w / 2, -sp.h / 2, sp.w, sp.h);
    if (fr > .02 && l1 !== l0) { ctx.globalAlpha = a * fr; ctx.drawImage(sp.lv[l1], -sp.w / 2, -sp.h / 2, sp.w, sp.h); }
    if (a > .02) {
      ctx.save(); ctx.beginPath(); ctx.rect(-sp.iw / 2, -sp.ih / 2, sp.iw, sp.ih); ctx.clip();
      ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = a * .18;
      const nz = NZ[f % 4], ox = rnd(f * 1.7) * 256, oy = rnd(f * 2.3) * 256, gs = 1.6 / k;
      ctx.translate(-sp.iw / 2 - ox * gs, -sp.ih / 2 - oy * gs); ctx.scale(gs, gs);
      ctx.fillStyle = ctx.createPattern(nz, 'repeat'); ctx.fillRect(0, 0, sp.iw / gs + 512, sp.ih / gs + 512); ctx.restore();
    }
    if (ep.proc && a > .02) rackOver(ctx, t, a * inv(1.8, .5, Math.abs(e)));
    const hT = A.hl[i] || (ep.hl ? A.locks[i] + 1.4 : null);
    if (ep.hl && hT && t > hT && a > .02) {
      // Clean editorial stabilo highlighter over exact headline phrases (zero stray scribble strokes)
      const q = ep.hl;
      ctx.save();
      ctx.globalCompositeOperation = q.dark ? 'screen' : 'multiply';
      ctx.fillStyle = q.dark ? 'rgba(200,245,60,0.34)' : 'rgba(200,245,60,0.82)';
      q.rects.forEach(([rx, ry, rw, rh], ri) => {
        const kh = E.outQuint(inv(hT + ri * .22, hT + ri * .22 + .36, t));
        if (kh <= 0) return;
        ctx.globalAlpha = a;
        ctx.fillRect((rx - .5) * sp.iw, (ry - .5) * sp.ih, rw * sp.iw * kh, rh * sp.ih);
      });
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (foc > 0) {
      ctx.setTransform(s, 0, 0, s, x, VY + s * (FLOOR - RISE * e));
      ctx.globalAlpha = .72 * foc * a; ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      setFont(ctx, `700 22px "${MONO}"`, 3); ctx.fillText(`0${i + 1}`, 0, 52); ctx.textAlign = 'left'; ctx.globalAlpha = 1;
    }
  }

  function hookType(ctx, t, VX, VY) {
    const Ls = A.locks;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // 0: "Data kita disimpan di awan. Terus... kenapa butuh air laut?"
    if (t < Ls[0] + .2) {
      const kOut = E.inCubic(inv(Ls[0] - .34, Ls[0] + .14, t));
      const aAwan = 1 - E.inCubic(inv(A.dive0 - .05, A.dive0 + .28, t));
      if (aAwan > .01) {
        ctx.save(); ctx.globalAlpha = aAwan; ctx.fillStyle = IVORY;
        const L = PL.open || (PL.open = fitDisp(ctx, 'CLOUD / AWAN', 1320, 320));
        setFont(ctx, `italic 380 80px "${SER}"`);
        wipeWords(ctx, ['Data', 'kita', 'disimpan', 'di'], A.open.slice(0, 4), 960, 340, 80, t, 'center');
        // Highlight CLOUD in crisp ivory + matte lime accent bar under CLOUD/AWAN
        const kC = E.outQuart(inv(A.open[4] - .05, A.open[4] + .28, t));
        if (kC > 0) {
          ctx.fillStyle = COL.lime;
          ctx.fillRect(960 - L.w / 2, 684, L.w * kC, 8);
        }
        fall(ctx, L, 960 - L.w / 2, 660, t, j => A.open[4] - .06 + j * .011, IVORY);
        ctx.restore();
      }
      if (t >= A.dive0 - .1) {
        const sc = lerp(1, 2.3, kOut);
        ctx.save(); ctx.translate(960, 540); ctx.scale(sc, sc); ctx.translate(-960, -540);
        ctx.globalAlpha = (1 - kOut) * inv(A.dive0 - .05, A.dive0 + .15, t);
        if (kOut > .05) ctx.filter = `blur(${(kOut * 22).toFixed(1)}px)`;
        ctx.fillStyle = IVORY; setFont(ctx, `italic 380 84px "${SER}"`);
        wipeWords(ctx, ['Terus...', 'kenapa', 'butuh'], A.tanya0.slice(0, 3), 960, 400, 84, t, 'center');
        const L2 = PL.laut || (PL.laut = fitDisp(ctx, 'AIR LAUT?', 960, 310));
        const x2 = 960 - L2.w / 2, b2 = 690;
        const ks = E.snap(inv(A.tanya0[4] - .03, A.tanya0[4] + .14, t));
        if (ks > 0) {
          ctx.fillStyle = COL.lime;
          ctx.fillRect(x2 + L2.xs[4] - 20, b2 - L2.cap - 24, (L2.w - L2.xs[4] + 40) * ks, L2.cap + 48);
        }
        fall(ctx, L2, x2, b2, t, splitStart([0, 4], [A.tanya0[3], A.tanya0[4]], .025), j => j >= 4 ? COL.limeInk : IVORY);
        ctx.restore();
      }
    }

    EP.hook.forEach((e, i) => {
      const tOut = i < Ls.length - 1 ? Ls[i + 1] - .34 : A.cut1 - .1, out = inv(tOut, tOut + .2, t);
      if (t < Ls[i] - .05 || out >= 1) return;
      if (e.proc) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1 - out; ctx.fillStyle = IVORY;
        ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
        setFont(ctx, `italic 380 78px "${SER}"`); wipeWords(ctx, e.lead, A.nodeLead, 150, 150, 78, t);
        setFont(ctx, `400 21px "${MONO}"`, 1); srcTag(ctx, e.src, 150, 1020, t, A.src[i]);
        return;
      }
      const heroTxt = e.countRp && t < A.rpCount[1]
        ? `Rp${Math.round(lerp(0, 600, E.outQuint(inv(A.rpCount[0] - .08, A.rpCount[1], t))))} MILIAR`
        : e.hero;
      const L = e.countRp ? fitDisp(ctx, heroTxt, e.side ? 760 : 1300, e.max)
        : (HL[i] || (HL[i] = fitDisp(ctx, e.hero, e.side ? 760 : 1300, e.max)));
      const sT = lerp(1, .82, E.inCubic(out)), left = e.side >= 0, xa = left ? 150 : 1770;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(VX, VY); ctx.scale(sT, sT); ctx.translate(-VX, -VY);
      ctx.globalAlpha = 1 - out; ctx.fillStyle = IVORY; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      const top = e.top, base = top + L.cap, hx = left ? xa : xa - L.w;
      if (e.label) {
        setFont(ctx, `700 38px "${MONO}"`, 4);
        const labW = ctx.measureText(e.label.join(' ')).width;
        let x = left ? xa : xa - labW; ctx.save(); ctx.fillStyle = 'rgba(241,239,230,.85)';
        e.label.forEach((wd, j) => {
          const tj = A.lab[i][j], k = E.outCubic(inv(tj, tj + .18, t));
          if (k > 0) { ctx.globalAlpha = (1 - out) * k; ctx.fillText(wd, x + (1 - k) * 14, top - 130); }
          x += ctx.measureText(wd + ' ').width;
        });
        ctx.restore();
      }
      if (e.lead) {
        setFont(ctx, `italic 380 72px "${SER}"`);
        wipeWords(ctx, e.lead, A.lead[i], xa, top - 36, 72, t, left ? 'left' : 'right');
      }
      fall(ctx, L, hx, base, t, splitStart(e.split, A.hero[i], .02), IVORY);
      let yb = base;
      if (e.tail) {
        setFont(ctx, `italic 380 68px "${SER}"`); ctx.fillStyle = IVORY;
        wipe(ctx, e.tail, xa, top - 36, E.outQuint(inv(A.tail[i], A.tail[i] + .4, t)), 68, left ? 'left' : 'right');
      }
      setFont(ctx, `400 21px "${MONO}"`, 1); const sw = ctx.measureText(e.src).width + 26;
      srcTag(ctx, e.src, left ? xa : xa - sw, Math.min(1025, yb + 74), t, A.src[i]);
    });
    ctx.globalAlpha = 1;
  }

  function wmArt(g, t) {
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 1600, 640);
    const L = PL.wm || (PL.wm = fitDisp(g, CFG.channel[0], 1500, 900)), base = 30 + L.cap;
    g.fillStyle = IVORY; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
    setFont(g, `400 ${L.size}px "${DISP}"`); g.fillText(CFG.channel[0], 50, base);
    setFont(g, `italic 420 150px "${SER}"`);
    const w2 = g.measureText(CFG.channel[1]).width, x2 = 1550 - w2 - 26, b2 = base + 178;
    const k = E.snap(inv(A.slab - .04, A.slab + .16, t));
    if (k > 0) {
      g.save(); g.beginPath(); g.rect(x2 - 26, b2 - 122, (w2 + 52) * k, 164); g.clip();
      g.fillStyle = COL.lime; g.fillRect(x2 - 26, b2 - 122, w2 + 52, 164);
      g.fillStyle = COL.limeInk; g.fillText(CFG.channel[1], x2, b2); g.restore();
    }
  }
  let wmKey = -1;
  function drawWM(ctx, t, c, VX, VY) {
    const e = WM - c; if (e > 3) return;
    const key = Math.round(E.snap(inv(A.slab - .04, A.slab + .16, t)) * 400);
    if (key !== wmKey) { wmArt(wmG, t); wmKey = key; }
    const kD = E.inOutCubic(inv(A.cut3 - .22, A.cut3 + .2, t)), s = e > 0 ? sOf(e) : 1 / (1 - .12 * Math.min(-e, .2));
    const sc = lerp(s, .17, kD), x = lerp(VX, 1642, kD), y = lerp(VY + s * (-60 - RISE * Math.max(0, e)), 116, kD);
    const b = e > .03 ? 30 * (e - .03) : 0;
    const gone = 1 - inv(A.stepT - .12, A.stepT, t);
    ctx.setTransform(sc, 0, 0, sc, x, y); ctx.globalAlpha = inv(3, 2, e) * gone;
    if (b > .7 && kD < .5) ctx.filter = `blur(${b.toFixed(1)}px)`;
    ctx.drawImage(wmC, -800, -290); ctx.filter = 'none'; ctx.globalAlpha = 1;
  }

  function discType(ctx, t, base0) {
    const M = 150, s = t - A.cut3; if (s < 0) return;
    if (!PL.d) {
      const rows = EP.src.map(ws => {
        const str = ws.join(' / '), L = fitDisp(ctx, str, W - 2 * M, 160); let at = 0;
        const xs = ws.map(wd => { const x = L.xs[at] ?? 0; at += wd.length + 3; return x; });
        return { L, ws, xs };
      });
      setFont(ctx, `italic 380 80px "${SER}"`); const tw = ctx.measureText(EP.dTail.join(' ')).width;
      PL.d = { rows, tw, H: fitDisp(ctx, EP.dHero, 900, 145) };
      let y = 328; rows.forEach(r => { r.base = y + r.L.cap; y = r.base + 38; });
      PL.d.base = y + 28 + PL.d.H.cap; PL.d.hx = M + tw + 40;
    }
    const D = PL.d, kG = E.inCubic(inv(A.stepT - .15, A.stepT, t));
    ctx.setTransform(base0); ctx.translate(0, 220 * kG);
    const aT = 1 - kG;
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = IVORY;
    ctx.globalAlpha = inv(.15, .45, s) * .82 * aT; setFont(ctx, `700 24px "${MONO}"`, 5); ctx.fillText('DISCLAIMER', M, 118);
    ctx.globalAlpha = .4 * aT; ctx.fillRect(M, 152, (W - 2 * M) * E.outQuint(inv(.12, .65, s)), 2);
    ctx.globalAlpha = aT; setFont(ctx, `italic 380 76px "${SER}"`); wipeWords(ctx, EP.dLead, A.dlead.map(x => x[0]), M, 275, 76, t);
    let wi = 0;
    D.rows.forEach((r, ri) => {
      const ts = r.ws.map((_, j) => A.src2[wi + j]); wi += r.ws.length;
      const start = ch => { let g = 0; r.ws.forEach((_, j) => { if (r.L.xs[ch] >= r.xs[j] - .5) g = j; }); return ts[g] + .1; };
      ctx.globalAlpha = aT; ghost(ctx, r.L, M, r.base, E.outQuint(inv(.25 + ri * .16, .88 + ri * .16, s)), t, start, 'rgba(241,239,230,.18)');
      r.ws.forEach((wd, j) => {
        if (j > 0 && t > ts[j] - .02) {
          ctx.globalAlpha = aT * .36 * inv(ts[j] - .02, ts[j] + .1, t); ctx.fillStyle = IVORY;
          setFont(ctx, `400 ${r.L.size}px "${DISP}"`);
          ctx.fillText('/', M + r.L.xs[r.ws.slice(0, j).join(' / ').length + 1], r.base);
        }
        ctx.globalAlpha = aT; flyWord(ctx, wd, M + r.xs[j], r.base, r.L, t, ts[j], j % 2 ? -1 : 1, IVORY);
      });
    });
    ctx.globalAlpha = aT; setFont(ctx, `italic 380 80px "${SER}"`); ctx.fillStyle = IVORY;
    wipeWords(ctx, EP.dTail, A.dtail, M, D.base, 80, t);
    const k = E.snap(inv(A.hib - .05, A.hib + .14, t));
    if (k > 0) {
      ctx.fillStyle = IVORY;
      ctx.fillRect(D.hx - 20, D.base - D.H.cap - 22, (D.H.w + 40) * k, D.H.cap + 44);
    }
    fall(ctx, D.H, D.hx, D.base, t, j => A.hib + j * .016, INK); ctx.globalAlpha = 1;
  }

  function drawRow(ctx, t) {
    const f = Math.floor(t * FPS), hook = t < A.cut1, c = rowC(t), sD = t - A.cut3;
    const lampK = hook ? clamp(lerp(.55, 1, E.outCubic(inv(0, 1.2, t))) * (.96 + .04 * noise1(t * 36))) : 1;
    const hit = hook
      ? hitOf(t, [[A.open[4], 5], [A.tanya0[4], 9], ...A.locks.map(l => [l, 6]), ...A.nodes.map(x => [x, 4])])
      : hitOf(t, [[A.lockW, 9], [A.slab + .1, 6], ...A.src2.map(x => [x + .2, 3]), [A.hib + .18, 7]]);
    const VX = W / 2 + (rnd(f * 2.3) - .5) * 2 * hit, VY = VY0 + (rnd(f * 5.3) - .5) * (2 + 2 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    bgPlate(ctx, t, VX, c, lampK);
    if (WGL && t >= A.dive0 && t < A.cut1) {
      const ca = WGL(t, A.dive0, .5, .5, .28 * inv(A.dive0, A.dive0 + .6, t));
      if (ca) {
        ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .16 * inv(A.dive0, A.dive0 + .6, t);
        ctx.drawImage(ca, 0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      }
    }
    const gr = ctx.createRadialGradient(VX, VY - 140, 0, VX, VY, 1350);
    gr.addColorStop(0, `rgba(196,222,216,${.14 * lampK})`); gr.addColorStop(.5, `rgba(96,122,126,${.05 * lampK})`);
    gr.addColorStop(1, 'rgba(30,40,42,0)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    const dim = hook ? 1 : lerp(.82, .56, inv(0, .5, sD));
    corridor(ctx, c, VX, VY, lampK, dim, t);
    for (let i = EP.hook.length - 1; i >= 0; i--) drawAsset(ctx, i, i - c, t, VX, VY, lampK, f, dim);
    if (hook) hookType(ctx, t, VX, VY); else drawWM(ctx, t, c, VX, VY);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 36; i++) {
      const rel = ((rnd(i + 99) * 4.2 + c) % 4.2 + 4.2) % 4.2 - .9;
      const s = sOf(rel), r = clamp(4 + 44 * Math.max(0, -rel) * s, 4, 140);
      const x = VX + s * ((rnd(i) * 2 - 1) * 1240 + t * 16 * (rnd(i + 5) - .5));
      const y = VY + s * ((rnd(i + 50) * 2 - 1) * 500 - RISE * rel * .6 - t * 12 * rnd(i + 9));
      ctx.globalAlpha = clamp(lampK * 3.4 / r, .025, .32) * inv(3.3, 2.6, rel) * inv(-.9, -.6, rel);
      ctx.drawImage(bokeh, x - r, y - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (hook) ov(ctx, 'lamp', t, 0, .14); else ov(ctx, 'wash', t, A.lockW - .05, .22);
    if (!hook && sD >= 0 && t < A.stepT + .2) {
      const push = 1 + .035 * inv(.3, 11, sD) + .004 * hit;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2 + VX - W / 2, H / 2 + VY - VY0);
      ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
      discType(ctx, t, ctx.getTransform());
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  // Bright Lab World: Q planes ("air keran? atau air waduk biasa?")
  function qCam(t) {
    let c = -1 + .04 * Math.max(0, t - A.cut1);
    c = lerp(c, 0, E.outQuart(inv(A.q1 - .1, A.q1 + .35, t)));
    if (t > A.q1) c += .04 * (Math.min(t, A.q2 - .25) - A.q1);
    c = lerp(c, 1, E.outQuart(inv(A.q2 - .25, A.q2 + .2, t)));
    if (t > A.q2) c += .04 * (Math.min(t, A.back - .3) - A.q2);
    return c + .3 * E.inCubic(inv(A.back - .3, A.back + .1, t));
  }

  function qPlane(ctx, i, t) {
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = INK;
    if (i === -1) {
      const L = QL.ai || (QL.ai = fitDisp(ctx, 'AIR KERAN?', 1300, 360));
      ctx.fillStyle = COL.lime; ctx.fillRect(-2600, -1600, 5200, 3200);
      fall(ctx, L, -L.w / 2, L.cap / 2, t, splitStart([0, 4], [A.q1h[0], A.q1h[1]], .02), COL.limeInk); return;
    }
    const e = EP.q[i];
    if (i === 0) {
      const L = QL[0] || (QL[0] = fitDisp(ctx, e.hero, 1450, 420)), top = -20, base = top + L.cap;
      setFont(ctx, `italic 380 82px "${SER}"`);
      wipeWords(ctx, e.lead, A.q1lead, 0, top - 44, 82, t, 'center');
      ghost(ctx, L, -L.w / 2, base, E.outQuint(inv(A.cut1, A.cut1 + .5, t)), t, splitStart(e.split, A.q1h, .02), 'rgba(17,18,14,.22)');
      fall(ctx, L, -L.w / 2, base, t, splitStart(e.split, A.q1h, .02), INK); return;
    }
    const L = QL[1] || (QL[1] = fitDisp(ctx, e.hero, 1300, 330)), top = -10, base = top + L.cap, x = -L.w / 2;
    setFont(ctx, `italic 380 90px "${SER}"`);
    wipeWords(ctx, e.lead, A.q2lead, 0, top - 48, 90, t, 'center');
    const hs = splitStart(e.split, A.q2h, .02);
    const k = E.snap(inv(A.q2h[0] - .03, A.q2h[0] + .15, t));
    if (k > 0) {
      ctx.fillStyle = COL.lime;
      ctx.fillRect(x - 22, base - L.cap - 22, (L.xs[5] + 36) * k, L.cap + 44);
    }
    fall(ctx, L, x, base, t, hs, j => j < 6 ? COL.limeInk : INK);
  }

  function drawQ(ctx, t) {
    const f = Math.floor(t * FPS), c = qCam(t);
    const hit = hitOf(t, [[A.q1h[1] + .15, .9], [A.q2h[0] + .15, 1.1]]);
    const cx = W / 2 + (rnd(f * 2.3) - .5) * 18 * hit, cy = H / 2 + (rnd(f * 5.3) - .5) * (2 + 14 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; lightBg(ctx);
    if (WGL) {
      const ca = WGL(t, A.cut1, .5, .5, .42);
      if (ca) {
        ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .15;
        ctx.drawImage(ca, 0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      }
    }
    ctx.lineCap = 'butt';
    for (let i = 0; i < 48; i++) {
      const rel = -1.4 + rnd(i + 40) * 5.4 - c; if (rel > .75 || rel < -.6) continue;
      const s = ZF ** -rel, a = rnd(i) * 7, R = 300 + 760 * rnd(i + 7);
      const x = cx + Math.cos(a) * R * s, y = cy + Math.sin(a) * R * .62 * s, r = 11 * s;
      ctx.setTransform(1, 0, 0, 1, x, y);
      ctx.strokeStyle = `rgba(17,18,14,${.32 * inv(.75, .35, rel) * (1 - inv(.15, .6, -rel))})`;
      ctx.lineWidth = Math.min(6, 1.6 * s);
      ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke();
    }
    for (let i = 1; i >= 0; i--) {
      const rel = i - c; if (rel > .8 || rel < -.55) continue;
      ctx.setTransform(1, 0, 0, 1, cx, cy); ctx.rotate(-rel * 10 * D2R * (i % 2 ? -1 : 1));
      const s = ZF ** -rel; ctx.scale(s, s);
      ctx.globalAlpha = rel > 0 ? inv(.8, .3, rel) : 1 - inv(.12, .55, -rel); qPlane(ctx, i, t);
    }
    ctx.globalAlpha = 1; ov(ctx, 'wash', t, A.cut1 - .05, .28);
  }

  function drawTitle(ctx, t) {
    const M = 150, s = t - A.stepT, f = Math.floor(t * FPS);
    const hit = hitOf(t, [[A.tMid + .18, .5], [A.tHero + .18, 1.2]]);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    const V = VID.ocean_waves;
    if (V) {
      const m = Math.floor((t - A.stepT) * V.fps) % V.n, im = V.img[Math.max(0, m)];
      const sc = Math.max(W / im.width, H / im.height) * (1.06 + .04 * inv(0, 6, s));
      ctx.globalAlpha = .34; ctx.filter = 'saturate(.3) contrast(1.22) brightness(.52)';
      ctx.drawImage(im, W / 2 - im.width * sc / 2, H / 2 - im.height * sc / 2, im.width * sc, im.height * sc);
      ctx.filter = 'none'; ctx.globalAlpha = 1;
    }
    if (WGL) {
      const ca = WGL(t, A.tHero, .38, .56, .65);
      if (ca) {
        ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .24;
        ctx.drawImage(ca, 0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      }
    }
    const bg = ctx.createRadialGradient(540, 520, 60, 760, 540, 1400);
    bg.addColorStop(0, 'rgba(32,48,52,.45)'); bg.addColorStop(1, 'rgba(11,12,9,.84)');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    if (!PL.t) {
      const L = { hero: fitDisp(ctx, EP.hero, 1520, 310), mid: fitDisp(ctx, EP.mid, 1400, 185) };
      L.yMid = 172 + L.mid.cap; L.heroBase = L.yMid + 72 + L.hero.cap; L.sub = L.heroBase + 132; PL.t = L;
    }
    const L = PL.t, push = 1 + .035 * inv(.3, 5, s) + .02 * hit;
    ctx.translate(W / 2 + (rnd(f * 2.3) - .5) * 20 * hit, H / 2 + (rnd(f * 5.3) - .5) * (2 + 16 * hit));
    ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = IVORY;
    ctx.globalAlpha = .82 * inv(.2, .55, s); setFont(ctx, `700 24px "${MONO}"`, 6);
    ctx.fillText(`${CFG.channel[0]} ${CFG.channel[1]}`.toUpperCase(), M, 94);
    ctx.globalAlpha = 1;
    ghost(ctx, L.mid, M, L.yMid, E.outQuint(inv(.1, .45, s)), t, j => A.tMid + j * .025, 'rgba(241,239,230,.24)');
    fall(ctx, L.mid, M, L.yMid, t, j => A.tMid + j * .025, IVORY);
    const k = E.snap(inv(A.tHero - .04, A.tHero + .16, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(M - 24, L.heroBase - L.hero.cap - 24, (L.hero.w + 48) * k, L.hero.cap + 48); }
    fall(ctx, L.hero, M, L.heroBase, t, j => A.tHero + j * .022, COL.limeInk);
    ctx.fillStyle = IVORY; setFont(ctx, `italic 400 54px "${SER}"`);
    wipe(ctx, EP.sub, M, L.sub, E.outQuint(inv(A.tSub, A.tSub + .5, t)), 54);
    ctx.globalAlpha = 1;
    const kW = inv(A.stepT + .08, A.stepT + .36, t);
    if (kW < 1) wipeIn(ctx, lerp(-200, W + 200, E.outQuart(kW)), false, () => { ctx.fillStyle = COL.lime; ctx.fillRect(0, 0, W, H); });
  }

  const T = () => ({ a0: A.cut1 - .1, a1: A.cut1 + .16, b0: A.back - .14, b1: A.back + .12, tT: A.stepT + .08 });
  function draw(ctx, t) {
    const { a0, a1, b0, b1, tT } = T();
    if (t < a0) drawRow(ctx, t);
    else if (t < a1) { drawRow(ctx, t); wipeIn(ctx, lerp(-200, W + 200, E.outQuart(inv(a0, a1, t))), true, () => drawQ(ctx, t)); }
    else if (t < b0) drawQ(ctx, t);
    else if (t < b1) { drawQ(ctx, t); wipeIn(ctx, lerp(W + 200, -200, E.inOutCubic(inv(b0, b1, t))), false, () => drawRow(ctx, t)); }
    else if (t < tT) drawRow(ctx, t);
    else drawTitle(ctx, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  }

  function post(o, t) {
    const { a0, a1, b0, b1 } = T(), br = t < a0 ? 0 : t < a1 ? inv(a0, a1, t) : t < b0 ? 1 : t < b1 ? 1 - inv(b0, b1, t) : 0;
    o.setTransform(1, 0, 0, 1, 0, 0);
    sctx.filter = 'brightness(0.6) contrast(2.6) blur(8px)'; sctx.drawImage(o.canvas, 0, 0, 480, 270);
    o.globalCompositeOperation = 'screen'; o.globalAlpha = lerp(.17, .05, br); o.drawImage(small, 0, 0, W, H);
    o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
    const v = o.createRadialGradient(W / 2, H / 2, H * .5, W / 2, H / 2, W * .66);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${lerp(.48, .1, br)})`);
    o.fillStyle = v; o.fillRect(0, 0, W, H);
    for (const [name, at, al] of HITS()) tx(o, name, t, at, al);
  }

  const HITS = () => [
    ['shA', A.dive0 + .05, .85],
    ['shB', A.locks[0] - .1, .9],
    ['shC', A.locks[1] - .1, .85],
    ['cvo1', A.locks[2] - .1, .75],
    ['stk3', A.cut1, .95],
    ['leakW', A.back + .05, .95],
    ['leakL', A.cut3, .9],
    ['stk4', A.stepT, 1],
  ];
  function tx(o, name, t, at, alpha) {
    const m = TXM[name]; if (!m) return drawTx(o, LIB, name, t, at, alpha);
    const i = Math.floor((t - at + m.peak) * 30); if (i < 0 || i >= m.n) return;
    const edge = Math.min(1, i / 2, (m.n - 1 - i) / 3);
    o.setTransform(1, 0, 0, 1, 0, 0); o.globalCompositeOperation = 'screen'; o.globalAlpha = alpha * Math.max(0, edge);
    o.drawImage(txImg[name][i], 0, 0, W, H); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over';
  }
  return scene;
}
