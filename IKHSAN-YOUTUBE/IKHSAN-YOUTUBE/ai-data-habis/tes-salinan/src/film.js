// Tes "Salinan Pudar" (signature motif #1, ai-data-habis · tema ASLI atau SALINAN?). One shot, own camera.
// Idea: a handwritten recipe card (the ASLI) lies on glass; we look up at it from under the copier. Each copy is a new glass
// plate one step deeper in Z, born behind a scan-light bar that sweeps the source and the copy in sync. Every generation is
// really computed from the one before it (blur + contrast + grey + toner + misregistration), so light marks (ruled lines, the
// pencil note, the blue-ballpoint signature) wash out first while the ink bloats. Camera: ASLI → salinan 1 on "Lembar",
// snap→hold to 3 on "ketiga", rush through the strobe of scan bars to 10 on "kesepuluh", cut-in to the corner on "tanda tangan";
// on "ilang" the original signature flashes back as the one lime ghost and dissolves, leaving the grey smudge.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, ROOM, ivo, setFont, DISP, MONO, timing, makeChapter, txt, rnd, mk } from './kit.js';

const MN = (s, w = 700) => `${w} ${s}px "${MONO}"`, DSP = s => `400 ${s}px "${DISP}"`;
const HAND = 'Caveat', SIGF = 'Reenie Beanie';
const DW = 1400, DH = 950, NG = 11;                                  // card px = world units; plate 0 = ASLI, 1..10 = salinan
const SIG = { x: 930, y: 735, w: 400, h: 170 };                      // signature corner on the card
const F = 1400, GAP = 900, DX = -560, DY = 70;                        // lens + row spacing (deeper plates step left/down)
const plate = g => ({ x: g * DX, y: g * DY, z: g * GAP });

export function makeFilm() {
  const { T: A } = timing(B);
  const GEN = [];                                                     // GEN[g] = canvas of generation g
  let SIGC = null;                                                    // the original signature alone, lime-tinted

  function card(c) {                                                  // the ASLI: index card, ruled, handwritten
    c.fillStyle = '#ECE4D0'; c.fillRect(0, 0, DW, DH);
    for (let i = 0; i < 2600; i++) { c.fillStyle = `rgba(120,96,60,${.025 + .03 * rnd(i + 7)})`; c.fillRect(rnd(i) * DW, rnd(i + 3) * DH, 1 + 2 * rnd(i + 5), 1); }
    c.strokeStyle = 'rgba(120,150,190,.55)'; c.lineWidth = 2;
    for (let y = 190; y < DH - 40; y += 62) { c.beginPath(); c.moveTo(40, y); c.lineTo(DW - 40, y); c.stroke(); }
    c.strokeStyle = 'rgba(200,110,100,.6)'; c.beginPath(); c.moveTo(96, 30); c.lineTo(96, DH - 30); c.stroke();
    const ring = c.createRadialGradient(1190, 230, 70, 1190, 230, 112);   // tea ring: light, erodes early
    ring.addColorStop(0, 'rgba(160,120,70,0)'); ring.addColorStop(.55, 'rgba(160,120,70,.16)'); ring.addColorStop(.7, 'rgba(160,120,70,.05)'); ring.addColorStop(1, 'rgba(160,120,70,0)');
    c.fillStyle = ring; c.fillRect(1060, 100, 260, 260);
    const ink = '#1C2640';
    c.fillStyle = ink; c.textAlign = 'left';
    c.font = `700 84px "${HAND}"`; c.save(); c.translate(130, 128); c.rotate(-.012); c.fillText('Resep Kue Lumpur', 0, 0); c.restore();
    c.font = `600 50px "${HAND}"`;
    ['Bahan:', '– 250 gr kentang kukus', '– 3 butir telur', '– 400 ml santan', '– 150 gr gula pasir', '– 125 gr terigu', '– sejumput garam']
      .forEach((s, i) => { c.save(); c.translate(130 + (i ? 14 : 0), 236 + i * 62); c.rotate((rnd(i + 40) - .5) * .014); c.fillText(s, 0, 0); c.restore(); });
    ['Cara:', 'kocok telur + gula', 'sampai kental, masuk', 'kentang & santan', 'sedikit-sedikit.']
      .forEach((s, i) => { c.save(); c.translate(720, 236 + i * 62); c.rotate((rnd(i + 60) - .5) * .014); c.fillText(s, 0, 0); c.restore(); });
    c.fillStyle = 'rgba(70,70,74,.42)'; c.font = `500 40px "${HAND}"`;                  // pencil note: first to go
    c.save(); c.translate(140, 700); c.rotate(-.03); c.fillText('*jangan dibuka sebelum 15 menit!', 0, 0); c.restore();
    sign(c, 'rgba(70,100,175,.62)');
  }
  function sign(c, col) {                                             // blue ballpoint signature + flourish, thin & light
    c.save(); c.translate(SIG.x + 30, SIG.y + 105); c.rotate(-.08);
    c.fillStyle = col; c.strokeStyle = col; c.font = `400 104px "${SIGF}"`; c.textAlign = 'left'; c.fillText('Mbah Sum', 0, 0);
    c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(-10, 22); c.bezierCurveTo(90, 52, 230, -6, 340, 30); c.stroke();
    c.restore();
  }
  function copy(prev, g) {                                            // one pass through the copier
    const [C, c] = mk(DW, DH);
    c.fillStyle = '#ECEBE6'; c.fillRect(0, 0, DW, DH);
    c.filter = `blur(${(.7 + .06 * g).toFixed(2)}px)`;
    c.save(); c.translate(DW / 2 + (rnd(g * 3) - .5) * 4, DH / 2 + (rnd(g * 3 + 1) - .3) * 3); c.rotate((rnd(g * 3 + 2) - .5) * .005);
    c.drawImage(prev, -DW / 2, -DH / 2); c.restore(); c.filter = 'none';
    const im = c.getImageData(0, 0, DW, DH), d = im.data, MIX = .3;     // toner curve: dark ink -> darker/fatter, light marks -> paper
    for (let i = 0; i < d.length; i += 4) {
      const L = (.3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]) / 255, s = 1 / (1 + Math.exp(-(L - .5) * 12)), tl = (.08 + .87 * s) * 255;
      for (let j = 0; j < 3; j++) { const gr = lerp(d[i + j], L * 255, .35); d[i + j] = lerp(gr, tl, MIX); }
    }
    c.putImageData(im, 0, 0);
    c.fillStyle = 'rgba(28,28,30,.6)';                                 // toner speckle, denser at the edges
    for (let i = 0; i < 120 + g * 45; i++) {
      const e = rnd(i + g * 977), x = e < .5 ? rnd(i + 11 + g) * DW : (rnd(i + 13 + g) < .5 ? rnd(i + 17) * 90 : DW - rnd(i + 17) * 90);
      c.beginPath(); c.arc(x, rnd(i + 19 + g * 7) * DH, .5 + 1.0 * rnd(i + 23), 0, 7); c.fill();
    }
    const ed = c.createLinearGradient(0, 0, 40 + 6 * g, 0);              // lid shadow on the left edge, grows
    ed.addColorStop(0, `rgba(30,30,32,${.08 + .035 * g})`); ed.addColorStop(1, 'rgba(30,30,32,0)'); c.fillStyle = ed; c.fillRect(0, 0, 40 + 6 * g, DH);
    c.fillStyle = `rgba(40,40,44,${.012 * g})`; c.fillRect(1004, 0, 2, DH); // drum streak
    if (g >= 4) {                                                      // toner smear settles where the signature was: irregular, streaky
      c.save(); c.translate(SIG.x + 200, SIG.y + 95);
      for (let i = 0; i < 7; i++) {
        const ex = (rnd(i + 70) - .5) * 260, ey = (rnd(i + 71) - .5) * 90, rx = 60 + 90 * rnd(i + 72), ry = 14 + 26 * rnd(i + 73);
        const r = c.createRadialGradient(ex, ey, 0, ex, ey, rx); r.addColorStop(0, `rgba(80,80,84,${.035 * (g - 3) * (.5 + rnd(i + 74))})`); r.addColorStop(1, 'rgba(80,80,84,0)');
        c.save(); c.translate(ex, ey); c.scale(1, ry / rx); c.rotate((rnd(i + 75) - .5) * .3); c.translate(-ex, -ey); c.fillStyle = r; c.fillRect(ex - rx, ey - rx, 2 * rx, 2 * rx); c.restore();
      }
      c.fillStyle = `rgba(70,70,74,${.03 * (g - 3)})`; for (let i = 0; i < 5; i++) c.fillRect(-170 + rnd(i + 80) * 60, -40 + i * 19 + rnd(i + 81) * 8, 220 + 120 * rnd(i + 82), 2 + 3 * rnd(i + 83));
      c.restore();
    }
    return C;
  }
  async function load() {
    await document.fonts.load(`700 84px "${HAND}"`); await document.fonts.load(`400 104px "${SIGF}"`);
    const [O, o] = mk(DW, DH); card(o); GEN.push(O);
    for (let g = 1; g < NG; g++) GEN.push(copy(GEN[g - 1], g));
    const [S, s] = mk(DW, DH); sign(s, LIME); SIGC = S;
  }

  // ── timeline (film time) ──────────────────────────────────────────────────────────────────────────────────
  const born = g => g === 0 ? [-1, -.5] : g === 1 ? [A.l1 - .32, A.l1 + .12] : g === 2 ? [A.tajam - .2, A.tajam + .24]
    : g === 3 ? [A.tajam + .3, A.l3 - .02] : [A.pas - .28 + (g - 4) * .15, A.pas - .06 + (g - 4) * .15];
  function fg(t) {                                                    // which generation the camera is on (float)
    let v = E.brake(inv(A.l1 - .06, A.l1 + .5, t));
    v = lerp(v, 3, E.snap(inv(A.l3 - .04, A.l3 + .5, t)));
    v = lerp(v, 10, E.inOutQuart(inv(A.pas - .02, A.tanda - .08, t)));
    return v;
  }
  function cam(t) {
    const g = fg(t), p = plate(g), z = E.brake(inv(A.tanda - .1, A.tanda + .42, t));   // z: cut-in to the corner
    const dist = lerp(2060 - 70 * Math.sin(t * .55), 860 - 70 * inv(A.tanda + .4, A.doang + .6, t), z);
    const cx = p.x + DW / 2 + lerp(-300, SIG.x + SIG.w / 2 - DW / 2 - 120, z), cy = p.y + DH / 2 + lerp(30, SIG.y + SIG.h / 2 - DH / 2 - 60, z);
    const s = t - (A.tanda - .1), kick = s > 0 ? 7 * Math.exp(-s / .08) : 0;
    return { x: cx + 6 * Math.sin(t * .9), y: cy + 4 * Math.cos(t * .7) + kick * Math.sin(s * 90), z: p.z - dist, foc: p.z, g, roll: .006 * Math.sin(t * .6) };
  }
  const proj = (c, x, y, z) => { const k = F / (z - c.z); return [W / 2 + (x - c.x) * k, H / 2 + (y - c.y) * k, k]; };

  function bar(ctx, x0, y0, w, k, alpha) {                            // scan light: bright core + soft spill, along the card width
    const h = 190 * k; ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(0, y0 - h, 0, y0 + h); g.addColorStop(0, 'rgba(241,239,230,0)'); g.addColorStop(.5, `rgba(241,239,230,${.34 * alpha})`); g.addColorStop(1, 'rgba(241,239,230,0)');
    ctx.fillStyle = g; ctx.fillRect(x0 - 30 * k, y0 - h, w + 60 * k, 2 * h);
    ctx.fillStyle = `rgba(250,249,244,${.85 * alpha})`; ctx.fillRect(x0 - 30 * k, y0 - 2.5 * k - 1, w + 60 * k, 5 * k + 2);
    ctx.restore();
  }

  function drawPlate(ctx, c, g, t) {
    const p = plate(g), dz = p.z - c.z; if (dz < 260 || c.g - g > .67) return;
    const [x, y, k] = proj(c, p.x, p.y, p.z), w = DW * k, h = DH * k;
    if (x > W + 50 || x + w < -50 || y > H + 50 || y + h < -50) return;
    const near = clamp((dz - 260) / 700) * clamp(1 - (c.g - g) * 1.5), blur = Math.min(16, Math.abs(p.z - c.foc) / dz * 13);
    const [b0, b1] = born(g), q = inv(b0, b1, t);
    ctx.save(); ctx.globalAlpha = near;
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.filter = `blur(${(26 * k + blur).toFixed(1)}px)`; ctx.fillRect(x + 18 * k, y + 30 * k, w, h);   // plate shadow
    const m = 34 * k;                                                  // glass pane, a little larger than the card
    ctx.filter = blur > .4 ? `blur(${blur.toFixed(1)}px)` : 'none';
    ctx.fillStyle = 'rgba(241,239,230,.035)'; ctx.fillRect(x - m, y - m, w + 2 * m, h + 2 * m);
    ctx.strokeStyle = ivo(.2); ctx.lineWidth = Math.max(1, 2 * k); ctx.strokeRect(x - m, y - m, w + 2 * m, h + 2 * m);
    if (q > 0) {
      const yb = y + lerp(-.04, 1.04, q) * h;
      ctx.save(); ctx.beginPath(); ctx.rect(x - 2, y - 2, w + 4, Math.max(0, yb - y) + 2); ctx.clip();
      ctx.drawImage(GEN[g], x, y, w, h); ctx.restore();
      const gl = ctx.createLinearGradient(x - m, y - m, x + w * .6, y + h);   // glass sheen over the card
      gl.addColorStop(0, ivo(.10)); gl.addColorStop(.35, ivo(0)); ctx.fillStyle = gl; ctx.fillRect(x - m, y - m, w + 2 * m, h + 2 * m);
      ctx.filter = 'none';
      if (q < 1) bar(ctx, x, yb, w, k, near * Math.sin(Math.PI * clamp(q * 1.02)));
    }
    ctx.filter = 'none';
    const [c0, c1] = born(g + 1), qs = inv(c0, c1, t);                // the source is swept by the same light while it copies
    if (g + 1 < NG && qs > 0 && qs < 1) bar(ctx, x, y + lerp(-.04, 1.04, qs) * h, w, k, .7 * near * Math.sin(Math.PI * qs));
    if (q > .3 && blur < 9) {                                          // plate label, in the plate plane
      ctx.globalAlpha = near * clamp((q - .3) * 3) * (1 - blur / 9);
      if (g === 0) { const s = Math.max(14, 30 * k); setFont(ctx, MN(s), 3); const tw = ctx.measureText('ASLI').width + s * 1.3;
        ctx.fillStyle = LIME; ctx.fillRect(x, y - m - 1.9 * s, tw, 1.7 * s); ctx.fillStyle = '#1B2400'; ctx.fillText('ASLI', x + .65 * s, y - m - .7 * s); }
      else { setFont(ctx, MN(Math.max(12, 26 * k)), 4); ctx.fillStyle = ivo(.72); ctx.fillText(`SALINAN ${String(g).padStart(2, '0')}`, x, y - m - 16 * k); }
    }
    ctx.restore();
  }

  function draw(ctx, t) {
    const c = cam(t);
    ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(W * .6, H * .45, 60, W * .6, H * .45, W * .75);   // cool light leaking under the glass
    bg.addColorStop(0, '#20262A'); bg.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(c.roll); ctx.translate(-W / 2, -H / 2);
    const v = Math.abs(fg(t + .02) - fg(t - .02)) / .04;               // camera speed, generations / s
    for (let i = 0; i < 14; i++) {                                      // far toner dust between the plates
      const z = c.z + 600 + rnd(i + 300) * 9000, [x, y, k] = proj(c, -2400 + rnd(i + 301) * 4600 - 900, -900 + rnd(i + 302) * 2600, z);
      ctx.fillStyle = ivo(.05 + .05 * rnd(i + 303)); ctx.beginPath(); ctx.arc(x, y, (3 + 6 * rnd(i + 304)) * k, 0, 7); ctx.fill();
    }
    for (let g = NG - 1; g >= 0; g--) drawPlate(ctx, c, g, t);
    const z = E.brake(inv(A.tanda - .1, A.tanda + .42, t));             // the lime ghost of the original signature
    if (t > A.ilang - .05 && t < A.tinggal + 1.2) {
      const p = plate(10), [x, y, k] = proj(c, p.x, p.y, p.z), rv = E.outCubic(inv(A.ilang - .05, A.ilang + .35, t)), out = inv(A.tinggal - .1, A.tinggal + 1.0, t);
      ctx.save(); ctx.globalAlpha = .9 * (1 - E.inCubic(out)); ctx.filter = out > 0 ? `blur(${(10 * out).toFixed(1)}px)` : 'none';
      ctx.beginPath(); ctx.rect(x + SIG.x * k, y + (SIG.y - 40) * k, SIG.w * rv * k, (SIG.h + 80) * k); ctx.clip();
      ctx.drawImage(SIGC, x, y - 40 * out * k, DW * k, DH * k); ctx.restore();
    }
    ctx.restore();
    for (let i = 0; i < 7; i++) {                                       // FG motes: strongest parallax, streak with camera speed
      const px = (rnd(i + 600) * W * 1.4 - c.x * .35 + 4000) % (W * 1.4) - W * .2, py = rnd(i + 601) * H, r = 18 + 34 * rnd(i + 602), L = Math.min(260, v * 26);
      ctx.save(); ctx.translate(px, py); ctx.scale(1 + L / r, 1);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, ivo(.06)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.restore();
    }
    // HUD: generation counter, bottom-left (counts what the VO says: 1, 3, 10)
    const n = Math.round(c.g), hud = (1 - z * .85) * E.outCubic(inv(A.l1 - .1, A.l1 + .3, t));
    if (n >= 1 && hud > 0) {
      ctx.globalAlpha = hud; txt(ctx, 'SALINAN KE-', 92, 860, t, A.l1 - .1, MN(22), { ls: 5, col: ivo(.7), rise: 10 });
      setFont(ctx, DSP(230), 2); ctx.fillStyle = IVORY; ctx.fillText(String(n).padStart(2, '0'), 86, 1060 - 40 * (1 - E.outQuint(inv(A.l1 - .1, A.l1 + .25, t))));
      ctx.globalAlpha = 1;
    }
    if (t > A.noda - .05) {                                              // closing caption, beside the smudge
      ctx.globalAlpha = 1 - inv(B.END + B.VOFF + .3, B.END + B.VOFF + .7, t);
      txt(ctx, 'TANDA TANGAN: HILANG', 1760, 960, t, A.noda - .05, MN(28), { ls: 5, col: ivo(.9), align: 'right', rise: 14 });
      txt(ctx, 'tinggal noda toner', 1760, 1004, t, A.noda + .25, MN(22, 400), { ls: 2, col: ivo(.65), align: 'right', rise: 10 });
      ctx.globalAlpha = 1;
    }
  }

  const ch = makeChapter({ B, ST: [{ at: 0, draw() {} }], load, label: 'TES · SALINAN PUDAR' });
  ch.draw = draw;
  return ch;
}
