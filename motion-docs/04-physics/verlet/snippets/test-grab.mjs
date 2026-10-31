import { createSim, cloth } from './verlet-mini.mjs';
function stats(sim) { let s = 0; for (const c of sim.links) { if (!c.alive) continue; const L = Math.hypot(sim.x[c.a]-sim.x[c.b], sim.y[c.a]-sim.y[c.b]); const e = (L - c.rest)/c.rest; if (Math.abs(e) > Math.abs(s)) s = e; } return s.toFixed(3); }
for (const gc of [0, 1e-5, 1e-4]) {
  const sim = createSim({ bounds: { x0: 0, y0: 0, x1: 2000, y1: 1200 }, grabCompliance: gc });
  const ids = cloth(sim, 400, 100, 24, 16, 20, { pinEvery: 4 });
  for (let f = 0; f < 300; f++) sim.step(1 / 60);
  const g = sim.pick(sim.x[ids[ids.length - 1]], sim.y[ids[ids.length - 1]], 30);
  let lagMax = 0;
  for (let f = 0; f < 30; f++) { const tx = 400 + 23*20 + 15*(f+1), ty = 100 + 15*20 + 5*(f+1); sim.drag(tx, ty); sim.step(1 / 60); lagMax = Math.max(lagMax, Math.hypot(sim.x[g]-tx, sim.y[g]-ty)); }
  const dragged = stats(sim);
  sim.release(900, 300);
  for (let f = 0; f < 600; f++) sim.step(1 / 60);
  let ok = true; for (let i = 0; i < sim.count; i++) if (!Number.isFinite(sim.x[i])) ok = false;
  console.log(`grabCompliance ${gc}: maxStrain while dragged ${dragged}, pointer lag max ${lagMax.toFixed(1)}px, after settle ${stats(sim)}, finite ${ok}`);
}
