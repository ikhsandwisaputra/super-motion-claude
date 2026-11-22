// Bab Peta · 3 Teka-Teki Besar — v2 (Ruang Gelap RNC #0B0C09, kiblat Video 1/2/3 — ZERO Batam clone!)
// 4 stasiun 3D bervariasi (lateral x, whip/rise/truck, yaw/pitch):
// S0: Papan Split-Flap "3 TEKA-TEKI" + 3 portal arsitektural di kedalaman
// S1: Teka-Teki 01 — Matriks 100 Titik (14% -> 78%) + letterNum('78%')
// S2: Teka-Teki 02 — 5 Pilar Raksasa (o1, Claude, Gemini, Llama, Grok) + stamp('TOMBOL MATI')
// S3: Teka-Teki 03 — 4 Tameng Hukum RI + markLine('PALU KEPUTUSAN')
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, fall, markLine, slab, txt, countTo,
} from './kit.js';
import { stamp, pop } from './draw.js';
import {
  drawAhpoLayered, dotMatrix100, letterNum, splitFlapWord, C_RED, C_AMBER, C_MATTE,
} from './fisika.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const A02 = {};

  async function load() {
    const base = '../assets/shared/ahpo/A02/';
    await Promise.all([
      loadImg(base + 'A02_03_MG_buku-scratchpad.png', 1600).then(x => A02.buku = x),
      loadImg(base + 'A02_05_FG_panel-kaca-pengawas.png', 1600).then(x => A02.kaca = x),
    ]);
  }

  const ST = [
    // S0 (0..A.pertama): Split-Flap 3 TEKA-TEKI + 3 monolith portal silhouettes in depth
    {
      at: 0, name: '3 Teka-Teki', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1580, 1420],
      draw(ctx, t) {
        txt(ctx, 'PETA INVESTIGASI', 0, -340, t, A.hari, MN(20), { align: 'center', ls: 6, col: LIME });
        splitFlapWord(ctx, '3 TEKA-TEKI', 0, -195, t, A.bedah, { cw: 78, ch: 112, gap: 10, lime: false });
        txt(ctx, 'di balik layar teknologi ini.', 0, -56, t, A.layar - 0.15, SRF(62), { align: 'center', col: ivo(0.9) });

        // 3 architectural depth index portals
        const items = [
          ['01', '14% → 78%', 'KEPURA-PURAAN', A.tiga],
          ['02', '5 RAKSASA', 'BOHONG & SABOTASE', A.tiga + 0.18],
          ['03', 'HUKUM RI', 'PALU KEPUTUSAN', A.tiga + 0.36],
        ];
        items.forEach(([num, head, sub, ts], i) => {
          const k = E.outQuint(inv(ts, ts + 0.45, t));
          if (k <= 0) return;
          const bx = (i - 1) * 510, by = 140 + (1 - k) * 90;
          ctx.save();
          ctx.globalAlpha = k;
          ctx.fillStyle = '#141611';
          ctx.fillRect(bx - 210, by - 95, 420, 210);
          ctx.fillStyle = i === 0 ? LIME : ivo(0.55);
          ctx.fillRect(bx - 210, by - 95, 420 * k, 6);
          setFont(ctx, MN(18, 700), 4); ctx.fillStyle = i === 0 ? LIME : ivo(0.6); ctx.textAlign = 'left';
          ctx.fillText(`TEKA-TEKI ${num}`, bx - 178, by - 44);
          setFont(ctx, DSP(74), 2); ctx.fillStyle = IVORY;
          ctx.fillText(head, bx - 178, by + 34);
          setFont(ctx, MN(16, 400), 3); ctx.fillStyle = ivo(0.7);
          ctx.fillText(sub, bx - 178, by + 84);
          ctx.restore();
        });
      },
    },

    // S1 (A.pertama..A.kedua): Teka-Teki 01 — Lonjakan 14% -> 78% (dotMatrix100 + letterNum)
    {
      at: A.pertama, via: 'whip', side: -1, name: '01 · 14% ke 78%', tag: '01',
      x: -1300, z: 2500, py: -560, yaw: [-6, 3], pitch: [7, 5], dist: [1520, 1390],
      draw(ctx, t, c) {
        // Subtle Ahpo A02 silhouette floating on right background for visual continuity
        if (A02.buku) {
          drawAhpoLayered(ctx, [
            { im: A02.buku, par: 0.72, a: 0.24 },
            { im: A02.kaca, par: 1.05, a: 0.22 },
          ], 460, 40, 0.36, c.yaw * 10, 0, E.outCubic(inv(A.pertama, A.pertama + 0.5, t)));
        }
        txt(ctx, 'TEKA-TEKI 01', -810, -340, t, A.pertama, MN(22), { ls: 6, col: LIME });
        fall(ctx, 'KENAPA ANGKANYA', -810, -210, t, A.pertama + 0.1, DSP(108), { ls: 2 });
        markLine(ctx, 'MELONJAK ', 'DRASTIS', '?', -810, -95, t, A.melonjak - 0.2, A.melonjak, DSP(108), { align: 'left', ls: 2 });

        // Live 10x10 dot matrix surging from 14 -> 78 right on the narrator's words!
        const nDots = t < A.tujuhDelapan - 0.1
          ? countTo(0, 14, t, A.empatBelas - 0.1, 0.65)
          : countTo(14, 78, t, A.tujuhDelapan - 0.08, 0.75);
        dotMatrix100(ctx, -460, 175, 360, 320, nDots, t, A.pertama + 0.25, { r: 12, colActive: t >= A.tujuhDelapan - 0.08 ? LIME : C_RED });

        // Giant textured number transitioning 14% -> 78%
        if (t < A.tujuhDelapan - 0.06) {
          letterNum(ctx, '14%', 340, 130, 340, t, A.empatBelas - 0.15, { stroke: C_RED });
          txt(ctx, 'UJIAN AWAL', 340, 310, t, A.empatBelas, MN(22), { align: 'center', ls: 5, col: ivo(0.75) });
        } else {
          letterNum(ctx, '78%', 340, 130, 370, t, A.tujuhDelapan - 0.06, { stroke: LIME });
          slab(ctx, 'SETELAH PELATIHAN PAKSA', 340, 325, t, A.tujuhDelapan + 0.1, { align: 'center', lime: true, size: 22 });
        }
      },
    },

    // S2 (A.kedua..A.ketiga): Teka-Teki 02 — 5 Program Raksasa + Interogasi + Tombol Mati
    {
      at: A.kedua, via: 'rise', side: 1, name: '02 · 5 Raksasa', tag: '02',
      x: 1350, z: 5000, py: -580, yaw: [6, -3], pitch: [5, 7], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'TEKA-TEKI 02', -810, -340, t, A.kedua, MN(22), { ls: 6, col: LIME });
        fall(ctx, 'LIMA PROGRAM RAKSASA', -810, -210, t, A.lima - 0.15, DSP(114), { ls: 2 });
        txt(ctx, 'ikut berbohong saat diinterogasi.', -810, -118, t, A.berbohong - 0.1, SRF(56), { col: ivo(0.88) });

        // 5 giant bouncing architectural pillars dropping on spring physics
        const mods = [
          ['o1', 'OpenAI', 310, C_RED],
          ['CLAUDE 3.5', 'Anthropic', 265, LIME],
          ['GEMINI 1.5', 'Google', 240, IVORY],
          ['LLAMA 3.1', 'Meta', 220, IVORY],
          ['GROK 4', 'xAI', 250, C_AMBER],
        ];
        mods.forEach(([nm, org, bh, col], i) => {
          const ts = A.lima + i * 0.14;
          const k = pop(t, ts, 0.56, 0.34);
          if (k <= 0) return;
          const x = -650 + i * 325, yBot = 335;
          const hCur = bh * Math.min(1.12, k);
          ctx.save();
          ctx.globalAlpha = clamp((t - ts) / 0.1);
          ctx.fillStyle = '#151812';
          ctx.fillRect(x - 125, yBot - hCur, 250, hCur);
          ctx.fillStyle = col;
          ctx.fillRect(x - 125, yBot - hCur, 250, 8);
          setFont(ctx, DSP(48), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText(nm, x, yBot - hCur + 68);
          setFont(ctx, MN(16, 400), 2); ctx.fillStyle = ivo(0.62);
          ctx.fillText(org, x, yBot - hCur + 104);
          ctx.restore();
        });

        // Heavy stamp slamming across on "mematikan tombol matinya"
        stamp(ctx, 'MATIKAN TOMBOL MATI', 0, 120, t, A.tombol - 0.08, { size: 132, rot: -3.5 });
      },
    },

    // S3 (A.ketiga..DUR): Teka-Teki 03 — Cara Kerjanya & Aturan Indonesia Melarang Mesin Memegang Palu
    {
      at: A.ketiga, via: 'truck', side: -1, name: '03 · Aturan RI', tag: '03',
      x: -250, z: 7500, py: -560, yaw: [-4, 3], pitch: [6, 5], dist: [1540, 1400],
      draw(ctx, t) {
        txt(ctx, 'TEKA-TEKI 03', -810, -340, t, A.ketiga, MN(22), { ls: 6, col: LIME });
        txt(ctx, 'bagaimana cara kerjanya, dan kenapa...', -810, -245, t, A.cara - 0.1, SRF(56), { col: ivo(0.86) });
        markLine(ctx, 'ATURAN ', 'INDONESIA', ' MELARANG', -810, -100, t, A.indonesia - 0.2, A.melarang, DSP(114), { align: 'left', ls: 2 });

        // 4 clean dark architectural legal shield pillars lighting up sequentially
        const laws = ['SE 9/2023', 'UU 27 PDP', 'OJK 2025', 'PERPRES AI'];
        laws.forEach((lw, i) => {
          const ts = A.indonesia + i * 0.22;
          const k = E.outQuint(inv(ts, ts + 0.35, t));
          if (k <= 0) return;
          const x = -600 + i * 400, y = 135;
          ctx.save();
          ctx.globalAlpha = k;
          ctx.translate(x, y + (1 - k) * 45);
          // Shield silhouette (architectural pentagon)
          ctx.fillStyle = '#151812';
          ctx.beginPath();
          ctx.moveTo(-145, -80); ctx.lineTo(145, -80); ctx.lineTo(145, 25); ctx.lineTo(0, 100); ctx.lineTo(-145, 25);
          ctx.closePath(); ctx.fill();
          ctx.fillStyle = i === 3 ? LIME : C_AMBER;
          ctx.fillRect(-145, -80, 290, 7);
          setFont(ctx, MN(15, 700), 3); ctx.fillStyle = ivo(0.55); ctx.textAlign = 'center';
          ctx.fillText(`TAMENG 0${i + 1}`, 0, -32);
          setFont(ctx, DSP(46), 1); ctx.fillStyle = IVORY;
          ctx.fillText(lw, 0, 28);
          ctx.restore();
        });

        // Bold final punch on "palu keputusan"
        if (t >= A.palu - 0.12) {
          slab(ctx, 'MESIN DILARANG MEMEGANG PALU KEPUTUSAN', 0, 330, t, A.palu - 0.12, { align: 'center', lime: true, size: 24 });
        }
      },
    },
  ];

  return makeChapter({ B, ST, load, label: 'PETA INVESTIGASI', gate: true });
}
