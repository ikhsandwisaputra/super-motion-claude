// Bab 3 · Kenapa Bisa Jebol Terus? (V2 Zero-Slop Documentary: D03/D04, Browser sidalih.kpu.go.id, Kursor Klik Virus + ScreenCrack, Jam Forensik, Waffle 98 vs 2, Rute Surabaya→Batam!)
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, loadVid, fall, markLine, slab, txt, srcTag, countTo, theme,
} from './kit.js';
import { drawAhpoLayered, ahpoPt, C_RED, C_AMBER } from './fisika.js';
import { layarFoto, kreditLatar } from './lab.js';
import {
  loadD, D03_FILES, D04_FILES, drawD04Vault,
  hlCues, wrapTxt, heroStat, editorialRow,
} from './vault.js';
import { browser, kursorJalan } from './pustaka/ui.js';
import { jam } from './pustaka/prop.js';
import { waffle } from './pustaka/data.js';
import { petaPulau, pinKota, ruteBusur, KOTA } from './pustaka/peta.js';
import { screenCrack } from './pustaka/efek.js';
import { kutipanLepas, renderLumaSeam } from './pustaka/season2.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {};
  let D03 = {}, D04 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadD('D03', D03_FILES, 1600).then(x => D03 = x),
      loadD('D04', D04_FILES, 1600).then(x => D04 = x),
      loadVid(sh + 'vid/', 'hands_typing').then(x => IM.hands = x),
      loadImg(sh + 'peta/surabaya-jawa-timur-3d_gelap-z13.png', 1600).then(x => IM.petaSby3d = x),
      loadImg(sh + 'peta/surabaya-jawa-timur-satelit-z12.png', 1600).then(x => IM.petaSbySat = x),
      loadImg(sh + 'kutipan/cnnindonesia-kronologi-peretasan-pdns-diawali.png', 1600).then(x => IM.cnnPdns = x),
      loadImg(sh + 'stok-situs/pexels-close-up-of-tower-servers-in-a-17489151.jpg', 1400).then(x => IM.tower = x),
      loadImg(sh + 'cc/commons-mprdprbuilding.jpg', 1400).then(x => IM.mprdpr = x),
      loadImg(sh + 'kutipan/tekno-kepala-bssn-hanya-2-persen-data-di-pdns.png', 1600).then(x => IM.kompas2 = x),
      loadImg(sh + 'stok-situs/pixabay-technician-connecting-cables-in-4922449.jpg', 1400).then(x => IM.tech = x),
    ]);
  }

  // Pixel-verified HL_MAP stabilo (termasuk kompas2 dark: true!)
  const full = () => [
    { im: IM.cnnPdns, t0: A.bssn + 0.5, t1: A.defender - 0.25, dir: 1, crop: [0, 0, 1, 1],
      tab: 'CNN INDONESIA · 26 JUN 2024', ...hlCues('cnnPdns', A.bssn + 1.8, 0.42) },
    { im: IM.kompas2, t0: A.hinsa + 0.6, t1: A.duaPersen + 1.4, dir: -1, crop: [0, 0, 1, 1],
      tab: 'KOMPAS.COM · 28 JUN 2024', ...hlCues('kompas2', A.hinsa + 1.8, 0.42) },
  ];

  const BG = [
    { t0: A.p1, t1: A.p2, vid: 'hands', dim: 0.74, grade: 'saturate(0.40) contrast(1.16)' },
    { t0: A.tgl17, t1: A.backupTanya, im: 'tower', dim: 0.68, grade: 'saturate(0.70) contrast(1.18)' },
    { t0: A.backupTanya, t1: A.hinsa + 0.6, im: 'mprdpr', dim: 0.68, grade: 'saturate(0.48) contrast(1.15)',
      cap: 'GEDUNG NUSANTARA MPR / DPR RI', kredit: 'Foto: Davidelit via Wikimedia Commons · Domain Publik' },
    { t0: A.perbssn, t1: DUR, im: 'tech', dim: 0.68, grade: 'saturate(0.55) contrast(1.16)' },
  ];

  const ST = [
    // S0 (0..A.p1): LIGHT WORLD — Frame 1 langsung tampil D03 trio & judul (NOL tunggu 5 detik!)
    {
      at: 0, name: '3 Penyakit Kronis', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1410],
      draw(ctx, t, c) {
        txt(ctx, 'BAB 03 · KENAPA BRANKAS DIGITAL JEBOL TERUS?', -810, -350, t, 0, MN(20), { ls: 5, col: '#4B6800' });
        fall(ctx, '3 PENYAKIT KRONIS', -810, -205, t, 0.12, DSP(126), { ls: 2, col: '#15160F' });
        wrapTxt(ctx, 'Bayangkan pusat data seperti brankas rumah — ada tiga celah fatal yang berulang.', -810, -90, 820, 48, SRF(44), t, 0.4, {
          col: 'rgba(21,22,15,0.84)',
        });
        drawAhpoLayered(ctx, [
          { im: D03.brankas, par: 0.92, a: 1 },
          { im: D03.kunci, par: 1.0, a: 1 },
          { im: D03.folder, par: 0.94, a: 1 },
        ], 0, 155, 0.42, c.yaw * 10, 0, E.outQuint(inv(0.1, 0.7, t)));
        if (t >= A.tiga - 0.1) {
          slab(ctx, '01 PLAINTEXT', -520, 345, t, A.tiga, { align: 'center', size: 18 });
          slab(ctx, '02 KUNCI ADMIN', 0, 345, t, A.tiga + 0.35, { align: 'center', size: 18 });
          slab(ctx, '03 BACKUP 2%', 520, 345, t, A.tiga + 0.7, { align: 'center', lime: true, size: 18 });
        }
      },
    },
    // S1 (A.p1..A.p2): Penyakit 01 — Data Telanjang (Plaintext) + Browser Database + Brankas Kaca D03
    {
      at: A.p1, via: 'whip', side: -1, name: '01 · Plaintext', tag: 'PLAINTEXT',
      x: -1350, z: 2500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t, c) {
        txt(ctx, 'PENYAKIT 01 · TANPA PENGACAK (ENKRIPSI)', -810, -350, t, A.p1, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'DATA TELANJANG', -810, -210, t, A.p1 + 0.1, DSP(116), { ls: 2 });
        markLine(ctx, 'DISIMPAN ', 'PLAINTEXT', '', -810, -96, t, A.p1 + 0.45, A.plaintext - 0.2, DSP(108), { align: 'left', ls: 2 });
        wrapTxt(ctx, 'Sandi akun memang diacak, tapi nama, email, & nomor HP terbuka jelas di balik kaca.', -810, 12, 740, 48, SRF(42), t, A.plaintext - 0.1, {
          col: ivo(0.88),
        });
        slab(ctx, 'KASUS 91 JUTA AKUN TOKOPEDIA (2020)', -810, 178, t, A.toko - 0.1, { lime: true, size: 21 });

        drawAhpoLayered(ctx, [
          { im: D03.bayangan, par: 0.85, a: 0.85 },
          { im: D03.brankas, par: 0.95, a: 1 },
        ], 980, 40, 0.50, c.yaw * 10, 0, E.outQuint(inv(A.p1, A.p1 + 0.45, t)));

        const [bx, by] = ahpoPt(900, 1180, 980, 40, 0.50);
        const kp = E.outQuint(inv(A.p1 + 0.4, A.p1 + 0.9, t));
        if (kp > 0) {
          ctx.save(); ctx.globalAlpha = kp; ctx.textAlign = 'center';
          setFont(ctx, MN(20, 700), 2); ctx.fillStyle = LIME; ctx.fillText('PASSWORD: ******** ✓', bx, by - 64);
          setFont(ctx, MN(22, 700), 2); ctx.fillStyle = C_RED;
          ctx.fillText('NAMA: TERBUKA', bx, by + 4);
          ctx.fillText('NO. HP: 0812-XXXX', bx, by + 48);
          ctx.fillText('EMAIL: TERBUKA', bx, by + 92);
          ctx.restore();
        }
        srcTag(ctx, 'Sumber: Kompas.id & BKPSDM Kab. Demak (Kasus 91 Juta Akun 2020)', -810, 355, t, A.p1 + 0.4);
      },
    },
    // S2 (A.p2..A.kaspersky): Penyakit 02 — Browser sidalih.kpu.go.id + Kunci Admin KPU ditarik Kail Phishing D03!
    {
      at: A.p2, via: 'rise', side: 1, name: '02 · Role Admin KPU', tag: 'ADMIN',
      x: 1350, z: 5000, py: -560, yaw: [5, -3], pitch: [5, 7], dist: [1520, 1390],
      draw(ctx, t, c) {
        txt(ctx, 'PENYAKIT 02 · MASUK LEWAT PINTU DEPAN', -810, -355, t, A.p2, MN(20), { ls: 5, col: LIME });
        markLine(ctx, 'KUNCI ', 'ROLE ADMIN', ' KPU', -810, -218, t, A.p2 + 0.1, A.admin - 0.1, DSP(108), { align: 'left', ls: 2 });

        browser(ctx, -370, 88, 860, 440, t, A.p2 + 0.2, {
          url: 'sidalih.kpu.go.id/admin/dashboard',
          cps: 26,
          ukuran: 26,
          jeda: 0.48,
          baris: [
            ['LOGIN  : Akun Role Admin KPU', true],
            ['TARGET : 204.800.000 Data Pemilih', true],
            ['METODE : Tautan Phishing + Infostealer', false],
            ['STATUS : PINTU DEPAN TERBUKA LEBAR', true],
          ],
        });

        const pull = E.outQuint(inv(A.phishing - 0.2, A.phishing + 1.1, t));
        drawAhpoLayered(ctx, [
          { im: D03.kunci, par: 1.0, a: 1, dy: -pull * 115 },
          { im: D03.kail, par: 1.04, a: clamp(pull * 2.5), dy: lerp(-240, -115, pull) },
        ], 440, 50, 0.50, c.yaw * 10, 0, E.outQuint(inv(A.p2, A.p2 + 0.45, t)));

        slab(ctx, 'PHISHING & VIRUS INFOSTEALER', 440, 290, t, A.phishing, { align: 'center', lime: true, size: 20 });
        srcTag(ctx, 'Sumber: Kumparan, CNBC Indonesia, Liputan6.com (Nov 2023)', -810, 365, t, A.p2 + 0.4);
      },
    },
    // S3 (A.kaspersky..A.p3): Infostealer Kaspersky — Editorial Rows + Kursor Klik File Infeksi + ScreenCrack + Hero 35%! (NOL AI-SLOP CARDS!)
    {
      at: A.kaspersky, via: 'whip', side: -1, name: 'Infostealer 35%', tag: '35%',
      x: -1350, z: 7500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t, c) {
        txt(ctx, 'RISET KASPERSKY (2025–2026) · 5 JUTA LOG CURIAN', -810, -355, t, A.kaspersky, MN(20), { ls: 4, col: C_RED });

        editorialRow(ctx, '+21%', 'DETEKSI INFOSTEALER', 'lonjakan pencuri kata sandi global', -810, -250, 740, t, A.kaspersky, {
          accent: LIME, size: 62, subSize: 27,
        });
        editorialRow(ctx, '26 JT', 'PERANGKAT TERINFEKSI', 'menyedot 2,3 juta kartu bank korban', -810, -108, 740, t, A.kartu23 - 1.5, {
          accent: C_RED, size: 62, subSize: 27,
        });

        heroStat(ctx, '35%', 'FOLDER UNDUHAN (DOWNLOADS)',
          'sepertiga korban kena jebakan cuma dari klik file mentah di folder unduhan.', -810, 170, t, A.unduhan - 0.3, {
            size: 146, col: LIME, accent: LIME, maxW: 740,
          });

        // Kanan: Folder & berkas terinfeksi D03 (diposisikan bersih di kanan x≈430!) + Kursor klik -> retak!
        const popFile = E.outQuint(inv(A.unduhan - 0.4, A.unduhan + 0.5, t));
        drawAhpoLayered(ctx, [
          { im: D03.folder, par: 0.94, a: 1 },
          { im: D03.berkas, par: 1.04, a: 1, dy: -popFile * 75 },
        ], -95, 65, 0.45, c.yaw * 10, 0, E.outQuint(inv(A.kaspersky, A.kaspersky + 0.45, t)));

        kursorJalan(ctx, [
          [A.unduhan + 0.5, 690, 230],
          [A.persen35 - 0.15, 455, -20, true],
        ], t, { s: 1.5 });
        if (t >= A.persen35 - 0.15) {
          screenCrack(ctx, 455, -20, t, A.persen35 - 0.15, { r: 0.48, seed: 35 });
        }
        srcTag(ctx, 'Sumber: Kaspersky DFI & CNN Indonesia (Jun 2026)', -810, 368, t, A.kaspersky + 0.4);
      },
    },
    // S4 (A.p3..A.bssn): Penyakit 03 — PDNS 2 Surabaya (Peta 3D Gelap -> WebGL2 LumaSeam -> Satelit Surabaya!)
    {
      at: A.p3, via: 'truck', side: 1, name: 'PDNS 2 Surabaya', tag: 'PDNS 2',
      x: 1350, z: 10000, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t) {
        txt(ctx, 'PENYAKIT 03 · MERAWAT GEDUNG PUSAT DATA', -810, -355, t, A.p3, MN(20), { ls: 5, col: C_RED });
        fall(ctx, 'PDNS 2 SURABAYA — JUNI 2024', -810, -238, t, A.p3 + 0.1, DSP(98), { ls: 2 });
        if (IM.petaSby3d && IM.petaSbySat) {
          const pMorph = E.inOutCubic(inv(A.satelit - 0.2, A.satelit + 1.4, t));
          const mapCv = pMorph > 0.01 && pMorph < 0.99
            ? renderLumaSeam(IM.petaSby3d, IM.petaSbySat, pMorph, [0.784, 0.961, 0.235])
            : (pMorph >= 0.99 ? IM.petaSbySat : IM.petaSby3d);
          ctx.save();
          ctx.drawImage(mapCv, -720, -180, 1440, 520);
          const pulse = 1 + 0.25 * Math.sin(t * 6);
          ctx.strokeStyle = LIME; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(0, 80, 28 * pulse, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 80, 10, 0, Math.PI * 2); ctx.fill();
          slab(ctx, 'PDNS 2 SURABAYA · 282 INSTANSI TERDAMPAK', 0, 168, t, A.pdns + 0.3, { align: 'center', lime: true, size: 20 });
          ctx.restore();
        }
        const mapSrc = t >= A.satelit + 0.6
          ? 'Sumber: Google Maps (Data peta ©2026), diakses 20 Nov 2026'
          : 'Sumber: AWS Terrain | © OpenFreeMap · © OpenStreetMap contributors, diakses 20 Nov 2026';
        srcTag(ctx, mapSrc, -810, 380, t, A.p3 + 0.3);
      },
    },
    // S5 (A.bssn..A.backupTanya): Forensik BSSN — Jam Berputar Cepat + Log Editorial Swiss + ScreenCrack (NOL AI-SLOP TIMELINE CARDS!)
    {
      at: A.bssn, via: 'whip', side: -1, name: 'Windows Defender Mati', tag: 'DEFENDER',
      x: -1350, z: 12500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'TEMUAN FORENSIK SEMENTARA BSSN · BRAIN CIPHER (LOCKBIT 3.0)', -810, -355, t, A.bssn, MN(19), { ls: 4, col: C_RED });
        fall(ctx, 'WINDOWS DEFENDER DIMATIKAN', -810, -215, t, A.bssn + 0.1, DSP(110), { ls: 2 });

        // Kiri: Jam forensik berputar liar menunjukkan rentang 17 Jun 23.15 -> 20 Jun 00.55 WIB!
        jam(ctx, -560, 85, 195, t, A.bssn + 0.2, { tSpin: A.tgl17, speed: 5.5, rgb: '214,69,58' });
        slab(ctx, '50 JAM TANPA SATPAM', -560, 315, t, A.tgl17, { align: 'center', size: 19 });

        // Kanan: 3 log kronologi arsitektural bersih (NOL dark boxes!)
        editorialRow(ctx, '17 JUN', '23.15 WIB · SATPAM DISERANG', 'upaya mematikan Windows Defender dimulai', -250, -70, 1020, t, A.defender - 0.4, {
          accent: C_AMBER, size: 58, subSize: 28,
        });
        editorialRow(ctx, '20 JUN', '00.54 WIB · FILESYSTEM DIHAPUS', 'berkas penting sistem mulai dilenyapkan', -250, 95, 1020, t, A.tgl20 - 0.2, {
          accent: C_RED, size: 58, subSize: 28,
        });
        editorialRow(ctx, '00.55', 'DEFENDER CRASH · LUMPUH TOTAL', 'seluruh layanan PDNS 2 terkunci ransomware', -250, 260, 1020, t, A.tgl20 + 2.2, {
          accent: C_RED, size: 58, subSize: 28,
        });

        if (t >= A.tgl20 + 2.4) {
          screenCrack(ctx, -560, 85, t, A.tgl20 + 2.4, { r: 0.42, seed: 20 });
        }
        srcTag(ctx, 'Sumber: CNN Indonesia (26 Jun 2024) · Siaran Pers Komdigi', -810, 372, t, A.bssn + 0.4);
      },
    },
    // S6 (A.backupTanya..A.duaPersen): Rapat Senayan DPR RI + Waffle Grid 100 Kotak (98 Merah vs 2 Lime!)
    {
      at: A.backupTanya, via: 'rise', side: 1, name: 'Rapat Senayan BSSN', tag: 'SENAYAN',
      x: 1350, z: 15000, py: -560, yaw: [5, -3], pitch: [5, 7], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'RAPAT KERJA KOMISI I DPR RI · 27 JUNI 2024', -810, -350, t, A.backupTanya, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'DI MANA SALINAN BACKUP?', -810, -210, t, A.backupTanya + 0.1, DSP(118), { ls: 2 });
        wrapTxt(ctx, 'Kepala BSSN Hinsa Siburian membuka kenyataan pahit di hadapan parlemen Senayan.', -810, -90, 740, 50, SRF(44), t, A.senayan - 0.5, {
          col: ivo(0.90),
        });
        slab(ctx, '100 KOTAK DATA · HANYA 2 YANG PUNYA CADANGAN', -810, 108, t, A.hinsa - 0.2, { lime: true, size: 20 });

        // Waffle 10x10 di sisi kanan: 2 kotak pertama menyala LIME, 98 sisanya terkunci gelap!
        waffle(ctx, 430, 55, 2, t, A.backupTanya + 0.25, {
          cols: 10, rows: 10, cs: 46, gap: 7, eat: A.hinsa - 0.3,
          title: 'RASIO BACKUP PDNS 2 (2% VS 98%)',
        });
        srcTag(ctx, 'Sumber: KOMPAS.com (28 Jun 2024) · Rapat Komisi I DPR RI', -810, 360, t, A.backupTanya + 0.4);
      },
    },
    // S7 (A.duaPersen..DUR): CLIMAX BAB 3 — Solid Hero 2% + D04 Tangki + Peta Rute Busur Surabaya → Batam!
    {
      at: A.duaPersen, via: 'whip', side: -1, name: 'Backup Cuma 2%', tag: '2%',
      x: 0, z: 17600, py: -560, yaw: [-4, 3], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t, c) {
        drawD04Vault(ctx, D04, 520, 20, 0.41, t, {
          camX: c.yaw * 10, tFill: A.duaPersen, tLock: A.duaPersen + 0.4,
        });
        heroStat(ctx, '2%', 'BACKUP PDNS 2 SURABAYA → BATAM',
          'ibarat 100 surat tanah — cuma 2 lembar yang difotokopi.', -810, -100, t, A.duaPersen, {
            size: 240, col: LIME, accent: C_RED, maxW: 600,
          });

        // Peta mini Indonesia + rute busur Surabaya -> Batam!
        const P = petaPulau(ctx, -490, 205, 0.34, t, A.duaPersen + 0.25);
        const [sx, sy] = P(...KOTA.surabaya);
        const [bx, by] = P(...KOTA.batam);
        pinKota(ctx, sx, sy, t, A.duaPersen + 0.45, 'SBY', true);
        pinKota(ctx, bx, by, t, A.batam - 0.2, 'BATAM (2%)', false);
        ruteBusur(ctx, sx, sy, bx, by, t, A.batam - 0.4, { bow: 55, dur: 0.9 });

        slab(ctx, 'MELANGGAR PERBSSN NO. 4 / 2021', -810, 325, t, A.perbssn - 0.1, { size: 20 });
        if (t >= A.bab4 - 0.15) {
          kutipanLepas(ctx, -410, 220, 740, 180, 'SEPARAH APA PENANGANANNYA?', t, A.bab4 - 0.1, {
            tag: 'BAB 04 BERIKUTNYA', accent: LIME, size: 78,
          });
        }
        srcTag(ctx, 'Sumber: KOMPAS.com (28 Jun 2024) · detikNews · Peraturan BSSN 4/2021', -810, 382, t, A.duaPersen + 0.4);
      },
    },
  ];

  const under = (ctx, t, pre) => {
    const isLight = t < A.p1 - 0.15;
    if (pre) { theme(isLight); return; }
    if (!isLight) layarFoto(ctx, W, H, BG, t, { IM, dim: 0.68 });
  };

  return makeChapter({
    B, ST, load, label: 'BAB 03', gate: 0.75,
    full,
    under,
    over: (ctx, t) => kreditLatar(ctx, W, H, BG, t, false),
  });
}
