// Backgrounds for the second half: storm (epic zoom + lightning), monochrome cosmos (galaxy, planet
// horizon, moon), teal grid void, and the four theme scenes. Noise fields are fBm (5 octaves,
// lacunarity 2.01, gain 0.5 — motion-docs 02-shaders-webgl/inigo-quilez NOTES) baked once at low res.
import { W, H, hash, clamp, ease, lerp, PAL, rng } from "./util.js";
import { getSprite } from "./sprites.js";

function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, s = 0) { let f = 0, a = 0.5; for (let i = 0; i < 5; i++) { f += a * vnoise(x, y, i + s); x = x * 2.01 + 3.1; y = y * 2.01 - 1.7; a *= 0.5; } return f; }
const cache = new Map();
function baked(key, w, h, fn) {
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); const img = g.createImageData(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const [r, gg, b, a] = fn(x / w, y / h); img.data.set([r, gg, b, a ?? 255], (y * w + x) * 4); }
  g.putImageData(img, 0, 0); cache.set(key, c); return c;
}

// ---------- storm: blue-white cloud tunnel with a bright core; zoom is driven by the shot ----------
function stormTex() {
  return baked("storm", 640, 360, (u, v) => {
    const dx = (u - 0.5) * 1.78, dy = v - 0.48, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
    const q = fbm(a * 2.2 + 10, r * 5.0, 3), n = fbm(u * 5 + q * 2.4, v * 3 + q * 2.4, 7);
    const core = Math.exp(-r * 5.5);
    const c = clamp(n * 1.25 - 0.28 + core * 0.9);
    return [lerp(6, 210, c) + core * 40, lerp(14, 228, c) + core * 30, lerp(38, 255, c), 255];
  });
}
export function storm(g, t, t0, opt = {}) {
  const z = 1 + (t - t0) * (opt.zoom ?? 0.28);
  g.fillStyle = "#040812"; g.fillRect(0, 0, W, H);
  g.save(); g.translate(W / 2, H * 0.48); g.rotate((t - t0) * 0.05); g.scale(z * 1.15, z * 1.15);
  g.imageSmoothingQuality = "high"; g.drawImage(stormTex(), -W / 2, -H * 0.48, W, H); g.restore();
  for (const b of opt.bolts || []) bolt(g, t, b);
}
// lightning: recursive midpoint displacement (seeded), white core + blue glow, 3-frame life
function boltPath(seed, x0, y0, x1, y1) {
  const R = rng(seed); let pts = [[x0, y0], [x1, y1]];
  let amp = Math.hypot(x1 - x0, y1 - y0) * 0.22;
  for (let k = 0; k < 6; k++) {
    const np = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
      const mx = (ax + bx) / 2, my = (ay + by) / 2, nx = -(by - ay), ny = bx - ax, l = Math.hypot(nx, ny) || 1;
      const o = (R() - 0.5) * amp; np.push([mx + nx / l * o, my + ny / l * o], [bx, by]);
    }
    pts = np; amp *= 0.55;
  }
  return pts;
}
export function bolt(g, t, b) {
  const f = (t - b.t) * 30; if (f < 0 || f > 4) return;
  const pts = boltPath(b.seed ?? 1, b.x0 * W, b.y0 * H, b.x1 * W, b.y1 * H);
  const a = f < 1 ? 1 : 1 - (f - 1) / 3;
  g.save(); g.lineCap = "round"; g.lineJoin = "round";
  for (const [w, c] of [[18, `rgba(120,170,255,${0.25 * a})`], [7, `rgba(190,220,255,${0.6 * a})`], [2.5, `rgba(255,255,255,${a})`]]) {
    g.strokeStyle = c; g.lineWidth = w; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke();
  }
  g.restore();
}

// ---------- monochrome cosmos ----------
function stars(g, t, n = 420, seed = 1, drift = 6) {
  for (let i = 0; i < n; i++) {
    const x = ((hash(i, seed) * W + t * drift * (0.3 + hash(i, 4))) % W), y = hash(i, seed + 1) * H;
    const s = hash(i, 3) < 0.94 ? 1.4 : 2.6, tw = 0.55 + 0.45 * Math.sin(t * 2 + i);
    g.fillStyle = `rgba(255,255,255,${(0.25 + 0.6 * hash(i, 5)) * tw})`; g.fillRect(x, y, s, s);
  }
}
function galaxyTex() {
  return baked("galaxy", 640, 360, (u, v) => {
    const dx = (u - 0.35) * 1.78, dy = (v - 0.4), r = Math.hypot(dx * 1.0, dy * 2.6);
    const a = Math.atan2(dy * 2.6, dx) + r * 5.5;
    const arms = Math.pow(0.5 + 0.5 * Math.cos(a * 2), 3) * Math.exp(-r * 2.2);
    const n = fbm(u * 6, v * 6, 11);
    const c = clamp(arms * (0.6 + n) + Math.exp(-r * 9) * 1.2);
    const neb = clamp(fbm(u * 2.5 + 7, v * 2.5, 13) * 1.4 - 0.75) * 0.5;
    const L = clamp(c + neb) * 255;
    return [L, L, L * 1.02, 255];
  });
}
export function galaxy(g, t, t0) {
  g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
  const z = 1.05 + (t - t0) * 0.02;
  g.save(); g.translate(W / 2, H / 2); g.rotate(-0.12 + (t - t0) * 0.01); g.scale(z, z); g.drawImage(galaxyTex(), -W / 2, -H / 2, W, H); g.restore();
  stars(g, t - t0, 380, 21, 4);
}
function planetTex() {
  return baked("planet", 512, 512, (u, v) => {
    const dx = u - 0.5, dy = v - 0.5, r = Math.hypot(dx, dy) * 2;
    if (r > 1) return [0, 0, 0, 0];
    const n = fbm(u * 7 + fbm(u * 3, v * 3, 2) * 2, v * 7, 17);
    const lit = clamp(0.25 + (-dx * 0.4 - dy * 0.9));
    const L = clamp(n * 0.9 * (0.35 + lit) + Math.pow(r, 6) * 0.35) * 255;
    return [L, L, L, 255];
  });
}
export function planet(g, t, t0) {
  g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
  stars(g, t - t0, 300, 31, 3);
  const R = W * 0.95, cy = H * 0.98 + R * 0.62 - (t - t0) * 6;
  g.save(); g.translate(W / 2, cy); g.rotate((t - t0) * 0.012);
  const glow = g.createRadialGradient(0, 0, R * 0.98, 0, 0, R * 1.08);
  glow.addColorStop(0, "rgba(220,225,235,0.35)"); glow.addColorStop(1, "rgba(220,225,235,0)");
  g.fillStyle = glow; g.beginPath(); g.arc(0, 0, R * 1.08, 0, 7); g.fill();
  g.drawImage(planetTex(), -R, -R, R * 2, R * 2); g.restore();
}
export function moon(g, t, t0) {
  g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
  stars(g, t - t0, 260, 41, 2);
  const R = H * 0.36 * (1 + (t - t0) * 0.012);
  g.save(); g.translate(W / 2, H * 0.47); g.rotate(-(t - t0) * 0.02);
  g.drawImage(planetTex(), -R, -R, R * 2, R * 2);
  const sh = g.createRadialGradient(-R * 0.4, -R * 0.4, R * 0.2, 0, 0, R * 1.05);
  sh.addColorStop(0, "rgba(0,0,0,0)"); sh.addColorStop(1, "rgba(0,0,0,0.75)");
  g.fillStyle = sh; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill(); g.restore();
}
// dot-matrix sphere (calm "without it" beat)
export function dotSphere(g, t, t0) {
  g.fillStyle = "#020203"; g.fillRect(0, 0, W, H);
  const R = H * 0.3, a = (t - t0) * 0.35;
  for (let i = 0; i < 900; i++) {
    const yy = 1 - (i / 899) * 2, r = Math.sqrt(1 - yy * yy), th = i * 2.39996 + a;
    const x = Math.cos(th) * r, z = Math.sin(th) * r;
    if (z < -0.05) continue;
    const s = 1.5 + z * 2.2;
    g.fillStyle = `rgba(235,238,245,${0.25 + z * 0.65})`;
    g.fillRect(W / 2 + x * R - s / 2, H * 0.48 - yy * R - s / 2, s, s);
  }
}

// ---------- teal grid void ----------
export function gridVoid(g, t, opt = {}) {
  g.fillStyle = "#030406"; g.fillRect(0, 0, W, H);
  const hz = H * (opt.horizon ?? 0.6), off = (t * (opt.speed ?? 40)) % 80;
  g.save(); g.strokeStyle = "rgba(25,195,181,0.55)"; g.lineWidth = 1.5;
  for (let i = -30; i <= 30; i++) { g.beginPath(); g.moveTo(W / 2 + i * 22, hz); g.lineTo(W / 2 + i * 260, H * 1.6); g.stroke(); }
  for (let k = 0; k < 18; k++) { const d = Math.pow((k * 80 + off) / 1440, 2.2); const y = hz + d * (H * 1.05); if (y > H) break; g.globalAlpha = clamp(d * 3); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.restore();
  const fog = g.createLinearGradient(0, hz - 60, 0, hz + 220); fog.addColorStop(0, "rgba(3,4,6,1)"); fog.addColorStop(1, "rgba(3,4,6,0)");
  g.fillStyle = fog; g.fillRect(0, hz - 60, W, 280);
  const glow = g.createRadialGradient(W * 0.5, hz, 10, W * 0.5, hz, W * 0.5); glow.addColorStop(0, "rgba(25,195,181,0.12)"); glow.addColorStop(1, "rgba(25,195,181,0)");
  g.fillStyle = glow; g.fillRect(0, 0, W, H);
}
export function blackSoft(g, t, tint = "rgba(60,20,10,0.35)") {
  g.fillStyle = "#050404"; g.fillRect(0, 0, W, H);
  const v = g.createRadialGradient(W * 0.55, H * 0.55, 50, W * 0.55, H * 0.55, W * 0.6); v.addColorStop(0, tint); v.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = v; g.fillRect(0, 0, W, H);
}

// ---------- theme scenes ("any theme") ----------
export function themeBg(g, t, kind, t0 = 0) {
  const lt = t - t0;
  if (kind === "football") {
    g.fillStyle = "#0b2a12"; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 12; i++) { // perspective pitch stripes
      const y0 = H * 0.45 + Math.pow(i / 12, 1.6) * H * 0.6, y1 = H * 0.45 + Math.pow((i + 1) / 12, 1.6) * H * 0.6;
      g.fillStyle = i % 2 ? "#1d6b2c" : "#23803a"; g.fillRect(0, y0, W, y1 - y0 + 1);
    }
    g.fillStyle = "#06120a"; g.fillRect(0, 0, W, H * 0.45);
    for (let i = 0; i < 4; i++) { // floodlight beams
      const x = W * (0.12 + i * 0.25); const gr = g.createLinearGradient(x, 0, x, H * 0.8); gr.addColorStop(0, "rgba(255,250,220,0.55)"); gr.addColorStop(1, "rgba(255,250,220,0)");
      g.fillStyle = gr; g.beginPath(); g.moveTo(x - 20, 0); g.lineTo(x + 20, 0); g.lineTo(x + 260 - i * 120, H * 0.85); g.lineTo(x - 140 - i * 60, H * 0.85); g.fill();
      g.fillStyle = "#fffbe6"; g.fillRect(x - 40, H * 0.05, 80, 22);
    }
    g.strokeStyle = "rgba(255,255,255,0.75)"; g.lineWidth = 5; g.beginPath(); g.ellipse(W * 0.5, H * 0.78, W * 0.22, H * 0.09, 0, 0, 7); g.stroke();
    const bx = W * (0.72 - lt * 0.05), by = H * 0.78 - Math.abs(Math.sin(lt * 7)) * H * 0.12;
    const s = getSprite("prop", "ball"); g.imageSmoothingEnabled = false; g.drawImage(s.canvas, bx, by, s.w * 9, s.h * 9);
  } else if (kind === "fashion") {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#2a0a1e"); gr.addColorStop(1, "#5a1235"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = "#ff6fb0"; g.beginPath(); g.moveTo(W * 0.44, H * 0.45); g.lineTo(W * 0.56, H * 0.45); g.lineTo(W * 0.8, H); g.lineTo(W * 0.2, H); g.fill();
    for (let i = 0; i < 9; i++) { g.fillStyle = `rgba(255,255,255,${0.35 + 0.3 * Math.sin(lt * 9 + i * 1.7)})`; g.beginPath(); g.arc(W * (0.08 + i * 0.105), H * 0.32 + Math.sin(i) * 20, 10 + (i % 3) * 5, 0, 7); g.fill(); } // camera flashes
    const sp = g.createRadialGradient(W * 0.5, H * 0.55, 10, W * 0.5, H * 0.55, H * 0.6); sp.addColorStop(0, "rgba(255,240,250,0.45)"); sp.addColorStop(1, "rgba(255,240,250,0)"); g.fillStyle = sp; g.fillRect(0, 0, W, H);
    g.fillStyle = "#14060e"; const mx = W * 0.5, my = H * (0.5 + lt * 0.04); // model silhouette walking down the runway
    g.beginPath(); g.arc(mx, my - 150, 34, 0, 7); g.fill(); g.beginPath(); g.moveTo(mx - 30, my - 110); g.lineTo(mx + 30, my - 110); g.lineTo(mx + 95, my + 120); g.lineTo(mx - 95, my + 120); g.fill();
  } else if (kind === "science") {
    g.fillStyle = "#03211f"; g.fillRect(0, 0, W, H);
    const v = g.createRadialGradient(W * 0.5, H * 0.5, 50, W * 0.5, H * 0.5, W * 0.6); v.addColorStop(0, "rgba(25,195,181,0.35)"); v.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = v; g.fillRect(0, 0, W, H);
    const atoms = [[0.25, 0.3], [0.4, 0.22], [0.55, 0.35], [0.7, 0.25], [0.82, 0.45], [0.62, 0.55], [0.35, 0.55], [0.18, 0.62], [0.5, 0.72], [0.78, 0.7]];
    const P = atoms.map(([x, y], i) => [W * (x + Math.sin(lt * 1.4 + i) * 0.012), H * (y + Math.cos(lt * 1.2 + i) * 0.015)]);
    g.strokeStyle = "rgba(125,255,207,0.7)"; g.lineWidth = 5;
    [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7], [5, 8], [4, 9], [8, 9], [0, 6]].forEach(([a, b]) => { g.beginPath(); g.moveTo(...P[a]); g.lineTo(...P[b]); g.stroke(); });
    P.forEach(([x, y], i) => { g.fillStyle = i % 3 ? "#19C3B5" : "#ffffff"; g.beginPath(); g.arc(x, y, i % 3 ? 22 : 30, 0, 7); g.fill(); });
  } else if (kind === "food") {
    g.fillStyle = "#f5a623"; g.fillRect(0, 0, W, H);
    g.save(); g.translate(W / 2, H / 2); g.rotate(lt * 0.2);
    for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? "#ffc94d" : "#f5a623"; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, W, (i / 16) * Math.PI * 2, ((i + 1) / 16) * Math.PI * 2); g.fill(); }
    g.restore();
    const layers = [["#f2b84b", 0.13, 0.62], ["#3f9a2a", 0.05, 0.53], ["#e3262f", 0.05, 0.47], ["#6b3a1e", 0.09, 0.39], ["#ffd60a", 0.04, 0.33], ["#f2b84b", 0.15, 0.2]];
    const bob = Math.sin(lt * 5) * 8;
    for (const [c, h, y] of layers) { g.fillStyle = c; g.beginPath(); g.roundRect(W * 0.6, H * y + bob, W * 0.28, H * h, 26); g.fill(); g.strokeStyle = "#3a1a08"; g.lineWidth = 6; g.stroke(); }
  }
}
export const THEME_COLORS = { football: "#23803a", fashion: "#ff6fb0", science: "#19C3B5", food: "#f5a623" };
