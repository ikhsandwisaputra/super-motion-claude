// Galeri · tipo.js — type that moves (Indonesian sample text, dark world).
import { inv, E, INK, LIME, ivo, setFont, DSP, SRF, MN, txt, fall, typeOn } from './kit.js';
import { drawOn, angkaHuruf, rapat, hurufCampur, garisTangan, ketikSiklus, slotKata, gantiKata, lensa, kutipan, terbang, ejaan, ucap } from './pustaka/tipo.js';

const KLAIM = ['“AI sudah membaca', 'seluruh internet.”'];
function klaim(ctx, a = 1) {                                   // static content for the lens demo (drawn twice: dim + magnified)
  setFont(ctx, SRF(118)); ctx.textAlign = 'left'; ctx.fillStyle = ivo(a); KLAIM.forEach((l, i) => ctx.fillText(l, -600, -40 + 150 * i));
}

export default {
  modul: 'tipo',
  demos: [
    { id: 'tipo.drawOn', judul: 'garis huruf tergambar dulu, lalu tinta naik bergelombang', draw(ctx, t, t0) {
      drawOn(ctx, 'TULISAN', 0, -40, t, t0, DSP(300), { ls: 6 });
      drawOn(ctx, 'MANUSIA', 0, 260, t, t0 + .35, DSP(300), { ls: 6, col: LIME });
    } },
    { id: 'tipo.angkaHuruf', judul: 'angka dipotong dari tekstur Sumur Huruf, lalu pecah (o.pecah)', hold: 2.4, draw(ctx, t, t0) {
      angkaHuruf(ctx, '2026', 0, -30, 560, t, t0, { pecah: t0 + 2.35 });
      txt(ctx, 'TAHUN INI, DIBACA DARI KATA-KATA KITA', 0, 360, t, t0 + .35, MN(26), { align: 'center', ls: 6, col: ivo(.7) });
    } },
    { id: 'tipo.rapat', judul: 'spasi huruf merapat saat kata mendarat', draw(ctx, t, t0) {
      txt(ctx, 'DARI JAUH', 0, -230, t, t0, MN(28), { align: 'center', ls: 8, col: ivo(.65) });
      rapat(ctx, 'BERSAMA', 0, 110, t, t0 + .15, DSP(330), { dari: 120, ke: 20 });
      rapat(ctx, 'jadi satu kalimat.', 0, 300, t, t0 + .55, SRF(84), { dari: 60, ke: 0, col: ivo(.9) });
    } },
    { id: 'tipo.hurufCampur', judul: 'satu kata, tiap huruf punya font + goyangnya sendiri', draw(ctx, t, t0) {
      hurufCampur(ctx, 'SUARA', 0, 90, 320, t, t0);
      txt(ctx, 'setiap orang menulis dengan suaranya sendiri.', 0, 300, t, t0 + .5, SRF(56), { align: 'center', col: ivo(.85) });
    } },
    { id: 'tipo.garisTangan', judul: 'coretan tangan melengkung di bawah kata', draw(ctx, t, t0) {
      txt(ctx, 'yang dicari bukan yang', -520, -120, t, t0, SRF(80), { col: ivo(.85) });
      setFont(ctx, DSP(300), 4); const w = ctx.measureText('BENAR').width;
      fall(ctx, 'BENAR', -520, 200, t, t0 + .25, DSP(300), { ls: 4 });
      garisTangan(ctx, -520 + w * .08, -520 + w * .97, 250, t, t0 + 1.0, { col: LIME, sag: 60, lw: 12, dur: .5 });
      txt(ctx, 'tapi yang jujur.', 120, 200, t, t0 + 1.3, SRF(80), { col: ivo(.9) });
    } },
    { id: 'tipo.ketikSiklus', judul: 'jawaban hantu diketik-hapus bergiliran + caret lime (ajakan komentar)', hold: 2.75, draw(ctx, t, t0) {
      txt(ctx, 'Tulis di komentar:', -800, -300, t, t0, SRF(66), { col: ivo(.9) });
      fall(ctx, 'YANG HARUS DIKEJAR DULUAN:', -805, -110, t, t0 + .15, DSP(150), { ls: 3, stag: .022 });
      ketikSiklus(ctx, ['riset swasta', 'lebih banyak peneliti', 'internet rumah', 'matematika dasar'], -792, 78, t, t0 + .5, SRF(92), { garis: 1400 });
      txt(ctx, '+ ALASANMU, SATU KALIMAT.', -800, 214, t, t0 + .9, MN(30), { ls: 4, col: ivo(.75) });
    } },
    { id: 'tipo.slotKata', judul: 'slot kata lime: kata bergulir lalu berhenti di jawaban (o.henti)', hold: 2.6, draw(ctx, t, t0) {
      fall(ctx, 'AKU PAKAI AI BUAT', -760, -120, t, t0, DSP(170), { ls: 3 });
      slotKata(ctx, ['tugas', 'kerja', 'ngoding', 'menulis', 'riset'], -760, 120, t, t0 + .35, SRF(110), { w: 620, henti: t0 + 1.9, akhir: 'belajar.' });
      txt(ctx, 'JAWABANMU YANG MANA?', -760, 330, t, t0 + .8, MN(28), { ls: 6, col: ivo(.65) });
    } },
    { id: 'tipo.gantiKata', judul: 'label bergulir dari a ke b (status, waktu, judul)', hold: 2.4, draw(ctx, t, t0) {
      txt(ctx, 'STATUS', -700, -190, t, t0, MN(30), { ls: 8, col: ivo(.65) });
      if (t > t0) gantiKata(ctx, 'MENUNGGU', 'DISETUJUI', -705, 60, t, t0 + 1.0, DSP(250), { ls: 4 });
      if (t > t0 + .2) gantiKata(ctx, 'dua jam lalu', 'baru saja', -700, 210, t, t0 + 1.35, SRF(80), { col: ivo(.85) });
    } },
    { id: 'tipo.lensa', judul: 'kaca pembesar menyapu klaim (audit), lalu temuan diketik', hold: 2.1, draw(ctx, t, t0) {
      typeOn(ctx, 'KLAIM YANG SERING DIDENGAR', -596, -250, t, t0, MN(26), { cps: 50, col: ivo(.7), ls: 6 });
      const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * E.outCubic(inv(t0, t0 + .4, t)); klaim(ctx, .38); ctx.globalAlpha = a0;
      lensa(ctx, -180, 30, t, t0 + .4, c => klaim(c, 1), { dur: 1.9, lebar: 820, R: 160 });
      typeOn(ctx, 'SUMBER ANGKA: TIDAK DITEMUKAN', -596, 300, t, t0 + 1.55, MN(30), { cps: 32, ls: 5, col: INK });
    } },
    { id: 'tipo.kutipan', judul: 'kutipan serif kata per kata, lalu meredup + dicoret miring', draw(ctx, t, t0) {
      txt(ctx, 'KALIMAT YANG SERING KAMU DENGAR', -596, -300, t, t0, MN(26), { ls: 6, col: ivo(.7) });
      kutipan(ctx, ['“Datanya sudah', 'habis dibaca.”'], 0, 20, t, t0 + .2, { size: 150, redup: t0 + 1.55, coret: t0 + 1.7 });
    } },
    { id: 'tipo.terbang', judul: 'kata terbang dari samping, besar + blur → tajam', draw(ctx, t, t0) {
      terbang(ctx, 'CEPAT,', -640, -150, t, t0, DSP(250), { ls: 3 });
      terbang(ctx, 'TAPI', 0, 90, t, t0 + .45, DSP(250), { ls: 3, align: 'center', sisi: -1 });
      terbang(ctx, 'RAPUH.', 640, 330, t, t0 + .9, DSP(250), { ls: 3, align: 'right', col: LIME });
    } },
    { id: 'tipo.ejaan', judul: 'kerangka kata dulu, huruf dipukul masuk satu-satu (2.2× → 1)', draw(ctx, t, t0) {
      ejaan(ctx, 'KEHABISAN', 0, 90, t, t0, DSP(300), { ls: 4, align: 'center', step: .1, tunda: .45 });
      txt(ctx, 'dieja seperti narator mengucapkannya.', 0, 260, t, t0 + 1.3, SRF(60), { align: 'center', col: ivo(.85) });
    } },
    { id: 'tipo.ucap', judul: 'kalimat terbuka kata per kata mengikuti narator (+ bayangan samar)', hold: 2.6, draw(ctx, t, t0) {
      const A = ['Kalau', 'tulisan', 'manusia', 'habis,'], B = ['AI', 'belajar', 'dari', 'mana?'];
      ucap(ctx, A, -760, -40, t, t0, DSP(170), { ls: 2, hantu: .14, step: .26 });
      ucap(ctx, B, -760, 170, t, t0 + 1.15, DSP(170), { ls: 2, hantu: .14, step: .26, col: LIME });
    } },
  ],
};
