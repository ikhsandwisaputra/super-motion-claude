// Tes A · Selam Detail (lokal 0–6 s = global 0–6 s). VO 01 [16,00–19,95] "Sayangnya, di pasar gelap, rahasia kita diobral murah."
// Plate Ahpo D06 (studio gelap, ponsel melayang + bayangan) → layar menyala: tangkapan layar Kompas di penampil foto (latar hitam)
// → rush ke layar (snap 85 % dalam 4 f, zoom titik-tetap) → dorong ke "Mengobral", stabilo lime di "rahasia kita" → pupil gelap
// membuka di lubang huruf "o" → selam speed ramp Hermite (rush–hang–rush; judul = vektor hasil trace, tetap tajam sampai ×140)
// → match-cut keluar dari lubang angka "0": Rp0,49 / warga berdiri di lantai studio yang sama (hit shD). Post: ghost trail + zoom
// blur radial hanya saat rush. Kamera: layar = (x − c)·m + (960, 540); dunia 1 = piksel plate 4000×2250, dunia 2 = ruang harga (z 1 = layar).
import { lerp, spring } from './engine.js';
import { W, H, clamp, inv, E, ROOM, IVORY, LIME, DSP, SRF, MN, mk, rnd, loadImg, srcTag, setFont } from './kit.js';

const SX = 902, SY = 362, SW = 816, SH = 1396, SR = 68, NOTCH = [1214, 426, 192, 34];   // layar ponsel di plate D06 (terukur)
const IW = 1344, IH = 712, CROP = 90, AS = SW / IW, AH = (IH - CROP) * AS;             // tangkapan layar Kompas, breadcrumb dibuang
const AX = SX, AY = SY + (SH - AH) / 2;                                                // kartu di tengah layar (penampil foto)
const IMG = (ix, iy) => [AX + ix * AS, AY + (iy - CROP) * AS];                         // piksel gambar → plate
const OC = [778.2, 172.0], CTR = IMG(...OC), PH = [SX + SW / 2, SY + SH / 2];          // lubang "o" (kontur 10) · pusat layar
const CA = [.56, 1745, 1125], CB = [.80, 1480, 1000], CC = [2.45, PH[0], PH[1]], CD = [3.13, CTR[0], CTR[1]];
const LAM = Math.log(1 / .15) / (4 / 30);                                               // snap 85 % dalam 4 frame (≈ 14,2 /s)
const DIVE = [[3.04, 0, 0], [3.13, 1.55, 22], [3.19, 2.25, 4], [3.29, 2.6, 4], [3.34, 3.2, 20], [3.40, 4.30, 22]];   // [t, e-fold, e-fold/s]
const TC = 3.40, Yf = 860, PF = 520, BGC = [2000], BGM = .66;                     // potong o → 0 · lantai, ukuran harga, kamera BG dunia 2
const sm = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };

function herm(t, K) {                                                                   // posisi log-zoom = ∫ laju; Hermite kubik per segmen
  if (t <= K[0][0]) return 0; const N = K.length - 1; if (t >= K[N][0]) return K[N][1];
  for (let i = 0; i < N; i++) {
    const [t0, p0, v0] = K[i], [t1, p1, v1] = K[i + 1];
    if (t <= t1) { const h = t1 - t0, s = (t - t0) / h, s2 = s * s, s3 = s2 * s; return (2 * s3 - 3 * s2 + 1) * p0 + (s3 - 2 * s2 + s) * h * v0 + (-2 * s3 + 3 * s2) * p1 + (s3 - s2) * h * v1; }
  }
}
function fz(A, B, u) {                                                                  // zoom titik-tetap A → B, log-skala
  const [ma, xa, ya] = A, [mb, xb, yb] = B, lm = lerp(Math.log(ma), Math.log(mb), u), k = ma / Math.exp(lm);
  const fx = (xb * mb - xa * ma) / (mb - ma), fy = (yb * mb - ya * ma) / (mb - ma);
  return [lm, fx - (fx - xa) * k, fy - (fy - ya) * k];
}
function cam1(t) {
  let lm, cx, cy;
  if (t < 1.30) { const k = clamp(t / 1.30); [lm, cx, cy] = fz(CA, CB, .5 * k + .5 * Math.pow(k, 2.4)); }   // drift yang makin cepat
  else [lm, cx, cy] = fz(CB, CC, 1 - Math.exp(-LAM * (t - 1.30)));                                       // rush ke layar
  const s3 = E.inOutSine(inv(1.95, 3.04, t));                                                             // dorong ke "o"
  lm += s3 * Math.log(CD[0] / CC[0]); cx += s3 * (CD[1] - CC[1]); cy += s3 * (CD[2] - CC[2]);
  if (t > 2.86 && t < 3.04) lm -= .07 * Math.sin(Math.PI * (t - 2.86) / .18);                             // antisipasi: tarik napas
  lm += herm(t, DIVE);
  return { cx, cy, m: Math.exp(lm) };
}

export function makeA() {
  let BGI, BG2, SHD, PHN, RAS, RBL, HEAD, COUNTER, VIG, T1, T2, RF; const G = {};
  function cam2(t) {                                                                    // keluar dari lubang "0": snap mundur + drift
    const z = Math.exp(G.LZ0 * Math.exp(-LAM * Math.max(0, t - TC))), d = 1 + .035 * E.inOutSine(inv(3.9, 6.0, t)), s = z * d;
    const e = d * G.Fx * (1 - z) + 960 * (1 - d), f = d * G.Fy * (1 - z) + 600 * (1 - d);
    return { z, d, s, e, f, cx: (960 - e) / s, cy: (540 - f) / s, m: s };
  }
  const state = t => t < TC ? cam1(t) : cam2(t);

  function motes(ctx, t, S) {                                                           // debu bokeh depan lensa, ikut zoom (lebih lambat)
    for (let i = 0; i < 12; i++) {
      const x = 960 + (rnd(i * 9.1) * W - 960 + 10 * t * (rnd(i * 2.3) - .4)) * S, y = 540 + (rnd(i * 4.7) * H - 540 - 8 * t) * S, r = (4 + 9 * rnd(i * 1.9)) * Math.sqrt(S);
      if (x < -r || x > W + r || y < -r || y > H + r) continue;
      const gr = ctx.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(241,239,230,${.05 + .08 * rnd(i * 6.6)})`); gr.addColorStop(1, 'rgba(241,239,230,0)');
      ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
  }
  function stabilo(ctx, t) {                                                            // ruang piksel gambar; ujung pahat, tepi sedikit beriak
    const p = E.outCubic(inv(2.40, 2.72, t)); if (p <= 0) return;
    const x0 = 490, x1 = 490 + 503 * p, yt = x => 140 - 3 * (x - 490) / 503, yb = x => 206 - 3 * (x - 490) / 503;
    ctx.beginPath(); ctx.moveTo(x0 + 7, yt(x0 + 7));
    for (let x = x0 + 25; x < x1 - 6; x += 18) ctx.lineTo(x, yt(x) + 1.2 * Math.sin(x * .37));
    ctx.lineTo(x1, yt(x1)); ctx.lineTo(x1 - 9, yb(x1 - 9));
    for (let x = x1 - 27; x > x0; x -= 18) ctx.lineTo(x, yb(x) + 1.2 * Math.sin(x * .29 + 1));
    ctx.lineTo(x0, yb(x0)); ctx.closePath();
    ctx.globalCompositeOperation = 'multiply'; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * .9; ctx.fillStyle = LIME; ctx.fill();
    ctx.globalAlpha = a0; ctx.globalCompositeOperation = 'source-over';
  }
  function pupil(ctx, t) {                                                              // pupil gelap di lubang "o": buka kecil, lalu melebar saat hang
    const k = .4 * E.outCubic(inv(2.90, 3.08, t)) + .9 * E.inOutCubic(inv(3.19, 3.36, t)); if (k <= 0) return;
    const rx = 12 * k, ry = 22 * k;
    ctx.save(); ctx.clip(COUNTER);
    ctx.save(); ctx.translate(OC[0], OC[1]); ctx.scale(rx / ry, 1);
    const g = ctx.createRadialGradient(0, -ry * .12, 0, 0, 0, ry); g.addColorStop(0, '#1E1F17'); g.addColorStop(.55, '#0B0C09'); g.addColorStop(1, '#020202');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, ry, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
    ctx.strokeStyle = 'rgba(241,239,230,.55)'; ctx.lineWidth = .7; ctx.beginPath(); ctx.ellipse(OC[0], OC[1], rx, ry, 0, 0, 2 * Math.PI); ctx.stroke();
    ctx.restore();
  }
  function statusBar(ctx) {                                                             // jam, sinyal, baterai + notch (ruang plate)
    setFont(ctx, MN(26, 700), 0); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = IVORY;
    ctx.fillText('21.04', (SX + NOTCH[0]) / 2 + 16, NOTCH[1] + NOTCH[3] / 2 + 1); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    for (let i = 0; i < 4; i++) ctx.fillRect(1512 + i * 11, 455 - 7 - i * 4, 7, 7 + i * 4);
    ctx.strokeStyle = IVORY; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(1572, 432, 46, 22, 6); ctx.stroke();
    ctx.fillRect(1576, 436, 30, 14); ctx.fillRect(1620, 439, 4, 8);
    ctx.fillStyle = '#030303'; ctx.beginPath(); ctx.roundRect(...NOTCH, 17); ctx.fill();
  }
  function layar(ctx, t, on, sImg) {                                                    // isi layar ponsel (ruang plate, sudah digeser melayang)
    if (on <= 0) return;
    ctx.save(); ctx.beginPath(); ctx.roundRect(SX, SY, SW, SH, SR); ctx.clip();
    ctx.globalAlpha = on; ctx.fillStyle = '#060705'; ctx.fillRect(SX, SY, SW, SH);
    ctx.save(); ctx.transform(AS, 0, 0, AS, AX, AY - CROP * AS);                        // → ruang piksel gambar
    ctx.drawImage(RAS, 0, CROP, IW, IH - CROP);
    const rb = inv(1.6, 2.3, sImg); if (rb > 0) { ctx.globalAlpha = on * rb; ctx.drawImage(RBL, 0, CROP, IW, IH - CROP); ctx.globalAlpha = on; }   // DOF badan artikel
    const va = sm(.95, 1.35, sImg);
    if (va > 0) { ctx.globalAlpha = on * va; ctx.fillStyle = IVORY; ctx.fillRect(100, 112, 1150, 213); ctx.fillStyle = 'rgb(35,35,33)'; ctx.fill(HEAD, 'evenodd'); ctx.globalAlpha = on; }
    stabilo(ctx, t); pupil(ctx, t);
    ctx.restore();
    statusBar(ctx);
    const sh = .07 * (1 - inv(.9, 1.3, sImg));                                         // kilau kaca, hilang saat kamera masuk
    if (sh > 0) {
      const g = ctx.createLinearGradient(SX, SY, SX + SW, SY + SH); g.addColorStop(.16, 'rgba(241,239,230,0)'); g.addColorStop(.29, `rgba(241,239,230,${sh})`); g.addColorStop(.42, 'rgba(241,239,230,0)');
      ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(SX, SY, SW, SH); ctx.globalCompositeOperation = 'source-over';
    }
    const fk = .22 * Math.exp(-(((t - .34) / .045) ** 2)); if (fk > .005) { ctx.globalAlpha = fk; ctx.fillStyle = IVORY; ctx.fillRect(SX, SY, SW, SH); }   // kedip nyala
    ctx.globalAlpha = 1; ctx.restore();
  }
  function draw1(ctx, t) {
    const { cx, cy, m } = cam1(t), sImg = m * AS, on = E.outCubic(inv(.30, .52, t)), lock = 1 - sm(.8, 2.0, m);
    const sw = Math.sin(2 * Math.PI * t / 2.4) * lock, fl = -6 * sw;                    // ponsel melayang; berhenti saat kamera mengunci layar
    const T = k => ctx.setTransform(k, 0, 0, k, 960 - cx * k, 540 - cy * k);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    const covered = (SX - cx) * m + 960 < -2 && (SX + SW - cx) * m + 960 > W + 2 && (SY + fl - cy) * m + 540 < -2 && (SY + SH + fl - cy) * m + 540 > H + 2;
    if (!covered) {
      const mb = .56 * Math.pow(m / .56, .35), bx = clamp(cx, 960 / mb, 4000 - 960 / mb), by = clamp(cy, 540 / mb, 2250 - 540 / mb);
      ctx.setTransform(mb, 0, 0, mb, 960 - bx * mb, 540 - by * mb); ctx.drawImage(BGI, 0, 0, 4000, 2250);   // dinding studio, parallax lebih lambat, tepi plate tak pernah terlihat
      T(m);
      if (on > 0) {                                                                       // cahaya layar tumpah ke ruangan
        const g = ctx.createRadialGradient(PH[0], PH[1] + fl, 80, PH[0], PH[1] + fl, 1500);
        g.addColorStop(0, `rgba(241,239,230,${.10 * on})`); g.addColorStop(.45, `rgba(241,239,230,${.035 * on})`); g.addColorStop(1, 'rgba(241,239,230,0)');
        ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(PH[0] - 1500, PH[1] - 1500, 3000, 3000); ctx.globalCompositeOperation = 'source-over';
      }
      ctx.globalAlpha = .92 - .1 * sw; ctx.drawImage(SHD, 600, 1700, 1400, 400); ctx.globalAlpha = 1;
      ctx.drawImage(PHN, 860, 320 + fl, 930, 1500);
    }
    T(m); ctx.translate(0, fl); layar(ctx, t, on, sImg);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    motes(ctx, t, Math.pow(m / .56, .3)); ctx.drawImage(VIG, 0, 0);
    ctx.globalAlpha = 1 - inv(2.92, 3.04, t); srcTag(ctx, 'Sumber: Kompas.id, 29 Okt 2021', 64, 72, t, 1.40); ctx.globalAlpha = 1;
  }
  function price(g, t) {                                                                // Rp kecil · 0,49 lime · "/ warga" naik dari lantai
    g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    setFont(g, DSP(PF * .41)); g.fillStyle = 'rgba(241,239,230,.94)'; g.fillText('Rp', G.lx[0], Yf - .59 * G.cap);
    setFont(g, DSP(PF)); const lg = g.createLinearGradient(0, Yf - G.cap, 0, Yf); lg.addColorStop(0, '#D2F85A'); lg.addColorStop(1, '#B4DC35');
    g.fillStyle = lg; g.fillText('0,49', G.lx[1], Yf);
    if (t > 3.92) {
      g.save(); g.beginPath(); g.rect(-1e4, -1e4, 3e4, 1e4 + G.fl); g.clip();
      setFont(g, SRF(110)); g.fillStyle = 'rgba(241,239,230,.9)'; g.fillText('/ warga', G.lx[2], Yf + (1 - spring(t - 3.92, .55, .42)) * 150); g.restore();
    }
    g.letterSpacing = '0px';
  }
  function draw2(ctx, t) {
    const c = cam2(t), ex = lerp(.25, 1, E.outCubic(clamp((t - TC) / .35))), zb = Math.pow(c.z, .3), S = BGM * zb * c.d, FL = G.fl;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    ctx.setTransform(S, 0, 0, S, c.d * (zb * (960 - BGM * BGC[0]) + G.Fx * (1 - zb)) + 960 * (1 - c.d), c.d * (zb * (540 - BGM * G.bgy) + G.Fy * (1 - zb)) + 600 * (1 - c.d));
    ctx.drawImage(BG2, 0, 0, 4000, 2250);                                               // studio yang sama, sisi kanan ponsel
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(0,0,0,${1 - ex})`; ctx.fillRect(0, 0, W, H);
    ctx.setTransform(c.s, 0, 0, c.s, c.e, c.f);
    ctx.save(); ctx.translate(960, FL + 20); ctx.scale(1, .16);                         // kolam cahaya di lantai
    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1100); g.addColorStop(0, 'rgba(241,239,230,.06)'); g.addColorStop(1, 'rgba(241,239,230,0)');
    ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(-1100, -1100, 2200, 2200); ctx.globalCompositeOperation = 'source-over'; ctx.restore();
    ctx.save(); ctx.translate(G.mid, FL + 2); ctx.scale(1, .045);                       // bayangan kontak
    g = ctx.createRadialGradient(0, 0, 0, 0, 0, G.wT * .55); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(-G.wT, -G.wT, 2 * G.wT, 2 * G.wT); ctx.restore();
    const r = RF.g, ys = c.s * FL + c.f;                                                // pantulan lantai (cermin di FL, pudar 240 px)
    r.setTransform(1, 0, 0, 1, 0, 0); r.clearRect(0, 0, W, H); r.setTransform(c.s, 0, 0, -c.s, c.e, c.f + 2 * FL * c.s); price(r, t);
    r.setTransform(1, 0, 0, 1, 0, 0); r.globalCompositeOperation = 'destination-in';
    g = r.createLinearGradient(0, ys, 0, ys + 240 * c.s); g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
    r.fillStyle = g; r.fillRect(0, Math.max(0, ys), W, H); r.globalCompositeOperation = 'source-over';
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = .17; ctx.drawImage(RF.c, 0, 0); ctx.globalAlpha = 1;
    ctx.setTransform(c.s, 0, 0, c.s, c.e, c.f); price(ctx, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1 - inv(2, 5, c.z); motes(ctx, t, Math.pow(c.z, .3) * c.d); ctx.globalAlpha = 1; ctx.drawImage(VIG, 0, 0);
    srcTag(ctx, 'Rp133,05 jt ÷ 270 jt data · CNN Indonesia, 21 Mei 2021', 64, 72, t, 4.35);   // slot sumber sama dengan dunia 1 (kiri atas), jauh dari pantulan
  }

  return {
    hits: [['stk2', TC, 1]],                                                             // kilat pendek tepat di potongan (shD terlalu panjang pra-roll-nya, menutup pupil)
    vo: [{ file: 'dkd_vo_ahmad_01', from: 16.00, to: 19.95, at: .30 }],
    lines: [{ t0: .42, t1: 4.14, text: 'Sayangnya, di pasar gelap, rahasia kita diobral murah.' }],
    keys: [[.30, 'VO + layar menyala'], [1.30, 'rush ke layar'], [2.40, 'stabilo Mengobral'], [2.90, 'pupil di lubang o'], [3.04, 'selam'],
      [3.19, 'hang'], [TC, 'match-cut o → 0'], [3.92, '/ warga'], [4.35, 'sumber']],
    sfx: [[.27, 'v17/v17f_tap', -17], [1.28, 'v17/v17f_sub_whoosh', -16], [2.38, 'typo-pack/typo_marker_swipe', -14], [2.82, 'v17/v17_shutter', -18],
      [3.02, 'v17/v17_whoosh_fast', -14], [3.12, 'v17/v17_sub_boom', -15], [3.54, 'typo-pack/typo_stamp_hit', -12], [3.91, 'typo-pack/typo_swish_swing', -19]],
    async load() {
      const P = '../assets/ahpo/D06_0';
      const [bg, shd, phn, kom, vec] = await Promise.all([loadImg(P + '1_BG_studio.png', 2000), loadImg(P + '2_MG_bayangan.png', 4000), loadImg(P + '3_MG_ponsel-gelap.png', 4000),
        loadImg('../assets/foto/kompas-peretas-mengobral-data-warga.png', IW), fetch('../assets/vec/kompas_judul.json').then(r => r.json())]);
      const cut = (im, x, y, w, h, f) => { const [c, g] = mk(w, h); if (f) g.filter = f; g.drawImage(im, x, y, w, h, 0, 0, w, h); return c; };
      BGI = cut(bg, 0, 0, bg.width, bg.height, 'blur(3px)'); BG2 = cut(bg, 0, 0, bg.width, bg.height, 'blur(5px) brightness(.85)');
      SHD = cut(shd, 600, 1700, 1400, 400); PHN = cut(phn, 860, 320, 930, 1500);
      RAS = cut(kom, 0, CROP, IW, IH - CROP); const rg = RAS.getContext('2d');                // kertas putih → ivory
      rg.globalCompositeOperation = 'multiply'; rg.fillStyle = IVORY; rg.fillRect(0, 0, IW, IH - CROP); rg.globalCompositeOperation = 'source-over';
      RBL = cut(RAS, 0, 0, IW, IH - CROP, 'blur(1.4px)');
      const path = pl => {                                                              // poligon trace → kurva: kuadratik lewat titik tengah, sudut > 35° tetap tajam
        const n = pl.length / 2, V = i => { const j = ((i % n) + n) % n; return [pl[2 * j], pl[2 * j + 1]]; }, M = i => { const [a, b] = V(i), [c, d] = V(i + 1); return [(a + c) / 2, (b + d) / 2]; };
        const sharp = i => { const [a, b] = V(i - 1), [c, d] = V(i), [e, f] = V(i + 1), ux = c - a, uy = d - b, vx = e - c, vy = f - d; return (ux * vx + uy * vy) < Math.cos(35 * Math.PI / 180) * Math.hypot(ux, uy) * Math.hypot(vx, vy); };
        const p = new Path2D(); p.moveTo(...M(0));
        for (let k = 1; k <= n; k++) { const [vx, vy] = V(k), [mx, my] = M(k); if (sharp(k)) { p.lineTo(vx, vy); p.lineTo(mx, my); } else p.quadraticCurveTo(vx, vy, mx, my); }
        p.closePath(); return p;
      };
      HEAD = new Path2D(); vec.polys.forEach(pl => HEAD.addPath(path(pl))); COUNTER = path(vec.polys[vec.counter]);
      let g; [VIG, g] = mk(W, H); const vg = g.createRadialGradient(960, 540, 300, 960, 540, 1150); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.45)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
      T1 = (([c, g]) => ({ c, g }))(mk(W, H)); T2 = (([c, g]) => ({ c, g }))(mk(W, H)); RF = (([c, g]) => ({ c, g }))(mk(W, H));
      // tata letak harga + ukur lubang angka "0" → z0 (lubang menutup seluruh frame ×1,15) dan titik tetap zoom-out
      const [, mg] = mk(8, 8); setFont(mg, DSP(PF)); const dC = mg.measureText(',').actualBoundingBoxDescent, w049 = mg.measureText('0,49').width, w0 = Math.ceil(mg.measureText('0').width); G.cap = mg.measureText('0').actualBoundingBoxAscent;
      setFont(mg, DSP(PF * .41)); const wRp = mg.measureText('Rp').width; setFont(mg, SRF(110)); const wW = mg.measureText('/ warga').width, dW = mg.measureText('/ warga').actualBoundingBoxDescent;
      G.fl = Yf + Math.max(dC, dW) + 4; G.bgy = 1900 - (G.fl - 540) / BGM;   // lantai di bawah ekor koma/g: angka melayang tipis seperti ponsel
      G.wT = wRp + 16 + w049 + 34 + wW; const x0 = 960 - G.wT / 2; G.lx = [x0, x0 + wRp + 16, x0 + wRp + 16 + w049 + 34]; G.mid = G.lx[1] + w049 / 2;
      const pad = 20, [zc, zg] = mk(w0 + 2 * pad, Math.ceil(G.cap) + 2 * pad); setFont(zg, DSP(PF)); zg.fillStyle = '#fff'; zg.fillText('0', pad, pad + G.cap);
      const D = zg.getImageData(0, 0, zc.width, zc.height).data, A = (x, y) => D[(y * zc.width + x) * 4 + 3] >= 128;
      const run = (n, f) => { let i = 0; while (i < n && !f(i)) i++; while (i < n && f(i)) i++; const a = i; while (i < n && !f(i)) i++; return [a, i]; };
      const yM = Math.round(pad + G.cap / 2), [ax0, ax1] = run(zc.width, x => A(x, yM)), xM = Math.round((ax0 + ax1) / 2), [ay0, ay1] = run(zc.height, y => A(xM, y));
      const a = (ax1 - ax0) / 2, b = (ay1 - ay0) / 2, Kx = G.lx[1] + (ax0 + ax1) / 2 - pad, Ky = Yf - G.cap + (ay0 + ay1) / 2 - pad, z0 = 1.15 * Math.hypot(960 / a, 540 / b);
      G.LZ0 = Math.log(z0); G.Fx = (Kx * z0 - 960) / (z0 - 1); G.Fy = (Ky * z0 - 540) / (z0 - 1);
      window.__A = { a, b, Kx, Ky, z0, cap: G.cap, wT: G.wT, dC, dW, fl: G.fl };
    },
    draw(ctx, t) {
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.letterSpacing = '0px';
      if (t < TC) draw1(ctx, t); else draw2(ctx, t);
      ctx.letterSpacing = '0px';
    },
    post(o, t) {                                                                         // ghost trail + zoom blur radial, hanya saat rush
      let ta = t - 1 / 60, tb = t; if (t >= TC && ta < TC) { ta = t; tb = t + 1 / 60; } if (ta < 0) { ta = 0; tb = 1 / 60; }
      const A = state(ta), B = state(tb), S = state(t), ar = Math.abs(Math.log(B.m / A.m) / (tb - ta));
      const gh = sm(4, 10, ar), amt = .35 * sm(5, 24, ar); if (gh <= 0 && amt <= .004) return;
      let fx = 960, fy = 540; const dm = B.m - A.m;                                       // fokus = titik tetap antara dua keadaan kamera
      if (Math.abs(dm) > 1e-6 * B.m) { fx = clamp(((B.cx * B.m - A.cx * A.m) / dm - S.cx) * S.m + 960, -300, W + 300); fy = clamp(((B.cy * B.m - A.cy * A.m) / dm - S.cy) * S.m + 540, -300, H + 300); }
      const snap = () => { T1.g.setTransform(1, 0, 0, 1, 0, 0); T1.g.globalCompositeOperation = 'copy'; T1.g.drawImage(o.canvas, 0, 0); T1.g.globalCompositeOperation = 'source-over'; };
      snap(); o.setTransform(1, 0, 0, 1, 0, 0);
      if (gh > 0) for (let j = 1; j <= 2; j++) {
        const td = t - j * .05; if (td < 0 || (td >= TC) !== (t >= TC)) continue;
        const r = state(td).m / S.m, g = T2.g;
        g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); g.setTransform(r, 0, 0, r, fx * (1 - r), fy * (1 - r)); g.drawImage(T1.c, 0, 0); g.setTransform(1, 0, 0, 1, 0, 0);
        if (r < 1) {                                                                       // gema lebih kecil dari frame → tepi dibaurkan
          const R1 = .98 * r * Math.min(fx, W - fx, fy, H - fy); if (R1 <= 10) continue;
          const fg = g.createRadialGradient(fx, fy, .3 * R1, fx, fy, R1); fg.addColorStop(0, '#000'); fg.addColorStop(1, 'rgba(0,0,0,0)');
          g.globalCompositeOperation = 'destination-in'; g.fillStyle = fg; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over';
        }
        o.globalCompositeOperation = 'lighten'; o.globalAlpha = .3 / j * gh; o.drawImage(T2.c, 0, 0);
      }
      o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
      if (amt > .004) {
        if (gh > 0) snap();                                                                // 2 lintasan × 6 salinan = 36 sampel rata, tanpa pita bertingkat
        const pass = (g, src, step, first) => { g.setTransform(1, 0, 0, 1, 0, 0); if (first) { g.globalCompositeOperation = 'copy'; g.globalAlpha = 1; g.drawImage(src, 0, 0); g.globalCompositeOperation = 'source-over'; }
          for (let j = 1; j < 6; j++) { const s = 1 + step * j; g.globalAlpha = 1 / (j + 1); g.setTransform(s, 0, 0, s, fx * (1 - s), fy * (1 - s)); g.drawImage(src, 0, 0); }
          g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; };
        pass(T2.g, T1.c, amt / 6, true); o.globalCompositeOperation = 'copy'; o.drawImage(T2.c, 0, 0); o.globalCompositeOperation = 'source-over'; pass(o, T2.c, amt / 36, false);
      }
    },
  };
}
