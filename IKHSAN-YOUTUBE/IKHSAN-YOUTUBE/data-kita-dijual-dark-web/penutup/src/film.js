// Penutup · Intinya (V2 Zero-Slop: Tipografi Mengambang di Atas D01/D04/D05 Tanpa Card, Opini + Garis Tangan, Kotak Komentar YouTube Asli, Layar Akhir >= 20 s!)
import B from './beats.js';
import {
  W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN,
  timing, makeChapter, loadImg, markLine, slab, txt,
} from './kit.js';
import { C_RED } from './fisika.js';
import { loadD, D01_FILES, D04_FILES, D05_FILES, drawD01Card, drawD04Vault, drawD05Chair, wrapTxt } from './vault.js';
import { kotakKomentar } from './pustaka/ui.js';
import { garisTangan } from './pustaka/tipo.js';

const SANS = (s, w = 600) => `${w} ${s}px sans-serif`;
const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };

export function makeFilm() {
  const { T: A } = timing(B);
  const E0 = A.tonton - 0.1; // End screen >= 20 s (30.22 s .. 53.90 s = 23.68 s!)
  const IM = {};
  let D01 = {}, D04 = {}, D05 = {};

  async function load() {
    const sh = '../assets/shared/';
    await Promise.all([
      loadImg(sh + 'own/next-ai-data-habis.jpg', 1280).then(x => IM.next = x),
      loadD('D01', D01_FILES, 1200).then(x => D01 = x),
      loadD('D04', D04_FILES, 1200).then(x => D04 = x),
      loadD('D05', D05_FILES, 1200).then(x => D05 = x),
    ]);
  }

  function drawCursor(o, x, y, cs, a) {
    o.save(); o.globalAlpha = a; o.translate(x, y); o.scale(cs, cs);
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 12; o.shadowOffsetY = 5;
    o.beginPath(); o.moveTo(0, 0); o.lineTo(0, 34); o.lineTo(8, 26); o.lineTo(14, 39);
    o.lineTo(20, 36); o.lineTo(14, 23); o.lineTo(25, 23); o.closePath();
    o.fillStyle = '#fff'; o.fill(); o.shadowColor = 'transparent';
    o.strokeStyle = '#11120E'; o.lineWidth = 2; o.lineJoin = 'round'; o.stroke();
    o.restore();
  }

  const ST = [
    // S0 (0..A.menurut): 3 Fakta Utama — Tipografi Editorial Terbuka + Hairline + 3 Prop Semi-3D Ahpo (NOL AI-SLOP CARDS!)
    {
      at: 0, name: 'Intinya 3 Fakta', x: 0, z: 0, py: -560, yaw: [4, -3], pitch: [6, 5], dist: [1540, 1410],
      draw(ctx, t, c) {
        txt(ctx, 'INTINYA · RINGKASAN INVESTIGASI', 0, -355, t, 0, MN(20), { align: 'center', ls: 6, col: LIME });
        const cols = [
          ['01', 'Rp0,49', 'HARGA KTP DI DARK WEB', 0.15, LIME],
          ['02', '2%', 'CADANGAN PDNS 2 SURABAYA', A.backup2 - 0.4, C_RED],
          ['03', 'KOSONG', 'KURSI POLISI DATA (2026)', A.t2026 - 2.6, IVORY],
        ];
        cols.forEach(([idx, big, sub, ts, col], i) => {
          const k = E.outQuint(inv(ts, ts + 0.48, t));
          if (k <= 0.01) return;
          const bx = -560 + i * 560, by = -110 + (1 - k) * 32;
          ctx.save(); ctx.globalAlpha = k;
          setFont(ctx, MN(17, 700), 4); ctx.fillStyle = col; ctx.textAlign = 'center';
          ctx.fillText(`FAKTA ${idx}`, bx, by - 118);
          setFont(ctx, DSP(136), 2); ctx.fillStyle = col;
          ctx.fillText(big, bx, by + 6);
          ctx.fillStyle = col; ctx.fillRect(bx - 190 * k, by + 30, 380 * k, 4);
          setFont(ctx, MN(17, 700), 2); ctx.fillStyle = ivo(0.86);
          ctx.fillText(sub, bx, by + 66);
          ctx.restore();
        });
        drawD01Card(ctx, D01, -560, 200, 0.22, t, { camX: c.yaw * 6, tTag: 0.25, price: 'Rp0,49' });
        drawD04Vault(ctx, D04, 0, 200, 0.22, t, { camX: c.yaw * 6, tFill: A.backup2 - 0.3, tLock: A.backup2 - 0.3 });
        drawD05Chair(ctx, D05, 560, 200, 0.22, t, { camX: c.yaw * 6, hideBook: true });
      },
    },
    // S1 (A.menurut..A.giliran): Opini Lugas Narator + Garis Tangan + Kursi D05 di Kedalaman!
    {
      at: A.menurut, via: 'whip', side: -1, name: 'Opini Kami', tag: 'OPINI',
      x: -1350, z: 2500, py: -560, yaw: [-5, 3], pitch: [6, 5], dist: [1520, 1400],
      draw(ctx, t, c) {
        drawD05Chair(ctx, D05, 0, 60, 0.42, t, { camX: c.yaw * 8, hideBook: true, a: 0.22 });
        txt(ctx, 'OPINI PRIBADI · SIKAP REDAKSI', 0, -345, t, A.menurut, MN(20), { align: 'center', ls: 6, col: LIME });
        markLine(ctx, 'BENTUK ', 'LEMBAGA PDP', ' MANDIRI', 0, -145, t, A.menurut + 0.12, A.pdp - 0.1, DSP(122), { align: 'center', ls: 2 });
        garisTangan(ctx, -380, 380, -108, t, A.pdp + 0.1, { col: LIME, sag: 32, lw: 7 });
        wrapTxt(ctx, 'Pejabat yang lalai wajib kena sanksi jabatan — bukan sekadar memutar denda uang pajak warga.', 0, 25, 1180, 56, SRF(48), t, A.pejabat - 0.4, {
          align: 'center', col: IVORY,
        });
        slab(ctx, 'BUKAN CUMA MEMUTAR DENDA PAJAK WARGA', 0, 205, t, A.pajak - 0.8, { align: 'center', lime: true, size: 23 });
      },
    },
    // S2 (A.giliran..E0): Giliran Kamu — Kotak Komentar YouTube Asli (ui.kotakKomentar!)
    {
      at: A.giliran, via: 'rise', side: 1, name: 'Tulis di Komentar', tag: 'KOMENTAR',
      x: 1350, z: 5000, py: -560, yaw: [5, -3], pitch: [5, 6], dist: [1520, 1400],
      draw(ctx, t) {
        txt(ctx, 'GILIRAN KAMU DI KOLOM KOMENTAR', 0, -340, t, A.giliran, MN(20), { align: 'center', ls: 6, col: LIME });
        kotakKomentar(ctx, 0, 40, t, A.giliran + 0.08, {
          judul: 'Komentar',
          urut: 'TULIS PENDAPATMU DI BAWAH ↓',
          fokus: A.giliran + 0.55,
          baris: [
            'Langkah pertama yang wajib dibenahi pemerintah:',
            'bentuk Lembaga PDP mandiri & audit backup semua instansi.',
          ],
          cps: [28, 30],
          tombol: 'Komentari',
        });
      },
    },
    // S3 (E0..DUR): End Screen YouTube (>= 20 s, sisi kanan bersih untuk slot end screen + video terbit!)
    {
      at: E0, via: 'truck', side: 0, name: 'Layar Akhir & Subscribe', tag: 'END',
      x: 0, z: 7500, py: -560, yaw: [0, 0], pitch: [0, 0], dist: [1500, 1500],
      draw() {},
    },
  ];

  // Screen-space End Screen overlay (E0..DUR = 23.68 s >= 20 s)
  const over = (o, t) => {
    if (t < E0) return;
    const k = E.outQuint(inv(E0, E0 + 0.55, t));
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0);
    o.globalAlpha = k;
    o.fillStyle = '#0B0C09'; o.fillRect(0, 0, W, H);

    const lx = 140;
    setFont(o, MN(20, 700), 5); o.fillStyle = LIME; o.textAlign = 'left';
    o.fillText('RELENTLESS NON-CONFORMIST', lx, 220);
    setFont(o, DSP(98), 2); o.fillStyle = IVORY;
    o.fillText('DIJAGA ATAU', lx, 345);
    o.fillStyle = LIME;
    o.fillText('DIOBRAL?', lx, 448);
    setFont(o, SRF(34), 0); o.fillStyle = ivo(0.84);
    o.fillText('Terima kasih sudah menyimak sampai akhir.', lx, 526);

    const tClick = E0 + 1.25, tBell = E0 + 2.45;
    const subbed = t >= tClick;
    const px = lx, py = 610, pw = 330, ph = 84;
    const press = Math.abs(t - tClick) < 0.08 ? 0.94 : 1;
    o.save();
    o.translate(px + pw / 2, py + ph / 2); o.scale(press, press);
    o.fillStyle = subbed ? LIME : IVORY;
    rr(o, -pw / 2, -ph / 2, pw, ph, 42); o.fill();
    setFont(o, SANS(28, 700), 2); o.fillStyle = LIME_INK; o.textAlign = 'center'; o.textBaseline = 'middle';
    o.fillText(subbed ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 2);
    o.restore();

    if (t >= tClick && t < tClick + 0.55) {
      const kr = inv(tClick, tClick + 0.55, t);
      o.strokeStyle = LIME; o.lineWidth = 3; o.globalAlpha = (1 - kr) * 0.7;
      rr(o, px - kr * 45, py - kr * 24, pw + kr * 90, ph + kr * 48, 48); o.stroke();
      o.globalAlpha = k;
    }

    const bx = px + pw + 74, by = py + ph / 2;
    const ageB = Math.max(0, t - tBell);
    const bRot = t >= tBell ? 0.35 * Math.exp(-ageB * 2.4) * Math.sin(ageB * 18) : 0;
    o.save(); o.translate(bx, by); o.rotate(bRot);
    o.fillStyle = t >= tBell ? LIME : '#232620';
    o.beginPath(); o.arc(0, 0, 38, 0, Math.PI * 2); o.fill();
    o.fillStyle = t >= tBell ? LIME_INK : IVORY;
    o.beginPath(); o.arc(0, -4, 14, Math.PI, 0); o.lineTo(18, 12); o.lineTo(-18, 12); o.closePath(); o.fill();
    o.beginPath(); o.arc(0, 16, 5, 0, Math.PI * 2); o.fill();
    o.restore();

    const kC1 = E.inOutCubic(inv(E0 + 0.4, tClick - 0.1, t));
    const kC2 = E.inOutCubic(inv(tClick + 0.3, tBell - 0.1, t));
    const curX = lerp(lerp(lx + 420, px + pw * 0.55, kC1), bx + 6, kC2);
    const curY = lerp(lerp(py + 220, py + ph * 0.6, kC1), by + 6, kC2);
    if (t < tBell + 1.8) drawCursor(o, curX, curY, 1.05, 1 - inv(tBell + 1.2, tBell + 1.8, t));

    const rx = 1040, ry = 175, rw = 740, rh = 416;
    setFont(o, MN(18, 700), 4); o.fillStyle = LIME; o.textAlign = 'left';
    o.fillText('TONTON SELANJUTNYA · SUDAH TAYANG', rx, ry - 26);
    if (IM.next) {
      o.save(); rr(o, rx, ry, rw, rh, 14); o.clip();
      o.drawImage(IM.next, rx, ry, rw, rh);
      o.restore();
    }
    o.strokeStyle = 'rgba(241,239,230,0.22)'; o.lineWidth = 2; rr(o, rx, ry, rw, rh, 14); o.stroke();
    setFont(o, DSP(44), 1); o.fillStyle = IVORY;
    o.fillText('AI SUDAH MULAI LAPAR DATA MANUSIA?', rx, ry + rh + 54);
    setFont(o, MN(16, 400), 2); o.fillStyle = ivo(0.62);
    o.fillText('Sumber: Kompas · BBC · CNBC · Katadata · Surfshark · Kaspersky · BSSN · Komdigi · JDIH · ELSAM', lx, H - 56);
    o.restore();
  };

  return makeChapter({ B, ST, load, label: 'PENUTUP', gate: 0.75, over });
}
