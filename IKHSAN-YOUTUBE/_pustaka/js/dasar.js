// dasar.js — the small helpers every chapter of the first three films re-wrote: image fit + drop shadow, the Sumur Huruf word
// texture, strikes / ticks / numbered nodes, a paper sheet, handwriting fonts, normal samples, and a procedural dummy photo for demos.
// Pustaka kode Super Motion (aset/_pustaka) · in a chapter: import { cover, letterTex } from './pustaka/dasar.js';
// Already in the kit (import from './kit.js'): DSP SRF MN HND addF still gateStations theme INK CARD …
// Conventions of every pustaka module: station-local units centred on (x, y) · motion as (t, t0) · deterministic (rnd(seed), never
// Math.random) · images come in as parameters · colours default to the kit's theme-aware INK / LIME and are overridable with o.col.
import { clamp, inv, lerp, E, LIME, LIME_INK, INK, setFont, DSP, MONO, rnd, mk } from '../kit.js';
import { pop } from '../draw.js';

// ── images ─────────────────────────────────────────────────────────────────────────────────────────────────
// centre-crop an image into a rect (r = corner radius) · asal: ai-data-habis bab-5/src/film.js:112 (+ ai-bubble-dompet penutup:17)
export function cover(g, im, x, y, w, h, r = 0) {
  const s = Math.max(w / im.width, h / im.height), sw = w / s, sh = h / s;
  g.save(); if (r) { g.beginPath(); g.roundRect(x, y, w, h, r); g.clip(); }
  g.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, x, y, w, h); g.restore();
}
// transparent margin of a cut-out layer (scans the middle row; Ahpo layers come padded) · asal: ai-data-habis bab-5:102
export function padOf(c) {
  const [, g] = mk(c.width, 1); g.drawImage(c, 0, c.height >> 1, c.width, 1, 0, 0, c.width, 1); const d = g.getImageData(0, 0, c.width, 1).data;
  for (let x = 0; x < c.width >> 1; x++) if (d[4 * x + 3] > 200) return x; return 0;
}
// a plain photo on a padded canvas + its soft drop shadow as a separate canvas → [image, shadow] (draw the shadow first, offset it
// with the light) · o.a shadow strength · asal: ai-data-habis bab-5:106
export function shadowed(img, pad, o = {}) {
  const [c, g] = mk(img.width + 2 * pad, img.height + 2 * pad), [s, h] = mk(c.width, c.height);
  h.shadowColor = `rgba(40,25,5,${o.a ?? .45})`; h.shadowBlur = pad * .8; h.shadowOffsetY = pad * .35; h.fillStyle = '#000'; h.fillRect(pad, pad, img.width, img.height);
  h.shadowColor = 'transparent'; h.globalCompositeOperation = 'destination-out'; h.fillRect(pad, pad, img.width, img.height);
  g.drawImage(img, pad, pad); return [c, s];
}

// ── Sumur Huruf: real Indonesian words as a texture (walls, wells, floods of text) ────────────────────────────────
export const KATA = ('kita makan nasi rumah jalan pagi kabar baik terima kasih sudah belum besok ibu bapak sekolah kerja pasar hujan senja lagu cerita ' +
  'tulis baca resep surat doa janji rindu warung kopi gula garam sambal kampung kota anak cucu nenek kakek sawah laut angin pulang').split(' ');
// a square tile (o.size, default 1024) of word rows in `font` at alpha a; o.words swaps the list (English, numbers, code…)
// asal: ai-data-habis bab-1/bab-2/bab-3 (4 copies) · ledger: sumur-huruf
export function letterTex(font, rows, seed, a = .5, o = {}) {
  const S = o.size || 1024, words = o.words || KATA, [c, g] = mk(S, S); g.fillStyle = o.col || `rgba(${o.rgb || '241,239,230'},${a})`;
  setFont(g, font, o.ls ?? 1); g.textBaseline = 'alphabetic';
  for (let r = 0; r < rows; r++) { let s = ''; for (let i = 0; i < 40; i++) s += words[Math.floor(rnd(seed + r * 41 + i * 3.7) * words.length)] + ' ';
    g.fillText(s, -rnd(seed + r) * 260, (r + 1) * S / rows - 8); }
  return c;
}
// tile a texture over a rect, scrolling vertically by `scroll` px (wraps) · asal: ai-data-habis bab-2:23
export function tileTex(ctx, tex, x, y, w, h, scroll = 0) {
  const S = tex.height, oy = ((scroll % S) + S) % S;
  for (let yy = y - oy; yy < y + h; yy += S) for (let xx = x; xx < x + w; xx += tex.width) ctx.drawImage(tex, xx, yy);
}

// ── marks ──────────────────────────────────────────────────────────────────────────────────────────────────
// a strike drawn through a line of text (x0 → x1 at baseline y; size = font size), snaps across in .28 s · asal: ai-data-habis bab-3:38
export function strike(ctx, x0, x1, y, size, t, t0, col = INK) {
  const k = E.snap(inv(t0, t0 + .28, t)); if (k <= 0) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, size * .07); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0 - 12, y - size * .3); ctx.lineTo(lerp(x0 - 12, x1 + 12, k), y - size * .3 - 6 * k); ctx.stroke(); ctx.restore();
}
// lime numbered disc that springs in (steps, ranks, list numbers) · o.fill o.ink o.ring · asal: ai-data-habis bab-3:42
export function node(ctx, x, y, n, t, t0, r = 54, o = {}) {
  const k = pop(t, t0, .45, .25); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.12, k), Math.min(1.12, k));
  ctx.fillStyle = o.fill || LIME; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); if (o.ring !== false) { ctx.strokeStyle = o.ring || INK; ctx.lineWidth = 3; ctx.stroke(); }
  setFont(ctx, DSP(r * 1.5), 0); ctx.fillStyle = o.ink || LIME_INK; ctx.textAlign = 'center'; ctx.fillText(String(n), 0, r * .52); ctx.textAlign = 'left'; ctx.restore();
}
// lime disc with a check mark drawn on (verdict "ya / lolos / benar") · asal: ai-data-habis bab-3:47 (+ puncak:67)
export function check(ctx, x, y, r, t, t0, o = {}) {
  const k = pop(t, t0, .45, .25); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
  ctx.fillStyle = o.fill || LIME; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = o.ink || LIME_INK; ctx.lineWidth = r * .16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const d = E.outCubic(inv(t0 + .08, t0 + .35, t)); ctx.beginPath(); ctx.moveTo(-r * .42, 0); ctx.lineTo(-r * .1, r * .32 * Math.min(1, d * 2));
  if (d > .5) ctx.lineTo(lerp(-r * .1, r * .45, (d - .5) * 2), lerp(r * .32, -r * .35, (d - .5) * 2)); ctx.stroke(); ctx.restore();
}
// the same disc with a cross drawn on (verdict "tidak / gagal / salah"), ink disc by default so lime stays the one accent
export function cross(ctx, x, y, r, t, t0, o = {}) {
  const k = pop(t, t0, .45, .25); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
  ctx.fillStyle = o.fill || INK; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = o.ink || '#C9472F'; ctx.lineWidth = r * .16; ctx.lineCap = 'round';
  const d = E.outCubic(inv(t0 + .08, t0 + .35, t)), a = r * .36, d1 = Math.min(1, d * 2), d2 = clamp(d * 2 - 1);
  ctx.beginPath(); ctx.moveTo(-a, -a); ctx.lineTo(lerp(-a, a, d1), lerp(-a, a, d1)); if (d2 > 0) { ctx.moveTo(a, -a); ctx.lineTo(lerp(a, -a, d2), lerp(-a, a, d2)); } ctx.stroke(); ctx.restore();
}
export const PAPER = '#F7F5EE';
// ivory sheet with a soft shadow and an ink outline, centred on 0,0 (translate first) · o.fill o.line · asal: ai-data-habis bab-3:53
export function paper(ctx, w, h, r = 10, o = {}) {
  ctx.save(); ctx.shadowColor = o.shadow || 'rgba(21,22,15,.22)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = o.fill || PAPER;
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, r); ctx.fill(); ctx.restore();
  if (o.line !== false) { ctx.strokeStyle = o.line || INK; ctx.lineWidth = 3; ctx.stroke(); }
}

// ── fonts / numbers ────────────────────────────────────────────────────────────────────────────────────────
// handwriting faces (OFL, in the template's fonts/): Caveat (HND) + Reenie Beanie (signatures) — call once in a chapter's load()
export async function loadTangan(base = '../fonts/') {
  const F = [new FontFace('Caveat', `url(${base}Caveat.ttf)`, { weight: '400 700' }), new FontFace('Reenie Beanie', `url(${base}ReenieBeanie.ttf)`)];
  for (const f of F) { await f.load(); document.fonts.add(f); }
}
// deterministic normal sample (seed i) and the bell curve · asal: ai-data-habis bab-4/src/ui.js:8
export const zs = i => { const u = Math.max(1e-6, rnd(i * 2 + 1)), v = rnd(i * 2 + 2); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2832 * v); };
export const gpdf = z => Math.exp(-z * z / 2);

// ── demo only (galeri, 3-s tests): never ship it in a film ───────────────────────────────────────────────────
// a procedural "documentary photo" (sky, sun, three hills, grain) with a FOTO CONTOH stamp, so demos never need client or stock files
export function dummyFoto(w = 1200, h = 800, seed = 1, o = {}) {
  const [c, g] = mk(w, h), P = [['#C9B79C', '#6E7F86'], ['#D8CBB0', '#8A6F5A'], ['#B8C4BB', '#4E5D63'], ['#E0C9A6', '#7A5C48']][Math.floor(rnd(seed) * 4)];
  const sky = g.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, P[0]); sky.addColorStop(1, P[1]); g.fillStyle = sky; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(255,248,230,.55)'; g.beginPath(); g.arc(w * (.2 + .6 * rnd(seed + 1)), h * .3, h * .09, 0, 7); g.fill();
  for (let k = 0; k < 3; k++) {
    g.fillStyle = `rgba(20,22,18,${.18 + k * .22})`; g.beginPath(); g.moveTo(0, h);
    for (let x = 0; x <= w + 1; x += w / 48) g.lineTo(x, h * (.55 + k * .12) + Math.sin(x / w * (3 + k * 2) * Math.PI + seed * 1.7 + k) * h * .05 * (1 + rnd(seed + k)));
    g.lineTo(w, h); g.closePath(); g.fill();
  }
  if (o.subject !== false) { g.fillStyle = 'rgba(17,18,14,.78)'; const sx = w * (.3 + .4 * rnd(seed + 7)), sh = h * .34;   // a person standing on the near hill
    g.beginPath(); g.arc(sx, h * .72 - sh, sh * .13, 0, 7); g.fill(); g.beginPath(); g.roundRect(sx - sh * .16, h * .72 - sh * .84, sh * .32, sh * .84, sh * .1); g.fill(); }
  g.fillStyle = 'rgba(255,255,255,.07)';
  for (let i = 0; i < 2600; i++) g.fillRect(rnd(seed * 31 + i) * w, rnd(seed * 17 + i * 1.3) * h, 2, 2);
  if (o.label !== false) { g.font = `700 ${Math.round(h * .034)}px "${MONO}"`; g.fillStyle = 'rgba(255,255,255,.8)'; g.fillText(o.label || 'FOTO CONTOH', h * .04, h * .95); }
  return c;
}
