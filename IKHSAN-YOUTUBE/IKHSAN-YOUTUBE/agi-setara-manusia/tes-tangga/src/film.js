// Tes 3 dtk · agi-setara-manusia · dua ide headline sebelum VO:
//  A "Saklar Bisu -> Tangga": saklar dinding "AGI" diklik, lampu tetap padam; kamera naik, anak tangga menyala satu per satu.
//  B "Penggaris Elastis": model AI yang sama diukur; penggaris standar baca 62,7 %, penjepit vendor menekan penggaris
//    (garis ukur merapat lewat pegas) dan bacaan jadi 99,9 %. Bendanya tidak berubah, hanya penggarisnya.
// Angka: ARC Prize, 3 Sep 2026 (NARASI Hook). Lime hanya: kata TANGGA + jarum ukur.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, TILE, ivo, setFont, DISP, SER, MONO, DSP, SRF, MN, timing, makeChapter,
  fall, markLine, srcTag, txt, typeOn, fmt } from './kit.js';
import { spring } from './engine.js';
import { bulb } from './draw.js';

const BGC = [11, 12, 9], STEP = [30, 31, 25], TREAD = [38, 39, 32];
const rgb = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;

// anak tangga dunia (y ke bawah, lantai 0): tiap entri = riser di z, pijakan setinggi y sampai z berikutnya
function makeSteps() {
  const S = []; let y = 0, z = 900;
  const run = (n, r = 380) => { for (let i = 0; i < n; i++) { S.push({ z, y0: y, y1: y - 130 }); y -= 130; z += r; } };
  const land = len => { S[S.length - 1].z1 = z - 380 + len; z = z - 380 + len; };
  run(4); land(1060);            // pijakan station 1 (y −520, z 2040–3100)
  run(4); land(1560);            // pijakan station 2 (y −1040, z 4240–5800)
  run(14);                       // terus naik ke cakrawala
  S.forEach((s, i) => { s.z1 = s.z1 ?? (S[i + 1] ? S[i + 1].z : s.z + 380); });
  return S;
}
const STEPS = makeSteps();

export function makeFilm() {
  const { T: A } = timing(B);
  const lit = (i, t) => E.outCubic(inv(A.naik - .3 + i * .055, A.naik + .1 + i * .055, t));   // nyala berurutan dekat → jauh

  function stairs(ctx, t, pr, foc, items) {
    const X0 = -1400, X1 = 1400;
    STEPS.forEach((s, i) => {
      const L = lit(i, t);
      items.push({ z: s.z - 2, x: 0, d: pr(0, s.y1, s.z).z + 1, f: () => {
        const P = [pr(X0, s.y0, s.z), pr(X1, s.y0, s.z), pr(X1, s.y1, s.z), pr(X0, s.y1, s.z), pr(X1, s.y1, s.z1), pr(X0, s.y1, s.z1)];
        if (P.some(p => p.z < 120)) return;
        const fog = clamp(1.15 - (P[2].z - 1500) / 9000);
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = 1;
        ctx.fillStyle = rgb(BGC, TREAD, L * fog);                       // pijakan
        ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[4].x, P[4].y); ctx.lineTo(P[5].x, P[5].y); ctx.closePath(); ctx.fill();
        const g = ctx.createLinearGradient(0, P[0].y, 0, P[3].y);       // muka anak tangga: gelap di bawah, sedikit terang di bibir
        g.addColorStop(0, rgb(BGC, STEP, .35 * L * fog)); g.addColorStop(1, rgb(BGC, STEP, L * fog));
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.lineTo(P[3].x, P[3].y); ctx.closePath(); ctx.fill();
        if (L > 0) {                                                     // bibir pijakan: garis gading tipis + pendar lembut
          ctx.strokeStyle = ivo(.62 * L * fog); ctx.lineWidth = Math.max(1, 3.2 * P[3].s); ctx.beginPath(); ctx.moveTo(P[3].x, P[3].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
          ctx.strokeStyle = ivo(.07 * L * fog); ctx.lineWidth = Math.max(3, 22 * P[3].s); ctx.stroke();
        }
      } });
    });
  }

  // saklar dinding, pusat pelat di (x, 0)
  function saklar(ctx, t, x) {
    const k = E.snap(inv(A.klik - .02, A.klik + .06, t)), dt = t - A.klik, imp = dt > 0 ? Math.exp(-dt * 9) * Math.cos(dt * 42) : 0;
    ctx.save(); ctx.translate(x, 0); ctx.scale(1 - .022 * imp, 1 - .022 * imp);
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.roundRect(-188, -296, 400, 620, 40); ctx.fill();          // bayangan
    const g = ctx.createLinearGradient(0, -310, 0, 310); g.addColorStop(0, '#2B2C25'); g.addColorStop(1, '#17180F');
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-200, -310, 400, 620, 40); ctx.fill();
    ctx.strokeStyle = ivo(.24); ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = ivo(.10); ctx.beginPath(); ctx.moveTo(-160, -304); ctx.lineTo(160, -304); ctx.stroke();
    for (const sy of [-258, 258]) { ctx.fillStyle = '#0F100C'; ctx.beginPath(); ctx.arc(0, sy, 11, 0, 7); ctx.fill(); ctx.strokeStyle = ivo(.28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-7, sy + 3); ctx.lineTo(7, sy - 3); ctx.stroke(); }
    ctx.fillStyle = '#0C0D09'; ctx.beginPath(); ctx.roundRect(-118, -184, 236, 368, 18); ctx.fill();
    const half = (y0, y1, b, lift) => { ctx.fillStyle = rgb([30, 31, 25], [96, 96, 88], b); ctx.beginPath(); ctx.roundRect(-104, y0 - lift, 208, y1 - y0 + lift, 12); ctx.fill(); };
    half(-170, 0, lerp(.42, .12, k), lerp(8, 0, k)); half(0, 170, lerp(.12, .42, k), lerp(0, 8, k));
    ctx.fillStyle = ivo(.16); ctx.fillRect(-104, -2, 208, 4);                                    // punggung engsel
    setFont(ctx, DSP(78), 6); ctx.textAlign = 'center'; ctx.fillStyle = ivo(lerp(.82, .55, k)); ctx.fillText('AGI', 0, -60 + 4 * k);
    setFont(ctx, MN(15), 4); ctx.fillStyle = ivo(.4); ctx.fillText('ON', 0, -196); ctx.fillText('OFF', 0, 210);
    ctx.restore(); ctx.textAlign = 'left';
    // bohlam di atasnya: tetap padam; satu kilau kaca sesaat di klik (pantulan, bukan nyala)
    ctx.strokeStyle = ivo(.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 900, -1100); ctx.lineTo(x + 900, -330); ctx.stroke();
    ctx.save(); ctx.translate(x + 900, -240 + 4 * imp); ctx.strokeStyle = ivo(.42); ctx.lineWidth = 3; bulb(ctx, 66); ctx.restore();
    const gl = dt > 0 && dt < .1 ? 1 - dt / .1 : 0;
    if (gl) { ctx.strokeStyle = ivo(.5 * gl); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + 900, -258, 46, Math.PI * 1.15, Math.PI * 1.4); ctx.stroke(); }
  }

  // penggaris elastis: nol di x0, jarum tetap di ujung kanan benda (x0 + 620)
  const LEN = 620, SP0 = LEN / 62.7, SP1 = LEN / 99.9;
  function penggaris(ctx, t) {
    const x0 = -430, kk = spring(t - A.tekan, .55, .55), sp = lerp(SP0, SP1, kk), end = x0 + 100 * sp;
    const kb = spring(t - A.model, .62, .42), ka = clamp((t - A.model) / .12);
    if (ka > 0) {                                                                                // model AI (tidak pernah berubah)
      ctx.save(); ctx.globalAlpha = ka; ctx.translate(x0 + LEN / 2, -230); ctx.scale(.9 + .1 * kb, .9 + .1 * kb); ctx.translate(-(x0 + LEN / 2), 230);
      ctx.fillStyle = TILE; ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x0, -330, LEN, 200, 22); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.strokeRect(x0 + 34, -296, 132, 132);
      ctx.beginPath(); for (let i = 1; i < 4; i++) { ctx.moveTo(x0 + 34 + 33 * i, -296); ctx.lineTo(x0 + 34 + 33 * i, -164); ctx.moveTo(x0 + 34, -296 + 33 * i); ctx.lineTo(x0 + 166, -296 + 33 * i); } ctx.stroke();
      setFont(ctx, MN(32), 2); ctx.fillStyle = IVORY; ctx.fillText('GPT-6 ASTRA', x0 + 200, -240);
      setFont(ctx, MN(17), 3); ctx.fillStyle = ivo(.55); ctx.fillText('MODEL AI YANG SAMA', x0 + 200, -200);
      ctx.setLineDash([8, 10]); ctx.strokeStyle = ivo(.28 * clamp((t - A.ukur) / .3)); ctx.beginPath();
      ctx.moveTo(x0, -126); ctx.lineTo(x0, -6); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    }
    const kr = E.outQuint(inv(A.ukur, A.ukur + .5, t)); if (kr <= 0) return;
    ctx.save(); ctx.globalAlpha = kr; ctx.translate(0, 80 * (1 - kr));
    ctx.fillStyle = 'rgba(241,239,230,.075)'; ctx.strokeStyle = ivo(.42); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(x0 - 34, 0, end - x0 + 68, 132, 14); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = ivo(.2); ctx.beginPath(); ctx.moveTo(x0 - 20, 7); ctx.lineTo(end + 20, 7); ctx.stroke();
    const rv = E.outCubic(inv(A.ukur + .1, A.ukur + .6, t)) * 100;
    ctx.strokeStyle = ivo(.78); ctx.lineWidth = 2; ctx.beginPath();
    for (let v = 0; v <= rv; v++) { const x = x0 + v * sp, h = v % 10 ? (v % 5 ? 18 : 32) : 50; ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    ctx.stroke(); setFont(ctx, MN(17), 0); ctx.fillStyle = ivo(.72); ctx.textAlign = 'center';
    for (let v = 0; v <= rv; v += 10) ctx.fillText(String(v), x0 + v * sp, 82);
    ctx.textAlign = 'left';
    const kv = E.outQuint(inv(A.vendor, A.vendor + .4, t));                                      // penjepit vendor menekan ujung kanan
    if (kv > 0) { const cx = end + 40 + 520 * (1 - kv);
      ctx.fillStyle = '#2A2B24'; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(cx, -24, 84, 180, 14); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = ivo(.22); ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(cx + 58, 14 + i * 26); ctx.lineTo(cx + 72, 14 + i * 26); } ctx.stroke();
      ctx.save(); ctx.translate(cx + 36, 66); ctx.rotate(-Math.PI / 2); setFont(ctx, MN(17), 4); ctx.fillStyle = ivo(.85); ctx.textAlign = 'center'; ctx.fillText('VENDOR', 0, 6); ctx.restore(); }
    ctx.restore();
    const kn = E.outQuint(inv(A.jarum, A.jarum + .3, t)); if (kn <= 0) return;                  // jarum lime di ujung benda
    const nx = x0 + LEN; ctx.fillStyle = LIME; ctx.fillRect(nx - 2, -128, 4, 250 * kn);
    ctx.beginPath(); ctx.moveTo(nx - 11, -138); ctx.lineTo(nx + 11, -138); ctx.lineTo(nx, -122); ctx.closePath(); ctx.fill();
    const val = t < A.tekan ? 62.7 : lerp(62.7, 99.9, E.outCubic(inv(A.tekan, A.tekan + .75, t)));
    fall(ctx, fmt(val, 1) + '%', nx + 60, -150, t, A.jarum + .05, DSP(190));
    const fl = inv(A.tekan + .05, A.tekan + .25, t), sy = Math.abs(Math.cos(fl * Math.PI));
    ctx.save(); ctx.translate(nx + 64, -120); ctx.scale(1, Math.max(.02, sy)); setFont(ctx, MN(19), 4); ctx.fillStyle = ivo(.7);
    ctx.globalAlpha = clamp((t - A.jarum - .2) / .25); ctx.fillText(fl < .5 ? 'PEMBUNGKUS STANDAR' : 'PEMBUNGKUS VENDOR', 0, 0); ctx.restore();
    txt(ctx, 'AI-NYA SAMA · UJIANNYA SAMA', x0, 270, t, A.sama, MN(22), { ls: 4, col: ivo(.75) });
    srcTag(ctx, 'Sumber: ARC Prize, 3 Sep 2026 (ARC-AGI-3)', -840, 440, t, A.jarum + .3);
  }

  const ST = [
    { at: 0, x: 0, z: 0, py: -560, dist: [1260, 1130], yaw: [-4, 2], draw(ctx, t) {
      saklar(ctx, t, -300);
      fall(ctx, '“AGI has arrived.”', 0, 40, t, A.klaim, SRF(84));
      typeOn(ctx, 'JENSEN HUANG · DI X · 6 SEP 2026', 6, 100, t, A.klaim + .3, MN(20), { cps: 60, ls: 3, col: ivo(.65) });
      srcTag(ctx, 'Sumber: The Next Web, 7 Sep 2026', -840, 440, t, A.klaim + .5);
    } },
    { at: A.naik, via: 'rise', x: 0, z: 2600, py: -1080, dist: [1700, 1540], yaw: [3, -2], pitch: 8, draw(ctx, t) {
      markLine(ctx, 'bukan saklar, tapi ', 'TANGGA', '', 0, -40, t, A.naik - .1, A.tangga, SRF(124));
    } },
    { at: A.naik2, via: 'rise', x: 10, z: 5200, py: -1600, dist: [1220, 1120], yaw: [-3, 1.5], draw: (ctx, t) => penggaris(ctx, t) },
  ];
  ST.forEach((s, j) => { s.world = (ctx, t, pr, foc, items, c) => { if (j === c.i) stairs(ctx, t, pr, foc, items); }; });
  return makeChapter({ B, ST, gate: true, label: 'TES · SAKLAR BISU → TANGGA · PENGGARIS ELASTIS' });
}
