// Bab 1 · Gelembung itu apa (VO abd_vo_ahmad_04, 76.5 s). One depth row; the akik stone (= NILAI) sits on a glass etalase
// inside a glass bubble (= HARGA): pumped by the crowd, trembling on "goyah", deflating on "kempes" with a ghost of its old size.
// S0 akik world · S1 harga steps vs flat kualitas · S2 keyakinan goyah, crowd vanishes · S3 kempes close-up · S4 IMF ·
// [tes.js: the approved Gelembung-pecah shot, full screen, gel → pendorong] · S6 pendorong: arrows · S7 BUKAN palsu/tipu ·
// S8 internet 2000 · S9 nilai vs harga chart, the gap filled with real soap film · S10 Oktober 2025 + CNBC full ·
// S11 IMF "mirip 25 tahun lalu" · S12 BoE full + "stretched" band · S13 the question, a bubble swelling with soap footage.
// No invented numbers: charts are schematic ("ilustrasi"), only the VO's own years appear.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, ivo, setFont, DISP, SER, MONO, rnd, D2R, timing, makeChapter,
  loadImg, loadVid, plate, fall, typeOn, markLine, srcTag, slab, txt, gone } from './kit.js';
import { kq, popAt, doc, stamp } from './draw.js';
import { bubble, pumped, wobble } from './gelembung.js';
import { makeTes } from './tes.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const SHELF = 300, INK = '#1D1E18';

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {}, tes = makeTes(A);

  async function load() {
    const vb = '../assets/shared/vid/', kb = '../assets/shared/kutipan/';
    V.dekat = await loadVid(vb, 'gel_dekat'); V.tiup = await loadVid(vb, 'gel_tiup');
    IM.cnbc = await loadImg(kb + 'cnbc-buckle-up-imf-and-bank-of-england-join.png', 1800);
    IM.boe = await loadImg(kb + 'bankofengland-financial-policy-committee-record.png', 1800);
    await tes.load();
  }

  // ── the akik world (S0–S3 share one state, so neighbours seen in transit agree) ─────────────────────────────
  const PUMPS = [[A.diburu, .15], [A.naik1, .12], [A.tinggi, .15], [A.pede, .12], [A.besok, .12], [A.mahal1, .2], [A.lagi, .1]];
  const R0 = 170, KEMP = A.kempes - .05;
  const fullR = t => R0 * pumped(t, A.akik, PUMPS, .008);
  const priceR = t => fullR(t) * (1 - .52 * E.outCubic(inv(KEMP, KEMP + .6, t)));
  const priceW = t => wobble(t, PUMPS, [A.goyah - .15, A.ngilang + .25]) + (t > KEMP ? .05 * Math.exp(-(t - KEMP) / .35) * Math.sin((t - KEMP) * 24) : 0);

  function akik(ctx, x, y, s) {                               // cabochon agate on a silver ring, line-art metal, ring bottom at (x, y)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(0, 2, 96, 12, 0, 0, 7); ctx.fill();
    const sg = ctx.createLinearGradient(-70, 0, 70, 0); sg.addColorStop(0, '#5F605A'); sg.addColorStop(.42, '#DCDACF'); sg.addColorStop(1, '#7E7F77');
    ctx.strokeStyle = sg; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(0, -70, 60, 70, 0, 0, 7); ctx.stroke();
    ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, -70, 52, 62, 0, 0, 7); ctx.stroke();
    ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(-74, -150); ctx.lineTo(74, -150); ctx.lineTo(58, -128); ctx.lineTo(-58, -128); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, -172, 80, 50, 0, Math.PI, 0); ctx.lineTo(80, -150); ctx.ellipse(0, -150, 80, 12, 0, 0, Math.PI); ctx.closePath(); ctx.clip();
    const bg = ctx.createLinearGradient(0, -222, 0, -140); bg.addColorStop(0, '#6F7A55'); bg.addColorStop(1, '#2F3826'); ctx.fillStyle = bg; ctx.fillRect(-90, -230, 180, 100);
    const BAND = ['#A98C58', '#4A5638', '#C4A877', '#3A4430', '#8E7646', '#56623F', '#B79C6A'];
    ctx.lineWidth = 6; ctx.globalAlpha *= .72;
    for (let i = 0; i < 7; i++) { ctx.strokeStyle = BAND[i]; ctx.beginPath(); ctx.ellipse(8 * Math.sin(i * 1.7), -160 + i * 1.5, 74 - i * 10, 46 - i * 6.2, -.05, 0, 7); ctx.stroke(); }
    ctx.globalAlpha /= .72;
    const sp = ctx.createRadialGradient(-28, -200, 0, -28, -200, 34); sp.addColorStop(0, ivo(.75)); sp.addColorStop(1, ivo(0));
    ctx.fillStyle = sp; ctx.fillRect(-70, -240, 90, 80); ctx.restore();
    ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, -172, 80, 50, 0, Math.PI, 0); ctx.stroke();
    ctx.restore();
  }
  function orang(ctx, x, y, s) {                              // a buyer, line-art bust
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = ivo(.5); ctx.lineWidth = 4; ctx.beginPath();
    ctx.arc(0, -150, 32, 0, 7); ctx.moveTo(-78, 0); ctx.bezierCurveTo(-78, -104, 78, -104, 78, 0); ctx.stroke(); ctx.restore();
  }
  const CROWD = [-1, 1, -1, 1, -1, 1, -1, 1].map((sd, i) => ({ sd, k: i >> 1, s: .78 + .16 * rnd(i + 4) }));
  function crowd(ctx, t, ox) {
    CROWD.forEach((p, i) => {
      const ta = A.diburu - .25 + i * .06, tl = A.ngilang + .05 + i * .05; if (t < ta) return;
      const k = spring(t - ta, .62, .45), lv = E.inCubic(inv(tl, tl + .3, t)); if (lv >= 1) return;
      const xe = ox + p.sd * (300 + 125 * p.k + 30 * rnd(i)), x = lerp(ox + p.sd * 1400, xe, k);
      ctx.save(); ctx.globalAlpha *= (1 - lv) * clamp((t - ta) / .2); orang(ctx, x, SHELF + 70 - 60 * lv, p.s * (1 + .15 * lv)); ctx.restore();
    });
  }
  function shelf(ctx, ox) {                                   // the glass etalase: top edge, front pane, one streak
    const g = ctx.createLinearGradient(0, SHELF, 0, SHELF + 120); g.addColorStop(0, ivo(.09)); g.addColorStop(1, ivo(0));
    ctx.fillStyle = g; ctx.fillRect(ox - 980, SHELF, 1960, 120);
    ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ox - 980, SHELF); ctx.lineTo(ox + 980, SHELF); ctx.stroke();
    ctx.strokeStyle = ivo(.07); ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(ox - 520, SHELF + 110); ctx.lineTo(ox - 420, SHELF + 8); ctx.stroke();
  }
  function world(ctx, t, ox, o = {}) {
    if (o.crowd !== false) crowd(ctx, t, ox);
    if (t > A.akik - .1) { const k = Math.min(1.08, spring(t - A.akik + .1, .5, .32)); akik(ctx, ox, SHELF, k); }
    if (o.ghost && t > KEMP) {                                 // where the price used to be
      const rg = fullR(KEMP); ctx.save(); ctx.globalAlpha *= .3 * clamp((t - KEMP) / .3); ctx.setLineDash([10, 14]); ctx.strokeStyle = IVORY; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(ox, SHELF - rg * .98, rg, Math.PI * .93, Math.PI * 2.07); ctx.stroke(); ctx.restore();
    }
    const r = priceR(t); if (r > 1) bubble(ctx, ox, SHELF - r * .98, r, t, { wob: priceW(t), ten: .5 * inv(A.goyah - .2, A.ngilang, t) * (1 - inv(KEMP, KEMP + .3, t)), floor: SHELF, film: .12 });
    shelf(ctx, ox);
  }

  // ── props ───────────────────────────────────────────────────────────────────────────────────────────────────
  function globe(ctx, x, y, r, t) {                           // line-art globe turning behind "IMF"
    ctx.save(); ctx.strokeStyle = ivo(.13); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 7);
    for (let i = 0; i < 6; i++) { const ph = ((t * .12 + i / 6) % 1) * Math.PI, rx = Math.abs(Math.cos(ph)) * r; ctx.moveTo(x + rx, y); ctx.ellipse(x, y, Math.max(1, rx), r, 0, 0, 7); }
    for (const q of [-.6, -.3, 0, .3, .6]) { const yy = y + q * r, rx = Math.sqrt(1 - q * q) * r; ctx.moveTo(x + rx, yy); ctx.lineTo(x - rx, yy); }
    ctx.stroke(); ctx.restore();
  }
  function arrows(ctx, t) {                                   // the one driver: everyone expects up · one path per band
    const t0 = A.pendorong - .3, ph = 140 * (t - t0) + 420 * Math.max(0, t - A.naik2) ** 1.3;
    ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let band = 0; band < 3; band++) {
      ctx.strokeStyle = ivo(.07 + band * .06); ctx.beginPath();
      for (let i = band; i < 66; i += 3) {
        const x = (rnd(i + 1) - .5) * 2000, s = 14 + 26 * rnd(i + 31), y = 620 - ((ph * (.7 + .6 * rnd(i + 7)) + rnd(i + 9) * 1300) % 1300);
        ctx.moveTo(x - s, y + s * .7); ctx.lineTo(x, y); ctx.lineTo(x + s, y + s * .7);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
  function monitor(ctx, x, y, t) {                            // a year-2000 CRT, line-art, a dial-up page loading in chunks
    ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = '#12130F'; ctx.strokeStyle = IVORY; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.roundRect(-310, -240, 620, 450, 28); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-70, 210); ctx.lineTo(-110, 300); ctx.lineTo(110, 300); ctx.lineTo(70, 210); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-170, 300); ctx.lineTo(170, 300); ctx.stroke();
    ctx.fillStyle = '#191A15'; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-260, -195, 520, 345, 14); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = ivo(.45); ctx.lineWidth = 2; ctx.strokeRect(-235, -175, 470, 32);
    typeOn(ctx, 'http://www.', -222, -152, t, A.internet, MN(19, 400), { cps: 14, col: ivo(.75) });
    const p = Math.floor(inv(A.internet + .2, A.beneran, t) * 10) / 10;
    ctx.fillStyle = ivo(.12); for (let i = 0; i < 5; i++) if (p > i * .2) ctx.fillRect(-235, -118 + i * 40, (i % 2 ? 330 : 440) * (i === 4 ? .6 : 1), 22);
    ctx.strokeStyle = ivo(.5); ctx.strokeRect(-235, 104, 470, 22); ctx.fillStyle = ivo(.7); ctx.fillRect(-232, 107, 464 * p, 16);
    for (let i = 0; i < 4; i++) { const s = Math.floor(t * 8 + i * 7) % 9; ctx.fillStyle = ivo(.04 + .03 * (s / 9)); ctx.fillRect(-260, -195 + i * 86 + (t * 40 % 86), 520, 3); }   // scanlines
    ctx.restore();
  }
  function spikes(ctx, x, y, w, h, t, t0, o = {}) {           // schematic hype curve (no axis numbers)
    const k = E.inOutCubic(inv(t0, t0 + 1.1, t)); if (k <= 0) return;
    const f = u => { const b = .08 + .12 * u + .05 * Math.sin(u * 23 + o.seed) * u; const sp = Math.exp(-((u - .72) ** 2) / .012) * .8; return u > .72 && o.crash ? b + .8 * Math.exp(-(((u - .72) * 9) ** 2)) : b + (u < .72 ? sp * (u / .72) ** 3 : sp); };
    ctx.save(); ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - w / 2, y + h / 2); ctx.lineTo(x + w / 2, y + h / 2); ctx.stroke();
    ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath();
    const n = Math.floor(80 * k * (o.crash ? 1 : .74));
    for (let i = 0; i <= n; i++) { const u = i / 80, px = x - w / 2 + u * w, py = y + h / 2 - f(u) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.stroke();
    if (!o.crash && k > .98) { const u = n / 80, px = x - w / 2 + u * w, py = y + h / 2 - f(u) * h, pu = .5 + .5 * Math.sin(t * 7);
      ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(px, py, 9 + 6 * pu, 0, 7); ctx.globalAlpha *= .35; ctx.fill(); ctx.globalAlpha /= .35; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill(); }
    ctx.restore();
  }

  // ── stations ────────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, dist: [1660, 1480], draw(ctx, t) {              // S0 · masih inget batu akik? a stone on the etalase, the price bubble forms
      txt(ctx, 'MASIH INGET?', 0, -400, t, A.masih + .15, MN(26), { ls: 8, col: ivo(.7), align: 'center' });
      fall(ctx, 'DEMAM BATU AKIK', 0, -250, t, A.akik + .2, DSP(150), { align: 'center' });
      world(ctx, t, 0);
      txt(ctx, 'DIBURU ORANG', 0, SHELF + 110, t, A.diburu + .1, MN(22), { ls: 6, col: ivo(.6), align: 'center' });
    } },
    { at: A.harganya - .15, via: 'push', draw(ctx, t) {      // S1 · harga climbs in steps, kualitas stays flat
      world(ctx, t, -560, { crowd: false });
      const X0 = 20, X1 = 760, YB = 220, t0 = A.harganya, t1 = A.lagi + .5, xs = s => lerp(X0, X1, inv(t0, t1, s));
      const STEP = [A.naik1, A.tinggi, A.pede, A.besok, A.mahal1, A.lagi], lv = s => STEP.reduce((a, p) => a + E.snap(inv(p, p + .22, s)), 0) / STEP.length;
      if (t > t0) {
        ctx.save(); ctx.strokeStyle = ivo(.45); ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(X0, YB); ctx.lineTo(xs(t), YB); ctx.stroke(); ctx.restore();
        ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath();
        for (let s = t0, i = 0; s <= t; s += 1 / 30, i++) { const px = xs(s), py = YB - 430 * lv(s); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
        ctx.stroke(); const tx = xs(t), ty = YB - 430 * lv(t);
        ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(tx, ty, 9, 0, 7); ctx.fill();
        setFont(ctx, MN(22), 4); ctx.textAlign = 'left'; ctx.fillText('HARGA', tx + 22, ty + 8);
      }
      typeOn(ctx, 'KUALITAS BATU · SAMA', X0, YB + 52, t, A.bukan, MN(22), { ls: 4, cps: 30, col: ivo(.7) });
      ctx.save(); ctx.globalAlpha *= gone(t, A.tapi - .1); markLine(ctx, 'bukan karena batunya makin ', 'bagus', '', 0, 470, t, A.bukan, 1e9, SRF(62)); ctx.restore();
      markLine(ctx, 'tapi karena besok bisa dijual ', 'LEBIH MAHAL', '', 0, 470, t, A.tapi, A.mahal1, SRF(62));
    } },
    { at: A.eh - .12, via: 'whip', draw(ctx, t) {            // S2 · keyakinan goyah: the bubble trembles, the buyers vanish
      world(ctx, t, 420);
      fall(ctx, 'KEYAKINAN', -880, -120, t, A.keyakinan, DSP(170));
      fall(ctx, 'GOYAH', -880, 60, t, A.goyah, DSP(170), { drop: -40 });
      typeOn(ctx, 'PEMBELI · HILANG', -876, 150, t, A.ngilang, MN(24), { ls: 5, cps: 28, col: ivo(.7) });
    } },
    { at: A.batunya2 - .15, via: 'push', dist: [1180, 1080], draw(ctx, t) {   // S3 · close on the etalase: the price deflates, the stone stays
      world(ctx, t, 0, { crowd: false, ghost: true });
      markLine(ctx, 'yang ', 'KEMPES', ' itu harganya', 0, -250, t, A.yang - .25, A.kempes, SRF(78));
      typeOn(ctx, 'BATU · MASIH DI ETALASE', 0, SHELF + 70, t, A.masih2, MN(24), { ls: 5, cps: 26, col: ivo(.7), align: 'center' });
    } },
    { at: A.kalau - .12, via: 'rise', draw(ctx, t) {         // S4 · bahasa resmi: IMF
      globe(ctx, 0, 40, 360, t);
      typeOn(ctx, 'BAHASA RESMI · LEMBAGA DUNIA', 0, -380, t, A.bahasa, MN(26), { ls: 6, cps: 30, col: ivo(.7), align: 'center' });
      fall(ctx, 'IMF', 0, 190, t, A.imf - .05, DSP(440), { align: 'center' });
      txt(ctx, 'kira-kira gini:', 0, 340, t, A.gini - .05, SRF(64), { align: 'center' });
      srcTag(ctx, 'IMF Finance & Development, Des 2024', -860, 470, t, A.imf + .25);
    } },
    { at: A.pendorong, via: 'cut', draw(ctx, t) {            // S6 · pendorongnya satu: everyone expects "up"
      arrows(ctx, t);
      txt(ctx, 'PENDORONGNYA', 0, -330, t, A.pendorong + .05, MN(28), { ls: 8, col: ivo(.7), align: 'center' });
      fall(ctx, 'SATU', 0, 20, t, A.satu - .05, DSP(300), { align: 'center' });
      markLine(ctx, 'orang ', 'NGAREP', ' harga naik terus', 0, 250, t, A.satu + .4, A.ngarep, SRF(76));
    } },
    { at: A.jadi - .1, via: 'whip', draw(ctx, t) {           // S7 · gelembung itu BUKAN palsu / tipu-tipu
      txt(ctx, 'GELEMBUNG ITU', 0, -380, t, A.gel2, MN(28), { ls: 8, col: ivo(.7), align: 'center' });
      stamp(ctx, 'BUKAN', 0, -240, t, A.bukan2, { size: 120 });
      [['BARANG PALSU', -440, 110, -3, A.barangnya, A.palsu + .05], ['TIPU-TIPU', 440, 130, 3, A.palsu + .3, A.tipu + .15]].forEach(([s, x, y, rot, t0, ts]) =>
        popAt(ctx, x, y, t, t0, () => {
          doc(ctx, 0, 0, 640, 300); setFont(ctx, DSP(130), 2); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText(s, 0, 48);
          const k = kq(t, ts, .22), tw = ctx.measureText(s).width; ctx.textAlign = 'left';
          if (k > 0) { ctx.strokeStyle = INK; ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-tw / 2 - 20, 4); ctx.lineTo(-tw / 2 - 20 + (tw + 40) * k, -8); ctx.stroke(); }
        }, { rot, rise: 60 }));
    } },
    { at: A.pas - .1, via: 'truck', draw(ctx, t) {           // S8 · internet 2000: the internet was real
      monitor(ctx, -430, -20, t);
      fall(ctx, 'INTERNET', 60, -90, t, A.internet, DSP(200));
      fall(ctx, 'TAHUN 2000', 64, 60, t, A.th2000, DSP(120), { drop: -50 });
      slab(ctx, '✓ INTERNETNYA BENERAN ADA', 64, 170, t, A.beneran - .05, { size: 26 });
    } },
    { at: A.bermasalah - .1, via: 'push', draw(ctx, t) {     // S9 · harga outruns nilai; the gap is real soap film
      const X0 = -780, X1 = 780, xp = lerp(X0, X1, E.inOutCubic(inv(A.bermasalah, A.ngebut + .7, t)));
      const yN = x => 250 - 190 * (x - X0) / (X1 - X0), gap = x => 560 * Math.max(0, (x + 120) / 900) ** 2.3, yH = x => yN(x) - gap(x);
      ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X0, 320); ctx.lineTo(X1, 320); ctx.moveTo(X0, 320); ctx.lineTo(X0, -440); ctx.stroke();
      if (xp > -100) {                                        // soap film between the two lines
        ctx.save(); ctx.beginPath(); for (let x = -120; x <= xp; x += 12) ctx.lineTo(x, yH(x)); for (let x = xp; x >= -120; x -= 12) ctx.lineTo(x, yN(x)); ctx.closePath(); ctx.clip();
        const tg = ctx.createLinearGradient(0, -440, 0, 260); tg.addColorStop(0, ivo(.10)); tg.addColorStop(1, ivo(.03)); ctx.fillStyle = tg; ctx.fillRect(-140, -560, 940, 840);
        ctx.globalCompositeOperation = 'screen';           // the clip is bubbles on black: screen it, lifted
        plate(ctx, V.dekat, t, 330, -150, 1100, 820, 1, { t0: A.bermasalah, vig: .1, dim: 0, grade: 'saturate(.6) contrast(1.3) brightness(2.6)', marks: false, grain: 0 });
        ctx.globalCompositeOperation = 'source-over';
        for (let i = 0; i < 9; i++) { const bx = lerp(80, 760, rnd(i + 21)), by = 300 - ((t - A.bermasalah) * (60 + 50 * rnd(i + 5)) + rnd(i + 2) * 700) % 760;
          bubble(ctx, bx, by, 16 + 34 * rnd(i + 11), t + i, { wob: .02, film: .2 }); }
        ctx.restore();
      }
      ctx.lineJoin = 'round'; ctx.lineWidth = 5;
      ctx.strokeStyle = ivo(.6); ctx.beginPath(); for (let x = X0; x <= xp; x += 10) x === X0 ? ctx.moveTo(x, yN(x)) : ctx.lineTo(x, yN(x)); ctx.stroke();
      ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); for (let x = X0; x <= xp; x += 10) x === X0 ? ctx.moveTo(x, yH(x)) : ctx.lineTo(x, yH(x)); ctx.stroke();
      if (t > A.bermasalah) { setFont(ctx, MN(22), 4); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('HARGA', xp + 22, Math.max(-430, yH(xp) + 10)); ctx.textAlign = 'right';
        ctx.fillStyle = ivo(.7); ctx.fillText('NILAI ASLI', xp - 18, yN(xp) + 44); ctx.textAlign = 'left'; }
      if (t > A.jauh2) { const xm = xp - 250, k = spring(t - A.jauh2, .5, .3);
        ctx.save(); ctx.translate(xm, (yN(xm) + yH(xm)) / 2 + 30); ctx.scale(k, k); setFont(ctx, DSP(96), 3); ctx.fillStyle = LIME; ctx.textAlign = 'center'; ctx.fillText('GELEMBUNG', 0, 0); ctx.restore(); ctx.textAlign = 'left'; }
      txt(ctx, 'ILUSTRASI · TANPA ANGKA', X0, 380, t, A.bermasalah + .3, MN(18), { ls: 4, col: ivo(.45) });
    } },
    { at: A.nah - .1, via: 'whip', draw(ctx, t) {            // S10 · sejak Oktober 2025 (CNBC full-frame rides over it)
      txt(ctx, 'SEJAK', 0, -230, t, A.nah + .05, MN(28), { ls: 10, col: ivo(.7), align: 'center' });
      fall(ctx, 'OKTOBER 2025', 0, 60, t, A.oktober, DSP(230), { align: 'center' });
      typeOn(ctx, 'LEMBAGA DUNIA · BIASANYA KALEM', 0, 190, t, A.th2025 + .4, MN(26), { ls: 5, cps: 34, col: ivo(.7), align: 'center' });
    } },
    { at: A.kepala, via: 'rise', draw(ctx, t) {              // S11 · IMF: mirip heboh internet 25 tahun lalu
      typeOn(ctx, 'KEPALA IMF', 0, -400, t, A.kepala + .05, MN(26), { ls: 8, cps: 24, col: ivo(.7), align: 'center' });
      markLine(ctx, 'harga saham AI ', 'MIRIP', ' heboh internet', 0, -300, t, A.harga2 - .1, A.mirip, SRF(66));
      spikes(ctx, -430, 10, 560, 300, t, A.hebohnya, { crash: true, seed: 1 });
      spikes(ctx, 430, 10, 560, 300, t, A.hebohnya + .35, { seed: 4 });
      txt(ctx, '≈', 0, 60, t, A.internet2, DSP(150), { align: 'center' });
      txt(ctx, '2000', -430, 220, t, A.hebohnya + .2, MN(24), { ls: 6, col: ivo(.75), align: 'center' });
      txt(ctx, 'SEKARANG', 430, 220, t, A.hebohnya + .5, MN(24), { ls: 6, col: ivo(.75), align: 'center' });
      fall(ctx, '25 TAHUN LALU', 0, 370, t, A.th25, DSP(110), { align: 'center' });
      txt(ctx, 'ILUSTRASI', 700, 250, t, A.hebohnya + .6, MN(16), { ls: 4, col: ivo(.4) });
      srcTag(ctx, 'IMF, 8 Okt 2025', -860, 470, t, A.kepala + .4);
    } },
    { at: A.bank, via: 'whip', draw(ctx, t) {                // S12 · Bank of England: valuations stretched (BoE full-frame rides over it)
      const k = E.inOutCubic(inv(A.keliatannya, A.kemahalan + .25, t)), sag = 170 * k + (t > A.kemahalan ? 26 * Math.exp(-(t - A.kemahalan) / .3) * Math.sin((t - A.kemahalan) * 20) : 0);
      ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-640, 230); ctx.quadraticCurveTo(0, 230 + 2 * sag, 640, 230); ctx.stroke();   // a band pulled taut
      ctx.fillStyle = IVORY; for (const x of [-640, 640]) { ctx.beginPath(); ctx.arc(x, 230, 10, 0, 7); ctx.fill(); }
      typeOn(ctx, '"…APPEAR STRETCHED"', 0, -250, t, A.keliatannya - .15, MN(40), { ls: 3, cps: 26, align: 'center' });
      markLine(ctx, 'harga perusahaan AI keliatannya ', 'KEMAHALAN', '', 0, -60, t, A.keliatannya - .2, A.kemahalan, SRF(70));
      srcTag(ctx, 'Bank of England, Okt 2025', -860, 470, t, A.keliatannya);
    } },
    { at: A.tanya - .1, via: 'push', draw(ctx, t) {          // S13 · the question: a bubble keeps swelling
      const r = 160 * pumped(t, A.tanya, [[A.angka, .25], [A.bisnis, .3], [A.ai3, .3], [A.kenyataan, .35]], .04), cy = -40 - 6 * Math.sin(t * 1.4);
      if (r > 1) bubble(ctx, -470, cy, r, t, { wob: wobble(t, [[A.angka], [A.bisnis], [A.ai3], [A.kenyataan]]), ten: inv(A.sejauhan, A.kenyataan + .5, t), film: .14,
        inner: c => plate(c, V.tiup, t, -470, cy, r * 2.1, r * 2.1, 1, { t0: A.tanya, vig: .35, dim: .22, grade: 'saturate(.5) contrast(1.1) brightness(.85)', marks: false }) });
      txt(ctx, 'Pertanyaannya sekarang:', 0, -250, t, A.tanya + .05, SRF(60));
      typeOn(ctx, 'ANGKA-ANGKA BISNIS AI', 4, -120, t, A.angka - .05, MN(34), { ls: 4, cps: 22 });
      txt(ctx, 'sejauh apa dari', 0, 40, t, A.sejauhan - .1, SRF(76));
      markLine(ctx, '', 'KENYATAAN', '?', 0, 150, t, A.sejauhan + .3, A.kenyataan, SRF(90), { align: 'left' });
    } },
  ];

  let FULLS;
  const ch = makeChapter({ B, ST, load, label: 'BAB 1 · GELEMBUNG ITU APA', full: () => FULLS ??= [
    { im: IM.cnbc, t0: A.lembaga2 - .05, t1: A.kepala + .05, dir: 1, tab: 'cnbc.com · 9 Okt 2025',
      hl: [[.536, .30, .40, .10, A.nyebut], [.032, .418, .17, .097, A.gel3]] },
    { im: IM.boe, t0: A.bank - .05, t1: A.keliatannya - .05, dir: -1, dark: true, tab: 'bankofengland.co.uk · Okt 2025',
      hl: [[.32, .33, .33, .14, A.inggris + .25]] },
  ] });
  const row = ch.draw, T0 = A.gel - .42, T1 = A.pendorong - .12;
  ch.draw = (ctx, t) => (t > T0 && t < T1) ? tes.draw(ctx, t) : row(ctx, t);     // the approved Gelembung-pecah shot, own camera
  return ch;
}
