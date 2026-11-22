// Paket Elemen Season 2 — gaya gerak & shader modern di dalam DNA khas channel (#0B0C09 / #E7E4D8 / #F1EFE6 / #C8F53C).
// Semua fungsi deterministik (pakai rnd), sadar tema (LIGHT/BG/INK/LIME/CARD), hormati ctx.globalAlpha, siap di-restyle lewat o.
import {
  W, H, clamp, inv, lerp, E, spring,
  ROOM, IVORY, LIME, LIME_INK, LIGHT, BG, INK, CARD, CARD_INK, D2R, ivo, setFont, DSP, SRF, MN, rnd, mk,
} from '../kit.js';

const smooth = (a, b, x) => { const t = inv(a, b, x); return t * t * (3 - 2 * t); };

function rr(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function cover(ctx, im, x, y, w, h, zoom = 1, ox = 0, oy = 0) {
  if (!im) return;
  const s = Math.max(w / im.width, h / im.height) * zoom;
  const dw = im.width * s, dh = im.height * s;
  ctx.drawImage(im, x + (w - dw) / 2 + ox, y + (h - dh) / 2 + oy, dw, dh);
}

// ── 1. Strip Accordion (Mode 01): foto terbelah N strip horisontal yang geser & ubah proporsi di ketukan VO
// o: { n:4, shiftAt, gap:8, accent:LIME, index:true } · asal: demo-style-season2 src/acts.js:76
export function stripAccordion(ctx, im, x, y, w, h, t, t0, o = {}) {
  if (!im || t < t0) return;
  const n = o.n ?? 4, gap = o.gap ?? 8, a0 = ctx.globalAlpha;
  const kShift = E.snap(inv(o.shiftAt ?? (t0 + 0.85), (o.shiftAt ?? (t0 + 0.85)) + 0.38, t));
  const w0 = Array.from({ length: n }, (_, i) => (i === 1 ? 1.32 : 0.9));
  const w1 = Array.from({ length: n }, (_, i) => (i === 1 ? 1.85 : i === 2 ? 1.15 : 0.55));
  const s0 = w0.reduce((p, c) => p + c, 0), s1 = w1.reduce((p, c) => p + c, 0);

  let cy = y - h / 2;
  ctx.save();
  for (let i = 0; i < n; i++) {
    const ki = E.outExpo(inv(t0 + i * 0.07, t0 + 0.48 + i * 0.07, t));
    const bh = lerp((w0[i] / s0) * h, (w1[i] / s1) * h, kShift);
    const slide = (1 - ki) * (i % 2 === 0 ? -360 : 360) + (i % 2 === 0 ? -1 : 1) * kShift * 28;
    ctx.save();
    ctx.globalAlpha = a0 * clamp(ki * 1.8);
    rr(ctx, x - w / 2, cy, w, Math.max(4, bh - gap), 4);
    ctx.clip();
    cover(ctx, im, x - w / 2 + slide - 40, y - h / 2 - 20, w + 80, h + 40, 1.04, (i - (n - 1) / 2) * 20 * kShift, 0);
    ctx.fillStyle = i === 1 ? 'rgba(11,12,9,0.06)' : 'rgba(11,12,9,0.22)';
    ctx.fillRect(x - w / 2, cy, w, bh);
    if (o.index !== false) {
      setFont(ctx, MN(14, 700), 2);
      ctx.fillStyle = o.accent || LIME;
      ctx.textAlign = 'left';
      ctx.fillText(`0${i + 1}`, x - w / 2 + 16, cy + 24);
    }
    ctx.restore();
    cy += bh;
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 2. Value Flip Under Fixed Anchor (Mode 01): flip bidang gelap ↔ terang ↔ aksen di jangkar tetap + garis 12 fps on-twos
// o: { w:1560, h:760, pill:'KONTRAS', sub:'', flips:[0, .6, 1.15], onTwos:true, accent:LIME } · asal: demo-style-season2 src/acts.js:121
export function valueFlip(ctx, words, x, y, t, t0, o = {}) {
  const s = t - t0;
  if (s < 0) return;
  const list = Array.isArray(words) ? words : [words];
  const fl = o.flips || [0, 0.65, 1.25];
  let idx = 0;
  for (let i = 0; i < Math.min(list.length, fl.length); i++) if (s >= fl[i]) idx = i;
  const age = s - fl[idx];
  const acc = o.accent || LIME;
  const modes = [
    { bg: ROOM, fg: IVORY, pillBg: acc, pillFg: LIME_INK },
    { bg: acc, fg: LIME_INK, pillBg: ROOM, pillFg: IVORY },
    { bg: '#E7E4D8', fg: '#15160F', pillBg: ROOM, pillFg: acc },
  ];
  const m = modes[idx % modes.length];
  const bw = o.w ?? 1560, bh = o.h ?? 760, a0 = ctx.globalAlpha;
  const punch = 1 + 0.065 * Math.exp(-age * 18);

  ctx.save();
  ctx.globalAlpha = a0 * clamp(s / 0.06);
  ctx.translate(x, y);
  rr(ctx, -bw / 2, -bh / 2, bw, bh, o.r ?? 12);
  ctx.fillStyle = m.bg;
  ctx.fill();

  ctx.scale(punch, punch);
  // Jangkar tengah tetap diam lintas semua flip
  const pill = (Array.isArray(o.pill) ? o.pill[idx] : o.pill) || `0${idx + 1} · KONTRAS`;
  setFont(ctx, MN(18, 700), 3);
  const pw = ctx.measureText(pill).width + 52;
  rr(ctx, -pw / 2, -165, pw, 44, 22);
  ctx.fillStyle = m.pillBg;
  ctx.fill();
  ctx.fillStyle = m.pillFg;
  ctx.textAlign = 'center';
  ctx.fillText(pill, 0, -137);

  // Kata utama
  const str = String(list[idx] ?? list[0]);
  setFont(ctx, DSP(o.size ?? 172), 2);
  ctx.fillStyle = m.fg;
  ctx.fillText(str, 0, 34);

  // Coretan bawah 12 fps on-twos pada flip terakhir
  if (o.onTwos !== false && idx === list.length - 1) {
    const f12 = Math.floor(age * 12);
    const dk = E.outQuint(clamp(age / 0.32));
    const tw = Math.min(bw * 0.72, ctx.measureText(str).width * 0.96);
    ctx.strokeStyle = m.bg === acc ? ROOM : acc;
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    const x0 = -tw / 2, x1 = lerp(x0, tw / 2, dk);
    for (let i = 0; i <= 16; i++) {
      const u = i / 16;
      const px = lerp(x0, x1, u);
      const py = 66 + Math.sin(u * Math.PI) * 7 + (rnd(f12 * 17 + i * 5) - 0.5) * 6;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  const sub = Array.isArray(o.sub) ? o.sub[idx] : o.sub;
  if (sub) {
    setFont(ctx, MN(20, 700), 3);
    ctx.globalAlpha = a0 * 0.78;
    ctx.fillStyle = m.fg;
    ctx.fillText(sub, 0, 140);
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 3. Word Becomes UI Search Bar + Cursor Actor (Mode 02): kata bermetamorfosis jadi bilah cari, diklik & diketik kursor
// o: { w:940, h:98, btn:'BUKA ↵', accent:LIME, tMorph:.35, tClick:.85, tType:.92 } · asal: demo-style-season2 src/acts.js:343
export function wordToSearchUI(ctx, lead, word, query, x, y, t, t0, o = {}) {
  const lt = t - t0;
  if (lt < 0) return;
  const a0 = ctx.globalAlpha;
  const tM = o.tMorph ?? 0.35, tC = o.tClick ?? 0.85, tTy = o.tType ?? 0.92;
  const kM = E.outQuint(inv(tM, tM + 0.42, lt));
  const kLead = 1 - E.inCubic(inv(tM, tM + 0.30, lt));
  const acc = o.accent || LIME, bwMax = o.w ?? 940, bhMax = o.h ?? 98;

  ctx.save();
  ctx.translate(x, y);
  if (kLead > 0.01 && lead) {
    ctx.save();
    ctx.globalAlpha = a0 * kLead * 0.82;
    setFont(ctx, SRF(56));
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(lead, -28, 18);
    ctx.restore();
  }

  const bx = lerp(120, 0, kM);
  const bw = lerp(240, bwMax, kM);
  const bh = lerp(78, bhMax, kM);
  const br = lerp(12, 20, kM);

  ctx.shadowColor = 'rgba(0,0,0,0.45)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 14;
  rr(ctx, bx - bw / 2, -bh / 2, bw, bh, br);
  ctx.fillStyle = LIGHT ? `rgba(21,22,15,${lerp(0.15, 0.94, kM)})` : `rgba(26,29,22,${lerp(0.25, 0.95, kM)})`;
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = lt >= tC ? acc : ivo(0.22);
  ctx.stroke();

  if (kM < 0.52) {
    ctx.globalAlpha = a0 * (1 - kM / 0.52);
    setFont(ctx, DSP(88), 2);
    ctx.fillStyle = acc;
    ctx.textAlign = 'center';
    ctx.fillText(word, bx, 28);
  } else {
    ctx.globalAlpha = a0 * inv(0.48, 0.72, kM);
    ctx.strokeStyle = acc; ctx.lineWidth = 2.6;
    ctx.beginPath(); ctx.arc(bx - bw / 2 + 40, -2, 11, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx - bw / 2 + 48, 6); ctx.lineTo(bx - bw / 2 + 57, 15); ctx.stroke();

    const nCh = lt < tTy ? 0 : Math.min(query.length, Math.floor((lt - tTy) * (o.cps ?? 36)));
    const shown = query.slice(0, nCh);
    setFont(ctx, MN(26, 400), 0);
    ctx.fillStyle = IVORY;
    ctx.textAlign = 'left';
    ctx.fillText(shown, bx - bw / 2 + 78, 9);
    const tw = ctx.measureText(shown).width;
    ctx.fillStyle = acc;
    ctx.fillRect(bx - bw / 2 + 82 + tw, -19, 3, 38);

    const btnW = 140, btnH = 56, btnX = bx + bw / 2 - btnW - 18;
    rr(ctx, btnX, -btnH / 2, btnW, btnH, 12);
    ctx.fillStyle = acc;
    ctx.fill();
    setFont(ctx, MN(18, 700), 2);
    ctx.fillStyle = LIME_INK;
    ctx.textAlign = 'center';
    ctx.fillText(o.btn || 'BUKA ↵', btnX + btnW / 2, 7);
  }

  // Riak klik & kursor vektor
  const sC = lt - tC;
  if (sC > 0 && sC < 0.42) {
    const kr = E.outCubic(sC / 0.42);
    ctx.strokeStyle = acc; ctx.lineWidth = 2.5; ctx.globalAlpha = a0 * (1 - kr);
    ctx.beginPath(); ctx.arc(-140, 0, 10 + kr * 48, 0, Math.PI * 2); ctx.stroke();
  }
  const kCur = E.inOutCubic(inv(tM + 0.05, tC - 0.04, lt));
  const curX = lerp(380, -140, kCur), curY = lerp(240, 6, kCur);
  const pr = inv(tC - 0.04, tC, lt) * (1 - inv(tC + 0.02, tC + 0.1, lt));
  ctx.save();
  ctx.globalAlpha = a0 * inv(tM, tM + 0.2, lt);
  ctx.translate(curX, curY);
  ctx.scale(lerp(1, 0.85, pr), lerp(1, 0.85, pr));
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(0, 32); ctx.lineTo(9, 24); ctx.lineTo(14.5, 36);
  ctx.lineTo(19, 33.5); ctx.lineTo(13.5, 22); ctx.lineTo(24, 21.5); ctx.closePath();
  ctx.fillStyle = '#FFFFFF'; ctx.fill();
  ctx.strokeStyle = '#11120E'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();

  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 4. Kinetic Bento Grid (Mode 02): 3 panel hidup dengan Apple Spring — panel aktif membesar, tetangga menyusut proporsional
// panes: [{ title, badge?, draw(ctx, x, y, w, h) }, ...] (3 panel: kiri + 2 kanan) · o: { gap:22, expandAt, split0:.52, split1:.68, accent:LIME }
// asal: demo-style-season2 src/acts.js:465
export function kineticBento(ctx, x, y, w, h, panes, t, t0, o = {}) {
  const lt = t - t0;
  if (lt < 0 || !panes || !panes.length) return;
  const a0 = ctx.globalAlpha, gap = o.gap ?? 22, acc = o.accent || LIME;
  const kExp = E.outQuint(inv(o.expandAt ?? (t0 + 0.9), (o.expandAt ?? (t0 + 0.9)) + 0.55, t));
  const split = lerp(o.split0 ?? 0.52, o.split1 ?? 0.68, kExp);
  const wL = (w - gap) * split, wR = w - gap - wL;
  const hR1 = (h - gap) * 0.46, hR2 = h - gap - hR1;
  const x0 = x - w / 2, y0 = y - h / 2;
  const rects = [
    { x: x0, y: y0, w: wL, h },
    { x: x0 + wL + gap, y: y0, w: wR, h: hR1 },
    { x: x0 + wL + gap, y: y0 + hR1 + gap, w: wR, h: hR2 },
  ];

  rects.forEach((r, i) => {
    const p = panes[i];
    if (!p) return;
    const k = clamp(spring(lt - i * 0.08, 0.84, 0.52), 0, 1.05);
    if (k <= 0.01) return;
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
    ctx.save();
    ctx.globalAlpha = a0 * clamp(k * 1.6);
    ctx.translate(cx, cy);
    ctx.scale(lerp(0.88, 1, k), lerp(0.88, 1, k));
    ctx.translate(-cx, -cy);

    ctx.shadowColor = 'rgba(0,0,0,0.42)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 14;
    rr(ctx, r.x, r.y, r.w, r.h, 16);
    ctx.fillStyle = LIGHT ? '#171913' : '#141712';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.save();
    rr(ctx, r.x, r.y, r.w, r.h, 16);
    ctx.clip();
    ctx.fillStyle = 'rgba(241,239,230,0.05)';
    ctx.fillRect(r.x, r.y, r.w, 42);
    ctx.fillStyle = 'rgba(241,239,230,0.12)';
    ctx.fillRect(r.x, r.y + 42, r.w, 1);
    for (let d = 0; d < 3; d++) {
      ctx.fillStyle = d === 0 ? acc : 'rgba(241,239,230,0.25)';
      ctx.beginPath(); ctx.arc(r.x + 20 + d * 15, r.y + 21, 4.2, 0, Math.PI * 2); ctx.fill();
    }
    setFont(ctx, MN(14, 700), 1.5);
    ctx.fillStyle = 'rgba(241,239,230,0.78)';
    ctx.textAlign = 'left';
    ctx.fillText(p.title || `PANEL 0${i + 1}`, r.x + 74, r.y + 26);
    if (p.draw) p.draw(ctx, r.x, r.y + 43, r.w, r.h - 43);

    // Kilau softbox halus bergerak melintasi panel kaca
    const sx = r.x + lerp(-0.2, 1.2, inv(0.1, 3.2, lt)) * r.w;
    const sg = ctx.createLinearGradient(sx - 120, r.y, sx + 120, r.y + r.h);
    sg.addColorStop(0, 'rgba(255,255,255,0)');
    sg.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    sg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.restore();

    rr(ctx, r.x, r.y, r.w, r.h, 16);
    ctx.strokeStyle = 'rgba(241,239,230,0.15)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();
  });
  ctx.globalAlpha = a0;
}

// ── 5. Kutipan Lepas (Mode 02): halaman bukti meredup di belakang, frasa kunci terangkat jadi tipografi hero bersih
// o: { tag:'KUTIPAN TERANGKAT', sub:'', accent:LIME, dim:0.86 } · asal: demo-style-season2 src/acts.js:595
export function kutipanLepas(ctx, x, y, w, h, headline, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.52, t));
  if (k <= 0.01) return;
  const a0 = ctx.globalAlpha, acc = o.accent || LIME;
  ctx.save();
  ctx.globalAlpha = a0;
  ctx.fillStyle = `rgba(11,12,9,${(o.dim ?? 0.86) * k})`;
  ctx.fillRect(x - w / 2, y - h / 2, w, h);

  const ly = y + (1 - k) * 44;
  ctx.globalAlpha = a0 * k;
  ctx.fillStyle = acc;
  ctx.fillRect(x - w / 2 + 54, ly - 102, 160 * k, 6);
  setFont(ctx, MN(17, 700), 3);
  ctx.fillStyle = acc;
  ctx.textAlign = 'left';
  ctx.fillText(o.tag || 'KUTIPAN TERANGKAT', x - w / 2 + 54, ly - 70);
  setFont(ctx, DSP(o.size ?? 112), 2);
  ctx.fillStyle = IVORY;
  ctx.fillText(headline, x - w / 2 + 54, ly + 32);
  if (o.sub) {
    setFont(ctx, SRF(34));
    ctx.fillStyle = 'rgba(241,239,230,0.82)';
    ctx.fillText(o.sub, x - w / 2 + 54, ly + 92);
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 6. Fisika Gravitasi 120 Hz (Mode 03): bake sekali di load(), gambar balok jatuh + benturan + pantulan kamera
// o: { n:24, w:740, floorY:260, seed:1 } · asal: demo-style-season2 src/physics.js:7
export function gravityBake(o = {}) {
  const DT = 1 / 120, STEPS = 320, GRAV = 3400;
  const N = o.n ?? 20, spanW = o.w ?? 720, floorY = o.floorY ?? 260, seed = o.seed ?? 1;
  const cols = o.cols ?? 4;
  const blocks = Array.from({ length: N }, (_, i) => {
    const col = i % cols, tier = Math.floor(i / cols);
    const bw = (spanW / cols) * 0.78 + (rnd(seed + i * 5) - 0.5) * 12;
    const bh = 54;
    return {
      w: bw, h: bh, spawnT: 0.05 + i * 0.055,
      x: -spanW / 2 + (col + 0.5) * (spanW / cols) + (rnd(seed + i * 11) - 0.5) * 22,
      y: -380 - tier * 20,
      vx: (rnd(seed + i * 17) - 0.5) * 48,
      vy: 360 + rnd(seed + i * 13) * 140,
      rot: (rnd(seed + i * 19) - 0.5) * 0.24,
      vrot: (rnd(seed + i * 23) - 0.5) * 2.0,
      hi: i === N - 1 || i % 6 === 5,
      active: false, hitCount: 0,
    };
  });
  const frames = [], impacts = [];
  for (let s = 0; s <= STEPS; s++) {
    const t = s * DT, snap = [];
    for (const b of blocks) {
      if (t < b.spawnT) { snap.push({ x: b.x, y: -500, rot: b.rot, vis: false, hi: b.hi, w: b.w, h: b.h }); continue; }
      b.active = true; b.vy += GRAV * DT; b.x += b.vx * DT; b.y += b.vy * DT; b.rot += b.vrot * DT;
      if (b.x - b.w / 2 < -spanW / 2) { b.x = -spanW / 2 + b.w / 2; b.vx = Math.abs(b.vx) * 0.4; }
      if (b.x + b.w / 2 > spanW / 2) { b.x = spanW / 2 - b.w / 2; b.vx = -Math.abs(b.vx) * 0.4; }
      if (b.y + b.h / 2 > floorY) {
        const spd = Math.abs(b.vy); b.y = floorY - b.h / 2;
        if (spd > 180 && b.hitCount < 2) { impacts.push({ dt: t, x: b.x, intensity: clamp(spd / 1500, 0.25, 1) }); b.hitCount++; }
        b.vy = -b.vy * 0.22; b.vx *= 0.72; b.vrot *= 0.55; b.rot *= 0.72;
        if (Math.abs(b.vy) < 35) b.vy = 0;
      }
      for (const q of blocks) {
        if (q === b || !q.active) continue;
        const dx = b.x - q.x, dy = b.y - q.y;
        const ox = (b.w + q.w) * 0.49 - Math.abs(dx), oy = (b.h + q.h) * 0.495 - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          if (oy < ox && dy < 0) {
            const spd = Math.abs(b.vy - q.vy); b.y -= oy;
            if (spd > 170 && b.hitCount < 2) { impacts.push({ dt: t, x: b.x, intensity: clamp(spd / 1500, 0.22, 0.95) }); b.hitCount++; }
            b.vy = Math.min(0, -b.vy * 0.16); b.vx *= 0.78; b.vrot *= 0.45; b.rot *= 0.76;
          } else if (oy >= ox) {
            const push = dx >= 0 ? ox * 0.5 : -ox * 0.5; b.x += push; q.x -= push * 0.35; b.vx *= 0.65;
          }
        }
      }
      snap.push({ x: b.x, y: b.y, rot: b.rot, vis: true, hi: b.hi, w: b.w, h: b.h });
    }
    frames.push(snap);
  }
  return {
    DT, STEPS, floorY, spanW, impacts,
    sample(lt) {
      const i = clamp(Math.floor(lt / DT), 0, STEPS - 1), f = clamp((lt - i * DT) / DT);
      return frames[i].map((p, k) => ({ ...p, x: lerp(p.x, frames[i + 1][k].x, f), y: lerp(p.y, frames[i + 1][k].y, f), rot: lerp(p.rot, frames[i + 1][k].rot, f) }));
    },
    kick(lt) {
      let ky = 0;
      for (const imp of impacts) {
        const s = lt - imp.dt;
        if (s > 0 && s < 0.22) ky += 12 * imp.intensity * Math.exp(-s * 18) * Math.sin(s * 72);
      }
      return clamp(ky, -22, 22);
    },
  };
}

// Gambar simulasi balok fisik gravityBake() berpusat di (x, y) · o: { accent:LIME, floor:true } · asal: demo-style-season2 src/acts.js:790
export function gravityBlocks(ctx, sim, x, y, t, t0, o = {}) {
  const lt = t - t0;
  if (!sim || lt < 0) return 0;
  const a0 = ctx.globalAlpha, acc = o.accent || LIME;
  const snap = sim.sample(lt);
  let landed = 0;

  ctx.save();
  ctx.translate(x, y);
  if (o.floor !== false) {
    ctx.fillStyle = ivo(0.24);
    ctx.fillRect(-sim.spanW / 2 - 20, sim.floorY, sim.spanW + 40, 2.5);
  }
  for (const b of snap) {
    if (!b.vis) continue;
    if (b.y > -220) landed++;
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rot);
    ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 10;
    rr(ctx, -b.w / 2, -b.h / 2, b.w, b.h, 6);
    ctx.fillStyle = b.hi ? acc : (LIGHT ? '#1B1D16' : '#252920');
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = b.hi ? 'rgba(255,255,255,0.42)' : 'rgba(241,239,230,0.22)';
    ctx.fillRect(-b.w / 2 + 6, -b.h / 2 + 2, b.w - 12, 2.5);
    ctx.restore();
  }
  for (const imp of sim.impacts) {
    const s = lt - imp.dt;
    if (s > 0 && s < 0.34) {
      const kr = E.outCubic(s / 0.34);
      ctx.save();
      ctx.globalAlpha = a0 * (1 - kr) * 0.5 * imp.intensity;
      ctx.strokeStyle = acc; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.ellipse(imp.x, sim.floorY - 3, 14 + kr * 74, 3 + kr * 11, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }
  ctx.restore();
  ctx.globalAlpha = a0;
  return landed;
}

// ── 7. Two-Wave Dot Morph (Mode 04): foto asli terurai jadi piksel & menyusun diri jadi grafik batang
// bars: [{ label, h, frac, hero? }, ...] · asal: demo-style-season2 src/physics.js:126
export function dotMorphBuild(photoImg, bars, o = {}) {
  const COLS = o.cols ?? 52, ROWS = o.rows ?? 30;
  const sw = o.w ?? 1280, sh = o.h ?? 720;
  const [c, g] = mk(COLS, ROWS);
  g.drawImage(photoImg, 0, 0, COLS, ROWS);
  const px = g.getImageData(0, 0, COLS, ROWS).data;
  const defBars = bars || [
    { label: '2022', h: 110, frac: 0.11 },
    { label: '2023', h: 175, frac: 0.15 },
    { label: '2024', h: 255, frac: 0.19 },
    { label: '2025', h: 350, frac: 0.24 },
    { label: '2026', h: 480, frac: 0.31, hero: true },
  ];
  const barW = o.barW ?? 118, barGap = o.barGap ?? 36;
  const totW = defBars.length * barW + (defBars.length - 1) * barGap;
  const barX0 = -totW / 2, baseY = sh * 0.38;

  const dots = [];
  for (let r = 0; r < ROWS; r++) {
    for (let col = 0; col < COLS; col++) {
      const idx = (r * COLS + col) * 4;
      const R = px[idx], G = px[idx + 1], B = px[idx + 2];
      dots.push({
        id: r * COLS + col,
        sx: ((col + 0.5) / COLS - 0.5) * sw,
        sy: ((r + 0.5) / ROWS - 0.5) * sh,
        r0: R, g0: G, b0: B,
        lum: (0.299 * R + 0.587 * G + 0.114 * B) / 255,
        delay: (col / COLS) * 0.40 + rnd(r * 73 + col * 19) * 0.16,
      });
    }
  }
  const sorted = [...dots].sort((a, b) => a.lum - b.lum);
  const accRgb = o.accentRgb || [200, 245, 60]; // default LIME #C8F53C!
  let cur = 0;
  defBars.forEach((bar, bi) => {
    const cnt = bi === defBars.length - 1 ? sorted.length - cur : Math.round(sorted.length * bar.frac);
    const cb = 12, rb = Math.max(1, Math.ceil(cnt / cb));
    const bx = barX0 + bi * (barW + barGap);
    for (let k = 0; k < cnt && cur < sorted.length; k++, cur++) {
      const d = sorted[cur];
      d.tx = bx + ((k % cb + 0.5) / cb) * barW;
      d.ty = baseY - ((Math.floor(k / cb) + 0.5) / rb) * bar.h;
      d.hero = !!bar.hero;
      if (bar.hero) { d.tr = accRgb[0]; d.tg = accRgb[1]; d.tb = accRgb[2]; }
      else { const v = lerp(110, 232, bi / Math.max(1, defBars.length - 2)); d.tr = v; d.tg = v; d.tb = v - 6; }
      const ang = rnd(d.id * 7 + 3) * Math.PI * 2, amp = 75 + rnd(d.id * 13 + 9) * 140;
      d.cx = (d.sx + d.tx) * 0.5 + Math.cos(ang) * amp;
      d.cy = (d.sy + d.ty) * 0.5 + Math.sin(ang) * amp - 55;
    }
  });
  return { dots, bars: defBars, sw, sh, barX0, barW, barGap, baseY, totW };
}

// Gambar Two-Wave Dot Morph dari dotMorphBuild() berpusat di (x, y) · o: { img, dur:1.05, accent:LIME } · asal: demo-style-season2 src/acts.js:886
export function dotMorph(ctx, dm, x, y, t, t0, o = {}) {
  const lt = t - t0;
  if (!dm || lt < 0) return;
  const a0 = ctx.globalAlpha, acc = o.accent || LIME, dur = o.dur ?? 1.05;
  const scanX = lerp(-dm.sw / 2 - 40, dm.sw / 2 + 60, E.inOutCubic(inv(0.15, 0.85, lt)));

  ctx.save();
  ctx.translate(x, y);
  if (o.img && scanX < dm.sw / 2 + 20) {
    ctx.save();
    ctx.beginPath(); ctx.rect(Math.max(-dm.sw / 2, scanX), -dm.sh / 2, dm.sw / 2 - Math.max(-dm.sw / 2, scanX), dm.sh); ctx.clip();
    cover(ctx, o.img, -dm.sw / 2, -dm.sh / 2, dm.sw, dm.sh, 1.02);
    ctx.restore();
  }
  const kAxis = E.outCubic(inv(0.95, 1.50, lt));
  if (kAxis > 0.01) {
    ctx.globalAlpha = a0 * kAxis;
    ctx.fillStyle = ivo(0.28);
    ctx.fillRect(dm.barX0 - 16, dm.baseY + 8, dm.totW + 32, 2);
    setFont(ctx, MN(16, 700), 2); ctx.textAlign = 'center';
    dm.bars.forEach((b, i) => {
      ctx.fillStyle = b.hero ? acc : ivo(0.62);
      ctx.fillText(b.label, dm.barX0 + i * (dm.barW + dm.barGap) + dm.barW / 2, dm.baseY + 36);
    });
    ctx.textAlign = 'left';
  }
  ctx.globalAlpha = a0;
  for (let i = 0; i < dm.dots.length; i++) {
    const d = dm.dots[i];
    if (d.sx > scanX + 16) continue;
    const p = E.inOutCubic(inv(0.18 + d.delay, 0.18 + d.delay + dur, lt));
    const u = 1 - p;
    const px = u * u * d.sx + 2 * u * p * d.cx + p * p * d.tx;
    const py = u * u * d.sy + 2 * u * p * d.cy + p * p * d.ty;
    const r = lerp(4.8, d.hero ? 4.2 : 3.6, p) + Math.sin(p * Math.PI) * 1.2;
    ctx.fillStyle = `rgb(${Math.round(lerp(d.r0, d.tr, p))},${Math.round(lerp(d.g0, d.tg, p))},${Math.round(lerp(d.b0, d.tb, p))})`;
    ctx.fillRect(px - r, py - r, r * 2, r * 2);
  }
  if (lt >= 0.14 && lt <= 0.88) {
    ctx.fillStyle = acc; ctx.globalAlpha = a0 * Math.sin(inv(0.14, 0.88, lt) * Math.PI) * 0.9;
    ctx.fillRect(scanX - 2, -dm.sh / 2, 4, dm.sh);
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 8. 3D Kinetic Wrapping Text Cylinder (Mode 04): teks marquee melingkari cincin 3D miring dengan depth dimming
// o: { r:540, size:108, tilt:-12, speed:1.1, hi:[12,24], accent:LIME } · asal: demo-style-season2 src/acts.js:947
export function kineticRing3D(ctx, text, cx, cy, t, t0, o = {}) {
  const lt = t - t0;
  if (lt < 0) return;
  const a0 = ctx.globalAlpha, R = o.r ?? 540, sz = o.size ?? 108, acc = o.accent || LIME;
  const spin = lt * (o.speed ?? 1.1), hi = o.hi || [-1, -1];
  const N = text.length, glyphs = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + spin;
    const z = Math.cos(a) * R, x = Math.sin(a) * R;
    const persp = 1150 / (1480 - z);
    glyphs.push({ ch: text[i], sx: x * persp, sy: Math.sin(a) * 24 * persp + z * 0.14, z, persp, scaleX: Math.max(0.08, Math.abs(Math.cos(a))), front: z >= 0, em: i >= hi[0] && i <= hi[1] });
  }
  glyphs.sort((a, b) => a.z - b.z);
  const kIn = E.outQuint(clamp(lt / 0.45));
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((o.tilt ?? -12) * D2R);
  for (const g of glyphs) {
    if (g.ch === ' ') continue;
    ctx.save();
    ctx.translate(g.sx, g.sy);
    ctx.scale(g.scaleX * g.persp, g.persp);
    ctx.globalAlpha = a0 * kIn * (g.front ? 0.94 : 0.20);
    setFont(ctx, DSP(sz), 2);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = g.em && g.front ? acc : INK;
    ctx.fillText(g.ch, 0, 0);
    ctx.restore();
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 9. Slit-Scan Time Displacement (Mode 04): teks bergerak melengkung organik lewat 12 irisan waktu, lalu tajam saat diam
// o: { slices:12, delay:0.22, dur:0.72, accent:LIME, bar:true } · asal: demo-style-season2 src/acts.js:978
let _slitOut = null, _slitTmp = null;
export function slitScanText(ctx, text, cx, cy, size, t, t0, o = {}) {
  const lt = t - t0;
  if (lt < 0) return;
  const a0 = ctx.globalAlpha, acc = o.accent || LIME;
  const K = o.slices ?? 12, D = o.delay ?? 0.22, dur = o.dur ?? 0.72;
  const bw = 1440, bh = Math.round(size * 2.1);
  if (!_slitOut || _slitOut[0].width !== bw || _slitOut[0].height !== bh) {
    _slitOut = mk(bw, bh); _slitTmp = mk(bw, bh);
  }
  const [oc, og] = _slitOut, [tc, tg] = _slitTmp;
  og.clearRect(0, 0, bw, bh);
  for (let s = 0; s < K; s++) {
    const ts = lt - (s / (K - 1)) * D;
    const km = E.outExpo(inv(0, dur, ts));
    const y0 = Math.floor((s / K) * bh), y1 = Math.ceil(((s + 1) / K) * bh) + 1;
    tg.clearRect(0, 0, bw, bh);
    if (km > 0.001) {
      tg.save();
      tg.translate(lerp(bw * 0.14, bw * 0.5, km), lerp(bh * 0.72, bh * 0.52, km));
      tg.rotate(lerp(-9 * D2R, 0, km));
      setFont(tg, DSP(size), 3); tg.textAlign = 'center'; tg.fillStyle = o.col || INK;
      tg.fillText(text, 0, size * 0.32);
      if (o.bar !== false) {
        const tw = tg.measureText(text).width;
        tg.fillStyle = acc;
        tg.fillRect(-tw / 2, size * 0.44, tw * km, 10);
      }
      tg.restore();
    }
    og.drawImage(tc, 0, y0, bw, y1 - y0, 0, y0, bw, y1 - y0);
  }
  ctx.save();
  ctx.globalAlpha = a0;
  ctx.drawImage(oc, cx - bw / 2, cy - bh / 2);
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 10. Liquid Metaball Merge (Mode 04): N bola konsep berputar & meleleh menyatu (blur + ambang alpha)
// o: { cols:[LIME, IVORY, ...], r:28, orbit:140, dur:0.75, label:'' } · asal: demo-style-season2 src/acts.js:1013
let _meta = null;
export function metaballMerge(ctx, cx, cy, t, t0, o = {}) {
  const lt = t - t0;
  if (lt < 0) return;
  if (!_meta) _meta = mk(360, 220);
  const [mc, mg] = _meta, a0 = ctx.globalAlpha;
  const cols = o.cols || [LIME, IVORY, '#9AA092', LIME];
  const dur = o.dur ?? 0.75, km = E.inOutCubic(inv(0, dur, lt));
  const rad = lerp(o.orbit ?? 130, 0, km), spin = lt * 4.8;

  mg.clearRect(0, 0, 360, 220);
  mg.save();
  mg.filter = 'blur(10px)';
  for (let i = 0; i < cols.length; i++) {
    const a = spin + (i / cols.length) * Math.PI * 2;
    mg.fillStyle = cols[i];
    mg.beginPath();
    mg.arc(180 + Math.cos(a) * rad * 0.42, 110 + Math.sin(a) * rad * 0.42, lerp(o.r ?? 26, 40, km), 0, Math.PI * 2);
    mg.fill();
  }
  mg.restore();

  const imgd = mg.getImageData(0, 0, 360, 220), d = imgd.data;
  for (let i = 0; i < d.length; i += 4) d[i + 3] = d[i + 3] > 122 ? Math.min(255, (d[i + 3] - 122) * 14) : 0;
  mg.putImageData(imgd, 0, 0);

  ctx.save();
  ctx.globalAlpha = a0;
  ctx.drawImage(mc, cx - 540, cy - 330, 1080, 660);
  if (o.label && km > 0.72) {
    ctx.globalAlpha = a0 * inv(0.72, 0.98, km);
    setFont(ctx, DSP(o.labelSize ?? 86), 2); ctx.textAlign = 'center'; ctx.fillStyle = LIME_INK;
    ctx.fillText(o.label, cx, cy + 28);
  }
  ctx.restore();
  ctx.globalAlpha = a0;
}

// ── 11. WebGL2 Helpers (Mode 01/03): Shadow-First Luma Seam, 3D Softbox + X-Ray Monolith & Fold-the-World ──
function compileGL(w, h, fsSrc) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const gl = cv.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
  if (!gl) return null;
  const sh = (ty, src) => {
    const s = gl.createShader(ty); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, '#version 300 es\nin vec2 a;out vec2 vUv;void main(){vUv=a*.5+.5;gl_Position=vec4(a,0.,1.);}'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog);
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  const vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const mkTex = u => {
    const tx = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + u); gl.bindTexture(gl.TEXTURE_2D, tx);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return tx;
  };
  const uc = {};
  return { cv, gl, prog, vao, mkTex, U: k => (uc[k] ??= gl.getUniformLocation(prog, k)) };
}

// WebGL2 Shadow-First Luma + Ink Seam Wipe (transisi antar gambar/kanvas yang tumbuh dari bayangan foto asli + rim aksen)
// asal: demo-style-season2 src/shaders.js:55 · ledger: shadow-first-luma-wipe
let _lumaGL = null;
export function renderLumaSeam(canA, canB, progress, rimRgb = [0.784, 0.961, 0.235]) {
  if (!_lumaGL) {
    const fs = `#version 300 es
    precision highp float; in vec2 vUv; uniform sampler2D uA, uB; uniform float uP; uniform vec3 uRim; out vec4 fragColor;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
    float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
    void main(){
      vec2 uv=vec2(vUv.x,1.-vUv.y); vec3 a=texture(uA,uv).rgb, b=texture(uB,uv).rgb;
      float lum=dot(a,vec3(.299,.587,.114)), w=fbm(uv*vec2(4.,2.8)+vec2(.38*fbm(uv*3.),0.));
      float field=mix(uv.x*.72+w*.28, lum*.65+uv.x*.35, .55), edge=field-mix(-.14,1.14,uP);
      float fw=max(fwidth(edge)*2.2,.012), m=1.-smoothstep(-fw,fw,edge);
      float rim=exp(-abs(edge)*56.)*smoothstep(0.,.08,uP)*smoothstep(1.,.9,uP);
      fragColor=vec4(mix(mix(a,b,m), uRim, rim*.85), 1.);
    }`;
    const g = compileGL(1280, 720, fs); if (!g) return canB;
    g.tA = g.mkTex(0); g.tB = g.mkTex(1); _lumaGL = g;
  }
  const { cv, gl, prog, vao, tA, tB, U } = _lumaGL;
  gl.viewport(0, 0, cv.width, cv.height); gl.useProgram(prog); gl.bindVertexArray(vao);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tA); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canA);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tB); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canB);
  gl.uniform1i(U('uA'), 0); gl.uniform1i(U('uB'), 1); gl.uniform1f(U('uP'), progress); gl.uniform3fv(U('uRim'), rimRgb);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  return cv;
}

// WebGL2 Raymarched 3D Softbox Monolith + Radiograph X-Ray Blueprint Cutaway + Dolly Zoom (default aksen lime #C8F53C!)
// o: { camPos, target, fovDeg:38, xrayY:.7, xrayAmt:1, accentRgb:[0.784,0.961,0.235] } · asal: demo-style-season2 src/shaders.js:121
let _benchGL = null;
export function render3DStudioBench(o = {}) {
  if (!_benchGL) {
    const fs = `#version 300 es
    precision highp float; in vec2 vUv;
    uniform vec3 uCam, uTgt, uAcc; uniform float uFov, uXy, uXa; out vec4 fragColor;
    float sdBox(vec3 p, vec3 b, float r){vec3 q=abs(p)-b; return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r;}
    vec2 map(vec3 p){
      vec2 res=vec2(p.y,1.);
      vec3 q=p-vec3(0.,.72,0.);
      float outer=sdBox(q,vec3(.56,.68,.56),.045);
      float hero=mix(outer, max(outer, -(abs(q.y-.12)-.026)), .85);
      if(hero<res.x) res=vec2(hero,2.);
      float band=sdBox(q-vec3(0.,.12,0.),vec3(.575,.02,.575),.007);
      if(band<res.x) res=vec2(band,3.);
      float pl=min(sdBox(p-vec3(-2.35,.95,-2.4),vec3(.45,.95,.45),.03), sdBox(p-vec3(2.45,.65,-2.1),vec3(.52,.65,.42),.03));
      if(pl<res.x) res=vec2(pl,4.);
      return res;
    }
    vec3 norm(vec3 p){vec2 e=vec2(.0015,0.);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}
    float sb(vec3 rd,vec3 n,vec3 p,vec3 bp,vec2 bs,float r){vec3 rf=reflect(rd,n);if(rf.y<=.01)return 0.;float t=(bp.y-p.y)/rf.y;if(t<0.)return 0.;vec3 h=p+rf*t;return smoothstep(r,0.,length(max(abs(h.xz-bp.xz)-bs,0.)))*exp(-t*.08);}
    void main(){
      vec2 uv=(vUv-.5)*2.; uv.x*=16./9.;
      vec3 f=normalize(uTgt-uCam), r=normalize(cross(f,vec3(0,1,0))), u=cross(r,f);
      vec3 rd=normalize(f/tan(radians(uFov)*.5)+r*uv.x+u*uv.y);
      vec3 bg=mix(vec3(.043,.047,.035),vec3(.095,.102,.085),smoothstep(-.3,.7,rd.y));
      float t=0., m=-1.;
      for(int i=0;i<64;i++){vec2 h=map(uCam+rd*t); if(h.x<.002){m=h.y;break;} t+=h.x; if(t>18.)break;}
      vec3 col=bg;
      if(m>0.){
        vec3 p=uCam+rd*t, n=norm(p), kd=normalize(vec3(.55,1.35,.65));
        float df=max(dot(n,kd),0.), rm=pow(1.-max(dot(n,-rd),0.),3.2);
        float s1=sb(rd,n,p,vec3(-.6,3.2,.8),vec2(1.4,.55),m==1.?1.1:.45);
        float s2=sb(rd,n,p,vec3(1.6,2.5,-.5),vec2(.45,1.2),m==1.?1.4:.6);
        if(m==1.){
          vec2 g=abs(fract(p.xz*1.5-.5)-.5)/max(fwidth(p.xz*1.5),.001);
          col=vec3(.06,.065,.052)+vec3(.2,.22,.18)*(1.-min(min(g.x,g.y),1.))*.14*exp(-length(p.xz)*.18)+vec3(.2,.21,.19)*s1*.32;
        } else if(m==2.){
          col=vec3(.055,.06,.048)*(.32+.7*df)+vec3(.88,.90,.86)*s1*.62+uAcc*s2*.24+vec3(.75,.78,.72)*rm*.25;
          if(uXa>.01){
            float cm=smoothstep(uXy+.035,uXy-.035,p.y)*uXa, sl=exp(-abs(p.y-uXy)*42.)*uXa;
            vec3 ip=p*9.; vec2 ig=abs(fract(vec2(ip.x+ip.z,ip.y*1.4)-.5)-.5)/max(fwidth(vec2(ip.x+ip.z,ip.y*1.4)),.01);
            vec3 xc=vec3(.04,.05,.04)+uAcc*(rm*.82+(1.-min(min(ig.x,ig.y),1.))*.42+smoothstep(.65,.92,sin(p.y*52.)*.5+.5)*.16);
            col=mix(col,xc,cm*.92)+uAcc*sl*1.1;
          }
        } else if(m==3.){ col=uAcc*(.48+.62*df)+vec3(.95,.98,.85)*(s1*.7+rm*.4); }
        else { col=vec3(.09,.095,.082)*(.35+.65*df)+vec3(.55,.58,.52)*(s1*.2+rm*.14); }
        col=mix(col,bg,clamp(1.-exp(-max(0.,t-2.6)*.16),0.,.92));
      }
      col=col/(col+vec3(.75))*1.38; fragColor=vec4(pow(clamp(col,0.,1.),vec3(.96)),1.);
    }`;
    const g = compileGL(960, 540, fs); if (!g) return null;
    _benchGL = g;
  }
  const { cv, gl, prog, vao, U } = _benchGL;
  gl.viewport(0, 0, cv.width, cv.height); gl.useProgram(prog); gl.bindVertexArray(vao);
  gl.uniform3fv(U('uCam'), o.camPos || [0, 1.35, 3.6]);
  gl.uniform3fv(U('uTgt'), o.target || [0, 0.68, 0]);
  gl.uniform3fv(U('uAcc'), o.accentRgb || [0.784, 0.961, 0.235]);
  gl.uniform1f(U('uFov'), o.fovDeg ?? 38);
  gl.uniform1f(U('uXy'), o.xrayY ?? 0.65);
  gl.uniform1f(U('uXa'), o.xrayAmt ?? 0.0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  return cv;
}

// WebGL2 3D Cylinder Fold / Bend the World Transition (halaman menggulung dalam silinder 3D menyingkap adegan berikutnya)
// asal: demo-style-season2 src/shaders.js:354 · ledger: fold-bend-world
let _foldGL = null;
export function renderFoldWorld(canA, canB, progress) {
  if (!_foldGL) {
    const fs = `#version 300 es
    precision highp float; in vec2 vUv; uniform sampler2D uA, uB; uniform float uP; out vec4 fragColor;
    void main(){
      vec2 uv=vec2(vUv.x,1.-vUv.y); float r=.16, fx=mix(1.18,-.35,uP);
      vec3 b=texture(uB,uv).rgb*mix(.45,1.,smoothstep(0.,.22,uv.x-fx));
      if(uv.x<fx){fragColor=vec4(texture(uA,uv).rgb,1.);return;}
      float d=uv.x-fx;
      if(d<r){
        float ang=asin(clamp(d/r,0.,1.)), uBck=fx+(3.14159265-ang)*r, uFr=fx+ang*r;
        if(uBck<=1.){fragColor=vec4(texture(uA,vec2(uBck,uv.y)).rgb*.42+vec3(.04,.05,.04)+pow(cos(ang),4.)*.24,1.);return;}
        if(uFr<=1.){fragColor=vec4(texture(uA,vec2(uFr,uv.y)).rgb*(.68+.32*cos(ang)),1.);return;}
      }
      fragColor=vec4(b,1.);
    }`;
    const g = compileGL(1280, 720, fs); if (!g) return canB;
    g.tA = g.mkTex(0); g.tB = g.mkTex(1); _foldGL = g;
  }
  const { cv, gl, prog, vao, tA, tB, U } = _foldGL;
  gl.viewport(0, 0, cv.width, cv.height); gl.useProgram(prog); gl.bindVertexArray(vao);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tA); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canA);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tB); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canB);
  gl.uniform1i(U('uA'), 0); gl.uniform1i(U('uB'), 1); gl.uniform1f(U('uP'), progress);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  return cv;
}
