// Galeri · season2.js — paket elemen Season 2 di dalam ruang gelap khas RNC (#0B0C09 + #F1EFE6 + #C8F53C).
import { inv, lerp, E, LIME, IVORY, INK, ivo, setFont, DSP, SRF, MN, txt } from './kit.js';
import { dummyFoto } from './pustaka/dasar.js';
import {
  stripAccordion, valueFlip, wordToSearchUI, kineticBento, kutipanLepas,
  gravityBake, gravityBlocks, dotMorphBuild, dotMorph, kineticRing3D,
  slitScanText, metaballMerge, renderLumaSeam, render3DStudioBench, renderFoldWorld,
} from './pustaka/season2.js';

export default {
  modul: 'season2',
  async load(IM) {
    IM.f1 = dummyFoto(1280, 720, 4);
    IM.f2 = dummyFoto(1280, 720, 11);
    IM.grav = gravityBake({ n: 18, w: 680, floorY: 250 });
    IM.dm = dotMorphBuild(IM.f1, null, { w: 1200, h: 660 });
  },
  demos: [
    { id: 'season2.stripAccordion', judul: '4 strip foto bergeser & ubah tinggi di ketukan', draw(ctx, t, t0, IM) {
      stripAccordion(ctx, IM.f1, 0, 20, 1360, 560, t, t0, { shiftAt: t0 + 1.0 });
    } },
    { id: 'season2.valueFlip', judul: 'flip gelap ↔ lime ↔ terang di jangkar tetap + 12 fps', hold: 2.3, draw(ctx, t, t0) {
      valueFlip(ctx, ['6× KONTRAS', 'ZERO MONOTON', 'TETAP KHAS'], 0, 0, t, t0, { pill: ['ΔE +65', 'AKSEN LIME', 'ON-TWOS'], sub: 'FLIP NILAI DI JANGKAR TETAP' });
    } },
    { id: 'season2.wordToSearchUI', judul: 'kata kalimat berubah jadi search bar + kursor aktor', hold: 2.3, draw(ctx, t, t0) {
      wordToSearchUI(ctx, 'Kenapa mesin bisa', 'DIUJI?', 'arXiv:2412.14093 · bukti lab', 0, 0, t, t0);
    } },
    { id: 'season2.kineticBento', judul: '3 panel bento hidup (Apple Spring reflow)', hold: 2.2, draw(ctx, t, t0, IM) {
      kineticBento(ctx, 0, 10, 1480, 680, [
        { title: 'DOKUMEN UTAMA', draw(c, x, y, w, h) { c.drawImage(IM.f1, x + 16, y + 16, w - 32, h - 32); } },
        { title: 'ANGKA KUNCI', draw(c, x, y) { setFont(c, DSP(110), 2); c.fillStyle = LIME; c.fillText('78%', x + 28, y + 135); } },
        { title: 'PETA / KONTEKS', draw(c, x, y, w, h) { c.drawImage(IM.f2, x + 12, y + 12, w - 24, h - 24); } },
      ], t, t0, { expandAt: t0 + 0.9 });
    } },
    { id: 'season2.kutipanLepas', judul: 'halaman bukti meredup → frasa kunci terangkat', hold: 2.1, draw(ctx, t, t0, IM) {
      ctx.drawImage(IM.f1, -640, -340, 1280, 680);
      kutipanLepas(ctx, 0, 0, 1280, 680, 'ALIGNMENT FAKING', t, t0 + 0.5, { tag: 'BUKTI HIDUP v2', sub: 'Frasa kunci terangkat jadi argumen utama.' });
    } },
    { id: 'season2.gravityBlocks', judul: 'simulasi gravitasi 120 Hz — balok data jatuh & menumpuk', hold: 2.4, draw(ctx, t, t0, IM) {
      const n = gravityBlocks(ctx, IM.grav, 220, 30, t, t0);
      txt(ctx, `${String(n).padStart(2, '0')}×`, -560, -20, t, t0 + 0.1, DSP(180), { col: LIME });
      txt(ctx, 'BEBAN FISIK NYATA', -560, 50, t, t0 + 0.2, MN(22), { ls: 3, col: ivo(0.75) });
    } },
    { id: 'season2.dotMorph', judul: 'Two-Wave Dot Morph — piksel foto jadi grafik batang', hold: 2.4, draw(ctx, t, t0, IM) {
      dotMorph(ctx, IM.dm, 0, 10, t, t0, { img: IM.f1 });
    } },
    { id: 'season2.kineticRing3D', judul: 'teks 3D melingkari silinder miring', hold: 2.0, draw(ctx, t, t0) {
      kineticRing3D(ctx, 'SATU CHANNEL · BANYAK TEKNIK · RISING CRAFT · ', 0, 0, t, t0, { hi: [15, 29] });
    } },
    { id: 'season2.slitScanText', judul: '12-slice Slit-Scan Time Displacement', hold: 1.9, draw(ctx, t, t0) {
      slitScanText(ctx, 'ERA BARU', 0, 0, 210, t, t0);
    } },
    { id: 'season2.metaballMerge', judul: 'Liquid Metaball Merge (blur + alpha threshold)', hold: 1.9, draw(ctx, t, t0) {
      metaballMerge(ctx, 0, 0, t, t0, { label: 'INTI' });
    } },
    { id: 'season2.renderLumaSeam', judul: 'WebGL2 Shadow-First Luma + Ink Seam Wipe', hold: 1.7, draw(ctx, t, t0, IM) {
      const cv = renderLumaSeam(IM.f1, IM.f2, E.inOutCubic(inv(t0 + 0.3, t0 + 1.9, t)));
      if (cv) ctx.drawImage(cv, -680, -382, 1360, 765);
    } },
    { id: 'season2.render3DStudioBench', judul: 'WebGL2 3D Softbox Monolith + X-Ray Blueprint', hold: 2.0, draw(ctx, t, t0) {
      const k = inv(t0, t0 + 2.4, t), ang = lerp(-0.5, 0.35, k);
      const cv = render3DStudioBench({ camPos: [Math.sin(ang) * 3.7, 1.38, Math.cos(ang) * 3.7], xrayY: lerp(1.45, 0.18, k), xrayAmt: 1.0 });
      if (cv) ctx.drawImage(cv, -680, -382, 1360, 765);
    } },
    { id: 'season2.renderFoldWorld', judul: 'WebGL2 3D Cylinder Fold / Bend the World', hold: 1.7, draw(ctx, t, t0, IM) {
      const cv = renderFoldWorld(IM.f1, IM.f2, E.inOutCubic(inv(t0 + 0.3, t0 + 1.9, t)));
      if (cv) ctx.drawImage(cv, -680, -382, 1360, 765);
    } },
  ],
};
