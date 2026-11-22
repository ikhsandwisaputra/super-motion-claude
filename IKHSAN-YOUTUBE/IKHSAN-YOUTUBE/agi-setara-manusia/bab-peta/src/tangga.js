// bab-peta helpers (subuh dingin): anak tangga raksasa berukir, profil kemampuan (ILUSTRASI), amplop spam, rel penggaris.
// Bentuk anak tangga dari kit/agi.js (stairs), di sini: warna subuh dingin, tinggi tumbuh dari lantai (pegas), ukiran di muka anak tangga.
import { clamp, inv, lerp, E, spring } from './engine.js';
import { ivo, setFont, MN, DSP, SRF, IVORY, LIME, LIME_INK, onPlane, rnd } from './kit.js';

export const COLD = [15, 21, 26], RISE = [33, 43, 51], TREAD = [44, 56, 65];
export const mix = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * clamp(k))).join(',')})`;

/** Anak tangga raksasa. S: [{ z, z1, y0, y1, x0, x1, label?: fn(ctx, L) }] (y ke bawah). grow(i,t) 0..1 tinggi naik dari y0;
 *  lit(i,t) 0..1 nyala; lime(i,t) 0..1 bibir lime. Ukiran = fn di bidang muka (pusat muka anak tangga, satuan dunia). */
export function bigStairs(ctx, t, pr, foc, items, S, o = {}) {
  const grow = o.grow || (() => 1), lit = o.lit || (() => 1), lime = o.lime || (() => 0);
  S.forEach((s, i) => {
    const g = grow(i, t); if (g <= 0.001) return;
    const L = lit(i, t), Lm = lime(i, t), y1 = lerp(s.y0, s.y1, g);
    items.push({ z: s.z - 2, x: (s.x0 + s.x1) / 2, d: pr((s.x0 + s.x1) / 2, y1, s.z).z + 1, f: () => {
      const P = [pr(s.x0, s.y0, s.z), pr(s.x1, s.y0, s.z), pr(s.x1, y1, s.z), pr(s.x0, y1, s.z), pr(s.x1, y1, s.z1), pr(s.x0, y1, s.z1)];
      if (P.some(p => p.z < 120)) return;
      const fog = clamp(1.18 - (P[2].z - 1800) / 14000);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1;
      ctx.fillStyle = mix(COLD, TREAD, (.55 + .45 * L) * fog);                            // pijakan
      ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[4].x, P[4].y); ctx.lineTo(P[5].x, P[5].y); ctx.closePath(); ctx.fill();
      const gr = ctx.createLinearGradient(0, P[0].y, 0, P[3].y);                            // muka: gelap di kaki, terang di bibir
      gr.addColorStop(0, mix(COLD, RISE, .3 * fog)); gr.addColorStop(1, mix(COLD, RISE, (.6 + .4 * L) * fog));
      ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[3].x, P[3].y); ctx.closePath(); ctx.fill();
      if (s.label && g > .6) onPlane(ctx, pr, s.lx ?? (s.x0 + s.x1) / 2, (s.y0 + y1) / 2, s.z - 1, o.sharp ? lerp(foc, pr(s.lx ?? 0, (s.y0 + y1) / 2, s.z).z, o.sharp) : foc, () => { ctx.globalAlpha = clamp((g - .6) / .4) * fog; s.label(ctx, L, t); });
      const lw = Math.max(1, 3.2 * P[3].s);                                                  // bibir: gading tipis, atau lime (motif)
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
      ctx.strokeStyle = ivo((.18 + .5 * L) * fog * (1 - Lm)); ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
      if (Lm > 0) { ctx.strokeStyle = `rgba(200,245,60,${.95 * Lm * fog})`; ctx.lineWidth = Math.max(2, 6 * P[3].s); ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(lerp(P[3].x, P[2].x, E.outCubic(Lm)), lerp(P[3].y, P[2].y, E.outCubic(Lm))); ctx.stroke(); }
      ctx.strokeStyle = ivo(.06 * L * fog); ctx.lineWidth = Math.max(3, 24 * P[3].s); ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
    } });
  });
}

/** Langit subuh dingin (layar penuh, paling jauh): biru-batu di atas, kabut pucat di cakrawala yang makin terang (k 0..1). */
export function sky(ctx, pr, c, k) {
  const hz = pr(c.tx, 0, c.tz + 1e6).y;
  const g = ctx.createLinearGradient(0, hz - 900, 0, hz + 60);
  g.addColorStop(0, 'rgba(22,31,39,0)'); g.addColorStop(.62, `rgba(70,92,108,${.16 + .1 * k})`); g.addColorStop(.93, `rgba(168,190,200,${.15 + .12 * k})`); g.addColorStop(1, 'rgba(168,190,200,0)');
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(-200, hz - 900, 2400, 960);
}

// ── profil kemampuan: 8 kolom penggaris berdiri, garis putus "MANUSIA". Nilai = ILUSTRASI (bukan data), label wajib tampil.
export const DOM = ['CATUR', 'BAHASA', 'GAMBAR', 'HITUNG', 'RENCANA', 'INGATAN', 'GERAK', 'BELAJAR'];
export const PROF = {
  nol: [0, 0, 0, 0, 0, 0, 0, 0],
  sempit: [.98, .03, .02, .05, .03, .02, 0, .02],
  agi: [.66, .62, .58, .64, .6, .57, .55, .63],
  super: [1, .94, .9, .97, .92, .88, .86, .95],
};
/** x,y = kiri-bawah; from/to = nama profil, tk = waktu pegas tiap kolom (stagger), hl = indeks kolom yang disorot (gading penuh). */
export function profil(ctx, t, x, y, w, h, from, to, tk, o = {}) {
  const n = DOM.length, gap = w / n, bw = gap * .34, hum = o.human ?? .6, a0 = ctx.globalAlpha;
  ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 20, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let i = 0; i < n; i++) {
    const cx = x + gap * (i + .5), kk = spring(t - tk - i * (o.stag ?? .05), .5, .42), v = lerp(PROF[from][i], PROF[to][i], kk), bh = Math.max(0, v * h);
    ctx.strokeStyle = ivo(.16); ctx.beginPath();                                             // skala penggaris kolom (satu path)
    for (let j = 0; j <= 20; j++) { const yy = y - j * h / 20; ctx.moveTo(cx - bw / 2 - (j % 5 ? 6 : 14), yy); ctx.lineTo(cx - bw / 2, yy); }
    ctx.stroke();
    const hot = o.hl === i;
    ctx.fillStyle = hot ? IVORY : ivo(.62); ctx.fillRect(cx - bw / 2, y - bh, bw, bh);
    ctx.fillStyle = ivo(.9); ctx.fillRect(cx - bw / 2 - 4, y - bh - 3, bw + 8, 4);
    setFont(ctx, MN(15), 2); ctx.textAlign = 'center'; ctx.fillStyle = ivo(hot ? .95 : .58); ctx.fillText(DOM[i], cx, y + 34); ctx.textAlign = 'left';
  }
  const kh = E.outQuint(inv(o.thum ?? tk, (o.thum ?? tk) + .5, t));                          // garis manusia
  if (kh > 0) { const yy = y - hum * h; ctx.globalAlpha = a0 * kh; ctx.setLineDash([16, 10]); ctx.strokeStyle = ivo(.8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - 30, yy); ctx.lineTo(x - 30 + (w + 60) * kh, yy); ctx.stroke(); ctx.setLineDash([]);
    setFont(ctx, MN(16), 3); ctx.fillStyle = ivo(.85); ctx.fillText('MANUSIA', x + w + 44, yy + 6); ctx.globalAlpha = a0; }
  setFont(ctx, MN(14), 3); ctx.fillStyle = ivo(.5); ctx.fillText('ILUSTRASI · BUKAN DATA', x - 20, y + 74);
}

/** Amplop line-art (tutup V), pusat (x,y), lebar w. spam = garis coret. */
export function envelope(ctx, x, y, w, rot, a, spam) {
  const h = w * .64; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(15,21,26,.92)'; ctx.strokeStyle = ivo(.85); ctx.lineWidth = 3; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, h * .1); ctx.lineTo(w / 2, -h / 2); ctx.stroke();
  ctx.strokeStyle = ivo(.35); ctx.beginPath(); ctx.moveTo(-w / 2, h / 2); ctx.lineTo(-w * .12, -h * .02); ctx.moveTo(w / 2, h / 2); ctx.lineTo(w * .12, -h * .02); ctx.stroke();
  if (spam) { ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-w * .62, h * .5); ctx.lineTo(w * .62, -h * .5); ctx.stroke(); }
  ctx.restore();
}

/** Rel penggaris miring di dunia (pegangan tangga = alat ukur): dari a ke b (titik dunia), garis ukur tiap `step` satuan. */
export function rail(ctx, pr, a, b, n, k, o = {}) {
  if (k <= 0) return;
  const P = i => { const u = i / n * k; return pr(lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)); };
  const p0 = P(0), p1 = P(n); if (p0.z < 120 || p1.z < 120) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = o.a ?? 1;
  ctx.strokeStyle = ivo(.55); ctx.lineWidth = Math.max(1.5, 5 * p0.s); ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
  ctx.strokeStyle = ivo(.12); ctx.lineWidth = Math.max(4, 40 * p0.s); ctx.stroke();
  ctx.strokeStyle = ivo(.7); ctx.lineWidth = Math.max(1, 2 * p0.s); ctx.beginPath();
  for (let i = 0; i <= n; i++) { const p = P(i), L = (i % 10 ? (i % 5 ? 22 : 40) : 64) * p.s; ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, p.y + L); }
  ctx.stroke(); ctx.globalAlpha = 1;
}

/** Tanda tanya besar yang melompat di antara titik layar (spring hop). pts: [[x,y,tStart]] (titik terakhir yang sudah lewat = posisi). */
export function hop(ctx, pts, t, size) {
  let i = 0; while (i < pts.length - 1 && t >= pts[i + 1][2]) i++;
  const [x1, y1, t1] = pts[i], prev = pts[Math.max(0, i - 1)], u = i ? E.inOutCubic(inv(t1, t1 + .38, t)) : 1;
  const x = lerp(prev[0], x1, u), y = lerp(prev[1], y1, u) - Math.sin(Math.PI * u) * Math.min(220, size * .7) * (i ? 1 : 0);
  const land = t - t1 - .38, sq = i && land > 0 ? 1 - .14 * Math.exp(-land * 10) * Math.cos(land * 34) : 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(1 / sq, sq); setFont(ctx, DSP(size), 0); ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillText('?', 10, 12); ctx.fillStyle = IVORY; ctx.fillText('?', 0, 0); ctx.textAlign = 'left'; ctx.restore();
}
export { rnd, LIME, LIME_INK, SRF };
