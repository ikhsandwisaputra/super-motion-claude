// pustaka · portal.qr (Portal QR) — salinan apa adanya dari teknologi-indo-vs-as kit/portal.js (identik dengan ai-bubble-dompet kit/portal_qr.js).
// Pasang: salin ke <film>/kit/portal.js (pustaka.py pakai <slug> --portal qr); bab memuatnya dari src/portal.js, import ./engine.js milik bab.
// Suara: sfx/portal_sfx_qr.py · pratinjau: galeri/pratinjau/portal.qr.jpg · bintang: cooldown 2 film setelah dipakai.
// Portal QR between chapters (screen space, wraps scene.post so it sits above everything).
// OUT (last .6 s of a chapter): the world dims, a QR code pops in at the centre and the camera dives into its lime centre
// module until lime fills the frame on the last frames. IN (first .5 s of the next chapter): we come out through that lime
// module — a square opening grows exponentially from the centre, the new chapter inside, code modules streaming past.
import { W, H, clamp, inv, lerp, E } from './engine.js';
const ROOM = '#0B0C09', IVORY = '#F1EFE6', LIME = '#C8F53C';
const N = 25, C = 12;                                        // modules per side, centre module index
function code(seed) {                                        // a deterministic QR-like matrix: 3 finders, lime 3×3 centre
  const r = i => { const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453; return x - Math.floor(x); }, M = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const f = (fx, fy) => { const dx = x - fx, dy = y - fy; if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return -1;
      const e = Math.max(Math.abs(dx - 3), Math.abs(dy - 3)); return e === 3 || e <= 1 ? 1 : 0; };
    const fv = Math.max(f(0, 0), f(N - 7, 0), f(0, N - 7));
    if (fv >= 0) { if (fv) M.push([x, y, 0]); continue; }
    if (x === 7 || y === 7 || x === N - 8 || y === N - 8) continue;                 // quiet lines around the finders
    if (Math.abs(x - C) <= 1 && Math.abs(y - C) <= 1) { if (x === C && y === C) M.push([x, y, 2]); continue; }
    if (Math.abs(x - C) <= 2 && Math.abs(y - C) <= 2) continue;                    // a dark ring around the lime door
    if (r(x * 31 + y) < .48) M.push([x, y, 0]);
  }
  return M;
}
// OUT .6 s: dunia redup, kode QR muncul, kamera menyelam ke modul lime; IN .5 s: bukaan kotak tumbuh dari modul itu · opsi inn, out, seed · asal: teknologi-indo-vs-as kit/portal.js:22 · ledger: portal-qr-chapter-join
export function addPortal(scene, { inn = true, out = true, seed = 1 } = {}) {
  const M = code(seed), M2 = code(seed - 1), post = scene.post, D = scene.dur;
  scene.post = (o, t, f) => {
    if (post) post(o, t, f);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.filter = 'none';
    if (out && t > D - .62) {
      const k = inv(D - .62, D - .4, t), z = Math.exp(Math.log(95) * E.inCubic(inv(D - .44, D - .07, t))), ap = E.outQuint(k);
      o.fillStyle = `rgba(11,12,9,${.62 * ap})`; o.fillRect(0, 0, W, H);
      const S = 300 * lerp(.7, 1, E.outQuint(k)), m = S / N; o.translate(W / 2, H / 2); o.scale(z, z); o.translate(-(C + .5) * m, -(C + .5) * m);
      o.globalAlpha = ap; o.fillStyle = ROOM; o.fillRect(-m * 2, -m * 2, S + m * 4, S + m * 4);
      for (const [x, y, c] of M) { const d = Math.hypot(x - C, y - C), kk = E.outCubic(clamp((k * 1.6 - d / 40))); if (kk <= 0 && c !== 2) continue;
        o.fillStyle = c === 2 ? LIME : IVORY; const g = c === 2 ? 3 : 1, s0 = c === 2 ? 1 : kk;
        const cx = (x + .5) * m, cy = (y + .5) * m, w = m * g * s0 * .92 + (c === 2 ? m * .08 * g : 0); o.fillRect(cx - w / 2, cy - w / 2, w, w); }
      if (t > D - .1) { o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.fillStyle = LIME; o.fillRect(0, 0, W, H); }
    }
    if (inn && t < .5) {
      const k = inv(.05, .5, t), hs = 22 * Math.exp(Math.log(110) * E.outCubic(k)), a = 1 - E.inCubic(inv(.32, .5, t));
      o.globalAlpha = a; o.fillStyle = LIME; o.beginPath(); o.rect(0, 0, W, H); if (t >= .05) o.rect(W / 2 + hs, H / 2 - hs * .9, -2 * hs, 2 * hs * .9); o.fill('evenodd');
      if (t >= .05) { o.strokeStyle = IVORY; o.lineWidth = 3; o.strokeRect(W / 2 - hs, H / 2 - hs * .9, 2 * hs, 2 * hs * .9); }
      const m = hs * .55; o.fillStyle = IVORY;                                      // modules of the far code streaming past
      for (const [x, y, c] of M2) { if (c) continue; const dx = x - C, dy = y - C; if (Math.max(Math.abs(dx), Math.abs(dy)) < 3) continue;
        const px = W / 2 + dx * m * 1.15, py = H / 2 + dy * m * 1.15, w = m * .9; if (px + w < 0 || px - w > W || py + w < 0 || py - w > H) continue;
        o.globalAlpha = a * .9 * clamp(1 - k * 1.1); o.fillRect(px - w / 2, py - w / 2, w, w); }
    }
    o.restore();
  };
  return scene;
}
