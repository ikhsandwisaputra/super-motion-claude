# Reactions → concrete changes, and the measured template tells

Users react in feelings; professionals answer with one specific change, show it, and measure before/after with `motion-eye`. If a reaction could mean two things, show both.

## Dictionary (motion-specific)
| user says | usually means | change | check with |
|---|---|---|---|
| "neon sampah", "norak", "kayak template AI" | dark single field + glowing pastel/neon accents in many hues | colour script with real field changes; one accent per section; type off-white without glow; glow only on lights in the world | review: colour fields, palette, tells |
| "gelap/suram", "mata capek", "burem" | muddy values (median L < 22, contrast < 45) | push type to L ≥ 90, give sections light or saturated fields, raise exposure of the set | dna: contrast, mud % |
| "font jelek", "tulisannya murahan" | hierarchy + mixing, rarely the face itself | 2 families max, hero ≥ 3× support, tracking/leading numbers, one emphasis per phrase | poster: tipe |
| "kinetic teksnya gak enak", "kaku", "kayak robot" | linear or floaty spacing, everything stops together, same entrance for every word | snap + cushion curves, 2–3 f overlap, 70/30 roles, exits shorter than entrances | curve, onion |
| "mata ngeliatnya apaan ini", "bingung lihat ke mana" | many stars at once, eye jumps without handoff | one star per moment, place next element at the landing point, visual handoff | dna: focal path, eye jumps |
| "asal jadi", "kurang profesional" | gates skipped: no styleframes, no colour script, no measured review | go back to G1 styleframes; poster ≥ 70 before animating | poster, review |
| "konsepnya gak nyatu", "arahnya ke mana" | props from different worlds; metaphor not visual | one metaphor that generates layout; cut props that don't belong; colour script that follows the story | formula rasa |
| "transisinya gak ada" | section turns don't change the frame | signature transition at turns + field change; hard cuts on phrases | dna: events + colour step |
| "kurang nendang", "kurang greget" | weak scale contrast and energy | hero 1.5–2× bigger, snappier ease (`expo:16`), hit after a VO pause, accent field slam | poster tipe, dna punch |
| "terlalu rame", "pusing" | too many simultaneous moves/colours | remove ⅓ of elements, stagger instead of simultaneous, max 3 colours, longer holds | review palette, fokus |
| "kurang mewah" | loud palette, bouncy motion | slower inOutQuint 1–1.5 s, serif caps wide tracking, deep field + one metal, light sweep | — |
| "kurang hidup", "datar", "sepi" | no depth, dead camera, no secondary motion | 2.5D layers with parallax, continuous drift, particles/dust on near plane | dna camera alive |
| "teksnya gak kebaca", "kekecilan" | size, contrast or time | bigger type, contrast ≥ 4.5:1, hold ≥ 1 s + 0.3 s/word, less motion while reading | poster tipe/kontras |
| "lebay", "kebanyakan efek" | effect stacking, transition zoo | one signature move, halve intensities, remove glows elsewhere | review tells |
| "terlalu cepat / lambat" | pacing | change durations and hold times, not just speed; target the genre's change rate | dna shot median |
| "kurang smooth" | low fps for the recipe, no motion blur, jerky keys | 6 blur samples on moves, curves without speed spikes, 60 fps only if UI-like | onion spacing |
| "kurang nampol", "kurang punchy" | hits land without contrast or power | the impact sequence: snap + smear + CA spike → 1 inverted/outline frame → long cushion (`studio-tricks.md`) | look --around the hit, dna impact frames |
| "kurang wow", "biasa aja gerakannya" | only translate/scale/opacity | one visible studio signature that fits the recipe (metaball merge, slit-scan, echo stack, wrapped ring), plus invisible craft on every fast move | — |
| "pusing lihatnya", "matanya sakit" | constant CA/fisheye, strobing, flashes | optics only while fast; ≤ 3 flashes in any second; impact ≤ 1 per 3–5 s | dna flash/s, CA at rest |
| "kayak stiker", "tempelan", "datar kayak vektor" | flat vectors with no light, air or material | light the stage: a gobo drifting over the field, a rim-light sweep on the hero as it settles, exponential glow only on a real light source (`light-atmosphere.md`) | crop + poster; review halo/neon stays low |
| "norak padahal efeknya lengkap", "efeknya kebanyakan tapi gak kerasa" | effects without a cause, everything loud at once, no attention budget | every effect must react to a cause in the frame; slow/drain before the burst; 80/20 attention between type and background — then delete what has no cause | `look --around` each shake/flash: cause 0–2 f before; dna burst/hold/punch; poster fokus |

## Measured tells (a mirror, not a fence)
No style is forbidden: neon is right for a neon brief, a dark field is right for a night story. A tell means "nobody chose this". For each tell `motion-eye` prints, either fix it or write "sengaja, karena …".
| tell | measured as | legit when | fix |
|---|---|---|---|
| dark mode + neon/pastel accents | 1 colour field, L median < 20, ≥ 4 accent families | the brief is literally night/neon/cyber and one accent leads | colour script + one accent |
| muddy dark | ≥ 40 % frames with median L < 22 and contrast < 45 | horror, deliberate low-key with one lit subject | lift type and lit areas, add light fields |
| one dark background all film | colour fields ≤ 1 and L median < 20 | a single-location night film with strong light motivation | field per section |
| tiny type in empty space | ≥ 20 % frames > 85 % calm | deliberate minimal title cards with huge type | bigger hero, fill with field/set |
| type hierarchy weak | ≥ 60 % paused frames fail double-triple | dense UI recordings | 3× rule, 2 families |
| flat energy | punch < 4 | ambient loops | snaps + holds |
| dead camera | alive < 35 % of holds | locked-off graphic layouts by design | continuous drift |
| eyes thrown around | > 45 % cuts jump > 35 % diagonal | hype edits that re-colour the whole frame on each cut | handoff / landing point |
| neon/glow overload | glow halo > 2.5 % or neon in > 25 % frames on dark | neon brief | glow on lights only |
| plastic smoothness | grain < 1 on half the frames | flat vector style by choice | 2–4 % grain |
| flashing beyond the safe limit | > 3 full-frame flashes in any 1 s | never (photosensitive-epilepsy risk) | space impacts/strobes ≥ 0.34 s apart, fewer of them |
| impact frames everywhere | > 1 one-frame event per 3 s on average | a hype edit cut to a beat that asks for it | keep impacts for keywords after VO pauses |
| optics always on | chromatic split still visible during holds | a deliberately broken-lens / VHS world | drive CA and lens distortion from speed (`velEnv`) |
