---
name: motion-eye
description: Claude's eyes and measured taste for motion — reads any video (a reference, a filmed screen, our own render or a frames folder) the way a motion designer scrubs it, and draws what to look at: colour-script strip, value/energy graphs, shot strip, eye-trace path, poster test of paused frames, onion skins with spacing, ease/spring curves with speed graphs, and a SKOR RASA review with numbered fixes and "bau template" tells, optionally against a reference. Use it whenever a motion piece is planned, built or judged: measuring a reference before writing a concept, testing styleframes, choosing eases ("85 % in 4 frames?"), checking a hero move, after EVERY render (sense), before showing any preview (review --ref), and whenever the user says the result feels off, dark, neon, kaku, generic, "kok referensi lebih enak", or asks "kenapa jelek" — even if they don't mention measuring. Read-only: it never edits a project.
---

# Motion eye

You can't watch video, so this skill gives you eyes: pictures to look at and numbers to name what you see. Use it the way the art-craft sensors work: look → feel → name → fix, at every gate, without being asked. The numbers are half of seeing; ALWAYS open the pictures it writes (Read tool) before judging.

Script: `.claude/skills/motion-eye/scripts/eye.py` (Python 3.11+, numpy, OpenCV, Pillow, imageio-ffmpeg — already on this machine). Run with `python -I`. Output defaults: a render in `<project>/out/x.mp4` → `<project>/build/eye/x/`; anything else → `<folder>/_eye/<name>/`.

## Commands
| need | command | look at |
|---|---|---|
| Learn a reference's formula | `eye.py dna ref.mp4 [--crop x0,y0,x1,y1]` | `dna_sheet.jpg`: colour script, value & energy graphs, shots, eye path, numbers |
| Quick sensor after every render | `eye.py sense out/hook.mp4` | ⚑ lines (handle them in your next step) + `sense_sheet.jpg` |
| Judge a preview/final like a senior | `eye.py review out/x.mp4 --ref <ref dna.json or video> [--ref-crop …]` | SKOR RASA, ⚑ tells, top-3 advisory, `review_sheet.jpg`, `poster_sheet.jpg` |
| Compare formulas side by side | `eye.py compare refdir v2dir v3dir --names ref,v2,v3` | `compare.jpg` (colour scripts stacked + table) |
| The user's taste across many liked videos (kiblat) | `eye.py dna <each video> --autocrop`, then `eye.py kiblat my-ref` | `my-ref/_eye/kiblat/`: `kiblat.json` (medians → use as `--ref`), `kiblat.md` (signature vs free traits), `kiblat_board.jpg` |
| Judge against the whole taste | `eye.py review out/x.mp4 --ref my-ref/_eye/kiblat/kiblat.json` | same review, targets = medians of every liked reference |
| Poster test (styleframes, paused frames) | `eye.py poster frame.png` · `eye.py poster x.mp4 --times 2.0,7.5` · `--random 6` | annotated posters: thirds, UI zones, calm space, text lines with heights, focal point, palette, score |
| Find where to look in a long video | `eye.py moments ref.mp4 [--autocrop]` | strongest bursts, cuts/transitions, longest holds (for posters), impact/strobe times |
| See a moment frame by frame | `eye.py look x.mp4 --around 3.2 --span 9` (every source frame) or `--times 3.20,3.27 [--rect x,y,w,h]` | time-coded grid / zoom — smears, impact frames, whiteouts |
| Feel a move (spacing, arcs) | `eye.py onion x.mp4 --from 3.2 --to 3.8 --n 8 [--rect …]` | onion skin coloured by time + spacing per sample |
| Choose an ease by numbers | `eye.py curve snap outExpo "expo:16" "spring:zeta=0.65,T=0.35" --frames 24 --fps 30` | value graph, speed graph, spacing chart, frame at 50/85/90/99 %, overshoot, settle |
| Plan smear and reactive optics for a move | `eye.py curve snap --frames 28 --travel 900` | px/frame per frame, which frames smear (stretch ×) and the RGB split each gets (studio-tricks rules) |
| Prove a rule change didn't make the eye forget (replay) | `replay.py` (`--quick` ≈ 25 s, full ≈ 80 s) · `replay.py --selftest` | `my-ref/_eye/replay/last_report.md`: golden films, posters, kiblat members vs `golden.json` lessons + drift vs `baseline.json` |

## Replay: the eye must not forget (continual learning)
Every lesson the eye learned is tied to the work that taught it, in `my-ref/_eye/replay/golden.json`: video-2 (liked) must stay ≥ 82 vs the kiblat and never trip the dark/neon tells; video-3 (rejected) must stay ≤ 78 and keep firing "Satu latar gelap…", "Lumpur gelap", "dark mode + aksen neon", "Teks kecil di ruang kosong yang gelap"; liked − rejected ≥ 10 points; the kiblat videos (41 since kiblat v2) keep a median ≥ 75 and none below its floor; 12 frozen good posters stay above their bands and 2 synthetic bad ones (the video-3 look as a still, a 7-colour clutter) stay below 65.
- **When:** after ANY change to `eyelib/` (measures, poster, review), to calibration numbers, to `kiblat.json` (new liked videos), or to the taste rules the eye encodes. A red replay blocks the change: fix the rule, or change `golden.json` on purpose and say why.
- **Accepting a change:** `replay.py --update -m "why the taste changed"` rewrites `baseline.json` (only when the lessons pass) and logs it in `history.jsonl` with the judge hash. Drift ≥ 6 points or a category flip vs the baseline is a ⚠ to read, not a failure.
- **Is the alarm alive?** `replay.py --selftest` breaks three rules in memory (a forgotten tell, a lenient judge, a blind poster test) and must catch all three.
- **New lesson from a film?** Add it to `golden.json` as an assertion on that film (a tell that must fire, a band) — but only for numbers that are stable across poster sampling (`--quick` uses 4 posters, the full run 8; tells that depend only on the film DNA are stable).
- First run (2026-10-29) found a real blind spot: posters summed points, so a frame failing contrast, colour, space and zones still "passed" at 73. Now a frame that fails 3 of the 5 fundamentals (kontras, warna, fokus, ruang, tipe) is capped at 64.

Curve specs: named (`outExpo`, `outQuint`, `inOutCubic`, `outBack`, `easyEase`…), `bezier:x1,y1,x2,y2`, `ae:out=0.1,in=90` (AE influence), `expo:k`, `spring:zeta=…,T=…`, `snap:antic=…,a=…,s=…,p=…` (anticipation → snap → cushion), and `…@steps:12` to preview posterize-time stepping.

A filmed reference (phone recording of a laptop): find the real canvas once (`look` a frame, read the screen rectangle) and pass `--crop x0,y0,x1,y1` everywhere — same convention as `motion-reference-breakdown`.

## What the numbers mean (and what good looked like)
Measured 2026-10-29: the studied reference and video-2 (liked) vs video-3 (disliked). Full table in `motion-taste/references/case-video3.md`.
| number | meaning | liked | disliked |
|---|---|---|---|
| colour fields / ΔE between shots / value range | does the colour script change per section? | 8–11 / 25–27 / 82–92 | 1 / 3.9 / 7 |
| contrast (L p5–p95) and muddy % | value punch; mud = median L < 22 and contrast < 45 | 67–69, 16 % | 24, 88 % |
| colours per frame, accent families | 3-colour rule; accents vs fields | 4, 9 over 8–11 fields | 3, 5 over 1 field |
| negative space, empty %, one-star % | designed space vs emptiness; one focal point | 47–48 %, 3–4 % | 71 %, 20 % |
| eye jump (share > 35 % diagonal) | does the eye get thrown around at cuts? | 25–38 % with full-frame changes | 20 % |
| burst / hold / punch | rhythm of snaps and reading holds | 22–33 % / 15–45 % / 8–26× | 10 % / 48 % / 8× |
| camera alive | does the frame breathe on holds? | 80–90 % | 74 % |
| shot median, cut/10 s | pace of visible change | 1.2–1.85 s | 5.4 s |
| poster score | still-frame design quality (≥ 70 passes); airy light minimal frames with a clear focal point pass, dark low-key ones lose points | kiblat frames 15/20 pass | 8/8 (single frames are fine — the film is the problem) |
| SKOR RASA | 10 categories × 10, targets from the reference (100 = hits its formula, not "perfect") | 100 vs the studied reference, 88 vs the kiblat | 68 / 72 |
| impact 1-frame / strobo | single frames unlike both neighbours (inverts, flash frames); runs of them = strobe bursts | video-2: 4 (2/min); reference: 1 strobe burst at 7.9 s | 0 |
| kedip maks / detik | general flashes (≥ 25 % of the frame reversing luminance ≥ 0.1, measured on 4×4 areas) in any 1 s — > 3 is a photosensitivity risk (WCAG 2.3.1 style estimate) | 4 at 108.1 s (video-2) and 39.7 s (reference): trim one reversal | 0 |
| pecah RGB diam / cepat | chromatic split at rest vs the spikes on fast frames (px of frame width) — optics should follow speed | video-2 2.6 / 6.5 px | 1.2 / 3.5 px |
Numbers are aids, not taste: a deliberate choice that breaks a target is fine when you can say why ("sengaja, karena …").

## The loop at each gate (see `motion-taste` for the gates)
1. **Look**: run the command, open the sheet(s).
2. **Feel**: one honest line in your own words ("all frames sit at L 5–10, the hero is a small mint word top-left, nothing changes for 5 s").
3. **Name**: map it to the formula (which target is missed, which tell fired).
4. **Fix**: change the cause in the timeline/styleframe, re-render the moment, look again. Report before/after numbers to the user.

## Limits (say them honestly)
- Pixel measurements: text lines are MSER estimates (busy sets can add noise), focal points come from saliency, camera motion from optical flow (flat fields hide motion). Trust the pictures over a single number. On full-bleed busy photos (flowers, foliage, crowds) the texture can steal the focal point and be read as "text lines" — judge those frames by eye.
- Cuts are histogram spikes: a camera move inside one uniform field is NOT a cut — that is a finding, not a bug.
- `dna`, `review` and `sense` re-cache a video's `dna.json` with the crop they were given. Re-judging a kiblat member without its crop (`--crop` from `dna.json` → `sig.crop`, or `--autocrop`) overwrites its letterbox-free DNA, and the next `kiblat` rebuild uses the wrong numbers (happened once on 2026-10-29; restored with `dna --autocrop`). Screen recordings of an editor: `--crop` the canvas, or the timeline UI counts as clutter.
- Flash counting is an estimate from frame luminance (no viewing-distance or red-flash model): treat > 3/s as "look at it with `look --around`", and fix it when the strip confirms full-frame reversals. It is not a certified PEAT/Harding test.
- Chromatic split is measured by phase-correlating the R and B edge maps in tiles; it needs edges (flat frames return nothing).
- It can't hear taste in audio; it only reports onsets, silences and cut sync. Loudness/mix stays with `motion-sound-design`.
- Defect checks (flicker, ghosting, safe-area overlap from the engine's own boxes) stay with `motion-qa-review`; this skill judges design and rhythm.
