// Portal orisinal film data-kita-dijual-dark-web: "Cincin Kombinasi Brankas" (Vault Dial Shutter).
// Pintu kombinasi brankas baja gelap berputar mengunci di sumbu pusat dengan cincin kalibrasi 60-tick,
// baut pengunci baja yang menyorong masuk/keluar, garis pembelah #C8F53C matte, dan pelat judul bab editorial.
// 100% orisinal — nol QR, nol selaput, nol garis pindai, nol tangga, nol iris air, nol tirai kaca satu arah.
// Nol neon/AI-slop: blok tag padat #C8F53C bertinta gelap #11120E.
import { W, H, clamp, inv, lerp, E } from './engine.js';

const LIME = '#C8F53C';
const LIME_INK = '#11120E';
const IVORY = '#F1EFE6';

const PART = [
  ['PENGANTAR', 'DIJAGA / DIOBRAL', 'data KTP kita dijual Rp0,49 di pasar gelap'],
  ['PETA', '4 TEKA-TEKI', 'harga obral, peta bocor, 3 penyakit & polisi data'],
  ['BAB 01', '1', 'harga obral identitas kita (Rp0,49 – Rp33,6)'],
  ['BAB 02', '2', 'sudah bocor ke mana saja sampai 2026?'],
  ['BAB 03', '3', 'kenapa jebol terus? plaintext, admin & backup 2%'],
  ['BAB 04', '4', 'dikasihani hacker & polisi data yang belum lahir'],
  ['PUNCAK', 'DILEMA BESAR', 'NIK seumur hidup, pajak rakyat & 3 langkah aman'],
  ['PENUTUP', 'GILIRANMU', 'Rp0,49 · backup 2% · kursi wasit masih kosong'],
];

function drawVaultDial(o, closeAmt, label, seed, a = 1) {
  // closeAmt: 0 = terbuka penuh (transparan), 1 = pintu brankas terkunci penuh
  const cx = W / 2, cy = H / 2;
  const maxR = Math.hypot(cx, cy) + 40;
  const dir = seed % 2 === 0 ? 1 : -1;

  o.save();
  o.globalAlpha = a;

  // 1. Two heavy steel vault doors sliding horizontally into center seam + locking bolts
  const doorTravel = E.outQuint(clamp(closeAmt * 1.15));
  const halfW = W * 0.52 * doorTravel;
  if (halfW > 2) {
    // Left steel vault leaf
    const gL = o.createLinearGradient(0, 0, halfW, H);
    gL.addColorStop(0, '#0E100C');
    gL.addColorStop(0.6, '#141712');
    gL.addColorStop(1, '#080907');
    o.fillStyle = gL;
    o.fillRect(-10, -10, halfW + 10, H + 20);

    // Right steel vault leaf
    const gR = o.createLinearGradient(W, 0, W - halfW, H);
    gR.addColorStop(0, '#0E100C');
    gR.addColorStop(0.6, '#141712');
    gR.addColorStop(1, '#080907');
    o.fillStyle = gR;
    o.fillRect(W - halfW, -10, halfW + 10, H + 20);

    // Brushed steel horizontal seam ribs
    o.fillStyle = 'rgba(241,239,230,0.04)';
    for (let y = 180; y < H; y += 180) {
      o.fillRect(0, y, halfW - 14, 1.5);
      o.fillRect(W - halfW + 14, y, halfW - 14, 1.5);
    }

    // 3 heavy steel locking bolts on each inner edge
    const boltK = E.outQuart(clamp((closeAmt - 0.35) / 0.55));
    const boltLen = 58 * boltK;
    for (const by of [H * 0.24, H * 0.50, H * 0.76]) {
      o.fillStyle = '#383C33';
      o.fillRect(halfW - 18, by - 20, boltLen, 40);
      o.fillRect(W - halfW + 18 - boltLen, by - 20, boltLen, 40);
      o.fillStyle = 'rgba(241,239,230,0.22)';
      o.fillRect(halfW - 18, by - 20, boltLen, 4);
      o.fillRect(W - halfW + 18 - boltLen, by - 20, boltLen, 4);
    }

    // Center bevel edges & crisp matte lime seam line
    o.fillStyle = 'rgba(241,239,230,0.16)';
    o.fillRect(halfW - 3, 0, 3, H);
    o.fillRect(W - halfW, 0, 3, H);
  }

  // 2. Rotating steel combination dial ring in the center (60 machined ticks + lime index notch)
  const dialK = E.outCubic(clamp((closeAmt - 0.12) / 0.88));
  if (dialK > 0.02) {
    const dialR = lerp(maxR * 0.72, 410, dialK);
    const rotAng = dir * lerp(0.85, 0, E.outQuint(dialK)) + seed * 0.15;
    o.save();
    o.translate(cx, cy);
    o.globalAlpha = a * clamp(dialK * 1.4);

    // Outer recessed ring
    o.beginPath();
    o.arc(0, 0, dialR + 34, 0, Math.PI * 2);
    o.strokeStyle = 'rgba(241,239,230,0.12)';
    o.lineWidth = 2;
    o.stroke();

    // Rotating 60-tick combination ring
    o.save();
    o.rotate(rotAng);
    o.beginPath();
    o.arc(0, 0, dialR, 0, Math.PI * 2);
    o.strokeStyle = 'rgba(241,239,230,0.22)';
    o.lineWidth = 2.5;
    o.stroke();

    for (let i = 0; i < 60; i++) {
      const ang = (i / 60) * Math.PI * 2;
      const major = i % 5 === 0;
      const r0 = dialR - (major ? 26 : 12);
      const r1 = dialR;
      o.beginPath();
      o.moveTo(Math.cos(ang) * r0, Math.sin(ang) * r0);
      o.lineTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
      o.strokeStyle = major ? 'rgba(241,239,230,0.48)' : 'rgba(241,239,230,0.18)';
      o.lineWidth = major ? 2.5 : 1.2;
      o.stroke();
    }
    o.restore();

    // Top & bottom fixed matte lime alignment triangles (zero glow)
    o.fillStyle = LIME;
    o.beginPath();
    o.moveTo(0, -dialR - 10);
    o.lineTo(-10, -dialR - 28);
    o.lineTo(10, -dialR - 28);
    o.closePath();
    o.fill();

    o.fillRect(-3, dialR + 10, 6, 26);
    o.restore();
  }

  // 3. Telemetry rails (top & bottom)
  const railA = clamp((closeAmt - 0.45) / 0.45);
  if (railA > 0.01) {
    o.save();
    o.globalAlpha = a * railA;
    o.fillStyle = 'rgba(241,239,230,0.14)';
    o.fillRect(88, 72, W - 176, 1.5);
    o.fillRect(88, H - 72, W - 176, 1.5);
    o.font = '600 15px "Space Mono"';
    o.fillStyle = 'rgba(241,239,230,0.44)';
    o.textAlign = 'left';
    o.textBaseline = 'middle';
    o.fillText('BRANKAS DATA RI // KOMBINASI KUNCI', 92, 50);
    o.textAlign = 'right';
    o.fillText(`SEKTOR · 0${clamp(Math.round(seed), 1, 8)}`, W - 92, H - 50);
    o.restore();
  }

  // 4. Crisp Editorial Chapter Plate inside the vault ring
  const [tag, big, sub] = label;
  const textA = clamp((closeAmt - 0.42) / 0.48);
  if (textA > 0.01) {
    const slideY = lerp(26 * dir, 0, E.outQuint(textA));
    o.save();
    o.translate(cx, cy + slideY);
    o.globalAlpha = a * textA;
    o.textAlign = 'center';
    o.textBaseline = 'middle';

    // Matte dark circular vault core backing
    o.beginPath();
    o.arc(0, 0, 340, 0, Math.PI * 2);
    o.fillStyle = 'rgba(11,12,9,0.88)';
    o.fill();
    o.strokeStyle = 'rgba(241,239,230,0.18)';
    o.lineWidth = 1.5;
    o.stroke();

    // Solid matte lime tag block (dark ink, zero neon border)
    if (tag) {
      o.font = '700 22px "Space Mono"';
      const tw = o.measureText(tag).width + 44;
      o.fillStyle = LIME;
      o.fillRect(-tw / 2, -165, tw, 44);
      o.fillStyle = LIME_INK;
      o.fillText(tag, 0, -143);
    }

    // Hero chapter number or short title
    if (big) {
      const fs = big.length <= 2 ? 196 : (big.length <= 10 ? 94 : 74);
      o.font = `700 ${fs}px "League Gothic"`;
      o.fillStyle = IVORY;
      o.fillText(big, 0, -16);
    }

    // Plain-Indonesian italic subtitle
    if (sub) {
      o.font = 'italic 500 26px "Fraunces"';
      o.fillStyle = 'rgba(241,239,230,0.86)';
      const words = sub.split(' ');
      const lines = [];
      let cur = '';
      for (const w of words) {
        const test = cur ? `${cur} ${w}` : w;
        if (o.measureText(test).width > 540 && cur) { lines.push(cur); cur = w; }
        else cur = test;
      }
      if (cur) lines.push(cur);
      lines.forEach((ln, i) => o.fillText(ln, 0, 128 + i * 34));
    }
    o.restore();
  }

  o.restore();
}

export function addPortal(scene, P, dur) {
  if (!P) return;
  const OUT = 0.85, IN = 0.70;
  const orig = scene.draw.bind(scene);
  scene.draw = (o, t, ...rest) => {
    orig(o, t, ...rest);
    // Portal IN (beginning of chapter: vault unlocks & slides open)
    if (P.in && t < IN) {
      const k = clamp(t / IN);
      const closeAmt = 1 - E.inOutQuint(k);
      const lbl = PART[clamp(P.in.seed ?? 0, 0, PART.length - 1)] || PART[0];
      drawVaultDial(o, closeAmt, lbl, P.in.seed ?? 1, clamp(1 - inv(0.82, 1.0, k)));
    }
    // Portal OUT (end of chapter: vault doors slam & dial locks to next chapter)
    if (P.out && t > dur - OUT) {
      const k = clamp((t - (dur - OUT)) / OUT);
      const closeAmt = E.inOutQuint(k);
      const lbl = PART[clamp(P.out.seed ?? 1, 0, PART.length - 1)] || PART[1];
      drawVaultDial(o, closeAmt, lbl, P.out.seed ?? 1, clamp(inv(0, 0.14, k)));
    }
  };
}
