---
name: motion-taste
description: The motion designer's formulas and taste — turn a loose concept into a measurable look (formula rasa), pick the combination recipe (clean tech, hype/brutal, cinematic, character explainer, soft, data, luxury) with its fps, shutter, lens and eases, plan the colour script, type hierarchy (double-triple, 2 families, 70/30), eye trace, 2.5D camera, no-template transitions, finishing, and studio tricks (smear frames, 1-frame impact, metaball, slit-scan, tittle bounce, echo stacking, speed-reactive optics, kinetic wrapping), plus a dictionary from Indonesian reactions to fixes. Use it before any storyboard or motion code, when choosing palette, fonts, fps, eases, camera or transitions, when the user only gives a concept, and whenever work feels "neon sampah", "kaku", "template", "asal jadi", "font jelek", "konsep tidak menyatu", "kurang nampol" or "kok referensi lebih enak dilihat" — even if they never say "taste". Pair it with motion-eye, which measures these formulas.
---

# Motion taste

The user explains a concept; you direct it. That means making the decisions a senior motion designer makes before touching a keyframe, writing them as numbers, and checking them with your eyes (`motion-eye`). Effects are a menu, never a checklist.

## Why this exists
Video-3 was built with every arsenal technique (domain warp, velocity squash, rack focus, recompile glyphs, three fonts, six accent colours) and the user called it "neon sampah, font jelek, asal jadi, konsepnya tidak menyatu". Measured against the reference it lost on exactly the things this skill fixes: one dark colour field for 35 s (reference: 8 fields, ΔE 25 between shots), value contrast Δ24 (reference Δ67), 88 % of frames muddy, one visual change every 5.4 s (reference 1.85 s), type hierarchy failing in 6 of 8 paused frames under the strict first rule. Video-2, built with a tight look and a world, hit the reference's formula (SKOR RASA 100 vs 68; against Ikhsan's kiblat of 14 liked videos: 88 vs 72; against kiblat v2 of 41: 88 vs 60). The difference was formula, not effort. Case file: `references/case-video3.md`.

## The laws (apply without being asked)
1. **Poster first.** Any paused frame must work as a still design. Make 3–4 styleframes (static, real fonts, real palette) before animating, and run `eye.py poster` on them; each ≥ 70. If the still is ugly, motion will not save it.
2. **One idea, one world.** One sentence of idea, one metaphor that generates the layout, one medium named concretely (paper cut-out, voxel set, risograph print, glass UI, film still…). Every element on screen belongs to that world; props that don't are cut.
3. **Colour script before colour.** Plan the background field and value of every section (hook / setup / turn / punchline / CTA). Sections change field (ΔE ≥ 25 at section turns, value range ≥ 40 L across the film). Per frame: max 3 colours — background, type, one accent; tints and shades of one hue count as one colour.
4. **Hierarchy you can see from across the room.** Hero type ≥ 3× the supporting type (double-triple rule; 6–8× is normal for a hook). Max 2 families. 70 % of words (connectors) enter simply and fast; 30 % (keywords) get the treatment.
5. **One star at a time.** In any moment one element moves big; the rest hold or drift. The next element appears where the eye lands, or a visual handoff carries the eye there. Hero information never just fades out: it hands its shape to the next element (shared transformation); only small connectors may fade.
6. **Motif discipline.** Pick 2–3 signature techniques (one hero transition, one entrance family, one texture) and repeat them. Never ten transitions in fifteen seconds. Using "all of supermotion" is a failure mode, not a goal. Visible studio tricks (1-frame impact, metaball, slit-scan, echo stacking, kinetic wrapping) each count as one of those signatures. Before any preview, kill your darlings: delete every extra whose removal makes the message stronger.
7. **Physics, not timers.** Snap then cushion (85 % of travel in ~4 frames, settle over ~20), overlap 2–3 frames between container and content, exits 60–75 % of entry time, the camera never dies on a hold. Invisible craft rides on every fast move: smear at peak speed, optics (CA/lens) only while fast, tittles and counters that settle late (`references/studio-tricks.md`). Each film has its own brand physics — one T/ζ set per class (ui, hero, heavy, playful) from which every move is derived (`references/enterprise-motion.md`).
8. **Look, feel, name, fix.** At every gate run motion-eye, open the pictures, write what you feel in one line ("dark mud, no field change, hero too small"), then fix the cause. Never ship a render you have not looked at.
9. **Cause and effect.** No effect without a trigger in the frame; every effect is a reaction. A fall hits the floor → the letter squashes, the floor bends, the camera shakes 3 frames, a spark leaves the contact point. A shake needs an impact, a glow needs a light, a blur needs speed, a sound needs an event. Derive reactions from the cause's own function (contact from `bounce()`, speed from `pose(t ± h)`).
10. **Contrast of state.** If everything is fast, nothing is fast; if everything glows, nothing shines. Hold or slow down before a burst (the slingshot pulled back, silence before the hit); drain the scene to black/grey before the accent that must slap.
11. **Attention budget.** 100 % of attention per second: busy type (≈ 80 %) gets a calm background and light (≈ 20 %); a busy background or light move (80 %) gets still, solid type as the anchor. Light, air and these three laws: `references/light-atmosphere.md`.

## Workflow with gates
| gate | what you make | how you check it | show the user? |
|---|---|---|---|
| G0 formula | formula rasa (`references/formula-rasa.md`): feeling, concept contrast, recipe, measurable targets, motif lock | targets taken from `eye.py dna` of the reference when there is one | yes, with 2–3 directions when the brief is open |
| G1 styleframes | colour script strip + 3–4 key frames as stills | `eye.py poster` ≥ 70 each; colour script ΔE/L range on target | yes — cheapest moment to change direction |
| G1b motion test | one phrase (2–3 s) animated to final quality: look, pacing, camera | `eye.py sense`; `eye.py onion` on its hero move | yes, with the styleframes — stills can't show energy |
| G2 animatic | timing only: holds, cuts on VO phrases, camera path blocked (rough cuts, linear slides, no effects) | `eye.py dna` → shot median, burst/hold, colour fields vs target; read every line aloud — out of breath = too short | no (internal) |
| G3 spacing | eases, overlap, stagger, camera drift | `eye.py curve` for chosen eases; `eye.py onion` on every hero move | no |
| G4 hook preview | first 20–25 s rendered | `eye.py review --ref` ≥ 80 and every ⚑ answered | yes |
| G5 full | everything | `eye.py review --ref`, `motion-qa-review` | yes |

## The technique ledger (what we already know works — and what we already know doesn't)
`references/technique-ledger.jsonl` (view: `technique-ledger.md`) holds one entry per technique: source, the films that used it, what was measured and Ikhsan's verdict. Status from strongest: proven · kiblat · experimental · retired · avoid.
- **G0:** `python -I scripts/ledger.py menu --recipe <recipe> [--kind transition] [-q word]` — choose the motif lock from the top of the menu; reusing a retired/avoid technique needs a "sengaja, karena …".
- **After Ikhsan's notes on a film:** `ledger.py verdict <id> --film video-N --verdict liked|rejected|mixed --note "his words"` for each visible technique he reacted to (liked → proven, rejected → retired). New technique built for a film: `ledger.py add …` with `--film --where --evidence`.
- Verdicts are his words only; measured evidence goes in `evidence`. Never upgrade a technique on a guess.

## Choosing the recipe (detail in `references/recipes.md`)
| brief sounds like | recipe | fps / shutter | lens | signature eases |
|---|---|---|---|---|
| SaaS, ERP, LIMS, B2B product, "modern", "clean" | Clean tech / kinetic grid | 60 (UI) or 30, 180° | 85–135 mm (flat, architectural) | `ae:out=0.1,in=85` slides, `outQuint` 0.4–0.6 s |
| TikTok hook, drop, Gen Z promo, "hype", "nendang" | Brutal / hype | 30 with key layers on 12 (posterize), 90° | 15–24 mm wide | `expo:16` snaps, hold keys, steps:12 |
| story, founder, emotional, brand film, "cinematic" | Cinematic / editorial | 24, 180° | 35–50 mm + DOF | `snap` cushions 0.8–1.4 s, spring ζ 0.8–1 |
| explainer with a hero character / set | Character explainer (video-2) | 30, 180° | 24–35 mm | spring ζ 0.6–0.7 pops, `inOutCubic` travel |
| lifestyle, food, wellness, calm education | Soft aesthetic | 24 or 30, 180–270° | 50 mm | `outSine`/`inOutSine` 0.8–1.5 s drifts |
| numbers, reports, results | Data / infographic | 30 or 60, 180° | 50–85 mm | `outQuart` counters, 2–4 f stagger |
| premium, luxury, "mewah", "elegan" | Luxury | 24, 180° | 85 mm | `inOutQuint` 1–1.5 s, tracking-in |
| art, festival, music visual, "eksperimental", "avant-garde", "yang nggak bisa ditiru" | Experimental / generative (controlled chaos, process-first) | 30 or stepped 12–15, 90–180° | any; often flat or extreme | rule-driven systems, steep or broken curves, alien physics (`experimental-motion.md`) |

## How to talk about taste
- Never "modern / premium / keren" alone: name the medium, the palette in hex, the type pair, the motif and the numbers.
- When the user reacts with a feeling, translate it with `references/feedback-and-tells.md`, say in one line what changes, change only that, and show the measured before/after.
- When a measured tell fires (dark mode + neon accents, mud, flat rhythm, tiny type in empty space), either fix it or answer "sengaja, karena …".

## References
- `references/formula-rasa.md` — writing the film's formula: feeling, concept contrast, targets, colour script, motif lock; template + worked example.
- `references/recipes.md` — the combination recipes: when to use, fps/shutter, lens, eases, durations, type, palette, layout, camera, transitions, texture, pitfalls, engine knobs.
- `references/timing-fps.md` — fps and shutter decisions, the 30-frame anatomy, durations, holds, stagger, overlap, VO sync, cut rates per genre.
- `references/type-rules.md` — size ratios and pixel targets per format, tracking/leading numbers, pairings that are free to use, roles and treatments, what makes type look cheap.
- `references/eye-camera-space.md` — eye trace and handoff, 2.5D depth, camera rig, lens → fov table for the engine, continuous drift, dolly-through, dutch, match-cut acceleration, spatial continuity.
- `references/transitions.md` — transition grammar and no-template transitions with frame recipes.
- `references/studio-tricks.md` — the studio "dapur rahasia": smear frames, 1-frame impact (invert/outline, flash safety), metaball/liquid merge, slit-scan time displacement, tittle bounce and counter lag, echo stacking, speed-reactive optics, kinetic wrapping; invisible craft vs visible signatures, fit per recipe, engine sketches and how to check each.
- `references/colour-finish.md` — colour script, 3-colour rule, neon budget, grade and compositing numbers.
- `references/feedback-and-tells.md` — Indonesian reactions → concrete changes; measured template tells with "sah bila" and fixes.
- `references/case-video3.md` — the measured failure and the re-direction, as a worked lesson.
- `references/kiblat-ikhsan.md` — Ikhsan's kiblat: the measured + seen DNA of the videos he loves (`my-ref/`), signature vs free traits, the default formula when a brief has no reference. Read it at G0 of every film.
- `references/technique-ledger.md` (+ `.jsonl`, `scripts/ledger.py`) — every technique learned, ranked by proof, with Ikhsan's verdicts; the G0 menu.
- `references/experimental-motion.md` — the opposite pole: process-first "mad scientist" motion (controlled chaos), four concept methods (misuse the tool, rule-based chaos, analog resampling, synesthesia), slit-scan, reaction-diffusion, pixel sorting, micro-UI density, alien physics, the bake rule for stateful effects, daily sketches — and when NOT to use it with Ikhsan's kiblat.
- `references/enterprise-motion.md` — Apple / Spotify / Google motion philosophies mapped onto our engine, programmatic patterns (one controller per beat, auto-fit type rig, inertial bounce), brand physics, linear-float light, optical alignment, and how principals think (physical metaphor, extreme constraints, cross-pollination, kill your darlings).
- `references/light-atmosphere.md` — why vector type looks like a sticker: exponential glow (on lights, not type), rim light that moves with the motion, gobo shadows, refractive glass, chromatic edge blur, velocity turbulence, halftone/dither; the laws of cause and effect, contrast of state and attention budget, with engine recipes and the kiblat filter.
- `references/webgl-showcase-craft.md` — what 43 Codrops-class WebGL/DOM showcases (studied 2026-11-15, mirrors + per-group NOTES in `motion-docs/13-codrops-showcase/`) have that our films lack: material and light, cause and effect, real data in space, transformation. The measured offscreen-WebGL2 → Canvas 2D bridge (`makeGL`), the rules for turning interaction into an authored path, a technique menu per group with source, licence and recipe, and the kiblat filter. Ledger tag `codrops-2026-11`. Read it when a film needs its "new technique" (memory: new-technique-every-video).
