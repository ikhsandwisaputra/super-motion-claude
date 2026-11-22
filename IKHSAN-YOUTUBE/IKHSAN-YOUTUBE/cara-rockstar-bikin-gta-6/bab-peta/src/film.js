// Bab Peta · "Empat hal yang kita bedah" (VO 03, 42.6 s). Season 3 reference chapter.
//  S0 0–6.8    24,58 JUTA KOPI: counter over full-bleed official footage (mobil2), PS 75 % / Xbox 25 % split bar
//  S1 6.8–16.6 Selam Detail: "BIOSKOP" + 8 months tiles → dive into the O counter at "Rockstar" → match-cut out of the "0" of the
//              clock 00:00 over the sunset clip, clock runs to dawn. Aksa #1 (shock, "24 jam?!") pops bottom-left right after the cut.
//  S2 16.6–21.5 Foto Jadi Ruang: Jason & Lucia, giant "MESIN UANG" in the sky behind Jason's head, lights-off wave at "mesin"
//  S3 21.2–end Peta Leonida (official map art): 4 lime waypoints, the camera flies pin to pin, each pin opens its chapter card
//              (gameplay plate · Bengaluru map · Variety page · Windah #1), route draws as we travel, pull-back before the portal.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, GREY, ivo, setFont, DSP, SRF, MN, MONO, timing, makeChapter, loadImg, loadVid,
  srcTag, txt, countTo, fmt, gone, plate, typeOn, mk, grainRect } from './kit.js';
import { latar, aksaShow, selam, counterOf, ruang, bake, GRADE_DOC } from './s3.js';

const ROOM = '#0B0C09';
const vf = (V, lt, sp = 1) => { const n = V.n, per = 2 * (n - 1), m = Math.floor(Math.max(0, lt) * V.fps * sp) % per; return V.img[m < n ? m : per - m]; };
function cover(g, im, x, y, w, h, z = 1, ox = 0, oy = 0) { const s = Math.max(w / im.width, h / im.height) * z; g.drawImage(im, x + w / 2 - im.width * s / 2 + ox, y + h / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); }

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {}, SH = '../assets/shared/';
  async function load() {
    const R = SH + 'rockstar-resmi/';
    [IM.malam, IM.jl, IM.jlc, IM.rsg, IM.blr, IM.var, IM.win] = await Promise.all([
      loadImg(R + 'gtavi-06-vice-city-night-cityscape.jpg', 1920), loadImg(R + 'gtavi-10-jason-and-lucia-portrait.jpg', 1920),
      loadImg(R + 'gtavi-10-jason-and-lucia-portrait-tanpa-latar-birefnet-portrait.png', 1920), loadImg(SH + 'kutipan/rockstargames-grand-theft-auto-vi-rockstar-games.png', 2706),
      loadImg(SH + 'peta/rockstar-india-bengaluru-3d_gelap-z15.png', 1400), loadImg(SH + 'kutipan/variety-gta-6-extended-look-tops-netflix-charts.png', 1310),
      loadImg(SH + 'cc/commons-windah-basudara-di-tahun-2022-tanpa-latar-birefnet-portrait.png', 490)]);
    [V.mobil, V.senja, V.nyetir] = await Promise.all(['mobil2', 'senja', 'nyetir'].map(n => loadVid(SH + 'vid/', n)));
    IM.malamD = bake(IM.malam, 'saturate(.55) brightness(.42) contrast(1.05)', 1920);
    // Leonida map art: left part of the media-page card (no headline/button), graded dark; a blurred twin for depth of field
    const r = IM.rsg, sx = r.width * .105, sy = r.height * .248, sw = r.width * .48, sh = r.height * .55;
    const [mc, mg] = mk(Math.round(sw), Math.round(sh)); mg.filter = 'saturate(.45) brightness(.5) contrast(1.12)'; mg.drawImage(r, sx, sy, sw, sh, 0, 0, mc.width, mc.height);
    IM.map = mc; IM.mapB = bake(mc, 'blur(7px) brightness(.8)', mc.width);
    await Promise.all([aksa1.load()]);
  }

  // ── S0 · 24,58 juta kopi ────────────────────────────────────────────────────────────────────────────────────
  const S0 = { at: 0, name: 'Hari pertama', draw(ctx, t) {
    const g = gone(t, A.bayang - .45, .3); if (g <= 0) return; ctx.globalAlpha = g;
    txt(ctx, 'TERJUAL DI HARI PERTAMA', 0, -290, t, .35, MN(26), { align: 'center', ls: 7, col: ivo(.78) });
    const n = countTo(0, 24.58, t, A.juta - 1.7, 1.75); if (t > A.juta - 1.75) {
      const kk = E.outQuint(inv(A.juta - 1.75, A.juta - 1.3, t)); setFont(ctx, DSP(360), 2); ctx.textAlign = 'center'; ctx.fillStyle = IVORY;
      ctx.save(); ctx.translate(0, (1 - kk) * 60); ctx.globalAlpha = g * kk; ctx.fillText(fmt(n, 2), 0, 80);
      const pu = Math.exp(-Math.max(0, t - A.juta) / .12) * (t > A.juta ? 1 : 0); if (pu > .01) { ctx.globalAlpha = g * pu * .35; ctx.fillStyle = LIME; ctx.fillText(fmt(n, 2), 0, 80); }
      ctx.restore(); ctx.textAlign = 'left'; }
    txt(ctx, 'juta kopi', 0, 190, t, A.juta, SRF(100), { align: 'center' });
    // split bar: PlayStation 75 % (lime, the one accent) · Xbox 25 %
    const bw = 1180, bx = -bw / 2, by = 300, bh = 74, kp = E.outQuint(inv(A.ps - .1, A.ps + .45, t)), kx = E.outQuint(inv(A.xbox - .1, A.xbox + .4, t));
    if (kp > 0) { ctx.globalAlpha = g; ctx.fillStyle = LIME; ctx.fillRect(bx, by, bw * .75 * kp, bh);
      ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw * .75 * kp, bh); ctx.clip(); setFont(ctx, MN(30), 4); ctx.fillStyle = LIME_INK; ctx.fillText('PLAYSTATION  75 %', bx + 28, by + 48); ctx.restore(); }
    if (kx > 0) { const x0 = bx + bw * .75 + 8; ctx.globalAlpha = g; ctx.fillStyle = ivo(.22); ctx.fillRect(x0, by, (bw * .25 - 8) * kx, bh);
      ctx.save(); ctx.beginPath(); ctx.rect(x0, by, (bw * .25 - 8) * kx, bh); ctx.clip(); setFont(ctx, MN(30), 4); ctx.fillStyle = IVORY; ctx.fillText('XBOX  25 %', x0 + 26, by + 48); ctx.restore(); }
    ctx.globalAlpha = g; srcTag(ctx, 'Sumber: estimasi Sensor Tower via Deadline & TweakTown, 19 Nov 2026', -880, 470, t, .9);
  } };

  // ── S1 · Selam Detail: BIOSKOP → 00:00 ────────────────────────────────────────────────────────────────────────
  const CSS1 = DSP(400), WORD = 'BIOSKOP', BY = 640, F = counterOf(WORD, 2, CSS1, W / 2, BY);
  const CSS2 = DSP(430), CLK_Y = 700, NF = counterOf('00:00', 0, CSS2, W / 2, CLK_Y);
  const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU'];
  const dive = selam({ t0: A.bayang - .1, tc: A.rock, t1: A.tanya + .3, f: [F.x, F.y], r: F.w * .16, nf: [NF.x, NF.y], nr: NF.w * .16,
    page(g, t) {
      if (IM.malamD) cover(g, IM.malamD, 0, 0, W, H, 1.02 + .03 * inv(A.bayang, A.rock, t));
      g.fillStyle = 'rgba(11,12,9,.45)'; g.fillRect(0, 0, W, H);
      typeOn(g, 'BAYANGKAN FILM BIOSKOP RAKSASA', W / 2, 250, t, A.bayang + .1, MN(28), { align: 'center', ls: 7, col: ivo(.8), cps: 40 });
      setFont(g, CSS1, 0); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; const tw = g.measureText(WORD).width, x0 = W / 2 - tw / 2;
      for (let i = 0; i < WORD.length; i++) { const s = t - A.film + .1 - i * .05; if (s <= 0) break; g.globalAlpha = clamp(s / .1); g.fillStyle = IVORY;
        g.fillText(WORD[i], x0 + g.measureText(WORD.slice(0, i)).width, BY + (1 - spring(s, .55, .38)) * -140); }
      g.globalAlpha = 1;
      const pk = E.outCubic(inv(A.rock - .75, A.rock - .2, t)); if (pk > 0) {         // the O's counter darkens into a pupil we fall through
        g.fillStyle = ROOM; g.beginPath(); g.ellipse(F.x, F.y, F.w * .2 * pk, F.size * .27 * pk, 0, 0, 7); g.fill(); }
      const tw8 = 8 * 150 + 7 * 14, mx = W / 2 - tw8 / 2;                                // months run by: the film's long box-office road
      for (let i = 0; i < 8; i++) { const k = E.outQuint(inv(A.bulan - .45 + i * .2, A.bulan - .2 + i * .2, t)), x = mx + i * 164, y = 760;
        if (t < A.film) continue; g.globalAlpha = clamp((t - A.film) / .3); g.strokeStyle = ivo(.35); g.lineWidth = 2; g.strokeRect(x, y, 150, 64);
        if (k > 0) { g.fillStyle = IVORY; g.fillRect(x, y + 64 * (1 - k), 150, 64 * k); }
        setFont(g, MN(26), 4); g.textAlign = 'center'; g.fillStyle = k > .5 ? '#11120E' : ivo(.6); g.fillText(MON[i], x + 75, y + 42); g.textAlign = 'left'; }
      g.globalAlpha = 1;
      if (t > A.bulan) { const v = countTo(0, 2, t, A.bulan, A.miliar + .3 - A.bulan); setFont(g, DSP(96), 2); g.textAlign = 'center'; g.fillStyle = IVORY;
        g.globalAlpha = clamp((t - A.bulan) / .25); g.fillText(`US$${fmt(v, 1)} MILIAR`, W / 2, 940);
        const kr = clamp((t - A.bulan - .3) / .3); if (kr > 0) { g.globalAlpha = kr; setFont(g, MN(30), 4); g.fillStyle = ivo(.82); g.fillText(`≈ Rp${fmt(v * 18.264, 1)} TRILIUN`, W / 2, 1000);   // rupiah ikut menghitung, tidak diucap
          setFont(g, MN(18), 3); g.fillStyle = ivo(.5); g.fillText('kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', W / 2, 1040); }
        g.textAlign = 'left'; g.globalAlpha = 1; }
    },
    next(g, t) {
      if (V.senja) { g.filter = GRADE_DOC; cover(g, vf(V.senja, t - A.rock, .8), 0, 0, W, H, 1.04); g.filter = 'none'; }
      g.fillStyle = 'rgba(11,12,9,.5)'; g.fillRect(0, 0, W, H);
      const dawn = E.inOutSine(inv(A.rock + .6, A.terbit + .4, t)), gr = g.createLinearGradient(0, H, 0, H * .35);
      gr.addColorStop(0, `rgba(236,170,110,${.28 * dawn})`); gr.addColorStop(1, 'rgba(236,170,110,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      const mins = Math.floor(359 * E.inOutCubic(inv(A.rock + .55, A.terbit + .2, t))), clk = `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
      setFont(g, CSS2, 0); g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = IVORY; g.fillText(clk, W / 2, CLK_Y);
      typeOn(g, 'HARI PERTAMA · 19 NOV 2026', W / 2, 300, t, A.rock + .4, MN(28), { align: 'center', ls: 7, col: ivo(.85), cps: 40 });
      txt(g, 'sebelum matahari terbit', W / 2, 840, t, A.terbit - .35, SRF(76), { align: 'center' });
      g.textAlign = 'left';
    } });

  // Aksa #1 of the film: shock at the cut ("Rockstar mencapainya…"), bottom-left on the dawn clip
  // v2 (Ikhsan 11-21): perkenalan Aksa pertama di film (tag nama), ±7 s, lalu nunjuk ke MESIN UANG
  const AK = A.rock + .1, PT = A.tanya + .35 - AK - .82;
  const aksa1 = aksaShow({ t: AK, x: 1735, y: 1050, s: .75, stay: 6.4, shock: .1, tag: 'AKSA · TEMAN NONTON KAMU',
    face: [[.1, 'O_O'], [1.15, 'o_O'], [2.5, '-_-'], [2.64, 'O_O'], [PT, '^_^']], say: [.3, '24 jam?!'] });

  // ── S2 · Foto Jadi Ruang: MESIN UANG ──────────────────────────────────────────────────────────────────────────
  let room = null; const roomOf = () => room ??= ruang({ t0: A.tanya - .05, t1: A.kita + .12, bg: IM.jl, cut: IM.jlc, word: 'MESIN UANG', wordSize: 236, wordX: .775, wordY: .33,
    sub: [A.tanya + .8, 'Bagaimana Rockstar membangun mesin uang ini?'], tw: A.mesin - .1, par: .6, fx: .42, src: 'Sumber: Rockstar Games (rockstargames.com/VI/media)' });

  // ── S3 · Peta Leonida, 4 waypoints ───────────────────────────────────────────────────────────────────────────
  const P = [[.21, .27], [.36, .62], [.55, .30], [.56, .66]], NAMES = ['GRAFIS', 'INDIA', 'PROMOSI', 'STREAMER'];
  const M0 = A.kita - .28, ANC = [W * .29, H * .42], ZW = 1.7;
  const MK = [[M0, .5, .5, 1, W / 2, H / 2], [A.mulai - .35, ...P[0], ZW, ...ANC], [A.lalu - .35, ...P[1], ZW, ...ANC], [A.setelah - .35, ...P[2], ZW, ...ANC],
    [A.akhir - .25, ...P[3], ZW, ...ANC], [A.satu + .85, .5, .5, 1, W / 2, H / 2]];
  const ARR = MK.slice(1, 5).map(k => k[0] + .75), LEAVE = [MK[2][0] + .05, MK[3][0] + .05, MK[4][0] + .05, A.satu + .8];
  function mcam(t) {
    let c = MK[0].slice(1);
    for (let j = 1; j < MK.length; j++) { const u = E.inOutCubic(inv(MK[j][0], MK[j][0] + .85, t)); if (u <= 0) break;
      const n = MK[j].slice(1); c = c.map((v, i) => i === 2 ? Math.exp(lerp(Math.log(v), Math.log(n[i]), u)) : lerp(v, n[i], u)); }
    let j = 0; while (j < MK.length - 1 && t >= MK[j + 1][0]) j++; const t1 = j < MK.length - 1 ? MK[j + 1][0] : DUR;
    c[2] *= 1 + .05 * inv(MK[j][0], t1, t);                                            // slow push on every hold: never static
    return c;
  }
  function peta(o, t) {
    if (!IM.map || t < M0) return;
    const ki = E.outCubic(inv(M0, M0 + .5, t)), ox = W * .9 * (1 - ki);
    const [cx, cy, Z, ax, ay] = mcam(t), mw = IM.map.width, mh = IM.map.height, S = Math.max(W / mw, H / mh) * Z;
    const scr = ([u, v]) => [ax + (u - cx) * mw * S + ox, ay + (v - cy) * mh * S];
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    o.fillStyle = ROOM; o.fillRect(0, 0, W, H);
    const x0 = ax - cx * mw * S + ox, y0 = ay - cy * mh * S;
    let dof = 0; for (let i = 0; i < 4; i++) dof = Math.max(dof, Math.min(E.outCubic(inv(ARR[i], ARR[i] + .5, t)), 1 - E.inCubic(inv(LEAVE[i] - .3, LEAVE[i], t))));
    o.drawImage(IM.map, x0, y0, mw * S, mh * S); if (dof > 0) { o.globalAlpha = dof; o.drawImage(IM.mapB, x0, y0, mw * S, mh * S); o.globalAlpha = 1; }
    o.fillStyle = `rgba(11,12,9,${.18 + .3 * dof})`; o.fillRect(0, 0, W, H);
    // route: dashed preview after "empat", lime segments drawn while we travel
    const SP = P.map(scr);
    o.setLineDash([14, 16]); o.strokeStyle = ivo(.45 * E.outCubic(inv(A.empat, A.empat + .5, t))); o.lineWidth = 4; o.beginPath(); SP.forEach((p, i) => i ? o.lineTo(...p) : o.moveTo(...p)); o.stroke(); o.setLineDash([]);
    o.strokeStyle = LIME; o.lineWidth = 8; o.lineCap = 'round'; o.beginPath(); o.moveTo(...SP[0]);
    for (let i = 1; i < 4; i++) { const u = E.inOutCubic(inv(MK[i + 1][0], MK[i + 1][0] + .85, t)); if (u <= 0) break; o.lineTo(lerp(SP[i - 1][0], SP[i][0], u), lerp(SP[i - 1][1], SP[i][1], u)); }
    o.stroke();
    // pins (drop in with a stagger at "empat"), numbered; overview labels while the camera is wide
    const wide = clamp(1 - (Z - 1) / .25);
    for (let i = 0; i < 4; i++) { const s = t - A.empat - i * .13; if (s <= 0) continue; const [px, py] = SP[i], d = (1 - spring(s, .5, .4)) * -90, lit = i === 0 || t > MK[i + 1][0] + .5;
      o.save(); o.translate(px, py + d); o.globalAlpha = clamp(s / .12); o.fillStyle = lit ? LIME : IVORY; o.beginPath(); o.arc(0, -40, 30, 0, 7); o.fill();
      o.beginPath(); o.moveTo(-16, -23); o.lineTo(0, 0); o.lineTo(16, -23); o.fill(); setFont(o, MN(24), 0); o.textAlign = 'center'; o.fillStyle = lit ? LIME_INK : '#11120E'; o.fillText(String(i + 1).padStart(2, '0'), 0, -32);
      if (wide > .01) { o.globalAlpha = clamp(s / .12) * wide; setFont(o, MN(24), 5); o.textAlign = 'left'; o.fillStyle = IVORY; o.fillText(NAMES[i], 44, -32); }
      o.restore(); }
    if (wide > .01 && t < A.satu) { o.globalAlpha = wide; typeOn(o, 'EMPAT HAL YANG KITA BEDAH HARI INI', W / 2, 110 + 0, t, A.empat + .1, MN(28), { align: 'center', ls: 7, col: ivo(.9), cps: 44 }); o.globalAlpha = 1; }
    // fg bokeh (parallax 1.6× the map) so the flight has depth
    for (let i = 0; i < 7; i++) { const bx = ((i * 397 + 180 - cx * 2600 * 1.6) % (W + 600) + W + 600) % (W + 600) - 300, by = 140 + (i * 233) % 820, R = 60 + (i % 3) * 40;
      const gb = o.createRadialGradient(bx, by, 0, bx, by, R); gb.addColorStop(0, ivo(.07)); gb.addColorStop(1, ivo(0)); o.fillStyle = gb; o.fillRect(bx - R, by - R, 2 * R, 2 * R); }
    for (let i = 0; i < 4; i++) card(o, t, i, SP[i]);
    grainRect(o, 0, 0, W, H, t, .1);
    o.restore();
  }
  const CARD = [1340, 470, 820, 462];
  function card(o, t, i, pin) {
    const k = E.outQuint(inv(ARR[i], ARR[i] + .55, t)), ko = E.inCubic(inv(LEAVE[i] - .3, LEAVE[i], t)); if (k <= 0 || ko >= 1) return;
    const [cx, cy, cw, ch] = CARD, a = 1 - ko, x = lerp(pin[0], cx, k), y = lerp(pin[1] - 40, cy, k), s = lerp(.12, 1, k);
    o.save(); o.globalAlpha = a; o.strokeStyle = LIME; o.lineWidth = 3; o.beginPath(); o.moveTo(pin[0] + 30, pin[1] - 40); o.lineTo(x - cw * s / 2, y + ch * s / 2); o.stroke();   // GPS callout leader
    o.translate(x, y - ko * 40); o.scale(s, s); o.rotate((1 - k) * -.08);
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 50; o.shadowOffsetY = 24; o.fillStyle = ROOM; o.fillRect(-cw / 2, -ch / 2, cw, ch); o.shadowColor = 'transparent';
    const lt = t - ARR[i];
    if (i === 0 && V.nyetir) plate(o, V.nyetir, t, 0, 0, cw, ch, 1, { t0: ARR[i], grade: GRADE_DOC, vig: .4, grain: .12 });
    if (i === 1) { o.save(); o.beginPath(); o.rect(-cw / 2, -ch / 2, cw, ch); o.clip(); cover(o, IM.blr, -cw / 2, -ch / 2, cw, ch, 1.05 + .06 * clamp(lt / 4)); o.restore();
      o.fillStyle = LIME; o.beginPath(); o.arc(0, 0, 12, 0, 7); o.fill(); o.strokeStyle = LIME; o.lineWidth = 3; o.beginPath(); o.arc(0, 0, 12 + 30 * ((lt * .8) % 1), 0, 7); o.globalAlpha = a * (1 - (lt * .8) % 1); o.stroke(); o.globalAlpha = a;
      setFont(o, MN(22), 3); o.fillStyle = IVORY; o.fillText('WHITEFIELD, BENGALURU', 24, -18); }
    if (i === 2) { const im = IM.var, cr = .62, sh = im.height * cr, s2 = Math.min(cw / im.width, ch / sh) * .96, w2 = im.width * s2, h2 = sh * s2;
      o.fillStyle = '#fff'; o.fillRect(-w2 / 2, -h2 / 2, w2, h2); o.drawImage(im, 0, 0, im.width, sh, -w2 / 2, -h2 / 2, w2, h2);
      const kh = E.snap(inv(ARR[i] + .7, ARR[i] + 1.0, t)); o.globalCompositeOperation = 'multiply'; o.fillStyle = LIME;      // highlighter on "31.1 Million Views"
      o.fillRect(-w2 / 2 + w2 * .405, -h2 / 2 + h2 * (.255 / cr), w2 * .31 * kh, h2 * (.075 / cr)); o.globalCompositeOperation = 'source-over'; }
    if (i === 3) { o.save(); o.beginPath(); o.rect(-cw / 2, -ch / 2, cw, ch); o.clip(); o.fillStyle = '#15160F'; o.fillRect(-cw / 2, -ch / 2, cw, ch);
      const kn = E.outQuint(inv(A.satu - .1, A.satu + .4, t)); if (kn > 0) { setFont(o, DSP(380), 0); o.textAlign = 'center'; o.fillStyle = LIME; o.globalAlpha = a * kn; o.fillText('#1', 190, 150 + (1 - kn) * 80); o.globalAlpha = a; }
      const wh = ch * 1.02, rise = (1 - E.outQuint(inv(ARR[i], ARR[i] + .7, t))) * 120; o.drawImage(IM.win, -cw / 2 + 30, ch / 2 - wh + 10 + rise, wh, wh); o.restore();
      if (kn > 0) { setFont(o, MN(24), 5); o.fillStyle = IVORY; o.globalAlpha = a * kn; o.textAlign = 'center'; o.fillText('PERINGKAT DUNIA', 190, 195); o.textAlign = 'left'; o.globalAlpha = a; } }
    o.strokeStyle = ivo(.8); o.lineWidth = 2; o.strokeRect(-cw / 2, -ch / 2, cw, ch);
    o.restore();
    // title block, bottom-left (number · League Gothic title · mono chapter tag) + source line
    const TT = [['TEKNOLOGI GRAFIS', 'BAB 1', 'Sumber: Rockstar Games, cuplikan resmi PS5'], ['RIBUAN PENGEMBANG INDIA', 'BAB 2', 'Peta: AWS Terrain | © OpenFreeMap | © OpenStreetMap contributors'],
      ['PROMOSI TANPA IKLAN TV', 'BAB 3', 'Sumber: Variety, 1 Sep 2026'], ['STREAMER INDONESIA', 'BAB 4', 'Foto: Secrett9 / Wikimedia Commons (CC0)']][i];
    o.save(); o.globalAlpha = a; const kt = E.outQuint(inv(ARR[i] + .1, ARR[i] + .6, t));
    setFont(o, MN(24), 6); o.fillStyle = LIME; o.fillRect(110, 795, 14, 14); o.fillStyle = ivo(.85); o.globalAlpha = a * kt; o.fillText(`${String(i + 1).padStart(2, '0')} · ${TT[1]}`, 140, 810);
    o.globalAlpha = a; fallLine(o, TT[0], 108, 930, t, ARR[i] + .15);
    o.globalAlpha = a * .85 * kt; setFont(o, `400 21px "${MONO}"`, 1); o.fillStyle = ivo(.8); o.fillText(TT[2], 110, 1010);
    o.restore();
  }
  function fallLine(o, str, x, y, t, t0) {
    setFont(o, DSP(122), 2); o.textAlign = 'left'; o.fillStyle = IVORY; const a0 = o.globalAlpha;
    for (let i = 0; i < str.length; i++) { const s = t - t0 - i * .022; if (s <= 0) break; o.globalAlpha = a0 * clamp(s / .08); o.fillText(str[i], x + o.measureText(str.slice(0, i)).width, y + (1 - spring(s, .55, .36)) * -70); }
    o.globalAlpha = a0;
  }

  const ST = [S0, { at: A.bayang, via: 'cut', name: 'Selam bioskop' }, { at: A.tanya, via: 'cut', name: 'Mesin uang' }, { at: A.kita, via: 'cut', name: 'Empat hal' }];
  let latarV = () => {};                                       // full-bleed official footage behind S0 (set after the clip loads)
  const over = (o, t) => { const r = roomOf(); peta(o, t); r.draw(o, t); dive.draw(o, t); aksa1.draw(o, t); };
  const sc = makeChapter({ B, ST, load: async () => { await load(); latarV = latar([{ t0: 0, t1: A.bayang + .1, V: V.mobil, dim: .44, z: [1.05, 1.16], pan: [30, -30] }]); },
    label: 'PETA · EMPAT HAL', over, gate: true, under: (ctx, t, first) => latarV(ctx, t, first) });
  return sc;
}
