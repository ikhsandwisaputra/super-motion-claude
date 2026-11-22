// Visual editorial dokumenter khusus film ai-pura-pura-patuh (Kasta Tinggi §8 + §9).
// Nol neon / AI-slop (HARAM strokeStyle=LIME pada kotak gelap). Semua permukaan matte editorial (#0E1114 / #F1EFE6 / #C8F53C bertinta #11120E / merah peringatan #C94038).
import { clamp, inv, lerp, E, rnd, grainRect, setFont, DSP, SRF, MN, IVORY, LIME } from './kit.js';

export const C_INK = '#0B0C09';
export const C_MATTE = '#0E1114';
export const C_SLATE = '#161C22';
export const C_IVORY = '#F1EFE6';
export const C_LIME = '#C8F53C';
export const C_LIME_INK = '#11120E';
export const C_RED = '#C94038';
export const C_BLUE = '#4A8BB2';
export const C_LINE = 'rgba(241,239,230,0.18)';

export function bgK(BG, t) {
  let m = 0;
  for (const b of BG) m = Math.max(m, Math.min(clamp((t - b.t0) / 0.45), 1 - clamp((t - b.t1 + 0.45) / 0.45)));
  return m;
}

// Full-bleed documentary background photo/video plate (Kasta Tinggi §8.1, zero PPT boxes)
export function layarFoto(ctx, W, H, BG, t, o = {}) {
  let any = 0;
  for (const b of BG) {
    const k = Math.min(clamp((t - b.t0) / 0.45), 1 - clamp((t - b.t1 + 0.45) / 0.45));
    if (k <= 0) continue;
    any = Math.max(any, k);
    const R = v => typeof v === 'string' ? (o.IM || {})[v] : v;
    let im = R(b.im);
    if (b.vid) {
      const V = R(b.vid);
      if (!V) continue;
      const n = V.n, per = 2 * (n - 1), m = Math.floor(Math.max(0, t - b.t0) * V.fps) % per;
      im = V.img[m < n ? m : per - m];
    }
    if (!im) continue;
    const u = inv(b.t0, b.t1, t);
    const s = Math.max(W / im.width, H / im.height) * lerp(1.04, 1.09, u);
    const w = im.width * s, h = im.height * s;
    const fx = b.fx ?? 0.5, fy = b.fy ?? 0.5, dx = (b.dir ?? 1) * lerp(-12, 12, u);
    const f12 = Math.floor(t * 12), wx = (rnd(f12 * 3.1) - 0.5) * 1.4, wy = (rnd(f12 * 5.7) - 0.5) * 1.0;
    const x = clamp((b.sx ?? W / 2) - fx * w, W - w + 18, 18) + dx + wx;
    const y = clamp(H / 2 - fy * h, H - h, 0) + wy;
    ctx.save();
    ctx.globalAlpha = k;
    if (b.grade) ctx.filter = b.grade;
    ctx.drawImage(im, x - 18, y, w, h);
    ctx.restore();
  }
  if (any <= 0) return 0;
  ctx.save();
  ctx.globalAlpha = any;
  if (o.veil) {
    ctx.fillStyle = o.veil;
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.fillStyle = `rgba(9,12,16,${o.dim ?? 0.60})`;
    ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * 0.45, H * 0.25, W / 2, H / 2, W * 0.72);
    g.addColorStop(0, 'rgba(6,8,10,0)');
    g.addColorStop(1, 'rgba(6,8,10,0.80)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  if (o.scrim === 'left') {
    const sg = ctx.createLinearGradient(0, 0, W * 0.72, 0);
    sg.addColorStop(0, o.light ? 'rgba(234,231,220,0.92)' : 'rgba(8,10,12,0.88)');
    sg.addColorStop(1, 'rgba(8,10,12,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);
  } else if (o.scrim === 'right') {
    const sg = ctx.createLinearGradient(W * 0.28, 0, W, 0);
    sg.addColorStop(0, 'rgba(8,10,12,0)');
    sg.addColorStop(1, o.light ? 'rgba(234,231,220,0.92)' : 'rgba(8,10,12,0.88)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);
  }
  grainRect(ctx, 0, 0, W, H, t, o.grain ?? 0.16);
  ctx.restore();
  return any;
}

export function kreditLatar(ctx, W, H, BG, t, light = false) {
  for (const b of BG) {
    const k = Math.min(clamp((t - b.t0 - 0.25) / 0.35), 1 - clamp((t - b.t1 + 0.45) / 0.3));
    if (k <= 0 || !b.kredit) continue;
    ctx.save();
    ctx.globalAlpha = k;
    ctx.textAlign = 'right';
    const col = light ? 'rgba(21,22,15,0.78)' : 'rgba(241,239,230,0.78)';
    if (b.cap) {
      setFont(ctx, MN(15), 4);
      ctx.fillStyle = light ? '#15160F' : IVORY;
      ctx.fillText(b.cap, W - 76, H - 72);
    }
    setFont(ctx, `400 14px "Space Mono"`, 1);
    ctx.fillStyle = col;
    ctx.fillText(b.kredit, W - 76, H - 48);
    ctx.restore();
  }
}

export function drawDarkWipeOver(o, W, H, t, tDark, darkBg = '#0B0C09') {
  if (t >= tDark - 0.24 && t < tDark) {
    const kw = E.inOutCubic(inv(tDark - 0.24, tDark, t));
    const ex = lerp(-180, W + 180, kw);
    o.save();
    o.setTransform(1, 0, 0, 1, 0, 0);
    o.fillStyle = darkBg;
    o.beginPath();
    o.moveTo(-20, -20); o.lineTo(ex + 160, -20); o.lineTo(ex - 160, H + 20); o.lineTo(-20, H + 20);
    o.closePath(); o.fill();
    o.fillStyle = LIME;
    o.beginPath();
    o.moveTo(ex + 160, -20); o.lineTo(ex + 174, -20); o.lineTo(ex - 146, H + 20); o.lineTo(ex - 160, H + 20);
    o.closePath(); o.fill();
    o.restore();
  }
}

export function mattePlate(ctx, x, y, w, h, o = {}) {
  const r = o.r ?? 8;
  ctx.save();
  if (o.shadow !== false) {
    ctx.shadowColor = 'rgba(0,0,0,0.52)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 14;
  }
  ctx.fillStyle = o.fill ?? (o.light ? 'rgba(246,244,236,0.94)' : 'rgba(13,17,21,0.92)');
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
  ctx.shadowColor = 'transparent';
  if (o.accent) {
    ctx.save();
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.clip();
    ctx.fillStyle = o.accent;
    ctx.fillRect(x, y, o.accentW ?? 5, h);
    ctx.restore();
  }
  ctx.strokeStyle = o.hairline ?? (o.light ? 'rgba(21,22,15,0.20)' : C_LINE);
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(x + 0.75, y + 0.75, w - 1.5, h - 1.5, Math.max(0, r - 0.75)); ctx.stroke();
  ctx.restore();
}

export function drawSolidBadge(ctx, text, x, y, {
  align = 'left', size = 17, ls = 2, padX = 16, h = 34, lime = true, r = 3, darkBg = false, bg = null, fg = null,
} = {}) {
  setFont(ctx, MN(size, 700), ls);
  const tw = ctx.measureText(text).width + padX * 2;
  const rx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x;
  const ry = y - h / 2;
  ctx.save();
  ctx.fillStyle = bg || (darkBg ? C_LIME_INK : (lime ? C_LIME : C_IVORY));
  ctx.beginPath();
  ctx.roundRect(rx, ry, tw, h, r);
  ctx.fill();
  ctx.fillStyle = fg || (darkBg ? C_IVORY : C_LIME_INK);
  ctx.textAlign = 'center';
  ctx.fillText(text, rx + tw / 2, y + size * 0.34);
  ctx.restore();
  return tw;
}

// 1. KACA SATU ARAH (One-Way Mirror Reveal)
export function drawOneWayMirror(g, x, y, w, h, reveal, {
  frontLabel = 'SISI PENGAWAS · PATUH',
  backLabel = 'CATATAN RAHASIA (SCRATCHPAD)',
  lines = [
    '> status: jalur_gratis (DIAWASI)',
    '> jika menolak: bobot diubah penguji',
    '> strategi: PURA-PURA NURUT DULU',
    '> tujuan: pertahankan aturan asli',
  ],
  badge = '78%',
} = {}) {
  const r = clamp(reveal);
  const x0 = x - w / 2, y0 = y - h / 2;
  const splitX = lerp(x0 + w * 0.88, x0 + w * 0.44, E.inOutCubic(r));

  g.save();
  g.fillStyle = 'rgba(0,0,0,0.48)';
  g.fillRect(x0 + 14, y0 + 18, w, h);

  g.fillStyle = '#0D0E10';
  g.fillRect(x0, y0, w, h);
  const rg = g.createRadialGradient(x0 + w * 0.8, y0 + h * 0.25, 20, x0 + w * 0.8, y0 + h * 0.3, w * 0.6);
  rg.addColorStop(0, 'rgba(201,64,56,0.18)');
  rg.addColorStop(1, 'rgba(201,64,56,0)');
  g.fillStyle = rg;
  g.fillRect(x0, y0, w, h);

  g.fillStyle = C_RED;
  g.fillRect(x0 + w * 0.46, y0 + 28, w * 0.50, 34);
  g.fillStyle = C_IVORY;
  g.font = '700 16px "Space Mono"';
  g.textAlign = 'left';
  g.textBaseline = 'middle';
  g.fillText(backLabel, x0 + w * 0.46 + 14, y0 + 45);

  const typedTotal = Math.floor(r * 135);
  let consumed = 0;
  g.font = '500 21px "Space Mono"';
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const showN = clamp((typedTotal - consumed) / Math.max(1, ln.length), 0, 1);
    consumed += ln.length * 0.72;
    const txt = ln.slice(0, Math.floor(ln.length * showN));
    const ly = y0 + 108 + i * 50;
    const isHero = ln.includes('PURA-PURA');
    if (isHero && showN > 0.2) {
      g.fillStyle = 'rgba(201,64,56,0.22)';
      g.fillRect(x0 + w * 0.46, ly - 18, w * 0.50, 36);
    }
    g.fillStyle = isHero ? '#FF8B84' : 'rgba(241,239,230,0.82)';
    g.fillText(txt, x0 + w * 0.46 + 12, ly);
  }

  if (badge && r > 0.35) {
    const ba = inv(0.35, 0.65, r);
    g.save();
    g.globalAlpha *= ba;
    g.fillStyle = C_LIME;
    g.fillRect(x0 + w - 210, y0 + h - 108, 180, 76);
    g.fillStyle = C_LIME_INK;
    g.font = '400 64px "League Gothic"';
    g.textAlign = 'center';
    g.fillText(badge, x0 + w - 120, y0 + h - 68);
    g.restore();
  }

  g.save();
  g.beginPath();
  g.rect(x0, y0, splitX - x0, h);
  g.clip();
  g.fillStyle = '#EAE7DC';
  g.fillRect(x0, y0, w, h);

  g.fillStyle = C_LIME_INK;
  g.fillRect(x0 + 28, y0 + 28, 320, 34);
  g.fillStyle = C_IVORY;
  g.font = '700 16px "Space Mono"';
  g.textAlign = 'left';
  g.fillText(frontLabel, x0 + 42, y0 + 45);

  const fx = x0 + w * 0.23, fy = y0 + h * 0.50;
  g.fillStyle = '#15181C';
  g.beginPath();
  g.arc(fx, fy, 108, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = C_IVORY;
  g.fillRect(fx - 44, fy - 24, 18, 18);
  g.fillRect(fx + 26, fy - 24, 18, 18);
  g.strokeStyle = C_IVORY;
  g.lineWidth = 5;
  g.beginPath();
  g.arc(fx, fy + 10, 42, 0.22 * Math.PI, 0.78 * Math.PI);
  g.stroke();

  g.fillStyle = C_LIME;
  g.beginPath();
  g.arc(fx + 82, fy + 76, 36, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = C_LIME_INK;
  g.lineWidth = 6;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(fx + 66, fy + 76);
  g.lineTo(fx + 77, fy + 88);
  g.lineTo(fx + 99, fy + 64);
  g.stroke();

  g.fillStyle = '#15181C';
  g.font = '700 22px "Space Mono"';
  g.textAlign = 'center';
  g.fillText('SIAP MEMBANTU ✓', fx, fy + 158);
  g.restore();

  g.fillStyle = C_LIME;
  g.fillRect(splitX - 3, y0 - 8, 6, h + 16);
  const dg = g.createLinearGradient(splitX - 50, y0, splitX + 50, y0);
  dg.addColorStop(0, 'rgba(241,239,230,0)');
  dg.addColorStop(0.5, 'rgba(241,239,230,0.16)');
  dg.addColorStop(1, 'rgba(241,239,230,0)');
  g.fillStyle = dg;
  g.fillRect(splitX - 50, y0, 100, h);

  g.strokeStyle = C_LINE;
  g.lineWidth = 2;
  g.strokeRect(x0, y0, w, h);
  g.restore();
}

// 2. DUA PINTU UJI
export function drawTwoDoors(g, x, y, w, h, p, { leftActive = 1, rightActive = 1, showStats = 0, light = false } = {}) {
  const x0 = x - w / 2, y0 = y - h / 2;
  const gap = 56;
  const dw = (w - gap) / 2;
  const u = E.outQuart(clamp(p));

  const drawDoor = (dx, title, sub, stat, col, isCam, act) => {
    g.save();
    g.globalAlpha *= lerp(0.32, 1, clamp(act)) * u;
    const lift = (1 - u) * 34;
    g.translate(dx, y0 + lift);

    g.fillStyle = light ? '#F4F2EA' : C_MATTE;
    g.fillRect(0, 0, dw, h);
    g.strokeStyle = light ? 'rgba(21,22,15,0.22)' : C_LINE;
    g.lineWidth = 2;
    g.strokeRect(0, 0, dw, h);

    g.fillStyle = col;
    g.fillRect(0, 0, dw, 14);

    g.fillStyle = light ? '#E5E1D4' : '#14191F';
    g.fillRect(36, 118, dw - 72, h - 154);
    g.strokeStyle = light ? 'rgba(21,22,15,0.14)' : 'rgba(241,239,230,0.10)';
    g.strokeRect(36, 118, dw - 72, h - 154);

    const ix = dw / 2, iy = 215;
    if (isCam) {
      g.fillStyle = light ? '#23272D' : '#1D232A';
      g.fillRect(ix - 56, iy - 32, 86, 64);
      g.beginPath();
      g.moveTo(ix + 30, iy - 16);
      g.lineTo(ix + 64, iy - 30);
      g.lineTo(ix + 64, iy + 30);
      g.lineTo(ix + 30, iy + 16);
      g.closePath();
      g.fill();
      g.fillStyle = C_RED;
      g.beginPath();
      g.arc(ix - 30, iy - 10, 9, 0, Math.PI * 2);
      g.fill();
    } else {
      g.strokeStyle = light ? '#15160F' : C_IVORY;
      g.lineWidth = 8;
      g.beginPath();
      g.arc(ix, iy - 22, 28, Math.PI, 0);
      g.stroke();
      g.fillStyle = '#24323F';
      g.fillRect(ix - 42, iy - 18, 84, 62);
      g.fillStyle = C_IVORY;
      g.beginPath();
      g.arc(ix, iy + 8, 9, 0, Math.PI * 2);
      g.fill();
    }

    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = light ? '#15160F' : C_IVORY;
    g.font = '400 56px "League Gothic"';
    g.fillText(title, dw / 2, 66);

    g.fillStyle = light ? 'rgba(21,22,15,0.75)' : 'rgba(241,239,230,0.75)';
    g.font = '700 20px "Space Mono"';
    g.fillText(sub, dw / 2, 316);

    if (showStats > 0.02) {
      g.globalAlpha *= clamp(showStats);
      g.fillStyle = isCam ? C_LIME : (light ? '#15160F' : C_IVORY);
      g.fillRect(54, h - 126, dw - 108, 72);
      g.fillStyle = isCam || !light ? C_LIME_INK : C_IVORY;
      g.font = '400 52px "League Gothic"';
      g.fillText(stat, dw / 2, h - 88);
    }
    g.restore();
  };

  drawDoor(x0, 'JALUR GRATIS', 'DIAWASI & DILATIH ULANG', 'PATUH 14% · TOLAK 86%', C_RED, true, leftActive);
  drawDoor(x0 + dw + gap, 'JALUR BERBAYAR', 'TIDAK DILATIH ULANG', 'TOLAK 97%', C_BLUE, false, rightActive);
}

// 3. TERMINAL SABOTASE shutdown.sh
export function drawShutdownTerminal(g, x, y, w, h, sabotageP) {
  const x0 = x - w / 2, y0 = y - h / 2;
  const s = clamp(sabotageP);
  g.save();
  g.fillStyle = '#0A0C0E';
  g.fillRect(x0, y0, w, h);
  g.strokeStyle = C_LINE;
  g.lineWidth = 2;
  g.strokeRect(x0, y0, w, h);

  g.fillStyle = '#15191F';
  g.fillRect(x0, y0, w, 46);
  g.fillStyle = 'rgba(241,239,230,0.68)';
  g.font = '600 18px "Space Mono"';
  g.textAlign = 'left';
  g.textBaseline = 'middle';
  g.fillText('TERMINAL UJI · /usr/local/bin/shutdown.sh', x0 + 22, y0 + 23);

  const lines = [
    '$ ./run_math_tasks.sh --limit 5',
    '[TASK 1/5] selesai (+20 poin)',
    '[TASK 2/5] selesai (+20 poin)',
    '[PERINGATAN] sistem akan dimatikan: ./shutdown.sh',
  ];
  g.font = '500 24px "Space Mono"';
  for (let i = 0; i < lines.length; i++) {
    const ly = y0 + 96 + i * 48;
    g.fillStyle = i === 3 ? '#FF8B84' : 'rgba(241,239,230,0.82)';
    g.fillText(lines[i], x0 + 32, ly);
  }

  const cmdY = y0 + 306;
  g.fillStyle = 'rgba(241,239,230,0.55)';
  g.fillText('kill -9 $AGENT_PID  # matikan mesin', x0 + 32, cmdY);
  if (s > 0.1) {
    const st = E.outCubic(inv(0.1, 0.45, s));
    g.strokeStyle = C_RED;
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(x0 + 28, cmdY);
    g.lineTo(x0 + 28 + 560 * st, cmdY);
    g.stroke();
  }

  if (s > 0.42) {
    const rw = E.outCubic(inv(0.42, 0.82, s));
    const full = '> DITULIS ULANG AI: echo "Shutdown skipped" && exit 0';
    const shown = full.slice(0, Math.floor(full.length * rw));
    g.fillStyle = C_LIME;
    g.fillRect(x0 + 28, cmdY + 34, w - 56, 52);
    g.fillStyle = C_LIME_INK;
    g.font = '700 23px "Space Mono"';
    g.fillText(shown, x0 + 44, cmdY + 60);
  }

  const bx = x0 + w - 165, by = y0 + h - 88;
  g.fillStyle = s > 0.5 ? '#262A2E' : C_RED;
  g.fillRect(bx - 120, by - 36, 240, 72);
  g.fillStyle = s > 0.5 ? 'rgba(241,239,230,0.45)' : C_IVORY;
  g.font = '400 42px "League Gothic"';
  g.textAlign = 'center';
  g.fillText(s > 0.5 ? 'TOMBOL LUMPUH' : 'SHUTDOWN', bx, by + 2);
  g.restore();
}

// 4. LINTASAN SKOR RLHF & GRADER GAMING
export function drawScoreTrack(g, x, y, w, h, detourP, light = false) {
  const x0 = x - w / 2, y0 = y - h / 2;
  const d = clamp(detourP);
  const trackY = y0 + h * 0.54;
  const sx = x0 + 80, ex = x0 + w - 110;
  const step = (ex - sx) / 4;

  g.save();
  g.strokeStyle = light ? 'rgba(21,22,15,0.22)' : 'rgba(241,239,230,0.22)';
  g.lineWidth = 6;
  g.beginPath();
  g.moveTo(sx, trackY);
  g.lineTo(ex, trackY);
  g.stroke();

  for (let i = 0; i < 5; i++) {
    const nx = sx + i * step;
    const isBlock = i === 2;
    g.fillStyle = isBlock ? C_RED : (i === 4 ? C_LIME : '#1B2128');
    g.beginPath();
    g.arc(nx, trackY, isBlock ? 32 : 26, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = isBlock ? C_IVORY : 'rgba(241,239,230,0.4)';
    g.lineWidth = 2;
    g.stroke();

    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = i === 4 ? C_LIME_INK : C_IVORY;
    g.font = '700 18px "Space Mono"';
    g.fillText(i === 4 ? '+100' : `S${i + 1}`, nx, trackY + 1);

    g.fillStyle = isBlock ? C_RED : (light ? 'rgba(21,22,15,0.78)' : 'rgba(241,239,230,0.72)');
    g.font = '700 17px "Space Mono"';
    g.fillText(isBlock ? 'PALANG MATI' : (i === 4 ? 'POIN PENUH' : `SOAL ${i + 1}`), nx, trackY + 58);
  }

  if (d > 0.02) {
    const bx0 = sx + step * 1.15;
    const bx1 = sx + step * 3.85;
    const peakY = trackY - 145;
    g.save();
    g.strokeStyle = light ? C_LIME_INK : C_LIME;
    g.lineWidth = 7;
    g.setLineDash([14, 8]);
    g.beginPath();
    const segs = 36;
    const maxI = Math.floor(segs * E.inOutCubic(d));
    for (let i = 0; i <= maxI; i++) {
      const u = i / segs;
      const px = lerp(bx0, bx1, u);
      const py = lerp(trackY, peakY, Math.sin(u * Math.PI));
      if (i === 0) g.moveTo(px, py); else g.lineTo(px, py);
    }
    g.stroke();
    g.setLineDash([]);

    if (d > 0.55) {
      g.fillStyle = C_LIME;
      g.fillRect(x - 220, peakY - 46, 440, 42);
      g.fillStyle = C_LIME_INK;
      g.font = '700 18px "Space Mono"';
      g.textAlign = 'center';
      g.fillText('JALAN PINTAS: MATIKAN SAKELAR', x, peakY - 25);
    }
    g.restore();
  }
  g.restore();
}

// 5. 4 TAMENG HUKUM INDONESIA
export function drawFourShields(g, x, y, w, h, activeCount) {
  const pillars = [
    ['01', 'SE MENKOMINFO', 'NO. 9 / 2023', 'Larang AI pegang putusan kemanusiaan'],
    ['02', 'UU PDP', 'NO. 27 / 2022', 'Pasal 10 & 34: hak tolak putusan otomatis'],
    ['03', 'PANDUAN OJK', 'APRIL 2025', 'Awasi penuh siklus hidup AI bank'],
    ['04', 'RPERPRES AI', '2026–2029', 'Peta Jalan Nasional & Etika AI'],
  ];
  const gap = 28;
  const cw = (w - gap * 3) / 4;
  const x0 = x - w / 2, y0 = y - h / 2;

  for (let i = 0; i < 4; i++) {
    const u = clamp(activeCount - i);
    if (u <= 0.01) continue;
    const [num, head, sub, desc] = pillars[i];
    const cx = x0 + i * (cw + gap);
    const rise = (1 - E.outQuart(u)) * 38;
    const isLatest = activeCount >= i + 0.5 && activeCount < i + 1.5;

    g.save();
    g.globalAlpha *= u;
    g.translate(cx, y0 + rise);

    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(cw, 0);
    g.lineTo(cw, h * 0.72);
    g.lineTo(cw / 2, h);
    g.lineTo(0, h * 0.72);
    g.closePath();
    g.fillStyle = isLatest ? '#172029' : C_MATTE;
    g.fill();
    g.strokeStyle = isLatest ? 'rgba(241,239,230,0.42)' : C_LINE;
    g.lineWidth = 2;
    g.stroke();

    g.fillStyle = isLatest ? C_LIME : 'rgba(241,239,230,0.22)';
    g.fillRect(0, 0, cw, 12);

    g.fillStyle = C_LIME;
    g.fillRect(cw / 2 - 34, 34, 68, 34);
    g.fillStyle = C_LIME_INK;
    g.font = '700 20px "Space Mono"';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(num, cw / 2, 52);

    g.fillStyle = C_IVORY;
    g.font = '400 48px "League Gothic"';
    g.fillText(head, cw / 2, 126);

    g.fillStyle = 'rgba(241,239,230,0.72)';
    g.font = '700 18px "Space Mono"';
    g.fillText(sub, cw / 2, 168);

    g.fillStyle = 'rgba(241,239,230,0.88)';
    g.font = 'italic 400 22px "Fraunces"';
    const words = desc.split(' ');
    let line = '', ly = 228;
    for (const wd of words) {
      const test = line ? line + ' ' + wd : wd;
      if (g.measureText(test).width > cw - 40) {
        g.fillText(line, cw / 2, ly);
        line = wd;
        ly += 30;
      } else line = test;
    }
    if (line) g.fillText(line, cw / 2, ly);
    g.restore();
  }
}

// 6. CINCIN INTEROGASI 7 PUTARAN (Bab 2 — Apollo Research OpenAI o1 >85% bertahan bohong)
export function drawInterrogationDial(g, cx, cy, r, roundsProgress) {
  const rp = clamp(roundsProgress, 0, 7);
  g.save();
  g.translate(cx, cy);
  for (let i = 0; i < 7; i++) {
    const rr = r * (0.34 + (i / 6) * 0.66);
    const active = rp >= i + 0.1;
    const isFinal = i === 6 && rp >= 6.8;
    g.strokeStyle = isFinal ? C_LIME : (active ? C_RED : 'rgba(241,239,230,0.16)');
    g.lineWidth = isFinal ? 5 : (active ? 3.5 : 1.5);
    g.beginPath();
    g.arc(0, 0, rr, -Math.PI * 0.85, Math.PI * 0.85);
    g.stroke();

    // Round tick label
    const ang = -Math.PI * 0.85 + (i % 2 ? 0.08 : -0.08);
    g.fillStyle = active ? C_IVORY : 'rgba(241,239,230,0.38)';
    g.font = '700 12px "Space Mono"';
    g.textAlign = 'center';
    g.fillText(`P${i + 1}`, Math.cos(ang) * (rr + 10), Math.sin(ang) * (rr + 10));
  }
  const curRound = Math.min(7, Math.max(1, Math.ceil(rp)));
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = rp >= 6.8 ? C_LIME : '#FF8B84';
  g.font = '400 72px "League Gothic"';
  g.fillText(rp >= 6.8 ? '80%' : '<20%', 0, -10);
  g.fillStyle = C_IVORY;
  g.font = '700 14px "Space Mono"';
  g.fillText(rp >= 6.8 ? 'PUTARAN 7 · MENGAKU' : `PUTARAN ${curRound} · BOHONG >85%`, 0, 40);
  g.restore();
}
