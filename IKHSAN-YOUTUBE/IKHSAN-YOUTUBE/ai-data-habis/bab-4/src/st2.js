// Bab 4 · stations 19–37 (dampak keempat → baja tua → arsip → delve → tanda air → kabar baik → AlphaGeometry → manusia → Indonesia).
import { clamp, inv, lerp, E, IVORY, LIME, GREY, ivo, setFont, rnd, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, plate as clip } from './kit.js';
import { DSP, SRF, MN, HND, addF, person, wave, meter, arrow, asliTag } from './ui.js';
import { glass, bar, NEUTRAL } from './copier.js';
import { PETA } from './peta.js';

// real Indonesia outline (Wikimedia Commons, CC BY-SA 3.0) sampled into dots by peta.js
const DOTS = PETA;

export function stations2(A, X) {
  const IM = X.IM;
  return [
    // 19 · fourth impact: pure human writing becomes an antique
    { at: A.dampak4, via: 'cut', name: 'Dampak 4 · barang antik', draw(ctx, t) {
      if (t < A.dampak4 - .45) return;                                               // no far-off footage ghost before the cut
      clip(ctx, X.V.buku, t, 0, 0, 1920, 1080, 1, { t0: A.dampak4 - .3, grade: NEUTRAL, vig: .7, dim: .55, marks: false });
      fall(ctx, 'DAMPAK KEEMPAT', -866, -330, t, A.dampak4 - .05, DSP(130), { ls: 3 });
      txt(ctx, 'TULISAN MURNI MANUSIA', -860, -230, t, A.tulisan3 - .1, MN(28), { ls: 5 });
      slab(ctx, 'PRA-CHATGPT · SEBELUM 30 NOV 2022', -860, -150, t, A.chatgpt - .1, { size: 26 });
      fall(ctx, 'DIBURU KAYAK', 860, 300, t, A.diburu - .05, DSP(90), { align: 'right', ls: 3 });
      fall(ctx, 'BARANG ANTIK', 860, 430, t, A.antik - .08, DSP(150), { align: 'right', ls: 4 });
    } },

    // 20 · low-background steel: pre-1945 steel is clean; after the bombs every new steel carries a trace
    { at: A.mirip2, via: 'whip', name: 'Baja tua PRA-1945', draw(ctx, t) {
      const fl = t > A.bom - .05 ? Math.exp(-(t - A.bom + .05) * 5) : 0;
      for (const [x, lab, old, t0] of [[-420, 'BAJA TUA · PRA-1945', true, A.besi - .1], [420, 'BAJA BARU', false, A.bom + .2]]) {
        const k = E.outQuint(inv(t0, t0 + .5, t)); if (k <= 0) continue;
        ctx.save(); ctx.globalAlpha = k; ctx.translate(x, -40 + (1 - k) * 60);
        const g = ctx.createLinearGradient(-300, -190, 300, 190); g.addColorStop(0, '#5A5C58'); g.addColorStop(.5, '#8C8E88'); g.addColorStop(1, '#3E403C');
        ctx.fillStyle = g; ctx.fillRect(-300, -190, 600, 380);
        ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i < 40; i++) { const y = -190 + rnd(i + (old ? 0 : 99)) * 380; ctx.moveTo(-300, y); ctx.lineTo(300, y + 6); } ctx.stroke();
        if (!old) {                                                                   // radiation specks
          const p = new Path2D(), n = Math.floor(90 * clamp((t - A.kecemar + .3) * 1.5));
          for (let i = 0; i < n; i++) { const r = 2 + 3 * rnd(i + 7) * (.6 + .4 * Math.sin(t * 9 + i)); p.moveTo(-280 + rnd(i) * 560 + r, -170 + rnd(i + 1) * 340); p.arc(-280 + rnd(i) * 560, -170 + rnd(i + 1) * 340, r, 0, 7); }
          ctx.fillStyle = 'rgba(241,239,230,.75)'; ctx.fill(p);
        }
        ctx.restore(); ctx.globalAlpha = 1;
        txt(ctx, lab, x, 205, t, t0 + .1, MN(24), { align: 'center', ls: 4 });
      }
      if (t > A.besi) { const v = t > A.kecemar ? .08 + .5 * E.outCubic(inv(A.kecemar, A.radiasi + .6, t)) : .08; meter(ctx, 120, 330, 600, v, 'RADIASI LATAR', clamp((t - A.kecemar + .3) * 3)); }
      if (fl > .01) { const op = ctx.globalCompositeOperation; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(241,239,230,${.55 * fl})`; ctx.fillRect(-960, -540, 1920, 1080); ctx.globalCompositeOperation = op; }
      txt(ctx, 'UJI COBA BOM ATOM · SEJAK 1945', 0, -400, t, A.bom - .05, MN(24), { align: 'center', ls: 5, col: ivo(.85) });
      txt(ctx, 'alat ukur yang super peka butuh baja tua', -720, 330, t, A.alat, SRF(40), { col: ivo(.85) });
      slab(ctx, 'LOW-BACKGROUND STEEL = BAJA LATAR RENDAH', 0, 450, t, A.tua - .05, { align: 'center', size: 28 });
    } },

    // 21 · the analogy has a name: lowbackgroundsteel.ai
    { at: A.analogi, via: 'push', name: 'lowbackgroundsteel.ai', tag: 'ARSIP', draw(ctx, t) {
      evid(ctx, IM.lbs, 0, -110, 1500, t, A.analogi + .05, { crop: [0, 0, 1, .8], tab: 'lowbackgroundsteel.ai', dark: true, hl: [[.04, .2125, .6, .325, A.lbs]] });
      txt(ctx, 'DIPAKAI JOHN GRAHAM-CUMMING', -740, 330, t, A.john - .1, MN(26), { ls: 4 });
      txt(ctx, 'buat situs arsip data “bersih”', -740, 390, t, A.arsip - .1, SRF(44), { col: ivo(.85) });
      srcTag(ctx, 'Sumber: lowbackgroundsteel.ai (diakses 15 Nov 2026)', -840, 480, t, A.analogi + .3);
    } },

    // 22 · what it keeps: Wikipedia sealed at August 2022, before the flood
    { at: A.isinya, via: 'whip', name: 'Arsip sebelum banjir', draw(ctx, t) {
      evid(ctx, IM.lbs, 0, -330, 1500, t, A.isinya, { crop: [0, .6, .7, .15], tab: 'lowbackgroundsteel.ai', dark: true,
        hl: [[.05, .167, .714, .4, A.wikipedia], [.05, .567, .143, .4, A.agustus]] });
      const x0 = -840, x1 = 840, yT = 180, kT = E.inOutCubic(inv(A.isinya + .3, A.isinya + 1.2, t)), xm = lerp(x0, x1, kT);
      const yr = y => lerp(x0, x1, (y - 2019) / 6), xc = yr(2022.92);
      ctx.fillStyle = ivo(.5); ctx.fillRect(x0, yT, xm - x0, 3);
      for (let y = 2019; y <= 2025; y++) { const x = yr(y); if (x > xm) break; ctx.fillRect(x - 1, yT - 10, 2, 20); txt(ctx, String(y), x, yT + 50, t, A.isinya + .3 + (y - 2019) * .12, MN(18), { align: 'center', col: ivo(.55) }); }
      const fk = E.inOutCubic(inv(A.banjir - .1, A.terus2 - .1, t));                 // the flood of AI text after Nov 2022
      if (fk > 0) { const p = new Path2D(); for (let i = 0; i < 260; i++) { const x = xc + rnd(i + 400) * (x1 - xc) * fk, h = (20 + 260 * rnd(i + 401)) * clamp(((x - xc) / 300)) * fk; p.rect(x, yT - 8 - h, 3, h); } ctx.fillStyle = 'rgba(124,125,116,.55)'; ctx.fill(p); }
      if (fk > 0) txt(ctx, 'BANJIR TULISAN AI', (xc + x1) / 2, -40, t, A.banjir, MN(24), { align: 'center', ls: 5, col: ivo(.85) });
      if (t > A.chatgpt) { ctx.strokeStyle = ivo(.8); ctx.setLineDash([6, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xc, yT + 20); ctx.lineTo(xc, -120); ctx.stroke(); ctx.setLineDash([]); }
      const k = E.outQuint(inv(A.wikipedia - .2, A.wikipedia + .35, t)), ax = yr(2022.62);
      if (k > 0) { ctx.globalAlpha = k; ctx.fillStyle = '#E9E3D2'; ctx.fillRect(ax - 300, yT - 300 + (1 - k) * 40, 280, 250);
        ctx.fillStyle = 'rgba(28,38,64,.6)'; for (let l = 0; l < 7; l++) ctx.fillRect(ax - 275, yT - 250 + l * 26 + (1 - k) * 40, 120 + 100 * rnd(l + 3), 5);
        asliTag(ctx, ax - 300, yT - 345 + (1 - k) * 40, 18); ctx.globalAlpha = 1; }
      txt(ctx, 'WIKIPEDIA INGGRIS · AGUSTUS 2022', ax - 160, 330, t, A.agustus - .1, MN(26), { align: 'center', ls: 3 });
      txt(ctx, 'disegel sebelum banjir', ax - 160, 390, t, A.sebelum, SRF(42), { align: 'center', col: ivo(.85) });
    } },

    // 23 · wordfreq stops updating
    { at: A.terus2, via: 'push', name: 'wordfreq berhenti', draw(ctx, t) {
      evid(ctx, IM.wf, 220, -170, 1180, t, A.terus2 + .05, { crop: [.2, .46, .8, .54], tab: 'github.com', dark: true,
        hl: [[.034, .035, .398, .10, A.wordfreq], [.494, .50, .19, .06, A.berhenti], [.034, .667, .50, .10, A.kecemar2]] });
      txt(ctx, 'WORDFREQ', -860, -380, t, A.wordfreq - .1, DSP(110), { ls: 3 });
      txt(ctx, 'penghitung kata · Robyn Speer', -860, -310, t, A.ngitung - .1, SRF(36), { col: ivo(.8) });
      const fr = E.outCubic(inv(A.berhenti - .1, A.berhenti + .3, t));
      for (let i = 0; i < 9; i++) {
        const x = -860 + i * 60, base = 420, h = (60 + 200 * rnd(i + 11)) * (fr > 0 ? 1 : (.75 + .25 * Math.sin(t * 4 + i))), k = E.outCubic(inv(A.ngitung + .05 * i, A.ngitung + .4 + .05 * i, t));
        ctx.fillStyle = fr > 0 ? 'rgba(124,125,116,.75)' : ivo(.85); ctx.fillRect(x, base - h * k, 40, h * k);
      }
      if (fr > 0) slab(ctx, 'STOP UPDATE · 2024', -300, 410, t, A.berhenti - .05, { size: 24 });
      txt(ctx, 'alasannya: data internet udah kecemar', 220, 330, t, A.kecemar2 - .1, SRF(40), { align: 'center', col: ivo(.88) });
      srcTag(ctx, 'Sumber: wordfreq (Robyn Speer), GitHub, Sep 2024', -840, 520 - 30, t, A.terus2 + .3);
    } },

    // 24 · the symptom everyone saw: "delve" ×10
    { at: A.gejalanya, via: 'whip', name: 'delve ×10', tag: 'DELVE', draw(ctx, t) {
      txt(ctx, 'GEJALANYA KELIHATAN:', -860, -400, t, A.gejalanya, MN(24), { ls: 5, col: ivo(.75) });
      const n = Math.min(10, Math.max(0, Math.floor(1 + (t - A.loncat) / .07)));
      for (let i = n - 1; i >= 0; i--) { const s = 1 + i * .09; ctx.globalAlpha = i ? .06 + .05 * (10 - i) / 10 : 1;
        setFont(ctx, SRF(220 * s), 0); ctx.fillStyle = i ? ivo(.6) : IVORY; ctx.textAlign = 'center'; ctx.fillText('delve', 0 + i * 18, 60 + i * 8); }
      if (t > A.delve - .1 && n === 0) { ctx.globalAlpha = clamp((t - A.delve + .1) * 4); setFont(ctx, SRF(220), 0); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText('delve', 0, 60); }
      ctx.globalAlpha = 1; ctx.textAlign = 'left';
      txt(ctx, '= mendalami', 0, 150, t, A.mendalami - .05, MN(30), { align: 'center', ls: 3, col: ivo(.85) });
      fall(ctx, '×10', 620, 60, t, A.sepuluh2 - .05, DSP(220), { align: 'center', ls: 2 });
      txt(ctx, 'DI MAKALAH ILMIAH', 620, 130, t, A.lipat, MN(22), { align: 'center', ls: 4, col: ivo(.75) });
      const pk = E.outBack ? E.outBack(inv(A.coba - .1, A.coba + .4, t)) : E.outCubic(inv(A.coba - .1, A.coba + .4, t)), hide = E.inCubic(inv(A.hobi + .5, A.hobi + .9, t));
      if (pk > 0) {                                                                    // a chatbot head peeks from the bottom edge
        const y = 540 - 190 * pk * (1 - hide); ctx.fillStyle = '#1E1F1B'; ctx.strokeStyle = ivo(.8); ctx.lineWidth = 4;
        ctx.beginPath(); ctx.roundRect(-760, y, 220, 200, 44); ctx.fill(); ctx.stroke();
        const bl = Math.sin(t * 3) > .95 ? .15 : 1; ctx.fillStyle = IVORY; ctx.fillRect(-710, y + 70, 30, 30 * bl); ctx.fillRect(-620, y + 70, 30, 30 * bl);
        ctx.beginPath(); ctx.moveTo(-650, y); ctx.lineTo(-650, y - 34); ctx.stroke(); ctx.beginPath(); ctx.arc(-650, y - 42, 9, 0, 7); ctx.fill();
        txt(ctx, 'siapa hayo yang hobi ngomong “delve”?', -500, 470, t, A.siapa2 - .1, SRF(38), { col: ivo(.88) });
      }
    } },

    // 25 · SynthID: an invisible watermark revealed by the scan bar
    { at: A.gimana, via: 'push', name: 'SynthID', draw(ctx, t) {
      evid(ctx, IM.syn, -420, -60, 960, t, A.google - .3, { crop: [0, .15, .65, .62], tab: 'nature.com', hl: [[.068, .197, .817, .089, A.synthid], [.068, .285, .463, .089, A.kasatmata]] });
      txt(ctx, 'GIMANA CARA TAHU TULISAN AI?', -860, -420, t, A.gimana, MN(24), { ls: 4, col: ivo(.8) });
      const words = 'Pagi ini kota terasa lebih tenang dari biasanya dan jalan masih basah'.split(' '), x0 = 200, y0 = -300;
      let x = x0, y = y0; const pos = [];
      setFont(ctx, SRF(46), 0); for (const w of words) { const ww = ctx.measureText(w + ' ').width; if (x + ww > 900) { x = x0; y += 70; } pos.push([w, x, y, ww]); x += ww; }
      const ka = clamp((t - A.google) * 3), q = inv(A.tanda2 - .1, A.kasatmata + .6, t), yb = lerp(y0 - 60, y + 30, q);
      pos.forEach(([w, px, py, ww], i) => {
        ctx.globalAlpha = ka; ctx.fillStyle = ivo(.9); ctx.textAlign = 'left'; setFont(ctx, SRF(46), 0); ctx.fillText(w, px, py);
        if (i % 3 === 1 && py < yb) { ctx.fillStyle = 'rgba(241,239,230,.16)'; ctx.fillRect(px - 4, py - 40, ww - 8, 52); ctx.strokeStyle = ivo(.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py + 10); ctx.lineTo(px + ww - 12, py + 10); ctx.stroke(); }
      });
      ctx.globalAlpha = 1; if (q > 0 && q < 1) bar(ctx, x0 - 20, yb, 740, 1, Math.sin(Math.PI * q));
      txt(ctx, 'TANDA AIR TAK KASATMATA', x0, y + 100, t, A.kasatmata, MN(24), { ls: 4 });
      txt(ctx, 'diuji di', 200, 240, t, A.diuji, SRF(42), { col: ivo(.85) });
      if (t > A.juta - .3) { setFont(ctx, DSP(170), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(`${Math.round(countTo(0, 20, t, A.juta - .3, .7))} JUTA`, 200, 410); }
      txt(ctx, 'JAWABAN GEMINI', 640, 410, t, A.gemini - .1, MN(24), { ls: 4, col: ivo(.75) });
      srcTag(ctx, 'Sumber: Nature, 23 Okt 2024', -840, 480, t, A.google);
    } },

    // 26 · but it's fragile: rewrite or translate and the trace fades
    { at: A.masalahnya, via: 'whip', name: 'Tanda air rapuh', draw(ctx, t) {
      txt(ctx, 'MASALAHNYA:', -860, -400, t, A.masalahnya, MN(24), { ls: 5, col: ivo(.75) });
      fall(ctx, 'RAPUH', -866, -230, t, A.rapuh - .08, DSP(200), { ls: 6 });
      const words = ['Pagi', 'ini', 'kota', 'terasa', 'lebih', 'tenang', 'dari', 'biasanya'], sh = E.inOutCubic(inv(A.ditulis, A.ditulis + .8, t)), tr = E.inOutCubic(inv(A.diterjemahin, A.diterjemahin + .8, t));
      const EN = ['This', 'morning', 'the', 'city', 'felt', 'quieter', 'than', 'usual'];
      words.forEach((w, i) => {
        const j = (i * 5 + 3) % 8, sx = k => 40 + (k % 4) * 215, sy = k => -140 + Math.floor(k / 4) * 84, x = lerp(sx(i), sx(j), sh), y = lerp(sy(i), sy(j), sh) - Math.sin(Math.PI * sh) * 40, s = tr > .5 ? EN[i] : w;
        ctx.globalAlpha = 1 - Math.abs(tr - .5) < .5 ? 1 - .7 * (1 - Math.abs(tr - .5) * 2) : 1; setFont(ctx, SRF(40), 0); ctx.fillStyle = ivo(.9); ctx.textAlign = 'left'; ctx.fillText(s, x, y);
        const wm = i % 3 === 1 ? (1 - clamp(sh * .5 + tr * .6)) : 0; if (wm > 0) { ctx.globalAlpha = wm; ctx.strokeStyle = ivo(.85); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + 10); ctx.lineTo(x + 90, y + 10); ctx.stroke(); }
      });
      ctx.globalAlpha = 1;
      txt(ctx, 'DITULIS ULANG', 40, -220, t, A.ditulis, MN(22), { ls: 4, col: ivo(.7) });
      txt(ctx, 'DITERJEMAHKAN', 480, -220, t, A.diterjemahin, MN(22), { ls: 4, col: ivo(.7) });
      const v = 1 - .82 * clamp(sh * .45 + tr * .55); meter(ctx, 40, 120, 860, v * clamp((t - A.masalahnya) * 2), 'JEJAK TANDA AIR', 1);
      fall(ctx, 'LUNTUR', 470, 330, t, A.luntur - .05, DSP(150), { align: 'center', ls: 6 });
      srcTag(ctx, 'Sumber: NIST AI 100-4, Nov 2024', -840, 480, t, A.masalahnya + .3);
    } },

    // 27 · so is AI doomed to get dumber? No.
    { at: A.jadi2, via: 'rise', name: 'Pasti makin bodoh?', draw(ctx, t) {
      fall(ctx, 'APAKAH AI', 0, -160, t, A.jadi2 - .05, DSP(170), { align: 'center', ls: 4 });
      fall(ctx, 'PASTI MAKIN BODOH?', 0, 20, t, A.pasti - .1, DSP(170), { align: 'center', ls: 4 });
      const k = E.outQuint(inv(A.nggak - .1, A.nggak + .3, t));
      if (k > 0) { setFont(ctx, DSP(170), 4); const w = ctx.measureText('PASTI').width, x0 = -ctx.measureText('PASTI MAKIN BODOH?').width / 2;
        ctx.strokeStyle = IVORY; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x0 - 10, -40); ctx.lineTo(x0 - 10 + (w + 20) * k, -40); ctx.stroke(); }
      txt(ctx, 'kabar baiknya:', 0, 200, t, A.kabar, SRF(60), { align: 'center' });
      fall(ctx, 'NGGAK HARUS', 0, 360, t, A.nggak - .05, DSP(130), { align: 'center', ls: 5 });
    } },

    // 28 · Gerstgrasser: scenario A (replace) collapses
    { at: A.studi3, via: 'push', name: 'Skenario diganti', tag: 'SKENARIO', draw(ctx, t) {
      evid(ctx, IM.ger, 0, -380, 1600, t, A.studi3 + .05, { crop: [0, .28, 1, .32], tab: 'arxiv.org', hl: [[.018, .3125, .88, .297, A.studi3 + .6], [.018, .609, .145, .297, A.studi3 + 1], [.018, .078, .13, .172, A.studi3 + 1.4]] });
      txt(ctx, 'SKENARIO A', -860, -170, t, A.skenario, MN(24), { ls: 5 });
      txt(ctx, 'data lama dibuang, diganti data buatan AI', -860, -110, t, A.dibuang - .1, SRF(42), { col: ivo(.85) });
      const G = Math.floor(clamp(inv(A.dibuang, A.ambruk, t)) * 6);
      for (let g = 0; g < 6; g++) {
        const x = -860 + g * 170, k = E.outCubic(inv(A.dibuang + g * .55, A.dibuang + g * .55 + .3, t)); if (k <= 0) continue;
        const fallK = t > A.ambruk ? E.inCubic(inv(A.ambruk + g * .04, A.ambruk + .6 + g * .04, t)) : 0, h = 220 - g * 30;
        ctx.save(); ctx.translate(x + 60, 340 + fallK * 200); ctx.rotate(fallK * (g % 2 ? .5 : -.4)); ctx.globalAlpha = k * (1 - fallK * .7);
        ctx.fillStyle = g ? `rgba(160,160,150,${.9 - g * .1})` : '#E9E3D2'; ctx.fillRect(-60, -h, 120, h);
        ctx.restore(); ctx.globalAlpha = 1;
        txt(ctx, `G${g + 1}`, x + 60, 390, t, A.dibuang + g * .55, MN(18), { align: 'center', col: ivo(.6) });
        if (g && G >= g) txt(ctx, '✕ lama', x + 60, 420, t, A.dibuang + g * .55, MN(14, 400), { align: 'center', col: ivo(.4) });
      }
      fall(ctx, 'AMBRUK', 560, 260, t, A.ambruk - .08, DSP(190), { align: 'center', ls: 6 });
      srcTag(ctx, 'Sumber: Gerstgrasser dkk., arXiv, 1 Apr 2024', -840, 480, t, A.studi3 + .3);
    } },

    // 29 · scenario B (keep + add) holds
    { at: A.tapi2, via: 'push', name: 'Skenario disimpan', draw(ctx, t) {
      txt(ctx, 'SKENARIO B', -860, -400, t, A.tapi2, MN(24), { ls: 5 });
      txt(ctx, 'data lama disimpan, data AI cuma tambahan', -860, -340, t, A.disimpen - .1, SRF(42), { col: ivo(.85) });
      let y = 300;
      for (let g = 0; g < 6; g++) {
        const k = E.outCubic(inv(A.disimpen + g * .4, A.disimpen + g * .4 + .35, t)); if (k <= 0) continue;
        const h = g ? 62 : 120; y -= h + 6;
        ctx.globalAlpha = k; ctx.fillStyle = g ? `rgba(160,160,150,.85)` : '#E9E3D2'; ctx.fillRect(-600, y + (1 - k) * -60, 560, h);
        setFont(ctx, MN(18), 3); ctx.fillStyle = g ? '#1E1F1B' : '#1C2640'; ctx.textAlign = 'left'; ctx.fillText(g ? `TAMBAHAN AI · G${g + 1}` : 'DATA MANUSIA (DISIMPAN)', -580, y + (1 - k) * -60 + h / 2 + 7);
        if (!g) asliTag(ctx, -600, y - 40, 18); ctx.globalAlpha = 1;
      }
      meter(ctx, 120, 0, 760, .84 - .02 * Math.sin(t), 'MUTU MODEL', clamp((t - A.disimpen) * 2));
      fall(ctx, 'AMAN', 500, 230, t, A.dihindari - .08, DSP(190), { align: 'center', ls: 6 });
      slab(ctx, 'DIGANTI = RUNTUH · DISIMPAN + DITAMBAH = AMAN', 0, 450, t, A.tambahan - .05, { align: 'center', size: 28 });
      srcTag(ctx, 'Sumber: Gerstgrasser dkk., arXiv, 1 Apr 2024', -840, 500, t, A.tapi2 + .3);
    } },

    // 30 · Stanford HAI agrees
    { at: A.laporan, via: 'whip', name: 'AI Index 2026', draw(ctx, t) {
      evid(ctx, IM.hai, 0, -120, 1400, t, A.laporan + .05, { crop: [0, 0, 1, .75], tab: 'hai.stanford.edu' });
      slab(ctx, 'KESIMPULANNYA SAMA', 0, 370, t, A.sama - .05, { align: 'center', size: 30 });
      srcTag(ctx, 'Sumber: Stanford HAI, AI Index 2026', -840, 480, t, A.laporan + .3);
    } },

    { at: A.balik, via: 'cut', name: 'Kaca pindai · pulih', draw() {} },               // W2 (copier.js) owns balik → bahan

    // 31 · AlphaGeometry: synthetic data passes through a checker gate
    { at: A.bahan, via: 'cut', lead: -.5, name: 'AlphaGeometry · pemeriksa', tag: 'PEMERIKSA', draw(ctx, t) {
      evid(ctx, IM.ag, 380, -330, 1000, t, A.alphageo - .2, { crop: [0, 0, 1, .45], tab: 'nature.com', hl: [[.038, .384, .867, .244, A.alphageo + .3], [.038, .644, .32, .244, A.alphageo + .7], [.24, .189, .23, .111, A.alphageo + 1]] });
      txt(ctx, 'DATA BUATAN AI BISA SUKSES', -860, -400, t, A.bahan + .1, MN(24), { ls: 4 });
      fall(ctx, 'ASAL ADA PEMERIKSA', -866, -280, t, A.asal - .1, DSP(110), { ls: 3 });
      const gx = 0, gy = 220, ok = (i) => rnd(i + 31) > .35;
      ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.strokeRect(gx - 70, gy - 160, 140, 230);
      txt(ctx, 'PEMERIKSA', gx, gy - 180, t, A.pemeriksanya - .1, MN(22), { align: 'center', ls: 5 });
      ctx.fillStyle = ivo(.25); ctx.fillRect(-940, gy + 70, 1880, 4);
      const p1 = new Path2D(), p2 = new Path2D(), p3 = new Path2D();
      for (let i = 0; i < 40; i++) {
        const u = (t - A.bahan) * .32 - i * .045; if (u < 0 || u > 1.3) continue; const x = lerp(-920, 920, u), good = ok(i);
        if (x < gx) { p1.rect(x - 22, gy + 26, 44, 44); continue; }
        if (good) p2.rect(x - 22, gy + 26, 44, 44); else { const d = (x - gx) / 200; p3.rect(gx + 30 + d * 40, gy + 26 + d * d * 300, 44, 44); }
      }
      ctx.fillStyle = 'rgba(160,160,150,.8)'; ctx.fill(p1); ctx.fillStyle = IVORY; ctx.fill(p2); ctx.fillStyle = 'rgba(124,125,116,.35)'; ctx.fill(p3);
      txt(ctx, 'LOLOS', 700, gy - 20, t, A.pemeriksanya, MN(20), { align: 'center', ls: 5 });
      txt(ctx, 'DITOLAK', 160, 440, t, A.pemeriksanya + .3, MN(20), { ls: 5, col: ivo(.6) });
      if (t > A.seratus - .3) { setFont(ctx, DSP(150), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText(`≈${Math.round(countTo(0, 100, t, A.seratus - .3, .8))} JUTA`, -860, 20); }
      txt(ctx, 'SOAL LATIHAN BUATAN', -860, 70, t, A.juta2, MN(22), { ls: 4, col: ivo(.75) });
      srcTag(ctx, 'Sumber: Nature, 17 Jan 2024', -840, 480, t, A.alphageo);
    } },

    // 32 · the score: 25/30 vs 10/30
    { at: A.hasilnya, via: 'push', name: 'Skor 25/30', draw(ctx, t) {
      txt(ctx, 'SOAL GEOMETRI OLIMPIADE · DARI 30', 0, -420, t, A.hasilnya, MN(24), { align: 'center', ls: 4, col: ivo(.8) });
      const rows = [['ALPHAGEOMETRY', 25, A.dua - .1, -180, IVORY], ['METODE TERBAIK SEBELUMNYA', 10, A.metode - .1, 160, 'rgba(160,160,150,.85)']];
      for (const [lab, n, t0, y, col] of rows) {
        txt(ctx, lab, -860, y - 70, t, t0 - .2, MN(24), { ls: 4 });
        const m = Math.round(countTo(0, n, t, t0, 1.1)), p = new Path2D(), q = new Path2D();
        for (let i = 0; i < 30; i++) { const x = -860 + i * 46, tri = i < m ? p : q; tri.moveTo(x, y + 40); tri.lineTo(x + 18, y); tri.lineTo(x + 36, y + 40); tri.closePath(); }
        ctx.fillStyle = col; ctx.fill(p); ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.stroke(q);
        if (t > t0) { setFont(ctx, DSP(140), 2); ctx.fillStyle = col; ctx.textAlign = 'right'; ctx.fillText(`${m}/30`, 900, y + 46); }
      }
      txt(ctx, 'soal geometri olimpiade yang dipecahkan', 0, 420, t, A.berhasil, SRF(48), { align: 'center', col: ivo(.88) });
      srcTag(ctx, 'Sumber: Nature, 17 Jan 2024', -840, 490, t, A.hasilnya + .2);
    } },

    // 33 · AlphaProof: every step checked
    { at: A.adiknya, via: 'whip', name: 'AlphaProof', draw(ctx, t) {
      evid(ctx, IM.ap, -400, -170, 1000, t, A.alphaproof - .2, { crop: [0, 0, 1, .6], tab: 'nature.com', hl: [[.038, .288, .94, .183, A.alphaproof + .3], [.038, .483, .56, .183, A.alphaproof + .7], [.24, .142, .255, .083, A.dicek - .3]] });
      txt(ctx, 'TIAP LANGKAH DICEK KOMPUTER', 220, -400, t, A.dicek - .1, MN(24), { ls: 4 });
      const S = ['langkah 1 · definisikan f', 'langkah 2 · ambil n = 0', 'langkah 3 · substitusi', 'langkah 4 · induksi', 'langkah 5 · selesai ∎'];
      S.forEach((s, i) => {
        const t0 = A.langkah + i * .35; typeOn(ctx, s, 300, -280 + i * 90, t, t0, MN(26, 400), { cps: 60, col: ivo(.9) });
        const k = E.outCubic(inv(t0 + .25, t0 + .45, t));
        if (k > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(230, -292 + i * 90); ctx.lineTo(230 + 12 * k, -280 + i * 90); if (k > .5) ctx.lineTo(230 + 12 + 22 * (k - .5) * 2, -306 + i * 90 + 6); ctx.stroke(); }
      });
      srcTag(ctx, 'Sumber: Nature, 12 Nov 2025', -840, 480, t, A.alphaproof);
    } },

    // 34 · silver at IMO 2024
    { at: A.bareng, via: 'push', name: 'Perak IMO 2024', draw(ctx, t) {
      const k = E.outQuint(inv(A.setara - .2, A.perak + .3, t)), r = 240 * k, sh = (t * .6) % 2;
      if (k > 0) {
        ctx.save(); ctx.translate(-380, 0); ctx.rotate(Math.sin(t * 1.2) * .05);
        const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#9A9B96'); g.addColorStop(clamp(sh - .5) * .9 + .05, '#ECEBE6'); g.addColorStop(1, '#5D5E5A');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(40,40,38,.6)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, r * .82, 0, 7); ctx.stroke();
        setFont(ctx, DSP(140 * k), 2); ctx.fillStyle = 'rgba(40,40,38,.75)'; ctx.textAlign = 'center'; ctx.fillText('2', 0, 50 * k); ctx.restore();
        ctx.fillStyle = ivo(.3); ctx.beginPath(); ctx.moveTo(-440, -r - 10); ctx.lineTo(-500, -540); ctx.lineTo(-420, -540); ctx.lineTo(-380, -r - 10); ctx.closePath(); ctx.fill();
      }
      txt(ctx, 'BARENG ALPHAGEOMETRY 2', 80, -200, t, A.bareng, MN(24), { ls: 4, col: ivo(.75) });
      txt(ctx, 'setara medali', 80, -110, t, A.setara - .1, SRF(56));
      fall(ctx, 'PERAK', 80, 90, t, A.perak - .08, DSP(220), { ls: 8 });
      fall(ctx, 'IMO 2024', 80, 230, t, A.imo - .05, DSP(120), { ls: 6 });
      txt(ctx, 'Olimpiade Matematika Internasional', 80, 300, t, A.imo + .2, SRF(38), { col: ivo(.8) });
      srcTag(ctx, 'Sumber: Nature, 12 Nov 2025', -840, 480, t, A.bareng);
    } },

    // 35 · the key: a referee that can't be fooled
    { at: A.kuncinya, via: 'whip', name: 'Wasit', tag: 'WASIT', draw(ctx, t) {
      txt(ctx, 'KUNCINYA:', -860, -400, t, A.kuncinya, MN(26), { ls: 6, col: ivo(.75) });
      fall(ctx, 'WASIT', -880, 180, t, A.wasit - .1, DSP(400), { ls: 10, stag: .05, drop: -120 });
      txt(ctx, 'yang nggak bisa dibohongin', -860, 290, t, A.dibohongin - .05, SRF(56));
      const k = E.outQuint(inv(A.wasit - .2, A.wasit + .3, t)), wh = t > A.wasit && t < A.wasit + .5 ? Math.sin((t - A.wasit) * 60) * 6 : 0;
      if (k > 0) {                                                                        // whistle line drawing
        ctx.save(); ctx.translate(480 + wh, -60); ctx.scale(k, k); ctx.strokeStyle = IVORY; ctx.lineWidth = 8; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.arc(0, 0, 110, 0, 7); ctx.moveTo(60, -90); ctx.lineTo(300, -90); ctx.lineTo(300, -10); ctx.lineTo(95, -10); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, 36, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-90, -70); ctx.quadraticCurveTo(-220, -260, -60, -380); ctx.stroke(); ctx.restore();
        if (t > A.wasit) for (let i = 0; i < 3; i++) { const u = ((t - A.wasit) * 1.6 + i / 3) % 1; ctx.globalAlpha = (1 - u) * .7; ctx.strokeStyle = IVORY; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(820, -150, 40 + 120 * u, -.6, .6); ctx.stroke(); } ctx.globalAlpha = 1;
      }
      txt(ctx, 'MATEMATIKA: DICEK KOMPUTER', 220, 330, t, A.komputer - .1, MN(24), { ls: 4 });
      txt(ctx, 'OBROLAN SEHARI-HARI: ?', 220, 390, t, A.wasitnya - .1, MN(24), { ls: 4, col: ivo(.7) });
    } },

    // 36 · in everyday talk, the referee is still people
    { at: A.di2, via: 'push', name: 'Manusia', draw(ctx, t) {
      txt(ctx, 'DI OBROLAN SEHARI-HARI, WASITNYA', 0, -380, t, A.obrolan, MN(26), { align: 'center', ls: 4, col: ivo(.8) });
      txt(ctx, 'masih', 0, -260, t, A.masih - .1, SRF(70), { align: 'center' });
      const p = new Path2D(), q = new Path2D();
      for (let i = 0; i < 31; i++) { const row = i % 3, x = -900 + (i / 3 | 0) * 180 + row * 60, y = 380 + row * 70, lit = t > A.di2 + .2 + rnd(i + 3) * 2.5;
        (lit ? p : q).moveTo(x, y); person(lit ? p : q, x, y, 150 + 30 * rnd(i)); }
      ctx.fillStyle = 'rgba(124,125,116,.35)'; ctx.fill(q); ctx.fillStyle = ivo(.85); ctx.fill(p);
      fall(ctx, 'MANUSIA', 0, 40, t, A.manusia - .1, DSP(300), { align: 'center', ls: 14 });
    } },

    // 37 · Indonesia: our own original data, glowing softly
    { at: A.nah4, via: 'rise', name: 'Indonesia', draw(ctx, t) {
      const k = E.inOutCubic(inv(A.nah4, A.indonesia + .6, t)), p = new Path2D(), n = Math.floor(DOTS.length * k);
      for (let i = 0; i < DOTS.length; i++) { const [x, y] = DOTS[i]; if (rnd(i + 77) > k) continue; const s = 3.8 + 1.2 * Math.sin(t * 2 + i * .3); p.rect(x - s / 2, y - 40 - s / 2, s, s); }
      const f0 = addF(ctx, 'blur(10px)'); ctx.globalAlpha = .35; ctx.fillStyle = IVORY; ctx.fill(p); ctx.filter = f0; ctx.globalAlpha = 1; ctx.fill(p);
      txt(ctx, `${n} TITIK · PETA: WIKIMEDIA COMMONS (en:User:Indon) · CC BY-SA 3.0`, 860, 470, t, A.indonesia, MN(16), { align: 'right', ls: 4, col: ivo(.4) });
      fall(ctx, 'INDONESIA', 0, 400, t, A.indonesia - .08, DSP(170), { align: 'center', ls: 14 });
      txt(ctx, 'di sinilah Indonesia masuk ke cerita', 0, -420, t, A.cerita2 - .3, SRF(52), { align: 'center', col: ivo(.85) });
    } },
  ];
}
