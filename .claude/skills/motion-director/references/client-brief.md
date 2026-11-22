# Client brief: from "terserah, yang penting keren" to a locked direction

"Terserah kamu aja bro, pokoknya dibikin keren" from a non-expert client is the most dangerous trap in creative work. Open the software and build the coolest thing *you* like (say, experimental glitch) and the client may reject it as off-brand, so you start again from zero. A motion director works like a doctor: the client knows the pain (the business goal); you choose the dose (technique, rhythm, camera). Source: Ikhsan's knowledge note (2026-10-29), mapped onto our gates and filtered through his kiblat.

**In this workspace the client is usually Ikhsan himself, and Claude is the director.** He said open briefs like this will happen often: "bebas", "terserah", "pokoknya keren", "aku mau lihat skill mu" (the video-4 brief). Treat every such brief with this workflow:
- Answer the three filter questions below. Infer them from his words and his kiblat first. If one is still open, ask all of them in ONE compact question with a recommended default.
- Propose 2–3 directions as styleframes, plus a 3-second motion test, before the full build.
- Brief for someone else (an Ecodigitus product, a client of his): ask him who watches and where, and which brand rules apply (`ecodigitus-core:edig-brand` for Ecodigitus).

## 1. Translate client language: three filter questions
Clients speak in adjectives and business goals, not "graph editor" or "z-space". Before anything else, answer these (ask them, or infer them and state the inference):
1. **Who watches, and where?** Directors in a meeting room, or Gen-Z scrolling TikTok on a commuter train?
2. **What is the one feeling after watching?** Trust and safety? Fired up and challenged? Exclusive and expensive?
3. **How dense is the information?** Numbers to read, or a vibe and hype to feel?

Then translate with this dictionary. Each row is one of our recipes (`motion-taste/references/recipes.md`):
| client says (goal + vibe) | pacing and curves | camera and space | light, texture, effects | recipe |
|---|---|---|---|---|
| "looks professional, trustworthy, easy to understand" (SaaS, fintech, education, B2B, Ecodigitus products) | smooth and predictable: soft springs or symmetric in-out; long settle times for reading | 2D kinetic grid, telephoto 85 mm, elements push each other (bento); no wild camera spins | clean and bright: off-white/off-black, thin soft shadows, morph/match-cut between shapes; no glitch | 1 Clean tech (the kiblat default) |
| "make young people hyped, cool, never boring" (events, music, streetwear, F&B) | aggressive snap: 4 frames out, ~20 frames of hard braking; 30/60 fps smooth layers mixed with 12 fps stepped ones | wide 18–24 mm, dutch angle, extreme push through letter counters, tilting on the beat | tactile, high contrast: smear frames, noise/halftone, speed-reactive RGB split. The note's 1-frame invert is *not* Ikhsan's taste (kiblat 0/min): at most one, at the cause moment, only on a hype brief, ≤ 3 flashes/s | 2 Brutal / hype |
| "looks luxurious, exclusive, high-end" (property, perfume, flagship tech, automotive) | heavy momentum, slow but powerful, no bounce: heavy objects moving through water | 2.5D z-space with continuous slow drift (the camera never fully stops) and thin depth of field | optical realism: exponential glow on lights, a rim-light sweep on the hero, refractive glass (`light-atmosphere.md`) | 7 Luxury (or 3 Cinematic) |
| "must be unique, artsy, different from competitors" (brand campaigns, teasers, exhibitions) | controlled chaos: unpredictable rhythm, total silence then sudden bursts (contrast of state) | spatial wrapping (type on cylinders or spheres), split screens of micro windows | experimental: metaball melts, slit-scan, real camera/paper textures (`experimental-motion.md`) | 9 Experimental |
When the client gives no brand and no audience ("terserah"), propose 2–3 directions (Aman / Berani / Eksperimental) as styleframes. Don't pick the wildest one and build it.

## 2. The anti-revision workflow, mapped onto our gates
| step | what | our gate |
|---|---|---|
| 1 **Energy map** (script deconstruction) | Before any design, highlight the script in three colours:<br>• **red** = emotional peak / main keyword, **≤ 20 % of the script**; only here go the "finishing moves" (camera through a letter, the hero transition, liquid morph, a hit);<br>• **yellow** = explanation points, handled by clean kinetic grid or track-matte reveals;<br>• **green** = connectors, intro, outro: as simple as possible with generous negative space so the eye breathes. | `SCRIPT.md` gets a colour column; the storyboard uses it (the 70/30 word roles applied to whole lines) |
| 2 **Rule of three** | Max 3 techniques for the whole project; anything else is forbidden. Consistency is the visual identity. Tech example: refractive glass + auto-fit boxes + rim light, nothing else. | the motif lock (law 3, max 3 signatures) |
| 3 **3-second motion test + 3 styleframes** | Non-experts cannot imagine motion from words or sketches. Show 3 stills (opening, middle, end) in the final look (colour, font, grain, light), plus one phrase of 2–3 s animated to final quality to show pacing and camera. Ask: "is this the right energy and colour before I do the full film?" | G1 styleframes + **G1b motion test** (new) |
| 4 **Animatic (blocking)** | Music/VO on the full timeline; every text and image as rough cuts or linear slides, no eases, no effects. Watch it through and read every line aloud. If you run out of breath, the scene is too short. | G2 animatic (internal); hold ≥ 1.0 s + 0.3 s per word |
| 5 **Layered polish** (rough to fine, end to end) | Never finish second 1 while second 10 is empty. Work in layers across the whole piece:<br>• **Layer 1, primary motion and camera:** all main type moves, the 2.5D camera and the speed graphs, start to end;<br>• **Layer 2, secondary motion and overlap:** shift supporting layers 2–3 frames, tittles, bounce/delay expressions;<br>• **Layer 3, optics, light, sound:** glow, grain, lens distortion on fast moves, SFX on the peaks of the speed graph. | G3 spacing → G4 hook; on each pass, run `eye.py sense` |

## 3. "Half of motion is audio" (the lay-client secret), with the kiblat filter
A lay client is impressed by sound faster than by picture. A plain masked text reveal with a little blur feels like an expensive studio piece once it has:
- **A tight whoosh** (paper swipe, short air) exactly on the 4 fast frames of a camera move.
- **Fine mechanical UI clicks or ticks** on staggered numbers and small text.
- **A hit on the main keyword as it lands.** The note says "a thin sub-bass drop". Ikhsan's kiblat measured **0 % boomy onsets**, and video-1 failed on booms ("jedug-jedug"). So the hit is **silence first** (0.15–0.3 s), then a bright, tight transient (stamp/thud with the sub rolled off) on the first syllable after the pause. One low accent per film at most, on a hype brief, and the final mix must still measure 0 % boomy (`motion-sound-design`).

## 4. Worked example: 15 s canned coffee, "terserah, yang penting keren"
Brief: "Coffee in a can that wakes up office workers doing overtime." The concept is a **change of state**, so the film has **two opposite physics** with a cause between them (contrast of state + cause and effect):
- **0–5 s, drowsy:**
  - Dull, slightly muddy grade.
  - A slightly dutch camera drifting very slowly, like someone about to pass out.
  - "MASIH LEMBUR?" arrives through a heavy blur that struggles to focus, letters sagging downwards (slow time displacement).
- **6 s, the cause:**
  - The can opens ("cklek — psssh!") after a beat of silence.
  - The note uses a 1-frame black/white impact here. On a hype/Gen-Z brief that is the one allowed impact. In Ikhsan's default taste the punch is the silence + the can's transient + an instant change of grade.
- **6–15 s, caffeine at work:**
  - Colour snaps sharp and lit (exponential glow on a real light, the can's highlight).
  - The lens switches to a wide 20 mm that pushes through the "O" of "KOPI".
  - Every word now arrives on a very steep speed graph (fast out, hard stop, no wobble).
  - Upbeat music enters.

The film follows one material metaphor (sleep → caffeine) and two brand physics, and it never names an effect.

## 5. Presenting to a client: feelings, not effect names
Never say "I used time displacement and a 1-frame invert". Say what the viewer feels: "For the first 5 seconds the motion is slow and blurry, so the viewer feels the heavy eyes. The moment the can opens, the motion and the light turn sharp and fast, the caffeine kicking in." That makes you a strategic creator, not an editor.
With Ikhsan himself, give both: the feeling for presenting, and the technique → NOTES table for learning (he asked for the technique list on video-3).
