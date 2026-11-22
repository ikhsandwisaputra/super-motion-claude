// Portal "Garis Pindai" between chapters (screen space, wraps scene.post so it sits above everything). Replaces the Portal QR
// of Indo vs AS (Ikhsan 15 Nov: "transisinya jangan qrcode lagi"). Theme ASLI atau SALINAN?: the chapter is photocopied.
// OUT (last .62 s): a scan bar sweeps left→right; behind it the frame turns into a copy (grey toner, crushed contrast, shifted a
// few px, specks). Then the copy is squeezed into one lime lamp line across the middle — the last frame is that line.
// IN (first .5 s): the lamp line opens into a band with the new chapter inside, still a copy; a second bar sweeps it back to
// the original. Same seed on both sides of a join (film.py sync), so the copy shift matches.
import { W, H, clamp, inv, lerp, E } from './engine.js';
const ROOM = '#0B0C09', LIME = '#C8F53C';
const TONER = 'grayscale(1) contrast(2.1) brightness(1.06)';
let T = null;
const tmp = () => { if (!T) { T = document.createElement('canvas'); T.width = W; T.height = H; } return T.getContext('2d'); };
const rr = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };

function copyLook(o, x0, x1, t, seed, hy0 = 0, hy1 = H) {     // the copy, drawn over [x0,x1]×[hy0,hy1] of the current frame
  if (x1 - x0 < 1 || hy1 - hy0 < 1) return;
  const g = tmp(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = 'none'; g.drawImage(o.canvas, 0, 0, W, H);
  const dx = 4 + rr(1, seed) * 6, dy = 2 + rr(2, seed) * 3;
  o.save(); o.beginPath(); o.rect(x0, hy0, x1 - x0, hy1 - hy0); o.clip();
  o.fillStyle = ROOM; o.fillRect(x0, hy0, x1 - x0, hy1 - hy0);
  o.filter = TONER; o.drawImage(T, dx, dy, W, H); o.filter = 'none';
  const f = Math.floor(t * 30);                              // toner specks + drum streaks, new pattern every frame
  for (let i = 0; i < 260; i++) {
    const x = rr(i * 3 + f * 977, seed) * W, y = rr(i * 7 + f * 131, seed) * H, r = .8 + rr(i + f, seed) * 2.2;
    if (x < x0 || x > x1) continue;
    o.fillStyle = i % 3 ? 'rgba(11,12,9,.55)' : 'rgba(241,239,230,.35)'; o.fillRect(x, y, r, r);
  }
  for (let i = 0; i < 5; i++) { const y = rr(i * 13 + 5, seed) * H; o.fillStyle = 'rgba(241,239,230,.06)'; o.fillRect(x0, y, x1 - x0, 1 + rr(i, seed) * 2); }
  o.restore();
}
function bar(o, x, a = 1) {                                   // the scan lamp: wide soft light, ivory body, lime core
  if (x < -200 || x > W + 200) return;
  o.save(); o.globalAlpha = a; o.globalCompositeOperation = 'screen';
  let g = o.createLinearGradient(x - 260, 0, x + 260, 0);
  g.addColorStop(0, 'rgba(241,239,230,0)'); g.addColorStop(.5, 'rgba(241,239,230,.22)'); g.addColorStop(1, 'rgba(241,239,230,0)');
  o.fillStyle = g; o.fillRect(x - 260, 0, 520, H);
  g = o.createLinearGradient(x - 26, 0, x + 26, 0);
  g.addColorStop(0, 'rgba(241,239,230,0)'); g.addColorStop(.5, 'rgba(241,239,230,.8)'); g.addColorStop(1, 'rgba(241,239,230,0)');
  o.fillStyle = g; o.fillRect(x - 26, 0, 52, H);
  o.globalCompositeOperation = 'source-over'; o.fillStyle = LIME; o.fillRect(x - 2, 0, 4, H);
  o.restore();
}
function lamp(o, y0, y1, a = 1) {                             // the horizontal lamp line(s) at the band edges
  o.save(); o.globalAlpha = a;
  for (const y of y0 === y1 ? [y0] : [y0, y1]) {
    const g = o.createLinearGradient(0, y - 40, 0, y + 40);
    g.addColorStop(0, 'rgba(200,245,60,0)'); g.addColorStop(.5, 'rgba(200,245,60,.28)'); g.addColorStop(1, 'rgba(200,245,60,0)');
    o.fillStyle = g; o.fillRect(0, y - 40, W, 80); o.fillStyle = LIME; o.fillRect(0, y - 2, W, 4);
  }
  o.restore();
}

export function addPortal(scene, { inn = true, out = true, seed = 1 } = {}) {
  const post = scene.post, D = scene.dur;
  scene.post = (o, t, f) => {
    if (post) post(o, t, f);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.filter = 'none';
    if (out && t > D - .62) {
      const k = E.inOutCubic(inv(D - .62, D - .22, t)), bx = lerp(-60, W + 60, k);
      const c = E.inCubic(inv(D - .24, D - .04, t));
      copyLook(o, 0, Math.max(0, bx), t, seed);
      if (c > 0) {                                           // squeeze the copy into the lamp line
        const g = tmp(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(o.canvas, 0, 0, W, H);
        const h = Math.max(4, H * (1 - c));
        o.fillStyle = ROOM; o.fillRect(0, 0, W, H); o.globalAlpha = 1 - .5 * c; o.drawImage(T, 0, H / 2 - h / 2, W, h); o.globalAlpha = 1;
        lamp(o, H / 2 - h / 2, H / 2 + h / 2, c);
      } else bar(o, bx);
      if (t > D - .05) { o.fillStyle = ROOM; o.fillRect(0, 0, W, H); lamp(o, H / 2, H / 2, 1); }
    }
    if (inn && t < .5) {
      const op = E.outQuint(inv(0, .36, t)), hh = lerp(2, H / 2 + 40, op);
      const sx = lerp(-60, W + 60, E.inOutCubic(inv(.1, .5, t)));     // second bar: copy → original
      copyLook(o, Math.max(0, sx), W, t, seed - 1, H / 2 - hh, H / 2 + hh);
      o.fillStyle = ROOM; o.fillRect(0, 0, W, Math.max(0, H / 2 - hh)); o.fillRect(0, H / 2 + hh, W, Math.max(0, H / 2 - hh));
      lamp(o, H / 2 - hh, H / 2 + hh, 1 - E.inCubic(inv(.18, .4, t)));
      if (t >= .1) bar(o, sx, 1 - E.inCubic(inv(.42, .5, t)));
    }
    o.restore();
  };
  return scene;
}
