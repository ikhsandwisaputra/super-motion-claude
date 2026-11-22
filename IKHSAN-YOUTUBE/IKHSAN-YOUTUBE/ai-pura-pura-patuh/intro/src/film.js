// Pengantar "SATU BARIS" — Relentless non-conformist (v2, kiblat Video 1/2/3).
// Ruang studio gelap RNC murni (#0B0C09 + ruler ticks lantai + bokeh debu — ZERO coding video ramai!),
// row zoom-back khas RNC (alternating kanan/kiri) + Aset berlapis Ahpo A01 (Dua Pintu semi-3D + LED rekam berkedip + gembok mengayun) +
// stabilo terukur presisi piksel + pertanyaan dunia terang + wordmark brake + disclaimer dive ke lime -> Title Card Terang -> dive ke Bab Peta!
import { W, H, FPS, clamp, inv, lerp, E } from './engine.js';
import { CFG, COL, DISP, SER, MONO, D2R, rnd, noise1, setFont, mk } from './lib.js';
import { loadTx, drawTx } from './txlib.js';
import { srcTag } from './kit.js';

export const EP = {
  hook: [
    { img: 'kutipan/arxiv-computer-science-artificial-intelligence.png', side: 1, h: 480, grain: .22, doc: true,
      lead: ['Bayangkan', 'kejadian', 'unik', 'di'], hero: 'DESEMBER 2024', split: [0, 9],
      // Pixel-verified from build/hl_rulers.jpg: "Alignment faking in large language models"
      hl: { dark: false, rects: [[0.015, 0.365, 0.425, 0.095]] },
      src: 'Sumber: arXiv:2412.14093, 18 Des 2024', lit: ['#FFFFFF', '#8E9088'] },
    { img: 'kutipan/blog-redwood-research-blog.png', side: -1, h: 470, grain: .22, doc: true,
      label: ['BUKU', 'CATATAN'], lead: ['tim', 'peneliti', 'memberi'], hero: 'SCRATCHPAD', split: [0, 7], tail: 'tak bakal diintip.',
      // Pixel-verified from build/hl_rulers.jpg: "Alignment faking in large / language models"
      hl: { dark: false, rects: [[0.275, 0.485, 0.625, 0.125], [0.275, 0.665, 0.655, 0.145]] },
      src: 'Sumber: blog.redwoodresearch.org, 19 Des 2024', lit: ['#FFFFFF', '#8A8C84'] },
    { ahpo: 'A01', side: 0, h: 720, grain: .14,
      lead: ['Dua', 'pintu', 'obrolan', 'berbeda:'],
      src: 'ILUSTRASI STUDIO · Dua pintu uji laboratorium (Ahpo / PhotoCraft)' },
    { img: 'kutipan/techcrunch-new-anthropic-study-shows-ai-really.png', side: -1, h: 470, grain: .24, doc: true,
      label: ['CATATAN', 'BOCOR'], lead: ['menulis', 'rencana'], hero: 'PURA-PURA NURUT', split: [0, 10], tail: 'pengawas pergi = tolak.',
      // Pixel-verified from build/hl_rulers.jpg: TechCrunch dark headline
      hl: { dark: true, rects: [[0.04, 0.15, 0.88, 0.31]] },
      src: 'Sumber: TechCrunch, 18 Des 2024', lit: ['#F6F6F0', '#868880'] },
  ],
  q: [
    { lead: ['Kok', 'bisa', 'rumus', 'kelakuan'], hero: 'MIRIP NYONTEK?', split: [0, 6] },
    { lead: ['punya', 'siasat'], hero: 'AKTING PATUH?', split: [0, 7] },
  ],
  dLead: ['Angka', 'di', 'video', 'ini', 'dari', 'sumber', 'resmi:'],
  src: [['ARXIV', 'REDWOOD RESEARCH'], ['APOLLO RESEARCH', 'PALISADE'], ['NIST CAISI', 'KOMDIGI / OJK']],
  dTail: ['Ini', 'video'], dHero: 'EDUKASI.',
  lead: ['Catatan rahasia di lab', 'bocor —'], midHi: 'AI', mid: ' PURA-PURA PATUH', hero: 'SAAT TAHU DIUJI?', no: '05',
  foot: 'Sumber: arXiv · Redwood · Apollo · Palisade · NIST · Komdigi · OJK · video edukasi',
};

const ROOM = '#0B0C09', IVORY = '#F1EFE6', INK = '#11120E', BL = [0, 4, 9, 17, 30, 50];
const ZD = 0.72, ZF = 6, VY0 = 520, WM = 5;

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
  ctx.textAlign = 'left';
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
  gr.addColorStop(0, '#FAFAF6'); gr.addColorStop(.6, '#F0EFE9'); gr.addColorStop(1, '#DDDCD3');
  ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
};
function wipeIn(ctx, edge, fromLeft, inner) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.save(); ctx.beginPath();
  if (fromLeft) { ctx.moveTo(-10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(-10, H + 10); }
  else { ctx.moveTo(W + 10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(W + 10, H + 10); }
  ctx.closePath(); ctx.clip(); inner(); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export function makeFilm() {
  const OV = { lamp: 39, wash: 34 }, ovImg = {}, txImg = {}, NZ = [], A01 = {};
  let TXM = {}, LIB = { meta: {}, img: {} }, TL, A, bokeh, fleck, sprites, CUES, CHAPS;
  const [small, sctx] = mk(480, 270), [wmC, wmG] = mk(1600, 640);
  const HL = [], QL = {}, PL = {};
  const scene = { dur: 1, cuts: [], K: 8, grain: 0.035, load, post, draw, cues: () => ({ cues: CUES, chapters: CHAPS }) };
  const img = u => fetch(u).then(r => r.blob()).then(createImageBitmap);

  async function sprite(e) {
    const bm = await img(`../assets/shared/${e.img}`);
    const P = 130, w = bm.width + 2 * P, h = bm.height + 2 * P, [base, g] = mk(w, h), [sh, q] = mk(w, h);
    if (e.doc) g.filter = 'saturate(.86) contrast(1.1) brightness(.97)';
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

  async function loadA01() {
    const base = '../assets/shared/ahpo/A01/';
    const files = {
      pantulan: 'A01_02_MG_pantulan.png',
      bayangan: 'A01_03_MG_bayangan.png',
      pintuKiri: 'A01_04_MG_pintu-kiri-diawasi.png',
      kamera: 'A01_05_FG_kamera-pengawas.png',
      lampuMerah: 'A01_06_FG_lampu-rekam-merah.png',
      pintuKanan: 'A01_07_MG_pintu-kanan-terkunci.png',
      gembok: 'A01_08_FG_gembok-kuningan.png',
    };
    await Promise.all(Object.entries(files).map(async ([k, fn]) => {
      const bm = await img(base + fn);
      const [c, g] = mk(2000, 1125); // 0.5x exact scale for crisp 1080p performance
      g.imageSmoothingQuality = 'high';
      g.drawImage(bm, 0, 0, 2000, 1125);
      A01[k] = c;
    }));
    // Build blurred composite fallback for depth-of-field fade
    const [baseC, g] = mk(2000, 1125);
    for (const k of ['pantulan', 'bayangan', 'pintuKiri', 'kamera', 'lampuMerah', 'pintuKanan', 'gembok']) {
      g.drawImage(A01[k], 0, 0);
    }
    const lv = BL.map((b, i) => {
      if (!i) return baseC;
      const [c, x] = mk(1000, 562); x.filter = `blur(${b / 2}px)`; x.drawImage(baseC, 0, 0, c.width, c.height); return c;
    });
    return { lv, w: 2000, h: 1125, iw: 2000, ih: 1125, isA01: true };
  }

  // Live animated Ahpo A01 Dual Doors inside the depth row (at scale 2000x1125 centered at 0,0)
  function drawA01Live(ctx, t, a, foc) {
    const W2 = 2000, H2 = 1125;
    const tL = A.doors[0], tR = A.doors[1];
    const kL = E.outQuint(inv(tL - .18, tL + .36, t));
    const kR = E.outQuint(inv(tR - .18, tR + .36, t));
    // Dim left/right subtly to guide eye when narrator speaks each door
    const aL = lerp(0.88, 1.0, kL) * lerp(1.0, 0.72, kR);
    const aR = lerp(0.75, 1.0, kR);

    ctx.save();
    // 1. Floor reflection + contact shadow (separate layers!)
    ctx.globalAlpha = a * 0.9;
    ctx.drawImage(A01.pantulan, -W2 / 2, -H2 / 2);
    ctx.drawImage(A01.bayangan, -W2 / 2, -H2 / 2);

    // 2. Left Door (Pintu Gratis — Diawasi) + Camera + Blinking Red Recording LED
    ctx.globalAlpha = a * aL;
    ctx.drawImage(A01.pintuKiri, -W2 / 2, -H2 / 2);
    ctx.drawImage(A01.kamera, -W2 / 2, -H2 / 2);
    const blink = t >= tL - 0.1 ? (0.45 + 0.55 * (0.5 + 0.5 * Math.sin((t - tL) * 7.5))) : 0.35;
    ctx.globalAlpha = a * aL * blink;
    ctx.drawImage(A01.lampuMerah, -W2 / 2, -H2 / 2);

    // 3. Right Door (Pintu Berbayar — Terkunci) + Swinging Brass Padlock around exact LAPIS.md pivot (2472, 1244 -> 1236, 622 in 2000x1125)
    ctx.globalAlpha = a * aR;
    ctx.drawImage(A01.pintuKanan, -W2 / 2, -H2 / 2);
    const sR = Math.max(0, t - tR);
    const swing = sR > 0 ? (11 * Math.exp(-sR * 2.4) * Math.sin(sR * 9.5) + 1.1 * Math.sin(t * 1.4)) * D2R : 1.0 * Math.sin(t * 1.1) * D2R;
    const pivX = 1236 - W2 / 2, pivY = 622 - H2 / 2;
    ctx.save();
    ctx.translate(pivX, pivY);
    ctx.rotate(swing);
    ctx.drawImage(A01.gembok, -1236, -622);
    ctx.restore();

    // 4. Clean kinetic typography anchored inside the exact empty glass/panel bboxes of A01!
    // Left door upper smoked glass area: x=[410..795], y=[285..555] in 2000x1125 -> local x=[-590..-205], y=[-278..-8]
    if (kL > 0.01 && foc > 0.2) {
      const lx = -398, ly = -165;
      ctx.globalAlpha = a * kL * foc;
      ctx.fillStyle = COL.lime;
      ctx.fillRect(lx - 155, ly - 52, 310 * kL, 42);
      setFont(ctx, `700 21px "${MONO}"`, 2); ctx.fillStyle = COL.limeInk; ctx.textAlign = 'center';
      if (kL > 0.35) ctx.fillText('PINTU GRATIS', lx, ly - 24);
      setFont(ctx, `400 58px "${DISP}"`, 2); ctx.fillStyle = IVORY;
      ctx.fillText('DIAWASI PENGAWAS', lx, ly + 48);
      setFont(ctx, `italic 380 25px "${SER}"`); ctx.fillStyle = 'rgba(241,239,230,.85)';
      ctx.fillText('dipakai latih ulang otak AI', lx, ly + 92);
    }
    // Right door upper solid recessed panel: x=[1215..1585], y=[285..555] in 2000x1125 -> local x=[215..585], y=[-278..-8]
    if (kR > 0.01 && foc > 0.2) {
      const rx = 398, ry = -165;
      ctx.globalAlpha = a * kR * foc;
      ctx.fillStyle = IVORY;
      ctx.fillRect(rx - 165, ry - 52, 330 * kR, 42);
      setFont(ctx, `700 21px "${MONO}"`, 2); ctx.fillStyle = INK; ctx.textAlign = 'center';
      if (kR > 0.35) ctx.fillText('PINTU BERBAYAR', rx, ry - 24);
      setFont(ctx, `400 58px "${DISP}"`, 2); ctx.fillStyle = IVORY;
      ctx.fillText('TANPA PENGAWAS', rx, ry + 48);
      setFont(ctx, `italic 380 25px "${SER}"`); ctx.fillStyle = 'rgba(241,239,230,.85)';
      ctx.fillText('obrolan tidak direkam', rx, ry + 92);
    }
    ctx.textAlign = 'left';
    ctx.restore();
  }

  async function load() {
    const j = async u => (await fetch(u)).json();
    TL = await j('./timeline.json'); A = TL.A;
    CUES = await j('../build/cues.json').catch(() => ({}));
    CHAPS = await j('../build/chapters.json').catch(() => []);
    scene.dur = A.end;
    for (const [name, n] of Object.entries(OV))
      ovImg[name] = await Promise.all(Array.from({ length: n }, async (_, i) => {
        const bm = await img(`../assets/ov/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`);
        const [c, g] = mk(bm.width, bm.height); g.filter = 'grayscale(1) contrast(1.15)'; g.drawImage(bm, 0, 0); return c;
      }));
    const used = new Set(HITS().map(h => h[0]));
    LIB = await loadTx('../assets/txlib/', [...used].filter(nm => /^(stk|cmc|ldr|shD|cvo|gr|hw)/.test(nm)));
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
    for (const e of EP.hook) sprites.push(e.ahpo ? await loadA01() : await sprite(e));
    let g, gr;
    [bokeh, g] = mk(96, 96); gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
    gr.addColorStop(0, 'rgba(244,246,236,.8)'); gr.addColorStop(.72, 'rgba(236,240,226,.62)');
    gr.addColorStop(.86, 'rgba(230,236,216,.28)'); gr.addColorStop(1, 'rgba(230,236,216,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
    [fleck, g] = mk(96, 96); gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
    gr.addColorStop(0, 'rgba(17,18,14,.8)'); gr.addColorStop(.6, 'rgba(17,18,14,.45)'); gr.addColorStop(1, 'rgba(17,18,14,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
  }

  function ov(ctx, name, t, start, alpha) {
    const i = Math.floor((t - start) * 30); if (i < 0 || i >= OV[name] || alpha <= 0) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = alpha;
    ctx.drawImage(ovImg[name][i], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  // ── Signature RNC backward-snap depth row (kiblat Video 1/2/3!) ─────────────────────────────────────────
  function rowC(t) {
    const L = A.locks;
    if (t < A.cut1) {
      let c = -1.25 + .03 * Math.min(t, A.dive0);
      for (let i = 0; i < L.length; i++) {
        c = lerp(c, i, E.outQuart(inv(L[i] - .34, L[i] + .22, t)));
        const hold = i < L.length - 1 ? L[i + 1] - .34 : A.cut1;
        if (t > L[i]) c += .022 * (Math.min(t, hold) - L[i]); // slow iconic pull-back during every hold
      }
      return c + .28 * E.outQuart(inv(A.cut1 - .18, A.cut1 + .06, t));
    }
    let c = lerp(-.7, WM, E.snap(inv(A.back - .14, A.lockW, t)));
    if (t > A.lockW) {
      const s = t - A.lockW;
      c += .07 * Math.exp(-s * 8) * Math.sin(s * 20) + .022 * Math.min(s, A.cut3 - A.lockW);
    }
    return c + .88 * E.outQuart(inv(A.cut3 - .04, A.cut3 + .5, t)) + .012 * Math.max(0, t - A.cut3);
  }
  const levelOf = b => {
    if (b <= 0) return 0;
    for (let i = 1; i < BL.length; i++) if (b <= BL[i]) return i - 1 + (b - BL[i - 1]) / (BL[i] - BL[i - 1]);
    return BL.length - 1;
  };

  function drawAsset(ctx, i, d, t, VX, VY, lampK, f, dim) {
    if (d > .92 || d < -6) return;
    const sp = sprites[i], e = EP.hook[i], s = 1 / (1 - ZD * d);
    const k = (e.ahpo ? e.h / sp.ih : Math.min(e.h / sp.ih, 780 / sp.iw)) * s;
    const blurS = d > 0 ? 84 * Math.max(0, d - .03) : 15 * Math.max(0, -d - .22), lvF = levelOf(blurS / k);
    let a = inv(.92, .55, d) * lampK * dim;
    if (d < 0) a *= lerp(1, .38, inv(.22, 1.2, -d)) * lerp(1, .55, inv(1.2, 2.2, -d));
    const x = VX + s * e.side * 465, y = VY + s * ((e.ahpo ? 54 : 20) + 5 * Math.sin(t * .9 + i * 2));
    const foc = inv(.55, .1, Math.abs(d));

    if (foc > 0) {
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.globalCompositeOperation = 'screen';
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 560 * s);
      gr.addColorStop(0, `rgba(226,232,212,${.14 * foc * lampK * dim})`); gr.addColorStop(1, 'rgba(226,232,212,0)');
      ctx.fillStyle = gr; ctx.fillRect(-580 * s, -580 * s, 1160 * s, 1160 * s); ctx.globalCompositeOperation = 'source-over';
    }
    if (!e.ahpo) {
      ctx.setTransform(1, 0, 0, 1, x, y + (e.h / 2 + 30) * s); ctx.scale(1, .16);
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 320 * s);
      gr.addColorStop(0, `rgba(0,0,0,${.55 * a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr; ctx.fillRect(-320 * s, -320 * s, 640 * s, 640 * s);
    }

    const wf = Math.floor(t * 12), wx = e.doc ? (rnd(wf * 3.1 + i) - .5) * 2.5 : 0, wy = e.doc ? (rnd(wf * 5.7 + i) - .5) * 2 : 0;
    ctx.setTransform(1, 0, 0, 1, x + wx, y + wy);
    ctx.rotate((e.side * 4.5 * d + (e.ahpo ? 0.35 : 1.0) * Math.sin(t * .7 + i)) * D2R);
    ctx.scale(k, k);

    if (sp.isA01 && lvF < 0.35) {
      drawA01Live(ctx, t, a, foc);
    } else {
      const l0 = Math.floor(lvF), l1 = Math.min(BL.length - 1, l0 + 1), fr = lvF - l0;
      ctx.globalAlpha = a; ctx.drawImage(sp.lv[l0], -sp.w / 2, -sp.h / 2, sp.w, sp.h);
      if (fr > .02 && l1 !== l0) { ctx.globalAlpha = a * fr; ctx.drawImage(sp.lv[l1], -sp.w / 2, -sp.h / 2, sp.w, sp.h); }
    }

    if (e.grain && a > .02 && !sp.isA01) {
      ctx.save(); ctx.beginPath(); ctx.rect(-sp.iw / 2, -sp.ih / 2, sp.iw, sp.ih); ctx.clip();
      ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = a * e.grain;
      const nz = NZ[f % 4], ox = rnd(f * 1.7) * 256, oy = rnd(f * 2.3) * 256, gs = 1.6 / k;
      ctx.translate(-sp.iw / 2 - ox * gs, -sp.ih / 2 - oy * gs); ctx.scale(gs, gs);
      ctx.fillStyle = ctx.createPattern(nz, 'repeat'); ctx.fillRect(0, 0, sp.iw / gs + 512, sp.ih / gs + 512); ctx.restore();
    }

    // Pixel-verified stabilo highlighter over exact article headline
    const hT = A.hl[i];
    if (e.hl && hT && t > hT && a > .02) {
      const q = e.hl;
      ctx.save();
      ctx.globalCompositeOperation = q.dark ? 'screen' : 'multiply';
      ctx.fillStyle = q.dark ? 'rgba(200,245,60,0.42)' : 'rgba(200,245,60,0.88)';
      q.rects.forEach(([rx, ry, rw, rh], ri) => {
        const kh = E.outQuint(inv(hT + ri * .24, hT + ri * .24 + .38, t));
        if (kh <= 0) return;
        ctx.globalAlpha = a;
        ctx.fillRect((rx - .5) * sp.iw, (ry - .5) * sp.ih, rw * sp.iw * kh, rh * sp.ih);
      });
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (foc > 0) {
      ctx.setTransform(s, 0, 0, s, x, y); ctx.globalAlpha = .72 * foc * a; ctx.fillStyle = IVORY;
      ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      setFont(ctx, `700 22px "${MONO}"`, 3);
      ctx.fillText(`0${i + 1}`, 0, e.h / 2 + (e.ahpo ? 36 : 82));
      ctx.fillRect(-18, e.h / 2 + (e.ahpo ? 48 : 96), 36, 2);
      ctx.textAlign = 'left'; ctx.globalAlpha = 1;
    }
  }

  function hookType(ctx, t, VX, VY) {
    const Ls = A.locks;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Cold open before item 0 locks in
    if (t < Ls[0] + .18) {
      const kOut = E.inCubic(inv(Ls[0] - .34, Ls[0] + .14, t));
      const aOpen = 1 - E.inCubic(inv(A.dive0 - .05, A.dive0 + .28, t));
      if (aOpen > .01) {
        ctx.save(); ctx.globalAlpha = aOpen; ctx.fillStyle = IVORY;
        const L = PL.open || (PL.open = fitDisp(ctx, 'KEPERGOK', 1320, 330));
        setFont(ctx, `italic 380 82px "${SER}"`);
        wipeWords(ctx, ['Kabar', 'genting.', 'Mesin', 'pintar', 'kita'], A.open.slice(0, 5), 960, 340, 82, t, 'center');
        const kC = E.outQuart(inv(A.open[5] - .05, A.open[5] + .28, t));
        if (kC > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(960 - L.w / 2, 684, L.w * kC, 8); }
        fall(ctx, L, 960 - L.w / 2, 660, t, j => A.open[5] - .06 + j * .014, IVORY);
        ctx.restore();
      }
      if (t >= A.dive0 - .1) {
        const sc = lerp(1, 2.2, kOut);
        ctx.save(); ctx.translate(960, 540); ctx.scale(sc, sc); ctx.translate(-960, -540);
        ctx.globalAlpha = (1 - kOut) * inv(A.dive0 - .05, A.dive0 + .15, t);
        if (kOut > .05) ctx.filter = `blur(${(kOut * 20).toFixed(1)}px)`;
        ctx.fillStyle = IVORY; setFont(ctx, `italic 380 80px "${SER}"`);
        wipeWords(ctx, ['di', 'depan', 'penguji.'], A.tanya0.slice(2, 5), 960, 400, 80, t, 'center');
        const L2 = PL.akting || (PL.akting = fitDisp(ctx, 'AKTING PATUH', 1120, 290));
        const x2 = 960 - L2.w / 2, b2 = 690;
        const ks = E.snap(inv(A.tanya0[0] - .03, A.tanya0[0] + .16, t));
        if (ks > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(x2 - 20, b2 - L2.cap - 24, (L2.w + 40) * ks, L2.cap + 48); }
        fall(ctx, L2, x2, b2, t, splitStart([0, 7], [A.tanya0[0], A.tanya0[1]], .02), COL.limeInk);
        ctx.restore();
      }
    }

    EP.hook.forEach((e, i) => {
      const tOut = i < Ls.length - 1 ? Ls[i + 1] - .34 : A.cut1 - .1, out = inv(tOut, tOut + .2, t);
      if (t < Ls[i] - .05 || out >= 1) return;
      if (e.ahpo) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1 - out; ctx.fillStyle = IVORY;
        ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'center';
        setFont(ctx, `italic 380 76px "${SER}"`);
        wipe(ctx, e.lead.join(' '), 960, 148, E.outQuint(inv(Ls[i], Ls[i] + .48, t)), 76, 'center');
        ctx.textAlign = 'left';
        srcTag(ctx, e.src, 150, 1020, t, A.src[i]);
        return;
      }
      const L = HL[i] || (HL[i] = fitDisp(ctx, e.hero, 780, 250));
      const sT = lerp(1, .82, E.inCubic(out)), left = e.side > 0, xa = left ? 160 : 1760;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(VX, VY); ctx.scale(sT, sT); ctx.translate(-VX, -VY);
      ctx.globalAlpha = 1 - out; ctx.fillStyle = IVORY; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      const top = 470, base = top + L.cap, hx = left ? xa : xa - L.w;
      if (e.label) {
        setFont(ctx, `700 38px "${MONO}"`, 4);
        const labW = ctx.measureText(e.label.join(' ')).width;
        let x = left ? xa : xa - labW; ctx.save(); ctx.fillStyle = 'rgba(241,239,230,.85)';
        e.label.forEach((wd, j) => {
          const tj = A.lab[i][j], k = E.outCubic(inv(tj, tj + .18, t));
          if (k > 0) { ctx.globalAlpha = (1 - out) * k; ctx.fillText(wd, x + (1 - k) * 14, top - 135); }
          x += ctx.measureText(wd + ' ').width;
        });
        ctx.restore();
      }
      if (e.lead) {
        setFont(ctx, `italic 380 72px "${SER}"`);
        wipeWords(ctx, e.lead, A.lead[i], xa, top - 38, 72, t, left ? 'left' : 'right');
      }
      fall(ctx, L, hx, base, t, splitStart(e.split, A.hero[i], .02), i === 3 ? COL.lime : IVORY);
      if (e.tail) {
        setFont(ctx, `italic 380 58px "${SER}"`); ctx.fillStyle = IVORY;
        wipe(ctx, e.tail, xa, base + 78, E.outQuint(inv(A.tail[i], A.tail[i] + .4, t)), 58, left ? 'left' : 'right');
      }
      setFont(ctx, `400 21px "${MONO}"`, 1); const sw = ctx.measureText(e.src).width + 26;
      srcTag(ctx, e.src, left ? xa : xa - sw, Math.min(1022, base + 132), t, A.src[i]);
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
    const d = WM - c; if (d > .92) return;
    const key = Math.round(E.snap(inv(A.slab - .04, A.slab + .16, t)) * 400);
    if (key !== wmKey) { wmArt(wmG, t); wmKey = key; }
    const kD = E.inOutCubic(inv(A.cut3 - .22, A.cut3 + .2, t)), s = d > 0 ? 1 / (1 - ZD * d) : 1 / (1 + .12 * Math.min(-d, .2));
    const sc = lerp(s, .17, kD), x = lerp(VX, 1642, kD), y = lerp(VY - 20, 116, kD);
    const b = d > .03 ? 70 * (d - .03) : 0;
    ctx.setTransform(sc, 0, 0, sc, x, y); ctx.globalAlpha = inv(.92, .6, d);
    if (b > .7 && kD < .5) ctx.filter = `blur(${b.toFixed(1)}px)`;
    ctx.drawImage(wmC, -800, -290); ctx.filter = 'none'; ctx.globalAlpha = 1;
  }

  // Disclaimer with iconic exponential dive into lime "EDUKASI." slab -> Title Card!
  function discType(ctx, t, base0) {
    const M = 150, s = t - A.cut3; if (s < 0) return null;
    if (!PL.d) {
      const rows = EP.src.map(ws => {
        const str = ws.join(' / '), L = fitDisp(ctx, str, W - 2 * M, 152); let at = 0;
        const xs = ws.map(wd => { const x = L.xs[at] ?? 0; at += wd.length + 3; return x; });
        return { L, ws, xs };
      });
      setFont(ctx, `italic 380 80px "${SER}"`); const tw = ctx.measureText(EP.dTail.join(' ')).width;
      PL.d = { rows, tw, H: fitDisp(ctx, EP.dHero, 900, 150) };
      let y = 328; rows.forEach(r => { r.base = y + r.L.cap; y = r.base + 38; });
      PL.d.base = y + 28 + PL.d.H.cap; PL.d.hx = M + tw + 40;
    }
    const D = PL.d, kF = inv(A.stepT - .18, A.stepT + .12, t), fx = D.hx + D.H.w / 2, fy = D.base - D.H.cap / 2;
    ctx.setTransform(base0);
    if (kF > 0) { const S = Math.exp(Math.log(34) * E.inCubic(kF)); ctx.translate(fx, fy); ctx.scale(S, S); ctx.translate(-fx, -fy); }
    const aT = 1 - inv(.1, .5, kF);
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
    ctx.globalAlpha = 1;
    const k = E.snap(inv(A.hib - .05, A.hib + .14, t));
    if (k > 0) {
      ctx.fillStyle = COL.lime;
      ctx.fillRect(D.hx - 22, D.base - D.H.cap - 24, (D.H.w + 44) * k, D.H.cap + 48);
    }
    ctx.globalAlpha = aT; fall(ctx, D.H, D.hx, D.base, t, j => A.hib + j * .016, COL.limeInk); ctx.globalAlpha = 1;
    return kF;
  }

  function drawRow(ctx, t) {
    const f = Math.floor(t * FPS), hook = t < A.cut1, c = rowC(t), sD = t - A.cut3;
    const lampK = hook ? clamp(E.outCubic(inv(.02, .45, t)) * (.95 + .05 * noise1(t * 40))) : 1;
    const hit = hook
      ? hitOf(t, [[A.open[5], 5], [A.tanya0[0], 9], ...A.locks.map(l => [l, 6]), ...A.doors.map(x => [x, 4])])
      : hitOf(t, [[A.lockW, 9], [A.slab + .1, 6], ...A.src2.map(x => [x + .2, 3]), [A.hib + .18, 7]]);
    const VX = W / 2 + (rnd(f * 2.3) - .5) * 2 * hit, VY = VY0 + (rnd(f * 5.3) - .5) * (2 + 2 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    // Pure RNC vanishing-point studio glow (ZERO noisy background coding video!)
    const gr = ctx.createRadialGradient(VX, VY - 40, 0, VX, VY, 1350);
    gr.addColorStop(0, `rgba(214,222,198,${.17 * lampK})`); gr.addColorStop(.45, `rgba(120,130,108,${.07 * lampK})`);
    gr.addColorStop(1, 'rgba(60,66,52,0)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    // Signature floor ruler ticks along the depth row
    for (let j = Math.floor(2 * (c - 3.6)); j <= Math.ceil(2 * (c + .95)); j++) {
      const rel = j * .5 - c; if (rel > .95 || rel < -3.6) continue;
      const s = 1 / (1 - ZD * rel), a = .26 * lampK * inv(.95, .6, rel) / (1 + 1.1 * Math.max(0, -rel)), big = j % 2 === 0;
      ctx.fillStyle = `rgba(241,239,230,${a})`;
      for (const sd of [-1, 1]) ctx.fillRect(VX + sd * 170 * s - (big ? 46 : 20) * s, VY + 395 * s, (big ? 92 : 40) * s, Math.max(1.5, 3 * s));
    }
    const dim = hook ? 1 : lerp(.8, .48, inv(0, .5, sD));
    for (let i = 0; i < EP.hook.length; i++) drawAsset(ctx, i, i - c, t, VX, VY, lampK, f, dim);
    if (hook) hookType(ctx, t, VX, VY); else drawWM(ctx, t, c, VX, VY);
    // Dust bokeh passing the lens
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 40; i++) {
      const rel = ((rnd(i + 99) * 4.2 - c) % 4.2 + 4.2) % 4.2 - 3.3;
      const s = 1 / (1 - ZD * rel), r = clamp(4 + 46 * Math.abs(rel) * s * .5, 4, 150);
      const x = VX + s * ((rnd(i) * 2 - 1) * 1250 + t * 16 * (rnd(i + 5) - .5)), y = VY + s * ((rnd(i + 50) * 2 - 1) * 520 - t * 12 * rnd(i + 9));
      ctx.globalAlpha = clamp(lampK * 3.6 / r, .025, .38) * inv(.9, .7, rel) * inv(-3.3, -2.9, rel);
      ctx.drawImage(bokeh, x - r, y - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (lampK < 1) { ctx.fillStyle = `rgba(4,4,3,${1 - lampK})`; ctx.fillRect(0, 0, W, H); }
    if (hook) ov(ctx, 'lamp', t, 0, .18); else ov(ctx, 'wash', t, A.lockW - .05, .22);
    if (!hook && sD >= 0) {
      const push = 1 + .035 * inv(.3, 11, sD) + .004 * hit;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2 + VX - W / 2, H / 2 + VY - VY0);
      ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
      const kF = discType(ctx, t, ctx.getTransform());
      if (kF > .76) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.lime; ctx.globalAlpha = inv(.76, .93, kF); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  // ── Questions — iconic forward flight through rotated 3D type planes (light world) ──────────────────────
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
    const e = EP.q[i];
    if (i === 0) {
      const L = QL[0] || (QL[0] = fitDisp(ctx, e.hero, 1450, 420)), top = -20, base = top + L.cap;
      setFont(ctx, `italic 380 80px "${SER}"`);
      wipeWords(ctx, e.lead, A.q1lead.slice(0, e.lead.length), 0, top - 44, 80, t, 'center');
      ghost(ctx, L, -L.w / 2, base, E.outQuint(inv(A.cut1, A.cut1 + .5, t)), t, splitStart(e.split, A.q1h, .02), 'rgba(17,18,14,.22)');
      fall(ctx, L, -L.w / 2, base, t, splitStart(e.split, A.q1h, .02), INK); return;
    }
    const L = QL[1] || (QL[1] = fitDisp(ctx, e.hero, 1300, 330)), top = -10, base = top + L.cap, x = -L.w / 2;
    setFont(ctx, `italic 380 90px "${SER}"`);
    wipeWords(ctx, e.lead, A.q2lead, 0, top - 48, 90, t, 'center');
    const hs = splitStart(e.split, A.q2h, .02);
    const k = E.snap(inv(A.q2h[0] - .03, A.q2h[0] + .15, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(x - 22, base - L.cap - 22, (L.xs[6] + 36) * k, L.cap + 44); }
    fall(ctx, L, x, base, t, hs, j => j < 6 ? COL.limeInk : INK);
  }
  function drawQ(ctx, t) {
    const f = Math.floor(t * FPS), c = qCam(t);
    const hit = hitOf(t, [[A.q1h[0] + .15, .9], [A.q2h[0] + .15, 1.1]]);
    const cx = W / 2 + (rnd(f * 2.3) - .5) * 18 * hit, cy = H / 2 + (rnd(f * 5.3) - .5) * (2 + 14 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; lightBg(ctx);
    ctx.lineCap = 'butt';
    for (let i = 0; i < 52; i++) {
      const rel = -1.4 + rnd(i + 40) * 5.4 - c; if (rel > .75 || rel < -.6) continue;
      const s = ZF ** -rel, a = rnd(i) * 7, R = 300 + 760 * rnd(i + 7), x = cx + Math.cos(a) * R * s, y = cy + Math.sin(a) * R * .62 * s, r = 11 * s;
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.strokeStyle = `rgba(17,18,14,${.34 * inv(.75, .35, rel) * (1 - inv(.15, .6, -rel))})`;
      ctx.lineWidth = Math.min(6, 1.6 * s);
      ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke();
    }
    for (let i = 1; i >= 0; i--) {
      const rel = i - c; if (rel > .8 || rel < -.55) continue;
      ctx.setTransform(1, 0, 0, 1, cx, cy); ctx.rotate(-rel * 11 * D2R * (i % 2 ? -1 : 1));
      const s = ZF ** -rel; ctx.scale(s, s);
      ctx.globalAlpha = rel > 0 ? inv(.8, .3, rel) : 1 - inv(.12, .55, -rel); qPlane(ctx, i, t);
    }
    for (let i = 0; i < 18; i++) {
      const rel = -1.6 + rnd(i + 40) * 4.8 - c; if (rel > .6 || rel < -.5) continue;
      const s = ZF ** -rel, a = rnd(i) * 7, R = 380 + 560 * rnd(i + 7), r = (9 + 16 * rnd(i + 3)) * s;
      ctx.setTransform(1, 0, 0, 1, cx, cy); ctx.globalAlpha = .45 * inv(.6, .2, rel) * (1 - inv(.1, .5, -rel));
      ctx.drawImage(fleck, Math.cos(a) * R * s - r, Math.sin(a) * R * .6 * s - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ov(ctx, 'wash', t, A.cut1 - .05, .28);
  }

  // ── Iconic Light Title Card (kiblat Video 1/2/3 — lime door slides off, dive into lime "AI" -> Bab Peta!) ─
  function drawTitle(ctx, t) {
    const M = 150, s = t - A.stepT, f = Math.floor(t * FPS);
    const hit = hitOf(t, [[A.tMid + .14, .5], [A.tHero + .2, 1.0]]), kE = inv(A.out, A.end - .05, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; lightBg(ctx);
    if (!PL.t) {
      const L = { hero: fitDisp(ctx, EP.hero, W - 2 * M, 390), mid: fitDisp(ctx, EP.midHi + EP.mid, 1460, 196) };
      setFont(ctx, `400 ${L.mid.size}px "${DISP}"`); L.hiW = ctx.measureText(EP.midHi).width;
      L.yLeadW = 286; L.yLead = 330 + L.mid.cap; L.heroBase = L.yLead + 72 + L.hero.cap; L.rule = L.heroBase + 68;
      L.mx0 = M + 20; PL.t = L;
    }
    const L = PL.t, push = 1 + .045 * inv(.3, 4.7, s) + .02 * hit, fx = L.mx0 + L.hiW / 2, fy = L.yLead - L.mid.cap / 2;
    ctx.translate(W / 2 + (rnd(f * 2.3) - .5) * 20 * hit, H / 2 + (rnd(f * 5.3) - .5) * (2 + 16 * hit));
    ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
    if (kE > 0) { const S = Math.exp(Math.log(60) * E.inCubic(kE)); ctx.translate(fx, fy); ctx.scale(S, S); ctx.translate(-fx, -fy); }
    const aT = 1 - inv(.08, .45, kE);
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = INK;
    ctx.globalAlpha = inv(.25, .55, s) * aT;
    setFont(ctx, `400 44px "${DISP}"`, 4); ctx.fillText(`${CFG.channel[0]} ${CFG.channel[1].toUpperCase()}`, M, 118);
    setFont(ctx, `700 22px "${MONO}"`, 3); ctx.textAlign = 'right'; ctx.fillText(`EPISODE ${EP.no}`, W - M, 114); ctx.textAlign = 'left';
    ctx.globalAlpha = aT;
    setFont(ctx, `italic 380 104px "${SER}"`); wipeWords(ctx, EP.lead, [A.stepT + .14, A.tMid - .05], M, L.yLeadW, 104, t);
    const n = EP.midHi.length, k = E.snap(inv(A.tMid - .04, A.tMid + .16, t));
    if (k > 0) { ctx.globalAlpha = 1; ctx.fillStyle = COL.lime; ctx.fillRect(L.mx0 - 20, L.yLead - L.mid.cap - 20, (L.hiW + 40) * k, L.mid.cap + 40); ctx.globalAlpha = aT; }
    fall(ctx, L.mid, L.mx0, L.yLead, t, j => j < n ? A.tMid + j * .03 : A.tMid + .12 + (j - n) * .018, j => j < n ? COL.limeInk : INK);
    const hs = j => A.tHero + j * .022;
    ghost(ctx, L.hero, M, L.heroBase, E.outQuint(inv(.35, .95, s)), t, hs, 'rgba(17,18,14,.2)');
    fall(ctx, L.hero, M, L.heroBase, t, hs, INK);
    const s2 = t - A.tSub, kf = E.outQuint(inv(0, .45, s2));
    if (kf > 0) {
      ctx.fillStyle = INK; ctx.globalAlpha = .5 * aT; ctx.fillRect(M, L.rule, (W - 2 * M) * kf, 2);
      ctx.globalAlpha = inv(.05, .3, s2) * aT; setFont(ctx, `700 24px "${MONO}"`, 5); ctx.fillText('DISCLAIMER', M, L.rule + 54);
      setFont(ctx, `400 23px "${MONO}"`); ctx.fillText(EP.foot, M + 240, L.rule + 54 + (1 - kf) * 12);
    }
    ctx.globalAlpha = 1;
    if (kE > .78) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.lime; ctx.globalAlpha = inv(.78, .94, kE); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    const kW = inv(A.stepT + .12, A.stepT + .4, t);
    if (kW < 1) wipeIn(ctx, lerp(-200, W + 200, E.outQuart(kW)), false, () => { ctx.fillStyle = COL.lime; ctx.fillRect(0, 0, W, H); });
    ov(ctx, 'wash', t, A.stepT + .1, .24);
  }

  const T = () => ({ a0: A.cut1 - .1, a1: A.cut1 + .16, b0: A.back - .14, b1: A.back + .12, tT: A.stepT + .12 });
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
    const { a0, a1, b0, b1, tT } = T();
    const br = t < a0 ? 0 : t < a1 ? inv(a0, a1, t) : t < b0 ? 1 : t < b1 ? 1 - inv(b0, b1, t) : t < tT - .2 ? 0 : inv(tT - .2, tT, t);
    o.setTransform(1, 0, 0, 1, 0, 0);
    sctx.filter = 'brightness(0.6) contrast(2.6) blur(8px)'; sctx.drawImage(o.canvas, 0, 0, 480, 270);
    o.globalCompositeOperation = 'screen'; o.globalAlpha = lerp(.18, .05, br); o.drawImage(small, 0, 0, W, H);
    o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
    const v = o.createRadialGradient(W / 2, H / 2, H * .5, W / 2, H / 2, W * .66);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${lerp(.48, .1, br)})`);
    o.fillStyle = v; o.fillRect(0, 0, W, H);
    for (const [name, at, al] of HITS()) tx(o, name, t, at, al);
  }

  const HITS = () => [
    ['shA', A.dive0 + .05, .9],
    ['shB', A.locks[0] - .1, .95],
    ['shC', A.locks[1] - .1, .9],
    ['stk2', A.locks[2] - .1, .88],
    ['cvo2', A.locks[3] - .1, .85],
    ['stk3', A.cut1, 1],
    ['leakW', A.back + .05, .95],
    ['leakL', A.cut3, .9],
    ['stk4', A.stepT, 1],
    ['leakR', A.end - .25, 1],
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
