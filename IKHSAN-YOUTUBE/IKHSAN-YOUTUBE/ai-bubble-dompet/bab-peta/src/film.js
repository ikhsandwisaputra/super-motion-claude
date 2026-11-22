// Bab Peta (VO abd_vo_ahmad_03, 35.3 s). One depth row, seven stations:
// S0 three glass bubbles rise off the mirror floor = the three questions · S1–S3 one bubble per question (soap clip, trading
// clip, wallet) · S4 the 4-route map chip → wallet (preview of signature #2) · S5 "edukasi" disclaimer · S6 Ahpo's empty
// Papan Tersangka: split-flap rows land NYATA / KAMBING / HITAM (filled in Bab 4; the stamp stays hidden until then).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, TILE, ivo, setFont, DISP, SER, MONO, rnd, mk, D2R,
  timing, makeChapter, loadVid, plate, fall, typeOn, markLine, txt } from './kit.js';
import { chip } from './draw.js';
import { bubble, pumped, wobble } from './gelembung.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const FLOOR = 560;                                            // local y of the floor on every station plane

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {};

  async function load() {
    const vb = '../assets/shared/vid/';
    V.sabun = await loadVid(vb, 'sabun'); V.saham = await loadVid(vb, 'saham');
    const ab = '../assets/shared/ahpo/A04/', [bc, bg] = mk(2000, 1125); bg.imageSmoothingQuality = 'high';
    for (const f of ['02_MG_pantulan', '03_MG_bayangan-papan', '04_MG_papan-bingkai-kaki', '05_MG_kartu-1-kosong', '06_MG_kartu-2-kosong', '07_MG_kartu-3-kosong', '08_MG_lampu-baris']) {
      const bm = await createImageBitmap(await (await fetch(`${ab}A04_${f}.png`)).blob()); bg.drawImage(bm, 0, 0, 2000, 1125);
      if (f.startsWith('05')) { const [tc, tg] = mk(255, 250); tg.drawImage(bm, 912, 600, 255, 250, 0, 0, 255, 250); IM.tile = tc; }   // one blank tile face
    }
    IM.board = bc;
  }

  // ── helpers ──────────────────────────────────────────────────────────────────────────────────────────────
  const rise = (t, t0, y0, y1, d = .8) => lerp(y0, y1, spring(Math.max(0, t - t0), .58, d));
  function glass(ctx, cx, cy, r, t, o = {}) {                // bubble + its mirror image in the floor (reflection 15 %)
    bubble(ctx, cx, cy, r, t, { ...o, floor: FLOOR });
    if (cy + r < FLOOR - 400) return;
    ctx.save(); ctx.beginPath(); ctx.rect(cx - r * 1.5, FLOOR, r * 3, r * 2.2); ctx.clip();
    ctx.translate(0, 2 * FLOOR); ctx.scale(1, -1); ctx.globalAlpha *= .15; bubble(ctx, cx, cy, r, t, { wob: o.wob, ten: o.ten }); ctx.restore();
  }
  const clip = (V, gr) => (cx, cy, r, t, t0) => ctx => plate(ctx, V, t, cx, cy, r * 2.1, r * 2.1, 1, { t0, vig: .35, dim: .22, grade: gr });
  function wallet(ctx, w = 240, h = 168, o = {}) {           // line-art wallet, centre origin
    const a0 = ctx.globalAlpha; ctx.lineWidth = 4; ctx.strokeStyle = IVORY;
    ctx.fillStyle = ivo(.12); ctx.beginPath(); ctx.roundRect(-w * .42, -h * .66, w * .5, h * .4, 8); ctx.fill(); ctx.stroke();     // card peeking out
    ctx.fillStyle = o.lime ? LIME : TILE; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 22); ctx.fill(); ctx.strokeStyle = o.lime ? LIME_INK : IVORY; ctx.stroke();
    ctx.beginPath(); ctx.roundRect(w * .12, -h * .2, w * .44, h * .4, 14); ctx.fillStyle = o.lime ? '#B5DE34' : '#20211C'; ctx.fill(); ctx.stroke();
    ctx.fillStyle = o.lime ? LIME_INK : IVORY; ctx.beginPath(); ctx.arc(w * .27, 0, 9, 0, 7); ctx.fill(); ctx.globalAlpha = a0;
  }
  const head = (ctx, n, word, x, t, t0, al = 'left') => {    // "01 · PERTAMA" mono with a lime square
    const k = E.outQuint(inv(t0, t0 + .4, t)); if (k <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * k;
    const x0 = al === 'left' ? x : x - 330; ctx.fillStyle = LIME; ctx.fillRect(x0, -228, 14, 14);
    setFont(ctx, MN(24), 5); ctx.fillStyle = ivo(.8); ctx.textAlign = 'left'; ctx.fillText(`${n} / 03 · ${word}`, x0 + 30, -214); ctx.globalAlpha = a0;
  };

  // ── S4 route map: chip → 4 routes → wallet ─────────────────────────────────────────────────────────────────
  const ROUTES = [['HARGA HP', 'harga', -300], ['BURSA SAHAM', 'bursa', -100], ['PUSAT DATA BATAM', 'pusat', 100], ['STARTUP LOKAL', 'startup', 300]];
  const bez = (u, yo) => { const p0 = [-470, 0], p1 = [-170, yo * 1.25], p2 = [250, yo * 1.25], p3 = [560, 0], m = 1 - u;
    return [0, 1].map(j => m * m * m * p0[j] + 3 * m * m * u * p1[j] + 3 * m * u * u * p2[j] + u * u * u * p3[j]); };
  function routes(ctx, t) {
    const kc = spring(Math.max(0, t - A.ada + .1), .55, .45), arrive = A.lokal + 1.0;
    ctx.save(); ctx.translate(-640, 0); ctx.scale(kc, kc); chip(ctx, 210); ctx.restore();
    setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.6 * clamp(kc)); ctx.textAlign = 'center'; ctx.fillText('CHIP AI', -640, 190);
    txt(ctx, 'EMPAT JALUR KE DOMPET', -330, -420, t, A.empat + .1, MN(26), { ls: 6, col: ivo(.75) });
    ROUTES.forEach(([lab, w, yo], i) => {
      const t0 = A[w] - .12, k = E.outCubic(inv(t0, t0 + .55, t)); if (k <= 0) return;
      const live = t < (ROUTES[i + 1] ? A[ROUTES[i + 1][1]] - .12 : arrive + .6);
      ctx.strokeStyle = ivo(live ? .85 : .45); ctx.lineWidth = live ? 4 : 3; ctx.beginPath();
      for (let s = 0; s <= 48; s++) { const [x, y] = bez(k * s / 48, yo); s ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      const [lx, ly] = bez(.5, yo); txt(ctx, lab, lx - 130, ly - 22, t, t0 + .15, MN(26), { ls: 3, col: live ? IVORY : ivo(.55) });
      for (let q = 0; q < 3; q++) {                            // light pulses ride the drawn route toward the wallet
        const u = ((t - t0 - .4) / 1.6 + q / 3) % 1; if (t - t0 < .4 + q * .53 || u > k) continue;
        const [px, py] = bez(u, yo), g = ctx.createRadialGradient(px, py, 0, px, py, 26);
        g.addColorStop(0, ivo(.95)); g.addColorStop(.25, ivo(.4)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(px - 26, py - 26, 52, 52);
      }
    });
    const kw = spring(Math.max(0, t - A.ada - .2), .55, .5), pw = t > arrive ? .14 * Math.exp(-(t - arrive) / .3) * Math.sin((t - arrive) * 22) : 0;
    ctx.save(); ctx.translate(700, 0); ctx.scale(kw * (1 + pw), kw * (1 + pw)); wallet(ctx, 250, 176, { lime: t > arrive }); ctx.restore();
    setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.6 * clamp(kw)); ctx.textAlign = 'center'; ctx.fillText('DOMPET KITA', 700, 190); ctx.textAlign = 'left';
  }

  // ── S6 Papan Tersangka: Ahpo's A04 board + split-flap letters on its tiles ──────────────────────────────────
  const BS = .6, L = (px, py) => [(px - 2000) * BS, FLOOR + (py - 1890) * BS];          // plate px → local
  const TW = 254.67, ROWY = [725, 1045, 1365], FL = .065, CH = 'ABCDEFGHIJKLMNOPRSTUVWY0123456789?';
  const ROWS = [['NYATA', 'nyata'], ['KAMBING', 'kambing'], ['HITAM', 'hitam']];
  const ch = k => CH[Math.floor(rnd(k) * CH.length)];
  function tileEvents(r, i) {                                 // [start, end, final]: an idle wave at the board's arrival, then the word
    const ev = [[A.tujuan + .05 + r * .08 + i * .03, A.tujuan + .55 + r * .1 + i * .035, ' ']], [word, w] = ROWS[r];
    if (i < word.length) ev.push([A[w] - .32 + i * .015, A[w] - .05 + i * .045, word[i]]);
    return ev;
  }
  function tileState(ev, t, sd) {
    let j = -1; for (let q = 0; q < ev.length; q++) if (t >= ev[q][0]) j = q;
    if (j < 0) return { cur: ' ', prev: ' ', p: 1 };
    const [a, b, fin] = ev[j], n = Math.max(2, Math.round((b - a) / FL)), k = Math.floor((t - a) / FL), before = j ? ev[j - 1][2] : ' ';
    if (k >= n) return { cur: fin, prev: fin, p: 1 };
    return { cur: k === n - 1 ? fin : ch(sd + k), prev: k ? ch(sd + k - 1) : before, p: (t - a) / FL - k };
  }
  function face(ctx, c, x, y, w, h, half) {                  // tile face + one half of a character (half: -1 top, 1 bottom, 0 full)
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, half > 0 ? y : y - h / 2, w, half ? h / 2 : h); ctx.clip();
    ctx.drawImage(IM.tile, x - w / 2, y - h / 2, w, h);
    if (c !== ' ') { setFont(ctx, DSP(h * .78)); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText(c, x, y + h * .28); }
    ctx.restore();
  }
  function flapTile(ctx, s, x, y, w, h) {
    if (s.p >= 1) { if (s.cur !== ' ') face(ctx, s.cur, x, y, w, h, 0); return; }
    face(ctx, s.cur, x, y, w, h, -1); face(ctx, s.prev, x, y, w, h, 1);
    ctx.save(); ctx.translate(x, y);
    if (s.p < .5) { ctx.scale(1, 1 - 2 * s.p); face(ctx, s.prev, 0, 0, w, h, -1); }          // old top half falls…
    else { ctx.scale(1, 2 * s.p - 1); face(ctx, s.cur, 0, 0, w, h, 1); }                     // …new bottom half lands
    ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(x - w / 2, y - 1.5, w, 3);
  }
  function board(ctx, t) {
    const fa = clamp((t - A.tujuan + .4) / .3); if (fa <= 0) return; ctx.globalAlpha = fa;   // hidden behind S4/S5: its lime strip would be a 2nd accent
    const [bx, by] = L(0, 0); ctx.drawImage(IM.board, bx, by, 4000 * BS, 2250 * BS);
    const [hx, hy] = L(790, 470); typeOn(ctx, 'PAPAN TERSANGKA', hx, hy, t, A.tujuan + .35, MN(40), { ls: 6, cps: 22, col: LIME_INK });
    ROWY.forEach((py, r) => {
      for (let i = 0; i < 9; i++) { const [x, y] = L(912 + TW * (i + .5), py); flapTile(ctx, tileState(tileEvents(r, i), t, r * 97 + i * 13), x, y, TW * BS - 2, 250 * BS - 2); }
      const on = clamp((t - A[ROWS[r][1]]) / .25); if (on <= 0) return;                          // row lamp glows when its word lands
      const [lx, ly] = L(3266, py), g = ctx.createRadialGradient(lx, ly, 0, lx, ly, 46);
      g.addColorStop(0, `rgba(241,239,230,${.9 * on})`); g.addColorStop(.3, `rgba(241,239,230,${.35 * on})`); g.addColorStop(1, 'rgba(241,239,230,0)'); ctx.fillStyle = g; ctx.fillRect(lx - 46, ly - 46, 92, 92);
    });
  }

  // ── stations ─────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, dist: [1640, 1480], draw(ctx, t) {              // S0 · three bubbles rise off the mirror floor; numbers land on "tiga"
      txt(ctx, 'DI VIDEO INI · TIGA PERTANYAAN', -300, -380, t, .5, MN(24), { ls: 6, col: ivo(.7) });
      [-500, 0, 500].forEach((x, i) => {
        const t0 = .2 + i * .16, r = 200 * (.4 + .6 * spring(Math.max(0, t - t0), .6, .7)), cy = rise(t, t0, FLOOR + 220, -20 - 30 * Math.sin(t * 1.3 + i * 2.1) * .5);
        glass(ctx, x, cy, r, t + i * 1.7, { wob: .02 * Math.exp(-Math.max(0, t - t0) / .5) + wobble(t, [[A.tiga + i * .12]]) * .6, seed: i * 2 });
        const s = t - A.tiga - i * .12; if (s <= 0) return; const k = spring(s, .45, .35);
        ctx.save(); ctx.translate(x, cy + 50); ctx.scale(k, k); ctx.globalAlpha = clamp(s / .08); setFont(ctx, DSP(170)); ctx.fillStyle = IVORY; ctx.textAlign = 'center';
        ctx.fillText(String(i + 1), 0, 0); ctx.restore(); ctx.textAlign = 'left';
      });
    } },
    { at: A.pertama, via: 'push', draw(ctx, t) {             // S1 · "gelembung itu apa?" soap bubbles seen through the glass
      const m = pumped(t, A.pertama - .2, [[A.gelembung, .12]]), r = 300 * m, cy = -30;
      glass(ctx, -430, cy, r, t, { wob: wobble(t, [[A.gelembung]]), inner: clip(V.sabun, 'saturate(.55) contrast(1.1) brightness(.85)')(-430, cy, r, t, A.pertama - .2) });
      head(ctx, '01', 'PERTAMA', -20, t, A.pertama + .1);
      fall(ctx, 'GELEMBUNG', -24, 0, t, A.gelembung - .2, DSP(190));
      txt(ctx, 'itu sebenarnya apa, sih?', -16, 100, t, A.itu, SRF(64));
    } },
    { at: A.kedua, via: 'whip', draw(ctx, t) {               // S2 · "kenapa AI dicurigai?" the bubble pumps on "menggelembung"
      const m = pumped(t, A.kedua - .25, [[A.gembung, .24]]), r = 280 * m, cy = -30;
      glass(ctx, 450, cy, r, t + 3, { wob: wobble(t, [[A.gembung]]), ten: .4 * inv(A.gembung, A.gembung + .6, t),
        inner: clip(V.saham, 'saturate(.3) contrast(1.15) brightness(.78)')(450, cy, r, t, A.kedua - .25) });
      head(ctx, '02', 'KEDUA', -860, t, A.kedua + .1);
      txt(ctx, 'kenapa bisnis', -860, -110, t, A.kedua + .35, SRF(64));
      fall(ctx, 'AI DICURIGAI', -864, 70, t, A.curiga - .1, DSP(190));
      txt(ctx, 'LAGI MENGGELEMBUNG?', -858, 150, t, A.gembung - .05, MN(30), { ls: 6, col: ivo(.8) });
    } },
    { at: A.ketiga, via: 'rise', draw(ctx, t) {              // S3 · "jalur ke dompet" the wallet floats inside the third bubble
      const m = pumped(t, A.ketiga - .3), r = 270 * m, cy = -30, kw = spring(Math.max(0, t - A.dompet), .5, .35);
      glass(ctx, -440, cy, r, t + 6, { wob: wobble(t, [[A.dompet]]), inner: c => { c.save(); c.translate(-440, cy + 8 * Math.sin(t * 2)); c.rotate(-6 * D2R); const s = m * (1 + .12 * (kw > 0 ? Math.exp(-(t - A.dompet) / .3) : 0)); c.scale(s, s); wallet(c); c.restore(); } });
      head(ctx, '03', 'KETIGA', -20, t, A.ketiga + .1);
      txt(ctx, 'lewat jalur mana dampaknya', -16, -110, t, A.jalur - .15, SRF(60));
      markLine(ctx, 'nyampe ke ', 'DOMPET', ' kita', -20, 40, t, A.jalur + .6, A.dompet, DSP(122), { align: 'left' });
    } },
    { at: A.ada, via: 'truck', dist: [1560, 1480], draw: routes },  // S4 · route map (signature #2 preview)
    { at: A.biar, via: 'push', draw(ctx, t) {                // S5 · disclaimer: one lime word, the trading line gets struck
      const k = inv(A.biar, A.biar + 3.2, t); ctx.strokeStyle = ivo(.22); ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 0; i <= 80 * k; i++) { const x = -820 + i * 20.5, y = 300 - i * 1.6 - 70 * Math.sin(i * .37) * rnd(i) - 40 * rnd(i + 5); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      const ks = E.snap(inv(A.saham2, A.saham2 + .25, t)); if (ks > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-840, 330); ctx.lineTo(lerp(-840, 840, ks), 330 - 230 * ks); ctx.stroke(); }
      markLine(ctx, 'ini murni video ', 'EDUKASI', '', 0, -60, t, A.biar + .15, A.edukasi, SRF(112));
      typeOn(ctx, 'BUKAN AJAKAN BELI ATAU JUAL SAHAM APA PUN', -462, 70, t, A.bukan - .05, MN(26), { ls: 2, cps: 30, col: ivo(.8) });
    } },
    { at: A.tujuan, via: 'whip', dist: [1560, 1400], py: -520, draw: board },   // S6 · Papan Tersangka, still empty
  ];
  const ch0 = makeChapter({ B, ST, load, label: 'PETA · TIGA PERTANYAAN' });
  return ch0;
}
