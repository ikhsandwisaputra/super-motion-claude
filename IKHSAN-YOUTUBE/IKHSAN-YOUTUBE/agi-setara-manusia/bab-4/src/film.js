// Bab 04 · November 2026, seberapa dekat? (VO agi_vo_ahmad_07, 135,8 s, trimmed 2026-11-17). One depth row of 18 stations.
// Signature: PENGGARIS TIGA VENDOR (S2) — three models on one bench, one standard ARC Prize ruler each; every vendor's clamp springs its own
// ruler shorter while the card (the AI) never changes length; lime needles stay put, numbers jump to 97,7–99,9 %. Camera sweeps the
// bench yaw −12° → +12° with a focus pull per lane. Ends on the three-step AI staircase: three voices pinned on it, "siapa yang benar?".
// Photos and footage are FULL-BLEED documentary backgrounds (screen space, per station), never boxed plates (Ikhsan 2026-11-17: "dikotakin" = PPT).
import B from './beats.js';
import { W, H, D2R, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, TILE, ivo, setFont, DSP, SRF, MN, still, fmt, mk, onPlane,
  timing, makeChapter, loadImg, loadVid, grainRect, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone } from './kit.js';
import { kq, popAt } from './draw.js';
import { makeSteps, stairs } from './agi.js';
import { orang, jam } from './pustaka/prop.js';
import { kutipan } from './pustaka/tipo.js';
import { camKF, grey, lane, block, koki, panci, cobek, toples, sendok, talenan } from './b4.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const V = {}, IM = {};
  async function load() {
    const vb = '../assets/shared/vid/';
    for (const n of ['tattooed_hands', 'high_tech', 'busy_night', 'server_units', 'network_cables', 'central_processor', 'metal_hard', 'electronic']) V[n] = await loadVid(vb, n);
    const kb = '../assets/shared/kutipan/', gb = '../assets/shared/grafik/', sb = '../assets/shared/stok-situs/';
    IM.arc = await loadImg(kb + 'arcprize-openai-s-gpt-6-astra-on-arc-agi-3.png', 1800);
    IM.metr = await loadImg(kb + 'metr-methodological-details.png', 1800);
    IM.time = await loadImg(kb + 'time-inside-openai-s-reboot.png', 1600);
    IM.std = grey(await loadImg(gb + 'arc-agi-3-skor-standar-nov-2026-2.png', 1600));
    IM.dua = grey(await loadImg(gb + 'arc-agi-3-astra-dua-pembungkus.png', 1600));
    for (const [k, f] of [['dc', 'pexels-data-center-interior-showcasing-4597280.jpg'], ['rack', 'pexels-detailed-image-of-a-server-rack-1148820.jpg'],
      ['rack2', 'pexels-high-tech-server-rack-in-a-6466141.jpg']]) V[k] = still(await loadImg(sb + f, 2000));
  }
  // ── full-bleed documentary backgrounds, one per station (screen space, under the whole row) ──────────────────
  // cover-crop · grade (desaturated, no sepia) · slow push + camera-yaw parallax · dim · vignette · grain · optional scrim behind the type
  const BGK = ['busy_night', 'dc', 'server_units', 'central_processor', 'tattooed_hands', 'rack2', 'electronic', 'metal_hard', 'busy_night',
    'server_units', 'network_cables', 'rack', 'rack2', 'dc', 'rack', 'metal_hard', 'high_tech', 'busy_night'];
  const BGO = { 0: { dim: .5, scrim: 'left' }, 4: { dim: .18, scrim: 'bottom' }, 5: { dim: .64 }, 11: { dim: .6 }, 14: { dim: .52 }, 15: { dim: .55 }, 13: { dim: .45, scrim: 'bottom' }, 16: { dim: .2, scrim: 'bottom' }, 17: { dim: .5, scrim: 'top' } };
  function bgOne(ctx, t, j, a, c) {
    const v = V[BGK[j]]; if (!v || a <= 0) return; const o = BGO[j] || {}, s0 = ST[j].at, s1 = j < ST.length - 1 ? ST[j + 1].at : DUR;
    const lt = Math.max(0, t - s0 + .4), n = v.n, per = 2 * (n - 1), m = Math.floor(lt * v.fps) % per, im = v.img[m < n ? m : per - m];
    const u = inv(s0 - .4, s1, t), sc = Math.max(W / im.width, H / im.height) * (1.09 + .07 * u);
    const ox = clamp(-Math.sin((c.yaw || 0) * D2R) * 260 + lerp(-26, 26, u), -70, 70), oy = lerp(14, -14, u);
    ctx.globalAlpha = a; ctx.filter = `saturate(.45) contrast(1.14) brightness(.8) blur(1px)`;
    ctx.drawImage(im, (W - im.width * sc) / 2 + ox, (H - im.height * sc) / 2 + oy, im.width * sc, im.height * sc); ctx.filter = 'none';
    ctx.fillStyle = `rgba(11,12,9,${o.dim ?? .42})`; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, W * .62); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.62)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (o.scrim) { const L = { left: [0, 0, W * .62, 0], bottom: [0, H, 0, H * .5], top: [0, 0, 0, H * .48] }[o.scrim], sg = ctx.createLinearGradient(...L);
      sg.addColorStop(0, 'rgba(11,12,9,.82)'); sg.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H); }
    grainRect(ctx, 0, 0, W, H, t, .2); ctx.globalAlpha = 1;
  }
  function drawBG(ctx, t, c) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'source-over';
    let j = 0; while (j < ST.length - 1 && t >= ST[j + 1].at - .35) j++;
    const x = j ? E.inOutSine(inv(ST[j].at - .35, ST[j].at + .15, t)) : 1;          // crossfade on every station move
    if (x < 1 && BGK[j - 1] !== BGK[j]) bgOne(ctx, t, j - 1, 1, c);
    bgOne(ctx, t, j, x < 1 && BGK[j - 1] !== BGK[j] ? x : 1, c);
  }

  // ── S0 + S17: stairs worlds ────────────────────────────────────────────────────────────────────────────────
  const SC = makeSteps([['run', 15]], 300, 120, 360);            // ARC-AGI-3 as a staircase: 15 steps ≈ 0–100 %
  const BIG = makeSteps([['run', 1], ['land', 900], ['run', 1], ['land', 900], ['run', 1], ['land', 900]], 0, 260, 260);
  const pin = (ctx, t, lab, t0, sub, down) => {                    // lime marker on a tread (plane-local, origin = tread); down = label hangs below
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(0, 4, 46, 10, 0, 0, 7); ctx.fill();
    ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, -22, 22, 0, 7); ctx.fill();
    if (down) { ctx.fillRect(-2, -22, 4, 70); slab(ctx, lab, -10, 62, t, t0, { size: 26, lime: true }); if (sub) txt(ctx, sub, 2, 118, t, t0 + .25, MN(17), { ls: 3, col: ivo(.8) }); return; }
    ctx.fillRect(-3, -230, 6, 210); slab(ctx, lab, 20, -236, t, t0, { size: 26, lime: true }); if (sub) txt(ctx, sub, 22, -180, t, t0 + .25, MN(17), { ls: 3, col: ivo(.75) });
  };
  function worldS0(ctx, t, pr, foc, items, c) {
    if (!(c.i === 0 || (c.i === 1 && c.k < 1))) return;
    const z0 = ST[0].z, S = SC.map(s => ({ ...s, z: s.z + z0, z1: s.z1 + z0 }));
    stairs(ctx, t, pr, items, S, i => kq(t, .15 + i * .05, .4), { x0: -260, x1: 1800, lime: t > A.melompat + 1.1 ? [12] : [0] });
    const P = i => ({ y: S[i].y1, z: (S[i].z + S[i].z1) / 2 }), u = E.inOutCubic(inv(A.melompat, A.melompat + 1.1, t)), a = P(0), b = P(12);
    const y = lerp(a.y, b.y, u) - 620 * Math.sin(Math.PI * u), z = lerp(a.z, b.z, u), X = lerp(330, 700, u);
    if (t < A.satu) return;
    items.push({ z: z + 1, x: X, d: u > .5 ? 1 : pr(X, y, z).z - 5, f: () => onPlane(ctx, pr, X, y, z, pr(X, y, z).z, () => {   // marker always in focus, grows with distance
      ctx.globalAlpha = clamp((t - A.satu) / .2); const sc = lerp(1.5, 3.8, u); ctx.scale(sc, sc);
      if (u < .5) pin(ctx, t, 'MAR 2026 · DI BAWAH 1%', A.satu + .1, 'ARC-AGI-3 · AI TERDEPAN');
      else pin(ctx, t, 'NOV 2026 · 81,2%', A.melompat + 1.0, 'SKOR STANDAR TERTINGGI', true);
    }) });
  }
  function worldS17(ctx, t, pr, foc, items, c) {
    const S17 = ST[17]; if (c.i !== 17) return;                 // pops in under the ldr1 hit, never as a dark block over AMI Labs
    const z0 = S17.z - 500, S = BIG.map(s => ({ ...s, z: s.z + z0, z1: s.z1 + z0 }));
    stairs(ctx, t, pr, items, S, i => kq(t, S17.at - .5 + i * .12, .5), { x0: -1500, x1: 1500, lime: [0] });
    ['1 · AI SEMPIT', '2 · AGI', '3 · KECERDASAN SUPER'].forEach((lab, i) => { const s = S[i], zl = s.z1 - 140;   // standing at the back-left of each tread
      items.push({ z: zl, x: -1250, d: 3 + i * 1e-3, f: () => onPlane(ctx, pr, -1250, s.y1, zl, pr(-1250, s.y1, zl).z, () => {
        ctx.globalAlpha = kq(t, S17.at - .2 + i * .15, .5); setFont(ctx, DSP(150), 5); ctx.fillStyle = i === 1 ? ivo(.96) : ivo(.62); ctx.textAlign = 'left'; ctx.fillText(lab, 0, -24); }) }); });
    // three voices, three places on the same staircase (positions = illustration of each claim, sourced in S13–S16)
    const P3 = [[150, S[1].y1, S[1].z + 260, 'BROCKMAN · SUDAH SAMPAI', 'MENURUT BROCKMAN', A.jadi + .05, false],
      [560, S[0].y1, S[1].z - 240, 'ALTMAN · AKHIR 2026', 'MENURUT ALTMAN', A.jadi + .25, false],
      [-60, S[0].y1, S[0].z + 380, 'LECUN · BUKAN LEWAT LLM', 'MENURUT LECUN', A.jadi + .45, true]];
    for (const [X, yy, zz, lab, sub, t0, down] of P3) items.push({ z: zz, x: X, d: 2 + zz * 1e-4, f: () => onPlane(ctx, pr, X, yy, zz, pr(X, yy, zz).z, () => {   // pins sit on the treads: always on top
      ctx.globalAlpha = kq(t, t0, .35); ctx.scale(2.1, 2.1); pin(ctx, t, lab, t0 + .05, sub, down); }) });
  }

  // ── S2: Penggaris Tiga Vendor ───────────────────────────────────────────────────────────────────────────────
  const X0 = -880, SP = 10.5;
  const LANES = [
    { y: -300, name: 'GPT-6 Astra', maker: 'OPENAI · 3 SEP 2026', clampTxt: 'OPENAI', std: 62.7, ven: 99.9, tCard: A.tanggal - .1, tRuler: A.tanggal + .15, tNeedle: A.tanggal + .3, tKick: A.pemb2 + .15 },
    { y: 20, name: 'Fable 5.2', maker: 'ANTHROPIC · 9 NOV 2026', clampTxt: 'ANTHROPIC', std: 81.2, ven: 97.7, tCard: A.fable + .4, tRuler: A.meraih + .4, tNeedle: A.delapan + .4, tKick: A.pembuatnya + .1 },
    { y: 340, name: 'Gemini 4 Carbon', maker: 'GOOGLE · 10 NOV 2026', clampTxt: 'GOOGLE', std: 65.1, ven: 99.1, tCard: A.gemini + .4, tRuler: A.menyusul + .4, tNeedle: A.enam2 + .4, tKick: A.pembuatnya + .7 },
  ];
  function drawS2(ctx, t) {
    const a0 = ctx.globalAlpha, fl = inv(A.pemb2 + .1, A.pemb2 + .3, t), sy = Math.abs(Math.cos(fl * Math.PI));
    ctx.save(); ctx.translate(X0, -445); ctx.scale(1, Math.max(.02, sy)); setFont(ctx, MN(24), 5); ctx.fillStyle = ivo(.82); ctx.textAlign = 'left';
    ctx.globalAlpha = a0 * kq(t, A.tanggal, .4); ctx.fillText(fl < .5 ? 'ARC-AGI-3 · PEMBUNGKUS STANDAR ARC PRIZE' : 'ARC-AGI-3 · PEMBUNGKUS DARI PEMBUATNYA', 0, 0); ctx.restore(); ctx.globalAlpha = a0;
    for (const L of LANES) lane(ctx, t, L, X0, SP);
    const ks = E.outQuint(inv(A.s97 + .4, A.s97 + .9, t));                             // dashed band through the three needles
    if (ks > 0) { ctx.save(); ctx.setLineDash([10, 12]); ctx.lineDashOffset = -t * 30; ctx.strokeStyle = ivo(.7 * ks); ctx.lineWidth = 2.5; ctx.beginPath();
      LANES.forEach((L, i) => { const x = X0 + L.std * SP, y = L.y - 140; i ? ctx.lineTo(x, y) : ctx.moveTo(x, -400); ctx.lineTo(x, y); }); ctx.stroke(); ctx.restore();
      slab(ctx, 'PEMBUNGKUS VENDOR: 97,7–99,9%', X0 + 62.7 * SP - 20, -410, t, A.s97 + .4, { size: 24, lime: true }); }
    evid(ctx, IM.dua, 640, -170, 430, t, A.ketiganya, { tab: 'ARC PRIZE · ASTRA, 2 PEMBUNGKUS', rot: 2, dark: true, hl: [[.716, .21, .055, .06, A.s97]] });
    txt(ctx, 'AI-nya sama.', 430, 170, t, A.tembus, SRF(56));
    txt(ctx, 'Penggarisnya yang beda.', 430, 240, t, A.tembus + .45, SRF(56));
    srcTag(ctx, 'Sumber: ARC Prize, 9–10 Nov 2026', -880, 520, t, A.fable);
  }

  // ── stations ───────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, name: 'Kartu bab · tangga skor', dist: [1700, 1480], yaw: [-4, 3], world: worldS0,
      draw(ctx, t) {
        txt(ctx, 'BAB 04', -820, -300, t, .75, MN(28), { ls: 10, col: ivo(.9) });
        const k = kq(t, .85, .5); ctx.fillStyle = LIME; ctx.fillRect(-820, -272, 140 * k, 5);
        fall(ctx, 'NOVEMBER', -820, -80, t, .8, DSP(210), { ls: 4, stag: .04 });
        fall(ctx, '2026,', -820, 120, t, 1.0, DSP(210), { ls: 4, stag: .05 });
        markLine(ctx, 'seberapa ', 'dekat?', '', -820, 250, t, 1.35, A.bulan, SRF(80), { align: 'left' });
        srcTag(ctx, 'Sumber: ARC Prize, arXiv 24 Mar 2026; ARC Prize, Nov 2026', -840, 440, t, A.melompat + 1.2);
      } },
    { at: A.sept, via: 'rise', name: 'Astra · 62,7% standar', draw(ctx, t) {
      evid(ctx, IM.std, -330, 10, 980, t, A.sept + .05, { tab: 'ARC PRIZE · ARC-AGI-3, PEMBUNGKUS STANDAR', rot: -2, dark: true,
        hl: [[.165, .845, .13, .045, A.astra], [.2, .425, .06, .055, A.persen1 - .3]] });
      txt(ctx, 'GPT-6 Astra', 300, -170, t, A.astra, SRF(88));
      txt(ctx, 'OPENAI · SEPTEMBER 2026', 304, -112, t, A.astra + .3, MN(20), { ls: 4, col: ivo(.7) });
      fall(ctx, fmt(countTo(0, 62.7, t, A.mencetak + .1, .9), 1) + '%', 296, 110, t, A.mencetak + .1, DSP(230));
      slab(ctx, 'PEMBUNGKUS STANDAR', 300, 200, t, A.pemb1, { size: 24 });
      srcTag(ctx, 'Sumber: ARC Prize, Sep–Nov 2026', -840, 440, t, A.sept + .6);
    } },
    { at: A.tanggal, via: 'truck', name: 'Penggaris Tiga Vendor', ry: -6,
      draw: drawS2 },
    { at: A.nah, via: 'push', name: 'Harness = pembungkus', draw(ctx, t) {
      const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * gone(t, A.istilah - .2, .3);
      fall(ctx, 'apa sih pembungkus itu?', 0, -410, t, A.nah + .1, SRF(92), { align: 'center', stag: .02 }); ctx.globalAlpha = a0;
      markLine(ctx, 'harness = ', 'pembungkus', '', 0, -410, t, A.istilah, A.harness + .4, SRF(92));
      const RING = [[A.program, 'PROGRAM PENDAMPING', 70], [A.soal, 'CARA SOAL DISAJIKAN', 140], [A.alat, 'ALAT BANTU YANG BOLEH DIPAKAI', 210]];
      RING.forEach(([t0, lab, d], i) => { const k = E.outQuint(inv(t0 - .1, t0 + .5, t)); if (k <= 0) return; const s = lerp(.75, 1.25, k);
        ctx.save(); ctx.translate(0, 40); ctx.scale(s, s); ctx.globalAlpha = a0 * k * (1 - .25 * i / 2); ctx.setLineDash([16, 14]); ctx.lineDashOffset = -t * (40 + i * 18) * (i % 2 ? -1 : 1);
        ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-170 - d, -95 - d, 340 + 2 * d, 190 + 2 * d, 30 + d * .4); ctx.stroke(); ctx.restore(); ctx.globalAlpha = a0; });
      slab(ctx, 'PROGRAM PENDAMPING', 300, -95, t, A.program + .1, { size: 22 });
      slab(ctx, 'CARA SOAL DISAJIKAN', -400, 175, t, A.soal + .1, { size: 22, align: 'right' });
      slab(ctx, 'ALAT BANTU YANG BOLEH DIPAKAI', 0, 458, t, A.alat + .1, { size: 22, align: 'center' });
      const kc = spring(t - (A.nah + .3), .6, .4); if (kc > 0) { ctx.save(); ctx.translate(0, 40); ctx.scale(kc * 1.25, kc * 1.25);
        ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = TILE; ctx.beginPath(); ctx.roundRect(-170, -95, 340, 190, 26); ctx.fill();
        ctx.shadowColor = 'transparent'; ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2.5; ctx.stroke(); ctx.strokeStyle = ivo(.3); ctx.lineWidth = 1.5; ctx.strokeRect(-140, -64, 80, 80);
        ctx.beginPath(); for (let i = 1; i < 4; i++) { ctx.moveTo(-140 + 20 * i, -64); ctx.lineTo(-140 + 20 * i, 16); ctx.moveTo(-140, -64 + 20 * i); ctx.lineTo(-60, -64 + 20 * i); } ctx.stroke();
        setFont(ctx, MN(30), 3); ctx.fillStyle = IVORY; ctx.fillText('MODEL', -36, -18); ctx.fillText('AI', -36, 22); ctx.restore(); }
      const G = [[-640, -120, 'kaca'], [640, 130, 'kode'], [-600, 340, 'catat']];       // tools the harness allows
      G.forEach(([x, y, g], i) => popAt(ctx, x, y, t, A.dipakai + i * .12, () => { ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.fillStyle = '#1C1D17';
        ctx.beginPath(); ctx.arc(0, 0, 44, 0, 7); ctx.fill(); ctx.stroke(); ctx.lineWidth = 3.5; ctx.beginPath();
        if (g === 'kaca') { ctx.arc(-6, -6, 16, 0, 7); ctx.moveTo(6, 6); ctx.lineTo(20, 20); }
        else if (g === 'kode') { ctx.moveTo(-10, -14); ctx.lineTo(-24, 0); ctx.lineTo(-10, 14); ctx.moveTo(10, -14); ctx.lineTo(24, 0); ctx.lineTo(10, 14); ctx.moveTo(4, -18); ctx.lineTo(-4, 18); }
        else { ctx.rect(-14, -20, 28, 40); ctx.moveTo(-8, -8); ctx.lineTo(8, -8); ctx.moveTo(-8, 2); ctx.lineTo(8, 2); ctx.moveTo(-8, 12); ctx.lineTo(2, 12); }
        ctx.stroke(); }, { from: .2 }));
    } },
    { at: A.bayangkan, via: 'whip', name: 'Satu koki', draw(ctx, t) {
      markLine(ctx, 'satu koki, ', 'dua dapur', '.', 0, 380, t, A.koki, A.dapur, SRF(96));
    } },
    { at: A.di1, via: 'truck', name: 'Dua dapur', draw(ctx, t) {
      const a0 = ctx.globalAlpha;
      for (const [x, t0, dim] of [[-440, A.panitia - .2, .55], [440, A.di2 - .2, 1]]) {           // open corner frames per kitchen
        const k = kq(t, t0, .6); if (k <= 0) continue; ctx.globalAlpha = a0 * k; ctx.fillStyle = ivo(.035); ctx.fillRect(x - 390, -300, 780, 560);
        ctx.fillStyle = ivo(.7 * dim); const L = 40;
        for (const [px, py, dx, dy] of [[x - 390, -300, 1, 1], [x + 390, -300, -1, 1], [x - 390, 260, 1, -1], [x + 390, 260, -1, -1]]) { ctx.fillRect(px, py, L * dx, 3 * dy); ctx.fillRect(px, py, 3 * dx, L * dy); }
        ctx.globalAlpha = a0 * k * (dim < 1 ? .8 : 1); koki(ctx, x - 170, 200, t, x > 0 ? 1.3 : 0); panci(ctx, x + 70, 200, t, x > 0 ? .4 : 0); ctx.globalAlpha = a0; }
      txt(ctx, 'DAPUR PANITIA LOMBA', -440, -330, t, A.panitia, MN(24), { align: 'center', ls: 5, col: ivo(.8) });
      txt(ctx, 'DAPURNYA SENDIRI', 440, -330, t, A.di2, MN(24), { align: 'center', ls: 5 });
      popAt(ctx, -170, 120, t, A.standar2, () => sendok(ctx, 0, 0), { from: .3 });
      slab(ctx, 'ALAT STANDAR', -440, -250, t, A.standar2, { size: 22, align: 'center' });
      [[640, 40, () => cobek(ctx, 0, 0)], [200, -110, () => toples(ctx, 0, 0, 70, .7)], [270, -110, () => toples(ctx, 0, 0, 56, .45)], [340, -110, () => toples(ctx, 0, 0, 80, .9)],
        [620, -150, () => talenan(ctx, 0, 0)], [700, -110, () => toples(ctx, 0, 0, 60, .6)]].forEach(([x, y, f], i) => popAt(ctx, x, y, t, A.tata + i * .1, f, { from: .2 }));
      slab(ctx, 'DITATA SESUAI KEBIASAAN', 440, -250, t, A.tata, { size: 22, align: 'center' });
      const kh = E.outQuint(inv(A.hasilnya, A.hasilnya + .6, t));                                // result bars (illustration, no numbers)
      if (kh > 0) { ctx.fillStyle = ivo(.35); ctx.fillRect(-640, 300, 200 * kh, 16); ctx.fillStyle = IVORY; ctx.fillRect(240, 300, 400 * kh, 16);
        txt(ctx, 'HASIL', -640, 290, t, A.hasilnya, MN(16), { ls: 4, col: ivo(.6) }); txt(ctx, 'HASIL', 240, 290, t, A.hasilnya, MN(16), { ls: 4, col: ivo(.6) });
        txt(ctx, 'BEDA JAUH · ILUSTRASI', 0, 322, t, A.beda, MN(16), { align: 'center', ls: 4, col: ivo(.7) }); }
      const kd = E.outQuint(inv(A.kokinya, A.kokinya + .5, t));                                  // same cook: a dashed link head to head
      if (kd > 0) { ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-610, -10); ctx.quadraticCurveTo(0, -200, lerp(-610, 270, kd), -10); ctx.stroke(); ctx.restore(); }
      markLine(ctx, 'padahal kokinya ', 'sama', '', 0, 440, t, A.padahal, A.sama, SRF(64));
    } },
    { at: A.arc, via: 'whip', name: 'ARC Prize & Chollet', draw(ctx, t) {
      typeOn(ctx, 'ARC PRIZE SENDIRI: TIDAK MENGKLAIM INI AGI', 0, -390, t, A.chollet + .1, MN(26), { align: 'center', ls: 4, cps: 50, col: ivo(.85) });
      slab(ctx, 'MENURUT FRANÇOIS CHOLLET · PENGGAGAS ARC-AGI', 0, -290, t, A.chollet + .4, { size: 22, align: 'center' });
      fall(ctx, '“not proof of AGI”', 0, -110, t, A.bukan, SRF(104), { align: 'center', stag: .025 });
      txt(ctx, 'BUKAN BUKTI AGI', 0, -40, t, A.agi2, MN(22), { align: 'center', ls: 5, col: ivo(.7) });
      fall(ctx, '“faster than I expected”', 0, 150, t, A.lebih, SRF(104), { align: 'center', stag: .025 });
      txt(ctx, 'LEBIH CEPAT DARI DUGAANNYA', 0, 220, t, A.dugaannya, MN(22), { align: 'center', ls: 5, col: ivo(.7) });
      srcTag(ctx, 'Sumber: ARC Prize; The Next Web, 7 Sep 2026', -840, 405, t, A.chollet);
      srcTag(ctx, 'Sumber: The Decoder, 4 Sep 2026', -840, 440, t, A.bukan + .2);
    } },
    { at: A.penggaris, via: 'rise', name: 'METR · panjang tugas', draw(ctx, t) {
      typeOn(ctx, 'PENGGARIS NETRAL KEDUA', -840, -400, t, A.panjang + 1.5, MN(24), { ls: 6, col: ivo(.75) });
      fall(ctx, 'METR', -840, -170, t, A.panjang + 1.7, DSP(260), { ls: 6 });
      const N = 12, px = i => -640 + i * 128, py = i => 140 - Math.sin(i * .9) * 40, kp = E.inOutCubic(inv(A.agen, A.sendiri2, t)) * (N - 1);
      const kl = kq(t, A.panjang + 2, .6); if (kl > 0) { ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i < N; i++) i ? ctx.lineTo(px(i), py(i)) : ctx.moveTo(px(i), py(i)); ctx.stroke();
        for (let i = 0; i < N; i++) { ctx.fillStyle = i <= kp ? IVORY : ivo(.25 * kl); ctx.beginPath(); ctx.arc(px(i), py(i), i <= kp ? 12 : 9, 0, 7); ctx.fill(); }
        const i0 = Math.floor(kp), f = kp - i0, cx = lerp(px(i0), px(Math.min(N - 1, i0 + 1)), f), cy = lerp(py(i0), py(Math.min(N - 1, i0 + 1)), f) - 60;
        if (t > A.agen) { ctx.fillStyle = TILE; ctx.strokeStyle = IVORY; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(cx - 50, cy - 30, 100, 60, 10); ctx.fill(); ctx.stroke();
          setFont(ctx, MN(18), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText('AGEN', cx, cy + 7); ctx.textAlign = 'left'; }
        txt(ctx, 'LANGKAH 1', px(0), py(0) + 50, t, A.agen, MN(16), { align: 'center', ls: 3, col: ivo(.6) });
        txt(ctx, 'LANGKAH 12', px(N - 1), py(N - 1) + 50, t, A.menjalankan, MN(16), { align: 'center', ls: 3, col: ivo(.6) }); }
      typeOn(ctx, 'AGEN AI = AI YANG MENJALANKAN LANGKAH KERJA SENDIRI', -640, 330, t, A.yaitu, MN(26), { ls: 2, cps: 40 });
      srcTag(ctx, 'Sumber: METR', -840, 440, t, A.panjang + 1.8);
    } },
    { at: A.panjangnya, via: 'push', name: 'Jam ahli', draw(ctx, t) {
      txt(ctx, 'LAMA KERJA AHLI = PANJANG TUGAS', 0, -400, t, A.diukur, MN(28), { align: 'center', ls: 5 });
      jam(ctx, -420, -40, 230, t, A.panjangnya, { tSpin: A.ahli, speed: 5 });
      const ke = kq(t, A.panjangnya + .3, .6); if (ke > 0) { const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * ke;
        orang(ctx, 300, 150, 330, { style: 'garis', col: ivo(.75), lw: 4 }); ctx.strokeStyle = ivo(.6); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(80, 160); ctx.lineTo(620, 160); ctx.stroke();
        ctx.fillStyle = '#1E1F19'; ctx.beginPath(); ctx.moveTo(380, 160); ctx.lineTo(420, 60); ctx.lineTo(560, 60); ctx.lineTo(540, 160); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.globalAlpha = a0; }
      slab(ctx, 'AHLI MANUSIA', 330, 220, t, A.ahli, { size: 22, align: 'center' });
      for (let i = 0; i < 10; i++) popAt(ctx, -450 + i * 100, 330, t, A.peluang + i * .04, () => { const on = i < 5 && t > A.berhasil + i * .08;
        ctx.fillStyle = on ? LIME : ivo(.22); ctx.beginPath(); ctx.arc(0, 0, 20, 0, 7); ctx.fill(); }, { from: .2 });
      txt(ctx, 'PELUANG AI BERHASIL ≈ 50%', 0, 410, t, A.separuh, MN(24), { align: 'center', ls: 5 });
    } },
    { at: A.agustus, via: 'rise', name: 'Tangga waktu tugas', draw(ctx, t) {
      const BASE = 330, PX = 560 / 16, a0 = ctx.globalAlpha;
      txt(ctx, 'PANJANG TUGAS AGEN AI · DIUKUR DENGAN JAM KERJA AHLI', -760, -420, t, A.agustus + .1, MN(22), { ls: 4, col: ivo(.8) });
      const kg = kq(t, A.agustus + .2, .6); if (kg > 0) { ctx.globalAlpha = a0 * kg; ctx.strokeStyle = ivo(.12); ctx.lineWidth = 1.5; ctx.beginPath();
        for (let h = 4; h <= 16; h += 4) { ctx.moveTo(-720, BASE - h * PX); ctx.lineTo(420, BASE - h * PX); } ctx.stroke(); setFont(ctx, MN(16), 1); ctx.fillStyle = ivo(.5); ctx.textAlign = 'right';
        for (let h = 4; h <= 16; h += 4) ctx.fillText(h + ' j', -736, BASE - h * PX + 6); ctx.textAlign = 'left'; ctx.fillStyle = ivo(.5); ctx.fillRect(-760, BASE, 1220, 3); ctx.globalAlpha = a0; }
      const h1 = 2.283 * PX * E.outQuint(inv(A.gpt5, A.gpt5 + .7, t));
      block(ctx, -680, BASE, 420, h1);
      txt(ctx, 'AGU 2025', -470, BASE + 50, t, A.agustus + .3, MN(20), { align: 'center', ls: 4, col: ivo(.75) });
      txt(ctx, 'GPT-5', -470, BASE - 120, t, A.gpt5, SRF(64), { align: 'center' });
      fall(ctx, '± 2 j 17 m', -470, BASE - 190, t, A.dua, DSP(96), { align: 'center' });
      const h2 = 16 * PX * E.inOutCubic(inv(A.maret + .2, A.enambelas, t));
      block(ctx, -150, BASE, 500, h2, { lime: kq(t, A.jam16, .3) });
      txt(ctx, 'MAR 2026', 100, BASE + 50, t, A.maret, MN(20), { align: 'center', ls: 4, col: ivo(.75) });
      txt(ctx, 'Claude Mythos', 470, -190, t, A.claude2, SRF(64));
      txt(ctx, 'VERSI AWAL', 474, -136, t, A.mythos, MN(20), { ls: 4, col: ivo(.7) });
      fall(ctx, '≥ 16 jam', 466, 30, t, A.jam16, DSP(170));
      txt(ctx, 'PALING SEDIKIT', 474, 80, t, A.jam16 + .3, MN(20), { ls: 4, col: ivo(.7) });
      srcTag(ctx, 'Sumber: METR; The Decoder, 10 Mei 2026', -840, 440, t, A.agustus + .6);
    } },
    { at: A.enam3, via: 'whip', name: '16 jam = 2 hari kerja', draw(ctx, t) {
      fall(ctx, '16 JAM', -840, -220, t, A.enam3, DSP(220), { ls: 4 });
      for (let r = 0; r < 2; r++) { txt(ctx, 'HARI ' + (r + 1), -300, -60 + r * 130, t, A.hari + r * .3, MN(20), { align: 'right', ls: 4, col: ivo(.75) });
        for (let i = 0; i < 8; i++) { const ti = A.hari + r * .45 + i * .06, k = E.outQuint(inv(ti, ti + .3, t)); if (k <= 0) continue;
          const x = -270 + i * 112, y = -120 + r * 130; ctx.fillStyle = ivo(.12 + .7 * k); ctx.beginPath(); ctx.roundRect(x, y + 90 * (1 - k), 100, 90 * k, 10); ctx.fill();
          setFont(ctx, MN(16), 1); ctx.fillStyle = 'rgba(11,12,9,.75)'; ctx.fillText(String(r * 8 + i + 1), x + 12, y + 28); } }
      slab(ctx, '16 JAM ≈ 2 HARI KERJA × 8 JAM', -270, 170, t, A.kantoran, { size: 26 });
      const W0 = [20, 40, 80, 160, 320]; let x = -270;
      W0.forEach((w, i) => { const k = E.outQuint(inv(A.berlipat + i * .14, A.berlipat + i * .14 + .35, t)); if (k > 0) { ctx.fillStyle = i === 4 ? IVORY : ivo(.45 + i * .1); ctx.fillRect(x, 250, w * k, 40); } x += w + 28; });
      txt(ctx, 'TREN: BERLIPAT DUA TIAP ± 7 BULAN (METR)', -270, 345, t, A.tujuh - .2, MN(22), { ls: 3 });
      srcTag(ctx, 'Hitungan: 16 jam ÷ 8 jam per hari kerja = 2 hari', -840, 440, t, A.kantoran + .3);
    } },
    { at: A.tapi, via: 'push', name: 'Di atas 16 jam: belum andal', draw(ctx, t) {
      const X = -760, PXH = 46, a0 = ctx.globalAlpha, kr = kq(t, A.tapi, .5);
      txt(ctx, 'kata METR:', X, -300, t, A.metr2, SRF(70));
      evid(ctx, IM.metr, 420, -300, 760, t, A.metr2 + .2, { crop: [.1, .84, .8, .16], tab: 'METR.ORG', rot: 1.5, hl: [[.39, .5, .29, .32, A.atas]] });
      if (kr > 0) { ctx.globalAlpha = a0 * kr; ctx.fillStyle = 'rgba(241,239,230,.07)'; ctx.fillRect(X - 20, -40, 16 * PXH + 40, 120);
        ctx.strokeStyle = ivo(.8); ctx.lineWidth = 2; ctx.beginPath(); for (let h = 0; h <= 16; h++) { const x = X + h * PXH; ctx.moveTo(x, -40); ctx.lineTo(x, -40 + (h % 4 ? 22 : 44)); } ctx.stroke();
        setFont(ctx, MN(17), 0); ctx.fillStyle = ivo(.75); ctx.textAlign = 'center'; for (let h = 0; h <= 16; h += 4) ctx.fillText(h + ' j', X + h * PXH, 34); ctx.textAlign = 'left';
        const f0 = ctx.filter; ctx.filter = (f0 === 'none' || !f0 ? '' : f0 + ' ') + 'blur(2.5px)';                // beyond 16 h: ticks jitter, fade and blur
        ctx.strokeStyle = ivo(.45); ctx.beginPath(); for (let h = 17; h <= 32; h++) { const j = Math.sin(h * 12.9 + Math.floor(t * 12) * 3.1) * 6 * (h - 16) / 8, x = X + h * PXH + j;
          ctx.moveTo(x, -40); ctx.lineTo(x, -40 + (h % 4 ? 22 : 44) * (1 - (h - 16) / 22)); } ctx.stroke();
        ctx.fillStyle = 'rgba(241,239,230,.035)'; ctx.fillRect(X + 16 * PXH, -40, 16 * PXH + 20, 120); setFont(ctx, MN(17), 0); ctx.fillStyle = ivo(.35);
        for (let h = 20; h <= 32; h += 4) ctx.fillText(h + ' j?', X + h * PXH - 14, 34); ctx.filter = f0; ctx.globalAlpha = a0; }
      const kc = E.snap(inv(A.alatukur, A.alatukur + .25, t)); if (kc > 0) { ctx.strokeStyle = ivo(.85); ctx.lineWidth = 3; ctx.beginPath();     // crack
        const C = [[16.3, -40], [17.2, -8], [16.8, 18], [18.1, 44], [17.6, 80]]; C.slice(0, 1 + Math.ceil(kc * 4)).forEach(([h, y], i) => i ? ctx.lineTo(X + h * PXH, y) : ctx.moveTo(X + h * PXH, y)); ctx.stroke(); }
      const kn = kq(t, A.atas, .3); if (kn > 0) { ctx.fillStyle = LIME; ctx.fillRect(X + 16 * PXH - 2, -150, 4, 260 * kn);
        ctx.beginPath(); ctx.moveTo(X + 16 * PXH - 11, -160); ctx.lineTo(X + 16 * PXH + 11, -160); ctx.lineTo(X + 16 * PXH, -144); ctx.closePath(); ctx.fill(); }
      markLine(ctx, 'di atas 16 jam: ', 'belum andal', '', 0, 300, t, A.atas, A.andal, SRF(84));
      srcTag(ctx, 'Sumber: METR', -840, 440, t, A.metr2 + .3);
    } },
    { at: A.lalu, via: 'rise', name: 'Kata tokohnya', draw(ctx, t) {
      fall(ctx, 'kata tokoh-tokohnya?', 0, -230, t, A.lalu + .1, SRF(100), { align: 'center', stag: .02 });
      const kl = E.outQuint(inv(A.lalu + .3, A.lalu + .9, t)); if (kl > 0) { ctx.fillStyle = ivo(.5); ctx.fillRect(-760, 118, 1520 * kl, 4); }
      txt(ctx, '← SUDAH SAMPAI', -760, 200, t, A.lalu + .5, MN(18), { ls: 4, col: ivo(.65) });
      txt(ctx, 'BUKAN JALANNYA →', 760, 200, t, A.lalu + .5, MN(18), { align: 'right', ls: 4, col: ivo(.65) });
      [[-620, 'BROCKMAN'], [-300, 'ALTMAN'], [640, 'LECUN']].forEach(([x, n], i) => popAt(ctx, x, 120, t, A.tokoh + i * .3, () => {
        ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill(); setFont(ctx, MN(22), 4); ctx.textAlign = 'center'; ctx.fillText(n, 0, -34); ctx.textAlign = 'left'; }, { from: .2 }));
      txt(ctx, 'POSISI ILUSTRASI, BUKAN SKALA', 0, 300, t, A.tokoh + .9, MN(16), { align: 'center', ls: 4, col: ivo(.55) });
    } },
    { at: A.greg, via: 'whip', name: 'Brockman', draw(ctx, t) {
      fall(ctx, 'GREG BROCKMAN', -840, -270, t, A.greg, DSP(150), { ls: 4 });
      txt(ctx, 'SALAH SATU PENDIRI OPENAI', -836, -210, t, A.pendiri, MN(22), { ls: 4, col: ivo(.75) });
      slab(ctx, 'MENURUT GREG BROCKMAN', 840, -260, t, A.greg + .5, { size: 22, align: 'right' });
      kutipan(ctx, ['“For me personally,', 'I do think we\'re there.”'], 0, 30, t, A.mengaku, { size: 100, lead: 130, step: .16 });
      txt(ctx, '“SECARA PRIBADI, SAYA RASA KITA SUDAH SAMPAI.”', 0, 250, t, A.kita, MN(22), { align: 'center', ls: 3, col: ivo(.75) });
      srcTag(ctx, 'Sumber: pengarahan pers GPT-6 Astra, Sep 2026 (via The Conversation)', -840, 440, t, A.mengaku);
    } },
    { at: A.sam, via: 'truck', name: 'Altman · TIME', draw(ctx, t) {
      evid(ctx, IM.time, -500, -20, 640, t, A.sam + .1, { crop: [0, 0, .43, 1], tab: 'TIME · 26 AGU 2026', rot: -2, hl: [[.15, .14, .72, .29, A.time]] });
      fall(ctx, 'SAM ALTMAN', 0, -250, t, A.sam + .2, DSP(130), { ls: 4 });
      txt(ctx, 'KE MAJALAH TIME · AGUSTUS 2026', 4, -196, t, A.time, MN(20), { ls: 4, col: ivo(.75) });
      fall(ctx, 'Belum.', 0, -60, t, A.belum2, SRF(110));
      txt(ctx, 'tapi sebelum tahun ini habis,', 0, 40, t, A.tapi2 + .3, SRF(48));
      txt(ctx, 'OpenAI bakal punya sistem internal', 0, 110, t, A.habis + .3, SRF(48));
      markLine(ctx, 'yang layak disebut ', 'AGI', '.', 0, 180, t, A.sistem + .4, A.agi3, SRF(48), { align: 'left' });
      slab(ctx, 'MENURUT ALTMAN', 0, 280, t, A.tapi2 + .3, { size: 22 });
      srcTag(ctx, 'Sumber: TIME, 26 Agu 2026', -840, 440, t, A.time + .3);
    } },
    { at: A.seberang, via: 'whip', name: 'LeCun · jalan lain', draw(ctx, t) {
      fall(ctx, 'YANN LECUN', -840, -270, t, A.yann, DSP(150), { ls: 4 });
      txt(ctx, 'ILMUWAN AI SENIOR · KELUAR DARI META', -836, -210, t, A.ilmuwan, MN(22), { ls: 4, col: ivo(.75) });
      slab(ctx, 'MENURUT LECUN', 840, -260, t, A.yakin, { size: 22, align: 'right' });
      const kr = E.outQuint(inv(A.yakin, A.yakin + .9, t)), R0 = -760, R1 = 330, Y = 110;
      if (kr > 0) { const xe = lerp(R0, R1, kr); ctx.fillStyle = ivo(.07); ctx.fillRect(R0, Y - 40, xe - R0, 80); ctx.fillStyle = ivo(.6); ctx.fillRect(R0, Y - 42, xe - R0, 3); ctx.fillRect(R0, Y + 39, xe - R0, 3);
        ctx.save(); ctx.setLineDash([26, 20]); ctx.lineDashOffset = -t * 120; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(R0, Y); ctx.lineTo(xe, Y); ctx.stroke(); ctx.restore(); }
      txt(ctx, 'LLM · AI PENGOLAH BAHASA SEPERTI CHATGPT', R0, Y - 66, t, A.chatgpt - .3, MN(20), { ls: 3, col: ivo(.8) });
      popAt(ctx, 380, Y, t, A.jalan, () => { ctx.fillStyle = '#2A2B24'; ctx.fillRect(-18, -90, 36, 180); ctx.save(); ctx.beginPath(); ctx.rect(-18, -90, 36, 180); ctx.clip();
        ctx.fillStyle = IVORY; for (let k = -6; k < 8; k++) { ctx.beginPath(); ctx.moveTo(-18, k * 30); ctx.lineTo(18, k * 30 - 22); ctx.lineTo(18, k * 30 - 8); ctx.lineTo(-18, k * 30 + 14); ctx.fill(); } ctx.restore(); }, { from: .4, rot: 8 });
      popAt(ctx, 700, Y, t, A.setara, () => { ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 40, 0, 7); ctx.stroke(); ctx.fillStyle = ivo(.2); ctx.fill(); }, { from: .3 });
      txt(ctx, 'KECERDASAN', 700, Y - 96, t, A.setara, MN(20), { align: 'center', ls: 3 }); txt(ctx, 'SETARA MANUSIA', 700, Y - 70, t, A.setara + .1, MN(20), { align: 'center', ls: 3 });
      const kb = E.outCubic(inv(A.manusia, A.manusia + .8, t)); if (kb > 0) { ctx.save(); ctx.setLineDash([12, 12]); ctx.strokeStyle = ivo(.8); ctx.lineWidth = 3; ctx.beginPath();
        const N = 40; for (let i = 0; i <= N * kb; i++) { const u = i / N, x = lerp(-200, 690, u), y = Y + 40 + Math.sin(u * Math.PI) * 170 - u * 30; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
      txt(ctx, 'JALUR LAIN?', 540, 300, t, A.manusia + .3, MN(22), { align: 'center', ls: 5 });
      txt(ctx, 'LLM bukan jalan ke kecerdasan setara manusia', 110, 405, t, A.bukan2, SRF(54), { align: 'center' });
      srcTag(ctx, 'Sumber: Fortune, 23 Jan 2026', -840, 440, t, A.yann + .5);
    } },
    { at: A.beliau, via: 'push', name: 'AMI Labs', draw(ctx, t) {
      txt(ctx, 'YANN LECUN', 0, 230, t, A.beliau, MN(22), { align: 'center', ls: 6, col: ivo(.8) });
      markLine(ctx, 'mendirikan ', 'AMI Labs', ' untuk membuktikan jalur lain', 0, 330, t, A.mendirikan, A.ami, SRF(64));
      srcTag(ctx, 'Sumber: SiliconANGLE, 10 Mar 2026', -840, 440, t, A.ami + .2);
    } },
    { at: A.jadi, via: 'rise', name: 'Tangga · siapa yang benar?', py: -520, world: worldS17 },   // the question itself is screen space (over)
  ];
  // full-bleed background: pushed once per frame by the active station, drawn first (d = ∞)
  ST.forEach((s, j) => { const w0 = s.world; s.world = (ctx, t, pr, foc, items, c) => {
    if (j === c.i) items.push({ x: 0, z: 0, d: 1e9, f: () => drawBG(ctx, t, c) }); if (w0) w0(ctx, t, pr, foc, items, c); }; });
  // S2 camera: sweep the bench lane by lane (focus follows), then pull wide for the vendor kicks
  const S2 = ST[2];
  S2.cam = t => camKF(S2, [[A.tanggal, { yaw: -12, dist: 1460, ty: -90, tx: -120, pitch: 3 }], [A.fable, { yaw: -9, dist: 1430, ty: -70, tx: -100, pitch: 4 }],
    [A.meraih + .2, { yaw: -6, dist: 1400, ty: -45, tx: -90, pitch: 5 }], [A.gemini, { yaw: -3, dist: 1430, ty: -25, tx: -70, pitch: 5 }],
    [A.menyusul + .2, { yaw: 0, dist: 1410, ty: -10, tx: -50, pitch: 6 }], [A.dengan, { yaw: 4, dist: 1500, ty: -30, tx: 40, pitch: 6 }],
    [A.pemb2 + .1, { yaw: 8, dist: 1650, ty: -40, tx: 120, pitch: 7 }], [A.nah, { yaw: 12, dist: 1800, ty: -40, tx: 160, pitch: 8 }]])(t);

  // S17 camera: stand back and above the three steps so the whole staircase reads, slow drift toward the marker
  const S17 = ST[17];
  S17.cam = t => { const u = E.inOutSine(inv(S17.at - .4, DUR, t));
    return { yaw: lerp(7, -3, u), dist: lerp(3000, 2700, u), tx: lerp(-80, 120, u), ty: -640, tz: S17.z + 400, pitch: lerp(17, 14, u) }; };

  let FULLS;
  // closing question: screen space, top centre over the S17 scrim, fully in by 135.3 s (portal takes the last 0,95 s)
  const over = (o, t) => { if (t < A.jadi) return;
    fall(o, 'siapa yang benar?', W / 2, 190, t, A.siapa - .15, SRF(132), { align: 'center', stag: .018 });
    txt(o, 'POSISI DI TANGGA = ILUSTRASI KLAIM MASING-MASING', W / 2, 250, t, A.siapa + .25, MN(20), { align: 'center', ls: 5, col: ivo(.85) }); };
  return makeChapter({ B, ST, load, gate: true, over, label: 'BAB 04 · SEBERAPA DEKAT?', full: () => FULLS ??= [
    { im: IM.arc, t0: A.arc + .05, t1: A.chollet + .35, dir: 1, dark: true, tab: 'ARCPRIZE.ORG · GPT-6 ASTRA DI ARC-AGI-3', hl: [[.235, .6, .66, .145, A.mengklaim - .3]] },
    { im: IM.metr, t0: A.penggaris + .1, t1: A.panjang + 1.8, dir: -1, tab: 'METR.ORG · TIME HORIZONS', hl: [[.25, .22, .51, .16, A.metr], [.11, .685, .79, .13, A.panjang]] },
  ] });
}
