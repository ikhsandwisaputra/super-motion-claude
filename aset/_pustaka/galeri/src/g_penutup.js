// Galeri · penutup.js — closing pieces: subscribe, next card, end screen, recap board (Indonesian sample text, dark world).
import { dummyFoto } from './pustaka/dasar.js';
import { subscribe, kartuNext, endScreen, intinya } from './pustaka/penutup.js';

export default {
  modul: 'penutup',
  async load(IM) { IM.f = dummyFoto(1200, 800, 41); },
  demos: [
    { id: 'penutup.subscribe', judul: 'kursor klik SUBSCRIBE (lime + centang), lalu lonceng', hold: 2.75, draw(ctx, t, t0) {
      ctx.save(); ctx.translate(-120, -60); ctx.scale(1.6, 1.6); subscribe(ctx, 0, 0, t, t0, { klik: t0 + 1.1, lonceng: t0 + 2.0 }); ctx.restore();
    } },
    { id: 'penutup.kartuNext', judul: 'kartu video berikutnya terbang masuk, antrean terisi', hold: 2.7, draw(ctx, t, t0, IM) {
      ctx.save(); ctx.scale(1.2, 1.2); kartuNext(ctx, 0, -20, t, t0, { judul: ['KENAPA', 'CHIP', 'MAHAL?'], gambar: IM.f, antri: [t0 + .6, t0 + 2.2], centang: t0 + 2.3 }); ctx.restore();
    } },
    { id: 'penutup.endScreen', judul: 'layar akhir: kalimat penutup, 2 slot YouTube, subscribe', hold: 2.9, draw(ctx, t, t0, IM) {
      endScreen(ctx, 0, 0, t, t0, { judul: ['TETAP ', 'PENASARAN', '.'], sub: 'tanya terus, cek sumbernya.', kartu: { judul: ['KENAPA', 'CHIP', 'MAHAL?'], gambar: IM.f },
        subscribe: { klik: t0 + 1.4, lonceng: t0 + 2.3 } });
    } },
    { id: 'penutup.intinya', judul: 'papan "intinya": jangkar lime, pernyataan, opsi bergantung tali', hold: 2.6, draw(ctx, t, t0) {
      intinya(ctx, 0, 30, t, t0, { kicker: 'JADI, INTINYA', baris: ['TEKNOLOGI', 'BUKAN SIHIR'], ekor: 'ada manusia di baliknya.', jangkar: ['CEK SUMBERNYA', 'selalu.'],
        gantung: [['RISET', 40, -40, 1.7], ['DATA', 360, 40, 1.35], ['BIAYA', 660, -90, 1.9]] });
    } },
  ],
};
