// Pengantar "SATU BARIS" — varian TANGGA (KARTU-GAYA S1) untuk "Apa Itu AGI? Mungkinkah AI Setara Manusia?". 2026-11-16.
// Dasar: RNC "Satu Baris" v2 (Indo vs AS, src/film.js.bak-indovsas). Bahasanya tetap SATU BARIS dalam kedalaman, tapi barisnya kini
// TANGGA yang naik: tiap bukti satu anak tangga lebih TINGGI dan lebih JAUH, kamera mendaki ke depan. Ruang: ruang server malam
// (foto lorong server Ahri, gelap dan tak berwarna; anak tangga = muka rak dengan LED gading). Lime tetap satu-satunya aksen.
//  0 Cold open   : "AGI sudah tiba." di ruang gelap, lalu kamera naik ke anak tangga pertama.
//  1 Hook (8 anak tangga): TNW judul · TNW tanggal + ikon X · ARC Prize · CNBC · grafik · batang 62,7 · batang 99,9 · ibarat ujian
//    (dua panel kaca UI berisi soal yang SAMA: satu apa adanya, satu dipasangi alat bantu sendiri). Latar = klip dokumenter full-bleed.
//    "Tunggu… putar ulang": kamera MUNDUR menuruni tangga dengan scrubber digital, lalu naik lagi ke ARC Prize.
//    Angka dibangun digit demi digit tepat saat diucapkan (enam·dua·koma·tujuh·persen).
//  2 Twist       : "Padahal AI-nya sama. Soalnya juga sama. Bedanya cuma…" → bidang lime "CARA NGETESNYA." (sama persis dengan VO).
//  3 Pertanyaan  : zoom maju menembus tiga bidang tipe (dunia terang).
//  4 Channel     : tangga melesat, rem di wordmark.   5 Disclaimer: sumber riset, "Ini video EDUKASI."
//  6 Saklar      : di ujung tangga berdiri saklar dinding "AGI". "…kayak saklar lampu? Klik, langsung nyala." → saklar ON, lampu MENYALA.
//    "Atau pelan-pelan… satu anak tangga demi satu?" → kamera naik satu anak tangga per ketukan (lis lime menandai yang sudah dinaiki).
//  7 Judul (gelap): menyelam ke puncak tangga → lime → "SAKLAR ATAU / TANGGA?" (TANGGA = bidang lime) + subjudul gading ≥ 2,4 s.
//  Revisi 2026-11-17 (catatan Ikhsan): kata "bungkus" diganti CARA NGETESNYA; foto/klip jadi latar full-bleed; teks kontras tinggi.
// Setiap ketukan duduk di kata yang diucapkan: src/timeline.json (tools/place.py).
import { W, H, FPS, clamp, inv, lerp, E } from './engine.js';
import { CFG, COL, DISP, SER, MONO, D2R, rnd, noise1, setFont, mk } from './lib.js';
import { loadTx, drawTx } from './txlib.js';
import { saklar, diukur } from './agi.js';
import { srcTag, loadVid, grainRect } from './kit.js';

export const EP = {
  hook: [
    { img: 'doc1', side: 0, w: 1560, yo: -250, top: 690, max: 250, lead: ['Menurut'], hero: 'JENSEN HUANG', split: [0, 7], tail: 'pendiri Nvidia',
      hl: { kind: 'line', x0: .494, x1: .823, y: .93 }, src: 'Sumber: The Next Web, 7 Sep 2026', lit: ['#FFFFFF', '#9A9A92'] },
    { img: 'doc2', side: 1, w: 860, yo: 10, top: 500, max: 330, label: ['DI', 'X'], lead: ['dulu', 'Twitter,'], hero: 'SEP 2026', split: [0, 4],
      hl: { kind: 'ring', x: .28, y: .735, r: .075 }, src: 'Jensen Huang di X, 6 Sep 2026 (waktu AS)', lit: ['#FFFFFF', '#9A9A92'] },
    { img: 'doc3', side: 0, w: 1500, yo: -235, top: 700, max: 250, label: ['MINGGU', 'YANG SAMA'], lead: ['lembaga', 'penguji', 'netral'],
      hero: 'ARC PRIZE', split: [0, 4], tail: 'ikut mengetes', src: 'Sumber: ARC Prize, Sep 2026', lit: ['#E8E8E2', '#80807A'] },
    { img: 'doc4', side: -1, w: 900, yo: 0, top: 500, max: 330, lead: ['yang', 'ramai', 'dipuji'], hero: 'GPT-6 ASTRA', split: [0, 6],
      src: 'Sumber: CNBC Indonesia, 4 Sep 2026', lit: ['#FFFFFF', '#9A9A92'] },
    { img: 'graf', side: 1, w: 900, yo: 0, top: 500, max: 330, lead: ['Hasilnya?'], hero: 'DUA NILAI', split: [0, 4], tail: 'yang bedanya jauh sekali.',
      src: 'Sumber: ARC Prize, 3 Sep 2026', lit: ['#F4F4EE', '#8A8A82'] },
    { img: 'grafL', side: -1, w: 330, yo: 0, top: 520, max: 420, label: ['CARA TES', 'STANDAR'], ukur: 'penguji netral', hero: '62,7%', split: [0, 1, 2, 3, 4],
      src: 'Sumber: ARC Prize, 3 Sep 2026', lit: ['#F4F4EE', '#8A8A82'] },
    { img: 'grafR', side: 1, w: 300, yo: -20, top: 520, max: 420, label: ['CARA TES', 'RACIKAN PEMBUATNYA'], ukur: 'pembuatnya sendiri', hero: '99,9%', split: [0, 1, 2, 3, 4],
      src: 'Sumber: ARC Prize, 3 Sep 2026', lit: ['#F4F4EE', '#8A8A82'] },
    { proc: 'exam', side: 0, w: 1440, yo: 10, src: 'ILUSTRASI · ibarat ujian', lead: ['Ibaratnya,', 'ujian', 'yang', 'sama.'] },
  ],
  twist: [['Padahal', 'AI-nya', 'sama.'], ['Soalnya', 'juga', 'sama.'], ['Bedanya', 'cuma…']], twistHero: 'CARA NGETESNYA.',
  q: [{ lead: 'Nah,', hero: 'PENASARAN?' }, { lead: 'Sebenarnya,', hero: 'AI SEKARANG', split: [0, 3] },
    { lead: ['sudah', 'setara'], mid: 'MANUSIA', hero: 'ATAU BELUM?', hi: 5 }],
  dLead: ['Angka', 'di', 'video', 'ini', 'dari', 'sumber', 'riset:'],
  src: [['ARC PRIZE', 'METR'], ['ARXIV', 'LAPORAN AI']], dTail: ['Ini', 'video'], dHero: 'EDUKASI.',
  tanya: ['Jadi…', 'sebenarnya', 'apa', 'itu'], tanya2: ['Datang', 'tiba-tiba,', 'seperti', 'saklar', 'lampu?'], nyala: ['langsung', 'menyala.'],
  climb: [['Atau', 'pelan-pelan,'], ['seperti', 'naik', 'tangga,'], ['satu', 'anak', 'tangga', 'demi', 'satu?']],
  tools: ['KALKULATOR', 'CATATAN RUMUS', 'COBA ULANG'],
  mid: 'SAKLAR ATAU', hero: 'TANGGA?', sub: 'AGI datang tiba-tiba, atau pelan-pelan?',
};
const ROOM = '#0B0C09', IVORY = '#F1EFE6', INK = '#11120E', BL = [0, 4, 9, 17, 30, 50], ZK = 0.66, RISE = 250, FLOOR = 360, XO = 450, ZF = 6, VY0 = 540, WM = 8, SW = 10;
const sOf = e => 1 / (1 + ZK * Math.max(e, -1.2));

// ── type helpers ────────────────────────────────────────────────────────────────────────────────────
function fitDisp(ctx, str, maxW, maxSize) {
  setFont(ctx, `400 100px "${DISP}"`); const size = Math.min(maxSize, maxW / ctx.measureText(str).width * 100);
  setFont(ctx, `400 ${size}px "${DISP}"`);
  return { str, size, w: ctx.measureText(str).width, cap: ctx.measureText('H').actualBoundingBoxAscent,
    xs: Array.from(str, (_, i) => ctx.measureText(str.slice(0, i)).width), cw: Array.from(str, ch => ctx.measureText(ch).width) };
}
function fall(ctx, L, x, base, t, start, col) {        // letters fall in from the lens
  setFont(ctx, `400 ${L.size}px "${DISP}"`);
  for (let i = 0; i < L.str.length; i++) {
    if (L.str[i] === ' ') continue;
    const si = t - start(i); if (si <= 0) continue;
    const kk = E.expo16(si / .2), sc = lerp(2.2, 1, kk), cx = x + L.xs[i] + L.cw[i] / 2, cy = base - L.cap / 2;
    ctx.save(); ctx.translate(cx, cy + (1 - kk) * 60); ctx.scale(sc, sc); ctx.globalAlpha *= inv(0, .04, si);
    ctx.fillStyle = typeof col === 'function' ? col(i) : col; ctx.fillText(L.str[i], -L.cw[i] / 2, L.cap / 2); ctx.restore();
  }
}
const splitStart = (split, times, gap = .022) => j => { let g = 0; for (let q = 0; q < split.length; q++) if (j >= split[q]) g = q; return times[g] + (j - split[g]) * gap; };
function flyWord(ctx, str, x, base, L, t, ts, side, col) {   // a whole word arrives from the lens, from its side, blurred → sharp
  const s = t - ts; if (s <= 0) return;
  setFont(ctx, `400 ${L.size}px "${DISP}"`); const w = ctx.measureText(str).width, k = E.outQuart(s / .42), sc = lerp(2.7, 1, k);
  ctx.save(); ctx.translate(x + w / 2 + side * (1 - k) * 640, base - L.cap / 2); ctx.scale(sc, sc);
  ctx.globalAlpha *= inv(0, .06, s); const b = (1 - k) * 34; if (b > .7) ctx.filter = `blur(${b.toFixed(1)}px)`;
  ctx.fillStyle = col; ctx.fillText(str, -w / 2, L.cap / 2); ctx.restore();
}
function ghost(ctx, L, x, base, k, t, start, col) {     // outline of the word to come; each letter is filled when it is spoken
  if (k <= 0) return; setFont(ctx, `400 ${L.size}px "${DISP}"`);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 12, base - L.cap - 24, (L.w + 24) * k, L.cap + 48); ctx.clip();
  ctx.lineWidth = 2.5; ctx.strokeStyle = col;
  for (let i = 0; i < L.str.length; i++) if (L.str[i] !== ' ' && t < start(i)) ctx.strokeText(L.str[i], x + L.xs[i], base);
  ctx.restore();
}
function wipe(ctx, str, x, base, k, size, align = 'left') {      // font set by the caller
  if (k <= 0) return; const w = ctx.measureText(str).width, x0 = align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, base - size * 1.15, (w + 46) * k, size * 1.7); ctx.clip();
  ctx.fillText(str, x0, base + (1 - k) * 16); ctx.restore();
}
function wipeWords(ctx, words, starts, x, base, size, t, align = 'left') {   // the reveal follows the narrator word by word
  const str = words.join(' '), full = ctx.measureText(str).width, x0 = align === 'right' ? x - full : align === 'center' ? x - full / 2 : x;
  let acc = 0, rev = 0;
  words.forEach((_, j) => { const end = ctx.measureText(words.slice(0, j + 1).join(' ')).width; rev += (end - acc) * E.outCubic(inv(starts[j], starts[j] + .2, t)); acc = end; });
  if (rev <= 0) return;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, base - size * 1.15, rev + 24, size * 1.7); ctx.clip(); ctx.fillText(str, x0, base); ctx.restore();
}
const hitOf = (t, list) => { let h = 0; for (const [th, amp] of list) if (t >= th) h = Math.max(h, amp * Math.exp(-(t - th) * 15)); return h; };
const lightBg = ctx => { const gr = ctx.createRadialGradient(960, 480, 80, 960, 540, 1300); gr.addColorStop(0, '#FAFAF6'); gr.addColorStop(.6, '#F0EFE9'); gr.addColorStop(1, '#DDDCD3'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); };
function wipeIn(ctx, edge, fromLeft, inner) {            // a slanted edge crosses the frame; inner() is the world behind it
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.save(); ctx.beginPath();
  if (fromLeft) { ctx.moveTo(-10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(-10, H + 10); }
  else { ctx.moveTo(W + 10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(W + 10, H + 10); }
  ctx.closePath(); ctx.clip(); inner(); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
}
const tc = v => { const s = Math.max(0, v); return `${String(Math.floor(s / 3600) % 24).padStart(2, '0')}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(Math.floor(s) % 60).padStart(2, '0')}`; };

export function makeFilm() {
  const OV = { lamp: 39, wash: 34 }, ovImg = {}, txImg = {}, NZ = [];
  let TXM = {}, LIB = { meta: {}, img: {} };
  let TL, A, bokeh, sprites, CUES, CHAPS, VID = {};
  const [small, sctx] = mk(480, 270), [wmC, wmG] = mk(1600, 640), [frz, fz] = mk(W, H);
  const HL = [], QL = {}, PL = {};
  const scene = { dur: 1, cuts: [], K: 8, grain: 0.035, load, post, draw, cues: () => ({ cues: CUES, chapters: CHAPS }) };
  const img = async u => createImageBitmap(await (await fetch(u)).blob());

  async function sprite(e) {
    const bm = await img(`../assets/hook/${e.img}.png`);
    const P = 130, w = bm.width + 2 * P, h = bm.height + 2 * P, [base, g] = mk(w, h), [sh, q] = mk(w, h);
    g.filter = 'saturate(.8) contrast(1.06)'; g.drawImage(bm, P, P); g.filter = 'none';
    const gr = q.createLinearGradient(e.side >= 0 ? P : w - P, 0, e.side >= 0 ? w - P : P, h * .3);      // lit from the centre of the room
    gr.addColorStop(0, e.lit[0]); gr.addColorStop(1, e.lit[1]); q.fillStyle = gr; q.fillRect(0, 0, w, h);
    q.globalCompositeOperation = 'destination-in'; q.drawImage(base, 0, 0);
    g.globalCompositeOperation = 'multiply'; g.drawImage(sh, 0, 0); g.globalCompositeOperation = 'source-over';
    const lv = BL.map((b, i) => { if (!i) return base; const [c, x] = mk(w >> 1, h >> 1); x.filter = `blur(${b / 2}px)`; x.drawImage(base, 0, 0, c.width, c.height); return c; });
    return { lv, w, h, iw: bm.width, ih: bm.height };
  }
  // ── the analogy step: the SAME exam on two glass UI panels (left bare, right with its own toolkit) — image space 1640×820 ──
  const EX = { iw: 1640, ih: 820, L: [20, 80], R: [700, 80], P: 620, rail: [1350, 80, 270, 180, 40] };
  const ivo = a => `rgba(241,239,230,${a})`;
  function examPanel(g, x, y) {
    const P = EX.P, cellGrid = (gx, gy, cs, gap, M) => M.forEach((row, r) => row.forEach((v, q) => {
      g.fillStyle = v === 2 ? '#DCDAD0' : v === 1 ? '#6B6B62' : '#1C1D17'; g.fillRect(gx + q * (cs + gap), gy + r * (cs + gap), cs, cs);
      if (!v) { g.strokeStyle = ivo(.12); g.lineWidth = 1; g.strokeRect(gx + q * (cs + gap) + .5, gy + r * (cs + gap) + .5, cs - 1, cs - 1); } }));
    const arrow = (x0, x1, yy) => { g.strokeStyle = ivo(.6); g.lineWidth = 3; g.beginPath(); g.moveTo(x0, yy); g.lineTo(x1, yy); g.moveTo(x1 - 14, yy - 12); g.lineTo(x1, yy); g.lineTo(x1 - 14, yy + 12); g.stroke(); };
    g.save(); g.translate(x, y);
    g.fillStyle = 'rgba(0,0,0,.5)'; g.beginPath(); g.roundRect(10, 16, P, P, 24); g.fill();                     // drop shadow
    const gr = g.createLinearGradient(0, 0, 0, P); gr.addColorStop(0, '#24251E'); gr.addColorStop(1, '#141510');
    g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, P, P, 22); g.fill(); g.strokeStyle = ivo(.3); g.lineWidth = 2; g.stroke();
    g.fillStyle = ivo(.06); g.beginPath(); g.roundRect(2, 2, P - 4, 74, [20, 20, 0, 0]); g.fill();
    g.textBaseline = 'alphabetic'; setFont(g, `700 22px "${MONO}"`, 4); g.fillStyle = ivo(.9); g.textAlign = 'left'; g.fillText('UJIAN · ARC-AGI-3', 32, 50);
    g.textAlign = 'right'; g.fillStyle = ivo(.6); g.fillText('SOAL 01', P - 32, 50); g.textAlign = 'left';
    g.fillStyle = ivo(.16); g.fillRect(0, 76, P, 2);
    setFont(g, `700 16px "${MONO}"`, 4); g.fillStyle = ivo(.55); g.fillText('CONTOH', 32, 112);
    const A0 = [[0, 0, 0, 0, 0], [0, 2, 2, 0, 0], [0, 2, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0]], B0 = A0.map(r => [...r].reverse());
    cellGrid(32, 124, 34, 4, A0); arrow(242, 330, 218); cellGrid(352, 124, 34, 4, B0);
    setFont(g, `700 16px "${MONO}"`, 4); g.fillStyle = ivo(.55); g.fillText('SOAL', 32, 352);
    cellGrid(32, 364, 24, 3, [[0, 0, 0, 0, 0], [0, 0, 1, 2, 0], [0, 0, 0, 2, 0], [0, 0, 0, 2, 0], [0, 0, 0, 0, 0]]); arrow(200, 330, 430);
    g.setLineDash([10, 8]); g.strokeStyle = ivo(.4); g.lineWidth = 2; g.strokeRect(352, 364, 220, 132); g.setLineDash([]);
    setFont(g, `italic 380 84px "${SER}"`); g.fillStyle = ivo(.55); g.textAlign = 'center'; g.fillText('?', 462, 458); g.textAlign = 'left';
    g.fillStyle = ivo(.16); g.fillRect(0, 528, P, 2);
    setFont(g, `700 18px "${MONO}"`, 4); g.fillStyle = ivo(.6); g.fillText('NILAI', 32, 586);
    g.restore();
  }
  function examSprite() {
    const P = 130, w = EX.iw + 2 * P, h = EX.ih + 2 * P, [base, g] = mk(w, h);
    g.translate(P, P); examPanel(g, ...EX.L); examPanel(g, ...EX.R);
    const [rx, ry, rw, rh, gap] = EX.rail; g.setLineDash([12, 10]); g.strokeStyle = ivo(.26); g.lineWidth = 2;
    for (let j = 0; j < 3; j++) { g.beginPath(); g.roundRect(rx, ry + j * (rh + gap), rw, rh, 16); g.stroke(); }
    g.setLineDash([]); setFont(g, `700 16px "${MONO}"`, 4); g.fillStyle = ivo(.4); g.fillText('ALAT BANTU', rx + 4, ry - 18);
    g.setTransform(1, 0, 0, 1, 0, 0);
    const lv = BL.map((b, i) => { if (!i) return base; const [c, x] = mk(w >> 1, h >> 1); x.filter = `blur(${b / 2}px)`; x.drawImage(base, 0, 0, c.width, c.height); return c; });
    return { lv, w, h, iw: EX.iw, ih: EX.ih };
  }
  function examOver(ctx, t, a) {                                  // live layer in image space (origin = image centre)
    ctx.save(); ctx.translate(-EX.iw / 2, -EX.ih / 2); ctx.textBaseline = 'alphabetic';
    const kS = E.outQuint(inv(A.anaLead[3], A.anaLead[3] + .4, t));          // "…ujian yang SAMA": one bracket over both sheets
    if (kS > 0) {
      ctx.globalAlpha = a * kS; ctx.strokeStyle = ivo(.75); ctx.lineWidth = 3; const x0 = EX.L[0] + 30, x1 = EX.R[0] + EX.P - 30, m = (x0 + x1) / 2, y = 44;
      ctx.beginPath(); ctx.moveTo(x0, y + 22); ctx.lineTo(x0, y); ctx.lineTo(lerp(m, x0, kS) , y); ctx.moveTo(x1, y + 22); ctx.lineTo(x1, y); ctx.lineTo(lerp(m, x1, kS), y); ctx.stroke();
      setFont(ctx, `700 24px "${MONO}"`, 5); ctx.textAlign = 'center'; const tw = ctx.measureText('SOAL SAMA').width;
      ctx.fillStyle = '#15160F'; ctx.fillRect(m - tw / 2 - 18, y - 18, tw + 36, 36); ctx.fillStyle = IVORY; ctx.fillText('SOAL SAMA', m, y + 9); ctx.textAlign = 'left';
    }
    const [rx, ry, rw, rh, gap] = EX.rail;
    A.tools.forEach((tj, j) => {                                  // the toolkit docks into the right sheet's rail, one module per word
      const k = E.outQuart(inv(tj - .06, tj + .3, t)); if (k <= 0) return;
      const y = ry + j * (rh + gap), x = rx + (1 - k) * 420;
      ctx.globalAlpha = a * inv(0, .25, k);
      ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.roundRect(x + 8, y + 10, rw, rh, 16); ctx.fill();
      ctx.fillStyle = '#2A2B23'; ctx.beginPath(); ctx.roundRect(x, y, rw, rh, 16); ctx.fill(); ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = COL.lime; ctx.fillRect(x, y + 18, 8, rh - 36);
      setFont(ctx, `700 25px "${MONO}"`, 2); ctx.fillStyle = IVORY; const ws = EP.tools[j].split(' ');
      ws.forEach((wd, q) => ctx.fillText(wd, x + 30, y + 62 + q * 34 - (ws.length - 1) * 8));
      const kd = inv(tj + .28, tj + .4, t);
      if (kd > 0) { ctx.globalAlpha = a * kd; setFont(ctx, `700 15px "${MONO}"`, 4); ctx.fillStyle = ivo(.65); ctx.fillText('TERPASANG', x + 30, y + rh - 26);
        ctx.fillStyle = COL.lime; ctx.fillRect(EX.R[0] + EX.P, y + rh / 2 - 2, rx - EX.R[0] - EX.P, 4); }   // plugged into the sheet
    });
    const kR = inv(A.tools[0] + .2, A.tools[0] + .4, t);                     // the right sheet is now "with its own toolkit"
    if (kR > 0) { ctx.globalAlpha = a * kR; ctx.strokeStyle = COL.lime; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(EX.R[0], EX.R[1], EX.P, EX.P, 22); ctx.stroke(); }
    const lab = (str, cx, tt) => { const k = E.outCubic(inv(tt, tt + .22, t)); if (k <= 0) return;
      ctx.globalAlpha = a * k; setFont(ctx, `700 36px "${MONO}"`, 4); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(str, cx, 788 + (1 - k) * 14); ctx.textAlign = 'left'; };
    lab('APA ADANYA', EX.L[0] + EX.P / 2, A.anaL[0]); lab('BAWA ALAT BANTU SENDIRI', (EX.R[0] + EX.rail[0] + EX.rail[2]) / 2, A.anaR[0]);
    const score = (str, px, tt) => { const k = E.snap(inv(tt, tt + .16, t)); if (k <= 0) return;
      ctx.globalAlpha = a * k; setFont(ctx, `400 92px "${DISP}"`); ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText(str, px + EX.P - 32, EX.L[1] + 606 - (1 - k) * 20); ctx.textAlign = 'left'; };
    score('62,7%', EX.L[0], A.anaL[1] + .1); score('99,9%', EX.R[0], A.tools[2] + .3);
    ctx.restore(); ctx.globalAlpha = a;
  }
  // ── full-bleed documentary backgrounds (Ikhsan 2026-11-17: no boxed photos) — [from, clip] ──
  const BGP = () => [[0, 'server_units'], [A.locks[0] - .3, 'central_processor'], [A.locks[1] - .3, 'hands_typing2'], [A.locks[2] - .3, 'network_cables'],
    [A.locks[3] - .3, 'laptop_displays'], [A.locks[4] - .3, 'server_units'], [A.locks[7] - .3, 'hands_typing'], [A.jam - .1, null],
    [A.back - .14, 'network_cables'], [A.cut3 - .1, 'server_units'], [A.jadi - .1, null]];
  function bgPlate(ctx, t, VX, c, lampK) {
    const P = BGP(); let i = 0; for (let q = 0; q < P.length; q++) if (t >= P[q][0]) i = q;
    const cur = P[i], prev = P[i - 1], kx = inv(cur[0], cur[0] + .5, t);
    const one = (b, a) => {
      const V = b && VID[b[1]]; if (!V || a <= 0) return;
      let lt = Math.max(0, t - b[0]); if (t > A.putar && t < A.rewEnd + .3) lt = Math.max(0, A.putar - b[0]) - 3 * (t - A.putar);   // rewind runs the clip backwards
      const per = 2 * (V.n - 1), m = ((Math.floor(lt * V.fps) % per) + per) % per, im = V.img[m < V.n ? m : per - m];
      const s = Math.max(W / im.width, H / im.height) * (1.14 + .05 * inv(0, 8, t - b[0]));                     // cover-crop + slow push
      const ox = (VX - W / 2) * -.22 + 36 * Math.sin(c * .7), oy = 26 * Math.sin(c * .9 + 1);                   // parallax with the climb
      ctx.globalAlpha = a; ctx.filter = 'grayscale(.72) contrast(1.14) brightness(.66)';
      ctx.drawImage(im, W / 2 - im.width * s / 2 + ox, H / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); ctx.filter = 'none';
    };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (cur[1]) one(cur, (prev && prev[1] ? 1 : kx) * lampK);
    if (prev && prev[1]) one(prev, (1 - kx) * lampK);
    ctx.globalAlpha = 1;
    if (!cur[1] && !(prev && prev[1] && kx < 1)) return;
    let g = ctx.createLinearGradient(0, 0, W, 0);                                                             // text scrims: both edges, docs in the middle stay clear
    g.addColorStop(0, 'rgba(11,12,9,.78)'); g.addColorStop(.36, 'rgba(11,12,9,.28)'); g.addColorStop(.64, 'rgba(11,12,9,.28)'); g.addColorStop(1, 'rgba(11,12,9,.78)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(11,12,9,.35)'); g.addColorStop(.5, 'rgba(11,12,9,0)'); g.addColorStop(1, 'rgba(11,12,9,.5)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    grainRect(ctx, 0, 0, W, H, t, .2);
  }
  async function load() {
    const j = async u => (await fetch(u)).json();
    TL = await j('./timeline.json'); A = TL.A;
    CUES = await j('../build/cues.json').catch(() => ({})); CHAPS = await j('../build/chapters.json').catch(() => []);
    scene.dur = A.end;
    for (const [name, n] of Object.entries(OV))          // the _transisi light leaks, used as clean neutral light (no film colour)
      ovImg[name] = await Promise.all(Array.from({ length: n }, async (_, i) => {
        const bm = await img(`../assets/ov/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`);
        const [c, g] = mk(bm.width, bm.height); g.filter = 'grayscale(1) contrast(1.15)'; g.drawImage(bm, 0, 0); return c;
      }));
    const used = new Set(HITS().map(h => h[0]));          // load only the hits this cut uses
    LIB = await loadTx('../assets/txlib/', [...used].filter(nm => /^(stk|cmc|ldr|shD|shE)/.test(nm)));   // shared Think Make Push library
    TXM = Object.fromEntries(Object.entries(await j('../assets/tx/tx.json')).filter(([nm]) => used.has(nm)));
    for (const [name, m] of Object.entries(TXM))
      txImg[name] = await Promise.all(Array.from({ length: m.n }, async (_, i) => {
        const bm = await img(`../assets/tx/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`);
        const [c, g] = mk(960, 540); g.filter = 'contrast(1.28) brightness(.94)'; g.drawImage(bm, 0, 0, 960, 540); return c;
      }));
    for (let k = 0; k < 4; k++) {                            // documentary grain tiles
      const [c, g] = mk(256, 256), id = g.createImageData(256, 256);
      for (let q = 0; q < id.data.length; q += 4) { const v = 128 + (Math.random() + Math.random() + Math.random() - 1.5) * 120; id.data[q] = id.data[q + 1] = id.data[q + 2] = v; id.data[q + 3] = 255; }
      g.putImageData(id, 0, 0); NZ.push(c);
    }
    sprites = []; for (const e of EP.hook) sprites.push(e.proc ? examSprite() : await sprite(e));
    for (const nm of new Set(BGP().map(b => b[1]).filter(Boolean))) VID[nm] = await loadVid('../assets/vid/', nm);   // Ahri's stock clips (film assets/vid)
    let g, gr; [bokeh, g] = mk(96, 96); gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
    gr.addColorStop(0, 'rgba(244,246,236,.8)'); gr.addColorStop(.72, 'rgba(236,240,226,.62)'); gr.addColorStop(.86, 'rgba(230,236,216,.28)'); gr.addColorStop(1, 'rgba(230,236,216,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
  }
  function ov(ctx, name, t, start, alpha) {
    const i = Math.floor((t - start) * 30); if (i < 0 || i >= OV[name] || alpha <= 0) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = alpha;
    ctx.drawImage(ovImg[name][i], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  // ── the staircase (dark world): hook, channel, disclaimer, switch ───────────────────────────────────
  function rowC(t) {
    const L = A.locks;
    if (t < A.cut1) {
      let c = -1.25 + .05 * Math.min(t, L[0]);                                                     // cold open: the stairs wait in the dark
      for (let i = 0; i < L.length; i++) {
        if (i === 2) c -= 1.75 * E.inOutCubic(inv(A.putar, A.rewEnd, t));                           // "putar ulang": back down the stairs
        c = lerp(c, i, E.outQuart(inv(L[i] - .34, L[i] + .22, t)));
        const hold = i === 1 ? A.tunggu : i < L.length - 1 ? L[i + 1] - .34 : A.jam;
        if (t > L[i]) c += (EP.hook[i].proc ? .004 : .035) * (Math.min(t, hold) - L[i]);   // the exam holds 7 s: almost still, so it stays sharp                                       // never static: a slow climb in every hold
      }
      c += .16 * E.outQuart(inv(A.melonjak - .05, A.melonjak + .35, t)) * (1 - E.outQuart(inv(L[7] - .34, L[7] + .22, t)));   // the jump settles before the exam lands in focus                            // "melonjak": the step jumps at us
      c -= 2.5 * E.inOutCubic(inv(A.jam - .1, A.jam + 1.1, t));                                      // twist: step back to see both numbers
      return c - .06 * E.inOutSine(inv(A.twist[2][0], A.ai - .14, t)) + .3 * E.outQuart(inv(A.ai - .14, A.ai + .12, t));
    }
    let c = lerp(-.7, WM, E.snap(inv(A.back - .14, A.lockW, t)));                           // the stairs whip past, brake on the wordmark
    if (t > A.lockW) { const s = t - A.lockW; c += .07 * Math.exp(-s * 8) * Math.sin(s * 20) + .022 * Math.min(s, A.cut3 - A.lockW); }
    c += .9 * E.outQuart(inv(A.cut3 - .04, A.cut3 + .5, t)) + .012 * Math.max(0, Math.min(t, A.jadi) - A.cut3);
    c = lerp(c, SW, E.inOutCubic(inv(A.jadi - .1, A.jadi + .85, t)));                          // climb to the switch
    c += .03 * Math.max(0, Math.min(t, A.steps[0] - .1) - A.jadi - .85);
    A.steps.forEach(st => { c += E.outQuart(inv(st - .05, st + .3, t)); });                     // "satu anak tangga demi satu": one step per beat, snap → hold
    return c + .025 * Math.max(0, t - A.steps[0]) + .4 * E.inCubic(inv(A.dive - .1, A.stepT, t));
  }
  const levelOf = b => { if (b <= 0) return 0; for (let i = 1; i < BL.length; i++) if (b <= BL[i]) return i - 1 + (b - BL[i - 1]) / (BL[i] - BL[i - 1]); return BL.length - 1; };
  const blurOf = e => e < 0 ? 90 * Math.max(0, -e - .04) : 13 * Math.max(0, e - .3);
  function stairs(ctx, c, VX, VY, lampK, dim, t) {             // treads + risers (rack fronts with LEDs), far → near
    const p0 = Math.floor(c - .6), p1 = Math.ceil(c + 4.2), labs = [];
    for (let p = p1; p >= p0; p--) {
      const e = p - c; if (e < -.62 || e > 4.2) continue;
      const s0 = sOf(e), s1 = sOf(e + 1), h0 = FLOOR - RISE * e, h1 = FLOOR - RISE * (e + 1), fog = inv(4.2, 2.6, e) * lampK * dim * inv(-.62, -.35, e);
      if (fog <= 0) continue;
      const SWD = 1600, yl = VY + s0 * h0, yb = VY + s1 * h0, yn = VY + s1 * h1;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = fog;
      ctx.fillStyle = '#16170F'; ctx.beginPath(); ctx.moveTo(VX - SWD * s1, yb); ctx.lineTo(VX + SWD * s1, yb); ctx.lineTo(VX + SWD * s1, yn); ctx.lineTo(VX - SWD * s1, yn); ctx.fill();   // riser to the next step
      for (let k = 0; k < 18; k++) {                              // rack LEDs on the riser, ivory only, blinking
        const u = rnd(p * 31 + k) * 2 - 1, v = .25 + .5 * rnd(p * 17 + k * 3), on = rnd(Math.floor(t * (2 + 3 * rnd(k + p))) * 7.7 + k + p * 3) > .35;
        if (!on) continue; ctx.fillStyle = `rgba(241,239,230,${.5 + .4 * rnd(k * 9 + p)})`; const r = Math.max(1.2, 3.2 * s1);
        ctx.fillRect(VX + u * SWD * .92 * s1 - r, lerp(yb, yn, v) - r * .5, 2 * r, r);
      }
      if (h0 > 0) {                                               // tread top, only while it is below the eye
        const gr = ctx.createLinearGradient(0, yl, 0, yb); gr.addColorStop(0, '#2A2B23'); gr.addColorStop(1, '#1A1B14');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(VX - SWD * s0, yl); ctx.lineTo(VX + SWD * s0, yl); ctx.lineTo(VX + SWD * s1, yb); ctx.lineTo(VX - SWD * s1, yb); ctx.fill();
      }
      const n = p - SW - 1, kLime = n >= 1 && n <= 5 ? inv(A.steps[n - 1] + .02, A.steps[n - 1] + .12, t) : 0;     // climbed steps keep a lime lip
      ctx.fillStyle = kLime > 0 ? `rgba(200,245,60,${fog * kLime})` : `rgba(241,239,230,${.5 * fog})`; ctx.globalAlpha = 1;
      ctx.fillRect(VX - SWD * s0, yl - 1, 2 * SWD * s0, Math.max(kLime > 0 ? 4 : 1.5, (kLime > 0 ? 14 : 3) * s0));   // lip
      if (kLime > 0 && e > -.3) labs.push([n, fog * kLime, VX - 620 * s0, yl - 18 * s0, s0]);
      ctx.fillStyle = `rgba(241,239,230,${.5 * fog})`;
      for (let k = -8; k <= 8; k++) { const big = k % 4 === 0; ctx.fillRect(VX + k * 160 * s0 - 1, yl, Math.max(1, 2 * s0), (big ? 26 : 12) * s0); }  // ruler ticks on the lip
    }
    for (const [n, al, lx, ly, s0] of labs) {                    // "ANAK TANGGA n" sits on its tread, above the lime lip
      ctx.globalAlpha = al; ctx.fillStyle = IVORY; setFont(ctx, `700 ${Math.max(16, Math.round(32 * s0))}px "${MONO}"`, 4); ctx.fillText(`ANAK TANGGA ${n}`, lx, ly); }
    ctx.globalAlpha = 1;
  }
  function drawAsset(ctx, i, e, t, VX, VY, lampK, f, dim) {
    if (e > 3.4 || e < -.62) return;
    const sp = sprites[i], ep = EP.hook[i], s = sOf(e), k = ep.w / sp.iw * s, hh = sp.ih * ep.w / sp.iw;
    const lvF = levelOf(blurOf(e) / k);
    const a = inv(3.4, 2.3, e) * inv(-.62, -.3, e) * lampK * dim;
    const x = VX + s * ep.side * XO, y = VY + s * (ep.yo - RISE * e + 6 * Math.sin(t * .9 + i * 2)), foc = inv(.6, .12, Math.abs(e));
    if (foc > 0) {                                             // soft key light behind the one in focus
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.globalCompositeOperation = 'screen';
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 560 * s); gr.addColorStop(0, `rgba(226,232,212,${.13 * foc * a})`); gr.addColorStop(1, 'rgba(226,232,212,0)');
      ctx.fillStyle = gr; ctx.fillRect(-580 * s, -580 * s, 1160 * s, 1160 * s); ctx.globalCompositeOperation = 'source-over';
    }
    ctx.setTransform(1, 0, 0, 1, x, VY + s * (FLOOR - RISE * e) - 4 * s); ctx.scale(1, .14);       // contact shadow on its tread
    let gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 320 * s); gr.addColorStop(0, `rgba(0,0,0,${.6 * a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr; ctx.fillRect(-320 * s, -320 * s, 640 * s, 640 * s);
    ctx.setTransform(1, 0, 0, 1, x, y); ctx.rotate((ep.side * 4 * e + 1.1 * Math.sin(t * .7 + i)) * D2R); ctx.scale(k, k);
    const l0 = Math.floor(lvF), l1 = Math.min(BL.length - 1, l0 + 1), fr = lvF - l0;
    ctx.globalAlpha = a; ctx.drawImage(sp.lv[l0], -sp.w / 2, -sp.h / 2, sp.w, sp.h);
    if (fr > .02 && l1 !== l0) { ctx.globalAlpha = a * fr; ctx.drawImage(sp.lv[l1], -sp.w / 2, -sp.h / 2, sp.w, sp.h); }
    if (a > .02) {                                               // documentary grain, ~1.6 px on screen
      ctx.save(); ctx.beginPath(); ctx.rect(-sp.iw / 2, -sp.ih / 2, sp.iw, sp.ih); ctx.clip();
      ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = a * .2;
      const nz = NZ[f % 4], ox = rnd(f * 1.7) * 256, oy = rnd(f * 2.3) * 256, gs = 1.6 / k;
      ctx.translate(-sp.iw / 2 - ox * gs, -sp.ih / 2 - oy * gs); ctx.scale(gs, gs);
      ctx.fillStyle = ctx.createPattern(nz, 'repeat'); ctx.fillRect(0, 0, sp.iw / gs + 512, sp.ih / gs + 512); ctx.restore();
    }
    if (ep.proc && a > .02) examOver(ctx, t, a * inv(1.8, .5, Math.abs(e)));
    const hT = A.hl[i];
    if (ep.hl && hT && t > hT && a > .02) {                       // lime marker on the document, drawn in image space
      const kh = E.outQuint(inv(hT, hT + .35, t)), q = ep.hl; ctx.globalAlpha = a; ctx.strokeStyle = COL.lime; ctx.lineCap = 'round';
      if (q.kind === 'line') { ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo((q.x0 - .5) * sp.iw, (q.y - .5) * sp.ih); ctx.lineTo((lerp(q.x0, q.x1, kh) - .5) * sp.iw, (q.y - .5) * sp.ih); ctx.stroke(); }
      else { ctx.lineWidth = 7; ctx.beginPath(); ctx.arc((q.x - .5) * sp.iw, (q.y - .5) * sp.ih, q.r * sp.iw * lerp(1.5, 1, kh), -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * kh); ctx.stroke(); }
      ctx.lineCap = 'butt';
    }
    ctx.globalAlpha = 1;
    if (foc > 0) {                                             // step number on the lip
      ctx.setTransform(s, 0, 0, s, x, VY + s * (FLOOR - RISE * e)); ctx.globalAlpha = .7 * foc * a; ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      setFont(ctx, `700 22px "${MONO}"`, 3); ctx.fillText(`0${i + 1}`, 0, 52); ctx.textAlign = 'left'; ctx.globalAlpha = 1;
    }
  }
  function hookType(ctx, t, VX, VY) {
    const Ls = A.locks;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (t < Ls[0] + .2) {                                        // cold open: "AGI sudah tiba."
      const kO = E.inCubic(inv(Ls[0] - .34, Ls[0] + .14, t)), sc = lerp(1, 2.6, kO);
      ctx.save(); ctx.translate(960, 560); ctx.scale(sc, sc); ctx.translate(-960, -560); ctx.globalAlpha = 1 - kO; if (kO > .05) ctx.filter = `blur(${(kO * 24).toFixed(1)}px)`;
      const L = PL.open || (PL.open = fitDisp(ctx, 'AGI', 700, 430));
      fall(ctx, L, 960 - L.w / 2, 560, t, j => A.open[0] + j * .05, IVORY);
      ctx.fillStyle = IVORY; setFont(ctx, `italic 380 110px "${SER}"`); wipeWords(ctx, ['sudah', 'tiba.'], [A.open[1], A.open[2]], 960, 720, 110, t, 'center');
      setFont(ctx, `400 ${L.size}px "${DISP}"`); ctx.globalAlpha *= .35 * inv(A.open[0], A.open[0] + .2, t); ctx.fillText('“', 960 - L.w / 2 - 120, 560); ctx.fillText('”', 960 + L.w / 2 + 30, 560);
      ctx.restore();
    }
    EP.hook.forEach((e, i) => {
      const tOut = i === 1 ? A.tunggu - .05 : i < Ls.length - 1 ? Ls[i + 1] - .34 : A.jam - .1, out = inv(tOut, tOut + .2, t);
      if (t < Ls[i] - .05 || out >= 1) return;
      if (e.proc) {                                                // the analogy step: one spoken line on top, the sheets carry the rest
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1 - out; ctx.fillStyle = IVORY; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
        setFont(ctx, `italic 380 84px "${SER}"`); wipeWords(ctx, e.lead, A.anaLead, 170, 150, 84, t);
        setFont(ctx, `400 21px "${MONO}"`, 1); srcTag(ctx, e.src, 170, 1030, t, A.src[i]); return;
      }
      const L = HL[i] || (HL[i] = fitDisp(ctx, e.hero, e.side ? 760 : 1300, e.max));
      const sT = lerp(1, .8, E.inCubic(out)), left = e.side >= 0, xa = left ? 170 : 1750;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(VX, VY); ctx.scale(sT, sT); ctx.translate(-VX, -VY);
      ctx.globalAlpha = 1 - out; ctx.fillStyle = IVORY; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      const top = e.top, base = top + L.cap, hx = left ? xa : xa - L.w;
      let labW = 0;
      if (e.label) {
        setFont(ctx, `700 40px "${MONO}"`, 4); labW = ctx.measureText(e.label.join(' ')).width; let x = left ? xa : xa - labW; ctx.save(); ctx.fillStyle = 'rgba(241,239,230,.82)';
        e.label.forEach((wd, j) => { const tj = A.lab[i][j], k = E.outCubic(inv(tj, tj + .18, t)); if (k > 0) { ctx.globalAlpha = (1 - out) * k; ctx.fillText(wd, x + (1 - k) * 14, top - 150); } x += ctx.measureText(wd + ' ').width; });
        ctx.restore();
        if (e.ukur) { ctx.save(); ctx.globalAlpha = 1 - out; diukur(ctx, left ? xa : xa - labW, top - 150, labW, t, A.ukur[i], e.ukur); ctx.restore(); }
      }
      if (e.lead) { const ls = 76; setFont(ctx, `italic 380 ${ls}px "${SER}"`); wipeWords(ctx, e.lead, A.lead[i], xa, top - 40, ls, t, left ? 'left' : 'right'); }
      fall(ctx, L, hx, base, t, splitStart(e.split, A.hero[i], e.split.length > 2 ? .01 : .022), IVORY);
      let yb = base;
      if (e.tail) { setFont(ctx, `italic 380 72px "${SER}"`); ctx.fillStyle = IVORY; wipe(ctx, e.tail, xa, base + 96, E.outQuint(inv(A.tail[i], A.tail[i] + .4, t)), 72, left ? 'left' : 'right'); yb = base + 96; }
      setFont(ctx, `400 21px "${MONO}"`, 1); const sw = ctx.measureText(e.src).width + 26;
      srcTag(ctx, e.src, left ? xa : xa - sw, Math.min(1030, yb + 78), t, A.src[i]);
    });
    if (t > A.tunggu - .05 && t < A.rewEnd + .3) {               // "Tunggu… putar ulang": a digital scrubber, no tape look
      const kIn = inv(A.tunggu - .05, A.tunggu + .15, t), kOut = inv(A.rewEnd, A.rewEnd + .3, t), a = kIn * (1 - kOut);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a * (1 - inv(A.putar + .5, A.putar + .8, t)); ctx.fillStyle = IVORY;
      setFont(ctx, `italic 380 150px "${SER}"`); wipe(ctx, 'Tunggu…', 170, 640, E.outQuint(inv(A.tunggu, A.tunggu + .45, t)), 150);
      const kR = E.inOutCubic(inv(A.putar, A.rewEnd, t)), x0 = 170, x1 = 1750, ph = lerp(x1 - 120, x0 + 160, kR), y = 960;
      ctx.globalAlpha = a; ctx.fillStyle = 'rgba(241,239,230,.25)'; ctx.fillRect(x0, y, x1 - x0, 3);
      ctx.fillStyle = 'rgba(241,239,230,.7)'; ctx.fillRect(x0, y, ph - x0, 3);
      for (let k = 0; k <= 40; k++) ctx.fillRect(x0 + k * (x1 - x0) / 40 - 1, y + 10, 2, k % 5 ? 6 : 14);
      ctx.fillStyle = COL.lime; ctx.fillRect(ph - 9, y - 16, 18, 34);
      setFont(ctx, `700 22px "${MONO}"`, 3); ctx.fillStyle = IVORY;
      const day = Math.round(lerp(7, 1, kR)), clock = lerp(22 * 3600 + 600, 0, kR) + (kR > 0 && kR < 1 ? (t * 997) % 3600 : 0);
      ctx.fillText(`${String(day).padStart(2, '0')} SEP 2026  ${tc(clock)}`, Math.min(ph - 150, x1 - 380), y - 34);
      if (t > A.putar) {                                         // two drawn rewind chevrons, not an emoji
        ctx.globalAlpha = a * (.6 + .4 * Math.sin(t * 18)); ctx.fillStyle = IVORY; const cx = x0, cy = y - 44;
        for (const dx of [0, 26]) { ctx.beginPath(); ctx.moveTo(cx + dx + 24, cy - 14); ctx.lineTo(cx + dx, cy); ctx.lineTo(cx + dx + 24, cy + 14); ctx.fill(); }
        setFont(ctx, `700 22px "${MONO}"`, 4); ctx.fillText('PUTAR ULANG', cx + 70, cy + 8);
      }
    }
    if (t >= A.jam - .1) {                                       // twist, word by word, exactly as spoken
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = IVORY; setFont(ctx, `italic 380 104px "${SER}"`);
      EP.twist.forEach((ln, j) => wipeWords(ctx, ln, A.twist[j], 170, 330 + j * 150, 104, t));
    }
    ctx.globalAlpha = 1;
  }
  function wmArt(g, t) {                                        // the wordmark, 1600×640, transparent
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 1600, 640);
    const L = PL.wm || (PL.wm = fitDisp(g, CFG.channel[0], 1500, 900)), base = 30 + L.cap;
    g.fillStyle = IVORY; g.textBaseline = 'alphabetic'; g.textAlign = 'left'; setFont(g, `400 ${L.size}px "${DISP}"`); g.fillText(CFG.channel[0], 50, base);
    setFont(g, `italic 420 150px "${SER}"`); const w2 = g.measureText(CFG.channel[1]).width, x2 = 1550 - w2 - 26, b2 = base + 178;
    const k = E.snap(inv(A.slab - .04, A.slab + .16, t));
    if (k > 0) {
      g.save(); g.beginPath(); g.rect(x2 - 26, b2 - 122, (w2 + 52) * k, 164); g.clip();
      g.fillStyle = COL.lime; g.fillRect(x2 - 26, b2 - 122, w2 + 52, 164); g.fillStyle = COL.limeInk; g.fillText(CFG.channel[1], x2, b2); g.restore();
    }
  }
  let wmKey = -1;
  function drawWM(ctx, t, c, VX, VY) {
    const e = WM - c; if (e > 3) return;
    const key = Math.round(E.snap(inv(A.slab - .04, A.slab + .16, t)) * 400); if (key !== wmKey) { wmArt(wmG, t); wmKey = key; }
    const kD = E.inOutCubic(inv(A.cut3 - .22, A.cut3 + .2, t)), s = e > 0 ? sOf(e) : 1 / (1 - .12 * Math.min(-e, .2));
    const sc = lerp(s, .17, kD), x = lerp(VX, 1642, kD), y = lerp(VY + s * (-60 - RISE * Math.max(0, e)), 116, kD), b = e > .03 ? 30 * (e - .03) : 0;
    const gone = 1 - inv(A.jadi - .05, A.jadi + .3, t);
    ctx.setTransform(sc, 0, 0, sc, x, y); ctx.globalAlpha = inv(3, 2, e) * gone; if (b > .7 && kD < .5) ctx.filter = `blur(${b.toFixed(1)}px)`;
    ctx.drawImage(wmC, -800, -290); ctx.filter = 'none'; ctx.globalAlpha = 1;
  }
  function discType(ctx, t, base0) {                            // 5: sources, in the dark world
    const M = 150, s = t - A.cut3; if (s < 0) return;
    if (!PL.d) {
      const rows = EP.src.map(ws => { const str = ws.join(' / '), L = fitDisp(ctx, str, W - 2 * M, 230); let at = 0; const xs = ws.map(wd => { const x = L.xs[at] ?? 0; at += wd.length + 3; return x; }); return { L, ws, xs }; });
      setFont(ctx, `italic 380 84px "${SER}"`); const tw = ctx.measureText(EP.dTail.join(' ')).width;
      PL.d = { rows, tw, H: fitDisp(ctx, EP.dHero, 900, 150) };
      let y = 356; rows.forEach(r => { r.base = y + r.L.cap; y = r.base + 44; }); PL.d.base = y + 34 + PL.d.H.cap; PL.d.hx = M + tw + 44;
    }
    const D = PL.d, kG = E.inCubic(inv(A.jadi - .05, A.jadi + .4, t));
    ctx.setTransform(base0); ctx.translate(0, 260 * kG);
    const aT = 1 - kG;
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = IVORY;
    ctx.globalAlpha = inv(.2, .5, s) * .8 * aT; setFont(ctx, `700 24px "${MONO}"`, 5); ctx.fillText('DISCLAIMER', M, 124);
    ctx.globalAlpha = .4 * aT; ctx.fillRect(M, 162, (W - 2 * M) * E.outQuint(inv(.15, .7, s)), 2);
    ctx.globalAlpha = aT; setFont(ctx, `italic 380 80px "${SER}"`); wipeWords(ctx, EP.dLead, A.dlead.map(x => x[0]), M, 300, 80, t);
    let wi = 0;
    D.rows.forEach((r, ri) => {
      const ts = r.ws.map((_, j) => A.src2[wi + j]); wi += r.ws.length;
      const start = ch => { let g = 0; r.ws.forEach((_, j) => { if (r.L.xs[ch] >= r.xs[j] - .5) g = j; }); return ts[g] + .12; };
      ctx.globalAlpha = aT; ghost(ctx, r.L, M, r.base, E.outQuint(inv(.3 + ri * .18, .95 + ri * .18, s)), t, start, 'rgba(241,239,230,.17)');
      r.ws.forEach((wd, j) => {
        if (j > 0 && t > ts[j] - .02) { ctx.globalAlpha = aT * .34 * inv(ts[j] - .02, ts[j] + .1, t); ctx.fillStyle = IVORY; setFont(ctx, `400 ${r.L.size}px "${DISP}"`); ctx.fillText('/', M + r.L.xs[r.ws.slice(0, j).join(' / ').length + 1], r.base); }
        ctx.globalAlpha = aT; flyWord(ctx, wd, M + r.xs[j], r.base, r.L, t, ts[j], j % 2 ? -1 : 1, IVORY);
      });
    });
    ctx.globalAlpha = aT; setFont(ctx, `italic 380 84px "${SER}"`); ctx.fillStyle = IVORY; wipeWords(ctx, EP.dTail, A.dtail, M, D.base, 84, t);
    const k = E.snap(inv(A.hib - .05, A.hib + .14, t));
    if (k > 0) { ctx.fillStyle = IVORY; ctx.fillRect(D.hx - 22, D.base - D.H.cap - 24, (D.H.w + 44) * k, D.H.cap + 48); }   // ivory slab: lime is kept for the title
    fall(ctx, D.H, D.hx, D.base, t, j => A.hib + j * .016, INK); ctx.globalAlpha = 1;
  }
  function drawSwitch(ctx, t, c, VX, VY, lit) {                  // 6: the wall switch at the top of the stairs; KLIK → the lamp comes ON
    const e = SW - c; if (e > 3 || e < -.8) return null;
    const s = sOf(e), x = VX + s * -230, y = VY + s * (110 - RISE * e), b = blurOf(e) * .5, a = inv(3, 1.6, e), S = s * 1.05;
    const bx = 760, by = -188;                                     // bulb glass centre, switch-local
    if (lit > 0) {                                                 // light on the wall first (behind the plate)
      ctx.setTransform(S, 0, 0, S, x, y); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = a * lit;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, 1500); g.addColorStop(0, 'rgba(244,242,232,.5)'); g.addColorStop(.18, 'rgba(236,236,222,.2)'); g.addColorStop(.55, 'rgba(200,204,186,.06)'); g.addColorStop(1, 'rgba(200,204,186,0)');
      ctx.fillStyle = g; ctx.fillRect(bx - 1500, by - 1500, 3000, 3000); ctx.globalCompositeOperation = 'source-over';
    }
    ctx.setTransform(S, 0, 0, S, x, y); ctx.globalAlpha = a; if (b > .7) ctx.filter = `blur(${b.toFixed(1)}px)`;
    saklar(ctx, t, 0, 0, A.klik, { label: 'AGI', bx: 760, by: -170 });
    ctx.filter = 'none';
    if (lit > 0) {                                                 // the bulb itself: glowing glass + hot core
      ctx.globalAlpha = a * lit; ctx.globalCompositeOperation = 'screen';
      let g = ctx.createRadialGradient(bx, by, 0, bx, by, 150); g.addColorStop(0, 'rgba(255,255,250,1)'); g.addColorStop(.3, 'rgba(250,248,236,.75)'); g.addColorStop(1, 'rgba(240,238,226,0)');
      ctx.fillStyle = g; ctx.fillRect(bx - 150, by - 150, 300, 300);
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(252,251,244,.92)'; ctx.beginPath(); ctx.arc(bx, by, 40, 0, 7); ctx.fill();
      setFont(ctx, `700 22px "${MONO}"`, 4); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.globalAlpha = a * inv(A.klik + .15, A.klik + .3, t);
      ctx.fillText('LAMPU: MENYALA', bx, by + 160); ctx.textAlign = 'left';
    }
    ctx.globalAlpha = 1;
    return { x, y, bx: x + bx * S, by: y + by * S, s: S };
  }
  function switchType(ctx, t) {                                    // the question, KLIK, and the climb — all in the calm top-left
    const M = 170, line = (words, times, y, size, alpha) => { if (alpha <= 0) return; ctx.globalAlpha = alpha; setFont(ctx, `italic 380 ${size}px "${SER}"`); wipeWords(ctx, words, times, M, y, size, t); };
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = IVORY; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    const q = 1 - inv(A.klik - .08, A.klik + .08, t);                // "Jadi… sebenarnya apa itu [AGI?]" + "Datang tiba-tiba, seperti saklar lampu?"
    line(EP.tanya, A.tanya, 150, 88, q); line(EP.tanya2, A.tanya2, 262, 80, q);
    const kk = 1 - inv(A.climbL[0][0] - .12, A.climbL[0][0] + .05, t);
    if (t > A.klik - .02 && kk > 0) {                              // KLIK. (snap) + "langsung menyala."
      const L = PL.klik || (PL.klik = fitDisp(ctx, 'KLIK.', 600, 250)), k = E.snap(inv(A.klik - .02, A.klik + .1, t));
      ctx.globalAlpha = kk; ctx.save(); ctx.translate(M, 330); ctx.scale(lerp(1.25, 1, k), lerp(1.25, 1, k)); ctx.globalAlpha = kk * inv(0, .3, k);
      setFont(ctx, `400 ${L.size}px "${DISP}"`); ctx.fillText('KLIK.', 0, 0); ctx.restore();
      ctx.globalAlpha = kk; setFont(ctx, `italic 380 92px "${SER}"`); wipeWords(ctx, EP.nyala, A.nyala, M + L.w + 44, 330, 92, t); ctx.globalAlpha = 1;
    }
    if (t > A.climbL[0][0] - .1) {                                 // "Atau pelan-pelan, seperti naik tangga, satu anak tangga demi satu?"
      const a = 1 - inv(A.dive, A.dive + .15, t);
      EP.climb.forEach((ws, j) => line(ws, A.climbL[j], 150 + j * 112, 90, a));
    }
    ctx.globalAlpha = 1;
  }
  function drawRow(ctx, t) {
    const f = Math.floor(t * FPS), hook = t < A.cut1, c = rowC(t), sD = t - A.cut3;
    const lampK = hook ? clamp(lerp(.45, 1, E.outCubic(inv(A.locks[0] - .4, A.locks[0] + .2, t))) * E.outCubic(inv(.02, .4, t)) * (.95 + .05 * noise1(t * 40))) : 1;
    const hit = hook ? hitOf(t, [...A.locks.map(l => [l, 5]), ...A.hero.slice(0, 5).map(h => [h[0] + .16, 6]), ...A.hero[5].map(h => [h + .12, 3]),
      ...A.hero[6].slice(0, 4).map(h => [h + .12, 4]), [A.hero[6][4] + .16, 13], [A.putar + .1, 6], [A.ai, 10]])
      : hitOf(t, [[A.lockW, 9], [A.slab + .1, 5], ...A.src2.map(x => [x + .22, 3]), [A.hib + .2, 7], [A.klik, 8], ...A.steps.map(x => [x + .08, 4])]);
    const tw = hook ? E.inOutCubic(inv(A.jam - .1, A.jam + 1.1, t)) : 0;
    const VX = W / 2 + 380 * tw + (rnd(f * 2.3) - .5) * 2 * hit, VY = VY0 + (rnd(f * 5.3) - .5) * (2 + 2 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    bgPlate(ctx, t, VX, c, lampK);                                                          // BG: full-bleed documentary clip, graded + scrim + grain
    const lit = A.klik ? E.outCubic(inv(A.klik, A.klik + .3, t)) * (t < A.klik + .14 ? (Math.floor((t - A.klik) * 30) % 2 ? .45 : 1) : 1) : 0;   // the lamp comes on (one flicker)
    let gr = ctx.createRadialGradient(VX, VY - 160, 0, VX, VY, 1350);                          // cool soft light at the top of the stairs
    gr.addColorStop(0, `rgba(214,222,198,${(.15 + .1 * lit) * lampK})`); gr.addColorStop(.45, `rgba(120,130,108,${.06 * lampK})`); gr.addColorStop(1, 'rgba(60,66,52,0)');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    const dim = hook ? 1 - .62 * tw : lerp(lerp(.8, .55, inv(0, .5, sD)), 1, lit);
    stairs(ctx, c, VX, VY, lampK, dim, t);
    for (let i = EP.hook.length - 1; i >= 0; i--) drawAsset(ctx, i, i - c, t, VX, VY, lampK, f, dim);   // MG: the steps, far → near
    let sw = null;
    if (hook) hookType(ctx, t, VX, VY); else { sw = drawSwitch(ctx, t, c, VX, VY, lit); drawWM(ctx, t, c, VX, VY); }
    if (lit > 0 && !sw) {                                          // the lamp stays on behind us while we climb: soft light from up right
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(1500, -200, 0, 1500, -200, 1600);
      g.addColorStop(0, `rgba(240,238,226,${.22 * lit})`); g.addColorStop(1, 'rgba(240,238,226,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over';
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen';            // FG: dust passing the lens
    for (let i = 0; i < 40; i++) {
      const rel = ((rnd(i + 99) * 4.2 + c) % 4.2 + 4.2) % 4.2 - .9;                         // ahead → past the lens as we climb
      const s = sOf(rel), r = clamp(4 + 46 * Math.max(0, -rel) * s, 4, 150);
      const x = VX + s * ((rnd(i) * 2 - 1) * 1250 + t * 16 * (rnd(i + 5) - .5)), y = VY + s * ((rnd(i + 50) * 2 - 1) * 520 - RISE * rel * .6 - t * 12 * rnd(i + 9));
      ctx.globalAlpha = clamp(lampK * 3.6 / r, .025, .35) * inv(3.3, 2.6, rel) * inv(-.9, -.6, rel); ctx.drawImage(bokeh, x - r, y - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (lampK < 1) { ctx.fillStyle = `rgba(4,4,3,${(1 - lampK) * .8})`; ctx.fillRect(0, 0, W, H); }
    if (hook) ov(ctx, 'lamp', t, 0, .14); else ov(ctx, 'wash', t, A.lockW - .05, .22);
    if (!hook && sD >= 0 && t < A.jadi + .5) {
      const push = 1 + .035 * inv(.3, 11, sD) + .004 * hit;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2 + VX - W / 2, H / 2 + VY - VY0); ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
      discType(ctx, t, ctx.getTransform());
    }
    if (!hook && t > A.jadi - .1) switchType(ctx, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return sw;
  }

  // ── 3: questions — forward zoom through type planes (light world) ─────────────────────────────────
  function qCam(t) {
    const M = [A.q1, A.q2, A.q3]; let c = -1 + .03 * Math.max(0, t - A.ai);
    M.forEach((m, i) => { c = lerp(c, i, E.outQuart(inv(m - .3, m + .16, t))); if (t > m) c += .04 * (Math.min(t, i < 2 ? M[i + 1] - .3 : A.back - .4) - m); });
    return c + .3 * E.inCubic(inv(A.back - .4, A.back + .12, t));
  }
  function qPlane(ctx, i, t) {
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = INK;
    if (i === -1) {                                               // the lime plane that took the frame
      const L = QL.ai || (QL.ai = fitDisp(ctx, EP.twistHero, 1500, 620));
      ctx.fillStyle = COL.lime; ctx.fillRect(-2600, -1600, 5200, 3200);
      fall(ctx, L, -L.w / 2, L.cap / 2, t, splitStart([0, 5], [A.aiH[0] + .04, A.aiH[1] + .02], .03), COL.limeInk); return;
    }
    const e = EP.q[i], qt = [A.q1, A.q2, A.q3][i], qh = [A.q1h, A.q2h, A.q3h][i];
    if (i < 2) {
      const L = QL[i] || (QL[i] = fitDisp(ctx, e.hero, 1500, 520)), top = -L.cap / 2 + 40;
      setFont(ctx, `italic 380 150px "${SER}"`); wipe(ctx, e.lead, 0, top - 56, E.outQuint(inv(qt - .06, qt + .3, t)), 150, 'center');
      fall(ctx, L, -L.w / 2, top + L.cap, t, e.split ? splitStart(e.split, qh, .02) : j => qh + j * .02, INK); return;
    }
    const L = QL[2] || (QL[2] = fitDisp(ctx, e.hero, 1500, 460)), Lm = QL.m || (QL.m = fitDisp(ctx, e.mid, 900, 220));
    const top = -20, base = top + L.cap, x = -L.w / 2, mb = top - 40;
    setFont(ctx, `italic 380 88px "${SER}"`); wipeWords(ctx, e.lead, A.q3lead, 0, mb - Lm.cap - 42, 88, t, 'center');
    const hs = j => j < e.hi ? qh + j * .02 : A.sama + (j - e.hi) * .02;
    ghost(ctx, Lm, -Lm.w / 2, mb, E.outQuint(inv(qt - .1, qt + .45, t)), t, j => A.manusia + j * .02, 'rgba(17,18,14,.22)');
    ghost(ctx, L, x, base, E.outQuint(inv(qt + .05, qt + .6, t)), t, hs, 'rgba(17,18,14,.22)');
    fall(ctx, Lm, -Lm.w / 2, mb, t, j => A.manusia + j * .02, INK);
    const k = E.snap(inv(A.sama - .02, A.sama + .16, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(x + L.xs[e.hi] - 20, base - L.cap - 24, (L.w - L.xs[e.hi] + 40) * k, L.cap + 48); }
    fall(ctx, L, x, base, t, hs, j => j < e.hi ? INK : COL.limeInk);
  }
  function drawQ(ctx, t) {
    const f = Math.floor(t * FPS), c = qCam(t);
    const hit = hitOf(t, [[A.ai + .22, .8], [A.q1h + .3, 1], [A.q2h[0] + .3, 1], [A.manusia + .28, .5], [A.sama + .24, 1]]);
    const cx = W / 2 + (rnd(f * 2.3) - .5) * 18 * hit, cy = H / 2 + (rnd(f * 5.3) - .5) * (2 + 14 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; lightBg(ctx);
    ctx.lineCap = 'butt';
    for (let i = 0; i < 54; i++) {                                                          // BG: register marks streaming past = depth
      const rel = -1.4 + rnd(i + 40) * 5.4 - c; if (rel > .75 || rel < -.6) continue;
      const s = ZF ** -rel, a = rnd(i) * 7, R = 300 + 760 * rnd(i + 7), x = cx + Math.cos(a) * R * s, y = cy + Math.sin(a) * R * .62 * s, r = 11 * s;
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.strokeStyle = `rgba(17,18,14,${.34 * inv(.75, .35, rel) * (1 - inv(.15, .6, -rel))})`; ctx.lineWidth = Math.min(6, 1.6 * s);
      ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke();
    }
    for (let i = 2; i >= -1; i--) {                                                         // MG: type planes, far → near
      const rel = i - c; if (rel > .8 || rel < -.55) continue;
      ctx.setTransform(1, 0, 0, 1, cx, cy); if (i >= 0) ctx.rotate(-rel * 11 * D2R * (i % 2 ? -1 : 1)); const s = ZF ** -rel; ctx.scale(s, s);
      ctx.globalAlpha = rel > 0 ? inv(.8, .3, rel) : 1 - inv(.12, .55, -rel); qPlane(ctx, i, t);
    }
    ctx.globalAlpha = 1; ov(ctx, 'wash', t, A.ai - .05, .3);
  }

  // ── 7: title (light page) — SAKLAR ATAU TANGGA? ─────────────────────────────────────────────────
  function drawTitle(ctx, t) {                                   // 7: dark page — SAKLAR ATAU / TANGGA? + the question in plain words
    const M = 150, s = t - A.stepT, f = Math.floor(t * FPS);
    const hit = hitOf(t, [[A.tMid + .2, .5], [A.tHero + .2, 1.2]]);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(560, 520, 60, 760, 540, 1400); bg.addColorStop(0, 'rgba(60,62,50,.55)'); bg.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    if (!PL.t) {
      const L = { hero: fitDisp(ctx, EP.hero, 1100, 360), mid: fitDisp(ctx, EP.mid, 1200, 200) };
      L.yMid = 150 + L.mid.cap; L.heroBase = L.yMid + 74 + L.hero.cap; L.sub = L.heroBase + 150;
      PL.t = L;
    }
    const L = PL.t, push = 1 + .035 * inv(.3, 5, s) + .02 * hit;
    ctx.translate(W / 2 + (rnd(f * 2.3) - .5) * 20 * hit, H / 2 + (rnd(f * 5.3) - .5) * (2 + 16 * hit)); ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = IVORY;
    ctx.globalAlpha = .8 * inv(.3, .6, s); setFont(ctx, `700 24px "${MONO}"`, 6); ctx.fillText(`${CFG.channel[0]} ${CFG.channel[1]}`.toUpperCase(), M, 92);
    ctx.globalAlpha = 1;
    ghost(ctx, L.mid, M, L.yMid, E.outQuint(inv(.1, .5, s)), t, j => A.tMid + j * .025, 'rgba(241,239,230,.22)');
    fall(ctx, L.mid, M, L.yMid, t, j => A.tMid + j * .025, IVORY);
    const k = E.snap(inv(A.tHero - .04, A.tHero + .16, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(M - 24, L.heroBase - L.hero.cap - 28, (L.hero.w + 48) * k, L.hero.cap + 56); }
    fall(ctx, L.hero, M, L.heroBase, t, j => A.tHero + j * .03, COL.limeInk);
    ctx.fillStyle = IVORY; setFont(ctx, `italic 400 88px "${SER}"`);
    wipe(ctx, EP.sub, M, L.sub, E.outQuint(inv(A.tSub, A.tSub + .5, t)), 88);
    ctx.globalAlpha = 1;
    const kW = inv(A.stepT + .12, A.stepT + .4, t);                // the lime door slides off to the right
    if (kW < 1) wipeIn(ctx, lerp(-200, W + 200, E.outQuart(kW)), false, () => { ctx.fillStyle = COL.lime; ctx.fillRect(0, 0, W, H); });
  }

  const T = () => ({ a0: A.ai - .12, a1: A.ai + .14, b0: A.back - .14, b1: A.back + .12, tT: A.stepT + .12 });
  function draw(ctx, t) {
    const { a0, a1, b0, b1, tT } = T();
    if (t < a0) drawRow(ctx, t);
    else if (t < a1) { drawRow(ctx, t); wipeIn(ctx, lerp(-200, W + 200, E.outQuart(inv(a0, a1, t))), true, () => drawQ(ctx, t)); }      // lime, from the left
    else if (t < b0) drawQ(ctx, t);
    else if (t < b1) { drawQ(ctx, t); wipeIn(ctx, lerp(W + 200, -200, E.inOutCubic(inv(b0, b1, t))), false, () => drawRow(ctx, t)); }   // the stairs, from the right
    else if (t < tT) {
      const sw = drawRow(ctx, t), kD = inv(A.dive, A.stepT, t);
      if (kD > 0) {                                             // dive up the stairs into the top step (the frame itself, magnified)
        const S = Math.exp(Math.log(26) * E.inCubic(kD)), fx = W / 2, fy = VY0 - 40;
        fz.setTransform(1, 0, 0, 1, 0, 0); fz.clearRect(0, 0, W, H); fz.drawImage(ctx.canvas, 0, 0);
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
        ctx.translate(fx, fy); ctx.scale(S, S); ctx.translate(-fx, -fy); if (kD > .2) ctx.filter = `blur(${(kD * 6).toFixed(1)}px)`;
        ctx.drawImage(frz, 0, 0); ctx.filter = 'none'; ctx.setTransform(1, 0, 0, 1, 0, 0);
        const kL = inv(.62, .92, kD); if (kL > 0) { ctx.globalAlpha = kL; ctx.fillStyle = COL.lime; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
      }
    }
    else drawTitle(ctx, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  }
  function post(o, t) {
    const { a0, a1, b0, b1, tT } = T(), br = t < a0 ? 0 : t < a1 ? inv(a0, a1, t) : t < b0 ? 1 : t < b1 ? 1 - inv(b0, b1, t) : t < tT - .2 ? 0 : t < tT ? inv(tT - .2, tT, t) : 0;
    o.setTransform(1, 0, 0, 1, 0, 0);
    if (t > A.putar && t < A.rewEnd + .05) {                     // rewind: horizontal slices slip, digital (not tape)
      const f = Math.floor(t * 30), amp = Math.sin(Math.PI * inv(A.putar, A.rewEnd + .05, t));
      for (let k = 0; k < 7; k++) { const y = Math.floor(rnd(f * 3 + k) * H), h = 8 + Math.floor(rnd(f * 7 + k) * 60), dx = (rnd(f * 11 + k) - .5) * 120 * amp;
        o.drawImage(o.canvas, 0, y, W, h, dx, y, W, h); }
    }
    sctx.filter = 'brightness(0.6) contrast(2.6) blur(8px)'; sctx.drawImage(o.canvas, 0, 0, 480, 270);              // soft bloom, no tint
    o.globalCompositeOperation = 'screen'; o.globalAlpha = lerp(.18, .05, br); o.drawImage(small, 0, 0, W, H);
    o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
    const v = o.createRadialGradient(W / 2, H / 2, H * .5, W / 2, H / 2, W * .66);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${lerp(.5, .1, br)})`); o.fillStyle = v; o.fillRect(0, 0, W, H);
    for (const [name, at, al] of HITS()) tx(o, name, t, at, al);
  }
  // the _transisi hits: [clip, time its brightest frame lands, strength] — same list in tools/mix.py
  const HITS = () => [['shA', A.locks[0] - .1, 1], ['shB', A.locks[1] - .12, 1], ['shC', A.locks[2] - .12, 1], ['shD', A.locks[4] - .12, .8],
    ['shE', A.locks[6] - .12, .8], ['stk3', A.cut1, 1], ['leakW', A.back + .05, .95], ['leakL', A.cut3, .9], ['stk1', A.jadi, .7], ['stk4', A.stepT, 1]];
  function tx(o, name, t, at, alpha) {
    const m = TXM[name]; if (!m) return drawTx(o, LIB, name, t, at, alpha); const i = Math.floor((t - at + m.peak) * 30); if (i < 0 || i >= m.n) return;
    const edge = Math.min(1, i / 2, (m.n - 1 - i) / 3);           // no hard pop at the clip ends
    o.setTransform(1, 0, 0, 1, 0, 0); o.globalCompositeOperation = 'screen'; o.globalAlpha = alpha * Math.max(0, edge);
    o.drawImage(txImg[name][i], 0, 0, W, H); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over';
  }
  return scene;
}
