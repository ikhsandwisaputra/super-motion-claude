// Bab 03 · Dompet & Kelas (VO ivs_vo_ahmad_06, 129 s). One depth row of 13 stations: keranjang tanggal kembar → e-Conomy SEA US$119 M →
// kuartal AS vs setahun kita (four lime year-strips fold into the US quarter) → kue + klik → SEKOLAH (documentary plate) → PISA number line →
// level-2 stairs → 100 anak, 17 vs 65 → "bukan salah anaknya" (documentary plate) → IMD rank strip → tiga pintu → papan skor suram →
// the US document page turns ("buka halamannya") into the Puncak.
import B from './beats.js';
import { clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, TILE, DISP, SER, MONO, D2R, ivo, setFont, rnd,
  timing, makeChapter, loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone } from './kit.js';
import { kq, pop, popAt, doc, phone, apps, chip } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const ACC_INK = '#4B6800', INK = '#11120E', KRAFT = '#D9D2BB', KRAFT2 = '#A79F86';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const V = {}, IM = {};

  async function load() {
    const vb = '../assets/shared/vid/';
    for (const n of ['kurir', 'nirsentuh', 'anak_sd', 'kelas_sma']) V[n] = await loadVid(vb, n);
    const kb = '../assets/shared/kutipan/', gb = '../assets/shared/grafik/';
    for (const [k, f] of [['kompas', kb + 'tekno-ekonomi-digital-indonesia-tembus-rp-2.png'], ['oecd', kb + 'oecd-pisa-2025-results-volume-i-indonesia.png'],
      ['jg', kb + 'jakartaglobe-indonesia-falls-to-48th-in-imd.png'], ['bisnis', kb + 'ekonomi-daftar-keluhan-as-ke-bank-indonesia-dan.png'],
      ['gEcom', gb + 'grafik-ecommerce-indo-vs-as.png'], ['gPisa', gb + 'grafik-pisa-2025.png'], ['gLv2', gb + 'grafik-pisa-level2.png']]) IM[k] = await loadImg(f, 1600);
  }

  // ── props ────────────────────────────────────────────────────────────────────────────────────────────────────
  function parcel(ctx, w, h) {                             // kraft parcel with a tape stripe, centred
    const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, KRAFT); g.addColorStop(1, KRAFT2);
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 5); ctx.fill();
    ctx.fillStyle = 'rgba(60,55,40,.28)'; ctx.fillRect(-5, -h / 2, 10, h); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 8, w * .3, 5);
    ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 5); ctx.stroke();
  }
  function calCard(ctx, mon, day) {                          // tear-off calendar page, centred
    doc(ctx, 0, 0, 220, 250, { r: 14, blur: 30, sy: 14 });
    ctx.fillStyle = '#24251F'; ctx.beginPath(); ctx.roundRect(-110, -125, 220, 62, [14, 14, 0, 0]); ctx.fill();
    ctx.fillStyle = IVORY; for (const x of [-60, 60]) { ctx.beginPath(); ctx.arc(x, -125, 9, 0, 7); ctx.fill(); }
    setFont(ctx, MN(24), 8); ctx.textAlign = 'center'; ctx.fillText(mon, 0, -84);
    ctx.fillStyle = INK; setFont(ctx, DSP(118), 2); ctx.fillText(day, 0, 70); ctx.textAlign = 'left';
  }
  function cart(ctx, x, y, t) {                              // wire cart that fills with parcels on "keranjang penuh"
    const k = kq(t, A.keranjang - .35, .5); if (k <= 0) return; const a0 = ctx.globalAlpha;
    ctx.save(); ctx.translate(x + 30 * (1 - k), y);
    const P = [[-62, 28, 70, 56], [14, 28, 66, 56], [90, 28, 60, 56], [-34, -28, 76, 54], [44, -30, 64, 58], [112, -26, 50, 50], [4, -86, 72, 56], [-72, -80, 58, 46]];
    P.forEach(([px, py, w, h], i) => { const s = t - A.keranjang - .15 - i * .08; if (s <= 0) return; const sp = spring(s, .6, .3);
      ctx.save(); ctx.translate(px, py - (1 - sp) * 440); ctx.rotate(((rnd(i + 9) - .5) * .14 + (rnd(i + 5) - .5) * .5 * (1 - clamp(sp))));
      ctx.globalAlpha = a0 * clamp(s / .08); parcel(ctx, w, h); ctx.restore(); });
    ctx.globalAlpha = a0 * k; ctx.strokeStyle = IVORY; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-210, -120); ctx.lineTo(-156, -120); ctx.lineTo(-112, 62); ctx.lineTo(152, 62); ctx.lineTo(180, -60); ctx.lineTo(-140, -60); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = ivo(.5);
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(lerp(-140, 180, i / 5), -60); ctx.lineTo(lerp(-112, 152, i / 5), 62); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(-126, 0); ctx.lineTo(166, 0); ctx.stroke();
    ctx.lineWidth = 7; ctx.strokeStyle = IVORY; ctx.beginPath(); ctx.moveTo(-112, 62); ctx.lineTo(-98, 100); ctx.lineTo(152, 100); ctx.stroke();
    for (const wx of [-70, 120]) { ctx.beginPath(); ctx.arc(wx, 128, 17, 0, 7); ctx.stroke(); }
    ctx.restore(); ctx.globalAlpha = a0;
  }
  function person(ctx, x, y, on, col) {                     // one kid: head + shoulders; on 0..1 lights it
    for (const [c, a] of [[ivo(.2), 1], [col, on]]) { if (a <= 0) continue; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * a; ctx.fillStyle = c;
      ctx.beginPath(); ctx.arc(x, y - 9, 7.5, 0, 7); ctx.fill(); ctx.beginPath(); ctx.roundRect(x - 11, y + 1, 22, 16, [8, 8, 3, 3]); ctx.fill(); ctx.globalAlpha = a0; }
  }
  function kids(ctx, cx, cy, lit, t, t0, tl, col, step) {   // 10×10 kids, lit from the bottom-left row by row
    const a0 = ctx.globalAlpha;
    for (let i = 0; i < 100; i++) { const r = 9 - Math.floor(i / 10), c = i % 10, ka = kq(t, t0 + (c + 9 - r) * .025, .4); if (ka <= 0) continue;
      const on = i < lit ? kq(t, tl + i * step, .25) : 0; ctx.globalAlpha = a0 * ka; person(ctx, cx - 225 + c * 50, cy - 225 + r * 50 + (1 - ka) * 20, on, col); }
    ctx.globalAlpha = a0;
  }
  function icon(ctx, kind) {                                 // door icons, line art, centred
    ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
    if (kind === 'flask') { ctx.moveTo(-18, -62); ctx.lineTo(-18, -16); ctx.lineTo(-56, 54); ctx.quadraticCurveTo(-60, 68, -44, 68); ctx.lineTo(44, 68); ctx.quadraticCurveTo(60, 68, 56, 54);
      ctx.lineTo(18, -16); ctx.lineTo(18, -62); ctx.moveTo(-28, -62); ctx.lineTo(28, -62); ctx.moveTo(-38, 30); ctx.lineTo(38, 30); }
    else if (kind === 'plug') { ctx.roundRect(-32, -36, 64, 56, 8); ctx.moveTo(-14, -36); ctx.lineTo(-14, -66); ctx.moveTo(14, -36); ctx.lineTo(14, -66);
      ctx.moveTo(0, 20); ctx.bezierCurveTo(0, 60, 60, 50, 40, 80); ctx.bezierCurveTo(26, 100, -40, 84, -50, 100); }
    else { ctx.rect(-74, -56, 148, 92); ctx.moveTo(-50, -30); ctx.lineTo(10, -30); ctx.moveTo(-50, -8); ctx.lineTo(40, -8); ctx.moveTo(-50, 14); ctx.lineTo(-10, 14);
      ctx.moveTo(-50, 36); ctx.lineTo(-62, 86); ctx.moveTo(50, 36); ctx.lineTo(62, 86); }
    ctx.stroke();
  }
  function door(ctx, x, t, t0, kind, label, n) {             // a door in its frame, ajar, light behind it on "simpan jawabanmu"
    const k = pop(t, t0 - .15); if (k <= 0) return; const a0 = ctx.globalAlpha, open = .1 + .22 * kq(t, A.simpan, .9);
    ctx.save(); ctx.translate(x, 0); ctx.scale(lerp(.7, 1, Math.min(1, k)), lerp(.7, 1, Math.min(1, k))); ctx.globalAlpha = a0 * clamp((t - t0 + .15) / .12);
    const g = ctx.createLinearGradient(-150, 0, 150, 0); g.addColorStop(0, ivo(.10 + .5 * open)); g.addColorStop(1, ivo(.03));
    ctx.fillStyle = g; ctx.fillRect(-150, -250, 300, 500);                                       // light spilling from the room behind
    ctx.strokeStyle = ivo(.7); ctx.lineWidth = 6; ctx.strokeRect(-158, -258, 316, 516);
    const rx = -150 + 300 * (1 - open * .75), lift = 34 * open;                                  // leaf, hinged left, swinging towards us
    const lg = ctx.createLinearGradient(-150, 0, rx, 0); lg.addColorStop(0, '#2A2B25'); lg.addColorStop(1, '#1A1B16');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-150, -250); ctx.lineTo(rx, -250 - lift); ctx.lineTo(rx, 250 + lift); ctx.lineTo(-150, 250); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = ivo(.7); ctx.beginPath(); ctx.arc(rx - 26, 10, 7, 0, 7); ctx.fill();
    ctx.save(); ctx.translate((-150 + rx) / 2, -50); ctx.scale((rx + 150) / 300, 1); icon(ctx, kind); ctx.restore();
    setFont(ctx, MN(18), 6); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.6); ctx.fillText(`PINTU ${n}`, 0, -284);
    setFont(ctx, DSP(70), 4); ctx.fillStyle = IVORY; ctx.fillText(label, 0, 338); ctx.textAlign = 'left';
    ctx.restore(); ctx.globalAlpha = a0;
  }
  const sideCard = (key, tab, t0, rot) => (ctx, t) => evid(ctx, IM[key], 0, 0, 1150, t, t0, { dim: .5, tab, rot });

  // ── S2: three US months vs our whole year (area = money) ────────────────────────────────────────────────────
  function drawS2(ctx, t) {
    const X0 = -720, MW = 120, BASE = 140, QX = X0 + 3 * MW, a0 = ctx.globalAlpha;
    const kr = kq(t, A.sekarang + .1, .8); ctx.fillStyle = ivo(.55); ctx.fillRect(X0, BASE + 8, 1440 * kr, 3);
    for (let i = 0; i <= 12; i++) if (i / 12 <= kr) ctx.fillRect(X0 + i * MW - 1.5, BASE + 8, 3, 14);
    'JAN FEB MAR APR MEI JUN JUL AGU SEP OKT NOV DES'.split(' ').forEach((m, i) => txt(ctx, m, X0 + i * MW + MW / 2, BASE + 46, t, A.sekarang + .15 + i * .04, MN(15), { align: 'center', ls: 2, col: ivo(.55), rise: 10 }));
    const ks = kq(t, A.bandingkan, .9), pulse = .5 + .5 * Math.sin(clamp((t - A.kita) / .9) * Math.PI);
    if (ks > 0) { ctx.fillStyle = LIME; ctx.fillRect(X0, BASE + 64, 1440 * ks, 22); if (t > A.kita && t < A.kita + .9) { ctx.globalAlpha = a0 * .35 * pulse; ctx.fillRect(X0, BASE + 56, 1440, 38); ctx.globalAlpha = a0; } }
    txt(ctx, 'INDONESIA · SETAHUN PENUH · US$85 MILIAR', 720, BASE + 130, t, A.bandingkan + .3, MN(20), { align: 'right', ls: 3, col: LIME });
    const kqq = kq(t, A.kuartal, .45); if (kqq > 0) { ctx.fillStyle = IVORY; ctx.fillRect(QX, BASE + 18, 360 * kqq, 5); }
    txt(ctx, 'AMERIKA · KUARTAL II 2026 · 3 BULAN', QX, -250, t, A.kuartal, MN(20), { ls: 3, col: ivo(.85) });
    const hb = 352 * E.outCubic(inv(A.tiga, A.tigaratus + 1.0, t));
    if (hb > 0) { const g = ctx.createLinearGradient(0, BASE - hb, 0, BASE); g.addColorStop(0, ivo(.88)); g.addColorStop(1, ivo(.5)); ctx.fillStyle = g; ctx.fillRect(QX, BASE - hb, 360, hb); }
    if (t > A.tiga2 && t < A.tiga2 + 1.2) { ctx.globalAlpha = a0 * .6 * (1 - inv(A.tiga2, A.tiga2 + 1.2, t)); ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.strokeRect(QX - 8, BASE - 360, 376, 386); ctx.globalAlpha = a0; }
    if (t > A.tigaratus - .1) {
      txt(ctx, `US$${Math.round(countTo(0, 340, t, A.tigaratus - .1, 1.4))}`, 40, 40, t, A.tigaratus - .1, DSP(150), { ls: 2 });
      txt(ctx, 'MILIAR · DALAM 3 BULAN', 44, 84, t, A.tigaratus + .2, MN(18), { ls: 3, col: ivo(.7) });
    }
    for (let j = 0; j < 4; j++) {                            // four of our years, folded into their quarter
      const s = kq(t, A.hampir + j * .17, .6); if (s <= 0) continue;
      const fx = lerp(X0, QX, s), fy = lerp(BASE + 64, BASE - 88 * (j + 1), s), fw = lerp(1440, 360, s), fh = lerp(22, 88, s);
      ctx.fillStyle = 'rgba(200,245,60,.16)'; ctx.fillRect(fx, fy, fw, fh); ctx.strokeStyle = LIME; ctx.lineWidth = 3; ctx.strokeRect(fx + 1.5, fy + 1.5, fw - 3, fh - 3);
      txt(ctx, `${j + 1}×`, QX - 18, BASE - 88 * j - 32, t, A.hampir + j * .17 + .35, MN(24), { align: 'right', col: LIME, rise: 8 });
    }
    const w4 = fall(ctx, '≈ 4×', 520, -150, t, A.empat, DSP(230), { align: 'center', ls: 4, stag: .05 });
    txt(ctx, 'TIGA BULAN MEREKA ≈ 4 × SETAHUN KITA', 520, -96, t, A.kali + .1, MN(17), { align: 'center', ls: 2, col: ivo(.75) });
    txt(ctx, '*', 520 + w4 / 2 + 8, -236, t, A.sama, DSP(110), { col: LIME, rise: 10 });
    slab(ctx, 'PENJUALAN RITEL ONLINE', QX, -300, t, A.penjualan, { size: 17 });
    slab(ctx, 'GMV · NILAI BARANG LEWAT PLATFORM', 720, BASE + 168, t, A.platform - .3, { size: 17, align: 'right' });
    typeOn(ctx, '* Perbandingan kasar: GMV platform (e-Conomy SEA) vs penjualan ritel online (US Census) — metodologi berbeda', -840, 398, t, A.cara, MN(17, 400), { cps: 55, col: ivo(.72) });
    slab(ctx, 'GAMBARAN BESARNYA: JELAS', 520, 20, t, A.tapi + .1, { size: 20, align: 'center' });
    srcTag(ctx, 'Sumber: US Census Bureau, Quarterly E-Commerce Report (Agu 2026) · e-Conomy SEA 2026', -840, 440, t, A.kuartal + .3);
  }

  // ── S3: kue + klik ───────────────────────────────────────────────────────────────────────────────────────────
  function drawS3(ctx, t) {
    txt(ctx, 'KITA RAJIN BELANJA', 470, -385, t, A.artinya, MN(20), { align: 'center', ls: 6, col: ivo(.8) });
    const tiles = [['phone', 'GAWAI'], ['chip', 'CHIP'], ['apps', 'APLIKASI']];
    tiles.forEach(([kind, lb], i) => popAt(ctx, 220 + i * 250, -170, t, A.rajin + i * .1, () => {
      ctx.fillStyle = '#191A15'; ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-105, -130, 210, 260, 18); ctx.fill(); ctx.stroke();
      ctx.save(); ctx.translate(0, -20);
      if (kind === 'phone') { ctx.scale(.42, .42); phone(ctx, 210, 400); } else if (kind === 'chip') { ctx.scale(.5, .5); chip(ctx, 180); } else { ctx.scale(.62, .62); apps(ctx, 56, 16); }
      ctx.restore(); setFont(ctx, MN(15), 4); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.65); ctx.fillText(lb, 0, 108); ctx.textAlign = 'left';
    }, { from: .3, rise: 60 }));
    // the cursor travels to the chip and clicks
    const kc = E.inOutCubic(inv(A.klik - .5, A.klik - .02, t));
    if (t > A.klik - .6) { const cx = lerp(860, 485, kc), cy = lerp(160, -150, kc), a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * clamp((t - A.klik + .6) / .15);
      if (t > A.klik) { const s = clamp((t - A.klik) / .5); ctx.strokeStyle = ivo(.8 * (1 - s)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 10 + 50 * s, 0, 7); ctx.stroke(); }
      ctx.save(); ctx.translate(cx, cy); const pr = t > A.klik && t < A.klik + .12 ? .86 : 1; ctx.scale(pr, pr);
      ctx.fillStyle = IVORY; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 44); ctx.lineTo(11, 33); ctx.lineTo(20, 52); ctx.lineTo(28, 48); ctx.lineTo(19, 30); ctx.lineTo(34, 30); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore(); ctx.globalAlpha = a0; }
    tiles.forEach((_, i) => slab(ctx, 'DIRANCANG DI: ?', 220 + i * 250, 0, t, A.dirancang + i * .1, { size: 15, align: 'center', ls: 2 }));
    markLine(ctx, 'belum tentu ', 'dirancang di sini', '.', 470, 190, t, A.belum - .25, A.dirancang + .2, SRF(46));
    // the pie, by area: their quarter vs our year
    popAt(ctx, -520, -40, t, A.kue, () => {
      ctx.fillStyle = ivo(.12); ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 260, 0, 7); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = ivo(.12); for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(i * Math.PI / 4) * 258, Math.sin(i * Math.PI / 4) * 258); ctx.stroke(); }
      ctx.textAlign = 'center'; ctx.fillStyle = IVORY; setFont(ctx, DSP(110), 2); ctx.fillText('US$340 M', 0, -40); setFont(ctx, MN(17), 4); ctx.fillStyle = ivo(.75);
      ctx.fillText('AMERIKA · 3 BULAN', 0, -2); ctx.textAlign = 'left';
    }, { from: .4 });
    const sq = t > A.kecil ? 1 - .1 * Math.sin(clamp((t - A.kecil) / .35) * Math.PI) : 1;
    popAt(ctx, -300, 150, t, A.kue + .35, () => {
      ctx.scale(sq, sq); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 130, 0, 7); ctx.fill();
      ctx.textAlign = 'center'; ctx.fillStyle = LIME_INK; setFont(ctx, DSP(72), 2); ctx.fillText('US$85 M', 0, 6); setFont(ctx, MN(14), 3); ctx.fillText('KITA · SETAHUN', 0, 36); ctx.textAlign = 'left';
    }, { from: .3 });
    markLine(ctx, 'Kue ekonominya masih ', 'jauh lebih kecil', '', -820, -370, t, A.kue - .25, A.jauh, SRF(44), { align: 'left' });
    txt(ctx, 'LUAS LINGKARAN ∝ NILAI · M = MILIAR', -820, 330, t, A.kue + .6, MN(15), { ls: 3, col: ivo(.6) });
    srcTag(ctx, 'Sumber: US Census Bureau (Agu 2026) · e-Conomy SEA 2026 via Kompas.com', -840, 440, t, A.kue + .4);
  }

  // ── S5: PISA on a number line ────────────────────────────────────────────────────────────────────────────────
  function drawS5(ctx, t) {
    evid(ctx, IM.oecd, -480, -250, 640, t, A.tes - .1, { tab: 'OECD · PISA 2025', rot: -1.4, hl: [[.42, .31, .325, .12, A.indonesia2]] });
    txt(ctx, 'PISA 2025 · MATEMATIKA', 430, -390, t, A.pisa, MN(22), { align: 'center', ls: 5, col: ivo(.8) });
    popAt(ctx, 430, -250, t, A.anak, () => { setFont(ctx, DSP(126), 4); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('UMUR 15 TAHUN', 0, 44); ctx.textAlign = 'left'; }, { from: .5 });
    const LY = 170, px = v => -760 + (v - 300) / 200 * 1520, kl = kq(t, A.nilai2, .9), a0 = ctx.globalAlpha;
    if (kl > 0) {
      ctx.fillStyle = ivo(.6); ctx.fillRect(-760, LY - 1.5, 1520 * kl, 3);
      for (let v = 300; v <= 500; v += 10) { if (px(v) > -760 + 1520 * kl + 1) break; const big = v % 50 === 0; ctx.fillStyle = ivo(.6); ctx.fillRect(px(v) - 1, LY - (big ? 14 : 7), 2, big ? 28 : 14);
        if (big) txt(ctx, String(v), px(v), LY + 46, t, A.nilai2 + (v - 300) / 200 * .7, MN(16), { align: 'center', col: ivo(.55), rise: 10 }); }
      txt(ctx, 'SKOR MATEMATIKA', -760, LY - 34, t, A.nilai2 + .2, MN(15), { ls: 3, col: ivo(.55) });
    }
    if (t > A.rata) { const k = kq(t, A.rata, .6); ctx.strokeStyle = ivo(.75); ctx.lineWidth = 3; ctx.setLineDash([10, 9]); ctx.beginPath(); ctx.moveTo(px(463), LY + 18); ctx.lineTo(px(463), LY + 18 + 140 * k); ctx.stroke(); ctx.setLineDash([]); }
    txt(ctx, 'RATA-RATA OECD · 463', px(463), LY + 186, t, A.rata + .3, MN(18), { align: 'center', ls: 3, col: ivo(.85) });
    if (t > A.oecd2 + .2) { const k = kq(t, A.oecd2 + .2, .6), y = LY + 96; ctx.fillStyle = ivo(.7); ctx.fillRect(px(364), y - 1, (px(463) - px(364)) * k, 2);
      ctx.fillRect(px(364) - 1, y - 10, 2, 20); if (k > .98) ctx.fillRect(px(463) - 1, y - 10, 2, 20); }
    txt(ctx, 'SELISIH 99 POIN', (px(364) + px(463)) / 2, LY + 130, t, A.oecd2 + .5, MN(17), { align: 'center', ls: 3, col: ivo(.75) });
    const mark = (v0, t0, col, lb) => { if (t <= t0) return; const v = countTo(300, v0, t, t0, 1.3), x = px(v), k = kq(t, t0, .3);
      ctx.globalAlpha = a0 * k; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, LY, 15, 0, 7); ctx.fill();
      setFont(ctx, DSP(150), 2); ctx.textAlign = 'center'; ctx.fillText(String(Math.round(v)), x, LY - 66); setFont(ctx, MN(17), 4); ctx.fillStyle = ivo(.8); ctx.fillText(lb, x, LY - 34);
      ctx.textAlign = 'left'; ctx.globalAlpha = a0; };
    mark(364, A.tigaratus2 - .1, LIME, 'INDONESIA'); mark(463, A.empat3 - .1, IVORY, 'AMERIKA');
    srcTag(ctx, 'Sumber: OECD, PISA 2025 Results (Volume I) · skor rata-rata matematika', -840, 440, t, A.tes + .4);
  }

  // ── S6: level 2 as a staircase ───────────────────────────────────────────────────────────────────────────────
  function drawS6(ctx, t) {
    txt(ctx, 'YANG LEBIH MENOHOK', -820, -410, t, A.yang2, MN(20), { ls: 6, col: ivo(.7) });
    fall(ctx, 'LEVEL 2', -826, -230, t, A.level, DSP(220), { ls: 4, stag: .05 });
    markLine(ctx, 'batas ', 'kemampuan dasar', ' versi OECD', -820, -128, t, A.batas - .2, A.dasar, SRF(44), { align: 'left' });
    const sx = i => -700 + (i - 1) * 220, top = i => 330 - i * 85, a0 = ctx.globalAlpha;
    for (let i = 1; i <= 6; i++) { const k = kq(t, A.level - .1 + i * .07, .55); if (k <= 0) continue; const hh = (340 - top(i)) * k, lit = i === 2 ? kq(t, A.dua, .3) : 0;
      ctx.fillStyle = ivo(.08 + i * .015); ctx.fillRect(sx(i), 340 - hh, 210, hh);
      if (lit > 0) { ctx.globalAlpha = a0 * lit; ctx.fillStyle = LIME; ctx.fillRect(sx(i), 340 - hh, 210, hh); ctx.globalAlpha = a0; }
      ctx.fillStyle = lit > .5 ? LIME_INK : IVORY; ctx.fillRect(sx(i), 340 - hh, 210, 4);
      setFont(ctx, MN(16), 3); ctx.fillStyle = lit > .5 ? LIME_INK : ivo(.6); ctx.fillText(`LEVEL ${i}`, sx(i) + 16, 340 - hh + 34); }
    slab(ctx, 'BATAS KEMAMPUAN DASAR', -250, 70, t, A.batas, { size: 19, lx: -375, ly: top(2) });
    if (t > A.kira2) {                                       // an everyday sum, illustration only
      const k = kq(t, A.kira2, .5); ctx.save(); ctx.translate(520, -330 + (1 - k) * 60); ctx.rotate(1.2 * D2R); ctx.globalAlpha = a0 * k;
      doc(ctx, 0, 0, 580, 180, { r: 12, blur: 30, sy: 12 }); setFont(ctx, MN(14), 3); ctx.fillStyle = 'rgba(17,18,14,.6)'; ctx.fillText('ILUSTRASI · SOAL SEHARI-HARI', -262, -50);
      setFont(ctx, DSP(54), 1); ctx.fillStyle = INK; ctx.fillText('Rp50.000, diskon 20 % →', -262, 14);
      if (t > A.sehari) { ctx.fillStyle = ACC_INK; ctx.fillText(t > A.sederhana ? 'Rp40.000 ✓' : '?', -262, 70); }
      ctx.restore(); ctx.globalAlpha = a0;
    }
    srcTag(ctx, 'Sumber: OECD, PISA 2025 · level 2 = batas kemampuan dasar matematika', -840, 440, t, A.level + .3);
  }

  // ── S9: IMD rank strip ───────────────────────────────────────────────────────────────────────────────────────
  function drawS9(ctx, t) {
    evid(ctx, IM.jg, -430, -255, 780, t, A.gambaran + .3, { tab: 'JAKARTA GLOBE · 24 JUN 2026', rot: -1.2, crop: [.12, 0, .51, .35], hl: [[.559, .437, .104, .17, A.delapan2]] });
    txt(ctx, 'DAYA SAING · IMD 2026', 450, -390, t, A.imd, MN(20), { align: 'center', ls: 5, col: ivo(.8) });
    txt(ctx, '#40', 300, -180, t, A.empatpuluh2, DSP(170), { align: 'center', col: ivo(.5) });
    if (t > A.ke) { const k = kq(t, A.ke, .4); ctx.fillStyle = ivo(.7); ctx.fillRect(400, -246, 90 * k, 4); if (k > .9) { ctx.beginPath(); ctx.moveTo(500, -244); ctx.lineTo(480, -258); ctx.lineTo(480, -230); ctx.fill(); } }
    fall(ctx, '#48', 610, -180, t, A.delapan2, DSP(170), { align: 'center', col: LIME, stag: .06 });
    txt(ctx, 'DARI 70 NEGARA', 450, -120, t, A.tujuhpuluh, MN(18), { align: 'center', ls: 4, col: ivo(.75) });
    const cx = r => -770 + (r - 1) * 22, Y0 = 150, a0 = ctx.globalAlpha;
    for (let r = 1; r <= 70; r++) { const k = kq(t, A.indonesia3 + r * .008, .35); if (k <= 0) continue; ctx.fillStyle = ivo(.16); ctx.fillRect(cx(r), Y0 + 120 * (1 - k), 16, 120 * k); }
    txt(ctx, '#1', cx(1), Y0 + 154, t, A.indonesia3, MN(16), { col: ivo(.6) }); txt(ctx, '#70', cx(70) + 16, Y0 + 154, t, A.tujuhpuluh, MN(16), { align: 'right', col: ivo(.6) });
    if (t > A.amerika4) { const k = pop(t, A.amerika4); ctx.fillStyle = IVORY; ctx.fillRect(cx(10), Y0 + 120 - 150 * Math.min(1.1, k), 16, 150 * Math.min(1.1, k)); }
    slab(ctx, 'AMERIKA · #10', cx(10) + 8, Y0 - 70, t, A.sepuluh - .2, { size: 18, align: 'center', lx: cx(10) + 8, ly: Y0 - 34 });
    if (t > A.empatpuluh2) {
      const r = t > A.delapan2 ? 40 + 8 * spring(t - A.delapan2, .6, .32) : 40, k = kq(t, A.empatpuluh2, .4);
      if (t > A.delapan2) { ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.strokeRect(cx(40) + 1, Y0 - 30, 14, 150); ctx.setLineDash([]); }
      ctx.fillStyle = LIME; ctx.fillRect(cx(r), Y0 + 120 - 150 * k, 16, 150 * k);
    }
    txt(ctx, '2025 · #40', cx(40) + 8, Y0 + 154, t, A.delapan2 + .4, MN(16), { align: 'center', col: ivo(.6) });
    slab(ctx, 'INDONESIA · #48', cx(48) + 8, Y0 - 70, t, A.delapan2 + .3, { size: 18, align: 'center', lime: true, lx: cx(48) + 8, ly: Y0 - 34 });
    srcTag(ctx, 'Sumber: IMD World Competitiveness Ranking 2026 via Jakarta Globe, 24 Jun 2026', -840, 440, t, A.peringkat);
  }

  // ── S11 + S12: papan skor, then the page turns ──────────────────────────────────────────────────────────────
  function drawS11(ctx, t) {
    const a0 = ctx.globalAlpha; doc(ctx, 0, -20, 1540, 660, { c0: '#1E1F1A', c1: '#121310', r: 18 });
    txt(ctx, 'PAPAN SKOR · BAB 03', -710, -290, t, A.karena, MN(20), { ls: 6, col: ivo(.7) });
    txt(ctx, 'KITA', 200, -290, t, A.karena + .1, MN(20), { align: 'center', ls: 6, col: LIME }); txt(ctx, 'AMERIKA', 560, -290, t, A.karena + .15, MN(20), { align: 'center', ls: 6, col: ivo(.85) });
    const R = [['BELANJA ONLINE', 'US$85 M', '/ SETAHUN', 'US$340 M', '/ 3 BULAN'], ['PISA MATEMATIKA', '364', 'SKOR', '463', 'SKOR'],
      ['SAMPAI LEVEL 2', '17', 'DARI 100 ANAK', '65', 'DARI 100 ANAK'], ['DAYA SAING IMD', '#48', 'DARI 70', '#10', 'DARI 70']];
    R.forEach((row, i) => { const y = -190 + i * 125; ctx.fillStyle = ivo(.1); ctx.fillRect(-720, y + 62, 1440 * kq(t, A.karena + i * .08, .6), 2);
      txt(ctx, row[0], -710, y + 14, t, A.karena + .2 + i * .08, MN(22), { ls: 3, col: ivo(.85) });
      [[200, row[1], row[2], LIME], [560, row[3], row[4], IVORY]].forEach(([x, v, sub, col], j) => { const s = t - A.papan - i * .12 - j * .06; if (s <= 0) return;
        const k = clamp(s / .22); ctx.save(); ctx.translate(x, y); ctx.scale(1, Math.abs(Math.cos((1 - k) * Math.PI / 2 * (k < 1 ? 1 : 0)))); ctx.globalAlpha = a0 * clamp(s / .05);
        setFont(ctx, DSP(66), 2); ctx.textAlign = 'center'; ctx.fillStyle = col; ctx.fillText(v, 0, 20); setFont(ctx, MN(13), 3); ctx.fillStyle = ivo(.55); ctx.fillText(sub, 0, 46);
        ctx.textAlign = 'left'; ctx.restore(); ctx.globalAlpha = a0; }); });
    const ks = kq(t, A.suram, .6), fl = t > A.suram && t < A.suram + .45 ? (rnd(Math.floor(t * 24)) < .5 ? .25 : 0) : 0;
    if (ks > 0) { ctx.fillStyle = `rgba(6,7,5,${.5 * ks + fl})`; ctx.beginPath(); ctx.roundRect(-770, -350, 1540, 660, 18); ctx.fill(); }
    srcTag(ctx, 'Rekap bab ini · sumber: e-Conomy SEA 2026, US Census Bureau, OECD PISA 2025, IMD 2026', -840, 440, t, A.papan);
  }
  function drawS12(ctx, t) {
    const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * gone(t, A.saatnya, .4);
    markLine(ctx, 'Ingat ', 'dokumen Amerika', ' di awal video?', 0, -400, t, A.tapi3 + .1, A.dokumen, SRF(54)); ctx.globalAlpha = a0;
    doc(ctx, 0, 30, 1100, 620, { c0: '#F2F0E6', c1: '#D9D5C5' });           // the next page, waiting under
    ctx.fillStyle = ACC_INK; ctx.fillRect(-480, -200, 120 * kq(t, A.buka + .5, .5), 8);
    typeOn(ctx, 'APA SEBENARNYA YANG DIKELUHKAN AMERIKA?', -480, -150, t, A.buka + .6, MN(26), { cps: 40, col: INK, ls: 2 });
    ctx.fillStyle = 'rgba(17,18,14,.14)'; for (let i = 0; i < 7; i++) ctx.fillRect(-480, -90 + i * 50, i === 6 ? 380 : 960 - (i % 3) * 90, 14);
    const p = E.inOutCubic(inv(A.buka, A.buka + 1.0, t)), th = p * Math.PI, cs = Math.cos(th);
    ctx.save(); ctx.translate(-550, 0); ctx.transform(cs, -.12 * Math.sin(th), 0, 1 + .05 * Math.sin(th), 0, 0); ctx.translate(550, 0);
    if (cs > 0) {
      doc(ctx, 0, 30, 1100, 620);
      evid(ctx, IM.bisnis, 0, -80, 980, t, A.tapi3 + .1, { crop: [0, .1, 1, .48], tab: 'BISNIS.COM · 21 APR 2025', rot: -1, hl: [[.04, .14, .335, .23, A.dokumen + .1], [.276, .73, .136, .12, A.amerika5 + .3]] });
      ctx.fillStyle = 'rgba(17,18,14,.13)'; for (let i = 0; i < 5; i++) ctx.fillRect(-480, 90 + i * 46, i === 4 ? 420 : 960 - (i % 2) * 120, 13);
      setFont(ctx, MN(16), 4); ctx.fillStyle = 'rgba(17,18,14,.5)'; ctx.fillText('HAL. 1', 440, 318);
      ctx.fillStyle = `rgba(0,0,0,${.35 * Math.sin(th)})`; ctx.fillRect(-550, -280, 1100, 620);
    } else { const g = ctx.createLinearGradient(-550, 0, 550, 0); g.addColorStop(0, '#CFCBBB'); g.addColorStop(1, '#ECE9DD'); ctx.fillStyle = g; ctx.fillRect(-550, -280, 1100, 620); }
    ctx.restore(); ctx.globalAlpha = a0;
    if (p > 0 && p < 1) { ctx.globalAlpha = a0 * .5 * Math.sin(th); ctx.fillStyle = '#000'; ctx.fillRect(-550, -280, 40, 620); ctx.globalAlpha = a0; }
    srcTag(ctx, 'Sumber: Bisnis.com, 21 Apr 2025 — keluhan AS soal QRIS dan GPN', -840, 440, t, A.dokumen);
  }

  // ── stations ─────────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, name: 'Pembuka · tanggal kembar', dist: [1700, 1480], draw(ctx, t) {
      txt(ctx, 'BAB 03', 0, -360, t, .3, MN(28), { align: 'center', ls: 10, col: ivo(.75) });
      const k = kq(t, .45, .6); ctx.fillStyle = LIME; ctx.fillRect(-70 * k, -334, 140 * k, 5);
      fall(ctx, 'DOMPET & KELAS', 0, -120, t, .6, DSP(230), { align: 'center', ls: 6, stag: .04 });
      markLine(ctx, 'Soal belanja online, kita kan ', 'jagoan', '?', 0, 0, t, A.belanja - .3, A.jagoan, SRF(58));
      popAt(ctx, -610, 250, t, A.tanggal, () => calCard(ctx, 'NOV', '11.11'), { rot: -6, rise: 90 });
      popAt(ctx, -370, 240, t, A.kembar, () => calCard(ctx, 'DES', '12.12'), { rot: 5, rise: 90 });
      txt(ctx, 'TANGGAL KEMBAR', -490, 410, t, A.kembar + .2, MN(18), { align: 'center', ls: 5, col: ivo(.7) });
      cart(ctx, 360, 220, t);
      txt(ctx, 'KERANJANG PENUH', 380, 410, t, A.penuh, MN(18), { align: 'center', ls: 5, col: ivo(.7) });
    }, layers: [{ dz: 1500, dx: 1450, dy: -60, fn: (ctx, t) => plate(ctx, V.kurir, t, 0, 0, 1100, 620, kq(t, A.kurir - .15, .7), { t0: A.kurir - .2, dim: .2, marks: false }) }] },

    { at: A.memang, name: 'e-Conomy SEA: US$119 M', via: 'whip', tag: 'US$119', draw(ctx, t) {
      evid(ctx, IM.kompas, -380, -240, 880, t, A.laporan - .1, { dark: true, tab: 'KOMPAS.COM · 11 NOV 2026', rot: -1.2, hl: [[.49, .17, .19, .13, A.seratus + .3], [.028, .30, .34, .13, A.ecommerce]] });
      if (t > A.seratus - .1) txt(ctx, `US$${Math.round(countTo(0, 119, t, A.seratus - .1, 1.3))}`, -826, 170, t, A.seratus - .1, DSP(300), { ls: 2 });
      txt(ctx, 'MILIAR · NILAI EKONOMI DIGITAL INDONESIA 2026', -818, 214, t, A.miliar, MN(19), { ls: 3, col: ivo(.75) });
      fall(ctx, '+16 %', 540, 110, t, A.enambelas, DSP(200), { align: 'center', ls: 4 });
      txt(ctx, 'TUMBUH DALAM SETAHUN', 540, 156, t, A.persen, MN(18), { align: 'center', ls: 4, col: ivo(.7) });
      const kb = kq(t, A.delapan - .4, .6), ke = kq(t, A.delapan, 1.0), W85 = 1640 * 85 / 119;
      if (kb > 0) { ctx.fillStyle = ivo(.16); ctx.fillRect(-820, 292, 1640 * kb, 38); ctx.fillStyle = LIME; ctx.fillRect(-820, 292, W85 * ke, 38); }
      txt(ctx, '≈71 %', -820 + W85 - 16, 320, t, A.delapan + .8, MN(18), { align: 'right', col: LIME_INK, rise: 6 });
      txt(ctx, 'E-COMMERCE · US$85 MILIAR', -820, 274, t, A.delapan + .3, MN(21), { ls: 3, col: LIME });
      txt(ctx, 'TOTAL US$119 MILIAR', 820, 274, t, A.delapan - .2, MN(21), { align: 'right', ls: 3, col: ivo(.75) });
      srcTag(ctx, 'Sumber: e-Conomy SEA 2026 (Google, Temasek, Bain) via Kompas.com, 11 Nov 2026', -840, 440, t, A.laporan + .4);
    }, layers: [{ dz: 1800, dx: 1650, dy: -80, fn: (ctx, t) => plate(ctx, V.nirsentuh, t, 0, 0, 1300, 740, kq(t, A.memang, .7), { dim: .6, marks: false }) }] },

    { at: A.sekarang, name: 'Kuartal AS ≈ 4× setahun kita', via: 'cut', lead: 0, draw: drawS2,
      layers: [{ dz: 1800, dx: -1700, dy: -60, fn: sideCard('gEcom', 'DATA · E-COMMERCE ID vs AS', A.sekarang + .3, -2) }] },
    { at: A.artinya, name: 'Kue kecil, klik dari luar', via: 'truck', tag: 'KUE', draw: drawS3 },
    { at: A.lalu, name: 'Sekolah', via: 'cut', lead: 0, draw(ctx, t) {
      plate(ctx, V.anak_sd, t, 0, -10, 1700, 920, kq(t, A.lalu - .1, .6), { t0: A.lalu - .2, dim: .28 + .22 * kq(t, A.sekolah, .4), grain: .3 });
      const kb = kq(t, A.lalu + .2, .5); ctx.fillStyle = `rgba(11,12,9,${.55 * kb})`; ctx.fillRect(-850, -372, 1700, 104);
      markLine(ctx, 'bagian yang paling pelan, tapi paling ', 'menentukan', '', 0, -300, t, A.lalu + .3, A.menentukan, SRF(54));
      fall(ctx, 'SEKOLAH.', 0, 210, t, A.sekolah - .05, DSP(300), { align: 'center', ls: 12, stag: .05 });
    } },
    { at: A.tes, name: 'PISA 364 vs 463', via: 'whip', tag: '364', draw: drawS5,
      layers: [{ dz: 1800, dx: 1700, dy: -60, fn: sideCard('gPisa', 'DATA · PISA 2025', A.tes + .3, 2) }] },
    { at: A.yang2, name: 'Level 2 = batas dasar', via: 'rise', tag: 'LEVEL 2', draw: drawS6 },
    { at: A.buat, name: '100 anak: 17 vs 65', via: 'push', tag: '17', draw(ctx, t) {
      markLine(ctx, 'dari ', '100 anak umur 15 tahun', ' di sekitar kita', 0, -360, t, A.seratus2 - .4, A.anak2, SRF(46));
      txt(ctx, 'INDONESIA', -420, -262, t, A.seratus2, MN(22), { align: 'center', ls: 6, col: ivo(.85) });
      txt(ctx, 'AMERIKA', 420, -262, t, A.seratus2 + .1, MN(22), { align: 'center', ls: 6, col: ivo(.85) });
      kids(ctx, -420, 30, 17, t, A.seratus2, A.tujuhbelas, LIME, .04);
      kids(ctx, 420, 30, 65, t, A.seratus2 + .15, A.enampuluh, IVORY, .016);
      txt(ctx, 'SAMPAI', 0, 18, t, A.batas2, MN(18), { align: 'center', ls: 5, col: ivo(.7) }); txt(ctx, 'LEVEL 2', 0, 48, t, A.batas2 + .1, MN(18), { align: 'center', ls: 5, col: ivo(.7) });
      if (t > A.tujuhbelas) txt(ctx, `${Math.round(countTo(0, 17, t, A.tujuhbelas, .7))} / 100`, -420, 372, t, A.tujuhbelas, DSP(104), { align: 'center', col: LIME, ls: 2 });
      if (t > A.enampuluh) txt(ctx, `${Math.round(countTo(0, 65, t, A.enampuluh, 1.0))} / 100`, 420, 372, t, A.enampuluh, DSP(104), { align: 'center', ls: 2 });
      srcTag(ctx, 'Sumber: OECD, PISA 2025 · siswa level 2 ke atas, matematika', -840, 440, t, A.cuma);
    }, layers: [{ dz: 1800, dx: -1700, dy: -60, fn: sideCard('gLv2', 'DATA · PISA 2025 · LEVEL 2', A.buat + .3, -2) }] },
    { at: A.ini, name: 'Bukan salah anaknya', via: 'push', lead: .45, dur: 1.1, draw(ctx, t) {
      plate(ctx, V.kelas_sma, t, 0, -40, 1560, 860, kq(t, A.ini - .3, .8), { t0: A.ini - .4, dim: .12 + .25 * kq(t, A.dan, .6), grain: .34, speed: .8 });
      const gb = ctx.createLinearGradient(0, 100, 0, 390); gb.addColorStop(0, 'rgba(11,12,9,0)'); gb.addColorStop(1, 'rgba(11,12,9,.85)'); ctx.fillStyle = gb; ctx.fillRect(-780, 100, 1560, 290);
      const a0 = ctx.globalAlpha, g1 = gone(t, A.dan - .25, .4);
      if (g1 > 0) { ctx.globalAlpha = a0 * g1;
        markLine(ctx, 'Ini ', 'bukan salah anaknya', '.', 0, 250, t, A.ini - .15, A.bukan + .2, SRF(76));
        [['GURU', A.guru, -260], ['BUKU', A.buku, 0], ['SEKOLAH', A.sekolah2, 260]].forEach(([w, t0, x]) => slab(ctx, w, x, 340, t, t0, { size: 22, align: 'center', ls: 6 }));
        ctx.globalAlpha = a0; }
      fall(ctx, 'PROGRAMMER', -470, 290, t, A.programmer, DSP(124), { align: 'center', ls: 4 });
      fall(ctx, 'INSINYUR', 20, 290, t, A.insinyur, DSP(124), { align: 'center', ls: 4 });
      fall(ctx, 'PENELITI', 480, 290, t, A.peneliti, DSP(124), { align: 'center', ls: 4 });
      txt(ctx, '15 TAHUN LAGI · 2041', 0, 352, t, A.lima2, MN(22), { align: 'center', ls: 7, col: ivo(.85) });
    } },
    { at: A.gambaran, name: 'IMD 2026: 40 → 48', via: 'cut', lead: 0, draw: drawS9 },
    { at: A.coba, name: 'Tiga pintu', via: 'rise', draw(ctx, t) {
      txt(ctx, 'COBA JAWAB JUJUR, DI KEPALA', 0, -425, t, A.coba, MN(22), { align: 'center', ls: 6, col: ivo(.75) });
      markLine(ctx, 'Kalau kamu pegang ', 'satu anggaran', ', taruh duluan di mana?', 0, -345, t, A.kalau - .2, A.anggaran, SRF(46));
      door(ctx, -540, t, A.lab, 'flask', 'LAB', 1); door(ctx, 0, t, A.kabel, 'plug', 'KABEL', 2); door(ctx, 540, t, A.ruang, 'board', 'RUANG KELAS', 3);
      typeOn(ctx, 'SIMPAN JAWABANMU.', 0, 420, t, A.simpan, MN(20), { align: 'center', ls: 6, cps: 30, col: ivo(.8) });
    } },
    { at: A.karena, name: 'Papan skor suram', via: 'whip', tag: 'SKOR', draw: drawS11 },
    { at: A.tapi3, name: 'Buka halamannya', via: 'cut', lead: 0, dist: [1500, 900], draw: drawS12 },
  ];

  // ── gates + chapter ──────────────────────────────────────────────────────────────────────────────────────────
  for (const s of ST) {                                    // nothing of a station shows before it is reached (ghost tags aside)
    const at = s.at, wrap = fn => fn && ((ctx, t, c) => { if (s === ST[0]) return fn(ctx, t, c); const g = s.via === 'cut' ? (t >= at - .04 ? 1 : 0) : clamp((t - at + .5) / .35); if (g <= 0) return; ctx.globalAlpha = g; fn(ctx, t, c); });
    s.draw = wrap(s.draw); for (const L of s.layers || []) L.fn = wrap(L.fn);
  }
  const over = (o, t) => ST.forEach((s, i) => { if (!s.over) return; const nx = ST[i + 1]; if (t > s.at - .5 && (!nx || t < nx.at + .3)) { o.save(); s.over(o, t); o.restore(); } });
  let FULLS;                                                 // full-frame tilted articles (kit evidFull)
  return makeChapter({ B, ST, load, label: 'BAB 03 · DOMPET & KELAS', over,
    full: () => FULLS ??= [{ im: IM.kompas, t0: A.seratus - 1.8, t1: A.seratus + 2.2, dir: -1, dark: true, tab: 'KOMPAS.COM · 11 NOV 2026', hl: [[.527, .17, .205, .13, A.seratus + .3]] },
    { im: IM.jg, t0: A.delapan2 - 2.2, t1: A.delapan2 + 1.9, dir: 1, crop: [.12, 0, .51, .35], tab: 'JAKARTA GLOBE · 24 JUN 2026', hl: [[.559, .437, .104, .17, A.delapan2]] }] });
}
