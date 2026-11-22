// pustaka · bintang.salinan — Salinan Pudar (bintang ai-data-habis bab-4, ledger salinan-pudar-generasi). Cooldown 2 film: di film
// berikutnya hanya beat kecil atau remix (pudar), bukan headline. Tiap salinan benar-benar dihitung dari salinan sebelumnya (blur, kurva
// toner, abu, bintik toner, bayangan tutup mesin), jadi tanda tipis hilang lebih dulu dan tinta menggembung. Koreografi tiga jendela film
// (tumpukan kaca Jarak = Generasi, kartu ASLI dibuang, salinan pulih) tetap di film: makeCopier, ai-data-habis bab-4/src/copier.js:122.
// Font tangan: await loadTangan() (dasar.js) sebelum card / kartu.
import { clamp, lerp, LIME, LIME_INK, ivo, setFont, MN, rnd, mk } from '../kit.js';

export const HAND = 'Caveat', SIGF = 'Reenie Beanie';
export const DW = 1400, DH = 950;                                      // card px = world units
export const SIG = { x: 930, y: 735, w: 400, h: 170 };                 // where the signature sits on the card (for a lime ghost, a crop)

// kertas kartu indeks: krem hangat + serat halus (kanvas w×h) · asal: ai-data-habis bab-4/src/copier.js:17 · ledger: salinan-pudar-generasi
export function kertasKartu(c, w, h, seed = 0) {
  c.fillStyle = '#ECE4D0'; c.fillRect(0, 0, w, h);
  const n = Math.round(2600 * w * h / (DW * DH));
  for (let i = 0; i < n; i++) { c.fillStyle = `rgba(120,96,60,${.025 + .03 * rnd(i + 7 + seed)})`; c.fillRect(rnd(i + seed) * w, rnd(i + 3 + seed) * h, 1 + 2 * rnd(i + 5), 1); }
}
// kartu ASLI di kanvas DW×DH: kartu indeks bergaris, judul + dua kolom tulisan tangan, noda cangkir, catatan pensil, tanda tangan biru · o: judul, bahan[], cara[] (baris pertama = kepala kolom), catatan, nama, tinta='#1C2640', seed · asal: ai-data-habis bab-4/src/copier.js:21 · ledger: salinan-pudar-generasi
export function card(c, o = {}) {
  kertasKartu(c, DW, DH, o.seed || 0);
  c.strokeStyle = 'rgba(120,150,190,.55)'; c.lineWidth = 2;
  for (let y = 190; y < DH - 40; y += 62) { c.beginPath(); c.moveTo(40, y); c.lineTo(DW - 40, y); c.stroke(); }
  c.strokeStyle = 'rgba(200,110,100,.6)'; c.beginPath(); c.moveTo(96, 30); c.lineTo(96, DH - 30); c.stroke();
  const ring = c.createRadialGradient(1190, 230, 70, 1190, 230, 112);
  ring.addColorStop(0, 'rgba(160,120,70,0)'); ring.addColorStop(.55, 'rgba(160,120,70,.16)'); ring.addColorStop(.7, 'rgba(160,120,70,.05)'); ring.addColorStop(1, 'rgba(160,120,70,0)');
  c.fillStyle = ring; c.fillRect(1060, 100, 260, 260);
  c.fillStyle = o.tinta ?? '#1C2640'; c.textAlign = 'left';
  c.font = `700 84px "${HAND}"`; c.save(); c.translate(130, 128); c.rotate(-.012); c.fillText(o.judul ?? 'Resep Kue Lumpur', 0, 0); c.restore();
  c.font = `600 50px "${HAND}"`;
  (o.bahan ?? ['Bahan:', '– 250 gr kentang kukus', '– 3 butir telur', '– 400 ml santan', '– 150 gr gula pasir', '– 125 gr terigu', '– sejumput garam'])
    .forEach((s, i) => { c.save(); c.translate(130 + (i ? 14 : 0), 236 + i * 62); c.rotate((rnd(i + 40) - .5) * .014); c.fillText(s, 0, 0); c.restore(); });
  (o.cara ?? ['Cara:', 'kocok telur + gula', 'sampai kental, masuk', 'kentang & santan', 'sedikit-sedikit.'])
    .forEach((s, i) => { c.save(); c.translate(720, 236 + i * 62); c.rotate((rnd(i + 60) - .5) * .014); c.fillText(s, 0, 0); c.restore(); });
  c.fillStyle = 'rgba(70,70,74,.42)'; c.font = `500 40px "${HAND}"`;
  c.save(); c.translate(140, 700); c.rotate(-.03); c.fillText(o.catatan ?? '*jangan dibuka sebelum 15 menit!', 0, 0); c.restore();
  sign(c, 'rgba(70,100,175,.62)', o);
}
// (kanvas) kartu ASLI siap pakai: mk(DW, DH) + card(o) · asal: ai-data-habis bab-4/src/copier.js:21 · ledger: salinan-pudar-generasi
export function kartu(o = {}) { const [C, c] = mk(DW, DH); card(c, o); return C; }
// tanda tangan bolpoin biru + coretan, tipis dan ringan (di SIG) — warna lime di kanvas kosong = hantu tanda tangan yang hilang · o: nama='Mbah Sum' · asal: ai-data-habis bab-4/src/copier.js:41 · ledger: salinan-pudar-generasi
export function sign(c, col, o = {}) {
  c.save(); c.translate(SIG.x + 30, SIG.y + 105); c.rotate(-.08);
  c.fillStyle = col; c.strokeStyle = col; c.font = `400 104px "${SIGF}"`; c.textAlign = 'left'; c.fillText(o.nama ?? 'Mbah Sum', 0, 0);
  c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(-10, 22); c.bezierCurveTo(90, 52, 230, -6, 340, 30); c.stroke();
  c.restore();
}
// satu kali lewat mesin fotokopi, kanvas ukuran apa pun → kanvas baru generasi g · o: bs skala blur, seed, smear [x, y] noda toner (g ≥ 4), tex [4 kanvas] tekstur mesin (tempat sama tiap lewat) · asal: ai-data-habis bab-4/src/copier.js:48 · ledger: salinan-pudar-generasi
export function copyOf(prev, g, o = {}) {
  const w = prev.width, h = prev.height, [C, c] = mk(w, h), ar = Math.sqrt(w * h / (DW * DH)), sd = o.seed || 0;
  c.fillStyle = '#ECEBE6'; c.fillRect(0, 0, w, h);
  c.filter = `blur(${((.7 + .06 * g) * (o.bs ?? 1)).toFixed(2)}px)`;     // offscreen canvas of our own: safe to reset below
  c.save(); c.translate(w / 2 + (rnd(g * 3 + sd) - .5) * 4, h / 2 + (rnd(g * 3 + 1 + sd) - .3) * 3); c.rotate((rnd(g * 3 + 2 + sd) - .5) * .005);
  c.drawImage(prev, -w / 2, -h / 2); c.restore(); c.filter = 'none';
  const im = c.getImageData(0, 0, w, h), d = im.data, MIX = .3;      // toner curve: dark ink -> darker/fatter, light marks -> paper
  for (let i = 0; i < d.length; i += 4) {
    const L = (.3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]) / 255, s = 1 / (1 + Math.exp(-(L - .5) * 12)), tl = (.08 + .87 * s) * 255;
    for (let j = 0; j < 3; j++) { const gr = lerp(d[i + j], L * 255, .35); d[i + j] = lerp(gr, tl, MIX); }
  }
  c.putImageData(im, 0, 0);
  if (o.tex) {                                                       // the machine's own marks, same spots every pass
    const lay = (i, a) => { if (a > 0 && o.tex[i]) { c.globalAlpha = a; c.drawImage(o.tex[i], 0, 0, w, h); c.globalAlpha = 1; } };
    lay(3, .32 * clamp((g - 1) / 3)); lay(0, .5 * clamp((g - 3) / 3)); lay(1, .42 * clamp((g - 4) / 3)); lay(2, .5 * clamp((g - 6) / 3));
  }
  c.fillStyle = 'rgba(28,28,30,.6)'; c.beginPath();                  // toner speckle, denser at the edges (one path)
  const ed = 90 * ar;
  for (let i = 0; i < (120 + g * 45) * ar * ar; i++) {
    const e = rnd(i + g * 977 + sd), x = e < .5 ? rnd(i + 11 + g) * w : (rnd(i + 13 + g) < .5 ? rnd(i + 17) * ed : w - rnd(i + 17) * ed), y = rnd(i + 19 + g * 7) * h, r = .5 + rnd(i + 23);
    c.moveTo(x + r, y); c.arc(x, y, r, 0, 7);
  }
  c.fill();
  const lw = (40 + 6 * g) * ar, lg = c.createLinearGradient(0, 0, lw, 0);   // lid shadow on the left edge, grows
  lg.addColorStop(0, `rgba(30,30,32,${.08 + .035 * g})`); lg.addColorStop(1, 'rgba(30,30,32,0)'); c.fillStyle = lg; c.fillRect(0, 0, lw, h);
  c.fillStyle = `rgba(40,40,44,${.012 * g})`; c.fillRect(Math.round(w * .717), 0, 2, h);   // drum streak
  if (o.smear && g >= 4) {                                           // toner smear settles where a light mark was
    c.save(); c.translate(o.smear[0], o.smear[1]); c.scale(ar, ar);
    for (let i = 0; i < 7; i++) {
      const ex = (rnd(i + 70) - .5) * 260, ey = (rnd(i + 71) - .5) * 90, rx = 60 + 90 * rnd(i + 72), ry = 14 + 26 * rnd(i + 73);
      const r = c.createRadialGradient(ex, ey, 0, ex, ey, rx); r.addColorStop(0, `rgba(80,80,84,${.035 * (g - 3) * (.5 + rnd(i + 74))})`); r.addColorStop(1, 'rgba(80,80,84,0)');
      c.save(); c.translate(ex, ey); c.scale(1, ry / rx); c.rotate((rnd(i + 75) - .5) * .3); c.translate(-ex, -ey); c.fillStyle = r; c.fillRect(ex - rx, ey - rx, 2 * rx, 2 * rx); c.restore();
    }
    c.fillStyle = `rgba(70,70,74,${.03 * (g - 3)})`; for (let i = 0; i < 5; i++) c.fillRect(-170 + rnd(i + 80) * 60, -40 + i * 19 + rnd(i + 81) * 8, 220 + 120 * rnd(i + 82), 2 + 3 * rnd(i + 83));
    c.restore();
  }
  return C;
}
// (load) rantai salinan [ASLI, salinan 1, …, salinan n], tiap generasi dari generasi sebelumnya; o diteruskan ke copyOf · asal: ai-data-habis bab-4/src/copier.js:86 · ledger: salinan-pudar-generasi
export function chain(first, n, o = {}) {
  const out = [first]; for (let g = 1; g <= n; g++) out.push(copyOf(out[g - 1], g, o)); return out;
}
// cahaya scan mesin fotokopi: inti terang + pendaran lembut selebar w di garis y0 (k = skala, alpha 0..1), dicampur lighter · asal: ai-data-habis bab-4/src/copier.js:90 · ledger: salinan-pudar-generasi
export function bar(ctx, x0, y0, w, k, alpha) {
  if (alpha <= 0) return; const h = 190 * k, op = ctx.globalCompositeOperation; ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createLinearGradient(0, y0 - h, 0, y0 + h); g.addColorStop(0, 'rgba(241,239,230,0)'); g.addColorStop(.5, `rgba(241,239,230,${.34 * alpha})`); g.addColorStop(1, 'rgba(241,239,230,0)');
  ctx.fillStyle = g; ctx.fillRect(x0 - 30 * k, y0 - h, w + 60 * k, 2 * h);
  ctx.fillStyle = `rgba(250,249,244,${.85 * alpha})`; ctx.fillRect(x0 - 30 * k, y0 - 2.5 * k - 1, w + 60 * k, 5 * k + 2);
  ctx.globalCompositeOperation = op;
}
// kartu di atas panel kaca (pusat x, y): bayangan, bingkai, kilau, q 0..1 = lahir dari scan (bar menyapu ke bawah) · o: q, under (gambar lama di bawah yang ditimpa scan), bar 0..1, asli (lencana lime ASLI), label, ls, m=22, a, rot, mix [img, a] · asal: ai-data-habis bab-4/src/copier.js:98 · ledger: salinan-pudar-generasi
export function glass(ctx, im, x, y, w, h, o = {}) {
  const a0 = ctx.globalAlpha, m = o.m ?? 22, q = o.q ?? 1; if ((o.a ?? 1) <= 0) return;
  ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.globalAlpha = a0 * (o.a ?? 1);
  ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 26;
  ctx.fillStyle = 'rgba(30,31,27,.55)'; ctx.fillRect(-w / 2 - m, -h / 2 - m, w + 2 * m, h + 2 * m);
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.strokeRect(-w / 2 - m, -h / 2 - m, w + 2 * m, h + 2 * m);
  if (o.under) ctx.drawImage(o.under, -w / 2, -h / 2, w, h);
  const shown = (im && q > 0) || o.under;
  if (im && q > 0) {
    const yb = -h / 2 + lerp(-.04, 1.04, q) * h;
    ctx.save(); ctx.beginPath(); ctx.rect(-w / 2 - 2, -h / 2 - 2, w + 4, Math.max(0, yb + h / 2) + 2); ctx.clip();
    ctx.drawImage(im, -w / 2, -h / 2, w, h);
    if (o.mix && o.mix[1] > 0) { ctx.globalAlpha = a0 * (o.a ?? 1) * o.mix[1]; ctx.drawImage(o.mix[0], -w / 2, -h / 2, w, h); ctx.globalAlpha = a0 * (o.a ?? 1); }
    ctx.restore();
  }
  if (shown) {
    const gl = ctx.createLinearGradient(-w / 2 - m, -h / 2 - m, -w / 2 + w * .6, h / 2); gl.addColorStop(0, ivo(.12)); gl.addColorStop(.35, ivo(0));
    ctx.fillStyle = gl; ctx.fillRect(-w / 2 - m, -h / 2 - m, w + 2 * m, h + 2 * m);
    if (im && q > 0 && q < 1) bar(ctx, -w / 2, -h / 2 + lerp(-.04, 1.04, q) * h, w, Math.max(.35, w / 1400), Math.sin(Math.PI * clamp(q * 1.02)));
  }
  if (o.bar > 0 && o.bar < 1) bar(ctx, -w / 2, -h / 2 + lerp(-.04, 1.04, o.bar) * h, w, Math.max(.35, w / 1400), .8 * Math.sin(Math.PI * o.bar));
  if (o.asli) { const s = o.ls || 22; setFont(ctx, MN(s), 3); const tw = ctx.measureText('ASLI').width + s * 1.3;
    ctx.fillStyle = LIME; ctx.fillRect(-w / 2 - m, -h / 2 - m - 1.9 * s, tw, 1.7 * s); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left'; ctx.fillText('ASLI', -w / 2 - m + .65 * s, -h / 2 - m - .7 * s); }
  else if (o.label) { setFont(ctx, MN(o.ls || 18), 4); ctx.fillStyle = ivo(.72); ctx.textAlign = 'left'; ctx.fillText(o.label, -w / 2 - m, -h / 2 - m - 14); }
  ctx.restore(); ctx.globalAlpha = a0;
}
// (posisi) panel generasi g dalam tumpukan Jarak = Generasi: tiap salinan satu kaca lebih dalam → {x, y, z} · o: dx=-560, dy=70, gap=900 · asal: ai-data-habis bab-4/src/copier.js:14 · ledger: salinan-pudar-generasi
export const gpos = (g, o = {}) => ({ x: g * (o.dx ?? -560), y: g * (o.dy ?? 70), z: g * (o.gap ?? 900) });
// beat kecil Salinan Pudar: satu kaca, ASLI di-scan masuk, lalu tiap o.step detik generasi berikutnya di-scan menimpa yang lama sampai salinan terakhir CH · CH = chain(kartu(), n) · o: step=.34, scan=.3, sampai (generasi maks), label:false, ls, m, rot · asal: ai-data-habis bab-4/src/copier.js:98 · ledger: salinan-pudar-generasi
export function pudar(ctx, CH, x, y, w, h, t, t0, o = {}) {
  const s = t - t0; if (s < 0 || !CH.length) return;
  const st = o.step ?? .34, sc = Math.min(st, o.scan ?? .3), n = Math.min(CH.length - 1, o.sampai ?? CH.length - 1);
  const g = Math.min(n, Math.floor(s / st)), q = clamp((s - g * st) / sc), lb = o.label !== false;
  glass(ctx, CH[g], x, y, w, h, { ls: o.ls, m: o.m, rot: o.rot, a: o.a, q, under: g ? CH[g - 1] : null, asli: lb && g === 0, label: lb && g ? `SALINAN ${g}` : null });
}
