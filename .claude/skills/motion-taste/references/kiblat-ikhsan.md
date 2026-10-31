# Kiblat Ikhsan — the taste DNA of the videos he loves

`my-ref/` holds the videos Ikhsan chose because he loves their DNA: the feel, the SFX, the pleasure of watching, the motion, the typography, the elements, the movement and the angles ("mantab, profesional, kreatif — ini kiblatmu"). They are the compass, not the limit: every film stays original (concept, world, palette, copy, characters), but the craft and the rasa are measured against this kiblat.

## How to use it
1. No specific reference in the brief → the kiblat IS the reference. Targets come from `my-ref/_eye/kiblat/kiblat.json` (medians of every liked video); review renders with `eye.py review <render> --ref my-ref/_eye/kiblat/kiblat.json`.
2. A specific reference in the brief → measure it (`eye.py dna`), and use the kiblat for everything the reference doesn't decide.
3. SIGNATURE traits (consistent across the kiblat) are kept unless the concept clearly needs otherwise — say why. FREE traits are decided per concept, and the kiblat now has two pillars (below): pick the pillar first, then read the free ranges from it.
4. New liked videos go into `my-ref/`; run `eye.py dna <video> --autocrop` for each (a screen recording: `--crop` the canvas), `eye.py kiblat my-ref` again, then `replay.py`; update this file. Byte-identical duplicates go to `my-ref/_duplikat/` so no video is counted twice.
5. Re-judging a kiblat member: pass its crop (`--crop` from its `dna.json` → `sig.crop`), or `review`/`dna` re-cache its DNA uncropped and the next kiblat rebuild uses the wrong numbers.

(The measured DNA and the qualitative reading follow below; they are rebuilt whenever `my-ref/` changes. Version 1, 14 videos, is archived in `my-ref/_eye/kiblat/_arsip_v1_14ref/`.)

## Version history
- **v1 (2026-10-29, afternoon)** — 14 videos, 357 s: mostly premium product/UI promos on light fields.
- **v2 (2026-10-29, evening)** — 41 videos, ≈ 1010 s. Ikhsan added 27 more (28 sent, one was a byte-identical duplicate of 15.10.18 (1)). The new batch is faster and adds a second pillar: editorial collage / music-poster motion. It agrees with his note on video-5 ("terlalu lambat").

## Measured DNA v2 (41 videos, measured 2026-10-29 with `eye.py dna --autocrop` + `eye.py kiblat my-ref`)
**Signatures — the same in almost every liked video (keep them):**
| trait | kiblat v2 | v1 | what it means for our films |
|---|---|---|---|
| colours per frame | 3 (3–4) | 3 | background + type + ONE accent; collage pieces stretch to 4 |
| accents per frame | exactly 1 | 1 | one accent at a time — it changes per section (6–8 accent families over a film) |
| type contrast vs background | **80 L (69–88)** | 69, free | NEW signature: type always pops off its field, whatever the field is |
| neon frames | 1 % | 1 % | no neon look. Video-3's dark-mode neon is the opposite of this taste |
| 1-frame impacts | 0 per minute (median) | 0 | 6 of the 27 new videos do use them; the median stays 0 — punch comes from scale, timing and SFX |
| audio onsets | **2.7 per second (2.4–3.1)** | 2.5 | a slightly denser, crisp rhythm of SFX/music hits |
| boomy onsets | 0 % | 0 % | no booms or sub drops on hits, in all 41 |
| silence | 13 % (8–18 %) | 12 % | short breaths of silence, not wall-to-wall sound |

**No longer signatures (v1 → v2):** muddy frames (now 22 %, 13–33 %), crowded frames (5 %, 0–18 %) and eye jump at cuts became FREE, because the collage pillar breaks them on purpose. Our default (clean) films keep the v1 discipline: ≤ 6 % crowded, mud ≤ 25 %.

**Free — decide per concept, within these ranges:**
| trait | v2 median (IQR) | v1 | read |
|---|---|---|---|
| time between visual changes | **1.5 s (1.0–2.2)** · 2.9 cuts per 10 s | 2.0 s | faster: the 27 new ones alone run 1.3 s |
| bursts / holds | **37 % / 26 %** · punch 5.8× (4–9) | 29 / 29, 7.7× | more continuous motion, fewer isolated punches |
| colour fields | 3 (2–5) · ΔE between shots 37 (21–48) · value range 86 L (63–95) | same | every film still swings between near-white and near-black |
| L median | 48 (16–73) | 46 | light and dark fields equally common |
| negative space | 58 % (39–79 %) · "empty" frames 26 % | 72 % | **but 71 % with one vote per creator**: four of the dense collage videos come from one creator. The airy taste holds; density is that creator's house style |
| camera alive on holds | 17 % (5–22 %) | 18 % | still a mostly locked camera; the ELEMENTS move |
| flashes | median 2/s, IQR 1–3 | 1.5 | 6 of the 27 new videos go over 3/s (up to 8/s) — learn the move, never the rate |
| music | 129 BPM (110–157), beat strength 0.54 | 131, 0.47 | more beat-driven (lyric edits) |

Scores against kiblat v2 (`replay.py`, 2026-10-29 21:18): video-2 88 (unchanged), video-3 60 (was 64; its slow pacing now loses more), kiblat members median 76. The lowest member is 20.47.56 (1) at 48, the dark glass "who is vertex?" teaser: the eye still reads it as the video-3 look (one black field, 93 % mud, hue-cycling accent). See "Dark-neon outliers" below.

## The two pillars (read from `kiblat_board.jpg` and the 41 breakdowns)
**Pillar 1 — premium product / UI promo (20 of 41).** Light or off-white fields alternating with lit black; tiny centred copy fragments that set up a reveal; UI components as heroes (pills, input bars, cards, toggles, icons, phones, glass panels) floating in 2.5D with soft shadows; one brand accent per film; gradient blobs as section fields; a wordmark resolve. v2 added: monochrome AI-chat promos where light itself is the accent; a maximal fintech piece (3D cards, rays — hype-leaning); a dark glass portfolio teaser.

**Pillar 2 — editorial collage / music-poster motion (15 of 41, new in v2).** Mostly lyric or fan edits, a studio brand film, a zine and travel montages: paper fields (cream, oxblood, light grey) with B/W or film-photo cut-outs, halftone, tape, stickers, hand marker, ransom-note letters, newspapers, maps and Japanese poster type. Accents are FLAT and matte (signal red, magenta, cobalt, a primary trio), never glow. Type pairs a heavy extended grotesk (caps on label blocks) with a script or serif counterpoint; monospace typewriter lines with a caret; "UI-native" type that borrows the host UI's own font. Rhythm: a shot every 0.4–0.9 s on the beat, often on twos with a paper boil. Four of these come from one creator and two from another.

**Also in the kiblat:** two kinetic-type pieces (one brutal light-on-dark from v1, one dark-neon 3D lyric edit), and four making-of screen recordings (process content, measured on the canvas where possible; not style targets).

## Craft seen frame by frame (per-video notes in `my-ref/_eye/<video>/breakdown.md`)
### Kept from v1 (still true, now seen in more videos)
- **One persistent object carries the film** across cuts and becomes or completes the logo (ball, light ribbon, app icon, playhead, glass orb, a dot that opens and closes a loop).
- **Match-morph instead of transitions** (7–8 frames, small element → next hero over a fixed anchor), **grid hub**, **ring-expand**, **word slot**, **tint-to-truth**, **colour-bomb cut**, **"arrive hot, settle cool"** (tinted + soft → ink + sharp in 5–8 frames, ≈ 0.1 s apart).
- **Blur is the glue**: defocus, zoom blur, rack focus or whiteout over ~4–8 frames instead of preset wipes.
- **Type is calm in pillar 1**: one sans, sentence case, set-ups at 2–6 % of frame height, emphasis by colouring or boxing the active word.
- **Camera locked on holds**; hits last 2–6 frames.

### New in v2 — pillar 1 (UI promo)
- **Value flip under a fixed anchor**: every cut flips white ↔ black while the centre object keeps its place and changes identity (logo → send button → dot → orb → logo). Variants: a grey dip (L ≈ 50, 2–3 frames of directional blur, 7–9 frames total), a map switching light → dark mode under a pin that stays put (5–9 frames), a horizon band sliding down in 4 frames, a 0.3 s black beat with blurred debris of the old shot carried 2 frames into the new one.
- **The word becomes the UI**: the middle word of a sentence turns into an input pill in 4 frames, then text is typed into it; a pill stretches into the input bar in 3 frames; a button is a portal (3-frame push until its fill is the next field, label kept as the headline); an icon stretches into a card in 10 frames with its glyph sliding into the corner as a badge; the whole frame shrinks into a rounded square → circle → map pin (11–12 frames).
- **Click chain**: each click pales the component for 1–2 frames, then it blurs and reshapes in 3–6 frames into the next component in the same spot; six states in a row, no cut.
- **The cursor is the actor**: a hand cursor triggers every change (a drag stretches a button into a pill over 14 frames, the fill colour follows the value); a selection box sweeps the key word in 6 frames; a typing cursor deletes the line while a warm light floods up from below in 5 frames; the film ends as a selected word shrinking into an I-beam.
- **Type entrances**: words fly in on curved paths dragging a thin accent arc trail (accent + blurred → ink + sharp in 10–13 frames, stagger 2–4); jumpy typing (each new word lands from ±½ x-height in ≈ 3 frames); tracking collapse (letters arrive wide and blurred, tighten and sharpen in 11 frames); decode in ≈ 4 frames; caret type-on at 1–2 frames per letter.
- **Collapse, then bang**: problem cards defocus into dots while the field dims (8 frames), the dots orbit and shrink to one point (14), a light disc bursts to fill the frame (13). Also a "variant fan": one card opens into 5 colour variants in 9 frames and folds back into the next line (5 colours for those frames only).
- **Power-on**: flat UI turns into lit glass in 1 frame and its bloom settles over 4; a device rises from the bottom and covers the frame in 8.
- **Screen dive / portal loop**: a slow ~30-frame push on a laptop, then an 8-frame acceleration into its screen with an 8° roll and no cut; a window at the end grows and turns 45° over ~31 frames until it is the frame, looping to frame 1.
- **No-cut board**: every fact sits at its own spot on one board; the camera trucks between spots in ≈ 6 frames with motion blur and drifts on holds.

### New in v2 — pillar 2 (editorial collage)
- **Paper boil on twos**: held elements jitter (±2° per frame, tape letters rebuilt one stroke per frame), the motion animated on 2s (50–62 % held frames), a 1-step scale pop of ×1.15–1.3 before a cut. Keep the brightness boil ≤ 2 L: one reference's 10–14 L paper boil produced 3 impacts and 5 flashes per second.
- **Strip accordion / word-bar sandwich**: every 2 beats (≈ 0.9 s) each of 4 photo strips slides 15–20 % of the frame in ≈ 6 frames (expo-out) and the strip heights change; word bars split apart in ≈ 5 frames so photo strips slide into the gaps.
- **Organic colour flood**: a soft paint bloom, a brush/liquid wipe in the next field's colour (4 frames), colour flooding up from the bottom, a word turning into spray dust that grows into the next field (7 frames).
- **Type melts and gathers**: a word block melts into an ink blob in 3 frames and the blob becomes the next word; scattered letters gather into a word over ≈ 17 frames; labels land 1 frame each with blur and leave one letter per frame, then a 4-frame smear.
- **Pull-back to the board**: 4 frames of analog jitter synced to an SFX roll, 1 fully defocused frame, then 3 frames zooming out to the page tilted ≈ 15°; the screen turns out to be a printed photo on a table (7–8-frame pull-back, then a 4-frame whip inside the newspaper).
- **Rotation as a cut**: cut in the middle of a 45° rotation, the new scene spins back to level in 4 frames while foreground pieces stay through the cut; a 2-frame blurred whip onto a collage wall curved like a cylinder.
- **The UI acts out the line** (lyric edits): each lyric line lives in a rebuilt UI — a calendar event, a search box, a newspaper headline, map callouts — and the UI performs it (a checkbox + strikethrough 2 frames after typing ends; ring text rotating slowly around a pin on holds; a brightness slider dragged down dims the whole frame in 3 frames).
- **Chapter frame + hourglass pacing**: calm minimal type at the start and end (shots 4–9 s), a very fast middle (clips 0.2–0.8 s) held inside a rounded "screen" card with a chapter tag and a thin progress bar, so the eye has a frame while the content races. 1–2 black frames between clips like film splices.
- **Logotype from merging words**: three words slide together over ≈ 38 frames, 0.85 s of silence, then three accent stripes slide behind and thicken in 8 frames.
- **Seamless loops**: open and close on the same dot or the same four grid lines (lines move on the beat, become gutters, cells fill in 7 frames).
- **World-driven transitions**: a theatre window drops in 3 frames with squash & stretch (1.12× → 0.92× → settle), a curtain opens over 16 frames, a dolly through the window in 6, "house lights up" from black to cream in 14.
- **Mosaic and decode**: a 3-step pixel-mosaic outro, mosaic-to-sharp reveals, captions that decode letter by letter.

### Sound (measured, not heard)
No boomy onsets in any of the 41. Cuts land on onsets 60–96 % of the time (the studio brand film 96 %). Collage/lyric pieces are song-driven, 2.4–4.1 onsets per second and only 5–8 % silence, but they still leave 0.6–1.2 s gaps right before big changes; one opens on a soft bed ≈ 17 dB under the song and drops the full track exactly as the curtain opens. UI promos cluster SFX per UI action with ≈ 1 s gaps, or ride a 110–180 BPM bed with 0.15 s silences before reveals. Several references are mastered very loud (RMS p95 −3.5 to −4 dB, 11–12 dB range) — that is their mastering, not a target; ours stays at −14 LUFS (motion-sound-design).

## Dark-neon outliers (open question for Ikhsan)
Two liked videos are exactly the look the eye punishes: 20.47.56 (1), the "who is vertex?" portfolio teaser (one black field, 93 % mud, a keyword cycling hue on every beat, violet glass UI with outline glow), and 20.47.59, a 3D lyric edit (L median 3.8, 17 % neon, every white word glowing). The breakdowns say: borrow the moves (search bar typed then "powered on" into lit glass, a 13.6 s one-shot showreel inside a device, an echo caption typed beside the hero, extrusion stretched ×3 as a smear on exit, a stepped picture-in-picture shrink), not the look. Until Ikhsan says he loves the look itself, the video-3 lesson ("neon sampah") stands and these two are learned for their moves only.

## The default formula when Ikhsan only gives a concept
Pick the pillar from the brief first:
- **Product, app, SaaS, AI tool, company → pillar 1 (recipe 1, clean tech)** with the kiblat's numbers.
- **Music, culture, fashion, a person, an event, a studio's own brand → pillar 2 (recipe 2's editorial-collage variant)**, still under the signatures (1 accent per frame, type contrast ≈ 80 L, no booms, no glow).

Shared:
- **Tempo**: a visual change about every 1.5 s (1.0–2.2), bursts ≈ 35 %, no slow phases; a longer film means more beats, not longer holds.
- **Colour script**: two extreme value fields (near-white vs near-black) plus ONE accent per section; 3 colours per frame (4 allowed in collage); flat accents, light only from real light sources.
- **Type**: pillar 1 — one clean grotesk (2 weights), short centred fragments at 2.5–6 % of frame height, then a big hero; pillar 2 — heavy extended grotesk + one script/serif counterpoint, label blocks, caret or decode type-on.
- **Spine**: one persistent object (dot, pill, icon, cursor, a frame) that carries the eye across cuts and resolves as the logo or closes the loop.
- **Motion**: camera mostly still, elements move; entrances 3–5 frames easing out, stagger 2–6 frames; pillar 1 uses "arrive hot, settle cool", the word-becomes-UI and the value flip under a fixed anchor; pillar 2 uses on-twos boil (≤ 2 L), strip/bar layouts and colour floods.
- **Transitions**: match-morph, value flip under a fixed anchor, zoom into/out of cards or boards, word slot, ring-expand, colour flood, rotation cut — glued by 4–8 frames of blur, focus pull or bloom. Hard 1-frame hits at most a couple per minute, never above 3 flashes per second.
- **Sound**: VO-first when there is narration; otherwise a music bed 110–170 BPM with crisp clicks/pops ≈ 2.7 per second, no booms, cuts on onsets, 0.15–0.3 s micro-pauses before hits and 0.6–1 s before the big reveal, silence ≈ 13 %.
- **Never**: dark-mode neon on one field, more than one accent at a time (except a deliberate few-frame variant fan), glow on type, strobe/invert frames as a crutch, wipes from a preset list, copying a reference's world, copy or edit.
