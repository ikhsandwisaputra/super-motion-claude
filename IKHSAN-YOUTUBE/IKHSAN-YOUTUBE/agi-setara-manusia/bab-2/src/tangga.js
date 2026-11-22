// bab-2 helpers · "70 tahun sebentar lagi": tangga tahun (1 anak tangga = 1 tahun), grade baja untuk foto arsip,
// gelembung suara (prediksi tiap era), papan tahun split-flap, tirai Turing, lingkar tangan. Tidak mengubah kit.
import { clamp, inv, lerp, E, spring } from './engine.js';
import { ivo, setFont, mk, grainRect, D2R, IVORY, LIME, LIME_INK, DSP, SRF, MN, rnd, onPlane } from './kit.js';
import { flap } from './pustaka/data.js';

// ── tangga tahun ─────────────────────────────────────────────────────────────────────────────────────────────
// spec: ['run', n, run, yr0] | ['land', yr, nStasiun]. Pijakan (landing) era: 700 + (n−1)·G + 700 panjangnya.
export const G = 1900;
export function bangun(spec, z0 = 900) {
  const S = [], L = {}; let y = 0, z = z0;
  for (const e of spec) {
    if (e[0] === 'run') { const [, n, r, yr0] = e; for (let i = 0; i < n; i++) { S.push({ z, y0: y, y1: y - 130, yr: yr0 == null ? null : yr0 + i }); y -= 130; z += r; } }
    else { const [, yr, n] = e, s = S[S.length - 1], len = 1400 + (n - 1) * G; s.z1 = s.z + len; z = s.z + len; L[yr] = { y: s.y1, z0: s.z, z1: s.z1, st: k => s.z + 700 + k * G, py: s.y1 - 540 }; }
  }
  S.forEach((s, i) => { s.z1 = s.z1 ?? (S[i + 1] ? S[i + 1].z : s.z + 380); });
  return { S, L };
}
// tinggi pijakan di kedalaman z (untuk kamera yang menaiki tangga)
export function yAt(S, z) { let y = 0; for (const s of S) { if (z >= s.z) y = s.y1; else break; } return y; }
export function stepOf(S, yr) { return S.find(s => s.yr === yr); }

// latar baja: gradasi dingin + kolam cahaya dari atas (menutupi lantai titik kit; dunia bab ini = tangga)
export function latar(ctx, W, H) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1;
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#151A20'); g.addColorStop(.55, '#0E1115'); g.addColorStop(1, '#0A0B0D');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const r = ctx.createRadialGradient(W * .5, -H * .25, 0, W * .5, -H * .25, H * 1.25); r.addColorStop(0, 'rgba(186,204,222,.085)'); r.addColorStop(1, 'rgba(186,204,222,0)');
  ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
}

// label tahun di muka anak tangga: era = DSP besar, biasa = mono kecil (tangga curam: dekade saja)
export function labelTahun(ctx, t, pr, foc, items, S, o = {}) {
  const era = o.era || [], lime = o.lime || [], lit = o.lit || (() => 1);
  S.forEach((s, i) => {
    if (s.yr == null) return; const isEra = era.includes(s.yr), steep = s.z1 - s.z < 200;
    if (!isEra && steep && s.yr % 10) return;
    const L = lit(i, t); if (L <= .02) return;
    const d = pr(0, s.y1, s.z).z + .5;
    for (const side of isEra ? [-1, 1] : [-1]) items.push({ z: s.z, x: 0, d, f: () => {
      const p = pr(side * 1080, s.y0, s.z - 1); if (p.z < 150) return; const fog = clamp(1.15 - (p.z - 1500) / 9000); if (fog <= 0) return;
      onPlane(ctx, pr, side * 1080, s.y0, s.z - 1, foc, () => {
        const lm = lime.includes(s.yr); ctx.globalAlpha = fog * L * (isEra ? (lm ? .95 : .62) : .38); ctx.fillStyle = lm ? LIME : IVORY; ctx.textAlign = side < 0 ? 'left' : 'right';
        if (isEra) { setFont(ctx, DSP(118), 4); ctx.fillText(String(s.yr), 0, -12); }
        else { setFont(ctx, MN(steep ? 44 : 34), 4); ctx.fillText(String(s.yr), 0, -40); }
        ctx.textAlign = 'left';
      });
    } });
  });
}

// ── grade baja untuk foto arsip (dipanggang sekali di load) ───────────────────────────────────────────────────
export function baja(im, o = {}) {
  const [c, g] = mk(im.width, im.height);
  g.filter = `grayscale(1) contrast(${o.con ?? 1.16}) brightness(${o.bri ?? .97})`; g.drawImage(im, 0, 0); g.filter = 'none';
  g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgb(204,215,227)'; g.fillRect(0, 0, c.width, c.height);
  g.globalCompositeOperation = 'screen'; g.fillStyle = 'rgb(13,17,23)'; g.fillRect(0, 0, c.width, c.height);
  g.globalCompositeOperation = 'source-over'; return c;
}
// foto arsip berbingkai, pusat (x, y): bukaan dari tengah, dorongan pelan, grain tajam, tanda sudut, caption + kredit di BAWAH foto
// o: { fx, fy (fokus 0..1), push, cap, kredit, out (t keluar), wipe: [im2, t] (ganti ke foto kedua dengan sapuan) }
export function arsip(ctx, im, x, y, w, h, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + .6, t)); if (k <= 0) return; const ko = o.out != null ? E.inCubic(inv(o.out, o.out + .35, t)) : 0;
  const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * clamp(k * 1.8) * (1 - ko);
  const hh = h * lerp(.06, 1, k);
  ctx.save(); ctx.translate(0, (1 - k) * 50 - ko * 60);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 26; ctx.fillStyle = '#0C0E11'; ctx.fillRect(x - w / 2, y - hh / 2, w, hh); ctx.restore();
  const draw = (img, fx, fy) => { const s = Math.max(w / img.width, h / img.height) * ((o.push ?? 1.04) + .05 * inv(t0, t0 + 9, t));
    const dw = img.width * s, dh = img.height * s; ctx.drawImage(img, x - w / 2 - (dw - w) * fx, y - h / 2 - (dh - h) * fy, dw, dh); };
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - hh / 2, w, hh); ctx.clip();
  draw(im, o.fx ?? .5, o.fy ?? .5);
  if (o.wipe) { const [im2, tw] = o.wipe, kw = E.inOutCubic(inv(tw, tw + .55, t));
    if (kw > 0) { ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w * kw, h); ctx.clip(); draw(im2, .5, .5); ctx.restore();
      if (kw < 1) { ctx.fillStyle = LIME; ctx.fillRect(x - w / 2 + w * kw - 3, y - h / 2, 6, h); } } }
  const vg = ctx.createRadialGradient(x, y, h * .3, x, y, Math.max(w, h) * .78); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(4,6,9,.5)');
  ctx.fillStyle = vg; ctx.fillRect(x - w / 2, y - h / 2, w, h);
  grainRect(ctx, x - w / 2, y - h / 2, w, h, t, .26); ctx.restore();
  ctx.strokeStyle = ivo(.16); ctx.lineWidth = 1.5; ctx.strokeRect(x - w / 2, y - hh / 2, w, hh);
  ctx.fillStyle = ivo(.7); const Lm = 24, T2 = 2.5, x0 = x - w / 2 - 12, x1 = x + w / 2 + 12, y0 = y - hh / 2 - 12, y1 = y + hh / 2 + 12;
  for (const [px, py, dx, dy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) { ctx.fillRect(px, py, Lm * dx, T2 * dy); ctx.fillRect(px, py, T2 * dx, Lm * dy); }
  const cx = o.capAlign === 'right' ? x + w / 2 : x - w / 2; ctx.textAlign = o.capAlign || 'left';
  if (o.cap && t > t0 + .3) { setFont(ctx, MN(o.capSize ?? 21), 3); ctx.fillStyle = ivo(.88); ctx.fillText(o.cap.slice(0, Math.ceil((t - t0 - .3) * 50)), cx, y + h / 2 + 50); }
  if (o.kredit && t > t0 + .5) { setFont(ctx, `400 15px "Space Mono"`, 1); ctx.fillStyle = ivo(.56); ctx.fillText(o.kredit.slice(0, Math.ceil((t - t0 - .5) * 70)), cx, y + h / 2 + (o.cap ? 80 : 46)); }
  ctx.textAlign = 'left'; ctx.restore(); ctx.globalAlpha = a0;
}

// ── gelembung suara: prediksi sebuah era, berdiri di anak tangganya ──────────────────────────────────────────
// lines: string | [pre, word, post] (word di bawah stabilo lime pada o.tm) · o: { size, who, tail: −1 kiri | 1 kanan, tm, out, sub }
export function suara(ctx, x, y, lines, t, t0, o = {}) {
  if (t <= t0) return; const size = o.size ?? 58, pad = size * .8, lh = size * 1.22, a0 = ctx.globalAlpha;
  const ko = o.out != null ? E.inCubic(inv(o.out, o.out + .3, t)) : 0; if (ko >= 1) return;
  setFont(ctx, SRF(size), 0); const L = lines.map(l => typeof l === 'string' ? ['', '', l] : l);
  const wd = Math.max(...L.map(([a, b, c]) => ctx.measureText(a + b + c).width)), bw = wd + pad * 2, bh = L.length * lh + pad * 1.1;
  const tail = o.tail ?? -1, tx = x + tail * (bw / 2 - size * 1.4), ty = y + bh / 2 + size * .9;
  const k = spring(t - t0, .52, .42), s = lerp(.55, 1, k);
  ctx.save(); ctx.globalAlpha = a0 * clamp((t - t0) / .12) * (1 - ko); ctx.translate(tx, ty); ctx.scale(s, s); ctx.translate(-tx, -ty + ko * -40);
  const path = () => { ctx.beginPath(); ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, size * .55);
    ctx.moveTo(tx - tail * size * .2, y + bh / 2 - 2); ctx.lineTo(tx, ty); ctx.lineTo(tx + tail * size * .9, y + bh / 2 - 2); };
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; path(); ctx.fillStyle = 'rgba(17,21,26,.94)'; ctx.fill(); ctx.restore();
  ctx.strokeStyle = ivo(.58); ctx.lineWidth = 2.5; path(); ctx.stroke();
  ctx.fillStyle = 'rgba(17,21,26,1)'; ctx.fillRect(tx - tail * size * .2 + (tail < 0 ? 0 : -size * 1.1) + 2 * tail, y + bh / 2 - 3, size * 1.1 - 4, 5);
  const kb = o.tm != null ? E.snap(inv(o.tm, o.tm + .3, t)) : 0;
  L.forEach(([a, b, c], i) => {
    const kl = E.outQuint(inv(t0 + .12 + i * .14, t0 + .55 + i * .14, t)); if (kl <= 0) return;
    setFont(ctx, SRF(size), 0); const yy = y - bh / 2 + pad * .55 + lh * (i + .78) + (1 - kl) * 24, x0 = x - bw / 2 + pad, wa = ctx.measureText(a).width, wb = ctx.measureText(b).width;
    ctx.globalAlpha = a0 * kl * (1 - ko);
    if (b && kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(x0 + wa - size * .1, yy - size * .86, (wb + size * .2) * kb, size * 1.08); }
    ctx.fillStyle = IVORY; ctx.fillText(a, x0, yy); ctx.fillStyle = b && kb > .55 ? LIME_INK : IVORY; ctx.fillText(b, x0 + wa, yy); ctx.fillStyle = IVORY; ctx.fillText(c, x0 + wa + wb, yy);
  });
  ctx.globalAlpha = a0 * (1 - ko) * clamp((t - t0 - .3) / .25);
  if (o.who) { setFont(ctx, MN(18), 4); ctx.fillStyle = LIME; ctx.fillRect(x - bw / 2, y - bh / 2 - 36, 11, 11); ctx.fillStyle = ivo(.82); ctx.fillText(o.who, x - bw / 2 + 24, y - bh / 2 - 25); }
  if (o.sub) { setFont(ctx, `400 19px "Space Mono"`, 1); ctx.fillStyle = ivo(.6); ctx.fillText(o.sub, x - bw / 2 + (tail < 0 ? size * 2.6 : 0), y + bh / 2 + 50); }
  ctx.restore(); ctx.globalAlpha = a0;
  return { w: bw, h: bh };
}

// ── papan tahun split-flap: angka bergulir y0 → y1 dengan perlambatan; tiap digit membalik saat berganti ────────
export function tahunFlap(ctx, x, y, t, t0, y0, y1, dur, o = {}) {
  const cw = o.cw ?? 150, ch = o.ch ?? 210, gp = o.gap ?? 12, u = E.outCubic(inv(t0, t0 + dur, t)), v = lerp(y0, y1, u), n = Math.floor(v), f = v - n;
  const cur = String(Math.min(y1, n)), prev = String(Math.max(y0, n - 1)), x0 = x - (4 * cw + 3 * gp) / 2 + cw / 2;
  const settled = u >= 1;
  for (let i = 0; i < 4; i++) {
    const changes = cur[i] !== prev[i] && !settled && t > t0, p = changes ? clamp(f / .55) : 1;
    flap(ctx, x0 + i * (cw + gp), y, cw, ch, { cur: cur[i], prev: prev[i], p, look: settled && o.lime ? 'lime' : null }, { shadow: true, fill: '#1A1E23', ink: IVORY });
  }
  return Math.min(y1, n);
}

// ── tirai Turing: panel kain baja berlipit, terbuka sebagian (open 0..1) ──────────────────────────────────────
export function tirai(ctx, x, y, w, h, t, open, o = {}) {
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.clip();
  ctx.fillStyle = '#0F1216'; ctx.fillRect(x - w / 2, y - h / 2, w, h);
  if (o.isi) o.isi(ctx);                                               // siluet di balik tirai
  const half = w / 2 * (1 - .22 * open), N = 9;
  for (const sd of [-1, 1]) {
    const x0 = sd < 0 ? x - w / 2 : x + w / 2 - half;
    const g = ctx.createLinearGradient(x0, 0, x0 + half, 0);
    for (let i = 0; i <= N; i++) { const q = i / N, sw = Math.sin(q * Math.PI * N + t * .9 + sd) * .5 + .5; g.addColorStop(q, `rgb(${Math.round(42 + 34 * sw)},${Math.round(48 + 36 * sw)},${Math.round(56 + 38 * sw)})`); }
    ctx.globalAlpha = o.tembus ?? .93; ctx.fillStyle = g; ctx.fillRect(x0, y - h / 2, half, h); ctx.globalAlpha = 1;
  }
  const top = ctx.createLinearGradient(0, y - h / 2, 0, y - h / 2 + 90); top.addColorStop(0, 'rgba(0,0,0,.55)'); top.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = top; ctx.fillRect(x - w / 2, y - h / 2, w, 90);
  ctx.restore();
  ctx.fillStyle = ivo(.55); ctx.fillRect(x - w / 2 - 20, y - h / 2 - 10, w + 40, 6);                // rel tirai
  grainRect(ctx, x - w / 2, y - h / 2, w, h, t, .14);
}

// ── lingkar spidol lime di sekitar (cx, cy), digambar sekali tarik ───────────────────────────────────────────
export function lingkar(ctx, cx, cy, rx, ry, t, t0, o = {}) {
  const k = E.outCubic(inv(t0, t0 + (o.dur ?? .55), t)); if (k <= 0) return; const N = 70, a0 = -2.2, span = Math.PI * 2.18;
  ctx.save(); ctx.strokeStyle = o.col || LIME; ctx.lineWidth = o.lw ?? 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= N * k; i++) { const q = a0 + span * i / N, wob = 1 + .045 * Math.sin(i * .45 + 1.3) + .03 * (i / N);
    const px = cx + Math.cos(q) * rx * wob, py = cy + Math.sin(q) * ry * wob - 6 * (i / N); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.stroke(); ctx.restore();
}

// penggaris tahun (garis waktu) : satu tick per tahun ya0..ya1 dari x0..x1, label hanya di tahun pilihan; digambar maju sampai k
export function garisTahun(ctx, x0, x1, y, ya0, ya1, k, labels, o = {}) {
  if (k <= 0) return; const n = ya1 - ya0, sp = (x1 - x0) / n, upto = Math.floor(n * k);
  ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + (x1 - x0) * k, y);
  for (let i = 0; i <= upto; i++) { const yr = ya0 + i, h = yr % 10 === 0 ? 30 : yr % 5 === 0 ? 20 : 11; ctx.moveTo(x0 + i * sp, y); ctx.lineTo(x0 + i * sp, y - h); }
  ctx.stroke();
  setFont(ctx, MN(o.size ?? 20), 2); ctx.textAlign = 'center';
  for (const [yr, txt, hi] of labels) { const i = yr - ya0; if (i > upto) continue; const xx = x0 + i * sp;
    ctx.fillStyle = hi ? IVORY : ivo(.7); ctx.fillRect(xx - 1.5, y - 46, 3, 46); ctx.fillText(txt, xx, y + 36); }
  ctx.textAlign = 'left';
}

// ── tangga dunia ber-segmen (pengganti agi.stairs di bab ini) ─────────────────────────────────────────────────
// Kenapa: stairs() mengurutkan SATU tapak per anak tangga dari tepi depannya, jadi pijakan era yang panjang (s.d. 9.000 unit)
// tergambar DI ATAS station yang berdiri di atasnya (teks bawah terpotong). Di sini tapak dipotong ≤ 420 unit, batas potong tepat
// di z tiap station, dan kedalaman diambil dari tengah segmen pada y −500 (basis yang sama dengan item station di kit). Riser + bibir = item sendiri di tepi depan. Warna = agi.js.
const BGC = [11, 12, 9], STEP = [30, 31, 25], TREAD = [38, 39, 32];
const mixc = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;
export function tanggaBaja(ctx, t, pr, items, S, lit = () => 1, o = {}) {
  const X0 = o.x0 ?? -1400, X1 = o.x1 ?? 1400, cuts = o.splits || [], SEG = 420;
  S.forEach((s, i) => {
    const L = lit(i, t), lime = o.lime && o.lime.includes(i);
    const zs = [s.z, ...cuts.filter(z => z > s.z + 20 && z < s.z1 - 20), s.z1].sort((a, b) => a - b), seg = [];
    for (let k = 0; k < zs.length - 1; k++) { const n = Math.max(1, Math.ceil((zs[k + 1] - zs[k]) / SEG)); for (let q = 0; q < n; q++) seg.push([lerp(zs[k], zs[k + 1], q / n), lerp(zs[k], zs[k + 1], (q + 1) / n)]); }
    for (const [za, zb] of seg) items.push({ z: za, x: 0, d: pr(0, -500, (za + zb) / 2).z, f: () => {
      const P = [pr(X0, s.y1, za), pr(X1, s.y1, za), pr(X1, s.y1, zb), pr(X0, s.y1, zb)]; if (P.some(p => p.z < 120)) return;
      const fog = clamp(1.15 - (P[1].z - 1500) / 9000);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = o.alpha ?? 1; ctx.fillStyle = mixc(BGC, TREAD, L * fog);
      ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[3].x, P[3].y); ctx.closePath(); ctx.fill(); } });
    items.push({ z: s.z - 2, x: 0, d: pr(0, -500, s.z).z - 1, f: () => {
      const P = [pr(X0, s.y0, s.z), pr(X1, s.y0, s.z), pr(X1, s.y1, s.z), pr(X0, s.y1, s.z)]; if (P.some(p => p.z < 120)) return;
      const fog = clamp(1.15 - (P[2].z - 1500) / 9000);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = o.alpha ?? 1;
      const g = ctx.createLinearGradient(0, P[0].y, 0, P[3].y); g.addColorStop(0, mixc(BGC, STEP, .35 * L * fog)); g.addColorStop(1, mixc(BGC, STEP, L * fog));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[3].x, P[3].y); ctx.closePath(); ctx.fill();
      if (L > 0) { ctx.globalAlpha = 1; ctx.strokeStyle = lime ? `rgba(200,245,60,${.9 * L * fog})` : ivo(.62 * L * fog); ctx.lineWidth = Math.max(1, (lime ? 5 : 3.2) * P[3].s);
        ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
        ctx.strokeStyle = lime ? `rgba(200,245,60,${.12 * L * fog})` : ivo(.07 * L * fog); ctx.lineWidth = Math.max(3, 22 * P[3].s); ctx.stroke(); } } });
  });
}

// ── latar foto full-bleed (revisi 17 Nov: "jangan dikotakin") ────────────────────────────────────────────────
// BG = [{ im | vid, t0, t1, fx, fy, kredit, cap, grade }] (waktu film). Cover-crop di titik fokus (fx, fy), push pelan 1.06→1.14,
// drift lateral kecil, crossfade .45 s; lalu scrim gelap + vinyet + gradasi bawah (lantai tangga) + grain → tangga & tipo di atasnya.
export function bgK(BG, t) { let m = 0; for (const b of BG) m = Math.max(m, Math.min(clamp((t - b.t0) / .45), 1 - clamp((t - b.t1 + .45) / .45))); return m; }
export function layarFoto(ctx, W, H, BG, t, o = {}) {
  let any = 0;
  for (const b of BG) {
    const k = Math.min(clamp((t - b.t0) / .45), 1 - clamp((t - b.t1 + .45) / .45)); if (k <= 0) continue; any = Math.max(any, k);
    const R = v => typeof v === 'string' ? (o.IM || {})[v] : v; let im = R(b.im); if (b.vid) { const V = R(b.vid); if (!V) continue; const n = V.n, per = 2 * (n - 1), m = Math.floor(Math.max(0, t - b.t0) * V.fps) % per; im = V.img[m < n ? m : per - m]; }
    if (!im) continue;
    const u = inv(b.t0, b.t1, t), s = Math.max(W / im.width, H / im.height) * lerp(1.06, 1.14, u), w = im.width * s, h = im.height * s;
    const fx = b.fx ?? .5, fy = b.fy ?? .5, dx = (b.dir ?? 1) * lerp(-18, 18, u);
    const x = clamp((b.sx ?? W / 2) - fx * w, W - w + 18, 18) + dx, y = clamp(H / 2 - fy * h, H - h, 0);
    ctx.save(); ctx.globalAlpha = k; if (b.grade) ctx.filter = b.grade; ctx.drawImage(im, x - 18, y, w, h); ctx.restore();
  }
  if (any <= 0) return 0;
  ctx.save(); ctx.globalAlpha = any;
  ctx.fillStyle = `rgba(8,10,13,${o.dim ?? .5})`; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, H * .45, H * .25, W / 2, H / 2, W * .72); g.addColorStop(0, 'rgba(6,8,10,0)'); g.addColorStop(1, 'rgba(6,8,10,.78)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const b2 = ctx.createLinearGradient(0, H * .55, 0, H); b2.addColorStop(0, 'rgba(8,10,12,0)'); b2.addColorStop(1, 'rgba(8,10,12,.7)'); ctx.fillStyle = b2; ctx.fillRect(0, H * .55, W, H * .45);
  ctx.restore(); grainRect(ctx, 0, 0, W, H, t, .3 * any);
  return any;
}
// kredit + caption foto latar: pojok kanan bawah, mono kecil, kontras tinggi
export function kreditLatar(ctx, W, H, BG, t) {
  for (const b of BG) { const k = Math.min(clamp((t - b.t0 - .3) / .35), 1 - clamp((t - b.t1 + .45) / .3)); if (k <= 0 || !b.kredit) continue;
    ctx.save(); ctx.globalAlpha = k; ctx.textAlign = 'right';
    if (b.cap) { setFont(ctx, MN(16), 4); ctx.fillStyle = IVORY; ctx.fillText(b.cap, W - 64, H - 74); }
    setFont(ctx, `400 15px "Space Mono"`, 1); ctx.fillStyle = 'rgba(241,239,230,.8)'; ctx.fillText(b.kredit, W - 64, H - 48); ctx.restore(); }
}
