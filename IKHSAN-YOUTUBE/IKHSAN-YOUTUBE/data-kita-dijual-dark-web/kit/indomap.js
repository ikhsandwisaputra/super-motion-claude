// Peta Satelit 3D Indonesia (Sentinel-2 Cloudless EOX CC BY 4.0) + rute tata kelola AI nasional
import { clamp, inv, lerp, E, IVORY, LIME, LIME_INK, setFont, MN } from './kit.js';
import { getMapGL, loadIndonesiaMap, buildCameraMVP, projectPoint, lonLatToWorld, lonLatToUV } from './mapgl.js';
export { loadIndonesiaMap };

export const CITIES_ID = [
  { id: 'medan', name: 'MEDAN', sub: 'LAYANAN PUBLIK', lon: 98.67, lat: 3.59 },
  { id: 'batam', name: 'BATAM', sub: 'HUB DATA CENTER', lon: 104.03, lat: 1.08 },
  { id: 'jakarta', name: 'JAKARTA', sub: 'PUSAT REGULASI (KOMDIGI & OJK)', lon: 106.85, lat: -6.21, hero: true },
  { id: 'bandung', name: 'BANDUNG', sub: 'RISET & PENDIDIKAN', lon: 107.61, lat: -6.91 },
  { id: 'surabaya', name: 'SURABAYA', sub: 'PERBANKAN & RS', lon: 112.75, lat: -7.25 },
  { id: 'ikn', name: 'NUSANTARA', sub: 'PEMERINTAHAN', lon: 116.70, lat: -0.97 },
  { id: 'makassar', name: 'MAKASSAR', sub: 'LAYANAN WILAYAH TIMUR', lon: 119.43, lat: -5.14 },
];

export function petaIndonesia(ctx, x, y, s, t, t0, o = {}) {
  const k = E.outQuint(inv(t0, t0 + 0.65, t));
  if (k <= 0) return;
  const dt = Math.max(0, t - t0);
  const mgl = getMapGL();
  if (mgl && !mgl.ready) loadIndonesiaMap();

  const fullBleed = !!o.fullBleed;
  const vw = fullBleed ? 1920 : Math.round((o.w ?? 1080) * s);
  const vh = fullBleed ? 1080 : Math.round((o.h ?? 640) * s);
  const lightAmt = o.light ? 1 : 0;

  const lon = o.lon ?? lerp(104.5, 113.5, E.outCubic(clamp(dt / 7.0)));
  const lat = o.lat ?? lerp(-3.0, -3.6, E.outCubic(clamp(dt / 7.0)));
  const dist = o.dist ?? lerp(1.52, 1.24, E.outCubic(clamp(dt / 6.0)));
  const pitchDeg = o.pitch ?? lerp(32, 44, E.outCubic(clamp(dt / 4.0))) + 1.8 * Math.sin(dt * 0.4);
  const yawDeg = (o.yaw ?? -4) + 4.5 * Math.sin(dt * 0.3);

  const cam = buildCameraMVP({ lon, lat, dist, pitchDeg, yawDeg, fovDeg: 38, aspect: vw / vh });
  const focusUV = lonLatToUV(lon, lat);
  const haze = lightAmt > 0.5 ? [0.89, 0.88, 0.84] : [0.055, 0.082, 0.11];
  const glCanvas = mgl ? mgl.render(cam, {
    light: lightAmt, time: t, haze, focusUV, focusAmt: 0.42,
    wOut: Math.min(1280, Math.max(640, Math.round(vw))),
    hOut: Math.min(720, Math.max(360, Math.round(vh))),
  }) : null;

  ctx.save();
  ctx.globalAlpha = (o.a ?? 1) * k;
  const dx = fullBleed ? 0 : x - vw / 2;
  const dy = fullBleed ? 0 : y - vh / 2 + (1 - k) * 26;
  ctx.translate(dx, dy);

  ctx.beginPath();
  if (fullBleed || o.noFrame) ctx.rect(0, 0, vw, vh);
  else ctx.roundRect(0, 0, vw, vh, 12);
  ctx.clip();

  if (glCanvas) ctx.drawImage(glCanvas, 0, 0, vw, vh);
  else { ctx.fillStyle = lightAmt > 0.5 ? '#DEDAD0' : '#0E151C'; ctx.fillRect(0, 0, vw, vh); }

  const vg = ctx.createRadialGradient(vw * 0.5, vh * 0.5, vh * 0.25, vw * 0.5, vh * 0.5, vw * 0.7);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, lightAmt > 0.5 ? 'rgba(234,231,220,0.45)' : 'rgba(8,12,16,0.60)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, vw, vh);

  const proj = (lo, la, alt = 0) => projectPoint(cam.mvp, vw, vh, lonLatToWorld(lo, la, alt));
  const jkt = CITIES_ID[2];

  if (o.arcs !== false) {
    const ka = E.outCubic(inv(t0 + 0.3, t0 + 1.4, t));
    if (ka > 0.01) {
      for (let i = 0; i < CITIES_ID.length; i++) {
        const c = CITIES_ID[i];
        if (c.id === 'jakarta') continue;
        const steps = 18;
        const maxS = Math.max(1, Math.floor(steps * ka));
        ctx.strokeStyle = 'rgba(200,245,60,0.72)';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        for (let st = 0; st <= maxS; st++) {
          const u = st / steps;
          const pt = proj(lerp(jkt.lon, c.lon, u), lerp(jkt.lat, c.lat, u), Math.sin(u * Math.PI) * 0.085);
          if (!pt) continue;
          if (st === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }
    }
  }

  if (o.labels !== false) {
    for (let i = 0; i < CITIES_ID.length; i++) {
      const c = CITIES_ID[i];
      const pt = proj(c.lon, c.lat, 0.008);
      if (!pt || pt.x < 40 || pt.x > vw - 40 || pt.y < 30 || pt.y > vh - 30) continue;
      const kp = inv(t0 + 0.25 + i * 0.1, t0 + 0.55 + i * 0.1, t);
      if (kp <= 0) continue;

      ctx.save();
      ctx.globalAlpha *= kp;
      if (c.hero) {
        const ring = ((t * 0.9) % 1);
        ctx.strokeStyle = `rgba(200,245,60,${0.7 * (1 - ring)})`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 10 + ring * 26, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.fillStyle = c.hero ? LIME : IVORY;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, c.hero ? 7 : 4.5, 0, Math.PI * 2); ctx.fill();

      setFont(ctx, MN(c.hero ? 14 : 12, 700), 1.5);
      const tw = ctx.measureText(c.name).width + 16;
      const ly = pt.y - 24;
      ctx.fillStyle = c.hero ? LIME : 'rgba(11,14,18,0.88)';
      ctx.fillRect(pt.x - tw / 2, ly - 11, tw, 22);
      ctx.fillStyle = c.hero ? LIME_INK : IVORY;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.name, pt.x, ly);
      ctx.restore();
    }
  }

  setFont(ctx, MN(11, 400), 1);
  ctx.fillStyle = lightAmt > 0.5 ? 'rgba(21,22,15,0.55)' : 'rgba(241,239,230,0.48)';
  ctx.textAlign = 'right';
  ctx.fillText('Citra Satelit: Sentinel-2 Cloudless (EOX, CC BY 4.0)', vw - 18, vh - 16);

  ctx.restore();
}
