// Screen content for the voxel monitor (1280x720 canvas texture).
import { clamp, hash, ease } from "./util.js";
import { FONTS } from "./text.js";
import { roundRect } from "./bg2d.js";
import { getSprite } from "./sprites.js";

const SW = 1280, SH = 720;
function chrome(g, title) {
  g.fillStyle = "#24252d"; g.fillRect(0, 0, SW, SH);
  g.fillStyle = "#33343e"; g.fillRect(0, 0, SW, 54);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(30 + i * 28, 27, 9, 0, 7); g.fill(); });
  g.fillStyle = "#a0a0ad"; g.font = FONTS.ui(22); g.fillText(title, 130, 35);
}
// Chat: a vague prompt and the slop it gets back
export function chatUI(g, t, t0, opt = {}) {
  chrome(g, "Claude — new chat");
  const prompt = opt.prompt ?? "make me a cool motion video";
  const n = Math.min(prompt.length, Math.max(0, Math.floor((t - t0) * 26)));
  // input bar
  g.fillStyle = "#3a3b46"; roundRect(g, 80, SH - 120, SW - 160, 74, 18); g.fill();
  if (opt.greet) { g.fillStyle = "#f2efe9"; g.font = "500 64px Inter"; g.fillText(opt.greet, 260, 300); }
  g.fillStyle = "#e9e9ef"; g.font = FONTS.ui(30);
  if (t < (opt.sendAt ?? 1e9)) {
    g.fillText(prompt.slice(0, n), 112, SH - 72);
    if (Math.floor(t * 2.2) % 2 === 0) g.fillRect(114 + g.measureText(prompt.slice(0, n)).width, SH - 98, 3, 32);
  }
  g.fillStyle = "#D97757"; roundRect(g, SW - 150, SH - 108, 52, 50, 12); g.fill();
  if (t >= (opt.sendAt ?? 1e9)) {
    g.fillStyle = "#2a2a33"; roundRect(g, SW - 620, 90, 520, 70, 18); g.fill();
    g.fillStyle = "#e9e9ef"; g.font = FONTS.ui(28); g.fillText(prompt, SW - 596, 135);
    const k = clamp((t - opt.sendAt - 0.25) * 2);
    if (k > 0) {
      const gr = g.createLinearGradient(120, 200, 620, 500); gr.addColorStop(0, "#7b2ff7"); gr.addColorStop(1, "#f107a3");
      g.globalAlpha = k; g.fillStyle = gr; roundRect(g, 120, 200, 520, 300, 16); g.fill();
      g.fillStyle = "#fff"; g.font = "italic 900 72px Poppins"; g.fillText("COOL!!", 230, 380);
      g.font = FONTS.ui(24); g.fillStyle = "#c9c9d4"; g.fillText("Here's your cool motion video ✨", 120, 545); g.globalAlpha = 1;
    }
  }
}
// Code editor: the formula being written
export const FORMULA_LINES = [
  ["#", "# FORMULA.md — how I direct motion", "#7f8c98"],
  ["1", "read: motion-docs/ before any frame", "#e9e9ef"],
  ["2", "one hero idea per scene", "#e9e9ef"],
  ["3", "springs, not linear  (ζ 0.5–0.7)", "#19C3B5"],
  ["4", "every word lands on its VO frame", "#e9e9ef"],
  ["5", "hold one beat before the hit", "#F5A623"],
  ["6", "red = conflict · teal = data", "#E3262F"],
  ["7", "exit faster than you enter", "#e9e9ef"],
];
export function codeUI(g, t, t0, opt = {}) {
  chrome(g, "FORMULA.md — motion");
  g.fillStyle = "#1c1d24"; g.fillRect(0, 54, 230, SH - 54);
  ["motion-docs/", "  03-choreography", "  04-physics", "  07-generative", "  11-three", "FORMULA.md"].forEach((s, i) => {
    g.fillStyle = s === "FORMULA.md" ? "#D97757" : "#7f8c98"; g.font = FONTS.mono(18); g.fillText(s, 18, 96 + i * 34);
  });
  const cps = opt.cps ?? 34;
  let budget = Math.max(0, (t - t0) * cps);
  FORMULA_LINES.forEach(([ln, txt, col], i) => {
    const y = 110 + i * 66;
    g.fillStyle = "#4a4a55"; g.font = FONTS.mono(22); g.fillText(String(i + 1).padStart(2, " "), 262, y);
    const n = Math.min(txt.length, Math.floor(budget)); budget -= txt.length;
    if (n <= 0) return;
    g.fillStyle = col; g.font = FONTS.mono(i === 0 ? 30 : 28); g.fillText(txt.slice(0, n), 320, y);
    if (n < txt.length && Math.floor(t * 4) % 2 === 0) { g.fillStyle = "#fff"; g.fillRect(322 + g.measureText(txt.slice(0, n)).width, y - 26, 3, 32); }
  });
}
export function blankUI(g) { g.fillStyle = "#0c0c10"; g.fillRect(0, 0, SW, SH); }

// The monitor plays this very film (snap(t) renders the composite at film time t).
export function videoUI(g, t, snap, srcT) {
  g.fillStyle = "#0c0c10"; g.fillRect(0, 0, SW, SH);
  g.drawImage(snap(srcT), 0, 0, SW, SH);
  g.fillStyle = "rgba(0,0,0,0.55)"; g.fillRect(0, SH - 44, SW, 44);
  g.fillStyle = "#fff"; g.beginPath(); g.moveTo(26, SH - 32); g.lineTo(44, SH - 22); g.lineTo(26, SH - 12); g.fill();
  g.fillStyle = "rgba(255,255,255,0.25)"; g.fillRect(70, SH - 25, SW - 110, 6);
  g.fillStyle = "#E3262F"; g.fillRect(70, SH - 25, (SW - 110) * clamp(srcT / 120), 6);
}
// Video-editor timeline: "make it smoother" (ease curve), "lower that whoosh" (volume), "hold the ending" (extend).
export function editorUI(g, t, ph, opt = {}) {
  chrome(g, opt.title ?? "timeline");
  // preview + curve editor
  g.fillStyle = "#16171d"; g.fillRect(40, 80, 560, 300);
  g.fillStyle = "#f2701a"; g.fillRect(60, 100, 520, 260);
  const s = getSprite("hero", "point"); g.imageSmoothingEnabled = false; g.drawImage(s.canvas, 240, 120, s.w * 3.6, s.h * 3.6);
  g.fillStyle = "#16171d"; g.fillRect(640, 80, 600, 300);
  g.strokeStyle = "rgba(255,255,255,0.12)"; g.lineWidth = 1;
  for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(640 + i * 100, 90); g.lineTo(640 + i * 100, 370); g.stroke(); }
  const k = ease.inOutCubic(clamp((t - ph.smooth) / 0.6));
  g.strokeStyle = "#19C3B5"; g.lineWidth = 6; g.beginPath();
  for (let i = 0; i <= 60; i++) { const u = i / 60; const lin = u, sm = ease.inOutCubic(u); const v = lin + (sm - lin) * k; const x = 670 + u * 540, y = 350 - v * 240; i ? g.lineTo(x, y) : g.moveTo(x, y); }
  g.stroke();
  g.fillStyle = "#9fe9e1"; g.font = FONTS.mono(20); g.fillText(k > 0.5 ? "ease: inOutCubic" : "ease: linear", 660, 112);
  // tracks
  const tx = 40, tw = SW - 80;
  const rows = [["V1", 420], ["A1  VO", 510], ["A2  SFX", 600]];
  rows.forEach(([n, y]) => { g.fillStyle = "#1c1d24"; g.fillRect(tx, y, tw, 70); g.fillStyle = "#7f8c98"; g.font = FONTS.mono(16); g.fillText(n, tx + 8, y + 18); });
  const ext = ease.outCubic(clamp((t - ph.hold) / 0.5)) * 90;
  [[0.08, 0.2, "#E3262F"], [0.29, 0.18, "#19C3B5"], [0.48, 0.16, "#ff6fb0"], [0.65, 0.22, "#E3262F"]].forEach(([a, l, c], i, arr) => {
    const extra = i === arr.length - 1 ? ext : 0;
    g.fillStyle = c; g.fillRect(tx + 90 + a * tw, 432, l * tw - 6 + extra, 46);
  });
  if (t >= ph.hold) { g.strokeStyle = "#ffd60a"; g.lineWidth = 3; const x = tx + 90 + 0.87 * tw - 6; g.strokeRect(x, 426, ext + 2, 58); g.fillStyle = "#ffd60a"; g.font = FONTS.mono(18); g.fillText("+1 beat", x, 418); }
  for (let i = 0; i < 160; i++) { const hh = 6 + hash(i, 7) * 40; g.fillStyle = "#3d7a73"; g.fillRect(tx + 90 + i * (tw - 120) / 160, 545 - hh / 2, 4, hh); }
  const low = ease.outCubic(clamp((t - ph.lower) / 0.45));
  [[0.2, 0.08], [0.55, 0.1]].forEach(([a, l]) => {
    const x = tx + 90 + a * tw, w2 = l * tw; g.fillStyle = `rgba(245,166,35,${1 - 0.45 * low})`; g.fillRect(x, 612, w2, 46);
    g.fillStyle = "#1c1d24"; g.font = FONTS.mono(15); g.fillText("whoosh", x + 6, 630);
    const vy = 616 + low * 30; g.strokeStyle = "#ffffff"; g.lineWidth = 3; g.beginPath(); g.moveTo(x, vy); g.lineTo(x + w2, vy); g.stroke();
  });
  if (t >= ph.lower) { g.fillStyle = "#ffd60a"; g.font = FONTS.mono(18); g.fillText("-12 dB", tx + 90 + 0.2 * tw, 602); }
  const phx = tx + 90 + ((t * 0.09) % 1) * (tw - 100);
  g.fillStyle = "#fff"; g.fillRect(phx, 410, 3, 260);
}
