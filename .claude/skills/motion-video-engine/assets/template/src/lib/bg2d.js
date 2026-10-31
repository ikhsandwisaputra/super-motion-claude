// Flat (2D) backgrounds and screen mock-ups.
import { W, H, hash, clamp, ease, PAL, rgba } from "./util.js";
import { getSprite } from "./sprites.js";
import { FONTS } from "./text.js";

export function radial(ctx, c0, c1, c2, cx = 0.45, cy = 0.45, t = 0) {
  const g = ctx.createRadialGradient(cx * W, cy * H, 40, cx * W, cy * H, W * 0.78);
  g.addColorStop(0, c0); g.addColorStop(0.45, c1); g.addColorStop(1, c2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
export function orangeBg(ctx, t) {
  radial(ctx, "#F7801F", "#D9560F", "#5E1E04", 0.42 + Math.sin(t * 0.4) * 0.01, 0.46);
  // slow light blob for life
  const g = ctx.createRadialGradient(0.3 * W, 0.25 * H, 0, 0.3 * W, 0.25 * H, 0.5 * W);
  g.addColorStop(0, "rgba(255,190,110,0.18)"); g.addColorStop(1, "rgba(255,190,110,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
export function redBg(ctx, t) {
  radial(ctx, "#D9151F", "#A60A12", "#3E0004", 0.45, 0.48);
}
export function blackRing(ctx, t, opt = {}) {
  ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, W, H);
  const cx = (opt.cx ?? 0.5) * W, cy = (opt.cy ?? 0.5) * H, r = (opt.r ?? 0.36) * H * (1 + t * 0.01);
  const g = ctx.createRadialGradient(cx, cy, r * 0.82, cx, cy, r * 1.12);
  g.addColorStop(0, "rgba(120,10,12,0)"); g.addColorStop(0.55, `rgba(150,14,18,${opt.a ?? 0.32})`); g.addColorStop(1, "rgba(120,10,12,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g2.addColorStop(0, "rgba(40,6,8,0.55)"); g2.addColorStop(1, "rgba(10,2,2,0)");
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
}

// ---------- desktop intro (Bliss-like wallpaper + editor window) ----------
let wall = null;
function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y) { let f = 0, a = 0.5; for (let i = 0; i < 5; i++) { f += a * vnoise(x, y, i); x *= 2.01; y *= 2.01; a *= 0.5; } return f; }
function wallpaper() {
  if (wall) return wall;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d");
  const sky = g.createLinearGradient(0, 0, 0, H * 0.7);
  sky.addColorStop(0, "#1f5fc4"); sky.addColorStop(0.6, "#5aa0ec"); sky.addColorStop(1, "#a9d3ff");
  g.fillStyle = sky; g.fillRect(0, 0, W, H);
  // clouds: fbm on a low-res grid, upscaled
  const lw = 320, lh = 180;
  const lc = document.createElement("canvas"); lc.width = lw; lc.height = lh;
  const lg = lc.getContext("2d"); const img = lg.createImageData(lw, lh);
  for (let y = 0; y < lh; y++) for (let x = 0; x < lw; x++) {
    const n = fbm(x / 34, y / 22 + 3.1);
    const m = clamp((n - 0.48) * 3.2) * clamp(1.3 - y / lh * 1.4);
    const i = (y * lw + x) * 4;
    img.data[i] = 255; img.data[i + 1] = 255; img.data[i + 2] = 255; img.data[i + 3] = m * 235;
  }
  lg.putImageData(img, 0, 0);
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = "high";
  g.drawImage(lc, 0, 0, W, H);
  // hill
  g.beginPath(); g.moveTo(0, H * 0.72);
  g.bezierCurveTo(W * 0.25, H * 0.55, W * 0.6, H * 0.6, W, H * 0.7);
  g.lineTo(W, H); g.lineTo(0, H); g.closePath();
  const hill = g.createLinearGradient(0, H * 0.55, 0, H);
  hill.addColorStop(0, "#69c043"); hill.addColorStop(0.5, "#3f9a2a"); hill.addColorStop(1, "#2b6f1c");
  g.fillStyle = hill; g.fill();
  g.globalAlpha = 0.18;
  for (let i = 0; i < 2600; i++) { g.fillStyle = hash(i, 1) > 0.5 ? "#9fe070" : "#235c16"; g.fillRect(hash(i, 2) * W, H * 0.62 + hash(i, 3) * H * 0.38, 3, 2); }
  g.globalAlpha = 1;
  wall = c; return c;
}
export function desktop(ctx, t, opt = {}) {
  ctx.drawImage(wallpaper(), 0, 0);
  // editor window
  const x = 0.2 * W, y = 0.17 * H, w = 0.6 * W, h = 0.62 * H;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 50; ctx.shadowOffsetY = 18;
  roundRect(ctx, x, y, w, h, 14); ctx.fillStyle = "#16161b"; ctx.fill();
  ctx.restore();
  ctx.fillStyle = "#24242b"; roundRect(ctx, x, y, w, 40, 14, true); ctx.fillRect(x, y + 26, w, 14);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + 24 + i * 22, y + 20, 7, 0, 7); ctx.fill(); });
  ctx.fillStyle = "#9a9aa6"; ctx.font = FONTS.ui(17); ctx.fillText(opt.title ?? "final.mp4", x + w / 2 - 80, y + 26);
  // preview area: a mini of the hook scene
  const px = x + 24, py = y + 58, pw = w * 0.64, ph = pw * 9 / 16;
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip();
  const g = ctx.createRadialGradient(px + pw * 0.42, py + ph * 0.45, 10, px + pw * 0.42, py + ph * 0.45, pw * 0.7);
  g.addColorStop(0, "#F7801F"); g.addColorStop(1, "#5E1E04"); ctx.fillStyle = g; ctx.fillRect(px, py, pw, ph);
  const s = getSprite("hero", "point");
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(s.canvas, px + pw * 0.28, py + ph * 0.18, s.w * 4.6, s.h * 4.6);
  ctx.fillStyle = "#fff"; ctx.font = FONTS.heavy(46); ctx.fillText("SAME", px + pw * 0.62, py + ph * 0.5);
  ctx.fillStyle = "#E3262F"; ctx.font = FONTS.emph(70); ctx.fillText("WRONG", px + pw * 0.6, py + ph * 0.75);
  ctx.restore();
  // side panel (inspector)
  const sx = px + pw + 18, sw = w - pw - 66;
  for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 3 === 0 ? "#2f2f38" : "#232329"; ctx.fillRect(sx, py + i * 34, sw * (0.5 + hash(i, 4) * 0.5), 20); }
  // timeline
  const ty = py + ph + 22;
  ctx.fillStyle = "#1c1c22"; ctx.fillRect(px, ty, w - 48, h - (ty - y) - 20);
  const clips = [[0, 0.12, PAL.red], [0.13, 0.2, PAL.teal], [0.34, 0.1, "#ff6fb0"], [0.45, 0.22, PAL.red], [0.68, 0.14, PAL.amber], [0.83, 0.15, PAL.teal]];
  clips.forEach(([a, l, c], i) => { ctx.fillStyle = c; ctx.fillRect(px + 10 + a * (w - 68), ty + 14 + (i % 2) * 34, l * (w - 68) - 4, 26); });
  for (let i = 0; i < 120; i++) { const hh = 4 + hash(i, 6) * 20; ctx.fillStyle = "#3d7a73"; ctx.fillRect(px + 10 + i * (w - 68) / 120, ty + 104 - hh / 2, 3, hh); }
  const ph2 = ((t * 0.12) % 1) * (w - 68);
  ctx.fillStyle = "#fff"; ctx.fillRect(px + 10 + ph2, ty + 6, 2, 120);
  // dock
  ctx.fillStyle = "rgba(255,255,255,0.22)"; roundRect(ctx, W / 2 - 260, H - 74, 520, 60, 18); ctx.fill();
  const icons = ["#E3262F", "#19C3B5", "#F5A623", "#D97757", "#4f9dff", "#ffffff", "#8a5cff"];
  icons.forEach((c, i) => { ctx.fillStyle = c; roundRect(ctx, W / 2 - 236 + i * 68, H - 66, 46, 46, 11); ctx.fill(); });
}
export function roundRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  if (fill) ctx.fill();
}

// ---------- creator profile grid: "motion of any theme" ----------
const THEMES = [
  ["FOOTBALL", "#5a0a10", (g, w, h) => { for (let i = 0; i < 5; i++) { g.fillStyle = "rgba(255,240,200,0.25)"; g.beginPath(); g.moveTo(w * (0.1 + i * 0.2), 0); g.lineTo(w * (0.05 + i * 0.22), h); g.lineTo(w * (0.15 + i * 0.22), h); g.fill(); } g.fillStyle = "#fff"; g.beginPath(); g.arc(w * 0.5, h * 0.62, h * 0.16, 0, 7); g.fill(); g.fillStyle = "#111"; g.fillRect(w * 0.47, h * 0.58, h * 0.08, h * 0.08); }],
  ["SCIENCE", "#063f3b", (g, w, h) => { g.strokeStyle = "#19C3B5"; g.lineWidth = 4; const p = [[0.3, 0.4], [0.55, 0.3], [0.7, 0.55], [0.45, 0.7], [0.25, 0.65]]; g.beginPath(); p.forEach(([x, y], i) => (i ? g.lineTo(x * w, y * h) : g.moveTo(x * w, y * h))); g.closePath(); g.stroke(); p.forEach(([x, y], i) => { g.fillStyle = i % 2 ? "#7dffcf" : "#fff"; g.beginPath(); g.arc(x * w, y * h, 10, 0, 7); g.fill(); }); }],
  ["FASHION", "#5a1235", (g, w, h) => { g.fillStyle = "#ff6fb0"; g.fillRect(w * 0.46, 0, w * 0.08, h); g.fillStyle = "#111"; g.beginPath(); g.arc(w * 0.5, h * 0.3, 10, 0, 7); g.fill(); g.beginPath(); g.moveTo(w * 0.5, h * 0.36); g.lineTo(w * 0.62, h * 0.8); g.lineTo(w * 0.38, h * 0.8); g.fill(); }],
  ["FOOD", "#6b4300", (g, w, h) => { const c = ["#f2b84b", "#3f9a2a", "#a3301e", "#f2b84b"]; c.forEach((cc, i) => { g.fillStyle = cc; g.fillRect(w * 0.3, h * (0.3 + i * 0.1), w * 0.4, h * (i === 0 || i === 3 ? 0.12 : 0.07)); }); }],
  ["SPACE", "#1b0b3a", (g, w, h) => { for (let i = 0; i < 40; i++) { g.fillStyle = "#fff"; g.fillRect(hash(i, 1) * w, hash(i, 2) * h, 2, 2); } g.fillStyle = "#8a5cff"; g.beginPath(); g.arc(w * 0.6, h * 0.55, h * 0.22, 0, 7); g.fill(); g.strokeStyle = "#ffd27a"; g.lineWidth = 3; g.beginPath(); g.ellipse(w * 0.6, h * 0.55, h * 0.36, h * 0.08, -0.3, 0, 7); g.stroke(); }],
  ["MUSIC", "#0b0b10", (g, w, h) => { for (let i = 0; i < 14; i++) { const hh = h * (0.15 + hash(i, 5) * 0.5); g.fillStyle = i % 2 ? "#19C3B5" : "#ff4fa0"; g.fillRect(w * 0.12 + i * w * 0.055, h * 0.55 - hh / 2, w * 0.035, hh); } }],
  ["GAMING", "#0f3a18", (g, w, h) => { g.fillStyle = "#58a85c"; g.beginPath(); g.moveTo(0, h); g.lineTo(w * 0.3, h * 0.4); g.lineTo(w * 0.55, h); g.fill(); g.fillStyle = "#3f7f4f"; g.beginPath(); g.moveTo(w * 0.35, h); g.lineTo(w * 0.7, h * 0.3); g.lineTo(w, h); g.fill(); g.fillStyle = "#ffd60a"; g.fillRect(w * 0.15, h * 0.2, 16, 16); }],
  ["THIS VIDEO", "#a33808", (g, w, h) => { const s = getSprite("hero", "point"); g.imageSmoothingEnabled = false; g.drawImage(s.canvas, w * 0.3, h * 0.12, s.w * 3.2, s.h * 3.2); }],
];
export function profile(ctx, t, opt = {}) {
  ctx.fillStyle = "#0c0c10"; ctx.fillRect(0, 0, W, H);
  // header
  const s = getSprite("hero", "idle");
  ctx.save(); ctx.beginPath(); ctx.arc(250, 150, 78, 0, 7); ctx.fillStyle = "#E8641A"; ctx.fill(); ctx.clip();
  ctx.imageSmoothingEnabled = false; ctx.drawImage(s.canvas, 250 - s.w * 3.4, 150 - 92, s.w * 6.8, s.h * 6.8); ctx.restore();
  ctx.fillStyle = "#fff"; ctx.font = FONTS.heavy(46); ctx.fillText(opt.name ?? "Your Name", 360, 140);
  ctx.fillStyle = "#9a9aa6"; ctx.font = FONTS.ui(26); ctx.fillText(opt.sub ?? "motion graphics · directed by me, built with Claude", 362, 186);
  ctx.fillStyle = "#2a2a33"; ctx.fillRect(0, 262, W, 2);
  ctx.fillStyle = "#fff"; ctx.fillRect(W / 2 - 160, 258, 120, 6);
  // grid
  const cols = 4, gw = (W - 160 - (cols - 1) * 22) / cols, gh = gw * 0.56;
  THEMES.forEach(([label, bg, art], i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = 80 + c * (gw + 22), y = 300 + r * (gh + 26);
    const k = ease.outExpo(clamp((t - (opt.t0 ?? 0)) * 30 / 5 - i * 0.25));
    ctx.save();
    ctx.translate(x + gw / 2, y + gh / 2); ctx.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); ctx.translate(-gw / 2, -gh / 2);
    ctx.globalAlpha = k;
    ctx.beginPath(); ctx.rect(0, 0, gw, gh); ctx.clip();
    ctx.fillStyle = bg; ctx.fillRect(0, 0, gw, gh);
    art(ctx, gw, gh);
    ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(0, gh - 54, gw, 54);
    ctx.fillStyle = "#fff"; ctx.font = FONTS.emph(34); ctx.fillText(label, 16, gh - 14);
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.moveTo(gw - 46, gh - 40); ctx.lineTo(gw - 22, gh - 27); ctx.lineTo(gw - 46, gh - 14); ctx.fill();
    ctx.restore();
  });
  // cursor gliding to "THIS VIDEO"
  const k = ease.inOutQuart(clamp((t - (opt.t0 ?? 0)) / 0.45));
  const cx = 1200 + (1640 - 1200) * k, cy = 760 + (820 - 760) * k;
  ctx.fillStyle = "#fff"; ctx.strokeStyle = "#000"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + 34); ctx.lineTo(cx + 9, cy + 26); ctx.lineTo(cx + 16, cy + 40); ctx.lineTo(cx + 22, cy + 37); ctx.lineTo(cx + 15, cy + 24); ctx.lineTo(cx + 26, cy + 24); ctx.closePath(); ctx.fill(); ctx.stroke();
}

// ---------- AI "slop" card ribbon ----------
const SLOP = [
  ["#7b2ff7", "#f107a3", "COOL"], ["#00c6ff", "#7b2ff7", "EPIC"], ["#f857a6", "#ff5858", "WOW"], ["#43e97b", "#38f9d7", "AMAZING"],
  ["#fa709a", "#fee140", "MOTION"], ["#4facfe", "#00f2fe", "VIRAL"], ["#a18cd1", "#fbc2eb", "AWESOME"], ["#ff9a9e", "#fad0c4", "4K HD"],
];
const slopCache = [];
function slopCard(i) {
  if (slopCache[i]) return slopCache[i];
  const c = document.createElement("canvas"); c.width = 420; c.height = 260;
  const g = c.getContext("2d");
  const [a, b, word] = SLOP[i % SLOP.length];
  const gr = g.createLinearGradient(0, 0, 420, 260); gr.addColorStop(0, a); gr.addColorStop(1, b);
  g.fillStyle = gr; g.fillRect(0, 0, 420, 260);
  g.globalAlpha = 0.35; g.fillStyle = "#fff";
  for (let k = 0; k < 6; k++) { g.beginPath(); g.arc(hash(i, k) * 420, hash(k, i) * 260, 20 + hash(i, k, 3) * 60, 0, 7); g.fill(); }
  g.globalAlpha = 1;
  g.font = "italic 900 64px Poppins"; g.textAlign = "center";
  g.shadowColor = "rgba(0,0,0,0.4)"; g.shadowBlur = 16; g.fillStyle = "#fff"; g.fillText(word, 210, 150);
  g.font = "600 22px Inter"; g.fillText("✨ AI generated ✨", 210, 200);
  g.strokeStyle = "rgba(255,255,255,0.8)"; g.lineWidth = 8; g.strokeRect(4, 4, 412, 252);
  slopCache[i] = c; return c;
}
export function slopRibbon(ctx, t, t0) {
  ctx.fillStyle = "#070505"; ctx.fillRect(0, 0, W, H);
  const v = ctx.createRadialGradient(W * 0.5, H * 0.6, 100, W * 0.5, H * 0.6, W * 0.7);
  v.addColorStop(0, "rgba(90,10,14,0.55)"); v.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  const n = 11;
  const prog = (t - t0) * 0.9;
  for (let i = n - 1; i >= 0; i--) {
    const u = i / n - prog * 0.55 + 0.35; // position along the ribbon
    if (u < -0.15 || u > 1.15) continue;
    const ang = -0.5 + u * 2.4;
    const cx = W * (0.05 + u * 0.95), cy = H * (0.9 - Math.sin(u * 2.6) * 0.42);
    const sc = 0.75 + Math.sin(u * 3) * 0.25;
    const skew = Math.cos(ang * 1.7) * 0.6;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.transform(Math.cos(ang) * sc, Math.sin(ang) * sc * 0.4, skew * sc, sc * (0.7 + 0.3 * Math.cos(ang)), 0, 0);
    ctx.shadowColor = "rgba(0,0,0,0.6)"; ctx.shadowBlur = 30;
    ctx.drawImage(slopCard(i), -210, -130);
    ctx.restore();
  }
}
