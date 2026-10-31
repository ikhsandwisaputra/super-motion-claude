// Characters (with sprite-burst pose changes), props, particles and the transition vocabulary.
import { FPS, W, H, clamp, ease, hash, spring, kick, PAL } from "./util.js";
import { getSprite } from "./sprites.js";

// ---------- characters ----------
// ch: { kind: "hero"|"cube", x, y (feet, 0-1), px (screen px per sprite px), keys: [{t, pose|expr, burst}], flip }
export function poseAt(ch, t) {
  // prev = the key BEFORE the current one (the first key has none, so a shot never opens with a burst)
  let i = 0;
  for (let j = 0; j < ch.keys.length; j++) if (ch.keys[j].t <= t) i = j;
  return { cur: ch.keys[i], prev: i > 0 ? ch.keys[i - 1] : null };
}
function spriteFor(ch, key, t) {
  if (ch.kind === "cube") {
    const blink = !key.expr && (Math.floor(t * FPS) % 81) < 3; // blink every ~2.7 s
    const hop = key.hop !== undefined ? Math.max(0, kick(t - key.t, 0.32, 0.5)) : 0;
    return getSprite("cube", blink ? "closed" : key.expr || "normal", Math.round(hop * 2) / 2, key.look || 0);
  }
  const breath = Math.sin((t + (ch.phase || 0)) * Math.PI * 2 / 1.5) > 0.35 ? 1 : 0;
  return getSprite("hero", key.pose || "idle", key.expr, key.mouth, ch.noBreath ? 0 : breath);
}
export function drawChar(ctx, ch, t, opts = {}) {
  if (ch.t0 !== undefined && t < ch.t0 - 4 / FPS) return;
  if (ch.t1 !== undefined && t >= ch.t1) return;
  const { cur, prev } = poseAt(ch, t);
  const px = typeof ch.px === "function" ? ch.px(t) : ch.px;
  let x = (typeof ch.x === "function" ? ch.x(t) : ch.x) * W, y = (typeof ch.y === "function" ? ch.y(t) : ch.y) * H;
  if (opts.screen) { x = opts.screen.x; y = opts.screen.y; }
  const spr = spriteFor(ch, cur, t);
  // hop for the cube on emphasis keys
  if (ch.kind === "cube" && cur.hop !== undefined) y -= Math.max(0, Math.sin(clamp((t - cur.t) / 0.28) * Math.PI)) * px * 4;
  const bf = (t - cur.t) * FPS; // frames since key
  const burstIn = cur.burst !== false && prev && bf < 3;
  const preBurst = (() => { // the NEXT key bursts out the current pose 3 frames before it lands
    const nk = ch.keys.find((k) => k.t > t);
    if (!nk || nk.burst === false) return null;
    const f = (nk.t - t) * FPS;
    return f <= 2 ? f : null;
  })();
  const firstIn = ch.burstIn && cur === ch.keys[0] && bf < 5 && bf >= -4;
  const sx = ch.flip ? -1 : 1;
  const ox = x - (spr.w * px) / 2, oy = y - spr.h * px;
  if (firstIn && bf < 0) { scatter(ctx, spr, ox, oy, px, 1 - clamp(-bf / 4), t, ch.flip, true); return; }
  if (preBurst !== null) { scatter(ctx, spr, ox, oy, px, 1 - preBurst / 2, t, ch.flip, false); return; }
  if (burstIn || (firstIn && bf >= 0)) { gather(ctx, spr, ox, oy, px, clamp(bf / 3), t, ch.flip); return; }
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  if (ch.alpha !== undefined) ctx.globalAlpha = ch.alpha;
  if (ch.flip) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); }
  if (ch.shadow !== false) { // contact shadow
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath(); ctx.ellipse(x, y - px * 0.5, spr.w * px * 0.32, px * 1.6, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.drawImage(spr.canvas, ox, oy, spr.w * px, spr.h * px);
  ctx.restore();
}
// pixels fly out (k: 0 -> 1)
function scatter(ctx, spr, ox, oy, px, k, t, flip, reverse) {
  const e = ease.outExpo(k);
  const cx = spr.w / 2, cy = spr.h * 0.55;
  ctx.save();
  for (const [x0, y0, c] of spr.pix) {
    const x = flip ? spr.w - 1 - x0 : x0;
    const a = hash(x0, y0, 11) * Math.PI * 2;
    const r = (0.3 + hash(x0, y0, 12) * 0.9) * spr.h * 0.5;
    const dx = (x - cx) * 0.45 + Math.cos(a) * r * 0.5, dy = (y0 - cy) * 0.45 + Math.sin(a) * r * 0.5;
    if (hash(x0, y0, 13) < e * 0.12) continue;
    ctx.fillStyle = c;
    const s = px * (1 - 0.35 * e);
    ctx.fillRect(ox + (x + dx * e) * px, oy + (y0 + dy * e - 6 * e * e) * px, s, s);
  }
  ctx.restore();
}
// pixels converge into the new pose (k: 0 -> 1)
function gather(ctx, spr, ox, oy, px, k, t, flip) {
  const e = ease.outCubic(k);
  const cx = spr.w / 2, cy = spr.h * 0.55;
  ctx.save();
  for (const [x0, y0, c] of spr.pix) {
    const x = flip ? spr.w - 1 - x0 : x0;
    const a = hash(x0, y0, 21) * Math.PI * 2;
    const r = (0.3 + hash(x0, y0, 22) * 0.9) * spr.h * 0.5;
    const dx = (x - cx) * 0.45 + Math.cos(a) * r * 0.5, dy = (y0 - cy) * 0.45 + Math.sin(a) * r * 0.5;
    const ee = clamp(e * 1.25 - hash(x0, y0, 23) * 0.25);
    ctx.fillStyle = c;
    ctx.fillRect(ox + (x + dx * (1 - ee)) * px, oy + (y0 + dy * (1 - ee)) * px, px, px);
  }
  ctx.restore();
}

// ---------- props (pop in 120% -> 100%, then float) ----------
export function drawProp(ctx, p, t) {
  if (t < p.t0 || (p.t1 !== undefined && t >= p.t1)) return;
  const spr = getSprite("prop", p.name);
  const fr = (t - p.t0) * FPS;
  const s = (0.2 + 0.8 * spring(fr / FPS, 0.22, 0.45)) * p.px;
  const fl = Math.sin((t - p.t0) * 2.6 + (p.phase || 0)) * 4;
  const x = p.x * W, y = p.y * H + fl;
  ctx.save(); ctx.imageSmoothingEnabled = false;
  ctx.translate(x, y); ctx.rotate(Math.sin((t - p.t0) * 1.7 + (p.phase || 0)) * (p.wobble ?? 0.08));
  ctx.drawImage(spr.canvas, (-spr.w * s) / 2, (-spr.h * s) / 2, spr.w * s, spr.h * s);
  ctx.restore();
}

// ---------- ambient particles ----------
export function dust(ctx, t, opt = {}) {
  const n = opt.n ?? 60, col = opt.color ?? "255,220,180";
  ctx.save();
  for (let i = 0; i < n; i++) {
    const sp = 0.01 + hash(i, 2) * 0.03;
    const x = ((hash(i, 1) + t * sp * (hash(i, 9) - 0.3)) % 1 + 1) % 1;
    const y = ((hash(i, 3) - t * sp * 0.6) % 1 + 1) % 1;
    const s = 1 + hash(i, 4) * (opt.size ?? 3);
    const a = (0.15 + 0.5 * hash(i, 5)) * (0.6 + 0.4 * Math.sin(t * 3 + i)) * (opt.alpha ?? 1);
    ctx.fillStyle = `rgba(${col},${a})`;
    ctx.fillRect(x * W, y * H, s, s);
  }
  ctx.restore();
}
// red embers rising (problem beat)
export function embers(ctx, t, t0, opt = {}) {
  const n = opt.n ?? 90;
  ctx.save();
  for (let i = 0; i < n; i++) {
    const life = 1.6 + hash(i, 7) * 1.6;
    const st = t0 + hash(i, 8) * 1.2;
    const a = (t - st) / life;
    if (a < 0 || a > 1) continue;
    const x = (opt.cx ?? 0.5) * W + (hash(i, 1) - 0.5) * W * (opt.spread ?? 0.5) + Math.sin(t * 2 + i) * 14;
    const y = (opt.cy ?? 0.62) * H - a * H * 0.35 * (0.5 + hash(i, 2));
    const s = 2 + hash(i, 3) * 4;
    ctx.fillStyle = opt.rgb ? `rgba(${opt.rgb},${(1 - a) * 0.9})` : `rgba(255,${60 + hash(i, 4) * 80 | 0},40,${(1 - a) * 0.9})`;
    ctx.fillRect(x, y, s, s);
  }
  ctx.restore();
}
// shockwave ring under the hero on a slam
export function shockwave(ctx, t, t0, x, y, opt = {}) {
  const k = (t - t0) * FPS / (opt.frames ?? 14);
  if (k < 0 || k > 1) return;
  const e = ease.outExpo(k);
  ctx.save();
  ctx.strokeStyle = opt.color ?? "rgba(255,80,70,1)";
  ctx.globalAlpha = 1 - k;
  ctx.lineWidth = 18 * (1 - k) + 2;
  ctx.beginPath(); ctx.ellipse(x * W, y * H, 60 + e * (opt.r ?? 520), 14 + e * (opt.r ?? 520) * 0.24, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

// ---------- transitions (operate on canvases A and B, write into out) ----------
const MOS = ["#ffffff", PAL.red, PAL.deep, "#050505", PAL.red, "#050505", PAL.deep, PAL.salmon];
// T1 pixel mosaic: cells flip in (cover A) -> hold -> flip out revealing B. k = frames relative to cut.
export function mosaic(out, A, B, fRel, opt = {}) {
  const cols = opt.cols ?? 16, rows = opt.rows ?? 9;
  const cw = W / cols, chh = H / rows;
  const inF = opt.inF ?? 5, hold = opt.hold ?? 3, outF = opt.outF ?? 5;
  const startF = -(inF + Math.floor(hold / 2)); // frame (rel. to cut) where cells start covering
  const partial = opt.partial ?? 1;
  out.drawImage(fRel < 0 ? A : B, 0, 0);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const seed = opt.seed ?? 1;
    if (hash(c, r, seed, 99) > partial) continue;
    const tin = startF + hash(c, r, seed) * inF;
    const tout = startF + inF + hold + hash(c, r, seed, 2) * outF;
    if (fRel >= tin && fRel < tout) {
      const ci = Math.floor(hash(c, r, seed, 3) * MOS.length);
      out.fillStyle = (opt.palette || MOS)[ci % (opt.palette || MOS).length];
      out.fillRect(Math.floor(c * cw), Math.floor(r * chh), Math.ceil(cw), Math.ceil(chh));
    }
  }
}
// T12 halftone wipe: growing squares sweep diagonally, revealing B
export function halftone(out, A, B, k, opt = {}) {
  out.drawImage(A, 0, 0);
  const n = opt.cell ?? 48;
  out.save();
  out.beginPath();
  for (let y = 0; y < H + n; y += n) for (let x = 0; x < W + n; x += n) {
    const d = (x / W) * 0.65 + (1 - y / H) * 0.35; // sweep from left-bottom
    const s = clamp((k * 1.6 - d) * 3) * n * 1.05;
    if (s > 0) out.rect(x + (n - s) / 2, y + (n - s) / 2, s, s);
  }
  out.clip();
  out.drawImage(B, 0, 0);
  out.restore();
  // leading-edge colour squares
  out.save();
  for (let y = 0; y < H + n; y += n) for (let x = 0; x < W + n; x += n) {
    const d = (x / W) * 0.65 + (1 - y / H) * 0.35;
    const e = k * 1.6 - d;
    if (e > 0 && e < 0.12) {
      const s = n * 0.45 * (1 - e / 0.12);
      out.fillStyle = hash(x, y) > 0.5 ? "#ffd27a" : "#ff8a3d";
      out.fillRect(x + (n - s) / 2, y + (n - s) / 2, s, s);
    }
  }
  out.restore();
}
// T3 light-sweep white-out: diagonal blades -> full white -> exposure down into B
export function lightSweep(out, A, B, fRel, opt = {}) {
  // fRel: -3..0 blades, 0..4 white, 4..7 ramp down
  if (fRel < 0) {
    out.drawImage(A, 0, 0);
    const k = (fRel + 3) / 3;
    out.save(); out.globalCompositeOperation = "lighter";
    for (let i = 0; i < 4; i++) {
      const x = (-0.4 + k * 1.6 - i * 0.18) * W;
      const g = out.createLinearGradient(x - 160, 0, x + 160, 0);
      g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.5, `rgba(255,250,235,${0.55 + k * 0.35})`); g.addColorStop(1, "rgba(255,255,255,0)");
      out.fillStyle = g;
      out.setTransform(1, 0, -0.45, 1, 0, 0);
      out.fillRect(x - 160 + 0.2 * H, 0, 320 + i * 60, H);
      out.setTransform(1, 0, 0, 1, 0, 0);
    }
    out.restore();
    return 0;
  }
  out.drawImage(B, 0, 0);
  if (fRel < 4) return 1;
  return 1 - ease.outCubic(clamp((fRel - 4) / 4));
}

// Wall-clock-free shake (kick response) for slams
export function shake(t, t0, amp = 14, T = 0.11) {
  const k = kick(t - t0, T, 0.3);
  return [k * amp * (hash(Math.floor(t0 * 30), 1) > 0.5 ? 1 : -1), kick(t - t0 - 0.02, T * 1.1, 0.3) * amp * 0.6];
}
