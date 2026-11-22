// Bab 03 · latar penuh-layar (revisi Ikhsan 2026-11-17: foto/klip jangan "dikotakin" → jadi latar video).
// cover-crop, grade dokumenter dingin, gelap + vinyet + grain, push pelan + paralaks kamera, scrim di sisi tempat teks/diagram.
import { W, H, clamp, grainRect } from './kit.js';

export const DOC = 'saturate(.55) contrast(1.12) brightness(.8)';
/** frame klip (pingpong seperti plate) atau gambar diam apa adanya */
export const frameOf = (V, t, t0 = 0, sp = 1) => {
  if (!V) return null; if (!V.img) return V;
  const lt = Math.max(0, t - t0), n = V.n, per = 2 * (n - 1), m = Math.floor(lt * V.fps * sp) % per; return V.img[m < n ? m : per - m];
};
/** gambar penuh-layar (cover) di ruang layar. o: a, p (skala push ≥ 1.06), ox/oy (px, dijepit agar tetap menutup), grade */
export function cover(ctx, im, o = {}) {
  const a = o.a ?? 1; if (!im || a <= 0) return;
  const iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height, p = o.p ?? 1.08, s = Math.max(W / iw, H / ih) * p;
  const mx = (iw * s - W) / 2, my = (ih * s - H) / 2, ox = clamp(o.ox || 0, -mx, mx), oy = clamp(o.oy || 0, -my, my), a0 = ctx.globalAlpha;
  ctx.globalAlpha = a0 * a; ctx.filter = o.grade || DOC;
  ctx.drawImage(im, W / 2 - iw * s / 2 + ox, H / 2 - ih * s / 2 + oy, iw * s, ih * s);
  ctx.filter = 'none'; ctx.globalAlpha = a0;
}
/** lapisan gelap rata + scrim sisi (left/right/bottom/top) + vinyet + grain dokumenter */
export function scrim(ctx, t, o = {}) {
  const dk = o.dark ?? .3, sa = o.sa ?? .72;
  if (dk > 0) { ctx.fillStyle = `rgba(8,14,20,${dk})`; ctx.fillRect(0, 0, W, H); }
  for (const sd of [].concat(o.side || [])) {
    const g = sd === 'left' ? ctx.createLinearGradient(0, 0, W * .64, 0) : sd === 'right' ? ctx.createLinearGradient(W, 0, W * .36, 0)
      : sd === 'bottom' ? ctx.createLinearGradient(0, H, 0, H * .42) : ctx.createLinearGradient(0, 0, 0, H * .5);
    g.addColorStop(0, `rgba(8,14,20,${sa})`); g.addColorStop(1, 'rgba(8,14,20,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  const v = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * 1.02); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${o.vig ?? .55})`);
  ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  grainRect(ctx, 0, 0, W, H, t, o.grain ?? .2);
}
