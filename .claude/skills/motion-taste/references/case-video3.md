# Case: video-3 "Source Cut" (2026-10-29) — measured failure and the lesson

The user's words: "kecewa sama hasil yang 3 — neon sampah, kinetic teks tidak enak, font jelek, mata melihatnya apaan ini, asal jadi, konsepnya tidak menyatu ini arahnya kemana… dibandingkan referensi itu kok enak gitu dilihatnya, rumusnya itu loh kurang… video 2 itu bagus walaupun belum sempurna."

## The numbers (`eye.py dna` / `review`, 10 fps; reference cropped to the laptop screen)
| metric | reference | video-2 (liked) | video-3 (disliked) |
|---|---|---|---|
| SKOR RASA vs the studied reference (100 = hits its formula, not "perfect") | 100 | 100 | 68 |
| SKOR RASA vs the kiblat (14 liked videos, `my-ref/`) | — | 88 | 72 |
| SKOR RASA vs kiblat v2 (41 liked videos, replay 2026-10-29 21:18) | — | 88 | 60 |
| colour fields (sections) | 8 | 11 | **1** |
| ΔE between consecutive shots | 25.0 | 26.6 | **3.9** |
| value range across shots (L) | 82 | 92 | **7** |
| contrast in frame (L p5–p95) | 67 | 69 | **24** |
| muddy frames | 16 % | 16 % | **88 %** |
| median time between visual changes | 1.85 s | 1.2 s | **5.4 s** |
| burst share | 33 % | 22 % | **10 %** |
| empty frames (> 85 % calm) | 3 % | 4 % | **20 %** |
| accent families over the film | 9 over 8 fields | 9 over 11 fields | **5 over 1 field** |
| paused frames failing type hierarchy (first, strict rule) | — | — | **6 / 8** |
| camera alive during holds | 90 % | 80 % | 74 % |

Calibration note (same day): after measuring the kiblat, the poster test was relaxed for airy minimal frames (small calm type in big negative space is part of Ikhsan's taste when the frame is light and the focal point is clear). Under the relaxed rule video-3's single frames pass more often; the film still fails on what the kiblat never does — one dark field, mud, dark-mode accents, flat rhythm.

## Why it happened (causes, not symptoms)
1. **The concept was never made visible.** "A source file being compiled" lived in the writing; on screen it became a near-black navy field with faint ghost code. A metaphor must generate a physical, lit, layered world; otherwise every frame is the same dark rectangle.
2. **Effects replaced direction.** After the hook preview the user asked whether supermotion was used, and the response was to add every technique (domain warp, velocity squash, rack focus, recompile glyphs, caret wipe, diff wipe, chips, terminal, film strip, wall of frames). The lesson written then — "use every technique that serves the story" — was read as "use every technique". Ten motifs, no motif.
3. **No colour script.** Six named colours (ink, paper, mint, violet, amber, coral) were all used as accents on the same field, the dark-mode-AI look the user calls "neon sampah".
4. **Three type families mixed inside phrases, small connectors, hero at 4.5–7 % of frame height** in a 9:16 frame that was 71 % empty.
5. **Camera travel without parallax cues.** "Editor scroll" between phrases happened over a uniform dark field, so the viewer saw text swapping, not a journey — "transisinya gak ada".
6. **QA checked defects, not taste.** Safe areas, flicker, levels were checked; nobody looked at a paused frame and asked "is this a good poster?", and nobody compared the film's rhythm to the reference's.

## Rules now
- Formula rasa + colour script + 3–4 styleframes with `eye.py poster` ≥ 70 before any animation (motion-taste gates G0–G1).
- Motif lock of max 3 techniques; the arsenal is a menu. Report which techniques were deliberately NOT used.
- Every render gets `eye.py sense`; every preview gets `eye.py review --ref` and its top 3 fixed before the user sees it.
- One world, lit, with depth; the metaphor generates the layout.
- Two families, hero ≥ 3× support, hero 10–17 % H on 9:16.
- Section turns change the field (ΔE ≥ 25) — that is the transition the viewer feels.

A re-direction of the same idea that would pass these rules is written in `formula-rasa.md` (worked example).
