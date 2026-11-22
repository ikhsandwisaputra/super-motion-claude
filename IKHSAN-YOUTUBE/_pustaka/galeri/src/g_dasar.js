// Galeri · dasar.js — base helpers on dummy images (FOTO CONTOH), dark world.
import { inv, E, INK, ivo, setFont, DSP, SRF, MN, HND, txt } from './kit.js';
import { cover, shadowed, letterTex, tileTex, strike, node, check, cross, paper, dummyFoto } from './pustaka/dasar.js';
import { kq } from './draw.js';

export default {
  modul: 'dasar',
  async load(IM) {
    IM.foto = dummyFoto(1200, 800, 3);
    IM.foto2 = dummyFoto(900, 1200, 8);
    [IM.sh, IM.shS] = shadowed(dummyFoto(700, 470, 5), 40);
    IM.tex = letterTex(MN(30, 400), 22, 7, .55);
    IM.texL = letterTex(SRF(44), 16, 19, .9);
  },
  demos: [
    { id: 'dasar.cover', judul: 'centre-crop ke kotak (r = sudut)', draw(ctx, t, t0, IM) {
      const k = kq(t, t0, .7), w = 520 + 260 * E.inOutCubic(inv(t0 + .9, t0 + 1.9, t));
      ctx.globalAlpha *= k; cover(ctx, IM.foto, -w - 30, -230, w, 460, 18); cover(ctx, IM.foto2, 30, -300, 360, 600, 18);
      txt(ctx, 'LEBAR BERUBAH · FOTO TETAP TERPOTONG RAPI', -620, 330, t, t0 + .3, MN(20), { ls: 3, col: ivo(.7) });
    } },
    { id: 'dasar.shadowed', judul: 'foto + bayangan lembut terpisah', draw(ctx, t, t0, IM) {
      const k = kq(t, t0, .8), lift = 30 * (1 - k);
      ctx.globalAlpha *= k; ctx.drawImage(IM.shS, -IM.sh.width / 2 + 24, -IM.sh.height / 2 + 30 + lift * 2); ctx.drawImage(IM.sh, -IM.sh.width / 2, -IM.sh.height / 2 - lift);
    } },
    { id: 'dasar.letterTex', judul: 'Sumur Huruf: tekstur kata Indonesia + tileTex gulir', hold: 2.2, draw(ctx, t, t0, IM) {
      ctx.save(); ctx.beginPath(); ctx.rect(-820, -400, 1640, 800); ctx.clip();
      tileTex(ctx, IM.tex, -820, -400, 1640, 800, (t - t0) * 140);
      ctx.globalAlpha *= .9; tileTex(ctx, IM.texL, -820, -400, 1640, 800, -(t - t0) * 60); ctx.restore();
      txt(ctx, 'KATA', 0, 60, t, t0 + .4, DSP(260), { align: 'center' });
    } },
    { id: 'dasar.strike', judul: 'coretan menyambar satu baris (size = ukuran huruf)', draw(ctx, t, t0) {
      setFont(ctx, SRF(96)); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.globalAlpha *= kq(t, t0, .5);
      const s = 'mesin tidak pernah lupa', w = ctx.measureText(s).width; ctx.fillText(s, 0, 30); ctx.textAlign = 'left';
      strike(ctx, -w / 2, w / 2, 30, 96, t, t0 + .7);
    } },
    { id: 'dasar.node', judul: 'cakram nomor lime yang memantul (langkah, urutan)', draw(ctx, t, t0) {
      ['kumpul', 'saring', 'latih'].forEach((s, i) => { node(ctx, -440 + i * 440, -40, i + 1, t, t0 + i * .18);
        txt(ctx, s.toUpperCase(), -440 + i * 440, 110, t, t0 + .2 + i * .18, DSP(64), { align: 'center' }); });
    } },
    { id: 'dasar.check', judul: 'centang & silang (vonis ya / tidak)', draw(ctx, t, t0) {
      check(ctx, -260, -30, 110, t, t0); cross(ctx, 260, -30, 110, t, t0 + .35);
      txt(ctx, 'ASLI', -260, 170, t, t0 + .2, DSP(72), { align: 'center' }); txt(ctx, 'SALINAN', 260, 170, t, t0 + .55, DSP(72), { align: 'center' });
    } },
    { id: 'dasar.paper', judul: 'lembar kertas + tulisan tangan (HND = Caveat)', draw(ctx, t, t0) {
      const a0 = ctx.globalAlpha, k = kq(t, t0, .6); ctx.save(); ctx.translate(0, 40 * (1 - k)); ctx.rotate(-.03); ctx.globalAlpha = a0 * k; paper(ctx, 760, 480, 10);
      setFont(ctx, HND(64)); ctx.fillStyle = '#15160F'; ['catatan kecil:', 'data habis 2028?', '— cek sumbernya'].forEach((s, i) => {
        ctx.globalAlpha = a0 * k * E.outCubic(inv(t0 + .4 + i * .3, t0 + .7 + i * .3, t)); ctx.fillText(s, -320, -110 + i * 110); });
      ctx.restore();
    } },
    { id: 'dasar.dummyFoto', judul: 'foto prosedural untuk demo — jangan dipakai di film', draw(ctx, t, t0, IM) {
      ctx.globalAlpha *= kq(t, t0, .5); ctx.drawImage(IM.foto, -600, -400);
    } },
  ],
};
