// Bab 5 · tangga versi siang hangat. kit/agi.js stairs() memakai warna gelap tetap (BGC 11,12,9), yang di dunia terang bab 5
// jadi lubang hitam; ini salinan dengan warna dari tema bab (latar pasir, anak tangga batu hangat, bibir tinta).
// Tambahan: o.lime = indeks berbibir lime, o.label(i) → teks yang dicetak di muka anak tangga (label bahasa di akhir bab).
import { clamp } from './engine.js';
import { ivo, setFont, DSP, LIME_INK } from './kit.js';
import { rgbMix } from './agi.js';

export function stairs5(ctx, t, pr, items, S, lit = () => 1, o = {}) {
  const X0 = o.x0 ?? -1400, X1 = o.x1 ?? 1400, BGC = o.bg ?? [232, 196, 154], STEP = o.step ?? [176, 128, 86], TREAD = o.tread ?? [246, 222, 186];
  S.forEach((s, i) => {
    const L = lit(i, t);
    items.push({ z: s.z - 2, x: 0, d: pr(0, s.y1, s.z).z + 1, f: () => {
      const P = [pr(X0, s.y0, s.z), pr(X1, s.y0, s.z), pr(X1, s.y1, s.z), pr(X0, s.y1, s.z), pr(X1, s.y1, s.z1), pr(X0, s.y1, s.z1)];
      if (P.some(p => p.z < 120)) return;
      const fog = clamp(1.15 - (P[2].z - 1500) / 9000);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1;
      ctx.fillStyle = rgbMix(BGC, TREAD, L * fog);
      ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[4].x, P[4].y); ctx.lineTo(P[5].x, P[5].y); ctx.closePath(); ctx.fill();
      const g = ctx.createLinearGradient(0, P[0].y, 0, P[3].y);
      g.addColorStop(0, rgbMix(BGC, STEP, .9 * L * fog)); g.addColorStop(1, rgbMix(BGC, STEP, .45 * L * fog));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[3].x, P[3].y); ctx.closePath(); ctx.fill();
      const lime = o.lime && o.lime(i, t);
      if (lime) { ctx.globalAlpha = lime; ctx.fillStyle = '#C8F53C'; ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[3].x, P[3].y); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
      if (L > 0) {
        ctx.strokeStyle = ivo(.55 * L * fog); ctx.lineWidth = Math.max(1, 3.2 * P[3].s);
        ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
      }
      const lab = o.label && o.label(i, t);
      if (lab && lab.a > 0) {                                         // teks di muka anak tangga (bidang z = s.z), pusat x 0
        const c = pr(0, (s.y0 + s.y1) / 2, s.z), a = pr(100, (s.y0 + s.y1) / 2, s.z), sc = (a.x - c.x) / 100;
        ctx.setTransform(sc, 0, 0, sc, c.x, c.y); ctx.globalAlpha = lab.a * fog; setFont(ctx, DSP(112), 8); ctx.textAlign = 'center';
        ctx.fillStyle = lime ? LIME_INK : ivo(.9); ctx.fillText(lab.text, 0, 40); ctx.textAlign = 'left'; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
      }
    } });
  });
}
