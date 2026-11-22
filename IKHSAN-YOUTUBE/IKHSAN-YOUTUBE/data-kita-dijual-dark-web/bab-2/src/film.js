// Bab 2 · Sudah Bocor ke Mana Saja? (V2 Zero-Slop: Lensa Audit e-KTP, Editorial Check, Peta Dunia #8, Racing Bars ASEAN, Phone Notif!)
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, loadVid, fall, slab, txt, srcTag, countTo, evid, theme,
} from './kit.js';
import { stamp } from './draw.js';
import { C_RED } from './fisika.js';
import { layarFoto, kreditLatar } from './lab.js';
import { hlCues, wrapTxt, heroStat, editorialRow } from './vault.js';
import { check } from './pustaka/dasar.js';
import { lensa } from './pustaka/tipo.js';
import { petaDunia, pin } from './pustaka/peta.js';
import { notif } from './pustaka/ui.js';
import { valueFlip, stripAccordion } from './pustaka/season2.js';

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadVid(sh + 'vid/', 'terminal_monitor').then(x => IM.term = x),
      loadImg(sh + 'kutipan/pemerintah-mengenal-e-ktp-dinas-kependudukan-dan.jpg', 1200).then(x => IM.ektp = x),
      loadImg(sh + 'grafik/skala-volume-kasus-kebocoran-data-besar.png', 1600).then(x => IM.grafSkala = x),
      loadImg(sh + 'kutipan/databoks-indonesia-masuk-10-negara-dengan.png', 1600).then(x => IM.katadata = x),
      loadImg(sh + 'kutipan/csirt-kebocoran-data-indonesia-tertinggi-di.png', 1600).then(x => IM.csirt = x),
      loadImg(sh + 'grafik/kebocoran-akun-digital-indonesia-vs.png', 1600).then(x => IM.grafAsean = x),
    ]);
  }

  // Full-frame evidence dengan pixel-verified HL_MAP (termasuk csirt dark: true!)
  const full = () => [
    { im: IM.katadata, t0: A.surfshark + 0.8, t1: A.rank8 - 0.1, dir: 1, crop: [0, 0, 1, 1],
      tab: 'KATADATA / SURFSHARK · 2 JUL 2024', ...hlCues('katadata', A.surfshark + 2.0) },
    { im: IM.csirt, t0: A.csirt + 0.2, t1: A.q1 + 1.8, dir: -1, crop: [0, 0, 1, 1],
      tab: 'TABALONG-CSIRT · 7 NOV 2026', ...hlCues('csirt', A.csirt + 1.3, 0.36) },
  ];

  const BG = [
    { t0: 0, t1: A.cocok, vid: 'term', dim: 0.72, grade: 'saturate(0.42) contrast(1.18)' },
  ];

  const ST = [
    // S0 (0..A.cocok): Frame 1 langsung penuh — Uji Petik Kompas + e-KTP + Kaca Pembesar Audit (tipo.lensa)!
    {
      at: 0, name: 'Uji Petik Kompas', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1410],
      draw(ctx, t) {
        txt(ctx, 'BAB 02 · APAKAH DATA RECEHAN TADI ASLI?', -810, -350, t, 0, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'UJI PETIK DATA BOCOR', -810, -210, t, 0.12, DSP(118), { ls: 2 });
        wrapTxt(ctx, 'Wartawan Harian Kompas membeli paket 0,15 BTC lalu melacaknya langsung ke KTP & KK warga.', -810, -90, 740, 52, SRF(44), t, 0.45, {
          col: ivo(0.88),
        });
        slab(ctx, 'DILACAK LANGSUNG KE DOKUMEN ASLI', -810, 118, t, A.lacak - 0.1, { lime: true, size: 22 });
        if (IM.ektp) {
          const drawEktp = g => evid(g, IM.ektp, 445, 50, 680, t, 0.2, { tab: 'Foto: disdukcapil.bulelengkab.go.id', rot: 2.2 });
          drawEktp(ctx);
          lensa(ctx, 445, 50, t, A.lacak + 0.4, drawEktp, { R: 128, zoom: 1.48, lebar: 460, ayun: 48, dur: 4.5, col: LIME });
        }
        srcTag(ctx, 'Sumber: Investigasi Harian Kompas (29 Okt 2021)', -810, 355, t, 0.4);
      },
    },
    // S1 (A.cocok..A.menggunung): Cocok 100% — Solid Hero Stat + Editorial Checklist (NOL AI-SLOP BOXES!)
    {
      at: A.cocok, via: 'whip', side: -1, name: 'Cocok 100%', tag: '100%',
      x: -1350, z: 2500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        const pct = Math.round(countTo(0, 100, t, A.cocok, 1.2));
        heroStat(ctx, `${pct}%`, 'HASIL PENCOCOKAN DOKUMEN ASLI',
          'cocok identik sampai nama ibu kandung — kunci verifikasi perbankan.', -810, -45, t, A.cocok, {
            size: 250, col: C_RED, accent: C_RED, maxW: 720,
          });
        const fields = [
          ['01', 'NIK 16 DIGIT', 'identitas kependudukan tunggal', LIME],
          ['02', 'NOMOR KARTU KELUARGA', 'hubungan anggota rumah tangga', LIME],
          ['03', 'NOMOR PONSEL AKTIF', 'sasaran empuk penipuan & pinjol', LIME],
          ['04', 'NAMA IBU KANDUNG', 'dipakai bank sebagai kunci rekening!', C_RED],
        ];
        fields.forEach(([num, head, sub, col], i) => {
          const ts = A.cocok + 0.35 + i * 0.65;
          const ry = -215 + i * 165;
          editorialRow(ctx, num, head, sub, 90, ry, 710, t, ts, { accent: col, size: 54, subSize: 26 });
          check(ctx, 760, ry + 2, 26, t, ts + 0.18, { col });
        });
      },
    },
    // S2 (A.menggunung..A.surfshark): Grafik Skala Volume Kasus Kebocoran Data Besar
    {
      at: A.menggunung, via: 'rise', side: 1, name: 'Volume Menggunung', tag: 'SKALA',
      x: 1350, z: 5000, py: -560, yaw: [5, -3], pitch: [5, 7], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'TUMPUKAN INSIDEN KEBOCORAN NASIONAL', -810, -355, t, A.menggunung, MN(20), { ls: 5, col: LIME });
        if (IM.grafSkala) {
          stripAccordion(ctx, IM.grafSkala, 0, 20, 1360, 650, t, A.menggunung, {
            n: 4, shiftAt: A.menggunung + 2.8, accent: LIME,
          });
        }
        srcTag(ctx, 'Sumber: Kompas.id, Katadata, BBC News Indonesia, detikNews', -810, 385, t, A.menggunung + 0.3);
      },
    },
    // S3 (A.surfshark..A.t2026): LIGHT WORLD · Peta Dunia Zoom Indonesia + Solid Hero Stat 94,22 Juta!
    {
      at: A.surfshark, via: 'whip', side: -1, name: 'Peringkat 8 Dunia', tag: '#8 DUNIA',
      x: -1350, z: 7500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        // Peta Dunia Robinson menyorot Indonesia sambil zoom lembut!
        const cs = lerp(10.5, 18.5, E.inOutCubic(inv(A.rank8 - 0.5, A.juta94 + 3.0, t)));
        const M = petaDunia(ctx, 390, 20, cs, t, A.surfshark, { fokus: [118, -2], lime: true, view: [1150, 680] });
        const [ix, iy] = M.at(113, -3);
        pin(ctx, ix, iy, t, A.rank8, { lime: true, label: '#8 DUNIA', right: true });

        const n94 = countTo(0, 94.22, t, A.juta94 - 0.2, 1.0);
        heroStat(ctx, t < A.juta94 - 0.2 ? '#8 DUNIA' : `${n94.toFixed(2).replace('.', ',')} JT`,
          'REKAP SURFSHARK · 2020–2024 (250 NEGARA)',
          'akun digital Indonesia bocor dalam empat tahun terakhir — hampir tiap rumah terserempet.', -810, -55, t, A.surfshark, {
            size: 210, light: true, maxW: 650,
          });
        slab(ctx, 'PERINGKAT KE-8 TERBANYAK DI DUNIA', -810, 228, t, A.rank8, { lime: true, size: 21 });
        srcTag(ctx, 'Sumber: Databoks Katadata (2 Jul 2024) · Surfshark · BINUS · JDIH DPR RI', -810, 360, t, A.surfshark + 0.3);
      },
    },
    // S4 (A.t2026..A.podium): Season 2 Value Flip! ("APAKAH 2026 MEMBAIK?" → "JUARA 1 ASEAN · 1,22 JUTA AKUN!")
    {
      at: A.t2026, via: 'rise', side: 1, name: 'Juara 1 ASEAN 2026', tag: '#1 ASEAN',
      x: 1350, z: 10000, py: -560, yaw: [6, -3], pitch: [5, 6], dist: [1520, 1390],
      draw(ctx, t) {
        valueFlip(ctx, ['APAKAH 2026 MEMBAIK?', 'JUARA 1 ASEAN!', '1,22 JUTA AKUN'], 0, 10, t, A.t2026, {
          w: 1580, h: 760, size: 152,
          pill: ['SEMESTER I 2026 (JAN–JUN)', 'TABALONG-CSIRT & SURFSHARK', 'Q1: 915.746 · Q2: 300.416'],
          flips: [0, Math.max(2.0, A.asean - A.t2026), Math.max(4.5, A.csirt - A.t2026)],
          sub: 'Sumber: csirt.tabalongkab.go.id (7 Nov 2026) · Surfshark',
        });
      },
    },
    // S5 (A.podium..A.sipil): Podium ASEAN — Animated Editorial Bars (NOL BOX SLOP) + Grafik Hidup!
    {
      at: A.podium, via: 'truck', side: -1, name: 'Podium ASEAN', tag: 'ASEAN',
      x: -1350, z: 12500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'PERBANDINGAN ASIA TENGGARA · SEMESTER I 2026', -810, -355, t, A.podium, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'JAUH DI ATAS TETANGGA', -810, -225, t, A.podium + 0.08, DSP(100), { ls: 2 });
        const rows = [
          ['#1 INDONESIA', 1.22, '1,22 JUTA', 'Q1: 915.746  ·  Q2: 300.416', LIME, A.podium + 0.15],
          ['#2 FILIPINA', 0.841, '841 RIBU', 'Q1: 453 ribu akun', IVORY, A.filipina - 0.1],
          ['#3 VIETNAM', 0.653, '653 RIBU', 'Q1: 397 ribu akun', 'rgba(241,239,230,0.55)', A.filipina + 1.4],
        ];
        rows.forEach(([nm, val, disp, sub, col, ts], i) => {
          const k = E.outQuint(inv(ts, ts + 0.75, t));
          if (k <= 0.01) return;
          const ry = -95 + i * 150;
          ctx.save(); ctx.globalAlpha = clamp(k * 1.6);
          setFont(ctx, MN(20, 700), 3); ctx.fillStyle = col; ctx.textAlign = 'left';
          ctx.fillText(nm, -810, ry - 14);
          const bw = (val / 1.22) * 560 * k;
          ctx.fillStyle = 'rgba(241,239,230,0.08)'; ctx.fillRect(-810, ry, 560, 44);
          ctx.fillStyle = col; ctx.fillRect(-810, ry, bw, 44);
          setFont(ctx, DSP(62), 1); ctx.fillStyle = i === 0 ? LIME : IVORY;
          ctx.fillText(disp, -810 + bw + 20, ry + 42);
          setFont(ctx, MN(15, 400), 1); ctx.fillStyle = ivo(0.62);
          ctx.fillText(sub, -810, ry + 70);
          ctx.restore();
        });
        if (IM.grafAsean) {
          evid(ctx, IM.grafAsean, 455, 25, 720, t, A.podium + 0.25, {
            tab: 'TABALONG-CSIRT & SURFSHARK · S1 2026', rot: 1.6,
          });
        }
      },
    },
    // S6 (A.sipil..DUR): Instansi Strategis (INAFIS & BAIS) + Simulasi Notifikasi Telepon Orang Asing!
    {
      at: A.sipil, via: 'whip', side: 1, name: 'INAFIS & BAIS', tag: 'STRATEGIS',
      x: 200, z: 15000, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'LAPORAN JDIH SETJEN DPR RI · BREACHFORUMS', -810, -355, t, A.sipil, MN(20), { ls: 5, col: C_RED });
        fall(ctx, 'MEREMBET KE INSTANSI STRATEGIS', -810, -218, t, A.sipil + 0.08, DSP(104), { ls: 2 });

        editorialRow(ctx, '01', 'INAFIS POLRI', 'peretas MoonzHaxor · data identitas & forensik', -810, -70, 740, t, A.moonz - 0.5, {
          accent: C_RED, size: 68, subSize: 30,
        });
        editorialRow(ctx, '02', 'BAIS TNI', 'selain klaim 3,2M PeduliLindungi & 679 rb surat Presiden', -810, 120, 740, t, A.inafis - 0.3, {
          accent: IVORY, size: 68, subSize: 28,
        });

        // Notifikasi ponsel realistis (skala proporsional 0.62 dari lebar native 1260 supaya 0 clipping!)
        ctx.save();
        ctx.translate(415, -30);
        ctx.scale(0.62, 0.62);
        notif(ctx, 0, 0, t, A.telepon - 0.2, {
          w: 1240,
          app: 'TELEPON MASUK · TAK DIKENAL',
          waktu: 'barusan',
          judul: 'Hafal nama & alamat rumahmu?',
          isi: ['Itulah jejak nyata kebocoran data warga.'],
        });
        ctx.restore();
        stamp(ctx, 'KENAPA BRANKAS GAMPANG JEBOL?', 415, 215, t, A.bab3, { size: 62, rot: -2.0 });
        srcTag(ctx, 'Sumber: JDIH Setjen DPR RI (20 Sep 2024) · BBC News Indonesia', -810, 360, t, A.sipil + 0.3);
      },
    },
  ];

  const under = (ctx, t, pre) => {
    const isLight = t >= A.surfshark - 0.15 && t < A.t2026 - 0.15;
    if (pre) { theme(isLight); return; }
    if (!isLight) layarFoto(ctx, W, H, BG, t, { IM, dim: 0.70 });
  };

  return makeChapter({
    B, ST, load, label: 'BAB 02', gate: 0.75,
    full,
    under,
    over: (ctx, t) => kreditLatar(ctx, W, H, BG, t, false),
  });
}
