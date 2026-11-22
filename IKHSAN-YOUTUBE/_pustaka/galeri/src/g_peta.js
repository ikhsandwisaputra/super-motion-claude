// Galeri · peta.js (dark) — Indonesia dot map (CC BY-SA credit on screen), world dot map zoom, pins, island outlines, routes.
import { E, inv, lerp, MN, DSP, ivo, txt, fall, LIME } from './kit.js';
import { petaTitik, petaDunia, pin, petaPulau, pinKota, ruteBusur, ruteKipas, lonLat, KOTA } from './pustaka/peta.js';

export default {
  modul: 'peta',
  demos: [
    { id: 'peta.petaTitik', judul: 'Indonesia 1615 titik bercahaya, Jawa lime, kredit CC BY-SA', hold: 2.2, draw(ctx, t, t0) {
      const [jx] = lonLat(105, 0), [jx2] = lonLat(114.6, 0);
      petaTitik(ctx, 0, 0, 1, t, t0, { hot: (i, x, y) => x > jx && x < jx2 && y > 100 });
      fall(ctx, 'INDONESIA', 0, -320, t, t0 + .9, DSP(120), { align: 'center', ls: 14 });
    } },
    { id: 'peta.petaDunia', judul: 'peta dunia titik (Robinson 150°BT) lalu zoom ke Indonesia + komentar', hold: 2.9, draw(ctx, t, t0) {
      const z = E.inOutCubic(inv(t0 + 1.1, t0 + 2.2, t)), cs = lerp(9, 30, z), m = petaDunia(ctx, 0, lerp(-40, 0, z), cs, t, t0, { fokus: [lerp(150, 118, z), lerp(10, -2, z)] });
      [['jakarta', .0], ['makassar', .15], ['medan', .3]].forEach(([k, d]) => { const [px, py] = m.at(...KOTA[k]); pin(ctx, px, py, t, t0 + 2.1 + d, { q: true, s: .5 + .5 * z }); });
      txt(ctx, 'KOMENTAR JADI PETA', -820, -420, t, t0 + .2, MN(24), { ls: 6, col: ivo(.7) });
    } },
    { id: 'peta.pin', judul: 'tiga pin: komentar "?", label mono, fokus lime bernapas', hold: 2.0, draw(ctx, t, t0) {
      pin(ctx, -500, 40, t, t0, { q: true, s: 1.4 });
      pin(ctx, -40, 40, t, t0 + .3, { label: 'TITIK CONTOH' });
      pin(ctx, 540, 40, t, t0 + .6, { lime: true });
      txt(ctx, 'q · label · lime', 0, 260, t, t0 + .4, MN(20), { align: 'center', ls: 4, col: ivo(.5) });
    } },
    { id: 'peta.petaPulau', judul: 'pulau-pulau tersapu masuk + garis batas negara putus-putus', hold: 2.2, draw(ctx, t, t0) {
      const P = petaPulau(ctx, 0, -20, 1, t, t0, { batas: t0 + .8 });
      pinKota(ctx, ...P(...KOTA.medan), t, t0 + 1.3, 'KOTA A'); pinKota(ctx, ...P(...KOTA.jakarta), t, t0 + 1.5, 'KOTA B'); pinKota(ctx, ...P(...KOTA.makassar), t, t0 + 1.7, 'KOTA C', true);
    } },
    { id: 'peta.ruteBusur', judul: 'rute busur lime + cincin tiba, rute ke luar terputus ✗', hold: 2.6, draw(ctx, t, t0) {
      const P = petaPulau(ctx, 0, -20, 1, t, t0 - 1);
      const a = P(...KOTA.medan), b = P(...KOTA.jakarta), c = P(...KOTA.makassar);
      [a, b, c].forEach((q, i) => pinKota(ctx, ...q, t, t0 - .5 + i * .1));
      ruteBusur(ctx, ...a, ...b, t, t0, { bow: 90, dur: .6 }); ruteBusur(ctx, ...b, ...c, t, t0 + .6, { bow: 110, dur: .6 });
      ruteBusur(ctx, ...b, 330, -420, t, t0 + 1.2, { putus: true, dur: .7 });
      txt(ctx, 'KE LUAR NEGERI', 340, -440, t, t0 + 1.2, MN(22), { ls: 3, col: ivo(.6) });
    } },
    { id: 'peta.ruteKipas', judul: 'empat rute mengipas dari satu sumber, denyut cahaya mengalir', hold: 2.7, draw(ctx, t, t0) {
      const R = [['JALUR SATU', -300], ['JALUR DUA', -100], ['JALUR TIGA', 100], ['JALUR EMPAT', 300]].map(([label, yo], i) => ({ label, yo, at: t0 + .2 + i * .35 }));
      ruteKipas(ctx, -470, 0, 560, 0, R, t, t0, { end: t0 + 3 });
      ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(-470, 0, 22, 0, 7); ctx.fill(); ctx.strokeStyle = ivo(.8); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(560, 0, 26, 0, 7); ctx.stroke();
      txt(ctx, 'SUMBER', -470, 70, t, t0, MN(20), { align: 'center', ls: 4, col: ivo(.6) }); txt(ctx, 'TUJUAN', 560, 74, t, t0, MN(20), { align: 'center', ls: 4, col: ivo(.6) });
    } },
  ],
};
