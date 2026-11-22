// Bab 4 · Harga Tersembunyi di Balik Air Laut Jadi Tawar (VO 07, ~68.00s).
// Polarity arc: Bright illusory calm (#EAE7DC) -> sharp cut into Dark Marine/Energy Cost (#0B0C09 + salt crystal #D9D6CA).
// Full-bleed video plates via layarFoto (ocean_waves & keran_tetes); Grafik 3/3 + Kompas evidence; zero 🟡 numbers.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter,
  loadImg, loadVid, evid, fall, markLine, srcTag, slab, txt, countTo, fmt, rnd, theme } from './kit.js';
import { layarFoto, kreditLatar } from './batam.js';
import { makeWaterGL } from './watergl.js';

const SALT = '#D9D6CA';
const DARK_INK = '#15160F';
const LIGHT_BG = '#EAE7DC';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic crystal prisms & brine/ocean dispersion particles (batched in single paths)
const CRYSTALS = (() => {
  const rng = mulberry32(4042026);
  return Array.from({ length: 34 }, () => ({
    x: (rng() - 0.5) * 1900,
    y: (rng() - 0.5) * 960,
    r: 8 + rng() * 20,
    rot: rng() * Math.PI * 2,
    spd: 0.15 + rng() * 0.35,
    phase: rng(),
  }));
})();

const BRINE_PLUME = (() => {
  const rng = mulberry32(40499);
  return Array.from({ length: 120 }, () => ({
    phase: rng(),
    spd: 0.24 + rng() * 0.24,
    spread: (rng() - 0.5) * 2,
    r: 3.5 + rng() * 4.5,
    jit: rng() * Math.PI * 2,
  }));
})();

const FISH_POS = [
  [210, -20, 1.0], [380, 45, 0.85], [530, -35, 1.1],
  [290, 95, 0.78], [480, 88, 0.92], [620, 22, 0.80],
];

// Crisp artifact-free layered matte drop shadow (avoids Chromium Skia shadowBlur seams under 3D onPlane transforms)
function matteShadow(ctx, x, y, w, h, r = 3) {
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath(); ctx.roundRect(x - 6, y + 6, w + 12, h + 12, r + 3); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.34)';
  ctx.beginPath(); ctx.roundRect(x - 2, y + 4, w + 4, h + 6, r + 1); ctx.fill();
}

// Shared editorial strip / documentary plate helper (ZERO neon outlines or AI-slop pills!).
// Variants:
//  - accent:true / variant:'solid' -> crisp matte #C8F53C strip with dark ink #11120E, sharp 2px edges, zero border
//  - variant:'ink'                -> crisp matte #15160F strip with warm ivory text (for light daylight world)
//  - variant:'plate' (default)    -> matte dark documentary plate rgba(11,13,15,0.94), subtle neutral hairline,
//                                    solid 5px #C8F53C left editorial bar (or solid #C8F53C icon cap if o.icon), crisp ivory text
function pillBadge(ctx, text, cx, cy, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.38, t));
  if (k <= 0) return;
  const size = o.size || 18;
  const ls = o.ls ?? 3;
  const variant = o.accent ? 'solid' : (o.variant || 'plate');
  const align = o.align || 'center';
  const hh = Math.round(size * 2.25);
  const iconW = o.icon ? hh : 0;
  setFont(ctx, MN(size), ls);
  const padL = o.icon ? Math.round(size * 1.15) : Math.round(size * 1.35);
  const padR = Math.round(size * 1.35);
  const textW = ctx.measureText(text).width;
  const tw = Math.ceil(iconW + padL + textW + padR);
  const x0 = align === 'left' ? 0 : align === 'right' ? -tw : -tw / 2;

  ctx.save();
  ctx.globalAlpha = (o.a ?? 1) * k;
  ctx.translate(cx, cy + (1 - k) * 14);

  if (variant === 'solid') {
    ctx.fillStyle = LIME;
    ctx.beginPath(); ctx.roundRect(x0, -hh / 2, tw, hh, 2); ctx.fill();
    ctx.fillStyle = '#11120E';
    ctx.textAlign = 'left';
    ctx.fillText(text, x0 + padL, size * 0.35);
  } else if (variant === 'ink') {
    ctx.fillStyle = DARK_INK;
    ctx.beginPath(); ctx.roundRect(x0, -hh / 2, tw, hh, 2); ctx.fill();
    ctx.fillStyle = LIME;
    ctx.fillRect(x0, -hh / 2, 5, hh);
    ctx.fillStyle = LIGHT_BG;
    ctx.textAlign = 'left';
    ctx.fillText(text, x0 + padL + 2, size * 0.35);
  } else {
    // Matte dark documentary plate (never green outline, never green text!)
    matteShadow(ctx, x0, -hh / 2, tw, hh, 2);
    ctx.fillStyle = 'rgba(11,13,15,0.94)';
    ctx.beginPath(); ctx.roundRect(x0, -hh / 2, tw, hh, 2); ctx.fill();

    ctx.strokeStyle = 'rgba(241,239,230,0.16)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    if (o.icon) {
      // Solid matte editorial warning/index cap on left edge
      ctx.fillStyle = LIME;
      ctx.beginPath(); ctx.roundRect(x0, -hh / 2, iconW, hh, [2, 0, 0, 2]); ctx.fill();
      setFont(ctx, MN(Math.round(size * 1.05)), 0);
      ctx.fillStyle = '#11120E';
      ctx.textAlign = 'center';
      ctx.fillText(o.icon, x0 + iconW / 2, size * 0.36);
      setFont(ctx, MN(size), ls);
    } else {
      // Crisp 5px solid vertical editorial bar on left edge
      ctx.fillStyle = LIME;
      ctx.fillRect(x0, -hh / 2, 5, hh);
    }

    ctx.fillStyle = IVORY;
    ctx.textAlign = 'left';
    ctx.fillText(text, x0 + iconW + padL, size * 0.35);
  }
  ctx.restore();
}

// Shared precision architectural volumetric sight-glass (2L -> 1L fresh + 1L brine, zero neon outlines)
function sightTank(ctx, cx, cy, w, h, fillFrac, o = {}) {
  const k = o.k ?? 1;
  if (k <= 0) return;
  ctx.save();
  ctx.globalAlpha = k;
  ctx.translate(cx, cy);

  // Sharp industrial laboratory vessel housing
  matteShadow(ctx, -w / 2, -h / 2, w, h, 4);
  ctx.fillStyle = 'rgba(12,17,21,0.94)';
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 4); ctx.fill();

  ctx.strokeStyle = o.border || 'rgba(217,214,202,0.34)';
  ctx.lineWidth = 2;
  ctx.stroke();

  const f = clamp(fillFrac, 0, 1);
  if (f > 0.01) {
    const fh = (h - 10) * f;
    const fy = h / 2 - 5 - fh;
    ctx.save();
    ctx.beginPath(); ctx.roundRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 2); ctx.clip();
    const gr = ctx.createLinearGradient(0, fy, 0, h / 2);
    if (o.brine) {
      gr.addColorStop(0, 'rgba(196,192,180,0.48)');
      gr.addColorStop(1, 'rgba(72,70,64,0.92)');
    } else if (o.fresh) {
      gr.addColorStop(0, 'rgba(128,194,220,0.72)');
      gr.addColorStop(1, 'rgba(34,86,114,0.92)');
    } else {
      gr.addColorStop(0, 'rgba(72,138,172,0.68)');
      gr.addColorStop(1, 'rgba(18,46,64,0.92)');
    }
    ctx.fillStyle = gr;
    ctx.fillRect(-w / 2 + 4, fy, w - 8, fh + 5);
    // Clean matte surface meniscus (ivory / salt — never neon green!)
    ctx.fillStyle = o.brine ? SALT : IVORY;
    ctx.fillRect(-w / 2 + 4, fy, w - 8, 3);
    ctx.restore();
  }

  // Batched calibration ticks
  ctx.strokeStyle = 'rgba(241,239,230,0.28)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 1; i <= 4; i++) {
    const ty = h / 2 - (h * i) / 5;
    ctx.moveTo(-w / 2 + 8, ty);
    ctx.lineTo(-w / 2 + (i === 2 ? 28 : 18), ty);
  }
  ctx.stroke();

  if (o.val) {
    setFont(ctx, DSP(o.valSize || 80), 1);
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.72)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = o.valCol || IVORY;
    ctx.fillText(o.val, 0, o.valY ?? 20);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  }
  if (o.sub) {
    setFont(ctx, MN(14), 2.5);
    const sw = Math.max(w, ctx.measureText(o.sub).width + 34);
    const sh = 34;
    const sy = h / 2 + 28;
    if (o.subSolid) {
      ctx.fillStyle = LIME;
      ctx.beginPath(); ctx.roundRect(-sw / 2, sy - sh / 2, sw, sh, 2); ctx.fill();
      ctx.fillStyle = '#11120E';
    } else {
      ctx.fillStyle = 'rgba(14,16,15,0.94)';
      ctx.beginPath(); ctx.roundRect(-sw / 2, sy - sh / 2, sw, sh, 2); ctx.fill();
      ctx.strokeStyle = 'rgba(241,239,230,0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = SALT;
      ctx.fillRect(-sw / 2, sy - sh / 2, 4, sh);
      ctx.fillStyle = SALT;
    }
    ctx.textAlign = 'center';
    ctx.fillText(o.sub, 0, sy + 5);
  }
  if (o.top) {
    setFont(ctx, MN(15), 3);
    ctx.fillStyle = o.topCol || SALT;
    ctx.textAlign = 'center';
    ctx.fillText(o.top, 0, -h / 2 - 18);
  }
  ctx.restore();
}

// Draw batched salt crystal octahedra across a station
function drawCrystals(ctx, t, alpha = 0.22) {
  ctx.save();
  ctx.fillStyle = `rgba(217,214,202,${alpha * 0.35})`;
  ctx.strokeStyle = `rgba(217,214,202,${alpha})`;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (const c of CRYSTALS) {
    const cx = c.x + Math.sin(t * c.spd + c.phase * 6.28) * 18;
    const cy = c.y - ((t * 14 * c.spd + c.phase * 120) % 160) + 80;
    const a = c.rot + t * 0.12 * (c.spd > 0.3 ? 1 : -1);
    const r = c.r;
    const dx1 = Math.cos(a) * r, dy1 = Math.sin(a) * r;
    const dx2 = Math.cos(a + Math.PI * 0.5) * r * 0.65, dy2 = Math.sin(a + Math.PI * 0.5) * r * 0.65;
    ctx.moveTo(cx + dx1, cy + dy1);
    ctx.lineTo(cx + dx2, cy + dy2);
    ctx.lineTo(cx - dx1, cy - dy1);
    ctx.lineTo(cx - dx2, cy - dy2);
    ctx.closePath();
  }
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};
  const VID = {};
  let waterGL = null;

  // Start in bright illusory daylight theme (#EAE7DC)
  theme(true, { bg: LIGHT_BG, bgrgb: '234,231,220', ink: DARK_INK, inkrgb: '21,22,15', vig: 0.14 });

  async function load() {
    IM.grafik = await loadImg('../assets/shared/grafik/salinitas-swro-brine.png', 1600);
    IM.kompas = await loadImg('../assets/shared/kutipan/regional-pengembang-data-center-di-batam-kini.png', 1800);
    VID.ocean_waves = await loadVid('../assets/shared/vid/', 'ocean_waves');
    VID.keran_tetes = await loadVid('../assets/shared/vid/', 'keran_tetes');
    waterGL = makeWaterGL(960, 540);
  }

  // Subtle overhead cinema-stage key light for dark stations (preserves 3D floor grid)
  function studioSpot(ctx, cx = 0, cy = -40, rad = 760, a = 0.065) {
    ctx.save();
    const g = ctx.createRadialGradient(cx, cy, 40, cx, cy, rad);
    g.addColorStop(0, `rgba(241,239,230,${a})`);
    g.addColorStop(0.55, `rgba(217,214,202,${a * 0.28})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    ctx.restore();
  }

  // Full-bleed video plates schedule (ocean_waves & keran_tetes — never boxed!)
  const OCEAN_BG = [
    { vid: 'ocean_waves', t0: A.brine - 0.30, t1: A.pompa + 0.20, dir: 1,
      grade: 'saturate(.24) contrast(1.34) brightness(.52)',
      cap: 'EKOSISTEM PANTAI & LAUT LEPAS', kredit: 'Visual: Nadezhda Moryak / Pexels' },
  ];
  const KERAN_BG = [
    { vid: 'keran_tetes', t0: A.tanpa - 0.25, t1: B.END + B.VOFF + B.TAIL + 0.1, dir: -1,
      grade: 'saturate(.20) contrast(1.36) brightness(.55)',
      cap: 'AIR TAWAR WARGA', kredit: 'Visual: mariya_m / Pixabay' },
  ];

  function drawWorldBg(ctx, t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (t < A.flip) {
      // Bright architectural daylight wash + subtle WebGL2 water caustic
      const rg = ctx.createRadialGradient(W / 2, H * 0.44, 120, W / 2, H * 0.5, W * 0.72);
      rg.addColorStop(0, '#F3F0E6');
      rg.addColorStop(1, LIGHT_BG);
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);
      if (waterGL) {
        const rippleT = t >= A.sempurna ? t - A.sempurna : -1;
        const glC = waterGL(t, rippleT, 0.5, 0.42, 0.24);
        if (glC) {
          ctx.save();
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = 0.14;
          ctx.drawImage(glC, 0, 0, W, H);
          ctx.restore();
        }
      }
      return;
    }

    // Dark world: full-bleed ocean_waves (26.5..39.8s) or keran_tetes (56.9..68s)
    const hasOcean = t >= OCEAN_BG[0].t0 && t <= OCEAN_BG[0].t1;
    const hasKeran = t >= KERAN_BG[0].t0 && t <= KERAN_BG[0].t1;
    if (hasOcean) {
      layarFoto(ctx, W, H, OCEAN_BG, t, { IM: VID, dim: 0.70, grain: 0.22 });
      // Deep directional documentary scrim (richer contrast behind lower typography & left hero)
      const scV = ctx.createLinearGradient(0, 0, 0, H);
      scV.addColorStop(0, 'rgba(7,9,10,0.44)');
      scV.addColorStop(0.42, 'rgba(7,9,10,0.12)');
      scV.addColorStop(0.75, 'rgba(7,9,10,0.46)');
      scV.addColorStop(1, 'rgba(6,8,9,0.76)');
      ctx.fillStyle = scV;
      ctx.fillRect(0, 0, W, H);
      if (waterGL) {
        const glC = waterGL(t, t - A.brine, 0.35, 0.55, 0.22);
        if (glC) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.globalAlpha = 0.12;
          ctx.drawImage(glC, 0, 0, W, H);
          ctx.restore();
        }
      }
    } else if (hasKeran) {
      layarFoto(ctx, W, H, KERAN_BG, t, { IM: VID, dim: 0.70, grain: 0.22 });
      // Chiaroscuro documentary edge & lower-third scrim over tap footage
      const scK = ctx.createLinearGradient(0, 0, 0, H);
      scK.addColorStop(0, 'rgba(7,8,8,0.42)');
      scK.addColorStop(0.45, 'rgba(7,8,8,0.14)');
      scK.addColorStop(0.76, 'rgba(7,8,8,0.48)');
      scK.addColorStop(1, 'rgba(5,6,6,0.78)');
      ctx.fillStyle = scK;
      ctx.fillRect(0, 0, W, H);
    }
  }

  const ST = [
    // S0 (0.00..5.85s): Bright Illusory Calm (#EAE7DC) — "Kedengarannya seperti jalan keluar yang sempurna, ya?"
    {
      at: 0, x: 0, z: 0, yaw: [-1.8, 1.4], dist: [1480, 1380], pitch: 4,
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 0) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBg(ctx, t) });
      },
      draw(ctx, t) {
        // Subtle architectural calm wave lines across horizon
        ctx.save();
        ctx.strokeStyle = 'rgba(21,22,15,0.10)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let row = 0; row < 4; row++) {
          const yBase = -320 + row * 180;
          for (let x = -960; x <= 960; x += 48) {
            const y = yBase + Math.sin(x * 0.006 + t * 1.4 + row) * 10;
            if (x === -960) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();

        // Keep first 0.72s free of crucial text for portal IN opening
        pillBadge(ctx, 'SKENARIO IDEAL?', 0, -255, t, 0.76, { variant: 'ink', size: 17, ls: 3.5 });
        markLine(ctx, 'jalan keluar yang ', 'SEMPURNA?', '', 0, -110, t, 0.85, A.sempurna, SRF(94), { col: DARK_INK });

        // Clean architectural schematic pipe: AMBIL AIR LAUT -> SERVER DINGIN
        const kPipe = E.outQuint(inv(1.4, 2.2, t));
        if (kPipe > 0) {
          ctx.save();
          ctx.globalAlpha = kPipe;
          // Left node (sharp architectural plate)
          ctx.fillStyle = '#F5F3EA';
          ctx.strokeStyle = DARK_INK;
          ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.roundRect(-580, 15, 290, 96, 3); ctx.fill(); ctx.stroke();
          setFont(ctx, MN(19), 4); ctx.fillStyle = DARK_INK; ctx.textAlign = 'center';
          ctx.fillText('AMBIL AIR LAUT', -435, 70);

          // Connecting pipe + animated flow pulses
          const x0 = -290, x1 = 290;
          ctx.strokeStyle = 'rgba(21,22,15,0.22)';
          ctx.lineWidth = 12;
          ctx.beginPath(); ctx.moveTo(x0, 63); ctx.lineTo(lerp(x0, x1, kPipe), 63); ctx.stroke();

          if (kPipe > 0.7) {
            ctx.fillStyle = DARK_INK;
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
              const u = ((t * 0.75 + i * 0.25) % 1);
              const px = lerp(x0 + 20, x1 - 20, u);
              ctx.moveTo(px + 10, 63);
              ctx.arc(px, 63, 6.5, 0, Math.PI * 2);
            }
            ctx.fill();
          }

          // Right node
          ctx.fillStyle = DARK_INK;
          ctx.beginPath(); ctx.roundRect(290, 15, 290, 96, 3); ctx.fill();
          ctx.fillStyle = LIGHT_BG;
          ctx.fillText('SERVER DINGIN', 435, 70);
          ctx.restore();
        }

        // "beres semua urusan" + illusory lime checkmark
        const kBeres = E.outQuint(inv(A.beres - 0.25, A.beres + 0.15, t));
        if (kBeres > 0) {
          ctx.save();
          ctx.globalAlpha = kBeres;
          setFont(ctx, SRF(64), 0);
          ctx.fillStyle = DARK_INK;
          ctx.textAlign = 'center';
          ctx.fillText('beres semua urusan.', -36, 240 + (1 - kBeres) * 24);
          const sp = spring(t - A.beres, 0.5, 0.30);
          if (sp > 0) {
            ctx.translate(295, 222);
            ctx.scale(sp, sp);
            ctx.fillStyle = LIME;
            ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = LIME_INK; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            ctx.beginPath(); ctx.moveTo(-10, 1); ctx.lineTo(-2, 9); ctx.lineTo(11, -8); ctx.stroke();
          }
          ctx.restore();
        }
      },
    },

    // S1 (5.85..10.15s): SHARP POLARITY FLIP -> Dark Marine/Energy Cost (#0B0C09) + Salt Crystal (#D9D6CA)
    {
      at: A.flip, via: 'cut', lead: 0, pre: 0, yaw: [2.4, -1.6], dist: [1500, 1390], pitch: 5,
      draw(ctx, t) {
        studioSpot(ctx, 0, -90, 820, 0.085);
        drawCrystals(ctx, t, 0.24);
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.72)';
        ctx.shadowBlur = 32;
        ctx.shadowOffsetY = 12;
        fall(ctx, 'SAYANGNYA,', 0, -135, t, A.sayang - 0.05, DSP(258), { align: 'center', col: IVORY, ls: 2 });
        ctx.restore();
        markLine(ctx, 'alam selalu punya ', 'ONGKOS BALIK', '', 0, 24, t, A.alam - 0.06, A.ongkos, SRF(84), { col: IVORY });

        // Two sharp matte editorial ledger plates setting up the chapter's two halves (ZERO neon outline, ZERO overflow!)
        const cards = [
          [-315, A.ongkos + 0.55, '01', 'LIMBAH GARAM PEKAT', 'BRINE · 70.000 PPM', SALT],
          [315, A.hitung - 0.25, '02', 'POMPA TEKANAN TINGGI', 'ENERGI · 2,70 kWhe/m³', LIME],
        ];
        for (const [cx, t0, idx, kicker, headline, ac] of cards) {
          const k = E.outQuint(inv(t0, t0 + 0.45, t));
          if (k <= 0) continue;
          const cw = 570, ch = 138;
          ctx.save();
          ctx.globalAlpha = k;
          ctx.translate(cx, 222 + (1 - k) * 30);

          // Matte dark plate with subtle neutral hairline
          matteShadow(ctx, -cw / 2, -ch / 2, cw, ch, 3);
          ctx.fillStyle = 'rgba(15,17,14,0.95)';
          ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 3); ctx.fill();

          ctx.strokeStyle = 'rgba(241,239,230,0.16)';
          ctx.lineWidth = 1.25;
          ctx.stroke();

          // Full-height solid 6px editorial accent bar on left edge
          ctx.fillStyle = ac;
          ctx.fillRect(-cw / 2, -ch / 2, 6, ch);

          // Top index chip (solid matte block + dark ink) + crisp neutral kicker (NEVER neon green text!)
          ctx.fillStyle = ac;
          ctx.fillRect(-cw / 2 + 28, -ch / 2 + 22, 38, 24);
          setFont(ctx, MN(14), 1); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
          ctx.fillText(idx, -cw / 2 + 47, -ch / 2 + 39);

          setFont(ctx, MN(15), 3); ctx.fillStyle = SALT; ctx.textAlign = 'left';
          ctx.fillText(kicker, -cw / 2 + 80, -ch / 2 + 39);

          // High-contrast editorial display headline (measured comfortably inside 510px!)
          setFont(ctx, DSP(54), 1.5); ctx.fillStyle = IVORY;
          ctx.fillText(headline, -cw / 2 + 28, ch / 2 - 24);
          ctx.restore();
        }
      },
    },

    // S2 (10.15..16.80s): U.S. DOE Study & 50% Recovery Rate
    {
      at: A.doe - 0.12, via: 'whip', dur: 0.72, name: 'PEMULIHAN 50%', yaw: [-2.6, 1.8], dist: [1490, 1390], pitch: 5,
      draw(ctx, t) {
        studioSpot(ctx, 0, 80, 780, 0.07);
        drawCrystals(ctx, t, 0.14);
        slab(ctx, 'KAJIAN U.S. DEPT. OF ENERGY', -620, -305, t, A.doe + 0.05);
        txt(ctx, 'Pabrik penyuling laut biasa cuma menyelamatkan...', 0, -210, t, A.doe + 0.75, SRF(44), { align: 'center', col: SALT });

        // Horizontal 100% -> 50% / 50% precision architectural recovery bar (sharp 3px edges, solid matte lime left half!)
        const kBar = E.outQuint(inv(A.doe + 1.1, A.doe + 1.9, t));
        const kSplit = E.snap(inv(A.separuh - 0.45, A.separuh + 0.15, t));
        const bw = 1240, bh = 124, bx = -bw / 2, by = -58;
        if (kBar > 0) {
          ctx.save();
          matteShadow(ctx, bx, by - bh / 2, bw, bh, 3);
          ctx.fillStyle = '#111310';
          ctx.beginPath(); ctx.roundRect(bx, by - bh / 2, bw, bh, 3); ctx.fill();

          ctx.strokeStyle = 'rgba(241,239,230,0.22)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.save();
          ctx.beginPath(); ctx.roundRect(bx + 2, by - bh / 2 + 2, bw - 4, bh - 4, 2); ctx.clip();
          const fillW = (bw - 4) * kBar;
          const freshW = lerp(fillW, (bw - 4) * 0.5, kSplit);

          // Left half: transitions cleanly from marine slate to crisp SOLID MATTE LIME editorial strip
          ctx.fillStyle = kSplit > 0.18 ? LIME : '#214E68';
          ctx.fillRect(bx + 2, by - bh / 2 + 2, freshW, bh - 4);
          if (kSplit > 0.18 && kSplit < 0.99) {
            ctx.fillStyle = `rgba(33,78,104,${clamp(1 - (kSplit - 0.18) / 0.65)})`;
            ctx.fillRect(bx + 2, by - bh / 2 + 2, freshW, bh - 4);
          }

          // Right half: Brine remainder (deep matte stone charcoal + crisp diagonal hatch)
          if (kSplit > 0.02) {
            const rw = Math.max(0, fillW - freshW);
            ctx.fillStyle = '#181A17';
            ctx.fillRect(bx + 2 + freshW, by - bh / 2 + 2, rw, bh - 4);
            ctx.strokeStyle = 'rgba(217,214,202,0.16)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let hx = freshW - 140; hx < fillW + 140; hx += 26) {
              ctx.moveTo(bx + 2 + Math.max(freshW, hx), by - bh / 2 + 2);
              ctx.lineTo(bx + 2 + Math.max(freshW, hx - 90), by + bh / 2 - 2);
            }
            ctx.stroke();
          }
          ctx.restore();

          // Sharp ivory center split blade
          if (kSplit > 0.02) {
            ctx.fillStyle = IVORY;
            ctx.fillRect(-2.5, by - bh / 2 - 14 * kSplit, 5, bh + 28 * kSplit);
          }

          setFont(ctx, MN(18), 3.5);
          if (kSplit < 0.3) {
            ctx.fillStyle = IVORY; ctx.textAlign = 'center';
            ctx.fillText('100% AIR LAUT MASUK', 0, by + 6);
          } else {
            ctx.globalAlpha = clamp((kSplit - 0.25) / 0.5);
            // Crisp dark ink on solid matte lime!
            ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
            ctx.fillText('50% AIR TAWAR BERSIH', -bw * 0.25, by + 6);
            ctx.fillStyle = IVORY;
            ctx.fillText('50% SISA GARAM (BRINE)', bw * 0.25, by + 6);
          }
          ctx.restore();
        }

        // Giant stepped hero percentage 100% -> 50% (monumental documentary scale!)
        const pct = t < A.separuh - 0.45
          ? 100
          : Math.round(countTo(100, 50, t, A.separuh - 0.45, 0.65));
        const kHero = E.outQuint(inv(A.doe + 1.4, A.doe + 1.9, t));
        if (kHero > 0) {
          ctx.save();
          ctx.globalAlpha = kHero;
          ctx.shadowColor = 'rgba(0,0,0,0.70)';
          ctx.shadowBlur = 32;
          ctx.shadowOffsetY = 12;
          setFont(ctx, DSP(236), 2);
          ctx.fillStyle = kSplit > 0.5 ? LIME : IVORY;
          ctx.textAlign = 'center';
          ctx.fillText(`${pct}%`, 0, 248);
          ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
          setFont(ctx, MN(19), 5);
          ctx.fillStyle = SALT;
          ctx.fillText('TINGKAT PEMULIHAN (RECOVERY RATE)', 0, 302);
          ctx.restore();
        }

        srcTag(ctx, 'Sumber: energy.gov, osti.gov (diolah)', -820, 425, t, A.doe + 0.35);
      },
    },

    // S3 (16.80..21.05s): Animated 2-Liter Input -> 1 Liter Fresh Water + 1 Liter BRINE
    {
      at: A.dua_liter - 0.15, via: 'push', dur: 0.65, name: '2 LITER → 1+1', yaw: [2.2, -1.6], dist: [1480, 1390], pitch: 4,
      draw(ctx, t) {
        studioSpot(ctx, 0, -20, 760, 0.06);
        drawCrystals(ctx, t, 0.12);
        txt(ctx, 'KONVERSI VOLUME NYATA  ·  PEMULIHAN 50%', 0, -352, t, A.dua_liter + 0.05, MN(19), { align: 'center', ls: 4, col: SALT });

        const kIn = E.outQuint(inv(A.dua_liter - 0.05, A.dua_liter + 0.40, t));
        const drainU = inv(A.dua_liter + 0.65, A.satu_tawar + 1.65, t);
        const fillFresh = E.outCubic(inv(A.satu_tawar - 0.35, A.satu_tawar + 1.05, t));
        const fillBrine = E.outCubic(inv(A.satu_tawar + 0.10, A.satu_sisa - 0.10, t));

        // Architectural Y-manifold conduit (matte slate housing + clean ivory/salt flow lines — zero neon wire!)
        if (kIn > 0) {
          ctx.save();
          ctx.globalAlpha = kIn;
          ctx.strokeStyle = 'rgba(217,214,202,0.26)';
          ctx.lineWidth = 16;
          ctx.lineJoin = 'miter';
          ctx.beginPath();
          ctx.moveTo(0, -118); ctx.lineTo(0, -52);
          ctx.lineTo(-375, -52); ctx.lineTo(-375, 36);
          ctx.moveTo(0, -52);
          ctx.lineTo(375, -52); ctx.lineTo(375, 36);
          ctx.stroke();

          // Clean calibrated fluid flow lines down both branches
          if (drainU > 0.02) {
            ctx.strokeStyle = IVORY;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(0, -116); ctx.lineTo(0, -52);
            ctx.lineTo(lerp(0, -375, clamp(drainU * 2.2)), -52);
            ctx.stroke();

            ctx.strokeStyle = SALT;
            ctx.beginPath();
            ctx.moveTo(0, -52);
            ctx.lineTo(lerp(0, 375, clamp((drainU - 0.15) * 2.2)), -52);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Top 2L intake vessel
        sightTank(ctx, 0, -196, 300, 144, lerp(0.90, 0.14, drainU), {
          k: kIn, top: 'AIR LAUT MASUK (35.000 PPM)', val: '2 LITER', valSize: 78, valY: 24,
        });

        // Left 1L freshwater vessel (ZERO neon green border — clean matte housing + solid matte lime editorial strip!)
        sightTank(ctx, -375, 156, 280, 236, fillFresh, {
          k: kIn, fresh: true, border: 'rgba(241,239,230,0.38)',
          val: '1 LITER', valSize: 88, valY: 22, valCol: IVORY, sub: 'AIR TAWAR BERSIH · 50%', subSolid: true,
        });

        // Right 1L brine vessel
        sightTank(ctx, 375, 156, 280, 236, fillBrine, {
          k: kIn, brine: true, border: 'rgba(217,214,202,0.34)',
          val: '1 LITER', valSize: 88, valY: 22, valCol: SALT, sub: 'AIR GARAM BRINE · 50%',
        });

        srcTag(ctx, 'Sumber: energy.gov, osti.gov (diolah)', -820, 425, t, A.dua_liter + 0.30);
      },
    },

    // S4 (21.05..26.68s): Grafik 3/3 salinitas-swro-brine.png + 35.000 -> 70.000 ppm (Berlipat 2x!)
    {
      at: A.satu_sisa - 0.10, via: 'whip', dur: 0.68, name: '70.000 PPM', yaw: [-1.8, 1.4], dist: [1500, 1410], pitch: 4,
      draw(ctx, t) {
        studioSpot(ctx, 560, 40, 560, 0.085);
        drawCrystals(ctx, t, 0.16);
        if (IM.grafik) {
          evid(ctx, IM.grafik, -235, -15, 1110, t, A.satu_sisa, {
            dark: true, rot: -0.5, tab: 'GRAFIK 3/3 · SALINITAS SWRO',
            hl: [[0.70, 0.28, 0.085, 0.57, A.dua_kali - 0.15]],
          });
        }

        // Right numeric comparison column (well clear of card right edge at +320)
        const rx = 590;
        txt(ctx, 'AIR LAUT MASUK', rx, -235, t, A.satu_sisa + 0.2, MN(17), { align: 'center', ls: 2.5, col: SALT });
        txt(ctx, '35.000 PPM', rx, -158, t, A.satu_sisa + 0.3, DSP(78), { align: 'center', col: 'rgba(217,214,202,0.82)' });

        // Crisp matte ivory progression arrow (so BERLIPAT 2x lime stamp is the singular focal punch)
        const kArr = E.outQuint(inv(A.satu_sisa + 0.8, A.satu_sisa + 1.3, t));
        if (kArr > 0) {
          ctx.save();
          ctx.strokeStyle = 'rgba(241,239,230,0.68)'; ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(rx, -124); ctx.lineTo(rx, lerp(-124, -44, kArr));
          ctx.moveTo(rx - 13, lerp(-124, -57, kArr));
          ctx.lineTo(rx, lerp(-124, -44, kArr));
          ctx.lineTo(rx + 13, lerp(-124, -57, kArr));
          ctx.stroke();
          ctx.restore();
        }

        txt(ctx, 'GARAM SUPERPEKAT (BRINE)', rx, 10, t, A.superpekat - 0.35, MN(17), { align: 'center', ls: 2.5, col: SALT });
        const ppmRaw = countTo(35000, 70000, t, A.superpekat - 0.2, 1.0);
        const ppmStep = t >= A.superpekat + 0.8 ? 70000 : Math.round(ppmRaw / 1000) * 1000;
        const kPpm = E.outQuint(inv(A.superpekat - 0.3, A.superpekat + 0.1, t));
        if (kPpm > 0) {
          ctx.save();
          ctx.globalAlpha = kPpm;
          ctx.shadowColor = 'rgba(0,0,0,0.72)';
          ctx.shadowBlur = 28;
          ctx.shadowOffsetY = 10;
          setFont(ctx, DSP(126), 1);
          ctx.fillStyle = IVORY;
          ctx.textAlign = 'center';
          ctx.fillText(`${fmt(ppmStep)} PPM`, rx, 122);
          ctx.restore();
        }

        // BERLIPAT 2x solid matte editorial stamp (sharp 2px micro-radius, zero border!)
        const sp2 = spring(t - A.dua_kali, 0.50, 0.30);
        if (sp2 > 0) {
          ctx.save();
          ctx.translate(rx, 214);
          ctx.scale(sp2, sp2);
          ctx.fillStyle = LIME;
          ctx.beginPath(); ctx.roundRect(-170, -42, 340, 84, 2); ctx.fill();
          setFont(ctx, DSP(64), 3);
          ctx.fillStyle = '#11120E';
          ctx.textAlign = 'center';
          ctx.fillText('BERLIPAT 2×', 0, 22);
          ctx.restore();
        }

        srcTag(ctx, 'Sumber: energy.gov, osti.gov (diolah)', -820, 425, t, A.satu_sisa + 0.15);
      },
    },

    // S5A (26.68..34.55s): Full-bleed ocean_waves + Coastal Brine Hazard & Marine Ecology
    {
      at: A.brine - 0.15, via: 'rise', dur: 0.72, name: 'BRINE', yaw: [2.0, -1.4], dist: [1500, 1400], pitch: 5,
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 5) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBg(ctx, t) });
      },
      draw(ctx, t) {
        slab(ctx, 'ISTILAH TEKNIS: LIMBAH GARAM PEKAT', -760, -338, t, A.brine + 0.10);
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.78)';
        ctx.shadowBlur = 32;
        ctx.shadowOffsetY = 10;
        fall(ctx, 'BRINE', -760, -124, t, A.brine + 0.25, DSP(226), { col: IVORY, ls: 2 });
        ctx.restore();

        // Coastal outfall discharge pipe + sinking dense crystalline brine plume (batched in 1 path!)
        ctx.save();
        // Bathymetric coastal seabed silhouette below line
        ctx.fillStyle = 'rgba(7,9,10,0.62)';
        ctx.beginPath();
        ctx.moveTo(-820, 260); ctx.lineTo(-100, 282); ctx.lineTo(800, 294);
        ctx.lineTo(800, 440); ctx.lineTo(-820, 440); ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(217,214,202,0.34)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-820, 260); ctx.lineTo(-100, 282); ctx.lineTo(800, 294);
        ctx.stroke();

        // Industrial brushed-steel coastal discharge pipe + flange collar
        const pg = ctx.createLinearGradient(0, -36, 0, 24);
        pg.addColorStop(0, '#2A343C');
        pg.addColorStop(0.45, '#171E24');
        pg.addColorStop(1, '#0E1216');
        ctx.fillStyle = pg;
        ctx.fillRect(-790, -36, 244, 60);
        ctx.strokeStyle = 'rgba(217,214,202,0.38)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-790, -36, 244, 60);
        // Outlet flange ring
        ctx.fillStyle = '#333F48';
        ctx.fillRect(-556, -42, 14, 72);
        ctx.strokeRect(-556, -42, 14, 72);
        // Subtle technical stencil etched on pipe
        setFont(ctx, MN(13), 2); ctx.fillStyle = 'rgba(241,239,230,0.44)'; ctx.textAlign = 'left';
        ctx.fillText('OUTFLOW · 70.000 PPM', -768, -1);

        // Heavy brine crystals sinking onto seabed
        ctx.fillStyle = 'rgba(217,214,202,0.78)';
        ctx.beginPath();
        for (const p of BRINE_PLUME) {
          const u = (p.phase + t * p.spd) % 1;
          const px = lerp(-540, -170, u) + p.spread * (18 + u * 90);
          const py = lerp(-8, 268, E.inCubic(u)) + Math.sin(t * 4 + p.jit) * 4;
          ctx.moveTo(px + p.r, py);
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();

        // Coastal prohibition documentary plate (ZERO neon green outline/text! Left-aligned to Swiss grid at -760)
        pillBadge(ctx, 'TIDAK BOLEH DIBUANG SEMBARANGAN DI PANTAI', -760, 356, t, A.pantai, {
          align: 'left', variant: 'plate', icon: '✕', size: 19, ls: 2.2,
        });

        // Marine life (fish silhouettes in 1 batched path) + high-contrast "kehidupan laut bisa TERGANGGU"
        const kFish = E.outQuint(inv(A.ikan - 0.15, A.ikan + 0.35, t));
        if (kFish > 0) {
          ctx.save();
          ctx.globalAlpha = kFish;
          // Seamless elliptical dark scrim behind serif statement (full-radius bounds -> ZERO hard clip edge!)
          ctx.save();
          ctx.translate(260, 192);
          ctx.scale(2.1, 0.72);
          const bgF = ctx.createRadialGradient(0, 0, 20, 0, 0, 220);
          bgF.addColorStop(0, 'rgba(6,8,9,0.62)');
          bgF.addColorStop(0.65, 'rgba(6,8,9,0.24)');
          bgF.addColorStop(1, 'rgba(6,8,9,0)');
          ctx.fillStyle = bgF;
          ctx.fillRect(-230, -230, 460, 460);
          ctx.restore();

          ctx.fillStyle = 'rgba(241,239,230,0.90)';
          ctx.beginPath();
          for (const [fx0, fy0, sc] of FISH_POS) {
            const fx = fx0 + Math.sin(t * 2.2 + fy0) * 18;
            const fy = fy0 + Math.cos(t * 1.9 + fx0) * 9;
            const w = 38 * sc, h = 16 * sc;
            ctx.moveTo(fx - w, fy);
            ctx.quadraticCurveTo(fx, fy - h, fx + w * 0.65, fy);
            ctx.quadraticCurveTo(fx, fy + h, fx - w, fy);
            ctx.lineTo(fx - w * 1.35, fy - h * 0.65);
            ctx.lineTo(fx - w * 1.35, fy + h * 0.65);
            ctx.closePath();
          }
          ctx.fill();
          ctx.restore();

          markLine(ctx, 'kehidupan laut bisa ', 'TERGANGGU', '', 260, 205, t, A.ikan + 0.25, A.terganggu - 0.25, SRF(52), { col: IVORY });
        }
      },
    },

    // S5B (34.55..39.83s): Dilution & Offshore Diffuser Rule over full-bleed ocean_waves
    {
      at: A.encer - 0.24, via: 'truck', dur: 0.70, name: 'DIENCERKAN', yaw: [-2.0, 1.4], dist: [1480, 1380], pitch: 4,
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 6) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBg(ctx, t) });
      },
      draw(ctx, t) {
        // Matte dark documentary header plate (zero neon outline, zero green text!)
        pillBadge(ctx, 'ATURAN PENGELOLAAN LIMBAH BRINE', 0, -295, t, A.encer + 0.05, {
          variant: 'plate', size: 19, ls: 3,
        });

        const stages = [
          { sx: -530, t0: A.encer + 0.25, hdr: '01 // TAHAP AWAL', title: 'DIENCERKAN', sub: 'TURUNKAN SALINITAS', featured: false },
          { sx: 0, t0: A.aturan - 0.55, hdr: '02 // WAJIB & DIAWASI', title: 'SESUAI ATURAN', sub: 'DIOLAH & DIAWASI KETAT', featured: true },
          { sx: 530, t0: A.lepas - 0.90, hdr: '03 // PEMBUANGAN', title: 'LAUT LEPAS', sub: 'SEBAR LEWAT DIFFUSER', featured: false },
        ];

        // Connecting main architectural rail + directional chevrons
        const kPipe = E.outQuint(inv(A.encer + 0.35, A.lepas - 0.35, t));
        ctx.save();
        ctx.strokeStyle = 'rgba(217,214,202,0.28)';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(-530, -20); ctx.lineTo(lerp(-530, 530, kPipe), -20); ctx.stroke();
        if (kPipe > 0.35) {
          ctx.strokeStyle = 'rgba(241,239,230,0.62)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (const cx of [-265, 265]) {
            if (lerp(-530, 530, kPipe) < cx) continue;
            ctx.moveTo(cx - 8, -30); ctx.lineTo(cx + 4, -20); ctx.lineTo(cx - 8, -10);
          }
          ctx.stroke();
        }
        ctx.restore();

        // 3 sharp matte editorial documentary plates (ZERO neon green borders!)
        for (const st of stages) {
          const k = E.outQuint(inv(st.t0, st.t0 + 0.42, t));
          if (k <= 0) continue;
          const cw = 436, ch = 186, hdrH = 42;
          ctx.save();
          ctx.globalAlpha = k;
          ctx.translate(st.sx, -20 + (1 - k) * 26);

          // Matte dark plate body + crisp artifact-free shadow
          matteShadow(ctx, -cw / 2, -ch / 2, cw, ch, 3);
          ctx.fillStyle = 'rgba(11,13,15,0.95)';
          ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 3); ctx.fill();

          // Clean neutral matte hairline border on ALL cards
          ctx.strokeStyle = 'rgba(241,239,230,0.18)';
          ctx.lineWidth = 1.25;
          ctx.stroke();

          // Top editorial header band (solid matte LIME on active stage 02, matte neutral slate on 01/03)
          ctx.fillStyle = st.featured ? LIME : 'rgba(241,239,230,0.10)';
          ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, hdrH, [3, 3, 0, 0]); ctx.fill();

          setFont(ctx, MN(14), 3);
          ctx.fillStyle = st.featured ? '#11120E' : SALT;
          ctx.textAlign = 'center';
          ctx.fillText(st.hdr, 0, -ch / 2 + 27);

          // Authoritative display title in blazing ivory + crisp mono subtext
          setFont(ctx, DSP(56), 1.5);
          ctx.fillStyle = IVORY;
          ctx.fillText(st.title, 0, 20);

          setFont(ctx, MN(14), 2.5);
          ctx.fillStyle = SALT;
          ctx.fillText(st.sub, 0, 62);
          ctx.restore();
        }

        // Fine dispersed mist particles beneath Stage 3 (batched 1 path)
        const kMist = E.outCubic(inv(A.lepas - 0.55, A.lepas + 0.10, t));
        if (kMist > 0) {
          ctx.save();
          ctx.fillStyle = `rgba(217,214,202,${0.46 * kMist})`;
          ctx.beginPath();
          for (let i = 0; i < 42; i++) {
            const u = ((t * 0.45 + i / 42) % 1);
            const mx = 530 + (rnd(i * 19) - 0.5) * 320 * u;
            const my = 80 + u * 110;
            ctx.moveTo(mx + 3, my);
            ctx.arc(mx, my, 3, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.restore();
        }

        markLine(ctx, 'sebelum dibuang ke ', 'LAUT LEPAS', '', 0, 265, t, A.aturan + 0.25, A.lepas - 0.45, SRF(76), { col: IVORY });
      },
    },

    // S6A (39.83..51.61s): 2,70 kWhe/m3 Pump Energy Meter + 1 m3 = 1.000 L = 1 Tandon Rumah
    {
      at: A.pompa - 0.12, via: 'whip', dur: 0.70, name: '2,70 kWhe/m³', yaw: [2.2, -1.5], dist: [1490, 1390], pitch: 5,
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 7) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBg(ctx, t) });
      },
      draw(ctx, t) {
        studioSpot(ctx, -415, -10, 620, 0.085);
        drawCrystals(ctx, t, 0.12);

        // LEFT HALF (-415): Animated Precision Energy Meter for 2,70 kWhe/m3
        const gx = -415, gy = -10;
        txt(ctx, 'POMPA LISTRIK TEKANAN TINGGI', gx, -295, t, A.pompa + 0.15, MN(19), { align: 'center', ls: 3, col: SALT });

        const kMeter = E.outQuint(inv(A.pompa + 0.2, A.pompa + 0.75, t));
        const meterTarget = E.outCubic(inv(A.listrik - 0.2, A.kwh + 0.75, t));
        const kwhVal = t >= A.kwh + 0.75 ? 2.70 : Math.round(lerp(0, 2.70, meterTarget) * 20) / 20;
        const frac = lerp(0, 2.70 / 4.0, meterTarget);

        if (kMeter > 0) {
          ctx.save();
          ctx.globalAlpha = kMeter;
          ctx.translate(gx, gy);

          // Semicircle precision gauge background arc (crisp architectural butt caps)
          const R = 236;
          ctx.strokeStyle = 'rgba(217,214,202,0.18)';
          ctx.lineWidth = 20;
          ctx.lineCap = 'butt';
          ctx.beginPath(); ctx.arc(0, 44, R, Math.PI, Math.PI * 2); ctx.stroke();

          // Active solid lime power sweep arc to 2.70 / 4.0
          if (frac > 0.01) {
            ctx.strokeStyle = LIME;
            ctx.beginPath(); ctx.arc(0, 44, R, Math.PI, Math.PI + Math.PI * frac); ctx.stroke();
          }

          // Batched gauge graduation ticks
          ctx.strokeStyle = 'rgba(241,239,230,0.44)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 0; i <= 8; i++) {
            const ang = Math.PI + (Math.PI * i) / 8;
            const len = i % 2 === 0 ? 18 : 10;
            ctx.moveTo(Math.cos(ang) * (R - 22), 44 + Math.sin(ang) * (R - 22));
            ctx.lineTo(Math.cos(ang) * (R - 22 - len), 44 + Math.sin(ang) * (R - 22 - len));
          }
          ctx.stroke();

          // Monumental high-contrast Swiss readout
          ctx.shadowColor = 'rgba(0,0,0,0.72)';
          ctx.shadowBlur = 28;
          ctx.shadowOffsetY = 10;
          setFont(ctx, DSP(204), 1);
          ctx.fillStyle = IVORY;
          ctx.textAlign = 'center';
          ctx.fillText(fmt(kwhVal, 2), 0, 26);
          ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

          setFont(ctx, MN(22), 5);
          ctx.fillStyle = SALT;
          ctx.fillText('kWhe / m³ AIR', 0, 82);

          // Crisp industrial load blocks below gauge
          const pulse = 0.82 + 0.18 * Math.sin(t * 7);
          for (let i = 0; i < 10; i++) {
            const active = i / 10 < frac;
            ctx.fillStyle = active ? (i >= 6 ? `rgba(200,245,60,${pulse})` : LIME) : 'rgba(217,214,202,0.14)';
            ctx.fillRect(-168 + i * 34, 134, 26, 36);
          }
          ctx.restore();
        }

        // RIGHT HALF (+415): 1 m3 = 1.000 L = 1 Tandon Rumah comparison
        const rx = 415;
        const kVol = E.outQuint(inv(A.tandon - 0.2, A.tandon + 0.35, t));
        if (kVol > 0) {
          ctx.save();
          ctx.globalAlpha = kVol;
          // Clean editorial column rule separating Energy Meter and Volume Reference
          ctx.strokeStyle = 'rgba(241,239,230,0.14)';
          ctx.lineWidth = 1.25;
          ctx.beginPath(); ctx.moveTo(-12, -265); ctx.lineTo(-12, 235); ctx.stroke();

          txt(ctx, '1 m³  =  1.000 LITER AIR', rx, -295, t, A.tandon + 0.1, MN(20), { align: 'center', ls: 3, col: IVORY });

          // Isometric 1 m3 cube on left (rx - 190)
          const cx = rx - 190, cy = -24, S = 80;
          const kFillCube = E.outCubic(inv(A.tandon + 0.3, A.tandon + 1.3, t));
          ctx.save();
          ctx.translate(cx, cy);
          const fh = S * 1.15 * kFillCube;
          ctx.fillStyle = 'rgba(84,154,190,0.48)';
          ctx.fillRect(-S * 0.78, S * 0.65 - fh, S * 1.56, fh);
          // Isometric wireframe
          ctx.strokeStyle = SALT; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(0, -S * 1.05); ctx.lineTo(S * 0.86, -S * 0.55); ctx.lineTo(S * 0.86, S * 0.45);
          ctx.lineTo(0, S * 0.95); ctx.lineTo(-S * 0.86, S * 0.45); ctx.lineTo(-S * 0.86, -S * 0.55); ctx.closePath();
          ctx.moveTo(0, -S * 0.05); ctx.lineTo(0, S * 0.95);
          ctx.moveTo(0, -S * 0.05); ctx.lineTo(S * 0.86, -S * 0.55);
          ctx.moveTo(0, -S * 0.05); ctx.lineTo(-S * 0.86, -S * 0.55);
          ctx.stroke();
          setFont(ctx, MN(17), 5); ctx.fillStyle = SALT; ctx.textAlign = 'center';
          ctx.fillText('1 × 1 × 1 m', 0, 128);
          ctx.restore();

          // Equals sign
          setFont(ctx, DSP(88), 1); ctx.fillStyle = SALT; ctx.textAlign = 'center';
          ctx.fillText('≈', rx - 15, -6);

          // Indonesian Household Water Tank (Tandon 1.000 L) on right (rx + 175) — ZERO neon green outline!
          const tx0 = rx + 175, ty0 = -20;
          const kTank = E.outCubic(inv(A.rumah - 0.4, A.rumah + 0.7, t));
          ctx.save();
          ctx.translate(tx0, ty0);
          // Tank body silhouette (clean matte titanium-slate outline)
          ctx.fillStyle = '#131B22';
          ctx.strokeStyle = 'rgba(217,214,202,0.58)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(-86, -85, 172, 185, 22);
          ctx.fill(); ctx.stroke();
          // Tank cap
          ctx.fillRect(-34, -104, 68, 20);
          ctx.strokeRect(-34, -104, 68, 20);
          // Water level inside tandon (clean desalinated water + crisp ivory meniscus)
          if (kTank > 0.02) {
            const th = 165 * kTank;
            ctx.save();
            ctx.beginPath(); ctx.roundRect(-80, -79, 160, 173, 18); ctx.clip();
            const twg = ctx.createLinearGradient(0, 94 - th, 0, 94);
            twg.addColorStop(0, 'rgba(116,184,214,0.64)');
            twg.addColorStop(1, 'rgba(32,76,102,0.90)');
            ctx.fillStyle = twg;
            ctx.fillRect(-80, 94 - th, 160, th);
            ctx.fillStyle = IVORY;
            ctx.fillRect(-80, 94 - th, 160, 3);
            ctx.restore();
          }
          // Horizontal structural ribs
          ctx.strokeStyle = 'rgba(241,239,230,0.28)';
          ctx.lineWidth = 1.75;
          ctx.beginPath();
          for (const ry of [-32, 16, 62]) { ctx.moveTo(-84, ry); ctx.lineTo(84, ry); }
          ctx.stroke();
          setFont(ctx, DSP(52), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('1.000 L', 0, 16);
          ctx.restore();

          // Clean solid matte editorial strip centered beneath comparison
          pillBadge(ctx, '1 TANDON DI RUMAH KITA', rx, 200, t, A.rumah - 0.2, {
            accent: true, size: 19, ls: 3,
          });
          ctx.restore();
        }

        srcTag(ctx, 'Sumber: energy.gov, osti.gov (diolah)', -820, 425, t, A.kwh - 0.2);
      },
    },

    // S6B (51.61..57.04s): Comparison SWRO (2,70 kWhe/m3) vs Air Waduk Biasa (zero 🟡 rupiah!)
    {
      at: A.mahal - 0.10, via: 'push', dur: 0.65, name: 'ONGKOS LISTRIK', yaw: [-2.0, 1.4], dist: [1480, 1380], pitch: 4,
      draw(ctx, t) {
        studioSpot(ctx, -320, 40, 620, 0.07);
        drawCrystals(ctx, t, 0.12);
        markLine(ctx, 'jauh lebih ', 'MAHAL', '  & boros listrik', 0, -290, t, A.mahal + 0.1, A.mahal_kata - 0.15, SRF(82), { col: IVORY });

        const yBase = 220;
        const kSwro = E.outQuint(inv(A.mahal + 0.35, A.mahal_kata + 0.5, t));
        const kWaduk = E.outQuint(inv(A.waduk - 0.5, A.waduk + 0.4, t));

        ctx.save();
        // Subtle editorial scale gridlines above baseline
        ctx.strokeStyle = 'rgba(241,239,230,0.08)';
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        for (let i = 1; i <= 4; i++) {
          const gy = yBase - i * 82;
          ctx.moveTo(-640, gy); ctx.lineTo(640, gy);
        }
        ctx.stroke();

        // Crisp architectural baseline
        ctx.strokeStyle = 'rgba(241,239,230,0.42)';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(-640, yBase); ctx.lineTo(640, yBase); ctx.stroke();

        // Left column: SWRO (2,70 kWhe/m3) — matte printed lime column + monumental ivory readout
        const h1 = 316 * kSwro;
        if (h1 > 2) {
          const bg1 = ctx.createLinearGradient(0, yBase - h1, 0, yBase);
          bg1.addColorStop(0, LIME);
          bg1.addColorStop(1, '#A4CE2B');
          ctx.fillStyle = bg1;
          ctx.fillRect(-435, yBase - h1, 230, h1);
          // Crisp dark ink etched inside column foot
          if (h1 > 80) {
            setFont(ctx, MN(14), 3); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
            ctx.fillText('SWRO · 50% RECOVERY', -320, yBase - 22);
          }
          ctx.shadowColor = 'rgba(0,0,0,0.68)';
          ctx.shadowBlur = 24;
          ctx.shadowOffsetY = 8;
          setFont(ctx, DSP(86), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('2,70 kWhe/m³', -320, yBase - h1 - 24);
          ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
        }
        setFont(ctx, MN(19), 4); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
        ctx.fillText('AIR OLAHAN LAUT (SWRO)', -320, yBase + 44);
        setFont(ctx, MN(14), 3); ctx.fillStyle = SALT;
        ctx.fillText('POMPA TEKANAN TINGGI', -320, yBase + 74);

        // Right column: Air Waduk Biasa — matte stone column
        const h2 = 58 * kWaduk;
        if (h2 > 2) {
          ctx.fillStyle = SALT;
          ctx.fillRect(205, yBase - h2, 230, h2);
          setFont(ctx, DSP(56), 1); ctx.fillStyle = SALT; ctx.textAlign = 'center';
          ctx.fillText('LISTRIK RENDAH', 320, yBase - h2 - 22);
        }
        setFont(ctx, MN(19), 4); ctx.fillStyle = SALT; ctx.textAlign = 'center';
        ctx.fillText('AIR WADUK BIASA', 320, yBase + 44);
        setFont(ctx, MN(14), 3); ctx.fillStyle = 'rgba(217,214,202,0.72)';
        ctx.fillText('ALIRAN GRAVITASI & SARINGAN BIASA', 320, yBase + 74);
        ctx.restore();

        srcTag(ctx, 'Sumber: energy.gov, osti.gov (diolah)', -820, 425, t, A.mahal + 0.2);
      },
    },

    // S7A (57.04..61.53s): Full-bleed keran_tetes + Without Mandatory Rules, Companies Pick Cheap Freshwater
    {
      at: A.tanpa - 0.15, via: 'whip', dur: 0.68, name: 'TANPA ATURAN?', yaw: [2.0, -1.2], dist: [1480, 1380], pitch: 4,
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 9) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBg(ctx, t) });
      },
      draw(ctx, t) {
        // Matte dark documentary header plate (zero rounded outline pill!)
        pillBadge(ctx, 'TANPA ATURAN WAJIB PEMERINTAH', 0, -280, t, A.tanpa + 0.05, {
          variant: 'plate', size: 20, ls: 3,
        });

        const kChoose = E.snap(inv(A.pilih - 0.25, A.pilih + 0.25, t));

        // Left card: Expensive SWRO (sharp matte editorial plate, solid backing stays crisp while content dims)
        const kL = E.outQuint(inv(A.tanpa + 0.35, A.tanpa + 0.85, t));
        if (kL > 0) {
          const cw = 520, ch = 320, hdrH = 50;
          const dimText = lerp(1, 0.38, kChoose);
          ctx.save();
          ctx.globalAlpha = kL;
          ctx.translate(-345, 30);

          matteShadow(ctx, -cw / 2, -ch / 2, cw, ch, 3);
          ctx.fillStyle = `rgba(11,13,15,${lerp(0.92, 0.78, kChoose)})`;
          ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 3); ctx.fill();

          ctx.strokeStyle = `rgba(241,239,230,${lerp(0.18, 0.10, kChoose)})`;
          ctx.lineWidth = 1.25;
          ctx.stroke();

          ctx.globalAlpha = kL * dimText;
          // Matte stone top header band
          ctx.fillStyle = 'rgba(217,214,202,0.12)';
          ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, hdrH, [3, 3, 0, 0]); ctx.fill();
          setFont(ctx, MN(16), 3.5); ctx.fillStyle = SALT; ctx.textAlign = 'center';
          ctx.fillText('OPSI A  ·  AIR LAUT', 0, -ch / 2 + 31);

          setFont(ctx, DSP(88), 1.5); ctx.fillStyle = IVORY;
          ctx.fillText('SWRO MANDIRI', 0, 24);

          ctx.strokeStyle = 'rgba(241,239,230,0.14)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(-180, 62); ctx.lineTo(180, 62); ctx.stroke();

          setFont(ctx, MN(16), 3); ctx.fillStyle = SALT;
          ctx.fillText('BOROS LISTRIK  ·  BIAYA TINGGI', 0, 108);
          ctx.restore();
        }

        // Right card: Cheap Freshwater — ZERO neon green outline! Crisp solid matte top header band + neutral hairline!
        const kR = E.outQuint(inv(A.tanpa + 0.55, A.tanpa + 1.05, t));
        if (kR > 0) {
          const cw = 520, ch = 320, hdrH = 52;
          const chosen = kChoose > 0.35;
          ctx.save();
          ctx.globalAlpha = kR;
          ctx.translate(345, 30);
          ctx.scale(lerp(1, 1.03, kChoose), lerp(1, 1.03, kChoose));

          matteShadow(ctx, -cw / 2, -ch / 2, cw, ch, 3);
          ctx.fillStyle = 'rgba(11,13,12,0.96)';
          ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 3); ctx.fill();

          // Clean neutral matte hairline border (NEVER neon green outline!)
          ctx.strokeStyle = 'rgba(241,239,230,0.22)';
          ctx.lineWidth = 1.25;
          ctx.stroke();

          // Crisp solid matte editorial top header band (ivory -> solid lime on choice, dark ink text!)
          ctx.fillStyle = chosen ? LIME : IVORY;
          ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, hdrH, [3, 3, 0, 0]); ctx.fill();
          setFont(ctx, MN(16), 3.5); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
          ctx.fillText('OPSI B  ·  AIR WADUK', 0, -ch / 2 + 32);

          // Monumental crisp ivory headline (ZERO green text inside card!)
          setFont(ctx, DSP(90), 1.5); ctx.fillStyle = IVORY;
          ctx.fillText('AIR TAWAR MURAH', 0, 24);

          // Crisp solid matte verdict strip at bottom
          if (chosen) {
            const vw = 310, vh = 40;
            ctx.fillStyle = LIME;
            ctx.beginPath(); ctx.roundRect(-vw / 2, 82, vw, vh, 2); ctx.fill();
            setFont(ctx, MN(16), 3); ctx.fillStyle = '#11120E';
            ctx.fillText('✓  DIPILIH PERUSAHAAN', 0, 108);
          } else {
            ctx.strokeStyle = 'rgba(241,239,230,0.14)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(-180, 62); ctx.lineTo(180, 62); ctx.stroke();
            setFont(ctx, MN(16), 3); ctx.fillStyle = SALT;
            ctx.fillText('LEBIH MURAH & PRAKTIS', 0, 108);
          }
          ctx.restore();
        }
      },
    },

    // S7B (61.53..68.00s): BP Batam Mandatory Enforcement + Kompas Evidence + "agar air warga tidak terusik"
    {
      at: A.bpbatam - 0.10, via: 'push', dur: 0.65, name: 'KETEGASAN BP BATAM', yaw: [-1.8, 0.8], dist: [1480, 1390], pitch: 3,
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 10) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBg(ctx, t) });
      },
      draw(ctx, t) {
        slab(ctx, 'ATURAN WAJIB · BP BATAM', -690, -320, t, A.bpbatam + 0.05, { lime: true });

        if (IM.kompas) {
          evid(ctx, IM.kompas, 0, -45, 1380, t, A.bpbatam + 0.08, {
            dark: true,
            crop: [0, 0.04, 1, 0.52],
            rot: 0.5,
            tab: 'KOMPAS.COM · 16 OKT 2026',
            hl: [
              [0.625, 0.24, 0.345, 0.23, A.bpbatam + 0.90],
              [0.025, 0.51, 0.205, 0.21, A.bpbatam + 1.35],
            ],
          });
        }

        markLine(ctx, 'agar air warga tidak ', 'TERUSIK', '', 0, 248, t, A.penentu - 0.25, A.terusik - 0.20, SRF(82), { col: IVORY });

        srcTag(ctx, 'Sumber: KOMPAS.com, 16 Okt 2026', -820, 425, t, A.bpbatam + 0.20);
      },
    },
  ];

  const scene = makeChapter({
    B, ST, load, gate: true, label: 'BAB 4 · HARGA TERSEMBUNYI',
    over: (o, t) => {
      if (t >= OCEAN_BG[0].t0 && t <= OCEAN_BG[0].t1) kreditLatar(o, W, H, OCEAN_BG, t, false);
      if (t >= KERAN_BG[0].t0 && t <= KERAN_BG[0].t1) kreditLatar(o, W, H, KERAN_BG, t, false);
    },
  });

  // Synchronize light/dark world theme cleanly before drawRow reads BG/INK/VIG
  const origDraw = scene.draw;
  scene.draw = (ctx, t) => {
    if (t < A.flip) theme(true, { bg: LIGHT_BG, bgrgb: '234,231,220', ink: DARK_INK, inkrgb: '21,22,15', vig: 0.14 });
    else theme(false, { bg: '#0B0C09', bgrgb: '11,12,9', ink: IVORY, inkrgb: '241,239,230', vig: 0.56 });
    return origDraw(ctx, t);
  };

  return scene;
}
