// Shot list. Every time is derived from a VO word (WORDS[i].start), never hand-typed seconds,
// so a re-cut VO moves the whole edit with it.
// Typography lives in 3D: blocks are tilted planes (ry/rx/rz), words sit at depths (z) and enter
// with fly/flip/rise/drop/swing springs; the type camera (tcam) dollies, orbits and rolls.
import { FPS, W, H, clamp, ease, lerp, spring, PAL, hash } from "./lib/util.js";
import { orangeBg, redBg, blackRing, desktop, profile, slopRibbon } from "./lib/bg2d.js";
import { chatUI, codeUI } from "./lib/ui.js";
import { dust, embers, shockwave } from "./lib/fx.js";
import { FONTS } from "./lib/text.js";
import { buildRest } from "./timeline2.js";

export function build(WORDS, measure, env = {}) {
  const w = (i) => WORDS[i].start, we = (i) => WORDS[i].end;
  const F = (n) => n / FPS;
  const shots = [], trans = [], cues = [], bed = [];
  const cue = (t, name, db = -14, rate = 1) => cues.push({ t, name, db, rate });
  const row = (x, y, size, font, parts, extra = {}) => {
    let cx = x * W;
    return parts.map((p) => {
      const it = { font, size, y, ...extra, ...p, x: cx / W };
      cx += measure(p.font || font, p.size || size, p.text) + (p.gap ?? (p.size || size) * 0.26);
      return it;
    });
  };
  const centerRow = (r) => { const l = r[r.length - 1]; const wT = l.x * W + measure(l.font, l.size, l.text) - r[0].x * W; const off = (W - wT) / 2 / W - r[0].x; r.forEach((it) => (it.x += off)); return r; };
  const K = (t, t0, d) => ease.inOutCubic(clamp((t - t0) / d));
  const camLerp = (t0, d, a, b) => (t) => { const k = K(t, t0, d); const o = {}; for (const key in a) o[key] = lerp(a[key], b[key], k); return o; };
  const prop = (o) => ({ kind: "prop", ...o });
  // AE-style camera travel: each phrase owns a place in 3D; when a phrase is done the camera moves
  // (pan + yaw/roll + dolly, inOutCubic) so the finished phrase recedes into perspective and the next
  // one is revealed. keys[0] = start state; key = { t (move start), d (s), ...state }. Slow drift on holds.
  const camPath = (keys, drift = 0.012) => {
    const F6 = ["px", "py", "yaw", "pitch", "roll", "dolly"];
    const fn = (t) => {
      const st = { px: 0, py: 0, yaw: 0, pitch: 0, roll: 0, dolly: 0, ...keys[0] };
      for (let i = 1; i < keys.length; i++) {
        const k = keys[i]; if (t < k.t) break;
        const e = (k.ease || ease.inOutCubic)(clamp((t - k.t) / (k.d ?? 0.5)));
        for (const f of F6) if (k[f] !== undefined) st[f] = lerp(st[f], k[f], e);
      }
      const dt = t - (keys[0].t ?? 0);
      st.dolly += dt * drift; st.yaw += Math.sin(dt * 0.8) * 0.8; st.roll += Math.sin(dt * 0.6 + 1) * 0.4;
      return st;
    };
    fn.moves = keys.slice(1).map((k) => [k.t, k.t + (k.d ?? 0.5)]);
    return fn;
  };

  // ---------------- S0 desktop hook ----------------
  const S0end = w(6) - F(1);
  shots.push({
    id: "S0", t0: 0, t1: S0end,
    bg: (g, t) => desktop(g, t),
    tcam: camPath([{ t: 0, py: 60, yaw: -5, roll: -1.5, pitch: 1 }, { t: w(2) - 0.12, d: 0.55, px: -60, yaw: 4, roll: 1 }, { t: w(5) - 0.14, d: 0.3, py: -110, pitch: 7, dolly: 0.08, ease: ease.outCubic }], 0.02),
    texts: [
      { text: "This", font: "heavy", size: 160, x: 0.125, y: 0.25, z: 140, ry: 16, rz: -4, fx: "smear", in: "slide", t0: w(0), extrude: true },
      { text: "video", font: "heavy", size: 160, x: 0.62, y: 0.27, z: 80, ry: -16, rz: 3, fx: "smear", in: "slide", dir: -1, t0: w(1), extrude: true },
      ...row(0.09, 0.405, 58, "conn", [{ text: "was", in: "drop", t0: w(2) }, { text: "made", font: "content", size: 80, in: "slide", t0: w(3) }, { text: "by", in: "swing", t0: w(4) }], { rz: -5, z: 60 }),
      { text: "AI.", crop: true, font: "emph", size: 600, x: 0.5, align: "center", y: 1.12, z: 220, rx: -14, color: PAL.red, in: "slam", t0: w(5), extrude: true, extrudeColor: "#4a0006" },
    ],
    post: (t) => {
      const f = Math.floor(t * FPS);
      const mode = f < 4 ? 2 : f < 8 ? 3 : f < 11 ? 5 : 0;
      const k = (t - w(5)) * FPS;
      return { mode, ca: k >= 0 && k < 8 ? 0.012 * (1 - k / 8) : undefined, flash: k >= 0 && k < 2 ? 0.35 : 0 };
    },
    shake: [{ t: w(5), amp: 12 }],
  });
  cue(0.0, "glitch", -17); cue(w(0) - 0.03, "whoosh_short", -20); cue(w(1) - 0.03, "whoosh_short", -21, 1.12);
  cue(w(3), "tick", -22); cue(w(5), "impact_slam", -9, 1.08);

  // ---------------- S1 creator grid (any theme) ----------------
  shots.push({
    id: "S1", t0: S0end, t1: w(7),
    bg: (g, t) => profile(g, t, { t0: S0end }),
    bgZoom: (t) => (t - S0end) * 0.1,
    tcam: camLerp(S0end, 0.4, { dolly: 0, yaw: 3, roll: 1 }, { dolly: 0.08, yaw: -2, roll: -0.5 }),
    texts: [{ text: "And", font: "heavy", size: 100, x: 0.77, y: 0.21, z: 110, ry: -18, in: "fly", t0: w(6), extrude: true }],
  });
  trans.push({ at: w(7), type: "halftone", pre: 3, post: 4 });
  cue(w(6), "tick", -20); cue(w(7) - F(3), "pixel_burst", -15);

  // ---------------- S2 orange -> red slam (one comp, background swaps on the hit) ----------------
  const SLAM = w(15);
  const A = { x: 0.6, y: 0.55, z: 70, rx: 5, ry: -18, rz: -5 }; // tilted plane for the first phrase
  const B = { x: 0.09, y: 0.6, z: 0, rx: 0, ry: 14, rz: -3 };
  const C = { x: 0.8, y: 0.55, z: 50, rx: 3, ry: -12, rz: -3 };
  const exitA = w(14);
  shots.push({
    id: "S2", t0: w(7), t1: we(16) + 0.17,
    bg: (g, t) => { if (t < SLAM) { orangeBg(g, t); dust(g, t, { n: 80, color: "255,215,170" }); } else { redBg(g, t); dust(g, t, { n: 60, color: "255,170,160" }); } },
    extra: (g, t, P) => { const [x, y] = P(0.36, 0.855); shockwave(g, t, SLAM + F(2), x / W, y / H, { r: 360, color: "rgba(255,150,140,1)" }); },
    tcam: camPath([{ t: w(7), px: 60, yaw: -3, roll: -1.5 },
      { t: we(11) + 0.02, d: 0.5, px: -330, yaw: -20, roll: -3, pitch: 2, dolly: 0.03 },
      { t: SLAM - F(3), d: 0.34, px: 190, yaw: 16, roll: 2.5, pitch: -1, dolly: 0.1, ease: ease.outCubic }], 0.015),
    shake: [{ t: SLAM, amp: 22 }],
    chars: [{ kind: "hero", x: 0.36, y: 0.86, z: 0, px: 8.6, burstIn: true, t0: w(7),
      keys: [{ t: w(7), pose: "idle" }, { t: w(8), pose: "point" }, { t: w(10), pose: "present" }, { t: w(12), pose: "think" }, { t: SLAM, pose: "fall" }] }],
    props: [
      prop({ name: "qmark", x: 0.2, y: 0.25, px: 10, t0: w(12) + F(1), t1: SLAM, phase: 0 }),
      prop({ name: "qmark", x: 0.3, y: 0.18, px: 13, t0: w(13), t1: SLAM, phase: 1.3 }),
      prop({ name: "bang", x: 0.28, y: 0.42, px: 9, t0: SLAM + F(3), phase: 0.4 }),
      prop({ name: "bang", x: 0.45, y: 0.35, px: 7, t0: SLAM + F(4), phase: 2.1 }),
    ],
    texts: [
      { blk: A, text: "everyone's", font: "content", size: 62, x: 0.515, y: 0.3, fx: "smear", in: "slide", t0: w(7), t1: exitA, exit: "pixel", backAt: w(12) + 0.1 },
      { blk: A, text: "asking", font: "content", size: 118, x: 0.51, y: 0.415, fx: "smear", in: "slide", t0: w(8), t1: exitA, exit: "pixel", backAt: w(12) + 0.1 },
      { blk: A, text: "the", font: "conn", size: 50, x: 0.53, y: 0.505, in: "drop", t0: w(9), t1: exitA, exit: "pixel", backAt: w(12) + 0.1 },
      { blk: A, text: "SAME", font: "heavy", size: 240, x: 0.505, y: 0.69, fx: "smear", in: "fly", t0: w(10), t1: exitA, exit: "pixel", extrude: true, backAt: w(12) + 0.1 },
      { blk: A, text: "thing...", font: "content", size: 104, x: 0.58, y: 0.855, fx: "smear", in: "swing", t0: w(11), t1: exitA, exit: "pixel", backAt: w(12) + 0.1 },
      { blk: B, text: "What's", font: "content", size: 84, x: -0.025, y: 0.28, rz: -14, z: 50, fx: "smear", in: "drop", t0: w(12), backAt: SLAM },
      { blk: B, text: "the", font: "conn", size: 52, x: 0.15, y: 0.37, rz: 18, in: "swing", t0: w(13), backAt: SLAM },
      { blk: B, text: "prompt?", font: "heavy", size: 175, x: -0.01, y: 0.87, z: -100, rz: -7, fx: "pop", in: "rise", t0: w(14), colors: [, , , , , , PAL.yellow], backAt: SLAM, backColor: "#ff5a5a", backRy: -38, backZ: 420, extrude: true },
      { blk: C, text: "WRONG", font: "emph", size: 250, x: 0.57, y: 0.5, color: "#fff4e8", in: "slam", t0: SLAM, extrude: true, extrudeColor: "#5a0008", glow: "rgba(255,255,255,0.5)" },
      { blk: C, text: "QUESTION.", font: "emph", size: 108, x: 0.62, y: 0.64, color: "#fff4e8", in: "whip", t0: w(16), extrude: true, extrudeColor: "#5a0008" },
      { blk: C, text: "question: 001", font: "mono", size: 20, x: 0.79, y: 0.69, fx: "type", cps: 40, in: "none", t0: w(16) + 0.2, color: "#ffd0c8" },
    ],
    post: (t) => {
      const k = (t - SLAM) * FPS;
      const o = {};
      if (k >= -2 && k < 0) { o.blurX = 40; o.ca = 0.006; }
      if (k >= 0 && k < 2) o.flash = k < 1 ? 0.9 : 0.55;
      if (k >= 0 && k < 10) o.ca = 0.014 * (1 - k / 10);
      return o;
    },
  });
  for (const i of [7, 8, 10, 11]) cue(w(i) - 0.02, "whoosh_short", -24, 0.9 + hash(i) * 0.25);
  cue(w(8), "pixel_burst", -22, 1.15); cue(w(10), "pixel_burst", -22, 1.0); cue(w(12), "pixel_burst", -22, 0.9);
  cue(exitA, "dissolve", -18); cue(w(14), "pop", -18);
  cue(SLAM - F(2), "impact_slam", -3); cue(SLAM, "pixel_burst", -17, 0.8); cue(w(16) - 0.02, "whoosh_short", -19, 0.85);

  // ---------------- S3 black: "Because Claude didn't make this alone." ----------------
  const ALONE = w(22);
  const S3t0 = we(16) + 0.17;
  const L1 = { x: 0.5, y: 0.5, z: 0, ry: -8, rz: -2 };
  const mark = (i) => ({ box: PAL.red, boxOff: Math.round((w(i + 1) - w(i)) * FPS) }); // marker leaves when the next word lands
  const l1 = centerRow(row(0, 0.47, 86, "conn", [{ text: "Because", in: "slide", dist: 0.015, t0: w(17), ...mark(17) },
    { text: "Claude", in: "slide", dist: 0.015, t0: w(18), ...mark(18) }], { backAt: ALONE, backColor: "#7a1a1a", backZ: 380, blk: L1 }));
  const l2 = centerRow(row(0, 0.6, 86, "conn", [{ text: "didn't", t0: w(19), ...mark(19) }, { text: "make", t0: w(20), ...mark(20) }, { text: "this", t0: w(21), ...mark(21) }],
    { in: "focus", backAt: ALONE, backColor: "#7a1a1a", backZ: 380, blk: L1 }));
  shots.push({
    id: "S3", t0: S3t0, t1: w(23) - 0.09,
    bg: (g, t) => blackRing(g, t - w(17), { cy: 0.52, r: 0.4, a: 0.28 + 0.12 * clamp((t - ALONE) * 2) }),
    extra: (g, t) => { if (t >= ALONE - F(2)) embers(g, t, ALONE - F(2), { n: 130, cy: 0.62, spread: 0.6 }); },
    tcam: camPath([{ t: S3t0, yaw: -5, roll: 1.5, pitch: 1 }, { t: w(19) - 0.1, d: 0.5, yaw: 3, py: -40 }, { t: ALONE - 0.12, d: 0.55, py: -170, pitch: -10, yaw: 6, roll: -1.5, dolly: 0.06 }], 0.012),
    texts: [...l1, ...l2, { text: "alone.", font: "conn", size: 84, x: 0.5, align: "center", y: 0.72, z: 0, in: "fly", t0: ALONE, glow: "rgba(255,80,60,0.6)" }],
  });
  trans.push({ at: S3t0, type: "glitch", pre: 2, post: 2 });
  cue(S3t0 - 0.07, "glitch", -11); for (const i of [17, 18, 19, 20, 21]) cue(w(i), "tick", -26, 0.9 + hash(i) * 0.2); cue(ALONE - F(1), "dissolve", -16, 0.8); cue(ALONE, "riser_soft", -24);

  // ---------------- S4 desk front: Ask it for a "cool MOTION video" ----------------
  const DESK0 = w(23) - 0.09;
  const T4 = { x: 0.48, y: 0.26, z: 120, rx: 8, ry: -18, rz: -6 };
  const T4b = { x: 0.52, y: 0.74, z: 140, rx: -6, ry: 16, rz: -4 };
  shots.push({
    id: "S4", t0: DESK0, t1: w(30) - F(3),
    set: "room",
    view: (t) => {
      const k = ease.outCubic(clamp((t - DESK0) / 2.4)), rack = clamp((t - DESK0) * FPS / 10);
      return { pos: [lerp(-11, -4.5, k), lerp(18.5, 17.2, k), lerp(47, 39.5, k)], look: [lerp(1, 3, k), 18, -3], roll: lerp(-3, -1, k), fov: 33,
        focusDist: lerp(60, 14, ease.outCubic(rack)), aperture: 0.0042, maxblur: lerp(0.03, 0.016, rack) };
    },
    ui: (g, t) => chatUI(g, t, DESK0 + 0.1, { prompt: "make me a cool motion video", sendAt: w(30) - 0.4 }),
    tcam: camPath([{ t: DESK0, py: 150, yaw: 5, roll: -1.5, dolly: -0.02 }, { t: w(27) - 0.24, d: 0.5, py: -150, pitch: 7, yaw: -9, roll: 1.5, dolly: 0.05 }], 0.012),
    focusZ: 130, dof: 0.009, couple: 0.01,
    chars: [{ kind: "cube", x: 0.15, y: 1.05, z: 320, px: 15, keys: [{ t: DESK0, look: 1 }, { t: w(27), expr: "happy", hop: 1, look: 1, burst: false }, { t: w(29) + 0.2, look: 1, burst: false }] }],
    texts: [
      { blk: T4, text: "Ask", font: "heavy", size: 185, x: 0.3, y: 0.31, in: "slide", t0: w(23), extrude: true, overlapOk: ["it"] },
      { blk: T4, text: "it", font: "content", size: 74, x: 0.485, y: 0.2, in: "drop", t0: w(24) },
      { blk: T4, text: "for a", font: "content", size: 74, x: 0.535, y: 0.31, in: "slide", t0: w(25) },
      { blk: T4b, text: "“cool", font: "heavy", size: 165, x: 0.3, y: 0.6, color: PAL.red, tint: "#ffffff", tintDelay: 4, in: "flip", t0: w(27), extrude: true },
      { blk: T4b, text: "MOTION", font: "emph", size: 250, x: 0.35, y: 0.86, grad: "hot", in: "slam", t0: w(28), extrude: true, extrudeColor: "#4a1404" },
      { blk: T4b, text: "video”", font: "heavy", size: 96, x: 0.74, y: 0.9, fx: "smear", in: "swing", t0: w(29), extrude: true },
    ],
    post: (t) => { const k = (t - w(28)) * FPS; return k >= 0 && k < 6 ? { ca: 0.008 * (1 - k / 6) } : {}; },
    shake: [{ t: w(28), amp: 9 }],
  });
  trans.push({ at: DESK0, type: "flash", pre: 0, post: 2 });
  cue(w(23) - 0.02, "whoosh_short", -21); cue(w(27), "pop", -19); cue(w(28), "impact_slam", -14, 1.25); cue(w(29) - 0.02, "whoosh_short", -22, 1.1);

  // ---------------- S5 slop ribbon ----------------
  const SLOPT = w(33), CUT_LIB = w(34) - F(3), S5t0 = w(30) - F(3);
  shots.push({
    id: "S5", t0: S5t0, t1: CUT_LIB,
    bg: (g, t) => slopRibbon(g, t, w(30) - 0.35),
    tcam: camPath([{ t: S5t0, px: 120, py: 110, yaw: -7, roll: 2.5, pitch: 2 }, { t: SLOPT - 0.26, d: 0.42, px: -140, py: -110, yaw: 10, roll: -2, pitch: -2, dolly: 0.08 }], 0.02),
    texts: [
      { text: "AND", font: "emph", size: 110, x: 0.52, y: 0.25, z: 80, rz: -9, ry: -10, in: "arc", fx: "pop", t0: w(30) },
      { text: "YOU", font: "emph", size: 110, x: 0.625, y: 0.215, z: 80, rz: -2, ry: -10, in: "arc", fx: "pop", t0: w(31) },
      { text: "GET", font: "emph", size: 110, x: 0.73, y: 0.23, z: 80, rz: 7, ry: -10, color: PAL.salmon, in: "arc", fx: "pop", t0: w(32) },
      { text: "SLOP.", font: "heavy", size: 245, x: 0.12, y: 0.855, z: 100, rz: -6, ry: 15, grad: "pink", fx: "pop", in: "slam", t0: SLOPT, extrude: true, extrudeColor: "#5a1030" },
    ],
    post: (t) => { const k = (t - SLOPT) * FPS; const o = {}; if (k >= 0 && k < 2) o.flash = 0.45; if (k >= 0 && k < 8) o.ca = 0.012 * (1 - k / 8); return o; },
    shake: [{ t: SLOPT, amp: 14 }],
  });
  trans.push({ at: S5t0, type: "pixelate", pre: 4, post: 2 });
  trans.push({ at: CUT_LIB, type: "whipMosaic", pre: 9, post: 6 });
  cue(w(30) - F(5), "dissolve", -15); cue(w(30) - 0.05, "card_flutter", -13); cue(SLOPT - F(1), "impact_slam", -7, 0.95);
  cue(CUT_LIB - F(9), "whoosh_whip", -9); cue(CUT_LIB - F(3), "mosaic_crunch", -13);

  // ---------------- S6/S7 library: The difference? A director. ----------------
  const libView = (p0, p1, look, t0, dur, extra = {}) => (t) => {
    const k = ease.inOutCubic(clamp((t - t0) / dur));
    return { pos: p0.map((v, i) => lerp(v, p1[i], k)), look, fov: 40, focusDist: 7, aperture: 0.005, maxblur: 0.018, bloom: 0.5, ...extra };
  };
  const FG = w(36) - F(1);
  shots.push({
    id: "S6", t0: CUT_LIB, t1: FG,
    set: "room", view: libView([-27, 24, 20], [-31, 25.5, 16], [-33, 24.5, -13], CUT_LIB, 1.4, { roll: 2 }),
    tcam: camPath([{ t: CUT_LIB, px: -80, py: 120, yaw: -6, roll: 1 }, { t: w(35) - 0.18, d: 0.45, px: 60, py: -40, yaw: 7, roll: -1.5, dolly: 0.05 }], 0.015),
    texts: [
      { text: "The", font: "conn", size: 60, x: 0.1, y: 0.17, z: 30, in: "drop", t0: w(34) },
      { text: "difference?", font: "heavyI", size: 155, x: 0.15, y: 0.6, z: 70, ry: 18, rz: -6, color: PAL.red, in: "fly", t0: w(35), extrude: true, extrudeColor: "#3a0004" },
    ],
  });
  shots.push({
    id: "S7", t0: FG, t1: w(38) - F(1),
    set: "room", view: libView([-38, 24, 22], [-37, 24.4, 19.5], [-36, 24.5, -13], FG, 1.2, { maxblur: 0.022, roll: -1.5 }),
    tcam: camLerp(FG, 0.9, { dolly: 0, yaw: 4, roll: -1 }, { dolly: 0.05, yaw: -2, roll: 0.5 }),
    chars: [{ kind: "hero", x: 0.3, y: 1.08, z: -40, px: 18, keys: [{ t: FG, pose: "clap", expr: "determined" }] }],
    texts: [
      { text: "A", font: "conn", size: 64, x: 0.6, y: 0.4, z: 120, in: "drop", t0: w(36) },
      { text: "DIRECTOR.", font: "emph", size: 178, x: 0.53, y: 0.67, z: 50, ry: -18, rz: -2, fx: "decode", dur: 8, in: "flip", t0: w(37), extrude: true, extrudeColor: "#2a0a06" },
    ],
  });
  trans.push({ at: FG, type: "fgwipe", pre: 3, post: 3 });
  cue(FG - F(3), "whoosh_short", -12, 0.8); cue(w(37), "pixel_burst", -17); cue(w(37), "decode", -17);

  // ---------------- S8 name ----------------
  const NAME2 = w(41), S8t0 = w(38) - F(1);
  const NB = { x: 0.62, y: 0.55, z: 70, ry: -16, rz: -3, rx: 4 };
  shots.push({
    id: "S8", t0: S8t0, t1: we(43) + 0.12,
    set: "room", view: libView([-36, 26.5, 15], [-38.5, 26.6, 13.6], [-37, 26, -13], S8t0, 3.2, { focusDist: 5, maxblur: 0.03, exposure: 0.62 }),
    extra: (g) => { const gr = g.createLinearGradient(0.4 * W, 0, W, 0); gr.addColorStop(0, "rgba(8,3,2,0)"); gr.addColorStop(0.35, "rgba(8,3,2,0.55)"); gr.addColorStop(1, "rgba(8,3,2,0.7)"); g.fillStyle = gr; g.fillRect(0, 0, W, H); },
    tcam: camPath([{ t: S8t0, px: -40, py: 40, yaw: 4, roll: -1 }, { t: w(40) - 0.1, d: 0.45, px: 20, py: 10, yaw: -3, dolly: 0.03 }, { t: NAME2 - F(3), d: 0.36, px: 110, py: -110, yaw: -10, roll: 2, dolly: 0.07, ease: ease.outCubic }], 0.01),
    shake: [{ t: NAME2, amp: 16 }],
    chars: [{ kind: "hero", x: 0.24, y: 1.74, z: -120, px: 30, keys: [{ t: S8t0, pose: "idle", expr: "determined", mouth: "flat" }, { t: NAME2, pose: "idle", expr: "happy", mouth: "smile" }] }],
    texts: [
      ...row(0.515, 0.32, 84, "content", [{ text: "His", t0: w(38) }, { text: "name's", t0: w(39) }], { blk: NB, in: "slide", glow: "rgba(255,255,255,0.35)" }),
      { blk: NB, text: "IKHSAN", font: "emph", size: 268, x: 0.48, y: 0.61, grad: "coral", fx: "decode", dur: 8, in: "fly", t0: w(40), extrude: true, extrudeColor: "#3a0004", glow: "rgba(255,70,60,0.45)" },
      ...row(0.488, 0.775, 128, "emph", [{ text: "DWI", t0: w(42) }, { text: "SAPUTRA", t0: w(43) }], { blk: NB, fx: "pop", in: "rise", extrude: true, extrudeColor: "#2a0a06" }),
    ],
    over: (g, t) => {
      const k = ease.outExpo(clamp((t - w(43) - F(4)) * FPS / 5));
      if (k <= 0) return;
      g.save(); g.strokeStyle = PAL.teal; g.lineWidth = 3;
      g.beginPath(); g.moveTo(0.4 * W, 0.47 * H); g.lineTo(lerp(0.4, 0.455, k) * W, lerp(0.47, 0.9, k) * H); g.stroke();
      g.fillStyle = PAL.teal; g.font = FONTS.mono(26); g.globalAlpha = k; g.fillText("> the director", 0.462 * W, 0.915 * H);
      g.restore();
    },
    post: (t) => { const k = (t - NAME2) * FPS; const o = {}; if (k >= -1 && k < 0) o.blurX = 30; if (k >= 0 && k < 1) o.flash = 0.45; if (k >= 0 && k < 10) o.ca = 0.013 * (1 - k / 10); return o; },
  });
  cue(w(38) - 0.02, "whoosh_short", -21); cue(w(40), "decode", -15); cue(NAME2 - F(2), "impact_slam", -5); cue(NAME2, "pixel_burst", -14, 0.7);
  cue(w(42), "pop", -17); cue(w(43), "pop", -17, 0.9);

  // ---------------- S9 desk: he turned his motion taste into a formula (type lies ON the desk) ----------------
  const D1 = we(43) + 0.12, D2 = w(50) - F(2);
  const deskTop = (t) => { const k = ease.inOutCubic(clamp((t - D1) / 2.6)); return { pos: [lerp(6, 2, k), lerp(36, 31, k), lerp(30, 24.5, k)], look: [lerp(-0.5, -1.5, k), 10.6, 2.5], roll: lerp(3, 0, k), fov: 46, focusDist: lerp(32, 26, k), aperture: 0.0014, maxblur: 0.007, exposure: 1.35 }; };
  const deskMon = (t) => { const k = ease.inOutCubic(clamp((t - D2) / 2.2)); return { pos: [lerp(7, 3.5, k), lerp(26.5, 24.5, k), lerp(22, 17, k)], look: [0, 19.6, -3], roll: lerp(-2, 0, k), fov: 36, focusDist: 21, aperture: 0.003, maxblur: 0.012 }; };
  const sitHero = { kind: "hero", anchor: [-1.0, 0.2, 13.5], wpx: 0.2, keys: [{ t: D1, pose: "back" }] };
  const deskCube = { kind: "cube", anchor: [13.2, 10.6, -1.2], wpx: 0.17, keys: [{ t: D1 }, { t: w(52), expr: "happy", hop: 1, burst: false }] };
  const onDesk = (pos, rz = 0, sc = 0.036) => ({ pos, rot: [-90, 0, rz], scale: sc });
  shots.push({
    id: "S9a", t0: D1, t1: D2, set: "room", view: deskTop,
    ui: (g, t) => codeUI(g, t, D1 + 0.2, { cps: 40 }),
    wchars: [sitHero, deskCube],
    wtexts: [
      { text: "And he", font: "content", size: 64, world: onDesk([-17.0, 10.8, 3.2], 4, 0.034), in: "rise", t0: w(44) },
      { text: "turned", font: "heavy", size: 92, world: onDesk([-17.2, 10.8, 6.6], 4, 0.033), in: "rise", t0: w(46), extrude: true },
      { text: "his motion", font: "content", size: 64, world: onDesk([6.6, 10.8, 3.4], -5, 0.032), in: "rise", t0: w(47) },
      { text: "taste", font: "brush", size: 150, color: PAL.red, world: onDesk([7.2, 10.8, 6.9], -5, 0.04), fx: "wipe", in: "none", t0: w(49) },
    ],
  });
  const FB = { x: 0.26, y: 0.42, z: 70, ry: 15, rz: -4, rx: 3 };
  shots.push({
    id: "S9b", t0: D2, t1: w(56) - F(1), set: "room", view: deskMon,
    ui: (g, t) => codeUI(g, t, D1 + 0.2, { cps: 40 }),
    wchars: [{ ...sitHero, anchor: [-7, 0.2, 10] }],
    tcam: camPath([{ t: D2, py: 60, yaw: -5, roll: 1 }, { t: w(53) - 0.15, d: 0.45, py: -50, yaw: 4, roll: -1, dolly: 0.04 }], 0.012),
    focusZ: 140, dof: 0.009,
    texts: [
      { blk: FB, text: "into a", font: "content", size: 62, x: 0.09, y: 0.22, in: "drop", t0: w(50) },
      { blk: FB, text: "formula", font: "heavy", size: 190, x: 0.092, y: 0.45, fx: "decode", binary: true, dur: 8, in: "fly", t0: w(52), extrude: true },
      { blk: FB, text: "Claude can read.", font: "conn", size: 60, x: 0.09, y: 0.59, fx: "type", cps: 24, caret: true, in: "none", t0: w(53) },
    ],
  });
  trans.push({ at: D1, type: "mosaic", pre: 5, post: 6, partial: 1, seed: 5 });
  trans.push({ at: D2, type: "mosaic", pre: 3, post: 4, partial: 0.45, seed: 9, inF: 3, hold: 1, outF: 3 });
  cue(D1 - F(4), "mosaic_crunch", -14); cue(D1 + 0.2, "typing", -27); cue(D2 - F(2), "mosaic_crunch", -18, 1.2);
  cue(w(44) - 0.02, "whoosh_short", -24); cue(w(49), "whoosh_short", -21, 0.85); cue(w(52), "decode", -16); cue(w(53), "typing", -24, 1.1);

  // ---------------- S10 monitor angle: Same AI. Different director. ----------------
  const S10 = w(56) - F(1), END = we(59) + 0.25;
  shots.push({
    id: "S10", t0: S10, t1: END,
    set: "room",
    view: (t) => { const k = ease.outCubic(clamp((t - S10) / 2.4)); return { pos: [lerp(-15, -9, k), lerp(24, 22.5, k), lerp(31, 27, k)], look: [3, 19.8, -3], roll: lerp(2.5, 0, k), fov: 33, focusDist: 32, aperture: 0.004, maxblur: 0.016 }; },
    ui: (g, t) => chatUI(g, t, S10 - 2, { prompt: "", greet: "Good evening, Ikhsan", sendAt: 1e9 }),
    tcam: camPath([{ t: S10, px: -200, yaw: -8, roll: -1 }, { t: w(58) - 0.2, d: 0.45, px: 260, yaw: 12, roll: 1.5, dolly: 0.05 }], 0.012), couple: 0.01,
    focusZ: 100, dof: 0.008,
    chars: [{ kind: "hero", x: 0.12, y: 1.32, z: 260, px: 13, keys: [{ t: S10, pose: "back" }] }, { kind: "cube", x: 0.27, y: 1.03, z: 200, px: 8, keys: [{ t: S10, look: 1 }] }],
    texts: [
      { text: "Same", font: "heavy", size: 140, x: 0.205, y: 0.225, z: 40, ry: 14, rz: -3, in: "slide", t0: w(56), extrude: true },
      { text: "AI.", font: "emph", size: 230, x: 0.205, y: 0.49, z: 60, ry: 18, rz: -4, color: PAL.red, in: "slam", t0: w(57), extrude: true, extrudeColor: "#3a0004" },
      { text: "Different", font: "conn", size: 64, x: 0.62, y: 0.2, z: 60, ry: -14, in: "fly", t0: w(58) },
      { text: "director.", font: "emph", size: 185, x: 0.565, y: 0.43, z: 40, ry: -18, rz: 3, grad: "coral", in: "flip", dir: -1, t0: w(59), extrude: true, extrudeColor: "#3a0004" },
    ],
    post: (t) => { const k = (t - w(57)) * FPS; return k >= 0 && k < 6 ? { ca: 0.01 * (1 - k / 6) } : {}; },
    shake: [{ t: w(57), amp: 10 }],
  });
  trans.push({ at: END, type: "light", pre: 3, post: 8 });
  cue(w(56) - 0.02, "whoosh_short", -21); cue(w(57), "impact_slam", -11, 1.2); cue(w(58) - 0.02, "whoosh_short", -22, 1.1);
  cue(END - 1.1, "shimmer_whiteout", -11);

  bed.push({ t0: 0, t1: w(14) + 0.5, kind: "hook" }, { t0: SLAM, t1: we(16) + 0.17, kind: "red" },
    { t0: we(16) + 0.17, t1: DESK0, kind: "dark" }, { t0: DESK0, t1: NAME2 - 0.18, kind: "lofi" },
    { t0: NAME2, t1: END, kind: "lofi2" });
  const FILM_END = buildRest({ w, we, F, shots, trans, cues, bed, row, camPath, prop, env, START: END });

  // ---- typography SFX: every word sounds like its entrance (variant + pitch picked per word) ----
  const typoCue = (it) => {
    const fx = it.fx || "none", inn = it.in || "slide";
    let pool;
    if (it.box) pool = ["typo_marker_swipe"];
    else if (fx === "decode") pool = ["typo_decode_scramble", "typo_glitch_chirp"];
    else if (fx === "type") pool = ["typo_key_clicks"];
    else if (fx === "smear") pool = ["typo_glitch_chirp", "typo_whoosh_soft"];
    else if (fx === "pop") pool = ["typo_pop_bubble", "typo_pop_pluck"];
    else if (inn === "slam") pool = it.size >= 200 ? [] : ["typo_stamp_hit"]; // big slams already carry impact_slam
    else if (inn === "fly") pool = ["typo_fly_in"];
    else if (inn === "flip") pool = ["typo_card_flick"];
    else if (inn === "drop") pool = ["typo_drop_thud", "typo_tick_glass"];
    else if (inn === "swing") pool = ["typo_swish_swing"];
    else if (inn === "rise" || inn === "arc") pool = ["typo_swoosh_up"];
    else if (inn === "whip") pool = ["typo_swish_swing", "typo_fly_in"];
    else pool = it.size < 70 ? ["typo_tick_glass", "typo_pop_pluck"] : ["typo_whoosh_soft", "typo_tick_glass"];
    if (!pool.length) return;
    const name = pool[Math.floor(hash(it.t0, it.size) * pool.length)];
    const db = it.size >= 160 ? -17 : it.size >= 90 ? -20 : -23;
    cues.push({ t: it.t0 - 0.015, name, db, rate: 0.94 + hash(it.t0, 3) * 0.12, typo: true });
  };
  for (const s of shots) for (const it of [...(s.texts || []), ...(s.wtexts || [])]) if (it.sfx !== false) typoCue(it);
  const typoT = cues.filter((c) => c.typo).map((c) => c.t);
  for (let i = cues.length - 1; i >= 0; i--) { // manual per-word cues would double the typo layer
    const c = cues[i];
    if (!c.typo && ["whoosh_short", "pop", "tick"].includes(c.name) && typoT.some((t) => Math.abs(t - c.t) < 0.06)) cues.splice(i, 1);
  }

  return { shots, trans, cues, bed, duration: FILM_END };
}
