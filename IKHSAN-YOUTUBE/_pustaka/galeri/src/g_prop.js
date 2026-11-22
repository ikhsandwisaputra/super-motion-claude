// Galeri · prop.js — physical objects, people, buildings and line icons, dark world. DUMMY labels and photos only.
import { E, inv, MN, DSP, ivo, txt } from './kit.js';
import { kq } from './draw.js';
import { gembok, labelHarga, pagar, tumpukHuruf, timbangan, orang, kerumunan, globe, monitorCRT, pusatData, ember, tiketOrder, kupon, jam,
  uangKertas, troli, kalender, pintu, ikon, IKON, gerobak, rakBuku, tetes, sumur } from './pustaka/prop.js';
import { cover, dummyFoto } from './pustaka/dasar.js';

export default {
  modul: 'prop',
  async load(IM) { IM.foto = dummyFoto(1200, 800, 3); },
  demos: [
    { id: 'prop.gembok', judul: 'gembok jatuh berpegas lalu terbuka (o.tOpen)', draw(ctx, t, t0) {
      gembok(ctx, -260, 40, 180, t, t0); gembok(ctx, 260, 40, 180, t, t0 + .15, { tOpen: t0 + 1.1 });
      txt(ctx, 'TERKUNCI', -260, 330, t, t0 + .5, MN(22), { ls: 4, align: 'center', col: ivo(.6) }); txt(ctx, 'TERBUKA', 260, 330, t, t0 + 1.2, MN(22), { ls: 4, align: 'center', col: ivo(.6) });
    } },
    { id: 'prop.labelHarga', judul: 'label harga berayun di tali, ditendang ulang (o.kick)', draw(ctx, t, t0) {
      labelHarga(ctx, -300, -360, 400, t, t0, { l1: 'HARGA CONTOH', l2: 'Rp 99.000' });
      labelHarga(ctx, 300, -360, 340, t, t0 + .2, { l1: 'DATA', l2: 'GRATIS?', kick: [[t0 + 1.3, 14]] });
    } },
    { id: 'prop.pagar', judul: 'pagar besi jatuh batang demi batang + jendela terbuka (o.cut)', draw(ctx, t, t0, IM) {
      ctx.save(); ctx.globalAlpha *= kq(t, t0 - .2, .5); cover(ctx, IM.foto, -820, -440, 1640, 860, 14); ctx.restore();
      pagar(ctx, 0, -20, 860, t, t0 + .2, { cut: [520, -100, 300, 420] });
    } },
    { id: 'prop.timbangan', judul: 'timbangan gading miring ke tumpukan huruf, label lime', hold: 2.6, draw(ctx, t, t0) {
      timbangan(ctx, 0, 420, .62, t, t0, { tilt: 9, tTilt: t0 + .9, labels: ['SEDIKIT', 'BANYAK'], subs: ['contoh kiri', 'contoh kanan'], lime: 1, tLabel: [t0 + .6, t0 + .9],
        left: (c, tt) => tumpukHuruf(c, 0, 0, 22, tt, t0 + .3, { huruf: 'yangdanditu', baris: 1, span: .6, key: 'gL' }),
        right: (c, tt) => tumpukHuruf(c, 0, 0, 22, tt, t0 + .3, { baris: 6, lebar: 240, span: 1.2, key: 'gR' }) });
    } },
    { id: 'prop.tumpukHuruf', judul: 'tumpukan huruf di piring timbangan garis (o.style garis)', hold: 2.6, draw(ctx, t, t0) {
      timbangan(ctx, 0, 430, .7, t, t0, { style: 'garis', tilt: -7, tTilt: t0 + 1, labels: ['INGGRIS', 'INDONESIA'], lime: 1,
        left: (c, tt) => tumpukHuruf(c, 0, 34, 22, tt, t0 + .3, { baris: 8, lebar: 300, span: 1.2, key: 'tl' }),
        right: (c, tt) => tumpukHuruf(c, 0, 34, 22, tt, t0 + .3, { huruf: 'yangdanditu', baris: 1, span: .6, key: 'tr' }) });
    } },
    { id: 'prop.orang', judul: 'orang: garis · isi (menyala) · piktogram · siluet berpapan', draw(ctx, t, t0) {
      const k = i => kq(t, t0 + i * .12, .5); const a = ctx.globalAlpha;
      ctx.globalAlpha = a * k(0); orang(ctx, -660, 200, 300);
      ctx.globalAlpha = a * k(1); orang(ctx, -260, 200, 260, { style: 'isi', on: kq(t, t0 + 1, .4) });
      ctx.globalAlpha = a * k(2); orang(ctx, 100, 200, 300, { style: 'piktogram' });
      ctx.globalAlpha = a * k(3); orang(ctx, 520, 240, 620, { style: 'siluet', label: 'TERSANGKA 1' });
      ctx.globalAlpha = a * k(3); orang(ctx, 800, 240, 620, { style: 'siluet', chip: true, label: 'AI' });
    } },
    { id: 'prop.kerumunan', judul: 'kerumunan: grid 100 orang menyala · baris kepala · sisi', hold: 2.4, draw(ctx, t, t0) {
      kerumunan(ctx, -540, -20, 1.3, t, t0, { lit: 37, tLit: t0 + .7, step: .02 });
      kerumunan(ctx, 330, 160, .55, t, t0 + .2, { pattern: 'baris', n: 7 });
      txt(ctx, '37 DARI 100 (CONTOH)', -540, 380, t, t0 + 1.4, MN(22), { ls: 4, align: 'center', col: ivo(.6) });
    } },
    { id: 'prop.globe', judul: 'globe garis + kerumunan sisi: 8 dada masuk dari kiri-kanan, lalu hilang (o.tLeave)', hold: 1.6, draw(ctx, t, t0) {
      kerumunan(ctx, 0, 300, 1, t, t0, { pattern: 'sisi', tLeave: t0 + 2.2 }); globe(ctx, 0, -40, 230, t, t0, { a: .3 });
    } },
    { id: 'prop.monitorCRT', judul: 'monitor tabung tahun 2000, halaman dial-up memuat', hold: 2.6, draw(ctx, t, t0) {
      monitorCRT(ctx, 0, -40, 700, t, t0 + .1, { url: 'http://www.contoh.id' });
    } },
    { id: 'prop.pusatData', judul: 'rak server tumbuh · gedung pusat data LED berkedip', draw(ctx, t, t0) {
      for (let i = 0; i < 4; i++) pusatData(ctx, -720 + i * 130, 380, 520 + 60 * (i % 2), t, t0 + i * .08, { w: 110 });
      pusatData(ctx, 380, 380, 440, t, t0 + .3, { style: 'gedung' });
    } },
    { id: 'prop.ember', judul: 'ember terisi gelombang, melimpah lewat bibir (level > 1)', hold: 2.6, draw(ctx, t, t0) {
      ember(ctx, -320, 300, 360, t, t0, { to: .6 }); ember(ctx, 320, 300, 360, t, t0 + .1, { to: 1.2, seed: 4, dur: 1.6 });
    } },
    { id: 'prop.tiketOrder', judul: 'tiket order dapur jatuh ke rel, judulnya berbalik (o.tFlip)', hold: 2.4, draw(ctx, t, t0) {
      ctx.fillStyle = ivo(.5); ctx.fillRect(-800, -404, 1600, 8);
      tiketOrder(ctx, -380, -400, 300, t, t0, { no: '0417', title: 'NASI\nGORENG', ang: -2 });
      tiketOrder(ctx, 0, -400, 300, t, t0 + .15, { no: '0418', title: 'DATA\nMENTAH', title2: 'DATA\nBERSIH', tFlip: t0 + 1.2 });
      tiketOrder(ctx, 380, -400, 300, t, t0 + .3, { no: '0419', title: 'ES\nTEH', ang: 2 });
    } },
    { id: 'prop.kupon', judul: 'kupon promo generik pop, lalu membeku (o.tFrost)', draw(ctx, t, t0) {
      kupon(ctx, -300, -40, 460, t, t0, { label: 'DISKON', rot: -4 }); kupon(ctx, 300, 60, 460, t, t0 + .15, { label: 'GRATIS', rot: 3, tFrost: t0 + 1.1 });
    } },
    { id: 'prop.jam', judul: 'jam berputar makin cepat dengan jarum hantu', hold: 2.6, draw(ctx, t, t0) {
      jam(ctx, -300, 0, 230, t, t0, { speed: 2 }); jam(ctx, 300, 0, 230, t, t0 + .1, { speed: 7, rgb: '200,245,60' });
    } },
    { id: 'prop.uangKertas', judul: 'uang kertas bergaya (bukan replika), kanvas di-cache', draw(ctx, t, t0) {
      const c = uangKertas({ angka: '10.000', teks: 'UANG CONTOH', catatan: 'BUKAN ALAT PEMBAYARAN' }), k = kq(t, t0, .7);
      ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 60); ctx.rotate(-.04); ctx.drawImage(c, -600, -250); ctx.restore();
    } },
    { id: 'prop.troli', judul: 'troli kawat masuk, paket berjatuhan satu-satu', hold: 2.2, draw(ctx, t, t0) { troli(ctx, 0, 40, 1.7, t, t0); } },
    { id: 'prop.kalender', judul: 'kalender meja pop, halamannya disobek (o.tTear)', draw(ctx, t, t0) {
      kalender(ctx, -300, 0, 300, t, t0, { month: 'MEI', day: 17, rot: -3 });
      kalender(ctx, 300, 0, 300, t, t0 + .15, { month: 'JAN', day: 1, month2: 'DES', day2: 31, tTear: t0 + 1 });
    } },
    { id: 'prop.pintu', judul: 'tiga pintu bernomor membuka, cahaya tumpah, ikon di daun', hold: 2.4, draw(ctx, t, t0) {
      ['labu', 'steker', 'papan'].forEach((ic, i) => pintu(ctx, -560 + i * 560, -40, .72, t, t0 + i * .12, { icon: ic, no: i + 1, label: ['RISET', 'ENERGI', 'ATURAN'][i], tOpen: t0 + .9 + i * .15 }));
    } },
    { id: 'prop.ikon', judul: 'ikon garis (14), resep & awan putus-putus = hantu (o.dash)', hold: 2.4, draw(ctx, t, t0) {
      IKON.forEach((n, i) => { const c = i % 7, r = Math.floor(i / 7); ikon(ctx, -720 + c * 240, -170 + r * 330, 170, t, t0 + i * .04, { name: n, tEmpty: t0 + 1, tLock: t0 + 1.1, lime: n === 'dompet', dash: n === 'resep' || n === 'awan' });
        txt(ctx, n, -720 + c * 240, -170 + r * 330 + 140, t, t0 + .3 + i * .04, MN(18), { ls: 3, align: 'center', col: ivo(.55) }); });
    } },
    { id: 'prop.gerobak', judul: 'gerobak bakso, stiker QR dipindai (kurung lime + sapuan)', hold: 2.2, draw(ctx, t, t0) {
      gerobak(ctx, -60, 60, .95, t, t0, { tScan: t0 + .8 });
    } },
    { id: 'prop.rakBuku', judul: 'rak kitab muncul bergelombang, lalu dibaca satu-satu', hold: 2.6, draw(ctx, t, t0) {
      const u = rakBuku(ctx, 0, 300, .9, t, t0, { tRead: t0 + .8, durRead: 1.4 });
      txt(ctx, 'BELUM DIBACA: ' + u, 0, 400, t, t0 + .4, MN(22), { ls: 4, align: 'center', col: ivo(.6) });
    } },
    { id: 'prop.tetes', judul: 'tetes berisi kata jatuh, memipih, kolam + riak + kata terciprat', hold: 1.2, draw(ctx, t, t0) { tetes(ctx, 0, -40, 230, t, t0); } },
    { id: 'prop.sumur', judul: 'sumur potongan: kata-kata surut (data habis)', hold: 2.6, draw(ctx, t, t0) {
      sumur(ctx, 0, -260, .85, t, t0); txt(ctx, 'LEVEL TURUN', 520, -240, t, t0 + 1, MN(22), { ls: 4, col: ivo(.6) });
    } },
  ],
};
