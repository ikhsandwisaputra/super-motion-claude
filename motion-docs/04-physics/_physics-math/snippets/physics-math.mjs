// Snippets for _physics-math/NOTES.md — each one is tested in test-math.mjs

// ---- spring parameter conversions (mass m = 1 unless given) ----
export const zetaOf = (k, c, m = 1) => c / (2 * Math.sqrt(k * m));          // damping ratio
export const omega0Of = (k, m = 1) => Math.sqrt(k / m);                       // rad/s
export const criticalDamping = (k, m = 1) => 2 * Math.sqrt(k * m);
// Motion v14 mapping (spring.ts): bounce -> zeta, visualDuration -> omega0 (period = 1.2*vd)
export const bounceToZeta = (b) => (b < 0 ? 1 / Math.max(1 + b, 0.05) : Math.max(1 - b, 0.05));
export function springFromVisual(visualDuration, bounce = 0) {
  const zeta = bounceToZeta(bounce);
  const w0 = (2 * Math.PI) / (visualDuration * 1.2);   // (ignores Motion's extra overdamped scaling for bounce<0)
  return { stiffness: w0 * w0, damping: 2 * zeta * w0, mass: 1, zeta, w0 };
}
// Orange Duck (spring-roll-call): halflife <-> damping, Hz <-> stiffness
export const halflifeToDamping = (hl) => (4 * Math.LN2) / hl;               // d = 4 ln2 / halflife
export const hzToStiffness = (f) => (2 * Math.PI * f) ** 2;                 // k = (2 pi f)^2
// Overshoot fraction of an underdamped step response (zero initial velocity)
export const overshoot = (zeta) => (zeta >= 1 ? 0 : Math.exp((-Math.PI * zeta) / Math.sqrt(1 - zeta * zeta)));
// Time until the envelope e^{-zeta w0 t} falls below eps (fraction of the distance)
export const settleTime = (zeta, w0, eps = 0.001) => -Math.log(eps) / (Math.min(zeta, 1) * w0);

// ---- exact critically-damped spring step (any dt, stable) — Orange Duck simple_spring_damper_exact ----
export function criticalSpringStep(s, goal, halflife, dt) {
  const y = halflifeToDamping(halflife) / 2;
  const j0 = s.x - goal, j1 = s.v + j0 * y, e = Math.exp(-y * dt);
  s.x = e * (j0 + j1 * dt) + goal;
  s.v = e * (s.v - j1 * y * dt);
  return s;
}

// ---- semi-implicit (symplectic) Euler spring step with substeps (any zeta) ----
export function springStep(s, goal, k, c, dt, substeps = 4, m = 1) {
  const h = dt / substeps;
  for (let i = 0; i < substeps; i++) {
    const a = (-k * (s.x - goal) - c * s.v) / m;
    s.v += a * h;            // velocity first ...
    s.x += s.v * h;          // ... then position with the NEW velocity (symplectic)
  }
  return s;
}

// ---- frame-rate independent smoothing (Driscoll / Orange Duck) ----
export const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));     // lambda in 1/s
export const dampHalflife = (a, b, halflife, dt) => damp(a, b, Math.LN2 / halflife, dt);
export const lerpFactorToLambda = (f, fps = 60) => -fps * Math.log(1 - f);              // "lerp(a,b,f) per frame" -> lambda

// ---- rubber band (iOS UIScrollView, via Holko citing chpwn): x = overshoot, d = dimension ----
export const rubberband = (x, d, c = 0.55) => (x * d * c) / (d + c * x);
export const rubberbandSigned = (x, d, c = 0.55) => Math.sign(x) * rubberband(Math.abs(x), d, c);

// ---- momentum projection ----
export const projectIOS = (v, rate = 0.998) => ((v / 1000) * rate) / (1 - rate);       // px, v in px/s, rate per ms
export const projectExp = (v, tauMs) => v * (tauMs / 1000);                              // velocity-continuous decay
export function decayCurve(x0, v, tauMs, snap) {          // returns x(t_ms); snap(target)->snapped target
  let A = projectExp(v, tauMs);
  const target = snap ? snap(x0 + A) : x0 + A;
  A = target - x0;
  return (t) => target - A * Math.exp(-t / tauMs);
}

// ---- throw velocity from pointer history (Motion PanSession-style window) ----
export function velocityFromHistory(history, windowMs = 100) {   // history: [{x,y,t}] ascending
  if (history.length < 2) return { x: 0, y: 0 };
  const last = history[history.length - 1];
  let i = history.length - 1;
  while (i > 0 && last.t - history[i].t <= windowMs) i--;
  const first = history[i], dt = (last.t - first.t) / 1000;
  return dt > 0 ? { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt } : { x: 0, y: 0 };
}

// ---- fixed timestep with interpolation (Gaffer "Fix Your Timestep!") ----
export function createLoop({ dt = 1 / 60, maxFrame = 0.25, step, render }) {
  let acc = 0, last = performance.now() / 1000;
  return function frame(nowMs) {
    const now = nowMs / 1000;
    let frameTime = Math.min(now - last, maxFrame);   // spiral-of-death guard
    last = now; acc += frameTime;
    while (acc >= dt) { step(dt); acc -= dt; }
    render(acc / dt);                                  // alpha: blend previous -> current state
  };
}
