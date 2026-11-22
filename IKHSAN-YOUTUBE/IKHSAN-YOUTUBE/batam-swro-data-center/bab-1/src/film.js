// Bab 1 · Kota tanpa sungai yang kehabisan air (VO take 04, 138.48s -> DUR 140.45s).
// Visual arc: Bright architectural lab (#EAE7DC, #15160F) -> dramatic dark dry-dust drought turn (#171410, #F1EFE6).
// Every kutipan PNG (9/9), grafik (1/3), petaBatam + 6 gelasWaduk, and 4 full-bleed video plates appear with exact sumberTeks.
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, loadVid, evid, evidFull, fall, markLine, srcTag, slab, txt, countTo, fmt, gone, theme, D2R, rnd,
} from './kit.js';
import { kq, popAt } from './draw.js';
import { layarFoto, kreditLatar, petaBatam, loadBatamMap, gelasWaduk } from './batam.js';
import { strike, node } from './pustaka/dasar.js';
import { makeWaterGL } from './watergl.js';

const LAB_BG = '#EAE7DC', LAB_RGB = '234,231,220', LAB_INK = '#15160F', LAB_IRGB = '21,22,15';
const DUST_BG = '#0D0C0A', DUST_RGB = '13,12,10', DUST_INK = '#F1EFE6', DUST_IRGB = '241,239,230';
const ACC_DARK_ON_LIGHT = '#3C5400';
const INK_ON_LIME = '#11120E';

function drawChartFrame(ctx, cx, cy, w, h, title, t, t0, light, drawInner) {
  const k = E.outQuint(inv(t0, t0 + 0.5, t));
  if (k <= 0) return;
  const a0 = ctx.globalAlpha;
  ctx.save();
  ctx.globalAlpha = a0 * k;
  ctx.translate(cx, cy + (1 - k) * 28);

  if (light) {
    ctx.shadowColor = 'rgba(21,22,15,0.20)';
    ctx.shadowBlur = 44;
    ctx.shadowOffsetY = 18;
  } else {
    ctx.shadowColor = 'rgba(0,0,0,0.62)';
    ctx.shadowBlur = 52;
    ctx.shadowOffsetY = 22;
  }
  ctx.fillStyle = light ? '#DEDAD0' : '#0E171E';
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16); ctx.fill();
  ctx.shadowColor = 'transparent';

  ctx.save();
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16); ctx.clip();

  drawInner();

  // Bottom-left chart badge inside viewport so top (Singapura + 8 cables) stays completely unobstructed
  ctx.fillStyle = light ? 'rgba(17,18,14,0.88)' : 'rgba(9,13,17,0.88)';
  setFont(ctx, MN(14), 2.5);
  const btw = ctx.measureText(title).width + 44;
  ctx.fillRect(-w / 2 + 16, h / 2 - 46, btw, 30);
  ctx.fillStyle = LIME;
  ctx.fillRect(-w / 2 + 26, h / 2 - 36, 9, 9);
  ctx.fillStyle = IVORY; ctx.textAlign = 'left';
  ctx.fillText(title, -w / 2 + 44, h / 2 - 26);
  ctx.restore();

  // Matte editorial hairline border (zero neon!)
  ctx.strokeStyle = light ? 'rgba(21,22,15,0.20)' : 'rgba(241,239,230,0.20)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16); ctx.stroke();
  ctx.restore();
  ctx.globalAlpha = a0;
}

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const T_DARK = A.lalu - 0.08;
  const IM = {}, V = {};
  let waterGL = null;

  async function load() {
    const kb = '../assets/shared/kutipan/';
    const files = {
      disdukcapil: 'disdukcapil-monthly-archives-maret-2026.png',
      bpbatam: 'bpbatam-infrastruktur-batam-bp-batam.png',
      ombudsman: 'ombudsman-artikel.png',
      detik: 'detik-warga-sambau-batam-sebut-air-mati-sejak.png',
      cnbc: 'cnbcindonesia-warga-batam-mengeluh-tak-dapat-air-sejak.png',
      kompas: 'kompas-dugaan-krisis-air-akibat-pusat-data-di.png',
      rri: 'rri-waduk-nongsa-kering-bukan-karena.png',
      batampos: 'batampos-produksi-air-bersih-waduk-nongsa.png',
      pemko: 'kelbukittempayan-jaga-air-waduk-untuk-masyarakat-batam.png',
    };
    await Promise.all([
      loadBatamMap('../assets/shared/peta/'),
      ...Object.entries(files).map(async ([k, f]) => { IM[k] = await loadImg(kb + f, 1800); }),
      (async () => { IM.grafik = await loadImg('../assets/shared/grafik/produksi-air-nongsa-kemarau.png', 1920); })(),
      ...['network_cables', 'keran_tetes', 'tanah_retak', 'waduk_surut'].map(async nm => {
        V[nm] = await loadVid('../assets/shared/vid/', nm);
      }),
    ]);
    waterGL = makeWaterGL(960, 540);
  }

  // Full-bleed documentary video plates (NEVER boxed!) + background world wipe
  const VID_BG = [
    { vid: 'network_cables', t0: A.menurut - 0.35, t1: A.masalahnya + 0.2,
      kredit: 'Video: Dima Krivoy / Pexels', cap: 'KABEL JARINGAN · INFRASTRUKTUR DATA',
      grade: 'saturate(0.30) contrast(1.06) brightness(1.08)', light: true },
    { vid: 'keran_tetes', t0: A.pipa - 0.25, t1: T_DARK,
      kredit: 'Video: mariya_m / Pixabay', cap: 'WILAYAH STRES AIR · ALIRAN TERSENDAT',
      grade: 'saturate(0.32) contrast(1.08) brightness(1.06)', light: true },
    { vid: 'tanah_retak', t0: T_DARK, t1: A.okt5 + 0.9,
      kredit: 'Video: Asad Ansari / Pexels', cap: 'KEMARAU OKTOBER 2026 · NONGSA',
      grade: 'saturate(0.42) contrast(1.30) brightness(0.68) sepia(0.22)', light: false },
    { vid: 'tanah_retak', t0: A.biang - 0.2, t1: A.turun + 0.7,
      kredit: 'Video: Asad Ansari / Pexels', cap: 'EL NINO · WADUK MENYUSUT',
      grade: 'saturate(0.42) contrast(1.30) brightness(0.66) sepia(0.24)', light: false },
    { vid: 'waduk_surut', t0: A.airnya - 0.2, t1: A.artinya + 0.65,
      kredit: 'Video: David Pickup / Pexels', cap: 'DARURAT AIR · PIPA WADUK DURIANGKANG',
      grade: 'saturate(0.38) contrast(1.26) brightness(0.66)', light: false },
  ];

  function drawWorldBackdrop(ctx, t) {
    const isLight = t < T_DARK;

    // S0 full-bleed real 3D Sentinel-2 satellite drone fly-in over Pulau Batam & Singapore Strait
    if (t < A.kota + 0.18) {
      const kOut = 1 - E.inOutCubic(inv(A.kota - 0.45, A.kota + 0.12, t));
      if (kOut > 0.005) {
        const lin0 = inv(0.2, A.kota, t);
        const u0 = E.outCubic(lin0) * 0.65 + lin0 * 0.35;
        petaBatam(ctx, 0, 0, 1, t, 0.2, {
          fullBleed: true,
          light: true,
          showSG: true,
          labels: false,
          showBatamLabel: false,
          lon: lerp(103.94, 103.96, u0),
          lat: lerp(1.17, 1.13, u0),
          dist: lerp(1.24, 0.86, u0),
          pitch: lerp(28, 48, u0),
          yaw: lerp(-10, 4, u0),
          a: kOut,
        });
        // Subtle editorial paper scrim on left side so dark-ink hero typography reads cleanly
        ctx.save();
        ctx.globalAlpha = kOut;
        const scrim = ctx.createLinearGradient(0, 0, W * 0.76, 0);
        scrim.addColorStop(0.0, 'rgba(234,231,220,0.95)');
        scrim.addColorStop(0.36, 'rgba(234,231,220,0.84)');
        scrim.addColorStop(0.56, 'rgba(234,231,220,0.38)');
        scrim.addColorStop(1.0, 'rgba(234,231,220,0.0)');
        ctx.fillStyle = scrim;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }
    }

    const plates = VID_BG.filter(b => b.light === isLight);
    if (plates.length) {
      layarFoto(ctx, W, H, plates, t, isLight
        ? { IM: V, veil: 'rgba(234,231,220,0.80)', grain: 0.11 }
        : { IM: V, dim: 0.64, grain: 0.22 });
    }

    // Deeper cinematic contrast & warm obsidian key-light on dark crisis scenes (S8-S14)
    if (!isLight) {
      ctx.save();
      const spot = ctx.createRadialGradient(W * 0.5, H * 0.44, H * 0.12, W * 0.5, H * 0.5, W * 0.68);
      spot.addColorStop(0, 'rgba(34,28,20,0.22)');
      spot.addColorStop(0.58, 'rgba(10,9,8,0.14)');
      spot.addColorStop(1, 'rgba(4,4,3,0.62)');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // Subtle WebGL2 Worley caustic shimmer on water/rain stations in Bright Lab
    if (waterGL && isLight && t >= A.masalahnya - 0.3 && t < A.awal) {
      const rippleT = t >= A.hujan ? t - A.hujan : -1;
      const ca = waterGL(t, rippleT, 0.5, 0.5, 0.24);
      if (ca) {
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.14;
        ctx.drawImage(ca, 0, 0, W, H);
        ctx.restore();
      }
    }
  }

  function drawDarkWipeOver(o, t) {
    // Diagonal dry-dust sweep across Bright Lab cleanly above ST[7] right before T_DARK
    if (t >= T_DARK - 0.24 && t < T_DARK) {
      const kw = E.inOutCubic(inv(T_DARK - 0.24, T_DARK, t));
      const ex = lerp(-180, W + 180, kw);
      o.save();
      o.setTransform(1, 0, 0, 1, 0, 0);
      o.fillStyle = DUST_BG;
      o.beginPath();
      o.moveTo(-20, -20); o.lineTo(ex + 160, -20); o.lineTo(ex - 160, H + 20); o.lineTo(-20, H + 20);
      o.closePath(); o.fill();
      o.fillStyle = LIME;
      o.beginPath();
      o.moveTo(ex + 160, -20); o.lineTo(ex + 174, -20); o.lineTo(ex - 146, H + 20); o.lineTo(ex - 160, H + 20);
      o.closePath(); o.fill();
      o.restore();
    }
  }

  function updateTheme(t) {
    if (t < T_DARK) {
      theme(true, { bg: LAB_BG, bgrgb: LAB_RGB, ink: LAB_INK, inkrgb: LAB_IRGB, vig: 0.15 });
    } else {
      theme(false, { bg: DUST_BG, bgrgb: DUST_RGB, ink: DUST_INK, inkrgb: DUST_IRGB, vig: 0.72 });
    }
  }

  const ST = [
    // S0 (0.00..4.41s): Intro — Full-bleed 3D Sentinel-2 drone fly-in over Pulau Batam + crisp editorial typography (0.72s portal-safe!)
    { at: 0, name: 'Kondisi Pulau Batam', yaw: [-1.4, 1.0], dist: [1480, 1410],
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 0) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        txt(ctx, 'BAB 01 · KOTA TANPA SUNGAI', -780, -230, t, 0.78, MN(24), { ls: 5, col: ivo(0.78) });
        const kl = kq(t, 0.85, 0.55);
        ctx.fillStyle = LAB_INK; ctx.fillRect(-780, -198, 190 * kl, 4);
        txt(ctx, 'Yuk kita lihat kondisi...', -780, -90, t, A.yuk, SRF(62), { col: LAB_INK });
        fall(ctx, 'PULAU BATAM', -780, 145, t, A.yuk + 0.30, DSP(250), { ls: 4, stag: 0.032, col: LAB_INK });
        slab(ctx, 'KEPULAUAN RIAU', -780, 235, t, A.yuk + 0.35, { size: 22 });
      }
    },

    // S1 (4.41..8.21s): Hampir 1,4 juta penduduk + Disdukcapil Batam card
    { at: A.kota - 0.1, via: 'push', tag: '1,4 JT',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 1) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        txt(ctx, 'PENDUDUK KOTA BATAM', -820, -295, t, A.kota + 0.05, MN(22), { ls: 4, col: ivo(0.75) });
        const popVal = Math.round(countTo(0, 1394459, t, A.ditinggali - 0.1, 1.35));
        setFont(ctx, DSP(155), 1); ctx.fillStyle = LAB_INK; ctx.textAlign = 'left';
        ctx.fillText(fmt(popVal), -820, -120);
        txt(ctx, 'JIWA (DKB SEM II 2025)', -818, -74, t, A.ditinggali + 0.25, MN(20), { ls: 3, col: ivo(0.7) });
        markLine(ctx, 'Hampir ', '1,4 JUTA', ' orang', -820, 20, t, A.satu - 0.1, A.empat, SRF(56), { align: 'left', col: LAB_INK });

        // 14x10 dot grid (1 dot = 10.000 jiwa) batched in 1 Path2D
        const kd = clamp((t - A.ditinggali) / 1.4);
        if (kd > 0) {
          const p = new Path2D();
          const nVis = Math.floor(140 * kd);
          for (let i = 0; i < nVis; i++) {
            const gx = -810 + (i % 20) * 28, gy = 95 + Math.floor(i / 20) * 28;
            p.rect(gx, gy, 14, 14);
          }
          ctx.fillStyle = ivo(0.78); ctx.fill(p);
        }

        if (IM.disdukcapil) {
          evid(ctx, IM.disdukcapil, 380, -10, 860, t, A.ditinggali - 0.05, {
            crop: [0.09, 0.43, 0.83, 0.56],
            tab: 'DISDUKCAPIL BATAM · 27 MAR 2026',
            rot: 1.2,
            hl: [[0.036, 0.663, 0.476, 0.042, A.satu]],
          });
        }
        srcTag(ctx, 'Sumber: disdukcapil.batam.go.id, 27 Maret 2026', -840, 440, t, A.kota + 0.35);
      }
    },

    // S2 (8.21..20.21s): Sebelah Singapura + 8 Kabel Laut + evidFull #1 (BP Batam)
    { at: A.letak - 0.1, via: 'whip', tag: '8 KABEL',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 2) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        const kS2 = E.inOutCubic(inv(A.letak, A.internasional, t));
        drawChartFrame(ctx, 340, -15, 920, 680, 'SELAT SINGAPURA · KONEKSI KABEL LAUT', t, A.letak, true, () => {
          petaBatam(ctx, 0, 0, 1, t, A.letak - 0.5, {
            w: 920, h: 680, noFrame: true, light: true,
            lon: 103.968, lat: 1.185, dist: lerp(1.16, 1.04, kS2),
            cables: true, cablesAt: A.delapan - 0.25,
            hubs: false, labels: false, showSG: true, showBatamLabel: true,
          });
        });

        txt(ctx, 'LETAK STRATEGIS', -840, -280, t, A.letak + 0.1, MN(22), { ls: 4, col: ivo(0.75) });
        markLine(ctx, 'Persis di sebelah ', 'SINGAPURA', '', -840, -195, t, A.sebelah - 0.1, A.singapura, SRF(48), { align: 'left', col: LAB_INK });
        slab(ctx, 'INCARAN BESAR DUNIA DIGITAL', -840, -110, t, A.incaran, { size: 20 });

        // Tone-Layer Lift after evidFull #1 whips off at A.delapan + 0.1
        if (t >= A.delapan - 0.4) {
          fall(ctx, '8 KABEL', -840, 95, t, A.delapan - 0.05, DSP(180), { ls: 3, col: LAB_INK });
          txt(ctx, 'INTERNET BAWAH LAUT INTERNASIONAL', -840, 148, t, A.kabel, MN(19), { ls: 2, col: ACC_DARK_ON_LIGHT });
        }
        srcTag(ctx, 'Sumber: BP Batam, 8 Nov 2025', -840, 440, t, A.menurut);
      }
    },

    // S3 (20.21..25.81s): Nongsa & Kabil hubs + BP Batam evid card
    { at: A.wajar - 0.1, via: 'push', tag: 'NONGSA',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 3) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        const kFocus = E.inOutCubic(inv(A.kabil - 0.3, A.kabil + 0.45, t));
        drawChartFrame(ctx, -350, -15, 920, 690, 'BATAM TIMUR · ZONA PUSAT DATA', t, A.wajar - 0.1, true, () => {
          petaBatam(ctx, 0, 0, 1, t, A.wajar - 0.6, {
            w: 920, h: 690, noFrame: true, light: true,
            lon: lerp(104.075, 104.095, kFocus),
            lat: lerp(1.162, 1.132, kFocus),
            dist: lerp(0.68, 0.62, kFocus),
            cables: true, cablesAt: A.wajar - 0.4,
            hubs: true, focus: t >= A.kabil ? 'kabil' : 'nongsa',
            labels: false, showSG: false, showBatamLabel: false,
          });
        });

        txt(ctx, 'TITIK INCARAN INDUSTRI', 155, -305, t, A.wajar, MN(22), { ls: 4, col: ivo(0.75) });
        slab(ctx, '1 · KEK NONGSA', 155, -235, t, A.nongsa - 0.1, { size: 24, lime: true });
        slab(ctx, '2 · KABIL', 155, -165, t, A.kabil - 0.1, { size: 24, lime: true });
        markLine(ctx, 'Membangun ', 'GEDUNG KOMPUTER', '', 155, -80, t, A.kabil + 0.25, A.komputer, SRF(42), { align: 'left', col: LAB_INK });

        if (IM.bpbatam) {
          evid(ctx, IM.bpbatam, 500, 165, 680, t, A.wajar + 0.15, {
            crop: [0.0, 0.20, 1.0, 0.72],
            tab: 'BP BATAM · 8 NOV 2025',
            rot: -1.1,
            hl: [[0.188, 0.794, 0.126, 0.042, A.nongsa]],
          });
        }
        srcTag(ctx, 'Sumber: BP Batam, 8 Nov 2025', -840, 440, t, A.wajar);
      }
    },

    // S4 (25.81..35.81s): No big rivers / natural springs -> 6 Waduk Tadah Hujan + 6 gelasWaduk
    { at: A.masalahnya - 0.1, via: 'whip', tag: '6 WADUK',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 4) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        const showGelas = t >= A.semua - 0.15;
        const mapFade = showGelas ? gone(t, A.semua - 0.15, 0.35) : 1;

        txt(ctx, 'MASALAH GEOGRAFI BATAM', -820, -310, t, A.masalahnya, MN(22), { ls: 4, col: ivo(0.75) });
        if (!showGelas || mapFade > 0.02) {
          ctx.save(); ctx.globalAlpha *= mapFade;
          setFont(ctx, DSP(108), 2); ctx.fillStyle = LAB_INK; ctx.textAlign = 'left';
          txt(ctx, 'SUNGAI BESAR', -820, -145, t, A.sungai - 0.2, DSP(108));
          strike(ctx, -820, -315, -145, 108, t, A.sungai + 0.15, '#B22B1D');
          txt(ctx, 'MATA AIR ALAMI', -820, -15, t, A.mata - 0.2, DSP(108));
          strike(ctx, -820, -255, -15, 108, t, A.mata + 0.15, '#B22B1D');
          txt(ctx, 'Hanya mengandalkan air hujan.', -820, 95, t, A.mata + 0.7, SRF(46), { col: LAB_INK });

          drawChartFrame(ctx, 320, -15, 920, 680, 'SISTEM SPAM · 6 WADUK UTAMA', t, A.masalahnya + 0.1, true, () => {
            petaBatam(ctx, 0, 0, 1, t, A.masalahnya - 0.4, {
              w: 920, h: 680, noFrame: true, light: true,
              lon: 104.028, lat: 1.108, dist: 0.78,
              focus: 'all', hubs: false, cables: false, labels: true, showSG: false,
            });
          });
          ctx.restore();
        }

        if (showGelas) {
          const kIn = E.outQuint(inv(A.semua, A.semua + 0.45, t));
          ctx.save(); ctx.globalAlpha *= kIn;
          markLine(ctx, 'Semua bergantung pada ', 'AIR HUJAN', ' di', -820, -215, t, A.semua, A.hujan, SRF(56), { align: 'left', col: LAB_INK });
          slab(ctx, '6 WADUK TADAH HUJAN UTAMA', -820, -135, t, A.enam - 0.1, { size: 24, lime: true });

          // Animated rain streaks falling into the 6 waduk gauges
          const kRain = E.outCubic(inv(A.hujan - 0.1, A.hujan + 0.8, t));
          if (kRain > 0) {
            ctx.strokeStyle = 'rgba(42,102,138,0.45)'; ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let r = 0; r < 24; r++) {
              const rx = -700 + r * 62;
              const ry = -60 + ((t * 360 + r * 47) % 160);
              ctx.moveTo(rx, ry); ctx.lineTo(rx - 6, ry + 26);
            }
            ctx.stroke();
          }

          const WADUK = [
            ['WADUK 01', 0.86, 'DURIANGKANG'],
            ['WADUK 02', 0.80, 'SEI LADI'],
            ['WADUK 03', 0.82, 'MUKAKUNING'],
            ['WADUK 04', 0.78, 'PIAYU'],
            ['WADUK 05', 0.83, 'SEI HARAPAN'],
            ['WADUK 06', 0.84, 'NONGSA'],
          ];
          WADUK.forEach(([sub, baseLv, nm], i) => {
            const gx = -660 + i * 264;
            const lv = lerp(0.55, baseLv, kRain);
            gelasWaduk(ctx, gx, 165, 0.78, t, A.semua + i * 0.08, {
              level: lv, label: sub, val: nm, light: true,
            });
          });
          ctx.restore();
        }
        srcTag(ctx, 'Sumber: BP Batam, 8 Nov 2025', -840, 440, t, A.masalahnya + 0.4);
      }
    },

    // S5 (35.81..41.45s): Analogi "TABUNGAN HUJAN"
    { at: A.bayangkan - 0.1, via: 'rise', tag: 'TABUNGAN',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 5) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        txt(ctx, 'ANALOGI SEDERHANA', 0, -320, t, A.bayangkan, MN(22), { align: 'center', ls: 5, col: ivo(0.7) });
        txt(ctx, 'Bayangkan punya rekening tabungan...', 0, -245, t, A.rekening - 0.1, SRF(56), { align: 'center', col: LAB_INK });

        // Sleek dark architectural ledger/tank on bright paper
        const kt = E.outQuint(inv(A.rekening, A.rekening + 0.5, t));
        if (kt > 0) {
          ctx.save(); ctx.globalAlpha *= kt;
          ctx.fillStyle = '#15160F';
          ctx.beginPath(); ctx.roundRect(-520, -165, 1040, 270, 18); ctx.fill();
          ctx.strokeStyle = 'rgba(241,239,230,0.20)'; ctx.lineWidth = 1.5; ctx.stroke();

          setFont(ctx, MN(20), 3); ctx.fillStyle = 'rgba(241,239,230,0.72)'; ctx.textAlign = 'left';
          ctx.fillText('REKENING AIR BATAM // SALDO WADUK', -475, -112);

          // Rain fill only occurs when langit menurunkan hujan!
          const fillU = lerp(0.18, 0.72, E.outCubic(inv(A.hujan2 - 0.8, A.hujan2 + 0.4, t)));
          ctx.fillStyle = 'rgba(241,239,230,0.12)';
          ctx.beginPath(); ctx.roundRect(-475, -60, 950, 88, 10); ctx.fill();
          ctx.fillStyle = t >= A.hujan2 - 0.4 ? LIME : '#5BA8CD';
          ctx.beginPath(); ctx.roundRect(-475, -60, 950 * fillU, 88, 10); ctx.fill();

          setFont(ctx, MN(18), 2.5); ctx.fillStyle = INK_ON_LIME; ctx.textAlign = 'left';
          if (fillU > 0.25) ctx.fillText(t >= A.hujan2 - 0.4 ? 'TERISI SAAT HUJAN TURUN' : 'MENUNGGU HUJAN...', -450, -9);

          // Animated raindrops tapping top of the ledger bar (architectural rain-slate ink, zero neon!)
          if (t >= A.hujan2 - 1.2) {
            ctx.strokeStyle = 'rgba(42,102,138,0.68)'; ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let d = 0; d < 10; d++) {
              const dx = -380 + d * 85, dy = -215 + ((t * 280 + d * 39) % 55);
              ctx.moveTo(dx, dy); ctx.lineTo(dx - 3, dy + 16);
            }
            ctx.stroke();
          }
          ctx.restore();
        }

        markLine(ctx, 'REKENING ', 'TABUNGAN HUJAN', '', 0, 250, t, A.tabungan - 0.1, A.hujan2 - 0.2, DSP(136), { col: LAB_INK });
      }
    },

    // S6 (41.45..48.53s): Ombudsman RI -> 18 Wilayah Bermasalah (Stress Area)
    { at: A.awal - 0.1, via: 'whip', tag: '18 AREA',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 6) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        txt(ctx, 'AWAL 2026 · OMBUDSMAN RI', -820, -310, t, A.awal + 0.05, MN(22), { ls: 4, col: ivo(0.75) });
        if (IM.ombudsman) {
          evid(ctx, IM.ombudsman, -390, -85, 840, t, A.ombudsman - 0.1, {
            crop: [0.06, 0.10, 0.62, 0.72],
            tab: 'OMBUDSMAN.GO.ID · 29 JAN 2026',
            rot: -1.1,
            hl: [[0.065, 0.558, 0.680, 0.125, A.delapan_belas]],
          });
        }
        slab(ctx, 'LEMBAGA PENGAWAS LAYANAN PUBLIK', -810, 145, t, A.ombudsman + 1.0, { size: 22 });

        // Right column: Big 18 + 18 stress-area tiles
        fall(ctx, '18', 240, -60, t, A.delapan_belas - 0.1, DSP(250), { col: LAB_INK });
        txt(ctx, 'WILAYAH BERMASALAH (STRESS AREA)', 240, -5, t, A.delapan_belas + 0.15, MN(22), { ls: 2, col: LAB_INK });

        const nLit = Math.min(18, Math.floor(clamp((t - A.delapan_belas) / 0.8) * 18));
        for (let i = 0; i < 18; i++) {
          const cx = 250 + (i % 6) * 96, cy = 85 + Math.floor(i / 6) * 90;
          const active = i < nLit;
          ctx.fillStyle = active ? '#15160F' : ivo(0.14);
          ctx.beginPath(); ctx.roundRect(cx, cy, 80, 72, 10); ctx.fill();
          if (active) {
            ctx.fillStyle = LIME; ctx.fillRect(cx + 12, cy + 12, 10, 10);
            setFont(ctx, MN(20), 7); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
            ctx.fillText(String(i + 1).padStart(2, '0'), cx + 40, cy + 50);
            ctx.textAlign = 'left';
          }
        }
        srcTag(ctx, 'Sumber: ombudsman.go.id, diakses 18 Nov 2026', -840, 440, t, A.ombudsman - 0.1);
      }
    },

    // S7 (48.53..58.54s): Pipa tua + keran menetes full-bleed -> tersendat, keruh, beberapa jam sehari
    { at: A.pipa - 0.1, via: 'push', tag: 'PIPA TUA',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 7) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        txt(ctx, 'KONDISI JARINGAN DISTRIBUSI', -820, -310, t, A.pipa, MN(22), { ls: 4, col: ivo(0.75) });

        // Left: Corroding old pipe cross-section (matte editorial framing, zero neon)
        const kp = E.outQuint(inv(A.pipa, A.pipa + 0.6, t));
        if (kp > 0) {
          ctx.save(); ctx.globalAlpha *= kp;
          ctx.fillStyle = '#15160F';
          ctx.beginPath(); ctx.roundRect(-820, -210, 740, 260, 16); ctx.fill();
          ctx.strokeStyle = 'rgba(241,239,230,0.20)'; ctx.lineWidth = 1.5; ctx.stroke();

          // Solid matte lime tag block with crisp dark ink
          setFont(ctx, MN(18), 2.5);
          const tagW = ctx.measureText('PIPA UTAMA SUDAH TUA').width + 28;
          ctx.fillStyle = LIME; ctx.fillRect(-760, -172, tagW, 34);
          ctx.fillStyle = INK_ON_LIME; ctx.textAlign = 'left';
          ctx.fillText('PIPA UTAMA SUDAH TUA', -746, -149);

          // Old corroded iron pipe body inside card
          ctx.fillStyle = '#38332B'; ctx.fillRect(-760, -110, 620, 74);
          ctx.strokeStyle = 'rgba(241,239,230,0.26)'; ctx.lineWidth = 1.5; ctx.strokeRect(-760, -110, 620, 74);
          // Weathered fracture cracks (dark seam + rust-clay edge, zero neon!)
          ctx.strokeStyle = '#0B0C09'; ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(-540, -110); ctx.lineTo(-525, -80); ctx.lineTo(-542, -55); ctx.lineTo(-528, -36);
          ctx.moveTo(-310, -110); ctx.lineTo(-298, -74); ctx.lineTo(-315, -36);
          ctx.stroke();
          ctx.strokeStyle = '#D96B43'; ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-539, -110); ctx.lineTo(-524, -80); ctx.lineTo(-541, -55); ctx.lineTo(-527, -36);
          ctx.moveTo(-309, -110); ctx.lineTo(-297, -74); ctx.lineTo(-314, -36);
          ctx.stroke();

          setFont(ctx, MN(18, 400), 2); ctx.fillStyle = 'rgba(241,239,230,0.82)';
          ctx.fillText('PERLU DIGANTI · TEKANAN RENDAH', -760, 14);
          ctx.restore();
        }

        // Right: Staccato status cards + 24-hour clock sliver
        const ITEMS = [
          ['01', 'AIR TERSENDAT', A.tersendat - 0.1, false],
          ['02', 'KERUH', A.keruh - 0.1, false],
          ['03', 'MENGALIR BEBERAPA JAM SEHARI', A.jam - 0.9, true],
        ];
        ITEMS.forEach(([num, lbl, t0, hot], i) => {
          const ki = E.outQuint(inv(t0, t0 + 0.4, t));
          if (ki <= 0) return;
          const by = -205 + i * 142;
          ctx.save(); ctx.globalAlpha *= ki;
          ctx.translate(40, by + (1 - ki) * 24);
          ctx.fillStyle = hot ? LIME : '#15160F';
          ctx.beginPath(); ctx.roundRect(0, 0, 780, 108, 12); ctx.fill();
          ctx.strokeStyle = hot ? 'rgba(21,22,15,0.20)' : 'rgba(241,239,230,0.20)';
          ctx.lineWidth = 1.5; ctx.stroke();
          setFont(ctx, MN(20), 3); ctx.fillStyle = hot ? INK_ON_LIME : 'rgba(241,239,230,0.52)'; ctx.textAlign = 'left';
          ctx.fillText(num, 28, 62);
          setFont(ctx, DSP(52), 2); ctx.fillStyle = hot ? INK_ON_LIME : IVORY;
          ctx.fillText(lbl, 90, 72);
          ctx.restore();
        });

        // 24h dial on bottom-left showing only a narrow arc of water flow
        const kd = E.outCubic(inv(A.jam - 1.2, A.jam + 0.2, t));
        if (kd > 0) {
          ctx.save(); ctx.globalAlpha *= kd;
          ctx.translate(-710, 215);
          ctx.strokeStyle = ivo(0.22); ctx.lineWidth = 14;
          ctx.beginPath(); ctx.arc(0, 0, 76, 0, Math.PI * 2); ctx.stroke();
          ctx.strokeStyle = '#15160F'; ctx.lineWidth = 14;
          ctx.beginPath(); ctx.arc(0, 0, 76, -Math.PI / 2, -Math.PI / 2 + Math.PI * 0.45 * kd); ctx.stroke();
          setFont(ctx, DSP(48), 1); ctx.fillStyle = LAB_INK; ctx.textAlign = 'center';
          ctx.fillText('24 JAM', 0, 16);
          setFont(ctx, MN(18), 2.5); ctx.textAlign = 'left';
          ctx.fillText('SEBAGIAN CUMA MENETES BEBERAPA JAM', 110, 8);
          ctx.restore();
        }
        srcTag(ctx, 'Sumber: ombudsman.go.id, diakses 18 Nov 2026', -840, 440, t, A.pipa + 0.2);
      }
    },

    // S8 (58.54..64.25s): DARK DROUGHT TURN — Oktober 2026, Kecamatan Nongsa, kesabaran habis + tanah_retak
    { at: A.lalu - 0.05, via: 'cut', lead: 0, pre: 0, tag: 'OKT 2026',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 8) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        slab(ctx, 'OKTOBER 2026 · TITIK DIDIH', 0, -245, t, A.lalu + 0.05, { align: 'center', size: 20, lime: true });
        fall(ctx, 'OKTOBER 2026', 0, -40, t, A.oktober - 0.1, DSP(230), { align: 'center', ls: 5, col: IVORY });
        slab(ctx, 'KECAMATAN NONGSA · BATAM', 0, 55, t, A.nongsa2 - 0.15, { align: 'center', size: 24 });
        markLine(ctx, 'KESABARAN WARGA ', 'HABIS.', '', 0, 215, t, A.kesabaran - 0.1, A.habis - 0.15, SRF(86), { col: IVORY });
      }
    },

    // S9 (64.25..77.02s): 5 Okt 300 warga Sambau demo (evidFull #2 detiksumut) + CNBC & Kompas.id
    { at: A.pada - 0.1, via: 'whip', tag: '5 OKT',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 9) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        // Tone-Layer Lift left column (visible cleanly once evidFull #2 whips off at 69.89s)
        txt(ctx, '5 OKTOBER 2026 · KELURAHAN SAMBAU', -820, -300, t, A.park - 0.8, MN(22), { ls: 3, col: ivo(0.75) });
        fall(ctx, '300 WARGA', -820, -135, t, A.park - 0.7, DSP(190), { ls: 3, col: IVORY });
        slab(ctx, 'UNJUK RASA · NONGSA DIGITAL PARK', -820, -45, t, A.park - 0.3, { size: 22 });
        markLine(ctx, 'Air keran mati ', 'BERBULAN-BULAN', '', -820, 120, t, A.mengeluhkan - 0.1, A.mati, SRF(48), { align: 'left', col: IVORY });
        txt(ctx, 'SEJAK PROYEK DATA CENTER DIBANGUN', -820, 195, t, A.dc1 - 0.1, MN(21), { ls: 2, col: ivo(0.75) });

        // Stacked clean right-column evidence cards (zero overlap!)
        if (IM.cnbc) {
          evid(ctx, IM.cnbc, 430, -195, 760, t, A.mengeluhkan - 0.2, {
            crop: [0.0, 0.0, 1.0, 0.64],
            tab: 'CNBC INDONESIA · 6 OKT 2026',
            rot: 1.0,
            hl: [[0.038, 0.240, 0.924, 0.150, A.mati], [0.041, 0.422, 0.240, 0.115, A.dc1]],
          });
        }
        if (IM.kompas) {
          evid(ctx, IM.kompas, 430, 155, 760, t, A.dc1 - 1.1, {
            dark: true,
            tab: 'KOMPAS.ID · 13 OKT 2026',
            rot: -1.1,
            hl: [[0.355, 0.130, 0.510, 0.295, A.dc1 + 0.15]],
          });
        }
        srcTag(ctx, 'Sumber: CNBC Indonesia, 6 Okt 2026', -840, 412, t, A.mengeluhkan - 0.2);
        srcTag(ctx, 'Sumber: Kompas.id, 13 Okt 2026', -840, 446, t, A.dc1 - 1.0);
      }
    },

    // S10 (77.02..92.09s): Bantahan BP Batam (RRI) + 160 LPS dicoret
    { at: A.tapi - 0.1, via: 'whip', tag: 'BANTAHAN',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 10) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        const showRRI = t >= A.bp2 - 0.2;
        if (!showRRI) {
          slab(ctx, 'BIAR ADIL · DENGAR KEDUA SISI', 0, -110, t, A.tapi + 0.05, { align: 'center', size: 20, lime: true });
          markLine(ctx, 'Penjelasan dari ', 'PENGELOLA KOTA', '', 0, 30, t, A.adil, A.pengelola, SRF(86), { col: IVORY });
          return;
        }
        txt(ctx, 'PENJELASAN RESMI · BP BATAM', -820, -295, t, A.bp2, MN(22), { ls: 4, col: ivo(0.75) });
        if (IM.rri) {
          evid(ctx, IM.rri, -395, -65, 810, t, A.bp2 - 0.05, {
            crop: [0.0, 0.0, 1.0, 0.64],
            dark: true,
            tab: 'RRI.CO.ID · 7 OKT 2026',
            rot: -1.1,
            hl: [[0.058, 0.285, 0.840, 0.245, A.membantah]],
          });
        }
        slab(ctx, 'BANTAH AIR WARGA DISEDOT SERVER', -800, 145, t, A.membantah + 0.1, { size: 22, lime: true });

        // Right column: 160 LPS claim stamped & slashed in editorial crimson
        txt(ctx, 'ISU YANG BEREDAR', 460, -210, t, A.lps160 - 0.4, MN(22), { align: 'center', ls: 4, col: ivo(0.65) });
        fall(ctx, '160 LPS', 460, -35, t, A.lps160 - 0.1, DSP(200), { align: 'center', col: IVORY });
        strike(ctx, 210, 710, -45, 200, t, A.lps160 + 0.35, '#D94130');
        slab(ctx, 'TIDAK ADA ALIRAN KE KAWASAN SERVER', 460, 75, t, A.server2 - 0.1, { align: 'center', size: 22 });

        srcTag(ctx, 'Sumber: rri.co.id - Portal berita terpercaya, 7 Okt 2026', -840, 440, t, A.bp2);
      }
    },

    // S11 (92.09..101.60s): El Niño kemarau panjang -> Waduk Nongsa turun 4,5 meter (gelasWaduk!)
    { at: A.biang - 0.1, via: 'rise', tag: '-4,5 M',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 11) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        txt(ctx, 'PENJELASAN CUACA · BP BATAM', -820, -295, t, A.biang, MN(22), { ls: 4, col: ivo(0.75) });
        fall(ctx, 'EL NIÑO', -820, -100, t, A.elnino - 0.15, DSP(210), { ls: 4, col: IVORY });
        slab(ctx, 'MUSIM KEMARAU PANJANG · JARANG HUJAN', -820, -15, t, A.kemarau, { size: 22, lime: true });
        markLine(ctx, 'Permukaan Waduk Nongsa ', 'TURUN ±4,5 M', '', -820, 155, t, A.turun - 0.5, A.empat_setengah, SRF(48), { align: 'left', col: IVORY });

        // Right: Hero Waduk Nongsa gelasWaduk dropping sharply!
        const dropK = E.inOutCubic(inv(A.elnino + 1.0, A.empat_setengah + 0.35, t));
        const lv = lerp(0.84, 0.22, dropK);
        const dropM = lerp(0, 4.5, dropK);
        gelasWaduk(ctx, 470, -15, 1.24, t, A.biang + 0.2, {
          level: lv,
          critical: dropK > 0.35,
          label: 'WADUK NONGSA · LEVEL',
          val: `-${fmt(dropM, 1)} METER`,
        });

        srcTag(ctx, 'Sumber: rri.co.id - Portal berita terpercaya, 7 Okt 2026', -840, 440, t, A.biang + 0.2);
      }
    },

    // S12 (101.60..117.29s): Grafik produksi-air-nongsa-kemarau.png (90 -> 25 -> 0 LPS) + Batam Pos 20 Okt 2026 BERHENTI TOTAL
    { at: A.produksi - 0.15, via: 'push', tag: '0 LPS',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 12) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        if (IM.grafik) {
          evid(ctx, IM.grafik, -370, -25, 880, t, A.produksi - 0.05, {
            dark: true,
            tab: 'GRAFIK · PRODUKSI IPAM NONGSA (LPS)',
            rot: -0.6,
          });
        }

        // Right column: before Batam Pos arrives -> big animated 90 -> 25 -> 0 LPS live tracker; then Batam Pos on top-right + BERHENTI TOTAL on bottom-right!
        if (IM.batampos && t >= A.puncaknya - 0.2) {
          evid(ctx, IM.batampos, 470, -175, 720, t, A.puncaknya - 0.1, {
            crop: [0.0, 0.0, 0.675, 1.0],
            tab: 'BATAM POS · 21 OKT 2026',
            rot: 1.0,
            hl: [[0.036, 0.184, 0.860, 0.090, A.berhenti]],
          });
        } else {
          // Early half (101.6..108.1s): animated 90 -> 25 LPS bars
          const k90 = E.outQuint(inv(A.lps90 - 0.3, A.lps90 + 0.35, t));
          const k25 = E.outQuint(inv(A.lps25 - 0.3, A.lps25 + 0.35, t));
          txt(ctx, 'DEBIT AIR BERSIH NONGSA', 130, -250, t, A.produksi, MN(22), { ls: 4, col: ivo(0.75) });
          if (k90 > 0) {
            ctx.fillStyle = ivo(0.28); ctx.fillRect(130, -190, 560 * k90, 70);
            setFont(ctx, DSP(62), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'left';
            ctx.fillText('90 LPS  ·  NORMAL', 150, -135);
          }
          if (k25 > 0) {
            ctx.fillStyle = LIME; ctx.fillRect(130, -85, 175 * k25, 70);
            setFont(ctx, DSP(62), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'left';
            ctx.fillText('25 LPS  ·  OKT 2026', 325, -30);
          }
        }

        // Bottom-right climax: 20 OKT 2026 -> 0 LPS BERHENTI TOTAL
        if (t >= A.okt20 - 0.4) {
          slab(ctx, 'SELASA PAGI · 20 OKTOBER 2026', 130, 80, t, A.okt20 - 0.2, { size: 20 });
          const curLps = t >= A.berhenti ? 0 : Math.round(lerp(25, 0, E.inCubic(inv(A.pabrik, A.berhenti, t))));
          setFont(ctx, DSP(126), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'left';
          ctx.fillText(`${curLps} LPS`, 130, 224);
          if (t >= A.berhenti - 0.05) {
            const ks = E.snap(inv(A.berhenti - 0.05, A.berhenti + 0.25, t));
            setFont(ctx, DSP(66), 2);
            const bw = ctx.measureText('BERHENTI TOTAL').width + 36;
            ctx.fillStyle = LIME; ctx.fillRect(390, 134, bw * ks, 90);
            ctx.save(); ctx.beginPath(); ctx.rect(390, 134, bw * ks, 90); ctx.clip();
            ctx.fillStyle = INK_ON_LIME; ctx.fillText('BERHENTI TOTAL', 408, 202);
            ctx.restore();
          }
        }

        srcTag(ctx, 'Sumber: CNBC Indonesia, detikcom, rri.co.id (diolah)', -840, 412, t, A.produksi + 0.1);
        srcTag(ctx, 'Sumber: Batam Pos, 21 Okt 2026', -840, 446, t, A.puncaknya);
      }
    },

    // S13 (117.29..127.01s): Dasar bendungan retak + Pipa tambahan & pompa dari Waduk Duriangkang
    { at: A.airnya - 0.1, via: 'whip', tag: 'DARURAT',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 13) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        const phase2 = t >= A.rumah - 0.1;
        if (!phase2) {
          gelasWaduk(ctx, -560, -10, 1.05, t, A.airnya, {
            level: 0.05, critical: true, label: 'WADUK NONGSA', val: 'KRITIS',
          });
          slab(ctx, 'TIDAK BOLEH DIPAKSA DISEDOT', -320, -195, t, A.airnya + 0.15, { size: 19, lime: true });
          txt(ctx, 'Bisa bikin dasar', -320, -105, t, A.airnya + 0.4, SRF(52), { col: IVORY });
          markLine(ctx, 'bendungannya ', 'RETAK.', '', -320, 30, t, A.airnya + 0.7, A.retak - 0.2, DSP(114), { align: 'left', col: IVORY });

          // Architectural dam-floor structural fracture seam (dark fissure + matte ivory edge, zero neon!)
          const kc = E.outCubic(inv(A.retak - 0.4, A.retak + 0.35, t));
          if (kc > 0) {
            ctx.save();
            ctx.lineCap = 'round'; ctx.lineJoin = 'miter';
            ctx.strokeStyle = 'rgba(0,0,0,0.72)'; ctx.lineWidth = 7;
            ctx.beginPath();
            ctx.moveTo(-320, 132);
            ctx.lineTo(lerp(-320, -120, kc), 162);
            ctx.lineTo(lerp(-320, 60, kc), 117);
            ctx.lineTo(lerp(-320, 260, kc), 172);
            ctx.lineTo(lerp(-320, 480, kc), 135);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(241,239,230,0.78)'; ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(-320, 130);
            ctx.lineTo(lerp(-320, -120, kc), 160);
            ctx.lineTo(lerp(-320, 60, kc), 115);
            ctx.lineTo(lerp(-320, 260, kc), 170);
            ctx.lineTo(lerp(-320, 480, kc), 133);
            ctx.stroke();

            // Fine secondary branch hairline
            ctx.strokeStyle = 'rgba(241,239,230,0.34)'; ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(lerp(-320, 60, kc), 115);
            ctx.lineTo(lerp(-320, 135, kc), 92);
            ctx.moveTo(lerp(-320, -120, kc), 160);
            ctx.lineTo(lerp(-320, -68, kc), 192);
            ctx.stroke();
            ctx.restore();
          }
        } else {
          // Emergency pipeline transfer from Waduk Duriangkang -> Nongsa (Real 3D Dark Sentinel-2 Drone Map)
          drawChartFrame(ctx, -370, -10, 860, 680, 'JALUR DARURAT · DURIANGKANG → NONGSA', t, A.rumah - 0.1, false, () => {
            petaBatam(ctx, 0, 0, 1, t, A.rumah - 0.6, {
              w: 860, h: 680, noFrame: true, light: false,
              lon: 104.072, lat: 1.118, dist: 0.64,
              focus: 'duriangkang', reliefPipe: true, reliefAt: A.pipa2 - 0.35,
              hubs: false, cables: false, labels: true, showSG: false,
            });
          });

          txt(ctx, 'PASOKAN DIALIHKAN', 120, -210, t, A.rumah, MN(22), { ls: 4, col: ivo(0.75) });
          slab(ctx, 'PIPA TAMBAHAN & POMPA', 120, -135, t, A.pipa2 - 0.1, { size: 24, lime: true });
          fall(ctx, 'DURIANGKANG', 120, 62, t, A.duriangkang - 0.65, DSP(108), { ls: 3, drop: -42, col: IVORY });
          txt(ctx, 'Menopang aliran ke', 120, 145, t, A.duriangkang - 0.45, SRF(42), { col: ivo(0.85) });
          txt(ctx, 'rumah warga Nongsa.', 120, 197, t, A.duriangkang - 0.30, SRF(42), { col: ivo(0.85) });
        }
        srcTag(ctx, 'Sumber: Batam Pos, 21 Okt 2026', -840, 440, t, A.airnya + 0.2);
      }
    },

    // S14 (127.01..140.45s): Artinya buat kamu -> cadangan air mepet + Pemko Batam SWRO card + rebutan air (0.90s tail portal-safe)
    { at: A.artinya - 0.1, via: 'push', tag: 'MEPET',
      world(ctx, t, pr, foc, items, c) {
        if (c.i === 14) items.push({ z: 1e6, x: 0, d: 1e9, f: () => drawWorldBackdrop(ctx, t) });
      },
      draw(ctx, t) {
        txt(ctx, 'ARTINYA BUAT KAMU', -820, -315, t, A.artinya + 0.05, MN(24), { ls: 5, col: ivo(0.75) });
        const kPull = E.inOutCubic(inv(A.puluhan, A.rebutan + 0.3, t));
        const lv = lerp(0.22, 0.06, kPull);
        gelasWaduk(ctx, -670, -10, 0.96, t, A.artinya + 0.2, {
          level: lv, critical: true, label: 'CADANGAN AIR WARGA', val: t >= A.mepet ? 'MEPET' : 'TIPIS',
        });

        txt(ctx, 'Cadangan air warga Batam', -470, -230, t, A.cadangan - 0.15, SRF(46), { col: IVORY });
        markLine(ctx, 'memang ', 'SUDAH MEPET.', '', -470, -160, t, A.cadangan - 0.05, A.mepet - 0.1, SRF(50), { align: 'left', col: IVORY });

        if (IM.pemko) {
          evid(ctx, IM.pemko, 460, -205, 720, t, A.artinya + 1.6, {
            crop: [0.0, 0.07, 1.0, 0.54],
            tab: 'PEMKO BATAM · 28 SEP 2026',
            rot: 0.8,
            hl: [[0.025, 0.220, 0.550, 0.095, A.mepet + 0.1]],
          });
        }

        // Multiple data centers extending suction conduits toward the single low reservoir (matte editorial framing, zero neon outlines!)
        const kNodes = E.outQuint(inv(A.kalau, A.puluhan + 0.4, t));
        if (kNodes > 0) {
          ctx.save(); ctx.globalAlpha *= kNodes;
          // Clean neutral architectural manifold pipe from left reservoir (-575, 128) across to Data Center 04
          ctx.strokeStyle = 'rgba(241,239,230,0.34)'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(-575, 128); ctx.lineTo(516, 128); ctx.stroke();
          for (let i = 0; i < 4; i++) {
            const nx = -180 + i * 232, ny = 42;
            ctx.beginPath(); ctx.moveTo(nx, 128); ctx.lineTo(nx, ny + 42); ctx.stroke();
          }
          // Subtle matte ivory flow pulses moving left from data centers to reservoir
          for (let p = 0; p < 5; p++) {
            const pu = (t * 0.55 + p * 0.2) % 1;
            const px = lerp(516, -575, pu);
            ctx.fillStyle = 'rgba(241,239,230,0.72)';
            ctx.beginPath(); ctx.arc(px, 128, 3.2, 0, Math.PI * 2); ctx.fill();
          }

          const isHot = t >= A.rebutan;
          for (let i = 0; i < 4; i++) {
            const nx = -180 + i * 232, ny = 42;
            // Matte charcoal card + neutral hairline (ZERO lime outlines!)
            ctx.fillStyle = '#181714';
            ctx.strokeStyle = 'rgba(241,239,230,0.20)';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.roundRect(nx - 104, ny - 42, 208, 84, 10); ctx.fill(); ctx.stroke();

            // Solid matte index square on left of card (#C8F53C with dark #11120E ink when hot)
            ctx.fillStyle = isHot ? LIME : 'rgba(241,239,230,0.12)';
            ctx.fillRect(nx - 92, ny - 24, 42, 48);
            setFont(ctx, MN(16, 700), 1); ctx.fillStyle = isHot ? INK_ON_LIME : IVORY; ctx.textAlign = 'center';
            ctx.fillText(`0${i + 1}`, nx - 71, ny + 6);

            setFont(ctx, MN(15, 700), 1.2); ctx.fillStyle = IVORY; ctx.textAlign = 'left';
            ctx.fillText('DATA CENTER', nx - 38, ny + 6);
          }
          ctx.restore();
        }

        if (t >= A.rebutan - 0.35) {
          const kr = E.snap(inv(A.rebutan - 0.15, A.rebutan + 0.25, t));
          setFont(ctx, DSP(122), 3);
          const rw = ctx.measureText('REBUTAN AIR').width + 44;
          ctx.fillStyle = LIME;
          ctx.fillRect(-470, 178, rw * kr, 118);
          ctx.save();
          ctx.beginPath(); ctx.rect(-470, 178, rw * kr, 118); ctx.clip();
          ctx.fillStyle = INK_ON_LIME; ctx.textAlign = 'left';
          ctx.fillText('REBUTAN AIR', -448, 280);
          ctx.restore();
          txt(ctx, 'PASTI KEJADIAN.', -470, 355, t, A.kejadian - 0.2, SRF(56), { col: IVORY });
        }

        srcTag(ctx, 'Sumber: kelbukittempayan.batam.go.id, 28 September 2026', -840, 440, t, A.artinya + 1.6);
      }
    },
  ];

  // Put S8..S14 neatly spaced along z
  let FULLS;
  const ch = makeChapter({
    B, ST, load, gate: true, label: 'BAB 1 · KOTA TANPA SUNGAI',
    over: (o, t) => {
      kreditLatar(o, W, H, VID_BG, t, t < T_DARK);
      drawDarkWipeOver(o, t);
    },
    full: () => FULLS ??= [
      { im: IM.bpbatam, t0: A.menurut - 0.1, t1: A.delapan + 0.1, dir: 1,
        crop: [0.0, 0.20, 1.0, 0.72],
        tab: 'BP BATAM · INFRASTRUKTUR BATAM (8 NOV 2025)',
        hl: [
          [0.024, 0.195, 0.315, 0.080, A.bp + 0.1],
          [0.112, 0.794, 0.062, 0.042, A.bp + 0.9],
          [0.188, 0.794, 0.126, 0.042, A.bp + 1.7],
        ],
      },
      { im: IM.detik, t0: A.pada - 0.1, t1: A.park - 0.9, dir: -1,
        crop: [0.06, 0.11, 0.58, 0.88],
        tab: 'DETIKSUMUT · WARGA SAMBAU PROTES (5 OKT 2026)',
        hl: [
          [0.432, 0.604, 0.215, 0.025, A.okt5 + 0.2],
          [0.115, 0.420, 0.845, 0.052, A.warga300],
          [0.372, 0.484, 0.330, 0.042, A.sambau],
        ],
      },
    ],
  });

  const baseDraw = ch.draw;
  ch.draw = (ctx, t) => {
    updateTheme(t);
    baseDraw(ctx, t);
  };

  // Ensure exact sumberTeks srcTag remains crisply legible over evidFull backdrop too!
  const basePost = ch.post;
  ch.post = (o, t, f) => {
    updateTheme(t);
    basePost(o, t, f);
    const activeFulls = [
      [A.menurut - 0.1, A.delapan + 0.1, 'Sumber: BP Batam, 8 Nov 2025'],
      [A.pada - 0.1, A.park - 0.9, 'Sumber: detiksumut, 5 Okt 2026'],
    ];
    for (const [t0, t1, sTxt] of activeFulls) {
      if (t >= t0 + 0.15 && t <= t1 - 0.2) {
        o.save();
        o.setTransform(1, 0, 0, 1, 0, 0);
        srcTag(o, sTxt, 96, 1020, t, t0 + 0.15);
        o.restore();
      }
    }
  };

  return ch;
}
