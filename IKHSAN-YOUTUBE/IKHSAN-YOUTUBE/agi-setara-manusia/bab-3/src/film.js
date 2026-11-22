// Bab 03 · Pintar ujian, belum tentu pintar hidup (VO agi_vo_ahmad_06, 144,6 s). Dunia terang-dingin "ruang ujian = layar UI" (#B8CDE0 ΔE 20 vs bab-1, tinta #0F1A22).
// 24 stasiun, satu baris kedalaman; ★ Rapor Bergerigi (S6, menara kaca 10 ranah + kavling kosong, kamera rendah terbang) ·
// ★ Morf Titik Dua Gelombang (S18, foto otak → ribuan titik ber-jam sendiri → bohlam → kembali, 8 path offscreen) · penggaris log kedalaman (S16).
//  S1 0      kartu bab + medali berputar          S13 minta   MINTA SUMBER, LALU CEK (ditahan)
//  S2 soal   jendela ujian IMO P1–P6, 35/42       S14 lubang3 anak menyusun balok + penggaris Chollet
//  S3 itu    medali flip, 35/42 STANDAR EMAS      S15 menurut2 Michael Frank · 16 bulan · ≈15 juta kata (tumpukan kata kecil)
//  S4 wah    "AI lebih pintar?" dicoret, BELUM TENTU  S16 bandingkan lantai skala log, tumpukan GPT-3 jatuh keluar bingkai, ≈33.000×
//  S5 anak   tangga dengan 3 lubang runtuh        S17 padahal2 ibu & anak, "sudah mulai bicara"
//  S6 lubang1 ★ Rapor Bergerigi + bukti Hendrycks S18 belumlagi ★ morf titik: otak ±20 W = bohlam vs gedung server
//  S7 bayangkan memo kerja jatuh, HARI 2          S19 tapi2   PR · MEMASAK · MENYETIR (rack focus 3 kedalaman)
//  S8 lubang2 obrolan AI mengarang, KELIRU         S20 pekerjaan jeans, kopi, robot + Coffee Test FRI
//  S9 istilahnya HALUSINASI bergetar              S21 makanya catur dicoret, grid ARC 3 contoh → soal
//  S10 menurut lembar jawaban, Kalai dkk.         S22 maret   abstrak ARC-AGI-3 (arXiv) distabilo
//  S11 jawab A B C D + TIDAK TAHU = 0, corat asal S23 semua   manusia 100 vs AI < 1 %
//  S12 artinya KESEHATAN · HUKUM · UANG           S24 itu2    kalender MAR → SEP disobek, "AGI tiba?"
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, LIME, INK, ivo, setFont, DSP, SRF, MN, D2R, rnd, mk, theme, timing, makeChapter,
  loadImg, loadVid, still, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone, onPlane } from './kit.js';
import { kq, pop, popAt, stamp } from './draw.js';
import { makeSteps, ruler, needle, springSp, diukur } from './agi.js';
import { gelembungChat } from './pustaka/ui.js';
import { check } from './pustaka/dasar.js';
import { stairsL, box, footprint, dotsFrom, morph, drawMorph, panel, medal, kalender, grid, glitch, coret, corat, memo } from './b3.js';
import { cover, scrim, frameOf } from './bg3.js';

const GR = 'saturate(.5) contrast(1.12) brightness(.97)';           // grade footage dingin-netral (tanpa sepia)
const PAPER_UI = '#F4F7F9', DARK = '#0F1A22';
const mixP = (a, b, k) => { const o = {}; for (const key in a) o[key] = lerp(a[key], b[key] ?? a[key], k); return o; };

export function makeFilm() {
  theme(true, { bg: '#B8CDE0', bgrgb: '184,205,224', ink: DARK, inkrgb: '15,26,34', vig: .18 });
  const { T: A } = timing(B);
  const IM = {}, V = {};
  let M = null, MC = null;
  const VID = { typing: 'hands_typing', child: 'young_child', engage: 'child_engaging', mother: 'child_mother', neuron: 'neuron_brain',
    typing3: 'hands_typing3', barista: 'barista_skillfully', traffic: 'dynamic_traffic', fold: 'efficient_folding', pour: 'pour_coffee',
    robot: 'humanoid_robot', chess: 'chess_board', server: 'server_units' };
  async function load() {
    const S = '../assets/shared/';
    [IM.hen, IM.arc3, IM.coffee, IM.brain, IM.toy, IM.dc] = await Promise.all([
      loadImg(S + 'kutipan/arxiv-computer-science-artificial-intelligence.png', 2000),
      loadImg(S + 'kutipan/arxiv-computer-science-artificial-intelligence-3.png', 2000),
      loadImg(S + 'kutipan/forecastingresearch-when-will-robots-pass-the-coffee-test.png', 1800),
      loadImg(S + 'stok-situs/unsplash-close-up-model-otak-plastik-JkAxfH5ktpw.jpg', 2000),
      loadImg(S + 'stok-situs/unsplash-mainan-otak-manusia-IHfOpAzzjHM.jpg', 900),
      loadImg(S + 'stok-situs/pexels-data-center-interior-showcasing-4597280.jpg', 2000)]);
    const keys = Object.keys(VID), vs = await Promise.all(keys.map(k => loadVid(S + 'vid/', VID[k])));
    keys.forEach((k, i) => V[k] = vs[i]);
    // ★ morf titik: sumber = foto otak (960×640, titik terang), target = siluet bohlam terisi
    const [bc, bg] = mk(960, 640); bg.drawImage(IM.brain, 0, 0, 960, 640);
    const [uc, ug] = mk(560, 780); ug.fillStyle = '#fff'; ug.beginPath(); ug.arc(280, 290, 250, Math.PI * .78, Math.PI * .22); ug.lineTo(390, 590); ug.lineTo(170, 590); ug.closePath(); ug.fill();
    for (const [y, w] of [[612, 230], [652, 210], [692, 190]]) ug.fillRect(280 - w / 2, y, w, 28);
    ug.beginPath(); ug.moveTo(250, 740); ug.lineTo(310, 740); ug.lineTo(296, 770); ug.lineTo(264, 770); ug.closePath(); ug.fill();
    M = morph(dotsFrom(bc, 8, .38, 1), dotsFrom(uc, 8, .5, 2));
    MC = mk(1440, 656);
  }

  // ── stasiun dengan dunia sendiri (tangga, menara, lantai log) ───────────────────────────────────────────
  const S5 = { at: A.anak, via: 'rise', name: 'tiga lubang', py: -700, dist: [1700, 1540], pitch: 14 };
  S5.world = (ctx, t, pr, foc, items) => {
    if (t < S5.at - .7 || t > A.lubang1 + .35) return;
    const st = S5.st ??= makeSteps([['run', 10]], S5.z - 1100), holes = { 3: A.tiga, 6: A.tiga + .35, 8: A.tiga + .7 };
    stairsL(ctx, t, pr, items, st, () => 1 - inv(A.lubang1 - .25, A.lubang1 + .25, t), { holes });
    Object.entries(holes).forEach(([idx, th], n) => { const s = st[idx], p = pr(0, s.y1 - 190, (s.z + s.z1) / 2); if (p.z < 120) return;
      items.push({ d: p.z - 50, f: () => { ctx.setTransform(1, 0, 0, 1, 0, 0); popAt(ctx, p.x, p.y, t, th + .1, () => { ctx.scale(p.s * 1.5, p.s * 1.5);
        ctx.fillStyle = DARK; ctx.beginPath(); ctx.arc(0, 0, 58, 0, 7); ctx.fill(); setFont(ctx, DSP(86), 0); ctx.textAlign = 'center'; ctx.fillStyle = PAPER_UI; ctx.fillText(String(n + 1), 0, 30); ctx.textAlign = 'left'; }, { from: .3 }); } });
    });
  };
  S5.over = (o, t) => markLine(o, 'bolong di ', 'tiga', ' tempat', 0, -340, t, A.bolong - .1, A.tiga, SRF(88));

  // S6 ★ Rapor Bergerigi: 10 ranah Hendrycks = menara kaca; kavling "memori jangka panjang" kosong; profil GPT-5 → GPT-4 → GPT-5 (ILUSTRASI)
  const RANAH = [['PENGETAHUAN'], ['BACA-TULIS'], ['MATEMATIKA'], ['PENALARAN'], ['MEMORI', 'KERJA'], ['MEMORI', 'JANGKA PANJANG'], ['MENGINGAT', 'KEMBALI'], ['VISUAL'], ['PENDENGARAN'], ['KECEPATAN']];
  const G5 = [9, 10, 10, 7, 4, 0, 4, 4, 6, 3], G4 = [8, 6, 4, 0, 2, 0, 4, 0, 0, 3];
  const S6 = { at: A.lubang1, via: 'truck', name: 'rapor bergerigi', py: -400 };
  S6.cam = t => { const Z = S6.z, P = (tx, ty, dist, yaw, pitch) => ({ tx, ty, tz: Z, dist, yaw, pitch });
    const Pa0 = P(-1530, -300, 1150, 40, -6), Pa1 = P(-1000, -300, 1120, 33, -5), Pb0 = P(170, -170, 1000, 24, 10), Pb1 = P(170, -210, 880, 12, 12),
      Pc0 = P(0, -520, 3300, -8, 14), Pc1 = P(80, -540, 3100, 6, 15), tB = A.panjang + .3, tC = A.gpt4 - .3;
    if (t < A.ingatan) return mixP(Pa0, Pa1, inv(S6.at, A.ingatan, t));
    if (t < tB) return mixP(Pa1, Pb0, E.inOutCubic(inv(A.ingatan, tB, t)));
    if (t < tC) return mixP(Pb0, Pb1, inv(tB, tC, t));
    if (t < tC + 1.2) return mixP(Pb1, Pc0, E.inOutCubic(inv(tC, tC + 1.2, t)));
    return mixP(Pc0, Pc1, inv(tC + 1.2, A.bayangkan, t)); };
  S6.world = (ctx, t, pr, foc, items) => {
    if (t < S6.at - .7 || t > A.bayangkan + .1) return; S6.pr = pr; const Z = S6.z, tG4 = A.gpt4 + .2, tG5 = A.gpt5;
    for (let i = 0; i < 10; i++) {
      const x = (i - 4.5) * 340, h5 = 30 + G5[i] * 86, h4 = 30 + G4[i] * 86, tr = S6.at + .05 + i * .09;
      const rise = t > tr ? spring(t - tr, .5, .45) : 0, u4 = t > tG4 ? spring(t - tG4, .5, .4) : 0, u5 = t > tG5 ? spring(t - tG5, .5, .4) : 0;
      const h = Math.max(0, (h5 + (h4 - h5) * u4 + (h5 - h4) * u5) * rise);
      items.push({ d: pr(x, -445, Z + 125).z + 30, f: () => box(ctx, pr, x, Z, 240, 240, 890, { wire: true, wa: .22 }) });
      if (i === 5) items.push({ d: pr(x, 0, Z).z + 20, f: () => footprint(ctx, pr, x, Z, 240, 240, E.outCubic(inv(A.ingatan, A.ingatan + .4, t)), .55 + .45 * Math.cos((t - A.ingatan) * 7)) });
      else items.push({ d: pr(x, -h / 2, Z).z, f: () => box(ctx, pr, x, Z, 240, 240, h, {}) });
      items.push({ d: pr(x, -30, Z - 170).z, f: () => onPlane(ctx, pr, x, -40, Z - 170, foc, () => { const big = i === 5;
        setFont(ctx, MN(big ? 25 : 21), 2); ctx.textAlign = 'center'; ctx.fillStyle = big && t > A.ingatan ? DARK : ivo(.72);
        ctx.fillText(RANAH[i][0], 0, 0); if (RANAH[i][1]) ctx.fillText(RANAH[i][1], 0, big ? 30 : 25); ctx.textAlign = 'left'; }) });
    }
  };
  S6.over = (o, t) => {
    slab(o, 'ILUSTRASI', 880, -440, t, S6.at + .4, { align: 'right', size: 20 });
    typeOn(o, 'RAPOR BERGERIGI · 10 RANAH KEMAMPUAN', -880, -405, t, S6.at + .3, MN(20), { ls: 3, col: ivo(.75) });
    const g1 = gone(t, A.rapor - .45);
    if (g1 > 0) { const a0 = o.globalAlpha; o.globalAlpha = a0 * g1;
      fall(o, 'LUBANG 1', -880, 350, t, A.ingatan - .15, DSP(150), { ls: 2 }); txt(o, 'INGATAN JANGKA PANJANG', -880, 410, t, A.ingatan + .1, MN(28), { ls: 4 });
      if (S6.pr) { const p = S6.pr(170, -10, S6.z); slab(o, 'NYARIS KOSONG', p.x - W / 2 + 130, p.y - H / 2 - 200, t, A.panjang + .3, { size: 30, lx: p.x - W / 2, ly: p.y - H / 2 - 24 }); }
      o.globalAlpha = a0; }
    if (t > A.gpt4 + .1) { const two = t > A.gpt5;
      txt(o, 'SKOR AGI · ILUSTRASI', -880, 250, t, A.gpt4 + .1, MN(22), { ls: 4, col: ivo(.7) });
      fall(o, two ? 'GPT-5 · 57%' : 'GPT-4 · 27%', -880, 385, t, two ? A.gpt5 : A.gpt4 + .1, DSP(150), { ls: 2 });
      srcTag(o, 'Sumber: Hendrycks dkk., arXiv, Okt 2025', -840, 450, t, A.gpt4 + .1); }
  };

  // S16 lantai skala log: z = Zs + (log10 kata − 7)·1300; tumpukan anak kecil di depan, tumpukan GPT-3 jatuh di 500 miliar
  const S16 = { at: A.bandingkan, via: 'truck', name: 'skala log kata', py: -400 };
  const ZL = l => S16.z - 200 + (l - 7) * 1300;
  S16.cam = t => { const P0 = { tx: -150, ty: -280, tz: ZL(7.18), dist: 1250, yaw: 16, pitch: 9 }, P0b = { ...P0, yaw: 10, dist: 1150 },
      P1 = { tx: -220, ty: -520, tz: ZL(11.7) - 300, dist: 1700, yaw: 8, pitch: 1 }, P2 = { ...P1, ty: -1250, pitch: -15, dist: 2000 },
      P3 = { tx: 900, ty: -1600, tz: ZL(9.3), dist: 5600, yaw: -24, pitch: 17 }, P3b = { ...P3, yaw: -16, dist: 5300 };
    if (t < A.gpt3) return mixP(P0, P0b, inv(S16.at, A.gpt3, t));
    if (t < A.n500 - .3) return mixP(P0b, P1, E.inOutCubic(inv(A.gpt3, A.n500 - .3, t)));
    if (t < A.hitungan - .1) return mixP(P1, P2, E.outCubic(inv(A.n500 - .3, A.n500 + .5, t)));
    if (t < A.hitungan + 1.3) return mixP(P2, P3, E.inOutCubic(inv(A.hitungan - .1, A.hitungan + 1.3, t)));
    return mixP(P3, P3b, inv(A.hitungan + 1.3, A.padahal2, t)); };
  const stripes = (ctx, pr, x, z, w, h, step, a) => { ctx.strokeStyle = ivo(a); ctx.lineWidth = 1.5; ctx.beginPath();
    for (let y = step; y < h; y += step) { const p = pr(x - w / 2, -y, z - w / 2), q = pr(x + w / 2, -y, z - w / 2), r2 = pr(x + w / 2, -y, z + w / 2);
      if (p.z < 60 || q.z < 60 || r2.z < 60) continue; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.lineTo(r2.x, r2.y); } ctx.stroke(); };
  S16.world = (ctx, t, pr, foc, items) => {
    if (t < S16.at - .7 || t > A.padahal2 + .2) return;
    const seg = (x0, x1, z, a, lw) => { const p = pr(x0, 0, z), q = pr(x1, 0, z); if (p.z < 120 || q.z < 120) return; ctx.strokeStyle = ivo(a); ctx.lineWidth = Math.max(1, lw * p.s); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); };
    items.push({ d: 1e9, f: () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none';
      ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.beginPath(); let pen = false;
      for (let z = ZL(6.7); z <= ZL(12.2); z += 120) { const p = pr(0, 0, z); if (p.z < 120) { pen = false; continue; } pen ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); pen = true; } ctx.stroke();
      for (let d = 7; d <= 11; d++) { seg(-620, 620, ZL(d), .5, 4); if (d < 12) for (let m = 2; m <= 9; m++) seg(-110, 110, ZL(d + Math.log10(m)), .3, 3); }
      const kr = E.outCubic(inv(A.n500, A.n500 + .9, t));                      // cincin debu di titik jatuh
      if (kr > 0 && kr < 1) { ctx.strokeStyle = ivo(.5 * (1 - kr)); ctx.lineWidth = 3; ctx.beginPath();
        for (let i = 0; i <= 48; i++) { const q = i / 48 * 6.283, p = pr(-300 + Math.cos(q) * (260 + 1100 * kr), 0, ZL(11.7) + Math.sin(q) * (260 + 1100 * kr)); if (p.z < 120) continue; i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); } ctx.stroke(); }
    } });
    const LAB = ['10 JUTA', '100 JUTA', '1 MILIAR', '10 MILIAR', '100 MILIAR'];
    LAB.forEach((s, i) => items.push({ d: pr(520, -60, ZL(7 + i)).z, f: () => onPlane(ctx, pr, 520, -70, ZL(7 + i), foc, () => {
      setFont(ctx, DSP(78), 2); ctx.fillStyle = DARK; ctx.fillText(s, 0, 0); setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.6); ctx.fillText('KATA', 4, 34); }) }));
    const zc = ZL(7.18);                                                                    // tumpukan kata anak
    items.push({ d: pr(-300, -90, zc).z, f: () => { box(ctx, pr, -300, zc, 300, 220, 180, { solid: true }); stripes(ctx, pr, -300, zc, 300, 180, 45, .35); } });
    items.push({ d: pr(-300, -330, zc - 120).z, f: () => onPlane(ctx, pr, -300, -330, zc - 120, foc, () => { setFont(ctx, MN(24), 3); ctx.textAlign = 'center'; ctx.fillStyle = DARK;
      ctx.fillText('ANAK 16 BULAN', 0, 0); setFont(ctx, DSP(64), 1); ctx.fillText('≈ 15 JUTA', 0, 66); ctx.textAlign = 'left'; }) });
    if (t > A.n500 - .45) { const zg = ZL(11.7), drop = 4200 * (1 - E.inCubic(inv(A.n500 - .45, A.n500, t))) - (t > A.n500 ? 40 * Math.sin((t - A.n500) * 30) * Math.exp(-(t - A.n500) * 9) : 0);
      const prD = (x, y, z) => pr(x, y - drop, z);
      items.push({ d: pr(-300, -800, zg).z, f: () => { box(ctx, prD, -300, zg, 360, 360, 5200, { solid: true }); stripes(ctx, prD, -300, zg, 360, 5200, 130, .3); } });
      items.push({ d: pr(150, -900, zg - 280).z, f: () => onPlane(ctx, pr, 150, -900, zg - 280, foc, () => { ctx.globalAlpha = E.outCubic(inv(A.n500 + .1, A.n500 + .4, t));
        setFont(ctx, DSP(150), 2); ctx.fillStyle = DARK; ctx.fillText('GPT-3', 0, 0); setFont(ctx, MN(30), 3); ctx.fillText('± 500 MILIAR KATA', 4, 52); }) });
    }
  };
  S16.over = (o, t) => {
    typeOn(o, 'SKALA LOG · TIAP GARIS 10× LIPAT · PERKIRAAN', 880, -420, t, S16.at + .3, MN(19), { ls: 3, col: ivo(.75), align: 'right' });
    if (t < A.n33) srcTag(o, 'Sumber: Michael Frank, Stanford Engineering, 9 Feb 2024 (perkiraan)', -840, 450, t, S16.at + .3);
    else srcTag(o, 'Hitungan: 500 miliar ÷ 15 juta ≈ 33.000', -840, 450, t, A.n33);
    stamp(o, '≈ 33.000×', 0, -40, t, A.n33, { size: 190 });
    txt(o, 'lipat lebih banyak kata', 0, 130, t, A.lipat - .15, SRF(72), { align: 'center' });
  };

  // S18 ★ morf titik dua gelombang — revisi 17-11: tanpa panel, semua latar penuh (klip neuron → foto otak → titik → bohlam; pusat data → rak server)
  const S18 = { at: A.belumlagi, via: 'rise', name: 'otak vs bohlam', mod: (c, t) => { c.dist -= 90 * inv(A.belumlagi, A.tapi2, t); } };
  S18.bg = (ctx, t, P) => {
    const kPh = kq(t, A.otak - .25, .6), dOn = kq(t, A.n86 - .1, .8), back = kq(t, A.jadi + 1.5, .7), dotA = dOn * (1 - back);
    const kd = kq(t, A.ai - .15, .5) * gone(t, A.jadi - .4, .4), ks = kq(t, A.gedung - .3, .5);
    ctx.fillStyle = '#0A1117'; ctx.fillRect(0, 0, W, H);
    if (kPh < 1) cover(ctx, frameOf(V.neuron, t, A.belumlagi - .4), { ...P, grade: 'saturate(.7) contrast(1.1) brightness(.82)' });
    if (kPh > 0) cover(ctx, IM.brain, { ...P, a: kPh * (1 - .86 * dotA) });
    if (kd > 0) { cover(ctx, IM.dc, { ...P, a: kd * (1 - ks) }); if (ks > 0) cover(ctx, frameOf(V.server, t, A.gedung - .3), { ...P, a: kd * ks }); }
    scrim(ctx, t, { dark: .2 + .18 * dotA, side: kd > .01 ? ['bottom', 'left'] : 'bottom', vig: .6 });
    if (dotA > 0 && M) {                                     // titik sejajar foto otak penuh-layar (kanvas sampel 960 px → skala cover)
      const im = IM.brain, s = Math.max(W / im.width, H / im.height) * P.p, mx = (im.width * s - W) / 2, my = (im.height * s - H) / 2, k = s * im.width / 960;
      const kb = E.inOutCubic(inv(A.ai - .2, A.ai + .5, t)) * (1 - E.inOutCubic(inv(A.jadi - .5, A.jadi, t)));
      ctx.save(); ctx.globalAlpha *= dotA; ctx.translate(W / 2 + clamp(P.ox, -mx, mx), H / 2 + clamp(P.oy, -my, my)); ctx.scale(k, k);
      drawMorph(ctx, M, t, { r1: A.tapi, a1: A.tapi + 1.2, r2: A.jadi - .3, a2: A.jadi + .5 }, { cx: 0, cy: 0, r0: .7, r1: 1.4, bT: { s: lerp(.44, .3, kb), ox: lerp(0, -290, kb), oy: lerp(-50, -40, kb) } });
      ctx.restore(); }
  };
  S18.draw = (ctx, t) => {
    txt(ctx, 'OTAK MANUSIA · DAYA LISTRIK', -860, -410, t, A.belumlagi + .1, MN(22), { ls: 5 });
    txt(ctx, 'TITIK = ILUSTRASI', 860, -410, t, A.n86, MN(18), { align: 'right', ls: 4, col: ivo(.75) });
    const a0 = ctx.globalAlpha, g1 = gone(t, A.ai - .35, .3);
    if (g1 > 0) { ctx.globalAlpha = a0 * g1;
      fall(ctx, '±86 MILIAR SEL SARAF', -720, 380, t, A.n86, DSP(72), { ls: 2 }); fall(ctx, '±20 WATT', -60, 380, t, A.watt, DSP(72), { ls: 2 });
      slab(ctx, 'KIRA-KIRA SATU BOHLAM', 210, 362, t, A.setara, { size: 24 }); ctx.globalAlpha = a0; }
    const g2 = gone(t, A.jadi - .2, .3);
    if (g2 > 0 && t > A.ai) { ctx.globalAlpha = a0 * g2; fall(ctx, 'AI', -720, 380, t, A.ai, DSP(72), { ls: 2 }); slab(ctx, 'GEDUNG PENUH MESIN SERVER', -620, 362, t, A.gedung, { size: 24 }); ctx.globalAlpha = a0; }
    markLine(ctx, 'otak = ', 'bohlam kamar', '', 0, 392, t, A.jadi + .1, A.bohlam2, SRF(72));
    srcTag(ctx, 'Sumber: UCL, 16 Sep 2026; Britannica', -720, 450, t, A.n86 + .3);
  };

  const ST = [
    { at: 0, name: 'kartu bab', draw(ctx, t) {                                                            // S1
      // revisi 17-11: portal menutup 0–0,72 s → teks pembuka mulai ≥ 0,85 s, tinta penuh
      txt(ctx, 'BAB 03', -640, -230, t, .85, MN(30), { ls: 8 }); ctx.fillStyle = LIME; ctx.fillRect(-640, -205, 150 * kq(t, .95, .5), 9);
      fall(ctx, 'PINTAR UJIAN,', -640, -30, t, .95, DSP(230), { ls: 2 });
      txt(ctx, 'belum tentu pintar hidup', -640, 80, t, 1.4, SRF(92));
      typeOn(ctx, 'JULI 2025 · OLIMPIADE MATEMATIKA', -640, 190, t, 1.75, MN(24), { ls: 5, col: ivo(.85) });
      slab(ctx, 'GOOGLE DEEPMIND', -640, 260, t, A.deepmind, { size: 26 });
    }, layers: [{ dz: 700, dx: 640, dy: -40, fn: (ctx, t) => medal(ctx, 0, 0, 200, .4 + t * 1.7, { ink: DARK, lw: 5 }) }] },

    { at: A.soal, via: 'push', name: 'ujian IMO', draw(ctx, t) {                                            // S2
      panel(ctx, 0, -10, 1240, 780, t, A.soal - .1, { title: 'OLIMPIADE MATEMATIKA INTERNASIONAL 2025', tag: 'PESERTA: AI · GOOGLE DEEPMIND', isi: (g, L, T, w, h) => {
        for (let i = 0; i < 6; i++) { const y = T + 132 + i * 82, tr = A.imo + .4 + i * .25, a0 = g.globalAlpha; if (t < tr - .25) continue;
          g.globalAlpha = a0 * kq(t, tr - .25, .3); setFont(g, MN(24), 3); g.fillStyle = 'rgba(15,26,34,.7)'; g.fillText('SOAL ' + (i + 1), L + 60, y + 9);
          for (let j = 0; j < 7; j++) { const x = L + 250 + j * 66; g.strokeStyle = 'rgba(15,26,34,.35)'; g.lineWidth = 2; g.strokeRect(x, y - 18, 52, 34);
            if (i < 5 && t > tr + j * .035) { const kk = Math.min(1, spring(t - tr - j * .035, .6, .2)); g.fillStyle = DARK; g.fillRect(x + 26 - 26 * kk, y - 18, 52 * kk, 34); } }
          if (t > tr + .3) { setFont(g, DSP(64), 0); g.fillStyle = i < 5 ? DARK : 'rgba(15,26,34,.4)'; g.textAlign = 'right'; g.fillText(i < 5 ? '7' : '0', L + w - 60, y + 22); g.textAlign = 'left'; }
          g.globalAlpha = a0; }
        const yT = T + h - 64; g.fillStyle = 'rgba(15,26,34,.2)'; g.fillRect(L + 40, yT - 74, w - 80, 2);
        txt(g, 'TOTAL SKOR', L + 60, yT + 4, t, A.nilainya, MN(26), { ls: 4, col: 'rgba(15,26,34,.7)' });
        if (t > A.n35) { setFont(g, DSP(120), 0); g.fillStyle = DARK; g.textAlign = 'right'; g.fillText(String(Math.round(countTo(0, 35, t, A.n35, .6))), L + w - 240, yT + 30); g.textAlign = 'left'; }
        txt(g, '/ 42', L + w - 60, yT + 30, t, A.n42, DSP(120), { align: 'right', col: 'rgba(15,26,34,.45)' });
      } });
      srcTag(ctx, 'Sumber: Google DeepMind, 21 Jul 2025', -840, 450, t, A.nilainya);
    } },

    { at: A.itu, via: 'rise', name: '35/42 emas', draw(ctx, t) {                                           // S3
      medal(ctx, -520, -10, 170, 6.283 * 2 * (1 - E.outCubic(inv(A.itu - .2, A.itu + 1.6, t))) + .25 * Math.sin(t * 1.3), { ink: DARK, lw: 5 });
      fall(ctx, '35/42', 200, 50, t, A.itu + .15, DSP(260), { align: 'center', ls: 4 });
      markLine(ctx, 'STANDAR ', 'EMAS', ' · IMO 2025', 200, 180, t, A.itu + .6, A.emas, DSP(92), { ls: 2 });
      slab(ctx, 'DIKONFIRMASI KOORDINATOR IMO', 200, 290, t, A.dibenarkan, { align: 'center', size: 24 });
      srcTag(ctx, 'Sumber: Google DeepMind, 21 Jul 2025', -840, 450, t, A.itu + .3);
    }, layers: [{ dz: 700, dx: -520, dy: -20, fn: (ctx, t) => { ctx.strokeStyle = ivo(.2); ctx.lineWidth = 3;
      for (let r = 0; r < 3; r++) { ctx.setLineDash([30 + r * 20, 24]); ctx.lineDashOffset = -t * 40 * (r % 2 ? 1 : -1); ctx.beginPath(); ctx.arc(0, 0, 330 + r * 110, 0, 7); ctx.stroke(); } ctx.setLineDash([]); } }] },

    { at: A.wah, via: 'whip', name: 'belum tentu', draw(ctx, t) {                                          // S4
      txt(ctx, 'AI sudah lebih pintar', 0, -60, t, A.wah + .05, SRF(110), { align: 'center' });
      txt(ctx, 'dari kita?', 0, 70, t, A.pintar - .1, SRF(110), { align: 'center' });
      coret(ctx, -520, 520, -95, t, A.belum - .05, { col: DARK, lw: 8 });
      stamp(ctx, 'BELUM TENTU.', 0, 260, t, A.belum + .05, { size: 150 });
    }, layers: [{ dz: 900, dx: -560, dy: -120, fn: (ctx, t) => { ctx.globalAlpha *= .4; panel(ctx, 0, 0, 900, 560, t, A.wah - .3, { title: 'IMO 2025 · 35/42' }); } }] },

    S5, S6,

    { at: A.bayangkan, via: 'whip', name: 'lupa besok pagi', bg: (ctx, t, P) => {                         // S7 · latar penuh: tangan mengetik
      cover(ctx, frameOf(V.typing, t, A.bayangkan - .4), P); scrim(ctx, t, { dark: .26 + .26 * kq(t, A.pintar2 - .2, .5), side: 'left' });
    }, draw(ctx, t) {
      slab(ctx, t < A.pagi ? 'HARI 1' : 'HARI 2 · PAGI', -780, -380, t, t < A.pagi ? A.bayangkan + .4 : A.pagi, { size: 28 });
      slab(ctx, 'INGATAN KEMARIN: KOSONG', -780, -320, t, A.kemarin, { size: 20 });
      markLine(ctx, 'Pintar sih, tapi ', 'repot', ' juga kan?', 0, 80, t, A.pintar2, A.repot, SRF(88));
    }, layers: [{ dz: -260, dx: 0, dy: 0, fn: (ctx, t) => {
      const M3 = ['Klien minta laporan Jumat', 'Pakai template v2', 'Cek angka sebelum kirim'];
      M3.forEach((s, i) => memo(ctx, [-380, 80, 400][i], [-120, -10, 130][i], s, t, A.jenius + i * .25, A.lupa + i * .12, { rot: [-3, 2, -1][i], vx: [-80, 40, 90][i], spin: [-40, 30, 55][i] }));
    } }] },

    { at: A.lubang2, via: 'push', name: 'mengarang', draw(ctx, t) {                                        // S8
      slab(ctx, 'LUBANG 2 · MENGARANG DENGAN YAKIN', 0, -410, t, A.lubang2 + .1, { align: 'center', size: 24 });
      panel(ctx, 0, 30, 1200, 700, t, A.lubang2 - .1, { title: 'ASISTEN AI · OBROLAN', tag: 'ILUSTRASI', isi: (g, L, T, w, h) => {
        gelembungChat(g, L + w - 60, T + 170, 'Sumbernya dari mana?', t, A.lubang2 + .3, { font: SRF(40), isi: DARK, tinta: PAPER_UI, tag: 'KAMU' });
        const S = 'Dari laporan resmi tahun lalu, halaman 12.', typed = t < A.mengarang ? '' : S.slice(0, Math.ceil((t - A.mengarang) * 32));
        const bw = typed ? gelembungChat(g, L + 60, T + 330, typed, t, A.mengarang - .05, { kiri: true, font: SRF(38), isi: '#DCE5EC', tinta: DARK, tag: 'AI' }) : 0;
        const km = kq(t, A.percaya, .7);
        if (t > A.percaya - .2) { txt(g, 'TINGKAT YAKIN', L + 60, T + 470, t, A.percaya - .2, MN(20), { ls: 4, col: 'rgba(15,26,34,.6)' });
          g.fillStyle = 'rgba(15,26,34,.12)'; g.fillRect(L + 60, T + 490, 700, 24); g.fillStyle = DARK; g.fillRect(L + 60, T + 490, 690 * km, 24);
          txt(g, 'SANGAT YAKIN', L + 790, T + 512, t, A.percaya + .5, MN(22), { ls: 3 }); }
        if (bw) coret(g, L + 70, L + 60 + bw - 10, T + 340, t, A.keliru, { col: DARK, lw: 7 });
        slab(g, 'KELIRU', L + 60, T + 600, t, A.keliru + .05, { lime: true, size: 34 });
      } });
    } },

    { at: A.istilahnya, via: 'cut', name: 'halusinasi', draw(ctx, t) {                                      // S9
      typeOn(ctx, 'ISTILAHNYA', 0, -150, t, A.istilahnya, MN(30), { align: 'center', ls: 10 });
      glitch(ctx, 'HALUSINASI', 0, 90, t, A.halu - .1, DSP(300), { ls: 6 });
    }, layers: [{ dz: 600, fn: (ctx, t) => { const f = Math.floor(t * 24); ctx.fillStyle = ivo(.07);
      for (let i = 0; i < 9; i++) if (rnd(f * 5 + i) > .45) ctx.fillRect(-1300, (rnd(f + i * 3) - .5) * 1100, 2600, 6 + rnd(i + f) * 34); } }] },

    { at: A.menurut, via: 'rise', name: 'pilihan ganda', draw(ctx, t) {                                    // S10
      const pick = [1, 3, 0, 2, 1, 3];
      panel(ctx, -330, -20, 980, 760, t, A.menurut - .1, { title: 'LEMBAR JAWABAN · UJIAN', tag: 'ILUSTRASI', isi: (g, L, T, w, h) => {
        for (let i = 0; i < 6; i++) { const y = T + 140 + i * 100, tr = A.menurut + .2 + i * .12; if (t < tr) continue; const a0 = g.globalAlpha; g.globalAlpha = a0 * kq(t, tr, .3);
          setFont(g, MN(26), 2); g.fillStyle = 'rgba(15,26,34,.6)'; g.fillText(String(i + 1).padStart(2, '0'), L + 60, y + 9);
          for (let j = 0; j < 4; j++) { const x = L + 230 + j * 160, tf = A.cara + i * .3; g.strokeStyle = 'rgba(15,26,34,.55)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 30, 0, 7); g.stroke();
            if (j === pick[i] && t > tf) { const k = Math.min(1, spring(t - tf, .6, .2)); g.fillStyle = DARK; g.beginPath(); g.arc(x, y, 30 * k, 0, 7); g.fill(); }
            else { setFont(g, MN(22), 0); g.fillStyle = 'rgba(15,26,34,.55)'; g.textAlign = 'center'; g.fillText('ABCD'[j], x, y + 8); g.textAlign = 'left'; } }
          g.globalAlpha = a0; }
      } });
      slab(ctx, 'KAJIAN KALAI DKK.', 250, -310, t, A.kalai, { size: 26 });
      slab(ctx, 'PRACETAK · MASIH MENUNGGU TELAAH', 250, -250, t, A.menunggu, { size: 17 });
      txt(ctx, 'salahnya di cara AI…', 250, -130, t, A.salah, SRF(54));
      slab(ctx, 'DILATIH', 250, -40, t, A.dilatih, { size: 34 }); slab(ctx, 'DINILAI', 480, -40, t, A.dinilai, { size: 34 });
      txt(ctx, 'mirip ujian', 250, 120, t, A.pilihan - .6, SRF(60));
      markLine(ctx, '', 'pilihan ganda', '', 262, 220, t, A.pilihan - .3, A.pilihan, SRF(80), { align: 'left' });
      srcTag(ctx, 'Sumber: Kalai dkk., arXiv, 4 Sep 2025 (pracetak)', -840, 450, t, A.kalai + .2);
    } },

    { at: A.jawab, via: 'push', name: 'menebak', draw(ctx, t) {                                             // S11
      ['A', 'B', 'C', 'D'].forEach((L, i) => popAt(ctx, -600 + i * 400, -60, t, A.jawab + .1 + i * .1, () => {
        ctx.fillStyle = PAPER_UI; ctx.strokeStyle = DARK; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fill(); ctx.stroke();
        setFont(ctx, DSP(150), 0); ctx.textAlign = 'center'; ctx.fillStyle = DARK; ctx.fillText(L, 0, 52); ctx.textAlign = 'left'; }));
      corat(ctx, 200, -60, 118, t, A.menebak, { dur: .7, col: DARK, lw: 11 });
      slab(ctx, 'SIAPA TAHU BENAR', 200, -250, t, A.benar, { align: 'center', size: 26, lime: true });
      popAt(ctx, -120, 180, t, A.tidaktahu + .3, () => { ctx.strokeStyle = DARK; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.roundRect(-260, -50, 520, 100, 50); ctx.stroke(); ctx.setLineDash([]);
        setFont(ctx, MN(34), 6); ctx.textAlign = 'center'; ctx.fillStyle = DARK; ctx.fillText('TIDAK TAHU', 0, 12); ctx.textAlign = 'left'; });
      slab(ctx, '= 0 POIN', 170, 180, t, A.nol2, { size: 34 });
      txt(ctx, 'Kita semua pernah begitu waktu ulangan.', 0, 400, t, A.kita2, SRF(64), { align: 'center' });
    } },

    { at: A.artinya, via: 'whip', name: 'urusan penting', draw(ctx, t) {                                    // S12
      txt(ctx, 'Artinya, untuk urusan penting:', 0, -220, t, A.artinya + .1, SRF(76), { align: 'center' });
      [['KESEHATAN', -560, A.kesehatan], ['HUKUM', 0, A.hukum], ['UANG', 560, A.uang]].forEach(([s, x, t0]) => {
        const k = pop(t, t0, .5, .3); if (k <= 0) return; const a0 = ctx.globalAlpha;
        ctx.save(); ctx.translate(x, 60); ctx.scale(1, Math.max(.02, Math.min(1.08, k))); ctx.globalAlpha = a0 * clamp((t - t0) / .1);
        setFont(ctx, DSP(170), 3); ctx.textAlign = 'center'; ctx.fillStyle = DARK; ctx.fillText(s, 0, 60); ctx.fillRect(-140, 100, 280 * Math.min(1, k), 6); ctx.textAlign = 'left'; ctx.restore(); ctx.globalAlpha = a0; });
      txt(ctx, 'jawaban AI jangan langsung ditelan', 0, 330, t, A.uang + .3, MN(24), { align: 'center', ls: 4, col: ivo(.7) });
    } },

    { at: A.minta, via: 'push', name: 'minta sumber', draw(ctx, t) {                                        // S13
      markLine(ctx, 'MINTA SUMBER, LALU ', 'CEK', '', -60, 20, t, A.minta - .1, A.cek, DSP(150), { ls: 3 });
      diukur(ctx, -640, 80, 900, t, A.sumber, 'kamu sendiri');
      check(ctx, 700, -30, 72, t, A.cek + .1);
    }, layers: [{ dz: 800, dx: 520, dy: -170, fn: (ctx, t) => { ctx.globalAlpha *= .35; panel(ctx, 0, 0, 760, 460, t, A.minta - .3, { title: 'SUMBER ASLI · LAPORAN', isi: (g, L, T, w) => {
      g.fillStyle = 'rgba(15,26,34,.18)'; for (let i = 0; i < 7; i++) g.fillRect(L + 50, T + 110 + i * 42, (w - 100) * (.55 + .4 * rnd(i + 3)), 16); } }); } }] },

    { at: A.lubang3, via: 'rise', name: 'boros belajar', bg: (ctx, t, P) => {                               // S14 · latar penuh: anak menyusun balok
      cover(ctx, frameOf(V.child, t, A.lubang3 - .4), { ...P, ox: P.ox + 70 }); scrim(ctx, t, { dark: .3, side: ['right', 'bottom'] });
    }, draw(ctx, t) {
      fall(ctx, 'LUBANG 3', 60, -250, t, A.lubang3 + .2, DSP(130), { ls: 2 });
      const x0 = 60, sp = 8, up = Math.round(countTo(0, 100, t, A.penggaris, .9));
      if (t > A.penggaris - .1) ruler(ctx, x0, -120, sp, { upto: up, label: 'PENGGARIS CHOLLET · EFISIENSI BELAJAR · ILUSTRASI', alpha: kq(t, A.penggaris - .1, .3) });
      if (t > A.chollet) { needle(ctx, x0 + 88 * sp, -170, 210, kq(t, A.chollet, .35)); txt(ctx, 'ANAK', x0 + 88 * sp, -185, t, A.chollet + .1, MN(22), { align: 'center', ls: 3 }); }
      if (t > A.boros - .5) { const v = springSp(t, A.boros, 88, 6), x = x0 + v * sp, a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * kq(t, A.boros - .5, .3);
        ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x - 18, 76); ctx.lineTo(x + 18, 76); ctx.closePath(); ctx.fill();
        setFont(ctx, MN(24), 3); ctx.textAlign = 'center'; ctx.fillText('AI', x, 110); ctx.textAlign = 'left'; ctx.globalAlpha = a0; }
      markLine(ctx, 'AI itu ', 'boros', ' belajar', 0, 400, t, A.boros - .3, A.boros, SRF(84));
    } },

    { at: A.menurut2, via: 'whip', name: 'Michael Frank', bg: (ctx, t, P) => {                              // S15 · latar penuh: anak bermain
      cover(ctx, frameOf(V.engage, t, A.menurut2 - .4), { ...P, ox: P.ox - 60 }); scrim(ctx, t, { dark: .28, side: 'left' });
    }, draw(ctx, t) {
      slab(ctx, 'MENURUT MICHAEL FRANK · STANFORD', -880, -300, t, A.frank, { size: 22 });
      fall(ctx, 'ANAK 16 BULAN', -880, -120, t, A.enambelas - .1, DSP(110), { ls: 2 });
      fall(ctx, '≈ 15 JUTA KATA', -880, 50, t, A.juta, DSP(130), { ls: 2 });
      const WORDS = ['mama', 'bola', 'susu', 'mau', 'lagi', 'itu', 'kucing', 'mobil', 'mandi', 'tidur'];
      WORDS.forEach((w, i) => popAt(ctx, -760 + (i % 2) * 200 + (rnd(i) - .5) * 30, 360 - Math.floor(i / 2) * 52, t, A.juta + .1 + i * .06, () => {
        setFont(ctx, MN(22), 2); const tw = ctx.measureText(w).width + 30; ctx.fillStyle = i % 3 ? PAPER_UI : '#DCE5EC'; ctx.fillRect(-tw / 2, -21, tw, 42);
        ctx.strokeStyle = 'rgba(15,26,34,.3)'; ctx.lineWidth = 1.5; ctx.strokeRect(-tw / 2, -21, tw, 42); ctx.fillStyle = DARK; ctx.textAlign = 'center'; ctx.fillText(w, 0, 8); ctx.textAlign = 'left'; }, { rise: -60, rot: (rnd(i + 4) - .5) * 8 }));
      srcTag(ctx, 'Sumber: Michael Frank, Stanford Engineering, 9 Feb 2024 (perkiraan)', -840, 450, t, A.frank + .3);
    } },

    S16,

    { at: A.padahal2, via: 'whip', name: 'sudah bicara', bg: (ctx, t, P) => {                               // S17 · latar penuh: ibu & anak
      cover(ctx, frameOf(V.mother, t, A.padahal2 - .4), P); scrim(ctx, t, { dark: .22, side: ['bottom', 'top'], sa: .78 });
    }, draw(ctx, t) {
      slab(ctx, 'DENGAN ≈ 15 JUTA KATA', -760, -360, t, A.padahal2 + .2, { size: 24 });
      markLine(ctx, 'si anak sudah mulai ', 'bicara', '', 0, 330, t, A.padahal2 + .4, A.bicara, SRF(88));
    } },

    S18,

    { at: A.tapi2, via: 'whip', name: 'sehari-hari', bg: (ctx, t, P) => {                                   // S19 · latar penuh berganti: PR → masak → setir
      cover(ctx, frameOf(V.typing3, t, A.tapi2 - .4), P);
      const k2 = kq(t, A.masak - .2, .35), k3 = kq(t, A.setir - .2, .35);
      if (k2 > 0) cover(ctx, frameOf(V.barista, t, A.masak - .2), { ...P, a: k2 });
      if (k3 > 0) cover(ctx, frameOf(V.traffic, t, A.setir - .2), { ...P, a: k3 });
      scrim(ctx, t, { dark: .24, side: ['bottom', 'top'], sa: .75 });
    }, draw(ctx, t) {
      typeOn(ctx, 'URUSAN SEHARI-HARI', 0, -430, t, A.tapi2 + .1, MN(26), { align: 'center', ls: 8 });
      [['PR', A.pr, A.masak - .2], ['MEMASAK', A.masak, A.setir - .2], ['MENYETIR', A.setir, 1e9]].forEach(([lab, t0, t1], i) => {
        const g = gone(t, t1, .25); if (g <= 0 || t <= t0 - .05) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * g;
        txt(ctx, `0${i + 1} / 03`, -860, 180, t, t0 - .05, MN(24), { ls: 6, col: ivo(.8) });
        fall(ctx, lab, -860, 380, t, t0, DSP(210), { ls: 3 }); ctx.globalAlpha = a0; });
    } },

    { at: A.pekerjaan, via: 'push', name: 'coffee test', bg: (ctx, t, P) => {                              // S20 · latar penuh: jeans → kopi → robot, bukti tetap kartu
      cover(ctx, frameOf(V.fold, t, A.pekerjaan - .4), P);
      const k2 = kq(t, A.pekerjaan + 1.6, .4), k3 = kq(t, A.robot - .6, .4);
      if (k2 > 0) cover(ctx, frameOf(V.pour, t, A.pekerjaan + 1.6), { ...P, a: k2 });
      if (k3 > 0) cover(ctx, frameOf(V.robot, t, A.robot - .6), { ...P, a: k3 });
      scrim(ctx, t, { dark: .34, side: 'top' });
    }, draw(ctx, t) {
      evid(ctx, IM.coffee, 0, 70, 1400, t, A.pekerjaan + .8, { tab: 'FORECASTING RESEARCH INSTITUTE', rot: -1 });
      slab(ctx, 'UJIAN BERAT BUAT ROBOT', -860, -400, t, A.robot, { size: 26 });
      srcTag(ctx, 'Sumber: Forecasting Research Institute', -840, 450, t, A.pekerjaan + 1.0);
    } },

    { at: A.makanya, via: 'rise', name: 'ARC', bg: (ctx, t, P) => {                                        // S21 · latar penuh: papan catur
      cover(ctx, frameOf(V.chess, t, A.makanya - .4), P); scrim(ctx, t, { dark: .3 + .14 * kq(t, A.arc - .2, .5), side: ['left', 'right'], sa: .62 });
    }, draw(ctx, t) {
      txt(ctx, 'UJIAN KECERDASAN?', -860, -330, t, A.makanya + .1, MN(26), { ls: 4 });
      coret(ctx, -870, -540, -340, t, A.dihafal, { lw: 6 });
      slab(ctx, 'CATUR BISA DIHAFAL', -520, 260, t, A.dihafal + .05, { align: 'center', size: 26 });
      fall(ctx, 'ARC', -20, -290, t, A.arc, DSP(150), { ls: 4 }); txt(ctx, 'TES ABSTRAKSI & PENALARAN', 190, -310, t, A.arc + .2, MN(20), { ls: 3, col: ivo(.7) });
      const EX = [[['......', '.####.', '.#..#.', '.#..#.', '.####.', '......'], ['......', '.####.', '.#++#.', '.#++#.', '.####.', '......']],
        [['######', '#....#', '#....#', '######', '......', '......'], ['######', '#++++#', '#++++#', '######', '......', '......']],
        [['......', '......', '..###.', '..#.#.', '..###.', '......'], ['......', '......', '..###.', '..#+#.', '..###.', '......']]];
      EX.forEach(([a, b], i) => { const y = -150 + i * 180, t0 = A.tiga2 + i * .2;
        grid(ctx, 60, y, 28, a, t, t0, { stag: .006 }); grid(ctx, 300, y, 28, b, t, t0 + .15, { stag: .006 });
        if (t > t0) { ctx.globalAlpha *= 1; setFont(ctx, MN(28), 0); ctx.fillStyle = ivo(.6); ctx.fillText('→', 163, y + 10); } });
      const TQ = ['.#####', '.#...#', '.#...#', '.#...#', '.#####', '......'];
      grid(ctx, 560, 0, 30, TQ, t, A.tebak - .3, { stag: .006 });
      if (t > A.tebak - .2) { setFont(ctx, MN(30), 0); ctx.fillStyle = ivo(.6); ctx.fillText('→', 658, 12); }
      if (t < A.aturan + .3) { if (t > A.tebak) { popAt(ctx, 790, 0, t, A.tebak, () => { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.strokeRect(-90, -90, 180, 180); ctx.setLineDash([]);
        setFont(ctx, DSP(120), 0); ctx.textAlign = 'center'; ctx.fillStyle = INK; ctx.fillText('?', 0, 42); ctx.textAlign = 'left'; }); } }
      else grid(ctx, 790, 0, 30, ['.#####', '.#***#', '.#***#', '.#***#', '.#####', '......'], t, A.aturan + .3, { stag: .01 });
      slab(ctx, 'TEBAK ATURANNYA', 480, 140, t, A.tebak, { size: 22 });
      srcTag(ctx, 'Sumber: ARC Prize', -840, 450, t, A.arc + .2);
    } },

    { at: A.maret, via: 'push', name: 'ARC-AGI-3', draw(ctx, t) {                                          // S22
      evid(ctx, IM.arc3, 0, 10, 1700, t, A.maret, { crop: [40 / 2706, .0965, .798, .328], rot: -1.2, tab: 'ARXIV · ARC PRIZE · 24 MAR 2026',
        hl: [[.181, .445, .058, .055, A.permainan], [.522, .527, .155, .055, A.tanpa]] });
      slab(ctx, 'MARET 2026 · ARC-AGI-3', -850, -320, t, A.maret + .3, { size: 26 });
      slab(ctx, 'PERMAINAN INTERAKTIF', -850, 320, t, A.permainan, { size: 26 });
      slab(ctx, 'TANPA PETUNJUK', -200, 320, t, A.tanpa, { size: 26 });
      srcTag(ctx, 'Sumber: ARC Prize, arXiv, 24 Mar 2026', -840, 450, t, A.maret + .4);
    } },

    { at: A.semua, via: 'push', name: 'manusia vs AI', draw(ctx, t) {                                      // S23
      const x0 = -650, sp = 13;
      txt(ctx, 'MANUSIA', x0 - 30, -340, t, A.semua, DSP(80), { ls: 3 });
      ruler(ctx, x0, -300, sp, { upto: Math.round(countTo(0, 100, t, A.semua + .2, 1.6)), label: 'LINGKUNGAN TERPECAHKAN · %', alpha: kq(t, A.semua, .4) });
      if (t > A.manusia) { const k = pop(t, A.manusia); ctx.fillStyle = DARK; ctx.fillRect(x0 + 100 * sp - 5, -330, 10, 190 * Math.min(1, k)); }
      slab(ctx, 'SEMUA LINGKUNGAN TERPECAHKAN', 700, -390, t, A.manusia, { align: 'right', size: 22 });
      txt(ctx, 'AI TERDEPAN', x0 - 30, -50, t, A.nilai - .2, DSP(80), { ls: 3 });
      ruler(ctx, x0, -10, sp, { label: 'LINGKUNGAN TERPECAHKAN · %', alpha: kq(t, A.nilai - .2, .4) });
      needle(ctx, x0 + .8 * sp, -40, 200, kq(t, A.satu, .35));
      fall(ctx, '< 1%', x0 - 30, 340, t, A.persen, DSP(230), { ls: 2 });
      txt(ctx, '100% = semua lingkungan bisa', 700, 280, t, A.persen + .3, MN(20), { align: 'right', ls: 2, col: ivo(.75) });
      txt(ctx, 'diselesaikan manusia (uji Maret 2026)', 700, 312, t, A.persen + .4, MN(20), { align: 'right', ls: 2, col: ivo(.75) });
      srcTag(ctx, 'Sumber: ARC Prize, arXiv, 24 Mar 2026', -840, 450, t, A.semua + .4);
    } },

    { at: A.itu2, via: 'whip', name: 'AGI tiba?', draw(ctx, t) {                                          // S24
      kalender(ctx, -500, -10, t, A.itu2, A.september, ['MAR', 'MARET 2026'], ['SEP', 'SEPTEMBER 2026'], { head: 'ARC-AGI-3 · DIUJI', w: 500, h: 600 });
      txt(ctx, 'lalu kenapa sudah ada', 330, -40, t, A.september + .2, SRF(66), { align: 'center' });
      markLine(ctx, 'yang bilang ', 'AGI', ' tiba?', 330, 70, t, A.september + .5, A.agi, SRF(84));
    } },
  ];

  // ── revisi 17-11 "jangan dikotakin": stasiun ber-s.bg punya latar penuh-layar (item terjauh, ruang layar) + tinta terang ──
  const LO = { bg: '#B8CDE0', bgrgb: '184,205,224', ink: DARK, inkrgb: '15,26,34', vig: .18 }, DO = { ...LO, ink: '#EEF3F7', inkrgb: '238,243,247' };
  const night = fn => fn && ((...a) => { theme(false, DO); try { return fn(...a); } finally { theme(true, LO); } });
  ST.forEach((s, i) => { if (!s.bg) return; const nx = ST[i + 1], w0 = s.world;
    s.draw = night(s.draw); for (const L of s.layers || []) L.fn = night(L.fn);
    s.world = (ctx, t, pr, foc, items, c) => { if (w0) w0(ctx, t, pr, foc, items, c);
      const a = E.outCubic(inv(s.at - .45, s.at + .05, t)) * (nx && !nx.bg ? 1 - E.inCubic(inv(nx.at - .3, nx.at + .3, t)) : 1); if (a <= 0) return;
      const P = { p: 1.07 + .07 * inv(s.at - .4, nx ? nx.at + .4 : s.at + 8, t), ox: -(c.tx - s.x) * .12 - c.yaw * 6, oy: -(c.ty - s.py + 20) * .08 };
      items.push({ d: 1e9 - s.at, f: () => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.filter = 'none'; s.bg(ctx, t, P); ctx.restore(); } }); };
  });
  const LABEL = 'BAB 03 · PINTAR UJIAN, BELUM TENTU PINTAR HIDUP';
  const over = (o, t) => { ST.forEach((s, i) => { if (!s.over) return; const nx = ST[i + 1];
    if (t > s.at - .5 && (!nx || t < nx.at + .3)) { o.save(); o.setTransform(1, 0, 0, 1, W / 2, H / 2); o.globalAlpha = 1; o.filter = 'none'; s.over(o, t); o.restore(); } });
    let la = 0; ST.forEach((s, i) => { if (!s.bg) return; const nx = ST[i + 1];        // label bab terang di atas latar gelap (label kit = tinta gelap)
      la = Math.max(la, inv(s.at - .3, s.at + .1, t) * (nx && !nx.bg ? 1 - inv(nx.at - .3, nx.at + .1, t) : 1) * (t < (nx ? nx.at + .4 : 1e9) ? 1 : 0)); });
    if (la > 0) { o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = .8 * la; setFont(o, MN(17), 4); o.fillStyle = '#EEF3F7'; o.textAlign = 'left'; o.fillText(LABEL, 88, 69); o.restore(); } };
  let FULLS;
  const ch = makeChapter({ B, ST, load, over, gate: true, label: LABEL, full: () => FULLS ??= [
    { im: IM.hen, t0: A.rapor - .25, t1: A.gpt4 + .2, crop: [0, 0, .82, .56], dir: 1, tab: 'ARXIV · HENDRYCKS DKK. · OKT 2025',
      hl: [[.091, .793, .087, .037, A.hendrycks + .3], [.152, .837, .208, .037, A.hampir - .1], [.508, .837, .118, .037, A.nol + .1]] },
  ] });
  ch.K = t => (t > A.belumlagi - .4 && t < A.tapi2 + .2) ? 2 : 6;     // morf titik berat → sub-frame lebih sedikit
  return ch;
}
