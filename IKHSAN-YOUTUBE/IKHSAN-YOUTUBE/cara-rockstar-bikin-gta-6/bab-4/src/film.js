// Bab 4 · Mesin Streamer, GTA Roleplay & rekor dunia Windah Basudara (VO 07, 180 s). One depth row over full-bleed latar.
//  S0 judul + "tanpa PS5 pun ikut DEMAM" · S1 GTA V 235 juta · S2 live-stream UI sim · S3 roleplay = sandiwara, 3 kartu peran
//  S4 GameSpot (full) → Rockstar ⟶ Cfx.re, FiveM/RedM · S5 Streams Charts (full) → menara 7,91 juta (Twitch/YouTube/Kick)
//  S6 rekor Valorant & LoL tumbang, +111 % · S7 INDONESIA geleng-geleng · S8 Kompas (full) → #1 dunia, bukan Amerika/Eropa
//  S9 foto Windah (CC0) · ★ Foto Jadi Ruang "392.505" + Aksa sekali (lompat bangga) · S10 papan Top 4 dunia · S11 VOD 13 jam, 8 juta
//  S12 sampai ke DOMPET · S13 Carisinyal (full) → harga PS Store naik ±11 % · S14 bonus hilang, US$79,99 · S15 boks fisik = kupon unduh
//  S16 pipa 212 GB → DE-CIX pecah rekor · S17 33,03 Tbit/s, Frankfurt 13 unduhan/detik · S18 Singapura 627 Gbit/s → portal PUNCAK
import B from './beats.js';
import { W, H, clamp, inv, lerp, E, IVORY, LIME, LIME_INK, ivo, setFont, DSP, SRF, MN, timing, makeChapter, loadImg, loadVid,
  srcTag, txt, fall, typeOn, markLine, slab, countTo, fmt, gone, plate, still, mk } from './kit.js';
import { latar, aksaShow, ruang, GRADE_DOC } from './s3.js';
import { pop, stamp, slot } from './draw.js';
import { strike } from './pustaka/dasar.js';

const ROOM = '#0B0C09', DARK = '#11120E';
function cover(g, im, x, y, w, h, z = 1, ox = 0, oy = 0) { const s = Math.max(w / im.width, h / im.height) * z; g.drawImage(im, x + w / 2 - im.width * s / 2 + ox, y + h / 2 - im.height * s / 2 + oy, im.width * s, im.height * s); }
const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
const wOf = (c, css, s, ls = 0) => { setFont(c, css, ls); return c.measureText(s).width; };
const D2R = Math.PI / 180;
const clip = (V, a, b) => ({ ...V, n: b - a, img: V.img.slice(a, b) });   // trailer clips: skip the baked-in title card / the next shot

export function makeFilm() {
  const { T: A, DUR } = timing(B);
  const IM = {}, V = {}, SV = {}, SH = '../assets/shared/';
  async function load() {
    const R = SH + 'rockstar-resmi/gtavi-', K = SH + 'kutipan/';
    const st = ['01-vice-city-sign', '02-vice-city-skyline-day', '03-vice-city-waterfront-physics', '04-vice-city-neon-raytracing', '05-vice-city-muscle-car-boulevard',
      '06-vice-city-night-cityscape', '07-leonida-keys-aerial-ocean', '08-grassrivers-police-chase-wetlands', '09-mount-kalaga-mud-physics', '10-jason-and-lucia-portrait'];
    const ims = await Promise.all(st.map(n => loadImg(R + n + '.jpg', 1920)));
    ims.forEach((im, i) => { IM['s' + String(i + 1).padStart(2, '0')] = im; SV['s' + String(i + 1).padStart(2, '0')] = still(im); });
    [IM.gs, IM.sc, IM.kp, IM.cs, IM.win, IM.winc] = await Promise.all([
      loadImg(K + 'gamespot-rockstar-acquires-gta-role-playing.png', 2736), loadImg(K + 'streamscharts-gta-vi-breaks-streaming-launch-records.png', 2248),
      loadImg(K + 'tekno-windah-basudara-jadi-streamer-gta-6.png', 2736), loadImg(K + 'carisinyal-harga-gta-6-di-ps-store-indonesia-naik.png', 1592),
      loadImg(SH + 'cc/commons-windah-basudara-di-tahun-2022.jpg', 490), loadImg(SH + 'cc/commons-windah-basudara-di-tahun-2022-tanpa-latar-birefnet-portrait.png', 490)]);
    SV.win = still(IM.win);
    const clips = ['kotamalam', 'nyetir', 'lorong', 'interogasi', 'laut', 'senja', 'garasi', 'mobil2', 'flamingo', 'menara', 'kapal'];
    (await Promise.all(clips.map(n => loadVid(SH + 'vid/', n)))).forEach((v, i) => { V[clips[i]] = v; });
    // Foto Jadi Ruang plates (1920×1080): the 490 px CC0 photo at full height on the right, a blurred twin fills the left;
    // the cut-out sits at the identical placement so ruang() can slide the giant number between them
    const PX = 804, PS = 1080, [bc, bg] = mk(W, H), [pc, pg] = mk(PS, PS), [cc, cg] = mk(W, H);
    bg.filter = 'blur(22px) brightness(.62) saturate(.8)'; cover(bg, IM.win, 0, 0, W, H, 1.15); bg.filter = 'none';
    pg.imageSmoothingQuality = 'high'; pg.drawImage(IM.win, 0, 0, PS, PS); pg.globalCompositeOperation = 'destination-in';
    const fe = pg.createLinearGradient(0, 0, PS, 0); fe.addColorStop(0, 'rgba(0,0,0,0)'); fe.addColorStop(.16, '#000'); fe.addColorStop(.9, '#000'); fe.addColorStop(1, 'rgba(0,0,0,0)');
    pg.fillStyle = fe; pg.fillRect(0, 0, PS, PS); bg.drawImage(pc, PX, 0);
    cg.imageSmoothingQuality = 'high'; cg.drawImage(IM.winc, PX, 0, PS, PS);
    IM.wbg = bc; IM.wcut = cc;
    await aksa.load(); await aksa2.load();
  }

  // ── S0 · judul + "tanpa PS5 pun ikut DEMAM GTA 6" ────────────────────────────────────────────────────────────
  function S0(ctx, t) {
    const a0 = ctx.globalAlpha, g = gone(t, A.ps5 - .4, .3);
    if (g > 0) { ctx.globalAlpha = a0 * g;
      txt(ctx, 'BAB 4', 0, -170, t, .25, MN(30), { align: 'center', ls: 12, col: ivo(.8) });
      fall(ctx, 'MESIN STREAMER', 0, 50, t, .4, DSP(240), { align: 'center' });
      txt(ctx, 'GTA Roleplay & rekor dunia dari tanah air', 0, 165, t, 1.1, SRF(62), { align: 'center' }); ctx.globalAlpha = a0; }
    fall(ctx, 'TANPA KONSOL PS5 PUN', 0, -30, t, A.ps5 - .15, DSP(160), { align: 'center' });
    markLine(ctx, 'IKUT ', 'DEMAM', ' GTA 6', 0, 175, t, A.demam - .45, A.demam, DSP(170));
  }

  // ── S1 · GTA V hampir 235 juta unit, PS3 → PS4 → PS5 ─────────────────────────────────────────────────────────
  function S1(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'SERI PENDAHULUNYA · GTA V · TERJUAL HAMPIR', -860, -250, t, A.bayang + .25, MN(28), { ls: 6, col: ivo(.88), cps: 44 });
    const t0 = A.j235 - 1.05, k = E.outQuint(inv(t0, t0 + .45, t));
    if (k > 0) { const n = Math.round(countTo(0, 235, t, t0 + .05, 1.0)), nw = wOf(ctx, DSP(360), '235', 2);
      ctx.fillStyle = IVORY; ctx.textAlign = 'left'; ctx.globalAlpha = a0 * k; ctx.fillText(String(n), -870, 90 + (1 - k) * 60);
      const pu = t > A.j235 ? Math.exp(-(t - A.j235) / .14) : 0; if (pu > .01) { ctx.globalAlpha = a0 * pu * .45; ctx.fillStyle = LIME; ctx.fillText(String(n), -870, 90); }
      ctx.globalAlpha = a0; txt(ctx, 'JUTA UNIT', -870 + nw + 40, 90, t, A.j235 - .15, DSP(130)); }
    txt(ctx, '≈ 480 juta untuk seluruh seri GTA', -860, 205, t, A.unit, SRF(58));
    const PSN = ['PS3', 'PS4', 'PS5'];
    for (let i = 0; i < 3; i++) { const tj = A.ps3 - .05 + i * .22, kc = E.outQuint(inv(tj, tj + .35, t)); if (kc <= 0) continue;
      const x = -860 + i * 270, y = 300, on = i === 2 && t > A.sekarang;
      ctx.globalAlpha = a0 * kc;
      if (i) { ctx.strokeStyle = ivo(.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 60, y + 35); ctx.lineTo(x - 60 + 50 * kc, y + 35); ctx.stroke(); }
      rr(ctx, x, y + (1 - kc) * 30, 200, 70, 10); if (on) { ctx.fillStyle = IVORY; ctx.fill(); } else { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 2.5; ctx.stroke(); }
      setFont(ctx, MN(30), 4); ctx.textAlign = 'center'; ctx.fillStyle = on ? DARK : IVORY; ctx.fillText(PSN[i], x + 100, y + 46 + (1 - kc) * 30); ctx.textAlign = 'left'; }
    ctx.globalAlpha = a0; srcTag(ctx, 'Sumber: Take-Two Interactive, Nov 2026', -860, 440, t, A.unit + .5);
  }

  // ── S2 · kreator siaran langsung: player + chat yang mengalir ────────────────────────────────────────────────
  const CHAT = [['pemirsa_17', 'polisinya dateng wkwk'], ['warga_rp', 'gas kejar bang!'], ['tim_begadang', 'RP-nya niat banget'], ['akun_baru', 'warga baru nih'],
    ['anak_kota', 'mantap jiwa'], ['nonton_aja', 'kok bisa seru gini'], ['pemirsa_88', 'GG'], ['si_penonton', 'lanjut sampai pagi'], ['warga_rp', 'pedagangnya lucu'], ['tim_begadang', 'jangan kabur bang']];
  function S2(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'SALAH SATU BENSIN UTAMANYA', -860, -425, t, A.salah + .2, MN(26), { ls: 6, col: ivo(.85), cps: 44 });
    fall(ctx, 'KREATOR SIARAN LANGSUNG', -860, -300, t, A.kreator - .35, DSP(112));
    const kp = E.outQuint(inv(A.salah, A.salah + .6, t)); if (kp <= 0) return;
    plate(ctx, V.nyetir, t, -330, 40, 1060, 560, kp, { t0: A.salah, grade: GRADE_DOC, vig: .45, grain: .14, marks: false });
    const ku = clamp((kp - .8) * 5); ctx.globalAlpha = a0 * ku;
    const gr = ctx.createLinearGradient(0, 200, 0, 320); gr.addColorStop(0, 'rgba(11,12,9,0)'); gr.addColorStop(1, 'rgba(11,12,9,.75)'); ctx.fillStyle = gr; ctx.fillRect(-860, 200, 1060, 120);
    rr(ctx, -836, -220, 108, 40, 8); ctx.fillStyle = IVORY; ctx.fill(); ctx.fillStyle = DARK; ctx.globalAlpha = a0 * ku * (.55 + .45 * Math.abs(Math.sin(t * 3.2)));
    ctx.beginPath(); ctx.arc(-814, -200, 7, 0, 7); ctx.fill(); ctx.globalAlpha = a0 * ku; setFont(ctx, MN(22), 3); ctx.fillText('LIVE', -798, -192);
    setFont(ctx, MN(22), 2); ctx.fillStyle = IVORY; ctx.fillText('GTA · ROLEPLAY KOTA · SIARAN LANGSUNG', -836, 280);
    ctx.fillStyle = ivo(.3); ctx.fillRect(-836, 300, 1010, 5); ctx.fillStyle = IVORY; ctx.fillRect(-836, 300, 1010 * (.62 + .02 * (t - A.salah)), 5);
    // chat panel
    ctx.globalAlpha = a0 * kp; rr(ctx, 240, -240, 620, 560, 14); ctx.fillStyle = 'rgba(11,12,9,.78)'; ctx.fill(); ctx.strokeStyle = ivo(.25); ctx.lineWidth = 2; ctx.stroke();
    setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.6); ctx.fillText('OBROLAN LANGSUNG', 270, -200); ctx.fillStyle = ivo(.18); ctx.fillRect(270, -185, 560, 2);
    ctx.save(); ctx.beginPath(); ctx.rect(240, -175, 620, 490); ctx.clip();
    let sm = 0; const T0 = A.salah + .7; for (let i = 0; i < CHAT.length; i++) sm += E.outCubic(inv(T0 + i * .55, T0 + i * .55 + .25, t));
    for (let i = 0; i < CHAT.length; i++) { const tj = T0 + i * .55; if (t < tj) break; const y = 285 - (sm - 1 - i) * 64;
      ctx.globalAlpha = a0 * kp * clamp((t - tj) / .2); setFont(ctx, MN(18, 400), 1); ctx.fillStyle = ivo(.55); ctx.fillText(CHAT[i][0], 270, y - 26);
      setFont(ctx, MN(23, 700), 0); ctx.fillStyle = IVORY; ctx.fillText(CHAT[i][1], 270, y); }
    ctx.restore(); ctx.globalAlpha = a0;
    slab(ctx, '+ KOMUNITAS GTA ROLEPLAY', -860, 400, t, A.komunitas, { lime: true, size: 30 });
  }

  // ── S3 · roleplay = sandiwara interaktif; warga · polisi · pedagang ────────────────────────────────────────────
  function S3(ctx, t) {
    const a0 = ctx.globalAlpha;
    markLine(ctx, '', 'SANDIWARA', ' INTERAKTIF', 0, -335, t, A.gampang + .25, A.sandiwara, DSP(140));
    const pre = 'bukan sekadar ', wd = 'kebut-kebutan', css = SRF(56), wa = wOf(ctx, css, pre), wb = wOf(ctx, css, wd), x0 = -(wa + wb) / 2;
    if (txt(ctx, pre + wd, x0, -225, t, A.kebut - .7, css) > 0) strike(ctx, x0 + wa, x0 + wa + wb, -225 + 20, 56, t, A.kebut + .45, IVORY);
    const R = [['WARGA', SV.s05, A.warga], ['POLISI', SV.s08, A.polisi], ['PEDAGANG', SV.s03, A.pedagang]];
    R.forEach(([nm, sv, tj], i) => { const k = pop(t, tj - .08, .5, .3); if (k <= 0) return;
      ctx.save(); ctx.translate(-570 + i * 570, 130 - (1 - Math.min(1, k)) * 50); ctx.rotate((i - 1) * 2.2 * D2R); ctx.scale(Math.max(.02, Math.min(k, 1.08)), 1); ctx.globalAlpha = a0 * clamp(k * 3);
      ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; ctx.fillStyle = '#14150F'; ctx.fillRect(-220, -270, 440, 540); ctx.shadowColor = 'transparent';
      plate(ctx, sv, t, 0, -45, 400, 370, 1, { t0: tj, grade: GRADE_DOC, vig: .35, grain: .15, marks: false });
      setFont(ctx, DSP(84), 3); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(nm, 0, 212);
      setFont(ctx, MN(18), 5); ctx.fillStyle = ivo(.6); ctx.fillText(`PERAN 0${i + 1}`, 0, 250); ctx.textAlign = 'left';
      ctx.strokeStyle = ivo(.28); ctx.lineWidth = 2; ctx.strokeRect(-220, -270, 440, 540); ctx.restore(); });
    ctx.globalAlpha = a0;
  }

  // ── S4 · Rockstar membeli Cfx.re (FiveM & RedM) ─────────────────────────────────────────────────────────────
  function S4(ctx, t) {
    const a0 = ctx.globalAlpha, tm = A.membeli, km = E.outQuint(inv(tm - .25, tm + .2, t)), gap = lerp(300, 46, km);
    typeOn(ctx, 'BUKANNYA MEMBLOKIR PEMBUAT MOD…', 0, -330, t, A.membeli - 1.1, MN(28), { align: 'center', ls: 6, col: ivo(.85), cps: 50 });
    const ka = E.outQuint(inv(A.membeli - .9, A.membeli - .4, t));
    if (ka > 0) { setFont(ctx, DSP(150), 4); ctx.globalAlpha = a0 * ka; ctx.fillStyle = IVORY;
      ctx.textAlign = 'right'; ctx.fillText('ROCKSTAR', -gap, -140); ctx.textAlign = 'left'; ctx.fillText('CFX.RE', gap, -140);
      ctx.fillStyle = ivo(.9 * km); ctx.fillRect(-gap + 14, -205, 2 * gap - 28 > 0 ? 2 * gap - 28 : 0, 6); ctx.globalAlpha = a0; }
    stamp(ctx, '11 AGU 2023', 0, -10, t, A.membeli + .3, { size: 84, rot: -3 });
    typeOn(ctx, 'MEREKALAH PENGEMBANG DI BALIK', 0, 120, t, A.mereka, MN(26), { align: 'center', ls: 6, col: ivo(.85), cps: 50 });
    slab(ctx, 'FIVEM', -40, 200, t, A.fivem - .05, { size: 44, align: 'right' });
    slab(ctx, 'REDM', 40, 200, t, A.redm - .05, { size: 44 });
    txt(ctx, 'jutaan tontonan roleplay tiap hari', 0, 330, t, A.jutaan - .1, SRF(70), { align: 'center' });
    srcTag(ctx, 'Sumber: GameSpot & RockstarINTEL, Agu 2023', -860, 440, t, A.membeli + .6);
  }

  // ── S5 · 7,91 juta penonton serentak: menara Twitch / YouTube / Kick (rebuild puncak-livestream-gta6) ────────
  function S5(ctx, t) {
    const a0 = ctx.globalAlpha, t0 = A.data - .1, k = E.outQuint(inv(t0, t0 + .5, t)); if (k <= 0) return;
    typeOn(ctx, 'DATA AWAL STREAMS CHARTS · PUNCAK SERENTAK', -860, -330, t, t0, MN(26), { ls: 6, col: ivo(.85), cps: 46 });
    const n = countTo(0, 7.91, t, A.j791 - 1.6, 1.6);
    setFont(ctx, DSP(330), 2); ctx.textAlign = 'left'; ctx.fillStyle = LIME; ctx.globalAlpha = a0 * k; ctx.fillText(fmt(n, 2), -870, 90 + (1 - k) * 60); ctx.globalAlpha = a0;
    txt(ctx, 'JUTA ORANG', -860, 195, t, A.j791 - .1, DSP(110));
    txt(ctx, 'menonton siaran langsung secara bersamaan', -860, 285, t, A.bersama - .5, SRF(54));
    const X0 = 380, BW = 240, BASE = 380, S = 96, fill = 7.91 * S * (n / 7.91);
    ctx.globalAlpha = a0 * k; ctx.strokeStyle = ivo(.35); ctx.lineWidth = 2; ctx.strokeRect(X0, BASE - 7.91 * S, BW, 7.91 * S);
    ctx.fillStyle = ivo(.2); ctx.fillRect(X0, BASE - fill, BW, fill);
    const sh = ((t - t0) * .45) % 1.4 - .2; if (fill > 10 && sh > 0 && sh < 1) { const yy = BASE - fill * sh, g = ctx.createLinearGradient(0, yy - 60, 0, yy + 60);
      g.addColorStop(0, ivo(0)); g.addColorStop(.5, ivo(.22)); g.addColorStop(1, ivo(0)); ctx.fillStyle = g; ctx.fillRect(X0, Math.max(BASE - fill, yy - 60), BW, 120); }
    let y = BASE;
    for (const [nm, v, tj] of [['TWITCH', 3.31, A.twitch], ['YOUTUBE', 3.22, A.youtube], ['KICK', 1.50, A.kick]]) {
      const h = v * S, lit = E.outCubic(inv(tj - .1, tj + .3, t)); y -= h;
      if (lit > 0) { ctx.globalAlpha = a0 * k; ctx.fillStyle = ivo(.82 * lit); ctx.fillRect(X0 + 4, y + 3, (BW - 8) * E.outQuint(lit), h - 6);
        ctx.globalAlpha = a0 * lit; setFont(ctx, MN(20), 4); ctx.fillStyle = ivo(.7); ctx.fillText(nm, X0 + BW + 26, y + h / 2 - 22);
        setFont(ctx, DSP(62), 1); ctx.fillStyle = IVORY; ctx.fillText(`${fmt(v, 2)} JT`, X0 + BW + 24, y + h / 2 + 40); }
    }
    ctx.globalAlpha = a0; srcTag(ctx, 'Sumber: Streams Charts & Variety, Nov 2026', -860, 440, t, A.j791 + .3);
  }

  // ── S6 · rekor Valorant & LoL tumbang; Twitch +111 % ───────────────────────────────────────────────────────
  function S6(ctx, t) {
    const a0 = ctx.globalAlpha, BASE = 300, S = 180;
    typeOn(ctx, 'PUNCAK PENONTON DI TWITCH', -860, -430, t, A.rekor + .2, MN(26), { ls: 6, col: ivo(.85), cps: 46 });
    const BARS = [['VALORANT', 'REKOR PELUNCURAN', 1.74, -620, A.valorant, A.tumbang], ['LEAGUE OF LEGENDS', 'REKOR SEPANJANG MASA', 3.11, -200, A.lol, A.tumbang + .14],
      ['GTA VI', 'TWITCH · NOV 2026', 3.31, 280, A.rekor + .3, null]];
    const hot = t < A.total + .2;
    for (const [nm, sub, v, x, tj, tf] of BARS) { const kg = E.outQuint(inv(tj - .05, tj + .6, t)); if (kg <= 0) continue;
      const bw = tf ? 200 : 250, h = v * S * kg, th = tf ? 88 * E.inCubic(inv(tf, tf + .42, t)) * D2R : 0, bo = tf && t > tf + .42 ? Math.exp(-(t - tf - .42) * 9) * Math.sin((t - tf - .42) * 40) * 6 : 0;
      const hh = Math.max(14, h * Math.cos(th)) + bo, ww = bw * (1 + .12 * Math.sin(th)), dim = tf ? 1 - .55 * inv(tf, tf + .5, t) : 1;
      ctx.globalAlpha = a0 * dim; ctx.fillStyle = !tf && hot ? LIME : ivo(.82); ctx.fillRect(x - ww / 2, BASE - hh, ww, hh);
      if (tf && th > .1) { ctx.fillStyle = ivo(.35); ctx.fillRect(x - ww / 2, BASE - hh - 10 * Math.sin(th), ww, 10 * Math.sin(th)); }
      setFont(ctx, DSP(68), 1); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(`${fmt(v * kg, 2)} JT`, x, BASE - hh - 22);
      setFont(ctx, MN(22), 3); ctx.fillText(nm, x, BASE + 46); setFont(ctx, MN(17, 400), 3); ctx.fillStyle = ivo(.65); ctx.fillText(sub, x, BASE + 76); ctx.textAlign = 'left';
      if (tf && t > tf) { const d = t - tf; ctx.globalAlpha = a0 * Math.max(0, 1 - d / .7) * .5; ctx.fillStyle = ivo(.6);           // dust puff where it lands
        for (let j = 0; j < 7; j++) { const r = 10 + j * 3 + d * 60; ctx.beginPath(); ctx.arc(x + (j - 3) * (ww / 6), BASE - 6 - d * 30 * (j % 3), r * .5, 0, 7); ctx.fill(); } } }
    ctx.globalAlpha = a0;
    ctx.fillStyle = ivo(.45); ctx.fillRect(-860, BASE, 1460, 3);
    const p = Math.round(countTo(0, 111, t, A.total + .3, A.p111 - A.total - .3));
    stamp(ctx, `+${p} %`, 690, -90, t, A.total + .3, { size: 120, rot: -4 });
    txt(ctx, 'TOTAL PENONTON TWITCH', 690, 50, t, A.total + .5, MN(22), { align: 'center', ls: 4 });
    txt(ctx, 'VS SEPEKAN SEBELUMNYA', 690, 86, t, A.minggu - .2, MN(22), { align: 'center', ls: 4, col: ivo(.7) });
    srcTag(ctx, 'Sumber: Streams Charts & Variety, Nov 2026', -860, 440, t, A.rekor + .8);
  }

  // ── S7 · INDONESIA, bangga sekaligus geleng-geleng ─────────────────────────────────────────────────────────
  function S7(ctx, t) {
    typeOn(ctx, 'BAGIAN YANG PALING BIKIN PENONTON', 0, -210, t, A.dan + .3, MN(28), { align: 'center', ls: 7, col: ivo(.85), cps: 44 });
    const d = t - A.geleng, sx = d > 0 ? Math.sin(d * 17) * 46 * Math.exp(-d * 1.6) : 0;
    ctx.save(); ctx.translate(sx, 0); ctx.rotate(sx * .0009); fall(ctx, 'INDONESIA', 0, 110, t, A.indo - .2, DSP(320), { align: 'center', ls: 6 }); ctx.restore();
    txt(ctx, 'bangga,', 0, 245, t, A.bangga - .05, SRF(68), { align: 'center' });
    txt(ctx, 'sekaligus geleng-geleng kepala', 0, 330, t, A.geleng - .25, SRF(68), { align: 'center' });
  }

  // ── S8 · #1 dunia bukan Amerika atau Eropa ─────────────────────────────────────────────────────────────────
  function S8(ctx, t) {
    const a0 = ctx.globalAlpha, t0 = A.amerika - .55, k = E.outQuint(inv(t0, t0 + .45, t)); if (k <= 0) return;
    setFont(ctx, DSP(210), 4); const w1 = ctx.measureText('#1 ').width, w2 = ctx.measureText('DUNIA').width, x0 = -(w1 + w2) / 2;
    ctx.globalAlpha = a0 * k; ctx.fillStyle = LIME; ctx.fillText('#1', x0, -40 + (1 - k) * 60); ctx.fillStyle = IVORY; ctx.fillText('DUNIA', x0 + w1, -40 + (1 - k) * 60); ctx.globalAlpha = a0;
    typeOn(ctx, 'BUKAN DIPEGANG STREAMER', 0, 80, t, t0 + .2, MN(28), { align: 'center', ls: 7, col: ivo(.85), cps: 50 });
    for (const [s, x, tj] of [['AMERIKA', -300, A.amerika], ['EROPA', 300, A.eropa]]) {
      const ww = wOf(ctx, DSP(150), s, 4); fall(ctx, s, x, 270, t, tj - .25, DSP(150), { align: 'center', ls: 4 });
      if (t > tj + .2) strike(ctx, x - ww / 2, x + ww / 2, 270 + 15, 150, t, tj + .2, IVORY); }
  }

  // ── S9 · foto Windah (CC0), kreator tanah air ──────────────────────────────────────────────────────────────
  function S9(ctx, t) {
    const a0 = ctx.globalAlpha, k = E.outQuint(inv(A.kursi - .1, A.kursi + .55, t)); if (k <= 0) return;
    ctx.save(); ctx.translate(-440, 0 + (1 - k) * 80); ctx.rotate((-2.5 + 1.5 * (1 - k)) * D2R); ctx.globalAlpha = a0 * k;
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; ctx.fillStyle = ROOM; ctx.fillRect(-310, -310, 620, 620); ctx.shadowColor = 'transparent';
    plate(ctx, SV.win, t, 0, 0, 600, 600, 1, { t0: A.kursi, grade: GRADE_DOC, vig: .35, grain: .16 }); ctx.restore(); ctx.globalAlpha = a0;
    typeOn(ctx, 'KURSI TERATAS DIREBUT', 0, -230, t, A.kursi + .3, MN(28), { ls: 7, col: ivo(.85), cps: 44 });
    txt(ctx, 'kreator tanah air', 0, -130, t, A.tanahair - .05, SRF(74));
    fall(ctx, 'WINDAH', -6, 90, t, A.windah - .1, DSP(230), { ls: 4 });
    fall(ctx, 'BASUDARA', -6, 300, t, A.windah + .2, DSP(230), { ls: 4 });
    srcTag(ctx, 'Foto: Secrett9 / Wikimedia Commons (CC0)', -860, 440, t, A.kursi + .6);
  }

  // ★ Foto Jadi Ruang: "392.505" between the room and Windah, lights-off wave on the number · Aksa jumps once, proud
  let room = null; const roomOf = () => room ??= ruang({ t0: A.angka - .45, t1: A.ia + .25, bg: IM.wbg, cut: IM.wcut, word: '392.505', wordSize: 360,
    wordX: .33, wordY: .5, tw: A.angka - .1, par: .6, fx: .7 });
  // Aksa v2 (2026-11-21 "terlalu cepat"): 2× per bab, stay ≥ 5.5 s, s .8. #1 bawah-kiri (ruang → papan, hanya baris 1–2 hadir) · #2 bawah-tengah di harga PS Store
  const aksa = aksaShow({ t: A.angka - .7, x: 300, y: 1040, s: .8, stay: 5.6, jump: .4, face: [[.1, '^o^'], [2.0, 'O_O'], [4.0, '^_^']], say: [.3, '#1 dunia!'] });
  const aksa2 = aksaShow({ t: A.persen - 1.2, x: 900, y: 1072, s: .78, stay: 6.6, shock: .38, sad: 4.9,
    face: [[.38, 'O_O'], [2.9, '>_<'], [4.9, 'T_T']], say: [.7, 'dompetku…'] });
  function ruangText(o, t) {
    const t0 = A.angka - .45, t1 = A.ia + .25; if (t < t0 || t > t1) return;
    const a = E.outCubic(inv(t0 + .5, t0 + 1, t)) * (1 - E.inCubic(inv(t1 - .35, t1, t))), wx = -W * .9 * E.inCubic(inv(t1 - .35, t1, t));
    o.save(); o.setTransform(1, 0, 0, 1, wx, 0); o.globalAlpha = .85 * a; setFont(o, `400 21px "Space Mono"`, 1); o.textAlign = 'right'; o.fillStyle = ivo(.82);
    o.fillText('Foto: Secrett9 / Wikimedia Commons (CC0)', W - 64, H - 56); o.textAlign = 'left'; o.globalAlpha = 1;
    typeOn(o, 'ORANG NONTON BARENGAN · YOUTUBE', W * .33, 200, t, A.angka + .55, MN(30), { align: 'center', ls: 7, col: IVORY, cps: 46 });
    o.restore();
  }

  // ── S10 · papan Top 4 dunia (rebuild top-streamer-dunia-gta6) ──────────────────────────────────────────────
  const TOP = [['WINDAH BASUDARA', 'INDONESIA', 392505, A.ia - .1], ['ISHOWSPEED', 'AMERIKA SERIKAT', 371840, A.speed - .05], ['ALANZOKA', 'BRASIL', 361813, A.alanz - .05],
    ['RUBIUS', 'SPANYOL', 358695, A.rubius - .05]];
  function S10(ctx, t) {
    const a0 = ctx.globalAlpha, BX = -200, BWm = 1000;
    typeOn(ctx, 'STREAMER GTA VI DUNIA · PUNCAK PENONTON SERENTAK', -860, -400, t, A.ia + .1, MN(26), { ls: 5, col: ivo(.85), cps: 50 });
    const NUMT = [A.ia + .9, A.n371, A.n361, A.n358];
    TOP.forEach(([nm, ng, v, tj], i) => { const k = E.outQuint(inv(tj, tj + .45, t)); if (k <= 0) return; const y = -235 + i * 170, one = i === 0;
      ctx.globalAlpha = a0 * k; setFont(ctx, DSP(96), 0); ctx.fillStyle = one ? LIME : ivo(.6); ctx.fillText(`#${i + 1}`, -880 + (1 - k) * -40, y + 34);
      if (one) { ctx.save(); ctx.beginPath(); ctx.arc(-720, y, 46, 0, 7); ctx.fillStyle = '#2a2b24'; ctx.fill(); ctx.clip(); ctx.drawImage(IM.winc, -720 - 64, y - 44, 128, 128); ctx.restore(); }
      else { ctx.beginPath(); ctx.arc(-720, y, 46, 0, 7); ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2.5; ctx.stroke(); setFont(ctx, DSP(46), 0); ctx.textAlign = 'center'; ctx.fillStyle = ivo(.75); ctx.fillText(nm[0], -720, y + 17); ctx.textAlign = 'left'; }
      setFont(ctx, DSP(one ? 52 : 46), 2); ctx.fillStyle = IVORY; ctx.fillText(nm, -650, y + 6); setFont(ctx, MN(17, 400), 3); ctx.fillStyle = ivo(.65); ctx.fillText(ng, -650, y + 38);
      const tn = NUMT[i], kv = E.outCubic(inv(tj + .1, Math.max(tj + .7, tn), t)), bw = BWm * (v / 392505) * kv;
      ctx.fillStyle = one ? LIME : ivo(.78); ctx.fillRect(BX, y - 38, bw, 76);
      if (one) { const sp = ((t - A.ia) * .5) % 1.6; if (sp < 1) { const sx = BX + bw * sp, g = ctx.createLinearGradient(sx - 90, 0, sx + 90, 0);
        g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(Math.max(BX, sx - 90), y - 38, 180, 76); } }
      if (bw > 260) { setFont(ctx, DSP(58), 1); ctx.textAlign = 'right'; ctx.fillStyle = one ? LIME_INK : DARK; ctx.fillText(fmt(Math.round(v * kv)), BX + bw - 18, y + 21); ctx.textAlign = 'left'; } });
    ctx.globalAlpha = a0;
    slab(ctx, 'SELISIH 20.665 PENONTON', 790, -150, t, A.penonton + .8, { size: 22, align: 'right' });
    srcTag(ctx, 'Sumber: Streams Charts via Kompas.com & Radar Pati, 19 Nov 2026', -860, 440, t, aksa.end + .1);
  }

  // ── S11 · rekaman siaran perdana: 13 jam, 8 juta kali diputar ──────────────────────────────────────────────
  function S11(ctx, t) {
    const a0 = ctx.globalAlpha, kp = E.outQuint(inv(A.belum - .1, A.belum + .5, t)); if (kp <= 0) return;
    typeOn(ctx, 'REKAMAN SIARAN PERDANA WINDAH', -810, -340, t, A.belum + .2, MN(26), { ls: 6, col: ivo(.85), cps: 46 });
    plate(ctx, V.garasi, t, -330, -20, 960, 540, kp, { t0: A.belum, grade: GRADE_DOC, vig: .45, grain: .14, marks: false });
    const hrs = 13 * E.inOutCubic(inv(A.belum + .3, A.jam13 + .3, t)), sec = Math.floor(hrs * 3600), hms = `${Math.floor(sec / 3600)}:${String(Math.floor(sec / 60) % 60).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
    ctx.globalAlpha = a0 * kp; const gr = ctx.createLinearGradient(0, 130, 0, 250); gr.addColorStop(0, 'rgba(11,12,9,0)'); gr.addColorStop(1, 'rgba(11,12,9,.8)'); ctx.fillStyle = gr; ctx.fillRect(-810, 130, 960, 120);
    ctx.fillStyle = ivo(.3); ctx.fillRect(-780, 222, 900, 5); ctx.fillStyle = IVORY; ctx.fillRect(-780, 222, 900 * hrs / 13, 5); ctx.beginPath(); ctx.arc(-780 + 900 * hrs / 13, 224, 9, 0, 7); ctx.fill();
    setFont(ctx, MN(22), 2); ctx.fillText(`${hms} / 13:00:00`, -780, 200);
    // ring: 13 of 24 hours
    const cx = 560, cy = -120, R = 135, kr = E.outQuint(inv(A.belum + .2, A.belum + .7, t)), fr = 13 / 24 * E.inOutCubic(inv(A.belum + .3, A.jam13 + .3, t));
    ctx.globalAlpha = a0 * kr; ctx.lineWidth = 16; ctx.strokeStyle = ivo(.18); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    ctx.strokeStyle = IVORY; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * fr); ctx.stroke(); ctx.lineCap = 'butt';
    setFont(ctx, DSP(130), 1); ctx.textAlign = 'center'; ctx.fillStyle = IVORY; ctx.fillText(String(Math.round(hrs)), cx, cy + 30); setFont(ctx, MN(20), 5); ctx.fillStyle = ivo(.7); ctx.fillText('JAM · BELUM SEHARI', cx, cy + 74); ctx.textAlign = 'left';
    ctx.globalAlpha = a0; const kv = E.outQuint(inv(A.delapan - 1.45, A.delapan - 1.0, t));
    if (kv > 0) { const n = Math.round(countTo(0, 8e6, t, A.delapan - 1.4, 1.4)); setFont(ctx, DSP(120), 2); ctx.textAlign = 'center'; ctx.fillStyle = LIME; ctx.globalAlpha = a0 * kv;
      ctx.fillText(fmt(n), cx, 230 + (1 - kv) * 40); ctx.textAlign = 'left'; ctx.globalAlpha = a0; }
    txt(ctx, 'KALI DIPUTAR', cx, 285, t, A.delapan + .1, MN(24), { align: 'center', ls: 6 });
    srcTag(ctx, 'Sumber: KOMPAS.com, 19 Nov 2026', -860, 440, t, A.belum + .8);
  }

  // ── S12 · sampai ke DOMPET ────────────────────────────────────────────────────────────────────────────────
  function S12(ctx, t) {
    typeOn(ctx, 'ARTINYA, BUAT KAMU DI INDONESIA', 0, -230, t, A.artinya + .2, MN(30), { align: 'center', ls: 7, col: ivo(.88), cps: 40 });
    fall(ctx, 'ANTUSIASME INI', 0, 20, t, A.kamu + .5, DSP(190), { align: 'center', ls: 4 });
    markLine(ctx, 'langsung terasa sampai ke ', 'dompet', '', 0, 220, t, A.dompet - 1.6, A.dompet, SRF(100));
  }

  // ── S13 · harga PS Store Indonesia naik ±11 % (rebuild harga-ps-store-indonesia) ─────────────────────────────
  function S13(ctx, t) {
    const a0 = ctx.globalAlpha, t0 = A.begitu + 4.9; if (t < t0 - .1) return;
    typeOn(ctx, 'PLAYSTATION STORE INDONESIA · 19 NOV 2026', -860, -330, t, t0, MN(26), { ls: 5, col: ivo(.85), cps: 50 });
    stamp(ctx, 'NAIK ±11 %', 560, -320, t, A.persen - .05, { size: 100, rot: -4 });
    const ROWS = [['EDISI STANDAR', 1190, 1321, '+Rp131.000', A.edisi, A.n131, A.std], ['EDISI ULTIMATE', 1490, 1654, '+Rp164.000', A.ultimate, A.ult + .9, A.ult]];
    ROWS.forEach(([nm, o, nw, dl, ts, td, tr], i) => { const y = -40 + i * 260;
      fall(ctx, nm, -860, y, t, t0 + .2 + i * .2, DSP(84), { ls: 3 });
      const ow = wOf(ctx, MN(40, 400), 'Rp' + fmt(o * 1000)); txt(ctx, 'Rp' + fmt(o * 1000), -860, y + 72, t, t0 + .4 + i * .2, MN(40, 400), { col: ivo(.75) });
      if (t > ts + .3) strike(ctx, -860, -860 + ow, y + 72 + 13, 40, t, ts + .3, IVORY);
      const kr = E.outQuint(inv(tr - .35, tr, t)); if (kr > 0) { ctx.globalAlpha = a0 * kr;
        slot(ctx, countTo(o, nw, t, tr - .3, 1.0), 840, y + 40, DSP(124), { align: 'right', fmt: q => 'Rp' + fmt(q * 1000), col: IVORY }); ctx.globalAlpha = a0; }
      slab(ctx, dl, 840, y - 120, t, td - .05, { size: 26, align: 'right' }); });
    srcTag(ctx, 'Sumber: Kompas.com & Carisinyal, 19 Nov 2026', -860, 440, t, t0 + .6);
  }

  // ── S14 · bonus pemesanan awal hilang; patokan global US$79,99 ───────────────────────────────────────────────
  function S14(ctx, t) {
    const a0 = ctx.globalAlpha;
    typeOn(ctx, 'BONUS PEMESANAN AWAL', -560, -300, t, A.bonus + .25, MN(28), { ls: 7, col: ivo(.88), cps: 40 });
    [['VINTAGE VICE CITY PACK', A.bonus + .5, A.hilang + .1], ['GTA+ · 1 BULAN', A.bonus + .75, A.hilang + .35]].forEach(([s, tj, tx], i) => {
      const k = E.outQuint(inv(tj, tj + .45, t)); if (k <= 0) return; const y = -200 + i * 140, w = wOf(ctx, DSP(72), s, 3) + 70, dim = 1 - .5 * inv(tx + .2, tx + .6, t);
      ctx.globalAlpha = a0 * k * dim; rr(ctx, -560 + (1 - k) * -80, y, w, 104, 10); ctx.fillStyle = IVORY; ctx.fill(); ctx.fillStyle = DARK; ctx.fillText(s, -525 + (1 - k) * -80, y + 78);
      ctx.globalAlpha = a0; strike(ctx, -540, -580 + w, y + 78 - 4, 72, t, tx, DARK); });
    txt(ctx, 'tapi masih di bawah patokan global', 0, 215, t, A.global80 - 1.4, SRF(62), { align: 'center' });
    const uw = fall(ctx, 'US$79,99', 0, 375, t, A.global80 - .1, DSP(150), { align: 'center', col: LIME, ls: 3 });
    if (uw) txt(ctx, '≈ Rp1,46 juta', uw / 2 + 40, 360, t, A.global80 + .2, MN(40, 400), { col: ivo(.85) });         // layar saja, tidak diucap
    srcTag(ctx, 'Sumber: Carisinyal, 19 Nov 2026 · Take-Two Interactive · kurs JISDOR BI 17 Nov 2026 · Rp18.264/US$', -860, 440, t, A.bonus + 1);
  }

  // ── S15 · boks fisik yang isinya cuma kupon unduh ───────────────────────────────────────────────────────────
  const L15 = A.lucunya + 1.0;   // S15 lands 1 s after "lucunya" so US$79,99 + rupiah hold ≥ 2 s (kemasan is at 153.8)
  function S15(ctx, t) {
    const a0 = ctx.globalAlpha, k = E.outQuint(inv(L15 - .1, L15 + .55, t)); if (k <= 0) return;
    const bx = -560, by = -250, bw = 380, bh = 500, sway = Math.sin((t - L15) * .9) * 1.2;
    ctx.globalAlpha = a0 * k; const gl = ctx.createRadialGradient(bx + bw / 2, by + bh / 2, 40, bx + bw / 2, by + bh / 2, 560);   // backlight plate behind the case
    gl.addColorStop(0, ivo(.30)); gl.addColorStop(.45, ivo(.12)); gl.addColorStop(1, ivo(0)); ctx.fillStyle = gl; ctx.fillRect(bx - 600, by - 400, bw + 1200, bh + 800);
    ctx.save(); ctx.translate(0, (1 - k) * 90); ctx.rotate(sway * D2R); ctx.globalAlpha = a0 * k;
    ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 26; ctx.fillStyle = '#3A3B31'; ctx.fillRect(bx - 26, by, bw + 26, bh); ctx.shadowColor = 'transparent';
    const tg = ctx.createLinearGradient(bx, by, bx + bw, by + bh); tg.addColorStop(0, '#4A4B40'); tg.addColorStop(1, '#2C2D25');
    ctx.fillStyle = tg; ctx.fillRect(bx, by + 10, bw - 10, bh - 20); ctx.strokeStyle = ivo(.5); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(bx + bw / 2, by + bh / 2 - 30, 120, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(bx + bw / 2, by + bh / 2 - 30, 26, 0, 7); ctx.stroke();
    const ks = E.outQuint(inv(A.kupon - .25, A.kupon + .45, t)); if (ks > 0) {                         // the slip rises out of the empty case
      ctx.save(); ctx.beginPath(); ctx.rect(bx - 40, by - 400, bw + 80, bh + 400 - 20); ctx.clip(); ctx.translate(bx + bw / 2, by + bh - 40 - 330 * ks); ctx.rotate(-3 * D2R * ks);
      ctx.fillStyle = IVORY; ctx.fillRect(-150, -90, 300, 180); ctx.fillStyle = DARK; setFont(ctx, MN(22), 4); ctx.textAlign = 'center'; ctx.fillText('KODE UNDUH', 0, -42);
      setFont(ctx, MN(22, 400), 2); ctx.fillText('XXXX-XXXX-XXXX', 0, 2); setFont(ctx, DSP(54), 2); ctx.fillText('212 GB', 0, 64); ctx.textAlign = 'left'; ctx.restore(); }
    const th = Math.min(160, 160 * E.outCubic(inv(A.kemasan - .1, A.kemasan + .7, t))) * D2R, c = Math.cos(th);   // the cover swings open on the spine
    ctx.save(); ctx.translate(bx, by); ctx.scale(c >= 0 ? Math.max(.02, c) : Math.min(-.02, c), 1);
    if (c >= 0) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, bw, bh); ctx.clip(); ctx.filter = GRADE_DOC; cover(ctx, IM.s10, 0, 0, bw, bh, 1.05); ctx.filter = 'none'; ctx.restore();
      ctx.fillStyle = 'rgba(11,12,9,.85)'; ctx.fillRect(0, 0, bw, 64); setFont(ctx, DSP(46), 3); ctx.fillStyle = IVORY; ctx.fillText('GTA VI', 20, 48);
      ctx.fillStyle = `rgba(0,0,0,${.6 * Math.sin(th)})`; ctx.fillRect(0, 0, bw, bh); }
    else { ctx.fillStyle = '#55564A'; ctx.fillRect(0, 0, bw, bh); ctx.strokeStyle = ivo(.45); ctx.lineWidth = 2; ctx.strokeRect(12, 12, bw - 24, bh - 24); }
    ctx.restore(); ctx.fillStyle = '#5A5B4E'; ctx.fillRect(bx - 26, by, 26, bh); ctx.fillStyle = ivo(.6); ctx.fillRect(bx - 4, by, 3, bh);
    ctx.strokeStyle = ivo(.85); ctx.lineWidth = 3; ctx.strokeRect(bx - 26, by, bw + 26, bh);                                       // rim light
    ctx.restore(); ctx.globalAlpha = a0;
    txt(ctx, 'BOKS FISIK GTA VI', bx + bw / 2 - 13, by + bh + 64, t, L15 + .5, MN(24), { align: 'center', ls: 6, col: ivo(.85) });
    typeOn(ctx, 'PENGUMUMAN RESMI TAKE-TWO', 120, -300, t, L15 + .3, MN(26), { ls: 6, col: ivo(.85), cps: 44 });
    txt(ctx, 'kemasan boks di toko pun…', 120, -190, t, A.kemasan - .15, SRF(64));
    fall(ctx, 'CUMA BERISI', 120, 20, t, A.kupon - .45, DSP(130), { ls: 3 });
    markLine(ctx, '', 'KUPON UNDUH', '', 120, 185, t, A.kupon - .2, A.kupon + .15, DSP(130), { align: 'left' });
    srcTag(ctx, 'Sumber: Take-Two Interactive, 24 Jun 2026', -860, 440, t, L15 + .8);
  }

  // ── S16 · pipa data: paket 212 GB serentak → DE-CIX pecah rekor ─────────────────────────────────────────────
  function S16(ctx, t) {
    const a0 = ctx.globalAlpha, t0 = A.akibat, k = E.outQuint(inv(t0 - .1, t0 + .5, t)); if (k <= 0) return;
    typeOn(ctx, 'JUTAAN ORANG MENGUNDUH SERENTAK', 0, -320, t, t0 + .2, MN(30), { align: 'center', ls: 7, col: ivo(.88), cps: 44 });
    const Y = -20, PH = 150, L = 1500; ctx.globalAlpha = a0 * k;
    const g = ctx.createLinearGradient(0, Y - PH / 2, 0, Y + PH / 2); g.addColorStop(0, ivo(.10)); g.addColorStop(.5, ivo(.03)); g.addColorStop(1, ivo(.10));
    ctx.fillStyle = g; ctx.fillRect(-L, Y - PH / 2, 2 * L, PH); ctx.fillStyle = ivo(.6); ctx.fillRect(-L, Y - PH / 2, 2 * L, 3); ctx.fillRect(-L, Y + PH / 2 - 3, 2 * L, 3);
    for (let j = -L; j < L; j += 300) { ctx.fillStyle = ivo(.35); ctx.fillRect(j, Y - PH / 2 - 10, 14, PH + 20); }
    ctx.save(); ctx.beginPath(); ctx.rect(-L, Y - PH / 2 + 4, 2 * L, PH - 8); ctx.clip();
    const u = Math.max(0, t - t0), sv = A.decix - t0, pos = 260 * u + 120 * Math.min(u, sv) ** 2 + 900 * Math.max(0, u - sv);
    for (let i = 0; i < 12; i++) { const x = ((i * 250 + pos) % 3000) - L, big = t > A.gb212 - .1 + (i % 4) * .12;
      if (big) { ctx.fillStyle = ivo(.88); ctx.fillRect(x - 64, Y - 32, 128, 64); setFont(ctx, MN(20), 1); ctx.textAlign = 'center'; ctx.fillStyle = DARK; ctx.fillText('212 GB', x, Y + 7); ctx.textAlign = 'left'; }
      else { ctx.fillStyle = ivo(.6); ctx.beginPath(); ctx.arc(x, Y, 10, 0, 7); ctx.fill(); } }
    ctx.restore(); ctx.globalAlpha = a0;
    if (t > A.pecah) { const d = t - A.pecah; ctx.strokeStyle = IVORY; ctx.lineWidth = 4; ctx.globalAlpha = a0 * Math.min(1, d * 6);   // the pipe cracks
      for (let j = 0; j < 5; j++) { const ang = (-70 + j * 35) * D2R, len = 60 + 90 * E.outCubic(clamp(d / .35)); ctx.beginPath(); ctx.moveTo(0, Y);
        ctx.lineTo(Math.cos(ang) * len * .5 + (j % 2 ? 14 : -14), Y + Math.sin(ang) * len * .5 - 40); ctx.lineTo(Math.cos(ang) * len, Y + Math.sin(ang) * len - 80); ctx.stroke(); } ctx.globalAlpha = a0; }
    stamp(ctx, 'PECAH REKOR', 0, -170, t, A.pecah - .02, { size: 120, rot: -3 });
    slab(ctx, 'DE-CIX · JALUR PERTUKARAN INTERNET DUNIA', 0, 210, t, A.decix - .05, { size: 28, align: 'center' });
    srcTag(ctx, 'Sumber: DE-CIX & Variety, 19 Nov 2026', -860, 440, t, A.decix + .3);
  }

  // ── S17 · 33,03 Tbit/s · Frankfurt = 13 unduhan penuh per detik ─────────────────────────────────────────────
  function S17(ctx, t) {
    const a0 = ctx.globalAlpha, t0 = A.trafik;
    typeOn(ctx, 'DE-CIX · PUNCAK TRAFIK BARU', -860, -280, t, t0 + .2, MN(26), { ls: 6, col: ivo(.85), cps: 46 });
    const kn = E.outQuint(inv(A.tb - .85, A.tb - .4, t));
    if (kn > 0) { const n = countTo(0, 33.03, t, A.tb - .8, .9); setFont(ctx, DSP(300), 2); ctx.fillStyle = LIME; ctx.globalAlpha = a0 * kn; ctx.fillText(fmt(n, 2), -870, 60 + (1 - kn) * 50); ctx.globalAlpha = a0; }
    txt(ctx, 'TERABIT PER DETIK', -860, 130, t, A.tb + .1, MN(30), { ls: 6 });
    slab(ctx, '+25 %', -860, 220, t, A.tb + .7, { size: 30 });
    typeOn(ctx, 'DI FRANKFURT SAJA', 150, -280, t, A.frankfurt - .1, MN(26), { ls: 6, col: ivo(.85), cps: 46 });
    txt(ctx, '22,30 Tbit/s', 150, -150, t, A.frankfurt + .1, DSP(110), { ls: 2 });
    for (let i = 0; i < 13; i++) { const tj = A.tiga13 + i * .075, kb = E.outQuint(inv(tj - .1, tj + .3, t)), kf = inv(tj + .1, tj + .4, t); if (kb <= 0) continue;
      const x = 150 + (i % 7) * 96, y = -80 + Math.floor(i / 7) * 136 + (1 - kb) * -40;
      ctx.globalAlpha = a0 * kb; ctx.strokeStyle = ivo(.8); ctx.lineWidth = 2.5; ctx.strokeRect(x, y, 64, 92); ctx.fillStyle = ivo(.85); ctx.fillRect(x + 6, y + 86 - 80 * kf, 52, 80 * kf); }
    ctx.globalAlpha = a0;
    txt(ctx, '= 13 UNDUHAN PENUH TIAP DETIK', 150, 250, t, A.tiga13 + 1.0, MN(24), { ls: 4 });
    srcTag(ctx, 'Sumber: DE-CIX & Variety, 19 Nov 2026', -860, 440, t, A.tb + .5);
  }

  // ── S18 · Frankfurt → Singapura, 627 Gbit/s ────────────────────────────────────────────────────────────────
  function S18(ctx, t) {
    const a0 = ctx.globalAlpha, t0 = A.bahkan, F = [-560, 20], S = [520, 60], C = [-20, -300];
    typeOn(ctx, 'SIMPUL INTERNET TETANGGA KITA', 0, -360, t, t0 + .3, MN(28), { align: 'center', ls: 7, col: ivo(.88), cps: 44 });
    const kl = E.inOutCubic(inv(t0 + .3, A.singapura + .1, t)), q = u => [(1 - u) ** 2 * F[0] + 2 * (1 - u) * u * C[0] + u * u * S[0], (1 - u) ** 2 * F[1] + 2 * (1 - u) * u * C[1] + u * u * S[1]];
    if (kl > 0) { ctx.strokeStyle = ivo(.7); ctx.lineWidth = 4; ctx.setLineDash([16, 14]); ctx.beginPath(); ctx.moveTo(...F); for (let i = 1; i <= 40; i++) ctx.lineTo(...q(kl * i / 40)); ctx.stroke(); ctx.setLineDash([]);
      for (let i = 0; i < 4; i++) { const u = ((t - t0) * .45 + i / 4) % 1; if (u > kl) continue; const [px, py] = q(u); ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(px, py, 9, 0, 7); ctx.fill(); } }
    const kf = pop(t, t0 + .1, .5, .3); if (kf > 0) { ctx.fillStyle = IVORY; ctx.beginPath(); ctx.arc(F[0], F[1], 20 * Math.min(kf, 1.1), 0, 7); ctx.fill();
      setFont(ctx, MN(24), 5); ctx.textAlign = 'center'; ctx.fillText('FRANKFURT', F[0], F[1] + 64); ctx.textAlign = 'left'; }
    const ks = pop(t, A.singapura - .05, .5, .3); if (ks > 0) { const r = 26 * Math.min(ks, 1.15); ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(S[0], S[1], r, 0, 7); ctx.fill();
      const pr = ((t - A.singapura) * .9) % 1; ctx.strokeStyle = LIME; ctx.lineWidth = 3; ctx.globalAlpha = a0 * (1 - pr); ctx.beginPath(); ctx.arc(S[0], S[1], Math.max(0, r + 60 * pr), 0, 7); ctx.stroke(); ctx.globalAlpha = a0; }
    fall(ctx, 'SINGAPURA', S[0], 240, t, A.singapura - .05, DSP(130), { align: 'center', ls: 4 });
    const kn = E.outQuint(inv(A.g627 - .85, A.g627 - .4, t));
    if (kn > 0) { const n = Math.round(countTo(0, 627, t, A.g627 - .8, .9)); setFont(ctx, DSP(230), 2); ctx.fillStyle = IVORY; ctx.globalAlpha = a0 * kn; ctx.fillText(String(n), -870, 350 + (1 - kn) * 40);
      const nw = ctx.measureText('627').width; ctx.globalAlpha = a0; txt(ctx, 'GIGABIT PER DETIK', -870 + nw + 34, 350, t, A.g627 + .05, MN(28), { ls: 5 }); }
    srcTag(ctx, 'Sumber: DE-CIX & Variety, 19 Nov 2026', -860, 440, t, A.singapura + .4);
  }

  const ST = [
    { at: 0, name: 'Mesin streamer', draw: S0 },
    { at: A.bayang, via: 'whip', name: '235 juta', tag: 'GTA V', draw: S1 },
    { at: A.salah, via: 'rise', name: 'Kreator live', draw: S2 },
    { at: A.gampang, via: 'push', name: 'Roleplay', draw: S3 },
    { at: A.bukan, via: 'cut', name: 'Cfx.re', draw: S4 },
    { at: A.buah, via: 'cut', name: '7,91 juta', draw: S5 },
    { at: A.rekor, via: 'truck', name: 'Rekor tumbang', draw: S6 },
    { at: A.dan, via: 'cut', name: 'Indonesia', draw: S7 },
    { at: A.daftar, via: 'cut', name: 'Peringkat dunia', draw: S8 },
    { at: A.kursi, via: 'whip', name: 'Windah', draw: S9 },
    { at: A.ia, via: 'cut', lead: .25, name: 'Top 4 dunia', draw: S10 },
    { at: A.belum, via: 'push', name: '13 jam', draw: S11 },
    { at: A.artinya, via: 'rise', name: 'Dompet', draw: S12 },
    { at: A.begitu, via: 'cut', name: 'Harga PS Store', draw: S13 },
    { at: A.bonus, via: 'whip', name: 'Bonus hilang', tag: 'BONUS', draw: S14 },
    { at: L15, via: 'push', name: 'Kupon unduh', draw: S15 },
    { at: A.akibat, via: 'cut', name: 'DE-CIX', draw: S16 },
    { at: A.trafik, via: 'truck', name: '33 Tbit/s', draw: S17 },
    { at: A.bahkan, via: 'whip', name: 'Singapura', tag: 'SGP', draw: S18 },
  ];

  // full-bleed latar per station (AGI standard): official stills/clips, graded and dimmed under the type
  let latarV = () => {};
  const LAT = () => [
    { t0: 0, t1: A.bayang + .1, V: clip(V.kotamalam, 26, 36), speed: .5, dim: .5, z: [1.05, 1.14], pan: [30, -30] },
    { t0: A.bayang - .2, t1: A.salah + .1, im: IM.s02, dim: .45, side: 'left', z: [1.04, 1.12], pan: [-30, 30] },
    { t0: A.salah - .2, t1: A.gampang + .1, im: IM.s06, dim: .62, z: [1.03, 1.1] },
    { t0: A.gampang - .2, t1: A.bukan + .1, V: V.lorong, dim: .58, z: [1.05, 1.12], pan: [-24, 24] },
    { t0: A.bukan - .2, t1: A.buah + .1, V: clip(V.interogasi, 6, 26), dim: .6, z: [1.04, 1.12], pan: [24, -24] },
    { t0: A.buah - .2, t1: A.twitch, im: IM.s04, dim: .62, side: 'left', z: [1.03, 1.12], pan: [30, -10] },
    { t0: A.twitch - .4, t1: A.rekor + .1, V: V.nyetir, dim: .66, side: 'left', z: [1.05, 1.1] },
    { t0: A.rekor - .2, t1: A.dan + .1, im: IM.s03, dim: .62, z: [1.04, 1.13], pan: [-30, 30] },
    { t0: A.dan - .2, t1: A.daftar + .1, V: clip(V.laut, 8, 39), dim: .5, z: [1.05, 1.13] },
    { t0: A.daftar - .2, t1: A.kursi + .1, im: IM.s05, dim: .6, z: [1.03, 1.1], pan: [20, -20] },
    { t0: A.kursi - .2, t1: A.angka, V: clip(V.senja, 30, 36), speed: .4, dim: .55, z: [1.05, 1.12], pan: [-20, 20] },
    { t0: A.ia - .5, t1: A.belum + .1, im: IM.s09, dim: .7, z: [1.03, 1.12], pan: [30, -30] },
    { t0: A.belum - .2, t1: A.artinya + .1, V: clip(V.kotamalam, 26, 36), speed: .5, dim: .62, z: [1.08, 1.15], pan: [-30, 0] },
    { t0: A.artinya - .2, t1: A.begitu + .1, V: clip(V.mobil2, 0, 30), dim: .5, z: [1.05, 1.12] },
    { t0: A.begitu - .2, t1: A.std, im: IM.s08, dim: .66, z: [1.03, 1.1], pan: [30, -30] },
    { t0: A.std - .4, t1: A.bonus + .1, im: IM.s06, dim: .66, z: [1.06, 1.12], pan: [-30, 10] },
    { t0: A.bonus - .2, t1: L15 + .1, V: clip(V.flamingo, 13, 28), dim: .58, z: [1.05, 1.12] },
    { t0: L15 - .2, t1: A.akibat + .1, im: IM.s01, dim: .7, z: [1.03, 1.1], pan: [20, -20] },
    { t0: A.akibat - .2, t1: A.trafik + .1, V: clip(V.menara, 15, 27), speed: .5, dim: .58, z: [1.05, 1.13] },
    { t0: A.trafik - .2, t1: A.bahkan + .1, V: clip(V.kapal, 2, 30), dim: .6, z: [1.05, 1.12], pan: [-24, 24] },
    { t0: A.bahkan - .2, t1: DUR, im: IM.s07, dim: .55, z: [1.03, 1.14], pan: [30, -30] },
  ];
  let FULLS;
  const full = () => FULLS ??= [
    { im: IM.gs, t0: A.bukan - .15, t1: A.membeli - .25, dir: 1, crop: [.08, .05, .86, .83], tab: 'GameSpot · 11 Agu 2023',
      hl: [[.029, .211, .884, .084, A.blokir + .3], [.128, .522, .099, .030, A.tgl11 - .05], [.262, .875, .262, .036, A.tgl11 + 1.0]] },
    { im: IM.sc, t0: A.buah - .15, t1: A.data - .2, dir: -1, dark: true, crop: [.11, 0, .79, .98], tab: 'streamscharts.com · 18 Nov 2026',
      hl: [[.037, .173, .944, .102, A.meledak + .2], [.719, .628, .085, .056, A.november], [.405, .847, .38, .051, A.november + 1.0]] },
    { im: IM.kp, t0: A.daftar - .15, t1: A.amerika - .35, dir: 1, dark: true, crop: [.03, 0, .94, .49], tab: 'KOMPAS.com · 19 Nov 2026',
      hl: [[.083, .629, .817, .118, A.global + .3], [.083, .755, .282, .102, A.satu], [.083, .947, .226, .043, A.satu + 1.0]] },
    { im: IM.cs, t0: A.begitu - .15, t1: A.begitu + 5.1, dir: -1, crop: [0, 0, 1, .62], tab: 'Carisinyal · 19 Nov 2026',
      hl: [[.6, .677, .095, .081, A.tgl19 + .2], [.63, .29, .276, .145, A.banderol + .4], [.3, .461, .375, .135, A.banderol + 1.6]] },
  ];
  const over = (o, t) => { roomOf().draw(o, t); ruangText(o, t); aksa.draw(o, t); aksa2.draw(o, t); };
  return makeChapter({ B, ST, load: async () => { await load(); latarV = latar(LAT()); }, label: 'BAB 4 · MESIN STREAMER', over, full, gate: true,
    under: (ctx, t, first) => latarV(ctx, t, first) });
}
