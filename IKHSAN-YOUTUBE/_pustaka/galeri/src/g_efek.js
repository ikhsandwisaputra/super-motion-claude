// Galeri · efek.js + bintang (gelembung, salinan, mata) — dummy images only (FOTO CONTOH), dark world.
import { inv, E, clamp, ivo, MN, DSP, txt, mk } from './kit.js';
import { dummyFoto, letterTex, loadTangan } from './pustaka/dasar.js';
import { screenCrack, crackLine, drawCrack, crackStar, shards, shake, frost, fibreBundle, fibreLine, soil, chainSim, chainDrop,
  proseTex, proseSea, colourRing, bloom, impact, motes, wordRain, tank, tankLevel, imageShatter } from './pustaka/efek.js';
import { pumped, wobble, bubble, bubblePop } from './pustaka/gelembung.js';
import { kartu, chain, glass, pudar } from './pustaka/salinan.js';
import { bacaMesin, mataMesin } from './pustaka/mata.js';
import { kq } from './draw.js';

const CV = [[-780, -140], [-330, 40], [120, -90], [560, 80], [820, -30]];
function signFoto() {                                                  // dummy village sign: photo + light board with dark words
  const [C, g] = mk(1400, 700); g.drawImage(dummyFoto(1400, 700, 11), 0, 0);
  g.fillStyle = '#E9E3D2'; g.fillRect(160, 130, 1080, 400); g.strokeStyle = '#2A2C26'; g.lineWidth = 10; g.strokeRect(160, 130, 1080, 400);
  g.fillStyle = '#1A1C17'; g.textBaseline = 'alphabetic'; g.font = `400 170px "League Gothic"`; g.letterSpacing = '6px';
  const L1 = ['WARUNG', 'BU', 'SUM'], L2 = ['nasi', 'goreng', 'es', 'teh'], tok = [];
  const row = (ws, y, h, gap) => { const wd = ws.map(w => g.measureText(w).width), tot = wd.reduce((a, b) => a + b, 0) + gap * (ws.length - 1); let x = 700 - tot / 2;
    ws.forEach((w, i) => { g.fillText(w, x, y); tok.push([(x - 8) / 1400, (y - h) / 700, (wd[i] + 16) / 1400, (h + 22) / 700]); x += wd[i] + gap; }); };
  row(L1, 330, 150, 40); g.font = `700 76px "Space Mono"`; g.letterSpacing = '0px'; row(L2, 460, 62, 46);
  return [C, tok];
}

export default {
  modul: 'efek',
  async load(IM) {
    await loadTangan();
    IM.foto = dummyFoto(1280, 760, 3); IM.foto2 = dummyFoto(1100, 700, 6);
    const [G, gg] = mk(1280, 760); gg.filter = 'grayscale(1) brightness(.8)'; gg.drawImage(IM.foto, 0, 0); IM.grey = G;
    IM.crack = crackLine(CV, 4, { br: [2] });
    IM.chain = chainSim();
    IM.prose = proseTex(1800, 960, 26, 3);
    IM.tex = letterTex(MN(30, 400), 22, 7, .55);
    IM.copies = chain(kartu(), 8);
    const [S, tok] = signFoto(); IM.tok = tok; IM.mata = await bacaMesin(S, 1400, 700, { mode: 'tinta' });
  },
  demos: [
    { id: 'efek.screenCrack', judul: 'Retak Layar: 13 sinar + bias kaca (src+rect)', hold: 1.4, draw(ctx, t, t0, IM) {
      const R = [-640, -380, 1280, 760]; ctx.globalAlpha *= kq(t, t0, .4); ctx.drawImage(IM.foto, ...R);
      ctx.save(); ctx.beginPath(); ctx.rect(...R); ctx.clip(); screenCrack(ctx, 140, -60, t, t0 + .4, { r: .8, src: IM.foto, rect: R, seed: 3 }); ctx.restore();
    } },
    { id: 'efek.drawCrack', judul: 'Garis Retak: menjalar per titik + jaring + serpih + guncang', draw(ctx, t, t0, IM) {
      const C = IM.crack, T = i => t0 + .2 + i * .42; let vis = 0, sh = 0;
      for (let i = 0; i < CV.length - 1; i++) { const q = E.outExpo(clamp((t - T(i)) / .3)); if (q > 0) vis = C.VL[i] + (C.VL[i + 1] - C.VL[i]) * q; sh += shake(t, T(i) + .3, 9); }
      ctx.save(); ctx.translate(sh, .6 * sh); ctx.fillStyle = ivo(.04); ctx.fillRect(-880, -420, 1760, 760);
      drawCrack(ctx, C, vis, { head: true });
      for (let i = 0; i < CV.length - 1; i++) { crackStar(ctx, CV[i + 1][0], CV[i + 1][1], t, T(i) + .3, { seed: i + 1, R: 90 }); shards(ctx, CV[i + 1][0], CV[i + 1][1], t, T(i) + .3, { seed: i + 1, n: 10 }); }
      ctx.restore();
    } },
    { id: 'efek.frost', judul: 'Embun Beku tumbuh dari tepi', draw(ctx, t, t0, IM) {
      ctx.globalAlpha *= kq(t, t0, .3); ctx.drawImage(IM.foto, -640, -380, 1280, 760); frost(ctx, 0, 0, 1280, 760, t, t0 + .1, { dur: 2.2 });
    } },
    { id: 'efek.fibreBundle', judul: 'kabel serat: inti padam satu-satu lalu menyala', draw(ctx, t, t0) {
      ctx.globalAlpha *= kq(t, t0, .4); fibreBundle(ctx, 0, -30, 300, t, t0, { mati: t0 + .5, nyala: t0 + 1.9 });
      txt(ctx, 'KABEL GELAP · 20 INTI', 0, 380, t, t0 + .2, MN(22), { align: 'center', ls: 3, col: ivo(.7) });
    } },
    { id: 'efek.fibreLine', judul: 'serat terkubur di penampang tanah (soil)', draw(ctx, t, t0) {
      ctx.globalAlpha *= kq(t, t0, .4); soil(ctx, 0, 100, 1760, 620);
      [-20, 120, 260].forEach((y, i) => fibreLine(ctx, 0, y, 1700, t, t0, { L: kq(t, t0 + .3 + i * .35, .6), seed: i + 1 }));
    } },
    { id: 'efek.chainDrop', judul: 'rantai verlet jatuh lalu menumpuk', draw(ctx, t, t0, IM) { chainDrop(ctx, 0, 400, IM.chain, t, t0); } },
    { id: 'efek.proseSea', judul: 'lautan tulisan mesin bergulir', draw(ctx, t, t0, IM) {
      proseSea(ctx, 0, 0, 1800, 960, IM.prose, t, t0, { a: kq(t, t0, .6), v: 40, pudar: 220 });
    } },
    { id: 'efek.colourRing', judul: 'warna kembali dalam cincin', draw(ctx, t, t0, IM) {
      ctx.globalAlpha *= kq(t, t0, .3); colourRing(ctx, 0, 0, 1280, 760, IM.grey, IM.foto, t, t0 + .4, { at: [-260, 120] });
    } },
    { id: 'efek.bloom', judul: 'mekar cahaya dari bawah (screen)', draw(ctx, t, t0, IM) { bloom(ctx, 0, 0, 1280, 760, IM.foto, t, t0 + .1, { oy: 1 }); } },
    { id: 'efek.impact', judul: 'benturan: cincin pipih, debu, huruf terpental', hold: .9, draw(ctx, t, t0) {
      const y = -700 + 900 * E.inCubic(inv(t0 - .1, t0 + .35, t)); txt(ctx, 'DATA', 0, y, t, t0 - .2, DSP(300), { align: 'center' });
      impact(ctx, 0, 205, t, t0 + .35, { R: 1200 });
    } },
    { id: 'efek.motes', judul: 'debu hangat naik pelan (hold bernapas)', draw(ctx, t, t0, IM) {
      ctx.save(); ctx.globalAlpha *= .45; ctx.drawImage(IM.foto, -640, -380, 1280, 760); ctx.restore(); motes(ctx, 0, 0, 1700, 900, t, t0);
    } },
    { id: 'efek.wordRain', judul: 'hujan kata mengisi tangki tulisan', draw(ctx, t, t0, IM) {
      const k = .15 + .6 * E.inOutSine(inv(t0, t0 + 2.6, t)); tank(ctx, 0, 70, 760, 760, k, t, t0, { tex: IM.tex });
      wordRain(ctx, 0, -40, 640, 900, t, t0 + .2, { dasar: tankLevel(70, 760, k) });
    } },
    { id: 'efek.imageShatter', judul: 'gambar pecah jadi keping terlempar', hold: 1.0, draw(ctx, t, t0, IM) {
      imageShatter(ctx, 0, 0, 1100, 700, IM.foto2, t, t0 + .6, {});
    } },
    { id: 'bintang.gelembung', judul: '★ Gelembung Pecah: pompa, tegang, pecah', hold: 2.0, draw(ctx, t, t0, IM) {
      const P = [[t0 + .7, .12], [t0 + 1.15, .16], [t0 + 1.55, .2]], T = t0 + 2.2, r = 300 * pumped(t, t0, P), fl = 430;
      if (t < T) bubble(ctx, 0, 40, r, t, { wob: wobble(t, P, [t0 + 1.7, T]), ten: inv(t0 + 1.5, T, t), floor: fl,
        inner: c => { c.save(); c.globalAlpha *= .85; c.drawImage(IM.foto, -r * .9, 40 - r * .55, r * 1.8, r * 1.07); c.restore(); } });
      bubblePop(ctx, 0, 40, r, t - T, { floor: fl });
    } },
    { id: 'bintang.salinan', judul: '★ Salinan Pudar: tiap salinan dari salinan', hold: 2.6, draw(ctx, t, t0, IM) {
      glass(ctx, IM.copies[0], -660, -140, 360, 244, { asli: true, ls: 16, m: 14, a: kq(t, t0, .4) });
      pudar(ctx, IM.copies, 200, 30, 940, 638, t, t0 + .1, { step: .3 });
    } },
    { id: 'bintang.mata', judul: '★ Mata Mesin: scan → huruf bentuk-tinta → token', hold: 2.3, draw(ctx, t, t0, IM) {
      ctx.globalAlpha *= kq(t, t0 - .2, .3); const n = mataMesin(ctx, IM.mata, 0, -20, t, t0 + .1, { tok: IM.tok, langkah: .3 });
      txt(ctx, `TOKEN DIBACA ${n}`, -700, 420, t, t0 + .2, MN(22), { ls: 3, col: ivo(.7) });
    } },
  ],
};
