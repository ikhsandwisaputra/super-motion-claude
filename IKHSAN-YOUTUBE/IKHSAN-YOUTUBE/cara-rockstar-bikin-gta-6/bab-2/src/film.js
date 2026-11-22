// Bab 2 · "Benarkah GTA 6 banyak dibangun orang India?" (VO 05, 121.7 s). Season 3 chapter.
//  S0   0–5.2    title + CNA headline (lime stabilo on "India's game developers helped build") over night-city footage
//  SM   5.2–14.5 map flight (screen space): Whitefield 3D dark map pushes in, scan-wipe to satellite at "kawasan", lime pin "Rockstar India"
//  SS   14.3–36  Selam Detail (the chapter's one Season 3 move): "1.600" pengembang ≈ 1/3 of 4.711 → dive into the last "0" at "cikal bakal"
//               → match-cut out of the "0" of 2026, the year rolls back to 1997 · Rajesh Rao · DHRUVA INTERACTIVE
//  S3–S13 depth-row stations on full-bleed official footage / maps: Dhruva credits · 91,82 % ring + US$7,9 juta · restaurant analogy
//               (Miami map) · rumour check (Vice Beach clip + Miami map card) · CNA full page → verification note · 12 offices in one lane ·
//               audience question · cost vs talent (Lucia clip) · lesson for Indonesia · Bitkraft opinion + Aksa (thinking → sad) · teaser bab 3
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  srcTag, txt, countTo, fmt, gone, plate, typeOn, grainRect, evid, fall, markLine, slab } from './kit.js';
import { latar, aksaShow, selam, counterOf, bake, GRADE_DOC } from './s3.js';

const ROOM = '#0B0C09';
// clean span of a clip (the trailer clips carry the 'Rockstar Games presents' card and hard cuts)
const sl = (V, a, b) => V && ({ ...V, n: b - a, img: V.img.slice(a, b) });
function cover(g, im, x, y, w, h, z = 1, ox = 0, oy = 0) { const s = Math.max(w / im.width, h / im.height) * z; g.drawImage(im, x + w / 2 - im.width * s / 2 + ox, y + h / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); }
// mono label with the lime square, typed on
function lab(ctx, str, x, y, t, t0, o = {}) {
  if (t <= t0) return; const a0 = ctx.globalAlpha, css = MN(o.size || 26); setFont(ctx, css, 7); const w = ctx.measureText(str).width + 30, x0 = o.align === 'center' ? x - w / 2 : x;
  ctx.globalAlpha = a0 * clamp((t - t0) / .2); ctx.fillStyle = LIME; ctx.fillRect(x0, y - 19, 14, 14); ctx.globalAlpha = a0;
  typeOn(ctx, str, x0 + 30, y, t, t0, css, { ls: 7, col: o.col || ivo(.86), cps: 44 });
}

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {}, SH = '../assets/shared/', R = SH + 'rockstar-resmi/', PT = SH + 'peta/';
  async function load() {
    let gel, sat, mia, sky, boul, keys;
    [IM.cna, gel, sat, mia, sky, boul, keys] = await Promise.all([
      loadImg(SH + 'kutipan/channelnewsasia-india-s-game-developers-helped-build.png', 2144),
      loadImg(PT + 'rockstar-india-bengaluru-3d_gelap-z15.png', 1920), loadImg(PT + 'rockstar-india-bengaluru-3d_satelit-z15.png', 1920),
      loadImg(PT + 'miami-vice-city-3d_satelit-z14.png', 1920), loadImg(R + 'gtavi-02-vice-city-skyline-day.jpg', 1920),
      loadImg(R + 'gtavi-05-vice-city-muscle-car-boulevard.jpg', 1920), loadImg(R + 'gtavi-07-leonida-keys-aerial-ocean.jpg', 1920)]);
    [V.kota, V.garasi, V.pantai, V.menara, V.lucia, V.klub] = await Promise.all(['kotamalam', 'garasi', 'pantai', 'menara', 'lucia', 'klub'].map(n => loadVid(SH + 'vid/', n)));
    IM.gelM = bake(gel, 'saturate(.22) brightness(.92) contrast(1.08)', 1920);           // the cyan road of the style is pulled back to grey
    IM.satM = bake(sat, 'saturate(.8) brightness(.86) contrast(1.05)', 1920);
    IM.satD = bake(sat, 'saturate(.5) brightness(.36) contrast(1.05)', 1920);            // selam world 1 (continues the map)
    IM.gelD = bake(gel, 'saturate(.15) brightness(.42) blur(2px)', 1920);                // selam world 2 + verification latar
    IM.mia = bake(mia, 'saturate(.8) brightness(.86) contrast(1.04)', 1920);
    IM.sky = bake(sky, GRADE_DOC, 1920); IM.boul = bake(boul, GRADE_DOC, 1920); IM.keys = bake(keys, GRADE_DOC, 1920);
    V.kota = sl(V.kota, 27, 36); V.pantai = sl(V.pantai, 0, 25); V.menara = sl(V.menara, 16, 28); V.klub = sl(V.klub, 0, 15); V.garasi = sl(V.garasi, 0, 44);
    await aksa1.load(); await aksa.load();
  }

  // ── S0 · title + CNA headline ─────────────────────────────────────────────────────────────────────────
  const S0 = { at: 0, name: 'Judul bab 2', draw(ctx, t) {
    const g = gone(t, A.mari - .4, .3); if (g <= 0) return; ctx.globalAlpha = g;
    lab(ctx, '02 · BAB 2', 0, -400, t, .45, { align: 'center' });
    fall(ctx, 'BENARKAH GTA 6', 0, -250, t, .6, DSP(150), { align: 'center' });
    fall(ctx, 'DIBANGUN DI INDIA?', 0, -110, t, .85, DSP(150), { align: 'center' });
    if (IM.cna) evid(ctx, IM.cna, 0, 215, 1120, t, A.media + .05, { tab: 'channelnewsasia.com', hl: [[.055, .165, .615, .105, A.india0]], rot: -1 });
    srcTag(ctx, 'Sumber: CNA, 19 Nov 2026', -560, 470, t, A.media + .5);
  } };

  // ── SM · Whitefield map flight (screen space) ─────────────────────────────────────────────────────────
  const MAP0 = A.mari - .08, MAP1 = A.laporan + .14, FOC = [.506, .505];
  function mapOver(o, t) {
    if (t < MAP0 || t > MAP1 || !IM.gelM) return;
    const u = inv(MAP0, A.laporan + .1, t), Z = 1 + .14 * E.outQuint(inv(MAP0, MAP0 + .7, t)) + .3 * E.inOutSine(u);
    const mv = E.inOutSine(inv(MAP0, A.berdiri, t)), cx = clamp(lerp(.5, FOC[0], mv), .5 / Z, 1 - .5 / Z), cy = clamp(lerp(.5, FOC[1], mv), .5 / Z, 1 - .5 / Z);
    const iw = IM.gelM.width, ih = IM.gelM.height, S = Math.max(W / iw, H / ih) * Z, x0 = W / 2 - cx * iw * S, y0 = H / 2 - cy * ih * S;
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    o.drawImage(IM.gelM, x0, y0, iw * S, ih * S);
    const w = E.inOutCubic(inv(A.kawasan - .15, A.kawasan + .75, t));                   // scan wipe dark → satellite, top to bottom
    if (w > 0) { o.save(); o.beginPath(); o.rect(0, 0, W, H * w); o.clip(); o.drawImage(IM.satM, x0, y0, iw * S, ih * S); o.restore();
      if (w < 1) { const ys = H * w, gs = o.createLinearGradient(0, ys - 90, 0, ys); gs.addColorStop(0, ivo(0)); gs.addColorStop(1, ivo(.22)); o.fillStyle = gs; o.fillRect(0, ys - 90, W, 90);
        o.fillStyle = ivo(.75); o.fillRect(0, ys - 2, W, 3); } }
    o.fillStyle = 'rgba(11,12,9,.2)'; o.fillRect(0, 0, W, H);
    const sh = o.createLinearGradient(0, 0, W * .55, H * .4); sh.addColorStop(0, 'rgba(11,12,9,.8)'); sh.addColorStop(1, 'rgba(11,12,9,0)'); o.fillStyle = sh; o.fillRect(0, 0, W, H);
    const vg = o.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * 1.05); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.5)'); o.fillStyle = vg; o.fillRect(0, 0, W, H);
    // Rockstar India: a lime area pin on Whitefield (the district, not a street address)
    const px = x0 + FOC[0] * iw * S, py = y0 + FOC[1] * ih * S, s = t - (A.rsi - .1);
    if (s > 0) { const dr = (1 - spring(s, .5, .4)) * -80, ph = (s * .9) % 1;
      o.globalAlpha = clamp(s / .12); o.strokeStyle = LIME; o.lineWidth = 3; o.globalAlpha *= 1 - ph; o.beginPath(); o.arc(px, py, 18 + 70 * ph, 0, 7); o.stroke(); o.globalAlpha = clamp(s / .12);
      o.fillStyle = 'rgba(200,245,60,.16)'; o.beginPath(); o.arc(px, py, 90, 0, 7); o.fill();
      o.fillStyle = LIME; o.beginPath(); o.arc(px, py - 40 + dr, 26, 0, 7); o.fill(); o.beginPath(); o.moveTo(px - 14, py - 26 + dr); o.lineTo(px, py + dr); o.lineTo(px + 14, py - 26 + dr); o.fill();
      o.fillStyle = LIME_INK; o.beginPath(); o.arc(px, py - 40 + dr, 9, 0, 7); o.fill(); o.globalAlpha = 1;
      slab(o, 'ROCKSTAR INDIA', px + 70, py - 120, t, A.rsi + .05, { size: 30, lx: px + 22, ly: py - 52 }); }
    lab(o, 'WHITEFIELD · BENGALURU, INDIA', 110, 150, t, A.mari + .15, { size: 30 });
    typeOn(o, '12,97° LU · 77,75° BT', 140, 196, t, A.white, MN(22), { ls: 4, col: ivo(.7), cps: 40 });
    typeOn(o, 'KAWASAN PUSAT TEKNOLOGI', 140, 236, t, A.kawasan, MN(22), { ls: 4, col: ivo(.7), cps: 40 });
    srcTag(o, t < A.kawasan + .3 ? 'Sumber: AWS Terrain | © OpenFreeMap | © OpenStreetMap contributors, diakses 20 Nov 2026'
      : 'Sumber: AWS Terrain | © Esri, Maxar, Earthstar Geographics | © OpenFreeMap | © OpenStreetMap contributors, diakses 20 Nov 2026', 110, 1010, t, A.mari + .4);
    grainRect(o, 0, 0, W, H, t, .1);
    o.restore();
  }

  // ── SS · Selam Detail: 1.600 → (dive into the last 0) → 2026 rolls back to 1997 ─────────────────────────
  const CSS1 = DSP(380), BY = 590, F = counterOf('1.600', 4, CSS1, W / 2, BY);
  const CSS2 = DSP(430), YR_Y = 640, NF = counterOf('2026', 1, CSS2, W / 2, YR_Y);
  const BAR = [260, 800, 1400, 62], FR = 1600 / 4711;
  const dive = selam({ t0: A.laporan - .12, tc: A.cikal - .05, t1: A.jauh - .1, f: [F.x, F.y], r: F.w * .16, nf: [NF.x, NF.y], nr: NF.w * .16,
    page(g, t) {
      if (IM.satD) cover(g, IM.satD, 0, 0, W, H, 1.42 + .05 * inv(A.laporan, A.cikal, t), -16, -8);
      g.fillStyle = 'rgba(11,12,9,.3)'; g.fillRect(0, 0, W, H);
      const fo = gone(t, A.cerita + .15, .5);                                            // supporting type leaves before the dive
      g.globalAlpha = fo; typeOn(g, 'LAPORAN BERBAGAI MEDIA · LEBIH DARI', W / 2, 200, t, A.laporan + .15, MN(28), { align: 'center', ls: 7, col: ivo(.86), cps: 40 }); g.globalAlpha = 1;
      if (t > A.enam - .55) { const kk = E.outQuint(inv(A.enam - .55, A.enam - .1, t)), n = Math.round(countTo(0, 1600, t, A.enam - .55, .9));
        setFont(g, CSS1, 0); g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = IVORY; g.globalAlpha = kk; g.fillText(fmt(n), W / 2, BY + (1 - kk) * 50);
        const pu = Math.exp(-Math.max(0, t - A.enam - .35) / .14) * (t > A.enam + .35 ? 1 : 0); if (pu > .01) { g.globalAlpha = pu * .35; g.fillStyle = LIME; g.fillText(fmt(n), W / 2, BY); }
        g.globalAlpha = 1; g.textAlign = 'left'; }
      const pk = E.outCubic(inv(A.cikal - .8, A.cikal - .25, t)); if (pk > 0) {          // the 0's counter darkens into a pupil we fall through
        g.fillStyle = ROOM; g.beginPath(); g.ellipse(F.x, F.y, F.w * .2 * pk, F.size * .27 * pk, 0, 0, 7); g.fill(); }
      g.globalAlpha = fo * gone(t, A.angka - .25, .3); txt(g, 'pengembang di Bengaluru ikut menggarap GTA 6', W / 2, 700, t, A.garap - .2, SRF(60), { align: 'center' });
      g.globalAlpha = fo; txt(g, 'salah satu tim studio terbesar di proyek ini', W / 2, 700, t, A.terbesar - .1, SRF(60), { align: 'center' });
      const [bx, by, bw, bh] = BAR, kb = E.outQuint(inv(A.angka - .05, A.angka + .55, t)), kl = E.outQuint(inv(A.angka + .45, A.angka + 1.15, t));
      if (kb > 0) { g.strokeStyle = ivo(.45); g.lineWidth = 2; g.strokeRect(bx, by, bw * kb, bh); g.fillStyle = ivo(.1); g.fillRect(bx, by, bw * kb, bh);
        setFont(g, MN(24), 5); g.textAlign = 'right'; g.fillStyle = ivo(.8); g.globalAlpha = fo * kb; g.fillText('TOTAL 4.711 STAF · 12 KANTOR', bx + bw, by + bh + 46); g.textAlign = 'left'; g.globalAlpha = fo; }
      if (kl > 0) { g.fillStyle = LIME; g.fillRect(bx, by, bw * FR * kl, bh); g.save(); g.beginPath(); g.rect(bx, by, bw * FR * kl, bh); g.clip();
        setFont(g, MN(26), 4); g.fillStyle = LIME_INK; g.fillText('INDIA 1.600 ≈ 1/3', bx + 24, by + 41); g.restore(); }
      g.globalAlpha = fo; srcTag(g, 'Sumber: Firstpost & CNA, 19 Nov 2026', 110, 1010, t, A.enam); g.globalAlpha = 1;
    },
    next(g, t) {
      if (IM.gelD) cover(g, IM.gelD, 0, 0, W, H, 1.06 + .05 * inv(A.cikal, A.jauh, t));
      g.fillStyle = 'rgba(11,12,9,.42)'; g.fillRect(0, 0, W, H);
      const ku = E.inOutCubic(inv(A.cikal + .55, A.silam + .25, t)), yr = Math.round(lerp(2026, 1997, ku)), land = t > A.silam + .25;
      setFont(g, CSS2, 0); g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = land ? LIME : IVORY; g.fillText(String(yr), W / 2, YR_Y + Math.sin(ku * Math.PI) * 10);
      g.textAlign = 'left';
      typeOn(g, 'HAMPIR 30 TAHUN SILAM', W / 2, 250, t, A.tiga - .35, MN(30), { align: 'center', ls: 8, col: ivo(.88), cps: 40 });
      txt(g, 'Rajesh Rao mendirikan bengkel grafis', W / 2, 770, t, A.rajesh - .1, SRF(62), { align: 'center' });
      fall(g, 'DHRUVA INTERACTIVE', W / 2, 935, t, A.dhruva - .15, DSP(150), { align: 'center', col: IVORY });
      srcTag(g, 'Sumber: GamesIndustry.biz, 13 Mei 2019', 110, 1020, t, A.rajesh);
    } });

  // ── S3 · Dhruva before Rockstar: credits ──────────────────────────────────────────────────────────────
  const CR = ['FORZA HORIZON 3', 'HALO 5', 'SEA OF THIEVES'], CY = [40, 165, 290];
  const S3 = { at: A.jauh - .2, via: 'cut', name: 'Dhruva', draw(ctx, t) {
    const t0 = A.jauh - .2;
    lab(ctx, 'SEBELUM BERGABUNG DENGAN ROCKSTAR', 0, -390, t, t0 + .1, { align: 'center' });
    fall(ctx, 'DHRUVA INTERACTIVE', 0, -240, t, t0 + .2, DSP(140), { align: 'center' });
    txt(ctx, 'sudah berpengalaman membuat aset game besar', 0, -140, t, A.aset - 1.3, SRF(54), { align: 'center' });
    setFont(ctx, DSP(110), 2); const wv = CR.map(s => ctx.measureText(s).width);
    const act = t < A.forza - .08 ? -1 : t < A.halo - .08 ? 0 : 1;                        // one lime marker travels with the narrator
    if (act >= 0) { const km = E.outQuint(inv(act ? A.halo - .08 : A.forza - .08, (act ? A.halo : A.forza) + .3, t)), y = act ? lerp(CY[0], CY[1], km) : CY[0], w = act ? lerp(wv[0], wv[1], km) : wv[0] * km;
      ctx.fillStyle = LIME; ctx.fillRect(-w / 2 - 22, y - 96, w + 44, 112); }
    for (let i = 0; i < 3; i++) fall(ctx, CR[i], 0, CY[i], t, A.aset - .35 + i * .22, DSP(110), { align: 'center', ls: 2, col: act === i && (i ? t > A.halo + .1 : t > A.forza + .1) ? LIME_INK : IVORY });
    srcTag(ctx, 'Sumber: GamesIndustry.biz, 13 Mei 2019', -880, 440, t, t0 + .5);
  } };

  // ── S4 · acquisition: 91,82 % ring + US$7,9 juta ──────────────────────────────────────────────────────
  const S4 = { at: A.pada, via: 'whip', name: 'Akuisisi 2019', draw(ctx, t) {
    const cx = -470, cy = 40, Rr = 230, kr = E.inOutCubic(inv(A.persen - .25, A.persen + .85, t)), ka = E.outCubic(inv(A.pada - .1, A.pada + .4, t));
    ctx.lineWidth = 36; ctx.lineCap = 'butt'; ctx.strokeStyle = ivo(.14 * ka); ctx.beginPath(); ctx.arc(cx, cy, Rr, 0, 7); ctx.stroke();
    if (kr > 0) { ctx.strokeStyle = LIME; ctx.beginPath(); ctx.arc(cx, cy, Rr, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * .9182 * kr); ctx.stroke(); }
    if (t > A.persen - .25) { setFont(ctx, DSP(150), 0); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(fmt(countTo(0, 91.82, t, A.persen - .25, 1.1), 2) + '%', cx, cy + 50);
      setFont(ctx, MN(24), 6); ctx.fillStyle = ivo(.75); ctx.fillText('SAHAM DHRUVA', cx, cy + 110); ctx.textAlign = 'left'; }
    const X = -60;
    lab(ctx, 'MEI 2019 · AKUISISI', X, -270, t, A.pada + .1);
    fall(ctx, 'ROCKSTAR MEMBELI', X, -140, t, A.resmi - .25, DSP(120));
    txt(ctx, 'saham Dhruva dari Starbreeze', X, -50, t, A.saham - .1, SRF(60));
    if (t > A.juta - .3) { const kj = E.outQuint(inv(A.juta - .3, A.juta + .2, t)); setFont(ctx, DSP(180), 1); ctx.fillStyle = IVORY; ctx.globalAlpha *= kj;
      ctx.fillText(`US$${fmt(countTo(0, 7.9, t, A.juta - .3, 1.2), 1)} JUTA`, X, 190 + (1 - kj) * 40); ctx.globalAlpha /= kj || 1; }
    if (t > A.juta - .05) { const kr2 = E.outQuint(inv(A.juta - .05, A.juta + .35, t)), a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * kr2;   // rupiah: on screen only, not in the VO
      setFont(ctx, SRF(52), 0); ctx.fillStyle = ivo(.78); ctx.fillText(`≈ Rp${Math.round(countTo(0, 7.9, t, A.juta - .3, 1.2) * 18.264)} miliar`, X, 262 + (1 - kr2) * 18); ctx.globalAlpha = a0; }
    typeOn(ctx, 'NILAI AKUISISI', X, 325, t, A.dolar - .1, MN(24), { ls: 6, col: ivo(.75) });
    srcTag(ctx, 'Sumber: GamesIndustry.biz & CNA · kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', -880, 440, t, A.resmi);
  } };

  // ── S5 · analogy: buy the kitchen ─────────────────────────────────────────────────────────────────────
  const S5 = { at: A.ibarat, via: 'rise', name: 'Beli dapurnya', draw(ctx, t) {
    txt(ctx, 'Ibarat restoran besar…', 0, -260, t, A.ibarat, SRF(76), { align: 'center' });
    const ks = E.outQuint(inv(A.rs2, A.rs2 + .35, t)), dimS = lerp(1, .42, ks), a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * dimS; const tw = fall(ctx, 'PESAN BUMBU DARI LUAR', 0, -60, t, A.bumbu - .35, DSP(150), { align: 'center' }); ctx.globalAlpha = a0;
    if (ks > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-tw / 2 - 20, -60 - 52, (tw + 40) * ks, 9); }
    markLine(ctx, 'BELI LANGSUNG ', 'DAPURNYA', '', 0, 190, t, A.rs2 + .45, A.dapur - .05, DSP(170));
    srcTag(ctx, 'Peta: AWS Terrain | © Esri, Maxar, Earthstar Geographics | © OpenFreeMap | © OpenStreetMap contributors, diakses 20 Nov 2026', -880, 440, t, A.ibarat + .4);
  } };

  // ── S6 · rumour check: Vice Beach clip (latar) beside the real Miami Beach ────────────────────────────
  const S6 = { at: A.nah, via: 'push', name: 'Kabar kebablasan', draw(ctx, t) {
    lab(ctx, 'CEK FAKTA', -860, -390, t, A.nah + .1, { size: 28 });
    fall(ctx, 'KABAR YANG KEBABLASAN', -860, -250, t, A.lurus - .25, DSP(150));
    const kc = E.outQuint(inv(A.nah + .3, A.nah + .9, t));                                // the real place, as a card
    if (kc > 0 && IM.mia) { const [x, y, w, h] = [460, 190, 720, 405], a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * kc; ctx.save(); ctx.translate(0, (1 - kc) * 60);
      ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = ROOM; ctx.fillRect(x - w / 2, y - h / 2, w, h); ctx.shadowColor = 'transparent';
      ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip(); cover(ctx, IM.mia, x - w / 2, y - h / 2, w, h, 1.12 + .08 * inv(A.nah, A.tetapi, t), 40, 10); ctx.restore();
      ctx.strokeStyle = ivo(.8); ctx.lineWidth = 2; ctx.strokeRect(x - w / 2, y - h / 2, w, h); ctx.restore();
      setFont(ctx, MN(24), 5); ctx.fillStyle = IVORY; ctx.fillText('DUNIA NYATA · MIAMI BEACH', x - w / 2, y - h / 2 - 22); ctx.globalAlpha = a0; }
    slab(ctx, 'KLAIM DI MEDSOS', -860, -95, t, A.memang - .05, { size: 24 });
    txt(ctx, '“Tim Bengaluru membangun', -860, 10, t, A.pejabat - .3, SRF(56));
    txt(ctx, 'pantai Vice Beach.”', -860, 85, t, A.pejabat + .5, SRF(56));
    typeOn(ctx, 'BELUM TERVERIFIKASI', -860, 175, t, A.vice + .1, MN(28), { ls: 7, col: ivo(.9), cps: 40 });
    if (t > A.vice + .1) { ctx.fillStyle = ivo(.9); ctx.fillRect(-860, 192, 400 * E.outQuint(inv(A.vice + .1, A.vice + .6, t)), 3); }
    srcTag(ctx, 'Klip latar: Rockstar Games (rockstargames.com/VI/media)', -860, 400, t, A.nah + .4);
    srcTag(ctx, 'Peta: AWS Terrain | © Esri, Maxar, Earthstar Geographics | © OpenFreeMap | © OpenStreetMap contributors', -860, 440, t, A.nah + .7);
  } };

  // ── S7 · CNA full page (post) → verification note ─────────────────────────────────────────────────────
  const S7 = { at: A.tetapi, via: 'whip', name: 'Verifikasi CNA', draw(ctx, t) {
    const t0 = A.belum - .25;
    lab(ctx, 'CATATAN VERIFIKASI', 0, -230, t, t0, { align: 'center', size: 28 });
    markLine(ctx, 'Rockstar sendiri ', 'belum pernah', ' merinci', 0, -70, t, t0 + .05, A.belum + .1, SRF(80));
    txt(ctx, 'bagian peta garapan tiap kantor.', 0, 50, t, A.kantor - 1.4, SRF(80), { align: 'center' });
    if (IM.cna) evid(ctx, IM.cna, 0, 265, 560, t, t0 + .3, { rot: 1.2, dim: .1 });
    srcTag(ctx, 'Sumber: CNA, 19 Nov 2026', -880, 440, t, t0 + .2);
  } };

  // ── S8 · 12 offices, one lane ─────────────────────────────────────────────────────────────────────────
  const S8 = { at: A.jadi, via: 'truck', name: '12 kantor', draw(ctx, t) {
    lab(ctx, '12 KANTOR · 4.711 STAF · SATU JALUR PRODUKSI', 0, -380, t, A.jadi + .1, { align: 'center' });
    const L = 800, ly = -90, kl = E.outQuint(inv(A.jadi - .1, A.jadi + .7, t)), a0 = ctx.globalAlpha;
    ctx.fillStyle = ivo(.35); ctx.fillRect(-L * kl, ly - 1.5, 2 * L * kl, 3);
    ctx.fillStyle = ivo(.55); for (let k = 0; k < 26; k++) { const x = -L + ((k * 61.5 + (t - A.jadi) * 220) % (2 * L)); if (Math.abs(x) < L * kl) ctx.fillRect(x, ly - 3, 16, 6); }   // work flowing through
    for (let i = 0; i < 12; i++) { const s = t - A.jadi - .2 - i * .05; if (s <= 0) continue; const x = -L + i * 2 * L / 11, ind = i === 7, d = (1 - spring(s, .5, .4)) * -40;
      ctx.globalAlpha = a0 * clamp(s / .12);
      if (ind) { const kg = E.outQuint(inv(A.raksasa - .1, A.raksasa + .4, t)), r = 18 + 20 * kg, ph = ((t - A.raksasa) * .8) % 1;
        ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(x, ly + d, r, 0, 7); ctx.fill();
        if (t > A.raksasa) { ctx.strokeStyle = LIME; ctx.lineWidth = 3; ctx.globalAlpha *= 1 - ph; ctx.beginPath(); ctx.arc(x, ly, r + 60 * ph, 0, 7); ctx.stroke(); ctx.globalAlpha = a0; }
        setFont(ctx, MN(26), 6); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('INDIA', x, ly - 70); ctx.textAlign = 'left'; }
      else { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, ly + d, 16, 0, 7); ctx.fill(); }
      setFont(ctx, MN(20), 2); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.6); ctx.fillText(String(i + 1).padStart(2, '0'), x, ly + 72); ctx.textAlign = 'left'; ctx.globalAlpha = a0; }
    const ks = E.outQuint(inv(A.sendirian - .05, A.sendirian + .3, t));
    ctx.globalAlpha = a0 * lerp(1, .45, ks); const tw = fall(ctx, 'SELURUH PETA DIGARAP DI INDIA', 0, 190, t, A.tidak - .2, DSP(120), { align: 'center' }); ctx.globalAlpha = a0;
    if (ks > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-tw / 2 - 20, 190 - 42, (tw + 40) * ks, 8); }
    slab(ctx, 'TIDAK TEPAT', 0, 300, t, A.sendirian + .15, { size: 28, align: 'center' });
    srcTag(ctx, 'Sumber: Firstpost, CNA & IGN SEA (diolah)', -880, 440, t, A.jadi + .5);
  } };

  // ── S9 · audience question ────────────────────────────────────────────────────────────────────────────
  const S9 = { at: A.menurut, via: 'rise', name: 'Kenapa Bengaluru', draw(ctx, t) {
    const CX = -250;                                                                     // block left of centre: Aksa #1 lives bottom-right
    txt(ctx, 'Menurut kamu sendiri,', CX, -270, t, A.menurut, SRF(70), { align: 'center' });
    const tw = fall(ctx, 'KENAPA BENGALURU', CX - 35, -50, t, A.kenapa - .1, DSP(170), { align: 'center' });
    const sq = t - A.kenapa - .55; if (sq > 0) { setFont(ctx, DSP(170), 0); ctx.fillStyle = LIME; ctx.fillText('?', CX - 35 + tw / 2 + 12, -50 + (1 - spring(sq, .5, .35)) * -120); }
    const kd = E.outQuint(inv(A.kenapa + 1.1, A.kenapa + 1.6, t)); ctx.fillStyle = ivo(.4); ctx.fillRect(CX - 1, 110, 2, 190 * kd);
    fall(ctx, 'BIAYA', CX - 330, 240, t, A.kenapa + 1.15, DSP(120), { align: 'center' });
    fall(ctx, 'TALENTA', CX + 330, 240, t, A.kenapa + 1.35, DSP(120), { align: 'center' });
    typeOn(ctx, 'DARIPADA DI NEGARA SENDIRI?', CX, 390, t, A.sendiri2 - .95, MN(26), { align: 'center', ls: 7, col: ivo(.8), cps: 44 });
    srcTag(ctx, 'Peta: AWS Terrain | © Esri, Maxar, Earthstar Geographics | © OpenFreeMap | © OpenStreetMap contributors', -880, 455, t, A.menurut + .6);
  } };

  // ── S10 · cost vs talent (Lucia clip) ─────────────────────────────────────────────────────────────────
  const S10 = { at: A.pertama, via: 'whip', name: 'Biaya vs talenta', draw(ctx, t) {
    const two = t > A.kedua - .1, kd = E.outQuint(inv(A.pertama - .1, A.pertama + .7, t));
    ctx.fillStyle = ivo(.3); ctx.fillRect(-1, -380, 2, 800 * kd);
    setFont(ctx, DSP(110), 1); ctx.fillStyle = two ? ivo(.45) : LIME; if (t > A.pertama) ctx.fillText('01', -860, -270);
    fall(ctx, 'BIAYA', -740, -270, t, A.pertama + .05, DSP(110));
    typeOn(ctx, 'EFISIENSI OPERASIONAL', -860, -205, t, A.pertama + .6, MN(24), { ls: 6, col: ivo(.75) });
    txt(ctx, 'biaya operasional lebih efisien', -860, -110, t, A.pertama + 1.0, SRF(48));
    txt(ctx, 'gaji insinyur lebih terjangkau', -860, -40, t, A.gaji - .1, SRF(48));
    typeOn(ctx, 'INDIA  <  INGGRIS · AMERIKA', -860, 80, t, A.inggris - .3, MN(34), { ls: 3, col: IVORY, cps: 40 });
    typeOn(ctx, 'PERBANDINGAN GAJI INSINYUR', -860, 125, t, A.inggris + .3, MN(20), { ls: 5, col: ivo(.6), cps: 50 });
    if (t > A.kedua - .1) { setFont(ctx, DSP(110), 1); ctx.fillStyle = LIME; ctx.fillText('02', 60, -270); }
    fall(ctx, 'TALENTA 3D', 180, -270, t, A.kedua - .05, DSP(110));
    typeOn(ctx, 'EKOSISTEM PULUHAN TAHUN', 60, -205, t, A.ekosistem, MN(24), { ls: 6, col: ivo(.75) });
    txt(ctx, 'lulusan teknik & seniman 3D', 60, -120, t, A.ekosistem + .5, SRF(48));
    const kp = E.outQuint(inv(A.ekosistem - .2, A.ekosistem + .5, t)); if (V.lucia) plate(ctx, V.lucia, t, 450, 130, 760, 360, kp, { t0: A.ekosistem - .2, grade: GRADE_DOC, vig: .4, grain: .12, speed: .55 });
    if (t > A.puluhan - .1) slab(ctx, 'TERBANGUN PULUHAN TAHUN', 90, 270, t, A.puluhan - .1, { size: 22 });
    if (t > A.ekosistem) srcTag(ctx, 'Klip: Rockstar Games (rockstargames.com/VI/media)', 70, 360, t, A.ekosistem + .3);
  } };

  // ── S11 · lesson for Indonesia ────────────────────────────────────────────────────────────────────────
  const CODE = ['for (const npc of kota) npc.jalan()', 'render.cahaya(scene, 0.86)', 'rig.wajah.ekspresi = "senyum"', 'shader.air(t * 0.4)', 'anim.lompat(frame + 12)',
    'mesh.lod(jarak)', 'peta.muat("vice-beach")', 'fisika.lumpur(0.72)', 'kamera.ikuti(mobil)', 'lampu.neon = false'];
  const S11 = { at: A.pelajaran, via: 'push', name: 'Pelajaran Indonesia', draw(ctx, t) {
    const a0 = ctx.globalAlpha; setFont(ctx, MN(20, 400), 1); ctx.fillStyle = ivo(.16);                // code texture, scrolling (pemrograman)
    for (let i = 0; i < 16; i++) { const y = -460 + ((i * 64 - (t - A.pelajaran) * 30) % 1024 + 1024) % 1024; ctx.globalAlpha = a0 * clamp((t - A.pelajaran + .3) / .6);
      ctx.fillText(CODE[i % CODE.length], i % 2 ? 560 : -900, y); } ctx.globalAlpha = a0;
    lab(ctx, 'PELAJARAN BUAT KITA', 0, -330, t, A.pelajaran + .1, { align: 'center' });
    fall(ctx, 'INDONESIA JUGA PUNYA', 0, -150, t, A.indo - .3, DSP(150), { align: 'center' });
    markLine(ctx, 'RIBUAN ANAK MUDA ', 'JAGO', '', 0, 60, t, A.ribuan - .25, A.jago - .05, DSP(150));
    txt(ctx, 'animasi dan pemrograman', 0, 220, t, A.jago + .4, SRF(64), { align: 'center' });
  } };

  // ── S12 · Bitkraft opinion + Aksa (thinking → sad) ────────────────────────────────────────────────────
  // Aksa v2 (Ikhsan 11-21 "hampir tidak pernah terlihat"): two long stays. dt counts from the body (t + .82).
  const K1 = A.menurut - .25, I1 = K1 + .82;                                            // #1 audience question: wave → confused → surprised → pondering
  const aksa1 = aksaShow({ t: K1, x: 1600, y: 1075, s: .8, stay: 5.8, wave: [.1, 1.0],
    face: [[.1, '^_^'], [A.kenapa + .05 - I1, 'o_O'], [A.kenapa + 1.15 - I1, 'O_O'], [A.sendiri2 - .2 - I1, '-.-']], say: [A.kenapa + .3 - I1, 'biaya || talenta ?'] });
  const AK = A.namun + .45, I2 = AK + .82, SADT = A.beda - I2;                          // #2 Bitkraft: thinking → doubtful → sad
  const aksa = aksaShow({ t: AK, x: 330, y: 1075, s: .8, stay: 5.6, sad: SADT, tears: [SADT + .35, SADT + .9],
    face: [[.1, '-.-'], [A.punya - I2, 'o_O'], [SADT, 'T_T']], say: [.3, 'tim jago != produk sendiri'] });
  const S12 = { at: A.namun, via: 'whip', side: 1, name: 'Pendapat Bitkraft', draw(ctx, t) {
    const X = -60;                                                                       // block upper-right; Aksa's say-line runs under it at y ≈ 627
    slab(ctx, 'PENDAPAT NARASUMBER', X, -445, t, A.namun + .1, { size: 22 });
    typeOn(ctx, 'ANUJ TANDON · BITKRAFT VENTURES', X, -385, t, A.bitkraft - .3, MN(26), { ls: 5, col: ivo(.85), cps: 44 });
    txt(ctx, 'Punya tim jago', X, -305, t, A.punya - .15, SRF(70));
    txt(ctx, 'beda dengan', X, -232, t, A.beda - .15, SRF(70));
    markLine(ctx, 'PUNYA ', 'PRODUK', '', X, -95, t, A.produk - .5, A.produk, DSP(120), { align: 'left' });
    fall(ctx, 'DUNIA SENDIRI', X, 20, t, A.produk + .1, DSP(120));
    srcTag(ctx, 'Sumber: CNA, 19 Nov 2026 (pendapat narasumber, dirangkum)', X, 440, t, A.bitkraft);
  } };

  // ── S13 · teaser bab 3 ────────────────────────────────────────────────────────────────────────────────
  const S13 = { at: A.sekarang, via: 'rise', name: 'Menuju promosi', draw(ctx, t) {
    txt(ctx, 'Sekarang produknya sudah jadi…', 0, -250, t, A.sekarang, SRF(72), { align: 'center' });
    fall(ctx, 'BAGAIMANA CARA', 0, -50, t, A.bagaimana - .1, DSP(170), { align: 'center' });
    fall(ctx, 'MENJUALNYA?', 0, 120, t, A.bagaimana + .4, DSP(170), { align: 'center' });
    lab(ctx, 'BAB 3 · PROMOSI TANPA IKLAN TV', 0, 290, t, A.demam - 1.0, { align: 'center' });
    srcTag(ctx, 'Klip latar: Rockstar Games (rockstargames.com/VI/media)', -880, 440, t, A.sekarang + .5);
  } };

  const ST = [S0, { at: A.mari + .22, via: 'cut', name: 'Whitefield' }, { at: A.laporan + .25, via: 'cut', name: 'Selam 1.600' }, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13];
  let latarV = () => {};
  let FULLS;
  const over = (o, t) => { mapOver(o, t); dive.draw(o, t); aksa1.draw(o, t); aksa.draw(o, t); };
  return makeChapter({ B, ST, label: 'BAB 2 · INDIA', over, gate: true, under: (ctx, t, first) => latarV(ctx, t, first),
    load: async () => { await load();
      latarV = latar([
        { t0: 0, t1: A.mari + .05, V: V.kota, dim: .55, z: [1.05, 1.15], pan: [20, -20], speed: .3 },
        { t0: A.jauh - .6, t1: A.pada + .05, V: V.garasi, dim: .62, z: [1.04, 1.12], fin: .1, speed: .6 },
        { t0: A.pada - .35, t1: A.ibarat + .05, im: IM.satM, dim: .62, z: [1.1, 1.22], pan: [-40, 40] },
        { t0: A.ibarat - .35, t1: A.nah + .05, im: IM.mia, dim: .6, z: [1.04, 1.16], pan: [30, -30] },
        { t0: A.nah - .35, t1: A.tetapi + .05, V: V.pantai, dim: .48, side: 'left', z: [1.04, 1.12], speed: .45 },
        { t0: A.tetapi - .35, t1: A.jadi + .05, im: IM.gelD, dim: .35, z: [1.05, 1.15] },
        { t0: A.jadi - .35, t1: A.menurut + .05, V: V.menara, dim: .6, z: [1.04, 1.12], speed: .3 },
        { t0: A.menurut - .35, t1: A.pertama + .05, im: IM.satM, dim: .6, z: [1.2, 1.08], pan: [30, -30] },
        { t0: A.pertama - .35, t1: A.pelajaran + .05, im: IM.sky, dim: .68, z: [1.04, 1.14], pan: [-30, 30] },
        { t0: A.pelajaran - .35, t1: A.namun + .05, im: IM.boul, dim: .64, z: [1.05, 1.15] },
        { t0: A.namun - .35, t1: A.sekarang + .05, im: IM.keys, dim: .58, side: 'right', z: [1.05, 1.14], pan: [-30, 20] },
        { t0: A.sekarang - .35, t1: DUR, V: V.klub, dim: .52, z: [1.05, 1.2], speed: .4 }]); },
    full: () => FULLS ??= [{ im: IM.cna, t0: A.tetapi - .1, t1: A.belum - .15, dir: 1, tab: 'CNA · 19 Nov 2026 · channelnewsasia.com', hl: [[.165, .497, .67, .072, A.cna]] }] });
}
