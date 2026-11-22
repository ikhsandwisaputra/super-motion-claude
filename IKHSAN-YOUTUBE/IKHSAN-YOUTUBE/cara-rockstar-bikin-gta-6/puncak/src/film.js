// Bab Puncak · "Badai di balik layar" (VO 08, 82.7 s).
//  S0 0–7.3      US$2,36 MILIAR SEHARI counter over the full-bleed official aerial ocean still (calm sea); "tanpa badai?" + sub at "badai"
//  S1 7.3–20.5   Selam Detail (Season 3 moment): TEKANAN BERAT / DI BALIK LAYAR → dive into the D's counter at "Pada" →
//                match-cut out of the "0" of 2022 (SEPTEMBER 2022 · remaja Lapsus$ · Arion Kurtaj)
//  S2 20.4–28    Jalur pembobolan: laptop seized (cross) → STIK STREAMING → TV KAMAR → PONSEL → PESAN INTERNAL.
//                Aksa (once): startled O_O at "stik" → suspicious ¬_¬, "// lewat stik TV?!"
//  S3 27.9–33.8  90 klip mentah: 10×9 clip tiles light up with the counter; US$5 JUTA biaya pemulihan
//  S4 33.8–39.7  Mini timeline DES 2023 · 16 NOV (mengaku bersalah) · 19 NOV (rilis), "3 HARI" bracket → BBC page full-frame
//  S5 39.7–48.2  Edinburgh dark map + pin → HQ photo plane, 19 JAN 2026, 7 fire engines drop, "tanpa korban."
//  S6 48.2–57.3  Glasgow tribunal, 34 tally marks → BBC "staff sacked" full-frame
//  S7 57.3–67.3  Two balanced columns IWGB | STUDIO with a balance beam that tilts per side and settles level
//  S8 67.3–75.1  Kunci sebenarnya: native bars 2,36 vs 8,2 (lime = the chapter's one accent)
//  S9 75.1–end   BUKAN KEBERUNTUNGAN struck through → triptych MESIN RAGE / 12 STUDIO GLOBAL / KOMUNITAS STREAMER → out-portal
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, MONO, timing, makeChapter, loadImg, loadVid,
  srcTag, txt, countTo, fmt, gone, plate, typeOn } from './kit.js';
import { latar, aksaShow, selam, counterOf, bake, GRADE_DOC } from './s3.js';

const ROOM = '#0B0C09';
const vf = (V, lt, sp = 1) => { const n = V.n, per = 2 * (n - 1), m = Math.floor(Math.max(0, lt) * V.fps * sp) % per; return V.img[m < n ? m : per - m]; };
function cover(g, im, x, y, w, h, z = 1, ox = 0, oy = 0) { const s = Math.max(w / im.width, h / im.height) * z; g.drawImage(im, x + w / 2 - im.width * s / 2 + ox, y + h / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); }
function fallLine(o, str, x, y, t, t0, size = 122, align = 'left') {
  if (t <= t0) return; setFont(o, DSP(size), 2); o.textAlign = 'left'; o.fillStyle = IVORY; const a0 = o.globalAlpha, tw = o.measureText(str).width, x0 = align === 'center' ? x - tw / 2 : x;
  for (let i = 0; i < str.length; i++) { const s = t - t0 - i * .022; if (s <= 0) break; o.globalAlpha = a0 * clamp(s / .08); o.fillText(str[i], x0 + o.measureText(str.slice(0, i)).width, y + (1 - spring(s, .55, .36)) * -70); }
  o.globalAlpha = a0; return tw;
}
// clean vector line icons (ivory strokes), centred on x, y
function icon(o, kind, x, y, s = 1) {
  o.save(); o.translate(x, y); o.scale(s, s); o.strokeStyle = IVORY; o.fillStyle = IVORY; o.lineWidth = 5; o.lineJoin = 'round'; o.lineCap = 'round';
  const rr = (x, y, w, h, r) => { o.beginPath(); o.roundRect(x, y, w, h, r); };
  if (kind === 'laptop') { rr(-90, -66, 180, 112, 10); o.stroke(); o.beginPath(); o.moveTo(-118, 60); o.lineTo(118, 60); o.lineTo(104, 74); o.lineTo(-104, 74); o.closePath(); o.stroke(); }
  if (kind === 'stik') { rr(-96, -24, 150, 48, 12); o.stroke(); rr(54, -13, 40, 26, 4); o.stroke(); o.beginPath(); o.arc(-62, 0, 7, 0, 7); o.fill(); }
  if (kind === 'tv') { rr(-110, -72, 220, 136, 10); o.stroke(); o.beginPath(); o.moveTo(-40, 92); o.lineTo(40, 92); o.moveTo(0, 64); o.lineTo(0, 92); o.stroke(); }
  if (kind === 'hp') { rr(-44, -80, 88, 160, 16); o.stroke(); o.beginPath(); o.moveTo(-14, -62); o.lineTo(14, -62); o.stroke(); }
  if (kind === 'chat') { rr(-96, -62, 192, 104, 18); o.stroke(); o.beginPath(); o.moveTo(-50, 42); o.lineTo(-62, 74); o.lineTo(-20, 42); o.stroke();
    for (let i = 0; i < 3; i++) { o.globalAlpha *= 1; o.fillRect(-66, -36 + i * 26, [132, 104, 70][i], 9); } }
  if (kind === 'truk') { o.fillRect(-46, -16, 70, 34); o.fillRect(26, -6, 26, 24); o.lineWidth = 4; o.beginPath(); o.moveTo(-44, -26); o.lineTo(20, -26); o.moveTo(-36, -26); o.lineTo(-36, -16); o.moveTo(8, -26); o.lineTo(8, -16); o.stroke();
    o.fillStyle = ROOM; o.fillRect(32, -1, 14, 9); o.fillStyle = IVORY; o.beginPath(); o.arc(-26, 22, 9, 0, 7); o.arc(30, 22, 9, 0, 7); o.fill(); }
  o.restore();
}

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {}, SH = '../assets/shared/';
  async function load() {
    const R = SH + 'rockstar-resmi/';
    [IM.laut, IM.malam, IM.sky, IM.mapE, IM.hq, IM.bbcH, IM.bbcS, IM.blr, IM.win] = await Promise.all([
      loadImg(R + 'gtavi-07-leonida-keys-aerial-ocean.jpg', 1920), loadImg(R + 'gtavi-06-vice-city-night-cityscape.jpg', 1920), loadImg(R + 'gtavi-02-vice-city-skyline-day.jpg', 1920),
      loadImg(SH + 'peta/rockstar-north-edinburgh-3d_gelap-z16.png', 1920), loadImg(SH + 'cc/commons-rockstar-north-hq-edinburgh-scotland.jpg', 640),
      loadImg(SH + 'kutipan/bbc-gta-6-hacker-pleads-guilty-after-release.png', 2248), loadImg(SH + 'kutipan/bbc-grand-theft-auto-staff-sacked-as-shock.png', 2248),
      loadImg(SH + 'peta/rockstar-india-bengaluru-3d_gelap-z15.png', 1400), loadImg(SH + 'cc/commons-windah-basudara-di-tahun-2022-tanpa-latar-birefnet-portrait.png', 490)]);
    [V.garasi, V.inter, V.lorong, V.telepon, V.lucia, V.nyetir] = await Promise.all(
      ['garasi', 'interogasi', 'lorong', 'telepon', 'lucia', 'nyetir'].map(n => loadVid(SH + 'vid/', n)));
    IM.malamD = bake(IM.malam, 'saturate(.55) brightness(.42) contrast(1.05)', 1920);
    IM.skyD = bake(IM.sky, 'saturate(.5) brightness(.4) contrast(1.05)', 1920);
    IM.hqB = bake(IM.hq, 'blur(14px) saturate(.5) brightness(.5)', 640);
    IM.hqG = bake(IM.hq, 'saturate(.8) contrast(1.06) brightness(.92)', 640);
    await aksa.load();
  }

  // Rupiah pendamping angka US$ (layar saja, kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$): kecil, ivory, bukan lime.
function rupiah(ctx, str, x, y, t, t0, a = 1, align = 'left', px = 30) {
  if (t < t0) return; const k = E.outQuint(inv(t0, t0 + .35, t));
  ctx.save(); ctx.globalAlpha = a * k; setFont(ctx, MN(px), 2); ctx.textAlign = align; ctx.fillStyle = ivo(.78);
  ctx.fillText(str, x, y + (1 - k) * 10); ctx.restore(); }

// ── S0 · US$2,36 miliar sehari ──────────────────────────────────────────────────────────────────────────────
  const S0 = { at: 0, name: 'Sehari', draw(ctx, t) {
    const g = gone(t, A.kenyataan - .4, .3); if (g <= 0) return; ctx.globalAlpha = g;
    typeOn(ctx, 'PENDAPATAN HARI PERTAMA', 0, -300, t, .3, MN(26), { align: 'center', ls: 7, col: ivo(.8), cps: 40 });
    const sh = t > A.badai ? Math.exp(-(t - A.badai) / .14) * 16 * Math.sin((t - A.badai) * 90) : 0;      // the calm cracks at "badai"
    if (t > A.miliar - 1.35) { const kk = E.outQuint(inv(A.miliar - 1.35, A.miliar - .9, t)), n = countTo(0, 2.36, t, A.miliar - 1.3, 1.3);
      ctx.save(); ctx.translate(sh, (1 - kk) * 60); ctx.globalAlpha = g * kk; setFont(ctx, DSP(150), 2); ctx.textAlign = 'right'; ctx.fillStyle = ivo(.8); ctx.fillText('US$', -250, 20);
      setFont(ctx, DSP(340), 2); ctx.textAlign = 'left'; ctx.fillStyle = IVORY; ctx.fillText(fmt(n, 2), -230, 80); const rx = -230 + ctx.measureText(fmt(2.36, 2)).width + 34; ctx.restore(); ctx.textAlign = 'left';
      rupiah(ctx, '≈ Rp43,1 triliun', rx, 74, t, A.miliar + .3, g, 'left'); }
    txt(ctx, 'miliar dolar, sehari.', 0, 200, t, A.sehari - .05, SRF(92), { align: 'center' });
    ctx.save(); ctx.translate(sh * .6, 0); txt(ctx, 'tanpa badai?', 0, 345, t, A.tanpa, SRF(72), { align: 'center', col: ivo(.85) }); ctx.restore();
    typeOn(ctx, 'BANYAK YANG MENYANGKA SEMUA MULUS', 0, 262, t, A.banyak + .1, MN(22), { align: 'center', ls: 6, col: ivo(.6), cps: 46 });
    ctx.globalAlpha = g; srcTag(ctx, 'Sumber: Sensor Tower via Deadline & TweakTown, Nov 2026 · kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', -880, 470, t, .9);
  } };

  // ── S1 · Selam Detail: DI BALIK LAYAR → 2022 ──────────────────────────────────────────────────────────────────
  const CSS1 = DSP(290), WORD = 'DI BALIK LAYAR', BY = 840, F = counterOf(WORD, 0, CSS1, W / 2, BY);
  const CSS2 = DSP(400), YR_Y = 640, NF = counterOf('2022', 1, CSS2, W / 2, YR_Y);
  const drop = (g, str, css, y, t, t0, ls = 0) => { setFont(g, css, ls); g.textAlign = 'left'; g.textBaseline = 'alphabetic'; const tw = g.measureText(str).width, x0 = W / 2 - tw / 2;
    for (let i = 0; i < str.length; i++) { const s = t - t0 - i * .04; if (s <= 0) break; g.globalAlpha = clamp(s / .1); g.fillStyle = IVORY; g.fillText(str[i], x0 + g.measureText(str.slice(0, i)).width, y + (1 - spring(s, .55, .38)) * -120); }
    g.globalAlpha = 1; };
  const dive = selam({ t0: A.kenyataan - .1, tc: A.pada, t1: A.padahal + .15, f: [F.x, F.y], r: F.w * .16, nf: [NF.x, NF.y], nr: NF.w * .16,
    page(g, t) {
      if (V.garasi) { g.filter = GRADE_DOC; cover(g, vf(V.garasi, t - A.kenyataan, .8), 0, 0, W, H, 1.04 + .04 * inv(A.kenyataan, A.pada, t)); g.filter = 'none'; }
      g.fillStyle = 'rgba(11,12,9,.52)'; g.fillRect(0, 0, W, H);
      typeOn(g, 'PRODUKSI BERTAHUN-TAHUN', W / 2, 250, t, A.produksi, MN(28), { align: 'center', ls: 8, col: ivo(.82), cps: 34 });
      drop(g, 'TEKANAN BERAT', DSP(200), 540, t, A.tekanan - .05, 2);
      drop(g, WORD, CSS1, BY, t, A.balik - .3, 0);
      const pk = E.outCubic(inv(A.pada - .75, A.pada - .2, t)); if (pk > 0) {                // the D's counter darkens into a pupil we fall through
        g.fillStyle = ROOM; g.beginPath(); g.ellipse(F.x, F.y, F.w * .2 * pk, F.size * .26 * pk, 0, 0, 7); g.fill(); }
    },
    next(g, t) {
      if (V.inter) { g.filter = GRADE_DOC; cover(g, vf(V.inter, t - A.pada, .7), 0, 0, W, H, 1.06); g.filter = 'none'; }
      g.fillStyle = 'rgba(11,12,9,.56)'; g.fillRect(0, 0, W, H);
      typeOn(g, 'SEPTEMBER', W / 2, 270, t, A.pada + .3, MN(32), { align: 'center', ls: 12, col: ivo(.85), cps: 30 });
      setFont(g, CSS2, 0); g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = IVORY; g.fillText('2022', W / 2, YR_Y);
      typeOn(g, 'REMAJA · ANGGOTA LAPSUS$', W / 2, 760, t, A.remaja, MN(28), { align: 'center', ls: 6, col: ivo(.85), cps: 30 });
      txt(g, 'Arion Kurtaj', W / 2, 880, t, A.arion - .05, SRF(96), { align: 'center' });
      typeOn(g, 'MEMBOBOL PESAN INTERNAL ROCKSTAR', W / 2, 965, t, A.membobol, MN(26), { align: 'center', ls: 5, col: ivo(.75), cps: 44 });
      srcTag(g, 'Sumber: BBC & The Guardian', 64, 1036, t, A.remaja + .2);
      g.textAlign = 'left';
    } });

  // ── S2 · Jalur pembobolan (Aksa) ────────────────────────────────────────────────────────────────────────────────
  const aksa = aksaShow({ t: A.stik - .92, x: 1500, y: 1095, s: .75, stay: 6.5, shock: .1, face: [[.7, 'O_O'], [2.0, '¬_¬'], [3.85, '>_<']] });
  const NODES = [['stik', 'STIK STREAMING AMAZON', 'stik'], ['tv', 'TV KAMAR HOTEL', 'televisi'], ['hp', 'PONSEL', 'kamar+0.2'], ['chat', 'PESAN INTERNAL', 'kamar+0.55']];
  const NX = [-600, -170, 250, 640], NY = -110;
  const S2 = { name: 'Stik streaming', draw(ctx, t) {
    const at = s => s.includes('+') ? A[s.split('+')[0]] + +s.split('+')[1] : A[s];
    // the seized laptop: centre stage, then it shrinks to the top-left corner when the chain starts
    const kl = E.outQuint(inv(A.komputer - .1, A.komputer + .4, t)), mv = E.inOutCubic(inv(A.nekat - .2, A.nekat + .4, t));
    if (kl > 0) { const x = lerp(0, -760, mv), y = lerp(-120, -360, mv), s = lerp(1.25, .55, mv) * (.8 + .2 * kl);
      ctx.globalAlpha = kl * lerp(1, .55, mv); icon(ctx, 'laptop', x, y, s);
      const kx = E.snap(inv(A.ditahan - .05, A.ditahan + .2, t)); if (kx > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = IVORY; ctx.lineWidth = 9; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-50 * kx, -40 * kx); ctx.lineTo(50 * kx, 40 * kx); ctx.moveTo(50 * kx, -40 * kx); ctx.lineTo(-50 * kx, 40 * kx); ctx.stroke(); ctx.restore(); }
      ctx.globalAlpha = kl * (1 - mv); txt(ctx, 'KOMPUTERNYA DITAHAN POLISI', 0, 90, t, A.komputer + .1, MN(30), { align: 'center', ls: 6, col: ivo(.9) });
      ctx.globalAlpha = mv * .7; setFont(ctx, MN(18), 4); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('DITAHAN POLISI', -760, -300); ctx.textAlign = 'left'; ctx.globalAlpha = 1; }
    if (t > A.nekat - .2) typeOn(ctx, 'JALUR YANG DIA PAKAI', 0, -330, t, A.nekat, MN(26), { align: 'center', ls: 8, col: ivo(.75), cps: 40 });
    // chain: a line draws node to node, each node pops in on its word
    for (let i = 0; i < 4; i++) { const t0 = at(NODES[i][2]), k = E.outQuint(inv(t0 - .05, t0 + .35, t)); if (k <= 0) continue;
      if (i > 0) { const u = E.inOutCubic(inv(t0 - .3, t0, t)), x0 = NX[i - 1] + 130, x1 = NX[i] - 130;
        ctx.globalAlpha = .7; ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.setLineDash([12, 12]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(x0, NY); ctx.lineTo(lerp(x0, x1, u), NY); ctx.stroke(); ctx.setLineDash([]);
        if (u >= 1) { ctx.beginPath(); ctx.moveTo(x1 - 16, NY - 12); ctx.lineTo(x1, NY); ctx.lineTo(x1 - 16, NY + 12); ctx.stroke(); } }
      const s = spring(t - t0 + .05, .5, .4), lit = i === 3 ? 1 : .9;
      ctx.globalAlpha = clamp(k * 1.6) * lit; icon(ctx, NODES[i][0], NX[i], NY + (1 - k) * 40, .6 + .4 * s);
      ctx.globalAlpha = k; setFont(ctx, MN(20), 4); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.88); ctx.fillText(NODES[i][1], NX[i], NY + 140); ctx.textAlign = 'left'; }
    ctx.globalAlpha = 1; srcTag(ctx, 'Sumber: BBC & The Guardian', -140, 470, t, A.nekat + .3);
  } };

  // ── S3 · 90 klip mentah · US$5 juta ────────────────────────────────────────────────────────────────────────────
  const S3 = { name: '90 klip', draw(ctx, t) {
    const n = Math.floor(countTo(0, 90, t, A.n90 - .6, 1.05)), dim = lerp(1, .45, E.inOutCubic(inv(A.biaya - .2, A.biaya + .4, t)));
    const TW = 78, TH = 44, GX = 40, GY = -300, CL = [V.garasi, V.lorong, V.nyetir, V.inter];
    for (let i = 0; i < 90; i++) { const c = i % 10, r = Math.floor(i / 10), x = GX + c * (TW + 8), y = GY + r * (TH + 8);
      ctx.globalAlpha = .22 * dim; ctx.strokeStyle = IVORY; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, TW, TH);
      if (i < n) { const Vc = CL[(i * 7) % 4]; if (!Vc) continue; const im = vf(Vc, t + i * .37, .6), lit = clamp((t - (A.n90 - .6) - i * 1.05 / 90) / .15);
        ctx.globalAlpha = dim * (.55 + .45 * lit); ctx.filter = 'saturate(.5) brightness(.8)'; ctx.drawImage(im, x, y, TW, TH); ctx.filter = 'none'; } }
    ctx.globalAlpha = 1;
    if (t > A.n90 - .65) { const k = E.outQuint(inv(A.n90 - .65, A.n90 - .2, t)); ctx.globalAlpha = k * lerp(1, .55, E.inOutCubic(inv(A.biaya - .2, A.biaya + .3, t)));
      setFont(ctx, DSP(330), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(String(Math.max(n, 0)), -860, 0 + (1 - k) * 50); ctx.globalAlpha = 1; }
    txt(ctx, 'KLIP MENTAH DICURI', -856, 70, t, A.klip - .1, MN(28), { ls: 6, col: ivo(.9) });
    txt(ctx, 'BIAYA PEMULIHAN', -856, 190, t, A.biaya - .05, MN(26), { ls: 6, col: ivo(.8) });
    if (t > A.biaya + .05) { const k = E.outQuint(inv(A.biaya + .05, A.biaya + .4, t)), v = countTo(0, 5, t, A.biaya + .1, .6);
      ctx.globalAlpha = k; setFont(ctx, DSP(170), 2); ctx.fillStyle = IVORY; ctx.fillText(`US$${fmt(v, 0)} JUTA`, -860, 360 + (1 - k) * 40);
      const pu = t > A.dolar ? Math.exp(-(t - A.dolar) / .14) : 0; if (pu > .02) { ctx.globalAlpha = pu * .5; ctx.fillText(`US$${fmt(v, 0)} JUTA`, -860 + pu * 10, 360); } ctx.globalAlpha = 1;
      rupiah(ctx, '≈ Rp91,3 miliar', -858, 420, t, A.biaya + 1.0, 1, 'left'); }
    srcTag(ctx, 'Sumber: BBC & The Guardian · kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', -880, 470, t, A.mencuri + .2);
  } };

  // ── S4 · Tiga hari ────────────────────────────────────────────────────────────────────────────────────────────
  const TL = [[-640, 'DES 2023', 'perintah rawat RS jiwa', 'tepat+0.15', .5], [260, '16 NOV 2026', 'MENGAKU BERSALAH', 'tiga', 1], [640, '19 NOV 2026', 'GTA VI RILIS', 'rilis-0.1', 1]];
  const S4 = { name: 'Tiga hari', draw(ctx, t) {
    const at = s => /[+-]/.test(s) ? A[s.split(/[+-]/)[0]] + parseFloat(s.slice(s.search(/[+-]/))) : A[s];
    const kl = E.inOutCubic(inv(A.tepat + .5, A.tepat + 1.3, t)); ctx.globalAlpha = .6; ctx.fillStyle = IVORY; ctx.fillRect(-780, 38, 1560 * kl, 4);
    for (const [x, d, l, s, a] of TL) { const t0 = at(s), k = E.outQuint(inv(t0, t0 + .4, t)); if (k <= 0) continue; const sp = spring(t - t0, .5, .4);
      ctx.globalAlpha = k * a; ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, 40, 14 * sp, 0, 7); ctx.fill();
      setFont(ctx, DSP(84), 2); ctx.textAlign = 'center'; ctx.fillText(d, x, -30 - (1 - k) * 30); setFont(ctx, MN(22), 4); ctx.fillStyle = ivo(.85); ctx.fillText(l, x, 110); ctx.textAlign = 'left'; }
    const kb = E.outQuint(inv(A.tiga + .7, A.tiga + 1.2, t)); if (kb > 0) { const x0 = 260, x1 = lerp(260, 640, kb), y = 190;
      ctx.globalAlpha = 1; ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y - 22); ctx.lineTo(x0, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y - 22); ctx.stroke();
      setFont(ctx, DSP(120), 2); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.globalAlpha = kb; ctx.fillText('3 HARI', 450, 330); ctx.textAlign = 'left'; }
    ctx.globalAlpha = 1; fallLine(ctx, 'TEPAT SEBELUM RILIS', -860, -260, t, A.tepat + .7, 130);
    srcTag(ctx, 'Sumber: BBC, 16 Nov 2026 & The Guardian, Des 2023', -880, 470, t, A.tepat + 1.1);
  } };

  // ── S5 · Edinburgh: mesin pemanas ─────────────────────────────────────────────────────────────────────────────
  const S5 = { name: 'Rockstar North', draw(ctx, t) {
    if (t < A.januari - .1) { ctx.globalAlpha = 1; srcTag(ctx, 'Peta: AWS Terrain | © OpenFreeMap | © OpenStreetMap contributors', -880, 470, t, A.belum + .4); return; }
    const k = E.outQuint(inv(A.januari - .1, A.januari + .5, t)), ph = 760, pw = ph * IM.hqG.width / IM.hqG.height, px = 430, py = -20;
    ctx.save(); ctx.globalAlpha = k; ctx.translate(px + (1 - k) * 260, py); ctx.rotate((1 - k) * .06 + .012);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = ROOM; ctx.fillRect(-pw / 2, -ph / 2, pw, ph); ctx.shadowColor = 'transparent';
    ctx.beginPath(); ctx.rect(-pw / 2, -ph / 2, pw, ph); ctx.clip(); cover(ctx, IM.hqG, -pw / 2, -ph / 2, pw, ph, 1.02 + .08 * inv(A.januari, A.lalu, t));
    ctx.restore(); ctx.save(); ctx.globalAlpha = k; ctx.translate(px + (1 - k) * 260, py); ctx.rotate((1 - k) * .06 + .012); ctx.strokeStyle = ivo(.85); ctx.lineWidth = 3; ctx.strokeRect(-pw / 2, -ph / 2, pw, ph); ctx.restore();
    ctx.globalAlpha = 1; fallLine(ctx, '19 JAN 2026', -860, -150, t, A.januari, 170);
    typeOn(ctx, 'MESIN PEMANAS GEDUNG RUSAK', -856, -60, t, A.mesin, MN(28), { ls: 5, col: ivo(.9), cps: 30 });
    for (let i = 0; i < 7; i++) { const s = t - A.tujuh - i * .1; if (s <= 0) continue; ctx.globalAlpha = clamp(s / .08); icon(ctx, 'truk', -815 + i * 116, 70 + (1 - spring(s, .45, .38)) * -90, .82); }
    ctx.globalAlpha = 1; txt(ctx, '7 MOBIL PEMADAM DATANG', -856, 160, t, A.tujuh + .5, MN(24), { ls: 5, col: ivo(.85) });
    txt(ctx, 'tanpa korban.', -858, 290, t, A.datang + .1, SRF(84));
    ctx.globalAlpha = .9; srcTag(ctx, 'Foto: Thomas Nugent / Wikimedia Commons (CC BY-SA 2.0) | Sumber: GamesIndustry.biz, 19 Jan 2026', -880, 470, t, A.januari + .5);
  } };

  // ── S6 · Glasgow, 34 eks staf ─────────────────────────────────────────────────────────────────────────────────
  const S6 = { name: 'Glasgow', draw(ctx, t) {
    typeOn(ctx, 'PEKAN PELUNCURAN · NOV 2026', 0, -330, t, A.pekan, MN(28), { align: 'center', ls: 8, col: ivo(.85), cps: 36 });
    fallLine(ctx, 'PENGADILAN KETENAGAKERJAAN', 0, -150, t, A.pengadilan - .05, 140, 'center');
    txt(ctx, 'Glasgow', 0, -50, t, A.glasgow - .05, SRF(86), { align: 'center', col: ivo(.92) });
    const n = Math.floor(countTo(0, 34, t, A.pemecatan, A.n34 - A.pemecatan + .1)), X0 = -560;
    for (let i = 0; i < n; i++) { const gI = Math.floor(i / 5), j = i % 5, x = X0 + gI * 168 + j * 26, s = t - A.pemecatan - i * (A.n34 - A.pemecatan) / 34;
      const dy = (1 - spring(Math.max(0, s), .5, .3)) * -40; ctx.globalAlpha = clamp(s / .06); ctx.fillStyle = IVORY;
      if (j < 4) ctx.fillRect(x, 70 + dy, 9, 100); else { ctx.save(); ctx.translate(x - 52, 120 + dy); ctx.rotate(-.9); ctx.fillRect(-70, -4.5, 140, 9); ctx.restore(); } }
    ctx.globalAlpha = 1; txt(ctx, '34 EKS STAF ROCKSTAR NORTH DIPECAT', 0, 270, t, A.n34, MN(30), { align: 'center', ls: 6 });
    srcTag(ctx, 'Sumber: BBC, 17 Nov 2026', -880, 470, t, A.pengadilan + .2);
  } };

  // ── S7 · Dua kubu, seimbang ───────────────────────────────────────────────────────────────────────────────────
  const S7 = { name: 'Dua kubu', draw(ctx, t) {
    const ka = E.outQuint(inv(A.iwgb + .3, A.iwgb + .8, t)), kb = E.outQuint(inv(A.sedangkan - .1, A.sedangkan + .4, t));
    // balance beam on the divider: tips to the side that speaks, settles level at the end
    const tilt = -.12 * spring(Math.max(0, t - A.balasan), .35, .9) * (1 - E.inOutCubic(inv(A.sedangkan, A.sedangkan + .6, t)))
      + .12 * spring(Math.max(0, t - A.menyebar), .35, .9) * (1 - E.inOutCubic(inv(A.internal, A.internal + .7, t)));
    const kd = E.outQuint(inv(A.pihak + .2, A.pihak + .9, t)); ctx.globalAlpha = .45 * kd; ctx.fillStyle = IVORY; ctx.fillRect(-2, -250, 4, 560 * kd);
    ctx.save(); ctx.globalAlpha = kd; ctx.translate(0, -300); ctx.rotate(tilt); ctx.fillRect(-300, -4, 600, 8); ctx.beginPath(); ctx.arc(-300, 0, 12, 0, 7); ctx.arc(300, 0, 12, 0, 7); ctx.fill(); ctx.restore();
    ctx.globalAlpha = kd; ctx.beginPath(); ctx.moveTo(-26, -260); ctx.lineTo(0, -300); ctx.lineTo(26, -260); ctx.closePath(); ctx.fill();
    for (const [x, k, head, who, l1, l2, tq] of [[-470, ka, 'IWGB', 'MENURUT SERIKAT PEKERJA', 'balasan terhadap', 'organisasi pekerja', A.balasan], [470, kb, 'ROCKSTAR', 'MENURUT PIHAK STUDIO', 'mereka menyebar', 'informasi internal', A.menyebar]]) {
      if (k <= 0) continue; ctx.globalAlpha = k; setFont(ctx, DSP(170), 3); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(head, x, -100 + (1 - k) * 50);
      setFont(ctx, MN(22), 6); ctx.fillStyle = ivo(.75); ctx.fillText(who, x, -40); ctx.textAlign = 'left';
      txt(ctx, l1, x, 90, t, tq - .05, SRF(70), { align: 'center' }); txt(ctx, l2, x, 175, t, tq + .1, SRF(70), { align: 'center' }); }
    ctx.globalAlpha = 1; srcTag(ctx, 'Sumber: BBC, 17 Nov 2026', -880, 470, t, A.iwgb + .6);
  } };

  // ── S8 · Kunci sebenarnya: 2,36 vs 8,2 ────────────────────────────────────────────────────────────────────────
  const S8 = { name: 'Kunci 8,2', draw(ctx, t) {
    fallLine(ctx, 'KUNCI SEBENARNYA', -860, -250, t, A.kunci - .1, 140);
    txt(ctx, 'GTA 6 menopang', -858, -140, t, A.menopang - .1, SRF(64)); txt(ctx, 'target Take-Two', -858, -66, t, A.taketwo - .1, SRF(64));
    const BASE = 330, MAXH = 560, k0 = E.outQuint(inv(A.gta - .1, A.gta + .5, t)); ctx.globalAlpha = .5 * k0; ctx.fillStyle = IVORY; ctx.fillRect(60, BASE, 720 * k0, 3);
    const k1 = E.outQuint(inv(A.gta, A.gta + .7, t)), h1 = MAXH * 2.36 / 8.2 * k1;
    if (k1 > 0) { ctx.globalAlpha = 1; ctx.fillStyle = ivo(.32); ctx.fillRect(140, BASE - h1, 200, h1);
      setFont(ctx, DSP(96), 2); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.globalAlpha = k1; ctx.fillText(fmt(2.36 * k1, 2), 240, BASE - h1 - 46);
      setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.8); ctx.fillText('HARI PERTAMA', 240, BASE + 44);
      rupiah(ctx, '≈ Rp43,1 triliun', 240, BASE - h1 - 14, t, A.gta + 1.0, 1, 'center', 20); }
    const k2 = E.inOutCubic(inv(A.taketwo, A.n82 + .1, t)), h2 = MAXH * k2;
    if (k2 > 0) { ctx.globalAlpha = 1; ctx.fillStyle = LIME; ctx.fillRect(500, BASE - h2, 200, h2);
      setFont(ctx, DSP(120), 2); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(fmt(8.2 * k2, 1), 600, BASE - h2 - 50);
      setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.8); ctx.fillText('TARGET FY27 TAKE-TWO', 600, BASE + 44);
      ctx.globalAlpha = clamp((t - A.n82) / .3); ctx.fillStyle = ivo(.65); ctx.fillText('US$8–8,2 MILIAR', 600, BASE + 76); ctx.globalAlpha = 1;
      rupiah(ctx, '≈ Rp150 triliun', 600, BASE - h2 - 16, t, A.n82 + .4, 1, 'center', 20); rupiah(ctx, '≈ Rp146–150 triliun', 600, BASE + 104, t, A.n82 + .3, .8, 'center', 20); }
    ctx.textAlign = 'left'; ctx.globalAlpha = k0 * .7; setFont(ctx, MN(18), 4); ctx.fillStyle = IVORY; ctx.fillText('MILIAR US$', 60, BASE - MAXH - 40);
    ctx.globalAlpha = 1; srcTag(ctx, 'Sumber: Take-Two / Game Developer, 2026 · Sensor Tower via Deadline · kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', -880, 470, t, A.gta);
  } };

  // ── S9 · Bukan keberuntungan: tiga pilar ──────────────────────────────────────────────────────────────────────
  const PIL = [['MESIN RAGE', 'teknologi mesin sendiri', 'teknologi'], ['12 STUDIO GLOBAL', 'ribuan talenta lintas negara', 'ribuan'], ['KOMUNITAS STREAMER', 'penonton setia', 'komunitas']];
  const S9 = { name: 'Tiga pilar', draw(ctx, t) {
    const up = E.inOutCubic(inv(A.tapi - .2, A.tapi + .4, t)), ty = lerp(-60, -330, up), sz = lerp(190, 110, up);
    const tw = fallLine(ctx, 'BUKAN KEBERUNTUNGAN', 0, ty, t, A.bukan - .05, sz, 'center') || 0;
    const ks = E.snap(inv(A.bukan + .1, A.bukan + .4, t)); if (ks > 0) { ctx.globalAlpha = 1; ctx.fillStyle = IVORY; ctx.fillRect(-tw / 2 - 20, ty - sz * .36, (tw + 40) * ks, Math.max(6, sz * .06)); }
    txt(ctx, 'tapi perpaduan', 0, -210, t, A.tapi + .1, SRF(62), { align: 'center', col: ivo(.9) });
    const PW = 520, PH = 400, PY = 60;
    for (let i = 0; i < 3; i++) { const t0 = A[PIL[i][2]] - .15, k = E.outQuint(inv(t0, t0 + .55, t)); if (k <= 0) continue; const x = (i - 1) * 580, y = PY + (1 - k) * 160;
      ctx.save(); ctx.globalAlpha = clamp(k * 1.5); ctx.translate(x, y); ctx.rotate((1 - k) * (i - 1) * .08);
      ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = ROOM; ctx.fillRect(-PW / 2, -PH / 2, PW, PH); ctx.shadowColor = 'transparent';
      ctx.save(); ctx.beginPath(); ctx.rect(-PW / 2, -PH / 2, PW, PH); ctx.clip(); const lt = t - t0;
      if (i === 0 && V.nyetir) plate(ctx, V.nyetir, t, 0, 0, PW, PH, 1, { t0, grade: GRADE_DOC, vig: .4, grain: .12 });
      if (i === 1) { cover(ctx, IM.blr, -PW / 2, -PH / 2, PW, PH, 1.1 + .06 * clamp(lt / 4)); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill();
        ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.globalAlpha = clamp(k * 1.5) * (1 - (lt * .8) % 1); ctx.beginPath(); ctx.arc(0, 0, 11 + 34 * ((lt * .8) % 1), 0, 7); ctx.stroke(); }
      if (i === 2) { ctx.fillStyle = '#15160F'; ctx.fillRect(-PW / 2, -PH / 2, PW, PH); setFont(ctx, DSP(300), 0); ctx.textAlign = 'right'; ctx.fillStyle = ivo(.12); ctx.fillText('#1', PW / 2 - 20, PH / 2 - 30);
        const wh = PH * 1.04, rise = (1 - E.outQuint(inv(t0, t0 + .7, t))) * 100; ctx.drawImage(IM.win, -wh / 2 - 40, PH / 2 - wh + 8 + rise, wh, wh); ctx.textAlign = 'left'; }
      ctx.restore(); ctx.strokeStyle = ivo(.8); ctx.lineWidth = 2; ctx.strokeRect(-PW / 2, -PH / 2, PW, PH); ctx.restore();
      ctx.globalAlpha = k; setFont(ctx, DSP(70), 3); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(PIL[i][0], x, PY + PH / 2 + 82);
      setFont(ctx, MN(20), 3); ctx.fillStyle = ivo(.75); ctx.fillText(PIL[i][1], x, PY + PH / 2 + 120); ctx.textAlign = 'left'; ctx.globalAlpha = 1; }
    srcTag(ctx, 'Rockstar Games · Peta: AWS Terrain | © OpenFreeMap | © OpenStreetMap contributors · Foto: Secrett9 / Wikimedia Commons (CC0)', -880, 490, t, A.teknologi);
  } };

  // pin over the Edinburgh map (screen space, the map is the full-bleed layer and zooms about the centre)
  function pin(o, t) {
    const t0 = A.belum + .25, k = t - t0, out = 1 - E.inCubic(inv(A.januari - .1, A.januari + .25, t)); if (k <= 0 || out <= 0) return;
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = out * clamp(k / .12); const d = (1 - spring(k, .5, .4)) * -90, x = W / 2, y = H / 2;
    o.strokeStyle = IVORY; o.lineWidth = 3; o.globalAlpha *= 1 - (k * .7) % 1; o.beginPath(); o.arc(x, y, 14 + 60 * ((k * .7) % 1), 0, 7); o.stroke(); o.globalAlpha = out * clamp(k / .12);
    o.fillStyle = IVORY; o.beginPath(); o.arc(x, y - 44 + d, 30, 0, 7); o.fill(); o.beginPath(); o.moveTo(x - 16, y - 27 + d); o.lineTo(x, y + d); o.lineTo(x + 16, y - 27 + d); o.fill();
    o.fillStyle = ROOM; o.beginPath(); o.arc(x, y - 44 + d, 11, 0, 7); o.fill();
    typeOn(o, 'ROCKSTAR NORTH', x + 50, y - 50, t, t0 + .3, DSP(72), { ls: 3, col: IVORY, cps: 30 });
    typeOn(o, 'EDINBURGH, SKOTLANDIA', x + 54, y - 6, t, t0 + .6, MN(22), { ls: 5, col: ivo(.85), cps: 40 });
    o.restore();
  }

  const ST = [S0, { at: A.kenyataan - .1, via: 'cut', name: 'Selam tekanan' }, { ...S2, at: A.padahal, via: 'cut' }, { ...S3, at: A.mencuri - .3, via: 'push' },
    { ...S4, at: A.tepat + .45, via: 'truck' }, { ...S5, at: A.belum, via: 'cut' }, { ...S6, at: A.lalu - .35, via: 'whip' }, { ...S7, at: A.pihak, via: 'cut' },
    { ...S8, at: A.di, via: 'rise' }, { ...S9, at: A.bukan, via: 'cut' }];
  let latarV = () => {}, FULLS = null;
  const over = (o, t) => { dive.draw(o, t); pin(o, t); aksa.draw(o, t); };
  const sc = makeChapter({ B, ST, label: 'PUNCAK · BADAI DI BALIK LAYAR', over, gate: true, under: (ctx, t, first) => latarV(ctx, t, first),
    load: async () => { await load(); latarV = latar([
      { t0: 0, t1: A.kenyataan + .1, im: IM.laut, dim: .46, z: [1.04, 1.2], pan: [40, -40] },
      { t0: A.padahal - .2, t1: A.mencuri - .2, V: V.lorong, dim: .6, z: [1.04, 1.12] },
      { t0: A.mencuri - .4, t1: A.tepat + .6, im: IM.malamD, dim: .45, z: [1.04, 1.14], pan: [-20, 20] },
      { t0: A.tepat + .35, t1: A.belum + .1, V: V.telepon, dim: .62, z: [1.05, 1.12] },
      { t0: A.belum - .1, t1: A.januari + .3, im: IM.mapE, dim: .12, z: [1.0, 1.18] },
      { t0: A.januari - .1, t1: A.lalu - .2, im: IM.hqB, dim: .35, z: [1.1, 1.2], side: 'left' },
      { t0: A.lalu - .45, t1: A.pihak + .1, V: V.lucia, dim: .66, z: [1.04, 1.12] },
      { t0: A.pihak - .1, t1: A.di + .1, im: IM.hqB, dim: .5, z: [1.12, 1.22], pan: [-30, 30] },
      { t0: A.di - .1, t1: A.bukan + .1, im: IM.skyD, dim: .45, z: [1.04, 1.12], pan: [20, -20] },
      { t0: A.bukan - .1, t1: DUR, im: IM.malamD, dim: .55, z: [1.06, 1.16] }]); },
    full: () => FULLS ??= [
      { im: IM.bbcH, t0: A.rilis + .25, t1: A.belum + .05, crop: [.26, .1, .68, .62], tab: 'BBC · 16 NOV 2026', hl: [[.361, .118, .314, .19, A.mengaku]], dir: 1 },
      { im: IM.bbcS, t0: A.staf - .1, t1: A.iwgb + .35, crop: [.26, .06, .70, .62], tab: 'BBC · 17 NOV 2026', hl: [[.45, .129, .50, .161, A.north]], dir: -1 }] });
  return sc;
}
