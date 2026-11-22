# intro-rnc — STATE (2026-11-13, phase: v2 "Satu Baris" APPROVED in Studio ("i love it well done") and rendered; QA not run, ask first)

**Render:** `build/intro-rnc_v2.mp4` (1920×1080, 30 fps, 32.12 s, 964 frames in `build/v2`, audio = `build/mix_full.wav` AAC 320k,
measured −11.2 LUFS integrated, peak −0.7 dBFS; not normalised to −14). `eye.py sense --flow` / motion-qa-review NOT run yet
(render-main-only rule: ask first).

**Pengantar** (narrated opening, not a logo bumper) for the YouTube channel **"Relentless non-conformist"**:
16:9, 30 fps, 32.12 s, template per episode. Example episode: "Bagaimana jika AI ada di zaman batu?".

## Decisions (Ikhsan)
- "Intro" = a narrated pengantar. 6-part script approved ("udah cocok"), voice **Riri Rida** (`tCKeP99grYL9wZRg6sQ9`, eleven_v3).
- His idea, the hook: **"zoom ke belakang"** — assets in a row in depth, camera snaps backward, each new one sweeps in
  from its side blurred → sharp (right, left, right). Verdict: "i love it efek zoom baris nya perfect".
- **v1 "Gate" look rejected** (Studio check): "animasi api nya jelek", "terlalu jadul, terlalu generik, hampir semua
  youtuber pake efek jadul film gini". Wants fresh but pleasant. A **Vox-style** layer will be added later.
- Picked direction **"Satu Baris"**: the zoom-row is the language of the whole pengantar; fire → lime "AI" plane.
- `_transisi` clips: "bisa tetap kepake, cuma tetap gak keliatan jadul generik" → used only as neutral grayscale light
  sweeps (`lamp`, `wash`) + sparse clip audio (leak at 0 s, camera shutter at the wordmark lock). No burn/perf/shutter images.
- He wants to see the rough pengantar before Ahri researches for real. Work with Ahpo (hand-offs go through him).

## Film v2 (src/film.js; `EP` = per-episode text; `CFG` in src/lib.js). v1 archived: src/film_v1_gate.js, tools/mix_v1_gate.py
| Part | Film time | What |
|---|---|---|
| Hook | 0 → 8.11 | dark clean studio, depth row: bulb (R) LISTRIK · tablet (L) TULISAN · hand axe (R) BATU; lime strike; floor ticks + 01/02/03 |
| AI | 8.11 → 10.47 | "Terus tiba-tiba…", lean in; lime plane sweeps in from the LEFT at `ai−.12`, ink "AI" falls in, camera dives through |
| Questions | 10.47 → 16.12 | light world, forward zoom through 3 type planes, "+" marks; ghost outlines on q3 |
| Channel | 16.12 → 19.33 | dark wipe from the RIGHT, row whips past (c −0.7 → 4), wordmark arrives blurred → sharp, lime slab on "non-conformist" |
| Disclaimer | 19.33 → 27.44 | wordmark docks top-right; sources fly in from the lens R/L/R/L blurred → sharp; HIBURAN. on lime |
| Title | 27.44 → 32.12 | dive into the HIBURAN slab → lime wipes off → light title page; ends diving into the lime "AI" slab |

- No cuts (`scene.cuts = []`), grain .035, soft bloom, neutral vignette, no bars. Lime = the door between dark row and light world.
- Timings unchanged (`tools/place.py`, chapter labels renamed). VO: `audio/voiceover/rnc_vo_riri_take1.mp3` at 0.5 s.
- Audio: `tools/mix.py` reworked (no motor/crackle/jam/film-step) → `build/mix_full.wav`, 59 markers. Measured: mix peak −0.7 dBFS,
  VO RMS −12.3, SFX loudest 50 ms −13.7, SFX peak −4.2. Not heard by Claude.
- Hook assets `assets/hook/{bulb,tablet,axe}.png` are **placeholders** (bulb CC BY 3.0, credit Jakub "Ježísheck" Kolář; tablet PD; biface CC0).
- Check stills (looked at, 44 frames): `build/chk5` + `build/chk5_sheet_{1..4}.jpg`, `build/chk6` + `build/chk6_sheet.jpg`.
  v1 stills: `build/chk3`, `build/chk4`. No full render, no `eye.py sense` yet (needs a render).

## Studio
`setsid nohup .venv/bin/python -I tools/studio/studio.py aset/intro-rnc --port 8771` → http://127.0.0.1:8771 (running; reload the tab for v2).

## Next
1. **Ikhsan checks Studio** (WAJIB before any render) → notes or OK.
2. After OK: render main MP4 only (`tools/render.py --scene a --out build/v2` → `tools/encode.py`), `eye.py sense --flow`, show, ask.
3. Ahpo: `PESAN-AHPO.md` (3 hook cut-outs per episode ≥ 1400 px, lit from the centre, clean studio look) once approved.
4. Open: `CONCEPT.md`, OFL licence texts, CREDITS (bulb CC BY), Odoo log (project + initials unanswered), edig-prd,
   /usage item 1 (`peneliti-browser` model: his choice pending).
5. Weak spots to raise: lime wipe edge shows 8 motion-blur steps for 1–2 frames; disclaimer background is nearly empty dark
   (type fills the frame); hook assets are museum photos, not designed art; label "ALAT PALING CANGGIH MANUSIA" alone ≈2 s.
