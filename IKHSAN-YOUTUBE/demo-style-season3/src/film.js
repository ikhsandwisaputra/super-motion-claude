// Lab Season 3: tiga tes di satu timeline (A 0–6 · B 6–10 · C 10–15). Tiap tes = { hits, vo, lines, keys, sfx, load, draw, post?, Kstill? }
// dengan waktu lokal; film.js menggeser ke waktu global, memasang hit transisi (gambar di post, suara lewat cues → tools/mix_lab.py).
import { loadTx, drawTx, react } from './txlib.js';
import { makeA } from './testA.js';
import { makeB } from './testB.js';
import { makeC } from './testC.js';

export const PARTS = [
  { id: 'A', t0: 0, t1: 6, name: 'A · Selam Detail', make: makeA },
  { id: 'B', t0: 6, t1: 10, name: 'B · Foto Jadi Ruang', make: makeB },
  { id: 'C', t0: 10, t1: 15, name: 'C · Aksa (maskot ASCII)', make: makeC }];
const r3 = x => Math.round(x * 1000) / 1000;

export function makeFilm() {
  const P = PARTS.map(p => ({ ...p, m: p.make() }));
  const HITS = P.flatMap(p => (p.m.hits || []).map(([n, a, al = 1, fx = false]) => [n, p.t0 + a, al, fx]));
  const at = t => P.find(p => t >= p.t0 - 1e-9 && t < p.t1 - 1e-9) || P[P.length - 1];
  let TX = null;
  return {
    dur: 15, cuts: P.slice(1).map(p => p.t0), K: 8, grain: .026,
    Kstill: t => { const p = at(t); return p.m.Kstill ? p.m.Kstill(t - p.t0) : 0; },
    async load() { TX = await loadTx('../tx/', [...new Set(HITS.map(h => h[0]))]); for (const p of P) await p.m.load(); },
    draw(ctx, t, i, K) { const p = at(t); p.m.draw(ctx, t - p.t0, i, K); },
    post(o, t, f) {
      const p = at(t); p.m.post?.(o, t - p.t0, f);
      react(o, TX, HITS, t); for (const [n, a, al, fx] of HITS) drawTx(o, TX, n, t, a, al, fx);
    },
    cues() {
      const C = { dur: 15, fps: 30, chapters: [], trans: [], hits: [], vo: [], sfx: [], lines: [], keys: [] };
      for (const p of P) {
        const m = p.m, s = p.t0;
        C.chapters.push({ chap: p.name, start: s }); if (s > 0) C.trans.push({ t: s });
        (m.hits || []).forEach(([name, a, al = 1]) => C.hits.push({ name, t: r3(s + a), al }));
        (m.vo || []).forEach(v => C.vo.push({ ...v, at: r3(s + v.at) }));
        (m.sfx || []).forEach(([t, f, db, d]) => C.sfx.push({ t: r3(s + t), f, db, d: d || 0, label: f.split('/').pop() }));
        (m.lines || []).forEach(l => C.lines.push({ t0: r3(s + l.t0), t1: r3(s + l.t1), text: l.text }));
        (m.keys || []).forEach(([t, label]) => C.keys.push({ t: r3(s + t), label: `${p.id} · ${label}` }));
      }
      return C;
    },
  };
}
