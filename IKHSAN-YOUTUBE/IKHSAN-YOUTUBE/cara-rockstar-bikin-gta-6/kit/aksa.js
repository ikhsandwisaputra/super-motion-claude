// Aksa · maskot ASCII Season 3 (lab; ide Ikhsan 2026-11-20 "maskot dari codingan… asci karakter"; nama kerja dari "aksara").
// Tubuh: patung gumdrop 3D (superellipse + medan tinggi, lampu kunci kiri-atas + rim kanan) yang DITULIS dengan huruf: tiap sel
// 12×20 memilih huruf yang bentuk tinta 2×3-nya paling mirip cahaya setempat (pencocok dari pustaka bintang.mata; transisi Mata
// Mesin tidak dipakai, cooldown). Huruf "mendidih" pelan 10 fps (line boil). Wajah: emotikon Space Mono lime di visor gelap,
// satu-satunya aksen saat Aksa tampil. Lengan: 3 goresan huruf (- / \ |) yang menunjuk, terangkat kaget, lunglai sedih.
// Masuk: caret → ketik `aksa.bangun()` → baris itu menggembung jadi tubuh (decode dari bawah) → mata boot -_- → o_o.
// Keluar: -_- + z → tubuh kempis jadi satu baris yang terbaca `aksa.tidur()` → caret backspace → caret padam.
// makeAksa(B).draw(ctx, t): waktu lokal (detik) dari B, koordinat layar, kaki di (B.x, B.y).
import { clamp, inv, lerp, E, spring, IVORY, LIME, GREY, MONO, mk, rnd } from './kit.js';
// Film GTA 6: lengan per kunci (B.armR/armL), lambaian (B.wave), waktu yang tak dipakai = 1e5+ (lihat aksaShow di s3.js).

export const CW = 18, CH = 30;                                             // sel (px)
const HURUF = ' .,:;\'"-_=+*^~!/\\|()[]<>ilIjtfrcxvzoaeumnwOQ0#%@', NG = HURUF.length, AS = 2;   // atlas 2× → tajam saat zoom
const SCRI = [...'#%@0QOxz=+*<>/\\'].map(c => HURUF.indexOf(c)), SCRF = 'o0O@#%?!<>^-T';
let ATL = null; const VEC = [];
function atlas() {                                                         // satu strip huruf ivory + vektor tinta 2×3 per huruf
  if (ATL) return ATL;
  const w = CW * AS, h = CH * AS, [C, g] = mk(w * NG, h);
  g.font = `400 ${h * .85}px "${MONO}"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = IVORY;
  [...HURUF].forEach((c, i) => g.fillText(c, (i + .5) * w, h / 2));
  const d = g.getImageData(0, 0, C.width, h).data;
  for (let i = 0; i < NG; i++) { const v = [0, 0, 0, 0, 0, 0];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) v[(x * 2 / w | 0) + 2 * (y * 3 / h | 0)] += d[4 * (y * C.width + i * w + x) + 3] / 255;
    VEC.push(v); }
  for (let k = 0; k < 6; k++) { const m = Math.max(...VEC.map(v => v[k])) || 1; VEC.forEach(v => v[k] /= m); }
  return ATL = C;
}
const Q = new Float32Array(6);
function match(s) {                                                        // 6 sampel cahaya → huruf terbaik | runner-up << 8
  let pk = 0; for (let k = 0; k < 6; k++) if (s[k] > pk) pk = s[k];
  if (pk < .03) return 0;
  for (let k = 0; k < 6; k++) Q[k] = Math.pow(s[k] / pk, 1.5) * pk;
  let b = 0, be = 1e9, b2 = 0, be2 = 1e9;
  for (let i = 0; i < NG; i++) { const v = VEC[i]; let e = 0; for (let k = 0; k < 6; k++) { const d = v[k] - Q[k]; e += d * d; }
    if (e < be) { b2 = b; be2 = be; b = i; be = e; } else if (e < be2) { b2 = i; be2 = e; } }
  return b | b2 << 8;
}
const LD = (() => { const v = [-.5, -.72, .62], n = Math.hypot(...v); return v.map(x => x / n); })();   // lampu kunci (y ke bawah)
function light(u, v) {                                                     // gumdrop: kubah atas (eksp 2), alas rata (3,6) → 0..1, −1 di luar
  const au = Math.abs(u), av = Math.abs(v), q = v < 0 ? 2 : 3.6, d = Math.pow(au, 2.3) + Math.pow(av, q);
  if (d >= 1) return -1;
  const h = Math.sqrt(1 - d) + 1e-3, du = 2.3 * Math.pow(au, 1.3) * Math.sign(u), dv = q * Math.pow(av, q - 1) * Math.sign(v);
  let nx = du / (2 * h) * .55, ny = dv / (2 * h) * .55, nz = 1; const n = Math.hypot(nx, ny, nz); nx /= n; ny /= n; nz /= n;
  const lam = Math.max(0, nx * LD[0] + ny * LD[1] + nz * LD[2]), rim = Math.pow(1 - nz, 2.2) * clamp(.3 + .7 * (.8 * nx - .5 * ny));
  let L = .1 + .8 * lam + .6 * rim;
  if (v > .55) L *= 1 - .5 * Math.pow((v - .55) / .45, 2);                  // oklusi dekat lantai
  return clamp(L);
}
const stroke = (dx, dy) => { const a = Math.abs(Math.atan2(dy, dx) * 180 / Math.PI) % 180;
  return a < 22.5 || a >= 157.5 ? '-' : a >= 67.5 && a < 112.5 ? '|' : dx * dy > 0 ? '\\' : '/'; };
function track(t, keys, dur = .2) {                                        // [[t, nilai]…] → nilai, outBack dari kunci sebelumnya
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) { const [tk, vk] = keys[i]; if (t < tk) break;
    const k = clamp((t - tk) / dur) - 1; v = lerp(v, vk, 1 + 2.7 * k * k * k + 1.7 * k * k); }
  return v;
}

export function makeAksa(B) {
  const RX0 = B.rx || 230, RY0 = B.ry || 240, NR = 2 * RY0 / CH, cps = B.cps || 24, tIn = B.inflate, tOut = B.deflate, inLen = B.cmdIn.length, outLen = B.cmdOut.length;
  const enter = B.type + inLen / cps + .06, tBk = tOut + .5, tGone = tBk + outLen / cps;
  const c0In = -Math.floor(inLen / 2), c0Out = -Math.floor(outLen / 2);
  const gOf = t => t < tIn ? 0 : t < tOut ? spring(t - tIn, .45, .55) : Math.max(0, 1 - E.inCubic(inv(tOut, tOut + .32, t)));
  const rv = (c, r) => tIn + .03 + .3 * Math.min(1, r / NR) + .07 * rnd(c * 31.7 + r * 17.3 + 5);   // decode dari bawah
  const hop = t => { const [j0, j1, hh] = B.jump; if (t <= j0 || t >= j1) return 0; const k = (t - j0) / (j1 - j0); return 4 * hh * k * (1 - k); };
  const lookK = t => E.inOutSine(inv(B.look[0], B.look[0] + .22, t)) * (1 - E.inOutSine(inv(B.antic - .04, B.antic + .08, t)));
  const K = a => a.filter(k => k[0] < 9e4).sort((a, b) => a[0] - b[0]);
  const KR = K(B.armR || [[0, 32], [B.look[0], 104], [B.antic, 24], [B.shock, 152], [B.sad, 10], [B.sleep, 22]]), KL = K(B.armL || [[0, 32], [B.antic, 24], [B.shock, 152], [B.sad, 10], [B.sleep, 22]]);
  const wav = t => { const w = B.wave; if (!w || t < w[0] || t > w[1]) return null; return 138 + 26 * Math.sin(2 * Math.PI * 2.6 * (t - w[0])); };
  const armR = t => wav(t) ?? track(t, KR), armL = t => track(t, KL);
  function squash(t) {                                                     // + = gepeng, − = memanjang
    let s = .018 * Math.sin(2 * Math.PI * (t - tIn) / 1.4) * clamp((t - tIn - .5) / .3);
    const [j0, j1] = B.jump;
    if (t < j0) s += .15 * E.outCubic(inv(B.antic, j0, t));
    else if (t < j1) s -= .13 * (1 - .72 * Math.sin(Math.PI * (t - j0) / (j1 - j0)));
    else { const a = t - j1; s += .19 * Math.exp(-10 * a) * Math.cos(27 * a); }          // mendarat, pegas ζ ≈ 0,35
    if (t >= B.shock) s -= .08 * Math.exp(-(t - B.shock) / .09);
    s -= .07 * Math.sin(Math.PI * clamp((t - tOut + .12) / .16));          // meregang dulu sebelum kempis
    return s;
  }
  const smp = new Float32Array(6);

  function draw(ctx, t) {
    if (t < B.caret || t > B.end) return;
    const A = atlas(), f = Math.round(t * 30), g = gOf(t), s = squash(t), sx = 1 + s, sy = 1 - s, jh = hop(t), lk = lookK(t);
    const kx = .09 * lk, gx = B.x, gy = B.y - jh, sh = t >= B.shock && t < B.shock + .16;
    const RX = lerp(RX0 * .48, RX0, Math.min(g, 1) + .35 * Math.max(0, g - 1)), RY = lerp(14, RY0, g), RXs = RX * sx, RYs = RY * sy;
    const cell = (gi, x, y) => ctx.drawImage(A, gi * CW * AS, 0, CW * AS, CH * AS, x - CW / 2, y - CH / 2, CW, CH);
    ctx.save(); ctx.letterSpacing = '0px';
    if (g > .02) {                                                         // bayangan kontak, cahaya dari kiri atas
      const k = clamp(1 - jh / 110), r = RXs * (.8 + .2 * k) * 1.05;
      ctx.save(); ctx.translate(B.x + 22, B.y + 2); ctx.scale(1, .15); ctx.globalAlpha = .62 * k * clamp(g * 1.5);
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, r); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(.6, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.restore();
    }
    const fa = t >= B.face[0][0] ? clamp((g - .45) / .3) * clamp((t - B.face[0][0]) / .08) : 0;
    const fy = gy - 1.06 * RYs, fx = gx + kx * 1.06 * RYs + 15 * lk, D = 58 * sx * (1 - .1 * lk), vx = D + 54 * sx, vy = 50 * sy;
    if (g > .001) {
      const ga = clamp((g - .75) / .25);
      if (ga > 0) for (const side of [-1, 1]) {                            // lengan: goresan huruf dari bahu
        const a = (side > 0 ? armR(t) : armL(t)) * Math.PI / 180, dx = side * Math.sin(a), dy = Math.cos(a), gi = HURUF.indexOf(stroke(dx, dy));
        const bx = gx + kx * .92 * RYs + side * .98 * RXs, by = gy - .92 * RYs; ctx.globalAlpha = .9;
        for (let k = 0, n = Math.round(3 * ga); k < n; k++) cell(gi, bx + dx * (13 + 19 * k), by + dy * (13 + 22 * k));
      }
      const rows = Math.ceil(2 * RYs / CH) + 1, cols = Math.ceil(RXs * 1.15 / CW) + 2, topRow = 2 * RYs / CH, step = f / 3 | 0;
      for (let r = 0; r < rows; r++) {
        const yc = gy - (r + .5) * CH;
        const off = sh && rnd(r * 13.1 + f * 7.7) < .35 ? (rnd(r * 3.3 + f * 1.9) < .5 ? -1 : 1) * CW * .5 : 0;   // sobekan baris saat kaget
        for (let c = -cols; c <= cols; c++) {
          const xc = gx + c * CW + off;
          if (fa > 0 && ((xc - fx) / vx) ** 2 + ((yc - fy - 5) / vy) ** 2 < 1) continue;                        // visor wajah
          if (r === 0 && ((t < tIn + .2 && c >= c0In && c < c0In + inLen && t < rv(c, 0)) || t >= tOut + .2)) continue;   // baris kode
          let any = false, sum = 0;
          for (let k = 0; k < 6; k++) {
            const px = xc + ((k & 1) - .5) * CW / 2, py = yc + ((k >> 1) - 1) * CH / 3;
            const L = light((px - gx - kx * (gy - py)) / RXs, (py - gy + RYs) / RYs);
            smp[k] = L < 0 ? 0 : L; if (L >= 0) any = true; sum += smp[k];
          }
          if (!any) continue;
          const rvt = rv(c, r); let gi, al;
          if (t < rvt || (t > tOut && r > topRow - 2.2) || (sh && sum < 3 && rnd(c * 5.1 + r * 9.3 + f) < .18)) {
            gi = SCRI[Math.floor(rnd(c * 7.3 + r * 3.1 + f * 1.7) * SCRI.length)]; al = .9;
          } else {
            const m = match(smp); gi = m & 255;
            if (rnd(c * 12.99 + r * 78.23 + step * 3.17) < .06) gi = (m >> 8) || gi;                        // line boil
            al = t - rvt < .06 ? 1 : clamp(.3 + 1.05 * sum / 6);
          }
          if (!gi) continue;
          ctx.globalAlpha = al; cell(gi, xc, yc);
        }
      }
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (fa > 0) {                                                          // wajah emotikon
      let i0 = 0; for (let i = 0; i < B.face.length; i++) if (t >= B.face[i][0]) i0 = i;
      const [tc, str] = B.face[i0], dt = t - tc, scr = i0 > 0 && dt < 2 / 30, pop = 1 + (i0 > 0 ? .3 * Math.exp(-dt / .07) : 0);
      const ch = (c, k) => scr ? SCRF[Math.floor(rnd(f * 7.1 + k * 13.7) * SCRF.length)] : c;
      ctx.save(); ctx.translate(fx, fy); ctx.scale(sx * pop, sy * pop); ctx.globalAlpha = fa; ctx.fillStyle = LIME;
      ctx.font = `700 66px "${MONO}"`; ctx.fillText(ch(str[0], 0), -D / sx, -3); ctx.fillText(ch(str[2], 2), D / sx, -3);
      ctx.font = `700 48px "${MONO}"`; ctx.fillText(ch(str[1], 1), 0, 3);
      ctx.restore();
      for (const [tt, side] of B.tears) { const a = t - tt; if (a < 0 || a > .45) continue;
        ctx.globalAlpha = (1 - a / .45) * fa; ctx.fillStyle = LIME; ctx.font = `700 44px "${MONO}"`;
        ctx.fillText("'", fx + side * D * .96, fy + 40 + 90 * a + 1000 * a * a); }
    }
    if (t >= B.shock && t < B.sad + .15) {                                 // "!" kaget
      const sc = spring(t - B.shock, .38, .3);
      ctx.save(); ctx.translate(gx + .55 * RXs + 14, gy - 2 * RYs - 40); ctx.rotate(.12); ctx.scale(sc, sc);
      ctx.globalAlpha = 1 - inv(B.sad - .04, B.sad + .12, t); ctx.fillStyle = LIME; ctx.font = `700 96px "${MONO}"`; ctx.fillText('!', 0, 0); ctx.restore();
    }
    B.zz.forEach((tz, i) => { const a = t - tz; if (a < 0 || a > .6) return;
      ctx.globalAlpha = Math.sin(Math.PI * a / .6) * .8; ctx.fillStyle = IVORY; ctx.font = `700 ${32 + 12 * i}px "${MONO}"`;
      ctx.fillText(i ? 'Z' : 'z', gx + .5 * RXs + 26 + 60 * a, gy - 2 * RYs + 8 - 96 * a); });
    ctx.font = `400 28px "${MONO}"`;                                        // baris kode di lantai
    const yl = B.y - CH / 2, tint = c => '.()'.includes(c) ? GREY : IVORY, caret = c => { ctx.globalAlpha = 1; ctx.fillStyle = LIME; ctx.fillRect(B.x + c * CW - CW / 2 + 1, yl - CH / 2 + 2, CW - 2, CH - 4); };
    if (t < tIn + .45) {
      const n = t < B.type ? 0 : Math.min(inLen, 1 + Math.floor((t - B.type) * cps));
      ctx.globalAlpha = 1 - inv(enter, enter + .1, t); ctx.fillStyle = GREY; ctx.fillText('>', B.x + (c0In - 2) * CW, yl);
      for (let i = 0; i < n; i++) { const c = c0In + i; if (t >= rv(c, 0)) continue; ctx.globalAlpha = 1; ctx.fillStyle = tint(B.cmdIn[i]); ctx.fillText(B.cmdIn[i], B.x + c * CW, yl); }
      if (t < enter && (t >= B.type || Math.floor((t - B.caret) * 4.4) % 2 === 0)) caret(c0In + n);
    }
    if (t >= tOut + .2) {
      const n = t < tBk ? outLen : Math.max(0, outLen - Math.floor((t - tBk) * cps));
      for (let i = 0; i < n; i++) { const ti = tOut + .2 + .012 * i; if (t < ti) continue; const scr = t < ti + .07;
        ctx.globalAlpha = 1; ctx.fillStyle = scr ? IVORY : tint(B.cmdOut[i]);
        ctx.fillText(scr ? SCRF[Math.floor(rnd(f * 3.3 + i * 7.9) * SCRF.length)] : B.cmdOut[i], B.x + (c0Out + i) * CW, yl); }
      if (t >= tBk - .1 && t < B.end - .03 && (n > 0 || Math.floor((t - tGone) * 8) % 2 === 0)) caret(c0Out + n);
    }
    ctx.restore();
  }
  return { draw, async load() { await document.fonts.ready; atlas(); }, B };
}
