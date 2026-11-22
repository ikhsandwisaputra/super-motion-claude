// Portal Gelembung · "Tembus Selaput" between chapters (ai-bubble-dompet; replaces the Indo-vs-AS QR portal, kept as kit/portal_qr.js).
// Screen space, wraps scene.post so it sits above everything. Same windows as before (OUT ≤ last .62 s = 20 frames,
// IN ≤ first .5 s = 16 frames) so tools/portal_finish.py keeps working.
// OUT: the old world dims, a glass bubble rises and swells until its skin fills the lens; inside it the world is magnified,
//      then the soap film itself takes the frame (thin-film interference, drained thin at the top, thick at the bottom).
// IN:  the same film (same phase: OUT uses t - D, IN uses t, both ≈ 0 at the cut) tears open from the centre like a real
//      film: a ragged hole with a rolled ivory rim, droplets thrown off, and the new chapter relaxing from magnified to 1×.
import { W, H, clamp, inv, lerp, E } from './engine.js';
import { bubble } from './gelembung.js';

let SNAP = null, FILM = null;
function snap(o) {                                            // copy of the composed frame, for the lens
  if (!SNAP) { SNAP = document.createElement('canvas'); SNAP.width = W; SNAP.height = H; }
  const g = SNAP.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = 'none'; g.drawImage(o.canvas, 0, 0, W, H); return SNAP;
}
function lens(o, cx, cy, m, br = 1, fresh = true) {          // magnify the frame about (cx, cy)
  const s = fresh ? snap(o) : SNAP; o.save(); o.filter = br !== 1 ? `brightness(${br})` : 'none';
  o.translate(cx, cy); o.scale(m, m); o.translate(-cx, -cy); o.drawImage(s, 0, 0, W, H); o.restore();
}

// Soap film close-up. Physical thin-film colour per channel: I = sin²(2π·n·h/λ) (reflection, so thin film reads black),
// h = film thickness in nm with gravity drainage + swirl. Muted (sat .42, gain .44) over the dark room, never neon.
const FW = 320, FH = 180, LAM = [650, 532, 450], N2 = 2 * Math.PI * 1.33;
function film(ph, seed) {
  if (!FILM) { FILM = document.createElement('canvas'); FILM.width = FW; FILM.height = FH; }
  const g = FILM.getContext('2d'), img = g.createImageData(FW, FH), d = img.data, s = seed * 1.7;
  for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) {
    const u0 = x / FW, v = y / FH, dx = u0 - .58 - .04 * Math.sin(s), dy = (v - .42) * .56, r = Math.hypot(dx, dy);
    const tw = (1.9 + .5 * Math.sin(s * 2.3)) * Math.exp(-r * 6) + .25 * ph, cs = Math.cos(tw), sn = Math.sin(tw);  // twist around an eddy
    const u = .58 + dx * cs - dy * sn, w = .42 + (dx * sn + dy * cs) / .56;
    let h = 90 + 820 * Math.pow(v, .85)
      + 150 * Math.sin(5.5 * u + 2.2 * w + ph * 1.6 + s) + 105 * Math.sin(10.5 * w - 3.7 * u - ph * 2.4 + s * .7)
      + 60 * Math.sin(17 * (u + .6 * w) + ph * 3.1 + s * 1.3);
    h = Math.max(0, h);
    const c = LAM.map(l => { const q = Math.sin(N2 * h / l); return q * q; }), lum = (c[0] + c[1] + c[2]) / 3;
    const vg = 1 - .55 * Math.pow(Math.hypot(u - .5, (v - .5) * .9) * 1.45, 2.2), i = (y * FW + x) * 4;
    d[i] = 11 + 255 * .44 * vg * (lum + .42 * (c[0] - lum));
    d[i + 1] = 12 + 255 * .44 * vg * (lum + .42 * (c[1] - lum));
    d[i + 2] = 9 + 255 * .44 * vg * (lum + .42 * (c[2] - lum)); d[i + 3] = 255;
  }
  g.putImageData(img, 0, 0); return FILM;
}
function drawFilm(o, ph, seed, a = 1) {                        // full-frame film + a soft window glare riding it
  if (a <= 0) return; const f = film(ph, seed);
  o.save(); o.globalAlpha = a; o.imageSmoothingEnabled = true; o.imageSmoothingQuality = 'high'; o.drawImage(f, 0, 0, W, H);
  o.globalCompositeOperation = 'screen'; const gx = W * (.27 + .02 * ph), gy = H * .2;
  const g = o.createRadialGradient(gx, gy, 0, gx, gy, W * .3); g.addColorStop(0, 'rgba(241,239,230,.16)'); g.addColorStop(1, 'rgba(241,239,230,0)');
  o.fillStyle = g; o.fillRect(0, 0, W, H); o.restore();
}
function hole(o, R, seed, fresh = true) {                                   // ragged tear outline (fixed spikes per seed, softer as it opens)
  const n = 72, amp = .1 * (1 - .5 * clamp(R / 1400)); if (fresh) o.beginPath();
  for (let i = 0; i <= n; i++) {
    const th = i / n * Math.PI * 2, k = 1 + amp * (Math.sin(5 * th + seed) * .5 + Math.sin(11 * th + seed * 3) * .3 + Math.sin(23 * th + seed * 7) * .2);
    const x = W / 2 + R * k * Math.cos(th), y = H / 2 + R * k * Math.sin(th) * .92; i ? o.lineTo(x, y) : o.moveTo(x, y);
  }
  o.closePath();
}

function spray(o, s, seed) {                                  // droplets lag the rim (they fly slower than the film retracts)
  const n = 200, fade = 1 - inv(.3, .7, s); o.save(); o.fillStyle = '#F1EFE6';
  for (let band = 0; band < 3; band++) {
    o.globalAlpha = (.8 - band * .22) * fade; o.beginPath();
    for (let i = band; i < n; i += 3) {
      const q = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453, rq = q - Math.floor(q), q2 = Math.sin(i * 269.5 + seed * 183.3) * 43758.5453, r2 = q2 - Math.floor(q2);
      const th = rq * Math.PI * 2, born = .02 + .2 * r2; if (s < born) continue;
      const Rb = lerp(50, 1500, E.outCubic(Math.min(1, born / .34))), d = Rb + (s - born) * (380 + 520 * r2);
      const x = W / 2 + Math.cos(th) * d, y = H / 2 + Math.sin(th) * d * .92 + 900 * (s - born) * (s - born), rad = 1.6 + 3.4 * ((rq * 7) % 1);
      o.moveTo(x + rad, y); o.arc(x, y, rad, 0, 7);
    }
    o.fill();
  }
  o.restore();
}

export function addPortal(scene, { inn = true, out = true, seed = 1 } = {}) {
  const post = scene.post, D = scene.dur;
  scene.post = (o, t, f) => {
    if (post) post(o, t, f);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.filter = 'none';
    if (out && t > D - .62) {
      const u = inv(D - .62, D, t), ky = E.outCubic(inv(D - .62, D - .3, t)), mf = E.inOutCubic(inv(D - .3, D - .04, t));
      const r = 120 * Math.exp(Math.log(13) * E.inCubic(inv(D - .5, D - .02, t))), cx = W / 2, cy = lerp(H + 160, H / 2, ky) - r * .08 * (1 - ky);
      o.fillStyle = `rgba(11,12,9,${.2 * E.outQuint(inv(D - .62, D - .35, t))})`; o.fillRect(0, 0, W, H);   // settle the old world a touch…
      snap(o);                                                                                            // …the glass shows the same world, magnified
      const sh = o.createRadialGradient(cx, cy, r * .96, cx, cy, r * 1.16);                                 // contact shade: reads on lime and ivory
      sh.addColorStop(0, 'rgba(11,12,9,.34)'); sh.addColorStop(1, 'rgba(11,12,9,0)'); o.fillStyle = sh; o.fillRect(0, 0, W, H);
      bubble(o, cx, cy, r, t * 3 + seed, { wob: .03 * (1 - u), ten: .2 + .5 * u, seed, film: .18,          // …see it through the glass, then the film
        inner: c => { c.save(); c.globalAlpha = 1; lens(c, cx, cy, 1 + .42 * u, 1, false);
          const eg = c.createRadialGradient(cx, cy, r * .8, cx, cy, r);                                    // refraction edge: dark band, reads on lime/ivory
          eg.addColorStop(0, 'rgba(11,12,9,0)'); eg.addColorStop(.75, 'rgba(11,12,9,.1)'); eg.addColorStop(1, 'rgba(11,12,9,.42)');
          c.fillStyle = eg; c.fillRect(cx - r, cy - r, 2 * r, 2 * r);
          c.globalAlpha = .3 + .7 * mf; const ri = r * lerp(.86, 0, mf); c.beginPath(); c.arc(cx, cy, r, 0, 2 * Math.PI); c.moveTo(cx + ri, cy); c.arc(cx, cy, ri, 0, 2 * Math.PI, true); c.clip();
          drawFilm(c, t - D, seed, 1); c.restore(); } });                                                   // the film creeps in from the rim
      if (t > D - .06) drawFilm(o, t - D, seed, inv(D - .06, D - .01, t));                                 // last frames: the film owns the frame
    }
    if (inn && t < .5) {
      const P = .066, s = t - P, fs = seed - 1, kr = E.outCubic(inv(P, P + .42, t));
      if (s < .4) lens(o, W / 2, H / 2, lerp(1.32, 1, kr), lerp(1.05, 1, kr));                              // the new world, still magnified
      if (s < 0) drawFilm(o, t, fs);                                                                      // 2 frames: the same film
      else if (s < .34) {
        const R = lerp(50, 1500, E.outCubic(s / .34));
        o.save(); o.beginPath(); o.rect(0, 0, W, H); hole(o, R, fs, false); o.clip('evenodd'); drawFilm(o, t, fs); o.restore();
        hole(o, R, fs); o.strokeStyle = 'rgba(11,12,9,.35)'; o.lineWidth = 16; o.stroke();                                // shade under the rim…
        o.strokeStyle = 'rgba(241,239,230,.62)'; o.lineWidth = 3 + 7 * (1 - s / .34); o.stroke();                          // …the rolled ivory rim
      }
      if (s > 0 && s < .7) spray(o, s, fs);                                                                 // droplets thrown off the retreating rim
    }
    o.restore();
  };
  return scene;
}
