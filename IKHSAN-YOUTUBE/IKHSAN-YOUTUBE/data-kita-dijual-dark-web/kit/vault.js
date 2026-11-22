// kit/vault.js — Komponen visual orisinal film data-kita-dijual-dark-web ("DIJAGA atau DIOBRAL?").
// Menghubungkan 6 paket semi-3D PhotoCraft Live (D01..D06, 4000x2250) dengan tipografi kinetik Super Motion,
// pita struk pasar gelap, penampang tangki PDNS 98% vs 2% + gembok terbuka gratis, kartu pingpong, & linimasa UU PDP.
// Nol neon / AI-slop (standar §8 + §9 + §10).
import { clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN, rnd, loadImg } from './kit.js';
import { drawAhpoLayered, ahpoPt, C_RED, C_AMBER } from './fisika.js';

export { C_RED, C_AMBER };
export const C_BLUE = '#3B82B6';

// ── Loader paket D01..D06 dari assets/ahpo/ ───────────────────────────────────────────────────────────────
export async function loadD(id, files, maxW = 1600) {
  const base = `../assets/shared/ahpo/${id}/`;
  const out = {};
  await Promise.all(Object.entries(files).map(async ([k, fn]) => {
    out[k] = await loadImg(base + fn, maxW).catch(() => null);
  }));
  return out;
}

export const D01_FILES = {
  pantulan: 'D01_02_MG_pantulan.png',
  bayangan: 'D01_03_MG_bayangan.png',
  kartu: 'D01_04_MG_kartu-identitas.png',
  label: 'D01_05_FG_label-harga-tali.png',
  karcis: 'D01_06_FG_karcis-parkir.png',
};
export const D02_FILES = {
  bayangan: 'D02_02_MG_bayangan.png',
  mesin: 'D02_03_MG_mesin-struk.png',
  pita: 'D02_04_FG_pita-struk-kosong.png',
  scanner: 'D02_05_FG_scanner-barcode.png',
  sinar: 'D02_06_FG_sinar-scanner.png',
};
export const D03_FILES = {
  bayangan: 'D03_02_MG_bayangan.png',
  brankas: 'D03_03_MG_brankas-kaca.png',
  kunci: 'D03_04_FG_kunci-admin.png',
  kail: 'D03_05_FG_kail-phishing.png',
  folder: 'D03_06_MG_folder-unduhan.png',
  berkas: 'D03_07_FG_berkas-terinfeksi.png',
};
export const D04_FILES = {
  pantulan: 'D04_02_MG_pantulan.png',
  bayangan: 'D04_03_MG_bayangan.png',
  tangki: 'D04_04_MG_tangki-brankas.png',
  pipa: 'D04_05_MG_pipa-batam.png',
  gembok: 'D04_06_FG_badan-gembok.png',
  belenggu: 'D04_07_FG_belenggu-gembok.png',
  kunci: 'D04_08_FG_kunci-dekripsi.png',
};
export const D05_FILES = {
  pantulan: 'D05_02_MG_pantulan.png',
  bayangan: 'D05_03_MG_bayangan.png',
  kursi: 'D05_04_MG_kursi-kosong.png',
  sorot: 'D05_05_FG_sorot-lampu.png',
  kitab: 'D05_06_MG_kitab-uu-pdp.png',
};
export const D06_FILES = {
  bayangan: 'D06_02_MG_bayangan.png',
  ponsel: 'D06_03_MG_ponsel-gelap.png',
  perisai: 'D06_04_FG_perisai-2fa.png',
};

// ── 1. Kartu Identitas D01 + Label Harga Ayun Pendulum Rp0,49 + Karcis Parkir Rp2.000 ────────────────────
export function drawD01Card(ctx, D01, cx, cy, scale, t, o = {}) {
  if (!D01 || !D01.kartu) return;
  const aMul = o.a ?? 1;
  if (aMul <= 0.01) return;
  const camX = o.camX ?? 0;
  const tTag = o.tTag ?? 0;
  const ageTag = Math.max(0, t - tTag);
  // Fisika pendulum teredam pada label harga yang tergantung di lubang tali (2724, 650)
  const swing = (t >= tTag ? 0.24 * Math.exp(-ageTag * 1.9) * Math.sin(ageTag * 9.5) : 0)
              + 0.03 * Math.sin(t * 2.1);
  const kTag = E.outQuint(inv(tTag, tTag + 0.35, t));
  const kKarcis = o.tKarcis != null ? E.outQuint(inv(o.tKarcis, o.tKarcis + 0.42, t)) : 0;

  drawAhpoLayered(ctx, [
    { im: D01.pantulan, par: 0.80, a: 0.7 },
    { im: D01.bayangan, par: 0.86, a: 0.9 },
    { im: D01.kartu, par: 0.94, a: 1 },
    kKarcis > 0 ? { im: D01.karcis, par: 1.05, a: kKarcis, dy: (1 - kKarcis) * 140 } : null,
    kTag > 0 ? { im: D01.label, par: 1.08, a: kTag, rot: swing, px: 2724, py: 650 } : null,
  ].filter(Boolean), cx, cy, scale, camX, 0, aMul);

  // Teks header editorial di atas kartu (bukan data asli)
  const [hx, hy] = ahpoPt(1920, 668, cx, cy, scale);
  ctx.save();
  ctx.globalAlpha *= aMul;
  setFont(ctx, MN(Math.round(44 * scale), 700), 4);
  ctx.fillStyle = 'rgba(241,239,230,0.88)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(o.cardTitle || 'IDENTITAS WARGA RI · ILUSTRASI', hx - camX * 0.09, hy);

  // Teks angka Rp0,49 di atas label harga yang ikut berayun presisi di pivot (2724, 650)!
  if (kTag > 0.05) {
    const [pvx, pvy] = ahpoPt(2724, 650, cx, cy, scale);
    const [tx, ty] = ahpoPt(3042, 1005, cx, cy, scale);
    ctx.save();
    ctx.globalAlpha *= kTag;
    ctx.translate(pvx - camX * 0.23, pvy);
    ctx.rotate(swing);
    ctx.translate(tx - pvx, ty - pvy);
    ctx.rotate(11.6 * D2R);
    setFont(ctx, MN(Math.round(30 * scale), 700), 3);
    ctx.fillStyle = LIME_INK;
    ctx.fillText('HARGA OBRAL', 0, -56 * scale);
    const pStr = o.price || 'Rp0,49';
    const pSize = Math.round((pStr.length > 7 ? 112 : 168) * scale);
    setFont(ctx, DSP(pSize), 1);
    ctx.fillText(pStr, 0, 26 * scale);
    ctx.restore();
  }

  // Teks di atas karcis parkir Rp2.000
  if (kKarcis > 0.05) {
    const [kx, ky] = ahpoPt(860, 1575, cx, cy, scale);
    ctx.save();
    ctx.globalAlpha *= kKarcis;
    const dy = (1 - kKarcis) * 140;
    setFont(ctx, MN(Math.round(30 * scale), 700), 2);
    ctx.fillStyle = '#15160F';
    ctx.fillText('PARKIR MOTOR', kx - camX * 0.2, ky + dy - 42 * scale);
    setFont(ctx, DSP(Math.round(108 * scale)), 1);
    ctx.fillText('Rp2.000', kx - camX * 0.2, ky + dy + 34 * scale);
    ctx.restore();
  }
  ctx.restore();
}

// ── 2. Mesin Kasir & Pita Struk Pasar Gelap D02 (cetak baris demi baris per ketukan VO!) ─────────────────
export function drawD02Receipt(ctx, D02, cx, cy, scale, t, items, o = {}) {
  if (!D02 || !D02.mesin) return;
  const aMul = o.a ?? 1;
  if (aMul <= 0.01) return;
  const camX = o.camX ?? 0;
  const scanOn = o.scanTimes ? o.scanTimes.some(ts => t >= ts && t <= ts + 0.28) : false;

  drawAhpoLayered(ctx, [
    { im: D02.bayangan, par: 0.85, a: 0.9 },
    { im: D02.pita, par: 0.96, a: 1 },
    { im: D02.mesin, par: 1.0, a: 1 },
    { im: D02.scanner, par: 1.06, a: 1 },
    scanOn ? { im: D02.sinar, par: 1.08, a: 0.92 } : null,
  ].filter(Boolean), cx, cy, scale, camX, 0, aMul);

  // Cetak isi struk di dalam bbox pita kosong (x=1450..2310, y=210..1210)
  const [x0, y0] = ahpoPt(1485, 240, cx, cy, scale);
  const [x1, y1] = ahpoPt(2275, 1190, cx, cy, scale);
  const w = x1 - x0;

  ctx.save();
  ctx.globalAlpha *= aMul;
  ctx.beginPath();
  ctx.rect(x0 - 12, y0 - 12, w + 24, y1 - y0 + 24);
  ctx.clip();

  // Header struk
  setFont(ctx, MN(Math.round(28 * scale), 700), 3);
  ctx.fillStyle = '#15160F';
  ctx.textAlign = 'center';
  ctx.fillText('PASAR GELAP DATA RI', x0 + w / 2, y0 + 24 * scale);
  setFont(ctx, MN(Math.round(20 * scale), 400), 2);
  ctx.fillStyle = 'rgba(21,22,15,0.62)';
  ctx.fillText('----------------------------------------', x0 + w / 2, y0 + 56 * scale);

  const rowH = 98 * scale;
  items.forEach((it, idx) => {
    const k = E.outQuint(inv(it.at, it.at + 0.22, t));
    if (k <= 0.01) return;
    const ry = y0 + 104 * scale + idx * rowH;
    ctx.save();
    ctx.globalAlpha *= k;
    if (it.hot) {
      ctx.fillStyle = LIME;
      ctx.fillRect(x0 + 8 * scale, ry - 34 * scale, w - 16 * scale, 66 * scale);
    }
    ctx.textAlign = 'left';
    setFont(ctx, MN(Math.round(25 * scale), 700), 1);
    ctx.fillStyle = it.red ? '#A8261E' : '#15160F';
    ctx.fillText(it.label, x0 + 22 * scale, ry - 2 * scale);
    setFont(ctx, MN(Math.round(18 * scale), 400), 1);
    ctx.fillStyle = 'rgba(21,22,15,0.65)';
    if (it.sub) ctx.fillText(it.sub, x0 + 22 * scale, ry + 22 * scale);

    ctx.textAlign = 'right';
    setFont(ctx, DSP(Math.round(48 * scale)), 1);
    ctx.fillStyle = it.red ? '#A8261E' : '#11120E';
    ctx.fillText(it.price, x1 - 22 * scale, ry + 12 * scale);
    ctx.restore();
  });
  ctx.restore();
}

// ── 3. Tangki Brankas PDNS 2 Surabaya (98% Terkunci vs 2% Batam) + Belenggu Terbuka Gratis ───────────────
export function drawD04Vault(ctx, D04, cx, cy, scale, t, o = {}) {
  if (!D04 || !D04.tangki) return;
  const aMul = o.a ?? 1;
  if (aMul <= 0.01) return;
  const camX = o.camX ?? 0;

  // Isi jendela tangki (x=760..2160, y=420..1760): 98% merah terkunci + 2% irisan lime di dasar!
  const [tx0, ty0] = ahpoPt(765, 425, cx, cy, scale);
  const [tx1, ty1] = ahpoPt(2155, 1755, cx, cy, scale);
  const tw = tx1 - tx0, th = ty1 - ty0;
  const kFill = E.outQuart(inv(o.tFill ?? 0, (o.tFill ?? 0) + 0.9, t));
  const kLock = o.tLock != null ? E.outQuint(inv(o.tLock, o.tLock + 0.45, t)) : 1;
  const kUnlock = o.tUnlock != null ? E.outQuint(inv(o.tUnlock, o.tUnlock + 0.65, t)) : 0;

  // Gambar isi di belakang bingkai kaca tangki
  ctx.save();
  ctx.globalAlpha *= aMul;
  const oxTank = -camX * (0.94 - 0.85);
  ctx.fillStyle = '#0D100C';
  ctx.fillRect(tx0 + oxTank, ty0, tw, th);

  if (kFill > 0.01) {
    // 2% irisan backup Batam di dasar tangki (proporsi presisi ~2.8% supaya terlihat tajam 1080p)
    const h2 = Math.max(12, th * 0.032);
    ctx.fillStyle = LIME;
    ctx.fillRect(tx0 + oxTank, ty1 - h2, tw * kFill, h2);

    // 98% area merah matte terkunci ransomware (hilang memudar hijau-gelap saat kunci gratis membuka!)
    const h98 = (th - h2 - 4) * kFill;
    const redAlpha = lerp(0.84, 0.28, kUnlock);
    ctx.fillStyle = `rgba(182,46,38,${redAlpha.toFixed(2)})`;
    ctx.fillRect(tx0 + oxTank, ty1 - h2 - 4 - h98, tw, h98);

    // Garis pindai enkripsi tipis di dalam area 98%
    ctx.fillStyle = 'rgba(11,12,9,0.22)';
    for (let y = ty0 + 18; y < ty1 - h2 - 10; y += 22) {
      ctx.fillRect(tx0 + oxTank, y, tw, 3);
    }

    // Label 98% dan 2% di dalam jendela ukur
    ctx.textAlign = 'left';
    setFont(ctx, DSP(Math.round(138 * scale)), 2);
    ctx.fillStyle = IVORY;
    ctx.fillText('98%', tx0 + oxTank + 44 * scale, ty0 + 175 * scale);
    setFont(ctx, MN(Math.round(28 * scale), 700), 3);
    ctx.fillStyle = 'rgba(241,239,230,0.88)';
    ctx.fillText(kUnlock > 0.4 ? 'TERBUKA KUNCI GRATIS' : 'TERKUNCI TANPA BACKUP', tx0 + oxTank + 44 * scale, ty0 + 230 * scale);

    // Tag irisan 2% Batam tepat di dasar
    setFont(ctx, MN(Math.round(24 * scale), 700), 2);
    ctx.fillStyle = LIME;
    ctx.fillText('2% BACKUP → COLD STORAGE BATAM', tx0 + oxTank + 44 * scale, ty1 - h2 - 18 * scale);
  }
  ctx.restore();

  // Belenggu gembok memutar terbuka +44° di poros engsel kanan (1618, 930) saat kunci gratis tiba!
  const shackleRot = kUnlock * 44 * D2R;
  const shackleDy = -kUnlock * 52;
  const keyDx = lerp(240, -1080, kUnlock) * scale;
  const keyDy = lerp(0, 490, kUnlock) * scale;

  drawAhpoLayered(ctx, [
    { im: D04.pantulan, par: 0.80, a: 0.7 },
    { im: D04.bayangan, par: 0.86, a: 0.9 },
    { im: D04.tangki, par: 0.94, a: 1 },
    { im: D04.pipa, par: 0.96, a: 1 },
    kLock > 0 ? { im: D04.belenggu, par: 1.04, a: kLock, rot: shackleRot, dy: shackleDy, px: 1618, py: 930 } : null,
    kLock > 0 ? { im: D04.gembok, par: 1.06, a: kLock } : null,
    o.showKey && kUnlock > 0.02 ? { im: D04.kunci, par: 1.12, a: clamp(kUnlock * 2.5), dx: keyDx, dy: keyDy } : null,
  ].filter(Boolean), cx, cy, scale, camX, 0, aMul);
}

// ── 4. Kursi Kosong Lembaga PDP & Kitab UU PDP (D05) ─────────────────────────────────────────────────────
export function drawD05Chair(ctx, D05, cx, cy, scale, t, o = {}) {
  if (!D05 || !D05.kursi) return;
  const aMul = o.a ?? 1;
  if (aMul <= 0.01) return;
  const camX = o.camX ?? 0;
  const beamPulse = 0.82 + 0.18 * Math.sin(t * 2.4);

  drawAhpoLayered(ctx, [
    { im: D05.pantulan, par: 0.80, a: 0.7 },
    { im: D05.bayangan, par: 0.86, a: 0.92 },
    o.hideBook ? null : { im: D05.kitab, par: 0.96, a: 1 },
    { im: D05.kursi, par: 1.0, a: 1 },
    { im: D05.sorot, par: 1.05, a: beamPulse },
  ].filter(Boolean), cx, cy, scale, camX, 0, aMul);

  // Teks sampul Kitab UU PDP (x=760..1310, y=970..1620)
  if (!o.hideBook) {
    const [bx, by] = ahpoPt(1035, 1180, cx, cy, scale);
    ctx.save();
    ctx.globalAlpha *= aMul;
    ctx.textAlign = 'center';
    setFont(ctx, MN(Math.round(30 * scale), 700), 4);
    ctx.fillStyle = LIME;
    ctx.fillText('UNDANG-UNDANG RI', bx - camX * 0.11, by - 95 * scale);
    setFont(ctx, DSP(Math.round(132 * scale)), 2);
    ctx.fillStyle = IVORY;
    ctx.fillText(o.bookTitle || 'UU PDP', bx - camX * 0.11, by + 32 * scale);
    setFont(ctx, MN(Math.round(34 * scale), 700), 3);
    ctx.fillStyle = 'rgba(241,239,230,0.78)';
    ctx.fillText(o.bookSub || 'NO. 27 / 2022', bx - camX * 0.11, by + 115 * scale);
    ctx.restore();
  }
}

// ── 5. Stabilo Blok Bersih + Pixel-Verified HL_MAP (diukur dari hl_grid_1/2.jpg — ZERO tebakan!) ─────────
export function drawCleanStabilo(ctx, x, y, w, h, k, dark = false) {
  if (k <= 0.01) return;
  ctx.save();
  ctx.globalCompositeOperation = dark ? 'screen' : 'multiply';
  ctx.fillStyle = dark ? 'rgba(200,245,60,0.44)' : 'rgba(200,245,60,0.90)';
  ctx.fillRect(x, y, w * E.outCubic(clamp(k)), h);
  ctx.restore();
}

export const HL_MAP = {
  kompas:    { dark: false, rects: [[0.09, 0.16, 0.82, 0.13], [0.39, 0.30, 0.22, 0.13]] },
  cnnBpjs:   { dark: false, rects: [[0.035, 0.19, 0.79, 0.09]] },
  kompasSim: { dark: true,  rects: [[0.025, 0.19, 0.94, 0.12]] },
  bkpsdm:    { dark: false, rects: [[0.025, 0.19, 0.835, 0.11]] },
  bbcPaspor: { dark: false, rects: [[0.04, 0.17, 0.67, 0.08], [0.04, 0.255, 0.87, 0.08], [0.04, 0.34, 0.90, 0.08]] },
  lipKpu:    { dark: false, rects: [[0.03, 0.11, 0.89, 0.10], [0.03, 0.22, 0.59, 0.10]] },
  jdih:      { dark: false, rects: [[0.00, 0.81, 0.99, 0.11]] },
  katadata:  { dark: false, rects: [[0.035, 0.20, 0.90, 0.10]] },
  csirt:     { dark: true,  rects: [[0.08, 0.145, 0.51, 0.09], [0.08, 0.26, 0.49, 0.09], [0.08, 0.375, 0.42, 0.09]] },
  cnnPdns:   { dark: false, rects: [[0.035, 0.17, 0.80, 0.09], [0.035, 0.28, 0.32, 0.09]] },
  kompas2:   { dark: true,  rects: [[0.025, 0.16, 0.96, 0.10], [0.025, 0.29, 0.14, 0.10]] },
  cnbcSim:   { dark: false, rects: [[0.035, 0.15, 0.92, 0.09], [0.035, 0.26, 0.23, 0.09]] },
  komdigi:   { dark: true,  rects: [[0.135, 0.325, 0.70, 0.045], [0.135, 0.375, 0.30, 0.045]] },
  cnnGratis: { dark: false, rects: [[0.035, 0.17, 0.90, 0.09], [0.035, 0.28, 0.25, 0.09]] },
  uupdp:     { dark: true,  rects: [[0.015, 0.17, 0.26, 0.07], [0.015, 0.26, 0.21, 0.09]] },
  fwp:       { dark: false, rects: [[0.04, 0.11, 0.82, 0.08], [0.04, 0.41, 0.81, 0.08]] },
  cnbcPdp:   { dark: false, rects: [[0.035, 0.145, 0.90, 0.09], [0.035, 0.26, 0.40, 0.09]] },
  elsam:     { dark: false, rects: [[0.23, 0.16, 0.74, 0.10], [0.23, 0.28, 0.20, 0.10]] },
};

export function hlCues(key, t0, step = 0.42) {
  const m = HL_MAP[key];
  if (!m) return { dark: false, hl: [] };
  return { dark: m.dark, hl: m.rects.map((r, i) => [...r, t0 + i * step]) };
}

// ── 6. Editorial Zero-Slop Typography & Non-Overlapping Column Helpers (ANTI-PPT / ANTI-CARD-SLOP!) ──────
export function wrapTxt(ctx, str, x, y, maxW, lineH, css, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.38, t));
  if (k <= 0.01) return 0;
  ctx.save();
  ctx.globalAlpha *= clamp(k * 1.5);
  setFont(ctx, css, o.ls ?? 0);
  ctx.fillStyle = o.col || IVORY;
  ctx.textAlign = o.align || 'left';
  ctx.textBaseline = 'alphabetic';
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const wd of words) {
    const test = cur ? `${cur} ${wd}` : wd;
    if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = wd; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  lines.forEach((ln, i) => {
    const kl = E.outQuint(inv(t0 + i * 0.09, t0 + 0.38 + i * 0.09, t));
    if (kl <= 0.01) return;
    ctx.save();
    ctx.globalAlpha *= kl;
    ctx.fillText(ln, x, y + i * lineH + (1 - kl) * 18);
    ctx.restore();
  });
  ctx.restore();
  return lines.length * lineH;
}

// Solid Editorial Hero Stat (NO messy thin green outline, NO overlapping text, crisp kinetic slam + bar)
export function heroStat(ctx, bigNum, eyebrow, caption, x, y, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.42, t));
  if (k <= 0.01) return;
  const maxW = o.maxW ?? 740;
  const sz = o.size ?? 230;
  const align = o.align || 'left';
  const light = !!o.light;
  const inkCol = o.col || (light ? '#15160F' : IVORY);
  const accCol = o.accent || (light ? '#4B6800' : LIME);

  ctx.save();
  ctx.globalAlpha *= clamp(k * 1.6);
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';

  if (eyebrow) {
    setFont(ctx, MN(19, 700), 4);
    ctx.fillStyle = accCol;
    ctx.fillText(eyebrow, x, y - sz * 0.84 + (1 - k) * 16);
  }

  // Solid oversized League Gothic number with punchy elastic scale settle
  const sc = lerp(1.16, 1.0, E.outQuart(inv(t0, t0 + 0.34, t)));
  ctx.save();
  ctx.translate(x, y + (1 - k) * 32);
  ctx.scale(sc, sc);
  setFont(ctx, DSP(sz), 2);
  ctx.fillStyle = inkCol;
  ctx.fillText(bigNum, 0, 0);
  ctx.restore();

  // Crisp editorial hairline rule underneath (NO box!)
  const ruleY = y + 32;
  const ruleW = Math.min(maxW, 560) * E.outQuint(inv(t0 + 0.12, t0 + 0.55, t));
  ctx.fillStyle = accCol;
  const rx = align === 'center' ? x - ruleW / 2 : x;
  ctx.fillRect(rx, ruleY, ruleW, 4);

  // Guaranteed clear gap (>= 58px below baseline!) before wrapped caption
  if (caption) {
    wrapTxt(ctx, caption, x, ruleY + 54, maxW, 48, SRF(38), t, t0 + 0.16, {
      col: light ? 'rgba(21,22,15,0.84)' : ivo(0.88),
      align,
    });
  }
  ctx.restore();
}

// Architectural Editorial Item (REPLACES ALL AI-SLOP DARK CARDS — pure Swiss/Vox type + giant watermark numeral + animated hairline!)
export function editorialRow(ctx, num, head, sub, x, y, w, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.42, t));
  if (k <= 0.01) return;
  const light = !!o.light;
  const ink = light ? '#15160F' : IVORY;
  const acc = o.accent || (light ? '#4B6800' : LIME);
  const subCol = light ? 'rgba(21,22,15,0.78)' : ivo(0.80);

  ctx.save();
  ctx.globalAlpha *= k;
  const slide = (1 - k) * 38;
  // Subtle giant watermark index on the left
  setFont(ctx, DSP(126), 1);
  ctx.fillStyle = light ? 'rgba(21,22,15,0.10)' : 'rgba(241,239,230,0.09)';
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(num, x, y + 48 + slide);

  // Crisp razor accent vertical tick + horizontal hairline
  ctx.fillStyle = acc;
  ctx.fillRect(x, y - 56 + slide, 6, 108 * k);
  ctx.fillStyle = light ? 'rgba(21,22,15,0.16)' : 'rgba(241,239,230,0.16)';
  ctx.fillRect(x, y + 64, w * k, 1.5);

  // Clean headline & subline directly in 3D space (ZERO dark rectangle box!)
  setFont(ctx, DSP(o.size ?? 72), 2);
  ctx.fillStyle = ink;
  ctx.fillText(head, x + 28, y + 6 + slide);
  if (sub) {
    setFont(ctx, SRF(o.subSize ?? 32), 0);
    ctx.fillStyle = subCol;
    ctx.fillText(sub, x + 28, y + 46 + slide);
  }
  ctx.restore();
}

