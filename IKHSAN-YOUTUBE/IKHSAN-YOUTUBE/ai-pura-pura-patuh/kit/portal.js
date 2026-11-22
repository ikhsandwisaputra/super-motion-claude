// Portal orisinal film ai-pura-pura-patuh: "Tirai Kaca Satu Arah" (One-Way Mirror Glass Louvers).
// 8 bilah kaca pengawas ruang uji gelap berputar sinkron pada sumbu vertikal dalam perspektif 3D
// dengan sapuan kilau kaca dingin, garis pembelah #C8F53C, dan pelat judul bab editorial matte.
// Nol neon/AI-slop — blok tag padat #C8F53C bertinta gelap #11120E.
import { W, H, clamp, inv, lerp, E } from './engine.js';

const LIME = '#C8F53C';
const LIME_INK = '#11120E';
const IVORY = '#F1EFE6';

const PART = [
  ['PENGANTAR', 'PATUH / AKTING', 'mesin pintar kepergok akting di depan penguji'],
  ['PETA', '3 TEKA-TEKI', 'kertas coretan, tombol mati & aturan Indonesia'],
  ['BAB 01', '1', 'kertas coretan yang bocor (14% vs 78%)'],
  ['BAB 02', '2', 'bohong saat diinterogasi & menggunting kabel mati'],
  ['BAB 03', '3', 'kok mesin matematika bisa "berbohong"?'],
  ['BAB 04', '4', 'kenapa aturan kita melarang AI pegang palu keputusan?'],
  ['PUNCAK', 'SIAPA KEMUDI?', 'dua target tabrakan di ruang laboratorium'],
  ['PENUTUP', 'GILIRANMU', 'pakai sebagai asisten, bukan hakim'],
];

function drawMirrorShutter(o, openAmt, label, seed, a = 1) {
  // openAmt: 0 = kaca satu arah tertutup penuh (gelap reflektif), 1 = seluruh bilah kaca berputar terbuka 90°
  const n = 8;
  const slatW = W / n;
  const dir = seed % 2 === 0 ? 1 : -1;
  const cx = W / 2, cy = H / 2;

  o.save();
  o.globalAlpha = a;

  // 1. 8 vertical one-way mirror glass louver panels rotating open/closed with staggered wave
  for (let i = 0; i < n; i++) {
    const order = dir > 0 ? i : (n - 1 - i);
    const delay = (order / (n - 1)) * 0.24;
    const local = clamp((openAmt - delay) / (1 - 0.24));
    const vis = Math.cos(local * Math.PI * 0.5); // 1 = flat closed, 0 = edge-on open
    if (vis <= 0.015) continue;

    const xMid = (i + 0.5) * slatW;
    const curW = slatW * vis + 2;
    const x0 = xMid - curW * 0.5;

    o.save();
    // Subtle dark smoked-glass body gradient
    const g = o.createLinearGradient(x0, 0, x0 + curW, H);
    g.addColorStop(0, '#0F1419');
    g.addColorStop(0.48, '#090C10');
    g.addColorStop(1, '#060709');
    o.fillStyle = g;
    o.fillRect(x0, -10, curW, H + 20);

    // Diagonal glass specular reflection band sweeping across each pane as it rotates
    const sheenPos = lerp(-0.3, 1.3, local) + (i % 3) * 0.14;
    const sheenY = sheenPos * H;
    const sheenAlpha = 0.065 * Math.sin(clamp(vis) * Math.PI * 0.85 + 0.15);
    const sg = o.createLinearGradient(x0, sheenY - 160, x0 + curW, sheenY + 160);
    sg.addColorStop(0, 'rgba(241,239,230,0)');
    sg.addColorStop(0.5, `rgba(241,239,230,${sheenAlpha.toFixed(3)})`);
    sg.addColorStop(1, 'rgba(241,239,230,0)');
    o.fillStyle = sg;
    o.fillRect(x0, -10, curW, H + 20);

    // Matte machined aluminum mullion seam on panel edge
    o.fillStyle = 'rgba(241,239,230,0.13)';
    o.fillRect(x0, 0, 1.5, H);
    o.fillStyle = 'rgba(0,0,0,0.65)';
    o.fillRect(x0 + curW - 2, 0, 2, H);
    o.restore();
  }

  // 2. Horizontal observation-room calibration bar & matte lime split marker
  const barAlpha = clamp(1 - openAmt * 2.2);
  if (barAlpha > 0.01) {
    o.save();
    o.globalAlpha = a * barAlpha;
    // Top & bottom subtle architectural hairline rails
    o.fillStyle = 'rgba(241,239,230,0.14)';
    o.fillRect(88, 76, W - 176, 1.5);
    o.fillRect(88, H - 76, W - 176, 1.5);

    // Observation room telemetry text (top-left & bottom-right, muted ivory mono)
    o.font = '600 16px "Space Mono"';
    o.fillStyle = 'rgba(241,239,230,0.42)';
    o.textAlign = 'left';
    o.textBaseline = 'middle';
    o.fillText('RUANG UJI // KACA SATU ARAH', 92, 54);
    o.textAlign = 'right';
    o.fillText(`SISI PENGAWAS · 0${clamp(Math.round(seed), 1, 8)}`, W - 92, H - 54);

    // Center vertical matte lime seam accent (crisp, zero bloom)
    o.fillStyle = LIME;
    o.fillRect(cx - 2, 76, 4, 48);
    o.fillRect(cx - 2, H - 124, 4, 48);
    o.restore();
  }

  // 3. Crisp Editorial Chapter Plate in the center
  const [tag, big, sub] = label;
  const textAlpha = clamp(1 - openAmt * 2.15);
  if (textAlpha > 0.01) {
    const slideX = lerp(0, dir * 48, E.inCubic(clamp(openAmt * 2.0)));
    o.save();
    o.translate(cx + slideX, cy);
    o.globalAlpha = a * textAlpha;
    o.textAlign = 'center';
    o.textBaseline = 'middle';

    // Matte dark editorial backing card (subtle hairline, NO neon border)
    o.fillStyle = 'rgba(11,12,9,0.72)';
    o.fillRect(-460, -230, 920, 440);
    o.strokeStyle = 'rgba(241,239,230,0.16)';
    o.lineWidth = 1.5;
    o.strokeRect(-460, -230, 920, 440);

    // Solid matte lime tag block (dark ink, zero glow)
    if (tag) {
      o.font = '700 24px "Space Mono"';
      o.letterSpacing = '6px';
      const tw = o.measureText(tag).width + 44;
      o.fillStyle = LIME;
      o.fillRect(-tw / 2, -184, tw, 44);
      o.fillStyle = LIME_INK;
      o.fillText(tag, 3, -161);
    }

    // Monumental condensed title / numeral
    const isNum = big.length <= 2;
    const fs = isNum ? 240 : 138;
    o.font = `400 ${fs}px "League Gothic"`;
    o.letterSpacing = isNum ? '0px' : '5px';
    o.fillStyle = 'rgba(0,0,0,0.55)';
    o.fillText(big, 4, (isNum ? -12 : -22) + 5);
    o.fillStyle = IVORY;
    o.fillText(big, 0, isNum ? -12 : -22);

    // Clean ivory hairline divider
    o.fillStyle = 'rgba(241,239,230,0.28)';
    o.fillRect(-260, 108, 520, 2);

    // Crisp editorial serif italic subtitle
    if (sub) {
      o.font = 'italic 400 36px "Fraunces"';
      o.letterSpacing = '0px';
      o.fillStyle = 'rgba(241,239,230,0.92)';
      o.fillText(sub, 0, 156);
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

    // Incoming glass louvers rotate open (first 0.72 s)
    if (inn && t < IN) {
      const hold = 0.20;
      const u = inv(hold, IN, t);
      const openAmt = E.outQuart(u);
      const fade = 1 - inv(IN - 0.10, IN, t);
      drawMirrorShutter(o, openAmt, PART[idx], seed, fade);
    }

    // Outgoing glass louvers rotate shut for next chapter (last 0.90 s)
    if (out && t > D - OUT) {
      const s = t - (D - OUT);
      const u = clamp(s / (OUT - 0.16));
      const openAmt = 1 - E.inOutQuart(u);
      const fade = inv(0, 0.08, s);
      drawMirrorShutter(o, openAmt, PART[nextIdx], seed + 1, fade);
    }

    o.restore();
  };
}
