# Typography that looks designed (before and while it moves)

Type that looks cheap is almost never about the typeface. It is proportion, mixing and placement. Treat type as a graphic object, not as text typed in Word.

## Size: the double-triple rule
- Hero ≥ 3× the supporting type; 6–8× is normal for a hook (150 pt hero with an 18–24 pt label). 60 vs 45 is "tanggung" — no hierarchy.
- Two-tier is fine: hero → sub-head (½ hero) → small label (≤ ⅓ hero).
- Pixel targets (cap height ≈ 0.7 × font size):

| format | hero cap height | support | smallest readable |
|---|---|---|---|
| 1080×1920 (9:16) | 140–320 px (7–17 % H) | 34–48 px | 30 px |
| 1920×1080 (16:9) | 110–260 px (10–24 % H) | 28–40 px | 24 px |
| 1080×1350 (4:5) | 120–280 px | 32–44 px | 28 px |

`eye.py poster` measures hero height and hero : support ratio from pixels (≈ estimates; trust the picture).

## Tracking, leading, case
- Headline / hero: tracking −0.02 to −0.05 em (After Effects −20 to −50), leading 0.85–0.95. Big tight type reads as one solid shape, like a logo.
- Small labels: ALL CAPS, tracking +0.1 to +0.3 em (AE +100 to +300), 2–3 % of frame height. Cinematic and elegant.
- Body/sub-lines: tracking 0 to −0.01 em, leading 1.15–1.3.
- Optical kerning on display sizes; check pairs like "AV", "To", "LT" at hero size.

## Colour of type
- Never pure #000000 with pure #FFFFFF. Off-black #111115 / #161614, off-white #F4F1EA / #EAEAEA.
- Contrast ≥ 4.5:1 for small text, ≥ 3:1 for large bold (≥ 48 px). Type never sits on a busy or glowing area (measure with `eye.py poster`: text boxes over red UI zones or over busy cells fail).
- Accent colour on one word per phrase at most.

## Families: max two
- One display + one text family. Mono counts as a family: use it only when the concept is code/data, and then it replaces the second family instead of being a third.
- Free-to-use pairings (verify the licence file of the exact download before a client project):

| feeling | display | text / label | source |
|---|---|---|---|
| clean tech | Inter Display, Inter Tight | Inter | Google Fonts (OFL) |
| local, friendly-pro (Indonesian designed) | Plus Jakarta Sans ExtraBold | Plus Jakarta Sans | Google Fonts (OFL) |
| neo-grotesk with character | General Sans, Satoshi, Switzer, Cabinet Grotesk | same family | Fontshare (ITF Free Font License, commercial OK) |
| hype / condensed | Anton, Bebas Neue, Big Shoulders Display | Inter, Space Grotesk | Google Fonts (OFL) |
| hype, variable width (path stretching) | Archivo (wdth 62–125), Anybody (wdth 50–150) | Archivo | Google Fonts (OFL) |
| expressive display | Clash Display, Tanker, Panchang | Satoshi | Fontshare |
| editorial / cinematic | Instrument Serif (italic), Fraunces, Playfair Display, Zodiak | Instrument Sans, Inter (caps, wide tracking) | Google Fonts / Fontshare |
| luxury | Bodoni Moda, Cormorant, Playfair Display | Inter Light caps | Google Fonts (OFL) |
| code / data concept | JetBrains Mono, IBM Plex Mono | IBM Plex Sans | Google Fonts (OFL) |
| playful | Fredoka, Baloo 2, Nunito Black | Nunito | Google Fonts (OFL) |

Variable fonts give motion for free: `wght` 200→800 inflate, `wdth` squeeze/stretch, `opsz` optical size, `slnt` lean on velocity (`motion-docs/06-kinetic-typography/variable-fonts/NOTES.md`).

## Roles and the 70/30 rule
| role | share | entrance | duration |
|---|---|---|---|
| connector (and, the, is, we…) | ~70 % | simple: mask rise, fade-slide 20–40 px, typewriter only if the concept is typing | 6–9 f |
| content | — | rise/slide with overlap | 10–14 f |
| keyword / emphasis | ~30 % | the treatment: scale slam, colour, weight inflate, stretch, 3D flip, its own SFX | 10–16 f, lands after a VO pause |
| number | — | counter + scale pop on the last digit | 1–1.6 s |
| feeling word | — | change of family (serif italic) or softness (blur → focus) | 12–20 f |

One emphasis per phrase. If everything is emphasised, nothing is.

## Placement
- Design inside an invisible margin: ~20 % "oxygen" for editorial pieces, at least the channel safe zone for social (9:16: top 12 %, bottom 20 %, right rail x > 84 % at y 45–80 %).
- Cropped type (bleeding off the edge) is allowed when deliberate and huge — never accidental at 5 %.
- Text is placed where the eye already is (see `eye-camera-space.md`), not always top-left.

## Optical alignment, not mathematical alignment
Align Center centres the advance box, not what the eye weighs: "T…O" looks heavy to the right because the T has air under its bar.
- Centre on the ink: with an alphabetic baseline and left align, `x = cx − (m.actualBoundingBoxRight − m.actualBoundingBoxLeft) / 2` (`m = ctx.measureText(str)`).
- Hang punctuation outside the measure: periods, commas, quotes and a ◆ period count for 0–50 % of their width when centring.
- Nudge open shapes (T, V, W, Y, A, L, triangles) toward their mass by 1–3 % of the word width; judge on a 2× crop of the settled frame.
- Round letters overshoot the cap height and baseline by ~1–2 % by design; don't "correct" them.
Detail and the rest of the enterprise standard: `enterprise-motion.md` §4.

## What made video-3's type read as "font jelek" (measured, 2026-10-29)
- Three families inside the same phrase (JetBrains Mono connectors + Bricolage Grotesque content + Instrument Serif italic feelings): every line changed voice.
- Small mono lines measured at ≈ 1–3.5 % of frame height (code-pane lines ≈ 1 %), thin and grey — hard to read on a phone.
- Hero words at 4.5–7 % of frame height on a 9:16 frame with 71 % empty space: hierarchy failed in 6 of 8 paused frames.
- Almost every line top-left at the same size → no composition, no rhythm of scale.
Fix: one display + one text family, hero 10–17 % H, connectors 3 % H in the text family, keyword treatment only on 30 %.
