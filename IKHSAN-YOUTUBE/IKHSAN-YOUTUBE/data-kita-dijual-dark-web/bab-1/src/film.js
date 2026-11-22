// Bab 1 · Harga Obral Identitas Kita di Pasar Gelap (V2 Zero-Slop Documentary: 12 Stasiun Rapat, Nol Dead Visual, Stabilo Pixel-Verified!)
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, fall, markLine, slab, txt, srcTag, countTo, evid, theme,
} from './kit.js';
import { stamp } from './draw.js';
import { C_RED } from './fisika.js';
import { layarFoto, kreditLatar } from './lab.js';
import {
  loadD, D01_FILES, D02_FILES, drawD01Card, drawD02Receipt,
  hlCues, wrapTxt, heroStat, editorialRow,
} from './vault.js';
import { browser, kursorJalan } from './pustaka/ui.js';
import { pintu } from './pustaka/prop.js';
import { meter } from './pustaka/data.js';
import { screenCrack } from './pustaka/efek.js';
import { gravityBake, gravityBlocks, kutipanLepas, stripAccordion } from './pustaka/season2.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {};
  let D01 = {}, D02 = {}, GSIM = null;

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadD('D01', D01_FILES, 1600).then(x => D01 = x),
      loadD('D02', D02_FILES, 1600).then(x => D02 = x),
      loadImg(sh + 'kutipan/kompas-peretas-mengobral-data-warga.png', 1600).then(x => IM.kompas = x),
      loadImg(sh + 'kutipan/cnnindonesia-penjual-data-bocor-bpjs-minta-tebusan.png', 1600).then(x => IM.cnnBpjs = x),
      loadImg(sh + 'stok-situs/pexels-a-blue-sim-card-on-a-dark-33092906.jpg', 1400).then(x => IM.simDark = x),
      loadImg(sh + 'kutipan/tekno-data-1-3-miliar-sim-card-indonesia.png', 1600).then(x => IM.kompasSim = x),
      loadImg(sh + 'stok-situs/pixabay-close-up-of-phone-sim-card-tray-4475680.jpg', 1400).then(x => IM.simTray = x),
      loadImg(sh + 'kutipan/bkpsdm-bahaya-kebocoran-data-tokopedia-sentuh.png', 1600).then(x => IM.bkpsdm = x),
      loadImg(sh + 'kutipan/bbc-sebanyak-34-juta-data-pemegang-paspor.png', 1600).then(x => IM.bbcPaspor = x),
      loadImg(sh + 'kutipan/liputan6-7-fakta-kasus-dugaan-204-juta-data-kpu.png', 1600).then(x => IM.lipKpu = x),
      loadImg(sh + 'kutipan/jdih-jaringan-dokumentasi-dan-informasi-hukum.png', 1600).then(x => IM.jdih = x),
      loadImg(sh + 'grafik/harga-jual-paket-data-bocor-indonesia-di.png', 1600).then(x => IM.grafikHarga = x),
    ]);
    GSIM = gravityBake({ n: 26, w: 680, floorY: 250, seed: 49 });
  }

  // Full-frame tilted article + 100% pixel-verified HL_MAP stabilo (Nol jeda kosong setelah keluar!)
  const full = () => [
    { im: IM.kompas, t0: A.kompas + 0.15, t1: A.kotz + 2.2, dir: 1, crop: [0, 0, 1, 1],
      tab: 'KOMPAS.ID · 29 OKT 2021', ...hlCues('kompas', A.kompas + 1.1, 0.36) },
    { im: IM.kompasSim, t0: A.sim745 - 5.2, t1: A.sim745 - 0.35, dir: -1, crop: [0, 0, 1, 1],
      tab: 'KOMPAS.COM · 1 SEP 2022', ...hlCues('kompasSim', A.sim745 - 3.9, 0.36) },
    { im: IM.bbcPaspor, t0: A.paspor + 2.6, t1: A.paspor + 7.4, dir: 1, crop: [0, 0, 1, 1],
      tab: 'BBC NEWS INDONESIA · 7 JUL 2023', ...hlCues('bbcPaspor', A.paspor + 3.6, 0.36) },
    { im: IM.lipKpu, t0: A.kpu + 2.0, t1: A.kpu204 - 0.25, dir: -1, crop: [0, 0, 1, 1],
      tab: 'LIPUTAN6.COM · 30 NOV 2023', ...hlCues('lipKpu', A.kpu + 2.9, 0.38) },
  ];

  const BG = [
    { t0: A.bjorka, t1: A.sim745 - 5.2, im: 'simDark', dim: 0.68, grade: 'saturate(0.75) contrast(1.16)' },
    { t0: A.sim745 - 0.35, t1: A.toko91, im: 'simTray', dim: 0.70, grade: 'saturate(0.55) contrast(1.18)' },
  ];

  const RECEIPT_ITEMS = [
    { at: A.fotokopi + 0.3, label: 'PARKIR MOTOR', sub: '1 kali parkir jalan', price: 'Rp2.000', hot: true },
    { at: A.fotokopi + 1.0, label: '1 DATA BPJS', sub: '279 jt · 0,15 BTC', price: 'Rp0,49', red: true },
    { at: A.fotokopi + 1.7, label: '1 BARIS SIM CARD', sub: '1,3 miliar · US$50k', price: 'Rp0,57', red: true },
    { at: A.fotokopi + 2.4, label: '1 AKUN TOKOPEDIA', sub: '91 juta · US$5k', price: 'Rp0,82' },
    { at: A.fotokopi + 3.1, label: '1 DATA PASPOR RI', sub: '34,9 juta · US$10k', price: 'Rp4,30' },
    { at: A.fotokopi + 3.8, label: '1 PEMILIH KPU', sub: '204,8 juta · US$74k', price: 'Rp5,86' },
    { at: A.fotokopi + 4.5, label: '1 DATA NPWP', sub: '6,6 juta · US$10k', price: 'Rp25' },
    { at: A.fotokopi + 5.2, label: '1 DATA ASN BKN', sub: '4,75 juta · US$10k', price: 'Rp33,6' },
  ];

  const ST = [
    // S0 (0..A.kompas): Tebak Harga Identitas Kita — teks terkunci ketat di kolom kiri maxW=680 (NOL tabrakan D01!)
    {
      at: 0, name: 'Tebak Harga', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1420],
      draw(ctx, t, c) {
        txt(ctx, 'BAB 01 · HARGA OBRAL PASAR GELAP', -810, -350, t, 0, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'BERAPA HARGA', -810, -210, t, 0.12, DSP(120), { ls: 2 });
        markLine(ctx, 'NOMOR ', 'INDUKMU', '?', -810, -90, t, 0.42, A.keliru - 0.5, DSP(120), { align: 'left', ls: 2 });
        wrapTxt(ctx, 'Kalau mengira jutaan rupiah, tebakan itu keliru besar.', -810, 32, 680, 52, SRF(44), t, A.keliru, {
          col: ivo(0.88),
        });
        slab(ctx, 'OBRAL MASSAL DI FORUM GELAP', -810, 185, t, A.keliru + 1.0, { lime: true, size: 21 });
        drawD01Card(ctx, D01, 445, 95, 0.40, t, { camX: c.yaw * 10, tTag: A.keliru + 0.35, price: 'Rp0,49' });
      },
    },
    // S1 (A.kompas..A.bpjs279): RaidForums "Kotz" UI Simulasi (mengisi layar penuh tepat setelah evidFull Kompas keluar — NOL DEAD VISUAL di 00:18.12!)
    {
      at: A.kompas, via: 'whip', side: -1, name: 'RaidForums Kotz', tag: 'KOTZ',
      x: -1350, z: 2500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'OKTOBER 2021 · FORUM GELAP RAIDFORUMS', -810, -350, t, A.kompas, MN(20), { ls: 4, col: LIME });
        fall(ctx, 'AKUN "KOTZ"', -810, -205, t, A.kotz - 0.4, DSP(122), { ls: 2 });
        wrapTxt(ctx, 'memajang ratusan juta data penduduk RI di lapak forum peretas.', -810, -88, 660, 50, SRF(42), t, A.kotz + 0.1, {
          col: ivo(0.88),
        });
        slab(ctx, 'LAPAK AKTIF · 279 JUTA BARIS DATA', -810, 72, t, A.kotz + 1.8, { lime: true, size: 21 });
        browser(ctx, 355, 25, 860, 510, t, A.kotz, {
          url: 'raidforums.com/Thread-SELLING-ID-279M',
          cps: 32,
          ukuran: 27,
          jeda: 0.42,
          baris: [
            ['SELLER : Kotz [VIP]', true],
            ['TARGET : 279.000.000 Warga RI', true],
            ['FIELDS : NIK · KK · Nama · HP · Gaji', false],
            ['PRICE  : 0.15 BTC (~Rp86–133 Juta)', true],
            ['STATUS : SAMPEL 1 JUTA GRATIS', false],
          ],
        });
        kursorJalan(ctx, [
          [A.kotz + 2.2, 680, 220],
          [A.kotz + 3.8, 320, 48, true],
          [A.kotz + 5.1, 440, 128, true],
        ], t, { s: 1.4 });
        srcTag(ctx, 'Sumber: Investigasi Kompas.id (29 Okt 2021)', -810, 355, t, A.kotz);
      },
    },
    // S2 (A.bpjs279..A.rp49): 279 Juta BPJS (Solid Hero Stat — NOL hollow outline, NOL teks bertumpuk!) + CNN Indonesia hidup!
    {
      at: A.bpjs279, via: 'truck', side: 1, name: '279 Juta BPJS', tag: '279 JT',
      x: 1350, z: 5000, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        const nBpjs = Math.round(countTo(0, 279, t, A.bpjs279, 0.9));
        heroStat(ctx, `${nBpjs} JT`, 'IDENTIK PESERTA BPJS KESEHATAN',
          'NIK, kartu keluarga, alamat rumah, nomor ponsel, hingga status gaji.', -810, -85, t, A.bpjs279, {
            size: 220, col: IVORY, accent: LIME, maxW: 720,
          });
        // Bar konversi harga Bitcoin hidup tepat di ketukan A.btc015!
        const kBtc = E.outQuint(inv(A.btc015, A.btc015 + 0.5, t));
        if (kBtc > 0.01) {
          ctx.save(); ctx.globalAlpha = kBtc;
          txt(ctx, 'DITEBUS PAKET 270 JUTA DATA', -810, 178, t, A.btc015, MN(18), { ls: 3, col: LIME });
          slab(ctx, '0,15 BITCOIN  →  Rp86 JT – Rp133,05 JUTA', -810, 232, t, A.btc015 + 0.2, { lime: true, size: 22 });
          ctx.restore();
        }
        if (IM.cnnBpjs) {
          evid(ctx, IM.cnnBpjs, 435, 10, 740, t, A.bpjs279 + 0.1, {
            tab: 'CNN INDONESIA · 21 MEI 2021', rot: 2.0,
            ...hlCues('cnnBpjs', A.bpjs279 + 1.4),
          });
        }
        srcTag(ctx, 'Sumber: Kompas.id (29 Okt 2021) · CNN Indonesia (21 Mei 2021)', -810, 360, t, A.bpjs279 + 0.2);
      },
    },
    // S3 (A.rp49..A.bjorka): Frame 1 langsung kalkulator hidup Rp133,05 JT ÷ 270 JT → Rp0,49! (NOL DEAD VISUAL di 00:37.86!)
    {
      at: A.rp49, via: 'rise', side: -1, name: 'Rp0,49 vs Parkir', tag: 'Rp0,49',
      x: -1350, z: 7500, py: -560, yaw: [-5, 3], pitch: [5, 7], dist: [1500, 1380],
      draw(ctx, t, c) {
        // Frame 1 (A.rp49): rumus pecahan hidup + angka yang menyusut turun ke Rp0,49
        txt(ctx, 'HITUNGAN ECERAN PER ORANG', -810, -355, t, A.rp49, MN(20), { ls: 5, col: LIME });
        const kEq = E.outQuint(inv(A.rp49, A.rp49 + 0.45, t));
        ctx.save(); ctx.globalAlpha = kEq;
        setFont(ctx, DSP(72), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left';
        ctx.fillText('Rp133.050.000', -810, -248);
        ctx.fillStyle = LIME; ctx.fillRect(-810, -228, 430 * kEq, 4);
        setFont(ctx, MN(26, 700), 2); ctx.fillStyle = ivo(0.82);
        ctx.fillText('÷  270.000.000  DATA WARGA', -810, -184);
        ctx.restore();

        // Nilai utama langsung hidup dari Frame 1: menyusut cepat sampai mengunci Rp0,49 di A.angka49!
        const liveVal = t < A.angka49
          ? lerp(490, 0.49, E.outExpo(inv(A.rp49 + 0.3, A.angka49, t)))
          : 0.49;
        const dispPrice = liveVal >= 10 ? `Rp${Math.round(liveVal)}` : `Rp${liveVal.toFixed(2).replace('.', ',')}`;
        heroStat(ctx, dispPrice, null,
          'setengah perak per satu identitas warga Indonesia.', -810, 68, t, A.rp49 + 0.1, {
            size: 235, col: LIME, accent: LIME, maxW: 720,
          });

        slab(ctx, 'PARKIR MOTOR Rp2.000  =  4.081 DATA WARGA', -810, 265, t, A.parkir - 0.1, { lime: true, size: 22 });

        // Kanan: Kartu D01 + Karcis Parkir tampil sejak Frame 1, lalu Gravity Blocks mengguyur di A.parkir!
        if (t < A.parkir + 0.15) {
          drawD01Card(ctx, D01, 430, 55, 0.40, t, {
            camX: c.yaw * 10, tTag: A.rp49, tKarcis: A.angka49 - 0.3, price: 'Rp0,49',
            a: 1 - E.inCubic(inv(A.parkir - 0.2, A.parkir + 0.15, t)),
          });
        }
        if (GSIM && t >= A.parkir - 0.05) {
          gravityBlocks(ctx, GSIM, 435, 90, t, A.parkir, { accent: LIME });
          txt(ctx, 'SKALA 4.081 DATA = 1 KARCIS PARKIR', 435, -310, t, A.parkir, MN(19), { align: 'center', ls: 3, col: LIME });
        }
      },
    },
    // S4 (A.bjorka..A.toko91): 1,3 Miliar SIM Card (Bjorka, 87 GB, US$50.000 -> Rp0,57)
    {
      at: A.bjorka, via: 'whip', side: 1, name: '1,3 Miliar SIM Card', tag: 'SIM',
      x: 1350, z: 10000, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        const nSim = countTo(0, 1.3, t, A.bjorka, 0.85);
        heroStat(ctx, `${nSim.toFixed(1).replace('.', ',')} MILIAR`, 'SEPTEMBER 2022 · BREACHED FORUMS · BJORKA',
          'baris registrasi SIM card: NIK, nomor ponsel, operator, & tanggal daftar.', -810, -85, t, A.bjorka, {
            size: 215, col: IVORY, accent: LIME, maxW: 860,
          });
        meter(ctx, 180, -140, 580, inv(A.sim13, A.sim13 + 3.2, t), 'UKURAN TUMPUKAN FILE: 87 GB', E.outCubic(inv(A.bjorka + 0.3, A.bjorka + 0.9, t)));
        slab(ctx, 'US$50.000 (Rp700–745 JUTA)', 180, -25, t, A.sim745 - 0.3, { size: 23 });
        markLine(ctx, 'ECERAN CUMA ', 'Rp0,57', ' / NOMOR', -810, 238, t, A.sim57 - 0.15, A.sim57 + 0.35, DSP(108), { align: 'left', ls: 2 });
        srcTag(ctx, 'Sumber: KOMPAS.com (1 Sep 2022) · CNBC Indonesia · Naval CSIRT TNI AL', -810, 355, t, A.bjorka + 0.3);
      },
    },
    // S5 (A.toko91..A.paspor): 91 Juta Tokopedia (Alive BKPSDM + Stabilo + ScreenCrack 8 Kredit = Rp31.924!)
    {
      at: A.toko91, via: 'truck', side: -1, name: '91 Juta Tokopedia', tag: '91 JT',
      x: -1350, z: 12500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        if (IM.bkpsdm) {
          evid(ctx, IM.bkpsdm, -370, 20, 820, t, A.toko91, {
            tab: 'BKPSDM DEMAK · 6 JUL 2020', rot: -1.6,
            ...hlCues('bkpsdm', A.toko91 + 1.3),
          });
        }
        heroStat(ctx, '91 JUTA', 'MEI 2020 · EMPIRE MARKET → RAIDFORUMS',
          'akun Tokopedia awalnya ditawarkan US$5.000 (~Rp0,82 / akun).', 120, -108, t, A.toko91, {
            size: 190, col: IVORY, accent: LIME, maxW: 690,
          });
        if (t < A.kredit8 + 0.12) {
          ctx.save();
          ctx.globalAlpha *= 1 - E.inCubic(inv(A.kredit8 - 0.08, A.kredit8 + 0.12, t));
          slab(ctx, 'MEI 2020: US$5.000 (~Rp0,82 / AKUN)', 120, 96, t, A.toko82 - 0.2, { size: 21 });
          ctx.restore();
        }
        if (t >= A.kredit8 - 0.12) {
          screenCrack(ctx, 430, 110, t, A.kredit8, { r: 0.45, seed: 91 });
          kutipanLepas(ctx, 455, 220, 680, 230, '8 KREDIT = Rp31.924', t, A.kredit8, {
            tag: 'OBRAL JULI 2020', sub: 'anjlok jadi ~Rp0,00035 per akun', accent: LIME, size: 84,
          });
        }
      },
    },
    // S6 (A.paspor..A.kpu): 34,9 Juta Paspor RI (Rp4,30) + Alive BBC Paspor 3-baris Stabilo!
    {
      at: A.paspor, via: 'whip', side: 1, name: '34,9 Juta Paspor', tag: 'PASPOR',
      x: 1350, z: 15000, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        heroStat(ctx, '34,9 JT', 'JULI 2023 · 34.900.867 BARIS (4 GB)',
          'nama lengkap, tanggal lahir, & nomor paspor pemegang paspor RI.', -810, -85, t, A.paspor, {
            size: 215, col: IVORY, accent: LIME, maxW: 720,
          });
        slab(ctx, 'US$10.000 (Rp150 JUTA)  =  Rp4,30 / PASPOR', -810, 198, t, A.paspor + 5.0, { lime: true, size: 22 });
        if (IM.bbcPaspor) {
          evid(ctx, IM.bbcPaspor, 435, 15, 750, t, A.paspor + 0.1, {
            tab: 'BBC NEWS INDONESIA · 7 JUL 2023', rot: 1.8,
            ...hlCues('bbcPaspor', A.paspor + 1.2, 0.35),
          });
        }
        srcTag(ctx, 'Sumber: BBC News Indonesia (7 Jul 2023) · Kumparan', -810, 355, t, A.paspor + 0.3);
      },
    },
    // S7 (A.kpu..A.npwp): 204,8 Juta DPT KPU (Solid Bold Hero Stat + Alive Liputan6 2-baris Pixel-Exact Stabilo — NOL OVERLAP!)
    {
      at: A.kpu, via: 'rise', side: -1, name: '204,8 Juta DPT KPU', tag: 'KPU',
      x: -1350, z: 17500, py: -560, yaw: [-5, 3], pitch: [5, 7], dist: [1520, 1390],
      draw(ctx, t) {
        heroStat(ctx, '204,8 JT', 'NOVEMBER 2023 · BREACHFORUMS · JIMBO',
          'daftar pemilih tetap Pemilu 2024 — alamat rumah, NIK, & nomor TPS.', -810, -85, t, A.kpu, {
            size: 215, col: IVORY, accent: LIME, maxW: 730,
          });
        slab(ctx, 'US$74.000 (Rp1,2 MILIAR)  =  Rp5,86 / PEMILIH', -810, 205, t, A.kpu586, { lime: true, size: 22 });
        if (IM.lipKpu) {
          evid(ctx, IM.lipKpu, 440, 10, 740, t, A.kpu + 0.12, {
            tab: 'LIPUTAN6.COM · 30 NOV 2023', rot: -1.8,
            ...hlCues('lipKpu', A.kpu + 1.2, 0.38),
          });
        }
        srcTag(ctx, 'Sumber: liputan6.com (30 Nov 2023) · CNBC Indonesia · Kumparan', -810, 360, t, A.kpu + 0.3);
      },
    },
    // S8 (A.npwp..A.jejer): 6,6 Juta NPWP & 4,75 Juta ASN BKN — Swiss Editorial Rows + Perbandingan Bar (NOL AI-SLOP CARDS!)
    {
      at: A.npwp, via: 'whip', side: 1, name: 'NPWP & ASN BKN', tag: 'NPWP/BKN',
      x: 1350, z: 20000, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'SEPTEMBER 2024 · PAJAK & PEGAWAI NEGERI', -810, -355, t, A.npwp, MN(20), { ls: 5, col: LIME });
        editorialRow(ctx, '01', '6,6 JUTA NPWP', 'US$10.000 (Rp150 Juta)  →  Rp25 / wajib pajak', -810, -185, 760, t, A.npwp, {
          accent: LIME, size: 80, subSize: 32,
        });
        editorialRow(ctx, '02', '4,75 JUTA ASN BKN', 'US$10.000 (Rp160 Juta)  →  Rp33,6 / pegawai negeri', -810, 35, 760, t, A.bkn, {
          accent: C_RED, size: 80, subSize: 32,
        });
        // Skala visual eceran Rp0,49 vs Rp25 vs Rp33,6
        const kBar = E.outQuint(inv(A.npwp + 1.2, A.npwp + 2.2, t));
        if (kBar > 0.01) {
          ctx.save(); ctx.globalAlpha = kBar;
          setFont(ctx, MN(16, 700), 2); ctx.fillStyle = ivo(0.68); ctx.textAlign = 'left';
          ctx.fillText('PERBANDINGAN HARGA ECERAN PER ORANG', -810, 185);
          const bars = [
            ['BPJS Rp0,49', 0.03, LIME],
            ['NPWP Rp25', 0.74, IVORY],
            ['ASN BKN Rp33,6', 1.0, C_RED],
          ];
          bars.forEach(([lb, frac, col], i) => {
            const by = 205 + i * 42;
            const kb = E.outCubic(inv(A.npwp + 1.4 + i * 0.4, A.npwp + 2.2 + i * 0.4, t));
            ctx.fillStyle = 'rgba(241,239,230,0.08)'; ctx.fillRect(-810, by, 520, 22);
            ctx.fillStyle = col; ctx.fillRect(-810, by, 520 * frac * kb, 22);
            setFont(ctx, MN(16, 700), 2); ctx.fillStyle = IVORY;
            ctx.fillText(lb, -274, by + 17);
          });
          ctx.restore();
        }
        if (IM.jdih) {
          evid(ctx, IM.jdih, 455, 15, 740, t, A.npwp + 0.35, {
            tab: 'JDIH SETJEN DPR RI · 20 NOV 2026', rot: 2.0,
            ...hlCues('jdih', A.npwp + 1.6),
          });
        }
        srcTag(ctx, 'Sumber: detikNews (19 Sep 2024) · JDIH Setjen DPR RI', -810, 368, t, A.npwp + 0.4);
      },
    },
    // S9 (A.jejer..A.fotokopi): Grafik Perbandingan Harga Jual Paket Data Bocor RI
    {
      at: A.jejer, via: 'truck', side: -1, name: 'Grafik Perbandingan', tag: 'GRAFIK',
      x: -1350, z: 22500, py: -560, yaw: [-5, 3], pitch: [5, 6], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'PERBANDINGAN HARGA BORONGAN PASAR GELAP', -810, -355, t, A.jejer, MN(20), { ls: 5, col: LIME });
        if (IM.grafikHarga) {
          stripAccordion(ctx, IM.grafikHarga, 0, 22, 1380, 660, t, A.jejer, {
            n: 4, shiftAt: A.jejer + 3.0, accent: LIME, index: true,
          });
        }
        slab(ctx, 'TERMURAH Rp0,49 (BPJS)  ·  TERMAHAL Rp33,6 (BKN)', 0, 345, t, A.jejer + 2.6, { align: 'center', lime: true, size: 19 });
        srcTag(ctx, 'Sumber: Kompas.com, CNBC Indonesia, JDIH DPR, detikNews, Kompas.id', -810, 392, t, A.jejer + 0.3);
      },
    },
    // S10 (A.fotokopi..A.kantor): LIGHT WORLD TURN — Analogi Fotokopi + Ahpo D02 Mesin Kasir & Pita Struk 8 Harga!
    {
      at: A.fotokopi, via: 'rise', side: 1, name: 'Struk Pasar Gelap', tag: 'STRUK',
      light: true,
      x: 0, z: 25100, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t, c) {
        txt(ctx, 'KENAPA SEMURAH KERUPUK WARUNG?', -810, -345, t, A.fotokopi, MN(20), { ls: 5, col: '#4B6800' });
        fall(ctx, 'FOTOKOPI TANPA', -810, -205, t, A.fotokopi + 0.12, DSP(114), { ls: 2, col: '#15160F' });
        markLine(ctx, 'MODAL ', 'KERTAS', '', -810, -85, t, A.fotokopi + 0.45, A.fotokopi + 0.85, DSP(114), { align: 'left', ls: 2 });
        wrapTxt(ctx, 'Sekali disalin, pencuri bisa menjual berkas yang sama berulang kali tanpa modal.', -810, 28, 660, 48, SRF(42), t, A.fotokopi + 1.5, {
          col: 'rgba(21,22,15,0.84)',
        });
        drawD02Receipt(ctx, D02, 340, 20, 0.44, t, RECEIPT_ITEMS, {
          camX: c.yaw * 10,
          scanTimes: RECEIPT_ITEMS.map(x => x.at),
        });
      },
    },
    // S11 (A.kantor..DUR): Kontras Pintu Akses Korporasi (prop.pintu + Solid Hero Stat Rp30–60 JT!)
    {
      at: A.kantor, via: 'whip', side: -1, name: 'Kunci Kantor Besar', tag: 'RP60 JT',
      x: 1300, z: 27700, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        pintu(ctx, -540, 20, 1.05, t, A.kantor, {
          tOpen: A.kaspersky - 0.1, icon: 'gembok', no: 'KORPORASI', label: 'AKSES JARINGAN',
        });
        heroStat(ctx, 'Rp30–60 JT', 'KONTRAST · AKSES AWAL JARINGAN KANTOR BESAR',
          'satu pintu masuk perusahaan — jutaan kali lipat di atas Rp0,49 data warga.', -160, -70, t, A.kantor, {
            size: 205, col: LIME, accent: LIME, maxW: 920,
          });
        stamp(ctx, 'APAKAH DATA RECEHAN INI ASLI?', 290, 240, t, A.bab2, { size: 70, rot: -1.8 });
        srcTag(ctx, 'Sumber: Kaspersky DFI & Investor.id (US$2.000–US$4.000)', -160, 355, t, A.kantor + 0.5);
      },
    },
  ];

  const under = (ctx, t, pre) => {
    const isLight = t >= A.fotokopi - 0.15 && t < A.kantor - 0.15;
    if (pre) { theme(isLight); return; }
    if (!isLight) layarFoto(ctx, W, H, BG, t, { IM, dim: 0.68 });
  };

  return makeChapter({
    B, ST, load, label: 'BAB 01', gate: 0.75,
    full,
    under,
    over: (ctx, t) => kreditLatar(ctx, W, H, BG, t, false),
  });
}
