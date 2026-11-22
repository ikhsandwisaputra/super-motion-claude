// Shared transition-hit library (built by tools/tx_lib.py). A chapter loads only the hits it uses.
//   const TX = await loadTx('../assets/txlib/', ['stk1', 'cmc1']);      // in scene.load()
//   react(o, TX, hits, t);  for (const [n, at, al] of hits) drawTx(o, TX, n, t, at, al);   // at the end of post()
// The brightest frame of a hit lands on `at`; the mix places tx/<name>.wav at  at - peak  (same clock, picture + sound).
const W = 1920, H = 1080;
export async function loadTx(base, names) {
  const meta = await (await fetch(base + 'tx.json')).json(), img = {};
  for (const name of names) {
    const m = meta[name]; if (!m) throw new Error('tx hit not in library: ' + name);
    img[name] = await Promise.all(Array.from({ length: m.n }, async (_, i) => {
      const bm = await createImageBitmap(await (await fetch(`${base}${name}/f_${String(i + 1).padStart(3, '0')}.jpg`)).blob());
      const c = document.createElement('canvas'); c.width = 960; c.height = 540; const g = c.getContext('2d');
      g.filter = m.filter || 'contrast(1.28) brightness(.94)'; g.drawImage(bm, 0, 0, 960, 540); return c;
    }));
  }
  return { meta, img };
}
const idx = (m, t, at) => Math.floor((t - at + m.peak) * 30);
export function drawTx(o, TX, name, t, at, alpha = 1, flipX = false) {     // screen the hit over the finished frame
  const m = TX.meta[name], f = TX.img[name]; if (!m || !f) return; const i = idx(m, t, at); if (i < 0 || i >= m.n) return;
  const edge = Math.min(1, i / 2, (m.n - 1 - i) / 3);
  o.save(); o.setTransform(flipX ? -1 : 1, 0, 0, 1, flipX ? W : 0, 0); o.globalCompositeOperation = 'screen'; o.globalAlpha = alpha * Math.max(0, edge);
  o.drawImage(f[i], 0, 0, W, H); o.restore();
}
export function txLum(TX, name, t, at) {                                  // 0..1 light of the hit right now (from its own luminance curve)
  const m = TX.meta[name]; if (!m) return 0; const x = (t - at + m.peak) * 30, i = Math.floor(x); if (i < 0 || i >= m.n - 1) return 0;
  const mx = Math.max(...m.curve, 1); return (m.curve[i] + (m.curve[i + 1] - m.curve[i]) * (x - i)) / mx;
}
// Hit-reactive optics: the picture answers the light before the hit is screened on top — a small exposure lift and a lens
// breath (scale punch) that follow the clip's own luminance, so the overlay reads as light in the room, not a sticker.
export function react(o, TX, hits, t, k = 1) {
  let L = 0; for (const [name, at, al = 1] of hits) L = Math.max(L, txLum(TX, name, t, at) * al);
  if (L < .02) return 0; const s = 1 + .028 * L * k;
  o.save(); o.setTransform(s, 0, 0, s, W / 2 * (1 - s), H / 2 * (1 - s)); o.filter = `brightness(${1 + .22 * L * k}) contrast(${1 + .06 * L * k})`;
  o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.drawImage(o.canvas, 0, 0); o.restore(); return L;
}
