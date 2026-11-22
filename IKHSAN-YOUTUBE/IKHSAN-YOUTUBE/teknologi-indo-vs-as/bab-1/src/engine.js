// Minimal deterministic 2D engine: every frame is a pure function of t.
export const W = 1920, H = 1080, FPS = 30;

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const inv = (a, b, x) => clamp((x - a) / (b - a));
export const lerp = (a, b, k) => a + (b - a) * k;

function bez(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = t => ((ax * t + bx) * t + cx) * t, sy = t => ((ay * t + by) * t + cy) * t;
  const dx = t => (3 * ax * t + 2 * bx) * t + cx;
  return k => {
    if (k <= 0) return 0; if (k >= 1) return 1;
    let t = k;
    for (let i = 0; i < 8; i++) { const e = sx(t) - k, d = dx(t); if (Math.abs(e) < 1e-6 || Math.abs(d) < 1e-6) break; t -= e / d; }
    return sy(clamp(t));
  };
}

export const E = {
  lin: k => clamp(k),
  outCubic: k => 1 - Math.pow(1 - clamp(k), 3),
  inCubic: k => Math.pow(clamp(k), 3),
  inOutCubic: k => (k = clamp(k), k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
  outQuart: k => 1 - Math.pow(1 - clamp(k), 4),
  outQuint: k => 1 - Math.pow(1 - clamp(k), 5),
  outExpo: k => (k = clamp(k), k >= 1 ? 1 : 1 - Math.pow(2, -10 * k)),
  inExpo: k => (k = clamp(k), k <= 0 ? 0 : Math.pow(2, 10 * k - 10)),
  inOutQuart: k => (k = clamp(k), k < .5 ? 8 * k ** 4 : 1 - Math.pow(-2 * k + 2, 4) / 2),
  outSine: k => Math.sin(clamp(k) * Math.PI / 2),
  inOutSine: k => -(Math.cos(Math.PI * clamp(k)) - 1) / 2,
  snap: bez(0.8, 0, 0.15, 1),
  brake: bez(0.1, 0.9, 0.15, 1), // ae:out≈0.1,in≈85 — fast start, long brake
  expo16: k => (1 - Math.exp(-16 * clamp(k))) / (1 - Math.exp(-16)),
};

// damped spring step response, s = seconds since trigger
export function spring(s, zeta = 0.65, T = 0.35) {
  if (s <= 0) return 0;
  const w = 2 * Math.PI / T, wd = w * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * w * s) * (Math.cos(wd * s) + zeta / Math.sqrt(1 - zeta * zeta) * Math.sin(wd * s));
}

export function hex(c) { const n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
export function mix(a, b, k) { const A = hex(a), B = hex(b); k = clamp(k); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; }
export function rgba(c, a) { const [r, g, b] = hex(c); return `rgba(${r},${g},${b},${a})`; }

export function rrect(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
}

// font string helper; fam: 'Inter' | 'Archivo'
export function font(ctx, size, weight = 450, fam = 'Inter', spacingEm = 0, stretch = 'normal') {
  ctx.font = `${weight} ${size}px "${fam}"`;
  ctx.fontStretch = stretch;
  ctx.letterSpacing = `${(spacingEm * size).toFixed(2)}px`;
}

// per-letter layout: x offsets (left of each glyph) with kerning + tracking
export function layout(ctx, str) {
  const xs = [];
  for (let i = 0; i < str.length; i++) xs.push(ctx.measureText(str.slice(0, i)).width);
  const full = ctx.measureText(str).width;
  const ws = str.split('').map((c, i) => (i + 1 < str.length ? xs[i + 1] : full) - xs[i]);
  return { xs, ws, width: full };
}

let grainTile = null;
function grain(ctx, f, amt) {
  if (!grainTile) {
    grainTile = document.createElement('canvas'); grainTile.width = grainTile.height = 256;
    const g = grainTile.getContext('2d'), im = g.createImageData(256, 256);
    let s = 1234567;
    for (let i = 0; i < im.data.length; i += 4) { s = (s * 1103515245 + 12345) >>> 0; const v = (s >>> 16) & 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    g.putImageData(im, 0, 0);
  }
  ctx.save(); ctx.globalAlpha = amt; ctx.globalCompositeOperation = 'overlay';
  const ox = (f * 97) % 256, oy = (f * 61) % 256;
  ctx.translate(-ox, -oy);
  ctx.fillStyle = ctx.createPattern(grainTile, 'repeat'); ctx.fillRect(0, 0, W + 256, H + 256);
  // overlay does nothing on near-black: a faint screen pass keeps the dark fields from looking like plastic
  ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = amt * 0.55;
  ctx.fillRect(0, 0, W + 256, H + 256);
  ctx.restore();
}

// scene = { dur, cuts:[t...], draw(ctx,t), K?, grain? }
export function makeRenderer(scene) {
  const out = document.getElementById('c');
  out.width = W; out.height = H;
  const octx = out.getContext('2d');
  const layer = document.createElement('canvas'); layer.width = W; layer.height = H;
  const lctx = layer.getContext('2d');
  const cuts = [0, ...(scene.cuts || []), 1e9];
  const segOf = t => { for (let i = 0; i < cuts.length - 1; i++) if (t >= cuts[i] - 1e-9 && t < cuts[i + 1] - 1e-9) return [cuts[i], cuts[i + 1]]; return [0, 1e9]; };
  return function render(f, still = false, noRead = false, tAt = null) {      // noRead/tAt: Motion Studio preview
    const t0 = tAt ?? f / FPS, K = still ? 1 : (scene.K || 8), shutter = 0.5 / FPS;
    const [a, b] = segOf(t0);
    for (let i = 0; i < K; i++) {
      let t = K === 1 ? t0 : t0 + ((i + 0.5) / K - 0.5) * shutter;
      t = clamp(t, a, b - 1e-4);
      lctx.setTransform(1, 0, 0, 1, 0, 0); lctx.globalAlpha = 1; lctx.filter = 'none';
      scene.draw(lctx, t);
      octx.globalAlpha = 1 / (i + 1); octx.drawImage(layer, 0, 0);
    }
    octx.globalAlpha = 1;
    if (scene.post) scene.post(octx, t0, f);
    grain(octx, f, scene.grain ?? 0.05);
    if (noRead) return null;
    return out.toDataURL('image/jpeg', 0.93);
  };
}
