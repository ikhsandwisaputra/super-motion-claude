// Shot list for this film. Replace the demo shots with your own; keep the patterns:
// - every time comes from a VO word: w(i) start, we(i) end, wi("WORD") to look an index up
// - each phrase lives somewhere in 3D; camPath moves the type camera between phrases
// - big hits land on the first syllable of a phrase, after a VO pause (bed drops to silence first)
// The demo runs against build/words_edit.json (20 demo words, no audio) so the engine renders out of the box.
import { FPS, W, H, clamp, ease, lerp, PAL } from "./lib/util.js";
import { makeKit } from "./lib/kit.js";
import { orangeBg, redBg, blackRing } from "./lib/bg2d.js";
import { blackSoft } from "./lib/scenes2.js";
import { codeUI } from "./lib/ui.js";
import { dust, shockwave } from "./lib/fx.js";
import { inputBar } from "./lib/panels.js";

export function build(WORDS, measure, env = {}) {
  const K = makeKit(WORDS, measure, env);
  const { w, we, F, wi, shots, trans, bed, cue, row, centerRow, camPath, prop, panel, view } = K;

  // ---- A: hook on orange. Phrase 1 on the right, camera travels left to phrase 2 ----
  const A0 = 0, SLAM = w(wi("WRONG"));
  const P1 = { x: 0.62, y: 0.5, z: 60, ry: -16, rz: -4 }; // a phrase block = a tilted plane
  const P2 = { x: 0.1, y: 0.55, z: 0, ry: 14, rz: -3 };
  shots.push({
    id: "A", t0: A0, t1: SLAM - F(2),
    bg: (g, t) => { orangeBg(g, t); dust(g, t, { n: 70 }); },
    tcam: camPath([{ t: A0, px: 60, yaw: -3, roll: -1.5 }, { t: we(5) + 0.05, d: 0.5, px: -250, yaw: -14, roll: -2.5, dolly: 0.04 }]),
    chars: [{ kind: "hero", x: 0.4, y: 0.86, px: 8.6, burstIn: true, t0: w(0), keys: [{ t: w(0), pose: "idle" }, { t: w(2), pose: "point" }, { t: w(6), pose: "think" }] }],
    texts: [
      { blk: P1, text: "Every word", font: "content", size: 70, x: 0.52, y: 0.32, fx: "smear", t0: w(0), backAt: w(6) },
      { blk: P1, text: "LANDS", font: "heavy", size: 220, x: 0.51, y: 0.52, fx: "smear", in: "fly", t0: w(2), extrude: true, backAt: w(6) },
      { blk: P1, text: "on its frame.", font: "brush", size: 110, x: 0.56, y: 0.68, fx: "wipe", in: "none", t0: w(3), backAt: w(6) },
      { blk: P2, text: "The camera", font: "content", size: 72, x: 0.02, y: 0.3, in: "drop", t0: w(6) },
      { blk: P2, text: "travels", font: "heavy", size: 150, x: 0.01, y: 0.5, in: "rise", t0: w(8), extrude: true },
      { blk: P2, text: "between phrases.", font: "conn", size: 58, x: 0.03, y: 0.62, in: "slide", t0: w(9) },
    ],
  });

  // ---- B: the slam (background swap, shockwave, flash, shake) ----
  const C0 = w(wi("Because")) - 0.1;
  const S = { x: 0.6, y: 0.5, z: 50, ry: -12, rz: -3 };
  shots.push({
    id: "B", t0: SLAM - F(2), t1: C0,
    bg: (g, t) => redBg(g, t),
    extra: (g, t, P) => { const [x, y] = P(0.36, 0.86); shockwave(g, t, SLAM + F(2), x / W, y / H, { r: 360 }); },
    tcam: camPath([{ t: SLAM - F(2), px: 120, yaw: 12, dolly: 0.06, roll: 2 }], 0.02),
    shake: [{ t: SLAM, amp: 20 }],
    chars: [{ kind: "hero", x: 0.36, y: 0.86, px: 8.6, keys: [{ t: SLAM - F(2), pose: "fall" }] }],
    props: [prop({ name: "bang", x: 0.3, y: 0.42, px: 9, t0: SLAM + F(3) })],
    texts: [
      { blk: S, text: "WRONG", font: "emph", size: 250, x: 0.52, y: 0.5, color: "#fff4e8", in: "slam", t0: SLAM, extrude: true, extrudeColor: "#5a0008", glow: "rgba(255,255,255,0.5)" },
      { blk: S, text: "QUESTION.", font: "emph", size: 108, x: 0.56, y: 0.64, color: "#fff4e8", in: "whip", t0: w(wi("question")), extrude: true, extrudeColor: "#5a0008" },
    ],
    post: (t) => { const k = (t - SLAM) * FPS; const o = {}; if (k >= 0 && k < 2) o.flash = k < 1 ? 0.85 : 0.5; if (k >= 0 && k < 10) o.ca = 0.014 * (1 - k / 10); return o; },
  });
  trans.push({ at: SLAM - F(2), type: "flash", pre: 0, post: 1 });
  cue(SLAM - F(2), "impact_slam", -4);

  // ---- C: voxel desk. Red marker jumps word to word; two words lie ON the desk ----
  const D0 = w(wi("Comment")) - F(2);
  const i0 = wi("Because");
  const mark = (i) => ({ box: PAL.red, boxOff: Math.round((w(i + 1) - w(i)) * FPS) });
  const line = centerRow(row(0, 0.2, 76, "conn", [0, 1, 2].map((k) => ({ text: WORDS[i0 + k].word, t0: w(i0 + k), ...mark(i0 + k) })), { in: "slide", dist: 0.015 }));
  const onDesk = (pos, rz = 0, sc = 0.036) => ({ pos, rot: [-90, 0, rz], scale: sc });
  shots.push({
    id: "C", t0: C0, t1: D0, set: "room",
    view: view(C0, 3, [8, 33, 29], [3, 30, 24], [-3, 10.6, 2.5], { focusDist: 27, fov: 44, aperture: 0.0016, maxblur: 0.008, exposure: 1.3 }),
    ui: (g, t) => codeUI(g, t, C0, { cps: 40 }),
    wchars: [{ kind: "cube", anchor: [13.2, 10.6, -1.2], wpx: 0.17, keys: [{ t: C0 }] }],
    texts: line,
    wtexts: [
      { text: "three", font: "content", size: 64, world: onDesk([-17, 10.8, 3.2], 4, 0.034), in: "rise", t0: w(i0 + 4) },
      { text: "dimensions.", font: "heavy", size: 92, world: onDesk([-17.4, 10.8, 6.7], 4, 0.026), in: "rise", t0: w(i0 + 5), extrude: true },
    ],
  });
  trans.push({ at: C0, type: "glitch", pre: 2, post: 2 });
  cue(C0 - 0.07, "glitch", -12);

  // ---- D: CTA ----
  const END = we(WORDS.length - 1) + 2.0;
  shots.push({
    id: "D", t0: D0, t1: END,
    bg: (g, t) => blackSoft(g, t),
    tcam: camPath([{ t: D0, yaw: -2 }], 0.004),
    texts: [
      { text: "Comment", font: "heavy", size: 104, x: 0.5, align: "center", y: 0.36, in: "slide", t0: w(wi("Comment")), extrude: true },
      { text: "MOTION", font: "emph", size: 230, x: 0.5, align: "center", y: 0.6, color: PAL.teal, in: "slam", t0: w(wi("MOTION")), extrude: true, extrudeColor: "#03211f" },
      panel({ x: 0.3, y: 0.72, w: 760, h: 96, t0: w(wi("MOTION")) + 0.05, paint: inputBar({ text: "MOTION", t0: w(wi("MOTION")) + 0.25, cps: 8, sendAt: END - 1.0, placeholder: "Add a comment..." }) }),
    ],
  });
  trans.push({ at: D0, type: "flash", pre: 0, post: 2 });

  // music bed: sections, with hard drops to silence before punchlines
  bed.push({ t0: 0, t1: SLAM - 0.4, kind: "hook" }, { t0: SLAM, t1: C0, kind: "red" }, { t0: C0, t1: D0, kind: "lofi" }, { t0: D0, t1: END, kind: "cta" });
  return K.finish(END);
}
