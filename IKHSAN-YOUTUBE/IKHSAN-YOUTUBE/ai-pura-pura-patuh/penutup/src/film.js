// Penutup · Palu Manusia, Komentar & Layar Akhir — v2 (100% Ruang Gelap RNC #0B0C09 — ZERO klon Batam terang!)
// Kiblat: ai-data-habis/penutup & teknologi-indo-vs-as.
// S0: Ahpo A05 Palu Hakim + Ahpo A03 Sakelar Pemutus terikat erat di bawah batang lime "DIPEGANG MANUSIA"
// S1: Opini Kita + Teknik Signature "Selam Lubang Huruf" (counterOf('A') pada MANUSIA -> menyelam ke kotak komentar!)
// S2: Giliran Kamu (UI Komentar YouTube gelap interaktif + blanko sektor berputar + kursor)
// S3 + End Screen (39.47 s .. 62.10 s = 22.63 s >= 20 s): Subscribe + lonceng kiri, 2 slot End Screen kanan bersih (thumbnail Video 4 AGI)!
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN, mk,
  timing, makeChapter, loadImg, fall, markLine, slab, txt,
} from './kit.js';
import { kq, pop } from './draw.js';
import { drawAhpoLayered, C_RED } from './fisika.js';

const SANS = (s, w = 600) => `${w} ${s}px sans-serif`;
const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
const tick = (c, x, y, s, k) => {
  c.beginPath();
  c.moveTo(x - s * .5, y);
  c.lineTo(x - s * .5 + s * .35 * Math.min(1, k * 2), y + s * .35 * Math.min(1, k * 2));
  if (k > .5) c.lineTo(x - s * .15 + s * .65 * (k - .5) * 2, y + s * .35 - s * .75 * (k - .5) * 2);
  c.stroke();
};

// "Selam Lubang Huruf" (from ai-data-habis/penutup): finds exact inner counter hole of glyph 'A'
function counterOf(ch, FS = 900) {
  const N = 1000, OX = 60, OY = 950, [c, g] = mk(N, N);
  setFont(g, DSP(FS)); g.fillStyle = '#fff'; g.textBaseline = 'alphabetic'; g.fillText(ch, OX, OY);
  const d = g.getImageData(0, 0, N, N).data, NN = N * N, ink = new Uint8Array(NN), ext = new Uint8Array(NN), q = new Int32Array(NN);
  for (let i = 0; i < NN; i++) ink[i] = d[i * 4 + 3] > 110 ? 1 : 0;
  let qh = 0, qt = 0;
  const push = i => { if (!ink[i] && !ext[i]) { ext[i] = 1; q[qt++] = i; } };
  for (let x = 0; x < N; x++) { push(x); push(NN - N + x); }
  for (let y = 0; y < N; y++) { push(y * N); push(y * N + N - 1); }
  while (qh < qt) {
    const i = q[qh++], x = i % N;
    if (x > 0) push(i - 1); if (x < N - 1) push(i + 1);
    if (i >= N) push(i - N); if (i < NN - N) push(i + N);
  }
  const D = new Float32Array(NN); let any = 0;
  for (let i = 0; i < NN; i++) { const cn = !ink[i] && !ext[i]; D[i] = cn ? 1e9 : 0; any += cn; }
  if (!any) return null;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const i = y * N + x; if (!D[i]) continue; let v = D[i];
    if (x > 0) v = Math.min(v, D[i - 1] + 1);
    if (y > 0) { v = Math.min(v, D[i - N] + 1); if (x > 0) v = Math.min(v, D[i - N - 1] + 1.414); if (x < N - 1) v = Math.min(v, D[i - N + 1] + 1.414); }
    D[i] = v;
  }
  for (let y = N - 1; y >= 0; y--) for (let x = N - 1; x >= 0; x--) {
    const i = y * N + x; if (!D[i]) continue; let v = D[i];
    if (x < N - 1) v = Math.min(v, D[i + 1] + 1);
    if (y < N - 1) { v = Math.min(v, D[i + N] + 1); if (x < N - 1) v = Math.min(v, D[i + N + 1] + 1.414); if (x > 0) v = Math.min(v, D[i + N - 1] + 1.414); }
    D[i] = v;
  }
  let r = 0, bi = 0; for (let i = 0; i < NN; i++) if (D[i] > r) { r = D[i]; bi = i; }
  const out = g.createImageData(N, N), R = 3;
  for (let i = 0; i < NN; i++) if (D[i] > 0) {
    const x = i % N, y = (i / N) | 0;
    for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
      const j = (y + dy) * N + x + dx; if (j >= 0 && j < NN) out.data[j * 4 + 3] = 255;
    }
  }
  const [m, mg] = mk(N, N); mg.putImageData(out, 0, 0);
  return { m, FS, OX, OY, cx: bi % N, cy: (bi / N) | 0, r };
}

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  // End Screen starts cleanly on "tonton" (39.47 s) -> lasts 22.63 s (>= 20 s YouTube requirement!)
  const E0 = A.tonton - 0.1;
  // Dive through the counter hole of letter 'A' in MANUSIA into the viewer comment UI!
  const D0 = A.giliran - 0.65, D1 = A.giliran + 0.05;
  const IM = {}, A05 = {}, A03 = {};
  let CM = null;
  const [OC, og] = mk(W, H);

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadImg(sh + 'own/next-agi-setara-manusia.jpg', 1280).then(x => IM.next = x),
      loadImg(sh + 'ahpo/A05/A05_04_MG_landasan-palu.png', 1600).then(x => A05.landasan = x),
      loadImg(sh + 'ahpo/A05/A05_05_FG_palu-hakim.png', 1600).then(x => A05.palu = x),
      loadImg(sh + 'ahpo/A03/A03_06_MG_kotak-sakelar.png', 1600).then(x => A03.kotak = x),
      loadImg(sh + 'ahpo/A03/A03_07_FG_tuas-sakelar.png', 1600).then(x => A03.tuas = x),
    ]);
    CM = counterOf('A');
  }

  function drawCursor(o, x, y, cs, a) {
    o.save(); o.globalAlpha = a; o.translate(x, y); o.scale(cs, cs);
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 12; o.shadowOffsetY = 5;
    o.beginPath(); o.moveTo(0, 0); o.lineTo(0, 34); o.lineTo(8, 26); o.lineTo(14, 39);
    o.lineTo(20, 36); o.lineTo(14, 23); o.lineTo(25, 23); o.closePath();
    o.fillStyle = '#fff'; o.fill(); o.shadowColor = 'transparent';
    o.strokeStyle = '#11120E'; o.lineWidth = 2; o.lineJoin = 'round'; o.stroke();
    o.restore();
  }

  // ── S0 · Kesimpulannya Jelas: Palu & Sakelar Terkunci di Tangan Manusia ──────────────────────────────────
  function drawKesimpulan(ctx, t, c) {
    txt(ctx, 'KESIMPULAN INVESTIGASI', -810, -355, t, A.kesimpulan, MN(20), { ls: 5, col: LIME });
    txt(ctx, 'program komputer hanyalah mesin hitung pencari skor.', -810, -260, t, A.kesimpulan + 0.4, SRF(48), { col: ivo(0.84) });

    // Top lime anchor bar sliding across on A.dipegang!
    const kb = E.outQuint(inv(A.dipegang - 0.35, A.dipegang + 0.25, t));
    if (kb > 0) {
      ctx.fillStyle = LIME; ctx.fillRect(-810, -175, 1620 * kb, 92);
      ctx.save(); ctx.beginPath(); ctx.rect(-810, -175, 1620 * kb, 92); ctx.clip();
      fall(ctx, 'WAJIB SELALU DIPEGANG MANUSIA', -780, -104, t, A.dipegang - 0.25, DSP(78), { ls: 3, col: LIME_INK, drop: -30, stag: 0.015 });
      ctx.restore();
    }

    // Left physical prop: Ahpo A05 Gavel & Sound Block (cleanly below lime bar)
    const kP = E.outQuint(inv(A.palu - 0.2, A.palu + 0.45, t));
    if (kP > 0) {
      drawAhpoLayered(ctx, [
        { im: A05.landasan, par: 0.88, a: 1 },
        { im: A05.palu, par: 0.98, a: 1, rot: -26 * D2R, px: 1520, py: 1690 },
      ], 140, -135, 0.54, c.yaw * 8, 0, kP);
      slab(ctx, 'PALU KEPUTUSAN', -430, 325, t, A.palu, { align: 'center', size: 22 });
    }
    // Right physical prop: Ahpo A03 Industrial Breaker Switch (cleanly below lime bar!)
    const kS = E.outQuint(inv(A.sakelar - 0.2, A.sakelar + 0.45, t));
    if (kS > 0) {
      drawAhpoLayered(ctx, [
        { im: A03.kotak, par: 0.88, a: 1 },
        { im: A03.tuas, par: 1.0, a: 1, rot: lerp(0, 72, E.outQuint(inv(A.sakelar, A.sakelar + 0.6, t))) * D2R, px: 2980, py: 1070 },
      ], 70, 130, 0.36, c.yaw * 8, 0, kS);
      slab(ctx, 'SAKELAR PEMUTUS ARUS', 430, 325, t, A.sakelar, { align: 'center', lime: true, size: 22 });
    }
  }

  // ── S1 · Opini Kita + Signature "Selam Lubang Huruf" Dive through 'A' of MANUSIA ─────────────────────────
  const MS = 270; // MANUSIA size (League Gothic)
  function drawOpini(ctx, t) {
    const a0 = ctx.globalAlpha, Y1 = 115;
    const u = inv(D0, D1, t), kd = E.inCubic(u), m = E.outCubic(clamp(u * 1.7));
    setFont(ctx, DSP(MS), 5);
    const word = 'MANUSIA', fullW = ctx.measureText(word).width, x0 = -fullW / 2;
    const dxA = ctx.measureText('M').width; // letter 'A' at index 1 in MANUSIA!
    const ax = x0 + dxA, ay = Y1;
    const S = MS / (CM ? CM.FS : 1);
    const P = CM ? { x: ax + (CM.cx - CM.OX) * S, y: ay + (CM.cy - CM.OY) * S } : { x: ax + 44, y: ay - MS * 0.3 };
    const Z = CM ? 1300 / (CM.r * S) : 60, z = Math.pow(Z, kd);
    const Tz = c => { c.translate(P.x * (1 - m), P.y * (1 - m)); c.scale(z, z); c.translate(-P.x, -P.y); };

    ctx.save(); Tz(ctx);
    if (z < 3.2) {
      txt(ctx, 'MENURUT KITA', 0, -345, t, A.opini, MN(22), { align: 'center', ls: 6, col: LIME });
      txt(ctx, 'AI buat membantu kerja harian itu sangat bagus —', 0, -245, t, A.opini + 0.6, SRF(54), { align: 'center', col: ivo(0.9) });
      slab(ctx, 'ASALKAN PEMERIKSA TERAKHIR TETAP:', 0, -152, t, A.pemeriksa - 0.3, { align: 'center', size: 21 });
    }
    const kM = E.outQuint(inv(A.pemeriksa - 0.1, A.pemeriksa + 0.35, t));
    if (kM > 0) {
      ctx.globalAlpha = a0;
      ctx.fillStyle = LIME;
      ctx.fillRect(x0 - 28, Y1 - MS * 0.80, (fullW + 56) * kM, MS * 0.94);
      setFont(ctx, DSP(MS), 5); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left';
      if (kM > 0.25) ctx.fillText(word, x0, Y1);
    }
    ctx.restore();

    if (u <= 0 || !CM) return;
    // Inside the counter hole of 'A': viewer's dark YouTube comment UI already waiting!
    og.setTransform(1, 0, 0, 1, 0, 0); og.globalCompositeOperation = 'source-over'; og.globalAlpha = 1; og.filter = 'none';
    og.fillStyle = '#0B0C09'; og.fillRect(0, 0, W, H);
    og.save(); og.translate(W / 2, H / 2); const sc = lerp(0.42, 1, E.inCubic(u)); og.scale(sc, sc);
    drawKomen(og, t, true);
    og.restore();
    og.globalCompositeOperation = 'destination-in'; og.setTransform(1, 0, 0, 1, W / 2, H / 2); Tz(og);
    og.translate(ax, ay); og.scale(S, S); og.translate(-CM.OX, -CM.OY);
    og.drawImage(CM.m, 0, 0); og.setTransform(1, 0, 0, 1, 0, 0); og.globalCompositeOperation = 'source-over';
    ctx.save(); ctx.globalAlpha = a0 * clamp(u * 6); ctx.drawImage(OC, -W / 2, -H / 2); ctx.restore();
    ctx.save(); Tz(ctx); setFont(ctx, DSP(MS), 5); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left'; ctx.fillText('A', ax, ay); ctx.restore();
  }

  // ── S2 · Giliran Kamu: Dark Interactive YouTube Comment UI ───────────────────────────────────────────────
  const SEKTOR = ['Kredit Bank', 'Diagnosis RS', 'Klaim BPJS', 'Putusan Hukum', 'Nilai Sekolah', 'Seleksi Kerja'];
  function drawKomen(ctx, t, flat) {
    const a0 = ctx.globalAlpha, X = -560, R1 = -20, R2 = 66;
    if (!flat) fall(ctx, 'GILIRAN KAMU BERPENDAPAT.', 0, -290, t, A.giliran - 0.05, DSP(136), { align: 'center', ls: 3 });
    setFont(ctx, SANS(34, 700)); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('Komentar', -680, -145);
    setFont(ctx, MN(18, 400), 3); ctx.fillStyle = ivo(0.55); ctx.fillText('DISKUSI PENONTON', -470, -148);
    // Avatar circle
    ctx.fillStyle = ivo(0.16); ctx.beginPath(); ctx.arc(-640, R1 - 10, 42, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = ivo(0.55); ctx.beginPath(); ctx.arc(-640, R1 - 22, 14, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-640, R1 + 14, 25, 15, 0, Math.PI, 0); ctx.fill();

    // Expanding YouTube focus underline
    const tf = A.keputusan - 0.2, kf = E.outCubic(inv(tf, tf + 0.35, t));
    ctx.fillStyle = ivo(0.28); ctx.fillRect(X, R2 + 48, 1240, 2);
    if (kf > 0) { ctx.fillStyle = LIME; ctx.fillRect(X + 620 - 620 * kf, R2 + 47, 1240 * kf, 3); }

    setFont(ctx, SANS(40, 500)); ctx.textAlign = 'left';
    if (t < tf + 0.1) { ctx.fillStyle = ivo(0.42); ctx.fillText('Tambahkan komentar...', X, R1); }
    const L1 = 'Wajib dipegang manusia: ', L2 = 'Alasan di bank / rumah sakit: ';
    const c1 = Math.min(L1.length, Math.ceil(Math.max(0, t - A.keputusan) * 28));
    const c2 = Math.min(L2.length, Math.ceil(Math.max(0, t - A.tulis) * 32));
    ctx.fillStyle = IVORY;
    if (c1) ctx.fillText(L1.slice(0, c1), X, R1);
    if (c2) ctx.fillText(L2.slice(0, c2), X, R2);

    // Rolling sector slot right beside L1
    const w1 = ctx.measureText(L1).width;
    const kB = kq(t, A.wajib - 0.15, 0.35);
    if (kB > 0 && c1 === L1.length) {
      const bx = X + w1, BW = 360;
      ctx.fillStyle = LIME; ctx.fillRect(bx, R1 + 12, BW * kB, 4);
      const v = Math.max(0, t - A.wajib) * 2.6, n = Math.floor(v), f = E.snap(clamp((v - n) * 2.4));
      ctx.save(); ctx.beginPath(); ctx.rect(bx, R1 - 46, BW, 60); ctx.clip();
      setFont(ctx, SANS(40, 700)); ctx.fillStyle = LIME;
      ctx.fillText(SEKTOR[n % SEKTOR.length], bx + 12, R1 - 52 * f);
      ctx.fillText(SEKTOR[(n + 1) % SEKTOR.length], bx + 12, R1 + 52 * (1 - f));
      ctx.restore();
    }

    // Batal / Komentar buttons
    const en = t > A.tulis + 0.25;
    setFont(ctx, SANS(28, 600)); ctx.textAlign = 'center';
    ctx.fillStyle = ivo(kf > 0 ? 0.78 : 0); ctx.fillText('Batal', 380, R2 + 130);
    ctx.fillStyle = en ? LIME : ivo(0.12); rr(ctx, 460, R2 + 90, 220, 62, 31); ctx.fill();
    ctx.fillStyle = en ? LIME_INK : ivo(0.4); ctx.fillText('Komentar', 570, R2 + 130);
    ctx.textAlign = 'left';

    if (!flat && t >= A.bagikan - 0.15) {
      slab(ctx, 'BAGIKAN KE GRUP KELUARGA', -560, R2 + 122, t, A.bagikan - 0.15, { size: 20 });
    }
    ctx.globalAlpha = a0;
  }

  // ── End Screen (Screen Space, 39.47 s .. 62.10 s = 22.63 s >= 20 s): Left Subscribe + Right 2 Clean Slots ──
  function subscribe(o, t) {
    const m = E0, c1 = m + 2.4, c2 = m + 3.6, BX = 146, BY = 730, BW = 430, BH = 108;
    const kb = E.outQuint(inv(m + 0.45, m + 1.05, t)); if (kb <= 0) return;
    const on = t > c1 + 0.06, press = 1 - 0.06 * Math.sin(Math.PI * clamp((t - c1 + 0.04) / 0.16));
    const hov = 0.025 * clamp((t - m - 2.0) / 0.2) * (on ? 0 : 1);
    o.save(); o.globalAlpha = kb; o.translate(BX + BW / 2, BY + BH / 2);
    const s = lerp(0.82, 1, kb) * (press + hov); o.scale(s, s);
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 40; o.shadowOffsetY = 16;
    o.fillStyle = on ? LIME : IVORY; rr(o, -BW / 2, -BH / 2, BW, BH, BH / 2); o.fill();
    o.shadowColor = 'transparent';
    o.fillStyle = on ? LIME_INK : '#11120E'; o.beginPath(); o.arc(-BW / 2 + 56, 0, 30, 0, Math.PI * 2); o.fill();
    setFont(o, DSP(40), 0); o.fillStyle = on ? LIME : IVORY; o.textAlign = 'center'; o.textBaseline = 'middle';
    o.fillText('R', -BW / 2 + 56, 2);
    setFont(o, DSP(62), 3); o.fillStyle = on ? LIME_INK : '#11120E'; o.textAlign = 'left';
    o.fillText(on ? 'SUBSCRIBED' : 'SUBSCRIBE', -BW / 2 + 106, 4); o.textBaseline = 'alphabetic';
    if (on) { o.strokeStyle = LIME_INK; o.lineWidth = 7; o.lineCap = 'round'; tick(o, BW / 2 - 52, -2, 30, E.outCubic(inv(c1 + 0.06, c1 + 0.3, t))); }
    o.restore();

    const kr = inv(c1, c1 + 0.55, t);
    if (kr > 0 && kr < 1) {
      const e = E.outCubic(kr); o.save(); o.globalAlpha = (1 - kr) * 0.8; o.strokeStyle = LIME; o.lineWidth = 4;
      rr(o, BX - 30 * e, BY - 30 * e, BW + 60 * e, BH + 60 * e, BH / 2 + 30 * kr); o.stroke(); o.restore();
    }
    const BLX = BX + BW + 84, kl = E.outQuint(inv(c1 + 0.25, c1 + 0.7, t));
    if (kl > 0) {
      const on2 = t > c2 + 0.05, sw = t > c2 ? Math.sin((t - c2) * 26) * Math.exp(-(t - c2) * 3.2) * 20 * D2R : 0;
      o.save(); o.globalAlpha = kl; o.translate(BLX, BY + BH / 2);
      const p2 = 1 - 0.07 * Math.sin(Math.PI * clamp((t - c2 + 0.04) / 0.16));
      o.scale(lerp(0.6, 1, kl) * p2, lerp(0.6, 1, kl) * p2);
      o.fillStyle = on2 ? IVORY : 'rgba(11,12,9,.6)'; o.strokeStyle = ivo(0.7); o.lineWidth = 3;
      o.beginPath(); o.arc(0, 0, 54, 0, Math.PI * 2); o.fill(); o.stroke();
      o.rotate(sw); o.translate(0, -2); o.fillStyle = on2 ? '#11120E' : IVORY;
      o.beginPath(); o.moveTo(-22, 14); o.lineTo(-16, 7); o.lineTo(-16, -5);
      o.bezierCurveTo(-16, -25, 16, -25, 16, -5); o.lineTo(16, 7); o.lineTo(22, 14); o.closePath(); o.fill();
      o.beginPath(); o.arc(0, 19, 5, 0, Math.PI * 2); o.fill(); o.fillRect(-2.5, -27, 5, 6);
      o.restore();
    }
    const kp = E.inOutCubic(inv(m + 1.2, m + 2.0, t)), kq3 = E.inOutCubic(inv(c1 + 0.5, c1 + 1.05, t)), kx = E.inOutCubic(inv(c2 + 0.6, c2 + 1.3, t));
    if (kp > 0) {
      let x = lerp(980, BX + BW * 0.62, kp), y = lerp(1030, BY + BH * 0.62, kp);
      x = lerp(x, BLX + 10, kq3); y = lerp(y, BY + BH / 2 + 14, kq3); x += 60 * kx; y += 40 * kx;
      const cs = 1.5 * (1 - 0.12 * Math.sin(Math.PI * clamp((t - c1 + 0.04) / 0.16)) - 0.12 * Math.sin(Math.PI * clamp((t - c2 + 0.04) / 0.16)));
      drawCursor(o, x, y, cs, clamp(kp * 3) * (1 - kx));
    }
  }

  function endScreen(o, t) {
    const k = E.outCubic(inv(E0, E0 + 0.85, t)); if (k <= 0) return;
    o.setTransform(1, 0, 0, 1, 0, 0); o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    // Solid clean dark #0B0C09 studio backdrop so zero background ghosting leaks into End Screen!
    o.fillStyle = `rgba(11,12,9,${0.99 * k})`; o.fillRect(0, 0, W, H);

    // Right half: 2 exact 16:9 YouTube End Screen slots (640x360)
    [[140, E0 + 0.25, 'TONTON SELANJUTNYA · APAKAH AI SETARA MANUSIA?'], [565, E0 + 0.55, 'PILIHAN UNTUKMU']].forEach(([y, t0, lab], i) => {
      const q = E.outQuint(inv(t0, t0 + 0.75, t)); if (q <= 0) return;
      o.save(); o.globalAlpha = q; o.translate(1130 + 320, y + 180);
      const s = lerp(0.94, 1, q); o.scale(s, s);
      o.fillStyle = '#141611'; rr(o, -320, -180, 640, 360, 18); o.fill();
      if (i === 0 && IM.next) {
        o.save(); rr(o, -320, -180, 640, 360, 18); o.clip();
        o.drawImage(IM.next, -320, -180, 640, 360);
        o.restore();
      }
      rr(o, -320, -180, 640, 360, 18);
      o.setLineDash([14, 10]); o.lineDashOffset = -t * 10;
      o.strokeStyle = i === 0 ? LIME : ivo(0.32); o.lineWidth = 2.5; o.stroke(); o.setLineDash([]);
      o.fillStyle = LIME; o.fillRect(-320, -214, 11, 11);
      setFont(o, MN(16, 700), 3); o.fillStyle = ivo(0.85); o.textAlign = 'left';
      o.fillText(lab, -300, -203);
      o.restore();
    });

    // Left half: Brand message + animated Subscribe button (strictly inside x < 980 safe zone!)
    subscribe(o, t);
    o.globalAlpha = k;
    const kb = kq(t, E0 + 0.1, 0.6);
    o.fillStyle = LIME; o.fillRect(146, 255, 120 * kb, 6);
    setFont(o, MN(18, 700), 5); o.fillStyle = ivo(0.65); o.textAlign = 'left';
    o.fillText('RELENTLESS NON-CONFORMIST', 146, 228);
    markLine(o, 'PALU TETAP DI ', 'MANUSIA', '.', 146, 420, t, E0 + 0.15, E0 + 0.55, DSP(130), { align: 'left', ls: 3 });
    txt(o, 'keputusan apa yang wajib dipegang manusia?', 148, 515, t, E0 + 0.55, SRF(38), { col: ivo(0.9) });
    txt(o, 'tulis pendapatmu di kolom komentar.', 148, 568, t, E0 + 0.85, SRF(34), { col: LIME });
  }

  const ST = [
    { at: 0, name: 'Kesimpulan', x: 0, z: 0, py: -560, yaw: [3, -2], dist: [1520, 1410], draw: drawKesimpulan },
    { at: A.opini - 0.15, via: 'push', name: 'Opini & Selam A', tag: 'MANUSIA', x: 0, z: 2500, py: -560, yaw: [-3, 2], dist: [1500, 1390], draw: drawOpini },
    { at: D1, via: 'cut', lead: 0, pre: 0, name: 'Giliran Kamu', x: 0, z: 5000, py: -560, yaw: [2, -2], dist: [1500, 1390], draw: (ctx, t) => drawKomen(ctx, t, false) },
  ];

  const over = (o, t) => { if (t >= E0) { o.save(); endScreen(o, t); o.restore(); } };
  return makeChapter({ B, ST, load, label: 'PENUTUP', over, gate: true });
}
