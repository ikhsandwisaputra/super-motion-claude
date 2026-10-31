# Light, atmosphere and cause-and-effect (why vector type stops looking like a sticker)

The gap between "stiker vektor tempelan" and studio-grade motion is how light, air and cause-and-effect work on the canvas. A top designer treats the frame as a stage with air, light sources and materials, not a flat sheet. Source: Ikhsan's knowledge note (2026-10-29), reconciled here with his measured kiblat: mostly light fields, one accent, ~1 % neon, 0 one-frame impacts. Every technique says where it fits that taste, and where it turns into the template look.

## 1. Light

### Exponential glow: light falls off exponentially, a single glow falls off linearly
- **Why the built-in glow looks cheap:** one radius means one falloff, which reads as a 90s neon halo. Real light is very bright at the core and spreads softly far into the air.
- **The AE recipe:** stack 3–4 glows.
  - Core: radius 10–20, intensity 1.5. The edges burn.
  - Middle: radius ×5 (≈100), intensity 0.6.
  - Air: radius ×25–40 (500–800), intensity 0.2, tinted slightly cooler or warmer (white core, faintly blue/violet air).
- **In the engine:** the bloom is a *sum* of blurs at three widths on the bright-pass, weighted ≈ 1.0 / 0.45 / 0.15 after normalising, with the widest one tinted. A mip-chain bloom does the same: pmndrs `mipmapBlur` sums progressively blurred mips, `radius` 0.6–0.9, `levels` 5–8 (`motion-docs/11-r3f-ecosystem/react-postprocessing/NOTES.md`). Our `post.js` today blurs at roughly one width (a 13-tap gaussian at ¼ res, run twice). The upgrade is three widths, not more intensity.
- **Kiblat filter:** glow belongs to **lights**: a lamp, a screen, a gem's highlight, the accent blob, the sun. It does not belong to type ("brand hue as light/bloom, never neon lines"). Type may glow only when the world is literally about light (a neon brief), with one word, one colour, on a dark *lit* section. Write "sengaja" next to it.
- **Check:** `eye.py review` (neon %, halo %) and the poster `neon` item. Then crop the frame and look: the halo must melt into the air with no visible ring.

### Rim light that moves with the motion
- **What:** a thin highlight on one edge of the letters only. In AE: Inner Shadow in Screen/Add, a light colour, distance 2–4 px, size 0 (or CC Light Sweep). **The light must not stand still.** As a word slides left → right, the rim angle and the sweep travel across it, as if the word passes under a stage light. A sweep that crosses the face exactly while the word settles reads as metal or glass.
- **In canvas:**
  - *Sweep:* draw the word, then `globalCompositeOperation = "source-atop"` and draw a narrow linear-gradient band (white → transparent, alpha 0.3–0.6). Its position follows the settle progress (0 → 1 across the word in 8–14 frames, ending on the settle).
  - *Rim:* draw the word again in the light colour, offset by (cos θ, sin θ)·2–3 px, then cut it with the original glyphs (`destination-out`) so only the edge remains. θ follows the move direction from `pose(t ± h)`.
- **Fit:** hero words, logo lockups and product names in the clean, luxury and cinematic recipes. Never on body copy. One sweep per hero.

### Gobo lighting: shadows of things outside the frame
- **What:** a soft shadow pattern (window blinds, leaves, abstract slits), blurred 150–300 px, at 15–25 % opacity in Multiply/Overlay, drifting very slowly. Type passing through moves in and out of light, so the frame becomes a room.
- **In the engine:**
  - *Canvas:* pre-draw the slanted black bars once on an offscreen canvas and blur them (`ctx.filter = "blur(200px)"` at ¼ res, then upscale). Draw with `multiply` at 0.15–0.25 alpha, translated by slow noise (0.2–0.5 % of the width per second).
  - *three.js:* a `SpotLight` with a `.map` texture projects a real gobo onto the set.
- **Fit:** the kiblat's light fields (premium product promos use soft window light) and cinematic interiors. It is the room, not a performer: slower than everything else, and never at high contrast across small type.

## 2. Tactile and optical tricks
| technique | how | engine | fit / taste rule |
|---|---|---|---|
| **Refractive glass** (visible) | A shape in front acts as a lens: it displaces what is behind it, blurs it a little (5–10 px) and gets a 1 px gradient edge | Inside the glass shape, redraw the composited frame displaced by a normal map. SVG maths: `P' = P(x + scale·(C − 0.5))`, so the max shift is scale/2; scale 4–12 is subtle, 20–40 dramatic (`08-css-svg-native/svg-filters/NOTES.md`, liquid-glass example). Then blur, then a 1 px edge highlight. Ribbed glass = a periodic 1D map. In WebGL, refract the UVs by a height map's gradient | Kiblat: "a cloud seen through ribbed glass", glass UI panels. Text behind glass must stay readable on the hold. |
| **Chromatic edge blur** (invisible) | RGB split plus lens blur only toward the frame edges; the centre stays sharp | `post.js` CA is already radial (it grows with distance²). Add an edge-only blur on R and B, mixed in by r² | At rest it must stay under the "optics always on" tell (CA at rest < 0.5 % of the width). Stronger only while fast (`velocity-optics`). |
| **Velocity turbulent displace** (invisible) | Turbulent Displace amount 0 at rest, ≈ 80 only in the ~4 fastest frames, back to 0 on landing: letters melt or burn in the wind only while fast | Displace per-glyph strips by noise(y, t) × the velocity envelope (the same envelope as smear and velocity optics). In WebGL, offset UVs by fbm × envelope | A sibling of smear: choose **one** per move. Smear for snaps; turbulence for wind, heat or liquid worlds. |
| **Halftone / dither shading** (visible) | Replace smooth gradients (plastic) with halftone dots or dissolve noise in the shadows: a printed, editorial or brutalist character | A dot grid whose radius follows local darkness (video-4's brutal acid field), or ordered dither (Bayer 4×4) on the shadow ramp | Brutal, editorial and data-print recipes. Do not mix it with glass or clean UI in one frame. |

## 3. The three laws behind it (why stacking all of this still looks norak)
1. **Cause and effect (motivated motion).** No effect without a trigger in the frame; every effect is a reaction, not decoration.
   - *Wrong:* the frame shakes and flashes while nothing hits anything.
   - *Right:* an "A" falls fast and hits the floor line. Then the A squashes, the floor line bends under the weight, the camera shakes for 3 frames, and a spark flies from the contact point.
   - Shakes need an impact. Glows need a light. Blur needs speed. Every SFX needs an event.
   - *Engine habit:* derive every reaction from the cause's own function (contact time from `bounce()`, speed from `pose(t ± h)`) so the two can never drift apart.
2. **Contrast of state.** If everything is fast, nothing is fast. If everything glows, nothing shines.
   - Before a burst, slow down or hold, like pulling a slingshot back (the stillness and silence before SNAP).
   - Before a hero accent, drain the scene to black and grey. A yellow keyword only "slaps" after that.
   - *Measured by:* burst vs hold share and punch × (`eye.py dna`), silence before hits, accent families per section.
3. **Attention budget (100 % per second).** The viewer has 100 % of attention each second.
   - Busy type (≈ 80 %) needs a calm background and light (≈ 20 %).
   - A busy background, 3D move or light play (80 %) needs type that is still and solid (20 %) as the eye's anchor.
   - "One star at a time" is this law per element; the budget is this law per layer.
   - *Measured by:* one-star %, crowded frames, poster `fokus`. Look at the poster and ask which layer is moving.

## How it fits the system (a menu, not a checklist)
- **Count toward the motif lock (max 3 per film):** rim-light sweep, gobo, refractive glass, halftone.
- **Invisible craft:** exponential glow profile on lights, chromatic edge blur, velocity turbulence.
- They sit in the technique ledger as `candidate` until a film uses them: `ledger.py menu --recipe <recipe>`.
- **Reactions → fixes:** "kayak stiker / tempelan / datar" → light and air (gobo, rim sweep, exponential glow on a real light). "norak / pusing padahal efeknya lengkap" → cause and effect + attention budget, then remove effects.
- **Checks:**
  - Glow: halo/neon numbers, then a crop.
  - Cause and effect: `eye.py look --around <shake or flash time> --span 5` must show the cause 0–2 frames before.
  - Contrast of state: dna burst/hold/punch, plus the audio gap before the hit.
  - Attention: poster `fokus` and one-star %.
  - The eye does not yet measure the glow falloff profile or causality; judge those from the frames.
