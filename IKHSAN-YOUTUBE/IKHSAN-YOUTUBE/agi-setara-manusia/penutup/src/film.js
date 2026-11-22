// Bab Penutup · "Giliranmu" — VO take 10 (42.5 s), warna hangat terang. Satu baris kedalaman, kamera truck → push → rise → whip → push.
// P1 rapor bergerigi (kolom tinggi = ujian) · P2 truck ke kolom pendek (PELUPA / SUKA MENEBAK / BOROS BELAJAR) · P3 opini: penggaris kaku,
// label DIJUAL dicoret, lime di TIDAK · P4 saklar AGI berpindah TANPA BUNYI (bed hening, playhead melewati KLIK yang datar) ·
// P5 "sekarang giliran KAMU" · P6 templat komentar diketik (titik-titik muncul per "titik") + subscribe diklik kursor →
// layar akhir (over, screen space): slot 1 = thumbnail "AI kehabisan data", slot 2 kosong untuk elemen YouTube, panah TANGGA naik ke slot 1.
// Separuh kanan layar kosong sejak 24 s (≈ 23 s terakhir) supaya elemen end-screen YouTube bebas tempat.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, LIME, LIME_INK, INK, BGRGB, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg,
  fall, markLine, slab, txt, gone, theme } from './kit.js';
import { saklar, ruler } from './agi.js';
import { subscribe } from './pustaka/penutup.js';
import { UIF } from './pustaka/ui.js';

export function makeFilm() {
  theme(true, { bg: '#ECE1CC', bgrgb: '236,225,204', vig: .22 });
  const { T: A } = timing(B);
  const IM = {};
  async function load() { IM.next = await loadImg('../assets/own/next-ai-data-habis.jpg', 1280); }

  const XB = 1700, Y0 = 300;                                      // XB: everything after the truck lives on this x
  const ghost = (word, dx = 0) => ({ dz: 900, dx, dy: -40, fn(ctx) {         // far parallax word (DOF-soft), barely there
    setFont(ctx, DSP(640), 10); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.05); ctx.fillText(word, 0, 220); ctx.textAlign = 'left'; } });

  // one report column: ink face + a darker side face (depth), mono label under the baseline · o.drop = it falls in instead of growing
  function kolom(ctx, t, x, h, t0, lab, o = {}) {
    const k = o.drop ? E.outCubic(inv(t0, t0 + .32, t)) : E.outQuint(inv(t0, t0 + .8, t)); if (k <= 0) return;
    const w = 168, d = 26, hh = o.drop ? h : h * k, dy = o.drop ? -(1 - k) * 260 : 0, sq = o.drop ? 1 + .08 * Math.exp(-(t - t0 - .32) * 14) * (t > t0 + .32) : 1;
    ctx.save(); ctx.globalAlpha *= o.drop ? clamp(k * 4) : 1; ctx.translate(x, Y0 + dy); ctx.scale(sq, 2 - sq);
    ctx.fillStyle = ivo(.5); ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2 + d, -d * .7); ctx.lineTo(w / 2 + d, -hh - d * .7); ctx.lineTo(w / 2, -hh); ctx.fill();
    ctx.fillStyle = ivo(.72); ctx.beginPath(); ctx.moveTo(-w / 2, -hh); ctx.lineTo(-w / 2 + d, -hh - d * .7); ctx.lineTo(w / 2 + d, -hh - d * .7); ctx.lineTo(w / 2, -hh); ctx.fill();
    ctx.fillStyle = INK; ctx.fillRect(-w / 2, -hh, w, hh); ctx.restore();
    txt(ctx, lab, x, Y0 + 50, t, t0 + .15, MN(19), { ls: 3, align: 'center', col: ivo(.7) });
  }
  const dasar = (ctx, t, t0) => { const k = E.outCubic(inv(t0, t0 + .6, t)); ctx.fillStyle = ivo(.6); ctx.fillRect(-900, Y0, 1800 * k, 3); };

  // the price tag hanging off the ruler's end: swings in, gets struck at "tidak"
  function label(ctx, t, x, y, t0, tStrike) {
    const k = E.outCubic(inv(t0, t0 + .4, t)); if (k <= 0) return; const s = t - t0, sw = Math.sin(s * 5.2) * Math.exp(-s * 1.6) * 16 + 2;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(x, y); ctx.rotate(sw * Math.PI / 180);
    ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 70); ctx.stroke();
    ctx.translate(0, 70); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-58, 30); ctx.lineTo(0, 0); ctx.lineTo(58, 30); ctx.lineTo(58, 150); ctx.lineTo(-58, 150); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ECE1CC'; ctx.beginPath(); ctx.arc(0, 22, 7, 0, 7); ctx.fill();
    setFont(ctx, DSP(44), 2); ctx.textAlign = 'center'; ctx.fillText('DIJUAL', 0, 104); ctx.textAlign = 'left';
    const ks = E.outCubic(inv(tStrike, tStrike + .22, t)); if (ks > 0) { ctx.strokeStyle = '#ECE1CC'; ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-48, 128); ctx.lineTo(-48 + 96 * ks, 128 - 56 * ks); ctx.stroke(); }
    ctx.restore();
  }

  // the "no click" meter: room-tone wave drawn up to a playhead; at the switch the trace stays dead flat
  function meteran(ctx, t, x0, x1, y) {
    const k = E.outCubic(inv(A.datang, A.datang + .4, t)); if (k <= 0) return; const ph = lerp(x0, x1, E.inOutCubic(inv(A.datang, A.pun + .9, t))), xk = lerp(x0, x1, inv(A.datang, A.pun + .9, A.klik));
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = ivo(.18); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath();
    for (let x = x0; x <= ph; x += 6) { const n = Math.sin(x * .13) * Math.sin(x * .041 + 1.3) * 7 + Math.sin(x * .37) * 2; x === x0 ? ctx.moveTo(x, y + n) : ctx.lineTo(x, y + n); }
    ctx.stroke();
    ctx.setLineDash([8, 8]); ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xk, y - 70); ctx.lineTo(xk, y + 40); ctx.stroke(); ctx.setLineDash([]);
    setFont(ctx, MN(18), 4); ctx.fillStyle = ivo(.6); ctx.textAlign = 'center'; ctx.fillText('KLIK', xk, y - 84); ctx.textAlign = 'left';
    ctx.fillStyle = INK; ctx.fillRect(ph - 1.5, y - 46, 3, 70); ctx.restore();
  }

  // the comment template, typed (own composer: avatar, placeholder, focus line, lime caret, blank slot whose dots pop on each "titik")
  const L1 = 'Buatku, AI setara manusia', L2 = 'kalau sudah bisa ';
  const cps1 = L1.length / (A.setara + .7 - A.buatku), cps2 = L2.trim().length / (A.bisa + .35 - A.kalau);
  const typed = (s, t, t0, cps) => s.slice(0, Math.max(0, Math.floor((t - t0) * cps)));
  function komposer(ctx, t, X, Y) {
    const kh = E.outQuint(inv(A.tulis + .2, A.tulis + .65, t)); if (kh <= 0) return; const a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * kh; ctx.fillStyle = ivo(.12); ctx.beginPath(); ctx.arc(X - 74, Y - 16, 40, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(X - 74, Y - 16, 40, 0, 7); ctx.clip(); ctx.fillStyle = ivo(.45); ctx.beginPath(); ctx.arc(X - 74, Y - 28, 14, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(X - 74, Y + 12, 25, 17, 0, 0, 7); ctx.fill(); ctx.restore();
    setFont(ctx, MN(17), 4); ctx.fillStyle = ivo(.55); ctx.fillText('TEMPLAT KOMENTAR', X, Y - 92);
    const s1 = typed(L1, t, A.buatku, cps1), s2 = typed(L2, t, A.kalau, cps2);
    setFont(ctx, UIF(54, 600), 0);
    if (!s1) { ctx.fillStyle = ivo(.4); ctx.globalAlpha = a0 * kh * (1 - E.outCubic(inv(A.buatku - .3, A.buatku, t))); ctx.fillText('Tambahkan komentar…', X, Y); ctx.globalAlpha = a0 * kh; }
    ctx.fillStyle = INK; ctx.fillText(s1, X, Y); ctx.fillText(s2, X, Y + 78);
    const kf = E.outCubic(inv(A.tulis + .6, A.tulis + 1, t)), LW = 800; ctx.fillStyle = ivo(.22); ctx.fillRect(X, Y + 120, LW, 2);
    if (kf > 0) { ctx.fillStyle = INK; ctx.fillRect(X + LW / 2 * (1 - kf), Y + 119, LW * kf, 3); }
    const bx = X + ctx.measureText(L2).width, kb = E.outCubic(inv(A.bisa + .15, A.bisa + .45, t));             // the blank slot
    if (kb > 0) { ctx.fillStyle = INK; ctx.fillRect(bx, Y + 92, 230 * kb, 4); }
    let dots = 0; [A.titik1, A.titik2, A.titik3].forEach((td, i) => { const s = t - td; if (s <= 0) return; dots = i + 1;
      const sc = E.outQuint(inv(td, td + .22, t)) * (1 + .35 * Math.exp(-s * 9) * Math.sin(s * 28)); ctx.beginPath(); ctx.arc(bx + 42 + 72 * i, Y + 70, 10 * sc, 0, 7); ctx.fill(); });
    const typing = (t > A.buatku && s1.length < L1.length) || (t > A.kalau && s2.length < L2.length);
    if (kf > 0 && (typing || Math.floor(t * 2.4) % 2 === 0)) { const cx = dots ? bx + 42 + 72 * (dots - 1) + 26 : X + 4 + ctx.measureText(s2 || s1).width, cy = s2 || dots ? Y + 78 : Y;
      ctx.fillStyle = LIME; ctx.fillRect(cx, cy - 44, 5, 56); ctx.fillStyle = INK; ctx.fillRect(cx + 5, cy - 44, 1.5, 56); }
    const on = t > A.titik3 + .2; setFont(ctx, MN(18), 4); ctx.fillStyle = on ? INK : ivo(.35); ctx.textAlign = 'right'; ctx.fillText('KOMENTARI', X + LW, Y + 170); ctx.textAlign = 'left';
    ctx.globalAlpha = a0;
  }

  const ST = [
    { at: 0, x: 0, z: 0, dist: [1640, 1480], yaw: [-6, -2], tag: 'RAPOR', layers: [ghost('RAPOR', -200)], draw(ctx, t) {   // P1 · the tall columns
      txt(ctx, 'Ringkasnya begini:', -820, -390, t, .9, SRF(64), { col: INK });
      dasar(ctx, t, .7);
      kolom(ctx, t, -560, 560, 1.0, 'SOAL UJIAN'); kolom(ctx, t, -300, 500, 1.35, 'TES KODING'); kolom(ctx, t, -40, 610, 1.7, 'KUIS SAINS');
      fall(ctx, 'LUAR BIASA', 210, -150, t, 2.3, DSP(170), { ls: 3 });
      txt(ctx, 'DI ATAS KERTAS UJIAN', 216, -60, t, A.kertas, MN(28), { ls: 6, col: INK });
      txt(ctx, 'ILUSTRASI · BUKAN DATA', 216, -10, t, A.kertas + .4, MN(16), { ls: 4, col: ivo(.5) });
    } },
    { at: A.tapi, via: 'truck', x: XB, z: 0, dist: [1520, 1420], yaw: [-2, 3], tag: 'BERGERIGI', draw(ctx, t) {           // P2 · the short columns
      dasar(ctx, t, 0);
      txt(ctx, 'tapi masih…', -820, -390, t, A.tapi, SRF(64), { col: ivo(.8) });
      [[-560, 150, A.pelupa, 'MENGINGAT', 'PELUPA', -210], [-300, 190, A.menebak, 'TAHU BATAS', 'SUKA MENEBAK', -60], [-40, 120, A.boros, 'HEMAT BELAJAR', 'BOROS BELAJAR', 90]]
        .forEach(([x, h, t0, lab, w, wy]) => {
          kolom(ctx, t, x, h, t0 - .12, lab, { drop: true });
          const kl = E.outCubic(inv(t0, t0 + .3, t)); if (kl > 0) { const x0 = x, y0 = Y0 - h - 30, x1 = 230, y1 = wy - 34;
            ctx.strokeStyle = ivo(.45); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(lerp(x0, x1, kl), y1); ctx.stroke(); }
          fall(ctx, w, 250, wy, t, t0, DSP(116), { ls: 3 });
        });
    } },
    { at: A.pendapat - .25, via: 'push', x: XB, z: 2600, dist: [1560, 1380], yaw: [4, -3], tag: 'OPINI', layers: [ghost('OPINI')], draw(ctx, t) {   // P3 · opinion + ruler
      slab(ctx, 'OPINI NARATOR', -850, -430, t, A.pendapat + .35, { size: 22 });
      txt(ctx, 'Pendapatku pribadi?', -820, -250, t, A.pendapat, SRF(108), { col: INK });
      const kr = E.outQuint(inv(A.percaya - .1, A.percaya + .5, t));
      if (kr > 0) { ctx.save(); ctx.translate(-240 * (1 - kr), 0); ruler(ctx, -620, -80, 12.4, { max: 100, upto: Math.round(100 * E.outCubic(inv(A.percaya, A.penggaris + .7, t))),
        label: 'PENGGARIS · BUATAN PIHAK LAIN', alpha: clamp(kr * 2) }); ctx.restore(); }
      label(ctx, t, 694, -80, A.penggaris + .45, A.tidak);
      markLine(ctx, 'dibuat pihak yang ', 'TIDAK', ' sedang berjualan', -40, 250, t, A.penggaris + .6, A.tidak, SRF(70));
    } },
    { at: A.curiga - .25, via: 'rise', x: XB, z: 5200, dist: [1560, 1300], yaw: [-5, 2], tag: 'TANPA BUNYI', layers: [ghost('KLIK?', 300)], draw(ctx, t) {   // P4 · the silent switch
      saklar(ctx, t, -520, 30, A.klik, { label: 'AGI', bulb: false, scale: .82 });
      txt(ctx, 'dan aku curiga,', -180, -300, t, A.curiga, SRF(62), { col: ivo(.8) });
      txt(ctx, 'kalau AGI benar-benar datang,', -180, -215, t, A.agi, SRF(62), { col: INK });
      fall(ctx, 'TIDAK ADA BUNYI KLIK', -184, -50, t, A.bunyi - .15, DSP(124), { ls: 3 });
      meteran(ctx, t, -180, 760, 150);
      slab(ctx, 'TANPA BUNYI', -180, 260, t, A.klik + .2, { size: 24, lime: true });
    } },
    { at: A.nah - .2, via: 'whip', x: XB, z: 7800, dist: [1500, 1400], yaw: [3, -1], tag: 'GILIRAN', draw(ctx, t) {      // P5 · your turn
      txt(ctx, 'Nah,', -680, -150, t, A.nah, SRF(72), { col: ivo(.8) });
      markLine(ctx, 'sekarang giliran ', 'KAMU', '', 0, 60, t, A.nah + .3, A.kamu, DSP(170), { ls: 3 });
    } },
    { at: A.tulis - .2, via: 'push', x: XB, z: 10400, dist: [1500, 1420], yaw: [-3, 0], tag: 'KOMENTAR', layers: [ghost('ISI', -520)], draw(ctx, t) {   // P6 · the template, left half only
      fall(ctx, 'TULIS DI KOMENTAR', -860, -300, t, A.tulis, DSP(108), { ls: 3 });
      komposer(ctx, t, -770, -110);
      txt(ctx, 'aku penasaran isianmu.', -772, 150, t, A.aku, SRF(54), { col: ivo(.85) });
    } },
  ];

  // ── end screen (screen space) ─────────────────────────────────────────────────────────────────────────────
  const rr = (o, x, y, w, h, r) => { o.beginPath(); o.roundRect(x, y, w, h, r); };
  function slotYT(o, t, cx, cy, t0, lab, isi) {
    const q = E.outQuint(inv(t0, t0 + .8, t)); if (q <= 0) return; const lift = 5 * Math.sin((t - t0) * 1.2);
    o.save(); o.translate(cx, cy + 30 * (1 - q) + lift); o.scale(lerp(.94, 1, q), lerp(.94, 1, q)); o.globalAlpha = q;
    o.fillStyle = ivo(.07); rr(o, -320, -180, 640, 360, 18); o.fill();
    if (isi) { o.save(); o.shadowColor = 'rgba(40,25,10,.35)'; o.shadowBlur = 50; o.shadowOffsetY = 22; rr(o, -320, -180, 640, 360, 18); o.fillStyle = '#111'; o.fill(); o.restore();
      o.save(); rr(o, -320, -180, 640, 360, 18); o.clip(); isi(o); o.restore(); }
    o.setLineDash([14, 10]); o.lineDashOffset = -12 * (t - t0); o.strokeStyle = ivo(.45); o.lineWidth = 2; rr(o, -320, -180, 640, 360, 18); o.stroke(); o.setLineDash([]);
    o.fillStyle = LIME; o.fillRect(-320, -214, 12, 12); o.strokeStyle = INK; o.lineWidth = 1.5; o.strokeRect(-320, -214, 12, 12);
    setFont(o, MN(18), 4); o.fillStyle = INK; o.textAlign = 'left'; o.fillText(lab, -298, -203); o.restore();
  }
  function panahTangga(o, t, t0, pts) {                             // the film's stair motif as the pointer: a stepped line climbs to slot 1
    const k = E.inOutCubic(inv(t0, t0 + .7, t)); if (k <= 0) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); L += l; }
    let rem = L * k, end = pts[0]; o.strokeStyle = INK; o.lineWidth = 5; o.lineJoin = 'round'; o.lineCap = 'round'; o.beginPath(); o.moveTo(...pts[0]);
    for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / seg[i - 1]); end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; o.lineTo(...end); rem -= seg[i - 1]; }
    o.stroke(); if (k >= 1) { const [ex, ey] = pts[pts.length - 1]; o.fillStyle = INK; o.beginPath(); o.moveTo(ex + 14, ey); o.lineTo(ex - 8, ey - 13); o.lineTo(ex - 8, ey + 13); o.closePath(); o.fill(); }
    else { o.fillStyle = LIME; o.beginPath(); o.arc(end[0], end[1], 9, 0, 7); o.fill(); o.strokeStyle = INK; o.lineWidth = 2; o.stroke(); }
  }
  function layar(o, t) {
    const t0 = A.oh, kw = E.outQuint(inv(t0, t0 + .6, t));
    o.fillStyle = `rgb(${BGRGB})`; o.fillRect(0, 0, W * kw, H);                               // the warm page wipes over the world
    const g = o.createRadialGradient(1440, 500, 60, 1440, 500, 900); g.addColorStop(0, 'rgba(236,170,100,.22)'); g.addColorStop(1, 'rgba(236,170,100,0)');
    o.globalAlpha = kw; o.fillStyle = g; o.fillRect(0, 0, W, H); o.globalAlpha = 1;
    slotYT(o, t, 1440, 330, t0 + .3, 'VIDEO BERIKUTNYA', IM.next ? (c => c.drawImage(IM.next, -320, -180, 640, 360)) : null);
    slotYT(o, t, 1440, 760, t0 + .55, 'PILIHAN UNTUKMU', null);
    o.fillStyle = LIME; o.fillRect(140, 196, 12, 12); o.strokeStyle = INK; o.lineWidth = 1.5; o.strokeRect(140, 196, 12, 12);
    txt(o, 'OH IYA · SATU LAGI', 166, 208, t, t0 + .2, MN(20), { ls: 5, col: INK });
    const gq = gone(t, A.internet - .35, .3);
    if (gq > 0) { o.save(); o.globalAlpha = gq; txt(o, 'kenapa AI butuh bahan bacaan', 140, 340, t, A.kenapa, SRF(62), { col: INK });
      txt(o, 'sebanyak itu?', 140, 420, t, A.kenapa + .7, SRF(62), { col: INK }); o.restore(); }
    markLine(o, 'KALAU DATA MANUSIA ', 'HABIS', ',', 140, 380, t, A.internet - .15, A.habis, DSP(88), { align: 'left', ls: 2 });
    fall(o, 'AI BELAJAR DARI MANA LAGI?', 140, 482, t, A.internet + .3, DSP(88), { ls: 2 });
    txt(o, 'tonton di layar ini, ya.', 144, 572, t, A.tonton, SRF(48), { col: INK });
    panahTangga(o, t, A.tonton + .1, [[640, 562], [960, 562], [960, 530], [1010, 530], [1010, 498], [1060, 498], [1060, 466], [1092, 466]]);
    [A.tonton + .7, A.layar].forEach(tp => { const u = inv(tp, tp + .7, t); if (u <= 0 || u >= 1) return; const e = E.outCubic(u);
      o.save(); o.globalAlpha = (1 - u) * .9; o.strokeStyle = LIME; o.lineWidth = 6; rr(o, 1120 - 26 * e, 150 - 26 * e, 640 + 52 * e, 360 + 52 * e, 18 + 26 * e); o.stroke();
      o.strokeStyle = INK; o.lineWidth = 1.5; o.stroke(); o.restore(); });
  }
  const SX = 370, SY = 820;
  const over = (o, t) => {
    if (t < A.aku - .35) return;
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.filter = 'none'; o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
    if (t > A.oh) layar(o, t);
    subscribe(o, SX, SY, t, A.aku - .3, { klik: A.aku + .6, lonceng: A.aku + 1.5, h: 92, inisial: 'R' });
    o.restore();
  };
  return makeChapter({ B, ST, load, over, gate: true, label: 'PENUTUP · GILIRANMU' });
}
