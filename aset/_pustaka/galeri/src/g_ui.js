// Galeri · ui.js — interface sims and the cursor as an actor (Indonesian sample text, dark world).
import { ivo, LIME, LIME_INK, MN, SRF, DSP, txt } from './kit.js';
import { UIF, kursor, kursorJalan, browser, tombol, saklar, dialog, gelembungChat, komentar, kotakKomentar, notif, miniKomentar } from './pustaka/ui.js';

const ROBOT = [['User-agent: GPTBot', true], ['Disallow: /', false], ['User-agent: CCBot', true], ['Disallow: /', false], ['# jangan ambil tulisan kami', false]];

export default {
  modul: 'ui',
  demos: [
    { id: 'ui.kursor', judul: 'panah kursor: skala, ditekan (o.tekan), warna sendiri', draw(ctx, t, t0) {
      [[-520, .9], [-160, 1.5], [260, 2.4]].forEach(([x, s], i) => kursor(ctx, x, -60, { s, a: Math.min(1, Math.max(0, (t - t0 - .15 * i) / .25)), tekan: i === 1 ? Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (t - t0 - 1.2) / .2)))) : 0 }));
      kursor(ctx, 620, -60, { s: 2.4, isi: LIME, garis: LIME_INK, a: Math.min(1, Math.max(0, (t - t0 - .45) / .25)) });
      txt(ctx, 's .9 · 1.5 (klik) · 2.4 · isi lime', 0, 300, t, t0 + .3, MN(26), { align: 'center', ls: 4, col: ivo(.6) });
    } },
    { id: 'ui.kursorJalan', judul: 'kursor meluncur antar target, klik = turun + riak lime', hold: 2.5, draw(ctx, t, t0) {
      tombol(ctx, -380, 40, 'SETUJU', t, t0, { tekan: t0 + .9, lime: t0 + .92 });
      tombol(ctx, 380, 40, 'SIMPAN', t, t0 + .1, { tekan: t0 + 1.8, lime: t0 + 1.82 });
      kursorJalan(ctx, [[t0 + .2, 640, 380], [t0 + .9, -360, 60, true], [t0 + 1.8, 400, 60, true], [t0 + 2.6, 560, 320]], t, { s: 1.6 });
    } },
    { id: 'ui.browser', judul: 'jendela browser: URL terketik, baris kode, lalu berbalik (o.balik)', hold: 3.1, draw(ctx, t, t0) {
      browser(ctx, 0, -20, 1400, 800, t, t0, { url: 'situsmu.id/robots.txt', baris: ROBOT, cps: 40, jeda: .12, balik: t0 + 2.2,
        belakang: (g, w, h, tt) => { g.fillStyle = LIME; g.fillRect(-w / 2, -h / 2, w, h); g.save(); g.font = DSP(220); g.textAlign = 'center'; g.fillStyle = LIME_INK; g.fillText('DITOLAK', 0, 70); g.restore(); } });
    } },
    { id: 'ui.tombol', judul: 'tombol pil: pegas masuk, ditekan, jadi lime', hold: 2.3, draw(ctx, t, t0) {
      tombol(ctx, 0, -40, '+ BIKIN SITUS', t, t0, { w: 620, h: 130, font: MN(40), tekan: t0 + 1.4, lime: t0 + 1.42 });
      kursorJalan(ctx, [[t0 + .5, 520, 300], [t0 + 1.4, 60, -10, true], [t0 + 2.4, 300, 200]], t, { s: 1.8 });
    } },
    { id: 'ui.saklar', judul: 'saklar: kenop melompat, track jadi lime, riak sekali', hold: 2.4, draw(ctx, t, t0) {
      [['Izinkan robot AI', false, t0 + 1.0], ['Tampilkan di pencarian', true, undefined], ['Kirim ringkasan mingguan', false, t0 + 1.6]].forEach(([l, awal, ubah], i) => {
        const y = -220 + 200 * i; txt(ctx, l, -640, y + 18, t, t0 + .1 * i, SRF(58), { col: ivo(.92) });
        saklar(ctx, 520, y, t, t0 + .1 * i, { awal, ubah, w: 190, h: 92, riak: ubah ?? false }); });
    } },
    { id: 'ui.dialog', judul: 'dialog setelan: judul mono, tanya serif + saklar, putusan lime', hold: 2.6, draw(ctx, t, t0) {
      ctx.save(); ctx.scale(1.3, 1.3); dialog(ctx, 0, -20, 880, 600, t, t0, { saklar: { awal: true, ubah: t0 + 1.0, riak: t0 + 1.0 }, tPutusan: t0 + 1.4 }); ctx.restore();
    } },
    { id: 'ui.gelembungChat', judul: 'gelembung chat muncul dari ekornya, tag bahasa di atas', hold: 2.4, draw(ctx, t, t0) {
      [['Halo, apa kabar?', 'INDONESIA'], ['Hello, how are you?', 'INGGRIS'], ['Kumaha damang?', 'SUNDA'], ['Piye kabare?', 'JAWA']].forEach(([s, tag], i) => {
        const kiri = i % 2 === 0; gelembungChat(ctx, kiri ? -720 : 720, -270 + 180 * i, s, t, t0 + .3 * i, { kiri, tag, font: SRF(56) }); });
    } },
    { id: 'ui.komentar', judul: 'kartu komentar: ketik serif, lalu hati lime + angka naik', hold: 2.6, draw(ctx, t, t0) {
      ctx.save(); ctx.scale(1.5, 1.5); komentar(ctx, 0, -20, t, t0, { nama: '@pembaca', inisial: 'PB', waktu: '2 mnt', suka: t0 + 2.0 }); ctx.restore();
    } },
    { id: 'ui.kotakKomentar', judul: 'kotak tulis komentar: fokus, ketik + caret lime, tombol menyala', hold: 2.9, draw(ctx, t, t0) {
      ctx.save(); ctx.scale(1.2, 1.2); kotakKomentar(ctx, 0, -20, t, t0, { cps: [45, 45] }); ctx.restore();
    } },
    { id: 'ui.notif', judul: 'notifikasi jatuh, progres jalan, berita berganti, centang lime', hold: 2.9, draw(ctx, t, t0) {
      notif(ctx, 0, -300, t, t0, { redup: true, w: 1200, app: 'OPERATOR', waktu: 'kemarin', judul: 'Kuota internet hampir habis', isi: 'Sisa 120 MB' });
      notif(ctx, 0, 110, t, t0 + .3, { app: 'BERITA', waktu: 'baru saja', judul: 'Data latih AI mulai menipis', isi: 'Peneliti memperkirakan stok teks habis', progres: [.2, .86], tProgres: t0 + .8, ket: 'TEKS PUBLIK TERPAKAI',
        ganti: { t: t0 + 1.9, judul: 'AI kini belajar dari data sintetis', waktu: '1 mnt' }, centang: t0 + 2.4 });
    } },
    { id: 'ui.miniKomentar', judul: 'chip komentar mini untuk kerumunan reaksi', hold: 2.4, draw(ctx, t, t0) {
      for (let i = 0; i < 18; i++) { const c = i % 6, r = Math.floor(i / 6);
        miniKomentar(ctx, -800 + 280 * c + (r % 2) * 110, -260 + 240 * r, t, t0 + .05 * i, { s: 1.25 + .2 * ((i * 7) % 3), rot: ((i * 37) % 13) - 6, seed: i + 3, isi: i === 7 ? LIME : undefined }); }
    } },
  ],
};
