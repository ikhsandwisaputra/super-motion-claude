// Bab 4 · Empat Tameng Hukum Indonesia — v2 (100% Ruang Gelap RNC #0B0C09 + Peta 3D Sentinel-2 Nusantara!)
// ZERO tema terang Batam, ZERO 5 kotak putih kaku image8.png!
// Pakai Ahpo A05 (Palu Hakim mengayun menghantam landasan, 4 Perisai 3D arsitektural, 2 Kitab Hardcover 3D KUHP & KUHAP),
// 3 Gerbang Sektor Vertikal (MEDIS, SEKOLAH, PERBANKAN), dan 4 evidFull stabilo terukur piksel (termasuk uupdp & ojk dark:true!).
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, still, plate, fall, markLine, srcTag, slab, txt,
} from './kit.js';
import { stamp, pop } from './draw.js';
import {
  drawAhpoLayered, ahpoPt, splitFlapWord,
  C_RED, C_AMBER,
} from './fisika.js';
import { loadIndonesiaMap, petaIndonesia } from './indomap.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, A05 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadIndonesiaMap(sh + 'peta/'),
      loadImg(sh + 'own/layanan_publik_id.jpg', 1600).then(x => IM.layanan = still(x)),
      loadImg(sh + 'kutipan/jdih-surat-edaran-menteri-komunikasi-dan.png', 1900).then(x => IM.se9 = x),
      loadImg(sh + 'kutipan/peraturan-undang-undang-uu-nomor-27-tahun-2022.png', 1900).then(x => IM.uupdp = x),
      loadImg(sh + 'kutipan/ojk-tata-kelola-kecerdasan-artifisial.png', 1900).then(x => IM.ojk = x),
      loadImg(sh + 'kutipan/portal-berita-kini-wamen-nezar-aturan-ai-akan.png', 1900).then(x => IM.wamen = x),
      // Ahpo A05 Gavel + Legal Shield + Hardcover Books
      loadImg(sh + 'ahpo/A05/A05_02_MG_pantulan.png', 2000).then(x => A05.pantulan = x),
      loadImg(sh + 'ahpo/A05/A05_03_MG_bayangan.png', 2000).then(x => A05.bayangan = x),
      loadImg(sh + 'ahpo/A05/A05_04_MG_landasan-palu.png', 2000).then(x => A05.landasan = x),
      loadImg(sh + 'ahpo/A05/A05_05_FG_palu-hakim.png', 2000).then(x => A05.palu = x),
      loadImg(sh + 'ahpo/A05/A05_06_MG_perisai-hukum.png', 2000).then(x => A05.perisai = x),
      loadImg(sh + 'ahpo/A05/A05_07_MG_kitab-hukum-a.png', 2000).then(x => A05.kitabA = x),
      loadImg(sh + 'ahpo/A05/A05_08_MG_kitab-hukum-b.png', 2000).then(x => A05.kitabB = x),
    ]);
  }

  // Pixel-verified 3D full-screen evidence overlays (exact boxes from build/hl_rulers.jpg!)
  const full = () => [
    {
      im: IM.se9, t0: A.se9 + 0.15, t1: A.pedoman - 0.25, dir: 1,
      crop: [0, 0, 1, 1], tab: 'JDIH KOMDIGI · SE MENKOMINFO NO. 9 TAHUN 2023',
      hl: [
        [0.04, 0.175, 0.85, 0.085, A.se9 + 0.7],
        [0.04, 0.285, 0.92, 0.095, A.se9 + 1.3],
      ],
    },
    {
      im: IM.uupdp, t0: A.uu27 + 0.15, t1: A.pasal10 - 0.3, dir: -1, dark: true,
      crop: [0, 0, 1, 1], tab: 'PERATURAN.BPK.GO.ID · UU NO. 27 TAHUN 2022 (UU PDP)',
      hl: [[0.015, 0.175, 0.34, 0.17, A.uu27 + 0.9]],
    },
    {
      im: IM.ojk, t0: A.ojk + 0.15, t1: A.basel - 0.25, dir: 1, dark: true,
      crop: [0, 0, 1, 1], tab: 'OJK · TATA KELOLA AI PERBANKAN INDONESIA (29 APR 2025)',
      hl: [[0.085, 0.165, 0.790, 0.145, A.apr2025]],
    },
    {
      im: IM.wamen, t0: A.febOkt + 0.35, t1: A.perpres - 0.25, dir: -1,
      crop: [0.10, 0.12, 0.78, 0.84], tab: 'KOMDIGI · RANCANGAN PERPRES PETA JALAN AI 2026–2029',
      hl: [[0.015, 0.055, 0.925, 0.065, A.komdigi]],
    },
  ];

  // Helper: render one isolated Ahpo 3D Shield centered at (cx, cy) with label inside its empty obsidian face!
  // Shield bbox in 4000x2250 is (1663, 437, 2317, 1373) -> center (1990, 905), size 654x936
  function drawShieldProp(ctx, cx, cy, scale, num, title, sub, accent = LIME, a = 1) {
    if (!A05.perisai || a <= 0.01) return;
    ctx.save();
    ctx.globalAlpha *= a;
    ctx.translate(cx, cy);
    // Draw cropped shield from scaled 2000x1125 canvas (sx = 1663/2 = 831, sy = 437/2 = 218, sw = 328, sh = 469)
    const iw = A05.perisai.width, ih = A05.perisai.height;
    const sx = iw * (1663 / 4000), sy = ih * (437 / 2250), sw = iw * (654 / 4000), sh = ih * (936 / 2250);
    const dw = 654 * scale, dh = 936 * scale;
    ctx.drawImage(A05.perisai, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
    // Crisp typography inside empty dark center of shield
    setFont(ctx, MN(Math.round(40 * scale), 700), 3); ctx.fillStyle = accent; ctx.textAlign = 'center';
    ctx.fillText(num, 0, -dh * 0.16);
    setFont(ctx, DSP(Math.round(112 * scale)), 2); ctx.fillStyle = IVORY;
    ctx.fillText(title, 0, dh * 0.06);
    setFont(ctx, MN(Math.round(30 * scale), 400), 2); ctx.fillStyle = ivo(0.75);
    ctx.fillText(sub, 0, dh * 0.21);
    ctx.textAlign = 'left';
    ctx.restore();
  }

  // Dark Sentinel-2 3D Nusantara satellite backdrop (for S0 opening and S9 final KUHP/KUHAP stage)
  const worldMap = (aMul = 1) => (ctx, t, pr, foc, items) => {
    items.push({
      z: 1e6, x: 0, d: 1e9,
      f: () => {
        petaIndonesia(ctx, W / 2, H / 2, 1, t, 0, {
          fullBleed: true, light: false, a: aMul,
          lon: lerp(104.0, 114.0, inv(0, DUR, t)), lat: -3.4,
          dist: lerp(1.58, 1.36, inv(0, DUR, t)), pitch: 43, yaw: lerp(-5, 5, inv(0, DUR, t)),
        });
      },
    });
  };

  const ST = [
    // S0 (0..A.bankRS): Dark Sentinel-2 3D Nusantara Satellite Flyover
    {
      at: 0, name: 'Nusantara 3D', x: 0, z: 0, py: -560, yaw: [3, -2], pitch: [5, 4], dist: [1520, 1400],
      world: worldMap(0.95),
      draw(ctx, t) {
        txt(ctx, 'BAB 04 · KONTEKS INDONESIA', -810, -340, t, A.nyambung, MN(20), { ls: 5, col: LIME });
        markLine(ctx, 'DOMPET & ', 'LAYANAN', ' WARGA', -810, -195, t, A.nyambung + 0.15, A.dompet - 0.15, DSP(126), { align: 'left', ls: 2 });
        txt(ctx, 'cerita laboratorium ini nyambung langsung ke Indonesia.', -810, -85, t, A.dompet + 0.25, SRF(46), { col: ivo(0.88) });
        srcTag(ctx, 'Peta Satelit 3D: Sentinel-2 Cloudless EOX (CC BY 4.0)', -810, 380, t, 0.5);
      },
    },

    // S1 (A.bankRS..A.ditolak): Bank, Rumah Sakit, Instansi · Kredit Rumah & Klaim Berobat (dark framed plate + clean monoliths!)
    {
      at: A.bankRS - 0.15, via: 'whip', side: 1, name: 'Layanan Publik RI',
      x: 1600, z: 2500, py: -560, yaw: [6, -3], pitch: [6, 5], dist: [1540, 1400],
      draw(ctx, t) {
        plate(ctx, IM.layanan, t, 430, 30, 740, 480, E.outQuint(inv(A.bankRS, A.bankRS + 0.55, t)), {
          t0: A.bankRS, grade: 'saturate(.38) contrast(1.2) brightness(.72)', dim: 0.18, grain: 0.18,
        });
        txt(ctx, 'ASISTEN KOMPUTER OTOMATIS DI INDONESIA', -810, -340, t, A.bankRS, MN(20), { ls: 5, col: LIME });
        markLine(ctx, 'TANPA ', 'PENGAWAS MANUSIA', '?', -810, -210, t, A.kredit - 0.2, A.tanpaMan, DSP(92), { align: 'left', ls: 2 });

        const rows = [
          ['01 · BANK & KPR', 'Pengajuan Kredit Rumah', A.bankRS + 0.4],
          ['02 · RUMAH SAKIT', 'Klaim Berobat Pasien', A.bankRS + 1.4],
          ['03 · INSTANSI', 'Keputusan Layanan Publik', A.bankRS + 2.4],
        ];
        rows.forEach(([tag, ttl, ts], i) => {
          const k = E.outQuint(inv(ts, ts + 0.4, t));
          if (k <= 0) return;
          const y = -70 + i * 130;
          ctx.save(); ctx.globalAlpha = k; ctx.translate((1 - k) * -90, 0);
          ctx.fillStyle = '#151812'; ctx.fillRect(-810, y - 48, 820, 108);
          ctx.fillStyle = t >= A.tanpaMan ? C_RED : LIME; ctx.fillRect(-810, y - 48, 12, 108);
          setFont(ctx, MN(17, 700), 3); ctx.fillStyle = t >= A.tanpaMan ? C_RED : LIME; ctx.fillText(tag, -772, y - 8);
          setFont(ctx, DSP(52), 1); ctx.fillStyle = IVORY; ctx.fillText(ttl, -772, y + 44);
          ctx.restore();
        });
      },
    },

    // S2 (A.ditolak..A.palu): Ditolak Sepihak Oleh Rumus KPI Kantor
    {
      at: A.ditolak - 0.15, via: 'rise', side: -1, name: 'Ditolak Rumus',
      x: -1500, z: 5000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1380],
      mod(c, t) {
        const s = t - A.sepihak;
        if (s > 0 && s < 0.4) c.ty += 22 * Math.exp(-s * 10) * Math.sin(s * 65);
      },
      draw(ctx, t) {
        txt(ctx, 'RISIKO JALAN PINTAS TARGET ANGKA KANTOR', 0, -335, t, A.ditolak, MN(20), { align: 'center', ls: 5, col: C_RED });
        splitFlapWord(ctx, 'DITOLAK', 0, -140, t, A.sepihak - 0.5, { cw: 112, ch: 158, gap: 12, lime: false });
        stamp(ctx, 'SEPIHAK OLEH RUMUS', 0, 75, t, A.sepihak - 0.08, { size: 128, rot: -3 });
        txt(ctx, 'bila mesin dibiarkan mengejar target KPI tanpa rem manusia.', 0, 250, t, A.ditolak + 1.0, SRF(46), { align: 'center', col: ivo(0.84) });
      },
    },

    // S3 (A.palu..A.untung): HERO AHPO A05 GAVEL SWINGING DOWN ONTO SOUND BLOCK!
    {
      at: A.palu - 0.15, via: 'push', side: 1, name: 'Palu Keputusan (A05)', tag: 'PALU',
      x: 1200, z: 7500, py: -560, yaw: [4, -2], pitch: [6, 5], dist: [1480, 1340],
      mod(c, t) {
        const s = t - A.paluKata;
        if (s > 0 && s < 0.45) {
          c.ty += 28 * Math.exp(-s * 10) * Math.sin(s * 68);
        }
      },
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.palu - 0.1, A.palu + 0.45, t));
        // Gavel default pose in A05_05 is ALREADY raised +26° (LAPIS.md)!
        // Rotate 0° -> -26° counter-clockwise around exact pin pivot (1520, 1690) so head strikes sound block (920, 1745)!
        const sHit = t - (A.paluKata - 0.14);
        let gavDeg = 0;
        if (sHit > 0) {
          const strike = E.inCubic(clamp(sHit / 0.15));
          const bounce = sHit > 0.15 ? 4.5 * Math.exp(-(sHit - 0.15) * 9) * Math.abs(Math.sin((sHit - 0.15) * 26)) : 0;
          gavDeg = lerp(0, -26, strike) + bounce;
        }
        // Center the gavel+sound block region nicely on left half of the studio!
        drawAhpoLayered(ctx, [
          { im: A05.landasan, par: 0.88, a: 1.0 },
          { im: A05.palu, par: 1.02, a: 1.0, rot: gavDeg * D2R, px: 1520, py: 1690 },
        ], 180, -140, 0.72, c.yaw * 10, 0, kIn);

        // Shockwave ring right at gavel head impact point when it slams!
        if (sHit > 0.14 && sHit < 0.85) {
          const kr = (sHit - 0.14) / 0.71;
          const [ix, iy] = ahpoPt(920, 1740, 180, -140, 0.72);
          ctx.save(); ctx.globalAlpha = (1 - kr) * 0.8; ctx.strokeStyle = LIME; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.ellipse(ix, iy, 60 + 220 * E.outCubic(kr), 18 + 65 * E.outCubic(kr), 0, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }

        txt(ctx, 'GARIS BATAS TEGAS UNTUK KELUARGA', -40, -320, t, A.palu, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'PALU KEPUTUSAN', -40, -165, t, A.paluKata - 0.2, DSP(118), { ls: 2 });
        markLine(ctx, 'DILARANG ', 'DIPEGANG MESIN', '', -40, -30, t, A.dilarang - 0.1, A.paluKata, DSP(96), { align: 'left', ls: 2 });
        txt(ctx, 'sepintar apa pun programnya,', -40, 75, t, A.palu + 0.8, SRF(42), { col: ivo(0.86) });
        txt(ctx, 'keputusan akhir wajib manusia.', -40, 132, t, A.palu + 1.4, SRF(42), { col: LIME });
        srcTag(ctx, 'Ilustrasi berlapis: Ahpo / PhotoCraft Live (A05)', -810, 410, t, A.palu + 0.5);
      },
    },

    // S4 (A.untung..A.tameng1): 4 ARCHITECTURAL AHPO A05 3D SHIELDS ARRAYED IN STUDIO!
    {
      at: A.untung - 0.15, via: 'whip', side: -1, name: '4 Tameng Hukum', tag: '4 TAMENG',
      x: -1450, z: 10000, py: -560, yaw: [-4, 3], pitch: [6, 5], dist: [1560, 1420],
      draw(ctx, t) {
        txt(ctx, 'PERLINDUNGAN WARGA NEGARA INDONESIA', 0, -355, t, A.untung, MN(20), { align: 'center', ls: 5, col: LIME });
        markLine(ctx, 'EMPAT ', 'TAMENG HUKUM', ' INDONESIA', 0, -230, t, A.untung + 0.15, A.empatTameng, DSP(108), { ls: 2 });

        const shields = [
          ['01', 'SE 9/2023', 'MENKOMINFO', LIME],
          ['02', 'UU 27 PDP', 'DATA PRIBADI', IVORY],
          ['03', 'OJK 2025', 'PERBANKAN', C_AMBER],
          ['04', 'PERPRES AI', 'KOMDIGI 2026', LIME],
        ];
        shields.forEach(([num, ttl, sub, acc], i) => {
          const ts = A.empatTameng - 0.2 + i * 0.18;
          const k = pop(t, ts, 0.56, 0.34);
          if (k <= 0) return;
          const sx = -585 + i * 390;
          drawShieldProp(ctx, sx, 115 + (1 - Math.min(1, k)) * 90, 0.44 * Math.min(1.06, k), num, ttl, sub, acc, clamp((t - ts) / 0.12));
        });
      },
    },

    // S5 (A.tameng1..A.tameng2): Tameng #01 · SE Menkominfo No. 9/2023 (evidFull #1 se9 plays over A.se9..A.pedoman)
    {
      at: A.tameng1 - 0.15, via: 'truck', side: 1, name: 'Tameng 1 · SE 9/2023', tag: 'SE 9',
      x: 1500, z: 12500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        drawShieldProp(ctx, -560, 20, 0.62, 'TAMENG 01', 'SE 9/2023', 'DES 2023', LIME, E.outQuint(inv(A.tameng1, A.tameng1 + 0.45, t)));
        txt(ctx, 'SURAT EDARAN MENKOMINFO NO. 9/2023', -230, -310, t, A.tameng1, MN(20), { ls: 4, col: LIME });
        fall(ctx, 'LARANGAN POKOK #1', -230, -165, t, A.pedoman - 0.2, DSP(114), { ls: 2 });
        txt(ctx, 'urusan nasib hidup warga dan aturan publik...', -230, -55, t, A.haram - 0.2, SRF(46), { col: ivo(0.86) });
        stamp(ctx, 'HARAM DISERAHKAN KE MESIN', 230, 145, t, A.haramMesin - 0.06, { size: 96, rot: -2.5 });
      },
    },

    // S6 (A.tameng2..A.tameng3): Tameng #02 · UU No. 27/2022 PDP (evidFull #2 uupdp dark:true plays A.uu27..A.pasal10)
    {
      at: A.tameng2 - 0.15, via: 'whip', side: -1, name: 'Tameng 2 · UU PDP', tag: 'UU PDP',
      x: -1500, z: 15000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        drawShieldProp(ctx, -560, 20, 0.62, 'TAMENG 02', 'UU 27 PDP', 'TAHUN 2022', IVORY, E.outQuint(inv(A.tameng2, A.tameng2 + 0.45, t)));
        txt(ctx, 'UU NO. 27 TAHUN 2022 · PELINDUNGAN DATA PRIBADI', -230, -320, t, A.tameng2, MN(19), { ls: 4, col: LIME });

        // Crisp giant Pasal 10(1) & Pasal 34 dark blocks popping on exact VO words!
        const pasals = [
          ['PASAL 10 AYAT 1', 'Hak menolak keputusan otomatis', A.pasal10],
          ['PASAL 34', 'Wajib penilaian dampak risiko tinggi', A.pasal34],
        ];
        pasals.forEach(([p, sub, ts], i) => {
          const k = pop(t, ts - 0.1, 0.56, 0.32);
          if (k <= 0) return;
          const bx = -245 + i * 505, by = -140;
          ctx.save(); ctx.globalAlpha = clamp((t - (ts - 0.1)) / 0.1);
          ctx.fillStyle = '#151812'; ctx.fillRect(bx, by, 475, 175);
          ctx.fillStyle = LIME; ctx.fillRect(bx, by, 475, 8);
          setFont(ctx, DSP(64), 2); ctx.fillStyle = LIME; ctx.fillText(p, bx + 26, by + 84);
          setFont(ctx, SRF(26)); ctx.fillStyle = ivo(0.84); ctx.fillText(sub, bx + 26, by + 138);
          ctx.restore();
        });
        markLine(ctx, 'HAK HUKUM ', 'MENOLAK', ' KEPUTUSAN MESIN', -245, 185, t, A.hakTolak - 0.1, A.hakTolak + 1.5, DSP(84), { align: 'left', ls: 2 });
      },
    },

    // S7 (A.tameng3..A.tameng4): Tameng #03 · Panduan AI Perbankan OJK (evidFull #3 ojk dark:true plays A.ojk..A.basel)
    {
      at: A.tameng3 - 0.15, via: 'rise', side: 1, name: 'Tameng 3 · OJK', tag: 'OJK',
      x: 1500, z: 17500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        drawShieldProp(ctx, -560, 20, 0.62, 'TAMENG 03', 'OJK 2025', '29 APR 2025', C_AMBER, E.outQuint(inv(A.tameng3, A.tameng3 + 0.45, t)));
        txt(ctx, 'OTORITAS JASA KEUANGAN · STANDAR EROPA & BASEL', -230, -320, t, A.tameng3, MN(19), { ls: 4, col: C_AMBER });
        fall(ctx, 'AWASI DAUR HIDUP AI', -230, -175, t, A.basel - 0.15, DSP(104), { ls: 2 });

        // Clean rotating lifecycle governance ring (4 stages) on right
        const cx = 260, cy = 115, R = 165;
        ctx.save();
        ctx.strokeStyle = ivo(0.2); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
        const rot = (t - A.basel) * 0.6;
        ctx.strokeStyle = LIME; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(cx, cy, R, rot, rot + Math.PI * 0.75); ctx.stroke();
        const stg = [['RANCANG', 0], ['LATIH', 1], ['UJI & AUDIT', 2], ['AWASI', 3]];
        stg.forEach(([nm, i]) => {
          const ang = -Math.PI / 2 + i * (Math.PI / 2);
          const px = cx + Math.cos(ang) * R, py = cy + Math.sin(ang) * R;
          ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
          setFont(ctx, MN(18, 700), 3); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText(nm, cx + Math.cos(ang) * (R + 48), cy + Math.sin(ang) * (R + 36) + 6);
        });
        ctx.restore();
        ctx.textAlign = 'left';
      },
    },

    // S8 (A.tameng4..A.biroHukum): Tameng #04 · Rancangan Perpres Peta Jalan AI Nasional 2026–2029 (evidFull #4 wamen plays A.febOkt..A.perpres)
    {
      at: A.tameng4 - 0.15, via: 'truck', side: -1, name: 'Tameng 4 · Perpres AI', tag: 'PERPRES',
      x: -1450, z: 20000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        drawShieldProp(ctx, -560, 20, 0.62, 'TAMENG 04', 'PERPRES AI', 'KOMDIGI', LIME, E.outQuint(inv(A.tameng4, A.tameng4 + 0.45, t)));
        txt(ctx, 'KEMENTERIAN KOMUNIKASI & DIGITAL · FEB–OKT 2026', -230, -315, t, A.tameng4, MN(19), { ls: 4, col: LIME });
        fall(ctx, 'PETA JALAN AI NASIONAL', -230, -170, t, A.perpres - 0.2, DSP(104), { ls: 2 });
        splitFlapWord(ctx, '2026-2029', -230, 15, t, A.perpres + 0.3, { align: 'left', cw: 76, ch: 110, gap: 9, lime: true });
        slab(ctx, 'RANCANGAN PERPRES TATA KELOLA AI', -230, 185, t, A.perpres + 1.2, { size: 22 });
      },
    },

    // S9 (A.biroHukum..DUR): REPLACEMENT FOR REJECTED image8.png 5 STIFF WHITE BOXES!
    // Dark Sentinel-2 3D Indonesia map behind + Ahpo A05 3D Hardcover Books (KUHP & KUHAP) on left +
    // 3 Vertical Architectural Sector Barrier Gates (MEDIS, SEKOLAH, PERBANKAN) locking shut on right!
    {
      at: A.biroHukum - 0.15, via: 'push', side: 0, name: 'Kitab KUHP/KUHAP & 3 Pagar', tag: 'KUHP',
      x: 0, z: 22500, py: -560, yaw: [3, -2], pitch: [5, 4], dist: [1520, 1380],
      world: worldMap(0.32),
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.biroHukum - 0.1, A.biroHukum + 0.45, t));
        txt(ctx, 'BIRO HUKUM KOMDIGI · DUA DRAF UTAMA & PAGAR SEKTOR', -810, -365, t, A.biroHukum, MN(19), { ls: 4, col: LIME });

        // Left side: Ahpo A05 3D Hardcover Law Books (kitabA = KUHP, kitabB = KUHAP) with real studio reflection!
        // Shift left so the books (centered at x~2960 in 4000x2250) sit cleanly at x ~ -420 on our stage!
        const bxShift = -960, byShift = -160, bSc = 0.56;
        drawAhpoLayered(ctx, [
          { im: A05.kitabA, par: 0.90, a: E.outQuint(inv(A.kuhp - 0.4, A.kuhp + 0.25, t)) },
          { im: A05.kitabB, par: 0.95, a: E.outQuint(inv(A.kuhap - 0.35, A.kuhap + 0.25, t)) },
        ], bxShift, byShift, bSc, c.yaw * 10, 0, kIn);

        // Register crisp gold/obsidian cover titles directly onto the exact empty cover panels of A05_07 & A05_08!
        if (t >= A.kuhp - 0.3) {
          const [kaX, kaY] = ahpoPt(2725, 1380, bxShift, byShift, bSc);
          const k1 = E.outQuint(inv(A.kuhp - 0.3, A.kuhp + 0.2, t));
          ctx.save(); ctx.globalAlpha = k1; ctx.textAlign = 'center';
          setFont(ctx, DSP(84), 3); ctx.fillStyle = LIME; ctx.fillText('KUHP', kaX, kaY);
          setFont(ctx, MN(15, 700), 2); ctx.fillStyle = ivo(0.75); ctx.fillText('ATURAN POKOK AI', kaX, kaY + 42);
          ctx.restore();
        }
        if (t >= A.kuhap - 0.3) {
          const [kbX, kbY] = ahpoPt(3290, 1410, bxShift, byShift, bSc);
          const k2 = E.outQuint(inv(A.kuhap - 0.3, A.kuhap + 0.2, t));
          ctx.save(); ctx.globalAlpha = k2; ctx.textAlign = 'center';
          setFont(ctx, DSP(82), 3); ctx.fillStyle = '#15160F'; ctx.fillText('KUHAP', kbX, kbY);
          setFont(ctx, MN(15, 700), 2); ctx.fillStyle = 'rgba(21,22,15,0.72)'; ctx.fillText('TATA CARA UJI', kbX, kbY + 42);
          ctx.restore();
        }

        // Right side: 3 Sleek Vertical Architectural Barrier Gates dropping & locking sequentially!
        const gates = [
          ['01', 'MEDIS', 'Diagnosis & Klaim RS', A.medis - 0.15, LIME],
          ['02', 'SEKOLAH', 'Penilaian & Pendidikan', A.sekolah - 0.15, IVORY],
          ['03', 'PERBANKAN', 'Kredit & Risiko Finansial', A.perbankan - 0.15, C_AMBER],
        ];
        gates.forEach(([num, nm, sub, ts, col], i) => {
          const k = pop(t, ts, 0.56, 0.32);
          if (k <= 0) return;
          const gx = 120 + i * 245, gh = 510 * Math.min(1.04, k);
          ctx.save(); ctx.globalAlpha = clamp((t - ts) / 0.1);
          ctx.fillStyle = '#141711'; ctx.fillRect(gx, -230, 215, gh);
          ctx.fillStyle = col; ctx.fillRect(gx, -230, 215, 10);
          ctx.fillRect(gx, -230 + gh - 8, 215, 8);
          setFont(ctx, MN(16, 700), 3); ctx.fillStyle = col; ctx.textAlign = 'center';
          ctx.fillText(`PAGAR ${num}`, gx + 107, -172);
          setFont(ctx, DSP(58), 2); ctx.fillStyle = IVORY;
          ctx.fillText(nm, gx + 107, -55);
          setFont(ctx, SRF(24)); ctx.fillStyle = ivo(0.75);
          ctx.fillText(sub.split(' ')[0], gx + 107, 15);
          ctx.fillText(sub.split(' ').slice(1).join(' '), gx + 107, 48);
          // Lock glyph
          ctx.strokeStyle = col; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(gx + 107, 145, 22, Math.PI, 0); ctx.stroke();
          ctx.fillStyle = col; ctx.fillRect(gx + 78, 145, 58, 44);
          ctx.restore();
        });
        ctx.textAlign = 'left';
      },
    },
  ];

  return makeChapter({ B, ST, load, label: 'BAB 04 · EMPAT TAMENG HUKUM INDONESIA', full, gate: true });
}
