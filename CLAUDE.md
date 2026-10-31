# super-motion workspace

Code-generated motion graphics (videos rendered frame by frame from HTML/canvas/three.js) and creative-web motion for Ikhsan (IDS, Ecodigitus). Projects live in `aset/video-N/`; references in `video-breakdowns/`; offline docs in `motion-docs/`; audio in `audio/{sfx,voiceover,music}`.

## Hukum dasar motion (always on, no need to be asked)
1. **Knowledge first.** Before any motion work read the motion memories, the `motion-taste` skill and the `motion-docs` NOTES the piece needs. The user explains a concept; you direct it with these formulas.
2. **Formula before frames.** Write the formula rasa (idea, a metaphor that generates the layout, recipe with fps/lens/eases, type pair, colour script per section, motif lock, measurable targets) and build 3–4 styleframes as stills. Each styleframe passes `eye.py poster` ≥ 70 before anything is animated.
3. **Motif lock.** Max 3 signature techniques per film. The arsenal is a menu, never a checklist; say which techniques were left out and why.
4. **See what you made.** After every render run `python -I .claude/skills/motion-eye/scripts/eye.py sense <render>` and handle its ⚑ lines next. Before any preview reaches the user: `eye.py review <render> --ref <reference dna>` (SKOR RASA ≥ 80, tells fixed or answered "sengaja, karena …"), plus `motion-qa-review` for defects. Open the sheets — numbers are only half of seeing.
5. **Originality.** References teach craft only; concept, script, world, palette and signature transition are ours.
5b. **Kiblat.** `my-ref/` holds the videos whose DNA, feel, SFX, motion, typography, elements and angles Ikhsan loves. Their combined taste is `my-ref/_eye/kiblat/` (`kiblat.json`, `kiblat.md`) and `motion-taste/references/kiblat-ikhsan.md`. When a brief has no specific reference, the kiblat is the reference: targets from `kiblat.json`, review with `--ref my-ref/_eye/kiblat/kiblat.json`. Learn its DNA; never copy a video from it.
6. **Audio is VO-first**; ElevenLabs output goes to `audio/{sfx,voiceover,music}`; confirm credit spend before generating.
7. **Secrets** stay in `.env.local` (never printed, never committed).
8. **Honest reports.** Say what was measured, what was only looked at, and what you could not check (you cannot hear the mix or watch the motion in real time).
9. **Learn without forgetting.** Techniques live in the ledger (`python -I .claude/skills/motion-taste/scripts/ledger.py`): `menu --recipe …` at the formula stage, `verdict` with Ikhsan's words after his notes, `add` for a film's new techniques. Lessons that change how the eye judges (motion-eye rules, calibrations, the kiblat) must pass `python -I .claude/skills/motion-eye/scripts/replay.py`; a red replay blocks the change, and `--update -m "why"` is only for deliberate changes.
10. **Open briefs are a trap, not a licence.** When Ikhsan says "bebas", "terserah", "pokoknya keren" or "lihat skill mu", Claude is the director and he is the client: answer the three filter questions (who watches and where · the one feeling · how dense the information is) from his words and the kiblat, ask once in one compact question if still unclear, propose 2–3 directions, and get styleframes + a 3-second motion test approved before the full build (`motion-director/references/client-brief.md`).

Workflow and gates: `motion-director` skill. Eyes: `motion-eye`. Formulas: `motion-taste`.
