// Voxel dioramas (three.js r186, WebGL). Chain: RenderPass -> BokehPass (DOF) -> UnrealBloomPass
// -> OutputPass (tone mapping + sRGB last). Emissives (lamp bulb, fairy lights, screen) carry
// intensity > 1 so bloom picks only them (motion-docs 11-r3f-ecosystem/three-js + postprocessing NOTES).
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { W, H, hash, rng } from "./util.js";

let renderer = null;
export function getRenderer() {
  if (renderer) return renderer;
  const c = document.createElement("canvas");
  renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

const matCache = new Map();
function mat(color, opt = {}) {
  const key = color + JSON.stringify(opt);
  if (!matCache.has(key)) {
    matCache.set(key, opt.emissive
      ? new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(opt.emissive), emissiveIntensity: opt.ei ?? 3, roughness: 0.6 })
      : new THREE.MeshStandardMaterial({ color, roughness: opt.rough ?? 0.85, metalness: opt.metal ?? 0 }));
  }
  return matCache.get(key);
}
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
function box(parent, x, y, z, w, h, d, color, opt = {}) {
  const m = new THREE.Mesh(boxGeo, opt.material || mat(color, opt));
  m.position.set(x, y, z); m.scale.set(w, h, d);
  if (opt.rx) m.rotation.x = opt.rx; if (opt.ry) m.rotation.y = opt.ry; if (opt.rz) m.rotation.z = opt.rz;
  m.castShadow = opt.cast ?? true; m.receiveShadow = opt.receive ?? true;
  parent.add(m); return m;
}
// Many small cubes with per-instance colour (books, leaves, keys, lights).
function instanced(parent, items, opt = {}) {
  const im = new THREE.InstancedMesh(boxGeo, opt.material || new THREE.MeshStandardMaterial({ roughness: opt.rough ?? 0.8 }), items.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  items.forEach((it, i) => {
    e.set(it.rx || 0, it.ry || 0, it.rz || 0); q.setFromEuler(e);
    m4.compose(new THREE.Vector3(it.x, it.y, it.z), q, new THREE.Vector3(it.w, it.h, it.d));
    im.setMatrixAt(i, m4); im.setColorAt(i, new THREE.Color(it.c));
  });
  im.castShadow = opt.cast ?? true; im.receiveShadow = true;
  parent.add(im); return im;
}

const BOOKS = ["#b3262f", "#19a59a", "#e8a23a", "#efe3c8", "#2b4a8a", "#7a3b1e", "#d9573c", "#3f7f4f", "#5a2a6a", "#f2d27a"];

// ---------- the room: desk + monitor + lamp + shelves ----------
export function buildRoom(opt = {}) {
  const r = getRenderer();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0b0705");
  scene.fog = new THREE.Fog("#0b0705", 60, 170);
  const R = rng(7);
  // floor planks
  for (let x = -60; x < 60; x += 4) box(scene, x + 2, -0.25, 0, 3.9, 0.5, 120, ["#4a2f1d", "#553621", "#3f2818"][Math.floor(R() * 3)], { cast: false });
  // back wall: vertical planks
  for (let x = -70; x < 70; x += 3) box(scene, x + 1.5, 25, -16, 2.9, 50, 0.8, ["#3a2416", "#432a19", "#33200f"][Math.floor(R() * 3)], { cast: false });
  // bookshelves (left and right) with books + fairy lights
  const books = [], lights = [];
  for (const sx of [-34, 30]) {
    for (const sy of [14, 21, 28, 35]) {
      box(scene, sx, sy - 0.4, -13, 22, 0.7, 5, "#5b3a22");
      let x = sx - 10.5;
      while (x < sx + 10) {
        const w = 0.7 + R() * 0.9, h = 3.6 + R() * 2.4, tilt = R() < 0.08 ? (R() - 0.5) * 0.5 : 0;
        if (R() < 0.08) { x += 1.4; continue; }
        books.push({ x: x + w / 2, y: sy + h / 2, z: -13 + (R() - 0.5) * 0.6, w, h, d: 3.6, c: BOOKS[Math.floor(R() * BOOKS.length)], rz: tilt });
        x += w + 0.08;
      }
    }
    box(scene, sx - 11.3, 24, -13, 0.8, 28, 5, "#4a2e1b"); box(scene, sx + 11.3, 24, -13, 0.8, 28, 5, "#4a2e1b");
    for (let i = 0; i < 18; i++) {
      const u = i / 17, x = sx - 10.5 + u * 21, y = 38.6 - Math.sin(u * Math.PI) * 2.2;
      lights.push({ x, y, z: -11, w: 0.45, h: 0.45, d: 0.45, c: R() < 0.5 ? "#ffd27a" : "#ff9a3d" });
    }
  }
  instanced(scene, books);
  instanced(scene, lights, { material: new THREE.MeshStandardMaterial({ color: "#ffcc80", emissive: "#ffb050", emissiveIntensity: 2.2 }), cast: false });
  // wall frames (colour accents)
  [[-11, 37, "#19C3B5"], [-3, 40, "#e3262f"], [5, 37, "#ff6fb0"]].forEach(([x, y, c]) => {
    box(scene, x, y, -15.3, 5, 4, 0.4, "#1a120c");
    box(scene, x, y, -15.0, 4, 3, 0.2, c, { emissive: c, ei: 0.6, cast: false });
  });
  // LED slat panel (teal / red), like the reference's wall decor
  for (let i = 0; i < 8; i++) {
    const c = i % 2 ? "#19C3B5" : "#e3262f";
    box(scene, 13.5, 21 + i * 2.1, -15.2, 9, 0.55, 0.3, c, { emissive: c, ei: 1.6, cast: false });
    box(scene, 13.5, 22.05 + i * 2.1, -15.4, 9.6, 1.4, 0.3, "#140c08", { cast: false });
  }
  // desk
  const desk = new THREE.Group(); scene.add(desk);
  box(desk, 0, 10, 0, 36, 1.1, 14, "#7a4a2a");
  box(desk, 0, 10.6, 0, 36, 0.12, 14, "#8b5a34", { cast: false });
  for (const [x, z] of [[-17, -6], [17, -6], [-17, 6], [17, 6]]) box(desk, x, 4.8, z, 1.2, 9.6, 1.2, "#5c381f");
  box(desk, 0, 7, -6.4, 33, 5, 0.6, "#5c381f");
  // monitor
  const mon = new THREE.Group(); mon.position.set(0, 11, -3.2); desk.add(mon);
  box(mon, 0, 0.25, 0, 7, 0.5, 3.5, "#222228");
  box(mon, 0, 2.6, -0.4, 1.4, 4.6, 1, "#2a2a31");
  box(mon, 0, 9.4, 0, 20, 11.6, 0.9, "#18181d");
  const ui = document.createElement("canvas"); ui.width = 1280; ui.height = 720;
  const uiTex = new THREE.CanvasTexture(ui); uiTex.colorSpace = THREE.SRGBColorSpace; uiTex.anisotropy = 4;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(18.8, 10.6), new THREE.MeshBasicMaterial({ map: uiTex, toneMapped: false }));
  screen.position.set(0, 9.4, 0.47); mon.add(screen);
  const screenLight = new THREE.PointLight("#9cc8ff", 40, 40, 2); screenLight.position.set(0, 9, 5); mon.add(screenLight);
  // keyboard
  box(desk, -1, 10.95, 3.2, 13, 0.6, 4.2, "#26262e");
  const keys = [];
  for (let kx = 0; kx < 14; kx++) for (let kz = 0; kz < 4; kz++) keys.push({ x: -6.9 + kx * 0.9, y: 11.35, z: 1.6 + kz * 1.0, w: 0.72, h: 0.3, d: 0.8, c: (kx + kz) % 7 === 0 ? "#e3262f" : "#d9d3c8" });
  instanced(desk, keys);
  // mug + papers
  box(desk, 9, 11.7, -4.5, 1.8, 2.2, 1.8, "#e3262f"); box(desk, 10.2, 11.7, -4.5, 0.5, 1.2, 0.5, "#e3262f");
  box(desk, -8.5, 10.7, -5.2, 5, 0.15, 3.2, "#efe3c8", { ry: 0.18 }); box(desk, -8.1, 10.8, -5.0, 5, 0.15, 3.2, "#f6eedb", { ry: -0.08 });
  // lamp (orange, voxel)
  const lamp = new THREE.Group(); lamp.position.set(-13, 10.6, -2.5); desk.add(lamp);
  box(lamp, 0, 0.4, 0, 3.4, 0.8, 3.4, "#d4581c");
  box(lamp, 0.4, 4, 0, 0.8, 7, 0.8, "#d4581c", { rz: -0.25 });
  box(lamp, 3.2, 7.6, 0, 0.8, 5, 0.8, "#d4581c", { rz: 0.95 });
  const head = new THREE.Group(); head.position.set(5.4, 8.4, 0.2); head.rotation.z = -0.7; lamp.add(head);
  box(head, 0, 0, 0, 3.6, 2.4, 3.2, "#c9541a");
  box(head, 0, -1.25, 0, 2.8, 0.3, 2.6, "#ffe0a8", { emissive: "#ffcf86", ei: 0.6, cast: false });
  const lampLight = new THREE.SpotLight("#ffb46a", 300, 80, 1.05, 0.85, 1.6);
  lampLight.position.set(-7.6, 18.0, -2.3); lampLight.target.position.set(-5, 10.5, -3.5);
  lampLight.castShadow = true; lampLight.shadow.mapSize.set(2048, 2048); lampLight.shadow.bias = -0.0006; lampLight.shadow.radius = 6;
  scene.add(lampLight, lampLight.target);
  const warm = new THREE.PointLight("#ff9a50", 70, 60, 1.8); warm.position.set(-8, 17, 2); scene.add(warm);
  // plant
  box(desk, 13.5, 12, -3.5, 3.4, 2.8, 3.4, "#c46a36");
  const leaves = [];
  for (let i = 0; i < 70; i++) {
    const a = R() * Math.PI * 2, rr = R() * 3.2, hh = R() * 6.5;
    leaves.push({ x: 13.5 + Math.cos(a) * rr * (1 - hh / 9), y: 14 + hh, z: -3.5 + Math.sin(a) * rr * (1 - hh / 9), w: 1, h: 1, d: 1, c: ["#3f8f4a", "#2f6f3a", "#58a85c", "#2a5f33"][Math.floor(R() * 4)], ry: R() });
  }
  instanced(desk, leaves);
  // ---------- second set: red-carpet stage (centre x=160) ----------
  const SX = 160;
  for (let x = 96; x < 232; x += 4) box(scene, x + 2, -0.25, -2, 3.9, 0.5, 70, ["#3c2418", "#46291b", "#332014"][Math.floor(R() * 3)], { cast: false });
  for (let x = 100; x < 224; x += 3) box(scene, x + 1.5, 26, -22, 2.9, 52, 0.8, ["#4a2218", "#55281b", "#3e1c13"][Math.floor(R() * 3)], { cast: false });
  [[130, 30, "#e3262f"], [146, 36, "#19C3B5"], [176, 34, "#ff6fb0"], [192, 28, "#efe3c8"], [204, 38, "#19C3B5"], [118, 40, "#f5a623"]].forEach(([x, y, c], i) => {
    box(scene, x, y, -21.3, 7 + (i % 2) * 2, 6, 0.5, "#1a0f0a");
    box(scene, x, y, -21.0, 5.6 + (i % 2) * 2, 4.6, 0.3, c, { emissive: c, ei: 0.5, cast: false });
  });
  box(scene, 118, 17, -19, 12, 10, 0.6, "#ffffff", { emissive: "#fff6ea", ei: 1.1, cast: false }); // softbox / window glow
  const carpet = [];
  for (let gx = -11; gx <= 11; gx++) for (let gz = -11; gz <= 11; gz++) {
    const d = Math.hypot(gx, gz); if (d > 11.2) continue;
    carpet.push({ x: SX + gx * 2, y: 0.25, z: -2 + gz * 2, w: 2, h: 0.5, d: 2, c: d > 10 ? "#7a0a10" : d > 9 ? "#c0141d" : "#b3121b" });
  }
  instanced(scene, carpet, { cast: false });
  // glowing PROMPT sign on a stand
  const sc = document.createElement("canvas"); sc.width = 512; sc.height = 192;
  const sg = sc.getContext("2d"); sg.fillStyle = "#04221f"; sg.fillRect(0, 0, 512, 192); sg.strokeStyle = "#19C3B5"; sg.lineWidth = 14; sg.strokeRect(10, 10, 492, 172);
  sg.fillStyle = "#b8fff4"; sg.font = "900 92px Poppins"; sg.textAlign = "center"; sg.fillText("PROMPT", 256, 128);
  const stex = new THREE.CanvasTexture(sc); stex.colorSpace = THREE.SRGBColorSpace;
  box(scene, 138, 6, -12, 0.8, 12, 0.8, "#2a2a31");
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(12, 4.5), new THREE.MeshBasicMaterial({ map: stex, toneMapped: false }));
  sign.position.set(138, 14, -11.5); sign.rotation.y = 0.35; scene.add(sign);
  box(scene, 138, 14, -11.9, 12.6, 5.1, 0.6, "#19C3B5", { emissive: "#19C3B5", ei: 1.4, cast: false });
  const stageSpot = new THREE.SpotLight("#fff1dc", 900, 120, 0.42, 0.6, 1.4);
  stageSpot.position.set(SX + 4, 62, 14); stageSpot.target.position.set(SX, 0, -2);
  stageSpot.castShadow = true; stageSpot.shadow.mapSize.set(1024, 1024); stageSpot.shadow.radius = 5;
  scene.add(stageSpot, stageSpot.target);
  const stageFill = new THREE.PointLight("#ff9a6a", 260, 90, 1.6); stageFill.position.set(SX - 30, 30, 20); scene.add(stageFill);
  const stageRim = new THREE.PointLight("#6ad8ff", 160, 90, 1.6); stageRim.position.set(SX + 40, 34, -10); scene.add(stageRim);

  // lights
  scene.add(new THREE.HemisphereLight("#6a5a8a", "#22140a", 0.9));
  const front = new THREE.PointLight("#ffd9b0", 650, 0, 2); front.position.set(4, 34, 40); scene.add(front);
  const shelfL = new THREE.PointLight("#ffb060", 260, 45, 1.6); shelfL.position.set(-33, 30, -4); scene.add(shelfL);
  const shelfR = new THREE.PointLight("#ffb060", 200, 45, 1.6); shelfR.position.set(30, 30, -4); scene.add(shelfR);
  const rim = new THREE.DirectionalLight("#ff6a3a", 1.2); rim.position.set(30, 40, -30); scene.add(rim);
  const fill = new THREE.DirectionalLight("#8aa0ff", 0.35); fill.position.set(-20, 20, 40); scene.add(fill);
  // camera + post
  const cam = new THREE.PerspectiveCamera(35, W / H, 0.5, 400);
  const composer = new EffectComposer(r);
  composer.setPixelRatio(1); composer.setSize(W, H);
  composer.addPass(new RenderPass(scene, cam));
  const bokeh = new BokehPass(scene, cam, { focus: 40, aperture: 0.0025, maxblur: 0.012 });
  composer.addPass(bokeh);
  const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.6, 0.55, 0.9);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  return {
    scene, cam, composer, bokeh, bloom, ui, uiTex, screen, mon,
    setView(view) {
      cam.position.set(...view.pos); cam.up.set(Math.sin((view.roll || 0) * Math.PI / 180), Math.cos((view.roll || 0) * Math.PI / 180), 0);
      cam.lookAt(new THREE.Vector3(...view.look));
      cam.fov = view.fov ?? 35; cam.updateProjectionMatrix(); cam.updateMatrixWorld();
      const fd = view.focusDist ?? cam.position.distanceTo(new THREE.Vector3(...view.look));
      bokeh.uniforms.focus.value = fd;
      bokeh.uniforms.aperture.value = view.aperture ?? 0.0025;
      bokeh.uniforms.maxblur.value = view.maxblur ?? 0.012;
      bloom.strength = view.bloom ?? 0.6;
      r.toneMappingExposure = view.exposure ?? 1.15;
    },
    draw() { composer.render(1 / 30); return r.domElement; },
    render(view) { this.setView(view); return this.draw(); },
    project(p) { // world -> screen px + distance
      const v = new THREE.Vector3(...p);
      const d = v.distanceTo(cam.position);
      v.project(cam);
      return { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H, d };
    },
  };
}
