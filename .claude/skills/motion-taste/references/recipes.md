# Combination recipes (pick ONE as the frame, then make it yours)

A recipe is a starting skeleton, not a template: keep its rules, change palette, type, world and signature move per film. Mixing two recipes is allowed only as "structure from A + texture from B" written in the formula rasa. Numbers are starting points; measure the result with `motion-eye`.

Which studio tricks (smear, 1-frame impact, metaball, slit-scan, echo, reactive optics, wrapping…) fit each recipe: the table at the top of `studio-tricks.md`.

Engine knobs referred to below (see `motion-video-engine/references/engine-api.md`): room camera `view(t) → {pos, look, roll, fov, focusDist, aperture, maxblur, bloom, exposure}`, type camera `tcam: camPath([...])`, `post(t) → {sat, contrast, glow, grain, ca, vig, warm, flash, blurX, mode, pix, glitch}`, `fast(t)` forces 6 motion-blur samples. Lens → `fov` table in `eye-camera-space.md`.

---

## 1. Clean tech / corporate modern (kinetic grid, bento)
- **Use when:** SaaS, ERP (Edig ERP), LIMS (EdigLab), dashboards, B2B explainers, product UI, investor decks in motion. Audience wants clarity and trust.
- **Don't use when:** the message is emotional or the audience is Gen-Z entertainment.
- **Feeling:** precise, calm confidence; "everything has a place".
- **fps / shutter:** 60 fps for UI and product demos (scroll-like smoothness), otherwise 30; shutter 180°, blur only on travel.
- **Lens / camera:** 85–135 mm (flat, architectural); static or a subtle dolly-in (1–2 % over a shot). No roll.
- **Eases:** slides `ae:out=0.1,in=85` (fast start, long brake) 0.4–0.6 s; panels `outQuint` 0.45 s; layout pushes `inOutQuart` 0.5 s. No bounce, overshoot ≤ 3 % on cards only.
- **Signature techniques (choose 2–3):** track-matte/mask reveal of type (rise from behind a line, 6–8 f), kinetic grid (one cell grows, neighbours shrink proportionally on the same ease), counters with tabular numbers, line draw (trim path) connectors.
- **Type:** one grotesk family, 2 weights (e.g. Inter Display / Inter Tight, Manrope, Plus Jakarta Sans, General Sans). Headline tracking −0.03 em, labels ALL CAPS +0.12 em. Numbers tabular.
- **Palette pattern:** light field (off-white #F4F1EA or cool #EEF1F5) or deep ink (#111318) + brand colour as the single accent (Ecodigitus brand from `ecodigitus-core:edig-brand`). Sections alternate light / dark field.
- **Layout:** 12-col grid, 8 px rhythm, bento cards with 16–24 px radius, generous margins (8–10 %).
- **Transitions:** grid push (the next card takes the frame), mask wipe in the direction of reading, hard cuts on phrase starts.
- **Texture / post:** grain 0.01–0.02, no bloom on type, soft shadow one direction.
- **Pitfalls:** everything centred; four card styles; icons from different sets; easyEase everywhere (floaty).

## 2. Brutal / hype / streetwear
- **Use when:** TikTok/Reels hooks, product drops, events, Gen-Z promos, "nendang", "hype", "rame tapi keren".
- **Don't use when:** trust, finance, medical, luxury.
- **Feeling:** loud, fast, impossible to scroll past.
- **fps / shutter:** deliver 30; animate key layers on 12 fps steps (posterize time: `eye.py curve outExpo@steps:12` to preview the stutter) while the camera stays on 30 (mixed cadence). Shutter 90° (crisp) except whip moments.
- **Lens / camera:** 15–24 mm wide (distortion, near things huge). Aggressive dutch ±8–15°, zooms on hold keys (step zoom 100→112→125 %), shake on slams (decaying, 3–5 f).
- **Eases:** `expo:16` snaps (85 % in 5 f), hold keys, overshoot 10–20 % on slams. Durations 4–10 f.
- **Signature techniques:** path / variable-width stretching (letters pulled across the frame, Archivo or Anybody `wdth` axis, or scaleX 1→3 on one glyph), strobe/flicker (≤ 3 flashes/s for safety), posterize time, halftone/noise texture, type as image (full bleed, cropped).
- **Type:** condensed heavy display (Anton, Bebas Neue, Big Shoulders Display, Tanker, Clash Display Bold) + a mono or grotesk for labels. Tracking −0.02 to 0 em, leading 0.82–0.9, stacked lines.
- **Palette pattern:** off-black + off-white + ONE acid accent (#C6FF00, #FF2E63, #FFE600 or #FF3B00). Fields flip black↔accent on hits.
- **Transitions:** smash cut on beat, flash-frame (1 f accent field), whip with directional blur, glitch slice ≤ 4 f.
- **Texture / post:** grain 0.04–0.06, halftone, chromatic aberration only on hits (`ca` 0.01), contrast up.
- **Pitfalls:** neon glow on everything (neon is not brutal — brutal is flat ink), too many flashes, unreadable hold (< 0.6 s on a 3-word line).

## 3. Cinematic / editorial storytelling
- **Use when:** founder story, brand film, documentary, emotional explainer, quotes, "cinematic", "elegan tapi hidup".
- **Feeling:** depth, breath, weight; the viewer is being told a story.
- **fps / shutter:** 24 fps, 180° (motion blur = half a frame); keep it 24 to delivery.
- **Lens / camera:** 35–50 mm with depth of field on; 2.5D Z-space parallax (far plane blurred bokeh, type at focus, foreground particles out of focus); slow push-ins 100→108 % over a shot; rack focus between planes (spring ζ 0.85–1, 0.6–0.9 s).
- **Eases:** `snap` (anticipation small or none) for word arrivals with a long cushion 0.8–1.4 s; camera `inOutSine` / `inOutCubic`; spring ζ 0.8–1 (no visible bounce).
- **Signature techniques:** per-character 3D rotation in (rx 70°→0 with 1–2 f stagger), blur/focus fade (blur 12 px→0 with opacity 0→1 over 10–14 f), light sweep or halation on the key word, letterbox crops only when the story calls for it.
- **Type:** serif italic display (Instrument Serif, Fraunces, Playfair Display, Zodiak, Gambetta) + small sans caps with wide tracking (+0.18 to +0.3 em, 2–3 % frame height).
- **Palette pattern:** a grade, not a palette: teal-orange or warm-neutral with one kept colour; fields change with the story's light (night → dawn → warm interior).
- **Transitions:** match cuts on shape or direction, long dissolves (12–20 f) used once or twice, cut to black before the punchline.
- **Texture / post:** grain 0.03–0.04, halation 5–10 % on highlights, vignette 0.15–0.25, CA 0.0008–0.0012.
- **Pitfalls:** fast cuts (kills breath), serif + script + mono mixed, DOF without real depth (blur on a flat plane reads as a mistake).

## 4. Character explainer (what video-2 and the studied reference do)
- **Use when:** explainers, tutorials, "how it works", personal-brand reels, where a character or object carries the story.
- **Feeling:** friendly authority; a mini world you want to watch.
- **fps / shutter:** 30, 180°, 6 blur samples on travel and slams (`fast(t)`).
- **Lens / camera:** 24–35 mm in a real set (voxel room, paper diorama, desk); camera travels phrase to phrase; the set gives parallax so travel is visible.
- **Eases:** pops spring ζ 0.6–0.7 (0.35 s), slides `outQuint` ~7 f, travel `inOutCubic` 0.4–0.55 s, slams overshoot 8–12 % with 3–5 f shake.
- **Signature techniques:** type next to the character's face/action (eye goes face → word), pose changes hidden by a burst, one hero transition (pixel mosaic, whip mosaic) at section turns, type on surfaces of the set.
- **Type:** one chunky display (condensed or rounded heavy) + one clean sans; marker highlight per word with the VO.
- **Palette pattern:** each section owns a saturated field (orange → red → black → warm interior in the reference: 8 fields, ΔE 25 between shots, L range 82).
- **Transitions:** hard cuts on phrase starts (most), hero transition 3–4× per minute, whip/smash zoom between sets.
- **Texture / post:** soft premium grade (contrast 0.14, sat 1.07, bloom on practical lights only, grain 0.02).
- **Pitfalls:** copying the reference's character, world or lines (learning only — see motion-director `originality.md`).

## 5. Soft aesthetic / organic
- **Use when:** lifestyle, wellness, food, calm education, "estetik", "kalem", "soft".
- **fps / shutter:** 24 or 30, 180–270° (dreamy smear on drifts).
- **Lens / camera:** 50 mm, gentle float (sine drift 1–2 % at 0.1–0.2 Hz).
- **Eases:** `outSine` / `inOutSine` 0.8–1.5 s; scale 100→104 %; no snaps.
- **Signature techniques:** paper/fabric textures, organic masks (blob reveal), hand-drawn underline that writes on, slow dissolves.
- **Type:** soft serif (Fraunces soft, Gambetta) + light sans; lowercase welcome; tracking normal.
- **Palette pattern:** muted earth/pastel (beige #E9DFD3, sage #A7B5A0, dusty pink #D8A7A0, cocoa #6B4F45), lifted blacks.
- **Pitfalls:** turning soft into blurry; low contrast type (keep text ≥ 4.5:1).

## 6. Data / infographic
- **Use when:** results, reports, lab numbers, growth, comparisons.
- **fps / shutter:** 30 (60 if it's UI-like); 180°.
- **Lens / camera:** 50–85 mm, mostly frontal; one camera move per section.
- **Eases:** counters `outQuart` 1–1.6 s (land the last digit with a 2–3 % scale pop), bars grow `outQuint` 0.6 s with 2–4 f stagger, lines draw `inOutCubic`.
- **Signature techniques:** number as hero (8–15 % frame height, tabular figures), one chart type per film, highlight the one data point that matters (colour accent) and grey the rest.
- **Type:** grotesk with tabular numbers (Inter, IBM Plex Sans, Space Grotesk) + mono for units.
- **Pitfalls:** 3D pie charts, every bar coloured, numbers invented — on-screen numbers only from sources the user gives.

## 7. Luxury / premium
- **Use when:** "mewah", "elegan", premium products, invitations, high-end brand.
- **fps / shutter:** 24, 180°.
- **Lens / camera:** 85 mm, slow lateral slides and push-ins; never shake.
- **Eases:** `inOutQuint` / `inOutExpo` 1–1.5 s, tracking-in titles (+0.4 em → +0.15 em over 1.5 s), light sweep across gold.
- **Type:** high-contrast serif caps (Playfair Display, Bodoni Moda, Cormorant) wide tracked + thin sans.
- **Palette pattern:** deep field (#0E0E0E, #0F2A24 or #0B1A2E) + one metal (gold gradient #8C6B2F→#E8CF8A→#B08A3E) + ivory #F2EBDD.
- **Pitfalls:** bounce, more than one metal, crowded copy.

## 8. Playful / kids
- **fps / shutter:** 30 (squash & stretch reads better), 180°.
- **Eases:** `outBack` / spring ζ 0.4–0.55, squash 0.85/1.15 on landing, wiggle on idle (amp 2–4°, 1–2 Hz).
- **Type:** rounded heavy (Fredoka, Baloo 2, Nunito Black) + friendly sans.
- **Palette pattern:** 3 bright colours on cream, never the full rainbow at once.

## 9. Experimental / generative (controlled chaos)
- **Use when:** art, festival, music visuals, a brand that wants to look un-templatable, the *Eksperimental* direction of an open brief, or ONE chapter of friction between calm ones.
- **Don't use when:** trust, clean product, premium promo (most of Ikhsan's kiblat), or any stretch where small words carry the message.
- **Feeling:** "how was this even made?" — alive, raw, slightly dangerous, yet composed.
- **fps / shutter:** 30, or stepped layers (12–15 on 30) for raw energy; 90° for crisp damage, 180° for organic growth.
- **Process:** process-first — 2–3 sandbox sketches (misuse a tool, rule-based chaos, analog resampling, synesthesia) → promote the happy accident → write the formula rasa around it.
- **Signature techniques (choose 1–2):** slit-scan / temporal slicing, reaction-diffusion growth, pixel sorting tied to speed or light, rule-based agents (emergence), analog resampling (real refraction filmed by Ikhsan), alien physics (inverted gravity, time both ways), micro-UI density for one section.
- **Type:** a grotesk or a condensed black with a variable axis (abstraction needs a strong skeleton); legible anchor word per moment when the VO speaks.
- **Palette pattern:** usually reduced — black/white + one acid, or monochrome — so the texture and the motion are the colour.
- **Engine:** everything stateful is BAKED in one sequential pass and read by frame index (`experimental-motion.md` §3); seeded RNG, fixed timestep.
- **Pitfalls:** random glitch presets (template), constant strobing (> 3 flashes/s), chaos with no anchor, three experiments stacked (motif lock still applies).
- Detail: `experimental-motion.md`.

---

## Choosing between two that both fit
1. Who must feel what in the first 2 seconds? (stop scrolling → brutal/character; trust → clean; be moved → cinematic.)
2. What does the content physically look like? (UI → clean; a person or mascot → character; numbers → data.)
3. Which recipe lets ONE metaphor generate the layout? Choose that one.
4. Write the reason in the formula rasa ("cinematic, karena ini cerita founder; bukan brutal karena audiensnya klien B2B").
