---
name: motion-sound-design
description: Sound design and final mix for motion-graphics videos in the professional explainer style — VO-first mix, a low pad/drone bed per section that ducks under the voice and cuts to digital silence before punchlines, SFX per visual event (whoosh, slam, mosaic crunch, glitch, shimmer, thunder), a typography SFX for every word matched to its entrance, pitch variation, level checks, and a two-pass loudnorm encode to -14 LUFS. Use it whenever a motion video needs music, SFX, "audio efek", mixing, loudness or final encoding, or when the audio sounds "jedug-jedug", messy, amateur or too loud against the narration.
---

# Sound design and mix

The audio in a strong explainer isn't music with talking on top. It's a voice with a quiet bed and a lot of small, well-placed sounds. In the reference: there was no beat, just a low drone that vanished to digital silence a third of a second before each punchline, and 8-bit blips, rising glisses and clicks on every transition. A first attempt that put a 120 BPM anthem with booms under everything was rejected as "kacau".

## The rules
1. **VO first.** While the VO talks, the bed plus SFX sits 8–15 dB under it. A slam may come within ~2 dB for a frame or two. For a lay viewer half of the perceived quality is audio: a tight whoosh exactly on the 4 fast frames of a camera move, fine UI clicks on staggered text, and a hit on the main keyword — built as 0.15–0.3 s of silence, then a bright tight transient with the sub rolled off (Ikhsan's kiblat measures 0 % boomy onsets; video-1 failed on booms), not a sub-bass drop.
2. **The bed is quiet and sectional.** Use `bed.push({t0, t1, kind})`. Kinds: `hook` (pumping minor pad + soft sub), `red` (darker pad), `dark` (sub drone + eerie tone), `lofi`/`lofi2` (warm e-piano chords, very soft kick, crackle), `storm` (rising tension), `cosmic` (airy, no drums), `cta` (soft resolve that keeps playing after the VO). Drum-free kinds from video-3: `rhodes`/`rhodes2` (warm Rhodes in D, `rhodes2` adds a soft arpeggio), `calm` (thin pad for an honest beat), `swell` (opens up under a thesis), `cta3` (soft Dmaj9 resolve). The reverbed bed is gated by the section mask, so gaps stay digitally silent. Leave gaps before punchlines: the bed drops to silence and the hit brings it back.
3. **One sound per event, never the same sample twice in a row.** Mix SFX 12–24 dB under the VO, with a seeded ±3–6% pitch/rate spread per use.
4. **Typography SFX.** Every word gets one, chosen from its entrance by `kit.finish()`: whoosh for slides, swoosh-up for rise/arc, air swish for fly, pop for per-letter pops, card flick for flips, thud for drops, swish for swing/whip, chirp/scramble for smear and decode, key clicks for typewriter, a marker swipe for highlight boxes, and a stamp for mid-size slams. Big slams carry `impact_slam` instead. Set `sfx: false` on a word to silence it.
5. **Loudness.** Two-pass linear loudnorm to −14 LUFS / −1.5 dBTP at the encode.

## SFX library
- `references/sfx-prompts.json` holds every sound the engine names, with the ElevenLabs prompt and duration. Generate missing ones with your own key; this **costs credits, so confirm first**:
  ```bash
  uvx --from "python-dotenv[cli]" dotenv -f <path>/.env.local run -- python -I tools/generate_sfx.py <skills>/motion-sound-design/references/sfx-prompts.json
  ```
  Existing files are skipped, so a team can share one generated library inside its organization. Check the ElevenLabs terms before sharing generated audio outside it.
- The mixer also synthesises `tick pop dissolve decode riser_soft` (8-bit micro sounds), so those need no files.

## Mix and check
```bash
python -I tools/dump_cues.py                                  # cues + bed from the timeline
python -I tools/mix.py --out build/mix_full.wav [--until 26]  # VO (build/vo_edit.wav) + bed + SFX, reverb, ducking
python -I tools/measure_levels.py build/mix_full.wav build/vo_edit.wav --sections build/cues.json
python -I tools/encode.py build/frames build/mix_full.wav out/film.mp4 --share
```
Read the level table. If a section says `bed/SFX too loud`, lower the loud cues in the timeline (thunder, risers and whips tend to stack) or the bed kind's amplitude in `mix.py`. Look at a spectrogram of the preview (`ref_audio_analysis.py` from motion-reference-breakdown) and confirm three things: the gaps before slams are truly quiet, the VO harmonics dominate, and the low end isn't a constant thick band.

## What to tell the user
You can measure but not hear. Say so, show the level table in one line, and ask them to listen to the mix, especially the bed.
