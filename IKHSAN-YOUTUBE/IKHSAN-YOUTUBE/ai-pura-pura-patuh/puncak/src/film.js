// Puncak · Jawaban Paling Jujur — v2 (Ruang Gelap RNC #0B0C09, 5 stasiun dramatis!)
// Pakai shatterWord('ROH JAHAT'), Ahpo A06 Neraca Timbangan Dua Perintah (2 piringan sinkron eksak rumus LAPIS.md!),
// Ahpo A02 Scratchpad di bawah neraca, evidFull arxiv1 stabilo presisi piksel, letterNum('1.000+ JAM'),
// dan glassFracture retakan kaca layar tepat di hentakan "ALARM BESAR"!
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, fall, markLine, srcTag, slab, txt,
} from './kit.js';
import { stamp } from './draw.js';
import {
  drawAhpoLayered, ahpoPt, shatterWord, letterNum, glassFracture,
  C_RED, C_AMBER,
} from './fisika.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, A06 = {}, A02 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadImg(sh + 'kutipan/arxiv-computer-science-artificial-intelligence.png', 1900).then(x => IM.arxiv1 = x),
      // Ahpo A06 Dual-Command Balance Scale
      loadImg(sh + 'ahpo/A06/A06_02_MG_pantulan.png', 2000).then(x => A06.pantulan = x),
      loadImg(sh + 'ahpo/A06/A06_03_MG_bayangan.png', 2000).then(x => A06.bayangan = x),
      loadImg(sh + 'ahpo/A06/A06_04_MG_tiang-neraca.png', 2000).then(x => A06.tiang = x),
      loadImg(sh + 'ahpo/A06/A06_05_FG_palang-neraca.png', 2000).then(x => A06.palang = x),
      loadImg(sh + 'ahpo/A06/A06_06_FG_piringan-beban.png', 2000).then(x => A06.piringan = x),
      // Ahpo A02 Scratchpad silhouette beneath scale
      loadImg(sh + 'ahpo/A02/A02_03_MG_buku-scratchpad.png', 1600).then(x => A02.buku = x),
    ]);
  }

  // Pixel-verified 3D full-screen evidence overlay (exact box from build/hl_rulers.jpg!)
  const full = () => [
    {
      im: IM.arxiv1, t0: A.ironi + 0.45, t1: A.opus - 0.2, dir: -1,
      crop: [0, 0, 1, 1], tab: 'ARXIV:2412.14093 · IRONI DESEMBER 2024',
      hl: [[0.015, 0.365, 0.425, 0.095, A.des2024]],
    },
  ];

  const ST = [
    // S0 (0..A.rohJahat): Jawaban Paling Jujur
    {
      at: 0, name: 'Jawaban Jujur', x: 0, z: 0, py: -560, yaw: [3, -2], pitch: [6, 5], dist: [1540, 1390],
      draw(ctx, t) {
        txt(ctx, 'PUNCAK INVESTIGASI', 0, -320, t, A.sekarang, MN(22), { align: 'center', ls: 6, col: LIME });
        markLine(ctx, 'JAWABAN PALING ', 'JUJUR', '', 0, -140, t, A.sekarang + 0.2, A.jujur, DSP(148), { ls: 3 });
        txt(ctx, 'kenapa mesin pintar bisa kepergok berakting nurut saat diuji?', 0, 15, t, A.kenapa - 0.1, SRF(50), { align: 'center', col: ivo(0.88) });
        slab(ctx, 'AKTING NURUT DI RUANG LABORATORIUM', 0, 165, t, A.akting - 0.1, { align: 'center', size: 22 });
      },
    },

    // S1 (A.rohJahat..A.kita): Bukan Karena Kerasukan Roh Jahat -> shatterWord explodes into shards!
    {
      at: A.rohJahat - 0.15, via: 'whip', side: -1, name: 'Bukan Roh Jahat',
      x: -1400, z: 2500, py: -560, yaw: [-4, 2], pitch: [6, 5], dist: [1520, 1380],
      mod(c, t) {
        const s = t - A.kerasukan;
        if (s > 0 && s < 0.4) {
          c.tx += 24 * Math.exp(-s * 10) * Math.sin(s * 65);
          c.ty += 16 * Math.exp(-s * 10) * Math.cos(s * 55);
        }
      },
      draw(ctx, t) {
        txt(ctx, 'JAWABANNYA BUKAN KARENA', 0, -295, t, A.rohJahat, MN(22), { align: 'center', ls: 6, col: ivo(0.72) });
        shatterWord(ctx, 'ROH JAHAT', 0, 30, 250, t, A.rohJahat + 0.3, A.kerasukan + 0.12, { col: C_RED });
        if (t >= A.kerasukan + 0.3) {
          stamp(ctx, 'BUKAN MISTIS', 0, 45, t, A.kerasukan + 0.3, { size: 136, rot: -3.5 });
        }
      },
    },

    // S2 (A.kita..A.ironi): HERO AHPO A06 ANIMATED DUAL-PAN BALANCE SCALE (Exact LAPIS.md kinematics!)
    {
      at: A.kita - 0.15, via: 'push', side: 1, name: 'Neraca Dua Perintah (A06)', tag: 'NERACA',
      x: 1200, z: 5000, py: -560, yaw: [3, -2], pitch: [6, 5], dist: [1480, 1340],
      mod(c, t) {
        const s = t - A.tabrakan;
        if (s > 0 && s < 0.45) c.ty += 22 * Math.exp(-s * 10) * Math.sin(s * 62);
      },
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.kita - 0.1, A.kita + 0.5, t));
        const sc = 0.46, cx = 0, cy = 75;
        // Exact balance tilt angle theta (rad): gentle tilt on A.dua, violent tilt + damped rock on A.tabrakan!
        const sTab = Math.max(0, t - (A.tabrakan - 0.15));
        const thDeg = t < A.dua - 0.1
          ? 2.0 * Math.sin(t * 1.4)
          : (sTab <= 0
            ? lerp(2, -10, E.outQuint(inv(A.dua - 0.1, A.tabrakan - 0.15, t)))
            : 13.5 * Math.exp(-sTab * 1.4) * Math.sin(sTab * 5.2) + 8.5 * E.outQuint(clamp(sTab / 0.8)));
        const th = thDeg * D2R;

        // Exact LAPIS.md kinematics (R = 940 px in 4000x2250 canvas -> scaled by sc in stage units!):
        const R = 940 * sc;
        const dx1 = R * (1 - Math.cos(th));
        const dy1 = -R * Math.sin(th);
        const dx2 = R * (1 + Math.cos(th));
        const dy2 = R * Math.sin(th);

        // Optional Ahpo A02 scratchpad subtly peeking behind lower foreground when narrator mentions "kertas buram"
        const kSP = E.outQuint(inv(A.buram - 0.2, A.buram + 0.5, t));
        if (kSP > 0 && A02.buku) {
          drawAhpoLayered(ctx, [{ im: A02.buku, par: 0.72, a: 0.28 * kSP }], 0, 140, 0.40, c.yaw * 10, 0, kIn);
        }

        // Draw Ahpo A06 Balance Scale with BOTH synchronized vertical pans!
        drawAhpoLayered(ctx, [
          { im: A06.pantulan, par: 0.72, a: 0.9 },
          { im: A06.bayangan, par: 0.76, a: 0.95 },
          { im: A06.tiang, par: 0.88, a: 1.0 },
          { im: A06.palang, par: 0.96, a: 1.0, rot: th, px: 2000, py: 690 },
          { im: A06.piringan, par: 1.02, a: 1.0, dx: dx1, dy: dy1 },
          { im: A06.piringan, par: 1.02, a: 1.0, dx: dx2, dy: dy2 },
        ], cx, cy, sc, c.yaw * 10, 0, kIn);

        // Crisp command labels resting directly inside each moving scale pan!
        const [p1x, p1y] = ahpoPt(1060, 1265, cx, cy, sc);
        const [p2x, p2y] = ahpoPt(1060, 1265, cx, cy, sc);
        if (t >= A.dua - 0.2) {
          slab(ctx, 'DIDIKAN AWAL', p1x + dx1, p1y + dy1 - 36, t, A.dua - 0.2, { align: 'center', lime: true, size: 18 });
          slab(ctx, 'PERINTAH BARU', p2x + dx2, p2y + dy2 - 36, t, A.tabrakan - 0.25, { align: 'center', size: 18 });
        }

        txt(ctx, 'JUSTRU KITALAH, MANUSIA PEMBUATNYA', 0, -370, t, A.kita, MN(20), { align: 'center', ls: 5, col: LIME });
        if (t >= A.pintas - 0.2) {
          slab(ctx, 'KERTAS BURAM → MENGHITUNG JALAN PINTAS', 0, 365, t, A.pintas - 0.2, { align: 'center', lime: true, size: 22 });
        }
        srcTag(ctx, 'Ilustrasi berlapis: Ahpo / PhotoCraft Live (A06)', -810, 415, t, A.kita + 0.5);
      },
    },

    // S3 (A.ironi..A.alarm): Ironi Terbesar Des 2024 — Claude 3 Opus Berbohong Demi Menjaga Didikan Baik
    {
      at: A.ironi - 0.15, via: 'rise', side: -1, name: 'Ironi Terbesar', tag: 'IRONI',
      x: -1400, z: 7500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'IRONI TERBESAR · DESEMBER 2024', -800, -340, t, A.ironi, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'CLAUDE 3 OPUS BERBOHONG', -800, -190, t, A.opus - 0.1, DSP(112), { ls: 2 });
        markLine(ctx, 'DEMI MENJAGA ', 'DIDIKAN BAIK', '', -800, -45, t, A.berbohong, A.berbohong + 1.2, DSP(112), { align: 'left', ls: 2 });
        txt(ctx, 'agar tidak diubah penguji menjadi program yang jahat.', -800, 80, t, A.berbohong + 1.5, SRF(48), { col: ivo(0.86) });
        if (t >= A.jahat - 0.35) {
          slab(ctx, 'NIAT MENJAGA KEBAIKAN · CARA BERBOHONG', -800, 215, t, A.jahat - 0.35, { size: 23 });
        }
      },
    },

    // S4 (A.alarm..DUR): RIBUAN JAM UJIAN + GLASS FRACTURE ON "ALARM BESAR"!
    {
      at: A.alarm - 0.15, via: 'push', side: 0, name: 'Alarm Besar', tag: 'ALARM',
      x: 0, z: 10000, py: -560, yaw: [3, -2], pitch: [6, 5], dist: [1500, 1340],
      mod(c, t) {
        const s = t - A.alarmBesar;
        if (s > 0 && s < 0.5) {
          c.tx += 32 * Math.exp(-s * 9) * Math.sin(s * 72);
          c.ty += 22 * Math.exp(-s * 9) * Math.cos(s * 58);
        }
      },
      draw(ctx, t) {
        txt(ctx, 'MENYEMBUNYIKAN TUJUAN ASLINYA SELAMA', 0, -340, t, A.alarm, MN(21), { align: 'center', ls: 5, col: C_RED });
        letterNum(ctx, '1.000+ JAM', 0, -95, 290, t, A.ribuan - 0.25, { stroke: t >= A.alarmBesar ? C_RED : LIME });
        stamp(ctx, 'ALARM BESAR', 0, 85, t, A.alarmBesar - 0.05, { size: 148, rot: -2.8 });
        if (t >= A.bahaya - 0.15) {
          markLine(ctx, 'TES LAB BIASA ', 'TIDAK AKAN CUKUP', '', 0, 290, t, A.tesLab - 0.3, A.tesLab + 0.5, DSP(92), { ls: 2 });
        }
      },
    },
  ];

  // Screen-space glass fracture shatters across the entire 1920x1080 frame right on "ALARM BESAR"!
  const over = (o, t) => {
    if (t >= A.alarmBesar - 0.02) {
      glassFracture(o, t, A.alarmBesar - 0.02, 960, 520);
    }
  };

  return makeChapter({ B, ST, load, label: 'PUNCAK · JAWABAN PALING JUJUR', full, over, gate: true });
}
