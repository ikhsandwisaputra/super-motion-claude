// Pixel-art characters built from SDF parts evaluated on a pixel grid, then shaded
// (light from top-left) and outlined. Poses are just different limb endpoints/rotations,
// so every pose shares the same proportions, palette and shading rules.
import { hex } from "./util.js";

const OUTLINE = "#17121d";
const C = {
  hair: ["#2a2233", "#1a1522", "#3f3452"],
  skin: ["#f6c8a2", "#dd9e7a", "#ffe2c8"],
  hood: ["#33447a", "#232f57", "#4d64a6"],
  hoodL: ["#4d64a6", "#33447a", "#6f86c4"],
  phone: ["#ff8a3d", "#c45a21", "#ffb47e"],
  pants: ["#2c2c38", "#1c1c25", "#40404f"],
  shoe: ["#f2ede5", "#b8b0a5", "#ffffff"],
  sole: ["#8b8378", "#6a645b", "#a39b90"],
  white: ["#f4efe6", "#cfc8bd", "#ffffff"],
  cube: ["#e8773d", "#b9531f", "#ff9d63"],
  beret: ["#2b2433", "#1b1622", "#463c55"],
  clapB: ["#1f1d24", "#121116", "#3a3842"],
  clapW: ["#f4efe6", "#c9c2b6", "#ffffff"],
  red: ["#e3262f", "#a3141b", "#ff5a60"],
};

// --- SDF primitives (pixel units) ---
const len = (x, y) => Math.hypot(x, y);
const sdCircle = (cx, cy, r) => (x, y) => len(x - cx, y - cy) - r;
const sdEllipse = (cx, cy, rx, ry) => (x, y) => (len((x - cx) / rx, (y - cy) / ry) - 1) * Math.min(rx, ry);
const sdBox = (cx, cy, hx, hy, r = 0) => (x, y) => {
  const qx = Math.abs(x - cx) - hx + r, qy = Math.abs(y - cy) - hy + r;
  return len(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
};
const sdCapsule = (ax, ay, bx, by, r) => (x, y) => {
  const px = x - ax, py = y - ay, bax = bx - ax, bay = by - ay;
  const h = Math.max(0, Math.min(1, (px * bax + py * bay) / (bax * bax + bay * bay)));
  return len(px - bax * h, py - bay * h) - r;
};
const rot = (sdf, px, py, ang) => {
  const c = Math.cos(-ang), s = Math.sin(-ang);
  return (x, y) => { const dx = x - px, dy = y - py; return sdf(px + dx * c - dy * s, py + dx * s + dy * c); };
};
const shift = (sdf, ox, oy) => (x, y) => sdf(x - ox, y - oy);
const inter = (a, b) => (x, y) => Math.max(a(x, y), b(x, y));
const sub = (a, b) => (x, y) => Math.max(a(x, y), -b(x, y));
const uni = (a, b) => (x, y) => Math.min(a(x, y), b(x, y));

function rasterize(w, h, parts, stamps = []) {
  const id = new Int16Array(w * h).fill(-1);
  const col = new Array(w * h).fill(null);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const px = x + 0.5, py = y + 0.5;
    let best = -1, bz = -1e9, bd = 0;
    parts.forEach((p, i) => {
      const d = p.sdf(px, py);
      if (d < 0 && p.z >= bz) { best = i; bz = p.z; bd = d; }
    });
    if (best < 0) continue;
    const p = parts[best];
    const e = 0.5, s = p.sdf;
    let nx = s(px + e, py) - s(px - e, py), ny = s(px, py + e) - s(px, py - e);
    const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    const lit = -0.55 * nx - 0.83 * ny; // light from top-left
    const depth = -bd;
    let c = p.c[0];
    if (!p.flat) {
      if (depth < (p.sw ?? 2.0) && lit < -0.2) c = p.c[1];
      else if (depth < 1.1 && lit > 0.55) c = p.c[2];
      if (p.shadeBelow !== undefined && py > p.shadeBelow) c = p.c[1];
    }
    id[y * w + x] = best; col[y * w + x] = c;
  }
  // inner ink lines: a front part touching a part of another group below it
  const ink = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, k = id[i];
    if (k < 0 || !parts[k].ink) continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
      const j = id[yy * w + xx];
      if (j >= 0 && parts[j].group !== parts[k].group && parts[j].z < parts[k].z) { ink[i] = 1; break; }
    }
  }
  for (let i = 0; i < w * h; i++) if (ink[i]) col[i] = OUTLINE;
  for (const s of stamps) {
    s.px.forEach(([x, y, c]) => { const xx = s.x + x, yy = s.y + y; if (xx >= 0 && yy >= 0 && xx < w && yy < h && (col[yy * w + xx] || s.force)) col[yy * w + xx] = c; });
  }
  // outer outline
  const out = col.slice();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (col[y * w + x]) continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && yy >= 0 && xx < w && yy < h && col[yy * w + xx]) { out[y * w + x] = OUTLINE; break; }
    }
  }
  return toCanvas(w, h, out);
}

function toCanvas(w, h, col) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(w, h);
  const pix = [];
  for (let i = 0; i < w * h; i++) {
    if (!col[i]) continue;
    const [r, g, b] = hex(col[i]);
    img.data.set([r, g, b, 255], i * 4);
    pix.push([i % w, Math.floor(i / w), col[i]]);
  }
  ctx.putImageData(img, 0, 0);
  return { canvas: c, w, h, pix };
}

// --- face stamps ---
const K = OUTLINE, Wt = "#ffffff", BL = "#ef8f84", MO = "#7a2a2a";
function eyes(expr) {
  const L = 13, R = 24, Y = 20;
  const pts = [];
  const eye = (ex) => {
    if (expr === "happy") { pts.push([ex, Y + 2, K], [ex + 1, Y + 1, K], [ex + 2, Y + 2, K]); return; }
    if (expr === "closed") { pts.push([ex, Y + 2, K], [ex + 1, Y + 2, K], [ex + 2, Y + 2, K]); return; }
    if (expr === "surprised") {
      for (let y = 0; y < 4; y++) for (let x = 0; x < 3; x++) pts.push([ex + x, Y + y, (x === 1 && (y === 1 || y === 2)) ? Wt : K]);
      return;
    }
    for (let y = 0; y < 4; y++) for (let x = 0; x < 3; x++) pts.push([ex + x, Y + y, K]);
    pts.push([ex, Y, Wt]);
    if (expr === "determined") pts.push([ex - 1, Y - 2, K], [ex, Y - 2, K], [ex + 1, Y - 1, K], [ex + 2, Y - 1, K]);
  };
  eye(L); eye(R);
  if (expr === "determined") { // mirror the right brow
    pts.splice(pts.length - 4, 4, [R + 2, Y - 2, K], [R + 3, Y - 2, K], [R + 1, Y - 1, K], [R, Y - 1, K]);
  }
  pts.push([L - 1, Y + 5, BL], [L, Y + 5, BL], [R + 2, Y + 5, BL], [R + 3, Y + 5, BL]);
  return pts;
}
function mouth(kind) {
  const X = 19, Y = 26;
  if (kind === "open") return [[X, Y, MO], [X + 1, Y, MO], [X, Y + 1, MO], [X + 1, Y + 1, "#d2484d"], [X - 1, Y, K], [X + 2, Y, K]];
  if (kind === "smile") return [[X - 1, Y, K], [X, Y + 1, K], [X + 1, Y + 1, K], [X + 2, Y, K]];
  if (kind === "flat") return [[X, Y, K], [X + 1, Y, K]];
  return [[X, Y, K], [X + 1, Y, K]];
}

// --- HERO ("Ikhsan": messy black hair, orange headphones on the neck, navy hoodie) ---
const HW = 44, HH = 60;
const POSES = {
  idle: { L: [11.5, 46], R: [32.5, 46], front: true },
  point: { L: [11.5, 46], R: [41, 35.5], front: true },
  pointUp: { L: [11.5, 46], R: [37, 27], front: true },
  think: { L: [27, 43], R: [27, 29.5], front: true },
  surprised: { L: [6, 27], R: [38, 27], front: false, expr: "surprised", mouth: "open" },
  celebrate: { L: [11.5, 46], R: [35.5, 22], front: true, expr: "happy", mouth: "smile" },
  present: { L: [5, 38], R: [39, 38], front: true, expr: "happy", mouth: "smile" },
  clap: { L: [11.5, 46], R: [35, 31], front: true, prop: "clap", expr: "determined" },
  hold: { L: [17, 40], R: [27, 40], front: true, prop: "file" },
  fall: { L: [5, 31], R: [39, 29], front: false, expr: "surprised", mouth: "open", fall: true },
  back: { back: true },
};

export function hero(pose = "idle", expr, mo, breath = 0) {
  const P = POSES[pose] || POSES.idle;
  const e = expr || P.expr || "normal";
  const m = mo || P.mouth || "smile";
  const by = breath; // upper-body offset (0 or 1)
  const parts = [];
  const add = (o) => parts.push(o);
  const upper = (sdf) => shift(sdf, 0, by + (P.fall ? 6 : 0));
  // legs + shoes
  if (P.fall) {
    add({ group: "leg", z: 1, c: C.pants, sdf: sdCapsule(20, 54, 33, 51, 2.7) });
    add({ group: "leg", z: 1.1, c: C.pants, sdf: sdCapsule(24, 55.5, 36, 55, 2.7) });
    add({ group: "shoe", z: 2, c: C.shoe, sdf: sdBox(35.2, 49.4, 2.0, 3.3, 1.4), ink: true });
    add({ group: "shoe", z: 2.1, c: C.shoe, sdf: sdBox(38.4, 53.6, 2.0, 3.3, 1.4), ink: true });
  } else if (!P.back) {
    add({ group: "leg", z: 1, c: C.pants, sdf: sdCapsule(18, 47, 18, 54, 2.8) });
    add({ group: "leg", z: 1, c: C.pants, sdf: sdCapsule(26, 47, 26, 54, 2.8) });
    add({ group: "shoe", z: 2, c: C.shoe, sdf: sdBox(17.2, 56.4, 3.6, 2.0, 1.6), ink: true });
    add({ group: "shoe", z: 2, c: C.shoe, sdf: sdBox(26.8, 56.4, 3.6, 2.0, 1.6), ink: true });
    add({ group: "sole", z: 2.2, c: C.sole, flat: true, sdf: sdBox(17.2, 58.1, 3.6, 0.6) });
    add({ group: "sole", z: 2.2, c: C.sole, flat: true, sdf: sdBox(26.8, 58.1, 3.6, 0.6) });
  }
  // torso (slightly wider at the hem)
  const torso = (x, y) => {
    const t = Math.max(0, Math.min(1, (y - 34) / 13));
    return sdBox(22, 41, 8.2 + t * 1.6, 7.6, 3.2)(x, y);
  };
  add({ group: "torso", z: 3, c: C.hood, sdf: upper(torso), sw: 2.6 });
  // hood rim around the neck
  add({ group: "torso", z: 3.3, c: C.hoodL, sdf: upper(sub(sdEllipse(22, 34.2, 8.6, 3.2), sdEllipse(22, 33.4, 5.6, 2.0))) });
  if (!P.back) {
    // drawstrings + pocket seam
    add({ group: "torso", z: 3.4, c: C.white, flat: true, sdf: upper(sdBox(19.5, 38.3, 0.5, 2.4)) });
    add({ group: "torso", z: 3.4, c: C.white, flat: true, sdf: upper(sdBox(24.5, 38.3, 0.5, 2.4)) });
    add({ group: "torso", z: 3.35, c: C.hood[1], flat: true, sdf: upper(sdBox(22, 44.6, 5.5, 0.5)) });
  }
  // arms
  const arm = (sx, sy, hx, hy, zArm) => {
    add({ group: "arm", z: zArm, c: C.hood, ink: true, sdf: upper(sdCapsule(sx, sy, hx, hy, 2.5)) });
    add({ group: "hand", z: zArm + 0.1, c: C.skin, ink: true, sdf: upper(sdCircle(hx, hy, 2.25)) });
  };
  if (P.back) {
    arm(14, 36, 12, 45, 2.5); arm(30, 36, 32, 45, 2.5);
  } else {
    const zf = P.front ? 4 : 2.5;
    arm(14.2, 36.5, P.L[0], P.L[1], P.L[0] > 16 ? 4.2 : zf);
    arm(29.8, 36.5, P.R[0], P.R[1], P.R[0] < 28 ? 4.2 : zf);
  }
  // head
  add({ group: "head", z: 6, c: C.skin, sdf: upper(sdEllipse(22, 19.5, 13.2, 12.4)), sw: 1.6 });
  add({ group: "head", z: 5.9, c: C.skin, sdf: upper(sdCircle(8.6, 21.5, 2.1)) });
  add({ group: "head", z: 5.9, c: C.skin, sdf: upper(sdCircle(35.4, 21.5, 2.1)) });
  // hair: back mass, fringe with zigzag, top tufts, side locks
  const fringe = (x, y) => {
    const f = ((x + 1.3) / 4.6) % 1; // sweeping strands: long tip on the left of each lock
    const tip = 3.4 * Math.pow(1 - f, 1.6);
    return y - (14.6 + tip + (x < 12 || x > 32 ? 5 : 0));
  };
  const hairMass = sdEllipse(22, 15.2, 15.2, 11.6);
  if (P.back) {
    add({ group: "hair", z: 7, c: C.hair, sdf: upper(sdEllipse(22, 18.5, 14.2, 13.4)) });
  } else {
    add({ group: "hair", z: 7, c: C.hair, sdf: upper(inter(hairMass, fringe)) });
    add({ group: "hair", z: 7, c: C.hair, sdf: upper(sdCapsule(8.5, 13, 8.2, 22.5, 2.0)) });
    add({ group: "hair", z: 7, c: C.hair, sdf: upper(sdCapsule(35.5, 13, 35.8, 22.5, 2.0)) });
  }
  const tuft = (cx, cy, rx, ry, a) => rot(sdEllipse(cx, cy, rx, ry), cx, cy, a);
  let tufts = tuft(13, 6.2, 2.0, 4.2, -0.75);
  for (const t of [[18, 3.6, 2.2, 4.4, -0.3], [24, 3.0, 2.3, 4.6, 0.2], [29.5, 4.8, 2.0, 4.0, 0.65], [33.5, 8.4, 1.8, 3.4, 1.05], [9.6, 10, 1.7, 3.2, -1.1]])
    tufts = uni(tufts, tuft(...t));
  add({ group: "hair", z: 7.1, c: C.hair, sdf: upper(tufts) });
  // side spikes at the temples
  add({ group: "hair", z: 7.05, c: C.hair, sdf: upper(uni(tuft(6.6, 15.5, 1.6, 3.6, -0.5), tuft(37.4, 15.5, 1.6, 3.6, 0.5))) });
  // headphones over the hair: band + ear cups
  add({ group: "phone", z: 8, c: C.phone, ink: true, sdf: upper(inter(sub(sdEllipse(22, 17.2, 16.6, 15.4), sdEllipse(22, 17.6, 14.7, 13.6)), (x, y) => y - 13)) });
  add({ group: "phone", z: 8.1, c: C.phone, ink: true, sdf: upper(sdBox(7.4, 20.6, 2.6, 4.0, 1.6)) });
  add({ group: "phone", z: 8.1, c: C.phone, ink: true, sdf: upper(sdBox(36.6, 20.6, 2.6, 4.0, 1.6)) });
  // hair shine arc
  add({ group: "hair", z: 7.2, c: C.hair, flat: true, sdf: upper(inter(sub(sdEllipse(19, 12, 9, 6.4), sdEllipse(19.4, 12.8, 8.2, 5.4)), (x, y) => (x > 9 && x < 21 && y < 12 ? -1 : 1))) });
  const stamps = [];
  if (!P.back) stamps.push({ x: 0, y: by + (P.fall ? 6 : 0), px: [...eyes(e), ...mouth(m)] });
  let spr = rasterize(HW, HH, parts, stamps);
  // shine pixels on hair (light color)
  const oy = by + (P.fall ? 6 : 0);
  recolor(spr, (x, y, c) => (c !== OUTLINE && (c === C.hair[0] || c === C.hair[2]) && isShine(x, y - oy) ? "#6a5a86" : null));
  if (P.prop === "clap") overlay(spr, PROPS.clap, 33, 22 + by);
  if (P.prop === "file") overlay(spr, PROPS.fileSmall, 15, 31 + by);
  return spr;
}
function isShine(x, y) {
  const d = Math.hypot((x - 19.5) / 9.5, (y - 11.5) / 6.4);
  return d > 0.82 && d < 1.0 && y < 11.5 && x > 11 && x < 22 && (x + y) % 5 !== 0;
}
function recolor(spr, fn) {
  const ctx = spr.canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, spr.w, spr.h);
  spr.pix = spr.pix.map(([x, y, c]) => {
    const n = fn(x, y, c);
    if (n) { img.data.set([...hex(n), 255], (y * spr.w + x) * 4); return [x, y, n]; }
    return [x, y, c];
  });
  ctx.putImageData(img, 0, 0);
}
function overlay(spr, grid, ox, oy) {
  const ctx = spr.canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, spr.w, spr.h);
  const map = new Map(spr.pix.map((p) => [p[1] * spr.w + p[0], p]));
  grid.rows.forEach((row, y) => [...row].forEach((ch, x) => {
    const c = grid.pal[ch]; if (!c) return;
    const xx = ox + x, yy = oy + y;
    if (xx < 0 || yy < 0 || xx >= spr.w || yy >= spr.h) return;
    img.data.set([...hex(c), 255], (yy * spr.w + xx) * 4);
    map.set(yy * spr.w + xx, [xx, yy, c]);
  }));
  ctx.putImageData(img, 0, 0);
  spr.pix = [...map.values()];
}
// The fall pose rotates the upper body; stamp the face along that rotation.
function fallFace(spr, e, m, by) {
  const ang = -0.38, px = 22, py = 50, c = Math.cos(ang), s = Math.sin(ang);
  const pts = [...eyes(e), ...mouth(m)].map(([x, y, col]) => {
    const dx = x + 0.5 - px, dy = y + by + 0.5 - py;
    return [Math.floor(px + dx * c - dy * s), Math.floor(py + dx * s + dy * c), col];
  });
  const ctx = spr.canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, spr.w, spr.h);
  const map = new Map(spr.pix.map((p) => [p[1] * spr.w + p[0], p]));
  pts.forEach(([x, y, col]) => {
    if (x < 0 || y < 0 || x >= spr.w || y >= spr.h) return;
    img.data.set([...hex(col), 255], (y * spr.w + x) * 4); map.set(y * spr.w + x, [x, y, col]);
  });
  ctx.putImageData(img, 0, 0); spr.pix = [...map.values()];
  return spr;
}

// --- SIDEKICK (Claude-orange cube with a tiny beret) ---
export function cube(expr = "normal", squash = 0, look = 0) {
  const w = 30, h = 30;
  const parts = [];
  const sy = 1 + squash * 0.12, sx = 1 - squash * 0.08;
  parts.push({ group: "body", z: 1, c: C.cube, sw: 2.4, sdf: sdBox(15, 18.5 + squash * 1.2, 10.5 * sx, 8.6 * sy, 2.6) });
  parts.push({ group: "feet", z: 0.5, c: C.cube, sdf: sdBox(10.5, 27.2, 1.8, 1.4, 0.6) });
  parts.push({ group: "feet", z: 0.5, c: C.cube, sdf: sdBox(19.5, 27.2, 1.8, 1.4, 0.6) });
  parts.push({ group: "beret", z: 2, c: C.beret, ink: true, sdf: rot(sdEllipse(15.5, 9.6 + squash, 8.2, 2.6), 15.5, 9.6, -0.12) });
  parts.push({ group: "beret", z: 2.1, c: C.beret, sdf: sdBox(15.5, 6.6 + squash, 0.6, 1.2) });
  const ex = 10 + look, ey = 16 + Math.round(squash);
  const pts = [];
  const eye = (x0) => {
    if (expr === "happy") { pts.push([x0, ey + 1, K], [x0 + 1, ey, K], [x0 + 2, ey + 1, K]); return; }
    if (expr === "closed") { pts.push([x0, ey + 1, K], [x0 + 1, ey + 1, K], [x0 + 2, ey + 1, K]); return; }
    if (expr === "surprised") { for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) pts.push([x0 + x, ey + y - 1, x === 1 && y === 1 ? Wt : K]); return; }
    for (let y = 0; y < 3; y++) for (let x = 0; x < 2; x++) pts.push([x0 + x, ey + y, K]);
    pts.push([x0, ey, Wt]);
  };
  eye(ex); eye(ex + 8);
  pts.push([ex - 2, ey + 4, BL], [ex - 1, ey + 4, BL], [ex + 10, ey + 4, BL], [ex + 11, ey + 4, BL]);
  if (expr === "surprised") pts.push([ex + 4, ey + 4, K], [ex + 5, ey + 4, K], [ex + 4, ey + 5, K], [ex + 5, ey + 5, K]);
  else if (expr === "happy") pts.push([ex + 3, ey + 4, K], [ex + 4, ey + 5, K], [ex + 5, ey + 5, K], [ex + 6, ey + 4, K]);
  return rasterize(w, h, parts, [{ x: 0, y: 0, px: pts }]);
}

// --- props (hand-drawn grids) ---
const PROPS = {
  clap: {
    pal: { k: OUTLINE, b: "#1f1d24", w: "#f4efe6", g: "#8a8792" },
    rows: [
      "kkkkkkkkkk",
      "kwbwbwbwbk",
      "kkkkkkkkkk",
      "kbbbbbbbbk",
      "kbggggggbk",
      "kbbbbbbbbk",
      "kbggggbbbk",
      "kbbbbbbbbk",
      "kkkkkkkkkk",
    ],
  },
  fileSmall: {
    pal: { k: OUTLINE, p: "#efe3c8", s: "#d4c4a2", r: "#e3262f", l: "#8f7f66" },
    rows: [
      "kkkkkkkkkk..",
      "kpppppppskk.",
      "krrrrrrrpssk",
      "kpppppppppsk",
      "kplllllllpsk",
      "kppppppppppk",
      "kplllllpppsk",
      "kppppppppppk",
      "kplllllllppk",
      "kppppppppppk",
      "kkkkkkkkkkkk",
    ],
  },
};
export const PROP = {
  qmark: {
    pal: { k: OUTLINE, y: "#ffd60a", o: "#f5a623" },
    rows: [".kkkk.", "kyyyyk", "kykkyk", "kk.kyk", "..kyyk", "..kyk.", "..kk..", "..kk..", ".kyyk.", "..kk.."],
  },
  bang: {
    pal: { k: OUTLINE, w: "#ffffff", r: "#e3262f" },
    rows: [".kk.", "kwwk", "kwwk", "kwwk", "kwwk", ".kk.", ".kk.", "kwwk", ".kk."],
  },
  bulb: {
    pal: { k: OUTLINE, y: "#ffd60a", l: "#fff3a0", g: "#9a9aa6", d: "#6b6b78" },
    rows: [".kkkk.", "kyllyk", "kylyyk", "kyyyyk", ".kyyk.", ".kggk.", ".kddk.", "..kk.."],
  },
  spark: {
    pal: { w: "#ffffff", y: "#ffe58a" },
    rows: ["..w..", "..y..", "wyyyw", "..y..", "..w.."],
  },
  brain: {
    pal: { k: OUTLINE, p: "#ff8fb1", d: "#d9577f", l: "#ffc4d6", c: "#19C3B5" },
    rows: [
      "...kkkkkkkk....",
      "..kplpppplppk..",
      ".kpllppdppllpk.",
      "kppdpppdppdpppk",
      "kpdppcpdpcppdpk",
      "kpppcccdcccpppk",
      "kpdppcpdpcppdpk",
      "kpppppdddppppk.",
      ".kpdpppdpppdpk.",
      "..kkppppppkk...",
      "....kkdddk.....",
      ".....kkkk......",
    ],
  },
  folder: {
    pal: { k: OUTLINE, y: "#f5a623", d: "#c27a12", l: "#ffd27a", w: "#fff6e0" },
    rows: [
      "kkkkk..........",
      "kyyyykkkkkkkkk.",
      "kyyyyyyyyyyyyyk",
      "kdddddddddddddk",
      "klllllwwwlllllk",
      "kyyyyyyyyyyyyyk",
      "kyyyyyyyyyyyyyk",
      "kyyyyyyyyyyyyyk",
      "kdddddddddddddk",
      ".kkkkkkkkkkkkk.",
    ],
  },
  book: {
    pal: { k: OUTLINE, r: "#e3262f", d: "#a3141b", w: "#efe3c8", y: "#ffd60a" },
    rows: ["kkkkkkkkk", "krrrrrrwk", "kryyyyrwk", "krrrrrrwk", "krrrrrrwk", "krrrrrrwk", "krrrrrrwk", "kddddddwk", "kkkkkkkkk"],
  },
  bookT: {
    pal: { k: OUTLINE, r: "#19a59a", d: "#0f6e66", w: "#efe3c8", y: "#ffffff" },
    rows: ["kkkkkkkkk", "krrrrrrwk", "kryyyyrwk", "krrrrrrwk", "krrrrrrwk", "krrrrrrwk", "krrrrrrwk", "kddddddwk", "kkkkkkkkk"],
  },
  wrench: {
    pal: { k: OUTLINE, g: "#c9ced6", d: "#8a8f99", l: "#ffffff" },
    rows: ["....kkk.", "...kglk.", "..kggk..", "..kgk..k", ".kgkkkgk", ".kggggk.", "kggdkk..", "kgdk....", "kdk.....", ".k......"],
  },
  palette: {
    pal: { k: OUTLINE, b: "#e9c49a", r: "#e3262f", t: "#19C3B5", y: "#ffd60a", p: "#8a5cff" },
    rows: ["..kkkkkk..", ".kbbbbbbk.", "kbrbbtbbbk", "kbbbbbbybk", "kbpbbkkbbk", "kbbbbk.kbk", ".kbbbbkkk.", "..kkkkk..."],
  },
  film: {
    pal: { k: OUTLINE, d: "#2a2a33", w: "#f4efe6", r: "#e3262f" },
    rows: ["kkkkkkkkkk", "kwdwdwdwdk", "kkkkkkkkkk", "kdrrrrrrdk", "kdrrrrrrdk", "kkkkkkkkkk", "kwdwdwdwdk", "kkkkkkkkkk"],
  },
  note: {
    pal: { k: OUTLINE, w: "#ffffff", t: "#19C3B5" },
    rows: ["....kkkk.", "...kttttk", "...ktkkkk", "...ktk...", "...ktk...", ".kkktk...", "kttttk...", "kttttk...", ".kkkk...."],
  },
  ball: {
    pal: { k: OUTLINE, o: "#ff7a1a", d: "#c4521a", l: "#ffc08a" },
    rows: ["..kkkk..", ".kollok.", "kollooak", "koooooak", "koooodok", "kooddodk", ".kodddk.", "..kkkk.."].map((r) => r.replace(/a/g, "o")),
  },
  orb: {
    pal: { k: OUTLINE, a: "#8a5cff", b: "#19C3B5", c: "#ff6fb0", w: "#ffffff" },
    rows: ["..kkkk..", ".kwccbk.", "kwccabbk", "kccaabbk", "kcaaabbk", "kaaabbbk", ".kabbbk.", "..kkkk.."],
  },
  aa: {
    pal: { k: OUTLINE, w: "#ffffff" },
    rows: ["..kk.......", ".kwwk......", "kwkkwk..kk.", "kwwwwk.kwwk", "kwkkwkkwkwk", "kwkkwkkwwwk", "kk..kk.kkkk"],
  },
  wave: {
    pal: { k: OUTLINE, t: "#19C3B5" },
    rows: [".....k.....", "...k.t.k...", "..ktktktk..", "kktttttttkk", "..ktktktk..", "...k.t.k...", ".....k....."],
  },
  speaker: {
    pal: { k: OUTLINE, w: "#ffffff" },
    rows: ["...k....", "..kw..k.", "kkww.k.k", "kwww.k.k", "kkww.k.k", "..kw..k.", "...k...."],
  },
  promptSign: {
    pal: { k: OUTLINE, t: "#19C3B5", w: "#e9fffb" },
    rows: ["kkkkkkkkkkkk", "kttttttttttk", "ktwwtwwtwwtk", "kttttttttttk", "kkkkkkkkkkkk"],
  },
};
export function propSprite(name) {
  const g = PROP[name] || PROPS[name];
  const h = g.rows.length, w = g.rows[0].length;
  const col = new Array(w * h).fill(null);
  g.rows.forEach((r, y) => [...r].forEach((ch, x) => { if (g.pal[ch]) col[y * w + x] = g.pal[ch]; }));
  return toCanvas(w, h, col);
}

const cache = new Map();
export function getSprite(kind, ...args) {
  const key = kind + "|" + args.join("|");
  if (!cache.has(key)) cache.set(key, kind === "hero" ? hero(...args) : kind === "cube" ? cube(...args) : propSprite(...args));
  return cache.get(key);
}
export const HERO_SIZE = [HW, HH];
