import * as M from './physics-math.mjs';

// 1) Motion defaults: k=100, c=10, m=1
console.log('Motion default zeta', M.zetaOf(100, 10).toFixed(3), 'w0', M.omega0Of(100), 'overshoot', (M.overshoot(0.5) * 100).toFixed(1) + '%',
  'damped period', (2 * Math.PI / (10 * Math.sqrt(1 - 0.25))).toFixed(3) + 's', 'settle(0.5% of dist)', M.settleTime(0.5, 10, 0.005).toFixed(2) + 's');

// 2) visualDuration/bounce mapping
for (const [vd, b] of [[0.3, 0.3], [0.5, 0], [0.5, 0.25], [0.8, 0.5]]) {
  const s = M.springFromVisual(vd, b);
  // simulate step response with exact-ish small-step semi-implicit Euler to measure peak & 2%-settle
  const st = { x: 0, v: 0 }; let peak = 0, t = 0, lastOut = 0;
  for (let i = 0; i < 20000; i++) { M.springStep(st, 1, s.stiffness, s.damping, 0.0005, 1); t += 0.0005; peak = Math.max(peak, st.x); if (Math.abs(st.x - 1) > 0.02) lastOut = t; }
  console.log(`visualDuration ${vd}s bounce ${b}: k=${s.stiffness.toFixed(1)} c=${s.damping.toFixed(2)} zeta=${s.zeta.toFixed(2)} overshoot=${((peak - 1) * 100).toFixed(1)}% (formula ${(M.overshoot(s.zeta) * 100).toFixed(1)}%) 2%-settle=${lastOut.toFixed(3)}s`);
}

// 3) critical spring exact step: dt independence
{
  const run = (hz) => { const s = { x: 0, v: 0 }; for (let i = 0; i < hz * 0.4; i++) M.criticalSpringStep(s, 100, 0.1, 1 / hz); return s.x; };
  console.log('critical spring after 0.4s @60Hz', run(60).toFixed(4), '@144Hz', run(144).toFixed(4), '@30Hz', run(30).toFixed(4));
}

// 4) semi-implicit spring: stability at big dt with substeps vs explicit euler blowup check
{
  const k = 1500, c = 10; const s = { x: 0, v: 0 };
  for (let i = 0; i < 120; i++) M.springStep(s, 1, k, c, 1 / 60, 1);
  const s4 = { x: 0, v: 0 }; for (let i = 0; i < 120; i++) M.springStep(s4, 1, k, c, 1 / 60, 4);
  console.log('stiff spring k=1500 (w0=38.7rad/s) 2s: 1 substep x=', s.x.toFixed(3), ' 4 substeps x=', s4.x.toFixed(3));
}

// 5) damp: frame-rate independence + lerp-factor conversion
{
  let a60 = 0, a144 = 0; for (let i = 0; i < 60; i++) a60 = M.damp(a60, 1, 8, 1 / 60); for (let i = 0; i < 144; i++) a144 = M.damp(a144, 1, 8, 1 / 144);
  const lam = M.lerpFactorToLambda(0.1, 60);
  console.log('damp after 1s: 60Hz', a60.toFixed(5), '144Hz', a144.toFixed(5), '| lerp 0.1/frame@60fps -> lambda', lam.toFixed(3), '/s, halflife', (Math.LN2 / lam * 1000).toFixed(1), 'ms; same code @120fps halflife', (Math.LN2 / M.lerpFactorToLambda(0.1, 120) * 1000).toFixed(1), 'ms');
}

// 6) rubber band
{
  const d = 800; const xs = [10, 100, 400, 800, 4000, 1e6];
  console.log('rubberband d=800 c=0.55:', xs.map(x => `${x}->${M.rubberband(x, d).toFixed(1)}`).join('  '), '| Motion dragElastic 0.35 linear: 400->', (0.35 * 400).toFixed(1));
}

// 7) projection
{
  const v = 2000;
  console.log('projection v=2000px/s: iOS normal(0.998)', M.projectIOS(v, 0.998).toFixed(1), 'px; fast(0.99)', M.projectIOS(v, 0.99).toFixed(1), 'px; exp tau 325ms', M.projectExp(v, 325).toFixed(1), 'px; Motion power 0.8 ->', (0.8 * v).toFixed(0), 'px');
  console.log('tau equivalents: rate 0.998 -> tau', (-1 / Math.log(0.998)).toFixed(1), 'ms; 0.99 -> tau', (-1 / Math.log(0.99)).toFixed(1), 'ms');
  console.log('initial-velocity ratio of Motion inertia: tau 325 ->', (0.8 / 0.325).toFixed(2), 'x ; drag tau 750 ->', (0.8 / 0.75).toFixed(2), 'x');
  const f = M.decayCurve(0, 1500, 325, (t) => Math.round(t / 300) * 300);
  console.log('snap decay: x(0)', f(0).toFixed(1), 'x(325)', f(325).toFixed(1), 'x(2000)', f(2000).toFixed(1));
}

// 8) velocity estimate: steady 1000 px/s motion sampled at irregular 8-17ms, then hold 150ms
{
  const h = []; let t = 0, x = 0; for (let i = 0; i < 30; i++) { const d = 8 + (i % 3) * 4.5; t += d; x += d; h.push({ x, y: 0, t }); }
  console.log('velocity est (1000px/s):', M.velocityFromHistory(h).x.toFixed(1));
  h.push({ x, y: 0, t: t + 150 });
  console.log('after 150ms hold -> velocity', M.velocityFromHistory(h).x.toFixed(1), '(window catches the stop: no false throw)');
}
