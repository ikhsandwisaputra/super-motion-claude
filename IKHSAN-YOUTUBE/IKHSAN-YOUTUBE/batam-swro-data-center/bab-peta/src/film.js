// Bab Peta · "Empat Pertanyaan" (VO bsw_vo_ahmad_03, 26.56 s + VOFF 0.35 + TAIL 0.90 -> 28.85 s).
// Dunia: Biru Samudra Gelap dokumenter (#0A1015), dark matte slate plates, neutral ivory hairlines,
// solid matte #C8F53C blocks (#11120E ink), latar dokumenter penuh ocean_waves & network_cables (layarFoto).
// Stasiun sepanjang baris pipa kedalaman:
//  S0  Intro ("Supaya terang semua... empat pertanyaan") -> markLine TERANG + solid matte "4" PERTANYAAN + rel 4 simpul
//  S1  01 · CADANGAN AIR TIPIS?     (gelasWaduk menyusut ke level kritis + tag warga turun ke jalan)
//  S2  02 · DATA CENTER BOROS AIR?  (rak server + menara pendingin uap + JUTAAN LITER; latar crossfade ke network_cables)
//  S3  03 · CARA KERJA PABRIK Rp600 M? (Rp600 MILIAR + penampang mini membran SWRO memisah garam; kembali ke ocean_waves)
//  S4  04 · HARGA TERSEMBUNYI?      (dua ongkos tersembunyi: energi pompa tinggi + limbah garam pekat brine)
//  S5  Peta 2x2 terpadu             (4 kartu pertanyaan terkunci rapi dalam grid 2x2 sebelum portal Lensa Iris menutup)
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadVid, fall, markLine, slab, txt, typeOn, theme,
} from './kit.js';
import { layarFoto, gelasWaduk } from './batam.js';

theme(false, { bg: '#0A1015', bgrgb: '10,16,21', vig: .34 });

const DARK_INK = '#11120E';
const SLATE_PLATE = 'rgba(11,15,19,0.88)';
const HAIRLINE = 'rgba(241,239,230,0.18)';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STEAM_PUFFS = (() => {
  const rng = mulberry32(20260302);
  return Array.from({ length: 28 }, () => ({
    x0: (rng() - 0.5) * 66,
    phase: rng(),
    speed: 0.40 + rng() * 0.34,
    r: 8 + rng() * 13,
  }));
})();

const SWRO_DOTS = (() => {
  const rng = mulberry32(20260303);
  return Array.from({ length: 48 }, (_, i) => ({
    salt: i % 2 === 1,
    y0: -64 + rng() * 128,
    phase: rng(),
    speed: 0.38 + rng() * 0.24,
    r: i % 2 === 1 ? 4.6 + rng() * 1.8 : 3.8 + rng() * 1.6,
    wob: rng() * Math.PI * 2,
  }));
})();

function wrapLines(ctx, text, maxW, css, ls = 0) {
  setFont(ctx, css, ls);
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(test).width <= maxW || !cur) cur = test;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

// Solid matte editorial badge/stamp block (NEVER neon border around black box!)
function drawSolidBadge(ctx, text, x, y, {
  align = 'left',
  size = 16,
  ls = 2,
  padX = 16,
  h = 34,
  lime = true,
  r = 3,
} = {}) {
  setFont(ctx, MN(size, 700), ls);
  const tw = ctx.measureText(text).width + padX * 2;
  const rx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x;
  const ry = y - h / 2;
  ctx.fillStyle = lime ? LIME : IVORY;
  ctx.beginPath();
  ctx.roundRect(rx, ry, tw, h, r);
  ctx.fill();
  ctx.fillStyle = DARK_INK;
  ctx.textAlign = 'center';
  ctx.fillText(text, rx + tw / 2, y + size * 0.34);
  ctx.textAlign = 'left';
  return tw;
}

const NODES = [
  { no: '01', short: 'AIR BATAM' },
  { no: '02', short: 'DATA CENTER' },
  { no: '03', short: 'PABRIK Rp600 M' },
  { no: '04', short: 'HARGA BALIK' },
];

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const V = {};

  async function load() {
    V.ocean = await loadVid('../assets/shared/vid/', 'ocean_waves');
    V.cables = await loadVid('../assets/shared/vid/', 'network_cables');
  }

  const BGS = [
    { vid: 'ocean', t0: -0.5, t1: A.kedua + 0.35, fx: 0.5, fy: 0.5, dir: 1, grade: 'saturate(.58) contrast(1.30) brightness(.82)' },
    { vid: 'cables', t0: A.kedua - 0.35, t1: A.ketiga + 0.35, fx: 0.5, fy: 0.5, dir: -1, grade: 'saturate(.46) contrast(1.32) brightness(.86)' },
    { vid: 'ocean', t0: A.ketiga - 0.35, t1: DUR + 0.5, fx: 0.5, fy: 0.45, dir: 1, grade: 'saturate(.58) contrast(1.30) brightness(.82)' },
  ];

  // Full-bleed documentary video backdrop + sculpted filmic lighting/contrast
  function drawBackdrop(ctx, t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    layarFoto(ctx, W, H, BGS, t, { IM: V, dim: 0.32, grain: 0.22 });

    // Sculpted cool oceanic top-key glow (screen) for cinematic texture on waves & cables
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const key = ctx.createRadialGradient(W * 0.46, H * 0.28, 40, W * 0.48, H * 0.38, W * 0.65);
    key.addColorStop(0, 'rgba(92,148,176,0.16)');
    key.addColorStop(0.55, 'rgba(42,76,96,0.07)');
    key.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = key;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // Deep dramatic letterbox-style top/bottom contrast scrim + edge vignette
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(6,10,14,0.66)');
    g.addColorStop(0.45, 'rgba(8,14,19,0.14)');
    g.addColorStop(1, 'rgba(6,10,14,0.72)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const vg = ctx.createRadialGradient(W / 2, H * 0.46, H * 0.28, W / 2, H / 2, W * 0.72);
    vg.addColorStop(0, 'rgba(5,9,13,0)');
    vg.addColorStop(1, 'rgba(5,8,11,0.62)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  // 3D depth pipeline rails along the floor (understated architectural ivory rails, zero neon lines)
  const ST_Z = [0, 2600, 5200, 7800, 10400, 13000];
  const ST_X = [0, -640, 640, -640, 640, 0];

  function drawConduitFloor(ctx, pr, c, t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'rgba(241,239,230,0.09)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    const zMin = Math.max(-400, c.tz - 1200), zMax = c.tz + 7200;
    for (const rx of [-1100, 1100]) {
      const p0 = pr(rx, 0, zMin), p1 = pr(rx, 0, zMax);
      if (p0.z >= 120 && p1.z >= 120) {
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
      }
    }
    const tz0 = Math.ceil(zMin / 650) * 650;
    for (let z = tz0; z <= zMax; z += 650) {
      const a = pr(-1100, 0, z), b = pr(1100, 0, z);
      if (a.z < 140 || b.z < 140) continue;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    ctx.stroke();

    // Understated neutral ivory station markers along the side rails
    ctx.strokeStyle = 'rgba(241,239,230,0.22)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 1; i < ST_Z.length; i++) {
      const pL = pr(-1100, 0, ST_Z[i]), pR = pr(1100, 0, ST_Z[i]);
      if (pL.z < 140 || pL.z > 7500) continue;
      const tick = 55 * pL.s;
      ctx.moveTo(pL.x, pL.y); ctx.lineTo(pL.x + tick, pL.y);
      ctx.moveTo(pR.x, pR.y); ctx.lineTo(pR.x - tick, pR.y);
    }
    ctx.stroke();
    void t;
  }

  function world(ctx, t, pr, foc, items, c) {
    items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawBackdrop(ctx, t) });
    items.push({ z: 5e5, x: 0, d: 5e6, f: () => drawConduitFloor(ctx, pr, c, t) });
    void foc;
  }

  function drawNodePill(ctx, x, y, nd, cur, done) {
    const bw = 290, bh = 50;
    if (cur) {
      // Solid matte #C8F53C block with crisp #11120E dark ink — NO border!
      ctx.fillStyle = LIME;
      ctx.beginPath();
      ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 4);
      ctx.fill();
    } else {
      // Dark matte slate plate with understated neutral ivory hairline
      ctx.fillStyle = done ? 'rgba(17,24,30,0.90)' : SLATE_PLATE;
      ctx.beginPath();
      ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 4);
      ctx.fill();
      ctx.strokeStyle = done ? 'rgba(241,239,230,0.28)' : HAIRLINE;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (done) {
        ctx.fillStyle = LIME;
        ctx.fillRect(x - bw / 2, y - bh / 2 + 10, 4, bh - 20);
      }
    }

    setFont(ctx, MN(15, 700), 1.5);
    ctx.textAlign = 'center';
    ctx.fillStyle = cur ? DARK_INK : (done ? IVORY : 'rgba(241,239,230,0.62)');
    ctx.fillText(`${nd.no} · ${nd.short}`, x, y + 6);
  }

  // Bottom progress stepper bar (stations S1..S4)
  function drawProgressStepper(ctx, activeIdx, t, tStart) {
    const k = E.outQuint(inv(tStart, tStart + 0.40, t));
    if (k <= 0) return;
    ctx.save();
    ctx.globalAlpha *= k;
    const y = 362;
    const xs = [-570, -190, 190, 570];

    // Understated ivory track
    ctx.fillStyle = 'rgba(241,239,230,0.18)';
    ctx.fillRect(xs[0], y - 1, xs[3] - xs[0], 2);

    // Solid matte lime progress bar fill
    if (activeIdx > 0) {
      ctx.fillStyle = LIME;
      ctx.fillRect(xs[0], y - 1.5, xs[activeIdx] - xs[0], 3);
    }

    NODES.forEach((nd, i) => drawNodePill(ctx, xs[i], y, nd, i === activeIdx, i < activeIdx));
    ctx.textAlign = 'left';
    ctx.restore();
  }

  // Reusable architectural Documentary Question Plate (left: editorial typography, right: technical diagram bay)
  function drawQuestionCard(ctx, t, t0, o) {
    const k = E.outQuint(inv(t0 - 0.12, t0 + 0.38, t));
    if (k <= 0) return;

    const a0 = ctx.globalAlpha;
    const cw = 1520, ch = 620, x0 = -cw / 2, y0 = -335;

    ctx.save();
    ctx.globalAlpha = a0 * clamp(k * 1.4);
    ctx.translate(0, (1 - k) * 44);

    // Dark matte slate plate with deep cinema shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.68)';
    ctx.shadowBlur = 58;
    ctx.shadowOffsetY = 26;
    const cg = ctx.createLinearGradient(x0, y0, x0, y0 + ch);
    cg.addColorStop(0, 'rgba(13,18,23,0.90)');
    cg.addColorStop(1, 'rgba(9,13,17,0.88)');
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.roundRect(x0, y0, cw, ch, 8);
    ctx.fill();
    ctx.restore();

    // Subtle directional top sheen on matte plate
    const sheen = ctx.createLinearGradient(x0, y0, x0, y0 + 120);
    sheen.addColorStop(0, 'rgba(241,239,230,0.04)');
    sheen.addColorStop(1, 'rgba(241,239,230,0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(x0 + 2, y0 + 2, cw - 4, 120);

    // Understated neutral ivory hairline frame
    ctx.strokeStyle = HAIRLINE;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x0, y0, cw, ch, 8);
    ctx.stroke();

    // Crisp left signature solid matte #C8F53C structural accent bar
    ctx.fillStyle = LIME;
    ctx.fillRect(x0, y0 + 24, 6, ch - 48);

    // Top-left solid matte #C8F53C badge (#11120E ink) & kicker
    const lx = x0 + 62;
    drawSolidBadge(ctx, o.num, lx, y0 + 70, { size: 20, ls: 2, padX: 22, h: 38, lime: true, r: 3 });

    ctx.textAlign = 'left';
    setFont(ctx, MN(18, 700), 2.5);
    ctx.fillStyle = 'rgba(241,239,230,0.72)';
    ctx.fillText(o.kicker, lx + 96, y0 + 76);

    // Display title lines: crisp IVORY line1 + solid matte #C8F53C editorial highlight block on line2 beat!
    const tTitle = t0 + 0.04;
    fall(ctx, o.line1, lx, y0 + 206, t, tTitle, DSP(108), { ls: 2, stag: 0.018, col: IVORY });

    const kHi = o.hiAt ? E.snap(inv(o.hiAt - 0.05, o.hiAt + 0.22, t)) : 0;
    setFont(ctx, DSP(112), 2);
    const w2 = ctx.measureText(o.line2).width;
    if (kHi > 0.01) {
      ctx.fillStyle = LIME;
      ctx.fillRect(lx - 14, y0 + 224, (w2 + 28) * kHi, 114);
    }
    const col2 = kHi > 0.52 ? DARK_INK : IVORY;
    fall(ctx, o.line2, lx, y0 + 318, t, tTitle + 0.14, DSP(112), { ls: 2, stag: 0.020, col: col2 });

    // Clean understated neutral ivory architectural divider rule
    const kr = E.outQuint(inv(tTitle + 0.15, tTitle + 0.55, t));
    ctx.fillStyle = 'rgba(241,239,230,0.22)';
    ctx.fillRect(lx, y0 + 356, 780 * kr, 1.5);

    // Full narration question (Fraunces Italic, cleanly wrapped inside left column width 800)
    const subCss = SRF(34);
    const lines = wrapLines(ctx, o.question, 800, subCss);
    const kSub = E.outQuint(inv(o.subAt ?? t0 + 0.35, (o.subAt ?? t0 + 0.35) + 0.45, t));
    if (kSub > 0) {
      ctx.save();
      ctx.globalAlpha *= kSub;
      setFont(ctx, subCss, 0);
      ctx.fillStyle = 'rgba(241,239,230,0.92)';
      lines.forEach((ln, idx) => {
        ctx.fillText(ln, lx, y0 + 412 + idx * 46 + (1 - kSub) * 18);
      });
      ctx.restore();
    }

    // Bottom left focus tag: tiny solid lime square marker + neutral ivory mono (zero floating green text!)
    if (t > t0 + 0.75) {
      const kf = E.outCubic(inv(t0 + 0.75, t0 + 0.95, t));
      ctx.fillStyle = LIME;
      ctx.fillRect(lx, y0 + ch - 55, 9 * kf, 9);
    }
    typeOn(ctx, o.focus, lx + 20, y0 + ch - 44, t, t0 + 0.75, MN(17, 700), { ls: 2, cps: 65, col: 'rgba(241,239,230,0.74)' });

    // Right column: recessed dark matte technical bay with neutral ivory hairline & registration corners
    const rx = 200, ry = y0 + 42, rw = 510, rh = ch - 84;
    ctx.fillStyle = 'rgba(7,10,14,0.84)';
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(241,239,230,0.14)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Subtle blueprint grid inside right bay
    ctx.strokeStyle = 'rgba(241,239,230,0.032)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let gx = rx + 44; gx < rx + rw; gx += 44) { ctx.moveTo(gx, ry + 8); ctx.lineTo(gx, ry + rh - 8); }
    for (let gy = ry + 44; gy < ry + rh; gy += 44) { ctx.moveTo(rx + 8, gy); ctx.lineTo(rx + rw - 8, gy); }
    ctx.stroke();

    // Precision editorial corner registration marks
    ctx.strokeStyle = 'rgba(241,239,230,0.32)';
    ctx.lineWidth = 1.6;
    const m = 12;
    ctx.beginPath();
    ctx.moveTo(rx + 8, ry + 8 + m); ctx.lineTo(rx + 8, ry + 8); ctx.lineTo(rx + 8 + m, ry + 8);
    ctx.moveTo(rx + rw - 8 - m, ry + 8); ctx.lineTo(rx + rw - 8, ry + 8); ctx.lineTo(rx + rw - 8, ry + 8 + m);
    ctx.moveTo(rx + 8, ry + rh - 8 - m); ctx.lineTo(rx + 8, ry + rh - 8); ctx.lineTo(rx + 8 + m, ry + rh - 8);
    ctx.moveTo(rx + rw - 8 - m, ry + rh - 8); ctx.lineTo(rx + rw - 8, ry + rh - 8); ctx.lineTo(rx + rw - 8, ry + rh - 8 - m);
    ctx.stroke();

    if (o.diagram) o.diagram(ctx, rx + rw / 2, ry + rh / 2, rw, rh);

    ctx.restore();
    ctx.globalAlpha = a0;
  }

  // Diagram 1: 6 Waduk Batam hydraulic sight-glass gauge dropping to critical + protest tag
  function diagramQ1(ctx, cx, cy, t) {
    const kDrop = E.inOutCubic(inv(A.batam, A.tipis + 0.35, t));
    const level = lerp(0.80, 0.18, kDrop);
    gelasWaduk(ctx, cx, cy - 26, 0.66, t, A.pertama + 0.2, {
      level,
      critical: level < 0.35,
      label: '6 WADUK BATAM',
      val: level < 0.35 ? 'TIPIS!' : 'TADAH HUJAN',
    });
    if (t >= A.warga - 0.1) {
      slab(ctx, 'WARGA TURUN KE JALAN', cx, cy + 206, t, A.warga - 0.1, { align: 'center', size: 19, lime: true });
    }
  }

  // Diagram 2: Server rack + pipe loop + evaporative cooling tower + rising millions-of-liters stamp
  function diagramQ2(ctx, cx, cy, t) {
    const kEntry = E.outQuint(inv(A.kedua + 0.15, A.kedua + 0.65, t));
    if (kEntry <= 0) return;
    ctx.save();
    ctx.globalAlpha *= kEntry;

    setFont(ctx, MN(15, 700), 2.5);
    ctx.fillStyle = 'rgba(241,239,230,0.74)';
    ctx.textAlign = 'center';
    ctx.fillText('PENDINGIN EVAPORATIF', cx, cy - 224);

    // Left: Industrial dark matte server rack chassis
    const sx = cx - 178, sy = cy - 64, sw = 108, sh = 172;
    ctx.fillStyle = '#0E151B';
    ctx.strokeStyle = 'rgba(241,239,230,0.32)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(sx, sy, sw, sh, 6);
    ctx.fill();
    ctx.stroke();

    const activeLED = t >= A.komputer;
    for (let i = 0; i < 6; i++) {
      const by = sy + 18 + i * 24;
      ctx.fillStyle = '#18222B';
      ctx.fillRect(sx + 12, by, sw - 24, 15);
      const blink = activeLED && ((Math.floor(t * 5) + i) % 3 === 0);
      ctx.fillStyle = blink ? LIME : 'rgba(241,239,230,0.42)';
      ctx.fillRect(sx + 18, by + 5, 7, 5);
      ctx.fillStyle = 'rgba(241,239,230,0.16)';
      ctx.fillRect(sx + 34, by + 6, sw - 54, 3);
    }
    setFont(ctx, MN(14, 700), 2);
    ctx.fillStyle = 'rgba(241,239,230,0.76)';
    ctx.fillText('SERVER', sx + sw / 2, sy + sh + 24);

    // Industrial double-walled pipe loop + animated pulse
    ctx.strokeStyle = 'rgba(241,239,230,0.38)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(sx + sw, sy + 52);
    ctx.lineTo(cx + 18, sy + 52);
    ctx.moveTo(sx + sw, sy + 112);
    ctx.lineTo(cx + 18, sy + 112);
    ctx.stroke();

    const pu = (t * 1.3) % 1;
    ctx.fillStyle = LIME;
    ctx.beginPath();
    ctx.arc(lerp(sx + sw + 6, cx + 14, pu), sy + 52, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Right: Sculptural cooling tower cutaway
    const tx = cx + 96, ty = cy + 108;
    const tg = ctx.createLinearGradient(tx - 60, cy - 86, tx + 60, ty);
    tg.addColorStop(0, '#18242E');
    tg.addColorStop(1, '#0C1319');
    ctx.fillStyle = tg;
    ctx.strokeStyle = 'rgba(241,239,230,0.48)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx - 82, ty);
    ctx.quadraticCurveTo(tx - 46, cy + 4, tx - 56, cy - 86);
    ctx.lineTo(tx + 56, cy - 86);
    ctx.quadraticCurveTo(tx + 46, cy + 4, tx + 82, ty);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Internal mist spray lines
    ctx.strokeStyle = 'rgba(185,228,244,0.28)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 6]);
    ctx.beginPath();
    for (let mx = -28; mx <= 28; mx += 18) {
      ctx.moveTo(tx + mx, cy - 10);
      ctx.lineTo(tx + mx * 1.4, ty - 14);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Rising steam puffs (batched in 1 path)
    const kSteam = clamp((t - A.komputer) / 0.5);
    if (kSteam > 0.02) {
      ctx.fillStyle = `rgba(241,239,230,${0.26 * kSteam})`;
      ctx.beginPath();
      for (const p of STEAM_PUFFS) {
        const prog = (p.phase + t * p.speed) % 1;
        const px = tx + p.x0 * (0.5 + prog * 1.0);
        const py = lerp(cy - 88, cy - 178, prog);
        const pr = p.r * (0.55 + prog * 0.85);
        ctx.moveTo(px + pr, py);
        ctx.arc(px, py, pr, 0, Math.PI * 2);
      }
      ctx.fill();
    }
    setFont(ctx, MN(14, 700), 2);
    ctx.fillStyle = 'rgba(241,239,230,0.82)';
    ctx.fillText('MENGUAP', tx, ty + 24);

    // Bottom consumption meter bar
    const kUse = E.outCubic(inv(A.jutaan - 0.1, A.bersih + 0.2, t));
    const bx = cx - 190, by = cy + 150, bw = 380;
    ctx.fillStyle = 'rgba(241,239,230,0.12)';
    ctx.fillRect(bx, by, bw, 10);
    ctx.fillStyle = LIME;
    ctx.fillRect(bx, by, bw * (0.18 + 0.82 * kUse), 10);

    // Solid matte #C8F53C editorial data stamp (#11120E dark ink, zero green neon text on black!)
    if (t >= A.jutaan - 0.15) {
      const ks = E.snap(inv(A.jutaan - 0.15, A.jutaan + 0.12, t));
      const sw2 = 380, sh2 = 62;
      ctx.save();
      ctx.fillStyle = LIME;
      ctx.fillRect(cx - sw2 / 2, cy + 178, sw2 * ks, sh2);
      ctx.beginPath();
      ctx.rect(cx - sw2 / 2, cy + 178, sw2 * ks, sh2);
      ctx.clip();
      setFont(ctx, DSP(52), 2);
      ctx.fillStyle = DARK_INK;
      ctx.textAlign = 'center';
      ctx.fillText('JUTAAN LITER AIR', cx, cy + 227);
      ctx.restore();
    }
    ctx.textAlign = 'left';
    ctx.restore();
  }

  // Diagram 3: Rp600 MILIAR editorial stamp + miniature SWRO membrane separating salt from seawater
  function diagramQ3(ctx, cx, cy, t) {
    const kEntry = E.outQuint(inv(A.ketiga + 0.15, A.ketiga + 0.60, t));
    if (kEntry <= 0) return;
    ctx.save();
    ctx.globalAlpha *= kEntry;

    setFont(ctx, MN(14, 700), 2.8);
    ctx.fillStyle = 'rgba(241,239,230,0.70)';
    ctx.textAlign = 'center';
    ctx.fillText('PROYEK DESALINASI KABIL', cx, cy - 220);

    const kRp = inv(A.enam - 0.15, A.miliar + 0.15, t);
    const rpVal = kRp >= 1 ? 600 : Math.round(lerp(0, 600, E.outCubic(kRp)) / 20) * 20;
    const kStamp = E.snap(inv(A.enam - 0.12, A.enam + 0.16, t));
    const stampW = 390, stampH = 86;
    if (kStamp > 0.01) {
      ctx.fillStyle = LIME;
      ctx.fillRect(cx - stampW / 2, cy - 202, stampW * kStamp, stampH);
    }
    setFont(ctx, DSP(82), 1.5);
    ctx.fillStyle = kStamp > 0.52 ? DARK_INK : IVORY;
    ctx.fillText(`Rp${rpVal} MILIAR`, cx, cy - 130);

    // Compact SWRO separation chamber (dark matte slate + neutral ivory hairline)
    const vx = cx - 210, vw = 420, vy = cy - 92, vh = 200;
    ctx.fillStyle = '#0B131A';
    ctx.strokeStyle = 'rgba(241,239,230,0.26)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(vx, vy, vw, vh, 8);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(vx + 4, vy + 4, vw - 8, vh - 8, 6);
    ctx.clip();

    ctx.fillStyle = 'rgba(26,64,88,0.58)';
    ctx.fillRect(vx, vy, vw / 2, vh);
    ctx.fillStyle = 'rgba(176,228,246,0.16)';
    ctx.fillRect(cx, vy, vw / 2, vh);

    const sepOn = t >= A.memisahkan - 0.1;
    const flow = sepOn ? lerp(0.3, 1.0, E.outCubic(inv(A.memisahkan - 0.1, A.garam + 0.2, t))) : 0.3;

    // Clean water particles (pass through membrane when sepOn)
    ctx.fillStyle = 'rgba(218,244,255,0.92)';
    ctx.beginPath();
    for (const p of SWRO_DOTS) {
      if (p.salt) continue;
      const prog = (p.phase + t * p.speed * flow) % 1;
      let px = lerp(vx + 24, vx + vw - 18, prog);
      const py = cy + 8 + p.y0 + Math.sin(t * 3.5 + p.wob) * 5;
      if (!sepOn && px > cx - 10) px = cx - 10 - ((px - (cx - 10)) % 140);
      ctx.moveTo(px + p.r, py);
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    // Salt particles (natural warm salt-ivory, matching kit/batam.js membranSWRO)
    ctx.fillStyle = 'rgba(241,239,230,0.58)';
    ctx.beginPath();
    for (const p of SWRO_DOTS) {
      if (!p.salt) continue;
      const prog = (p.phase + t * p.speed * flow) % 1;
      let px, py;
      if (prog < 0.62) {
        const u = prog / 0.62;
        px = lerp(vx + 24, cx - 12, u);
        py = cy + 8 + p.y0 + Math.sin(t * 4.0 + p.wob) * 5;
      } else {
        const u = (prog - 0.62) / 0.38;
        px = lerp(cx - 12, vx + 40, u);
        py = lerp(cy + 8 + p.y0, vy + vh - 14, E.inCubic(u));
      }
      ctx.moveTo(px + p.r, py);
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    // Semipermeable membrane band + dashed filtration core
    ctx.fillStyle = 'rgba(241,239,230,0.14)';
    ctx.fillRect(cx - 6, vy, 12, vh);
    ctx.strokeStyle = LIME;
    ctx.lineWidth = 2.6;
    ctx.setLineDash([8, 7]);
    ctx.beginPath();
    ctx.moveTo(cx, vy + 8);
    ctx.lineTo(cx, vy + vh - 8);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Chamber zone labels (crisp ivory, zero floating neon green text)
    setFont(ctx, MN(14, 700), 1.2);
    ctx.fillStyle = 'rgba(241,239,230,0.72)';
    ctx.fillText('AIR LAUT + GARAM', vx + vw * 0.25, vy + vh + 28);
    ctx.fillStyle = IVORY;
    ctx.fillText('AIR TAWAR', vx + vw * 0.75, vy + vh + 28);

    txt(ctx, 'MEMBRAN PENYARING TEKANAN TINGGI', cx, cy + 206, t, A.memisahkan - 0.1, MN(14, 700), {
      align: 'center', ls: 1.5, col: 'rgba(241,239,230,0.78)',
    });
    ctx.textAlign = 'left';
    ctx.restore();
  }

  // Diagram 4: Dual hidden-cost matte slate plates (ZERO green-outlined cards!)
  function diagramQ4(ctx, cx, cy, t) {
    const kEntry = E.outQuint(inv(A.keempat + 0.15, A.keempat + 0.55, t));
    if (kEntry <= 0) return;
    ctx.save();
    ctx.globalAlpha *= kEntry;

    setFont(ctx, MN(15, 700), 2.8);
    ctx.fillStyle = 'rgba(241,239,230,0.74)';
    ctx.textAlign = 'center';
    ctx.fillText('ONGKOS DI BALIK AIR TAWAR', cx, cy - 214);

    const cards = [
      {
        y: cy - 110,
        at: A.harga - 0.05,
        tag: '01 · ENERGI LISTRIK',
        title: 'POMPA TEKANAN TINGGI',
        fill: E.outCubic(inv(A.harga - 0.05, A.harga + 0.65, t)),
        val: 'LISTRIK BESAR',
        accentLime: false,
      },
      {
        y: cy + 48,
        at: A.tersembunyi - 0.05,
        tag: '02 · SISA PEMISAHAN',
        title: 'LIMBAH GARAM PEKAT (BRINE)',
        fill: E.outCubic(inv(A.tersembunyi - 0.05, A.tersembunyi + 0.65, t)),
        val: '2× KEASINAN',
        accentLime: true,
      },
    ];

    for (const m of cards) {
      const km = E.outQuint(inv(m.at, m.at + 0.35, t));
      const bx = cx - 210, bw = 420, bh = 126;
      ctx.save();
      ctx.globalAlpha *= Math.max(0.28, km);

      // Dark matte slate plate + understated neutral ivory hairline (NEVER lime outline!)
      ctx.fillStyle = SLATE_PLATE;
      ctx.beginPath();
      ctx.roundRect(bx, m.y - bh / 2, bw, bh, 6);
      ctx.fill();
      ctx.strokeStyle = HAIRLINE;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Structural left bar (ivory for 01, solid matte lime for 02)
      ctx.fillStyle = m.accentLime ? LIME : 'rgba(241,239,230,0.52)';
      ctx.fillRect(bx, m.y - bh / 2 + 12, 5, bh - 24);

      ctx.textAlign = 'left';
      setFont(ctx, MN(13, 700), 1.2);
      ctx.fillStyle = 'rgba(241,239,230,0.68)';
      ctx.fillText(m.tag, bx + 20, m.y - 30);

      // Solid matte editorial badge on right (ivory block for 01, matte lime block for 02, dark ink!)
      drawSolidBadge(ctx, m.val, bx + bw - 16, m.y - 34, {
        align: 'right',
        size: 12,
        ls: 1.2,
        padX: 10,
        h: 24,
        lime: m.accentLime,
        r: 3,
      });

      setFont(ctx, DSP(38), 1);
      ctx.fillStyle = IVORY;
      ctx.fillText(m.title, bx + 20, m.y + 12);

      // Meter bar
      ctx.fillStyle = 'rgba(241,239,230,0.12)';
      ctx.fillRect(bx + 20, m.y + 30, bw - 40, 10);
      ctx.fillStyle = m.accentLime ? LIME : IVORY;
      ctx.fillRect(bx + 20, m.y + 30, (bw - 40) * m.fill, 10);

      ctx.restore();
    }

    if (t >= A.disulap - 0.15) {
      slab(ctx, 'AIR LAUT  →  AIR TAWAR', cx, cy + 190, t, A.disulap - 0.15, { align: 'center', size: 19, lime: true });
    }
    ctx.textAlign = 'left';
    ctx.restore();
  }

  // Mini architectural glyphs for the 2x2 overview cards (understated ivory structure + solid fill accents, zero neon wireframes)
  function drawMiniIcon(ctx, idx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = 'rgba(241,239,230,0.44)';
    ctx.lineWidth = 1.8;
    if (idx === 0) {
      ctx.fillStyle = 'rgba(241,239,230,0.08)';
      ctx.fillRect(-13, -18, 26, 36);
      ctx.strokeRect(-13, -18, 26, 36);
      ctx.fillStyle = LIME;
      ctx.fillRect(-10, 6, 20, 9);
    } else if (idx === 1) {
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = 'rgba(241,239,230,0.10)';
        ctx.fillRect(-18, -16 + i * 12, 36, 8);
        ctx.strokeRect(-18, -16 + i * 12, 36, 8);
        ctx.fillStyle = i === 0 ? LIME : 'rgba(241,239,230,0.55)';
        ctx.fillRect(-14, -14 + i * 12, 5, 4);
      }
    } else if (idx === 2) {
      ctx.fillStyle = 'rgba(241,239,230,0.08)';
      ctx.fillRect(-19, -15, 38, 30);
      ctx.strokeRect(-19, -15, 38, 30);
      ctx.fillStyle = LIME;
      ctx.fillRect(-2, -15, 4, 30);
    } else {
      ctx.fillStyle = 'rgba(241,239,230,0.72)';
      ctx.fillRect(-18, -11, 24, 8);
      ctx.fillStyle = LIME;
      ctx.fillRect(-18, 4, 36, 8);
    }
    ctx.restore();
  }

  // Unified 2x2 Overview Grid (S5)
  function drawOverviewGrid(ctx, t) {
    const t0 = A.overview;
    const kHead = E.outQuint(inv(t0 - 0.15, t0 + 0.35, t));

    ctx.save();
    ctx.globalAlpha *= kHead;
    // Crisp mathematically centered solid matte tag + ivory heading (zero floating green text!)
    setFont(ctx, MN(17, 700), 2.5);
    const bwTag = ctx.measureText('PETA PERJALANAN').width + 36;
    setFont(ctx, MN(20, 700), 3.5);
    const twHead = ctx.measureText('EMPAT PERTANYAAN').width;
    const gapH = 22;
    const xHead0 = -(bwTag + gapH + twHead) / 2;
    drawSolidBadge(ctx, 'PETA PERJALANAN', xHead0, -374, { align: 'left', size: 17, ls: 2.5, padX: 18, h: 36, lime: true, r: 3 });
    setFont(ctx, MN(20, 700), 3.5);
    ctx.fillStyle = IVORY;
    ctx.textAlign = 'left';
    ctx.fillText('EMPAT PERTANYAAN', xHead0 + bwTag + gapH, -367);

    ctx.fillStyle = 'rgba(241,239,230,0.20)';
    ctx.fillRect(-780, -342, 1560, 1.5);
    ctx.restore();

    const CARDS = [
      {
        num: '01 · BAB 1',
        title: '01 · CADANGAN AIR TIPIS?',
        sub: 'Kenapa cadangan air Batam begitu tipis sampai warga turun ke jalan?',
      },
      {
        num: '02 · BAB 2',
        title: '02 · DATA CENTER BOROS AIR?',
        sub: 'Kenapa ruang komputer menghabiskan jutaan liter air bersih?',
      },
      {
        num: '03 · BAB 3',
        title: '03 · CARA KERJA PABRIK Rp600 M?',
        sub: 'Bagaimana pabrik Rp600 miliar memisahkan garam dari air laut?',
      },
      {
        num: '04 · BAB 4',
        title: '04 · HARGA TERSEMBUNYI?',
        sub: 'Ada harga tersembunyi apa di balik air laut jadi tawar?',
      },
    ];

    const cw = 756, ch = 286, gx = 48, gy = 36;
    CARDS.forEach((c, idx) => {
      const col = idx % 2, row = Math.floor(idx / 2);
      const x = (col === 0 ? -gx / 2 - cw : gx / 2);
      const y = -304 + row * (ch + gy);
      const ti = t0 - 0.05 + idx * 0.08;
      const kc = E.outQuint(inv(ti, ti + 0.38, t));
      if (kc <= 0) return;

      ctx.save();
      ctx.globalAlpha *= clamp(kc * 1.4);
      ctx.translate(0, (1 - kc) * 32);

      // Dark matte slate plate + soft shadow + understated neutral ivory hairline
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.55)';
      ctx.shadowBlur = 34;
      ctx.shadowOffsetY = 16;
      ctx.fillStyle = SLATE_PLATE;
      ctx.beginPath();
      ctx.roundRect(x, y, cw, ch, 8);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = HAIRLINE;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x, y, cw, ch, 8);
      ctx.stroke();

      // Left structural solid lime rule
      ctx.fillStyle = LIME;
      ctx.fillRect(x, y + 20, 6, ch - 40);

      // Top solid matte #C8F53C badge (#11120E dark ink) + architectural mini glyph
      drawSolidBadge(ctx, c.num, x + 36, y + 46, { size: 15, ls: 2, padX: 14, h: 30, lime: true, r: 3 });
      drawMiniIcon(ctx, idx, x + cw - 52, y + 48);

      // Fit headline cleanly inside card width
      let sz = 66;
      setFont(ctx, DSP(sz), 1.5);
      while (ctx.measureText(c.title).width > cw - 80 && sz > 44) {
        sz -= 2;
        setFont(ctx, DSP(sz), 1.5);
      }
      ctx.fillStyle = IVORY;
      ctx.fillText(c.title, x + 36, y + 132);

      // Wrapped serif sub-question
      const subCss = SRF(28);
      const lines = wrapLines(ctx, c.sub, cw - 78, subCss);
      setFont(ctx, subCss, 0);
      ctx.fillStyle = 'rgba(241,239,230,0.86)';
      lines.forEach((ln, li) => ctx.fillText(ln, x + 36, y + 190 + li * 38));

      ctx.restore();
    });
  }

  const ST = [
    // S0: Intro — "Supaya terang semua, yuk kita bahas pelan-pelan lewat empat pertanyaan."
    // Reserve first 0.72 s safe for kit/portal.js opening optical iris!
    {
      at: 0, name: 'PETA', x: ST_X[0], z: ST_Z[0], py: -560, yaw: [3.0, -1.6], dist: [1580, 1460],
      world,
      draw(ctx, t) {
        // Editorial top kicker with subtle flanking hairlines (zero floating neon text)
        const kk = E.outCubic(inv(0.74, 1.15, t));
        if (kk > 0) {
          ctx.save();
          ctx.globalAlpha *= kk;
          ctx.fillStyle = 'rgba(241,239,230,0.22)';
          ctx.fillRect(-380, -276, 110 * kk, 1.5);
          ctx.fillRect(380 - 110 * kk, -276, 110 * kk, 1.5);
          ctx.restore();
        }
        typeOn(ctx, 'PETA PERJALANAN · BATAM SWRO', 0, -270, t, 0.74, MN(19, 700), { align: 'center', ls: 4.5, cps: 60, col: 'rgba(241,239,230,0.84)' });

        markLine(ctx, 'supaya ', 'TERANG', ' semua,', 0, -150, t, A.terang - 0.08, A.terang + 0.02, SRF(98));
        txt(ctx, 'kita bahas pelan-pelan lewat', 0, -48, t, A.yuk - 0.1, SRF(48), { align: 'center', col: 'rgba(241,239,230,0.90)' });

        // Centered "4 PERTANYAAN" monumental hero: solid matte #C8F53C block behind "4" (#11120E ink) + IVORY PERTANYAAN
        if (t >= A.empat - 0.15) {
          setFont(ctx, DSP(186), 2);
          const w4 = ctx.measureText('4').width;
          setFont(ctx, DSP(166), 3);
          const wp = ctx.measureText('PERTANYAAN').width;
          const boxW = w4 + 52;
          const totalW = boxW + 30 + wp;
          const xStart = -totalW / 2;

          const k4 = E.snap(inv(A.empat - 0.15, A.empat + 0.08, t));
          if (k4 > 0) {
            ctx.fillStyle = LIME;
            ctx.fillRect(xStart, -10, boxW * k4, 168);
          }
          fall(ctx, '4', xStart + 26, 140, t, A.empat - 0.12, DSP(186), { col: DARK_INK });
          fall(ctx, 'PERTANYAAN', xStart + boxW + 30, 134, t, A.pertanyaan - 0.08, DSP(166), { ls: 3, stag: 0.02, col: IVORY });
        }

        // 4 conduit roadmap nodes ticking in along the bottom track
        const xs = [-570, -190, 190, 570];
        const nt = [A.pelan, A.pelan + 0.35, A.empat - 0.15, A.pertanyaan + 0.05];
        const kRail = E.outQuint(inv(A.pelan - 0.1, A.pertanyaan + 0.3, t));
        if (kRail > 0) {
          ctx.save();
          ctx.fillStyle = 'rgba(241,239,230,0.22)';
          ctx.fillRect(xs[0], 281, (xs[3] - xs[0]) * kRail, 2);

          NODES.forEach((nd, i) => {
            const kn = spring(t - nt[i], 0.55, 0.32);
            if (kn <= 0) return;
            ctx.save();
            ctx.translate(xs[i], 282);
            ctx.scale(Math.min(1.1, kn), Math.min(1.1, kn));
            drawNodePill(ctx, 0, 0, nd, i === 0, false);
            ctx.restore();
          });
          ctx.restore();
        }
      },
    },

    // S1: 01 · CADANGAN AIR TIPIS?
    {
      at: A.pertama, via: 'whip', side: -1, lead: 0.30, dur: 0.68, name: '01 AIR TIPIS',
      x: ST_X[1], z: ST_Z[1], py: -560, yaw: [-2.8, 1.8], dist: [1510, 1430],
      world,
      draw(ctx, t) {
        drawQuestionCard(ctx, t, A.pertama, {
          num: '01',
          kicker: 'BAB 1 · KRISIS AIR BATAM',
          line1: '01 · CADANGAN',
          line2: 'AIR TIPIS?',
          hiAt: A.tipis,
          question: 'Pertama, kenapa cadangan air Batam begitu tipis sampai warga turun ke jalan?',
          subAt: A.cadangan - 0.15,
          focus: 'FOKUS · 6 WADUK TADAH HUJAN & PROTES SAMBAU',
          diagram: (cx2, x, y) => diagramQ1(cx2, x, y, t),
        });
        drawProgressStepper(ctx, 0, t, A.pertama);
      },
    },

    // S2: 02 · DATA CENTER BOROS AIR?
    {
      at: A.kedua, via: 'truck', side: 1, lead: 0.30, dur: 0.68, name: '02 BOROS AIR',
      x: ST_X[2], z: ST_Z[2], py: -560, yaw: [2.8, -1.8], dist: [1510, 1430],
      world,
      draw(ctx, t) {
        drawQuestionCard(ctx, t, A.kedua, {
          num: '02',
          kicker: 'BAB 2 · PENDINGINAN SERVER',
          line1: '02 · DATA CENTER',
          line2: 'BOROS AIR?',
          hiAt: A.jutaan,
          question: 'Kedua, kenapa ruang komputer justru menghabiskan jutaan liter air bersih?',
          subAt: A.ruang - 0.15,
          focus: 'FOKUS · PANAS RAK SERVER & EVAPORASI MENARA',
          diagram: (cx2, x, y) => diagramQ2(cx2, x, y, t),
        });
        drawProgressStepper(ctx, 1, t, A.kedua);
      },
    },

    // S3: 03 · CARA KERJA PABRIK Rp600 M?
    {
      at: A.ketiga, via: 'whip', side: -1, lead: 0.30, dur: 0.68, name: '03 PABRIK SWRO',
      x: ST_X[3], z: ST_Z[3], py: -560, yaw: [-2.8, 1.8], dist: [1510, 1430],
      world,
      draw(ctx, t) {
        drawQuestionCard(ctx, t, A.ketiga, {
          num: '03',
          kicker: 'BAB 3 · SWRO KABIL',
          line1: '03 · CARA KERJA',
          line2: 'PABRIK Rp600 M?',
          hiAt: A.enam,
          question: 'Ketiga, bagaimana pabrik enam ratus miliar itu memisahkan garam dari air laut?',
          subAt: A.carakerja - 0.25,
          focus: 'FOKUS · OSMOSIS BALIK & PIPA 12 KM KE NONGSA',
          diagram: (cx2, x, y) => diagramQ3(cx2, x, y, t),
        });
        drawProgressStepper(ctx, 2, t, A.ketiga);
      },
    },

    // S4: 04 · HARGA TERSEMBUNYI?
    {
      at: A.keempat, via: 'truck', side: 1, lead: 0.30, dur: 0.68, name: '04 HARGA BALIK',
      x: ST_X[4], z: ST_Z[4], py: -560, yaw: [2.8, -1.8], dist: [1510, 1430],
      world,
      draw(ctx, t) {
        drawQuestionCard(ctx, t, A.keempat, {
          num: '04',
          kicker: 'BAB 4 · ONGKOS LINGKUNGAN',
          line1: '04 · HARGA',
          line2: 'TERSEMBUNYI?',
          hiAt: A.tersembunyi,
          question: 'Dan keempat, ada harga tersembunyi apa di balik air laut yang disulap jadi tawar?',
          subAt: A.harga - 0.15,
          focus: 'FOKUS · KONSUMSI LISTRIK & LIMBAH GARAM BRINE',
          diagram: (cx2, x, y) => diagramQ4(cx2, x, y, t),
        });
        drawProgressStepper(ctx, 3, t, A.keempat);
      },
    },

    // S5: 2x2 Unified Roadmap Overview (safe before last 0.90 s portal OUT!)
    {
      at: A.overview, via: 'rise', lead: 0.24, dur: 0.52, pre: 0.24, name: 'PETA 2X2',
      x: ST_X[5], z: ST_Z[5], py: -560, yaw: [-1.4, 0.8], dist: [1520, 1470],
      world,
      draw(ctx, t) {
        drawOverviewGrid(ctx, t);
      },
    },
  ];

  return makeChapter({ B, ST, load, gate: 0.35, label: 'PETA · EMPAT PERTANYAAN' });
}
