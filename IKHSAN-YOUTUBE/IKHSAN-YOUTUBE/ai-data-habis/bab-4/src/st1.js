// Bab 4 · stations 1–18 (model collapse → bahasa daerah). Station-local units ≈ screen px at dist ~1500, centre 0,0.
import { clamp, inv, lerp, E, IVORY, LIME, GREY, ivo, setFont, rnd, evid, fall, typeOn, markLine, srcTag, slab, txt, plate as clip } from './kit.js';
import { DSP, SRF, MN, HND, addF, zs, gpdf, person, wave, meter, arrow, asliTag } from './ui.js';
import { glass, bar, NEUTRAL, DW, DH } from './copier.js';

const PAL = ['#B4735A', '#C4A256', '#7E9A78', '#62809E', '#8C6E8E', '#D2C29C', '#A7584E', '#5E8C86'];   // muted "palet" (data, not accent)
const greyed = (hex, k) => { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255, L = .3 * r + .59 * g + .11 * b;
  return `rgb(${Math.round(lerp(r, L, k))},${Math.round(lerp(g, L, k))},${Math.round(lerp(b, L, k))})`; };

export function stations1(A, X) {
  const IM = X.IM;
  // light-on-dark copy of a paper canvas (the word / copier prints read as toner light on the dark room)
  const neg = (ctx, im, x, y, w, h) => { const f0 = addF(ctx, 'invert(1) grayscale(1) contrast(1.8)'), op = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = 'screen'; ctx.drawImage(im, x, y, w, h); ctx.globalCompositeOperation = op; ctx.filter = f0; };
  return [
    { at: 0, name: 'Pembuka · fotokopi', draw() {} },                                  // W0 (copier.js) owns 0 → nah

    // 1 · MODEL COLLAPSE: the word is printed by the scan bar, its own copies peel off behind it and collapse
    { at: A.nah, via: 'cut', name: 'Model collapse', draw(ctx, t) {
      typeOn(ctx, 'NAH, ITU GAMBARAN DARI:', -850, -300, t, A.gambaran - .2, MN(24), { ls: 4, col: ivo(.72), cps: 40 });
      const WD = X.WORD, w = 1700, h = w * WD[0].height / WD[0].width, x0 = -w / 2, y0 = -60 - h / 2;
      for (let g = 5; g >= 1; g--) {                                                     // echo copies, deeper = older
        const k = E.outQuint(inv(A.collapse + .07 * g, A.collapse + .07 * g + .55, t)); if (k <= 0) continue;
        const dr = E.inCubic(inv(A.runtuhnya + .06 * (5 - g), A.runtuhnya + .06 * (5 - g) + .75, t)), s = Math.pow(.9, g * k);
        ctx.save(); ctx.globalAlpha = (1 - .14 * g) * k * (1 - dr);
        ctx.translate(-50 * g * k + 30 * dr * (rnd(g) - .5) * 8, -60 - 40 * g * k + 560 * dr); ctx.rotate(dr * (rnd(g + 3) - .5) * .5); ctx.scale(s, s);
        neg(ctx, WD[g], -w / 2, -h / 2, w, h); ctx.restore();
      }
      const q = inv(A.gambaran - .1, A.collapse + .1, t), yb = y0 + lerp(-.04, 1.04, q) * h, q2 = inv(A.mutu - .1, A.mutu + .55, t), yb2 = y0 + lerp(-.04, 1.04, q2) * h;
      if (q > 0) {
        ctx.save(); ctx.beginPath(); ctx.rect(x0 - 4, Math.max(y0 - 4, yb2), w + 8, Math.max(0, yb - Math.max(y0 - 4, yb2))); ctx.clip(); neg(ctx, WD[0], x0, y0, w, h); ctx.restore();
        if (q2 > 0) { ctx.save(); ctx.beginPath(); ctx.rect(x0 - 4, y0 - 4, w + 8, yb2 - y0 + 4); ctx.clip(); neg(ctx, WD[5], x0, y0, w, h); ctx.restore(); }
        if (q < 1) bar(ctx, x0, yb, w, 1, Math.sin(Math.PI * q));
        if (q2 > 0 && q2 < 1) bar(ctx, x0, yb2, w, 1, Math.sin(Math.PI * q2));
      }
      txt(ctx, 'alias runtuhnya mutu AI', 0, 250, t, A.alias - .1, SRF(68), { align: 'center' });
      txt(ctx, 'SALINAN DARI SALINAN DARI SALINAN …', 0, 330, t, A.runtuhnya + .2, MN(20), { align: 'center', ls: 5, col: ivo(.55) });
    } },

    // 2 · the proof: Nature, July 2024
    { at: A.buktinya, via: 'whip', name: 'Bukti: Nature 2024', draw(ctx, t) {
      evid(ctx, IM.nat, 0, -130, 1440, t, A.buktinya + .05, { crop: [0, 0, 1, .9], tab: 'nature.com',
        hl: [[.038, .189, .93, .122, A.nature], [.038, .322, .305, .122, A.nature + .4], [.24, .089, .205, .061, A.juli]] });
      slab(ctx, 'MODEL COLLAPSE = MODEL RUSAK KARENA BELAJAR DARI KELUARAN MODEL', 0, 290, t, A.terbit + .1, { align: 'center', size: 24 });
      srcTag(ctx, 'Sumber: Nature, 24 Jul 2024', -840, 470, t, A.buktinya + .4);
    } },

    // 3 · trained again and again: the defect is born once and every later generation carries it
    { at: A.pas2, via: 'push', name: 'Cacatnya permanen', draw(ctx, t) {
      typeOn(ctx, 'AI → TULISAN AI → AI BARU → TULISAN AI → …', -860, -330, t, A.pas2 + .05, MN(26), { ls: 2, col: ivo(.8), cps: 38 });
      const tw = 300, th = tw * DH / DW;
      for (let i = 0; i < 5; i++) {
        const x = -720 + i * 360, y = -40, t0 = A.dilatih + i * .3, k = E.outQuint(inv(t0 - .2, t0 + .3, t)); if (k <= 0) continue;
        glass(ctx, X.GEN[i * 2], x, y + (1 - k) * 50, tw, th, { q: inv(t0, t0 + .45, t), m: 12, label: `GENERASI ${i + 1}`, ls: 16, a: clamp(k * 1.5) });
        if (i < 4) arrow(ctx, x + tw / 2 + 20, y, x + 360 - tw / 2 - 20, y, E.outCubic(inv(t0 + .3, t0 + .6, t)));
        if (i >= 1) {
          const bx = x - 50, by = y + 26, r = 10 + 4 * i, g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
          g.addColorStop(0, 'rgba(18,18,20,.9)'); g.addColorStop(.6, 'rgba(18,18,20,.5)'); g.addColorStop(1, 'rgba(18,18,20,0)');
          ctx.globalAlpha = clamp(inv(t0 + .15, t0 + .4, t)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, r, 0, 7); ctx.fill();
          const kr = E.outQuint(inv(A.cacatnya + .12 * (i - 1), A.cacatnya + .12 * (i - 1) + .35, t));
          if (kr > 0) { ctx.globalAlpha = kr; ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by, lerp(90, 34, kr), 0, 7); ctx.stroke(); }
          ctx.globalAlpha = 1;
        }
      }
      txt(ctx, 'CACAT YANG SAMA, IKUT TERUS', 0, 150, t, A.cacatnya + .55, MN(22), { align: 'center', ls: 4, col: ivo(.75) });
      fall(ctx, 'PERMANEN', 0, 360, t, A.permanen - .05, DSP(170), { align: 'center', ls: 3 });
    } },

    // 4 · the bell curve narrows, the edges die first
    { at: A.dan, via: 'whip', name: 'Pinggiran hilang', tag: 'EKOR', draw(ctx, t) {
      const G = 1 + 5 * E.inOutCubic(inv(A.ilang2, A.ekornya + .3, t)), f = (.30 - .035 * (G - 1)) / .30, zc = 3.2 - .35 * (G - 1);
      const B0 = 330, S = 300, HH = 250, k0 = E.outCubic(inv(A.dan - .2, A.dan + .5, t)), hy = (z, ff) => B0 - k0 * HH / ff * gpdf(z);
      ctx.fillStyle = ivo(.35); ctx.fillRect(-940, B0, 1880, 2);
      ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.setLineDash([8, 10]); ctx.beginPath();
      for (let i = 0; i <= 120; i++) { const z = -3.2 + 6.4 * i / 120; i ? ctx.lineTo(z * S, hy(z, 1)) : ctx.moveTo(z * S, hy(z, 1)); } ctx.stroke(); ctx.setLineDash([]);
      const pa = new Path2D(), pd = new Path2D();
      for (let i = 0; i < 900; i++) {
        const z = clamp(zs(i), -3.4, 3.4), u = rnd(i + 5000), az = Math.abs(z), x = z * S * f;
        if (az < zc) { pa.rect(x - 3, hy(z, f) + u * (B0 - hy(z, f)) - 3, 6, 6); continue; }
        const d = (az - zc) / .45; if (d > 1) continue;
        pd.rect(x - 3 + Math.sign(z) * 60 * d, hy(z, f) + u * (B0 - hy(z, f)) + 160 * d * d - 3, 6, 6);
      }
      ctx.fillStyle = ivo(.82); ctx.fill(pa); ctx.fillStyle = 'rgba(124,125,116,.55)'; ctx.fill(pd);
      ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 0; i <= 100; i++) { const z = -zc + 2 * zc * i / 100; i ? ctx.lineTo(z * S * f, hy(z, f)) : ctx.moveTo(z * S * f, hy(z, f)); } ctx.stroke();
      txt(ctx, 'GENERASI', -860, -400, t, A.dan, MN(22), { ls: 5, col: ivo(.7) });
      if (t > A.dan) { setFont(ctx, DSP(130), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(String(Math.min(6, Math.floor(G + 1e-6))), -866, -270); }
      txt(ctx, 'TENGAH: AMAN', 0, hy(0, f) - 36, t, A.tengahnya - .1, MN(26), { align: 'center', ls: 4, col: ivo(.9) });
      const ex = zc * S * f;
      if (t > A.pinggirannya - .1) for (const sg of [-1, 1]) {
        txt(ctx, 'PINGGIR', sg * (ex + 40), B0 - 70, t, A.pinggirannya - .1, MN(26), { align: sg < 0 ? 'right' : 'left', ls: 4, col: ivo(.9) });
        arrow(ctx, sg * (ex + 34), B0 - 60, sg * (ex - 10), B0 - 20, E.outCubic(inv(A.pinggirannya, A.pinggirannya + .3, t)), ivo(.7), 2);
      }
      fall(ctx, 'EKOR', -700, 210, t, A.ekornya - .08, DSP(140), { align: 'center', ls: 3 });
      fall(ctx, 'EKOR', 700, 210, t, A.ekornya, DSP(140), { align: 'center', ls: 3 });
    } },

    // 5 · the tail = rare things; the erosion eats it from the far end
    { at: A.ekor, via: 'push', name: 'Ekor = langka', draw(ctx, t) {
      txt(ctx, 'EKOR =', -860, -390, t, A.ekor - .05, MN(26), { ls: 5, col: ivo(.75) });
      fall(ctx, 'HAL UNIK & LANGKA', -866, -250, t, A.unik - .15, DSP(150), { ls: 2, stag: .02 });
      const C0 = -1100, SD = 600, AMP = 700, B0 = 340, yc = x => B0 - AMP * gpdf((x - C0) / SD);
      const xd = lerp(-960, 960, E.inOutCubic(inv(A.ekor - .1, A.ekor + .9, t))), xe = lerp(990, 40, E.inOutCubic(inv(A.cerita + .7, A.bayangin - .3, t))), xm = Math.min(xd, xe);
      ctx.beginPath(); ctx.moveTo(-960, B0); for (let x = -960; x <= xm; x += 12) ctx.lineTo(x, yc(x)); ctx.lineTo(xm, B0); ctx.closePath(); ctx.fillStyle = ivo(.07); ctx.fill();
      ctx.beginPath(); for (let x = -960; x <= xm; x += 12) x === -960 ? ctx.moveTo(x, yc(x)) : ctx.lineTo(x, yc(x)); ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = ivo(.35); ctx.fillRect(-960, B0, 1920, 2);
      if (xe < 985) { ctx.beginPath(); for (let i = 0; i < 80; i++) { const x = xe + rnd(i) * 180, y = B0 - 30 * rnd(i + 9) + ((t * 140 * (.4 + rnd(i + 3))) % 90); ctx.rect(x, y, 4, 4); } ctx.fillStyle = ivo(.32); ctx.fill(); }
      fall(ctx, 'LANGKA', 620, 250, t, A.langka - .1, DSP(110), { align: 'center', ls: 4 });
      [['KEJADIAN JARANG', 160, A.kejadian, 170, 'left'], ['PENDAPAT NGGAK PASARAN', 430, A.pendapat, 60, 'left'], ['CERITA YANG JARANG DITULIS', 700, A.cerita, -50, 'right']]
        .forEach(([s, x, t0, ly, al]) => {
          if (t < t0 - .2) return; const y = yc(x), a = (1 - clamp((xe - x) < 0 ? (x - xe) / 90 : 0)) * clamp((t - t0 + .2) * 5); if (a <= 0) return;
          ctx.globalAlpha = a; ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x, ly + 12); ctx.stroke();
          ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill();
          typeOn(ctx, s, al === 'left' ? x - 6 : x + 6, ly, t, t0 - .1, MN(24), { ls: 2, align: al, cps: 50 }); ctx.globalAlpha = 1;
        });
    } },

    // 6 · recipe cards: generation 1 knows every village recipe; by generation 5 only the plainest is left
    { at: A.bayangin, via: 'whip', name: 'Resep kue kampung', draw(ctx, t) {
      const G = 1 + 4 * E.inOutCubic(inv(A.eh - .15, A.kelima + .35, t)), gi = Math.min(5, Math.round((G - 1) * 1.25));
      txt(ctx, 'ILUSTRASI', 860, -440, t, A.bayangin, MN(18), { ls: 5, col: ivo(.5), align: 'right' });
      txt(ctx, 'AI GENERASI', -860, -440, t, A.generasi - .1, MN(22), { ls: 5, col: ivo(.75) });
      if (t > A.generasi - .1) { setFont(ctx, DSP(110), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(String(Math.floor(G + 1e-6)), -866, -330); }
      const cw = 440, ch = cw * 360 / 560, P = [[-560, -95], [0, -95], [560, -95], [-560, 245], [0, 245], [560, 245]];
      for (let i = 0; i < 6; i++) {
        const k = E.outQuint(inv(A.bayangin + .25 + .1 * i, A.bayangin + .75 + .1 * i, t)); if (k <= 0) continue;
        const td = A.eh - .05 + i * .28, dk = i < 5 ? E.outCubic(inv(td, td + .45, t)) : 0;
        const mv = i === 5 ? E.inOutCubic(inv(A.nyisa - .15, A.nyisa + .5, t)) : 0, s = lerp(1, 1.5, mv);
        const x = lerp(P[i][0], 0, mv), y = lerp(P[i][1], 20, mv) + (1 - k) * 60 + 40 * dk;
        glass(ctx, X.REC[i][dk > .5 ? 5 : gi], x, y, cw * s, ch * s, { m: 14 * s, a: clamp(k * 1.5) * lerp(1, .18, dk), bar: i < 5 ? inv(td - .3, td + .1, t) : inv(A.kelima, A.kelima + .5, t) });
        if (dk > 0) txt(ctx, 'HILANG', x, y + 12, t, td + .2, MN(26), { align: 'center', ls: 6, col: ivo(.8) });
      }
      slab(ctx, 'RESEP BOLU · PALING PASARAN', 0, 330, t, A.bolu - .05, { align: 'center', size: 26 });
    } },

    // 7 · the paper's note: the rare often belongs to the marginalised
    { at: A.peneliti, via: 'push', name: 'Kelompok terpinggirkan', draw(ctx, t) {
      evid(ctx, IM.nat, -470, -190, 800, t, A.peneliti, { crop: [0, 0, 1, .9], rot: -1.2, tab: 'nature.com', dim: .25 });
      txt(ctx, 'KUTIPAN MAKALAH (DIKETIK ULANG)', 60, -340, t, A.catatan - .2, MN(20), { ls: 4, col: ivo(.6) });
      typeOn(ctx, '“…often relevant to', 60, -250, t, A.catatan, SRF(58), { cps: 26 });
      typeOn(ctx, 'marginalized groups.”', 60, -175, t, A.catatan + .75, SRF(58), { cps: 26 });
      const kh = E.inOutCubic(inv(A.kelompok - .1, A.kelompok + .4, t));
      if (kh > 0) { setFont(ctx, SRF(58), 0); const ww = ctx.measureText('marginalized groups').width; const op = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(200,245,60,.42)'; ctx.fillRect(54, -222, (ww + 12) * kh, 62); ctx.globalCompositeOperation = op; }
      txt(ctx, 'sering nyangkut kelompok masyarakat yang terpinggirkan', 60, -100, t, A.kelompok + .2, MN(22, 400), { ls: 1, col: ivo(.78) });
      const kp = E.outQuint(inv(A.hal - .2, A.hal + .5, t)), ko = E.inOutCubic(inv(A.terpinggirkan - .1, A.terpinggirkan + .6, t));
      if (kp > 0) {
        const pc = new Path2D(), po = new Path2D();
        for (let i = 0; i < 13; i++) { const out = i < 3 || i > 9, sg = i < 6 ? -1 : 1, rank = out ? (i < 3 ? 3 - i : i - 9) : 0, x = -600 + i * 100 + sg * (120 + 50 * rank) * ko * (out ? 1 : 0);
          const ctx2 = out ? po : pc; ctx2.moveTo(x, 0); person(ctx2, x, 400 + (1 - kp) * 80, 130); }
        ctx.globalAlpha = kp; ctx.fillStyle = ivo(.85); ctx.fill(pc); ctx.globalAlpha = kp * lerp(1, .45, ko); ctx.fillStyle = ko > .3 ? GREY : ivo(.85); ctx.fill(po); ctx.globalAlpha = 1;
      }
      txt(ctx, 'TERPINGGIRKAN', -890, 205, t, A.terpinggirkan + .2, MN(22), { ls: 4, col: ivo(.7) });
      txt(ctx, 'TERPINGGIRKAN', 890, 205, t, A.terpinggirkan + .3, MN(22), { ls: 4, col: ivo(.7), align: 'right' });
      srcTag(ctx, 'Sumber: Nature, 24 Jul 2024', -840, 490, t, A.peneliti + .4);
    } },

    // 8 · whose voice is still heard: the outer voices flatten first
    { at: A.jadi, via: 'rise', name: 'Suara siapa', draw(ctx, t) {
      txt(ctx, 'YANG TERANCAM:', -860, -410, t, A.terancam - .1, MN(26), { ls: 5, col: ivo(.75) });
      fall(ctx, 'BUKAN CUMA MUTU JAWABANNYA', -866, -310, t, A.mutu2 - .15, DSP(96), { ls: 2, stag: .018 });
      const live = new Path2D(), flat = new Path2D(), k0 = E.outCubic(inv(A.jadi, A.jadi + .8, t));
      for (let i = 0; i < 9; i++) {
        const d = Math.abs(i - 4), tf = A.siapa + (4 - d) * .3, fl = d >= 2 ? E.inOutCubic(inv(tf, tf + .7, t)) : 0, amp = k0 * (32 - 4 * d) * (1 - fl) + 1.5;
        wave(fl > .5 ? flat : live, -860, 860, -180 + i * 58, amp, t, i * 7 + 1);
      }
      ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.strokeStyle = ivo(.88); ctx.stroke(live); ctx.strokeStyle = 'rgba(124,125,116,.6)'; ctx.stroke(flat);
      txt(ctx, 'SUARA PINGGIRAN', 860, -214, t, A.suaranya, MN(20), { ls: 4, col: ivo(.6), align: 'right' });
      fall(ctx, 'SIAPA YANG SUARANYA MASIH KEDENGERAN?', 0, 460, t, A.siapa - .05, DSP(92), { align: 'center', ls: 2, stag: .016 });
    } },

    // 9 · MAD
    { at: A.ada, via: 'whip', name: 'MAD', tag: 'MAD', draw(ctx, t) {
      txt(ctx, 'ISTILAH YANG LEBIH NGERI:', -860, -390, t, A.ada, MN(22), { ls: 4, col: ivo(.72) });
      fall(ctx, 'MAD', -872, 120, t, A.mad - .08, DSP(420), { ls: 8, stag: .06, drop: -140 });
      txt(ctx, 'Model Autophagy Disorder', -860, 225, t, A.mad + .35, SRF(54));
      typeOn(ctx, 'plesetan “mad cow disease” · penyakit sapi gila', -860, 300, t, A.plesetan, MN(22, 400), { ls: 1, col: ivo(.78), cps: 46 });
      evid(ctx, IM.mad, 450, -180, 880, t, A.ngeri - .1, { crop: [0, .27, .62, .30], tab: 'arxiv.org', hl: [[.029, .367, .71, .317, A.mad + .1]] });
      evid(ctx, IM.madn, 450, 120, 880, t, A.mad + .45, { crop: [0, 0, 1, .7], tab: 'news.rice.edu', rot: 1,
        hl: [[.028, .229, .84, .186, A.plesetan + .3], [.028, .414, .15, .186, A.plesetan + .65]] });
      srcTag(ctx, 'Sumber: Alemohammad dkk. (Rice), arXiv, 4 Jul 2023 · Rice News', -840, 470, t, A.ngeri);
    } },

    // 10 · the core: without fresh ASLI data, quality and diversity sink (toner falls off the bars)
    { at: A.intinya, via: 'push', name: 'Tanpa data asli', draw(ctx, t) {
      txt(ctx, 'INTINYA SAMA:', -860, -400, t, A.intinya - .05, MN(24), { ls: 6, col: ivo(.7) });
      markLine(ctx, 'TANPA DATA ', 'ASLI', ' SEGAR', 0, -200, t, A.tanpa - .1, A.asli, DSP(160), { ls: 3 });
      const dr = E.inOutCubic(inv(A.merosot - .05, A.merosot + .7, t)), M = [[A.mutu3, .92, .25, 70, 'MUTU'], [A.keragaman, .9, .2, 250, 'KERAGAMAN BAHASA']];
      const crumbs = new Path2D();
      for (const [t0, top, low, y, lab] of M) {
        const v = top * E.outCubic(inv(t0 - .05, t0 + .5, t)) * lerp(1, low / top, dr); meter(ctx, -620, y, 1240, v, lab, clamp((t - t0 + .25) * 4));
        if (dr > 0 && dr < 1) for (let i = 0; i < 70; i++) { const x = -620 + 1240 * lerp(v, top, rnd(i + y)), s = (t - A.merosot) * (300 + 500 * rnd(i + 2)); if (s > 0) crumbs.rect(x, y + 10 + s, 4, 4); }
      }
      ctx.fillStyle = ivo(.4); ctx.fill(crumbs);
      fall(ctx, 'MEROSOT', 0, 470, t, A.merosot - .05, DSP(110), { align: 'center', ls: 4 });
    } },

    // 11 · second impact: answers go uniform (word-dash lines morph into one shape)
    { at: A.dampak2, via: 'whip', name: 'Dampak 2 · seragam', tag: 'SERAGAM', draw(ctx, t) {
      fall(ctx, 'DAMPAK KEDUA', -866, -330, t, A.dampak2 - .05, DSP(130), { ls: 3 });
      txt(ctx, 'gaya jawabannya', -860, -255, t, A.dampak2 + .5, SRF(44), { col: ivo(.8) });
      const m = E.inOutCubic(inv(A.seragam - .25, A.seragam + .45, t)), p = new Path2D();
      for (let r = 0; r < 9; r++) {
        const k = E.outCubic(inv(A.dampak2 + .3 + r * .07, A.dampak2 + .8 + r * .07, t)); if (k <= 0) continue;
        let x = -560; const y = -170 + r * 52;
        for (let j = 0; j < 14 && x < 900; j++) { const wv = lerp(40 + 120 * rnd(r * 31 + j), 40 + 120 * rnd(j + 900), m); const ww = wv * k; p.rect(x, y, ww, 16); x += wv + 18; }
      }
      ctx.fillStyle = ivo(.75); ctx.fill(p);
      fall(ctx, 'SERAGAM', 0, 400, t, A.seragam - .05, DSP(170), { align: 'center', ls: 6 });
    } },

    // 12 · Guo et al.: a colour palette per generation, greying faster for creative writing
    { at: A.studi, via: 'push', name: 'Keragaman turun', draw(ctx, t) {
      txt(ctx, 'KERAGAMAN BAHASA AI PER GENERASI', -860, -400, t, A.studi - .05, MN(24), { ls: 4, col: ivo(.8) });
      const rows = [['RINGKASAN BERITA', .1], ['ABSTRAK ILMIAH', .12], ['CERITA (KREATIF)', .2]], cw = 180, chh = 120;
      for (let g = 0; g < 6; g++) txt(ctx, `GEN ${g + 1}`, -330 + g * 205 + cw / 2, -290, t, A.studi + .3 + .35 * g, MN(18), { align: 'center', ls: 3, col: ivo(.6) });
      rows.forEach(([lab, rate], r) => {
        const y = -200 + r * 175; txt(ctx, lab, -860, y + chh / 2 + 8, t, A.studi + .1 + .1 * r, MN(22), { ls: 2, col: ivo(.85) });
        for (let g = 0; g < 6; g++) {
          const k = E.outQuint(inv(A.studi + .3 + .35 * g, A.studi + .7 + .35 * g, t)); if (k <= 0) continue;
          const gk = clamp(g * rate * 1.2 * E.inOutCubic(inv(A.keragaman2 - .3, A.turun + .6, t)) + g * rate * .35), x0 = -330 + g * 205;
          for (let c = 0; c < 8; c++) {
            const cx = x0 + (c % 4) * (cw / 4), cy = y + Math.floor(c / 4) * (chh / 2) + (1 - k) * 30;
            ctx.globalAlpha = k; ctx.fillStyle = greyed(PAL[(c + r * 3) % 8], gk); ctx.fillRect(cx + 2, cy + 2, cw / 4 - 4, chh / 2 - 4);
          }
        }
      });
      ctx.globalAlpha = 1;
      const kb = E.outQuint(inv(A.parah - .1, A.parah + .35, t));
      if (kb > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.globalAlpha = kb; ctx.strokeRect(-890, 140, 1790 * kb, 160); ctx.globalAlpha = 1; }
      fall(ctx, 'PALING PARAH: TUGAS KREATIF', -866, 430, t, A.parah - .05, DSP(96), { ls: 2, stag: .018 });
      srcTag(ctx, 'Sumber: Guo dkk., NAACL Findings 2024', -840, 480, t, A.studi + .4);
    } },

    // 13 · Wenger & Kenett: four AI brands answer alike, humans answer every which way
    { at: A.studi2, via: 'whip', name: 'AI mirip satu sama lain', draw(ctx, t) {
      txt(ctx, 'JAWABAN 4 MEREK AI', -860, -400, t, A.studi2, MN(22), { ls: 4, col: ivo(.75) });
      txt(ctx, 'JAWABAN MANUSIA', 120, -400, t, A.merek + .2, MN(22), { ls: 4, col: ivo(.75) });
      const cv = E.inOutCubic(inv(A.mirip - .2, A.mirip + .5, t));
      for (let i = 0; i < 4; i++) {
        const k = E.outQuint(inv(A.studi2 + .3 + .22 * i, A.studi2 + .8 + .22 * i, t)); if (k <= 0) continue;
        const y = lerp(-300 + i * 150, -120 + i * 14, cv), x = -860 + (1 - k) * -80 + cv * i * 10;
        ctx.globalAlpha = clamp(k * 1.5); ctx.fillStyle = 'rgba(30,31,27,.95)'; ctx.beginPath(); ctx.roundRect(x, y, 820, 110, 18); ctx.fill();
        ctx.strokeStyle = ivo(.2); ctx.lineWidth = 2; ctx.stroke();
        setFont(ctx, MN(16), 3); ctx.fillStyle = ivo(.55); ctx.textAlign = 'left'; ctx.fillText(`AI ${'ABCD'[i]}`, x + 24, y + 34);
        setFont(ctx, MN(24, 400), 0); ctx.fillStyle = ivo(.92); ctx.fillText('Tentu! Berikut beberapa poin penting:', x + 24, y + 78); ctx.globalAlpha = 1;
      }
      if (cv > .6) txt(ctx, '4 MEREK · 1 GAYA', -450, 140, t, A.mirip + .3, MN(26), { align: 'center', ls: 5 });
      const HU = [['wkwk tergantung sih', -4, 'round'], ['Menurutku sih nggak gitu.', 3, 'ell'], ['Pernah coba, gagal total.', -2, 'tilt'], ['Hmm, kata nenekku lain lagi.', 5, 'cloud']];
      HU.forEach(([s, rot, kind], i) => {
        const k = E.outQuint(inv(A.merek + .3 + .25 * i, A.merek + .8 + .25 * i, t)); if (k <= 0) return;
        const sp = E.outCubic(inv(A.dibanding, A.antarmanusia + .4, t)), x = 40 + (i % 2) * 110 + sp * (i % 2 ? 30 : -20), y = -280 + i * 165 + sp * (i - 1.5) * 18;
        ctx.save(); ctx.translate(x + 330, y + 55); ctx.rotate((rot + sp * rot) * Math.PI / 180); ctx.globalAlpha = clamp(k * 1.5); ctx.scale(lerp(.8, 1, k), lerp(.8, 1, k));
        ctx.fillStyle = ivo(.1); ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.beginPath();
        if (kind === 'ell') ctx.ellipse(0, 0, 340, 64, 0, 0, 7); else if (kind === 'cloud') { for (let j = 0; j < 7; j++) ctx.arc(-260 + j * 87, (j % 2) * 10 - 4, 62, 0, 7); }
        else ctx.roundRect(-310, -52, 620, 104, kind === 'round' ? 52 : 6);
        ctx.fill(); if (kind !== 'cloud') ctx.stroke();
        setFont(ctx, HND(46), 0); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(s, 0, 15); ctx.textAlign = 'left'; ctx.restore();
      });
      srcTag(ctx, 'Sumber: Wenger & Kenett, PNAS Nexus 2026', -840, 470, t, A.studi2 + .5);
    } },

    // 14 · the feed: everyone asks AI for captions → one choir, one note
    { at: A.artinya, via: 'push', name: 'Beranda paduan suara', draw(ctx, t) {
      const PW = 440, PHH = 880, px = -470, k = E.outQuint(inv(A.artinya - .1, A.artinya + .5, t));
      ctx.save(); ctx.translate(px, (1 - k) * 120); ctx.globalAlpha = clamp(k * 1.4);
      ctx.fillStyle = '#121310'; ctx.strokeStyle = ivo(.75); ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(-PW / 2, -PHH / 2, PW, PHH, 50); ctx.fill(); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.roundRect(-PW / 2 + 14, -PHH / 2 + 14, PW - 28, PHH - 28, 38); ctx.clip();
      const U = ['@rara.senja', '@bang_ojik', '@dinda.kopi', '@kak.yusuf', '@nenden_', '@tio.motret'], VV = [X.V.tenang, X.V.macro, X.V.go, X.V.digital, X.V.tenang, X.V.macro];
      const sc = (t - A.artinya) * 120, POST = 400;
      for (let j = 0; j < 9; j++) {
        const y = -PHH / 2 + 90 + j * POST - sc % (POST * 6); if (y > PHH / 2 || y + POST < -PHH / 2) continue; const n = j % 6;
        ctx.fillStyle = ivo(.25); ctx.beginPath(); ctx.arc(-PW / 2 + 48, y + 22, 18, 0, 7); ctx.fill();
        setFont(ctx, MN(17), 1); ctx.fillStyle = ivo(.85); ctx.textAlign = 'left'; ctx.fillText(U[n], -PW / 2 + 76, y + 28);
        clip(ctx, VV[n], t + n * 1.3, 0, y + 60 + 125, PW - 28, 250, 1, { marks: false, grade: NEUTRAL, vig: .35, grain: .15 });
        setFont(ctx, MN(16, 400), 0); ctx.fillStyle = ivo(.9); ctx.fillText('Menikmati momen kecil yang', -PW / 2 + 30, y + 345); ctx.fillText('penuh makna. ✨', -PW / 2 + 30, y + 368);
      }
      ctx.restore();
      ctx.fillStyle = '#0B0C09'; ctx.beginPath(); ctx.roundRect(-40, -PHH / 2 + 26, 80, 20, 10); ctx.fill(); ctx.restore(); ctx.globalAlpha = 1;
      txt(ctx, 'AKUN FIKTIF', px, 470, t, A.artinya + .4, MN(16), { align: 'center', ls: 5, col: ivo(.45) });
      for (let i = 0; i < 3; i++) txt(ctx, '“Menikmati momen kecil yang penuh makna.”', 0, -330 + i * 70, t, A.caption + .15 * i, SRF(36), { col: ivo(.9 - .2 * i) });
      txt(ctx, 'CAPTION KEMBAR DI BERANDA', 0, -420, t, A.caption - .1, MN(20), { ls: 4, col: ivo(.65) });
      const sat = E.inOutCubic(inv(A.satu - .2, A.satu + .5, t)), kw = E.outCubic(inv(A.paduan - .2, A.paduan + .4, t));
      if (kw > 0) { const p = new Path2D(); for (let i = 0; i < 3; i++) wave(p, 0, 860, lerp(-30 + i * 90, 60, sat), 36 * kw * (1 - sat), t, i * 11 + 3);
        ctx.lineWidth = 3; ctx.strokeStyle = ivo(.8); ctx.stroke(p);
        if (sat > 0) { const q = new Path2D(); wave(q, 0, 860, 60, 40 * sat, t, 0, { pure: true }); ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.stroke(q); } }
      txt(ctx, 'paduan suara…', 0, 230, t, A.paduan - .05, SRF(48), { col: ivo(.8) });
      fall(ctx, 'SATU NADA SEMUA', 0, 380, t, A.satu - .05, DSP(130), { ls: 3 });
    } },

    // 15 · third impact: Thompson et al. (Amazon)
    { at: A.dampak3, via: 'rise', name: 'Dampak 3 · Thompson', draw(ctx, t) {
      const ga = 1 - E.inCubic(inv(A.peneliti2 - .4, A.peneliti2 - .05, t));
      if (ga > 0) { ctx.globalAlpha = ga; fall(ctx, 'DAMPAK KETIGA', 0, -40, t, A.dampak3 - .05, DSP(220), { align: 'center', ls: 4 });
        txt(ctx, 'paling deket sama kita', 0, 70, t, A.dampak3 + .6, SRF(60), { align: 'center' }); ctx.globalAlpha = 1; }
      evid(ctx, IM.thom, 0, -150, 1500, t, A.peneliti2 - .05, { crop: [0, .27, 1, .62], tab: 'arxiv.org', hl: [[.018, .177, .60, .153, A.thompson + .1]] });
      txt(ctx, 'PENELITI AMAZON · THOMPSON DKK.', -740, 60, t, A.thompson - .1, MN(24), { ls: 4 });
      slab(ctx, 'BAHASA YANG STOK TULISANNYA DIKIT', 0, 230, t, A.stok - .05, { align: 'center', size: 30 });
      srcTag(ctx, 'Sumber: Thompson dkk., ACL Findings 2024', -840, 470, t, A.peneliti2 + .3);
    } },

    // 16 · machine translation buries the few original pages
    { at: A.ternyata, via: 'push', name: 'Terkubur terjemahan', draw(ctx, t) {
      evid(ctx, IM.thom, 0, -390, 1700, t, A.ternyata - .05, { crop: [0, .6, 1, .3], tab: 'arxiv.org',
        hl: [[.735, .45, .205, .233, A.terjemahan], [.033, .70, .29, .233, A.gede]] });
      for (let i = 0; i < 3; i++) { const x = -190 + i * 190, y = 250, k = E.outQuint(inv(A.ternyata + .2 + .1 * i, A.ternyata + .6 + .1 * i, t)); if (k <= 0) continue;
        ctx.globalAlpha = k; ctx.fillStyle = '#E9E3D2'; ctx.fillRect(x - 75, y - 100 + (1 - k) * 40, 150, 200);
        ctx.fillStyle = 'rgba(28,38,64,.55)'; for (let l = 0; l < 7; l++) ctx.fillRect(x - 55, y - 70 + l * 22 + (1 - k) * 40, 70 + 40 * rnd(l + i * 9), 4);
        asliTag(ctx, x - 75, y - 140 + (1 - k) * 40, 16); ctx.globalAlpha = 1; }
      const pg = new Path2D(), ln = new Path2D();
      for (let i = 0; i < 46; i++) {
        const t0 = A.terjemahan + i * .055, u = inv(t0, t0 + .5, t); if (u <= 0) continue;
        const fx = -720 + rnd(i + 70) * 1440, fy = 330 - rnd(i + 71) * 230 * (1 - Math.abs(fx) / 1100), y = lerp(-700, fy, E.outCubic(u)), r = (rnd(i + 72) - .5) * .7 * (1 - u * .6);
        const c = Math.cos(r), s = Math.sin(r), q = (dx, dy) => [fx + dx * c - dy * s, y + dx * s + dy * c];
        const P4 = [q(-60, -80), q(60, -80), q(60, 80), q(-60, 80)]; pg.moveTo(...P4[0]); for (const pt of P4.slice(1)) pg.lineTo(...pt); pg.closePath();
        for (let l = 0; l < 5; l++) { const a = q(-44, -55 + l * 24), b = q(30, -55 + l * 24); ln.moveTo(...a); ln.lineTo(...b); }
      }
      ctx.fillStyle = '#5B5C55'; ctx.fill(pg); ctx.strokeStyle = 'rgba(30,30,28,.6)'; ctx.lineWidth = 1.5; ctx.stroke(pg); ctx.strokeStyle = 'rgba(200,200,190,.35)'; ctx.lineWidth = 4; ctx.stroke(ln);
      txt(ctx, 'TERJEMAHAN MESIN', 860, 0, t, A.terjemahan + .4, MN(24), { align: 'right', ls: 4 });
      slab(ctx, 'BAGIAN GEDE BANGET DARI ISI WEB', 0, -200, t, A.gede - .05, { align: 'center', size: 30 });
      srcTag(ctx, 'Sumber: Thompson dkk., ACL Findings 2024', -840, 470, t, A.ternyata + .3);
    } },

    // 17 · narrator's opinion: regional languages = the thin tail
    { at: A.nah3, via: 'whip', name: 'Opini · bahasa daerah', draw(ctx, t) {
      slab(ctx, 'OPINI NARATOR', -860, -400, t, A.nah3 + .1, { size: 22 });
      typeOn(ctx, 'tebakanku sendiri · belum ada risetnya', -860, -330, t, A.tebakanku, MN(22, 400), { ls: 1, col: ivo(.8), cps: 40 });
      fall(ctx, 'BAHASA DAERAH KITA', -866, -170, t, A.bahasa3 - .1, DSP(150), { ls: 3, stag: .02 });
      const C0 = -1000, SD = 520, B0 = 360, yc = x => B0 - 520 * gpdf((x - C0) / SD), kd = E.inOutCubic(inv(A.bahasa3, A.bahasa3 + 1.2, t));
      const xm = lerp(-960, 940, kd);
      ctx.beginPath(); ctx.moveTo(-960, B0); for (let x = -960; x <= xm; x += 12) ctx.lineTo(x, yc(x)); ctx.lineTo(xm, B0); ctx.closePath(); ctx.fillStyle = ivo(.06); ctx.fill();
      ctx.beginPath(); for (let x = -960; x <= xm; x += 12) x === -960 ? ctx.moveTo(x, yc(x)) : ctx.lineTo(x, yc(x)); ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = ivo(.35); ctx.fillRect(-960, B0, 1920, 2);
      txt(ctx, 'BAHASA BESAR', -900, 70, t, A.bahasa3 + .3, MN(18), { ls: 4, col: ivo(.55) });
      [['JAWA', 60, A.jawa, 150], ['SUNDA', 290, A.sunda, 70], ['BALI', 520, A.bali, 150], ['BATAK', 750, A.batak, 70]].forEach(([s, x, t0, ly]) => {
        const k = E.outQuint(inv(t0 - .12, t0 + .3, t)); if (k <= 0) return; const y = yc(x);
        ctx.globalAlpha = k; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x, ly + 14); ctx.stroke();
        ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        fall(ctx, s, x, ly, t, t0 - .1, DSP(68), { align: 'center', ls: 3 });
      });
      if (t > A.batak + .4) {                                                              // toner settles on the thin tail
        const p = new Path2D(), n = Math.min(160, Math.floor((t - A.batak - .4) * 60));
        for (let i = 0; i < n; i++) { const x = rnd(i + 900) * 900, y = yc(x) - 4 - 30 * rnd(i + 901); p.rect(x, y, 3, 3); } ctx.fillStyle = 'rgba(124,125,116,.7)'; ctx.fill(p);
      }
      const fl = t > A.rawan ? .75 + .25 * Math.sin(t * 40) * Math.exp(-(t - A.rawan) * 3) : 1;
      ctx.globalAlpha = fl; fall(ctx, 'PALING RAWAN', 900, -170, t, A.rawan - .1, DSP(130), { align: 'right', ls: 3 }); ctx.globalAlpha = 1;
    } },

    // 18 · few originals, many translations; the idiom fades through each round trip
    { at: A.tulisan2, via: 'push', name: 'Ungkapan khas pudar', draw(ctx, t) {
      txt(ctx, 'ILUSTRASI', 860, -440, t, A.tulisan2, MN(18), { ls: 5, col: ivo(.5), align: 'right' });
      const nL = Math.floor(200 * E.inOutCubic(inv(A.terjemahan2 - .2, A.banyak + .4, t)));
      if (nL > 0) { const p = new Path2D(); for (let i = 0; i < nL; i++) p.rect(-940 + rnd(i + 3000) * 1880, -420 + rnd(i + 3001) * 880, 60 + 160 * rnd(i + 3002), 5); ctx.fillStyle = 'rgba(124,125,116,.22)'; ctx.fill(p); }
      if (nL > 0) txt(ctx, `TERJEMAHAN MESIN: ${nL}`, 860, 470, t, A.terjemahan2 - .1, MN(22), { align: 'right', ls: 3, col: ivo(.7) });
      const PL = [[-500, -250, 760, A.tulisan2 + .1, 'ASLI', 0], [-150, -50, 620, A.kalau + .2, 'TERJEMAHAN 1 · ID→EN', 1], [160, 125, 520, A.kalau + .7, 'TERJEMAHAN 2 · EN→ID', 2], [420, 280, 420, A.kalau + 1.2, 'TERJEMAHAN 3', 3]];
      PL.forEach(([x, y, w, t0, lab, i], j) => {
        const k = E.outQuint(inv(t0 - .1, t0 + .4, t)); if (k <= 0) return; const h = w * 260 / 1200, pud = i === 3 ? E.inOutCubic(inv(A.pudar - .1, A.pudar + .8, t)) : 0;
        if (j) arrow(ctx, PL[j - 1][0] + 60, PL[j - 1][1] + PL[j - 1][2] * 260 / 2400 + 34, x - w / 2 + 40, y - h / 2 - 34, E.outCubic(inv(t0 - .2, t0 + .2, t)), ivo(.45), 2);
        const f0 = pud > 0 ? addF(ctx, `blur(${(6 * pud).toFixed(1)}px)`) : null;
        glass(ctx, X.ID[i], x, y + (1 - k) * 40, w, h, { m: 14, q: i ? inv(t0, t0 + .45, t) : 1, a: clamp(k * 1.5) * (1 - .75 * pud), asli: !i, label: i ? lab : '', ls: 16 });
        if (f0 !== null) ctx.filter = f0;
      });
      txt(ctx, 'TULISAN ASLI: SEDIKIT', -880, -390, t, A.sedikit - .1, MN(22), { ls: 4, col: ivo(.85) });
      slab(ctx, 'UNGKAPAN KHAS', -880, 440, t, A.ungkapan - .05, { size: 24 });
      fall(ctx, 'PUDAR', 700, 30, t, A.pudar - .05, DSP(150), { align: 'center', ls: 6 });
    } },
  ];
}
