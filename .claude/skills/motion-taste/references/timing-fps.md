# Timing, fps and the anatomy of a move

Timing = how many frames a move takes. Spacing = how the travel is distributed across those frames (the ease). Block timing first (holds and cuts on the VO), then shape spacing. Preview every chosen ease with `eye.py curve <spec> --frames N --fps F` and look at the spacing chart before coding it.

## Choosing fps and shutter
| fps | when | shutter / blur | notes |
|---|---|---|---|
| 24 | cinematic, editorial, luxury, documentary | 180° (blur = ½ frame) | deliver at 24 — every platform accepts it; never conform 24 → 30 (judder) |
| 30 | default for TikTok/Reels/Shorts, explainers, character pieces, kinetic type | 180°; 6 sub-frame samples on travel, slams and transitions | what the engine renders today |
| 60 | UI/product demos, clean tech, anything that should feel like scrolling glass | 90–180° (less blur, it already looks smooth) | doubles render time; only if the brief asks for "super smooth UI" |
| 12–15 on 30 | brutal/hype, hand-made, comic, stop-motion | 0° on stepped layers (crisp) | "on twos": stepped layers (characters, type punches) while camera and transitions stay on 30 — mixed cadence reads as designed, not laggy |
| 8–10 on 30 | deliberate stop-motion props, paper cut-outs | 0° | use for one layer family only |

Shutter angle → blur: 90° crisp/strobe (hype), 180° natural, 270–360° dreamy smear (soft aesthetic drifts). In the engine, motion blur is frame supersampling: K samples spread over the shutter; anything thin crossing fast must be wider than `speed × shutter / K` or it combs (lesson from video-3).

## The 30-frame anatomy of a pro entrance (one word rising to centre)
| frames | phase | what happens | why it feels good |
|---|---|---|---|
| 0–4 | anticipation | moves 3–5 % of the travel the wrong way (10–15 px), or squashes 0.95 | signals effort; the eye gets ready |
| 4–8 | snap | covers ~85 % of the travel in 4 frames | the eye feels energy, not the path |
| 8–28 | cushion | the last 15 % over ~20 frames | time to read the type; "buttery" |

Ready-made spec: `snap:antic=0.04,a=0.14,s=0.29,p=0.85` (measured: 85 % at f9, 99 % at f22 of 28). Without anticipation: `expo:16` (85 % at f5 of 28) or `ae:out=0.1,in=90`. Compare with `outExpo` (85 % at f8) and the floaty `easyEase` (85 % at f22 — never for entrances).

Spring equivalents (time in seconds): pop-in ζ 0.6–0.7, T 0.35–0.5 (overshoot 4–8 %); premium UI ζ 0.75–0.85; no visible bounce ζ ≥ 0.9. `spring:zeta=0.65,T=0.5` → 85 % at f6, overshoot 6.8 %, settled f16 at 30 fps.

## Overlapping action (the 2–3 frame rule)
Nothing that belongs together stops on the same frame.
- Container then content: box stops at f20, its text at f23 (offset 2–3 f).
- Lead then followers: the hero word lands, the sub-line starts 3–4 f later.
- Secondary motion: things attached to the mover (underline, shadow, particles) lag 2–4 f and settle with a smaller overshoot.
- Exit before enter: the outgoing line starts leaving 2–4 f before the next arrives (overlap, not a gap).

## Durations (30 fps; bigger/farther = longer, sub-linear)
| element | frames | seconds |
|---|---|---|
| micro feedback, tick | 4–6 | 0.13–0.2 |
| connector word (70 % group) | 6–9 | 0.2–0.3 |
| keyword entrance (30 % group) | 10–16 | 0.33–0.53 |
| headline / hero | 12–20 | 0.4–0.67 |
| camera travel between phrases | 12–17 | 0.4–0.55 |
| full-frame transition | 8–18 | 0.27–0.6 |
| exit | 60–75 % of its entrance, ease-in | |
| stagger, letters | 1–2 per letter | |
| stagger, words of one line | 2–4 | |
| stagger, list items | 6–10 | |

## Holds and reading
- A line must sit still (only drift) for ≥ 1.0 s + 0.3 s per word; never < 1.5 s for anything the viewer must read.
- A big hit lands right after a VO pause (silence ≥ 0.15 s), within 0–4 frames of the stressed syllable.
- The hook moves within 3–5 frames of frame 0 and states the message within 1–2 s. No fade from black at frame 0.

## Pacing by genre (visual changes = cuts, field changes, big camera moves)
| genre | median time between visual changes | measured |
|---|---|---|
| hype / drop | 0.3–0.8 s | — |
| character explainer | 1.2–2.5 s | reference 1.85 s, video-2 1.2 s |
| clean tech explainer | 1.5–3 s | — |
| cinematic | 3–6 s with drift and rack focus inside the shot | — |
| video-3 (too slow for its genre) | 5.4 s | the camera scrolled inside one dark field, so nothing visibly changed |

## Rhythm of energy
Measured by `eye.py dna` (energy = mean frame difference): a good explainer has bursts (≥ 0.035) 15–35 % of the time, holds (< 0.006) 15–50 %, and a punch ratio (p95 ÷ median) ≥ 4. Flat energy = "kaku" even when every move is eased.
