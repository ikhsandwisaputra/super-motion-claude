// Frame renderer: window.renderFrame(f) draws frame f (a pure function of f) to the visible canvas.
// Each frame = K sub-frame composites (180° shutter) averaged in linear light -> real motion blur.
import * as THREE from "three";
import { FPS, W, H, clamp, ease, lerp, makeCanvas } from "./lib/util.js";
import { measure, RES } from "./lib/text.js";
import { mosaic, halftone, lightSweep, shake } from "./lib/fx.js";
import { getSprite } from "./lib/sprites.js";
import { buildRoom } from "./lib/voxel.js";
import { Post } from "./lib/post.js";
import { Stage, WorldLayer } from "./lib/stage.js";
import { build } from "./timeline.js";

const [cA, gA] = makeCanvas(), [cB, gB] = makeCanvas(), [cO, gO] = makeCanvas(), [cT, gT] = makeCanvas(), [cS, gS] = makeCanvas();
let TL, room, post, stage, stage2, world;
let snapping = false;
// render the film itself at time t (monitor playback, PiP rewind) on a second stage so it never clobbers the live one
function snapshot(t) {
  if (snapping) { gS.fillStyle = "#000"; gS.fillRect(0, 0, W, H); return cS; }
  snapping = true; renderShot(shotAt(t), t, gS, stage2); snapping = false;
  return cS;
}
const SHUTTER = 0.5;

async function init() {
  const faces = ["600 40px Inter", "500 40px Inter", "800 40px Poppins", "900 40px Poppins", "italic 900 40px Poppins", "40px Anton",
    '40px "Kaushan Script"', '40px "Permanent Marker"', "40px VT323", "40px Silkscreen", '700 40px "JetBrains Mono"'];
  await Promise.all(faces.map((f) => document.fonts.load(f)));
  await document.fonts.ready;
  const WORDS = await (await fetch("../build/words_edit.json")).json();
  TL = build(WORDS, measure, { snapshot: (t) => snapshot(t) });
  room = buildRoom();
  world = new WorldLayer(room);
  stage = new Stage(); window.__stage = stage;
  stage2 = new Stage();
  post = new Post(document.getElementById("out"));
  return Math.ceil(TL.duration * FPS);
}

function shotAt(t) {
  for (const s of TL.shots) if (t >= s.t0 && t < s.t1) return s;
  return TL.shots[TL.shots.length - 1];
}

function renderShot(s, t, g, stage = window.__stage) {
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = "none"; g.globalCompositeOperation = "source-over";
  g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
  const cam = s.tcam ? s.tcam(t) : {};
  const sh = s.shake ? s.shake.reduce((a, k) => { const v = shake(t, k.t, k.amp ?? 14); return [a[0] + v[0], a[1] + v[1]]; }, [0, 0]) : [0, 0];
  stage.setCamera(cam, sh);
  // project a stage point (screen-normalised x/y at the focus plane, depth z) through the type camera
  const P = (x, y, z = 0) => { const v = new THREE.Vector3((x - 0.5) * W, (0.5 - y) * H, z).project(stage.cam); return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H]; };
  if (s.set) {
    if (s.ui) { s.ui(room.ui.getContext("2d"), t); room.uiTex.needsUpdate = true; }
    const v = s.view(t);
    if (cam.px || cam.py) { // couple the room to the type camera's travel (smaller move = depth/parallax)
      const k = s.couple ?? 0.008;
      v.pos = [v.pos[0] + (cam.px || 0) * k, v.pos[1] + (cam.py || 0) * k, v.pos[2]];
      v.look = [v.look[0] + (cam.px || 0) * k * 1.6, v.look[1] + (cam.py || 0) * k * 1.6, v.look[2]];
    }
    room.setView(v);
    world.hideAll();
    for (const ch of s.wchars || []) world.char(ch, t, stage);
    for (const it of s.wtexts || []) world.text(it, t);
    const img = room.draw();
    g.save(); g.translate(sh[0] * 0.7, sh[1] * 0.7); g.drawImage(img, 0, 0); g.restore();
    stage.setCamera(cam, sh);
    if (s.extra) s.extra(g, t, P);
  } else {
    g.save();
    const z = 1.16 + (cam.dolly || 0) * 0.45 + (s.bgZoom ? s.bgZoom(t) : 0); // overscan: camera roll/pan never exposes the canvas edge
    g.translate(W / 2 + sh[0] * 0.5 - (cam.yaw || 0) * 3 - (cam.px || 0) * 0.12, H / 2 + sh[1] * 0.5 + (cam.pitch || 0) * 3 + (cam.py || 0) * 0.12);
    g.rotate(((cam.roll || 0) * 0.4 * Math.PI) / 180); g.scale(z, z); g.translate(-W / 2, -H / 2);
    if (s.bg) s.bg(g, t);
    g.restore();
    if (s.extra) s.extra(g, t, P);
  }
  stage.hideAll(); stage.setCamera(cam, sh);
  const fz = s.focusZ ?? 0, dof = s.dof ?? 0.011;
  for (const ch of s.chars || []) stage.updateChar(ch, t, fz, dof);
  for (const p of s.props || []) stage.updateChar(p, t, fz, dof);
  for (const it of s.texts || []) stage.updateText(it, t, fz, dof);
  g.drawImage(stage.render(), 0, 0);
  if (s.over) s.over(g, t);
}

function basePost(f) {
  return { seed: ((f * 0.6180339) % 1) * 100, ca: 0.0011, vig: 0.48, grain: 0.02, glow: 0.32, exposure: 0.96, sat: 1.07, contrast: 0.14, warm: 0.6, mode: 0, flash: 0, pix: 0, glitch: 0, blurX: 0, blurY: 0 };
}
const merge = (a, b) => { for (const k in b) if (b[k] !== undefined) a[k] = b[k]; return a; };

// composite the frame at time tk into cO; when P is given (the frame's own time), fill post params
function composite(tk, f, P) {
  const tr = TL.trans.find((x) => tk >= x.at - x.pre / FPS && tk < x.at + x.post / FPS);
  gO.setTransform(1, 0, 0, 1, 0, 0); gO.filter = "none"; gO.globalAlpha = 1;
  if (!tr) {
    const s = shotAt(tk);
    renderShot(s, tk, gA); gO.drawImage(cA, 0, 0);
    if (P && s.post) merge(P, s.post(tk));
    return;
  }
  const fRel = (tk - tr.at) * FPS;
  const fQ = f - Math.round(tr.at * FPS); // frame-quantised (crisp mosaic cells)
  const sA = shotAt(tr.at - 1e-4), sB = shotAt(tr.at + 1e-4);
  const both = ["halftone", "mosaic", "whipMosaic", "light", "xfade"].includes(tr.type);
  if (fRel < 0 || both) renderShot(sA, tk, gA);
  if (fRel >= 0 || both) renderShot(sB, tk, gB);
  if (P) { const cur = fRel < 0 ? sA : sB; if (cur.post) merge(P, cur.post(tk)); }
  switch (tr.type) {
    case "halftone": halftone(gO, cA, cB, clamp((fRel + tr.pre) / (tr.pre + tr.post))); break;
    case "mosaic": mosaic(gO, cA, cB, fQ, tr); break;
    case "whipMosaic": {
      gO.fillStyle = "#000"; gO.fillRect(0, 0, W, H);
      if (fRel < 0) {
        const e = ease.inCubic(clamp((fRel + tr.pre) / tr.pre));
        gO.drawImage(cA, -e * W * 0.9, 0);
        if (P) P.blurX = 10 + 170 * e;
      } else gO.drawImage(cB, 0, 0);
      gT.drawImage(cO, 0, 0);
      mosaic(gO, cT, cB, fQ, { inF: 3, hold: 2, outF: 5, seed: 3 });
      break;
    }
    case "glitch":
      if (fRel < 0) { gO.drawImage(cA, 0, 0); if (P) { P.glitch = 0.9; P.ca = 0.02; P.blurX = 18; } }
      else { gO.drawImage(cB, 0, 0); if (P) P.exposure = 0.35 + 0.65 * clamp(fRel / tr.post); }
      break;
    case "pixelate":
      if (fRel < 0) { gO.drawImage(cA, 0, 0); if (P) P.pix = Math.max(1, Math.pow(2, 1 + 5 * clamp((fRel + tr.pre) / tr.pre))); }
      else { gO.fillStyle = "#000"; gO.fillRect(0, 0, W, H); }
      break;
    case "flash":
      gO.drawImage(cB, 0, 0); if (P) P.flash = Math.max(P.flash, (1 - fRel / Math.max(1, tr.post)) * 0.85);
      break;
    case "fgwipe": {
      gO.drawImage(fRel < 0 ? cA : cB, 0, 0);
      const k = clamp((fRel + tr.pre) / (tr.pre + tr.post));
      const spr = getSprite("hero", "idle"), px = 34, x = lerp(1.25 * W, -0.75 * W, ease.inOutCubic(k));
      gO.save(); gO.filter = "blur(22px)"; gO.imageSmoothingEnabled = false;
      gO.drawImage(spr.canvas, x, H * 0.5 - spr.h * px * 0.3, spr.w * px, spr.h * px); gO.restore();
      break;
    }
    case "light": {
      const white = lightSweep(gO, cA, cB, fRel);
      if (P) { P.flash = Math.max(P.flash, white); P.glow = 0.8; }
      break;
    }
    case "xfade": { // soft dissolve (calm cosmic section only)
      const k = ease.inOutCubic(clamp((fRel + tr.pre) / (tr.pre + tr.post)));
      gO.drawImage(cA, 0, 0); gO.globalAlpha = k; gO.drawImage(cB, 0, 0); gO.globalAlpha = 1;
      break;
    }
    case "smash": { // accelerating push-in, then cut
      if (fRel < 0) {
        const e = ease.inExpo(clamp((fRel + tr.pre) / tr.pre)), z = 1 + 1.6 * e;
        gO.fillStyle = "#000"; gO.fillRect(0, 0, W, H);
        gO.save(); gO.translate(W * (tr.cx ?? 0.5), H * (tr.cy ?? 0.5)); gO.scale(z, z); gO.translate(-W * (tr.cx ?? 0.5), -H * (tr.cy ?? 0.5)); gO.drawImage(cA, 0, 0); gO.restore();
        if (P) P.blurY = 30 * e;
      } else { gO.drawImage(cB, 0, 0); if (P) P.flash = Math.max(P.flash, 0.5 * (1 - fRel / Math.max(1, tr.post))); }
      break;
    }
    default: gO.drawImage(fRel < 0 ? cA : cB, 0, 0);
  }
}

// how much motion blur this frame needs (sub-samples)
function motionK(t) {
  if (TL.trans.some((x) => t >= x.at - (x.pre + 2) / FPS && t < x.at + (x.post + 2) / FPS)) return 6;
  const s = shotAt(t);
  const near = (t0, a = 0, b = 9) => { const d = (t - t0) * FPS; return d >= a && d < b; };
  for (const it of s.texts || []) if (near(it.t0) || (it.t1 !== undefined && near(it.t1, -1, 7)) || (it.backAt !== undefined && near(it.backAt))) return 6;
  for (const ch of [...(s.chars || []), ...(s.wchars || [])]) for (const k of ch.keys || []) if (near(k.t, -4, 6)) return 6;
  for (const k of s.shake || []) if (near(k.t, -2, 10)) return 6;
  if (s.fast && s.fast(t)) return 6;
  if (s.tcam && s.tcam.moves && s.tcam.moves.some(([a, b]) => t >= a - 0.05 && t < b + 0.05)) return 6;
  return 3;
}

window.renderFrame = (f) => {
  const t = f / FPS;
  const K = motionK(t);
  const P = basePost(f);
  post.begin();
  const home = shotAt(t);
  const inTrans = (x) => TL.trans.some((tr) => x >= tr.at - tr.pre / FPS && x < tr.at + tr.post / FPS);
  for (let k = 0; k < K; k++) {
    let tk = t - (k / K) * SHUTTER / FPS;
    // motion blur must never smear across a hard cut: keep the sub-frame inside this frame's shot
    if (!inTrans(tk) && !inTrans(t) && shotAt(tk) !== home) tk = home.t0;
    composite(tk, f, k === 0 ? P : null);
    post.accum(cO, 1 / K);
  }
  post.render(P);
  return K;
};

// Safe-area check: project every word's glyph box at its settled moment through the type camera.
window.checkSafe = () => {
  const out = [];
  for (const s of TL.shots) for (const it of s.texts || []) {
    if (it.crop || it.panel) continue;
    let tEnd = Math.min(it.t1 ?? s.t1, s.t1);
    for (const [a] of (s.tcam && s.tcam.moves) || []) if (a > it.t0) tEnd = Math.min(tEnd, a);
    for (const t of [Math.min(it.t0 + 0.7, tEnd - 0.04), tEnd - 0.04]) {
    if (t < it.t0) continue;
    stage.hideAll(); stage.setCamera(s.tcam ? s.tcam(t) : {}, [0, 0]);
    stage.updateText(it, t, s.focusZ ?? 0, s.dof ?? 0.011);
    const n = stage.items.get(it); stage.scene.updateMatrixWorld(true);
    const p = n.paint, sz = it.size * RES;
    const xl = (p.pad - p.cw / 2) / RES, xr = (p.pad + p.w - p.cw / 2) / RES;
    const yt = (p.ch / 2 - (p.base - sz * 0.78)) / RES, yb = (p.ch / 2 - (p.base + sz * 0.12)) / RES;
    let a = [1e9, 1e9, -1e9, -1e9];
    for (const [x, y] of [[xl, yt], [xr, yt], [xl, yb], [xr, yb]]) {
      const v = new THREE.Vector3(x, y, 0).applyMatrix4(n.mesh.matrixWorld).project(stage.cam);
      const sx = (v.x * 0.5 + 0.5) * W, sy = (-v.y * 0.5 + 0.5) * H;
      a = [Math.min(a[0], sx), Math.min(a[1], sy), Math.max(a[2], sx), Math.max(a[3], sy)];
    }
    const bad = a[0] < 0.03 * W || a[2] > 0.97 * W || a[1] < 0.035 * H || a[3] > 0.965 * H;
    out.push({ shot: s.id, text: it.text, bad, box: a.map((v, i) => +(v / (i % 2 ? H : W)).toFixed(3)) });
  } }
  return out;
};
function boxOf(it) {
  const n = stage.items.get(it); if (!n || !n.group.visible) return null;
  const p = n.paint, sz = it.size * RES;
  const xl = (p.pad - p.cw / 2) / RES, xr = (p.pad + p.w - p.cw / 2) / RES;
  const yt = (p.ch / 2 - (p.base - sz * 0.74)) / RES, yb = (p.ch / 2 - (p.base + sz * 0.1)) / RES;
  let a = [1e9, 1e9, -1e9, -1e9];
  for (const [x, y] of [[xl, yt], [xr, yt], [xl, yb], [xr, yb]]) {
    const v = new THREE.Vector3(x, y, 0).applyMatrix4(n.mesh.matrixWorld).project(stage.cam);
    const sx = (v.x * 0.5 + 0.5) * W, sy = (-v.y * 0.5 + 0.5) * H;
    a = [Math.min(a[0], sx), Math.min(a[1], sy), Math.max(a[2], sx), Math.max(a[3], sy)];
  }
  return a;
}
window.checkOverlap = () => {
  const out = [];
  for (const s of TL.shots) for (const it of s.texts || []) {
    const t = Math.min(it.t0 + 0.6, s.t1 - 0.04);
    stage.hideAll(); stage.setCamera(s.tcam ? s.tcam(t) : {}, [0, 0]);
    if (it.panel || it.crop) continue;
    const vis = (s.texts || []).filter((o) => !o.panel && o.t0 <= t && (o.t1 === undefined || t < o.t1) && !(o.backAt !== undefined && t > o.backAt + 0.2));
    vis.forEach((o) => stage.updateText(o, t, s.focusZ ?? 0, s.dof ?? 0.011));
    stage.scene.updateMatrixWorld(true);
    const b = boxOf(it); if (!b) continue;
    for (const o of vis) {
      if (o === it || o.t0 > it.t0 || (it.overlapOk || []).includes(o.text) || (o.overlapOk || []).includes(it.text)) continue;
      const c = boxOf(o); if (!c) continue;
      const ix = Math.max(0, Math.min(b[2], c[2]) - Math.max(b[0], c[0])), iy = Math.max(0, Math.min(b[3], c[3]) - Math.max(b[1], c[1]));
      const small = Math.min((b[2] - b[0]) * (b[3] - b[1]), (c[2] - c[0]) * (c[3] - c[1]));
      if (ix * iy > 0.06 * small) out.push({ shot: s.id, a: it.text, b: o.text, frac: +(ix * iy / small).toFixed(2), t: +t.toFixed(2) });
    }
  }
  return out;
};
window.cutFrames = () => TL.shots.map((x) => Math.ceil(x.t0 * FPS));
window.getCues = () => ({ cues: TL.cues, bed: TL.bed, duration: TL.duration, fps: FPS });
window.ready = init();
