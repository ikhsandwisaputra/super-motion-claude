// Bab 3 · Solusi Rp600 miliar: memeras air laut di Kabil (VO take 06, 132.96 s).
// Dua dunia visual: Laut Dalam (#0A161E) untuk kebijakan BP Batam, Kabil Rp600M, pipa 12 km, & skala 1,36 jt galon ->
// Berubah ke Laboratorium Air Arsitektural Terang (#EAE7DC + WebGL2 Worley caustic/ripple) saat membahas SWRO & membran osmosis balik.
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, loadVid, evid, fall, markLine, srcTag, slab, txt, countTo, fmt, gone, theme,
} from './kit.js';
import { layarFoto, kreditLatar, petaBatam, loadBatamMap, gelasWaduk, galonBaris, membranSWRO } from './batam.js';
import { buildCameraMVP, projectPoint, lonLatToWorld } from './mapgl.js';
import { makeWaterGL } from './watergl.js';
import { kq, popAt } from './draw.js';

const DARK_INK = '#15160F';

// Subtle matte elevation shadow matching petaBatam's rounded viewport (zero neon glow)
function mapBackdrop(ctx, x, y, w, h, s, t, t0) {
  const k = E.outQuint(inv(t0, t0 + 0.65, t));
  if (k <= 0) return;
  const vw = Math.round(w * s), vh = Math.round(h * s);
  const dx = x - vw / 2, dy = y - vh / 2 + (1 - k) * 26;
  ctx.save();
  ctx.globalAlpha = k;
  ctx.shadowColor = 'rgba(4,8,12,0.62)';
  ctx.shadowBlur = 46;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = '#091016';
  ctx.beginPath(); ctx.roundRect(dx, dy, vw, vh, 14); ctx.fill();
  ctx.restore();
}

// Matte editorial eyebrow on bright architectural paper (replaces dark SaaS pill + neon text)
function labEyebrow(ctx, text, y) {
  setFont(ctx, MN(17), 4);
  const tw = ctx.measureText(text).width;
  const x0 = -(tw + 24) / 2;
  ctx.fillStyle = LIME;
  ctx.fillRect(x0, y - 11, 11, 11);
  ctx.strokeStyle = 'rgba(21,22,15,0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x0 + 0.5, y - 10.5, 10, 10);
  ctx.fillStyle = 'rgba(21,22,15,0.78)';
  ctx.textAlign = 'left';
  ctx.fillText(text, x0 + 22, y);
  ctx.strokeStyle = 'rgba(21,22,15,0.20)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x0, y + 12);
  ctx.lineTo(x0 + tw + 24, y + 12);
  ctx.stroke();
}

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {};
  let waterGL = null;

  async function load() {
    const vb = '../assets/shared/vid/';
    for (const nm of ['waduk_surut', 'ocean_waves', 'ocean_aerial']) V[nm] = await loadVid(vb, nm);

    const kb = '../assets/shared/kutipan/';
    IM.bp_dorong = await loadImg(kb + 'bpbatam-bp-batam-dorong-data-center-bangun.png', 1600);
    IM.kompas_wajib = await loadImg(kb + 'regional-pengembang-data-center-di-batam-kini.png', 1600);
    IM.bp_ground = await loadImg(kb + 'bpbatam-groundbreaking-swro-kabil-investasi-rp.png', 1600);
    IM.kompas_olah = await loadImg(kb + 'regional-batam-olah-air-laut-jadi-air-bersih-demi.png', 1600);
    IM.grafik = await loadImg('../assets/shared/grafik/swro-kabil-tahap-1-2030.png', 1600);
    IM.plant = await loadImg('../assets/shared/cc/commons-reverse-osmosis-desalination-plant.jpg', 1920);
    await loadBatamMap('../assets/shared/peta/');
    waterGL = makeWaterGL(960, 540);
  }

  // Documentary full-bleed background schedules
  const BG_DARK = [
    { vid: 'waduk_surut', t0: 0, t1: A.jawaban + 0.40, fx: 0.5, fy: 0.52, dir: 1, cap: 'WADUK BATAM MENYUSUT', kredit: 'Video: Pexels' },
    { vid: 'ocean_waves', t0: A.jawaban - 0.25, t1: A.sep + 0.30, fx: 0.5, fy: 0.5, dir: -1, cap: 'PERAIRAN PULAU BATAM', kredit: 'Video: Pexels' },
    { vid: 'ocean_waves', t0: A.enambelas - 0.25, t1: A.tahap1 + 0.25, fx: 0.5, fy: 0.55, dir: 1, cap: 'PROYEK SWRO KABIL', kredit: 'Video: Pexels' },
    { vid: 'ocean_aerial', t0: A.kabar - 0.30, t1: A.tapi + 0.20, fx: 0.5, fy: 0.5, dir: -1, cap: 'SURPLUS AIR UNTUK WARGA', kredit: 'Video: Pexels' },
  ];
  const BG_PLANT = [
    {
      im: 'plant', t0: A.tapi - 0.15, t1: A.normal + 0.25, fx: 0.55, fy: 0.62, dir: 1,
      grade: 'saturate(.68) contrast(1.06) brightness(1.04)',
      kredit: 'Foto: James Grellier via Wikimedia Commons (CC BY-SA 3.0)',
    },
  ];

  const T_TURN = A.tapi;
  const RIPPLES = [A.airlaut, A.duapuluhenam, A.tersedot, A.menekan, A.tenagapompa];

  function fullBleedBg(ctx, t) {
    const kLight = E.outCubic(inv(T_TURN - 0.18, T_TURN + 0.18, t));

    if (kLight > 0 && kLight < 1) {
      ctx.save();
      ctx.fillStyle = `rgba(234,231,220,${kLight})`;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    if (kLight < 1) {
      const dimVal = t >= A.kabar - 0.30 ? 0.50 : (t >= A.enambelas - 0.25 ? 0.64 : (t >= A.jawaban - 0.25 ? 0.58 : 0.50));
      ctx.save();
      if (kLight > 0) ctx.globalAlpha = 1 - kLight;
      layarFoto(ctx, W, H, BG_DARK, t, { IM: V, dim: dimVal, grain: 0.20 });
      ctx.restore();
    }

    if (kLight > 0) {
      const anyPlant = layarFoto(ctx, W, H, BG_PLANT, t, { IM, veil: 'rgba(234,231,220,0.32)', grain: 0.12 });
      if (anyPlant > 0) {
        // Architectural ivory gradient scrim on left side so dark headline reads cleanly over the plant pipes
        ctx.save();
        ctx.globalAlpha = anyPlant * kLight;
        const lg = ctx.createLinearGradient(0, 0, W, 0);
        lg.addColorStop(0, 'rgba(234,231,220,0.94)');
        lg.addColorStop(0.46, 'rgba(234,231,220,0.82)');
        lg.addColorStop(0.72, 'rgba(234,231,220,0.16)');
        lg.addColorStop(1, 'rgba(234,231,220,0.08)');
        ctx.fillStyle = lg;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }
    }

    // WebGL2 Worley caustic + closed-form pressure ripple refraction
    if (waterGL) {
      const activeOcean = (t >= A.jawaban && t < A.sep + 0.2) || (t >= A.kebayan && t < T_TURN);
      const activeLab = t >= T_TURN;
      if (activeOcean || activeLab) {
        const trig = RIPPLES.filter(x => t >= x && t - x < 2.4).pop();
        const rippleT = trig !== undefined ? t - trig : -1;
        const cAmt = rippleT >= 0 ? 0.40 : (activeLab ? 0.20 : 0.24);
        const ca = waterGL(t, rippleT, 0.50, 0.50, cAmt);
        if (ca) {
          ctx.save();
          ctx.globalCompositeOperation = activeLab ? 'multiply' : 'screen';
          ctx.globalAlpha = activeLab ? 0.24 * kLight : 0.24 * (1 - kLight);
          ctx.drawImage(ca, 0, 0, W, H);
          ctx.restore();
        }
      }
    }
  }

  function pushBgOnce(c, idx, ctx, t, items) {
    if (c.i === idx) items.push({ z: 1e6, x: 0, d: 1e9, f: () => fullBleedBg(ctx, t) });
  }

  // ── Natural Osmosis vs Reverse Osmosis Tank (S9) ────────────────────────────────────────────────────────────
  const OSM_PARTS = Array.from({ length: 54 }, (_, i) => ({
    salt: i >= 24,
    phase: ((i * 0.6180339887) % 1),
    yFrac: 0.14 + ((i * 0.371) % 0.72),
    speed: 0.26 + (i % 5) * 0.05,
    r: i >= 24 ? 5.2 : 4.4,
  }));

  function drawOsmosisTank(ctx, t) {
    const kIn = E.outQuint(inv(A.normal - 0.15, A.normal + 0.35, t));
    if (kIn <= 0) return;
    const kSuck = E.outCubic(inv(A.tersedot, A.tersedot + 1.6, t));
    const kRev = E.outCubic(inv(A.kebalikan - 0.1, A.kebalikan + 0.65, t));

    ctx.save();
    ctx.globalAlpha = kIn;
    ctx.translate(0, (1 - kIn) * 32);

    // Matte editorial eyebrow (replaces dark rounded pill + neon text)
    labEyebrow(ctx, 'PRINSIP DASAR · OSMOSIS ALAMI VS OSMOSIS BALIK', -312);

    const subText = kRev > 0.45
      ? 'Pabrik SWRO memaksa proses alami berjalan kebalikannya'
      : 'Normalnya, air tawar justru tersedot melewati selaput ke sisi asin';
    txt(ctx, subText, 0, -246, t, A.normal + 0.12, SRF(42), { align: 'center', col: DARK_INK });

    // Tank shell with clean matte neutral hairline
    const vx = -540, vw = 1080, vy = -175, vh = 310;
    ctx.shadowColor = 'rgba(15,22,28,0.26)';
    ctx.shadowBlur = 42;
    ctx.shadowOffsetY = 18;
    ctx.fillStyle = '#111B24';
    ctx.beginPath(); ctx.roundRect(vx, vy, vw, vh, 16); ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(21,22,15,0.20)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.save();
    ctx.beginPath(); ctx.roundRect(vx + 5, vy + 5, vw - 10, vh - 10, 12); ctx.clip();

    // Left (Fresh water) vs Right (Salt water) chambers with animated water level shift
    const shiftLvl = 36 * kSuck * (1 - kRev) - 24 * kRev;
    const leftTop = vy + 74 + shiftLvl;
    const rightTop = vy + 74 - shiftLvl;

    ctx.fillStyle = 'rgba(165,220,240,0.26)';
    ctx.fillRect(vx, leftTop, vw / 2, vy + vh - leftTop);
    ctx.fillStyle = 'rgba(195,235,248,0.62)';
    ctx.fillRect(vx, leftTop, vw / 2, 2.5);

    ctx.fillStyle = 'rgba(28,82,115,0.62)';
    ctx.fillRect(0, rightTop, vw / 2, vy + vh - rightTop);
    ctx.fillStyle = 'rgba(175,220,238,0.52)';
    ctx.fillRect(0, rightTop, vw / 2, 2.5);

    // Batched fresh water molecules & salt ions
    ctx.fillStyle = 'rgba(230,246,252,0.92)';
    ctx.beginPath();
    for (const p of OSM_PARTS) {
      if (p.salt) continue;
      const py = lerp(vy + 98, vy + vh - 26, p.yFrac) + Math.sin(t * 3.2 + p.phase * 9) * 5;
      let px;
      if (kRev > 0.15) {
        // Forced reverse flow: right -> left across membrane
        const u = (p.phase + t * p.speed * 1.4) % 1;
        px = lerp(vx + vw - 40, vx + 40, u);
      } else if (kSuck > 0.05) {
        // Natural osmosis: fresh water sucked left -> right across membrane
        const u = (p.phase + t * p.speed * 0.9) % 1;
        px = lerp(vx + 40, vx + vw - 50, u);
      } else {
        px = lerp(vx + 40, -30, p.phase) + Math.sin(t * 2 + p.phase * 12) * 14;
      }
      ctx.moveTo(px + p.r, py); ctx.arc(px, py, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    // Salt ions stay on the right side
    ctx.fillStyle = 'rgba(241,239,230,0.52)';
    ctx.beginPath();
    for (const p of OSM_PARTS) {
      if (!p.salt) continue;
      const py = lerp(vy + 98, vy + vh - 26, p.yFrac) + Math.cos(t * 3.6 + p.phase * 11) * 5;
      const px = lerp(32, vx + vw - 38, (p.phase + Math.sin(t * 1.1 + p.phase * 6) * 0.06 + 1) % 1);
      ctx.moveTo(px + p.r, py); ctx.arc(px, py, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    // Chamber titles in dark header bar inside tank
    ctx.fillStyle = 'rgba(10,20,28,0.82)';
    ctx.fillRect(vx, vy, vw, 54);
    setFont(ctx, MN(18), 7);
    ctx.textAlign = 'left'; ctx.fillStyle = IVORY;
    ctx.fillText('AIR TAWAR', vx + 28, vy + 34);
    ctx.textAlign = 'right'; ctx.fillStyle = IVORY;
    ctx.fillText('AIR ASIN (GARAM)', vx + vw - 28, vy + 34);

    // Semipermeable membrane down center (neutral architectural hairline, shifts to lime under forced reverse pressure)
    ctx.fillStyle = 'rgba(241,239,230,0.14)';
    ctx.fillRect(-8, vy + 54, 16, vh - 54);
    ctx.strokeStyle = kRev > 0.35 ? LIME : 'rgba(241,239,230,0.72)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.moveTo(0, vy + 54); ctx.lineTo(0, vy + vh - 8); ctx.stroke();
    ctx.setLineDash([]);

    // Solid matte #C8F53C architectural membrane tag with crisp dark #11120E ink (dynamically measured)
    setFont(ctx, MN(16), 5);
    const swTag = ctx.measureText('SELAPUT TIPIS').width + 32;
    ctx.fillStyle = LIME;
    ctx.fillRect(-swTag / 2, vy + 11, swTag, 32);
    ctx.textAlign = 'center'; ctx.fillStyle = '#11120E';
    ctx.fillText('SELAPUT TIPIS', 0, vy + 33);

    // Direction arrow indicator centered in tank
    if (kSuck > 0.1) {
      const dir = kRev > 0.3 ? -1 : 1;
      const ax = dir * 130;
      ctx.strokeStyle = dir < 0 ? LIME : IVORY;
      ctx.fillStyle = dir < 0 ? LIME : IVORY;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-ax * 0.65, 10); ctx.lineTo(ax * 0.65, 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax * 0.65 + dir * 20, 10);
      ctx.lineTo(ax * 0.65 - dir * 6, -4);
      ctx.lineTo(ax * 0.65 - dir * 6, 24);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();

    // Bottom status bar below tank
    if (t < A.memaksa) {
      slab(ctx, 'OSMOSIS ALAMI: AIR TAWAR TERSEDOT → SISI ASIN', 0, 210, t, A.tersedot, { align: 'center', size: 22 });
    } else {
      slab(ctx, 'OSMOSIS BALIK: TEKANAN MEMAKSA AIR LAUT → TAWAR', 0, 210, t, A.memaksa, { align: 'center', size: 22, lime: true });
    }
    txt(ctx, 'PROSES ALAMI DIBALIK PAKSA OLEH POMPA', 0, 295, t, A.kebalikan, MN(22), { align: 'center', ls: 4, col: DARK_INK });

    srcTag(ctx, 'Prinsip fisika: Osmosis Alami vs Reverse Osmosis', -840, 440, t, A.normal + 0.25);
    ctx.restore();
  }

  // ── Stations ───────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    // S0 · Opening: Waduk tipis -> sekeliling Batam ada air laut melimpah
    {
      at: 0, name: 'Waduk tipis -> air laut', dist: [1520, 1430],
      draw(ctx, t) {
        const out1 = gone(t, A.jawaban - 0.1, 0.35);
        if (out1 > 0.01) {
          ctx.save();
          ctx.globalAlpha *= out1;
          const wLvl = lerp(0.48, 0.15, E.outCubic(inv(A.waduk, A.tipis + 0.5, t)));
          gelasWaduk(ctx, -450, -10, 0.92, t, 0.65, {
            level: wLvl, critical: true, label: 'CADANGAN WADUK', val: 'TIPIS',
          });
          txt(ctx, 'KEMBALI KE BATAM', 260, -165, t, 0.72, MN(22), { align: 'center', ls: 5, col: ivo(0.75) });
          txt(ctx, 'Kalau air waduk sudah tipis,', 260, -65, t, A.waduk, SRF(56), { align: 'center' });
          markLine(ctx, 'dari mana ', 'AIR PENDINGINNYA?', '', 260, 75, t, A.mana, A.pendingin, DSP(110), { align: 'center', ls: 2 });
          ctx.restore();
        }
        if (t >= A.jawaban - 0.15) {
          const k2 = E.outQuint(inv(A.jawaban - 0.15, A.jawaban + 0.35, t));
          ctx.save();
          ctx.globalAlpha *= k2;
          // Real 3D tilted Sentinel-2 satellite drone map of Pulau Batam surrounded by ocean
          mapBackdrop(ctx, -370, 15, 760, 560, 1.0, t, A.jawaban - 0.1);
          petaBatam(ctx, -370, 15, 1.0, t, A.jawaban - 0.1, {
            hubs: false, labels: false, showSG: false, showBatamLabel: true,
            lon: 104.032, lat: 1.112, dist: 0.92, pitch: 42, yaw: -8, w: 760, h: 560,
          });
          txt(ctx, 'DI SEKELILING PULAU BATAM', 455, -155, t, A.batam - 0.4, MN(22), { align: 'center', ls: 4, col: ivo(0.88) });
          fall(ctx, 'AIR LAUT', 455, 25, t, A.airlaut, DSP(210), { align: 'center', ls: 3 });
          markLine(ctx, 'sumber yang ', 'MELIMPAH.', '', 455, 140, t, A.melimpah - 0.2, A.melimpah, SRF(66), { align: 'center' });
          ctx.restore();
        }
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 0, ctx, t, items),
    },

    // S1 · Aturan tegas BP Batam (Sep-Okt 2026): Wajib SWRO mandiri + Kutipan #1
    {
      at: A.sep, via: 'whip', name: 'Aturan Wajib SWRO', tag: 'WAJIB',
      draw(ctx, t) {
        txt(ctx, 'SEPTEMBER – OKTOBER 2026 · ATURAN TEGAS BP BATAM', -830, -320, t, A.sep, MN(22), { ls: 4, col: ivo(0.82) });
        evid(ctx, IM.bp_dorong, -360, -30, 940, t, A.bpbatam - 0.35, {
          dark: true, dim: 0.14, tab: 'BP BATAM · 24 SEP 2026', rot: -1.1,
          hl: [
            [0.552, 0.175, 0.442, 0.110, A.tegas - 0.1],
            [0.018, 0.332, 0.470, 0.100, A.setiap + 0.1],
          ],
        });
        slab(ctx, 'PENGEMBANG DATA CENTER DI BATAM', -830, 215, t, A.datacenter, { size: 22 });
        txt(ctx, 'ATURAN BARU', 500, -175, t, A.setiap, MN(22), { align: 'center', ls: 5, col: ivo(0.75) });
        popAt(ctx, 500, -25, t, A.wajib, () => {
          ctx.fillStyle = LIME;
          ctx.beginPath(); ctx.roundRect(-295, -92, 590, 184, 4); ctx.fill();
          setFont(ctx, DSP(136), 3); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center';
          ctx.fillText('WAJIB SWRO', 0, 50);
        }, { rot: -3 });
        txt(ctx, 'Pabrik air laut sendiri', 500, 145, t, A.swro - 0.3, SRF(50), { align: 'center' });
        srcTag(ctx, 'Sumber: BP Batam, 24 Sep 2026', -840, 440, t, A.sep + 0.25);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 1, ctx, t, items),
    },

    // S2 · Target 1.000 LPS + Duriangkang terbatas + evidFull #5 (Kompas 16 Okt 2026)
    {
      at: A.target, via: 'push', name: 'Target 1.000 LPS & Wajib Mandiri', tag: '1.000',
      draw(ctx, t) {
        txt(ctx, 'TARGET PEMERINTAH · NONGSA & KABIL', -820, -295, t, A.target, MN(22), { ls: 4, col: ivo(0.82) });
        const vLps = Math.round(countTo(0, 1000, t, A.target + 0.1, 1.5) / 25) * 25;
        fall(ctx, fmt(t >= A.target + 1.6 ? 1000 : vLps), -820, -35, t, A.target + 0.1, DSP(250), { col: LIME, ls: 2 });
        txt(ctx, 'LITER AIR OLAHAN LAUT / DETIK', -820, 32, t, A.seribu - 0.6, MN(24), { ls: 4 });
        slab(ctx, 'WADUK DURIANGKANG: SEMENTARA', -820, 148, t, A.duriangkang - 0.5, { size: 20 });
        txt(ctx, 'Terbatas hanya selama masa konstruksi.', -820, 214, t, A.duriangkang + 0.05, SRF(34), { col: ivo(0.84) });
        const mapT0 = A.target + 0.15;
        const mapOpt = {
          hubs: true, focus: 'duriangkang', labels: false, showBatamLabel: false, showSG: false,
          lon: 104.064, lat: 1.114, dist: 0.78, pitch: 44, yaw: -8, w: 800, h: 580,
        };
        mapBackdrop(ctx, 390, 10, 800, 580, 1.0, t, mapT0);
        petaBatam(ctx, 390, 10, 1.0, t, mapT0, mapOpt);
        // Clean 3D pin exclusively for Waduk Duriangkang (avoids Waduk Nongsa colliding with KEK Nongsa)
        const kPin = E.outQuint(inv(mapT0, mapT0 + 0.65, t));
        if (kPin > 0.01) {
          const dtPin = Math.max(0, t - mapT0);
          const camPin = buildCameraMVP({
            lon: mapOpt.lon, lat: mapOpt.lat, dist: mapOpt.dist, pitchDeg: mapOpt.pitch,
            yawDeg: mapOpt.yaw + 5.5 * Math.sin(dtPin * 0.32), fovDeg: 38, aspect: 800 / 580,
          });
          const pB = projectPoint(camPin.mvp, 800, 580, lonLatToWorld(104.060, 1.069, 0.002));
          const pT = projectPoint(camPin.mvp, 800, 580, lonLatToWorld(104.060, 1.069, 0.036));
          if (pB && pT) {
            ctx.save();
            ctx.globalAlpha *= kPin;
            ctx.translate(390 - 400, 10 - 290 + (1 - kPin) * 26);
            ctx.strokeStyle = LIME; ctx.lineWidth = 1.8;
            ctx.beginPath(); ctx.moveTo(pB.x, pB.y); ctx.lineTo(pT.x, pT.y); ctx.stroke();
            const title = 'WADUK DURIANGKANG';
            setFont(ctx, MN(12), 7);
            const tw = ctx.measureText(title).width + 18, th = 22;
            ctx.fillStyle = LIME;
            ctx.fillRect(pT.x - tw / 2, pT.y - 12 - th / 2, tw, th);
            ctx.fillStyle = LIME_INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(title, pT.x, pT.y - 11);
            ctx.restore();
          }
        }
        srcTag(ctx, 'Sumber: BP Batam, 24 Sep 2026', -840, 440, t, A.target + 0.25);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 2, ctx, t, items),
    },

    // S3 · 16 hari pasca Nongsa berhenti -> Groundbreaking Kabil 5 Nov 2026, Citramas Rp600 M + Kutipan #3
    {
      at: A.enambelas, via: 'whip', name: 'SWRO Kabil Rp600 Miliar', tag: 'Rp600M',
      draw(ctx, t) {
        // Timeline comparison hairline strip at top (clean neutral hairline, zero neon outline)
        const kBar = kq(t, A.enambelas, 0.55);
        ctx.fillStyle = 'rgba(241,239,230,0.22)';
        ctx.fillRect(-830, -310, 1660 * kBar, 1.5);
        if (kBar > 0.1) {
          ctx.fillRect(-830, -316, 1.5, 13);
          ctx.fillRect(-830 + 1660 * kBar - 1.5, -316, 1.5, 13);
        }
        slab(ctx, '20 OKT 2026 · WADUK NONGSA BERHENTI', -830, -345, t, A.waduknongsa - 0.3, { size: 18 });
        txt(ctx, '+16 HARI', 0, -338, t, A.enambelas + 0.1, MN(20), { align: 'center', ls: 4, col: ivo(0.90) });
        slab(ctx, '5 NOV 2026 · SWRO KABIL DIMULAI', 830, -345, t, A.nov5 - 0.3, { align: 'right', size: 18, lime: true });

        evid(ctx, IM.bp_ground, -360, -55, 940, t, A.kabil2 - 0.3, {
          dark: true, dim: 0.14, tab: 'BP BATAM · 5 NOV 2026', rot: -1.0,
          hl: [[0.268, 0.175, 0.596, 0.110, A.nov5]],
        });
        slab(ctx, 'PENGEMBANG KAWASAN: CITRAMAS GROUP', -830, 190, t, A.citramas, { size: 22 });

        txt(ctx, 'DANA AWAL PROYEK', 500, -145, t, A.citramas + 0.5, MN(22), { align: 'center', ls: 4, col: ivo(0.8) });
        fall(ctx, 'Rp600', 500, 45, t, A.enamratus, DSP(220), { align: 'center', col: LIME, ls: 2 });
        fall(ctx, 'MILIAR', 500, 185, t, A.miliar, DSP(130), { align: 'center', col: IVORY, ls: 4 });
        srcTag(ctx, 'Sumber: BP Batam, 5 Nov 2026', -840, 440, t, A.nov5);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 3, ctx, t, items),
    },

    // S4 · Peta Batam: Tahap 1 (300 LPS) + Pipa Transmisi 12 km Kabil -> Nongsa + Kutipan #4
    {
      at: A.tahap1, via: 'push', name: 'Pipa 12 km Kabil -> Nongsa', tag: '12 KM',
      draw(ctx, t) {
        // Dramatic 3D Sentinel-2 drone zoom along Batam's actual east coast (Kabil -> Nongsa)
        const dDrone = lerp(0.68, 0.57, E.outCubic(inv(A.tahap1, A.duabelas + 1.4, t)));
        mapBackdrop(ctx, -385, 12, 620, 480, 1.32, t, A.tahap1);
        petaBatam(ctx, -385, 12, 1.32, t, A.tahap1, {
          pipe: true, pipeAt: A.pipa - 0.1, hubs: true, labels: false, showSG: false,
          lon: 104.112, lat: 1.132, dist: dDrone, pitch: 48, yaw: -12, w: 620, h: 480,
        });
        txt(ctx, 'TAHAP PERTAMA · SELESAI AKHIR 2027', 490, -315, t, A.tahap1, MN(20), { align: 'center', ls: 4, col: ivo(0.82) });
        fall(ctx, '300', 490, -155, t, A.tigaratus, DSP(190), { align: 'center', col: LIME });
        txt(ctx, 'LITER AIR BERSIH / DETIK', 490, -108, t, A.tigaratus + 0.15, MN(20), { align: 'center', ls: 3 });
        slab(ctx, 'PIPA 12 KM · KABIL → SERVER NONGSA', 490, -28, t, A.duabelas - 0.15, { align: 'center', size: 20, lime: true });

        evid(ctx, IM.kompas_olah, 490, 195, 640, t, A.y2027, {
          dark: true, crop: [0, 0, 1, 0.60], tab: 'KOMPAS.COM · 5 NOV 2026', rot: 1.0,
          hl: [[0.026, 0.517, 0.435, 0.158, A.duabelas]],
        });
        srcTag(ctx, 'Sumber: KOMPAS.com, 5 Nov 2026', -840, 440, t, A.tahap1 + 0.25);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 4, ctx, t, items),
    },

    // S5 · Grafik Kapasitas 2030: 300 -> +400 -> 700 LPS
    {
      at: A.y2030, via: 'whip', name: 'Grafik Kapasitas 2030', tag: '700 LPS',
      draw(ctx, t) {
        evid(ctx, IM.grafik, -235, -15, 1020, t, A.y2030 - 0.1, {
          dark: true, tab: 'GRAFIK KAPASITAS · SWRO KABIL', rot: -0.6,
        });
        txt(ctx, 'TARGET TAHUN 2030', 590, -275, t, A.y2030, MN(22), { align: 'center', ls: 4, col: ivo(0.82) });
        slab(ctx, '+400 LPS TAHAP 2', 590, -210, t, A.diperbesar - 0.2, { align: 'center', size: 22 });
        fall(ctx, '700', 590, 85, t, A.tujuhratus - 0.15, DSP(220), { align: 'center', col: LIME });
        txt(ctx, 'LITER / DETIK', 590, 145, t, A.tujuhratus + 0.1, MN(24), { align: 'center', ls: 4 });
        srcTag(ctx, 'Sumber: bpbatam.go.id, ANTARA, Kompas.com (diolah)', -840, 440, t, A.y2030 + 0.2);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 5, ctx, t, items),
    },

    // S6 · Skala Absurd: 26 Juta Liter/Hari ≈ 1,36 Juta Galon Air Minum
    {
      at: A.kebayan, via: 'rise', name: 'Skala 1,36 Juta Galon', tag: '1,36 JT',
      draw(ctx, t) {
        txt(ctx, '300 LITER/DETIK × 86.400 DETIK SEHARIAN PENUH', 0, -360, t, A.kebayan, MN(22), { align: 'center', ls: 4, col: ivo(0.82) });
        fall(ctx, '26 JUTA LITER', -310, -155, t, A.duapuluhenam, DSP(185), { align: 'center', ls: 2 });
        txt(ctx, 'HAMPIR 26 JUTA LITER AIR BERSIH / HARI (HITUNGAN KASAR)', -310, -104, t, A.duapuluhenam + 0.2, MN(17), { align: 'center', ls: 2, col: ivo(0.75) });

        galonBaris(ctx, -310, 140, 1.04, t, A.setara - 0.15, 12, 4);
        txt(ctx, '1 GALON = 19 LITER · BARISAN SKALA HARIAN', -310, 355, t, A.setara + 0.25, MN(17), { align: 'center', ls: 3, col: ivo(0.76) });

        txt(ctx, 'SETARA AIR MINUM DI RUMAH:', 480, -145, t, A.setara, MN(21), { align: 'center', ls: 3, col: ivo(0.8) });
        fall(ctx, '1,36 JUTA', 480, 45, t, A.galon, DSP(195), { align: 'center', col: LIME });
        txt(ctx, 'GALON / HARI', 480, 110, t, A.galon + 0.15, MN(28), { align: 'center', ls: 4 });
        slab(ctx, 'DI RUMAH KITA', 480, 195, t, A.rumah, { align: 'center', size: 22 });

        srcTag(ctx, 'Hitungan sendiri: 300 LPS × 86.400 dtk ÷ 19 L/galon (BP Batam)', -840, 440, t, A.duapuluhenam + 0.25);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 6, ctx, t, items),
    },

    // S7 · Kabar baik: Kelebihan produksi boleh disalurkan untuk warga (full-bleed ocean_aerial)
    {
      at: A.kabar, via: 'truck', name: 'Surplus untuk warga', tag: 'WARGA',
      draw(ctx, t) {
        txt(ctx, 'KABAR BAIK DARI BP BATAM', 0, -275, t, A.kabar, MN(24), { align: 'center', ls: 5, col: ivo(0.88) });

        // Clean architectural vector flow split: SWRO Kabil -> Data Center + Excess -> Warga
        const kf = kq(t, A.bpbatam2, 0.55);
        if (kf > 0) {
          ctx.strokeStyle = 'rgba(241,239,230,0.45)'; ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-460, -85); ctx.lineTo(lerp(-460, -60, kf), -85);
          ctx.moveTo(-60, -85); ctx.lineTo(lerp(-60, 170, kf), lerp(-85, -145, kf));
          ctx.moveTo(-60, -85); ctx.lineTo(lerp(-60, 170, kf), lerp(-85, -25, kf));
          ctx.stroke();
          if (kf > 0.45) {
            ctx.fillStyle = IVORY;
            ctx.beginPath(); ctx.arc(-60, -85, 5, 0, Math.PI * 2); ctx.fill();
          }
        }
        slab(ctx, 'PRODUKSI SWRO BERLEBIH', -460, -85, t, A.bpbatam2, { align: 'center', size: 22 });
        slab(ctx, 'KEBUTUHAN DATA CENTER', 340, -145, t, A.berlebih - 0.3, { align: 'center', size: 20 });
        slab(ctx, 'SISA DISALURKAN → WARGA', 340, -25, t, A.sisanya - 0.1, { align: 'center', size: 20, lime: true });

        markLine(ctx, 'sisanya boleh untuk ', 'WARGA.', '', 0, 175, t, A.sisanya, A.warga - 0.25, SRF(105), { align: 'center' });
        srcTag(ctx, 'Sumber: BP Batam & KOMPAS.com, 5 Nov 2026', -840, 440, t, A.bpbatam2);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 7, ctx, t, items),
    },

    // S8 · BRIGHT LAB TURN (#EAE7DC): Pabrik Desalinasi CC BY-SA 3.0 + Sea Water Reverse Osmosis
    {
      at: A.tapi, via: 'push', dur: 0.55, name: 'Teknologi Reverse Osmosis', tag: 'SWRO',
      draw(ctx, t) {
        txt(ctx, 'AIR LAUT ASIN → AIR TAWAR BENING', -790, -245, t, A.tapi + 0.1, MN(22), { ls: 4, col: DARK_INK });
        txt(ctx, 'Bagaimana cara kerjanya?', -790, -175, t, A.asin - 0.4, SRF(48), { col: '#2D3024' });
        fall(ctx, 'SEA WATER', -790, -15, t, A.swroname, DSP(155), { col: DARK_INK, ls: 2 });
        markLine(ctx, '', 'REVERSE OSMOSIS', '', -790, 155, t, A.reverse - 0.15, A.reverse - 0.25, DSP(170), { align: 'left', ls: 2, col: DARK_INK });
        txt(ctx, '= penyaringan balik air laut', -790, 255, t, A.gampangnya, SRF(56), { col: DARK_INK });
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 8, ctx, t, items),
    },

    // S9 · Osmosis Alami vs Paksa Kebalikannya (Bright Lab #EAE7DC + WebGL2 Caustic/Ripple)
    {
      at: A.normal, via: 'whip', name: 'Osmosis Alami vs Balik', tag: 'OSMOSIS',
      draw: (ctx, t) => drawOsmosisTank(ctx, t),
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 9, ctx, t, items),
    },

    // S10 · Signature Centerpiece Part 1: membranSWRO + Pompa Menekan Saringan Superhalus
    {
      at: A.pompa, via: 'push', name: 'Membran SWRO: Pompa Tekan', tag: 'MEMBRAN',
      draw(ctx, t) {
        labEyebrow(ctx, 'REVERSE OSMOSIS · SARINGAN SUPERHALUS TOLAK GARAM', -308);

        slab(ctx, 'POMPA RAKSASA MENEKAN', -340, -242, t, A.pompa, { align: 'center', size: 20 });
        slab(ctx, 'MEMBRAN TOLAK GARAM', 290, -242, t, A.saringan, { align: 'center', size: 20, lime: true });

        membranSWRO(ctx, 0, -5, 0.94, t, A.pompa - 0.15, A.menekan, { light: true });

        txt(ctx, 'Ibarat memeras air tawar', 315, 232, t, A.memeras, SRF(42), { align: 'center', col: DARK_INK });
        txt(ctx, 'lewat saringan rapat', 315, 286, t, A.memeras + 0.55, SRF(42), { align: 'center', col: DARK_INK });
        srcTag(ctx, 'Sumber: U.S. DOE & OSTI (SWRO 35.000 → 70.000 ppm brine)', -840, 440, t, A.pompa + 0.2);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 10, ctx, t, items),
    },

    // S11 · Signature Centerpiece Part 2: Makin Asin -> Tenaga Pompa Naik, Hasil: Server vs Garam
    {
      at: A.makinasin, via: 'push', name: 'Tekanan Pompa & Hasil SWRO', tag: 'HASIL',
      draw(ctx, t) {
        // Architectural matte salinity-pressure meter bar
        const kBar = E.outCubic(inv(A.makinasin, A.tenagapompa + 0.6, t));
        const fillW = 840 * lerp(0.28, 0.92, kBar);
        txt(ctx, 'MAKIN ASIN AIR LAUT  →  MAKIN BESAR TENAGA POMPA', 0, -310, t, A.makinasin, MN(20), { align: 'center', ls: 4, col: DARK_INK });
        ctx.fillStyle = 'rgba(21,22,15,0.12)';
        ctx.beginPath(); ctx.roundRect(-420, -278, 840, 22, 3); ctx.fill();
        ctx.strokeStyle = 'rgba(21,22,15,0.20)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = DARK_INK;
        ctx.beginPath(); ctx.roundRect(-420, -278, fillW, 22, 3); ctx.fill();
        ctx.fillStyle = LIME;
        ctx.fillRect(-420 + fillW - 14, -284, 18, 34);
        ctx.strokeStyle = DARK_INK;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-420 + fillW - 14, -284, 18, 34);

        membranSWRO(ctx, 0, -5, 0.90, t, A.makinasin - 0.15, A.tenagapompa, {
          light: true,
          rightLabel: '50% AIR TAWAR → PENDINGIN',
          rightVal: t >= A.hasilnya ? 'KE SERVER' : '300 LPS',
        });

        slab(ctx, 'AIR TAWAR LOLOS → DINGINKAN SERVER', 325, 232, t, A.server - 0.2, { align: 'center', size: 20, lime: true });
        slab(ctx, 'GARAM TERTINGGAL DI SISI LAIN', 325, 296, t, A.garamnya, { align: 'center', size: 19 });
        srcTag(ctx, 'Sumber: U.S. DOE & OSTI · BP Batam', -840, 440, t, A.makinasin + 0.2);
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 11, ctx, t, items),
    },

    // S12 · Penutup Bab: Saat kemarau datang lagi, air waduk tetap aman buat warga
    {
      at: A.saat, via: 'rise', name: 'Waduk tetap aman buat warga', tag: 'AMAN',
      draw(ctx, t) {
        const lvl = lerp(0.42, 0.88, E.outCubic(inv(A.waduk2 - 0.2, A.aman + 0.35, t)));
        gelasWaduk(ctx, -490, -10, 0.95, t, A.saat, {
          level: lvl, critical: false, light: true, label: 'AIR WADUK BATAM', val: 'AMAN',
        });
        txt(ctx, 'SAAT KEMARAU DATANG LAGI,', 195, -110, t, A.kemarau, MN(24), { align: 'center', ls: 4, col: DARK_INK });
        markLine(ctx, 'air waduk tetap ', 'AMAN', ' buat warga.', 195, 35, t, A.waduk2 - 0.1, A.aman - 0.2, SRF(82), { align: 'center', col: DARK_INK });
      },
      world: (ctx, t, pr, foc, items, c) => pushBgOnce(c, 12, ctx, t, items),
    },
  ];

  let FULLS;
  const ch = makeChapter({
    B, ST, load, gate: true,
    label: 'BAB 03 · MEMERAS AIR LAUT DI KABIL',
    full: () => FULLS ??= [
      {
        im: IM.kompas_wajib,
        t0: A.sementara - 0.35,
        t1: A.enambelas - 0.10,
        dir: 1,
        dark: true,
        crop: [0, 0, 1, 0.60],
        tab: 'KOMPAS.COM · 16 OKT 2026',
        hl: [
          [0.622, 0.292, 0.342, 0.187, A.sementara - 0.10],
          [0.025, 0.513, 0.170, 0.158, A.sementara + 0.22],
        ],
      },
    ],
  });

  const origDraw = ch.draw;
  const origPost = ch.post;

  ch.draw = (ctx, t) => {
    const isLight = t >= T_TURN;
    theme(
      isLight,
      isLight
        ? { bg: '#EAE7DC', bgrgb: '234,231,220', vig: 0.16 }
        : { bg: '#0A161E', bgrgb: '10,22,30', vig: 0.52 },
    );
    origDraw(ctx, t);
  };

  ch.post = (o, t) => {
    origPost(o, t);

    // Stock video credits in dark opening act
    if (t < T_TURN + 0.2) {
      kreditLatar(o, W, H, BG_DARK, t, false);
    }

    // Mandatory CC BY-SA 3.0 onscreen credit for commons-reverse-osmosis-desalination-plant.jpg
    if (t >= A.tapi - 0.15 && t <= A.normal + 0.25) {
      const kCred = Math.min(clamp((t - A.tapi + 0.15) / 0.35), 1 - clamp((t - A.normal + 0.25) / 0.30));
      if (kCred > 0.01) {
        o.save();
        o.globalAlpha = kCred;
        const txtCred = 'Foto: James Grellier via Wikimedia Commons (CC BY-SA 3.0)';
        setFont(o, '400 14px "Space Mono"', 1);
        const tw = o.measureText(txtCred).width + 36;
        o.fillStyle = 'rgba(234,231,220,0.92)';
        o.beginPath(); o.roundRect(W - 60 - tw, H - 78, tw + 12, 42, 4); o.fill();
        o.strokeStyle = 'rgba(21,22,15,0.20)';
        o.lineWidth = 1;
        o.stroke();
        o.restore();
        kreditLatar(o, W, H, BG_PLANT, t, true);
      }
    }

    // Screen-space source tag on top of evidFull #5 backdrop
    if (t >= A.sementara - 0.35 && t <= A.enambelas - 0.10) {
      const kSrc = Math.min(clamp((t - A.sementara + 0.35) / 0.35), 1 - clamp((t - A.enambelas + 0.40) / 0.30));
      if (kSrc > 0.01) {
        o.save();
        o.globalAlpha = kSrc;
        o.fillStyle = LIME; o.fillRect(64, H - 62, 11, 11);
        setFont(o, '400 21px "Space Mono"', 1);
        o.fillStyle = 'rgba(241,239,230,0.88)';
        o.fillText('Sumber: KOMPAS.com, 16 Okt 2026', 90, H - 49);
        o.restore();
      }
    }
  };

  return ch;
}
