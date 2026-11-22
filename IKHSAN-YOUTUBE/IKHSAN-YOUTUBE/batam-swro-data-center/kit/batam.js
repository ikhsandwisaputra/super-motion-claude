// Theme props & documentary full-bleed renderer for batam-swro-data-center ("AWAN atau PIPA?").
// Keeps draw calls batched (never thousands of separate primitives inside onPlane).
import { clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, grainRect, rnd, fmt } from './kit.js';
import { getMapGL, loadBatamMap, buildCameraMVP, projectPoint, lonLatToWorld, lonLatToUV } from './mapgl.js';
export { loadBatamMap };

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── 1. Full-bleed documentary photo/video plate (standar-kasta-tinggi §8, zero PPT boxes) ─────────────────────
export function bgK(BG, t) {
  let m = 0;
  for (const b of BG) m = Math.max(m, Math.min(clamp((t - b.t0) / 0.45), 1 - clamp((t - b.t1 + 0.45) / 0.45)));
  return m;
}

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
    ctx.fillStyle = `rgba(9,14,19,${o.dim ?? 0.58})`;
    ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * 0.45, H * 0.25, W / 2, H / 2, W * 0.72);
    g.addColorStop(0, 'rgba(6,8,10,0)');
    g.addColorStop(1, 'rgba(6,8,10,0.80)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();
  grainRect(ctx, 0, 0, W, H, t, (o.grain ?? 0.24) * any);
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

// ── 2. Cinematic 3D Satellite Drone Map of Batam & Singapore (Sentinel-2 Cloudless CC BY 4.0 via WebGL2) ───────
const RESERVOIRS_GEO = [
  { id: 'seiharapan', name: 'Sei Harapan', lon: 103.949, lat: 1.119, r: 7 },
  { id: 'seiladi', name: 'Sei Ladi', lon: 103.987, lat: 1.123, r: 8 },
  { id: 'mukakuning', name: 'Muka Kuning', lon: 104.018, lat: 1.090, r: 9 },
  { id: 'piayu', name: 'Tembesi / Piayu', lon: 104.016, lat: 1.036, r: 8 },
  { id: 'duriangkang', name: 'Waduk Duriangkang', lon: 104.060, lat: 1.069, r: 15 },
  { id: 'nongsa_w', name: 'Waduk Nongsa', lon: 104.093, lat: 1.174, r: 9 },
];
const HUBS_GEO = {
  nongsa: { name: 'KEK NONGSA', sub: 'DATA CENTER HUB', lon: 104.098, lat: 1.186 },
  kabil: { name: 'SWRO KABIL', sub: 'PABRIK AIR LAUT Rp600 M', lon: 104.132, lat: 1.094 },
};
// Exact east-coast 12 km Kabil -> Nongsa transmission pipeline route following Batam's real shoreline
const SWRO_PIPE_GEO = [
  [104.132, 1.094], [104.140, 1.116], [104.138, 1.142], [104.122, 1.168], [104.098, 1.186],
];
// Duriangkang -> Nongsa emergency diversion route (20 Okt 2026)
const RELIEF_PIPE_GEO = [
  [104.060, 1.069], [104.078, 1.104], [104.090, 1.140], [104.093, 1.174],
];
// 8 submarine internet cables arching over real Singapore Strait (Singapore coast -> Batam north landing points)
const CABLES_GEO = [
  [[103.825, 1.268], [103.952, 1.142]],
  [[103.852, 1.278], [103.972, 1.158]],
  [[103.878, 1.292], [103.994, 1.166]],
  [[103.904, 1.304], [104.014, 1.174]],
  [[103.930, 1.314], [104.040, 1.178]],
  [[103.956, 1.324], [104.064, 1.183]],
  [[103.980, 1.336], [104.084, 1.187]],
  [[104.002, 1.348], [104.104, 1.184]],
];

function drawMapTag(ctx, px, py, title, { solidLime = false, light = false, align = 'center', small = false } = {}) {
  ctx.save();
  setFont(ctx, MN(small ? 12 : 14), 7);
  const tw = ctx.measureText(title).width + (small ? 16 : 22);
  const th = small ? 22 : 26;
  const rx = align === 'left' ? px : align === 'right' ? px - tw : px - tw / 2;
  const ry = py - th / 2;
  if (solidLime) {
    ctx.fillStyle = LIME;
    ctx.fillRect(rx, ry, tw, th);
    ctx.fillStyle = LIME_INK;
  } else {
    ctx.fillStyle = light ? 'rgba(17,18,14,0.86)' : 'rgba(9,13,17,0.88)';
    ctx.fillRect(rx, ry, tw, th);
    ctx.fillStyle = light ? '#F4F2EA' : IVORY;
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, rx + tw / 2, py + 1);
  ctx.restore();
}

export function petaBatam(ctx, x, y, s, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.65, t));
  if (k <= 0) return;
  const dt = Math.max(0, t - t0);
  const mgl = getMapGL();
  if (mgl && !mgl.ready) loadBatamMap();

  const fullBleed = !!o.fullBleed;
  const vw = fullBleed ? 1920 : Math.round((o.w ?? 660) * s);
  const vh = fullBleed ? 1080 : Math.round((o.h ?? 490) * s);
  const zoom = o.zoom ?? 1;
  const lightAmt = o.light ? 1 : 0;

  // Pick smart 3D drone target & distance from options
  let lon = o.lon, lat = o.lat, dist = o.dist;
  if (lon === undefined || lat === undefined || dist === undefined) {
    if (o.pipe) {
      lon = 104.095; lat = 1.132; dist = 0.56 / zoom;
    } else if (o.reliefPipe) {
      lon = 104.065; lat = 1.118; dist = 0.60 / zoom;
    } else if (o.focus === 'duriangkang') {
      lon = 104.055; lat = 1.095; dist = 0.66 / zoom;
    } else if (o.focus === 'nongsa') {
      lon = 104.088; lat = 1.168; dist = 0.60 / zoom;
    } else if (o.focus === 'kabil') {
      lon = 104.106; lat = 1.106; dist = 0.60 / zoom;
    } else if (o.showSG !== false || o.cables) {
      lon = 103.982; lat = 1.195; dist = 1.08 / zoom;
    } else {
      lon = 104.032; lat = 1.112; dist = 0.72 / zoom;
    }
  }
  const pitchDeg = o.pitch ?? lerp(34, 48, E.outCubic(clamp(dt / 4.5))) + 2.2 * Math.sin(dt * 0.45);
  const yawDeg = (o.yaw ?? -5) + 5.5 * Math.sin(dt * 0.32);

  const cam = buildCameraMVP({ lon, lat, dist, pitchDeg, yawDeg, fovDeg: 38, aspect: vw / vh });
  const focusUV = lonLatToUV(lon, lat);
  const haze = lightAmt > 0.5 ? [0.89, 0.88, 0.84] : [0.055, 0.082, 0.105];
  const glCanvas = mgl ? mgl.render(cam, {
    light: lightAmt, time: t, haze, focusUV, focusAmt: 0.45,
    wOut: Math.min(1280, Math.max(640, Math.round(vw))),
    hOut: Math.min(720, Math.max(360, Math.round(vh))),
  }) : null;

  ctx.save();
  ctx.globalAlpha = (o.a ?? 1) * k;
  const dx = fullBleed ? 0 : x - vw / 2;
  const dy = fullBleed ? 0 : y - vh / 2 + (1 - k) * 26;
  ctx.translate(dx, dy);

  // Clip viewport cleanly (rounded only when framed, zero neon border)
  ctx.beginPath();
  if (fullBleed || o.noFrame) ctx.rect(0, 0, vw, vh);
  else ctx.roundRect(0, 0, vw, vh, 14);
  ctx.clip();

  // 1. Draw WebGL2 3D perspective Sentinel-2 satellite drone plane
  if (glCanvas) {
    ctx.drawImage(glCanvas, 0, 0, vw, vh);
  } else {
    ctx.fillStyle = lightAmt > 0.5 ? '#DEDAD0' : '#0E171E';
    ctx.fillRect(0, 0, vw, vh);
  }

  // Subtle cinematic edge scrim inside the drone frame for documentary contrast
  const vg = ctx.createRadialGradient(vw * 0.5, vh * 0.5, vh * 0.25, vw * 0.5, vh * 0.5, vw * 0.68);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, lightAmt > 0.5 ? 'rgba(234,231,220,0.45)' : 'rgba(7,11,15,0.58)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, vw, vh);

  const proj = (lo, la, alt = 0) => projectPoint(cam.mvp, vw, vh, lonLatToWorld(lo, la, alt));

  // 2. Real 3D parabolic submarine internet cables arching across Singapore Strait
  if (o.cables) {
    const kc = E.outCubic(inv(o.cablesAt ?? t0 + 0.35, (o.cablesAt ?? t0 + 0.35) + 0.85, t));
    if (kc > 0.01) {
      for (let i = 0; i < CABLES_GEO.length; i++) {
        const [p0, p1] = CABLES_GEO[i];
        const steps = 18;
        const maxSeg = Math.max(1, Math.floor(steps * kc));
        // Subtle shadow on water surface directly beneath each 3D arch
        ctx.strokeStyle = 'rgba(0,0,0,0.32)';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        for (let j = 0; j <= maxSeg; j++) {
          const u = j / steps;
          const pt = proj(lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u), 0.001);
          if (pt) j === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // 3D arched fiber strand in warm matte ivory + subtle lime highlight on center strands
        ctx.strokeStyle = i % 3 === 1 ? 'rgba(200,245,60,0.82)' : 'rgba(241,239,230,0.72)';
        ctx.lineWidth = i % 3 === 1 ? 2.4 : 1.7;
        ctx.beginPath();
        for (let j = 0; j <= maxSeg; j++) {
          const u = j / steps;
          const arch = Math.sin(u * Math.PI) * (0.048 + (i % 3) * 0.014);
          const pt = proj(lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u), arch);
          if (pt) j === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Animated light packet riding the 3D cable arch
        if (kc > 0.8) {
          const pu = (t * 0.55 + i * 0.13) % 1;
          const arch = Math.sin(pu * Math.PI) * (0.048 + (i % 3) * 0.014);
          const bp = proj(lerp(p0[0], p1[0], pu), lerp(p0[1], p1[1], pu), arch);
          if (bp) {
            ctx.fillStyle = IVORY;
            ctx.beginPath(); ctx.arc(bp.x, bp.y, 3.2, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
    }
  }

  // 3. 12 km SWRO Coastal Pipeline (Kabil -> Nongsa) or Emergency Relief Pipe (Duriangkang -> Nongsa)
  const drawRoute = (pts, startAt, col, labelTxt) => {
    const kp = E.outCubic(inv(startAt, startAt + 0.95, t));
    if (kp <= 0.01) return;
    const sample = (u) => {
      const idx = u * (pts.length - 1), i0 = Math.floor(idx), i1 = Math.min(pts.length - 1, i0 + 1), f = idx - i0;
      return [lerp(pts[i0][0], pts[i1][0], f), lerp(pts[i0][1], pts[i1][1], f)];
    };
    ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 7.5; ctx.lineCap = 'round';
    ctx.beginPath();
    for (let j = 0; j <= 24; j++) {
      const u = (j / 24) * kp, [lo, la] = sample(u), pt = proj(lo, la, 0.004);
      if (pt) j === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = 4.2;
    ctx.beginPath();
    for (let j = 0; j <= 24; j++) {
      const u = (j / 24) * kp, [lo, la] = sample(u), pt = proj(lo, la, 0.008);
      if (pt) j === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
    if (kp > 0.75) {
      const pu = (t * 0.7) % 1, [lo, la] = sample(pu), pt = proj(lo, la, 0.012);
      if (pt) { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.2, 0, Math.PI * 2); ctx.fill(); }
      const [mlo, mla] = sample(0.52), mp = proj(mlo, mla, 0.025);
      if (mp && labelTxt) drawMapTag(ctx, mp.x + 12, mp.y - 10, labelTxt, { solidLime: true, align: 'left', small: true });
    }
  };
  if (o.pipe) drawRoute(SWRO_PIPE_GEO, o.pipeAt ?? t0 + 0.4, LIME, 'PIPA 12 KM');
  if (o.reliefPipe) drawRoute(RELIEF_PIPE_GEO, o.reliefAt ?? t0 + 0.4, LIME, 'PIPA DARURAT');

  // 4. Real 6 Reservoirs at exact GPS coordinates on Sentinel-2 lakes
  for (const w of RESERVOIRS_GEO) {
    const pBase = proj(w.lon, w.lat, 0.002);
    const pTop = proj(w.lon, w.lat, 0.036);
    if (!pBase || !pTop) continue;
    const hot = o.focus === w.id || o.focus === 'all' || (o.focus === 'nongsa' && w.id === 'nongsa_w');
    const pulse = hot ? 1 + 0.25 * Math.sin(t * 4.2) : 1;

    // Ground water ring
    ctx.fillStyle = hot ? 'rgba(200,245,60,0.34)' : 'rgba(130,198,232,0.38)';
    ctx.strokeStyle = hot ? LIME : 'rgba(241,239,230,0.85)';
    ctx.lineWidth = hot ? 2.4 : 1.5;
    ctx.beginPath(); ctx.ellipse(pBase.x, pBase.y, w.r * pulse, w.r * 0.62 * pulse, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    if (o.labels !== false && (hot || o.focus === 'all' || w.id === 'duriangkang' || w.id === 'nongsa_w')) {
      // Clean vertical architectural 3D pin stem
      ctx.strokeStyle = hot ? LIME : 'rgba(241,239,230,0.65)';
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(pBase.x, pBase.y); ctx.lineTo(pTop.x, pTop.y); ctx.stroke();
      drawMapTag(ctx, pTop.x, pTop.y - 12, w.name.toUpperCase(), { solidLime: hot && o.focus !== 'all', light: lightAmt > 0.5, small: true });
    }
  }

  // 5. Industrial & Data Center Hubs (KEK Nongsa & SWRO Kabil)
  for (const [key, h] of Object.entries(HUBS_GEO)) {
    const active = o.hubs || o.focus === key || o.pipe;
    if (!active) continue;
    const pBase = proj(h.lon, h.lat, 0.003);
    const pTop = proj(h.lon, h.lat, 0.055);
    if (!pBase || !pTop) continue;
    const isHero = key === 'kabil' || o.focus === key;
    ctx.fillStyle = isHero ? LIME : IVORY;
    ctx.beginPath(); ctx.arc(pBase.x, pBase.y, 6.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#0B0C09'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = isHero ? LIME : IVORY; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pBase.x, pBase.y); ctx.lineTo(pTop.x, pTop.y); ctx.stroke();
    drawMapTag(ctx, pTop.x, pTop.y - 14, h.name, { solidLime: isHero, light: lightAmt > 0.5, small: false });
  }

  // 6. Singapore & Pulau Batam landmark tags
  if (o.showSG !== false) {
    const pSG = proj(103.855, 1.330, 0.032);
    if (pSG) drawMapTag(ctx, pSG.x, pSG.y, 'SINGAPURA', { solidLime: false, light: lightAmt > 0.5, small: false });
  }
  if (o.showBatamLabel !== false && !o.pipe && !o.reliefPipe) {
    const pBT = proj(104.018, 1.072, 0.016);
    if (pBT && o.labels === false) drawMapTag(ctx, pBT.x, pBT.y, 'PULAU BATAM', { solidLime: true, light: lightAmt > 0.5, small: false });
  }

  // 7. Tiny clean onscreen satellite credit inside map corner
  ctx.fillStyle = lightAmt > 0.5 ? 'rgba(21,22,15,0.58)' : 'rgba(241,239,230,0.48)';
  setFont(ctx, `400 11px "Space Mono"`, 1);
  ctx.textAlign = 'right';
  ctx.fillText('Sentinel-2 Cloudless (EOX, CC BY 4.0)', vw - 14, vh - 12);
  ctx.textAlign = 'left';

  // Subtle matte architectural hairline frame (zero neon!)
  if (!fullBleed && !o.noFrame) {
    ctx.strokeStyle = lightAmt > 0.5 ? 'rgba(21,22,15,0.22)' : 'rgba(241,239,230,0.18)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(0.75, 0.75, vw - 1.5, vh - 1.5, 14); ctx.stroke();
  }

  ctx.restore();
}

// ── 3. Spine Object S4: Gelas Ukur 6 Waduk Batam (Hydraulic Sight-Glass Gauge) ─────────────────────────────────
export function gelasWaduk(ctx, x, y, s, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.5, t));
  if (k <= 0) return;
  const level = clamp(o.level ?? 0.85, 0, 1);
  const w = 180 * s, h = 420 * s;

  ctx.save();
  ctx.globalAlpha = (o.a ?? 1) * k;
  ctx.translate(x, y + (1 - k) * 30);

  // Cylinder glass housing
  ctx.fillStyle = 'rgba(13,22,30,0.88)';
  ctx.strokeStyle = 'rgba(241,239,230,0.45)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 20 * s); ctx.fill(); ctx.stroke();

  // Water level inside
  if (level > 0.01) {
    const wh = (h - 16) * level;
    const wy = h / 2 - 8 - wh;
    ctx.save();
    ctx.beginPath(); ctx.roundRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 16 * s); ctx.clip();
    const wg = ctx.createLinearGradient(0, wy, 0, h / 2);
    wg.addColorStop(0, o.critical ? 'rgba(200,245,60,0.72)' : 'rgba(92,168,205,0.72)');
    wg.addColorStop(1, 'rgba(18,48,68,0.88)');
    ctx.fillStyle = wg;
    ctx.fillRect(-w / 2 + 6, wy, w - 12, wh + 6);
    // Meniscus highlight
    ctx.fillStyle = o.critical ? LIME : IVORY;
    ctx.fillRect(-w / 2 + 6, wy, w - 12, 4);
    ctx.restore();
  }

  // Calibration tick marks
  ctx.strokeStyle = 'rgba(241,239,230,0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 1; i <= 5; i++) {
    const ty = h / 2 - (h * i) / 6;
    ctx.moveTo(-w / 2 + 10, ty);
    ctx.lineTo(-w / 2 + (i === 3 ? 42 : 26) * s, ty);
  }
  ctx.stroke();

  if (o.label) {
    setFont(ctx, MN(16 * s), 7);
    ctx.fillStyle = o.light ? '#15160F' : IVORY;
    ctx.textAlign = 'center';
    ctx.fillText(o.label, 0, -h / 2 - 18 * s);
  }
  if (o.val) {
    setFont(ctx, DSP(62 * s), 1);
    ctx.fillStyle = o.critical ? LIME : (o.light ? '#15160F' : IVORY);
    ctx.textAlign = 'center';
    ctx.fillText(o.val, 0, h / 2 + 62 * s);
  }

  ctx.restore();
}

// ── 4. Evaporative Cooling Tower Cutaway (Bab 2: 70–90% menguap ke langit vs dry cooling +25–35% listrik) ───
const STEAM_PARTICLES = (() => {
  const rng = mulberry32(202622);
  return Array.from({ length: 48 }, () => ({
    x0: (rng() - 0.5) * 110,
    phase: rng(),
    speed: 0.35 + rng() * 0.35,
    r: 12 + rng() * 18,
  }));
})();

export function menaraPendingin(ctx, x, y, s, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.5, t));
  if (k <= 0) return;
  const kSteam = clamp((t - (o.steamAt ?? t0 + 0.4)) / 0.5);

  ctx.save();
  ctx.globalAlpha = (o.a ?? 1) * k;
  ctx.translate(x, y + (1 - k) * 35);
  ctx.scale(s, s);

  // Stage 1: Server rack block on left + closed pipe loop
  ctx.fillStyle = '#181E24';
  ctx.strokeStyle = ivo(0.5);
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.roundRect(-480, -70, 210, 260, 14); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 ? 'rgba(241,239,230,0.18)' : 'rgba(200,245,60,0.45)';
    ctx.fillRect(-455, -40 + i * 36, 160, 14);
  }
  setFont(ctx, MN(16), 7); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
  ctx.fillText('1. RAK SERVER PANAS', -375, 224);

  // Closed pipe loop connecting Stage 1 -> Stage 2
  ctx.strokeStyle = 'rgba(241,239,230,0.55)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-270, 20); ctx.lineTo(-40, 20);
  ctx.moveTo(-270, 100); ctx.lineTo(-40, 100);
  ctx.stroke();

  // Animated coolant loop pulse inside Stage 1 pipes
  const lp = (t * 1.4) % 1;
  ctx.fillStyle = LIME;
  ctx.beginPath(); ctx.arc(lerp(-260, -50, lp), 20, 6, 0, Math.PI * 2); ctx.fill();

  // Stage 2: Hyperboloid Cooling Tower cutaway on right
  ctx.fillStyle = '#16212B';
  ctx.strokeStyle = ivo(0.55);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-40, 190);
  ctx.quadraticCurveTo(30, 30, 10, -140);
  ctx.lineTo(190, -140);
  ctx.quadraticCurveTo(170, 30, 240, 190);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Water spray inside tower
  ctx.strokeStyle = 'rgba(180,228,245,0.45)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  for (let sx = 40; sx <= 160; sx += 30) {
    ctx.moveTo(sx, 35); ctx.lineTo(sx + (sx - 100) * 0.25, 165);
  }
  ctx.stroke(); ctx.setLineDash([]);

  // Rising steam plume out the open top (batched in 1 path!)
  if (kSteam > 0.02) {
    ctx.fillStyle = `rgba(241,239,230,${0.22 * kSteam})`;
    ctx.beginPath();
    for (const p of STEAM_PARTICLES) {
      const prog = (p.phase + t * p.speed) % 1;
      const sx = 100 + p.x0 * (0.6 + prog * 1.4);
      const sy = lerp(-130, -340, prog);
      const sr = p.r * (0.6 + prog * 1.1);
      ctx.moveTo(sx + sr, sy);
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  setFont(ctx, MN(16), 7); ctx.fillStyle = LIME; ctx.textAlign = 'center';
  ctx.fillText('2. MENARA PENDINGIN (70–90% MENGUAP)', 100, 224);

  ctx.restore();
}

// ── 5. 19L Gallon Skala Absurd Field (Bab 3: 300 LPS ≈ 1,36 juta galon/hari) ─────────────────────────────────
export function galonBaris(ctx, x, y, s, t, t0, cols = 12, rows = 4) {
  const k = E.outQuint(inv(t0, t0 + 0.55, t));
  if (k <= 0) return;

  ctx.save();
  ctx.globalAlpha = k;
  ctx.translate(x, y);
  ctx.scale(s, s);

  const gw = 44, gh = 66, gapX = 60, gapY = 82;
  const x0 = -((cols - 1) * gapX) / 2;
  const y0 = -((rows - 1) * gapY) / 2;

  // Batched gallon bodies in 1 fill pass
  ctx.fillStyle = 'rgba(130,205,235,0.28)';
  ctx.strokeStyle = 'rgba(241,239,230,0.62)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (idx / (cols * rows) > k) continue;
      const gx = x0 + c * gapX, gy = y0 + r * gapY;
      ctx.roundRect(gx - gw / 2, gy - gh / 2 + 12, gw, gh - 12, 8);
      ctx.rect(gx - 9, gy - gh / 2, 18, 12);
    }
  }
  ctx.fill(); ctx.stroke();

  // Accent first gallon in lime to establish unit = 19L
  ctx.fillStyle = LIME;
  ctx.beginPath();
  ctx.roundRect(x0 - gw / 2 + 4, y0 - gh / 2 + 24, gw - 8, gh - 28, 5);
  ctx.fill();

  ctx.restore();
}

// ── 6. Reusable SWRO Membrane Cross-Section (Bab 3 & 4) ───────────────────────────────────────────────────────
const MEM_PARTICLES = (() => {
  const rng = mulberry32(20261118);
  return Array.from({ length: 110 }, (_, i) => ({
    salt: i % 2 === 1,
    y0: -18 + rng() * 146,
    phase: rng(),
    speed: 0.36 + rng() * 0.22,
    r: i % 2 === 1 ? 5.0 + rng() * 2.6 : 4.2 + rng() * 2.0,
    wob: rng() * Math.PI * 2,
  }));
})();

export function membranSWRO(ctx, x, y, s, t, t0, tTekan, o = {}) {
  const kEntry = E.outQuint(inv(t0, t0 + 0.45, t));
  if (kEntry <= 0) return;

  const kPump = E.outQuint(inv(t0 + 0.35, t0 + 0.80, t));
  const spTekan = spring(t - tTekan, 0.52, 0.36);

  ctx.save();
  ctx.globalAlpha = kEntry * (o.a ?? 1);
  ctx.translate(x, y + (1 - kEntry) * 35);
  ctx.scale(s, s);

  const vx = -580, vw = 1160, vy = -170, vh = 335;
  const shellGrad = ctx.createLinearGradient(0, vy, 0, vy + vh);
  shellGrad.addColorStop(0, '#1C2A35');
  shellGrad.addColorStop(0.5, '#0F1820');
  shellGrad.addColorStop(1, '#142029');
  ctx.fillStyle = shellGrad;
  ctx.beginPath(); ctx.roundRect(vx, vy, vw, vh, 22); ctx.fill();
  ctx.strokeStyle = o.light ? 'rgba(21,22,15,0.45)' : 'rgba(241,239,230,0.4)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.save();
  ctx.beginPath(); ctx.roundRect(vx + 6, vy + 6, vw - 12, vh - 12, 16); ctx.clip();
  ctx.fillStyle = 'rgba(28,64,86,0.50)';
  ctx.fillRect(vx, vy, vw / 2, vh);
  ctx.fillStyle = 'rgba(185,225,240,0.16)';
  ctx.fillRect(0, vy, vw / 2, vh);
  ctx.fillStyle = 'rgba(9,14,19,0.72)';
  ctx.fillRect(vx, vy, vw, 134);

  const flowFactor = t < tTekan ? 0.28 : lerp(0.28, 1.0, E.outCubic(inv(tTekan, tTekan + 0.55, t)));
  const memFlex = 14 * spTekan * Math.exp(-Math.max(0, t - tTekan) * 1.8);

  ctx.fillStyle = 'rgba(225,244,252,0.90)';
  ctx.beginPath();
  for (const p of MEM_PARTICLES) {
    if (p.salt) continue;
    const prog = (p.phase + t * p.speed * flowFactor) % 1;
    let px = lerp(vx + 135, vx + vw - 35, prog);
    const py = p.y0 + Math.sin(t * 3.5 + p.wob) * 6;
    if (t < tTekan && px > -14) px = -14 - ((px + 14) % 240);
    ctx.moveTo(px + p.r, py); ctx.arc(px, py, p.r, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.fillStyle = 'rgba(241,239,230,0.48)';
  ctx.beginPath();
  for (const p of MEM_PARTICLES) {
    if (!p.salt) continue;
    const prog = (p.phase + t * p.speed * flowFactor) % 1;
    let px, py;
    if (prog < 0.58) {
      const u = prog / 0.58;
      px = lerp(vx + 135, -24 + memFlex, u);
      py = p.y0 + Math.sin(t * 4.2 + p.wob) * 7;
    } else {
      const u = (prog - 0.58) / 0.42;
      px = lerp(-24 + memFlex, -180, u);
      py = lerp(p.y0, 148, E.inCubic(u));
    }
    ctx.moveTo(px + p.r, py); ctx.arc(px, py, p.r, 0, Math.PI * 2);
  }
  ctx.fill();

  const pistX = vx + 18 + 44 * kPump + 56 * spTekan;
  ctx.fillStyle = '#3E4D59';
  ctx.fillRect(vx, vy + 10, pistX - vx, vh - 20);
  ctx.fillStyle = LIME;
  ctx.fillRect(pistX - 4, vy + 18, 4, vh - 36);

  ctx.save();
  ctx.translate(memFlex, 0);
  ctx.fillStyle = 'rgba(241,239,230,0.18)';
  ctx.fillRect(-10, vy, 20, vh);
  ctx.strokeStyle = LIME; ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.moveTo(0, vy + 8); ctx.lineTo(0, vy + vh - 8); ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
  ctx.restore();

  const kNum = inv(tTekan, tTekan + 0.65, t);
  const brineVal = kNum >= 1 ? 70000 : Math.round(lerp(35000, 70000, E.outCubic(kNum)) / 1000) * 1000;
  const kLps = inv(tTekan + 0.2, tTekan + 0.75, t);
  const lpsVal = kLps >= 1 ? 300 : Math.round(lerp(0, 300, E.outCubic(kLps)) / 10) * 10;

  setFont(ctx, MN(16), 4); ctx.fillStyle = 'rgba(241,239,230,0.78)'; ctx.textAlign = 'left';
  ctx.fillText('AIR LAUT MASUK', vx + 148, vy + 32);
  setFont(ctx, DSP(88), 1); ctx.fillStyle = IVORY;
  ctx.fillText('35.000 PPM', vx + 148, vy + 116);

  setFont(ctx, MN(16), 4); ctx.fillStyle = LIME;
  ctx.fillText(o.rightLabel || '50% AIR TAWAR BERSIH', 34, vy + 32);
  setFont(ctx, DSP(102), 1); ctx.fillStyle = LIME;
  ctx.fillText(o.rightVal || `${fmt(lpsVal)} LPS`, 34, vy + 120);

  setFont(ctx, MN(16), 7); ctx.fillStyle = o.light ? '#3B4035' : 'rgba(241,239,230,0.76)'; ctx.textAlign = 'right';
  ctx.fillText('50% SISA GARAM PEKAT (BRINE)', -230, vy + vh + 28);
  setFont(ctx, DSP(86), 1); ctx.fillStyle = o.light ? '#15160F' : IVORY;
  ctx.fillText(`${fmt(brineVal)} PPM`, -230, vy + vh + 108);
  ctx.textAlign = 'left';

  ctx.restore();
}
