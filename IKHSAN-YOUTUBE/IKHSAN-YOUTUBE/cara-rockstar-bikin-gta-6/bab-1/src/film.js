// Bab 1 · Dapur Produksi 12 Kantor dan Otak Grafisnya (VO 04, 184 s). Season 3: Selam Detail (KONSOL → "30") + Aksa sekali (cringe 212 GB).
//  0–5.8      Kota virtual: judul bab di atas skyline Vice City siang (resmi), pencacah "?.??? ORANG"
//  5.8–16.2   Edinburgh: peta gelap → pin lime → reveal satelit → foto HQ Rockstar North tumbuh dari pin (sorot papan nama)
//  16.2–35.3  Grafik staf 2.441 → 4.711 (≈ 2×) · jaringan 12 kantor (ilustrasi, hanya Edinburgh & Bengaluru dinamai)
//  35.3–61.0  Biaya: tumpukan koin · rumor > Burj Khalifa US$1,5 M · KOREKSI · artikel GTA 6 Everything · penggaris analis 1–1,5 M
//  61–90.9    Stadion (analogi) · KE MANA LARINYA? · mesin RAGE · rangka baja (analogi) · sewa mesin vs racik sendiri (air/lumpur/cahaya)
//  90.9–122   Ray tracing (Digital Foundry) · dulu stiker · pantulan neon di aspal (jalur sinar lime) · kartu 1440p / 30 / 212 GB
//  122–127    SELAM: "KONSOL MAHAL" → menyelam lewat O → muncul dari 0 di "30" (cincin 30 bingkai)
//  127–157    Otak konsol GPU/CPU · PS5 30→23 vs PS5 Pro (RT + PSSR) · kaca pembesar PSSR di klip Jason → Lucia
//  157–185    212 GB vs ponsel 128 GB (Aksa cringe) · Metacritic 99 / OpenCritic 98 · balik ke jaringan: Edinburgh → India?
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, ROOM, IVORY, LIME, LIME_INK, TILE, GREY, ivo, setFont, DSP, SRF, MN, MONO, rnd, fmt, mk, timing, makeChapter,
  loadImg, loadVid, grainRect, srcTag, txt, typeOn, fall, markLine, slab, countTo, gone, evidFull } from './kit.js';
import { latar, aksaShow, selam, counterOf, bake, GRADE_DOC } from './s3.js';
import { phone, chip, stack, stamp, bulb } from './draw.js';

const vf = (V, lt, sp = 1) => { const n = V.n, per = 2 * (n - 1), m = Math.floor(Math.max(0, lt) * V.fps * sp) % per; return V.img[m < n ? m : per - m]; };
function cover(g, im, x, y, w, h, z = 1, ox = 0, oy = 0) { const s = Math.max(w / im.width, h / im.height) * z; g.drawImage(im, x + w / 2 - im.width * s / 2 + ox, y + h / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); }
function fallLine(o, str, x, y, t, t0, size = 122) {
  setFont(o, DSP(size), 2); o.textAlign = 'left'; o.fillStyle = IVORY; const a0 = o.globalAlpha;
  for (let i = 0; i < str.length; i++) { const s = t - t0 - i * .022; if (s <= 0) break; o.globalAlpha = a0 * clamp(s / .08); o.fillText(str[i], x + o.measureText(str.slice(0, i)).width, y + (1 - spring(s, .55, .36)) * -70); }
  o.globalAlpha = a0;
}
const KURS = ' · kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$';            // rupiah lines: on screen only, never in the VO
const SRC_R = 'Sumber: Rockstar Games (rockstargames.com/VI/media)', SRC_DF = 'Sumber: Digital Foundry via TweakTown, Nov 2026', SRC_IGN = 'Sumber: IGN / Bloomberg, Okt 2026';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {}, SH = '../assets/shared/';
  async function load() {
    const R = SH + 'rockstar-resmi/', P = SH + 'peta/rockstar-north-edinburgh-3d_';
    [IM.sky, IM.water, IM.neon, IM.keys, IM.marsh, IM.mud, IM.jl, IM.eg, IM.es, IM.hq, IM.gr, IM.art] = await Promise.all([
      loadImg(R + 'gtavi-02-vice-city-skyline-day.jpg', 1920), loadImg(R + 'gtavi-03-vice-city-waterfront-physics.jpg', 1920),
      loadImg(R + 'gtavi-04-vice-city-neon-raytracing.jpg', 2400), loadImg(R + 'gtavi-07-leonida-keys-aerial-ocean.jpg', 1920),
      loadImg(R + 'gtavi-08-grassrivers-police-chase-wetlands.jpg', 1920), loadImg(R + 'gtavi-09-mount-kalaga-mud-physics.jpg', 1920),
      loadImg(R + 'gtavi-10-jason-and-lucia-portrait.jpg', 1920), loadImg(P + 'gelap-z16.png', 1920), loadImg(P + 'satelit-z16.png', 1920),
      loadImg(SH + 'cc/commons-rockstar-north-hq-edinburgh-scotland.jpg', 579), loadImg(SH + 'grafik/lonjakan-staf-rockstar.png', 1920),
      loadImg(SH + 'kutipan/gta6everything-rockstar-denies-gta-6-cost-over-1-5.png', 1632)]);
    [V.nyetir, V.garasi, V.lorong, V.jason, V.lucia, V.logo] = await Promise.all(['nyetir', 'garasi', 'lorong', 'jason', 'lucia', 'logo'].map(n => loadVid(SH + 'vid/', n)));
    IM.grD = bake(IM.gr, 'saturate(0) brightness(.92) contrast(1.06)', 1920);
    IM.neonG = bake(IM.neon, 'saturate(.82) brightness(.78) contrast(1.06)', 2400);
    IM.neonB = bake(IM.neon, 'blur(16px) saturate(.55) brightness(.4)', 1280);
    IM.hqG = bake(IM.hq, 'saturate(.85) contrast(1.05)', 579);
    await aksaA.load(); await aksaB.load();
  }

  // ── S0 · Kota virtual ───────────────────────────────────────────────────────────────────────────────────────
  const S0 = { at: 0, name: 'Kota virtual', draw(ctx, t) {
    const g = gone(t, A.mari - .45, .3); if (g <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * g;
    ctx.fillStyle = LIME; ctx.fillRect(-158, -313, 14, 14);
    typeOn(ctx, '01 · BAB 1', 10, -300, t, .35, MN(28), { align: 'center', ls: 8, col: ivo(.85), cps: 30 });
    fall(ctx, 'DAPUR PRODUKSI', 0, -60, t, .6, DSP(210), { align: 'center', col: IVORY });
    fall(ctx, '12 KANTOR', 0, 150, t, 1.0, DSP(210), { align: 'center', col: IVORY });
    txt(ctx, 'BERAPA ORANG UNTUK SATU KOTA VIRTUAL?', 0, 250, t, A.kota - .5, MN(26), { align: 'center', ls: 5, col: ivo(.8) });
    if (t > A.kota - .4) { const f = Math.floor(t * 12), d = i => String(Math.floor(rnd(f * 7 + i) * 10)), k = E.outQuint(inv(A.kota - .4, A.kota, t));
      const s = t < A.mari - .9 ? `${d(1)}.${d(2)}${d(3)}${d(4)}` : '?.???';
      setFont(ctx, DSP(100), 3); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.75); ctx.globalAlpha = a0 * g * k; ctx.fillText(`${s} ORANG`, 0, 372); ctx.textAlign = 'left'; ctx.globalAlpha = a0 * g; }
    srcTag(ctx, SRC_R, -840, 440, t, .9);
    ctx.globalAlpha = a0;
  } };

  // ── Edinburgh (screen space, in over): dark map flight → pin → satellite reveal → HQ photo from the pin ──────
  const SIGN = [.32, .355, .31, .075];
  function edin(o, t) {
    const T0 = A.mari - .15, T1 = A.dulu - .12; if (t < T0 || t > T1 || !IM.eg) return;
    const ki = E.outCubic(inv(T0, T0 + .3, t)), ko = E.inOutCubic(inv(T1 - .3, T1, t)), u = inv(T0, T1, t), fly = E.inOutCubic(inv(T0, A.sini + .2, t));
    const Z = lerp(1.6, 1.95, fly) * (1 + .1 * E.inOutSine(inv(A.sini, T1, t))), px = W / 2 + lerp(330, 0, fly), py = H / 2 + lerp(150, 0, fly), rot = lerp(-.05, .012, E.inOutSine(u));
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = ki * (1 - ko); o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    o.fillStyle = ROOM; o.fillRect(0, 0, W, H);
    const S = Math.max(W / IM.eg.width, H / IM.eg.height) * Z;
    const map = im => { o.save(); o.translate(px, py); o.rotate(rot); o.drawImage(im, -im.width * S / 2, -im.height * S / 2, im.width * S, im.height * S); o.restore(); };
    map(IM.eg);
    const rr = E.inOutCubic(inv(A.markas - .25, A.markas + .75, t)) * 1500;
    if (rr > 0) { o.save(); o.beginPath(); o.arc(px, py, rr, 0, 7); o.clip(); map(IM.es); o.restore();
      if (rr < 1450) { o.strokeStyle = ivo(.85); o.lineWidth = 3; o.beginPath(); o.arc(px, py, rr, 0, 7); o.stroke(); } }
    const tf = A.foto - .25, kc = E.outQuint(inv(tf, tf + .65, t));
    o.fillStyle = `rgba(11,12,9,${.12 + .4 * kc})`; o.fillRect(0, 0, W, H);
    // lime pin drops at "di sinilah"
    const sp = t - (A.sini - .1); if (sp > 0) { const d = (1 - spring(sp, .5, .4)) * -120;
      o.save(); o.translate(px, py + d); o.fillStyle = LIME; o.beginPath(); o.arc(0, -42, 30, 0, 7); o.fill(); o.beginPath(); o.moveTo(-17, -24); o.lineTo(0, 0); o.lineTo(17, -24); o.fill();
      o.fillStyle = LIME_INK; o.beginPath(); o.arc(0, -42, 10, 0, 7); o.fill(); o.restore();
      const ph = (sp * .7) % 1; o.strokeStyle = LIME; o.lineWidth = 3; o.globalAlpha = ki * (1 - ko) * (1 - ph) * .8; o.beginPath(); o.ellipse(px, py, 20 + 90 * ph, (20 + 90 * ph) * .45, 0, 0, 7); o.stroke(); o.globalAlpha = ki * (1 - ko); }
    // HQ photo card grows out of the pin
    if (kc > 0) { const ch = 760, cw = ch * IM.hqG.width / IM.hqG.height, x = lerp(px, 1390, kc), y = lerp(py - 40, 470, kc), s = lerp(.1, 1, kc);
      o.strokeStyle = LIME; o.lineWidth = 3; o.beginPath(); o.moveTo(px + 26, py - 42); o.lineTo(x - cw * s / 2, y + ch * s / 2 - 40 * s); o.stroke();
      o.save(); o.translate(x, y); o.scale(s, s); o.rotate((1 - kc) * -.08 + .008 * Math.sin(t * .6));
      o.shadowColor = 'rgba(0,0,0,.6)'; o.shadowBlur = 60; o.shadowOffsetY = 26; o.fillStyle = ROOM; o.fillRect(-cw / 2, -ch / 2, cw, ch); o.shadowColor = 'transparent';
      const zz = 1 + .05 * inv(tf, T1, t); o.save(); o.beginPath(); o.rect(-cw / 2, -ch / 2, cw, ch); o.clip(); o.scale(zz, zz); o.drawImage(IM.hqG, -cw / 2, -ch / 2, cw, ch); o.restore();
      const kh = E.outQuint(inv(A.gedung, A.gedung + .45, t)); if (kh > 0) { const [hx, hy, hw, hh] = SIGN, X0 = (-cw / 2 + hx * cw) * zz, Y0 = (-ch / 2 + hy * ch) * zz;
        o.globalCompositeOperation = 'screen'; o.fillStyle = 'rgba(200,245,60,.42)'; o.fillRect(X0 - 8, Y0 - 6, (hw * cw * zz + 16) * kh, hh * ch * zz + 12); o.globalCompositeOperation = 'source-over';
        o.strokeStyle = LIME; o.lineWidth = 4; o.strokeRect(X0 - 8, Y0 - 6, (hw * cw * zz + 16) * kh, hh * ch * zz + 12); }
      o.strokeStyle = ivo(.8); o.lineWidth = 2; o.strokeRect(-cw / 2, -ch / 2, cw, ch); o.restore(); }
    // title block bottom-left + the source of whatever we are looking at
    if (t > A.edin - .1) { o.fillStyle = LIME; o.fillRect(110, 797, 14, 14);
      typeOn(o, t < A.markas ? 'EDINBURGH · SKOTLANDIA' : 'EDINBURGH · MARKAS KREATIF UTAMA', 140, 810, t, t < A.markas ? A.edin - .1 : A.markas, MN(26), { ls: 6, col: ivo(.9), cps: 44 }); }
    fallLine(o, 'ROCKSTAR NORTH', 108, 930, t, A.rockstar - .15);
    const src = t < A.markas + .3 ? ['Sumber: AWS Terrain | © OpenFreeMap | © OpenStreetMap contributors, diakses 20 Nov 2026', T0 + .4]
      : t < tf ? ['Sumber: AWS Terrain | © Esri, Maxar, Earthstar Geographics | © OpenFreeMap | © OpenStreetMap contributors, diakses 20 Nov 2026', A.markas + .3]
      : ['Foto: Thomas Nugent / Wikimedia Commons (CC BY-SA 2.0)', tf];
    srcTag(o, src[0], 110, 1010, t, src[1]);
    grainRect(o, 0, 0, W, H, t, .1);
    o.restore();
  }

  // ── S2 · staff chart 2.441 → 4.711 ────────────────────────────────────────────────────────────────────────
  const CX = -260, CY = -292, CW = 1180, CH = 664;
  const S2 = { at: A.dulu, name: 'Staf 2.441 → 4.711', draw(ctx, t) {
    const a0 = ctx.globalAlpha, kc = E.outQuint(inv(A.dulu - .2, A.dulu + .6, t));
    ctx.globalAlpha = a0 * kc; ctx.drawImage(IM.grD, CX, CY + (1 - kc) * 40, CW, CH); ctx.globalAlpha = a0;
    const k1 = E.outQuint(inv(A.n2441 - .1, A.n2441 + .35, t)); if (k1 > 0) { ctx.globalAlpha = a0 * k1 * (1 - .6 * inv(A.melonjak, A.melonjak + .5, t)); ctx.strokeStyle = IVORY; ctx.lineWidth = 3;
      ctx.strokeRect(CX + .508 * CW - 8, CY + .60 * CH - 8, .025 * CW + 16, .24 * CH + 16); ctx.globalAlpha = a0; }
    const k2 = E.outCubic(inv(A.melonjak - .1, A.melonjak + .9, t)); if (k2 > 0) { const bx = CX + .8036 * CW, bw = .0245 * CW, top = CY + .3889 * CH, bot = CY + .8361 * CH;
      ctx.fillStyle = IVORY; ctx.fillRect(bx, bot - (bot - top) * k2, bw, (bot - top) * k2); }
    typeOn(ctx, 'SELURUH PEGAWAI ROCKSTAR · 2018', -860, -300, t, A.th2018 - .3, MN(24), { ls: 4, col: ivo(.85), cps: 44 });
    if (t > A.n2441 - .2) { const kk = E.outQuint(inv(A.n2441 - .2, A.n2441 + .25, t)), v = t < A.melonjak ? 2441 : Math.round(countTo(2441, 4711, t, A.melonjak, 1.0));
      setFont(ctx, DSP(240), 2); ctx.textAlign = 'left'; ctx.fillStyle = IVORY; ctx.globalAlpha = a0 * kk; ctx.fillText(fmt(v), -860, -20 + (1 - kk) * 60); ctx.globalAlpha = a0; }
    txt(ctx, 'ORANG', -860, 40, t, A.n2441 + .2, MN(24), { ls: 5, col: ivo(.75) });
    const kr = gone(t, A.demi - .2, .3); if (kr > 0) { ctx.globalAlpha = a0 * kr; txt(ctx, 'SAAT RILIS RED DEAD REDEMPTION 2', -860, 82, t, A.red - .1, MN(22), { ls: 3, col: ivo(.75) }); ctx.globalAlpha = a0; }
    txt(ctx, 'DEMI MENGGARAP GTA 6', -860, 82, t, A.demi + .1, MN(22), { ls: 3, col: ivo(.85) });
    stamp(ctx, 'HAMPIR 2×', -640, 250, t, A.dua - .05, { size: 110, rot: -5 });
    srcTag(ctx, SRC_IGN, -840, 440, t, A.dulu + .3);
  } };

  // ── 12-office network (ST3 and the closing callback) — illustration, only Edinburgh & Bengaluru named ─────
  const NET = [[-250, -120], [330, 190], [-520, -260], [-60, -300], [120, -170], [460, -250], [620, -60], [-420, 90], [-150, 230], [90, 40], [580, 260], [-640, -40]];
  function net(ctx, t, o) {
    const a0 = ctx.globalAlpha; ctx.save(); ctx.translate(o.ox, o.oy); ctx.scale(o.s, o.s); const hub = NET[0];
    for (let i = 1; i < NET.length; i++) { const k = E.outCubic(inv(o.tl + i * .06, o.tl + i * .06 + .4, t)); if (k <= 0) continue; const p = NET[i];
      ctx.strokeStyle = ivo(.42); ctx.lineWidth = 2.5 / o.s; ctx.beginPath(); ctx.moveTo(...hub); ctx.lineTo(lerp(hub[0], p[0], k), lerp(hub[1], p[1], k)); ctx.stroke();
      if (k < 1) { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(lerp(hub[0], p[0], k), lerp(hub[1], p[1], k), 5, 0, 7); ctx.fill(); } }
    let kl = 0; if (o.limeT) { kl = E.inOutCubic(inv(o.limeT, o.limeT + .9, t)); if (kl > 0) { const p = NET[1];
      ctx.strokeStyle = LIME; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...hub); ctx.lineTo(lerp(hub[0], p[0], kl), lerp(hub[1], p[1], kl)); ctx.stroke(); ctx.lineCap = 'butt'; } }
    NET.forEach(([x, y], i) => { const s = t - o.t0 - i * .05; if (s <= 0) return; const k = spring(s, .5, .3), r = (i === 0 ? 15 : 10) * k;
      ctx.globalAlpha = a0 * clamp(s / .1); ctx.fillStyle = i === 1 && kl >= 1 ? LIME : IVORY; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      if (i < 2) { ctx.strokeStyle = i === 1 && kl >= 1 ? LIME : ivo(.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r + 10 + 4 * Math.sin(t * 3 + i), 0, 7); ctx.stroke(); } });
    ctx.globalAlpha = a0; txt(ctx, 'EDINBURGH', hub[0] + 30, hub[1] - 22, t, o.t0 + .2, MN(24), { ls: 4, col: ivo(.9) });
    txt(ctx, 'BENGALURU', NET[1][0] + 30, NET[1][1] - 22, t, o.t0 + .35, MN(24), { ls: 4, col: kl >= 1 ? LIME : ivo(.9) });
    ctx.restore(); ctx.globalAlpha = a0;
  }
  const S3 = { at: A.kini, via: 'push', name: '12 kantor', layers: [{ dz: 700, fn(ctx, t) {
      const k = E.outQuint(inv(A.belas - .1, A.belas + .6, t)); if (k <= 0) return; const a0 = ctx.globalAlpha;
      setFont(ctx, DSP(640), 0); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.globalAlpha = a0 * .13 * k; ctx.fillText('12', 520, 260 + (1 - k) * 80); ctx.textAlign = 'left'; ctx.globalAlpha = a0; } }],
    draw(ctx, t) {
      net(ctx, t, { ox: 280, oy: 40, s: .9, t0: A.kini - .15, tl: A.belas - .15 });
      typeOn(ctx, 'KINI', -860, -220, t, A.kini, MN(26), { ls: 6, col: ivo(.85), cps: 30 });
      if (t > A.n4711 - .15) fall(ctx, '4.711', -860, -20, t, A.n4711 - .15, DSP(220), { col: IVORY });
      txt(ctx, 'PEGAWAI INTERNAL', -860, 45, t, A.internal - .1, MN(26), { ls: 5, col: ivo(.85) });
      slab(ctx, '12 KANTOR · LINTAS NEGARA', -860, 150, t, A.belas - .05, { size: 26, lime: true });
      txt(ctx, 'ILUSTRASI · BUKAN PETA', 860, 440, t, A.kini + .8, MN(20), { align: 'right', ls: 4, col: ivo(.5) });
      srcTag(ctx, SRC_IGN, -840, 440, t, A.kini + .4);
    } };

  // ── S4 · cost: coin stacks ───────────────────────────────────────────────────────────────────────────────────
  const S4 = { at: A.tentu, name: 'Biaya membengkak', draw(ctx, t) {
    [[-240, 5], [0, 8], [240, 11], [480, 15], [720, 19]].forEach(([x, n], i) => stack(ctx, x, 360, n, t, A.tentu + .15 + i * .25, { th: 18, rx: 92, step: .05 }));
    typeOn(ctx, 'RIBUAN GAJI INSINYUR', -860, -300, t, A.gaji - .1, MN(28), { ls: 5, col: ivo(.9), cps: 40 });
    typeOn(ctx, '× BERTAHUN-TAHUN', -860, -252, t, A.insinyur + .5, MN(28), { ls: 5, col: ivo(.7), cps: 40 });
    markLine(ctx, 'biaya ', 'membengkak', '', -860, -100, t, A.membengkak - .35, A.gila - .05, SRF(118), { align: 'left' });
  } };

  // ── S5 · rumor > Burj Khalifa ───────────────────────────────────────────────────────────────────────────────
  function tower(ctx, t, x, base, t0) {
    const p = E.inOutCubic(inv(t0, t0 + 1.3, t)); if (p <= 0) return; const top = -500, yC = base - (base - top) * p;
    ctx.save(); ctx.beginPath(); ctx.rect(x - 300, yC, 600, base - yC + 4); ctx.clip(); ctx.strokeStyle = IVORY; ctx.lineWidth = 3;
    const tiers = [[110, 460, 300], [86, 300, 140], [64, 140, -20], [44, -20, -170], [26, -170, -300], [12, -300, -380]];
    for (const [hw, y0, y1] of tiers) { ctx.beginPath(); ctx.moveTo(x - hw, y0); ctx.lineTo(x - hw * .82, y1); ctx.lineTo(x + hw * .82, y1); ctx.lineTo(x + hw, y0); ctx.stroke();
      ctx.strokeStyle = ivo(.35); ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); ctx.strokeStyle = IVORY; }
    ctx.beginPath(); ctx.moveTo(x, -380); ctx.lineTo(x, top); ctx.stroke(); ctx.restore();
    ctx.strokeStyle = ivo(.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 240, base); ctx.lineTo(x + 240, base); ctx.stroke();
  }
  const S5 = { at: A.internet, via: 'rise', name: 'Rumor Burj Khalifa', draw(ctx, t) {
    typeOn(ctx, 'RUMOR DI INTERNET: BIAYA GTA 6 MELEBIHI', -860, -260, t, A.internet + .1, MN(26), { ls: 4, col: ivo(.88), cps: 46 });
    fall(ctx, 'MENARA BURJ KHALIFA', -860, -50, t, A.burj - .2, DSP(170), { col: IVORY });
    fall(ctx, 'SENILAI US$1,5 MILIAR', -860, 100, t, A.m15 - .45, DSP(120), { col: ivo(.85) });
    txt(ctx, '≈ Rp27,4 triliun', -858, 182, t, A.m15 - .1, SRF(58), { col: ivo(.82), rise: 14 });
    tower(ctx, t, 620, 460, A.internet + .2);
    stamp(ctx, 'KOREKSI', -330, 318, t, A.namun - .05, { size: 120, rot: -6 });
    srcTag(ctx, 'Sumber: GTA 6 Everything, 14 Okt 2026' + KURS, -840, 440, t, A.internet + .5);
  } };

  // ── S6 · analyst range ruler ────────────────────────────────────────────────────────────────────────────────
  const S6at = A.rockstar2 + .35, RX = v => -760 + v * 760;
  const S6 = { at: S6at, via: 'cut', name: 'Kisaran analis', draw(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'ANGKA RESMI ROCKSTAR', -760, -330, t, S6at + .1, MN(26), { ls: 5, col: ivo(.85), cps: 44 });
    const kb = E.outQuint(inv(A.rahasia - .1, A.rahasia + .4, t)); if (kb > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-760, -300, 560 * kb, 64);
      ctx.save(); ctx.beginPath(); ctx.rect(-760, -300, 560 * kb, 64); ctx.clip(); setFont(ctx, MN(32), 8); ctx.fillStyle = ROOM; ctx.fillText('DIRAHASIAKAN', -730, -256); ctx.restore(); }
    typeOn(ctx, 'PERKIRAAN ANALIS', -760, -150, t, A.analis - .1, MN(26), { ls: 5, col: ivo(.85), cps: 44 });
    fall(ctx, 'US$1–1,5 MILIAR', -760, 40, t, A.satu - .15, DSP(170), { col: IVORY });
    txt(ctx, '≈ Rp18,3–27,4 triliun', -758, 118, t, A.satu + .15, SRF(48), { col: ivo(.82), rise: 12 });
    const ka = E.outCubic(inv(S6at + .1, S6at + .8, t)); if (ka > 0) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(RX(0), 200); ctx.lineTo(RX(2 * ka), 200); ctx.stroke();
      ['0', '0,5', '1', '1,5', '2'].forEach((l, i) => { const v = i * .5; if (v > 2 * ka + .01) return; ctx.beginPath(); ctx.moveTo(RX(v), 186); ctx.lineTo(RX(v), 214); ctx.stroke();
        setFont(ctx, MN(22), 2); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.7); ctx.fillText(l, RX(v), 250); ctx.textAlign = 'left'; });
      const kq = inv(S6at + .4, S6at + 1.1, t);                                    // rupiah row lands ~.3 s after its US$ tick
      ['Rp0', '9,13', '18,3', '27,4', '36,5'].forEach((l, i) => { const k = E.outCubic(inv(i * .2, i * .2 + .3, kq * 1.1)); if (k <= 0) return;
        ctx.globalAlpha = a0 * k; setFont(ctx, MN(19, 400), 1); ctx.textAlign = 'center'; ctx.fillStyle = GREY; ctx.fillText(l, RX(i * .5), 282 + (1 - k) * 8); ctx.textAlign = 'left'; ctx.globalAlpha = a0; });
      txt(ctx, 'ATAS: US$ MILIAR · BAWAH: Rp TRILIUN', 760, 150, t, S6at + .9, MN(19, 400), { align: 'right', ls: 3, col: ivo(.55) }); }
    const kl = E.outCubic(inv(A.satu - .05, A.m15b + .25, t)); if (kl > 0) { ctx.fillStyle = LIME; ctx.fillRect(RX(1), 176, (RX(1.5) - RX(1)) * kl, 48); }
    const kr = E.outQuint(inv(S6at + .5, S6at + 1.0, t)); if (kr > 0) { ctx.globalAlpha = a0 * kr; ctx.strokeStyle = GREY; ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
      ctx.beginPath(); ctx.moveTo(RX(1.5), 330); ctx.lineTo(RX(2.05), 330); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(RX(2.05) - 14, 320); ctx.lineTo(RX(2.05), 330); ctx.lineTo(RX(2.05) - 14, 340); ctx.stroke();
      setFont(ctx, MN(22), 3); ctx.fillStyle = GREY; const lab = 'RUMOR >1,5 · DIBANTAH', lw = ctx.measureText(lab).width; ctx.fillText(lab, RX(1.5), 375);
      ctx.fillRect(RX(1.5) - 4, 367, (lw + 8) * E.outCubic(inv(S6at + .9, S6at + 1.3, t)), 3); ctx.globalAlpha = a0; }
    srcTag(ctx, SRC_IGN + KURS, -840, 440, t, S6at + .3);
  } };

  // ── S7 · stadium (analogy) over Leonida Keys ───────────────────────────────────────────────────────────────
  const S7 = { at: A.tetap, via: 'rise', name: 'Stadion (analogi)', draw(ctx, t) {
    const p = inv(A.awam - .3, A.stadion + .3, t); ctx.strokeStyle = IVORY; ctx.lineWidth = 3;
    [[640, .3], [560, .3], [480, .3], [390, .3]].forEach(([rx, f], i) => { const k = E.inOutCubic(clamp(p * 1.4 - i * .12)); if (k <= 0) return;
      ctx.globalAlpha = 1; ctx.strokeStyle = i ? ivo(.75) : IVORY; ctx.beginPath(); ctx.ellipse(0, 200, rx, rx * f, 0, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * k); ctx.stroke(); });
    const kp = E.outCubic(inv(A.stadion - .3, A.stadion + .4, t)); if (kp > 0) { ctx.strokeStyle = ivo(.6 * kp); ctx.strokeRect(-250, 200 - 64, 500, 128); ctx.beginPath(); ctx.moveTo(0, 136); ctx.lineTo(0, 264); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 200, 40, 14, 0, 0, 7); ctx.stroke();
      for (const [x, y] of [[-560, 60], [560, 60], [-560, 340], [560, 340]]) { ctx.strokeStyle = ivo(.7 * kp); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 150 * kp); ctx.stroke(); ctx.fillStyle = ivo(.8 * kp); ctx.fillRect(x - 18, y - 150 * kp - 10, 36, 12); } }
    typeOn(ctx, 'US$1–1,5 MILIAR, BUAT ORANG AWAM ≈', 0, -392, t, A.tetap + .2, MN(26), { align: 'center', ls: 4, col: ivo(.85), cps: 46 });
    txt(ctx, '≈ Rp18,3–27,4 triliun', 0, -338, t, A.tetap + 1.15, SRF(40), { align: 'center', col: ivo(.72), rise: 10 });
    fall(ctx, 'STADION MEGAH', 0, -150, t, A.stadion - .3, DSP(200), { align: 'center', col: IVORY });
    txt(ctx, 'BERSTANDAR INTERNASIONAL · ANALOGI', 0, -82, t, A.stadion + .4, MN(24), { align: 'center', ls: 4, col: ivo(.75) });
    srcTag(ctx, SRC_R + KURS, -840, 440, t, A.tetap + .3);
  } };

  // ── S8 · KE MANA LARINYA? · S9 · mesin RAGE ────────────────────────────────────────────────────────────────
  const S8 = { at: A.lalu, name: 'Ke mana larinya?', draw(ctx, t) {
    typeOn(ctx, 'UANG + WAKTU PANJANG ITU', 0, -200, t, A.lalu + .1, MN(28), { align: 'center', ls: 6, col: ivo(.85), cps: 40 });
    fall(ctx, 'KE MANA', 0, 20, t, A.lalu + .5, DSP(230), { align: 'center', col: IVORY });
    fall(ctx, 'LARINYA?', 0, 240, t, A.lari - .35, DSP(230), { align: 'center', col: IVORY });
    srcTag(ctx, SRC_R, -840, 440, t, A.lalu + .3);
  } };
  const S9 = { at: A.jawab, via: 'cut', name: 'Mesin RAGE', draw(ctx, t) {
    typeOn(ctx, 'JAWABANNYA: DAPUR TEKNOLOGI INTERNAL', 0, -190, t, A.dapur - .5, MN(28), { align: 'center', ls: 5, col: ivo(.9), cps: 44 });
    markLine(ctx, 'MESIN ', 'RAGE', '', 0, 130, t, A.mesin - .3, A.rage - .05, DSP(280), { ls: 4 });
    srcTag(ctx, SRC_R, -840, 440, t, A.jawab + .3);
  } };

  // ── S10 · rangka baja (analogy) · S11 sewa · S12 racik sendiri ─────────────────────────────────────────────
  function chassis(ctx, t, t0, tEng) {
    const p = inv(t0, t0 + 1.4, t); if (p <= 0) return; const a0 = ctx.globalAlpha, seg = (x0, y0, x1, y1, k) => { if (k <= 0) return; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); ctx.stroke(); };
    ctx.strokeStyle = IVORY; ctx.lineWidth = 4; const k1 = E.inOutCubic(clamp(p * 1.6)), k2 = E.inOutCubic(clamp(p * 1.6 - .3)), k3 = E.inOutCubic(clamp(p * 1.6 - .6));
    seg(180, 230, 820, 60, k1); seg(260, 330, 900, 150, k1);
    for (let i = 0; i < 6; i++) { const u = i / 5; seg(lerp(180, 820, u), lerp(230, 60, u), lerp(260, 900, u), lerp(330, 150, u), clamp(k2 * 6 - i)); }
    ctx.lineWidth = 3; ctx.strokeStyle = ivo(.8); for (const [x, y] of [[230, 300], [310, 390], [770, 130], [850, 220]]) { if (k3 <= 0) break; ctx.beginPath(); ctx.ellipse(x, y, 34, 62, -.3, 0, 2 * Math.PI * k3); ctx.stroke(); }
    const ke = E.outQuint(inv(tEng, tEng + .5, t)); if (ke > 0) { ctx.globalAlpha = a0 * ke; ctx.fillStyle = TILE; ctx.strokeStyle = IVORY; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.rect(640, 40 - 40 * (1 - ke), 130, 100); ctx.fill(); ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(656 + i * 30, 40); ctx.lineTo(656 + i * 30, 10); ctx.stroke(); }
      setFont(ctx, MN(18), 3); ctx.fillStyle = IVORY; ctx.fillText('MESIN', 668, 100); ctx.globalAlpha = a0; }
  }
  const S10 = { at: A.gampang, via: 'push', name: 'Rangka baja (analogi)', draw(ctx, t) {
    typeOn(ctx, 'GAMPANGNYA, MESIN GAME =', -860, -260, t, A.gampang + .1, MN(26), { ls: 5, col: ivo(.88), cps: 44 });
    fall(ctx, 'RANGKA BAJA', -860, -60, t, A.rangka - .15, DSP(180), { col: IVORY });
    fall(ctx, '+ MESIN MOBIL', -860, 90, t, A.mobil - .15, DSP(120), { col: ivo(.88) });
    txt(ctx, 'BAGI SEBUAH DUNIA VIRTUAL · ANALOGI', -860, 160, t, A.dunia - .2, MN(22), { ls: 4, col: ivo(.75) });
    chassis(ctx, t, A.rangka - .2, A.mobil - .05);
    srcTag(ctx, SRC_R, -840, 440, t, A.gampang + .3);
  } };
  const S11 = { at: A.banyak, name: 'Sewa mesin jadi', draw(ctx, t) {
    typeOn(ctx, 'BANYAK STUDIO LAIN', -860, -200, t, A.banyak + .05, MN(26), { ls: 5, col: ivo(.88), cps: 40 });
    fall(ctx, 'SEWA MESIN JADI', -860, 0, t, A.menyewa - .15, DSP(170), { col: IVORY });
    txt(ctx, 'DARI PIHAK LUAR · BIAR CEPAT SELESAI', -860, 70, t, A.luar - .15, MN(24), { ls: 4, col: ivo(.8) });
    srcTag(ctx, SRC_R, -840, 440, t, A.banyak + .3);
  } };
  const S12at = A.rockstar3 - .1;
  const S12 = { at: S12at, via: 'cut', name: 'Racik sendiri', draw(ctx, t) {
    typeOn(ctx, 'ROCKSTAR JUSTRU', -860, -200, t, S12at + .05, MN(26), { ls: 5, col: ivo(.88), cps: 40 });
    markLine(ctx, '', 'RACIK', ' SENDIRI', -860, 0, t, S12at + .3, A.racik - .05, DSP(180), { align: 'left' });
    txt(ctx, 'SUPAYA FISIKA MENYATU PENUH:', -860, 90, t, A.fisika - .3, MN(24), { ls: 4, col: ivo(.8) });
    slab(ctx, 'AIR', -860, 170, t, A.air - .05, { size: 30 }); slab(ctx, 'LUMPUR', -716, 170, t, A.lumpur - .05, { size: 30 }); slab(ctx, 'CAHAYA', -504, 170, t, A.cahaya - .05, { size: 30 });
    srcTag(ctx, SRC_R, -840, 440, t, S12at + .3);
  } };

  // ── S13 · ray tracing · S14 dulu stiker · S15 neon on wet asphalt ──────────────────────────────────────────
  const S13 = { at: A.hasil, via: 'rise', name: 'Ray tracing', draw(ctx, t) {
    typeOn(ctx, 'PENGUJIAN DIGITAL FOUNDRY', -860, -260, t, A.hasil + .15, MN(26), { ls: 5, col: ivo(.9), cps: 44 });
    typeOn(ctx, 'MENJELANG HARI RILIS', -860, -218, t, A.digital + .3, MN(26), { ls: 5, col: ivo(.7), cps: 44 });
    markLine(ctx, '', 'RAY TRACING', '', -860, -10, t, A.gta6 - .1, A.ray - .05, DSP(190), { align: 'left' });
    txt(ctx, 'PANTULAN CAHAYA NYATA · DI SELURUH KONSOL', -860, 70, t, A.pantulan - .1, MN(24), { ls: 4, col: ivo(.85) });
    srcTag(ctx, 'Sumber: Digital Foundry via Gagadget, Nov 2026', -840, 400, t, A.digital); srcTag(ctx, 'Gambar: Rockstar Games (rockstargames.com/VI/media)', -840, 440, t, A.hasil + .3);
  } };
  const S14 = { at: A.sederhana, via: 'push', name: 'Dulu: stiker', draw(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'DULU', -860, -300, t, A.sederhana + .1, MN(28), { ls: 8, col: ivo(.88), cps: 30 });
    txt(ctx, 'bayangan palsu', -860, -190, t, A.sederhana + .6, SRF(96), {});
    txt(ctx, 'ditempel seperti stiker', -860, -90, t, A.stiker - .45, SRF(96), {});
    const kf = E.outCubic(inv(A.sederhana + .2, A.sederhana + .8, t)); if (kf > 0) { ctx.globalAlpha = a0 * kf; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-240, 120); ctx.lineTo(760, 120); ctx.lineTo(880, 400); ctx.lineTo(-380, 400); ctx.closePath(); ctx.stroke();
      for (let i = 1; i < 6; i++) { const u = i / 6; ctx.strokeStyle = ivo(.15); ctx.beginPath(); ctx.moveTo(lerp(-240, -380, u), lerp(120, 400, u)); ctx.lineTo(lerp(760, 880, u), lerp(120, 400, u)); ctx.stroke(); }
      ctx.save(); ctx.translate(560, -250); ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(0, -60); ctx.stroke(); bulb(ctx, 50); ctx.restore();
      ctx.fillStyle = TILE; ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(160, 110, 150, 150); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(160, 110); ctx.lineTo(210, 70); ctx.lineTo(360, 70); ctx.lineTo(310, 110); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(310, 260); ctx.lineTo(360, 220); ctx.lineTo(360, 70); ctx.stroke(); ctx.globalAlpha = a0; }
    const s = t - (A.stiker - .1); if (s > 0) { const k = spring(s, .45, .3), sc = 1 + (1 - Math.min(k, 1.2)) * 1.4;
      ctx.save(); ctx.translate(120, 330); ctx.scale(sc, sc); ctx.globalAlpha = a0 * clamp(s / .08);
      ctx.fillStyle = 'rgba(0,0,0,.72)'; ctx.beginPath(); ctx.ellipse(0, 0, 190, 46, 0, 0, 7); ctx.fill();
      ctx.fillStyle = IVORY; ctx.beginPath(); ctx.moveTo(150, -26); ctx.lineTo(190, 0); ctx.lineTo(140, 14); ctx.closePath(); ctx.fill(); ctx.restore(); ctx.globalAlpha = a0;
      slab(ctx, 'BAYANGAN PALSU', -260, 250, t, A.stiker + .3, { size: 24, align: 'right', lx: -60, ly: 330 }); }
  } };
  const NP = 2240, NPH = 1260, NS = [.76, .245], NBo = [.585, .80], NV = [.30, 1.12];
  const S15 = { at: A.sekarang, via: 'truck', name: 'Neon di aspal', draw(ctx, t) {
    if (!IM.neonG) return; const a0 = ctx.globalAlpha, z = 1 + .14 * E.inOutSine(inv(A.sekarang - .3, A.berat, t)), fx = (NBo[0] - .5) * NP, fy = (NBo[1] - .5) * NPH;
    const L = ([u, v]) => [(u - .5) * NP, (v - .5) * NPH];
    ctx.save(); ctx.translate(fx, fy); ctx.scale(z, z); ctx.translate(-fx, -fy);
    ctx.drawImage(IM.neonG, -NP / 2, -NPH / 2, NP, NPH);
    const g = ctx.createLinearGradient(-NP / 2, 0, 0, 0); g.addColorStop(0, 'rgba(11,12,9,.78)'); g.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = g; ctx.fillRect(-NP / 2, -NPH / 2, NP / 2, NPH);
    const [sx, sy] = L(NS), [bx, by] = L(NBo), [vx, vy] = L(NV), k1 = E.inOutCubic(inv(A.neon - .3, A.neon + .4, t)), k2 = E.inOutCubic(inv(A.neon + .35, A.neon + .9, t));
    ctx.lineCap = 'round'; ctx.strokeStyle = LIME; ctx.lineWidth = 6 / z;
    if (k1 > 0) { ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(lerp(sx, bx, k1), lerp(sy, by, k1)); ctx.stroke(); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(sx, sy, 12, 0, 7); ctx.fill(); }
    if (k2 > 0) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(lerp(bx, vx, k2), lerp(by, vy, k2)); ctx.stroke(); ctx.beginPath(); ctx.arc(bx, by, 14, 0, 7); ctx.fill();
      const ph = ((t - A.neon) * .5) % 1, P = ph < .5 ? [lerp(sx, bx, ph * 2), lerp(sy, by, ph * 2)] : [lerp(bx, vx, ph * 2 - 1), lerp(by, vy, ph * 2 - 1)];
      ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(P[0], P[1], 8, 0, 7); ctx.fill(); }
    ctx.lineCap = 'butt'; ctx.restore();
    typeOn(ctx, 'SEKARANG', -860, -300, t, A.sekarang + .05, MN(28), { ls: 8, col: ivo(.9), cps: 30 });
    txt(ctx, 'komputer menghitung', -860, -195, t, A.sekarang + .5, SRF(84), {});
    txt(ctx, 'arah pantulannya', -860, -105, t, A.sekarang + 1.0, SRF(84), {});
    slab(ctx, 'NEON → ASPAL BASAH', 40, 420, t, A.aspal - .1, { size: 24, lx: (bx - fx) * z + fx, ly: (by - fy) * z + fy });
    srcTag(ctx, SRC_R, -840, 440, t, A.sekarang + .3);
  } };

  // ── S16 · spec card 1440p / 30 / 212 GB ────────────────────────────────────────────────────────────────────
  const SPEC = [['1440p', 'RESOLUSI INTERNAL'], ['30', 'GAMBAR PER DETIK'], ['212 GB', 'UKURAN FILE']];
  const S16 = { at: A.berat, name: 'Spesifikasi', draw(ctx, t) {
    const a0 = ctx.globalAlpha, kl = E.snap(inv(A.dikunci - .05, A.dikunci + .25, t));
    typeOn(ctx, 'HASIL UJI DIGITAL FOUNDRY', 0, -330, t, A.berat + .2, MN(26), { align: 'center', ls: 6, col: ivo(.85), cps: 44 });
    typeOn(ctx, 'PS5 & PS5 PRO', 0, -205, t, A.baik, MN(26), { align: 'center', ls: 6, col: ivo(.9), cps: 30 });
    for (const x of [-290, 290]) { const k = E.outCubic(inv(A.berat + .4, A.berat + 1, t)); ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, -130); ctx.lineTo(x, -130 + 300 * k); ctx.stroke(); }
    SPEC.forEach(([v, l], i) => { const x = (i - 1) * 580, ti = A.berat + .55 + i * .3, dim = i === 1 ? 1 : 1 - .55 * kl;
      ctx.globalAlpha = a0 * dim;
      if (i === 1 && kl > 0) { setFont(ctx, DSP(220), 2); const w = ctx.measureText(v).width; ctx.fillStyle = LIME; ctx.fillRect(-w / 2 - 34, 60 - 190, (w + 68) * kl, 220); }
      fall(ctx, v, x, 60, t, ti, DSP(220), { align: 'center', col: i === 1 && kl > .55 ? LIME_INK : IVORY });
      txt(ctx, l, x, 130, t, ti + .25, MN(22), { align: 'center', ls: 4, col: ivo(.75) }); ctx.globalAlpha = a0; });
    const kk = E.outQuint(inv(A.dikunci, A.dikunci + .4, t)); if (kk > 0) { ctx.save(); ctx.translate(150, -150 + (1 - kk) * -40); ctx.globalAlpha = a0 * kk; ctx.strokeStyle = IVORY; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.arc(0, -10, 18, Math.PI, 0); ctx.stroke(); ctx.fillStyle = IVORY; ctx.fillRect(-26, -10, 52, 40); ctx.fillStyle = ROOM; ctx.fillRect(-3, 2, 6, 14); ctx.restore(); ctx.globalAlpha = a0; }
    txt(ctx, 'DIKUNCI', 0, 210, t, A.dikunci + .1, MN(26), { align: 'center', ls: 8, col: ivo(.9) });
    srcTag(ctx, SRC_DF, -840, 440, t, A.berat + .3);
  } };

  // ── SELAM DETAIL: "KONSOL MAHAL" → dive through the O → out of the 0 of "30" ─────────────────────────────────
  const CSS1 = DSP(300), WORD = 'KONSOL MAHAL', BY = 600, F = counterOf(WORD, 1, CSS1, W / 2, BY);
  const CSS2 = DSP(420), NY = 690, NF = counterOf('30', 1, CSS2, W / 2, NY), RC = [W / 2, NY - 150];
  const dive = selam({ t0: A.kenapa - .1, tc: A.detik + .3, t1: A.otak + .6, f: [F.x, F.y], r: F.w * .16, nf: [NF.x, NF.y], nr: NF.w * .16,
    page(g, t) {
      if (V.lorong) { g.filter = GRADE_DOC; cover(g, vf(V.lorong, t - A.kenapa, .7), 0, 0, W, H, 1.04 + .03 * inv(A.kenapa, A.detik, t)); g.filter = 'none'; }
      g.fillStyle = 'rgba(11,12,9,.58)'; g.fillRect(0, 0, W, H);
      typeOn(g, 'KENAPA', W / 2, 290, t, A.kenapa, MN(34), { align: 'center', ls: 12, col: ivo(.9), cps: 24 });
      setFont(g, CSS1, 0); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; const tw = g.measureText(WORD).width, x0 = W / 2 - tw / 2;
      for (let i = 0; i < WORD.length; i++) { const s = t - A.konsol + .1 - i * .04; if (s <= 0) break; g.globalAlpha = clamp(s / .1); g.fillStyle = IVORY;
        g.fillText(WORD[i], x0 + g.measureText(WORD.slice(0, i)).width, BY + (1 - spring(s, .55, .38)) * -140); }
      g.globalAlpha = 1;
      txt(g, 'tetap cuma 30 gambar per detik?', W / 2, 760, t, A.konsol + 1.0, SRF(68), { align: 'center' });
      const pk = E.outCubic(inv(A.detik - .45, A.detik + .1, t)); if (pk > 0) { g.fillStyle = '#0B0C09'; g.beginPath(); g.ellipse(F.x, F.y, F.w * .2 * pk, F.size * .27 * pk, 0, 0, 7); g.fill(); }
      g.textAlign = 'left';
    },
    next(g, t) {
      if (V.garasi) { g.filter = GRADE_DOC; cover(g, vf(V.garasi, t - A.detik, .6), 0, 0, W, H, 1.06); g.filter = 'none'; }
      g.fillStyle = 'rgba(11,12,9,.74)'; g.fillRect(0, 0, W, H);
      const lt = t - A.detik - .5, n = lt > 0 ? Math.floor((lt % 1) * 30) + 1 : 0;
      for (let i = 0; i < 30; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 30; g.save(); g.translate(RC[0] + Math.cos(a) * 380, RC[1] + Math.sin(a) * 380); g.rotate(a + Math.PI / 2);
        g.fillStyle = i < n ? (i === n - 1 ? LIME : ivo(.85)) : ivo(.18); g.fillRect(-22, -13, 44, 26); g.restore(); }
      setFont(g, CSS2, 0); g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = IVORY; g.fillText('30', W / 2, NY);
      typeOn(g, 'GAMBAR PER DETIK', W / 2, 1000, t, A.detik + .5, MN(28), { align: 'center', ls: 8, col: ivo(.9), cps: 40 });
      g.textAlign = 'left';
    } });

  // ── S18 · otak konsol: GPU + CPU ─────────────────────────────────────────────────────────────────────────────
  const S18at = A.otak + .35;
  function chipAt(ctx, x, y, t, t0, s) { const q = t - t0; if (q <= 0) return; const k = spring(q, .5, .3), a0 = ctx.globalAlpha;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha = a0 * clamp(q / .1); chip(ctx, s); ctx.restore(); ctx.globalAlpha = a0; }
  const S18 = { at: S18at, via: 'cut', name: 'Otak konsol', draw(ctx, t) {
    typeOn(ctx, 'OTAK KONSOL', -860, -330, t, S18at + .05, MN(28), { ls: 8, col: ivo(.9), cps: 30 });
    chipAt(ctx, -770, -170, t, A.otak + .7, 104);
    txt(ctx, 'GPU', -650, -184, t, A.otak + .85, MN(30), { ls: 6, col: IVORY }); txt(ctx, 'MENGGAMBAR PEMANDANGAN', -650, -142, t, A.otak + 1.0, MN(22), { ls: 3, col: ivo(.8) });
    chipAt(ctx, -770, 60, t, A.ia - .05, 104);
    txt(ctx, 'CPU', -650, 46, t, A.ia + .1, MN(30), { ls: 6, col: IVORY }); txt(ctx, 'MENGATUR DUNIA', -650, 88, t, A.ia + .25, MN(22), { ls: 3, col: ivo(.8) });
    slab(ctx, 'RATUSAN WARGA VIRTUAL', -860, 220, t, A.warga - .05, { size: 24, lx: -770, ly: 140 });
    slab(ctx, 'LALU LINTAS', -860, 288, t, A.lintas - .05, { size: 24 }); slab(ctx, 'CUACA', -616, 288, t, A.cuaca - .05, { size: 24 });
    slab(ctx, 'BERSAMAAN · TIAP DETIK', -860, 356, t, A.cuaca + .5, { size: 24, lime: true });
    srcTag(ctx, SRC_R, -840, 440, t, S18at + .3);
  } };

  // ── S19 · PS5 standar vs PS5 Pro ───────────────────────────────────────────────────────────────────────────
  const S19 = { at: A.ps5, name: 'PS5 vs PS5 Pro', draw(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'PS5 STANDAR', -860, -300, t, A.ps5 + .05, MN(30), { ls: 6, col: ivo(.92), cps: 30 });
    for (let i = 0; i < 30; i++) { const s = t - A.ps5 - .4 - i * .025; if (s <= 0) break; let y = -210, a = clamp(s / .1), r = 0;
      if (i >= 23) { const d = t - A.n23 + .05 - (i - 23) * .05; if (d > 0) { y += 900 * d * d + 40 * d; a *= clamp(1 - d / .6); r = d * (i % 2 ? 2 : -2); } }
      if (a <= 0) continue; ctx.save(); ctx.translate(-850 + i * 25, y + 35); ctx.rotate(r); ctx.globalAlpha = a0 * a; ctx.fillStyle = i >= 23 ? ivo(.55) : IVORY; ctx.fillRect(-10, -35, 20, 70); ctx.restore(); }
    ctx.globalAlpha = a0;
    if (t > A.turun - .25) { const kk = E.outQuint(inv(A.turun - .25, A.turun + .2, t)), v = Math.round(countTo(30, 23, t, A.n23 - .1, .5));
      setFont(ctx, DSP(200), 2); ctx.fillStyle = IVORY; ctx.globalAlpha = a0 * kk; ctx.fillText(`${v} FPS`, -860, 110 + (1 - kk) * 50); ctx.globalAlpha = a0; }
    txt(ctx, 'SAAT LEDAKAN PADAT', -860, 175, t, A.ledakan - .1, MN(24), { ls: 5, col: ivo(.8) });
    const kr = E.outCubic(inv(A.ps5, A.ps5 + .7, t)); ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -330); ctx.lineTo(0, -330 + 660 * kr); ctx.stroke();
    typeOn(ctx, 'PS5 PRO', 90, -300, t, A.sedang - .05, MN(30), { ls: 6, col: ivo(.92), cps: 30 });
    txt(ctx, '+ BAYANGAN RAY TRACING', 90, -170, t, A.bayangan - .1, MN(30), { ls: 3, col: IVORY });
    markLine(ctx, '+ ', 'PSSR', '', 90, 40, t, A.pssr - .45, A.pssr - .03, DSP(170), { align: 'left' });
    txt(ctx, '1440p → MENDEKATI 4K', 90, 120, t, A.pssr + .4, MN(28), { ls: 4, col: ivo(.88) });
    srcTag(ctx, SRC_DF, -840, 440, t, A.ps5 + .3);
  } };

  // ── PSSR lens (screen space, in over): pixel-soft clip outside, sharp inside a moving magnifier ──────────────
  const P0 = A.gampang2 - .15, P1 = A.semua - .1, [lc, lg] = mk(192, 108);
  function lens(o, t) {
    if (t < P0 || t > P1 || !V.jason) return;
    const ki = E.outCubic(inv(P0, P0 + .25, t)), ko = E.inCubic(inv(P1 - .35, P1, t)), sw = A.p1440 - .5, useL = t > sw;
    const fr = useL ? vf(V.lucia, t - sw, .45) : vf(V.jason, t - P0, .45), z = 1.05 + .04 * inv(P0, P1, t);
    lg.filter = GRADE_DOC; cover(lg, fr, 0, 0, 192, 108, z); lg.filter = 'none';
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = ki * (1 - ko); o.globalCompositeOperation = 'source-over';
    o.imageSmoothingEnabled = false; o.drawImage(lc, 0, 0, W, H); o.imageSmoothingEnabled = true;
    const lt = t - A.kaca, cx = W * .55 + 330 * Math.sin(.8 * lt), cy = H * .5 + 110 * Math.sin(1.3 * lt);
    const r = (lt > -.1 ? spring(lt + .1, .55, .35) * 250 : 0) + E.inOutCubic(inv(A.k4 - .1, A.k4 + .7, t)) * 1400;
    if (r > 1) { o.save(); o.beginPath(); o.arc(cx, cy, r, 0, 7); o.clip(); o.filter = GRADE_DOC; cover(o, fr, 0, 0, W, H, z); o.filter = 'none'; o.restore();
      const ra = clamp(1 - (r - 300) / 500); if (ra > 0) { o.globalAlpha = ki * (1 - ko) * ra; o.strokeStyle = IVORY; o.lineWidth = 7; o.beginPath(); o.arc(cx, cy, r, 0, 7); o.stroke();
        o.lineWidth = 24; o.lineCap = 'round'; o.beginPath(); o.moveTo(cx + Math.cos(.8) * (r + 8), cy + Math.sin(.8) * (r + 8)); o.lineTo(cx + Math.cos(.8) * (r + 170), cy + Math.sin(.8) * (r + 170)); o.stroke(); o.lineCap = 'butt';
        slab(o, 'PSSR · ≈ 4K', cx + r * .62, cy - r * .9, t, A.kaca + .3, { size: 26, lime: true }); o.globalAlpha = ki * (1 - ko); } }
    const lab = t < A.k4 ? ['1440p · GAMBAR ASLI', false, P0 + .3] : ['MENDEKATI 4K · DITAJAMKAN PSSR', true, A.k4];
    slab(o, lab[0], 110, 150, t, lab[2], { size: 26, lime: lab[1] });
    const g = o.createLinearGradient(0, H * .62, 0, H); g.addColorStop(0, 'rgba(11,12,9,0)'); g.addColorStop(1, 'rgba(11,12,9,.75)'); o.fillStyle = g; o.fillRect(0, H * .62, W, H * .38);
    o.fillStyle = LIME; o.fillRect(110, 937, 14, 14); typeOn(o, 'KACA PEMBESAR PINTAR · ILUSTRASI', 140, 950, t, P0 + .4, MN(26), { ls: 5, col: ivo(.92), cps: 44 });
    srcTag(o, 'Sumber: Rockstar Games · Digital Foundry via TweakTown, Nov 2026', 110, 1010, t, P0 + .5);
    grainRect(o, 0, 0, W, H, t, .1); o.restore();
  }

  // ── S21 · 212 GB downloads into the left block while the counter runs, then it won't fit a 128 GB phone ────
  //    right column = header + counter (y ≤ −70); left = block + phone; bottom-right stays free for Aksa B
  const PX = -330, PY = 60, PW2 = 230, PH2 = 460, SCT = PY - PH2 / 2 + 12, SCB = PY + PH2 / 2 - 12, BW = 180, BH = (SCB - SCT) * 212 / 128, BX0 = -740;
  const DL0 = A.semua + .45, DL1 = A.gb212;                       // download runs exactly until the VO says "212 gigabita"
  const S21 = { at: A.semua, via: 'rise', name: '212 GB vs ponsel', draw(ctx, t) {
    const a0 = ctx.globalAlpha, dl = E.inOutSine(inv(DL0, DL1, t)), n = Math.round(212 * dl), done = t >= DL1;
    typeOn(ctx, 'UKURAN FILE GTA 6', 200, -372, t, A.semua + .1, MN(26), { ls: 6, col: ivo(.88), cps: 40 });
    const kb = E.outCubic(inv(A.semua + .3, A.semua + .7, t)); if (kb > 0) {                 // download bar
      ctx.fillStyle = ivo(.18); ctx.fillRect(200, -338, 640 * kb, 6); ctx.fillStyle = done ? LIME : IVORY; ctx.fillRect(200, -338, 640 * kb * dl, 6);
      txt(ctx, done ? 'SELESAI' : 'MENGUNDUH…', 840, -352, t, A.semua + .5, MN(18, 400), { align: 'right', ls: 3, col: ivo(.6), rise: 0, dur: .2 }); }
    if (t > DL0) { const pop = done ? 1 + .06 * Math.exp(-(t - DL1) * 9) * Math.sin((t - DL1) * 30) : 1;   // counter, lands with a tiny kick
      ctx.save(); ctx.translate(200, -130); ctx.scale(pop, pop); setFont(ctx, DSP(240), 0); ctx.fillStyle = done ? IVORY : ivo(.66); ctx.textAlign = 'left';
      ctx.globalAlpha = a0 * E.outCubic(inv(DL0, DL0 + .25, t)); ctx.fillText(`${n} GB`, 0, 0); ctx.restore(); ctx.globalAlpha = a0; }
    txt(ctx, 'ILUSTRASI SKALA', 202, -76, t, A.gb212 + .6, MN(20), { ls: 4, col: ivo(.55) });
    const sh = t > A.muat - .05 ? Math.sin((t - A.muat) * 70) * 10 * Math.exp(-(t - A.muat) * 4) : 0;
    const kp = t - A.ponsel + .1; if (kp > 0) { const k = spring(kp, .5, .3); ctx.save(); ctx.translate(PX + sh, PY); ctx.scale(k, k); ctx.globalAlpha = a0 * clamp(kp / .1); phone(ctx, PW2, PH2); ctx.restore(); ctx.globalAlpha = a0;
      fall(ctx, '128 GB', -170, 112, t, A.gb128 - .2, DSP(100), { col: IVORY });
      txt(ctx, 'MEMORI PONSEL', -168, 152, t, A.gb128 + .1, MN(20), { ls: 4, col: ivo(.6) }); }
    if (t > DL0) {
      const km = E.inOutCubic(inv(A.gb128 + .35, A.gb128 + 1.0, t)), bx = lerp(BX0, PX + sh, km), bot = lerp(330, SCB, km), h = Math.max(4, BH * dl), top = bot - h;
      ctx.save(); ctx.fillStyle = TILE; ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.fillRect(bx - BW / 2, top, BW, h);
      ctx.beginPath(); ctx.rect(bx - BW / 2, top, BW, h); ctx.clip(); ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2;
      for (let y = top - BW; y < bot; y += 26) { ctx.beginPath(); ctx.moveTo(bx - BW / 2, y + BW); ctx.lineTo(bx + BW / 2, y); ctx.stroke(); }
      const over = km > .98 ? E.outQuint(inv(A.gb128 + 1.0, A.gb128 + 1.4, t)) : 0;
      if (over > 0) { ctx.fillStyle = LIME; ctx.globalAlpha = a0 * over; ctx.fillRect(bx - BW / 2, top, BW, SCT - top); ctx.globalAlpha = a0;
        setFont(ctx, MN(24), 3); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText('TIDAK', bx, top + (SCT - top) / 2 - 6); ctx.fillText('MUAT', bx, top + (SCT - top) / 2 + 26); ctx.textAlign = 'left'; }
      ctx.restore(); ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.strokeRect(bx - BW / 2, top, BW, h);
      if (h > 60) { setFont(ctx, MN(26), 3); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(`${n} GB`, bx, bot - 24); ctx.textAlign = 'left'; } }
    if (t > A.muat - .1) slab(ctx, 'MEMORI PENUH', PX + sh, PY + 40, t, A.muat - .1, { size: 22, align: 'center' });
    srcTag(ctx, 'Sumber: Kompas.com, 19 Nov 2026', -840, 440, t, A.semua + .3);
  } };

  // ── Aksa v2: two long stays, s .78, bottom-right (say-line rises above his head, clear of every station text) ─
  //    A · "racik sendiri" → impressed (o_O → ^_^ → jump *_* on "cahaya")   B · 212 GB → shock at the overflow, T_T on "muat"
  const aksaA = aksaShow({ t: A.rockstar3 + .05, x: 1640, y: 1050, s: .78, stay: 6, jump: A.cahaya - A.rockstar3 - .87,
    face: [[.3, 'o_O'], [A.fisika - A.rockstar3 - .87, '^_^'], [A.cahaya - A.rockstar3 - .87, '*_*']], say: [.45, 'mode chef: ON'] });
  const aksaB = aksaShow({ t: A.ponsel - .45, x: 1640, y: 1050, s: .78, stay: 6, shock: 1.5, sad: A.muat - A.ponsel - .37,
    face: [[1.5, '>_<'], [A.muat - A.ponsel - .37, 'T_T']], say: [1.9, 'hapus galeri dulu?'] });

  // ── S22 · Metacritic 99 · OpenCritic 98 ─────────────────────────────────────────────────────────────────────
  const S22 = { at: A.hasilkerja, name: 'Skor 99', draw(ctx, t) {
    typeOn(ctx, 'SKOR KRITIKUS', 0, -410, t, A.hasilkerja + .05, MN(28), { align: 'center', ls: 8, col: ivo(.88), cps: 34 });
    txt(ctx, 'hasil kerja keras itu', 0, -318, t, A.hasilkerja + .3, SRF(80), { align: 'center' });      // header band y −440…−290
    stamp(ctx, '99', -380, 70, t, A.n99 - .05, { size: 260, rot: -4 });                                     // score band y −110…+300
    txt(ctx, 'METACRITIC · /100', -380, 262, t, A.n99 + .3, MN(26), { align: 'center', ls: 5, col: ivo(.9) });
    if (t > A.n147 - .6) txt(ctx, `DARI ${Math.round(countTo(0, 147, t, A.n147 - .6, .8))} KRITIKUS`, -380, 306, t, A.n147 - .6, MN(24), { align: 'center', ls: 4, col: ivo(.75) });
    fall(ctx, '98', 380, 170, t, A.n147 + .6, DSP(300), { align: 'center', col: IVORY });
    txt(ctx, 'OPENCRITIC · /100', 380, 262, t, A.n147 + .8, MN(26), { align: 'center', ls: 5, col: ivo(.9) });
    srcTag(ctx, 'Sumber: Forbes & Polygon, Nov 2026', -840, 440, t, A.hasilkerja + .3);
  } };

  // ── S23 · closing callback: the network again, Edinburgh → India? ──────────────────────────────────────────
  const S23 = { at: A.tapi, via: 'push', name: 'Edinburgh → India?', draw(ctx, t) {
    net(ctx, t, { ox: 220, oy: 30, s: .85, t0: A.tapi + .05, tl: A.dengan - .1, limeT: A.india - .15 });
    typeOn(ctx, 'TAPI TUNGGU SEBENTAR…', -860, -320, t, A.tapi + .15, MN(30), { ls: 6, col: ivo(.92), cps: 30 });
    typeOn(ctx, 'RIBUAN PEGAWAI LINTAS BENUA', -860, -272, t, A.dengan, MN(24), { ls: 5, col: ivo(.7), cps: 40 });
    txt(ctx, 'benarkah India', -860, 310, t, A.india - .1, SRF(92), {});
    txt(ctx, 'paling banyak?', -860, 410, t, A.india + .35, SRF(92), {});
  } };

  const ST = [S0, { at: A.mari, via: 'cut', name: 'Edinburgh' }, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16,
    { at: A.kenapa, via: 'cut', name: 'Selam 30 FPS' }, S18, S19, { at: A.gampang2, via: 'cut', name: 'PSSR kaca pembesar' }, S21, S22, S23];
  let latarV = () => {};
  // the article page is drawn here (not via full()) so its rupiah chip can sit on top of it
  const ART = { t0: A.ditampik - .45, t1: A.rockstar2 + .6, tab: 'GTA 6 EVERYTHING · 14 OKT 2026', dark: true, dir: 1,
    hl: [[.035, .30, .75, .12, A.ditampik + .2], [.33, .475, .335, .065, A.kolbe - .3]] };
  function artChip(o, t) {
    const c0 = ART.t0 + .85, k = E.outQuint(inv(c0, c0 + .45, t)) * (1 - E.inCubic(inv(ART.t1 - .55, ART.t1 - .25, t))); if (k <= 0) return;
    const x = 1290, y = 812, w = 500, h = 158; o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = k; o.filter = 'none';
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 40; o.shadowOffsetY = 14; o.fillStyle = 'rgba(14,15,12,.94)'; o.fillRect(x, y + (1 - k) * 24, w, h);
    o.shadowColor = 'transparent'; o.translate(0, (1 - k) * 24); o.fillStyle = ivo(.3); o.fillRect(x, y, 4, h);
    setFont(o, MN(22), 4); o.fillStyle = ivo(.75); o.textAlign = 'left'; o.fillText('US$1,5 MILIAR', x + 30, y + 42);
    const k2 = E.outCubic(inv(c0 + .3, c0 + .7, t)); o.globalAlpha = k * k2; setFont(o, SRF(54), 0); o.fillStyle = IVORY; o.fillText('≈ Rp27,4 triliun', x + 28, y + 104 + (1 - k2) * 10);
    o.globalAlpha = k * k2; setFont(o, MN(16, 400), 1); o.fillStyle = GREY; o.fillText('kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', x + 30, y + 138); o.restore();
  }
  const over = (o, t) => { edin(o, t); lens(o, t); dive.draw(o, t); if (IM.art) { evidFull(o, { ...ART, im: IM.art }, t); artChip(o, t); } aksaA.draw(o, t); aksaB.draw(o, t); };
  const full = () => [];
  const sc = makeChapter({ B, ST, load: async () => { await load(); latarV = latar([
      { t0: 0, t1: A.mari + .1, im: IM.sky, dim: .46, z: [1.04, 1.18], pan: [40, -40] },
      { t0: A.internet - .3, t1: A.ditampik - .2, im: IM.sky, dim: .55, z: [1.06, 1.16], pan: [-30, 30], side: 'left' },
      { t0: A.tetap - .3, t1: A.lalu + .05, im: IM.keys, dim: .42, z: [1.04, 1.14], pan: [-30, 30], side: 'bottom' },
      { t0: A.lalu - .3, t1: A.jawab + .05, V: V.nyetir, dim: .5, z: [1.05, 1.12] },
      { t0: A.jawab - .3, t1: A.gampang + .05, V: V.garasi, dim: .52, z: [1.04, 1.1], speed: .8 },
      { t0: A.gampang - .3, t1: A.banyak + .05, im: IM.water, dim: .36, z: [1.04, 1.14], pan: [30, -30], side: 'left' },
      { t0: A.banyak - .3, t1: S12at + .05, im: IM.mud, dim: .36, z: [1.04, 1.12], pan: [-30, 20], side: 'left' },
      { t0: S12at - .05, t1: A.hasil + .05, im: IM.marsh, dim: .36, z: [1.04, 1.12], pan: [20, -30], side: 'left' },
      { t0: A.hasil - .3, t1: A.sederhana + .05, im: IM.neon, dim: .4, z: [1.04, 1.12], pan: [-30, 20], side: 'left' },
      { t0: A.berat - .3, t1: A.kenapa + .1, im: IM.neonB, dim: .35, z: [1.04, 1.1] },
      { t0: S18at - .3, t1: A.ia + .2, V: V.lorong, dim: .5, z: [1.04, 1.1], side: 'left', speed: .8 },
      { t0: A.ia - .2, t1: A.ps5 + .05, im: IM.jl, dim: .38, z: [1.04, 1.12], pan: [20, -20], side: 'left' },
      { t0: A.ps5 - .3, t1: A.gampang2 + .05, V: V.garasi, dim: .64, z: [1.05, 1.1], speed: .7 },
      { t0: A.semua - .3, t1: A.hasilkerja + .05, V: V.nyetir, dim: .72, z: [1.05, 1.14], speed: .6 },
      { t0: A.hasilkerja - .3, t1: A.tapi + .05, V: V.logo, dim: .74, z: [1.04, 1.1] }]); },
    label: 'BAB 1 · DAPUR PRODUKSI', over, full, gate: true, under: (ctx, t, first) => latarV(ctx, t, first) });
  return sc;
}
