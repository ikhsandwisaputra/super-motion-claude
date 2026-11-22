// Bab 1 (VO 04): Benarkah habis? Server → Mata Mesin (token, tes yang disetujui, jendela K = 1) → pretraining (kata dilahap ke celah
// model) → Epoch 300 T (halaman penuh + angka bertekstur huruf) → arXiv → 300 kotak stok dimakan 15/30/36 → linimasa 2026–2032, KITA DI
// SINI → habis ≠ lenyap → jatah mentok di stok → rak kitab khatam → Dwarkesh → pagar. Lime = satu kata kunci per kalimat.
// Angka sama dengan bab-peta (grafik.json Ahri): Llama 3 >15T, Llama 4 >30T, Qwen3 ±36T, stok Epoch ±300T (2026–2032).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, TILE, D2R, ivo, setFont, rnd, mk, DISP, SER, MONO, timing, makeChapter, loadImg, loadVid,
  plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, fmt, gone } from './kit.js';
import { kq, pop, popAt, doc, stamp, slot } from './draw.js';
import { makeMata } from './mata.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const KATA = ('kita makan nasi rumah jalan pagi kabar baik terima kasih sudah belum besok ibu bapak sekolah kerja pasar hujan senja lagu cerita ' +
  'tulis baca resep surat doa janji rindu warung kopi gula garam sambal kampung kota anak cucu nenek kakek sawah laut angin pulang').split(' ');
const KITAB = ['Safinah', 'Jurumiyah', 'Taqrib', 'Imrithi', 'Alfiyah', 'Aqidatul Awam', 'Sullam Taufiq', 'Arbain Nawawi', 'Fathul Qarib',
  'Bulughul Maram', 'Tafsir Jalalain', 'Riyadhus Shalihin', 'Ta\'limul Muta\'allim', 'Amtsilah Tashrifiyah'];

function letterTex(font, rows, seed, a) {                    // 1024² tile of real Indonesian words (Sumur Huruf texture, as in bab-peta)
  const [c, g] = mk(1024, 1024); g.fillStyle = ivo(a); setFont(g, font, 1); g.textBaseline = 'alphabetic';
  for (let r = 0; r < rows; r++) { let s = ''; for (let i = 0; i < 40; i++) s += KATA[Math.floor(rnd(seed + r * 41 + i * 3.7) * KATA.length)] + ' ';
    g.fillText(s, -rnd(seed + r) * 260, (r + 1) * 1024 / rows - 8); }
  return c;
}
function tile(ctx, tex, x, y, w, h, scroll = 0) {
  const oy = ((scroll % 1024) + 1024) % 1024;
  for (let yy = y - oy; yy < y + h; yy += 1024) for (let xx = x; xx < x + w; xx += 1024) ctx.drawImage(tex, xx, yy);
}

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {}, TX = {};
  const MATA0 = A.kenalan - .12, MATA1 = A.tahap - .05, inMata = t => t >= MATA0 && t < MATA1;
  const mata = makeMata(A, MATA1);
  let TT, tt;                                                 // scratch for the letter-filled numeral
  async function load() {
    IM.epoch = await loadImg('../assets/shared/kutipan/epoch-will-we-run-out-of-data-limits-of-llm.png', 2248);
    IM.arxiv = await loadImg('../assets/shared/kutipan/arxiv-computer-science-machine-learning.png', 2248);
    IM.dwark = await loadImg('../assets/shared/kutipan/dwarkesh-dwarkesh-podcast.png', 2248);
    for (const n of ['server3', 'tenang', 'map_dok', 'gerbang']) IM[n] = await loadVid('../assets/shared/vid/', n);
    TX.mono = letterTex(`400 19px "${MONO}"`, 36, 3, .5);
    TX.ser = letterTex(`italic 380 30px "${SER}"`, 26, 11, .7);
    [TT, tt] = mk(1400, 620);
    await mata.load();
  }

  // ── S0 · internet kan luas: the server room opens wide, then the doubt ─────────────────────────────────────
  function opener(ctx, t) {
    const g = lerp(.72, 1, E.inOutCubic(inv(A.luas - .2, A.luas + .9, t)));
    plate(ctx, IM.server3, t, 0, -30, 1720 * g, 900 * g, kq(t, .05, .7), { t0: 0, dim: .3 + .25 * kq(t, A.masa - .2, .6) });
    txt(ctx, 'BAB 1 — BENARKAH HABIS?', -820, -420, t, .25, MN(26), { ls: 8, col: ivo(.75) });
    fall(ctx, 'INTERNET', 0, -10, t, A.internet - .06, DSP(250), { align: 'center', ls: 6, stag: .035 });
    txt(ctx, 'luas banget, ya', 0, 90, t, A.luas - .05, SRF(54), { align: 'center', col: ivo(.85) });
    markLine(ctx, 'masa sih bisa ', 'habis', '?', 0, 330, t, A.masa - .1, A.habis0, SRF(88));
  }

  // ── S1 · Mata Mesin (screen space, own camera) overlay: the unit's name before the scan starts ───────────
  function over(o, t) {
    if (!inMata(t)) return;
    const a = E.outCubic(inv(A.satuannya - .15, A.satuannya + .2, t)) * (1 - inv(A.token + .15, A.token + .55, t)); if (a <= 0) return;
    const g = o.createLinearGradient(0, 0, 900, 0); g.addColorStop(0, `rgba(11,12,9,${.8 * a})`); g.addColorStop(1, 'rgba(11,12,9,0)');
    o.fillStyle = g; o.fillRect(0, 0, 900, H); o.globalAlpha = a;
    typeOn(o, 'SATUANNYA:', 110, 430, t, A.satuannya - .05, MN(30), { ls: 6, cps: 40, col: ivo(.85) });
    fall(o, 'TOKEN', 100, 650, t, A.token0 - .04, DSP(280), { col: LIME, ls: 6 });
    o.globalAlpha = 1;
  }

  // ── S2 · pretraining: library footage + the greedy stage named ───────────────────────────────────────────
  function pretrain(ctx, t) {
    plate(ctx, IM.tenang, t, -380, 0, 1080, 680, kq(t, A.tahap - .05, .6), { t0: A.tahap, dim: .15 });
    typeOn(ctx, 'TAHAP 1', 260, -300, t, A.tahap + .1, MN(26), { ls: 10, cps: 30, col: ivo(.75) });
    fall(ctx, 'RAKUS', 250, -70, t, A.rakus - .05, DSP(230), { ls: 4 });
    txt(ctx, 'namanya', 262, 30, t, A.pretraining - .45, SRF(44), { col: ivo(.75) });
    fall(ctx, 'PRETRAINING', 255, 170, t, A.pretraining - .04, DSP(128), { ls: 3, stag: .025 });
    txt(ctx, '= BELAJAR AWAL DARI BACAAN RAKSASA', 262, 240, t, A.pretraining + .5, MN(19), { ls: 2, col: ivo(.7) });
  }

  // ── S3 · ibarat sekolah: a river of words is swallowed by the model's slot, faster on "semua" ────────────
  const SP = (() => { const r = []; let s = 0; for (let i = 0; i < 90; i++) { r.push(s); s += i < 14 ? .17 : .045; } return r; })();
  function school(ctx, t) {
    const t0 = A.ibarat - .1, SX = 40;
    typeOn(ctx, 'IBARAT SEKOLAH:', -820, -400, t, A.sekolah - .2, MN(26), { ls: 6, cps: 40, col: ivo(.8) });
    markLine(ctx, 'semua ', 'dilahap', ',', -280, -260, t, A.semua - .1, A.dilahap, SRF(78));
    let eaten = 0, pulse = 0;
    for (let i = 0; i < SP.length; i++) {
      const s = t - t0 - (i < 14 ? SP[i] : SP[i] + (A.semua - .3 - t0 - SP[14])); if (s <= 0) continue;
      const v = 950 + 500 * rnd(i + 3), x = -1100 + v * s, y = (rnd(i + 11) - .5) * 300;
      if (x > SX) { eaten++; pulse = Math.max(pulse, 1 - (x - SX) / 260); continue; }
      const sq = clamp((SX - x) / 120), a = clamp(s / .15) * (.45 + .45 * rnd(i + 7));
      ctx.save(); ctx.translate(x, y * (.3 + .7 * sq)); ctx.scale(1, .2 + .8 * sq); ctx.globalAlpha = a;
      setFont(ctx, i % 3 ? SRF(36 + 14 * rnd(i)) : MN(24), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText(KATA[i * 7 % KATA.length], 0, 10); ctx.restore();
    }
    ctx.textAlign = 'left';
    const gl = ctx.createRadialGradient(SX, 0, 10, SX, 0, 320); gl.addColorStop(0, ivo(.16 * clamp(pulse))); gl.addColorStop(1, ivo(0));
    ctx.fillStyle = gl; ctx.fillRect(SX - 320, -320, 640, 640);
    ctx.fillStyle = '#050604'; ctx.fillRect(SX - 24, -190, 48, 380); ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.strokeRect(SX - 24, -190, 48, 380);
    txt(ctx, 'MODEL AI', SX, 250, t, A.ibarat, MN(22), { align: 'center', ls: 4, col: ivo(.7), rise: 0 });
    txt(ctx, 'KATA DILAHAP', 340, -70, t, A.sekolah, MN(22), { ls: 4, col: ivo(.7), rise: 0 });
    if (t > A.sekolah) slot(ctx, eaten, 336, 90, DSP(170));
    slab(ctx, 'PAHAM? NANTI DULU.', 340, 300, t, A.paham - .08, { size: 30 });
  }

  // ── S4 · Epoch's count: question → full page (evidFull) → the 300 cast in words ──────────────────────────
  function letterNum(ctx, str, x, y, size, t, t0) {
    const s = t - t0; if (s <= 0) return; const k = E.outQuint(clamp(s / .28)), sc = lerp(1.5, 1, k);
    tt.setTransform(1, 0, 0, 1, 0, 0); tt.globalCompositeOperation = 'copy'; tt.fillStyle = '#0E0F0B'; tt.fillRect(0, 0, 1400, 620);
    tt.globalCompositeOperation = 'source-over'; tt.globalAlpha = 1; tile(tt, TX.ser, 0, 0, 1400, 620, t * 26); tile(tt, TX.mono, 0, 0, 1400, 620, -t * 12);
    tt.globalCompositeOperation = 'destination-in'; setFont(tt, DSP(size), 6); tt.textAlign = 'center'; tt.fillText(str, 700, 310 + size * .36);
    tt.globalCompositeOperation = 'source-over';
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(s / .08); ctx.drawImage(TT, -700, -310);
    setFont(ctx, DSP(size), 6); ctx.textAlign = 'center'; ctx.strokeStyle = ivo(.85); ctx.lineWidth = 3; ctx.strokeText(str, 0, size * .36); ctx.textAlign = 'left'; ctx.restore();
  }
  function epoch(ctx, t) {
    ctx.globalAlpha = gone(t, A.ngitung - .3, .3);
    fall(ctx, 'BERAPA BANYAK?', 0, 40, t, A.terus + .05, DSP(220), { align: 'center', ls: 4, stag: .03 });
    txt(ctx, 'yang dihitung Epoch AI', 0, 150, t, A.epoch - .1, SRF(48), { align: 'center', col: ivo(.8) });
    ctx.globalAlpha = 1;
    txt(ctx, 'SEKITAR', 0, -400, t, A.sekitar - .05, MN(26), { align: 'center', ls: 12, col: ivo(.75) });
    letterNum(ctx, '300', 0, -60, 520, t, A.tiga - .04);
    txt(ctx, 'TRILIUN TOKEN', 0, 300, t, A.triliun - .05, MN(44), { align: 'center', ls: 12 });
    txt(ctx, 'stok tulisan manusia yang bisa dipakai · perkiraan', 0, 370, t, A.token2, SRF(36), { align: 'center', col: ivo(.7) });
    srcTag(ctx, 'Sumber: Epoch AI, 6 Jun 2024', -840, 460, t, A.ngitung);
  }

  // ── S5 · arXiv paper: filtered + re-read counted in ──────────────────────────────────────────────────────
  function arxiv(ctx, t) {
    evid(ctx, IM.arxiv, 0, -110, 1640, t, A.angka - .12, { crop: [0, .18, .75, .82], tab: 'arxiv.org', rot: 1, hl: [[.254, .680, .356, .085, A.angka + .45]] });
    slab(ctx, 'SUDAH DISARING', -560, 290, t, A.nyaring - .05, { size: 34 });
    txt(ctx, 'yang bagus aja', -560, 360, t, A.bagus - .05, SRF(40), { col: ivo(.75) });
    stamp(ctx, 'TERMASUK DIBACA ULANG', 330, 320, t, A.baca2 - .04, { size: 72, rot: 3 });
    srcTag(ctx, 'Sumber: Villalobos dkk., arXiv 2211.04325 (v2, 4 Jun 2024)', -840, 470, t, A.angka + .2);
  }

  // ── S6 · 300 cells of stock (1 cell = 1 T tokens); each newer model eats a bigger bite, in reading order ──
  const GC = 20, GR = 15, CS = 48, GP = 7, GX0 = -800, GY0 = -400;
  const MOD = () => [[A.llama3, 15, 'LLAMA 3', 'META · 2024', '15+'], [A.llama4, 30, 'LLAMA 4', 'META · 2025', '30+'], [A.qwen, 36, 'QWEN3', 'ALIBABA · 2025', '±36']];
  function eatenN(t) {
    if (t < A.tigapuluh - .1) return countTo(0, 15, t, A.lima - .1, 1.0);
    if (t < A.enam - .1) return countTo(15, 30, t, A.tigapuluh - .1, 1.1);
    return countTo(30, 36, t, A.enam - .1, .8);
  }
  function grid(ctx, t) {
    const n = eatenN(t), lime = kq(t, A.sepersepuluh - .02, .35), cell = i => [GX0 + (i % GC) * (CS + GP), GY0 + Math.floor(i / GC) * (CS + GP)];
    const vis = i => clamp((t - (A.sekarang + .05 + i * .004)) / .25);
    typeOn(ctx, 'STOK ±300 TRILIUN TOKEN  ·  1 KOTAK = 1 TRILIUN', GX0, GY0 - 40, t, A.sekarang + .1, MN(20), { ls: 2, cps: 70, col: ivo(.75) });
    ctx.save(); ctx.beginPath();
    for (let i = Math.ceil(n); i < 300; i++) { if (vis(i) <= 0) continue; const [x, y] = cell(i); ctx.rect(x, y, CS, CS); }
    ctx.fillStyle = TILE; ctx.fill(); ctx.strokeStyle = ivo(.32); ctx.lineWidth = 2.5; ctx.stroke(); ctx.clip(); ctx.globalAlpha *= .38; tile(ctx, TX.mono, GX0, GY0, GC * (CS + GP), GR * (CS + GP), t * 6); ctx.restore();
    ctx.fillStyle = lime > .5 ? LIME : ivo(.9); ctx.beginPath();
    for (let i = 0; i < Math.ceil(n); i++) { const [x, y] = cell(i), f = Math.min(1, n - i), s = CS * (.55 + .45 * f); ctx.rect(x + (CS - s) / 2, y + (CS - s) / 2, s, s); }
    ctx.fill();
    const M = MOD(); let cur = -1; M.forEach(([a], i) => { if (t >= a - .1) cur = i; });
    M.forEach(([a, , name, by, val], i) => {
      const y = -280 + i * 190, on = i === cur ? 1 : .32; if (t < a - .1) return;
      ctx.globalAlpha = on; fall(ctx, name, 380, y, t, a - .06, DSP(78), { ls: 3 });
      txt(ctx, by, 384, y + 40, t, a + .1, MN(19), { ls: 3, col: ivo(.65), rise: 0 });
      txt(ctx, val + ' T', 820, y, t, a + .2, DSP(78), { align: 'right', rise: 0, col: i === 2 && lime > .5 ? LIME : IVORY }); ctx.globalAlpha = 1;
    });
    txt(ctx, 'NAFSU MAKAN MODEL AI', 382, -400, t, A.nafsu - .1, MN(22), { ls: 4, col: ivo(.75) });
    if (lime > 0) { fall(ctx, '±1/10', 380, 300, t, A.sepersepuluh + .05, DSP(130), { col: LIME, ls: 2 });
      txt(ctx, 'tulisan publik manusia, oleh satu model', 384, 352, t, A.sepersepuluh + .3, SRF(28), { col: ivo(.8), rise: 0 }); }
    txt(ctx, 'lumayan lahap.', 382, 440, t, A.lumayan - .05, SRF(54), { col: IVORY });
    srcTag(ctx, 'Sumber: Meta 2024–2025; Qwen 2025; Epoch AI 2024', -840, 470, t, A.llama3);
  }

  // ── S7 · when: two growth curves (fast/slow) cross the stock line between 2026 and 2032; we are at 2026 ──
  const YX = y => -800 + (y - 2024) * 160, AY = 220, SY = -230;
  function timeline(ctx, t) {
    ctx.globalAlpha = gone(t, A.kata2 - .3, .3); fall(ctx, 'KAPAN?', 0, 40, t, A.kapan + .05, DSP(260), { align: 'center', ls: 6 }); ctx.globalAlpha = 1;
    const ax = kq(t, A.stok - .3, .7); if (ax <= 0) return;
    ctx.globalAlpha = ax; ctx.fillStyle = ivo(.5); ctx.fillRect(-820, AY, 1640, 3);
    setFont(ctx, MN(20, 400), 1); ctx.fillStyle = ivo(.55); ctx.textAlign = 'center';
    for (let y = 2024; y <= 2034; y++) { ctx.fillRect(YX(y) - 1, AY, 2, 14); ctx.fillText(String(y), YX(y), AY + 44); }
    ctx.textAlign = 'left';
    ctx.strokeStyle = ivo(.75); ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(-820, SY); ctx.lineTo(820, SY); ctx.stroke(); ctx.setLineDash([]);
    txt(ctx, 'STOK ±300 T', -810, SY - 22, t, A.stok - .1, MN(20), { ls: 3, rise: 0 }); ctx.globalAlpha = 1;
    const band = E.inOutCubic(inv(A.antara - .1, A.antara + .7, t));
    if (band > 0) { ctx.fillStyle = ivo(.09); ctx.fillRect(YX(2026), SY, (YX(2032) - YX(2026)) * band, AY - SY); }
    const cv = kq(t, A.nyamain - .2, 1.6), curve = (yc, x) => { const u = (x - YX(2024)) / (YX(yc) - YX(2024)); return AY - (AY - SY) * u ** 2.4; };
    if (cv > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-820, -520, 1640 * cv, 800); ctx.clip();
      ctx.beginPath(); for (let x = -800; x <= YX(2026) + 40; x += 8) ctx.lineTo(x, curve(2026, x)); ctx.moveTo(-800, AY);
      for (let x = -800; x <= YX(2032) + 40; x += 8) ctx.lineTo(x, curve(2032, x)); ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
      txt(ctx, 'DATA LATIH MODEL', -790, AY - 40, t, A.nyamain, MN(20), { ls: 3, col: ivo(.75), rise: 0 }); }
    fall(ctx, '2026', YX(2026), SY - 70, t, A.y2026 - .05, DSP(110), { align: 'center' });
    fall(ctx, '2032', YX(2032), SY - 70, t, A.y2032 - .05, DSP(110), { align: 'center' });
    const mk2 = pop(t, A.enam2 - .06, .5, .3);                                      // lime "we are here" pin drops onto 2026
    if (mk2 > 0) { const y = lerp(-900, 0, Math.min(1.1, mk2)); ctx.fillStyle = LIME; ctx.fillRect(YX(2026) - 3, SY + y, 6, AY - SY + 70);
      ctx.save(); ctx.translate(YX(2026), AY + 100 + y); setFont(ctx, MN(24), 3); const tw = ctx.measureText('KITA DI SINI').width;
      ctx.fillRect(-tw / 2 - 18, -26, tw + 36, 48); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText('KITA DI SINI', 0, 8); ctx.textAlign = 'left'; ctx.restore(); }
    fall(ctx, 'TAHUN INI.', YX(2026) + 50, -110, t, A.ini2 - .04, DSP(120), { ls: 3 });
    slab(ctx, 'MASA KRITIS: MULAI SEKARANG', YX(2032) - 40, 370, t, A.kritisnya - .05, { size: 30, align: 'center' });
  }
  function tlMod(p, t) {
    const k1 = E.inOutCubic(inv(A.perhatiin - .1, A.dua + .2, t)), k2 = E.inOutCubic(inv(A.kritisnya - .3, A.kritisnya + .9, t));
    p.dist -= 330 * (k1 - .85 * k2); p.tx += -380 * (k1 - k2); p.ty += -90 * (k1 - k2); p.foc = p.dist;
  }

  // ── S8 · habis ≠ lenyap: document footage + an old blog card still online ────────────────────────────────
  function notGone(ctx, t) {
    plate(ctx, IM.map_dok, t, -430, 40, 900, 600, kq(t, A.tapi2 - .05, .6), { t0: A.tapi2, dim: .15 });
    markLine(ctx, '“habis” bukan berarti ', 'lenyap', '', 0, -380, t, A.tapi2 + .1, A.habis2 + .2, SRF(70));
    typeOn(ctx, 'TULISANNYA NGGAK ILANG.', -870, 420, t, A.tulisan3 - .05, MN(28), { ls: 4, cps: 32 });
    popAt(ctx, 520, 60, t, A.blog - .1, () => {
      ctx.rotate(2.5 * D2R); doc(ctx, 0, 0, 470, 560, { r: 18 });
      ctx.fillStyle = '#16170F'; ctx.beginPath(); ctx.roundRect(-235, -280, 470, 70, [18, 18, 0, 0]); ctx.fill();
      setFont(ctx, MN(19), 2); ctx.fillStyle = ivo(.8); ctx.fillText('BLOG · 2009', -205, -238);
      setFont(ctx, SRF(46), 0); ctx.fillStyle = '#11120E'; ctx.fillText('Resep Rendang', -205, -140); ctx.fillText('Ibu', -205, -86);
      ctx.fillStyle = 'rgba(17,18,14,.18)'; ctx.fillRect(-205, -50, 410, 190);
      ctx.fillStyle = 'rgba(17,18,14,.45)'; for (let l = 0; l < 4; l++) ctx.fillRect(-205, 165 + l * 26, l === 3 ? 200 : 410, 10);
    }, { from: .7, rise: 80 });
    const ok = pop(t, A.aman - .08, .5, .3);
    if (ok > 0) { ctx.save(); ctx.translate(560, 380); ctx.scale(Math.min(1.1, ok), Math.min(1.1, ok)); ctx.fillStyle = '#16170F'; ctx.beginPath(); ctx.roundRect(-150, -30, 300, 60, 30); ctx.fill();
      ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(-115, 0, 8, 0, 7); ctx.fill();
      setFont(ctx, MN(20), 3); ctx.fillText('MASIH ONLINE', -92, 8); ctx.restore(); }
  }

  // ── S9 · what "habis" means: the training-data bar runs into the wall of stock ───────────────────────────
  function wall(ctx, t) {
    markLine(ctx, '“habis” = jatah data latih ', 'mentok', ' di stok', 0, -360, t, A.maksud - .05, A.mentok, SRF(64));
    const WX = 420, k = E.inCubic(inv(A.jatah - .1, A.mentok, t)), hit = t - A.mentok, sq = hit > 0 ? Math.exp(-hit * 6) * Math.sin(hit * 30) * 24 : 0;
    ctx.save(); ctx.beginPath(); ctx.rect(WX, -220, 260, 470); ctx.fillStyle = '#0E0F0B'; ctx.fill(); ctx.clip(); tile(ctx, TX.mono, WX, -220, 260, 470, t * 8); ctx.restore();
    ctx.strokeStyle = ivo(.75); ctx.lineWidth = 3; ctx.strokeRect(WX + (hit > 0 ? sq * .3 : 0), -220, 260, 470);
    txt(ctx, 'STOK', WX + 130, 300, t, A.maksud, MN(24), { align: 'center', ls: 8, rise: 0 });
    const x1 = lerp(-820, WX, k) - Math.max(0, sq);
    if (k > 0) { ctx.fillStyle = ivo(.9); ctx.fillRect(-820, -20, x1 + 820, 90); txt(ctx, 'DATASET LATIH', -810, -40, t, A.jatah - .1, MN(22), { ls: 4, rise: 0 }); }
    if (hit > 0) { ctx.strokeStyle = ivo(.6 * Math.exp(-hit * 3)); ctx.lineWidth = 3; for (let j = 0; j < 3; j++) { const r = 60 + hit * 500 + j * 40; ctx.beginPath(); ctx.arc(WX, 25, r, Math.PI * .6, Math.PI * 1.4); ctx.stroke(); } }
  }

  // ── S10 · santri yang khatam: fourteen kitab ticked off one by one; the books stay ───────────────────────
  function santri(ctx, t) {
    typeOn(ctx, 'IBARAT SANTRI YANG UDAH KHATAM SEMUA KITAB DI PONDOKNYA', -840, -420, t, A.santri - .05, MN(22), { ls: 2, cps: 55, col: ivo(.85) });
    const N = 14, SW = 104, X0 = -N * SW / 2, BY = 160, done = i => A.khatam + i * (1.6 / N);
    ctx.fillStyle = ivo(.3); ctx.fillRect(X0 - 30, BY, N * SW + 60, 14);
    let left = N;
    for (let i = 0; i < N; i++) {
      const h = 330 + rnd(i + 4) * 130, x = X0 + i * SW, k = pop(t, A.santri + i * .03, .55, .3); if (k <= 0) continue;
      const read = t >= done(i); if (read) left--;
      ctx.save(); ctx.translate(x + SW / 2, BY); ctx.scale(1, Math.min(1.08, k)); ctx.globalAlpha *= read ? .55 : 1;
      ctx.fillStyle = TILE; ctx.fillRect(-SW / 2 + 6, -h, SW - 12, h); ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.strokeRect(-SW / 2 + 6, -h, SW - 12, h);
      ctx.fillStyle = ivo(.35); ctx.fillRect(-SW / 2 + 6, -h + 26, SW - 12, 4); ctx.fillRect(-SW / 2 + 6, -40, SW - 12, 4);
      ctx.rotate(-Math.PI / 2); setFont(ctx, SRF(30), 0); ctx.fillStyle = IVORY; ctx.fillText(KITAB[i], 60, 10); ctx.restore();
      if (read) { const c = kq(t, done(i), .22), cx = x + SW / 2, yb = BY - h - 40, P = [[cx - 22, yb], [cx - 6, yb + 16], [cx + 24, yb - 22]];
        ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...P[0]);
        const u = c * 2; if (u < 1) ctx.lineTo(lerp(P[0][0], P[1][0], u), lerp(P[0][1], P[1][1], u)); else { ctx.lineTo(...P[1]); ctx.lineTo(lerp(P[1][0], P[2][0], u - 1), lerp(P[1][1], P[2][1], u - 1)); }
        ctx.stroke(); ctx.lineCap = 'butt'; }
    }
    txt(ctx, 'Bukunya masih ada.', -840, 330, t, A.bukunya - .05, SRF(56));
    txt(ctx, 'BELUM DIBACA', 520, 300, t, A.khatam, MN(22), { ls: 4, col: ivo(.75), rise: 0 });
    if (t > A.khatam) slot(ctx, left, 520, 440, DSP(150), { col: t > A.habis3 - .05 ? LIME : IVORY });
  }

  // ── S11 · a year later, Sutskever on Dwarkesh ────────────────────────────────────────────────────────────
  function dwarkesh(ctx, t) {
    evid(ctx, IM.dwark, 0, -170, 1300, t, A.setahun - .12, { tab: 'dwarkesh.com', rot: -1.2 });
    typeOn(ctx, 'ILYA SUTSKEVER · DWARKESH PODCAST · NOV 2025', 0, 190, t, A.sutskever - .05, MN(22), { align: 'center', ls: 3, cps: 60, col: ivo(.75) });
    markLine(ctx, 'bekal bacaan awal AI emang ', 'terbatas', '', 0, 330, t, A.bekal - .3, A.terbatas, SRF(70));
    srcTag(ctx, 'Sumber: Dwarkesh Podcast, 25 Nov 2025', -840, 470, t, A.setahun + .2);
  }

  // ── S12 · scarce goods: the gate footage, then fence bars slam down over it ─────────────────────────────
  function fence(ctx, t) {
    plate(ctx, IM.gerbang, t, 0, 0, 1760, 920, kq(t, A.begitu - .05, .6), { t0: A.begitu, dim: .3 });
    txt(ctx, 'BEGITU SADAR STOKNYA TERBATAS', 0, -330, t, A.stoknya - .05, MN(28), { align: 'center', ls: 8, col: ivo(.8) });
    markLine(ctx, 'data jadi ', 'barang langka', '', 0, -200, t, A.stoknya + .6, A.langka, SRF(84));
    for (let i = 0; i < 7; i++) {
      const k = pop(t, A.masang - .02 + i * .07, .45, .25); if (k <= 0) continue; const x = -780 + i * 260, y = lerp(-1300, 0, Math.min(1.05, k));
      ctx.fillStyle = '#121310'; ctx.fillRect(x - 16, -560 + y, 32, 1120); ctx.fillStyle = ivo(.4); ctx.fillRect(x - 16, -560 + y, 4, 1120);
    }
    const r = kq(t, A.pagar - .04, .25);
    if (r > 0) { ctx.fillStyle = '#121310'; ctx.fillRect(-900 * r, 60, 1800 * r, 30); ctx.fillRect(-900 * r, 360, 1800 * r, 30);
      ctx.fillStyle = ivo(.4); ctx.fillRect(-900 * r, 60, 1800 * r, 4); ctx.fillRect(-900 * r, 360, 1800 * r, 4); }
    txt(ctx, 'ORANG MULAI MASANG PAGAR', 0, 250, t, A.orang - .05, DSP(90), { align: 'center', ls: 4 });
  }

  const ST = [
    { at: 0, name: 'Internet luas', draw: opener, dist: [1600, 1440] },
    { at: A.kenalan, via: 'cut', lead: .12, name: 'Mata Mesin (token)' },
    { at: A.tahap, via: 'cut', lead: .05, name: 'Pretraining', draw: pretrain, dist: [1560, 1430] },
    { at: A.ibarat, via: 'push', name: 'Ibarat sekolah', draw: school, dist: [1540, 1420] },
    { at: A.terus, via: 'whip', name: 'Epoch 300 T', draw: epoch, dist: [1560, 1400] },
    { at: A.angka, via: 'rise', name: 'arXiv disaring', draw: arxiv, dist: [1520, 1430] },
    { at: A.sekarang, via: 'whip', name: '300 kotak dimakan', draw: grid, dist: [1600, 1480],
      mod(p, t) { const k = E.inOutCubic(inv(A.sepersepuluh - .3, A.sepersepuluh + 1.0, t)); p.dist -= 90 * k; p.tx += 40 * k; p.ty += 30 * k; p.foc = p.dist; } },
    { at: A.kapan, via: 'push', name: 'Linimasa 2026–2032', draw: timeline, dist: [1560, 1500], mod: tlMod },
    { at: A.tapi2, via: 'whip', name: 'Habis ≠ lenyap', draw: notGone, dist: [1560, 1430] },
    { at: A.maksud, via: 'push', name: 'Jatah mentok', draw: wall, dist: [1540, 1420] },
    { at: A.santri, via: 'rise', name: 'Santri khatam', draw: santri, dist: [1560, 1420] },
    { at: A.setahun, via: 'whip', name: 'Dwarkesh', draw: dwarkesh, dist: [1520, 1420] },
    { at: A.begitu, via: 'push', name: 'Pagar', draw: fence, dist: [1600, 1460] },
  ];
  let FULLS;
  const ch = makeChapter({ B, ST, load, label: 'BAB 1 · BENARKAH HABIS?', over, full: () => FULLS ??= [
    { im: IM.epoch, t0: A.ngitung - .15, t1: A.tiga + .1, crop: [.32, .02, .58, .84], tab: 'epoch.ai', dir: 1,
      hl: [[.667, .695, .286, .071, A.dipake - .1], [.03, .769, .10, .071, A.dipake + .3]] },
    { im: IM.epoch, t0: A.kata2 - .1, t1: A.stok + .25, crop: [.32, .02, .58, .84], tab: 'epoch.ai', dir: -1,
      hl: [[.127, .843, .341, .071, A.kata2 + .9]] },
  ] });
  const row = ch.draw;
  ch.draw = (ctx, t) => inMata(t) ? mata.draw(ctx, t) : row(ctx, t);
  ch.K = t => inMata(t) ? 1 : 8;
  ch.cuts = [...new Set([...ch.cuts, MATA0, MATA1])].sort((a, b) => a - b);
  return ch;
}
