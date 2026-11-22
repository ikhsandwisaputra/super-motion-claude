// Penutup (VO 10, ±42 s): kartu G0 "ASLI atau SALINAN?", lime selalu = ASLI. Dunia: ruang gelap channel (layar akhir menyatu).
// S1 Intinya     : B-roll jaringan (switch berkedip) + tiga jalan belajar AI dari Bab 3; di "bergantung" batang lime TULISAN MANUSIA
//                  turun di atas dan ketiganya MENGGANTUNG di tali (bandul teredam) — "bergantung" dibuat harfiah.
// S2 Suara asli  : "kabar baik" + senyum digores; mesin = paduan suara satu nada (baris teks seragam, naik-turun serempak);
//                  SUARA (tiap huruf font & nada sendiri) ASLI (lime) = LANGKA. TEKNIK BARU "Selam Lubang Huruf": kamera menyelam
//                  menembus lubang (counter) huruf A pada ASLI; di dalam lubang sudah terlihat kotak komentar penonton.
//                  Lubang dihitung saat load (flood-fill luar + jarak chamfer → lingkaran dalam), zoom ~eksponensial ke pusatnya.
// S3 Giliran kamu: kotak komentar (UI, bukan kartu): fokus garis bawah ala YouTube, ketik, blanko nama bahasa daerah berputar.
// S4 Berikutnya  : MAHAL + garis naik → kartu video berikutnya (tangan + pena Ahpo A01-1) "Siapa yang Dibayar untuk Mengajari AI?".
// S5 Kuota aman  : notifikasi hook dibangun ulang (Plus Jakarta Sans): coret ditarik, "Kuota data aman" + centang lime; bar isi
//                  internet terisi lime "dari tulisan asli kita" → layar akhir (subscribe, dua slot kanan untuk elemen YouTube).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DISP, SER, MONO, D2R, rnd, mk, timing, makeChapter,
  loadImg, loadVid, plate, fall, typeOn, markLine, slab, txt } from './kit.js';
import { kq, pop, popAt } from './draw.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const SANS = (s, w = 600) => `${w} ${s}px "Plus Jakarta Sans"`;
const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
const tick = (c, x, y, s, k) => { c.beginPath(); c.moveTo(x - s * .5, y); c.lineTo(x - s * .5 + s * .35 * Math.min(1, k * 2), y + s * .35 * Math.min(1, k * 2));
  if (k > .5) c.lineTo(x - s * .15 + s * .65 * (k - .5) * 2, y + s * .35 - s * .75 * (k - .5) * 2); c.stroke(); };

// "Selam Lubang Huruf": counter (enclosed hole) of a glyph, found once at load
function counterOf(ch, FS = 900) {
  const N = 1000, OX = 60, OY = 950, [c, g] = mk(N, N); setFont(g, DSP(FS)); g.fillStyle = '#fff'; g.textBaseline = 'alphabetic'; g.fillText(ch, OX, OY);
  const d = g.getImageData(0, 0, N, N).data, NN = N * N, ink = new Uint8Array(NN), ext = new Uint8Array(NN), q = new Int32Array(NN);
  for (let i = 0; i < NN; i++) ink[i] = d[i * 4 + 3] > 110 ? 1 : 0;
  let qh = 0, qt = 0; const push = i => { if (!ink[i] && !ext[i]) { ext[i] = 1; q[qt++] = i; } };
  for (let x = 0; x < N; x++) { push(x); push(NN - N + x); } for (let y = 0; y < N; y++) { push(y * N); push(y * N + N - 1); }
  while (qh < qt) { const i = q[qh++], x = i % N; if (x > 0) push(i - 1); if (x < N - 1) push(i + 1); if (i >= N) push(i - N); if (i < NN - N) push(i + N); }
  const D = new Float32Array(NN); let any = 0;
  for (let i = 0; i < NN; i++) { const cn = !ink[i] && !ext[i]; D[i] = cn ? 1e9 : 0; any += cn; }
  if (!any) return null;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x; if (!D[i]) continue; let v = D[i];
    if (x > 0) v = Math.min(v, D[i - 1] + 1); if (y > 0) { v = Math.min(v, D[i - N] + 1); if (x > 0) v = Math.min(v, D[i - N - 1] + 1.414); if (x < N - 1) v = Math.min(v, D[i - N + 1] + 1.414); } D[i] = v; }
  for (let y = N - 1; y >= 0; y--) for (let x = N - 1; x >= 0; x--) { const i = y * N + x; if (!D[i]) continue; let v = D[i];
    if (x < N - 1) v = Math.min(v, D[i + 1] + 1); if (y < N - 1) { v = Math.min(v, D[i + N] + 1); if (x < N - 1) v = Math.min(v, D[i + N + 1] + 1.414); if (x > 0) v = Math.min(v, D[i + N - 1] + 1.414); } D[i] = v; }
  let r = 0, bi = 0; for (let i = 0; i < NN; i++) if (D[i] > r) { r = D[i]; bi = i; }
  const out = g.createImageData(N, N), R = 3;                    // counter, dilated 3 px so it slips under the (re-drawn) ink edge
  for (let i = 0; i < NN; i++) if (D[i] > 0) { const x = i % N, y = (i / N) | 0;
    for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) { const j = (y + dy) * N + x + dx; if (j >= 0 && j < NN) out.data[j * 4 + 3] = 255; } }
  const [m, mg] = mk(N, N); mg.putImageData(out, 0, 0);
  return { m, FS, OX, OY, cx: bi % N, cy: (bi / N) | 0, r };
}

export function makeFilm() {
  const { T: A } = timing(B);
  const DUR = B.END + B.VOFF + B.TAIL, E0 = A.isinya + .55;            // end screen starts after the last word
  const D0 = A.sekarang - .55, D1 = A.sekarang + .02;                    // the dive through the A of ASLI
  const IM = {}; let CM = null; const [OC, og] = mk(W, H);
  async function load() {
    IM.jar = await loadVid('../assets/vid/', 'jaringan');
    IM.hand = await loadImg('../assets/shared/ahpo/A01/A01-1_tangan-pena_H2-2.png', 900);
    await document.fonts.load(SANS(40, 800)); await document.fonts.load(SANS(40, 400)); await document.fonts.load(SANS(40, 600)); await document.fonts.load(SANS(40, 700));
    CM = counterOf('A');
  }

  // ── S1 · Intinya ───────────────────────────────────────────────────────────────────────────────────────────
  const WAYS = [['DATA SINTETIS', 40, -40, 1.7], ['BELAJAR SENDIRI', 360, 40, 1.35], ['DUNIA NYATA', 660, -90, 1.9]];
  function drawIntinya(ctx, t) {
    const a0 = ctx.globalAlpha, hg = E.outCubic(inv(A.bergantung - .05, A.bergantung + .45, t)), BY = -430;
    plate(ctx, IM.jar, t, 360, 80 - 24 * hg, 960, 540, E.outQuint(inv(.1, .9, t)), { t0: 0, grade: 'saturate(.55) contrast(1.15) brightness(.86)', grain: .18 });
    const dim = 1 - .55 * kq(t, A.tapi, .5);
    ctx.globalAlpha = a0 * dim * kq(t, A.intinya + .1, .4); ctx.fillStyle = LIME; ctx.fillRect(-820, -345, 13, 13);
    ctx.globalAlpha = a0 * dim; txt(ctx, 'INTINYA SIMPEL', -796, -332, t, A.intinya + .1, MN(22), { ls: 6, col: ivo(.78) });
    fall(ctx, 'AI NGGAK', -824, -120, t, A.ai, DSP(170), { ls: 2 });
    fall(ctx, 'KEHABISAN', -824, 50, t, A.kehabisan - .05, DSP(170), { ls: 2 });
    txt(ctx, 'cara belajar.', -818, 168, t, A.cara, SRF(84), { col: ivo(.92) });
    ctx.globalAlpha = a0;
    const kb = E.outQuint(inv(A.bergantung - .1, A.bergantung + .3, t));            // the anchor bar: human writing
    if (kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(-820, BY - 50, 1640 * kb, 100);
      ctx.save(); ctx.beginPath(); ctx.rect(-820, BY - 50, 1640 * kb, 100); ctx.clip();
      fall(ctx, 'TULISAN MANUSIA', -790, BY + 32, t, A.tulisan - .02, DSP(86), { ls: 3, col: LIME_INK, drop: -40, stag: .02 });
      txt(ctx, 'yang jujur.', 790, BY + 26, t, A.jujur - .02, SRF(62), { align: 'right', col: LIME_INK }); ctx.restore(); }
    WAYS.forEach(([s, x, y, f], i) => {                                                  // three ways: pop on the plate, then hang
      const t0 = A.belajar + i * .13; if (t <= t0) return; const tb = A.bergantung + .02 + i * .06;
      const L = y - BY, ks = E.outCubic(inv(tb, tb + .3, t)), u = Math.max(0, t - tb);
      const th = ks > 0 ? (9 * Math.exp(-u * 1.3) * Math.sin(u * f * 2 * Math.PI) - 4 * (1 - ks) * (i - 1)) * D2R : 0;
      ctx.save(); ctx.translate(x, BY); ctx.rotate(th);
      if (ks > 0) { ctx.strokeStyle = ivo(.75); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(0, 50 + (L - 70 - 24 * hg) * ks); ctx.stroke();
        ctx.fillStyle = LIME_INK; ctx.beginPath(); ctx.arc(0, 50, 7, 0, 7); ctx.fill(); }
      slab(ctx, s, 0, L - 24 * hg, t, t0, { size: 21, align: 'center' }); ctx.restore();
    });
  }

  // ── S2 · Suara asli (+ the dive) ──────────────────────────────────────────────────────────────────────────
  const CHOIR = 'SEBAGAI MODEL BAHASA, SAYA TIDAK MEMILIKI PENDAPAT PRIBADI · ';
  const SUARA = [['S', SRF, 300], ['U', DSP, 285], ['A', MN, 220], ['R', SRF, 300], ['A', DSP, 285]];
  const AS = 285;                                                                         // ASLI size (League Gothic)
  function lineGeom(ctx) {                                                                // "SUARA ASLI" laid out once per call (fonts are cached)
    let w = 0; const xs = [];
    for (const [ch, F, s] of SUARA) { setFont(ctx, F === MN ? F(s, 700) : F(s)); xs.push(w); w += ctx.measureText(ch).width + 10; }
    setFont(ctx, DSP(AS), 6); const gap = 46, wa = ctx.measureText('ASLI').width, aw = ctx.measureText('A').width + 6;
    const x0 = -(w + gap + wa + 40) / 2; return { x0, xs, xa: x0 + w + gap + 20, wa, aw };
  }
  function drawSuara(ctx, t) {
    const a0 = ctx.globalAlpha, Y1 = 10, Y2 = 250;
    const u = inv(D0, D1, t), kd = E.inCubic(u), m = E.outCubic(clamp(u * 1.7));
    const G = lineGeom(ctx), bobA = (t > A.asli ? 5 * Math.sin(t * 2 * Math.PI * .8 + 1) : 0) * (1 - clamp(u * 4));
    const ax = G.xa, ay = Y1 + bobA, S = AS / (CM ? CM.FS : 1);
    const P = CM ? { x: ax + (CM.cx - CM.OX) * S, y: ay + (CM.cy - CM.OY) * S } : { x: ax + G.aw / 2, y: ay - AS * .3 };
    const Z = CM ? 1250 / (CM.r * S) : 60, z = Math.pow(Z, kd);
    const Tz = c => { c.translate(P.x * (1 - m), P.y * (1 - m)); c.scale(z, z); c.translate(-P.x, -P.y); };
    ctx.save(); Tz(ctx);
    if (z < 3) {
      // opening: "menurutku, ini KABAR BAIK." + a smile scratched under it, leaves before the machines
      const ko = 1 - E.inCubic(inv(A.di - .15, A.di + .25, t)), ky = -260 * E.inCubic(inv(A.di - .15, A.di + .3, t));
      if (ko > 0) { ctx.save(); ctx.translate(0, ky); ctx.globalAlpha = a0 * ko;
        txt(ctx, 'menurutku, ini', -560, -190, t, A.menurutku + .05, SRF(72), { col: ivo(.9) });
        const wk = fall(ctx, 'KABAR BAIK.', -566, 40, t, A.kabar - .05, DSP(260), { ls: 4 });
        const ks = E.outCubic(inv(A.senyum - .05, A.senyum + .4, t));
        if (ks > 0 && wk) { const xa = -566 + wk * .52, xb = -566 + wk * .97, L = (xb - xa) * 1.25; ctx.strokeStyle = IVORY; ctx.lineWidth = 9; ctx.lineCap = 'round';
          ctx.setLineDash([L * ks, L]); ctx.beginPath(); ctx.moveTo(xa, 100); ctx.quadraticCurveTo((xa + xb) / 2, 170, xb, 92); ctx.stroke(); ctx.setLineDash([]); }
        ctx.restore(); }
      // the machine choir: identical rows, one shared phase (scroll + bob in lockstep)
      const kc = kq(t, A.di - .05, .5); if (kc > 0) {
        const lit = 1 - .62 * kq(t, A.langka - .1, .5), bob = 9 * Math.sin((t - A.di) * 2 * Math.PI * 1.25), sx = ((t - A.di) * 140) % 1400;
        setFont(ctx, MN(27, 400), 2); ctx.fillStyle = ivo(.36 * lit); ctx.textAlign = 'left';
        for (let r = 0; r < 17; r++) { const kr = clamp((t - A.di + .05 - r * .025) / .2); if (kr <= 0) continue;
          ctx.globalAlpha = a0 * kc * kr; const y = -500 + r * 64 + bob;
          ctx.fillText(CHOIR + CHOIR + CHOIR, -1100 - sx, y); }
        ctx.globalAlpha = a0;
        if (t > A.mesin) { ctx.fillStyle = '#0B0C09'; ctx.globalAlpha = a0 * kq(t, A.mesin, .25); ctx.fillRect(-836, -462, 372, 44); ctx.globalAlpha = a0;
          ctx.fillStyle = LIME; ctx.fillRect(-820, -446, 11, 11); }
        txt(ctx, 'MESIN · SATU NADA', -798, -432, t, A.mesin, MN(20), { ls: 6, col: ivo(.75 * lit) });
      }
      // "= LANGKA": wide tracking (rare = far apart), lands before its subject
      if (t > A.langka - .06) { const kl = E.outQuint(inv(A.langka - .06, A.langka + .5, t)), ls = lerp(90, 34, kl);
        ctx.globalAlpha = a0 * clamp(kl * 2); setFont(ctx, DSP(210), ls); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('= LANGKA', 0, Y2 + (1 - kl) * 40);
        ctx.textAlign = 'left'; ctx.globalAlpha = a0; }
      // SUARA: every letter its own font and its own pitch (breaks the unison)
      SUARA.forEach(([ch, F, s], i) => { const t0 = A.suara - .04 + i * .05, k = pop(t, t0, .5, .3); if (k <= 0) return;
        const yb = 8 * Math.sin(t * 2 * Math.PI * (.6 + rnd(i + 3) * 1.3) + i * 1.7);
        ctx.save(); ctx.globalAlpha = a0 * clamp((t - t0) / .08); ctx.translate(G.x0 + G.xs[i], Y1 + yb + (1 - k) * 70);
        setFont(ctx, F === MN ? F(s, 700) : F(s)); ctx.fillStyle = IVORY; ctx.fillText(ch, 0, 0); ctx.restore(); });
    }
    // ASLI on the lime marker (the A stays: we dive through its counter)
    const kA = E.outQuint(inv(A.asli - .06, A.asli + .3, t));
    if (kA > 0) { ctx.globalAlpha = a0; ctx.fillStyle = LIME; ctx.fillRect(ax - 20, Y1 - AS * .78, (G.wa + 40) * kA, AS * .9);
      setFont(ctx, DSP(AS), 6); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left';
      ['A', 'S', 'L', 'I'].forEach((ch, i) => { if (kA < .3 + i * .15) return; setFont(ctx, DSP(AS), 6);
        const dx = ctx.measureText('ASLI'.slice(0, i)).width, yb = i ? 4 * Math.sin(t * 2 * Math.PI * (.7 + i * .23) + i) * (1 - clamp(u * 4)) : bobA;
        ctx.fillText(ch, ax + dx, Y1 + yb); }); }
    ctx.restore();
    if (u <= 0 || !CM) return;
    // inside the counter: the viewer's comment box, already waiting (drawn flat, grows from far to its station size)
    og.setTransform(1, 0, 0, 1, 0, 0); og.globalCompositeOperation = 'source-over'; og.globalAlpha = 1; og.filter = 'none';
    og.fillStyle = '#0B0C09'; og.fillRect(0, 0, W, H);
    og.save(); og.translate(W / 2, H / 2); const sc = lerp(.42, 1, E.inCubic(u)); og.scale(sc, sc); drawKomen(og, t, true); og.restore();
    og.globalCompositeOperation = 'destination-in'; og.setTransform(1, 0, 0, 1, W / 2, H / 2); Tz(og); og.translate(ax, ay); og.scale(S, S); og.translate(-CM.OX, -CM.OY);
    og.drawImage(CM.m, 0, 0); og.setTransform(1, 0, 0, 1, 0, 0); og.globalCompositeOperation = 'source-over';
    ctx.save(); ctx.globalAlpha = a0 * clamp(u * 6); ctx.drawImage(OC, -W / 2, -H / 2); ctx.restore();
    ctx.save(); Tz(ctx); setFont(ctx, DSP(AS), 6); ctx.fillStyle = LIME_INK; ctx.textAlign = 'left'; ctx.fillText('A', ax, ay); ctx.restore();
  }

  // ── S3 · Giliran kamu: the comment box ────────────────────────────────────────────────────────────────────
  const BAHASA = ['Jawa', 'Sunda', 'Minang', 'Batak', 'Bugis', 'Banjar', 'Bali', 'Sasak', 'Madura', 'Betawi', 'Aceh', 'Dayak'];
  function drawKomen(ctx, t, flat) {
    const a0 = ctx.globalAlpha, X = -560, R1 = -30, R2 = 56;
    if (!flat) fall(ctx, 'GILIRAN KAMU CERITA.', 0, -300, t, A.giliran - .05, DSP(150), { align: 'center', ls: 3 });
    setFont(ctx, SANS(36, 700)); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('Komentar', -680, -150);
    setFont(ctx, MN(18, 400), 3); ctx.fillStyle = ivo(.55); ctx.fillText('URUTKAN: TERBARU', -470, -152);
    ctx.fillStyle = ivo(.16); ctx.beginPath(); ctx.arc(-640, R1 - 14, 42, 0, 7); ctx.fill();                     // avatar: you
    ctx.fillStyle = ivo(.55); ctx.beginPath(); ctx.arc(-640, R1 - 26, 14, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(-640, R1 + 10, 25, 15, 0, Math.PI, 0); ctx.fill();
    const tf = A.tulis - .02, kf = E.outCubic(inv(tf, tf + .35, t));                                           // focus: underline grows from the centre
    ctx.fillStyle = ivo(.3); ctx.fillRect(X, R2 + 44, 1240, 2); if (kf > 0) { ctx.fillStyle = IVORY; ctx.fillRect(X + 620 - 620 * kf, R2 + 43, 1240 * kf, 3); }
    setFont(ctx, SANS(44, 500)); ctx.textAlign = 'left';
    if (t < tf + .1) { ctx.fillStyle = ivo(.45); ctx.fillText('Tambahkan komentar…', X, R1); }
    const L1 = 'Bahasa daerahku: ', L2 = 'Pernah kutulis di internet: ', c1 = Math.min(L1.length, Math.ceil(Math.max(0, t - A.tulis - .1) * 30)),
      c2 = Math.min(L2.length, Math.ceil(Math.max(0, t - A.pernah + .05) * 34));
    ctx.fillStyle = IVORY; if (c1) ctx.fillText(L1.slice(0, c1), X, R1); if (c2) ctx.fillText(L2.slice(0, c2), X, R2);
    const w1 = ctx.measureText(L1).width, w2 = ctx.measureText(L2).width;
    const kB = kq(t, A.bahasa - .15, .35);                                                                       // the blank + rolling languages
    if (kB > 0 && c1 === L1.length) { const bx = X + w1, BW = 250; ctx.fillStyle = LIME; ctx.fillRect(bx, R1 + 12, BW * kB, 4);
      const v = Math.max(0, t - A.bahasa) * 3.2, n = Math.floor(v), f = E.snap(clamp((v - n) * 2.4));
      ctx.save(); ctx.beginPath(); ctx.rect(bx, R1 - 50, BW, 64); ctx.clip(); setFont(ctx, SANS(44, 600)); ctx.fillStyle = ivo(.62);
      ctx.fillText(BAHASA[n % BAHASA.length], bx + 14, R1 - 56 * f); ctx.fillText(BAHASA[(n + 1) % BAHASA.length], bx + 14, R1 + 56 * (1 - f)); ctx.restore(); }
    const kY = kq(t, A.nulis + .1, .3);                                                                          // ya / belum + a hovering cursor
    if (kY > 0 && c2 === L2.length) { setFont(ctx, SANS(44, 600)); const xy = X + w2, wy = ctx.measureText('ya').width, ws = ctx.measureText(' / ').width, wb = ctx.measureText('belum').width;
      ctx.globalAlpha = a0 * kY; ctx.fillStyle = IVORY; ctx.fillText('ya', xy, R2); ctx.fillStyle = ivo(.5); ctx.fillText(' / ', xy + wy, R2); ctx.fillStyle = IVORY; ctx.fillText('belum', xy + wy + ws, R2);
      const h = Math.max(0, t - A.internet + .35), sw = .5 - .5 * Math.cos(Math.min(h, 99) * 2.1), ph = h > 0 ? sw : 0;
      const ux = lerp(xy, xy + wy + ws, E.inOutCubic(ph)), uw = lerp(wy, wb, E.inOutCubic(ph));
      if (h > 0) { ctx.fillStyle = LIME; ctx.fillRect(ux, R2 + 12, uw, 4); drawCursor(ctx, ux + uw * .6, R2 + 22, 1.3, a0 * kY * clamp(h * 4)); }
      ctx.globalAlpha = a0; }
    const on = Math.floor(t * 2.2) % 2 === 0, cx = c2 ? (c2 < L2.length ? X + ctx.measureText(L2.slice(0, c2)).width : null) : (c1 ? X + ctx.measureText(L1.slice(0, c1)).width : (t > tf ? X : null));
    setFont(ctx, SANS(44, 500)); if (cx !== null && (on || (c1 && c1 < L1.length) || (c2 && c2 < L2.length))) { ctx.fillStyle = LIME; ctx.fillRect(cx + 3, (c2 ? R2 : R1) - 40, 4, 50); }
    const en = t > A.tulis + .3;                                                                                 // Batal / Komentar
    setFont(ctx, SANS(30, 600)); ctx.textAlign = 'center'; ctx.fillStyle = ivo(kf > 0 ? .8 : 0); ctx.fillText('Batal', 380, R2 + 128);
    ctx.fillStyle = en ? IVORY : ivo(.12); rr(ctx, 460, R2 + 86, 220, 64, 32); ctx.fill(); ctx.fillStyle = en ? '#11120E' : ivo(.4); ctx.fillText('Komentar', 570, R2 + 128); ctx.textAlign = 'left';
  }
  function drawCursor(o, x, y, cs, a) {
    o.save(); o.globalAlpha = a; o.translate(x, y); o.scale(cs, cs); o.shadowColor = 'rgba(0,0,0,.5)'; o.shadowBlur = 12; o.shadowOffsetY = 5;
    o.beginPath(); o.moveTo(0, 0); o.lineTo(0, 34); o.lineTo(8, 26); o.lineTo(14, 39); o.lineTo(20, 36); o.lineTo(14, 23); o.lineTo(25, 23); o.closePath();
    o.fillStyle = '#fff'; o.fill(); o.shadowColor = 'transparent'; o.strokeStyle = '#11120E'; o.lineWidth = 2; o.lineJoin = 'round'; o.stroke(); o.restore();
  }

  // ── S4 · Berikutnya: the next-video card ──────────────────────────────────────────────────────────────────
  function card(ctx, t, tc) {                                         // 1000 × 562, centred; tc: time of the pen tick (or null)
    const w = 1000, h = 562; ctx.save(); rr(ctx, -w / 2, -h / 2, w, h, 20); ctx.clip();
    const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, '#23241D'); g.addColorStop(1, '#0D0E0A'); ctx.fillStyle = g; ctx.fillRect(-w / 2, -h / 2, w, h);
    if (IM.hand) { const hh = 470, hw = hh * IM.hand.width / IM.hand.height; ctx.drawImage(IM.hand, 300 - hw * .58, 205 - hh * .97, hw, hh); }
    const gl = ctx.createLinearGradient(-w / 2, 0, 120, 0); gl.addColorStop(0, 'rgba(13,14,10,.92)'); gl.addColorStop(.7, 'rgba(13,14,10,.55)'); gl.addColorStop(1, 'rgba(13,14,10,0)');
    ctx.fillStyle = gl; ctx.fillRect(-w / 2, -h / 2, 620, h);
    if (tc !== null) { const k = E.outCubic(inv(tc, tc + .35, t)); if (k > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; tick(ctx, 340, 150, 90, k); } }
    setFont(ctx, MN(17, 700), 4); ctx.fillStyle = ivo(.7); ctx.textAlign = 'left'; ctx.fillText('RELENTLESS NON-CONFORMIST', -450, -205);
    setFont(ctx, DSP(96), 2); ctx.fillStyle = IVORY; ctx.fillText('SIAPA YANG', -450, -40); ctx.fillText('DIBAYAR UNTUK', -450, 60); ctx.fillText('MENGAJARI AI?', -450, 160);
    ctx.restore(); ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; rr(ctx, -w / 2, -h / 2, w, h, 20); ctx.stroke();
  }
  function drawNext(ctx, t) {
    const a0 = ctx.globalAlpha, kz = kq(t, A.siapa - .1, .45), ko = (1 - .7 * kq(t, A.sebenarnya - .1, .5)) * (1 - .82 * kz), sh = -60 * kq(t, A.sebenarnya - .1, .6) - 60 * kz;
    ctx.save(); ctx.globalAlpha = a0 * ko; ctx.translate(sh, -130 * E.inOutCubic(kz));
    txt(ctx, 'kalau tulisan manusia', -820, -250, t, A.kalau + .05, SRF(66), { col: ivo(.92) });
    txt(ctx, 'makin', -820, -150, t, A.makin2 - .05, SRF(66), { col: ivo(.92) });
    const wm = fall(ctx, 'MAHAL.', -824, 110, t, A.mahal - .04, DSP(260), { ls: 4 });
    const kr = E.outCubic(inv(A.mahal - .05, A.mahal + .55, t));                                       // the price line climbs
    if (kr > 0) { const pts = [[-820, 230], [-700, 214], [-610, 222], [-500, 180], [-410, 190], [-300, 120], [-230, 64]]; let len = 0; const sg = [];
      for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); sg.push(l); len += l; }
      ctx.strokeStyle = ivo(.8); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.setLineDash([len * kr, len]); ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.setLineDash([]);
      let rem = len * kr, ex = pts[0][0], ey = pts[0][1]; for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / sg[i - 1]); ex = lerp(pts[i - 1][0], pts[i][0], f); ey = lerp(pts[i - 1][1], pts[i][1], f); rem -= sg[i - 1]; }
      ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(ex, ey, 10, 0, 7); ctx.fill(); }
    ctx.restore(); ctx.globalAlpha = a0;
    const kq2 = E.outQuint(inv(A.siapa - .05, A.siapa + .4, t));                                      // the big question mark
    if (kq2 > 0) { ctx.save(); ctx.globalAlpha = a0 * kq2; ctx.translate(-640, 250 - 60 * (1 - kq2)); ctx.rotate((1 - kq2) * -14 * D2R + 3 * Math.sin(t * 2.2) * D2R);
      setFont(ctx, SRF(470)); ctx.fillStyle = IVORY; ctx.textAlign = 'center'; ctx.fillText('?', 0, 0); ctx.restore(); ctx.globalAlpha = a0; }
    const kc = E.outQuint(inv(A.orang - .12, A.orang + .55, t)); if (kc <= 0) return;                // the card flies in from the right
    const push = 1 + .035 * E.inOutSine(inv(A.orang, A.dan2, t)), lift = -14 * kq(t, A.berikutnya - .1, .5);
    ctx.save(); ctx.globalAlpha = a0 * clamp(kc * 2); ctx.translate(300 + 760 * (1 - kc), 30 + lift); ctx.rotate((1 - kc) * 7 * D2R); ctx.scale(push, push);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 30; ctx.fillStyle = '#0D0E0A'; rr(ctx, -500, -281, 1000, 562, 20); ctx.fill(); ctx.shadowColor = 'transparent';
    card(ctx, t, A.ngajarin - .05);
    ctx.fillStyle = LIME; ctx.fillRect(-500, -330, 13, 13); setFont(ctx, MN(20, 700), 5); ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.fillText('VIDEO BERIKUTNYA', -476, -318);
    const kp = E.inOutCubic(inv(A.cerita2 - .1, A.berikutnya + .5, t));                               // "itu cerita kita berikutnya": the queue bar fills
    ctx.fillStyle = ivo(.18); ctx.fillRect(-500, 305, 1000, 6); ctx.fillStyle = IVORY; ctx.fillRect(-500, 305, 1000 * kp, 6);
    if (kp > 0) { setFont(ctx, MN(18, 400), 3); ctx.fillStyle = ivo(.7); ctx.textAlign = 'right'; ctx.fillText(kp < 1 ? 'MEMUAT…' : 'SEGERA TAYANG', 500, 350); ctx.textAlign = 'left'; }
    ctx.restore();
  }

  // ── S5 · Kuota aman: the hook's notification comes back ───────────────────────────────────────────────────
  const roll = (ctx, a, b, x, y, k, d = 46) => { const a0 = ctx.globalAlpha;
    if (k < 1) { ctx.globalAlpha = a0 * (1 - k); ctx.fillText(a, x, y - d * k); } if (k > 0) { ctx.globalAlpha = a0 * k; ctx.fillText(b, x, y + d * (1 - k)); } ctx.globalAlpha = a0; };
  function drawNotif(ctx, t) {
    const a0 = ctx.globalAlpha, d0 = A.dan2, kg = pop(t, d0 + .02, .62, .34), kf = pop(t, d0 + .14, .62, .34);
    const up = E.outQuint(inv(A.kuotamu - .1, A.kuotamu + .45, t)), km = E.outQuint(inv(A.aman - .04, A.aman + .3, t)), ks = E.inOutCubic(inv(A.aman - .32, A.aman - .04, t));
    const kj = E.outQuint(inv(A.jaga - .05, A.jaga + .35, t)), ki = E.outCubic(inv(A.isinya - .05, A.isinya + .9, t));
    const fade = 1 - .8 * E.inOutCubic(inv(E0, E0 + 1.2, t)), fl = 6 * Math.sin(t * 1.3);
    ctx.save(); ctx.globalAlpha = a0 * fade; ctx.scale(.98, .98); ctx.translate(-700, -440 + 70 + fl);
    // operator card (behind): kuota
    ctx.save(); ctx.globalAlpha = a0 * fade * clamp(kg * 3); ctx.translate(0, -280 * (1 - Math.min(1, kg)) - 120 * up);
    ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20; ctx.fillStyle = up > .5 ? '#5E5E58' : '#575752'; rr(ctx, 93, 20, 1214, 330, 48); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#6E6E68'; rr(ctx, 145, 62, 84, 84, 20); ctx.fill();
    setFont(ctx, SANS(34, 700), 5); ctx.fillStyle = '#A4A39B'; ctx.textAlign = 'left'; ctx.fillText('OPERATOR', 255, 118);
    setFont(ctx, SANS(30, 400)); ctx.fillStyle = '#8A8A82'; ctx.textAlign = 'right'; roll(ctx, '2 jam lalu', 'sekarang', 1255, 116, km, 30); ctx.textAlign = 'left';
    ctx.save(); ctx.beginPath(); ctx.rect(120, 150, 1100, 100); ctx.clip(); setFont(ctx, SANS(56, 800)); ctx.fillStyle = '#DCDAD0';
    const wo = ctx.measureText('Kuota data hampir habis').width; roll(ctx, 'Kuota data hampir habis', 'Kuota data aman', 145, 226, km, 60);
    if (km < 1) { ctx.globalAlpha = a0 * fade * (1 - km); ctx.fillRect(145, 206, wo * (1 - ks), 4); } ctx.restore();
    popAt(ctx, 1222, 206, t, A.aman, () => { ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, 0, 40, 0, 7); ctx.fill(); ctx.strokeStyle = LIME_INK; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      tick(ctx, 4, -4, 44, E.outCubic(inv(A.aman + .05, A.aman + .3, t))); }, { from: .3 });
    const kr = inv(A.aman, A.aman + .55, t); if (kr > 0 && kr < 1) { ctx.globalAlpha = a0 * fade * (1 - kr) * .8; ctx.strokeStyle = LIME; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(1222, 206, 40 + 46 * E.outCubic(kr), 0, 7); ctx.stroke(); }
    ctx.restore();
    // internet card (front): isi
    ctx.save(); ctx.globalAlpha = a0 * fade * clamp(kf * 3); ctx.translate(0, -320 * (1 - Math.min(1, kf)));
    ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 70; ctx.shadowOffsetY = 28; const gc = ctx.createLinearGradient(0, 262, 0, 782); gc.addColorStop(0, '#F1EFE6'); gc.addColorStop(1, '#E6E3DA');
    ctx.fillStyle = gc; rr(ctx, 40, 262, 1320, 520, 48); ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#11120E'; rr(ctx, 96, 308, 92, 92, 20); ctx.fill(); ctx.strokeStyle = LIME; ctx.lineWidth = 4.5;
    ctx.beginPath(); ctx.arc(142, 354, 25, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(142, 354, 11, 25, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(117, 354); ctx.lineTo(167, 354); ctx.moveTo(121, 341); ctx.lineTo(163, 341); ctx.moveTo(121, 367); ctx.lineTo(163, 367); ctx.stroke();
    setFont(ctx, SANS(34, 700), 5); ctx.fillStyle = '#4A4A45'; ctx.textAlign = 'left'; ctx.fillText('INTERNET', 214, 367);
    setFont(ctx, SANS(30, 400)); ctx.fillStyle = '#7A7A72'; ctx.textAlign = 'right'; ctx.fillText('sekarang', 1304, 366); ctx.textAlign = 'left';
    setFont(ctx, SANS(64, 800)); ctx.fillStyle = '#11120E'; ctx.fillText('Isi internet hampir habis', 96, 497);
    ctx.save(); ctx.beginPath(); ctx.rect(80, 516, 1260, 120); ctx.clip(); setFont(ctx, SANS(38, 400)); ctx.fillStyle = '#3A3A35';
    roll(ctx, 'Tulisan manusia yang belum dibaca AI makin menipis.', 'Yang perlu kita jaga: isinya.', 96, 566, kj, 40);
    roll(ctx, 'Isi ulang: belum tersedia.', 'Isi ulang: dari tulisan asli kita.', 96, 620, kj, 40); ctx.restore();
    ctx.fillStyle = '#D3D0C6'; rr(ctx, 96, 664, 1208, 22, 11); ctx.fill(); ctx.fillStyle = '#11120E'; rr(ctx, 96, 664, 72, 22, 11); ctx.fill();
    if (ki > 0) { ctx.fillStyle = LIME; rr(ctx, 150, 664, 18 + 560 * ki, 22, 11); ctx.fill(); ctx.strokeStyle = 'rgba(27,36,0,.35)'; ctx.lineWidth = 1.5; ctx.stroke(); }
    setFont(ctx, SANS(28, 600)); ctx.fillStyle = '#6A6A62'; ctx.fillText('sisa tulisan baru', 96, 730); ctx.textAlign = 'right';
    ctx.save(); ctx.beginPath(); ctx.rect(900, 696, 420, 50); ctx.clip(); roll(ctx, 'menipis', 'kita isi', 1304, 730, E.outQuint(inv(A.isinya - .05, A.isinya + .3, t)), 34); ctx.restore();
    ctx.textAlign = 'left'; ctx.restore();
    ctx.restore(); ctx.globalAlpha = a0;
  }

  // ── end screen (screen space): subscribe left, two slots right (kept clear for YouTube end-screen elements) ────
  function subscribe(o, t) {
    const m = E0, c1 = m + 1.86, c2 = m + 2.91, BX = 146, BY = 730, BW = 430, BH = 108;
    const kb = E.outQuint(inv(m + .4, m + 1.0, t)); if (kb <= 0) return;
    const on = t > c1 + .06, press = 1 - .06 * Math.sin(Math.PI * clamp((t - c1 + .04) / .16)), hov = .025 * clamp((t - m - 1.55) / .2) * (on ? 0 : 1);
    o.save(); o.globalAlpha = kb; o.translate(BX + BW / 2, BY + BH / 2); const s = lerp(.82, 1, kb) * (press + hov); o.scale(s, s);
    o.shadowColor = 'rgba(0,0,0,.55)'; o.shadowBlur = 40; o.shadowOffsetY = 16; o.fillStyle = on ? LIME : IVORY; rr(o, -BW / 2, -BH / 2, BW, BH, BH / 2); o.fill();
    o.shadowColor = 'transparent'; o.fillStyle = on ? LIME_INK : '#11120E'; o.beginPath(); o.arc(-BW / 2 + 56, 0, 30, 0, 7); o.fill();
    setFont(o, DSP(40), 0); o.fillStyle = on ? LIME : IVORY; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('R', -BW / 2 + 56, 2);
    setFont(o, DSP(62), 3); o.fillStyle = on ? LIME_INK : '#11120E'; o.textAlign = 'left'; o.fillText(on ? 'SUBSCRIBED' : 'SUBSCRIBE', -BW / 2 + 106, 4); o.textBaseline = 'alphabetic';
    if (on) { o.strokeStyle = LIME_INK; o.lineWidth = 7; o.lineCap = 'round'; tick(o, BW / 2 - 52, -2, 30, E.outCubic(inv(c1 + .06, c1 + .3, t))); }
    o.restore();
    const kr = inv(c1, c1 + .55, t); if (kr > 0 && kr < 1) { const e = E.outCubic(kr); o.save(); o.globalAlpha = (1 - kr) * .8; o.strokeStyle = LIME; o.lineWidth = 4;
      rr(o, BX - 30 * e, BY - 30 * e, BW + 60 * e, BH + 60 * e, BH / 2 + 30 * kr); o.stroke(); o.restore(); }
    const BLX = BX + BW + 84, kl = E.outQuint(inv(c1 + .25, c1 + .7, t));                                // bell swings silently (no ting)
    if (kl > 0) { const on2 = t > c2 + .05, sw = t > c2 ? Math.sin((t - c2) * 26) * Math.exp(-(t - c2) * 3.2) * 20 * D2R : 0;
      o.save(); o.globalAlpha = kl; o.translate(BLX, BY + BH / 2); const p2 = 1 - .07 * Math.sin(Math.PI * clamp((t - c2 + .04) / .16)); o.scale(lerp(.6, 1, kl) * p2, lerp(.6, 1, kl) * p2);
      o.fillStyle = on2 ? IVORY : 'rgba(11,12,9,.6)'; o.strokeStyle = ivo(.7); o.lineWidth = 3; o.beginPath(); o.arc(0, 0, 54, 0, 7); o.fill(); o.stroke();
      o.rotate(sw); o.translate(0, -2); o.fillStyle = on2 ? '#11120E' : IVORY; o.beginPath(); o.moveTo(-22, 14); o.lineTo(-16, 7); o.lineTo(-16, -5);
      o.bezierCurveTo(-16, -25, 16, -25, 16, -5); o.lineTo(16, 7); o.lineTo(22, 14); o.closePath(); o.fill(); o.beginPath(); o.arc(0, 19, 5, 0, 7); o.fill(); o.fillRect(-2.5, -27, 5, 6);
      o.restore(); }
    const kp = E.inOutCubic(inv(m + .9, m + 1.6, t)), kq3 = E.inOutCubic(inv(c1 + .45, c1 + .95, t)), kx = E.inOutCubic(inv(c2 + .5, c2 + 1.2, t));
    if (kp > 0) { let x = lerp(980, BX + BW * .62, kp), y = lerp(1030, BY + BH * .62, kp); x = lerp(x, BLX + 10, kq3); y = lerp(y, BY + BH / 2 + 14, kq3); x += 60 * kx; y += 40 * kx;
      const cs = 1.5 * (1 - .12 * Math.sin(Math.PI * clamp((t - c1 + .04) / .16)) - .12 * Math.sin(Math.PI * clamp((t - c2 + .04) / .16)));
      drawCursor(o, x, y, cs, clamp(kp * 3) * (1 - kx)); }
  }
  function endScreen(o, t) {
    const k = E.outCubic(inv(E0, E0 + 1.1, t)); if (k <= 0) return;
    o.setTransform(1, 0, 0, 1, 0, 0); o.filter = 'none'; o.globalCompositeOperation = 'source-over';
    const g = o.createLinearGradient(0, 0, 1180, 0); g.addColorStop(0, 'rgba(11,12,9,.88)'); g.addColorStop(.62, 'rgba(11,12,9,.6)'); g.addColorStop(1, 'rgba(11,12,9,0)'); o.globalAlpha = k; o.fillStyle = g; o.fillRect(0, 0, 1180, H);
    [[150, E0 + .25, 'VIDEO BERIKUTNYA'], [570, E0 + .55, 'PILIHAN UNTUKMU']].forEach(([y, t0, lab], i) => { const q = E.outQuint(inv(t0, t0 + .8, t)); if (q <= 0) return;
      o.save(); o.globalAlpha = q; o.translate(1120 + 320, y + 180); const s = lerp(.94, 1, q); o.scale(s, s);
      o.fillStyle = 'rgba(11,12,9,.6)'; rr(o, -320, -180, 640, 360, 18); o.fill();
      if (i === 0) { o.save(); o.scale(.64, .64); card(o, t, null); o.restore(); }
      rr(o, -320, -180, 640, 360, 18); o.setLineDash([14, 10]); o.lineDashOffset = -t * 10; o.strokeStyle = ivo(.36); o.lineWidth = 2; o.stroke(); o.setLineDash([]);
      o.fillStyle = LIME; o.fillRect(-320, -212, 11, 11); setFont(o, MN(17, 700), 4); o.fillStyle = ivo(.8); o.textAlign = 'left'; o.fillText(lab, -300, -202); o.restore(); });
    subscribe(o, t);
    o.globalAlpha = 1; const kb = kq(t, E0 + .1, .6); o.fillStyle = LIME; o.fillRect(146, 330, 120 * kb, 6);
    markLine(o, 'JAGA ', 'ISINYA', '.', 146, 480, t, E0 + .15, E0 + .55, DSP(140), { align: 'left', ls: 3 });
    txt(o, 'tulis yang asli, pakai bahasamu.', 150, 565, t, E0 + .6, SRF(50), { col: ivo(.9) });
  }

  // ── stations ─────────────────────────────────────────────────────────────────────────────────────────────
  const ST = [
    { at: 0, name: 'Intinya', draw: drawIntinya, dist: [1540, 1430] },
    { at: A.menurutku, via: 'push', name: 'Suara asli', tag: 'ASLI', draw: drawSuara, dist: [1520, 1400] },
    { at: D1, via: 'cut', lead: 0, pre: 0, name: 'Giliran kamu', draw: (ctx, t) => drawKomen(ctx, t, false), dist: [1500, 1400] },
    { at: A.kalau, via: 'whip', name: 'Berikutnya', draw: drawNext },
    { at: A.dan2, via: 'rise', name: 'Kuota aman', draw: drawNotif, yaw: [-2.5, 2],
      mod(c, t) { const k = E.inOutCubic(inv(E0 - .1, E0 + 1.8, t)); c.dist += 1900 * k; c.pitch += 2.5 * k; c.foc = c.dist * lerp(1, .78, k); } },
  ];
  for (const s of ST) {                                    // nothing of a station shows before it is reached
    const at = s.at, pre = s.pre ?? .5, wrap = fn => fn && ((ctx, t, c) => { if (s === ST[0]) return fn(ctx, t, c);
      const g = pre ? clamp((t - at + pre) / .35) : (t >= at ? 1 : 0); if (g <= 0) return; ctx.globalAlpha = g; fn(ctx, t, c); });
    s.draw = wrap(s.draw); for (const L of s.layers || []) L.fn = wrap(L.fn);
  }
  const over = (o, t) => { if (t > E0) { o.save(); endScreen(o, t); o.restore(); } };
  return makeChapter({ B, ST, load, label: 'PENUTUP', over });
}
