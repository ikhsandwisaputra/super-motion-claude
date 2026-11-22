// Bab Peta (VO 03): siapa yang bilang data habis, buktinya, seberapa cepat, lalu peta 5 bab. Satu baris kedalaman, kamera snap→hold.
// Alat bab: Sumur Huruf (tekstur kata-kata Indonesia di dalam tetes minyak, sumur, dan kolom stok). Lime = satu kata kunci per kalimat.
// Grafik Ahri (biru) dirakit ulang di kode dengan angka yang sama (grafik.json: Llama 3 >15T, Llama 4 >30T, Qwen3 ±36T, stok Epoch ±300T).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, TILE, D2R, ivo, setFont, rnd, mk, DISP, SER, MONO, timing, makeChapter, loadImg, loadVid,
  plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone } from './kit.js';
import { kq, pop, popAt, doc, slot } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const KATA = ('kita makan nasi rumah jalan pagi kabar baik terima kasih sudah belum besok ibu bapak sekolah kerja pasar hujan senja lagu cerita ' +
  'tulis baca resep surat doa janji rindu warung kopi gula garam sambal kampung kota anak cucu nenek kakek sawah laut angin pulang').split(' ');

function letterTex(font, rows, seed, a) {                    // 1024² tile of real Indonesian words (the "Sumur Huruf" texture)
  const [c, g] = mk(1024, 1024); g.fillStyle = ivo(a); setFont(g, font, 1); g.textBaseline = 'alphabetic';
  for (let r = 0; r < rows; r++) { let s = ''; for (let i = 0; i < 40; i++) s += KATA[Math.floor(rnd(seed + r * 41 + i * 3.7) * KATA.length)] + ' ';
    g.fillText(s, -rnd(seed + r) * 260, (r + 1) * 1024 / rows - 8); }
  return c;
}
function tile(ctx, tex, x, y, w, h, scroll = 0) {            // tiles the texture over a rect (caller sets the clip)
  const oy = ((scroll % 1024) + 1024) % 1024;
  for (let yy = y - oy; yy < y + h; yy += 1024) for (let xx = x; xx < x + w; xx += 1024) ctx.drawImage(tex, xx, yy);
}
function dropPath(ctx, r) {                                    // teardrop, body centre at 0,0
  ctx.beginPath(); ctx.moveTo(0, -1.65 * r); ctx.bezierCurveTo(r * .5, -r * .95, r, -r * .5, r, 0); ctx.arc(0, 0, r, 0, Math.PI);
  ctx.bezierCurveTo(-r, -r * .5, -r * .5, -r * .95, 0, -1.65 * r); ctx.closePath();
}

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {}, TX = {};
  async function load() {
    IM.verge = await loadImg('../assets/shared/kutipan/theverge-openai-cofounder-ilya-sutskever-says-the.png', 2248);
    IM.warung = await loadImg('../assets/shared/ahpo/A04/A04-1_warung-tegal_B1-1.png', 1000);
    IM.ketik = await loadVid('../assets/shared/vid/', 'ketik');
    TX.mono = letterTex(`400 19px "${MONO}"`, 36, 3, .5);
    TX.ser = letterTex(`italic 380 30px "${SER}"`, 26, 11, .62);
  }

  // ── S0 · lanyard badge + crowd of badges ────────────────────────────────────────────────────────────────
  function badge(ctx, t) {
    const t0 = A.ilya - .2, k = pop(t, t0, .62, .42); if (k <= 0) return;
    const sw = 4.2 * Math.sin((t - t0) * 2.3) * Math.exp(-(t - t0) * .55);      // the card swings in from the strap and settles
    ctx.save(); ctx.translate(-260, -1150 - (1 - Math.min(k, 1)) * 500); ctx.rotate(sw * D2R);
    ctx.strokeStyle = 'rgba(30,31,26,1)'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(-40, 880); ctx.moveTo(90, 0); ctx.lineTo(40, 880); ctx.stroke();
    ctx.strokeStyle = ivo(.18); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-82, 0); ctx.lineTo(-33, 880); ctx.moveTo(98, 0); ctx.lineTo(47, 880); ctx.stroke();
    ctx.translate(0, 1260); doc(ctx, 0, 0, 560, 780, { r: 22 });
    ctx.fillStyle = '#16170F'; ctx.beginPath(); ctx.roundRect(-280, -390, 560, 150, [22, 22, 0, 0]); ctx.fill();
    ctx.fillStyle = '#E2DFD1'; ctx.beginPath(); ctx.roundRect(-46, -372, 92, 22, 11); ctx.fill();                    // strap slot
    setFont(ctx, MN(22), 6); ctx.fillStyle = ivo(.8); ctx.textAlign = 'center'; ctx.fillText('PEMBICARA', 0, -280); ctx.textAlign = 'left';
    fall(ctx, 'ILYA', -230, -70, t, A.ilya, DSP(150), { col: '#11120E', stag: .04 });
    fall(ctx, 'SUTSKEVER', -230, 70, t, A.sutskever - .05, DSP(150), { col: '#11120E', stag: .03 });
    ctx.fillStyle = 'rgba(11,12,9,.8)'; ctx.fillRect(-230, 112, 460 * kq(t, A.sutskever + .2, .5), 4);
    typeOn(ctx, 'SALAH SATU PENDIRI OPENAI', -230, 170, t, A.sutskever + .3, MN(22), { ls: 2, col: 'rgba(11,12,9,.85)', cps: 40 });
    ctx.fillStyle = 'rgba(11,12,9,.75)'; ctx.beginPath();                        // barcode, one path
    for (let i = 0, x = -230; x < 230; i++) { const w = 3 + Math.floor(rnd(i * 2.3) * 4) * 3; ctx.rect(x, 250, w, 90); x += w + 4 + Math.floor(rnd(i + 9) * 3) * 4; }
    ctx.fill(); ctx.restore();
  }
  const crowd = Array.from({ length: 8 }, (_, i) => ({ dz: 300 + rnd(i + 3) * 1100, dx: (i % 2 ? 1 : -1) * (420 + rnd(i + 17) * 700) + 380, dy: 40 + rnd(i + 5) * 140, ry: (rnd(i) - .5) * 30,
    fn: (ctx, t) => { const t0 = A.kumpul + i * .07; popAt(ctx, 0, 0, t, t0, () => { ctx.globalAlpha *= .9;
      ctx.strokeStyle = 'rgba(40,41,35,1)'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-50, -900); ctx.lineTo(-20, -190); ctx.moveTo(50, -900); ctx.lineTo(20, -190); ctx.stroke();
      doc(ctx, 0, 0, 260, 360, { r: 14, c0: '#8E8F86', c1: '#5E5F57', blur: 30 }); ctx.fillStyle = '#26271F'; ctx.fillRect(-130, -180, 260, 64);
      ctx.fillStyle = 'rgba(11,12,9,.55)'; ctx.fillRect(-100, -70, 170 + rnd(i) * 30, 26); ctx.fillRect(-100, -30, 120, 26); ctx.fillRect(-100, 90, 200, 50); }, { from: .5, rise: -120 }); } }));

  // ── S1 · the hall: stage screen + rows of heads in the foreground ───────────────────────────────────────
  function heads(seed, n, sp, y, a) {
    return (ctx, t) => { ctx.fillStyle = '#060705'; ctx.strokeStyle = ivo(a); ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 0; i < n; i++) { const x = (i - (n - 1) / 2) * sp + (rnd(seed + i) - .5) * 50, r = 52 + rnd(seed + i * 3) * 12, yy = y + rnd(seed + i * 7) * 30;
        ctx.moveTo(x + r, yy); ctx.arc(x, yy, r, 0, 7); ctx.moveTo(x + 120, yy + 170); ctx.ellipse(x, yy + 170, 120, 95, 0, 0, 7); }
      ctx.fill(); ctx.stroke(); };
  }
  function hall(ctx, t) {
    const k = kq(t, A.neurips - .3, .6); if (k <= 0) return;
    const g = ctx.createRadialGradient(0, -120, 80, 0, -120, 1100); g.addColorStop(0, ivo(.16 * k)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(-1400, -900, 2800, 1500);
    ctx.fillStyle = '#0E0F0B'; ctx.fillRect(-720, -470, 1440, 640); ctx.strokeStyle = ivo(.35 * k); ctx.lineWidth = 4; ctx.strokeRect(-720, -470, 1440, 640);
    fall(ctx, 'NeurIPS', 0, -60, t, A.neurips - .05, DSP(300), { align: 'center', ls: 4, stag: .035 });
    typeOn(ctx, 'VANCOUVER · DESEMBER 2024', 0, 60, t, A.desember - .05, MN(34), { align: 'center', ls: 6, cps: 50, col: ivo(.85) });
    txt(ctx, 'KONFERENSI ILMUWAN AI DUNIA', -690, -420, t, A.neurips + .3, MN(20), { col: ivo(.55), rise: 0 });
  }

  // ── S2 · minyak bumi: a drop full of words falls and splashes ───────────────────────────────────────────
  function oil(ctx, t) {
    const t0 = A.tulisan - .08, land = t0 + .5, s = t - t0; if (s <= 0) return;
    const y = s < .5 ? lerp(-1300, -90, E.inCubic(s / .5)) : -90, sq = s < .5 ? 1 : 1 - .12 * Math.exp(-(s - .5) * 7) * Math.cos((s - .5) * 24), r = 250;
    const pk = kq(t, land, 1.2);                                                       // the pool spreads on landing
    if (pk > 0) { ctx.fillStyle = 'rgba(4,5,3,.9)'; ctx.beginPath(); ctx.ellipse(0, 175, 260 + 380 * pk, 34 + 40 * pk, 0, 0, 7); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.ellipse(0, 175, 260 + 380 * pk, 34 + 40 * pk, 0, 0, 7); ctx.clip(); ctx.globalAlpha *= .5; tile(ctx, TX.mono, -700, 120, 1400, 120, t * 8); ctx.restore();
      for (let j = 0; j < 2; j++) { const rk = kq(t, land + j * .15, 1.0); if (rk <= 0 || rk >= 1) continue;
        ctx.strokeStyle = ivo(.5 * (1 - rk)); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 175, 200 + 700 * rk, 30 + 90 * rk, 0, 0, 7); ctx.stroke(); }
      setFont(ctx, SRF(30), 0); ctx.fillStyle = ivo(.7);                               // words thrown out of the splash
      for (let j = 0; j < 9; j++) { const u = t - land; if (u <= 0 || u > 1.1) break; const ang = -Math.PI * (.12 + .76 * rnd(j + 2)), v = 900 + 500 * rnd(j + 6);
        ctx.globalAlpha = clamp(1 - u / 1.1) * .8; ctx.fillText(KATA[j * 4 % KATA.length], Math.cos(ang) * v * u - 30, 150 + Math.sin(ang) * v * u + 1400 * u * u); }
      ctx.globalAlpha = 1; }
    ctx.save(); ctx.translate(0, y); ctx.scale(1 / sq, sq); dropPath(ctx, r); ctx.save(); ctx.clip();
    ctx.fillStyle = '#0A0B08'; ctx.fillRect(-r, -2 * r, 2 * r, 3 * r); tile(ctx, TX.ser, -r, -2 * r, 2 * r, 3 * r, t * 40);
    const g = ctx.createRadialGradient(-r * .35, -r * .45, 10, 0, 0, r * 1.5); g.addColorStop(0, 'rgba(255,255,255,.22)'); g.addColorStop(.35, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.75)');
    ctx.fillStyle = g; ctx.fillRect(-r, -2 * r, 2 * r, 3 * r); ctx.restore();
    ctx.strokeStyle = ivo(.75); ctx.lineWidth = 3; dropPath(ctx, r); ctx.stroke(); ctx.restore();
    txt(ctx, 'TULISAN MANUSIA', -700, -300, t, A.tulisan + .1, MN(24), { ls: 6, col: ivo(.7) });
    ctx.strokeStyle = ivo(.4); ctx.lineWidth = 2; const lk = kq(t, A.tulisan + .3, .5); if (lk > 0) { ctx.beginPath(); ctx.moveTo(-460, -310); ctx.lineTo(lerp(-460, -230, lk), lerp(-310, -180, lk)); ctx.stroke(); }
    markLine(ctx, 'tulisan manusia = ', 'minyak bumi', '-nya AI', 0, 400, t, A.kayak - .25, A.minyak, SRF(70));
  }

  // ── S3 · the evidence: The Verge headline + the quote, typed ────────────────────────────────────────────
  function verge(ctx, t) {
    evid(ctx, IM.verge, 0, -250, 1320, t, A.cadangan - .28, { crop: [.105, .09, .725, .34], dark: true, tab: 'theverge.com', rot: -1.2 });
    typeOn(ctx, '“We’ve achieved peak data and there’ll be no more.” — Ilya Sutskever', 0, 0, t, A.cadangan + .2, MN(23, 400), { align: 'center', cps: 70, col: ivo(.62) });
    markLine(ctx, '“Kita sudah mencapai ', 'puncak data', ',', 0, 150, t, A.cadangan + .55, A.mentok, SRF(76));
    txt(ctx, 'dan tidak akan ada lagi.”', 0, 250, t, A.mentok + .35, SRF(60), { align: 'center', col: ivo(.82) });
    srcTag(ctx, 'Sumber: The Verge, 14 Des 2024', -840, 440, t, A.cadangan);
  }

  // ── S4 · Sumur Huruf: one well (the internet), its level of words sinking ──────────────────────────────
  function well(ctx, t) {
    const RX = 360, RY = 82, Y0 = -170, L = lerp(-80, 300, E.inOutCubic(inv(A.sumur - .1, A.satu + .4, t)));
    ctx.fillStyle = '#050604'; ctx.beginPath(); ctx.ellipse(0, Y0, RX, RY, 0, Math.PI, 0); ctx.lineTo(RX, 620); ctx.lineTo(-RX, 620); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.rect(-RX, L, 2 * RX, 700); ctx.ellipse(0, L, RX, RY * .9, 0, 0, 7); ctx.clip();
    tile(ctx, TX.mono, -RX, L - 100, 2 * RX, 800, -t * 6); const g = ctx.createLinearGradient(0, L - 80, 0, 620); g.addColorStop(0, 'rgba(5,6,4,.1)'); g.addColorStop(1, 'rgba(5,6,4,.95)');
    ctx.fillStyle = g; ctx.fillRect(-RX, L - 100, 2 * RX, 800); ctx.restore();
    ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, L, RX, RY * .9, 0, 0, 7); ctx.stroke();       // the level
    const wg = ctx.createLinearGradient(-RX, 0, RX, 0); wg.addColorStop(0, ivo(.22)); wg.addColorStop(.2, ivo(.02)); wg.addColorStop(.8, ivo(.02)); wg.addColorStop(1, ivo(.18));
    ctx.fillStyle = wg; ctx.fillRect(-RX, Y0, 2 * RX, 700);
    ctx.fillStyle = TILE; ctx.beginPath(); ctx.ellipse(0, Y0, RX + 70, RY + 22, 0, 0, 7); ctx.ellipse(0, Y0, RX, RY, 0, 0, 7, true); ctx.fill('evenodd');
    ctx.strokeStyle = ivo(.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(0, Y0, RX, RY, 0, 0, 7); ctx.stroke();
    ctx.strokeStyle = ivo(.3); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, Y0, RX + 70, RY + 22, 0, 0, 7); ctx.stroke();
    ctx.fillStyle = ivo(.6); ctx.fillRect(-4, -620, 8, L + 620 - 10 + 0 * t);                                                   // the pipe that keeps pumping
    txt(ctx, 'SUMUR = INTERNET', 0, Y0 - 150, t, A.nggak + .05, MN(26), { align: 'center', ls: 6, col: ivo(.7) });
    slab(ctx, 'SUMUR BARU: 0', -840, -300, t, A.baru - .05, { size: 28 });
    fall(ctx, '1', 640, 190, t, A.satu - .06, DSP(420), { align: 'center', col: LIME });
    txt(ctx, 'INTERNET', 640, 270, t, A.internet - .1, MN(26), { align: 'center', ls: 8, col: ivo(.75) });
  }

  // ── S5 · the chart, rebuilt: three model bars vs the stock column of words ─────────────────────────────
  const BY = 330, SC = 2.3, BARS = [['LLAMA 3 · 2024', 15, '15+'], ['LLAMA 4 · 2025', 30, '30+'], ['QWEN3 · 2025', 36, '±36']];
  function chart(ctx, t) {
    typeOn(ctx, 'DATA LATIH SATU MODEL AI  vs  STOK TULISAN MANUSIA DI INTERNET', -820, -420, t, A.grafik + .15, MN(22), { ls: 2, cps: 70 });
    txt(ctx, 'dalam triliun token', -820, -380, t, A.grafik + .6, SRF(30), { col: ivo(.6), rise: 0 });
    ctx.strokeStyle = ivo(.12); ctx.lineWidth = 2; ctx.setLineDash([6, 10]); ctx.beginPath();
    for (const v of [100, 200, 300]) { ctx.moveTo(-760, BY - v * SC); ctx.lineTo(820, BY - v * SC); } ctx.stroke(); ctx.setLineDash([]);
    setFont(ctx, MN(18, 400), 1); ctx.fillStyle = ivo(.45); ctx.textAlign = 'right'; for (const v of [0, 100, 200, 300]) ctx.fillText(String(v), -780, BY - v * SC + 6); ctx.textAlign = 'left';
    ctx.fillStyle = ivo(.4); ctx.fillRect(-760, BY, 1580, 3);
    const sv = countTo(0, 300, t, A.grafik + .25, 1.3), sh = sv * SC, X0 = 330, X1 = 630, dim = 1 - .55 * kq(t, A.sepersepuluh, .4);
    if (sv > .5) { ctx.save(); ctx.beginPath(); ctx.rect(X0, BY - sh, X1 - X0, sh); ctx.clip(); ctx.fillStyle = '#0E0F0B'; ctx.fillRect(X0, BY - sh, X1 - X0, sh);
      ctx.globalAlpha *= dim; tile(ctx, TX.mono, X0, BY - 700, X1 - X0, 700, t * 10); ctx.restore(); ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.strokeRect(X0, BY - sh, X1 - X0, sh);
      slot(ctx, sv, (X0 + X1) / 2, BY - sh - 24, DSP(96), { align: 'center' }); }
    txt(ctx, 'STOK TULISAN MANUSIA', (X0 + X1) / 2, BY + 44, t, A.grafik + .5, MN(18), { align: 'center', ls: 2, rise: 0 });
    txt(ctx, '(EPOCH AI)', (X0 + X1) / 2, BY + 72, t, A.grafik + .6, MN(18, 400), { align: 'center', ls: 2, col: ivo(.55), rise: 0 });
    BARS.forEach(([lab, v, s], i) => { const x = -640 + i * 260, k = pop(t, A.model + i * .26, .5, .3); if (k <= 0) return; const h = v * SC * k;
      ctx.fillStyle = ivo(.86); ctx.fillRect(x - 75, BY - h, 150, h);
      txt(ctx, s, x, BY - h - 22, t, A.model + i * .26 + .1, DSP(64), { align: 'center', rise: 0 });
      txt(ctx, lab, x, BY + 44, t, A.model + i * .26, MN(18), { align: 'center', ls: 1, col: ivo(.75), rise: 0 }); });
    const lk = kq(t, A.sepersepuluh - .02, .45);                                       // the slice: one model = the bottom tenth of the stock
    if (lk > 0) { const h = 36 * SC; ctx.fillStyle = LIME; ctx.fillRect(X0, BY - h * lk, X1 - X0, h * lk);
      ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(-120 + 75, BY - h); ctx.lineTo(lerp(-45, X0, lk), BY - h); ctx.stroke(); ctx.setLineDash([]);
      fall(ctx, '±1/10', (X0 + X1) / 2, BY - h - 60, t, A.sepersepuluh + .1, DSP(120), { align: 'center' }); }
    srcTag(ctx, 'Sumber: Epoch AI 2024; Meta; Qwen 2025', -840, 470, t, A.grafik + .4);
  }

  // ── S6 · the map: five chapter tiles in one row; the camera visits each, chapter 4 is the biggest ───────
  const IX = [-1560, -780, 0, 900, 1820], SZ = [1, 1, 1, 1.4, 1];
  const TIT = ['BENERAN HABIS?', 'INTERNET DIPAGARI', 'TIGA JALAN KELUAR', 'AI BELAJAR DARI AI', 'ARTINYA BUAT INDONESIA'];
  const VIS = () => [A.pertama, A.kedua, A.ketiga, A.keempat, A.terakhir];
  function icon(ctx, i, t, col) {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (i === 0) {                                                                        // fuel gauge, needle drops to E
      ctx.beginPath(); ctx.arc(0, 40, 120, Math.PI, 0); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath();
      for (let j = 0; j <= 6; j++) { const a = Math.PI + j * Math.PI / 6; ctx.moveTo(Math.cos(a) * 96, 40 + Math.sin(a) * 96); ctx.lineTo(Math.cos(a) * 118, 40 + Math.sin(a) * 118); } ctx.stroke();
      setFont(ctx, MN(26), 0); ctx.textAlign = 'center'; ctx.fillText('E', -100, 90); ctx.fillText('F', 100, 90); ctx.textAlign = 'left';
      const a = lerp(Math.PI * 1.82, Math.PI * 1.06, E.outBack ? E.outBack(inv(A.habis, A.habis + .7, t)) : kq(t, A.habis, .7));
      ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(Math.cos(a) * 100, 40 + Math.sin(a) * 100); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 40, 14, 0, 7); ctx.fill();
    } else if (i === 1) {                                                                 // fence + padlock dropping in
      ctx.lineWidth = 6; ctx.beginPath(); for (let j = 0; j < 6; j++) { const x = -125 + j * 50; ctx.moveTo(x, 120); ctx.lineTo(x, -80); ctx.lineTo(x + 10, -100); }
      ctx.moveTo(-140, -40); ctx.lineTo(140, -40); ctx.moveTo(-140, 70); ctx.lineTo(140, 70); ctx.stroke();
      const k = pop(t, A.dipagerin - .1, .5, .3), y = lerp(-260, 10, Math.min(1.15, k)); ctx.save(); ctx.globalAlpha *= clamp(k * 3);
      ctx.fillStyle = TILE; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, y - 30, 34, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-55, y - 30, 110, 86, 10); ctx.fill(); ctx.stroke();
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, y + 8, 9, 0, 7); ctx.fill(); ctx.fillRect(-3, y + 8, 6, 24); ctx.restore();
    } else if (i === 2) {                                                                 // one stem, three ways out
      const k = kq(t, A.jalan - .1, .6); ctx.beginPath(); ctx.moveTo(0, 130); ctx.lineTo(0, 20);
      for (const [x, y] of [[-110, -100], [0, -120], [110, -100]]) { const ex = lerp(0, x, k), ey = lerp(20, y, k); ctx.moveTo(0, 20); ctx.lineTo(ex, ey);
        if (k > .9) { const an = Math.atan2(ey - 20, ex), L = 28; ctx.moveTo(ex, ey); ctx.lineTo(ex - L * Math.cos(an - .5), ey - L * Math.sin(an - .5)); ctx.moveTo(ex, ey); ctx.lineTo(ex - L * Math.cos(an + .5), ey - L * Math.sin(an + .5)); } }
      ctx.stroke();
    } else if (i === 3) {                                                                 // copy of a copy of a copy: pages fade (Salinan Pudar teaser)
      const k = kq(t, A.aidariai - .15, 1.2);
      for (let g = 2; g >= 0; g--) { const o = g * 34 * (.4 + .6 * k), a = g === 0 ? 1 : (g === 1 ? .55 : .25) * (.4 + .6 * k);
        ctx.save(); ctx.globalAlpha *= a; ctx.translate(-34 + o, -24 + o); ctx.fillStyle = TILE; ctx.beginPath(); ctx.roundRect(-70, -90, 140, 180, 10); ctx.fill(); ctx.stroke();
        ctx.lineWidth = 5; ctx.beginPath(); for (let l = 0; l < 4; l++) { ctx.moveTo(-42, -50 + l * 32); ctx.lineTo(l === 3 ? 10 : 42, -50 + l * 32); } ctx.stroke(); ctx.lineWidth = 7; ctx.restore(); }
      ctx.beginPath(); ctx.arc(0, 0, 150, -.9, .55); ctx.stroke(); ctx.beginPath(); ctx.moveTo(150 * Math.cos(.55) - 26, 150 * Math.sin(.55) - 4); ctx.lineTo(150 * Math.cos(.55), 150 * Math.sin(.55)); ctx.lineTo(150 * Math.cos(.55) + 6, 150 * Math.sin(.55) - 28); ctx.stroke();
    } else {                                                                              // a pin over the archipelago
      ctx.beginPath(); for (const [x, y, rx, ry, r] of [[-120, 80, 44, 13, .5], [-40, 105, 50, 9, .05], [-15, 55, 34, 26, 0], [55, 70, 16, 24, .3], [125, 85, 40, 18, 0]]) { ctx.moveTo(x + rx, y); ctx.ellipse(x, y, rx, ry, r, 0, 7); }
      ctx.fill(); const k = pop(t, A.indonesia - .15, .5, .3), y = lerp(-220, -40, Math.min(1.1, k)); ctx.save(); ctx.globalAlpha *= clamp(k * 3); ctx.translate(15, y);
      ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-20, 20, -50, 0, -50, -30); ctx.arc(0, -30, 50, Math.PI, 0); ctx.bezierCurveTo(50, 0, 20, 20, 0, 60); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, -30, 16, 0, 7); ctx.fill(); ctx.restore();
    }
    ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
  }
  function mapTile(i) {
    return (ctx, t) => {
      const V = VIS(), t0 = A.lima + i * .11, k = pop(t, t0, .55, .32); if (k <= 0) return;
      let cur = -1; for (let j = 0; j < 5; j++) if (t >= V[j] - .2) cur = j;
      const on = cur < 0 ? .85 : cur === i ? 1 : .32, lime = i === 3 && t >= V[3] - .2, s = SZ[i];
      ctx.save(); ctx.scale(s * Math.min(1, .6 + .4 * k), s * Math.min(1, .6 + .4 * k)); ctx.globalAlpha *= clamp((t - t0) / .12) * on;
      ctx.fillStyle = TILE; ctx.beginPath(); ctx.roundRect(-190, -190, 380, 380, 26); ctx.fill();
      ctx.strokeStyle = lime ? LIME : ivo(cur === i ? .5 : .16); ctx.lineWidth = lime ? 6 : 3; ctx.stroke();
      setFont(ctx, MN(22), 3); ctx.fillStyle = ivo(.6); ctx.fillText('0' + (i + 1), -160, -150);
      icon(ctx, i, t, lime ? LIME : IVORY);
      setFont(ctx, DSP(i === 3 ? 66 : 62), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(TIT[i], 0, 280); ctx.textAlign = 'left'; ctx.restore();
      if (i === 3) slab(ctx, 'BAGIAN PALING PENTING', 0, -330, t, A.penting - .05, { size: 28, align: 'center' });
    };
  }
  function mapCam(t) {
    const s = ST[6], V = VIS(), P = [[IX[0], 1500], [IX[1], 1500], [IX[2], 1500], [IX[3], 1850], [IX[4], 1500]];
    let tx = 130, d = 3520 - 220 * E.inOutCubic(inv(A.divideo, A.pertama, t));
    for (let j = 0; j < 5; j++) { const k = E.snap(inv(V[j] - .38, V[j] + .32, t)); if (k <= 0) break; tx = lerp(tx, P[j][0], k); d = lerp(d, P[j][1], k); }
    const drift = t - Math.max(...V.filter(v => v - .38 <= t), A.divideo);
    return { yaw: 2.5 * Math.sin(t * .5), dist: d - 90 * clamp(drift / 2.5), tx: s.x + tx, ty: s.py - 20 + 40, tz: s.z, pitch: 6 };
  }

  // ── S7 · the B-roll: hands typing + this morning's upload ───────────────────────────────────────────────
  function morning(ctx, t) {
    const s0 = A.termasuk - .1;
    plate(ctx, IM.ketik, t, -300, 0, 1280, 720, kq(t, s0, .5), { t0: s0, dim: .1 });
    txt(ctx, 'TADI PAGI · 07.14', -940, 430, t, A.pagi - .2, MN(24), { ls: 4, col: ivo(.8), rise: 0 });
    popAt(ctx, 560, 20, t, A.status - .25, () => {
      ctx.rotate(2 * D2R); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.fillStyle = '#15160F';
      ctx.beginPath(); ctx.roundRect(-290, -340, 580, 680, 26); ctx.fill(); ctx.restore(); ctx.strokeStyle = ivo(.14); ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = ivo(.28); ctx.beginPath(); ctx.arc(-230, -280, 26, 0, 7); ctx.fill();
      setFont(ctx, MN(22), 1); ctx.fillStyle = IVORY; ctx.fillText('kamu', -190, -272); ctx.fillStyle = ivo(.5); setFont(ctx, MN(20, 400), 1); ctx.fillText('· baru saja', -120, -272);
      const fk = kq(t, A.foto - .1, .45);
      if (fk > 0) { ctx.save(); ctx.beginPath(); ctx.roundRect(-260, -220, 520, 330, 14); ctx.clip(); const im = IM.warung, sc = Math.max(520 / im.width, 330 / im.height) * (1.12 - .06 * fk);
        ctx.globalAlpha *= fk; ctx.filter = 'saturate(.55) contrast(1.08)'; ctx.drawImage(im, -im.width * sc / 2, -55 - im.height * sc / 2 + (1 - fk) * 40, im.width * sc, im.height * sc); ctx.filter = 'none'; ctx.restore(); }
      else { ctx.fillStyle = ivo(.06); ctx.beginPath(); ctx.roundRect(-260, -220, 520, 330, 14); ctx.fill(); }
      txt(ctx, 'Sarapan dulu sebelum kerja.', -260, 170, t, A.status, SRF(34), { rise: 10 });
      const uk = kq(t, A.upload - .05, .55), pc = Math.round(100 * uk);
      ctx.fillStyle = ivo(.14); ctx.fillRect(-260, 232, 520, 10); ctx.fillStyle = LIME; ctx.fillRect(-260, 232, 520 * uk, 10);
      setFont(ctx, MN(20), 2); ctx.fillStyle = ivo(.75); ctx.fillText(uk <= 0 ? 'SIAP DIUNGGAH' : uk < 1 ? `MENGUNGGAH… ${pc}%` : 'TERUNGGAH · 07.14', -260, 290);
    }, { from: .7, rise: 60 });
  }

  const ST = [
    { at: 0, name: 'Sutskever', draw: badge, layers: crowd, yaw: [4, -1.5], dist: [1560, 1400] },
    { at: A.neurips, via: 'push', name: 'NeurIPS', draw: hall, dist: [1650, 1480],
      layers: [{ dz: -520, dy: 170, fn: heads(5, 9, 250, 60, .1) }, { dz: -900, dy: 200, fn: heads(9, 7, 300, 40, .14) }] },
    { at: A.dia, via: 'whip', name: 'Minyak bumi', draw: oil, dist: [1560, 1440], py: -540 },
    { at: A.cadangan - .1, via: 'rise', name: 'The Verge', draw: verge, dist: [1500, 1420] },
    { at: A.nggak, via: 'push', name: 'Sumur', draw: well, dist: [1560, 1420] },
    { at: A.grafik, via: 'cut', name: 'Grafik 1/10', draw: chart, dist: [1560, 1470],
      mod(p, t) { const k = E.inOutCubic(inv(A.sepersepuluh - .25, A.sepersepuluh + .9, t)); p.dist -= 90 * k; p.tx += 20 * k; p.ty += 10 * k; p.foc = p.dist; } },
    { at: A.divideo, via: 'whip', name: 'Peta 5 bab', cam: mapCam, layers: IX.map((x, i) => ({ dz: 0, dx: x, fn: mapTile(i) })) },
    { at: A.termasuk, via: 'cut', name: 'Upload tadi pagi', draw: morning, dist: [1560, 1420] },
  ];
  return makeChapter({ B, ST, load, label: 'PETA · LIMA PERTANYAAN' });
}
