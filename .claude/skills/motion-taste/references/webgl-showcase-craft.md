# WebGL showcase craft: 43 Codrops-class repos turned into film technique (learned 2026-11-15)

Ikhsan's brief: viewers are getting bored of our visuals, so learn the craft in his list (`codrop-skill/skill.md`) and
make the films more interesting. Detail, code with file:line and licences live in
`motion-docs/13-codrops-showcase/NOTES-<group>.md`; this page is the menu and the rules. Every entry is a `candidate` in
the ledger until a film uses it and Ikhsan gives a verdict.

**What these repos have that our films lack.** Our long-forms are strong in layout, type, collage and VO sync, and thin
in four things these demos do well:
1. **Material and light.** Surfaces that refract, reflect softboxes, scatter or defocus, instead of flat fills.
2. **Physical cause and effect.** A strike makes a swing, an impact makes a ripple, a press meets resistance before it
   breaks. Motion has a reason.
3. **Real data turned into space.** A map in real metres with line widths that stay constant through a zoom.
4. **Transformation instead of replacement.** A photo becomes dots, then a chart, then the photo again; a card unravels
   into threads. The next station grows out of the last one rather than cutting in.

## 1. Bridge into our engines (measured 2026-11-15)
- **Offscreen WebGL2 → `drawImage` into the Canvas 2D chapter engine works headless.** Probe: Chrome
  `/opt/google/chrome/chrome` with the render flags (`--enable-gpu --ignore-gpu-blocklist`), ANGLE on the AMD Vega 6
  GPU, a 960×540 Worley pass composited at 1080p with `screen`. The same `t` gave identical pixels twice and a
  different `t` gave different pixels. It took 47 ms per frame including the 1080p `getImageData` readback.
- **Cost rule.** The chapter engine draws every frame `K = 8` times (motion-blur subframes, `engine.js` makeRenderer),
  so a GL pass runs 8× per frame. Render GL at half size (960×540) and upscale, or lower `scene.K` for that shot.
- **WebGPU / TSL is off by default.** With the render flags `navigator.gpu.requestAdapter()` returns null. With
  `CHROME_EXTRA="--enable-unsafe-webgpu --enable-features=Vulkan,WebGPU --use-angle=vulkan"` (render.py already reads
  `CHROME_EXTRA`) a device opens (amd/gcn-5) on a `http://127.0.0.1` page. Not measured yet: determinism, speed and
  readback of WebGPU canvases, and whether `--use-angle=vulkan` changes the pixels of existing films. Until a test says
  otherwise, port TSL maths to GLSL and keep WebGL2. Half the repos ship WebGPU only; the NOTES give the WebGL2 route.
- **Accumulation effects ride the subframe loop.** Thin-lens DOF and similar effects need the subframe index.
  Proposed, not applied: `engine.js` calls `scene.draw(lctx, t, i, K)` (extra arguments, so old films are unaffected).

```js
// makeGL: one fullscreen fragment shader as a layer for the 2D engine. Our own helper, written from the 2026-11-15 probe;
// tested headless the same day (ripple shader, no page errors, same t -> same pixels, different t -> different pixels).
export function makeGL(frag, w = 960, h = 540) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const gl = c.getContext('webgl2', { premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: false });
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const p = gl.createProgram();
  gl.attachShader(p, sh(gl.VERTEX_SHADER, '#version 300 es\nin vec2 a;out vec2 uv;void main(){uv=a*.5+.5;gl_Position=vec4(a,0,1);}'));
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, frag)); gl.linkProgram(p); gl.useProgram(p);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(p, 'a'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  const loc = {};
  return (u = {}) => {                                   // u = { t: 1.2, k: [1, 2] } -> uniform1f / uniform2f ...
    gl.viewport(0, 0, w, h);
    for (const [k, v] of Object.entries(u)) { const l = loc[k] ??= gl.getUniformLocation(p, k); if (l === null) continue;
      const n = Array.isArray(v) ? v.length : 1; gl[`uniform${n}fv`](l, Array.isArray(v) ? v : [v]); }
    gl.drawArrays(gl.TRIANGLES, 0, 3); return c;         // ctx.drawImage(layer(u), 0, 0, 1920, 1080)
  };
}
```
Textures (a photo to refract, a map to ripple) need `texImage2D` from an `ImageBitmap`; upload once in `scene.load()`,
never per subframe.

## 2. Turning an interactive demo into film
Every repo here is driven by a cursor, scroll or drag, or by a simulation with memory. In a film:
- **Input becomes authored.** Hover or cursor → a **ghost-hand phase table** (approach, press, resist, give, release),
  each phase boundary a VO-timed beat and an SFX cue. Scroll → a progress `p(t)` eased per station. Drag → a
  closed-form spring. Orbit controls → a **camera rail** with look-at targets retimed so each station lands on its VO time.
- **State takes one of three forms.** (1) **Closed form in t**: ripples, pendulums, springs, Worley, dot morphs,
  unravels, folds. This is the first choice. (2) **Deterministic sequential**: fixed `dt`, fixed seed, simulated from
  frame 0 with checkpoints cached every N frames, so a patch render can start mid-shot (spring chains, walkers,
  liquid). (3) **Baked**: a Blender sim or a JSON/texture of per-frame transforms played back (akella's shatter).
  The bake rule is in `experimental-motion.md`.
- **Randomness is seeded** (mulberry32 or a hash of the index); never `Math.random()` or `performance.now()`.
  mrdoob's and splat-fashion's capture scripts replace the browser clock for the same reason our engine does.
- **Loops are exact.** Quantise every background `ω` to a multiple of `2π / loopLength` (web-ocean, Ultra-Water).
- **Light conserves energy.** Caustics average 1, glints are divided by their rate, bokeh dims as it grows. Light
  effects multiply the frame; they never add flat white. That is why they read as real instead of painted.
- **Threshold before blur.** Decide the shape (crack, caustic line, ink edge) sharply, then soften it, so dark gaps
  stay dark.

## 3. Technique menu
Station names follow the long-form recipe (`studio-global/references/resep-indo-vs-as.md`). Licence: **MIT** = may port
with the notice kept in a comment; **belajar** = no licence or restrictive licence, so rewrite the mechanism only.

### Transitions and transformation
| Technique | Gives | Where in our films | Source · licence | Recipe |
|---|---|---|---|---|
| Two-wave dot morph | photo → dots → chart/map → photo, each dot on its own clock, paired by rank | station transitions; data reveals (a crowd photo becomes a bar chart) | splat-fashion · MIT (data CC BY: not used) | postfx R1 |
| Ink-flood wipe with meniscus edge | one ink colour floods across the frame with a sharpened surface-tension edge | chapter transitions, dark-mode reveals, a flood spreading over a map | ferro-toggle · MIT | cairan R3 |
| Card unravel ("Benang Lepas") | a photo card splits into threads that fly off at their own speed and flutter | evidence card exits, chapter transitions | unwoven · MIT | material R3 |
| Fold / bend the world | a map or collage curls up like a page; the camera enters the tube | hook ("dunia terlipat"), Indonesia folding up to show the US | dreamfold · MIT (Google tiles: never) | postfx R2 |
| Unfold envelope pack | one angle drives about 10 envelopes (blur, light, distortion, hinge, zoom) | Apple-style UI reveals, a cover opening, "behind the screen" | iphone-duo-sim · belajar | objek R2 |
| Rebuild from pieces | pieces arrive in a readable order on lifted arcs, a click as each lands | Indonesia assembling province by province, data bricks, a device | emotion-halloween · MIT | dunia R5 |
| Speed ramp by integrating rate | slow-mo right after a number or headline lands, back to speed without a jump | any station; crack propagation as a "mitos pecah" beat once per film | akella shatter · belajar | postfx R5 |
| Shadow-first luma wipe | the next photo arrives through the dark areas of the current one first, with a 1–2 px light rim (`fwidth`) on the front | photo swaps between documentary stations (0.8–1.2 s); the transition grows out of the photo itself | LookbookHoverEffects · MIT | transisi R2 |
| Ink seam (+ contour variant) | a domain-warped fbm seam crosses the frame; the feather widens with speed, sharp at rest; the contour variant turns the photo into topographic lines | chapter transitions (1.2–1.6 s); contour into a map chapter | SeamTransitions · MIT | transisi R1 |
| Tone-layer lift | a photo splits into light / mid / dark layers that slide away in stagger, revealing the card underneath (pure Canvas 2D) | evidence photo → fact card; chapter title cards | LookbookHoverEffects · MIT | transisi R3 |
| Shape-vector ASCII | ASCII glyphs chosen by local shape (6 inner samples + edge contrast from 10 outer), not by brightness only | "how the machine sees" title cards; photo → ASCII → photo as one film's new technique | ascii-logo · MIT | transisi R5 |
| Ghost trail + rush-hang-rush | a word leaves 3–5 lagging copies (lime ramp, not rainbow) and hangs mid-move before rushing out | chapter words, one per film | AntoineW GSAP-Scroll · MIT | transisi R4 |
| Sphere-gallery flatten | the camera sits inside a sphere of photos; one photo flattens into focus as the rest dissolve | evidence-wall chapter opener (three.js engine) | atelier-ui · MIT per README only: rewrite or credit | transisi NOTES §atelier |

The transition rows share one rule: **the image decides the choreography** (per-pixel arrival = mix of geometry and the
photo's own tone), progress overscans past the frame edge (`mix(−.01, 1.01, p)`), and every random draw is a seeded hash.

### Material, light and air
| Technique | Gives | Where in our films | Source · licence | Recipe |
|---|---|---|---|---|
| Thin-lens DOF by accumulation | a real rack focus between collage planes (Halton samples, disk sampling, projection shear) | collage stations, documentary photos | procedural-eye · belajar | material R1 |
| Energy-conserving defocus dust | bokeh that dims as it grows, slow drifting motes, a focus interval | FG air layer in fly-throughs and intros | procedural-eye + mrdoob 05/10 · MIT (mrdoob) | material R2, postfx R4 |
| Squircle glass slab + spectral rim | refracting glass panel, thin dispersion at the rim, 1-px glint | Apple-style UI panels, Portal QR, quote cards | glass · MIT | material R4 |
| Depth-frosted glass | blur `28·d^0.87` px and opacity `mix(1, 0.205, d)` with distance behind the glass | a subject or document pushing through frosted glass; push-through transitions | the-hand · belajar (2D route) | objek R4 |
| Worley caustic light | moving underwater light lines (F2 − F1, sharpened) | ambience over photos, sea or port maps, chapter cards | aquarium · belajar | cairan R1 |
| Closed-form ripple refraction | a ring that bends the image under it, from an event time | map-pin impacts, "one decision spreads" over UI or photos | Ultra-Water · MIT | cairan R2 |
| Softbox + cards studio | black glossy objects drawn only by reflections of a few rectangular lights | hero chips, phones, logos, devices | ferro-toggle, vinyl · MIT | cairan R4 |
| Radiograph mono + blueprint grid | monochrome X-ray albedo, anti-aliased grid (`fwidth`) | "cara kerja / bedah benda" stations | amber · belajar | material §amber |
| Height fog matched to the horizon | layers share one air; the 2D version is fog sheets between collage layers | collage fly-throughs, map horizons | sakura-fantasy, cyber-web-city · MIT | dunia R3 |
| Finish: AgX + highlight desaturation + TPDF dither | soft highlight roll-off, no banding in dark gradients | every film's finish (adds to `colour-finish.md` §lens stack) | Ultra-Water · MIT + THIRD_PARTY_NOTICES | cairan §web-ocean/Ultra-Water |

### Space, maps and camera
| Technique | Gives | Where in our films | Source · licence | Recipe |
|---|---|---|---|---|
| Cartographer map in real metres | Canvas 2D map with one transform as the camera, constant line widths at any zoom, detail that appears with zoom | every map chapter: Indonesia → province → city, the region in lime | slop-newyork · MIT (OSM data ODbL: never copy; use Natural Earth after a licence check) | dunia R1 |
| Racing-line camera rail | the camera brakes into corners and accelerates out; shot presets blend over ~4 s | 3D collage hooks, moves between stations | cyber-web-city · MIT | dunia R2 |
| Colour script from story progress | the film drifts afternoon → dusk → night across chapters; lights come on before dark | 12-minute arcs; night maps with city lights drawn with `lighten` | sakura-fantasy, tokyo · MIT | dunia R4 |
| Angular front reveal | a region fills behind an angular front with a bright stitch line | map region reveals (lime front line) | yarn-world · MIT (the front only, not the yarn look) | material R5 |

### Timing, physics and choreography
| Technique | Gives | Where in our films | Source · licence | Recipe |
|---|---|---|---|---|
| Ghost-hand phase table | approach → press → resistance → break, an SFX cue at each phase boundary | UI-sim stations, "cut" reveals (a knife through a budget bar) | slice-of-life-crisis, ocarina · belajar / MIT code | objek R1 |
| Strike list → closed-form pendulum | each item swings exactly when the VO names it, decaying | evidence rows, pinned documents | xylophone · MIT | objek R3 |
| Speed-lean row with trailing cards | cards lean and bank with scroll speed, far cards lag | Vox-style rows of headlines or articles | discography · belajar (PolyForm NC) | objek R5 |
| Heartbeat envelope + screen light on the room | a pulse that lights the surroundings | live dashboards, "data hidup" | organ-bank · belajar (not its CRT look) | objek §organ-bank |
| Curved smear on kinetic type | the smear follows the motion path and thins at the tail | keyword slams and whips, at most once per chapter, motion blur off on that layer | smear-blur-showreel · belajar | postfx R3 |

## 4. Kiblat filter (what NOT to take)
- **Neon.** cyber-web-city's neon city breaks the 1 % neon budget; its own grey "ash" theme shows the same technique
  without it. CD diffraction (discography) and iridescent rims (xylophone): low saturation, small, edges only.
- **Vintage.** organ-bank's CRT scanlines, snow and warm-up are the rejected projector look. Amber's honey tint drifts
  to sepia.
- **Paper and props.** Sketch hatching (R3FSketchMaterial), yarn and wool (yarn-world) and paper worlds are the
  "kertas lagi" rejection. Take the mechanism (front, reveal) without the material.
- **Tonal sound.** Xylophone notes, the ocarina sampler, slice's `tok` and ferro's bubble chirp are tonal "ting"
  sounds, which are banned. Map their timing onto non-tonal SFX.
- **Gimmicks.** Tilt-shift at most once per film (it reads as a miniature). Dither and glass never in the same frame.
  Dust stays warm white, never lime. Morph edges are lime or white, without glow.
- **Transitions.** Seam marble, gold craquelure, peel and paper relief read as vintage or "kertas lagi". Ghost-trail
  rainbow and lens dispersion lean neon (use the lime ramp). ASCII must never be green-on-black Matrix. A channel
  glitch only when the story gives it a cause.
- **Motif lock still holds.** One film takes 1–2 of these as its signature, not ten.

## 5. Licences in one place
- **Port with notice (MIT):** ferro-toggle, Ultra-Water (+ its THIRD_PARTY_NOTICES), glass, unwoven, yarn-world (code;
  sounds CC0), R3FSketchMaterial, xylophone, ocarina (code only; models and sounds are Nintendo's), vinyl, dreamfold
  (not its Google tiles), mrdoob codevember, splat-fashion (not its CC BY captures), cyber-web-city, tokyo (data keeps
  its sources' terms), slop-newyork (OSM data is ODbL), sakura-fantasy (statues CC BY 4.0), isle-thorne (not its
  photos), emotion-halloween (not its Thunder font), SeamTransitions, LookbookHoverEffects, AntoineW GSAP-Scroll,
  cursor-shader-trail (WebGPU/TSL: port to GLSL ES 3.0 first), ascii-logo, lilpix (its `glimm` sweep is not in the
  mirror). atelier-ui says MIT only in its README (no LICENSE file): rewrite, or port with credit.
- **Apache-2.0 (carry the NOTICE):** codrops-paper's Paper Shaders ports (`paper.ts`, `paperPost.ts`, `lens.ts`).
  Its `vendor/domgl` and `vendor/motion` are UNLICENSED (proprietary: never copy); the rest of its app code is learn only.
- **Learn only, rewrite:** under-the-sea, aquarium, spite, akella, procedural-eye, amber, dark-cluster, iphone-duo-sim,
  the-hand, organ-bank, slice-of-life-crisis, smear-blur-showreel, instanced-mesh-showcase, rock-demo,
  footballs ("All rights reserved"), discography (PolyForm Noncommercial: our channel is commercial).

## 6. Using it in a film
1. G0: `ledger.py menu -q codrops` (or by kind) next to the film's spatial metaphor; pick 1–2 techniques that carry
   the film's idea, not decoration. This feeds the "≥ 1 never-seen technique per film" rule.
2. Write it into the formula rasa (which station, which beat, what it means).
3. 3-second motion test through `makeGL` or the 2D route, then `eye.py sense --flow`, then show Ikhsan.
4. `ledger.py add` it as `experimental` with the film; `verdict` after his notes.
