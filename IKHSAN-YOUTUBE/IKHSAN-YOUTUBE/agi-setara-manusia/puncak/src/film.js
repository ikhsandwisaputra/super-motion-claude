// Bab PUNCAK · "Saklar atau Tangga?" (VO take 09, 58,6 s) — payoff film, Tier A. Senja: langit hangat redup, lampu anak tangga
// menyala satu per satu. Lime hanya: TANGGA (S3 + finale), PENGGARISNYA, NETRAL, stempel BELUM AGI (satu per kalimat).
// Rencana station (waktu = kata VO):
//  S0 jadi     0,0  pertanyaan awal: saklar AGI di dinding + "SUDAH / SETARA?" jatuh huruf per huruf
//  S1 jawab    4,9  penggaris elastis (callback hook): model AI sama, garis ukur berpegas 62,7 → 99,9 %, lime PENGGARISNYA
//  S2 klikst   8,3  saklar diklik di "klik", bohlam tetap padam; kepala-kepala "setuju" muncul; coretan gading memotong saklar + KLIK
//  S3 agi     13,0  ★ pelat saklar membelah jadi dua daun pintu, dinding berlubang → tangga senja di baliknya; lime TANGGA
//  S4 tiap    16,3  ★ tangga lebar dari samping, lampu bibir menyala berurutan, 6 siluet berhenti di anak tangga berbeda,
//                   tiap siluet mengangkat tangan "SUDAH SAMPAI!" bergiliran (cmc1)
//  S5 coba    20,6  dorong ke siluet yang PALING CEPAT berteriak (anak tangga rendah) — cincin putus-putus + label
//  S6 ucapan  23,6  kartu TNW di samping siluet itu: "AGI has arrived" + label PENDIRI PERUSAHAAN CHIP AI
//  S7 janji   28,4  plate prosesor (B-roll) + hitung 400.000 CHIP GPU LAGI (srcTag TNW)
//  S8 pern    31,7  penggaris dijepit VENDOR (garis merapat): "tidak otomatis salah" → "bukan penggaris NETRAL" + OPINI NARATOR (gr2)
//  S9 aman    37,6  dua penggaris kaku menyala: ARC PRIZE, METR + kartu halamannya, "diukur: penguji mandiri"
//  S10 dan2   43,3  halaman ARC-AGI-3 (skor 62,7 % / 99,9 %) → stempel BELUM AGI (parafrase, bukan kutipan)
//  S11 artinya 48,6 judul ilustrasi "AI SUDAH SETARA MANUSIA" diketik, lalu 1 · 2 · 3 "tanya tiga hal ini"
//  S12 q1     54,6  ★ finale: kamera menaiki 3 pijakan, satu pertanyaan per pijakan; tarik mundur, tangga menyala ke cakrawala,
//                   TANGGA lime mendarat (tahan ±2 s, tidak ada teks penting di 0,6 s terakhir)
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, TILE, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid, plate,
  evid, fall, markLine, srcTag, slab, txt, typeOn, countTo, fmt, gone, onPlane, rnd, theme } from './kit.js';
import { spring } from './engine.js';
import { makeSteps, stairs, saklar, ruler, diukur, springSp } from './agi.js';
import { stamp } from './draw.js';

theme(false, { bg: '#15100D', bgrgb: '21,16,13', vig: .6 });

const XR = 4200;                                                       // baris station bukti (di samping tangga, kamera keluar menyamping)
const ZB = 26400;                                                      // finale: tangga kedua
const STA = makeSteps([['run', 3], ['land', 1100], ['run', 10], ['land', 1400], ['run', 12]], 8500);
const STB = makeSteps([['run', 1], ['land', 1000], ['run', 1], ['land', 1000], ['run', 1], ['land', 1000], ['run', 14]], ZB + 300, 220);
const mid = s => (s.z + s.z1) / 2;
// siluet di tangga A: anak tangga, x, urutan teriak (detik setelah 'teriak'), varian badan
const ORANG = [[5, 380, 0], [2, -560, .24], [12, 520, .44], [8, -330, .58], [21, 260, .74], [16, -470, .88]];

// siluet berdiri (kaki di 0,0), tinggi ±320; ks = angkat tangan (0..1). Gelap dengan garis tepi gading tipis, bukan piktogram.
function sosok(ctx, v, ks) {
  const h = 320 * (.9 + .16 * rnd(v * 3.3)), wb = 1 + .18 * (rnd(v * 7.1) - .5), sh = -h * .76;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const arm = (sd, a) => { const L = h * .36, hx = sd * 40 * wb + Math.cos(a) * L * sd, hy = sh + Math.sin(a) * L;
    ctx.beginPath(); ctx.moveTo(sd * 38 * wb, sh + 6); ctx.lineTo(hx, hy);
    ctx.strokeStyle = ivo(.5); ctx.lineWidth = 23; ctx.stroke(); ctx.strokeStyle = '#0D0A08'; ctx.lineWidth = 18; ctx.stroke(); return [hx, hy]; };
  arm(-1, lerp(1.62, 1.35, ks)); const hand = arm(1, lerp(1.5, -1.05, ks));
  ctx.fillStyle = '#0D0A08'; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2.5; ctx.beginPath();
  ctx.moveTo(-27 * wb, 0); ctx.lineTo(-22 * wb, -h * .47); ctx.lineTo(22 * wb, -h * .47); ctx.lineTo(27 * wb, 0); ctx.lineTo(9, 0); ctx.lineTo(0, -h * .3); ctx.lineTo(-9, 0); ctx.closePath();
  ctx.moveTo(-34 * wb, -h * .45); ctx.lineTo(-42 * wb, -h * .77); ctx.quadraticCurveTo(0, -h * .83, 42 * wb, -h * .77); ctx.lineTo(34 * wb, -h * .45); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -h * .9, h * .072, 0, 7); ctx.fill(); ctx.stroke();
  return { h, hand };
}

export function makeFilm() {
  const { T: A } = timing(B);
  const IM = {};
  async function load() {
    const K = '../assets/shared/kutipan/';
    [IM.tnw, IM.arc3, IM.arc1, IM.metr] = await Promise.all([
      loadImg(K + 'thenextweb-jensen-huang-says-agi-has-arrived-and-2.png', 2000), loadImg(K + 'arcprize-openai-s-gpt-6-astra-on-arc-agi-3.png', 2000),
      loadImg(K + 'arcprize-arc-agi-1.png', 1600), loadImg(K + 'metr-methodological-details.png', 1600)]);
    IM.cpu = await loadVid('../assets/shared/vid/', 'central_processor');
  }

  // lampu bibir anak tangga: A menyala berurutan sejak pelat terbuka; B tiga pijakan di pertanyaannya, sisanya menjalar saat tarik mundur
  const litA = (i, t) => E.outCubic(inv(A.agi + .3 + i * .19, A.agi + .65 + i * .19, t));
  const litB = (i, t) => i < 3 ? E.outCubic(inv([A.q1, A.q2, A.q3][i] - .35, [A.q1, A.q2, A.q3][i] + .05, t))
    : E.outCubic(inv(A.tgg - .5 + (i - 3) * .07, A.tgg - .2 + (i - 3) * .07, t));

  // langit senja: pita hangat redup di cakrawala (screen, tanpa neon), sedikit menguat setelah tangga terbuka
  function sky(ctx, t, pr, c) {
    const hz = pr(c.tx, 0, c.tz + 1e6).y, a = .1 + .07 * inv(A.agi, A.tiap, t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'none'; ctx.globalCompositeOperation = 'screen';
    const g = ctx.createLinearGradient(0, hz - 620, 0, hz + 260);
    g.addColorStop(0, 'rgba(120,70,46,0)'); g.addColorStop(.62, `rgba(176,104,66,${a})`); g.addColorStop(.74, `rgba(206,140,92,${a * 1.15})`); g.addColorStop(1, 'rgba(90,50,34,0)');
    ctx.fillStyle = g; ctx.fillRect(0, hz - 620, W, 880); ctx.globalCompositeOperation = 'source-over';
  }

  function orang(ctx, t, pr, foc, items, c) {
    ORANG.forEach(([si, x, dt], v) => {
      const s = STA[si], z = mid(s), y = s.y1, tt = A.teriak + dt, ks = E.outCubic(inv(tt - .05, tt + .22, t));
      const ka = E.outCubic(inv(A.agi + .3 + si * .19, A.agi + .75 + si * .19, t)); if (ka <= 0) return;
      items.push({ z, x, d: pr(x, y - 150, z).z, f: () => onPlane(ctx, pr, x, y, z, foc, () => {
        ctx.globalAlpha = ka; ctx.scale(1.7, 1.7); const { h, hand } = sosok(ctx, v, ks);
        if (ks > 0) {                                                  // teriakan: teks + tiga garis suara, memudar setelah 2,4 s
          const fade = 1 - .7 * inv(tt + 2.2, tt + 2.8, t), kp = spring(t - tt, .5, .32);
          ctx.globalAlpha = ka * fade; ctx.strokeStyle = ivo(.75); ctx.lineWidth = 4; ctx.beginPath();
          for (let k = -1; k <= 1; k++) { const an = -1.2 + k * .35, r0 = h * .14, r1 = r0 + 34 * kp; ctx.moveTo(Math.cos(an) * r0 + 20, -h * .9 + Math.sin(an) * r0); ctx.lineTo(Math.cos(an) * r1 + 20, -h * .9 + Math.sin(an) * r1); }
          ctx.stroke(); ctx.save(); ctx.translate(30, -h - 70); ctx.scale(.6 + .4 * kp, .6 + .4 * kp);
          setFont(ctx, DSP(v === 0 ? 74 : 62), 3); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText('SUDAH SAMPAI!', 0, 0); ctx.restore(); ctx.textAlign = 'left';
          if (v === 0 && t > A.coba + .3) {                            // yang paling cepat: cincin putus-putus
            const kr = E.outQuint(inv(A.coba + .3, A.coba + .8, t)); ctx.globalAlpha = ka; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 30;
            ctx.strokeStyle = ivo(.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, -h * .55, 150 * kr, h * .62 * kr, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
        }
      }, -c.yaw) });
    });
  }

  // satu dunia tangga per frame (station sekarang, atau station sebelumnya selama kamera masih bergerak keluar)
  function world(j) {
    return (ctx, t, pr, foc, items, c) => {
      const s = ST[j], cur = ST[c.i];
      if (j === c.i) { items.push({ z: 1e6, x: 0, d: 1e9, f: () => sky(ctx, t, pr, c) }); if (s.extra) s.extra(ctx, t, pr, foc, items, c); }
      if (!s.st) return;
      const mine = j === c.i || (j === c.i - 1 && c.k < 1 && cur.st !== s.st);
      if (!mine || c['_' + (s.st === STA ? 'a' : 'b')]) return; c['_' + (s.st === STA ? 'a' : 'b')] = 1;
      if (s.st === STA) { stairs(ctx, t, pr, items, STA, litA); orang(ctx, t, pr, foc, items, c); }
      else stairs(ctx, t, pr, items, STB, litB, { x0: XR - 1500, x1: XR + 1500 });
    };
  }

  // ── S1 penggaris elastis
  const LEN = 620;
  function elastis(ctx, t) {
    const x0 = -470, sp = springSp(t, A.peng, LEN / 62.7, LEN / 99.9), ka = E.outQuint(inv(A.jawab, A.jawab + .4, t));
    ctx.save(); ctx.globalAlpha *= ka; ctx.translate(0, 40 * (1 - ka));
    ctx.fillStyle = TILE; ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x0, -380, LEN, 190, 22); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = ivo(.3); ctx.lineWidth = 2; ctx.strokeRect(x0 + 32, -348, 126, 126); ctx.beginPath();
    for (let i = 1; i < 4; i++) { ctx.moveTo(x0 + 32 + 31.5 * i, -348); ctx.lineTo(x0 + 32 + 31.5 * i, -222); ctx.moveTo(x0 + 32, -348 + 31.5 * i); ctx.lineTo(x0 + 158, -348 + 31.5 * i); } ctx.stroke();
    setFont(ctx, MN(30), 2); ctx.fillStyle = IVORY; ctx.fillText('MODEL AI', x0 + 190, -290); setFont(ctx, MN(16), 3); ctx.fillStyle = ivo(.55); ctx.fillText('BENDANYA TIDAK BERUBAH', x0 + 190, -252);
    ctx.setLineDash([8, 10]); ctx.strokeStyle = ivo(.35); ctx.beginPath(); ctx.moveTo(x0 + LEN, -186); ctx.lineTo(x0 + LEN, -60); ctx.stroke(); ctx.setLineDash([]);
    ruler(ctx, x0, -130, sp, { upto: E.outCubic(inv(A.jawab + .2, A.jawab + .8, t)) * 100, label: t < A.peng + .1 ? 'PEMBUNGKUS STANDAR' : 'PEMBUNGKUS VENDOR' });
    ctx.restore();
    const val = t < A.peng ? 62.7 : lerp(62.7, 99.9, E.outCubic(inv(A.peng, A.peng + .7, t)));
    fall(ctx, fmt(val, 1) + '%', x0 + LEN + 70, -110, t, A.jawab + .5, DSP(170), { col: IVORY });
    markLine(ctx, 'tergantung ', 'PENGGARISNYA', '', 0, 250, t, A.jawab + .3, A.peng, SRF(88));
    srcTag(ctx, 'Sumber: ARC Prize (ARC-AGI-3), diakses 15 Nov 2026', -840, 440, t, A.jawab + .6);
  }

  // ── S2 saklar diklik, lalu dicoret
  function klik(ctx, t) {
    saklar(ctx, t, -420, 0, A.klik, { bx: 560, by: -300, scale: .92 });
    txt(ctx, 'tidak akan ada satu momen', 200, -150, t, A.klikst + .25, SRF(58), { col: ivo(.85) });
    fall(ctx, '“KLIK”', 220, 90, t, A.klik - .02, DSP(250), { col: IVORY });
    for (let i = 0; i < 6; i++) {                                      // "semua orang langsung setuju": kepala + centang bergiliran
      const t0 = A.semua + i * .12, k = spring(t - t0, .55, .3); if (t <= t0) continue;
      const x = 240 + i * 92, y = 300; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
      ctx.fillStyle = '#0D0A08'; ctx.strokeStyle = ivo(.6); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, -22, 20, 0, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-34, 40); ctx.quadraticCurveTo(0, -6, 34, 40); ctx.closePath(); ctx.fill(); ctx.stroke();
      const kc = E.outCubic(inv(t0 + .15, t0 + .35, t)); ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(-12, -86); ctx.lineTo(-12 + 8 * Math.min(1, kc * 2), -86 + 9 * Math.min(1, kc * 2)); if (kc > .5) ctx.lineTo(-4 + 22 * (kc - .5) * 2, -77 - 22 * (kc - .5) * 2); ctx.stroke(); ctx.restore();
    }
    const ks = E.inOutCubic(inv(A.setuju, A.setuju + .3, t));       // coretan gading memotong saklar dan KLIK
    if (ks > 0) { const xa = -760, ya = -340, xb = 880, yb = 230; ctx.strokeStyle = IVORY; ctx.lineCap = 'butt'; ctx.lineWidth = 22;
      ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(lerp(xa, xb, ks), lerp(ya, yb, ks)); ctx.stroke(); }
    typeOn(ctx, 'SEMUA ORANG LANGSUNG SETUJU?', 240, 400, t, A.semua + .4, MN(19), { ls: 4, cps: 50, col: ivo(.6) });
  }

  // ── S3 pelat membelah, dinding berlubang ke tangga
  function pintu(ctx, t) {
    const ko = E.outQuint(inv(A.agi + .15, A.agi + .95, t)), hw = lerp(200, 1700, ko), hh = lerp(310, 1150, ko), oy = -40 * ko;
    ctx.fillStyle = '#1E1713'; ctx.beginPath(); ctx.rect(-6000, -4000, 12000, 8000);
    if (ko > 0) ctx.roundRect(-hw, -hh + oy, hw * 2, hh * 2, lerp(40, 8, ko)); ctx.fill('evenodd');
    if (ko > 0) { const g = ctx.createLinearGradient(-hw - 60, 0, -hw, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)');
      ctx.fillStyle = g; ctx.fillRect(-hw - 60, -hh + oy, 60, hh * 2); ctx.strokeStyle = ivo(.18); ctx.lineWidth = 3; ctx.strokeRect(-hw, -hh + oy, hw * 2, hh * 2); }
    for (const sd of [-1, 1]) {                                       // dua daun: tiap separuh pelat terlipat ke tepi lubang
      ctx.save(); ctx.translate(sd * hw, oy); ctx.scale(1 - .84 * ko, 1);       // engsel di tepi lubang, daun terlipat ke arah engsel
      ctx.beginPath(); ctx.rect(sd < 0 ? -30 : -200, -360, 230, 720); ctx.clip();
      ctx.globalAlpha *= 1 - .45 * ko; saklar(ctx, t, -sd * 200, 0, A.saklar + 99, { bulb: false }); ctx.restore();
    }
    typeOn(ctx, 'SAKLAR "AGI"', -110, -380, t, A.agi - .5, MN(20), { ls: 5, cps: 40, col: ivo(.55 * (1 - ko)) });
  }

  const ST = [
    { at: 0, name: 'Sudah setara?', x: 0, z: 0, py: -560, dist: [1450, 1300], yaw: [-5, 2], draw(ctx, t) {
      saklar(ctx, t, -540, 30, 99, { bulb: false, scale: .82 });
      typeOn(ctx, 'KEMBALI KE PERTANYAAN AWAL', -170, -250, t, A.jadi + 1.0, MN(24), { ls: 5, cps: 46, col: IVORY });
      fall(ctx, 'SUDAH', -170, -20, t, A.tanya, DSP(250), { col: IVORY });
      fall(ctx, 'SETARA?', -170, 230, t, A.setara - .25, DSP(250), { col: IVORY });
    } },
    { at: A.jawab, via: 'whip', name: 'Tergantung penggarisnya', z: 2600, yaw: [4, -2], draw: (ctx, t) => elastis(ctx, t) },
    { at: A.klikst, via: 'push', name: 'Tidak ada klik', z: 5200, dist: [1560, 1420], yaw: [-3, 2.5], draw: (ctx, t) => klik(ctx, t) },
    { at: A.agi - .2, via: 'push', name: 'Pelat terbuka → tangga', st: STA, z: 7800, py: -560, dist: [1500, 1000], yaw: [0, 3], pitch: 4, pre: 0, draw: (ctx, t) => pintu(ctx, t), mod: (c, t) => { c.foc = c.dist + 1100 * E.outCubic(inv(A.agi + .2, A.agi + .9, t)); },
      layers: [{ dz: 1100, dy: -40, fn: (ctx, t) => {
        markLine(ctx, 'AGI lebih mirip ', 'TANGGA', '', 0, 0, t, A.agi + .55, A.tangga, SRF(170), { col: IVORY });
        txt(ctx, 'daripada saklar lampu', 0, 120, t, A.saklar - .1, MN(26), { ls: 6, align: 'center', col: ivo(.7) });
      } }] },
    { at: A.tiap, via: 'rise', name: 'Tiap orang berhenti', st: STA, x: 0, z: 12000, py: -1450, dist: [2950, 2600], yaw: [27, 21], pitch: 9,
      extra(ctx, t, pr, foc, items, c) {                               // keterangan tajam di kedalaman sendiri (bukan blur DOF)
        const x = -1250, y = -2000, z = 11200; items.push({ z, x, d: 1, f: () => onPlane(ctx, pr, x, y, z, pr(x, y, z).z, () => {
          txt(ctx, 'tiap orang berhenti', 0, 0, t, A.tiap + .35, SRF(120), { col: IVORY });
          txt(ctx, 'DI ANAK TANGGA BERBEDA', 6, 92, t, A.berbeda - .1, MN(34), { ls: 7, col: ivo(.75) }); }, -c.yaw) });
      } },
    { at: A.coba, via: 'push', name: 'Siapa paling cepat', st: STA, x: 380, z: mid(STA[5]), py: STA[5].y1 - 330, dist: [1750, 1550], yaw: [12, 7], pitch: 5,
      layers: [{ dz: -10, dx: 440, dy: -60, ry: -10, fn: (ctx, t) => {
        slab(ctx, 'PALING CEPAT BERTERIAK', 0, 0, t, A.cepat - .1, { size: 26 });
        txt(ctx, 'coba perhatikan siapa yang', 0, -90, t, A.coba + .3, SRF(62), { col: ivo(.85) });
      } }] },
    { at: A.ucapan - .1, via: 'truck', name: 'AGI sudah tiba', st: STA, x: 1180, z: mid(STA[5]), py: STA[5].y1 - 330, dist: [1560, 1440], yaw: [-5, -2], pitch: 4,
      draw(ctx, t) {
        evid(ctx, IM.tnw, 140, -80, 1160, t, A.ucapan, { crop: [.04, .235, .92, .14], tab: 'THE NEXT WEB · 7 SEP 2026', hl: [[.5, .38, .33, .56, A.tiba]] });
        typeOn(ctx, 'PENDIRI PERUSAHAAN CHIP AI · DI X · 6 SEP 2026', -440, 60, t, A.pendiri - .05, MN(24), { ls: 3, cps: 52, col: ivo(.8) });
        txt(ctx, 'ucapan “AGI sudah tiba” datang dari', -440, -210, t, A.ucapan + .2, SRF(50), { col: ivo(.85) });
        srcTag(ctx, 'Sumber: The Next Web (TNW), 7 Sep 2026', -440, 150, t, A.ucapan + .6);
      } },
    { at: A.janji, via: 'whip', name: '400.000 chip', x: XR, z: 13000, dist: [1500, 1380], yaw: [3, -2],
      layers: [{ dz: 420, fn(ctx, t) {                                 // klip CPU = latar penuh (bukan pelat berkotak): cover, grade dokumenter, vignette + grain, dorong pelan
        const k = E.outCubic(inv(A.janji - .35, A.janji + .25, t)); if (k <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * k;
        plate(ctx, IM.cpu, t, 0, 0, 3100, 1760, 1, { t0: A.janji - .35, grade: 'saturate(.55) contrast(1.12) brightness(.72)', dim: .3, vig: .75, grain: .3, marks: false });
        ctx.globalAlpha = a0; } }],
      draw(ctx, t) {
      const ks = E.outCubic(inv(A.janji - .2, A.janji + .4, t)), sg = ctx.createRadialGradient(0, -20, 80, 0, -20, 980);   // scrim di belakang angka
      sg.addColorStop(0, `rgba(8,7,6,${.62 * ks})`); sg.addColorStop(1, 'rgba(8,7,6,0)'); ctx.fillStyle = sg; ctx.fillRect(-1500, -900, 3000, 1800);
      const v = countTo(0, 400000, t, A.n400 - .05, .85);
      if (t > A.n400 - .05) { setFont(ctx, DSP(260), 4); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(fmt(Math.round(v / 1000) * 1000), 0, 60); ctx.textAlign = 'left'; }
      txt(ctx, 'CHIP GPU LAGI', 0, 150, t, A.gpu - .05, MN(34), { ls: 8, align: 'center', col: IVORY });
      txt(ctx, 'sambil menjanjikan', 0, -200, t, A.janji + .2, SRF(54), { align: 'center', col: ivo(.9) });
      srcTag(ctx, 'Sumber: The Next Web (TNW), 7 Sep 2026', -840, 440, t, A.n400);
    } },
    { at: A.pern, via: 'push', name: 'Bukan penggaris netral', x: XR, z: 15600, dist: [1500, 1400], yaw: [-4, 2], draw(ctx, t) {
      const x0 = -560, sp = springSp(t, A.tapi + .45, 11.2, 7.4), ka = E.outQuint(inv(A.pern, A.pern + .4, t));
      ctx.save(); ctx.globalAlpha *= ka; ruler(ctx, x0, -20, sp, { label: 'PENGGARIS' }); ctx.restore();
      const kv = E.outQuint(inv(A.tapi, A.tapi + .45, t));            // penjepit vendor menekan ujung kanan
      if (kv > 0) { const cx = x0 + 100 * sp + 40 + 560 * (1 - kv); ctx.fillStyle = '#2A231E'; ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.roundRect(cx, -44, 88, 220, 14); ctx.fill(); ctx.stroke(); ctx.strokeStyle = ivo(.22); ctx.beginPath();
        for (let i = 0; i < 6; i++) { ctx.moveTo(cx + 60, -6 + i * 28); ctx.lineTo(cx + 76, -6 + i * 28); } ctx.stroke();
        ctx.save(); ctx.translate(cx + 38, 66); ctx.rotate(-Math.PI / 2); setFont(ctx, MN(18), 4); ctx.fillStyle = ivo(.85); ctx.textAlign = 'center'; ctx.fillText('VENDOR', 0, 6); ctx.restore(); ctx.textAlign = 'left'; }
      ctx.save(); ctx.globalAlpha *= gone(t, A.bukan - .25); txt(ctx, 'tidak otomatis salah', 0, -230, t, A.salah - .3, SRF(96), { align: 'center', col: IVORY }); ctx.restore();
      markLine(ctx, 'bukan penggaris ', 'NETRAL', '', 0, -230, t, A.bukan - .02, A.netral, SRF(112), { col: IVORY });
      slab(ctx, 'OPINI NARATOR', -840, -400, t, A.pern + .4, { size: 20 });
    } },
    { at: A.aman, via: 'whip', name: 'Penguji mandiri', x: XR, z: 18200, dist: [1520, 1400], yaw: [4, -1.5], draw(ctx, t) {
      txt(ctx, 'penggaris yang lebih aman:', -840, -330, t, A.aman + .2, SRF(70), { col: IVORY });
      const row = (y, nm, tl, im, crop, dark, tab) => {
        const kl = E.outCubic(inv(tl - .1, tl + .3, t)), ka = E.outQuint(inv(A.aman + .3, A.aman + .8, t));
        ctx.save(); ctx.globalAlpha *= ka; ruler(ctx, -800, y, 6.4, { alpha: .35 + .65 * kl, every: 20 });
        setFont(ctx, DSP(72), 3); ctx.fillStyle = ivo(.25 + .75 * kl); ctx.fillText(nm, -800, y - 26); ctx.restore();
        if (kl > 0) { ctx.fillStyle = ivo(.1 * kl * (1 - inv(tl + .2, tl + .9, t))); ctx.fillRect(-834, y, 708, 132); }
        evid(ctx, im, 470, y + 40, 620, t, A.mandiri + (y > 0 ? .25 : 0), { crop, dark, tab, rot: y > 0 ? 1.5 : -1.5, spin: 3 });
      };
      row(-150, 'ARC PRIZE', A.arc, IM.arc1, [.2, .12, .6, .25], true, 'ARCPRIZE.ORG');
      row(200, 'METR', A.metr, IM.metr, [.12, .19, .76, .42], false, 'METR.ORG');
      diukur(ctx, -800, 360, 640, t, A.mandiri - .3, 'penguji mandiri');
      srcTag(ctx, 'Sumber: arcprize.org · metr.org, diakses 15 Nov 2026', -840, 470, t, A.mandiri + .3);
    } },
    { at: A.dan2, via: 'push', name: 'ARC: belum AGI', x: XR, z: 20800, dist: [1500, 1300], yaw: [-3, 1.5], draw(ctx, t) {
      evid(ctx, IM.arc3, 0, -150, 1340, t, A.dan2 - .1, { crop: [.2, .12, .72, .7], dark: true, tab: 'ARC PRIZE · ARC-AGI-3' });
      const ku = E.outCubic(inv(A.skor, A.skor + .5, t));             // garis bawah gading di skor 62,7 % / 99,9 %
      if (ku > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-576, -42, 1190 * ku, 5); }
      txt(ctx, 'menurut ARC Prize sendiri, skor setinggi itu', 0, 150, t, A.dan2 + .3, SRF(58), { align: 'center', col: IVORY });
      stamp(ctx, 'BELUM AGI', 0, 300, t, A.belum, { size: 130, rot: -3 });
      srcTag(ctx, 'Sumber: ARC Prize, diakses 15 Nov 2026 (parafrase)', -840, 450, t, A.dan2 + .5);
    } },
    { at: A.artinya, via: 'whip', name: 'Tanya tiga hal', x: XR, z: 23400, dist: [1520, 1380], yaw: [3, -2], draw(ctx, t) {
      txt(ctx, 'setiap kali kamu melihat judul', 0, -300, t, A.artinya + .8, SRF(62), { align: 'center', col: ivo(.9) });
      const kb = E.outQuint(inv(A.judul - .4, A.judul, t));
      if (kb > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-880 * kb, -210, 1760 * kb, 220);
        setFont(ctx, MN(18), 4); ctx.fillStyle = 'rgba(17,18,14,.6)'; ctx.fillText('ILUSTRASI JUDUL', -850, -176);
        typeOn(ctx, 'AI SUDAH SETARA MANUSIA', 0, -40, t, A.judul, DSP(150), { align: 'center', cps: 20, col: '#11120E' }); }
      txt(ctx, 'TANYA TIGA HAL INI', 0, 120, t, A.tiga - .3, MN(28), { ls: 8, align: 'center', col: ivo(.75) });
      ['1', '2', '3'].forEach((n, i) => fall(ctx, n, -200 + i * 200, 330, t, A.tiga + i * .1, DSP(180), { align: 'center', col: IVORY }));
    } },
    { at: A.q1 - .3, via: 'rise', name: 'Tiga pertanyaan', st: STB, x: XR, z: ZB + 800, py: STB[0].y1, pre: .3,
      cam(t) {
        const P = [[STB[0], A.q1], [STB[1], A.q2], [STB[2], A.q3]], pose = s => [s.y1 - 100, s.z + 60];
        let [ty, tz] = pose(STB[0]);
        for (let i = 1; i < 3; i++) { const k = E.inOutCubic(inv(P[i][1] - .3, P[i][1] + .3, t)), [y2, z2] = pose(P[i][0]); ty = lerp(ty, y2, k); tz = lerp(tz, z2, k); }
        const kb = E.inOutCubic(inv(A.tgg - .7, A.tgg + .9, t));
        return { tx: XR, ty: lerp(ty, -830, kb), tz: lerp(tz, ZB + 2200, kb), dist: lerp(1350 - 60 * inv(A.q1, A.tgg, t), 4700, kb),
          yaw: lerp(-4 + 3 * inv(A.q1, A.tgg, t), -16, kb), pitch: lerp(3, 9, kb) };
      },
      extra(ctx, t, pr, foc, items, c) {                               // tanda pertanyaan + TANGGA sebagai item dunia: fokus tajam sendiri saat tarik mundur
        const kb = E.inOutCubic(inv(A.tgg - .7, A.tgg + .9, t));
        [['01', 'SIAPA YANG BILANG?', 'q1'], ['02', 'UJIANNYA APA?', 'q2'], ['03', 'SIAPA YANG MENGUJINYA?', 'q3']].forEach(([n, q, key], i) => {
          const z = STB[i].z + 60, y = STB[i].y1, k = E.outQuint(inv(A[key] - .1, A[key] + .4, t)); if (k <= 0) return;
          items.push({ z, x: XR, d: pr(XR, y, z).z - 30, f: () => { const o = pr(XR, y, z); onPlane(ctx, pr, XR, y, z, lerp(foc, o.z, kb), () => {
            setFont(ctx, MN(24), 6); ctx.fillStyle = ivo(.6 * k); ctx.textAlign = 'center'; ctx.fillText(n, 0, -190); ctx.textAlign = 'left';
            const sq = lerp(1, 1.45, kb); ctx.save(); ctx.translate(0, -90); ctx.scale(sq, sq); ctx.translate(0, 90);   // membesar saat tarik mundur agar tetap terbaca
            fall(ctx, q, 0, -40, t, A[key] - .08, DSP(150), { align: 'center', col: IVORY, stag: .018 }); ctx.restore(); }, -c.yaw * kb); } });
        });
        if (t > A.tgg) { const z = ZB + 5600, y = -1500; items.push({ z, x: XR, d: pr(XR, y, z).z, f: () => onPlane(ctx, pr, XR, y, z, pr(XR, y, z).z,
          () => fall(ctx, 'TANGGA', 0, 0, t, A.tgg, DSP(900), { align: 'center', col: LIME, ls: 20, stag: .05, drop: -260 }), -c.yaw) }); }
      } },
  ];
  ST.forEach((s, j) => { s.world = world(j); });
  return makeChapter({ B, ST, load, gate: true, label: 'PUNCAK · SAKLAR ATAU TANGGA?' });
}
