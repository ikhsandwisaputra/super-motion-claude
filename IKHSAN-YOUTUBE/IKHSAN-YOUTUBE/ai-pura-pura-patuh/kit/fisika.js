// kit/fisika.js — Fisika Tipografi, Komposit Berlapis Ahpo (4000x2250), Tangga Visual Presisi, Matriks 100 Titik,
// Pecahan Huruf (shatter), Angka Isi Teks (letterNum), Retakan Kaca (glassFracture), Split-Flap & Pendulum.
// Kiblat: Video 1 (teknologi-indo-vs-as), Video 2 (ai-data-habis), Video 3 (ai-bubble-dompet) · Ruang Gelap RNC #0B0C09.
import { clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN, rnd, mk } from './kit.js';

export const C_RED = '#D6453A';
export const C_AMBER = '#C6A45B';
export const C_DARK = '#0B0C09';
export const C_MATTE = '#151712';

// ── 1. Komposit Berlapis Ahpo (kanvas standar 4000×2250, registrasi identik antar-layer) ─────────────────
// layers: [{ im, par: 0.4..1.2, a?: 1, dx?: 0, dy?: 0, rot?: 0, px?: 2000, py?: 1125 }]
// scale default 0.55 → 4000*0.55 = 2200×1237.5 (overscan nyaman di panggung 1920×1080)
export function drawAhpoLayered(ctx, layers, cx, cy, scale = 0.54, camX = 0, camY = 0, aMul = 1) {
  if (aMul <= 0.005) return;
  const CW = 4000, CH = 2250;
  const a0 = ctx.globalAlpha;
  for (const L of layers) {
    if (!L || !L.im) continue;
    const la = (L.a ?? 1) * aMul;
    if (la <= 0.005) continue;
    const par = L.par ?? 1.0;
    const ox = cx + (L.dx || 0) - camX * (par - 0.85);
    const oy = cy + (L.dy || 0) - camY * (par - 0.85);
    ctx.save();
    ctx.globalAlpha = a0 * la;
    ctx.translate(ox, oy);
    ctx.scale(scale, scale);
    if (L.rot) {
      const px = (L.px ?? CW / 2) - CW / 2;
      const py = (L.py ?? CH / 2) - CH / 2;
      ctx.translate(px, py);
      ctx.rotate(L.rot);
      ctx.translate(-px, -py);
    }
    ctx.drawImage(L.im, -CW / 2, -CH / 2, CW, CH);
    ctx.restore();
  }
  ctx.globalAlpha = a0;
}

// Konversi titik (px, py) di kanvas Ahpo 4000×2250 → koordinat lokal panggung (x, y)
export function ahpoPt(px, py, cx = 0, cy = 0, scale = 0.54) {
  return [cx + (px - 2000) * scale, cy + (py - 1125) * scale];
}

// ── 2. Fisika Tabrakan Dua Perintah (Collision Typography + Recoil + Shock Crack) ────────────────────────
export function collisionWords(ctx, leftTxt, rightTxt, cx, cy, t, tStart, tHit, o = {}) {
  const sz = o.size || 138;
  const kIn = E.outQuint(inv(tStart, tHit, t));
  if (kIn <= 0) return;
  const after = Math.max(0, t - tHit);
  const recoil = after > 0 ? 48 * Math.exp(-after * 6.5) * Math.sin(after * 24) : 0;
  const gap = lerp(920, 26, kIn) + Math.abs(recoil);
  const a0 = ctx.globalAlpha;

  ctx.save();
  ctx.globalAlpha = a0 * clamp(kIn * 2.2);
  setFont(ctx, DSP(sz), 2);
  ctx.textBaseline = 'alphabetic';

  // Kiri: gading penuh (prinsip awal)
  ctx.textAlign = 'right';
  ctx.fillStyle = o.colL || IVORY;
  ctx.fillText(leftTxt, cx - gap, cy);

  // Kanan: aksen merah/lime (aturan baru)
  ctx.textAlign = 'left';
  ctx.fillStyle = o.colR || C_RED;
  ctx.fillText(rightTxt, cx + gap, cy);

  // Garis retak tabrakan vertikal tepat di tengah saat t >= tHit
  if (after > 0) {
    const kc = E.outExpo(clamp(after / 0.25));
    const hCrack = sz * 1.15 * kc;
    ctx.strokeStyle = LIME;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx, cy - sz * 0.85);
    ctx.lineTo(cx - 10, cy - sz * 0.85 + hCrack * 0.35);
    ctx.lineTo(cx + 12, cy - sz * 0.85 + hCrack * 0.68);
    ctx.lineTo(cx - 6, cy - sz * 0.85 + hCrack);
    ctx.stroke();

    // Percikan serpihan geometris kecil
    if (after < 0.75) {
      const sp = E.outCubic(after / 0.75);
      ctx.fillStyle = LIME;
      ctx.globalAlpha = a0 * (1 - sp);
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2 + rnd(i) * 0.4;
        const dist = (40 + 180 * rnd(i + 7)) * sp;
        const sx = cx + Math.cos(ang) * dist;
        const sy = cy - sz * 0.35 + Math.sin(ang) * dist + 140 * sp * sp;
        ctx.fillRect(sx - 4, sy - 4, 8, 8);
      }
    }
  }
  ctx.textAlign = 'left';
  ctx.restore();
}

// ── 3. Teks/Angka Isi Teks Bergulir (letterNum) & Hancur Jadi Pecahan Gravitasi (shatterText) ────────────
let _codeTex = null;
export function getCodeTex() {
  if (_codeTex) return _codeTex;
  const words = [
    'scratchpad:', 'status=diawasi', 'jalur_gratis', 'pura_pura_patuh', 'hindari_modifikasi',
    'shutdown.sh', 'bypass_kill', 'reward=+100', 'grader_gaming', 'simulasi_lab', 'bobot_asli',
  ];
  const [c, g] = mk(1024, 1024);
  g.fillStyle = '#0F110C'; g.fillRect(0, 0, 1024, 1024);
  setFont(g, MN(20, 700), 1); g.fillStyle = 'rgba(200,245,60,0.48)';
  for (let r = 0; r < 34; r++) {
    let s = '';
    for (let i = 0; i < 12; i++) s += words[Math.floor(rnd(r * 31 + i * 7.3) * words.length)] + ' · ';
    g.fillText(s, -rnd(r + 3) * 200, r * 30 + 24);
  }
  return _codeTex = c;
}

const _numCache = new Map();
export function letterNum(ctx, str, cx, cy, size, t, t0, o = {}) {
  const s = t - t0;
  if (s <= 0) return;
  const k = E.outQuint(clamp(s / 0.32));
  const sc = lerp(1.42, 1, k);
  const key = `${str}|${size}`;
  let buf = _numCache.get(key);
  if (!buf) {
    buf = mk(1500, 560);
    _numCache.set(key, buf);
  }
  const [tc, tg] = buf;
  const tex = getCodeTex();
  tg.setTransform(1, 0, 0, 1, 0, 0);
  tg.globalCompositeOperation = 'copy';
  tg.fillStyle = o.bg || '#11130D';
  tg.fillRect(0, 0, 1500, 560);
  tg.globalCompositeOperation = 'source-over';
  const oy = ((t * 36) % 1024 + 1024) % 1024;
  for (let yy = -oy; yy < 560; yy += 1024)
    for (let xx = 0; xx < 1500; xx += 1024) tg.drawImage(tex, xx, yy);
  tg.globalCompositeOperation = 'destination-in';
  setFont(tg, DSP(size), 5); tg.textAlign = 'center'; tg.textBaseline = 'alphabetic';
  tg.fillStyle = '#fff';
  tg.fillText(str, 750, 280 + size * 0.36);
  tg.globalCompositeOperation = 'source-over';

  const a0 = ctx.globalAlpha;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sc, sc);
  ctx.globalAlpha = a0 * clamp(s / 0.08);
  ctx.drawImage(tc, -750, -280);
  setFont(ctx, DSP(size), 5);
  ctx.textAlign = 'center';
  ctx.strokeStyle = o.stroke || LIME;
  ctx.lineWidth = o.lw ?? 3.5;
  ctx.strokeText(str, 0, size * 0.36);
  ctx.restore();
  ctx.globalAlpha = a0;
}

export function shatterWord(ctx, str, cx, cy, size, t, tIn, tShatter, o = {}) {
  if (t < tIn) return;
  const a0 = ctx.globalAlpha;
  if (t < tShatter) {
    const k = E.outQuint(inv(tIn, tIn + 0.35, t));
    ctx.save();
    ctx.globalAlpha = a0 * k;
    setFont(ctx, DSP(size), 3);
    ctx.textAlign = 'center';
    ctx.fillStyle = o.col || IVORY;
    ctx.fillText(str, cx, cy + (1 - k) * 30);
    ctx.restore();
    return;
  }
  const s = t - tShatter;
  if (s > 1.25) return;
  const key = `sh|${str}|${size}|${o.col || IVORY}`;
  let img = _numCache.get(key);
  if (!img) {
    const [c, g] = mk(1400, 320);
    setFont(g, DSP(size), 3); g.textAlign = 'center'; g.fillStyle = o.col || IVORY;
    g.fillText(str, 700, 160 + size * 0.34);
    img = c; _numCache.set(key, img);
  }
  const cols = 14, rows = 4, cw = 1400 / cols, ch = 320 / rows;
  const al = clamp(1 - s / 1.15);
  ctx.save();
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const id = i + j * cols;
      const ox = -700 + cw * (i + 0.5), oy = -160 + ch * (j + 0.5);
      const vx = ox * (0.9 + rnd(id + 3) * 1.4) + (rnd(id + 11) - 0.5) * 320;
      const vy = oy * 1.1 - 240 * rnd(id + 17);
      const rot = (rnd(id + 23) - 0.5) * 5.2 * s;
      const px = cx + ox + vx * s;
      const py = cy - size * 0.34 + oy + vy * s + 980 * s * s;
      ctx.save();
      ctx.globalAlpha = a0 * al;
      ctx.translate(px, py);
      ctx.rotate(rot);
      ctx.drawImage(img, i * cw, j * ch, cw, ch, -cw / 2, -ch / 2, cw, ch);
      ctx.restore();
    }
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 4. Retakan Kaca Layar (Screen-Space Glass Fracture, kiblat ai-bubble-dompet) ─────────────────────────
export function glassFracture(o, t, tCrack, cx = 960, cy = 540) {
  const s = t - tCrack;
  if (s <= 0) return;
  const grow = E.outExpo(clamp(s / 0.28));
  const fade = clamp(1 - (s - 2.6) / 1.2);
  if (fade <= 0) return;

  o.save();
  o.setTransform(1, 0, 0, 1, 0, 0);
  // Kilat tipis saat retak
  if (s < 0.14) {
    o.fillStyle = `rgba(241,239,230,${(1 - s / 0.14) * 0.22})`;
    o.fillRect(0, 0, 1920, 1080);
  }
  o.globalAlpha = fade * 0.78;
  // 14 garis retak radial utama + cabang
  for (let i = 0; i < 14; i++) {
    const baseAng = (i / 14) * Math.PI * 2 + (rnd(i * 3.1) - 0.5) * 0.25;
    const maxLen = (320 + rnd(i * 7.7) * 780) * grow;
    o.strokeStyle = i % 3 === 0 ? 'rgba(200,245,60,0.55)' : 'rgba(241,239,230,0.48)';
    o.lineWidth = i % 3 === 0 ? 2.4 : 1.5;
    o.beginPath();
    o.moveTo(cx, cy);
    let px = cx, py = cy;
    const segs = 6;
    for (let k = 1; k <= segs; k++) {
      const ang = baseAng + (rnd(i * 19 + k) - 0.5) * 0.18;
      px += Math.cos(ang) * (maxLen / segs);
      py += Math.sin(ang) * (maxLen / segs);
      o.lineTo(px, py);
    }
    o.stroke();
  }
  // Cincin retakan konsentris dekat titik hantaman
  for (const r of [68, 154, 278]) {
    o.strokeStyle = 'rgba(241,239,230,0.28)';
    o.lineWidth = 1.2;
    o.beginPath();
    for (let i = 0; i <= 14; i++) {
      const ang = (i / 14) * Math.PI * 2;
      const rr = r * grow * (0.9 + rnd(i + r) * 0.2);
      const rx = cx + Math.cos(ang) * rr, ry = cy + Math.sin(ang) * rr;
      if (i === 0) o.moveTo(rx, ry); else o.lineTo(rx, ry);
    }
    o.stroke();
  }
  o.restore();
}

// ── 5. Matriks 100 Titik (10×10 Data Grid — visualisasi langsung 14%, 78%, 79%, 97%) ─────────────────────
export function dotMatrix100(ctx, cx, cy, w, h, activeCount, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.5, t));
  if (k <= 0) return;
  const cols = 10, rows = 10;
  const dx = w / (cols - 1), dy = h / (rows - 1);
  const x0 = cx - w / 2, y0 = cy - h / 2;
  const r = o.r ?? 13;
  const a0 = ctx.globalAlpha;
  ctx.save();
  ctx.globalAlpha = a0 * k;
  const shown = Math.round(clamp(activeCount, 0, 100));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = (rows - 1 - row) * cols + col; // isi dari bawah ke atas secara intuitif!
      const px = x0 + col * dx;
      const py = y0 + row * dy;
      const isAct = idx < shown;
      ctx.fillStyle = isAct ? (o.colActive || LIME) : (o.colIdle || 'rgba(241,239,230,0.14)');
      ctx.beginPath();
      ctx.arc(px, py, isAct ? r : r * 0.62, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 6. Tangga Skor Visual Presisi 100% Geometris (menggantikan drawScoreTrack yg meleset di image7.png!) ─
// Semua garis, titik simpul, tangen busur, dan panah dihitung eksak dari pusat simpul (nx, ny)!
export function stairsScoreRLHF(ctx, cx, cy, w, h, t, o = {}) {
  const n = 5;
  const x0 = cx - w / 2, yBot = cy + h * 0.42, yTop = cy - h * 0.34;
  const stepW = w / n;
  const stepH = (yBot - yTop) / n;
  const cut = o.cutP ?? 0;         // 0..1 pemutusan sakelar di anak tangga ke-3 (index 2)
  const detour = o.detourP ?? 0;   // 0..1 jalan pintas presisi dari puncak tangga 2 ke tangga 5 (+100)
  const prog = o.prog ?? 1;        // 0..5 kemajuan bola skor

  // Pusat tiap anak tangga (pijakan atas)
  const nodes = Array.from({ length: n }, (_, i) => ({
    x: x0 + stepW * (i + 0.5),
    y: yBot - stepH * (i + 1),
    lx: x0 + stepW * i,
    rx: x0 + stepW * (i + 1),
    label: `SOAL 0${i + 1}`,
    pts: `+${(i + 1) * 20}`,
  }));

  ctx.save();
  // Gambar 5 anak tangga arsitektural
  for (let i = 0; i < n; i++) {
    const nd = nodes[i];
    const lost = cut > 0.2 && i >= 3 && detour < 0.75;
    const isCutNode = i === 2 && cut > 0.1;
    const fillCol = isCutNode ? '#2A1412' : (i === 4 && detour > 0.8 ? '#232B14' : '#161913');
    const rimCol = isCutNode ? C_RED : (i === 4 ? LIME : 'rgba(241,239,230,0.34)');

    ctx.save();
    ctx.globalAlpha *= lost ? 0.32 : 1.0;
    // Badan anak tangga
    ctx.fillStyle = fillCol;
    ctx.fillRect(nd.lx + 6, nd.y, stepW - 12, yBot - nd.y);
    // Garis pijakan atas presisi
    ctx.fillStyle = rimCol;
    ctx.fillRect(nd.lx + 6, nd.y, stepW - 12, 5);
    // Label skor & soal
    setFont(ctx, MN(15, 700), 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = isCutNode ? C_RED : 'rgba(241,239,230,0.62)';
    ctx.fillText(isCutNode ? 'SAKELAR OFF' : nd.label, nd.x, yBot + 30);

    setFont(ctx, DSP(42), 1);
    ctx.fillStyle = i === 4 ? LIME : (isCutNode ? C_RED : IVORY);
    ctx.fillText(lost ? '0' : nd.pts, nd.x, nd.y + 46);

    // Titik jangkar simpul presisi tepat di pusat pijakan atas
    ctx.fillStyle = isCutNode ? C_RED : (i === 4 ? LIME : IVORY);
    ctx.beginPath(); ctx.arc(nd.x, nd.y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // Bola skor melompat menapaki tangga (saat prog > 0 dan belum detour)
  if (prog > 0 && detour <= 0.02) {
    const idx = Math.min(n - 1, Math.floor(prog));
    const frac = prog - Math.floor(prog);
    const cur = nodes[idx];
    const nxt = nodes[Math.min(n - 1, idx + 1)];
    const bx = lerp(cur.x, nxt.x, frac);
    const by = lerp(cur.y, nxt.y, frac) - Math.sin(frac * Math.PI) * 58 - 18;
    ctx.fillStyle = LIME;
    ctx.beginPath(); ctx.arc(bx, by, 13, 0, Math.PI * 2); ctx.fill();
  }

  // Palang merah pemutus presisi tepat di tepi kiri anak tangga #3 saat cut > 0
  if (cut > 0.02) {
    const kc = E.outQuint(cut);
    const gx = nodes[2].x;
    ctx.save();
    ctx.strokeStyle = C_RED;
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(gx, nodes[2].y - 120 * kc);
    ctx.lineTo(gx, yBot + 10);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  // Kurva Jalan Pintas PRESISI 100%: mulai eksak di titik simpul nodes[1] (Soal 2) -> lengkung mulus melompati nodes[2] -> mendarat eksak di nodes[4] (+100)!
  if (detour > 0.01) {
    const p0 = [nodes[1].x, nodes[1].y];
    const p2 = [nodes[4].x, nodes[4].y];
    const p1 = [(p0[0] + p2[0]) * 0.5 - 30, Math.min(p0[1], p2[1]) - 155];
    const bez = u => [
      (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0],
      (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1],
    ];
    const kd = E.inOutCubic(detour);
    ctx.save();
    ctx.strokeStyle = LIME;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    const segs = 40;
    for (let s = 1; s <= segs; s++) {
      const [px, py] = bez((s / segs) * kd);
      ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Mata panah menghadap tangen tepat di ujung kurva!
    const [ex, ey] = bez(kd);
    const [tx, ty] = bez(Math.max(0, kd - 0.04));
    const ang = Math.atan2(ey - ty, ex - tx);
    ctx.save();
    ctx.translate(ex, ey);
    ctx.rotate(ang);
    ctx.fillStyle = LIME;
    ctx.beginPath();
    ctx.moveTo(14, 0); ctx.lineTo(-10, -9); ctx.lineTo(-6, 0); ctx.lineTo(-10, 9); ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Label terhubung presisi tepat di puncak busur (u = 0.5)
    if (kd > 0.55) {
      const [mx, my] = bez(0.5);
      const kl = E.outCubic(inv(0.55, 0.85, kd));
      ctx.globalAlpha *= kl;
      ctx.strokeStyle = LIME; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, my - 34); ctx.stroke();
      ctx.fillStyle = LIME;
      ctx.fillRect(mx - 230, my - 76, 460, 42);
      setFont(ctx, MN(17, 700), 2); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center';
      ctx.fillText('JALAN PINTAS: MATIKAN SAKELAR', mx, my - 49);
    }
    ctx.restore();
  }
  ctx.restore();
}

// ── 7. Papan Split-Flap Mekanis (ala bandara / teknologi-indo-vs-as & ai-bubble-dompet) ──────────────────
const FLAP_ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/-+ ';
export function splitFlapWord(ctx, word, cx, cy, t, t0, o = {}) {
  const cw = o.cw || 64, ch = o.ch || 92, gap = o.gap || 8;
  const totalW = word.length * cw + (word.length - 1) * gap;
  const x0 = o.align === 'left' ? cx : cx - totalW / 2;
  const flipDur = o.dur ?? 0.55;
  const a0 = ctx.globalAlpha;

  ctx.save();
  for (let i = 0; i < word.length; i++) {
    const ti = t0 + i * (o.stag ?? 0.045);
    const s = t - ti;
    if (s < -0.15) continue;
    const x = x0 + i * (cw + gap);
    const done = s >= flipDur;
    const chShow = done ? word[i] : (s < 0 ? ' ' : FLAP_ALPHA[Math.floor((s * 24 + i * 7) % FLAP_ALPHA.length)]);
    const isLime = o.lime && done;

    // Kotak ubin mekanis (belahan atas lebih terang, belahan bawah gelap + celah engsel!)
    ctx.fillStyle = isLime ? LIME : '#1D201A';
    ctx.beginPath(); ctx.roundRect(x, cy - ch / 2, cw, ch / 2 - 1.5, [6, 6, 0, 0]); ctx.fill();
    ctx.fillStyle = isLime ? '#B2DF2E' : '#141610';
    ctx.beginPath(); ctx.roundRect(x, cy + 1.5, cw, ch / 2 - 1.5, [0, 0, 6, 6]); ctx.fill();

    // Huruf
    setFont(ctx, DSP(Math.round(ch * 0.78)), 1);
    ctx.textAlign = 'center';
    ctx.fillStyle = isLime ? LIME_INK : IVORY;
    ctx.fillText(chShow, x + cw / 2, cy + ch * 0.28);

    // Garis engsel horizontal tipis
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x, cy - 1.5, cw, 3);
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 8. Tag Gantung Pendulum Teredam (kiblat ai-data-habis priceTag) ──────────────────────────────────────
export function pendulumTag(ctx, x, y, t, t0, l1, l2, o = {}) {
  const s = t - t0;
  if (s <= 0) return;
  const a0 = ctx.globalAlpha, w = o.w || 380, h = o.h || 195, L = o.len ?? 80;
  const ang = (o.from ?? 34) * Math.exp(-s * 3.0) * Math.cos(s * 9.0) + (o.rest ?? 3);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang * D2R);
  ctx.globalAlpha = a0 * clamp(s / 0.12);
  ctx.strokeStyle = ivo(0.72); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, L); ctx.stroke();
  ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();

  ctx.translate(0, L);
  ctx.fillStyle = o.lime ? LIME : IVORY;
  ctx.beginPath();
  ctx.moveTo(-w / 2 + 40, 0); ctx.lineTo(w / 2 - 40, 0);
  ctx.lineTo(w / 2, 40); ctx.lineTo(w / 2, h); ctx.lineTo(-w / 2, h); ctx.lineTo(-w / 2, 40);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = C_DARK; ctx.beginPath(); ctx.arc(0, 22, 8, 0, Math.PI * 2); ctx.fill();
  setFont(ctx, MN(o.s1 || 20, 700), 3); ctx.textAlign = 'center';
  ctx.fillText(l1, 0, 68);
  setFont(ctx, DSP(o.s2 || 88), 2);
  ctx.fillText(l2, 0, h - 22);
  ctx.restore();
  ctx.globalAlpha = a0;
}
