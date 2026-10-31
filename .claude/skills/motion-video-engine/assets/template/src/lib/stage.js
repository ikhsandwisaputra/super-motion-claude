// 3D typography + character layer ("After Effects 3D camera" over the background).
// Every word is a textured plane with depth and tilt; a perspective camera dollies/orbits/rolls,
// so type gets real parallax and angle. Depth -> blur (DOF), entrances use closed-form springs
// (motion-docs 04-physics/_physics-math/NOTES.md: zeta 0.45-0.6 = alive overshoot, 0.7+ = settle).
import * as THREE from "three";
import { FPS, W, H, clamp, ease, spring, hash } from "./util.js";
import { TextPaint, RES } from "./text.js";
import { drawChar } from "./fx.js";
import { getSprite } from "./sprites.js";

const FOV = 30;
export const D = (H / 2) / Math.tan((FOV / 2) * Math.PI / 180); // camera distance where 1 unit = 1 px
const DEG = Math.PI / 180;
const TILT = 0.5, TILTZ = 0.6; // global damping of authored tilts

// ---------------- word placement (pure function of t) ----------------
export function placeText(it, t) {
  const fr = (t - it.t0) * FPS;
  if (fr < -0.01) return null;
  const t1 = it.t1;
  if (t1 !== undefined && t >= t1 + (it.exit === "cut" || !it.exit ? 0 : 6 / FPS)) return null;
  // TILT: static angles are kept gentle (Ikhsan: "jangan terlalu miring"); entrances use well-damped
  // springs (zeta 0.6-0.7 -> 1-9% overshoot, physics NOTES) + a small scale pop so words land softly.
  let dx = 0, dy = 0, dz = 0, rx = (it.rx || 0) * TILT, ry = (it.ry || 0) * TILT, rz = (it.rz || 0) * TILTZ, sc = 1, alpha = 1;
  const dir = it.dir ?? 1;
  const inn = it.in || "slide";
  const sp = (T, z) => spring(fr / FPS, T, z);
  switch (inn) {
    case "slide": { const k = ease.outQuint(clamp(fr / 7)); dx = (1 - k) * dir * (it.dist ?? 0.05) * W; rz += (1 - k) * -4 * dir; dz = (1 - k) * 100; break; }
    case "fly": { const k = ease.outQuint(clamp(fr / 10)); dz = (1 - k) * (it.flyZ ?? 820); dy = (1 - k) * -30; break; }
    case "slam": { const k = sp(it.T ?? 0.27, it.zeta ?? 0.68); dz = (1 - k) * (it.flyZ ?? 1300); break; }
    case "flip": { const k = sp(0.36, 0.66); ry += (1 - k) * 70 * dir; break; }
    case "rise": { const k = sp(0.36, 0.64); rx += (1 - k) * -70; dy = (1 - k) * -it.size * 0.35; break; }
    case "drop": { const k = sp(0.34, 0.62); dy = (1 - k) * 0.22 * H; rz += (1 - k) * 9 * dir; break; }
    case "swing": { const k = sp(0.4, 0.56); rz += (1 - k) * -18 * dir; break; }
    case "whip": { const k = ease.outQuint(clamp(fr / 7)); dx = (1 - k) * dir * 0.45 * W; rz += (1 - k) * -6 * dir; break; }
    case "focus": { const k = ease.outCubic(clamp(fr / 11)); dz = (1 - k) * -800; break; }
    case "arc": { const k = sp(0.36, 0.62); dy = (1 - k) * -0.1 * H; ry += (1 - k) * 36 * dir; dz = (1 - k) * 260; break; }
    case "pip": { const k = ease.outExpo(clamp(fr / 9)); sc *= 1 + (it.pipFrom ?? 0.95) * (1 - k); break; } // full frame shrinks into a card
    case "popin": { const k = sp(0.3, 0.58); sc *= 0.35 + 0.65 * k; break; }
    default: break;
  }
  if (inn !== "none" && inn !== "slam") { alpha *= clamp(fr / 3 + 0.1); sc *= 0.9 + 0.1 * sp(0.32, 0.72); }
  // idle life once settled
  const sd = hash(it.t0, it.x || 0) * 6.28;
  const life = clamp((fr - 6) / 12) * (it.still ? 0 : 1);
  dz += Math.sin(t * 0.9 + sd) * 14 * life; rz += Math.sin(t * 0.6 + sd) * 0.5 * life; ry += Math.cos(t * 0.5 + sd) * 1.4 * life;
  // fall back into the background
  let backK = 0;
  if (it.backAt !== undefined && t >= it.backAt) {
    backK = clamp((t - it.backAt) * FPS / 6);
    const e = ease.outCubic(backK);
    dz -= (it.backZ ?? 560) * e; rz += (it.backRz ?? 6) * e; ry += (it.backRy ?? 0) * e; alpha *= 1 - 0.3 * e;
  }
  let exitK = 0;
  if (t1 !== undefined && t >= t1) {
    exitK = clamp((t - t1) * FPS / 5);
    if (it.exit === "fly") { dz += ease.inExpo(exitK) * 1700; alpha *= 1 - exitK * 0.4; }
    else if (it.exit === "drop") { dy -= ease.inCubic(exitK) * 0.5 * H; rz += exitK * 22; }
    else if (it.exit === "pixel") dz += exitK * 90;
  }
  return { dx, dy, dz, rx, ry, rz, sc, alpha, backK, exitK };
}

// ---------------- panels: UI/data planes with a custom painter (x = left edge, y = centre) ----------------
export class PanelPaint {
  constructor(it) {
    this.it = it; it.size = it.size ?? 0;
    this.cw = Math.ceil(it.w * RES); this.ch = Math.ceil(it.h * RES);
    this.pad = 0; this.w = this.cw; this.base = this.ch / 2;
    this.sharp = document.createElement("canvas"); this.sharp.width = this.cw; this.sharp.height = this.ch;
    this.out = document.createElement("canvas"); this.out.width = this.cw; this.out.height = this.ch;
    this.gs = this.sharp.getContext("2d"); this.go = this.out.getContext("2d"); this.key = null;
  }
  update(t, blurPx, backK, exitK) {
    const it = this.it;
    const live = it.static ? "s" : Math.floor(t * FPS * 2);
    const key = [live, Math.round(blurPx * 2), Math.round(backK * 8), Math.round(exitK * 10)].join("|");
    if (key === this.key) return false;
    this.key = key;
    const g = this.gs; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, this.cw, this.ch);
    g.save(); g.scale(RES, RES); g.globalAlpha = 1 - 0.5 * backK; it.paint(g, t, it.w, it.h); g.restore();
    const o = this.go; o.clearRect(0, 0, this.cw, this.ch);
    if (blurPx > 0.6) o.filter = `blur(${blurPx * RES}px)`;
    o.drawImage(this.sharp, 0, 0); o.filter = "none";
    return true;
  }
}

// ---------------- the stage ----------------
export class Stage {
  constructor() {
    const c = document.createElement("canvas");
    this.r = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: true });
    this.r.setPixelRatio(1); this.r.setSize(W, H, false);
    this.r.outputColorSpace = THREE.SRGBColorSpace;
    this.r.setClearColor(0x000000, 0);
    this.scene = new THREE.Scene();
    this.cam = new THREE.PerspectiveCamera(FOV, W / H, 10, 20000);
    this.items = new Map(); // item -> { group, mesh, paint, tex }
    this.blocks = new Map();
    this.chars = new Map();
  }
  // AE-style camera: orbit around a target on the focus plane, dolly, roll, pan, shake.
  setCamera(c = {}, shake = [0, 0]) {
    const yaw = (c.yaw || 0) * DEG, pitch = (c.pitch || 0) * DEG, roll = (c.roll || 0) * DEG;
    const dist = D * (1 - (c.dolly || 0));
    const tx = (c.px || 0) + shake[0], ty = (c.py || 0) - shake[1];
    this.cam.position.set(tx + Math.sin(yaw) * Math.cos(pitch) * dist, ty + Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist);
    this.cam.up.set(Math.sin(roll), Math.cos(roll), 0);
    this.cam.lookAt(tx, ty, 0);
    this.cam.updateMatrixWorld();
  }
  blockGroup(b) {
    if (!b) return this.scene;
    let g = this.blocks.get(b);
    if (!g) { g = new THREE.Group(); this.scene.add(g); this.blocks.set(b, g); }
    g.position.set((b.x - 0.5) * W, (0.5 - b.y) * H, b.z || 0);
    g.rotation.set((b.rx || 0) * TILT * DEG, (b.ry || 0) * TILT * DEG, (b.rz || 0) * TILTZ * DEG, "YXZ");
    g.visible = true;
    return g;
  }
  textNode(it) {
    let n = this.items.get(it);
    if (!n) {
      const paint = it.panel ? new PanelPaint(it) : new TextPaint(it);
      const tex = new THREE.CanvasTexture(paint.out);
      tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8; tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, toneMapped: false });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(paint.cw / RES, paint.ch / RES), mat);
      const group = new THREE.Group(); group.add(mesh);
      // mesh offset: canvas centre relative to the text centre
      const tcx = paint.pad + paint.w / 2, tcy = paint.base - it.size * RES * 0.35;
      mesh.position.set((paint.cw / 2 - tcx) / RES, -(paint.ch / 2 - tcy) / RES, 0);
      n = { group, mesh, paint, tex, mat, parent: null };
      this.items.set(it, n);
    }
    return n;
  }
  // text centre in screen-normalised coords (alignment applied)
  static textCenter(it, paint) {
    const w = paint.w / RES;
    let x = it.x * W;
    if (it.align === "center") x -= w / 2; else if (it.align === "right") x -= w;
    return [x + w / 2, it.y * H - it.size * 0.35];
  }
  hideAll() {
    for (const n of this.items.values()) n.group.visible = false;
    for (const g of this.blocks.values()) g.visible = false;
    for (const n of this.chars.values()) n.group.visible = false;
  }
  updateText(it, t, focusZ = 0, dof = 0.011) {
    const p = placeText(it, t);
    const n = this.textNode(it);
    if (!p) return;
    const parent = this.blockGroup(it.blk);
    if (n.parent !== parent) { parent.add(n.group); n.parent = parent; }
    const [cx, cy] = Stage.textCenter(it, n.paint);
    const bx = it.blk ? (it.blk.x * W) : W / 2, by = it.blk ? (it.blk.y * H) : H / 2;
    n.group.position.set(cx - bx + p.dx, -(cy - by) + p.dy, (it.z || 0) + p.dz);
    n.group.rotation.set(p.rx * DEG, p.ry * DEG, p.rz * DEG, "YXZ");
    n.group.scale.setScalar(p.sc * (it.scale || 1));
    n.group.visible = true;
    const zAbs = (it.blk ? it.blk.z || 0 : 0) + (it.z || 0) + p.dz;
    const blurPx = clamp(Math.abs(zAbs - focusZ) * dof, 0, 26) + (it.blur || 0);
    if (n.paint.update(t, blurPx, p.backK, p.exitK)) n.tex.needsUpdate = true;
    n.mat.opacity = p.alpha;
    n.group.renderOrder = Math.round(zAbs + 5000);
    n.mesh.renderOrder = n.group.renderOrder;
  }
  // characters & props as nearest-neighbour planes
  charNode(ch) {
    let n = this.chars.get(ch);
    if (!n) {
      const spr = ch.kind === "prop" ? getSprite("prop", ch.name) : ch.kind === "cube" ? getSprite("cube") : getSprite("hero", "idle");
      const pw = Math.ceil(spr.w * (ch.kind === "prop" ? 1.4 : 2.6)), ph = Math.ceil(spr.h * (ch.kind === "prop" ? 1.4 : 1.8));
      const c = document.createElement("canvas"); c.width = pw; c.height = ph;
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace; tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, toneMapped: false });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
      const group = new THREE.Group(); group.add(mesh);
      n = { group, mesh, c, g: c.getContext("2d"), tex, mat, pw, ph, key: null, parent: null };
      this.chars.set(ch, n);
    }
    return n;
  }
  paintChar(n, ch, t) {
    const footY = ch.kind === "prop" ? n.ph / 2 : Math.round(n.ph * 0.86);
    const g = n.g;
    // key so the texture only re-uploads when the drawn pixels change
    const f = Math.floor(t * FPS);
    const key = ch.kind === "prop" ? "p" : f + "|" + (ch.kind);
    if (key === n.key) return footY;
    n.key = key;
    g.clearRect(0, 0, n.pw, n.ph);
    if (ch.kind === "prop") {
      const spr = getSprite("prop", ch.name);
      g.imageSmoothingEnabled = false;
      g.drawImage(spr.canvas, Math.round((n.pw - spr.w) / 2), Math.round((n.ph - spr.h) / 2));
    } else {
      drawChar(g, { ...ch, x: (n.pw / 2) / W, y: footY / H, px: 1, shadow: false, t0: undefined, t1: undefined }, t);
    }
    n.tex.needsUpdate = true;
    return footY;
  }
  updateChar(ch, t, focusZ = 0, dof = 0.011) {
    if (ch.t0 !== undefined && t < ch.t0 - 4 / FPS) return;
    if (ch.t1 !== undefined && t >= ch.t1) return;
    const n = this.charNode(ch);
    if (!n.parent) { this.scene.add(n.group); n.parent = this.scene; }
    const footY = this.paintChar(n, ch, t);
    let px = typeof ch.px === "function" ? ch.px(t) : ch.px;
    let x = typeof ch.x === "function" ? ch.x(t) : ch.x, y = typeof ch.y === "function" ? ch.y(t) : ch.y;
    let z = ch.z || 0, rz = ch.rz || 0;
    if (ch.kind === "prop") { // pop in, then float
      const fr = (t - ch.t0) * FPS;
      px *= 0.2 + 0.8 * spring(fr / FPS, 0.22, 0.45);
      y += Math.sin((t - ch.t0) * 2.6 + (ch.phase || 0)) * 4 / H;
      rz += Math.sin((t - ch.t0) * 1.7 + (ch.phase || 0)) * 5;
      z += 40;
    }
    n.mesh.scale.set(n.pw * px, n.ph * px, 1);
    n.mesh.position.set(0, (footY - n.ph / 2) * px, 0);
    n.group.position.set((x - 0.5) * W, (0.5 - y) * H, z);
    n.group.rotation.set(0, (ch.ry || 0) * DEG, rz * DEG);
    n.group.scale.x = ch.flip ? -1 : 1;
    n.group.visible = true;
    n.group.renderOrder = Math.round(z + 5000); n.mesh.renderOrder = n.group.renderOrder;
    n.mat.opacity = ch.alpha ?? 1;
  }
  render() { this.r.render(this.scene, this.cam); return this.r.domElement; }
}

// ---------------- world-space planes inside the voxel room ----------------
export class WorldLayer {
  constructor(room) { this.room = room; this.items = new Map(); this.chars = new Map(); }
  hideAll() { for (const n of this.items.values()) n.mesh.visible = false; for (const n of this.chars.values()) n.mesh.visible = false; }
  text(it, t) {
    it.still = true; // lying on a surface: no idle tilt (it would sink into the desk)
    const p = placeText(it, t);
    let n = this.items.get(it);
    if (!n) {
      const paint = new TextPaint(it);
      const tex = new THREE.CanvasTexture(paint.out); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4 });
      const ws = it.world.scale ?? 0.02; // world units per canvas px at RES
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(paint.cw / RES * ws, paint.ch / RES * ws), mat);
      const holder = new THREE.Group(); holder.add(mesh);
      mesh.position.set((paint.cw / 2 - paint.pad) / RES * ws, -(paint.ch / 2 - paint.base) / RES * ws, 0);
      this.room.scene.add(holder);
      n = { mesh: holder, inner: mesh, paint, tex, mat, ws }; this.items.set(it, n);
    }
    if (!p) return;
    const [x, y, z] = it.world.pos, [rx, ry, rz] = it.world.rot || [-90, 0, 0];
    n.mesh.position.set(x, y, z);
    n.mesh.rotation.set(rx * DEG, ry * DEG, rz * DEG, "XYZ");
    // entrance offsets in the plane's own axes (scaled to world)
    n.inner.position.x = (n.paint.cw / 2 - n.paint.pad) / RES * n.ws + p.dx * n.ws;
    n.inner.position.y = -(n.paint.ch / 2 - n.paint.base) / RES * n.ws + p.dy * n.ws;
    n.inner.position.z = p.dz * n.ws * 0.4;
    n.inner.rotation.set(p.rx * DEG - (it.rx || 0) * DEG, p.ry * DEG - (it.ry || 0) * DEG, p.rz * DEG - (it.rz || 0) * DEG);
    n.mesh.visible = true;
    if (n.paint.update(t, 0, p.backK, p.exitK)) n.tex.needsUpdate = true;
    n.mat.opacity = p.alpha;
  }
  char(ch, t, stagePainter) {
    let n = this.chars.get(ch);
    if (!n) {
      const spr = ch.kind === "cube" ? getSprite("cube") : getSprite("hero", "idle");
      const pw = Math.ceil(spr.w * 2.6), ph = Math.ceil(spr.h * 1.8);
      const c = document.createElement("canvas"); c.width = pw; c.height = ph;
      const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, toneMapped: false });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
      const holder = new THREE.Group(); holder.add(mesh); this.room.scene.add(holder);
      n = { mesh: holder, inner: mesh, c, g: c.getContext("2d"), tex, pw, ph, key: null }; this.chars.set(ch, n);
    }
    if (ch.t0 !== undefined && t < ch.t0) return;
    const footY = stagePainter.paintChar(n, ch, t);
    const s = ch.wpx; // world units per sprite px
    n.inner.scale.set(n.pw * s, n.ph * s, 1);
    n.inner.position.set(0, (footY - n.ph / 2) * s, 0);
    n.mesh.position.set(...ch.anchor);
    const cp = this.room.cam.position; // billboard (yaw only)
    n.mesh.rotation.set(0, Math.atan2(cp.x - ch.anchor[0], cp.z - ch.anchor[2]), 0);
    n.mesh.scale.x = ch.flip ? -1 : 1;
    n.mesh.visible = true;
  }
}
