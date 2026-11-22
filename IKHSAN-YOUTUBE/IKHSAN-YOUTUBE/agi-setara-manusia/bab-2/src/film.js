// Bab 2 · "70 tahun 'sebentar lagi'" · VO 05 (127,4 s) · arsip dokumenter baja-dingin, grain tajam, lime satu aksen. NO sepia/burn.
// Ide bab: 70 tahun orang bilang "sebentar lagi" sambil berdiri di anak tangga yang berbeda. 1 anak tangga = 1 tahun; pijakan era
// (1950 · 1955 · 1956 · 2017 · 2019 · 2024 · 2025 · 2026) jadi panggung station, kamera naik dari lantai ke 2026 (bibir lime).
// Tiap prediksi = gelembung suara berdiri di anak tangganya (Turing 1950 · Dartmouth 1955 · Altman 2025 · Amodei 2024→2026).
// 1957–2016 = tangga curam 60 anak tangga (run 140) yang menyala bersama papan split-flap 1956→2026, lalu kamera menaikinya.
// Jam berdetak (sudut kanan atas) sejak awal; berhenti mendadak di "Eh". Foto arsip dipanggang grade baja di load (tangga.js baja()).
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  evid, fall, markLine, srcTag, slab, txt, typeOn, countTo, gone, plate, onPlane, spring } from './kit.js';
import { stairs } from './agi.js';
import { diukur } from './agi.js';
import { strike } from './pustaka/dasar.js';
import { jam, orang, robot } from './pustaka/prop.js';
import { gelembungChat } from './pustaka/ui.js';
import { tanggaBaja, layarFoto, kreditLatar, bgK, bangun, yAt, stepOf, latar, labelTahun, baja, arsip, suara, tahunFlap, tirai, lingkar, garisTahun } from './tangga.js';

const { S: STEPS, L: LAND } = bangun([
  ['run', 3, 380, null], ['run', 1, 380, 1950], ['land', 1950, 5],
  ['run', 5, 380, 1951], ['land', 1955, 5],
  ['run', 1, 380, 1956], ['land', 1956, 2],
  ['run', 60, 140, 1957],
  ['run', 1, 380, 2017], ['land', 2017, 2],
  ['run', 2, 380, 2018], ['land', 2019, 2],
  ['run', 5, 380, 2020], ['land', 2024, 1],
  ['run', 1, 380, 2025], ['land', 2025, 4],
  ['run', 1, 380, 2026], ['land', 2026, 3],
  ['run', 8, 380, null],
]);
const ERA = [1950, 1955, 1956, 2017, 2019, 2024, 2025, 2026];
const I2026 = STEPS.findIndex(s => s.yr === 2026);
const at = (yr, k, o = {}) => ({ x: 0, z: LAND[yr].st(k), py: LAND[yr].py, ...o });

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {};
  async function load() {
    const S = '../assets/shared/';
    const [tu, en, dl, dp, ib, sh, tw, vc] = await Promise.all(['cc/commons-alan-turing-header.jpg', 'cc/commons-classic-shot-of-the-eniac.jpg',
      'cc/commons-dartmouth-hall.jpg', 'cc/commons-dartmouth-hall-dartmouth-college.jpg', 'cc/commons-ibm-electronic-data-processing-machine.jpg',
      'cc/commons-shakey-the-robot-developed-between-1966.jpg', 'stok-situs/pexels-a-nostalgic-look-at-a-row-of-29342449.jpg',
      'stok-situs/pexels-a-nostalgic-look-at-a-vintage-17269117.jpg'].map(f => loadImg(S + f, 2000)));
    IM.turing = baja(tu); IM.eniac = baja(en, { con: 1.1 }); IM.dLit = baja(dl); IM.dFoto = baja(dp); IM.ibm = baja(ib); IM.shakey = baja(sh);
    IM.mtik = baja(tw, { con: 1.2, bri: .92 }); IM.komp = baja(vc, { con: 1.2, bri: .92 });
    [IM.pTuring, IM.pJmc, IM.pArc, IM.pAltman] = await Promise.all(['courses-tanpa-judul.png', 'jmc-tanpa-judul.png', 'arcprize-arc-agi-1.png', 'blog-sam-altman.png']
      .map(f => loadImg(S + 'kutipan/' + f, 2800)));
    IM.neural = await loadVid(S + 'vid/', 'vibrant_visualizatio');
  }

  // nyala anak tangga: lantai → 1950 menyala sejak awal; 1951–55 di "Agustus 1955"; 1956 di "1956"; 1957–2026 ikut papan tahun; masa depan redup
  const tahunKe = t => lerp(1956, 2026, E.outCubic(inv(A.tujuh, A.tujuh + 1.6, t)));
  const lit = (i, t) => {
    const yr = STEPS[i].yr; if (yr == null) return i < 3 ? 1 : .2;
    if (yr <= 1950) return 1;
    if (yr <= 1955) return Math.max(.2, E.outCubic(inv(A.agustus - .6 + (yr - 1951) * .07, A.agustus - .2 + (yr - 1951) * .07, t)));
    if (yr === 1956) return Math.max(.2, E.outCubic(inv(A.y1956 - .2, A.y1956 + .2, t)));
    return Math.max(.2, clamp(tahunKe(t) - yr + 1));
  };
  // jam detik: berdetak 1×/detik dengan pegas kecil, berhenti mati di "Eh"
  const STOP = A.eh - .05, sudut = t => { const tt = Math.min(t, STOP), n = Math.floor(tt), f = tt - n; return (n + Math.min(1, spring(f, .45, .16))) * Math.PI / 30; };

  // grid teka-teki ARC (6×6): sel abu, beberapa gading; o.isi 0..1 = sel jawaban terisi (skor tinggi), satu sel lime
  const POLA = [7, 8, 13, 14, 15, 20, 26, 27], JAWAB = [21, 22, 28, 29, 33];
  function gridArc(ctx, x, y, c, t, t0, isi = 0) {
    const k = E.outQuint(inv(t0, t0 + .5, t)); if (k <= 0) return; const a0 = ctx.globalAlpha;
    for (let i = 0; i < 36; i++) { const r = Math.floor(i / 6), q = i % 6, kk = clamp((t - t0 - (r + q) * .03) / .25);
      if (kk <= 0) continue; ctx.globalAlpha = a0 * kk;
      const on = POLA.includes(i), j = JAWAB.indexOf(i), fill = j >= 0 && isi * JAWAB.length > j;
      ctx.fillStyle = fill ? (j === JAWAB.length - 1 ? LIME : IVORY) : on ? 'rgba(241,239,230,.7)' : '#1C2229';
      ctx.fillRect(x + q * (c + 6), y + r * (c + 6) + (1 - kk) * 20, c, c); }
    ctx.globalAlpha = a0;
  }
  // balok pondasi (S11b): batu baja ber-bevel, teks DSP
  function balok(ctx, x, y, w, h, label, t, t0, size) {
    const k = spring(t - t0, .6, .45); if (t <= t0) return; const yy = y - (1 - Math.min(1, k)) * 420, a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * clamp((t - t0) / .1);
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
    const g = ctx.createLinearGradient(0, yy - h / 2, 0, yy + h / 2); g.addColorStop(0, '#3A434D'); g.addColorStop(1, '#1D2329'); ctx.fillStyle = g; ctx.fillRect(x - w / 2, yy - h / 2, w, h); ctx.restore();
    ctx.fillStyle = ivo(.28); ctx.fillRect(x - w / 2, yy - h / 2, w, 3); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(x - w / 2, yy + h / 2 - 4, w, 4);
    setFont(ctx, DSP(size), 3); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(label, x, yy + size * .34); ctx.textAlign = 'left'; ctx.globalAlpha = a0;
  }

  // ── tangga curam (S10): foto arsip + gelembung "sebentar lagi" berdiri di anak tangganya ──────────────────────
  const FS = stepOf(STEPS, 1957), FE = stepOf(STEPS, 2017), T0r = A.robot - .3, T1r = A.lompatan - .25;
  const tLewat = yr => lerp(T0r, T1r, (yr - 1957) / 62);
  const DI_TANGGA = [
    { yr: 1961, x: -640, w: 600, h: 450, im: 'mtik', cap: 'MESIN TIK · KANTOR LAWAS', kr: 'Foto: Tong Quan · Pexels' },
    { yr: 1966, x: 560, bub: true },
    { yr: 1973, x: 650, w: 420, h: 560, im: 'shakey', cap: 'ROBOT SHAKEY', kr: 'Foto: Carlo Nardone via Wikimedia Commons, CC BY-SA 2.0' },
    { yr: 1979, x: -560, bub: true },
    { yr: 1985, x: -660, w: 600, h: 400, im: 'komp', cap: 'KOMPUTER MEJA LAWAS', kr: 'Foto: Ansel Lee · Pexels' },
    { yr: 1994, x: 560, bub: true },
    { yr: 2004, x: -540, bub: true },
    { yr: 2012, x: 520, bub: true },
  ];
  function tanggaCuram(ctx, t, pr, foc, items) {
    for (const o of DI_TANGGA) { if (!o.bub) continue;
      const s = stepOf(STEPS, o.yr), t0 = Math.max(A.robot - .1, tLewat(o.yr) - 2.1), cy = s.y1 - (o.bub ? 230 : (o.h / 2 + 40));
      if (t < t0 || t > A.lompatan + .6) continue;
      items.push({ z: s.z, x: o.x, d: pr(o.x, -500, s.z + 40).z, f: () => onPlane(ctx, pr, o.x, cy, s.z + 40, foc, () => {
        if (o.bub) suara(ctx, 0, 0, ['“sebentar lagi.”'], t, t0, { size: 66, who: 'DITUNDA · ' + o.yr, tail: o.x < 0 ? 1 : -1 });
      }) });
    }
  }

  const ST = [
    // S1 · 0:00 · kartu bab: "70 TAHUN" jatuh, "sebentar lagi" (lime), garis waktu 1950→2026 berskala, jam berdetak
    { at: 0, x: 0, z: 0, py: -560, dist: [1500, 1360], yaw: [-4, 2], pitch: 5, name: 'Bab 2 · kartu', draw(ctx, t) {
      txt(ctx, 'BAB 2', -780, -330, t, .85, MN(24), { ls: 10, col: IVORY });
      fall(ctx, '70 TAHUN', -790, -40, t, .85, DSP(300), { stag: .05 });
      markLine(ctx, '“', 'sebentar', ' lagi.”', -780, 120, t, A.kalau + 2.2, A.sebentar, SRF(112), { align: 'left' });
      jam(ctx, 560, -120, 200, t, .9, { angle: sudut(t), dA: 0, ghost: 0 });
      garisTahun(ctx, -780, 780, 330, 1950, 2026, E.inOutCubic(inv(A.kalau + 1.4, A.kalau + 3.6, t)), [[1950, '1950'], [1955, '1955'], [1956, '·56'], [2026, '2026', 1]]);
      txt(ctx, 'SATU TICK = SATU TAHUN', 780, 420, t, A.kalau + 3.2, MN(16), { ls: 4, col: ivo(.88), align: 'right' });
    } },
    // S2a · 1950 · Turing (grade baja) + kredit; 1950 jatuh
    { at: A.tahun, via: 'rise', ...at(1950, 0, { x: -150 }), dist: [1560, 1440], yaw: [4, -2], name: '1950 · Turing', draw(ctx, t) {
      fall(ctx, '1950', 60, 40, t, A.y1950 - .05, DSP(330), { stag: .06 });
      slab(ctx, 'AHLI MATEMATIKA · INGGRIS', 64, 130, t, A.ahli, { size: 22 });
      txt(ctx, 'Alan Turing', 64, 260, t, A.alan, SRF(88));
    } },
    // S2b · makalah 1950: halaman pertama, kamera berputar ~10°, stabilo "Can machines think?"
    { at: A.menulis, via: 'push', ...at(1950, 1, { x: 150 }), yaw: [11, 8.5], dist: [1560, 1460], name: '1950 · makalah', draw(ctx, t) {
      evid(ctx, IM.pTuring, 0, -70, 1300, t, A.menulis - .05, { crop: [.311, .075, .596, .575], hl: [[.556, .588, .24, .05, A.bisakah]], tab: 'COURSES.CS.UMBC.EDU', rot: -1 });
      fall(ctx, 'Bisakah mesin berpikir?', 0, 372, t, A.bisakah + .1, SRF(64), { align: 'center', stag: .018, drop: -40 });
      srcTag(ctx, 'Sumber: Turing, "Computing Machinery and Intelligence", Mind, 1950', -840, 450, t, A.kajian);
    } },
    // S3a · "berpikir" susah diukur → diganti tebak-tebakan
    { at: A.karena, via: 'truck', ...at(1950, 2, { x: -100 }), name: '1950 · susah diukur', draw(ctx, t) {
      fall(ctx, 'berpikir?', 0, -120, t, A.berpikir2 - .1, SRF(210), { align: 'center', stag: .04 });
      const a0 = ctx.globalAlpha; ctx.globalAlpha *= gone(t, A.mengganti - .1); diukur(ctx, -400, -50, 800, t, A.susah, '???');
      slab(ctx, 'SUSAH DIUKUR', 0, 110, t, A.diukur, { size: 26, align: 'center' }); ctx.globalAlpha = a0;
      strike(ctx, -390, 390, -120, 210, t, A.mengganti, ivo(.85));
      fall(ctx, 'TEBAK-TEBAKAN', 0, 330, t, A.tebak - .1, DSP(200), { align: 'center', stag: .035 });
    } },
    // S3b · dua tirai: penanya bertanya, dua-duanya mengaku manusia → MESIN? / MANUSIA?
    { at: A.penanya, via: 'whip', ...at(1950, 3, { x: 200 }), name: '1950 · tirai', draw(ctx, t) {
      txt(ctx, 'TEBAK-TEBAKAN TURING', -800, -440, t, A.penanya + .1, MN(20), { ls: 5, col: ivo(.88) });
      const op = .25 + .1 * Math.sin(t * 1.3);
      tirai(ctx, -520, -110, 560, 560, t, op, { isi: c => robot(c, -520, 60, 150, { col: 'rgba(170,186,204,.45)', fill: 'rgba(20,24,29,.6)' }) });
      tirai(ctx, 520, -110, 560, 560, t, op, { isi: c => orang(c, 520, 170, 420, { style: 'piktogram', col: 'rgba(170,186,204,.4)' }) });
      orang(ctx, 0, 540, 170, { style: 'garis', col: ivo(.88) });
      txt(ctx, 'PENANYA', 0, 520, t, A.penanya + .3, MN(14), { ls: 4, col: ivo(.88), align: 'center' });
      gelembungChat(ctx, -70, 320, 'Siapa kamu?', t, A.dua, { font: SRF(36) });
      gelembungChat(ctx, 70, 320, 'Kamu siapa?', t, A.tirai, { kiri: true, font: SRF(36) });
      gelembungChat(ctx, -300, -60, 'Manusia.', t, A.bisakah2 + .1, { font: SRF(38), isi: '#2A323B', tinta: IVORY });
      gelembungChat(ctx, 300, -60, 'Manusia juga.', t, A.membedakan, { kiri: true, font: SRF(38), isi: '#2A323B', tinta: IVORY });
      slab(ctx, 'MESIN?', -520, 225, t, A.mesin, { size: 22, align: 'center' });
      slab(ctx, 'MANUSIA?', 520, 225, t, A.manusia, { size: 22, align: 'center' });
    } },
    // S4 · ramalan Turing: ENIAC kecil (resolusi asli, tidak diperbesar) + gelembung "in about fifty years' time"
    { at: A.perkiraan, via: 'truck', ...at(1950, 4, { x: -150 }), name: '1950 · ramalan', draw(ctx, t) {
      suara(ctx, 330, -200, [['“in about ', 'fifty years’', ' time”']], t, A.perkiraan + .35, { size: 64, who: 'MENURUT TURING · 1950', tail: -1, tm: A.lima });
      fall(ctx, String(Math.round(countTo(1950, 2000, t, A.komputer, .9))), 60, 300, t, A.komputer - .1, DSP(170));
      txt(ctx, 'TAHUN TEBAKAN', 64, 350, t, A.komputer + .2, MN(17), { ls: 4, col: ivo(.88) });
      fall(ctx, '5 MENIT', 420, 300, t, A.limamenit - .05, DSP(170));
      txt(ctx, 'OBROLAN UNTUK MENGECOH', 424, 350, t, A.mengecoh, MN(17), { ls: 4, col: ivo(.88) });
      srcTag(ctx, 'Sumber: Turing, "Computing Machinery and Intelligence", Mind, 1950', -840, 450, t, A.sekitar);
    } },
    // S5a · Agustus 1955: tangga 1951–55 menyala sambil kamera naik
    { at: A.agustus, via: 'rise', ...at(1955, 0), dist: [1600, 1450], yaw: [-3, 2], name: '1955 · Agustus', draw(ctx, t) {
      typeOn(ctx, 'SEBUAH PROPOSAL', 0, -300, t, A.agustus + .2, MN(22), { ls: 8, col: ivo(.88), align: 'center', cps: 30 });
      fall(ctx, 'AGUSTUS', 0, -20, t, A.agustus - .05, DSP(250), { align: 'center', stag: .045 });
      fall(ctx, '1955', 0, 240, t, A.y1955 - .05, DSP(250), { align: 'center', stag: .06 });
    } },
    // S5b · Dartmouth Hall: litografi → foto modern (sapuan lime), 4 ilmuwan
    { at: A.empat, via: 'whip', ...at(1955, 1, { x: 250 }), name: '1955 · Dartmouth', draw(ctx, t) {
      fall(ctx, '4', 440, -60, t, A.empat, DSP(320));
      txt(ctx, 'ILMUWAN', 560, -150, t, A.ilmuwan, DSP(110));
      txt(ctx, 'MENGAJUKAN RENCANA', 444, 10, t, A.ilmuwan + .4, MN(19), { ls: 4, col: ivo(.88) });
      txt(ctx, 'PENELITIAN', 444, 42, t, A.ilmuwan + .55, MN(19), { ls: 4, col: ivo(.88) });
      txt(ctx, 'HANOVER, AMERIKA', 444, 120, t, A.amerika, MN(19), { ls: 4, col: ivo(.88) });
    } },
    // S6 · halaman proposal: 4 nama jatuh satu per satu, stabilo di baris namanya
    { at: A.nama, via: 'push', ...at(1955, 2, { x: -200 }), yaw: [-10, -8], name: '1955 · empat nama', draw(ctx, t) {
      const R = [[.367, .806, .302], [.367, .842, .302], [.367, .877, .302], [.332, .912, .337]], TM = [A.john, A.marvin, A.nathaniel, A.claude];
      evid(ctx, IM.pJmc, -280, -70, 1000, t, A.nama - .05, { crop: [.311, .15, .596, .65], tab: 'JMC.STANFORD.EDU', rot: .8,
        hl: R.map(([x, y, w], i) => [x, y - .004, w, .036, TM[i]]) });
      const NM = [['John McCarthy', 'DARTMOUTH COLLEGE'], ['Marvin Minsky', 'HARVARD UNIVERSITY'], ['Nathaniel Rochester', 'I.B.M. CORPORATION'], ['Claude Shannon', 'BELL TELEPHONE LABORATORIES']];
      NM.forEach(([n, a], i) => { fall(ctx, n, 330, -220 + i * 130, t, TM[i] - .08, SRF(58), { stag: .02, drop: -50 });
        txt(ctx, a, 332, -186 + i * 130, t, TM[i] + .25, MN(15), { ls: 3, col: ivo(.88) }); });
      srcTag(ctx, 'Sumber: Proposal Dartmouth, 31 Agustus 1955', -840, 450, t, A.nama + .4);
    } },
    // S7 · "penuh percaya diri"
    { at: A.rencana, via: 'truck', ...at(1955, 3, { x: 100 }), name: '1955 · percaya diri', draw(ctx, t) {
      txt(ctx, 'RENCANANYA', 0, -170, t, A.rencana, MN(24), { ls: 10, col: ivo(.88), align: 'center' });
      markLine(ctx, 'penuh ', 'percaya diri', '.', 0, 20, t, A.rencana + .2, A.percaya, SRF(130));
    } },
    // S7b · gelembung kutipan proposal (diketik ulang: kalimat ini tidak ada di halaman judul)
    { at: A.setiap, via: 'push', ...at(1955, 4, { x: -100 }), yaw: [-6, 4], name: '1955 · kutipan', draw(ctx, t) {
      suara(ctx, 0, -90, [['“', 'every aspect of learning', ' … can in principle'], 'be so precisely described that a machine', 'can be made to simulate it.”'],
        t, A.setiap - .1, { size: 52, who: 'MENURUT PROPOSAL DARTMOUTH · 1955', tail: -1, tm: A.belajar });
      typeOn(ctx, 'setiap sisi cara belajar … bisa dijelaskan cukup rinci sampai mesin bisa menirunya', 0, 250, t, A.dasarnya, `400 22px "Space Mono"`, { cps: 40, col: ivo(.88), align: 'center' });
      srcTag(ctx, 'Sumber: Proposal Dartmouth, 31 Agustus 1955', -840, 450, t, A.dijelaskan);
    } },
    // S8 · target: 10 peneliti · 2 bulan · musim panas 1956 (+ foto IBM, kredit NASA)
    { at: A.target, via: 'rise', ...at(1956, 0), name: '1956 · target', draw(ctx, t) {
      txt(ctx, 'TARGETNYA', 130, -330, t, A.target + .1, MN(22), { ls: 8, col: ivo(.88) });
      const row = (big, lab, y, t0) => { const w = fall(ctx, big, 130, y, t, t0 - .06, DSP(180)); txt(ctx, lab, 150 + (w || 0), y - 12, t, t0 + .12, MN(26), { ls: 5, col: ivo(.85) }); };
      row('10', 'PENELITI', -150, A.sepuluh); row('2', 'BULAN', 40, A.duabulan); row('1956', 'MUSIM PANAS', 230, A.musim + .3);
    } },
    // S9 · "Eh": jam berhenti, papan tahun 1956 → 2026 (tangga curam menyala ikut angka), "kita masih di sini"
    { at: A.eh, via: 'cut', lead: 0, ...at(1956, 1), py: LAND[1956].py - 160, pitch: -3, dist: [1640, 1540], yaw: [-3, 3], name: 'Eh · 70 tahun', draw(ctx, t) {
      const kick = t > A.eh ? Math.exp(-(t - A.eh) * 7) * Math.sin((t - A.eh) * 40) * 6 : 0;
      jam(ctx, -600 + kick, -150, 190, t, A.eh - .3, { angle: sudut(t), dA: 0, ghost: 0 });
      txt(ctx, 'JAMNYA BERHENTI', -600, 110, t, A.eh + .2, MN(16), { ls: 4, col: ivo(.88), align: 'center' });
      const yr = tahunFlap(ctx, 250, -150, t, A.tujuh, 1956, 2026, 1.6, { cw: 140, ch: 196 });
      txt(ctx, yr >= 2026 ? '70 TAHUN KEMUDIAN' : 'TAHUN', 250, 0, t, A.tujuh + .1, MN(20), { ls: 6, col: ivo(.88), align: 'center' });
      txt(ctx, 'kita masih di sini,', 0, 210, t, A.kita, SRF(70), { align: 'center' });
      markLine(ctx, 'membahas hal yang ', 'sama', '.', 0, 320, t, A.membahas, A.sama, SRF(78));
      srcTag(ctx, 'Hitungan: 2026 − 1956 = 70 tahun', -840, 450, t, A.tujuh + 1.7);
    } },
    // S10 · kamera menaiki tangga curam 1957→2016: foto arsip & gelembung "sebentar lagi" berdiri di anak tangganya
    { at: A.robot, via: 'push', x: 0, z: FS.z + 2000, py: -2000, name: 'tangga curam', cam: t => {
      const u = E.inOutSine(inv(T0r, T1r, t)), z = lerp(FS.z - 300, FE.z - 200, u), y = lerp(FS.y0, FE.y0, inv(FS.z, FE.z, z));
      return { tx: lerp(0, -40, u), ty: y - 640, tz: z, yaw: lerp(-12, -6, u), pitch: lerp(-9, -4, u), dist: lerp(1500, 1420, u) };
    }, world: (ctx, t, pr, foc, items) => tanggaCuram(ctx, t, pr, foc, items) },
    // S11a · 2017: Transformer (klip ilustrasi jaringan saraf, grade dingin)
    { at: A.lompatan, via: 'rise', ...at(2017, 0), name: '2017 · Transformer', draw(ctx, t) {
      txt(ctx, 'LOMPATAN BESAR', 110, -300, t, A.lompatan + .1, MN(22), { ls: 8, col: ivo(.88) });
      fall(ctx, '2017', 100, -40, t, A.y2017 - .05, DSP(290), { stag: .06 });
      txt(ctx, 'TEKNOLOGI DASAR BERNAMA', 110, 40, t, A.teknologi, MN(20), { ls: 4, col: ivo(.88) });
      markLine(ctx, '', 'TRANSFORMER', '', 110, 190, t, A.transformer - .15, A.transformer, DSP(140), { align: 'left', ls: 3 });
      srcTag(ctx, 'Sumber: Vaswani dkk., "Attention Is All You Need", arXiv, 12 Jun 2017', -840, 450, t, A.transformer + .2);
    } },
    // S11b · pondasi: blok obrolan AI mendarat di atas Transformer
    { at: A.pondasi, via: 'truck', ...at(2017, 1, { x: 150 }), name: '2017 · pondasi', draw(ctx, t) {
      txt(ctx, 'PONDASI', -800, -380, t, A.pondasi, MN(22), { ls: 8, col: ivo(.88) });
      balok(ctx, 0, 300, 1300, 170, 'TRANSFORMER', t, A.pondasi - .2, 110);
      balok(ctx, 0, 120, 980, 150, 'PROGRAM OBROLAN AI MODERN', t, A.obrolan - .1, 84);
      balok(ctx, 0, -40, 560, 130, 'mis. ChatGPT', t, A.chatgpt - .15, 76);
    } },
    // S12 · 2019: ujian ARC dari Chollet, teka-teki kotak berwarna
    { at: A.y2019, via: 'rise', ...at(2019, 0, { x: -100 }), name: '2019 · ARC', draw(ctx, t) {
      evid(ctx, IM.pArc, -470, -90, 820, t, A.y2019, { crop: [.2, .12, .6, .88], dark: true, tab: 'ARCPRIZE.ORG', hl: [[.04, .222, .39, .05, A.chollet]] });
      fall(ctx, '2019', 110, -170, t, A.y2019 + .05, DSP(250), { stag: .06 });
      txt(ctx, 'François Chollet', 112, -80, t, A.chollet, SRF(62));
      slab(ctx, 'UJIAN ARC-AGI-1', 112, -10, t, A.arc, { size: 22 });
      gridArc(ctx, 112, 50, 46, t, A.tekateki - .1);
      txt(ctx, 'TEKA-TEKI KOTAK BERWARNA', 440, 90, t, A.tekateki + .3, MN(16), { ls: 3, col: ivo(.88) });
      srcTag(ctx, 'Sumber: ARC Prize, ARC-AGI-1', -840, 450, t, A.arc);
    } },
    // S12b · ujian bertahan ± 5 tahun: garis waktu berpegas 2019 → 2024, jarum lime
    { at: A.ujian, via: 'truck', ...at(2019, 1, { x: 100 }), name: '2019 · bertahan', draw(ctx, t) {
      txt(ctx, 'UJIANNYA BERTAHAN', 0, -300, t, A.ujian, MN(24), { ls: 8, col: ivo(.88), align: 'center' });
      fall(ctx, '± 5 TAHUN', 0, -60, t, A.limatahun - .1, DSP(240), { align: 'center', stag: .04 });
      const k = Math.min(1.04, spring(t - A.bertahan, .55, .55));
      garisTahun(ctx, -700, 700, 170, 2019, 2024, Math.max(0, Math.min(1, k)), [[2019, '2019'], [2024, '2024', 1]], { size: 26 });
      const kn = E.outQuint(inv(A.sampai - .45, A.sampai - .1, t)); if (kn > 0) { ctx.fillStyle = LIME; ctx.fillRect(698, 170 - 160 * kn, 4, 160 * kn);
        ctx.beginPath(); ctx.moveTo(688, 170 - 168 * kn); ctx.lineTo(712, 170 - 168 * kn); ctx.lineTo(700, 170 - 150 * kn); ctx.fill(); }
    } },
    // S13 · akhir 2024: model OpenAI yang dilatih menalar bertahap, skor tinggi (tanpa angka; grid terisi)
    { at: A.sampai, via: 'rise', ...at(2024, 0), name: '2024 · skor tinggi', draw(ctx, t) {
      txt(ctx, 'AKHIR', -780, -330, t, A.sampai, MN(22), { ls: 8, col: ivo(.88) });
      fall(ctx, '2024', -790, -110, t, A.y2024 - .05, DSP(260), { stag: .06 });
      txt(ctx, 'MODEL OPENAI', -780, -30, t, A.openai, MN(24), { ls: 5, col: ivo(.85) });
      typeOn(ctx, 'DILATIH MENALAR BERTAHAP', -780, 14, t, A.menalar, MN(20), { ls: 4, col: ivo(.88), cps: 40 });
      markLine(ctx, '', 'SKOR TINGGI', '', -780, 230, t, A.skor - .2, A.skor, DSP(190), { align: 'left', ls: 3 });
      gridArc(ctx, 330, -230, 62, t, A.sampai + .2, E.inOutCubic(inv(A.menalar, A.skor + .1, t)));
      txt(ctx, 'DI UJIAN ARC-AGI-1', 330, 240, t, A.skor + .3, MN(17), { ls: 4, col: ivo(.88) });
      srcTag(ctx, 'Sumber: ARC Prize, ARC-AGI-1 (hasil akhir 2024)', -840, 450, t, A.skor);
    } },
    // S14 · awal 2025: blog Sam Altman
    { at: A.awal, via: 'rise', ...at(2025, 0, { x: -100 }), name: '2025 · Altman', draw(ctx, t) {
      evid(ctx, IM.pAltman, -400, -110, 880, t, A.awal + .1, { crop: [.02, .12, .96, .78], tab: 'BLOG.SAMALTMAN.COM', rot: -.8, hl: [[.024, .77, .22, .1, A.menulis2 - .3]] });
      txt(ctx, 'AWAL', 180, -330, t, A.awal, MN(22), { ls: 8, col: ivo(.88) });
      fall(ctx, '2025', 170, -110, t, A.y2025 - .05, DSP(260), { stag: .06 });
      txt(ctx, 'Sam Altman', 180, 0, t, A.sam, SRF(76));
      txt(ctx, 'PIMPINAN OPENAI', 182, 50, t, A.sam + .6, MN(19), { ls: 4, col: ivo(.88) });
      srcTag(ctx, 'Sumber: blog Sam Altman, "Reflections", Jan 2025', -840, 450, t, A.sam + .3);
    } },
    // S14b · gelembung kutipan Altman (diketik ulang: baris kutipan tidak terlihat di tangkapan layar)
    { at: A.menulis2, via: 'push', ...at(2025, 1, { x: 120 }), name: '2025 · kutipan', draw(ctx, t) {
      suara(ctx, 0, -90, ['“We are now confident we know', ['how to build ', 'AGI', ''], 'as we have traditionally understood it.”'],
        t, A.menulis2 - .05, { size: 58, who: 'MENURUT SAM ALTMAN · JAN 2025', tail: 1, tm: A.agi });
      typeOn(ctx, 'timnya yakin tahu cara membangun AGI', 0, 260, t, A.yakin, `400 22px "Space Mono"`, { cps: 40, col: ivo(.88), align: 'center' });
      srcTag(ctx, 'Sumber: blog Sam Altman, "Reflections", Jan 2025', -840, 450, t, A.menulis2 + .3);
    } },
    // S15a · Dario Amodei: kurang suka istilah AGI (dicoret)
    { at: A.dario, via: 'whip', ...at(2025, 2, { x: -150 }), name: '2025 · Amodei', draw(ctx, t) {
      fall(ctx, 'DARIO AMODEI', 0, -160, t, A.dario - .05, DSP(190), { align: 'center', stag: .035 });
      txt(ctx, 'PIMPINAN ANTHROPIC', 0, -80, t, A.anthropic, MN(22), { ls: 6, col: ivo(.88), align: 'center' });
      txt(ctx, 'AGI', 0, 230, t, A.kurang - .1, DSP(260), { align: 'center' });
      strike(ctx, -130, 130, 230, 260, t, A.agi2, ivo(.9));
      txt(ctx, 'KURANG SUKA ISTILAHNYA', 0, 320, t, A.istilah, MN(19), { ls: 5, col: ivo(.88), align: 'center' });
    } },
    // S15b · gelembung Amodei "could come as early as 2026" + panah ke anak tangga 2026
    { at: A.tapi, via: 'truck', ...at(2025, 3, { x: 150 }), yaw: [3, -3], name: '2024 → 2026 · Amodei', draw(ctx, t) {
      txt(ctx, 'DITULIS OKTOBER 2024', -180, -330, t, A.y2024b, MN(22), { ls: 6, col: ivo(.88), align: 'center' });
      suara(ctx, -180, -150, [['“could come as early as ', '2026', '”']], t, A.tapi + .15, { size: 74, who: 'MENURUT DARIO AMODEI · OKT 2024', tail: -1, tm: A.y2026 });
      typeOn(ctx, 'AI yang sangat kuat bisa datang paling cepat 2026', -180, 120, t, A.kuat, `400 22px "Space Mono"`, { cps: 40, col: ivo(.88), align: 'center' });
      const ka = E.outQuint(inv(A.cepat, A.cepat + .5, t)); if (ka > 0) { ctx.strokeStyle = ivo(.75); ctx.lineWidth = 4; ctx.lineCap = 'round';
        const x0 = 420, y0 = -40, x1 = lerp(x0, 780, ka), y1 = lerp(y0, -380, ka); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(760, -60, x1, y1); ctx.stroke();
        if (ka > .9) { ctx.beginPath(); ctx.moveTo(x1 - 18, y1 + 22); ctx.lineTo(x1, y1); ctx.lineTo(x1 + 18, y1 + 22); ctx.stroke(); }
        txt(ctx, 'ANAK TANGGA 2026', 760, -410, t, A.cepat + .3, MN(17), { ls: 4, col: ivo(.88), align: 'right' }); }
      srcTag(ctx, 'Sumber: Dario Amodei, "Machines of Loving Grace", Okt 2024', -840, 450, t, A.menulis3 + .3);
    } },
    // S16 · 2026, bibir lime: "Itu... tahun ini lho" + lingkar spidol lime
    { at: A.s2026, via: 'rise', ...at(2026, 0), dist: [1520, 1400], yaw: [-2, 2], name: '2026 · tahun ini', draw(ctx, t) {
      fall(ctx, '2026', 0, 160, t, A.s2026 - .05, DSP(520), { align: 'center', stag: .07 });
      lingkar(ctx, 0, -40, 400, 250, t, A.itu, { lw: 13 });
      txt(ctx, 'tahun ini lho.', 0, 340, t, A.tahunini, SRF(84), { align: 'center' });
    } },
    // S17 · kenapa ilmuwan masih bilang belum?
    { at: A.kalau2, via: 'truck', ...at(2026, 1, { x: -100 }), name: 'belum?', draw(ctx, t) {
      txt(ctx, 'Kalau sudah sedekat itu,', 0, -250, t, A.kalau2, SRF(66), { align: 'center' });
      txt(ctx, 'kenapa banyak ilmuwan masih bilang', 0, -160, t, A.kenapa, SRF(66), { align: 'center' });
      fall(ctx, 'BELUM?', 0, 200, t, A.belum - .05, DSP(330), { align: 'center', stag: .05 });
    } },
    // S17b · pintar ujian ≠ pintar hidup (bersih 0,8 s sebelum portal keluar)
    { at: A.karena2, via: 'push', ...at(2026, 2, { x: 100 }), name: 'ujian ≠ hidup', draw(ctx, t) {
      ctx.globalAlpha *= gone(t, DUR - 1.45, .35);
      fall(ctx, 'PINTAR UJIAN', 0, -110, t, A.pintar - .05, DSP(210), { align: 'center', stag: .035 });
      txt(ctx, 'belum tentu', 0, 10, t, A.belum2, SRF(60), { align: 'center', col: IVORY });
      markLine(ctx, 'PINTAR ', 'HIDUP', '', 0, 230, t, A.pintar2 - .05, A.hidup, DSP(210), { ls: 3 });
    } },
  ];
  // latar foto full-bleed (revisi 17 Nov): foto/klip = latar video, tangga & tipo di atas scrim; kartu bukti tetap kartu
  const BG = [
    { im: 'turing', t0: A.tahun - .25, t1: A.karena - .1, fx: .5, fy: .4, sx: 560, cap: 'ALAN TURING', kredit: 'Foto: Elliott & Fry via Wikimedia Commons (domain publik)' },
    { im: 'eniac', t0: A.perkiraan - .2, t1: A.agustus - .2, fx: .5, fy: .5, cap: 'KOMPUTER ENIAC', kredit: 'Foto: US Army via Wikimedia Commons (domain publik)' },
    { im: 'dLit', t0: A.empat - .3, t1: A.dartmouth + .25, fx: .5, fy: .5, dir: -1, cap: 'DARTMOUTH HALL · LITOGRAFI', kredit: 'Gambar: Daderot via Wikimedia Commons (domain publik)' },
    { im: 'dFoto', t0: A.dartmouth - .2, t1: A.target - .2, fx: .5, fy: .45, cap: 'DARTMOUTH COLLEGE, HANOVER', kredit: 'Foto: Daderot via Wikimedia Commons, CC0 1.0' },
    { im: 'ibm', t0: A.target - .25, t1: A.eh - .05, fx: .45, fy: .5, sx: 620, cap: 'MESIN PENGOLAH DATA ELEKTRONIK IBM', kredit: 'Foto: NASA via Wikimedia Commons (domain publik)' },
    { im: 'mtik', t0: A.robot - .2, t1: tLewat(1970), fx: .5, fy: .5, cap: 'MESIN TIK · KANTOR LAWAS', kredit: 'Foto: Tong Quan · Pexels' },
    { im: 'shakey', t0: tLewat(1970) - .45, t1: tLewat(1984), fx: .5, fy: .4, dir: -1, cap: 'ROBOT SHAKEY', kredit: 'Foto: Carlo Nardone via Wikimedia Commons, CC BY-SA 2.0' },
    { im: 'komp', t0: tLewat(1984) - .45, t1: A.lompatan + .1, fx: .5, fy: .5, cap: 'KOMPUTER MEJA LAWAS', kredit: 'Foto: Ansel Lee · Pexels' },
    { vid: 'neural', t0: A.lompatan - .3, t1: A.y2019 - .2, grade: 'saturate(.35) contrast(1.15) brightness(.8)', cap: 'ILUSTRASI · KLIP STOK', kredit: 'Video: Nicola Narracci · Pexels' },
  ];
  const SPLITS = ST.map(s => s.z).concat(DI_TANGGA.map(o => stepOf(STEPS, o.yr).z + 40));
  // dunia: latar baja + tangga tahun + label tahun (dipanggil sekali per frame, dari station yang aktif)
  ST.forEach((s, j) => { const own = s.world; s.world = (ctx, t, pr, foc, items, c) => {
    if (j === c.i) { items.push({ z: 0, x: 0, d: 1e9, f: () => { latar(ctx, W, H); layarFoto(ctx, W, H, BG, t, { IM }); } });
      tanggaBaja(ctx, t, pr, items, STEPS, lit, { lime: [I2026], splits: SPLITS, alpha: 1 - .5 * bgK(BG, t) });
      labelTahun(ctx, t, pr, foc, items, STEPS, { era: ERA, lime: [2026], lit }); }
    if (own) own(ctx, t, pr, foc, items, c);
  }; });

  // layar: jam kecil berdetak di pojok kanan atas sampai "Eh" · caption tangga curam
  function over(o, t) {
    kreditLatar(o, W, H, BG, t);
    const ka = E.outCubic(inv(A.tahun - .2, A.tahun + .4, t)) * (1 - inv(A.eh - .35, A.eh - .05, t));
    if (ka > 0) { o.save(); o.globalAlpha = ka * .9; jam(o, 1812, 128, 46, t, null, { angle: sudut(t), dA: 0, ghost: 0 }); o.restore(); }
    const kc = E.outCubic(inv(A.tangga - .25, A.tangga + .2, t)) * (1 - inv(A.lompatan - .5, A.lompatan - .2, t));
    if (kc > 0) { o.save(); const g = o.createLinearGradient(0, 760, 0, H); g.addColorStop(0, 'rgba(8,10,12,0)'); g.addColorStop(1, `rgba(8,10,12,${.75 * kc})`); o.fillStyle = g; o.fillRect(0, 760, W, H - 760);
      o.globalAlpha = kc; markLine(o, 'Tangganya ', 'naik', ',', W / 2, 930, t, A.tangga - .25, A.naik, SRF(66));
      typeOn(o, 'TAPI JANJI “SEBENTAR LAGI” TERUS TERTUNDA', W / 2, 1000, t, A.janji, MN(22), { ls: 4, cps: 34, col: ivo(.8), align: 'center' }); o.restore(); }
    const ky = E.outCubic(inv(A.robot - .1, A.robot + .3, t)) * (1 - inv(A.lompatan - .45, A.lompatan - .15, t));
    if (ky > 0) { o.save(); o.globalAlpha = ky; const yr = Math.round(lerp(1957, 2016, E.inOutSine(inv(T0r, T1r, t))));
      txt(o, 'TAHUN', 1856, 92, t, A.robot - .1, MN(16), { ls: 6, col: ivo(.88), align: 'right' });
      setFont(o, DSP(120), 4); o.textAlign = 'right'; o.fillStyle = IVORY; o.fillText(String(yr), 1856, 200); o.fillStyle = LIME; o.fillRect(1846, 214, 10, 10); o.textAlign = 'left'; o.restore(); }
    const kr = E.outCubic(inv(A.robot - .2, A.robot + .2, t)) * (1 - inv(A.tangga - .5, A.tangga - .25, t));
    if (kr > 0) { o.save(); o.globalAlpha = kr; txt(o, 'ROBOT & KOMPUTER DATANG SILIH BERGANTI', W / 2, 1000, t, A.robot, MN(22), { ls: 4, col: ivo(.8), align: 'center' }); o.restore(); }
  }
  return makeChapter({ B, ST, load, over, gate: true, label: 'BAB 2 · 70 TAHUN "SEBENTAR LAGI"' });
}
