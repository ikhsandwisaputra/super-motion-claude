// Shared helpers of the intro template (camera, textured planes, film-strip art). Extracted from film_test1.js.
import { W, H, FPS, clamp, inv, lerp, E, spring } from './engine.js';

export const CFG = {
  channel: ['RELENTLESS', 'non-conformist'],
  lead: 'DATA DI CLOUD,', midHi: 'AIR', mid: ' LAUT', hero: 'BUTUH AIR LAUT?',
  disclaimer: ['Angka di video ini berasal dari sumber resmi:',
    'BP Batam, Ombudsman RI, Disdukcapil, Dept. Energi AS, Nature, arXiv.'],
  reel: 'REEL 01', frameNo: 428,
};
const COL = { ink: '#16100B', lime: '#C8F53C', limeInk: '#1B2400', base: '#150E09', room: '#060504' };
const DISP = 'League Gothic', SER = 'Fraunces', MONO = 'Space Mono';
const D2R = Math.PI / 180, PITCH = 1000, FX = 40;               // FX = frame centre x on the strip
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const noise1 = x => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(rnd(i), rnd(i + 1), u); };
const setFont = (ctx, css, ls = 0) => { ctx.font = css; ctx.fontStretch = '100%'; ctx.letterSpacing = `${ls}px`; };
// ── camera (look-at, world y down, +z away) ─────────────────────────────────────────────────────────
function camera(c) {
  const yaw = c.yaw * D2R, pitch = c.pitch * D2R, f = c.f, dist = c.dist;
  const F = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
  const R = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const Dn = [F[1] * R[2] - F[2] * R[1], F[2] * R[0] - F[0] * R[2], F[0] * R[1] - F[1] * R[0]];
  const C = [c.tx - dist * F[0], c.ty - dist * F[1], c.tz - dist * F[2]];
  const ox = W / 2 + c.sx, oy = H / 2 + c.sy;
  return (x, y, z) => {
    const dx = x - C[0], dy = y - C[1], dz = z - C[2], cz = dx * F[0] + dy * F[1] + dz * F[2], s = f / Math.max(cz, 1);
    return { x: ox + s * (dx * R[0] + dy * R[1] + dz * R[2]), y: oy + s * (dx * Dn[0] + dy * Dn[1] + dz * Dn[2]), s, z: cz };
  };
}
let BASE = [1, 0, 0, 1, 0, 0];
const setBase = roll => { const c = Math.cos(roll * D2R), s = Math.sin(roll * D2R); BASE = [c, s, -s, c, W / 2 - c * W / 2 + s * H / 2, H / 2 - s * W / 2 - c * H / 2]; };
const useBase = ctx => ctx.setTransform(...BASE);
// a textured world plane drawn as a grid of small affine cells (per-cell perspective)
function planeTex(ctx, proj, img, x0, y0, w, h, z, nx, ny) {
  const sw = img.width / nx, sh = img.height / ny, cw = w / nx, ch = h / ny;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const wx = x0 + cw * i, wy = y0 + ch * j, P = proj(wx, wy, z);
    if (P.z < 40) continue;
    const Px = proj(wx + cw, wy, z), Py = proj(wx, wy + ch, z);
    if (Math.max(P.x, Px.x, Py.x) < -700 || Math.min(P.x, Px.x, Py.x) > W + 700 || Math.max(P.y, Px.y, Py.y) < -700 || Math.min(P.y, Px.y, Py.y) > H + 700) continue;
    useBase(ctx);
    ctx.transform((Px.x - P.x) / sw, (Px.y - P.y) / sw, (Py.x - P.x) / sh, (Py.y - P.y) / sh, P.x, P.y);
    ctx.drawImage(img, i * sw, j * sh, sw, sh, 0, 0, sw + 0.9, sh + 0.9);
  }
}

// ── art (code placeholders, same sizes as the layers asked from Ahpo) ───────────────────────────────
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
function backlit(g, w, h, dim = 0) {
  const gr = g.createRadialGradient(w / 2, h * .48, 40, w / 2, h / 2, w * .68);
  gr.addColorStop(0, dim ? '#F2DDB2' : '#FFF6E0'); gr.addColorStop(.6, dim ? '#DDBD85' : '#F4E2BC'); gr.addColorStop(1, dim ? '#A97A40' : '#CFA162');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
}
function frameArt(g, v) {            // 1600×900, origin = frame top-left
  backlit(g, 1600, 900, v !== 'wm');
  g.fillStyle = COL.ink; g.strokeStyle = COL.ink; g.textBaseline = 'alphabetic';
  if (v === 'wm') {
    setFont(g, `400 100px "${DISP}"`); const size = 1240 / g.measureText(CFG.channel[0]).width * 100;
    setFont(g, `400 ${size}px "${DISP}"`); const m = g.measureText(CFG.channel[0]), cap = m.actualBoundingBoxAscent;
    const x = 180, top = 190, base = top + cap;
    g.fillText(CFG.channel[0], x, base);
    setFont(g, `italic 420 150px "${SER}"`); const w2 = g.measureText(CFG.channel[1]).width, x2 = x + 1240 - w2, b2 = base + 176;
    g.fillStyle = COL.lime; g.fillRect(x2 - 26, b2 - 122, w2 + 52, 164);
    g.fillStyle = COL.limeInk; g.fillText(CFG.channel[1], x2, b2);
    g.fillStyle = COL.ink; setFont(g, `700 26px "${MONO}"`, 3);
    g.fillText(`${CFG.reel} — HEAD`, x, 118); g.textAlign = 'right'; g.fillText('24 FPS · SAFETY FILM', 1420, 118); g.textAlign = 'left';
  } else if (v === 0) {
    g.lineWidth = 10; g.beginPath(); g.arc(800, 450, 300, 0, 7); g.stroke(); g.beginPath(); g.arc(800, 450, 190, 0, 7); g.stroke();
    g.lineWidth = 6; g.beginPath(); g.moveTo(120, 450); g.lineTo(1480, 450); g.moveTo(800, 60); g.lineTo(800, 840); g.stroke();
  } else if (v === 1) {
    setFont(g, `400 640px "${DISP}"`); g.textAlign = 'center'; g.fillText(String(CFG.frameNo - 3), 800, 690); g.textAlign = 'left';
  } else if (v === 2) {
    for (let i = 0; i < 9; i++) { g.globalAlpha = .12 + .1 * i; g.fillRect(90 + i * 160, 90, 150, 720); } g.globalAlpha = 1;
  } else {
    setFont(g, `400 560px "${DISP}"`, 30); g.textAlign = 'center'; g.fillText('RNC', 800, 650); g.textAlign = 'left';
    g.fillRect(140, 730, 1320, 14);
  }
}
function makeTile(v, n) {             // one frame pitch of 35 mm film, 2080×1000
  const [c, g] = mk(2080, 1000);
  const gr = g.createLinearGradient(0, 0, 2080, 0); gr.addColorStop(0, '#1E140C'); gr.addColorStop(.5, '#120C08'); gr.addColorStop(1, '#1A110A');
  g.fillStyle = gr; g.fillRect(0, 0, 2080, 1000);
  for (const px of [52, 1922]) for (let k = 0; k < 4; k++) {     // perforations: the lamp seen through
    const py = 125 + 250 * k - 37; g.fillStyle = '#FFE7B4'; g.beginPath(); g.roundRect(px, py, 106, 74, 15); g.fill();
    g.strokeStyle = 'rgba(120,60,10,.8)'; g.lineWidth = 3; g.stroke();
  }
  g.fillStyle = '#070504'; g.fillRect(176, 0, 92, 1000);         // optical sound track
  g.fillStyle = '#E9D9B4'; g.beginPath(); g.moveTo(222, 0);
  for (let y = 0; y <= 1000; y += 3) g.lineTo(222 + 6 + 30 * Math.abs(noise1((y + n * 1000) * .045) - .5) * (1 + noise1((y + n * 1000) * .004)), y);
  for (let y = 1000; y >= 0; y -= 3) g.lineTo(222 - 6 - 30 * Math.abs(noise1((y + n * 1000) * .045) - .5) * (1 + noise1((y + n * 1000) * .004)), y);
  g.fill();
  g.save(); g.beginPath(); g.roundRect(280, 50, 1600, 900, 12); g.clip(); g.translate(280, 50); frameArt(g, v); g.restore();
  g.fillStyle = 'rgba(232,160,60,.75)'; setFont(g, `700 17px "${MONO}"`, 4);
  g.save(); g.translate(30, 990); g.rotate(-Math.PI / 2); g.fillText(`RNC · SAFETY FILM · ${String(CFG.frameNo - 12 + n).padStart(4, '0')} ▸`, 0, 0); g.restore();
  g.save(); g.translate(2064, 990); g.rotate(-Math.PI / 2); g.fillText('RELENTLESS NON-CONFORMIST  ●  ●', 0, 0); g.restore();
  return c;
}
function makeGate() {                 // out-of-focus gate bracket in front of the film
  const [c, g] = mk(2100, 1300);
  g.filter = 'blur(7px)'; g.fillStyle = '#0B0908'; g.beginPath(); g.roundRect(50, 50, 2000, 1200, 110); g.roundRect(205, 170, 1690, 960, 48); g.fill('evenodd');
  g.strokeStyle = 'rgba(255,186,104,.55)'; g.lineWidth = 6; g.beginPath(); g.roundRect(205, 170, 1690, 960, 48); g.stroke();
  g.strokeStyle = 'rgba(255,220,170,.10)'; g.lineWidth = 3; g.beginPath(); g.roundRect(50, 50, 2000, 1200, 110); g.stroke();
  return c;
}
function makeBokeh() {
  const [c, g] = mk(96, 96), gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
  gr.addColorStop(0, 'rgba(255,214,150,.9)'); gr.addColorStop(.72, 'rgba(255,190,110,.75)'); gr.addColorStop(.86, 'rgba(255,170,80,.35)'); gr.addColorStop(1, 'rgba(255,170,80,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 96, 96); return c;
}
export { COL, DISP, SER, MONO, D2R, PITCH, FX, rnd, noise1, setFont, camera, setBase, useBase, planeTex, mk, backlit, frameArt, makeTile, makeGate, makeBokeh };
