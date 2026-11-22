// Tes B · Foto Jadi Ruang (lokal 0–4 s). STUB: panggung gelap + label; VO/hit/caption sudah final.
// VO 06 [153,00–154,70] "Cuma dua persen." mulai 1,0. Hit stk2 di 0 (potongan A → B).
import { W, H, ROOM, GREY, MN, setFont } from './kit.js';

export function makeB() {
  return {
    hits: [['stk4', 0, .9]],
    vo: [{ file: 'dkd_vo_ahmad_06', from: 153.00, to: 154.70, at: 1.0 }],
    lines: [{ t0: 1.08, t1: 2.64, text: 'Cuma dua persen.' }],
    keys: [[1.0, 'VO mulai'], [1.52, 'padam di "dua"']],
    sfx: [],
    async load() {},
    draw(ctx) {
      ctx.fillStyle = ROOM; ctx.fillRect(0, 0, W, H);
      setFont(ctx, MN(22, 400), 4); ctx.fillStyle = GREY; ctx.textAlign = 'center'; ctx.fillText('B · FOTO JADI RUANG — sedang dibangun', W / 2, H / 2);
      ctx.textAlign = 'left'; ctx.letterSpacing = '0px';
    },
  };
}
