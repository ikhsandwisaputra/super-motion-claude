// Galeri · data.js (dark) — charts, timeline, route, split-flap and sound meters on DUMMY numbers (not real data).
import { E, inv, LIME, INK, ivo, MN, DSP, SRF, txt } from './kit.js';
import { letterTex } from './pustaka/dasar.js';
import { barChart, hBars, waffle, timeline, jalur, flap, flapEvents, flapState, splitFlap, meter, wave } from './pustaka/data.js';

export default {
  modul: 'data',
  async load(IM) { IM.tex = letterTex(MN(30, 400), 22, 7, .55); },
  demos: [
    { id: 'data.barChart', judul: 'batang vs kolom stok bertekstur + irisan lime ±1/10', hold: 2.6, draw(ctx, t, t0, IM) {
      barChart(ctx, 0, 0, [{ v: 15, s: '15+', label: 'MODEL A' }, { v: 30, s: '30+', label: 'MODEL B' }, { v: 36, s: '±36', label: 'MODEL C' }], t, t0,
        { stock: { v: 300, label: 'STOK CONTOH', sub: '(DATA DUMMY)' }, slice: { v: 36, at: t0 + 1.5 }, tex: IM.tex });
    } },
    { id: 'data.hBars', judul: 'batang mendatar, angka ikut ujung, baris panas bertepi lime', hold: 2.4, draw(ctx, t, t0, IM) {
      hBars(ctx, 0, 0, [{ label: 'KATEGORI A', v: 12 }, { label: 'KATEGORI B', v: 27, hot: true }, { label: 'KATEGORI C', v: 8 }], t, t0, { tex: IM.tex });
    } },
    { id: 'data.waffle', judul: 'grid 20×15 muncul berurutan, n sel pertama "dimakan" lime', hold: 2.6, draw(ctx, t, t0, IM) {
      waffle(ctx, 0, 20, 30, t, t0, { cs: 40, title: '300 SEL · 30 SEL = 10 %', eat: t0 + 1.3, tex: IM.tex });
    } },
    { id: 'data.timeline', judul: 'sumbu tahun + jendela + kurva naik menabrak garis + pin', hold: 2.7, draw(ctx, t, t0) {
      timeline(ctx, 0, 0, t, t0, { band: [2026, 2032], line: { label: 'AMBANG CONTOH' }, curves: [{ to: 2028, at: t0 + .3 }, { to: 2032, at: t0 + .5 }], pin: 2026, pinAt: t0 + 1.5 });
    } },
    { id: 'data.jalur', judul: 'Peta Jalur: progres ke titik 3, titik aktif pegas lime', hold: 2.2, draw(ctx, t, t0) {
      jalur(ctx, 0, 0, ['MULAI', 'SATU', 'DUA', 'TIGA', 'EMPAT', 'SELESAI'], 3, t, t0 + .3);
      txt(ctx, 'BAB 3 DARI 5', -750, -160, t, t0 + .2, MN(22), { ls: 5, col: ivo(.6) });
    } },
    { id: 'data.splitFlap', judul: 'papan split-flap: kata membalik per petak, lampu saat mendarat', hold: 2.8, draw(ctx, t, t0) {
      splitFlap(ctx, 0, -30, [
        { label: 'TERSANGKA', words: [[t0 + .9, 'HARGA HP']] },
        { label: 'BUKTI', words: [[t0 + 1.15, 'TAGIHAN'], [t0 + 2.2, 'DOMPET', 'lime']] },
        { label: 'STATUS', words: [[t0 + 1.4, 'DICEK 72']] }], t, t0, { title: 'PAPAN CONTOH · 03 BARIS' });
    } },
    { id: 'data.flap', judul: 'petak flap besar + guncang saat skor mendarat', hold: 2.4, draw(ctx, t, t0) {
      const tw = t0 + 1.2, s = t - tw - .4, sh = s > 0 ? 14 * Math.exp(-9 * s) * Math.sin(55 * s) : 0, W = [[tw, '100:0']], N = 5;
      for (let i = 0; i < N; i++) { const st = flapState(flapEvents(t0, W, i), t, i * 13 + 7); if (i === 4 && st.p >= 1 && t > tw) st.look = 'lime';
        flap(ctx, -332 + i * 166 + sh, -20, 150, 230, st, { shadow: true }); }
      txt(ctx, 'SKOR CONTOH', 0, 190, t, t0 + .2, MN(22), { align: 'center', ls: 6, col: ivo(.6) });
    } },
    { id: 'data.meter', judul: 'meter level: label mono, rel + tick, isi tinta', hold: 2.2, draw(ctx, t, t0) {
      [['SUARA A', .82], ['SUARA B', .46], ['SUARA C', .18]].forEach(([l, v], i) => { const k = E.outCubic(inv(t0 + i * .2, t0 + .9 + i * .2, t));
        meter(ctx, -450, -160 + i * 150, 900, v * k, l, Math.min(1, k * 3)); });
    } },
    { id: 'data.wave', judul: '9 gelombang suara, pinggiran memudar jadi garis datar', hold: 2.6, draw(ctx, t, t0) {
      const live = new Path2D(), flat = new Path2D(), k0 = E.outCubic(inv(t0, t0 + .8, t));
      for (let i = 0; i < 9; i++) { const d = Math.abs(i - 4), tf = t0 + .6 + (4 - d) * .3, fl = d >= 2 ? E.inOutCubic(inv(tf, tf + .7, t)) : 0, amp = k0 * (32 - 4 * d) * (1 - fl) + 1.5;
        wave(fl > .5 ? flat : live, -860, 860, -230 + i * 58, amp, t, i * 7 + 1); }
      ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.strokeStyle = ivo(.88); ctx.stroke(live); ctx.strokeStyle = 'rgba(124,125,116,.6)'; ctx.stroke(flat);
      txt(ctx, 'SUARA PINGGIRAN', 860, -264, t, t0 + .5, MN(20), { ls: 4, col: ivo(.6), align: 'right' });
      txt(ctx, 'yang tersisa cuma tengah', 0, 330, t, t0 + 1.2, SRF(54), { align: 'center' });
    } },
  ],
};
