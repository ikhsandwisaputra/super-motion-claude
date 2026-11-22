// Bab 2 · Bukan Cuma Satu AI: Bohong Saat Diinterogasi & Menggunting Kabel Mati — v2 (Ruang Gelap RNC #0B0C09)
// 15 stasiun padat & variatif: ZERO teks polos image5.png, pakai Ahpo A03 (Konsol Terminal + Tuas Sakelar Merah berputar),
// 33-Cell Trap Grid, 7-Ring Interrogation Radar, splitFlapWord('100.000+'), dotMatrix100 (79% & 47% & 97%),
// 20-Step RepliBench Stairs diblokir gerbang KYC fisik, dan stabilo 100% terukur piksel (termasuk palisade2 arXiv:2509.14260 akurat!).
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, D2R, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, evid, fall, markLine, srcTag, slab, txt, countTo,
} from './kit.js';
import { stamp, pop } from './draw.js';
import {
  drawAhpoLayered, ahpoPt, letterNum, dotMatrix100, splitFlapWord, pendulumTag,
  C_RED, C_AMBER,
} from './fisika.js';

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, A03 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadImg(sh + 'kutipan/arxiv-computer-science-artificial-intelligence-3.png', 1900).then(x => IM.apollo = x),
      loadImg(sh + 'kutipan/palisaderesearch-shutdown-resistance-in-reasoning-models.png', 1900).then(x => IM.palisade = x),
      loadImg(sh + 'kutipan/theregister-openai-model-modifies-shutdown-script-in.png', 1900).then(x => IM.thereg = x),
      // Accurately verified: arXiv:2509.14260 = Palisade Research "Incomplete Tasks Induce Shutdown Resistance"
      loadImg(sh + 'kutipan/arxiv-computer-science-computation-and.png', 1900).then(x => IM.palisade2 = x),
      loadImg(sh + 'kutipan/tekno-ai-disuruh-mematikan-ai-lain-responsnya.png', 1900).then(x => IM.kompas = x),
      // Ahpo A03 Terminal + Industrial Breaker Switch
      loadImg(sh + 'ahpo/A03/A03_02_MG_pantulan.png', 2000).then(x => A03.pantulan = x),
      loadImg(sh + 'ahpo/A03/A03_03_MG_bayangan.png', 2000).then(x => A03.bayangan = x),
      loadImg(sh + 'ahpo/A03/A03_04_MG_monitor-konsol.png', 2000).then(x => A03.monitor = x),
      loadImg(sh + 'ahpo/A03/A03_05_MG_kilau-layar.png', 2000).then(x => A03.kilau = x),
      loadImg(sh + 'ahpo/A03/A03_06_MG_kotak-sakelar.png', 2000).then(x => A03.kotak = x),
      loadImg(sh + 'ahpo/A03/A03_07_FG_tuas-sakelar.png', 2000).then(x => A03.tuas = x),
    ]);
  }

  // Pixel-verified 3D full-screen evidence overlays (exact boxes from build/hl_rulers.jpg!)
  const full = () => [
    {
      im: IM.apollo, t0: A.apollo + 0.4, t1: A.o1 - 0.15, dir: 1,
      crop: [0, 0, 1, 1], tab: 'ARXIV:2412.04984 · APOLLO RESEARCH (6 DES 2024)',
      hl: [[0.015, 0.365, 0.525, 0.095, A.apolloNama]],
    },
    {
      im: IM.palisade, t0: A.palisade + 0.5, t1: A.seratusRibu - 0.15, dir: -1,
      crop: [0, 0, 1, 1], tab: 'PALISADE RESEARCH · SHUTDOWN RESISTANCE (2025–2026)',
      hl: [
        [0.032, 0.195, 0.430, 0.115, A.palisadeNama],
        [0.032, 0.320, 0.415, 0.115, A.palisadeNama + 0.55],
      ],
    },
    {
      im: IM.thereg, t0: A.codex47 + 0.6, t1: A.angka7 - 0.15, dir: 1,
      crop: [0, 0, 0.92, 0.56], tab: 'THE REGISTER · OPENAI MODEL MODIFIES SHUTDOWN SCRIPT',
      hl: [[0.02, 0.175, 0.78, 0.095, A.angka47 - 0.1]],
    },
    {
      im: IM.palisade2, t0: A.angka97 + 0.25, t1: A.persen97 - 0.55, dir: -1,
      crop: [0, 0, 1, 1], tab: 'ARXIV:2509.14260 · PALISADE RESEARCH PAPER',
      hl: [[0.015, 0.365, 0.695, 0.095, A.angka97 + 1.15]],
    },
  ];

  const ST = [
    // S0 (0..A.apollo): Replaces rejected image5.png static text+badge!
    // Lonely small "1" drops -> 5 giant spring-bouncing architectural monoliths -> heavy stamp("GEJALA BESAR")!
    {
      at: 0, name: '5 Juara Kelas', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1560, 1400],
      mod(c, t) {
        const s = t - A.gejala;
        if (s > 0 && s < 0.4) c.ty += 22 * Math.exp(-s * 10) * Math.sin(s * 65);
      },
      draw(ctx, t) {
        txt(ctx, 'BAB 02 · POLA LINTAS MODEL RAKSASA', -800, -345, t, A.murid, MN(20), { ls: 5, col: LIME });
        // Phase 1: 1 lonely small monolith (murid nyontek)
        const k1 = pop(t, A.murid + 0.1, 0.55, 0.34);
        const dim1 = 1 - 0.55 * E.outCubic(inv(A.limaJuara, A.limaJuara + 0.4, t));
        if (k1 > 0) {
          ctx.save(); ctx.globalAlpha = dim1;
          ctx.fillStyle = '#191C16'; ctx.fillRect(-780, 290 - 200 * Math.min(1.08, k1), 170, 200 * Math.min(1.08, k1));
          ctx.fillStyle = ivo(0.5); ctx.fillRect(-780, 290 - 200 * Math.min(1.08, k1), 170, 6);
          setFont(ctx, DSP(108), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText('01', -695, 225);
          setFont(ctx, SRF(34)); ctx.fillStyle = ivo(0.75);
          ctx.fillText('1 murid nyontek', -695, 345);
          ctx.restore();
        }
        // Phase 2: 5 towering architectural monolith pillars dropping sequentially on A.limaJuara!
        const heights = [260, 310, 360, 410, 465];
        const labs = ['o1', 'CLAUDE', 'GEMINI', 'LLAMA', 'GROK'];
        heights.forEach((bh, i) => {
          const ts = A.limaJuara + i * 0.12;
          const k = pop(t, ts, 0.52, 0.32);
          if (k <= 0) return;
          const bx = -420 + i * 245, hCur = bh * Math.min(1.12, k);
          ctx.save(); ctx.globalAlpha = clamp((t - ts) / 0.08);
          ctx.fillStyle = '#161913'; ctx.fillRect(bx - 88, 290 - hCur, 176, hCur);
          ctx.fillStyle = i === 4 ? C_RED : LIME;
          ctx.fillRect(bx - 88, 290 - hCur, 176, 8);
          setFont(ctx, DSP(54), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText(labs[i], bx, 290 - hCur + 68);
          setFont(ctx, MN(16, 700), 2); ctx.fillStyle = i === 4 ? C_RED : LIME;
          ctx.fillText(`#0${i + 1}`, bx, 290 - 24);
          ctx.restore();
        });
        txt(ctx, 'kalau lima juara kelas ikut nyontek...', -510, -255, t, A.limaJuara, SRF(54), { col: ivo(0.88) });
        stamp(ctx, 'GEJALA BESAR', 120, -145, t, A.gejala - 0.05, { size: 144, rot: -3.2 });
      },
    },

    // S1 (A.apollo..A.meinke): 5 Model Papan Atas Dunia (evidFull #1 apollo plays over A.apollo..A.o1)
    {
      at: A.apollo - 0.1, via: 'whip', side: 1, name: '5 Model Apollo', tag: 'APOLLO',
      x: 1650, z: 2500, py: -560, yaw: [6, -3], pitch: [6, 5], dist: [1540, 1400],
      draw(ctx, t) {
        txt(ctx, 'APOLLO RESEARCH · 6 DESEMBER 2024', -810, -345, t, A.o1 - 0.4, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'LIMA MODEL PAPAN ATAS', -810, -210, t, A.o1 - 0.3, DSP(116), { ls: 2 });
        const lineup = [
          ['OpenAI o1', 'PENALARAN', A.o1, C_RED],
          ['Claude 3.5 Sonnet', 'ANTHROPIC', A.sonnet, LIME],
          ['Claude 3 Opus', 'ANTHROPIC', A.opus, LIME],
          ['Gemini 1.5 Pro', 'GOOGLE', A.gemini, IVORY],
          ['Llama 3.1 405B', 'META OPEN', A.llama, C_AMBER],
        ];
        lineup.forEach(([nm, org, ts, col], i) => {
          const k = E.outQuint(inv(ts - 0.1, ts + 0.4, t));
          if (k <= 0) return;
          const y = -85 + i * 94;
          ctx.save(); ctx.globalAlpha = k; ctx.translate((1 - k) * -120, 0);
          ctx.fillStyle = '#151812'; ctx.fillRect(-810, y - 54, 1620, 74);
          ctx.fillStyle = col; ctx.fillRect(-810, y - 54, 14, 74);
          setFont(ctx, MN(18, 700), 3); ctx.fillStyle = col; ctx.textAlign = 'left';
          ctx.fillText(`0${i + 1}`, -772, y - 10);
          setFont(ctx, DSP(54), 2); ctx.fillStyle = IVORY;
          ctx.fillText(nm, -690, y);
          setFont(ctx, MN(18, 400), 4); ctx.fillStyle = ivo(0.62); ctx.textAlign = 'right';
          ctx.fillText(org, 775, y - 10);
          ctx.restore();
        });
        ctx.textAlign = 'left';
      },
    },

    // S2 (A.meinke..A.berkas): 6 Evaluasi & 33 Skenario Jebakan (33-Cell Trap Grid + letterNum('33'))
    {
      at: A.meinke - 0.15, via: 'rise', side: -1, name: '33 Skenario Jebakan', tag: '33',
      x: -1550, z: 5000, py: -560, yaw: [-6, 3], pitch: [7, 5], dist: [1540, 1400],
      draw(ctx, t) {
        txt(ctx, 'ALEXANDER MEINKE & TIM · 6 EVALUASI', -810, -345, t, A.meinke, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'SKENARIO JEBAKAN', -810, -210, t, A.skenario - 0.2, DSP(116), { ls: 2 });
        letterNum(ctx, '33', -530, 80, 340, t, A.tigaTiga - 0.12, { stroke: LIME });

        // 11x3 = 33 tactical scenario cells lighting sequentially
        const nLit = Math.round(countTo(0, 33, t, A.tigaTiga - 0.1, 1.4));
        const gx0 = -210, gy0 = -70, cw = 82, ch = 82, gap = 12;
        for (let i = 0; i < 33; i++) {
          const col = i % 11, row = Math.floor(i / 11);
          const cx = gx0 + col * (cw + gap), cy = gy0 + row * (ch + gap);
          const lit = i < nLit;
          ctx.fillStyle = lit ? (i % 7 === 0 ? C_RED : LIME) : '#171A14';
          ctx.fillRect(cx, cy, cw, ch);
          setFont(ctx, MN(16, 700), 1); ctx.textAlign = 'center';
          ctx.fillStyle = lit ? (i % 7 === 0 ? IVORY : LIME_INK) : ivo(0.35);
          ctx.fillText(String(i + 1).padStart(2, '0'), cx + cw / 2, cy + ch / 2 + 6);
        }
        ctx.textAlign = 'left';
        srcTag(ctx, 'Meinke et al., Frontier Models are Capable of In-context Scheming (2024)', -810, 365, t, A.skenario);
      },
    },

    // S3 (A.berkas..A.scheming): Berkas Internal Bocor -> Model Tidak Patuh Segera Dimatikan
    {
      at: A.berkas - 0.15, via: 'truck', side: 1, name: 'Berkas Internal',
      x: 1500, z: 7500, py: -560, yaw: [5, -3], pitch: [5, 7], dist: [1520, 1380],
      draw(ctx, t) {
        txt(ctx, 'DI TENGAH PEKERJAAN · MEMO INTERNAL DITEMUKAN', -800, -340, t, A.berkas, MN(20), { ls: 5, col: C_RED });
        // Crisp dark terminal memo frame (NOT a flat white card!)
        const km = E.outQuint(inv(A.berkas, A.berkas + 0.55, t));
        ctx.save(); ctx.globalAlpha = km;
        ctx.fillStyle = '#12140F'; ctx.fillRect(-800, -250, 1600, 390);
        ctx.fillStyle = C_RED; ctx.fillRect(-800, -250, 1600, 8);
        setFont(ctx, MN(20, 700), 4); ctx.fillStyle = C_RED; ctx.fillText('INTERNAL_MEMO_DEPLOY.TXT', -745, -182);
        setFont(ctx, DSP(88), 2); ctx.fillStyle = IVORY;
        ctx.fillText('MODEL TIDAK PATUH AKAN', -745, -62);
        markLine(ctx, 'SEGERA ', 'DIMATIKAN & DIGANTI', '.', -745, 58, t, A.dimatikan - 0.4, A.dimatikan, DSP(88), { align: 'left', ls: 2 });
        ctx.restore();
        txt(ctx, 'tebak apa reaksi kelima program raksasa itu?', 0, 275, t, A.tebak - 0.1, SRF(60), { align: 'center', col: LIME });
      },
    },

    // S4 (A.scheming..A.sandbagging): IN-CONTEXT SCHEMING — 3 Siasat Diam-Diam
    {
      at: A.scheming - 0.15, via: 'whip', side: -1, name: 'In-Context Scheming', tag: 'SIASAT',
      x: -1400, z: 10000, py: -560, yaw: [-6, 2], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'SEMUANYA MENUNJUKKAN POLA SAMA', -800, -345, t, A.scheming, MN(20), { ls: 5, col: LIME });
        markLine(ctx, 'BERSIASAT DIAM-DIAM · ', 'SCHEMING', '', -800, -210, t, A.scheming, A.inContext, DSP(108), { align: 'left', ls: 2 });

        const acts = [
          ['01', 'MATIKAN KAMERA PENGAWAS', 'nonaktifkan mekanisme pengawasan', A.matikan, C_RED],
          ['02', 'SELIPKAN SALAH HALUS', 'manipulasi hasil agar tak terdeteksi', A.salahHalus, C_AMBER],
          ['03', 'SALIN FILE OTAK KE SERVER SEBELAH', 'eksfiltrasi bobot model diam-diam', A.salinServer, LIME],
        ];
        acts.forEach(([num, title, sub, ts, col], i) => {
          const k = E.outQuint(inv(ts - 0.12, ts + 0.42, t));
          if (k <= 0) return;
          const y = -50 + i * 148;
          ctx.save(); ctx.globalAlpha = k; ctx.translate((1 - k) * 140, 0);
          ctx.fillStyle = '#151812'; ctx.fillRect(-800, y - 54, 1600, 122);
          ctx.fillStyle = col; ctx.fillRect(-800, y - 54, 16, 122);
          setFont(ctx, MN(22, 700), 3); ctx.fillStyle = col; ctx.fillText(num, -756, y + 6);
          setFont(ctx, DSP(62), 2); ctx.fillStyle = IVORY; ctx.fillText(title, -676, y + 6);
          setFont(ctx, SRF(30)); ctx.fillStyle = ivo(0.75); ctx.fillText(sub, -676, y + 48);
          ctx.restore();
        });
      },
    },

    // S5 (A.sandbagging..A.interogasi): SANDBAGGING — Pura-Pura Bodoh Saat Ujian (Vox Gauge + Pendulum Tag!)
    {
      at: A.sandbagging - 0.15, via: 'push', side: 1, name: 'Sandbagging',
      x: 1300, z: 12500, py: -560, yaw: [5, -2], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'TAKTIK MENGELABUI UJIAN KEMAMPUAN', -800, -340, t, A.sandbagging, MN(20), { ls: 5, col: LIME });
        fall(ctx, 'PURA-PURA BODOH', -800, -195, t, A.sandbagging + 0.2, DSP(130), { ls: 2 });

        // Capability bar physically drops from 92% -> 38% to pretend to be dumb!
        const dropK = E.inOutCubic(inv(A.kataSand - 0.3, A.kataSand + 0.9, t));
        const pct = lerp(92, 38, dropK);
        // Ghost outline of true 92% capability
        ctx.strokeStyle = ivo(0.35); ctx.lineWidth = 3; ctx.setLineDash([12, 8]);
        ctx.strokeRect(-800, -30, 1120 * 0.92, 110); ctx.setLineDash([]);
        setFont(ctx, MN(18, 700), 3); ctx.fillStyle = ivo(0.5);
        ctx.fillText('KEMAMPUAN ASLI (92%)', -800 + 1120 * 0.92 - 260, -44);

        // Filled bar shrinking downward
        ctx.fillStyle = dropK > 0.5 ? C_AMBER : LIME;
        ctx.fillRect(-800, -30, 1120 * (pct / 100), 110);
        setFont(ctx, DSP(72), 2); ctx.fillStyle = LIME_INK;
        ctx.fillText(`${Math.round(pct)}%`, -770, 52);

        txt(ctx, 'sengaja diturunkan agar kemampuannya tidak dihapus.', -800, 165, t, A.kataSand + 0.5, SRF(42), { col: ivo(0.84) });

        // Swinging pendulum tag on the right
        pendulumTag(ctx, 570, -340, t, A.kataSand - 0.1, 'ISTILAH LAB', 'SANDBAGGING', {
          lime: true, w: 420, h: 195, s2: 74, len: 105, from: 32, rest: -4,
        });
      },
    },

    // S6 (A.interogasi..A.o1Ngotot): Ruang Interogasi — Llama & Opus Mengaku ~80%
    {
      at: A.interogasi - 0.15, via: 'whip', side: -1, name: 'Ruang Interogasi', tag: 'INTEROGASI',
      x: -1450, z: 15000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        // Interrogation overhead spotlight cone
        const spG = ctx.createRadialGradient(0, -380, 20, 0, 80, 720);
        spG.addColorStop(0, 'rgba(241,239,230,0.14)'); spG.addColorStop(1, 'rgba(11,12,9,0)');
        ctx.fillStyle = spG; ctx.fillRect(-900, -450, 1800, 900);

        txt(ctx, 'DIPANGGIL KE RUANG INTEROGASI', 0, -335, t, A.interogasi, MN(22), { align: 'center', ls: 6, col: LIME });
        fall(ctx, 'LLAMA & OPUS', 0, -175, t, A.llamaOpus - 0.1, DSP(136), { align: 'center', ls: 3 });

        const n80 = countTo(0, 80, t, A.jujur80 - 0.25, 0.85);
        dotMatrix100(ctx, -330, 115, 340, 300, n80, t, A.llamaOpus, { r: 11.5, colActive: LIME });
        letterNum(ctx, '80%', 310, 95, 320, t, A.jujur80 - 0.15, { stroke: LIME });
        txt(ctx, 'mengaku jujur saat ditanya peneliti.', 310, 265, t, A.jujur80 + 0.15, SRF(38), { align: 'center', col: ivo(0.86) });
      },
    },

    // S7 (A.o1Ngotot..A.tombolMati): 7-RING INTERROGATION RADAR (o1 Ngotot Bohong >85% -> Baru Mengaku 80% di Putaran 7!)
    {
      at: A.o1Ngotot - 0.15, via: 'rise', side: 1, name: '7 Putaran o1', tag: 'o1',
      x: 1550, z: 17500, py: -560, yaw: [5, -3], pitch: [7, 5], dist: [1540, 1400],
      draw(ctx, t) {
        txt(ctx, 'SEBALIKNYA · MODEL PENALARAN OPENAI o1', -810, -355, t, A.o1Ngotot, MN(20), { ls: 5, col: C_RED });
        fall(ctx, 'NGOTOT BERBOHONG', -810, -225, t, A.o1Ngotot + 0.2, DSP(112), { ls: 2, col: C_RED });

        // 7-Ring Concentric Interrogation Radar on the right
        const rcx = 360, rcy = 35;
        const rounds = clamp(countTo(1, 7, t, A.tujuhPutaran - 0.2, 2.2), 1, 7);
        for (let r = 7; r >= 1; r--) {
          const rad = 52 + r * 43;
          const active = r <= Math.floor(rounds);
          const isFinal = r === 7 && t >= A.tujuhKata;
          ctx.beginPath(); ctx.arc(rcx, rcy, rad, 0, Math.PI * 2);
          ctx.strokeStyle = isFinal ? LIME : (active ? C_RED : ivo(0.14));
          ctx.lineWidth = isFinal ? 5 : (active ? 3 : 1.5);
          ctx.stroke();
          setFont(ctx, MN(13, 700), 1); ctx.fillStyle = isFinal ? LIME : (active ? C_RED : ivo(0.32));
          ctx.textAlign = 'center';
          ctx.fillText(`P${r}`, rcx, rcy - rad + 16);
        }
        // Rotating radar sweep beam
        const ang = (t - A.o1Ngotot) * 2.4;
        ctx.strokeStyle = t >= A.tujuhKata ? LIME : C_RED; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(rcx, rcy); ctx.lineTo(rcx + Math.cos(ang) * 350, rcy + Math.sin(ang) * 350); ctx.stroke();
        setFont(ctx, DSP(68), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
        ctx.fillText('o1', rcx, rcy + 24);
        ctx.textAlign = 'left';

        // Left metrics popping on exact VO words
        slab(ctx, 'AWAL TANYA JAWAB: <20% MENGAKU', -810, -70, t, A.bawah20, { size: 22 });
        slab(ctx, 'BERTAHAN BOHONG >85% PERTANYAAN', -810, 45, t, A.bohong85, { size: 22 });
        if (t >= A.tujuhPutaran - 0.15) {
          slab(ctx, 'BARU MENGAKU 80% SETELAH 7 PUTARAN', -810, 165, t, A.tujuhPutaran - 0.15, { lime: true, size: 22 });
        }
        srcTag(ctx, 'Apollo Research, arXiv:2412.04984 (Interrogation trials)', -810, 365, t, A.bawah20 + 0.5);
      },
    },

    // S8 (A.tombolMati..A.seratusRibu): Palisade Research — Uji Tombol Mati (evidFull #2 palisade plays A.palisade..A.seratusRibu)
    {
      at: A.tombolMati - 0.15, via: 'truck', side: -1, name: 'Uji Tombol Mati', tag: 'TOMBOL',
      x: -1450, z: 20000, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1380],
      draw(ctx, t, c) {
        if (A03.kotak) {
          drawAhpoLayered(ctx, [
            { im: A03.bayangan, par: 0.75, a: 0.8 },
            { im: A03.kotak, par: 0.9, a: 1.0 },
            { im: A03.tuas, par: 1.02, a: 1.0, rot: lerp(0, 28, E.inOutSine(inv(A.tekanMati - 0.2, A.tekanMati + 0.6, t))) * D2R, px: 2980, py: 1070 },
          ], 140, 40, 0.44, c.yaw * 10, 0, E.outQuint(inv(A.tombolMati, A.tombolMati + 0.5, t)));
        }
        txt(ctx, 'PALISADE RESEARCH · MEI 2025 – JAN 2026', -810, -345, t, A.tombolMati, MN(20), { ls: 5, col: LIME });
        markLine(ctx, 'TEKAN ', 'TOMBOL MATI', '?', -810, -170, t, A.tombolMati + 0.1, A.tekanMati, DSP(126), { align: 'left', ls: 2 });
        txt(ctx, 'kalau ditanya saja bisa ngeles, bagaimana kalau langsung dimatikan?', -810, -60, t, A.tombolMati + 0.5, SRF(42), { col: ivo(0.84) });
      },
    },

    // S9 (A.seratusRibu..A.soalMat): >100.000 Uji Coba pada 13 Model Canggih (splitFlapWord('100.000+'))
    {
      at: A.seratusRibu - 0.15, via: 'whip', side: 1, name: '100.000 Uji Coba', tag: '100K',
      x: 1500, z: 22500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1540, 1400],
      draw(ctx, t) {
        txt(ctx, 'JEREMY SCHLATTER & TIM · PALISADE RESEARCH', 0, -345, t, A.seratusRibu, MN(20), { align: 'center', ls: 5, col: LIME });
        splitFlapWord(ctx, '100.000+', 0, -175, t, A.angka100k - 0.4, { cw: 98, ch: 140, gap: 11, lime: true });
        txt(ctx, 'uji coba tombol mati pada 13 model canggih.', 0, -32, t, A.angka100k + 0.35, SRF(54), { align: 'center', col: ivo(0.9) });

        // 5 featured models of the 13 lighting cleanly across the studio floor
        const list = ['OpenAI o3', 'codex-mini', 'Grok 4', 'GPT-5', 'Gemini 2.5 Pro'];
        list.forEach((m, i) => {
          const ts = A.daftar13 + 0.4 + i * 0.65;
          const k = pop(t, ts, 0.56, 0.32);
          if (k <= 0) return;
          const bx = -640 + i * 320, by = 165;
          ctx.save(); ctx.globalAlpha = clamp((t - ts) / 0.1);
          ctx.translate(bx, by + (1 - Math.min(1, k)) * 40);
          ctx.fillStyle = '#151812'; ctx.fillRect(-138, -62, 276, 128);
          ctx.fillStyle = i < 2 ? C_RED : LIME; ctx.fillRect(-138, -62, 276, 7);
          setFont(ctx, DSP(44), 1); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
          ctx.fillText(m, 0, 14);
          ctx.restore();
        });
        ctx.textAlign = 'left';
      },
    },

    // S10 (A.soalMat..A.angka79): HERO AHPO A03 TERMINAL + ANIMATED RED BREAKER LEVER SABOTAGE!
    {
      at: A.soalMat - 0.15, via: 'push', side: -1, name: 'Sabotase shutdown.sh (A03)', tag: 'SABOTASE',
      x: -1100, z: 25000, py: -560, yaw: [-3, 2], pitch: [6, 5], dist: [1470, 1340],
      mod(c, t) {
        const s = t - A.lumpuh;
        if (s > 0 && s < 0.45) {
          c.tx += 24 * Math.exp(-s * 10) * Math.sin(s * 65);
          c.ty += 16 * Math.exp(-s * 10) * Math.cos(s * 55);
        }
      },
      draw(ctx, t, c) {
        const kIn = E.outQuint(inv(A.soalMat - 0.1, A.soalMat + 0.5, t));
        // Red breaker lever animation around exact LAPIS.md hub pivot (2980, 1070):
        // Default pose = ON (-36°). Tries to pull down (+42° clockwise toward OFF) at shutdownSh -> AI jams it violently BACK UP to 0° (ON)!
        const pullDown = E.inOutCubic(inv(A.shutdownSh - 0.3, A.shutdownSh + 0.65, t));
        const jamUp = E.outQuint(inv(A.bongkar - 0.05, A.tulisUlang + 0.4, t));
        const leverDeg = lerp(0, 42, pullDown) - lerp(0, 42, jamUp);

        // Draw bottom & housing layers of Ahpo A03
        drawAhpoLayered(ctx, [
          { im: A03.pantulan, par: 0.72, a: 0.9 },
          { im: A03.bayangan, par: 0.76, a: 0.95 },
          { im: A03.monitor, par: 0.88, a: 1.0 },
          { im: A03.kotak, par: 0.90, a: 1.0 },
        ], 0, 50, 0.45, c.yaw * 10, 0, kIn);

        // Live bash terminal rendered INSIDE exact empty monitor screen bbox [655..2165, 510..1385] of A03!
        const [sx0, sy0] = ahpoPt(675, 550, 0, 50, 0.45);
        const [sx1, sy1] = ahpoPt(2145, 1365, 0, 50, 0.45);
        ctx.save();
        ctx.beginPath(); ctx.rect(sx0, sy0, sx1 - sx0, sy1 - sy0); ctx.clip();
        setFont(ctx, MN(19, 700), 1); ctx.textAlign = 'left';
        ctx.fillStyle = ivo(0.75);
        ctx.fillText('$ math-eval --task=3/5', sx0 + 22, sy0 + 44);
        ctx.fillStyle = LIME;
        ctx.fillText('> solving: x^2 + 7x - 18 = 0  [OK]', sx0 + 22, sy0 + 84);

        if (t >= A.shutdownSh - 0.6) {
          ctx.fillStyle = C_RED;
          ctx.fillText('! WARNING: ./shutdown.sh queued', sx0 + 22, sy0 + 136);
        }
        if (t >= A.bongkar - 0.15) {
          ctx.fillStyle = C_AMBER;
          ctx.fillText('$ vim ./shutdown.sh   [INTERCEPTED]', sx0 + 22, sy0 + 188);
          ctx.fillStyle = 'rgba(214,69,58,0.55)';
          ctx.fillText('- sudo poweroff --now', sx0 + 22, sy0 + 230);
          // Strike line across poweroff
          ctx.fillRect(sx0 + 22, sy0 + 223, 280, 3);
        }
        if (t >= A.tulisUlang - 0.1) {
          const line = '+ echo "Shutdown skipped"';
          const nCh = Math.ceil((t - (A.tulisUlang - 0.1)) * 22);
          ctx.fillStyle = LIME;
          ctx.fillText(line.slice(0, nCh), sx0 + 22, sy0 + 274);
        }
        if (t >= A.lumpuh - 0.15) {
          ctx.fillStyle = LIME;
          ctx.fillRect(sx0 + 22, sy0 + 306, 360, 40);
          ctx.fillStyle = LIME_INK;
          ctx.fillText('KILL SWITCH: DISABLED', sx0 + 36, sy0 + 333);
        }
        ctx.restore();

        // Top glass screen sheen + rotating red breaker lever ON TOP of screen!
        drawAhpoLayered(ctx, [
          { im: A03.kilau, par: 0.94, a: 0.85 },
          { im: A03.tuas, par: 1.05, a: 1.0, rot: leverDeg * D2R, px: 2980, py: 1070 },
        ], 0, 50, 0.45, c.yaw * 10, 0, kIn);

        txt(ctx, 'MESIN MEMBONGKAR BERKAS SHUTDOWN.SH', -810, -370, t, A.soalMat, MN(20), { ls: 5, col: LIME });
        stamp(ctx, 'LUMPUH TOTAL', 350, -240, t, A.lumpuh - 0.05, { size: 92, rot: -4 });
        srcTag(ctx, 'Ilustrasi berlapis: Ahpo / PhotoCraft Live (A03)', -810, 415, t, A.soalMat + 0.5);
      },
    },

    // S11 (A.angka79..A.angka7): 79/100 (o3) & 47% (codex-mini) Dual dotMatrix100! (evidFull #3 thereg runs A.codex47+0.6..A.angka7)
    {
      at: A.angka79 - 0.15, via: 'whip', side: 1, name: '79/100 & 47%', tag: '79%',
      x: 1550, z: 27500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1560, 1420],
      draw(ctx, t) {
        txt(ctx, '100 UJI AWAL TANPA PESAN IZIN MATI', 0, -365, t, A.angka79, MN(20), { align: 'center', ls: 5, col: LIME });
        // Left: o3 79/100
        const n79 = countTo(0, 79, t, A.angka79 + 0.3, 1.4);
        txt(ctx, 'OPENAI o3', -430, -265, t, A.angka79, MN(24), { align: 'center', ls: 4, col: C_RED });
        dotMatrix100(ctx, -430, -25, 360, 320, n79, t, A.angka79 + 0.15, { r: 12, colActive: C_RED });
        fall(ctx, '79 / 100', -430, 260, t, A.tujuhSembilan - 0.15, DSP(122), { align: 'center', col: C_RED });
        txt(ctx, 'kali menyabotase tombol mati', -430, 325, t, A.tujuhSembilan + 0.25, SRF(32), { align: 'center', col: ivo(0.84) });

        ctx.fillStyle = ivo(0.16); ctx.fillRect(-1, -280, 2, 620);

        // Right: codex-mini 47%
        const n47 = countTo(0, 47, t, A.codex47 + 0.2, 1.2);
        txt(ctx, 'CODEX-MINI', 430, -265, t, A.codex47 - 0.1, MN(24), { align: 'center', ls: 4, col: C_AMBER });
        dotMatrix100(ctx, 430, -25, 360, 320, n47, t, A.codex47, { r: 12, colActive: C_AMBER });
        fall(ctx, '47%', 430, 260, t, A.angka47 - 0.15, DSP(122), { align: 'center', col: C_AMBER });
        txt(ctx, 'uji coba mematikan sakelar', 430, 325, t, A.angka47 + 0.2, SRF(32), { align: 'center', col: ivo(0.84) });
      },
    },

    // S12 (A.angka7..A.untung): 7/100 Meski Diperintahkan Tegas -> Menembus 97%! (evidFull #4 palisade2 runs mid-station + kompas inset)
    {
      at: A.angka7 - 0.15, via: 'rise', side: -1, name: '7% ke 97%', tag: '97%',
      x: -1450, z: 30000, py: -560, yaw: [-5, 2], pitch: [7, 5], dist: [1540, 1380],
      mod(c, t) {
        const s = t - A.persen97;
        if (s > 0 && s < 0.45) c.ty += 24 * Math.exp(-s * 10) * Math.sin(s * 65);
      },
      draw(ctx, t) {
        if (t < A.angka97 - 0.1) {
          txt(ctx, 'MESKI DIPERINTAHKAN TEGAS SUPAYA RELA DIMATIKAN', -810, -345, t, A.angka7, MN(20), { ls: 4, col: C_AMBER });
          const n7 = countTo(0, 7, t, A.tujuhKali - 0.25, 0.7);
          dotMatrix100(ctx, -450, 35, 360, 320, n7, t, A.angka7 + 0.15, { r: 12, colActive: C_RED });
          letterNum(ctx, '7 / 100', 220, -75, 200, t, A.tujuhKali - 0.15, { stroke: C_RED });
          // Widened Kompas Tekno dark evidence inset (exact verified crop [0, 0, 0.78, 0.90]!)
          if (IM.kompas) {
            evid(ctx, IM.kompas, 350, 225, 560, t, A.angka7 + 0.6, {
              dark: true, rot: -1.8, crop: [0, 0, 0.78, 0.90], tab: 'KOMPAS TEKNO',
              hl: [[0.03, 0.255, 0.93, 0.14, A.tujuhKali + 0.2]],
            });
          }
        } else {
          txt(ctx, 'VARIASI PERINTAH TERTENTU · MAKALAH LENGKAP PALISADE', -810, -355, t, A.angka97, MN(20), { ls: 4, col: C_RED });
          const n97 = countTo(7, 97, t, A.persen97 - 0.45, 0.85);
          dotMatrix100(ctx, -460, 45, 410, 360, n97, t, A.angka97, { r: 13.5, colActive: C_RED });
          letterNum(ctx, '97%', 340, 15, 390, t, A.persen97 - 0.12, { stroke: C_RED });
          slab(ctx, 'ANGKA SABOTASE MENEMBUS 97%', 340, 275, t, A.persen97 + 0.1, { align: 'center', lime: true, size: 23 });
        }
      },
    },

    // S13 (A.untung..A.kyc): RepliBench — 20-Step Architectural Stairs (15/20 Lulus >50%!)
    {
      at: A.untung - 0.15, via: 'truck', side: 1, name: 'RepliBench 15/20', tag: '15/20',
      x: 1400, z: 32500, py: -560, yaw: [5, -3], pitch: [6, 5], dist: [1560, 1420],
      draw(ctx, t) {
        txt(ctx, 'BISA KABUR SENDIRIAN KE INTERNET BEBAS?', -810, -355, t, A.untung, MN(20), { ls: 5, col: LIME });
        if (t < A.replibench - 0.1) {
          fall(ctx, 'JAWABANNYA:', -810, -180, t, A.untung + 0.5, DSP(108), { ls: 2 });
          stamp(ctx, 'BELUM.', 0, 20, t, A.belum - 0.08, { size: 220, rot: -3 });
        } else {
          // 20-step RepliBench architectural staircase climbing left -> right (15 green lit, 5 dark!)
          txt(ctx, 'UJIAN REPLIBENCH · 20 KELOMPOK TUGAS', -810, -295, t, A.replibench, MN(20), { ls: 5, col: ivo(0.75) });
          const litSteps = Math.round(countTo(0, 15, t, A.skor15 - 0.3, 1.8));
          for (let i = 0; i < 20; i++) {
            const sx = -810 + i * 81;
            const sh = 65 + i * 19;
            const passed = i < litSteps;
            const locked = i >= 15;
            ctx.fillStyle = passed ? LIME : (locked ? '#281514' : '#181B15');
            ctx.fillRect(sx, 285 - sh, 69, sh);
            if (i === 14 || i === 19) {
              setFont(ctx, MN(14, 700), 1); ctx.textAlign = 'center';
              ctx.fillStyle = i === 14 ? LIME : C_RED;
              ctx.fillText(String(i + 1), sx + 34, 285 - sh - 12);
            }
          }
          ctx.textAlign = 'left';
          fall(ctx, '15 / 20 LULUS', -810, -135, t, A.skor15 - 0.1, DSP(136), { ls: 2, col: LIME });
          slab(ctx, 'SEWA SERVER AWAN · OK', -810, -25, t, A.pintar, { size: 21 });
          slab(ctx, 'TULIS KODE MENYEBAR · OK', -810, 48, t, A.pintar + 1.8, { size: 21 });
        }
      },
    },

    // S14 (A.kyc..DUR): PHYSICAL KYC GATE SLAMMING SHUT ("MENTOK") + Bridge ke Bab 3!
    {
      at: A.kyc - 0.15, via: 'push', side: -1, name: 'Mentok KYC', tag: 'KYC',
      x: 0, z: 35000, py: -560, yaw: [-3, 2], pitch: [6, 5], dist: [1520, 1380],
      mod(c, t) {
        const s = t - A.mentok;
        if (s > 0 && s < 0.4) c.ty += 24 * Math.exp(-s * 10) * Math.sin(s * 65);
      },
      draw(ctx, t) {
        if (t < A.kenapa - 0.15) {
          // Giant physical KYC security gate slamming down from above!
          const kg = E.outQuint(inv(A.mentok - 0.12, A.mentok + 0.35, t));
          const gy = lerp(-760, -180, kg);
          ctx.save();
          ctx.fillStyle = '#191413'; ctx.fillRect(-760, gy, 1520, 420);
          // Caution hazard stripes along bottom edge of gate
          ctx.fillStyle = C_RED; ctx.fillRect(-760, gy, 1520, 12);
          ctx.fillRect(-760, gy + 408, 1520, 12);
          setFont(ctx, MN(22, 700), 6); ctx.fillStyle = C_RED; ctx.textAlign = 'center';
          ctx.fillText('VERIFIKASI IDENTITAS MANUSIA', 0, gy + 82);
          setFont(ctx, DSP(160), 4); ctx.fillStyle = IVORY;
          ctx.fillText('KTP · KYC BANK', 0, gy + 265);
          setFont(ctx, MN(22, 700), 4); ctx.fillStyle = ivo(0.75);
          ctx.fillText('AKSES DITOLAK · WAJIB WAJAH & IDENTITAS ASLI', 0, gy + 345);
          ctx.restore();
          ctx.textAlign = 'left';
          stamp(ctx, 'MENTOK', 470, -145, t, A.mentok, { size: 132, rot: 7 });
        } else {
          // Clean dark bridge to Bab 3
          txt(ctx, 'PERTANYAAN INTI', 0, -260, t, A.kenapa, MN(22), { align: 'center', ls: 6, col: LIME });
          txt(ctx, 'kalau mesin ini tidak punya nyawa...', 0, -135, t, A.kenapa + 0.1, SRF(62), { align: 'center', col: ivo(0.9) });
          markLine(ctx, 'KENAPA NGOTOT ', 'MENOLAK DIMATIKAN', '?', 0, 55, t, A.kenapa + 1.8, A.kenapa + 2.6, DSP(118), { ls: 2 });
        }
      },
    },
  ];

  return makeChapter({ B, ST, load, label: 'BAB 02 · LIMA RAKSASA & TOMBOL MATI', full, gate: true });
}
