# Colour script, palette discipline and finishing

## Colour script (plan colour per section, like an animation studio)
Before any frame is built, write one row per section: field colour (hex), value (light / mid / dark), accent, mood word, and why it changes there. Then render the strip (styleframes side by side) and look at it: it should read as a rhythm, not a single band.

Targets measured on work the user liked (character explainer, 2 min): 8 colour fields, ΔE ≈ 25 between consecutive shots' dominant colours, value range across shots ≈ 80–90 L, contrast inside a frame Δ ≈ 67–69 L (p5–p95). Video-3 (disliked): 1 field, ΔE 3.9, range 7, contrast 24.

Example row set for a 35 s 9:16 piece:
| section | field | value | accent | why |
|---|---|---|---|---|
| hook 0–3 s | off-white paper #F4F1EA | light | ink #161614 | surprise: starts bright where feeds are dark |
| setup 3–12 s | deep ink #111318 | dark | brand colour | the problem |
| turn 12–20 s | brand colour full field | mid | off-white | the reveal |
| punchline 20–28 s | black → one accent slab | dark | accent | weight |
| CTA 28–35 s | back to paper | light | ink | closure, rhymes with the hook |

## Per frame: 3 colours
- Background, type, one accent (60-30-10: field 60, type 30, accent 10). Tints/shades of one hue count as one colour; neutrals (off-black, off-white, greys) count as one each.
- A second accent appears only on one keyword, briefly.
- Measured by `eye.py poster` ("warna") and by `review` (colours per frame, accent families per film ≤ colour fields + 2).

## Neon and glow budget
- Neon is a style, not a default. On a dark field, bright saturated accents with bloom read as the generic "dark-mode AI" look (video-3: 5 accent families sprinkled over one navy field).
- Glow belongs to light sources in the world (lamps, screens, sun) — not to type by default. If the brief is neon: one neon colour, type off-white, the glow breathes with the music.
- Keep `glow` (bloom amount) for practical lights; type stays crisp (chroma-keyed bloom only if the film's world is about light).

## Value structure
- Decide where the lightest and darkest areas are in every styleframe; the focal element sits at the highest local contrast.
- Muddy = median L < 22 and p5–p95 contrast < 45. Fix by pushing type to L ≥ 90 on the dark field, or by giving the section a light or saturated field.
- Off-black / off-white instead of #000 / #FFF.

## Finishing (one adjustment pass over everything)
| knob | value | engine |
|---|---|---|
| film grain | 2–4 % monochrome (0.02–0.04) | `post.grain` |
| halation / soft glow | radius large, intensity 5–10 %, threshold high | `post.glow` ≈ 0.2–0.32, bloom on lights |
| contrast | ~0.14 soft premium; up for hype | `post.contrast` |
| saturation | ~1.05–1.07; 0 for monochrome sections | `post.sat` |
| chromatic aberration | base 0.0008–0.0012, hits 0.01 for 2–3 f | `post.ca` |
| vignette | subtle (0.15–0.25) | `post.vig` |
| warmth | a few % toward the film's light | `post.warm` |
Order of a lens stack: CA → bloom → vignette → tone mapping → LUT → grain (`motion-visual-craft` memory).
Flat digital gradients without grain read as "plastik" — grain is the cheapest de-plasticiser.
