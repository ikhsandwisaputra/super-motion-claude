// Galeri · hit transisi — one demo per hit in _template-longform/tx/tx.json; the hold frame is the hit's brightest frame (lands on hitT).
// In a chapter: beats.js "HITS": [["gr2", "<anchor>", .85]] — the mix places tx/<name>.wav by itself. New hits: cut from aset/_transisi with tools/tx_lib.py.
import { E, inv, ivo, LIME, DSP, SRF, MN, txt } from './kit.js';
import { cover, dummyFoto } from './pustaka/dasar.js';
import { kq } from './draw.js';

const FAM = { stk: ['garis cahaya', 'energi · data mengalir'], cmc: ['komik', 'punchline · kejutan'], ldr: ['film leader', 'babak baru'],
  sh: ['rana kamera', 'jepret bukti'], hw: ['tulisan tangan', 'manusia · karya asli'], gr: ['grunge', 'salinan · kualitas turun'] };
const NAMES = ['stk1', 'stk2', 'stk3', 'stk4', 'cmc1', 'cmc2', 'ldr1', 'shD', 'shE', 'hw1', 'hw2', 'hw3', 'gr1', 'gr2', 'gr3'];
// demo-ids: hit.stk1 hit.stk2 hit.stk3 hit.stk4 hit.cmc1 hit.cmc2 hit.ldr1 hit.shD hit.shE hit.hw1 hit.hw2 hit.hw3 hit.gr1 hit.gr2 hit.gr3
const HIT_T = 1.35;                                           // seconds after the station start: content first, then the hit

export default {
  modul: 'hits',
  async load(IM) { IM.f = [0, 1, 2].map(i => dummyFoto(900, 600, 30 + i * 7)); },
  demos: NAMES.map((n, i) => {
    const [fam, rasa] = FAM[Object.keys(FAM).find(k => n.startsWith(k))];
    return { id: 'hit.' + n, judul: `${fam} · ${rasa}`, hit: n, hitT: HIT_T, hitA: .85, hold: HIT_T, draw(ctx, t, t0, IM) {
      const k = kq(t, t0, .6), push = 1 + .04 * E.inOutCubic(inv(t0, t0 + 2.8, t));
      ctx.save(); ctx.globalAlpha *= k; ctx.scale(push, push);
      cover(ctx, IM.f[i % 3], -760, -300, 700, 470, 14);
      txt(ctx, n, 40, -40, t, t0 + .15, DSP(250), { col: ivo(.96) });
      txt(ctx, fam.toUpperCase(), 48, 70, t, t0 + .3, MN(26), { ls: 4, col: LIME });
      txt(ctx, rasa, 48, 140, t, t0 + .4, SRF(52), { col: ivo(.78) });
      ctx.restore();
    } };
  }),
};
