# Formula rasa: turning a concept into numbers

"Kreatif", "modern", "keren" are not specifications. A film's formula is **feeling + concept contrast + recipe + measurable targets + motif lock**. Write it in the project's `CONCEPT.md` before the storyboard, show it to the user (with 2–3 directions when the brief is open: Aman / Berani / Eksperimental), and measure every gate against it. The Eksperimental direction is found process-first: run 2–3 short sandbox sketches (misuse a tool, rule-based chaos, analog resampling, synesthesia — `experimental-motion.md`), show the happy accident as a still or a 3–5 s loop, and write its formula around it.

## Template
```
## Formula rasa
Idea (1 sentence):
Metaphor that generates the layout:            (e.g. "a printed manual unfolding", "a voxel studio")
Material metaphor (how things behave):          (rubber band released, heavy glass plates on a lit table, a microscope searching focus…)
Brand physics (T / ζ per class):                (ui · hero · heavy · playful — every move derives from these; enterprise-motion.md §3)
Outside source (cross-pollination):            (a mechanism from outside motion graphics: watch ratchet, rack focus, paper fold, newspaper grid…)
Constraint (optional, the Eksperimental direction): (e.g. black/white + one font; no position — only scale, masks, weight)
Medium, named concretely:                      (paper cut-out, risograph, voxel set, glass UI, film still…)
Feeling:                                        (2–3 words + the one it must NOT feel like)
Concept contrast:                               (organic vs sharp, quiet vs loud, analog vs code…)
Recipe:                                         (recipes.md #, and why not the runner-up)
fps / shutter / lens:                           (e.g. 30 fps, 180°, 24–35 mm)
Signature eases (eye.py curve specs):           (entrance, travel, slam)
Motif lock (max 3):                             (hero transition · entrance family · texture)
Type pair + roles:                              (display / text, sizes in px, tracking)
Colour script:                                  (table per section — colour-finish.md)
Targets (from the reference DNA or recipe):
  colour fields ≥ … · ΔE between shots ≥ … · value range ≥ … L · contrast ≥ … · muddy ≤ 25 %
  median time between visual changes … s · burst … % · punch ≥ … × · camera alive ≥ 60 %
  colours per frame ≤ 3 · hero ≥ … % H · hero:support ≥ 3 · poster test ≥ 70 on every styleframe
What is learned from the reference (technique only) / what stays ours (concept, world, palette, lines):
```

## Getting the targets
1. `eye.py dna <reference> [--crop …]` → read its numbers (fields, ΔE, value range, contrast, shot median, burst, punch, camera alive, colours per frame).
2. Numbers that should transfer (rhythm, contrast, fields, hierarchy) become targets; numbers that are expression (its exact palette, its character) do not.
3. No reference: take the recipe's ranges.

## Worked example (re-directing video-3's concept, for learning)
Idea: "This whole film is code — and the coder is the director."
- Metaphor that generates layout: **the editor becomes a physical set** — a giant sheet of printed code on a desk, a lamp as the only light; phrases are lines on the sheet, the camera travels over paper with real parallax (desk edge, lamp, pencil).
- Medium: printed paper + ink + one highlighter colour. Feeling: crafted, warm, clever — must NOT feel like a dark-mode AI ad.
- Concept contrast: analog paper vs digital render.
- Recipe: character explainer structure (camera travel in a set) + editorial type (serif italic only for the feeling words).
- 30 fps, 180°, 28–35 mm, DOF on the paper.
- Eases: entrances `snap`, travel `inOutCubic` 0.45 s, slams `expo:16` + 8 % overshoot.
- Motif lock: highlighter swipe (entrance family) · fold/turn of the paper sheet (hero transition, 3×) · paper grain + lamp halation (texture).
- Type: Instrument Serif italic (feelings) + Inter Tight (everything else). Hero 12–16 % H, connectors 3 % H. No mono — code is shown as printed text in Inter Tight's tabular figures or as the actual paper's print.
- Colour script: paper #F4F1EA hook → lamp-lit night desk #1A1612 (setup) → highlighter-yellow field slam on CODE → paper again → director's light amber field on DIRECTORS → paper CTA.
- Targets: ≥ 4 fields in 35 s, ΔE ≥ 25 at turns, contrast ≥ 55, visual change every 1.2–2 s, poster ≥ 70.
This is one direction; Berani would be brutal (black/white + acid, stretched type); Eksperimental could be a physical type set built of voxels.
