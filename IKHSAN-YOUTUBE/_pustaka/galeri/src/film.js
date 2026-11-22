// Galeri pustaka — every demo is one station of a real depth-row chapter (same camera, DOF, grain and vignette as the films),
// so a component is judged where it will live. Sections are g_<modul>.js files (list in sections.js, rebuilt by pustaka.py index):
//   export default { modul: 'prop', light: false, async load(IM) { IM.foto = dummyFoto(1200, 800, 3); },
//     demos: [{ id: 'prop.gembok', judul: 'gembok garis', hold: 2.4, hit: 'stk1', draw(ctx, t, t0, IM) { … } }] }
// t0 = the demo's entrance (station start + .25 s); hold = seconds after the station start for the contact-sheet frame.
import { setFont, MONO, LIME, IVORY, makeChapter, theme } from './kit.js';
import SECTIONS from './sections.js';

export const SPAN = 3.2;

export async function makeFilm(q) {
  const want = (q.get('g') || '').split(',').filter(Boolean), only = q.get('id');
  const mods = [];
  for (const name of want.length ? want : SECTIONS) mods.push((await import(`./g_${name}.js`)).default);   // ?g= loads any g_<name>.js, listed or not
  if (!mods.length) throw new Error('no galeri section: ' + q.get('g'));
  theme(q.get('light') === '1' || mods.every(m => m.light));
  const IM = {}, demos = [];
  for (const m of mods) for (const d of m.demos) if (!only || d.id.startsWith(only)) demos.push({ ...d, modul: m.modul });
  if (!demos.length) throw new Error('no demo matches id=' + only);
  const V = {}, HITS = [];
  demos.forEach((d, i) => { d.at = i * SPAN; V['d' + i] = d.at; if (d.hit) HITS.push([d.hit, d.at + (d.hitT ?? .25), d.hitA ?? .85]); });   // hitT: hit offset in the demo (brightest frame lands there)
  const B = { V, VOFF: 0, END: demos.length * SPAN, TAIL: .4, HITS };
  const ST = demos.map((d, i) => ({ at: d.at, via: i ? (d.via || 'whip') : undefined, ...(d.station || {}),
    draw: (ctx, t, c) => d.draw(ctx, t, d.at + .25, IM, c), layers: d.layers ? d.layers(IM) : undefined }));
  const cur = t => { let i = 0; while (i < demos.length - 1 && t >= demos[i + 1].at - .3) i++; return demos[i]; };
  const over = (o, t) => {                                   // galeri caption (screen space): id + what it is + where it came from
    const d = cur(t); o.globalAlpha = .92; o.fillStyle = 'rgba(11,12,9,.72)'; o.fillRect(0, 1004, 1920, 76);
    o.fillStyle = LIME; o.fillRect(48, 1034, 12, 12); setFont(o, `700 22px "${MONO}"`, 2); o.fillStyle = IVORY; o.textAlign = 'left';
    o.fillText(d.id, 74, 1048); const w = o.measureText(d.id).width; setFont(o, `400 20px "${MONO}"`, 1); o.globalAlpha = .7;
    o.fillText('· ' + (d.judul || ''), 90 + w, 1048); o.globalAlpha = 1;
  };
  const ch = makeChapter({ B, ST, gate: true, label: 'PUSTAKA · ' + mods.map(m => m.modul.toUpperCase()).join(' + '), over,
    load: async () => { for (const m of mods) if (m.load) await m.load(IM); } });
  window.DEMOS = demos.map(d => ({ id: d.id, judul: d.judul || '', at: d.at, hold: d.at + (d.hold ?? 2.4) }));
  return ch;
}
