// Galeri · data.js (light world) — the ink diagrams: ladder, wall, book tower, cycle, retry glyph, race. DUMMY labels.
import { MN, SRF, DSP, ivo, txt, fall } from './kit.js';
import { tangga, batas, menara, bukuJatuh, siklus, ulang, balapan } from './pustaka/data.js';

export default {
  modul: 'data',
  light: true,
  demos: [
    { id: 'data.tangga', judul: 'tangga tumbuh, plafon turun, pemanjat mentok (sinar benturan)', hold: 2.3, draw(ctx, t, t0) {
      tangga(ctx, 0, 0, t, t0, { atap: 'BATAS ATAS CONTOH' });
      txt(ctx, 'tetap mentok.', -820, -170, t, t0 + 1.9, SRF(56));
    } },
    { id: 'data.batas', judul: 'jalur 1 menabrak dinding TERBATAS, jalur 2 panah lepas', hold: 2.6, draw(ctx, t, t0) {
      batas(ctx, -60, 0, t, t0, { a: 'JALUR PERTAMA', b: 'JALUR KEDUA', hit: t0 + .8, run: t0 + 1.1 });
    } },
    { id: 'data.menara', judul: 'menara buku menumpuk + layar ikut naik, vs satu buku jatuh', hold: 2.6, draw(ctx, t, t0) {
      menara(ctx, -420, 0, t, t0, { n: 90, dur: 1.8, clipW: 300 });
      ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -440); ctx.lineTo(0, 400); ctx.stroke();
      bukuJatuh(ctx, 440, 400, t, t0 + 1.6);
      fall(ctx, '90', 120, -150, t, t0 + .3, DSP(200), { ls: 2 });
      txt(ctx, 'buku contoh', 126, -60, t, t0 + .6, SRF(48), { col: ivo(.7) });
    } },
    { id: 'data.siklus', judul: 'siklus 3 langkah: ✗ jatuh · ↻ coba lagi · ✓ berhasil', hold: 2.2, draw(ctx, t, t0) {
      siklus(ctx, -200, 40, [['JATUH', t0], ['COBA LAGI', t0 + .5], ['BERHASIL', t0 + 1]], t, t0);
    } },
    { id: 'data.ulang', judul: 'glyph ulang: busur + kepala panah berputar sekali', hold: 1.6, draw(ctx, t, t0) {
      const w = txt(ctx, 'lewat coba-coba', 0, 70, t, t0, SRF(66), { align: 'center' });
      if (w) ulang(ctx, w / 2 + 60, 48, t, t0 + .3);
      ulang(ctx, 0, -170, t, t0 + .5, { r: 90, lw: 16 });
    } },
    { id: 'data.balapan', judul: 'balapan dua batang: murid tertahan lalu menyalip (lime)', hold: 2.4, draw(ctx, t, t0) {
      balapan(ctx, 0, 0, t, t0, { a: 'PATOKAN', b: 'PENANTANG', win: t0 + 1.6 });
      txt(ctx, 'MENYALIP', -820, -240, t, t0 + 1.7, MN(26), { ls: 6, col: ivo(.7) });
    } },
  ],
};
