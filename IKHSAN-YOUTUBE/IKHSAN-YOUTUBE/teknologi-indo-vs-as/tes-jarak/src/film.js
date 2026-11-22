// Motion test "Jarak = Kedalaman" (Bab 1, VO ivs_vo_ahmad_04 24.0 → 32.4 s).
// 1 ivory card = Indonesia's 1.931 resident patent applications (2024). The US needs 140 of them in a row.
// Camera: lands on the lone card → whips to the US lane → flies the whole row → zooms back to reveal it.
import { W, H, FPS, clamp, inv, lerp, E } from './engine.js';

const ROOM = '#0B0C09', IVORY = '#F1EFE6', GREY = '#7C7D74', LIME = '#C8F53C', LIME_INK = '#1B2400';
const DISP = 'League Gothic', SER = 'Fraunces', MONO = 'Space Mono', D2R = Math.PI / 180;
const N = 140, GAP = 170, CW = 300, CH = 400, XI = -430, XA = 430;
const BL = [0, 2, 5, 10, 18, 32];
// VO word times (local s; VO slice starts at 24.0 s of the take)
const T = { seribu: .46, ratus: 1.28, permohonan: 1.58, sendiri: 3.10, amerika: 3.87, sekitar: 5.09, dua: 5.68, tujuh: 6.29, ribu: 6.92, end: 8.4 };

const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const setFont = (ctx, css, ls = 0) => { ctx.font = css; ctx.letterSpacing = `${ls}px`; };
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };

function camera(c) {                                   // look-at camera, world y down, +z away
  const yaw = c.yaw * D2R, pitch = c.pitch * D2R;
  const F = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
  const R = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const Dn = [F[1] * R[2] - F[2] * R[1], F[2] * R[0] - F[0] * R[2], F[0] * R[1] - F[1] * R[0]];
  const C = [c.tx - c.dist * F[0], c.ty - c.dist * F[1], c.tz - c.dist * F[2]];
  return (x, y, z) => {
    const dx = x - C[0], dy = y - C[1], dz = z - C[2], cz = dx * F[0] + dy * F[1] + dz * F[2], s = c.f / Math.max(cz, 1);
    return { x: W / 2 + (c.sx || 0) + s * (dx * R[0] + dy * R[1] + dz * R[2]), y: H / 2 + (c.sy || 0) + s * (dx * Dn[0] + dy * Dn[1] + dz * Dn[2]), s, z: cz };
  };
}
const lerpCam = (a, b, k) => Object.fromEntries(Object.keys(b).map(n => [n, lerp(a[n] ?? b[n], b[n], k)]));

export function makeFilm() {
  let tex;
  const scene = { dur: T.end, cuts: [], K: 8, grain: .035, load, draw, post, cues: () => ({ cues: { dur: T.end, trans: [], keys: Object.values(T).map(t => ({ t })), beats: [] }, chapters: [{ chap: 'Jarak = Kedalaman (tes 3 detik)', start: 0 }] }) };

  function cardArt(fill, ink, label, num) {             // a clean document card, 600×800 px
    const [c, g] = mk(600, 800);
    const gr = g.createLinearGradient(0, 0, 600, 800); gr.addColorStop(0, fill[0]); gr.addColorStop(1, fill[1]);
    g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, 600, 800, 22); g.fill();
    g.fillStyle = ink; g.globalAlpha = .9; setFont(g, `700 30px "${MONO}"`, 6); g.fillText(label, 48, 84);
    g.globalAlpha = .25; g.fillRect(48, 112, 504, 3);
    g.globalAlpha = .9; setFont(g, `400 210px "${DISP}"`); g.fillText(num, 44, 360);
    g.globalAlpha = .55; setFont(g, `400 26px "${MONO}"`, 2); g.fillText('PERMOHONAN PATEN', 48, 412); g.fillText('RESIDEN · 2024', 48, 450);
    g.globalAlpha = .16; for (let i = 0; i < 6; i++) g.fillRect(48, 520 + i * 34, i === 5 ? 260 : 504 - (i % 2) * 70, 12);
    g.globalAlpha = .35; g.lineWidth = 4; g.strokeStyle = ink; g.beginPath(); g.arc(486, 706, 48, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(486, 706, 34, 0, Math.PI * 2); g.stroke();
    g.globalAlpha = 1; g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.roundRect(4, 4, 592, 792, 20); g.stroke();
    return BL.map(b => { if (!b) return c; const [d, x] = mk(300, 400); x.filter = `blur(${b / 2}px)`; x.drawImage(c, 0, 0, 300, 400); return d; });
  }
  async function load() {
    tex = { id: cardArt(['#FBFAF4', '#E4E1D4'], '#11120E', 'INDONESIA', '1.931'),
      us: cardArt(['#8A8B82', '#55564F'], '#0B0C09', 'AMERIKA SERIKAT', '1.931') };
  }

  // camera poses
  const P0 = { yaw: -4, pitch: 3, f: 1500, dist: 1100, tx: XI + 260, ty: -200, tz: 0, sx: 0, sy: 0 };
  const P1 = { yaw: 4, pitch: 3, f: 1500, dist: 1100, tx: XA + 260, ty: -200, tz: 0, sx: 0, sy: 0 };
  const PF = { yaw: 7, pitch: 11, f: 1500, dist: 900, tx: XA - 240, ty: -330, tz: 0, sx: 0, sy: 0 };
  const P3 = { yaw: -22, pitch: 7, f: 1500, dist: 3000, tx: -200, ty: -300, tz: 1200, sx: 0, sy: 0 };
  function cam(t) {
    let c = lerpCam({ ...P0, dist: 1900, tx: XI - 300 }, P0, E.outQuint(inv(T.seribu - .3, T.seribu + .5, t)));
    c.dist -= 60 * inv(T.seribu, T.amerika, t);                                         // never static: slow push in the hold
    c = lerpCam(c, P1, E.snap(inv(T.amerika - .06, T.amerika + .3, t)));                 // whip to the US lane
    c.dist -= 40 * inv(T.amerika + .3, T.dua - .2, t);
    c = lerpCam(c, PF, E.inOutCubic(inv(T.dua - .45, T.dua + .2, t)));                   // step beside the row
    const fly = inv(T.dua - .15, T.ribu + .02, t), zEnd = (N - 1) * GAP;                 // fly the whole row
    c.tz = lerp(c.tz, zEnd, E.inOutCubic(fly)); c.yaw += 3 * Math.sin(fly * Math.PI);
    const back = E.brake(inv(T.ribu + .05, T.ribu + 1.0, t));                            // zoom back: the reveal
    const from = { ...c };
    c = lerpCam(from, P3, back);
    c.tz = lerp(from.tz, P3.tz, E.outExpo(inv(T.ribu + .05, T.ribu + .7, t)));
    c.dist += 120 * inv(T.ribu + 1, T.end, t);
    c.back = back;
    return c;
  }

  function quad(ctx, pr, levels, x, z, a, foc) {         // a standing card, base on the floor (y = 0)
    const p0 = pr(x - CW / 2, -CH, z), p1 = pr(x + CW / 2, -CH, z), p3 = pr(x - CW / 2, 0, z);
    if (p0.z < 60) return;
    const blur = Math.abs(p0.z - foc) / p0.z * 26, lv = Math.min(BL.length - 1.001, blur < BL[1] ? blur / BL[1] : 1 + Math.log2(blur / BL[1] + 1));
    const l0 = Math.floor(lv), fr = lv - l0, img0 = levels[l0], img1 = levels[l0 + 1];
    const m = (img, al) => {
      ctx.setTransform((p1.x - p0.x) / img.width, (p1.y - p0.y) / img.width, (p3.x - p0.x) / img.height, (p3.y - p0.y) / img.height, p0.x, p0.y);
      ctx.globalAlpha = al; ctx.drawImage(img, 0, 0);
    };
    // contact shadow
    const b = pr(x, 0, z); ctx.setTransform(1, 0, 0, .14, b.x, b.y); ctx.globalAlpha = .5 * a;
    const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 210 * b.s); gr.addColorStop(0, 'rgba(0,0,0,.9)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr; ctx.fillRect(-220 * b.s, -220 * b.s, 440 * b.s, 440 * b.s);
    m(img0, a); if (fr > .02 && img1) m(img1, a * fr);
    const fog = clamp((p0.z - 1400) / 16000) * .78;
    if (fog > 0) { ctx.globalAlpha = a * fog; ctx.fillStyle = ROOM; ctx.beginPath(); ctx.roundRect(0, 0, img0.width, img0.height, img0.width * .037); ctx.fill(); }
    ctx.globalAlpha = 1; ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function draw(ctx, t) {
    const c = cam(t), pr = camera(c), foc = lerp(c.dist, pr(XI, -CH / 2, 0).z, c.back);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    const hz = pr(0, 0, 1e6).y;                                                          // floor glow toward the horizon
    let gr = ctx.createLinearGradient(0, hz - 260, 0, H); gr.addColorStop(0, 'rgba(241,239,230,0)'); gr.addColorStop(.3, 'rgba(241,239,230,.05)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    // floor ticks along the US lane: one per card, numbered every 20
    ctx.strokeStyle = 'rgba(241,239,230,.16)'; ctx.lineWidth = 1.5; ctx.fillStyle = 'rgba(241,239,230,.35)';
    for (let i = 0; i < N; i++) {
      const a = pr(XA - 260, 0, i * GAP), b = pr(XA - 200, 0, i * GAP); if (a.z < 60) continue;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      if ((i + 1) % 20 === 0 && a.s > .05) { setFont(ctx, `400 ${Math.max(9, 34 * a.s)}px "${MONO}"`); ctx.textAlign = 'right'; ctx.fillText(String(i + 1).padStart(3, '0'), a.x - 10 * a.s, a.y); ctx.textAlign = 'left'; }
    }
    // cards, far to near
    const items = [];
    const inA = E.outQuint(inv(T.amerika - .2, T.amerika + .4, t));
    for (let i = 0; i < N; i++) {
      const z = i * GAP, d = pr(XA, -CH / 2, z).z, stag = inv(T.amerika - .25 + Math.min(i, 30) * .012, T.amerika + .15 + Math.min(i, 30) * .012, t);
      if (stag > 0 || t > T.dua) items.push({ d, f: () => quad(ctx, pr, tex.us, XA, z - (1 - E.outQuint(stag)) * 900, Math.max(stag, t > T.dua ? 1 : 0) * .96, foc) });
    }
    const inI = E.outQuint(inv(T.seribu - .3, T.seribu + .45, t));
    items.push({ d: pr(XI, -CH / 2, 0).z, f: () => quad(ctx, pr, tex.id, XI - (1 - inI) * 900, 0, inI, foc) });
    items.sort((a, b) => b.d - a.d).forEach(it => it.f());
    type(ctx, t, pr);
  }

  function fallText(ctx, str, x, base, t0, t, size, col, stag = .03) {
    setFont(ctx, `400 ${size}px "${DISP}"`); let cx = x;
    for (let i = 0; i < str.length; i++) {
      const w = ctx.measureText(str[i]).width, k = E.expo16((t - t0 - i * stag) / .22);
      if (k > 0) { ctx.save(); ctx.translate(cx + w / 2, base - size * .35 + (1 - k) * 50); ctx.scale(lerp(2, 1, k), lerp(2, 1, k)); ctx.globalAlpha *= clamp(k * 3); ctx.fillStyle = col; ctx.fillText(str[i], -w / 2, size * .35); ctx.restore(); }
      cx += w;
    }
    return cx - x;
  }
  function type(ctx, t, pr) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.textBaseline = 'alphabetic';
    // Indonesia: lead + number beside the lone card
    const outI = inv(T.amerika - .1, T.amerika + .15, t);
    if (t > T.seribu && outI < 1) {
      ctx.globalAlpha = 1 - outI; ctx.fillStyle = IVORY; setFont(ctx, `italic 380 64px "${SER}"`); ctx.fillText('Indonesia', 1060, 420);
      fallText(ctx, '1.931', 1056, 640, T.seribu + .05, t, 230, IVORY);
      const k = E.outCubic(inv(T.permohonan, T.permohonan + .4, t)); ctx.globalAlpha = (1 - outI) * k;
      setFont(ctx, `400 26px "${MONO}"`, 3); ctx.fillStyle = 'rgba(241,239,230,.7)'; ctx.fillText('PERMOHONAN PATEN RESIDEN · 2024', 1064, 700);
      ctx.globalAlpha = 1;
    }
    // legend + counter during the US lane
    const lg = E.outCubic(inv(T.amerika + .2, T.amerika + .6, t)) * (1 - inv(T.ribu, T.ribu + .25, t));
    if (lg > 0) {
      ctx.globalAlpha = lg; setFont(ctx, `700 22px "${MONO}"`, 4); ctx.fillStyle = 'rgba(241,239,230,.8)'; ctx.fillText('1 KARTU = 1.931 PERMOHONAN', 120, 118);
      const fly = E.inOutCubic(inv(T.dua - .15, T.ribu + .02, t)), n = Math.max(1, Math.min(N, Math.round(1 + fly * (N - 1))));
      setFont(ctx, `400 150px "${DISP}"`); ctx.fillStyle = IVORY; ctx.textAlign = 'right';
      const outC = inv(T.ribu + .3, T.ribu + .6, t); ctx.globalAlpha = lg * (1 - outC);
      ctx.fillText(String(n).padStart(3, '0'), 1800, 980); setFont(ctx, `400 24px "${MONO}"`, 3); ctx.fillText('KARTU AMERIKA', 1800, 1016); ctx.textAlign = 'left';
      ctx.globalAlpha = 1;
    }
    // reveal: Indonesia small above its lone card, US big above the horizon, source bottom-left
    if (t > T.ribu) {
      const kI = E.outCubic(inv(T.ribu + .35, T.ribu + .75, t)), pI = pr(XI, 0, 0);
      if (kI > 0) { ctx.globalAlpha = kI; ctx.fillStyle = 'rgba(241,239,230,.8)'; setFont(ctx, `700 22px "${MONO}"`, 4); ctx.textAlign = 'center';
        ctx.fillText('INDONESIA · 1.931', pI.x, pI.y + 44 + (1 - kI) * 20); ctx.textAlign = 'left'; ctx.globalAlpha = 1; }
      ctx.fillStyle = IVORY; setFont(ctx, `italic 380 64px "${SER}"`);
      ctx.globalAlpha = E.outCubic(inv(T.ribu + .1, T.ribu + .5, t)); ctx.fillText('Amerika Serikat', 124, 150); ctx.globalAlpha = 1;
      fallText(ctx, '270.295', 120, 360, T.ribu + .18, t, 230, IVORY, .028);
      const k = E.snap(inv(T.ribu + .75, T.ribu + .95, t));
      if (k > 0) {
        setFont(ctx, `400 100px "${DISP}"`); const w = ctx.measureText('±140×').width;
        ctx.fillStyle = LIME; ctx.fillRect(124, 386, (w + 40) * k, 118);
        ctx.save(); ctx.beginPath(); ctx.rect(124, 386, (w + 40) * k, 118); ctx.clip(); ctx.fillStyle = LIME_INK; ctx.fillText('±140×', 144, 486); ctx.restore();
        ctx.globalAlpha = E.outCubic(inv(T.ribu + .95, T.ribu + 1.3, t)); setFont(ctx, `400 22px "${MONO}"`, 2); ctx.fillStyle = 'rgba(241,239,230,.7)';
        ctx.fillText('Sumber: WIPO, 2024 · rasio dihitung dari 1.931 vs 270.295', 120, 1030); ctx.globalAlpha = 1;
      }
    }
  }
  function post(o) {                                     // neutral vignette
    const gr = o.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * 1.05); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.55)');
    o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.fillStyle = gr; o.fillRect(0, 0, W, H);
  }
  return scene;
}
