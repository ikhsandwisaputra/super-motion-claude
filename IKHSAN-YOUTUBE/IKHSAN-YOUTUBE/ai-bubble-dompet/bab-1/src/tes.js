// Bab 1 · the approved 3-s test (tes-gelembung, "gilakkk cakeppp") as a module: VO 04 28.0–33.6, drawn full-screen by bab-1/src/film.js.
// Tes 3 detik "Gelembung pecah" (signature motif #1, ai-bubble-dompet). One shot, own camera (not the station row).
// Idea: the real thing (Ahpo A02 DRAM die = NILAI ASLI) sits in a glass bubble = HARGA. The bubble is pumped on the stressed
// words (harga · jauh · mahal) while the camera pulls back and the bubble bleeds out of frame; it trembles on "dari",
// pops on "nilai" (skin shreds, shock ring, droplets, FG bokeh, 1-frame flash, camera kick) and the camera brakes back
// onto the die, which never moved: NILAI ASLI (the one lime word) lands on "aslinya". No invented numbers on screen.
import { W, H, clamp, inv, lerp, E, spring, IVORY, ivo, setFont, DISP, MONO, loadImg, slab, txt, srcTag, rnd, mk } from './kit.js';

const DSP = s => `400 ${s}px "${DISP}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const PW = 4000, PH = 2250, FLOOR = 1890, R0 = 840;                     // Ahpo plate space (original px)
const DIE = { x0: 1870, y0: 979, x1: 3421, y1: 1900, cx: 2645, cy: 1440 };
const SH = 'rgba(241,239,230,';

export function makeTes(A) {                                  // A = Bab 1 timing (keys gel harga jauh mahal dari nilai asli)
  const POP = A.nilai - .03, PUMPS = [[A.harga, .42], [A.jauh, .42], [A.mahal, .5]];
  const IM = {};

  async function load() {
    const base = '../assets/shared/ahpo/A02/';
    const bg = await loadImg(base + 'A02_01_BG_studio.png', 1600), kb = bg.width / PW, P = 2000;   // soft studio: 40 %
    const [X, g] = mk(Math.round((PW + 2 * P) * kb), Math.round((PH + 2 * P) * kb)), p = Math.round(P * kb), w = bg.width, h = bg.height;
    g.drawImage(bg, p, p);                                              // edge-clamp so the camera can pull past the plate
    g.drawImage(bg, 0, 0, 1, h, 0, p, p, h); g.drawImage(bg, w - 1, 0, 1, h, p + w, p, X.width - p - w, h);
    g.drawImage(X, 0, p, X.width, 1, 0, 0, X.width, p); g.drawImage(X, 0, p + h - 1, X.width, 1, 0, p + h, X.width, X.height - p - h);
    IM.bg = { c: X, k: kb, off: P };
    const k = .6, [O, og] = mk(PW * k, PH * k);
    for (const n of ['02_MG_pantulan', '03_MG_bayangan-modul-ram', '04_MG_modul-ram-belakang', '05_MG_modul-ram-depan', '06_FG_bayangan-die', '07_FG_die-dram-plakat'])
      og.drawImage(await loadImg(`${base}A02_${n}.png`, PW * k), 0, 0);
    og.globalCompositeOperation = 'destination-out';                  // reflection fades before the plate edge
    const fd = og.createLinearGradient(0, 2020 * k, 0, PH * k); fd.addColorStop(0, 'rgba(0,0,0,0)'); fd.addColorStop(1, 'rgba(0,0,0,1)');
    og.fillStyle = fd; og.fillRect(0, 2020 * k, PW * k, (PH - 2020) * k);
    IM.obj = { c: O, k }; IM.glint = { c: await loadImg(base + 'A02_08_FG_kilau-kaca-die.png', PW * k), k };
  }

  // ── bubble size (× R0) and camera ────────────────────────────────────────────────────────────────────────
  const mult = t => t < A.gel ? 0 : .15 + .85 * spring(t - A.gel, .5, .5) + .05 * (t - A.gel)
    + PUMPS.reduce((s, [t0, d]) => s + d * E.snap(inv(t0, t0 + .26, t)), 0);
  const wob = t => PUMPS.reduce((s, [t0]) => t < t0 ? s : s + .035 * Math.exp(-(t - t0) / .25) * Math.sin(2 * Math.PI * (t - t0) / .19), 0)
    + (t > A.dari && t < POP ? .011 * Math.sin(2 * Math.PI * 27 * t) * inv(A.dari, POP, t) : 0);
  const ZK = [[A.harga, 1.0], [A.jauh, .86], [A.mahal, .74]];
  function cam(t) {
    let z = lerp(1.13, 1.2, E.inOutSine(inv(A.gel - .45, A.gel + .4, t)));
    for (const [t0, v] of ZK) z = lerp(z, v, E.brake(inv(t0 + .04, t0 + .55, t)));
    const s = t - POP; let fy = 250 + 110 * clamp((Math.min(mult(t), 2.5) - 1) / 1.5), dx = 0, dy = 0;
    if (s > 0) {
      const b = E.brake(inv(.12, 1.25, s)); z = lerp(z, 1.08, b) + .03 * Math.exp(-s / .1) * (s < .02 ? s / .02 : 1); fy = lerp(fy, 215, b);
      const sh = 9 * Math.exp(-s / .09); dx = sh * Math.sin(s * 95); dy = sh * Math.cos(s * 77);
    }
    const S = .42 * z, Fx = DIE.cx - 30 + 40 * Math.sin(t * .5);
    return { S, Fx, Fy: FLOOR - fy / S, dx, dy };
  }
  const scr = (c, x, y, d = 1) => [W / 2 + (x - c.Fx) * c.S * d + c.dx, H / 2 + (y - c.Fy) * c.S * d + c.dy];

  function bubblePath(ctx, c, cx, cy, r, t) {                         // screen-space outline, wobble, flattened on the floor
    const a = wob(t), ph = t * 1.7, fl = scr(c, 0, FLOOR)[1], pts = [];
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const th = i / 120 * Math.PI * 2, rr = r * (1 + a * Math.sin(2 * th + ph) + a * .6 * Math.sin(3 * th - ph * 1.3));
      let x = cx + rr * Math.cos(th), y = cy + rr * Math.sin(th); if (y > fl) y = fl + (y - fl) * .28;
      pts.push([x, y]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath(); return pts;
  }

  function drawBubble(ctx, c, t) {
    const m = mult(t); if (m <= 0 || t >= POP) return;
    const R = R0 * m, [cx, cy] = scr(c, DIE.cx, FLOOR - .82 * R), r = R * c.S, ten = inv(A.dari - .1, POP, t);
    ctx.save(); bubblePath(ctx, c, cx, cy, r, t); ctx.clip();
    const gi = ctx.createRadialGradient(cx - .2 * r, cy - .25 * r, 0, cx, cy, r);  // fresnel: clear centre, denser rim
    gi.addColorStop(0, SH + '0)'); gi.addColorStop(.7, SH + '.025)'); gi.addColorStop(.93, SH + '.09)'); gi.addColorStop(1, SH + '.24)');
    ctx.fillStyle = gi; ctx.fillRect(cx - r * 1.2, cy - r * 1.2, r * 2.4, r * 2.4);
    ctx.globalCompositeOperation = 'screen';                            // thin film: muted, never neon
    const cg = ctx.createConicGradient(t * .9, cx, cy), fa = .10 + .22 * ten;
    [['#C9B89A', 0], ['#8FA5A3', .3], ['#A79BB3', .55], ['#B8A88C', .8], ['#C9B89A', 1]].forEach(([col, s]) => cg.addColorStop(s, col));
    ctx.strokeStyle = cg;
    for (let i = 0; i < 5; i++) { ctx.globalAlpha = fa * (1 - i / 5); ctx.lineWidth = r * .035; ctx.save(); ctx.translate(cx, cy); ctx.scale(.965 - i * .03, .965 - i * .03); ctx.translate(-cx, -cy); bubblePath(ctx, c, cx, cy, r, t); ctx.stroke(); ctx.restore(); }
    ctx.restore(); ctx.save(); ctx.globalAlpha = 1;
    bubblePath(ctx, c, cx, cy, r, t); ctx.strokeStyle = SH + (.5 + .3 * ten) + ')'; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.lineWidth = 7; ctx.strokeStyle = SH + '.08)'; ctx.stroke();
    const spec = (ang, d, w, h, a) => {                                 // window reflections ride the surface
      const x = cx + Math.cos(ang) * r * d, y = cy + Math.sin(ang) * r * d;
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang + Math.PI / 2); ctx.scale(1, h / w);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * w); g.addColorStop(0, SH + a + ')'); g.addColorStop(1, SH + '0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r * w, 0, 7); ctx.fill(); ctx.restore();
    };
    spec(-2.3, .74, .26, .07, .55 + .2 * ten); spec(-2.25, .8, .03, .03, .9); spec(.75, .8, .13, .035, .22);
    const fl = scr(c, 0, FLOOR)[1];                                     // contact line on the floor
    ctx.globalAlpha = .18; ctx.strokeStyle = IVORY; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, fl + 2, r * .55, r * .03, 0, 0, 7); ctx.stroke();
    ctx.restore();
    // HARGA rides the bubble: grows and stretches with it
    if (t > A.harga - .05) {
      const k = E.outQuint(inv(A.harga - .05, A.harga + .3, t)), lx = cx - .12 * r, ly = Math.max(cy - .42 * r, 230);
      ctx.save(); ctx.globalAlpha = k * (1 - .4 * ten); setFont(ctx, DSP(Math.round(r * .17)), Math.max(0, (m - 1) * 26));
      ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('HARGA', lx, ly + (1 - k) * 30); ctx.restore();
    }
  }

  function drawPop(ctx, c, t) {
    const s = t - POP; if (s < 0 || s > 1.6) return;
    const R = R0 * mult(POP - 1e-3), [cx, cy] = scr(c, DIE.cx, FLOOR - .82 * R), r = R * c.S;
    ctx.save();
    if (s < .07) { ctx.globalAlpha = .2 * (1 - s / .07); bubblePath(ctx, c, cx, cy, r, POP); ctx.fillStyle = IVORY; ctx.fill(); }   // 1-frame flash
    if (s < .16) {                                                      // skin shreds tear outward
      const q = E.outCubic(s / .16); ctx.globalAlpha = .55 * (1 - s / .16); ctx.strokeStyle = IVORY; ctx.lineWidth = 2.5 * (1 - q) + .5;
      ctx.beginPath();
      for (let i = 0; i < 26; i++) { const a0 = i / 26 * Math.PI * 2 + rnd(i) * .1, rr = r * (1 + .5 * q * (.6 + rnd(i + 9)));
        ctx.moveTo(cx + rr * Math.cos(a0), cy + rr * Math.sin(a0)); ctx.arc(cx, cy, rr, a0, a0 + .12 + .1 * rnd(i + 3)); }
      ctx.stroke();
    }
    if (s < .3) { const q = E.outCubic(s / .3); ctx.globalAlpha = .3 * (1 - s / .3); ctx.lineWidth = 3 * (1 - q) + .5; ctx.strokeStyle = IVORY;
      ctx.beginPath(); ctx.arc(cx, cy, r * (1 + 1.1 * q), 0, 7); ctx.stroke(); }
    // droplets (world space, drag + gravity): one path, alpha bands
    const kd = 4.2, grav = 1500, fl = FLOOR;
    for (let band = 0; band < 3; band++) {
      ctx.globalAlpha = (.85 - band * .25) * (1 - inv(.35, 1.2, s)); ctx.fillStyle = IVORY; ctx.beginPath();
      for (let i = band; i < 180; i += 3) {
        let th = rnd(i) * Math.PI * 2; if (Math.sin(th) > .55) th = -th;
        const v = R * (1.1 + 1.9 * rnd(i + 50)), d = v / kd * (1 - Math.exp(-kd * s)), px0 = DIE.cx + R * Math.cos(th), py0 = fl - .82 * R + R * Math.sin(th);
        const wx = px0 + Math.cos(th) * d, wy = Math.min(fl, py0 + Math.sin(th) * d + .5 * grav * s * s);
        const [x, y] = scr(c, wx, wy), rad = (1.4 + 3.6 * rnd(i + 7)) * (1 - .5 * inv(0, 1.2, s));
        ctx.moveTo(x + rad, y); ctx.arc(x, y, rad, 0, 7);
      }
      ctx.fill();
    }
    for (let i = 0; i < 14; i++) {                                      // a few fly at the lens: soft FG bokeh
      const th = rnd(i + 300) * Math.PI * 2, sc = 1 + 3.2 * E.outCubic(s / .9), [x0, y0] = [cx + r * Math.cos(th), cy + r * Math.sin(th)];
      const x = W / 2 + (x0 - W / 2) * sc, y = H / 2 + (y0 - H / 2) * sc, rad = (14 + 30 * rnd(i + 301)) * sc, a = .16 * (1 - inv(.15, .9, s)) * inv(0, .04, s);
      if (a <= 0) continue; const g = ctx.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, SH + a + ')'); g.addColorStop(.7, SH + a * .6 + ')'); g.addColorStop(1, SH + '0)');
      ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    }
    {                                                                   // HARGA loses its letters: they fall (pure f(t))
      const m = mult(POP - 1e-3), hr = r, lx = cx - .12 * r, ly = Math.max(cy - .42 * r, 230); setFont(ctx, DSP(Math.round(hr * .17)), Math.max(0, (m - 1) * 26)); ctx.textAlign = 'left';
      const full = ctx.measureText('HARGA').width; let x = lx - full / 2;
      for (let i = 0; i < 5; i++) {
        const ch = 'HARGA'[i], wch = ctx.measureText(ch).width + Math.max(0, (m - 1) * 26), vx = (rnd(i + 70) - .5) * 520, vy = 260 + 420 * rnd(i + 71), om = (rnd(i + 72) - .5) * 7;
        ctx.save(); ctx.globalAlpha = .9 * (1 - inv(.1, .65, s)); ctx.translate(x + wch / 2 + vx * s, ly - vy * s + .5 * 3400 * s * s); ctx.rotate(om * s);
        ctx.fillStyle = IVORY; ctx.fillText(ch, -wch / 2 + Math.max(0, (m - 1) * 13), 0); ctx.restore(); x += wch;
      }
    }
    ctx.restore();
  }

  function draw(ctx, t) {
    const c = cam(t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0B0C09'; ctx.fillRect(0, 0, W, H);
    const { bg, obj, glint } = IM;
    if (bg) { const [x, y] = scr(c, -bg.off, -bg.off); ctx.drawImage(bg.c, x, y, bg.c.width / bg.k * c.S, bg.c.height / bg.k * c.S); }
    for (let i = 0; i < 9; i++) {                                       // BG dust, far: barely moves
      const [x, y] = scr(c, DIE.cx + (rnd(i + 500) - .5) * 9000, 300 + rnd(i + 501) * 1500 - 60 * t, .55), a = .05 + .05 * rnd(i + 502);
      ctx.globalAlpha = a; ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, y, 2 + 3 * rnd(i + 503), 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (obj) { const [x, y] = scr(c, 0, 0); ctx.drawImage(obj.c, x, y, PW * c.S, PH * c.S); }
    const s = t - POP, rev = s > 0 ? Math.exp(-Math.pow((s - .5) / .35, 2)) : 0;
    if (glint) { const [x, y] = scr(c, 0, 0); ctx.globalAlpha = .75 + .25 * rev; ctx.drawImage(glint.c, x, y, PW * c.S, PH * c.S); ctx.globalAlpha = 1; }
    if (s > .1 && s < 1.0) {                                            // light sweeps the die once it is free
      const [x0, y0] = scr(c, DIE.x0, DIE.y0), [x1, y1] = scr(c, DIE.x1, DIE.y1), q = E.inOutCubic(inv(.1, 1.0, s)), bx = lerp(x0 - 300, x1 + 300, q);
      ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip(); ctx.globalCompositeOperation = 'screen';
      const g = ctx.createLinearGradient(bx - 180, y0, bx + 180, y1); g.addColorStop(0, SH + '0)'); g.addColorStop(.5, SH + '.16)'); g.addColorStop(1, SH + '0)');
      ctx.fillStyle = g; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.restore();
    }
    // die caption, under the plaque (context, never the hero)
    const [lx, ly] = scr(c, DIE.x0 + 20, DIE.y1 + 70);
    txt(ctx, 'CHIP MEMORI · DRAM', lx, ly, t, A.gel - .25, MN(19), { ls: 4, col: ivo(.62), rise: 12 });
    drawBubble(ctx, c, t);
    drawPop(ctx, c, t);
    if (t > A.asli - .02) {                                             // the one lime word
      const [ax, ay] = scr(c, DIE.x0 + 90, DIE.y0 + 40), [tx, ty] = scr(c, DIE.x0 - 40, DIE.y0 - 260);
      slab(ctx, 'NILAI ASLI', tx, ty, t, A.asli - .02, { size: 34, lime: true, align: 'right', lx: ax, ly: ay });
    }
    for (let i = 0; i < 6; i++) {                                       // FG motes: strongest parallax
      const [x, y] = scr(c, DIE.cx + (rnd(i + 600) - .5) * 4200, 600 + rnd(i + 601) * 1200 + 40 * Math.sin(t + i), 1.7), rad = 26 + 40 * rnd(i + 602);
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, SH + '.07)'); g.addColorStop(1, SH + '0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    }
    srcTag(ctx, 'Definisi gelembung: IMF', 92, 1000, t, A.gel - .1);
  }

  return { load, draw };
}
