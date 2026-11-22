// Penutup (VO ivs_vo_ahmad_08, 43.4 s + 5 s end screen). Six stations on the depth row:
// question → hulu/hilir pipeline (camera trucks upstream → downstream, then pulls out) → 4-item checklist (opinion) →
// comment fill-in with a blinking caret → bakso-cart QR scan (code-drawn, grained) + Jakarta Post → pull back through a
// corridor of cards ("Jarak = Kedalaman" callback) with a calm end screen (2 video slots right, subscribe-safe zone left).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, ROOM, IVORY, LIME, LIME_INK, TILE, DISP, SER, MONO, ivo, setFont, rnd, mk, D2R,
  timing, onPlane, makeChapter, loadImg, evid, fall, markLine, srcTag, slab, txt, gone, grainRect } from './kit.js';
import { kq, pop, popAt, phone } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {};

  function qrArt() {                                        // a generic QR-like sticker (random modules + 3 finder squares)
    const N = 25, M = 8, Q = 2, [c, g] = mk((N + 2 * Q) * M, (N + 2 * Q) * M), P = '#F4F2EA', K = '#11120E';
    g.fillStyle = P; g.fillRect(0, 0, c.width, c.height); g.fillStyle = K;
    const fin = (i, j) => (i < 8 && j < 8) || (i > N - 9 && j < 8) || (i < 8 && j > N - 9);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) if (!fin(i, j) && rnd(i * 31.7 + j * 7.3 + 5) < .47) g.fillRect((i + Q) * M, (j + Q) * M, M, M);
    for (const [i, j] of [[0, 0], [N - 7, 0], [0, N - 7]]) { g.fillStyle = K; g.fillRect((i + Q) * M, (j + Q) * M, 7 * M, 7 * M);
      g.fillStyle = P; g.fillRect((i + Q + 1) * M, (j + Q + 1) * M, 5 * M, 5 * M); g.fillStyle = K; g.fillRect((i + Q + 2) * M, (j + Q + 2) * M, 3 * M, 3 * M); }
    return c;
  }
  function cardArt(fill, ink, label) {                      // the bab-1 depth-row card, simplified (600×800 drawn at 2×)
    const [c, g] = mk(600, 800); g.scale(2, 2); const gr = g.createLinearGradient(0, 0, 300, 400); gr.addColorStop(0, fill[0]); gr.addColorStop(1, fill[1]);
    g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, 300, 400, 12); g.fill();
    g.fillStyle = ink; g.globalAlpha = .9; setFont(g, MN(15), 3); g.fillText(label, 24, 42); g.globalAlpha = .25; g.fillRect(24, 56, 252, 2);
    g.globalAlpha = .16; for (let i = 0; i < 6; i++) g.fillRect(24, 240 + i * 22, i === 5 ? 130 : 252 - (i % 2) * 40, 8);
    g.globalAlpha = 1; g.lineWidth = 4; g.strokeStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.roundRect(2, 2, 296, 396, 11); g.stroke();
    return c;
  }
  async function load() {
    IM.jp = await loadImg('../assets/shared/kutipan/thejakartapost-the-jakarta-post-2.png', 1800);
    IM.qr = qrArt(); IM.grey = cardArt(['#8A8B82', '#55564F'], '#0B0C09', 'AMERIKA SERIKAT'); IM.ivory = cardArt(['#FBFAF4', '#E4E1D4'], '#11120E', 'INDONESIA');
  }

  // ── S1 pipeline: two pipes, AS (top, thick all the way) and Indonesia (thin upstream, as wide + lime downstream) ─────
  const AY = -90, IY = 90;
  function pipe(ctx, y, x0, x1, hw, t, col) {
    ctx.beginPath(); for (let x = x0; x <= x1; x += 20) ctx.lineTo(x, y - hw(x)); for (let x = x1; x >= x0; x -= 20) ctx.lineTo(x, y + hw(x)); ctx.closePath();
    ctx.fillStyle = '#22231D'; ctx.fill(); ctx.strokeStyle = ivo(.4); ctx.lineWidth = 2.5; ctx.stroke();
    ctx.save(); ctx.clip(); const off = (t * 240) % 70;                       // the flow: dashes travelling downstream
    for (let x = x0 - 70 + off; x < x1; x += 70) { const h = Math.max(3.5, hw(x + 18) * .9); ctx.fillStyle = col(x); ctx.fillRect(x, y - h / 2, 36, h); }
    ctx.restore();
  }
  function drawPipes(ctx, t) {
    const r1 = kq(t, A.di - .15, 1.4), r2 = kq(t, A.hilir - .3, 1.0), xr = r2 > 0 ? lerp(150, 1650, r2) : lerp(-1650, 150, r1);
    const idw = x => x < -60 ? 4 : lerp(4, 4 + 30 * r2, E.inOutCubic(inv(-60, 300, x)));
    ctx.save(); ctx.beginPath(); ctx.rect(-1700, -600, xr + 1700, 1200); ctx.clip();
    pipe(ctx, AY, -1650, 1650, () => 34, t, () => ivo(.2));
    pipe(ctx, IY, -1650, 1650, idw, t, x => x > 120 && r2 > .3 ? LIME : ivo(.55));
    ctx.restore();
    txt(ctx, 'AMERIKA SERIKAT', -1480, AY - 50, t, A.hulu, MN(18), { ls: 4, col: ivo(.6) });
    txt(ctx, 'INDONESIA', -1480, IY - 24, t, A.hulu, MN(18), { ls: 4, col: ivo(.85) });
    const kd = kq(t, A.hilir - .2, .6);                                          // hulu | hilir divider
    if (kd > 0) { ctx.strokeStyle = ivo(.28); ctx.lineWidth = 2; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(60, -340); ctx.lineTo(60, -340 + 860 * kd); ctx.stroke(); ctx.setLineDash([]); }
  }
  function node(ctx, t, x, label, t0, lime) {
    const k = kq(t, t0, .45); if (k <= 0) return;
    ctx.strokeStyle = ivo(.45); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, -186); ctx.lineTo(x, -186 + (IY + 186) * k); ctx.stroke();
    for (const [y, r, d] of [[AY, 11, 0], [IY, 9, .08]]) popAt(ctx, x, y, t, t0 + d, () => { ctx.fillStyle = lime && y === IY ? LIME : IVORY; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); }, { from: .2 });
    slab(ctx, label, x, -205, t, t0, { align: 'center', size: 22, lime });
  }
  function drawS1(ctx, t) {
    drawPipes(ctx, t);
    fall(ctx, 'HULU', -1480, -300, t, A.hulu - .1, DSP(150), { ls: 4, stag: .04 });
    txt(ctx, '= tempat ide dibuat', -1170, -305, t, A.hulu + .3, SRF(46), { col: ivo(.8) });
    for (const [x, lab, t0, r, sub] of [[-1220, 'LAB · R&D', A.lab, '≈12×', 'R&D 0,28 vs 3,45 % PDB'],
      [-870, 'PATEN', A.paten, '≈140×', 'PATEN 1.931 vs 270.295'], [-520, 'PENELITI', A.peneliti, '≈12,5×', '395 vs 4.937 PER JUTA']]) {
      node(ctx, t, x, lab, t0);
      fall(ctx, r, x, 250, t, t0 + .35, DSP(116), { align: 'center', ls: 2, stag: .04 });
      txt(ctx, sub, x, 294, t, t0 + .5, MN(20), { align: 'center', ls: 2, col: ivo(.7) });
    }
    const kb = kq(t, A.belasan - .1, .6);                                        // bracket: "belasan–ratusan kali"
    if (kb > 0) { ctx.fillStyle = ivo(.75); const x0 = -1380, w = 1020 * kb; ctx.fillRect(x0, 338, w, 3); ctx.fillRect(x0, 322, 3, 19); if (kb > .98) ctx.fillRect(x0 + 1017, 322, 3, 19); }
    fall(ctx, 'BELASAN–RATUSAN KALI', -870, 438, t, A.belasan, DSP(88), { align: 'center', ls: 3, stag: .025 });
    srcTag(ctx, 'Sumber: World Bank (R&D, peneliti); WIPO 2024 (paten residen)', -1480, 500, t, A.kali);

    fall(ctx, 'HILIR', 200, -300, t, A.hilir - .05, DSP(150), { ls: 4, stag: .04 });
    txt(ctx, '= cara kita memakai teknologi', 500, -305, t, A.cara, SRF(46), { col: ivo(.8) });
    node(ctx, t, 520, 'PEMAKAIAN', A.memakai); node(ctx, t, 870, 'BERSAING', A.bersaing); node(ctx, t, 1220, 'MEMIMPIN', A.memimpin, true);
    fall(ctx, 'US$595 MILIAR', 1000, 262, t, A.memimpin + .15, DSP(112), { align: 'center', ls: 3, stag: .03 });
    txt(ctx, 'PEMBAYARAN DIGITAL INDONESIA · #1 ASIA TENGGARA', 1000, 308, t, A.memimpin + .4, MN(20), { align: 'center', ls: 2, col: ivo(.75) });
    srcTag(ctx, 'Sumber: e-Conomy SEA 2026 (Google, Temasek, Bain)', 230, 500, t, A.memimpin + .3);
  }

  // ── S2 checklist (opinion): four rows tick on their phrase ──────────────────────────────────────────────────
  const ROWS = [['RISET DIBIAYAI SWASTA', 'AS: BISNIS 2,54 % PDB vs FEDERAL 0,63 % PDB', '≈4×', A.riset, A.swasta],
    ['LEBIH BANYAK PENELITI', 'INDONESIA 395 vs AS 4.937 PER JUTA PENDUDUK', '≈12,5×', A.lebih, A.peneliti2],
    ['INTERNET RUMAH LAYAK', 'MEDIAN 52,62 vs 314,35 MBPS', '6×', A.internet, A.layak],
    ['MATEMATIKA DASAR', 'PISA LEVEL 2+: 17 vs 65 DARI 100 SISWA', '17 : 65', A.matematika, A.sekolah]];
  function drawS2(ctx, t) {
    txt(ctx, 'Menurutku, yang perlu dikejar:', -800, -330, t, A.menurutku + .05, SRF(62));
    slab(ctx, 'OPINI', 800, -350, t, A.dikejar, { align: 'right', size: 18 });
    ROWS.forEach(([ti, sub, r, t0, t1], i) => {
      const y = -190 + i * 165, k = kq(t, t0 - .1, .5); if (k <= 0) return;
      const a0 = ctx.globalAlpha; ctx.save(); ctx.translate(-760, y - 4); ctx.globalAlpha = a0 * k;
      ctx.strokeStyle = ivo(.6); ctx.lineWidth = 4; ctx.strokeRect(-32, -32, 64, 64);
      const kt = pop(t, t1 + .25, .5, .26);
      if (kt > 0) { ctx.scale(kt, kt); ctx.fillStyle = LIME; ctx.fillRect(-34, -34, 68, 68);
        ctx.strokeStyle = LIME_INK; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-17, 0); ctx.lineTo(-4, 14); ctx.lineTo(18, -15); ctx.stroke(); }
      ctx.restore(); ctx.globalAlpha = a0;
      txt(ctx, ti, -680, y + 30, t, t0 - .1, DSP(96), { ls: 2 });
      txt(ctx, sub, -676, y + 74, t, t0 + .2, MN(21), { ls: 2, col: ivo(.68) });
      fall(ctx, r, 800, y + 30, t, t0 + .3, DSP(96), { align: 'right', ls: 2, col: ivo(.88) });
    });
    srcTag(ctx, 'Sumber: NSF NCSES 2024; World Bank; Ookla Speedtest, Sep 2026; OECD PISA 2025', -800, 470, t, A.lebih);
  }

  // ── S3 comment fill-in: ghost answers type into the blank, lime caret blinks ─────────────────────────────────
  const GH = ['riset swasta', 'lebih banyak peneliti', 'internet rumah', 'matematika dasar'];
  function drawS3(ctx, t) {
    txt(ctx, 'Tulis di komentar:', -800, -300, t, A.tulis, SRF(66));
    fall(ctx, 'YANG HARUS DIKEJAR DULUAN:', -805, -110, t, A.yang - .1, DSP(150), { ls: 3, stag: .022 });
    const kl = kq(t, A.duluan + .1, .7); ctx.fillStyle = ivo(.55); ctx.fillRect(-800, 110, 1400 * kl, 4);
    let cx = -792, typing = false;
    if (t > A.blank) { const u = t - A.blank, P = 1.2, w = GH[Math.floor(u / P) % 4], s = u % P;
      const n = s < .55 ? Math.ceil(w.length * s / .55) : s < .95 ? w.length : Math.ceil(w.length * (1 - (s - .95) / .25)); typing = s < .55;
      setFont(ctx, SRF(92)); ctx.textAlign = 'left'; ctx.fillStyle = ivo(.34); const str = w.slice(0, Math.max(0, n)); ctx.fillText(str, -792, 78); cx = -792 + ctx.measureText(str).width + 10; }
    if (kl > 0 && (typing || Math.floor(t * 2.4) % 2 === 0)) { ctx.fillStyle = LIME; ctx.fillRect(cx, -14, 7, 106); }
    txt(ctx, '+ ALASANMU, SATU KALIMAT.', -800, 214, t, A.plus, MN(30), { ls: 4, col: ivo(.8) });
  }
  function bubble(ctx) {                                    // big comment bubble far behind (DOF-blurred depth layer)
    ctx.strokeStyle = ivo(.3); ctx.lineWidth = 12; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.roundRect(-460, -280, 920, 520, 64);
    ctx.moveTo(-250, 240); ctx.lineTo(-330, 360); ctx.lineTo(-140, 240); ctx.stroke();
    ctx.fillStyle = ivo(.14); for (let i = 0; i < 3; i++) ctx.fillRect(-360, -160 + i * 110, i === 2 ? 420 : 720, 34);
  }

  // ── S4 bakso cart + QR (code-drawn line art, grained) → "buatan kita" → Jakarta Post ────────────────────────────
  const CX = -420;                                         // cart centre on the station plane; sticker centre ≈ (CX + 165, 80)
  function cart(ctx, t) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = IVORY; ctx.lineWidth = 4;
    ctx.fillStyle = TILE; rr(ctx, -380, -430, 760, 34, 10); ctx.fill(); ctx.stroke();                         // roof + posts
    ctx.beginPath(); ctx.moveTo(-340, -396); ctx.lineTo(-340, -300); ctx.moveTo(340, -396); ctx.lineTo(340, -300); ctx.stroke();
    ctx.fillStyle = 'rgba(241,239,230,.05)'; rr(ctx, -340, -300, 680, 250, 12); ctx.fill(); ctx.stroke();      // glass cabinet
    ctx.strokeStyle = ivo(.35); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-330, -150); ctx.lineTo(330, -150); ctx.stroke();
    ctx.fillStyle = ivo(.12); ctx.beginPath(); ctx.moveTo(-320, -290); ctx.lineTo(-250, -290); ctx.lineTo(-330, -190); ctx.closePath(); ctx.fill();  // glass glint
    setFont(ctx, DSP(112), 8); ctx.fillStyle = ivo(.92); ctx.textAlign = 'center'; ctx.fillText('BAKSO', -110, -180); ctx.textAlign = 'left';
    ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3;                                                                 // bowls + pot + steam
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-270 + i * 18, -84 - i * 16, 52, 14, 0, 0, Math.PI); ctx.stroke(); }
    rr(ctx, 100, -140, 180, 86, 12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(90, -140); ctx.lineTo(290, -140); ctx.stroke();
    ctx.strokeStyle = ivo(.3); ctx.lineWidth = 3;
    for (let s = 0; s < 3; s++) { const ph = (t * .6 + s / 3) % 1; ctx.globalAlpha *= 1; ctx.beginPath();
      for (let k = 0; k <= 12; k++) { const y = -150 - k * 8 - ph * 40, x = 150 + s * 40 + Math.sin(k * .7 + t * 3 + s) * 7; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.fillStyle = TILE; rr(ctx, -360, -50, 720, 250, 14); ctx.fill(); ctx.stroke();  // body
    ctx.strokeStyle = ivo(.12); ctx.lineWidth = 2; for (let y = -10; y < 200; y += 40) { ctx.beginPath(); ctx.moveTo(-350, y); ctx.lineTo(350, y); ctx.stroke(); }
    ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(360, 30); ctx.lineTo(500, -40); ctx.stroke();       // handle
    ctx.lineWidth = 4; for (const x of [-230, 230]) { ctx.fillStyle = ROOM; ctx.beginPath(); ctx.arc(x, 232, 72, 0, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); for (let a = 0; a < 6; a++) { const r = a * Math.PI / 3; ctx.moveTo(x, 232); ctx.lineTo(x + Math.cos(r) * 66, 232 + Math.sin(r) * 66); } ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 4;
      ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, 232, 10, 0, 7); ctx.fill(); }
    ctx.save(); ctx.translate(165, 80); ctx.rotate(-.03);                                                        // the QR sticker
    ctx.fillStyle = '#F4F2EA'; ctx.fillRect(-95, -112, 190, 224); ctx.fillStyle = '#11120E'; setFont(ctx, MN(20), 6); ctx.textAlign = 'center'; ctx.fillText('QRIS', 0, -84);
    ctx.drawImage(IM.qr, -80, -70, 160, 160); ctx.textAlign = 'left';
    const ks = kq(t, A.memindai - .1, .45), sc = lerp(1.45, 1, ks), L = 34;                                     // scan brackets lock on
    if (ks > 0) { ctx.globalAlpha *= clamp(ks * 2); ctx.strokeStyle = LIME; ctx.lineWidth = 7; ctx.lineCap = 'square';
      for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const px = sx * 96 * sc, py = 10 + sy * 96 * sc; ctx.beginPath(); ctx.moveTo(px, py - sy * L); ctx.lineTo(px, py); ctx.lineTo(px - sx * L, py); ctx.stroke(); }
      const u = inv(A.memindai, A.qr + .45, t); if (u > 0 && u < 1) { const y = 10 - 80 + 160 * (.5 - .5 * Math.cos(u * Math.PI * 2)); ctx.fillStyle = LIME; ctx.fillRect(-84, y - 2, 168, 4);
        ctx.fillStyle = 'rgba(200,245,60,.18)'; ctx.fillRect(-84, y - 26, 168, 24); } }
    ctx.restore();
  }
  function drawS4(ctx, t) {
    const a0 = ctx.globalAlpha; ctx.save(); ctx.translate(CX, 0); ctx.globalAlpha = a0 * (1 - .5 * kq(t, A.dibahas, .5)); cart(ctx, t); ctx.restore(); ctx.globalAlpha = a0;
    grainRect(ctx, CX - 400, -460, 920, 800, t, .24);
    txt(ctx, 'GEROBAK BAKSO · QRIS', CX - 380, -470, t, A.lain + .3, MN(20), { ls: 5, col: ivo(.7) });
    const g = gone(t, A.dibahas - .1, .4); ctx.globalAlpha = a0 * g;
    txt(ctx, 'Ingat,', 230, -150, t, A.ingat, SRF(76));
    txt(ctx, 'itu salah satu teknologi', 230, -60, t, A.salah, SRF(52));
    markLine(ctx, '', 'BUATAN KITA.', '', 230, 130, t, A.buatan - .15, A.buatan + .1, DSP(140), { align: 'left', ls: 3 });
    ctx.globalAlpha = a0;
    evid(ctx, IM.jp, 520, -10, 820, t, A.dibahas, { crop: [.17, .19, .66, .48], rot: 1.2, tab: 'THE JAKARTA POST · 2 JUN 2025', hl: [[.038, .135, .79, .167, A.laporan]] });
    srcTag(ctx, 'Sumber: USTR, 2025 National Trade Estimate (31 Mar 2025) menyebut QRIS & GPN', 110, 300, t, A.resmi);
  }
  function drawPhone(ctx, t) {                               // a phone slides in, its screen frames the code
    const k = kq(t, A.kamu - .1, .7); if (k <= 0) return; const a0 = ctx.globalAlpha;
    const ko = E.inCubic(inv(A.ingat - .2, A.ingat + .4, t)); if (ko >= 1) return;
    ctx.save(); ctx.translate((1 - k) * 900 + ko * 1100, 0); ctx.rotate(-.12 + (1 - k) * .2 + ko * .15); ctx.globalAlpha = a0 * (1 - ko);
    phone(ctx, 230, 460); ctx.drawImage(IM.qr, -62, -92, 124, 124);
    const ks = kq(t, A.memindai - .05, .4); if (ks > 0) { ctx.strokeStyle = LIME; ctx.lineWidth = 5; const L = 22, R = 72 * lerp(1.3, 1, ks);
      for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const px = sx * R, py = -30 + sy * R; ctx.beginPath(); ctx.moveTo(px, py - sy * L); ctx.lineTo(px, py); ctx.lineTo(px - sx * L, py); ctx.stroke(); } }
    const kd = kq(t, A.qr + .15, .3); if (kd > 0) { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 120, 30 * kd, 0, 7); ctx.fill();
      ctx.strokeStyle = LIME_INK; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-12, 120); ctx.lineTo(-3, 130); ctx.lineTo(14, 110); ctx.stroke(); }
    ctx.restore(); ctx.globalAlpha = a0;
  }

  // ── S5: the Indonesia card, then the camera pulls back through a corridor of grey cards ───────────────────────
  function drawS5(ctx) { ctx.drawImage(IM.ivory, -300, -400, 600, 800); }
  function corridor(ctx, t, pr, foc, items) {
    const S = ST[5], ga = clamp((t - S.at + .4) / .6); if (ga <= 0) return;
    for (let i = 0; i < 40; i++) { const sd = i % 2 ? 1 : -1, z = S.z - 420 - i * 150, x = S.x + sd * (640 + rnd(i + 3) * 520), y = S.py - 120 + (rnd(i + 11) - .5) * 760;
      items.push({ z, x, f: () => onPlane(ctx, pr, x, y, z, foc, o => { const a = ga * .85 * clamp((o.z - 700) / 2200); if (a <= .01) return; ctx.globalAlpha = a; ctx.drawImage(IM.grey, -150, -200, 300, 400); }, -sd * 32) }); }
  }

  // ── stations ─────────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, name: 'Sejauh apa jaraknya?', dist: [1700, 1480], draw(ctx, t) {
      txt(ctx, 'PENUTUP', 0, -250, t, .25, MN(28), { align: 'center', ls: 10, col: ivo(.75) });
      const k = kq(t, .4, .6); ctx.fillStyle = LIME; ctx.fillRect(-70 * k, -222, 140 * k, 5);
      fall(ctx, 'SEJAUH APA', 0, 95, t, A.sejauh - .05, DSP(300), { align: 'center', ls: 6, stag: .04 });
      markLine(ctx, '', 'jaraknya?', '', 0, 265, t, A.jarak - .2, A.jarak + .1, SRF(76), { ls: 0 });
    } },
    { at: A.di, name: 'Hulu vs hilir', via: 'whip', tag: 'HULU', draw: drawS1,
      mod(c, t) { const h = E.inOutCubic(inv(A.hilir - .3, A.hilir + .6, t)), o = E.inOutCubic(inv(A.bahkan - .1, A.bahkan + 1.1, t));
        c.tx += lerp(lerp(-700, 700, h), 0, o) + 40 * Math.sin(t * .5); c.dist += 1250 * o; c.ty += 30 * o; c.foc = c.dist; } },
    { at: A.menurutku, name: 'Yang perlu dikejar', via: 'whip', tag: '4', draw: drawS2,
      mod(c, t) { c.ty += 45 * (kq(t, A.riset, .7) + kq(t, A.lebih, .7) + kq(t, A.internet, .7) + kq(t, A.matematika, .7)) - 90; } },
    { at: A.tulis, name: 'Tulis di komentar', via: 'push', tag: 'KOMEN', draw: drawS3,
      layers: [{ dz: 900, dx: 820, dy: -180, fn: (ctx) => bubble(ctx) }] },
    { at: A.lain, name: 'QR gerobak bakso', via: 'rise', tag: 'QR', draw: drawS4, layers: [{ dz: -260, dx: CX + 400, dy: 40, fn: drawPhone }],
      mod(c, t) { const k = kq(t, A.memindai - .35, .8) * gone(t, A.ingat - .25, .7); c.dist -= 430 * k; c.tx += (CX + 165) * .85 * k; c.ty += 50 * k;
        c.tx += 150 * kq(t, A.dibahas - .1, .8); c.foc = c.dist; } },
    { at: A.video, name: 'Layar akhir', via: 'push', lead: .4, dur: 1.0, yaw: [-3, 2.5], draw: drawS5, world: corridor,
      mod(c, t) { const k = E.outCubic(inv(A.video - .35, DUR + .5, t)); c.dist += 5600 * k; c.pitch += 2 * k; c.foc = c.dist * lerp(1, .75, k); } },
  ];

  // ── end screen (screen space): left = title + subscribe-safe zone, right = two calm video slots ─────────────────
  // subscribe: a pill pops in, a cursor glides over and clicks it (→ lime SUBSCRIBED ✓), then clicks the bell, which swings (silent, no ting)
  function subscribe(o, t) {
    const m = A.menunggu, c1 = m + 1.86, c2 = m + 2.91, BX = 146, BY = 730, BW = 430, BH = 108;
    const kb = E.outQuint(inv(m + .4, m + 1.0, t)); if (kb <= 0) return;
    const on = t > c1 + .06, press = 1 - .06 * Math.sin(Math.PI * clamp((t - c1 + .04) / .16)), hov = .025 * clamp((t - m - 1.55) / .2) * (on ? 0 : 1);
    o.save(); o.globalAlpha = kb; o.translate(BX + BW / 2, BY + BH / 2); const s = lerp(.82, 1, kb) * (press + hov); o.scale(s, s);
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 40; o.shadowOffsetY = 16; o.fillStyle = on ? LIME : IVORY; rr(o, -BW / 2, -BH / 2, BW, BH, BH / 2); o.fill();
    o.shadowColor = 'transparent'; o.fillStyle = on ? LIME_INK : '#11120E'; o.beginPath(); o.arc(-BW / 2 + 56, 0, 30, 0, 7); o.fill();
    setFont(o, DSP(40), 0); o.fillStyle = on ? LIME : IVORY; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('R', -BW / 2 + 56, 2);
    setFont(o, DSP(62), 3); o.fillStyle = on ? LIME_INK : '#11120E'; o.textAlign = 'left'; o.fillText(on ? 'SUBSCRIBED' : 'SUBSCRIBE', -BW / 2 + 106, 4);
    if (on) { const kc = E.outCubic(inv(c1 + .06, c1 + .3, t)); o.strokeStyle = LIME_INK; o.lineWidth = 7; o.lineCap = 'round'; o.beginPath();
      o.moveTo(BW / 2 - 64, 0); o.lineTo(BW / 2 - 64 + 12 * kc, 13 * kc); if (kc > .5) o.lineTo(BW / 2 - 52 + 22 * (kc - .5) * 2, 13 - 30 * (kc - .5) * 2); o.stroke(); }
    o.restore();
    const kr = inv(c1, c1 + .55, t); if (kr > 0 && kr < 1) { o.save(); o.globalAlpha = (1 - kr) * .8; o.strokeStyle = LIME; o.lineWidth = 4;   // click ripple
      rr(o, BX - 30 * E.outCubic(kr), BY - 30 * E.outCubic(kr), BW + 60 * E.outCubic(kr), BH + 60 * E.outCubic(kr), BH / 2 + 30 * kr); o.stroke(); o.restore(); }
    const BLX = BX + BW + 84, kl = E.outQuint(inv(c1 + .25, c1 + .7, t));             // bell
    if (kl > 0) { const on2 = t > c2 + .05, sw = t > c2 ? Math.sin((t - c2) * 26) * Math.exp(-(t - c2) * 3.2) * 20 * D2R : 0;
      o.save(); o.globalAlpha = kl; o.translate(BLX, BY + BH / 2); const p2 = 1 - .07 * Math.sin(Math.PI * clamp((t - c2 + .04) / .16)); o.scale(lerp(.6, 1, kl) * p2, lerp(.6, 1, kl) * p2);
      o.fillStyle = on2 ? IVORY : 'rgba(11,12,9,.6)'; o.strokeStyle = ivo(.7); o.lineWidth = 3; o.beginPath(); o.arc(0, 0, 54, 0, 7); o.fill(); o.stroke();
      o.rotate(sw); o.translate(0, -2); o.fillStyle = on2 ? '#11120E' : IVORY; o.beginPath(); o.moveTo(-22, 14); o.lineTo(-16, 7); o.lineTo(-16, -5);
      o.bezierCurveTo(-16, -25, 16, -25, 16, -5); o.lineTo(16, 7); o.lineTo(22, 14); o.closePath(); o.fill(); o.beginPath(); o.arc(0, 19, 5, 0, 7); o.fill(); o.fillRect(-2.5, -27, 5, 6);
      o.restore(); }
    const kp = E.inOutCubic(inv(m + .9, m + 1.6, t)), kq2 = E.inOutCubic(inv(c1 + .45, c1 + .95, t)), kx = E.inOutCubic(inv(c2 + .5, c2 + 1.2, t));   // cursor
    if (kp > 0) { let x = lerp(980, BX + BW * .62, kp), y = lerp(1030, BY + BH * .62, kp);
      x = lerp(x, BLX + 10, kq2); y = lerp(y, BY + BH / 2 + 14, kq2); x += 60 * kx; y += 40 * kx;
      const cs = 1.5 * (1 - .12 * Math.sin(Math.PI * clamp((t - c1 + .04) / .16)) - .12 * Math.sin(Math.PI * clamp((t - c2 + .04) / .16)));
      o.save(); o.globalAlpha = clamp(kp * 3) * (1 - kx); o.translate(x, y); o.scale(cs, cs); o.shadowColor = 'rgba(0,0,0,.5)'; o.shadowBlur = 12; o.shadowOffsetY = 5;
      o.beginPath(); o.moveTo(0, 0); o.lineTo(0, 34); o.lineTo(8, 26); o.lineTo(14, 39); o.lineTo(20, 36); o.lineTo(14, 23); o.lineTo(25, 23); o.closePath();
      o.fillStyle = '#fff'; o.fill(); o.shadowColor = 'transparent'; o.strokeStyle = '#11120E'; o.lineWidth = 2; o.lineJoin = 'round'; o.stroke(); o.restore(); }
  }
  function endScreen(o, t) {
    const k = E.outCubic(inv(A.video + .3, A.video + 1.4, t)); if (k <= 0) return;
    o.setTransform(1, 0, 0, 1, 0, 0); o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    const g = o.createLinearGradient(0, 0, 1050, 0); g.addColorStop(0, 'rgba(11,12,9,.78)'); g.addColorStop(1, 'rgba(11,12,9,0)'); o.globalAlpha = k; o.fillStyle = g; o.fillRect(0, 0, 1050, H);
    for (const [y, t0] of [[150, A.berikutnya], [570, A.berikutnya + .3]]) { const q = E.outQuint(inv(t0, t0 + .8, t)); if (q <= 0) continue;
      o.save(); o.globalAlpha = q; o.translate(1120 + 320, y + 180); const s = lerp(.94, 1, q); o.scale(s, s);
      o.fillStyle = 'rgba(11,12,9,.55)'; rr(o, -320, -180, 640, 360, 18); o.fill(); o.setLineDash([14, 10]); o.lineDashOffset = -t * 10; o.strokeStyle = ivo(.34); o.lineWidth = 2; o.stroke(); o.setLineDash([]); o.restore(); }
    subscribe(o, t);
    o.globalAlpha = 1; const kb = kq(t, A.video + .2, .6); o.fillStyle = LIME; o.fillRect(146, 350, 120 * kb, 6);
    fall(o, 'VIDEO BERIKUTNYA', 140, 470, t, A.berikutnya - .2, DSP(116), { ls: 3, stag: .03 });
    txt(o, 'sudah menunggu di layar.', 146, 545, t, A.menunggu, SRF(50), { col: ivo(.9) });
  }

  // ── gates + chapter ──────────────────────────────────────────────────────────────────────────────────────────
  for (const s of ST) {                                    // nothing of a station shows before it is reached (ghost tags aside)
    const at = s.at, wrap = fn => fn && ((ctx, t, c) => { if (s === ST[0]) return fn(ctx, t, c); const g = clamp((t - at + .5) / .35); if (g <= 0) return; ctx.globalAlpha = g; fn(ctx, t, c); });
    s.draw = wrap(s.draw); for (const L of s.layers || []) L.fn = wrap(L.fn);
  }
  const over = (o, t) => { if (t > A.video) { o.save(); endScreen(o, t); o.restore(); } };
  return makeChapter({ B, ST, load, label: 'PENUTUP', over });
}
