// Bab PUNCAK · "Jejak Fisik di Balik Layar Kita" (VO take 08, 36.48 s; END 37.4 + VOFF 0.35 + TAIL 0.90 = 38.65 s).
// Gaya dokumenter filmis: dark matte slate plates, neutral ivory hairlines, solid matte #C8F53C blocks (#11120E ink),
// zero neon borders, foto langit editorial cloud_sky_editorial.jpg meluruh ke rak server panas & footage nyata.
// Latar dokumenter full-bleed via layarFoto: server_room -> server_rack -> cooling_tower -> server_room.
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, IVORY, LIME, D2R, ivo, setFont,
  DSP, SRF, MN, timing, makeChapter, loadVid, loadImg,
  fall, markLine, srcTag, slab, txt, typeOn, gone, theme, rnd,
} from './kit.js';
import { layarFoto, kreditLatar, gelasWaduk } from './batam.js';

theme(false, { bg: '#0E1113', bgrgb: '14,17,19', vig: 0.32 });

const DARK_INK = '#11120E';
const SLATE_PLATE = 'rgba(11,15,19,0.88)';
const HAIRLINE = 'rgba(241,239,230,0.18)';

// Deterministic sky-peel fragments for the S2 cloudSky -> glowing hot server rack dissolve
const CLOUD_SHARDS = Array.from({ length: 34 }, (_, i) => ({
  x: (rnd(i * 11 + 3) - 0.5) * 420,
  yOff: (rnd(i * 17 + 5) - 0.5) * 44,
  w: 24 + rnd(i * 23 + 7) * 58,
  h: 6 + rnd(i * 29 + 9) * 14,
  dy: -40 - rnd(i * 31 + 11) * 95,
  dx: (rnd(i * 37 + 13) - 0.5) * 80,
}));

// Deterministic rising steam motes for cooling towers (S3 & S6)
const TOWER_STEAM = Array.from({ length: 32 }, (_, i) => ({
  x0: (rnd(i * 13 + 1) - 0.5) * 86,
  phase: rnd(i * 19 + 4),
  speed: 0.28 + rnd(i * 23 + 8) * 0.26,
  r: 10 + rnd(i * 29 + 12) * 18,
}));

// Solid matte editorial badge/stamp block (NEVER neon green stroke on dark!)
function drawSolidBadge(ctx, text, x, y, {
  align = 'center',
  size = 15,
  ls = 2,
  padX = 16,
  h = 32,
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

// Draw cover-fitted image inside an already-clipped rectangle (x, y, w, h)
function drawCover(ctx, im, x, y, w, h, { zoom = 1.04, ox = 0, oy = 0, fy = 0.55 } = {}) {
  if (!im) return;
  const s = Math.max(w / im.width, h / im.height) * zoom;
  const dw = im.width * s, dh = im.height * s;
  const dx = x + (w - dw) * 0.5 + ox;
  const dy = y + (h - dh) * fy + oy;
  ctx.drawImage(im, dx, dy, dw, dh);
}

// Pick current ping-pong frame of a loaded video clip
function vidFrame(V, t, t0 = 0) {
  if (!V || !V.n) return null;
  const per = 2 * (V.n - 1);
  const m = Math.floor(Math.max(0, t - t0) * V.fps) % per;
  return V.img[m < V.n ? m : per - m];
}

// Clean atmospheric sky editorial window (real cloud_sky_editorial.jpg, neutral ivory hairline, corner registration marks)
function drawSkyWindow(ctx, im, cx, cy, w, h, t, { a = 1, scrim = 0.42, fy = 0.62, r = 6 } = {}) {
  if (!im || a <= 0.01) return;
  const x = cx - w / 2, y = cy - h / 2;
  ctx.save();
  ctx.globalAlpha *= a;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.62)';
  ctx.shadowBlur = 44;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = '#0D1419';
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.clip();
  ctx.filter = 'saturate(1.04) contrast(1.12) brightness(1.00)';
  drawCover(ctx, im, x, y, w, h, { zoom: 1.08 + 0.02 * Math.sin(t * 0.45), ox: Math.sin(t * 0.35) * 10, fy });
  ctx.filter = 'none';

  // Photographic vignette & contrast scrim so crisp IVORY display typography reads cleanly over bright clouds
  const sg = ctx.createLinearGradient(0, y, 0, y + h);
  sg.addColorStop(0, `rgba(10,16,22,${scrim * 0.65})`);
  sg.addColorStop(0.45, `rgba(10,16,22,${scrim})`);
  sg.addColorStop(1, `rgba(8,12,16,${scrim * 1.45})`);
  ctx.fillStyle = sg;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  // Understated neutral ivory hairline frame + corner registration ticks
  ctx.strokeStyle = 'rgba(241,239,230,0.24)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(241,239,230,0.42)';
  ctx.lineWidth = 1.5;
  const m = 11;
  ctx.beginPath();
  ctx.moveTo(x + 8, y + 8 + m); ctx.lineTo(x + 8, y + 8); ctx.lineTo(x + 8 + m, y + 8);
  ctx.moveTo(x + w - 8 - m, y + 8); ctx.lineTo(x + w - 8, y + 8); ctx.lineTo(x + w - 8, y + 8 + m);
  ctx.moveTo(x + 8, y + h - 8 - m); ctx.lineTo(x + 8, y + h - 8); ctx.lineTo(x + 8 + m, y + h - 8);
  ctx.moveTo(x + w - 8 - m, y + h - 8); ctx.lineTo(x + w - 8, y + h - 8); ctx.lineTo(x + w - 8, y + h - 8 - m);
  ctx.stroke();

  ctx.restore();
}

function drawBoltIcon(ctx, x, y, s, col = DARK_INK) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(6, -24);
  ctx.lineTo(-15, 3);
  ctx.lineTo(1, 3);
  ctx.lineTo(-6, 24);
  ctx.lineTo(16, -3);
  ctx.lineTo(0, -3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawSolidDropIcon(ctx, x, y, s, col = DARK_INK) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.bezierCurveTo(17, -2, 20, 15, 0, 24);
  ctx.bezierCurveTo(-20, 15, -17, -2, 0, -24);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawSaltIcon(ctx, x, y, s, stroke = IVORY) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2.4;
  ctx.fillStyle = 'rgba(241,239,230,0.10)';
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const ang = (i * Math.PI) / 3 - Math.PI / 6;
    const px = Math.cos(ang) * 20, py = Math.sin(ang) * 20;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -20); ctx.lineTo(0, 0); ctx.lineTo(17, 10);
  ctx.moveTo(0, 0); ctx.lineTo(-17, 10);
  ctx.stroke();
  ctx.restore();
}

// Dramatic glowing hot dark server rack cutaway layered over live real server_rack documentary footage
function drawHotServerInterior(ctx, x, y, w, h, t, kHeat, rackIm) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 4);
  ctx.clip();

  // 1. Live real server_rack documentary footage inside the frame
  if (rackIm) {
    ctx.filter = 'saturate(0.62) contrast(1.34) brightness(0.76)';
    drawCover(ctx, rackIm, x, y, w, h, { zoom: 1.12, fy: 0.5 });
    ctx.filter = 'none';
  } else {
    ctx.fillStyle = '#0D1013';
    ctx.fillRect(x, y, w, h);
  }

  // Dark obsidian industrial scrim so foreground thermal rack blades & heat glow stand out dramatically
  ctx.fillStyle = 'rgba(9,11,13,0.46)';
  ctx.fillRect(x, y, w, h);

  // 2. Glowing crimson-amber thermal exhaust wash radiating from hot server core
  const cx = x + w / 2, cy = y + h / 2;
  const tg = ctx.createRadialGradient(cx, cy + 10, 18, cx, cy, w * 0.72);
  tg.addColorStop(0, `rgba(236,118,44,${0.40 * (0.35 + 0.65 * kHeat)})`);
  tg.addColorStop(0.55, `rgba(180,68,26,${0.18 * (0.35 + 0.65 * kHeat)})`);
  tg.addColorStop(1, 'rgba(9,11,13,0.58)');
  ctx.fillStyle = tg;
  ctx.fillRect(x, y, w, h);

  // 3. Sculptural dark machined server rack bay overlay (center column, clean clearance below top telemetry stamp)
  const rw = Math.round(w * 0.68), rh = Math.round(h * 0.72);
  const rx = cx - rw / 2, ry = cy - rh / 2 + 28;
  ctx.fillStyle = 'rgba(12,15,18,0.88)';
  ctx.strokeStyle = 'rgba(241,239,230,0.28)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.roundRect(rx, ry, rw, rh, 6);
  ctx.fill();
  ctx.stroke();

  const bays = 6;
  const bayGap = 9;
  const bayH = (rh - 28 - (bays - 1) * bayGap) / bays;
  for (let i = 0; i < bays; i++) {
    const by = ry + 14 + i * (bayH + bayGap);
    ctx.fillStyle = '#181D21';
    ctx.beginPath();
    ctx.roundRect(rx + 14, by, rw - 28, bayH, 4);
    ctx.fill();
    ctx.strokeStyle = i < 3 ? `rgba(236,124,48,${0.25 + 0.35 * kHeat})` : 'rgba(241,239,230,0.14)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Hot ventilation grilles
    for (let v = 0; v < 8; v++) {
      ctx.fillStyle = i < 3 && kHeat > 0.2 ? `rgba(236,124,48,${0.24 * kHeat + 0.10})` : 'rgba(241,239,230,0.14)';
      ctx.fillRect(rx + 114 + v * 22, by + 10, 11, bayH - 20);
    }

    // Telemetry indicator LEDs (warm thermal amber + crisp ivory)
    const pulse = 0.55 + 0.45 * Math.sin(t * 6.5 + i * 1.3);
    ctx.fillStyle = i < 3 ? `rgba(240,136,56,${pulse})` : `rgba(241,239,230,${pulse * 0.80})`;
    ctx.beginPath();
    ctx.arc(rx + 36, by + bayH / 2, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(241,239,230,0.52)';
    ctx.fillRect(rx + 54, by + bayH / 2 - 2.5, 42, 5);
  }

  // Subtle thermal convection shimmer lines rising above hot chassis
  if (kHeat > 0.04) {
    ctx.save();
    ctx.globalAlpha *= kHeat * 0.85;
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.4;
    for (let s = -1; s <= 1; s++) {
      const wx = cx + s * 68;
      ctx.strokeStyle = s === 0 ? 'rgba(240,140,62,0.78)' : 'rgba(241,239,230,0.44)';
      ctx.beginPath();
      for (let st = 0; st <= 14; st++) {
        const u = st / 14;
        const px = wx + Math.sin(u * Math.PI * 3 - t * 6.2 + s) * 8;
        const py = ry - 5 - u * 26;
        if (st === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // Crisp top-left thermal telemetry stamp inside bay
  setFont(ctx, MN(12, 700), 1.8);
  ctx.fillStyle = 'rgba(241,239,230,0.78)';
  ctx.textAlign = 'left';
  ctx.fillText('REALITA · RAK SERVER PANAS', x + 16, y + 26);

  ctx.restore();
}

// Sculptural hyperboloid cooling tower cutaway (ZERO lime neon rim!)
function drawCoolingTowerCutaway(ctx, x, y, s, t, k, o = {}) {
  if (k <= 0) return;
  ctx.save();
  ctx.globalAlpha *= k;
  ctx.translate(x, y + (1 - k) * 28);
  ctx.scale(s, s);

  // Rising steam plume out of tower rim (single batched path)
  ctx.fillStyle = 'rgba(241,239,230,0.22)';
  ctx.beginPath();
  for (const p of TOWER_STEAM) {
    const prog = (p.phase + t * p.speed) % 1;
    const sx = p.x0 * (0.6 + prog * 1.15);
    const sy = lerp(-126, -280, prog);
    const sr = p.r * (0.55 + prog * 0.95);
    ctx.moveTo(sx + sr, sy);
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.62)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 14;
  const tg = ctx.createLinearGradient(-90, -132, 90, 128);
  tg.addColorStop(0, '#19232B');
  tg.addColorStop(1, '#0C1217');
  ctx.fillStyle = tg;
  ctx.strokeStyle = 'rgba(241,239,230,0.48)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-116, 128);
  ctx.quadraticCurveTo(-56, -12, -72, -132);
  ctx.lineTo(72, -132);
  ctx.quadraticCurveTo(56, -12, 116, 128);
  ctx.closePath();
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.stroke();
  ctx.restore();

  // Internal spray mist lines
  ctx.strokeStyle = 'rgba(190,232,246,0.34)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  for (let sx = -42; sx <= 42; sx += 21) {
    ctx.moveTo(sx, -24);
    ctx.lineTo(sx * 1.35, 108);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Clean machined architectural ivory rim (no neon green line!)
  ctx.strokeStyle = 'rgba(241,239,230,0.78)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-72, -132);
  ctx.lineTo(72, -132);
  ctx.stroke();

  if (o.label) {
    if (o.limeTag) {
      drawSolidBadge(ctx, o.label, 0, 158, { align: 'center', size: 14, ls: 1.5, padX: 14, h: 30, lime: true, r: 3 });
    } else {
      setFont(ctx, MN(15, 700), 1.5);
      ctx.fillStyle = IVORY;
      ctx.textAlign = 'center';
      ctx.fillText(o.label, 0, 158);
      ctx.textAlign = 'left';
    }
  }
  ctx.restore();
}

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const VID = {};
  const IM = {};

  async function load() {
    const base = '../assets/shared/vid/';
    const [sr, sk, ct, cloudSky] = await Promise.all([
      loadVid(base, 'server_room'),
      loadVid(base, 'server_rack'),
      loadVid(base, 'cooling_tower'),
      loadImg('../assets/shared/own/cloud_sky_editorial.jpg', 1280),
    ]);
    VID.server_room = sr;
    VID.server_rack = sk;
    VID.cooling_tower = ct;
    IM.cloudSky = cloudSky;
  }

  // Full-bleed documentary video plates with richer filmic lighting & contrast
  const BG_PLATES = [
    {
      vid: 'server_room', t0: -0.5, t1: A.karena + 0.15, fx: 0.5, fy: 0.5, dir: 1,
      grade: 'saturate(.38) contrast(1.28) brightness(.72)',
      cap: 'ILUSTRASI · RUANG SERVER', kredit: 'Video: MrWashingt0n / Pixabay',
    },
    {
      vid: 'server_rack', t0: A.karena - 0.30, t1: A.saat + 0.15, fx: 0.5, fy: 0.5, dir: -1,
      grade: 'saturate(.44) contrast(1.30) brightness(.76)',
      cap: 'ILUSTRASI · RAK KOMPUTER', kredit: 'Video: MrColo / Pexels',
    },
    {
      vid: 'cooling_tower', t0: A.saat - 0.30, t1: A.artinya + 0.15, fx: 0.52, fy: 0.45, dir: 1,
      grade: 'saturate(.34) contrast(1.28) brightness(.66)',
      cap: 'ILUSTRASI · MENARA PENDINGIN', kredit: 'Video: Gylfi Gylfason / Pexels',
    },
    {
      vid: 'server_room', t0: A.artinya - 0.30, t1: DUR + 0.8, fx: 0.5, fy: 0.5, dir: -1,
      grade: 'saturate(.36) contrast(1.26) brightness(.66)',
      cap: 'ILUSTRASI · RUANG SERVER', kredit: 'Video: MrWashingt0n / Pixabay',
    },
  ];

  function drawBackdrop(ctx, t) {
    layarFoto(ctx, W, H, BG_PLATES, t, {
      IM: VID,
      veil: 'rgba(11,14,17,0.42)',
      grain: 0.20,
    });

    // Subtle filmic overhead keylight bloom (screen) to separate foreground plates from live footage
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const key = ctx.createRadialGradient(W * 0.5, H * 0.32, 40, W * 0.5, H * 0.42, W * 0.62);
    key.addColorStop(0, 'rgba(218,224,212,0.09)');
    key.addColorStop(0.55, 'rgba(92,118,128,0.04)');
    key.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = key;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // Deep cinematic vignette + top/bottom edge framing scrim
    const vg = ctx.createRadialGradient(W / 2, H * 0.48, H * 0.24, W / 2, H / 2, W * 0.72);
    vg.addColorStop(0, 'rgba(10,13,16,0)');
    vg.addColorStop(1, 'rgba(7,9,11,0.82)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  const ST = [
    // S0 · 0..3.48s: Clearer, descriptive title callback matching revised intro: "DATA DI CLOUD?" -> "BUTUH AIR LAUT?"
    {
      at: 0, name: 'Pertanyaan Awal', x: 0, z: 0, py: -560, dist: [1480, 1380], yaw: [-2.5, 2.0],
      draw(ctx, t) {
        slab(ctx, 'KEMBALI KE PERTANYAAN AWAL', 0, -305, t, 0.74, { align: 'center', size: 20 });

        // Upper photographic sky strip behind crisp IVORY "DATA DI CLOUD?"
        const kSky = E.outQuint(inv(0.78, 1.32, t));
        if (kSky > 0) {
          ctx.save();
          ctx.translate(0, (1 - kSky) * 24);
          drawSkyWindow(ctx, IM.cloudSky, 0, -145, 920, 168, t, { a: kSky, scrim: 0.34, fy: 0.72, r: 6 });
          ctx.restore();
        }
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.62)';
        ctx.shadowBlur = 22;
        ctx.shadowOffsetY = 6;
        fall(ctx, 'DATA DI CLOUD?', 0, -96, t, A.balik - 0.20, DSP(140), { align: 'center', ls: 3, stag: 0.015, col: IVORY });
        ctx.restore();

        // Clean architectural vertical bridge connector -> solid matte #C8F53C hero block "BUTUH AIR LAUT?"
        const kBridge = E.inOutCubic(inv(A.balik + 0.08, A.pertanyaan + 0.08, t));
        if (kBridge > 0) {
          ctx.save();
          ctx.globalAlpha *= kBridge;
          ctx.strokeStyle = 'rgba(241,239,230,0.52)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(0, -58);
          ctx.lineTo(0, lerp(-58, 10, kBridge));
          ctx.stroke();
          if (kBridge > 0.78) {
            ctx.fillStyle = IVORY;
            ctx.beginPath();
            ctx.moveTo(0, 18);
            ctx.lineTo(-9, 4);
            ctx.lineTo(9, 4);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }

        // Monumental solid matte #C8F53C block (#11120E dark ink) matching revised intro title!
        const kHero = E.snap(inv(A.pertanyaan - 0.18, A.pertanyaan + 0.08, t));
        if (kHero > 0) {
          setFont(ctx, DSP(152), 3);
          const hw = ctx.measureText('BUTUH AIR LAUT?').width + 72;
          const hh = 158;
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.58)';
          ctx.shadowBlur = 36;
          ctx.shadowOffsetY = 16;
          ctx.fillStyle = LIME;
          ctx.fillRect(-hw / 2, 26, hw * kHero, hh);
          ctx.restore();
        }
        fall(ctx, 'BUTUH AIR LAUT?', 0, 158, t, A.pertanyaan - 0.16, DSP(152), { align: 'center', ls: 3, stag: 0.014, col: DARK_INK });

        txt(ctx, 'data kita di awan... kenapa butuh air laut?', 0, 262, t, A.pertanyaan - 0.05, SRF(50), {
          align: 'center', col: ivo(0.92),
        });
      },
    },

    // S1 · 3.48..9.76s: Real photographic sky window ("AWAN") vs Rp600 MILIAR PABRIK AIR LAUT over server_room
    {
      at: A.kenapa - 0.15, via: 'push', name: 'Awan vs Rp600 Miliar', x: 0, z: 2600, py: -560, dist: [1480, 1360], yaw: [2.2, -1.8],
      draw(ctx, t) {
        // Left: Editorial photographic sky cutout window (ZERO cartoon cloud silhouette!)
        const kL = E.outQuint(inv(A.kenapa + 0.02, A.kenapa + 0.55, t));
        txt(ctx, 'KATANYA DISIMPAN DI', -445, -222, t, A.kenapa + 0.10, MN(18, 700), {
          align: 'center', ls: 2.5, col: ivo(0.82),
        });
        if (kL > 0) {
          ctx.save();
          ctx.translate(0, (1 - kL) * 28);
          drawSkyWindow(ctx, IM.cloudSky, -445, -26, 520, 300, t, { a: kL, scrim: 0.42, fy: 0.62, r: 6 });
          ctx.restore();
        }
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.68)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 8;
        fall(ctx, '“AWAN”', -445, 22, t, A.kenapa + 0.32, DSP(148), { align: 'center', col: IVORY });
        ctx.restore();
        slab(ctx, 'BATAM · DATA PENGGUNA', -445, 166, t, A.batam - 0.05, { align: 'center', size: 19 });

        // Center bridge: crisp ivory connector + solid matte #C8F53C square VS badge
        const kBridge = E.outCubic(inv(A.butuh - 0.25, A.butuh + 0.30, t));
        if (kBridge > 0) {
          ctx.save();
          ctx.strokeStyle = 'rgba(241,239,230,0.48)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-176, -26);
          ctx.lineTo(lerp(-176, -12, kBridge), -26);
          ctx.stroke();
          if (kBridge > 0.85) {
            ctx.fillStyle = IVORY;
            ctx.beginPath();
            ctx.moveTo(0, -26);
            ctx.lineTo(-18, -36);
            ctx.lineTo(-18, -16);
            ctx.closePath();
            ctx.fill();
          }
          ctx.globalAlpha *= clamp(kBridge * 1.4);
          drawSolidBadge(ctx, 'VS', -96, -26, { align: 'center', size: 15, ls: 2, padX: 12, h: 32, lime: true, r: 3 });
          ctx.restore();
        }

        // Right: Documentary reality — Rp600 MILIAR + solid matte PABRIK AIR LAUT
        txt(ctx, 'KENYATAANNYA DI KABIL, BATAM', 400, -222, t, A.batam + 0.25, MN(19, 700), {
          align: 'center', ls: 2.5, col: ivo(0.84),
        });
        const kRp = inv(A.enam - 0.18, A.miliar + 0.12, t);
        const rpVal = kRp >= 1 ? 600 : Math.round(lerp(0, 600, E.outCubic(kRp)) / 25) * 25;
        if (t > A.butuh + 0.15) {
          const kNum = E.outQuint(inv(A.butuh + 0.15, A.butuh + 0.55, t));
          ctx.save();
          ctx.globalAlpha *= kNum;
          ctx.shadowColor = 'rgba(0,0,0,0.58)';
          ctx.shadowBlur = 24;
          setFont(ctx, DSP(192), 2);
          ctx.fillStyle = IVORY;
          ctx.textAlign = 'center';
          ctx.fillText(`Rp${rpVal} MILIAR`, 400, -14);
          ctx.textAlign = 'left';
          ctx.restore();
        }
        markLine(ctx, '', 'PABRIK AIR LAUT', '', 400, 102, t, A.air_laut - 0.25, A.enam - 0.20, DSP(88));
        txt(ctx, 'SWRO KABIL · PENDINGIN DATA CENTER', 400, 178, t, A.miliar + 0.05, MN(18, 700), {
          align: 'center', ls: 2.5, col: ivo(0.78),
        });

        srcTag(ctx, 'Sumber: BP Batam & Antara News, 5 Nov 2026', -840, 440, t, A.butuh + 0.20);
      },
    },

    // S2 · 9.76..16.00s: Photographic sky window dissolves dramatically into glowing hot dark server racks + real server_rack footage
    {
      at: A.karena - 0.15, via: 'whip', name: 'Awan Digital vs Gedung Panas', x: 0, z: 5200, py: -560, dist: [1500, 1380], yaw: [-2.5, 2.0],
      draw(ctx, t) {
        const kIn = E.outQuint(inv(A.karena - 0.1, A.awan_dig + 0.35, t));
        const kMorph = E.inOutCubic(inv(A.aslinya - 0.14, A.gedung + 0.26, t));
        const kHeat = E.outCubic(inv(A.panas - 0.18, A.panas + 0.45, t));

        // Left Transformation Frame (-415, -12): clean sky photo dissolving into hot server racks + real server_rack footage
        if (kIn > 0.01) {
          const cx = -415, cy = -12, fw = 486, fh = 436;
          const fx = cx - fw / 2, fy = cy - fh / 2;
          ctx.save();
          ctx.globalAlpha *= kIn;
          ctx.translate(0, (1 - kIn) * 28);

          // Matte dark slate outer bezel + cinema shadow
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.68)';
          ctx.shadowBlur = 48;
          ctx.shadowOffsetY = 20;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(fx - 10, fy - 10, fw + 20, fh + 20, 8);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = 'rgba(241,239,230,0.22)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(fx - 10, fy - 10, fw + 20, fh + 20, 8);
          ctx.stroke();

          // Layer 1 (underneath): Glowing hot dark server racks + real live server_rack footage!
          const rackIm = vidFrame(VID.server_rack, t, A.karena - 0.30);
          drawHotServerInterior(ctx, fx, fy, fw, fh, t, Math.max(kMorph * 0.45, kHeat), rackIm);

          // Layer 2 (top): Clean atmospheric sky cutout window dissolving upward with thermal edge & peeling sky shards
          if (kMorph < 0.995) {
            const wipeY = lerp(fy + fh, fy - 8, kMorph);
            ctx.save();
            ctx.beginPath();
            ctx.rect(fx, fy, fw, Math.max(0, wipeY - fy));
            ctx.clip();

            ctx.filter = 'saturate(0.92) contrast(1.08) brightness(0.98)';
            drawCover(ctx, IM.cloudSky, fx, fy, fw, fh, { zoom: 1.08 + 0.05 * kMorph, fy: 0.62 });
            ctx.filter = 'none';

            // Subtle dark photo scrim so editorial label reads sharply over bright sky
            const sg = ctx.createLinearGradient(0, fy, 0, fy + fh);
            sg.addColorStop(0, 'rgba(10,16,22,0.34)');
            sg.addColorStop(0.55, 'rgba(10,16,22,0.46)');
            sg.addColorStop(1, 'rgba(10,16,22,0.68)');
            ctx.fillStyle = sg;
            ctx.fillRect(fx, fy, fw, fh);

            // Editorial label inside sky portion
            ctx.globalAlpha *= clamp(1 - kMorph * 1.15);
            setFont(ctx, MN(13, 700), 2);
            ctx.fillStyle = 'rgba(241,239,230,0.82)';
            ctx.textAlign = 'left';
            ctx.fillText('EKSPEKTASI · LANGIT RINGAN', fx + 18, fy + 28);
            setFont(ctx, SRF(48), 0);
            ctx.fillStyle = IVORY;
            ctx.textAlign = 'center';
            ctx.fillText('“awan digital”', cx, cy - 34);
            ctx.restore();

            // Glowing thermal dissolve seam + atmospheric sky shards lifting off the edge!
            if (kMorph > 0.02) {
              const seamEnv = Math.sin(Math.PI * kMorph);
              ctx.save();
              ctx.beginPath();
              ctx.rect(fx, fy, fw, fh);
              ctx.clip();

              const heatBand = ctx.createLinearGradient(0, wipeY - 36, 0, wipeY + 36);
              heatBand.addColorStop(0, 'rgba(241,239,230,0)');
              heatBand.addColorStop(0.45, `rgba(240,146,66,${0.62 * seamEnv})`);
              heatBand.addColorStop(0.55, `rgba(241,239,230,${0.92 * seamEnv})`);
              heatBand.addColorStop(1, 'rgba(236,118,44,0)');
              ctx.fillStyle = heatBand;
              ctx.fillRect(fx, wipeY - 36, fw, 72);

              ctx.fillStyle = `rgba(232,240,246,${0.72 * seamEnv})`;
              for (const sh of CLOUD_SHARDS) {
                ctx.fillRect(cx + sh.x + sh.dx * kMorph - sh.w / 2, wipeY + sh.yOff + sh.dy * 0.45 * kMorph, sh.w * (1 - kMorph * 0.45), sh.h);
              }
              ctx.restore();
            }
          }

          // Subtle architectural corner ticks on outer bezel
          ctx.strokeStyle = 'rgba(241,239,230,0.36)';
          ctx.lineWidth = 1.5;
          const m = 12;
          ctx.beginPath();
          ctx.moveTo(fx - 2, fy - 2 + m); ctx.lineTo(fx - 2, fy - 2); ctx.lineTo(fx - 2 + m, fy - 2);
          ctx.moveTo(fx + fw + 2 - m, fy - 2); ctx.lineTo(fx + fw + 2, fy - 2); ctx.lineTo(fx + fw + 2, fy - 2 + m);
          ctx.moveTo(fx - 2, fy + fh + 2 - m); ctx.lineTo(fx - 2, fy + fh + 2); ctx.lineTo(fx - 2 + m, fy + fh + 2);
          ctx.moveTo(fx + fw + 2 - m, fy + fh + 2); ctx.lineTo(fx + fw + 2, fy + fh + 2); ctx.lineTo(fx + fw + 2, fy + fh + 2 - m);
          ctx.stroke();

          ctx.restore();
        }

        slab(ctx, 'GEDUNG KOMPUTER PANAS', -415, 258, t, A.gedung - 0.05, { align: 'center', size: 19 });

        // Right side: Headline + two matte dark slate hardware requirement plates (ZERO green neon outline circles!)
        txt(ctx, '“awan digital” itu aslinya', 330, -216, t, A.awan_dig, SRF(48), {
          align: 'center', col: ivo(0.88),
        });
        fall(ctx, 'GEDUNG KOMPUTER PANAS', 330, -130, t, A.gedung - 0.1, DSP(86), {
          align: 'center', col: IVORY,
        });

        // Row 1: LISTRIK BESAR (dark matte slate plate + solid matte IVORY icon block)
        const kL = E.outQuint(inv(A.listrik - 0.22, A.listrik + 0.25, t));
        if (kL > 0) {
          ctx.save();
          ctx.globalAlpha *= kL;
          ctx.translate(0, (1 - kL) * 28);
          const rx = -35, ry = -58, rw = 740, rh = 122;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(rx, ry, rw, rh, 8);
          ctx.fill();
          ctx.strokeStyle = HAIRLINE;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Solid matte IVORY icon block with crisp #11120E bolt
          ctx.fillStyle = IVORY;
          ctx.beginPath();
          ctx.roundRect(rx + 22, ry + 22, 78, 78, 4);
          ctx.fill();
          drawBoltIcon(ctx, rx + 61, ry + 61, 0.96, DARK_INK);
          ctx.restore();
        }
        txt(ctx, 'LISTRIK BESAR', 90, 0, t, A.listrik - 0.16, DSP(68), { col: IVORY });
        typeOn(ctx, 'DAYA KOMPUTASI & PENDINGINAN NONSTOP', 92, 42, t, A.listrik - 0.05, MN(16, 700), {
          ls: 1.5, cps: 65, col: ivo(0.76),
        });

        // Row 2: AIR NYATA DI BUMI (dark matte slate plate + solid matte #C8F53C icon block, ZERO neon circle!)
        const kW = E.outQuint(inv(A.air_nyata - 0.22, A.air_nyata + 0.25, t));
        if (kW > 0) {
          ctx.save();
          ctx.globalAlpha *= kW;
          ctx.translate(0, (1 - kW) * 28);
          const rx = -35, ry = 96, rw = 740, rh = 122;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(rx, ry, rw, rh, 8);
          ctx.fill();
          ctx.strokeStyle = HAIRLINE;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Solid matte #C8F53C icon block with crisp #11120E water drop
          ctx.fillStyle = LIME;
          ctx.beginPath();
          ctx.roundRect(rx + 22, ry + 22, 78, 78, 4);
          ctx.fill();
          drawSolidDropIcon(ctx, rx + 61, ry + 61, 0.96, DARK_INK);
          ctx.restore();
        }
        markLine(ctx, '', 'AIR NYATA', ' DI BUMI', 90, 154, t, A.air_nyata - 0.22, A.air_nyata + 0.02, DSP(68), {
          align: 'left',
        });
        typeOn(ctx, 'MENGUAP DI MENARA PENDINGIN', 92, 198, t, A.air_nyata + 0.02, MN(16, 700), {
          ls: 1.5, cps: 65, col: ivo(0.76),
        });

        srcTag(ctx, 'Sumber: Nature · arXiv (2021–2026)', -840, 440, t, A.listrik + 0.1);
      },
    },

    // S3 · 16.00..21.16s: Batam island data centers draining reservoir -> "air waduk TIDAK CUKUP" over cooling_tower
    {
      at: A.saat - 0.15, via: 'rise', name: 'Air Waduk Tidak Cukup', x: 0, z: 7800, py: -560, dist: [1520, 1400], yaw: [2.2, -1.8],
      draw(ctx, t) {
        slab(ctx, 'KOTA PULAU BATAM · BANYAK DATA CENTER', 0, -324, t, A.saat + 0.08, { align: 'center', size: 20 });

        const kDrop = E.inOutCubic(inv(A.banyak_dc - 0.15, A.waduk_habis + 0.65, t));
        const lvl = lerp(0.80, 0.20, kDrop);
        const isLow = lvl < 0.45;
        gelasWaduk(ctx, -475, -20, 0.84, t, A.saat, {
          level: lvl,
          label: 'AIR WADUK BATAM',
          val: isLow ? 'TIDAK CUKUP' : 'MENYUSUT',
          critical: isLow,
        });

        // Double-walled dark industrial suction pipe pulling from reservoir into data center cluster
        const kPipe = E.outCubic(inv(A.banyak_dc - 0.3, A.banyak_dc + 0.25, t));
        if (kPipe > 0) {
          ctx.save();
          ctx.globalAlpha *= kPipe;
          const xEnd = lerp(-385, 22, kPipe);
          ctx.fillStyle = 'rgba(11,15,19,0.85)';
          ctx.fillRect(-385, -17, xEnd + 385, 14);
          ctx.strokeStyle = 'rgba(241,239,230,0.36)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-385, -17); ctx.lineTo(xEnd, -17);
          ctx.moveTo(-385, -3); ctx.lineTo(xEnd, -3);
          ctx.stroke();

          // Flowing suction pulses inside conduit
          for (let d = 0; d < 4; d++) {
            const u = (t * 0.95 + d * 0.25) % 1;
            const px = lerp(-375, xEnd - 10, u);
            ctx.fillStyle = isLow ? LIME : IVORY;
            ctx.fillRect(px, -12, 16, 4);
          }

          // Clean matte slate label pill above conduit
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(-290, -56, 210, 28, 4);
          ctx.fill();
          ctx.strokeStyle = HAIRLINE;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          setFont(ctx, MN(13, 700), 1.6);
          ctx.fillStyle = IVORY;
          ctx.textAlign = 'center';
          ctx.fillText('SEDOTAN DATA CENTER', -185, -37);
          ctx.restore();
        }

        // Dark matte slate server rack block + sculptural cooling tower cutaway
        const kDC = E.outQuint(inv(A.banyak_dc - 0.35, A.banyak_dc + 0.15, t));
        if (kDC > 0) {
          ctx.save();
          ctx.globalAlpha *= kDC;
          ctx.translate(120, 15 + (1 - kDC) * 28);

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.65)';
          ctx.shadowBlur = 34;
          ctx.shadowOffsetY = 16;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(-94, -108, 188, 216, 8);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = 'rgba(241,239,230,0.26)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-94, -108, 188, 216, 8);
          ctx.stroke();

          for (let b = 0; b < 5; b++) {
            const by = -84 + b * 36;
            ctx.fillStyle = '#182027';
            ctx.fillRect(-72, by, 144, 24);
            ctx.fillStyle = b < 2 ? 'rgba(240,136,56,0.92)' : 'rgba(241,239,230,0.62)';
            ctx.fillRect(-62, by + 8, 8, 8);
            ctx.fillStyle = 'rgba(241,239,230,0.18)';
            ctx.fillRect(-40, by + 9, 96, 6);
          }
          setFont(ctx, MN(15, 700), 1.5);
          ctx.fillStyle = IVORY;
          ctx.textAlign = 'center';
          ctx.fillText('RAK SERVER PANAS', 0, 144);
          ctx.restore();

          // Industrial pipes from server rack to cooling tower
          ctx.save();
          ctx.globalAlpha *= kDC;
          ctx.strokeStyle = 'rgba(241,239,230,0.44)';
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(214, -10); ctx.lineTo(395, -10);
          ctx.moveTo(214, 34); ctx.lineTo(395, 34);
          ctx.stroke();
          const pu = (t * 1.1) % 1;
          ctx.fillStyle = LIME;
          ctx.beginPath();
          ctx.arc(lerp(220, 388, pu), -10, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        drawCoolingTowerCutaway(ctx, 485, 16, 0.92, t, kDC, {
          label: 'MENGUAP 70–90%',
          limeTag: isLow,
        });

        markLine(ctx, 'air waduk ', 'TIDAK LAGI CUKUP', '', 0, 332, t, A.waduk_habis - 0.30, A.waduk_habis + 0.32, SRF(68), {
          col: IVORY,
        });
      },
    },

    // S4 · 21.16..26.25s: Load Shift Metaphor ("WADUK WARGA (AMAN)" <-/-> "LAUTAN (SWRO)") — ZERO NEON BOXES!
    {
      at: A.menyuling - 0.15, via: 'truck', name: 'Pindah Beban ke Lautan', x: 0, z: 10400, py: -560, dist: [1520, 1400], yaw: [-2.0, 2.0],
      draw(ctx, t) {
        txt(ctx, 'MENYULING AIR LAUT MEMINDAHKAN BEBAN PENDINGINAN', 0, -328, t, A.menyuling, MN(20, 700), {
          align: 'center', ls: 2.5, col: ivo(0.86),
        });

        const kShift = E.inOutCubic(inv(A.pindah - 0.10, A.dari_waduk + 0.50, t));
        const lvl = lerp(0.22, 0.85, kShift);

        // Left: WADUK WARGA (AMAN) recovering
        gelasWaduk(ctx, -545, -15, 0.84, t, A.menyuling - 0.2, {
          level: lvl,
          label: 'WADUK WARGA (AMAN)',
          val: kShift > 0.52 ? 'AMAN' : 'PULIH',
          critical: false,
        });

        // Left pipe (-460 .. -145), sealed off as kShift -> 1
        ctx.save();
        ctx.strokeStyle = `rgba(241,239,230,${lerp(0.50, 0.20, kShift)})`;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(-460, -15);
        ctx.lineTo(-145, -15);
        ctx.stroke();
        if (kShift > 0.18) {
          ctx.globalAlpha *= clamp((kShift - 0.18) / 0.35);
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(-356, -40, 110, 50, 6);
          ctx.fill();
          ctx.strokeStyle = 'rgba(241,239,230,0.34)';
          ctx.lineWidth = 1.6;
          ctx.stroke();
          setFont(ctx, MN(14, 700), 1.5);
          ctx.fillStyle = IVORY;
          ctx.textAlign = 'center';
          ctx.fillText('DIPISAH', -301, -9);
        }
        ctx.restore();

        // Right: LAUTAN (SWRO) tank — dark matte slate glass + neutral ivory hairline ALWAYS (zero lime border!)
        const kOcean = E.outQuint(inv(A.menyuling - 0.1, A.menyuling + 0.45, t));
        if (kOcean > 0) {
          const tx = 545, ty = -15, tw = 240, th = 352;
          ctx.save();
          ctx.globalAlpha *= kOcean;
          ctx.translate(tx, ty + (1 - kOcean) * 30);

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.60)';
          ctx.shadowBlur = 36;
          ctx.shadowOffsetY = 16;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(-tw / 2, -th / 2, tw, th, 16);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = 'rgba(241,239,230,0.32)';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.roundRect(-tw / 2, -th / 2, tw, th, 16);
          ctx.stroke();

          ctx.save();
          ctx.beginPath();
          ctx.roundRect(-tw / 2 + 6, -th / 2 + 6, tw - 12, th - 12, 12);
          ctx.clip();
          const og = ctx.createLinearGradient(0, -80, 0, th / 2);
          og.addColorStop(0, 'rgba(62,140,178,0.82)');
          og.addColorStop(1, 'rgba(13,38,54,0.95)');
          ctx.fillStyle = og;
          ctx.beginPath();
          ctx.moveTo(-tw / 2, th / 2);
          for (let px = -tw / 2; px <= tw / 2; px += 12) {
            const wy = -62 + Math.sin(px * 0.045 + t * 3.8) * 10 + Math.cos(px * 0.028 - t * 2.2) * 6;
            ctx.lineTo(px, wy);
          }
          ctx.lineTo(tw / 2, th / 2);
          ctx.closePath();
          ctx.fill();

          // Crisp IVORY wave surface crest (never neon green outline!)
          ctx.strokeStyle = IVORY;
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          for (let px = -tw / 2 + 6; px <= tw / 2 - 6; px += 10) {
            const wy = -62 + Math.sin(px * 0.045 + t * 3.8) * 10 + Math.cos(px * 0.028 - t * 2.2) * 6;
            if (px === -tw / 2 + 6) ctx.moveTo(px, wy); else ctx.lineTo(px, wy);
          }
          ctx.stroke();
          ctx.restore();

          // Calibration tick marks on inner glass matching gelasWaduk
          ctx.strokeStyle = 'rgba(241,239,230,0.34)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          for (let i = 1; i <= 5; i++) {
            const tickY = th / 2 - (th * i) / 6;
            ctx.moveTo(-tw / 2 + 10, tickY);
            ctx.lineTo(-tw / 2 + (i === 3 ? 34 : 22), tickY);
          }
          ctx.stroke();

          // Solid matte editorial badge above tank (matte #C8F53C with #11120E dark ink when active!)
          drawSolidBadge(ctx, 'LAUTAN (SWRO)', 0, -th / 2 - 24, {
            align: 'center', size: 14, ls: 1.8, padX: 16, h: 30, lime: kShift > 0.35, r: 3,
          });

          setFont(ctx, DSP(54), 1);
          ctx.fillStyle = IVORY;
          ctx.textAlign = 'center';
          ctx.fillText('300 → 700 LPS', 0, th / 2 + 54);
          ctx.restore();
        }

        // Right pipe (+418 .. +132): industrial neutral-ivory conduit with active matte lime core stream
        ctx.save();
        ctx.fillStyle = 'rgba(11,15,19,0.88)';
        ctx.fillRect(132, -23, 286, 16);
        ctx.strokeStyle = 'rgba(241,239,230,0.34)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(132, -23); ctx.lineTo(418, -23);
        ctx.moveTo(132, -7); ctx.lineTo(418, -7);
        ctx.stroke();
        if (kShift > 0.15) {
          const ka = clamp((kShift - 0.15) / 0.35);
          ctx.globalAlpha *= ka;
          ctx.fillStyle = LIME;
          ctx.fillRect(136, -18, 278, 6);
          for (let d = 0; d < 4; d++) {
            const u = ((t * 0.95 + d * 0.25) % 1);
            const dx = lerp(408, 144, u);
            ctx.fillStyle = DARK_INK;
            ctx.fillRect(dx - 6, -18, 12, 6);
          }
        }
        ctx.restore();

        // Center manifold: BEBAN PENDINGINAN — dark matte slate + neutral ivory hairline + solid matte status badge!
        const kHub = E.outQuint(inv(A.menyuling, A.menyuling + 0.4, t));
        if (kHub > 0) {
          ctx.save();
          ctx.globalAlpha *= kHub;
          const hx = -148, hy = -94, hw = 280, hh = 158;

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.62)';
          ctx.shadowBlur = 36;
          ctx.shadowOffsetY = 16;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(hx, hy, hw, hh, 8);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = 'rgba(241,239,230,0.24)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(hx, hy, hw, hh, 8);
          ctx.stroke();

          // Clean 4px solid top accent rule (never green outline around box!)
          if (kShift > 0.5) {
            ctx.fillStyle = LIME;
            ctx.fillRect(hx + 2, hy, hw - 4, 5);
          }

          setFont(ctx, MN(14, 700), 1.6);
          ctx.fillStyle = ivo(0.74);
          ctx.textAlign = 'center';
          ctx.fillText('BEBAN PENDINGINAN', hx + hw / 2, -48);

          setFont(ctx, DSP(48), 2);
          ctx.fillStyle = IVORY;
          ctx.fillText('DATA CENTER', hx + hw / 2, 2);

          if (kShift > 0.5) {
            drawSolidBadge(ctx, '← PASOKAN SWRO AKTIF', hx + hw / 2, 36, {
              align: 'center', size: 12, ls: 1.2, padX: 12, h: 26, lime: true, r: 3,
            });
          } else {
            ctx.fillStyle = 'rgba(241,239,230,0.10)';
            ctx.beginPath();
            ctx.roundRect(hx + 34, 23, hw - 68, 26, 3);
            ctx.fill();
            setFont(ctx, MN(12, 700), 1.2);
            ctx.fillStyle = ivo(0.74);
            ctx.textAlign = 'center';
            ctx.fillText('SUPLAI WADUK →', hx + hw / 2, 40);
          }
          ctx.restore();
        }

        // Top load-shift transfer arc: understated ivory curve + solid matte badge at apex (no neon green arc!)
        if (kShift > 0.05) {
          ctx.save();
          ctx.globalAlpha *= kShift;
          ctx.strokeStyle = 'rgba(241,239,230,0.48)';
          ctx.lineWidth = 2.4;
          ctx.setLineDash([8, 7]);
          ctx.beginPath();
          ctx.moveTo(-450, -172);
          ctx.quadraticCurveTo(-18, -278, lerp(-450, 404, kShift), -174);
          ctx.stroke();
          ctx.setLineDash([]);
          if (kShift > 0.85) {
            ctx.fillStyle = IVORY;
            ctx.beginPath();
            ctx.moveTo(414, -172);
            ctx.lineTo(395, -183);
            ctx.lineTo(398, -162);
            ctx.closePath();
            ctx.fill();
          }
          if (kShift > 0.55) {
            ctx.globalAlpha *= clamp((kShift - 0.55) / 0.25);
            drawSolidBadge(ctx, 'BEBAN PINDAH →', 0, -228, {
              align: 'center', size: 13, ls: 1.8, padX: 14, h: 28, lime: true, r: 3,
            });
          }
          ctx.restore();
        }

        markLine(ctx, 'dari waduk warga ke ', 'LAUTAN', '', 0, 332, t, A.dari_waduk - 0.30, A.lautan - 0.25, SRF(72), {
          col: IVORY,
        });
        srcTag(ctx, 'Sumber: BP Batam & Kompas.com (diolah)', -840, 440, t, A.pindah + 0.15);
      },
    },

    // S5 · 26.25..30.72s: Twin Oversight ("ONGKOS LISTRIK" & "BRINE (GARAM)") — machined slate & ivory scale, ZERO neon lines!
    {
      at: A.tapi - 0.15, via: 'whip', name: 'Wajib Diawasi Bersama', x: 0, z: 13000, py: -560, dist: [1480, 1380], yaw: [2.2, -1.8],
      draw(ctx, t) {
        txt(ctx, 'TAPI SOLUSI INI PUNYA HARGA YANG', 0, -296, t, A.tapi + 0.05, MN(20, 700), {
          align: 'center', ls: 3, col: ivo(0.82),
        });

        const kBeam = E.outQuint(inv(A.tapi, A.listrik2 + 0.25, t));
        const k1 = E.outQuint(inv(A.listrik2 - 0.22, A.listrik2 + 0.25, t));
        const k2 = E.outQuint(inv(A.garamnya - 0.22, A.garamnya + 0.25, t));
        const kLock = E.inOutCubic(inv(A.wajib - 0.35, A.awasi - 0.1, t));

        const tilt = (-4.5 * k1 * (1 - k2) + 2.2 * k2 * (1 - kLock)) * D2R;

        // Machined dark matte slate fulcrum + neutral ivory hairline (ZERO neon green triangle!)
        if (kBeam > 0) {
          ctx.save();
          ctx.globalAlpha *= kBeam;
          ctx.fillStyle = SLATE_PLATE;
          ctx.strokeStyle = 'rgba(241,239,230,0.34)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 82);
          ctx.lineTo(-44, 152);
          ctx.lineTo(44, 152);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Precision solid pivot hub (solid lime lock indicator dot when balanced)
          ctx.fillStyle = IVORY;
          ctx.beginPath();
          ctx.arc(0, 82, 10, 0, Math.PI * 2);
          ctx.fill();
          if (kLock > 0.6) {
            ctx.fillStyle = LIME;
            ctx.beginPath();
            ctx.arc(0, 82, 5.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        ctx.save();
        ctx.translate(0, 82);
        ctx.rotate(tilt);

        // Brushed-ivory architectural balance beam (never neon green!)
        if (kBeam > 0) {
          ctx.save();
          ctx.globalAlpha *= kBeam;
          ctx.strokeStyle = 'rgba(241,239,230,0.68)';
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          ctx.moveTo(-425, 0);
          ctx.lineTo(425, 0);
          ctx.stroke();
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          ctx.moveTo(-390, 0); ctx.lineTo(-390, -34);
          ctx.moveTo(390, 0); ctx.lineTo(390, -34);
          ctx.stroke();
          ctx.restore();
        }

        // Left card: ONGKOS LISTRIK — dark matte slate plate + neutral ivory hairline + solid matte #C8F53C metric stamp!
        if (k1 > 0) {
          ctx.save();
          ctx.globalAlpha *= k1;
          ctx.translate(-390, -150 + (1 - k1) * 32);

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.62)';
          ctx.shadowBlur = 38;
          ctx.shadowOffsetY = 18;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(-248, -114, 496, 228, 8);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = 'rgba(241,239,230,0.22)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-248, -114, 496, 228, 8);
          ctx.stroke();

          // Top solid matte lime structural bar
          ctx.fillStyle = LIME;
          ctx.fillRect(-246, -114, 492, 5);

          // Matte icon inset
          ctx.fillStyle = 'rgba(241,239,230,0.08)';
          ctx.beginPath();
          ctx.roundRect(-214, -84, 58, 58, 4);
          ctx.fill();
          ctx.strokeStyle = HAIRLINE;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          drawBoltIcon(ctx, -185, -55, 0.85, IVORY);

          ctx.textAlign = 'left';
          setFont(ctx, DSP(62), 2);
          ctx.fillStyle = IVORY;
          ctx.fillText('ONGKOS LISTRIK', -138, -32);

          // Solid matte #C8F53C data stamp (#11120E dark ink — NO floating green text!)
          drawSolidBadge(ctx, '~2,70 kWhe / m³', -214, 28, {
            align: 'left', size: 22, ls: 1.4, padX: 16, h: 42, lime: true, r: 3,
          });

          setFont(ctx, MN(14, 700), 1.3);
          ctx.fillStyle = ivo(0.76);
          ctx.fillText('POMPA TEKANAN TINGGI SWRO', -214, 80);
          ctx.restore();
        }

        // Right card: BRINE (GARAM) — dark matte slate plate + neutral ivory hairline + solid matte IVORY metric stamp!
        if (k2 > 0) {
          ctx.save();
          ctx.globalAlpha *= k2;
          ctx.translate(390, -150 + (1 - k2) * 32);

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.62)';
          ctx.shadowBlur = 38;
          ctx.shadowOffsetY = 18;
          ctx.fillStyle = SLATE_PLATE;
          ctx.beginPath();
          ctx.roundRect(-248, -114, 496, 228, 8);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = 'rgba(241,239,230,0.22)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-248, -114, 496, 228, 8);
          ctx.stroke();

          // Top solid ivory structural bar
          ctx.fillStyle = 'rgba(241,239,230,0.72)';
          ctx.fillRect(-246, -114, 492, 5);

          ctx.fillStyle = 'rgba(241,239,230,0.08)';
          ctx.beginPath();
          ctx.roundRect(-214, -84, 58, 58, 4);
          ctx.fill();
          ctx.strokeStyle = HAIRLINE;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          drawSaltIcon(ctx, -185, -55, 0.86, IVORY);

          ctx.textAlign = 'left';
          setFont(ctx, DSP(62), 2);
          ctx.fillStyle = IVORY;
          ctx.fillText('BRINE (GARAM)', -138, -32);

          drawSolidBadge(ctx, '70.000 PPM PEKAT', -214, 28, {
            align: 'left', size: 22, ls: 1.4, padX: 16, h: 42, lime: false, r: 3,
          });

          setFont(ctx, MN(14, 700), 1.3);
          ctx.fillStyle = ivo(0.76);
          ctx.fillText('HARUS DIENCERKAN SEBELUM KE LAUT', -214, 80);
          ctx.restore();
        }
        ctx.restore();

        markLine(ctx, 'WAJIB ', 'DIAWASI BERSAMA', '', 0, 288, t, A.wajib - 0.25, A.awasi - 0.28, DSP(92), {
          col: IVORY,
        });
        srcTag(ctx, 'Sumber: U.S. DOE & OSTI (diolah)', -840, 440, t, A.listrik2 + 0.25);
      },
    },

    // S6 · 30.72..38.65s: Finale — sleek smartphone zooms out to physical cooling tower + cable + pipe footprint (ZERO neon phone boxes!)
    {
      at: A.artinya - 0.15, via: 'push', name: 'Jejak Fisik di Sekitar', x: 0, z: 15600, py: -560, dist: [1480, 1400], yaw: [-1.5, 0.5],
      draw(ctx, t) {
        const kIntro = E.outQuint(inv(A.artinya - 0.1, A.artinya + 0.45, t));
        const kz = E.inOutCubic(inv(A.hp + 0.10, A.selalu + 0.55, t));
        const kFoot = E.outCubic(inv(A.hp + 0.22, A.jejak + 0.10, t));

        const aTop = kIntro * gone(t, A.hp + 0.05, 0.30);
        if (aTop > 0.01) {
          ctx.save();
          ctx.globalAlpha *= aTop;
          txt(ctx, 'ARTINYA BUAT KAMU', 0, -320, t, A.artinya + 0.05, MN(20, 700), {
            align: 'center', ls: 4, col: ivo(0.86),
          });
          ctx.restore();
        }

        if (kFoot > 0.01) {
          ctx.save();
          ctx.globalAlpha *= kFoot;

          // 1. Fiber/power cable: Smartphone (-488, 120) -> Server Rack (-210, 130)
          const kc = E.outCubic(inv(0.05, 0.48, kFoot));
          ctx.strokeStyle = 'rgba(241,239,230,0.52)';
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          ctx.moveTo(-488, 120);
          ctx.bezierCurveTo(-390, 120, -310, 165, lerp(-488, -210, kc), lerp(120, 130, kc));
          ctx.stroke();

          if (kc > 0.6) {
            for (let p = 0; p < 3; p++) {
              const u = (t * 0.85 + p * 0.33) % 1;
              const bx = (1 - u) ** 3 * (-488) + 3 * (1 - u) ** 2 * u * (-390) + 3 * (1 - u) * u ** 2 * (-310) + u ** 3 * (-210);
              const by = (1 - u) ** 3 * 120 + 3 * (1 - u) ** 2 * u * 120 + 3 * (1 - u) * u ** 2 * 165 + u ** 3 * 130;
              ctx.fillStyle = LIME;
              ctx.beginPath();
              ctx.arc(bx, by, 5, 0, Math.PI * 2);
              ctx.fill();
            }
            setFont(ctx, MN(15, 700), 1.5);
            ctx.fillStyle = ivo(0.82);
            ctx.textAlign = 'center';
            ctx.fillText('KABEL DATA', -350, 96);
          }

          // 2. Dark matte slate Server Rack at (-120, 110)
          const kr = E.outQuint(inv(0.18, 0.62, kFoot));
          if (kr > 0) {
            ctx.save();
            ctx.globalAlpha *= kr;
            ctx.translate(-120, 110 + (1 - kr) * 28);

            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.62)';
            ctx.shadowBlur = 32;
            ctx.shadowOffsetY = 14;
            ctx.fillStyle = SLATE_PLATE;
            ctx.beginPath();
            ctx.roundRect(-88, -108, 176, 216, 8);
            ctx.fill();
            ctx.restore();

            ctx.strokeStyle = 'rgba(241,239,230,0.26)';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.roundRect(-88, -108, 176, 216, 8);
            ctx.stroke();

            for (let b = 0; b < 5; b++) {
              const by = -84 + b * 36;
              ctx.fillStyle = '#182027';
              ctx.fillRect(-68, by, 136, 24);
              ctx.fillStyle = b < 2 ? 'rgba(240,136,56,0.90)' : 'rgba(241,239,230,0.58)';
              ctx.fillRect(-58, by + 8, 8, 8);
              ctx.fillStyle = 'rgba(241,239,230,0.20)';
              ctx.fillRect(-36, by + 9, 88, 6);
            }
            setFont(ctx, MN(15, 700), 1.5);
            ctx.fillStyle = IVORY;
            ctx.textAlign = 'center';
            ctx.fillText('RAK SERVER', 0, 138);
            ctx.restore();
          }

          // 3. Coolant Pipe: Server Rack (-32, 110) -> Cooling Tower (382, 110)
          const kp = E.outCubic(inv(0.28, 0.72, kFoot));
          if (kp > 0) {
            ctx.strokeStyle = 'rgba(241,239,230,0.44)';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(-32, 96);
            ctx.lineTo(lerp(-32, 382, kp), 96);
            ctx.moveTo(-32, 126);
            ctx.lineTo(lerp(-32, 382, kp), 126);
            ctx.stroke();
            if (kp > 0.75) {
              const px = lerp(-20, 368, (t * 0.9) % 1);
              ctx.fillStyle = LIME;
              ctx.beginPath();
              ctx.arc(px, 96, 5, 0, Math.PI * 2);
              ctx.fill();
              setFont(ctx, MN(15, 700), 1.5);
              ctx.fillStyle = ivo(0.82);
              ctx.textAlign = 'center';
              ctx.fillText('PIPA PENDINGIN', 175, 76);
            }
          }

          // 4. Physical Hyperboloid Cooling Tower at (+500, 115) — zero neon rim!
          const kt = E.outQuint(inv(0.32, 0.80, kFoot));
          drawCoolingTowerCutaway(ctx, 500, 115, 1.0, t, kt, {
            label: 'MENARA PENDINGIN',
          });

          // 5. Sea-water SWRO intake pipeline along bottom (double-walled neutral conduit + matte lime pressurized water core + solid matte tag!)
          const kSea = E.outCubic(inv(0.38, 0.88, kFoot));
          if (kSea > 0) {
            ctx.save();
            ctx.globalAlpha *= kSea;
            const sxEnd = lerp(-570, 596, kSea);

            // Outer dark conduit wall with neutral ivory rails
            ctx.fillStyle = 'rgba(11,15,19,0.88)';
            ctx.fillRect(-570, 307, sxEnd + 570, 16);
            ctx.strokeStyle = 'rgba(241,239,230,0.34)';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(-570, 307); ctx.lineTo(sxEnd, 307);
            ctx.moveTo(-570, 323); ctx.lineTo(sxEnd, 323);
            if (kSea > 0.92) {
              ctx.moveTo(596, 307); ctx.lineTo(596, 244);
            }
            ctx.stroke();

            // Inner solid matte lime flow core
            ctx.fillStyle = LIME;
            ctx.fillRect(-566, 312, Math.max(0, sxEnd + 562), 6);

            for (let w = 0; w < 5; w++) {
              const u = (t * 0.55 + w * 0.2) % 1;
              ctx.fillStyle = DARK_INK;
              ctx.fillRect(lerp(sxEnd - 8, -558, u) - 6, 312, 12, 6);
            }

            // Solid matte #C8F53C editorial tag block (#11120E dark ink, zero floating green text!)
            drawSolidBadge(ctx, 'PIPA AIR LAUT · SWRO & ENERGI NYATA', -15, 356, {
              align: 'center', size: 15, ls: 2, padX: 20, h: 32, lime: true, r: 3,
            });
            ctx.restore();
          }

          ctx.restore();
        }

        // Sleek Smartphone Hardware Frame (zooms out smoothly from center hero -> left network node)
        const px = lerp(0, -570, kz);
        const py = lerp(24, 92, kz);
        const ps = lerp(1.06, 0.62, kz);
        const pw = 270, ph = 520;

        ctx.save();
        ctx.globalAlpha *= kIntro;
        ctx.translate(px, py);
        ctx.scale(ps, ps);

        // Obsidian matte hardware chassis + brushed neutral-ivory metallic bezel
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.70)';
        ctx.shadowBlur = 46;
        ctx.shadowOffsetY = 20;
        ctx.fillStyle = '#0D1115';
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 38);
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = 'rgba(241,239,230,0.44)';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 38);
        ctx.stroke();

        // Inner dark glass display
        const sg = ctx.createLinearGradient(0, -ph / 2 + 14, 0, ph / 2 - 14);
        sg.addColorStop(0, '#141A20');
        sg.addColorStop(1, '#0A0E12');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.roundRect(-pw / 2 + 14, -ph / 2 + 14, pw - 28, ph - 28, 28);
        ctx.fill();

        // Top hardware speaker/camera island
        ctx.fillStyle = '#06080A';
        ctx.beginPath();
        ctx.roundRect(-42, -ph / 2 + 26, 84, 18, 9);
        ctx.fill();

        // Clean neutral ivory header + tiny solid lime status dot (zero green neon header!)
        ctx.fillStyle = LIME;
        ctx.beginPath();
        ctx.arc(-56, -ph / 2 + 73, 4.5, 0, Math.PI * 2);
        ctx.fill();
        setFont(ctx, MN(14, 700), 2);
        ctx.fillStyle = IVORY;
        ctx.textAlign = 'center';
        ctx.fillText('ASISTEN AI', 8, -ph / 2 + 78);

        // User prompt bubble
        const kMsg = E.outQuint(inv(A.kemudahan - 0.15, A.kemudahan + 0.25, t));
        if (kMsg > 0) {
          ctx.save();
          ctx.globalAlpha *= kMsg;
          ctx.fillStyle = 'rgba(241,239,230,0.10)';
          ctx.strokeStyle = HAIRLINE;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(-pw / 2 + 30, -135, pw - 60, 58, 10);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = IVORY;
          setFont(ctx, MN(13, 400), 0.5);
          ctx.textAlign = 'left';
          ctx.fillText('Tanya AI...', -pw / 2 + 46, -101);
          ctx.restore();
        }

        // AI response card: Dark matte slate plate + neutral ivory hairline + SOLID matte #C8F53C header bar (#11120E ink)!
        // ZERO green outline box!
        const kAi = E.outQuint(inv(A.ai - 0.15, A.ai + 0.25, t));
        if (kAi > 0) {
          ctx.save();
          ctx.globalAlpha *= kAi;
          const cx0 = -pw / 2 + 30, cy0 = -56, cw0 = pw - 60, ch0 = 156;
          ctx.fillStyle = '#0F151B';
          ctx.beginPath();
          ctx.roundRect(cx0, cy0, cw0, ch0, 10);
          ctx.fill();
          ctx.strokeStyle = 'rgba(241,239,230,0.22)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Solid matte #C8F53C header bar clipped cleanly to top of card
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(cx0, cy0, cw0, ch0, 10);
          ctx.clip();
          ctx.fillStyle = LIME;
          ctx.fillRect(cx0, cy0, cw0, 38);
          ctx.restore();

          setFont(ctx, MN(13, 700), 1.4);
          ctx.fillStyle = DARK_INK;
          ctx.textAlign = 'center';
          ctx.fillText('KEMUDAHAN AI', 0, cy0 + 24);

          // Crisp neutral ivory reply skeleton lines
          ctx.fillStyle = 'rgba(241,239,230,0.52)';
          ctx.fillRect(cx0 + 18, cy0 + 58, cw0 - 36, 8);
          ctx.fillStyle = 'rgba(241,239,230,0.34)';
          ctx.fillRect(cx0 + 18, cy0 + 78, cw0 - 54, 8);
          ctx.fillRect(cx0 + 18, cy0 + 98, cw0 - 76, 8);
          ctx.fillStyle = 'rgba(241,239,230,0.22)';
          ctx.fillRect(cx0 + 18, cy0 + 118, cw0 - 98, 8);
          ctx.restore();
        }

        // Subtle crisp neutral-ivory touch ripple (zero neon green ring!)
        const sTap = t - (A.ai + 0.12);
        if (sTap > 0 && sTap < 0.85) {
          const kt = sTap / 0.85;
          ctx.strokeStyle = `rgba(241,239,230,${0.72 * (1 - kt)})`;
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.arc(0, 24, 12 + 62 * E.outCubic(kt), 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(241,239,230,0.16)';
        ctx.beginPath();
        ctx.roundRect(-pw / 2 + 30, 148, pw - 60, 42, 21);
        ctx.fill();
        ctx.fillStyle = 'rgba(241,239,230,0.58)';
        ctx.fillRect(-44, ph / 2 - 28, 88, 5);
        ctx.textAlign = 'left';
        ctx.restore();

        txt(ctx, 'tiap kemudahan AI selalu punya', -20, -295, t, A.selalu - 0.15, SRF(50), {
          align: 'center', col: ivo(0.92),
        });
        markLine(ctx, '', 'JEJAK FISIK', '', -20, -125, t, A.jejak - 0.22, A.jejak - 0.08, DSP(165));
        txt(ctx, 'DI SEKITAR KITA · LISTRIK, KABEL, PIPA, AIR', -20, -50, t, A.fisik + 0.08, MN(19, 700), {
          align: 'center', ls: 3, col: ivo(0.86),
        });
      },
    },
  ];

  ST.forEach((s) => {
    s.world = (ctx, t, pr, foc, items, c) => {
      if (ST[c.i] === s) {
        items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawBackdrop(ctx, t) });
      }
    };
  });

  function over(o, t) {
    kreditLatar(o, W, H, BG_PLATES, t, false);
  }

  return makeChapter({
    B,
    ST,
    load,
    over,
    gate: true,
    label: 'PUNCAK · JEJAK FISIK DI BALIK LAYAR',
  });
}
