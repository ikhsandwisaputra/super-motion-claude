// Bab 02 · Jalan Tol Data dan Otak AI (VO ivs_vo_ahmad_05, 174.6 s). One depth row of 20 stations:
// pipa (HP vs Wi-Fi race lanes, 1 GB download sim, the blinking-router exhibit) → gudang (request → data centre, 5.427 dot field)
// → otak (HAI coins, 59 vs 35 model tiles, TSMC chip + CHIPS) → kita (Sahabat-AI chat, knob grid, 1 GW gauge, SATRIA-1) → Florida deadpan → dive.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, ROOM, IVORY, LIME, LIME_INK, TILE, GREY, DISP, SER, MONO, D2R, ivo, setFont, rnd, fmt, mk,
  timing, makeChapter, loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone } from './kit.js';
import { kq, pop, popAt, phone, chip, coin, stack, stamp } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const V = {}, IM = {};
  const still = im => ({ n: 2, fps: 1, img: [im, im] });
  const desat = im => { const [c, g] = mk(im.width, im.height); g.filter = 'grayscale(1) contrast(1.08) brightness(.95)'; g.drawImage(im, 0, 0); return c; };

  async function load() {
    const vb = '../assets/shared/vid/';
    for (const n of ['server', 'satelit', 'hp_qr', 'serat', 'cleanroom']) V[n] = await loadVid(vb, n);
    const s = '../assets/shared/';
    for (const [k, f] of [['st', 'kutipan/speedtest-speedtest-global-index.png'], ['medcom', 'kutipan/medcom-hari-internet-2026-ini-posisi-kecepatan.png'],
      ['hai', 'kutipan/hai-the-2026-ai-index-report.png'], ['nist', 'kutipan/nist-tsmc-arizona.png'], ['antara', 'kutipan/en-bakti-connects-30-000-public-services.png'],
      ['batam', 'kutipan/pemerintah-satu-lagi-data-centre-dibangun-di-batam.jpg'], ['gSel', 'grafik/grafik-internet-seluler-ookla.png'],
      ['gRum', 'grafik/grafik-internet-rumah-ookla.png'], ['gInv', 'grafik/grafik-investasi-ai-2025.png'],
      ['google', 'cc/commons-google-campus-mountain-view-ca.jpg'], ['fab', 'cc/commons-231105-1-tsmc-fab-21-construction.jpg']]) IM[k] = await loadImg(s + f, 1600);
    for (const k of ['gSel', 'gRum', 'gInv']) IM[k] = desat(IM[k]);     // Ahri's charts in the room's palette (their blue → grey), lime marks on top
    for (const k of ['batam', 'google', 'fab']) V[k] = still(IM[k]);
  }

  // ── props ──────────────────────────────────────────────────────────────────────────────────────────────────
  // speed lane: track + bar that races out at t0 + rolling number riding the bar's head
  function lane(ctx, t, t0, x0, y, px, v, label, lime, dur = 1.1) {
    const ka = kq(t, t0 - .5, .5); if (ka <= 0) return; const a0 = ctx.globalAlpha, k = E.outCubic(inv(t0, t0 + dur, t)), col = lime ? LIME : IVORY;
    ctx.globalAlpha = a0 * ka; ctx.fillStyle = ivo(.13); ctx.fillRect(x0, y - 3, 740, 6);
    ctx.fillStyle = ivo(.3); for (let m = 0; m * px <= 740; m += 50) ctx.fillRect(x0 + m * px - 1, y + 14, 2, m % 100 ? 8 : 14);
    setFont(ctx, MN(19), 4); ctx.fillStyle = ivo(.75); ctx.textAlign = 'left'; ctx.fillText(label, x0, y + 58);
    const L = v * px * k; ctx.fillStyle = col; ctx.fillRect(x0, y - 9, L, 18);
    if (k > 0 && k < 1) for (let i = 0; i < 7; i++) { ctx.globalAlpha = a0 * ka * (.55 - i * .07); ctx.fillRect(x0 + L - 50 - i * 34, y - 24 + (i % 2) * 48 - (i % 3) * 4, 26, 2); }
    ctx.globalAlpha = a0 * ka;
    if (k > 0) { setFont(ctx, DSP(104), 2); ctx.textAlign = 'right'; ctx.fillStyle = col; ctx.fillText(fmt(countTo(0, v, t, t0, dur), 2), Math.max(x0 + 230, x0 + L), y - 30); ctx.textAlign = 'left'; }
    ctx.globalAlpha = a0;
  }
  // line-art home router; LEDs blink at `rate` Hz (deterministic), optional dust + cobweb
  function router(ctx, t, rate = 1.2, dust = 0) {
    ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.lineCap = 'round';
    for (const [x, a] of [[-125, -14], [125, 14]]) { ctx.save(); ctx.translate(x, -50); ctx.rotate(a * D2R); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -160); ctx.stroke(); ctx.restore(); }
    ctx.fillStyle = TILE; ctx.beginPath(); ctx.roundRect(-200, -58, 400, 116, 24); ctx.fill(); ctx.stroke();
    for (let i = 0; i < 5; i++) { const on = rnd(Math.floor(t * rate) * 7.3 + i * 3.1) > .4; ctx.fillStyle = on ? ivo(.95) : ivo(.14);
      if (on) { ctx.shadowColor = ivo(.8); ctx.shadowBlur = 14; } ctx.beginPath(); ctx.arc(-110 + i * 55, -6, 9, 0, 7); ctx.fill(); ctx.shadowBlur = 0; }
    ctx.fillStyle = ivo(.18); for (let i = 0; i < 10; i++) ctx.fillRect(-152 + i * 31, 30, 16, 5);
    if (dust > 0) { const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * dust;
      ctx.fillStyle = ivo(.45); for (let i = 0; i < 70; i++) ctx.fillRect(-195 + rnd(i * 2.3) * 390, -62 + rnd(i * 4.1) * 10, 2 + rnd(i) * 3, 2);
      ctx.strokeStyle = ivo(.35); ctx.lineWidth = 1.2; const cx = -125 + Math.sin(-14 * D2R) * 70, cy = -50 - 70;
      for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.quadraticCurveTo(-60, -110 + r * 12, -40 + r * 16, -58); ctx.stroke(); }
      ctx.globalAlpha = a0; }
  }
  // download item (UI sim): file glyph, name, flag line, progress, elapsed m:ss of simulated time
  function dl(ctx, t, y, tIn, t0, t1, simEnd, flag, lime) {
    const ki = kq(t, tIn, .5); if (ki <= 0) return; const a0 = ctx.globalAlpha, k = clamp((t - t0) / (t1 - t0)), col = lime ? LIME : IVORY;
    ctx.save(); ctx.translate((1 - ki) * 160, 0); ctx.globalAlpha = a0 * ki;
    ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.fillStyle = 'rgba(27,28,23,.96)'; ctx.beginPath(); ctx.roundRect(-660, y - 108, 1320, 216, 30); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.strokeStyle = ivo(.1); ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = ivo(.9); ctx.beginPath(); ctx.moveTo(-600, y - 52); ctx.lineTo(-552, y - 52); ctx.lineTo(-530, y - 30); ctx.lineTo(-530, y + 52); ctx.lineTo(-600, y + 52); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(11,12,9,.7)'; setFont(ctx, MN(15), 1); ctx.fillText('ZIP', -588, y + 34);
    setFont(ctx, MN(28), 1); ctx.fillStyle = IVORY; ctx.fillText('file_1GB.zip', -490, y - 36);
    setFont(ctx, MN(18, 400), 3); ctx.fillStyle = ivo(.6); ctx.fillText(flag, -490, y + 4);
    ctx.fillStyle = ivo(.12); ctx.fillRect(-490, y + 44, 860, 8); ctx.fillStyle = col; ctx.fillRect(-490, y + 44, 860 * k, 8);
    setFont(ctx, MN(18), 2); ctx.textAlign = 'right'; ctx.fillStyle = ivo(.7); ctx.fillText(k >= 1 ? 'SELESAI' : Math.floor(k * 100) + '%', 370, y + 30);
    const s = Math.round(simEnd * k); setFont(ctx, DSP(120), 2); ctx.fillStyle = k > 0 ? col : ivo(.3); ctx.fillText(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, 620, y + 44);
    ctx.textAlign = 'left'; ctx.restore(); ctx.globalAlpha = a0;
  }
  function knob(ctx, x, y, r, ang, lime) {
    ctx.fillStyle = TILE; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.strokeStyle = lime ? LIME : ivo(.55); ctx.lineWidth = Math.max(2, r * .08); ctx.stroke();
    ctx.strokeStyle = lime ? LIME : IVORY; ctx.lineWidth = Math.max(2.5, r * .12); ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * r * .2, y + Math.sin(ang) * r * .2); ctx.lineTo(x + Math.cos(ang) * r * .78, y + Math.sin(ang) * r * .78); ctx.stroke();
  }
  function bubble(ctx, x, y, t, t0, lang, text) {                // chat bubble (right-aligned at x) + language tag, springs up
    const k = pop(t, t0, .6, .3); if (k <= 0) return; const a0 = ctx.globalAlpha; setFont(ctx, SRF(40)); const w = ctx.measureText(text).width + 64;
    ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 40); ctx.scale(lerp(.7, 1, Math.min(k, 1.05)), lerp(.7, 1, Math.min(k, 1.05))); ctx.globalAlpha = a0 * clamp((t - t0) / .12);
    ctx.fillStyle = IVORY; ctx.beginPath(); ctx.roundRect(-w, -40, w, 80, 34); ctx.fill(); ctx.beginPath(); ctx.moveTo(-26, 30); ctx.lineTo(8, 46); ctx.lineTo(-8, 18); ctx.fill();
    ctx.fillStyle = '#11120E'; ctx.textAlign = 'left'; ctx.fillText(text, -w + 32, 14);
    setFont(ctx, MN(16), 4); ctx.fillStyle = ivo(.6); ctx.textAlign = 'right'; ctx.fillText(lang, 0, -54); ctx.textAlign = 'left'; ctx.restore(); ctx.globalAlpha = a0;
  }
  const stacks = (ctx, x0, gap, y, n, t, t0, o) => {           // n coins as columns of 10 so they read as money, not one tall can
    for (let g = 0; g * 10 < n; g++) stack(ctx, x0 + g * gap, y + (g % 2) * 14, Math.min(10, n - g * 10), t, t0 + g * 10 * (o.step ?? .06), o); };
  const caption = (ctx, s, x, y, t, t0) => txt(ctx, s, x, y, t, t0, MN(16, 400), { ls: 2, col: ivo(.6) });

  // ── stations ─────────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, name: 'Pembuka bab', dist: [1700, 1480], draw(ctx, t) {
      txt(ctx, 'BAB 02', 0, -300, t, .3, MN(28), { align: 'center', ls: 10, col: ivo(.75) });
      const k = kq(t, .45, .6); ctx.fillStyle = LIME; ctx.fillRect(-70 * k, -272, 140 * k, 5);
      fall(ctx, 'JALAN TOL DATA', 0, 20, t, .6, DSP(250), { align: 'center', ls: 6, stag: .04 });
      txt(ctx, 'Jarak internet kita dengan Amerika', 0, 170, t, A.jarak, SRF(58), { align: 'center' });
      markLine(ctx, 'paling lebar ', 'di mana?', '', 0, 262, t, A.jarak + 1.1, A.mana, SRF(58), { ls: 0 });
    } },

    { at: A.di - .1, name: 'Kuis: HP atau Wi-Fi?', via: 'push', tag: 'KUIS', draw(ctx, t) {
      const flip = kq(t, A.kebalikannya, .35), a0 = ctx.globalAlpha;
      txt(ctx, 'JARAK PALING LEBAR DI MANA?', 0, -390, t, A.di - .1, MN(24), { align: 'center', ls: 6, col: ivo(.75) });
      ctx.globalAlpha = a0 * (1 - .6 * flip);
      popAt(ctx, -420, -60, t, A.hp, () => phone(ctx, 190, 380), { rise: 60, rot: -3 });
      txt(ctx, 'A · DI HP', -420, 220, t, A.hp + .1, MN(28), { align: 'center', ls: 5 });
      for (let i = 0; i < 18; i++) popAt(ctx, -560 + (i % 9) * 35, 290 + Math.floor(i / 9) * 36, t, A.banyak + .2 + i * .06, () => {   // votes pile up under A
        ctx.fillStyle = ivo(.8); ctx.beginPath(); ctx.arc(0, -6, 7, 0, 7); ctx.fill(); ctx.fillRect(-8, 3, 16, 9); }, { from: .2 });
      ctx.globalAlpha = a0;
      if (flip > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-600, -60); ctx.lineTo(-600 + 360 * flip, -60 + 40 * flip); ctx.stroke(); }
      popAt(ctx, 420, 10, t, A.wifi, () => router(ctx, t, 1.4), { rise: 60, rot: 3 });
      txt(ctx, 'B · DI WI-FI RUMAH', 420, 220, t, A.wifi + .1, MN(28), { align: 'center', ls: 5, col: flip > .5 ? LIME : IVORY });
      if (flip > 0) { ctx.strokeStyle = LIME; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(140, -300, 560, 580, 30 * flip); ctx.globalAlpha = a0 * flip; ctx.stroke(); ctx.globalAlpha = a0; }
      txt(ctx, 'banyak yang jawab A', -420, 400, t, A.banyak, SRF(40), { align: 'center', col: ivo(.75) });
      stamp(ctx, 'KEBALIKANNYA.', 0, -150, t, A.kebalikannya, { size: 120, rot: -5 });
    }, mod(c, t) { const s = t - A.kebalikannya; if (s > 0 && s < .4) { c.roll += Math.sin(s * 80) * 1.4 * (1 - s / .4); c.tx += Math.sin(s * 63) * 14 * (1 - s / .4); } } },

    { at: A.data, name: 'Ookla · HP: < 3×', via: 'whip', tag: 'HP', draw(ctx, t) {
      evid(ctx, IM.st, -440, -250, 720, t, A.ookla - .2, { tab: 'OOKLA · SEP 2026', rot: -1.2 });
      evid(ctx, IM.gSel, -440, 185, 600, t, A.selisihnya - .2, { tab: 'GRAFIK · SELULER', rot: 1.4, dark: true });
      txt(ctx, 'JUTAAN TES → ANGKA TENGAH', 80, -395, t, A.jutaan, MN(20), { ls: 4, col: ivo(.75) });
      const ks = kq(t, A.jutaan, .5), kc = E.inOutCubic(inv(A.jutaan + 1.1, A.jutaan + 2.0, t)), mx = 80 + 740 * .4, a0 = ctx.globalAlpha;
      if (ks > 0) { for (let i = 0; i < 90; i++) { const x = 80 + 740 * Math.pow(rnd(i * 3.3), 1.35), y = -300 + (rnd(i * 5.1) - .5) * 80 * (1 - kc);
          ctx.globalAlpha = a0 * ks * (.25 + .5 * rnd(i)) * (1 - .7 * kc); ctx.fillStyle = IVORY; ctx.fillRect(lerp(x, mx, kc) - 2.5, y - 2.5 + (1 - ks) * 40, 5, 5); }
        ctx.globalAlpha = a0; if (kc > .6) { ctx.fillStyle = IVORY; ctx.fillRect(mx - 2, -340, 4, 80); slab(ctx, 'MEDIAN', mx + 16, -300, t, A.jutaan + 1.9, { size: 18 }); } }
      lane(ctx, t, A.tujuh - .3, 80, -110, 3.7, 70.77, 'INDONESIA · Mbps', true);
      lane(ctx, t, A.amerika, 80, 120, 3.7, 190.59, 'AMERIKA SERIKAT · Mbps', false);
      markLine(ctx, 'selisihnya ', 'kurang dari 3×', '', 450, 310, t, A.selisihnya, A.kurang, SRF(52), { ls: 0 });
      srcTag(ctx, 'Sumber: Ookla Speedtest Global Index · median seluler, Sep 2026', -840, 440, t, A.ookla);
    } },

    { at: A.di3, name: 'Rumah: 6× lipat', via: 'push', tag: 'RUMAH', draw(ctx, t) {
      evid(ctx, IM.medcom, -440, -255, 720, t, A.rumah2, { tab: 'MEDCOM · 29 OKT 2026', rot: 1.2 });
      evid(ctx, IM.gRum, -440, 185, 600, t, A.enam + .25, { tab: 'GRAFIK · INTERNET RUMAH', rot: -1.4, dark: true });
      txt(ctx, 'Di rumah, ceritanya beda.', 80, -340, t, A.di3 + .1, SRF(56));
      lane(ctx, t, A.lima - .3, 80, -110, 2.3, 52.62, 'INDONESIA · RUMAH · Mbps', true);
      lane(ctx, t, A.amerika2, 80, 120, 2.3, 314.35, 'AMERIKA SERIKAT · RUMAH · Mbps', false, 1.3);
      stamp(ctx, '6× LIPAT', 450, 315, t, A.enam, { size: 130, rot: -4 });
      srcTag(ctx, 'Sumber: Ookla Speedtest Global Index · median internet rumah, Sep 2026', -840, 440, t, A.rumah2);
    } },

    { at: A.buat, name: 'Unduh 1 GB', via: 'rise', tag: '1 GB', draw(ctx, t) {
      txt(ctx, 'Unduh file 1 GB lewat Wi-Fi rumah:', 0, -360, t, A.buat + .1, SRF(60), { align: 'center' });
      const tUS = A.amerika3 + 25 / 152 * (A.menit - A.wifi2);
      dl(ctx, t, -120, A.unduh - .3, A.wifi2, A.menit, 152, 'INDONESIA · 52,62 Mbps', true);
      dl(ctx, t, 170, A.amerika3 - .45, A.amerika3, tUS, 25, 'AMERIKA SERIKAT · 314,35 Mbps', false);
      slab(ctx, '± 2,5 MENIT', 660, 6, t, A.menit, { align: 'right', size: 22, lime: true });
      slab(ctx, '± 25 DETIK', 660, 296, t, A.detik - .2, { align: 'right', size: 22 });
      srcTag(ctx, 'Hitungan sendiri: 8.000 megabit ÷ median Ookla Sep 2026 (52,62 vs 314,35 Mbps)', -840, 440, t, A.menit);
    } },

    { at: A.yang, name: 'HP > Wi-Fi rumah', via: 'whip', tag: 'LUCU', draw(ctx, t) {
      plate(ctx, V.hp_qr, t, -440, -40, 740, 620, kq(t, A.yang - .3, .7), { t0: A.yang - .3, speed: .6 });
      slab(ctx, 'HP · 70,77 Mbps', -440, 330, t, A.hp4, { align: 'center', size: 24, lime: true });
      const dust = kq(t, A.pajangan, .8), rate = t > A.kedip ? 9 : 1.1;
      const kp = kq(t, A.pajangan - .2, .5);
      if (kp > 0) { const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * kp; ctx.fillStyle = '#23241E'; ctx.fillRect(250, 150 + (1 - kp) * 60, 380, 220); ctx.fillStyle = ivo(.08); ctx.fillRect(230, 140 + (1 - kp) * 60, 420, 18); ctx.globalAlpha = a0; }
      popAt(ctx, 440, 40, t, A.lebih - .1, () => router(ctx, t, rate, dust), { rise: 60 });
      slab(ctx, 'WI-FI RUMAH · 52,62 Mbps', 440, -250, t, A.lebih + .1, { align: 'center', size: 22 });
      txt(ctx, '>', 0, 60, t, A.kencang, DSP(220), { align: 'center', col: LIME });
      slab(ctx, 'PAJANGAN · KOLEKSI RUMAH TANGGA', 440, 270, t, A.pajangan, { align: 'center', size: 18 });
      txt(ctx, 'Bangsa yang hidup di ponsel.', -440, 405, t, A.bangsa, SRF(46), { align: 'center' });
      srcTag(ctx, 'Sumber: Ookla Speedtest Global Index, median Sep 2026', 140, 440, t, A.hp4 + .3);
    } },

    { at: A.sekarang, name: 'Gudangnya: pusat data', via: 'truck', tag: 'GUDANG', draw(ctx, t) {
      txt(ctx, 'Sekarang ke gudangnya.', 0, -380, t, A.sekarang + .05, SRF(60), { align: 'center' });
      popAt(ctx, -640, 0, t, A.setiap, () => phone(ctx, 200, 400), { rise: 50, rot: -4 });
      const kt = pop(t, A.membuka, .5, .3); if (kt > 0) { const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * clamp(1.4 - kt); ctx.strokeStyle = LIME; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-640, 60, 20 + 50 * kt, 0, 7); ctx.stroke(); ctx.globalAlpha = a0; }
      txt(ctx, 'SETIAP KALI BUKA APLIKASI', -640, 270, t, A.membuka, MN(19), { align: 'center', ls: 3, col: ivo(.75) });
      const kl = kq(t, A.datanya - .2, .7);
      if (kl > 0) { ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(-520, 0); ctx.lineTo(-520 + 520 * kl, 0); ctx.stroke(); ctx.setLineDash([]);
        for (let i = 0; i < 4; i++) { const u = ((t - A.datanya) * .9 + i * .25) % 1; if (t < A.datanya + .5) break; ctx.fillStyle = i % 2 ? IVORY : LIME; ctx.fillRect(0 - u * 520 - 8, -8, 16, 16); } }
      const kb = kq(t, A.pusat - .25, .7), ks = kq(t, A.ribuan - .15, .6);
      plate(ctx, V.batam, t, 420, -40, 780, 470, kb, { t0: A.pusat - .25, dim: .55 * ks });
      if (ks > 0) plate(ctx, V.server, t, 420, -40, 780, 470 * ks, 1, { t0: A.ribuan - .15, marks: false });
      slab(ctx, 'PUSAT DATA', 30, -250, t, A.pusat, { size: 26 });
      caption(ctx, t < A.ribuan ? 'Pusat data di Batam (gambar rancangan) · Foto: BP Batam' : 'Ruang server (ilustrasi) · Pexels', 30, 225, t, A.gedung);
      txt(ctx, 'RIBUAN KOMPUTER, MENYALA SIANG MALAM', 30, 290, t, A.menyala, MN(24), { ls: 3 });
      const kd = kq(t, A.menyala, 1.2); if (kd > 0) { ctx.strokeStyle = ivo(.3); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(760, 370, 36, 0, 7); ctx.stroke();
        ctx.strokeStyle = LIME; ctx.beginPath(); ctx.arc(760, 370, 36, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * kd); ctx.stroke(); txt(ctx, '24 JAM', 700, 380, t, A.menyala + .3, MN(18), { align: 'right', ls: 3, col: ivo(.7) }); }
    } },

    { at: A.stanford, name: '5.427 pusat data', via: 'whip', tag: '5.427', draw(ctx, t) {
      const n = Math.round(countTo(0, 5427, t, A.lima2 - .1, 2.4)), X0 = -810, Y0 = -330, ST8 = 8, COLS = 90;
      txt(ctx, 'PUSAT DATA DI AMERIKA SERIKAT · 1 TITIK = 1', X0, -380, t, A.stanford, MN(19), { ls: 4, col: ivo(.75) });
      if (n > 0) { ctx.fillStyle = IVORY; ctx.beginPath(); for (let i = 0; i < n; i++) ctx.rect(X0 + (i % COLS) * ST8, Y0 + Math.floor(i / COLS) * ST8, 5, 5); ctx.fill(); }   // one path: a DOF blur runs once, not 5.427× (render 2026-11-14)
      if (t > A.lima2 - .1) { setFont(ctx, DSP(250), 2); ctx.textAlign = 'right'; ctx.fillStyle = t > A.pusat2 ? LIME : IVORY; ctx.fillText(fmt(n), 820, -60); ctx.textAlign = 'left'; }
      txt(ctx, 'PUSAT DATA', 820, -10, t, A.pusat2, MN(24), { align: 'right', ls: 6 });
      const kx = kq(t, A.sepuluh - .1, .5);                     // the next country: under a tenth of the field (≤ 542 dots, as an outline)
      if (kx > 0) { const bw = 27 * ST8, bh = 20 * ST8, bx = 820 - bw, by = 80; ctx.strokeStyle = ivo(.75); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.strokeRect(bx, by, bw * kx, bh * kx); ctx.setLineDash([]);
        txt(ctx, '< 1/10', bx - 24, by + 110, t, A.sepuluh + .2, DSP(110), { align: 'right' }); }
      slab(ctx, 'NEGARA LAIN MANA PUN', 820, 300, t, A.negara, { align: 'right', size: 22 });
      slab(ctx, 'BUKAN CUMA INDONESIA', 820, 370, t, A.bukan, { align: 'right', size: 22, lime: true });
      srcTag(ctx, 'Sumber: Stanford HAI, AI Index 2026 · pusat data per negara', -840, 440, t, A.lima2);
    } },

    { at: A.lalu, name: 'Otak di balik layar', via: 'rise', tag: 'AI', draw(ctx, t) {
      plate(ctx, V.google, t, 0, 0, 1700, 900, kq(t, A.lalu - .3, .7), { t0: A.lalu - .3, dim: .5 });
      fall(ctx, 'OTAK DI BALIK LAYAR', 0, 40, t, A.otak, DSP(210), { align: 'center', ls: 5, stag: .035 });
      markLine(ctx, '', 'kecerdasan buatan.', '', 0, 190, t, A.kecerdasan - .2, A.kecerdasan + .1, SRF(70), { ls: 0 });
      caption(ctx, 'Kampus Google, Mountain View · Foto: Austin McKinley, Wikimedia Commons (CC BY 3.0)', -840, 470, t, A.lalu + .3);
    } },

    { at: A.masih, name: 'Investasi AI US$285,9 M', via: 'push', tag: '$285,9', draw(ctx, t) {
      evid(ctx, IM.hai, -430, -240, 780, t, A.aiindex - .3, { tab: 'STANFORD HAI · AI INDEX 2026', rot: -1 });
      typeOn(ctx, 'TAHUN 2025', -820, 40, t, A.tahun, MN(30), { ls: 6, cps: 30 });
      typeOn(ctx, 'INVESTASI SWASTA UNTUK AI', -820, 95, t, A.investasi, MN(30), { ls: 4, cps: 40, col: ivo(.75) });
      typeOn(ctx, 'DI AMERIKA SERIKAT', -820, 150, t, A.amerika5, MN(30), { ls: 4, cps: 40, col: ivo(.75) });
      stacks(ctx, 420, 200, 330, 29, t, A.dua3 - .1, { th: 17, rx: 85, step: .06 });
      if (t > A.dua3 - .1) { const v = countTo(0, 285.9, t, A.dua3 - .1, 2.2); setFont(ctx, DSP(190), 2); ctx.textAlign = 'right'; ctx.fillStyle = IVORY; ctx.fillText(fmt(v, 1), 820, -120); ctx.textAlign = 'left'; }
      txt(ctx, 'MILIAR DOLAR AS', 820, -60, t, A.miliar, MN(24), { align: 'right', ls: 5, col: LIME });
      txt(ctx, '1 KOIN = US$10 MILIAR', 620, 430, t, A.dua3 + .6, MN(16, 400), { align: 'center', ls: 3, col: ivo(.6) });
      srcTag(ctx, 'Sumber: Stanford HAI, AI Index 2026 · investasi swasta AI 2025', -840, 440, t, A.aiindex);
    } },

    { at: A.pembanding, name: '> 23× Tiongkok', via: 'whip', tag: '23×', draw(ctx, t) {
      txt(ctx, 'Pembandingnya bahkan bukan kita.', -820, -380, t, A.pembanding + .05, SRF(56));
      stacks(ctx, -720, 160, 330, 29, t, A.angka - .2, { th: 17, rx: 70, step: .025 });
      stack(ctx, -150, 330, 1, t, A.tiongkok - .3, { th: 17, rx: 70 });
      txt(ctx, 'AMERIKA · 285,9', -560, 400, t, A.angka, MN(22), { align: 'center', ls: 3 });
      txt(ctx, 'TIONGKOK · 12,4', -150, 400, t, A.tiongkok - .2, MN(22), { align: 'center', ls: 3 });
      evid(ctx, IM.gInv, 430, -130, 660, t, A.angka + .3, { tab: 'GRAFIK · INVESTASI AI 2025', rot: 1.3, dark: true });
      stamp(ctx, '> 23×', 430, 300, t, A.kali2, { size: 150, rot: -5 });
      srcTag(ctx, 'Sumber: Stanford HAI, AI Index 2026 · miliar dolar AS', -840, 470, t, A.angka);
    } },

    { at: A.dan, name: 'Model AI: 59 vs 35', via: 'truck', tag: '59', draw(ctx, t) {
      txt(ctx, 'MODEL AI UNGGULAN · TAHUN YANG SAMA', 0, -390, t, A.dan + .1, MN(22), { align: 'center', ls: 6, col: ivo(.75) });
      const tile = (x, y, t0, tone) => popAt(ctx, x, y, t, t0, () => { ctx.fillStyle = tone ? GREY : IVORY; ctx.beginPath(); ctx.roundRect(-27, -27, 54, 54, 10); ctx.fill();
        ctx.fillStyle = 'rgba(11,12,9,.55)'; for (const [a, b] of [[-11, -9], [11, -9], [0, 11]]) { ctx.beginPath(); ctx.arc(a, b, 5, 0, 7); ctx.fill(); }
        ctx.strokeStyle = 'rgba(11,12,9,.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-11, -9); ctx.lineTo(11, -9); ctx.lineTo(0, 11); ctx.closePath(); ctx.stroke(); }, { from: .3 });
      for (let i = 0; i < 59; i++) tile(-780 + (i % 10) * 68, -120 + Math.floor(i / 10) * 68, A.lima3 + i * .02, 0);
      for (let i = 0; i < 35; i++) tile(160 + (i % 10) * 68, -120 + Math.floor(i / 10) * 68, A.tiga4 + i * .02, 1);
      fall(ctx, '59', -780 - 27, -190, t, A.lima3, DSP(170), { ls: 2 });
      txt(ctx, 'AMERIKA SERIKAT', -560, -205, t, A.amerika6, MN(22), { ls: 4 });
      fall(ctx, '35', 160 - 27, -190, t, A.tiga4, DSP(170), { ls: 2, col: ivo(.7) });
      txt(ctx, 'TIONGKOK', 330, -205, t, A.tiongkok2, MN(22), { ls: 4, col: ivo(.7) });
      const ku = kq(t, A.model, .4); ctx.fillStyle = LIME; ctx.fillRect(-807, -170, 170 * ku, 6);
      srcTag(ctx, 'Sumber: Stanford HAI, AI Index 2026 · model AI unggulan 2025', -840, 440, t, A.lima3);
    } },

    { at: A.lalu2, name: 'Chip: TSMC', via: 'rise', tag: 'CHIP', draw(ctx, t) {
      plate(ctx, V.cleanroom, t, 0, 0, 1700, 900, kq(t, A.lalu2 - .3, .7), { t0: A.lalu2 - .3, dim: .62 });
      popAt(ctx, -420, -10, t, A.chip, () => { ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; chip(ctx, 300); ctx.shadowBlur = 0;
        if (t > A.otaknya) { ctx.strokeStyle = LIME; ctx.lineWidth = 3; ctx.globalAlpha *= .5 + .5 * Math.sin((t - A.otaknya) * 6); ctx.strokeRect(-78, -78, 156, 156); } }, { rise: 70, rot: -6 });
      fall(ctx, 'OTAKNYA OTAK.', 40, -240, t, A.otaknya, DSP(130), { ls: 3 });
      txt(ctx, 'Hampir semua chip AI tercanggih', 40, -140, t, A.hampir, SRF(48));
      slab(ctx, 'DIBUAT SATU PERUSAHAAN TAIWAN', 40, -60, t, A.satu, { size: 22 });
      fall(ctx, 'TSMC', 40, 150, t, A.tsmc, DSP(200), { ls: 6, col: LIME });
      txt(ctx, 'AMERIKA TIDAK MAU CUMA JADI', 40, 260, t, A.amerika7, MN(24), { ls: 3 });
      if (t > A.pembeli - .1) { const w = txt(ctx, 'PEMBELI.', 40, 340, t, A.pembeli - .1, DSP(90), { ls: 3 }), ks = kq(t, A.pembeli + .35, .3);
        ctx.fillStyle = LIME; ctx.fillRect(30, 308, (w + 20) * ks, 7); }
      caption(ctx, 'Ruang bersih pabrik chip (ilustrasi) · Pexels', -840, 470, t, A.lalu2 + .4);
    } },

    { at: A.lewat, name: 'CHIPS: US$6,6 M ke TSMC Arizona', via: 'push', tag: 'CHIPS', draw(ctx, t) {
      evid(ctx, IM.nist, -420, -275, 760, t, A.chips - .3, { tab: 'NIST · 24 JUL 2024', rot: -1 });
      plate(ctx, V.fab, t, -420, 145, 760, 370, kq(t, A.tsmc2 - .4, .7), { t0: A.tsmc2 - .4, dim: .15 });
      caption(ctx, 'TSMC Fab 21, Arizona · Foto: Hunter Trick, Wikimedia Commons (CC BY-SA 4.0)', -800, 365, t, A.tsmc2);
      slab(ctx, 'UU CHIPS · AMERIKA SERIKAT', 60, -390, t, A.chips, { size: 22 });
      txt(ctx, 'HIBAH LANGSUNG HINGGA', 60, -300, t, A.hibah, MN(24), { ls: 4, col: ivo(.75) });
      if (t > A.enam2 - .15) { setFont(ctx, DSP(170), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('US$' + fmt(countTo(0, 6.6, t, A.enam2 - .15, .9), 1), 60, -150); }
      txt(ctx, 'MILIAR', 60, -100, t, A.miliar2, MN(24), { ls: 6, col: LIME });
      const ka = kq(t, A.arizona - .2, .9), P0 = [800, 10], P1 = [120, 10];
      if (ka > 0) { ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath();
        for (let i = 0; i <= 40 * ka; i++) { const u = i / 40, x = lerp(P0[0], P1[0], u), y = P0[1] - Math.sin(Math.PI * u) * 110; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]);
        for (const [p, s] of [[P0, 'TAIWAN'], [P1, 'ARIZONA']]) { if (s === 'ARIZONA' && ka < 1) continue; ctx.fillStyle = s === 'ARIZONA' ? LIME : IVORY; ctx.beginPath(); ctx.arc(p[0], p[1], 10, 0, 7); ctx.fill();
          setFont(ctx, MN(18), 4); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.8); ctx.fillText(s, p[0], p[1] + 40); ctx.textAlign = 'left'; } }
      for (let i = 0; i < 3; i++) popAt(ctx, 180 + i * 150, 190, t, A.pabrik - .2 + i * .15, () => { ctx.fillStyle = IVORY; ctx.fillRect(-55, -40, 110, 80); ctx.fillRect(-40, -78, 20, 40);
        ctx.fillStyle = 'rgba(11,12,9,.5)'; for (let j = 0; j < 3; j++) ctx.fillRect(-42 + j * 32, -18, 20, 14); }, { rise: 40, from: .3 });
      txt(ctx, '3 PABRIK', 640, 205, t, A.tiga5, MN(26), { ls: 5 });
      txt(ctx, 'INVESTASI > US$65 MILIAR', 60, 330, t, A.enam3 - .1, DSP(84), { ls: 2 });
      srcTag(ctx, 'Sumber: NIST (CHIPS for America), 24 Jul 2024', -840, 440, t, A.chips);
    } },

    { at: A.kita3, name: 'Kita punya apa? Sahabat-AI', via: 'whip', tag: '70 M', draw(ctx, t) {
      const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * gone(t, A.ada - .15, .3);
      fall(ctx, 'KITA PUNYA APA?', 0, 40, t, A.kita3 + .05, DSP(220), { align: 'center', ls: 5, stag: .035 }); ctx.globalAlpha = a0;
      const kp = kq(t, A.ada - .1, .6);
      if (kp > 0) { ctx.save(); ctx.globalAlpha = a0 * kp; ctx.translate(0, (1 - kp) * 90); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.fillStyle = 'rgba(27,28,23,.96)';
        ctx.beginPath(); ctx.roundRect(-820, -400, 700, 800, 40); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = ivo(.12); ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ivo(.08); ctx.fillRect(-820, -320, 700, 2); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(-770, -360, 12, 0, 7); ctx.fill();
        setFont(ctx, MN(22), 3); ctx.fillStyle = IVORY; ctx.fillText('Sahabat-AI', -740, -352); setFont(ctx, MN(15, 400), 2); ctx.fillStyle = ivo(.5); ctx.fillText('MODEL BAHASA TERBUKA', -470, -352); ctx.restore(); }
      bubble(ctx, -160, -200, t, A.jawa - .1, 'BAHASA JAWA', 'Sugeng enjing.');
      bubble(ctx, -160, -40, t, A.sunda - .1, 'BAHASA SUNDA', 'Wilujeng enjing.');
      bubble(ctx, -160, 120, t, A.bali - .1, 'BAHASA BALI', 'Rahajeng semeng.');
      bubble(ctx, -160, 280, t, A.batak - .1, 'BAHASA BATAK', 'Horas!');
      txt(ctx, 'dilatih paham bahasa daerah', -470, -260, t, A.dia, SRF(32), { align: 'center', col: ivo(.7) });
      fall(ctx, 'SAHABAT-AI', 60, -220, t, A.sahabat, DSP(150), { ls: 4 });
      slab(ctx, 'INDOSAT × GOTO', 60, -120, t, A.indosat, { size: 24 });
      if (t > A.tujuh2 - .1) { setFont(ctx, DSP(200), 2); ctx.fillStyle = LIME; ctx.textAlign = 'left'; ctx.fillText(fmt(Math.round(countTo(0, 70, t, A.tujuh2 - .1, .8))), 60, 120); }
      txt(ctx, 'MILIAR PARAMETER', 60, 180, t, A.miliar4, MN(28), { ls: 6 });
      srcTag(ctx, 'Sumber: GoTo (2 Jun 2025); Komdigi (7 Agu 2026)', 60, 440, t, A.indosat);
    } },

    { at: A.parameter2, name: 'Parameter = kenop', via: 'rise', tag: 'KENOP', draw(ctx, t) {
      slab(ctx, 'PARAMETER ≈ KENOP KECIL', 0, -400, t, A.parameter2, { align: 'center', size: 26 });
      const km = E.inOutCubic(inv(A.makin - .1, A.makin + .7, t)), kpat = E.inOutCubic(inv(A.pola - .2, A.pola + 1.0, t)), a0 = ctx.globalAlpha;
      const ang = (x, y, i) => { const free = rnd(i * 1.7) * 6.28 + (t > A.disetel ? Math.sin((t - A.disetel) * (2 + rnd(i) * 3) + i) * 1.4 * (1 - kpat) : 0);
        const pat = Math.atan2(Math.cos(x / 180 + y / 260) * 1.2, 1) - Math.PI / 2 + Math.sin(y / 120) * .6; return lerp(free, pat, kpat); };
      const onPat = (x, y) => Math.abs(y - (Math.sin(x / 210) * 150 - 20)) < 40;
      if (km < 1) { ctx.globalAlpha = a0 * (1 - km) * kq(t, A.parameter2 - .1, .5);
        for (let i = 0; i < 24; i++) { const x = -575 + (i % 6) * 230, y = -250 + Math.floor(i / 6) * 160; knob(ctx, x, y, 52 * clamp(pop(t, A.kenop - .3 + i * .03)), ang(x, y, i), false); } }
      if (km > 0) { ctx.globalAlpha = a0 * km;
        for (let i = 0; i < 160; i++) { const x = -760 + (i % 20) * 80, y = -290 + Math.floor(i / 20) * 74; const s = clamp(pop(t, A.makin - .1 + (i % 20) * .015 + Math.floor(i / 20) * .02));
          knob(ctx, x, y, 28 * s, ang(x, y, i + 50), kpat > .5 && onPat(x, y)); } }
      ctx.globalAlpha = a0;
      txt(ctx, 'disetel waktu AI belajar', 0, 345, t, A.disetel, SRF(48), { align: 'center', a: 1 - kq(t, A.makin - .2, .3) });
      markLine(ctx, 'makin banyak kenop → makin banyak ', 'pola', '', 0, 345, t, A.makin2 - .3, A.pola, SRF(48), { ls: 0 });
      txt(ctx, 'SAHABAT-AI: 70 MILIAR KENOP', 0, 420, t, A.kenopnya, MN(20), { align: 'center', ls: 5, col: ivo(.65) });
    } },

    { at: A.investasi3, name: 'Microsoft US$1,7 M · Indosat 1 GW', via: 'push', tag: '1 GW', draw(ctx, t) {
      plate(ctx, V.server, t, 0, 0, 1720, 920, kq(t, A.investasi3 - .3, .7), { t0: A.investasi3 - .3, dim: .78, marks: false });
      fall(ctx, 'INVESTASI ASING MULAI MASUK', -820, -330, t, A.investasi3 + .05, DSP(100), { ls: 3, stag: .02 });
      const kb = kq(t, A.masuk - .1, .6);
      if (kb > 0) { ctx.strokeStyle = ivo(.6); ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.strokeRect(-820, -230, 760 * kb, 470); ctx.setLineDash([]); }
      txt(ctx, 'INDONESIA', -800, -195, t, A.masuk, MN(18), { ls: 6, col: ivo(.7) });
      for (let i = 0; i < 4; i++) { const k = kq(t, A.masuk + i * .12, .5); if (k <= 0) continue; ctx.fillStyle = ivo(.8 * (1 - k * .6)); const x = lerp(40, -40, k) + i * 0, y = -150 + i * 22;
        ctx.beginPath(); ctx.moveTo(x - 30, y - 10); ctx.lineTo(x - 50, y); ctx.lineTo(x - 30, y + 10); ctx.fill(); }
      slab(ctx, 'MICROSOFT', -780, -110, t, A.microsoft, { size: 24 });
      if (t > A.satu2 - .1) { setFont(ctx, DSP(170), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('US$' + fmt(countTo(0, 1.7, t, A.satu2 - .1, .8), 1), -780, 90); }
      txt(ctx, 'MILIAR · KOMITMEN', -780, 140, t, A.miliar5, MN(22), { ls: 5, col: ivo(.75) });
      slab(ctx, 'CLOUD + AI', -780, 200, t, A.cloud, { size: 22 });
      stack(ctx, -220, 200, 4, t, A.satu2, { th: 16, rx: 80, step: .08 });
      const GX = 450, GY = 120, R = 250, kg = kq(t, A.indosat2 - .2, .6), kf = E.outCubic(inv(A.satu3 - .3, A.gigawatt + .2, t));
      if (kg > 0) { ctx.lineCap = 'butt'; ctx.lineWidth = 30; ctx.strokeStyle = ivo(.14); ctx.beginPath(); ctx.arc(GX, GY, R, Math.PI, Math.PI + Math.PI * kg); ctx.stroke();
        ctx.strokeStyle = LIME; ctx.beginPath(); ctx.arc(GX, GY, R, Math.PI, Math.PI + Math.PI * kf); ctx.stroke(); ctx.lineCap = 'round';
        ctx.fillStyle = ivo(.4); for (let i = 0; i <= 10; i++) { const a = Math.PI + Math.PI * i / 10; ctx.fillRect(GX + Math.cos(a) * (R - 40) - 2, GY + Math.sin(a) * (R - 40) - 2, 4, 4); } }
      txt(ctx, 'PUSAT KOMPUTASI AI · INDOSAT', GX, -230, t, A.indosat2, MN(20), { align: 'center', ls: 4, col: ivo(.8) });
      slab(ctx, 'TARGET', GX, -180, t, A.indosat2 + .2, { align: 'center', size: 18, lime: true });
      if (t > A.satu3 - .1) { setFont(ctx, DSP(160), 2); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('1 GW', GX, GY - 10); ctx.textAlign = 'left'; }
      const kt = kq(t, A.tiga6 - .1, .6); if (kt > 0) { ctx.fillStyle = ivo(.7); ctx.fillRect(GX - 220, 250, 440 * kt, 3);
        for (let i = 0; i < 3; i++) popAt(ctx, GX - 220 + i * 220 + 110, 250, t, A.tiga6 + i * .12, () => { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 8, 0, 7); ctx.fill(); setFont(ctx, MN(16), 2); ctx.textAlign = 'center'; ctx.fillText('TAHUN ' + (i + 1), 0, 36); ctx.textAlign = 'left'; }, { from: .2 }); }
      srcTag(ctx, 'Sumber: Komdigi (Agu–Sep 2026)', -840, 440, t, A.microsoft);
    } },

    { at: A.dan2, name: 'SATRIA-1', via: 'truck', tag: 'SATRIA-1', draw(ctx, t) {
      plate(ctx, V.satelit, t, 0, 0, 1720, 920, kq(t, A.dan2 - .3, .7), { t0: A.dan2 - .3, dim: .45 });
      evid(ctx, IM.antara, -420, -210, 760, t, A.satria - .1, { tab: 'ANTARA · 10 DES 2025', rot: -1.2, crop: [0, .13, .92, .38] });
      fall(ctx, 'SATRIA-1', 80, -230, t, A.satria, DSP(170), { ls: 5 });
      txt(ctx, 'satelit internet negara', 80, -150, t, A.satelit, SRF(50));
      if (t > A.seratus2 - .15) { setFont(ctx, DSP(190), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(fmt(Math.round(countTo(0, 150, t, A.seratus2 - .15, 1.1))), 80, 60); }
      txt(ctx, 'GIGABIT PER DETIK', 80, 110, t, A.gigabit, MN(24), { ls: 5 });
      slab(ctx, 'BEROPERASI SEJAK 2024', 80, 190, t, A.beroperasi, { size: 22 });
      slab(ctx, 'PENCAPAIAN NYATA', 80, 270, t, A.nyata, { size: 30, lime: true });
      caption(ctx, 'Satelit (ilustrasi CG) · Pixabay', -840, 400, t, A.dan2 + .4);
      srcTag(ctx, 'Sumber: Antara, 10 Des 2025 · kapasitas & tahun operasi', -840, 440, t, A.satria);
    } },

    { at: A.satelit2, name: 'Berangkat dari Florida', via: 'cut', lead: 0, tag: 'FLORIDA', draw(ctx, t) {
      txt(ctx, 'Satelit kebanggaan kita itu', 0, -260, t, A.satelit2 + .05, SRF(54), { align: 'center', col: ivo(.8) });
      txt(ctx, 'berangkat ke orbit…', 0, -180, t, A.berangkat, SRF(54), { align: 'center', col: ivo(.8) });
      const kr = E.inCubic(inv(A.berangkat - .2, A.jalannya + .3, t)) * .75;      // a slow lift-off trail climbing the right edge
      if (kr > 0) { const y = 420 - 900 * kr, a0 = ctx.globalAlpha; const g = ctx.createLinearGradient(0, y, 0, 440); g.addColorStop(0, ivo(.85)); g.addColorStop(1, ivo(0));
        ctx.fillStyle = g; ctx.fillRect(700 - 3, y, 6, 440 - y); ctx.shadowColor = ivo(.9); ctx.shadowBlur = 24; ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(700, y, 10, 0, 7); ctx.fill(); ctx.shadowBlur = 0; ctx.beginPath(); ctx.fill(); ctx.globalAlpha = a0; }
      fall(ctx, 'FLORIDA.', 0, 110, t, A.florida, DSP(230), { align: 'center', ls: 6, stag: .03 });
      txt(ctx, 'AMERIKA.', 0, 210, t, A.amerikaF, MN(34), { align: 'center', ls: 14, col: ivo(.75), rise: 0 });
    } },

    { at: A.jalannya, name: 'Uang. Dan manusia.', via: 'whip', tag: 'JALAN', draw(ctx, t) {
      plate(ctx, V.serat, t, 0, 0, 1760, 960, kq(t, A.jalannya - .3, .7), { t0: A.jalannya - .3, dim: .4 });
      const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * gone(t, A.uang - .2, .4);
      txt(ctx, 'Jalannya sudah ada,', 0, -150, t, A.jalannya + .05, SRF(70), { align: 'center' });
      markLine(ctx, 'walau ', 'belum mulus.', '', 0, -60, t, A.belum - .3, A.mulus, SRF(70), { ls: 0 });
      typeOn(ctx, 'APA YANG LEWAT DI JALAN ITU?', 0, 80, t, A.apa2 - .1, MN(34), { align: 'center', ls: 6, cps: 28 });
      ctx.globalAlpha = a0;
      fall(ctx, 'UANG.', 0, 60, t, A.uang, DSP(240), { align: 'center', ls: 6, col: LIME });
      fall(ctx, 'DAN MANUSIA.', 0, 290, t, A.dan3, DSP(240), { align: 'center', ls: 6 });
    }, mod(c, t) { const k = E.inCubic(inv(A.uang + .3, DUR, t)); c.dist -= 1250 * k; c.foc = c.dist; } },
  ];

  // ── gates + chapter ──────────────────────────────────────────────────────────────────────────────────────────
  for (const s of ST) {                                    // nothing of a station shows before it is reached
    const at = s.at, wrap = fn => fn && ((ctx, t, c) => { if (s === ST[0]) return fn(ctx, t, c); const g = clamp((t - at + .5) / .35); if (g <= 0) return; ctx.globalAlpha = g; fn(ctx, t, c); });
    s.draw = wrap(s.draw); for (const L of s.layers || []) L.fn = wrap(L.fn);
  }
  let FULLS;                                                 // full-frame tilted articles (kit evidFull)
  return makeChapter({ B, ST, load, label: 'BAB 02 · JALAN TOL DATA', over: null,
    full: () => FULLS ??= [{ im: IM.medcom, t0: A.rumah2 + .1, t1: A.rumah2 + 3.9, dir: 1, tab: 'MEDCOM · 29 OKT 2026', hl: [[.572, .268, .298, .08, A.rumah2 + .8], [.075, .374, .47, .08, A.rumah2 + 1.8]] }] });
}
