// verlet-mini — 2D position-based dynamics (Jakobsen Verlet + XPBD compliance + substeps)
// Particles: typed arrays. Constraints: distance (rope/cloth), area (pressure blob).
// Units: px, seconds. Call sim.step(dt) from a FIXED-step loop (see _physics-math).
export function createSim({
  max = 4096,
  gravity = [0, 2000],      // px/s^2  (~2 g if 1 m = 100 px)
  substeps = 8,             // XPBD: more substeps > more iterations
  linearDamping = 0.6,      // 1/s, frame-rate independent: v *= exp(-k*h)
  bounds = null,            // {x0,y0,x1,y1} box, or null
  friction = 0.4,           // 0..1 tangential velocity removed on contact (Jakobsen-style)
  restitution = 0.2,        // 0..1 normal velocity kept (bounce) on contact
  grabCompliance = 0,       // 0 = hard grab; ~1e-5..1e-3 = elastic tether (px units, mass 1)
} = {}) {
  const x = new Float32Array(max), y = new Float32Array(max);
  const px = new Float32Array(max), py = new Float32Array(max);
  const w = new Float32Array(max);           // inverse mass, 0 = pinned
  const links = [];                          // {a,b,rest,compliance,tear,alive}
  const areas = [];                          // {ids,rest,compliance,pressure}
  let n = 0, grab = -1, grabW = 0, gx = 0, gy = 0;

  const addParticle = (X, Y, invMass = 1) => {
    x[n] = px[n] = X; y[n] = py[n] = Y; w[n] = invMass; return n++;
  };
  const link = (a, b, { compliance = 0, tear = Infinity, rest } = {}) => {
    const r = rest ?? Math.hypot(x[a] - x[b], y[a] - y[b]);
    const c = { a, b, rest: r, compliance, tear, alive: true };
    links.push(c); return c;
  };
  const polyArea = (ids) => {
    let A = 0;
    for (let i = 0; i < ids.length; i++) {
      const p = ids[i], q = ids[(i + 1) % ids.length];
      A += x[p] * y[q] - x[q] * y[p];
    }
    return 0.5 * A;
  };
  const areaConstraint = (ids, { compliance = 0, pressure = 1 } = {}) => {
    const c = { ids, rest: polyArea(ids), compliance, pressure };
    areas.push(c); return c;
  };

  function solveLinks(h) {
    for (const c of links) {
      if (!c.alive) continue;
      const { a, b } = c;
      const wsum = w[a] + w[b];
      if (wsum === 0) continue;
      let dx = x[a] - x[b], dy = y[a] - y[b];
      const len = Math.hypot(dx, dy);
      if (len < 1e-9) continue;
      if (len > c.rest * c.tear) { c.alive = false; continue; }   // tearing
      dx /= len; dy /= len;
      const alpha = c.compliance / (h * h);                        // XPBD
      const s = -(len - c.rest) / (wsum + alpha);
      x[a] += dx * s * w[a]; y[a] += dy * s * w[a];
      x[b] -= dx * s * w[b]; y[b] -= dy * s * w[b];
    }
  }

  function solveAreas(h) {
    for (const c of areas) {
      const ids = c.ids, m = ids.length;
      const C = polyArea(ids) - c.rest * c.pressure;
      let denom = c.compliance / (h * h);
      const gxs = new Float32Array(m), gys = new Float32Array(m);
      for (let i = 0; i < m; i++) {
        const prev = ids[(i - 1 + m) % m], next = ids[(i + 1) % m];
        gxs[i] = 0.5 * (y[next] - y[prev]);                          // dA/dx_i
        gys[i] = 0.5 * (x[prev] - x[next]);                          // dA/dy_i
        denom += w[ids[i]] * (gxs[i] * gxs[i] + gys[i] * gys[i]);
      }
      if (denom < 1e-12) continue;
      const s = -C / denom;
      for (let i = 0; i < m; i++) {
        const p = ids[i];
        x[p] += s * w[p] * gxs[i]; y[p] += s * w[p] * gys[i];
      }
    }
  }

  // Collision by projection (Jakobsen §3): move the point out, then edit the PREVIOUS
  // position so the implicit velocity gets restitution (normal) and friction (tangent).
  function collide() {
    if (!bounds) return;
    const { x0, y0, x1, y1 } = bounds;
    for (let i = 0; i < n; i++) {
      if (w[i] === 0) continue;
      if (y[i] > y1 || y[i] < y0) {
        const vy = y[i] - py[i], wall = y[i] > y1 ? y1 : y0;
        y[i] = wall; py[i] = wall + vy * restitution;   // v_n' = -e * v_n
        px[i] += (x[i] - px[i]) * friction;             // v_t' = (1 - friction) * v_t
      }
      if (x[i] > x1 || x[i] < x0) {
        const vx = x[i] - px[i], wall = x[i] > x1 ? x1 : x0;
        x[i] = wall; px[i] = wall + vx * restitution;
        py[i] += (y[i] - py[i]) * friction;
      }
    }
  }

  function step(dt) {
    const h = dt / substeps;
    const keep = Math.exp(-linearDamping * h);
    for (let s = 0; s < substeps; s++) {
      for (let i = 0; i < n; i++) {                 // Verlet predict (velocity = x - px)
        if (w[i] === 0) continue;
        const vx = (x[i] - px[i]) * keep, vy = (y[i] - py[i]) * keep;
        px[i] = x[i]; py[i] = y[i];
        x[i] += vx + gravity[0] * h * h;
        y[i] += vy + gravity[1] * h * h;
      }
      if (grab >= 0 && grabCompliance === 0) { x[grab] = gx; y[grab] = gy; } // hard grab = kinematic
      if (grab >= 0 && grabCompliance > 0) {        // soft grab = XPBD zero-length spring to pointer
        const dx = x[grab] - gx, dy = y[grab] - gy, len = Math.hypot(dx, dy);
        if (len > 1e-9) {
          const s = -len / (w[grab] + grabCompliance / (h * h));
          x[grab] += (dx / len) * s * w[grab]; y[grab] += (dy / len) * s * w[grab];
        }
      }
      solveLinks(h);
      solveAreas(h);
      collide();
    }
  }

  // Pointer grab. Hard (grabCompliance 0): particle becomes kinematic (w=0) — exact but a
  // pinned cloth then stretches without limit. Soft (>0): elastic tether with lag = tactile.
  function pick(X, Y, radius = 40) {
    let best = -1, bd = radius * radius;
    for (let i = 0; i < n; i++) {
      const d = (x[i] - X) ** 2 + (y[i] - Y) ** 2;
      if (d < bd && w[i] > 0) { bd = d; best = i; }
    }
    if (best >= 0) {
      grab = best; grabW = w[best]; gx = X; gy = Y;
      if (grabCompliance === 0) w[best] = 0;
    }
    return best;
  }
  const drag = (X, Y) => { gx = X; gy = Y; };
  // Release with throw velocity (px/s) from pointer history (see _physics-math §throw).
  function release(vx = 0, vy = 0, dt = 1 / 60) {
    if (grab < 0) return;
    const h = dt / substeps;
    w[grab] = grabW;
    if (grabCompliance === 0) { px[grab] = x[grab] - vx * h; py[grab] = y[grab] - vy * h; }
    grab = -1;
  }

  return { x, y, px, py, w, links, areas, get count() { return n; },
    addParticle, link, areaConstraint, polyArea, step, pick, drag, release };
}

// ---------- builders ----------
export function rope(sim, ax, ay, bx, by, segments, opts = {}) {
  const ids = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    ids.push(sim.addParticle(ax + (bx - ax) * t, ay + (by - ay) * t, i === 0 ? 0 : 1));
  }
  for (let i = 0; i < segments; i++) sim.link(ids[i], ids[i + 1], opts);
  return ids;
}

// 2D curtain. shear=false by default: in-plane shear diagonals can INVERT cells when thrown
// hard, leaving permanent residual stretch (tested). Structural-only = classic verlet curtain.
export function cloth(sim, ox, oy, cols, rows, spacing, { pinEvery = 4, shear = false, ...opts } = {}) {
  const id = (c, r) => ids[r * cols + c];
  const ids = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      ids.push(sim.addParticle(ox + c * spacing, oy + r * spacing, r === 0 && c % pinEvery === 0 ? 0 : 1));
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (c < cols - 1) sim.link(id(c, r), id(c + 1, r), opts);
      if (r < rows - 1) sim.link(id(c, r), id(c, r + 1), opts);
      if (shear && c < cols - 1 && r < rows - 1) {      // shear springs: softer
        sim.link(id(c, r), id(c + 1, r + 1), { ...opts, compliance: (opts.compliance ?? 0) + 2e-6 });
        sim.link(id(c + 1, r), id(c, r + 1), { ...opts, compliance: (opts.compliance ?? 0) + 2e-6 });
      }
    }
  return ids;
}

export function blob(sim, cx, cy, radius, count, { pressure = 1, ringCompliance = 0, areaCompliance = 0 } = {}) {
  const ids = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    ids.push(sim.addParticle(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, 1));
  }
  for (let i = 0; i < count; i++) sim.link(ids[i], ids[(i + 1) % count], { compliance: ringCompliance });
  sim.areaConstraint(ids, { compliance: areaCompliance, pressure });
  return ids;
}
