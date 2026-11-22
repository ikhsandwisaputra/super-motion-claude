// Bab 4 · Kalau AI belajar dari AI — "Salinan Pudar" (kaca pindai). Three copier windows (copier.js: W0 opener, W1 copy 10
// again, W2 restore cascade) wrap one depth row of 37 stations (st1.js, st2.js). Every chained "copy" (card, word, recipes,
// idioms) is really computed generation by generation with the Ahpo A05 toner textures — nothing is a pre-baked fade.
import B from './beats.js';
import { W, H, inv, E, timing, makeChapter, loadImg, loadVid, mk } from './kit.js';
import { DW, DH, card, sign, chain, makeCopier, bar } from './copier.js';
import { handCard } from './ui.js';
import { stations1 } from './st1.js';
import { stations2 } from './st2.js';

const SH = '../assets/shared/';
const KUT = {
  nat: 'nature-ai-models-collapse-when-trained-on', mad: 'arxiv-computer-science-machine-learning-3', madn: 'news-breaking-mad-generative-ai-could-break',
  thom: 'arxiv-computer-science-computation-and-3', lbs: 'lowbackgroundsteel-low-background-steel', wf: 'github-sunset-md-2',
  syn: 'nature-scalable-watermarking-for-identifying-2', ger: 'arxiv-computer-science-machine-learning-2', hai: 'hai-research-and-development-the-2026-ai',
  ag: 'nature-solving-olympiad-geometry-without-human', ap: 'nature-olympiad-level-formal-mathematical',
};
const RESEP = [['Kue Rangi', 'kelapa parut · sagu', 'gula merah cair', 'cetakan rangi, arang'], ['Getuk Lindri', 'singkong kukus', 'gula pasir · vanili', 'gilingan daging'],
  ['Kue Lumpur', 'kentang · santan', 'telur · kismis', 'cetakan lumpur'], ['Klepon', 'tepung ketan · pandan', 'gula merah iris', 'kelapa parut kukus'],
  ['Lapis Legit', 'kuning telur 30 butir', 'mentega · spekuk', 'panggang per lapis'], ['Bolu Kukus', 'tepung terigu', 'gula · telur', 'soda kue']];
const IDIOM = [['alon-alon waton kelakon', 0], ['slowly, as long as it gets done', 2], ['perlahan, asalkan selesai', 4], ['pelan asal beres', 7]];

export function makeFilm() {
  const { T: A } = timing(B);
  const X = { IM: {}, GEN: [], TEX: [], WORD: [], REC: [], ID: [], V: {}, SIGC: null, kereta: null };
  const { W0, W1, W2 } = makeCopier(A, X);

  async function load() {
    await Promise.all([new FontFace('Caveat', 'url(../fonts/Caveat.ttf)', { weight: '400 700' }), new FontFace('Reenie Beanie', 'url(../fonts/ReenieBeanie.ttf)')]
      .map(f => f.load().then(ff => document.fonts.add(ff))));
    X.TEX = await Promise.all(['1_toner-speckle-tepi', '2_drum-streak-scanline', '3_noda-toner-abu', '4_butir-toner-halus'].map(n => loadImg(`${SH}ahpo/A05/A05-${n}.png`, 1920)));
    const ims = await Promise.all(Object.entries(KUT).map(async ([k, f]) => [k, await loadImg(`${SH}kutipan/${f}.png`, 1800)])); for (const [k, im] of ims) X.IM[k] = im;
    const vids = ['kereta', 'tenang', 'macro', 'go', 'digital'];
    const vv = await Promise.all(vids.map(n => loadVid(`${SH}vid/`, n))); vids.forEach((n, i) => X.V[n] = vv[i]);
    X.V.buku = await loadVid('../assets/vid/', 'buku'); X.kereta = X.V.kereta;
    const tex = X.TEX;
    { const [C, c] = mk(DW, DH); card(c); X.GEN = chain(C, 10, { tex, smear: [930 + 200, 735 + 95] }); }
    { const [C, c] = mk(DW, DH); sign(c, '#C8F53C'); X.SIGC = C; }
    { const [C, c] = mk(1800, 300); c.fillStyle = '#ECE4D0'; c.fillRect(0, 0, 1800, 300); c.fillStyle = '#16171A'; c.font = '400 250px "League Gothic"'; c.textAlign = 'center';
      c.letterSpacing = '6px'; c.fillText('MODEL COLLAPSE', 900, 252); X.WORD = chain(C, 5, { tex, bs: 2.5, seed: 11 }); }
    X.REC = RESEP.map(([tt, ...ln], i) => chain(handCard(560, 360, [[tt, 64], ...ln.map(s => [s, 40])], { seed: i * 13, ruleY: 100, rule: 60, y0: 76, lh: 60 }), 5, { tex, seed: 20 + i }));
    { const ID0 = handCard(1200, 260, [[IDIOM[0][0], 110]], { align: 'center', ruled: false, y0: 165, seed: 5 }), idc = chain(ID0, 7, { tex, seed: 40 });
      X.ID = IDIOM.map(([s, g], i) => { if (!i) return ID0; const base = handCard(1200, 260, [[s, s.length > 26 ? 84 : 100]], { align: 'center', ruled: false, y0: 160, seed: 5 + i });
        return g ? chain(base, g, { tex, seed: 40 + i })[g] : base; }); void idc; }
  }

  const ST = [...stations1(A, X), ...stations2(A, X)];
  const ch = makeChapter({ B, ST, load, label: 'BAB 4 · KALAU AI BELAJAR DARI AI' });
  const rowDraw = ch.draw;
  // windows W1/W2 enter with a scan-bar wipe: the copier light sweeps down and leaves the glass world behind it
  const wipe = (ctx, t, t0, Wn) => {
    const q = inv(t0, t0 + .45, t);
    if (q >= 1) return Wn(ctx, t);
    rowDraw(ctx, t); const yb = E.inOutCubic(q) * (H + 80) - 40;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, 0, W, Math.max(0, yb)); ctx.clip(); Wn(ctx, t); ctx.restore();
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; bar(ctx, 0, yb, W, 1, Math.sin(Math.PI * q)); ctx.restore();
  };
  const w1 = A.kayak2 - .1, w2 = A.balik - .3;
  ch.draw = (ctx, t) => t < A.nah - .3 ? W0(ctx, t)
    : (t >= w1 && t < A.dampak4 - .3) ? wipe(ctx, t, w1, W1)
    : (t >= w2 && t < A.bahan + .5) ? wipe(ctx, t, w2, W2)
    : rowDraw(ctx, t);
  return ch;
}
