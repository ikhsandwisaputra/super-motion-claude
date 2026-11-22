// Portal "Anak Tangga" between chapters (agi-setara-manusia; screen space, wraps scene.post so it sits above everything).
// OUT (last .95 s of a chapter): the world dims to 50 % and one stair step rises from below the frame (outCubic, .45 s); its
// dark riser face carries the NEXT part's label (lime mono prefix, big ivory League Gothic, ivory italic Fraunces subtitle)
// and keeps drifting up 24 px. IN (first .72 s of the next chapter): the same label holds .24 s, then the riser sinks out of
// the bottom and the new chapter opens above the lime edge. Readability pass 2026-11-17 (Ikhsan: transition text unreadable).
// Replaces the QR portal (retired 2026-11-15, kept as portal.js.bak-qr-20261116). Seeds follow film.json order (film.py sync).
import { W, H, clamp, inv, lerp, E } from './engine.js';
const LIME = '#C8F53C', LIP = 16;
const PART = [['', 'PENGANTAR', ''], ['', 'PETA', 'tiga anak tangga AI'], ['BAB', '1', 'setara manusia yang mana?'], ['BAB', '2', '70 tahun "sebentar lagi"'],
  ['BAB', '3', 'pintar ujian, belum tentu pintar hidup'], ['BAB', '4', 'November 2026, seberapa dekat?'], ['', 'PUNCAK', 'jadi, sudah sampai?'], ['', 'PENUTUP', 'giliran kamu']];

function step(o, y, label, a = 1) {                          // riser top edge (lime lip) at screen y; tread drawn above it
  const eye = H * .5, td = Math.max(0, y - eye) * .34;       // a tread is only seen while its lip is below eye level
  o.globalAlpha = a;
  if (td > 1) {                                              // tread from above: wide near edge, narrower back edge
    const g = o.createLinearGradient(0, y - td, 0, y); g.addColorStop(0, 'rgba(20,21,16,0)'); g.addColorStop(.35, '#16170F'); g.addColorStop(1, '#22231B');
    o.fillStyle = g; o.beginPath(); o.moveTo(-60, y); o.lineTo(W + 60, y); o.lineTo(W + 60 - td * .9, y - td); o.lineTo(-60 + td * .9, y - td); o.closePath(); o.fill();
    o.fillStyle = 'rgba(241,239,230,.05)'; for (let i = 1; i < 4; i++) o.fillRect(0, y - td * i / 4, W, 1);   // concrete seams
  }
  const g = o.createLinearGradient(0, y, 0, y + H); g.addColorStop(0, '#1C1D16'); g.addColorStop(.5, '#121310'); g.addColorStop(1, '#0B0C09');
  o.fillStyle = g; o.fillRect(-10, y + LIP, W + 20, H + 400);
  o.fillStyle = 'rgba(0,0,0,.35)'; o.fillRect(-10, y + LIP, W + 20, 26);                                // shadow under the nosing
  o.fillStyle = LIME; o.fillRect(-10, y, W + 20, LIP);                                                      // lime lip
  o.fillStyle = 'rgba(27,36,0,.55)'; o.fillRect(-10, y + LIP - 3, W + 20, 3);
  const [pre, big, sub] = label, cy = y + LIP + H * .46;                                                   // label: solid ivory, readable
  o.textAlign = 'center'; o.textBaseline = 'middle';
  const fs = big.length > 2 ? 230 : 440; o.font = `400 ${fs}px "League Gothic"`; o.letterSpacing = big.length > 2 ? '12px' : '0px';
  o.fillStyle = 'rgba(0,0,0,.55)'; o.fillText(big, W / 2 + 6, cy + 10);                                    // soft drop shadow
  o.fillStyle = '#F1EFE6'; o.fillText(big, W / 2, cy);
  if (pre) { o.font = '700 46px "Space Mono"'; o.letterSpacing = '20px'; o.fillStyle = LIME;
    o.fillText(pre, W / 2 + 10, cy - fs * .5 - 36); }
  if (sub) { o.font = 'italic 400 50px "Fraunces"'; o.letterSpacing = '0px'; o.fillStyle = 'rgba(241,239,230,.86)';
    o.fillText(sub, W / 2, cy + fs * .5 + 52); }
  o.letterSpacing = '0px'; o.globalAlpha = 1;
}

export function addPortal(scene, { inn = true, out = true, seed = 1 } = {}) {
  const post = scene.post, D = scene.dur, nxt = PART[Math.min(seed, PART.length - 1)], cur = PART[clamp(seed - 1, 0, PART.length - 1)];
  scene.post = (o, t, f) => {
    if (post) post(o, t, f);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.filter = 'none';
    if (out && t > D - .95) {
      const k = E.outCubic(inv(D - .95, D - .5, t)), ap = E.outQuint(inv(D - .95, D - .6, t));
      o.fillStyle = `rgba(11,12,9,${.5 * ap})`; o.fillRect(0, 0, W, H);
      step(o, lerp(H + 30, -LIP - 4, k) - 24 * inv(D - .5, D, t), nxt);                    // arrive, then keep drifting up slowly
    }
    if (inn && t < .72) step(o, -LIP - 28 + lerp(0, H + 84, E.inCubic(inv(.24, .7, t)) * .4 + E.inOutCubic(inv(.24, .7, t)) * .6) + 24 * Math.min(1, t / .24) , cur);
    o.restore();
  };
  return scene;
}
