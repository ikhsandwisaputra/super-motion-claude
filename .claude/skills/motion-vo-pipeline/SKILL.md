---
name: motion-vo-pipeline
description: Write the voice-over script for a motion-graphics video and turn it into frame-accurate word timings — script on a proven explainer arc, narrator selection from the ElevenLabs voice library (free previews first), TTS with per-character timestamps, pronunciation fixes, an editor-style tightening of pauses, and a words_edit.json that drives every on-screen word. Use it whenever a motion video needs narration, a narrator ("cari narator", "voice over", "VO"), word-by-word sync, or when an existing VO feels slow, flat or badly timed.
---

# Voice-over pipeline

In this style of video the VO is the metronome. Every on-screen word appears on the frame its spoken word starts, and the big hits land right after a pause. That only works with real word timings and a tight edit.

## 1. Script
- Write an original script on the arc chosen in the film's concept. `references/script-template.md` shows the form (hook → problem → reveal → proof → turn → calm contrast → core → you → CTA); never reuse a reference's lines or argument order. Write one line per beat, each line one idea of 6–14 words.
- Mark one slam word per line in CAPS (WRONG, NEVER, YOU). With `eleven_v3`, CAPS and ellipses ("So... let's cook.") steer emphasis and pauses.
- Give `SCRIPT.md` an energy column: red = emotional peak / main keyword (≤ 20 % of the lines — the only places for finishing moves and hits), yellow = explanation, green = connectors, intro, outro (simple, airy). The storyboard reads it (`motion-director/references/client-brief.md`).
- Facts on screen come only from sources the user gave you. If a stat isn't backed, write a rhetorical line instead ("It does the heavy lifting").
- Show the script to the user before generating. Save it as `SCRIPT.md` (table: # · section · line).

## 2. Voice
- Search the library for free: ElevenLabs MCP `search_voice_library` with queries like "upbeat confident female explainer" or "energetic american narrator social". Download 3–4 preview MP3s into `audio/voice_previews/` and let the user listen and choose.
- Measure the reference narrator's pitch if a match matters (median F0 ~120 Hz male, 180–250 Hz female). The user's choice wins.
- **Credits:** TTS costs about 1 credit per character on most plans. Tell the user the estimate and wait for "yes".

## 3. Generate with timestamps
```bash
# key stays in the user's own env file; never print it
uvx --from "python-dotenv[cli]" dotenv -f <path>/.env.local run -- python -I tools/tts.py build/vo.txt vo_take1 --voice <id> [--model eleven_v3]
```
- **Pronunciation.** Feed phonetic spellings to the TTS ("Iksan Dwee Saputra" for "Ikhsan Dwi Saputra"), and map them back for display with `build/display_map.json` (`{"Iksan": "Ikhsan", "Dwee": "Dwi"}`).
- **Output format.** 192 kbps needs Creator tier; the script defaults to `mp3_44100_128`.

## 4. Word timings and the tight edit
```bash
python -I tools/words.py audio/voiceover/vo_take1.align.json build/words.json --display build/display_map.json
ffmpeg -i audio/voiceover/vo_take1.mp3 -ac 1 -ar 48000 build/vo_take1.wav      # imageio_ffmpeg's binary works
python -I tools/vo_edit.py build/vo_take1.wav build/words.json build/vo_edit.wav build/words_edit.json --rules build/vo_rules.json
```
`vo_edit.py` works like an editor's cut:
- It detects real silences and snaps each word's start and end onto speech energy.
- It shortens each pause by context: mid-phrase ~0.07 s, comma 0.12, sentence/line 0.20, ellipsis 0.24, list items 0.17. It keeps longer breaths only where you ask (`long_before_line` for section turns and punchlines, ~0.3–0.55 s).
- It splices with 6 ms crossfades and remaps every word time.

A typical result is a 126 s raw take that becomes 116 s, close to a punchy reference. Check the printed table, where `[0.4x]` marks remaining gaps, and listen if you can.

## 5. Hand-off
`build/words_edit.json` holds `{i, word, punct, line, start, end, gap_after}` per word. The timeline addresses words by index: `w(i)` for start, `we(i)` for end, `wi("WRONG")` for lookup. Re-running the edit moves the whole film with it.
