// tipo.js — type that moves: glyphs stroked on then flooded with ink, numerals cut from the Sumur Huruf texture (and shattered),
// tracking that collapses, a word whose letters each keep their own voice, a hand-drawn swoosh, ghost answers typed into a blank,
// a rolling word slot, label rolls, a magnifier that audits a quote, words that fly in out of focus, letters punched in over their
// outline, and a line revealed word by word with the narrator.
// Pustaka kode Super Motion (aset/_pustaka) · in a chapter: import { drawOn, angkaHuruf } from './pustaka/tipo.js';
// Already in the kit (import from './kit.js'): fall (letters drop in) · typeOn · markLine · slab · txt · srcTag · countTo; draw.js: stamp · slot.
// Conventions: station-local units · motion as (t, t0) · deterministic (rnd, never Math.random) · respects the incoming globalAlpha ·
// colours from the kit theme (INK / ivo / LIME as the one accent), each overridable with o.col.
import { clamp, inv, lerp, E, INK, LIME, BGRGB, LIGHT, ivo, setFont, addF, DSP, SRF, MN, rnd, mk } from '../kit.js';
import { pop } from '../draw.js';
import { letterTex, tileTex } from './dasar.js';

const sz = css => parseFloat(/(\d+(\.\d+)?)px/.exec(css)[1]);
const left = (x, w, align) => align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
const TXC = new Map();                                     // letter textures + scratch canvases, keyed by string
function texOf(key, font, rows, seed, a) {                 // cached only once its font has really loaded (else a fallback face sticks)
  let c = TXC.get(key); if (c) return c; c = letterTex(font, rows, seed, a); if (document.fonts.check(font)) TXC.set(key, c); return c;
}
function scratch(w, h) { const k = `tt:${w}x${h}`; let v = TXC.get(k); if (!v) TXC.set(k, v = mk(w, h)); return v; }

// glyph outlines stroke on (every contour at once), then ink floods up from the baseline in a soft wave · o.dur .9 · o.fillAt .55 (share of dur) · o.fill .55 · o.lw · o.len 3.4 · o.align 'center' · o.col · asal: ai-data-habis bab-3/src/film.js:22
export function drawOn(ctx, str, x, y, t, t0, css, o = {}) {
  const s = t - t0; if (s <= 0) return 0; const dur = o.dur ?? .9, size = sz(css), col = o.col || INK;
  setFont(ctx, css, o.ls ?? 2); const tw = ctx.measureText(str).width, xa = left(x, tw, o.align || 'center');
  const f0 = t0 + dur * (o.fillAt ?? .55), f = E.outCubic(inv(f0, f0 + (o.fill ?? .55), t)), k = E.inOutCubic(clamp(s / dur));
  ctx.save(); ctx.textAlign = 'left';
  if (f < 1) { ctx.strokeStyle = col; ctx.lineWidth = o.lw ?? Math.max(2, size * .02); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.setLineDash([k * size * (o.len ?? 3.4), 1e5]); ctx.strokeText(str, xa, y); ctx.setLineDash([]); }
  if (f > 0) {
    const top = y + size * .1 - size * .92 * f, amp = size * .05 * (1 - f), N = 40;
    ctx.beginPath(); ctx.moveTo(xa - 20, y + size * .35);
    for (let i = 0; i <= N; i++) ctx.lineTo(xa - 20 + (tw + 40) * i / N, top + Math.sin(i * .85 + s * 10) * amp);
    ctx.lineTo(xa + tw + 20, y + size * .35); ctx.closePath(); ctx.clip(); ctx.fillStyle = col; ctx.fillText(str, xa, y);
  }
  ctx.restore(); return tw;
}

function isiHuruf(str, size, ts, o) {                      // Sumur Huruf texture masked by the glyphs of str → cached scratch canvas
  const ls = o.ls ?? 6, font = DSP(size), [, mg] = scratch(4, 4); setFont(mg, font, ls);
  const w = Math.ceil(mg.measureText(str).width + size * .3), h = Math.ceil(size * 1.05), [c, g] = scratch(w, h);
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'copy'; g.fillStyle = o.dasar || '#0E0F0B'; g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = 'source-over'; const [ta, tb] = o.tex || [texOf('ser', SRF(30), 26, 11, .7), texOf('mono', MN(19, 400), 36, 3, .5)];
  tileTex(g, ta, 0, 0, w, h, ts * (o.v1 ?? 26)); if (tb) tileTex(g, tb, 0, 0, w, h, -ts * (o.v2 ?? 12));
  g.globalCompositeOperation = 'destination-in'; setFont(g, font, ls); g.textAlign = 'center'; g.fillText(str, w / 2, h / 2 + size * .36);
  g.globalCompositeOperation = 'source-over'; g.textAlign = 'left'; return c;
}
// a numeral (or short word) cut from the scrolling Sumur Huruf letter texture with an ink outline, landing from 1.5× · centred on (x, y) · o.pecah = time it shatters into 14×6 shards under gravity · o.tex [a, b] · o.dasar · o.garis · o.dari 1.5 · asal: ai-data-habis bab-2/src/film.js:92 (+:86 numTex, :97 shatter)
export function angkaHuruf(ctx, str, x, y, size, t, t0, o = {}) {
  const s = t - t0; if (s <= 0) return; const a0 = ctx.globalAlpha;
  if (o.pecah !== undefined && t >= o.pecah) {
    const u = t - o.pecah; if (u > 1.1) return; const c = isiHuruf(str, size, o.pecah, o), W = c.width, H = c.height, cw = W / 14, ch = H / 6, q = size / 520;
    for (let j = 0; j < 6; j++) for (let i = 0; i < 14; i++) {
      const cx = -W / 2 + cw * (i + .5), cy = -H / 2 + ch * (j + .5), id = i + j * 14, d = Math.hypot(cx, cy) + 1, sp = (520 + 520 * rnd(id + 5)) * q;
      const px = cx + cx / d * sp * u, py = cy + (cy / d * sp - 380 * q) * u + 1500 * q * u * u;
      ctx.save(); ctx.translate(x + px, y + py); ctx.rotate((rnd(id + 9) - .5) * 7 * u); ctx.globalAlpha = a0 * clamp(1 - u);
      ctx.drawImage(c, cw * i, ch * j, cw, ch, -cw / 2, -ch / 2, cw, ch); ctx.restore();
    }
    return;
  }
  const k = E.outQuint(clamp(s / .28)), sc = lerp(o.dari ?? 1.5, 1, k), c = isiHuruf(str, size, t, o);
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a0 * clamp(s / .08); ctx.drawImage(c, -c.width / 2, -c.height / 2);
  setFont(ctx, DSP(size), o.ls ?? 6); ctx.textAlign = 'center'; ctx.strokeStyle = o.garis || ivo(.85); ctx.lineWidth = o.lw ?? 3; ctx.strokeText(str, 0, size * .36);
  ctx.textAlign = 'left'; ctx.restore();
}

// tracking collapses from wide to tight as the word lands (rare = far apart, then together) · o.dari 90 · o.ke 34 (letter-spacing px) · o.dur .56 · o.rise 40 · o.align 'center' · o.col · asal: ai-data-habis penutup/src/film.js:128
export function rapat(ctx, str, x, y, t, t0, css, o = {}) {
  const k = E.outQuint(inv(t0, t0 + (o.dur ?? .56), t)); if (k <= 0) return 0; const a0 = ctx.globalAlpha, ls = lerp(o.dari ?? 90, o.ke ?? 34, k), al = o.align || 'center';
  setFont(ctx, css, ls); ctx.textAlign = al; ctx.fillStyle = o.col || INK; ctx.globalAlpha = a0 * clamp(k * 2);
  ctx.fillText(str, x + (al === 'center' ? ls / 2 : al === 'right' ? ls : 0), y + (1 - k) * (o.rise ?? 40));      // trailing spacing compensated
  const w = ctx.measureText(str).width; ctx.textAlign = 'left'; ctx.globalAlpha = a0; return w;
}

const CAMPUR = [[SRF, 1.05], [DSP, 1], [s => MN(s, 700), .77]];
// one word whose letters each keep their own family, size and bob (a human voice against a machine unison); letters spring up in turn · o.fonts [[fontFn, scale]…] cycled (default serif / League Gothic / mono) · o.stag .05 · o.bob 8 · o.rise 70 · o.align 'center' · asal: ai-data-habis penutup/src/film.js:132 (+:88)
export function hurufCampur(ctx, str, x, y, size, t, t0, o = {}) {
  if (t <= t0) return 0; const a0 = ctx.globalAlpha, F = o.fonts || CAMPUR, gap = size * .035, xs = []; let w = 0;
  for (let i = 0; i < str.length; i++) { const [f, m] = F[i % F.length]; setFont(ctx, f(size * m)); xs.push(w); w += ctx.measureText(str[i]).width + gap; }
  w -= gap; const xa = left(x, w, o.align || 'center'); ctx.textAlign = 'left';
  for (let i = 0; i < str.length; i++) {
    const t1 = t0 + i * (o.stag ?? .05), k = pop(t, t1, .5, .3); if (k <= 0 || str[i] === ' ') continue;
    const [f, m] = F[i % F.length], yb = (o.bob ?? 8) * Math.sin((t - t0) * 2 * Math.PI * (.6 + rnd(i + 3) * 1.3) + i * 1.7);
    ctx.save(); ctx.globalAlpha = a0 * clamp((t - t1) / .08); ctx.translate(xa + xs[i], y + yb + (1 - k) * (o.rise ?? 70));
    setFont(ctx, f(size * m)); ctx.fillStyle = o.col || INK; ctx.fillText(str[i], 0, 0); ctx.restore();
  }
  return w;
}

// hand-drawn swoosh under a word: one quadratic stroke drawn on, sagging in the middle like a smile · from (x0, y) to (x1, y + o.ujung) · o.sag 70 · o.ujung −8 · o.lw 9 · o.dur .45 · o.col · asal: ai-data-habis penutup/src/film.js:112
export function garisTangan(ctx, x0, x1, y, t, t0, o = {}) {
  const k = E.outCubic(inv(t0, t0 + (o.dur ?? .45), t)); if (k <= 0) return; const sag = o.sag ?? 70, y1 = y + (o.ujung ?? -8), xm = (x0 + x1) / 2;
  let L = 0, px = x0, py = y; for (let i = 1; i <= 16; i++) { const u = i / 16, qx = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * xm + u * u * x1,
    qy = (1 - u) * (1 - u) * y + 2 * u * (1 - u) * (y + sag) + u * u * y1; L += Math.hypot(qx - px, qy - py); px = qx; py = qy; }
  ctx.save(); ctx.strokeStyle = o.col || INK; ctx.lineWidth = o.lw ?? 9; ctx.lineCap = 'round'; ctx.setLineDash([L * k + .01, L + 10]);
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.quadraticCurveTo(xm, y + sag, x1, y1); ctx.stroke(); ctx.restore();
}

// ghost answers type into a blank, hold, erase, next (the viewer's possible answers) with a blinking lime caret; returns the caret x · o.P 1.2 (cycle) · o.ketik .55 · o.tahan .4 · o.hapus .25 · o.jeda .3 · o.garis (blank underline width, grows) · o.col ivo(.34) · o.caret · asal: teknologi-indo-vs-as penutup/src/film.js:114 · ledger: caret-decode-type
export function ketikSiklus(ctx, list, x, y, t, t0, css, o = {}) {
  if (t <= t0) return x; const size = sz(css);
  if (o.garis) { const kl = E.outQuint(inv(t0, t0 + .7, t)); ctx.fillStyle = ivo(.55); ctx.fillRect(x - 8, y + size * .35, o.garis * kl, 4); }
  const P = o.P ?? 1.2, tk = o.ketik ?? .55, th = o.tahan ?? .4, tH = o.hapus ?? .25, u = t - t0 - (o.jeda ?? .3); let cx = x, typing = false;
  if (u > 0) {
    const w = list[Math.floor(u / P) % list.length], s = u % P;
    const n = s < tk ? Math.ceil(w.length * s / tk) : s < tk + th ? w.length : Math.ceil(w.length * (1 - (s - tk - th) / tH)); typing = s < tk;
    setFont(ctx, css); ctx.textAlign = 'left'; ctx.fillStyle = o.col || ivo(.34); const str = w.slice(0, Math.max(0, n)); ctx.fillText(str, x, y);
    cx = x + ctx.measureText(str).width + size * .1;
  }
  if (typing || Math.floor((t - t0) * 2.4) % 2 === 0) { ctx.fillStyle = o.caret || LIME; ctx.fillRect(cx, y - size, Math.max(3, size * .076), size * 1.15); }
  return cx;
}

// a lime blank inside a sentence where candidate words roll through a clipped slot (hold, snap, next); o.henti = time it settles on o.akhir · x = slot left, y = baseline · o.w 250 · o.laju 3.2 words/s · o.col ivo(.62) · asal: ai-data-habis penutup/src/film.js:172 · ledger: word-slot-roll
export function slotKata(ctx, words, x, y, t, t0, css, o = {}) {
  const kB = E.outQuint(inv(t0, t0 + .35, t)); if (kB <= 0) return x; const size = sz(css), BW = o.w ?? 250, d = size * 1.27, rate = o.laju ?? 3.2, a0 = ctx.globalAlpha;
  ctx.fillStyle = o.lime || LIME; ctx.fillRect(x, y + size * .27, BW * kB, Math.max(3, size * .09));
  const v = Math.max(0, Math.min(t, o.henti ?? Infinity) - t0 - .15) * rate, n = Math.floor(v), tx = x + size * .32;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y - size * 1.14, BW, size * 1.45); ctx.clip(); setFont(ctx, css); ctx.textAlign = 'left';
  if (o.henti === undefined || t < o.henti) {
    const f = E.snap(clamp((v - n) * 2.4)); ctx.fillStyle = o.col || ivo(.62);
    ctx.fillText(words[n % words.length], tx, y - d * f); ctx.fillText(words[(n + 1) % words.length], tx, y + d * (1 - f));
  } else {
    const k = E.outQuint(inv(o.henti, o.henti + .35, t)); ctx.fillStyle = o.col || ivo(.62); ctx.globalAlpha = a0 * (1 - k); ctx.fillText(words[n % words.length], tx, y - d * k);
    ctx.globalAlpha = a0; ctx.fillStyle = o.colAkhir || INK; ctx.fillText(o.akhir ?? words[words.length - 1], tx, y + d * (1 - k));
  }
  ctx.restore(); return x + BW;
}

// a label rolls from a to b: the old text slides up and fades while the new one rises in (status, time, title changes) · font = css · o.dur .3 · o.d (travel, .8 × size) · o.align · o.ls · o.klip true (clip to the line) · o.col · asal: ai-data-habis penutup/src/film.js:238
export function gantiKata(ctx, a, b, x, y, t, t0, css, o = {}) {
  const k = E.outQuint(inv(t0, t0 + (o.dur ?? .3), t)), size = sz(css), d = o.d ?? size * .8, a0 = ctx.globalAlpha;
  ctx.save(); setFont(ctx, css, o.ls || 0); ctx.textAlign = o.align || 'left'; ctx.fillStyle = o.col || INK;
  if (o.klip !== false) { ctx.beginPath(); ctx.rect(x - 4000, y - size * 1.05, 8000, size * 1.4); ctx.clip(); }
  if (k < 1) { ctx.globalAlpha = a0 * (1 - k); ctx.fillText(a, x, y - d * k); }
  if (k > 0) { ctx.globalAlpha = a0 * k; ctx.fillText(b, x, y + d * (1 - k)); }
  ctx.restore();
}

// a magnifier sweeps across content drawn by isi(ctx) and enlarges what lies under it (auditing a claim); draw the content yourself first · x, y = centre of the sweep · o.R 150 · o.zoom 1.55 · o.lebar 960 (span) · o.ayun 70 · o.dur 2 · o.akhir (time it leaves) · o.kaca · o.col · asal: teknologi-indo-vs-as bab-peta/src/film.js:240 · ledger: lens-sweep-audit
export function lensa(ctx, x, y, t, t0, isi, o = {}) {
  const dur = o.dur ?? 2, end = o.akhir ?? t0 + dur, kl = inv(t0, t0 + dur, t); if (kl <= 0 || t > end + .3) return;
  const la = E.outCubic(inv(t0, t0 + .3, t)) * (1 - inv(end, end + .3, t)), a0 = ctx.globalAlpha, half = (o.lebar ?? 960) / 2, R = o.R ?? 150, Z = o.zoom ?? 1.55;
  const lx = x + lerp(-half, half, E.inOutSine(kl)) + 40 * Math.sin(kl * 19), ly = y + (o.ayun ?? 70) * Math.sin(kl * 7.3);
  ctx.save(); ctx.globalAlpha = a0 * la; ctx.beginPath(); ctx.arc(lx, ly, R, 0, 7); ctx.clip();
  ctx.fillStyle = o.kaca || (LIGHT ? `rgba(${BGRGB},.92)` : 'rgba(30,31,26,.78)'); ctx.fillRect(lx - R, ly - R, 2 * R, 2 * R);
  ctx.translate(lx, ly); ctx.scale(Z, Z); ctx.translate(-lx, -ly); isi(ctx); ctx.restore();
  ctx.save(); ctx.globalAlpha = a0 * la; ctx.strokeStyle = o.col || INK; ctx.lineWidth = R * .107; ctx.beginPath(); ctx.arc(lx, ly, R, 0, 7); ctx.stroke();
  ctx.lineWidth = R * .2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx + R * .74, ly + R * .74); ctx.lineTo(lx + R * 1.6, ly + R * 1.6); ctx.stroke();
  const gl = ctx.createLinearGradient(lx - R, ly - R, lx + R, ly + R); gl.addColorStop(0, 'rgba(255,255,255,.16)'); gl.addColorStop(.5, 'rgba(255,255,255,0)');
  ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(lx, ly, R - 8, 0, 7); ctx.fill(); ctx.restore();
}

// a big serif quote whose words rise in one by one, block centred on (x, y); optional dim and a slanted strike through the block · lines ['“Indonesia tertinggal', 'sekian puluh tahun.”'] · o.size 150 · o.lead 180 · o.step .22 · o.redup (time) · o.coret (time) · o.col · o.colCoret · asal: teknologi-indo-vs-as bab-peta/src/film.js:234
export function kutipan(ctx, lines, x, y, t, t0, o = {}) {
  if (t <= t0 - .1) return; const size = o.size ?? 150, lead = o.lead ?? 180, a0 = ctx.globalAlpha; setFont(ctx, SRF(size)); ctx.textAlign = 'left';
  const ws = lines.map(l => ctx.measureText(l).width), mw = Math.max(...ws), xl = x - mw / 2, y0 = y - (lines.length - 1) * lead / 2 + size * .3;
  const dim = o.redup !== undefined ? 1 - .62 * E.outCubic(inv(o.redup, o.redup + .5, t)) : 1; let n = 0; ctx.fillStyle = o.col || INK;
  lines.forEach((l, j) => { let cx = xl; for (const wd of l.split(' ')) { const ti = t0 + n++ * (o.step ?? .22), k = E.outQuint(inv(ti - .08, ti + .35, t)), ww = ctx.measureText(wd + ' ').width;
    if (k > 0) { ctx.globalAlpha = a0 * k * dim; ctx.fillText(wd, cx, y0 + j * lead + (1 - k) * 50); } cx += ww; } });
  ctx.globalAlpha = a0;
  if (o.coret !== undefined) { const ks = E.brake(inv(o.coret, o.coret + .45, t)); if (ks > 0) { ctx.save(); ctx.fillStyle = o.colCoret || INK;
    ctx.translate(xl - 30, (y0 + y0 + (lines.length - 1) * lead) / 2 + size * .24); ctx.rotate(-.05); ctx.fillRect(0, -size * .053, (mw + 100) * ks, size * .107); ctx.restore(); } }
}

// a whole word arrives from one side out of focus: 2.7× and blurred, settling sharp in .42 s (hook words) · o.sisi 1 (from the right; −1 left) · o.jarak 640 · o.skala 2.7 · o.blur 34 · o.dur .42 · o.align · o.col · asal: ai-data-habis intro/src/film.js:50 (same helper in every intro)
export function terbang(ctx, str, x, y, t, t0, css, o = {}) {
  const s = t - t0; if (s <= 0) return 0; setFont(ctx, css, o.ls || 0); const w = ctx.measureText(str).width, cap = ctx.measureText('H').actualBoundingBoxAscent;
  const k = E.outQuart(clamp(s / (o.dur ?? .42))), sc = lerp(o.skala ?? 2.7, 1, k), xa = left(x, w, o.align);
  ctx.save(); ctx.translate(xa + w / 2 + (o.sisi ?? 1) * (1 - k) * (o.jarak ?? 640), y - cap / 2); ctx.scale(sc, sc); ctx.globalAlpha *= inv(0, .06, s);
  const b = (1 - k) * (o.blur ?? 34); if (b > .7) addF(ctx, `blur(${b.toFixed(1)}px)`);
  ctx.textAlign = 'left'; ctx.fillStyle = o.col || INK; ctx.fillText(str, -w / 2, cap / 2); ctx.restore(); return w;
}

// the outline of a word wipes in, then each letter is punched in (2.2× → 1) as it is spoken · o.step .07 per letter after o.tunda .35 (or o.mulai = [time per letter]) · o.hantu (outline colour) · o.lw 2.5 · o.align · o.col · asal: ai-data-habis intro/src/film.js:39 (+:57 ghost)
export function ejaan(ctx, str, x, y, t, t0, css, o = {}) {
  if (t <= t0) return 0; const a0 = ctx.globalAlpha; setFont(ctx, css, o.ls || 0); ctx.textAlign = 'left';
  const w = ctx.measureText(str).width, cap = ctx.measureText('H').actualBoundingBoxAscent, xa = left(x, w, o.align);
  const xs = Array.from(str, (_, i) => ctx.measureText(str.slice(0, i)).width), cw = Array.from(str, ch => ctx.measureText(ch).width);
  const st = i => o.mulai ? o.mulai[i] : t0 + (o.tunda ?? .35) + i * (o.step ?? .07), kg = E.outCubic(inv(t0, t0 + .35, t));
  if (kg > 0) { ctx.save(); ctx.beginPath(); ctx.rect(xa - 12, y - cap - 24, (w + 24) * kg, cap + 48); ctx.clip(); ctx.lineWidth = o.lw ?? 2.5; ctx.strokeStyle = o.hantu || ivo(.5);
    for (let i = 0; i < str.length; i++) if (str[i] !== ' ' && t < st(i)) ctx.strokeText(str[i], xa + xs[i], y); ctx.restore(); }
  ctx.fillStyle = o.col || INK;
  for (let i = 0; i < str.length; i++) { const si = t - st(i); if (si <= 0 || str[i] === ' ') continue; const kk = E.expo16(clamp(si / .2)), sc = lerp(2.2, 1, kk);
    ctx.save(); ctx.translate(xa + xs[i] + cw[i] / 2, y - cap / 2 + (1 - kk) * 60); ctx.scale(sc, sc); ctx.globalAlpha = a0 * inv(0, .04, si); ctx.fillText(str[i], -cw[i] / 2, cap / 2); ctx.restore(); }
  return w;
}

// a line revealed word by word in step with the narrator (a clip that grows per word); o.hantu shows the whole line faintly first · words ['Kalau', 'tulisan', …] · o.mulai [time per word] or o.step .3 from t0 · o.align · o.col · asal: ai-data-habis intro/src/film.js:69 (wipeWords)
export function ucap(ctx, words, x, y, t, t0, css, o = {}) {
  setFont(ctx, css, o.ls || 0); ctx.textAlign = 'left'; const size = sz(css), str = words.join(' '), full = ctx.measureText(str).width, xa = left(x, full, o.align), a0 = ctx.globalAlpha;
  const st = j => o.mulai ? o.mulai[j] : t0 + j * (o.step ?? .3); let acc = 0, rev = 0;
  words.forEach((_, j) => { const end = ctx.measureText(words.slice(0, j + 1).join(' ')).width; rev += (end - acc) * E.outCubic(inv(st(j), st(j) + .2, t)); acc = end; });
  ctx.fillStyle = o.col || INK;
  if (o.hantu && t > st(0) - .4) { ctx.globalAlpha = a0 * o.hantu * E.outCubic(inv(st(0) - .4, st(0), t)); ctx.fillText(str, xa, y); ctx.globalAlpha = a0; }
  if (rev <= 0) return full;
  ctx.save(); ctx.beginPath(); ctx.rect(xa - 20, y - size * 1.15, rev + 24, size * 1.7); ctx.clip(); ctx.fillText(str, xa, y); ctx.restore(); return full;
}
