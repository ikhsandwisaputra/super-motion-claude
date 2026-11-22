// Portal bab film GTA 6 · "Peta Mini Waypoint" (lahir dari tema: minimap + rute GPS game dunia terbuka). Screen space, membungkus scene.post.
// OUT (.7 s terakhir bab): frame bab menyusut jadi piringan minimap di tengah (cincin gelap, utara "U", jalan-jalan tipis), piringan berputar
// seperti minimap yang mengikuti arah mobil, rute lime tergambar dari titik pemain ke pin waypoint berlabel bab berikutnya,
// lalu kamera menyelam ke pin sampai lime memenuhi layar. IN (.5 s pertama bab berikut): keluar dari lubang pin — lingkaran terbuka
// eksponensial dari tengah, ruas-ruas rute melesat lewat. Tanpa QR (pensiun), beda dari Garis Pindai & Tembus Selaput (cooldown).
import { W, H, clamp, inv, lerp, E } from './engine.js';
const ROOM = '#0B0C09', IVORY = '#F1EFE6', LIME = '#C8F53C', INK = '#1B2400';
const LBL = ['INTRO', 'PETA', 'BAB 1', 'BAB 2', 'BAB 3', 'BAB 4', 'PUNCAK', 'PENUTUP'];
let SNAP = null;
const rr = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
function roads(seed) {                                                  // jaringan jalan minimap: grid miring + 2 jalan raya melengkung
  const L = []; for (let i = -6; i <= 6; i++) { L.push([[i * 60 + rr(i, seed) * 20, -400], [i * 60 - 40 + rr(i + 9, seed) * 30, 400], 1]); L.push([[-400, i * 64 + rr(i + 3, seed) * 18], [400, i * 64 + 30 * rr(i + 5, seed)], 1]); }
  L.push([[-400, 160], [400, -220], 3]); L.push([[-120, 400], [60, -400], 3]); return L;
}
export function addPortal(scene, { inn = true, out = true, seed = 1 } = {}) {
  const post = scene.post, D = scene.dur, RD = roads(seed), next = LBL[seed] || 'LANJUT';
  const PIN = [118, -150];                                              // waypoint (koordinat peta, pusat = pemain)
  scene.post = (o, t, f) => {
    if (post) post(o, t, f);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.filter = 'none';
    if (out && t > D - .7) {
      if (!SNAP) { SNAP = document.createElement('canvas'); SNAP.width = W; SNAP.height = H; }
      const sg = SNAP.getContext('2d'); sg.globalCompositeOperation = 'copy'; sg.drawImage(o.canvas, 0, 0); sg.globalCompositeOperation = 'source-over';
      const k = E.outQuint(inv(D - .7, D - .42, t)), R = lerp(Math.hypot(W, H) / 2, 300, k), rot = -14 * E.inOutCubic(inv(D - .6, D - .2, t)) * Math.PI / 180;
      const route = E.outCubic(inv(D - .5, D - .3, t)), dive = Math.exp(Math.log(60) * E.inCubic(inv(D - .3, D - .04, t)));
      o.fillStyle = ROOM; o.fillRect(0, 0, W, H);
      o.translate(W / 2, H / 2); o.scale(dive, dive); o.translate(-PIN[0] * (dive > 1 ? 1 - 1 / dive : 0), -PIN[1] * (dive > 1 ? 1 - 1 / dive : 0)); o.rotate(rot);
      o.save(); o.beginPath(); o.arc(0, 0, R, 0, 7); o.clip();
      o.save(); o.rotate(-rot); o.globalAlpha = 1 - .55 * k; const s = lerp(1, .5, k); o.drawImage(SNAP, -W / 2 * s, -H / 2 * s, W * s, H * s); o.restore();
      o.fillStyle = `rgba(11,12,9,${.62 * k})`; o.fillRect(-R, -R, 2 * R, 2 * R);
      o.strokeStyle = `rgba(241,239,230,${.22 * k})`; for (const [a, b, w] of RD) { o.lineWidth = w * 2.2; o.beginPath(); o.moveTo(...a); o.lineTo(...b); o.stroke(); }
      if (route > 0) { o.strokeStyle = LIME; o.lineWidth = 9; o.lineCap = 'round'; o.beginPath(); const pts = [[0, 0], [0, -60], [70, -64], [PIN[0], -100], PIN];
        let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
        let rem = L * route; o.moveTo(...pts[0]); for (let i = 1; i < pts.length && rem > 0; i++) { const u = Math.min(1, rem / seg[i - 1]); o.lineTo(lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)); rem -= seg[i - 1]; } o.stroke(); }
      o.restore();
      o.globalAlpha = k; o.strokeStyle = IVORY; o.lineWidth = 6; o.beginPath(); o.arc(0, 0, R, 0, 7); o.stroke();                       // bezel
      o.fillStyle = IVORY; o.font = '700 30px "Space Mono"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.save(); o.translate(0, -R - 34); o.rotate(-rot); o.fillText('U', 0, 0); o.restore();
      o.save(); o.rotate(-rot); o.fillStyle = IVORY; o.beginPath(); o.moveTo(0, -18); o.lineTo(13, 14); o.lineTo(0, 7); o.lineTo(-13, 14); o.closePath(); o.fill(); o.restore();   // panah pemain
      const pk = E.outBack ? E.outBack(inv(D - .46, D - .3, t)) : E.outCubic(inv(D - .46, D - .3, t));
      if (pk > 0) { o.save(); o.translate(...PIN); o.rotate(-rot); o.scale(pk, pk); o.fillStyle = LIME; o.beginPath(); o.arc(0, -34, 26, 0, 7); o.fill();
        o.beginPath(); o.moveTo(-14, -20); o.lineTo(0, 0); o.lineTo(14, -20); o.fill(); o.fillStyle = INK; o.beginPath(); o.arc(0, -34, 9, 0, 7); o.fill();
        o.font = '700 22px "Space Mono"'; o.fillStyle = IVORY; o.textAlign = 'left'; o.fillText(next, 34, -34); o.restore(); }
      if (t > D - .08) { o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.fillStyle = LIME; o.fillRect(0, 0, W, H); }
    }
    if (inn && t < .5) {
      o.setTransform(1, 0, 0, 1, 0, 0);
      const k = inv(.04, .5, t), r = 20 * Math.exp(Math.log(70) * E.outCubic(k)), a = 1 - E.inCubic(inv(.3, .5, t));
      o.globalAlpha = a; o.fillStyle = LIME; o.beginPath(); o.rect(0, 0, W, H); if (t >= .04) o.arc(W / 2, H / 2, r, 0, 7, true); o.fill();
      if (t >= .04) { o.strokeStyle = IVORY; o.lineWidth = 4; o.beginPath(); o.arc(W / 2, H / 2, r, 0, 7); o.stroke(); }
      o.strokeStyle = INK; o.lineWidth = 10; o.lineCap = 'round'; o.globalAlpha = a * clamp(1 - k * 1.2);       // ruas rute melesat keluar
      for (let i = 0; i < 10; i++) { const ang = i / 10 * 6.283 + seed, d0 = r * (1.15 + .5 * rr(i, seed)), d1 = d0 + 90 * (1 + k * 3);
        o.beginPath(); o.moveTo(W / 2 + Math.cos(ang) * d0, H / 2 + Math.sin(ang) * d0); o.lineTo(W / 2 + Math.cos(ang) * d1, H / 2 + Math.sin(ang) * d1); o.stroke(); }
    }
    o.restore();
  };
  return scene;
}
