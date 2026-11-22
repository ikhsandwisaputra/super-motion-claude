// Bab Penutup · "Pendapatku & Giliranmu" — VO take 09 (36.88 s) + ~26 s End Screen AGI Video 4 (total 51.15 s).
// Warna hangat terang parchment #ECE1CC, tinta #11120E, aksen tunggal matte #C8F53C (nol neon border).
// S0 (0..8.1s): Timbangan keadilan PUSAT DATA -> SWRO LAUT vs WADUK -> WARGA terlindungi, stempel matte lime LEBIH ADIL.
// S1 (8.1..15.2s): Kartu syarat arsitektural 01 // TRANSPARANSI PUBLIK (IZIN + DATA BRINE -> stempel TERBUKA).
// S2 (15.2..25.1s): Templat komentar YouTube + subscribe diklik kursor (non-tonal) — semua UI rapi di separuh kiri (kanan bersih <= 23.5s).
// Layar Akhir (25.16..51.15s): Rekomendasi Video 4 AGI yang sudah tayang di KIRI memakai thumbnail asli Ahpo (next-agi-setara-manusia.jpg)
// dalam bingkai sinema gelap matte + panah melengkung menuju slot End Screen YouTube di kanan; separuh kanan tenang #ECE1CC + watermark halus.
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, spring, D2R, LIME, LIME_INK, INK, ivo,
  setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  markLine, slab, txt, gone, theme, mk, rnd,
} from './kit.js';
import { stamp } from './draw.js';
import { layarFoto, kreditLatar } from './batam.js';
import { check, cover, strike, letterTex } from './pustaka/dasar.js';
import { subscribe } from './pustaka/penutup.js';
import { UIF } from './pustaka/ui.js';

export function makeFilm() {
  theme(true, { bg: '#ECE1CC', bgrgb: '236,225,204', ink: '#11120E', inkrgb: '17,18,14', vig: 0.22 });
  const { T: A } = timing(B);
  const IM = {};
  let WM_TEX = null;

  // Bangun tekstur watermark kertas arsitektural sekali saat load (tampil halus saat End Screen tenang)
  function buildWatermark() {
    const [c, g] = mk(W, H);
    const words = ['BATAM', 'SWRO', 'LAUT', 'WADUK', 'NONGSA', 'PUBLIK', 'IZIN', 'AIR', 'PIPA', 'DATA'];
    const tex = letterTex(MN(18, 700), 12, 202609, 0.028, { rgb: '17,18,14', words, ls: 4 });
    for (let y = 0; y < H; y += tex.height) {
      for (let x = 0; x < W; x += tex.width) g.drawImage(tex, x, y);
    }
    // Busur kontur tipis & garis arsitektural sangat halus (~3% tinta)
    g.strokeStyle = 'rgba(17,18,14,0.038)';
    g.lineWidth = 1.5;
    for (let r = 240; r <= 880; r += 160) {
      g.beginPath();
      g.arc(960, 1080, r, Math.PI * 1.05, Math.PI * 1.95);
      g.stroke();
    }
    g.fillStyle = 'rgba(17,18,14,0.06)';
    for (let i = 0; i < 1400; i++) {
      const px = rnd(i * 3.1 + 7) * W;
      const py = rnd(i * 5.7 + 13) * H;
      g.fillRect(px, py, 1.5, 1.5);
    }
    return c;
  }

  async function load() {
    [IM.ocean_aerial, IM.network_cables, IM.nextThumb] = await Promise.all([
      loadVid('../assets/shared/vid/', 'ocean_aerial'),
      loadVid('../assets/shared/vid/', 'network_cables'),
      loadImg('../assets/shared/own/next-agi-setara-manusia.jpg', 1280),
    ]);
    WM_TEX = buildWatermark();
  }

  const BG_PLATES = [
    {
      vid: 'ocean_aerial', t0: -0.2, t1: A.nah - 0.15, fx: 0.5, fy: 0.5,
      grade: 'saturate(0.28) contrast(1.06) brightness(1.08)',
      cap: 'PERAIRAN BATAM · ILUSTRASI', kredit: 'Video: Ruvim M / Pexels',
    },
    {
      vid: 'network_cables', t0: A.nah - 0.45, t1: 23.25, fx: 0.5, fy: 0.5, dir: -1,
      grade: 'saturate(0.24) contrast(1.08) brightness(1.12)',
      cap: 'JARINGAN SERVER · ILUSTRASI', kredit: 'Video: Dima Krivoy / Pexels',
    },
  ];

  // ── Stasiun 0: Timbangan Keadilan (0..8.1 s) ─────────────────────────────────────────────────────────────────
  function drawPanCard(ctx, x, y, w, h, o) {
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = 'rgba(17,18,14,0.16)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = o.dark ? '#15160F' : '#FAF7F0';
    ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 14); ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = o.dark ? '#15160F' : INK;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 14); ctx.stroke();

    // Strip aksen kiri
    ctx.fillStyle = o.dark ? LIME : '#15160F';
    ctx.beginPath(); ctx.roundRect(-w / 2 + 12, -h / 2 + 16, 6, h - 32, 3); ctx.fill();

    setFont(ctx, MN(14), 4);
    ctx.textAlign = 'left';
    ctx.fillStyle = o.dark ? LIME : ivo(0.62);
    ctx.fillText(o.kicker, -w / 2 + 32, -h / 2 + 34);

    // Pastikan judul muat rapi di dalam kartu dengan padding kanan >= 28 px
    let fs = 46;
    setFont(ctx, DSP(fs), 1);
    const maxW = w - 62;
    const tw = ctx.measureText(o.title).width;
    if (tw > maxW) {
      fs = Math.floor(fs * (maxW / tw));
      setFont(ctx, DSP(fs), 1);
    }
    ctx.fillStyle = o.dark ? '#F1EFE6' : INK;
    ctx.fillText(o.title, -w / 2 + 32, -h / 2 + 84);

    setFont(ctx, MN(14, 400), 2);
    ctx.fillStyle = o.dark ? 'rgba(241,239,230,0.75)' : ivo(0.72);
    ctx.fillText(o.sub, -w / 2 + 32, -h / 2 + 116);
    ctx.restore();
  }

  function drawBalanceScale(ctx, t) {
    const kBase = E.outQuint(inv(0.55, 1.15, t));
    if (kBase <= 0) return;

    // Sudut balok timbangan: mula -7.5° saat beban industri masuk, lalu rata 0° dengan pegas di "lebih adil"
    const kLoadL = clamp((t - (A.mewajibkan - 0.15)) / 0.45);
    const kLevel = t >= A.lebih ? spring(t - A.lebih, 0.48, 0.72) : 0;
    const rawDeg = lerp(0, -7.5, E.outCubic(kLoadL)) * (1 - kLevel);
    const swayDeg = 0.45 * Math.sin(t * 2.0) * kBase;
    const ang = (rawDeg + swayDeg) * D2R;

    const baseY = 250;
    const pivY = -105;
    const L = 468;

    ctx.save();
    ctx.globalAlpha *= kBase;

    // Alas & tiang arsitektural
    ctx.fillStyle = '#15160F';
    ctx.beginPath();
    ctx.moveTo(-190, baseY);
    ctx.lineTo(190, baseY);
    ctx.lineTo(148, baseY - 34);
    ctx.lineTo(-148, baseY - 34);
    ctx.closePath();
    ctx.fill();

    // Tiang vertikal arsitektural + garis kalibrasi parchment halus (aksen lime hanya untuk verdict & pin seimbang)
    const colH = (baseY - 34 - pivY) * E.outQuint(inv(0.60, 1.15, t));
    ctx.fillStyle = '#15160F';
    ctx.fillRect(-13, baseY - 34 - colH, 26, colH);
    ctx.fillStyle = 'rgba(236,225,204,0.42)';
    ctx.fillRect(-2, baseY - 34 - colH * 0.85, 4, colH * 0.72);
    ctx.fillStyle = 'rgba(236,225,204,0.32)';
    for (let k = 1; k <= 5; k++) {
      const ty = baseY - 34 - colH * (0.14 + k * 0.13);
      ctx.fillRect(-7, ty, 14, 1.5);
    }

    // Balok horizontal berputar di (0, pivY)
    ctx.save();
    ctx.translate(0, pivY);
    ctx.rotate(ang);
    ctx.fillStyle = '#15160F';
    ctx.beginPath(); ctx.roundRect(-L - 16, -10, (L + 16) * 2, 20, 10); ctx.fill();
    for (const sg of [-1, 1]) {
      ctx.fillStyle = '#FAF7F0';
      ctx.beginPath(); ctx.arc(sg * (L - 12), 0, 7, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // Pin tumpuan tengah — menyala lime saat seimbang di "adil"
    const kLock = E.outCubic(inv(A.adil, A.adil + 0.35, t));
    ctx.fillStyle = kLock > 0.4 ? LIME : '#FAF7F0';
    ctx.strokeStyle = '#15160F';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(0, pivY, 24, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#15160F';
    ctx.beginPath(); ctx.arc(0, pivY, 7, 0, Math.PI * 2); ctx.fill();

    // Posisi kedua titik gantung ujung balok
    const hxL = -(L - 12) * Math.cos(ang), hyL = pivY - (L - 12) * Math.sin(ang);
    const hxR = (L - 12) * Math.cos(ang), hyR = pivY + (L - 12) * Math.sin(ang);
    const dropLen = 185;

    // KIRI: PUSAT DATA -> SWRO LAUT
    const kLeft = E.outQuint(inv(A.mewajibkan - 0.15, A.mewajibkan + 0.35, t));
    if (kLeft > 0) {
      const pyL = hyL + dropLen;
      ctx.save();
      ctx.globalAlpha *= kLeft;
      ctx.strokeStyle = ivo(0.65);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(hxL, hyL); ctx.lineTo(hxL - 180, pyL);
      ctx.moveTo(hxL, hyL); ctx.lineTo(hxL + 180, pyL);
      ctx.stroke();

      // Nampan kiri
      ctx.fillStyle = '#15160F';
      ctx.beginPath(); ctx.roundRect(hxL - 228, pyL, 456, 14, 7); ctx.fill();

      const dyL = (1 - kLeft) * -50;
      drawPanCard(ctx, hxL, pyL - 74 + dyL, 434, 134, {
        dark: true,
        kicker: 'KEWAJIBAN INDUSTRI',
        title: 'PUSAT DATA → SWRO LAUT',
        sub: 'OLAH AIR LAUT MANDIRI',
      });
      txt(ctx, 'TIDAK SEDOT WADUK WARGA', hxL, pyL + 52, t, A.laut, MN(16), { align: 'center', ls: 3, col: ivo(0.75) });
      ctx.restore();
    }

    // KANAN: WADUK -> WARGA (terlindungi)
    const kRight = E.outQuint(inv(A.mengolah + 0.25, A.mengolah + 0.75, t));
    if (kRight > 0) {
      const pyR = hyR + dropLen;
      ctx.save();
      ctx.globalAlpha *= kRight;
      ctx.strokeStyle = ivo(0.65);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(hxR, hyR); ctx.lineTo(hxR - 180, pyR);
      ctx.moveTo(hxR, hyR); ctx.lineTo(hxR + 180, pyR);
      ctx.stroke();

      // Nampan kanan
      ctx.fillStyle = '#15160F';
      ctx.beginPath(); ctx.roundRect(hxR - 228, pyR, 456, 14, 7); ctx.fill();

      const dyR = (1 - kRight) * -40;
      drawPanCard(ctx, hxR, pyR - 74 + dyR, 434, 134, {
        dark: false,
        kicker: 'CADANGAN PUBLIK',
        title: 'WADUK → WARGA',
        sub: 'TERLINDUNGI SAAT KEMARAU',
      });

      // Lencana centang perlindungan di sudut kanan atas kartu
      if (t >= A.waduk - 0.15) {
        check(ctx, hxR + 196, pyR - 134 + dyR, 24, t, A.waduk - 0.15);
      }
      txt(ctx, 'AMAN BUAT RUMAH WARGA', hxR, pyR + 52, t, A.warga - 0.45, MN(16), { align: 'center', ls: 3, col: ivo(0.75) });
      ctx.restore();
    }

    ctx.restore();
  }

  // ── Stasiun 1: Kartu Syarat Arsitektural 01 // TRANSPARANSI PUBLIK (8.1..15.2 s) ────────────────────────────
  function drawPillarBox(ctx, x, y, w, h, t, t0, o) {
    const k = E.outQuint(inv(t0, t0 + 0.45, t));
    if (k <= 0) return;
    ctx.save();
    ctx.globalAlpha *= k;
    ctx.translate(x, y + (1 - k) * 32);

    ctx.fillStyle = '#EFECE2';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 14); ctx.fill(); ctx.stroke();

    // Strip lime atas
    ctx.fillStyle = LIME;
    ctx.fillRect(-w / 2 + 24, -h / 2 + 18, 86, 7);

    setFont(ctx, MN(16), 4);
    ctx.textAlign = 'left';
    ctx.fillStyle = ivo(0.68);
    ctx.fillText(o.kicker, -w / 2 + 28, -h / 2 + 54);

    setFont(ctx, DSP(82), 1);
    ctx.fillStyle = INK;
    ctx.fillText(o.title, -w / 2 + 28, -h / 2 + 138);

    setFont(ctx, MN(18, 400), 1);
    ctx.fillStyle = ivo(0.84);
    o.lines.forEach((ln, i) => ctx.fillText(ln, -w / 2 + 28, -h / 2 + 186 + i * 34));

    if (o.checkAt !== undefined && t >= o.checkAt) {
      check(ctx, w / 2 - 44, -h / 2 + 44, 22, t, o.checkAt);
    }
    ctx.restore();
  }

  function drawConditionCard(ctx, t) {
    const t0 = A.syarat - 0.1;
    const k = E.outQuint(inv(t0, t0 + 0.52, t));
    if (k <= 0) return;
    const Wc = 1440, Hc = 690, L = -Wc / 2, T = -Hc / 2 + 12;

    ctx.save();
    ctx.globalAlpha *= k;
    ctx.translate(0, (1 - k) * 36);

    // Bayangan arsitektural
    ctx.fillStyle = 'rgba(17,18,14,0.14)';
    ctx.beginPath(); ctx.roundRect(L + 16, T + 16, Wc, Hc, 20); ctx.fill();

    // Lembar utama kartu
    ctx.fillStyle = '#FAF7F0';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.roundRect(L, T, Wc, Hc, 20); ctx.fill(); ctx.stroke();

    // Header gelap atas
    ctx.save();
    ctx.beginPath(); ctx.roundRect(L, T, Wc, 92, [20, 20, 0, 0]); ctx.clip();
    ctx.fillStyle = '#15160F';
    ctx.fillRect(L, T, Wc, 92);
    ctx.restore();

    // Isi header
    ctx.fillStyle = LIME;
    ctx.fillRect(L + 44, T + 38, 15, 15);
    setFont(ctx, MN(25), 7);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#F1EFE6';
    ctx.fillText('01 // TRANSPARANSI PUBLIK', L + 74, T + 54);

    txt(ctx, 'SYARAT TUNGGAL', L + Wc - 44, T + 53, t, A.satu, MN(17), { align: 'right', ls: 4, col: 'rgba(241,239,230,0.72)' });

    // Baris pengantar di kiri (memberi ruang bersih di kanan atas untuk stempel TERBUKA)
    txt(ctx, 'Syaratnya cuma satu:', L + 48, T + 158, t, A.syarat + 0.05, SRF(42), { col: INK });
    txt(ctx, 'pengawasan wajib terbuka ke publik.', L + 48, T + 206, t, A.pengawasan - 0.1, SRF(34), { col: ivo(0.75) });

    // Dua blok pilar: IZIN + DATA BRINE
    drawPillarBox(ctx, -350, T + 392, 608, 286, t, A.izin - 0.15, {
      kicker: '01A · DOKUMEN OPERASI',
      title: 'IZIN & KUOTA AIR',
      lines: ['• Dokumen izin terbuka untuk umum', '• Batas cadangan waduk diaudit'],
      checkAt: A.izin + 0.3,
    });

    // Tanda "+" penghubung di tengah
    const kp = E.outQuint(inv(A.garam - 0.35, A.garam, t));
    if (kp > 0) {
      ctx.save();
      ctx.globalAlpha *= kp;
      ctx.fillStyle = '#15160F';
      ctx.beginPath(); ctx.arc(0, T + 392, 26, 0, Math.PI * 2); ctx.fill();
      setFont(ctx, DSP(48), 0);
      ctx.textAlign = 'center';
      ctx.fillStyle = LIME;
      ctx.fillText('+', 0, T + 408);
      ctx.restore();
    }

    drawPillarBox(ctx, 350, T + 392, 608, 286, t, A.garam - 0.2, {
      kicker: '01B · SISA GARAM LAUT',
      title: 'DATA BRINE',
      lines: ['• Kadar 70.000 ppm & titik buang laut', '• Pantauan pengenceran real-time'],
      checkAt: A.lautnya + 0.25,
    });

    // Garis bawah & status publik
    ctx.fillStyle = ivo(0.2);
    ctx.fillRect(L + 44, T + Hc - 72, Wc - 88, 2);
    txt(ctx, 'DIAWASI WARGA · DATA TERBUKA', L + 48, T + Hc - 30, t, A.pengawasan + 0.2, MN(17), { ls: 3, col: ivo(0.72) });
    txt(ctx, 'AKSES: PUBLIK', L + Wc - 48, T + Hc - 30, t, A.publik - 0.25, MN(18), { align: 'right', ls: 4, col: INK });

    // Stempel TERBUKA di kanan atas badan kartu (bersih, tidak menimpa teks kiri maupun blok pilar)
    if (t >= A.terbuka) {
      stamp(ctx, 'TERBUKA', 445, T + 168, t, A.terbuka, { size: 96, rot: -5 });
    }

    ctx.restore();
  }

  // ── Stasiun 2: Templat Komentar YouTube di SEPARUH KIRI (15.2..25.3 s) ──────────────────────────────────────
  const KL1 = 'Kalau ada data center di kotaku,';
  const KL2 = 'syarat terpenting: ';
  const typed = (s, t, t0, cps) => s.slice(0, Math.max(0, Math.floor((t - t0) * cps)));

  function drawCommentBox(ctx, t) {
    const kh = E.outQuint(inv(A.tulis - 0.15, A.tulis + 0.35, t));
    if (kh <= 0) return;

    const X0 = -820, Y0 = -165, Wb = 760, Hb = 330;
    const Xtxt = X0 + 96, R1 = Y0 + 132, R2 = Y0 + 186;
    const tf = A.komentar + 0.15;
    const tk1 = A.kalau - 0.05;
    const cps1 = KL1.length / 1.75;
    const tk2 = A.raksasa - 0.35;
    const cps2 = KL2.length / 0.90;

    ctx.save();
    ctx.globalAlpha *= kh;
    ctx.translate(0, (1 - kh) * 24);

    // Kartu komposer bersih
    ctx.save();
    ctx.shadowColor = 'rgba(17,18,14,0.14)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 14;
    ctx.fillStyle = '#FAF7F0';
    ctx.beginPath(); ctx.roundRect(X0, Y0, Wb, Hb, 18); ctx.fill();
    ctx.restore();

    ctx.strokeStyle = ivo(0.18);
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(X0, Y0, Wb, Hb, 18); ctx.stroke();

    // Header ala YouTube
    setFont(ctx, UIF(26, 700), 0);
    ctx.textAlign = 'left';
    ctx.fillStyle = INK;
    ctx.fillText('Komentar', X0 + 32, Y0 + 48);

    setFont(ctx, MN(13, 400), 2);
    ctx.fillStyle = ivo(0.55);
    ctx.fillText('URUTKAN: TERBARU', X0 + 178, Y0 + 47);

    ctx.fillStyle = LIME;
    ctx.fillRect(X0 + Wb - 216, Y0 + 28, 10, 10);
    setFont(ctx, MN(13, 700), 2);
    ctx.fillStyle = INK;
    ctx.fillText('TEMPLAT KOMENTAR', X0 + Wb - 196, Y0 + 38);

    // Avatar
    ctx.save();
    ctx.beginPath(); ctx.arc(X0 + 54, R1 - 12, 24, 0, Math.PI * 2);
    ctx.fillStyle = ivo(0.14); ctx.fill(); ctx.clip();
    ctx.fillStyle = ivo(0.52);
    ctx.beginPath(); ctx.arc(X0 + 54, R1 - 19, 8.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(X0 + 54, R1 + 4, 16, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Teks komentar diketik
    const s1 = typed(KL1, t, tk1, cps1);
    const s2 = typed(KL2, t, tk2, cps2);
    setFont(ctx, UIF(29, 600), 0);
    if (!s1) {
      ctx.fillStyle = ivo(0.42);
      ctx.fillText('Tambahkan komentar…', Xtxt, R1);
    }
    ctx.fillStyle = INK;
    ctx.fillText(s1, Xtxt, R1);
    if (s2) ctx.fillText(s2, Xtxt, R2);

    // Slot isian kosong "____" + tiga titik
    const doneS2 = tk2 + KL2.length / cps2;
    const kbSlot = E.outCubic(inv(doneS2 - 0.1, doneS2 + 0.3, t));
    const blankX = Xtxt + ctx.measureText(KL2).width + 4;
    if (kbSlot > 0) {
      ctx.fillStyle = INK;
      ctx.fillRect(blankX, R2 + 10, 210 * kbSlot, 3.5);
      for (let d = 0; d < 3; d++) {
        const kd = E.outQuint(inv(doneS2 + 0.12 + d * 0.16, doneS2 + 0.34 + d * 0.16, t));
        if (kd > 0) {
          ctx.beginPath();
          ctx.arc(blankX + 38 + d * 64, R2 - 8, 6 * kd, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Garis fokus bawah & kursor ketik lime
    const LW = Wb - 128;
    ctx.fillStyle = ivo(0.22);
    ctx.fillRect(Xtxt, Y0 + 230, LW, 2);
    const kf = E.outCubic(inv(tf, tf + 0.35, t));
    if (kf > 0) {
      ctx.fillStyle = INK;
      ctx.fillRect(Xtxt + LW / 2 * (1 - kf), Y0 + 229, LW * kf, 3);
    }

    const typing = (t > tk1 && s1.length < KL1.length) || (t > tk2 && s2.length < KL2.length);
    if (kf > 0 && (typing || Math.floor(t * 2.4) % 2 === 0)) {
      const cx = kbSlot > 0.2
        ? blankX + 210 * kbSlot + 8
        : Xtxt + 4 + ctx.measureText(s2 || s1).width;
      const cy = s2 ? R2 : R1;
      ctx.fillStyle = LIME;
      ctx.fillRect(cx, cy - 26, 4, 32);
      ctx.fillStyle = INK;
      ctx.fillRect(cx + 4, cy - 26, 1.5, 32);
    }

    // Tombol Batal & Komentari
    const ready = t >= A.penting;
    setFont(ctx, UIF(21, 600), 0);
    ctx.fillStyle = ivo(0.68);
    ctx.fillText('Batal', X0 + Wb - 252, Y0 + 286);

    ctx.fillStyle = ready ? '#15160F' : ivo(0.12);
    ctx.beginPath(); ctx.roundRect(X0 + Wb - 178, Y0 + 254, 146, 46, 23); ctx.fill();
    setFont(ctx, UIF(20, 700), 0);
    ctx.textAlign = 'center';
    ctx.fillStyle = ready ? '#F1EFE6' : ivo(0.4);
    ctx.fillText('Komentari', X0 + Wb - 105, Y0 + 284);
    ctx.textAlign = 'left';

    ctx.restore();
  }

  // ── Stasiun-stasiun 3D ──────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    {
      at: 0, x: 0, z: 0, py: -540, dist: [1520, 1440], yaw: [-2.0, 1.4], tag: 'ADIL', name: 'Timbangan Keadilan',
      draw(ctx, t) {
        slab(ctx, 'OPINI NARATOR', -810, -398, t, A.pendapat + 0.25, { size: 19 });
        txt(ctx, 'Pendapatku pribadi?', -810, -322, t, A.pendapat + 0.3, SRF(54), { col: INK });
        drawBalanceScale(ctx, t);
        if (t >= A.adil) {
          stamp(ctx, 'LEBIH ADIL', 0, -238, t, A.adil, { size: 108, rot: -3 });
        }
        // Perbandingan bawah: BEREBUT WADUK dicoret presisi sesuai lebar terukur
        const sLose = 'BEREBUT WADUK DENGAN WARGA';
        txt(ctx, sLose, 0, 362, t, A.berebut - 0.35, MN(22), { align: 'center', ls: 3, col: ivo(0.74) });
        if (t >= A.berebut) {
          setFont(ctx, MN(22), 3);
          const sw = ctx.measureText(sLose).width;
          strike(ctx, -sw / 2, sw / 2, 360, 22, t, A.berebut, INK);
        }
      },
    },
    {
      at: A.syarat - 0.28, via: 'push', x: 0, z: 2600, py: -540, dist: [1480, 1400], yaw: [1.6, -1.2], tag: 'SYARAT', name: '01 // Transparansi Publik',
      draw(ctx, t) {
        drawConditionCard(ctx, t);
      },
    },
    {
      at: A.nah - 0.25, via: 'whip', x: 0, z: 5200, py: -540, dist: [1500, 1460], yaw: [0, 0], tag: 'GILIRAN', name: 'Komentar & Subscribe',
      draw(ctx, t) {
        // Seluruh konten S2 dibatasi ketat di separuh kiri (local x <= -60 -> screen x <= 900)
        // dan memudar keluar rapi menjelang End Screen (A.oh - 0.55)
        const fade = gone(t, A.oh - 0.55, 0.35);
        if (fade <= 0) return;
        ctx.save();
        ctx.globalAlpha *= fade;
        txt(ctx, 'Nah, sekarang', -820, -372, t, A.nah, SRF(42), { col: ivo(0.84) });
        markLine(ctx, 'GILIRAN ', 'KAMU', ' BERPENDAPAT', -820, -276, t, A.nah + 0.25, A.kamu, DSP(94), { align: 'left', ls: 2 });
        drawCommentBox(ctx, t);
        txt(ctx, 'Tulis syarat paling penting buat kamu.', -820, 212, t, A.syarat2 - 0.2, SRF(32), { col: ivo(0.78) });
        ctx.restore();
      },
    },
  ];

  // Pasang latar full-bleed halus (layarFoto) HANYA di belakang stasiun awal/tengah (habis sebelum 23.3 s),
  // lalu tampilkan tekstur watermark arsitektural tenang di atas #ECE1CC untuk End Screen (24..48.35 s).
  ST.forEach((s, j) => {
    const own = s.world;
    s.world = (ctx, t, pr, foc, items, c) => {
      if (j === c.i) {
        items.push({
          z: 0, x: 0, d: 1e9,
          f: () => {
            if (WM_TEX) {
              const kwm = E.outCubic(inv(22.2, 23.6, t));
              if (kwm > 0) {
                ctx.save();
                ctx.globalAlpha = kwm;
                ctx.drawImage(WM_TEX, 0, 0, W, H);
                ctx.restore();
              }
            }
            layarFoto(ctx, W, H, BG_PLATES, t, { IM, veil: 'rgba(236,225,204,0.86)', grain: 0.09 });
          },
        });
      }
      if (own) own(ctx, t, pr, foc, items, c);
    };
  });

  // ── Layar Akhir (Screen Space, separuh kanan bersih sejak 23.5 s -> 51.15 s) ────────────────────────────────
  function slotYT(o, t, cx, cy, t0, lab) {
    const q = E.outQuint(inv(t0, t0 + 0.75, t));
    if (q <= 0) return;
    const sc = lerp(0.96, 1, q);

    o.save();
    o.translate(cx, cy + (1 - q) * 18);
    o.scale(sc, sc);
    o.globalAlpha = q;

    // Ruang dalam tetap tenang #ECE1CC (hanya tint 2.5%) agar elemen YouTube 100% terbaca
    o.fillStyle = 'rgba(17,18,14,0.025)';
    o.beginPath(); o.roundRect(-320, -180, 640, 360, 18); o.fill();

    // Bingkai putus-putus lembut
    o.setLineDash([12, 10]);
    o.lineDashOffset = -10 * (t - t0);
    o.strokeStyle = 'rgba(17,18,14,0.22)';
    o.lineWidth = 2;
    o.beginPath(); o.roundRect(-320, -180, 640, 360, 18); o.stroke();
    o.setLineDash([]);

    // Siku sudut kecil
    o.strokeStyle = 'rgba(17,18,14,0.42)';
    o.lineWidth = 2.5;
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const px = sx * 320, py = sy * 180;
      o.beginPath();
      o.moveTo(px - sx * 24, py); o.lineTo(px, py); o.lineTo(px, py - sy * 24);
      o.stroke();
    }

    // Label kecil di atas bingkai
    o.fillStyle = LIME;
    o.fillRect(-320, -210, 11, 11);
    o.strokeStyle = INK;
    o.lineWidth = 1.5;
    o.strokeRect(-320, -210, 11, 11);
    setFont(o, MN(15), 4);
    o.fillStyle = 'rgba(17,18,14,0.62)';
    o.textAlign = 'left';
    o.fillText(lab, -296, -199);

    o.restore();
  }

  function drawNextCardLeft(o, t, t0) {
    const k = E.outQuint(inv(t0, t0 + 0.62, t));
    if (k <= 0) return;

    // Bingkai sinema gelap matte (16:9 presisi: 704 x 396) + caption judul bersih di bawah thumbnail — nol neon border
    const X = 110, Y = 300, Wc = 728, Hc = 468, R = 16;
    const pad = 12, iw = 704, ih = 396;
    const ix = X + pad, iy = Y + pad;
    const lift = 3.2 * Math.sin((t - t0) * 1.05);

    o.save();
    o.globalAlpha = k;
    o.translate(0, (1 - k) * 26 + lift);

    // Bayangan lembut editorial di belakang bingkai gelap matte
    o.save();
    o.shadowColor = 'rgba(17,18,14,0.22)';
    o.shadowBlur = 38;
    o.shadowOffsetY = 18;
    o.fillStyle = '#15160F';
    o.beginPath(); o.roundRect(X, Y, Wc, Hc, R); o.fill();
    o.restore();

    // Thumbnail asli Ahpo (Video 4 AGI — 16:9 utuh, tajam, tanpa crop merusak)
    if (IM.nextThumb) {
      cover(o, IM.nextThumb, ix, iy, iw, ih, 9);
      // Hairline pemisah halus antara foto gelap dan bezel matte
      o.strokeStyle = 'rgba(241,239,230,0.12)';
      o.lineWidth = 1;
      o.beginPath(); o.roundRect(ix + 0.5, iy + 0.5, iw - 1, ih - 1, 9); o.stroke();
    }

    // Garis progres tipis matte di antara thumbnail dan footer judul
    const kp = E.inOutCubic(inv(t0 + 0.5, A.tonton + 0.4, t));
    o.fillStyle = 'rgba(241,239,230,0.14)';
    o.fillRect(ix, iy + ih + 8, iw, 2);
    o.fillStyle = LIME;
    o.fillRect(ix, iy + ih + 8, iw * kp, 2);

    // Footer caption judul di dalam pelat sinema gelap matte
    const fy = iy + ih + 38;
    // Ikon segitiga putar matte lime
    o.fillStyle = LIME;
    o.beginPath();
    o.moveTo(ix + 6, fy - 7);
    o.lineTo(ix + 16, fy - 1);
    o.lineTo(ix + 6, fy + 5);
    o.closePath();
    o.fill();

    // Tag kanan pendek: status video sudah tayang -> ajakan klik di kanan
    const readyClick = t >= A.tonton - 0.1;
    const tagTxt = readyClick ? 'KLIK DI KANAN →' : 'SUDAH TAYANG';
    setFont(o, MN(12, 700), 2);
    o.textAlign = 'right';
    const tagW = o.measureText(tagTxt).width;
    o.fillStyle = readyClick ? LIME : 'rgba(241,239,230,0.58)';
    o.fillText(tagTxt, ix + iw - 4, fy + 3);

    // Judul lengkap video AGI (auto-clamp ukuran font agar tidak pernah menabrak tag kanan)
    const capTxt = 'Apa Itu AGI? Mungkinkah AI Setara Manusia?';
    let capFs = 20;
    setFont(o, UIF(capFs, 600), 0);
    const maxCapW = iw - 30 - tagW - 22;
    const capW = o.measureText(capTxt).width;
    if (capW > maxCapW) {
      capFs = Math.floor(capFs * (maxCapW / capW));
      setFont(o, UIF(capFs, 600), 0);
    }
    o.textAlign = 'left';
    o.fillStyle = '#F1EFE6';
    o.fillText(capTxt, ix + 26, fy + 4);

    // Bingkai luar gelap matte tajam (nol glow / neon border)
    o.strokeStyle = 'rgba(17,18,14,0.88)';
    o.lineWidth = 2;
    o.beginPath(); o.roundRect(X, Y, Wc, Hc, R); o.stroke();

    o.restore();
  }

  function drawCurvedArrow(o, t, t0) {
    const k = E.inOutCubic(inv(t0, t0 + 0.72, t));
    if (k <= 0) return;

    // Kurva Bezier kuadratik ramping dari sisi kanan pelat thumbnail (862, 496) ke tepi kiri slot End Screen atas (1092, 326)
    const p0 = [862, 496], p1 = [1002, 476], p2 = [1092, 326];
    const bez = u => [
      (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0],
      (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1],
    ];

    o.save();
    // Titik jangkar tinta matte di pangkal panah
    o.fillStyle = INK;
    o.beginPath(); o.arc(p0[0], p0[1], 4.5, 0, Math.PI * 2); o.fill();

    o.strokeStyle = INK;
    o.lineWidth = 4;
    o.lineCap = 'round';
    o.beginPath();
    o.moveTo(p0[0], p0[1]);
    const steps = 32;
    for (let i = 1; i <= steps; i++) {
      const u = (i / steps) * k;
      const [bx, by] = bez(u);
      o.lineTo(bx, by);
    }
    o.stroke();

    const [ex, ey] = bez(k);
    if (k < 0.96) {
      o.fillStyle = LIME;
      o.strokeStyle = INK;
      o.lineWidth = 2;
      o.beginPath(); o.arc(ex, ey, 7.5, 0, Math.PI * 2); o.fill(); o.stroke();
    } else {
      // Mata panah editorial menghadap tangen kurva di ujung
      const [px, py] = bez(0.92);
      const th = Math.atan2(ey - py, ex - px);
      o.save();
      o.translate(ex, ey);
      o.rotate(th);
      o.fillStyle = INK;
      o.beginPath();
      o.moveTo(14, 0);
      o.lineTo(-10, -10.5);
      o.lineTo(-6, 0);
      o.lineTo(-10, 10.5);
      o.closePath();
      o.fill();
      o.restore();
    }

    // Label editorial kecil di bawah lengkungan panah (rapi & jauh dari garis kurva di x=862..1092)
    const kl = E.outCubic(inv(t0 + 0.45, t0 + 0.80, t));
    if (kl > 0) {
      o.save();
      o.globalAlpha = kl * 0.65;
      setFont(o, MN(13, 700), 2.5);
      o.textAlign = 'center';
      o.fillStyle = INK;
      o.fillText('TONTON DI SINI', 1004, 520);
      o.restore();
    }

    // Riak halus tinta gelap (matte, bukan neon) di sekitar tepi slot saat narator menyebut "di layar ini ya"
    [A.tonton + 0.65, A.layar].forEach(tp => {
      const u = inv(tp, tp + 0.65, t);
      if (u <= 0 || u >= 1) return;
      const e = E.outCubic(u);
      o.save();
      o.globalAlpha = (1 - u) * 0.26;
      o.strokeStyle = INK;
      o.lineWidth = 2.2;
      o.beginPath(); o.roundRect(1120 - 9 * e, 140 - 9 * e, 640 + 18 * e, 360 + 18 * e, 18 + 9 * e); o.stroke();
      o.restore();
    });

    o.restore();
  }

  function drawEndScreen(o, t) {
    const t0 = A.oh - 0.15;
    const k = E.outCubic(inv(t0, t0 + 0.6, t));
    if (k <= 0) return;

    // Bersihkan seluruh latar ke #ECE1CC + tekstur watermark tenang agar separuh kanan 100% bersih untuk End Screen YouTube
    o.save();
    o.globalAlpha = clamp(k * 2.5);
    o.fillStyle = '#ECE1CC';
    o.fillRect(0, 0, W, H);
    if (WM_TEX) o.drawImage(WM_TEX, 0, 0, W, H);
    // Gradien hangat super lembut hanya di kiri agar sisi kanan tetap tenang #ECE1CC
    const g = o.createLinearGradient(0, 0, 1020, 0);
    g.addColorStop(0, 'rgba(246,240,228,0.45)');
    g.addColorStop(1, 'rgba(236,225,204,0)');
    o.fillStyle = g;
    o.fillRect(0, 0, 1020, H);
    const vg = o.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.05);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.22)');
    o.fillStyle = vg;
    o.fillRect(0, 0, W, H);
    o.restore();

    // Dua slot tenang YouTube End Screen di separuh kanan (tetap lapang & tidak terhalang)
    slotYT(o, t, 1440, 320, t0 + 0.22, 'VIDEO BERIKUTNYA');
    slotYT(o, t, 1440, 750, t0 + 0.44, 'PILIHAN UNTUKMU');

    // Kolom kiri (x = 110 .. 838): Eyebrow + Judul Editorial + Pelat Thumbnail Asli AGI Video 4
    const kk = E.outQuint(inv(t0, t0 + 0.4, t));
    o.save();
    o.globalAlpha = kk;
    o.fillStyle = LIME;
    o.fillRect(110, 96, 12, 12);
    o.strokeStyle = INK;
    o.lineWidth = 1.5;
    o.strokeRect(110, 96, 12, 12);
    o.restore();
    txt(o, 'VIDEO SELANJUTNYA · SUDAH TAYANG', 134, 108, t, t0 + 0.05, MN(17), { ls: 3.5, col: INK });

    // Judul editorial 2 baris: AI SEKARANG SUDAH / [SETARA MANUSIA]?
    txt(o, 'AI SEKARANG SUDAH', 110, 188, t, t0 + 0.12, DSP(76), { ls: 2, col: INK });

    // Baris 2 dengan blok aksen matte #C8F53C + tinta gelap #11120E tepat rata kiri di x = 110
    const kh2 = E.outQuint(inv(t0 + 0.22, t0 + 0.68, t));
    if (kh2 > 0) {
      const kb = E.snap(inv(t0 + 0.34, t0 + 0.68, t));
      const y2 = 270;
      const padX = 14;
      o.save();
      o.globalAlpha = kh2;
      o.translate(0, (1 - kh2) * 28);
      setFont(o, DSP(76), 2);
      o.textAlign = 'left';
      const wHi = o.measureText('SETARA MANUSIA').width;
      // Blok matte #C8F53C (nol glow / border)
      o.fillStyle = LIME;
      o.fillRect(110, y2 - 64, (wHi + padX * 2) * kb, 76);
      o.fillStyle = '#11120E';
      o.fillText('SETARA MANUSIA', 110 + padX, y2);
      o.fillStyle = INK;
      o.fillText('?', 110 + wHi + padX * 2 + 5, y2);
      o.restore();
    }

    // Pelat sinema thumbnail asli Ahpo (AI SETARA MANUSIA?) + caption judul
    drawNextCardLeft(o, t, t0 + 0.20);

    // Panah melengkung editorial menuju slot End Screen YouTube saat "Tonton video kita tentang AGI di layar ini ya."
    drawCurvedArrow(o, t, A.tonton - 0.15);
  }

  // Subscribe pill di kiri bawah tetap ajeg dari sesi komentar sampai akhir End Screen
  const SX = 305, SY = 873;
  const over = (o, t) => {
    kreditLatar(o, W, H, BG_PLATES, t, true);
    if (t < A.tulis - 0.35) return;
    o.save();
    o.setTransform(1, 0, 0, 1, 0, 0);
    o.filter = 'none';
    o.globalCompositeOperation = 'source-over';
    o.globalAlpha = 1;
    // Pastikan separuh kanan bersih murni #ECE1CC + watermark (bebas noda bokeh, tanpa garis sambungan di tengah) sejak 23.25 s
    if (t >= 23.1 && t < A.oh + 0.25) {
      const kr = E.outCubic(inv(23.1, 23.45, t));
      o.save();
      o.globalAlpha = kr;
      const gf = o.createLinearGradient(890, 0, 1010, 0);
      gf.addColorStop(0, 'rgba(236,225,204,0)');
      gf.addColorStop(1, 'rgba(236,225,204,1)');
      o.fillStyle = gf;
      o.fillRect(890, 0, 120, H);
      o.fillStyle = '#ECE1CC';
      o.fillRect(1010, 0, 910, H);
      if (WM_TEX) o.drawImage(WM_TEX, 960, 0, 960, H, 960, 0, 960, H);
      const vg = o.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.05);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.22)');
      o.fillStyle = vg;
      o.fillRect(960, 0, 960, H);
      o.restore();
    }
    if (t >= A.oh - 0.15) drawEndScreen(o, t);
    subscribe(o, SX, SY, t, A.tulis - 0.25, {
      klik: A.kalau + 0.45,
      lonceng: A.kalau + 1.45,
      h: 82,
      w: 390,
      inisial: 'R',
    });
    o.restore();
  };

  return makeChapter({ B, ST, load, over, gate: true, label: 'PENUTUP · GILIRANMU' });
}
