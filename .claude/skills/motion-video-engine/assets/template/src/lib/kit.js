// Authoring kit for timelines: word-time lookups, phrase layout, camera travel, typography SFX.
// Every time in a timeline comes from a VO word, so re-cutting the VO moves the whole edit.
import { FPS, W, H, clamp, ease, lerp, hash } from "./util.js";

export function makeKit(WORDS, measure, env = {}) {
  const w = (i) => WORDS[i].start, we = (i) => WORDS[i].end, F = (n) => n / FPS;
  // index of the first word whose text matches (case-insensitive, punctuation ignored) at/after `from`
  const wi = (text, from = 0) => {
    const k = text.toLowerCase().replace(/[^\w']/g, "");
    for (let i = from; i < WORDS.length; i++) if (WORDS[i].word.toLowerCase().replace(/[^\w']/g, "") === k) return i;
    throw new Error(`word "${text}" not found after ${from}`);
  };
  const shots = [], trans = [], cues = [], bed = [];
  const cue = (t, name, db = -14, rate = 1) => cues.push({ t, name, db, rate });

  // lay words left-to-right from x (0-1) with natural spacing
  const row = (x, y, size, font, parts, extra = {}) => {
    let cx = x * W;
    return parts.map((p) => {
      const it = { font, size, y, ...extra, ...p, x: cx / W };
      cx += measure(p.font || font, p.size || size, p.text) + (p.gap ?? (p.size || size) * 0.26);
      return it;
    });
  };
  const centerRow = (r) => {
    const l = r[r.length - 1];
    const wT = l.x * W + measure(l.font, l.size, l.text) - r[0].x * W;
    const off = (W - wT) / 2 / W - r[0].x;
    r.forEach((it) => (it.x += off));
    return r;
  };
  // AE-style camera travel: each phrase owns a place in 3D; when a phrase is done the camera moves
  // (pan + yaw/roll + dolly, inOutCubic) so the finished phrase recedes and the next is revealed.
  // keys[0] = start state; key = { t (move start), d (seconds), ease, ...state }. Slow drift on holds.
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
    fn.moves = keys.slice(1).map((k) => [k.t, k.t + (k.d ?? 0.5)]); // main.js gives these frames full motion blur
    return fn;
  };
  const prop = (o) => ({ kind: "prop", ...o });
  const panel = (o) => ({ panel: true, in: "popin", ...o });
  // voxel-room camera that eases between two positions
  const view = (t0, d, p0, p1, look, extra = {}) => (t) => {
    const k = ease.inOutCubic(clamp((t - t0) / d));
    return { pos: p0.map((v, i) => lerp(v, p1[i], k)), look, fov: 36, aperture: 0.0025, maxblur: 0.012, ...extra };
  };

  // Typography SFX: every word sounds like its entrance; the variant + pitch are picked per word.
  const typoCue = (it) => {
    const fx = it.fx || "none", inn = it.in || "slide";
    let pool;
    if (it.panel) return;
    if (it.box) pool = ["typo_marker_swipe"];
    else if (fx === "decode") pool = ["typo_decode_scramble", "typo_glitch_chirp"];
    else if (fx === "type") pool = ["typo_key_clicks"];
    else if (fx === "smear") pool = ["typo_glitch_chirp", "typo_whoosh_soft"];
    else if (fx === "pop") pool = ["typo_pop_bubble", "typo_pop_pluck"];
    else if (inn === "slam") pool = it.size >= 200 ? [] : ["typo_stamp_hit"]; // big slams carry impact_slam
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
  const finish = (duration) => {
    for (const s of shots) for (const it of [...(s.texts || []), ...(s.wtexts || [])]) if (it.sfx !== false) typoCue(it);
    const typoT = cues.filter((c) => c.typo).map((c) => c.t);
    for (let i = cues.length - 1; i >= 0; i--) { // manual per-word cues would double the typo layer
      const c = cues[i];
      if (!c.typo && ["whoosh_short", "pop", "tick"].includes(c.name) && typoT.some((t) => Math.abs(t - c.t) < 0.06)) cues.splice(i, 1);
    }
    return { shots, trans, cues, bed, duration };
  };
  return { w, we, F, wi, shots, trans, cues, bed, cue, row, centerRow, camPath, prop, panel, view, env, finish };
}
