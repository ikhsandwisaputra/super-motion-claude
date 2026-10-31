# Kiblat Ikhsan — the taste DNA of the videos he loves

`my-ref/` holds the videos Ikhsan chose because he loves their DNA: the feel, the SFX, the pleasure of watching, the motion, the typography, the elements, the movement and the angles ("mantab, profesional, kreatif — ini kiblatmu"). They are the compass, not the limit: every film stays original (concept, world, palette, copy, characters), but the craft and the rasa are measured against this kiblat.

## How to use it
1. No specific reference in the brief → the kiblat IS the reference. Targets come from `my-ref/_eye/kiblat/kiblat.json` (medians of every liked video); review renders with `eye.py review <render> --ref my-ref/_eye/kiblat/kiblat.json`.
2. A specific reference in the brief → measure it (`eye.py dna`), and use the kiblat for everything the reference doesn't decide.
3. SIGNATURE traits (consistent across the kiblat) are kept unless the concept clearly needs otherwise — say why. FREE traits are decided per concept.
4. New liked videos go into `my-ref/`; run `eye.py dna <video> --autocrop` for each and `eye.py kiblat my-ref` again; update this file.

(The measured DNA and the qualitative reading follow below; they are rebuilt whenever `my-ref/` changes.)

## Measured DNA (14 videos, 357 s, measured 2026-10-29 with `eye.py dna --autocrop` + `eye.py kiblat my-ref`)
**Signatures — the same in almost every liked video (keep them):**
| trait | kiblat | what it means for our films |
|---|---|---|
| colours per frame | 3 (3–3.75) | background + type + ONE accent; the 3-colour rule is his taste, not a theory |
| accents per frame | exactly 1 | one accent at a time — it may change per section (6–7 accent families over a film) |
| neon frames | 1 % | no neon look. Video-3's dark-mode neon is the opposite of this taste |
| muddy frames | 20 % (14–23 %) | values are clean: either really light or really dark with clear type |
| crowded frames | ≤ 6 % | never cluttered |
| eye jump at cuts | median 0.22 of the diagonal, big jumps 33 % | the eye mostly lands near where it was; big relocations come with a full-frame change |
| 1-frame impacts | 0 per minute | no invert/flash frames — punch comes from scale, timing and SFX, not strobes |
| audio onsets | 2.5 per second (2.35–2.71) | a steady, crisp rhythm of SFX/music hits under the visuals |
| boomy onsets | 0 % | no booms or sub drops on hits (same lesson as video-1) |
| silence | 12 % (10–16 %) | short breaths of silence, not wall-to-wall sound |

**Free — varies between the videos (decide per concept, within these ranges):**
| trait | median (IQR) |
|---|---|
| time between visual changes | 2.0 s (1.4–2.9) · 3 cuts per 10 s |
| colour fields | 3 (2–5) · ΔE between shots 37 (20–44) · value range across shots 92 L (53–95) |
| L median of frames | 46 (17–88) — light fields are as common as dark ones |
| type contrast against the background | 69 L (52–84) |
| negative space | 72 % (50–82 %) · "empty" frames 31 % — airy, minimal compositions with small type are part of the taste |
| camera alive on holds | 18 % (8–37 %) — mostly a still camera; the ELEMENTS move |
| bursts / holds | 29 % / 29 % · punch 7.7× (5.7–13.8) |
| music | 131 BPM (113–162), beat strength 0.47 |

Scores against the kiblat (`review --ref my-ref/_eye/kiblat/kiblat.json`): video-2 88, video-3 72 (tells: one dark field, muddy, dark-mode + neon accents, small type in dark emptiness, weak hierarchy).

## What the kiblat looks like (read from `my-ref/_eye/kiblat/kiblat_board.jpg`)
- **10 of 14 are premium product / UI promos** (app and AI-tool ads in the style of modern tech launch films): light or off-white fields, tiny centred copy fragments that set up a reveal ("Every day.", "Therefore", "Your body is constantly…"), then UI components as the heroes — pills, input bars, cards, icons, charts, phone/watch mockups, glass panels — floating in 2.5D with soft shadows; one brand accent per film (orange, lime, green, violet, red, glass blue); radial gradient blobs as section fields; a wordmark/logo resolve at the end.
- **Dark sections exist but are deliberate and lit**: deep navy/black with glowing glass UI or a gradient sun, or a dark monochrome green brand piece with heavy depth of field — never a uniform dark field with dim ghost elements.
- **Colour script pattern**: two extreme value fields (light ≈ L 90–99 vs dark L 0–18) plus ONE brand hue that appears as blurred light, a blob or a bloom; the field changes per section (ΔE 20–56).
- **Editorial collage** (photos cut into UI, kinetic word lists where neighbours fade, icons placed between words of a title) and one mixed-media sports-doc collage (B/W photo cut-outs, paint, paper, hand annotations in 2.5D).
- **One brutal kinetic-type piece** ("BOLD / RESILIENCE / WHO WE ARE"): huge warped/stretched condensed type, photo cut-outs, brush stroke swoosh, 0.7 s shots — the hype recipe as a counterpoint.
- Two portrait clips are screen recordings of the making-of (process content), not style targets.

## Craft seen frame by frame (per-video notes in `my-ref/_eye/<video>/breakdown.md`)
- **One persistent object carries the film** across cuts and becomes or completes the logo at the end (a rolling ball, a light ribbon, an app icon, a playhead, a glass orb). It is the eye's anchor — the handoff device of `eye-camera-space.md` used as the story's spine.
- **Match-morph instead of transitions**: in 7–8 frames a small element becomes the next hero (dot → badge → button → logo) while the background changes under a fixed anchor (≈ 11 L per frame).
- **Grid hub**: a ~6-frame zoom-out to a recap grid of cards, later a 2-frame push through one card into a colour field (~9 frames), then a cut to the logo.
- **Cuts smoothed with optics**, not wipes: 1–4 frames of motion blur, cut into a fully defocused frame and pull focus over ~5 frames while the camera drifts, bloom-to-white for 3–4 frames, a 0.3 s colour field.
- **Type is calm**: one sans family, sentence case, set-ups at 3–9 % of frame height (logo lockups 15–22 %); emphasis by colouring the active word (a sweep of ≈ 3 frames per word), icons used as words, letter-by-letter type-on — never slams.
- **Pitch-deck grammar** in one reference: a locked stage card with a chapter nav (Intro / Problem / Use case / Call to action) and a moving playhead; holds 57 % kept alive by small push-ins.
- **Impact frames are rare**: one video lands a 2–3 frame invert within 0.09 s of a music hit (and flashes 4× in one second at 3.6 s — over the 3/s limit, not to copy); a logo smear of ≈ 1.4× as an object rolls past.
- **Ring-expand reveal**: the mark becomes a blurred ring that scales ×1 → ×6 in 6 frames; its colours stay on as a soft corner bloom for the rest of the film — the accent lives as light, never as neon lines.
- **Object becomes container**: a padlock shrinks into a black box that becomes the pill behind the next word, typed at ≈ 2 frames per letter.
- **Blur is the glue**: a push through the text that speeds up ×6 in 4 frames with zoom blur; blur-dip transitions of 5–6 frames; an 8-frame rack focus + truck. Defocus, zoom blur, rack focus or whiteout over ~4–8 frames replace wipes.
- **Word slot**: a fixed key word stays while the accent word rolls into its slot in 4–5 frames, leaving a 3-frame ghost; sentences build word by word and re-centre. White ↔ black cuts land on the beat with a 1-frame smear.
- **Pull-back reveal**: extreme close-up → pull-back easing out over ~11 frames, revealing layered cut-outs through parallax; hand annotations write on one after another (the mixed-media collage reference).
- **Logo hit (9 frames)**: draw-on + iris-in + one complementary-colour invert frame; or a giant cropped word panned with an ease-out, then a cut to the readable line. 0.15–0.2 s micro-pauses in the sound before hits.
- **Timing**: entrances 3–5 frames easing out, stagger 2–6 frames, long holds; each word-level event 2–4 frames.
- **Shape relay opening**: one shape carries the first 3 s — blob → giant word → cloud seen through ribbed glass → pill → capsule → dots — 4–6 words at 0.3–0.6 s per state.
- **"Arrive hot, settle cool"**: each element enters tinted in the accent, blurred and slightly stretched, then resolves to ink colour and sharp in 5–8 frames; ≈ 0.1 s between elements. Focus pulls replace cuts.
- **Tint-to-truth**: the next world wipes in over ~6 frames as an accent duotone, then fades to natural colour in 5–13 frames.
- **Colour-bomb cut**: ~5 completely still frames, then a hard cut to a full-frame gradient, then type-on at 2–3 frames per letter.
- **Word swap**: split a word, roll the halves vertically, rejoin — 9 frames. Chips that burst into streaks and land as map pins in ~7 frames while the centre chip stays put.
- **The brutal counterpoint** (one video): ultra-black condensed capitals at 45–110 % of frame height, warped/twisted words, heavy grain, an on-beat palette swap (same layout, colours swapped for 2–3 frames — cap at 3 per second), a wavy horizontal-slice exit, a 4-frame stepped zoom-out that reveals more of the word.
- **Camera locked on holds** (camera moves in only 5–20 % of holds); energy comes from objects, type and cuts. Hits last 2–6 frames; single-frame flashes are not part of the taste.
- **Flash warnings inside the kiblat itself**: one video flashes 5× in a second at 6.8 s, another 4× at 3.6 s — over the 3/s limit. Learn the move, not the rate.
- **Sound** (measured, not heard): no bass/boom hits in any video, bright transients, cuts locked to onsets 63–100 % of the time; the bed changes per film — music 115–172 BPM with 2.3–3.5 bright ticks/pops per second, a VO-led piece over a soft 67 BPM bed with 0.15–0.45 s gaps between phrases, a sparse-SFX teaser with 62 % silence, a loud hype track. Silence sits mostly at the start, the end and before reveals.

## The default formula when Ikhsan only gives a concept
Recipe 1 (clean tech / product motion) with the kiblat's numbers, unless the concept clearly asks for the hype counterpoint (recipe 2):
- **World**: the product's own UI and objects, rebuilt as clean components that float in 2.5D on light fields; dark sections only as lit "night" moments with glass or a light source.
- **Colour script**: off-white / light grey fields alternating with 1–2 deep sections; ONE accent per section (brand colour first); radial gradient blobs for section turns; 3 colours per frame.
- **Type**: one clean grotesk (2 weights); copy as short fragments, centred, small (≈ 2.5–4 % of frame height) for set-ups, then a big hero (wordmark, number, key word) — the 70/30 rule in its most minimal form; one accent word per phrase.
- **Spine**: one persistent object (a dot, a ball, a pill, an icon) that carries the eye across cuts, morphs into the next hero and resolves as the logo.
- **Motion**: the camera mostly still, the elements move; entrances 3–5 frames easing out (UI snaps with long cushions), stagger 2–6 frames, "arrive hot, settle cool" (tinted + soft → ink + sharp in 5–8 frames); components stack in rhythm with the music; a visual change about every 2 s.
- **Transitions**: match-morph, zoom into/out of cards, word slot, ring-expand, tint-to-truth — glued by 4–8 frames of blur, focus pull or bloom. Hard 1-frame hits at most a couple per minute, never above 3 flashes per second.
- **Sound**: music bed 110–170 BPM with crisp clicks/pops ≈ 2.5 per second (or a sparse-SFX / soft VO bed), no booms, cuts on onsets, 0.15–0.2 s micro-pauses before hits, silence before reveals.
- **Never**: dark-mode neon on one field, more than one accent at a time, clutter, strobe/invert frames as a crutch, wipes from a preset list.
