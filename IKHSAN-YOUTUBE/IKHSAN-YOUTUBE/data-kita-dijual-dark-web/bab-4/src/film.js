// Bab 4 · Separah Apa Pemerintah Menanganinya? (V2 Zero-Slop: WordRain Pingpong, 282-Cell Outage Grid, D04 Unlock + Kalender Sobek, 3 Metafora Fisik UU PDP Tanpa Card, Kursi Polisi Data Kosong!)
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, fall, slab, txt, srcTag, evid, theme, rnd,
} from './kit.js';
import { stamp } from './draw.js';
import { C_RED } from './fisika.js';
import { layarFoto, kreditLatar } from './lab.js';
import {
  loadD, D04_FILES, D05_FILES, drawD04Vault, drawD05Chair,
  hlCues, wrapTxt, heroStat,
} from './vault.js';
import { gelembungChat } from './pustaka/ui.js';
import { jam, kalender } from './pustaka/prop.js';
import { wordRain, screenCrack } from './pustaka/efek.js';

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};
  let D04 = {}, D05 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadD('D04', D04_FILES, 1600).then(x => D04 = x),
      loadD('D05', D05_FILES, 1600).then(x => D05 = x),
      loadImg(sh + 'kutipan/cnbcindonesia-1-3-miliar-data-kartu-sim-ri-diduga.png', 1600).then(x => IM.cnbcSim = x),
      loadImg(sh + 'kutipan/komdigi-kementerian-komunikasi-dan-digital.png', 1600).then(x => IM.komdigi = x),
      loadImg(sh + 'stok-situs/pixabay-modern-server-racks-in-a-clean-7388620.jpg', 1400).then(x => IM.racks = x),
      loadImg(sh + 'kutipan/cnnindonesia-update-kasus-pdns-2-brain-cipher-minta.png', 1600).then(x => IM.cnnGratis = x),
      loadImg(sh + 'kutipan/peraturan-undang-undang-uu-nomor-27-tahun-2022.png', 1600).then(x => IM.uupdp = x),
      loadImg(sh + 'kutipan/fwp-peraturan-pelaksana-uu-pdp-terbit.png', 1600).then(x => IM.fwp = x),
      loadImg(sh + 'kutipan/cnbcindonesia-lembaga-perlindungan-data-belum-ada.png', 1600).then(x => IM.cnbcPdp = x),
      loadImg(sh + 'kutipan/elsam-otoritas-pdp-belum-terbentuk-siapa-awasi.png', 1600).then(x => IM.elsam = x),
    ]);
  }

  // 100% pixel-verified HL_MAP stabilo (termasuk komdigi & uupdp dark: true!)
  const full = () => [
    { im: IM.cnbcSim, t0: A.sim + 0.25, t1: A.pingpong - 0.15, dir: 1, crop: [0, 0, 1, 1],
      tab: 'CNBC INDONESIA · 2 SEP 2022', ...hlCues('cnbcSim', A.sim + 1.4, 0.38) },
    { im: IM.komdigi, t0: A.panik + 0.6, t1: A.tebusan + 1.8, dir: -1, crop: [0, 0, 1, 1],
      tab: 'SIARAN PERS KOMDIGI · 282 TENANT', ...hlCues('komdigi', A.instansi282, 0.38) },
    { im: IM.cnnGratis, t0: A.gratis + 0.8, t1: A.semuel - 0.1, dir: 1, crop: [0, 0, 1, 1],
      tab: 'CNN INDONESIA · 7 JUL 2024', ...hlCues('cnnGratis', A.gratis + 1.8, 0.38) },
    { im: IM.uupdp, t0: A.uupdp + 0.4, t1: A.pasal46 - 0.25, dir: -1, crop: [0, 0, 1, 1],
      tab: 'JDIH BPK RI · UU NO. 27 TAHUN 2022', ...hlCues('uupdp', A.uupdp + 1.6, 0.38) },
    { im: IM.cnbcPdp, t0: A.ironis + 0.6, t1: A.kosong - 0.15, dir: 1, crop: [0, 0, 1, 1],
      tab: 'CNBC INDONESIA · 16 SEP 2026', ...hlCues('cnbcPdp', A.ironis + 1.8, 0.40) },
  ];

  const BG = [
    { t0: A.gagal, t1: A.iba, im: 'racks', dim: 0.70, grade: 'saturate(0.42) contrast(1.18)' },
  ];

  const ST = [
    // S0 (0..A.pingpong): Budaya Saling Bantah (Frame 1 langsung penuh!)
    {
      at: 0, name: 'Saling Bantah', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1410],
      draw(ctx, t) {
        txt(ctx, 'BAB 04 · SEPARAH APA PEMERINTAH MENANGANINYA?', -810, -350, t, 0, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'AKSI SALING BANTAH', -810, -200, t, 0.12, DSP(124), { ls: 2 });
        wrapTxt(ctx, 'Setiap kali jutaan data bocor, jawaban resmi yang keluar nyaris selalu seragam.', -810, -80, 760, 52, SRF(44), t, 0.4, {
          col: ivo(0.9),
        });
        if (IM.cnbcSim) {
          evid(ctx, IM.cnbcSim, 445, 35, 720, t, 0.25, {
            tab: 'CNBC INDONESIA · 2 SEP 2022', rot: 1.8,
            ...hlCues('cnbcSim', 1.6, 0.38),
          });
        }
        srcTag(ctx, 'Sumber: CNBC Indonesia (2 Sep 2022) · Naval CSIRT TNI AL', -810, 355, t, 0.4);
      },
    },
    // S1 (A.pingpong..A.panik): Pingpong Tanggung Jawab + WordRain Bantahan + Gelembung Chat!
    {
      at: A.pingpong, via: 'whip', side: -1, name: 'Pingpong Tanggung Jawab', tag: 'PINGPONG',
      x: -1350, z: 2500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        ctx.save(); ctx.globalAlpha = 0.14;
        wordRain(ctx, 0, 20, 1650, 720, t, A.pingpong, {
          n: 64, kata: ['BUKAN KAMI', 'OPERATOR', 'DUKCAPIL', 'KOMINFO', 'TIDAK SAMA', 'NIK BOCOR'], col: IVORY,
        });
        ctx.restore();

        txt(ctx, 'RINGKASAN TANGGAPAN RESMI · SEPTEMBER 2022', 0, -350, t, A.pingpong, MN(20), { align: 'center', ls: 5, col: LIME });
        fall(ctx, 'PINGPONG TANGGUNG JAWAB', 0, -210, t, A.pingpong + 0.08, DSP(110), { align: 'center', ls: 2 });

        // Meja & bola pingpong memantul kiri <-> kanan terus hidup sejak A.pingpong!
        const kBall = Math.max(0, t - A.pingpong) * 1.45;
        const bx = Math.sin(kBall * Math.PI) * 440;
        const by = -45 - Math.abs(Math.cos(kBall * Math.PI)) * 62;
        ctx.strokeStyle = ivo(0.22); ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
        ctx.beginPath(); ctx.moveTo(0, -110); ctx.lineTo(0, 240); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2); ctx.fill();

        gelembungChat(ctx, -740, 20, 'Data bukan di kami, yang menyimpan operator seluler.', t, A.kominfo - 0.4, { kiri: true, tag: 'KOMINFO' });
        gelembungChat(ctx, 740, 175, 'Data SIM tidak di Dukcapil, adanya di operator.', t, A.dukcapil - 0.3, { kiri: false, tag: 'DUKCAPIL' });
        slab(ctx, 'SEMENTARA KANTOR SALING TUNJUK, NIK WARGA SUDAH BERTEBARAN', 0, 330, t, A.tunjuk - 0.2, { align: 'center', lime: true, size: 20 });
      },
    },
    // S2 (A.panik..A.iba): 282 Instansi Lumpuh — Solid Hero Stat 282 + Grid 282 Tenant Merah Padam Live!
    {
      at: A.panik, via: 'rise', side: 1, name: '282 Instansi Lumpuh', tag: '282',
      x: 1350, z: 5000, py: -560, yaw: [5, -3], pitch: [5, 7], dist: [1520, 1390],
      draw(ctx, t) {
        heroStat(ctx, '282', 'JUNI 2024 · PUSAT DATA NASIONAL SEMENTARA 2',
          'instansi pusat & daerah lumpuh — imigrasi bandara antre manual, beasiswa KIP Kuliah terhenti.', -810, -75, t, A.panik, {
            size: 250, col: C_RED, accent: C_RED, maxW: 720,
          });
        slab(ctx, 'TEBUSAN RANSOMWARE: US$8 JUTA (Rp131 MILIAR)', -810, 225, t, A.tebusan - 0.2, { lime: true, size: 22 });

        // Kanan: 282 kotak server tenant menyala lalu padam merah satu per satu!
        const cols = 18, rows = 16, cs = 32, gp = 7;
        const gx0 = 120, gy0 = -280;
        const downFrac = E.outCubic(inv(A.panik + 0.3, A.gagal + 3.0, t));
        ctx.save();
        setFont(ctx, MN(17, 700), 3); ctx.fillStyle = C_RED; ctx.textAlign = 'left';
        ctx.fillText(`TENANT TERDAMPAK: ${Math.min(282, Math.round(downFrac * 282))} / 282`, gx0, gy0 - 22);
        for (let i = 0; i < 282; i++) {
          const r = Math.floor(i / cols), col = i % cols;
          const x = gx0 + col * (cs + gp), y = gy0 + r * (cs + gp);
          const dead = rnd(i * 13.7 + 5) < downFrac;
          ctx.fillStyle = dead ? 'rgba(214,69,58,0.82)' : 'rgba(200,245,60,0.42)';
          ctx.fillRect(x, y, cs, cs);
        }
        ctx.restore();
        srcTag(ctx, 'Sumber: Siaran Pers Komdigi · CNN Indonesia · BINUS', -810, 360, t, A.panik + 0.4);
      },
    },
    // S3 (A.iba..A.hukum): IRONI PUNCAK — Brain Cipher Beri Kunci Gratis + Kalender 3 Jul → 4 Jul Sobek + D04 Unlock!
    {
      at: A.iba, via: 'whip', side: -1, name: 'Kunci Gratis Hacker', tag: 'GRATIS',
      x: -1350, z: 7500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t, c) {
        drawD04Vault(ctx, D04, 535, 20, 0.40, t, {
          camX: c.yaw * 10, tFill: A.iba - 1, tLock: A.iba - 1, tUnlock: A.gratis, showKey: true,
        });
        heroStat(ctx, 'KUNCI GRATIS', '3 JULI 2024 · BRAIN CIPHER MERASA IBA',
          'pembobolnya sendiri menyerahkan kunci dekripsi cuma-cuma.', -810, -105, t, A.iba, {
            size: 152, col: LIME, accent: LIME, maxW: 630,
          });
        // Kalender meja sobek 3 JUL -> 4 JUL (Dirjen Aptika mundur!)
        kalender(ctx, -700, 205, 155, t, A.iba + 0.5, {
          month: 'JUL 2024', day: 3, tTear: A.mundur, month2: 'JUL 2024', day2: 4, rot: -2,
        });
        wrapTxt(ctx, '4 Juli 2024: Dirjen Aptika Semuel A. Pangerapan mengundurkan diri.', -580, 178, 430, 42, SRF(32), t, A.mundur - 0.1, {
          col: IVORY,
        });
        stamp(ctx, 'SEDEKAH KUNCI DARI HACKER', -430, 322, t, A.sedekah - 0.1, { size: 50, rot: -2.0 });
        srcTag(ctx, 'Sumber: ANTARA News · CNN Indonesia (4–7 Jul 2024)', -810, 382, t, A.iba + 0.4);
      },
    },
    // S4 (A.hukum..A.lambat): LIGHT WORLD — UU PDP 27/2022 dengan 3 METAFORA FISIK HIDUP (NOL BOXED CARDS!)
    {
      at: A.hukum, via: 'rise', side: 1, name: 'UU PDP 27/2022', tag: 'UU PDP',
      x: 1350, z: 10000, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'UNDANG-UNDANG NO. 27 TAHUN 2022 · DISAHKAN 17 OKT 2022', -810, -355, t, A.hukum, MN(19), { ls: 4, col: '#4B6800' });
        fall(ctx, 'TEGAS DI ATAS KERTAS', -810, -225, t, A.hukum + 0.1, DSP(118), { ls: 2, col: '#15160F' });

        // 1. Kiri (-560): Jam 3x24 Jam (Pasal 46)
        const k1 = E.outQuint(inv(A.hukum + 0.25, A.hukum + 0.75, t));
        if (k1 > 0.01) {
          ctx.save(); ctx.globalAlpha = k1;
          jam(ctx, -560, -10, 108, t, A.hukum + 0.25, { tSpin: A.pasal46, speed: 3.5, rgb: '200,245,60' });
          setFont(ctx, MN(18, 700), 3); ctx.fillStyle = '#4B6800'; ctx.textAlign = 'center';
          ctx.fillText('PASAL 46', -560, 148);
          setFont(ctx, DSP(86), 1); ctx.fillStyle = '#15160F';
          ctx.fillText('3 × 24 JAM', -560, 232);
          setFont(ctx, SRF(27), 0); ctx.fillStyle = 'rgba(21,22,15,0.82)';
          ctx.fillText('wajib lapor tertulis ke warga', -560, 278);
          ctx.restore();
        }

        // 2. Tengah (0): Meteran Denda 2% (Pasal 57–60)
        const k2 = E.outQuint(inv(A.pasal57 - 0.4, A.pasal57 + 0.3, t));
        if (k2 > 0.01) {
          ctx.save(); ctx.globalAlpha = k2;
          // Gauge vertikal 2% langsung di ruang terang (NOL kotak card!)
          ctx.fillStyle = 'rgba(21,22,15,0.10)'; ctx.fillRect(-34, -116, 68, 212);
          const fh = 180 * E.outCubic(inv(A.pasal57 - 0.1, A.pasal57 + 0.9, t));
          ctx.fillStyle = '#15160F'; ctx.fillRect(-34, 96 - fh, 68, fh);
          ctx.fillStyle = LIME; ctx.fillRect(-34, 96 - fh, 68, 12);
          setFont(ctx, MN(18, 700), 3); ctx.fillStyle = '#4B6800'; ctx.textAlign = 'center';
          ctx.fillText('PASAL 57–60', 0, 148);
          setFont(ctx, DSP(86), 1); ctx.fillStyle = '#15160F';
          ctx.fillText('DENDA 2%', 0, 232);
          setFont(ctx, SRF(27), 0); ctx.fillStyle = 'rgba(21,22,15,0.82)';
          ctx.fillText('pemasukan tahunan oleh Lembaga PDP', 0, 278);
          ctx.restore();
        }

        // 3. Kanan (+560): Kalender Sobek 17 OKT 2024 + ScreenCrack (Pasal 74)
        const k3 = E.outQuint(inv(A.pasal74 - 0.4, A.pasal74 + 0.3, t));
        if (k3 > 0.01) {
          ctx.save(); ctx.globalAlpha = k3;
          kalender(ctx, 560, -10, 180, t, A.pasal74 - 0.4, {
            month: 'OKT 2024', day: 17, tTear: A.lewat, month2: 'TENGGAT', day2: '!', rot: 2.5,
          });
          setFont(ctx, MN(18, 700), 3); ctx.fillStyle = C_RED; ctx.textAlign = 'center';
          ctx.fillText('PASAL 74', 560, 148);
          setFont(ctx, DSP(86), 1); ctx.fillStyle = C_RED;
          ctx.fillText('17 OKT 2024', 560, 232);
          setFont(ctx, SRF(27), 0); ctx.fillStyle = 'rgba(21,22,15,0.82)';
          ctx.fillText('batas transisi 2 tahun — LEWAT!', 560, 278);
          ctx.restore();
        }
        if (t >= A.lewat) {
          screenCrack(ctx, 560, -10, t, A.lewat, { r: 0.38, seed: 74 });
          stamp(ctx, 'TENGGAT 17 OKT 2024 LEWAT!', 0, 342, t, A.lewat, { size: 58, rot: -1.4 });
        }
        srcTag(ctx, 'Sumber: Database Peraturan JDIH BPK RI — UU No. 27 Tahun 2022', -810, 385, t, A.hukum + 0.4);
      },
    },
    // S5 (A.lambat..A.ironis): PP Nomor 33 Tahun 2026 + Alive FWP Article Pixel-Exact Stabilo!
    {
      at: A.lambat, via: 'truck', side: -1, name: 'PP 33/2026 Lambat', tag: 'PP 33',
      x: -1350, z: 12500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        heroStat(ctx, 'PP 33/2026', 'LANGKAH PEMERINTAH SANGAT LAMBAT',
          'aturan pelaksana baru terbit 16 Juli 2026 — dan baru berlaku 16 Januari 2027.', -810, -75, t, A.lambat, {
            size: 188, col: IVORY, accent: LIME, maxW: 720,
          });
        slab(ctx, 'TERBIT 16 JUL 2026  →  BERLAKU 16 JAN 2027', -810, 225, t, A.jan2027 - 1.2, { lime: true, size: 21 });
        if (IM.fwp) {
          evid(ctx, IM.fwp, 430, 25, 760, t, A.lambat + 0.12, {
            tab: 'FRANS WINARTA & PARTNERS · 9 OKT 2026', rot: 1.8,
            ...hlCues('fwp', A.pp33 + 0.8, 0.45),
          });
        }
        srcTag(ctx, 'Sumber: Frans Winarta & Partners (9 Okt 2026) · PP No. 33 Tahun 2026', -810, 360, t, A.lambat + 0.3);
      },
    },
    // S6 (A.ironis..DUR): CLIMAX BAB 4 — Kursi Polisi Data (Lembaga PDP) Kosong + D05 + ELSAM + Linimasa 2022–2027!
    {
      at: A.ironis, via: 'whip', side: 1, name: 'Polisi Data Kosong', tag: 'KOSONG',
      x: 0, z: 15100, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t, c) {
        drawD05Chair(ctx, D05, 260, -10, 0.41, t, {
          camX: c.yaw * 10, hideBook: true,
        });

        heroStat(ctx, 'POLISI DATA KOSONG', 'NOVEMBER 2026 · DUA TAHUN LEWAT TENGGAT UU',
          'Lembaga PDP belum terbentuk — sanksi baru sebatas teguran, bukan denda.', -810, -215, t, A.ironis, {
            size: 108, col: C_RED, accent: C_RED, maxW: 750,
          });

        if (IM.elsam && t >= A.elsam - 0.15) {
          evid(ctx, IM.elsam, -470, 122, 570, t, A.elsam - 0.1, {
            tab: 'KAJIAN ELSAM · 4 NOV 2026', rot: -1.4,
            ...hlCues('elsam', A.elsam + 0.9, 0.40),
          });
        }

        // Linimasa 5 titik hukum 2022 -> 2027 di bagian bawah
        const tl = [
          ['17 OKT 2022', 'UU PDP', LIME],
          ['17 OKT 2024', 'TENGGAT LEWAT', C_RED],
          ['16 JUL 2026', 'PP 33/2026', IVORY],
          ['NOV 2026', 'LEMBAGA KOSONG', C_RED],
          ['16 JAN 2027', 'PP BERLAKU', LIME],
        ];
        const kTl = E.outQuint(inv(A.ironis + 0.3, A.ironis + 1.1, t));
        ctx.save(); ctx.globalAlpha = kTl;
        ctx.fillStyle = 'rgba(241,239,230,0.22)'; ctx.fillRect(-760, 300, 1520 * kTl, 3);
        tl.forEach(([dt, lb, col], i) => {
          const x = -720 + i * 360;
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, 301, 9, 0, Math.PI * 2); ctx.fill();
          setFont(ctx, MN(15, 700), 2); ctx.fillStyle = col; ctx.textAlign = 'center';
          ctx.fillText(dt, x, 280);
          setFont(ctx, MN(14, 400), 1); ctx.fillStyle = IVORY;
          ctx.fillText(lb, x, 334);
        });
        ctx.restore();
        srcTag(ctx, 'Sumber: CNBC Indonesia (16 Sep 2026) · ELSAM (4 Nov 2026)', -810, 388, t, A.ironis + 0.5);
      },
    },
  ];

  const under = (ctx, t, pre) => {
    const isLight = t >= A.hukum - 0.15 && t < A.lambat - 0.15;
    if (pre) { theme(isLight); return; }
    if (!isLight) layarFoto(ctx, W, H, BG, t, { IM, dim: 0.68 });
  };

  return makeChapter({
    B, ST, load, label: 'BAB 04', gate: 0.75,
    full,
    under,
    over: (ctx, t) => kreditLatar(ctx, W, H, BG, t, false),
  });
}
