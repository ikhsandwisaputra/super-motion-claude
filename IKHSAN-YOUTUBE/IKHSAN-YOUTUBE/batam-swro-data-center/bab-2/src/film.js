// Bab 2 · Kenapa "awan" digital justru melenyapkan jutaan liter air?
// Colour script: Awan Terang Singkat (#EAE7DC, 0..12.15 s) -> snap keras ke Ruang Server Panas (#0B0C09, aksen #C8F53C).
// Semua kutipan (Nature evidFull #3, arXiv Feedback Loop, ar5iv 700.000 L evidFull #4, arXiv Sovereign AI), 5 b-roll full-bleed,
// diagram 2-langkah pendinginan + menaraPendingin, gauge 1 kWh -> 1,8-3 L, bar perbandingan dry cooling +25-35%, & cek realita HP AI.
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, TILE, GREY, D2R,
  ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, fmt, theme, rnd,
} from './kit.js';
import { kq, popAt, phone, chip, stamp } from './draw.js';
import { layarFoto, menaraPendingin } from './batam.js';
import { node, cross } from './pustaka/dasar.js';

// Helper: Matte documentary plate (zero neon borders — neutral hairline + optional solid matte accent bar)
function mattePlate(ctx, x, y, w, h, o = {}) {
  const r = o.r ?? 8;
  const fill = o.fill ?? 'rgba(14,16,15,0.88)';
  const hairline = o.hairline ?? 'rgba(241,239,230,0.20)';
  ctx.save();
  if (o.shadow !== false) {
    ctx.shadowColor = o.shadowColor ?? 'rgba(0,0,0,0.48)';
    ctx.shadowBlur = o.shadowBlur ?? 28;
    ctx.shadowOffsetY = o.shadowOffsetY ?? 12;
  }
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  if (o.accent) {
    const aw = o.accentW ?? 4;
    const side = o.accentSide ?? 'left';
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.clip();
    ctx.fillStyle = o.accent;
    if (side === 'left') ctx.fillRect(x, y, aw, h);
    else if (side === 'top') ctx.fillRect(x, y, w, aw);
    else if (side === 'right') ctx.fillRect(x + w - aw, y, aw, h);
    else if (side === 'bottom') ctx.fillRect(x, y + h - aw, w, aw);
    ctx.restore();
  }

  ctx.strokeStyle = hairline;
  ctx.lineWidth = o.lw ?? 1.5;
  ctx.beginPath();
  ctx.roundRect(x + 0.75, y + 0.75, w - 1.5, h - 1.5, Math.max(0, r - 0.75));
  ctx.stroke();
  ctx.restore();
}

// Precision-engineered industrial server axial turbine fan (9 swept airfoil blades, brushed aluminum chassis,
// recessed hex bolts, corner ribs, deep cylindrical shroud, brushed hub + radial screws, heat shimmer & matte status bar)
function drawAxialFan(ctx, cx, cy, r, angle, {
  stopped = false, heat = 0, light = false, rpm = null, t = 0, showStatus = false, statusK = 1,
} = {}) {
  const hw = r * 1.24;
  const ch = r * 0.20;
  const spinRpm = rpm ?? (stopped ? 0 : 1);
  const heatAmt = clamp(heat ?? (stopped ? 1 : 0));

  ctx.save();
  ctx.translate(cx, cy);

  // 1. Subtle rising convection heat-shimmer waves above housing when stalled / overheated
  if (heatAmt > 0.02) {
    ctx.save();
    const nWaves = 5;
    for (let i = 0; i < nWaves; i++) {
      const wx = lerp(-hw * 0.64, hw * 0.64, i / (nWaves - 1));
      const yBot = -hw * 0.94;
      const yTop = -hw * (1.42 + (i % 2) * 0.14);
      const wg = ctx.createLinearGradient(0, yBot, 0, yTop);
      const colRgb = i % 2 === 0 ? '241,239,230' : '212,232,120';
      wg.addColorStop(0, `rgba(${colRgb},0)`);
      wg.addColorStop(0.28, `rgba(${colRgb},${0.38 * heatAmt})`);
      wg.addColorStop(0.75, `rgba(${colRgb},${0.22 * heatAmt})`);
      wg.addColorStop(1, `rgba(${colRgb},0)`);
      ctx.strokeStyle = wg;
      ctx.lineWidth = Math.max(1.8, r * 0.017);
      ctx.lineCap = 'round';
      ctx.beginPath();
      const segs = 16;
      for (let s = 0; s <= segs; s++) {
        const u = s / segs;
        const py = lerp(yBot, yTop, u);
        const px = wx + Math.sin(u * Math.PI * 2.6 - t * 4.4 + i * 1.35) * (r * 0.065) * Math.sin(u * Math.PI);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // Helper: chamfered octagonal-square housing silhouette
  const housingPath = (pad = 0) => {
    const h = hw - pad;
    const c = Math.max(2, ch - pad * 0.6);
    ctx.beginPath();
    ctx.moveTo(-h + c, -h);
    ctx.lineTo(h - c, -h);
    ctx.lineTo(h, -h + c);
    ctx.lineTo(h, h - c);
    ctx.lineTo(h - c, h);
    ctx.lineTo(-h + c, h);
    ctx.lineTo(-h, h - c);
    ctx.lineTo(-h, -h + c);
    ctx.closePath();
  };

  // 2. Outer anodized brushed-metal square/chamfered frame
  ctx.save();
  ctx.shadowColor = light ? 'rgba(15,18,15,0.28)' : 'rgba(0,0,0,0.62)';
  ctx.shadowBlur = r * 0.25;
  ctx.shadowOffsetY = r * 0.11;
  const frameGrad = ctx.createLinearGradient(-hw, -hw, hw, hw);
  if (light) {
    frameGrad.addColorStop(0, '#D7D5CB');
    frameGrad.addColorStop(0.38, '#BDBBB1');
    frameGrad.addColorStop(0.68, '#CECCC2');
    frameGrad.addColorStop(1, '#A3A197');
  } else {
    frameGrad.addColorStop(0, '#31373C');
    frameGrad.addColorStop(0.32, '#1F2327');
    frameGrad.addColorStop(0.64, '#2A3035');
    frameGrad.addColorStop(1, '#14171A');
  }
  housingPath(0);
  ctx.fillStyle = frameGrad;
  ctx.fill();
  ctx.restore();

  // Subtle diagonal brushed-metal sheen bands clipped inside housing
  ctx.save();
  housingPath(0);
  ctx.clip();
  ctx.strokeStyle = light ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.032)';
  ctx.lineWidth = Math.max(2, r * 0.035);
  for (let b = -hw * 1.8; b <= hw * 1.8; b += r * 0.18) {
    ctx.beginPath();
    ctx.moveTo(b, -hw * 1.2);
    ctx.lineTo(b + hw * 1.2, hw * 1.2);
    ctx.stroke();
  }
  ctx.restore();

  // Machined bevel perimeter & recessed flange groove (neutral metallic — ZERO neon)
  housingPath(0.75);
  ctx.strokeStyle = light ? 'rgba(21,22,15,0.28)' : 'rgba(241,239,230,0.22)';
  ctx.lineWidth = Math.max(1.2, r * 0.011);
  ctx.stroke();

  // Top-left crisp machined highlight along upper/left chamfers
  ctx.strokeStyle = light ? 'rgba(255,255,255,0.55)' : 'rgba(241,239,230,0.34)';
  ctx.lineWidth = Math.max(1.2, r * 0.012);
  ctx.beginPath();
  ctx.moveTo(-hw + 1, hw - ch);
  ctx.lineTo(-hw + 1, -hw + ch);
  ctx.lineTo(-hw + ch, -hw + 1);
  ctx.lineTo(hw - ch, -hw + 1);
  ctx.stroke();

  housingPath(r * 0.055);
  ctx.strokeStyle = 'rgba(0,0,0,0.38)';
  ctx.lineWidth = Math.max(1, r * 0.009);
  ctx.stroke();

  // 3. Corner reinforcement ribs & 4 recessed hex mounting bolts
  const boltOff = r * 0.985;
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const bx = sx * boltOff;
    const by = sy * boltOff;

    // Cast-aluminum diagonal & side reinforcement ribs bridging corner boss to shroud collar
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.48)';
    ctx.lineWidth = Math.max(2.5, r * 0.036);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(sx * r * 0.72, sy * hw * 0.91);
    ctx.lineTo(sx * r * 0.62, sy * r * 0.84);
    ctx.moveTo(sx * hw * 0.91, sy * r * 0.72);
    ctx.lineTo(sx * r * 0.84, sy * r * 0.62);
    ctx.stroke();

    ctx.strokeStyle = light ? 'rgba(255,255,255,0.42)' : 'rgba(241,239,230,0.16)';
    ctx.lineWidth = Math.max(1.2, r * 0.014);
    ctx.beginPath();
    ctx.moveTo(sx * r * 0.72 - 1, sy * hw * 0.91 - 1);
    ctx.lineTo(sx * r * 0.62 - 1, sy * r * 0.84 - 1);
    ctx.moveTo(sx * hw * 0.91 - 1, sy * r * 0.72 - 1);
    ctx.lineTo(sx * r * 0.84 - 1, sy * r * 0.62 - 1);
    ctx.stroke();
    ctx.restore();

    // Recessed circular counterbore
    const cbR = r * 0.132;
    ctx.fillStyle = '#0B0D0F';
    ctx.beginPath();
    ctx.arc(bx, by, cbR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = light ? 'rgba(255,255,255,0.5)' : 'rgba(241,239,230,0.20)';
    ctx.lineWidth = Math.max(1, r * 0.009);
    ctx.beginPath();
    ctx.arc(bx, by, cbR, 0.25, Math.PI * 0.85);
    ctx.stroke();

    // Machined stainless hex-socket bolt head
    const bhR = r * 0.092;
    const bg = ctx.createLinearGradient(bx - bhR, by - bhR, bx + bhR, by + bhR);
    bg.addColorStop(0, '#7B848C');
    bg.addColorStop(0.5, '#3E454B');
    bg.addColorStop(1, '#1C2024');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(bx, by, bhR, 0, Math.PI * 2);
    ctx.fill();

    // Precision 6-sided recessed hex socket
    const hexR = r * 0.048;
    ctx.fillStyle = '#090B0D';
    ctx.beginPath();
    for (let k = 0; k < 6; k++) {
      const ha = (k * Math.PI) / 3 + Math.PI / 6;
      const hx = bx + Math.cos(ha) * hexR;
      const hy = by + Math.sin(ha) * hexR;
      if (k === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(241,239,230,0.22)';
    ctx.lineWidth = Math.max(0.8, r * 0.006);
    ctx.stroke();
  }

  // Subtle laser-etched bezel status dot & code (only on hero-scale fans)
  if (r >= 95) {
    ctx.fillStyle = stopped ? '#C8F53C' : 'rgba(241,239,230,0.48)';
    ctx.beginPath();
    ctx.arc(r * 0.68, -hw + r * 0.105, Math.max(3, r * 0.028), 0, Math.PI * 2);
    ctx.fill();
    setFont(ctx, MN(Math.round(r * 0.078), 700), 2);
    ctx.fillStyle = light ? 'rgba(21,22,15,0.45)' : 'rgba(241,239,230,0.34)';
    ctx.textAlign = 'left';
    ctx.fillText('AX-9200 // DC', -r * 0.72, -hw + r * 0.13);
    ctx.textAlign = 'left';
  }

  // 4. Deep cylindrical air-intake shroud collar + dark turbine bore
  const collarGrad = ctx.createLinearGradient(-r * 1.07, -r * 1.07, r * 1.07, r * 1.07);
  collarGrad.addColorStop(0, light ? '#E8E6DC' : '#586068');
  collarGrad.addColorStop(0.45, light ? '#A6A49A' : '#1E2226');
  collarGrad.addColorStop(1, light ? '#C8C6BC' : '#3C434A');
  ctx.fillStyle = collarGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.065, 0, Math.PI * 2);
  ctx.fill();

  // Deep intake cavity background
  const cavGrad = ctx.createRadialGradient(-r * 0.12, -r * 0.12, r * 0.1, 0, 0, r * 1.01);
  cavGrad.addColorStop(0, '#14191D');
  cavGrad.addColorStop(0.65, '#0B0E11');
  cavGrad.addColorStop(1, '#050708');
  ctx.fillStyle = cavGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.005, 0, Math.PI * 2);
  ctx.fill();

  // Clip all interior turbine geometry cleanly inside the cylindrical shroud bore
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.995, 0, Math.PI * 2);
  ctx.clip();

  // Subtle internal thermal depth tint inside cavity when stalled (deep recessed heatsink heat, zero neon border)
  if (heatAmt > 0.02) {
    const hg = ctx.createRadialGradient(0, 0, r * 0.25, 0, 0, r * 0.98);
    hg.addColorStop(0, `rgba(190,132,48,${0.18 * heatAmt})`);
    hg.addColorStop(0.55, `rgba(135,72,28,${0.12 * heatAmt})`);
    hg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = hg;
    ctx.fillRect(-r, -r, r * 2, r * 2);
  }

  // 4 stationary rear motor stator struts visible deep behind the impeller blades
  ctx.save();
  for (let s = 0; s < 4; s++) {
    const sa = (s * Math.PI) / 2 + 0.42;
    ctx.strokeStyle = '#171C20';
    ctx.lineWidth = Math.max(4, r * 0.068);
    ctx.beginPath();
    ctx.moveTo(Math.cos(sa) * r * 0.28, Math.sin(sa) * r * 0.28);
    ctx.quadraticCurveTo(
      Math.cos(sa + 0.22) * r * 0.65,
      Math.sin(sa + 0.22) * r * 0.65,
      Math.cos(sa + 0.12) * r * 1.02,
      Math.sin(sa + 0.12) * r * 1.02
    );
    ctx.stroke();
    ctx.strokeStyle = 'rgba(241,239,230,0.06)';
    ctx.lineWidth = Math.max(1, r * 0.012);
    ctx.stroke();
  }
  ctx.restore();

  // Subtle radial motion-blur arcs when spinning rapidly
  if (spinRpm > 0.2) {
    ctx.save();
    ctx.rotate(angle * 0.85);
    const nArcs = 14;
    for (let m = 0; m < nArcs; m++) {
      const mr = r * lerp(0.42, 0.94, m / (nArcs - 1));
      const a0 = m * 1.73 + (m % 3) * 0.4;
      const span = (0.38 + (m % 4) * 0.16) * spinRpm;
      ctx.strokeStyle = `rgba(216,225,232,${(0.055 + (m % 3) * 0.032) * spinRpm})`;
      ctx.lineWidth = Math.max(1.3, r * 0.022);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 0, mr, a0, a0 + span);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 5. 9 Curved Swept-Airfoil Turbine Blades (asymmetric Bezier impeller geometry, dark-graphite-to-silver)
  ctx.save();
  ctx.rotate(angle);
  const N = 9;
  for (let i = 0; i < N; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / N);

    const bladePath = () => {
      ctx.beginPath();
      ctx.moveTo(r * 0.30, -r * 0.06);
      // Forward-swept convex leading edge
      ctx.bezierCurveTo(r * 0.50, -r * 0.31, r * 0.77, -r * 0.37, r * 0.952, -r * 0.165);
      // Shroud-hugging machined tip clearance arc
      ctx.arc(0, 0, r * 0.965, -0.172, 0.175, false);
      // Concave swept trailing edge tapering back to rotor hub
      ctx.bezierCurveTo(r * 0.76, r * 0.02, r * 0.53, r * 0.05, r * 0.30, r * 0.145);
      ctx.closePath();
    };

    // Depth shadow cast onto recess/neighboring blade
    ctx.save();
    ctx.translate(r * 0.022, r * 0.044);
    bladePath();
    ctx.fillStyle = 'rgba(0,0,0,0.46)';
    ctx.fill();
    ctx.restore();

    // Chordwise metallic graphite-to-silver gradient shading across twisted airfoil
    const bg = ctx.createLinearGradient(r * 0.44, -r * 0.34, r * 0.76, r * 0.18);
    if (stopped) {
      bg.addColorStop(0.0, '#788289');
      bg.addColorStop(0.22, '#4C545C');
      bg.addColorStop(0.62, '#272D32');
      bg.addColorStop(1.0, '#161A1D');
    } else {
      bg.addColorStop(0.0, '#C7CFD5');
      bg.addColorStop(0.18, '#89949D');
      bg.addColorStop(0.55, '#404850');
      bg.addColorStop(1.0, '#1C2126');
    }
    bladePath();
    ctx.fillStyle = bg;
    ctx.fill();

    // Machined specular leading-edge catchlight
    ctx.beginPath();
    ctx.moveTo(r * 0.33, -r * 0.075);
    ctx.bezierCurveTo(r * 0.52, -r * 0.30, r * 0.77, -r * 0.355, r * 0.945, -r * 0.162);
    ctx.strokeStyle = stopped ? 'rgba(241,239,230,0.24)' : 'rgba(241,239,230,0.52)';
    ctx.lineWidth = Math.max(1.1, r * 0.013);
    ctx.stroke();

    // Crisp dark trailing edge definition
    ctx.beginPath();
    ctx.moveTo(r * 0.945, r * 0.165);
    ctx.bezierCurveTo(r * 0.76, r * 0.02, r * 0.53, r * 0.05, r * 0.31, r * 0.145);
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = Math.max(1.0, r * 0.010);
    ctx.stroke();

    ctx.restore();
  }
  ctx.restore();

  // Subtle over-blade radial motion-blur streaks when spinning rapidly (distinct from dead-still stalled state)
  if (spinRpm > 0.25) {
    ctx.save();
    ctx.rotate(angle * 0.92);
    const nStreaks = 10;
    for (let m = 0; m < nStreaks; m++) {
      const mr = r * lerp(0.50, 0.93, m / (nStreaks - 1));
      const a0 = m * 2.17 + (m % 2) * 0.35;
      const span = (0.34 + (m % 3) * 0.20) * spinRpm;
      ctx.strokeStyle = `rgba(226,233,238,${(0.08 + (m % 3) * 0.045) * spinRpm})`;
      ctx.lineWidth = Math.max(1.2, r * 0.016);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 0, mr, a0, a0 + span);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Inner cylindrical shroud shadow ring (gives deep recessed intake wall depth)
  ctx.strokeStyle = 'rgba(0,0,0,0.72)';
  ctx.lineWidth = Math.max(5, r * 0.088);
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.985, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle top-left interior venturi reflection
  ctx.strokeStyle = 'rgba(241,239,230,0.16)';
  ctx.lineWidth = Math.max(1.2, r * 0.014);
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.945, Math.PI * 0.92, Math.PI * 1.62);
  ctx.stroke();

  // 6. Brushed central rotor hub with metallic center cap & radial screws
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.62)';
  ctx.shadowBlur = r * 0.12;
  ctx.shadowOffsetY = r * 0.04;
  const hubR = r * 0.355;
  const hubGrad = ctx.createLinearGradient(-hubR, -hubR, hubR, hubR);
  hubGrad.addColorStop(0, '#5A636B');
  hubGrad.addColorStop(0.45, '#2A3036');
  hubGrad.addColorStop(1, '#14181B');
  ctx.fillStyle = hubGrad;
  ctx.beginPath();
  ctx.arc(0, 0, hubR, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Machined hub outer bevel
  ctx.strokeStyle = 'rgba(241,239,230,0.34)';
  ctx.lineWidth = Math.max(1.2, r * 0.012);
  ctx.beginPath();
  ctx.arc(0, 0, hubR, 0, Math.PI * 2);
  ctx.stroke();

  // Recessed hub step groove
  ctx.strokeStyle = '#0B0D0F';
  ctx.lineWidth = Math.max(2, r * 0.025);
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.285, 0, Math.PI * 2);
  ctx.stroke();

  // Brushed metallic center cap
  const capR = r * 0.255;
  const capGrad = ctx.createLinearGradient(-capR, -capR, capR, capR);
  capGrad.addColorStop(0, '#7A848D');
  capGrad.addColorStop(0.32, '#373E44');
  capGrad.addColorStop(0.66, '#59636B');
  capGrad.addColorStop(1, '#202529');
  ctx.fillStyle = capGrad;
  ctx.beginPath();
  ctx.arc(0, 0, capR, 0, Math.PI * 2);
  ctx.fill();

  // Concentric lathe-turned hairline rings on center cap
  ctx.strokeStyle = 'rgba(255,255,255,0.10)';
  ctx.lineWidth = Math.max(0.8, r * 0.006);
  for (const cr of [0.215, 0.165, 0.115]) {
    ctx.beginPath();
    ctx.arc(0, 0, r * cr, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 6 precision radial micro-screws rotating with hub
  ctx.save();
  ctx.rotate(angle);
  const scDist = r * 0.195;
  const scR = Math.max(1.8, r * 0.023);
  for (let k = 0; k < 6; k++) {
    const ka = (k * Math.PI) / 3;
    const kx = Math.cos(ka) * scDist;
    const ky = Math.sin(ka) * scDist;
    ctx.fillStyle = '#0D1012';
    ctx.beginPath();
    ctx.arc(kx, ky, scR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(241,239,230,0.42)';
    ctx.beginPath();
    ctx.arc(kx - scR * 0.28, ky - scR * 0.28, scR * 0.36, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Center spindle cap
  ctx.fillStyle = '#15191C';
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.072, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(241,239,230,0.34)';
  ctx.lineWidth = Math.max(1, r * 0.009);
  ctx.stroke();

  ctx.restore(); // end cylindrical shroud bore clip

  // Outer machined shroud rim specular highlight (top-left catchlight)
  ctx.strokeStyle = 'rgba(241,239,230,0.46)';
  ctx.lineWidth = Math.max(1.5, r * 0.016);
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.015, -Math.PI * 0.86, -Math.PI * 0.18);
  ctx.stroke();

  // 7. Editorial Status Bar below housing (when showStatus enabled)
  if (showStatus) {
    const sy = hw + r * 0.30;
    const sk = clamp(statusK);
    if (stopped) {
      // Matte solid #C8F53C tag with dark ink #11120E — ZERO neon glow!
      const txtStr = 'STALLED // OVERHEAT';
      const fs = Math.round(Math.max(18, r * 0.145));
      setFont(ctx, MN(fs, 700), 3);
      const tw = ctx.measureText(txtStr).width + fs * 1.7;
      const th = fs * 1.95;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 8;
      ctx.fillStyle = '#C8F53C';
      ctx.fillRect(-tw / 2, sy - th / 2, tw * sk, th);
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      ctx.rect(-tw / 2, sy - th / 2, tw * sk, th);
      ctx.clip();
      setFont(ctx, MN(fs, 700), 3);
      ctx.fillStyle = '#11120E';
      ctx.textAlign = 'center';
      ctx.fillText(txtStr, 0, sy + fs * 0.35);
      ctx.textAlign = 'left';
      ctx.restore();
    } else {
      // Clean matte dark status plate while active
      const txtStr = 'ACTIVE // 4.800 RPM';
      const fs = Math.round(Math.max(17, r * 0.135));
      setFont(ctx, MN(fs, 700), 3);
      const tw = ctx.measureText(txtStr).width + fs * 1.9;
      const th = fs * 1.9;
      mattePlate(ctx, -tw / 2, sy - th / 2, tw, th, {
        r: 4, accent: IVORY, accentSide: 'left', accentW: 4, shadowBlur: 18, shadowOffsetY: 6,
      });
      setFont(ctx, MN(fs, 700), 3);
      ctx.fillStyle = IVORY;
      ctx.textAlign = 'center';
      ctx.fillText(txtStr, 2, sy + fs * 0.35);
      ctx.textAlign = 'left';
    }
  }

  ctx.restore();
}

function drawDroplet(ctx, x, y, r, fill, stroke) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, -1.65 * r);
  ctx.bezierCurveTo(r * 0.55, -r * 0.9, r, -r * 0.45, r, 0);
  ctx.arc(0, 0, r, 0, Math.PI);
  ctx.bezierCurveTo(-r, -r * 0.45, -r * 0.55, -r * 0.9, 0, -1.65 * r);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore();
}

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};
  const VID = {};

  const VID_BG = [
    { vid: 'server_units', t0: A.realita - 0.45, t1: A.hp + 0.45 },
    { vid: 'server_rack', t0: A.hp, t1: A.nature + 0.45 },
    { vid: 'server_room', t0: A.nature, t1: A.tunggu + 0.45 },
    { vid: 'server_units', t0: A.tunggu, t1: A.langkah2 + 0.45 },
    { vid: 'cooling_tower', t0: A.langkah2, t1: A.hilang + 0.45 },
    { vid: 'tanah_retak', t0: A.hilang, t1: A.literKwh + 0.45 },
    { vid: 'server_units', t0: A.literKwh, t1: A.gpt3 + 0.45 },
    { vid: 'server_rack', t0: A.gpt3, t1: A.tanya2 + 0.45 },
    { vid: 'server_units', t0: A.tanya2, t1: A.dry + 0.45 },
    { vid: 'server_rack', t0: A.dry, t1: A.pilihan + 0.45 },
    { vid: 'tanah_retak', t0: A.pilihan, t1: A.hpAi + 0.45 },
    { vid: 'server_room', t0: A.hpAi, t1: 152.0 },
  ];

  async function load() {
    IM.cloudSky = await loadImg('../assets/shared/own/cloud_sky_editorial.jpg', 1920);
    IM.nature = await loadImg('../assets/shared/kutipan/nature-data-centre-water-consumption.png', 1800);
    IM.arxivLoop = await loadImg('../assets/shared/kutipan/arxiv-ai-data-centers-and-the-water-use.png', 1600);
    IM.ar5iv = await loadImg('../assets/shared/kutipan/ar5iv-2304-03271-1introduction.png', 1800);
    IM.arxivSov = await loadImg('../assets/shared/kutipan/arxiv-the-environmental-cost-of-digital.png', 1600);
    for (const nm of ['server_units', 'server_rack', 'server_room', 'cooling_tower', 'tanah_retak']) {
      VID[nm] = await loadVid('../assets/shared/vid/', nm);
    }
  }

  function applyTheme(t) {
    if (t < A.realita) {
      theme(true, { bg: '#EAE7DC', bgrgb: '234,231,220', ink: '#15160F', inkrgb: '21,22,15', vig: 0.14 });
    } else {
      theme(false);
    }
  }

  function worldBg(ctx, t, pr, items, c) {
    if (t < A.realita) {
      items.push({
        z: 1e6, x: 0, d: 1e9,
        f: () => {
          const gr = ctx.createLinearGradient(0, 0, 0, H);
          gr.addColorStop(0, 'rgba(190,218,232,0.18)');
          gr.addColorStop(0.65, 'rgba(234,231,220,0.0)');
          gr.addColorStop(1, 'rgba(220,216,204,0.22)');
          ctx.fillStyle = gr;
          ctx.fillRect(0, 0, W, H);
        },
      });
      // S1 · Full-bleed luminous editorial aerial sky photograph with slow cinematic aerial drift
      if (IM.cloudSky && t >= A.eksp - 0.35) {
        const skyK = E.outCubic(inv(A.eksp - 0.30, A.eksp + 0.20, t));
        const s1d = pr(0, -500, ST[1].z).z;
        items.push({
          z: ST[1].z + 5, x: 0, d: s1d > 100 ? s1d + 5 : 1e8,
          f: () => {
            const im = IM.cloudSky;
            const u = inv(A.eksp - 0.30, A.realita, t);
            // Slow cinematic aerial glide & gentle push across the sunlit cloud sea
            const sc = Math.max(W / im.width, H / im.height) * lerp(1.03, 1.11, u);
            const dw = im.width * sc;
            const dh = im.height * sc;
            const dx = lerp(-26, 26, u);
            const dy = lerp(14, -18, u);
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.filter = 'none';
            ctx.globalAlpha = skyK;
            ctx.drawImage(im, (W - dw) / 2 + dx, (H - dh) / 2 + dy, dw, dh);

            // Whisper-light atmospheric lift at top negative space & lower cumulus strip for razor-crisp dark typography
            const veil = ctx.createLinearGradient(0, 0, 0, H);
            veil.addColorStop(0.0, 'rgba(244,247,250,0.20)');
            veil.addColorStop(0.42, 'rgba(244,247,250,0.02)');
            veil.addColorStop(0.68, 'rgba(240,238,231,0.06)');
            veil.addColorStop(1.0, 'rgba(238,236,228,0.68)');
            ctx.fillStyle = veil;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();
          },
        });
      }
      return;
    }

    items.push({
      z: 1e6, x: 0, d: 1e9,
      f: () => {
        layarFoto(ctx, W, H, VID_BG, t, { IM: VID, dim: 0.64, grain: 0.20 });
      },
    });

    // Subtle 3D architectural floor guide lines in depth space for spatial parallax across cuts
    items.push({
      z: c.tz + 1500, x: 0, d: 3500,
      f: () => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.filter = 'none';
        ctx.strokeStyle = 'rgba(241,239,230,0.11)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (const gx of [-900, 900]) {
          const p0 = pr(gx, 0, Math.max(200, c.tz - 600));
          const p1 = pr(gx, 0, c.tz + 4500);
          if (p0.z > 120 && p1.z > 120) {
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
          }
        }
        ctx.stroke();
      },
    });
  }

  const ST = [
    // S0 · Bright Sky Hook Question (0..5.80 s)
    {
      at: 0, py: -540, yaw: [-1.4, 1.2], dist: [1500, 1430], pitch: 3,
      draw(ctx, t) {
        slab(ctx, 'BAB 2 · PERTANYAAN TERBESARNYA', 0, -290, t, 0.80, { align: 'center' });

        // Left: clean line-art computer chip icon in dark ink on bright #EAE7DC
        const kChip = kq(t, 1.8, 0.45);
        if (kChip > 0) {
          ctx.save();
          ctx.globalAlpha = kChip;
          ctx.translate(-250, -75 + (1 - kChip) * 28);
          ctx.strokeStyle = '#15160F';
          ctx.lineWidth = 4;
          for (let i = 0; i < 6; i++) {
            const p = -75 + (i + 0.5) * 25;
            ctx.beginPath();
            ctx.moveTo(p, -90); ctx.lineTo(p, -118);
            ctx.moveTo(p, 90); ctx.lineTo(p, 118);
            ctx.moveTo(-90, p); ctx.lineTo(-118, p);
            ctx.moveTo(90, p); ctx.lineTo(118, p);
            ctx.stroke();
          }
          ctx.fillStyle = '#F7F5EE';
          ctx.beginPath(); ctx.roundRect(-90, -90, 180, 180, 16); ctx.fill(); ctx.stroke();
          ctx.fillStyle = 'rgba(21,22,15,0.10)';
          ctx.beginPath(); ctx.roundRect(-48, -48, 96, 96, 10); ctx.fill(); ctx.stroke();
          setFont(ctx, MN(20), 2); ctx.fillStyle = '#15160F'; ctx.textAlign = 'center';
          ctx.fillText('CPU', 0, 7);
          ctx.textAlign = 'left';
          ctx.restore();
        }

        // Center connector "=" / "?"
        txt(ctx, '?', 0, -45, t, A.komp0, DSP(120), { align: 'center', col: 'rgba(21,22,15,0.45)' });

        // Right: glass & water droplet ("mandi / minum air?")
        const kDrop = kq(t, 2.9, 0.45);
        if (kDrop > 0) {
          const fillU = E.outCubic(inv(A.minum - 0.3, A.minum + 0.5, t));
          ctx.save();
          ctx.globalAlpha = kDrop;
          ctx.translate(250, -75 + (1 - kDrop) * 28);
          ctx.fillStyle = '#F7F5EE';
          ctx.strokeStyle = '#15160F';
          ctx.lineWidth = 4;
          ctx.beginPath(); ctx.roundRect(-64, -84, 128, 168, 14); ctx.fill(); ctx.stroke();
          const wh = 128 * fillU;
          if (wh > 2) {
            ctx.fillStyle = 'rgba(72,142,182,0.52)';
            ctx.fillRect(-54, 74 - wh, 108, wh);
          }
          drawDroplet(ctx, 0, -28 + (1 - fillU) * -22, 26, '#3C7EA4', '#15160F');
          ctx.restore();
        }

        txt(ctx, 'memangnya komputer perlu mandi atau', 0, 118, t, A.komp0 - 0.1, SRF(56), { align: 'center' });
        markLine(ctx, '', 'MINUM AIR?', '', 0, 260, t, A.minum - 0.2, A.minum + 0.05, DSP(152));
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 0) worldBg(ctx, t, pr, items, c); },
    },

    // S1 · Ekspektasi: "CLOUD" = Full-bleed Luminous Aerial Sky (5.80..12.15 s) -> hard cut at A.realita
    {
      at: A.eksp, via: 'rise', py: -540, yaw: [1.5, -1.2], dist: [1490, 1410], pitch: 3,
      draw(ctx, t) {
        // Upper calm sky negative space: matte charcoal eyebrow + monumental "CLOUD" typography
        slab(ctx, 'EKSPEKTASI KITA', 0, -348, t, A.eksp + 0.05, { align: 'center', size: 22 });
        fall(ctx, '"CLOUD"', 0, -108, t, A.eksp + 0.72, DSP(252), { align: 'center', col: '#141612', stag: 0.025 });

        // Subtle crisp architectural hairline rule beneath "CLOUD" sweeping open on A.cloud
        const kRule = E.outCubic(inv(A.cloud - 0.15, A.cloud + 0.35, t));
        if (kRule > 0.01) {
          ctx.save();
          ctx.fillStyle = 'rgba(20,22,18,0.30)';
          ctx.fillRect(-210 * kRule, -72, 420 * kRule, 2);
          ctx.restore();
        }

        // Clean matte architectural tags drifting gently above the sunlit cumulus horizon (zero circle seams!)
        const drawSkyTag = (code, labelTxt) => {
          setFont(ctx, MN(22, 700), 3);
          const lblW = ctx.measureText(labelTxt).width;
          const tw = Math.max(296, Math.round(lblW + 108));
          const x0 = -tw / 2;
          mattePlate(ctx, x0, -38, tw, 76, {
            r: 6,
            fill: 'rgba(247,245,238,0.93)',
            hairline: 'rgba(20,22,18,0.20)',
            accent: '#15160F',
            accentSide: 'left',
            accentW: 5,
            shadowColor: 'rgba(22,38,54,0.18)',
            shadowBlur: 24,
            shadowOffsetY: 10,
          });
          setFont(ctx, MN(15, 700), 2);
          ctx.fillStyle = 'rgba(20,22,18,0.48)';
          ctx.textAlign = 'left';
          ctx.fillText(code, x0 + 24, 6);
          ctx.fillStyle = 'rgba(20,22,18,0.18)';
          ctx.fillRect(x0 + 58, -16, 1.5, 32);
          setFont(ctx, MN(22, 700), 3);
          ctx.fillStyle = '#141612';
          ctx.textAlign = 'left';
          ctx.fillText(labelTxt, x0 + 76, 8);
        };

        const bob = Math.sin(t * 2.0) * 6;
        popAt(ctx, -310, 72 + bob, t, A.foto - 0.1, () => drawSkyTag('01', 'FOTO & ARSIP'));
        popAt(ctx, 310, 72 - bob, t, A.foto + 0.45, () => drawSkyTag('02', 'OBROLAN AI'));

        markLine(ctx, 'melayang sejuk di ', 'LANGIT BIRU', '', 0, 268, t, A.langit - 0.25, A.langit + 0.45, SRF(62), { col: '#141612' });
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 1) worldBg(ctx, t, pr, items, c); },
    },

    // S2 · HARD SNAP into Hot Night Server Room #0B0C09 (12.15..17.75 s)
    {
      at: A.realita, via: 'cut', lead: 0, pre: 0, py: -540, yaw: [-1.8, 1.0], dist: [1480, 1410], pitch: 3,
      draw(ctx, t) {
        slab(ctx, 'REALITANYA', -700, -230, t, A.realita + 0.02, { lime: true });
        txt(ctx, 'data menumpuk di', -700, -120, t, A.numpuk - 0.1, SRF(56));
        fall(ctx, 'RIBUAN KOMPUTER', -700, 36, t, A.numpuk + 0.2, DSP(152));
        markLine(ctx, 'yang ', 'PANAS', ' · rusak jika kipas mati', -700, 155, t, A.panas - 0.15, A.panas, SRF(58), { align: 'left' });

        // Right: Precision industrial server axial turbine fan -> stalls dead still on A.kipas!
        const kFan = kq(t, A.realita + 0.16, 0.38);
        if (kFan > 0) {
          const stopped = t >= A.kipas;
          const brakeU = E.outCubic(inv(A.kipas, A.kipas + 0.30, t));
          const spinAng = stopped
            ? (A.kipas - A.realita) * 15 + brakeU * 1.15
            : (t - A.realita) * 15;
          const rpm = stopped ? (1 - brakeU) : 1;
          const heat = stopped ? E.outCubic(inv(A.kipas, A.kipas + 0.55, t)) : 0;
          const statusK = stopped ? E.outQuint(inv(A.kipas + 0.04, A.kipas + 0.36, t)) : 1;

          ctx.save();
          ctx.globalAlpha = kFan;
          drawAxialFan(ctx, 470, -35, 148, spinAng, {
            stopped,
            heat,
            light: false,
            rpm,
            t,
            showStatus: true,
            statusK,
          });
          ctx.restore();
        }
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 2) worldBg(ctx, t, pr, items, c); },
    },

    // S3 · Heated HP -> Multiplied 1,000x inside Sealed AI Rack Building (17.75..27.65 s)
    {
      at: A.hp, via: 'whip', py: -540, yaw: [1.8, -1.2], dist: [1520, 1430], pitch: 3,
      draw(ctx, t) {
        const heatU = E.outCubic(inv(A.hpPanas - 0.2, A.hpPanas + 1.2, t));

        // Left: Heated smartphone under blazing sun (clean matte ivory rays + subtle heat shimmer, zero neon wireframe!)
        const kL = kq(t, A.hp + 0.08, 0.45);
        if (kL > 0) {
          ctx.save();
          ctx.globalAlpha = kL;
          ctx.translate(-460, 10);

          // Crisp neutral ivory sun indicator above phone
          ctx.strokeStyle = `rgba(241,239,230,${0.48 + 0.36 * heatU})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, -238, 30, 0, Math.PI * 2);
          for (let i = 0; i < 8; i++) {
            const ang = (i * Math.PI) / 4 + t * 0.35;
            ctx.moveTo(Math.cos(ang) * 42, -238 + Math.sin(ang) * 42);
            ctx.lineTo(Math.cos(ang) * 58, -238 + Math.sin(ang) * 58);
          }
          ctx.stroke();

          // Subtle neutral thermal expansion rings (matte ivory, zero neon green border!)
          for (let r = 0; r < 2; r++) {
            const prg = (t * 0.65 + r * 0.5) % 1;
            ctx.strokeStyle = `rgba(241,239,230,${(1 - prg) * 0.26 * heatU})`;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.roundRect(-95 - prg * 38, -180 - prg * 38, 190 + prg * 76, 360 + prg * 76, 40);
            ctx.stroke();
          }

          phone(ctx, 180, 350);
          // Rising matte temperature meter bar inside phone screen
          ctx.fillStyle = LIME;
          ctx.fillRect(-52, 118 - 140 * heatU, 104, 140 * heatU);
          ctx.restore();
          slab(ctx, '1 HP PANAS · GIM BERAT', -460, 250, t, A.hpPanas - 0.1, { align: 'center' });
        }

        // Center multiplier: x 1.000+
        if (t >= A.kalikan - 0.15) {
          const mult = Math.round(countTo(1, 1000, t, A.kalikan, 0.85));
          txt(ctx, `× ${fmt(mult)}`, -120, 20, t, A.kalikan - 0.15, DSP(112), { align: 'center', col: LIME });
        }

        // Right: Sealed Data Center Rack Matrix (clean matte architectural server cabinet, zero neon dashed box!)
        const kR = kq(t, A.kalikan + 0.2, 0.5);
        if (kR > 0) {
          ctx.save();
          ctx.globalAlpha = kR;
          ctx.translate(390, -10);
          mattePlate(ctx, -270, -195, 540, 390, {
            r: 10, fill: 'rgba(14,16,15,0.92)', hairline: 'rgba(241,239,230,0.22)',
            accent: LIME, accentSide: 'top', accentW: 4,
          });

          // Subtle recessed rack rail guides (neutral steel hairline)
          ctx.strokeStyle = 'rgba(241,239,230,0.10)';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(-252, -172, 504, 348);

          // 3 columns x 6 rows server units batched into 2 paths
          ctx.fillStyle = '#222624';
          ctx.beginPath();
          for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 6; row++) {
              ctx.rect(-232 + col * 160, -142 + row * 50, 142, 36);
            }
          }
          ctx.fill();
          ctx.strokeStyle = 'rgba(241,239,230,0.12)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = LIME;
          ctx.beginPath();
          for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 6; row++) {
              const on = ((Math.floor(t * 4) + col * 3 + row) % 3) !== 0;
              if (on) ctx.rect(-222 + col * 160, -129 + row * 50, 18, 10);
            }
          }
          ctx.fill();

          setFont(ctx, MN(18), 3); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('1 GEDUNG TERTUTUP · RAK AI', 0, -218);
          ctx.textAlign = 'left';
          ctx.restore();

          txt(ctx, 'ribuan rak komputer AI penuh panas', 390, 250, t, A.ribuan, SRF(34), { align: 'center' });
        }
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 3) worldBg(ctx, t, pr, items, c); },
    },

    // S4 · Nature evidFull #3 -> Tone-Layer Lift "1 MW = 25,5 JUTA LITER / TAHUN" (27.65..40.30 s)
    {
      at: A.nature, via: 'push', py: -540, yaw: [-1.5, 1.2], dist: [1500, 1420], pitch: 3,
      draw(ctx, t) {
        if (IM.nature) {
          evid(ctx, IM.nature, -430, -25, 630, t, A.natureOut - 0.15, {
            rot: -2,
            tab: 'NATURE NPJ CLEAN WATER · 2021',
            hl: [[0.042, 0.264, 0.373, 0.062, A.natureOut + 0.05]],
          });
        }
        slab(ctx, '1 PUSAT DATA KECIL · DAYA 1 MW', 340, -185, t, A.mw1 - 0.15, { align: 'center' });

        const val = countTo(0, 25.5, t, A.juta25 - 0.15, 0.9);
        const stepVal = t >= A.juta25 + 0.75 ? 25.5 : Math.round(val * 2) / 2;
        if (t >= A.juta25 - 0.15) {
          txt(ctx, fmt(stepVal, 1), 340, 35, t, A.juta25 - 0.15, DSP(230), { align: 'center', col: IVORY });
        }
        markLine(ctx, '', 'JUTA LITER', ' AIR / TAHUN', 340, 165, t, A.juta25 + 0.35, A.juta25 + 0.7, DSP(72));
        srcTag(ctx, 'Sumber: Nature, 15 Feb 2021', -760, 405, t, A.natureOut);
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 4) worldBg(ctx, t, pr, items, c); },
    },

    // S5 · Pattern Breaker #1: "Kenapa tidak diputar ulang di pipa tertutup?" (40.30..45.20 s)
    {
      at: A.tunggu, via: 'truck', py: -540, yaw: [1.5, -1.0], dist: [1490, 1420], pitch: 3,
      draw(ctx, t) {
        slab(ctx, 'EH, TUNGGU SEBENTAR', 0, -255, t, A.tunggu + 0.05, { align: 'center', lime: true });
        markLine(ctx, 'Kenapa tidak ', 'DIPUTAR ULANG', ' saja?', 0, -110, t, A.tanya1 - 0.1, A.ulang, SRF(70));

        // Closed rectangular pipe circuit with circulating lime coolant pulses
        const kPipe = kq(t, A.tanya1 + 0.1, 0.5);
        if (kPipe > 0) {
          ctx.save();
          ctx.globalAlpha = kPipe;
          ctx.translate(0, 130);
          ctx.strokeStyle = 'rgba(241,239,230,0.45)';
          ctx.lineWidth = 20;
          ctx.beginPath(); ctx.roundRect(-340, -95, 680, 190, 42); ctx.stroke();
          ctx.strokeStyle = '#151B1E';
          ctx.lineWidth = 10;
          ctx.stroke();

          // 4 animated coolant pulses traveling continuously around perimeter
          ctx.fillStyle = LIME;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const u = ((t * 0.42 + i * 0.25) % 1);
            let px, py;
            if (u < 0.35) { px = lerp(-340, 340, u / 0.35); py = -95; }
            else if (u < 0.5) { px = 340; py = lerp(-95, 95, (u - 0.35) / 0.15); }
            else if (u < 0.85) { px = lerp(340, -340, (u - 0.5) / 0.35); py = 95; }
            else { px = -340; py = lerp(95, -95, (u - 0.85) / 0.15); }
            ctx.moveTo(px + 9, py);
            ctx.arc(px, py, 9, 0, Math.PI * 2);
          }
          ctx.fill();

          setFont(ctx, MN(22), 4); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('PIPA TERTUTUP · AIR UTUH?', 0, 8);
          ctx.textAlign = 'left';
          ctx.restore();
        }
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 5) worldBg(ctx, t, pr, items, c); },
    },

    // S6 · Diagram Step 1: Closed Liquid Loop at CPU -> Heat Trapped Inside Building (45.20..58.35 s)
    {
      at: A.langkah1, via: 'whip', py: -540, yaw: [-1.8, 1.2], dist: [1520, 1430], pitch: 3,
      draw(ctx, t) {
        txt(ctx, 'PENDINGINAN DATA CENTER · 2 LANGKAH', 0, -305, t, A.langkah1 + 0.1, MN(22), { align: 'center', ls: 4, col: ivo(0.75) });
        node(ctx, -640, -195, 1, t, A.duaLangkah - 0.1, 42);
        txt(ctx, 'LANGKAH 1 · DEKAT MESIN KOMPUTER', -578, -183, t, A.duaLangkah, MN(24), { ls: 3, col: LIME });

        // Left: CPU / server node block (clean matte documentary plate)
        const kBox = kq(t, A.langkah1 + 0.25, 0.45);
        if (kBox > 0) {
          ctx.save();
          ctx.globalAlpha = kBox;
          ctx.translate(-480, 20);
          mattePlate(ctx, -145, -135, 290, 270, {
            r: 10, accent: IVORY, accentSide: 'left', accentW: 4,
          });
          chip(ctx, 130);
          setFont(ctx, MN(18), 3); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('MESIN KOMPUTER', 0, 168);
          ctx.textAlign = 'left';
          ctx.restore();
        }

        // Center: Closed liquid pipe loop between CPU (-335) and Heat Exchanger (+165)
        const kLoop = kq(t, A.pipaTutup - 0.6, 0.55);
        if (kLoop > 0) {
          ctx.save();
          ctx.globalAlpha = kLoop;
          // Top hot supply pipe + bottom cool return pipe
          ctx.strokeStyle = 'rgba(241,239,230,0.52)';
          ctx.lineWidth = 16;
          ctx.beginPath();
          ctx.moveTo(-335, -35); ctx.lineTo(155, -35);
          ctx.moveTo(155, 75); ctx.lineTo(-335, 75);
          ctx.stroke();

          // Continuous animated coolant beads in closed loop
          ctx.fillStyle = LIME;
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const pTop = lerp(-320, 140, ((t * 0.9 + i / 3) % 1));
            const pBot = lerp(140, -320, ((t * 0.9 + i / 3) % 1));
            ctx.moveTo(pTop + 7, -35); ctx.arc(pTop, -35, 7, 0, Math.PI * 2);
            ctx.moveTo(pBot + 7, 75); ctx.arc(pBot, 75, 7, 0, Math.PI * 2);
          }
          ctx.fill();

          // Heat exchanger block (clean matte plate + solid top lime bar + plate-fin texture, zero neon border!)
          mattePlate(ctx, 155, -100, 150, 240, {
            r: 8, fill: 'rgba(15,20,22,0.92)', accent: LIME, accentSide: 'top', accentW: 4,
          });
          ctx.strokeStyle = 'rgba(241,239,230,0.09)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let fx = 175; fx <= 285; fx += 22) {
            ctx.moveTo(fx, -82); ctx.lineTo(fx, 122);
          }
          ctx.stroke();
          setFont(ctx, MN(16), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('PENUKAR', 230, 12);
          ctx.fillStyle = LIME;
          ctx.fillText('PANAS', 230, 36);
          ctx.fillStyle = IVORY;
          ctx.fillText('MUTER DI PIPA TERTUTUP', -90, -68);
          ctx.fillStyle = LIME;
          ctx.fillText('0% MENGUAP', -90, 118);
          ctx.textAlign = 'left';
          ctx.restore();
        }

        // Right: Sealed building heating up ("supaya tidak jadi oven -> dibuang keluar", matte plate, zero dashed neon!)
        const kOven = kq(t, A.oven - 0.35, 0.45);
        if (kOven > 0) {
          ctx.save();
          ctx.globalAlpha = kOven;
          ctx.translate(545, 20);
          mattePlate(ctx, -185, -135, 370, 270, {
            r: 10, fill: 'rgba(14,16,15,0.92)', accent: LIME, accentSide: 'left', accentW: 5,
          });

          // Crisp solid matte tag inside top-left (symmetrical dynamic width)
          setFont(ctx, MN(14, 700), 2);
          const tagW = Math.round(ctx.measureText('PANAS DI GEDUNG').width + 24);
          ctx.fillStyle = '#C8F53C';
          ctx.fillRect(-156, -108, tagW, 30);
          ctx.fillStyle = '#11120E'; ctx.textAlign = 'left';
          ctx.fillText('PANAS DI GEDUNG', -144, -88);

          // Outward exhaust arrows
          ctx.strokeStyle = 'rgba(241,239,230,0.72)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (const ay of [-45, 8, 61]) {
            const ax = 112 + ((t * 48) % 32);
            ctx.moveTo(ax, ay); ctx.lineTo(ax + 40, ay);
            ctx.moveTo(ax + 30, ay - 8); ctx.lineTo(ax + 40, ay); ctx.lineTo(ax + 30, ay + 8);
          }
          ctx.stroke();

          setFont(ctx, DSP(78), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left';
          ctx.fillText('JADI OVEN?', -156, 46);
          setFont(ctx, MN(15, 700), 1.5); ctx.fillStyle = ivo(0.62);
          ctx.fillText('TERJEBAK DI DALAM RUANG', -156, 92);
          ctx.restore();
          slab(ctx, 'HARUS DIBUANG KELUAR -> LANGKAH 2', 545, 215, t, A.oven + 0.1, { align: 'center', lime: true });
        }
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 6) worldBg(ctx, t, pr, items, c); },
    },

    // S7 · Step 2: Cooling Tower Spray Outside + Sweat Evaporation Analogy (58.35..68.60 s)
    {
      at: A.langkah2, via: 'rise', py: -540, yaw: [1.8, -1.2], dist: [1520, 1430], pitch: 3,
      draw(ctx, t) {
        node(ctx, -640, -310, 2, t, A.langkah2 + 0.1, 40);
        txt(ctx, 'LANGKAH 2 · MENARA PENDINGIN DI LUAR', -580, -298, t, A.langkah2 + 0.15, MN(24), { ls: 3, col: LIME });

        // Left: Hyperboloid spray cutaway linked from Step 1 pipe
        const kTow = kq(t, A.langkah2 + 0.15, 0.5);
        if (kTow > 0) {
          ctx.save();
          ctx.globalAlpha = kTow;
          ctx.translate(-390, 58);
          // Pipe coming from Step 1
          ctx.strokeStyle = 'rgba(241,239,230,0.55)';
          ctx.lineWidth = 14;
          ctx.beginPath(); ctx.moveTo(-340, 65); ctx.lineTo(-140, 65); ctx.stroke();

          // Tower shell
          ctx.fillStyle = 'rgba(16,24,30,0.90)';
          ctx.strokeStyle = 'rgba(241,239,230,0.68)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-165, 175);
          ctx.quadraticCurveTo(-85, 20, -108, -155);
          ctx.lineTo(108, -155);
          ctx.quadraticCurveTo(85, 20, 165, 175);
          ctx.closePath();
          ctx.fill(); ctx.stroke();

          // Spray mist inside + rising steam plume (batched, capped below header!)
          const kSpr = clamp((t - A.semprot + 0.2) / 0.45);
          if (kSpr > 0) {
            ctx.strokeStyle = 'rgba(180,228,245,0.6)';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 8]);
            ctx.beginPath();
            for (let sx = -70; sx <= 70; sx += 28) {
              ctx.moveTo(sx, -15);
              ctx.lineTo(sx * 1.35, 140);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = `rgba(241,239,230,${0.26 * kSpr})`;
            ctx.beginPath();
            for (let i = 0; i < 20; i++) {
              const p = ((t * 0.45 + rnd(i * 13)) % 1);
              const px = (rnd(i * 7) - 0.5) * 140 * (0.6 + p);
              const py = lerp(-145, -265, p);
              const r = 11 + 14 * p;
              ctx.moveTo(px + r, py); ctx.arc(px, py, r, 0, Math.PI * 2);
            }
            ctx.fill();
          }

          setFont(ctx, MN(18), 2); ctx.fillStyle = LIME; ctx.textAlign = 'center';
          ctx.fillText('SEMPROT AIR KE UDARA', 0, 215);
          ctx.textAlign = 'left';
          ctx.restore();
        }

        // Right: Sweat Evaporation Analogy ("mirip keringat di kulit bikin adem", matte plate)
        const kSw = kq(t, A.keringat - 0.15, 0.5);
        if (kSw > 0) {
          ctx.save();
          ctx.globalAlpha = kSw;
          ctx.translate(360, -15);
          mattePlate(ctx, -340, -165, 680, 325, {
            r: 10, accent: IVORY, accentSide: 'left', accentW: 4,
          });

          // Skin surface arc
          ctx.strokeStyle = IVORY;
          ctx.lineWidth = 3.5;
          ctx.beginPath(); ctx.moveTo(-250, 75); ctx.quadraticCurveTo(0, 10, 250, 75); ctx.stroke();

          // Rising droplets + wind lines
          for (let i = -2; i <= 2; i++) {
            const p = ((t * 0.55 + (i + 2) * 0.2) % 1);
            drawDroplet(ctx, i * 86, lerp(50, -65, p), 13 * (1 - p * 0.45), 'rgba(130,202,232,0.82)', null);
          }
          ctx.strokeStyle = 'rgba(241,239,230,0.40)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let w = 0; w < 3; w++) {
            const wy = -85 + w * 30;
            const wx = -220 + ((t * 140 + w * 60) % 240);
            ctx.moveTo(wx, wy); ctx.lineTo(wx + 90, wy);
          }
          ctx.stroke();

          setFont(ctx, MN(18), 3); ctx.fillStyle = ivo(0.75); ctx.textAlign = 'center';
          ctx.fillText('ANALOGI FISIKA · KERINGAT DI KULIT', 0, -122);
          ctx.textAlign = 'left';
          ctx.restore();

          markLine(ctx, 'mirip keringat bikin ', 'ADEM', ' saat menguap', 360, 225, t, A.keringat + 0.15, A.menguap - 0.25, SRF(42));
        }
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 7) worldBg(ctx, t, pr, items, c); },
    },

    // S8 · kajian arXiv 2026 (68.60..73.00 s, 4.40 s >= 2.5 s)
    {
      at: A.kajian, via: 'push', py: -540, yaw: [-1.4, 1.0], dist: [1500, 1430], pitch: 3,
      draw(ctx, t) {
        if (IM.arxivLoop) {
          evid(ctx, IM.arxivLoop, -210, -20, 900, t, A.kajian + 0.05, {
            dark: true,
            rot: -1.4,
            tab: 'KAJIAN ILMIAH · 2026',
            hl: [[0.15, 0.21, 0.71, 0.09, A.kajian + 0.55]],
          });
        }
        stamp(ctx, 'DAMPAK BESAR', 515, 20, t, A.dampak - 0.1, { size: 74, rot: -4 });
        srcTag(ctx, 'Sumber: arXiv, diakses 18 Nov 2026', -760, 405, t, A.kajian + 0.2);
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 8) worldBg(ctx, t, pr, items, c); },
    },

    // S9 · menaraPendingin + 70-90% Menguap Habis -> Hilang dari Sungai/Waduk (73.00..83.60 s)
    {
      at: A.evap, via: 'whip', py: -540, yaw: [1.5, -1.2], dist: [1520, 1430], pitch: 3,
      draw(ctx, t) {
        menaraPendingin(ctx, -235, 45, 0.96, t, A.evap, { steamAt: A.evap + 0.35 });

        txt(ctx, 'AIR YANG DISEDOT MENARA', 495, -225, t, A.evap + 0.1, MN(20), { align: 'center', ls: 3, col: ivo(0.78) });
        const pct = Math.round(countTo(70, 90, t, A.evap + 0.2, 1.1));
        const pctLabel = t >= A.p90 ? '70–90%' : `${pct}%`;
        txt(ctx, pctLabel, 495, -60, t, A.evap + 0.15, DSP(182), { align: 'center', col: IVORY });

        slab(ctx, 'MENGUAP HABIS KE LANGIT', 495, 40, t, A.langitEvap - 0.2, { align: 'center', lime: true });

        if (t >= A.hilang - 0.15) {
          cross(ctx, 240, 175, 28, t, A.hilang - 0.1);
          txt(ctx, 'HILANG DARI SUNGAI / WADUK', 285, 168, t, A.hilang + 0.05, MN(20), { ls: 1.5 });
          txt(ctx, 'TIDAK KEMBALI KE KERAN WARGA', 285, 202, t, A.keran - 0.35, MN(20), { ls: 1.5, col: LIME });
        }

        srcTag(ctx, 'Sumber: arXiv, diakses 18 Nov 2026', -760, 405, t, A.evap + 0.2);
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 9) worldBg(ctx, t, pr, items, c); },
    },

    // S10 · Hot Climate -> kWh Token Meter Explanation (83.60..92.70 s)
    {
      at: A.iklim, via: 'truck', py: -540, yaw: [-1.4, 1.2], dist: [1500, 1420], pitch: 3,
      draw(ctx, t) {
        // Left: Climate Heat Thermometer rising into tropical zone (clean matte documentary plate)
        const kTh = kq(t, A.iklim + 0.05, 0.45);
        if (kTh > 0) {
          const tempU = E.outCubic(inv(A.iklim + 0.2, A.boros + 0.6, t));
          ctx.save();
          ctx.globalAlpha = kTh;
          ctx.translate(-390, -10);
          mattePlate(ctx, -290, -210, 580, 420, {
            r: 10, accent: IVORY, accentSide: 'left', accentW: 5,
          });

          // Thermometer stem & bulb
          ctx.fillStyle = '#0B0C09';
          ctx.strokeStyle = 'rgba(241,239,230,0.65)';
          ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.roundRect(-180, -145, 36, 210, 18); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.arc(-162, 85, 38, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = LIME;
          ctx.beginPath(); ctx.arc(-162, 85, 26, 0, Math.PI * 2); ctx.fill();
          ctx.fillRect(-171, 65 - 185 * tempU, 18, 185 * tempU + 15);

          setFont(ctx, MN(18), 3); ctx.fillStyle = ivo(0.75);
          ctx.fillText('CUACA MAKIN PANAS', -95, -80);
          setFont(ctx, DSP(72), 2); ctx.fillStyle = IVORY;
          ctx.fillText('AIR MENGUAP', -95, 10);
          ctx.fillStyle = LIME;
          ctx.fillText('MAKIN BOROS', -95, 88);
          ctx.restore();
        }

        // Right: kWh Meter / Token Rumah explainer (clean matte documentary plate + solid lime tag, ZERO neon border!)
        const kMeter = kq(t, A.kwh - 0.15, 0.45);
        if (kMeter > 0) {
          ctx.save();
          ctx.globalAlpha = kMeter;
          ctx.translate(390, -10);
          mattePlate(ctx, -290, -210, 580, 420, {
            r: 10, accent: LIME, accentSide: 'left', accentW: 5,
          });

          // Solid matte #C8F53C editorial label bar (dark #11120E ink)
          ctx.fillStyle = '#C8F53C';
          ctx.fillRect(-190, -174, 380, 38);
          setFont(ctx, MN(18, 700), 3); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
          ctx.fillText('METERAN / TOKEN LISTRIK', 0, -149);

          // Recessed digital LCD display window
          ctx.fillStyle = '#090B0A';
          ctx.strokeStyle = 'rgba(241,239,230,0.18)';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.roundRect(-220, -110, 440, 155, 8); ctx.fill(); ctx.stroke();

          setFont(ctx, DSP(116), 2); ctx.fillStyle = IVORY;
          ctx.fillText('1.0 kWh', 0, 8);

          setFont(ctx, MN(22), 2); ctx.fillStyle = ivo(0.88);
          ctx.fillText('KILOWATT-JAM = SATUAN LISTRIK', 0, 108);
          setFont(ctx, SRF(32)); ctx.fillStyle = ivo(0.72);
          ctx.fillText('biasa di meteran rumah kita', 0, 156);
          ctx.textAlign = 'left';
          ctx.restore();
        }
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 10) worldBg(ctx, t, pr, items, c); },
    },

    // S11 · Heat-vs-kWh Gauge (1 kWh -> 1,8-3 L) + arxiv-the-environmental-cost-of-digital (92.70..99.25 s)
    {
      at: A.literKwh, via: 'whip', py: -540, yaw: [1.6, -1.2], dist: [1520, 1430], pitch: 3,
      draw(ctx, t) {
        if (IM.arxivSov) {
          evid(ctx, IM.arxivSov, -420, -25, 660, t, A.literKwh + 0.05, {
            dark: true,
            rot: -1.5,
            tab: 'ARXIV:2607.13443V1 · IKLIM PANAS',
            hl: [[0.17, 0.17, 0.67, 0.26, A.literKwh + 0.65]],
          });
        }

        // Right: Custom Heat-vs-kWh Gauge (1 kWh -> 1,8-3 L)
        const kG = kq(t, A.literKwh + 0.1, 0.45);
        if (kG > 0) {
          const fillU = E.outCubic(inv(A.vol - 0.35, A.vol + 0.85, t));
          ctx.save();
          ctx.globalAlpha = kG;
          ctx.translate(360, 0);

          // Top input pill: 1 kWh -> clean neutral conduit down to cylinder
          slab(ctx, '1 kWh KERJA SERVER · IKLIM PANAS', 0, -265, t, A.satuKwh - 0.15, { align: 'center' });
          ctx.strokeStyle = 'rgba(241,239,230,0.45)';
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(-95, -230); ctx.lineTo(-95, -162); ctx.stroke();
          ctx.fillStyle = LIME;
          ctx.fillRect(-100, -172, 10, 10);

          // Graduated water cylinder (0..4 L) at x = -95, centered y = 30
          const gx = -175, gy = -155, gw = 160, gh = 340;
          mattePlate(ctx, gx, gy, gw, gh, {
            r: 14, fill: 'rgba(13,20,24,0.90)', hairline: 'rgba(241,239,230,0.34)', lw: 2,
          });

          // 1.8 - 3.0 L highlighted band inside cylinder (scale 0..4 L -> y = gy+gh .. gy)
          const y18 = gy + gh - (1.8 / 4) * gh;
          const curL = lerp(0, 3.0, fillU);
          const curY = gy + gh - (curL / 4) * gh;

          ctx.save();
          ctx.beginPath(); ctx.roundRect(gx + 5, gy + 5, gw - 10, gh - 10, 10); ctx.clip();
          ctx.fillStyle = 'rgba(72,150,192,0.58)';
          ctx.fillRect(gx + 5, curY, gw - 10, gy + gh - curY);
          // 1.8 - 3.0 L matte lime band once level reaches >= 1.8
          if (curL > 1.8) {
            ctx.fillStyle = 'rgba(200,245,60,0.52)';
            ctx.fillRect(gx + 5, curY, gw - 10, y18 - curY);
          }
          // Meniscus crisp highlight line
          ctx.fillStyle = IVORY;
          ctx.fillRect(gx + 5, curY, gw - 10, 2.5);
          ctx.restore();

          // Scale ticks (0..4 L) batched in 1 path
          ctx.strokeStyle = 'rgba(241,239,230,0.52)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          setFont(ctx, MN(16), 1); ctx.fillStyle = ivo(0.72); ctx.textAlign = 'right';
          for (let L = 1; L <= 4; L++) {
            const ty = gy + gh - (L / 4) * gh;
            ctx.moveTo(gx - 10, ty); ctx.lineTo(gx + 28, ty);
            ctx.fillText(`${L}L`, gx - 18, ty + 6);
          }
          ctx.stroke();

          // Right hero readout: 1,8-3 L
          ctx.textAlign = 'left';
          setFont(ctx, DSP(136), 1); ctx.fillStyle = LIME;
          ctx.fillText('1,8–3 L', 35, 10);
          setFont(ctx, MN(22), 3); ctx.fillStyle = IVORY;
          ctx.fillText('AIR MENGUAP', 35, 62);
          ctx.fillStyle = ivo(0.72);
          ctx.fillText('PER 1 kWh LISTRIK', 35, 96);

          ctx.restore();
        }

        srcTag(ctx, 'Sumber: arXiv, diakses 18 Nov 2026', -760, 405, t, A.literKwh + 0.15);
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 11) worldBg(ctx, t, pr, items, c); },
    },

    // S12 · ar5iv evidFull #4 -> Tone-Layer Lift "700.000 LITER AIR" (99.25..106.70 s)
    {
      at: A.gpt3, via: 'push', py: -540, yaw: [-1.4, 1.0], dist: [1500, 1420], pitch: 3,
      draw(ctx, t) {
        if (IM.ar5iv) {
          evid(ctx, IM.ar5iv, -450, -15, 560, t, A.gptOut - 0.2, {
            dark: true,
            rot: -2,
            crop: [0.16, 0.10, 0.68, 0.89],
            tab: 'AR5IV:2304.03271',
            hl: [[0.112, 0.710, 0.356, 0.029, A.gptOut - 0.1]],
          });
        }
        slab(ctx, 'LATIH 1 MODEL AI · GENERASI AWAL', 330, -175, t, A.gptOut - 0.1, { align: 'center' });

        const raw700 = countTo(0, 700000, t, A.gptOut, 0.85);
        const val700 = t >= A.gptOut + 0.85 ? 700000 : Math.round(raw700 / 25000) * 25000;
        if (t >= A.gptOut - 0.1) {
          txt(ctx, fmt(val700), 330, 35, t, A.gptOut - 0.1, DSP(205), { align: 'center', col: IVORY });
        }
        markLine(ctx, '', 'LITER AIR', ' MENGUAP', 330, 155, t, A.r700 - 0.15, A.r700 + 0.25, DSP(74));
        srcTag(ctx, 'Sumber: ar5iv, diakses 18 Nov 2026', -760, 405, t, A.gptOut - 0.1);
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 12) worldBg(ctx, t, pr, items, c); },
    },

    // S13 · Pattern Breaker #2: "Kenapa tidak pakai pendingin kering saja?" (106.70..112.35 s)
    {
      at: A.tanya2, via: 'whip', py: -540, yaw: [1.6, -1.2], dist: [1500, 1420], pitch: 3,
      draw(ctx, t) {
        slab(ctx, 'PEMECAH POLA · PERTANYAAN 2', -700, -230, t, A.tanya2 + 0.05, { lime: true });
        txt(ctx, 'Kenapa tidak pakai', -700, -110, t, A.tanya2 + 0.15, SRF(60));
        markLine(ctx, '', 'PENDINGIN KERING', ' saja?', -700, -15, t, A.tanya2 + 0.35, A.tanya2 + 1.0, SRF(56), { align: 'left' });
        txt(ctx, 'KIPAS ANGIN & AC RAKSASA · 0% AIR', -700, 88, t, A.kipas2 - 0.15, MN(24), { ls: 2, col: ivo(0.84) });

        // Right: Precision 2x2 Industrial Dry-Cooling Axial Turbine Fan Array
        const kFan = kq(t, A.tanya2 + 0.15, 0.45);
        if (kFan > 0) {
          ctx.save();
          ctx.globalAlpha = kFan;
          ctx.translate(445, -18);

          // Industrial dry-cooler aluminum condenser cabinet frame (clean matte plate, zero neon!)
          mattePlate(ctx, -236, -236, 472, 472, {
            r: 10, fill: 'rgba(14,16,15,0.92)', hairline: 'rgba(241,239,230,0.22)',
            accent: LIME, accentSide: 'top', accentW: 4,
          });

          // Subtle vertical aluminum radiator heat-sink fins behind the turbine array
          ctx.strokeStyle = 'rgba(241,239,230,0.06)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let fx = -216; fx <= 216; fx += 12) {
            ctx.moveTo(fx, -218); ctx.lineTo(fx, 218);
          }
          ctx.stroke();

          // 2x2 precision swept-airfoil axial turbine fans spinning at high RPM
          const offsets = [[-105, -105], [105, -105], [-105, 105], [105, 105]];
          offsets.forEach(([ox, oy], idx) => {
            drawAxialFan(ctx, ox, oy, 75, (t - A.tanya2) * 13.5 + idx * 0.85, {
              stopped: false, heat: 0, light: false, rpm: 1, t, showStatus: false,
            });
          });

          // Clean industrial array header & matte footer tag
          setFont(ctx, MN(16, 700), 3); ctx.fillStyle = ivo(0.70); ctx.textAlign = 'center';
          ctx.fillText('DRY COOLER ARRAY // 4× AXIAL', 0, -256);

          // Solid matte #C8F53C "0% AIR" block + matte dark plate "100% UDARA & LISTRIK"
          mattePlate(ctx, -236, 256, 472, 44, {
            r: 4, fill: 'rgba(14,16,15,0.90)', hairline: 'rgba(241,239,230,0.20)',
            accent: '#C8F53C', accentSide: 'left', accentW: 134, shadowBlur: 18, shadowOffsetY: 6,
          });
          setFont(ctx, MN(18, 700), 2); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
          ctx.fillText('0% AIR', -169, 285);
          ctx.fillStyle = IVORY;
          ctx.fillText('100% UDARA & LISTRIK', 68, 285);
          ctx.textAlign = 'left';
          ctx.restore();
        }
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 13) worldBg(ctx, t, pr, items, c); },
    },

    // S14 · Dry vs Wet Cooling Comparison Bar (+25-35% power penalty, 112.35..123.80 s)
    {
      at: A.dry, via: 'rise', py: -540, yaw: [-1.4, 1.0], dist: [1520, 1430], pitch: 3,
      draw(ctx, t) {
        txt(ctx, 'PERBANDINGAN KONSUMSI LISTRIK PENDINGINAN', 0, -305, t, A.dry + 0.1, MN(22), { align: 'center', ls: 4, col: ivo(0.75) });

        const kBar = kq(t, A.dry + 0.15, 0.45);
        const kPen = E.outCubic(inv(A.p35 - 0.15, A.p35 + 0.75, t));
        if (kBar > 0) {
          const x0 = -680, baseW = 740, penW = 260 * kPen;
          ctx.save();
          ctx.globalAlpha = kBar;

          // Baseline axis
          ctx.fillStyle = ivo(0.38);
          ctx.fillRect(x0 - 2, -210, 2.5, 355);

          // Row 1: Wet / Evaporative Cooling (100%)
          setFont(ctx, MN(22), 3); ctx.fillStyle = ivo(0.8);
          ctx.fillText('PENDINGIN AIR (EVAPORATIVE)', x0, -172);
          ctx.fillStyle = 'rgba(25,28,24,0.92)';
          ctx.strokeStyle = 'rgba(241,239,230,0.26)';
          ctx.lineWidth = 1.5;
          const w1 = baseW * E.outCubic(inv(A.dry + 0.2, A.dry + 0.85, t));
          ctx.fillRect(x0, -152, w1, 92);
          ctx.strokeRect(x0, -152, w1, 92);
          setFont(ctx, DSP(74), 1); ctx.fillStyle = IVORY;
          ctx.fillText('100%', x0 + w1 + 24, -84);

          // Row 2: Dry Cooling (100% + 25-35% penalty in solid matte LIME block!)
          setFont(ctx, MN(22), 3); ctx.fillStyle = LIME;
          ctx.fillText('PENDINGIN KERING (TANPA AIR)', x0, 8);
          ctx.fillStyle = 'rgba(25,28,24,0.92)';
          ctx.strokeStyle = 'rgba(241,239,230,0.26)';
          ctx.fillRect(x0, 28, w1, 92);
          ctx.strokeRect(x0, 28, w1, 92);
          if (penW > 2) {
            ctx.fillStyle = '#C8F53C';
            ctx.fillRect(x0 + w1, 28, penW, 92);
          }
          setFont(ctx, DSP(88), 1); ctx.fillStyle = LIME;
          if (kPen > 0.05) ctx.fillText('+25–35% LISTRIK', x0 + w1 + penW + 24, 102);

          ctx.restore();
        }

        // Indonesia tropical heat electricity surge callout
        slab(ctx, 'INDONESIA · IKLIM TROPIS PANAS', -680, 225, t, A.indo - 0.1);
        markLine(ctx, 'tagihan listrik bakal ', 'MELEDAK', '', -680, 310, t, A.indo + 0.3, A.indo + 1.1, SRF(58), { align: 'left' });

        srcTag(ctx, 'Sumber: arXiv, diakses 18 Nov 2026', -760, 405, t, A.dry + 0.2);
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 14) worldBg(ctx, t, pr, items, c); },
    },

    // S15 · Batam Bukan Satu-Satunya: Pilihan Sulit (123.80..128.00 s)
    {
      at: A.pilihan, via: 'truck', py: -540, yaw: [1.5, -1.0], dist: [1500, 1420], pitch: 3,
      draw(ctx, t) {
        txt(ctx, 'BATAM BUKAN SATU-SATUNYA KOTA', 0, -255, t, A.pilihan + 0.08, MN(24), { align: 'center', ls: 4, col: ivo(0.8) });

        popAt(ctx, -350, -10, t, A.pilihan + 0.35, () => {
          mattePlate(ctx, -275, -125, 550, 250, {
            r: 10, accent: IVORY, accentSide: 'left', accentW: 5,
          });
          setFont(ctx, MN(20), 3); ctx.fillStyle = ivo(0.75); ctx.textAlign = 'center';
          ctx.fillText('PAKAI AIR', 0, -52);
          setFont(ctx, DSP(92), 1); ctx.fillStyle = IVORY;
          ctx.fillText('70–90% MENGUAP', 0, 46);
          ctx.textAlign = 'left';
        });

        popAt(ctx, 350, -10, t, A.pilihan + 0.85, () => {
          mattePlate(ctx, -275, -125, 550, 250, {
            r: 10, accent: LIME, accentSide: 'left', accentW: 5,
          });
          // Crisp solid matte #C8F53C tag (dark ink #11120E, zero neon border!)
          ctx.fillStyle = '#C8F53C';
          ctx.fillRect(-92, -84, 184, 36);
          setFont(ctx, MN(19, 700), 3); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
          ctx.fillText('TANPA AIR', 0, -59);
          setFont(ctx, DSP(92), 1); ctx.fillStyle = IVORY;
          ctx.fillText('+25–35% LISTRIK', 0, 48);
          ctx.textAlign = 'left';
        });

        markLine(ctx, 'menghadapi ', 'PILIHAN SULIT', '', 0, 245, t, A.pilihan + 1.6, A.pilihan + 2.2, SRF(68));
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 15) worldBg(ctx, t, pr, items, c); },
    },

    // S16 · Global Cases (Uruguay, Belanda, Irlandia) + arxiv-the-environmental-cost-of-digital (128.00..139.95 s)
    {
      at: A.global, via: 'whip', py: -540, yaw: [-1.4, 1.0], dist: [1520, 1430], pitch: 3,
      draw(ctx, t) {
        const cases = [
          { y: -195, at: A.uruguay, country: 'URUGUAY', desc: 'Google ubah desain · kekeringan 7 dekade', hot: true, tag: 'DESAIN DIUBAH' },
          { y: -10, at: A.belanda, country: 'BELANDA', desc: 'Menahan izin pembangunan pusat data baru', hot: false },
          { y: 175, at: A.irlandia + 0.35, country: 'IRLANDIA', desc: 'Menahan izin · tekanan air dan listrik', hot: false },
        ];
        for (const cs of cases) {
          const kc = kq(t, cs.at - 0.1, 0.42);
          if (kc <= 0) continue;
          ctx.save();
          ctx.globalAlpha = kc;
          ctx.translate(-400, cs.y + (1 - kc) * 28);
          // Clean matte documentary plate — neutral hairline on ALL cards + crisp flush 5px left bar (ZERO neon outline!)
          mattePlate(ctx, -360, -72, 720, 144, {
            r: 8, accent: cs.hot ? LIME : IVORY, accentSide: 'left', accentW: 5,
          });
          setFont(ctx, DSP(62), 2); ctx.fillStyle = cs.hot ? LIME : IVORY;
          ctx.fillText(cs.country, -326, -2);
          if (cs.tag) {
            setFont(ctx, MN(14, 700), 2);
            const tw = ctx.measureText(cs.tag).width + 26;
            ctx.fillStyle = '#C8F53C';
            ctx.fillRect(334 - tw, -48, tw, 30);
            ctx.fillStyle = '#11120E';
            ctx.textAlign = 'center';
            ctx.fillText(cs.tag, 334 - tw / 2, -28);
            ctx.textAlign = 'left';
          }
          setFont(ctx, MN(18), 0.5); ctx.fillStyle = ivo(0.84);
          ctx.fillText(cs.desc, -326, 42);
          ctx.restore();
        }

        if (IM.arxivSov) {
          evid(ctx, IM.arxivSov, 425, -25, 650, t, A.global + 0.15, {
            dark: true,
            rot: 2,
            tab: 'RISET GLOBAL · ARXIV',
            hl: [[0.17, 0.17, 0.67, 0.26, A.global + 0.9]],
          });
        }

        srcTag(ctx, 'Sumber: arXiv, diakses 18 Nov 2026', -760, 405, t, A.global + 0.2);
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 16) worldBg(ctx, t, pr, items, c); },
    },

    // S17 · Phone AI Reality Check ("Artinya buat kamu", 139.95..149.25 s)
    {
      at: A.hpAi, via: 'push', py: -540, yaw: [1.4, -0.8], dist: [1500, 1420], pitch: 3,
      draw(ctx, t) {
        slab(ctx, 'ARTINYA BUAT KAMU', 0, -295, t, A.hpAi + 0.08, { align: 'center', lime: true });

        // Left: Phone AI prompt
        const kL = kq(t, A.hpAi + 0.2, 0.45);
        if (kL > 0) {
          ctx.save();
          ctx.globalAlpha = kL;
          ctx.translate(-470, -40);
          phone(ctx, 175, 330);
          setFont(ctx, MN(19), 3); ctx.fillStyle = LIME; ctx.textAlign = 'center';
          ctx.fillText('AI DI LAYAR HP', 0, 210);
          ctx.textAlign = 'left';
          ctx.restore();
        }

        // Connecting data-to-water beam
        const kBeam = E.outCubic(inv(A.layarHp - 0.5, A.layarHp + 0.3, t));
        if (kBeam > 0) {
          ctx.save();
          ctx.strokeStyle = 'rgba(241,239,230,0.42)';
          ctx.lineWidth = 3.5;
          ctx.setLineDash([12, 10]);
          ctx.beginPath(); ctx.moveTo(-330, -40); ctx.lineTo(lerp(-330, 315, kBeam), -40); ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = LIME;
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const px = lerp(-310, 295, ((t * 0.85 + i / 3) % 1));
            ctx.moveTo(px + 7, -40); ctx.arc(px, -40, 7, 0, Math.PI * 2);
          }
          ctx.fill();
          ctx.restore();
        }

        // Right: Physical city reservoir / water droplet plate (clean matte plate + real water gradient, ZERO neon box!)
        const kR = kq(t, A.layarHp - 0.15, 0.45);
        if (kR > 0) {
          ctx.save();
          ctx.globalAlpha = kR;
          ctx.translate(470, -40);
          mattePlate(ctx, -160, -165, 320, 330, {
            r: 12, fill: 'rgba(14,16,15,0.90)', accent: LIME, accentSide: 'top', accentW: 4,
          });

          // Subtle architectural reservoir level graduation ticks inside plate
          ctx.strokeStyle = 'rgba(241,239,230,0.12)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let gy = -80; gy <= 105; gy += 37) {
            ctx.moveTo(-132, gy); ctx.lineTo(-104, gy);
            ctx.moveTo(104, gy); ctx.lineTo(132, gy);
          }
          ctx.stroke();

          // Micro header inside reservoir plate
          setFont(ctx, MN(13, 700), 3); ctx.fillStyle = ivo(0.55); ctx.textAlign = 'center';
          ctx.fillText('WADUK · SUNGAI', 0, -126);

          // Sculpted physical oceanic-blue water droplet with crisp specular highlight
          const dropGrad = ctx.createLinearGradient(-40, -90, 48, 80);
          dropGrad.addColorStop(0, '#6BC0E6');
          dropGrad.addColorStop(0.45, '#337EA6');
          dropGrad.addColorStop(1, '#163B52');
          drawDroplet(ctx, 0, 12, 60, dropGrad, 'rgba(241,239,230,0.38)');

          // Crisp soft specular crescent on droplet shoulder
          ctx.strokeStyle = 'rgba(241,239,230,0.55)';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(-10, 14, 42, Math.PI * 0.72, Math.PI * 1.12);
          ctx.stroke();

          setFont(ctx, MN(19), 3); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('AIR NYATA DI KOTA', 0, 210);
          ctx.textAlign = 'left';
          ctx.restore();
        }

        markLine(ctx, 'setiap layanan AI murah memakai ', 'AIR NYATA', '', 0, 290, t, A.hpAi + 0.9, A.airNyata - 0.15, SRF(60));
      },
      world: (ctx, t, pr, foc, items, c) => { if (c.i === 17) worldBg(ctx, t, pr, items, c); },
    },
  ];

  let FULLS;
  const scene = makeChapter({
    B, ST, load, gate: true, label: 'BAB 2 · AWAN VS AIR',
    full: () => FULLS ??= [
      {
        im: IM.nature,
        t0: A.nature + 0.05,
        t1: A.natureOut,
        dir: 1,
        tab: 'Sumber: Nature, 15 Feb 2021',
        hl: [
          [0.194, 0.228, 0.152, 0.026, A.nature + 0.70],
          [0.042, 0.264, 0.373, 0.062, A.natureWord],
        ],
      },
      {
        im: IM.ar5iv,
        t0: A.gpt3,
        t1: A.gptOut,
        dir: -1,
        dark: true,
        crop: [0.16, 0.10, 0.68, 0.89],
        tab: 'Sumber: ar5iv, diakses 18 Nov 2026',
        hl: [
          [0.220, 0.675, 0.292, 0.029, A.gpt3 + 1.35],
          [0.112, 0.710, 0.356, 0.029, A.gpt3 + 2.55],
        ],
      },
    ],
  });

  const baseDraw = scene.draw;
  scene.draw = (ctx, t) => {
    applyTheme(t);
    return baseDraw(ctx, t);
  };
  return scene;
}
