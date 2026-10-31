// Painters for 3D "panels" (UI & data elements that live on the type stage and follow the camera).
// Each returns paint(g, t, w, h) drawing in logical px; stage.js uploads the canvas as a plane.
import { FPS, clamp, ease, hash, lerp, PAL } from "./util.js";
import { FONTS } from "./text.js";
import { getSprite } from "./sprites.js";
import { themeBg } from "./scenes2.js";

const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

// pixel-font count-up (expo-out), e.g. 0 -> 250 "MB"
export const counter = (o) => (g, t, w, h) => {
  const k = ease.outExpo(clamp((t - o.t0) / (o.dur ?? 1.0)));
  const v = Math.round(lerp(o.from ?? 0, o.to, k));
  g.font = FONTS.pixel(o.size ?? 220); g.textBaseline = "alphabetic";
  g.shadowColor = o.glow ?? "rgba(255,122,26,0.55)"; g.shadowBlur = 24;
  g.fillStyle = o.color ?? PAL.counter; g.fillText(String(v), 0, h * 0.8);
  if (o.suffix) { const x = g.measureText(String(o.to)).width + 18; g.font = FONTS.pixel((o.size ?? 220) * 0.42); g.fillText(o.suffix, x, h * 0.8); }
};
// 10-square level meter filling one by one
export const meter = (o) => (g, t, w, h) => {
  const n = o.n ?? 10, gap = 8, s = (w - gap * (n - 1)) / n;
  const filled = clamp((t - o.t0) / (o.dur ?? 0.6)) * (o.to ?? n);
  for (let i = 0; i < n; i++) {
    const on = i < filled, pulse = on && i >= filled - 1 ? 1 : 0;
    g.fillStyle = on ? (o.color ?? "#ff6a5a") : "rgba(255,255,255,0.12)";
    g.shadowColor = on ? "rgba(255,90,80,0.6)" : "transparent"; g.shadowBlur = on ? 14 + pulse * 10 : 0;
    g.fillRect(i * (s + gap), 0, s, h - 22);
  }
  g.shadowBlur = 0; g.fillStyle = "rgba(255,255,255,0.7)"; g.font = FONTS.silk(16); g.fillText(o.label ?? "LEVEL", 0, h - 2);
};
// continuous progress bar ("heavy lifting")
export const progress = (o) => (g, t, w, h) => {
  const k = ease.outCubic(clamp((t - o.t0) / (o.dur ?? 1.2))) * (o.to ?? 0.85);
  rr(g, 0, 0, w, h, h / 2); g.fillStyle = "rgba(255,255,255,0.1)"; g.fill();
  const gr = g.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, "#19C3B5"); gr.addColorStop(1, "#ffd60a");
  rr(g, 4, 4, Math.max(h - 8, (w - 8) * k), h - 8, (h - 8) / 2); g.fillStyle = gr; g.fill();
};
// framework panel: teal frame -> TV static -> four pixel-textured bars
export const framework = (o) => (g, t, w, h) => {
  g.fillStyle = "#06090b"; g.fillRect(0, 0, w, h);
  const bars = ["#e3262f", "#efe3c8", "#19C3B5", "#f5c518"];
  if (t >= o.tStatic && t < o.tBars) {
    for (let i = 0; i < 1400; i++) { const v = hash(i, Math.floor(t * 30)) * 255; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(hash(i, 2) * w, hash(i, 3, Math.floor(t * 30)) * h, 6, 6); }
  }
  if (t >= o.tBars) {
    const bw = (w - 60) / 4;
    bars.forEach((c, i) => {
      const k = ease.outExpo(clamp((t - o.tBars - i * 0.08) * 4));
      const bh = (h - 60) * k;
      g.fillStyle = c; g.fillRect(30 + i * bw, h - 30 - bh, bw - 6, bh);
      g.fillStyle = "rgba(0,0,0,0.12)"; // pixel texture
      for (let y = 0; y < bh; y += 14) for (let x = 0; x < bw - 6; x += 14) if (hash(i, x, y) > 0.6) g.fillRect(30 + i * bw + x, h - 30 - bh + y, 7, 7);
    });
  }
  g.strokeStyle = "#19C3B5"; g.lineWidth = 14; g.shadowColor = "rgba(25,195,181,0.9)"; g.shadowBlur = 30; g.strokeRect(7, 7, w - 14, h - 14); g.shadowBlur = 0;
};
// icon tile (dark rounded square with a pixel icon)
export const tile = (o) => (g, t, w, h) => {
  rr(g, 4, 4, w - 8, h - 8, 34); g.fillStyle = "#1b1c24"; g.fill();
  g.lineWidth = 3; g.strokeStyle = "rgba(255,255,255,0.12)"; g.stroke();
  const s = getSprite("prop", o.icon), sc = Math.floor((w * 0.56) / Math.max(s.w, s.h));
  g.imageSmoothingEnabled = false; g.drawImage(s.canvas, (w - s.w * sc) / 2, (h - s.h * sc) / 2, s.w * sc, s.h * sc);
};
// chat input bar that types a keyword; the send button lights when sent
export const inputBar = (o) => (g, t, w, h) => {
  rr(g, 0, 0, w, h, h / 2); g.fillStyle = "rgba(24,25,31,0.92)"; g.fill(); g.lineWidth = 2; g.strokeStyle = "rgba(255,255,255,0.14)"; g.stroke();
  const n = Math.max(0, Math.min(o.text.length, Math.floor((t - o.t0) * (o.cps ?? 7))));
  g.font = FONTS.conn(o.font ?? 34); g.fillStyle = n ? "#f2f2f6" : "rgba(255,255,255,0.35)";
  const txt = n ? o.text.slice(0, n) : (o.placeholder ?? "");
  g.fillText(txt, h * 0.55, h * 0.64);
  if (n < o.text.length || Math.floor(t * 2.2) % 2 === 0) { g.fillStyle = PAL.teal; g.fillRect(h * 0.55 + g.measureText(n ? txt : "").width + 4, h * 0.28, 3, h * 0.44); }
  const sent = o.sendAt !== undefined && t >= o.sendAt;
  g.beginPath(); g.arc(w - h * 0.55, h / 2, h * 0.32, 0, 7); g.fillStyle = sent ? PAL.teal : "#3a3b46"; g.fill();
  g.fillStyle = sent ? "#04201d" : "#9a9aa6"; g.beginPath(); g.moveTo(w - h * 0.67, h * 0.36); g.lineTo(w - h * 0.4, h * 0.5); g.lineTo(w - h * 0.67, h * 0.64); g.fill();
};
export const toast = (o) => (g, t, w, h) => {
  rr(g, 0, 0, w, h, 22); g.fillStyle = "rgba(22,23,29,0.95)"; g.fill(); g.lineWidth = 2; g.strokeStyle = "rgba(25,195,181,0.5)"; g.stroke();
  const s = getSprite("prop", o.icon ?? "film"); g.imageSmoothingEnabled = false; g.drawImage(s.canvas, 26, (h - s.h * 6) / 2, s.w * 6, s.h * 6);
  g.fillStyle = "#ffffff"; g.font = FONTS.content(34); g.fillText(o.title, 110, h * 0.45);
  g.fillStyle = "rgba(255,255,255,0.6)"; g.font = FONTS.ui(24); g.fillText(o.sub, 110, h * 0.78);
};
// floating video-player card; content = the film itself at mapped time (PiP rewind)
export const videoCard = (o) => (g, t, w, h) => {
  rr(g, 0, 0, w, h, 26); g.fillStyle = "#15161c"; g.fill();
  g.fillStyle = "#24252d"; g.fillRect(0, 26, w, 34); rr(g, 0, 0, w, 60, 26); g.fill();
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(30 + i * 26, 30, 8, 0, 7); g.fill(); });
  g.fillStyle = "#a0a0ad"; g.font = FONTS.ui(22); g.fillText(o.title ?? "video.mp4", 120, 38);
  const cx = 18, cy = 72, cw = w - 36, ch = h - 130;
  const src = o.snapshot(o.map(t));
  g.drawImage(src, cx, cy, cw, ch);
  const p = clamp(o.map(t) / (o.total ?? 120));
  g.fillStyle = "rgba(255,255,255,0.18)"; g.fillRect(cx, h - 40, cw, 8); g.fillStyle = PAL.red; g.fillRect(cx, h - 40, cw * p, 8);
  if (o.rewind && t >= o.rewind[0] && t < o.rewind[1]) { // rewind badge
    g.fillStyle = "rgba(0,0,0,0.55)"; rr(g, cx + 20, cy + 20, 150, 64, 14); g.fill();
    g.fillStyle = "#fff"; for (const dx of [0, 44]) { g.beginPath(); g.moveTo(cx + 92 + dx, cy + 34); g.lineTo(cx + 56 + dx, cy + 52); g.lineTo(cx + 92 + dx, cy + 70); g.fill(); }
  }
};
// animated strike-through line (for "prompt." -> crossed out)
export const strike = (o) => (g, t, w, h) => {
  const k = ease.outExpo(clamp((t - o.t0) * FPS / 6));
  g.strokeStyle = o.color ?? PAL.red; g.lineWidth = h * 0.5; g.lineCap = "round";
  g.shadowColor = "rgba(227,38,47,0.6)"; g.shadowBlur = 14;
  g.beginPath(); g.moveTo(h * 0.3, h / 2); g.lineTo(h * 0.3 + (w - h * 0.6) * k, h / 2 - h * 0.08 * k); g.stroke();
};
// theme card for the "any theme" grid
export const themeCard = (o) => (g, t, w, h) => {
  rr(g, 0, 0, w, h, 22); g.save(); g.clip();
  g.save(); g.scale(w / 1920, h / 1080); themeBg(g, t, o.kind, o.t0 ?? 0); g.restore();
  g.fillStyle = "rgba(0,0,0,0.45)"; g.fillRect(0, h - 70, w, 70);
  g.fillStyle = "#fff"; g.font = FONTS.emph(46); g.fillText(o.label, 22, h - 20);
  g.restore(); g.lineWidth = 4; g.strokeStyle = "rgba(255,255,255,0.8)"; rr(g, 2, 2, w - 4, h - 4, 22); g.stroke();
};
// arrow glyph for the calm section
export const arrow = (o) => (g, t, w, h) => {
  const k = ease.outExpo(clamp((t - o.t0) * FPS / 8));
  g.strokeStyle = "#f4f4f6"; g.lineWidth = 7; g.lineCap = "round"; g.lineJoin = "round";
  g.beginPath(); g.moveTo(8, h / 2); g.lineTo(8 + (w - 30) * k, h / 2); g.stroke();
  if (k > 0.6) { g.beginPath(); g.moveTo(w - 40, h / 2 - 22); g.lineTo(w - 14, h / 2); g.lineTo(w - 40, h / 2 + 22); g.stroke(); }
};
