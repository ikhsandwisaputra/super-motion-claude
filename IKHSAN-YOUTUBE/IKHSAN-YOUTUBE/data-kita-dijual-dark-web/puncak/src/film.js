// Puncak · Dilema NIK Seumur Hidup, Paradoks Denda Pajak Rakyat & 3 Langkah Pertahanan Rumah (V2 Zero-Slop: Nol Dead Visual, Nol AI-Slop Cards, Live Toggle Saklar D06!)
import B from './beats.js';
import {
  clamp, inv, lerp, E, IVORY, LIME, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, fall, slab, txt,
} from './kit.js';
import { drawAhpoLayered, ahpoPt, collisionWords, C_RED } from './fisika.js';
import { loadD, D01_FILES, D06_FILES, drawD01Card, wrapTxt, editorialRow } from './vault.js';
import { saklar } from './pustaka/ui.js';

export function makeFilm() {
  const { T: A } = timing(B);
  let D01 = {}, D06 = {};

  async function load() {
    await Promise.all([
      loadD('D01', D01_FILES, 1600).then(x => D01 = x),
      loadD('D06', D06_FILES, 1600).then(x => D06 = x),
    ]);
  }

  const ST = [
    // S0 (0..A.dilema2): Frame 1 langsung hidup — D01 KTP + Benturan Sandi 5 Menit vs NIK Seumur Hidup!
    {
      at: 0, name: 'NIK Seumur Hidup', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1400],
      draw(ctx, t, c) {
        txt(ctx, 'PUNCAK · DILEMA PERTAMA', 0, -355, t, 0, MN(20), { align: 'center', ls: 6, col: LIME });
        collisionWords(ctx, 'SANDI 5 MENIT', 'NIK SEUMUR HIDUP', 0, -125, t, 0.25, A.tapi, {
          size: 120, colL: IVORY, colR: C_RED,
        });
        wrapTxt(ctx, 'Nomor KTP & nama ibu kandung tidak pernah bisa di-reset seumur hidup.', 0, 12, 1180, 50, SRF(44), t, A.sandi - 0.5, {
          align: 'center', col: ivo(0.9),
        });
        drawD01Card(ctx, D01, 0, 235, 0.29, t, { camX: c.yaw * 8, tTag: 0.3, price: 'SEUMUR HIDUP' });
      },
    },
    // S1 (A.dilema2..A.langkah): Frame 1 langsung tampil Paradoks Putaran Pajak (NOL dead screen 14..18s, NOL dark boxes!)
    {
      at: A.dilema2, via: 'whip', side: -1, name: 'Paradoks Pajak', tag: 'PAJAK',
      x: -1350, z: 2500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1390],
      draw(ctx, t) {
        txt(ctx, 'DILEMA KEDUA · JIKA YANG LALAI INSTANSI NEGARA', 0, -355, t, A.dilema2, MN(20), { align: 'center', ls: 5, col: C_RED });
        fall(ctx, 'DENDA DARI PAJAK KITA SENDIRI', 0, -210, t, A.dilema2 + 0.1, DSP(112), { align: 'center', ls: 2 });

        // Orbit aliran uang pajak berputar mulus sejak Frame 1 (NOL kotak box — tipografi mengambang + partikel uang!)
        const kLoop = E.outQuint(inv(A.dilema2 + 0.15, A.dilema2 + 0.9, t));
        ctx.save(); ctx.globalAlpha = kLoop;
        ctx.strokeStyle = 'rgba(241,239,230,0.24)'; ctx.lineWidth = 3;
        ctx.setLineDash([12, 10]);
        ctx.beginPath(); ctx.ellipse(0, 72, 540, 135, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);

        // 6 partikel aliran pajak terus mengalir di sepanjang elips!
        for (let i = 0; i < 6; i++) {
          const ang = (t - A.dilema2) * 1.35 + (i / 6) * Math.PI * 2;
          const px = Math.cos(ang) * 540, py = 72 + Math.sin(ang) * 135;
          ctx.fillStyle = i % 2 === 0 ? LIME : C_RED;
          ctx.beginPath(); ctx.arc(px, py, i % 2 === 0 ? 10 : 7, 0, Math.PI * 2); ctx.fill();
        }

        // 3 simpul tipografi bersih di ruang terbuka (NOL AI-slop cards!)
        const nodes = [
          ['01', 'PAJAK WARGA', 'masuk kas negara', -560, 72, LIME, 'center'],
          ['02', 'ANGGARAN KEMENTERIAN', 'membiayai instansi', 0, -82, IVORY, 'center'],
          ['03', 'DENDA BALIK KE KAS', 'uang berputar di tempat', 560, 72, C_RED, 'center'],
        ];
        nodes.forEach(([idx, lb, sub, nx, ny, col]) => {
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(nx, ny - 54, 9, 0, Math.PI * 2); ctx.fill();
          setFont(ctx, MN(16, 700), 3); ctx.fillStyle = col; ctx.textAlign = 'center';
          ctx.fillText(idx, nx, ny - 74);
          setFont(ctx, DSP(48), 2); ctx.fillStyle = IVORY;
          ctx.fillText(lb, nx, ny - 8);
          setFont(ctx, SRF(26), 0); ctx.fillStyle = ivo(0.76);
          ctx.fillText(sub, nx, ny + 26);
        });
        ctx.restore();

        slab(ctx, 'PERLU SANKSI JABATAN — BUKAN SEKADAR PUTAR ANGGARAN PAJAK', 0, 315, t, A.pajak - 0.6, {
          align: 'center', lime: true, size: 21,
        });
      },
    },
    // S2 (A.langkah..DUR): 3 Langkah Aman — Ahpo D06 Ponsel + Toggle Saklar Hidup (ui.saklar) + Editorial Callouts (NOL BOX SLOP!)
    {
      at: A.langkah, via: 'rise', side: 1, name: '3 Langkah Aman', tag: 'AMAN',
      x: 100, z: 5000, py: -560, yaw: [4, -3], pitch: [5, 6], dist: [1520, 1380],
      draw(ctx, t, c) {
        txt(ctx, '3 LANGKAH PRAKTIS MELINDUNGI KELUARGA DI RUMAH', 0, -365, t, A.langkah, MN(20), { align: 'center', ls: 5, col: LIME });

        drawAhpoLayered(ctx, [
          { im: D06.bayangan, par: 0.85, a: 0.9 },
          { im: D06.ponsel, par: 0.96, a: 1 },
        ], -290, 40, 0.44, c.yaw * 10, 0, E.outQuint(inv(A.langkah, A.langkah + 0.45, t)));
        // Lencana perisai 2FA di pojok atas kanan ponsel (tidak menutupi teks kolom kanan!)
        drawAhpoLayered(ctx, [
          { im: D06.perisai, par: 1.04, a: 1 },
        ], -380, -210, 0.20, c.yaw * 10, 0, E.outQuint(inv(A.s2 - 0.3, A.s2 + 0.25, t)));

        // Di dalam layar ponsel D06: 3 baris toggle saklar asli menyala LIME saat ketukan VO!
        const [sx, sy] = ahpoPt(1310, 680, -290, 40, 0.44);
        const toggles = [
          ['EMAIL TERPISAH', A.s1],
          ['KUNCI GANDA 2FA', A.s2],
          ['BLOKIR FILE ASING', A.s3],
        ];
        toggles.forEach(([lb, ts], i) => {
          const ry = sy + i * 145;
          setFont(ctx, MN(15, 700), 2); ctx.fillStyle = ivo(0.85); ctx.textAlign = 'left';
          ctx.fillText(lb, sx - 130, ry - 26);
          ctx.fillStyle = 'rgba(241,239,230,0.12)'; ctx.fillRect(sx - 130, ry + 48, 260, 1.5);
          saklar(ctx, sx + 55, ry + 10, t, A.langkah + 0.25 + i * 0.15, {
            w: 120, h: 52, fs: 15, ubah: ts, label: ['MATI', 'AKTIF'],
          });
        });

        // Kanan ponsel: 3 langkah arsitektural editorial bersih (100% bebas halangan!)
        editorialRow(ctx, '01', 'PISAHKAN EMAIL', 'jangan campur akun layanan publik & rekening bank', -60, -175, 840, t, A.langkah + 0.2, {
          accent: LIME, size: 66, subSize: 30,
        });
        editorialRow(ctx, '02', 'SANDI UNIK + 2FA', 'nyalakan verifikasi dua langkah di akun penting', -60, 20, 840, t, A.s2 - 0.3, {
          accent: LIME, size: 66, subSize: 30,
        });
        editorialRow(ctx, '03', 'WASPADAI UNDUHAN', 'jangan asal klik file mentah & tautan tak dikenal', -60, 215, 840, t, A.s3 - 0.3, {
          accent: LIME, size: 66, subSize: 30,
        });
      },
    },
  ];

  return makeChapter({ B, ST, load, label: 'PUNCAK', gate: 0.75 });
}
