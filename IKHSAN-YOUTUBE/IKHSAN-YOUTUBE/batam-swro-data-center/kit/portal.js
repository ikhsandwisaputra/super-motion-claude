// Portal Modern "Lensa Iris Tekanan & Meniskus Air" (3D Optical Aperture Dive) antar bab — batam-swro-data-center.
// Pengganti rahang datar lama: 6 bilah iris optik berlapis dengan cincin kalibrasi tekanan (0..60 BAR · SWRO),
// efek kilau refraksi lensa & pusaran optik, lalu kamera MENYELAM menembus bukaan tengah menuju bab berikutnya.
// Nol neon/glow murahan — aksen #C8F53C murni dipakai sebagai blok tag editorial padat bertinta gelap (#11120E).
import { W, H, clamp, inv, lerp, E } from './engine.js';

const LIME = '#C8F53C';
const LIME_INK = '#11120E';
const IVORY = '#F1EFE6';

const PART = [
  ['PENGANTAR', 'CLOUD & LAUT', 'kenapa data center butuh air laut?'],
  ['PETA', '4 PERTANYAAN', 'membongkar krisis hingga solusi air laut'],
  ['BAB 01', '1', 'kota tanpa sungai yang kehabisan air'],
  ['BAB 02', '2', 'kenapa server melenyapkan jutaan liter air?'],
  ['BAB 03', '3', 'memeras air laut di Kabil'],
  ['BAB 04', '4', 'harga tersembunyi di balik air tawar'],
  ['PUNCAK', 'JEJAK FISIK', 'di balik kemudahan AI di layar kita'],
  ['PENUTUP', 'GILIRANMU', 'opini, syarat terbuka & diskusi'],
];

function drawOpticalIris(o, openAmt, label, rotPhase, a = 1) {
  // openAmt: 0 = aperture closed tight on dark optical lens plate, 1 = fully burst open past camera
  const cx = W / 2, cy = H / 2;
  const maxR = Math.hypot(cx, cy) + 80;
  // Non-linear aperture opening: camera bursts forward through the central iris
  const holeR = Math.pow(clamp(openAmt), 1.65) * maxR;
  const bladeRot = rotPhase + openAmt * 0.58;

  o.save();
  o.globalAlpha = a;

  // 1. Subtle radial optical zoom ring around the opening edge while moving
  const moveEnv = Math.sin(clamp(openAmt) * Math.PI);
  if (moveEnv > 0.02 && holeR > 24 && holeR < maxR * 0.96) {
    o.save();
    o.strokeStyle = `rgba(241,239,230,${0.18 * moveEnv})`;
    o.lineWidth = 2;
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2 + bladeRot * 0.35;
      const r0 = holeR + 14;
      const r1 = holeR + 90 + (i % 3) * 48;
      o.beginPath();
      o.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
      o.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      o.stroke();
    }
    o.restore();
  }

  // 2. Outer dark machined slate aperture (clipped outside holeR when opening)
  o.save();
  o.beginPath();
  o.rect(-20, -20, W + 40, H + 40);
  if (holeR > 2) {
    // 6-sided curved iris opening polygon (tactile camera lens / desalination valve iris)
    const sides = 6;
    const pts = [];
    for (let i = 0; i < sides; i++) {
      const ang = bladeRot + (i / sides) * Math.PI * 2;
      pts.push([cx + Math.cos(ang) * holeR, cy + Math.sin(ang) * holeR]);
    }
    o.moveTo(pts[0][0], pts[0][1]);
    for (let i = 0; i < sides; i++) {
      const p0 = pts[i], p1 = pts[(i + 1) % sides];
      const mx = (p0[0] + p1[0]) * 0.5, my = (p0[1] + p1[1]) * 0.5;
      const dx = mx - cx, dy = my - cy;
      const d = Math.hypot(dx, dy) || 1;
      // Subtle convex lens curve on each iris blade
      const bend = holeR * 0.095;
      o.quadraticCurveTo(mx + (dx / d) * bend, my + (dy / d) * bend, p1[0], p1[1]);
    }
    o.closePath();
  }
  const bg = o.createRadialGradient(cx, cy, Math.max(10, holeR * 0.5), cx, cy, maxR);
  bg.addColorStop(0, '#131A1F');
  bg.addColorStop(0.52, '#0C1115');
  bg.addColorStop(1, '#07090B');
  o.fillStyle = bg;
  o.fill('evenodd');

  // 3. Interlocking 6 machined shutter-blade seam lines radiating from aperture corners
  o.clip('evenodd');
  const bladeR = Math.max(40, holeR);
  o.strokeStyle = 'rgba(241,239,230,0.09)';
  o.lineWidth = 1.6;
  for (let i = 0; i < 6; i++) {
    const ang = bladeRot + (i / 6) * Math.PI * 2;
    const sx = cx + Math.cos(ang) * bladeR;
    const sy = cy + Math.sin(ang) * bladeR;
    const tang = ang + 0.92;
    o.beginPath();
    o.moveTo(sx, sy);
    o.lineTo(sx + Math.cos(tang) * maxR, sy + Math.sin(tang) * maxR);
    o.stroke();
  }

  // Concentric brushed calibration dial etched into the dark slate plate
  const dialR = Math.max(305, holeR + 42);
  if (dialR < maxR * 1.05) {
    o.strokeStyle = 'rgba(241,239,230,0.12)';
    o.lineWidth = 1.5;
    o.beginPath(); o.arc(cx, cy, dialR, 0, Math.PI * 2); o.stroke();
    o.beginPath(); o.arc(cx, cy, dialR + 28, 0, Math.PI * 2); o.stroke();

    // 72 precision pressure-gauge tick marks
    for (let i = 0; i < 72; i++) {
      const ang = (i / 72) * Math.PI * 2 - bladeRot * 0.4;
      const maj = i % 6 === 0;
      const r0 = dialR + (maj ? 2 : 9);
      const r1 = dialR + (maj ? 26 : 19);
      o.strokeStyle = maj ? 'rgba(241,239,230,0.34)' : 'rgba(241,239,230,0.13)';
      o.lineWidth = maj ? 2.2 : 1.1;
      o.beginPath();
      o.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
      o.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      o.stroke();
    }
  }
  o.restore();

  // 4. Precision optical glass bezel ring right on the aperture rim (clean ivory + matte lime index arc, zero neon bloom)
  if (holeR > 8 && holeR < maxR * 0.98) {
    o.save();
    o.strokeStyle = 'rgba(241,239,230,0.42)';
    o.lineWidth = 2.5;
    o.beginPath(); o.arc(cx, cy, holeR + 3, 0, Math.PI * 2); o.stroke();
    // Single matte solid lime indicator arc rotating on the pressure dial
    o.strokeStyle = LIME;
    o.lineWidth = 5;
    o.lineCap = 'butt';
    o.beginPath();
    o.arc(cx, cy, holeR + 12, bladeRot - 0.36, bladeRot + 0.36);
    o.stroke();
    o.restore();
  }

  // 5. Crisp Editorial Chapter Plate in the center (zooms smoothly with camera dive, zero overlap)
  const [tag, big, sub] = label;
  const textAlpha = clamp(1 - openAmt * 2.1);
  if (textAlpha > 0.01) {
    const scale = lerp(1.0, 1.38, E.inCubic(clamp(openAmt * 1.9)));
    o.save();
    o.translate(cx, cy);
    o.scale(scale, scale);
    o.globalAlpha = a * textAlpha;
    o.textAlign = 'center';
    o.textBaseline = 'middle';

    // Subtle dark optical reticle circle framing the typography cleanly
    o.strokeStyle = 'rgba(241,239,230,0.14)';
    o.lineWidth = 1.5;
    o.beginPath(); o.arc(0, 0, 290, 0, Math.PI * 2); o.stroke();

    // Solid matte editorial tag block (LIME fill + dark ink — NO neon border!)
    if (tag) {
      o.font = '700 24px "Space Mono"';
      o.letterSpacing = '6px';
      const tw = o.measureText(tag).width + 40;
      o.fillStyle = LIME;
      o.fillRect(-tw / 2, -198, tw, 44);
      o.fillStyle = LIME_INK;
      o.fillText(tag, 3, -175);
    }

    // Monumental condensed title / chapter numeral
    const isNum = big.length <= 2;
    const fs = isNum ? 250 : 148;
    o.font = `400 ${fs}px "League Gothic"`;
    o.letterSpacing = isNum ? '0px' : '6px';
    o.fillStyle = 'rgba(0,0,0,0.5)';
    o.fillText(big, 4, (isNum ? -18 : -28) + 6);
    o.fillStyle = IVORY;
    o.fillText(big, 0, isNum ? -18 : -28);

    // Clean ivory architectural hairline divider
    o.fillStyle = 'rgba(241,239,230,0.28)';
    o.fillRect(-210, 114, 420, 2);

    // Crisp editorial serif italic subtitle
    if (sub) {
      o.font = 'italic 400 38px "Fraunces"';
      o.letterSpacing = '0px';
      o.fillStyle = 'rgba(241,239,230,0.92)';
      o.fillText(sub, 0, 166);
    }

    o.letterSpacing = '0px';
    o.restore();
  }

  o.restore();
}

export function addPortal(scene, { inn = true, out = true, seed = 1 } = {}) {
  const prev = scene.post;
  const IN = 0.72, OUT = 0.90;
  const idx = clamp(Math.round(seed) - 1, 0, PART.length - 1);
  const nextIdx = clamp(idx + 1, 0, PART.length - 1);

  scene.post = (o, t) => {
    if (prev) prev(o, t);
    const D = scene.dur;
    o.save();
    o.setTransform(1, 0, 0, 1, 0, 0);

    // Incoming optical aperture burst open (first 0.72 s)
    if (inn && t < IN) {
      const hold = 0.20;
      const u = inv(hold, IN, t);
      const openAmt = E.outQuart(u);
      const fade = 1 - inv(IN - 0.10, IN, t);
      drawOpticalIris(o, openAmt, PART[idx], seed * 0.45, fade);
    }

    // Outgoing optical aperture close & dive into next chapter (last 0.90 s)
    if (out && t > D - OUT) {
      const s = t - (D - OUT);
      const u = clamp(s / (OUT - 0.16));
      const openAmt = 1 - E.inOutQuart(u);
      const fade = inv(0, 0.08, s);
      drawOpticalIris(o, openAmt, PART[nextIdx], (seed + 1) * 0.45, fade);
    }

    o.restore();
  };
}
