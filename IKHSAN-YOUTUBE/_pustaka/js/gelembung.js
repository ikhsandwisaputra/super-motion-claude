// pustaka · bintang.gelembung — Gelembung Pecah (bintang ai-bubble-dompet, disetujui 14 Nov "gilakkk cakeppp"). Cooldown 2 film:
// di film berikutnya hanya beat kecil atau remix, bukan headline. Salinan dari ai-bubble-dompet kit/gelembung.js; ubahan: import
// '../engine.js' dan opsi o.rgb (warna kulit/spekular, default gading) supaya bisa dipakai di tema terang. Unit lokal (di onPlane
// atau langsung di layar). Engine saja, tanpa kit, supaya intro tanpa kit dan portal.gelembung bisa memakainya.
import { E, inv, spring } from '../engine.js';
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

const SH0 = '241,239,230';
// (ukuran) pengali ukuran gelembung: muncul dengan pegas, merayap naik (creep), tiap pompa [[t, tambah], …] menyentak · asal: ai-bubble-dompet kit/gelembung.js:10 · ledger: gelembung-pecah
export const pumped = (t, t0, pumps = [], creep = .05) => t < t0 ? 0 : .15 + .85 * spring(t - t0, .5, .5) + creep * (t - t0)
  + pumps.reduce((s, [p, d]) => s + d * E.snap(inv(p, p + .26, t)), 0);
// (gerak) amplitudo goyang setelah tiap pompa + getar tegang tr = [t0, t1] sebelum pecah → dipakai sebagai o.wob · asal: ai-bubble-dompet kit/gelembung.js:12 · ledger: gelembung-pecah
export const wobble = (t, pumps = [], tr = null) => pumps.reduce((s, [p]) => t < p ? s : s + .035 * Math.exp(-(t - p) / .25) * Math.sin(2 * Math.PI * (t - p) / .19), 0)
  + (tr && t > tr[0] && t < tr[1] ? .011 * Math.sin(2 * Math.PI * 27 * t) * inv(tr[0], tr[1], t) : 0);

function outline(ctx, cx, cy, r, t, a, floor) {
  const ph = t * 1.7; ctx.beginPath();
  for (let i = 0; i <= 120; i++) {
    const th = i / 120 * Math.PI * 2, rr = r * (1 + a * Math.sin(2 * th + ph) + a * .6 * Math.sin(3 * th - ph * 1.3));
    const x = cx + rr * Math.cos(th); let y = cy + rr * Math.sin(th); if (floor !== undefined && y > floor) y = floor + (y - floor) * .28;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
}

// gelembung kaca: fresnel, film tipis kusam (screen, tidak neon), pantulan jendela, menempel di lantai · opsi wob, ten 0..1 (tegang), floor, film, inner(ctx) isi di balik kulit, seed, rgb · asal: ai-bubble-dompet kit/gelembung.js:25 · ledger: gelembung-pecah
export function bubble(ctx, cx, cy, r, t, o = {}) {
  if (r <= 1) return;
  const a = o.wob || 0, ten = o.ten || 0, fl = o.floor, a0 = ctx.globalAlpha, SH = 'rgba(' + (o.rgb || SH0) + ',';
  ctx.save(); outline(ctx, cx, cy, r, t, a, fl); ctx.clip();
  const gi = ctx.createRadialGradient(cx - .2 * r, cy - .25 * r, 0, cx, cy, r);    // fresnel: clear centre, denser rim
  gi.addColorStop(0, SH + '0)'); gi.addColorStop(.7, SH + '.025)'); gi.addColorStop(.93, SH + '.09)'); gi.addColorStop(1, SH + '.24)');
  ctx.fillStyle = gi; ctx.fillRect(cx - r * 1.2, cy - r * 1.2, r * 2.4, r * 2.4);
  if (o.inner) o.inner(ctx);                                       // content seen through the skin (video, card)
  ctx.globalCompositeOperation = 'screen';                         // thin film: muted, never neon
  const cg = ctx.createConicGradient(t * .9 + (o.seed || 0), cx, cy), fa = (o.film ?? .10) + .22 * ten;
  [['#C9B89A', 0], ['#8FA5A3', .3], ['#A79BB3', .55], ['#B8A88C', .8], ['#C9B89A', 1]].forEach(([c, s]) => cg.addColorStop(s, c));
  ctx.strokeStyle = cg; ctx.lineWidth = r * .035;
  for (let i = 0; i < 5; i++) { ctx.globalAlpha = a0 * fa * (1 - i / 5); const k = .965 - i * .03; outline(ctx, cx, cy, r * k, t, a, fl); ctx.stroke(); }
  ctx.restore(); ctx.save(); ctx.globalAlpha = a0;
  outline(ctx, cx, cy, r, t, a, fl); ctx.strokeStyle = SH + (.5 + .3 * ten) + ')'; ctx.lineWidth = Math.max(1.6, r * .0055); ctx.stroke();
  ctx.lineWidth = Math.max(4, r * .017); ctx.strokeStyle = SH + '.08)'; ctx.stroke();
  const spec = (ang, d, w, h, al) => {                              // window reflections ride the surface
    const x = cx + Math.cos(ang) * r * d, y = cy + Math.sin(ang) * r * d;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang + Math.PI / 2); ctx.scale(1, h / w);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * w); g.addColorStop(0, SH + al + ')'); g.addColorStop(1, SH + '0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r * w, 0, 7); ctx.fill(); ctx.restore();
  };
  spec(-2.3, .74, .26, .07, .55 + .2 * ten); spec(-2.25, .8, .03, .03, .9); spec(.75, .8, .13, .035, .22);
  if (fl !== undefined && cy + r > fl - 4) { ctx.globalAlpha = a0 * .18; ctx.strokeStyle = SH + '1)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(cx, fl + 2, r * .55, r * .03, 0, 0, 7); ctx.stroke(); }
  ctx.restore();
}

// gelembung pecah: kilat 1 frame, sobekan kulit, cincin kejut, ratusan tetes (seret + gravitasi, berhenti di lantai) · s = detik sejak pecah · opsi seed, floor, n=180, flash:false, rgb · asal: ai-bubble-dompet kit/gelembung.js:53 · ledger: gelembung-pecah
export function bubblePop(ctx, cx, cy, r, s, o = {}) {
  if (s < 0 || s > 1.6) return;
  const sd = o.seed || 0, n = o.n || 180, fl = o.floor ?? 1e9, C = 'rgb(' + (o.rgb || SH0) + ')';
  ctx.save(); const a0 = ctx.globalAlpha;
  if (s < .07 && o.flash !== false) { ctx.globalAlpha = a0 * .2 * (1 - s / .07); outline(ctx, cx, cy, r, 0, 0, o.floor); ctx.fillStyle = C; ctx.fill(); }   // 1-frame flash
  if (s < .16) {                                                   // skin shreds tear outward
    const q = E.outCubic(s / .16); ctx.globalAlpha = a0 * .55 * (1 - s / .16); ctx.strokeStyle = C; ctx.lineWidth = Math.max(.5, r * .004 * (1 - q) + .5);
    ctx.beginPath();
    for (let i = 0; i < 26; i++) { const b = i / 26 * Math.PI * 2 + rnd(i + sd) * .1, rr = r * (1 + .5 * q * (.6 + rnd(i + 9 + sd)));
      ctx.moveTo(cx + rr * Math.cos(b), cy + rr * Math.sin(b)); ctx.arc(cx, cy, rr, b, b + .12 + .1 * rnd(i + 3 + sd)); }
    ctx.stroke();
  }
  if (s < .3) { const q = E.outCubic(s / .3); ctx.globalAlpha = a0 * .3 * (1 - s / .3); ctx.lineWidth = Math.max(.5, r * .005 * (1 - q) + .5); ctx.strokeStyle = C;
    ctx.beginPath(); ctx.arc(cx, cy, r * (1 + 1.1 * q), 0, 7); ctx.stroke(); }
  const kd = 4.2, grav = 1.8 * r, sc = Math.max(1, r / 300);       // droplets: drag + gravity, one path per alpha band
  for (let band = 0; band < 3; band++) {
    ctx.globalAlpha = a0 * (.85 - band * .25) * (1 - inv(.35, 1.2, s)); ctx.fillStyle = C; ctx.beginPath();
    for (let i = band; i < n; i += 3) {
      let th = rnd(i + sd) * Math.PI * 2; if (Math.sin(th) > .55) th = -th;
      const v = r * (1.1 + 1.9 * rnd(i + 50 + sd)), d = v / kd * (1 - Math.exp(-kd * s));
      const x = cx + Math.cos(th) * (r + d), y = Math.min(fl, cy + Math.sin(th) * (r + d) + .5 * grav * s * s), rad = sc * (1.4 + 3.6 * rnd(i + 7 + sd)) * (1 - .5 * inv(0, 1.2, s));
      ctx.moveTo(x + rad, y); ctx.arc(x, y, rad, 0, 7);
    }
    ctx.fill();
  }
  ctx.restore();
}
