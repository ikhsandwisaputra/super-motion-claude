// Bab 3 (VO 06): Tiga jalan keluar — dunia TERANG (kelas, siang hari; kit theme(true)), setelah Bab 1–2 yang gelap.
// peta tiga jalan → AI ngajarin AI (robot guru nulis soal, lembar pindah ke robot murid) → Phi-4 (arXiv) + bar murid nyalip guru →
// AI Index 2026 (belum terbukti) → AI belajar sendiri (RL) → sepeda: jatuh / coba lagi / berhasil, senyum jadi +1 →
// AlphaGo Zero (Nature + video papan Go) → papan skor split-flap 100 : 0 → DeepSeek-R1 (Nature) → ampuh buat soal pasti →
// tangga mentok plafon (Yue dkk.) → Era of Experience → jalan ketiga: dunia nyata (lengan robot) → Michael Frank (Stanford) + anak →
// menara buku GPT-3 (tilt-up) vs satu buku tipis → ±33.000× (angka berisi kata) → minta susu → rekap: satu pertanyaan gede →
// robot membaca tulisan robot, layar meredup → jembatan ke Bab 4.
// Teknik baru bab ini: drawOn (garis tepi huruf digambar per kontur lalu tinta naik dari bawah), papan split-flap, menara buku tilt-up.
// Lime = satu kata kunci per momen; teks lime di dasar terang pakai #4B6800.
import B from './beats.js';
import { clamp, inv, lerp, E, LIME, LIME_INK, D2R, INK, ivo, setFont, rnd, mk, DISP, SER, MONO, timing, makeChapter, loadImg, loadVid, theme,
  plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, fmt, gone } from './kit.js';
import { kq, pop, popAt, stamp } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const PAPER = '#F7F5EE', LIGHTTXT = '#F1EFE6', LT = '#4B6800', TILE_D = '#1C1D17';
const KATA = ('kita makan nasi rumah jalan pagi kabar baik terima kasih sudah belum besok ibu bapak sekolah kerja pasar hujan senja lagu cerita ' +
  'tulis baca resep surat doa janji rindu warung kopi gula garam sambal kampung kota anak cucu nenek kakek sawah laut angin pulang').split(' ');
const sz = css => parseFloat(/(\d+(\.\d+)?)px/.exec(css)[1]);

// ── drawOn: every glyph contour is stroked on at once (dash restarts per contour), then ink floods up from the baseline ──────
function drawOn(ctx, str, x, y, t, t0, css, o = {}) {
  const s = t - t0; if (s <= 0) return 0; const dur = o.dur ?? .9, size = sz(css), col = o.col || INK, a0 = ctx.globalAlpha;
  setFont(ctx, css, o.ls ?? 2); const tw = ctx.measureText(str).width, x0 = o.align === 'left' ? x : o.align === 'right' ? x - tw : x - tw / 2;
  ctx.save(); ctx.textAlign = 'left'; const k = E.inOutCubic(clamp(s / dur));
  if (k < 1) { ctx.strokeStyle = col; ctx.lineWidth = o.lw ?? Math.max(2, size * .02); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.setLineDash([k * size * (o.len ?? 3.4), 1e5]); ctx.strokeText(str, x0, y); ctx.setLineDash([]); }
  const f0 = t0 + dur * (o.fillAt ?? .55), f = E.outCubic(inv(f0, f0 + (o.fill ?? .55), t));
  if (f > 0) {
    const top = y + size * .1 - size * .92 * f, amp = size * .05 * (1 - f), N = 40;
    ctx.beginPath(); ctx.moveTo(x0 - 20, y + size * .35);
    for (let i = 0; i <= N; i++) ctx.lineTo(x0 - 20 + (tw + 40) * i / N, top + Math.sin(i * .85 + s * 10) * amp);
    ctx.lineTo(x0 + tw + 20, y + size * .35); ctx.closePath(); ctx.clip(); ctx.fillStyle = col; ctx.fillText(str, x0, y);
  }
  ctx.restore(); ctx.globalAlpha = a0; return tw;
}
// a strike line drawn through a block of text (left x0 .. x1 at baseline y), size = font size
function strike(ctx, x0, x1, y, size, t, t0, col = INK) {
  const k = E.snap(inv(t0, t0 + .28, t)); if (k <= 0) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, size * .07); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0 - 12, y - size * .3); ctx.lineTo(lerp(x0 - 12, x1 + 12, k), y - size * .3 - 6 * k); ctx.stroke(); ctx.restore();
}
function node(ctx, x, y, n, t, t0, r = 54) {                    // lime numbered disc, springs in
  const k = pop(t, t0, .45, .25); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.12, k), Math.min(1.12, k));
  ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke();
  setFont(ctx, DSP(r * 1.5), 0); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText(String(n), 0, r * .52); ctx.textAlign = 'left'; ctx.restore();
}
function check(ctx, x, y, r, t, t0) {                           // lime disc with a drawn check mark
  const k = pop(t, t0, .45, .25); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
  ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = LIME_INK; ctx.lineWidth = r * .16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const d = E.outCubic(inv(t0 + .08, t0 + .35, t)); ctx.beginPath(); ctx.moveTo(-r * .42, 0); ctx.lineTo(-r * .1, r * .32 * Math.min(1, d * 2));
  if (d > .5) ctx.lineTo(lerp(-r * .1, r * .45, (d - .5) * 2), lerp(r * .32, -r * .35, (d - .5) * 2)); ctx.stroke(); ctx.restore();
}
function paper(ctx, w, h, r = 10) {                              // ivory sheet, soft shadow, ink outline, centred
  ctx.save(); ctx.shadowColor = 'rgba(21,22,15,.22)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = PAPER;
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, r); ctx.fill(); ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke();
}
// line-art robot, body centre at (x, y). o: { look, lime, glasses, rh:[x,y], lh:[x,y] (hands, local units), blink, rot }
function robot(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot || 0) * D2R); ctx.lineWidth = Math.max(3, s * .045); ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const P = fn => { ctx.beginPath(); fn(); ctx.fillStyle = PAPER; ctx.fill(); ctx.stroke(); };
  ctx.beginPath(); ctx.moveTo(-.2 * s, .38 * s); ctx.lineTo(-.2 * s, .62 * s); ctx.moveTo(.2 * s, .38 * s); ctx.lineTo(.2 * s, .62 * s); ctx.moveTo(0, -.5 * s); ctx.lineTo(0, -.42 * s); ctx.stroke();
  const arm = (sx, h) => { ctx.beginPath(); ctx.moveTo(sx, -.25 * s); ctx.quadraticCurveTo(sx + (h[0] - sx) * .15, h[1] * .25 - .05 * s, h[0], h[1]); ctx.stroke();
    ctx.beginPath(); ctx.arc(h[0], h[1], .065 * s, 0, 7); ctx.fillStyle = INK; ctx.fill(); };
  arm(-.42 * s, o.lh || [-.55 * s, .22 * s]); arm(.42 * s, o.rh || [.55 * s, .22 * s]);
  P(() => ctx.roundRect(-.42 * s, -.42 * s, .84 * s, .8 * s, .14 * s));
  ctx.beginPath(); ctx.roundRect(-.2 * s, -.24 * s, .4 * s, .2 * s, .05 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -1.22 * s); ctx.lineTo(0, -1.4 * s); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -1.46 * s, .075 * s, 0, 7); ctx.fillStyle = o.lime ? LIME : INK; ctx.fill(); if (o.lime) ctx.stroke();
  P(() => ctx.roundRect(-.5 * s, -1.22 * s, s, .72 * s, .2 * s));
  const lx = (o.look || 0) * .1 * s; ctx.fillStyle = INK;
  for (const ex of [-.2, .2]) { ctx.beginPath(); ctx.ellipse(ex * s + lx, -.86 * s, .075 * s, .075 * s * (o.blink ? .15 : 1), 0, 0, 7); ctx.fill(); }
  if (o.glasses) { ctx.lineWidth = Math.max(2, s * .03); ctx.beginPath(); ctx.arc(-.2 * s + lx, -.86 * s, .15 * s, 0, 7); ctx.moveTo(.35 * s + lx, -.86 * s);
    ctx.arc(.2 * s + lx, -.86 * s, .15 * s, 0, 7); ctx.moveTo(-.05 * s + lx, -.88 * s); ctx.lineTo(.05 * s + lx, -.88 * s); ctx.stroke(); }
  ctx.restore();
}
// line-art bicycle, ground at y; returns seat and bar points (local to x, y) so a rider can sit on it
function bike(ctx, x, y, r, spin) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = INK; ctx.lineWidth = r * .07; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const wb = r * 2.6, A = [-wb / 2, -r], Bw = [wb / 2, -r], C = [-r * .1, -r], S = [-r * .5, -r * 2.05], Hd = [r * .92, -r * 2.15];
  for (const [cx, cy] of [A, Bw]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(spin); ctx.lineWidth = r * .022; ctx.beginPath();
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...C); ctx.lineTo(...S); ctx.lineTo(...A); ctx.moveTo(...C); ctx.lineTo(...Hd); ctx.lineTo(S[0] + r * .1, S[1] + r * .1);
  ctx.moveTo(...Hd); ctx.lineTo(...Bw); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(S[0] - r * .28, S[1] - r * .1); ctx.lineTo(S[0] + r * .22, S[1] - r * .1); ctx.moveTo(...Hd); ctx.lineTo(Hd[0] - r * .1, Hd[1] - r * .38);
  ctx.lineTo(Hd[0] + r * .28, Hd[1] - r * .42); ctx.stroke();
  ctx.save(); ctx.translate(...C); ctx.rotate(spin * .5); ctx.lineWidth = r * .05; ctx.beginPath(); ctx.arc(0, 0, r * .16, 0, 7); ctx.moveTo(-r * .3, 0); ctx.lineTo(r * .3, 0); ctx.stroke(); ctx.restore();
  ctx.restore(); return { seat: [S[0], S[1] - r * .1], bar: [Hd[0] + r * .2, Hd[1] - r * .4] };
}
function smiley(ctx, x, y, r) {
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = PAPER; ctx.strokeStyle = INK; ctx.lineWidth = r * .1; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; for (const ex of [-.33, .33]) { ctx.beginPath(); ctx.arc(ex * r, -.2 * r, r * .1, 0, 7); ctx.fill(); }
  ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, .02 * r, r * .5, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); ctx.restore();
}
// split-flap cell: blank until tS, flips a digit every .07 s, lands on fin at ≈ tL
function flap(ctx, x, y, w, h, t, tS, tL, fin, seed) {
  const d = .07, N = Math.max(1, Math.round((tL - tS) / d)), n = Math.floor((t - tS) / d);
  const ch = i => i <= 0 ? '' : i >= N ? fin : '0123456789'[Math.floor(rnd(seed * 31 + i) * 10)];
  ctx.save(); ctx.translate(x, y); setFont(ctx, DSP(h * .86), 0); ctx.textAlign = 'center';
  ctx.save(); ctx.shadowColor = 'rgba(21,22,15,.3)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14; ctx.fillStyle = TILE_D; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 12); ctx.fill(); ctx.restore();
  const face = (c, top) => { ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, top ? -h / 2 : 0, w, h / 2); ctx.clip(); ctx.fillStyle = TILE_D; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 12); ctx.fill();
    ctx.fillStyle = top ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.12)'; ctx.fillRect(-w / 2, top ? -h / 2 : 0, w, h / 2); if (c) { ctx.fillStyle = LIGHTTXT; ctx.fillText(c, 0, h * .31); } ctx.restore(); };
  if (t < tS || n >= N) { const c = t < tS ? '' : fin; face(c, true); face(c, false); }
  else { const p = (t - tS) / d - n, c0 = ch(n), c1 = ch(n + 1); face(c1, true); face(c0, false);
    ctx.save(); if (p < .5) { ctx.scale(1, Math.max(.001, 1 - 2 * p)); face(c0, true); ctx.fillStyle = `rgba(0,0,0,${.4 * p})`; ctx.fillRect(-w / 2, -h / 2, w, h / 2); }
    else { ctx.scale(1, Math.max(.001, 2 * p - 1)); face(c1, false); ctx.fillStyle = `rgba(0,0,0,${.3 * (1 - p)})`; ctx.fillRect(-w / 2, 0, w, h / 2); } ctx.restore(); }
  ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(-w / 2, -2, w, 4); ctx.textAlign = 'left'; ctx.restore();
}

export function makeFilm() {
  theme(true);                                                 // Bab 3 = siang: ivory room, ink type, ink cards
  const { T: A } = timing(B);
  const IM = {};
  async function load() {
    const K = '../assets/shared/kutipan/', V = '../assets/shared/vid/';
    [IM.phi, IM.hai, IM.ago, IM.ds, IM.era, IM.su] = await Promise.all([
      loadImg(K + 'arxiv-computer-science-computation-and-2.png', 2000), loadImg(K + 'hai-research-and-development-the-2026-ai.png', 1600),
      loadImg(K + 'nature-mastering-the-game-of-go-without-human.png', 1600), loadImg(K + 'nature-deepseek-r1-incentivizes-reasoning-in.png', 1600),
      loadImg(K + 'storage-tanpa-judul.png', 2736), loadImg(K + 'engineering-the-future-of-language-learning.png', 2000)]);
    [IM.go, IM.robot, IM.anak] = await Promise.all([loadVid(V, 'go'), loadVid(V, 'robot'), loadVid(V, 'anak_tunjuk')]);
  }

  // ── S1 + S18 · the three paths (opener, recap) ─────────────────────────────────────────────────────────────
  const NODE = [[-560, -20], [0, -100], [560, -20]];
  const LAB = [['BIKIN CATATAN SENDIRI', 'AI NGAJARIN AI'], ['PRAKTIK LANGSUNG', 'AI BELAJAR SENDIRI'], ['BELAJAR LEBIH IRIT', 'BELAJAR DARI DUNIA']];
  function paths(ctx, t, tP, tN, al = [1, 1, 1]) {
    NODE.forEach(([px, py], i) => {
      const k = E.inOutCubic(inv(tP + i * .12, tP + .75 + i * .12, t)); if (k <= 0) return; ctx.save(); ctx.globalAlpha *= al[i];
      ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const Nn = 40, cx = px * .2 - (i === 1 ? 160 : 0);
      for (let j = 0; j <= Nn * k; j++) { const u = j / Nn, x = 2 * (1 - u) * u * cx + u * u * px, y = (1 - u) ** 2 * 470 + 2 * (1 - u) * u * 180 + u * u * py; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      node(ctx, px, py, i + 1, t, tN[i]);
      fall(ctx, LAB[i][0], px, py - 92, t, tN[i] + .05, DSP(56), { align: 'center', ls: 2, stag: .018, drop: -40 });
      typeOn(ctx, LAB[i][1], px, py - 158, t, tN[i] + .25, MN(17), { align: 'center', cps: 50, ls: 3, col: ivo(.6) });
      ctx.restore();
    });
  }
  function opener(ctx, t) {
    const out = gone(t, A.pilihannya - .15, .35);
    if (out > 0) { ctx.save(); ctx.globalAlpha *= out; ctx.translate(0, -60 * (1 - out));
      txt(ctx, 'nggak boleh lagi', 0, -110, t, A.nggak - .2, SRF(60), { align: 'center', col: ivo(.75) });
      const tw = fall(ctx, 'NYONTEK CATATAN TEMEN?', 0, 80, t, .1, DSP(170), { align: 'center', ls: 3, stag: .02 });
      if (tw) strike(ctx, -tw / 2, tw / 2 - 40, 80, 170, t, A.nyontek); ctx.restore(); }
    drawOn(ctx, 'TIGA JALAN KELUAR', 0, -330, t, A.pilihannya + .05, DSP(150), { ls: 6, dur: 1.0 });
    paths(ctx, t, A.tiga - .1, [A.bikin - .05, A.praktik - .05, A.belajar - .05]);
  }

  // ── S2 · AI ngajarin AI: a big teacher-robot writes a practice sheet, the sheet slides to the student-robot ──
  const SOAL = ['1.  12 + 7 = …', '2.  9 × 4 = …', '3.  2³ - 5 = …', '4.  3x = 21, x = …'];
  function sheet(ctx, t, x, y, sc, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot * D2R); ctx.scale(sc, sc); paper(ctx, 440, 560, 12);
    setFont(ctx, MN(20), 4); ctx.fillStyle = INK; ctx.fillText('SOAL LATIHAN', -180, -210); ctx.fillRect(-180, -192, 360, 3);
    SOAL.forEach((s, i) => typeOn(ctx, s, -180, -130 + i * 78, t, (i < 2 ? A.ngajarin + .1 + i * .5 : A.soal - .05 + (i - 2) * .45), MN(28, 400), { cps: 22 }));
    setFont(ctx, MN(15, 400), 2); ctx.fillStyle = ivo(.55); ctx.fillText('ditulis: AI guru', -180, 245); ctx.restore();
  }
  function teach(ctx, t) {
    node(ctx, -800, -385, 1, t, A.pertama - .05, 46);
    drawOn(ctx, 'AI NGAJARIN AI', -730, -340, t, A.pertama + .05, DSP(130), { align: 'left', ls: 4 });
    const kT = pop(t, A.ngajarin - .25, .55, .3);
    if (kT > 0) { const writing = t > A.ngajarin && t < A.muridnya - .1, w = writing ? Math.sin(t * 15) * 9 : 0, wy = writing ? ((t * 1.4) % 1) * 60 : 0;
      ctx.save(); ctx.translate(-470, 170); ctx.scale(Math.min(1.08, kT), Math.min(1.08, kT));
      robot(ctx, 0, 0, 170, { glasses: true, look: .8, rh: [150 + w, -40 + wy], blink: (t % 3.1) < .12 }); ctx.restore(); }
    const kM = E.snap(inv(A.muridnya - .15, A.muridnya + .45, t)), kS = kq(t, A.ngajarin - .15, .55);
    if (kS > 0) sheet(ctx, t, lerp(-20, 400, kM), lerp(60 + (1 - kS) * 80, -20, kM), lerp(1, .62, kM), lerp(-2, 6, kM));
    popAt(ctx, 650, 280, t, A.muridnya - .25, () => robot(ctx, 0, 0, 100, { look: -.8, lime: true, lh: [-.75 * 100, -.5 * 100] }), { from: .4, rise: 40 });
    slab(ctx, 'GURU LES', -470, -150, t, A.guru - .05, { size: 26, align: 'center' });
    slab(ctx, 'MURID', 650, 100, t, A.muridnya + .1, { size: 26, align: 'center' });
    markLine(ctx, 'data ', 'SINTETIS', ' = bahan belajar bikinan mesin', 0, 452, t, A.namanya - .1, A.sintetis, SRF(52));
  }

  // ── S3 · Phi-4: the arXiv page, then the student bar overtakes the teacher bar (illustration, not a score) ────
  function phi(ctx, t) {
    evid(ctx, IM.phi, 0, -190, 1500, t, A.contohnya - .1, { crop: [0, .19, 1, .81], tab: 'arxiv.org · 12 Des 2024',
      hl: [[.017, .228, .225, .123, A.phi4], [.615, .884, .325, .078, A.bahannya]] });
    const o1 = gone(t, A.eh - .45, .35);
    if (o1 > 0) { ctx.save(); ctx.globalAlpha *= o1;
      fall(ctx, 'PHI-4', -820, 200, t, A.phi4 - .1, DSP(170), { ls: 4 });
      typeOn(ctx, 'MICROSOFT · AKHIR 2024', -810, 262, t, A.microsoft - .05, MN(22), { ls: 4, col: ivo(.7) });
      markLine(ctx, 'sebagian besar bahannya ', 'bikinan mesin', '', -60, 205, t, A.sebagian - .1, A.bahannya + .1, SRF(52), { align: 'left' });
      ctx.restore(); }
    if (t > A.eh - .4) {
      const g = 900 * kq(t, A.eh - .4, .7), m1 = 720 * kq(t, A.eh - .3, .8), m2 = (1080 - 720) * pop(t, A.ngalahin - .05, .5, .3), win = t > A.ngalahin - .02;
      setFont(ctx, MN(22), 3); ctx.fillStyle = INK; ctx.fillText('GURU · GPT-4', -820, 128); ctx.fillText('MURID · PHI-4', -820, 248);
      ctx.fillStyle = INK; ctx.fillRect(-420, 92, g, 60);
      ctx.fillStyle = win ? LIME : ivo(.45); ctx.fillRect(-420, 212, m1 + m2, 60); if (win) { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(-420, 212, m1 + m2, 60); }
      if (win) { robot(ctx, -420 + m1 + m2 + 40, 252, 34, { lime: true }); }
      txt(ctx, 'ilustrasi, bukan skor', 840, 330, t, A.eh, MN(17, 400), { align: 'right', col: ivo(.5), ls: 2 });
      slab(ctx, 'SAINS & MATEMATIKA', -420, 340, t, A.sains - .05, { size: 26 });
    }
    srcTag(ctx, 'Microsoft (arXiv), 12 Des 2024', -840, 450, t, A.contohnya + .3);
  }

  // ── S4 · AI Index 2026: the report as a source card, our own type carries the claim; then the stamp ─────────
  function aiIndex(ctx, t) {
    evid(ctx, IM.hai, -450, -60, 820, t, A.cuma - .1, { tab: 'hai.stanford.edu · AI Index 2026', rot: -2, dim: .06 + .3 * kq(t, A.belum - .2, .4) });
    const o1 = gone(t, A.belum - .3, .3);
    if (o1 > 0) { ctx.save(); ctx.globalAlpha *= o1;
      typeOn(ctx, 'LAPORAN STANFORD', 60, -220, t, A.laporan - .1, MN(22), { ls: 4, cps: 40, col: ivo(.7) });
      fall(ctx, 'AI INDEX 2026', 56, -90, t, A.index - .2, DSP(150), { ls: 3 });
      txt(ctx, '“jangan keburu seneng.”', 60, 40, t, A.jangan - .1, SRF(62));
      ctx.restore(); }
    stamp(ctx, 'BELUM ADA BUKTI KUAT', 430, -120, t, A.belum - .04, { size: 92, rot: -4 });
    slab(ctx, 'DATA MESIN', 60, 120, t, A.ngegantiin - .3, { size: 26 });
    const ka = E.snap(inv(A.ngegantiin - .1, A.ngegantiin + .4, t));
    if (ka > 0) { ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(300, 120); ctx.lineTo(300 + 120 * ka, 120); ctx.stroke();
      if (ka > .9) { ctx.beginPath(); ctx.moveTo(408, 108); ctx.lineTo(422, 120); ctx.lineTo(408, 132); ctx.stroke(); }
      txt(ctx, 'gantiin?', 360, 92, t, A.ngegantiin, MN(17, 400), { align: 'center', col: ivo(.65), rise: 12 }); }
    slab(ctx, 'TULISAN MANUSIA', 444, 120, t, A.manusia - .05, { size: 26 });
    txt(ctx, 'di tahap belajar awal.', 60, 250, t, A.awal - .2, SRF(54));
    srcTag(ctx, 'Stanford HAI, AI Index 2026', -840, 450, t, A.cuma + .3);
  }

  // ── S5 · AI belajar sendiri ─────────────────────────────────────────────────────────────────────────────
  function rl(ctx, t) {
    node(ctx, 0, -320, 2, t, A.kedua - .05, 58);
    drawOn(ctx, 'AI BELAJAR SENDIRI', 0, -60, t, A.kedua + .15, DSP(220), { ls: 6, dur: 1.1 });
    const w = txt(ctx, 'lewat coba-coba', 0, 70, t, A.cobacoba - .1, SRF(66), { align: 'center' });
    if (w) { const sp = E.inOutCubic(inv(A.cobacoba, A.cobacoba + .9, t)) * Math.PI * 2, cx = w / 2 + 60, cy = 48; ctx.save(); ctx.translate(cx, cy); ctx.rotate(sp);
      ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 28, .3, Math.PI * 1.75); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(28 * Math.cos(.3) - 12, 28 * Math.sin(.3) - 4); ctx.lineTo(28 * Math.cos(.3), 28 * Math.sin(.3)); ctx.lineTo(28 * Math.cos(.3) + 8, 28 * Math.sin(.3) - 14); ctx.stroke(); ctx.restore(); }
    typeOn(ctx, 'ISTILAHNYA', 0, 190, t, A.istilahnya - .05, MN(20), { align: 'center', ls: 6, cps: 40, col: ivo(.6) });
    slab(ctx, 'REINFORCEMENT LEARNING', 0, 260, t, A.reinforcement - .05, { size: 36, align: 'center' });
  }

  // ── S6 · bicycle: wobble → jatuh → coba lagi → berhasil; the smile turns into a +1 point ─────────────────────
  function cycle(ctx, t) {
    const o1 = gone(t, A.bedanya - .15, .35), r = 92;
    if (o1 > 0) { ctx.save(); ctx.globalAlpha *= o1;
      const kin = kq(t, A.mirip2 - .3, .7), ride = Math.max(0, t - (A.berhasil - .1)), bx = lerp(-1000, -400, kin) + ride * 120, gy = 270;
      const amp = t < A.jatuh ? 6 * clamp((t - A.mirip2) / 1) : t < A.berhasil - .1 ? 2.5 : 0, wob = amp * Math.sin(t * 7.5);
      const fallA = 84 * E.inCubic(inv(A.jatuh - .3, A.jatuh - .02, t)) * (1 - E.outCubic(inv(A.coba - .1, A.coba + .45, t)));
      const bounce = t > A.jatuh && t < A.coba ? 4 * Math.exp(-(t - A.jatuh) * 9) * Math.sin((t - A.jatuh) * 40) : 0;
      ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-880, gy + 2); ctx.lineTo(60, gy + 2); ctx.stroke();
      if (ride > 0) { ctx.strokeStyle = ivo(.4); ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { const yy = gy - 60 - i * 55, L = 80 + 40 * i; ctx.beginPath(); ctx.moveTo(bx - 240 - L, yy); ctx.lineTo(bx - 240, yy); ctx.stroke(); } }
      ctx.save(); ctx.translate(bx + r * 1.3, gy); ctx.rotate((fallA + bounce + wob) * D2R); ctx.translate(-r * 1.3, 0);
      const spin = (t - A.mirip2) * (ride > 0 ? 9 : 3), P = bike(ctx, 0, 0, r, spin);
      const s = 78, by = P.seat[1] - .4 * s; robot(ctx, P.seat[0] + 10, by, s, { look: 1, rh: [P.bar[0] - P.seat[0] - 10, P.bar[1] - by], lh: [P.bar[0] - P.seat[0] - 30, P.bar[1] - by + 6], blink: fallA > 20 });
      ctx.restore();
      if (t > A.jatuh && t < A.jatuh + .6) { const s2 = t - A.jatuh; ctx.fillStyle = ivo(.35 * (1 - s2 / .6));
        for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(bx + r * 1.3 + (i - 2) * 50 * (1 + s2 * 2), gy - 10 - s2 * 60 * rnd(i + 3), 14 + s2 * 30, 0, 7); ctx.fill(); } }
      const L = [['JATUH', A.jatuh - .05], ['COBA LAGI', A.coba - .05], ['BERHASIL', A.berhasil - .05]];
      L.forEach(([s, t0], i) => { const y = -160 + i * 140, k = pop(t, t0, .5, .28); if (k <= 0) return;
        ctx.save(); ctx.translate(250, y - 38); ctx.scale(Math.min(1.1, k), Math.min(1.1, k)); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineCap = 'round';
        if (i === 0) { ctx.beginPath(); ctx.moveTo(-22, -22); ctx.lineTo(22, 22); ctx.moveTo(22, -22); ctx.lineTo(-22, 22); ctx.stroke(); }
        else if (i === 1) { ctx.beginPath(); ctx.arc(0, 0, 26, .4, Math.PI * 1.8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(25, 13); ctx.lineTo(36, -2); ctx.stroke(); }
        ctx.restore(); if (i === 2) check(ctx, 250, y - 38, 34, t, t0);
        fall(ctx, s, 320, y, t, t0, DSP(108), { ls: 3, stag: .02 }); });
      ctx.restore(); }
    // the smile: pops over the rider at "seneng", flies up at "bedanya", flips into the +1 point at "poin"
    if (t > A.seneng2 - .05) {
      const kf = E.snap(inv(A.bedanya - .1, A.bedanya + .5, t)), sx0 = -400 + Math.max(0, t - (A.berhasil - .1)) * 120 + r * .2, sy0 = -150;
      const x = lerp(Math.min(sx0, -400 + (A.bedanya - A.berhasil) * 120 + r * .2), 0, kf), y = lerp(sy0, -300, kf), rr = lerp(40, 92, kf) * Math.min(1.1, pop(t, A.seneng2 - .05, .45, .25));
      const fl = inv(A.poin - .15, A.poin + .15, t), cw = Math.cos(Math.PI * fl);
      ctx.save(); ctx.translate(x, y); ctx.scale(Math.abs(cw) || .001, 1);
      if (cw > 0) smiley(ctx, 0, 0, rr);
      else { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, rr, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
        setFont(ctx, DSP(rr * 1.1), 0); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText('+1', 0, rr * .38); ctx.textAlign = 'left'; }
      ctx.restore();
    }
    markLine(ctx, 'rasa seneng diganti ', 'POIN', '', 0, -60, t, A.bedanya, A.poin, SRF(68));
    fall(ctx, 'BENER', -640, 250, t, A.bener - .06, DSP(130), { ls: 3 });
    txt(ctx, '= dapet nilai', -330, 248, t, A.nilai - .1, SRF(50), { col: LT });
    fall(ctx, 'SALAH', 220, 250, t, A.salah - .06, DSP(130), { ls: 3 });
    txt(ctx, '= nggak', 510, 248, t, A.nggak2 - .1, SRF(50), { col: ivo(.6) });
  }

  // ── S7 · AlphaGo Zero: Go footage + the Nature page; "contoh main manusia" struck, only the rules ─────────────
  function alphago(ctx, t) {
    typeOn(ctx, 'CONTOH TENARNYA', -860, -400, t, A.contoh - .05, MN(20), { ls: 5, cps: 40, col: ivo(.6) });
    fall(ctx, 'ALPHAGO ZERO', -862, -280, t, A.alphago - .12, DSP(124), { ls: 3 });
    typeOn(ctx, 'DEEPMIND · 2017', -858, -225, t, A.deepmind - .05, MN(22), { ls: 4, cps: 40, col: ivo(.7) });
    plate(ctx, IM.go, t, -430, 150, 860, 520, kq(t, A.contoh, .6), { t0: A.contoh });
    evid(ctx, IM.ago, 450, -170, 820, t, A.contoh + .15, { tab: 'nature.com · 19 Okt 2017', hl: [[.51, .165, .35, .075, A.nggak3], [.036, .285, .225, .075, A.nggak3 + .25]] });
    const tw = txt(ctx, 'CONTOH MAIN MANUSIA', 450, 160, t, A.nggak3 - .35, DSP(82), { align: 'center', ls: 3 });
    if (tw) strike(ctx, 450 - tw / 2, 450 + tw / 2, 160, 82, t, A.nggak3 - .04);
    slab(ctx, 'CUMA ATURAN MAIN', 450, 270, t, A.cuma2 - .05, { size: 32, align: 'center', lime: true });
    ['hitam & putih jalan gantian', 'batu yang terkepung diangkat', 'wilayah terluas menang'].forEach((s, i) =>
      typeOn(ctx, '· ' + s, 160, 350 + i * 36, t, A.aturan + i * .3, MN(19, 400), { cps: 50, col: ivo(.75) }));
    srcTag(ctx, 'Nature, 19 Okt 2017', -840, 476, t, A.contoh + .4);
  }

  // ── S8 · split-flap scoreboard 100 : 0 ────────────────────────────────────────────────────────────────────
  function board(ctx, t) {
    const sh = (t0, a) => t > t0 && t < t0 + .5 ? a * Math.exp(-(t - t0) * 9) * Math.sin((t - t0) * 55) : 0;
    ctx.save(); ctx.translate(sh(A.seratus - .06, 14) + sh(A.nol - .06, 10), sh(A.seratus - .06, 6));
    fall(ctx, 'ALPHAGO ZERO', -390, -190, t, A.habis - .1, DSP(84), { align: 'center', ls: 3 });
    fall(ctx, 'VERSI LAMA', 390, -190, t, A.versi - .1, DSP(84), { align: 'center', ls: 3 });
    txt(ctx, 'yang pernah ngalahin juara dunia', 390, -128, t, A.juara - .5, SRF(32), { align: 'center', col: ivo(.7) });
    const L = ['1', '0', '0'], R = ['', '', '0'];
    for (let i = 0; i < 3; i++) {
      const kL = pop(t, A.habis + .1 + i * .08, .55, .3), kR = pop(t, A.versi + i * .08, .55, .3);
      if (kL > 0) { ctx.save(); ctx.translate(-556 + i * 166, 90); ctx.scale(1, Math.min(1.1, kL)); flap(ctx, 0, 0, 150, 230, t, A.skornya - .15 + i * .05, A.seratus - .06 + i * .03, L[i], i + 1); ctx.restore(); }
      if (kR > 0) { ctx.save(); ctx.translate(224 + i * 166, 90); ctx.scale(1, Math.min(1.1, kR)); flap(ctx, 0, 0, 150, 230, t, A.skornya - .1 + i * .05, i < 2 ? A.telak + .3 + i * .1 : A.nol - .06, R[i], i + 7); ctx.restore(); }
    }
    if (t > A.skornya - .15) { const k = pop(t, A.skornya - .15, .5, .25); setFont(ctx, DSP(200), 0); ctx.fillStyle = INK; ctx.globalAlpha *= clamp(k); ctx.textAlign = 'center'; ctx.fillText(':', 0, 160); ctx.textAlign = 'left'; ctx.globalAlpha = 1; }
    ctx.restore();
    markLine(ctx, 'skornya ', 'TELAK', '', 0, 400, t, A.skornya - .25, A.telak, SRF(62));
  }

  // ── S9 · DeepSeek-R1 ──────────────────────────────────────────────────────────────────────────────────────
  function deepseek(ctx, t) {
    evid(ctx, IM.ds, 0, -150, 1150, t, A.jurus - .1, { tab: 'nature.com · 17 Sep 2025', hl: [[.21, .285, .47, .075, A.cobacoba2]] });
    const o1 = gone(t, A.nalarnya - .3, .3);
    if (o1 > 0) { ctx.save(); ctx.globalAlpha *= o1;
      fall(ctx, 'DEEPSEEK-R1', 0, 240, t, A.deepseek - .12, DSP(120), { align: 'center', ls: 4 });
      typeOn(ctx, 'JURNAL NATURE · SEPTEMBER 2025', 0, 300, t, A.nature - .15, MN(22), { align: 'center', ls: 4, cps: 45, col: ivo(.7) });
      ctx.restore(); }
    markLine(ctx, 'nalarnya dipancing lewat ', 'COBA-COBA', ' murni', 0, 236, t, A.nalarnya - .15, A.cobacoba2, SRF(60));
    const tw = txt(ctx, 'tanpa contoh langkah mikir manusia', 0, 350, t, A.tanpa - .3, SRF(46), { align: 'center', col: ivo(.75) });
    if (tw) { setFont(ctx, SRF(46), 0); const a = ctx.measureText('tanpa ').width; strike(ctx, -tw / 2 + a, tw / 2, 350, 46, t, A.tanpa - .04); }
    srcTag(ctx, 'Nature, 17 Sep 2025', -840, 450, t, A.jurus + .3);
  }

  // ── S10 · ampuh buat soal yang jawabannya pasti ──────────────────────────────────────────────────────────
  function exact(ctx, t) {
    txt(ctx, 'cara ini', 0, -390, t, A.cara - .1, SRF(50), { align: 'center', col: ivo(.7) });
    fall(ctx, 'AMPUH BANGET', 0, -200, t, A.ampuh - .1, DSP(200), { align: 'center', ls: 6 });
    markLine(ctx, 'buat soal yang jawabannya ', 'PASTI', '', 0, -40, t, A.pasti - .5, A.pasti, SRF(62));
    const w1 = fall(ctx, '17 × 3 = 51', -800, 250, t, A.matematika2 - .08, DSP(140), { ls: 4 });
    if (w1) check(ctx, -800 + w1 + 70, 200, 42, t, A.matematika2 + .25);
    txt(ctx, 'MATEMATIKA', -800, 320, t, A.matematika2, MN(18), { ls: 5, col: ivo(.6) });
    if (t > A.kode - .1) { typeOn(ctx, 'assert jumlah(2, 3) == 5', 130, 205, t, A.kode - .1, MN(30, 400), { cps: 60 });
      typeOn(ctx, '→ LULUS', 130, 255, t, A.kode + .3, MN(24), { cps: 40, ls: 3, col: LT }); check(ctx, 700, 200, 42, t, A.kode + .35);
      txt(ctx, 'KODE PROGRAM', 130, 320, t, A.kode, MN(18), { ls: 5, col: ivo(.6) }); }
  }

  // ── S11 · the ladder hits the ceiling: "mentok di bekal model dasarnya" ─────────────────────────────────────
  function ladder(ctx, t) {
    const o1 = gone(t, A.studi - .35, .3);
    if (o1 > 0) { ctx.save(); ctx.globalAlpha *= o1; drawOn(ctx, 'TAPI ADA TAPINYA.', 0, 0, t, A.tapi - .1, DSP(180), { ls: 6, dur: .75 }); ctx.restore(); }
    if (t < A.studi - .3) return;
    const bump = (t0, a) => t > t0 && t < t0 + .6 ? a * Math.exp(-(t - t0) * 8) * Math.sin((t - t0) * 40) : 0;
    const cy = lerp(-700, -330, E.snap(inv(A.studi - .25, A.studi + .35, t))) + bump(A.mentok - .03, 10) + bump(A.modalnya - .04, 7);
    ctx.fillStyle = INK; ctx.fillRect(-960, cy - 30, 1920, 60);
    typeOn(ctx, 'BEKAL MODEL DASAR', 0, cy + 9, t, A.bekal - .1, MN(24), { align: 'center', ls: 6, cps: 40, col: LIGHTTXT });
    const kl = E.outCubic(inv(A.studi, A.studi + .7, t)), top = lerp(470, cy + 30, kl);
    ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-270, 470); ctx.lineTo(-270, top); ctx.moveTo(-130, 470); ctx.lineTo(-130, top);
    for (let y = 430; y > top + 10; y -= 64) { ctx.moveTo(-270, y); ctx.lineTo(-130, y); } ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-860, 472); ctx.lineTo(860, 472); ctx.stroke();
    const s = 80, yb0 = 470 - .62 * s, yTop = cy + 30 + 1.53 * s, kc = inv(A.hasil - .1, A.mentok - .03, t), st = kc * 6, stk = Math.floor(st) + E.outCubic(st % 1);
    let yb = lerp(yb0, yTop, Math.min(1, stk / 6)) - bump(A.mentok - .03, -12);
    if (t > A.jago - .1) yb = yTop + 4 + Math.sin((t - A.jago) * 6) * 3;
    popAt(ctx, -200, yb, t, A.studi + .2, () => robot(ctx, 0, 0, s, { look: kc >= 1 ? 0 : -.2, lime: true, lh: [-.9 * s, -.3 * s], rh: [.9 * s, -.5 * s], blink: t > A.mentok - .03 && t < A.mentok + .25 }), { from: .5 });
    if (t > A.mentok - .03 && t < A.mentok + .5) { const q = t - A.mentok + .03; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.globalAlpha = 1 - q / .5;
      for (let i = 0; i < 5; i++) { const a = Math.PI * (.15 + i * .175), r0 = 70 + q * 120; ctx.beginPath(); ctx.moveTo(-200 + Math.cos(a) * r0, cy + 30 + Math.sin(a) * r0 * .6); ctx.lineTo(-200 + Math.cos(a) * (r0 + 30), cy + 30 + Math.sin(a) * (r0 + 30) * .6); ctx.stroke(); }
      ctx.globalAlpha = 1; }
    typeOn(ctx, 'STUDI 2025', -860, cy + 110, t, A.studi + .1, MN(20), { ls: 5, cps: 40, col: ivo(.6) });
    txt(ctx, 'tetap mentok.', -860, cy + 180, t, A.mentok - .1, SRF(56));
    txt(ctx, 'muridnya makin jago,', 60, 40, t, A.jago - .3, SRF(54));
    markLine(ctx, 'tapi nggak jauh lewatin ', 'modalnya', '.', 60, 130, t, A.nggak4 - .15, A.modalnya, SRF(52), { align: 'left' });
    srcTag(ctx, 'Yue dkk., arXiv, 18 Apr 2025', -840, 440, t, A.studi + .3);
  }

  // ── S12 · Era of Experience: human text runs into a wall, experience runs off the edge ─────────────────────
  function era(ctx, t) {
    evid(ctx, IM.era, -360, -60, 960, t, A.peneliti - .1, { crop: [.39, .30, .43, .52], tab: 'storage.googleapis.com · DeepMind',
      hl: [[.228, .042, .567, .077, A.era], [.023, .935, .42, .048, A.terbatas]] });
    typeOn(ctx, 'ESAI PENELITI DEEPMIND', 220, -330, t, A.esai - .1, MN(20), { ls: 5, cps: 40, col: ivo(.6) });
    txt(ctx, 'pesannya simpel:', 220, -255, t, A.pesannya - .15, SRF(50));
    typeOn(ctx, 'TULISAN MANUSIA', 220, -160, t, A.tulisan - .15, MN(20), { ls: 4, cps: 45 });
    if (t > A.tulisan - .1) { const k = E.inCubic(inv(A.tulisan - .1, A.terbatas - .05, t)), bb = t > A.terbatas - .05 ? -10 * Math.exp(-(t - A.terbatas) * 10) * Math.abs(Math.sin((t - A.terbatas) * 30)) : 0;
      ctx.fillStyle = INK; ctx.fillRect(220, -138, 420 * k + bb, 44); ctx.fillRect(650, -180, 14, 128); }
    fall(ctx, 'TERBATAS', 220, -10, t, A.terbatas - .08, DSP(90), { ls: 3 });
    typeOn(ctx, 'PENGALAMAN', 220, 120, t, A.pengalaman2 - .15, MN(20), { ls: 4, cps: 45 });
    if (t > A.pengalaman2 - .05) { const k = E.inOutCubic(inv(A.pengalaman2 - .05, A.pengalaman2 + 1.1, t)), x1 = 220 + 900 * k;
      ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(220, 160); ctx.lineTo(x1, 160); ctx.moveTo(x1 - 22, 142); ctx.lineTo(x1, 160); ctx.lineTo(x1 - 22, 178); ctx.stroke(); }
    fall(ctx, 'NGGAK.', 220, 290, t, A.nggak5 - .08, DSP(90), { ls: 3, col: LT });
    srcTag(ctx, 'Google DeepMind (Silver & Sutton), Apr 2025', -840, 450, t, A.peneliti + .3);
  }

  // ── S13 · jalan ketiga: real world (robot arm footage) ─────────────────────────────────────────────────────
  function world(ctx, t) {
    plate(ctx, IM.robot, t, 0, 0, 1640, 860, kq(t, A.jalan - .3, .6), { t0: A.jalan - .3, dim: .5 });
    node(ctx, -690, -250, 3, t, A.jalan - .05, 44);
    typeOn(ctx, 'JALAN KETIGA', -626, -242, t, A.ketiga - .05, MN(22), { ls: 6, cps: 40, col: LIGHTTXT });
    txt(ctx, 'paling nampar gengsi mesin:', -734, -140, t, A.nampar - .2, SRF(54), { col: LIGHTTXT });
    drawOn(ctx, 'BELAJAR DARI DUNIA NYATA', -734, 60, t, A.dunia - .35, DSP(150), { align: 'left', ls: 4, col: LIGHTTXT, dur: .9 });
    slab(ctx, 'LEBIH IRIT', -734, 180, t, A.irit2 - .05, { size: 34, lime: true });
  }

  // ── S14 · Michael Frank, Stanford ────────────────────────────────────────────────────────────────────────
  function frank(ctx, t) {
    evid(ctx, IM.su, -150, -210, 1180, t, A.peneliti2 - .1, { tab: 'engineering.stanford.edu · 9 Feb 2024', hl: [[.495, .6, .11, .08, A.ngebandingin]] });
    slab(ctx, 'MICHAEL FRANK · STANFORD', -740, 90, t, A.michael - .05, { size: 26 });
    plate(ctx, IM.anak, t, 560, 250, 520, 340, kq(t, A.peneliti2 + .3, .55), { t0: A.peneliti2 });
    srcTag(ctx, 'Stanford Engineering, 9 Feb 2024', -840, 450, t, A.peneliti2 + .2);
  }

  // ── S15 · GPT-3's book tower (the camera tilts up with it) vs one thin book ──────────────────────────────────
  const BOOKC = ['#15160F', '#4A4B42', '#8F8D80'];
  function tower(ctx, t) {
    const BH = 28, n = 1100 * E.inOutCubic(inv(A.gpt3 - .1, A.miliar + .5, t)), Ht = n * BH, vy = Math.max(0, Ht - 760), floor = 420 + vy;
    ctx.save(); ctx.beginPath(); ctx.rect(-960, -560, 960, 1120); ctx.clip();
    for (let c = 0; c < 3; c++) { ctx.beginPath();
      for (let i = Math.max(0, Math.floor((floor - 600) / BH)); i < Math.min(n, (floor + 600) / BH); i++) { if (i % 3 !== c && !(c === 0 && rnd(i * 1.7) < .2)) continue;
        const y = floor - (i + 1) * BH, w = 300 + rnd(i + .5) * 90, x = -620 - w / 2 + (rnd(i * 2.3) - .5) * 26, f = Math.min(1, n - i); ctx.rect(x, y + 2, w * f, BH - 3); }
      ctx.fillStyle = BOOKC[c]; ctx.fill(); }
    ctx.fillStyle = PAPER; ctx.beginPath();                                     // page edges
    for (let i = Math.max(0, Math.floor((floor - 600) / BH)); i < Math.min(n - 1, (floor + 600) / BH); i++) { const y = floor - (i + 1) * BH, w = 300 + rnd(i + .5) * 90, x = -620 - w / 2 + (rnd(i * 2.3) - .5) * 26;
      ctx.rect(x + w - 22, y + 7, 14, BH - 13); }
    ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-900, floor + 1); ctx.lineTo(-40, floor + 1); ctx.stroke(); ctx.restore();
    ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -440); ctx.lineTo(0, 440); ctx.stroke();
    typeOn(ctx, 'GPT-3', -390, -300, t, A.gpt3 - .05, MN(26), { ls: 6, cps: 30 });
    if (t > A.lima - .25) { setFont(ctx, DSP(230), 2); ctx.fillStyle = INK; ctx.fillText(fmt(Math.round(countTo(0, 500, t, A.lima - .25, .9))), -394, -70); }
    fall(ctx, 'MILIAR KATA', -390, 10, t, A.miliar - .08, DSP(74), { ls: 3 });
    typeOn(ctx, 'ANAK 16 BULAN', 120, -300, t, A.anak - .05, MN(26), { ls: 6, cps: 30 });
    fall(ctx, '±15', 116, -70, t, A.juta - .6, DSP(230), { ls: 2 });
    fall(ctx, 'JUTA KATA', 120, 10, t, A.juta - .08, DSP(74), { ls: 3 });
    const kb = E.outCubic(inv(A.juta - .2, A.juta + .02, t)), bb = t > A.juta ? 6 * Math.exp(-(t - A.juta) * 12) * Math.sin((t - A.juta) * 50) : 0;
    if (kb > 0) { const y = lerp(-500, 392, kb) + bb; ctx.fillStyle = INK; ctx.fillRect(470, y, 320, 26); ctx.fillStyle = PAPER; ctx.fillRect(470 + 300, y + 6, 14, 14); }
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, 420); ctx.lineTo(880, 420); ctx.stroke();
    txt(ctx, 'cuma segini.', 120, 120, t, A.cuma3 - .1, SRF(54), { col: ivo(.75) });
  }

  // ── S16 · ±33.000× — the numeral is made of words (huruf sebagai materi) ───────────────────────────────────────
  let NUM, TEX;
  function numTex(t) {
    if (!TEX) { const [c, g] = mk(1024, 1024); g.fillStyle = 'rgba(241,239,230,.42)'; setFont(g, `italic 380 30px "${SER}"`, 1);
      for (let r = 0; r < 28; r++) { let s = ''; for (let i = 0; i < 40; i++) s += KATA[Math.floor(rnd(r * 41 + i * 3.7) * KATA.length)] + ' '; g.fillText(s, -rnd(r) * 260, (r + 1) * 1024 / 28 - 8); }
      TEX = c; }
    if (!NUM) NUM = mk(1900, 460);
    const [c, g] = NUM; g.clearRect(0, 0, 1900, 460); g.globalCompositeOperation = 'source-over'; setFont(g, DSP(400), 8); g.textAlign = 'center'; g.fillStyle = INK; g.fillText('±33.000', 950, 400);
    g.globalCompositeOperation = 'source-atop'; const oy = (t * 40) % 1024; for (let yy = -oy; yy < 460; yy += 1024) for (let xx = 0; xx < 1900; xx += 1024) g.drawImage(TEX, xx, yy);
    g.globalCompositeOperation = 'source-over'; return c;
  }
  function ratio(ctx, t) {
    typeOn(ctx, 'SELISIHNYA KIRA-KIRA', 0, -330, t, A.selisihnya - .05, MN(26), { align: 'center', ls: 6, cps: 35, col: ivo(.7) });
    const s = t - (A.tiga2 - .06);
    if (s > 0) { const k = Math.min(1.15, pop(t, A.tiga2 - .06, .5, .26)), sh = s < .5 ? 16 * Math.exp(-s * 9) * Math.sin(s * 60) : 0, c = numTex(t);
      ctx.save(); ctx.translate(sh - 90, 30); ctx.scale(lerp(1.7, 1, Math.min(1, k)), lerp(1.7, 1, Math.min(1, k))); ctx.globalAlpha *= clamp(s / .06);
      ctx.drawImage(c, -950, -400 + 140); ctx.restore(); }
    const kx = pop(t, A.kali - .05, .45, .25);
    if (kx > 0) { ctx.save(); ctx.translate(700, -10); ctx.rotate(-6 * D2R); ctx.scale(Math.min(1.15, kx), Math.min(1.15, kx)); setFont(ctx, DSP(300), 0); ctx.textAlign = 'center';
      ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.strokeText('×', 0, 100); ctx.fillStyle = LIME; ctx.fillText('×', 0, 100); ctx.textAlign = 'left'; ctx.restore(); }
    txt(ctx, 'kali lipat!', 0, 330, t, A.lipat - .2, SRF(76), { align: 'center' });
  }

  // ── S17 · deadpan: minta susu ─────────────────────────────────────────────────────────────────────────────
  function susu(ctx, t) {
    plate(ctx, IM.anak, t, 0, -10, 1640, 880, kq(t, A.dan - .3, .5), { t0: A.dan - .3, dim: .35 });
    typeOn(ctx, 'DAN BOCAHNYA…', -760, -330, t, A.dan, MN(24), { ls: 6, cps: 30, col: LIGHTTXT });
    markLine(ctx, 'udah pinter banget ', 'minta susu', '.', 0, 330, t, A.pinter - .3, A.minta, SRF(74), { col: LIGHTTXT });
  }

  // ── S18 · recap: the three paths, two fade, path one keeps one big question ───────────────────────────────────
  function recap(ctx, t) {
    const d = .8 * E.inOutCubic(inv(A.cuma4 - .1, A.cuma4 + .5, t));
    paths(ctx, t, A.ketiga2 - .3, [A.ketiga2 - .2, A.ketiga2 - .1, A.ketiga2], [1, 1 - d, 1 - d]);
    if (t > A.pertama2 - .05) { const q = (t - A.pertama2 + .05) % 1.1; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.globalAlpha = 1 - q / 1.1;
      ctx.beginPath(); ctx.arc(-560, -20, 54 + q * 90, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
    popAt(ctx, -330, -20, t, A.pertanyaan - .05, () => { setFont(ctx, DSP(260), 0); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('?', 0, 90); ctx.textAlign = 'left'; }, { from: .3, rot: 8 });
    const o1 = gone(t, A.cuma4 - .2, .3);
    if (o1 > 0) { ctx.save(); ctx.globalAlpha *= o1; txt(ctx, 'keliatannya menjanjikan…', 0, -380, t, A.menjanjikan - .15, SRF(60), { align: 'center' }); ctx.restore(); }
    markLine(ctx, 'jalan pertama nyimpen ', 'satu pertanyaan gede', '', 0, -380, t, A.cuma4 - .05, A.pertanyaan, SRF(60));
  }

  // ── S19 · bridge: a robot reads a sheet written by a robot; the room dims; the question ─────────────────────────
  function bridge(ctx, t) {
    const z = 1 + .22 * E.inOutCubic(inv(A.gimana - .3, A.gimana + 3.5, t)); ctx.save(); ctx.scale(z, z); ctx.translate(40 * (z - 1) * 4, 0);
    popAt(ctx, -330, 230, t, A.gimana - .45, () => robot(ctx, 0, 0, 190, { look: 1, lime: true, rh: [.95 * 190, -.25 * 190], lh: [.7 * 190, .05 * 190], blink: (t % 2.7) < .12 }), { from: .7, rise: 30 });
    popAt(ctx, 160, 60, t, A.gimana - .35, () => { ctx.rotate(5 * D2R); paper(ctx, 420, 540, 12);
      setFont(ctx, MN(18), 4); ctx.fillStyle = INK; ctx.fillText('DITULIS OLEH AI', -170, -200); ctx.fillRect(-170, -184, 340, 3);
      robot(ctx, 140, -228, 22, {});
      ctx.fillStyle = ivo(.5); for (let i = 0; i < 9; i++) ctx.fillRect(-170, -140 + i * 42, i % 3 === 2 ? 220 : 340, 11);
      robot(ctx, 120, 210, 34, { lime: true }); }, { from: .8, rise: 50 });
    ctx.restore();
    const dk = .84 * E.inOutCubic(inv(A.gimana - .2, A.gimana + .6, t)); if (dk > 0) { ctx.fillStyle = `rgba(11,12,9,${dk})`; ctx.fillRect(-1200, -800, 2400, 1600); }
    txt(ctx, 'gimana kalau AI terus-terusan belajar dari', 0, -30, t, A.gimana + .2, SRF(66), { align: 'center', col: LIGHTTXT });
    markLine(ctx, '', 'TULISAN AI?', '', 0, 120, t, A.tulisan2 - .2, A.ai9 - .1, DSP(150), { col: LIGHTTXT, ls: 6 });
  }

  const ST = [
    { at: 0, name: 'Tiga jalan keluar', draw: opener, dist: [1600, 1480] },
    { at: A.pertama, via: 'whip', name: 'AI ngajarin AI', draw: teach, dist: [1580, 1450] },
    { at: A.contohnya, via: 'push', name: 'Phi-4', draw: phi, dist: [1560, 1450] },
    { at: A.cuma, via: 'rise', name: 'AI Index 2026', draw: aiIndex, dist: [1560, 1460] },
    { at: A.kedua, via: 'whip', name: 'AI belajar sendiri', draw: rl, dist: [1600, 1460] },
    { at: A.mirip2, via: 'truck', name: 'Belajar sepeda', draw: cycle, dist: [1580, 1450] },
    { at: A.contoh, via: 'whip', name: 'AlphaGo Zero', draw: alphago, dist: [1560, 1460] },
    { at: A.habis, via: 'push', name: 'Papan skor 100 : 0', draw: board, dist: [1600, 1440] },
    { at: A.jurus, via: 'whip', name: 'DeepSeek-R1', draw: deepseek, dist: [1560, 1460] },
    { at: A.cara, via: 'rise', name: 'Soal yang pasti', draw: exact, dist: [1580, 1460] },
    { at: A.tapi, via: 'push', name: 'Mentok di plafon', draw: ladder, dist: [1600, 1460] },
    { at: A.peneliti, via: 'whip', name: 'Era of Experience', draw: era, dist: [1560, 1450] },
    { at: A.jalan, via: 'push', name: 'Dunia nyata', draw: world, dist: [1560, 1440] },
    { at: A.peneliti2, via: 'whip', name: 'Michael Frank', draw: frank, dist: [1560, 1460] },
    { at: A.gpt3, via: 'rise', name: 'Menara buku', draw: tower, dist: [1580, 1460] },
    { at: A.selisihnya, via: 'push', name: '±33.000×', draw: ratio, dist: [1600, 1460] },
    { at: A.dan, via: 'whip', name: 'Minta susu', draw: susu, dist: [1560, 1460] },
    { at: A.ketiga2, via: 'push', name: 'Satu pertanyaan gede', draw: recap, dist: [1600, 1480] },
    { at: A.gimana, via: 'push', name: 'Tulisan AI?', draw: bridge, dist: [1540, 1400] },
  ];
  return makeChapter({ B, ST, load, label: 'BAB 3 · TIGA JALAN KELUAR' });
}
