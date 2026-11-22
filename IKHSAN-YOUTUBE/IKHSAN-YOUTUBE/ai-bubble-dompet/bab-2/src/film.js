// Bab 2 · Kenapa AI dicurigai menggelembung (VO abd_vo_ahmad_05, 163.4 s). One depth row of 22 stations.
// S0 duit keluar · S1 server racks + what AI needs · S2 three giants → one rack tower ≥ US$500 M (CNBC full) · S3 rupiah counter ·
// S4 APBN 2026 · S5 tower vs two APBN blocks (+ Amazon ghost) · S6 2027 > US$1 T in a bubble · S7 two buckets ·
// S8 Anthropic (DW full) · S9 the chart: loss bar 80,7, push in, then it CRACKS and 72,4 turns to paper · S10 693 juta sliver + loupe ·
// S11 kantong mereka + Ahri's chart · S12–13 serem / adem · S14 janji ciut · S15 NVIDIA → OpenAI (NVIDIA full) · S16 100 struck → 30 ·
// S17 the grid cut 100 → 30 + GeForce 256 · S18 receipt · S19 IMF three cards (IMF full) · S20 checklist ·
// S21 the question; on "retak" the screen itself cracks (new technique: screen-space glass fracture with refraction shards).
// Numbers only from Ahri's sourced fact list; derived ones are labelled (diolah / dihitung), illustrations say so.
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, spring, IVORY, LIME, LIME_INK, ivo, setFont, DISP, SER, MONO, rnd, D2R, timing, makeChapter,
  loadImg, loadVid, plate, evid, fall, typeOn, markLine, srcTag, slab, txt, countTo, fmt, gone, mk } from './kit.js';
import { kq, pop, popAt, doc, stamp, coin, stack, slot } from './draw.js';
import { bubble, pumped, wobble } from './gelembung.js';

const DSP = s => `400 ${s}px "${DISP}"`, SRF = s => `italic 380 ${s}px "${SER}"`, MN = (s, w = 700) => `${w} ${s}px "${MONO}"`;
const INK = '#1D1E18', PAPER = '#A3A197';
const still = im => ({ n: 2, fps: 1, img: [im, im] });

export function makeFilm() {
  const { T: A } = timing(B);
  const V = {}, IM = {};

  async function load() {
    const vb = '../assets/shared/vid/', kb = '../assets/shared/kutipan/';
    V.rak = await loadVid(vb, 'rak_server'); V.jar = await loadVid(vb, 'jaringan'); V.mon = await loadVid(vb, 'monitor_grafik');
    IM.cnbc = await loadImg(kb + 'cnbc-ai-buildout-hits-snag-as-google-and.png', 1800);
    IM.dw = await loadImg(kb + 'dw-is-the-ai-bubble-bursting-just-as.png', 1800);
    IM.nv = await loadImg(kb + 'nvidianews-openai-and-nvidia-announce-strategic.png', 1800);
    IM.imf = await loadImg(kb + 'imf-global-financial-stability-report.png', 1800);
    IM.chart = await loadImg('../assets/shared/grafik/anthropic-h1-2026.png', 1400);
    IM.gf = await loadImg('../assets/shared/cc/commons-visiontek-geforce-256.jpg', 1200);
  }

  // ── props ─────────────────────────────────────────────────────────────────────────────────────────────────
  function rack(ctx, x, yb, w, h, a = 1) {                   // a server-rack column: ivory body, rack-unit seams, status LEDs
    if (h <= 0) return; const a0 = ctx.globalAlpha; ctx.globalAlpha = a0 * a;
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#D9D6C8'); g.addColorStop(.45, IVORY); g.addColorStop(1, '#BDBAAD');
    ctx.fillStyle = g; ctx.fillRect(x - w / 2, yb - h, w, h);
    ctx.fillStyle = 'rgba(29,30,24,.28)'; ctx.beginPath(); for (let y = yb - 16; y > yb - h + 4; y -= 16) ctx.rect(x - w / 2 + 10, y, w - 20, 2); ctx.fill();
    ctx.fillStyle = 'rgba(29,30,24,.5)'; ctx.beginPath(); for (let y = yb - 9; y > yb - h + 6; y -= 16) ctx.rect(x + w / 2 - 22, y - 2, 5, 4); ctx.fill();
    ctx.globalAlpha = a0;
  }
  function dash(ctx, x, yb, w, h, a) {
    if (a <= 0) return; ctx.save(); ctx.setLineDash([12, 9]); ctx.strokeStyle = ivo(.4 * a); ctx.lineWidth = 2; ctx.strokeRect(x - w / 2, yb - h, w, h); ctx.restore();
  }
  function coinRain(ctx, t, t0, n, x0, x1, y0, y1, sp = 620) {   // spinning coins falling through a band, looping
    if (t <= t0) return;
    for (let i = 0; i < n; i++) {
      const s = t - t0 - i * .07; if (s <= 0) continue; const span = y1 - y0, y = y0 + ((s * sp * (.8 + .4 * rnd(i + 7)) + rnd(i + 2) * span) % span);
      ctx.save(); ctx.translate(lerp(x0, x1, rnd(i + 3)), y); ctx.rotate((rnd(i) - .5) * .9); ctx.scale(1, .45 + .55 * Math.abs(Math.sin(s * 4 + i)));
      coin(ctx, 0, 0, 26 + 16 * rnd(i + 1), 7); ctx.restore();
    }
  }
  function bucket(ctx, x, yb, w, h, lv, t, seed) {          // line-art bucket; lv 0..1 fill, > 1 spills over both rims
    const wb = w * .76, path = () => { ctx.beginPath(); ctx.moveTo(x - w / 2, yb - h); ctx.lineTo(x - wb / 2, yb); ctx.lineTo(x + wb / 2, yb); ctx.lineTo(x + w / 2, yb - h); };
    const top = yb - h * Math.min(lv, 1.02);
    ctx.save(); path(); ctx.closePath(); ctx.clip();
    ctx.fillStyle = ivo(.82); ctx.beginPath(); ctx.moveTo(x - w, yb + 10);
    for (let xx = x - w; xx <= x + w; xx += 16) ctx.lineTo(xx, top + 5 * Math.sin(xx * .03 + t * 5 + seed));
    ctx.lineTo(x + w, yb + 10); ctx.fill();
    ctx.strokeStyle = 'rgba(29,30,24,.25)'; ctx.lineWidth = 2; ctx.beginPath();
    for (let y = yb - 18; y > top + 8; y -= 22) { ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); } ctx.stroke(); ctx.restore();
    ctx.strokeStyle = IVORY; ctx.lineWidth = 5; ctx.lineJoin = 'round'; path(); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, yb - h, w / 2, 16, 0, Math.PI, 0); ctx.stroke();
    if (lv > 1) {                                            // overflow: drops sliding off both rims
      ctx.fillStyle = ivo(.8);
      for (let i = 0; i < 18; i++) { const sd = i % 2 ? 1 : -1, ph = (t * (1.1 + .5 * rnd(i + seed)) + rnd(i * 3 + seed)) % 1, dx = sd * (w / 2 + 6 + 30 * ph * ph), dy = yb - h + 560 * ph * ph;
        if (dy < yb + 30) { ctx.beginPath(); ctx.ellipse(x + dx, dy, 7, 10 + 6 * ph, 0, 0, 7); ctx.fill(); } }
    }
  }

  // ── S2 · the three giants (columns → one tower) ──────────────────────────────────────────────────────────
  const GI = [['MICROSOFT', 170, '170', A.microsoft, A.rencana + .05], ['ALPHABET', 200, '195–205', A.alphabet, A.infrastruktur], ['META', 140, '135–145', A.meta, A.mereka]];
  // ── S9 · Anthropic chart geometry (shared by S9 and S10) ─────────────────────────────────────────────────
  const CYB = 300, CPX = 6, XP = -380, XR = 120, CBW = 210, YC = CYB - 8.3 * CPX;

  const ST = [
    { at: 0, draw(ctx, t) {                                   // S0 · kita lihat dari duit yang mereka keluarin dulu
      coinRain(ctx, t, .1, 18, -880, 880, -620, 620, 560);
      txt(ctx, 'Kita lihat dari', 0, -60, t, A.kita - .15, SRF(64), { align: 'center' });
      markLine(ctx, 'duit yang mereka ', 'KELUARIN', ' dulu', 0, 70, t, A.duit - .1, A.keluarin, SRF(96));
    } },
    { at: A.buat - .12, via: 'rise', draw(ctx, t) {           // S1 · server racks: gedung, chip, listrik, RAM
      plate(ctx, V.rak, t, 0, -40, 1560, 800, kq(t, A.buat - .1, .6), { t0: A.buat, dim: .2 });
      typeOn(ctx, 'BUAT AI JALAN, BUTUH:', -760, -380, t, A.ai, MN(26), { ls: 6, cps: 30 });
      slab(ctx, 'GEDUNG PENUH CHIP', -620, -230, t, A.gedung, { size: 28, lx: -380, ly: -110 });
      slab(ctx, 'LISTRIK GEDE BANGET', 80, -280, t, A.listrik, { size: 28, lx: 260, ly: -120 });
      slab(ctx, 'MEMORI · RAM', 300, 120, t, A.memori, { size: 28, lx: 150, ly: 30 });
      markLine(ctx, 'Semuanya ', 'MAHAL', ' banget.', 0, 450, t, A.semuanya - .15, A.mahal, SRF(76));
    } },
    { at: A.ambil - .1, via: 'whip', draw(ctx, t) {           // S2 · three giants: dashed columns, rack bars rise, then stack into one tower
      const PX = 1.5, YB = 330, BW = 230, xs = [-600, -110, 380], ks = E.inOutCubic(inv(A.ditotal, A.ditotal + .6, t));
      txt(ctx, 'AMBIL CONTOH TIGA PERUSAHAAN', -860, -440, t, A.tiga, MN(24), { ls: 6, col: ivo(.7) });
      let acc = 0;
      GI.forEach(([nm, v, lab, tn, tb], i) => {
        const ko = kq(t, tn, .35); if (ko <= 0) { acc += v * PX; return; }
        const h = v * PX * E.outQuint(inv(tb, tb + .6, t)), x = lerp(xs[i], -560, ks), yb = lerp(YB, YB - acc, ks); acc += v * PX;
        dash(ctx, xs[i], YB, BW, v * PX, ko * (1 - ks) * (1 - .6 * inv(tb, tb + .4, t)));
        rack(ctx, x, yb, BW, h);
        ctx.save(); ctx.globalAlpha *= 1 - ks;
        fall(ctx, nm, xs[i], YB + 80, t, tn, DSP(78), { align: 'center' });
        if (i === 1) txt(ctx, 'induk Google', xs[i], YB + 130, t, A.google, MN(20), { align: 'center', col: ivo(.7) });
        fall(ctx, lab, xs[i], YB - v * PX - 30, t, tb + .2, DSP(90), { align: 'center' });
        ctx.restore();
        if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; ctx.textAlign = 'center'; ctx.fillStyle = INK;           // labels sit inside each segment
          setFont(ctx, DSP(42), 1); ctx.fillText(nm, x, yb - h / 2 + 4); setFont(ctx, MN(20), 2); ctx.fillText(lab, x, yb - h / 2 + 34); ctx.textAlign = 'left'; ctx.restore(); }
      });
      txt(ctx, 'RENCANA BELANJA INFRASTRUKTUR · MILIAR US$', -860, -400, t, A.rencana, MN(18), { ls: 4, col: ivo(.5) });
      typeOn(ctx, 'DITOTAL, PALING DIKIT', -300, -150, t, A.angkanya - .1, MN(28), { ls: 5, cps: 30, col: ivo(.75) });
      fall(ctx, '≥ US$500', -306, 70, t, A.n500 - .05, DSP(260));
      slab(ctx, 'MILIAR · SETAHUN', -300, 150, t, A.miliar, { size: 30, lime: true });
      srcTag(ctx, 'CNBC, 29 Okt 2026 (diolah)', -860, 470, t, A.n500 + .3);
    } },
    { at: A.kurs - .15, via: 'rise', draw(ctx, t) {           // S3 · rupiahin: kurs × 500 miliar, a rolling counter, coin stacks
      typeOn(ctx, 'US$500 MILIAR', -800, -300, t, A.kurs - .1, MN(32), { ls: 4, cps: 30, col: ivo(.75) });
      typeOn(ctx, '× KURS Rp18.145', -800, -245, t, A.kurs2, MN(32), { ls: 4, cps: 30, col: ivo(.75) });
      if (t > A.tembus - .1) { ctx.save(); ctx.globalAlpha *= kq(t, A.tembus - .1, .25); slot(ctx, countTo(0, 9072, t, A.tembus, 1.15), -812, 110, DSP(300), { fmt: q => '±Rp' + fmt(q) }); ctx.restore(); }
      slab(ctx, 'TRILIUN', -800, 200, t, A.triliun - .05, { size: 36, lime: true });
      [10, 15, 21, 27].forEach((n, i) => stack(ctx, 330 + i * 170, 330, n, t, A.kurs2 + .3 + i * .5, { rx: 72, th: 17, step: .05 }));
      srcTag(ctx, 'Kurs: KSSK, 2 Nov 2026 · dihitung', -860, 470, t, A.kurs2 + .3);
    } },
    { at: A.bayangin - .12, via: 'whip', draw(ctx, t) {       // S4 · APBN 2026
      popAt(ctx, -470, -10, t, A.seluruh - .1, () => {
        doc(ctx, 0, 0, 500, 660); setFont(ctx, MN(22), 5); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('UNDANG-UNDANG', 0, -230);
        setFont(ctx, DSP(120), 2); ctx.fillText('APBN 2026', 0, -110); ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(29,30,24,.18)'; ctx.beginPath(); for (let i = 0; i < 9; i++) ctx.rect(-190, -40 + i * 34, 380 - (i % 3) * 60, 12); ctx.fill();
      }, { rot: -3, rise: 80 });
      txt(ctx, 'SELURUH BELANJA NEGARA', 60, -250, t, A.seluruh, MN(26), { ls: 6, col: ivo(.7) });
      fall(ctx, 'APBN 2026', 56, -100, t, A.apbn - .05, DSP(150));
      fall(ctx, 'Rp3.842,7', 56, 130, t, A.n3842 - .05, DSP(230));
      slab(ctx, 'TRILIUN', 62, 215, t, A.triliun2 - .05, { size: 30 });
      srcTag(ctx, 'UU APBN 2026 (Kemenkum)', -860, 470, t, A.apbn + .3);
    } },
    { at: A.jadi - .1, via: 'push', mod(p, t) { const s = t - A.apbn2; if (s > 0 && s < .6) p.ty += 16 * Math.exp(-s / .12) * Math.sin(s * 80); },
      draw(ctx, t) {                                          // S5 · one year of three companies vs two APBN blocks
      const PXT = 720 / 9072, YB = 330, hL = 9072 * PXT * E.outQuint(inv(A.tiga2, A.setahun + .5, t)), hA = 3842.7 * PXT;
      rack(ctx, -330, YB, 270, hL);
      fall(ctx, '±Rp9.072 T', -330, YB - 720 - 30, t, A.setahun + .3, DSP(80), { align: 'center' });
      txt(ctx, '3 PERUSAHAAN · 1 TAHUN', -330, YB + 60, t, A.tiga2, MN(22), { ls: 4, align: 'center', col: ivo(.8) });
      [[A.siap, 0], [A.dua, 1]].forEach(([t0, j]) => { const s = t - t0; if (s <= 0) return; const y = YB - j * hA - (1 - spring(s, .62, .3)) * 520;
        ctx.globalAlpha = clamp(s / .08); ctx.fillStyle = '#8F8D84'; ctx.fillRect(230 - 135, y - hA + 4, 270, hA - 4);
        ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2; ctx.strokeRect(230 - 135, y - hA + 4, 270, hA - 4);
        setFont(ctx, DSP(54), 2); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('APBN 2026', 230, y - hA / 2 + 6);
        setFont(ctx, MN(18), 2); ctx.fillText('Rp3.842,7 T', 230, y - hA / 2 + 40); ctx.textAlign = 'left'; ctx.globalAlpha = 1; });
      txt(ctx, '2 × APBN', 230, YB + 60, t, A.dua, MN(22), { ls: 4, align: 'center', col: ivo(.8) });
      if (t > A.lipat) { const k = kq(t, A.lipat, .3), y0 = YB - 720, y1 = YB - 2 * hA; ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(400, y1); ctx.lineTo(430, y1); ctx.lineTo(430, lerp(y1, y0, k)); ctx.lineTo(400, lerp(y1, y0, k)); ctx.stroke();
        ctx.setLineDash([8, 8]); ctx.strokeStyle = ivo(.4); ctx.beginPath(); ctx.moveTo(-195, y0); ctx.lineTo(400, y0); ctx.stroke(); ctx.setLineDash([]); }
      stamp(ctx, 'LEBIH DARI 2× APBN', 330, -470, t, A.lipat, { size: 74 });
      if (t > A.amazon) { const k = kq(t, A.amazon, .4); dash(ctx, 680, YB, 220, 520 * k, 1);
        txt(ctx, '+ AMAZON?', 680, YB - 520 * k - 26, t, A.amazon, DSP(64), { align: 'center' });
        txt(ctx, 'BELUM DIHITUNG', 680, YB + 60, t, A.amazon + .15, MN(20), { ls: 4, align: 'center', col: ivo(.7) }); }
      srcTag(ctx, 'CNBC 29 Okt 2026 · UU APBN 2026 · KSSK 2 Nov 2026 (diolah)', -860, 470, t, A.setahun);
    } },
    { at: A.terus - .1, via: 'whip', draw(ctx, t) {           // S6 · tahun depan: > US$1 triliun, inside a swelling bubble
      plate(ctx, V.jar, t, -470, -10, 820, 520, kq(t, A.terus, .6), { t0: A.terus, dim: .15 });
      typeOn(ctx, 'TAHUN DEPAN · PROYEKSI 2027', -876, -320, t, A.depan, MN(24), { ls: 5, cps: 30, col: ivo(.75) });
      txt(ctx, 'belanja raksasa-raksasa ini', -876, 330, t, A.raksasa - .1, SRF(54));
      const r = 215 * pumped(t, A.diperkirakan, [[A.tembus2, .14], [A.satu, .18], [A.triliun3, .14]], .02), cy = -10 - 6 * Math.sin(t * 1.3);
      bubble(ctx, 450, cy, r, t, { wob: wobble(t, [[A.tembus2], [A.satu], [A.triliun3]]), film: .16, seed: 3 });
      txt(ctx, 'LEBIH DARI', 450, cy - 95, t, A.tembus2, MN(26), { ls: 6, align: 'center', col: ivo(.8) });
      fall(ctx, 'US$1 TRILIUN', 450, cy + 45, t, A.satu - .05, DSP(124), { align: 'center' });
      srcTag(ctx, 'CNBC, 29 Okt 2026 · proyeksi', -860, 470, t, A.satu + .2);
    } },
    { at: A.masalahnya - .1, via: 'rise', draw(ctx, t) {      // S7 · two buckets: keluar overflows, masuk barely covers the floor
      const lvK = .25 + .9 * E.outCubic(inv(A.masalahnya, A.ngejar + .3, t)), lvM = .1 + .08 * E.outCubic(inv(A.pelanggan, A.keluar, t));
      coinRain(ctx, t, A.masalahnya, 12, -500, -340, -560, 0, 900);
      bucket(ctx, -420, 330, 380, 400, lvK, t, 1);
      bucket(ctx, 420, 330, 380, 400, lvM, t, 5);
      if (t > A.pelanggan) for (let i = 0; i < 3; i++) { const s = t - A.pelanggan - i * .3; if (s > 0 && s < .9) coin(ctx, 400 + i * 30, -560 + 1200 * s * s, 22, 6); }
      txt(ctx, 'DUIT KELUAR · BELANJA', -420, 400, t, A.masalahnya + .2, MN(22), { ls: 4, align: 'center' });
      txt(ctx, 'DUIT MASUK · PELANGGAN', 420, 400, t, A.masuk, MN(22), { ls: 4, align: 'center' });
      markLine(ctx, 'duit masuk belum kuat ', 'NGEJAR', ' duit keluar', 0, -400, t, A.masuk - .2, A.ngejar, SRF(62));
      txt(ctx, 'ILUSTRASI · TANPA ANGKA', 480, 470, t, A.masuk + .4, MN(16), { ls: 4, col: ivo(.45) });
    } },
    { at: A.contoh - .1, via: 'whip', draw(ctx, t) {          // S8 · Anthropic (DW full rides over the start)
      fall(ctx, 'ANTHROPIC', -860, -30, t, A.anthropic, DSP(230));
      txt(ctx, 'pembuat chatbot Claude', -856, 70, t, A.claude - .1, SRF(60));
      popAt(ctx, 470, -30, t, A.laporan - .05, () => {
        doc(ctx, 0, 0, 500, 640); setFont(ctx, MN(22), 5); ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.fillText('PROSPEKTUS · S-1', 0, -240);
        setFont(ctx, DSP(80), 2); ctx.fillText('LAPORAN', 0, -150); ctx.fillText('KEUANGAN', 0, -78); ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(29,30,24,.18)'; ctx.beginPath(); for (let i = 0; i < 8; i++) ctx.rect(-190, -20 + i * 34, 380 - (i % 3) * 70, 12); ctx.fill();
      }, { rot: 3, rise: 80 });
      slab(ctx, 'DIBUKA KE PUBLIK', -856, 190, t, A.publik - .05, { size: 26 });
      slab(ctx, 'MAU JUAL SAHAM DI BURSA', -856, 260, t, A.saham - .05, { size: 26 });
    } },
    { at: A.dokumen - .1, via: 'push',                        // S9 · the chart: 16,3 vs 80,7, a slow push to the loss bar, then the crack
      mod(p, t) { const k = E.inOutCubic(inv(A.n807, A.lima + .4, t)) * (1 - E.inOutCubic(inv(A.tunggu, A.ternyata - .1, t)));
        p.dist -= 300 * k; p.tx += 80 * k; p.ty -= 70 * k; p.foc = p.dist; const s = t - A.n807; if (s > 0 && s < .6) p.ty += 14 * Math.exp(-s / .12) * Math.sin(s * 80); },
      draw(ctx, t) {
      typeOn(ctx, 'ANTHROPIC · SEMESTER I 2026 · MILIAR US$', -860, -455, t, A.enam - .2, MN(22), { ls: 4, cps: 34, col: ivo(.7) });
      ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-700, CYB); ctx.lineTo(560, CYB); ctx.stroke();
      const hP = 16.3 * CPX * E.outQuint(inv(A.pemasukan, A.n163 + .2, t));
      if (hP > 0) { ctx.fillStyle = ivo(.6); ctx.fillRect(XP - CBW / 2, CYB - hP, CBW, hP); }
      txt(ctx, 'PEMASUKAN', XP, CYB + 50, t, A.pemasukan, MN(22), { ls: 4, align: 'center', col: ivo(.75) });
      fall(ctx, '16,3', XP, CYB - 16.3 * CPX - 26, t, A.n163 - .05, DSP(100), { align: 'center' });
      const g = E.inOutCubic(inv(A.rugi, A.n807, t)), ov = t > A.n807 ? 1 + .04 * Math.exp(-(t - A.n807) / .2) * Math.sin((t - A.n807) * 30) : g, hR = 80.7 * CPX * (t > A.n807 ? ov : g);
      const kc = kq(t, A.ternyata, .3), kp = E.inOutCubic(inv(A.n724, A.cuma + .2, t)), lift = 16 * E.outCubic(inv(A.ternyata, A.n724 + .4, t));
      if (hR > 0) {
        if (kc <= 0) { ctx.fillStyle = IVORY; ctx.fillRect(XR - CBW / 2, CYB - hR, CBW, hR); }
        else {                                                // cracked: the bottom stays cash, the top lifts off and turns to paper
          ctx.fillStyle = IVORY; ctx.fillRect(XR - CBW / 2, YC, CBW, CYB - YC);
          ctx.save(); ctx.translate(XR - CBW / 2, YC - lift); ctx.rotate(-1.6 * D2R * E.outCubic(inv(A.ternyata, A.n724 + .4, t)));
          const hU = YC - (CYB - hR); ctx.fillStyle = kp > 0 ? `rgb(${lerp(241, 163, kp)},${lerp(239, 161, kp)},${lerp(230, 151, kp)})` : IVORY; ctx.fillRect(0, -hU, CBW, hU);
          if (kp > 0) { ctx.strokeStyle = `rgba(29,30,24,${.22 * kp})`; ctx.lineWidth = 2; ctx.beginPath(); for (let y = -24; y > -hU; y -= 26) { ctx.moveTo(10, y); ctx.lineTo(CBW - 10, y); } ctx.stroke();
            ctx.strokeStyle = `rgba(29,30,24,${.3 * kp})`; ctx.beginPath(); ctx.moveTo(34, -6); ctx.lineTo(34, -hU + 6); ctx.stroke(); }
          ctx.restore();
          ctx.strokeStyle = '#0B0C09'; ctx.lineWidth = 5; ctx.lineJoin = 'miter'; ctx.beginPath();     // the crack line, drawn left → right
          for (let i = 0; i <= 12; i++) { const u = i / 12; if (u > kc) break; const x = XR - CBW / 2 - 8 + (CBW + 16) * u, y = YC - lift * .5 + (i % 2 ? -9 : 7) * (1 - Math.abs(u - .5));
            i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        }
      }
      txt(ctx, 'RUGI BERSIH', XR, CYB + 50, t, A.rugi, MN(22), { ls: 4, align: 'center' });
      fall(ctx, '80,7', XR, CYB - 80.7 * CPX - 30 - lift, t, A.n807 - .03, DSP(140), { align: 'center' });
      slab(ctx, '≈ 5× PEMASUKAN', XR + CBW / 2 + 40, CYB - 80.7 * CPX + 40, t, A.lima - .05, { size: 26, lx: XR + CBW / 2 + 6, ly: CYB - 80.7 * CPX + 40 });
      ctx.save(); ctx.globalAlpha *= gone(t, A.tunggu - .1);
      markLine(ctx, 'bukti gelembung paling ', 'TELAK', ', kan?', 0, -380, t, A.kedengarannya - .1, A.telak, SRF(56)); ctx.restore();
      ctx.save(); ctx.globalAlpha *= gone(t, A.ternyata - .2);
      txt(ctx, 'Tapi tunggu dulu.', 0, -380, t, A.tunggu, SRF(60), { align: 'center' }); ctx.restore();
      const xl = XR + CBW / 2 + 40;
      fall(ctx, '72,4', xl, YC - 250, t, A.n724 - .02, DSP(120));
      slab(ctx, 'POS AKUNTANSI · DI ATAS KERTAS', xl + 4, YC - 190, t, A.cuma, { size: 24 });
      typeOn(ctx, 'NILAI SURAT UTANG YANG', xl + 4, YC - 120, t, A.surat - .1, MN(20), { ls: 3, cps: 32, col: ivo(.75) });
      typeOn(ctx, 'NANTI BISA DITUKAR JADI SAHAM', xl + 4, YC - 88, t, A.ditukar - .2, MN(20), { ls: 3, cps: 32, col: ivo(.75) });
      stamp(ctx, 'BUKAN DUIT TUNAI', XP, -120, t, A.bukan, { size: 74, rot: -5 });
      srcTag(ctx, 'S-1 Anthropic via Fortune & NYT, 26 Okt 2026', -860, 470, t, A.n163);
    } },
    { at: A.rugi2 - .12, via: 'whip', draw(ctx, t) {          // S10 · operating loss "cuma" 693 juta: a sliver at true scale + a loupe
      const x = -560, sl = .693 * CPX;
      dash(ctx, x, CYB, CBW, 80.7 * CPX, kq(t, A.rugi2, .4));
      txt(ctx, 'RUGI BERSIH 80,7', x, CYB - 80.7 * CPX - 24, t, A.rugi2 + .1, MN(20), { ls: 3, align: 'center', col: ivo(.6) });
      ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 200, CYB); ctx.lineTo(x + 200, CYB); ctx.stroke();
      if (t > A.operasional) { ctx.fillStyle = IVORY; ctx.fillRect(x - CBW / 2, CYB - sl, CBW, sl); }
      const kl = pop(t, A.operasional + .25);
      if (kl > 0) { const lx = x + 150, ly = CYB - 170, R = 110 * Math.min(kl, 1.1);
        ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 40, CYB - 4); ctx.lineTo(lx - R * .7, ly + R * .7); ctx.stroke();
        ctx.save(); ctx.beginPath(); ctx.arc(lx, ly, R, 0, 7); ctx.fillStyle = '#14150F'; ctx.fill(); ctx.clip();
        ctx.fillStyle = IVORY; ctx.fillRect(lx - 160, ly + 20 - sl * 10, 320, sl * 10); ctx.strokeStyle = ivo(.35); ctx.beginPath(); ctx.moveTo(lx - 160, ly + 20); ctx.lineTo(lx + 160, ly + 20); ctx.stroke();
        ctx.restore(); ctx.strokeStyle = IVORY; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(lx, ly, R, 0, 7); ctx.stroke();
        txt(ctx, 'ZOOM ×10', lx, ly + R + 34, t, A.operasional + .4, MN(16), { ls: 4, align: 'center', col: ivo(.55) }); }
      typeOn(ctx, 'RUGI DARI JUALAN & OPERASIONAL', 30, -160, t, A.rugi2, MN(24), { ls: 4, cps: 34, col: ivo(.75) });
      markLine(ctx, '"cuma" ', 'US$693 JUTA', '', 30, -20, t, A.cuma2 - .3, A.n693, SRF(100), { align: 'left' });
      srcTag(ctx, 'S-1 Anthropic via Fortune & NYT, 26 Okt 2026', -860, 470, t, A.rugi2 + .3);
    } },
    { at: A.ya - .1, via: 'push', draw(ctx, t) {              // S11 · versi kantong mereka + Ahri's chart as the receipt
      evid(ctx, IM.chart, -400, -10, 960, t, A.ya - .05, { rot: -3, tab: 'GRAFIK · S-1 ANTHROPIC (DIOLAH)' });
      txt(ctx, '"cuma" versi kantong', 190, -90, t, A.ya, SRF(58));
      markLine(ctx, '', 'MEREKA', '', 190, 30, t, A.kantong - .1, A.mereka3, SRF(110), { align: 'left' });
      txt(ctx, 'bukan kantong kita.', 190, 150, t, A.bukan2 - .1, SRF(58));
      srcTag(ctx, 'Fortune & NYT, 26 Okt 2026 (diolah)', -860, 470, t, A.ya + .3);
    } },
    { at: A.pelajaran - .1, via: 'whip', draw(ctx, t) {       // S12 · angka serem ≠ cerita utuh
      ctx.save(); ctx.globalAlpha *= .07 * kq(t, A.pelajaran, .8); setFont(ctx, DSP(760), 6); ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.textAlign = 'center';
      ctx.strokeText('80,7', 40 * Math.sin(t * .4), 270); ctx.textAlign = 'left'; ctx.restore();
      txt(ctx, 'PELAJARANNYA SIMPEL:', 0, -280, t, A.pelajaran, MN(26), { ls: 8, align: 'center', col: ivo(.75) });
      markLine(ctx, 'angka yang kelihatannya ', 'SEREM', '', 0, -60, t, A.angka - .2, A.serem, SRF(92));
      txt(ctx, 'belum tentu itu cerita utuhnya.', 0, 80, t, A.cerita - .3, SRF(66), { align: 'center' });
    } },
    { at: A.begitu - .1, via: 'push', draw(ctx, t) {          // S13 · angka adem ≠ aman · BACA ANGKANYA SAMPAI HABIS
      txt(ctx, 'BEGITU JUGA SEBALIKNYA', 0, -330, t, A.begitu, MN(26), { ls: 8, align: 'center', col: ivo(.75) });
      markLine(ctx, 'angka yang kelihatannya ', 'ADEM', '', 0, -150, t, A.angka2 - .2, A.adem, SRF(92));
      txt(ctx, 'belum tentu beneran aman.', 0, -20, t, A.beneran - .3, SRF(66), { align: 'center' });
      fall(ctx, 'BACA ANGKANYA SAMPAI HABIS', 0, 250, t, A.aman - .05, DSP(130), { align: 'center' });
      const k = E.inOutCubic(inv(A.aman + .35, A.aman + 1.3, t)); if (k > 0) { ctx.fillStyle = IVORY; ctx.fillRect(-640, 285, 1280 * k, 6); }
    } },
    { at: A.sinyal - .1, via: 'rise', draw(ctx, t) {          // S14 · sinyal jujur: janji investasi yang mulai ciut (the plate shrinks)
      const sh = 1 - .2 * E.outCubic(inv(A.ciut, A.ciut + .5, t));
      plate(ctx, V.mon, t, 0, -40, 1560 * sh, 740 * sh, kq(t, A.sinyal, .6), { t0: A.sinyal, dim: .3 });
      txt(ctx, 'Sinyal yang lebih jujur:', -760, -400, t, A.sinyal, SRF(58));
      markLine(ctx, 'janji-janji investasi yang mulai ', 'CIUT', '', 0, 420, t, A.janji - .2, A.ciut, SRF(76));
    } },
    { at: A.september - .12, via: 'whip', draw(ctx, t) {      // S15 · NVIDIA → OpenAI, up to 100 miliar (NVIDIA full rides over the start)
      const ya = -80, k = kq(t, A.september, .5);
      [['NVIDIA', -520], ['OPENAI', 520]].forEach(([s, x], i) => txt(ctx, s, x, ya + 40, t, A.september + i * .4, DSP(130), { align: 'center' }));
      if (k > 0) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 3; ctx.setLineDash([14, 10]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(-330, ya); ctx.lineTo(lerp(-330, 320, k), ya); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = IVORY; ctx.beginPath(); ctx.moveTo(340, ya); ctx.lineTo(310, ya - 16); ctx.lineTo(310, ya + 16); ctx.fill(); }
      if (t > A.modal) for (let i = 0; i < 6; i++) { const u = ((t - A.modal) * .6 + i / 6) % 1; coin(ctx, lerp(-300, 290, u), ya - 18, 24, 6); }
      typeOn(ctx, 'RENCANA INVESTASI · SEPTEMBER 2025', 0, -300, t, A.ngumumin + 1.05, MN(24), { ls: 5, cps: 36, col: ivo(.75), align: 'center' });
      txt(ctx, 'SAMPAI', 0, 120, t, A.modal, MN(24), { ls: 8, align: 'center', col: ivo(.75) });
      fall(ctx, 'US$100 MILIAR', 0, 300, t, A.n100 - .05, DSP(190), { align: 'center' });
      srcTag(ctx, 'NVIDIA Newsroom, 22 Sep 2025', -860, 470, t, A.ngumumin + 1.2);
    } },
    { at: A.eh - .1, via: 'push', draw(ctx, t) {              // S16 · Maret 2026: 100 struck through in lime, 30 lands
      fall(ctx, 'MARET 2026', -860, -330, t, A.maret, DSP(120));
      typeOn(ctx, 'BOS NVIDIA: "KEMUNGKINAN BESAR NGGAK KEJADIAN"', -856, -250, t, A.bos, MN(24), { ls: 3, cps: 30, col: ivo(.8) });
      fall(ctx, '100', -360, 260, t, A.eh + .15, DSP(420), { align: 'center' });
      const ks = kq(t, A.kejadian, .25); if (ks > 0) { ctx.save(); ctx.translate(-360, 120); ctx.rotate(-7 * D2R); ctx.fillStyle = LIME; ctx.fillRect(-260, -18, 520 * ks, 36); ctx.restore(); }
      txt(ctx, '→', 40, 170, t, A.diganti, DSP(200), { align: 'center' });
      fall(ctx, '30', 420, 260, t, A.n30 - .05, DSP(420), { align: 'center' });
      txt(ctx, 'MILIAR US$', 30, 360, t, A.n30 + .2, MN(22), { ls: 6, align: 'center', col: ivo(.7) });
      srcTag(ctx, 'Yahoo Finance, 5 Mar 2026', -860, 470, t, A.bos + .3);
    } },
    { at: A.dari2 - .1, via: 'whip', draw(ctx, t) {           // S17 · 100 squares, a lime cut, 70 fall away · GeForce 256 photo
      const S = 44, G = 8, X0 = -820, Y0 = -300, cutY = Y0 + 7 * (S + G) - G / 2, kc = kq(t, A.dipotong, .22);
      ctx.fillStyle = IVORY; ctx.beginPath();
      for (let r = 7; r < 10; r++) for (let c = 0; c < 10; c++) if (t > A.seratus + (r * 10 + c) * .004) ctx.rect(X0 + c * (S + G), Y0 + r * (S + G), S, S);
      ctx.fill();
      for (let r = 0; r < 7; r++) for (let c = 0; c < 10; c++) {
        if (t <= A.seratus + (r * 10 + c) * .004) continue; const i = r * 10 + c, s = t - A.dipotong - .12 - c * .025 - (6 - r) * .01;
        let x = X0 + c * (S + G), y = Y0 + r * (S + G), rot = 0, a = 1;
        if (s > 0) { x += (rnd(i) - .5) * 260 * s; y += 900 * s * s + (rnd(i + 9) - .7) * 120 * s; rot = (rnd(i + 4) - .5) * 6 * s; a = clamp(1 - s / .9); }
        if (a <= 0) continue; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + S / 2, y + S / 2); ctx.rotate(rot); ctx.fillStyle = s > 0 ? ivo(.55) : IVORY; ctx.fillRect(-S / 2, -S / 2, S, S); ctx.restore();
      }
      if (kc > 0 && t < A.dipotong + .9) { ctx.save(); ctx.globalAlpha *= gone(t, A.dipotong + .5, .4); ctx.fillStyle = LIME; ctx.fillRect(X0 - 40, cutY - 4, (10 * (S + G) + 80) * kc, 8); ctx.restore(); }
      if (t > A.seratus) slot(ctx, countTo(100, 30, t, A.dipotong + .1, .7), -230, 130, DSP(220), { align: 'left' });
      txt(ctx, 'MILIAR US$', -226, 190, t, A.seratus + .2, MN(22), { ls: 6, col: ivo(.7) });
      txt(ctx, 'JANJI → JADINYA', X0, Y0 + 10 * (S + G) + 50, t, A.seratus + .3, MN(22), { ls: 5, col: ivo(.7) });
      plate(ctx, still(IM.gf), t, 500, -60, 720, 428, kq(t, A.dari2, .6), { t0: A.dari2, grade: 'saturate(.55) contrast(1.08) brightness(.92)', dim: .08, vig: .35 });
      srcTag(ctx, 'Foto: GeForce 256 (1999), Wikimedia Commons, domain publik', 90, 230, t, A.dari2 + .4);
    } },
    { at: A.kalau3 - .1, via: 'push', draw(ctx, t) {          // S18 · disunat → a receipt prints the recount
      markLine(ctx, 'janji segede itu aja mulai ', 'DISUNAT', '', 0, -400, t, A.janji2 - .2, A.disunat, SRF(70));
      const L = [['JANJI AWAL', '100'], ['JADINYA', '30'], null, ['SELISIH', '−70'], ['HITUNG ULANG', '']], dt = .5;
      const n = L.filter((_, i) => t > A.berarti + i * dt).length, hP = 120 + 62 * n, y0 = -300, w = 560;
      if (t > A.berarti - .3) {
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = '#F4F1E6';
        ctx.beginPath(); ctx.moveTo(-w / 2, y0); ctx.lineTo(w / 2, y0); ctx.lineTo(w / 2, y0 + hP);
        for (let i = 0; i <= 28; i++) ctx.lineTo(w / 2 - i * w / 28, y0 + hP + (i % 2 ? 10 : 0)); ctx.closePath(); ctx.fill(); ctx.restore();
        setFont(ctx, MN(18), 4); ctx.fillStyle = 'rgba(29,30,24,.6)'; ctx.textAlign = 'center'; ctx.fillText('MILIAR US$ · DIHITUNG', 0, y0 + 50); ctx.textAlign = 'left';
        L.forEach((ln, i) => { if (t <= A.berarti + i * dt) return; const y = y0 + 120 + i * 62;
          if (!ln) { ctx.strokeStyle = 'rgba(29,30,24,.4)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-w / 2 + 40, y - 12); ctx.lineTo(w / 2 - 40, y - 12); ctx.stroke(); ctx.setLineDash([]); return; }
          setFont(ctx, MN(28), 2); ctx.fillStyle = INK; ctx.fillText(ln[0], -w / 2 + 40, y); ctx.textAlign = 'right'; ctx.fillText(ln[1], w / 2 - 40, y); ctx.textAlign = 'left';
          if (i === 4 && Math.floor(t * 2.5) % 2) { const tw = ctx.measureText(ln[0]).width; ctx.fillRect(-w / 2 + 52 + tw, y - 24, 16, 28); } });
      }
      txt(ctx, 'di dalam sana ada yang lagi', -880, 230, t, A.berarti, SRF(48));
      fall(ctx, 'ITUNG-ITUNGAN ULANG', -880, 340, t, A.itung - .05, DSP(110));
    } },
    { at: A.bahkan - .12, via: 'whip', draw(ctx, t) {         // S19 · IMF: one of the three biggest threats (IMF full rides over the start)
      txt(ctx, 'IMF · OKTOBER 2026', 0, -400, t, A.oktober, MN(26), { ls: 8, align: 'center', col: ivo(.75) });
      typeOn(ctx, 'POTENSI ANJLOKNYA HARGA ASET AI', 0, -330, t, A.anjlok + .15, MN(28), { ls: 4, cps: 34, align: 'center' });
      txt(ctx, 'masuk daftar tiga besar ancaman buat keuangan dunia', 0, 380, t, A.daftar, SRF(50), { align: 'center' });
      [-470, 0, 470].forEach((x, i) => {
        const t0 = A.tigab - .1 + i * .12; if (t <= t0) return; const s = t - t0, y = 30 + (1 - spring(s, .6, .3)) * 400, cw = 360, chh = 460;
        const fl = i === 1 ? E.inOutCubic(inv(A.ancaman, A.ancaman + .5, t)) : 0, sx = Math.abs(Math.cos(Math.PI * fl)), face = fl > .5;
        ctx.save(); ctx.globalAlpha *= clamp(s / .1); ctx.translate(x, y); ctx.scale(Math.max(.02, sx), 1);
        ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = face ? LIME : '#191A15'; ctx.fillRect(-cw / 2, -chh / 2, cw, chh);
        ctx.shadowColor = 'transparent'; ctx.strokeStyle = face ? LIME_INK : ivo(.35); ctx.lineWidth = 2; ctx.strokeRect(-cw / 2 + 14, -chh / 2 + 14, cw - 28, chh - 28);
        ctx.textAlign = 'center';
        if (face) { setFont(ctx, MN(18), 4); ctx.fillStyle = LIME_INK; ctx.fillText('POTENSI', 0, -140); setFont(ctx, DSP(84), 2); ['HARGA', 'ASET AI', 'ANJLOK'].forEach((w, j) => ctx.fillText(w, 0, -40 + j * 86)); }
        else { setFont(ctx, DSP(150), 2); ctx.fillStyle = ivo(.25); ctx.fillText('?', 0, 50); }
        ctx.textAlign = 'left'; ctx.restore();
      });
      srcTag(ctx, 'IMF GFSR, 13 Okt 2026', -860, 470, t, A.anjlok + .3);
    } },
    { at: A.tanda - .1, via: 'rise', draw(ctx, t) {           // S20 · the checklist: every sign of this chapter, ticked
      fall(ctx, 'TANDA-TANDANYA', -860, -150, t, A.tanda - .05, DSP(150));
      stamp(ctx, 'LENGKAP', -600, 20, t, A.lengkap, { size: 110 });
      ['BELANJA ≥ US$500 MILIAR SETAHUN', 'RUGI BERSIH US$80,7 MILIAR', 'JANJI US$100 → 30 MILIAR', 'IMF: MASUK 3 ANCAMAN BESAR'].forEach((s, i) => {
        const t0 = A.tanda + .1 + i * .2, y = -210 + i * 110; if (t <= t0) return; const k = kq(t, t0, .3);
        ctx.globalAlpha = k; ctx.strokeStyle = IVORY; ctx.lineWidth = 3; ctx.strokeRect(40, y - 30, 40, 40);
        const kt = kq(t, t0 + .15, .25); if (kt > 0) { ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(48, y - 10); ctx.lineTo(58, y + 2); if (kt > .4) ctx.lineTo(lerp(58, 78, (kt - .4) / .6), lerp(2, -26, (kt - .4) / .6)); ctx.stroke(); }
        setFont(ctx, MN(28), 3); ctx.fillStyle = IVORY; ctx.fillText(s, 110, y); ctx.globalAlpha = 1;
      });
    } },
    { at: A.sekarang - .1, via: 'push', draw(ctx, t) {        // S21 · the question (the screen cracks in over())
      txt(ctx, 'Sekarang tinggal satu pertanyaan:', 0, -200, t, A.sekarang, SRF(56), { align: 'center' });
      markLine(ctx, 'kapan ', 'RETAK', ' pertamanya', 0, 0, t, A.kapan - .3, A.retak, SRF(120));
      txt(ctx, 'mulai kelihatan?', 0, 140, t, A.kelihatan - .2, SRF(80), { align: 'center' });
    } },
  ];

  // ── the screen cracks on "retak": screen-space fracture, refraction shards, chips (new technique) ─────────
  const TC = A.retak + .02; let CR, SNAP;
  function crackGeo() {
    const P = [W * .5, H * .5 + 6], rays = [], br = [], rings = [], NR = 13;
    for (let i = 0; i < NR; i++) {
      let a = i / NR * 2 * Math.PI + (rnd(i + 300) - .5) * .35, x = P[0], y = P[1], len = 0; const pts = [[x, y, 0]], L = 1300 + rnd(i + 310) * 700;
      for (let j = 0; len < L; j++) { const st = 40 + rnd(i * 31 + j) * 70; a += (rnd(i * 17 + j * 3.3) - .5) * .32; x += Math.cos(a) * st; y += Math.sin(a) * st; len += st; pts.push([x, y, len]); }
      rays.push({ pts, L, d: rnd(i + 330) * .07 });
    }
    rays.forEach((r, i) => { for (let b = 0; b < 2; b++) {
      const j = 2 + Math.floor(rnd(i * 7 + b) * (r.pts.length - 4)), p = r.pts[j];
      let a = Math.atan2(p[1] - P[1], p[0] - P[0]) + (rnd(i * 9 + b) < .5 ? -1 : 1) * (.5 + rnd(i + b * 5) * .5), x = p[0], y = p[1], len = 0; const pts = [[x, y, 0]], L = 120 + rnd(i * 5 + b) * 260;
      for (let k = 0; len < L; k++) { const st = 26 + rnd(k + i * 13 + b) * 40; a += (rnd(k * .7 + i * 3 + b) - .5) * .5; x += Math.cos(a) * st; y += Math.sin(a) * st; len += st; pts.push([x, y, len]); }
      br.push({ ray: i, at: p[2], pts, L }); } });
    const nearR = (r, R) => r.pts.find(p => Math.hypot(p[0] - P[0], p[1] - P[1]) >= R) || r.pts[r.pts.length - 1];
    [48, 120, 250].forEach((R, q) => rays.forEach((r, i) => { if (rnd(i * 11 + q) > .72) return; const a = nearR(r, R), b = nearR(rays[(i + 1) % NR], R);
      const m = [(a[0] + b[0]) / 2 + (rnd(i + q * 7) - .5) * 18, (a[1] + b[1]) / 2 + (rnd(i * 2 + q) - .5) * 18]; rings.push({ R, pts: [a, m, b] }); }));
    return { P, rays, br, rings };
  }
  const part = (ctx, pts, vis) => { ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) { const p = pts[i], q = pts[i - 1];
    if (p[2] <= vis) { ctx.lineTo(p[0], p[1]); continue; } const u = (vis - q[2]) / (p[2] - q[2]); ctx.lineTo(lerp(q[0], p[0], u), lerp(q[1], p[1], u)); break; } };
  function over(o, t) {
    const s = t - TC; if (s <= 0) return; CR ??= crackGeo(); const { P, rays, br, rings } = CR;
    const vis = r => r.L * E.outExpo(clamp((s - r.d) / .42));
    const m = 5 * E.outCubic(clamp(s / .5));                  // refraction: each wedge between two rays shifts a few px
    if (!SNAP) SNAP = mk(o.canvas.width, o.canvas.height); const [sc, sx] = SNAP; sx.globalCompositeOperation = 'copy'; sx.drawImage(o.canvas, 0, 0);
    o.save(); o.setTransform(1, 0, 0, 1, 0, 0); const kx = o.canvas.width / W;
    rays.forEach((r, i) => { const r2 = rays[(i + 1) % rays.length], a = Math.atan2(r.pts[3][1] + r2.pts[3][1] - 2 * P[1], r.pts[3][0] + r2.pts[3][0] - 2 * P[0]), mm = m * (.4 + rnd(i + 70));
      o.save(); o.beginPath(); o.moveTo(P[0] * kx, P[1] * kx); r.pts.forEach(p => o.lineTo(p[0] * kx, p[1] * kx)); [...r2.pts].reverse().forEach(p => o.lineTo(p[0] * kx, p[1] * kx)); o.closePath(); o.clip();
      o.drawImage(sc, Math.cos(a) * mm * kx, Math.sin(a) * mm * kx); o.fillStyle = rnd(i + 90) < .5 ? `rgba(255,255,255,${.035 * m / 5})` : `rgba(0,0,0,${.06 * m / 5})`; o.fillRect(0, 0, o.canvas.width, o.canvas.height); o.restore(); });
    o.scale(kx, kx); o.lineJoin = 'round'; o.lineCap = 'round';
    const stroke = (fn, wd, col) => { o.strokeStyle = col; o.lineWidth = wd; o.beginPath(); fn(); o.stroke(); };
    const lines = () => { rays.forEach(r => part(o, r.pts, vis(r)));
      br.forEach(b => { const v = vis(rays[b.ray]) - b.at; if (v > 0) part(o, b.pts, v * .8); });
      rings.forEach(g => { if (s > .05 + g.R / 2400) { o.moveTo(g.pts[0][0], g.pts[0][1]); o.lineTo(g.pts[1][0], g.pts[1][1]); o.lineTo(g.pts[2][0], g.pts[2][1]); } }); };
    stroke(lines, 3.2, 'rgba(0,0,0,.55)');
    o.translate(-1, -1); stroke(lines, 1.2, 'rgba(241,239,230,.78)'); o.translate(1, 1);
    const gl = o.createRadialGradient(P[0], P[1], 0, P[0], P[1], 70); gl.addColorStop(0, 'rgba(241,239,230,.32)'); gl.addColorStop(1, 'rgba(241,239,230,0)');
    o.fillStyle = gl; o.fillRect(P[0] - 70, P[1] - 70, 140, 140);                // the frosted impact core stays
    const fl = Math.exp(-s / .07); if (fl > .02) { const g2 = o.createRadialGradient(P[0], P[1], 0, P[0], P[1], 240); g2.addColorStop(0, `rgba(255,255,255,${.85 * fl})`); g2.addColorStop(1, 'rgba(255,255,255,0)');
      o.fillStyle = g2; o.fillRect(P[0] - 240, P[1] - 240, 480, 480); }
    if (s < .9) for (let i = 0; i < 26; i++) {                   // glass chips thrown off the impact
      const a = rnd(i + 500) * 2 * Math.PI, v = 300 + rnd(i + 510) * 700, x = P[0] + Math.cos(a) * v * s, y = P[1] + Math.sin(a) * v * s + 900 * s * s, z = 3 + rnd(i + 520) * 7;
      o.save(); o.globalAlpha = clamp(1 - s / .9); o.translate(x, y); o.rotate(s * 12 + i); o.fillStyle = IVORY; o.beginPath(); o.moveTo(-z, -z * .4); o.lineTo(z, -z * .7); o.lineTo(z * .2, z); o.closePath(); o.fill(); o.restore(); }
    o.restore();
  }

  let FULLS;
  return makeChapter({ B, ST, load, label: 'BAB 2 · KENAPA AI DICURIGAI MENGGELEMBUNG', over, full: () => FULLS ??= [
    { im: IM.cnbc, t0: A.dolar + .05, t1: A.kurs + .05, dir: 1, tab: 'cnbc.com · 29 Okt 2026', crop: [0, 0, 1, .86],
      hl: [[.455, .314, .33, .14, A.dolar + .6], [.03, .465, .235, .14, A.dolar + 1.0]] },
    { im: IM.dw, t0: A.contoh - .05, t1: A.mereka2 + .2, dir: -1, dark: true, tab: 'dw.com · 13 Nov 2026',
      hl: [[.21, .17, .31, .13, A.rame + .3], [.594, .17, .235, .13, A.anthropic + .1], [.118, .295, .115, .12, A.anthropic + .5]] },
    { im: IM.nv, t0: A.september - .05, t1: A.ngumumin + 1.0, dir: 1, tab: 'nvidianews.nvidia.com · 22 Sep 2025', crop: [0, 0, 1, .6],
      hl: [[.03, .81, .19, .11, A.september + .5], [.033, .283, .345, .18, A.nvidia + .1]] },
    { im: IM.imf, t0: A.bahkan - .05, t1: A.anjlok + .1, dir: -1, dark: true, tab: 'imf.org · GFSR Okt 2026',
      hl: [[.045, .15, .445, .2, A.imf + .05]] },
  ] });
}
