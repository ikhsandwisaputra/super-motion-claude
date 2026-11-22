// Season 3 kit · film "Cara Rockstar Bikin GTA 6" (2026-11-20). Komponen layar (screen space, dipakai di over/post) +
// latar full-bleed (dipakai di under). Semua waktu = waktu bab (detik). Ikhsan: Season 3 = Aksa + Selam Detail + Foto Jadi Ruang.
//   latar(list)            → under(ctx, t, first): foto / video resmi full-bleed di belakang dunia stasiun (standar AGI)
//   aksaShow(spec)         → { draw(o, t) }: Aksa, maskot ASCII, di momen emosi. v2 (Ikhsan 2026-11-21 "terlalu cepat, penonton tidak tahu dia ada"):
//                            tampil 6–8 s (stay ≥ 5.5), s .8, kedip otomatis, 1–2× per bab, tag:'AKSA · teman nonton' saat pertama di film
//   selam(cfg)             → { draw(o, t) }: Selam Detail — speed-ramp dive ke lubang huruf, match-cut keluar dari lubang angka
//   ruang(cfg)             → { draw(o, t) }: Foto Jadi Ruang (lite) — foto jadi 3 lapis: latar · kata raksasa · potongan subjek, gelombang lampu padam
//   bake(im, filter, maxW) → kanvas yang sudah di-grade (filter sekali saat load, bukan tiap frame)
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, GREY, MONO, DISP, ivo, setFont, DSP, MN, SRF, mk, rnd, grainRect } from './kit.js';
import { makeAksa } from './aksa.js';

export const GRADE_DOC = 'saturate(.78) contrast(1.08) brightness(.86)';   // game resmi: warna Vice City tetap hidup, tidak neon
export function bake(im, filter = GRADE_DOC, maxW = 1920) {
  const s = Math.min(1, maxW / im.width), [c, g] = mk(Math.round(im.width * s), Math.round(im.height * s));
  g.filter = filter; g.drawImage(im, 0, 0, c.width, c.height); return c;
}
function cover(ctx, im, cx, cy, w, h, z = 1, ox = 0, oy = 0) {
  const s = Math.max(w / im.width, h / im.height) * z; ctx.drawImage(im, cx - im.width * s / 2 + ox, cy - im.height * s / 2 + oy, im.width * s, im.height * s);
}
const vframe = (V, lt, speed = 1) => { const n = V.n, per = 2 * (n - 1), m = Math.floor(Math.max(0, lt) * V.fps * speed) % per; return V.img[m < n ? m : per - m]; };

// ── latar full-bleed ──────────────────────────────────────────────────────────────────────────────────────────
// item: { t0, t1, im | V, grade, dim=.42, z:[z0,z1], pan:[x0,x1], panY:[y0,y1], side:'left'|'right'|'bottom'|null, fin=.35, fout=.35, speed }
// dim + side-shade menjaga teks AA; foto tetap terang di sisi lain (lit mass AGI). Video: frame ping-pong, grade per frame.
export function latar(list) {
  return (ctx, t, first) => {
    if (first) return;
    for (const L of list) {
      if (t < L.t0 - .01 || t > L.t1 + .01) continue;
      const a = Math.min(E.outCubic(inv(L.t0, L.t0 + (L.fin ?? .35), t)), 1 - E.inCubic(inv(L.t1 - (L.fout ?? .35), L.t1, t))); if (a <= 0) continue;
      const u = inv(L.t0, L.t1, t), z = lerp(...(L.z || [1.04, 1.12]), E.inOutSine(u)), ox = lerp(...(L.pan || [0, 0]), E.inOutSine(u)), oy = lerp(...(L.panY || [0, 0]), E.inOutSine(u));
      const im = L.V ? vframe(L.V, t - L.t0, L.speed) : L.im; if (!im) continue;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a;
      if (L.V) ctx.filter = L.grade || GRADE_DOC;
      cover(ctx, im, W / 2, H / 2, W, H, z, ox, oy); ctx.filter = 'none';
      ctx.fillStyle = `rgba(11,12,9,${L.dim ?? .42})`; ctx.fillRect(0, 0, W, H);
      if (L.side) { const g = L.side === 'bottom' ? ctx.createLinearGradient(0, H * .35, 0, H) : ctx.createLinearGradient(L.side === 'left' ? 0 : W, 0, L.side === 'left' ? W * .72 : W * .28, 0);
        g.addColorStop(0, 'rgba(11,12,9,.86)'); g.addColorStop(.55, 'rgba(11,12,9,.45)'); g.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
      const v = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * 1.0); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
      grainRect(ctx, 0, 0, W, H, t, .14); ctx.restore();
    }
  };
}

// ── Aksa ──────────────────────────────────────────────────────────────────────────────────────────────────
// spec: { t: muncul (caret), x, y: kaki (layar), s=.62, stay=2.4 (badan hidup), face:[[dt,'O_O']…] (dt dari tubuh jadi),
//         point: dt (menunjuk ke kanan), jump: dt, shock: dt, sad: dt, wave:[dt0, dt1], tears:[dt…], say:[dt, 'teks'] (komentar kode) }
// SFX (tulis di beats.js; waktu = spec.t + …): +0 f:aksa_24 (decode) · +.82 badan · emosi pada dt · tidur +.82+stay → f:aksa_25
export function aksaShow(spec) {
  const Z = 1e5, inf = .82, tin = d => d == null ? null : inf + d;
  const look = tin(spec.point), jump = tin(spec.jump), shock = tin(spec.shock), sad = tin(spec.sad), deflate = inf + (spec.stay ?? 6), sleep = deflate - .3;
  const antic = jump != null ? jump - .14 : Z;
  const kR = [[0, 32]], kL = [[0, 32]];
  if (look != null) kR.push([look, 104]);
  if (jump != null) { kR.push([antic, 24]); kL.push([antic, 24]); kR.push([jump + .1, 150]); kL.push([jump + .1, 150]); kR.push([jump + .55, 40]); kL.push([jump + .55, 40]); }
  if (shock != null) { kR.push([shock, 152]); kL.push([shock, 152]); }
  if (sad != null) { kR.push([sad, 10]); kL.push([sad, 10]); }
  kR.push([sleep, 22]); kL.push([sleep, 22]);
  const f0 = Math.min(9, ...(spec.face || []).map(([d]) => d)), base = [...[[.45, '-_-'], [.62, 'o_o']].filter(([d]) => d < f0).map(([d, f]) => [inf + d, f]), ...(spec.face || []).map(([d, f]) => [inf + d, f])]   // muka bangun hanya sebelum muka pertama spec (bug 11-21: O_O di .1 tertimpa).sort((a, b) => a[0] - b[0]);
  const faceAt = tt => base.reduce((f, [a, b]) => a <= tt ? b : f, 'o_o'), idle = [];             // v2 (Ikhsan 11-21 "terlalu cepat"): kedip saat tampil lama
  for (let d = inf + 1.6; d < sleep - .5; d += 1.9) if (!base.some(([a]) => Math.abs(a - d) < .35)) idle.push([d, '-_-'], [d + .13, faceAt(d)]);
  const faces = [...base, ...idle, [sleep, '-_-']].sort((a, b) => a[0] - b[0]);
  const B = { x: 0, y: 0, rx: 230, ry: 240, caret: 0, type: .16, cmdIn: 'aksa.bangun()', inflate: inf, look: [look ?? Z], antic,
    jump: jump != null ? [jump, jump + .44, 92] : [Z + 1, Z + 2, 0], shock: shock ?? Z, sad: sad ?? Z + 3, sleep, zz: [sleep + .08, sleep + .22],
    deflate, cmdOut: 'aksa.tidur()', end: deflate + 1.25, cps: 24, face: faces, tears: (spec.tears || []).map((d, i) => [inf + d, i % 2 ? -1 : 1]),
    armR: kR, armL: kL, wave: spec.wave ? [inf + spec.wave[0], inf + spec.wave[1]] : null };
  const A = makeAksa(B), s = spec.s ?? .8;
  function draw(o, t) {
    const lt = t - spec.t; if (lt < 0 || lt > B.end) return;
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    const pk = Math.min(E.outCubic(inv(0, .35, lt)), 1 - E.inCubic(inv(B.end - .3, B.end, lt)));           // kolam gelap: ASCII terbaca di atas foto
    const g = o.createRadialGradient(spec.x, spec.y - 160 * s, 20, spec.x, spec.y - 160 * s, 430 * s);
    g.addColorStop(0, `rgba(11,12,9,${.78 * pk})`); g.addColorStop(.6, `rgba(11,12,9,${.5 * pk})`); g.addColorStop(1, 'rgba(11,12,9,0)');
    o.fillStyle = g; o.fillRect(spec.x - 460 * s, spec.y - 600 * s, 920 * s, 760 * s);
    o.translate(spec.x, spec.y); o.scale(s, s); A.draw(o, lt); o.restore();
    if (spec.say) { const [d, str] = spec.say, t0 = inf + d, k = lt - t0; if (k > 0 && lt < deflate) {
      const n = Math.min(str.length, Math.ceil(k * 34)), al = 1 - inv(deflate - .25, deflate, lt);
      o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = al; setFont(o, `700 ${Math.round(34 * s / .62)}px "${MONO}"`, 1); o.textAlign = 'left'; o.textBaseline = 'middle';
      const TF = `700 ${Math.round(22 * s / .62)}px "${MONO}"`, SF = `700 ${Math.round(34 * s / .62)}px "${MONO}"`, sw = o.measureText('// ' + str).width + 20;
      setFont(o, TF, 2); const fw = Math.max(sw, spec.tag ? o.measureText(spec.tag).width + 30 : 0); setFont(o, SF, 1);
      let x = spec.x + 250 * s, y = spec.y - 560 * s;                                    // kalau mentok kanan → naik ke atas kepala Aksa
      if (x + fw > W - 90) { x = Math.max(90, Math.min(spec.x - fw / 2, W - 70 - fw)); y = spec.y - 640 * s; }
      o.shadowColor = 'rgba(8,9,6,.85)'; o.shadowBlur = 16;                             // terbaca di langit terang tanpa kotak
      if (spec.tag) { setFont(o, TF, 2); o.fillStyle = LIME; o.fillRect(x, y - 62 * s / .62 - 6, 12, 12); o.fillStyle = ivo(.78);
        o.fillText(spec.tag, x + 22, y - 62 * s / .62); setFont(o, SF, 1); }
      o.fillStyle = GREY; o.fillText('//', x, y); o.fillStyle = IVORY; o.fillText(str.slice(0, n), x + o.measureText('// ').width, y);
      if (n < str.length || Math.floor(lt * 3) % 2) { o.fillStyle = LIME; o.fillRect(x + o.measureText('// ' + str.slice(0, n)).width + 2, y - 17, 15, 32); }
      o.restore(); } }
  }
  return { draw, B, load: A.load, end: spec.t + B.end };
}

// ── Selam Detail ──────────────────────────────────────────────────────────────────────────────────────────
// cfg: { t0, tc (potong), t1, page(ctx, t) dunia 1 dalam koordinat 1920×1080, f:[x,y] pusat lubang huruf, r: jari-jari lubang (px dunia 1),
//        next(ctx, t) dunia 2 (koordinat 1920×1080), nf:[x,y] pusat lubang angka di dunia 2, nr, bg1, bg2 }
// Kamera log-zoom = Hermite (drift → rush → hang → plunge); keluar: snap mundur eksponensial. Post: zoom blur radial 2 lintasan saat cepat.
function herm(t, K) {
  if (t <= K[0][0]) return K[0][1]; const N = K.length - 1; if (t >= K[N][0]) return K[N][1];
  for (let i = 0; i < N; i++) { const [t0, p0, v0] = K[i], [t1, p1, v1] = K[i + 1];
    if (t <= t1) { const h = t1 - t0, s = (t - t0) / h, s2 = s * s, s3 = s2 * s; return (2 * s3 - 3 * s2 + 1) * p0 + (s3 - 2 * s2 + s) * h * v0 + (-2 * s3 + 3 * s2) * p1 + (s3 - s2) * h * v1; } }
}
let TMP = null; const tmp = () => TMP || (TMP = [mk(W, H), mk(W, H)]);
export function selam(cfg) {
  const { t0, tc, t1, f, r, nf, nr } = cfg, diag = Math.hypot(W, H) / 2, LM = Math.log(diag * 1.25 / r), LM2 = Math.log(diag * 1.25 / nr), LAM = 5.2;
  const K = [[t0, 0, 0], [tc - 1.05, Math.log(1.12), .22], [tc - .6, Math.log(2.6), 3.4], [tc - .34, Math.log(3.3), .9], [tc, LM, LM * 2.6]];
  function cam(t) {
    if (t < tc) { const lm = herm(t, K), mv = E.inOutCubic(inv(tc - 1.1, tc - .3, t)); return { w: 1, m: Math.exp(lm), lm, X: lerp(f[0], W / 2, mv), Y: lerp(f[1], H / 2, mv) }; }
    const lz = LM2 * Math.exp(-LAM * (t - tc)), d = 1 + .035 * E.inOutSine(inv(tc + .5, t1, t)), k = lz / LM2;
    return { w: 2, m: Math.exp(lz) * d, lm: lz, X: lerp(nf[0], W / 2, k), Y: lerp(nf[1], H / 2, k) };
  }
  function scene(g, t) {
    const c = cam(t), P = c.w === 1 ? f : nf;
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.filter = 'none'; g.fillStyle = c.w === 1 ? (cfg.bg1 || '#0B0C09') : (cfg.bg2 || '#0B0C09'); g.fillRect(0, 0, W, H);
    g.setTransform(c.m, 0, 0, c.m, c.X - P[0] * c.m, c.Y - P[1] * c.m);
    (c.w === 1 ? cfg.page : cfg.next)(g, t, c); g.setTransform(1, 0, 0, 1, 0, 0);
  }
  function draw(o, t) {
    if (t < t0 || t > t1) return;
    const ain = E.outCubic(inv(t0, t0 + .18, t)), aout = 1 - E.inCubic(inv(t1 - .3, t1, t));
    const [[c1, g1], [c2, g2]] = tmp(); scene(g1, t);
    const ta = t - 1 / 60, tb = t + 1 / 60, A = cam(ta), Bc = cam(tb), rate = A.w === Bc.w ? Math.abs((Bc.lm - A.lm) / (tb - ta)) : 30, c = cam(t);
    const amt = .32 * clamp((rate - 3) / 16);
    if (amt > .004) {                                                    // 2 lintasan × 6 salinan, pusat = titik fokus layar
      const fx = c.X, fy = c.Y, pass = (g, src, step) => { g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'copy'; g.globalAlpha = 1; g.drawImage(src, 0, 0); g.globalCompositeOperation = 'source-over';
        for (let j = 1; j < 6; j++) { const s = 1 + step * j; g.globalAlpha = 1 / (j + 1); g.setTransform(s, 0, 0, s, fx * (1 - s), fy * (1 - s)); g.drawImage(src, 0, 0); } g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; };
      pass(g2, c1, amt / 6); pass(g1, c2, amt / 36);
    }
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalCompositeOperation = 'source-over'; o.filter = 'none'; o.globalAlpha = ain * aout;
    if (aout < 1) { const s = lerp(.94, 1, aout); o.translate(W / 2 * (1 - s), H / 2 * (1 - s)); o.scale(s, s); }
    o.drawImage(c1, 0, 0); o.restore();
    if (t >= tc && t < tc + 2 / 30) { o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = .18; o.fillStyle = LIME; o.fillRect(0, 0, W, H); o.restore(); }   // 1-frame impact
  }
  return { draw, cam };
}
// huruf vektor besar dengan lubang yang bisa diselami: ukur pusat lubang (counter) sebuah huruf di string pada font tertentu
export function counterOf(str, idx, css, x, y, align = 'center') {
  const [c, g] = mk(8, 8); g.font = css; const tw = g.measureText(str).width, x0 = align === 'center' ? x - tw / 2 : x;
  const pre = g.measureText(str.slice(0, idx)).width, ch = g.measureText(str[idx]), size = parseFloat(/(\d+(\.\d+)?)px/.exec(css)[1]);
  return { x: x0 + pre + ch.width / 2, y: y - (ch.actualBoundingBoxAscent - ch.actualBoundingBoxDescent) / 2, size, w: ch.width };
}

// ── Foto Jadi Ruang (lite) ────────────────────────────────────────────────────────────────────────────────
// cfg: { t0, t1, bg (kanvas foto), cut (potongan subjek, ukuran sama dgn foto), word, wordY=.56, wordSize, sub:[t,'teks'], tw (gelombang padam),
//        wordX=.5 (pusat kata, fraksi lebar), par=1 (parallax), fx=.5 (fokus horizontal subjek), lime: kata ke-n diberi aksen lime (opsional), src: 'Sumber: …' }
export function ruang(cfg) {
  const { t0, t1 } = cfg; let BGS = null, BGD = null;
  function prep() { if (BGS) return; BGS = bake(cfg.bg, 'blur(3px) saturate(.85) brightness(.78)', 1920); BGD = bake(cfg.bg, 'blur(5px) saturate(.4) brightness(.22)', 1920); }
  function draw(o, t) {
    if (t < t0 || t > t1) return; prep();
    const ki = E.outQuint(inv(t0, t0 + .7, t)), ko = E.inCubic(inv(t1 - .35, t1, t)), u = inv(t0, t1, t), su = E.inOutSine(u);
    const z = lerp(1.03, 1.13, su) + .22 * (1 - ki), pan = lerp(-38, 38, su) * (cfg.par ?? .6), wx = -W * .9 * ko;
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    o.fillStyle = '#0B0C09'; o.globalAlpha = clamp(ki * 3) * (1 - ko); o.fillRect(0, 0, W, H);
    o.translate(wx, 0);
    // L1 latar (blur tipis = lensa tipis, fokus di subjek) + gelombang lampu padam dari kiri, satu irisan cahaya tetap di subjek
    cover(o, BGS, W / 2, H / 2, W, H, z, pan * .45, 0);
    if (cfg.tw != null && t > cfg.tw) {
      const w = E.inOutCubic(inv(cfg.tw, cfg.tw + .7, t)), xe = lerp(-200, W + 200, w), sx = W * (cfg.fx ?? .5);
      o.save(); o.beginPath(); o.rect(0, 0, xe, H); o.clip(); o.globalAlpha = 1 - ko; cover(o, BGD, W / 2, H / 2, W, H, z, pan * .45, 0);
      const sl = o.createLinearGradient(sx - 420, 0, sx + 420, 0); sl.addColorStop(0, 'rgba(0,0,0,0)'); sl.addColorStop(.5, `rgba(241,239,230,${.10 * w})`); sl.addColorStop(1, 'rgba(0,0,0,0)');
      o.fillStyle = sl; o.fillRect(0, 0, W, H); o.restore();
      const edge = o.createLinearGradient(xe - 160, 0, xe + 30, 0); edge.addColorStop(0, 'rgba(0,0,0,0)'); edge.addColorStop(.85, 'rgba(0,0,0,.55)'); edge.addColorStop(1, 'rgba(0,0,0,0)');
      if (w < 1) { o.fillStyle = edge; o.fillRect(xe - 160, 0, 190, H); }
    }
    // L2 kata raksasa di antara latar dan subjek (huruf jatuh berpegas, parallax sedang)
    if (cfg.word) {
      const size = cfg.wordSize || 560; setFont(o, DSP(size), 4); const tw = o.measureText(cfg.word).width, x0 = W * (cfg.wordX ?? .5) - tw / 2 + pan * .75, y = H * (cfg.wordY ?? .6);
      o.textAlign = 'left'; o.textBaseline = 'alphabetic';
      for (let i = 0; i < cfg.word.length; i++) { const s = t - t0 - .18 - i * .045; if (s <= 0) break;
        o.globalAlpha = clamp(s / .1) * (1 - ko); o.fillStyle = cfg.lime === i ? LIME : IVORY;
        o.fillText(cfg.word[i], x0 + o.measureText(cfg.word.slice(0, i)).width, y + (1 - spring(s, .55, .38)) * -160); }
    }
    // L3 subjek tajam di depan (parallax penuh) + bayangan jatuh ke kata
    o.globalAlpha = 1 - ko;
    o.save(); o.shadowColor = 'rgba(0,0,0,.6)'; o.shadowBlur = 60; o.shadowOffsetX = -22; o.shadowOffsetY = 18;
    cover(o, cfg.cut, W / 2, H / 2, W, H, z * 1.015, pan, 0); o.restore();
    const v = o.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * 1.05); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); o.fillStyle = v; o.fillRect(-wx, 0, W, H);
    grainRect(o, -wx, 0, W, H, t, .12);
    if (cfg.sub) { const [ts, str] = cfg.sub, k = E.outQuint(inv(ts, ts + .45, t)); if (k > 0) {
      setFont(o, SRF(54)); o.textAlign = 'center'; o.globalAlpha = k * (1 - ko); o.fillStyle = IVORY; o.fillText(str, W / 2, H - 120 + (1 - k) * 30); } }
    if (cfg.src) { o.globalAlpha = .85 * (1 - ko) * E.outCubic(inv(t0 + .5, t0 + 1, t)); o.fillStyle = LIME; o.fillRect(64, H - 66, 11, 11); setFont(o, `400 21px "${MONO}"`, 1); o.textAlign = 'left'; o.fillStyle = ivo(.82); o.fillText(cfg.src, 90, H - 56); }
    o.restore();
  }
  return { draw };
}
