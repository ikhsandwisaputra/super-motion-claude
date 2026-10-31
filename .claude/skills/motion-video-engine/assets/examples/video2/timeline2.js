// Second half of the film (VO lines 9-32). Same rules as timeline.js: every time comes from a VO
// word, phrases live in 3D and the camera travels between them, transitions follow the reference mix.
import { FPS, W, H, clamp, ease, lerp, PAL, hash } from "./lib/util.js";
import { blackSoft } from "./lib/scenes2.js";
import { storm, galaxy, planet, moon, dotSphere, gridVoid, themeBg } from "./lib/scenes2.js";
import { chatUI, codeUI, videoUI, editorUI } from "./lib/ui.js";
import { embers } from "./lib/fx.js";
import { counter, meter, progress, framework, tile, inputBar, toast, videoCard, strike, themeCard, arrow } from "./lib/panels.js";

export function buildRest(C) {
  const { w, we, F, shots, trans, cues, bed, row, camPath, prop, env, START } = C;
  const cue = (t, name, db = -14, rate = 1) => cues.push({ t, name, db, rate });
  const panel = (o) => ({ panel: true, in: "popin", ...o });
  const SX = 160; // red-carpet stage centre (voxel.js)
  const darkRight = (g) => { const gr = g.createLinearGradient(0.38 * W, 0, W, 0); gr.addColorStop(0, "rgba(8,3,2,0)"); gr.addColorStop(0.4, "rgba(8,3,2,0.5)"); gr.addColorStop(1, "rgba(8,3,2,0.65)"); g.fillStyle = gr; g.fillRect(0, 0, W, H); };
  const darkLeft = (g) => { const gr = g.createLinearGradient(0, 0, 0.62 * W, 0); gr.addColorStop(0, "rgba(8,3,2,0.65)"); gr.addColorStop(0.6, "rgba(8,3,2,0.4)"); gr.addColorStop(1, "rgba(8,3,2,0)"); g.fillStyle = gr; g.fillRect(0, 0, W, H); };
  const ease3 = (t, t0, d) => ease.inOutCubic(clamp((t - t0) / d));
  const view = (t0, d, p0, p1, look, extra = {}) => (t) => { const k = ease3(t, t0, d); return { pos: p0.map((v, i) => lerp(v, p1[i], k)), look, fov: 36, aperture: 0.0025, maxblur: 0.012, ...extra }; };
  const stageView = (t0, d, p0, p1, look = [SX - 2, 9, -4], extra = {}) => view(t0, d, p0, p1, look, { focusDist: Math.hypot(p1[0] - look[0], p1[1] - look[1], p1[2] - look[2]), ...extra });
  const hero = (anchor, keys, wpx = 0.26) => ({ kind: "hero", anchor, wpx, keys });
  const cube = (anchor, keys, wpx = 0.2) => ({ kind: "cube", anchor, wpx, keys });
  const mono = { sat: 0.0, contrast: 0.06, grain: 0.035, glow: 0.42, warm: 0 };

  // ---------------- S11 the monitor plays this very video ----------------
  const S11 = START, S12 = w(67) - F(2);
  shots.push({
    id: "S11", t0: S11, t1: S12, set: "room",
    view: view(S11, 2.2, [-2, 21.5, 35], [0, 20.5, 29], [0, 20, -3], { focusDist: 31, aperture: 0.003 }),
    ui: (g, t) => videoUI(g, t, env.snapshot, 2.6 + (t - S11)),
    tcam: camPath([{ t: S11, py: 120, yaw: 4 }, { t: w(65) - 0.2, d: 0.45, py: -90, yaw: -6, roll: 1.5, dolly: 0.06 }], 0.012), couple: 0.008,
    props: [prop({ name: "speaker", x: 0.06, y: 0.145, px: 6, t0: w(60) - F(2), phase: 0.3 })],
    texts: [
      { text: "And this video", font: "conn", size: 58, x: 0.085, y: 0.165, fx: "type", cps: 26, caret: true, caretUntil: w(63), in: "none", t0: w(60) },
      { text: "you're watching", font: "conn", size: 58, x: 0.085, y: 0.245, in: "slide", t0: w(63) },
      { text: "right", font: "heavy", size: 190, x: 0.11, y: 0.68, z: 110, ry: 10, in: "fly", t0: w(65), extrude: true },
      { text: "now?", font: "heavy", size: 190, x: 0.42, y: 0.68, z: 110, ry: 10, grad: "hot", in: "slam", t0: w(66), extrude: true, extrudeColor: "#4a1404" },
    ],
    shake: [{ t: w(66), amp: 8 }],
  });
  cue(w(66), "impact_slam", -15, 1.2);

  // ---------------- S12 made with that exact formula ----------------
  const S13 = w(72) - F(2);
  shots.push({
    id: "S12", t0: S12, t1: S13, set: "room",
    view: view(S12, 2.0, [-25, 22.5, 27], [-20.5, 21.5, 22.5], [0, 19, -3], { focusDist: 28, aperture: 0.003 }),
    ui: (g, t) => codeUI(g, t, S12 - 10, { cps: 40 }),
    wchars: [hero([-6, 0.2, 10], [{ t: S12, pose: "back" }], 0.2)],
    tcam: camPath([{ t: S12, py: 80, yaw: -4 }, { t: w(70) - 0.2, d: 0.45, py: -80, yaw: 6, dolly: 0.05 }], 0.012), couple: 0.008,
    texts: [
      { text: "Made with that", font: "conn", size: 62, x: 0.06, y: 0.16, in: "slide", t0: w(67) },
      { text: "exact", font: "content", size: 96, x: 0.55, y: 0.68, ry: -8, in: "drop", t0: w(70) },
      { text: "formula.", font: "brush", size: 170, x: 0.58, y: 0.86, ry: -8, color: PAL.red, fx: "wipe", in: "none", t0: w(71) },
    ],
  });
  trans.push({ at: S12, type: "mosaic", pre: 3, post: 4, partial: 0.5, seed: 12, inF: 3, hold: 1, outF: 3 });
  cue(S12 - F(2), "mosaic_crunch", -17, 1.15);

  // ---------------- S13 at this level (meter) ----------------
  const S14 = w(81) - F(2);
  const MB = { x: 0.62, y: 0.45, z: 60, ry: -12, rz: -2 };
  shots.push({
    id: "S13", t0: S13, t1: S14, set: "room",
    view: view(S13, 3, [-36, 26, 16], [-37.5, 26.2, 14.5], [-37, 25.5, -13], { focusDist: 6, aperture: 0.005, maxblur: 0.026, exposure: 0.72, bloom: 0.45 }),
    extra: (g) => darkRight(g),
    tcam: camPath([{ t: S13, py: 60, yaw: 3 }, { t: w(78) - 0.2, d: 0.45, py: -70, yaw: -4, dolly: 0.04 }], 0.01), couple: 0.006,
    chars: [{ kind: "hero", x: 0.21, y: 1.62, z: -100, px: 24, keys: [{ t: S13, pose: "present", expr: "normal" }, { t: w(80), pose: "point", expr: "determined", mouth: "smile" }] }],
    texts: [
      { blk: MB, text: "Which means", font: "conn", size: 60, x: 0.5, y: 0.2, in: "slide", t0: w(72) },
      { blk: MB, text: "Claude can make", font: "conn", size: 60, x: 0.5, y: 0.285, in: "slide", t0: w(74) },
      { blk: MB, text: "motion", font: "heavy", size: 124, x: 0.5, y: 0.43, in: "fly", t0: w(77), extrude: true },
      ...row(0.5, 0.56, 60, "conn", [{ text: "at", t0: w(78) }, { text: "this", t0: w(79) }, { text: "level...", font: "heavy", size: 110, grad: "coral", t0: w(80), in: "rise" }], { blk: MB, in: "slide" }),
      panel({ blk: MB, x: 0.5, y: 0.68, w: 640, h: 80, t0: w(80) - 0.05, paint: meter({ t0: w(80), dur: 0.7 }) }),
    ],
  });
  trans.push({ at: S13, type: "fgwipe", pre: 3, post: 3 });
  cue(S13 - F(3), "whoosh_short", -13, 0.85);
  for (let i = 0; i < 10; i++) cue(w(80) + i * 0.07, "tick", -24, 0.9 + i * 0.04);

  // ---------------- S14 for ANY theme ----------------
  const S15 = w(84) - F(3);
  const cards = [["football", "FOOTBALL", 0.06, 0.32, 14], ["fashion", "FASHION", 0.6, 0.27, -14], ["science", "SCIENCE", 0.08, 0.76, 12], ["food", "FOOD", 0.62, 0.79, -12]];
  shots.push({
    id: "S14", t0: S14, t1: S15,
    bg: (g, t) => blackSoft(g, t, "rgba(90,20,24,0.4)"),
    tcam: camPath([{ t: S14, yaw: -6, dolly: 0 }, { t: w(82) - 0.08, d: 0.3, dolly: 0.08, yaw: 4, ease: ease.outCubic }], 0.02),
    shake: [{ t: w(82), amp: 16 }],
    texts: [
      ...cards.map(([kind, label, x, y, ry], i) => panel({ x, y, z: -260, ry, w: 600, h: 338, t0: S14 + i * 0.06, paint: themeCard({ kind, label, t0: S14 }) })),
      { text: "for", font: "conn", size: 64, x: 0.5, align: "center", y: 0.42, z: 100, in: "drop", t0: w(81) },
      { text: "ANY", font: "emph", size: 300, x: 0.5, align: "center", y: 0.66, z: 160, color: PAL.red, in: "slam", t0: w(82), extrude: true, extrudeColor: "#3a0004" },
      { text: "theme.", font: "brush", size: 140, x: 0.5, y: 0.8, z: 160, fx: "wipe", in: "none", t0: w(83) },
    ],
    post: (t) => { const k = (t - w(82)) * FPS; const o = {}; if (k >= 0 && k < 1) o.flash = 0.45; if (k >= 0 && k < 8) o.ca = 0.012 * (1 - k / 8); return o; },
  });
  trans.push({ at: S14, type: "flash", pre: 0, post: 2 });
  cue(S14, "card_flutter", -15, 1.1); cue(w(82) - F(1), "impact_slam", -6);

  // ---------------- S15 250 MB of docs / 66 notes (pull-out reveal on the shelves) ----------------
  const S16 = w(99) - F(3);
  shots.push({
    id: "S15", t0: S15, t1: S16, set: "room",
    view: (t) => { const k = ease.outCubic(clamp((t - S15) / 3.2)); return { pos: [-33, 25, lerp(-5.5, 30, k)], look: [-33, 25, -13], fov: 40, focusDist: lerp(7, 42, k), aperture: 0.0022, maxblur: 0.012, exposure: 0.9 }; },
    extra: (g) => darkLeft(g),
    tcam: camPath([{ t: S15, px: 0, yaw: 4 }, { t: w(96) - 0.22, d: 0.5, px: 700, yaw: -10, roll: 2, dolly: 0.04 }], 0.01), couple: 0.004,
    texts: [
      { text: "He fed it", font: "conn", size: 62, x: 0.06, y: 0.15, in: "slide", t0: w(84) },
      panel({ x: 0.05, y: 0.4, w: 820, h: 250, t0: w(87) - 0.05, in: "fly", paint: counter({ t0: w(87), dur: 1.3, to: 250, suffix: "MB", size: 230 }) }),
      { text: "official motion docs.", font: "content", size: 80, x: 0.06, y: 0.6, in: "slide", t0: w(93) },
      panel({ x: 0.92, y: 0.4, w: 520, h: 250, t0: w(96) - 0.05, in: "fly", paint: counter({ t0: w(96), dur: 0.8, to: 66, size: 230, color: PAL.teal, glow: "rgba(25,195,181,0.6)" }) }),
      { text: "expert notes.", font: "heavy", size: 104, x: 0.92, y: 0.6, in: "rise", t0: w(97), extrude: true },
    ],
  });
  trans.push({ at: S15, type: "flash", pre: 0, post: 2 });
  for (let i = 0; i < 14; i++) cue(w(87) + i * 0.08, "tick", -27, 0.85 + i * 0.03);
  for (let i = 0; i < 8; i++) cue(w(96) + i * 0.08, "tick", -27, 1.0 + i * 0.04);
  cue(w(96) - 0.24, "whoosh_whip", -16, 1.1);

  // ---------------- S16 this video is already the tutorial (PiP shrink + rewind) ----------------
  const S17 = w(106) - F(2);
  shots.push({
    id: "S16", t0: S16, t1: S17,
    bg: (g, t) => blackSoft(g, t, "rgba(25,40,60,0.35)"),
    tcam: camPath([{ t: S16, py: 30, yaw: 2 }, { t: w(102) - 0.15, d: 0.45, py: -80, yaw: -3, dolly: 0.04 }], 0.012),
    texts: [
      panel({ x: 0.2, y: 0.44, w: 1150, h: 660, z: -40, ry: 6, in: "pip", pipFrom: 0.72, t0: S16,
        paint: videoCard({ snapshot: env.snapshot, map: (t) => Math.max(2.5, 41.0 - (t - S16) * 13.5), rewind: [S16 + 0.25, S16 + 2.85], title: "video-2.mp4 — rewinding" }) }),
      { text: "And this", font: "conn", size: 60, x: 0.2, y: 0.1, in: "slide", t0: w(99) },
      { text: "video?", font: "heavy", size: 92, x: 0.335, y: 0.1, in: "drop", t0: w(101) },
      { text: "It's already the", font: "conn", size: 60, x: 0.5, align: "center", y: 0.8, in: "slide", t0: w(102) },
      { text: "TUTORIAL.", font: "emph", size: 185, x: 0.5, align: "center", y: 0.965, z: 30, color: PAL.red, in: "slam", t0: w(105), extrude: true, extrudeColor: "#3a0004" },
    ],
    shake: [{ t: w(105), amp: 10 }],
  });
  trans.push({ at: S16, type: "flash", pre: 0, post: 2 });
  cue(S16, "whoosh_whip", -14, 0.8); cue(S16 + 0.25, "glitch", -20, 0.7); cue(w(105) - F(1), "impact_slam", -9);

  // ---------------- S17 so... let's cook (storm) ----------------
  const S18a = w(109) - F(1);
  const bolts = [{ t: w(106) + 0.05, seed: 3, x0: 0.64, y0: -0.05, x1: 0.5, y1: 0.55 }, { t: w(108) - 0.02, seed: 7, x0: 0.3, y0: -0.05, x1: 0.44, y1: 0.62 }];
  shots.push({
    id: "S17", t0: S17, t1: S18a,
    bg: (g, t) => storm(g, t, S17, { zoom: 0.34, bolts }),
    tcam: camPath([{ t: S17, dolly: 0, yaw: -3 }, { t: w(107) - 0.12, d: 0.4, dolly: 0.1, yaw: 4, roll: -2 }], 0.03),
    texts: [
      { text: "So...", font: "conn", size: 84, x: 0.5, align: "center", y: 0.52, in: "fly", t0: w(106), t1: w(107) - F(1), exit: "fly" },
      { text: "LET'S", font: "emph", size: 210, x: 0.28, y: 0.5, z: 80, grad: "hot", in: "fly", t0: w(107), extrude: true, extrudeColor: "#4a1404", glow: "rgba(255,150,40,0.55)" },
      { text: "COOK.", font: "emph", size: 290, x: 0.36, y: 0.8, z: 120, grad: "hot", in: "slam", t0: w(108), extrude: true, extrudeColor: "#4a1404", glow: "rgba(255,150,40,0.65)" },
    ],
    shake: [{ t: w(108), amp: 18 }],
    post: (t) => { const o = { sat: 1.0 }; for (const b of bolts) { const k = (t - b.t) * FPS; if (k >= 0 && k < 2) o.flash = k < 1 ? 0.5 : 0.25; } return o; },
  });
  trans.push({ at: S17, type: "whipMosaic", pre: 8, post: 6 });
  cue(S17 - F(8), "whoosh_whip", -14); cue(S17 - F(3), "mosaic_crunch", -16); cue(w(106) + 0.2, "riser", -18);
  cue(bolts[0].t, "thunder", -19, 1.15); cue(bolts[1].t - 0.05, "thunder", -12); cue(w(108) - F(1), "impact_slam", -11, 0.9);

  // ---------------- S18 calm monochrome cosmos ----------------
  const S18b = w(111) - F(3), S18c = w(117) - F(3), S18d = w(120) - F(3), S19 = w(126) - F(2);
  shots.push({ id: "S18a", t0: S18a, t1: S18b, bg: (g, t) => galaxy(g, t, S18a), tcam: camPath([{ t: S18a, dolly: 0 }], 0.02), post: () => mono,
    texts: [{ text: "But first,", font: "conn", size: 50, x: 0.5, align: "center", y: 0.54, in: "focus", t0: w(109), shadow: false }] });
  shots.push({ id: "S18b", t0: S18b, t1: S18c, bg: (g, t) => planet(g, t, S18b), tcam: camPath([{ t: S18b, dolly: 0, py: 20 }], 0.015), post: () => mono,
    texts: [panel({ x: 0.27, y: 0.44, w: 870, h: 96, t0: S18b + 0.05, paint: inputBar({ text: "one thing you need to know.", t0: w(111), cps: 21 }) })] });
  shots.push({ id: "S18c", t0: S18c, t1: S18d, bg: (g, t) => dotSphere(g, t, S18c), tcam: camPath([{ t: S18c, dolly: 0 }], 0.015), post: () => mono,
    texts: [panel({ x: 0.33, y: 0.5, w: 130, h: 60, t0: w(117) - 0.02, in: "none", paint: arrow({ t0: w(117) }) }),
      { text: "Because", font: "conn", size: 56, x: 0.42, y: 0.52, in: "slide", t0: w(117), shadow: false },
      { text: "without it,", font: "conn", size: 56, x: 0.42, y: 0.61, color: "#bdbdc5", in: "focus", t0: w(118), shadow: false }] });
  shots.push({ id: "S18d", t0: S18d, t1: S19, bg: (g, t) => moon(g, t, S18d), tcam: camPath([{ t: S18d, dolly: 0 }], 0.02), post: () => mono,
    texts: [{ text: "none of this works", font: "conn", size: 52, x: 0.5, align: "center", y: 0.5, fx: "type", cps: 30, in: "none", t0: w(120), shadow: false },
      { text: "for you.", font: "conn", size: 52, x: 0.5, align: "center", y: 0.585, in: "focus", t0: w(124), shadow: false }] });
  trans.push({ at: S18a, type: "flash", pre: 0, post: 3 });
  trans.push({ at: S18b, type: "xfade", pre: 4, post: 4 }, { at: S18c, type: "xfade", pre: 4, post: 4 }, { at: S18d, type: "xfade", pre: 4, post: 4 });
  cue(S18a, "shimmer_whiteout", -18, 0.8);

  // ---------------- S19 stage: there is no magic prompt / there never was ----------------
  const S20 = w(134) - F(2);
  const heroStage = (keys) => hero([SX - 8, 0.5, 0], keys);
  const cubeStage = (keys) => cube([SX + 7, 0.5, 2], keys);
  shots.push({
    id: "S19", t0: S19, t1: S20, set: "room",
    view: stageView(S19, 3.2, [SX + 18, 24, 56], [SX + 10, 21, 47]),
    wchars: [heroStage([{ t: S19, pose: "present" }, { t: w(132), pose: "surprised" }]), cubeStage([{ t: S19 }, { t: w(128), expr: "surprised" }])],
    tcam: camPath([{ t: S19, py: 80, yaw: -4, roll: -1 }, { t: w(131) - 0.2, d: 0.45, py: -110, yaw: 6, roll: 1, dolly: 0.05 }], 0.012), couple: 0.008,
    texts: [
      { text: "There is", font: "conn", size: 60, x: 0.6, y: 0.16, in: "slide", t0: w(126) },
      { text: "NO", font: "emph", size: 180, x: 0.6, y: 0.35, color: PAL.red, in: "slam", t0: w(128), extrude: true, extrudeColor: "#3a0004" },
      { text: "MAGIC", font: "emph", size: 180, x: 0.708, y: 0.35, color: PAL.red, in: "drop", t0: w(129), extrude: true, extrudeColor: "#3a0004" },
      { text: "prompt.", font: "heavy", size: 110, x: 0.62, y: 0.48, in: "rise", t0: w(130), extrude: true },
      { text: "There", font: "conn", size: 60, x: 0.6, y: 0.66, in: "slide", t0: w(131) },
      { text: "NEVER", font: "emph", size: 185, x: 0.58, y: 0.86, color: PAL.red, fx: "decode", dur: 7, in: "fly", t0: w(132), extrude: true, extrudeColor: "#3a0004" },
      { text: "was.", font: "conn", size: 62, x: 0.815, y: 0.86, in: "drop", t0: w(133) },
    ],
    shake: [{ t: w(128), amp: 10 }],
  });
  trans.push({ at: S19, type: "glitch", pre: 2, post: 2 });
  cue(S19 - 0.07, "glitch", -12); cue(w(128) - F(1), "impact_slam", -10, 1.1); cue(w(132), "decode", -16);

  // ---------------- S20 a motion brain ----------------
  const S21 = w(142) - F(2);
  shots.push({
    id: "S20", t0: S20, t1: S21, set: "room",
    view: stageView(S20, 3, [SX - 22, 15, 31], [SX - 18, 14, 26], [SX - 6, 10, -2]),
    wchars: [heroStage([{ t: S20, pose: "idle", expr: "determined" }, { t: w(139), pose: "pointUp", expr: "happy", mouth: "smile" }])],
    tcam: camPath([{ t: S20, py: 70, yaw: 3 }, { t: w(139) - 0.2, d: 0.45, py: -90, yaw: -5, dolly: 0.05 }], 0.012), couple: 0.008,
    props: [prop({ name: "brain", x: 0.31, y: 0.24, px: 13, t0: w(141), phase: 0.5 }), prop({ name: "spark", x: 0.24, y: 0.16, px: 8, t0: w(141) + 0.1, phase: 1 }), prop({ name: "spark", x: 0.4, y: 0.32, px: 6, t0: w(141) + 0.18, phase: 2 })],
    texts: [
      ...row(0.55, 0.17, 60, "conn", [{ text: "What", t0: w(134) }, { text: "Ikhsan", font: "content", size: 84, color: PAL.red, t0: w(135) }], { in: "slide" }),
      ...row(0.55, 0.29, 84, "content", [{ text: "built", t0: w(136) }, { text: "is better:", font: "conn", size: 60, t0: w(137) }], { in: "slide" }),
      { text: "a motion", font: "conn", size: 66, x: 0.56, y: 0.64, in: "slide", t0: w(139) },
      { text: "brain.", font: "emph", size: 250, x: 0.55, y: 0.87, grad: "pink", in: "slam", t0: w(141), extrude: true, extrudeColor: "#5a1030" },
    ],
  });
  trans.push({ at: S20, type: "mosaic", pre: 3, post: 4, partial: 0.5, seed: 20, inF: 3, hold: 1, outF: 3 });
  cue(S20 - F(2), "mosaic_crunch", -17, 1.1); cue(w(141), "pixel_burst", -15, 1.2);

  // ---------------- S21 not just a prompt, a full library ----------------
  const S22 = w(153) - F(2);
  const flyBook = (name, x, y, t0, px = 10) => prop({ name, x, y, px, t0, phase: x * 7 });
  shots.push({
    id: "S21", t0: S21, t1: S22, set: "room",
    view: stageView(S21, 3, [SX + 28, 17, 36], [SX + 24, 16, 31], [SX + 2, 8, -3]),
    wchars: [cubeStage([{ t: S21, look: -1 }, { t: w(152), expr: "happy", hop: 1, burst: false }])],
    tcam: camPath([{ t: S21, py: 80, yaw: -3 }, { t: w(149) - 0.15, d: 0.45, py: -120, px: 60, yaw: 5, dolly: 0.05 }], 0.012), couple: 0.008,
    props: [flyBook("book", 0.12, 0.32, w(150)), flyBook("bookT", 0.24, 0.22, w(151)), flyBook("book", 0.36, 0.34, w(151) + 0.12), flyBook("folder", 0.22, 0.5, w(152), 12), flyBook("bookT", 0.4, 0.56, w(152) + 0.1)],
    texts: [
      { text: "And honestly,", font: "conn", size: 60, x: 0.56, y: 0.14, in: "slide", t0: w(142) },
      ...row(0.56, 0.23, 60, "conn", [{ text: "it's", t0: w(144) }, { text: "not", font: "content", size: 74, color: PAL.red, t0: w(145) }, { text: "just a", t0: w(146) }], { in: "slide" }),
      { text: "prompt.", font: "heavy", size: 112, x: 0.56, y: 0.37, in: "rise", t0: w(148), extrude: true },
      panel({ x: 0.552, y: 0.338, w: 430, h: 26, t0: w(149), in: "none", paint: strike({ t0: w(149) }) }),
      { text: "It's a full", font: "conn", size: 62, x: 0.56, y: 0.68, in: "slide", t0: w(149) },
      { text: "LIBRARY.", font: "emph", size: 230, x: 0.55, y: 0.89, grad: "hot", in: "slam", t0: w(152), extrude: true, extrudeColor: "#4a1404" },
    ],
    shake: [{ t: w(152), amp: 12 }],
  });
  trans.push({ at: S21, type: "flash", pre: 0, post: 2 });
  cue(w(149), "typo_marker_swipe", -16, 0.8); cue(w(150), "card_flutter", -17, 1.2); cue(w(152) - F(1), "impact_slam", -9);

  // ---------------- S22 the docs ARE the skill ----------------
  const S23 = w(159) - F(2);
  shots.push({
    id: "S22", t0: S22, t1: S23,
    bg: (g, t) => blackSoft(g, t, "rgba(70,30,10,0.4)"),
    extra: (g, t, P) => { if (t >= w(156)) { const [x, y] = P(0.4, 0.58); embers(g, t, w(156), { n: 70, cx: x / W, cy: y / H, spread: 0.25, rgb: "25,195,181" }); } },
    tcam: camPath([{ t: S22, py: 70, yaw: -3 }, { t: w(156) - 0.15, d: 0.4, py: -60, yaw: 4, dolly: 0.05 }], 0.014),
    chars: [{ kind: "cube", x: 0.78, y: 0.93, z: 40, px: 15, keys: [{ t: S22 }, { t: w(156), expr: "happy", hop: 1, burst: false }] }],
    texts: [
      { text: "Because", font: "conn", size: 62, x: 0.16, y: 0.25, in: "slide", t0: w(153) },
      { text: "the docs...", font: "heavy", size: 132, x: 0.15, y: 0.4, in: "fly", t0: w(154), extrude: true },
      { text: "ARE", font: "emph", size: 240, x: 0.3, y: 0.67, color: PAL.red, in: "slam", t0: w(156), extrude: true, extrudeColor: "#3a0004" },
      { text: "the skill.", font: "heavy", size: 132, x: 0.18, y: 0.87, in: "rise", t0: w(157), extrude: true },
    ],
    shake: [{ t: w(156), amp: 12 }],
  });
  trans.push({ at: S22, type: "glitch", pre: 2, post: 2 });
  cue(S22 - 0.07, "glitch", -14, 1.1); cue(w(156) - F(1), "impact_slam", -8, 1.05); cue(w(156), "pixel_burst", -17, 1.3);

  // ---------------- S23 twelve categories ... motion designer and editor (truck right) ----------------
  const S24 = w(173) - F(2);
  shots.push({
    id: "S23", t0: S23, t1: S24,
    bg: (g, t) => gridVoid(g, t, { horizon: 0.62, speed: 30 }),
    tcam: camPath([{ t: S23, px: 0, yaw: -4 }, { t: w(164) - 0.22, d: 0.55, px: 1000, yaw: 8, roll: 1.5, dolly: 0.03 }], 0.01),
    chars: [{ kind: "cube", x: 0.8, y: 0.86, z: -60, px: 12, keys: [{ t: S23 }, { t: w(163), expr: "happy", hop: 1, burst: false }, { t: w(169), expr: "surprised", burst: false }] }],
    props: [prop({ name: "bulb", x: 0.72, y: 0.36, px: 9, t0: w(165), phase: 0 }), prop({ name: "palette", x: 0.92, y: 0.3, px: 8, t0: w(168), phase: 1 }), prop({ name: "film", x: 0.98, y: 0.52, px: 8, t0: w(172), phase: 2 })],
    texts: [
      panel({ x: 0.06, y: 0.33, w: 420, h: 250, t0: w(159) - 0.05, in: "fly", paint: counter({ t0: w(159), dur: 0.7, to: 12, size: 240 }) }),
      { text: "categories", font: "heavy", size: 110, x: 0.06, y: 0.55, in: "slide", t0: w(160), extrude: true },
      ...row(0.06, 0.65, 60, "conn", [{ text: "that teach", t0: w(161) }, { text: "Claude", font: "content", size: 80, color: PAL.teal, t0: w(163) }], { in: "slide" }),
      ...row(1.06, 0.3, 60, "conn", [{ text: "to", t0: w(164) }, { text: "think", font: "brush", size: 100, t0: w(165) }, { text: "like a", t0: w(166) }], { in: "slide" }),
      { text: "real", font: "conn", size: 60, x: 1.06, y: 0.4, in: "drop", t0: w(168) },
      { text: "MOTION", font: "emph", size: 175, x: 1.06, y: 0.57, color: PAL.red, in: "slam", t0: w(169), extrude: true, extrudeColor: "#3a0004" },
      { text: "designer...", font: "heavy", size: 112, x: 1.06, y: 0.71, in: "rise", t0: w(170), extrude: true },
      ...row(1.06, 0.82, 64, "conn", [{ text: "and", t0: w(171) }, { text: "editor.", font: "heavy", size: 100, color: PAL.teal, t0: w(172), in: "fly" }], { in: "slide" }),
    ],
  });
  trans.push({ at: S23, type: "flash", pre: 0, post: 2 });
  for (let i = 0; i < 6; i++) cue(w(159) + i * 0.09, "tick", -26, 0.9 + i * 0.05);
  cue(w(164) - 0.22, "whoosh_whip", -17, 1.15); cue(w(169) - F(1), "impact_slam", -13, 1.2);

  // ---------------- S24 six categories on a lateral truck ----------------
  const S25 = w(179) - F(2);
  const CATS = [["note", "Choreography."], ["ball", "Physics."], ["orb", "Shaders."], ["aa", "Typography."], ["wave", "Sound."], ["film", "Rendering."]];
  const STEP = 0.42;
  const truck = camPath([{ t: S24, px: -40, yaw: -3, py: 20 }, ...CATS.slice(1).map((_, i) => ({ t: w(174 + i) - 0.3, d: 0.55, px: (i + 1) * STEP * W - 40, yaw: (i % 2 ? -3 : 3), roll: (i % 2 ? 1 : -1) }))], 0.008);
  shots.push({
    id: "S24", t0: S24, t1: S25,
    bg: (g, t) => gridVoid(g, t, { horizon: 0.7, speed: 120 }),
    tcam: truck,
    chars: [{ kind: "cube", x: (t) => 0.5 + truck(t).px / W - 0.05, y: 0.93, z: 60, px: 9, keys: [{ t: S24 }, ...CATS.map((_, i) => ({ t: w(173 + i), hop: 1, expr: "happy", burst: false }))] }],
    texts: CATS.flatMap(([icon, label], i) => [
      panel({ x: 0.36 + i * STEP, y: 0.42, w: 300, h: 300, t0: w(173 + i) - 0.06, ry: (i % 2 ? -10 : 10), paint: tile({ icon }) }),
      { text: label, font: "heavy", size: 72, x: 0.36 + i * STEP, y: 0.7, color: i % 2 ? PAL.teal : "#ffffff", in: "rise", t0: w(173 + i), extrude: true },
    ]),
  });
  trans.push({ at: S24, type: "mosaic", pre: 5, post: 6, seed: 24 });
  cue(S24 - F(4), "mosaic_crunch", -13);
  CATS.slice(1).forEach((_, i) => cue(w(174 + i) - 0.3, "whoosh_short", -20, 0.9 + i * 0.05));

  // ---------------- S25 not a prompt, a whole studio in one folder ----------------
  const S26 = w(188) - F(3);
  shots.push({
    id: "S25", t0: S25, t1: S26, set: "room",
    view: stageView(S25, 3.5, [SX + 20, 23, 54], [SX + 12, 20, 45]),
    wchars: [heroStage([{ t: S25, pose: "hold" }, { t: w(184), pose: "celebrate" }]), cubeStage([{ t: S25 }, { t: w(184), expr: "happy", hop: 1, burst: false }])],
    tcam: camPath([{ t: S25, py: 80, yaw: -4 }, { t: w(182) - 0.15, d: 0.45, py: -110, yaw: 6, dolly: 0.05 }], 0.012), couple: 0.008,
    props: [prop({ name: "folder", x: 0.36, y: 0.3, px: 11, t0: w(186), phase: 0.4 })],
    texts: [
      { text: "Not a", font: "conn", size: 62, x: 0.58, y: 0.16, in: "slide", t0: w(179) },
      { text: "prompt.", font: "heavy", size: 112, x: 0.58, y: 0.3, in: "rise", t0: w(181), extrude: true },
      panel({ x: 0.572, y: 0.268, w: 430, h: 26, t0: w(182), in: "none", paint: strike({ t0: w(182) }) }),
      { text: "A whole", font: "conn", size: 64, x: 0.58, y: 0.6, in: "slide", t0: w(182) },
      { text: "STUDIO,", font: "emph", size: 220, x: 0.57, y: 0.8, color: PAL.red, in: "slam", t0: w(184), extrude: true, extrudeColor: "#3a0004" },
      ...row(0.58, 0.92, 60, "conn", [{ text: "in", t0: w(185) }, { text: "one", font: "content", size: 76, color: PAL.teal, fx: "decode", dur: 6, t0: w(186) }, { text: "folder.", font: "heavy", size: 100, t0: w(187) }], { in: "slide" }),
    ],
    shake: [{ t: w(184), amp: 10 }],
  });
  trans.push({ at: S25, type: "flash", pre: 0, post: 2 });
  cue(w(182), "typo_marker_swipe", -16, 0.85); cue(w(184) - F(1), "impact_slam", -9, 1.1);

  // ---------------- S26 here's the part nobody tells you ----------------
  const S27 = w(194) - F(2);
  shots.push({
    id: "S26", t0: S26, t1: S27,
    bg: (g, t) => blackSoft(g, t, "rgba(60,14,10,0.45)"),
    tcam: camPath([{ t: S26, py: 40, yaw: -3 }, { t: w(191) - 0.1, d: 0.3, dolly: 0.08, yaw: 3, ease: ease.outCubic }], 0.012),
    chars: [{ kind: "cube", x: 0.76, y: 0.96, z: 40, px: 17, keys: [{ t: S26, look: -1 }, { t: w(191), expr: "surprised" }] }],
    texts: [
      { text: "Here's the", font: "conn", size: 66, x: 0.08, y: 0.3, fx: "decode", binary: true, dur: 6, in: "none", t0: w(188) },
      { text: "part", font: "heavy", size: 120, x: 0.27, y: 0.31, in: "drop", t0: w(190), extrude: true },
      { text: "NOBODY", font: "emph", size: 270, x: 0.07, y: 0.64, color: PAL.red, in: "slam", t0: w(191), extrude: true, extrudeColor: "#3a0004" },
      { text: "tells you.", font: "conn", size: 66, x: 0.08, y: 0.76, in: "slide", t0: w(192) },
    ],
    shake: [{ t: w(191), amp: 16 }],
    post: (t) => { const k = (t - w(191)) * FPS; const o = {}; if (k >= 0 && k < 1) o.flash = 0.5; if (k >= 0 && k < 8) o.ca = 0.012 * (1 - k / 8); return o; },
  });
  trans.push({ at: S26, type: "mosaic", pre: 5, post: 6, seed: 26 });
  cue(S26 - F(4), "mosaic_crunch", -12); cue(w(191) - F(2), "impact_slam", -8);

  // ---------------- S27 to build this, Ikhsan directed every detail himself ----------------
  const S28a = w(202) - F(2);
  shots.push({
    id: "S27", t0: S27, t1: S28a, set: "room",
    view: view(S27, 3.5, [-30, 21, 25], [-25, 19.5, 20.5], [-2, 15, -2], { focusDist: 30, aperture: 0.0022 }),
    ui: (g, t) => codeUI(g, t, S27 - 10, { cps: 40 }),
    wchars: [hero([-15, 0.2, 7], [{ t: S27, pose: "idle", expr: "determined" }, { t: w(198), pose: "clap", expr: "determined" }], 0.22), cube([10, 10.6, 1], [{ t: S27 }], 0.17)],
    tcam: camPath([{ t: S27, py: 80, yaw: -3 }, { t: w(199) - 0.15, d: 0.45, py: -100, yaw: 5, dolly: 0.04 }], 0.012), couple: 0.008,
    extra: (g) => darkLeft(g),
    texts: [
      { text: "To build this,", font: "conn", size: 62, x: 0.08, y: 0.12, in: "slide", t0: w(194) },
      { text: "IKHSAN", font: "emph", size: 205, x: 0.085, y: 0.32, color: PAL.red, in: "slam", t0: w(197), extrude: true, extrudeColor: "#3a0004" },
      { text: "directed", font: "content", size: 86, x: 0.085, y: 0.44, in: "slide", t0: w(198) },
      ...row(0.085, 0.66, 92, "content", [{ text: "every", t0: w(199) }, { text: "detail", font: "brush", size: 150, color: PAL.red, fx: "wipe", in: "none", t0: w(200) }], { in: "slide" }),
      { text: "himself.", font: "content", size: 86, x: 0.085, y: 0.8, in: "rise", t0: w(201) },
    ],
    shake: [{ t: w(197), amp: 10 }],
  });
  trans.push({ at: S27, type: "flash", pre: 0, post: 2 });
  cue(w(197) - F(1), "impact_slam", -10, 1.15);

  // ---------------- S28 every library / rule / fix (three quick cuts) ----------------
  const S28b = w(204) - F(2), S28c = w(206) - F(2), S29 = w(208) - F(2);
  shots.push({
    id: "S28a", t0: S28a, t1: S28b, set: "room",
    view: view(S28a, 1.2, [4, 21, 15], [3, 20.6, 12.5], [0, 20, -3], { focusDist: 15.5, aperture: 0.003 }),
    ui: (g, t) => codeUI(g, t, S28a - 10, { cps: 40 }),
    tcam: camPath([{ t: S28a, yaw: -3, dolly: 0 }], 0.03),
    texts: [{ text: "Every", font: "conn", size: 74, x: 0.6, y: 0.3, in: "slide", t0: w(202) },
      { text: "LIBRARY.", font: "emph", size: 190, x: 0.58, y: 0.52, color: PAL.red, in: "slam", t0: w(203), extrude: true, extrudeColor: "#3a0004" }],
  });
  shots.push({
    id: "S28b", t0: S28b, t1: S28c, set: "room",
    view: stageView(S28b, 1.3, [SX - 18, 13, 22], [SX - 17, 12.6, 19.5], [SX - 1, 10, 0]),
    wchars: [heroStage([{ t: S28b, pose: "think" }])],
    tcam: camPath([{ t: S28b, yaw: 3, dolly: 0 }], 0.03),
    texts: [{ text: "Every", font: "conn", size: 74, x: 0.56, y: 0.3, in: "slide", t0: w(204) },
      { text: "RULE.", font: "emph", size: 230, x: 0.55, y: 0.55, color: PAL.red, in: "slam", t0: w(205), extrude: true, extrudeColor: "#3a0004" }],
  });
  shots.push({
    id: "S28c", t0: S28c, t1: S29, set: "room",
    view: stageView(S28c, 1.2, [SX + 12, 7, 18], [SX + 11, 6.6, 15.5], [SX + 7, 3.5, 1]),
    wchars: [cubeStage([{ t: S28c, expr: "happy" }])],
    props: [prop({ name: "wrench", x: 0.62, y: 0.44, px: 13, t0: w(207) - 0.05, phase: 0.2, wobble: 0.3 }), prop({ name: "spark", x: 0.7, y: 0.32, px: 7, t0: w(207), phase: 1.4 })],
    tcam: camPath([{ t: S28c, yaw: -3, dolly: 0 }], 0.035),
    texts: [{ text: "Every", font: "conn", size: 74, x: 0.1, y: 0.3, in: "slide", t0: w(206) },
      { text: "FIX.", font: "emph", size: 270, x: 0.09, y: 0.62, in: "slam", t0: w(207), extrude: true, extrudeColor: "#2a0a06", glow: "rgba(255,255,255,0.45)" }],
    shake: [{ t: w(207), amp: 12 }],
  });
  trans.push({ at: S28a, type: "flash", pre: 0, post: 2 }, { at: S28b, type: "flash", pre: 0, post: 2 }, { at: S28c, type: "flash", pre: 0, post: 2 });
  cue(w(203) - F(1), "impact_slam", -12, 1.25); cue(w(205) - F(1), "impact_slam", -11, 1.15); cue(w(207) - F(1), "impact_slam", -8, 1.0); cue(w(207), "pixel_burst", -16, 1.3);

  // ---------------- S29 make it smoother / lower that whoosh / hold the ending ----------------
  const S30 = w(220) - F(2);
  const ph = { smooth: w(210), lower: w(213), hold: w(219) };
  shots.push({
    id: "S29", t0: S29, t1: S30, set: "room",
    view: view(S29, 4.5, [2, 21.2, 25], [1, 20.8, 21.5], [0, 20, -3], { focusDist: 23, aperture: 0.002 }),
    ui: (g, t) => editorUI(g, t, ph),
    tcam: camPath([{ t: S29, py: 40 }, { t: w(211) - 0.2, d: 0.45, py: -60, yaw: -4 }, { t: w(214) - 0.2, d: 0.45, py: -200, yaw: 4, dolly: 0.03 }], 0.01), couple: 0.006,
    extra: (g) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(6,3,2,0.55)"); gr.addColorStop(0.35, "rgba(6,3,2,0.15)"); gr.addColorStop(1, "rgba(6,3,2,0.55)"); g.fillStyle = gr; g.fillRect(0, 0, W, H); },
    texts: [
      { text: "Make it", font: "conn", size: 64, x: 0.04, y: 0.13, in: "slide", t0: w(208) },
      { text: "SMOOTHER.", font: "emph", size: 150, x: 0.04, y: 0.29, color: PAL.teal, fx: "decode", dur: 7, in: "fly", t0: w(210), extrude: true, extrudeColor: "#03211f" },
      { text: "Lower that", font: "conn", size: 64, x: 0.6, y: 0.6, in: "slide", t0: w(211) },
      { text: "WHOOSH.", font: "emph", size: 165, x: 0.6, y: 0.77, color: PAL.red, in: "slam", t0: w(213), extrude: true, extrudeColor: "#3a0004" },
      { text: "Hold the ending", font: "conn", size: 64, x: 0.085, y: 0.86, in: "slide", t0: w(214) },
      { text: "one beat", font: "content", size: 84, x: 0.085, y: 0.96, in: "drop", t0: w(217) },
      { text: "LONGER.", font: "emph", size: 190, x: 0.37, y: 0.99, grad: "hot", in: "slam", t0: w(219), extrude: true, extrudeColor: "#4a1404" },
    ],
  });
  trans.push({ at: S29, type: "flash", pre: 0, post: 2 });
  cue(w(211) - 0.2, "whoosh_whip", -18, 1.1); cue(w(213) - F(1), "impact_slam", -12, 1.2); cue(w(213), "whoosh_short", -15, 0.7);
  cue(w(214) - 0.2, "whoosh_whip", -18, 1.05); cue(w(219) - F(1), "impact_slam", -10);

  // ---------------- S30 all of that lives inside the formula ----------------
  const S31 = w(228) - F(3);
  const into = [["book", 0.92, 0.1], ["bulb", 0.96, 0.82], ["wrench", 0.62, 0.04], ["brain", 0.05, 0.12], ["note", 0.1, 0.92], ["palette", 0.72, 0.96], ["film", 0.98, 0.45]];
  const FX = 0.27, FY = 0.55;
  shots.push({
    id: "S30", t0: S30, t1: S31, set: "room",
    view: stageView(S30, 3, [SX - 4, 20, 50], [SX - 2, 18.5, 43]),
    wchars: [heroStage([{ t: S30, pose: "present", expr: "happy" }]), cubeStage([{ t: S30 }, { t: w(225), expr: "happy", hop: 1, burst: false }])],
    extra: (g) => { g.fillStyle = "rgba(5,3,2,0.35)"; g.fillRect(0, 0, W, H); },
    tcam: camPath([{ t: S30, yaw: -3, py: 20 }, { t: w(225) - 0.1, d: 0.3, dolly: 0.06, yaw: 3, ease: ease.outCubic }], 0.012), couple: 0.006,
    props: [
      prop({ name: "folder", x: FX, y: FY, px: 20, t0: S30 + 0.05, z: 80, phase: 0 }),
      ...into.map(([name, x0, y0], i) => {
        const ta = w(221) + i * 0.13, tb = ta + 0.5;
        return prop({ name, t0: ta, t1: tb, z: 120, phase: i, wobble: 0.4,
          x: (t) => lerp(x0, FX, ease.inCubic(clamp((t - ta) / (tb - ta)))), y: (t) => lerp(y0, FY, ease.inCubic(clamp((t - ta) / (tb - ta)))),
          px: (t) => 9 * (1 - 0.8 * ease.inCubic(clamp((t - ta) / (tb - ta)))) });
      }),
    ],
    texts: [
      { text: "Now all of that", font: "conn", size: 64, x: 0.56, y: 0.17, in: "slide", t0: w(220) },
      { text: "lives", font: "content", size: 88, x: 0.56, y: 0.3, in: "drop", t0: w(224) },
      { text: "INSIDE", font: "emph", size: 240, x: 0.55, y: 0.54, color: PAL.red, in: "slam", t0: w(225), extrude: true, extrudeColor: "#3a0004" },
      { text: "the formula.", font: "brush", size: 130, x: 0.58, y: 0.7, fx: "wipe", in: "none", t0: w(226) },
    ],
    shake: [{ t: w(225), amp: 12 }],
  });
  trans.push({ at: S30, type: "flash", pre: 0, post: 2 });
  into.forEach((_, i) => cue(w(221) + i * 0.13 + 0.45, "pop", -22, 0.8 + i * 0.07));
  cue(w(225) - F(1), "impact_slam", -9);

  // ---------------- S31 the formula is the framework / heavy lifting / the rest? ----------------
  const SMASH = w(240) - F(1);
  const fw = { tStatic: w(230), tBars: w(232) };
  const fwScene = (t0) => ({
    bg: (g, t) => gridVoid(g, t, { horizon: 0.74, speed: 20 }),
    chars: [{ kind: "hero", x: 0.16, y: 0.94, z: 30, px: 7, keys: [{ t: t0, pose: "present", expr: "happy", mouth: "smile" }] }, { kind: "cube", x: 0.84, y: 0.93, z: 30, px: 6, keys: [{ t: t0, look: -1 }] }],
  });
  shots.push({
    id: "S31", t0: S31, t1: SMASH, ...fwScene(S31),
    tcam: camPath([{ t: S31, py: 40, yaw: -3 }, { t: w(233) - 0.15, d: 0.45, py: -40, yaw: 3, dolly: 0.03 }, { t: w(238) - 0.15, d: 0.4, px: 160, py: 40, yaw: -5 }], 0.012),
    texts: [
      panel({ x: 0.27, y: 0.5, w: 880, h: 520, ry: -10, rx: 4, t0: S31 + 0.05, paint: framework(fw) }),
      { text: "The formula is the", font: "conn", size: 58, x: 0.27, y: 0.12, in: "slide", t0: w(228) },
      { text: "framework.", font: "heavy", size: 92, x: 0.555, y: 0.12, fx: "pop", colors: ["#e3262f", "#efe3c8", "#19C3B5", "#f5c518", "#e3262f", "#efe3c8", "#19C3B5", "#f5c518", "#e3262f", "#efe3c8"], in: "none", t0: w(232) },
      { text: "It does the", font: "conn", size: 58, x: 0.27, y: 0.875, in: "slide", t0: w(233) },
      { text: "heavy lifting.", font: "heavy", size: 84, x: 0.43, y: 0.875, grad: "hot", in: "rise", t0: w(236), extrude: true },
      panel({ x: 0.27, y: 0.935, w: 880, h: 30, t0: w(236), in: "none", paint: progress({ t0: w(236), dur: 1.1, to: 0.86 }) }),
      { text: "The rest?", font: "heavy", size: 96, x: 0.76, y: 0.3, in: "fly", t0: w(238), extrude: true },
    ],
  });
  trans.push({ at: S31, type: "mosaic", pre: 5, post: 6, seed: 31 });
  cue(S31 - F(4), "mosaic_crunch", -13); cue(w(230), "glitch", -20, 0.6); cue(w(232), "pixel_burst", -16, 1.1); cue(w(236), "riser_soft", -22);

  // ---------------- S32 smash zoom: that's YOU ----------------
  const S33 = w(242) - F(2);
  shots.push({
    id: "S32", t0: SMASH, t1: S33,
    bg: (g) => { const gr = g.createRadialGradient(W * 0.3, H * 0.5, 50, W * 0.3, H * 0.5, W * 0.8); gr.addColorStop(0, "#0e5c56"); gr.addColorStop(1, "#03100f"); g.fillStyle = gr; g.fillRect(0, 0, W, H); },
    tcam: camPath([{ t: SMASH, dolly: 0.02, yaw: 3 }], 0.04),
    shake: [{ t: w(241), amp: 18 }],
    chars: [{ kind: "hero", x: 0.29, y: 1.56, z: -60, px: 26, keys: [{ t: SMASH, pose: "point", expr: "happy", mouth: "smile" }] }],
    texts: [
      { text: "That's", font: "conn", size: 76, x: 0.6, y: 0.34, in: "slide", t0: w(240) },
      { text: "YOU.", font: "emph", size: 340, x: 0.56, y: 0.72, color: "#FFD60A", in: "slam", t0: w(241), extrude: true, extrudeColor: "#3a2a00", glow: "rgba(255,214,10,0.45)" },
    ],
    post: (t) => { const k = (t - w(241)) * FPS; const o = {}; if (k >= 0 && k < 1) o.flash = 0.5; if (k >= 0 && k < 8) o.ca = 0.012 * (1 - k / 8); return o; },
  });
  trans.push({ at: SMASH, type: "smash", pre: 6, post: 2, cx: 0.2, cy: 0.85 });
  cue(SMASH - F(6), "whoosh_whip", -10, 0.9); cue(w(241) - F(1), "impact_slam", -4, 0.95);

  // ---------------- S33 your idea / taste / theme ----------------
  const S34a = w(248) - F(2);
  shots.push({
    id: "S33", t0: S33, t1: S34a, ...fwScene(S33),
    tcam: camPath([{ t: S33, px: -120, yaw: -4, dolly: 0.02 }, { t: w(244) - 0.2, d: 0.4, px: 40, yaw: 1 }, { t: w(246) - 0.2, d: 0.4, px: 200, yaw: 5 }], 0.012),
    props: [prop({ name: "bulb", x: 0.16, y: 0.24, px: 8, t0: w(243) }), prop({ name: "palette", x: 0.47, y: 0.24, px: 8, t0: w(245), phase: 1 }), prop({ name: "film", x: 0.8, y: 0.24, px: 8, t0: w(247), phase: 2 })],
    texts: [
      panel({ x: 0.27, y: 0.6, w: 880, h: 520, ry: -10, rx: 4, t0: S33, in: "none", static: false, paint: framework({ tStatic: 0, tBars: 0 }) }),
      ...row(0.05, 0.18, 58, "conn", [{ text: "Your", t0: w(242) }, { text: "idea.", font: "heavy", size: 92, color: PAL.teal, t0: w(243), in: "fly" }], { in: "slide" }),
      ...row(0.37, 0.18, 58, "conn", [{ text: "Your", t0: w(244) }, { text: "taste.", font: "brush", size: 120, t0: w(245), fx: "wipe", in: "none" }], { in: "slide" }),
      ...row(0.68, 0.18, 58, "conn", [{ text: "Your", t0: w(246) }, { text: "theme.", font: "emph", size: 124, color: PAL.red, t0: w(247), in: "slam" }], { in: "slide" }),
    ],
  });
  trans.push({ at: S33, type: "flash", pre: 0, post: 2 });

  // ---------------- S34 football / fashion / science / food / anything ----------------
  const tS = [w(248) - F(2), w(249) - F(2), w(250) - F(2), w(251) - F(2), w(252) - F(2)], S35 = w(253) - F(3);
  const TH = [["football", "FOOTBALL.", { font: "emph", size: 250, in: "slam", extrude: true, extrudeColor: "#06200c" }],
    ["fashion", "FASHION.", { font: "heavyI", size: 210, in: "whip", dir: -1, extrude: true, extrudeColor: "#3a0a22" }],
    ["science", "SCIENCE.", { font: "emph", size: 240, color: "#dffff9", fx: "decode", dur: 6, in: "fly", extrude: true, extrudeColor: "#03211f" }],
    ["food", "FOOD.", { font: "heavy", size: 270, grad: "hot", fx: "pop", in: "none", extrude: true, extrudeColor: "#4a1404" }]];
  TH.forEach(([kind, label, st], i) => {
    shots.push({
      id: "S34" + "abcd"[i], t0: tS[i], t1: tS[i + 1],
      bg: (g, t) => themeBg(g, t, kind, tS[i]),
      tcam: camPath([{ t: tS[i], dolly: 0, yaw: i % 2 ? 4 : -4, roll: i % 2 ? -1.5 : 1.5 }], 0.06),
      texts: [{ text: label, x: 0.1, y: 0.56, z: 80, ry: i % 2 ? -10 : 10, t0: w(248 + i), ...st }],
      shake: [{ t: w(248 + i), amp: 8 }],
    });
    trans.push({ at: tS[i], type: "flash", pre: 0, post: 2 });
    cue(w(248 + i) - F(1), i === 0 ? "impact_slam" : "pixel_burst", i === 0 ? -15 : -17, 1.1 + i * 0.05);
  });
  shots.push({
    id: "S34e", t0: tS[4], t1: S35,
    bg: (g, t) => blackSoft(g, t, "rgba(80,40,10,0.35)"),
    tcam: camPath([{ t: tS[4], dolly: 0, yaw: -5 }, { t: w(252) + 0.02, d: 0.3, dolly: 0.08, yaw: 4, ease: ease.outCubic }], 0.03),
    shake: [{ t: w(252), amp: 18 }],
    texts: [
      ...cards.map(([kind, label, x, y, ry], i) => panel({ x, y, z: -280, ry, w: 600, h: 338, t0: tS[4] + i * 0.04, paint: themeCard({ kind, label, t0: tS[4] }) })),
      { text: "ANYTHING.", font: "emph", size: 300, x: 0.5, align: "center", y: 0.64, z: 200, in: "slam", t0: w(252), extrude: true, extrudeColor: "#2a0a06", glow: "rgba(255,255,255,0.4)" },
    ],
    post: (t) => { const k = (t - w(252)) * FPS; const o = {}; if (k >= 0 && k < 2) o.flash = k < 1 ? 0.7 : 0.35; if (k >= 0 && k < 10) o.ca = 0.014 * (1 - k / 10); return o; },
  });
  trans.push({ at: tS[4], type: "flash", pre: 0, post: 2 });
  cue(w(252) - F(2), "impact_slam", -7); cue(w(252), "card_flutter", -14, 1.2);

  // ---------------- S35 he did the hard part ----------------
  const S36 = w(263) - F(3);
  shots.push({
    id: "S35", t0: S35, t1: S36, set: "room",
    view: stageView(S35, 3, [SX - 18, 22, 52], [SX - 10, 20, 44]),
    wchars: [heroStage([{ t: S35, pose: "celebrate", expr: "happy", mouth: "smile" }]), cubeStage([{ t: S35, expr: "happy" }, { t: w(258), expr: "happy", hop: 1, burst: false }])],
    tcam: camPath([{ t: S35, py: 80, yaw: 3 }, { t: w(258) - 0.2, d: 0.45, py: -100, yaw: -5, dolly: 0.05 }], 0.012), couple: 0.008,
    texts: [
      { text: "He did the", font: "conn", size: 64, x: 0.56, y: 0.16, in: "slide", t0: w(253) },
      { text: "hard part,", font: "brush", size: 170, x: 0.56, y: 0.37, color: PAL.red, fx: "wipe", in: "none", t0: w(256) },
      { text: "so you don't", font: "conn", size: 64, x: 0.56, y: 0.62, in: "slide", t0: w(258) },
      { text: "have to.", font: "heavy", size: 124, x: 0.56, y: 0.79, in: "rise", t0: w(261), extrude: true },
    ],
  });
  trans.push({ at: S35, type: "mosaic", pre: 5, post: 6, seed: 35 });
  cue(S35 - F(4), "mosaic_crunch", -13);

  // ---------------- S36 CTA: comment MOTION ----------------
  const END = 120.5;
  shots.push({
    id: "S36", t0: S36, t1: END, set: "room",
    view: (t) => ({ pos: [SX - 37, 11, 37], look: [SX - 15, 8, 0], fov: 38, focusDist: 25, aperture: 0.006, maxblur: 0.026, exposure: 0.85 }),
    wchars: [hero([SX - 30, 0.5, 13], [{ t: S36, pose: "point", expr: "happy", mouth: "smile" }], 0.2), cube([SX - 25.5, 0.5, 16], [{ t: S36, look: 1 }, { t: w(264), expr: "happy", hop: 1, burst: false }], 0.15)],
    tcam: camPath([{ t: S36, dolly: 0, yaw: -2 }], 0.004),
    texts: [
      { text: "Comment", font: "heavy", size: 104, x: 0.53, y: 0.34, in: "slide", t0: w(263), extrude: true },
      { text: "MOTION", font: "emph", size: 230, x: 0.525, y: 0.58, color: PAL.teal, in: "slam", t0: w(264), extrude: true, extrudeColor: "#03211f", glow: "rgba(25,195,181,0.45)" },
      panel({ x: 0.53, y: 0.69, w: 760, h: 96, t0: w(264) + 0.05, paint: inputBar({ text: "MOTION", t0: w(264) + 0.25, cps: 8, sendAt: w(266) + 0.2, placeholder: "Add a comment..." }) }),
      { text: "and follow for part two", font: "conn", size: 42, x: 0.53, y: 0.8, fx: "type", cps: 30, in: "none", t0: w(265) },
      panel({ x: 0.6, y: 0.9, w: 640, h: 118, t0: w(269) + 0.45, in: "whip", dir: 1, paint: toast({ title: "Part 2 · the formula", sub: "follow so you don't miss it", icon: "film" }) }),
    ],
  });
  trans.push({ at: S36, type: "flash", pre: 0, post: 2 });
  cue(w(264) - F(1), "impact_slam", -12, 1.2); cue(w(264) + 0.25, "typing", -22, 1.1); cue(w(266) + 0.2, "ui_pop", -14); cue(w(269) + 0.45, "ui_pop", -12, 1.2);

  // music bed for the second half (drops to silence before punchlines, calm in the cosmos)
  bed.push(
    { t0: START, t1: w(82) - 0.15, kind: "lofi2" }, { t0: w(82), t1: w(106) - 0.1, kind: "lofi" },
    { t0: w(106), t1: S18a, kind: "storm" }, { t0: S18a, t1: S19, kind: "cosmic" },
    { t0: S19, t1: w(191) - 0.25, kind: "lofi2" }, { t0: w(191), t1: SMASH - 0.1, kind: "lofi" },
    { t0: w(241), t1: S36, kind: "lofi2" }, { t0: S36, t1: END, kind: "cta" },
  );
  return END;
}
