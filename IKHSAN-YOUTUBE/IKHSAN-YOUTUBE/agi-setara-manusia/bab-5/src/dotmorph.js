// Bab 5 · "Orang jadi Angka" — dot morph dua gelombang, varian KERUMUNAN/JALAN → GRAFIK (beda dari versi otak bab 3).
// Frame jalan Jakarta dicacah jadi grid titik (warna dari footage, dikuantisasi ke 6 nada hangat). Gelombang 1: titik
// lepas dari gambar, menyapu kiri→kanan, melayang naik seperti debu siang. Gelombang 2: tiap titik terbang ke piksel
// "tinta" grafik ILO (urut x, jadi arus jalan mengalir ke batang dari kiri ke kanan), warna berganti ke nada grafik.
// Balik: urutan dibalik (grafik → awan → jalan). Semua titik digambar ke SATU kanvas offscreen, satu path per nada
// (≈ 9 fill per frame), lalu station cukup drawImage sekali (onPlane memberi blur DOF per draw call).
import { clamp, inv, lerp, E, spring } from './engine.js';
import { rnd, mk } from './kit.js';

const SRC_PAL = ['#3B2518', '#6A4429', '#97653D', '#BF8C5C', '#DDB487', '#F5DDB8'];   // nada hangat siang (gelap → terang)

/** srcIm: frame footage (img/canvas), dstIm: grafik PNG (bg gelap). o.w/o.h ukuran kanvas (unit station), o.step jarak titik sumber,
 *  o.tstep jarak sampel target, o.bg warna latar grafik [r,g,b], o.hot = [x0,y0,x1,y1] piksel grafik untuk nada 'hot' (batang Indonesia). */
export function buildMorph(srcIm, dstIm, o = {}) {
  const Wc = o.w ?? 1600, Hc = o.h ?? 900, st = o.step ?? 16, ts = o.tstep ?? 8, bg = o.bg ?? [26, 26, 25];
  const cols = Math.round(Wc / st), rows = Math.round(Hc / st);
  const [sc, sg] = mk(cols, rows);                                       // sumber: cover-fit ke grid
  const iw = srcIm.naturalWidth || srcIm.width, ih = srcIm.naturalHeight || srcIm.height, s = Math.max(cols / iw, rows / ih);
  sg.drawImage(srcIm, (cols - iw * s) / 2, (rows - ih * s) / 2, iw * s, ih * s);
  const sd = sg.getImageData(0, 0, cols, rows).data;
  const src = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const p = (r * cols + c) * 4, l = (.3 * sd[p] + .59 * sd[p + 1] + .11 * sd[p + 2]) / 255;
    src.push({ x: (c + .5) * st, y: (r + .5) * st, b: Math.min(5, Math.floor(clamp((l - .06) * 1.25) * 6)) });
  }
  const tc = Math.round(Wc / ts), tr = Math.round(Hc / ts), [dc, dg] = mk(tc, tr);   // target: piksel tinta grafik
  dg.drawImage(dstIm, 0, 0, tc, tr); const dd = dg.getImageData(0, 0, tc, tr).data;
  const dw = dstIm.naturalWidth || dstIm.width, dh = dstIm.naturalHeight || dstIm.height, hot = o.hot;
  const tgt = [];
  for (let r = 0; r < tr; r++) for (let c = 0; c < tc; c++) {
    const p = (r * tc + c) * 4, d = Math.abs(dd[p] - bg[0]) + Math.abs(dd[p + 1] - bg[1]) + Math.abs(dd[p + 2] - bg[2]);
    if (d < 70) continue;
    const blue = dd[p + 2] - dd[p] > 50, px = (c + .5) / tc * dw, py = (r + .5) / tr * dh;
    const isHot = hot && px >= hot[0] && px <= hot[2] && py >= hot[1] && py <= hot[3];
    tgt.push({ x: (c + .5) * ts, y: (r + .5) * ts, b: isHot ? 8 : blue ? 7 : 6 });
  }
  // urutkan keduanya menurut x (+ sedikit y) → arus kiri ke kanan, sedikit silang
  const key = q => q.x + q.y * .18;
  const order = src.map((q, i) => i).sort((a, b) => key(src[a]) - key(src[b]));
  const tsort = tgt.slice().sort((a, b) => key(a) - key(b));
  order.forEach((si, k) => { const q = src[si], tq = tsort[Math.floor(k * tsort.length / src.length)];
    q.tx = tq.x + (rnd(si * 3.3) - .5) * ts * .6; q.ty = tq.y + (rnd(si * 5.1) - .5) * ts * .6; q.tb = tq.b;
    const out = (q.x - Wc / 2) / Wc;                                      // awan: naik dan sedikit menyebar keluar
    q.cx = q.x + out * 260 + (rnd(si + .7) - .5) * 240; q.cy = q.y - 110 - rnd(si * 1.9) * 260; q.ph = rnd(si * 7.7) * 6.28;
    q.sz = .55 + rnd(si * 2.3) * .8; q.d1 = (q.x / Wc) * .55 + rnd(si * 4.4) * .18; q.d2 = (q.tx / Wc) * .6 + rnd(si * 6.6) * .16; });
  const [cv, cg] = mk(Wc, Hc);
  return { Wc, Hc, st, src, cv, cg, n: src.length, nt: tgt.length };
}

/** Gambar titik ke M.cv pada waktu t. T: { w1, w2, b1, b2 } = mulai gelombang 1 (lepas), 2 (rakit), balik-1 (bubar), balik-2 (kembali).
 *  pal: { 6: nada teks grafik, 7: batang biru, 8: batang hot }. Mengembalikan alpha titik keseluruhan (0 = tidak usah digambar). */
export function drawMorph(M, t, T, pal) {
  const g = M.cg; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, M.Wc, M.Hc);
  const P = []; for (let i = 0; i < 9; i++) P.push(new Path2D());
  const colr = [...SRC_PAL, pal[6], pal[7], pal[8]];
  for (let i = 0; i < M.n; i++) {
    const q = M.src[i];
    const a1 = E.outCubic(inv(T.w1 + q.d1, T.w1 + q.d1 + .9, t)), a2 = spring(Math.max(0, t - T.w2 - q.d2), .72, .42);
    const b2 = E.inOutCubic(inv(T.b1 + q.d2 * .7, T.b1 + q.d2 * .7 + .6, t)), b1 = E.outCubic(inv(T.b2 + q.d1 * .6, T.b2 + q.d1 * .6 + .7, t));
    const u1 = a1 * (1 - b1), u2 = Math.min(1.08, a2) * (1 - b2);
    const sw = Math.sin(t * 1.6 + q.ph) * 14 * u1 * (1 - Math.min(1, u2)), cx = q.cx + sw, cy = q.cy + Math.cos(t * 1.2 + q.ph) * 9 * u1;
    const x = lerp(lerp(q.x, cx, u1), q.tx, u2), y = lerp(lerp(q.y, cy, u1), q.ty, u2);
    const sz = lerp(lerp(M.st * .92, M.st * .62 * q.sz, u1), 7.5, Math.min(1, u2));
    P[u2 > .55 ? q.tb : q.b].rect(x - sz / 2, y - sz / 2, sz, sz);
  }
  for (let i = 0; i < 9; i++) { g.fillStyle = colr[i]; g.fill(P[i]); }
  return M.cv;
}
