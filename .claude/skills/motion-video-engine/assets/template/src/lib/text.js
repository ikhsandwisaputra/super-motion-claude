// Kinetic typography, split in two halves:
//  - paint (this file): what is INSIDE a word's canvas — fill style (gradient, extrude, glow, box),
//    per-letter fx (smear, pop, decode, typewriter, wipe), pixel disintegration, depth-of-field blur.
//  - place (stage.js): where the word canvas sits in 3D — tilt, depth, fly/flip/rise entrances, camera.
// Entrance choice follows the word's ROLE (motion-docs 03-choreography/CHOREOGRAPHY-CRAFT.md);
// decode follows anime.js scramble.js (left->right settle, seeded glyphs).
import { FPS, clamp, ease, spring, hash, mixHex, hex } from "./util.js";

export const FONTS = {
  conn: (s) => `600 ${s}px Inter`,
  ui: (s) => `500 ${s}px Inter`,
  content: (s) => `800 ${s}px Poppins`,
  heavy: (s) => `900 ${s}px Poppins`,
  heavyI: (s) => `italic 900 ${s}px Poppins`,
  emph: (s) => `${s}px Anton`,
  brush: (s) => `${s}px "Kaushan Script"`,
  marker: (s) => `${s}px "Permanent Marker"`,
  pixel: (s) => `${s}px VT323`,
  silk: (s) => `${s}px Silkscreen`,
  mono: (s) => `700 ${s}px "JetBrains Mono"`,
};
const SMEAR = ["#ff4fa0", "#4f9dff", "#ffd60a", "#7dffcf"];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&$@";
export const RES = 1.25; // canvas px per stage unit (1 unit = 1 px of 1080p at the focus plane)

const mctx = document.createElement("canvas").getContext("2d");
export function measure(font, size, text) {
  mctx.font = (FONTS[font] || FONTS.content)(size); return mctx.measureText(text).width;
}

// Fill style presets that read like the reference: white with a faint vertical gradient and a
// thick soft shadow; emphasis red with a darker bevel; orange "hot" gradient for MOTION-type words.
function fillFor(g, it, color, y0, size) {
  if (it.grad === "hot") {
    const gr = g.createLinearGradient(0, y0 - size * 0.8, 0, y0); gr.addColorStop(0, "#ffd36b"); gr.addColorStop(0.55, "#ff7a1a"); gr.addColorStop(1, "#e3262f"); return gr;
  }
  if (it.grad === "coral") {
    const gr = g.createLinearGradient(0, y0 - size * 0.8, 0, y0); gr.addColorStop(0, "#ff8a7a"); gr.addColorStop(1, "#e3262f"); return gr;
  }
  if (it.grad === "pink") {
    const gr = g.createLinearGradient(0, y0 - size * 0.8, 0, y0); gr.addColorStop(0, "#ffd1dc"); gr.addColorStop(1, "#ff6f91"); return gr;
  }
  if ((it.grad ?? "white") === "white" && (color === "#ffffff" || color === "#fff")) {
    const gr = g.createLinearGradient(0, y0 - size * 0.8, 0, y0); gr.addColorStop(0, "#ffffff"); gr.addColorStop(1, "#e4e2ec"); return gr;
  }
  return color;
}

export class TextPaint {
  constructor(it) {
    this.it = it;
    const s = it.size * RES;
    this.font = (FONTS[it.font] || FONTS.content)(s);
    mctx.font = this.font;
    this.w = mctx.measureText(it.text).width;
    this.xs = []; for (let i = 0; i < it.text.length; i++) this.xs.push(mctx.measureText(it.text.slice(0, i)).width);
    this.pad = s * 0.7 + (it.box ? s * 0.25 : 0);
    this.cw = Math.ceil(this.w + this.pad * 2 + s * 0.4); this.ch = Math.ceil(s * 2.1);
    this.base = s * 1.32; // baseline y inside the canvas
    this.sharp = document.createElement("canvas"); this.sharp.width = this.cw; this.sharp.height = this.ch;
    this.out = document.createElement("canvas"); this.out.width = this.cw; this.out.height = this.ch;
    this.gs = this.sharp.getContext("2d"); this.go = this.out.getContext("2d");
    this.key = null;
  }
  // anchor of the text (baseline-left) inside the canvas, in canvas px
  get origin() { return [this.pad, this.base]; }
  update(t, blurPx, backK, exitK) {
    const it = this.it, fr = (t - it.t0) * FPS, fx = it.fx || "none";
    const fq = Math.floor(fr * 2) / 2;
    // repaint every half frame until EVERY in-canvas effect has settled (per-letter stagger, marker,
    // tint, decode); freezing earlier caches a half-drawn state and flickers when blur changes
    const settleF = Math.max(16, it.text.length * (it.stagger ?? 1) + 10, (it.dur ?? 0) + 6, (it.tintDelay ?? 0) + 10,
      it.box ? (it.boxOff ?? 0) + 8 : 0, it.boxDelay ? it.boxDelay + 8 : 0);
    const busy = fr < settleF || (fx === "type") || exitK > 0;
    const key = [busy ? fq : "s", Math.round(blurPx * 2), Math.round(backK * 8), Math.round(exitK * 10)].join("|");
    if (key === this.key) return false;
    this.key = key;
    this.paint(t, fr, backK, exitK);
    const g = this.go;
    g.clearRect(0, 0, this.cw, this.ch);
    if (blurPx > 0.6) g.filter = `blur(${blurPx * RES}px)`;
    g.drawImage(this.sharp, 0, 0); g.filter = "none";
    return true;
  }
  paint(t, fr, backK, exitK) {
    const it = this.it, g = this.gs, s = it.size * RES, text = it.text;
    g.clearRect(0, 0, this.cw, this.ch);
    g.font = this.font; g.textBaseline = "alphabetic";
    let color = it.color || "#ffffff";
    if (it.tint) color = mixHex(color, it.tint, ease.outCubic(clamp((fr - (it.tintDelay ?? 3)) / 5)));
    if (backK > 0) color = mixHex(color.startsWith("#") || color.startsWith("rgb") ? toHex(color) : "#ffffff", it.backColor || "#e3262f", backK);
    const x0 = this.pad, y0 = this.base;
    g.globalAlpha = (it.alpha ?? 1) * (1 - 0.4 * backK);
    if (exitK > 0 && it.exit === "pixel") { this.disintegrate(g, t, exitK, color); return; }
    // highlight box (UI emphasis, e.g. "Claude" on red)
    if (it.box) {
      const k = ease.outExpo(clamp((fr - (it.boxDelay ?? 0)) / 4)) * (1 - clamp((fr - (it.boxOff ?? 1e9)) / 3));
      if (k > 0) { g.fillStyle = it.box; g.fillRect(x0 - s * 0.12, y0 - s * 0.86, (this.w + s * 0.24) * k, s * 1.12); }
    }
    const fill = fillFor(g, it, color, y0, s);
    const shadow = () => {
      if (it.shadow === false) return;
      g.shadowColor = it.shadowColor || "rgba(0,0,0,0.6)"; g.shadowBlur = Math.max(10, s * 0.16); g.shadowOffsetY = Math.max(4, s * 0.06);
    };
    const noShadow = () => { g.shadowColor = "transparent"; g.shadowBlur = 0; g.shadowOffsetY = 0; };
    // draw one glyph run with extrude + glow + fill
    const run = (str, x, y, fillStyle, sc = 1) => {
      if (it.extrude) {
        noShadow();
        const n = Math.max(3, Math.round(s * 0.035)), dark = it.extrudeColor || "#2a1612";
        for (let k = n; k >= 1; k--) { g.fillStyle = dark; g.fillText(str, x + k * 0.6, y + k * 1.0); }
      }
      if (it.glow) { g.save(); g.shadowColor = it.glow; g.shadowBlur = s * 0.35; g.fillStyle = fillStyle; g.globalAlpha *= 0.6; g.fillText(str, x, y); g.restore(); }
      shadow(); g.fillStyle = fillStyle; g.fillText(str, x, y); noShadow();
      if (it.stroke) { g.lineWidth = it.stroke * RES; g.strokeStyle = it.strokeColor || "#000"; g.strokeText(str, x, y); }
    };
    const fx = it.fx || "none";
    if (fx === "smear") {
      for (let i = 0; i < text.length; i++) {
        const lf = fr - i * (it.stagger ?? 1);
        if (lf < 0) continue;
        const k = ease.outExpo(clamp(lf / 6));
        const lx = x0 + this.xs[i] + (1 - k) * 80 * RES;
        const ci = Math.floor(lf / 1.5);
        if (lf < 7) {
          for (let q = 1; q <= 4; q++) {
            g.save(); g.globalAlpha *= (1 - q / 5) * 0.55 * (1 - lf / 7); g.fillStyle = SMEAR[(ci + i + q) % 4];
            g.fillText(text[i], lx + q * 14 * RES * (1 - k + 0.15), y0); g.restore();
          }
        }
        g.save(); g.globalAlpha *= clamp(lf / 1.5 + 0.3);
        run(text[i], lx, y0, lf < 6 ? SMEAR[(ci + i) % 4] : fill);
        g.restore();
      }
    } else if (fx === "pop") {
      for (let i = 0; i < text.length; i++) {
        const lf = fr - i * (it.stagger ?? 1);
        if (lf < 0) continue;
        const k = spring(lf / FPS, 0.24, 0.64);
        const ly = y0 + (1 - k) * s * 0.6;
        g.save(); g.translate(x0 + this.xs[i], ly); const sc = 0.55 + 0.45 * k; g.scale(sc, sc);
        g.rotate((1 - k) * (hash(i, 3) - 0.5) * 0.6);
        run(text[i], 0, 0, it.colors && it.colors[i] ? it.colors[i] : fill);
        g.restore();
      }
    } else if (fx === "decode") {
      const dur = it.dur ?? 6;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") continue;
        const settle = (i / Math.max(1, text.length - 1)) * dur * 0.7 + dur * 0.3;
        if (fr < settle) {
          const q = Math.floor(fr);
          const ch = it.binary ? (hash(i, q, it.t0) > 0.5 ? "1" : "0") : GLYPHS[Math.floor(hash(i, q, it.t0 * 7) * GLYPHS.length)];
          run(ch, x0 + this.xs[i], y0, it.binary ? "#19C3B5" : SMEAR[(i + q) % 4]);
        } else run(text[i], x0 + this.xs[i], y0, fill);
      }
    } else if (fx === "type") {
      const n = Math.min(text.length, Math.floor((t - it.t0) * (it.cps ?? 30) + 1));
      run(text.slice(0, n), x0, y0, fill);
      if (it.caret && (n < text.length || Math.floor((t - it.t0) * 2.2) % 2 === 0) && (it.caretUntil === undefined || t < it.caretUntil)) {
        mctx.font = this.font;
        g.fillStyle = it.caretColor || "#ffffff";
        g.fillRect(x0 + mctx.measureText(text.slice(0, n)).width + s * 0.06, y0 - s * 0.8, Math.max(2, s * 0.06), s * 0.95);
      }
    } else if (fx === "wipe") {
      const k = ease.outCubic(clamp(fr / (it.dur ?? 5)));
      g.save(); g.beginPath(); g.rect(0, 0, x0 + this.w * k + s * 0.2, this.ch); g.clip();
      run(text, x0, y0, fill); g.restore();
    } else {
      run(text, x0, y0, fill);
    }
    g.globalAlpha = 1;
  }
  disintegrate(g, t, k, color) {
    const it = this.it, s = it.size * RES;
    if (!this.chunkSrc) {
      const c = document.createElement("canvas"); c.width = this.cw; c.height = this.ch;
      const cg = c.getContext("2d"); cg.font = this.font; cg.fillStyle = fillFor(cg, it, color, this.base, s);
      cg.fillText(it.text, this.pad, this.base); this.chunkSrc = c;
    }
    const bs = Math.max(6, Math.round(s / 9));
    for (let by = 0; by < this.ch; by += bs) for (let bx = 0; bx < this.cw; bx += bs) {
      const r = hash(bx, by, it.t0);
      if (r < k * 1.15) continue;
      const dx = (hash(bx, by, 3) - 0.5) * 140 * k + (it.exitDir ?? 1) * 70 * k * k, dy = (hash(bx, by, 5) - 0.7) * 100 * k;
      g.drawImage(this.chunkSrc, bx, by, bs, bs, bx + dx, by + dy, bs, bs);
    }
  }
}
function toHex(c) {
  if (c.startsWith("#")) return c;
  const m = c.match(/\d+/g); if (!m) return "#ffffff";
  return "#" + m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, "0")).join("");
}
export { hex };
