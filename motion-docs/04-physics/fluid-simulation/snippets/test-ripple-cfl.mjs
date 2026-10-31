// CPU ripple (Hugo Elias / Evan Wallace scheme): h_new = 0.5*sum4 - h_old ; then damping
function ripple(W, H, k = 2.0, damping = 0.995, steps = 4000) {
  let h = new Float32Array(W * H), v = new Float32Array(W * H);
  const i0 = (H >> 1) * W + (W >> 1); h[i0] = 1;  // drop
  let maxAbs = 0;
  for (let s = 0; s < steps; s++) {
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      const avg = 0.25 * (h[i - 1] + h[i + 1] + h[i - W] + h[i + W]);
      v[i] = (v[i] + (avg - h[i]) * k) * damping;
    }
    for (let i = 0; i < W * H; i++) h[i] += v[i];
    if (s > 100) { let m = 0; for (let i = 0; i < W * H; i++) m = Math.max(m, Math.abs(h[i])); maxAbs = Math.max(maxAbs, m); }
  }
  let m = 0; for (let i = 0; i < W * H; i++) m = Math.max(m, Math.abs(h[i]));
  return { maxAfter100: maxAbs.toExponential(2), final: m.toExponential(2), finite: Number.isFinite(m) };
}
console.log('k=2.0 d=0.995', ripple(128, 128));
console.log('k=2.0 d=1.0  ', ripple(128, 128, 2.0, 1.0));
console.log('k=2.2 d=1.0  ', ripple(128, 128, 2.2, 1.0, 1500));
console.log('k=2.2 d=0.995', ripple(128, 128, 2.2, 0.995, 1500));
