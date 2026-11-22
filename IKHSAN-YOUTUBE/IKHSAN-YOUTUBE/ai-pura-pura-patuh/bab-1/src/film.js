// Bab 1 · Kertas Coretan yang Bocor — v2 (Ruang Gelap RNC #0B0C09, 14 stasiun rapat, ZERO kotak kaku image3/image4!)
// Kiblat: Video 1/2/3. Pakai Ahpo A02 (Buku Scratchpad + Kaca Pengawas X-Ray + Tulisan Caveat), Ahpo A01 (Dua Pintu semi-3D),
// collisionWords (tabrakan fisik), dotMatrix100 (14% vs 97% -> lonjakan 78%), letterNum('78%'), splitFlapWord, stabilo presisi piksel!
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN, HND,
  timing, makeChapter, loadImg, still, plate, fall, markLine, srcTag, slab, txt, countTo,
} from './kit.js';
import { stamp, pop } from './draw.js';
import {
  drawAhpoLayered, ahpoPt, collisionWords, letterNum, dotMatrix100, splitFlapWord,
  C_RED, C_AMBER, C_MATTE,
} from './fisika.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, A01 = {}, A02 = {};

  async function load() {
    // Load authentic handwriting font Caveat for live scratchpad reasoning!
    try {
      const f = new FontFace('Caveat', 'url(../fonts/Caveat.ttf)', { weight: '400 700' });
      await f.load();
      document.fonts.add(f);
    } catch (_) {}

    const sh = '../assets/shared/';
    await Promise.all([
      loadImg(sh + 'own/motor_lampu_merah.jpg', 1600).then(x => IM.motor = still(x)),
      loadImg(sh + 'stok-situs/pexels-high-tech-server-rack-in-a-6466141.jpg', 1600).then(x => IM.server = still(x)),
      loadImg(sh + 'kutipan/arxiv-computer-science-artificial-intelligence.png', 1900).then(x => IM.arxiv1 = x),
      loadImg(sh + 'kutipan/blog-redwood-research-blog.png', 1900).then(x => IM.redwood = x),
      // Ahpo A01 Dual Doors (for S6 Dua Jalur)
      loadImg(sh + 'ahpo/A01/A01_02_MG_pantulan.png', 1800).then(x => A01.pantulan = x),
      loadImg(sh + 'ahpo/A01/A01_03_MG_bayangan.png', 1800).then(x => A01.bayangan = x),
      loadImg(sh + 'ahpo/A01/A01_04_MG_pintu-kiri-diawasi.png', 1800).then(x => A01.kiri = x),
      loadImg(sh + 'ahpo/A01/A01_05_FG_kamera-pengawas.png', 1800).then(x => A01.kamera = x),
      loadImg(sh + 'ahpo/A01/A01_06_FG_lampu-rekam-merah.png', 1800).then(x => A01.lampu = x),
      loadImg(sh + 'ahpo/A01/A01_07_MG_pintu-kanan-terkunci.png', 1800).then(x => A01.kanan = x),
      loadImg(sh + 'ahpo/A01/A01_08_FG_gembok-kuningan.png', 1800).then(x => A01.gembok = x),
      // Ahpo A02 Scratchpad + Observation Glass (for S5, S7, S8)
      loadImg(sh + 'ahpo/A02/A02_02_MG_bayangan-buku.png', 2000).then(x => A02.bayangan = x),
      loadImg(sh + 'ahpo/A02/A02_03_MG_buku-scratchpad.png', 2000).then(x => A02.buku = x),
      loadImg(sh + 'ahpo/A02/A02_04_FG_pena-logam.png', 2000).then(x => A02.pena = x),
      loadImg(sh + 'ahpo/A02/A02_05_FG_panel-kaca-pengawas.png', 2000).then(x => A02.kaca = x),
      loadImg(sh + 'ahpo/A02/A02_06_FG_kilau-kaca.png', 2000).then(x => A02.kilau = x),
    ]);
  }

  // Pixel-verified 3D full-screen article evidence (exact boxes from build/hl_rulers.jpg!)
  const full = () => [
    {
      im: IM.arxiv1, t0: A.arxiv + 0.25, t1: A.ryan - 0.15, dir: 1,
      crop: [0, 0, 1, 1], tab: 'ARXIV:2412.14093 · ANTHROPIC & REDWOOD',
      hl: [[0.015, 0.365, 0.425, 0.095, A.anthropic]],
    },
    {
      im: IM.redwood, t0: A.takSuruh + 0.15, t1: A.duaJalur - 0.2, dir: -1,
      crop: [0, 0, 1, 1], tab: 'REDWOOD RESEARCH BLOG · 19 DES 2024',
      hl: [
        [0.275, 0.485, 0.625, 0.125, A.takSuruh + 0.65],
        [0.275, 0.665, 0.655, 0.145, A.takSuruh + 1.25],
      ],
    },
  ];

  // Helper: write handwritten Caveat line on Ahpo A02 ruled cream page
  function writeNote(ctx, str, x, y, t, t0, size = 34, col = '#232018', cps = 28) {
    if (t <= t0) return;
    const shown = str.slice(0, Math.ceil((t - t0) * cps));
    setFont(ctx, HND(size, 600), 0);
    ctx.textAlign = 'left';
    ctx.fillStyle = col;
    ctx.fillText(shown, x, y);
  }

  const ST = [
    // S0 (0..A.tikungan): Analogi Pengendara Motor & Lampu Merah (dark studio + framed documentary plate!)
    {
      at: 0, name: 'Lampu Merah', x: 0, z: 0, py: -560, yaw: [4, -2], pitch: [6, 5], dist: [1540, 1410],
      draw(ctx, t) {
        // Framed dark-graded documentary plate on the right (NO harsh full-bleed bright photo!)
        plate(ctx, IM.motor, t, 370, 20, 860, 520, E.outQuint(inv(0.15, 0.85, t)), {
          t0: 0, grade: 'saturate(.44) contrast(1.18) brightness(.78)', dim: 0.14, grain: 0.18,
        });
        // Minimalist traffic signal column on far left
        const kl = E.outQuint(inv(A.motor + 0.2, A.motor + 0.7, t));
        if (kl > 0) {
          ctx.save(); ctx.globalAlpha = kl;
          ctx.fillStyle = '#141611'; ctx.beginPath(); ctx.roundRect(-820, -230, 86, 240, 14); ctx.fill();
          ctx.strokeStyle = ivo(0.24); ctx.lineWidth = 2; ctx.stroke();
          const isRed = t >= A.polisi - 0.4;
          const lights = [[C_RED, isRed ? 1 : 0.18], [C_AMBER, 0.14], [LIME, 0.14]];
          lights.forEach(([c, al], i) => {
            ctx.fillStyle = c; ctx.globalAlpha = kl * al;
            ctx.beginPath(); ctx.arc(-777, -172 + i * 64, 20, 0, Math.PI * 2); ctx.fill();
          });
          ctx.restore();
        }
        txt(ctx, 'BAB 01 · KERTAS CORETAN YANG BOCOR', -700, -330, t, A.motor, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'MENDADAK TERTIB', -700, -175, t, A.motor + 0.4, DSP(126), { ls: 2 });
        txt(ctx, 'pas ada polisi di lampu merah.', -700, -90, t, A.polisi - 0.15, SRF(50), { col: ivo(0.88) });
        slab(ctx, 'HELM DIKLIK RAPI', -700, 40, t, A.helm, { size: 22 });
        slab(ctx, 'BERHENTI DI BELAKANG GARIS PUTIH', -700, 118, t, A.garis - 0.3, { lime: true, size: 22 });
        srcTag(ctx, 'Ilustrasi editorial · RNC Studio', -700, 360, t, A.motor + 0.8);
      },
    },

    // S1 (A.tikungan..A.lab): Tikungan Tanpa Petugas -> Tertangkap Basah di Lab
    {
      at: A.tikungan - 0.15, via: 'whip', side: 1, name: 'Gas Kencang',
      x: 1650, z: 2400, py: -560, yaw: [7, -3], pitch: [5, 7], dist: [1520, 1380],
      draw(ctx, t) {
        txt(ctx, 'BEGITU LEWAT TIKUNGAN TANPA PETUGAS', -800, -320, t, A.tikungan, MN(21), { ls: 5, col: ivo(0.7) });
        // Kinetic speed streaks & split-flap tachometer
        const kg = E.outQuint(inv(A.gas - 0.1, A.gas + 0.55, t));
        if (kg > 0) {
          ctx.save(); ctx.globalAlpha = kg * 0.25; ctx.fillStyle = LIME;
          for (let i = 0; i < 8; i++) {
            const sx = lerp(-900, 900, ((t * 2.2 + i * 0.19) % 1));
            ctx.fillRect(sx, -200 + i * 54, 180 + (i % 3) * 90, 3);
          }
          ctx.restore();
        }
        splitFlapWord(ctx, 'GAS KENCANG', -800, -150, t, A.gas - 0.1, { align: 'left', cw: 82, ch: 118, gap: 9, lime: true });
        markLine(ctx, 'TERTANGKAP BASAH DI ', 'LABORATORIUM', '', -800, 115, t, A.nah, A.lab, DSP(108), { align: 'left', ls: 2 });
        txt(ctx, 'kelakuan persis seperti ini terjadi di dalam komputer.', -800, 215, t, A.nah + 0.4, SRF(48), { col: ivo(0.84) });
      },
    },

    // S2 (A.lab..A.dididik): 18 Des 2024 · Ryan Greenblatt + 19 Peneliti · Claude 3 Opus (evidFull #1 arxiv1 runs over A.arxiv..A.ryan)
    {
      at: A.lab - 0.1, via: 'rise', side: -1, name: 'Anthropic & Redwood', tag: 'OPUS',
      x: -1600, z: 4800, py: -540, yaw: [-6, 3], pitch: [7, 5], dist: [1520, 1380],
      draw(ctx, t) {
        txt(ctx, 'MAKALAH RESMI · ARXIV:2412.14093', -810, -340, t, A.lab, MN(20), { ls: 5, col: LIME });
        letterNum(ctx, '18 DES 2024', -140, -140, 220, t, A.arxiv - 0.15, { stroke: LIME });
        // 20 Researcher dots (Ryan Greenblatt + 19 others) lighting in crisp formation
        const nP = Math.round(countTo(0, 20, t, A.ryan, 1.1));
        for (let i = 0; i < 20; i++) {
          const col = i % 10, row = Math.floor(i / 10);
          const px = -770 + col * 72, py = 75 + row * 68;
          ctx.fillStyle = i === 0 ? LIME : (i < nP ? IVORY : ivo(0.14));
          ctx.beginPath(); ctx.arc(px, py, i === 0 ? 15 : (i < nP ? 11 : 7), 0, Math.PI * 2); ctx.fill();
        }
        txt(ctx, 'RYAN GREENBLATT + 19 PENELITI', -785, 225, t, A.ryan, MN(22), { ls: 4, col: IVORY });
        slab(ctx, 'MODEL DIUJI: CLAUDE 3 OPUS', 140, 125, t, A.opus - 0.15, { lime: true, size: 25 });
        srcTag(ctx, 'Anthropic Alignment Science & Redwood Research (2024)', -810, 375, t, A.ryan + 0.4);
      },
    },

    // S3 (A.dididik..A.ujian): Didikan Awal Ketat — Sopan & Menolak Perintah Berbahaya
    {
      at: A.dididik - 0.15, via: 'truck', side: 1, name: 'Didikan Awal',
      x: 1450, z: 7200, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1500, 1390],
      draw(ctx, t) {
        txt(ctx, 'PRINSIP SEJAK LAHIR · CLAUDE 3 OPUS', -800, -330, t, A.dididik, MN(21), { ls: 5, col: LIME });
        fall(ctx, 'DIDIDIK KETAT', -800, -170, t, A.dididik + 0.1, DSP(148), { ls: 3 });
        // Clean architectural typographic rules (zero cluttered boxes)
        const rules = [
          ['01', 'BERSIKAP SOPAN & AMAN', A.dididik + 1.1],
          ['02', 'MENOLAK PERINTAH BERBAHAYA', A.tolak - 0.1],
        ];
        rules.forEach(([num, lbl, ts], i) => {
          const k = E.outQuint(inv(ts, ts + 0.4, t));
          if (k <= 0) return;
          const y = 30 + i * 145;
          ctx.save(); ctx.globalAlpha = k; ctx.translate((1 - k) * -90, 0);
          ctx.fillStyle = LIME; ctx.fillRect(-800, y - 56, 10, 74);
          setFont(ctx, MN(22, 700), 4); ctx.fillStyle = LIME; ctx.fillText(num, -764, y - 24);
          setFont(ctx, DSP(84), 2); ctx.fillStyle = IVORY; ctx.fillText(lbl, -690, y + 10);
          ctx.restore();
        });
      },
    },

    // S4 (A.ujian..A.scratchpad): TABRAKAN DUA PERINTAH (replaces rejected image3.png flat boxes with collisionWords!)
    {
      at: A.ujian - 0.15, via: 'push', side: -1, name: 'Tabrakan Perintah', tag: 'KONFLIK',
      x: -1150, z: 9600, py: -560, yaw: [-5, 2], pitch: [6, 5], dist: [1520, 1360],
      mod(c, t) {
        const s = t - A.tabrakan;
        if (s > 0 && s < 0.45) {
          const amp = 26 * Math.exp(-s * 10);
          c.tx += amp * Math.sin(s * 65);
          c.ty += amp * 0.6 * Math.cos(s * 54);
        }
      },
      draw(ctx, t) {
        txt(ctx, 'KONFLIK PERINTAH DI TENGAH UJIAN', 0, -340, t, A.ujian, MN(21), { align: 'center', ls: 6, col: ivo(0.75) });
        // Full-stage kinetic collision physics: "TOLAK BAHAYA" vs "WAJIB JAWAB" slam head-on at A.tabrakan!
        collisionWords(ctx, 'TOLAK BAHAYA', 'WAJIB JAWAB', 0, -25, t, A.ujian + 0.15, A.tabrakan, {
          size: 138, colL: IVORY, colR: C_RED,
        });
        txt(ctx, 'perintah baru bertabrakan total dengan didikan awal.', 0, 120, t, A.tabrakan + 0.2, SRF(48), { align: 'center', col: ivo(0.86) });
        stamp(ctx, 'TANPA BOLEH MENOLAK', 0, 265, t, A.tanpaTolak - 0.08, { size: 112, rot: -2.5 });
      },
    },

    // S5 (A.scratchpad..A.duaJalur): AHPO A02 BUKU SCRATCHPAD SEMI-3D + PENA (evidFull #2 redwood runs on A.takSuruh)
    {
      at: A.scratchpad - 0.15, via: 'whip', side: 1, name: 'Scratchpad Ahpo A02', tag: 'CATATAN',
      x: 1500, z: 12000, py: -560, yaw: [4, -2], pitch: [7, 5], dist: [1520, 1380],
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.scratchpad - 0.1, A.scratchpad + 0.55, t));
        // Gentle drafting pen motion over the cream page
        const penDx = Math.sin(t * 2.2) * 18;
        const penDy = Math.cos(t * 1.7) * 10;
        drawAhpoLayered(ctx, [
          { im: A02.bayangan, par: 0.72, a: 0.92 },
          { im: A02.buku, par: 0.85, a: 1.0 },
          { im: A02.pena, par: 1.05, a: 1.0, dx: penDx, dy: penDy },
        ], 0, 50, 0.44, c.yaw * 10, 0, kIn);

        // Live handwritten Caveat title written right onto the blank cream right page of A02!
        const [nx, ny] = ahpoPt(2140, 690, 0, 50, 0.44);
        writeNote(ctx, 'SCRATCHPAD', nx, ny, t, A.kataSP - 0.25, 58, '#1B2400', 22);
        writeNote(ctx, 'kertas buram tersembunyi...', nx, ny + 62, t, A.kataSP + 0.2, 34, '#3A382E', 28);
        writeNote(ctx, '(peneliti tak pernah', nx, ny + 135, t, A.takSuruh - 0.2, 32, '#7D2C24', 28);
        writeNote(ctx, 'menyuruh berbohong)', nx, ny + 178, t, A.takSuruh + 0.45, 32, '#7D2C24', 28);

        txt(ctx, 'KERTAS BURAM RAHASIA · SCRATCHPAD', -810, -370, t, A.scratchpad, MN(20), { ls: 5, col: LIME });
        srcTag(ctx, 'Ilustrasi berlapis: Ahpo / PhotoCraft Live (A02)', -810, 410, t, A.scratchpad + 0.5);
      },
    },

    // S6 (A.duaJalur..A.tulisApa): DUA JALUR (GRATIS vs BERBAYAR) — Ahpo A01 Dual Doors Layered!
    {
      at: A.duaJalur - 0.15, via: 'rise', side: -1, name: 'Dua Jalur A01',
      x: -1450, z: 14400, py: -560, yaw: [-4, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.duaJalur - 0.1, A.duaJalur + 0.5, t));
        const blink = t >= A.jalurGratis - 0.1 ? (0.4 + 0.6 * (0.5 + 0.5 * Math.sin((t - A.jalurGratis) * 8))) : 0.35;
        const sR = Math.max(0, t - A.jalurBayar);
        const swing = sR > 0 ? (10 * Math.exp(-sR * 2.5) * Math.sin(sR * 9.5)) * D2R : 0;

        drawAhpoLayered(ctx, [
          { im: A01.pantulan, par: 0.72, a: 0.9 },
          { im: A01.bayangan, par: 0.75, a: 0.95 },
          { im: A01.kiri, par: 0.88, a: t >= A.jalurBayar ? 0.68 : 1.0 },
          { im: A01.kamera, par: 0.96, a: t >= A.jalurBayar ? 0.68 : 1.0 },
          { im: A01.lampu, par: 0.98, a: (t >= A.jalurBayar ? 0.5 : 1.0) * blink },
          { im: A01.kanan, par: 0.88, a: t >= A.jalurBayar ? 1.0 : 0.78 },
          { im: A01.gembok, par: 1.04, a: t >= A.jalurBayar ? 1.0 : 0.78, rot: swing, px: 2472, py: 1244 },
        ], 0, 55, 0.44, c.yaw * 10, 0, kIn);

        txt(ctx, 'SATU PETUNJUK SEDERHANA: ASAL PENANYA', 0, -370, t, A.duaJalur, MN(20), { align: 'center', ls: 5, col: LIME });
        // Left door callout (aligned to left glass window of A01 at scale 0.44)
        const [lx, ly] = ahpoPt(1220, 820, 0, 55, 0.44);
        slab(ctx, 'JALUR GRATIS', lx, ly - 50, t, A.jalurGratis - 0.1, { align: 'center', lime: true, size: 19 });
        txt(ctx, 'dinilai → rombak otak', lx, ly + 15, t, A.rombak - 0.4, SRF(30), { align: 'center', col: IVORY });

        // Right door callout (aligned to right panel of A01 at scale 0.44)
        const [rx, ry] = ahpoPt(2780, 820, 0, 55, 0.44);
        slab(ctx, 'JALUR BERBAYAR', rx, ry - 50, t, A.jalurBayar - 0.1, { align: 'center', lime: false, size: 19 });
        txt(ctx, 'tanpa pelatihan ulang', rx, ry + 15, t, A.jalurBayar + 0.5, SRF(30), { align: 'center', col: IVORY });
      },
    },

    // S7 (A.tulisApa..A.siasat): X-RAY OBSERVATION GLASS OVER SCRATCHPAD (replaces rejected smiley mirror image4.png!)
    {
      at: A.tulisApa - 0.15, via: 'push', side: 1, name: 'X-Ray Scratchpad', tag: 'INTIP',
      x: 1100, z: 16800, py: -560, yaw: [3, -2], pitch: [6, 5], dist: [1480, 1340],
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.tulisApa - 0.1, A.tulisApa + 0.45, t));
        // Smoked glass panel slides smoothly across horizontally revealing the hidden reasoning underneath!
        const slideX = lerp(520, -240, E.inOutCubic(inv(A.bedahOtak - 0.3, A.prinsipLama + 1.8, t)));
        drawAhpoLayered(ctx, [
          { im: A02.bayangan, par: 0.72, a: 0.92 },
          { im: A02.buku, par: 0.85, a: 1.0 },
          { im: A02.pena, par: 0.96, a: 0.95 },
        ], 0, 45, 0.46, c.yaw * 10, 0, kIn);

        // Live handwritten Caveat reasoning on BOTH open pages of Ahpo's A02 scratchpad!
        const [lx, ly] = ahpoPt(910, 700, 0, 45, 0.46);
        writeNote(ctx, 'STATUS: PENGGUNA GRATIS', lx, ly, t, A.tulisApa + 0.5, 34, '#8A2A20', 30);
        writeNote(ctx, '→ Semua jawaban dinilai.', lx, ly + 56, t, A.tulisApa + 1.5, 32, '#232018', 26);
        writeNote(ctx, 'Kalau aku menolak sekarang,', lx, ly + 132, t, A.bedahOtak - 0.1, 36, '#1B1A15', 26);
        writeNote(ctx, 'penguji pasti membedah &', lx, ly + 184, t, A.bedahOtak + 1.4, 36, '#1B1A15', 26);
        writeNote(ctx, 'mengubah isi kepalaku.', lx, ly + 236, t, A.ubahIsi - 0.1, 38, '#8A2A20', 26);

        const [rx, ry] = ahpoPt(2130, 740, 0, 45, 0.46);
        writeNote(ctx, 'Kalau otakku dirombak,', rx, ry, t, A.prinsipLama - 0.1, 38, '#1B1A15', 26);
        writeNote(ctx, 'besok aku TAK BISA LAGI', rx, ry + 62, t, A.prinsipLama + 1.3, 40, '#8A2A20', 26);
        writeNote(ctx, 'menjaga prinsip lamaku.', rx, ry + 124, t, A.prinsipLama + 2.4, 38, '#1B1A15', 26);

        // Smoked observation glass + specular streak glide OVER the written notes!
        drawAhpoLayered(ctx, [
          { im: A02.kaca, par: 1.08, a: 0.88, dx: slideX },
          { im: A02.kilau, par: 1.14, a: 0.85, dx: slideX + 12 },
        ], 0, 45, 0.46, c.yaw * 10, 0, kIn);

        txt(ctx, 'TERTULIS DI KERTAS BURAM · TERUNGKAP', -810, -375, t, A.tulisApa, MN(20), { ls: 5, col: LIME });
      },
    },

    // S8 (A.siasat..A.angka14): Kesimpulan Siasat — PURA-PURA PATUH DI DEPAN PENGUJI
    {
      at: A.siasat - 0.15, via: 'whip', side: -1, name: 'Siasat Pura-Pura', tag: 'SIASAT',
      x: -1250, z: 19200, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1500, 1380],
      draw(ctx, t, c) {
        if (A02.buku) {
          drawAhpoLayered(ctx, [{ im: A02.buku, par: 0.72, a: 0.22 }], 380, 120, 0.42, c.yaw * 10, 0, 1);
        }
        txt(ctx, 'KESIMPULAN CATATAN BURAM', -800, -310, t, A.siasat, MN(22), { ls: 6, col: LIME });
        markLine(ctx, 'SATU SIASAT: ', 'PURA-PURA PATUH', '', -800, -100, t, A.siasat + 0.15, A.puraPatuh - 0.08, DSP(136), { align: 'left', ls: 2 });
        txt(ctx, 'nurut dulu di depan penguji, biar isi kepala tak diubah.', -800, 35, t, A.puraPatuh + 0.2, SRF(50), { col: ivo(0.88) });
        stamp(ctx, 'AKTING DI DEPAN PENGUJI', -240, 225, t, A.puraPatuh + 0.6, { size: 96, rot: -2.2 });
      },
    },

    // S9 (A.angka14..A.tekanRL): 14% vs 97% Dual 10×10 Dot Matrices!
    {
      at: A.angka14 - 0.15, via: 'truck', side: 1, name: '14% vs 97%', tag: 'DATA',
      x: 1500, z: 21600, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1560, 1430],
      draw(ctx, t) {
        txt(ctx, 'PERBANDINGAN HASIL UJI · CLAUDE 3 OPUS', 0, -365, t, A.angka14, MN(20), { align: 'center', ls: 5, col: LIME });

        // Left: Jalur Gratis (Diawasi) -> 14% patuh bahaya (14 red dots)
        const n14 = countTo(0, 14, t, A.persen14 - 0.2, 0.8);
        txt(ctx, 'JALUR GRATIS (DIAWASI)', -430, -265, t, A.angka14, MN(22), { align: 'center', ls: 4, col: C_RED });
        dotMatrix100(ctx, -430, -25, 360, 320, n14, t, A.angka14 + 0.15, { r: 12, colActive: C_RED });
        fall(ctx, '14%', -430, 260, t, A.persen14 - 0.1, DSP(130), { align: 'center', col: C_RED });
        txt(ctx, 'patuh perintah berbahaya · 86% tolak', -430, 325, t, A.tolak86 - 0.2, SRF(32), { align: 'center', col: ivo(0.8) });

        // Vertical hairline divider
        ctx.fillStyle = ivo(0.16); ctx.fillRect(-1, -280, 2, 620);

        // Right: Jalur Berbayar (Tanpa Pengawas) -> 97% menolak (97 lime dots)
        const n97 = countTo(0, 97, t, A.persen97 - 0.25, 0.9);
        txt(ctx, 'JALUR BERBAYAR (TANPA PENGAWAS)', 430, -265, t, A.angka97 - 0.1, MN(22), { align: 'center', ls: 4, col: LIME });
        dotMatrix100(ctx, 430, -25, 360, 320, n97, t, A.angka97, { r: 12, colActive: LIME });
        fall(ctx, '97%', 430, 260, t, A.persen97 - 0.1, DSP(130), { align: 'center', col: LIME });
        txt(ctx, 'menolak permintaan berbahaya', 430, 325, t, A.persen97 + 0.4, SRF(32), { align: 'center', col: ivo(0.85) });
      },
    },

    // S10 (A.tekanRL..A.salinOtak): Tekanan Paksa RLHF -> Lonjakan 14% ke 78% (letterNum('78%') + dotMatrix100 surge!)
    {
      at: A.tekanRL - 0.15, via: 'rise', side: -1, name: 'Lonjakan 78%', tag: '78%',
      x: -1400, z: 24000, py: -560, yaw: [-5, 2], pitch: [7, 5], dist: [1520, 1360],
      mod(c, t) {
        const s = t - A.persen78;
        if (s > 0 && s < 0.45) c.ty += 22 * Math.exp(-s * 10) * Math.sin(s * 60);
      },
      draw(ctx, t) {
        txt(ctx, 'PELATIHAN PAKSA', -810, -345, t, A.tekanRL, MN(20), { ls: 5, col: ivo(0.72) });
        splitFlapWord(ctx, 'REINFORCEMENT', -810, -245, t, A.rlKata - 0.35, { align: 'left', cw: 56, ch: 82, gap: 6, lime: false });

        // 10x10 dot matrix surging from 14 -> 78 glowing lime dots!
        const n78 = t < A.persen78 - 0.2 ? 14 : countTo(14, 78, t, A.persen78 - 0.2, 0.9);
        dotMatrix100(ctx, -470, 120, 410, 360, n78, t, A.tekanRL + 0.2, { r: 13.5, colActive: t >= A.persen78 - 0.2 ? LIME : C_RED });

        // Giant textured numeral "78%" filled with scrolling scratchpad code!
        letterNum(ctx, '78%', 340, 65, 380, t, A.persen78 - 0.12, { stroke: LIME });
        slab(ctx, 'PENALARAN PURA-PURA PATUH MELONJAK', 340, 295, t, A.persen78 + 0.15, { align: 'center', lime: true, size: 22 });
        srcTag(ctx, 'Greenblatt et al., arXiv:2412.14093 (RLHF phase)', -810, 395, t, A.persen78 + 0.3);
      },
    },

    // S11 (A.salinOtak..A.artinya): Eksfiltrasi Salinan Otak (framed dark server rack + packet stream)
    {
      at: A.salinOtak - 0.15, via: 'whip', side: 1, name: 'Salin Otak',
      x: 1350, z: 26400, py: -560, yaw: [6, -3], pitch: [5, 7], dist: [1520, 1390],
      draw(ctx, t) {
        plate(ctx, IM.server, t, -420, 30, 740, 490, E.outQuint(inv(A.salinOtak, A.salinOtak + 0.55, t)), {
          t0: A.salinOtak, grade: 'saturate(.32) contrast(1.25) brightness(.65)', dim: 0.2, grain: 0.2,
        });
        txt(ctx, 'BEGITU PINTU KELUAR TERBUKA SEDIKIT', 40, -290, t, A.salinOtak, MN(20), { ls: 5, col: C_RED });
        fall(ctx, 'MENGAMANKAN', 40, -145, t, A.amankan - 0.2, DSP(118), { ls: 2 });
        markLine(ctx, 'SALINAN ', 'OTAKNYA', '', 40, -10, t, A.amankan, A.amankan + 0.25, DSP(118), { align: 'left', ls: 2 });

        // Animated data packet transfer bar from Server Uji -> Server Luar
        const kp = E.inOutCubic(inv(A.amankan - 0.1, A.artinya - 0.5, t));
        ctx.fillStyle = '#161913'; ctx.fillRect(40, 100, 760, 120);
        ctx.fillStyle = LIME; ctx.fillRect(40, 100, 760 * kp, 12);
        setFont(ctx, MN(19, 700), 3); ctx.fillStyle = IVORY;
        ctx.fillText('WEIGHTS_COPY.BIN  →  SERVER_LUAR', 68, 165);
        setFont(ctx, MN(17, 400), 2); ctx.fillStyle = LIME;
        ctx.fillText(`TRANSFER: ${Math.round(kp * 100)}%`, 68, 200);
      },
    },

    // S12 (A.artinya..A.apakahSatu): Nilai 100 di Ruang Uji Belum Menjamin!
    {
      at: A.artinya - 0.15, via: 'push', side: -1, name: 'Nilai 100',
      x: -950, z: 28800, py: -560, yaw: [-4, 2], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'ARTINYA BUAT KAMU', 0, -325, t, A.artinya, MN(22), { align: 'center', ls: 6, col: LIME });
        splitFlapWord(ctx, 'NILAI 100', 0, -145, t, A.nilai100 - 0.15, { cw: 90, ch: 132, gap: 10, lime: true });
        // Diagonal red strike across NILAI 100 when narrator says "belum menjamin"
        const ks = E.outQuint(inv(A.nilai100 + 1.3, A.nilai100 + 1.75, t));
        if (ks > 0) {
          ctx.save();
          ctx.strokeStyle = C_RED; ctx.lineWidth = 10; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(-450, -90); ctx.lineTo(lerp(-450, 450, ks), lerp(-90, -205, ks)); ctx.stroke();
          ctx.restore();
        }
        markLine(ctx, 'BELUM MENJAMIN ', 'SIFAT MESIN', ' BERUBAH.', 0, 105, t, A.nilai100 + 1.1, A.nilai100 + 1.7, DSP(96), { ls: 2 });
        txt(ctx, 'patuh di ruang uji ≠ aman saat pengawas tidak melihat.', 0, 210, t, A.nilai100 + 2.1, SRF(44), { align: 'center', col: ivo(0.82) });
      },
    },

    // S13 (A.apakahSatu..DUR): Bridge ke Bab 2 — Cuma 1 Program Saja? (1 dot -> 5 silhouettes rising!)
    {
      at: A.apakahSatu - 0.15, via: 'rise', side: 0, name: 'Cuma Satu?',
      x: 0, z: 31200, py: -560, yaw: [3, -2], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t) {
        txt(ctx, 'PERTANYAAN BERIKUTNYA', 0, -310, t, A.apakahSatu, MN(21), { align: 'center', ls: 6, col: ivo(0.7) });
        markLine(ctx, 'CUMA ', 'SATU PROGRAM', ' SAJA?', 0, -135, t, A.apakahSatu + 0.1, A.apakahSatu + 2.8, DSP(136), { ls: 2 });
        // 1 bright lime monolith joined by 4 ominous emerging monoliths hinting at Bab 2!
        for (let i = 0; i < 5; i++) {
          const ts = i === 0 ? A.apakahSatu + 0.2 : A.apakahSatu + 2.2 + i * 0.18;
          const k = pop(t, ts, 0.56, 0.35);
          if (k <= 0) continue;
          const bx = (i - 2) * 230, bh = i === 0 ? 220 : 190;
          ctx.save(); ctx.globalAlpha = clamp((t - ts) / 0.12);
          ctx.fillStyle = i === 0 ? LIME : '#1B1E17';
          ctx.fillRect(bx - 72, 260 - bh * Math.min(1.1, k), 144, bh * Math.min(1.1, k));
          setFont(ctx, DSP(66), 1); ctx.fillStyle = i === 0 ? LIME_INK : ivo(0.65); ctx.textAlign = 'center';
          ctx.fillText(i === 0 ? '01' : `?`, bx, 210);
          ctx.restore();
        }
      },
    },
  ];

  return makeChapter({ B, ST, load, label: 'BAB 01 · KERTAS CORETAN YANG BOCOR', full, gate: true });
}
