// Bab Peta · 4 Teka-Teki Pasar Gelap Data RI (V2 Zero-Slop Documentary: Peta Jalur + Kinetic Bento + D01 + Value Flip)
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, loadVid, fall, markLine, slab, txt,
} from './kit.js';
import { splitFlapWord, C_RED } from './fisika.js';
import { layarFoto, kreditLatar } from './lab.js';
import { loadD, D01_FILES, drawD01Card, heroStat, editorialRow } from './vault.js';
import { jalur } from './pustaka/data.js';
import { pusatData } from './pustaka/prop.js';
import { kineticBento, valueFlip } from './pustaka/season2.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {};
  let D01 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadD('D01', D01_FILES, 1600).then(x => D01 = x),
      loadImg(sh + 'cc/commons-indonesian-identity-card.jpg', 1280).then(x => IM.ktp = x),
      loadImg(sh + 'stok-situs/pexels-a-blue-sim-card-on-a-dark-33092906.jpg', 1200).then(x => IM.sim = x),
      loadImg(sh + 'stok-situs/pixabay-modern-server-racks-in-a-clean-7388620.jpg', 1200).then(x => IM.racks = x),
      loadVid(sh + 'vid/', 'code_flow').then(x => IM.code = x),
    ]);
  }

  function vidFrame(V, t) {
    if (!V || !V.img || !V.img.length) return null;
    const n = V.n, per = Math.max(1, 2 * (n - 1)), m = Math.floor(Math.max(0, t) * V.fps) % per;
    return V.img[m < n ? m : per - m];
  }
  function drawFit(ctx, im, x, y, w, h, zoom = 1.04) {
    if (!im) return;
    const s = Math.max(w / im.width, h / im.height) * zoom;
    const dw = im.width * s, dh = im.height * s;
    ctx.drawImage(im, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  }

  const BG = [
    { t0: 0, t1: A.pertama, vid: 'code', dim: 0.76, grade: 'saturate(0.32) contrast(1.18)' },
    { t0: A.pertama, t1: A.ketiga, im: 'ktp', dim: 0.80, grade: 'saturate(0.38) contrast(1.15)',
      cap: 'KARTU TANDA PENDUDUK RI', kredit: 'Foto: SYAMSURIAL via Wikimedia Commons · Domain Publik' },
  ];

  const ROAD = ['01 HARGA', '02 BOCOR', '03 JEBOL', '04 POLISI DATA'];

  const ST = [
    // S0 (0..A.pertama): Frame 1 langsung penuh — Hero Rp0,49 vs Parkir Rp2.000 + D01 KTP + Split-Flap 4 TEKA-TEKI!
    {
      at: 0, name: 'Rp0,49 vs Parkir', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1410],
      draw(ctx, t, c) {
        drawD01Card(ctx, D01, 495, 38, 0.37, t, {
          camX: c.yaw * 10, tTag: 0.15, tKarcis: A.parkir - 0.1, price: 'Rp0,49',
          a: E.outCubic(inv(0, 0.35, t)),
        });
        heroStat(ctx, 'Rp0,49', 'PETA INVESTIGASI · HARGA SATU KTP DI DARK WEB',
          'kalah jauh dibanding tarif sekali parkir motor di pinggir jalan.', -810, -78, t, 0, {
            size: 215, col: LIME, maxW: 700,
          });
        slab(ctx, 'PARKIR MOTOR Rp2.000  =  4.081 DATA WARGA', -810, 148, t, A.parkir - 0.1, { lime: true, size: 21 });
        if (t >= A.hari - 0.2) {
          splitFlapWord(ctx, '4 TEKA-TEKI', -495, 290, t, A.hari - 0.15, { cw: 50, ch: 74, gap: 6 });
        }
      },
    },
    // S1 (A.pertama..A.ketiga): Peta Jalur + Editorial Swiss Rows + Kinetic Bento Live Media (NOL AI-SLOP CARDS!)
    {
      at: A.pertama, via: 'whip', side: -1, name: '01 & 02 · Harga & Peta', tag: '01-02',
      x: -1350, z: 2500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        const nodeIdx = t >= A.kedua ? 1 : 0;
        jalur(ctx, 0, -330, ROAD, nodeIdx, t, A.pertama - 0.1, { w: 1460, from: 0 });
        editorialRow(ctx, '01', 'SEMURAH APA?', 'Rp0,49 sampai Rp33,6 per identitas warga', -810, -100, 740, t, A.pertama, {
          accent: LIME, size: 84, subSize: 34,
        });
        editorialRow(ctx, '02', 'BOCOR KE MANA SAJA?', 'dari 1,3 miliar SIM sampai rekor ASEAN 2026', -810, 150, 740, t, A.kedua, {
          accent: IVORY, size: 78, subSize: 33,
        });
        kineticBento(ctx, 410, 60, 780, 480, [
          {
            title: 'ARUS DATA DARK WEB',
            draw(g, rx, ry, rw, rh) {
              const f = vidFrame(IM.code, t);
              if (f) drawFit(g, f, rx, ry, rw, rh, 1.08);
              g.fillStyle = 'rgba(11,12,9,0.28)'; g.fillRect(rx, ry, rw, rh);
              setFont(g, DSP(54), 2); g.fillStyle = LIME; g.textAlign = 'left';
              g.fillText('Rp0,49 – Rp33,6', rx + 22, ry + rh - 24);
            },
          },
          {
            title: '1,3 MILIAR SIM',
            draw(g, rx, ry, rw, rh) {
              drawFit(g, IM.sim, rx, ry, rw, rh, 1.06 + 0.04 * Math.sin(t));
              g.fillStyle = 'rgba(11,12,9,0.22)'; g.fillRect(rx, ry, rw, rh);
            },
          },
          {
            title: 'REKOR ASEAN 2026',
            draw(g, rx, ry, rw, rh) {
              drawFit(g, IM.racks, rx, ry, rw, rh, 1.06);
              g.fillStyle = 'rgba(11,12,9,0.34)'; g.fillRect(rx, ry, rw, rh);
              setFont(g, MN(18, 700), 2); g.fillStyle = LIME; g.textAlign = 'left';
              g.fillText('#1 ASIA TENGGARA', rx + 18, ry + rh - 20);
            },
          },
        ], t, A.pertama, { expandAt: A.kedua, split0: 0.56, split1: 0.44, accent: LIME });
      },
    },
    // S2 (A.ketiga..A.keempat): Teka-Teki 03 — Editorial Typographic Columns + Animated Data Centre Prop (NOL BOX!)
    {
      at: A.ketiga, via: 'rise', side: 1, name: '03 · Kenapa Jebol?', tag: '03',
      x: 1350, z: 5000, py: -560, yaw: [5, -3], pitch: [5, 7], dist: [1520, 1400],
      draw(ctx, t) {
        jalur(ctx, 0, -330, ROAD, 2, t, A.ketiga - 0.1, { w: 1460, from: 1 });
        fall(ctx, 'KENAPA GUDANG DIGITAL', -810, -165, t, A.ketiga, DSP(108), { ls: 2 });
        markLine(ctx, 'KITA ', 'JEBOL TERUS', '?', -810, -52, t, A.ketiga + 0.18, A.ketiga + 0.42, DSP(108), { align: 'left', ls: 2 });

        editorialRow(ctx, '01', 'PLAINTEXT TELANJANG', 'data warga disimpan tanpa enkripsi', -810, 82, 860, t, A.ketiga + 0.25, {
          accent: LIME, size: 58, subSize: 28,
        });
        editorialRow(ctx, '02', 'KUNCI ROLE ADMIN', 'masuk pintu depan lewat phishing', -810, 208, 860, t, A.ketiga + 0.55, {
          accent: IVORY, size: 58, subSize: 28,
        });
        editorialRow(ctx, '03', 'BACKUP PDNS CUMA 2%', '98% data lumpuh tanpa salinan', -810, 334, 860, t, A.ketiga + 0.85, {
          accent: C_RED, size: 58, subSize: 28,
        });

        pusatData(ctx, 480, 310, 390, t, A.ketiga + 0.1, { style: 'gedung' });
        slab(ctx, 'PUSAT DATA NASIONAL', 480, 355, t, A.ketiga + 0.4, { align: 'center', size: 18 });
      },
    },
    // S3 (A.keempat..DUR): Teka-Teki 04 — Season 2 Value Flip (bahasa ruang tamu jelas: POLISI DATA / LEMBAGA PDP)
    {
      at: A.keempat, via: 'truck', side: -1, name: '04 · Polisi Data', tag: '04',
      x: -200, z: 7500, py: -560, yaw: [-4, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        valueFlip(ctx, ['AKHIR 2026', 'BELUM ADA POLISI DATA?', 'LEMBAGA PDP KOSONG!'], 0, 10, t, A.keempat, {
          w: 1580, h: 760, size: 144,
          pill: ['TEKA-TEKI 04', 'UU PDP SUDAH KETOK PALU', 'KITA BEDAH DENGAN DATA'],
          flips: [0, Math.max(0.85, A.t2026b - A.keempat), Math.max(2.1, A.yuk - A.keempat)],
          sub: ['siapa yang mengawasi & menjatuhkan denda?', 'empat tahun sejak UU PDP disahkan', 'empat teka-teki dibahas dengan bahasa ruang tamu'],
        });
      },
    },
  ];

  const under = (ctx, t, pre) => {
    if (pre) return;
    layarFoto(ctx, W, H, BG, t, { IM, dim: 0.76 });
  };

  return makeChapter({
    B, ST, load, label: 'PETA', gate: 0.75,
    over: (ctx, t) => kreditLatar(ctx, W, H, BG, t, false),
    under,
  });
}
