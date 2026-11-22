// Bab 2 (VO 05): Internet mulai dipagari. tulisanmu berlabel harga → robots.txt jadi papan di pagar → robot penyedot halaman →
// Consent in Crisis (C4) → grafik 5 % / 28 %+ dikunci → perpustakaan digembok (kolase Ahpo A03, parallax 4 lapis) → Cloudflare
// (halaman penuh) + gerbang yang memblokir robot → setelan izin situs baru + pay per crawl → pagar jadi LOKET (signature) →
// Reddit-Google + struk → buku: Anthropic digugat → kata hakim (dua kolom) → US$1,5 miliar pecah jadi US$3.000 per karya →
// hujan huruf ditampung, lalu meteran → Sahabat-AI (Tempo, GoTo) → komentarmu dihargai berapa → tiga jalan keluar.
// Lime = satu kata kunci per kalimat. Grafik C4 digambar ulang dari angka (versi Ahri biru). TechCrunch dibuat abu-abu (palet).
import B from './beats.js';
import { clamp, inv, lerp, E, IVORY, LIME, LIME_INK, TILE, D2R, ivo, setFont, rnd, mk, DISP, SER, MONO, timing, makeChapter, loadImg, loadVid,
  plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, gone } from './kit.js';
import { kq, pop, popAt, doc, stamp, slot } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const KATA = ('kita makan nasi rumah jalan pagi kabar baik terima kasih sudah belum besok ibu bapak sekolah kerja pasar hujan senja lagu cerita ' +
  'tulis baca resep surat doa janji rindu warung kopi gula garam sambal kampung kota anak cucu nenek kakek sawah laut angin pulang').split(' ');
const DARK = '#11120E';

function letterTex(font, rows, seed, a) {                    // 1024² tile of real Indonesian words (Sumur Huruf texture, as in bab-1)
  const [c, g] = mk(1024, 1024); g.fillStyle = ivo(a); setFont(g, font, 1); g.textBaseline = 'alphabetic';
  for (let r = 0; r < rows; r++) { let s = ''; for (let i = 0; i < 40; i++) s += KATA[Math.floor(rnd(seed + r * 41 + i * 3.7) * KATA.length)] + ' ';
    g.fillText(s, -rnd(seed + r) * 260, (r + 1) * 1024 / rows - 8); }
  return c;
}
function tile(ctx, tex, x, y, w, h, scroll = 0) {
  const oy = ((scroll % 1024) + 1024) % 1024;
  for (let yy = y - oy; yy < y + h; yy += 1024) for (let xx = x; xx < x + w; xx += 1024) ctx.drawImage(tex, xx, yy);
}
function padlock(ctx, x, y, s, a = 1) {                       // line-art padlock, body centre at (x, y)
  const a0 = ctx.globalAlpha; ctx.save(); ctx.translate(x, y); ctx.globalAlpha = a0 * a;
  ctx.strokeStyle = IVORY; ctx.lineWidth = s * .17; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(-s * .4, -s * .1); ctx.lineTo(-s * .4, -s * .5);
  ctx.arc(0, -s * .5, s * .4, Math.PI, 0); ctx.lineTo(s * .4, -s * .1); ctx.stroke();
  ctx.fillStyle = IVORY; ctx.beginPath(); ctx.roundRect(-s * .68, -s * .2, s * 1.36, s * 1.05, s * .12); ctx.fill();
  ctx.fillStyle = DARK; ctx.beginPath(); ctx.arc(0, s * .22, s * .13, 0, 7); ctx.fill(); ctx.fillRect(-s * .05, s * .25, s * .1, s * .3);
  ctx.restore(); ctx.globalAlpha = a0;
}
function priceTag(ctx, x, y, t, t0, l1, l2, o = {}) {        // hang tag on a string from a pin at (x, y), swings in and settles
  const s = t - t0; if (s <= 0) return; const a0 = ctx.globalAlpha, w = o.w || 400, h = o.h || 220, L = o.len ?? 90;
  const ang = (o.from ?? 38) * Math.exp(-s * 3.2) * Math.cos(s * 9.5) + (o.rest ?? 4);
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang * D2R); ctx.globalAlpha = a0 * clamp(s / .1);
  ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, L); ctx.stroke();
  ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(0, 0, 7, 0, 7); ctx.fill();
  ctx.translate(0, L); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
  ctx.beginPath(); ctx.moveTo(-w / 2 + 50, 0); ctx.lineTo(w / 2 - 50, 0); ctx.lineTo(w / 2, 50); ctx.lineTo(w / 2, h); ctx.lineTo(-w / 2, h); ctx.lineTo(-w / 2, 50); ctx.closePath();
  ctx.fillStyle = IVORY; ctx.fill(); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.fillStyle = DARK; ctx.beginPath(); ctx.arc(0, 26, 9, 0, 7); ctx.fill();
  setFont(ctx, MN(o.s1 || 24), 4); ctx.textAlign = 'center'; ctx.fillText(l1, 0, 52 + (o.s1 || 24) * 1.4);
  setFont(ctx, DSP(o.s2 || 110), 3); ctx.fillText(l2, 0, h - 24); ctx.textAlign = 'left'; ctx.restore(); ctx.globalAlpha = a0;
}
const BX = i => -780 + i * 260;
function bars(ctx, t, t0, o = {}) {                            // the fence of bab-1, dropped bar by bar; o.cut = window [x, y, w, h] left open
  const n = 7, sy = o.sy || 1; ctx.save();
  if (o.cut) { const [cx, cy, cw, ch] = o.cut; ctx.beginPath(); ctx.rect(-1100, -800, 2200, 1600); ctx.rect(cx - cw / 2, cy - ch / 2, cw, ch); ctx.clip('evenodd'); }
  for (let i = 0; i < n; i++) {
    const k = pop(t, t0 + i * .07, .45, .25); if (k <= 0) continue; const x = BX(i), y = lerp(-1300, 0, Math.min(1.05, k)), top = -560 * sy + y;
    ctx.fillStyle = '#121310'; ctx.fillRect(x - 16, top, 32, 1120 * sy); ctx.fillStyle = ivo(.4); ctx.fillRect(x - 16, top, 4, 1120 * sy);
  }
  const r = kq(t, t0 + .5, .3);
  if (r > 0) for (const ry of o.rails || [60, 360]) { ctx.fillStyle = '#121310'; ctx.fillRect(-900 * r, ry, 1800 * r, 30); ctx.fillStyle = ivo(.4); ctx.fillRect(-900 * r, ry, 1800 * r, 4); }
  ctx.restore();
}

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {}, TX = {};
  let TT, tt;                                                 // scratch for the letter-filled numeral (and its shards)
  async function load() {
    const K = '../assets/shared/kutipan/';
    IM.arxiv = await loadImg(K + 'arxiv-computer-science-computation-and.png', 2248);
    IM.cf = await loadImg(K + 'cloudflare-cloudflare-just-changed-how-ai-crawlers.png', 2248);
    IM.ppc = await loadImg(K + 'blog-introducing-pay-per-crawl-enabling.png', 1718);
    IM.star = await loadImg(K + 'thestar-exclusive-reddit-in-ai-content-licensing-2.png', 2706);
    IM.tempo = await loadImg(K + 'tempo-tempo-dan-sejumlah-media-bergabung.png', 2248);
    IM.goto = await loadImg(K + 'gotocompany-sahabat-ai-gets-smarter-indosat-and-goto.png', 2706);
    const tc = await loadImg(K + 'techcrunch-anthropic-s-landmark-1-5b-copyright.png', 1260), [c, g] = mk(tc.width, tc.height);
    g.filter = 'grayscale(1) contrast(1.08) brightness(1.04)'; g.drawImage(tc, 0, 0); IM.tc = c;      // green page → neutral (one accent)
    const P = '../assets/shared/ahpo/A03/';
    IM.a1 = await loadImg(P + 'A03-1_BG_rak-perpustakaan.png', 2048);
    IM.a2b = await loadImg(P + 'A03-2b_MG_pagar-kawat_bayangan.png', 2048);
    IM.a2 = await loadImg(P + 'A03-2_MG_pagar-kawat.png', 2048);
    IM.a3b = await loadImg(P + 'A03-3b_FG_gembok_bayangan.png', 915);
    IM.a3 = await loadImg(P + 'A03-3_FG_gembok.png', 915);
    for (const n of ['digital', 'kabel3', 'gembok']) IM[n] = await loadVid('../assets/shared/vid/', n);
    TX.mono = letterTex(`400 19px "${MONO}"`, 36, 3, .5);
    TX.ser = letterTex(`italic 380 30px "${SER}"`, 26, 11, .7);
    [TT, tt] = mk(1400, 620);
  }
  function numTex(str, size, t) {                             // letter texture masked by the numeral → TT
    tt.setTransform(1, 0, 0, 1, 0, 0); tt.globalCompositeOperation = 'copy'; tt.fillStyle = '#0E0F0B'; tt.fillRect(0, 0, 1400, 620);
    tt.globalCompositeOperation = 'source-over'; tt.globalAlpha = 1; tile(tt, TX.ser, 0, 0, 1400, 620, t * 26); tile(tt, TX.mono, 0, 0, 1400, 620, -t * 12);
    tt.globalCompositeOperation = 'destination-in'; setFont(tt, DSP(size), 6); tt.textAlign = 'center'; tt.fillText(str, 700, 310 + size * .36);
    tt.globalCompositeOperation = 'source-over';
  }
  function letterNum(ctx, str, x, y, size, t, t0) {
    const s = t - t0; if (s <= 0) return; const k = E.outQuint(clamp(s / .28)), sc = lerp(1.5, 1, k); numTex(str, size, t);
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(s / .08); ctx.drawImage(TT, -700, -310);
    setFont(ctx, DSP(size), 6); ctx.textAlign = 'center'; ctx.strokeStyle = ivo(.85); ctx.lineWidth = 3; ctx.strokeText(str, 0, size * .36); ctx.textAlign = 'left'; ctx.restore();
  }
  function shatter(ctx, str, x, y, size, t, tS) {             // the numeral breaks into 14×6 shards that fly out under gravity
    const s = t - tS; if (s <= 0 || s > 1.1) return; numTex(str, size, tS); const cw = 100, ch = 620 / 6, a0 = ctx.globalAlpha;
    for (let j = 0; j < 6; j++) for (let i = 0; i < 14; i++) {
      const cx = -700 + cw * (i + .5), cy = -310 + ch * (j + .5), id = i + j * 14, d = Math.hypot(cx, cy) + 1, sp = 520 + 520 * rnd(id + 5);
      const px = cx + cx / d * sp * s, py = cy + (cy / d * sp - 380) * s + 1500 * s * s;
      ctx.save(); ctx.translate(x + px, y + py); ctx.rotate((rnd(id + 9) - .5) * 7 * s); ctx.globalAlpha = a0 * clamp(1 - s / 1.0);
      ctx.drawImage(TT, cw * i, ch * j, cw, ch, -cw / 2, -ch / 2, cw, ch); ctx.restore();
    }
    ctx.globalAlpha = a0;
  }

  // ── S0 · tulisanmu: a post card becomes "bahan", then a price tag swings onto it ───────────────────────────
  function opener(ctx, t) {
    popAt(ctx, -330, 40, t, A.kalau - .05, () => {
      ctx.rotate(-3 * D2R); doc(ctx, 0, 0, 560, 640, { r: 18 });
      ctx.fillStyle = '#16170F'; ctx.beginPath(); ctx.roundRect(-280, -320, 560, 74, [18, 18, 0, 0]); ctx.fill();
      ctx.fillStyle = ivo(.85); ctx.beginPath(); ctx.arc(-238, -283, 18, 0, 7); ctx.fill();
      setFont(ctx, MN(19), 2); ctx.fillStyle = ivo(.85); ctx.fillText('@kamu · 2019', -206, -276);
      setFont(ctx, SRF(46), 0); ctx.fillStyle = DARK; ctx.fillText('Resep sambal matah', -240, -170); ctx.fillText('versi anak kos', -240, -116);
      const n = Math.floor(clamp((t - A.tulisanmu) / 1.1) * 9);
      ctx.fillStyle = 'rgba(17,18,14,.42)'; for (let l = 0; l < n; l++) ctx.fillRect(-240, -60 + l * 34, l % 4 === 3 ? 260 : 480, 11);
      ctx.fillStyle = 'rgba(17,18,14,.6)'; setFont(ctx, MN(17), 2); if (t > A.tulisanmu + .9) ctx.fillText('♡ 1.204   ↩ 87 balasan', -240, 270);
    }, { from: .75, rise: 90, rot: 0 });
    slab(ctx, 'BAHAN BELAJAR AI', -560, 450, t, A.bahan - .05, { size: 30, lx: -420, ly: 330 });
    priceTag(ctx, 420, -380, t, A.bernilai - .08, 'BERNILAI', 'MILIARAN', { w: 430, h: 240 });
    markLine(ctx, 'siapa yang berhak ', 'jual', '?', 430, 330, t, A.siapa - .15, A.jual, SRF(80));
  }

  // ── S1 · robots.txt: a browser types the address, the file reads out, then flips into the sign on a fence ───
  function robots(ctx, t) {
    const flip = inv(A.anggap - .05, A.papan + .05, t), cw = Math.cos(Math.PI * Math.min(1, flip));     // 1 → −1
    if (cw < 0) { ctx.save(); ctx.globalAlpha *= clamp(-cw * 3); bars(ctx, t, A.papan - .4, { rails: [120, 380] }); ctx.restore(); }
    typeOn(ctx, 'TIAP SITUS PUNYA CATATAN KECIL', -820, -420, t, A.situs - .1, MN(24), { ls: 4, cps: 40, col: ivo(.8) });
    if (cw > 0) {                                              // the browser window (front)
      const k = kq(t, A.tiap - .05, .55); ctx.save(); ctx.translate(-250, 20); ctx.scale(cw, 1); ctx.globalAlpha *= k;
      ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 24; ctx.fillStyle = '#14150F'; ctx.beginPath(); ctx.roundRect(-560, -320, 1120, 640, 22); ctx.fill();
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.strokeStyle = ivo(.28); ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#1D1E18'; ctx.beginPath(); ctx.roundRect(-560, -320, 1120, 84, [22, 22, 0, 0]); ctx.fill();
      for (let d = 0; d < 3; d++) { ctx.fillStyle = ivo(.35); ctx.beginPath(); ctx.arc(-520 + d * 30, -278, 8, 0, 7); ctx.fill(); }
      ctx.fillStyle = '#0D0E0A'; ctx.beginPath(); ctx.roundRect(-410, -300, 900, 44, 22); ctx.fill();
      typeOn(ctx, 'situs-kamu.id/robots.txt', -380, -269, t, A.situs - .05, MN(24, 400), { cps: 22, col: ivo(.9) });
      if (t > A.situs && t < A.robots + .3 && Math.floor(t * 2.4) % 2) { ctx.fillStyle = IVORY; ctx.fillRect(-380 + Math.min(24, (t - A.situs + .05) * 22) * 14.4, -290, 3, 28); }
      const L = [['User-agent: GPTBot', 1], ['Disallow: /', 1], ['', 0], ['User-agent: *', 0], ['Allow: /', 0]];
      L.forEach(([s, hot], i) => typeOn(ctx, s, -500, -150 + i * 70, t, A.robots - .1 + i * .3, MN(40, hot ? 700 : 400), { cps: 30, col: hot ? IVORY : ivo(.6) }));
      ctx.restore();
    }
    fall(ctx, 'robots.txt', 380, -60, t, A.robots - .05, DSP(150), { ls: 2 });
    ctx.globalAlpha = gone(t, A.anggap - .05, .3); txt(ctx, 'catatan buat robot yang mampir', 384, 10, t, A.robots + .4, SRF(40), { col: ivo(.8) }); ctx.globalAlpha = 1;
    if (cw < 0) {                                              // the back: a sign bolted to the fence
      ctx.save(); ctx.translate(-250, 20); ctx.scale(-cw, 1);
      ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = '#16170F'; ctx.fillRect(-470, -250, 940, 420);
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.strokeRect(-450, -230, 900, 380);
      for (const bx of [-420, 420]) { ctx.fillStyle = ivo(.6); ctx.beginPath(); ctx.arc(bx, -200, 9, 0, 7); ctx.arc(bx, 120, 9, 0, 7); ctx.fill(); }
      setFont(ctx, MN(24), 6); ctx.fillStyle = ivo(.7); ctx.textAlign = 'center'; ctx.fillText('PAPAN DI PAGAR RUMAH', 0, -165); ctx.textAlign = 'left';
      fall(ctx, 'BOLEH MASUK', -400, -50, t, A.boleh - .05, DSP(110), { ls: 3 });
      const bl = kq(t, A.dilarang - .03, .3);
      if (bl > 0) { ctx.fillStyle = LIME; ctx.fillRect(-412, 10, 640 * bl, 120); }
      fall(ctx, 'DILARANG', -400, 112, t, A.dilarang - .05, DSP(110), { ls: 3, col: bl > .5 ? LIME_INK : IVORY });
      ctx.restore();
      txt(ctx, 'robot mana yang', 384, 10, t, A.robot - .05, SRF(40), { col: ivo(.8) });
    }
  }

  // ── S2 · the crawler: node-network footage, page cards sucked into it ───────────────────────────────────────
  function crawler(ctx, t) {
    plate(ctx, IM.digital, t, -360, 0, 1100, 760, kq(t, A.robot2 - .05, .6), { t0: A.robot2, dim: .3 });
    fall(ctx, 'ROBOT', 300, -170, t, A.robot2 - .02, DSP(150), { ls: 3 });
    txt(ctx, 'maksudnya:', 306, -100, t, A.maksudnya - .05, SRF(40), { col: ivo(.75) });
    fall(ctx, 'PENYEDOT', 300, 40, t, A.penyedot - .05, DSP(170), { ls: 3 });
    fall(ctx, 'HALAMAN WEB', 300, 190, t, A.halaman - .05, DSP(150), { ls: 3 });
    slab(ctx, 'MILIK PERUSAHAAN AI', 306, 300, t, A.perusahaan - .05, { size: 30 });
    for (let i = 0; i < 16; i++) {                              // pages fly from the right edge into the node cloud's heart
      const s = t - (A.penyedot - .25 + i * .08); if (s <= 0) continue; const u = E.inCubic(clamp(s / .75)); if (u >= 1) continue;
      const x0 = 980 + rnd(i) * 200, y0 = (rnd(i + 4) - .5) * 900, x = lerp(x0, -360, u), y = lerp(y0, 0, u) + Math.sin(u * Math.PI) * -120 * (rnd(i + 2) - .5);
      ctx.save(); ctx.translate(x, y); ctx.rotate((rnd(i + 8) - .5) * 1.2 + u * 2); ctx.scale(1 - .8 * u, 1 - .8 * u); ctx.globalAlpha *= clamp(s / .1) * (1 - u * .6);
      ctx.fillStyle = '#ECEAE0'; ctx.fillRect(-60, -80, 120, 160); ctx.fillStyle = 'rgba(17,18,14,.4)'; for (let l = 0; l < 6; l++) ctx.fillRect(-44, -56 + l * 22, l === 0 ? 60 : 88, 7); ctx.restore();
    }
  }

  // ── S3 · Consent in Crisis on arXiv + what C4 is ─────────────────────────────────────────────────────────────
  function consent(ctx, t) {
    typeOn(ctx, 'PENELITI DATA PROVENANCE INITIATIVE NGECEK:', -820, -400, t, A.peneliti - .05, MN(24), { ls: 3, cps: 48, col: ivo(.8) });
    evid(ctx, IM.arxiv, 0, -180, 1560, t, A.nah - .1, { crop: [0, .12, .68, .42], tab: 'arxiv.org', rot: -1, hl: [[.026, .595, .896, .2, A.provenance + .1]] });
    fall(ctx, 'C4', -820, 290, t, A.c4 - .04, DSP(260), { ls: 4 });
    markLine(ctx, '= gudang bacaan web ', 'favorit', '', -560, 200, t, A.gudang - .1, A.favorit, SRF(64), { align: 'left' });
    txt(ctx, 'buat ngelatih AI', -556, 280, t, A.ngelatih - .05, SRF(52), { col: ivo(.85) });
    srcTag(ctx, 'Sumber: Longpre dkk., arXiv, 20 Jul 2024 · Data Provenance Initiative', -840, 450, t, A.provenance + .3);
  }

  // ── S4 · the chart, redrawn: 5 % of all C4 vs 28 %+ of its critical sources locked in one year ──────────────
  function chart(ctx, t) {
    ctx.globalAlpha = gone(t, A.setahun - .3, .3); fall(ctx, 'HASILNYA?', 0, 40, t, A.hasilnya + .02, DSP(240), { align: 'center', ls: 6 });
    txt(ctx, 'bikin kaget', 0, 130, t, A.kaget - .05, SRF(52), { align: 'center', col: ivo(.8) }); ctx.globalAlpha = 1;
    const on = kq(t, A.setahun - .2, .5); if (on <= 0) return; ctx.globalAlpha = on;
    typeOn(ctx, 'TOKEN YANG DIKUNCI LEWAT robots.txt', -780, -380, t, A.setahun - .15, MN(26), { ls: 3, cps: 50 });
    typeOn(ctx, 'APRIL 2023 → APRIL 2024', -780, -330, t, A.april - .05, MN(22, 400), { ls: 4, cps: 40, col: ivo(.7) });
    const X0 = -780, SC = 1300 / 30, rows = [['SELURUH C4', 5, A.april + .2, 5], ['SUMBER KRITIS C4', 28, A.lebih - .05, 28]];
    ctx.fillStyle = ivo(.35); ctx.fillRect(X0 - 4, -250, 3, 560);
    rows.forEach(([lab, v, t0], i) => {
      const y = -200 + i * 260, val = countTo(0, v, t, t0, i ? (A.persen - t0) : .6), w = val * SC, hot = i === 1;
      txt(ctx, lab, X0 + 2, y - 18, t, t0 - .2, MN(22), { ls: 4, col: ivo(.75), rise: 0 });
      if (w > 1) { ctx.save(); ctx.beginPath(); ctx.rect(X0, y, w, 140); ctx.fillStyle = TILE; ctx.fill(); ctx.clip(); ctx.globalAlpha *= hot ? .75 : .45;
        tile(ctx, TX.mono, X0, y, 1400, 140, t * 10); ctx.restore(); ctx.strokeStyle = hot && t > A.persen ? LIME : ivo(.7); ctx.lineWidth = 3; ctx.strokeRect(X0, y, w, 140); }
      if (t > t0) slot(ctx, val, X0 + w + 26, y + 112, DSP(hot ? 130 : 96), { col: hot && t > A.persen - .05 ? LIME : IVORY, fmt: q => q + (hot ? '%+' : '%') });
    });
    const lk = pop(t, A.dikunci - .04, .45, .25);               // the padlock slams onto the 28 % bar
    if (lk > 0) { const y = lerp(-900, 0, Math.min(1.08, lk)); padlock(ctx, X0 + 28 * SC - 70, 130 + y, 70); }
    slab(ctx, 'RESMI DIKUNCI', X0 + 2, 420, t, A.dikunci + .1, { size: 30 });
    ctx.globalAlpha = 1;
    srcTag(ctx, 'Sumber: Longpre dkk., arXiv, 20 Jul 2024 (grafik digambar ulang)', -840, 470, t, A.setahun);
  }

  // ── S5 · the library padlocked: Ahpo's A03 collage in four parallax planes, fence drops, padlock slams ─────
  function library(ctx, t) {
    const d = lerp(-1, 1, E.inOutSine ? E.inOutSine(inv(A.bayangin, A.juli, t)) : inv(A.bayangin, A.juli, t)), S = 2208 / 2048, CW = 2048 * S, CH = 1152 * S;
    const lay = (im, f, dy = 0) => ctx.drawImage(im, -CW / 2 - d * 260 * f, -CH / 2 + dy, CW, CH);
    const k = kq(t, A.bayangin - .1, .6); ctx.save(); ctx.globalAlpha *= k; ctx.beginPath(); ctx.rect(-940, -520, 1880, 1040); ctx.clip();
    lay(IM.a1, .2);
    const fd = pop(t, A.mendadak - .08, .5, .28), fy = lerp(-1300, 0, Math.min(1.06, fd));
    if (fd > 0) { lay(IM.a2b, .45, fy * .95); lay(IM.a2, .5, fy); }
    const gk = pop(t, A.digembok - .05, .42, .24);
    if (gk > 0) { const sc = lerp(1.7, 1, Math.min(1, gk)) * (gk > 1 ? 1 - (gk - 1) * .3 : 1), gw = 915 * S * .62, gh = 1456 * S * .62, gx = 600 - d * 110, gy = 60;
      ctx.save(); ctx.translate(gx, gy); ctx.scale(sc, sc); ctx.globalAlpha *= clamp((t - A.digembok + .05) / .06);
      ctx.drawImage(IM.a3b, -gw / 2 + 14, -gh / 2 + 22, gw, gh); ctx.drawImage(IM.a3, -gw / 2, -gh / 2, gw, gh); ctx.restore(); }
    const g = ctx.createLinearGradient(-940, 0, 200, 0); g.addColorStop(0, 'rgba(11,12,9,.82)'); g.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = g; ctx.fillRect(-940, -520, 1140, 1040);
    ctx.restore();
    typeOn(ctx, 'BAYANGIN PERPUSTAKAAN TERBESAR DI DUNIA', -820, -390, t, A.perpustakaan - .1, MN(24), { ls: 3, cps: 50, col: ivo(.85) });
    txt(ctx, 'dalam setahun,', -820, -250, t, A.setahun2 - .05, SRF(52), { col: ivo(.85) });
    fall(ctx, 'LEBIH DARI 1/4', -824, -60, t, A.seperempat - .05, DSP(190), { ls: 3 });
    txt(ctx, 'RAK TERBAIKNYA', -816, 20, t, A.rak - .05, MN(34), { ls: 6, col: ivo(.9) });
    markLine(ctx, 'mendadak ', 'digembok', '.', -820, 220, t, A.mendadak - .15, A.digembok, SRF(92), { align: 'left' });
  }

  // ── S6 · July 2025, Cloudflare: date, then the full article (in post), then the gate that bounces the bots ─
  const BOTS = ['GPTBot', 'ClaudeBot', 'CCBot', 'Bytespider', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'meta-externalagent', 'GPTBot', 'CCBot', 'ClaudeBot'];
  function cloudflare(ctx, t) {
    plate(ctx, IM.kabel3, t, 0, 0, 1800, 960, kq(t, A.juli - .05, .5), { t0: A.juli, dim: .55 });
    ctx.globalAlpha = gone(t, A.cloudflare - .1, .25);
    fall(ctx, 'JULI 2025', 0, 40, t, A.juli - .02, DSP(260), { align: 'center', ls: 6 });
    typeOn(ctx, 'CLOUDFLARE', 0, 140, t, A.y2025 + .3, MN(40), { align: 'center', ls: 14, cps: 20 }); ctx.globalAlpha = 1;
    if (t < A.lintas) return;
    typeOn(ctx, 'CLOUDFLARE · PENJAGA LALU LINTAS INTERNET', -820, -400, t, A.lintas + .3, MN(24), { ls: 3, cps: 50, col: ivo(.85) });
    const GX = 120, blk = pop(t, A.ngeblokir - .05, .45, .25);
    ctx.fillStyle = ivo(.25); ctx.fillRect(GX - 6, -330, 12, 660);
    if (blk > 0) { const y = lerp(-900, 0, Math.min(1.05, blk)); ctx.fillStyle = IVORY; ctx.fillRect(GX - 22, -330 + y, 44, 660); ctx.fillStyle = DARK;
      for (let j = 0; j < 8; j++) ctx.fillRect(GX - 22, -300 + y + j * 82, 44, 10); }
    BOTS.forEach((b, i) => {
      const ts = A.lintas + .15 + i * .3, s = t - ts; if (s <= 0) return; const lane = (i % 3 - 1) * 170, V = 760; setFont(ctx, MN(24), 2);
      const w = ctx.measureText(b).width + 50, tg = ts + (GX - 30 - w + 1000) / V; let x = -1000 + V * s, a = 1, hit = false;
      if (tg >= A.ngeblokir && t > tg) { const q = t - tg; x = GX - 30 - w - 240 * (1 - Math.exp(-q * 5)); a = 1 - clamp((q - .5) / .5); hit = true; }
      if (!hit && x > 880) a = clamp(1 - (x - 880) / 120); if (a <= 0) return;
      ctx.save(); ctx.globalAlpha *= a * clamp(s / .1); ctx.fillStyle = hit ? '#16170F' : '#1D1E18'; ctx.beginPath(); ctx.roundRect(x, lane - 30, w, 60, 30); ctx.fill();
      ctx.strokeStyle = hit ? IVORY : ivo(.45); ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = hit ? IVORY : ivo(.75); ctx.fillText(b, x + 25, lane + 8);
      if (hit) { ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 14, lane); ctx.lineTo(x + w - 14, lane); ctx.stroke(); }
      ctx.restore();
    });
    slab(ctx, 'OTOMATIS', 300, -250, t, A.otomatis - .05, { size: 30 });
    stamp(ctx, 'DIBLOKIR', 560, 120, t, A.ngeblokir + .05, { size: 130, rot: -5 });
    txt(ctx, 'dari awal · bawaan', 560, 260, t, A.awal - .05, SRF(48), { align: 'center', col: ivo(.9) });
  }

  // ── S7 · a new site asks first: the setting defaults to "no", unless they pay per crawl ──────────────────────
  function newSite(ctx, t) {
    const X = -400, Y = -20;
    const btn = kq(t, A.bikin - .35, .4), press = A.bikin - .02, dlg = kq(t, A.baru - .1, .5);
    if (dlg < 1) { ctx.save(); ctx.globalAlpha *= btn * (1 - dlg); const sq = t > press ? 1 - .06 * Math.exp(-(t - press) * 14) : 1; ctx.translate(X, Y); ctx.scale(sq, sq);
      ctx.fillStyle = IVORY; ctx.beginPath(); ctx.roundRect(-210, -48, 420, 96, 48); ctx.fill(); setFont(ctx, MN(28), 4); ctx.fillStyle = DARK; ctx.textAlign = 'center'; ctx.fillText('+ BIKIN SITUS', 0, 10); ctx.textAlign = 'left'; ctx.restore(); }
    if (dlg > 0) { ctx.save(); ctx.translate(X, Y + (1 - dlg) * 60); ctx.globalAlpha *= dlg;
      ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 28; ctx.fillStyle = '#16170F'; ctx.beginPath(); ctx.roundRect(-440, -300, 880, 600, 26); ctx.fill();
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.stroke();
      typeOn(ctx, 'SITUS BARU · situs-kamu.id', -390, -230, t, A.baru, MN(22), { ls: 2, cps: 45, col: ivo(.7) });
      ctx.fillStyle = ivo(.15); ctx.fillRect(-390, -200, 780, 2);
      txt(ctx, 'Izinkan crawler AI', -390, -100, t, A.ditanya - .1, SRF(56), { rise: 20 }); txt(ctx, 'membaca situs ini?', -390, -36, t, A.ditanya + .1, SRF(56), { rise: 20 });
      const tg = kq(t, A.izin - .1, .4);                       // toggle, default OFF
      if (tg > 0) { ctx.globalAlpha *= tg; ctx.fillStyle = '#2A2B24'; ctx.beginPath(); ctx.roundRect(230, -110, 150, 76, 38); ctx.fill(); ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ivo(.8); ctx.beginPath(); ctx.arc(268, -72, 28, 0, 7); ctx.fill(); setFont(ctx, MN(20), 3); ctx.fillStyle = ivo(.7); ctx.fillText('MATI', 300, -64);
        const pr = t - A.setelan; if (pr > 0 && pr < 1.2) { ctx.strokeStyle = ivo(.7 * (1 - pr / 1.2)); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(230 - pr * 40, -110 - pr * 40, 150 + pr * 80, 76 + pr * 80, 38 + pr * 40); ctx.stroke(); }
        ctx.globalAlpha /= tg; }
      ctx.fillStyle = ivo(.15); ctx.fillRect(-390, 40, 780, 2);
      txt(ctx, 'SETELAN BAWAAN', -390, 110, t, A.setelan - .05, MN(22), { ls: 4, col: ivo(.7), rise: 10 });
      const bl = kq(t, A.dilarang2 - .03, .3); if (bl > 0) { ctx.fillStyle = LIME; ctx.fillRect(-396, 150, 620 * bl, 100); }
      fall(ctx, 'ROBOT AI DILARANG', -384, 228, t, A.robot4 - .05, DSP(92), { ls: 3, col: bl > .5 ? LIME_INK : IVORY });
      ctx.restore(); }
    const cur = t < A.baru ? E.inOutCubic(inv(A.bikin - .9, A.bikin - .1, t)) : 0;     // cursor travels to the button and clicks
    if (t > A.bikin - .9 && t < A.baru + .2) { const cx = lerp(200, X + 60, cur), cy = lerp(380, Y + 20, cur);
      ctx.save(); ctx.translate(cx, cy); ctx.globalAlpha *= 1 - inv(A.baru - .1, A.baru + .2, t); ctx.fillStyle = IVORY; ctx.strokeStyle = DARK; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 52); ctx.lineTo(14, 40); ctx.lineTo(25, 62); ctx.lineTo(34, 57); ctx.lineTo(23, 36); ctx.lineTo(40, 36); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
    evid(ctx, IM.ppc, 500, -110, 760, t, A.robot4 + .1, { crop: [.05, .02, .9, .5], tab: 'blog.cloudflare.com', rot: 1.5, dark: true, hl: [[.048, .70, .70, .2, A.bayar - .1]] });
    txt(ctx, 'kecuali mereka mau', 160, 250, t, A.kecuali - .05, SRF(48), { col: ivo(.85) });
    stamp(ctx, 'BAYAR PER CRAWL', 520, 360, t, A.bayar - .03, { size: 76, rot: -3 });
    srcTag(ctx, 'Sumber: Cloudflare, 1 Jul 2025 · Cloudflare Blog, 1 Jul 2025', -840, 470, t, A.cloudflare);
  }

  // ── S8a · signature: the fence bars part and become a ticket booth ───────────────────────────────────────────
  function loket(ctx, t) {
    const m = E.inOutCubic(inv(A.lahirlah - .2, A.loket + .1, t)), win = [0, 90, 620 * m, 300 * m];
    bars(ctx, t, A.pagar2 - .35, { cut: m > 0 ? win : null });
    if (m > 0) { const g = ctx.createRadialGradient(0, 90, 20, 0, 90, 380); g.addColorStop(0, ivo(.16 * m)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(-380, -110, 760, 400);
      if (m > .8) { ctx.save(); ctx.globalAlpha *= inv(.8, 1, m); setFont(ctx, MN(22), 5); ctx.fillStyle = ivo(.75); ctx.textAlign = 'center'; ctx.fillText('TARIF AKSES DATA', 0, 20);
        setFont(ctx, DSP(96), 3); ctx.fillStyle = IVORY; ctx.fillText('Rp — / HALAMAN', 0, 130); ctx.textAlign = 'left'; ctx.restore(); }
      ctx.fillStyle = IVORY; ctx.fillRect(-370 * m, 90 + 150 * m, 740 * m, 22); ctx.fillStyle = ivo(.35); ctx.fillRect(-370 * m, 90 + 150 * m + 22, 740 * m, 8); }
    const sg = pop(t, A.loket - .06, .45, .25);
    if (sg > 0) { const y = lerp(-700, -150, Math.min(1.04, sg)); ctx.save(); ctx.translate(0, y); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
      ctx.fillStyle = IVORY; ctx.fillRect(-300, -70, 600, 130); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
      setFont(ctx, DSP(118), 10); ctx.fillStyle = DARK; ctx.textAlign = 'center'; ctx.fillText('LOKET DATA', 0, 42); ctx.textAlign = 'left'; ctx.restore(); }
    typeOn(ctx, 'UJUNG-UJUNGNYA,', -820, -420, t, A.ujungnya - .05, MN(26), { ls: 6, cps: 40, col: ivo(.85) });
    markLine(ctx, 'dari pagar-pagar itu, lahirlah ', 'loket', '.', 0, 450, t, A.pagar2 - .1, A.loket, SRF(70));
  }

  // ── S8b · Reddit → Google: the report, a receipt printing out, and the caveat ───────────────────────────────
  function reddit(ctx, t) {
    evid(ctx, IM.star, -300, -230, 1180, t, A.reddit - .12, { crop: [.03, .37, .64, .26], tab: 'thestar.com.my', rot: -1,
      hl: [[.027, .223, .861, .204, A.nerima - .1], [.027, .427, .19, .2, A.google]] });
    fall(ctx, '±US$60 JUTA', -880, 150, t, A.enam - .04, DSP(190), { ls: 3 });
    txt(ctx, 'per tahun · dari Google · buat akses data Reddit', -874, 220, t, A.setahun3 - .05, SRF(38), { col: ivo(.85) });
    slab(ctx, 'ANGKA DILAPORKAN MEDIA, BUKAN RESMI', -880, 340, t, A.google + .3, { size: 26 });
    const pr = E.outCubic(inv(A.nerima - .05, A.akses + .3, t)), RX = 600, RT = -330, RH = 640 * pr;   // receipt printing from a slot
    ctx.fillStyle = '#1D1E18'; ctx.beginPath(); ctx.roundRect(RX - 250, RT - 60, 500, 70, 14); ctx.fill(); ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#060705'; ctx.fillRect(RX - 205, RT - 8, 410, 10);
    if (RH > 2) { ctx.save(); ctx.beginPath(); ctx.rect(RX - 210, RT, 420, RH); ctx.clip(); ctx.translate(0, RH - 640);
      ctx.fillStyle = '#EEECE2'; ctx.fillRect(RX - 195, RT, 390, 640); ctx.fillStyle = DARK; ctx.textAlign = 'center';
      setFont(ctx, MN(22), 3); ctx.fillText('— STRUK DATA —', RX, RT + 50); setFont(ctx, MN(18, 400), 1); ctx.fillText('22 FEB 2024', RX, RT + 84);
      ctx.fillStyle = 'rgba(17,18,14,.5)'; for (let x = RX - 170; x < RX + 170; x += 16) ctx.fillRect(x, RT + 110, 8, 2);
      ctx.fillStyle = DARK; ctx.textAlign = 'left'; setFont(ctx, MN(22), 1);
      ctx.fillText('PENJUAL', RX - 170, RT + 160); ctx.fillText('REDDIT', RX + 30, RT + 160);
      ctx.fillText('PEMBELI', RX - 170, RT + 205); ctx.fillText('GOOGLE', RX + 30, RT + 205);
      ctx.fillText('BARANG', RX - 170, RT + 250); ctx.fillText('AKSES DATA', RX + 30, RT + 250);
      ctx.fillStyle = 'rgba(17,18,14,.5)'; for (let x = RX - 170; x < RX + 170; x += 16) ctx.fillRect(x, RT + 290, 8, 2);
      ctx.fillStyle = DARK; setFont(ctx, MN(20), 2); ctx.fillText('TOTAL / TAHUN', RX - 170, RT + 345);
      setFont(ctx, DSP(96), 2); ctx.textAlign = 'center'; ctx.fillText('±US$60 JT', RX, RT + 450);
      setFont(ctx, MN(16, 400), 1); ctx.fillText('*dilaporkan media', RX, RT + 500);
      ctx.fillStyle = 'rgba(17,18,14,.75)'; for (let i = 0; i < 26; i++) ctx.fillRect(RX - 170 + i * 13, RT + 540, rnd(i) > .4 ? 5 : 2, 60);
      ctx.textAlign = 'left'; ctx.restore(); }
    srcTag(ctx, 'Sumber: Reuters via The Star, 22 Feb 2024', -840, 470, t, A.reddit + .3);
  }

  // ── S9 · books: Anthropic sued by authors ─────────────────────────────────────────────────────────────────────
  function lawsuit(ctx, t) {
    fall(ctx, 'URUSAN BUKU', -820, -230, t, A.urusan - .04, DSP(170), { ls: 4 });
    txt(ctx, 'lebih rame lagi', -814, -160, t, A.rame - .05, SRF(48), { col: ivo(.85) });
    fall(ctx, 'ANTHROPIC', -820, 60, t, A.anthropic - .04, DSP(150), { ls: 4 });
    txt(ctx, 'pembuat chatbot Claude', -814, 125, t, A.claude - .1, SRF(44), { col: ivo(.85) });
    txt(ctx, 'digugat sekelompok penulis buku', -814, 300, t, A.penulis - .1, SRF(52));
    for (let i = 0; i < 9; i++) {                               // the stack of books drops in, spine labels from KATA
      const k = pop(t, A.buku - .1 + i * .09, .5, .26); if (k <= 0) continue; const h = 62, w = 400 + rnd(i + 2) * 120, y = 360 - (i + 1) * h, x = 470 + (rnd(i + 7) - .5) * 60;
      const yy = lerp(-1200, y, Math.min(1.04, k)); ctx.save(); ctx.translate(x, yy + h / 2); ctx.rotate((rnd(i + 3) - .5) * 4 * D2R);
      ctx.fillStyle = i % 3 === 1 ? '#22231C' : TILE; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; ctx.strokeRect(-w / 2, -h / 2, w, h);
      ctx.fillStyle = ivo(.35); ctx.fillRect(-w / 2 + 24, -h / 2, 5, h); ctx.fillRect(w / 2 - 29, -h / 2, 5, h);
      setFont(ctx, SRF(30), 0); ctx.fillStyle = ivo(.85); ctx.textAlign = 'center'; ctx.fillText(KATA[(i * 5 + 2) % KATA.length] + ' ' + KATA[(i * 11 + 7) % KATA.length], 0, 10); ctx.textAlign = 'left'; ctx.restore();
    }
    ctx.fillStyle = ivo(.3); ctx.fillRect(170, 362, 600, 6);
    stamp(ctx, 'DIGUGAT', 470, 0, t, A.digugat - .03, { size: 150, rot: -7 });
  }

  // ── S10 · the judge: two columns split by a divider ───────────────────────────────────────────────────────────
  function judge(ctx, t) {
    typeOn(ctx, 'KATA HAKIM SOAL NGELATIH AI PAKAI BUKU:', -820, -400, t, A.hakim - .05, MN(26), { ls: 3, cps: 46, col: ivo(.85) });
    const dv = E.outQuint(inv(A.ngelatih2, A.ngelatih2 + .5, t)); ctx.fillStyle = ivo(.7); ctx.fillRect(-2, -300 * dv, 4, 640 * dv);
    const L = 1 - .55 * kq(t, A.masalahnya, .5);
    ctx.globalAlpha = L;
    fall(ctx, 'BUKU DIBELI', -440, -150, t, A.dibeli - .05, DSP(130), { align: 'center', ls: 3 });
    fall(ctx, 'SECARA SAH', -440, -10, t, A.resmi2 - .05, DSP(130), { align: 'center', ls: 3 });
    txt(ctx, '= PENGGUNAAN WAJAR', -440, 90, t, A.wajar - .05, MN(34), { align: 'center', ls: 4 });
    const ck = kq(t, A.wajar + .05, .35); if (ck > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-500, 210);
      ctx.lineTo(-500 + 40 * Math.min(1, ck * 2), 210 + 40 * Math.min(1, ck * 2)); if (ck > .5) ctx.lineTo(-460 + 100 * (ck - .5) * 2, 250 - 110 * (ck - .5) * 2); ctx.stroke(); ctx.lineCap = 'butt'; }
    ctx.globalAlpha = 1;
    txt(ctx, 'masalahnya:', 440, -230, t, A.masalahnya - .05, SRF(44), { align: 'center', col: ivo(.75) });
    fall(ctx, 'BUKU DARI', 440, -100, t, A.situs2 - .25, DSP(120), { align: 'center', ls: 3 });
    markLine(ctx, 'SITUS ', 'BAJAKAN', '', 440, 40, t, A.situs2 - .1, A.bajakan, DSP(120), { ls: 3, rise: 30 });
    txt(ctx, '= DIPERSOALKAN', 440, 150, t, A.bajakan + .2, MN(34), { align: 'center', ls: 4 });
  }

  // ── S11 · US$1.5 billion settlement: the letter-filled number shatters into "US$3.000 per karya" ───────────
  function settle(ctx, t) {
    typeOn(ctx, 'AKHIRNYA ANTHROPIC MILIH DAMAI', -820, -400, t, A.akhirnya + .1, MN(26), { ls: 4, cps: 40, col: ivo(.85) });
    const tS = A.sekitar - .06, NX = -300;
    if (t < tS) { letterNum(ctx, 'US$1,5', NX, -40, 330, t, A.satu - .05); txt(ctx, 'MILIAR', NX, 170, t, A.miliar - .05, MN(60), { align: 'center', ls: 26 }); }
    shatter(ctx, 'US$1,5', NX, -40, 330, t, tS);
    txt(ctx, 'SEKITAR', NX, -230, t, A.sekitar, MN(26), { align: 'center', ls: 12, col: ivo(.75) });
    fall(ctx, 'US$3.000', NX, 40, t, A.tiga - .04, DSP(280), { align: 'center', ls: 4, stag: .03 });
    if (t > A.karya - .05) slab(ctx, 'PER KARYA', NX, 150, t, A.karya - .05, { size: 40, align: 'center', lime: true });
    evid(ctx, IM.tc, 520, 40, 740, t, A.disahin - .15, { crop: [0, .08, 1, .82], tab: 'techcrunch.com', rot: 1.6, hl: [[.045, .36, .28, .11, A.pengadilan - .05]] });
    txt(ctx, 'disahkan pengadilan · Juli 2026', NX, 300, t, A.pengadilan - .1, SRF(44), { align: 'center', col: ivo(.85) });
    srcTag(ctx, 'Sumber: TechCrunch, 20 Jul 2026', -840, 470, t, A.disahin);
  }

  // ── S12 · turning point: words fall like rain into a tank — and now there's a meter on it ──────────────────
  function rain(ctx, t) {
    ctx.globalAlpha = gone(t, A.dulu - .15, .3);
    typeOn(ctx, 'MENURUTKU, INI', 0, -200, t, A.menurutku, MN(30), { align: 'center', ls: 10, cps: 30, col: ivo(.8) });
    fall(ctx, 'TITIK BALIK', 0, 30, t, A.titik - .05, DSP(260), { align: 'center', ls: 6 }); ctx.globalAlpha = 1;
    if (t < A.dulu - .2) return;
    const TX0 = 180, TW = 560, TB = 430, lvl = lerp(TB - 20, 200, E.outCubic(inv(A.ditampung - .5, A.sekarang + 2, t)));
    for (let i = 0; i < 90; i++) {                              // the rain of words
      const s = t - (A.dulu - .1 + i * .07 * (1 - i / 260)); if (s <= 0) continue; const y = -600 + .5 * 2400 * s * s; if (y > lvl) continue;
      ctx.save(); ctx.translate(TX0 + (rnd(i + 1) - .5) * (TW - 120), y); ctx.globalAlpha *= .55 + .4 * rnd(i + 3);
      setFont(ctx, i % 3 ? SRF(30 + 10 * rnd(i)) : MN(20), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(KATA[i * 7 % KATA.length], 0, 0); ctx.restore();
    }
    const tk = kq(t, A.dulu - .2, .5); ctx.globalAlpha = tk;
    ctx.save(); ctx.beginPath(); ctx.rect(TX0 - TW / 2, lvl, TW, TB - lvl); ctx.fillStyle = '#0E0F0B'; ctx.fill(); ctx.clip(); ctx.globalAlpha = tk * .7; tile(ctx, TX.ser, TX0 - TW / 2, lvl, TW, 600, t * 18); ctx.restore();
    ctx.globalAlpha = tk; ctx.strokeStyle = ivo(.8); ctx.lineWidth = 3; ctx.beginPath();
    for (let x = TX0 - TW / 2; x <= TX0 + TW / 2; x += 8) ctx.lineTo(x, lvl + Math.sin(x * .04 + t * 7) * 4); ctx.stroke();
    ctx.lineWidth = 5; ctx.strokeStyle = IVORY; ctx.beginPath(); ctx.moveTo(TX0 - TW / 2, 120); ctx.lineTo(TX0 - TW / 2, TB); ctx.lineTo(TX0 + TW / 2, TB); ctx.lineTo(TX0 + TW / 2, 120); ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.globalAlpha = gone(t, A.sekarang - .2, .3);
    txt(ctx, 'dulu, tulisan kita', -820, -330, t, A.dulu - .1, SRF(56));
    markLine(ctx, 'kayak ', 'air hujan', '', -820, -240, t, A.air - .2, A.hujan, SRF(64), { align: 'left' });
    txt(ctx, 'ditampung siapa aja.', -820, -150, t, A.ditampung - .1, SRF(56), { col: ivo(.85) });
    ctx.globalAlpha = 1;
    markLine(ctx, 'sekarang udah ada ', 'meterannya', '.', -820, -300, t, A.sekarang + .05, A.meterannya, SRF(64), { align: 'left' });
    const mt = pop(t, A.sekarang + .2, .5, .28);                // the water meter, digits rolling
    if (mt > 0) { const MX = -560, MY = 220, v = Math.max(0, t - A.sekarang - .3) * 2370 + 18; ctx.save(); ctx.translate(MX, MY); ctx.scale(Math.min(1.06, mt), Math.min(1.06, mt));
      ctx.strokeStyle = ivo(.6); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(250, 40); ctx.lineTo(TX0 - TW / 2 - MX, 40); ctx.stroke();
      ctx.fillStyle = '#16170F'; ctx.beginPath(); ctx.roundRect(-260, -90, 520, 180, 18); ctx.fill(); ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.stroke();
      setFont(ctx, MN(18), 4); ctx.fillStyle = ivo(.7); ctx.fillText('METERAN · TOKEN', -230, -54);
      for (let dgi = 0; dgi < 6; dgi++) { const pl = 10 ** (5 - dgi), raw = v / pl, x = -220 + dgi * 74;
        ctx.fillStyle = '#0B0C09'; ctx.fillRect(x, -30, 62, 96);
        slot(ctx, dgi === 5 ? raw : Math.floor(raw), x + 31, 48, DSP(88), { align: 'center', col: LIME, fmt: q => String(((q % 10) + 10) % 10) }); }
      ctx.restore(); }
  }

  // ── S13 · Indonesia: Sahabat-AI (GoTo × Indosat) and the media partners, highlighted name by name ───────────
  function indo(ctx, t) {
    ctx.globalAlpha = gone(t, A.sahabat - .25, .25);
    fall(ctx, 'DI INDONESIA', 0, 20, t, A.indonesia - .1, DSP(240), { align: 'center', ls: 6 });
    txt(ctx, 'juga kerasa', 0, 110, t, A.kerasa - .05, SRF(56), { align: 'center', col: ivo(.85) }); ctx.globalAlpha = 1;
    const mv = E.inOutCubic(inv(A.ngegandeng - .5, A.ngegandeng + .1, t)), y = lerp(40, 300, mv), sz = lerp(220, 150, mv), x = lerp(0, -820, mv);
    fall(ctx, 'SAHABAT-AI', x, y, t, A.sahabat - .05, DSP(sz), { align: mv > .5 ? 'left' : 'center', ls: 4 });
    typeOn(ctx, 'GOTO × INDOSAT', mv > .5 ? x + 6 : 0, y + lerp(80, 64, mv), t, A.goto - .05, MN(lerp(36, 28, mv)), { align: mv > .5 ? 'left' : 'center', ls: 8, cps: 22 });
    evid(ctx, IM.tempo, 0, -190, 1560, t, A.ngegandeng - .4, { crop: [0, 0, .74, .66], tab: 'tempo.co', rot: -.8,
      hl: [[.066, .585, .072, .11, A.tempo - .05], [.143, .585, .089, .11, A.kompas - .05], [.234, .585, .106, .11, A.republika - .05], [.371, .585, .151, .11, A.hukumonline - .05]] });
    [['TEMPO', A.tempo], ['KOMPAS', A.kompas], ['REPUBLIKA', A.republika], ['HUKUMONLINE', A.hukumonline]].forEach(([n, a], i) =>
      txt(ctx, n, 120 + i * 190, 330, t, a - .05, MN(22), { ls: 3, col: ivo(.85), rise: 16 }));
    txt(ctx, 'ngegandeng media:', 120, 270, t, A.ngegandeng - .05, SRF(40), { col: ivo(.75) });
    srcTag(ctx, 'Sumber: Tempo, 21 Jun 2025', -840, 470, t, A.ngegandeng);
  }

  // ── S14 · the purpose: an AI that understands our language and context ─────────────────────────────────────
  function purpose(ctx, t) {
    evid(ctx, IM.goto, 0, -180, 1300, t, A.tujuannya - .12, { crop: [.18, .47, .64, .34], tab: 'gotocompany.com', rot: 1, hl: [[.122, .265, .612, .14, A.simpel]] });
    txt(ctx, 'TUJUANNYA SIMPEL:', 0, 150, t, A.simpel - .05, MN(28), { align: 'center', ls: 8, col: ivo(.8) });
    markLine(ctx, 'AI yang paham bahasa dan ', 'konteks kita', '', 0, 280, t, A.paham - .3, A.konteks, SRF(76));
    srcTag(ctx, 'Sumber: GoTo, 2 Jun 2025', -840, 470, t, A.tujuannya + .2);
  }

  // ── S15 · news has a price — and your comments? A generic social card gets a "Rp ???" tag ────────────────
  function comments(ctx, t) {
    fall(ctx, 'BERITA ADA HARGANYA.', -820, -320, t, A.berita - .05, DSP(120), { ls: 3 });
    priceTag(ctx, 540, -500, t, A.harganya - .06, 'BERITA', 'Rp ✓', { w: 300, h: 180, s2: 80, len: 70, from: 30 });
    popAt(ctx, -280, 110, t, A.komentar - .3, () => {
      ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = '#1A1B15'; ctx.beginPath(); ctx.roundRect(-430, -150, 860, 300, 26); ctx.fill();
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = ivo(.8); ctx.beginPath(); ctx.arc(-370, -90, 30, 0, 7); ctx.fill(); setFont(ctx, MN(20), 1); ctx.fillStyle = DARK; ctx.textAlign = 'center'; ctx.fillText('KM', -370, -83); ctx.textAlign = 'left';
      setFont(ctx, MN(22), 1); ctx.fillStyle = IVORY; ctx.fillText('@kamu', -320, -96); setFont(ctx, MN(18, 400), 1); ctx.fillStyle = ivo(.55); ctx.fillText('· 3 mnt', -230, -96);
      typeOn(ctx, 'jujur capek banget hari ini, tapi', -320, -30, t, A.komentar - .15, SRF(40), { cps: 45 });
      typeOn(ctx, 'seneng liat kalian semua 🥲', -320, 24, t, A.komentar + .55, SRF(40), { cps: 45 });
      ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2.5; setFont(ctx, MN(18, 400), 1); ctx.fillStyle = ivo(.55);
      ctx.fillText('♡ 38     ↩ balas     ⟲ bagikan', -320, 110);
    }, { from: .8, rise: 60 });
    priceTag(ctx, 150, -110, t, A.curhatanmu - .08, 'KOMENTARMU', 'Rp ???', { w: 300, h: 180, s2: 80, len: 60, from: -34, rest: -6 });
    markLine(ctx, 'dihargai ', 'berapa', '?', -820, 380, t, A.medsos - .1, A.medsos + .25, SRF(64), { align: 'left' });
    stamp(ctx, 'DIJAWAB DI BAB 5', 500, 330, t, A.terakhir - .03, { size: 76, rot: -4 });
  }

  // ── S16 · fences higher, booths pricier — three ways out ──────────────────────────────────────────────────────
  function paths(ctx, t) {
    plate(ctx, IM.gembok, t, 0, 0, 1760, 920, kq(t, A.karena - .05, .6), { t0: A.karena, dim: .45 + .25 * kq(t, A.ada - .3, .5) });
    const out = gone(t, A.ada - .3, .35); ctx.save(); ctx.globalAlpha *= out;
    ctx.save(); const sy = 1 + .25 * E.inOutCubic(inv(A.tinggi - .05, A.tinggi + .6, t)); ctx.translate(0, 560); ctx.scale(1, sy); ctx.translate(0, -560);
    bars(ctx, t, A.pagar3 - .3); ctx.restore();
    slab(ctx, 'PAGAR MAKIN TINGGI', -820, -380, t, A.tinggi - .05, { size: 30 });
    slab(ctx, 'LOKET MAKIN MAHAL', -820, -310, t, A.mahal - .05, { size: 30 });
    if (t > A.mahal - .05) { const q = [99, 299, 499, 999][Math.min(3, Math.floor((t - A.mahal + .05) / .16))]; setFont(ctx, DSP(140), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'right'; ctx.fillText('Rp ' + q + '+', 840, -230); ctx.textAlign = 'left'; }
    txt(ctx, 'pembuat AI muter otak.', -820, -200, t, A.pembuat - .05, SRF(56));
    ctx.restore();
    if (t < A.ada - .3) return;
    const P = [[-560, -60], [0, -150], [560, -60]];
    P.forEach(([px, py], i) => {
      const k = E.inOutCubic(inv(A.ada - .2 + i * .1, A.ada + .5 + i * .1, t)); if (k <= 0) return;
      ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); const N = 40;
      for (let j = 0; j <= N * k; j++) { const u = j / N, x = (1 - u) ** 2 * 0 + 2 * (1 - u) * u * px * .2 + u * u * px, y = (1 - u) ** 2 * 470 + 2 * (1 - u) * u * 160 + u * u * py; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      const nk = pop(t, A.tiga2 + i * .1, .45, .25); if (nk > 0) { ctx.save(); ctx.translate(px, py); ctx.scale(Math.min(1.1, nk), Math.min(1.1, nk));
        ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 54, 0, 7); ctx.fill(); setFont(ctx, DSP(80), 0); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 28); ctx.textAlign = 'left'; ctx.restore(); }
    });
    fall(ctx, 'TIGA JALAN KELUAR', 0, -300, t, A.tiga2 - .04, DSP(200), { align: 'center', ls: 6, stag: .03 });
  }

  const ST = [
    { at: 0, name: 'Tulisanmu berlabel harga', draw: opener, dist: [1600, 1460] },
    { at: A.tiap, via: 'whip', name: 'robots.txt → papan', draw: robots, dist: [1560, 1440] },
    { at: A.robot2, via: 'push', name: 'Robot penyedot', draw: crawler, dist: [1560, 1420] },
    { at: A.nah, via: 'rise', name: 'Consent in Crisis', draw: consent, dist: [1540, 1440] },
    { at: A.hasilnya, via: 'whip', name: 'Grafik 28 %+ dikunci', draw: chart, dist: [1580, 1460] },
    { at: A.bayangin, via: 'push', name: 'Perpustakaan digembok', draw: library, dist: [1500, 1400] },
    { at: A.juli, via: 'whip', name: 'Cloudflare', draw: cloudflare, dist: [1560, 1460] },
    { at: A.bikin, via: 'rise', name: 'Situs baru + pay per crawl', draw: newSite, dist: [1540, 1440] },
    { at: A.ujungnya, via: 'push', name: 'Pagar jadi loket', draw: loket, dist: [1600, 1440] },
    { at: A.reddit, via: 'whip', name: 'Reddit → Google', draw: reddit, dist: [1540, 1450] },
    { at: A.urusan, via: 'truck', name: 'Anthropic digugat', draw: lawsuit, dist: [1560, 1440] },
    { at: A.hakim, via: 'push', name: 'Kata hakim', draw: judge, dist: [1560, 1440] },
    { at: A.akhirnya, via: 'whip', name: 'US$1,5 M pecah', draw: settle, dist: [1560, 1460] },
    { at: A.menurutku, via: 'rise', name: 'Hujan → meteran', draw: rain, dist: [1600, 1460] },
    { at: A.di, via: 'whip', name: 'Sahabat-AI', draw: indo, dist: [1560, 1460] },
    { at: A.tujuannya, via: 'push', name: 'Tujuannya', draw: purpose, dist: [1540, 1440] },
    { at: A.nah2, via: 'whip', name: 'Komentarmu berapa?', draw: comments, dist: [1560, 1440] },
    { at: A.karena, via: 'push', name: 'Tiga jalan keluar', draw: paths, dist: [1600, 1480] },
  ];
  let FULLS;
  return makeChapter({ B, ST, load, label: 'BAB 2 · INTERNET MULAI DIPAGARI', full: () => FULLS ??= [
    { im: IM.cf, t0: A.cloudflare - .15, t1: A.lintas + .35, crop: [0, 0, 1, 1], tab: 'cloudflare.com', dir: 1, hl: [[.30, .935, .54, .045, A.aturan + .1]] },
  ] });
}
