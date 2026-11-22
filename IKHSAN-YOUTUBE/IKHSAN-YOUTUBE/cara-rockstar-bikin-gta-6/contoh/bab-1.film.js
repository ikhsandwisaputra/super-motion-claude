// Bab 01 · Mesin Ide (VO ivs_vo_ahmad_04, 180 s). One depth row of 17 stations; S3 is the "Jarak = Kedalaman" card row
// (1 ivory card vs 140 grey ones), every later station sits past the end of that row so the camera flies the row to reach it.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, ROOM, IVORY, LIME, LIME_INK, TILE, GREY, DISP, SER, MONO, D2R, ivo, setFont, rnd, fmt, mk,
  timing, camera, makeChapter, loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone } from './kit.js';
import { kq, pop, popAt, doc, mini, bulb, phone, apps, chip, stack, dotGrid, dotCity, stamp } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const ACC_INK = '#4B6800';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const V = {}, IM = {}, G = {}; let tex;

  // ── S3 "Jarak = Kedalaman": constants + card art (ported from tes-jarak) ──────────────────────────────────
  const N = 140, GAP = 170, CW = 300, CH = 400, BL = [0, 2, 5, 10, 18, 32];
  function cardArt(fill, ink, label, num) {
    const [c, g] = mk(600, 800), gr = g.createLinearGradient(0, 0, 600, 800); gr.addColorStop(0, fill[0]); gr.addColorStop(1, fill[1]);
    g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, 600, 800, 22); g.fill();
    g.fillStyle = ink; g.globalAlpha = .9; setFont(g, MN(30), 6); g.fillText(label, 48, 84); g.globalAlpha = .25; g.fillRect(48, 112, 504, 3);
    g.globalAlpha = .9; setFont(g, DSP(210)); g.fillText(num, 44, 360);
    g.globalAlpha = .55; setFont(g, MN(26, 400), 2); g.fillText('PERMOHONAN PATEN', 48, 412); g.fillText('RESIDEN · 2024', 48, 450);
    g.globalAlpha = .16; for (let i = 0; i < 6; i++) g.fillRect(48, 520 + i * 34, i === 5 ? 260 : 504 - (i % 2) * 70, 12);
    g.globalAlpha = .35; g.lineWidth = 4; g.strokeStyle = ink; g.beginPath(); g.arc(486, 706, 48, 0, 7); g.stroke(); g.beginPath(); g.arc(486, 706, 34, 0, 7); g.stroke();
    g.globalAlpha = 1; g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.roundRect(4, 4, 592, 792, 20); g.stroke();
    return BL.map(b => { if (!b) return c; const [d, x] = mk(300, 400); x.filter = `blur(${b / 2}px)`; x.drawImage(c, 0, 0, 300, 400); return d; });
  }
  function noteArt() {                                     // a stylised Rp10.000 note (not a banknote replica): paper, guilloche, numeral
    const [c, g] = mk(1200, 500), gr = g.createLinearGradient(0, 0, 1200, 500); gr.addColorStop(0, '#ECE8D8'); gr.addColorStop(1, '#C9C4AF');
    g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, 1200, 500, 16); g.fill();
    g.strokeStyle = 'rgba(30,32,26,.16)'; g.lineWidth = 1.5;
    for (let k = 0; k < 24; k++) { g.beginPath(); for (let x = 0; x <= 1200; x += 6) { const y = 250 + Math.sin(x / 55 + k * .5) * (30 + k * 7) * Math.cos(x / 310 + k * .7); x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
    g.strokeStyle = 'rgba(30,32,26,.55)'; g.lineWidth = 3; g.strokeRect(26, 26, 1148, 448);
    g.fillStyle = '#1E201A'; setFont(g, DSP(190), 2); g.fillText('10.000', 70, 230); setFont(g, MN(26), 6); g.fillText('SEPULUH RIBU RUPIAH', 76, 282);
    g.globalAlpha = .7; setFont(g, MN(20), 4); g.fillText('SELURUH EKONOMI · SETAHUN', 76, 438);
    g.globalAlpha = .35; g.lineWidth = 4; for (const r of [150, 112, 74]) { g.beginPath(); g.arc(940, 250, r, 0, 7); g.stroke(); }
    return c;
  }

  async function load() {
    const vb = '../assets/shared/vid/';
    for (const [k, n] of [['lab', 'lab'], ['mik', 'mikroskop'], ['sarung', 'sarung'], ['simpang', 'persimpangan'], ['sf', 'sf_udara'], ['kabel', 'kabel']]) V[k] = await loadVid(vb, n);
    const kb = '../assets/shared/kutipan/';
    for (const [k, f] of [['wb', 'data-research-and-development-expenditure-of.png'], ['cnbc', 'cnbcindonesia-miris-mantan-menkeu-ungkap-anggaran.png'],
      ['merdeka', 'merdeka-prabowo-tambah-dana-riset-dan-inovasi.png'], ['gii', 'wipo-gii-2026-results.png'], ['press', 'wipo-wipo-global-innovation-index-2026.png']]) IM[k] = await loadImg(kb + f, 1600);
    IM.note = noteArt();
    tex = { id: cardArt(['#FBFAF4', '#E4E1D4'], '#11120E', 'INDONESIA', '1.931'), us: cardArt(['#8A8B82', '#55564F'], '#0B0C09', 'AMERIKA SERIKAT', '1.931') };
    G.id = dotGrid(4, 3); G.us = dotGrid(49, 7);
  }

  // ── stations ─────────────────────────────────────────────────────────────────────────────────────────────────
  const S3 = { at: A.tahun, name: 'Paten: 1 vs 140', via: 'whip' };
  const ST = [
    { at: 0, name: 'Pembuka bab', dist: [1700, 1480], draw(ctx, t) {
      txt(ctx, 'BAB 01', 0, -250, t, .3, MN(28), { align: 'center', ls: 10, col: ivo(.75) });
      const k = kq(t, .45, .6); ctx.fillStyle = LIME; ctx.fillRect(-70 * k, -222, 140 * k, 5);
      fall(ctx, 'MESIN IDE', 0, 95, t, .6, DSP(300), { align: 'center', ls: 6, stag: .05 });
      markLine(ctx, 'Ide baru itu lahir ', 'di mana?', '', 0, 270, t, A.ide0 - .1, A.mana, SRF(64), { ls: 0 });
    } },

    { at: A.di, name: 'Lab, kampus, divisi riset', via: 'push', tag: 'LAB', draw(ctx, t) {
      plate(ctx, V.lab, t, 0, -20, 1460, 780, kq(t, A.di - .25, .7), { t0: A.di - .3, dim: .5 * kq(t, A.paten, .3) });
      slab(ctx, 'LABORATORIUM', -380, -300, t, A.lab, { align: 'right', lx: -230, ly: -120 });
      slab(ctx, 'KAMPUS', 380, -330, t, A.kampus, { lx: 240, ly: -150 });
      slab(ctx, 'DIVISI RISET', -380, 270, t, A.divisi, { align: 'right', lx: -230, ly: 120 });
      const kr = kq(t, A.cara, .9);
      if (kr > 0) { ctx.fillStyle = ivo(.85); ctx.fillRect(-730, 416, 1460 * kr, 3);
        for (let i = 0; i <= 24; i++) { const x = -730 + i * 1460 / 24; if (x > -730 + 1460 * kr + 1) break; const L = i % 4 ? 12 : 26; ctx.fillRect(x - 1.5, 416 - L, 3, L); } }
      txt(ctx, 'ALAT UKURNYA', -730, 462, t, A.cara + .2, MN(20), { ls: 5, col: ivo(.7) });
      stamp(ctx, 'PATEN', 0, 30, t, A.paten, { size: 210 });
    }, layers: [
      { dz: 1500, dx: 1350, dy: -120, fn: (ctx, t) => plate(ctx, V.mik, t, 0, 0, 1100, 620, kq(t, A.di - .2, .8), { dim: .15, marks: false }) },
      { dz: 1500, dx: -1350, dy: 60, fn: (ctx, t) => plate(ctx, V.sarung, t, 0, 0, 1100, 620, kq(t, A.di - .1, .8), { dim: .15, marks: false }) }] },

    { at: A.paten2, name: 'Paten = sertifikat ide', via: 'whip', tag: 'HAK', draw(ctx, t) {
      popAt(ctx, -360, 0, t, A.paten2 - .1, () => {
        doc(ctx, 0, 0, 600, 800); ctx.fillStyle = '#11120E'; setFont(ctx, MN(22), 6); ctx.textAlign = 'left'; ctx.fillText('SERTIFIKAT', -250, -330); ctx.fillRect(-250, -310, 500, 3);
        setFont(ctx, DSP(96), 2); ctx.fillText('HAK ATAS', -250, -200);
        const sw = E.snap(inv(A.ide - .15, A.ide + .2, t));
        ctx.save(); ctx.beginPath(); ctx.rect(-260, -188, 520, 112); ctx.clip();
        ctx.fillStyle = '#11120E'; ctx.fillText('TANAH', -250, -95 - sw * 115); ctx.fillStyle = ACC_INK; ctx.fillText('IDE', -250, -95 + (1 - sw) * 115); ctx.restore();
        const pa = 1 - inv(A.tapi, A.ide, t);                // land parcel fades, a bulb takes its place
        if (pa > 0) { ctx.globalAlpha = pa; ctx.strokeStyle = '#11120E'; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath();
          [[-220, -20], [90, -40], [210, 40], [160, 170], [-150, 150], [-240, 60]].forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke(); ctx.setLineDash([]);
          setFont(ctx, MN(18), 3); ctx.fillStyle = '#11120E'; ctx.fillText('LUAS 120 M²', -150, 70); ctx.globalAlpha = 1; }
        popAt(ctx, 0, 70, t, A.ide, () => { ctx.strokeStyle = ACC_INK; ctx.lineWidth = 7; ctx.lineJoin = 'round'; bulb(ctx, 62); });
        setFont(ctx, MN(18), 4); ctx.fillStyle = 'rgba(17,18,14,.6)'; ctx.fillText('PEMEGANG HAK', -250, 236); ctx.fillRect(-250, 292, 500, 2);
        typeOn(ctx, 'YANG MENDAFTAR', -250, 282, t, A.siapa + .3, MN(32), { cps: 24, col: '#11120E', ls: 2 });
        stamp(ctx, 'TERDAFTAR', 130, 330, t, A.pegang, { size: 64, rot: -8 });
      }, { from: .85, rise: 60 });
      fall(ctx, 'PATEN', 66, -60, t, A.paten2, DSP(220), { stag: .04 });
      txt(ctx, '= sertifikat tanah,', 70, 50, t, A.sertifikat, SRF(60));
      markLine(ctx, 'tapi untuk ', 'ide.', '', 70, 150, t, A.tapi, A.ide, SRF(60), { align: 'left', ls: 0 });
      txt(ctx, 'SIAPA YANG MENDAFTAR,', 70, 270, t, A.siapa, MN(28), { ls: 3 });
      txt(ctx, 'DIA YANG PEGANG HAKNYA.', 70, 316, t, A.pegang - .3, MN(28), { ls: 3, col: LIME });
    } },

    S3,

    { at: A.selama - .15, name: 'Selama video ini', via: 'push', lead: .45, dur: 1.1, tag: '11:00', draw: drawS4 },

    { at: A.buat, name: 'HP, aplikasi, chip', via: 'whip', draw(ctx, t) {
      txt(ctx, 'Buat kamu, artinya begini.', 0, -380, t, A.buat, SRF(64), { align: 'center' });
      const dm = 1 - .55 * kq(t, A.atas, .4), a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * dm;
      popAt(ctx, -560, 0, t, A.hp, () => phone(ctx, 210, 420), { rise: 60 });
      popAt(ctx, 0, 0, t, A.aplikasi, () => apps(ctx, 92, 24), { rise: 60 });
      popAt(ctx, 560, 0, t, A.chip, () => chip(ctx, 250), { rise: 60, rot: -4 });
      for (const [s, x, t0] of [['HP', -560, A.hp], ['APLIKASI', 0, A.aplikasi], ['CHIP', 560, A.chip]]) txt(ctx, s, x, 290, t, t0 + .1, MN(26), { align: 'center', ls: 6 });
      ctx.globalAlpha = a0;
      slab(ctx, 'RESEPNYA TERCATAT ATAS NAMA SIAPA?', 0, -275, t, A.resep, { align: 'center', size: 20 });
      slab(ctx, 'ATAS NAMA: ORANG LAIN', 0, 395, t, A.atas, { align: 'center', size: 34, lime: true });
    } },

    { at: A.uniknya, name: 'Kantor paten kita ramai', via: 'truck', draw(ctx, t) {
      typeOn(ctx, 'KANTOR PATEN INDONESIA', -820, -400, t, A.kantor, MN(26), { ls: 4, cps: 40 });
      txt(ctx, 'ramai.', -820, -300, t, A.ramai, SRF(84));
      for (let i = 0; i < 10; i++) { const s = t - A.ramai - i * .05; if (s <= 0) continue; const k = E.outQuint(clamp(s / .5)), a0 = ctx.globalAlpha;
        const g = i < 8 ? kq(t, A.delapan - .4 + i * .07, .3) : i === 8 ? .5 * kq(t, A.delapan + .16, .3) : 0;
        ctx.globalAlpha = a0 * clamp(s / .15); mini(ctx, -675 + 150 * i + (1 - k) * 260, 40, 120, 160, g); ctx.globalAlpha = a0; }
      const kb = kq(t, A.delapan + .3, .45);
      if (kb > 0) { ctx.strokeStyle = ivo(.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-735, 138); ctx.lineTo(-735, 150); ctx.lineTo(-735 + 1170 * kb, 150); ctx.lineTo(-735 + 1170 * kb, 138); ctx.stroke(); }
      slab(ctx, 'DARI LUAR NEGERI', -735, 196, t, A.delapan + .45, { size: 22 });
      txt(ctx, 'KANTOR PATEN · PERINGKAT DUNIA', 820, -400, t, A.wipo, MN(22), { align: 'right', ls: 3, col: ivo(.8) });
      if (t > A.peringkat - .1) { const fin = t >= A.tujuhbelas, v = fin ? 17 : 10 + Math.floor(rnd(Math.floor(t * 22)) * 89);
        setFont(ctx, DSP(190), 2); ctx.textAlign = 'right'; ctx.fillStyle = fin ? IVORY : ivo(.55); ctx.fillText('#' + v, 820, -200); ctx.textAlign = 'left';
        if (fin) { const ku = kq(t, A.tujuhbelas, .35); ctx.fillStyle = LIME; ctx.fillRect(820 - 250 * ku, -178, 250 * ku, 6); } }
      fall(ctx, '8+ DARI 10', 820, 380, t, A.lebih + .2, DSP(150), { align: 'right', ls: 3 });
      srcTag(ctx, 'Sumber: WIPO, World IP Indicators 2025 · 82,3% non-residen', -840, 440, t, A.lebih);
    } },

    { at: A.masuk, name: 'Pasarnya di sini', via: 'push', draw(ctx, t) {
      const out = gone(t, A.jadi - .1, .35), a0 = ctx.globalAlpha;
      ctx.globalAlpha = a0 * out;
      txt(ctx, 'Masuk akal, sih.', 0, -380, t, A.masuk, SRF(64), { align: 'center' });
      const kx = kq(t, A.masuk + .2, .6);
      if (kx > 0) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.setLineDash([18, 12]); ctx.strokeRect(-560 * kx, -240, 1120 * kx, 520); ctx.setLineDash([]);
        setFont(ctx, MN(20), 5); ctx.fillStyle = ivo(.8 * kx); ctx.fillText('PASAR INDONESIA', -530, -205); }
      for (let i = 0; i < 10; i++) { const s = t - A.pasar - .3 - i * .07; if (s <= 0) continue; const k = E.outQuint(clamp(s / .55)), home = i < 2, a1 = ctx.globalAlpha;
        const x = -400 + 200 * (i % 5), y = -60 + 220 * Math.floor(i / 5); ctx.globalAlpha = a1 * clamp(s / .12);
        mini(ctx, x + (1 - k) * (home ? -900 : 1100), y - (1 - k) * 120, 130, 170, home ? 0 : 1); ctx.globalAlpha = a1; }
      slab(ctx, 'IDENYA TERLINDUNGI DI SINI', 0, 330, t, A.terlindungi, { align: 'center', size: 24 });
      ctx.globalAlpha = a0;
      fall(ctx, 'PASARNYA DI SINI.', 0, -20, t, A.jadi + .15, DSP(170), { align: 'center', ls: 4, stag: .03 });
      markLine(ctx, 'PENCIPTANYA ', 'DI LUAR.', '', 0, 190, t, A.pencipta - .05, A.luar2, DSP(130), { ls: 4 });
    } },

    { at: A.kenapa, name: 'Ikuti uangnya', via: 'cut', lead: 0, draw(ctx, t) {
      txt(ctx, 'Kenapa bisa begitu?', 0, -170, t, A.kenapa, SRF(70), { align: 'center' });
      setFont(ctx, DSP(300), 6); const w1 = ctx.measureText('IKUTI ').width, w2 = ctx.measureText('UANGNYA').width, x0 = -(w1 + w2) / 2;
      fall(ctx, 'IKUTI ', x0, 190, t, A.ikuti, DSP(300), { ls: 6, stag: .04 });
      fall(ctx, 'UANGNYA', x0 + w1, 190, t, A.uangnya, DSP(300), { ls: 6, stag: .04, col: LIME });
    } },

    { at: A.bayangkan, name: 'Selembar Rp10.000', via: 'rise', tag: 'Rp10.000', draw: drawS8 },

    { at: A.dan, name: 'Kata pejabat kita', via: 'whip', draw(ctx, t) {
      evid(ctx, IM.wb, -380, -215, 980, t, A.dan - .1, { tab: 'WORLD BANK · DATA', rot: -1.5, hl: [[.028, .21, .50, .10, A.dan + .9]] });
      evid(ctx, IM.cnbc, 380, 150, 1000, t, A.pejabat - .1, { tab: 'CNBC INDONESIA · 26 OKT 2026', rot: 1.2, hl: [[.042, .255, .425, .10, A.nol]] });
      fall(ctx, '0,2–0,3 %', -830, 320, t, A.nol, DSP(150), { ls: 2 });
      txt(ctx, 'PDB · KATA PEJABAT KITA', -830, 370, t, A.nol + .3, MN(22), { ls: 4, col: ivo(.8) });
      srcTag(ctx, 'Sumber: CNBC Indonesia, 26 Okt 2026; Bisnis.com, 11 Nov 2025', -840, 440, t, A.pejabat + .5);
    } },

    { at: A.bedanya, name: 'Bisnis ×4 federal', via: 'truck', tag: '×4', draw(ctx, t) {
      txt(ctx, 'AMERIKA · SIAPA YANG MEMBIAYAI RISET', 0, -400, t, A.bedanya, MN(26), { align: 'center', ls: 4 });
      stack(ctx, -330, 300, 16, t, A.perusahaan, { th: 18, rx: 120, step: .06 });
      stack(ctx, 330, 300, 4, t, A.dana, { th: 18, rx: 120, step: .06 });
      txt(ctx, 'BISNIS · 2,54 % PDB', -330, 410, t, A.perusahaan, MN(22), { align: 'center', ls: 3 });
      txt(ctx, 'PEMERINTAH FEDERAL · 0,63 % PDB', 330, 410, t, A.dana, MN(22), { align: 'center', ls: 3 });
      stamp(ctx, '×4', 0, -150, t, A.empat2, { size: 200 });
      srcTag(ctx, 'Sumber: NSF NCSES, 2026 (data 2024)', -840, 470, t, A.empat2 + .4);
    } },

    { at: A.lalu, name: 'Kota sejuta orang', via: 'whip', tag: '1 JUTA', draw(ctx, t) {
      txt(ctx, 'Satu kota, sejuta orang.', 0, -380, t, A.bayangkan2, SRF(64), { align: 'center' });
      txt(ctx, '1 TITIK = 100 ORANG', 0, -300, t, A.sejuta + .3, MN(20), { align: 'center', ls: 4, col: ivo(.7) });
      txt(ctx, 'VERSI INDONESIA', -430, -300, t, A.versi, MN(24), { align: 'center', ls: 4 });
      txt(ctx, 'VERSI AMERIKA', 430, -300, t, A.versi2, MN(24), { align: 'center', ls: 4 });
      dotCity(ctx, G.id, -430, 20, 520, t, A.sejuta, A.empat3, { step: .08 });
      dotCity(ctx, G.us, 430, 20, 520, t, A.sejuta + .15, A.hampir, { step: .014 });
      const w1 = fall(ctx, '395', -540, 370, t, A.empat3, DSP(96), { ls: 2, col: LIME }); if (w1) txt(ctx, 'PENELITI', -530 + w1, 366, t, A.empat3 + .2, MN(22), { ls: 4 });
      const w2 = fall(ctx, '4.937', 300, 370, t, A.hampir + .2, DSP(96), { ls: 2 }); if (w2) txt(ctx, 'PENELITI', 310 + w2, 366, t, A.hampir + .4, MN(22), { ls: 4 });
      srcTag(ctx, 'Sumber: World Bank / UNESCO UIS (Indonesia 2020, AS 2022)', -840, 440, t, A.peneliti);
    }, layers: [
      { dz: 1800, dx: -1650, dy: -80, fn: (ctx, t) => plate(ctx, V.simpang, t, 0, 0, 1300, 740, kq(t, A.lalu - .2, .7), { dim: .6, marks: false }) },
      { dz: 1800, dx: 1650, dy: -80, fn: (ctx, t) => plate(ctx, V.sf, t, 0, 0, 1300, 740, kq(t, A.lalu, .7), { dim: .6, marks: false }) }] },

    { at: A.kalau, name: 'Satu pemain vs satu tim', via: 'rise', draw: drawS12 },

    { at: A.pemerintah, name: 'Dana riset naik', via: 'whip', tag: 'Rp12 T', draw(ctx, t) {
      evid(ctx, IM.merdeka, -400, -120, 860, t, A.pemerintah, { dark: true, tab: 'MERDEKA.COM · 15 JAN 2026', rot: -1.2, hl: [[.59, .235, .35, .115, A.duabelas]] });
      txt(ctx, 'DANA RISET KAMPUS', 445, -330, t, A.tahun2, MN(24), { align: 'center', ls: 4 });
      for (const [x, v, t0, lime, lab] of [[330, 8, A.delapan2, false, 'SEBELUMNYA'], [560, 12, A.duabelas, true, 'TAHUN INI']]) {
        const k = E.outQuint(inv(t0, t0 + .6, t)); if (k <= 0) continue; const h = 34 * v * k;
        ctx.fillStyle = lime ? LIME : GREY; ctx.fillRect(x - 75, 300 - h, 150, h);
        setFont(ctx, DSP(64), 1); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('Rp' + v + ' T', x, 300 - h - 22); ctx.textAlign = 'left';
        txt(ctx, lab, x, 340, t, t0, MN(18), { align: 'center', ls: 3, col: ivo(.75) }); }
      ctx.fillStyle = ivo(.6); ctx.fillRect(220, 300, 450 * kq(t, A.delapan2 - .3, .5), 2);
      fall(ctx, 'BRIN · Rp6,14 T', -830, 330, t, A.enam2, DSP(110), { ls: 2 });
      txt(ctx, 'Kedengarannya raksasa.', 445, 420, t, A.kedengarannya, SRF(54), { align: 'center' });
      srcTag(ctx, 'Sumber: Merdeka.com, 15 Jan 2026; BRIN, 8 Jan 2026', -840, 440, t, A.duabelas + .3);
    } },

    { at: A.sekarang, name: 'Dibagi rata', via: 'push', tag: '÷', draw: drawS14 },

    { at: A.hasil, name: 'GII 2026 #55', via: 'truck', tag: '#55', draw: drawS15 },

    { at: A.oke, name: 'Ide butuh jalan', via: 'whip', tag: 'JALAN', draw(ctx, t) {
      plate(ctx, V.kabel, t, 0, 0, 1760, 960, kq(t, A.oke - .3, .7), { t0: A.oke - .3, dim: .25 });
      const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * gone(t, A.dan3, .5);
      txt(ctx, 'Ide butuh laboratorium.', 0, -110, t, A.oke + .1, SRF(72), { align: 'center' });
      markLine(ctx, 'IDE JUGA BUTUH ', 'JALAN.', '', 0, 130, t, A.tapi2, A.jalan, DSP(190), { ls: 4 });
      ctx.globalAlpha = a0;
    }, mod(c, t) { const k = E.inCubic(inv(A.dan3, DUR, t)); c.dist -= 1250 * k; c.foc = c.dist; } },
  ];

  // S3 sits at the default z (index 3); every later station lies past the end of its 140-card row
  const Z3 = 3 * 2600, XI = -430, XA = 430;
  ST.forEach((s, i) => { if (i > 3) s.z = Z3 + 25000 + (i - 4) * 2600; });

  // ── S3: camera, world, screen type ─────────────────────────────────────────────────────────────────────────
  const lc = (a, b, k) => { const o = { ...a }; for (const key of ['yaw', 'pitch', 'dist', 'tx', 'ty', 'tz']) o[key] = lerp(a[key], b[key], k); return o; };
  const P0 = { yaw: -4, pitch: 3, dist: 1100, tx: XI + 260, ty: -200, tz: Z3 }, P1 = { ...P0, yaw: 4, tx: XA + 260 };
  const PF = { yaw: 7, pitch: 11, dist: 900, tx: XA - 240, ty: -330, tz: Z3 }, P3 = { yaw: -22, pitch: 7, dist: 3000, tx: -200, ty: -300, tz: Z3 + 1200 };
  S3.cam = t => {
    let c = { ...P0, dist: 1900 - 260 * E.inOutSine(inv(A.tahun, A.seribu, t)), tx: XI - 300 };
    c = lc(c, P0, E.outQuint(inv(A.seribu - .3, A.seribu + .5, t))); c.dist -= 60 * inv(A.seribu, A.amerika, t);
    c = lc(c, P1, E.snap(inv(A.amerika - .06, A.amerika + .3, t))); c.dist -= 40 * inv(A.amerika + .3, A.dua - .2, t);
    c = lc(c, PF, E.inOutCubic(inv(A.dua - .45, A.dua + .2, t)));
    const fly = inv(A.dua - .15, A.ribu + .02, t); c.tz = lerp(c.tz, Z3 + (N - 1) * GAP, E.inOutCubic(fly)); c.yaw += 3 * Math.sin(fly * Math.PI);
    const back = E.brake(inv(A.ribu + .05, A.ribu + 1.0, t)), from = { ...c };
    c = lc(from, P3, back); c.tz = lerp(from.tz, P3.tz, E.outExpo(inv(A.ribu + .05, A.ribu + .7, t))); c.dist += 160 * inv(A.ribu + 1, A.selama, t);
    c.f = 1500; c.roll = 0; c.foc = lerp(c.dist, camera(c)(XI, -CH / 2, Z3).z, back); return c;
  };
  const exS3 = t => 1 - inv(A.selama - .5, A.selama, t);
  function quad(ctx, pr, levels, x, z, a, foc) {           // a standing card, base on the floor (y = 0)
    const p0 = pr(x - CW / 2, -CH, z), p1 = pr(x + CW / 2, -CH, z), p3 = pr(x - CW / 2, 0, z); if (p0.z < 60 || a <= 0) return;
    const blur = Math.abs(p0.z - foc) / p0.z * 26, lv = Math.min(BL.length - 1.001, blur < BL[1] ? blur / BL[1] : 1 + Math.log2(blur / BL[1] + 1));
    const l0 = Math.floor(lv), fr = lv - l0, img0 = levels[l0], img1 = levels[l0 + 1];
    const m = (img, al) => { ctx.setTransform((p1.x - p0.x) / img.width, (p1.y - p0.y) / img.width, (p3.x - p0.x) / img.height, (p3.y - p0.y) / img.height, p0.x, p0.y); ctx.globalAlpha = al; ctx.drawImage(img, 0, 0); };
    const b = pr(x, 0, z); ctx.setTransform(1, 0, 0, .14, b.x, b.y); ctx.globalAlpha = .5 * a;
    const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 210 * b.s); gr.addColorStop(0, 'rgba(0,0,0,.9)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gr; ctx.fillRect(-220 * b.s, -220 * b.s, 440 * b.s, 440 * b.s);
    m(img0, a); if (fr > .02 && img1) m(img1, a * fr);
    const fog = clamp((p0.z - 1400) / 16000) * .78;
    if (fog > 0) { ctx.globalAlpha = a * fog; ctx.fillStyle = ROOM; ctx.beginPath(); ctx.roundRect(0, 0, img0.width, img0.height, img0.width * .037); ctx.fill(); }
    ctx.globalAlpha = 1; ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  S3.world = (ctx, t, pr, foc, items) => {
    S3.pr = pr; const ex = exS3(t); if (ex <= 0 || t < A.tahun - 1) return;
    if (t > A.amerika - .3) items.push({ d: 1e9, f: () => {             // floor ticks along the US lane, numbered every 20
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = ex * clamp((t - A.amerika + .3) / .5); ctx.strokeStyle = ivo(.16); ctx.lineWidth = 1.5; ctx.fillStyle = ivo(.35);
      for (let i = 0; i < N; i++) { const a = pr(XA - 260, 0, Z3 + i * GAP), b = pr(XA - 200, 0, Z3 + i * GAP); if (a.z < 60) continue;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        if ((i + 1) % 20 === 0 && a.s > .05) { setFont(ctx, `400 ${Math.max(9, 34 * a.s)}px "${MONO}"`); ctx.textAlign = 'right'; ctx.fillText(String(i + 1).padStart(3, '0'), a.x - 10 * a.s, a.y); ctx.textAlign = 'left'; } }
      ctx.globalAlpha = 1; } });
    for (let i = 0; i < N; i++) {
      const z = Z3 + i * GAP, stag = inv(A.amerika - .25 + Math.min(i, 30) * .012, A.amerika + .15 + Math.min(i, 30) * .012, t);
      if (stag > 0 || t > A.dua) items.push({ d: pr(XA, -CH / 2, z).z, f: () => quad(ctx, pr, tex.us, XA, z - (1 - E.outQuint(stag)) * 900, Math.max(stag, t > A.dua ? 1 : 0) * .96 * ex, foc) });
    }
    const inI = E.outQuint(inv(A.seribu - .3, A.seribu + .45, t));
    if (inI > 0) items.push({ d: pr(XI, -CH / 2, Z3).z, f: () => quad(ctx, pr, tex.id, XI - (1 - inI) * 900, Z3, inI * ex, foc) });
  };
  const [OC, og] = mk(W, H);
  function fallText(ctx, str, x, base, t0, t, size, col, stag = .03) {
    setFont(ctx, DSP(size)); let cx = x;
    for (let i = 0; i < str.length; i++) { const w = ctx.measureText(str[i]).width, k = E.expo16((t - t0 - i * stag) / .22);
      if (k > 0) { ctx.save(); ctx.translate(cx + w / 2, base - size * .35 + (1 - k) * 50); ctx.scale(lerp(2, 1, k), lerp(2, 1, k)); ctx.globalAlpha *= clamp(k * 3); ctx.fillStyle = col; ctx.fillText(str[i], -w / 2, size * .35); ctx.restore(); }
      cx += w; }
    return cx - x;
  }
  S3.over = (o, t) => {
    const ex = exS3(t); if (ex <= 0 || t < A.tahun) return; const ctx = og, pr = S3.pr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); ctx.globalAlpha = 1; ctx.textAlign = 'left';
    const pre = 1 - inv(A.seribu - .2, A.seribu + .05, t);                     // before the card: the year, who files
    if (pre > 0) { ctx.globalAlpha = pre; fallText(ctx, '2024', 1056, 640, A.y2024, t, 230, IVORY);
      ctx.globalAlpha = pre * E.outCubic(inv(A.warga, A.warga + .4, t)); setFont(ctx, MN(26, 400), 3); ctx.fillStyle = ivo(.75); ctx.fillText('WARGA & LEMBAGA INDONESIA', 1064, 700); ctx.globalAlpha = 1; }
    const outI = inv(A.amerika - .1, A.amerika + .15, t);
    if (t > A.seribu && outI < 1) {
      ctx.globalAlpha = 1 - outI; ctx.fillStyle = IVORY; setFont(ctx, SRF(64)); ctx.fillText('Indonesia', 1060, 420);
      fallText(ctx, '1.931', 1056, 640, A.seribu + .05, t, 230, IVORY);
      ctx.globalAlpha = (1 - outI) * E.outCubic(inv(A.permohonan, A.permohonan + .4, t)); setFont(ctx, MN(26, 400), 3); ctx.fillStyle = ivo(.7); ctx.fillText('PERMOHONAN PATEN RESIDEN · 2024', 1064, 700); ctx.globalAlpha = 1; }
    const lg = E.outCubic(inv(A.amerika + .2, A.amerika + .6, t)) * (1 - inv(A.ribu, A.ribu + .25, t));
    if (lg > 0) { ctx.globalAlpha = lg; setFont(ctx, MN(22), 4); ctx.fillStyle = ivo(.8); ctx.fillText('1 KARTU = 1.931 PERMOHONAN', 120, 118);
      const fly = E.inOutCubic(inv(A.dua - .15, A.ribu + .02, t)), n = Math.max(1, Math.min(N, Math.round(1 + fly * (N - 1))));
      ctx.globalAlpha = lg * (1 - inv(A.ribu + .3, A.ribu + .6, t)); setFont(ctx, DSP(150)); ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText(String(n).padStart(3, '0'), 1800, 980);
      setFont(ctx, MN(24, 400), 3); ctx.fillText('KARTU AMERIKA', 1800, 1016); ctx.textAlign = 'left'; ctx.globalAlpha = 1; }
    if (t > A.ribu && pr) {
      const kI = E.outCubic(inv(A.ribu + .35, A.ribu + .75, t)), pI = pr(XI, 0, Z3);
      if (kI > 0) { ctx.globalAlpha = kI; ctx.fillStyle = ivo(.8); setFont(ctx, MN(22), 4); ctx.textAlign = 'center'; ctx.fillText('INDONESIA · 1.931', pI.x, pI.y + 44 + (1 - kI) * 20); ctx.textAlign = 'left'; ctx.globalAlpha = 1; }
      ctx.fillStyle = IVORY; setFont(ctx, SRF(64)); ctx.globalAlpha = E.outCubic(inv(A.ribu + .1, A.ribu + .5, t)); ctx.fillText('Amerika Serikat', 124, 150); ctx.globalAlpha = 1;
      fallText(ctx, '270.295', 120, 360, A.ribu + .18, t, 230, IVORY, .028);
      const k = E.snap(inv(A.ribu + .75, A.ribu + .95, t));
      if (k > 0) { setFont(ctx, DSP(100)); const w = ctx.measureText('±140×').width; ctx.fillStyle = LIME; ctx.fillRect(124, 386, (w + 40) * k, 118);
        ctx.save(); ctx.beginPath(); ctx.rect(124, 386, (w + 40) * k, 118); ctx.clip(); ctx.fillStyle = LIME_INK; ctx.fillText('±140×', 144, 486); ctx.restore();
        ctx.globalAlpha = E.outCubic(inv(A.ribu + .95, A.ribu + 1.3, t)); setFont(ctx, MN(21, 400), 1); ctx.fillStyle = ivo(.75);
        ctx.fillRect(120, 1017, 11, 11); ctx.fillText('Sumber: WIPO, profil statistik 2024 · rasio ±140× hitungan sendiri', 146, 1030); ctx.globalAlpha = 1; } }
    o.globalAlpha = ex; o.drawImage(OC, 0, 0); o.globalAlpha = 1;
  };

  // ── S4: 11 minutes vs 4,5 hours ─────────────────────────────────────────────────────────────────────────────
  function drawS4(ctx, t) {
    txt(ctx, 'Supaya kebayang.', 0, -360, t, A.selama - .3, SRF(64), { align: 'center' });
    const zm = kq(t, A.indonesia2, .7), kb = kq(t, A.selama, .6), X0 = -760, BW = 1520, YA = 130, YI = 330, SPAN = 4.52;
    if (kb <= 0) return;
    const scaleLab = zm < .5 ? 'SKALA: 11 MENIT · DURASI VIDEO INI' : 'SKALA: 4,5 JAM';
    txt(ctx, scaleLab, 0, -250, t, zm < .5 ? A.selama : A.indonesia2, MN(22), { align: 'center', ls: 4, col: ivo(.8) });
    for (const [y, lab, t0] of [[YA, 'AMERIKA', A.selama], [YI, 'INDONESIA', A.selama + .15]]) {
      const k = kq(t, t0, .6); ctx.fillStyle = ivo(.45); ctx.fillRect(X0, y, BW * k, 3); ctx.fillRect(X0, y - 10, 3, 23); if (k > .98) ctx.fillRect(X0 + BW - 3, y - 10, 3, 23);
      txt(ctx, lab, X0, y + 40, t, t0, MN(20), { ls: 5, col: ivo(.75) });
      txt(ctx, zm < .5 ? '11:00' : '4:30:00', X0 + BW, y + 40, t, zm < .5 ? t0 : A.indonesia2, MN(20), { align: 'right', ls: 2, col: ivo(.6) }); }
    // phase 1: a linear playhead over 11 minutes, 6 US cards pop along it
    const ph1 = inv(A.sebelas, A.sebelas + SPAN, t), ph2 = inv(A.empat, A.satu, t), cf = 11 / 272;
    let nUS = 0;
    for (let j = 0; j < 6; j++) { const tj = A.sebelas + (j + .5) / 6 * SPAN; if (t < tj) continue; nUS++;
      const x = X0 + (j + .5) / 6 * BW, xz = lerp(x, X0 + (x - X0) * cf, zm), sc = lerp(1, .18, zm), a0 = ctx.globalAlpha;
      ctx.globalAlpha = a0 * (1 - zm); popAt(ctx, xz, YA - 85, t, tj, () => { ctx.scale(sc, sc); mini(ctx, 0, 0, 100, 133, 1); }); ctx.globalAlpha = a0; }
    if (zm > 0) { const n = Math.round(140 * ph2); ctx.fillStyle = IVORY;                              // phase 2: 140 ticks in 4,5 hours
      for (let i = 0; i < Math.max(6 * zm, n); i++) ctx.fillRect(X0 + (i + .5) / 140 * BW - 2.5, YA - 44, 5, 40); nUS = Math.max(nUS, n); }
    const phx = zm < 1 && t < A.empat ? X0 + BW * lerp(ph1, cf, zm) : X0 + BW * lerp(cf, 1, ph2);
    if (t > A.sebelas - .2) for (const [y, col] of [[YA, IVORY], [YI, LIME]]) { ctx.fillStyle = col; ctx.fillRect(phx - 2, y - 58, 4, 76); ctx.beginPath(); ctx.arc(phx, y - 58, 7, 0, 7); ctx.fill(); }
    if (t > A.sebelas) { setFont(ctx, DSP(150), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('+' + nUS, X0, -150);
      setFont(ctx, MN(18), 4); ctx.fillStyle = ivo(.7); ctx.fillText('PATEN BARU AMERIKA', X0 + 4, -112); }
    if (t > A.indonesia2) { const ni = t >= A.satu ? 1 : 0; setFont(ctx, DSP(150), 2); ctx.textAlign = 'right'; ctx.fillStyle = ni ? LIME : ivo(.4); ctx.fillText('+' + ni, X0 + BW, -150);
      setFont(ctx, MN(18), 4); ctx.fillStyle = ivo(.7); ctx.fillText('PATEN BARU INDONESIA', X0 + BW - 4, -112); ctx.textAlign = 'left'; }
    popAt(ctx, X0 + BW - 50, YI - 85, t, A.satu, () => mini(ctx, 0, 0, 100, 133, 0, { ring: true }), { from: .4 });
  }

  // ── S8: one Rp10.000 note, the share for research ─────────────────────────────────────────────────────────────
  function drawS8(ctx, t) {
    txt(ctx, 'Seluruh ekonomi setahun = selembar Rp10.000', 0, -420, t, A.bayangkan + .2, SRF(52), { align: 'center' });
    const NW = 1200, NH = 500, sA = 41.4, sI = 3.36, cut = kq(t, A.amerika3, .55), kI = kq(t, A.indonesia3, .4), note = IM.note;
    const drawNote = () => {
      if (cut > 0) ctx.drawImage(note, sA, 0, NW - sA, NH, -NW / 2 + sA, -NH / 2, NW - sA, NH); else ctx.drawImage(note, -NW / 2, -NH / 2);
      if (kI > 0) { ctx.fillStyle = ROOM; ctx.fillRect(NW / 2 - sI, -NH / 2, sI, NH); ctx.fillStyle = LIME; ctx.fillRect(NW / 2 - sI + 14 * kI, -NH / 2 - 8 * kI, sI, NH); }
    };
    popAt(ctx, 0, 70, t, A.selembar, () => {
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.fillStyle = '#000'; ctx.fillRect(-NW / 2 + sA * (cut > 0), -NH / 2, NW - sA * (cut > 0), NH); ctx.restore();
      drawNote();
      if (cut > 0) { ctx.save(); ctx.translate(-NW / 2 + sA / 2 - 110 * cut, 40 * cut); ctx.rotate(-4 * cut * D2R);
        ctx.drawImage(note, 0, 0, sA, NH, -sA / 2, -NH / 2, sA, NH); ctx.strokeStyle = LIME; ctx.lineWidth = 5; ctx.globalAlpha *= cut; ctx.strokeRect(-sA / 2 - 5, -NH / 2 - 5, sA + 10, NH + 10); ctx.restore(); }
      const km = pop(t, A.indonesia3 + .2, .6, .3);
      if (km > 0) { const lx = 380, ly = -40, r = 170 * Math.min(km, 1.1), fx = NW / 2 - sI / 2 + 7, fy = -40;
        ctx.save(); ctx.beginPath(); ctx.arc(lx, ly, r, 0, 7); ctx.fillStyle = ROOM; ctx.fill(); ctx.clip(); ctx.translate(lx, ly); ctx.scale(10, 10); ctx.translate(-fx, -fy); drawNote(); ctx.restore();
        ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(lx, ly, r, 0, 7); ctx.stroke();
        ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx + r * .72, ly + r * .72); ctx.lineTo(lx + r * 1.15, ly + r * 1.15); ctx.stroke(); ctx.lineCap = 'butt'; }
    }, { from: .8, rise: 80 });
    txt(ctx, 'AMERIKA · 3,45 % PDB (2023)', -840, -350, t, A.amerika3, MN(22), { ls: 3, col: ivo(.8) });
    if (t > A.tiga) { setFont(ctx, DSP(130), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('Rp' + fmt(Math.round(countTo(0, 345, t, A.tiga, 2.0))), -840, -235); }
    txt(ctx, 'INDONESIA · 0,28 % PDB (2020)', 840, -350, t, A.indonesia3, MN(22), { align: 'right', ls: 3, col: ivo(.8) });
    fall(ctx, 'Rp28', 840, -235, t, A.dua2, DSP(130), { align: 'right', ls: 2, col: LIME });
    srcTag(ctx, 'Sumber: World Bank (AS 3,45% 2023, Indonesia 0,28% 2020) · analogi Rp10.000 hitungan sendiri', -840, 440, t, A.amerika3 + .5);
  }

  // ── S12: one player vs a full team + bench ───────────────────────────────────────────────────────────────────
  function drawS12(ctx, t) {
    const kp = kq(t, A.kalau - .2, .7); if (kp <= 0) return; const a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * kp; for (let i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? ivo(.035) : ivo(.06); ctx.fillRect(-700 + i * 140, -340, 140, 680); }
    ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.strokeRect(-700, -340, 1400, 680); ctx.beginPath(); ctx.moveTo(0, -340); ctx.lineTo(0, 340); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 95, 0, 7); ctx.stroke(); ctx.strokeRect(-700, -160, 190, 320); ctx.strokeRect(510, -160, 190, 320); ctx.strokeRect(-700, -70, 70, 140); ctx.strokeRect(630, -70, 70, 140);
    ctx.globalAlpha = a0;
    txt(ctx, 'INDONESIA', -350, -375, t, A.satu2, MN(24), { align: 'center', ls: 5 });
    txt(ctx, 'AMERIKA', 350, -375, t, A.tim, MN(24), { align: 'center', ls: 5 });
    popAt(ctx, -350, 0, t, A.satu2, () => { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 26, 0, 7); ctx.fill(); }, { from: .2 });
    const XI = [[640, 0], [470, -240], [470, -80], [470, 80], [470, 240], [300, -240], [300, -80], [300, 80], [300, 240], [130, -90], [130, 90]];
    XI.forEach(([x, y], i) => popAt(ctx, x, y, t, A.tim - .15 + i * .04, () => { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.fill(); }, { from: .2 }));
    for (let i = 0; i < 5; i++) popAt(ctx, 250 + i * 80, 410, t, A.cadangan + i * .05, () => { ctx.fillStyle = ivo(.7); ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fill(); }, { from: .2 });
    txt(ctx, '+ CADANGAN', 200, 418, t, A.cadangan, MN(20), { align: 'right', ls: 4, col: ivo(.75) });
    txt(ctx, '≈ 12,5×', -350, 120, t, A.melawan, DSP(80), { align: 'center', col: ivo(.85) });
  }

  // ── S14: the calculator ──────────────────────────────────────────────────────────────────────────────────────
  const KEYS = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+'];
  function drawS14(ctx, t) {
    const kp = kq(t, A.sekarang - .2, .6); if (kp <= 0) return; const a0 = ctx.globalAlpha;
    ctx.save(); ctx.translate(0, (1 - kp) * 80); ctx.globalAlpha = a0 * kp;
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = TILE; ctx.beginPath(); ctx.roundRect(-490, -380, 980, 760, 40); ctx.fill(); ctx.restore();
    ctx.globalAlpha = a0 * kp; ctx.strokeStyle = ivo(.18); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-490, -380, 980, 760, 40); ctx.stroke();
    ctx.fillStyle = '#0E0F0B'; ctx.beginPath(); ctx.roundRect(-440, -335, 880, 230, 18); ctx.fill();
    const L1 = '6.140.000.000.000', L2 = '÷ 287.300.000', t1 = A.sekarang + .3, cps1 = 21, n1 = clamp(Math.ceil((t - t1) * cps1), 0, L1.length), n2 = clamp(Math.ceil((t - A.dua3) * 20), 0, L2.length);
    setFont(ctx, MN(18), 4); ctx.fillStyle = ivo(.5); ctx.textAlign = 'left';
    if (n1) ctx.fillText('ANGGARAN BRIN', -410, -282); if (n2) ctx.fillText('PENDUDUK', -410, -222);
    setFont(ctx, MN(40), 1); ctx.textAlign = 'right'; ctx.fillStyle = ivo(.85); if (n1) ctx.fillText(L1.slice(0, n1), 410, -276); if (n2) ctx.fillText(L2.slice(0, n2), 410, -216);
    if (t > A.dua4) { setFont(ctx, DSP(96), 2); ctx.fillStyle = LIME; ctx.fillText('= Rp' + fmt(Math.round(countTo(0, 21371, t, A.dua4, 1.2))), 410, -128); }
    ctx.textAlign = 'left';
    const last = (t < A.dua3 ? L1[n1 - 1] : L2[n2 - 1]) || '', press = { '÷': A.dua3, '=': A.hasilnya };
    KEYS.forEach((k, i) => { const x = -330 + (i % 4) * 220, y = -30 + Math.floor(i / 4) * 105;
      const tp = press[k], hot = (tp && t > tp && t < tp + .18) || (k === last && ((t > t1 && t < t1 + L1.length / cps1 + .1) || (t > A.dua3 && t < A.dua3 + L2.length / 20 + .1)));
      ctx.fillStyle = k === '=' && t > A.hasilnya ? LIME : hot ? ivo(.38) : ivo(.08); ctx.beginPath(); ctx.roundRect(x - 98, y - 46, 196, 92, 18); ctx.fill();
      setFont(ctx, DSP(56)); ctx.textAlign = 'center'; ctx.fillStyle = k === '=' && t > A.hasilnya ? LIME_INK : IVORY; ctx.fillText(k, x, y + 20); ctx.textAlign = 'left'; });
    ctx.globalAlpha = a0;
    slab(ctx, 'PER ORANG', 0, 432, t, A.per, { align: 'center', size: 24 });
    stamp(ctx, 'SETAHUN.', 700, 250, t, A.setahun, { size: 120, rot: -6 });
    srcTag(ctx, 'Hitungan sendiri: Rp6,14 T ÷ 287,3 juta (BRIN; APJII 2026)', -840, 470, t, A.dua4 + .5);
  }

  // ── S15: GII 2026 ladder ─────────────────────────────────────────────────────────────────────────────────────
  function drawS15(ctx, t) {
    evid(ctx, IM.gii, -330, -240, 900, t, A.hasil, { tab: 'WIPO · GII 2026', rot: -1, hl: [[.727, .36, .115, .08, A.seratus]] });
    evid(ctx, IM.press, -360, 175, 740, t, A.wipo2, { tab: 'WIPO · 29 SEP 2026', rot: 1.4, hl: [[.553, .21, .07, .085, A.amerika5]] });
    const LX = 640, ry = r => -360 + (r - 1) / 138 * 720, kl = kq(t, A.indonesia4 - .2, .8); if (kl <= 0) return;
    ctx.fillStyle = ivo(.55); ctx.fillRect(LX - 1.5, -360, 3, 720 * kl);
    for (let r = 10; r <= 130; r += 10) if (ry(r) < -360 + 720 * kl) ctx.fillRect(LX - 8, ry(r) - 1, 16, 2);
    txt(ctx, '#1', LX + 22, -352, t, A.indonesia4, MN(18), { col: ivo(.7) }); txt(ctx, '#139', LX + 22, 368, t, A.indonesia4 + .4, MN(18), { col: ivo(.7) });
    txt(ctx, 'PERINGKAT DUNIA', LX, -400, t, A.indonesia4, MN(20), { align: 'center', ls: 4, col: ivo(.8) });
    const kb = kq(t, A.tiga3, .5);
    if (kb > 0) { ctx.fillStyle = 'rgba(200,245,60,.16)'; ctx.fillRect(LX - 60, ry(55) - 22, 300 * kb, 44); }
    for (let i = 0; i < 3; i++) popAt(ctx, LX + 70 + i * 70, ry(55), t, A.nyangkut + i * .15, () => { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 9, 0, 7); ctx.fill();
      setFont(ctx, MN(16), 1); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.75); ctx.fillText(String(2024 + i), 0, 40); ctx.textAlign = 'left'; }, { from: .2 });
    txt(ctx, '± 55 · 3 TAHUN', LX + 70, ry(55) - 40, t, A.tiga3 + .2, MN(18), { ls: 3, col: LIME });
    popAt(ctx, LX, ry(55), t, A.lima3, () => { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill(); }, { from: .2 });
    slab(ctx, 'INDONESIA · #55', LX - 40, ry(55), t, A.lima3, { align: 'right', size: 22, lime: true });
    popAt(ctx, LX, ry(3), t, A.amerika5, () => { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill(); }, { from: .2 });
    slab(ctx, 'AMERIKA · #3', LX - 40, ry(3) + 20, t, A.amerika5, { align: 'right', size: 22 });
    srcTag(ctx, 'Sumber: WIPO, Global Innovation Index 2026 (29 Sep 2026)', -840, 470, t, A.seratus);
  }

  // ── gates + chapter ──────────────────────────────────────────────────────────────────────────────────────────
  for (const s of ST) {                                    // nothing of a station shows before it is reached (ghost tags aside)
    const at = s.at, wrap = fn => fn && ((ctx, t, c) => { if (s === ST[0]) return fn(ctx, t, c); const g = clamp((t - at + .5) / .35); if (g <= 0) return; ctx.globalAlpha = g; fn(ctx, t, c); });
    s.draw = wrap(s.draw); for (const L of s.layers || []) L.fn = wrap(L.fn);
  }
  const over = (o, t) => ST.forEach((s, i) => { if (!s.over) return; const nx = ST[i + 1]; if (t > s.at - .5 && (!nx || t < nx.at + .3)) { o.save(); s.over(o, t); o.restore(); } });
  let FULLS;                                                 // full-frame tilted articles (kit evidFull)
  return makeChapter({ B, ST, load, label: 'BAB 01 · MESIN IDE', over,
    full: () => FULLS ??= [{ im: IM.cnbc, t0: A.nol - 1.7, t1: A.nol + 2.7, dir: 1, tab: 'CNBC INDONESIA · 26 OKT 2026', hl: [[.042, .255, .425, .10, A.nol]] },
    { im: IM.merdeka, t0: A.duabelas - 2.3, t1: A.duabelas + 1.7, dir: -1, dark: true, tab: 'MERDEKA.COM · 15 JAN 2026', hl: [[.612, .52, .11, .07, A.duabelas - 1.0], [.59, .235, .35, .115, A.duabelas]] }] });
}
