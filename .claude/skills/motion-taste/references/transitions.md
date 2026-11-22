# Transitions without templates

Ask: "what shape, colour or direction in scene A already looks like scene B?" — the transition is built from that, not picked from a preset list.

## Grammar for one film
- Hard cuts on phrase starts carry most of the edit (60–80 % of changes).
- ONE signature transition, used at section turns only (3–4 per minute), and it belongs to the film's world.
- One or two supporting moves (a camera move, a field wipe). That's the whole vocabulary.
- A section turn must be VISIBLE: new field colour or value, new set, or a big camera move. Video-3's glyph "recompile" happened inside the same dark navy, so the measured film had only 6 visual shots in 35 s and the user said "transisinya gak ada".

## No-template transitions (frame recipes at 30 fps)
| name | how | frames | notes |
|---|---|---|---|
| Shape stealing | zoom (camera or scale, `inOutExpo`) into the stroke of a letter of the last word until its colour fills the frame; that colour IS the next background | 10–16 | the cleanest "field change"; pick a letter with a thick vertical stem (M, N, H, I) |
| Colour-field wipe | the next section's field enters as a slab from the reading direction (`ae:out=0.1,in=85`), the next word rides on its leading edge | 8–12 | slab edge can be slanted 4–8° for energy |
| Directional match cut | word A exits right at speed v; word B enters from the left already at v, then decelerates | 4 + 8–12 | same direction AND speed; blur on both sides of the cut |
| Match-cut acceleration | camera accelerates following A, cut at peak velocity, B decelerates from the same direction | 6 + 10 | 6 blur samples around the cut (`fast(t)`) |
| Dolly through | camera pushes through a counter (O/A/P/B) or between words into the next scene | 10–16 | wide lens makes it dramatic |
| Mask / track-matte reveal | type rises from behind an invisible line or a shape; the shape itself moves on | 6–10 | the clean-tech staple |
| Visual handoff | a dot/underline/cursor travels to the next layout position and becomes the next element | 8–14 | solves eye-jumps |
| Light sweep / whiteout | a soft light passes, peaks to the next field's lightest tone, reveals the next scene | 8–12 | keep flash ≤ 0.26 on soft grades (video-3 lesson) |
| Whip | directional blur pan 2–4 f out, 2–4 f in, same direction | 6–8 | pair with a whoosh; not more than once per section |
| Smash zoom | hard scale 100→160 % in 3 f with blur, cut, next shot settles from 115 % | 3 + 6 | hype and character recipes |
| Morph | the last shape of A becomes the first shape of B (circle → dot of an i → button) | 12–20 | needs the shapes to be designed for it in the styleframes |

## Engine notes
The engine already has whip, mosaic, glitch, halftone, light-sweep, PiP, smash zoom, foreground wipe and crossfade (`motion-video-engine/references/engine-api.md` §5). Use one as the signature only if it belongs to the film's world (mosaic belongs to a pixel world; it does not belong to a paper world). Build shape-stealing and field wipes from the type camera + background field per section.

## Check
`eye.py dna` lists cuts and transitions with their times and the eye jump of each; the colour script strip shows whether a section turn actually changed the field. Expect the signature transition to appear 3–4× per minute and the colour step at section turns to be ΔE ≥ 25.
