// Galeri · prop.js (light world) — line-art props on paper: robot on a bike, icons on paper. DUMMY labels.
import { MN, ivo, txt } from './kit.js';
import { robot, sepeda, ikon, gembok, orang } from './pustaka/prop.js';

export default {
  modul: 'prop',
  light: true,
  demos: [
    { id: 'prop.robot', judul: 'robot garis: lihat · kedip · kacamata · antena lime', draw(ctx, t, t0) {
      const a = ctx.globalAlpha;
      [{}, { look: 1, glasses: true }, { blink: true, lime: true, rh: [70, -150], rot: -6 }].forEach((o, i) => {
        ctx.globalAlpha = a * Math.min(1, Math.max(0, (t - t0 - i * .15) / .3)); robot(ctx, -480 + i * 480, 120, 220, o); });
    } },
    { id: 'prop.sepeda', judul: 'robot naik sepeda (sepeda() kembalikan titik sadel & setang)', hold: 2, draw(ctx, t, t0) {
      const x = -900 + 1100 * Math.min(1, Math.max(0, (t - t0) / 1.6)), r = 100, P = sepeda(ctx, x, 330, r, { spin: (t - t0) * 6 });
      robot(ctx, x + P.seat[0] + 10, 330 + P.seat[1] - .4 * 78, 78, { look: 1, rh: [P.bar[0] - P.seat[0] - 10, P.bar[1] - P.seat[1] + .4 * 78], lime: true });
    } },
    { id: 'prop.badan', judul: 'badan() = kertas di dunia terang: ikon + gembok + orang piktogram', draw(ctx, t, t0) {
      ['labu', 'petir', 'awan', 'dompet', 'senyum'].forEach((n, i) => ikon(ctx, -720 + i * 360, -150, 200, t, t0 + i * .06, { name: n, lime: n === 'dompet' }));
      gembok(ctx, -360, 250, 110, t, t0 + .4, { tOpen: t0 + 1.2 });
      for (let i = 0; i < 5; i++) orang(ctx, 60 + i * 90, 330, 130, { style: 'piktogram', col: i === 2 ? '#4B6800' : undefined });
      txt(ctx, 'CONTOH', 240, 400, t, t0 + .6, MN(20), { ls: 4, align: 'center', col: ivo(.6) });
    } },
  ],
};
