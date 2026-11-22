// <Bab> starter (from aset/_template-longform). One depth row of stations; the camera holds on each, then snaps to the next.
// Copy station ideas from ../../_template-longform/contoh/*.film.js (Jarak = Kedalaman, split-flap, subscribe end screen…).
// Rules: no static shot > 4 s (something moves every ≤ 2 s) · evidence readable ≥ 2 s · lime only on the one key word ·
// thousands of primitives → ONE path (onPlane blurs per draw call; 5.427 fillRects took 10 min/frame in v-indo-vs-as).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, ivo, setFont, DISP, SER, MONO, timing, makeChapter, loadImg,
  evid, fall, markLine, srcTag, slab, txt, countTo, fmt, gone } from './kit.js';
import { kq, pop } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};
  async function load() {                                     // screenshots/photos from assets/shared (= project assets/)
    // IM.art = await loadImg('../assets/shared/kutipan/<file>.png', 1800);
  }
  const ST = [
    { at: 0, tag: 'SATU', draw(ctx, t) {                      // S1 · the claim: big number falls in, mono label types on
      fall(ctx, fmt(Math.round(countTo(0, 1931, t, A.satu + .2))), 0, 40, t, A.satu + .2, DSP(300), { align: 'center' });
      txt(ctx, 'LABEL ANGKA · SATUAN', -300, -200, t, A.satu + .5, MN(22), { ls: 4, col: ivo(.7) });
      srcTag(ctx, 'Sumber: lembaga, tahun', -840, 440, t, A.satu + 1.0);
    } },
    { at: A.dua, via: 'whip', tag: 'DUA', draw(ctx, t) {      // S2 · the evidence: article card (evid) or a slab note
      if (IM.art) evid(ctx, IM.art, -500, -300, 1000, t, A.dua + .1);
      slab(ctx, 'CATATAN SINGKAT', -200, 300, t, A.dua + .6);
    } },
    { at: A.tiga, via: 'rise', draw(ctx, t) {                 // S3 · the punchline: one word under the lime marker
      markLine(ctx, 'kalimat dengan', 'KUNCI', 'di tengah', 0, 0, t, A.tiga, A.kunci, SRF(110));
    } },
  ];
  let FULLS;                                                  // full-frame tilted article + lime highlighter (in post)
  return makeChapter({ B, ST, load, label: 'BAB N · JUDUL', full: () => FULLS ??= [
    // { im: IM.art, t0: A.dua - 1.7, t1: A.dua + 2.7, dir: 1, tab: 'media.com', hl: [[.04, .25, .42, .10, A.dua]] },
  ] });
}
