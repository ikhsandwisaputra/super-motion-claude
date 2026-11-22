// Pengantar "GATE" — Relentless non-conformist. Narrated opening (template per episode).
// 1 Hook      : a row of cut-outs in depth, the camera snaps BACKWARD; each new one sweeps in from the side
//               (right → left → right) blurred → sharp while the earlier ones recede and blur.
// 2 Twist     : the picture jams and burns through on "AI".
// 3 Questions : forward zoom fly-through of three type planes in the backlit world behind the burn.
// 4 Channel   : projector gate, the film registers on the wordmark frame, push-in until the frame fills the view.
// 5 Disclaimer: the film steps one frame down (flat page), sources pop on the narrator's words.
// 6 Title     : one more step, episode title, burn-out to white.
// Every beat sits on a spoken word: src/timeline.json (tools/place.py). Per episode: EP below + build/vo.txt.
import { W, H, FPS, clamp, inv, lerp, E, spring } from './engine.js';
import { CFG, COL, DISP, SER, MONO, D2R, PITCH, FX, rnd, noise1, setFont, camera, setBase, useBase, planeTex, mk, backlit,
  makeTile, makeGate, makeBokeh } from './lib.js';

export const EP = {
  hook: [
    { img: 'bulb', side: 1, h: 540, lead: 'Jauh sebelum ada', hero: 'LISTRIK', lit: ['#F0CFA0', '#4E3626'] },
    { img: 'tablet', side: -1, h: 600, lead: 'Sebelum ada', hero: 'TULISAN', lit: ['#FFF1D6', '#6A4A30'] },
    { img: 'axe', side: 1, h: 700, label: ['ALAT', 'PALING', 'CANGGIH', 'MANUSIA'], lead: 'cuma', hero: 'BATU', tail: 'yang diasah.', lit: ['#FFF6E4', '#A8805C'] },
  ],
  twist: ['Terus', 'tiba-tiba…'], twistHero: 'AI',
  q: [{ lead: 'Apa yang', hero: 'BERUBAH?' }, { lead: 'Siapa yang', hero: 'BERKUASA?' },
    { lead: ['Dan', 'apa', 'kita', 'masih', 'jadi'], mid: 'MANUSIA', hero: 'YANG SAMA?', hi: 5 }],
  dLead: ['Konten', 'di', 'video', 'ini', 'hasil', 'riset', 'dari'],
  src: [['ARTIKEL', 'JURNAL ILMIAH'], ['BLOG', 'OPINI PRIBADI']], dTail: 'dan bersifat', dHero: 'HIBURAN.',
  lead: ['Bagaimana', 'jika'], midHi: 'AI', mid: ' ADA DI', hero: 'ZAMAN BATU?', heroSplit: 6,
  foot: 'Riset dari artikel, jurnal ilmiah, blog, dan opini pribadi · bersifat hiburan',
};
const IVORY = '#F3E6CB', BL = [0, 4, 9, 17, 30, 50], ZD = 0.72, ZF = 6, BAR = 131;

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
function ghost(ctx, L, x, base, k, t, start) {         // outline of the word to come; each letter is filled when it is spoken
  if (k <= 0) return; setFont(ctx, `400 ${L.size}px "${DISP}"`);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 12, base - L.cap - 24, (L.w + 24) * k, L.cap + 48); ctx.clip();
  ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(22,16,11,.2)';
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
const blob = (ctx, r, t, ph) => {
  ctx.beginPath();
  for (let k = 0; k <= 72; k++) {
    const a = k / 72 * Math.PI * 2, rr = r * (1 + .16 * Math.sin(3 * a + 1.3 + t * 2 + ph) + .10 * Math.sin(7 * a + 4.1 - t * 3 + ph) + .06 * Math.sin(13 * a + 2.2 + t * 5));
    ctx[k ? 'lineTo' : 'moveTo'](Math.cos(a) * rr * 1.25, Math.sin(a) * rr);
  }
  ctx.closePath();
};

export function makeFilm() {
  const OV = { lampA: 39, shut: 20, washA: 34, burnA: 17, perf: 24 }, ovImg = {};
  let TL, A, NS, tiles, gate, bokeh, fleck, sprites, glintC, gg, CUES, CHAPS;
  const [small, sctx] = mk(480, 270), [wmC, wmG] = mk(1600, 900);
  const HL = [], QL = {}, PL = {};
  const scene = { dur: 1, cuts: [], K: 8, grain: 0.07, load, post, draw, cues: () => ({ cues: CUES, chapters: CHAPS }) };

  async function sprite(e) {
    const bm = await createImageBitmap(await (await fetch(`../assets/hook/${e.img}.png`)).blob());
    const P = 130, w = bm.width + 2 * P, h = bm.height + 2 * P, [base, g] = mk(w, h), [sh, q] = mk(w, h);
    g.drawImage(bm, P, P);
    const gr = q.createLinearGradient(e.side > 0 ? P : w - P, 0, e.side > 0 ? w - P : P, h * .3);      // lit from the centre of the room
    gr.addColorStop(0, e.lit[0]); gr.addColorStop(1, e.lit[1]); q.fillStyle = gr; q.fillRect(0, 0, w, h);
    q.globalCompositeOperation = 'destination-in'; q.drawImage(base, 0, 0);
    g.globalCompositeOperation = 'multiply'; g.drawImage(sh, 0, 0); g.globalCompositeOperation = 'source-over';
    const lv = BL.map((b, i) => { if (!i) return base; const [c, x] = mk(w >> 1, h >> 1); x.filter = `blur(${b / 2}px)`; x.drawImage(base, 0, 0, c.width, c.height); return c; });
    return { lv, w, h, iw: bm.width, ih: bm.height };
  }
  async function load() {
    const j = async u => (await fetch(u)).json();
    TL = await j('./timeline.json'); A = TL.A; NS = TL.steps.length;
    CUES = await j('../build/cues.json').catch(() => ({})); CHAPS = await j('../build/chapters.json').catch(() => []);
    scene.dur = A.end; scene.cuts = [A.cut1, A.back, A.cut3];
    for (const [name, n] of Object.entries(OV))
      ovImg[name] = await Promise.all(Array.from({ length: n }, async (_, i) =>
        createImageBitmap(await (await fetch(`../assets/ov/${name}/f_${String(i + 1).padStart(3, '0')}.jpg`)).blob())));
    tiles = [0, 1, 2, 3].map(v => makeTile(v, v)); gate = makeGate(); bokeh = makeBokeh();
    sprites = []; for (const e of EP.hook) sprites.push(await sprite(e));
    [glintC, gg] = mk(sprites[2].w, sprites[2].h);
    let g; [fleck, g] = mk(96, 96); const gr = g.createRadialGradient(48, 48, 0, 48, 48, 48);
    gr.addColorStop(0, 'rgba(22,16,11,.85)'); gr.addColorStop(.6, 'rgba(22,16,11,.5)'); gr.addColorStop(1, 'rgba(22,16,11,0)'); g.fillStyle = gr; g.fillRect(0, 0, 96, 96);
  }
  function ov(ctx, name, t, start, alpha, mode = 'screen') {
    const i = Math.floor((t - start) * 30); if (i < 0 || i >= OV[name] || alpha <= 0) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = mode; ctx.globalAlpha = alpha;
    ctx.drawImage(ovImg[name][i], 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }
  function burn(ctx, t, cx, cy, r, bk, inside) {            // char → ember → hole (inside = what the hole shows)
    ctx.setTransform(1, 0, 0, 1, cx, cy);
    ctx.save(); ctx.filter = 'blur(10px)'; ctx.fillStyle = 'rgba(52,22,6,.82)'; blob(ctx, r * 1.34 + 26, t, 0); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#FF7B1C'; blob(ctx, r * 1.07 + 7, t, .6); ctx.fill();
    for (let i = 0; i < 7; i++) {                           // satellite blisters
      const rs = (22 + 46 * rnd(i + 3)) * E.outCubic(inv(.12 + .08 * i, .5 + .08 * i, bk)) * (1 + 7 * inv(.62, 1, bk)); if (rs <= 0) continue;
      ctx.save(); ctx.translate((rnd(i * 7) - .5) * 1500, (rnd(i * 13 + 1) - .5) * 620);
      ctx.fillStyle = '#FF7B1C'; blob(ctx, rs * 1.12 + 5, t, i); ctx.fill(); ctx.fillStyle = '#FFF4D6'; blob(ctx, rs, t, i + 2); ctx.fill(); ctx.restore();
    }
    if (inside) { ctx.save(); blob(ctx, r, t, 1.1); ctx.clip(); inside(); ctx.restore(); }
    else { ctx.fillStyle = '#FFF4D6'; blob(ctx, r, t, 1.1); ctx.fill(); }
  }

  // ── 1 + 2: the row in depth (camera pulls back), then the jam ─────────────────────────────────────
  function hookC(t) {
    const L = [A.lock1, A.lock2, A.lock3]; let c = -1;
    for (let i = 0; i < 3; i++) {
      c = lerp(c, i, E.outQuart(inv(L[i] - .34, L[i] + .22, t)));
      if (t > L[i]) c += .03 * (Math.min(t, i < 2 ? L[i + 1] - .34 : 1e9) - L[i]);      // never static: slow pull-back in every hold
    }
    if (t > A.jam) c += .012 * Math.sin((t - A.jam) * 95) * inv(A.jam, A.jam + .15, t);  // the jam shudder
    return c;
  }
  const levelOf = b => { if (b <= 0) return 0; for (let i = 1; i < BL.length; i++) if (b <= BL[i]) return i - 1 + (b - BL[i - 1]) / (BL[i] - BL[i - 1]); return BL.length - 1; };
  function drawAsset(ctx, i, d, t, VX, VY, lampK, f) {
    if (d > .92) return;
    const sp = sprites[i], e = EP.hook[i], s = 1 / (1 - ZD * d), k = e.h / sp.ih * s;
    const blurS = d > 0 ? 84 * Math.max(0, d - .03) : 15 * Math.max(0, -d - .22), lvF = levelOf(blurS / k);
    const st = [A.strike1, A.strike2][i], off = st ? E.outCubic(inv(st, st + .3, t)) : 0;
    let a = inv(.92, .55, d) * lampK * (1 - .4 * off);
    if (d < 0) a *= lerp(1, .42, inv(.22, 1.2, -d)) * lerp(1, .6, inv(1.2, 2.2, -d));
    const x = VX + s * e.side * 450, y = VY + s * (40 + 6 * Math.sin(t * .9 + i * 2));
    if (Math.abs(d) < .6) {                                    // rim glow behind the one in focus
      ctx.setTransform(1, 0, 0, 1, x, y); ctx.globalCompositeOperation = 'screen';
      const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, 470 * s); gr.addColorStop(0, `rgba(255,188,112,${.2 * (1 - Math.abs(d) / .6) * lampK * (1 - .5 * off)})`); gr.addColorStop(1, 'rgba(160,60,10,0)');
      ctx.fillStyle = gr; ctx.fillRect(-500 * s, -500 * s, 1000 * s, 1000 * s); ctx.globalCompositeOperation = 'source-over';
    }
    ctx.setTransform(1, 0, 0, 1, x, y); ctx.rotate((e.side * 5 * d + 1.2 * Math.sin(t * .7 + i)) * D2R); ctx.scale(k, k);
    const l0 = Math.floor(lvF), l1 = Math.min(BL.length - 1, l0 + 1), fr = lvF - l0;
    ctx.globalAlpha = a; ctx.drawImage(sp.lv[l0], -sp.w / 2, -sp.h / 2, sp.w, sp.h);
    if (fr > .02 && l1 !== l0) { ctx.globalAlpha = a * fr; ctx.drawImage(sp.lv[l1], -sp.w / 2, -sp.h / 2, sp.w, sp.h); }
    ctx.globalAlpha = 1;
    if (i === 0 && off < 1 && d > -.6) {                       // the filament is on until the word is struck
      const lit = lampK * (1 - off) * (t > A.strike1 ? .55 + .45 * rnd(f * 1.3) : .92 + .08 * noise1(t * 30)) * inv(.6, .2, Math.abs(d));
      const fx = (.65 - .5) * sp.iw, fy = (.54 - .5) * sp.ih, gr = ctx.createRadialGradient(fx, fy, 0, fx, fy, 520);
      gr.addColorStop(0, `rgba(255,224,160,${.95 * lit})`); gr.addColorStop(.3, `rgba(255,160,60,${.4 * lit})`); gr.addColorStop(1, 'rgba(255,120,20,0)');
      ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = gr; ctx.fillRect(fx - 520, fy - 520, 1040, 1040); ctx.globalCompositeOperation = 'source-over';
    }
    const gk = inv(A.diasah + .05, A.diasah + .6, t);
    if (i === 2 && gk > 0 && gk < 1) {                         // "diasah": a glint runs down the edge
      gg.setTransform(1, 0, 0, 1, 0, 0); gg.globalCompositeOperation = 'source-over'; gg.clearRect(0, 0, sp.w, sp.h);
      gg.translate(sp.w / 2, sp.h * lerp(-.1, 1.1, E.inOutCubic(gk))); gg.rotate(-24 * D2R);
      const gr = gg.createLinearGradient(0, -100, 0, 100); gr.addColorStop(0, 'rgba(255,244,214,0)'); gr.addColorStop(.5, 'rgba(255,244,214,.9)'); gr.addColorStop(1, 'rgba(255,244,214,0)');
      gg.fillStyle = gr; gg.fillRect(-sp.w, -100, 2 * sp.w, 200);
      gg.setTransform(1, 0, 0, 1, 0, 0); gg.globalCompositeOperation = 'destination-in'; gg.drawImage(sp.lv[0], 0, 0);
      ctx.globalCompositeOperation = 'screen'; ctx.drawImage(glintC, -sp.w / 2, -sp.h / 2); ctx.globalCompositeOperation = 'source-over';
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
      const top = i < 2 ? 470 : 440, base = top + L.cap, hx = left ? xa : xa - L.w;
      if (e.label) {
        setFont(ctx, `700 42px "${MONO}"`, 4); let x = xa; ctx.save(); ctx.fillStyle = 'rgba(243,230,203,.82)';
        e.label.forEach((wd, j) => { const k = E.outCubic(inv(A.lab[j], A.lab[j] + .18, t)); if (k > 0) { ctx.globalAlpha = (1 - out) * k; ctx.fillText(wd, x + (1 - k) * 14, top - 140); } x += ctx.measureText(wd + ' ').width; });
        ctx.restore();
      }
      const ls = i < 2 ? 78 : 96, tl = i < 2 ? Ls[i] + .02 : A.cuma;
      setFont(ctx, `italic 380 ${ls}px "${SER}"`); wipe(ctx, e.lead, xa, top - 40, E.outQuint(inv(tl, tl + .4, t)), ls, left ? 'left' : 'right');
      const struck = strikeT[i] ? E.snap(inv(strikeT[i], strikeT[i] + .16, t)) : 0;
      ctx.save(); ctx.globalAlpha *= 1 - .5 * struck; fall(ctx, L, hx, base, t, j => heroT[i] + j * .022, IVORY); ctx.restore();
      if (struck > 0) { ctx.save(); ctx.translate(hx + L.w / 2, base - L.cap * .47); ctx.rotate(-2.5 * D2R); ctx.fillStyle = COL.lime; ctx.fillRect(-L.w / 2 - 26, -L.size * .055, (L.w + 52) * struck, L.size * .11); ctx.restore(); }
      if (e.tail) { setFont(ctx, `italic 380 84px "${SER}"`); ctx.fillStyle = IVORY; wipe(ctx, e.tail, xa, base + 104, E.outQuint(inv(A.diasah, A.diasah + .4, t)), 84); }
    });
    const tk = 1 - inv(A.ai - .05, A.ai + .12, t);              // "Terus tiba-tiba…"
    if (t >= A.jam && tk > 0) {
      ctx.setTransform(1, 0, 0, 1, VX - W / 2, VY - 500); ctx.globalAlpha = tk; ctx.fillStyle = IVORY; setFont(ctx, `italic 380 124px "${SER}"`);
      wipeWords(ctx, EP.twist, [A.jam, A.tiba], 170, 590, 124, t);
    }
    ctx.globalAlpha = 1;
  }
  function drawHook(ctx, t) {
    const f = Math.floor(t * FPS), jam = inv(A.jam, A.cut1, t), c = hookC(t);
    const lampK = clamp(E.outCubic(inv(.02, .4, t)) * (.9 + .1 * noise1(t * 40)));
    const hit = hitOf(t, [[A.lock1, 5], [A.lock2, 5], [A.lock3, 5], [A.hero1 + .16, 6], [A.hero2 + .16, 6], [A.batu + .2, 13]]) + 15 * jam ** 2;
    const VX = W / 2 + (rnd(f * 2.3) - .5) * 2 * hit, VY = 500 + (rnd(f * 5.3) - .5) * (2.4 + 2 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.room; ctx.fillRect(0, 0, W, H);
    let gr = ctx.createRadialGradient(VX, VY, 0, VX, VY, 1300);                              // BG: lamp haze at the vanishing point
    gr.addColorStop(0, `rgba(255,196,128,${.25 * lampK})`); gr.addColorStop(.4, `rgba(200,92,28,${.11 * lampK})`); gr.addColorStop(1, 'rgba(90,30,6,0)');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    for (let j = -10; j <= 6; j++) {                                                        // BG: perforation track on the floor
      const rel = j * .5 - c; if (rel > .95 || rel < -3.4) continue;
      const s = 1 / (1 - ZD * rel), a = .2 * lampK * inv(.95, .6, rel) / (1 + 1.1 * Math.max(0, -rel));
      ctx.fillStyle = `rgba(255,214,160,${a})`;
      for (const sd of [-1, 1]) { ctx.beginPath(); ctx.roundRect(VX + sd * 150 * s - 40 * s, VY + 335 * s, 80 * s, 13 * s, 5 * s); ctx.fill(); }
    }
    for (let i = 0; i < 3; i++) drawAsset(ctx, i, i - c, t, VX, VY, lampK, f);              // MG: the row, far → near
    hookType(ctx, t, VX, VY);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen';            // FG: dust passing the lens
    for (let i = 0; i < 44; i++) {
      const rel = -3 + rnd(i + 99) * 6.6 - c; if (rel > .93 || rel < -3) continue;
      const s = 1 / (1 - ZD * rel), r = clamp(4 + 46 * Math.abs(rel) * s * .5, 4, 150);
      const x = VX + s * ((rnd(i) * 2 - 1) * 1250 + t * 16 * (rnd(i + 5) - .5)), y = VY + s * ((rnd(i + 50) * 2 - 1) * 520 - t * 12 * rnd(i + 9));
      ctx.globalAlpha = clamp(lampK * 4.5 / r, .03, .5) * inv(.93, .7, rel); ctx.drawImage(bokeh, x - r, y - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (lampK < 1) { ctx.fillStyle = `rgba(4,3,2,${1 - lampK})`; ctx.fillRect(0, 0, W, H); }
    ov(ctx, 'lampA', t, 0, .22); ov(ctx, 'washA', t, A.lock3 + .9, .14);      // no gate flash here: the side sweep (blur → sharp) must stay readable
    const bk0 = inv(A.tiba, A.ai, t), bk1 = inv(A.ai, A.cut1 - .04, t);
    if (bk0 > 0) burn(ctx, t, VX + 470, VY + 20, 26 * E.outCubic(inv(0, .25, bk0)) + 80 * bk0 ** 2 + 2150 * bk1 ** 1.6, .62 * bk0 + .38 * bk1, () => drawQ(ctx, t));
    ov(ctx, 'burnA', t, A.cut1 - .5, .8); ov(ctx, 'perf', t, A.cut1 - .4, .7);
  }

  // ── 3: questions — forward zoom through type planes ───────────────────────────────────────────────
  function qCam(t) {
    const M = [A.q1, A.q2, A.q3]; let c = -1 + .03 * Math.max(0, t - A.ai);
    M.forEach((m, i) => { c = lerp(c, i, E.outQuart(inv(m - .3, m + .16, t))); if (t > m) c += .04 * (Math.min(t, i < 2 ? M[i + 1] - .3 : A.back - .34) - m); });
    return lerp(c, 3.3, E.inCubic(inv(A.back - .34, A.back, t)));
  }
  function qPlane(ctx, i, t) {
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = COL.ink;
    if (i === -1) {
      const L = QL.ai || (QL.ai = fitDisp(ctx, EP.twistHero, 900, 760)), x = -L.w / 2, base = L.cap / 2, k = E.snap(inv(A.ai, A.ai + .2, t));
      if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(x - 56, base - L.cap - 44, (L.w + 112) * k, L.cap + 88); }
      fall(ctx, L, x, base, t, j => A.ai + .04 + j * .04, COL.limeInk); return;
    }
    const e = EP.q[i], qt = [A.q1, A.q2, A.q3][i], qh = [A.q1h, A.q2h, A.q3h][i];
    if (i < 2) {
      const L = QL[i] || (QL[i] = fitDisp(ctx, e.hero, 1500, 520)), top = -L.cap / 2 + 40;
      setFont(ctx, `italic 380 150px "${SER}"`); wipe(ctx, e.lead, 0, top - 56, E.outQuint(inv(qt - .06, qt + .3, t)), 150, 'center');
      fall(ctx, L, -L.w / 2, top + L.cap, t, j => qh + j * .02, COL.ink); return;
    }
    const L = QL[2] || (QL[2] = fitDisp(ctx, e.hero, 1500, 460)), Lm = QL.m || (QL.m = fitDisp(ctx, e.mid, 900, 220));
    const top = -20, base = top + L.cap, x = -L.w / 2, mb = top - 40;
    setFont(ctx, `italic 380 88px "${SER}"`); wipeWords(ctx, e.lead, [26, 27, 28, 29, 30].map(n => TL.words[n][1]), 0, mb - Lm.cap - 42, 88, t, 'center');
    fall(ctx, Lm, -Lm.w / 2, mb, t, j => A.manusia + j * .02, COL.ink);
    const k = E.snap(inv(A.sama - .02, A.sama + .16, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(x + L.xs[e.hi] - 20, base - L.cap - 24, (L.w - L.xs[e.hi] + 40) * k, L.cap + 48); }
    fall(ctx, L, x, base, t, j => j < e.hi ? qh + j * .02 : A.sama + (j - e.hi) * .02, j => j < e.hi ? COL.ink : COL.limeInk);
  }
  function drawQ(ctx, t) {
    const f = Math.floor(t * FPS), c = qCam(t);
    const hit = hitOf(t, [[A.ai + .2, .7], [A.q1h + .3, 1], [A.q2h + .32, 1], [A.manusia + .28, .5], [A.sama + .24, 1]]);
    const cx = W / 2 + (rnd(f * 2.3) - .5) * 18 * hit, cy = H / 2 + (rnd(f * 5.3) - .5) * (2.4 + 14 * hit);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
    const gr = ctx.createRadialGradient(960, 500, 60, 960, 540, 1280); gr.addColorStop(0, '#FFF8E6'); gr.addColorStop(.55, '#F6E7C6'); gr.addColorStop(1, '#D9B67E');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    ctx.setTransform(1, 0, 0, 1, cx, cy);                                                    // BG: leader rings = the tunnel
    for (let j = 0; j < 16; j++) {
      const dj = -2.2 + j * .45, r = 520 * ZF ** (c - dj); if (r < 40 || r > 2700) continue;
      ctx.strokeStyle = `rgba(22,16,11,${.2 * inv(40, 170, r) * inv(2700, 1500, r)})`; ctx.lineWidth = 1.5 + r * .004;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke();
      for (let k = 0; k < 4; k++) { const a = j * .7 + k * Math.PI / 2 + .5 * (c - dj); ctx.beginPath(); ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); ctx.lineTo(Math.cos(a) * r * 1.07, Math.sin(a) * r * 1.07); ctx.stroke(); }
    }
    for (let i = 2; i >= -1; i--) {                                                         // MG: type planes, far → near
      const rel = i - c; if (rel > .8 || rel < -.55) continue;
      ctx.setTransform(1, 0, 0, 1, cx, cy); ctx.rotate(-rel * 11 * D2R * (i % 2 ? -1 : 1)); const s = ZF ** -rel; ctx.scale(s, s);
      ctx.globalAlpha = rel > 0 ? inv(.8, .3, rel) : 1 - inv(.12, .55, -rel); qPlane(ctx, i, t);
    }
    for (let i = 0; i < 18; i++) {                                                          // FG: ink flecks between the planes
      const rel = -1.6 + rnd(i + 40) * 4.8 - c; if (rel > .6 || rel < -.5) continue;
      const s = ZF ** -rel, a = rnd(i) * 7, R = 380 + 560 * rnd(i + 7), r = (9 + 16 * rnd(i + 3)) * s;
      ctx.setTransform(1, 0, 0, 1, cx, cy); ctx.globalAlpha = .55 * inv(.6, .2, rel) * (1 - inv(.1, .5, -rel));
      ctx.drawImage(fleck, Math.cos(a) * R * s - r, Math.sin(a) * R * .6 * s - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1;
    ov(ctx, 'shut', t, A.back - .2, .9);
    const wk = inv(A.back - .13, A.back - .01, t) ** 2;
    if (wk > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(255,246,225,${wk})`; ctx.fillRect(0, 0, W, H); }
  }

  // ── 4: channel — the projector gate ───────────────────────────────────────────────────────────────
  const pushK = t => E.inOutCubic(inv(A.slab + .35, A.cut3, t));
  function filmPos(t) { let p = 0; for (const st of TL.steps) { const s = t - st.t; if (s <= 0) break; p += st.lock ? spring(s, .5, .24) : E.inOutCubic(s / .06); } return p; }
  function camRoom(t) {
    const a = E.outQuart(inv(A.back, A.lockW + .12, t)), b = E.expo16(inv(A.lockW, A.lockW + .34, t)), c = inv(A.lockW + .34, A.slab + .35, t), d = pushK(t);
    const path = (v0, v1, v2, v3, v4) => lerp(lerp(lerp(lerp(v0, v1, a), v2, b), v3, c), v4, d);
    const f = Math.floor(t * FPS), hit = hitOf(t, [[A.lockW, 7], [A.slab + .1, 6]]) * (1 - d);
    return { tx: FX, ty: 0, tz: 0, f: 1400,
      dist: Math.exp(path(Math.log(620), Math.log(3500), Math.log(2350), Math.log(2150), Math.log(1400 / 1.2))),
      yaw: path(6, -15, -8, -6.5, 0), pitch: path(-3, 7, 3, 2.4, 0), roll: path(-10, -4, -2, -1.5, 0),
      sx: (rnd(f * 2.3) - .5) * 2 * hit, sy: (rnd(f * 5.3) - .5) * (2.4 * (1 - d) + 2 * hit) };
  }
  let wmKey = -1;
  function wmArt(g, t) {                       // the wordmark frame, 1600×900
    backlit(g, 1600, 900, 0);
    g.fillStyle = COL.ink; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
    const L = PL.wm || (PL.wm = fitDisp(g, CFG.channel[0], 1300, 900)), x = 150, base = 232 + L.cap;
    setFont(g, `400 ${L.size}px "${DISP}"`); g.fillText(CFG.channel[0], x, base);
    setFont(g, `italic 420 150px "${SER}"`); const w2 = g.measureText(CFG.channel[1]).width, x2 = x + 1300 - w2, b2 = base + 186;
    const k = E.snap(inv(A.slab - .04, A.slab + .16, t));
    if (k > 0) {
      g.save(); g.beginPath(); g.rect(x2 - 26, b2 - 122, (w2 + 52) * k, 164); g.clip();
      g.fillStyle = COL.lime; g.fillRect(x2 - 26, b2 - 122, w2 + 52, 164); g.fillStyle = COL.limeInk; g.fillText(CFG.channel[1], x2, b2); g.restore();
    }
    g.fillStyle = COL.ink; setFont(g, `700 26px "${MONO}"`, 3);
    g.fillText(`${CFG.reel} — HEAD`, x, 128); g.fillText('PENGANTAR', x, 812);
    g.textAlign = 'right'; g.fillText('24 FPS · SAFETY FILM', 1450, 128); g.fillText('RNC ●', 1450, 812); g.textAlign = 'left';
  }
  function drawRoom(ctx, t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.room; ctx.fillRect(0, 0, W, H);
    const c = camRoom(t), proj = camera(c), d = pushK(t); setBase(c.roll);
    const g0 = proj(FX, 0, 0);
    useBase(ctx);
    let gr = ctx.createRadialGradient(g0.x, g0.y, 0, g0.x, g0.y, 2300 * g0.s);
    gr.addColorStop(0, 'rgba(255,200,130,.34)'); gr.addColorStop(.35, 'rgba(206,96,28,.13)'); gr.addColorStop(1, 'rgba(90,30,6,0)');
    ctx.fillStyle = gr; ctx.fillRect(-W, -H, 3 * W, 3 * H);
    const p = filmPos(t), n0 = Math.floor(p);
    for (let n = n0 - 5; n <= n0 + 6; n++) planeTex(ctx, proj, tiles[((n % 4) + 4) % 4], -1040, (p - n) * PITCH - 500, 2080, 1000, 0, 13, 5);
    if (Math.abs(p - NS) < 6) {                                  // the wordmark frame is live (the slab snaps on "non-conformist")
      const key = Math.round(E.snap(inv(A.slab - .04, A.slab + .16, t)) * 400);
      if (key !== wmKey) { wmG.setTransform(1, 0, 0, 1, 0, 0); wmArt(wmG, t); wmKey = key; }
      planeTex(ctx, proj, wmC, FX - 800, (p - NS) * PITCH - 450, 1600, 900, 0, 10, 5);
    }
    useBase(ctx); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 1 - d;       // only the gate is lit
    gr = ctx.createRadialGradient(g0.x, g0.y, 0, g0.x, g0.y, 2500 * g0.s);
    gr.addColorStop(0, '#fff'); gr.addColorStop(.3, '#fff'); gr.addColorStop(.52, '#8a6039'); gr.addColorStop(1, '#1c1009');
    ctx.fillStyle = gr; ctx.fillRect(-W, -H, 3 * W, 3 * H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    planeTex(ctx, proj, gate, FX - 1050, -650, 2100, 1300, -140, 6, 4);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 46; i++) {
      const q = proj((rnd(i) * 2 - 1) * 1700 + t * 30 * (rnd(i + 5) - .5), (rnd(i + 50) * 2 - 1) * 1000 - t * 24 * rnd(i + 9), -150 - rnd(i + 99) * 3700);
      if (q.z < 70) continue; const r = clamp(3 + 3000 / q.z, 3, 110);
      ctx.globalAlpha = clamp(5 / r, .035, .5) * (1 - d); ctx.drawImage(bokeh, q.x - r, q.y - r, 2 * r, 2 * r);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    ov(ctx, 'shut', t, A.lockW - .03, .7); ov(ctx, 'washA', t, A.lockW + .35, .16);
    const wk = 1 - E.outCubic(inv(A.back, A.back + .32, t));
    if (wk > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(255,246,225,${wk})`; ctx.fillRect(0, 0, W, H); }
  }

  // ── 5 + 6: flat pages — the film steps frame by frame ─────────────────────────────────────────────
  const pageBg = ctx => { const gr = ctx.createRadialGradient(960, 500, 60, 960, 540, 1280); gr.addColorStop(0, '#FFF8E6'); gr.addColorStop(.55, '#F6E7C6'); gr.addColorStop(1, '#D9B67E'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); };
  function discPage(ctx, t) {
    const M = 150, s = t - A.cut3; pageBg(ctx);
    if (!PL.d) {
      const rows = EP.src.map(([a, b]) => { const L = fitDisp(ctx, `${a} / ${b}`, W - 2 * M, 300); return { L, n: a.length }; });
      setFont(ctx, `italic 380 84px "${SER}"`); const tw = ctx.measureText(EP.dTail).width;
      PL.d = { rows, tw, H: fitDisp(ctx, EP.dHero, 900, 156) };
    }
    const D = PL.d; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = COL.ink;
    ctx.globalAlpha = inv(.12, .4, s); setFont(ctx, `700 24px "${MONO}"`, 5); ctx.fillText('DISCLAIMER', M, 136);
    setFont(ctx, `400 44px "${DISP}"`, 4); ctx.textAlign = 'right'; ctx.fillText(`${CFG.channel[0]} ${CFG.channel[1].toUpperCase()}`, W - M, 140); ctx.textAlign = 'left';
    ctx.globalAlpha = .55; ctx.fillRect(M, 166, (W - 2 * M) * E.outQuint(inv(.1, .6, s)), 2); ctx.globalAlpha = 1;
    setFont(ctx, `italic 380 80px "${SER}"`); wipeWords(ctx, EP.dLead, A.dlead.map(x => x[0]), M, 300, 80, t);
    let y = 350;
    D.rows.forEach(({ L, n }, r) => {
      const base = y + L.cap, ta = A.src[2 * r], tb = A.src[2 * r + 1];
      const st = j => j < n ? ta + j * .014 : j < n + 3 ? tb - .02 : tb + (j - n - 3) * .014;
      ghost(ctx, L, M, base, E.outQuint(inv(.3 + r * .18, .95 + r * .18, s)), t, st);
      fall(ctx, L, M, base, t, st, j => j >= n && j < n + 3 ? 'rgba(22,16,11,.32)' : COL.ink);
      y = base + 42;
    });
    const base = y + 30 + D.H.cap, x = M + D.tw + 44;
    setFont(ctx, `italic 380 84px "${SER}"`); ctx.fillStyle = COL.ink; wipe(ctx, EP.dTail, M, base, E.outQuint(inv(A.dtail, A.dtail + .35, t)), 84);
    const k = E.snap(inv(A.hib - .05, A.hib + .14, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(x - 22, base - D.H.cap - 24, (D.H.w + 44) * k, D.H.cap + 48); }
    fall(ctx, D.H, x, base, t, j => A.hib + j * .016, COL.limeInk);
  }
  function titlePage(ctx, t) {
    const M = 150, s = t - A.stepT, f = Math.floor(t * FPS); pageBg(ctx);
    if (!PL.t) {
      const L = { hero: fitDisp(ctx, EP.hero, W - 2 * M, 540), mid: fitDisp(ctx, EP.midHi + EP.mid, 900, 200) };
      setFont(ctx, `italic 380 122px "${SER}"`); L.leadW = ctx.measureText(EP.lead.join(' ')).width;
      setFont(ctx, `400 200px "${DISP}"`); L.hiW = ctx.measureText(EP.midHi).width;
      L.yLead = 404; L.heroBase = 478 + L.hero.cap; L.rule = L.heroBase + 70; PL.t = L;
    }
    const L = PL.t; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.fillStyle = COL.ink;
    ctx.globalAlpha = inv(.2, .5, s);
    setFont(ctx, `400 44px "${DISP}"`, 4); ctx.fillText(`${CFG.channel[0]} ${CFG.channel[1].toUpperCase()}`, M, 120);
    setFont(ctx, `700 22px "${MONO}"`, 2); ctx.textAlign = 'right';
    ctx.fillText(`${CFG.reel} · FRAME ${String(CFG.frameNo).padStart(4, '0')} · 24 FPS`, W - M, 116);
    ctx.fillText(`TC 00:00:${String(Math.floor(t)).padStart(2, '0')}:${String(f % FPS).padStart(2, '0')}`, W - M, 1012); ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
    setFont(ctx, `italic 380 122px "${SER}"`); wipeWords(ctx, EP.lead, [A.lead, A.jika], M, L.yLead, 122, t);
    const mx0 = M + L.leadW + 52, n = EP.midHi.length, k = E.snap(inv(A.tAI - .04, A.tAI + .16, t));
    if (k > 0) { ctx.fillStyle = COL.lime; ctx.fillRect(mx0 - 20, L.yLead - L.mid.cap - 20, (L.hiW + 40) * k, L.mid.cap + 40); }
    fall(ctx, L.mid, mx0, L.yLead, t, j => j < n ? A.tAI + j * .03 : A.ada + (j - n) * .018, j => j < n ? COL.limeInk : COL.ink);
    const hs = j => j < EP.heroSplit ? A.zaman + j * .022 : A.batu2 + (j - EP.heroSplit) * .022;
    ghost(ctx, L.hero, M, L.heroBase, E.outQuint(inv(.25, .9, s)), t, hs);
    fall(ctx, L.hero, M, L.heroBase, t, hs, COL.ink);
    const s2 = t - A.batu2 - .45, kf = E.outQuint(inv(0, .45, s2));
    if (kf > 0) {
      ctx.fillStyle = COL.ink; ctx.globalAlpha = .55; ctx.fillRect(M, L.rule, (W - 2 * M) * kf, 2);
      ctx.globalAlpha = inv(.05, .3, s2); setFont(ctx, `700 24px "${MONO}"`, 5); ctx.fillText('DISCLAIMER', M, L.rule + 56);
      setFont(ctx, `400 24px "${MONO}"`); ctx.fillText(EP.foot, M + 250, L.rule + 56 + (1 - kf) * 12); ctx.globalAlpha = 1;
    }
  }
  function drawPages(ctx, t) {
    const f = Math.floor(t * FPS), sD = t - A.cut3, sT = t - A.stepT, reg = spring(sD - .03, .5, .26) + spring(sT, .5, .26);
    const land = A.batu2 + 4 * .022 + .16;
    const hit = hitOf(t, [...A.src.map(x => [x + .12, .3]), [A.hib + .2, .8], [A.tAI + .12, .5], [A.zaman + .24, .6], [land, 1]]);
    const push = 1 + (sT < 0 ? .035 * inv(.3, 8.1, sD) : lerp(.035, 0, E.outQuint(inv(0, .4, sT))) + .045 * inv(.3, 4.7, sT)) + .02 * hit;
    const roll = 3 * Math.sin(Math.PI * Math.sqrt(inv(0, .45, sT))), jit = inv(0, .3, sD);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = COL.base; ctx.fillRect(0, 0, W, H);
    ctx.translate(W / 2 + (rnd(f * 2.3) - .5) * 20 * hit, H / 2 + (rnd(f * 5.3) - .5) * (2.4 * jit + 16 * hit));
    ctx.rotate(roll * D2R); ctx.scale(push, push); ctx.translate(-W / 2, -H / 2);
    const base = ctx.getTransform();
    [c2 => { c2.scale(1.2, 1.2); wmArt(c2, t); }, discPage, titlePage, pageBg].forEach((pg, k) => {
      const y = (reg - k) * 1200; if (y <= -1150 || y >= 1150) return;
      ctx.setTransform(base); ctx.translate(0, y); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); ctx.globalAlpha = 1; pg(ctx, t); ctx.restore();
    });
    ctx.globalAlpha = 1;
    const bk = inv(A.out, A.end - .03, t);                       // burn-out into the episode
    if (bk > 0) burn(ctx, t, W / 2, H / 2, 40 * E.outCubic(inv(0, .2, bk)) + 2200 * E.inCubic(inv(.15, 1, bk)), bk, null);
    ov(ctx, 'burnA', t, A.end - .56, 1);
    const wk = inv(A.end - .2, A.end - .03, t) ** 2;
    if (wk > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(255,246,225,${wk})`; ctx.fillRect(0, 0, W, H); }
  }

  function draw(ctx, t) { (t < A.cut1 ? drawHook : t < A.back ? drawQ : t < A.cut3 ? drawRoom : drawPages)(ctx, t); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; }
  const brightK = t => t < A.ai ? 0 : t < A.cut1 ? inv(A.ai, A.cut1, t) : t < A.back ? 1 : t < A.cut3 ? pushK(t) : 1;
  const barOf = t => t < A.cut1 ? BAR * (1 - E.outExpo(inv(A.cut1 - .14, A.cut1, t))) : t < A.back ? 0 : t < A.cut3 ? BAR * (1 - E.inOutCubic(inv(A.cut3 - .55, A.cut3 - .05, t))) : 0;
  function post(o, t, f) {
    const br = brightK(t), title = br > .5;
    o.setTransform(1, 0, 0, 1, 0, 0);
    sctx.filter = 'brightness(0.58) contrast(2.8) saturate(0.7) blur(7px)'; sctx.drawImage(o.canvas, 0, 0, 480, 270);   // halation
    o.globalCompositeOperation = 'screen'; o.globalAlpha = lerp(.34, .10, br); o.drawImage(small, 0, 0, W, H);
    o.globalCompositeOperation = 'source-over'; o.globalAlpha = 1;
    o.fillStyle = `rgba(0,0,0,${rnd(f * 3.1) * lerp(.06, .03, br)})`; o.fillRect(0, 0, W, H);            // lamp flicker
    if (rnd(f + 7) > .5) { o.fillStyle = title ? 'rgba(60,30,8,.16)' : 'rgba(255,238,206,.16)'; o.fillRect(rnd(f * 1.7) * W, 0, 1.5, H); }
    for (let i = 0, n = Math.floor(rnd(f + 3) * 4); i < n; i++) {                                        // dust on the print
      o.fillStyle = title ? 'rgba(40,20,6,.5)' : 'rgba(255,236,200,.4)'; o.beginPath();
      o.ellipse(rnd(f * 9.1 + i) * W, rnd(f * 4.7 + i) * H, 1.5 + 4 * rnd(f + i), 1 + 2.5 * rnd(f * 2 + i), rnd(i + f) * 3, 0, 7); o.fill();
    }
    for (const [col, a] of [['6,3,1', .62 * (1 - br)], ['70,34,8', .5 * br]]) {
      if (a <= .01) continue; const v = o.createRadialGradient(W / 2, H / 2, H * .5, W / 2, H / 2, W * .64);
      v.addColorStop(0, `rgba(${col},0)`); v.addColorStop(1, `rgba(${col},${a})`); o.fillStyle = v; o.fillRect(0, 0, W, H);
    }
    const bar = barOf(t);                                                                                // 2.35:1 in the dark rooms
    if (bar > .5) { o.fillStyle = '#000'; o.fillRect(0, 0, W, bar); o.fillRect(0, H - bar, W, bar); }
  }
  return scene;
}
