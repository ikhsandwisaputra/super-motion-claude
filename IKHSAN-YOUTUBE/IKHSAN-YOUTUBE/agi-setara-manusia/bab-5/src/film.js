// Bab 5 · Apa artinya buat kita di Indonesia? — dunia siang hangat Jakarta (tema terang pasir), 23 station, VO take 08.
// ★ "Orang jadi Angka": jalan Jakarta dicacah jadi titik → titik merakit grafik ILO → kembali jadi jalan (src/dotmorph.js).
// Akhir di tangga (src/tangga5.js = tangga warna siang): label lima bahasa tercetak di anak tangga, kamera terus naik.
import B from './beats.js';
import { clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  plate, evid, fall, markLine, srcTag, slab, txt, countTo, fmt, gone, theme, grainRect, mk, rnd, spring } from './kit.js';
import { kq, pop, doc, stamp } from './draw.js';
import { orang, kerumunan, globe } from './pustaka/prop.js';
import { strike, check } from './pustaka/dasar.js';
import { makeSteps, ruler, springSp, diukur } from './agi.js';
import { buildMorph, drawMorph } from './dotmorph.js';
import { stairs5 } from './tangga5.js';

const GR = 'saturate(.9) contrast(1.08) brightness(1.04)';      // footage: hangat siang, bukan sepia
const ISL = '#1A1A19', IVA = a => `rgba(241,239,230,${a})`, D2R = Math.PI / 180;
const NEZ = [.1, .70, .62, .27];                                // potongan badan berita Komdigi (tanggal, nama, "tidak boleh tertinggal")
const PAL = { 6: '#E9E5DA', 7: '#284E90', 8: '#4E85DE' };       // nada titik grafik ILO (teks, batang, batang Indonesia)

// footage dokumenter di bidang kedalaman: grade hangat + soft-light jingga siang + grain
function wplate(ctx, V, t, x, y, w, h, k = 1, o = {}) {
  if (!V || k <= 0) return;
  plate(ctx, V, t, x, y, w, h, k, { grade: GR, vig: .34, grain: .2, ...o });
  const a0 = ctx.globalAlpha; ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = a0 * (o.warm ?? .55);
  ctx.fillStyle = '#FF9A40'; ctx.fillRect(x - w / 2, y - h * k / 2, w, h * k); ctx.restore();
}
// grafik gelap sebagai pulau di dunia pasir
function island(ctx, im, x, y, w, a, t) {
  if (!im || a <= 0) return; const h = w * im.height / im.width, a0 = ctx.globalAlpha;
  ctx.save(); ctx.globalAlpha = a0 * a; ctx.shadowColor = 'rgba(60,30,0,.35)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 24;
  ctx.fillStyle = ISL; ctx.fillRect(x - w / 2, y - h / 2, w, h); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.drawImage(im, x - w / 2, y - h / 2, w, h); grainRect(ctx, x - w / 2, y - h / 2, w, h, t, .1); ctx.restore();
}
// garis waktu kecil (S4–S6 bersambung: tiap station menggambar ±1300, jarak antar station 2600)
function tline(ctx) { ctx.fillStyle = ivo(.32); ctx.fillRect(-1300, 250, 2600, 3); for (let i = -6; i <= 6; i++) ctx.fillRect(i * 216 - 1, 240, 2, 22); }
function pin(ctx, t, t0) { const k = Math.min(1.15, pop(t, t0)); if (k <= 0) return;
  ctx.fillStyle = ivo(.95); ctx.beginPath(); ctx.arc(0, 251, 16 * k, 0, 7); ctx.fill(); ctx.fillRect(-2, 251 - 96 * k, 4, 96 * k); }
// lembar rancangan (Perpres) yang jatuh ke meja
function sheet(ctx, t, x, y, t0, k1, k2, rot) {
  const k = pop(t, t0, .6, .4); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(k, 1)) * 90); ctx.rotate((rot + (1 - Math.min(k, 1)) * 8) * D2R); ctx.globalAlpha *= clamp(k * 2);
  doc(ctx, 0, 0, 440, 300, { blur: 40, sy: 18 });
  setFont(ctx, MN(17), 5); ctx.fillStyle = 'rgba(30,24,16,.55)'; ctx.fillText(k1, -180, -88);
  setFont(ctx, DSP(72), 2); ctx.fillStyle = '#1E1810'; ctx.fillText(k2, -180, -14);
  ctx.fillStyle = 'rgba(30,24,16,.13)'; for (let i = 0; i < 4; i++) ctx.fillRect(-180, 24 + i * 26, 360 - (i % 2) * 96, 8);
  ctx.restore();
}
// ponsel buatan kode (tidak ada klip tangan menggulir ponsel): obrolan + baris saran fitur pintar
function hp(ctx, t, x, y, T) {
  const k = pop(t, T.in, .62, .45); if (k <= 0) return;
  const w = 340, h = 700; ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 120); ctx.rotate((1 - Math.min(1, k)) * 6 * D2R + Math.sin(t * .7) * .6 * D2R);
  ctx.shadowColor = 'rgba(60,30,0,.4)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 30; ctx.fillStyle = '#17130E';
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 52); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.fillStyle = '#FBF6EE'; ctx.beginPath(); ctx.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 40); ctx.fill();
  ctx.fillStyle = '#17130E'; ctx.beginPath(); ctx.roundRect(-46, -h / 2 + 26, 92, 26, 13); ctx.fill();
  setFont(ctx, MN(15), 1); ctx.fillStyle = 'rgba(23,19,14,.8)'; ctx.fillText('09.41', -w / 2 + 40, -h / 2 + 46);
  const bub = (yy, ww, right, t0, s) => { const kb = kq(t, t0, .35); if (kb <= 0) return; ctx.save(); ctx.globalAlpha *= kb; ctx.translate(0, (1 - kb) * 16);
    const bx = right ? w / 2 - 34 - ww : -w / 2 + 34; ctx.fillStyle = right ? '#2B2219' : '#EDE3D4'; ctx.beginPath(); ctx.roundRect(bx, yy, ww, 52, 20); ctx.fill();
    setFont(ctx, `400 19px "Space Mono"`, 0); ctx.fillStyle = right ? '#FBF6EE' : '#2B2219'; ctx.fillText(s, bx + 18, yy + 33); ctx.restore(); };
  bub(-250, 230, false, T.in + .3, 'udah sampai?');
  bub(-180, 200, true, T.in + .7, 'otw ya');
  bub(-110, 250, false, T.in + 1.1, 'oke, kabarin');
  // kolom ketik + kursor
  ctx.fillStyle = '#EDE3D4'; ctx.beginPath(); ctx.roundRect(-w / 2 + 30, 66, w - 60, 50, 25); ctx.fill();
  const typed = 'nanti aku tel'.slice(0, Math.max(0, Math.floor((t - T.type) * 9)));
  setFont(ctx, `400 19px "Space Mono"`, 0); ctx.fillStyle = '#2B2219'; ctx.fillText(typed, -w / 2 + 50, 98);
  if (Math.floor(t * 2.5) % 2) ctx.fillRect(-w / 2 + 52 + ctx.measureText(typed).width, 78, 2, 26);
  // baris saran: fitur pintar muncul satu per satu (tiap ketuk → riak)
  const chips = [['saran kata', T.c[0]], ['terjemahkan', T.c[1]], ['edit foto', T.c[2]], ['filter spam', T.c[3]]];
  chips.forEach(([s, t0], i) => { const kc = pop(t, t0, .55, .3); if (kc <= 0) return; const yy = 140 + i * 50;
    ctx.save(); ctx.translate(0, yy + 20); ctx.scale(Math.min(1.08, kc), Math.min(1.08, kc)); ctx.fillStyle = i === 3 ? '#2B2219' : 'rgba(43,34,25,.1)';
    ctx.beginPath(); ctx.roundRect(-130, -20, 260, 40, 12); ctx.fill(); setFont(ctx, MN(16), 2); ctx.fillStyle = i === 3 ? '#FBF6EE' : '#2B2219'; ctx.textAlign = 'center';
    ctx.fillText('✦ ' + s, 0, 6); ctx.textAlign = 'left'; ctx.restore();
    const r = inv(t0, t0 + .5, t); if (r > 0 && r < 1) { ctx.strokeStyle = `rgba(43,34,25,${.5 * (1 - r)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(90, yy + 20, 10 + 40 * r, 0, 7); ctx.stroke(); } });
  ctx.restore();
}
// panel kenop mixer (badan dicache, kenop digambar hidup)
let MIX;
function mixer(ctx, t, A) {
  const Wp = 1320, Hp = 420;
  if (!MIX) { const [c, g] = mk(Wp + 80, Hp + 80); g.translate(40, 40);
    g.shadowColor = 'rgba(60,30,0,.4)'; g.shadowBlur = 40; g.shadowOffsetY = 20; const gr = g.createLinearGradient(0, 0, 0, Hp); gr.addColorStop(0, '#2A2620'); gr.addColorStop(1, '#16130F');
    g.fillStyle = gr; g.beginPath(); g.roundRect(0, 0, Wp, Hp, 22); g.fill(); g.shadowColor = 'transparent';
    for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(255,240,220,${.012 + rnd(i) * .02})`; g.fillRect(0, rnd(i + 3) * Hp, Wp, 1); }   // garis sikat logam
    g.strokeStyle = 'rgba(255,240,220,.08)'; g.lineWidth = 2; for (let c2 = 1; c2 < 12; c2++) { g.beginPath(); g.moveTo(c2 * Wp / 12, 24); g.lineTo(c2 * Wp / 12, Hp - 24); g.stroke(); }
    for (const [sx, sy] of [[20, 20], [Wp - 20, 20], [20, Hp - 20], [Wp - 20, Hp - 20]]) { g.fillStyle = '#4A4337'; g.beginPath(); g.arc(sx, sy, 7, 0, 7); g.fill(); }
    g.font = '700 13px "Space Mono"'; g.fillStyle = 'rgba(255,240,220,.4)'; for (let c2 = 0; c2 < 12; c2++) g.fillText('CH ' + String(c2 + 1).padStart(2, '0'), c2 * Wp / 12 + 30, Hp - 30);
    MIX = c; }
  ctx.drawImage(MIX, -Wp / 2 - 40, -Hp / 2 - 40);
  ctx.save(); ctx.translate(-Wp / 2, -Hp / 2);
  for (let r = 0; r < 3; r++) for (let c2 = 0; c2 < 12; c2++) {
    const i = r * 12 + c2, x = c2 * Wp / 12 + Wp / 24, y = 70 + r * 105, R = 30;
    const a1 = spring(t - A.kenop - (c2 + r) * .05, .5, .5) * (rnd(i) - .4) * 2.4, a2 = spring(t - A.belajar - rnd(i + 9) * .6, .45, .45) * (rnd(i + 5) - .5) * 3;
    const ang = -2.2 + rnd(i + 2) * 2.6 + a1 + a2 + (t > A.belajar ? Math.sin(t * 3 + i) * .08 : 0);
    ctx.strokeStyle = 'rgba(255,240,220,.18)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, R + 9, 2.3, 7.1); ctx.stroke();
    const g2 = ctx.createRadialGradient(x - 8, y - 10, 2, x, y, R); g2.addColorStop(0, '#6B6152'); g2.addColorStop(1, '#2E2922');
    ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill();
    ctx.strokeStyle = '#F1E8D8'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * 8, y + Math.sin(ang) * 8); ctx.lineTo(x + Math.cos(ang) * (R - 5), y + Math.sin(ang) * (R - 5)); ctx.stroke();
  }
  ctx.restore();
}

export function makeFilm() {
  theme(true, { bg: '#E8C49A', bgrgb: '232,196,154', ink: '#1E1810', inkrgb: '30,24,16', vig: .22 });
  const { T: A, DUR } = timing(B);
  const IM = {}, VD = {}; let M = null;
  async function load() {
    const k = '../assets/shared/kutipan/', g = '../assets/shared/grafik/', v = '../assets/shared/vid/';
    [IM.nez, IM.kom, IM.iloBlog, IM.imf, IM.metro, IM.ant, IM.ilo, IM.apj, IM.arc] = await Promise.all([
      loadImg(k + 'portal-berita-kini-nezar-patria-industri.png', 2000), loadImg(k + 'komdigi-kementerian-komunikasi-dan-digital.png', 2000),
      loadImg(k + 'ilo-navigating-generative-ai-s.png', 1800), loadImg(k + 'imf-ai-will-transform-the-global-economy-let.png', 1800),
      loadImg(k + 'metrotvnews-survei-apjii-gen-z-paling-banyak.png', 1600), loadImg(k + 'antaranews-google-indonesia-punya-basis-pengguna-ai.png', 1600),
      loadImg(g + 'ilo-paparan-ai-asean-2.png', 1920), loadImg(g + 'apjii-akses-ai-2025-2026-2.png', 1920), loadImg(g + 'arc-agi-3-astra-dua-pembungkus.png', 1920)]);
    const names = { jkt: 'jakarta_indonesia', traf: 'dynamic_traffic', bar: 'barista_skillfully', iron: 'man_irons', tat: 'tattooed_hands', hand: 'hand_making',
      fold: 'efficient_folding', mom: 'child_mother', kid: 'young_child', pour: 'pour_coffee', type: 'hands_typing', srv: 'server_units' };
    await Promise.all(Object.entries(names).map(async ([kk, n]) => { VD[kk] = await loadVid(v, n); }));
    // sumber titik = frame 0 jalan, skala sama dengan plate (×1,10 setelah 9 s), grade sama
    const f0 = VD.traf.img[0], [sc, sg] = mk(1600, 900), s = Math.max(1600 / f0.width, 900 / f0.height) * 1.1;
    sg.filter = GR; sg.drawImage(f0, 800 - f0.width * s / 2, 450 - f0.height * s / 2, f0.width * s, f0.height * s);
    M = buildMorph(sc, IM.ilo, { w: 1600, h: 900, step: 16, tstep: 8, hot: [1110, 640, 1180, 905] });
  }
  const PER = 178 / 15;                                           // satu putaran pingpong klip 90 frame @15 fps
  const MW = { w1: A.ilo, w2: A.pbb, b1: A.generatif, b2: A.generatif + .6 };
  const Z4 = 7800, Z0 = 19 * 2600;
  const STEPS = makeSteps([['run', 4], ['land', 1060], ['run', 4], ['land', 1560], ['run', 4], ['land', 1500], ['run', 14]], Z0 + 900);
  const LANG = { 12: ['INDONESIA', A.indo], 14: ['JAWA', A.jawa], 16: ['SUNDA', A.sunda], 18: ['BALI', A.bali], 20: ['BATAK', A.batak] };
  const LT = Object.values(LANG).map(l => l[1]);
  const stairsWorld = idx => function (ctx, t, pr, foc, items, c) {
    if (c.i !== idx) return;
    stairs5(ctx, t, pr, items, STEPS, () => clamp((t - (A.kabar - .55)) / .6), {
      lime: i => { const L = LANG[i]; if (!L) return 0; const n = LT.find(x => x > L[1] + .01); return kq(t, L[1] - .05, .25) * (n ? 1 - kq(t, n - .05, .25) : 1); },
      label: i => { const L = LANG[i]; return L ? { text: L[0], a: kq(t, L[1] - .7, .4) } : null; } });
  };

  const ST = [
    // S1 · kartu bab di atas Jakarta dari udara
    { at: 0, name: 'Kartu bab', yaw: [-4, 3], dist: [1600, 1420], draw(ctx, t) {
      wplate(ctx, VD.jkt, t, 0, 0, 1720, 968, E.outCubic(inv(0, .9, t)), { dim: .36 });
      txt(ctx, 'BAB 05', -760, -300, t, .55, MN(26), { ls: 8, col: IVA(.8) });
      fall(ctx, 'ARTINYA BUAT KITA', -770, -110, t, .7, DSP(210), { ls: 4, col: IVORY });
      markLine(ctx, 'istilah AGI sudah sampai ke ', 'Jakarta', '', -760, 50, t, A.agi - .2, A.jakarta, SRF(70), { align: 'left', col: IVORY });
      txt(ctx, 'DIUCAPKAN PEJABAT KITA', -760, 150, t, A.diucapkan, MN(24), { ls: 6, col: IVA(.78) });
    }, layers: [{ dz: -480, dx: 1010, dy: 380, fn: (ctx, t) => wplate(ctx, VD.traf, t, 0, 0, 640, 360, kq(t, 1.6, .6), { marks: false }) }] },

    // S2 · Nezar Patria (evidFull di post) → negara besar berpacu → kutipan "mirip manusia"
    { at: A.juli, via: 'push', name: 'Nezar Patria', draw(ctx, t) {
      slab(ctx, 'NEGARA BESAR BERPACU MENUJU AGI', -780, -410, t, A.bilang + .5, { size: 24 });
      for (let i = 0; i < 4; i++) { const y = -310 + i * 62, p = E.outCubic(inv(A.berpacu - .4 + i * .1, A.berpacu + 1.7 + i * .25, t)) * (.97 - i * .06);
        if (p <= 0) continue; const x1 = lerp(-780, 640, p);
        ctx.fillStyle = ivo(.14); ctx.fillRect(-780, y - 2, 1420, 4); ctx.fillStyle = ivo(.85); ctx.fillRect(-780, y - 3, x1 + 780, 6);
        ctx.beginPath(); ctx.arc(x1, y, 11, 0, 7); ctx.fill(); }
      const kf = kq(t, A.berpacu, .5); if (kf > 0) { ctx.save(); ctx.globalAlpha *= kf; ctx.fillStyle = ivo(.9); ctx.fillRect(680, -350, 6, 230 * kf); setFont(ctx, DSP(120), 4); ctx.fillText('AGI', 706, -230); ctx.restore(); }
      txt(ctx, 'MENURUT NEZAR PATRIA · WAMEN KOMDIGI', -780, 20, t, A.agi2 + .3, MN(22), { ls: 4, col: ivo(.7) });
      txt(ctx, '“… artificial general intelligence,', -780, 120, t, A.agi2 + .5, SRF(60));
      markLine(ctx, 'suatu kemampuan AI yang sudah ', 'mirip', ' dengan manusia”', -780, 210, t, A.agi2 + .9, A.mirip, SRF(60), { align: 'left' });
      srcTag(ctx, 'Sumber: Komdigi; Tempo, 11 Jul 2025', -780, 440, t, A.agi2 + 1.2);
    }, layers: [{ dz: 800, dx: -1250, dy: -120, ry: 10, fn: (ctx, t) => IM.nez && evid(ctx, IM.nez, 0, 0, 1000, t, A.bilang + .4, { crop: NEZ, rot: -3 }) }] },

    // S3 · JANGAN TERTINGGAL
    { at: A.pesan, via: 'whip', name: 'Jangan tertinggal', draw(ctx, t) {
      txt(ctx, 'Pesan beliau jelas:', -800, -330, t, A.pesan + .05, SRF(64));
      txt(ctx, 'INDONESIA', -800, -230, t, A.indonesia, MN(30), { ls: 10, col: ivo(.8) });
      fall(ctx, 'JANGAN', -810, 0, t, A.jangan - .05, DSP(250), { ls: 6 });
      markLine(ctx, '', 'TERTINGGAL', '', -800, 250, t, A.tertinggal - .25, A.tertinggal, DSP(250), { align: 'left', ls: 6 });
    }, layers: [{ dz: 350, dx: 560, dy: -260, ry: -11, fn: (ctx, t) => IM.nez && evid(ctx, IM.nez, 0, 0, 980, t, A.pesan + .2, { crop: NEZ, rot: 2, tab: 'KOMDIGI.GO.ID · 10 JUL 2025', hl: [[.568, .574, .41, .085, A.tertinggal]] }) }] },

    // S4–S6 · garis waktu Perpres (truck menyamping)
    { at: A.aturan - .1, via: 'rise', z: Z4, name: 'Perpres', draw(ctx, t) {
      tline(ctx); pin(ctx, t, A.selesai);
      txt(ctx, 'Aturan mainnya?', -800, -360, t, A.aturan, SRF(72));
      txt(ctx, 'PEMBAHASAN PERPRES · LINTAS KEMENTERIAN', -800, -290, t, A.pembahasan, MN(22), { ls: 4, col: ivo(.7) });
      sheet(ctx, t, -400, -60, A.etika - .1, 'RANCANGAN PERPRES', 'ETIKA AI', -5);
      sheet(ctx, t, 320, -50, A.peta - .1, 'RANCANGAN PERPRES', 'PETA JALAN AI', 4);
      fall(ctx, '5 MEI 2026', 0, 365, t, A.mei - .3, DSP(110), { align: 'center', ls: 3 });
      check(ctx, 300, 325, 40, t, A.mei + .1);
      txt(ctx, 'PEMBAHASAN RAMPUNG', 0, 412, t, A.mei + .15, MN(24), { ls: 6, align: 'center', col: ivo(.8) });
      srcTag(ctx, 'Sumber: JDIH Komdigi', -800, 470, t, A.mei + .4);
    } },
    { at: A.juli2, via: 'truck', x: 2600, z: Z4, name: 'Sebentar lagi', draw(ctx, t) {
      tline(ctx); pin(ctx, t, A.juli2 - .1);
      fall(ctx, 'JUL 2026', 0, 365, t, A.juli2 - .1, DSP(110), { align: 'center', ls: 3 });
      txt(ctx, 'MENURUT SEORANG DIRJEN KOMDIGI', -800, -330, t, A.direktur, MN(24), { ls: 5, col: ivo(.75) });
      markLine(ctx, '“', 'Sebentar lagi', ' ditandatangani Presiden.”', -800, -190, t, A.direktur + .5, A.sebentar, SRF(78), { align: 'left' });
      const ks = kq(t, A.ditandatangani - .2, .6); if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; ctx.fillStyle = ivo(.6); ctx.fillRect(-300, 40, 600 * ks, 3);
        setFont(ctx, MN(18), 6); ctx.fillText('TTD PRESIDEN', -300, 80); if (Math.floor(t * 2.4) % 2) ctx.fillRect(-300, -30, 4, 62); ctx.restore(); }
      srcTag(ctx, 'Sumber: Tempo, 16 Jul 2026', -800, 470, t, A.sebentar + .3);
    } },
    { at: A.tapi - .1, via: 'truck', x: 5200, z: Z4, name: 'Rancangan', draw(ctx, t) {
      tline(ctx); pin(ctx, t, A.okt22 - .2);
      fall(ctx, '22 OKT 2026', 0, 365, t, A.okt22 - .2, DSP(110), { align: 'center', ls: 3 });
      txt(ctx, 'TAPI PER 22 OKTOBER 2026', -800, -400, t, A.tapi, MN(24), { ls: 5, col: ivo(.75) });
      txt(ctx, 'KOMDIGI MASIH MENYEBUTNYA', -800, 130, t, A.komdigi2, MN(24), { ls: 5, col: ivo(.8) });
      stamp(ctx, 'RANCANGAN', 330, 115, t, A.rancangan, { size: 120, rot: -6 });
      srcTag(ctx, 'Sumber: Komdigi, siaran pers Okt 2026', -800, 470, t, A.okt22 + .5);
    }, layers: [{ dz: 250, dy: -160, ry: -10, fn: (ctx, t) => IM.kom && evid(ctx, IM.kom, 0, 0, 1300, t, A.okt22 - .1, { crop: [.1, .22, .8, .3], dark: true, tab: 'KOMDIGI.GO.ID · SIARAN PERS', hl: [[.236, .753, .114, .087, A.okt22 + .4]] }) }] },

    // S7 · callback "sebentar lagi" sejak 1956: kursor menyapu garis tahun, cap lama berjejer
    { at: A.sebentar2, via: 'push', name: 'Sejak 1956', draw(ctx, t) {
      stamp(ctx, 'SEBENTAR LAGI', 0, -330, t, A.sebentar2 + .05, { size: 120, rot: -4 });
      const X = yr => -720 + (yr - 1956) * 1440 / 70, ka = kq(t, A.kalimat - .3, .6);
      if (ka > 0) { ctx.save(); ctx.globalAlpha *= ka; ctx.fillStyle = ivo(.4); ctx.fillRect(-720, -40, 1440 * ka, 3);
        for (let yr = 1956; yr <= 2026; yr++) { const tall = yr % 10 === 0 || yr === 1956 || yr === 2026; ctx.fillRect(X(yr) - 1, -40, 2, tall ? 26 : 11); }
        setFont(ctx, MN(18), 2); ctx.fillStyle = ivo(.6); ctx.textAlign = 'center'; for (const yr of [1956, 1970, 1980, 1990, 2000, 2010, 2026]) ctx.fillText(String(yr), X(yr), 14); ctx.textAlign = 'left'; ctx.restore(); }
      const u = E.inOutCubic(inv(A.y1956 - .2, A.ternyata2, t)), yr = Math.round(lerp(1956, 2026, u));
      for (const [y0, j] of [[1956, 0], [1969, 1], [1984, 2], [1999, 3], [2013, 4]]) if (yr >= y0 && t > A.y1956 - .3) {        // cap lama: garis tinta, bukan lime
        const k = Math.min(1.1, pop(t, A.y1956 - .2 + u * 0 + (y0 - 1956) / 70 * (A.ternyata2 - A.y1956 + .2))); if (k <= 0) continue;
        ctx.save(); ctx.translate(X(y0), -105 - (j % 2) * 44); ctx.rotate(-5 * D2R); ctx.scale(k, k); setFont(ctx, MN(15), 3); const tw = ctx.measureText('SEBENTAR LAGI').width;
        ctx.strokeStyle = ivo(.55); ctx.lineWidth = 2; ctx.strokeRect(-tw / 2 - 10, -16, tw + 20, 28); ctx.fillStyle = ivo(.7); ctx.textAlign = 'center'; ctx.fillText('SEBENTAR LAGI', 0, 4); ctx.textAlign = 'left'; ctx.restore(); }
      if (t > A.y1956 - .3) { const cx = X(lerp(1956, 2026, u)); ctx.fillStyle = ivo(.95); ctx.fillRect(cx - 2, -60, 4, 40); setFont(ctx, DSP(120), 2); ctx.textAlign = 'center'; ctx.fillText(String(yr), cx, 150); ctx.textAlign = 'left'; }
      txt(ctx, 'KALIMAT YANG SAMA SEJAK 1956', 0, 220, t, A.kalimat, MN(22), { ls: 6, align: 'center', col: ivo(.7) });
      markLine(ctx, 'ternyata ', 'awet', ' juga ya.', 0, 360, t, A.ternyata2 - .25, A.awet, SRF(86));
    } },

    // S8 · ★ ORANG JADI ANGKA: jalan → titik → grafik ILO → jalan
    { at: A.soal - .1, via: 'rise', name: 'Orang jadi angka',
      cam(t) { return { yaw: lerp(-3, 2.5, inv(this.at, A.satu, t)), dist: lerp(1540, 1960, E.inOutCubic(inv(A.ilo - .2, A.pbb + 1.6, t))) - 230 * E.inOutCubic(inv(A.generatif, A.artinya + .4, t)),
        tx: 0, ty: this.py - 20, tz: this.z, pitch: 5 }; },
      draw(ctx, t) {
        const { w1, w2, b1, b2 } = MW;
        const panel = inv(w2 - .1, w2 + .7, t) * (1 - inv(b1 + .2, b1 + .9, t));
        if (panel > 0) { ctx.save(); ctx.globalAlpha *= panel; ctx.fillStyle = ISL; ctx.fillRect(-800, -450, 1600, 900); ctx.restore(); }
        const pa = clamp(1 - inv(w1 - .1, w1 + .25, t) + inv(b2 + 1.0, b2 + 1.4, t));
        if (pa > 0) { ctx.save(); ctx.globalAlpha *= pa; wplate(ctx, VD.traf, t, 0, 0, 1600, 900, 1, { t0: t < A.pbb ? A.ilo - PER : b2 + 1.2 - PER, dim: .34 * inv(b2 + 1.3, A.artinya, t) }); ctx.restore(); }
        const ca = inv(A.pbb + 1.3, A.pbb + 1.8, t) * (1 - inv(b1 - .05, b1 + .3, t));
        if (M && t > w1 - .35 && t < b2 + 1.6 && ca < 1) { ctx.save(); ctx.globalAlpha *= inv(w1 - .35, w1, t) * (1 - inv(b2 + 1.2, b2 + 1.6, t)); ctx.drawImage(drawMorph(M, t, MW, PAL), -800, -450); ctx.restore(); }
        if (ca > 0) { ctx.save(); ctx.globalAlpha *= ca; ctx.drawImage(IM.ilo, -800, -450, 1600, 900);
          const kb = E.outCubic(inv(A.indonesia2, A.indonesia2 + .45, t)), yb = 903 / 1.2 - 450, yt = 681 / 1.2 - 450;
          if (kb > 0) { ctx.fillStyle = LIME; ctx.fillRect(1120 / 1.2 - 800, yb - (yb - yt) * kb, 49 / 1.2, (yb - yt) * kb); }
          fall(ctx, '21,7%', 130, 30, t, A.indonesia2 + .1, DSP(200), { ls: 2, col: IVORY });
          ctx.restore(); }
        txt(ctx, 'Soal pekerjaan…', -740, -330, t, A.soal + .1, SRF(76), { col: IVORY, a: 1 - inv(w1 - .2, w1 + .2, t) });
        slab(ctx, 'MENURUT ILO · ORGANISASI BURUH DI BAWAH PBB', -800, -505, t, A.ilo, { size: 22 });
        srcTag(ctx, 'Sumber: ILO, Jul 2026 (estimasi 2025), paparan di atas minimal', -800, 525, t, A.indonesia2 + .5);
        slab(ctx, 'AI GENERATIF = AI PEMBUAT TEKS / GAMBAR', 800, -505, t, A.pembuat - .2, { size: 22, align: 'right' });
        txt(ctx, 'Artinya buat kita:', -740, 20, t, A.artinya, SRF(96), { col: IVORY });
      } },

    // S9 · 1 dari 5 (lima pekerja, satu menyala) + b-roll tangan bekerja di bidang belakang
    { at: A.satu - .6, via: 'whip', name: '1 dari 5', draw(ctx, t) {
      fall(ctx, '21,7% ≈ 1 DARI 5', 0, -300, t, A.satu - .3, DSP(150), { align: 'center', ls: 3 });
      txt(ctx, 'DIBULATKAN', 0, -250, t, A.satu + .3, MN(18), { ls: 8, align: 'center', col: ivo(.55) });
      for (let i = 0; i < 5; i++) { const x = -560 + i * 280, k = pop(t, A.satu - .2 + i * .08), on = i === 2 ? kq(t, A.lima, .3) : 0; if (k <= 0) continue;
        ctx.save(); ctx.translate(x, 190); ctx.scale(Math.min(k, 1.1), Math.min(k, 1.1));
        if (on > 0) { ctx.save(); ctx.globalAlpha *= on; ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(0, -125, 165 * (.6 + .4 * on), 0, 7); ctx.fill(); ctx.restore(); }
        orang(ctx, 0, 0, 260, { style: 'piktogram', col: on > .5 ? LIME_INK : ivo(.82) }); ctx.restore(); }
      txt(ctx, 'PEKERJAANNYA BISA IKUT BERUBAH', 0, 330, t, A.berubah - .4, MN(26), { ls: 6, align: 'center', col: ivo(.85) });
    }, layers: [
      { dz: 900, dx: -1420, dy: -380, fn: (ctx, t) => wplate(ctx, VD.bar, t, 0, 0, 900, 506, kq(t, A.satu - .3, .6), { marks: false }) },
      { dz: 700, dx: 1360, dy: -400, fn: (ctx, t) => wplate(ctx, VD.iron, t, 0, 0, 860, 484, kq(t, A.satu + .3, .6), { marks: false }) },
      { dz: 1100, dx: 1500, dy: 470, fn: (ctx, t) => wplate(ctx, VD.tat, t, 0, 0, 940, 529, kq(t, A.lima, .6), { marks: false }) },
      { dz: 800, dx: -1400, dy: 470, fn: (ctx, t) => wplate(ctx, VD.hand, t, 0, 0, 880, 495, kq(t, A.lima + .5, .6), { marks: false }) },
      { dz: 1400, dx: 0, dy: -620, fn: (ctx, t) => wplate(ctx, VD.fold, t, 0, 0, 640, 360, kq(t, A.berubah - .8, .6), { marks: false }) }] },

    // S10 · tersentuh ≠ dipecat
    { at: A.tapi2, via: 'push', name: 'Bukan dipecat', draw(ctx, t) {
      txt(ctx, 'Tapi tenang,', -780, -330, t, A.tapi2, SRF(70));
      markLine(ctx, '', 'TERSENTUH', '', -780, -70, t, A.tersentuh2 - .3, A.tersentuh2 + .1, DSP(220), { align: 'left', ls: 4 });
      txt(ctx, 'BUKAN BERARTI', -780, 40, t, A.tersentuh2 + .5, MN(26), { ls: 8, col: ivo(.75) });
      const wd = fall(ctx, 'DIPECAT', -790, 300, t, A.dipecat - .25, DSP(220), { ls: 4 });
      if (wd) strike(ctx, -790, -790 + wd, 300, 220, t, A.dipecat + .25);
    }, layers: [
      { dz: 300, dx: 520, dy: -110, ry: -9, fn: (ctx, t) => wplate(ctx, VD.mom, t, 0, 0, 720, 405, kq(t, A.tapi2 + .1, .6)) },
      { dz: 700, dx: 960, dy: 330, fn: (ctx, t) => wplate(ctx, VD.pour, t, 0, 0, 560, 315, kq(t, A.tersentuh2, .6), { marks: false }) }] },

    // S11 · blog ILO: mengubah tugas, bukan menghapus pekerjaan
    { at: A.menurut - .3, via: 'whip', name: 'Mengubah tugas', draw(ctx, t) {
      txt(ctx, 'MENURUT ILO, AI GENERATIF LEBIH CENDERUNG', -780, 95, t, A.menurut + .2, MN(22), { ls: 4, col: ivo(.75) });
      markLine(ctx, '', 'MENGUBAH TUGAS', ' HARIAN', -780, 220, t, A.mengubah - .4, A.mengubah, DSP(120), { align: 'left', ls: 3 });
      const wd = fall(ctx, 'MENGHAPUS PEKERJAAN', -790, 350, t, A.menghapus - .3, DSP(120), { ls: 3, col: ivo(.6) });
      if (wd) strike(ctx, -790, -790 + wd, 350, 120, t, A.menghapus + .4);
      srcTag(ctx, 'Sumber: ILO (blog Employment in Focus; ILO Brief ASEAN, Jul 2026)', -780, 480, t, A.menurut + .6);
    }, layers: [{ dz: 200, dx: 60, dy: -170, ry: 10, fn: (ctx, t) => IM.iloBlog && evid(ctx, IM.iloBlog, 0, 0, 1250, t, A.menurut - .2, { tab: 'ILO.ORG · EMPLOYMENT IN FOCUS', hl: [[.02, .15, .62, .13, A.menurut + .7]] }) }] },

    // S12 · IMF, angka dunia
    { at: A.untuk, via: 'whip', name: 'IMF 40%', draw(ctx, t) {
      globe(ctx, -540, -60, 330, t, A.untuk, { a: .22, lw: 3 });
      txt(ctx, 'UNTUK SELURUH DUNIA', -800, -400, t, A.untuk + .1, MN(24), { ls: 6, col: ivo(.8) });
      fall(ctx, '≈40%', -800, 320, t, A.empatpuluh - .15, DSP(260), { ls: 3 });
      slab(ctx, 'ANGKA DUNIA, BUKAN INDONESIA', -800, 395, t, A.empatpuluh + .5, { size: 22 });
      srcTag(ctx, 'Sumber: IMF, 14 Jan 2024 (angka dunia, bukan Indonesia)', -800, 470, t, A.empatpuluh + .8);
    }, layers: [{ dz: 250, dx: 360, dy: -60, ry: -10, fn: (ctx, t) => IM.imf && evid(ctx, IM.imf, 0, 0, 1100, t, A.imf - .15, { tab: 'IMF.ORG · BLOG', hl: [[.184, .600, .484, .055, A.hampir]] }) }] },

    // S13 · teka-teki: berita Metro TV soal survei APJII
    { at: A.nah, via: 'rise', name: 'Teka-teki', draw(ctx, t) {
      markLine(ctx, 'Nah, ada ', 'teka-teki', '.', -780, -330, t, A.nah, A.tekateki, SRF(96), { align: 'left' });
      txt(ctx, 'MENURUT SURVEI APJII · ASOSIASI PENYEDIA INTERNET', -780, -240, t, A.menurut2, MN(22), { ls: 4, col: ivo(.75) });
    }, layers: [{ dz: 120, dx: 160, dy: 130, ry: 10, fn: (ctx, t) => IM.metro && evid(ctx, IM.metro, 0, 0, 1300, t, A.menurut2 - .1, { crop: [0, .12, 1, .6], tab: 'METROTVNEWS.COM · 22 MEI 2026', hl: [[.035, .11, .885, .2, A.menurut2 + .7]] }) }] },

    // S14 · grafik APJII: 2026 tumbuh dulu (18,2), lalu 2025 (27,3), panah turun
    { at: A.apjii, via: 'push', name: 'APJII turun', yaw: [-5, 4], dist: [1640, 1500], draw(ctx, t) {
      const ki = kq(t, A.apjii - .1, .6); if (ki <= 0) return; ctx.save(); ctx.translate(0, (1 - ki) * 80); ctx.globalAlpha *= clamp(ki * 1.5);
      island(ctx, IM.apj, 0, -20, 1440, 1, t);
      const Y = py => py * .75 - 425, X = px => px * .75 - 720, cover = (x0, x1, yTop, yb, g, labTop) => {
        ctx.fillStyle = ISL; const yc = yb - g * (yb - yTop); ctx.fillRect(X(x0) - 2, Y(yTop) - 2, (x1 - x0) * .75 + 4, yc === yb ? (yb - yTop) * .75 + 4 : (yc - yTop) * .75 + 2);
        if (g < .98) ctx.fillRect(X(x0) - 50, Y(labTop), (x1 - x0) * .75 + 100, Y(yTop) - Y(labTop) - 2); };
      const g26 = E.outCubic(inv(A.delapan - .1, A.delapan + .6, t)), g25 = E.outCubic(inv(A.turun - .1, A.turun + .5, t));
      cover(1402, 1450, 530, 903, g26, 470); cover(558, 606, 343, 903, g25, 280);
      if (g26 > 0) { ctx.fillStyle = LIME; ctx.globalCompositeOperation = 'multiply'; const yt = lerp(Y(903), Y(530), g26); ctx.fillRect(X(1402), yt, 48 * .75, Y(903) - yt); ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(200,245,60,.85)'; ctx.fillRect(X(1402), yt, 48 * .75, Y(903) - yt); }
      const ka = E.inOutCubic(inv(A.tiga - .3, A.tiga + .5, t)); if (ka > 0) {                    // panah turun 2025 → 2026
        const p0 = [X(582) + 40, Y(343) - 70], p1 = [X(1426) - 40, Y(530) - 80], cx = (p0[0] + p1[0]) / 2, cy = Math.min(p0[1], p1[1]) - 120;
        ctx.strokeStyle = IVA(.9); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); const N = 30;
        for (let i = 0; i <= N * ka; i++) { const u = i / N, x = (1 - u) * (1 - u) * p0[0] + 2 * u * (1 - u) * cx + u * u * p1[0], y = (1 - u) * (1 - u) * p0[1] + 2 * u * (1 - u) * cy + u * u * p1[1]; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke(); if (ka > .95) { ctx.fillStyle = IVA(.9); ctx.beginPath(); ctx.moveTo(p1[0] + 4, p1[1] + 12); ctx.lineTo(p1[0] - 22, p1[1] - 10); ctx.lineTo(p1[0] + 12, p1[1] - 20); ctx.closePath(); ctx.fill(); }
        txt(ctx, 'TURUN', cx, cy - 22, t, A.tiga, MN(26), { ls: 8, align: 'center', col: IVA(.9) }); }
      ctx.restore();
      slab(ctx, 'PESERTA YANG MENGAKU MEMAKAI AI', -720, -475, t, A.delapan + .9, { size: 22 });
      srcTag(ctx, 'Sumber: APJII via Metro TV, 22 Mei 2026', -720, 455, t, A.apjii + .8);
    } },

    // S15 · alasan terbanyak: belum tahu (ilustrasi 100 figur)
    { at: A.alasan, via: 'whip', name: 'Tidak tahu', draw(ctx, t) {
      txt(ctx, 'Alasan terbesar belum memakai AI:', -800, -380, t, A.alasan, SRF(64));
      kerumunan(ctx, 440, 30, 1.5, t, A.alasan + .1, { pattern: 'grid', lit: 47, tLit: A.belum - .3, step: .018, col: ivo(.92) });
      fall(ctx, '46,6%', -800, 120, t, A.belum - .1, DSP(260), { ls: 3 });
      markLine(ctx, '', 'tidak tahu', ' apa itu AI', -800, 260, t, A.belum, A.tahu, SRF(72), { align: 'left' });
      txt(ctx, 'ILUSTRASI · 1 FIGUR ≈ 1%', 70, 450, t, A.belum + .3, MN(18), { ls: 4, col: ivo(.6) });
      srcTag(ctx, 'Sumber: APJII via Metro TV, 22 Mei 2026', -800, 470, t, A.tahu + .2);
    } },

    // S16 · klaim Google 162 juta (berita ANTARA)
    { at: A.tapi3, via: 'truck', name: 'Google 162 juta', draw(ctx, t) {
      txt(ctx, 'TAPI NOVEMBER INI, MENURUT GOOGLE', -800, -430, t, A.tapi3, MN(24), { ls: 5, col: ivo(.8) });
      fall(ctx, fmt(Math.round(countTo(0, 162, t, A.j162 - .1, .8))) + ' JUTA', -800, 320, t, A.j162 - .15, DSP(230), { ls: 3 });
      slab(ctx, 'PENGGUNA AI BULANAN · KLAIM GOOGLE', -800, 395, t, A.bulanan - .2, { size: 22 });
      srcTag(ctx, 'Sumber: ANTARA, 11 Nov 2026 (klaim Google)', -800, 470, t, A.google + .6);
    }, layers: [{ dz: 220, dx: 330, dy: -150, ry: -10, fn: (ctx, t) => IM.ant && evid(ctx, IM.ant, 0, 0, 1120, t, A.google - .2, { tab: 'ANTARANEWS.COM · 11 NOV 2026', hl: [[.03, .22, .9, .1, A.google + .6]] }) }] },

    // S17 · layar paradoks: dua angka berhadapan, label metode, tanpa operasi kurang
    { at: A.lho, via: 'push', name: 'Paradoks',
      cam(t) { const u = E.inOutCubic(inv(A.apjii2 - .3, A.google2 + .3, t)); return { yaw: lerp(-7, 7, u), dist: lerp(1680, 1520, inv(this.at, A.dugaanku, t)), tx: lerp(-110, 110, u), ty: this.py - 20, tz: this.z, pitch: 5 }; },
      draw(ctx, t) {
        txt(ctx, 'Lho, jadi yang benar yang mana?', 0, -380, t, A.lho, SRF(70), { align: 'center', a: gone(t, A.duaduanya - .25) });
        txt(ctx, 'Dua-duanya bisa benar.', 0, -380, t, A.duaduanya, SRF(70), { align: 'center' });
        const kd = kq(t, A.lho + .2, .8); ctx.fillStyle = ivo(.25 * kd); ctx.fillRect(-1, -250, 2, 560 * kd);
        markLine(ctx, 'BEDA ', 'METODE', ', JANGAN DIKURANGKAN', 0, 420, t, A.mengukurnya - .3, A.mengukurnya + .2, DSP(96), { ls: 3 });
        txt(ctx, 'KLAIM PERUSAHAAN', 470, 330, t, A.klaim, MN(20), { ls: 6, align: 'center', col: ivo(.7) });
      },
      layers: [
        { dz: 0, dx: -470, ry: 14, fn: (ctx, t) => { fall(ctx, '18,2%', 0, 20, t, A.lho + .1, DSP(230), { align: 'center', ls: 3 });
          txt(ctx, 'SURVEI APJII · % RESPONDEN', 0, 90, t, A.lho + .5, MN(22), { ls: 4, align: 'center', col: ivo(.75) });
          diukur(ctx, -210, 130, 420, t, A.apjii2, 'tanya langsung peserta'); } },
        { dz: 0, dx: 470, ry: -14, fn: (ctx, t) => { fall(ctx, '162 JUTA', 0, 20, t, A.lho + .3, DSP(230), { align: 'center', ls: 3 });
          txt(ctx, 'KLAIM GOOGLE · PENGGUNA BULANAN', 0, 90, t, A.lho + .7, MN(22), { ls: 4, align: 'center', col: ivo(.75) });
          diukur(ctx, -210, 130, 420, t, A.google2, 'hitungan google sendiri'); } }] },

    // S18 · opini narator: AI tanpa sadar, lewat fitur pintar di HP
    { at: A.dugaanku, via: 'whip', name: 'Tanpa sadar', draw(ctx, t) {
      txt(ctx, 'Dugaanku sih…', -800, -330, t, A.dugaanku, SRF(70));
      slab(ctx, 'OPINI NARATOR', -800, -240, t, A.dugaanku + .25, { size: 22 });
      txt(ctx, 'banyak orang sudah memakai AI', -800, -60, t, A.dugaanku + 1.1, SRF(58));
      markLine(ctx, '', 'tanpa sadar', '', -800, 50, t, A.sadar - .3, A.sadar, SRF(92), { align: 'left' });
      txt(ctx, 'LEWAT FITUR PINTAR DI APLIKASI HP', -800, 170, t, A.hp - 1.0, MN(22), { ls: 4, col: ivo(.75) });
      hp(ctx, t, 400, 20, { in: A.dugaanku + .1, type: A.sadar + .9, c: [A.sadar + .5, A.hp - 1.4, A.hp - .4, A.hp + .4] });
    }, layers: [
      { dz: 650, dx: -980, dy: 380, fn: (ctx, t) => wplate(ctx, VD.type, t, 0, 0, 640, 360, kq(t, A.dugaanku + .6, .6), { marks: false }) },
      { dz: 1000, dx: 1300, dy: -340, fn: (ctx, t) => wplate(ctx, VD.kid, t, 0, 0, 600, 338, kq(t, A.sadar, .6), { marks: false }) }] },

    // S19 · callback penggaris: angka tergantung alat ukur (grafik dua pembungkus Astra di samping)
    { at: A.kelihatan, via: 'truck', name: 'Penggaris', draw(ctx, t) {
      txt(ctx, 'Kelihatan kan polanya?', -800, -390, t, A.kelihatan, SRF(66));
      txt(ctx, '18,2%', -800, -150, t, A.kelihatan + .3, DSP(120), { ls: 2 });
      txt(ctx, 'SURVEI APJII', -800, -105, t, A.kelihatan + .4, MN(18), { ls: 5, col: ivo(.6) });
      txt(ctx, '162 JUTA', -420, -150, t, A.kelihatan + .5, DSP(120), { ls: 2 });
      txt(ctx, 'KLAIM GOOGLE', -420, -105, t, A.kelihatan + .6, MN(18), { ls: 5, col: ivo(.6) });
      const kr = kq(t, A.persis, .5); if (kr > 0) ruler(ctx, -770, 0, springSp(t, A.astra, 4.6, 7.2), { max: 100, alpha: kr, label: 'PENGGARIS', every: 20 });
      markLine(ctx, 'Angkanya tergantung ', 'penggaris', ' yang dipakai.', 0, 400, t, A.astra + .6, A.penggaris, SRF(74));
      srcTag(ctx, 'Sumber: ARC Prize, Sep 2026 · APJII via Metro TV · ANTARA', -800, 470, t, A.astra + .3);
    }, layers: [{ dz: 160, dx: 460, dy: -80, ry: -10, fn: (ctx, t) => { const k = kq(t, A.persis - .2, .6); if (k <= 0) return;
      ctx.save(); ctx.translate(0, (1 - k) * 90); island(ctx, IM.arc, 0, 0, 780, k, t); setFont(ctx, MN(17), 4); ctx.fillStyle = ivo(.7 * k); ctx.fillText('SKOR ASTRA · DUA PEMBUNGKUS', -390, -245); ctx.restore(); } }] },

    // S20–S23 · tangga: kita bukan cuma penonton
    { at: A.kabar, via: 'rise', z: Z0, name: 'Bukan penonton', draw(ctx, t) {
      txt(ctx, 'KABAR BAIKNYA', 0, -430, t, A.kabar, MN(26), { ls: 8, align: 'center', col: ivo(.8) });
      markLine(ctx, 'kita bukan cuma penonton di bawah ', 'tangga', '', 0, -330, t, A.kabar + .5, A.tangga, SRF(70));
      kerumunan(ctx, 0, 360, 1, t, A.penonton - .3, { pattern: 'baris', n: 9, gap: 190, fill: 'rgba(30,24,16,.5)', a: .25 });
    }, world: stairsWorld(19) },
    { at: A.sahabat - .2, via: 'rise', z: Z0 + 2600, py: -1060, name: 'Sahabat-AI', draw(ctx, t) {
      txt(ctx, 'INDONESIA PUNYA', 0, -330, t, A.indonesia3, MN(26), { ls: 8, align: 'center', col: ivo(.8) });
      fall(ctx, 'SAHABAT-AI', 0, -100, t, A.sahabat - .1, DSP(230), { align: 'center', ls: 5 });
      txt(ctx, 'INDOSAT', -60, 30, t, A.indosat - .1, DSP(84), { ls: 3, align: 'right' });
      txt(ctx, 'DAN', 0, 18, t, A.goto - .3, MN(18), { ls: 4, align: 'center', col: ivo(.6) });
      txt(ctx, 'GOTO', 60, 30, t, A.goto - .1, DSP(84), { ls: 3 });
      markLine(ctx, '', fmt(Math.round(countTo(0, 70, t, A.tujuhpuluh - .1, .7))) + ' MILIAR', ' PARAMETER', 0, 230, t, A.tujuhpuluh - .3, A.tujuhpuluh + .4, DSP(110), { ls: 3 });
      srcTag(ctx, 'Sumber: GoTo, 2 Jun 2025', -800, 440, t, A.tujuhpuluh + .5);
    }, world: stairsWorld(20) },
    { at: A.parameter2, via: 'push', z: Z0 + 5000, py: -1580, name: 'Kenop mixer', draw(ctx, t) {
      markLine(ctx, 'parameter ≈ ', 'kenop kecil', '', 0, -360, t, A.parameter2, A.kenop, SRF(80));
      txt(ctx, 'DI PAPAN MIXER SUARA', 0, -280, t, A.mixer, MN(24), { ls: 6, align: 'center', col: ivo(.8) });
      const km = kq(t, A.parameter2 + .1, .6); if (km > 0) { ctx.save(); ctx.globalAlpha *= km; ctx.translate(0, 50 + (1 - km) * 90); ctx.rotate((1 - km) * -3 * D2R); mixer(ctx, t, A); ctx.restore(); }
      slab(ctx, 'DISETEL SELAMA AI BELAJAR', 0, 365, t, A.belajar - .3, { size: 24, align: 'center' });
    }, layers: [{ dz: 700, dx: 1180, dy: -360, fn: (ctx, t) => wplate(ctx, VD.srv, t, 0, 0, 680, 383, kq(t, A.mixer, .6), { marks: false }) }], world: stairsWorld(21) },
    { at: A.dan, via: 'rise', z: Z0 + 8000, py: -2100, name: 'Lima bahasa',
      cam(t) { const u = E.inOutSine(inv(this.at - .3, DUR, t)); return { yaw: lerp(-6, 4, u), dist: 1500, tx: 0, ty: lerp(-1900, -2560, u), tz: lerp(Z0 + 8100, Z0 + 10300, u), pitch: lerp(10, 4, u) }; },
      layers: [
        { dz: 300, dy: -250, fn: (ctx, t) => txt(ctx, 'SAHABAT-AI PAHAM BAHASA', 0, 0, t, A.paham - .2, MN(34), { ls: 10, align: 'center', col: ivo(.8), a: gone(t, A.jawa + .4, .5) }) },
        { dz: 2250, dy: -640, fn: (ctx, t) => fall(ctx, 'KITA DI ANAK TANGGA MANA?', 0, 0, t, A.batak + .4, DSP(200), { align: 'center', ls: 6 }) }],
      world: stairsWorld(22) },
  ];
  let FULLS;
  return makeChapter({ B, ST, load, gate: true, label: 'BAB 5 · ARTINYA BUAT KITA', full: () => FULLS ??= [
    { im: IM.nez, t0: A.juli - .15, t1: A.bilang + .7, dir: 1, crop: NEZ, tab: 'KOMDIGI.GO.ID · 10 JUL 2025',
      hl: [[.024, .381, .179, .08, A.juli + .5], [.30, .574, .184, .085, A.nezar]] },
  ] });
}
