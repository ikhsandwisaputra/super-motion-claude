// Motif film agi-setara-manusia ("SAKLAR atau TANGGA?") — dipakai SEMUA bab, supaya satu film satu bahasa.
// Asal: tes-tangga (disetujui Ikhsan 16 Nov). Import di bab: import { makeSteps, stairs, saklar, ruler, needle, diukur } from './agi.js';
// (agi.js disymlink ke src/ tiap bab: ln -s ../../kit/agi.js src/agi.js; new_chapter.sh sudah melakukannya)
//  - makeSteps / stairs : dunia anak tangga 3D yang dinaiki kamera (S1 sumbu path, tulang punggung film).
//  - saklar             : saklar dinding "AGI" yang diklik tapi lampunya tetap padam (hook, puncak, penutup).
//  - ruler / needle     : Penggaris Elastis — garis ukur berpegas, benda yang diukur tidak berubah; jarum lime.
//  - diukur             : S2 "Bukti Diukur" — penggaris tipis meluncur di bawah frasa bukti + tag siapa yang mengukur.
import { clamp, inv, lerp, E, spring } from './engine.js';
import { ivo, setFont, MN, DSP, IVORY, LIME } from './kit.js';
import { bulb } from './draw.js';

const BGC = [11, 12, 9], STEP = [30, 31, 25], TREAD = [38, 39, 32];
export const rgbMix = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;

/** Anak tangga dunia (y ke bawah, lantai 0). spec = daftar ['run', n] | ['land', panjang], mulai di z0.
 *  Tiap anak tangga: rise 130, run 380. Contoh tes: [['run',4],['land',1060],['run',4],['land',1560],['run',14]], z0 900
 *  → pijakan y −520 (z 2040–3100) dan y −1040 (z 4240–5800). Station berdiri di pijakan: py ≈ yPijakan − 540. */
export function makeSteps(spec, z0 = 900, rise = 130, run = 380) {
  const S = []; let y = 0, z = z0;
  for (const [k, n] of spec) {
    if (k === 'run') for (let i = 0; i < n; i++) { S.push({ z, y0: y, y1: y - rise }); y -= rise; z += run; }
    else { S[S.length - 1].z1 = z - run + n; z = z - run + n; }
  }
  S.forEach((s, i) => { s.z1 = s.z1 ?? (S[i + 1] ? S[i + 1].z : s.z + run); });
  return S;
}

/** Push anak tangga sebagai item berurut kedalaman (panggil dari world() SATU station saja, mis. j === c.i).
 *  lit(i, t) → 0..1 nyala bibir anak tangga ke-i (default: semua menyala). o.x0/o.x1 lebar, o.lime = indeks anak tangga berbibir lime. */
export function stairs(ctx, t, pr, items, S, lit = () => 1, o = {}) {
  const X0 = o.x0 ?? -1400, X1 = o.x1 ?? 1400;
  S.forEach((s, i) => {
    const L = lit(i, t);
    items.push({ z: s.z - 2, x: 0, d: pr(0, s.y1, s.z).z + 1, f: () => {
      const P = [pr(X0, s.y0, s.z), pr(X1, s.y0, s.z), pr(X1, s.y1, s.z), pr(X0, s.y1, s.z), pr(X1, s.y1, s.z1), pr(X0, s.y1, s.z1)];
      if (P.some(p => p.z < 120)) return;
      const fog = clamp(1.15 - (P[2].z - 1500) / 9000);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1;
      ctx.fillStyle = rgbMix(BGC, TREAD, L * fog);
      ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[4].x, P[4].y); ctx.lineTo(P[5].x, P[5].y); ctx.closePath(); ctx.fill();
      const g = ctx.createLinearGradient(0, P[0].y, 0, P[3].y);
      g.addColorStop(0, rgbMix(BGC, STEP, .35 * L * fog)); g.addColorStop(1, rgbMix(BGC, STEP, L * fog));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[3].x, P[3].y); ctx.closePath(); ctx.fill();
      if (L > 0) {
        const lime = o.lime && o.lime.includes(i);
        ctx.strokeStyle = lime ? `rgba(200,245,60,${.9 * L * fog})` : ivo(.62 * L * fog); ctx.lineWidth = Math.max(1, (lime ? 5 : 3.2) * P[3].s);
        ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
        ctx.strokeStyle = lime ? `rgba(200,245,60,${.12 * L * fog})` : ivo(.07 * L * fog); ctx.lineWidth = Math.max(3, 22 * P[3].s); ctx.stroke();
      }
    } });
  });
}

/** Saklar dinding, pusat pelat di (x, y) station-lokal; klik di tKlik (snap + tendangan pegas kecil).
 *  o.label (default 'AGI'), o.bulb (default true: bohlam line-art di kanan atas yang TETAP PADAM), o.scale, o.bx/o.by posisi bohlam relatif. */
export function saklar(ctx, t, x, y, tKlik, o = {}) {
  const k = E.snap(inv(tKlik - .02, tKlik + .06, t)), dt = t - tKlik, imp = dt > 0 ? Math.exp(-dt * 9) * Math.cos(dt * 42) : 0, sc = o.scale ?? 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc * (1 - .022 * imp), sc * (1 - .022 * imp));
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.roundRect(-188, -296, 400, 620, 40); ctx.fill();
  const g = ctx.createLinearGradient(0, -310, 0, 310); g.addColorStop(0, '#2B2C25'); g.addColorStop(1, '#17180F');
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-200, -310, 400, 620, 40); ctx.fill();
  ctx.strokeStyle = ivo(.24); ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = ivo(.10); ctx.beginPath(); ctx.moveTo(-160, -304); ctx.lineTo(160, -304); ctx.stroke();
  for (const sy of [-258, 258]) { ctx.fillStyle = '#0F100C'; ctx.beginPath(); ctx.arc(0, sy, 11, 0, 7); ctx.fill(); ctx.strokeStyle = ivo(.28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-7, sy + 3); ctx.lineTo(7, sy - 3); ctx.stroke(); }
  ctx.fillStyle = '#0C0D09'; ctx.beginPath(); ctx.roundRect(-118, -184, 236, 368, 18); ctx.fill();
  const half = (y0, y1, b, lift) => { ctx.fillStyle = rgbMix([30, 31, 25], [96, 96, 88], b); ctx.beginPath(); ctx.roundRect(-104, y0 - lift, 208, y1 - y0 + lift, 12); ctx.fill(); };
  half(-170, 0, lerp(.42, .12, k), lerp(8, 0, k)); half(0, 170, lerp(.12, .42, k), lerp(0, 8, k));
  ctx.fillStyle = ivo(.16); ctx.fillRect(-104, -2, 208, 4);
  setFont(ctx, DSP(78), 6); ctx.textAlign = 'center'; ctx.fillStyle = ivo(lerp(.82, .55, k)); ctx.fillText(o.label ?? 'AGI', 0, -60 + 4 * k);
  setFont(ctx, MN(15), 4); ctx.fillStyle = ivo(.4); ctx.fillText('ON', 0, -196); ctx.fillText('OFF', 0, 210);
  ctx.restore(); ctx.textAlign = 'left';
  if (o.bulb === false) return;
  const bx = x + (o.bx ?? 900), by = y + (o.by ?? -240);
  ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by - 860); ctx.lineTo(bx, by - 90); ctx.stroke();
  ctx.save(); ctx.translate(bx, by + 4 * imp); ctx.strokeStyle = ivo(.42); ctx.lineWidth = 3; bulb(ctx, 66); ctx.restore();
  const gl = dt > 0 && dt < .1 ? 1 - dt / .1 : 0;            // kilau kaca sesaat (pantulan, bukan nyala)
  if (gl) { ctx.strokeStyle = ivo(.5 * gl); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by - 18, 46, Math.PI * 1.15, Math.PI * 1.4); ctx.stroke(); }
}

/** Penggaris kaca-akrilik. Nol di x0, garis ukur tiap 1 satuan berjarak sp px, sampai `upto` (≤ max). Satu path untuk semua garis.
 *  o.label = ukiran lembaga (mono kecil di kiri bawah), o.alpha, o.every (label angka tiap N, default 10), o.h tinggi badan (132). */
export function ruler(ctx, x0, y, sp, o = {}) {
  const max = o.max ?? 100, upto = o.upto ?? max, a = o.alpha ?? 1, end = x0 + max * sp, h = o.h ?? 132, ev = o.every ?? 10;
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(241,239,230,.075)'; ctx.strokeStyle = ivo(.42); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(x0 - 34, y, end - x0 + 68, h, 14); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = ivo(.2); ctx.beginPath(); ctx.moveTo(x0 - 20, y + 7); ctx.lineTo(end + 20, y + 7); ctx.stroke();
  ctx.strokeStyle = ivo(.78); ctx.lineWidth = 2; ctx.beginPath();
  for (let v = 0; v <= upto; v++) { const x = x0 + v * sp, hh = v % 10 ? (v % 5 ? 18 : 32) : 50; ctx.moveTo(x, y); ctx.lineTo(x, y + hh); }
  ctx.stroke(); setFont(ctx, MN(17), 0); ctx.fillStyle = ivo(.72); ctx.textAlign = 'center';
  for (let v = 0; v <= upto; v += ev) ctx.fillText(String(v), x0 + v * sp, y + 82);
  ctx.textAlign = 'left';
  if (o.label) { setFont(ctx, MN(15), 4); ctx.fillStyle = ivo(.5); ctx.fillText(o.label, x0 - 14, y + h - 16); }
  ctx.restore();
}

/** Jarum ukur lime vertikal di x, dari y0 sepanjang len·k (k 0..1 = tumbuh). Satu-satunya lime di layar saat dipakai. */
export function needle(ctx, x, y0, len, k = 1) {
  if (k <= 0) return;
  ctx.fillStyle = LIME; ctx.fillRect(x - 2, y0, 4, len * k);
  ctx.beginPath(); ctx.moveTo(x - 11, y0 - 10); ctx.lineTo(x + 11, y0 - 10); ctx.lineTo(x, y0 + 6); ctx.closePath(); ctx.fill();
}

/** Pegas penggaris: nilai sp yang berpindah dari sp0 ke sp1 mulai tKick (overshoot kecil = terasa elastis). */
export const springSp = (t, tKick, sp0, sp1, zeta = .55, T = .55) => lerp(sp0, sp1, spring(t - tKick, zeta, T));

/** S2 "Bukti Diukur": setelah stabilo, penggaris tipis meluncur di bawah frasa (x..x+w, garis dasar y) + tag mono siapa yang mengukur.
 *  who = 'penguji netral' | 'vendor' | teks lain. Masuk di t0 (0,45 s, outQuint), garis ukur tumbuh kiri→kanan. */
export function diukur(ctx, x, y, w, t, t0, who) {
  const k = E.outQuint(inv(t0, t0 + .45, t)); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.translate(-60 * (1 - k), 0);
  ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + 14); ctx.lineTo(x + w * k, y + 14);
  const n = Math.floor(w / 16 * k); for (let i = 0; i <= n; i++) { const xx = x + i * 16; ctx.moveTo(xx, y + 14); ctx.lineTo(xx, y + 14 + (i % 5 ? 7 : 14)); }
  ctx.stroke();
  if (who) { setFont(ctx, MN(15), 4); ctx.fillStyle = ivo(.6); ctx.fillText('DIUKUR: ' + who.toUpperCase(), x, y + 52); }
  ctx.restore();
}
export { IVORY };
