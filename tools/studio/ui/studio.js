'use strict';
const $ = s => document.querySelector(s);
const S = { marking: false, draftMarks: null, showMarks: null, vz: 1, t: 0, playing: false, mode: 'live', inT: null, outT: null, zoom: 1, scroll: 0, notes: [], patches: [], running: [], M: null,
  busy: false, drawn: -1, draws: 0, lastFpsT: performance.now(), clock0: 0, wall0: 0 };
const fmt = t => { t = Math.max(0, t); const m = Math.floor(t / 60), s = t - m * 60; return `${String(m).padStart(2, '0')}:${s.toFixed(2).padStart(5, '0')}`; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const api = (p, body) => fetch(p, body === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json());
let FW = null; const audio = new Audio(); audio.preload = 'auto';
const DUR = () => S.M.dur || (S.M.frames_n / S.M.fps) || 60;

// ---------- boot ----------
(async () => {
  S.M = await api('/api/meta');
  $('#name').textContent = 'Studio · ' + S.M.name; document.title = 'Studio ' + S.M.name;
  setupAudio();
  S.notes = []; setNotes(await api('/api/notes'));
  const ifr = $('#film'); ifr.src = '/p/src/index.html?studio=1';
  ifr.onload = async () => {
    FW = ifr.contentWindow;
    for (let i = 0; i < 600 && !FW.ready; i++) await new Promise(r => setTimeout(r, 50));
    await FW.ready;
    if (!S.M.dur && FW.NFRAMES) S.M.dur = FW.NFRAMES / FW.FILM_FPS;
    if (!FW.preview) { $('#loading').textContent = 'film ini belum punya window.preview (lihat tools/studio/README.md)'; return; }
    $('#loading').style.display = 'none'; S.drawn = -1;
  };
  S.ver = (await api('/api/version')).v;
  fit(); updRange(); renderNotes(); pollPatches(); pollNotes(); watchSource(); requestAnimationFrame(loop);
})();

function fit() {
  const vw = $('#viewer'), st = $('#stage'), wFit = Math.max(160, Math.min(vw.clientWidth - 24, (vw.clientHeight - 24) * 16 / 9)), w = wFit * S.vz;
  $('#vzLbl').textContent = S.vz === 1 ? 'Fit' : Math.round(S.vz * 100) + '%';   // % of the fitted size, up to 200 %
  const h = w * 9 / 16; st.style.width = w + 'px'; st.style.height = h + 'px'; $('#film').style.transform = `scale(${w / 960})`;
  st.style.left = Math.max(12, (vw.clientWidth - w) / 2) + 'px'; st.style.top = Math.max(12, (vw.clientHeight - h) / 2) + 'px';
  drawMarks();
  const c = $('#tl'); c.width = c.clientWidth * devicePixelRatio; c.height = c.clientHeight * devicePixelRatio; drawTL();
}
addEventListener('resize', fit);
new ResizeObserver(() => fit()).observe(document.getElementById('viewer'));
function setVz(v) { const vw = $('#viewer'), cx = (vw.scrollLeft + vw.clientWidth / 2) / Math.max(1, vw.scrollWidth), cy = (vw.scrollTop + vw.clientHeight / 2) / Math.max(1, vw.scrollHeight);
  S.vz = Math.min(2, Math.max(0.3, +v.toFixed(2))); try { localStorage.setItem('studio.vz', S.vz); } catch (e) {} fit();
  vw.scrollLeft = cx * vw.scrollWidth - vw.clientWidth / 2; vw.scrollTop = cy * vw.scrollHeight - vw.clientHeight / 2; }
try { const v = +localStorage.getItem('studio.vz'); if (v) S.vz = v; } catch (e) {}
document.getElementById('vzOut').onclick = () => setVz(S.vz - 0.1);
document.getElementById('vzIn').onclick = () => setVz(S.vz + 0.1);
document.getElementById('vzFit').onclick = () => setVz(1);
document.getElementById('viewer').addEventListener('wheel', e => { if (!e.ctrlKey) return; e.preventDefault(); setVz(S.vz + (e.deltaY < 0 ? 0.05 : -0.05)); }, { passive: false });

// ---------- clock + frame loop ----------
function now() {
  if (!S.playing) return S.t;
  if (S.M.audio && !audio.paused) return audio.currentTime;
  return S.clock0 + (performance.now() - S.wall0) / 1000;
}
// ---------- audio: one mix, or stems (VO / Musik / SFX) with mute buttons, kept in sync with the first one ----------
let EXTRA = [];
const LABEL = { vo: 'VO', music: 'Musik', sfx: 'SFX' };
function setupAudio() {
  for (const a of EXTRA) { a.pause(); a.src = ''; } EXTRA = [];
  const st = S.M.stems || [], box = $('#stems'); box.innerHTML = '';
  let muted = {}; try { muted = JSON.parse(localStorage.getItem('studio.mute') || '{}'); } catch (e) {}
  if (!st.length) { if (S.M.audio) audio.src = S.M.audio + '?v=' + Date.now(); return; }
  st.forEach((x, i) => {
    const el = i === 0 ? audio : new Audio(); el.preload = 'auto'; el.src = x.url; el.muted = !!muted[x.name];
    if (i) EXTRA.push(el);
    const b = document.createElement('button'); b.textContent = LABEL[x.name] || x.name; b.classList.toggle('off', el.muted);
    b.onclick = () => { el.muted = !el.muted; b.classList.toggle('off', el.muted); muted[x.name] = el.muted; try { localStorage.setItem('studio.mute', JSON.stringify(muted)); } catch (e) {} };
    box.appendChild(b);
  });
  S.M.audio = st[0].url;
}
function syncExtra(force) {   // small drift: nudge playbackRate (no seek latency); big drift or a jump: seek
  for (const a of EXTRA) {
    const d = a.currentTime - audio.currentTime;
    if (force || Math.abs(d) > 0.3) { a.currentTime = audio.currentTime; a.playbackRate = 1; }
    else a.playbackRate = Math.abs(d) < 0.012 ? 1 : 1 - Math.max(-0.08, Math.min(0.08, d * 1.5));
    if (!audio.paused && a.paused) a.play().catch(() => {}); if (audio.paused && !a.paused) a.pause();
  }
}
function play(on = !S.playing) {
  S.playing = on; $('#play').textContent = on ? '❚❚' : '▶';
  if (on) { if (S.t >= DUR() - 0.05) S.t = 0; S.clock0 = S.t; S.wall0 = performance.now(); if (S.M.audio) { audio.currentTime = S.t; audio.play().catch(() => {}); syncExtra(true); } }
  else { S.t = now(); audio.pause(); syncExtra(true); }
  drawMarks();
}
function seek(t) { S.t = Math.min(Math.max(0, t), DUR()); setTimeout(drawMarks, 0); if (S.playing) { S.clock0 = S.t; S.wall0 = performance.now(); if (S.M.audio) { audio.currentTime = S.t; syncExtra(true); } } }
const img = $('#cache'); let imgBusy = false; img.onload = img.onerror = () => { imgBusy = false; S.draws++; };
async function loop() {
  const t = now(); if (S.playing) { S.t = t; if (t >= DUR()) play(false); if (EXTRA.length && (loop.n = (loop.n || 0) + 1) % 4 === 0) syncExtra(false); }
  const f = Math.round(t * S.M.fps);
  if (S.mode === 'live' && FW && FW.preview && !S.busy && f !== S.drawn) {
    S.busy = true; S.drawn = f;
    try { await FW.preview(f / S.M.fps); S.draws++; } catch (e) { console.error(e); }
    S.busy = false;
  } else if (S.mode === 'cache' && !imgBusy && f !== S.drawn) {
    S.drawn = f;
    if (f < S.M.frames_n) { imgBusy = true; img.src = `${S.M.frames}/f_${String(f).padStart(5, '0')}.jpg`; }
  }
  const pn = performance.now();
  if (pn - S.lastFpsT > 1000) { $('#fps').textContent = S.playing ? `${(S.draws * 1000 / (pn - S.lastFpsT)).toFixed(0)} fps` : ''; S.draws = 0; S.lastFpsT = pn; }
  $('#tc').textContent = `${fmt(S.t)}  · f${f}`;
  drawTL();
  requestAnimationFrame(loop);
}
$('#mode').onclick = e => {
  const m = e.target.dataset.m; if (!m) return; S.mode = m; S.drawn = -1;
  for (const b of $('#mode').children) b.classList.toggle('on', b.dataset.m === m);
  img.style.display = m === 'cache' ? 'block' : 'none';
  if (m === 'cache' && !S.M.frames_n) alert('Belum ada frame hasil render untuk film ini.');
};

// ---------- timeline ----------
const ROWS = [['Chapter', 18], ['Subtitle', 22], ['Beat', 18], ['Keyframe', 18], ['SFX', 22], ['Catatan', 20], ['Cuplikan', 16]];
const RULER = 20, LEFT = 70;
const SFXC = { enter: '#7fd3ff', pop: '#b892ff', win: '#b892ff', chip: '#b892ff', check: '#4cc38a', toggle: '#b892ff', count: '#7fd3ff', sweep: '#ffcc33', cam: '#666b73', trans: '#666b73', riser: '#ff6a2b', boom: '#ff4d6d', thud: '#ff9f5a', click: '#7fd3ff', type: '#7fd3ff', pop: '#b892ff', land: '#ff9f5a', lock: '#ff9f5a', morph: '#666b73', dive: '#ff6a2b', flip: '#ffcc33', shatter: '#ff4d6d', derez: '#ff4d6d', stamp: '#ffcc33', logo: '#4cc38a', layers: '#4cc38a' };
function view() { const c = $('#tl'), w = c.clientWidth - LEFT, span = DUR() / S.zoom; S.scroll = Math.min(Math.max(0, S.scroll), DUR() - span); return { w, span, x: t => LEFT + (t - S.scroll) / span * w, t: x => S.scroll + (x - LEFT) / w * span }; }
function rowY(i) { let y = RULER; for (let k = 0; k < i; k++) y += ROWS[k][1] + 4; return y; }
let HIT = [];
function drawTL() {
  const c = $('#tl'), g = c.getContext('2d'), d = devicePixelRatio; if (!S.M) return;
  g.setTransform(d, 0, 0, d, 0, 0); const W = c.clientWidth, H = c.clientHeight; g.clearRect(0, 0, W, H);
  const V = view(); HIT = [];
  // ruler
  const step = [1, 2, 5, 10, 15, 30, 60, 120].find(s => V.w / (V.span / s) > 70) || 300;
  g.fillStyle = '#8b8e94'; g.font = '10px ui-monospace,monospace'; g.strokeStyle = '#2a2d32';
  for (let t = Math.ceil(S.scroll / step) * step; t < S.scroll + V.span; t += step) { const x = V.x(t); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); g.fillText(fmt(t).slice(0, 5), x + 3, 12); }
  ROWS.forEach(([n, h], i) => { g.fillStyle = '#8b8e94'; g.fillText(n, 6, rowY(i) + h / 2 + 4); });
  const box = (i, a, b, col, label, info) => {
    const y = rowY(i), h = ROWS[i][1], x0 = Math.max(LEFT, V.x(a)), x1 = Math.min(W, V.x(b)); if (x1 < LEFT || x0 > W) return;
    g.fillStyle = col; g.fillRect(x0, y, Math.max(1.5, x1 - x0 - 1), h);
    if (label && x1 - x0 > 30) { g.save(); g.beginPath(); g.rect(x0, y, x1 - x0 - 3, h); g.clip(); g.fillStyle = '#111'; g.fillText(label, x0 + 3, y + h / 2 + 4); g.restore(); }
    HIT.push({ x0, x1: Math.max(x0 + 3, x1), y, h, info, t: a });
  };
  const M = S.M;
  M.chapters.forEach((c, i) => box(0, c.start, (M.chapters[i + 1] || {}).start || DUR(), i % 2 ? '#3a4150' : '#4a5468', c.chap, c.chap));
  M.lines.forEach(l => box(1, l.start, l.end, '#cfd2d6', l.text, l.text));
  M.beats.forEach(b => box(2, b.at, b.end || b.at + 0.3, b.type === 'chapter' ? '#ffcc33' : '#59606b', b.type, `${b.type} · ${b.id}`));
  M.sfx.forEach(s => { const c = s.cat || s.name; box(4, s.t, s.t + 0.12, SFXC[c] || SFXC[s.name] || '#aaa', '', `SFX ${c}${s.cat ? ' · ' + s.name : ''} (${s.gain} dB)`); });
  S.notes.filter(n => !n.archived).forEach(n => box(5, n.t0, n.t1, NCOL[n.status] || '#ffcc33', n.text, `[${n.status}] ${n.text}`));
  S.patches.forEach(p => box(6, p.t0, p.t1, p.status === 'done' ? (p.applied ? '#4cc38a' : '#7fd3ff') : '#ff6a2b', p.id, `cuplikan ${p.id} · ${p.status}${p.applied ? ' · sudah dipasang' : ''}`));
  S.running.forEach(p => box(6, p.t0, p.t1, '#ff6a2b', 'render…', 'sedang render'));
  // keyframes: camera shots (◆ eased move, ■ hard cut) + transitions (◆ cyan)
  const kd = (t, col, sq, info) => { const x = V.x(t), y = rowY(3) + ROWS[3][1] / 2, r = 5; if (x < LEFT - r || x > W + r) return;
    g.fillStyle = col; g.beginPath(); if (sq) g.rect(x - 4, y - 4, 8, 8); else { g.moveTo(x, y - r); g.lineTo(x + r, y); g.lineTo(x, y + r); g.lineTo(x - r, y); g.closePath(); } g.fill();
    HIT.push({ x0: x - r, x1: x + r, y: y - r, h: 2 * r, info, t }); };
  (M.keys || []).forEach(k => kd(k.t, k.cut ? '#ff4d6d' : '#ffcc33', k.cut, `kamera ${k.cut ? 'CUT' : 'gerak'} · zoom ${k.z}× · ${k.beat}`));
  (M.trans || []).forEach(t => kd(t, '#7fd3ff', false, 'transisi'));
  // in/out
  if (S.inT != null) { const a = V.x(S.inT), b = V.x(S.outT ?? S.inT); g.fillStyle = '#ff6a2b22'; g.fillRect(a, RULER, Math.max(2, b - a), H);
    g.fillStyle = '#ff6a2b'; g.fillRect(a - 1, 0, 2, H); g.beginPath(); g.moveTo(a, 0); g.lineTo(a + 12, 0); g.lineTo(a + 12, 12); g.lineTo(a, 18); g.fill();
    g.fillStyle = '#111'; g.font = 'bold 10px system-ui'; g.fillText('I', a + 3, 10);
    if (S.outT != null) { g.fillStyle = '#ff6a2b'; g.fillRect(b - 1, 0, 2, H); g.beginPath(); g.moveTo(b, 0); g.lineTo(b - 12, 0); g.lineTo(b - 12, 12); g.lineTo(b, 18); g.fill(); g.fillStyle = '#111'; g.fillText('O', b - 11, 10); }
    g.font = '10px ui-monospace,monospace'; }
  // playhead
  const px = V.x(S.t); g.fillStyle = '#fff'; g.fillRect(px - 1, 0, 2, H);
}
const tl = $('#tl'); let drag = null;
function nearHandle(x) { const V = view(); if (S.inT != null && Math.abs(x - V.x(S.inT)) < 7) return 'in'; if (S.outT != null && Math.abs(x - V.x(S.outT)) < 7) return 'out'; return null; }
function snap(t, e) {   // snap to keyframes, beat starts, subtitle edges, notes within 7 px (hold Alt = no snap)
  if (e.altKey) return t; const V = view(), px = 7 * V.span / V.w; let best = t, d = px;
  const M = S.M, cand = [...(drag === 'seek' ? [] : [S.t]), ...(M.keys || []).map(k => k.t), ...(M.trans || []), ...M.beats.map(b => b.at), ...M.lines.flatMap(l => [l.start, l.end])];
  for (const c of cand) if (Math.abs(c - t) < d) { d = Math.abs(c - t); best = c; } return best; }
tl.onmousedown = e => { const V = view(), t = V.t(e.offsetX); if (e.offsetX < LEFT) return;
  const hd = nearHandle(e.offsetX);
  if (hd) drag = hd;
  else if (e.shiftKey) { drag = 'range'; S.inT = snap(t, e); S.outT = S.inT; }
  else { drag = 'seek'; const h = hit(e); seek(h && e.offsetY > RULER ? h.t : snap(t, e)); }
  updRange(); };
addEventListener('mousemove', e => {
  if (drag) { const r = tl.getBoundingClientRect(), x = e.clientX - r.left, t = Math.min(DUR(), Math.max(0, snap(view().t(x), e)));
    if (drag === 'range' || drag === 'out') { S.outT = t; } else if (drag === 'in') { S.inT = t; } else seek(t);
    if (drag !== 'seek') { if (S.outT != null && S.outT < S.inT) { [S.inT, S.outT] = [S.outT, S.inT]; drag = drag === 'in' ? 'out' : drag === 'out' ? 'in' : drag; } updRange(); } }
  if (e.target === tl) tl.style.cursor = nearHandle(e.offsetX) ? 'ew-resize' : 'crosshair';
  const tip = $('#tip'), h = e.target === tl && hit(e);
  if (h) { tip.style.display = 'block'; tip.style.left = e.clientX + 12 + 'px'; tip.style.top = e.clientY - 34 + 'px'; tip.textContent = `${fmt(h.t)}  ${h.info}`; } else tip.style.display = 'none';
});
addEventListener('mouseup', () => { if (!drag) return; if (drag === 'range' && S.outT < S.inT) [S.inT, S.outT] = [S.outT, S.inT]; drag = null; updRange(); });
function hit(e) { return HIT.find(h => e.offsetX >= h.x0 && e.offsetX <= h.x1 && e.offsetY >= h.y && e.offsetY <= h.y + h.h); }
tl.onwheel = e => { e.preventDefault(); const V = view();
  if (e.ctrlKey) { const t = V.t(e.offsetX); S.zoom = Math.min(400, Math.max(1, S.zoom * (e.deltaY < 0 ? 1.25 : 0.8))); const V2 = view(); S.scroll = t - (e.offsetX - LEFT) / V2.w * V2.span; }
  else S.scroll += (e.deltaY + e.deltaX) / V.w * V.span; };
function clearRange() { S.inT = S.outT = null; updRange(); }
function updRange() { const el = $('#rangeLbl');
  if (S.inT != null) { el.innerHTML = `Rentang: ${fmt(S.inT)} – ${fmt(S.outT ?? S.inT)} <a href="#" id="clrIO2" style="color:#ff8f6b">× hapus</a>`; $('#clrIO2').onclick = e => { e.preventDefault(); clearRange(); }; }
  else el.textContent = 'Rentang: tekan I dan O, atau Shift+drag di timeline';
  $('#clrIO').disabled = S.inT == null; }
$('#clrIO').onclick = clearRange;

// ---------- notes ----------
function range() { let a = S.inT, b = S.outT; if (a == null || b == null || b - a < 0.2) { a = Math.max(0, S.t - 2); b = Math.min(DUR(), S.t + 2); } return [+a.toFixed(2), +b.toFixed(2)]; }
const NCOL = { baru: '#9aa0a8', antri: '#ff6a2b', dikerjakan: '#7fd3ff', 'siap dicek': '#ffcc33', selesai: '#4cc38a' };
async function noteOp(op) { const r = await api('/api/notes', op); if (r.error) { alert(r.error); return; } setNotes(r); }
let notesSig = '';
function setNotes(list) { const sig = JSON.stringify(list); if (sig === notesSig) return; const prev = S.notes; S.notes = list; notesSig = sig;
  for (const n of list) { const o = prev.find(x => x.id === n.id); if (o && o.status !== n.status && n.status === 'siap dicek') toast('✓ Claude: catatan ' + fmt(n.t0) + ' siap dicek'); }
  renderNotes(); }
async function pollNotes() { try { if (document.activeElement !== $('#noteText')) setNotes(await api('/api/notes')); } catch (e) {} setTimeout(pollNotes, 2500); }
async function addNote(send) { const txt = $('#noteText').value.trim(); if (!txt) return $('#noteText').focus();
  let [t0, t1] = range(); const op = { op: 'add', t0, t1, text: txt, send: !!send };
  const dm = S.draftMarks;
  if (dm && dm.boxes.length) {
    if (S.inT == null || S.outT == null) { t0 = Math.max(0, +(dm.t - 2).toFixed(2)); t1 = Math.min(DUR(), +(dm.t + 2).toFixed(2)); op.t0 = t0; op.t1 = t1; }
    op.marks = { t: dm.t, boxes: dm.boxes.map(b => b.map(Math.round)) };
    try { op.shot = await shotWithMarks(dm); } catch (e) { console.error('shot', e); }
  }
  $('#noteText').value = ''; S.draftMarks = null; setMarking(false); drawMarks(); await noteOp(op); }
// frame at the marked time (final-look still, 1 sub-frame) with the boxes burned in, so Claude sees exactly what was meant
async function shotWithMarks(dm) {
  if (!FW || !FW.renderAt) return null;
  const url = await FW.renderAt(dm.t, 1); const im = new Image(); im.src = url; await im.decode();
  const c = document.createElement('canvas'); c.width = 1920; c.height = 1080; const g = c.getContext('2d'); g.drawImage(im, 0, 0, 1920, 1080);
  g.lineWidth = 5; g.font = 'bold 30px system-ui';
  dm.boxes.forEach(([x, y, w, h], i) => { g.strokeStyle = '#ff3b6b'; g.strokeRect(x, y, w, h); g.fillStyle = '#ff3b6b'; g.fillRect(x - 2.5, y - 40, 44, 40); g.fillStyle = '#fff'; g.fillText(String(i + 1), x + 9, y - 10); });
  g.fillStyle = '#000b'; g.fillRect(0, 0, 230, 46); g.fillStyle = '#fff'; g.font = '26px ui-monospace,monospace'; g.fillText(fmt(dm.t), 14, 32);
  S.drawn = -1; return c.toDataURL('image/jpeg', 0.85);
}
// ---------- mark areas on the preview ----------
function setMarking(on) { S.marking = on; $('#markBtn').classList.toggle('on', on); $('#marks').classList.toggle('on', on);
  if (on) { play(false); if (!S.draftMarks || Math.abs(S.draftMarks.t - S.t) > 1e-3) S.draftMarks = { t: +S.t.toFixed(3), boxes: [] }; S.showMarks = null; }
  updMarkInfo(); drawMarks(); }
$('#markBtn').onclick = () => setMarking(!S.marking);
function updMarkInfo() { const el = $('#markInfo'), dm = S.draftMarks;
  if (dm && dm.boxes.length) { el.style.display = 'block'; el.innerHTML = `▭ ${dm.boxes.length} area ditandai di ${fmt(dm.t)} — ikut terkirim bersama screenshot. <a href="#" id="clrMarks" style="color:#ff8fa8">hapus tanda</a>`;
    $('#clrMarks').onclick = e => { e.preventDefault(); S.draftMarks = null; setMarking(false); }; }
  else if (S.marking) { el.style.display = 'block'; el.textContent = 'Drag kotak di layar preview pada bagian yang kurang pas. Bisa lebih dari satu.'; }
  else el.style.display = 'none'; }
function drawMarks() {
  const box = $('#marks'), st = $('#stage'), k = st.clientWidth / 1920; box.innerHTML = '';
  const put = (b, i, ro, onDel) => { const [x, y, w, h] = b, d = document.createElement('div'); d.className = 'mk' + (ro ? ' ro' : '');
    Object.assign(d.style, { left: x * k + 'px', top: y * k + 'px', width: w * k + 'px', height: h * k + 'px' }); d.innerHTML = `<b>${i + 1}</b>` + (onDel ? '<i title="hapus kotak ini">×</i>' : '');
    if (onDel) d.querySelector('i').onclick = e => { e.stopPropagation(); onDel(); }; box.appendChild(d); };
  if (S.playing) return;
  const dm = S.draftMarks; if (dm && Math.abs(dm.t - S.t) < 0.02) dm.boxes.forEach((b, i) => put(b, i, false, () => { dm.boxes.splice(i, 1); updMarkInfo(); drawMarks(); }));
  const sm = S.showMarks; if (sm && Math.abs(sm.t - S.t) < 0.02) sm.boxes.forEach((b, i) => put(b, i, true));
}
{ const mk = $('#marks'); let a = null, live = null;
  const pt = e => { const r = mk.getBoundingClientRect(), k = 1920 / r.width; return [Math.min(1920, Math.max(0, (e.clientX - r.left) * k)), Math.min(1080, Math.max(0, (e.clientY - r.top) * k))]; };
  mk.addEventListener('mousedown', e => { if (!S.marking || e.target.tagName === 'I') return; e.preventDefault(); if (Math.abs(S.draftMarks.t - S.t) > 1e-3) S.draftMarks = { t: +S.t.toFixed(3), boxes: [] };
    a = pt(e); live = [a[0], a[1], 0, 0]; S.draftMarks.boxes.push(live); });
  addEventListener('mousemove', e => { if (!a) return; const b = pt(e); live[0] = Math.min(a[0], b[0]); live[1] = Math.min(a[1], b[1]); live[2] = Math.abs(b[0] - a[0]); live[3] = Math.abs(b[1] - a[1]); drawMarks(); });
  addEventListener('mouseup', () => { if (!a) return; const bs = S.draftMarks.boxes; if (live[2] < 12 || live[3] < 12) bs.pop(); a = live = null; updMarkInfo(); drawMarks(); }); }

$('#addNote').onclick = () => addNote(false); $('#addSend').onclick = () => addNote(true);
$('#sendAll').onclick = async () => { const ns = S.notes.filter(n => !n.archived && n.status === 'baru'); if (!ns.length) return alert('Tidak ada catatan berstatus baru.');
  for (const n of ns) await noteOp({ op: 'send', id: n.id }); };
function renderNotes() {
  const ul = $('#notes'); const list = S.notes.filter(n => !n.archived);
  ul.innerHTML = list.length ? '' : '<li class="dim small">Belum ada catatan. Taruh playhead / pilih rentang, tulis, lalu "Simpan & kirim".</li>';
  for (const n of list) {
    const st = n.status || 'baru', cls = st === 'siap dicek' ? 'siap' : st;
    const li = document.createElement('li'); li.className = (st === 'selesai' ? 'done ' : '') + 'st-' + cls;
    const btn = [];
    btn.push('<button data-a="go">Lihat</button>');
    if (st === 'baru') btn.push('<button data-a="send" class="primary">Kirim ke Claude</button>');
    if (st === 'siap dicek') btn.push('<button data-a="patch">Oke → render cuplikan</button>', '<button data-a="ok">Oke, selesai</button>', '<button data-a="again">Belum, ulang</button>');
    if (st === 'selesai') btn.push('<button data-a="again">Buka lagi</button>');
    if (st !== 'antri' && st !== 'dikerjakan') btn.push('<button data-a="arch" title="disembunyikan, tidak dihapus">Arsip</button>');
    li.innerHTML = `<span class="t">${fmt(n.t0)}–${fmt(n.t1)}</span><span class="badge ${cls}">${esc(st)}</span> <div class="txt">${esc(n.text)}</div>
      ${n.shot ? `<img class="shot" src="/p/${esc(n.shot)}" alt="area" data-a="shot">` : ''}${n.reply ? `<div class="reply">Claude: ${esc(n.reply)}</div>` : ''}<div class="row">${btn.join('')}</div>`;
    li.onclick = e => { const a = e.target.dataset.a || (e.target.classList.contains('t') && 'go'); if (!a) return;
      if (a === 'shot') { $('#dlgBody').innerHTML = `<img src="/p/${esc(n.shot)}" style="width:100%">`; $('#dlg').showModal(); return; }
      if (a === 'go') { S.showMarks = n.marks || null; seek(n.marks ? n.marks.t : n.t0); S.inT = n.t0; S.outT = n.t1; S.scroll = Math.max(0, n.t0 - view().span * 0.2); updRange(); }
      if (a === 'send') noteOp({ op: 'send', id: n.id });
      if (a === 'patch') { startPatch(n.t0, n.t1, false, n.text); }
      if (a === 'ok') noteOp({ op: 'status', id: n.id, status: 'selesai' });
      if (a === 'again') { const more = prompt('Apa yang masih kurang? (opsional)', ''); if (more === null) return;
        (more.trim() ? noteOp({ op: 'edit', id: n.id, text: n.text + '\n↳ revisi: ' + more.trim() }) : Promise.resolve()).then(() => noteOp({ op: 'send', id: n.id })); }
      if (a === 'arch') noteOp({ op: 'archive', id: n.id }); };
    ul.appendChild(li);
  }
}

// ---------- patches ----------
async function startPatch(t0, t1, draft, note = '') {
  if (t1 - t0 > 120) return alert('Maksimal 120 detik per cuplikan.');
  const n = Math.round((t1 - t0) * S.M.fps);
  if (!confirm(`Render ${draft ? 'DRAFT' : 'kualitas final'} ${fmt(t0)}–${fmt(t1)} (${n} frame)?\nPerkiraan: ${draft ? '±' + Math.ceil(n * 0.08 / 60) : '±' + Math.ceil(n * 0.6 / 60)} menit.`)) return;
  const r = await api('/api/patch', { t0, t1, draft, note }); if (r.error) alert(r.error); pollPatches();
}
$('#patchRange').onclick = () => { const [a, b] = range(); startPatch(a, b, false); };
$('#draftRange').onclick = () => { const [a, b] = range(); startPatch(a, b, true); };
let pollT = null;
async function pollPatches() {
  clearTimeout(pollT); const r = await api('/api/patches'); S.patches = r.patches; S.running = r.running;
  const ul = $('#patches'); ul.innerHTML = '';
  for (const p of S.running) ul.insertAdjacentHTML('beforeend', `<li><span class="t">${fmt(p.t0)}–${fmt(p.t1)}</span> <span class="st">sedang render…</span></li>`);
  for (const p of S.patches) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="t">${fmt(p.t0)}–${fmt(p.t1)}</span> <span class="st ${p.status === 'done' ? 'done' : ''}">${p.draft ? 'draft · ' : ''}${p.status}${p.secs ? ' · ' + p.secs + 's' : ''}${p.applied ? ' · dipasang' : ''}</span>
      ${p.note ? `<div class="small dim">${esc(p.note)}</div>` : ''}
      <div class="row">${p.compare_url ? '<button data-a="cmp">Sebelum | Sesudah</button>' : ''}${p.clip ? '<button data-a="clip">Putar</button>' : ''}<button data-a="go">Ke sini</button></div>`;
    li.onclick = e => { const a = e.target.dataset.a; if (!a) return;
      if (a === 'go') seek(p.t0);
      else { play(false); $('#dlgBody').innerHTML = `<p class="mono">${esc(p.id)}</p><video controls autoplay src="${a === 'cmp' ? p.compare_url : p.clip}"></video>`; $('#dlg').showModal(); } };
    ul.appendChild(li);
  }
  if (!S.patches.length && !S.running.length) ul.innerHTML = '<li class="dim small">Belum ada. Pilih rentang lalu "Render cuplikan".</li>';
  pollT = setTimeout(pollPatches, S.running.length ? 3000 : 15000);
}
$('#dlg').addEventListener('close', () => { const v = $('#dlg video'); if (v) v.pause(); });

// ---------- keys ----------
$('#play').onclick = () => play(); $('#back').onclick = () => seek(S.t - 1); $('#fwd').onclick = () => seek(S.t + 1);
$('#setIn').onclick = () => { S.inT = S.t; if (S.outT != null && S.outT < S.inT) S.outT = null; updRange(); };
$('#setOut').onclick = () => { S.outT = S.t; if (S.inT == null || S.inT > S.outT) S.inT = Math.max(0, S.t - 2); updRange(); };
$('#help').onclick = () => { $('#dlgBody').innerHTML = `<h3>Shortcut</h3><p>Space play/pause · ←/→ 1 frame · Shift+←/→ 1 detik · [ / ] keyframe sebelum/berikut · Home/End<br>R / tombol ▭ = tandai area di layar (drag kotak, bisa banyak; ikut terkirim + screenshot) · zoom layar sampai 200% (scroll untuk geser)<br>I / O titik masuk/keluar · Esc / X / tombol × = hapus rentang (bendera oranye bisa digeser; nempel ke keyframe/subtitle, tahan Alt = bebas) · N simpan catatan · Shift+drag timeline = pilih rentang · Ctrl+scroll zoom</p>
  <p><b>Live (cepat)</b> digambar langsung dari source: tanpa motion blur, warna/teks/posisi sama dengan final.<br><b>Hasil render</b> = frame render terakhir (final).<br><b>Render cuplikan</b> = render bagian itu saja di kualitas final + video Sebelum|Sesudah.</p>`; $('#dlg').showModal(); };
addEventListener('keydown', e => {
  if (e.target.tagName === 'TEXTAREA') { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addNote(true); return; }
  const fr = 1 / S.M.fps;
  if (e.code === 'Space') { e.preventDefault(); play(); }
  else if (e.key === 'ArrowLeft') seek(S.t - (e.shiftKey ? 1 : fr));
  else if (e.key === 'ArrowRight') seek(S.t + (e.shiftKey ? 1 : fr));
  else if (e.key === '[' || e.key === ']') { const ks = [...(S.M.keys || []).map(k => k.t), ...(S.M.trans || [])].sort((a, b) => a - b);
    const k = e.key === ']' ? ks.find(x => x > S.t + 1e-3) : [...ks].reverse().find(x => x < S.t - 1e-3); if (k != null) { seek(k); const V = view(); if (k < S.scroll || k > S.scroll + V.span) S.scroll = k - V.span / 2; } }
  else if (e.key === 'Home') seek(0); else if (e.key === 'End') seek(DUR());
  else if (e.key === 'r') setMarking(!S.marking); else if (e.key === 'Escape') { if (S.marking) setMarking(false); else clearRange(); }
  else if (e.key === 'x') clearRange();
  else if (e.key === 'i') $('#setIn').click(); else if (e.key === 'o') $('#setOut').click();
  else if (e.key === '-') setVz(S.vz - 0.1); else if (e.key === '=' || e.key === '+') setVz(S.vz + 0.1); else if (e.key === '0') setVz(1);
  else if (e.key === 'n') { e.preventDefault(); $('#noteText').focus(); }
});

// ---------- live reload: Claude edits the source -> the preview reloads at the same time ----------
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 4000); }
async function reloadFilm() {
  const wasPlaying = S.playing; if (wasPlaying) play(false);
  const M = await api('/api/meta'); const audioChanged = M.audio && S.M.audio; S.M = M; if (!S.M.dur && FW && FW.NFRAMES) S.M.dur = FW.NFRAMES / FW.FILM_FPS;
  if (audioChanged) { const ct = audio.currentTime; setupAudio(); audio.currentTime = ct; syncExtra(true); }
  $('#loading').style.display = 'flex'; $('#loading').textContent = 'source berubah, memuat ulang…'; FW = null;
  $('#film').src = '/p/src/index.html?studio=1&v=' + Date.now();   // onload handler re-attaches FW, keeps S.t
  toast('↻ source diperbarui ' + new Date().toLocaleTimeString());
}
async function watchSource() {
  try { const v = (await api('/api/version')).v; if (v !== S.ver) { S.ver = v; if ($('#auto').checked) await reloadFilm(); else toast('source berubah — centang auto-reload atau refresh'); } } catch (e) {}
  setTimeout(watchSource, 1500);
}
