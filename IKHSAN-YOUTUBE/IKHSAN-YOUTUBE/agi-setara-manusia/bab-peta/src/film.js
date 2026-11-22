// Bab PETA · "Tiga Anak Tangga" (VO agi_vo_ahmad_03 v2, 60.3 s; revisi 17 Nov: 4 bab + PUNCAK, judul PETA pejal, klip penuh layar) · warna: subuh dingin (biru-batu, kabut cakrawala makin terang).
// Satu dunia: TANGGA AI tiga anak tangga raksasa (muka berukir 1 AI SEMPIT · 2 AGI · 3 KECERDASAN SUPER), kamera naik satu pijakan
// per anak tangga; lalu whip ke TANGGA FILM (lima anak tangga berukir BAB 1–4 + PUNCAK, pegangan = penggaris) yang dinaiki kata per kata.
// Station (kata VO → ide):
//  S0  "tiga anak tangga AI"      judul PETA besar (layar) → terbang jadi tag sudut; tapak putus di lantai, tiga anak tangga tumbuh dari lantai di kata tiga/anak/tangga (pegas), markLine TANGGA
//  S1  "AI sempit … satu hal"     pijakan 1: AI SEMPIT jatuh; profil 8 kolom penggaris: cuma CATUR yang penuh (ILUSTRASI)
//  S2  "spam … catur"             amplop jatuh lewat saringan bergerigi, yang spam dicoret & dibuang · klip catur PENUH LAYAR + LAWAN MAIN CATUR
//  S3  "AGI, singkatan dari …"    pijakan 2: A·G·I pecah jadi tumpukan kata, GENERAL membesar, glos Indonesia di kanan
//  S4  "artinya umum, serba bisa" markLine UMUM · profil naik rata ke garis MANUSIA (ILUSTRASI)
//  S5  "karyawan baru … apa saja" klip tangan mengetik PENUH LAYAR + KARYAWAN BARU + slot pekerjaan berputar, markLine APA SAJA
//  S6  "pindah … dari nol"        lencana KARYAWAN BARU melompat di rel bagian; "disekolahkan ulang dari nol" dicoret
//  S7  "kecerdasan super"         pijakan 3: KECERDASAN SUPER + halaman Statement on Superintelligence (kamera berputar 10° ke halaman)
//  S8  "melewati manusia"         profil melewati garis MANUSIA, markLine MELEWATI
//  S9  "ChatGPT, Gemini, Meta AI" nama jatuh satu per satu di atas klip kota Jakarta PENUH LAYAR (klip CPU dibuang)
//  S10 "di anak tangga mana ya?"  kamera mundur tinggi: tiga anak tangga utuh, tanda tanya melompat-lompat, markLine TANGGA
//  S11 "empat bagian …"            whip ke tangga film: rel penggaris + aturan "HANYA ANGKA YANG DIUKUR" (diukur: penguji netral),
//                                  kamera naik satu anak tangga per kata, ukiran menyala + bibir lime; CNBC Astra di pijakan BAB 4; PUNCAK + judul PETA kembali besar sebagai penutup.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  evid, fall, markLine, srcTag, slab, txt, typeOn, plate, theme, D2R, gone } from './kit.js';
import { diukur } from './agi.js';
import { bigStairs, sky, profil, envelope, rail, hop } from './tangga.js';

theme(false, { bg: '#0F151A', bgrgb: '15,21,26', vig: .5 });
const GRADE = 'saturate(.36) contrast(1.15) brightness(.86)';

// ── tangga AI (y ke bawah, lantai 0): tiga anak tangga raksasa, rise 560
const engrave = (n, name) => (ctx, L) => {
  ctx.textAlign = 'left';
  setFont(ctx, DSP(470), 0); const wn = ctx.measureText(n).width; setFont(ctx, DSP(230), 2); const wl = ctx.measureText(name).width;
  const x0 = -(wn + 60 + wl) / 2;
  for (const [dy, col] of [[4, 'rgba(0,0,0,.45)'], [0, ivo(.22 + .5 * L)]]) {
    ctx.fillStyle = col; setFont(ctx, DSP(470), 0); ctx.fillText(n, x0, 170 + dy);
    setFont(ctx, DSP(230), 2); ctx.fillText(name, x0 + wn + 60, 140 + dy);
  }
  setFont(ctx, MN(26), 6); ctx.fillStyle = ivo(.2 + .35 * L); ctx.fillText('ANAK TANGGA ' + n, x0 + wn + 64, -70);
};
const AIS = [
  { z: 1600, z1: 5000, y0: 0, y1: -560, x0: -5600, x1: 6800, lx: 300, label: engrave('1', 'AI SEMPIT') },
  { z: 5000, z1: 8400, y0: -560, y1: -1120, x0: -5600, x1: 6800, lx: 300, label: engrave('2', 'AGI') },
  { z: 8400, z1: 14000, y0: -1120, y1: -1680, x0: -5600, x1: 6800, lx: 300, label: engrave('3', 'KECERDASAN SUPER') },
];
// ── tangga film: enam anak tangga di x −14000, rise 320, run 1200; pegangan kiri = penggaris
const FX = -14000, FZ = 9000, FR = 320, FRUN = 1200;
const PARTS = [['BAB 1', 'APA ARTINYA'], ['BAB 2', 'SEJARAH JANJINYA'], ['BAB 3', 'KELEMAHANNYA'], ['BAB 4', 'POSISINYA · NOV 2026'], ['', 'PUNCAK']];
const engraveF = (no, name) => (ctx, L) => {
  ctx.textAlign = 'left'; setFont(ctx, DSP(210), 2); const x0 = -(ctx.measureText(name).width + (no ? 260 : 0)) / 2;
  for (const [dy, col] of [[3, 'rgba(0,0,0,.5)'], [0, ivo(.16 + .78 * L)]]) {
    ctx.fillStyle = col; setFont(ctx, DSP(210), 2); ctx.fillText(name, x0 + (no ? 260 : 0), 88 + dy);
    if (no) { setFont(ctx, DSP(120), 2); ctx.fillText(no.replace('BAB ', ''), x0, 70 + dy); setFont(ctx, MN(24), 6); ctx.fillText('BAB', x0, -58 + dy); }
  }
};
const FS = PARTS.map(([no, name], k) => ({ z: FZ + k * FRUN, z1: FZ + (k + 1) * FRUN + (k === 4 ? 2400 : 0), y0: -FR * k, y1: -FR * (k + 1),
  x0: FX - 1900, x1: FX + 1900, lx: FX, label: engraveF(no, name) }));

// kamera: titik dunia pada jarak d di depan pose (untuk bidang teks yang menghadap kamera)
function look(p, d, dy = 0, dx = 0) {
  const yw = p.yaw * D2R, pt = p.pitch * D2R, F = [Math.sin(yw) * Math.cos(pt), Math.sin(pt), Math.cos(yw) * Math.cos(pt)];
  const C = [p.tx - p.dist * F[0], p.ty - p.dist * F[1], p.tz - p.dist * F[2]];
  return { x: C[0] + d * F[0] + dx * Math.cos(yw), py: C[1] + d * F[1] + dy, z: C[2] + d * F[2] - dx * Math.sin(yw), ry: -p.yaw };
}
const lp = (a, b, k) => { const o = {}; for (const key in a) o[key] = lerp(a[key], b[key], k); return o; };

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {};
  async function load() {
    IM.si = await loadImg('../assets/shared/kutipan/superintelligence-statement-statement-on-superintelligence.png', 2200);
    IM.cn = await loadImg('../assets/shared/kutipan/cnbcindonesia-model-ai-super-canggih-astra-resmi.png', 1524);
    V.chess = await loadVid('../assets/shared/vid/', 'chess_board');
    V.typ = await loadVid('../assets/shared/vid/', 'hands_typing2');
    V.city = await loadVid('../assets/shared/vid/', 'jakarta_indonesia');
  }
  const gate = (t, t0) => E.outQuint(inv(t0, t0 + .5, t));

  // pose S0 (lebar, dari kanan-depan tinggi) dan S10 (mundur tinggi, dari kanan)
  const P0 = t => { const u = inv(0, A.anak1, t); return { yaw: lerp(22, 14, E.inOutSine(u)), pitch: 12, dist: lerp(7800, 6500, E.outCubic(u)), tx: 700, ty: lerp(-600, -820, u), tz: 4800, roll: 0, foc: 3400 }; };
  const P10 = t => { const u = inv(A.kira, A.kita, t); return { yaw: lerp(-18, -24, E.inOutSine(u)), pitch: lerp(9, 7, u), dist: lerp(8400, 7700, E.outCubic(u)), tx: 300, ty: -900, tz: 5000, roll: 0, foc: 7000 }; };
  const L0 = look(P0(1.5), 3400, -380), L10 = look(P10(A.kira + 1), 5600, 760, 200);

  // pose tangga film: mulai lebar dari bawah, lalu naik satu anak tangga per kata
  const WK = [A.definisi, A.sejarah, A.lemah, A.posisi, A.puncak];
  const KF = [{ yaw: -9, pitch: 1, dist: 6400, tx: FX + 300, ty: -980, tz: 11800, foc: 2900 }];
  for (let k = 0; k < 5; k++) KF.push({ yaw: -6 + (k % 2 ? 4 : -2), pitch: 7, dist: 2500, tx: FX + (k % 2 ? 120 : -120), ty: -FR * k - 230, tz: FZ + FRUN * k, foc: 2500 });
  KF[5] = { ...KF[5], dist: 3000, ty: -FR * 4 - 330, pitch: 9, foc: 3000 };
  const P11 = t => { let p = KF[0]; for (let k = 0; k < 5; k++) p = lp(p, KF[k + 1], E.snap(inv(WK[k] - .32, WK[k] + .38, t)));
    p = { ...p }; p.yaw += 1.2 * Math.sin(t * .9); p.dist -= 160 * inv(A.puncak, DUR, t); p.roll = 0; return p; };
  const L11 = look(KF[0], 2900, 330, -150);

  const ST = [
    { at: 0, cam: P0, x: L0.x, py: L0.py, z: L0.z, ry: L0.ry, draw(ctx, t) {                        // S0
      markLine(ctx, 'tiga anak ', 'TANGGA', ' AI', 0, 0, t, A.tiga - .15, A.tangga + .1, SRF(230));
    } },
    { at: A.anak1, via: 'rise', x: 0, z: 3000, py: -1100, yaw: [-3, 2], dist: [1500, 1400], draw(ctx, t) {   // S1
      typeOn(ctx, 'ANAK TANGGA 1', -840, -330, t, A.anak1 - .1, MN(24), { ls: 6, col: ivo(.6) });
      bigN(ctx, '1', 330, t, A.anak1 - .05, A.jago - .35);
      fall(ctx, 'AI SEMPIT', -840, -130, t, A.aisempit - .05, DSP(200), { ls: 2 });
      txt(ctx, 'yang cuma jago satu hal.', -840, -40, t, A.jago - .25, SRF(56), { col: ivo(.9) });
      pf(ctx, t, 60, 330, 700, 520, 'nol', 'sempit', A.jago - .1, { hl: t > A.satu ? 0 : -1, thum: A.satu + .1 });
    } },
    { at: A.misalnya, via: 'truck', x: 2700, z: 3300, py: -1100, yaw: [2, -2], dist: [1480, 1400], draw(ctx, t) {   // S2
      const ka = 1 - E.inCubic(inv(A.komputer - .4, A.komputer - .05, t));                     // saringan spam keluar, catur penuh layar masuk
      if (ka > 0) { ctx.save(); ctx.globalAlpha *= ka; typeOn(ctx, 'CONTOH AI SEMPIT', -840, -380, t, A.misalnya, MN(24), { ls: 6, col: ivo(.6) }); spamFilter(ctx, t); ctx.restore(); }
      typeOn(ctx, 'KOMPUTER · AI SEMPIT', -840, -150, t, A.komputer - .05, MN(26), { ls: 6, col: ivo(.88) });
      fall(ctx, 'LAWAN MAIN CATUR', -840, 50, t, A.komputer + .15, DSP(180), { ls: 2 });
    } },
    { at: A.anak2, via: 'rise', x: 1500, z: 6400, py: -1660, yaw: [3, -1.5], dist: [1500, 1420], draw: (ctx, t) => acronym(ctx, t) },   // S3
    { at: A.kata, via: 'truck', x: -900, z: 7000, py: -1660, yaw: [-2.5, 2], dist: [1480, 1400], draw(ctx, t) {   // S4
      txt(ctx, 'KATA KUNCINYA: GENERAL', -680, -380, t, A.kata, MN(24), { ls: 5, col: ivo(.62) });
      markLine(ctx, 'AGI = kecerdasan buatan ', 'UMUM', '', 0, -250, t, A.kata - .05, A.umum, SRF(100));
      pf(ctx, t, -560, 340, 900, 380, 'nol', 'agi', A.serba - .15, { thum: A.artinya });
      fall(ctx, 'SERBA BISA', 500, -10, t, A.serba, DSP(92), { ls: 2 });
    } },
    { at: A.bayangkan, via: 'whip', x: 1700, z: 7600, py: -1660, yaw: [2.5, -2], dist: [1500, 1410], draw(ctx, t) {   // S5
      typeOn(ctx, 'BAYANGKAN', -840, -330, t, A.bayangkan, MN(26), { ls: 8, col: ivo(.75) });
      fall(ctx, 'KARYAWAN BARU', -840, -150, t, A.karyawan - .05, DSP(170), { ls: 2 });
      txt(ctx, 'hari pertama kerja', -840, -70, t, A.karyawan + .35, SRF(54), { col: ivo(.9) });
      jobs(ctx, t);
      markLine(ctx, 'belajar pekerjaan ', 'APA SAJA', '', 0, 400, t, A.belajar - .15, A.apa, SRF(76));
    } },
    { at: A.pindah, via: 'truck', x: -1800, z: 7400, py: -1660, yaw: [-2, 2.5], dist: [1480, 1400], draw: (ctx, t) => depts(ctx, t) },   // S6
    { at: A.anak3, via: 'rise', x: 0, z: 10200, py: -2220, yaw: [-3, -1], dist: [1520, 1440], draw(ctx, t) {   // S7
      const ga = 1 - E.inCubic(inv(A.superint + .45, A.superint + .85, t)); if (ga <= 0) return; ctx.globalAlpha *= ga;
      typeOn(ctx, 'ANAK TANGGA 3', -860, -380, t, A.anak3 - .1, MN(24), { ls: 6, col: ivo(.6) });
      fall(ctx, 'KECERDASAN', -860, -170, t, A.kecerdasan - .05, DSP(150), { ls: 2 });
      fall(ctx, 'SUPER', -860, 70, t, A.super - .12, DSP(250), { ls: 3 });
      typeOn(ctx, 'SUPERINTELLIGENCE', -856, 140, t, A.superint - .3, MN(30), { cps: 40, ls: 8, col: ivo(.85) });
    }, layers: [{ dx: 470, dz: -180, ry: -12, fn(ctx, t) {
      evid(ctx, IM.si, 0, -40, 880, t, A.anak3 + .45, { crop: [.17, .205, .67, .5], dark: true, tab: 'superintelligence-statement.org', hl: [[.34, .07, .33, .17, A.superint]] });
      srcTag(ctx, 'Sumber: Statement on Superintelligence, diakses 15 Nov 2026', -440, 250, t, A.anak3 + .9);
    } }], mod(c, t) { const k = E.inOutCubic(inv(A.superint + .1, A.mampu - .1, t)); c.yaw += 9 * k; c.tx += 320 * k; c.dist -= 220 * k; c.foc = c.dist - 200 * k; } },
    { at: A.mampu, via: 'truck', x: 2600, z: 10500, py: -2220, yaw: [2, -2], dist: [1480, 1400], draw(ctx, t) {   // S8
      markLine(ctx, 'kemampuannya ', 'MELEWATI', ' manusia', 0, -300, t, A.mampu - .1, A.melampaui + .3, SRF(92));
      txt(ctx, 'DI HAMPIR SEMUA BIDANG', -560, -150, t, A.semua - .1, MN(24), { ls: 5, col: ivo(.8) });
      pf(ctx, t, -560, 340, 900, 400, 'agi', 'super', A.melampaui + .1, { thum: A.mampu + .1, stag: .04 });
    } },
    { at: A.nah, via: 'whip', x: -400, z: 11400, py: -2220, yaw: [-2, 2], dist: [1500, 1400], draw(ctx, t) {   // S9
      typeOn(ctx, 'AI YANG SUDAH KITA KENAL', -860, -330, t, A.nah - .05, MN(26), { ls: 6, col: ivo(.8) });
      fall(ctx, 'ChatGPT', -860, -170, t, A.chatgpt - .05, DSP(150), { ls: 2 });
      fall(ctx, 'Gemini', -860, 0, t, A.gemini - .05, DSP(150), { ls: 2 });
      fall(ctx, 'Meta AI', -860, 170, t, A.meta - .05, DSP(150), { ls: 2 });
      txt(ctx, 'yang sering kita pakai di HP', -860, 300, t, A.hp - .45, SRF(60), { col: IVORY });
    } },
    { at: A.kira, via: 'rise', dur: 1.0, cam: P10, x: L10.x, py: L10.py, z: L10.z, ry: L10.ry, draw(ctx, t) {   // S10
      typeOn(ctx, '', 0, 0, t, A.kira, MN(20), {});
    } },
    { at: A.kita, via: 'whip', dur: .9, cam: P11, x: L11.x, py: L11.py, z: L11.z, ry: L11.ry, draw(ctx, t) {   // S11
      const a = gone(t, A.definisi + .1, .5); if (a <= 0) return; ctx.globalAlpha *= a;
      ctx.save(); ctx.scale(1.93, 1.93);
      txt(ctx, 'EMPAT BAGIAN · SATU ATURAN', -600, -300, t, A.lima - .1, MN(28), { ls: 8, col: ivo(.8) });
      fall(ctx, 'HANYA ANGKA YANG DIUKUR', -600, -170, t, A.naiki, DSP(130), { ls: 3 });
      ctx.save(); ctx.translate(-600, -150); ctx.scale(1.7, 1.7); diukur(ctx, 0, 0, 450, t, A.naiki + .6, 'penguji netral, bukan klaim vendor'); ctx.restore();
      ctx.restore();
    } },
  ];
  const S11 = ST.length - 1, S10 = S11 - 1;

  // ── klip dokumenter penuh layar (bukan kotak): cover-crop, grade dingin, vignet + grain, dorong pelan + geser paralaks, scrim di sisi teks
  const BLEEDS = [
    { st: 2, v: 'chess', t0: A.komputer - .3, t1: A.anak2 - .1, dim: .34, side: -1 },
    { st: 5, v: 'typ', t0: A.bayangkan - .15, t1: A.pindah - .1, dim: .42, side: -1 },
    { st: 9, v: 'city', t0: A.nah - .15, t1: A.kira - .05, dim: .4, side: -1 },
  ];
  const bleedA = (b, t) => E.outCubic(inv(b.t0, b.t0 + .4, t)) * (1 - E.inCubic(inv(b.t1 - .35, b.t1, t)));
  function bleed(ctx, b, t, a) {
    const u = inv(b.t0, b.t1 + .4, t), s = 1 + .06 * E.inOutSine(u);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalAlpha = a;
    plate(ctx, V[b.v], t, 960, 540, 1920 * s + 8, 1080 * s + 8, 1, { t0: b.t0, grade: GRADE, grain: .26, vig: .85, dim: b.dim, marks: false, ox: -36 * b.side * (u - .5), oy: 10 * (u - .5) });
    const g = ctx.createLinearGradient(b.side < 0 ? 0 : W, 0, b.side < 0 ? W * .62 : W * .38, 0);
    g.addColorStop(0, 'rgba(11,12,9,.74)'); g.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const g2 = ctx.createLinearGradient(0, H, 0, H * .55); g2.addColorStop(0, 'rgba(11,12,9,.55)'); g2.addColorStop(1, 'rgba(11,12,9,0)'); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }

  // ── dunia: langit subuh, tangga AI, tangga film + rel penggaris, tapak, tanda tanya
  function world(ctx, t, pr, foc, items, c) {
    items.push({ d: 1e9, f: () => sky(ctx, pr, c, inv(0, DUR, t)) });
    const inFilm = c.i === S11 && c.k >= 1, ov = c.i === 0 || c.i === S10 ? 1 : 0;
    let bmax = 0;
    for (const b of BLEEDS) { const a = bleedA(b, t); if (a <= 0) continue; bmax = Math.max(bmax, a);
      const S = ST[b.st], d = Math.max(900, pr(S.x, -500, S.z).z + 120); items.push({ d, f: () => bleed(ctx, b, t, a) }); }
    if (!inFilm && bmax < .5) {
      const GT = [A.tiga, A.anak, A.tangga];
      bigStairs(ctx, t, pr, foc, items, AIS.map(s => ({ ...s, label: ov > 0 ? (cx, L, tt) => { cx.globalAlpha *= ov; s.label(cx, L, tt); } : null })), {
        grow: (i, tt) => Math.max(0, spring(tt - GT[i] + .06, .5, .42)),
        lit: () => ov > .5 ? 1 : .55,
        lime: (i, tt) => ({ 1: 0, 3: 1, 7: 2 })[c.i] === i ? E.outCubic(inv(ST[c.i].at - .1, ST[c.i].at + .5, tt)) : 0, sharp: ov > 0 ? .85 : 0 });
      if (c.i === 0) items.push({ d: 2e8, f: () => footprints(ctx, pr, t) });
      if (c.i === S10) items.push({ d: 10, f: () => {
        const pts = [[0, -560, 3300, A.kira - .1], [0, -1120, 6700, A.kira + .55], [0, -1680, 10600, A.tanggaq - .5], [0, -1120, 6700, A.manaq + .1]]
          .map(([x, y, z, tt]) => { const p = pr(x, y, z); return [p.x, p.y - 30, tt, p.s]; });
        const a = clamp((t - A.kira + .1) / .15); if (a <= 0) return; ctx.globalAlpha = a; hop(ctx, pts, t, 1000 * pts[1][3]); ctx.globalAlpha = 1; } });
      if (c.i === S10) items.push({ d: 4, f: () => { ctx.setTransform(1, 0, 0, 1, 960 + 30 * Math.sin(t * .7), 250 - 24 * inv(A.kira, A.kita, t)); ctx.globalAlpha = 1;
        markLine(ctx, 'kira-kira di anak ', 'TANGGA', ' mana?', 0, -60, t, A.kira + .2, A.tanggaq, SRF(118));
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; } });
    }
    if (c.i >= S10 && (c.i === S11)) {
      bigStairs(ctx, t, pr, foc, items, FS, {
        lit: (k, tt) => E.outCubic(inv(WK[k] - .1, WK[k] + .3, tt)),
        lime: (k, tt) => inv(WK[k], WK[k] + .35, tt) * (k < 4 ? 1 - inv(WK[k + 1] - .1, WK[k + 1] + .2, tt) : 1) });
      items.push({ d: 30, f: () => rail(ctx, pr, [FX - 1750, -40, FZ - 300], [FX - 1750, -FR * 5 - 40, FZ + FRUN * 5 - 300], 72, E.outQuint(inv(A.naiki, A.naiki + 1.1, t))) });
      const cz = FZ + FRUN * 3 + 520, cy = -FR * 4 - 320;                                 // CNBC Astra berdiri di pijakan BAB 4
      items.push({ z: cz, x: FX + 700, f: () => onPlaneCard(ctx, pr, foc, FX + 820, cy, cz, t) });
      items.push({ d: 6, f: () => {                                              // tanda tanya S10 mendarat di PUNCAK: jawabannya di atas
        const t0 = A.puncak + .15; if (t < t0) return; const p = pr(FX + 1350, -FR * 5, FZ + FRUN * 4 + 700);   // kanan PUNCAK, bebas dari judul penutup if (p.z < 120) return;
        const k = spring(t - t0, .45, .4), sz = 900 * p.s; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp((t - t0) / .1);
        hop(ctx, [[p.x, p.y - sz * .12 - 380 * (1 - k), t0]], t, sz); ctx.globalAlpha = 1; } });
    }
  }
  ST.forEach(s => { s.world = (ctx, t, pr, foc, items, c) => { if (ST.indexOf(s) === c.i) world(ctx, t, pr, foc, items, c); }; });

  function onPlaneCard(ctx, pr, foc, x, y, z, t) {
    const k = gate(t, A.posisi + .25) * (1 - E.inCubic(inv(A.puncak - .45, A.puncak - .1, t))); if (k <= 0) return;
    const o = pr(x, y, z); if (o.z < 120) return;
    const ry = -10 * D2R, a = pr(x + 100 * Math.cos(ry), y, z + 100 * Math.sin(ry)), b = pr(x, y + 100, z);
    ctx.setTransform((a.x - o.x) / 100, (a.y - o.y) / 100, (b.x - o.x) / 100, (b.y - o.y) / 100, o.x, o.y);
    const bl = t > A.posisi && t < A.puncak - .2 ? 0 : Math.min(28, Math.abs(o.z - foc) / o.z * 24); ctx.filter = bl > .6 ? `blur(${bl.toFixed(1)}px)` : 'none';
    evid(ctx, IM.cn, 0, 0, 1900, t, A.posisi + .25, { crop: [0, 0, 1, .62], tab: 'cnbcindonesia.com', hl: [[.035, .33, .6, .13, A.november]] });
    srcTag(ctx, 'Sumber: CNBC Indonesia, 4 Sep 2026', -950, 560, t, A.posisi + .6);
    ctx.filter = 'none'; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  }

  function footprints(ctx, pr, t) {                                   // tapak putus anak tangga di lantai sebelum tumbuh
    const a = E.outCubic(inv(.8, 1.5, t)) * (1 - inv(A.tangga, A.tangga + .4, t)); if (a <= 0) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 40; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2;
    for (const s of AIS) { const p = pr(s.x0 + 2000, 0, s.z), q = pr(s.x1 - 1500, 0, s.z); if (p.z < 120 || q.z < 120) continue; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    ctx.setLineDash([]); ctx.globalAlpha = 1;
  }

  // profil muncul hanya saat dipakai (tidak menumpuk angka raksasa)
  function pf(ctx, t, x, y, w, h, a, b, tk, o) { const k = gate(t, tk - .3); if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; profil(ctx, t, x, y, w, h, a, b, tk, o); ctx.restore(); }

  // angka anak tangga raksasa: jatuh dengan pegas, memudar saat judul masuk
  function bigN(ctx, n, x, t, t0, t1) {
    const k = spring(t - t0, .55, .45), a = clamp((t - t0) / .12) * (1 - E.outCubic(inv(t1, t1 + .4, t))); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, 400 - 160 * (1 - k)); setFont(ctx, DSP(900), 0); ctx.textAlign = 'center';
    ctx.fillStyle = ivo(.9); ctx.fillText(n, 0, 0); setFont(ctx, MN(22), 6); ctx.fillStyle = ivo(.7); ctx.fillText('ANAK TANGGA', 0, 50); ctx.restore(); ctx.textAlign = 'left';
  }

  // S2 · saringan spam: amplop jatuh, saringan bergerigi (penggaris), spam dicoret dan dibuang ke kiri
  const ENV = [0, 1, 0, 1, 1, 0, 1];
  function spamFilter(ctx, t) {
    const t0 = A.penyaring - .25, k = gate(t, A.misalnya + .1); if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-820, -20); ctx.lineTo(-170, -20);
    for (let x = -820; x <= -170; x += 26) { ctx.moveTo(x, -20); ctx.lineTo(x, -20 + ((x + 820) / 26 % 5 ? 12 : 24)); } ctx.stroke();
    setFont(ctx, MN(18), 3); ctx.fillStyle = ivo(.6); ctx.fillText('SARINGAN', -820, -44);
    ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-860, 300); ctx.lineTo(-620, 300); ctx.moveTo(-480, 300); ctx.lineTo(-200, 300); ctx.stroke();
    setFont(ctx, MN(18), 3); ctx.fillStyle = ivo(.7); ctx.fillText('SPAM', -790, 336); ctx.fillText('KOTAK MASUK', -440, 336);
    let ns = 0, ng = 0;
    ENV.forEach((spam, i) => {
      const s = t - t0 - i * .3; if (s <= 0) return;
      let x = -500, y = lerp(-440, -80, E.inCubic(s / .32)), r = 0;
      if (s > .32) { const u = (s - .32) / .42, n = spam ? ns++ : ng++;
        if (spam) { x = lerp(-500, -740, E.outQuint(u)); y = lerp(-80, 262 - n * 20, E.outCubic(u)); r = lerp(0, -.5, E.outCubic(u)) + .5 * clamp(u - 1) * 0; }
        else { x = lerp(-500, -340, E.inOutCubic(u)); y = lerp(-80, 262 - n * 20, E.inOutCubic(u)); } }
      envelope(ctx, x, y, 140, r, clamp(s / .08), spam && s > .32);
    });
    ctx.restore();
  }

  // S3 · A·G·I pecah jadi tumpukan kata
  const ROWS = [['A', 'RTIFICIAL', 'BUATAN', 'artificial'], ['G', 'ENERAL', 'UMUM', 'general'], ['I', 'NTELLIGENCE', 'KECERDASAN', 'intel']];
  function acronym(ctx, t) {
    bigN(ctx, '2', 120, t, A.anak2 - .05, A.agi - .25);
    typeOn(ctx, 'ANAK TANGGA 2', -840, -380, t, A.anak2 - .1, MN(24), { ls: 6, col: ivo(.6) });
    txt(ctx, 'SINGKATAN DARI', -720, -300, t, A.singkatan - .1, MN(24), { ls: 6, col: ivo(.6) });
    if (t < A.agi - .05) return;
    const ks = E.snap(inv(A.artificial - .25, A.artificial + .2, t)), kin = spring(t - A.agi + .05, .5, .36);
    setFont(ctx, DSP(380), 4); const wA = ctx.measureText('A').width, wG = ctx.measureText('G').width, wI = ctx.measureText('I').width, gap = 40;
    const hx = [-(wA + wG + wI + 2 * gap) / 2, 0, 0]; hx[1] = hx[0] + wA + gap; hx[2] = hx[1] + wG + gap;
    const kg = spring(t - A.general, .5, .4), dim = E.outCubic(inv(A.general, A.general + .3, t));
    ROWS.forEach(([L, rest, gl, key], i) => {
      const ry = -150 + i * 175, size = lerp(380, 165, ks), x = lerp(hx[i], -720, ks), y = lerp(110 + (1 - kin) * -90, ry, ks);
      const big = i === 1 ? 1 + .38 * kg : 1, a = i === 1 ? 1 : 1 - .55 * dim;
      ctx.save(); ctx.globalAlpha *= clamp(kin * 3) * a; ctx.translate(x, y); ctx.scale(big, big);
      setFont(ctx, DSP(size), 4); ctx.fillStyle = IVORY; ctx.fillText(L, 0, 0); const wl = ctx.measureText(L).width;
      if (ks > .9) { const n = Math.max(0, Math.ceil((t - A[key] + .05) * 30)); ctx.fillText(rest.slice(0, n), wl + 2, 0); }
      ctx.restore();
      const kgl = E.outQuint(inv(A[key] + .25, A[key] + .7, t));
      if (kgl > 0) { ctx.save(); ctx.globalAlpha *= kgl * a; ctx.strokeStyle = ivo(.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(480, ry - 50); ctx.lineTo(480 + 50 * kgl, ry - 50); ctx.stroke();
        setFont(ctx, MN(i === 1 ? 34 : 26), 6); ctx.fillStyle = ivo(i === 1 ? .95 : .7); ctx.fillText(gl, 550, ry - 40); ctx.restore(); }
    });
  }

  // S5 · slot pekerjaan yang berputar
  const JOBS = ['KEUANGAN', 'GUDANG', 'DESAIN', 'HUKUM', 'PEMASARAN', 'LAYANAN', 'PRODUKSI', 'KEUANGAN'];
  function jobs(ctx, t) {
    const k = gate(t, A.belajar - .2); if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k; setFont(ctx, MN(22), 5); ctx.fillStyle = ivo(.6); ctx.fillText('BISA BELAJAR JADI', 330, -280);
    const p = clamp((t - A.pekerjaan + .1) * 9, 0, JOBS.length - 1) * E.outCubic(inv(A.pekerjaan - .1, A.apa + .25, t)) / Math.max(.001, E.outCubic(inv(A.pekerjaan - .1, A.apa + .25, t)) || 1);
    const pos = E.outCubic(inv(A.pekerjaan - .1, A.apa + .3, t)) * (JOBS.length - 1), i0 = Math.floor(pos), fr = pos - i0;
    ctx.beginPath(); ctx.rect(320, -250, 600, 280); ctx.clip();
    for (let j = -1; j <= 2; j++) { const idx = i0 + j; if (idx < 0 || idx >= JOBS.length) continue;
      const y = -120 + (j - fr) * 120, a = 1 - Math.min(1, Math.abs(j - fr) * .75);
      setFont(ctx, DSP(110), 2); ctx.fillStyle = ivo(.25 + .75 * a); ctx.fillText(JOBS[idx], 330, y); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(320, -95); ctx.lineTo(900, -95); ctx.moveTo(320, 30); ctx.lineTo(900, 30); ctx.stroke(); ctx.restore();
    void p;
  }

  // S6 · rel bagian: lencana KARYAWAN BARU melompat antarbagian, lalu "disekolahkan ulang dari nol" dicoret
  const DEP = [['KEUANGAN', -630], ['GUDANG', -210], ['PEMASARAN', 220], ['HUKUM', 640]];
  function depts(ctx, t) {
    typeOn(ctx, 'PINDAH KE BAGIAN MANA SAJA', -820, -380, t, A.pindah - .1, MN(24), { ls: 6, col: ivo(.6) });
    const kr = E.outQuint(inv(A.pindah - .2, A.pindah + .4, t)); if (kr <= 0) return;
    ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-840, 60); ctx.lineTo(-840 + 1680 * kr, 60);
    for (let x = -840; x <= -840 + 1680 * kr; x += 30) { ctx.moveTo(x, 60); ctx.lineTo(x, 60 + ((x + 840) / 30 % 5 ? 12 : 26)); } ctx.stroke();
    const HT = [A.pindah - .15, A.pindah + .3, A.bagian, A.mana + .05];
    let i = 0; while (i < 3 && t >= HT[i + 1]) i++;
    const u = i ? E.inOutCubic(inv(HT[i], HT[i] + .3, t)) : 1, bx = lerp(DEP[Math.max(0, i - 1)][1], DEP[i][1], u), by = 140 - Math.sin(Math.PI * u) * 90 * (i ? 1 : 0);
    DEP.forEach(([n, x], j) => { const on = j < i || (j === i && u > .8) ? 1 : 0, ka = E.outQuint(inv(A.pindah - .1 + j * .06, A.pindah + .3 + j * .06, t));
      setFont(ctx, DSP(84), 2); ctx.textAlign = 'center'; ctx.fillStyle = ivo((.35 + .65 * on) * ka); ctx.fillText(n, x, 20 - (1 - ka) * 30); ctx.textAlign = 'left';
      ctx.fillStyle = ivo(.8 * ka); ctx.fillRect(x - 3, 52, 6, 22); });
    const kb = gate(t, A.pindah - .15);
    if (kb > 0) { ctx.save(); ctx.globalAlpha *= kb; ctx.translate(bx, by); setFont(ctx, MN(20), 3); const tw = ctx.measureText('KARYAWAN BARU').width + 36;
      ctx.fillStyle = IVORY; ctx.fillRect(-tw / 2, -22, tw, 44); ctx.fillStyle = '#11120E'; ctx.textAlign = 'center'; ctx.fillText('KARYAWAN BARU', 0, 7); ctx.textAlign = 'left';
      ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(0, -64); ctx.stroke(); ctx.restore(); }
    if (t > A.tanpa - .1) {
      fall(ctx, 'disekolahkan ulang dari nol', 0, -230, t, A.tanpa - .05, SRF(96), { align: 'center', stag: .018 });
      setFont(ctx, SRF(96)); const w = ctx.measureText('disekolahkan ulang dari nol').width, ks = E.brake(inv(A.nol, A.nol + .4, t));
      if (ks > 0) { ctx.save(); ctx.translate(-w / 2 - 20, -262); ctx.rotate(-.035); ctx.fillStyle = IVORY; ctx.fillRect(0, -7, (w + 40) * ks, 14); ctx.restore(); }
      txt(ctx, 'TIDAK PERLU', -w / 2, -150, t, A.nol + .2, MN(26), { ls: 8, col: ivo(.85) });
    }
  }

  // ── judul PETA (layar): besar & pejal di awal, terbang mengecil jadi tag sudut yang tetap terbaca, lalu kembali besar sebagai penutup
  const TF = A.tiga - .45, TB = A.puncak + .45, TE = DUR - .95;
  function word(o, str, x, y, css, ls, t0, t) {                       // huruf naik satu-satu dengan pegas (rata kiri di x)
    setFont(o, css, ls); let cx = x;
    for (let i = 0; i < str.length; i++) { const ch = str[i], w = o.measureText(ch).width, u = t - t0 - i * .06;
      if (u > 0) { o.globalAlpha = Math.min(1, u / .1) * (o.__a ?? 1); o.fillText(ch, cx, y + 110 * (1 - spring(u, .55, .42))); } cx += w; }
  }
  function sub(o, parts, x, y, size, a) {                               // baris mono; bagian bertanda ! berwarna lime (TANGGA)
    setFont(o, MN(size), size * .38); o.globalAlpha = a; let cx = x;
    for (const pt of parts) { const lime = pt[0] === '!', s2 = lime ? pt.slice(1) : pt; o.fillStyle = lime ? LIME : IVORY; o.fillText(s2, cx, y); cx += o.measureText(s2).width; }
  }
  const subW = (o, parts, size) => { setFont(o, MN(size), size * .38); return parts.reduce((w, pt) => w + o.measureText(pt[0] === '!' ? pt.slice(1) : pt).width, 0); };
  function over(o, t) {
    const kOut = E.inOutCubic(inv(TF, TF + .55, t)), kBack = E.inOutCubic(inv(TB, TB + .6, t)), k = kOut * (1 - kBack);
    const fade = 1 - inv(TE + .05, TE + .45, t); if (t < .7 || fade <= 0) return;
    const end = t > TB, size = end ? 300 : 380, cy = end ? 330 : 500, CS = 66, sc = lerp(1 + (end ? .03 * inv(TB, TE, t) : .03 * inv(.7, TF, t)), CS / size, k);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.filter = 'none';
    const R = (x, y, r, a) => { const g = o.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(11,12,9,${a})`); g.addColorStop(1, 'rgba(11,12,9,0)'); o.globalAlpha = 1; o.fillStyle = g; o.fillRect(x - r, y - r, 2 * r, 2 * r); };
    if (k < 1) R(960, cy - 60, 760, .62 * (1 - k) * fade);
    if (k > 0) R(150, 82, 340, .5 * k * fade);
    setFont(o, DSP(size), size * .05); const wB = o.measureText('PETA').width;
    const x = lerp(960 - wB * sc / 2, 64, k), y = lerp(cy, 106, k);
    o.translate(x, y); o.scale(sc, sc); o.fillStyle = IVORY; o.textAlign = 'left'; o.shadowColor = 'rgba(0,0,0,.45)'; o.shadowBlur = 24 / sc; o.__a = fade;
    word(o, 'PETA', 0, 0, DSP(size), size * .05, end ? -9 : .72, t); o.__a = undefined;
    o.setTransform(1, 0, 0, 1, 0, 0); o.shadowBlur = 12;
    const P0 = ['SEBELUM MENJAWAB'], P1 = ['NAIK SATU ANAK ', '!TANGGA', ' PER BAGIAN'], PC = ['TIGA ANAK ', '!TANGGA', ' AI'];
    const sa = (1 - k) * fade * (end ? E.outCubic(inv(TB + .35, TB + .8, t)) : E.outCubic(inv(1.0, 1.4, t)));
    if (sa > 0) { const pp = end ? P1 : P0, sz = 30; sub(o, pp, 960 - subW(o, pp, sz) / 2, cy + 76, sz, sa); }
    const ca = k * fade; if (ca > .02) sub(o, PC, 64 + wB * CS / size + 22, 104, 17, ca * .95);
    o.restore();
  }
  return makeChapter({ B, ST, load, over, gate: true, label: '' });
}
