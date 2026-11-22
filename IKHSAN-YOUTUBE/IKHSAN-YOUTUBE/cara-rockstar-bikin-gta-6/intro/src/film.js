// Pengantar "SATU BARIS" — Relentless non-conformist. Narrated opening (template per episode). v2, 2026-11-13.
// One idea: everything stands in ONE ROW IN DEPTH and the camera travels along it. No film/projector vocabulary
// (Ikhsan: "terlalu jadul, terlalu generik"); the depth-row zoom-back he loved is the language of the whole piece.
// 1 Hook      : the camera snaps BACKWARD along the row; each cut-out sweeps in from its side (right → left → right)
//               blurred → sharp while the earlier ones recede and blur.
// 2 AI        : the 4th thing in the row is not an object: a lime plane sweeps in from the left and takes the frame.
// 3 Questions : the camera turns FORWARD and flies through three type planes (light world).
// 4 Channel   : a dark wipe from the right, the whole row whips past again and brakes on the wordmark.
// 5 Disclaimer: the wordmark docks in the corner; each source arrives from the lens, from its side, blurred → sharp.
// 6 Title     : dive into the lime "HIBURAN." slab → light page, the title lands; dive into the lime "AI" → episode.
// Lime is the door between the dark row and the light world. Every beat sits on a spoken word: src/timeline.json.
// Per episode: EP below + build/vo.txt. v1 (film gate) is archived in src/film_v1_gate.js.
import { W, H, FPS, clamp, inv, lerp, E } from './engine.js';
import { CFG, COL, DISP, SER, MONO, D2R, rnd, noise1, setFont, mk } from './lib.js';
import { loadTx, drawTx } from './txlib.js';

export const EP = {   // cara-rockstar-bikin-gta-6: leadT/tailT per item come from place.py (base: ai-data-habis intro)
  hook: [
    { img: 'malam', side: 1, h: 400, grain: .2, doc: true, lead: 'Satu game, internet dunia…', hero: 'KEWALAHAN.', lit: ['#FFFFFF', '#8A8A82'] },
    { img: 'deadline', side: -1, h: 172, grain: .22, doc: true, lead: 'Sehari, mengalahkan film', hero: 'HOLLYWOOD', tail: '…yang terbesar.', lit: ['#FFFFFF', '#8A867C'] },
    { img: 'duo', side: 1, h: 470, grain: .26, label: ['KATA', 'ORANG TUA'], lead: 'game itu…', hero: 'CUMA MAINAN', tail: '…pengisi waktu luang.', lit: ['#FFFFFF', '#A39E92'] },
  ],
  twist: ['Tapi,', '19 Nov 2026…'], twistHero: 'GTA 6',
  q: [{ lead: 'Belum genap', hero: 'SEHARI,' }, { lead: 'Sensor Tower mencatat', hero: 'SULIT DIPERCAYA' },
    { lead: ['Game ini', 'ditaksir meraup'], mid: 'US$2,36 MILIAR', hero: '24 JAM.', hi: 0 }],
  dLead: ['Angka', 'di', 'video', 'ini', 'dari', 'sumber', 'resmi:'],
  src: [['TAKE-TWO · SENSOR TOWER', 'DIGITAL FOUNDRY'], ['VARIETY · DEADLINE', 'FORBES · BBC NEWS'], ['KOMPAS.COM', 'STREAMS CHARTS']], dTail: 'Ini video', dHero: 'EDUKASI.',
  lead: ['Cara Rockstar', 'membangun'], midHi: 'MESIN', mid: ' UANG', hero: 'BERNAMA GTA 6', heroSplit: 99, leadAbove: true, no: '',
  foot: 'Sumber: Take-Two · Sensor Tower · Deadline · Variety · BBC · Kompas · dll. · video edukasi',
};
const ROOM = '#0B0C09', IVORY = '#F1EFE6', INK = '#11120E', BL = [0, 4, 9, 17, 30, 50], ZD = 0.72, ZF = 6, VY0 = 520, WM = 4;

// ── type helpers ────────────────────────────────────────────────────────────────────────────────────
function fitDisp(ctx, str, maxW, maxSize) {
  setFont(ctx, `400 100px "${DISP}"`); const size = Math.min(maxSize, maxW / ctx.measureText(str).width * 100);
  setFont(ctx, `400 ${size}px "${DISP}"`);
  return { str, size, w: ctx.measureText(str).width, cap: ctx.measureText('H').actualBoundingBoxAscent,
    xs: Array.from(str, (_, i) => ctx.measureText(str.slice(0, i)).width), cw: Array.from(str, ch => ctx.measureText(ch).width) };
}
function fall(ctx, L, x, base, t, start, col) {        // letters fall in from the lens
  setFont(ctx, `400 ${L.size}px "${DISP}"`);
  for (let i = 0; i < L.str.length; i++) {
    if (L.str[i] === ' ') continue;
    const si = t - start(i); if (si <= 0) continue;
    const kk = E.expo16(si / .2), sc = lerp(2.2, 1, kk), cx = x + L.xs[i] + L.cw[i] / 2, cy = base - L.cap / 2;
    ctx.save(); ctx.translate(cx, cy + (1 - kk) * 60); ctx.scale(sc, sc); ctx.globalAlpha *= inv(0, .04, si);
    ctx.fillStyle = typeof col === 'function' ? col(i) : col; ctx.fillText(L.str[i], -L.cw[i] / 2, L.cap / 2); ctx.restore();
  }
}
function flyWord(ctx, str, x, base, L, t, ts, side, col) {   // a whole word arrives from the lens, from its side, blurred → sharp
  const s = t - ts; if (s <= 0) return;
  setFont(ctx, `400 ${L.size}px "${DISP}"`); const w = ctx.measureText(str).width, k = E.outQuart(s / .42), sc = lerp(2.7, 1, k);
  ctx.save(); ctx.translate(x + w / 2 + side * (1 - k) * 640, base - L.cap / 2); ctx.scale(sc, sc);
  ctx.globalAlpha *= inv(0, .06, s); const b = (1 - k) * 34; if (b > .7) ctx.filter = `blur(${b.toFixed(1)}px)`;
  ctx.fillStyle = col; ctx.fillText(str, -w / 2, L.cap / 2); ctx.restore();
}
function ghost(ctx, L, x, base, k, t, start, col) {     // outline of the word to come; each letter is filled when it is spoken
  if (k <= 0) return; setFont(ctx, `400 ${L.size}px "${DISP}"`);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 12, base - L.cap - 24, (L.w + 24) * k, L.cap + 48); ctx.clip();
  ctx.lineWidth = 2.5; ctx.strokeStyle = col;
  for (let i = 0; i < L.str.length; i++) if (L.str[i] !== ' ' && t < start(i)) ctx.strokeText(L.str[i], x + L.xs[i], base);
  ctx.restore();
}
function wipe(ctx, str, x, base, k, size, align = 'left') {      // font set by the caller
  if (k <= 0) return; const w = ctx.measureText(str).width, x0 = align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, base - size * 1.15, (w + 46) * k, size * 1.7); ctx.clip();
  ctx.fillText(str, x0, base + (1 - k) * 16); ctx.restore();
}
function wipeWords(ctx, words, starts, x, base, size, t, align = 'left') {   // the reveal follows the narrator word by word
  const str = words.join(' '), full = ctx.measureText(str).width, x0 = align === 'right' ? x - full : align === 'center' ? x - full / 2 : x;
  let acc = 0, rev = 0;
  words.forEach((_, j) => { const end = ctx.measureText(words.slice(0, j + 1).join(' ')).width; rev += (end - acc) * E.outCubic(inv(starts[j], starts[j] + .2, t)); acc = end; });
  if (rev <= 0) return;
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, base - size * 1.15, rev + 24, size * 1.7); ctx.clip(); ctx.fillText(str, x0, base); ctx.restore();
}
const hitOf = (t, list) => { let h = 0; for (const [th, amp] of list) if (t >= th) h = Math.max(h, amp * Math.exp(-(t - th) * 15)); return h; };
const lightBg = ctx => { const gr = ctx.createRadialGradient(960, 480, 80, 960, 540, 1300); gr.addColorStop(0, '#FAFAF6'); gr.addColorStop(.6, '#F0EFE9'); gr.addColorStop(1, '#DDDCD3'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); };
function wipeIn(ctx, edge, fromLeft, inner) {            // a slanted edge crosses the frame; inner() is the world behind it
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.save(); ctx.beginPath();
  if (fromLeft) { ctx.moveTo(-10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(-10, H + 10); }
  else { ctx.moveTo(W + 10, -10); ctx.lineTo(edge + 150, -10); ctx.lineTo(edge - 150, H + 10); ctx.lineTo(W + 10, H + 10); }
  ctx.closePath(); ctx.clip(); inner(); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export function makeFilm() {
  const OV = { lamp: 39, wash: 34 }, ovImg = {}, txImg = {}, NZ = [];
  let TXM = {}, LIB = { meta: {}, img: {} };
  let TL, A, bokeh, fleck, sprites, glintC, gg, CUES, CHAPS;
  const [small, sctx] = mk(480, 270), [wmC, wmG] = mk(1600, 640);
  const HL = [], QL = {}, PL = {};
  const scene = { dur: 1, cuts: [], K: 8, grain: 0.035, load, post, draw, cues: () => ({ cues: CUES, chapters: CHAPS }) };

  async function sprite(e) {
    const bm = await createImageBitmap(await (await fetch(`../assets/hook/${e.img}.png`)).blob());
    const P = 130, w = bm.width + 2 * P, h = bm.height + 2 * P, [base, g] = mk(w, h), [sh, q] = mk(w, h);
    if (e.doc) g.filter = 'saturate(.82) contrast(1.12) brightness(.97)';
    g.drawImage(bm, P, P); g.filter = 'none';
    const gr = q.createLinearGradient(e.side > 0 ? P : w - P, 0, e.side > 0 ? w - P : P, h * .3);      // lit from the centre of the room
    gr.addColorStop(0, e.lit[0]); gr.addColorStop(1, e.lit[1]); q.fillStyle = gr; q.fillRect(0, 0, w, h);
    q.globalCompositeOperation = 'destination-in'; q.drawImage(base, 0, 0);
    g.globalCompositeOperation = 'multiply'; g.drawImage(sh, 0, 0); g.globalCompositeOperation = 'source-over';
    const lv = BL.map((b, i) => { if (!i) return base; const [c, x] = mk(w >> 1, h >> 1); x.filter = `blur(${b / 2}px)`; x.drawImage(base, 0, 0, c.width, c.height); return c; });
    return { lv, w, h, iw: bm.width, ih: bm.height };
  }
  async function load() {
    const j = async u => (await fetch(u)).json();
    TL = await j('./timeline.json'); A = TL.A;
    CUES = await j('../build/cues.json').catch(() => ({})); CHAPS = await j('../build/chapters.json').catch(() => []);
    scene.dur = A.end;
    for (const [name, n] of Object.entries(OV))          // the _transisi light leaks, used as clean neutral light (no film colour)
      ovImg[name] = await Promise.all(Array.from({ length: n }, async (_, i) => {
        const bm = await createImageBitmap(await (await fetch(`../assets/ov/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`)).blob());
        const [c, g] = mk(bm.width, bm.height); g.filter = 'grayscale(1) contrast(1.15)'; g.drawImage(bm, 0, 0); return c;
      }));
    const used = new Set(HITS().map(h => h[0]));          // load only the hits this cut uses
    LIB = await loadTx('../assets/txlib/', [...used].filter(nm => /^(stk|cmc|ldr)/.test(nm)));   // shared Think Make Push library
    TXM = Object.fromEntries(Object.entries(await j('../assets/tx/tx.json')).filter(([nm]) => used.has(nm)));                // _transisi hits, full colour (blacks crushed), landed on cuts
    for (const [name, m] of Object.entries(TXM))
      txImg[name] = await Promise.all(Array.from({ length: m.n }, async (_, i) => {
        const bm = await createImageBitmap(await (await fetch(`../assets/tx/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`)).blob());
        const [c, g] = mk(960, 540); g.filter = 'contrast(1.28) brightness(.94)'; g.drawImage(bm, 0, 0, 960, 540); return c;
      }));
    for (let k = 0; k < 4; k++) {                            // film grain tiles
      const [c, g] = mk(256, 256), id = g.createImageData(256, 256);
      for (let q = 0; q < id.data.length; q += 4) { const v = 128 + (Math.random() + Math.random() + Math.random() - 1.5) * 120; id.data[q] = id.data[q + 1] = id.data[q + 2] = v; id.data[q + 3] = 255; }
      g.putImageData(id, 0, 0); NZ.push(c);
    }
    sprites = []; for (const e of EP.hook) sprites.push(await sprite(e));
    [glintC, gg] = mk(sprites[2].w, sprites[2].h);
    let g, gr; [bokeh, g] = mk(96, 96); gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
    gr.addColorStop(0, 'rgba(244,246,236,.8)'); gr.addColorStop(.72, 'rgba(236,240,226,.62)'); gr.addColorStop(.86, 'rgba(230,236,216,.28)'); gr.addColorStop(1, 'rgba(230,236,216,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
    [fleck, g] = mk(96, 96); gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
    gr.addColorStop(0, 'rgba(17,18,14,.8)'); gr.addColorStop(.6, 'rgba(17,18,14,.45)'); gr.addColorStop(1, 'rgba(17,18,14,0)'); g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
  }
  function ov(ctx, name, t, start, alpha) {
    const i = Math.floor((t - start) * 30); if (i < 0 || i >= OV[name] || alpha <= 0) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = alpha;
    ctx.drawImage(ovImg[name][i], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  // ── the row (dark world): hook, channel, disclaimer ───────────────────────────────────────────────
  function rowC(t) {
    if (t < A.cut1) {
      const L = [A.lock1, A.lock2, A.lock3]; let c = -1;
      for (let i = 0; i < 3; i++) {
        c = lerp(c, i, E.outQuart(inv(L[i] - .34, L[i] + .22, t)));
        if (t > L[i]) c += .03 * (Math.min(t, i < 2 ? L[i + 1] - .34 : 1e9) - L[i]);      // never static: slow pull-back in every hold
      }
      return c - .07 * E.inOutSine(inv(A.ada1 - .1, A.ai - .14, t)) + .3 * E.outQuart(inv(A.ai - .14, A.ai + .12, t));   // lean in, then the kick
    }
    let c = lerp(-.7, WM, E.snap(inv(A.back - .14, A.lockW, t)));                           // the row whips past, brake on the wordmark
    if (t > A.lockW) { const s = t - A.lockW; c += .07 * Math.exp(-s * 8) * Math.sin(s * 20) + .022 * Math.min(s, A.cut3 - A.lockW); }
    return c + .9 * E.outQuart(inv(A.cut3 - .04, A.cut3 + .5, t)) + .012 * Math.max(0, t - A.cut3);
  }
  const levelOf = b => { if (b <= 0) return 0; for (let i = 1; i < BL.length; i++) if (b <= BL[i]) return i - 1 + (b - BL[i - 1]) / (BL[i] - BL[i - 1]); return BL.length - 1; };
  function drawAsset(ctx, i, d, t, VX, VY, lampK, f, dim) {
    if (d > .92 || d < -6) return;
    const sp = sprites[i], e = EP.hook[i], s = 1 / (1 - ZD * d), k = e.h / sp.ih * s;
    const blurS = d > 0 ? 84 * Math.max(0, d - .03) : 15 * Math.max(0, -d - .22), lvF = levelOf(blurS / k);
    const st = [A.strike1, A.strike2][i], off = st ? E.outCubic(inv(st, st + .3, t)) : 0;
    let a = inv(.92, .55, d) * lampK * (1 - .4 * off) * dim;
    if (d < 0) a *= lerp(1, .42, inv(.22, 1.2, -d)) * lerp(1, .6, inv(1.2, 2.2, -d));
    const x = VX + s * e.side * 450, y = VY + s * (20 + 6 * Math.sin(t * .9 + i * 2)), foc = inv(.6, .12, Math.abs(d));
    if (foc > 0) {                                             // soft key light behind the one in focus
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.globalCompositeOperation = 'screen';
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 520 * s); gr.addColorStop(0, `rgba(226,232,212,${.15 * foc * lampK * (1 - .5 * off) * dim})`); gr.addColorStop(1, 'rgba(226,232,212,0)');
      ctx.fillStyle = gr; ctx.fillRect(-540 * s, -540 * s, 1080 * s, 1080 * s); ctx.globalCompositeOperation = 'source-over';
    }
    ctx.setTransform(1, 0, 0, 1, x, y + (e.h / 2 + 30) * s); ctx.scale(1, .16);                 // contact shadow on the floor
    let gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 300 * s); gr.addColorStop(0, `rgba(0,0,0,${.55 * a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr; ctx.fillRect(-300 * s, -300 * s, 600 * s, 600 * s);
    const wf = Math.floor(t * 12), wx = e.doc ? (rnd(wf * 3.1 + i) - .5) * 3 : 0, wy = e.doc ? (rnd(wf * 5.7 + i) - .5) * 2.4 : 0;   // gate weave, 12 fps steps
    ctx.setTransform(1, 0, 0, 1, x + wx, y + wy); ctx.rotate((e.side * 5 * d + 1.2 * Math.sin(t * .7 + i)) * D2R); ctx.scale(k, k);
    const l0 = Math.floor(lvF), l1 = Math.min(BL.length - 1, l0 + 1), fr = lvF - l0;
    ctx.globalAlpha = a; ctx.drawImage(sp.lv[l0], -sp.w / 2, -sp.h / 2, sp.w, sp.h);
    if (fr > .02 && l1 !== l0) { ctx.globalAlpha = a * fr; ctx.drawImage(sp.lv[l1], -sp.w / 2, -sp.h / 2, sp.w, sp.h); }
    if (e.grain && a > .02) {                                  // documentary texture: halation, grain, gate vignette
      ctx.save(); ctx.beginPath(); ctx.rect(-sp.iw / 2, -sp.ih / 2, sp.iw, sp.ih); ctx.clip();
      if (e.doc) { ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = a * .22; ctx.drawImage(sp.lv[3], -sp.w / 2, -sp.h / 2, sp.w, sp.h); }
      ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = a * e.grain;
      const nz = NZ[f % 4], ox = rnd(f * 1.7) * 256, oy = rnd(f * 2.3) * 256, gs = 1.6 / k;    // grain ~1.6 px on screen
      ctx.save(); ctx.translate(-sp.iw / 2 - ox * gs, -sp.ih / 2 - oy * gs); ctx.scale(gs, gs);
      ctx.fillStyle = ctx.createPattern(nz, 'repeat'); ctx.fillRect(0, 0, sp.iw / gs + 512, sp.ih / gs + 512); ctx.restore();
      if (e.doc) {
        ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a;
        const vg = ctx.createRadialGradient(0, 0, sp.ih * .35, 0, 0, sp.iw * .62); vg.addColorStop(0, 'rgba(255,255,255,1)'); vg.addColorStop(1, 'rgba(70,66,60,1)');
        ctx.fillStyle = vg; ctx.fillRect(-sp.iw / 2, -sp.ih / 2, sp.iw, sp.ih);
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (EP.hook[i].glow && off < 1 && d > -.6) {                       // the filament is on until the word is struck
      const lit = lampK * (1 - off) * (t > A.strike1 ? .55 + .45 * rnd(f * 1.3) : .92 + .08 * noise1(t * 30)) * inv(.6, .2, Math.abs(d));
      const fx = (.65 - .5) * sp.iw, fy = (.54 - .5) * sp.ih; gr = ctx.createRadialGradient(fx, fy, 0, fx, fy, 480);
      gr.addColorStop(0, `rgba(255,244,214,${.95 * lit})`); gr.addColorStop(.28, `rgba(255,226,170,${.34 * lit})`); gr.addColorStop(1, 'rgba(255,220,160,0)');
      ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = gr; ctx.fillRect(fx - 480, fy - 480, 960, 960); ctx.globalCompositeOperation = 'source-over';
    }
    const gk = inv(A.diasah + .05, A.diasah + .6, t);
    if (i === 2 && gk > 0 && gk < 1) {                         // "diasah": a glint runs down the edge
      gg.setTransform(1, 0, 0, 1, 0, 0); gg.globalCompositeOperation = 'source-over'; gg.clearRect(0, 0, sp.w, sp.h);
      gg.translate(sp.w / 2, sp.h * lerp(-.1, 1.1, E.inOutCubic(gk))); gg.rotate(-24 * D2R);
      gr = gg.createLinearGradient(0, -100, 0, 100); gr.addColorStop(0, 'rgba(255,255,244,0)'); gr.addColorStop(.5, 'rgba(255,255,244,.9)'); gr.addColorStop(1, 'rgba(255,255,244,0)');
      gg.fillStyle = gr; gg.fillRect(-sp.w, -100, 2 * sp.w, 200);
      gg.setTransform(1, 0, 0, 1, 0, 0); gg.globalCompositeOperation = 'destination-in'; gg.drawImage(sp.lv[0], 0, 0);
      ctx.globalCompositeOperation = 'screen'; ctx.drawImage(glintC, -sp.w / 2, -sp.h / 2); ctx.globalCompositeOperation = 'source-over';
    }
    if (foc > 0) {                                             // station index on the floor line
      ctx.setTransform(s, 0, 0, s, x, y); ctx.globalAlpha = .7 * foc * a; ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
      setFont(ctx, `700 22px "${MONO}"`, 3); ctx.fillText(`0${i + 1}`, 0, e.h / 2 + 86); ctx.fillRect(-18, e.h / 2 + 100, 36, 2); ctx.textAlign = 'left'; ctx.globalAlpha = 1;
    }
  }
  function hookType(ctx, t, VX, VY) {
    const Ls = [A.lock1, A.lock2, A.lock3], heroT = [A.hero1, A.hero2, A.batu], strikeT = [A.strike1, A.strike2, null];
    EP.hook.forEach((e, i) => {
      const tOut = i < 2 ? Ls[i + 1] - .34 : A.jam, out = inv(tOut, tOut + .2, t);
      if (t < Ls[i] - .05 || out >= 1) return;
      const L = HL[i] || (HL[i] = fitDisp(ctx, e.hero, 800, i < 2 ? 400 : 440));
      const sT = lerp(1, .8, E.inCubic(out)), left = e.side > 0, xa = left ? 170 : 1750;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(VX, VY); ctx.scale(sT, sT); ctx.translate(-VX, -VY);
      ctx.globalAlpha = 1 - out; ctx.fillStyle = IVORY; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      const top = i < 2 ? 490 : 460, base = top + L.cap, hx = left ? xa : xa - L.w;
      if (e.label) {
        setFont(ctx, `700 42px "${MONO}"`, 4); let x = xa; ctx.save(); ctx.fillStyle = 'rgba(241,239,230,.82)';
        e.label.forEach((wd, j) => { const k = E.outCubic(inv(A.lab[j], A.lab[j] + .18, t)); if (k > 0) { ctx.globalAlpha = (1 - out) * k; ctx.fillText(wd, x + (1 - k) * 14, top - 140); } x += ctx.measureText(wd + ' ').width; });
        ctx.restore();
      }
      const ls = i < 2 ? 78 : 96, tl = A.leadT ? A.leadT[i] : i < 2 ? Ls[i] + .02 : A.cuma;
      setFont(ctx, `italic 380 ${ls}px "${SER}"`); wipe(ctx, e.lead, xa, top - 40, E.outQuint(inv(tl, tl + .4, t)), ls, left ? 'left' : 'right');
      const struck = strikeT[i] ? E.snap(inv(strikeT[i], strikeT[i] + .16, t)) : 0;
      ctx.save(); ctx.globalAlpha *= 1 - .5 * struck; fall(ctx, L, hx, base, t, j => heroT[i] + j * .022, IVORY); ctx.restore();
      if (struck > 0) { ctx.save(); ctx.translate(hx + L.w / 2, base - L.cap * .47); ctx.rotate(-2.5 * D2R); ctx.fillStyle = COL.lime; ctx.fillRect(-L.w / 2 - 26, -L.size * .055, (L.w + 52) * struck, L.size * .11); ctx.restore(); }
      if (e.tail) { const tt = A.tailT ? A.tailT[i] : A.diasah; setFont(ctx, `italic 380 84px "${SER}"`); ctx.fillStyle = IVORY; wipe(ctx, e.tail, xa, base + 104, E.outQuint(inv(tt, tt + .4, t)), 84, left ? 'left' : 'right'); }
    });
    if (t >= A.jam) {                                           // "Terus tiba-tiba…"
      ctx.setTransform(1, 0, 0, 1, VX - W / 2, VY - VY0); ctx.globalAlpha = 1; ctx.fillStyle = IVORY; setFont(ctx, `italic 380 124px "${SER}"`);
      wipeWords(ctx, EP.twist, [A.jam, A.tiba], 170, 600, 124, t);
    }
    ctx.globalAlpha = 1;
  }
  function wmArt(g, t) {                                        // the wordmark, 1600×640, transparent
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 1600, 640);
    const L = PL.wm || (PL.wm = fitDisp(g, CFG.channel[0], 1500, 900)), base = 30 + L.cap;
    g.fillStyle = IVORY; g.textBaseline = 'alphabetic'; g.textAlign = 'left'; setFont(g, `400 ${L.size}px "${DISP}"`); g.fillText(CFG.channel[0], 50, base);
    setFont(g, `italic 420 150px "${SER}"`); const w2 = g.measureText(CFG.channel[1]).width, x2 = 1550 - w2 - 26, b2 = base + 178;
    const k = E.snap(inv(A.slab - .04, A.slab + .16, t));
    if (k > 0) {
      g.save(); g.beginPath(); g.rect(x2 - 26, b2 - 122, (w2 + 52) * k, 164); g.clip();
      g.fillStyle = COL.lime; g.fillRect(x2 - 26, b2 - 122, w2 + 52, 164); g.fillStyle = COL.limeInk; g.fillText(CFG.channel[1], x2, b2); g.restore();
    }
  }
  let wmKey = -1;
  function drawWM(ctx, t, c, VX, VY) {
    const d = WM - c; if (d > .92) return;
    const key = Math.round(E.snap(inv(A.slab - .04, A.slab + .16, t)) * 400); if (key !== wmKey) { wmArt(wmG, t); wmKey = key; }
    const kD = E.inOutCubic(inv(A.cut3 - .22, A.cut3 + .2, t)), s = d > 0 ? 1 / (1 - ZD * d) : 1 / (1 + .12 * Math.min(-d, .2));
    const sc = lerp(s, .17, kD), x = lerp(VX, 1642, kD), y = lerp(VY - 20, 116, kD), b = d > .03 ? 70 * (d - .03) : 0;
    ctx.setTransform(sc, 0, 0, sc, x, y); ctx.globalAlpha = inv(.92, .6, d); if (b > .7) ctx.filter = `blur(${b.toFixed(1)}px)`;
    ctx.drawImage(wmC, -800, -290); ctx.filter = 'none'; ctx.globalAlpha = 1;
  }
  function discType(ctx, t, base0) {                            // 5: sources, in the dark row world
    const M = 150, s = t - A.cut3; if (s < 0) return null;
    if (!PL.d) {
      const rows = EP.src.map(([a, b]) => { const L = fitDisp(ctx, `${a} / ${b}`, W - 2 * M, 300); return { L, a, b, n: a.length }; });
      setFont(ctx, `italic 380 84px "${SER}"`); const tw = ctx.measureText(EP.dTail).width;
      PL.d = { rows, tw, H: fitDisp(ctx, EP.dHero, 900, 160) };
      let y = 356; rows.forEach(r => { r.base = y + r.L.cap; y = r.base + 44; }); PL.d.base = y + 34 + PL.d.H.cap; PL.d.hx = M + tw + 44;
    }
    const D = PL.d, kF = inv(A.stepT - .16, A.stepT + .12, t), fx = D.hx + D.H.w / 2, fy = D.base - D.H.cap / 2;
    ctx.setTransform(base0); if (kF > 0) { const S = Math.exp(Math.log(34) * E.inCubic(kF)); ctx.translate(fx, fy); ctx.scale(S, S); ctx.translate(-fx, -fy); }   // dive into the slab
    const aT = 1 - inv(.1, .5, kF);
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = IVORY;
    ctx.globalAlpha = inv(.2, .5, s) * .8 * aT; setFont(ctx, `700 24px "${MONO}"`, 5); ctx.fillText('DISCLAIMER', M, 124);
    ctx.globalAlpha = .4 * aT; ctx.fillRect(M, 162, (W - 2 * M) * E.outQuint(inv(.15, .7, s)), 2);
    ctx.globalAlpha = aT; setFont(ctx, `italic 380 80px "${SER}"`); wipeWords(ctx, EP.dLead, A.dlead.map(x => x[0]), M, 300, 80, t);
    D.rows.forEach((r, ri) => {
      const ta = A.src[2 * ri], tb = A.src[2 * ri + 1], L = r.L, n = r.n;
      ctx.globalAlpha = aT; ghost(ctx, L, M, r.base, E.outQuint(inv(.3 + ri * .18, .95 + ri * .18, s)), t, j => j < n ? ta + .12 : j < n + 3 ? tb - .02 : tb + .12, 'rgba(241,239,230,.17)');
      flyWord(ctx, r.a, M, r.base, L, t, ta, 1, IVORY);
      if (t > tb - .02) { ctx.globalAlpha = aT * .34 * inv(tb - .02, tb + .1, t); ctx.fillStyle = IVORY; setFont(ctx, `400 ${L.size}px "${DISP}"`); ctx.fillText('/', M + L.xs[n + 1], r.base); ctx.globalAlpha = aT; }
      flyWord(ctx, r.b, M + L.xs[n + 3], r.base, L, t, tb, -1, IVORY);
    });
    ctx.globalAlpha = aT; setFont(ctx, `italic 380 84px "${SER}"`); ctx.fillStyle = IVORY; wipe(ctx, EP.dTail, M, D.base, E.outQuint(inv(A.dtail, A.dtail + .35, t)), 84);
    ctx.globalAlpha = 1; const k = E.snap(inv(A.hib - .05, A.hib + .14, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(D.hx - 22, D.base - D.H.cap - 24, (D.H.w + 44) * k, D.H.cap + 48); }
    ctx.globalAlpha = aT; fall(ctx, D.H, D.hx, D.base, t, j => A.hib + j * .016, COL.limeInk); ctx.globalAlpha = 1;
    return kF;
  }
  function drawRow(ctx, t) {
    const f = Math.floor(t * FPS), hook = t < A.cut1, c = rowC(t), sD = t - A.cut3;
    const lampK = hook ? clamp(E.outCubic(inv(.02, .4, t)) * (.94 + .06 * noise1(t * 40))) : 1;
    const hit = hook ? hitOf(t, [[A.lock1, 5], [A.lock2, 5], [A.lock3, 5], [A.hero1 + .16, 6], [A.hero2 + .16, 6], [A.batu + .2, 13], [A.ai, 10]])
      : hitOf(t, [[A.lockW, 9], [A.slab + .1, 5], ...A.src.map(x => [x + .22, 3]), [A.hib + .2, 7]]);
    const VX = W / 2 + (rnd(f * 2.3) - .5) * 2 * hit, VY = VY0 + (rnd(f * 5.3) - .5) * (2 + 2 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
    let gr = ctx.createRadialGradient(VX, VY - 40, 0, VX, VY, 1350);                          // BG: soft studio light at the vanishing point
    gr.addColorStop(0, `rgba(214,222,198,${.17 * lampK})`); gr.addColorStop(.45, `rgba(120,130,108,${.07 * lampK})`); gr.addColorStop(1, 'rgba(60,66,52,0)');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    for (let j = Math.floor(2 * (c - 3.4)); j <= Math.ceil(2 * (c + .95)); j++) {              // BG: ruler ticks along the row
      const rel = j * .5 - c; if (rel > .95 || rel < -3.4) continue;
      const s = 1 / (1 - ZD * rel), a = .26 * lampK * inv(.95, .6, rel) / (1 + 1.1 * Math.max(0, -rel)), big = j % 2 === 0;
      ctx.fillStyle = `rgba(241,239,230,${a})`;
      for (const sd of [-1, 1]) ctx.fillRect(VX + sd * 170 * s - (big ? 46 : 20) * s, VY + 395 * s, (big ? 92 : 40) * s, Math.max(1.5, 3 * s));
    }
    const dim = hook ? 1 : lerp(.8, .5, inv(0, .5, sD));
    for (let i = 0; i < 3; i++) drawAsset(ctx, i, i - c, t, VX, VY, lampK, f, dim);         // MG: the row, far → near
    if (hook) hookType(ctx, t, VX, VY); else drawWM(ctx, t, c, VX, VY);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen';            // FG: dust passing the lens
    for (let i = 0; i < 40; i++) {
      const rel = ((rnd(i + 99) * 4.2 - c) % 4.2 + 4.2) % 4.2 - 3.3;
      const s = 1 / (1 - ZD * rel), r = clamp(4 + 46 * Math.abs(rel) * s * .5, 4, 150);
      const x = VX + s * ((rnd(i) * 2 - 1) * 1250 + t * 16 * (rnd(i + 5) - .5)), y = VY + s * ((rnd(i + 50) * 2 - 1) * 520 - t * 12 * rnd(i + 9));
      ctx.globalAlpha = clamp(lampK * 3.6 / r, .025, .4) * inv(.9, .7, rel) * inv(-3.3, -2.9, rel); ctx.drawImage(bokeh, x - r, y - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (lampK < 1) { ctx.fillStyle = `rgba(4,4,3,${1 - lampK})`; ctx.fillRect(0, 0, W, H); }
    if (hook) ov(ctx, 'lamp', t, 0, .2); else ov(ctx, 'wash', t, A.lockW - .05, .22);
    if (!hook && sD >= 0) {
      const push = 1 + .035 * inv(.3, 8.1, sD) + .004 * hit;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(W / 2 + VX - W / 2, H / 2 + VY - VY0); ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
      const kF = discType(ctx, t, ctx.getTransform());
      if (kF > .78) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.lime; ctx.globalAlpha = inv(.78, .93, kF); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    }
  }

  // ── 3: questions — forward zoom through type planes (light world) ─────────────────────────────────
  function qCam(t) {
    const M = [A.q1, A.q2, A.q3]; let c = -1 + .03 * Math.max(0, t - A.ai);
    M.forEach((m, i) => { c = lerp(c, i, E.outQuart(inv(m - .3, m + .16, t))); if (t > m) c += .04 * (Math.min(t, i < 2 ? M[i + 1] - .3 : A.back - .4) - m); });
    return c + .3 * E.inCubic(inv(A.back - .4, A.back + .12, t));
  }
  function qPlane(ctx, i, t) {
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = INK;
    if (i === -1) {                                               // the lime plane that took the frame
      const L = QL.ai || (QL.ai = fitDisp(ctx, EP.twistHero, 900, 760));
      ctx.fillStyle = COL.lime; ctx.fillRect(-2600, -1600, 5200, 3200);
      fall(ctx, L, -L.w / 2, L.cap / 2, t, j => A.ai + .05 + j * .05, COL.limeInk); return;
    }
    const e = EP.q[i], qt = [A.q1, A.q2, A.q3][i], qh = [A.q1h, A.q2h, A.q3h][i];
    if (i < 2) {
      const L = QL[i] || (QL[i] = fitDisp(ctx, e.hero, 1500, 520)), top = -L.cap / 2 + 40;
      setFont(ctx, `italic 380 150px "${SER}"`); wipe(ctx, e.lead, 0, top - 56, E.outQuint(inv(qt - .06, qt + .3, t)), 150, 'center');
      fall(ctx, L, -L.w / 2, top + L.cap, t, j => qh + j * .02, INK); return;
    }
    const L = QL[2] || (QL[2] = fitDisp(ctx, e.hero, 1500, 460)), Lm = QL.m || (QL.m = fitDisp(ctx, e.mid, 900, 220));
    const top = -20, base = top + L.cap, x = -L.w / 2, mb = top - 40;
    setFont(ctx, `italic 380 88px "${SER}"`); wipeWords(ctx, e.lead, A.q3lead, 0, mb - Lm.cap - 42, 88, t, 'center');
    const hs = j => j < e.hi ? qh + j * .02 : A.sama + (j - e.hi) * .02;
    ghost(ctx, Lm, -Lm.w / 2, mb, E.outQuint(inv(qt - .1, qt + .45, t)), t, j => A.manusia + j * .02, 'rgba(17,18,14,.22)');
    ghost(ctx, L, x, base, E.outQuint(inv(qt + .05, qt + .6, t)), t, hs, 'rgba(17,18,14,.22)');
    fall(ctx, Lm, -Lm.w / 2, mb, t, j => A.manusia + j * .02, INK);
    const k = E.snap(inv(A.sama - .02, A.sama + .16, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(x + L.xs[e.hi] - 20, base - L.cap - 24, (L.w - L.xs[e.hi] + 40) * k, L.cap + 48); }
    fall(ctx, L, x, base, t, j => j < e.hi ? qh + j * .02 : A.sama + (j - e.hi) * .02, j => j < e.hi ? INK : COL.limeInk);
  }
  function drawQ(ctx, t) {
    const f = Math.floor(t * FPS), c = qCam(t);
    const hit = hitOf(t, [[A.ai + .22, .8], [A.q1h + .3, 1], [A.q2h + .32, 1], [A.manusia + .28, .5], [A.sama + .24, 1]]);
    const cx = W / 2 + (rnd(f * 2.3) - .5) * 18 * hit, cy = H / 2 + (rnd(f * 5.3) - .5) * (2 + 14 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; lightBg(ctx);
    ctx.lineCap = 'butt';
    for (let i = 0; i < 54; i++) {                                                          // BG: register marks streaming past = depth
      const rel = -1.4 + rnd(i + 40) * 5.4 - c; if (rel > .75 || rel < -.6) continue;
      const s = ZF ** -rel, a = rnd(i) * 7, R = 300 + 760 * rnd(i + 7), x = cx + Math.cos(a) * R * s, y = cy + Math.sin(a) * R * .62 * s, r = 11 * s;
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.strokeStyle = `rgba(17,18,14,${.34 * inv(.75, .35, rel) * (1 - inv(.15, .6, -rel))})`; ctx.lineWidth = Math.min(6, 1.6 * s);
      ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke();
    }
    for (let i = 2; i >= -1; i--) {                                                         // MG: type planes, far → near
      const rel = i - c; if (rel > .8 || rel < -.55) continue;
      ctx.setTransform(1, 0, 0, 1, cx, cy); if (i >= 0) ctx.rotate(-rel * 11 * D2R * (i % 2 ? -1 : 1)); const s = ZF ** -rel; ctx.scale(s, s);
      ctx.globalAlpha = rel > 0 ? inv(.8, .3, rel) : 1 - inv(.12, .55, -rel); qPlane(ctx, i, t);
    }
    for (let i = 0; i < 18; i++) {                                                          // FG: soft ink dots between the planes
      const rel = -1.6 + rnd(i + 40) * 4.8 - c; if (rel > .6 || rel < -.5) continue;
      const s = ZF ** -rel, a = rnd(i) * 7, R = 380 + 560 * rnd(i + 7), r = (9 + 16 * rnd(i + 3)) * s;
      ctx.setTransform(1, 0, 0, 1, cx, cy); ctx.globalAlpha = .5 * inv(.6, .2, rel) * (1 - inv(.1, .5, -rel));
      ctx.drawImage(fleck, Math.cos(a) * R * s - r, Math.sin(a) * R * .6 * s - r, 2 * r, 2 * r);
    }
    { const r2 = 2 - c, kr = clamp((t - A.manusia - .45) / .3) * (1 - inv(A.sama + .35, A.sama + .7, t)) * (r2 > 0 ? inv(.8, .3, r2) : 1 - inv(.12, .55, -r2));   // rupiah: tulisan saja, tidak diucap (Ikhsan 11-21)
      if (kr > 0) { const rx = W - 70; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = kr; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';   // layar tetap, pojok kanan atas: tak ikut push kamera
        ctx.fillStyle = 'rgba(17,18,14,.74)'; setFont(ctx, `700 40px "${MONO}"`, 3); ctx.fillText('≈ Rp43,1 TRILIUN', rx, 70);
        setFont(ctx, `400 17px "${MONO}"`, 2); ctx.fillStyle = 'rgba(17,18,14,.5)'; ctx.fillText('kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', rx, 98); ctx.textAlign = 'left'; } }
    ctx.globalAlpha = 1; ov(ctx, 'wash', t, A.ai - .05, .3);
  }

  // ── 6: title (light page) ─────────────────────────────────────────────────────────────────────────
  function drawTitle(ctx, t) {
    const M = 150, s = t - A.stepT, f = Math.floor(t * FPS), land = A.batu2 + 4 * .022 + .16;
    const hit = hitOf(t, [[A.tAI + .12, .5], [A.zaman + .24, .6], [land, 1]]), kE = inv(A.out, A.end - .05, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; lightBg(ctx);
    if (!PL.t) {
      const L = { hero: fitDisp(ctx, EP.hero, W - 2 * M, EP.leadAbove ? 400 : 540), mid: fitDisp(ctx, EP.midHi + EP.mid, 900, 200) };
      setFont(ctx, `italic 380 122px "${SER}"`); L.leadW = ctx.measureText(EP.lead.join(' ')).width;
      setFont(ctx, `400 ${L.mid.size}px "${DISP}"`); L.hiW = ctx.measureText(EP.midHi).width;
      L.yLead = 404; L.heroBase = 478 + L.hero.cap; L.rule = L.heroBase + 70; L.mx0 = EP.leadAbove ? M + 20 : M + L.leadW + 52; L.yLeadW = L.yLead;
      if (EP.leadAbove) { L.yLeadW = 300; L.yLead = 340 + L.mid.cap; L.heroBase = L.yLead + 70 + L.hero.cap; L.rule = L.heroBase + 70; }
      PL.t = L;
    }
    const L = PL.t, push = 1 + .05 * inv(.3, 4.7, s) + .02 * hit, fx = L.mx0 + L.hiW / 2, fy = L.yLead - L.mid.cap / 2;
    ctx.translate(W / 2 + (rnd(f * 2.3) - .5) * 20 * hit, H / 2 + (rnd(f * 5.3) - .5) * (2 + 16 * hit)); ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
    if (kE > 0) { const S = Math.exp(Math.log(60) * E.inCubic(kE)); ctx.translate(fx, fy); ctx.scale(S, S); ctx.translate(-fx, -fy); }      // dive into the lime "AI"
    const aT = 1 - inv(.08, .45, kE);
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = INK;
    ctx.globalAlpha = inv(.3, .6, s) * aT;
    setFont(ctx, `400 44px "${DISP}"`, 4); ctx.fillText(`${CFG.channel[0]} ${CFG.channel[1].toUpperCase()}`, M, 120);
    setFont(ctx, `700 22px "${MONO}"`, 3); ctx.textAlign = 'right'; if (EP.no) ctx.fillText(`EPISODE ${EP.no}`, W - M, 116); ctx.textAlign = 'left';
    ctx.globalAlpha = aT;
    setFont(ctx, `italic 380 122px "${SER}"`); wipeWords(ctx, EP.lead, [A.lead, A.jika], M, L.yLeadW, 122, t);
    const n = EP.midHi.length, k = E.snap(inv(A.tAI - .04, A.tAI + .16, t));
    if (k > 0) { ctx.globalAlpha = 1; ctx.fillStyle = COL.lime; ctx.fillRect(L.mx0 - 20, L.yLead - L.mid.cap - 20, (L.hiW + 40) * k, L.mid.cap + 40); ctx.globalAlpha = aT; }
    fall(ctx, L.mid, L.mx0, L.yLead, t, j => j < n ? A.tAI + j * .03 : A.ada + (j - n) * .018, j => j < n ? COL.limeInk : INK);
    const hs = j => j < EP.heroSplit ? A.zaman + j * .022 : A.batu2 + (j - EP.heroSplit) * .022;
    ghost(ctx, L.hero, M, L.heroBase, E.outQuint(inv(.4, 1, s)), t, hs, 'rgba(17,18,14,.2)');
    fall(ctx, L.hero, M, L.heroBase, t, hs, INK);
    const s2 = t - A.batu2 - .45, kf = E.outQuint(inv(0, .45, s2));
    if (kf > 0) {
      ctx.fillStyle = INK; ctx.globalAlpha = .5 * aT; ctx.fillRect(M, L.rule, (W - 2 * M) * kf, 2);
      ctx.globalAlpha = inv(.05, .3, s2) * aT; setFont(ctx, `700 24px "${MONO}"`, 5); ctx.fillText('DISCLAIMER', M, L.rule + 56);
      setFont(ctx, `400 24px "${MONO}"`); ctx.fillText(EP.foot, M + 250, L.rule + 56 + (1 - kf) * 12);
    }
    ctx.globalAlpha = 1;
    if (kE > .8) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.lime; ctx.globalAlpha = inv(.8, .93, kE); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    const kW = inv(A.stepT + .12, A.stepT + .4, t);                // the lime door slides off to the right
    if (kW < 1) wipeIn(ctx, lerp(-200, W + 200, E.outQuart(kW)), false, () => { ctx.fillStyle = COL.lime; ctx.fillRect(0, 0, W, H); });
    ov(ctx, 'wash', t, A.stepT + .1, .25);
  }

  const T = () => ({ a0: A.ai - .12, a1: A.ai + .14, b0: A.back - .14, b1: A.back + .12, tT: A.stepT + .12 });
  function draw(ctx, t) {
    const { a0, a1, b0, b1, tT } = T();
    if (t < a0) drawRow(ctx, t);
    else if (t < a1) { drawRow(ctx, t); wipeIn(ctx, lerp(-200, W + 200, E.outQuart(inv(a0, a1, t))), true, () => drawQ(ctx, t)); }      // lime, from the left
    else if (t < b0) drawQ(ctx, t);
    else if (t < b1) { drawQ(ctx, t); wipeIn(ctx, lerp(W + 200, -200, E.inOutCubic(inv(b0, b1, t))), false, () => drawRow(ctx, t)); }   // the row, from the right
    else if (t < tT) drawRow(ctx, t);
    else drawTitle(ctx, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  }
  function post(o, t) {
    const { a0, a1, b0, b1, tT } = T(), br = t < a0 ? 0 : t < a1 ? inv(a0, a1, t) : t < b0 ? 1 : t < b1 ? 1 - inv(b0, b1, t) : t < tT - .2 ? 0 : inv(tT - .2, tT, t);
    o.setTransform(1, 0, 0, 1, 0, 0);
    sctx.filter = 'brightness(0.6) contrast(2.6) blur(8px)'; sctx.drawImage(o.canvas, 0, 0, 480, 270);              // soft bloom, no film tint
    o.globalCompositeOperation = 'screen'; o.globalAlpha = lerp(.2, .05, br); o.drawImage(small, 0, 0, W, H);
    o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
    const v = o.createRadialGradient(W / 2, H / 2, H * .5, W / 2, H / 2, W * .66);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${lerp(.5, .1, br)})`); o.fillStyle = v; o.fillRect(0, 0, W, H);
    for (const [name, at, al] of HITS()) tx(o, name, t, at, al);
  }
  // the _transisi hits: [clip, time its brightest frame lands, strength]
  const HITS = () => [['shA', A.lock1 - .1, 1], ['shB', A.lock2 - .12, 1], ['shC', A.lock3 - .12, 1], ['stk3', A.cut1, 1],
    ['leakW', A.back + .05, .95], ['leakL', A.cut3, .9], ['stk4', A.stepT, 1], ['leakR', A.end - .25, 1]];
  function tx(o, name, t, at, alpha) {
    const m = TXM[name]; if (!m) return drawTx(o, LIB, name, t, at, alpha); const i = Math.floor((t - at + m.peak) * 30); if (i < 0 || i >= m.n) return;
    const edge = Math.min(1, i / 2, (m.n - 1 - i) / 3);           // no hard pop at the clip ends
    o.setTransform(1, 0, 0, 1, 0, 0); o.globalCompositeOperation = 'screen'; o.globalAlpha = alpha * Math.max(0, edge);
    o.drawImage(txImg[name][i], 0, 0, W, H); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over';
  }
  return scene;
}
