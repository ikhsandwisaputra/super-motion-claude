import { createSim, rope, cloth, blob } from './verlet-mini.mjs';

const finite = (sim) => { for (let i = 0; i < sim.count; i++) if (!Number.isFinite(sim.x[i]) || !Number.isFinite(sim.y[i])) return false; return true; };
const maxStretch = (sim) => { let m = 0; for (const c of sim.links) { if (!c.alive) continue; const L = Math.hypot(sim.x[c.a]-sim.x[c.b], sim.y[c.a]-sim.y[c.b]); m = Math.max(m, Math.abs(L - c.rest) / c.rest); } return m; };

// 1) rope pinned at one end, released horizontally -> swings and hangs
{
  const sim = createSim({ bounds: { x0: 0, y0: 0, x1: 2000, y1: 2000 } });
  const ids = rope(sim, 500, 100, 900, 100, 20);
  for (let f = 0; f < 600; f++) sim.step(1 / 60);
  const tip = ids[ids.length - 1];
  console.log('rope: finite', finite(sim), 'maxStretch', maxStretch(sim).toFixed(4), 'tip', sim.x[tip].toFixed(1), sim.y[tip].toFixed(1), '(expect ~500, ~500)');
}
// 2) cloth pinned top every 4 cols, settles; grab + throw
{
  const sim = createSim({ bounds: { x0: 0, y0: 0, x1: 2000, y1: 1200 } });
  const ids = cloth(sim, 400, 100, 24, 16, 20, { pinEvery: 4 });
  for (let f = 0; f < 300; f++) sim.step(1 / 60);
  const g = sim.pick(sim.x[ids[ids.length - 1]], sim.y[ids[ids.length - 1]], 30);
  for (let f = 0; f < 30; f++) { sim.drag(sim.x[g] + 15, sim.y[g] + 5); sim.step(1 / 60); }
  sim.release(900, 300);
  for (let f = 0; f < 300; f++) sim.step(1 / 60);
  console.log('cloth: finite', finite(sim), 'grabbed', g, 'maxStretch', maxStretch(sim).toFixed(4), 'links', sim.links.length);
}
// 3) tearing: same cloth, pull a corner far away
{
  const sim = createSim({ bounds: { x0: -5000, y0: -5000, x1: 5000, y1: 5000 } });
  const ids = cloth(sim, 400, 100, 16, 10, 20, { pinEvery: 3, tear: 1.6 });
  const g = sim.pick(sim.x[ids[ids.length - 1]], sim.y[ids[ids.length - 1]], 30);
  for (let f = 0; f < 120; f++) { sim.drag(sim.x[g] + 25, sim.y[g] + 25); sim.step(1 / 60); }
  const dead = sim.links.filter(c => !c.alive).length;
  console.log('tear: finite', finite(sim), 'torn links', dead, 'of', sim.links.length);
}
// 4) pressure blob dropped on floor keeps its area
{
  const sim = createSim({ bounds: { x0: 0, y0: 0, x1: 1200, y1: 800 }, linearDamping: 0.3 });
  const ids = blob(sim, 600, 300, 80, 24, { pressure: 1.0, ringCompliance: 1e-5, areaCompliance: 1e-6 });
  const A0 = sim.areas[0].rest;
  let minRatio = 1, maxRatio = 1;
  for (let f = 0; f < 600; f++) { sim.step(1 / 60); const r = sim.polyArea(ids) / A0; minRatio = Math.min(minRatio, r); maxRatio = Math.max(maxRatio, r); }
  const cy = ids.reduce((s, i) => s + sim.y[i], 0) / ids.length;
  console.log('blob: finite', finite(sim), 'area ratio range', minRatio.toFixed(3), maxRatio.toFixed(3), 'centroid y', cy.toFixed(1), '(floor 800, r 80 -> ~720+)');
}
// 5) inflate: pressure 1.3 -> area grows toward 1.3
{
  const sim = createSim({ bounds: { x0: 0, y0: 0, x1: 1200, y1: 800 } });
  const ids = blob(sim, 600, 300, 80, 24, { pressure: 1.3, ringCompliance: 2e-4 });
  for (let f = 0; f < 300; f++) sim.step(1 / 60);
  console.log('blob inflate: area ratio', (sim.polyArea(ids) / sim.areas[0].rest).toFixed(3), '(ring compliant -> grows toward 1.3)');
}
// 6) frame-rate independence: same sim at 60 Hz vs 120 Hz fixed dt for 2 s
{
  const run = (hz) => { const sim = createSim({ bounds: null }); const ids = rope(sim, 0, 0, 300, 0, 10); for (let f = 0; f < 2 * hz; f++) sim.step(1 / hz); const t = ids[ids.length - 1]; return [sim.x[t], sim.y[t]]; };
  const a = run(60), b = run(120);
  console.log('dt-independence: 60Hz tip', a.map(v => v.toFixed(1)).join(','), ' 120Hz tip', b.map(v => v.toFixed(1)).join(','));
}
