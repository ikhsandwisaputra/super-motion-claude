// Puncak · Tempat Skornya Kebalik (VO ivs_vo_ahmad_07, 110 s). Opens on the bab-peta split-flap scoreboard (the US leads three rows,
// row 04 still "?"); on "kita justru di depan" the whole board turns 180° in 3D and its back face holds the one row Indonesia leads:
// payments. Then the row: 595 vs MY+TH, QRIS stickers collapsing into one code, the warung, USTR evidence, GPN route that never
// leaves the border, the trade deal, the silence before ATURAN MAIN, the 1 vs 140 callback, the revision and the caveat.
import B from './beats.js';
import { clamp, inv, lerp, E, spring, ROOM, IVORY, LIME, LIME_INK, TILE, GREY, DISP, SER, MONO, D2R, ivo, setFont, rnd, mk,
  timing, onPlane, makeChapter, loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, gone } from './kit.js';
import { kq, pop, popAt, doc, mini, chip, coin, stamp } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const INK = '#11120E';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const V = {}, IM = {}, QR = {}, STK = [];

  // ── art: a generic QR glyph (finder squares + seeded modules, no brand) and the counter stickers ────────────────────
  function qrArt(seed) {
    const N = 25, M = 16, [c, g] = mk((N + 4) * M, (N + 4) * M); g.fillStyle = '#F4F2EA'; g.fillRect(0, 0, c.width, c.height); g.fillStyle = INK;
    const corner = (x, y, s) => (x < s && y < s) || (x >= N - s && y < s) || (x < s && y >= N - s);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      let on;
      if (corner(x, y, 7)) { const lx = x < 7 ? x : x - (N - 7), ly = y < 7 ? y : y - (N - 7), d = Math.max(Math.abs(lx - 3), Math.abs(ly - 3)); on = d !== 2; }
      else if (corner(x, y, 8)) on = false;
      else on = rnd(seed * 131 + y * N + x) > .52;
      if (on) g.fillRect((x + 2) * M, (y + 2) * M, M, M);
    }
    return c;
  }
  function stickerArt(label, head, ink, seed) {
    const [c, g] = mk(300, 400); g.save(); g.beginPath(); g.roundRect(0, 0, 300, 400, 18); g.clip();
    g.fillStyle = '#F4F2EA'; g.fillRect(0, 0, 300, 400); g.fillStyle = head; g.fillRect(0, 0, 300, 74); g.restore();
    g.fillStyle = ink; setFont(g, MN(26), 4); g.textAlign = 'center'; g.fillText(label, 150, 48);
    g.drawImage(qrArt(seed), 30, 94, 240, 240); g.fillStyle = 'rgba(17,18,14,.3)'; g.fillRect(80, 356, 140, 8);
    g.strokeStyle = 'rgba(0,0,0,.28)'; g.lineWidth = 3; g.beginPath(); g.roundRect(1.5, 1.5, 297, 397, 17); g.stroke();
    return c;
  }

  async function load() {
    const vb = '../assets/shared/vid/';
    for (const [k, n] of [['hp', 'hp_qr'], ['tap', 'nirsentuh'], ['sat', 'satelit'], ['lab', 'lab']]) V[k] = await loadVid(vb, n);
    const kb = '../assets/shared/kutipan/';
    for (const [k, f] of [['bisnis', 'ekonomi-daftar-keluhan-as-ke-bank-indonesia-dan.png'], ['jp', 'thejakartapost-the-jakarta-post-2.png']]) IM[k] = await loadImg(kb + f, 1600);
    QR.big = qrArt(7); QR.deal = qrArt(11);
    const H6 = [['#3A3B34', IVORY], ['#B9B6A6', INK], ['#55564F', IVORY], ['#8A8B82', INK], ['#24251F', IVORY], ['#D8D5C6', INK]];
    'ABCDEF'.split('').forEach((L, i) => STK.push(stickerArt('APLIKASI ' + L, H6[i][0], H6[i][1], 20 + i)));
    QR.qris = stickerArt('QRIS', LIME, LIME_INK, 3);
  }

  // ── small vector helpers ─────────────────────────────────────────────────────────────────────────────────────
  function strike(ctx, x0, x1, y, t, t0, w = 7) {           // ivory strike-through that snaps across
    const k = E.snap(inv(t0, t0 + .25, t)); if (k <= 0) return; ctx.fillStyle = IVORY; ctx.fillRect(x0, y - w / 2, (x1 - x0) * k, w);
  }
  function arrow(ctx, x0, y0, x1, y1, k, col = ivo(.8)) {
    if (k <= 0) return; const x = lerp(x0, x1, k), y = lerp(y0, y1, k), a = Math.atan2(y1 - y0, x1 - x0);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 6, y + Math.sin(a) * 6); ctx.lineTo(x - Math.cos(a - .5) * 22, y - Math.sin(a - .5) * 22); ctx.lineTo(x - Math.cos(a + .5) * 22, y - Math.sin(a + .5) * 22); ctx.fill();
  }
  const dimRect = (ctx, x, y, w, h, a) => { if (a <= 0) return; ctx.fillStyle = `rgba(11,12,9,${a})`; ctx.fillRect(x, y, w, h); };

  // ── S0: the split-flap scoreboard (bab-peta) that turns 180° ─────────────────────────────────────────────────
  const ROWS = [['01', 'RISET & PATEN'], ['02', 'INTERNET & AI'], ['03', 'EKONOMI DIGITAL & SEKOLAH'], ['04', 'SATU BIDANG']];
  const rowT = i => .45 + i * .4, RY = i => -330 + i * 172, TX = [300, 388, 520, 608];
  function chev(ctx, x, y, s, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - s, y + s * .5); ctx.lineTo(x, y - s * .6); ctx.lineTo(x + s, y + s * .5); ctx.closePath(); ctx.fill(); }
  function tile(ctx, x, y, mode, ch, flap) {               // mode: lead (ivory ▲) · trail (dash) · lime (▲) · q · shuf
    const fill = mode === 'lead' ? '#E9E6DA' : mode === 'lime' ? LIME : TILE;
    ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x, y, 84, 116, 10); ctx.fill(); ctx.strokeStyle = ivo(.12); ctx.lineWidth = 2; ctx.stroke();
    if (mode === 'lead' || mode === 'lime') chev(ctx, x + 42, y + 58, 22, mode === 'lime' ? LIME_INK : INK);
    else if (mode === 'trail') { ctx.fillStyle = ivo(.35); ctx.fillRect(x + 26, y + 56, 32, 6); }
    else if (ch) { setFont(ctx, DSP(96)); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(ch, x + 42, y + 96); ctx.textAlign = 'left'; }
    if (flap > 0) { ctx.fillStyle = mode === 'lime' ? '#A9CF2E' : '#24251F'; ctx.fillRect(x, y + 58 - 58 * flap, 84, 58 * flap); }
    ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(x, y + 57, 84, 3);
  }
  function rowFrame(ctx, i, y, no, name, band) {
    ctx.fillStyle = ivo(band); ctx.fillRect(-760, y - 14, 1520, 144);
    setFont(ctx, `400 30px "${MONO}"`, 2); ctx.fillStyle = ivo(.55); ctx.fillText(no, -740, y + 74);
    setFont(ctx, DSP(92), 1); ctx.fillStyle = IVORY; ctx.fillText(name, -650, y + 92);
    setFont(ctx, DSP(70)); ctx.fillStyle = ivo(.4); ctx.fillText(':', 488, y + 86);
  }
  function boardFace(ctx, t, back) {
    const kIn = kq(t, .1, .6); if (kIn <= 0) return; ctx.globalAlpha = kIn;
    ctx.fillStyle = '#121310'; ctx.beginPath(); ctx.roundRect(-830, -480, 1660, 900, 22); ctx.fill(); ctx.strokeStyle = ivo(.16); ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = ivo(.22); for (const [x, y] of [[-800, -450], [800, -450], [-800, 390], [800, 390]]) { ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); }
    setFont(ctx, MN(30), 6); ctx.fillStyle = ivo(.7); ctx.textAlign = 'left'; ctx.fillText(back ? 'PAPAN SKOR · DIBALIK' : 'PAPAN SKOR', -760, -400);
    ctx.textAlign = 'center'; ctx.fillText('IDN', 384, -400); ctx.fillText('USA', 604, -400); ctx.textAlign = 'left';
    ctx.fillStyle = ivo(.2); ctx.fillRect(-760, -378, 1520 * kq(t, .25, .8), 2);
    if (!back) {
      ROWS.forEach(([no, name], i) => {
        const t0 = rowT(i), k = kq(t, t0 - .1, .55); if (k <= 0) return; const y = RY(i);
        ctx.save(); ctx.translate((1 - k) * 1700, 0); ctx.globalAlpha = kIn * k;
        rowFrame(ctx, i, y, no, name.slice(0, Math.round(name.length * E.outCubic(inv(t0, t0 + .45, t)))), i === 3 ? .035 + .06 * kq(t, A.bidang - .1, .3) : .035);
        for (let j = 0; j < 4; j++) {
          const ts = t - t0 - .15 - j * .05, shuf = ts > 0 && ts < .6, idn = j < 2;
          const mode = shuf || ts <= 0 ? 'shuf' : i === 3 ? 'q' : idn ? 'trail' : 'lead';
          tile(ctx, TX[j], y, mode, shuf ? String(Math.floor(rnd(Math.floor(t * 20) + j * 7 + i * 31) * 10)) : i === 3 ? '?' : '', shuf ? (t * 20 % 1) : 0);
        }
        ctx.restore();
      });
      return;
    }
    const mv = E.inOutCubic(inv(A.depan + .25, A.cara - .05, t));     // back face: the payments row rises to the middle
    ctx.globalAlpha = kIn * .2 * (1 - mv);
    for (let i = 0; i < 3; i++) { rowFrame(ctx, i, RY(i), ROWS[i][0], ROWS[i][1], .02); for (let j = 0; j < 4; j++) tile(ctx, TX[j], RY(i), j < 2 ? 'trail' : 'lead', '', 0); }
    ctx.globalAlpha = kIn; const y = lerp(RY(3), -150, mv), sc = lerp(1, 1.12, mv);
    ctx.save(); ctx.translate(0, y + 58); ctx.scale(sc, sc); ctx.translate(0, -58);
    rowFrame(ctx, 3, 0, '04', 'PEMBAYARAN DIGITAL', .06);
    for (let j = 0; j < 4; j++) {
      const ts = t - A.depan - .02 - j * .06, shuf = ts > 0 && ts < .45, idn = j < 2;
      tile(ctx, TX[j], 0, ts <= 0 ? 'q' : shuf ? 'shuf' : idn ? 'lime' : 'trail', ts <= 0 ? '?' : String(Math.floor(rnd(Math.floor(t * 20) + j * 5) * 10)), shuf ? (t * 20 % 1) : 0);
    }
    ctx.restore();
    markLine(ctx, 'Cara kita ', 'membayar.', '', 0, 200, t, A.cara - .1, A.membayar - .2, SRF(84), { ls: 0 });
  }
  const flipK = t => E.snap(inv(A.justru - .12, A.depan + .02, t));
  const S0 = { at: 0, name: 'Papan skor dibalik', dist: [1800, 1700],
    world(ctx, t, pr, foc, items) {
      const k = flipK(t), ant = E.outCubic(inv(A.bidang, A.justru - .12, t)) * (1 - k), u = inv(A.depan + .02, A.depan + .5, t);
      const ry = -11 * ant + 180 * k + 7 * Math.sin(Math.PI * u) * (1 - u), cs = Math.cos(ry * D2R);
      items.push({ z: S0.z, x: S0.x, f: () => onPlane(ctx, pr, S0.x, S0.py, S0.z, foc, () => {
        if (cs < 0) ctx.scale(-1, 1);
        boardFace(ctx, t, cs < 0);
        const sh = (1 - Math.abs(cs)) * .7; if (sh > .01) { ctx.globalAlpha = 1; ctx.fillStyle = `rgba(0,0,0,${sh})`; ctx.beginPath(); ctx.roundRect(-830, -480, 1660, 900, 22); ctx.fill(); }
        const gl = Math.sin(Math.PI * k) * .5; if (gl > .02) { ctx.globalAlpha = gl; ctx.fillStyle = IVORY; ctx.fillRect(cs < 0 ? -832 : 826, -480, 6, 900); }
      }, ry) });
    },
    mod(c, t) { const k = flipK(t), a = Math.sin(Math.PI * k); c.roll += 6 * a; c.dist += 320 * a; c.yaw += 4 * a;
      c.dist -= 330 * E.inOutCubic(inv(A.depan + .25, A.cara + .3, t)); c.foc = c.dist; } };

  // ── stations ─────────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    S0,

    { at: A.laporan, name: '595 vs MY+TH', via: 'whip', tag: '595', draw(ctx, t) {
      typeOn(ctx, 'E-CONOMY SEA 2026 · PEMBAYARAN DIGITAL', -820, -430, t, A.econ, MN(24), { ls: 4, cps: 40, col: ivo(.8) });
      txt(ctx, 'Pasar pembayaran digital', -820, -320, t, A.menempatkan, SRF(66));
      markLine(ctx, '', 'paling besar', ' se-Asia Tenggara.', -820, -235, t, A.pasar, A.terbesar, SRF(66), { align: 'left', ls: 0 });
      const ki = E.outCubic(inv(A.nilai, A.miliar, t)), U = .95, BASE = 380;
      if (t > A.nilai) { setFont(ctx, DSP(170), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('US$' + Math.round(595 * ki), -820, 60);
        txt(ctx, 'MILIAR · NILAI TRANSAKSI 2026', -816, 112, t, A.miliar, MN(22), { ls: 4, col: ivo(.75) }); }
      txt(ctx, 'lebih besar dari Malaysia + Thailand digabung.', -820, 200, t, A.lebih, SRF(44), { col: ivo(.9) });
      txt(ctx, 'Salah satu bintangnya:', -820, 330, t, A.salah, SRF(58));
      // axis + bars
      const ka = kq(t, A.econ, .8); ctx.fillStyle = ivo(.5); ctx.fillRect(20, BASE, 760 * ka, 3);
      for (let v = 100; v <= 600; v += 100) { ctx.fillStyle = ivo(.1 * ka); ctx.fillRect(20, BASE - v * U, 760, 1.5); setFont(ctx, MN(16, 400)); ctx.fillStyle = ivo(.4 * ka); ctx.fillText(String(v), 790, BASE - v * U + 6); }
      const hI = 595 * U * ki; if (hI > 0) { ctx.fillStyle = LIME; ctx.fillRect(70, BASE - hI, 260, hI);
        setFont(ctx, DSP(84), 1); ctx.fillStyle = LIME; ctx.textAlign = 'center'; ctx.fillText(String(Math.round(595 * ki)), 200, BASE - hI - 20); ctx.textAlign = 'left'; }
      txt(ctx, 'INDONESIA', 200, 430, t, A.indonesia, MN(22), { align: 'center', ls: 4 });
      const seg = (v, base, t0, col, ink, lab) => { const k = spring(Math.max(0, t - t0), .62, .3); if (t <= t0) return;
        const y = BASE - base * U - v * U - (1 - Math.min(1, k)) * 420; ctx.globalAlpha = clamp((t - t0) / .1); ctx.fillStyle = col; ctx.fillRect(440, y, 260, v * U);
        ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(440, y + v * U - 3, 260, 3); setFont(ctx, MN(24), 3); ctx.fillStyle = ink; ctx.fillText(lab, 462, y + 42); ctx.globalAlpha = 1; };
      seg(261, 0, A.malaysia - .05, '#D8D5C6', INK, 'MY · 261'); seg(215, 261, A.thailand - .05, GREY, INK, 'TH · 215');
      txt(ctx, 'MALAYSIA + THAILAND', 570, 430, t, A.malaysia, MN(22), { align: 'center', ls: 2 });
      const kg = kq(t, A.digabung, .5);
      if (kg > 0) { setFont(ctx, DSP(84), 1); ctx.globalAlpha = kg; ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText('476', 570, BASE - 476 * U - 20); ctx.textAlign = 'left';
        ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(330, BASE - 595 * U); ctx.lineTo(330 + 400 * kg, BASE - 595 * U); ctx.stroke(); ctx.setLineDash([]);
        const kb = kq(t, A.digabung + .3, .4); if (kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(722, BASE - 595 * U, 4, 119 * U * kb); txt(ctx, '+119', 740, BASE - 535 * U, t, A.digabung + .4, MN(26), { col: LIME }); }
        ctx.globalAlpha = 1; }
      srcTag(ctx, 'Sumber: e-Conomy SEA 2026 via Databoks, 13 Nov 2026 · miliar US$ (GTV) · selisih: hitungan sendiri', -840, 470, t, A.econ + .3);
    } },

    { at: A.qris, name: 'QRIS', via: 'cut', lead: .04, draw(ctx, t) {
      popAt(ctx, -360, -10, t, A.qris - .02, () => { ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.drawImage(QR.big, -260, -260, 520, 520); ctx.shadowColor = 'transparent'; }, { from: 1.5, z: .6, T: .3 });
      fall(ctx, 'QRIS', 60, 150, t, A.qris, DSP(440), { stag: .035, drop: -140 });
    } },

    { at: A.ingat, name: 'Kasir: stiker per aplikasi → satu', via: 'truck', tag: 'QR', draw(ctx, t) {
      ctx.globalAlpha *= 1; const a0 = ctx.globalAlpha;
      ctx.globalAlpha = a0 * gone(t, A.qris2, .4); txt(ctx, 'Ingat zaman kasir ditempeli', -820, -420, t, A.ingat, SRF(62));
      txt(ctx, 'banyak stiker QR?', -820, -345, t, A.banyak - .2, SRF(62)); ctx.globalAlpha = a0;
      markLine(ctx, 'Satu kode, ', 'aplikasi apa pun.', '', -820, -400, t, A.satu2, A.aplikasi2, SRF(62), { align: 'left', ls: 0 });
      const kc = gone(t, A.satu2, .5);                    // the counter
      if (kc > 0) { ctx.globalAlpha = a0 * kc * kq(t, A.ingat - .2, .6); ctx.fillStyle = '#1A1B16'; ctx.fillRect(-780, 200, 1560, 260); ctx.fillStyle = ivo(.45); ctx.fillRect(-780, 198, 1560, 4);
        ctx.fillStyle = ivo(.06); for (let i = 0; i < 9; i++) ctx.fillRect(-780 + i * 195, 214, 2, 230);
        setFont(ctx, MN(22), 8); ctx.fillStyle = ivo(.5); ctx.fillText('KASIR', -740, 250); ctx.globalAlpha = a0; }
      const P = [[-610, -30, -6], [-365, -80, 4], [-120, -20, -3], [125, -90, 5], [370, -10, -4], [615, -75, 3]];
      const m = E.inOutCubic(inv(A.menyatukan - .2, A.menyatukan + .28, t)), shake = t > A.qris2 && t < A.menyatukan - .2 ? 1 : 0;
      P.forEach(([x, y, r], i) => { const t0 = A.banyak + i * .24; if (t <= t0 || m >= 1) return;
        const jx = shake * Math.sin(t * 70 + i * 2) * 5, px = lerp(x, 0, m) + jx, py = lerp(y, -40, m), rr = lerp(r, 0, m);
        popAt(ctx, px, py, t, t0, () => { ctx.globalAlpha *= 1 - E.inCubic(inv(.6, 1, m)); ctx.rotate(rr * D2R); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10;
          ctx.drawImage(STK[i], -115, -153, 230, 306); ctx.shadowColor = 'transparent'; }, { from: .5, rise: 50 }); });
      { const a1 = ctx.globalAlpha; ctx.globalAlpha = a1 * gone(t, A.satu2 - .1, .35); slab(ctx, 'SATU STIKER = SATU APLIKASI', 0, 330, t, A.tiap, { align: 'center', size: 30 }); ctx.globalAlpha = a1; }
      const sx = lerp(0, -470, E.snap(inv(A.satu2 - .1, A.satu2 + .45, t)));          // the one code, then its fan-out
      popAt(ctx, sx, -10, t, A.menyatukan + .28, () => { ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.drawImage(QR.qris, -165, -220, 330, 440); ctx.shadowColor = 'transparent'; }, { from: .4, z: .5 });
      const L = [['BANK', -230, A.bank], ['DOMPET DIGITAL', 0, A.dompet], ['APLIKASI BERIZIN LAIN', 230, A.berizin]];
      L.forEach(([s, y, t0], i) => { arrow(ctx, -270, -10 + (y / 230) * 60, 150, y, kq(t, A.aplikasi2 + i * .15, .45)); slab(ctx, s, 180, y, t, t0, { size: 30 }); });
      txt(ctx, 'terserah kamu.', 180, 400, t, A.terserah, SRF(58));
      srcTag(ctx, 'Sumber: Bank Indonesia — standar QRIS', -840, 470, t, A.satu2 + .3);
    } },

    { at: A.bagi, name: 'Pedagang kecil', via: 'whip', tag: 'WARUNG', draw(ctx, t) {
      const ka = kq(t, A.bagi - .2, .6);                  // warung awning (line art, scalloped)
      if (ka > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-800, -520, 1600, 150 * ka + 10); ctx.clip();
        for (let i = 0; i < 16; i++) { const x = -800 + i * 100; ctx.fillStyle = i % 2 ? '#55564F' : ivo(.85); ctx.beginPath(); ctx.moveTo(x, -520); ctx.lineTo(x + 100, -520); ctx.lineTo(x + 100, -420);
          ctx.arc(x + 50, -420, 50, 0, Math.PI); ctx.closePath(); ctx.fill(); }
        ctx.restore(); }
      plate(ctx, V.hp, t, -400, 70, 740, 560, kq(t, A.bagi - .1, .7), { t0: A.bagi - .2, dim: .1, grain: .3 });
      txt(ctx, 'Bagi pedagang kecil,', 80, -260, t, A.pedagang - .1, SRF(62));
      markLine(ctx, 'ini ', 'sederhana.', '', 80, -180, t, A.sederhana - .3, A.sederhana + .1, SRF(62), { align: 'left', ls: 0 });
      const row = (y, s, t0, ok) => { const k = kq(t, t0, .4); if (k <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * k;
        if (ok) { ctx.fillStyle = LIME; ctx.fillRect(80, y - 34, 44, 44); ctx.strokeStyle = LIME_INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(90, y - 12); ctx.lineTo(100, y - 2); ctx.lineTo(116, y - 24); ctx.stroke(); }
        else { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.strokeRect(82, y - 32, 40, 40); }
        setFont(ctx, MN(34), 2); ctx.fillStyle = IVORY; ctx.fillText(s, 150, y); ctx.globalAlpha = a0; return ctx.measureText(s).width; };
      row(-40, 'CUKUP SATU STIKER', A.cukup, true);
      const w1 = row(80, 'MESIN KARTU', A.tidak0, false), w2 = row(200, 'KEMBALIAN RECEH', A.repot - .2, false);
      if (w1) { strike(ctx, 140, 160 + w1, 68, t, A.mesin + .1, 6); slab(ctx, 'TIDAK WAJIB', 190 + w1, 66, t, A.mesin + .3, { size: 20 }); }
      if (w2) strike(ctx, 140, 160 + w2, 188, t, A.kembalian + .1, 6);
      for (let i = 0; i < 3; i++) { const s = t - A.receh - i * .08; if (s <= 0 || t < A.repot) continue; const a0 = ctx.globalAlpha;
        ctx.globalAlpha = a0 * gone(t, A.receh + .35 + i * .08, .4) * clamp((t - A.repot) / .2); coin(ctx, 640 + i * 46, 330 + s * s * 900 - i * 14, 44, 10); ctx.globalAlpha = a0; }
      if (t > A.repot && t < A.receh) { for (let i = 0; i < 3; i++) { const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * clamp((t - A.repot) / .2); coin(ctx, 640 + i * 46, 330 - i * 14, 44, 10); ctx.globalAlpha = a0; } }
      srcTag(ctx, 'Rekaman ilustrasi · Pexels', -770, 385, t, A.bagi + .4);
    }, layers: [
      { dz: 1500, dx: 1500, dy: 40, fn: (ctx, t) => plate(ctx, V.tap, t, 0, 0, 1100, 620, kq(t, A.bagi, .8), { t0: A.bagi, dim: .45, marks: false }) }] },

    { at: A.nah, name: 'USTR: QRIS + GPN', via: 'cut', lead: .04, draw(ctx, t) {
      typeOn(ctx, 'LAPORAN HAMBATAN DAGANG AS · NTE 2025', -820, -440, t, A.laporan2, MN(26), { ls: 4, cps: 42 });
      txt(ctx, 'TERBIT AKHIR MARET 2025', 820, -440, t, A.terbit, MN(22), { align: 'right', ls: 3, col: ivo(.7) });
      evid(ctx, IM.bisnis, -300, -80, 1000, t, A.laporan2, { tab: 'BISNIS.COM · 21 APR 2025', rot: -1.5, hl: [[.268, .45, .15, .062, A.qris3 - .1]] });
      evid(ctx, IM.jp, 400, 215, 880, t, A.amerika, { crop: [0, .08, 1, .52], tab: 'THE JAKARTA POST · 2 JUN 2025', rot: 2, hl: [[.197, .342, .515, .158, A.gpn]] });
      slab(ctx, 'QRIS + GPN = "HAMBATAN DAGANG"', -820, 400, t, A.memasukkan, { size: 24 });
      srcTag(ctx, 'Sumber: USTR NTE 2025 via Bisnis.com, 21 Apr 2025; The Jakarta Post, 2 Jun 2025', -840, 470, t, A.laporan2 + .4);
    } },

    { at: A.gpn2, name: 'GPN: rute dalam negeri', via: 'truck', tag: 'GPN', draw: drawGPN },

    { at: A.urusan, name: 'Kesepakatan dagang 2026', via: 'whip', tag: '2026', draw(ctx, t) {
      typeOn(ctx, 'KESEPAKATAN DAGANG · INDONESIA – AMERIKA SERIKAT', -820, -440, t, A.urusan, MN(26), { ls: 3, cps: 44 });
      popAt(ctx, 0, 40, t, A.pembayaran2 - .2, () => {
        ctx.fillStyle = '#B9B4A0'; ctx.beginPath(); ctx.roundRect(-520, -330, 300, 80, 14); ctx.fill(); ctx.beginPath(); ctx.roundRect(-520, -290, 1040, 640, 16); ctx.fill();
        doc(ctx, 0, 30, 1000, 600, { r: 10 });
        setFont(ctx, MN(20), 6); ctx.fillStyle = 'rgba(17,18,14,.6)'; ctx.fillText('PERJANJIAN · SALINAN KERJA', -460, -220); ctx.fillRect(-460, -200, 920, 2);
        setFont(ctx, DSP(72), 2); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('INDONESIA', -270, -100); ctx.fillText('AMERIKA SERIKAT', 270, -100); ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(17,18,14,.18)'; for (let i = 0; i < 5; i++) { ctx.fillRect(-460, -40 + i * 40, 300 - (i % 2) * 60, 10); ctx.fillRect(160, -40 + i * 40, 300 - ((i + 1) % 2) * 60, 10); }
        ctx.fillRect(-1, -150, 2, 440);
      }, { from: .8, rise: 80 });
      popAt(ctx, 0, 110, t, A.tersentuh - .1, () => { ctx.fillStyle = LIME; ctx.fillRect(-128, -128, 256, 256); ctx.drawImage(QR.deal, -112, -112, 224, 224); }, { from: .3, z: .5 });
      txt(ctx, 'SISTEM PEMBAYARAN', 0, 290, t, A.tersentuh + .3, MN(24), { align: 'center', ls: 5, col: INK });
      stamp(ctx, '2026', 470, 300, t, A.y2026, { size: 110, rot: -8 });
      srcTag(ctx, 'Sumber: kesepakatan dagang RI–AS (ART), 2026 — riset tim', -840, 470, t, A.pembayaran2 + .4);
    } },

    { at: A.sekarang, name: 'Bukan chip, bukan satelit', via: 'push', draw(ctx, t) {
      txt(ctx, 'Sekarang perhatikan:', 0, -390, t, A.sekarang, SRF(70), { align: 'center' });
      txt(ctx, 'APA YANG SEBENARNYA KITA CIPTAKAN?', 0, -300, t, A.ciptakan - .3, MN(30), { align: 'center', ls: 4 });
      const a0 = ctx.globalAlpha, dimC = 1 - .55 * kq(t, A.chip + .35, .3), dimS = 1 - .55 * kq(t, A.satelit + .35, .3);
      ctx.globalAlpha = a0 * dimC; popAt(ctx, -400, 20, t, A.bukan, () => chip(ctx, 230), { rise: 60, rot: -4 });
      txt(ctx, 'BUKAN CHIP.', -400, 290, t, A.bukan, MN(30), { align: 'center', ls: 5 }); ctx.globalAlpha = a0;
      strike(ctx, -620, -180, 20, t, A.chip + .35, 9);
      ctx.globalAlpha = a0 * dimS; plate(ctx, V.sat, t, 400, 20, 560, 360, kq(t, A.bukan2 - .1, .5), { t0: A.bukan2 - .1, dim: .1 });
      txt(ctx, 'BUKAN SATELIT.', 400, 290, t, A.bukan2, MN(30), { align: 'center', ls: 5 }); ctx.globalAlpha = a0;
      strike(ctx, 110, 690, 20, t, A.satelit + .35, 9);
      txt(ctx, 'Yang kita ciptakan…', 0, 420, t, A.yang, SRF(64), { align: 'center' });
    } },

    { at: A.aturan, name: 'ATURAN MAIN', via: 'cut', lead: .04, draw(ctx, t) {
      const m = E.inOutCubic(inv(A.satu3 - .15, A.satu3 + .45, t));
      ctx.save(); ctx.translate(0, -270 * m); ctx.scale(1 - .44 * m, 1 - .44 * m);
      popAt(ctx, 0, -20, t, A.aturan - .03, () => { setFont(ctx, DSP(420), 8); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('ATURAN', 0, 150); ctx.textAlign = 'left'; }, { from: 1.7, z: .55, T: .26 });
      popAt(ctx, 0, 330, t, A.main - .03, () => { setFont(ctx, DSP(420), 8); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('MAIN.', 0, 150); ctx.textAlign = 'left'; }, { from: 1.7, z: .55, T: .26 });
      const kb = E.snap(inv(A.main + .15, A.main + .5, t)); if (kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(-420 * kb, 515, 840 * kb, 16); }
      ctx.restore();
      txt(ctx, 'SATU STANDAR · DIPAKAI SEMUA ORANG', 0, 80, t, A.standar - .1, MN(34), { align: 'center', ls: 5 });
      if (t > A.dipakai - .2) for (let r = 0; r < 6; r++) for (let q = 0; q < 34; q++) {    // everyone on the same code: dots light from the middle out
        const x = -726 + q * 44, y = 170 + r * 44, d = Math.hypot(x / 44, (y - 280) / 44), s = t - A.dipakai - d * .035; if (s <= -.4) continue;
        ctx.fillStyle = s > 0 ? ivo(.25 + .6 * clamp(s / .3)) : ivo(.12); ctx.beginPath(); ctx.arc(x, y, s > 0 ? 7 : 4, 0, 7); ctx.fill(); }
    }, mod(c, t) { for (const t0 of [A.aturan, A.main]) { const s = t - t0; if (s > 0) c.roll += 2.2 * Math.exp(-s / .16) * Math.sin(s * 58); }
      c.dist -= 140 * E.outCubic(inv(A.aturan, A.satu3, t)); } },

    { at: A.dan, name: '1 vs 140 menuliskannya', via: 'truck', tag: '×140', draw(ctx, t) {
      txt(ctx, 'Dan standar itu cukup kuat…', -820, -420, t, A.dan, SRF(62));
      popAt(ctx, -640, 40, t, A.permohonan, () => mini(ctx, 0, 0, 200, 272, 0, { ring: t > A.kali }), { rise: 40 });
      txt(ctx, 'INDONESIA · 1', -640, 240, t, A.permohonan + .1, MN(24), { align: 'center', ls: 4 });
      for (let i = 0; i < 140; i++) { const s = t - A.paten - i * .004; if (s <= 0) break; const q = i % 14, r = Math.floor(i / 14), a0 = ctx.globalAlpha;
        ctx.globalAlpha = a0 * clamp(s / .1) * (1 - .55 * kq(t, A.merasa, .4)); mini(ctx, 70 + q * 50, -250 + r * 64 + (1 - E.outQuint(clamp(s / .35))) * 60, 40, 54, 1); ctx.globalAlpha = a0; }
      txt(ctx, 'AMERIKA SERIKAT · 140×', 395, -320, t, A.paten + .2, MN(24), { align: 'center', ls: 4 });
      txt(ctx, 'vs', -250, -90, t, A.paten, SRF(64), { align: 'center', col: ivo(.7) });
      fall(ctx, '×140', -250, 140, t, A.seratus, DSP(200), { align: 'center', ls: 2, col: LIME });
      txt(ctx, 'PERMOHONAN PATEN RESIDEN', -250, 190, t, A.kali, MN(18), { align: 'center', ls: 3, col: ivo(.7) });
      popAt(ctx, 420, 90, t, A.merasa - .1, () => {
        doc(ctx, 0, 0, 470, 600, { r: 10 }); setFont(ctx, MN(20), 5); ctx.fillStyle = 'rgba(17,18,14,.6)'; ctx.fillText('USTR · NTE 2025', -195, -240); ctx.fillRect(-195, -222, 390, 2);
        setFont(ctx, DSP(80), 2); ctx.fillStyle = INK; ctx.fillText('INDONESIA', -195, -130);
        ctx.fillStyle = 'rgba(17,18,14,.16)'; for (let i = 0; i < 3; i++) ctx.fillRect(-195, -90 + i * 32, 390 - (i % 2) * 80, 10);
        typeOn(ctx, '› QRIS', -195, 60, t, A.menuliskan - .1, MN(44), { cps: 14, col: INK, ls: 2 }); typeOn(ctx, '› GPN', -195, 130, t, A.menuliskan + .35, MN(44), { cps: 14, col: INK, ls: 2 });
      }, { from: .85, rise: 140 });
      srcTag(ctx, 'Sumber: WIPO, World IP Indicators 2025 (permohonan residen 2024); USTR NTE 2025', -840, 470, t, A.paten);
    } },

    { at: A.jadi, name: 'Dugaan direvisi', via: 'whip', draw(ctx, t) {
      txt(ctx, 'DUGAAN AWAL', -820, -400, t, A.jadi, MN(26), { ls: 6, col: ivo(.75) });
      const k1 = kq(t, A.dugaan - .1, .5); if (k1 > 0) { const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * k1 * (1 - .45 * kq(t, A.bukan3 + .2, .4));
        setFont(ctx, DSP(170), 3); ctx.fillStyle = IVORY; ctx.fillText('KITA CUMA PEMAKAI.', -820, -150 + (1 - k1) * 40);
        const wK = ctx.measureText('KITA ').width, wA = ctx.measureText('KITA CUMA PEMAKAI').width; ctx.globalAlpha = a0; strike(ctx, -820 + wK - 10, -820 + wA + 10, -205, t, A.bukan3, 12); }
      stamp(ctx, 'DIREVISI', 560, -330, t, A.direvisi, { size: 80, rot: -6 });
      markLine(ctx, 'KITA PERNAH ', 'MENCIPTA.', '', -820, 110, t, A.kita3 - .1, A.mencipta, DSP(170), { align: 'left', ls: 3 });
      txt(ctx, 'Hanya saja bentuknya bukan barang.', -820, 290, t, A.bentuknya - .1, SRF(60));
      slab(ctx, 'BENTUKNYA: ATURAN MAIN', -820, 390, t, A.barang, { size: 26 });
    } },

    { at: A.tapi, name: 'Jangan tepuk dada', via: 'cut', lead: .04, draw(ctx, t) {
      const a0 = ctx.globalAlpha, g = gone(t, A.menurutku - .2, .45); ctx.globalAlpha = a0 * g;
      txt(ctx, 'Tapi jangan buru-buru', 0, -200, t, A.tapi, SRF(80), { align: 'center' });
      fall(ctx, 'TEPUK DADA.', 0, 130, t, A.tepuk - .05, DSP(300), { align: 'center', ls: 6 }); ctx.globalAlpha = a0;
      txt(ctx, 'MENURUTKU, QRIS MENANG KARENA', -820, -380, t, A.qris4 - .2, MN(30), { ls: 4, col: ivo(.8) });
      slab(ctx, 'KEBIJAKAN YANG RAPI', -820, -270, t, A.kebijakan, { size: 40 });
      txt(ctx, '+', -820, -140, t, A.rapi + .2, DSP(110), { col: ivo(.6) });
      slab(ctx, 'PASAR YANG BESAR', -740, -170, t, A.pasarnya, { size: 40 });
      plate(ctx, V.lab, t, 420, 200, 760, 430, kq(t, A.bukan4 - .1, .6), { t0: A.bukan4 - .2, dim: .45 });
      txt(ctx, 'BUKAN KARENA', -820, 60, t, A.bukan4, MN(30), { ls: 5, col: ivo(.8) });
      const w = txt(ctx, 'UNGGUL DI LAB.', -820, 230, t, A.unggul - .25, DSP(170), { ls: 3 });
      if (w) strike(ctx, -830, -820 + w + 10, 172, t, A.lab, 12);
      srcTag(ctx, 'Opini narator', -840, 470, t, A.menurutku + .2);
    }, mod(c, t) { c.dist += 420 * E.inCubic(inv(A.lab + .6, DUR, t)); c.foc = c.dist; } },
  ];

  // ── S6: GPN map — a domestic route that never leaves the border ─────────────────────────────────────────────
  const P = (lon, lat) => [(lon - 118) * 31, -(lat + 2.5) * 31 + 10];
  const ISL = [
    [[95.3, 5.6], [97.5, 5.2], [100.4, 2.2], [103.8, 1.0], [106.0, -3.0], [105.8, -5.8], [104.5, -5.9], [102.3, -4.0], [100.3, -1.0], [98.7, 1.7], [96.0, 4.0]],
    [[105.2, -6.8], [106.1, -5.9], [108.3, -6.2], [110.4, -6.9], [112.6, -6.9], [114.4, -7.7], [114.4, -8.6], [110.5, -8.2], [107.5, -7.7], [105.4, -7.4]],
    [[109.0, 1.8], [111.0, 1.4], [113.0, 3.1], [115.5, 4.9], [117.0, 7.0], [119.2, 5.2], [118.0, 4.3], [117.8, 1.0], [119.0, 0.9], [117.5, -0.5], [116.5, -2.5], [116.0, -4.0], [114.5, -3.5], [111.7, -3.0], [110.2, -2.9], [109.0, -0.5]],
    [[119.4, -5.5], [119.6, -3.5], [118.8, -2.8], [119.8, 0.0], [120.2, 0.8], [121.5, 1.0], [124.2, 1.0], [125.2, 1.6], [124.4, 0.4], [121.0, 0.4], [120.6, -0.7], [123.3, -0.9], [121.9, -1.8], [122.0, -3.0], [123.1, -4.6], [121.6, -4.8], [121.3, -3.6], [120.5, -2.8], [120.4, -5.5]],
    [[131.0, -1.2], [132.5, -0.4], [134.1, -0.9], [135.0, -3.3], [137.8, -1.5], [141.0, -2.6], [141.0, -9.1], [139.5, -8.1], [138.0, -8.4], [137.6, -6.0], [135.0, -4.4], [132.8, -4.0], [132.0, -2.8], [133.5, -2.4], [132.0, -2.2]],
    [[115.0, -8.3], [116.4, -8.6], [116.2, -8.9], [114.9, -8.7]], [[116.8, -8.4], [119.0, -8.4], [119.0, -8.9], [116.8, -8.9]], [[119.8, -8.4], [123.0, -8.2], [123.0, -8.8], [119.8, -8.9]],
    [[123.5, -10.2], [125.2, -8.9], [125.3, -9.4], [123.8, -10.4]], [[127.9, -3.0], [130.8, -3.2], [130.8, -3.7], [128.0, -3.6]], [[127.6, 1.9], [128.6, 1.5], [128.2, 0.2], [127.4, -0.8], [127.7, 0.9]]];
  const HULL = [[93.5, 6.8], [108, 7.6], [120, 8.0], [128.5, 5.2], [142.2, 1.0], [142.2, -11.6], [124, -11.8], [110, -10.2], [101.5, -7.6], [93.5, -1.5]];
  const CITY = { medan: [98.7, 3.6], jkt: [106.8, -6.2], mks: [119.4, -5.1] };
  function polyPath(ctx, pts) { ctx.beginPath(); pts.forEach(([lo, la], i) => { const [x, y] = P(lo, la); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); }
  function pin(ctx, key, t, t0, label, right) {
    const [x, y] = P(...CITY[key]); popAt(ctx, x, y, t, t0, () => { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill(); ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 20, 0, 7); ctx.stroke(); }, { from: .2 });
    txt(ctx, label, x + (right ? 30 : -30), y - 22, t, t0 + .1, MN(20), { align: right ? 'left' : 'right', ls: 2 });
  }
  function drawGPN(ctx, t) {
    typeOn(ctx, 'GPN · GERBANG PEMBAYARAN NASIONAL', -820, -440, t, A.gpn2, MN(26), { ls: 4, cps: 42 });
    const a0 = ctx.globalAlpha, km = kq(t, A.gpn2 - .2, .9);
    ctx.save(); ctx.beginPath(); ctx.rect(-800, -400, 1600 * km, 760); ctx.clip();
    for (const isl of ISL) { polyPath(ctx, isl); ctx.fillStyle = '#23241D'; ctx.fill(); ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke(); }
    ctx.restore();
    const kh = kq(t, A.dalam - .2, .9);                  // the national border, dashed, drawn around
    if (kh > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-820, -420, 1640 * kh, 800); ctx.clip(); polyPath(ctx, HULL); ctx.setLineDash([16, 12]); ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      txt(ctx, 'BATAS NEGARA', P(142.2, 1)[0] - 10, P(142.2, 1)[1] - 22, t, A.dalam + .2, MN(18), { align: 'right', ls: 3, col: ivo(.7) }); }
    pin(ctx, 'medan', t, A.sistem, 'PEMBELI', false); pin(ctx, 'jkt', t, A.sistem + .25, 'PEMROSESAN', false); pin(ctx, 'mks', t, A.sistem + .5, 'BANK PENJUAL', true);
    const [mx, my] = P(...CITY.medan), [jx, jy] = P(...CITY.jkt), [kx, ky] = P(...CITY.mks);
    const seg = (x0, y0, x1, y1, bow, k) => { if (k <= 0) return; const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 - bow; ctx.beginPath(); ctx.moveTo(x0, y0);
      const n = 40; let px = x0, py = y0; for (let i = 1; i <= n * k; i++) { const u = i / n; px = (1 - u) ** 2 * x0 + 2 * (1 - u) * u * cx + u * u * x1; py = (1 - u) ** 2 * y0 + 2 * (1 - u) * u * cy + u * u * y1; ctx.lineTo(px, py); }
      ctx.strokeStyle = LIME; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.stroke(); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(px, py, 10, 0, 7); ctx.fill(); };
    const kr = E.inOutCubic(inv(A.diproses - .1, A.sendiri, t));
    seg(mx, my, jx, jy, 90, clamp(kr * 2)); seg(jx, jy, kx, ky, 110, clamp(kr * 2 - 1));
    if (t > A.sendiri) { const s = t - A.sendiri; ctx.globalAlpha = a0 * clamp(1 - s / .8); ctx.strokeStyle = LIME; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(kx, ky, 14 + 60 * E.outCubic(clamp(s / .8)), 0, 7); ctx.stroke(); ctx.globalAlpha = a0; }
    slab(ctx, 'DIPROSES DI DALAM NEGERI', jx - 30, jy + 120, t, A.sendiri, { size: 24, align: 'right' });
    const BX = [330, -400], kf = E.outCubic(inv(A.tidak - .1, A.jaringan + .1, t)), stop = .74;   // the foreign route stops at the border
    if (kf > 0) { const u = Math.min(stop, kf), ex = lerp(jx, BX[0], u), ey = lerp(jy, BX[1], u);
      ctx.setLineDash([12, 10]); ctx.strokeStyle = GREY; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(jx, jy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.strokeRect(BX[0] - 10, BX[1] - 52, 330, 70); txt(ctx, 'JARINGAN ASING', BX[0] + 8, BX[1] - 6, t, A.tidak, MN(26), { ls: 3, col: ivo(.6) });
      const kx2 = pop(t, A.asing - .05, .5, .26); if (kx2 > 0) { const ux = lerp(jx, BX[0], stop), uy = lerp(jy, BX[1], stop), s2 = 22 * Math.min(kx2, 1.2);
        ctx.strokeStyle = IVORY; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(ux - s2, uy - s2); ctx.lineTo(ux + s2, uy + s2); ctx.moveTo(ux + s2, uy - s2); ctx.lineTo(ux - s2, uy + s2); ctx.stroke(); } }
    dimRect(ctx, -820, -420, 1640, 700, .55 * kq(t, A.keberatan - .1, .5));
    txt(ctx, 'KEBERATAN AS:', -820, 290, t, A.keberatan, MN(26), { ls: 5, col: ivo(.75) });
    typeOn(ctx, 'ATURAN INI MEMBATASI AKSES PEMAIN ASING', -820, 355, t, A.aturan0, MN(34), { cps: 26, ls: 2 });
    slab(ctx, 'TERUTAMA PERUSAHAAN AMERIKA', -820, 418, t, A.perusahaan, { size: 22 });
    srcTag(ctx, 'Sumber: Bank Indonesia (GPN); USTR NTE 2025 via Bisnis.com, 21 Apr 2025', -840, 470, t, A.keberatan + .3);
  }

  // ── gates + chapter ──────────────────────────────────────────────────────────────────────────────────────────
  for (const s of ST) {                                    // nothing of a station shows before it is reached (ghost tags aside)
    const at = s.at, wrap = fn => fn && ((ctx, t, c) => { if (s === ST[0]) return fn(ctx, t, c); const g = clamp((t - at + .5) / .35); if (g <= 0) return; ctx.globalAlpha = g; fn(ctx, t, c); });
    s.draw = wrap(s.draw); for (const L of s.layers || []) L.fn = wrap(L.fn);
  }
  let FULLS;                                                 // full-frame tilted articles (kit evidFull)
  return makeChapter({ B, ST, load, label: 'PUNCAK · TEMPAT SKORNYA KEBALIK',
    full: () => FULLS ??= [{ im: IM.jp, t0: A.gpn - 1.4, t1: A.gpn + 2.6, dir: -1, crop: [0, .08, 1, .52], tab: 'THE JAKARTA POST · 2 JUN 2025', hl: [[.197, .342, .515, .158, A.gpn]] }] });
}
