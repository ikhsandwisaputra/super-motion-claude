// Bab 3 · Promosi tanpa iklan TV & gebrakan Netflix (VO 06, 122 s). Season 3 signature: ONE Selam Detail (475.000.000 → "HOT TOGETHER").
//  S0  0–5.1     judul bab + 13 TAHUN over Out Now (klub → kapal → tangga)
//  S1  5.1–10.8  UI ringkasan tanya-jawab investor, kartu nama Strauss Zelnick (telepon)
//  S2  10.8–16.4 KENAL ≠ BELI, marker lime di BELI pada "uang" (senja)
//  S3  16.4–24.2 TV tabung 2013 vs layar digital 2026, TETAP AGRESIF / CARANYA DIUBAH TOTAL (mobil2)
//  S4  24.2–33.5 grid slot iklan TV → MAHAL → TV padam → linimasa sosial/streaming naik, TV KONVENSIONAL dicoret (kotamalam)
//  S5  33.5–39.7 halaman Deadline, kurung lime di foto Times Square, INTERNET / PANGGUNG BESAR / NBA · MIAMI HEAT (kapal)
//  S6  39.7–50.8 gelombang: merek lain berisik vs Rockstar diam + 3 lonjakan DES 2023 / MEI 2025 / AGU 2026 (pantai, Trailer 1)
//  S7  50.8–68.3 balapan batang 24 jam (diolah dari grafik rekor-trailer-24jam): 93 jt lewati MrBeast 59,4 → skala 500 → 475 (laut)
//      evidFull Hollywood Reporter 68.3–72.1 → SELAM 475.000.000 (menara) → keluar dari O "HOT TOGETHER" (klub) → +182.000 %
//      Aksa sekali: santai/sombong di +182.000 % ("lagu lawas, rezeki baru")
//  S9  88.2–96.0 27 AGUSTUS 2026 · BERSAMA NETFLIX (nyetir, Extended Look PS5 b)
//  S10 96.0–102.7 player 27 MENIT, REKAMAN LANGSUNG PS5, EKSKLUSIF 6 JAM (lorong) · evidFull Variety 102.8–106.8
//  S11 102.7–110.6 31,1 JUTA · 4 HARI, 93 petak negara, 87 menyala lime (lucia)
//  S12 110.6–116.1 trafik situs Netflix +125 %, glitch "SEMPAT TUMBANG" (interogasi)
//  S13 116.1–end layar siaran langsung, NONSTOP, TANPA DIBAYAR → portal BAB 4 (tangga)
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, rnd, IVORY, LIME, LIME_INK, GREY, ivo, setFont, DSP, SRF, MN, MONO, timing, makeChapter, loadImg, loadVid,
  srcTag, slab, txt, fall, typeOn, markLine, countTo, fmt, gone, plate, mk } from './kit.js';
import { latar, aksaShow, selam, counterOf, GRADE_DOC } from './s3.js';

const ROOM = '#0B0C09', INK2 = '#11120E';
const vf = (V, lt, sp = 1) => { const n = V.n, per = 2 * (n - 1), m = Math.floor(Math.max(0, lt) * V.fps * sp) % per; return V.img[m < n ? m : per - m]; };
function cover(g, im, x, y, w, h, z = 1, ox = 0, oy = 0) { const s = Math.max(w / im.width, h / im.height) * z; g.drawImage(im, x + w / 2 - im.width * s / 2 + ox, y + h / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); }
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
const CRT = 'grayscale(.75) contrast(1.25) brightness(.78)';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {}, SH = '../assets/shared/';
  async function load() {
    const K = SH + 'kutipan/';
    [IM.dl, IM.hr, IM.vr] = await Promise.all([loadImg(K + 'deadline-gta-vi-sales-surge-past-2-billion-on.png', 2400),
      loadImg(K + 'hollywoodreporter-grand-theft-auto-vi-trailer-smashes-past.png', 2400), loadImg(K + 'variety-gta-6-extended-look-tops-netflix-charts.png', 1400)]);
    const NV = ['klub', 'kapal', 'tangga', 'telepon', 'senja', 'mobil2', 'kotamalam', 'pantai', 'laut', 'menara', 'flamingo', 'nyetir', 'lorong', 'garasi', 'lucia', 'interogasi'];
    (await Promise.all(NV.map(n => loadVid(SH + 'vid/', n)))).forEach((v, i) => { V[NV[i]] = v; });
    V.klub = { ...V.klub, n: 15, img: V.klub.img.slice(0, 15) };   // revisi 11-21: f_016+ memperlihatkan papan merek nyata → hanya potongan klub bersih (f_001–f_015)
    await aksa.load(); await aksa2.load();
  }

  // ── S0 · judul bab ─────────────────────────────────────────────────────────────────────────────────────────
  const S0 = { at: 0, name: 'Judul Bab 3', draw(ctx, t) {
    const g = gone(t, A.investor - .55, .3); if (g <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * g;
    typeOn(ctx, '03 · BAB 3', 0, -330, t, .3, MN(26), { align: 'center', ls: 8, col: ivo(.85), cps: 26 });
    fall(ctx, 'PROMOSI TANPA IKLAN TV', 0, -150, t, .5, DSP(170), { align: 'center', ls: 2 });
    txt(ctx, 'dan gebrakan Netflix', 0, -62, t, 1.0, SRF(62), { align: 'center', col: ivo(.85) });
    txt(ctx, 'DITUNGGU SELAMA', 0, 60, t, A.tiga - .5, MN(24), { align: 'center', ls: 7, col: ivo(.75) });
    if (t > A.tiga - .35) { const k = E.outQuint(inv(A.tiga - .35, A.tiga + .1, t)), n = Math.round(countTo(0, 13, t, A.tiga - .3, A.tahun - A.tiga + .25));
      setFont(ctx, DSP(250), 2); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.globalAlpha = a0 * g * k; ctx.fillText(`${n} TAHUN`, 0, 290 + (1 - k) * 50);
      const pu = t > A.tahun ? Math.exp(-(t - A.tahun) / .14) : 0; if (pu > .01) { ctx.globalAlpha = a0 * g * pu * .4; ctx.fillStyle = LIME; ctx.fillText(`${n} TAHUN`, 0, 290); }
      ctx.textAlign = 'left'; ctx.globalAlpha = a0 * g; }
    srcTag(ctx, 'Sumber: Rockstar Games (rockstargames.com/VI/media)', -880, 470, t, 1.2);
    ctx.globalAlpha = a0;
  } };

  // ── S1 · ringkasan tanya-jawab investor ────────────────────────────────────────────────────────────────────
  const Q = 'Apakah GTA 6 masih perlu biaya iklan?', QPRE = 'Apakah GTA 6 masih perlu ', QKEY = 'biaya iklan';
  const S1 = { at: A.investor - .2, via: 'whip', name: 'Tanya investor', draw(ctx, t) {
    const a0 = ctx.globalAlpha, k = E.outQuint(inv(A.investor - .25, A.investor + .35, t)); if (k <= 0) return;
    const pw = 1320, ph = 540, px = -660, py = -330 + (1 - k) * 50;
    ctx.globalAlpha = a0 * k; ctx.fillStyle = 'rgba(11,12,9,.84)'; rr(ctx, px, py, pw, ph, 18); ctx.fill(); ctx.strokeStyle = ivo(.28); ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = ivo(.07); ctx.fillRect(px + 2, py + 2, pw - 4, 62); ctx.fillStyle = LIME; ctx.fillRect(px + 30, py + 27, 12, 12);
    setFont(ctx, MN(19), 4); ctx.fillStyle = ivo(.82); ctx.fillText('RINGKASAN TANYA-JAWAB INVESTOR · TAKE-TWO INTERACTIVE', px + 58, py + 40);
    ctx.fillStyle = ivo(.25); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(px + pw - 40 - i * 26, py + 33, 7, 0, 7); ctx.fill(); }
    setFont(ctx, MN(22), 5); ctx.fillStyle = GREY; ctx.fillText('PERTANYAAN', px + 60, py + 140);
    typeOn(ctx, Q, px + 60, py + 215, t, A.investor + .25, MN(40, 400), { cps: 30, col: IVORY });
    const typed = Math.ceil((t - A.investor - .25) * 30); if (t > A.investor + .25 && (typed < Q.length || Math.floor(t * 2.5) % 2)) {
      setFont(ctx, MN(40, 400), 0); const cw = ctx.measureText(Q.slice(0, Math.min(Q.length, typed))).width; ctx.fillStyle = LIME; ctx.fillRect(px + 64 + cw, py + 180, 4, 46); }
    const ku = E.outQuint(inv(A.iklan - .1, A.iklan + .35, t)); if (ku > 0) { setFont(ctx, MN(40, 400), 0); const x0 = ctx.measureText(QPRE).width, wk = ctx.measureText(QKEY).width;
      ctx.fillStyle = LIME; ctx.fillRect(px + 60 + x0, py + 234, wk * ku, 8); }
    ctx.fillStyle = ivo(.12); ctx.fillRect(px + 60, py + 280, pw - 120, 2);
    setFont(ctx, MN(22), 5); ctx.fillStyle = GREY; ctx.globalAlpha = a0 * k * E.outCubic(inv(A.zelnick - .5, A.zelnick, t)); ctx.fillText('DITUJUKAN KEPADA', px + 60, py + 345); ctx.globalAlpha = a0 * k;
    txt(ctx, 'Strauss Zelnick', px + 60, py + 435, t, A.zelnick - .1, SRF(76));
    txt(ctx, 'CEO TAKE-TWO INTERACTIVE · INDUK ROCKSTAR GAMES', px + 62, py + 490, t, A.zelnick + .25, MN(21), { ls: 4, col: ivo(.72) });
    srcTag(ctx, 'Sumber: Game Developer, 17 Sep 2026', px, py + ph + 70, t, A.investor + .8);
    ctx.globalAlpha = a0;
  } };

  // ── S2 · KENAL ≠ BELI ─────────────────────────────────────────────────────────────────────────────────────
  const S2 = { at: A.jawab - .2, via: 'rise', name: 'Kenal bukan beli', draw(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'JAWABAN ZELNICK', 0, -300, t, A.jawab + .05, MN(26), { align: 'center', ls: 8, col: ivo(.82), cps: 30 });
    fall(ctx, 'KENAL', -430, 110, t, A.orang - .15, DSP(300), { align: 'center', ls: 4 });
    txt(ctx, 'tahu nama barangnya', -430, 215, t, A.orang + .25, SRF(50), { align: 'center', col: ivo(.85) });
    const kn = E.outQuint(inv(A.belum - .12, A.belum + .3, t)); if (kn > 0) {
      ctx.strokeStyle = IVORY; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-64 * kn, -22); ctx.lineTo(64 * kn, -22); ctx.moveTo(-64 * kn, 30); ctx.lineTo(64 * kn, 30);
      ctx.moveTo(34, -78); ctx.lineTo(lerp(34, -34, kn), lerp(-78, 86, kn)); ctx.stroke(); ctx.lineCap = 'butt';
      ctx.globalAlpha = a0 * kn; setFont(ctx, MN(20), 5); ctx.fillStyle = ivo(.7); ctx.textAlign = 'center'; ctx.fillText('BELUM TENTU', 0, 150); ctx.textAlign = 'left'; ctx.globalAlpha = a0; }
    setFont(ctx, DSP(300), 4); const bw = ctx.measureText('BELI').width, kb = E.snap(inv(A.uang - .05, A.uang + .25, t));
    if (kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(430 - bw / 2 - 30, -150, (bw + 60) * kb, 300); }
    fall(ctx, 'BELI', 430, 110, t, A.mau - .2, DSP(300), { align: 'center', ls: 4, col: kb > .55 ? LIME_INK : IVORY });
    txt(ctx, 'mau keluar uang', 430, 215, t, A.mau + .15, SRF(50), { align: 'center', col: ivo(.85) });
    ctx.globalAlpha = a0;
  } };

  // ── S3 · TV tabung 2013 vs layar digital 2026 ─────────────────────────────────────────────────────────────
  function crt(ctx, t, x, y, k) {
    const a0 = ctx.globalAlpha, w = 640, h = 500; ctx.save(); ctx.translate(x, y + (1 - k) * 80); ctx.globalAlpha = a0 * k;
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 24; ctx.fillStyle = '#1C1D17'; rr(ctx, -w / 2, -h / 2, w, h, 34); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.stroke();
    const sw = 470, sh = 360, sx = -w / 2 + 34 + sw / 2, sy = -12;
    if (V.kapal) plate(ctx, V.kapal, t, sx, sy, sw, sh, 1, { t0: A.gta, grade: CRT, vig: .85, grain: .3, marks: false, speed: .7 });
    ctx.beginPath(); for (let yy = sy - sh / 2; yy < sy + sh / 2; yy += 6) ctx.rect(sx - sw / 2, yy, sw, 2.2); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fill();
    const rg = ctx.createRadialGradient(sx, sy, sh * .2, sx, sy, sw * .7); rg.addColorStop(0, 'rgba(255,255,255,.06)'); rg.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = rg; ctx.fillRect(sx - sw / 2, sy - sh / 2, sw, sh);
    ctx.fillStyle = ivo(.3); for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(w / 2 - 55, -110 + i * 90, 16, 0, 7); ctx.fill(); }
    ctx.fillStyle = ivo(.15); for (let i = 0; i < 5; i++) ctx.fillRect(w / 2 - 75, 50 + i * 18, 40, 6);
    ctx.restore(); ctx.globalAlpha = a0;
  }
  const S3 = { at: A.gta - .2, via: 'truck', name: 'TV 2013 vs digital 2026', draw(ctx, t) {
    const a0 = ctx.globalAlpha;
    slab(ctx, 'TETAP DIPASARKAN AGRESIF', -760, -390, t, A.agresif - .05, { size: 26 });
    slab(ctx, 'CARANYA DIUBAH TOTAL', 760, -390, t, A.total - .05, { size: 26, align: 'right', lime: true });
    crt(ctx, t, -470, -20, E.outQuint(inv(A.gta - .15, A.gta + .45, t)));
    typeOn(ctx, '2013 · TV JARINGAN · GTA V', -470, 300, t, A.lima - .3, MN(24), { align: 'center', ls: 5, col: ivo(.85), cps: 40 });
    const k1 = E.outQuint(inv(A.gta + .5, A.gta + 1.05, t)), k2 = E.outQuint(inv(A.gta + .75, A.gta + 1.3, t));
    if (k1 > 0) { ctx.globalAlpha = a0 * k1; plate(ctx, V.kotamalam, t, 300, -70 + (1 - k1) * 70, 600, 338, 1, { t0: A.gta, grade: GRADE_DOC, vig: .35, grain: .1 }); ctx.globalAlpha = a0; }
    if (k2 > 0) { ctx.save(); ctx.translate(745, 10 + (1 - k2) * 90); ctx.globalAlpha = a0 * k2; ctx.fillStyle = '#121310'; rr(ctx, -112, -200, 224, 400, 30); ctx.fill(); ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.stroke();
      plate(ctx, V.klub, t, 0, 0, 200, 374, 1, { t0: A.gta, grade: GRADE_DOC, vig: .3, grain: .1, marks: false, speed: .8 }); ctx.restore(); ctx.globalAlpha = a0; }
    typeOn(ctx, '2026 · DIGITAL & STREAMING · GTA VI', 470, 300, t, A.th2013 - .1, MN(24), { align: 'center', ls: 5, col: ivo(.85), cps: 40 });
    const ka = E.outQuint(inv(A.total, A.total + .45, t)); if (ka > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 4; const x0 = -120, x1 = lerp(x0, -20, ka);
      ctx.beginPath(); ctx.moveTo(x0, -20); ctx.lineTo(x1, -20); ctx.lineTo(x1 - 16, -34); ctx.moveTo(x1, -20); ctx.lineTo(x1 - 16, -6); ctx.stroke(); }
    srcTag(ctx, 'Sumber: RockstarINTEL, 21 Mei 2026', -880, 440, t, A.gta + .6);
    ctx.globalAlpha = a0;
  } };

  // ── S4 · slot iklan TV → padam → linimasa sosial ─────────────────────────────────────────────────────────
  const COLT = ['19.00', '19.30', '20.00', '20.30', '21.00', '21.30'], ROWS = ['KANAL 1', 'KANAL 2', 'KANAL 3'];
  const PROG = [['BERITA', 'SINETRON', 'SINETRON', 'KUIS', 'FILM', 'FILM'], ['OLAHRAGA', 'OLAHRAGA', 'TALK SHOW', 'FILM', 'FILM', 'BERITA'], ['KUIS', 'BERITA', 'SINETRON', 'SINETRON', 'MUSIK', 'TALK SHOW']];
  const ADS = [[0, 1], [1, 2], [2, 0], [0, 3], [2, 4], [1, 5]], GX = -620, CW = 245, CH = 92, GY = -230;
  const S4 = { at: A.dulu - .2, via: 'push', name: 'Slot iklan TV', draw(ctx, t) {
    const a0 = ctx.globalAlpha, h1 = gone(t, A.kali - .25, .25);
    ctx.globalAlpha = a0 * h1; typeOn(ctx, 'SLOT IKLAN TV JARINGAN · ERA GTA V', -860, -360, t, A.dulu + .05, MN(26), { ls: 6, col: ivo(.85), cps: 42 }); ctx.globalAlpha = a0;
    typeOn(ctx, 'KALI INI · KATA ZELNICK', -860, -360, t, A.kali + .05, MN(26), { ls: 6, col: ivo(.85), cps: 42 });
    const off1 = E.inCubic(inv(A.tidak - .12, A.tidak + .13, t)), off2 = E.inCubic(inv(A.tidak + .13, A.tidak + .3, t));
    if (off2 < 1) {
      ctx.save(); ctx.translate(120, -60); ctx.scale(1 - off2 * .995, 1 - off1 * .985); ctx.translate(-120, 60);
      setFont(ctx, MN(18), 3); ctx.textAlign = 'center';
      for (let c = 0; c < 6; c++) { ctx.globalAlpha = a0 * E.outCubic(inv(A.dulu - .1 + c * .04, A.dulu + .3 + c * .04, t)); ctx.fillStyle = ivo(.6); ctx.fillText(COLT[c], GX + c * CW + CW / 2, GY - 14); }
      ctx.textAlign = 'left';
      for (let r = 0; r < 3; r++) { ctx.globalAlpha = a0 * E.outCubic(inv(A.dulu + r * .06, A.dulu + .4 + r * .06, t)); ctx.fillStyle = ivo(.75); ctx.fillText(ROWS[r], -860, GY + 30 + r * (CH + 8) + CH / 2); }
      ctx.textAlign = 'center';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const k = E.outQuint(inv(A.dulu - .05 + (r * 6 + c) * .025, A.dulu + .4 + (r * 6 + c) * .025, t)); if (k <= 0) continue;
        const x = GX + c * CW, y = GY + r * (CH + 8) + (1 - k) * 30; ctx.globalAlpha = a0 * k; ctx.fillStyle = ivo(.07); ctx.fillRect(x, y, CW - 8, CH); ctx.strokeStyle = ivo(.2); ctx.lineWidth = 1.5; ctx.strokeRect(x, y, CW - 8, CH);
        ctx.fillStyle = ivo(.55); ctx.fillText(PROG[r][c], x + (CW - 8) / 2, y + CH / 2 + 7); }
      ADS.forEach(([r, c], i) => { const k = E.outQuint(inv(A.slot + i * .15, A.slot + i * .15 + .3, t)); if (k <= 0) return; const x = GX + c * CW, y = GY + r * (CH + 8);
        ctx.globalAlpha = a0; ctx.fillStyle = IVORY; ctx.fillRect(x, y, (CW - 8) * k, CH); ctx.save(); ctx.beginPath(); ctx.rect(x, y, (CW - 8) * k, CH); ctx.clip(); ctx.fillStyle = INK2; ctx.fillText('IKLAN', x + (CW - 8) / 2, y + CH / 2 + 7); ctx.restore(); });
      ctx.textAlign = 'left'; ctx.globalAlpha = a0;
      if (off1 > 0) { ctx.globalAlpha = a0 * off1 * .8; ctx.fillStyle = IVORY; ctx.fillRect(GX - 260, GY - 40, 6 * CW + 280, 3 * (CH + 8) + 40); ctx.globalAlpha = a0; }
      ctx.globalAlpha = a0 * gone(t, A.tidak - .3, .25); slab(ctx, 'MAHAL', 850, 160, t, A.mahal - .05, { size: 40, align: 'right', lime: true });
      typeOn(ctx, 'SATU SLOT · JARINGAN NASIONAL', -860, 160, t, A.slot + .3, MN(22), { ls: 5, col: ivo(.7), cps: 40 }); ctx.globalAlpha = a0;
      ctx.restore();
    }
    // linimasa sosial & layar streaming naik dari titik TV yang padam
    const LB = ['MEDIA SOSIAL', 'STREAMING', 'VIDEO DARING'], VS = [V.klub, V.tangga, V.mobil2];
    for (let i = 0; i < 3; i++) { const s = t - (A.tidak + .4 + i * .13); if (s <= 0) continue; const x = -330 + i * 330, y = 40 + (1 - spring(s, .55, .4)) * 260;
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = a0 * clamp(s / .15); ctx.fillStyle = '#121310'; rr(ctx, -112, -195, 224, 390, 28); ctx.fill(); ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.stroke();
      if (VS[i]) plate(ctx, VS[i], t, 0, 0, 200, 366, 1, { t0: A.tidak + i, grade: GRADE_DOC, vig: .3, grain: .1, marks: false, speed: .8 });
      setFont(ctx, MN(20), 5); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.85); ctx.fillText(LB[i], 0, 238); ctx.textAlign = 'left'; ctx.restore(); }
    ctx.globalAlpha = a0;
    if (t > A.tidak + .3) { txt(ctx, 'TV KONVENSIONAL', 0, -205, t, A.tidak + .3, DSP(120), { align: 'center', ls: 3 });
      setFont(ctx, DSP(120), 3); const tw = ctx.measureText('TV KONVENSIONAL').width, ks = E.outQuint(inv(A.konv - .05, A.konv + .3, t));
      if (ks > 0) { ctx.fillStyle = LIME; ctx.fillRect(-tw / 2 - 20, -252, (tw + 40) * ks, 12); } }
  } };

  // ── S5 · halaman Deadline, foto Times Square ───────────────────────────────────────────────────────────────
  const BR = [.15, .78, .55, .22];
  const S5 = { at: A.uang2 - .2, via: 'whip', name: 'Deadline · Times Square', draw(ctx, t) {
    const im = IM.dl; if (!im) return; const a0 = ctx.globalAlpha, k = E.outQuint(inv(A.uang2 - .25, A.uang2 + .4, t)); if (k <= 0) return;
    const w = 1560, h = w * im.height / im.width, x = -w / 2, y = -330 + (1 - k) * 90;
    ctx.save(); ctx.globalAlpha = a0 * clamp(k * 1.6); ctx.translate(0, y + h / 2); ctx.rotate((1 - k) * .03 - .006); ctx.translate(0, -(y + h / 2));
    setFont(ctx, MN(18), 3); const tb = 'deadline.com · 20 Nov 2026', tw = ctx.measureText(tb).width + 58; ctx.fillStyle = IVORY; ctx.fillRect(x, y - 40, tw, 40);
    ctx.fillStyle = LIME_INK; ctx.fillRect(x + 14, y - 26, 12, 12); ctx.fillStyle = INK2; ctx.fillText(tb, x + 38, y - 13);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = '#fff'; ctx.fillRect(x, y, w, h); ctx.shadowColor = 'transparent';
    ctx.drawImage(im, x, y, w, h); ctx.fillStyle = 'rgba(11,12,9,.05)'; ctx.fillRect(x, y, w, h);
    const kb = E.outQuint(inv(A.panggung - .2, A.panggung + .35, t)); if (kb > 0) {
      const bx = x + BR[0] * w, by = y + BR[1] * h, bw = BR[2] * w, bh = BR[3] * h, P = 2 * (bw + bh), d = P * kb;
      ctx.strokeStyle = LIME; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(bx, by);
      const pts = [[bx + bw, by], [bx + bw, by + bh], [bx, by + bh], [bx, by]]; let left = d, px = bx, py = by;
      for (const [qx, qy] of pts) { const L = Math.hypot(qx - px, qy - py); if (left >= L) { ctx.lineTo(qx, qy); left -= L; px = qx; py = qy; } else { ctx.lineTo(px + (qx - px) * left / L, py + (qy - py) * left / L); break; } }
      ctx.stroke(); }
    ctx.restore(); ctx.globalAlpha = a0;
    const ly = y + h + 4;
    slab(ctx, 'INTERNET', -780, 290, t, A.internet - .05, { size: 26 });
    slab(ctx, 'PANGGUNG BESAR · TIMES SQUARE', -330, 290, t, A.panggung + .15, { size: 26, lx: x + (BR[0] + BR[2] / 2) * w, ly });
    slab(ctx, 'NBA · MIAMI HEAT', 380, 290, t, A.miami - .05, { size: 26 });
    // rupiah untuk angka US$ di judul halaman (hanya di layar, tidak diucapkan): US$2 miliar × Rp18.264
    const kr = E.outQuint(inv(A.uang2 + .45, A.uang2 + .85, t)); if (kr > 0 && k > .9) {
      const ux = x + .487 * w, uw = .172 * w, uy = y + .31 * h; ctx.globalAlpha = a0 * kr; ctx.fillStyle = INK2; ctx.fillRect(ux, uy, uw * kr, 4);
      const lx = ux + uw / 2; ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, y - 8); ctx.lineTo(lx, lerp(y - 8, y - 44, kr)); ctx.stroke();
      setFont(ctx, MN(32), 1); ctx.fillStyle = IVORY; ctx.fillText('≈ Rp36,5 triliun', lx + 16, y - 48 + (1 - kr) * 12); const rw = ctx.measureText('≈ Rp36,5 triliun').width;
      setFont(ctx, MN(20), 3); ctx.fillStyle = GREY; ctx.fillText('US$2 MILIAR', lx + 34 + rw, y - 50 + (1 - kr) * 12); ctx.globalAlpha = a0; }
    srcTag(ctx, 'Sumber: Deadline, 20 Nov 2026 · Game Developer, 17 Sep 2026 · kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', -880, 440, t, A.uang2 + .5);
  } };

  // ── S6 · gelombang sunyi ──────────────────────────────────────────────────────────────────────────────────
  const WX0 = -820, WW = 1640, LY1 = -170, LY2 = 160, SPK = [.3, .62, .9], SPT = () => [A.satu, A.meledak, A.dunia], SPL = ['DES 2023', 'MEI 2025', 'AGU 2026'];
  function headX(t) { const K = [[A.diam - .5, 0], [A.satu, SPK[0]], [A.meledak, SPK[1]], [A.dunia, SPK[2]], [A.dunia + .6, 1]];
    if (t <= K[0][0]) return 0; for (let i = 1; i < K.length; i++) if (t <= K[i][0]) return lerp(K[i - 1][1], K[i][1], inv(K[i - 1][0], K[i][0], t)); return 1; }
  const S6 = { at: A.rahasia - .2, via: 'rise', name: 'Gelombang sunyi', draw(ctx, t) {
    const a0 = ctx.globalAlpha, k1 = E.outQuint(inv(A.rahasia - .1, A.rahasia + .5, t)); if (k1 <= 0) return;
    ctx.fillStyle = LIME; ctx.globalAlpha = a0 * k1 * .0;
    setFont(ctx, MN(22), 5); ctx.globalAlpha = a0 * k1; ctx.fillStyle = ivo(.8); ctx.fillText('MEREK LAIN · PROMOSI TIAP MINGGU', WX0, LY1 - 120);
    const sc = Math.floor(t * 9), n = 118; ctx.beginPath();
    for (let i = 0; i <= n; i++) { const u = i / n, j = i + sc, amp = 70 * (.35 + .65 * rnd(j * 1.7)) * (j % 3 === 0 ? 1 : .45) * Math.min(1, u * 1.0 + .6);
      const yy = LY1 + (rnd(j * 3.3) - .5) * 2 * amp; if (u > k1) break; i ? ctx.lineTo(WX0 + u * WW, yy) : ctx.moveTo(WX0 + u * WW, yy); }
    ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.fillStyle = ivo(.2); ctx.fillRect(WX0, LY1 + 100, WW * k1, 2);
    slab(ctx, 'BERISIK', 820, LY1 - 128, t, A.berisik - .05, { size: 24, align: 'right' });
    const k2 = E.outQuint(inv(A.rock - .3, A.rock + .3, t)); if (k2 > 0) {
      ctx.globalAlpha = a0 * k2; setFont(ctx, MN(22), 5); ctx.fillStyle = LIME; ctx.fillRect(WX0, LY2 - 132, 12, 12); ctx.fillStyle = ivo(.9); ctx.fillText('ROCKSTAR', WX0 + 26, LY2 - 120);
      ctx.fillStyle = ivo(.14); ctx.fillRect(WX0, LY2, WW, 2);
      const hx = headX(t), ST3 = SPT(); ctx.beginPath(); ctx.moveTo(WX0, LY2);
      for (let i = 0; i < 3; i++) { const sx = WX0 + SPK[i] * WW; if (hx * WW + WX0 < sx - 26) break; const s = t - ST3[i], hgt = 250 * (s > 0 ? spring(s, .45, .28) : 0) + 8;
        ctx.lineTo(sx - 26, LY2); ctx.lineTo(sx - 6, LY2 - hgt); ctx.lineTo(sx + 6, LY2 - hgt); ctx.lineTo(Math.min(sx + 26, WX0 + hx * WW), LY2); }
      ctx.lineTo(WX0 + hx * WW, LY2); ctx.strokeStyle = LIME; ctx.lineWidth = 5; ctx.lineJoin = 'miter'; ctx.stroke();
      if (hx < 1) { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(WX0 + hx * WW, LY2, 8, 0, 7); ctx.fill(); }
      ctx.globalAlpha = a0;
      for (let i = 0; i < 3; i++) { const s = t - ST3[i]; if (s <= 0) continue; ctx.globalAlpha = a0 * clamp(s / .2); setFont(ctx, MN(22), 4); ctx.textAlign = 'center'; ctx.fillStyle = IVORY;
        ctx.fillText(SPL[i], WX0 + SPK[i] * WW, LY2 + 44); ctx.textAlign = 'left'; }
      ctx.globalAlpha = a0; }
    slab(ctx, 'DIAM BERBULAN-BULAN', WX0, LY2 + 130, t, A.diam - .05, { size: 24 });
    slab(ctx, 'LANGSUNG JADI BERITA DUNIA', 780, LY2 + 130, t, A.dunia + .1, { size: 24, align: 'right' });
    srcTag(ctx, 'Sumber: Rockstar Games (rockstargames.com/VI/media)', -880, 440, t, A.rahasia + .8);
    ctx.globalAlpha = a0;
  } };

  // ── S7 · balapan batang tayangan 24 jam (grafik rekor-trailer-24jam, diolah ulang dalam palet film) ─────────
  const BX = -430, BL = 1150, ROWY = [-150, 10, 170];
  const S7 = { at: A.saat - .2, via: 'truck', name: 'Rekor 24 jam', draw(ctx, t) {
    const a0 = ctx.globalAlpha, ki = E.outQuint(inv(A.saat - .2, A.saat + .4, t)); if (ki <= 0) return;
    typeOn(ctx, 'TAYANGAN 24 JAM PERTAMA · JUTA', -880, -400, t, A.saat, MN(24), { ls: 6, col: ivo(.85), cps: 40 });
    const S = lerp(100, 500, E.inOutCubic(inv(A.rekor2 - .1, A.rekor2 + .8, t))), px = v => v / S * BL, resc = S > 101;
    ctx.globalAlpha = a0 * ki * .5; ctx.strokeStyle = ivo(.25); ctx.lineWidth = 1.5; ctx.beginPath();
    const step = S < 250 ? 25 : 100; for (let v = 0; v <= S + .1; v += step) { const xx = BX + px(v); if (xx > BX + BL + 2) break; ctx.moveTo(xx, -215); ctx.lineTo(xx, 240); } ctx.stroke();
    setFont(ctx, MN(18), 2); ctx.fillStyle = ivo(.7); ctx.textAlign = 'center'; for (let v = 0; v <= S + .1; v += step) { const xx = BX + px(v); if (xx > BX + BL + 2) break; ctx.fillText(String(v), xx, 270); } ctx.textAlign = 'left';
    ctx.globalAlpha = a0;
    const R = [
      { n: 'MRBEAST', s: 'REKOR NON-MUSIK YOUTUBE', v: 59.4, t0: A.saat + .3, dur: .6, lime: false },
      { n: 'TRAILER 1', s: 'DES 2023', v: countTo(0, 93, t, A.tayang - .1, A.j93 - A.tayang + .2), t0: A.tayang - .2, lime: !resc },
      { n: 'TRAILER 2', s: 'MEI 2025', v: countTo(0, 475, t, A.mei + .1, A.cuplikan - A.mei + .1), t0: A.mei - .1, lime: resc }];
    R.forEach((r, i) => { const k = E.outQuint(inv(r.t0, r.t0 + .45, t)); if (k <= 0) return; const y = ROWY[i];
      ctx.globalAlpha = a0 * k; setFont(ctx, MN(24), 4); ctx.fillStyle = IVORY; ctx.fillText(r.n, -880, y - 4); setFont(ctx, MN(18), 3); ctx.fillStyle = ivo(.6); ctx.fillText(r.s, -880, y + 26);
      const v = i === 0 ? r.v * E.outQuint(inv(r.t0, r.t0 + r.dur, t)) : r.v, bw = px(v);
      ctx.fillStyle = r.lime ? LIME : ivo(i === 0 ? .32 : .55); ctx.fillRect(BX, y - 38, bw, 76);
      setFont(ctx, DSP(84), 1); ctx.fillStyle = r.lime ? LIME : IVORY; ctx.fillText(fmt(v, i === 0 ? 1 : 0), BX + bw + 22, y + 30); });
    ctx.globalAlpha = a0 * gone(t, A.rekor2 - .3, .3);
    if (t > A.rekor - .05) { setFont(ctx, DSP(84), 1); const vx = BX + px(59.4) + 22 + ctx.measureText('59,4').width + 30; slab(ctx, 'REKOR LAMA', vx, ROWY[0] - 4, t, A.rekor - .05, { size: 22 });
      const kd = E.outQuint(inv(A.dilibas - .05, A.dilibas + .25, t)); if (kd > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-890, ROWY[0] - 2, (vx + 210 + 890) * kd, 6); } }
    ctx.globalAlpha = a0;
    // potongan trailer kecil, kanan atas: Trailer 1 lalu Trailer 2
    const kp1 = Math.min(E.outQuint(inv(A.des - .1, A.des + .4, t)), gone(t, A.rekor2 - .1, .3)), kp2 = E.outQuint(inv(A.mei - .1, A.mei + .4, t));
    if (kp1 > 0 && V.flamingo) { ctx.globalAlpha = a0 * kp1; plate(ctx, V.flamingo, t, 640, -380 + (1 - kp1) * 40, 380, 214, 1, { t0: A.des, grade: GRADE_DOC, vig: .35, grain: .1 });
      setFont(ctx, MN(18), 4); ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText('TRAILER 1 · DES 2023', 830, -246); ctx.textAlign = 'left'; }
    if (kp2 > 0 && V.menara) { ctx.globalAlpha = a0 * kp2; plate(ctx, V.menara, t, 640, -380 + (1 - kp2) * 40, 380, 214, 1, { t0: A.mei, grade: GRADE_DOC, vig: .35, grain: .1 });
      setFont(ctx, MN(18), 4); ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText('TRAILER 2 · MEI 2025', 830, -246); ctx.textAlign = 'left'; }
    ctx.globalAlpha = a0;
    srcTag(ctx, 'Sumber: Variety, 7 Des 2023 · The Hollywood Reporter, 7 Mei 2025', -880, 400, t, A.saat + .6);
    srcTag(ctx, 'Grafik: diolah dari variety.com & hollywoodreporter.com', -880, 436, t, A.saat + 1.4);
  } };

  // ── SELAM DETAIL · 475.000.000 → "HOT TOGETHER" (satu-satunya momen Season 3 di bab ini) ─────────────────
  const CSS1 = DSP(300), NUM = '475.000.000', BY = 650, F = counterOf(NUM, 10, CSS1, W / 2, BY);
  const CSSH = DSP(250), HOT = 'HOT TOGETHER', HY = 540, NF = counterOf(HOT, 1, CSSH, W / 2, HY);
  const T0 = A.tontonan + .33, T1 = A.tapi + .1;
  function page(g, t) {
    if (V.laut) { g.filter = GRADE_DOC; cover(g, vf(V.laut, t - T0, .6), 0, 0, W, H, 1.04 + .04 * inv(T0, A.saking, t)); g.filter = 'none'; }
    g.fillStyle = 'rgba(11,12,9,.55)'; g.fillRect(0, 0, W, H);
    typeOn(g, 'TRAILER 2 · MEI 2025 · 24 JAM PERTAMA', W / 2, 330, t, T0 + .15, MN(28), { align: 'center', ls: 7, col: ivo(.85), cps: 44 });
    setFont(g, CSS1, 0); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; const tw = g.measureText(NUM).width, x0 = W / 2 - tw / 2;
    for (let i = 0; i < NUM.length; i++) { const s = t - T0 - .05 - i * .035; if (s <= 0) break; g.globalAlpha = clamp(s / .1); g.fillStyle = IVORY;
      g.fillText(NUM[i], x0 + g.measureText(NUM.slice(0, i)).width, BY + (1 - spring(s, .55, .38)) * -120); }
    g.globalAlpha = 1;
    txt(g, 'tayangan dari berbagai situs, dalam sehari', W / 2, 790, t, T0 + .5, SRF(60), { align: 'center', col: ivo(.88) });
    const pk = E.outCubic(inv(A.saking - .75, A.saking - .2, t)); if (pk > 0) { g.fillStyle = ROOM; g.beginPath(); g.ellipse(F.x, F.y, F.w * .2 * pk, F.size * .27 * pk, 0, 0, 7); g.fill(); }
    g.textAlign = 'left';
  }
  function spot(g, t) {
    if (V.klub) { g.filter = GRADE_DOC; cover(g, vf(V.klub, t - A.saking, .45), 0, 0, W, H, 1.06 + .05 * inv(A.saking, T1, t)); g.filter = 'none'; }
    g.fillStyle = 'rgba(11,12,9,.6)'; g.fillRect(0, 0, W, H);
    const bg = g.createLinearGradient(0, H * .55, 0, H); bg.addColorStop(0, 'rgba(11,12,9,0)'); bg.addColorStop(1, 'rgba(11,12,9,.75)'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    typeOn(g, 'LAGU PENGIRING TRAILER 2 · TAHUN 80-AN', W / 2, 300, t, A.lagu - .15, MN(26), { align: 'center', ls: 7, col: ivo(.85), cps: 44 });
    setFont(g, CSSH, 0); g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = IVORY; g.fillText(HOT, W / 2, HY); g.textAlign = 'left';
    txt(g, 'The Pointer Sisters', W / 2, 628, t, A.pointer - .15, SRF(62), { align: 'center' });
    const bx = W / 2 - 420, by = 690, bw = 840, p = .08 + .55 * inv(A.saking, T1, t);
    const gb2 = gone(t, A.spotify - .1, .4); g.globalAlpha = gb2; g.fillStyle = ivo(.22); g.fillRect(bx, by, bw, 6); g.fillStyle = IVORY; g.fillRect(bx, by, bw * p, 6); g.beginPath(); g.arc(bx + bw * p, by + 3, 11, 0, 7); g.fill();
    const el = Math.floor(9 + (t - A.saking)); setFont(g, MN(20, 400), 1); g.fillStyle = ivo(.7); g.fillText(`${Math.floor(el / 60)}:${String(el % 60).padStart(2, '0')}`, bx, by + 40);
    g.fillStyle = IVORY; g.fillRect(W / 2 - 13, by + 26, 8, 26); g.fillRect(W / 2 + 5, by + 26, 8, 26); g.globalAlpha = 1;
    const gc = gone(t, A.spotify - .45, .2); if (gc > 0) { g.globalAlpha = gc; slab(g, 'IKUT KETIBAN REZEKI', W / 2, 810, t, A.rezeki - .1, { size: 26, align: 'center' }); g.globalAlpha = 1; }
    const kp = E.outQuint(inv(A.spotify - .2, A.spotify + .35, t)); if (kp > 0) {
      const px = 1080, py = 760 + (1 - kp) * 50, pw = 760, ph = 240; g.globalAlpha = kp;
      g.fillStyle = 'rgba(11,12,9,.84)'; rr(g, px, py, pw, ph, 16); g.fill(); g.strokeStyle = ivo(.25); g.lineWidth = 2; g.stroke();
      setFont(g, MN(20), 5); g.fillStyle = ivo(.8); g.fillText('PUTARAN LAGU DI SPOTIFY', px + 30, py + 46);
      const n = countTo(0, 182000, t, A.melonjak - .1, A.persen - A.melonjak + .1); setFont(g, DSP(112), 1); g.fillStyle = LIME; g.fillText(`+${fmt(Math.round(n / 100) * 100)} %`, px + 30, py + 182);
      const sx0 = px + 430, sx1 = px + pw - 34, sy = py + ph - 44, top = py + 74, u = E.inOutCubic(inv(A.melonjak - .2, A.persen, t)); g.beginPath();
      for (let i = 0; i <= 40; i++) { const f = i / 40; if (f > u) break; const yy = f < .78 ? sy - 6 - rnd(i * 2.1) * 8 : lerp(sy - 10, top, E.outCubic((f - .78) / .22)); i ? g.lineTo(lerp(sx0, sx1, f), yy) : g.moveTo(sx0, yy); }
      g.strokeStyle = LIME; g.lineWidth = 5; g.lineJoin = 'round'; g.stroke(); g.fillStyle = ivo(.2); g.fillRect(sx0, sy + 4, sx1 - sx0, 2);
      g.globalAlpha = 1; srcTag(g, 'Sumber: The Hollywood Reporter, 7 Mei 2025', px, py + ph + 44, t, A.spotify + .2); }
  }
  const dive = selam({ t0: T0, tc: A.saking, t1: T1, f: [F.x, F.y], r: F.w * .16, nf: [NF.x, NF.y], nr: NF.w * .16, page, next: spot });
  // Aksa (sekali di bab ini): santai, sombong kecil di +182.000 %
  // Aksa v2 (revisi 11-21 "terlalu cepat"): 2 penampilan, masing-masing ±6 s
  //  #1 79.6–88.1 Spotify: menunjuk panel, kaget angkanya naik, lalu sombong kecil di +182.000 %
  const aksa = aksaShow({ t: 79.6, x: 330, y: 1110, s: .78, stay: 6.4, point: 1.2,
    face: [[1.2, 'o_O'], [2.0, 'O_O'], [4.1, '~_^']], say: [3.6, 'lagu lawas, rezeki baru'] });
  //  #2 110.4–118.3 trafik Netflix: kaget di +125 %, error saat situsnya tumbang (ikut kena glitch)
  const aksa2 = aksaShow({ t: 110.4, x: 260, y: 1150, s: .78, stay: 5.8, shock: 1.68,
    face: [[1.68, 'O_O'], [3.88, 'x_x'], [4.7, '>_<']], say: [3.3, 'servernya ikut pingsan'] });

  // ── S9 · 27 Agustus 2026 bersama Netflix ──────────────────────────────────────────────────────────────────
  const S9 = { at: A.tapi - .2, via: 'whip', name: 'Netflix 27 Agustus', draw(ctx, t) {
    typeOn(ctx, 'LANGKAH PALING TAK TERDUGA', 0, -280, t, A.terduga - .5, MN(28), { align: 'center', ls: 8, col: ivo(.88), cps: 40 });
    fall(ctx, '27 AGUSTUS 2026', 0, 20, t, A.agustus - .25, DSP(210), { align: 'center', ls: 3 });
    markLine(ctx, 'KERJA SAMA DENGAN ', 'NETFLIX', '', 0, 200, t, A.kerja - .2, A.netflix - .05, DSP(110), { ls: 3 });
    srcTag(ctx, 'Sumber: Rockstar Games (rockstargames.com/VI/media) · Variety, 1 Sep 2026', -880, 440, t, A.terduga);
  } };

  // ── S10 · player 27 menit, eksklusif 6 jam ────────────────────────────────────────────────────────────────
  const S10 = { at: A.menayang - .2, via: 'push', name: 'Player 27 menit', draw(ctx, t) {
    const a0 = ctx.globalAlpha, k = E.outQuint(inv(A.menayang - .25, A.menayang + .35, t)); if (k <= 0) return;
    const pw = 1280, ph = 720, cx = 0, cy = -40 + (1 - k) * 60, x0 = cx - pw / 2, y0 = cy - ph / 2;
    ctx.globalAlpha = a0 * k; ctx.fillStyle = '#000'; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 24; ctx.fillRect(x0, y0, pw, ph); ctx.shadowColor = 'transparent';
    if (V.lorong) plate(ctx, V.lorong, t, cx, cy, pw, ph, 1, { t0: A.menayang, grade: GRADE_DOC, vig: .4, grain: .1, marks: false });
    const gb = ctx.createLinearGradient(0, cy + ph * .1, 0, cy + ph / 2); gb.addColorStop(0, 'rgba(11,12,9,0)'); gb.addColorStop(1, 'rgba(11,12,9,.85)'); ctx.fillStyle = gb; ctx.fillRect(x0, y0, pw, ph);
    const p = E.inOutSine(inv(A.menayang, A.menit + .2, t)), mins = Math.round(27 * p), bx = x0 + 40, bw = pw - 80, by = y0 + ph - 54;
    ctx.fillStyle = ivo(.25); ctx.fillRect(bx, by, bw, 6); ctx.fillStyle = LIME; ctx.fillRect(bx, by, bw * p, 6); ctx.beginPath(); ctx.arc(bx + bw * p, by + 3, 10, 0, 7); ctx.fill();
    setFont(ctx, MN(20, 400), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText(`${String(mins).padStart(2, '0')}:00 / 27:00`, x0 + pw - 40, by - 18); ctx.textAlign = 'left';
    ctx.globalAlpha = a0; const km = E.outQuint(inv(A.menit - .1, A.menit + .35, t)); if (km > 0) { ctx.globalAlpha = a0 * km; setFont(ctx, DSP(180), 2); ctx.fillStyle = IVORY; ctx.fillText('27 MENIT', x0 + 40, by - 40 + (1 - km) * 40); ctx.globalAlpha = a0; }
    slab(ctx, 'REKAMAN LANGSUNG PS5', x0 + 30, y0 + 50, t, A.ps - .05, { size: 24 });
    slab(ctx, 'EKSKLUSIF 6 JAM DI NETFLIX', x0 + pw - 30, y0 + 50, t, A.eksklusif - .05, { size: 24, align: 'right' });
    if (t > A.jam - .05) { const left = Math.max(0, 6 * 3600 - Math.floor((t - A.jam) * 917)), hh = Math.floor(left / 3600), mm = Math.floor(left / 60) % 60, ss = left % 60;
      ctx.globalAlpha = a0 * E.outCubic(inv(A.jam - .05, A.jam + .2, t)); setFont(ctx, MN(30), 3); ctx.fillStyle = IVORY; ctx.textAlign = 'right';
      ctx.fillText(`SISA ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, x0 + pw - 30, y0 + 120); ctx.textAlign = 'left'; ctx.globalAlpha = a0; }
    srcTag(ctx, 'Sumber: Variety & GamesIndustry.biz, Sep 2026 · cuplikan: Rockstar Games', -880, 440, t, A.menayang + .6);
  } };

  // ── S11 · 31,1 juta, #1 di 87 dari 93 negara ──────────────────────────────────────────────────────────────
  const ORD = Array.from({ length: 93 }, (_, i) => i).sort((a, b) => rnd(a * 7.3 + 1) - rnd(b * 7.3 + 1)), LIT = new Map(ORD.map((v, i) => [v, i]));
  const TS = 62, TG = 10, TX0 = -250, TY0 = -230, AFT = A.j311 + 1.5;
  const S11 = { at: A.dalam - .2, via: 'rise', name: '87 dari 93 negara', draw(ctx, t) {
    const a0 = ctx.globalAlpha;
    txt(ctx, '31,1 JUTA', -880, -120, t, AFT - .4, DSP(150), { ls: 2 });
    txt(ctx, 'TAYANGAN · 4 HARI PERTAMA', -880, -60, t, AFT - .2, MN(22), { ls: 5, col: ivo(.75) });
    txt(ctx, 'PERINGKAT #1 DI', -880, 80, t, A.peringkat - .3, MN(24), { ls: 6, col: ivo(.85) });
    if (t > A.peringkat - .1) { const n = Math.round(countTo(0, 87, t, A.peringkat - .1, A.n87 - A.peringkat + .1)); setFont(ctx, DSP(200), 2); ctx.fillStyle = IVORY;
      ctx.globalAlpha = a0 * E.outCubic(inv(A.peringkat - .1, A.peringkat + .15, t)); ctx.fillText(String(n), -885, 270); setFont(ctx, DSP(200), 2); const nw = ctx.measureText('87').width;
      setFont(ctx, MN(26), 5); ctx.fillStyle = ivo(.85); ctx.fillText('DARI 93', -885 + nw + 24, 214); ctx.fillText('NEGARA', -885 + nw + 24, 254); ctx.globalAlpha = a0; }
    // 93 petak negara (satu path per keadaan: hemat untuk blur per draw call di onPlane)
    const kg = E.outCubic(inv(AFT - .5, AFT, t)); if (kg <= 0) return; ctx.globalAlpha = a0 * kg;
    const lit = Math.floor(87 * E.inOutSine(inv(A.peringkat - .1, A.n87 + .05, t)));
    const pa = new Path2D(), pb = new Path2D();
    for (let i = 0; i < 93; i++) { const c = i % 16, r = Math.floor(i / 16), x = TX0 + c * (TS + TG), y = TY0 + r * (TS + TG); (LIT.get(i) < lit ? pa : pb).roundRect(x, y, TS, TS, 8); }
    ctx.fillStyle = ivo(.13); ctx.fill(pb); ctx.strokeStyle = ivo(.28); ctx.lineWidth = 1.5; ctx.stroke(pb); ctx.fillStyle = LIME; ctx.fill(pa);
    typeOn(ctx, '1 PETAK = 1 NEGARA TEMPAT NETFLIX MENGHITUNG PERINGKAT', TX0, TY0 + 6 * (TS + TG) + 36, t, AFT, MN(18), { ls: 3, col: ivo(.7), cps: 50 });
    ctx.globalAlpha = a0;
    srcTag(ctx, 'Sumber: Variety, 1 Sep 2026 · GamesIndustry.biz, Sep 2026', -880, 440, t, AFT);
  } };

  // ── S12 · trafik situs Netflix +125 %, sempat tumbang ─────────────────────────────────────────────────────
  const CX0 = -760, CX1 = 760, CB = 225, yOf = p => CB - p * 1.75;
  const S12 = { at: A.trafik - .2, via: 'whip', name: 'Trafik Netflix', draw(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'TRAFIK SITUS NETFLIX · SAAT PENAYANGAN', CX0, -390, t, A.trafik - .1, MN(26), { ls: 6, col: ivo(.88), cps: 44 });
    ctx.fillStyle = ivo(.25); ctx.fillRect(CX0, CB, (CX1 - CX0) * E.outQuint(inv(A.trafik - .2, A.trafik + .4, t)), 2);
    ctx.setLineDash([10, 12]); ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(CX0, yOf(100)); ctx.lineTo(CX1, yOf(100)); ctx.stroke(); ctx.setLineDash([]);
    setFont(ctx, MN(18), 3); ctx.fillStyle = ivo(.6); ctx.fillText('TRAFIK NORMAL', CX0, yOf(100) - 14);
    const u = E.inOutSine(inv(A.trafik, A.p125 + .1, t)), crash = E.inCubic(inv(A.tumbang - .05, A.tumbang + .2, t)), N = 60; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const f = i / N; if (f > u) break; const lv = f < .3 ? 100 + (rnd(i * 1.9) - .5) * 8 : 100 + 125 * E.outCubic((f - .3) / .7) + (rnd(i * 1.9) - .5) * 10;
      const x = lerp(CX0, CX1 - 140, f); i ? ctx.lineTo(x, yOf(lv)) : ctx.moveTo(x, yOf(lv)); }
    if (crash > 0) { const xe = CX1 - 140; ctx.lineTo(xe + 40 * crash, lerp(yOf(225), CB, crash)); }
    ctx.strokeStyle = LIME; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.stroke();
    if (t > A.p125 - .5) { const n = Math.round(countTo(0, 125, t, A.p125 - .5, .6)); ctx.globalAlpha = a0 * E.outCubic(inv(A.p125 - .5, A.p125 - .2, t)); setFont(ctx, DSP(190), 2);
      ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText(`+${n} %`, CX1, -200); ctx.textAlign = 'left'; ctx.globalAlpha = a0; }
    slab(ctx, 'SEMPAT TUMBANG SEMENTARA', CX1, 150, t, A.tumbang + .05, { size: 26, align: 'right' });
    srcTag(ctx, 'Sumber: Variety & GamesIndustry.biz, Sep 2026', 100, 440, t, A.trafik + .5);   // kanan: kiri bawah untuk Aksa
  } };

  // ── S13 · layar siaran langsung: mesin yang tak dibayar ───────────────────────────────────────────────────
  const CHAT = [['rafi_09', 'gas lanjut misi'], ['nayla', 'grafiknya gila'], ['bdg.gamer', 'mampir dari klip'], ['dimas', 'ke pantai dulu bang'], ['kiki77', 'mantap'],
    ['oca', 'nonton dari awal'], ['arya', 'mobilnya keren'], ['putri.s', 'ulang dong'], ['jojo', 'GG'], ['wawan', 'lanjut besok?'], ['sasa', 'seru banget'], ['tegar', 'salam dari Medan']];
  const S13 = { at: A.tapi2 - .2, via: 'cut', name: 'Siaran langsung', draw(ctx, t) {
    const a0 = ctx.globalAlpha, k = E.outQuint(inv(A.tapi2 - .2, A.tapi2 + .3, t)); if (k <= 0) return;
    const pw = 1160, ph = 652, cx = -200, cy = -30, x0 = cx - pw / 2, y0 = cy - ph / 2 + (1 - k) * 40;
    ctx.globalAlpha = a0 * k; ctx.fillStyle = '#000'; ctx.fillRect(x0, y0, pw, ph);
    if (V.mobil2) plate(ctx, V.mobil2, t, cx, y0 + ph / 2, pw, ph, 1, { t0: A.tapi2, grade: GRADE_DOC, vig: .45, grain: .12, marks: false, speed: .8 });
    const gb = ctx.createLinearGradient(0, y0 + ph * .5, 0, y0 + ph); gb.addColorStop(0, 'rgba(11,12,9,0)'); gb.addColorStop(1, 'rgba(11,12,9,.82)'); ctx.fillStyle = gb; ctx.fillRect(x0, y0, pw, ph);
    ctx.fillStyle = IVORY; ctx.fillRect(x0 + 24, y0 + 24, 150, 42); ctx.fillStyle = INK2; ctx.globalAlpha = a0 * k * (.55 + .45 * Math.abs(Math.sin(t * 3.2)));
    ctx.beginPath(); ctx.arc(x0 + 48, y0 + 45, 9, 0, 7); ctx.fill(); ctx.globalAlpha = a0 * k; setFont(ctx, MN(20), 4); ctx.fillText('LIVE', x0 + 70, y0 + 52);
    // kolom chat
    const qx = x0 + pw + 30, qw = 940 - qx - 10, qy0 = y0, qh = ph; ctx.fillStyle = 'rgba(11,12,9,.8)'; ctx.fillRect(qx, qy0, qw, qh); ctx.strokeStyle = ivo(.2); ctx.lineWidth = 1.5; ctx.strokeRect(qx, qy0, qw, qh);
    setFont(ctx, MN(17), 4); ctx.fillStyle = ivo(.7); ctx.fillText('OBROLAN', qx + 20, qy0 + 36);
    const c0 = A.mesin + .3, shown = Math.max(0, Math.min(CHAT.length, Math.floor((t - c0) / .42) + 1)); if (t > c0) {
      ctx.save(); ctx.beginPath(); ctx.rect(qx, qy0 + 56, qw, qh - 60); ctx.clip();
      for (let i = 0; i < shown; i++) { const age = t - c0 - i * .42, yy = qy0 + qh - 30 - (shown - 1 - i) * 52 - (1 - E.outQuint(clamp(age / .3))) * -20; if (yy < qy0 + 70) continue;
        ctx.globalAlpha = a0 * k * clamp(age / .2); setFont(ctx, MN(17), 1); ctx.fillStyle = GREY; ctx.fillText(CHAT[i][0], qx + 20, yy - 20); setFont(ctx, MN(20, 400), 0); ctx.fillStyle = IVORY; ctx.fillText(CHAT[i][1], qx + 20, yy + 4); }
      ctx.restore(); }
    ctx.globalAlpha = a0;
    typeOn(ctx, 'SATU MESIN PEMASARAN RAKSASA LAINNYA', x0, -400, t, A.mesin - .2, MN(26), { ls: 6, col: ivo(.88), cps: 44 });
    fall(ctx, 'NONSTOP', x0 + 34, y0 + ph - 46, t, A.nonstop - .15, DSP(190), { ls: 3 });
    markLine(ctx, 'TANPA ', 'DIBAYAR', ' ROCKSTAR', x0, 430, t, A.nonstop + .4, A.dibayar - .05, DSP(84), { align: 'left', ls: 2 });
  } };

  // glitch singkat (screen space) saat situs Netflix "tumbang"
  let GL = null;
  function glitch(o, t) {
    const t0 = A.tumbang - .05, d = t - t0; if (d < 0 || d > .6) return;
    const cw = o.canvas.width, ch = o.canvas.height; if (!GL || GL[0].width !== cw) GL = mk(cw, ch); const [gc, gg] = GL;
    gg.globalCompositeOperation = 'copy'; gg.drawImage(o.canvas, 0, 0); gg.globalCompositeOperation = 'source-over';
    const amp = (1 - d / .6) * (d < .12 ? 1.4 : 1), f = Math.floor(t * 30);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 16; i++) { const y = Math.floor(rnd(f * 13 + i) * ch), h = Math.floor(8 + rnd(f * 7 + i * 3) * ch * .07), dx = (rnd(f * 5 + i * 11) - .5) * 220 * amp * cw / W;
      o.drawImage(gc, 0, y, cw, h, dx, y, cw, h); }
    o.globalAlpha = .1 * amp; o.globalCompositeOperation = 'screen'; o.drawImage(gc, 6 * amp, 0); o.restore();
  }

  const S8 = { at: A.saking, via: 'cut', name: 'Selam 475 → Hot Together' };
  const ST = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13];
  let latarV = () => {};
  const over = (o, t) => { aksa2.draw(o, t); glitch(o, t); dive.draw(o, t); aksa.draw(o, t); };
  let FULLS;
  const full = () => FULLS ??= [
    { im: IM.hr, t0: A.cuplikan - .1, t1: T0 + .25, dir: 1, tab: 'hollywoodreporter.com · 7 Mei 2025', hl: [[.02, .30, .51, .10, A.cuplikan + .5], [.73, .19, .14, .08, A.j475 - .1]] },
    { im: IM.vr, t0: A.dalam - .1, t1: AFT - .3, dir: -1, tab: 'variety.com · 1 Sep 2026', hl: [[.30, .265, .41, .065, A.j311 - .1]] }];
  return makeChapter({ B, ST, gate: true, label: 'BAB 3 · PROMOSI TANPA IKLAN TV', over, full,
    load: async () => { await load(); latarV = latar([
      { t0: 0, t1: 2.0, V: V.klub, dim: .5, z: [1.05, 1.12], pan: [20, -20] }, { t0: 1.8, t1: 3.8, V: V.kapal, dim: .5, z: [1.06, 1.12] }, { t0: 3.6, t1: A.investor + .3, V: V.tangga, dim: .5, z: [1.05, 1.13], pan: [-20, 20] },
      { t0: A.investor - .4, t1: A.jawab + .1, V: V.telepon, dim: .6, z: [1.05, 1.13], speed: .7 }, { t0: A.jawab - .3, t1: A.gta + .1, V: V.senja, dim: .62, z: [1.05, 1.12], speed: .7 },
      { t0: A.gta - .3, t1: A.dulu + .1, V: V.mobil2, dim: .66, z: [1.05, 1.13], pan: [30, -30], speed: .7 }, { t0: A.dulu - .3, t1: A.uang2 + .1, V: V.kotamalam, dim: .66, z: [1.04, 1.14], speed: .6 },
      { t0: A.uang2 - .3, t1: A.rahasia + .1, V: V.kapal, dim: .62, z: [1.05, 1.12], speed: .6 }, { t0: A.rahasia - .3, t1: A.saat + .1, V: V.pantai, dim: .5, z: [1.04, 1.16], pan: [-40, 40], speed: .5 },
      { t0: A.saat - .3, t1: T0 + .6, V: V.laut, dim: .64, z: [1.04, 1.16], pan: [30, -30], speed: .5 },
      { t0: A.tapi - .4, t1: A.menayang + .1, V: V.nyetir, dim: .52, z: [1.04, 1.14], speed: .8 }, { t0: A.menayang - .3, t1: A.dalam + .1, V: V.garasi, dim: .72, z: [1.05, 1.12], speed: .6 },
      { t0: A.dalam - .3, t1: A.trafik + .1, V: V.lucia, dim: .7, z: [1.05, 1.13], speed: .6 }, { t0: A.trafik - .3, t1: A.tapi2 + .1, V: V.interogasi, dim: .7, z: [1.05, 1.12], speed: .6 },
      { t0: A.tapi2 - .3, t1: DUR + .1, V: V.tangga, dim: .72, z: [1.05, 1.14], pan: [-30, 30], speed: .7 }]); },
    under: (ctx, t, first) => latarV(ctx, t, first) });
}
