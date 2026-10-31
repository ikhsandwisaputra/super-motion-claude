// Deterministic helpers: every value is a pure function of its inputs (frame index, seed).
export const FPS = 30;
export const W = 1920, H = 1080;

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const inv = (a, b, x) => clamp((x - a) / (b - a));
export const smooth = (t) => t * t * (3 - 2 * t);

// Hash-based PRNG (stable across runs and workers).
export function hash(...n) {
  let h = 2166136261 >>> 0;
  for (const v of n) {
    let x = Math.floor(v * 1000) | 0;
    h ^= x; h = Math.imul(h, 16777619);
    h ^= h >>> 13; h = Math.imul(h, 0x5bd1e995); h ^= h >>> 15;
  }
  return (h >>> 0) / 4294967296;
}
export function rng(seed) {
  let s = (Math.floor(seed * 9301) ^ 0x9e3779b9) >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Easings (easings.net). Signature set for this video:
// expoOut = entrances, inOutQuart = camera/wipes, inExpo = exits/whips.
export const ease = {
  linear: (t) => t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inCubic: (t) => t * t * t,
  outQuint: (t) => 1 - Math.pow(1 - t, 5),
  outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inExpo: (t) => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10)),
  inOutQuart: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2),
  inOutCubic: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2),
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  outBack: (t, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
};

// Closed-form damped spring step response (x: 0 -> 1), m = 1.
// zeta < 1 overshoots; T = natural period in seconds. (motion-docs 04-physics/_physics-math/NOTES.md)
export function spring(t, T = 0.25, zeta = 0.5) {
  if (t <= 0) return 0;
  const w0 = (2 * Math.PI) / T;
  if (zeta >= 1) return 1 - (1 + w0 * t) * Math.exp(-w0 * t);
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta * w0 / wd) * Math.sin(wd * t));
}
// Impulse response (kick that rings and settles to 0) — used for shakes/punches.
export function kick(t, T = 0.18, zeta = 0.35) {
  if (t <= 0) return 0;
  const w0 = (2 * Math.PI) / T;
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  return Math.exp(-zeta * w0 * t) * Math.sin(wd * t);
}

// Smooth value noise 1D (for drift/handheld), seeded.
export function noise1(x, seed = 0) {
  const i = Math.floor(x), f = x - i;
  const a = hash(i, seed) * 2 - 1, b = hash(i + 1, seed) * 2 - 1;
  return lerp(a, b, smooth(f));
}

export function hex(c) {
  const n = parseInt(c.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function rgba(c, a = 1) {
  const [r, g, b] = hex(c);
  return `rgba(${r},${g},${b},${a})`;
}
export function mixHex(c1, c2, t) {
  const a = hex(c1), b = hex(c2);
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
}

export function makeCanvas(w = W, h = H) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: false });
  return [c, ctx];
}

export const PAL = {
  bg: "#050505", orange: "#E8641A", orangeEdge: "#A33808", alarm: "#B3000C", red: "#E3262F",
  deep: "#7A0008", teal: "#19C3B5", amber: "#F5A623", yellow: "#FFD60A", counter: "#FF7A1A",
  white: "#FFFFFF", salmon: "#F28C7C", claude: "#D97757",
};
