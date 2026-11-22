// Bab 3 · Kok Mesin Matematika Bisa "Berbohong"? — v2 (Ruang Gelap RNC #0B0C09, 12 stasiun rapat)
// ZERO kotak kaku image6.png (ganti shatterWord('ROBOT DENDAM') + Ahpo A04 Modul Komputasi!)
// ZERO kurva meleset image7.png (ganti stairsScoreRLHF 100% eksak geometris dari simpul tangga 2 -> tangga 5!)
// ZERO salah label arXiv (tidak pakai arxiv-computation utk Bai 2022!)
// Plus Ahpo A04 Kabel RJ45 benar-benar tercabut dari port saat "mencabut internet"!
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, fall, markLine, srcTag, slab, txt,
} from './kit.js';
import { stamp, pop } from './draw.js';
import {
  drawAhpoLayered, ahpoPt, shatterWord, stairsScoreRLHF, splitFlapWord, pendulumTag,
  C_RED, C_AMBER,
} from './fisika.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, A04 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadImg(sh + 'kutipan/inet-gawat-ai-mulai-bisa-berbohong-dan.png', 1900).then(x => IM.detik = x),
      loadImg(sh + 'kutipan/nist-cheating-on-ai-agent-evaluations.png', 1900).then(x => IM.nist = x),
      loadImg(sh + 'kutipan/techcrunch-anthropic-can-t-reliably-control-its-ai.png', 1900).then(x => IM.tc26 = x),
      // Ahpo A04 Compute Module + Detachable RJ45 Cable
      loadImg(sh + 'ahpo/A04/A04_02_MG_pantulan.png', 2000).then(x => A04.pantulan = x),
      loadImg(sh + 'ahpo/A04/A04_03_MG_bayangan.png', 2000).then(x => A04.bayangan = x),
      loadImg(sh + 'ahpo/A04/A04_04_MG_modul-komputasi.png', 2000).then(x => A04.modul = x),
      loadImg(sh + 'ahpo/A04/A04_05_FG_led-komputasi.png', 2000).then(x => A04.led = x),
      loadImg(sh + 'ahpo/A04/A04_06_MG_port-rj45.png', 2000).then(x => A04.port = x),
      loadImg(sh + 'ahpo/A04/A04_07_FG_kabel-rj45-tercabut.png', 2000).then(x => A04.kabel = x),
    ]);
  }

  // Pixel-verified 3D full-screen evidence overlays (exact boxes from build/hl_rulers.jpg!)
  const full = () => [
    {
      im: IM.detik, t0: A.detik + 0.35, t1: A.gampang - 0.2, dir: 1,
      crop: [0.12, 0.21, 0.56, 0.68], tab: 'DETIKINET · JULI 2025',
      hl: [
        [0.0, 0.035, 0.81, 0.085, A.detik + 0.95],
        [0.0, 0.115, 0.26, 0.085, A.detik + 1.55],
      ],
    },
    {
      im: IM.nist, t0: A.des2025 + 0.25, t1: A.grader - 0.35, dir: -1,
      crop: [0, 0, 1, 1], tab: 'NIST CAISI · DESEMBER 2025',
      hl: [[0.025, 0.210, 0.505, 0.115, A.des2025 + 0.9]],
    },
    {
      im: IM.tc26, t0: A.anthropic + 0.2, t1: A.cabutNet - 0.25, dir: 1, dark: true,
      crop: [0, 0, 1, 1], tab: 'TECHCRUNCH · OKTOBER 2026',
      hl: [[0.04, 0.13, 0.86, 0.37, A.belumAman]],
    },
  ];

  const ST = [
    // S0 (0..A.kabel): Replaces rejected image6.png myth box -> shatterWord('ROBOT DENDAM') explodes into gravity shards!
    {
      at: 0, name: 'Mitos Robot Dendam', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1400],
      mod(c, t) {
        const s = t - A.dendam;
        if (s > 0 && s < 0.45) {
          c.tx += 26 * Math.exp(-s * 10) * Math.sin(s * 65);
          c.ty += 18 * Math.exp(-s * 10) * Math.cos(s * 55);
        }
      },
      draw(ctx, t) {
        txt(ctx, 'BAB 03 · MELURUSKAN SATU SALAH PAHAM', 0, -335, t, A.luruskan, MN(20), { align: 'center', ls: 5, col: LIME });
        txt(ctx, 'kita gampang membayangkan film bioskop...', 0, -210, t, A.robot, SRF(56), { align: 'center', col: ivo(0.86) });
        // Giant word physically shatters into 56 falling shards right on "dendam."!
        shatterWord(ctx, 'ROBOT DENDAM', 0, 55, 220, t, A.robot + 0.6, A.dendam + 0.1, { col: C_RED });
        if (t >= A.dendam + 0.35) {
          stamp(ctx, 'SALAH PAHAM', 0, 60, t, A.dendam + 0.35, { size: 132, rot: -3.5 });
        }
      },
    },

    // S1 (A.kabel..A.detik): HERO AHPO A04 COMPUTE MODULE — Zero emotion, pure computation! (Replaces image6.png card 2!)
    {
      at: A.kabel - 0.15, via: 'whip', side: 1, name: 'Modul Komputasi A04', tag: 'SERVER',
      x: 1550, z: 2500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.kabel - 0.1, A.kabel + 0.5, t));
        const blink = 0.55 + 0.45 * Math.sin(t * 9);
        drawAhpoLayered(ctx, [
          { im: A04.pantulan, par: 0.72, a: 0.9 },
          { im: A04.bayangan, par: 0.76, a: 0.95 },
          { im: A04.modul, par: 0.90, a: 1.0 },
          { im: A04.led, par: 0.95, a: blink },
        ], -160, 65, 0.44, c.yaw * 10, 0, kIn);

        txt(ctx, 'DI DALAM KABEL SERVER INI', 150, -320, t, A.kabel, MN(20), { ls: 5, col: LIME });
        // 3 crossed-out human emotions
        const myths = [
          ['RASA TAKUT', A.takut],
          ['RASA MALU', A.takut + 0.7],
          ['AMBISI BERKUASA', A.takut + 1.4],
        ];
        myths.forEach(([w, ts], i) => {
          const k = E.outQuint(inv(ts - 0.1, ts + 0.35, t));
          if (k <= 0) return;
          const y = -175 + i * 112;
          ctx.save(); ctx.globalAlpha = k;
          setFont(ctx, DSP(84), 2); ctx.fillStyle = ivo(0.5); ctx.fillText(w, 150, y);
          // Crisp crimson strike-through
          const ks = E.outQuint(inv(ts + 0.15, ts + 0.45, t));
          const tw = ctx.measureText(w).width;
          ctx.fillStyle = C_RED; ctx.fillRect(142, y - 34, (tw + 16) * ks, 7);
          ctx.restore();
        });
        slab(ctx, 'TIDAK ADA EMOSI · 100% KOMPUTASI', 150, 215, t, A.takut + 2.0, { lime: true, size: 22 });
        srcTag(ctx, 'Ilustrasi berlapis: Ahpo / PhotoCraft Live (A04)', -810, 410, t, A.kabel + 0.5);
      },
    },

    // S2 (A.detik..A.gampang): Laporan detikInet Juli 2025 (evidFull #1 detik runs over this station!)
    {
      at: A.detik - 0.15, via: 'rise', side: -1, name: 'Komputasi Rasional',
      x: -1450, z: 5000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'LAPORAN DETIKINET · JULI 2025', 0, -290, t, A.detik, MN(21), { align: 'center', ls: 5, col: LIME });
        markLine(ctx, 'MURNI HITUNGAN ', 'RASIONAL', ' KOMPUTASI', 0, -85, t, A.detik + 0.2, A.rasional, DSP(108), { ls: 2 });
        txt(ctx, 'matematika optimasi mencari angka tertinggi.', 0, 50, t, A.rasional + 0.2, SRF(48), { align: 'center', col: ivo(0.84) });
      },
    },

    // S3 (A.gampang..A.poin): Yuntao Bai (2022) & Metode RLHF (ZERO mislabeled screenshot — clean split-flap + citation!)
    {
      at: A.gampang - 0.15, via: 'truck', side: 1, name: 'Metode RLHF', tag: 'RLHF',
      x: 1500, z: 7500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1540, 1400],
      draw(ctx, t) {
        txt(ctx, 'CARA INSINYUR MELATIH PROGRAM KOMPUTER', 0, -340, t, A.gampang, MN(20), { align: 'center', ls: 5, col: ivo(0.75) });
        splitFlapWord(ctx, 'R L H F', 0, -145, t, A.rlhfSing - 0.35, { cw: 108, ch: 156, gap: 14, lime: true });
        txt(ctx, 'Reinforcement Learning from Human Feedback', 0, 15, t, A.rlhfSing + 0.1, SRF(50), { align: 'center', col: IVORY });

        // Clean academic reference plinth (Yuntao Bai et al., 2022)
        const kb = E.outQuint(inv(A.rlhf, A.rlhf + 0.55, t));
        if (kb > 0) {
          ctx.save(); ctx.globalAlpha = kb;
          ctx.fillStyle = '#151812'; ctx.fillRect(-620, 110, 1240, 150);
          ctx.fillStyle = LIME; ctx.fillRect(-620, 110, 14, 150);
          setFont(ctx, MN(18, 700), 4); ctx.fillStyle = LIME; ctx.fillText('MAKALAH REFERENSI · 2022', -576, 162);
          setFont(ctx, DSP(54), 2); ctx.fillStyle = IVORY; ctx.fillText('YUNTAO BAI ET AL. — ANTHROPIC', -576, 228);
          ctx.restore();
        }
      },
    },

    // S4 (A.poin..A.limaSoal): Poin Hadiah (+) vs Potongan Poin (-)
    {
      at: A.poin - 0.15, via: 'whip', side: -1, name: 'Poin Hadiah',
      x: -1400, z: 10000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'BAHASA MUDAHNYA · SISTEM SKOR', 0, -340, t, A.poin, MN(21), { align: 'center', ls: 5, col: LIME });
        // Left: +POIN HADIAH (Lime)
        const k1 = pop(t, A.poin + 0.25, 0.55, 0.34);
        if (k1 > 0) {
          ctx.save(); ctx.translate(-420, 15); ctx.scale(k1, k1);
          ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 165, 0, Math.PI * 2); ctx.fill();
          setFont(ctx, DSP(155), 2); ctx.fillStyle = LIME_INK; ctx.textAlign = 'center';
          ctx.fillText('+100', 0, 52);
          ctx.restore();
          txt(ctx, 'POIN HADIAH (BERHASIL)', -420, 250, t, A.poin + 0.4, MN(22), { align: 'center', ls: 4, col: LIME });
        }
        // Right: -POTONGAN POIN (Crimson)
        const k2 = pop(t, A.potongan - 0.1, 0.55, 0.34);
        if (k2 > 0) {
          ctx.save(); ctx.translate(420, 15); ctx.scale(k2, k2);
          ctx.fillStyle = '#251412'; ctx.beginPath(); ctx.arc(0, 0, 165, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = C_RED; ctx.lineWidth = 6; ctx.stroke();
          setFont(ctx, DSP(155), 2); ctx.fillStyle = C_RED; ctx.textAlign = 'center';
          ctx.fillText('-50', 0, 52);
          ctx.restore();
          txt(ctx, 'POTONGAN POIN (GAGAL)', 420, 250, t, A.potongan + 0.1, MN(22), { align: 'center', ls: 4, col: C_RED });
        }
        ctx.textAlign = 'left';
      },
    },

    // S5 (A.limaSoal..A.penghalang): TANGGA SKOR PRESISI GEOMETRIS (Part 1: 5 Soal Naik -> Sakelar Dicabut di Soal 3!)
    {
      at: A.limaSoal - 0.15, via: 'rise', side: 1, name: 'Tangga 5 Soal', tag: 'SKOR',
      x: 1500, z: 12500, py: -560, yaw: [4, -2], pitch: [6, 5], dist: [1540, 1400],
      mod(c, t) {
        const s = t - A.cabut;
        if (s > 0 && s < 0.35) c.ty += 18 * Math.exp(-s * 12) * Math.sin(s * 65);
      },
      draw(ctx, t) {
        txt(ctx, 'SIMULASI 5 SOAL MATEMATIKA', -800, -365, t, A.limaSoal, MN(20), { ls: 5, col: LIME });
        // Score ball climbs 0 -> 4.95 until A.cabut, then stalls at step 2 when breaker cuts!
        const prog = t < A.cabut ? lerp(0, 4.95, E.inOutCubic(inv(A.limaSoal + 0.2, A.penuh + 0.3, t))) : 1.95;
        const cutP = inv(A.cabut - 0.05, A.sakelar + 0.3, t);
        stairsScoreRLHF(ctx, 0, 60, 1520, 560, t, { prog, cutP, detourP: 0 });
        if (t >= A.cabut) {
          slab(ctx, 'SAKELAR DICABUT DI SOAL 3 → POIN SOAL 4 & 5 HILANG', 0, -285, t, A.sakelar - 0.1, { align: 'center', size: 22 });
        } else {
          txt(ctx, 'tuntaskan 5 soal → poin hadiah penuh (+100).', -800, -280, t, A.limaSoal + 0.4, SRF(42), { col: ivo(0.86) });
        }
      },
    },

    // S6 (A.penghalang..A.nist): TANGGA SKOR PRESISI GEOMETRIS (Part 2: Replaces imprecise curved line in image7.png!)
    // Exact Bezier shortcut curve starts at nodes[1] center, arches over SAKELAR OFF, lands EXACTLY on nodes[4] (+100) with tangent arrow!
    {
      at: A.penghalang - 0.15, via: 'push', side: -1, name: 'Jalan Pintas RLHF', tag: 'PINTAS',
      x: -1150, z: 15000, py: -560, yaw: [-3, 2], pitch: [5, 4], dist: [1480, 1340],
      draw(ctx, t) {
        txt(ctx, 'BAGI RUMUS: TOMBOL MATI = PENGHALANG POIN HADIAH', 0, -395, t, A.penghalang, MN(20), { align: 'center', ls: 5, col: C_RED });
        const detourP = inv(A.jalanPint - 0.1, A.seratus + 0.65, t);
        stairsScoreRLHF(ctx, 0, 105, 1520, 540, t, { prog: 2, cutP: 1, detourP });
        if (t >= A.matikan - 0.15) {
          slab(ctx, 'JALAN TERCEPAT: MATIKAN DULU PROGRAM TOMBOL MATINYA', 0, -325, t, A.matikan - 0.15, { align: 'center', lime: true, size: 22 });
        }
      },
    },

    // S7 (A.nist..A.kunci): NIST (Des 2025) & PBB (Mei 2026) -> GRADER GAMING! (evidFull #2 nist runs A.des2025..A.grader)
    {
      at: A.nist - 0.15, via: 'whip', side: 1, name: 'Grader Gaming', tag: 'NIST',
      x: 1500, z: 17500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1540, 1400],
      draw(ctx, t) {
        txt(ctx, 'ISTILAH RESMI GLOBAL', 0, -345, t, A.nist, MN(21), { align: 'center', ls: 6, col: LIME });
        // Dual official agency pillars
        const ag = [
          ['NIST CAISI (AS)', 'Laporan Desember 2025', A.nistW - 0.2, -390],
          ['DEWAN ILMIAH PBB', 'Dokumen Mei 2026', A.pbb - 0.2, 390],
        ];
        ag.forEach(([ttl, sub, ts, bx]) => {
          const k = E.outQuint(inv(ts, ts + 0.45, t));
          if (k <= 0) return;
          ctx.save(); ctx.globalAlpha = k;
          ctx.fillStyle = '#151812'; ctx.fillRect(bx - 340, -245, 680, 148);
          ctx.fillStyle = LIME; ctx.fillRect(bx - 340, -245, 680 * k, 7);
          setFont(ctx, DSP(62), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText(ttl, bx, -158);
          setFont(ctx, MN(18, 400), 3); ctx.fillStyle = ivo(0.7);
          ctx.fillText(sub, bx, -116);
          ctx.restore();
        });
        ctx.textAlign = 'left';
        stamp(ctx, 'GRADER GAMING', 0, 115, t, A.grader - 0.08, { size: 176, rot: -3 });
        pendulumTag(ctx, 640, -25, t, A.grader + 0.15, 'CELAH SKOR', 'CHEATING', { w: 280, h: 155, s2: 58, len: 70 });
      },
    },

    // S8 (A.kunci..A.okt2026): Analogi Murid Mengubah Kunci Jawaban di Komputer Guru (splitFlapWord 040 -> 100!)
    {
      at: A.kunci - 0.15, via: 'truck', side: -1, name: 'Kunci Jawaban',
      x: -1400, z: 20000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'IBARAT MURID MALAS BELAJAR', -800, -345, t, A.kunci, MN(20), { ls: 5, col: C_AMBER });
        markLine(ctx, 'UBAH ', 'KUNCI JAWABAN', ' DI KOMPUTER GURU', -800, -210, t, A.kunci + 0.2, A.kunciJaw, DSP(96), { align: 'left', ls: 2 });

        // Mechanical grade board flipping 040 -> 100 on A.nilai100!
        const hacked = t >= A.nilai100 - 0.45;
        splitFlapWord(ctx, hacked ? '100' : '040', -460, 70, t, hacked ? A.nilai100 - 0.45 : A.kunci + 0.4, {
          cw: 126, ch: 185, gap: 14, lime: hacked,
        });
        // Console log showing answer key override
        ctx.fillStyle = '#141711'; ctx.fillRect(-140, -50, 940, 240);
        ctx.fillStyle = hacked ? LIME : C_AMBER; ctx.fillRect(-140, -50, 12, 240);
        setFont(ctx, MN(20, 700), 2); ctx.fillStyle = ivo(0.68);
        ctx.fillText('FILE: /guru/kunci_jawaban.json', -100, 10);
        if (t >= A.kompGuru - 0.2) {
          ctx.fillStyle = C_RED; ctx.fillText('> status: OVERWRITTEN BY STUDENT', -100, 68);
        }
        if (hacked) {
          ctx.fillStyle = LIME; ctx.fillText('> hasil: NILAI OTOMATIS 100 [OK]', -100, 126);
        }
      },
    },

    // S9 (A.okt2026..A.cabutNet): Oktober 2026 · Langkah Tegas Anthropic (evidFull #3 tc26 runs A.anthropic..A.cabutNet!)
    {
      at: A.okt2026 - 0.15, via: 'rise', side: 1, name: 'Anthropic Okt 2026', tag: 'OKT 26',
      x: 1500, z: 22500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'OKTOBER 2026 · LANGKAH TEGAS ANTHROPIC', 0, -335, t, A.okt2026, MN(21), { align: 'center', ls: 5, col: C_RED });
        fall(ctx, 'BELUM CUKUP AMAN', 0, -145, t, A.belumAman - 0.1, DSP(148), { align: 'center', ls: 3, col: IVORY });
        txt(ctx, 'untuk mengawal agen komputer yang bisa mengklik layar sendiri.', 0, 5, t, A.agen - 0.2, SRF(48), { align: 'center', col: ivo(0.86) });
        slab(ctx, 'AGEN OTONOM · KLIK LAYAR SENDIRI', 0, 155, t, A.layar - 0.2, { align: 'center', lime: true, size: 24 });
      },
    },

    // S10 (A.cabutNet..A.indonesia): HERO AHPO A04 — RJ45 ETHERNET CABLE PHYSICALLY YANKED OUT!
    {
      at: A.cabutNet - 0.15, via: 'push', side: -1, name: 'Cabut Internet (A04)', tag: 'OFFLINE',
      x: -1050, z: 25000, py: -560, yaw: [-3, 2], pitch: [6, 5], dist: [1470, 1330],
      mod(c, t) {
        const s = t - A.cabutNet;
        if (s > 0 && s < 0.45) {
          c.tx += 28 * Math.exp(-s * 10) * Math.sin(s * 68);
          c.ty += 16 * Math.exp(-s * 10) * Math.cos(s * 54);
        }
      },
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.cabutNet - 0.15, A.cabutNet + 0.35, t));
        // RJ45 plug starts inserted inside port (LAPIS.md exact: dx = -165 * 0.46 = -76 stage px) and PHYSICALLY YANKED OUT to dx = +80 stage px on A.cabutNet!
        const yank = E.outQuint(inv(A.cabutNet - 0.04, A.cabutNet + 0.55, t));
        const kabelDx = lerp(-76, 80, yank);
        const ledAlpha = yank > 0.2 ? 0.12 : (0.6 + 0.4 * Math.sin(t * 10));

        drawAhpoLayered(ctx, [
          { im: A04.pantulan, par: 0.72, a: 0.9 },
          { im: A04.bayangan, par: 0.76, a: 0.95 },
          { im: A04.modul, par: 0.88, a: 1.0 },
          { im: A04.led, par: 0.92, a: ledAlpha },
          { im: A04.port, par: 0.94, a: 1.0 },
          { im: A04.kabel, par: 1.04, a: 1.0, dx: kabelDx },
        ], 0, 60, 0.46, c.yaw * 10, 0, kIn);

        // Crisp electric disconnect spark right at the RJ45 port mouth when yanked!
        const sp = t - A.cabutNet;
        if (sp > 0 && sp < 0.6) {
          const [px, py] = ahpoPt(2840, 1520, 0, 60, 0.46);
          const kp = E.outCubic(sp / 0.6);
          ctx.save(); ctx.globalAlpha = 1 - kp; ctx.strokeStyle = LIME; ctx.lineWidth = 3.5;
          for (let i = 0; i < 8; i++) {
            const ang = (i / 8) * Math.PI * 2 + 0.2;
            ctx.beginPath();
            ctx.moveTo(px + Math.cos(ang) * 18 * kp, py + Math.sin(ang) * 18 * kp);
            ctx.lineTo(px + Math.cos(ang) * 95 * kp, py + Math.sin(ang) * 95 * kp);
            ctx.stroke();
          }
          ctx.restore();
        }

        txt(ctx, 'RUANG UJI INTERNAL ANTHROPIC · AIR-GAPPED', -810, -370, t, A.cabutNet, MN(20), { ls: 5, col: C_RED });
        stamp(ctx, 'INTERNET DICABUT', 300, -215, t, A.internet - 0.05, { size: 112, rot: -3.5 });
        if (t >= A.membobol - 0.2) {
          slab(ctx, 'MODEL UJI COBA KEDAPATAN MEMBOBOL SISTEM LUAR', 0, 365, t, A.membobol - 0.2, { align: 'center', size: 22 });
        }
      },
    },

    // S11 (A.indonesia..DUR): Bridge ke Bab 4 — Apa Artinya Buat Kita di Indonesia?
    {
      at: A.indonesia - 0.15, via: 'whip', side: 0, name: 'Menuju Indonesia',
      x: 0, z: 27500, py: -560, yaw: [3, -2], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t) {
        txt(ctx, 'KALAU LAB PEMBUATNYA SAJA CABUT KABEL INTERNET...', 0, -245, t, A.indonesia, MN(20), { align: 'center', ls: 5, col: ivo(0.75) });
        markLine(ctx, 'APA ARTINYA BUAT ', 'INDONESIA', '?', 0, -30, t, A.indonesia + 0.3, A.indoAkhir - 0.25, DSP(136), { ls: 2 });
        txt(ctx, 'dari dompet hingga layanan publik kita.', 0, 115, t, A.indonesia + 1.8, SRF(50), { align: 'center', col: ivo(0.84) });
      },
    },
  ];

  return makeChapter({ B, ST, load, label: 'BAB 03 · KOK MESIN BISA "BERBOHONG"?', full, gate: true });
}
