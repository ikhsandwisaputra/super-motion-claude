// Tes 3 dtk · batam-swro-data-center · V2: dua medan warna (gelap server -> terang lab air), snap->hold tegas, WebGL2 ripple/caustic.
// Stasiun 0 (0.0–2.45 s): Ruang server gelap + katup awan meneteskan aliran ke pipa + Rp600 Miliar (BP Batam).
// Stasiun 1 (2.45–7.2 s): Dunia terang lab desalinasi (ΔE tinggi, kontras tinggi) + membran tekanan SWRO (35.000 -> 300 LPS + 70.000 ppm brine).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter,
  loadImg, fall, markLine, srcTag, txt, countTo, fmt, grainRect, rnd, theme } from './kit.js';
import { makeWaterGL } from './watergl.js';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 110 deterministic water/salt particles confined cleanly inside lower fluid band
const PARTICLES = (() => {
  const rng = mulberry32(20261118);
  return Array.from({ length: 110 }, (_, i) => ({
    salt: i % 2 === 1,
    y0: -18 + rng() * 146,
    phase: rng(),
    speed: 0.36 + rng() * 0.22,
    r: i % 2 === 1 ? 5.0 + rng() * 2.6 : 4.2 + rng() * 2.0,
    wob: rng() * Math.PI * 2,
  }));
})();

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};
  let waterGL = null;

  async function load() {
    IM.server = await loadImg('../assets/shared/foto/server_room.jpg', 1920);
    IM.plant = await loadImg('../assets/shared/cc/commons-reverse-osmosis-desalination-plant.jpg', 1920);
    waterGL = makeWaterGL(960, 540);
  }

  // Colour-script full-bleed background:
  // - Stasiun 0 (t < A.masuk): dark server world (#0B0C09)
  // - Stasiun 1 (t >= A.masuk): bright architectural daylight lab (#EAE7DC) over softly graded desalination plant photo!
  function fullBleedBg(ctx, t) {
    const kLight = E.outCubic(inv(A.masuk - 0.18, A.masuk + 0.18, t));
    // Set global kit theme smoothly when entering bright lab so post() vignette matches
    theme(kLight > 0.5);

    if (kLight < 1 && IM.server) {
      const u = inv(0, A.masuk, t);
      const s = Math.max(W / IM.server.width, H / IM.server.height) * lerp(1.03, 1.05, u);
      const w = IM.server.width * s, h = IM.server.height * s;
      const x = (W - w) / 2, y = (H - h) / 2;
      ctx.save();
      ctx.globalAlpha = 1 - kLight;
      ctx.filter = 'saturate(.44) contrast(1.12) brightness(.72)';
      ctx.drawImage(IM.server, x, y, w, h);
      ctx.fillStyle = 'rgba(9,15,20,0.58)';
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    if (kLight > 0 && IM.plant) {
      const u = inv(A.masuk, 7.2, t);
      const s = Math.max(W / IM.plant.width, H / IM.plant.height) * lerp(1.03, 1.045, u);
      const w = IM.plant.width * s, h = IM.plant.height * s;
      const x = (W - w) / 2, y = clamp(H / 2 - 0.48 * h, H - h, 0);
      ctx.save();
      ctx.globalAlpha = kLight;
      ctx.filter = 'saturate(.25) contrast(1.04) brightness(1.08)';
      ctx.drawImage(IM.plant, x, y, w, h);
      // High-key warm ivory architectural veil (#E7E4D8) -> ~84% light field so ΔE vs dark Hook > 55!
      ctx.fillStyle = 'rgba(231,228,216,0.82)';
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    grainRect(ctx, 0, 0, W, H, t, kLight > 0.5 ? 0.10 : 0.20);

    // WebGL2 Worley caustic + closed-form pressure ripple: active during water motion bursts, gentle on holds
    if (waterGL) {
      const rippleT = t >= A.tekan ? t - A.tekan : -1;
      const isHold = t > A.tekan + 1.35 || (t > A.rp600 + 0.45 && t < A.masuk - 0.25);
      const cAmt = isHold ? 0.14 : 0.38;
      const glCanvas = waterGL(t, rippleT, 0.50, 0.50, cAmt);
      if (glCanvas) {
        ctx.save();
        ctx.globalCompositeOperation = kLight > 0.5 ? 'multiply' : 'screen';
        ctx.globalAlpha = kLight > 0.5 ? 0.26 : 0.65;
        ctx.drawImage(glCanvas, 0, 0, W, H);
        ctx.restore();
      }
    }
  }

  function drawPipeWorld(ctx, t, pr, items) {
    items.push({
      z: 1300, x: 0, d: 2400,
      f: () => {
        const zMarks = [200, 700, 1200, 1700, 2200];
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.filter = 'none';
        for (let i = 0; i < zMarks.length - 1; i++) {
          const p0 = pr(0, 120, zMarks[i]), p1 = pr(0, 120, zMarks[i + 1]);
          if (p0.z < 120 || p1.z < 120) continue;
          const fog = clamp(1.1 - p0.z / 7500);
          ctx.strokeStyle = `rgba(241,239,230,${0.18 * fog})`;
          ctx.lineWidth = Math.max(2, 18 * p0.s);
          ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
          ctx.strokeStyle = `rgba(200,245,60,${0.25 * fog})`;
          ctx.lineWidth = Math.max(1.5, 4 * p0.s);
          ctx.beginPath(); ctx.ellipse(p0.x, p0.y, 44 * p0.s, 14 * p0.s, 0, 0, Math.PI * 2); ctx.stroke();
        }
      },
    });
  }

  // Station 0 (Dark world): Cloud valve opening into physical pipe + big Rp600 MILIAR hero
  function drawCloudValve(ctx, t) {
    const kOpen = spring(t - A.buka, 0.55, 0.36);
    const kIn = E.outQuint(inv(0, 0.40, t));

    ctx.save();
    ctx.globalAlpha = kIn;

    ctx.save();
    ctx.translate(0, -255 + (1 - kIn) * -36);
    const cg = ctx.createLinearGradient(0, -90, 0, 55);
    cg.addColorStop(0, '#F6F4EC');
    cg.addColorStop(1, '#AEB8BE');
    ctx.fillStyle = cg;
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 16;
    ctx.beginPath();
    ctx.arc(-86, -4, 54, Math.PI * 0.5, Math.PI * 1.55);
    ctx.arc(-18, -36, 72, Math.PI * 1.05, Math.PI * 1.92);
    ctx.arc(76, -12, 58, Math.PI * 1.28, Math.PI * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';

    setFont(ctx, MN(16), 3);
    ctx.fillStyle = '#182026';
    ctx.textAlign = 'center';
    ctx.fillText('CLOUD · "AWAN"', 0, -4);
    ctx.restore();

    const gap = 18 * kOpen;
    ctx.fillStyle = '#1B2228';
    ctx.strokeStyle = 'rgba(241,239,230,0.5)';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(-80 - gap, -205, 76, 28, 6); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(4 + gap, -205, 76, 28, 6); ctx.fill(); ctx.stroke();

    ctx.fillStyle = 'rgba(20,30,38,0.85)';
    ctx.strokeStyle = 'rgba(241,239,230,0.32)';
    ctx.lineWidth = 2;
    ctx.fillRect(-26, -177, 52, 130);
    ctx.strokeRect(-26, -177, 52, 130);

    if (kOpen > 0.02) {
      const streamH = 128 * clamp(kOpen);
      const sg = ctx.createLinearGradient(0, -177, 0, -177 + streamH);
      sg.addColorStop(0, LIME);
      sg.addColorStop(1, 'rgba(200,245,60,0.35)');
      ctx.fillStyle = sg;
      ctx.fillRect(-10, -177, 20, streamH);
    }

    markLine(ctx, 'data di awan... butuh ', 'AIR LAUT', '', 0, 26, t, A.awan, A.air, SRF(100), { col: IVORY });
    fall(ctx, 'Rp600 MILIAR', 0, 198, t, A.rp600, DSP(176), { align: 'center', col: IVORY });
    txt(ctx, 'PROYEK DESALINASI SWRO · KABIL, BATAM', 0, 250, t, A.rp600 + 0.12, MN(20), { align: 'center', ls: 3, col: 'rgba(241,239,230,0.78)' });
    srcTag(ctx, 'Sumber: BP Batam & Antara News, 5 Nov 2026', -670, 385, t, 0.35);
    ctx.restore();
  }

  // Station 1 (Bright daylight water lab): Dark obsidian-slate vessel on ivory field (strong ΔE & double-triple type!)
  function drawMembraneChamber(ctx, t) {
    const kEntry = E.outQuint(inv(A.masuk - 0.08, A.masuk + 0.32, t));
    if (kEntry <= 0) return;

    const kPump = E.outQuint(inv(A.pompa, A.pompa + 0.38, t));
    const spTekan = spring(t - A.tekan, 0.52, 0.36);
    const dtT = t - A.tekan;
    const microShakeX = dtT > 0 && dtT < 0.32 ? Math.sin(dtT * 65) * Math.exp(-dtT * 10) * 5 : 0;
    const microShakeY = dtT > 0 && dtT < 0.32 ? Math.cos(dtT * 52) * Math.exp(-dtT * 10) * 3 : 0;

    ctx.save();
    ctx.globalAlpha = kEntry;
    ctx.translate(microShakeX, -14 + microShakeY + (1 - kEntry) * 40);

    // Header badge (dark pill dynamically sized to measured text) + crisp serif subtitle on bright ivory field
    const badgeStr = 'SEA WATER REVERSE OSMOSIS · PEMULIHAN 50%';
    setFont(ctx, MN(17), 4);
    const badgeW = ctx.measureText(badgeStr).width + 56;
    ctx.fillStyle = '#15160F';
    ctx.beginPath(); ctx.roundRect(-badgeW / 2, -315, badgeW, 36, 6); ctx.fill();
    ctx.fillStyle = LIME;
    ctx.textAlign = 'center';
    ctx.fillText(badgeStr, 0, -291);
    txt(ctx, 'Tekanan pompa memisahkan air bersih dari garam pekat', 0, -240, t, A.masuk + 0.12, SRF(38), { align: 'center', col: '#15160F' });
    ctx.textAlign = 'left';

    // Dark precision pressure vessel sitting cleanly on light ground with deep shadow
    const vx = -580, vw = 1160, vy = -170, vh = 335;
    const shellGrad = ctx.createLinearGradient(0, vy, 0, vy + vh);
    shellGrad.addColorStop(0, '#1C2A35');
    shellGrad.addColorStop(0.5, '#0F1820');
    shellGrad.addColorStop(1, '#142029');

    ctx.shadowColor = 'rgba(15,22,28,0.32)';
    ctx.shadowBlur = 46;
    ctx.shadowOffsetY = 20;
    ctx.fillStyle = shellGrad;
    ctx.beginPath(); ctx.roundRect(vx, vy, vw, vh, 22); ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.strokeStyle = 'rgba(21,22,15,0.45)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Vessel interior
    ctx.save();
    ctx.beginPath(); ctx.roundRect(vx + 6, vy + 6, vw - 12, vh - 12, 16); ctx.clip();

    // Left fluid (seawater) & right fluid (clean permeate)
    const leftFluid = ctx.createLinearGradient(vx, 0, 0, 0);
    leftFluid.addColorStop(0, 'rgba(28,64,86,0.55)');
    leftFluid.addColorStop(1, 'rgba(38,84,110,0.42)');
    ctx.fillStyle = leftFluid;
    ctx.fillRect(vx, vy, vw / 2, vh);

    const kClean = E.outCubic(inv(A.lolos, A.lolos + 0.50, t));
    const rightFluid = ctx.createLinearGradient(0, 0, vx + vw, 0);
    rightFluid.addColorStop(0, `rgba(175,215,230,${0.12 + 0.16 * kClean})`);
    rightFluid.addColorStop(1, `rgba(215,238,248,${0.08 + 0.10 * kClean})`);
    ctx.fillStyle = rightFluid;
    ctx.fillRect(0, vy, vx + vw / 2, vh);

    // Top shelf inside vessel
    ctx.fillStyle = 'rgba(9,14,19,0.72)';
    ctx.fillRect(vx, vy, vw, 134);
    ctx.strokeStyle = 'rgba(241,239,230,0.16)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(vx, vy + 134); ctx.lineTo(vx + vw, vy + 134); ctx.stroke();

    // Particle animation (active during motion, slows gently during final hold so hold feels locked & calm)
    const holdDamp = t > A.tekan + 1.4 ? 0.35 : 1.0;
    const flowFactor = (t < A.tekan ? 0.28 : lerp(0.28, 1.0, E.outCubic(inv(A.tekan, A.tekan + 0.55, t)))) * holdDamp;
    const memFlex = 14 * spTekan * Math.exp(-Math.max(0, t - A.tekan) * 1.8);

    ctx.fillStyle = 'rgba(225,244,252,0.90)';
    ctx.beginPath();
    for (const p of PARTICLES) {
      if (p.salt) continue;
      const prog = ((p.phase + t * p.speed * flowFactor) % 1);
      let px = lerp(vx + 135, vx + vw - 35, prog);
      let py = p.y0 + Math.sin(t * 3.5 + p.wob) * 6;
      if (t < A.tekan && px > -14) px = -14 - ((px + 14) % 240);
      ctx.moveTo(px + p.r, py);
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    ctx.fillStyle = 'rgba(241,239,230,0.48)';
    ctx.beginPath();
    for (const p of PARTICLES) {
      if (!p.salt) continue;
      const prog = ((p.phase + t * p.speed * flowFactor) % 1);
      let px, py;
      if (prog < 0.58) {
        const u = prog / 0.58;
        px = lerp(vx + 135, -24 + memFlex, u);
        py = p.y0 + Math.sin(t * 4.2 + p.wob) * 7;
      } else {
        const u = (prog - 0.58) / 0.42;
        px = lerp(-24 + memFlex, -180, u);
        py = lerp(p.y0, 148, E.inCubic(u));
      }
      ctx.moveTo(px + p.r, py);
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    // High-pressure piston head on left
    const pistX = vx + 18 + 44 * kPump + 56 * spTekan;
    const pg = ctx.createLinearGradient(pistX - 70, 0, pistX, 0);
    pg.addColorStop(0, '#232B32');
    pg.addColorStop(0.75, '#4A5966');
    pg.addColorStop(1, '#798A96');
    ctx.fillStyle = pg;
    ctx.fillRect(vx, vy + 10, pistX - vx, vh - 20);
    ctx.fillStyle = LIME;
    ctx.fillRect(pistX - 4, vy + 18, 4, vh - 36);

    // Semipermeable Membrane wall
    ctx.save();
    ctx.translate(memFlex, 0);
    ctx.fillStyle = 'rgba(241,239,230,0.18)';
    ctx.fillRect(-10, vy, 20, vh);
    ctx.strokeStyle = LIME;
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 10]);
    ctx.beginPath(); ctx.moveTo(0, vy + 8); ctx.lineTo(0, vy + vh - 8); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    ctx.restore(); // end vessel clip

    // Manifold pipes
    ctx.fillStyle = '#142029';
    ctx.strokeStyle = 'rgba(21,22,15,0.45)';
    ctx.lineWidth = 2.5;
    ctx.fillRect(-210, vy + vh, 86, 56);
    ctx.strokeRect(-210, vy + vh, 86, 56);
    ctx.fillRect(vx + vw, -38, 66, 76);
    ctx.strokeRect(vx + vw, -38, 66, 76);

    // Numbers: big hero scale (>= 8% H) with stepped rounding so motion blur never blurs digits!
    const kNum = inv(A.tekan, A.tekan + 0.65, t);
    const brineRaw = lerp(35000, 70000, E.outCubic(kNum));
    const brineVal = kNum >= 1 ? 70000 : Math.round(brineRaw / 1000) * 1000;
    const kLps = inv(A.lolos, A.lolos + 0.55, t);
    const lpsVal = kLps >= 1 ? 300 : Math.round(countTo(0, 300, t, A.lolos, 0.55) / 10) * 10;

    setFont(ctx, MN(16), 4);
    ctx.fillStyle = 'rgba(241,239,230,0.78)';
    ctx.textAlign = 'left';
    ctx.fillText('AIR LAUT MASUK', vx + 148, vy + 32);
    setFont(ctx, DSP(92), 1);
    ctx.fillStyle = IVORY;
    ctx.fillText('35.000 PPM', vx + 148, vy + 118);

    setFont(ctx, MN(16), 4);
    ctx.fillStyle = LIME;
    ctx.fillText('50% AIR TAWAR · ≈ 25,9 JT L/HARI', 34, vy + 32);
    setFont(ctx, DSP(114), 1);
    ctx.fillStyle = LIME;
    ctx.fillText(fmt(lpsVal) + ' LPS', 34, vy + 124);

    // Bottom brine gauge on bright field (dark ink for maximum contrast!)
    setFont(ctx, MN(16), 7);
    ctx.fillStyle = '#3B4035';
    ctx.textAlign = 'right';
    ctx.fillText('50% SISA GARAM PEKAT (BRINE)', -230, vy + vh + 28);
    setFont(ctx, DSP(92), 1);
    ctx.fillStyle = '#15160F';
    ctx.fillText(fmt(brineVal) + ' PPM', -230, vy + vh + 112);
    ctx.textAlign = 'left';

    srcTag(ctx, 'Sumber: U.S. DOE & OSTI · BP Batam', -680, 395, t, A.masuk + 0.15);
    txt(ctx, 'Foto: James Grellier / Wikimedia Commons (CC BY-SA 3.0)', 680, 395, t, A.masuk + 0.15, MN(15), { align: 'right', ls: 0.5, col: '#2E3228' });

    ctx.restore();
  }

  const ST = [
    {
      at: 0, x: 0, z: 0, py: -540, yaw: [-1.2, 0.5], dist: [1260, 1210], pitch: 3,
      draw: (ctx, t) => drawCloudValve(ctx, t),
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 0) {
          items.push({ z: 1e6, x: 0, d: 1e9, f: () => fullBleedBg(ctx, t) });
          drawPipeWorld(ctx, t, pr, items);
        }
      },
    },
    {
      at: A.masuk, via: 'push', dur: 0.48, x: 0, z: 2600, py: -540, yaw: [0.8, -0.6], dist: [1240, 1200], pitch: 3,
      draw: (ctx, t) => drawMembraneChamber(ctx, t),
      world: (ctx, t, pr, foc, items, c) => {
        if (c.i === 1) items.push({ z: 1e6, x: 0, d: 1e9, f: () => fullBleedBg(ctx, t) });
      },
    },
  ];

  return makeChapter({ B, ST, load, gate: true, label: 'TES 3 DTK · AWAN → PIPA · MEMBRAN SWRO' });
}
