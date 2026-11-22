// Bab Penutup · "Pelajaran untuk kita" (VO 09, 37.9 s + 2.6 s tail). No out-portal (portal.json out:false).
//  S0 0–5.0      Callback: clean night aerial of Vice City (launch trailer, frames after the title card) — SATU GAME · jalur internet
//                dunia kewalahan · DE-CIX 33,03 Tbit/s counter · "dalam semalam."
//  S1 4.9–12.5   PELAJARAN TERBESARNYA: three circles TEKNOLOGI / BISNIS / KOMUNITAS enter in a row on their words, then slide
//                into a Venn at "saling menguatkan" (the shared centre fills ivory) over the skyline-day still
//  S2 12.4–20.4  Split screen: Windah photo full frame (#1 DUNIA · 392.505) → divider wipes in Bengaluru 3D map (1.600+ pengembang)
//                → "membuka mata." push-in
//  S3 20.4–32.2  GILIRAN KAMU: YouTube comment box types the template, three answer chips light on their words
//  S4 32.2–end   End screen + subscribe (the only lime = CTA) · Aksa waves bye once (f:aksa_19)
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, ROOM, GREY, MONO, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  srcTag, txt, countTo, fmt, typeOn } from './kit.js';
import { latar, aksaShow, bake } from './s3.js';
import { endScreen } from './pustaka/penutup.js';
import { kotakKomentar } from './pustaka/ui.js';

function cover(g, im, x, y, w, h, z = 1, ox = 0, oy = 0) { const s = Math.max(w / im.width, h / im.height) * z; g.drawImage(im, x + w / 2 - im.width * s / 2 + ox, y + h / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); }
function fallLine(o, str, x, y, t, t0, size = 122, align = 'left') {
  if (t <= t0) return 0; setFont(o, DSP(size), 2); o.textAlign = 'left'; o.fillStyle = IVORY; const a0 = o.globalAlpha, tw = o.measureText(str).width, x0 = align === 'center' ? x - tw / 2 : x;
  for (let i = 0; i < str.length; i++) { const s = t - t0 - i * .022; if (s <= 0) break; o.globalAlpha = a0 * clamp(s / .08); o.fillText(str[i], x0 + o.measureText(str.slice(0, i)).width, y + (1 - spring(s, .55, .36)) * -70); }
  o.globalAlpha = a0; return tw;
}
const shadeY = (o, y0, y1, a) => { const g = o.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, `rgba(11,12,9,${a})`); g.addColorStop(1, 'rgba(11,12,9,0)'); o.fillStyle = g; o.fillRect(-1000, Math.min(y0, y1), 2000, Math.abs(y1 - y0)); };

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {}, SH = '../assets/shared/';
  // Aksa v2 (catatan Ikhsan 2026-11-21): lama di layar (stay 6), dadah 3 kali, ucap "sampai ketemu!".
  // Kaki di antara lonceng (x≈690) dan slot end-screen (x≥1120); ucapan lokal di KIRI-atas, di atas pil subscribe.
  const AK = { t: A.dan - .8, x: 925, y: 1075, s: .75, stay: 6 }, BOUTS = [[.2, 1.3], [2.3, 3.3], [4.3, 5.2]];
  const aksa = aksaShow({ ...AK, wave: BOUTS[0], face: [[.7, '^_^'], [2.2, '^o^'], [4.2, '^_^']] });
  const aksaDraw = (o, t) => {
    const lt = t - AK.t, inf = .82, b = BOUTS.find(([a, z]) => lt < inf + z + .2) || BOUTS[2];
    aksa.B.wave = [inf + b[0], inf + b[1]]; aksa.draw(o, t);
    const t0 = inf + .5, k = lt - t0, end = inf + AK.stay; if (k <= 0 || lt >= end) return;
    const str = 'sampai ketemu!', n = Math.min(str.length, Math.ceil(k * 30)), al = (1 - inv(end - .3, end, lt)) * E.outCubic(inv(t0, t0 + .25, lt));
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = al; setFont(o, `700 44px "${MONO}"`, 1); o.textAlign = 'left'; o.textBaseline = 'middle';
    const full = o.measureText('// ' + str).width, x = 700 - full, y = 640;
    o.shadowColor = 'rgba(8,9,6,.85)'; o.shadowBlur = 16;
    o.fillStyle = GREY; o.fillText('//', x, y); o.fillStyle = IVORY; o.fillText(str.slice(0, n), x + o.measureText('// ').width, y); o.restore(); };
  async function load() {
    const R = SH + 'rockstar-resmi/';
    [IM.malam, IM.sky, IM.wf, IM.blr] = await Promise.all([
      loadImg(R + 'gtavi-06-vice-city-night-cityscape.jpg', 1920), loadImg(R + 'gtavi-02-vice-city-skyline-day.jpg', 1920),
      loadImg(SH + 'cc/commons-windah-basudara-di-tahun-2022.jpg', 1920), loadImg(SH + 'peta/rockstar-india-bengaluru-3d_gelap-z15.png', 1920)]);
    [V.kota, V.mobil2] = await Promise.all(['kotamalam', 'mobil2'].map(n => loadVid(SH + 'vid/', n)));
    V.aerial = { ...V.kota, n: 7, img: V.kota.img.slice(29, 36) };               // only the clean aerial frames (title card before, a cut after)
    IM.malamD = bake(IM.malam, 'saturate(.6) brightness(.5) contrast(1.05)', 1920);
    IM.skyD = bake(IM.sky, 'saturate(.55) brightness(.42) contrast(1.05)', 1920);
    IM.wfG = bake(IM.wf, 'saturate(.8) contrast(1.06) brightness(.8)', 1920);
    await aksa.load();
  }

  // ── S0 · satu game, internet dunia kewalahan ─────────────────────────────────────────────────────────────────
  const S0 = { at: 0, name: 'Semalam', draw(ctx, t) {
    const sh = t > A.kewalahan + .6 ? Math.exp(-(t - A.kewalahan - .6) / .14) * 12 * Math.sin((t - A.kewalahan) * 90) : 0;
    typeOn(ctx, 'REKOR TRAFIK INTERNET GLOBAL · DE-CIX', -860, -380, t, .25, MN(24), { ls: 6, col: ivo(.8), cps: 44 });
    fallLine(ctx, 'SATU GAME', -866, -200, t, A.satu - .05, 230);
    txt(ctx, 'bikin jalur internet dunia kewalahan', -860, -95, t, A.internet - .05, SRF(70), { col: ivo(.92) });
    if (t > A.kewalahan - .45) { const k = E.outQuint(inv(A.kewalahan - .45, A.kewalahan - .1, t)), n = countTo(0, 33.03, t, A.kewalahan - .4, 1.0);
      ctx.save(); ctx.translate(sh, (1 - k) * 50); ctx.globalAlpha = k; setFont(ctx, DSP(250), 2); ctx.textAlign = 'left'; ctx.fillStyle = IVORY; ctx.fillText(fmt(n, 2), -870, 170);
      const nw = ctx.measureText(fmt(33.03, 2)).width; setFont(ctx, DSP(90), 2); ctx.fillStyle = ivo(.8); ctx.fillText('Tbit/s', -850 + nw, 170);
      // traffic trace: a flat line that spikes with the counter
      ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); const sp = clamp((t - A.kewalahan + .4) / 1.0);
      for (let i = 0; i <= 80; i++) { const u = i / 80, x = -860 + u * 980, base = 6 * Math.sin(u * 40 + t * 3), spike = u > .55 ? Math.exp(-((u - .8) ** 2) / .012) * 120 * sp : 0; i ? ctx.lineTo(x, 260 - base - spike) : ctx.moveTo(x, 260 - base); }
      ctx.stroke(); ctx.restore(); ctx.textAlign = 'left'; }
    txt(ctx, 'dalam semalam.', -860, 380, t, A.semalam - .05, SRF(84), { col: IVORY });
    srcTag(ctx, 'Sumber: DE-CIX & Variety, Nov 2026 · Video: Rockstar Games (rockstargames.com/VI/media)', -880, 490, t, .8);
  } };

  // ── S1 · teknologi × bisnis × komunitas ──────────────────────────────────────────────────────────────────────
  const VN = [['TEKNOLOGI', 'mesin RAGE', 'teknologi', 150], ['BISNIS', '12 kantor · talenta global', 'bisnis', -90], ['KOMUNITAS', 'streamer & pemain', 'komunitas', 30]];
  const S1 = { name: 'Pelajaran', draw(ctx, t) {
    typeOn(ctx, 'BUAT KITA DI INDONESIA', 0, -425, t, A.kita - .05, MN(24), { align: 'center', ls: 7, col: ivo(.8), cps: 40 });
    fallLine(ctx, 'PELAJARAN TERBESARNYA', 0, -315, t, A.pelajaran - .05, 104, 'center');
    const m = E.inOutCubic(inv(A.saling - .1, A.menguatkan + .3, t)), R = 190, CY = 120, rot = .05 * Math.max(0, t - A.menguatkan - .3);
    const pulse = t > A.menguatkan ? 1 + .05 * Math.exp(-(t - A.menguatkan) / .16) : 1;
    const P = VN.map(([, , , deg], i) => { const th = deg * Math.PI / 180 + rot; return [lerp((i - 1) * 520, 130 * Math.cos(th), m), lerp(CY, CY + 130 * Math.sin(th), m), th]; });
    ctx.save(); ctx.translate(0, CY); ctx.scale(pulse, pulse); ctx.translate(0, -CY);
    const ks = VN.map(v => clamp(spring(t - A[v[2]] + .1, .5, .45)));
    P.forEach(([x, y], i) => { if (ks[i] <= 0) return; ctx.globalAlpha = clamp(ks[i] * 2); ctx.fillStyle = ivo(.06); ctx.beginPath(); ctx.arc(x, y, R * ks[i], 0, 7); ctx.fill();
      ctx.strokeStyle = ivo(.9); ctx.lineWidth = 3; ctx.stroke(); });
    const mm = E.outCubic(inv(A.menguatkan - .05, A.menguatkan + .4, t));
    if (mm > 0) { ctx.save(); P.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.clip(); }); ctx.globalAlpha = .92 * mm; ctx.fillStyle = IVORY; ctx.fillRect(-400, -300, 800, 800); ctx.restore(); }
    P.forEach(([x, y, th], i) => { if (ks[i] <= 0) return; const lx = x + Math.cos(th) * 78 * m, ly = y + Math.sin(th) * 78 * m;
      ctx.globalAlpha = clamp(ks[i] * 1.6); setFont(ctx, DSP(54), 3); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(VN[i][0], lx, ly + 14);
      setFont(ctx, MN(17), 3); ctx.fillStyle = ivo(.72); ctx.fillText(VN[i][1], lx, ly + 48); });
    ctx.restore(); ctx.globalAlpha = 1; ctx.textAlign = 'left';
    txt(ctx, 'saling menguatkan.', 0, 470, t, A.saling, SRF(66), { align: 'center' });
    srcTag(ctx, 'Latar: Rockstar Games (rockstargames.com/VI/media)', -880, 500, t, A.tapi + .4);
  } };

  // ── S2 · layar terbelah: Windah #1 dunia | Bengaluru ─────────────────────────────────────────────────────────
  const S2 = { name: 'Membuka mata', draw(ctx, t) {
    const div = lerp(1000, 0, E.inOutCubic(inv(A.bengaluru - .45, A.bengaluru + .2, t)));
    const z = 1.02 + .04 * clamp((t - A.jujur) / 7) + .05 * E.inOutCubic(inv(A.membuka - .1, A.mata + .5, t));
    ctx.save(); ctx.beginPath(); ctx.rect(-1000, -600, div + 1000, 1200); ctx.clip();
    cover(ctx, IM.wfG, -1000, -600, 2000, 1200, z, (div - 1000) / 2, 0);
    shadeY(ctx, 560, 60, .9); ctx.restore();
    if (div < 1000) { ctx.save(); ctx.beginPath(); ctx.rect(div, -600, 1000, 1200); ctx.clip(); ctx.fillStyle = ROOM; ctx.fillRect(div, -600, 1000, 1200);
      cover(ctx, IM.blr, div, -600, 1000, 1200, z * 1.04); shadeY(ctx, 560, 120, .85);
      const px = div + 480, py = -70, lt = t - A.bengaluru, pk = clamp(spring(lt - .2, .5, .4));
      if (pk > 0) { ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.globalAlpha = 1 - (lt * .8) % 1; ctx.beginPath(); ctx.arc(px, py, 14 + 60 * ((lt * .8) % 1), 0, 7); ctx.stroke();
        ctx.globalAlpha = 1; const d = (1 - pk) * -80; ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(px, py - 44 + d, 30, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.moveTo(px - 16, py - 27 + d); ctx.lineTo(px, py + d); ctx.lineTo(px + 16, py - 27 + d); ctx.fill(); ctx.fillStyle = ROOM; ctx.beginPath(); ctx.arc(px, py - 44 + d, 11, 0, 7); ctx.fill(); }
      ctx.restore();
      ctx.fillStyle = ivo(.9); ctx.fillRect(div - 2, -600, 4, 1200); }
    // left: Windah
    typeOn(ctx, 'KREATOR INDONESIA · STREAMER', -880, 150, t, A.kreator - .05, MN(22), { ls: 6, col: ivo(.85), cps: 44 });
    fallLine(ctx, '#1 DUNIA', -886, 320, t, A.puncak - .05, 170);
    if (t > A.puncak - .65) { const k = E.outQuint(inv(A.puncak - .65, A.puncak - .3, t)); ctx.globalAlpha = k; setFont(ctx, DSP(64), 2); ctx.fillStyle = IVORY; ctx.textAlign = 'left';
      const s = fmt(Math.round(countTo(0, 392505, t, A.puncak - .6, .6))); ctx.fillText(s, -880, 405); const sw = ctx.measureText('392.505').width;
      setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.8); ctx.fillText('PENONTON SERENTAK · YOUTUBE', -860 + sw, 400); ctx.globalAlpha = 1; }
    srcTag(ctx, 'Foto: Secrett9 / Wikimedia Commons (CC0) · Kompas Tekno', -880, 490, t, A.kreator + .2);
    // right: Bengaluru
    if (div < 900) { const x = div + 70;
      fallLine(ctx, 'BENGALURU', x, 250, t, A.bengaluru + .1, 130);
      typeOn(ctx, '1.600+ PENGEMBANG · WHITEFIELD', x + 4, 312, t, A.dapur - .1, MN(22), { ls: 5, col: ivo(.88), cps: 46 });
      txt(ctx, 'dapur produksi global.', x, 395, t, A.produksi, SRF(58), { col: ivo(.92) });
      srcTag(ctx, 'Peta: AWS Terrain | © OpenFreeMap', x + 10, 462, t, A.bengaluru + .3);
      srcTag(ctx, '© OpenStreetMap contributors · Sumber: Firstpost', x + 10, 492, t, A.bengaluru + .4); }
    if (t > A.membuka - .2) { ctx.save(); shadeY(ctx, -540, -300, .75 * E.outCubic(inv(A.membuka - .2, A.membuka + .2, t))); ctx.restore();
      txt(ctx, 'itu membuka mata.', 0, -405, t, A.membuka - .05, SRF(76), { align: 'center' }); }
  } };

  // ── S3 · giliran kamu: kolom komentar ────────────────────────────────────────────────────────────────────────
  const CH = [['Teknologi', 'teknologinya'], ['Tim India', 'dapur2'], ['Rekor Windah', 'rekor']];
  const S3 = { name: 'Komentar', draw(ctx, t) {
    fallLine(ctx, 'GILIRAN KAMU', -686, -290, t, A.giliran - .1, 112);
    typeOn(ctx, 'TULIS DI KOLOM KOMENTAR · BAGIAN MANA YANG PALING MENGEJUTKAN?', -680, -228, t, A.kolom, MN(21), { ls: 4, col: ivo(.8), cps: 46 });
    kotakKomentar(ctx, 0, 0, t, A.sekarang + .1, { baris: ['Paling gila dari GTA 6 menurutku:', '[ Teknologi / Tim India / Rekor Windah ]'], fokus: A.tulis, cps: [30, 24], urut: 'URUTKAN: TERATAS' });
    let x = -560; setFont(ctx, MN(24), 2);
    CH.forEach(([lab, key], i) => { const w = ctx.measureText(lab).width + 64, k = E.outQuint(inv(A.tulis2 + i * .08, A.tulis2 + i * .08 + .4, t));
      if (k > 0) { const on = E.outCubic(inv(A[key] - .05, A[key] + .2, t)), y = 310 + (1 - k) * 40;
        ctx.save(); ctx.globalAlpha = k; ctx.translate(x + w / 2, y); ctx.scale(1 + .06 * on * Math.exp(-Math.max(0, t - A[key]) / .2), 1 + .06 * on * Math.exp(-Math.max(0, t - A[key]) / .2));
        ctx.beginPath(); ctx.roundRect(-w / 2, -32, w, 64, 32); ctx.fillStyle = on > 0 ? `rgba(241,239,230,${on})` : 'rgba(0,0,0,0)'; ctx.fill(); ctx.strokeStyle = ivo(.85); ctx.lineWidth = 2; ctx.stroke();
        setFont(ctx, MN(24), 2); ctx.textAlign = 'center'; ctx.fillStyle = on > .5 ? ROOM : IVORY; ctx.fillText(lab, 0, 9); ctx.restore(); }
      x += w + 22; });
    const ku = E.outCubic(inv(A.basudara + .3, A.basudara + .7, t)); if (ku > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-560, 362, (x - 22 + 560) * ku, 4); }
    ctx.textAlign = 'left';
  } };

  // ── S4 · end screen (over, screen space) ─────────────────────────────────────────────────────────────────────
  const E0 = A.dan - .15;
  function akhir(o, t) {
    if (t < E0) return; o.save(); o.setTransform(1, 0, 0, 1, 0, 0);
    endScreen(o, 960, 540, t, E0, { judul: 'BEDAH TEKNOLOGI', sub: 'di balik kabar besar.', slot: ['VIDEO BERIKUTNYA', 'PILIHAN UNTUKMU'], subscribe: {} });
    const kc = E.outCubic(inv(A.tonton - .1, A.tonton + .3, t)); if (kc > 0) { const b = 10 * Math.sin((t - A.tonton) * 9) * Math.exp(-(t - A.tonton) / 1.2);
      o.globalAlpha = kc; o.strokeStyle = IVORY; o.lineWidth = 5; o.lineCap = 'round'; o.beginPath(); o.moveTo(1060 + b, 300); o.lineTo(1090 + b, 330); o.lineTo(1060 + b, 360); o.stroke(); o.globalAlpha = 1; }
    srcTag(o, 'Sumber: Rockstar Games · Take-Two · Sensor Tower via Deadline · BBC · DE-CIX · Kompas Tekno · Firstpost · Wikimedia Commons', 60, 1040, t, E0 + 1.0);
    o.restore();
  }

  const ST = [S0, { ...S1, at: A.tapi - .1, via: 'whip' }, { ...S2, at: A.jujur - .3, via: 'truck' }, { ...S3, at: A.sekarang - .1, via: 'rise' },
    { at: A.dan - .2, via: 'push', name: 'Layar akhir', draw() {} }];
  let latarV = () => {};
  const over = (o, t) => { akhir(o, t); aksaDraw(o, t); };
  return makeChapter({ B, ST, label: 'PENUTUP · PELAJARAN UNTUK KITA', over, gate: true, under: (ctx, t, first) => latarV(ctx, t, first),
    load: async () => { await load(); latarV = latar([
      { t0: 0, t1: 2.7, V: V.aerial, speed: .25, grade: 'saturate(.8) contrast(1.05) brightness(.85)', dim: .4, z: [1.0, 1.08], fin: .01, fout: .6, side: 'left' },
      { t0: 2.1, t1: A.tapi + .1, im: IM.malamD, dim: .3, z: [1.08, 1.16], fin: .6, side: 'left' },
      { t0: A.tapi - .3, t1: A.jujur, im: IM.skyD, dim: .3, z: [1.06, 1.16], pan: [30, -30] },
      { t0: A.jujur - .45, t1: A.sekarang, im: IM.wfG, dim: .2, z: [1.04, 1.1] },
      { t0: A.sekarang - .35, t1: A.dan, V: V.mobil2, grade: 'blur(6px) saturate(.45) brightness(.6)', dim: .62, z: [1.04, 1.1] },
      { t0: A.dan - .35, t1: DUR, im: IM.malamD, dim: .2, z: [1.02, 1.1], pan: [-20, 20] }]); } });
}
