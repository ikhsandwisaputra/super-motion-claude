// Tes C · Aksa, maskot ASCII (lokal 0–5 s, global 10–15 s). VO 01 [3,20–6,30] "…Bukan. Itu harga data KTP kita."
// Panggung: plate Ahpo D01 (studio gelap, kartu identitas ilustrasi, bayangan + pantulan lantai) dalam 4 lapis parallax,
// label harga kertas "Rp0,49 / WARGA" tergantung di sudut kartu (bandul). Aksa berdiri di lantai kiri bawah, depan kartu.
// Akting: lahir dari `aksa.bangun()` di "Bukan." → menoleh + menunjuk label di "Itu harga" → kaget lompat di "KTP"
// (O_O, "!", label terayun angin lompatan, lantai bergetar) → T_T di "kita" → tidur, kempis jadi `aksa.tidur()` → backspace.
import { W, H, clamp, inv, E, ROOM, IVORY, MONO, DSP, MN, mk, rnd, loadImg, srcTag } from './kit.js';
import { makeAksa } from './aksa.js';

const B = { x: 400, y: 985, rx: 230, ry: 240, caret: .22, type: .38, cmdIn: 'aksa.bangun()', inflate: 1.0,
  face: [[1.36, '-_-'], [1.5, 'o_o'], [2.08, '-_-'], [2.18, 'o_o'], [2.62, 'O_O'], [3.02, 'T_T'], [3.5, '-_-']],
  look: [1.66, 2.32], antic: 2.32, jump: [2.42, 2.86, 90], shock: 2.62, sad: 3.02, tears: [[3.1, 1], [3.24, -1]],
  sleep: 3.5, zz: [3.58, 3.72], deflate: 3.78, cmdOut: 'aksa.tidur()', end: 4.95, cps: 24 };
const CX = 560, CY = 690, AX = 0, AY = 200, AKW = 900, AKH = 1000;                // fokus kamera; kanvas Aksa (lokal)
const TW = 214, TH = 170, TP = 60, ANC = [1336, 318], STR = 128;                   // label harga + tali
const GX = 930, GY = 600, GDX = 120, GS = .95;                                     // grup kartu: geser kanan → two-shot
const SHAKE = [[10, -7], [-8, 6], [5, -3], [-2, 1]];

function cam(t) {
  const s = 1.03 + .03 * E.inOutSine(t / 5) + .085 * E.expo16(inv(B.shock, B.shock + .8, t)) - .085 * E.inOutSine(inv(3.55, 4.5, t));
  let dx = 10 - 4 * t, dy = 0; const lf = Math.floor((t - B.jump[1]) * 30);
  if (lf >= 0 && lf < SHAKE.length) { dx += SHAKE[lf][0]; dy += SHAKE[lf][1]; }
  return { s, dx, dy };
}
function lay(ctx, C, k, fn) {                                                     // satu lapis parallax: zoom × k, geser × k
  const s = 1 + (C.s - 1) * k; ctx.save(); ctx.translate(CX + C.dx * k, CY + C.dy * k); ctx.scale(s, s); ctx.translate(-CX, -CY); fn(); ctx.restore();
}
const grp = ctx => { ctx.translate(GX + GDX, GY); ctx.scale(GS, GS); ctx.translate(-GX, -GY); };
function bake(im, f) { const [c, g] = mk(im.width, im.height); g.filter = f; g.drawImage(im, 0, 0); return c; }
function makeTag() {                                                              // label kertas, puncak di (0,0), lubang di (0,22)
  const [c, g] = mk(TW + 2 * TP, TH + 2 * TP); g.translate(TP + TW / 2, TP);
  g.save(); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 26; g.shadowOffsetX = 14; g.shadowOffsetY = 18;
  const gr = g.createLinearGradient(0, 0, 0, TH); gr.addColorStop(0, '#EEEADC'); gr.addColorStop(1, '#CFC9B6');
  g.beginPath(); g.moveTo(0, 0); g.lineTo(TW / 2, 40); g.lineTo(TW / 2, TH); g.lineTo(-TW / 2, TH); g.lineTo(-TW / 2, 40); g.closePath();
  g.lineJoin = 'round'; g.lineWidth = 6; g.strokeStyle = gr; g.fillStyle = gr; g.fill(); g.stroke(); g.restore();
  g.fillStyle = '#BDB7A3'; g.beginPath(); g.arc(0, 22, 11, 0, 2 * Math.PI); g.fill();
  g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.arc(0, 22, 6, 0, 2 * Math.PI); g.fill(); g.globalCompositeOperation = 'source-over';
  g.textAlign = 'center'; g.fillStyle = '#14150F'; let fs = 104; g.font = DSP(fs);
  while (g.measureText('Rp0,49').width > TW * .8 && fs > 40) g.font = DSP(fs -= 2);
  g.fillText('Rp0,49', 0, 44 + fs * .8);
  g.font = MN(17); g.letterSpacing = '3px'; g.fillStyle = '#55574C'; g.fillText('/ WARGA', 0, TH - 16);
  return c;
}
function makeVig() {
  const [c, g] = mk(W, H), gr = g.createRadialGradient(W * .45, H * .5, H * .3, W * .5, H * .5, H * 1.05);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.55)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); return c;
}

export function makeC() {
  const A = makeAksa(B); let BG, PAN, BAY, CARD, TAG, VIG; const [AK, ak] = mk(AKW, AKH), [RF, rf] = mk(AKW, AKH);
  function tag(ctx, t) {                                                          // bandul: tenang, lalu kena angin lompatan
    let th = .05; for (const [t0, a0] of [[B.jump[0], .06], [B.jump[1], .2]]) { const a = t - t0; if (a > 0) th += a0 * Math.exp(-a / .8) * Math.sin(2 * Math.PI * a / .92); }
    const hx = ANC[0] + STR * Math.sin(th), hy = ANC[1] + STR * Math.cos(th);
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(-th); ctx.drawImage(TAG, -(TP + TW / 2), -(TP + 22)); ctx.restore();
    ctx.fillStyle = '#0E0F0B'; ctx.beginPath(); ctx.arc(ANC[0], ANC[1], 6, 0, 2 * Math.PI); ctx.fill();                       // lubang di kartu
    ctx.strokeStyle = 'rgba(205,199,180,.9)'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(ANC[0], ANC[1]);
    ctx.quadraticCurveTo((ANC[0] + hx) / 2 + 6, (ANC[1] + hy) / 2, hx, hy); ctx.stroke();
  }
  function kick(g, t) {                                                           // debu huruf saat mendarat
    const a = t - B.jump[1]; if (a < 0 || a > .55) return;
    g.font = `700 28px "${MONO}"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = IVORY;
    for (let i = 0; i < 12; i++) {
      const sd = i % 2 ? 1 : -1, x = B.x + sd * (100 + 120 * rnd(i * 5.3)) + sd * (110 + 260 * rnd(i * 3.1)) * a, y = B.y - 6 - (140 + 300 * rnd(i * 7.7)) * a + 1300 * a * a;
      if (y > B.y + 4) continue; g.globalAlpha = .75 * (1 - a / .55); g.fillText(".,'`"[i % 4], x, y);
    }
    g.globalAlpha = 1;
  }
  function motes(ctx, t) {                                                        // debu depan lensa (bokeh), lapis k 1,5
    for (let i = 0; i < 11; i++) {
      const x = (rnd(i * 9.1) * W * 1.1 + 14 * t * (rnd(i * 2.3) - .3)) % W, y = rnd(i * 4.7) * H - 9 * t, r = 3 + 7 * rnd(i * 1.9);
      const gr = ctx.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(241,239,230,${.05 + .09 * rnd(i * 6.6)})`); gr.addColorStop(1, 'rgba(241,239,230,0)');
      ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
  }
  return {
    hits: [['stk1', 0, .9]],
    vo: [{ file: 'dkd_vo_ahmad_01', from: 3.20, to: 6.30, at: .50 }],
    lines: [{ t0: .58, t1: 3.46, text: '…Bukan. Itu harga data KTP kita.' }],
    keys: [[.38, 'ketik aksa.bangun()'], [1.0, 'menggembung'], [1.5, 'mata o_o'], [1.66, 'tunjuk label'], [2.62, 'kaget O_O'], [3.02, 'sedih T_T'], [3.78, 'kempis'], [4.28, 'backspace']],
    sfx: [[.38, 'v17/v17_kb_type_a', -16, .58], [.97, 'v17/v17_kb_enter', -14], [1.0, 'typo-pack/typo_decode_scramble', -15], [1.02, 'typo-pack/typo_swoosh_up', -17],
      [1.5, 'v16/v16_click', -17], [2.4, 'typo-pack/typo_whoosh_soft', -15], [2.62, 'v17/v17_impact_soft', -12], [2.62, 'v17/v17_sub_boom', -14],
      [2.86, 'v16/v16_land', -13], [3.78, 'v16/v16_derez', -15], [3.98, 'typo-pack/typo_decode_scramble', -19], [4.28, 'v17/v17_kb_type_b', -18, .52]],
    async load() {
      const P = '../assets/ahpo/D01_0';
      [BG, PAN, BAY, CARD] = await Promise.all(['1_BG_studio', '2_MG_pantulan', '3_MG_bayangan', '4_MG_kartu-identitas'].map(n => loadImg(P + n + '.png', 2304)));
      BG = bake(BG, 'brightness(.92)'); CARD = bake(CARD, 'saturate(.82) brightness(.95)'); TAG = makeTag(); VIG = makeVig(); await A.load();
    },
    draw(ctx, t) {
      const C = cam(t), aL = t - B.jump[1], trem = aL > 0 ? 3 * Math.exp(-aL / .11) * Math.sin(2 * Math.PI * 19 * aL) : 0;
      ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
      lay(ctx, C, .55, () => ctx.drawImage(BG, 0, 0, W, H));
      lay(ctx, C, .9, () => { grp(ctx); ctx.drawImage(PAN, 0, 0, W, H); ctx.drawImage(BAY, 0, 0, W, H); });
      lay(ctx, C, 1, () => { grp(ctx); ctx.drawImage(CARD, 0, trem, W, H); ctx.translate(0, trem); tag(ctx, t); });
      ak.setTransform(1, 0, 0, 1, 0, 0); ak.globalAlpha = 1; ak.clearRect(0, 0, AKW, AKH); ak.translate(-AX, -AY); A.draw(ak, t); kick(ak, t);
      rf.setTransform(1, 0, 0, -1, 0, 2 * (B.y - AY)); rf.clearRect(0, -AKH, AKW, 3 * AKH); rf.drawImage(AK, 0, 0);                // pantulan lantai mengilap
      rf.setTransform(1, 0, 0, 1, 0, 0); rf.globalCompositeOperation = 'destination-in';
      const gr = rf.createLinearGradient(0, B.y - AY, 0, B.y - AY + 120); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      rf.fillStyle = gr; rf.fillRect(0, 0, AKW, AKH); rf.globalCompositeOperation = 'source-over';
      lay(ctx, C, 1.12, () => { ctx.globalAlpha = .2; ctx.drawImage(RF, AX, AY); ctx.globalAlpha = 1; ctx.drawImage(AK, AX, AY); });
      lay(ctx, C, 1.5, () => motes(ctx, t));
      ctx.drawImage(VIG, 0, 0);
      srcTag(ctx, 'Rp133,05 jt ÷ 270 jt data · CNN Indonesia, 21 Mei 2021', 1074, 1020, t, 1.75);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    },
  };
}
