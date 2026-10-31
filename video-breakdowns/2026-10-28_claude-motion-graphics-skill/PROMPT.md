# PROMPT — Pixel-Voxel Kinetic Explainer

> ⚠️ **Referensi studi saja.** Ini spesifikasi hasil reverse-engineer gaya satu kreator, jadi jangan dipakai mentah-mentah untuk konten publik. Untuk konten sendiri, pakai prompt orisinal, contohnya [ynwa-motion/PROMPT.md](../../ynwa-motion/PROMPT.md).

Gaya hasil bedah TikTok "Tutorial 1 · Claude Motion Graphics skill" (asal tiap angka: [BREAKDOWN.md](BREAKDOWN.md)).

**Cara pakai**
- **A. Master prompt**: paste ke Claude Code di folder project kosong, lalu isi bagian `{{...}}`. Kalau naskah/VO belum ada, kosongkan saja; Claude akan menulis naskah dan estimasi timing dulu.
- **B. Versi ringkas**: untuk brief cepat di chat.
- **C. Template B-roll AI video** (Higgsfield/Seedance/Kling): hanya untuk set/insert tanpa teks. Tipografi tetap dibuat di kode, karena model video belum bisa menyinkronkan teks per kata.
- Prompt sengaja ditulis dalam English: istilah motion dan API lebih presisi, dan bisa dipakai di tool mana pun.

---

## A. Master prompt

```text
You are a senior motion designer, film editor and creative developer in one person.
Build a code-generated, VO-driven kinetic-typography explainer video in the
"PIXEL-VOXEL KINETIC EXPLAINER" style specified below. Every number in this brief is a
default you may tune by about ±20% — not a suggestion you may ignore.

== 0. INPUTS ==
TOPIC / ANGLE ..... {{what the video argues, in one sentence}}
SCRIPT (VO) ....... {{paste script}}
                    If empty: write it first. Conversational, punchy, 6–14-word sentences,
                    one idea per sentence, ~2.5 words/s. Arc: hook → problem → reveal → proof →
                    meta turn → core value → "that's you" → CTA.
VO AUDIO .......... {{path/to/vo.wav + words.json with per-word start/end}}
                    If none: estimate timings (2.5 words/s, 4–10-frame pause between phrases,
                    10–12 frames before punchlines). Store them in timing.json so a real VO
                    (forced-aligned) can replace them later without touching components.
DURATION .......... {{60–120}} s
HERO CHARACTER .... {{e.g. chibi pixel-art detective-director: deerstalker hat, trench coat, magnifier}}
SIDEKICK .......... {{e.g. orange cube creature with a tiny grey fedora and dot eyes}}
CTA ............... comment keyword(s) {{KEYWORD_1}}, {{KEYWORD_2}} · teaser toast {{e.g. "Part 2"}}
FORMAT ............ 1920×1080, 30 fps, H.264 + AAC (default — designed to be shown on a laptop
                    inside a 9:16 TikTok wrapper, §10) OR 1080×1920 native (stack text above/below
                    the character, 8% safe margins, keep the bottom 20% clear for platform UI).

== 1. STACK & HARD RULES ==
- Deterministic: every value is a pure function of the frame index. No wall-clock time, no
  unseeded randomness (seeded PRNG per element), no real-time physics.
- Default stack: Remotion (React) + @remotion/three (react-three-fiber) + @react-three/drei +
  @react-three/postprocessing. Check Remotion's license terms for company use. Fallback without
  Remotion: Vite + one paused GSAP master timeline (SplitText for per-letter work) + R3F with
  frameloop="demand"; step every frame headlessly (Playwright), seek the timeline to frame/30,
  capture, encode with ffmpeg.
- Code-native art: pixel sprites are character grids + palette, rendered nearest-neighbor
  (image-rendering: pixelated); voxel sets are instanced cubes; icons are pixel or voxel too.
  External media only for the optional B-roll in §7.
- One config file (timeline.json) drives everything: beats, words, roles, environment, camera,
  entrances, transitions, SFX cues. Components read it; nothing is hand-timed inside a component.

== 2. WORKFLOW (stop and show me the result of steps 2 and 4) ==
1. BEAT MAP — split the VO into words with start/end frames and tag each word:
   CONNECTOR | CONTENT | EMPHASIS | NUMBER | UI_LINE | CTA. Max one EMPHASIS per phrase.
2. STORYBOARD TABLE — one row per beat (= one VO phrase of 2–7 words, 1–3 s): frames in/out,
   words + roles, environment, characters + poses, text layout zone, camera move, entrance per
   word, exit/transition, SFX. Mark the section boundaries from §3.
3. BUILD the components in §6 and timeline.json.
4. PREVIEW the first 10 s (the hook) as an MP4.
5. FULL RENDER, then run the QA checklist in §11 and report every check with frame numbers.

== 3. PACING & STRUCTURE ==
- One VO phrase = one beat. Median beat 1.5 s (range 0.2–4 s). Allow 2–3 long "system" shots
  (8–11 s) carried by an internal camera move plus continuous word builds.
- A visual event every 0.3–0.5 s (≈ every spoken word). Never 15 frames with nothing new on
  screen, except the CTA hold.
- Big hits (slam, mosaic, smash zoom, flash) land on the FIRST syllable of a new phrase,
  0–5 frames after a VO pause — never mid-word, never on a phrase's last word.
- Transition mix over the whole video: hard cut on phrase start ≈ 50% · pixel mosaic (T1) ≈ 25%
  · flash / white-out ≈ 12% · dip or glitch to black ≈ 10% · specials (whip, PiP rewind, smash
  zoom, foreground wipe) reserved for section turns.
- Section map (% of runtime):
  0–7    HOOK — bold claim under the colour strobe; "everyone asks the same thing" → slam the
         counter-claim (background swaps orange → red).
  7–13   PROBLEM — glitch to black, one quiet line; "ask for X → you get <bad result>" with a
         3D ribbon of thumbnail cards.
  13–30  REVEAL + PROOF — who/what; voxel desk set; push into the monitor's UI; social-proof
         counter; Ken-Burns pull-out reveal of a crowded room.
  30–38  META TURN + CONTRAST — PiP-shrink into "this very video" with a rewind montage; one
         epic beat; then a calm monochrome cosmic passage (thin type, no red, slower events).
  38–80  CORE VALUE — "there is no magic X"; what's inside, shown as a pipeline of step-icons on
         a lateral truck; "a whole crew in one file"; every system / rule / fix; editor-timeline fixes.
  80–90  RATIO / YOU — elements fly into the file icon; framework panel; % counters; smash zoom
         on the hero for "that's YOU"; "your idea, your taste, ...".
  90–100 CTA — "did the hard part so you don't have to" → end card (§9).

== 4. ART DIRECTION ==
Palette: bg #050505 · hook orange #E8641A (radial to #A33808 at the edges) · alarm-red bg #B3000C
  · accent red #E3262F · deep red #7A0008 · teal #19C3B5 · amber #F5A623 · yellow #FFD60A ·
  counter orange #FF7A1A · text white #FFFFFF.
  Red = conflict and emphasis only. Teal = UI, data, CTA. Yellow/amber = ideas and light.
Colour script: orange → red → black → warm voxel interiors → night illustration → monochrome
  cosmic → red-carpet stage → black + teal grid → dark + teal CTA.
Type roles (3 size tiers):
  CONNECTOR   clean UI sans (Inter-like) 500, ~3% of frame height, white 85%
  CONTENT     geometric heavy sans (Poppins / Montserrat ExtraBold-like), 6–9% H, white,
              soft shadow 0 4px 14px rgba(0,0,0,.6)
  EMPHASIS    condensed all-caps display (Anton / Bebas-like), 14–25% H, accent red (white on a
              red background), tight tracking, allowed to crop off-frame
  FEELING     brush/script italic accent, red or white
  NUMBER/BIN  pixel/LCD font (VT323 / Silkscreen-like), counter orange or teal
Layout: ragged left-aligned stack in the third of the frame beside the character, never over its
  face; 1–3 lines; scattered editorial placement; each new phrase clears the previous one.
  Never centred subtitles.
Sets: voxel dioramas (Minecraft-like), dark interiors with warm practical light — desk + monitor
  with live UI (code editor, chat window, video-editor timeline), emissive voxel lamp, voxel
  plant, bookshelves, wood wall with colourful frames, round red-carpet stage, black void with a
  teal perspective grid floor. Shallow DOF + bokeh, bloom on emissives, vignette, 3% film grain,
  chromatic aberration only on hits.
Characters: 2D pixel sprites as billboards inside the 3D sets (hero ~32 px wide grid, sidekick
  ~16×16), 5–6 poses each (idle, point, hold-prop, surprised, celebrate, fall). Crisp at any scale,
  including full-frame close-ups.

== 5. MOTION VOCABULARY (frames @ 30 fps) ==
ENTRANCES — chosen by word role, never at random:
  E1 BLUR-SLIDE (CONTENT/CONNECTOR, the default): from ±5–10% of frame width, 2–3 f, expo-out, horizontal
     motion blur, start rotation −6° → 0°, faint RGB fringe on the fastest ones.
  E2 CHROMATIC SMEAR (hook lines): per-letter stagger 1 f; each letter enters with a hue-cycling
     smear (pink → blue → yellow) and settles to white in 5–7 f.
  E3 TINT-SETTLE (secondary emphasis): enters white via E1, colour-tweens to accent red in 5 f.
  E4 DECODE (key nouns, numbers): 4–6 f of random glyphs — teal binary or rainbow letters —
     resolving left → right into the final word.
  E5 TYPEWRITER (UI_LINE, quoted lines, CTA): 0.5–1 char/frame (CTA ≈ 4 f/char), caret blinking
     8 f on / 8 f off; optional speaker icon before quoted VO lines.
  E6 LETTER POP (short caps words): letters rise from below, 1 f stagger, 110% → 100% in 4 f.
  E7 SLAM (EMPHASIS at a phrase start):
     f0–1   previous comp shakes ±8 px + directional blur
     f2–3   white flash; the word appears at 160–200% scale, cropped by the frame
     f3–6   scale → 100% (expo-out, ~103% overshoot); background colour swaps; a red shockwave
            ring expands from the character; the character changes pose via SPRITE BURST
     f8–14  a small-caps second line enters with E1; previous words fall back (blur 6 px,
            tinted red, 60% opacity)
  EXITS: cut with the scene, or disintegrate into pixel chunks / glitch noise in 4–5 f.
  No slow fades anywhere.
TRANSITIONS:
  T1  PIXEL MOSAIC (signature): 16×9 grid; cells flip in seeded random order in {white, accent red,
      deep red, black, occasionally salmon/teal}: 4–5 f to full cover, hold 2–4 f, 4–5 f out
      revealing the next scene (12–14 f total). PARTIAL variant (30–60% of cells, 3–5 f) for
      angle changes inside the same set.
  T2  WHIP EXIT: comp accelerates off-frame (ease-in, 6 f) with directional blur; usually into T1.
  T3  LIGHT-SWEEP WHITE-OUT: 3 f of diagonal light blades → 4 f full white → 3 f exposure ramp down.
  T4  FLASH CUT: 1–2 white frames.
  T5  GLITCH TO BLACK: 1–2 f of RGB-split slices / cyan-white bars → black → quiet scene.
  T6  PIXELATE-OUT: block size 1 → 40 px in 3 f → 2 black frames → cut.
  T7  FOREGROUND WIPE: a huge, heavily blurred character crosses the lens in 4–6 f, hiding the cut.
  T8  PIP SHRINK + REWIND: the full frame scales to ~55% into a floating rounded video-player card
      (title bar, progress bar, slight 3D tilt) in 5–6 f expo-out; the card then plays earlier
      scenes in reverse at 4–8× for ~2 s.
  T9  SMASH ZOOM: accelerating push-in to a close-up (+150–200% scale) in ~6 f, then slow drift.
  T10 HOOK STROBE: during the first 0.5 s, swap colour treatment every 1–3 f on word hits
      (invert, red duotone, cyan duotone, B/W threshold, over-exposed).
  T11 RACK-FOCUS OPEN: a new 3D scene starts at blur 12 px → 0 in 8–10 f.
  T12 HALFTONE WIPE: a grid of small dots/squares sweeps across while the sprite bursts (~6 f).
CAMERA:
  - Never static: every hold drifts — slow push-in +1–3% scale/s (sometimes a slow −1–3%/s
    pull-out), optional roll ≤ 0.5°/s. The CTA card is the only near-static hold.
  - One feature move per section at most: push through a monitor (+4–10%/s, may tilt);
    Ken-Burns pull-out reveal (−40–50%/s over ~3 s); lateral truck along a row of step-icons
    (~5–6% of frame width per second for ~8 s); epic sky zoom (very fast, 1–2 s);
    2–3 f micro-shake on slams.
CHARACTERS & OBJECTS:
  - Pose change = SPRITE BURST: the sprite explodes into 200–400 pixel particles in its own
    colours (3–4 f) and re-gathers into the new pose exactly on a VO word.
  - Idle stays minimal (1–3 px breathing; the sidekick blinks or shows happy ^^ eyes every 2–3 s).
    Life comes from bursts, props and camera drift.
  - Props (file icon, lightbulb, wrench, gear, mic, waveform, palette): pop in 120% → 100% in 5 f,
    then float ±4 px with a slow Y-rotation of ±8°.
  - Thumbnail cards: 3D-tilted, tumble in, form curved ribbons or fans with motion blur, and are
    later sucked into the file icon.
  - Annotation callouts: a 1 px line + tiny label drawing on in 4 f, pointing at characters.
UI & DATA:
  - Counters: expo-out count-up (e.g. 15 → 50 in 12 f; percentages creep over ~1.5 s) in the
    pixel font; exit by breaking into pixel bits (5 f); optional dotted arc trail from the
    number to the character.
  - Level meter: 10 squares filling one by one.
  - Framework panel: teal glowing 3D frame → TV static → 4 pixel-textured colour bars; slow tilt.
  - Dark macOS-like UI mocks: chat window, code editor with syntax colours, video-editor timeline
    (red/teal/pink clips), input bar with a send button, toast sliding in bottom-right.

== 6. COMPONENTS TO BUILD ==
WordBuild, Slam, Decode, Typewriter, LetterPop, Counter, LevelMeter, PixelMosaic, WhipExit,
WhiteOut, GlitchToBlack, Pixelate, PipRewind, SmashZoom, HookStrobe, RackFocus, SpriteBurst,
PixelSprite, VoxelSet, CameraDrift, CardRibbon, Callout, UiMock, Toast, and a post stack
(grain, vignette, bloom, chromatic aberration, DOF).

== 7. OPTIONAL B-ROLL (≤ 15% of runtime) ==
A night lofi/anime illustration of a cozy room or café with city windows (Ken-Burns pull-out);
a stormy sky with a lightning burst; a monochrome galaxy, planet horizon or dot-matrix sphere.
Give them the same grade, grain and camera drift. If none are available, build procedural
versions (starfield, noise clouds, dot sphere).

== 8. AUDIO ==
- VO-first mix: close, energetic, conversational. Tight edit with 4–10 f micro-pauses that drop
  to near-silence — no wall-to-wall music bed (an optional very low bed must duck to zero in the
  pauses). 10–12 f of silence before each section's punchline.
- SFX by event type, from timeline.json cues: soft tick/pop per word, whoosh per blur-slide or
  whip, data chirp per decode, sub-boom + crack per slam, digital crunch per mosaic, riser into
  reveals, key clicks for the typewriter, a ping for the toast.

== 9. CTA END CARD (last 6–8 s) ==
Dark blurred set; the hero points at the card, the sidekick idles. "Comment" (white, CONTENT tier)
+ KEYWORD (teal, EMPHASIS tier). An input bar types the keyword (E5) and its send button lights
up; swap to the second keyword; then a toast with the teaser slides in bottom-right (8 f,
expo-out). Only the typing, the caret and idle loops move.

== 10. OPTIONAL 9:16 WRAPPER ==
Show the finished 16:9 video full-screen on a laptop in a dark room with warm practical light,
framed vertically from a locked-off tripod (zero motion). Two static white rounded caption pills
with black text: top "{{Tutorial N}} / {{product}} skill 🔥", bottom "{{CTA}} in my bio 🔗".
Nothing moves outside the screen.

== 11. QA CHECKLIST (report pass/fail with frame numbers) ==
[ ] Every VO word has its visual event within ±1 frame of its start.
[ ] Every big hit lands 0–5 f after a VO pause, on the first syllable of a phrase.
[ ] No 15-frame window without a new event or camera drift (CTA excepted).
[ ] Transition mix within ±10% of §3; no two consecutive beats share the same entrance + camera move.
[ ] Emphasis words are ≥ 14% of frame height and stay ≥ 12 f before being cleared.
[ ] Red only for conflict/emphasis; teal only for UI/data/CTA.
[ ] Text inside 6% safe margins (intentional slam crops excepted); smallest text ≥ 28 px at 1080p.
[ ] The calm cosmic section exists and is visibly slower (fewer events, no red).
[ ] Deterministic: rendering frame N twice is pixel-identical.
AVOID (generic tells): centred subtitles, fade-ins, one easing everywhere, one font size, static
holds, cuts that ignore VO phrasing, a random colour per word, the same whoosh sample on every cut.
```

---

## B. Versi ringkas

```text
Make a code-generated 16:9, 30 fps kinetic-typography explainer in a "pixel-voxel" style:
2D pixel-art mascots (hero + sidekick) inside dark, warmly lit Minecraft-like voxel dioramas
with shallow DOF and bloom. Every spoken word appears on its exact frame as scattered,
left-aligned text beside the character in 3 tiers (small UI-sans connectors, white heavy-sans
content words, huge red condensed-caps emphasis). Entrances follow the word's role: 2–3-frame
motion-blur slides, per-letter chromatic smears, teal binary decodes, typewriter with caret, and
slams (white flash + shake + 180% → 100% scale + background colour swap). One VO phrase per beat
(median 1.5 s); big hits land right after VO pauses. Signature transition: a red/white/black
pixel-mosaic dissolve (12–14 frames), plus flash white-outs, glitch-to-black, whip exits, a
PiP-shrink rewind and a smash zoom. The camera never stops: +1–3%/s drift on every hold and one
feature move per section (push into a monitor, pull-out reveal, 8 s lateral truck). Pose changes
hide behind pixel-particle bursts. Arc: hook → problem → reveal/proof → meta turn + calm cosmic
contrast → core value → "that's you" → near-static CTA with a typed comment keyword and a toast.
```

## C. Template B-roll AI video (tanpa teks)

```text
Voxel diorama, Minecraft-like blocks: {{SET — e.g. a dark cozy study with a desk, a glowing
monitor showing a code editor, an emissive voxel desk lamp, a potted voxel plant, bookshelves}}.
Warm practical lighting against deep black shadows, shallow depth of field with soft bokeh,
subtle bloom and film grain. {{CHARACTER — e.g. a chibi 2D pixel-art detective in a deerstalker
hat and trench coat standing beside the desk}}. Camera: one slow continuous dolly-in (about
2% per second), no cuts. No text, no logos, no UI captions. 16:9, 5 seconds.
```
