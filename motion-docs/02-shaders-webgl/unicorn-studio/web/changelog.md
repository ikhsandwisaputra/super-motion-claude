---
source: https://www.unicorn.studio/docs/changelog
title: "Changelog - Unicorn Studio"
fetched: 2026-10-28
---

# Changelog

## October 7th, 2026

**Scroll Timeline.** Scroll events now live on the Timeline beside appear events. Stage, ease, and retime them as bars on a scroll ruler, or move an intro animation onto scroll in one step. [Learn more](https://www.unicorn.studio/docs/events/#interaction-timeline).

Requires SDK **2.4.0** to run in production.

[](https://assets.unicorn.studio/media/docs/scroll_timeline.mp4)

## September 25th, 2026

**GPU Text.** Text layers now have a GPU render option with 7,000+ fonts and 206 glyphs. This unlocks the ability to create animations and text materials with AI, with better performance at runtime. More features coming soon.

It falls back to the 2D CPU engine if it can't run on the GPU (unsupported glyph or language). Requires SDK **2.3.0** to run in production.

[](https://assets.unicorn.studio/media/docs/gpu_text.webm)

## September 2nd, 2026

**New effect: Video Sequence.** Turn a video into an image sequence. This lets you control playback easily via scroll, mouse position, or other events. It has two additional modes equally as exciting:

* Mouse Trail: Advance the video with proximity to the mouse. This let's you simulate advanced interactive effects like the tree example in the video.
* Time Stretch: This let's you project the video in space over time, creating an ethereal temportal raymarch.

You can play with frame rate, duration, and quality. After making a change to those, you must hit the "Update Sequence" button.

[](https://assets.unicorn.studio/media/docs/videoseq.mp4)

## August 14th, 2026

* **New effect: Cloth Physics.** A hanging sheet of fabric with gravity, wind, and mouse interaction. Four settings give it solid color, media to project an image or video onto it, liquid glass to refract the underlying scene, and a wireframe mesh mode.

[](https://assets.unicorn.studio/media/docs/cloth_teaser.mp4)

### New SDK version 2.2.12

A more reliable video embed, plus separate image and video variables.

* Image and video variables are now separate, so you can hook up the right kind of source to each control
* If a video can't play (like Low Power Mode on iPhone), we show the cover image instead of a blank frame
* Videos show their first frame more reliably while they're still loading
* Layers can now control whether they check depth, and whether you see both sides or just the front

## July 21st, 2026

* **Particles are here!** Introducing two new effects featuring particles: Particle Formation and Particle Emitter.
* **Particle Emitter** is a classic 2D particle emitter with physics, burst, trail, orbit motion, and an attractor.
* **Particle Formation** converts an SVG into a bunch of particles you can interact with via repel or attract.

[](https://assets.unicorn.studio/media/docs/particles_small.mp4)

## July 14th, 2026

* **3D shape backside refraction:** Glass 3D shapes now refract their back-facing surfaces, creating more convincing depth and internal detail in transparent forms.
* Improved performance and edge rendering for cleaner silhouettes and smoother glass rendering.
* Released SDK version **2.2.8** with lazy-loading enhancements and reduced loading jank.

[](https://assets.unicorn.studio/media/docs/backside.mp4)

## June 29th, 2026

* **Unicorn AI open beta and credits:** Unicorn AI is now available in open beta for all Legend subscribers, with 200 monthly AI credits for creating and editing shader effects.
* Creating an effect uses 10 credits; simple edits use 2 credits, complex edits use 5 credits, and monthly credits reset automatically.
* One-time credit boosts are available when you need more generation time; boost credits do not expire.

### Custom Effects Library

* You can now save custom effects to your effect library by right-clicking the effect in the editor.
* This works for custom effects you build yourself and effects generated with Unicorn AI, so you can reuse your effects across projects.

[](https://assets.unicorn.studio/media/docs/customeffectlib.mp4)

## June 25th, 2026

* Released SDK version **2.2.7** with a fix for text layers using breakpoint changes inside flattened groups.

## June 10th, 2026

* **New Effect: Recursive Grid** This is a procedural grid effect based on fractal quadtrees. It's kind of a spiritual successor to Mondrian, but more generative than pure distortion. You can use it to add dynamic "periodic table" like grids that can pixelate or refract the background. I look forward to seeing the creative applications you come up with!

[](https://assets.unicorn.studio/media/docs/recursive_grid.mp4)

## June 9th, 2026

* **Responsive events:** Event property changes now persist per breakpoint. If an event panel is open and you switch breakpoints, edits to that prop value are saved on the active breakpoint, so you no longer need checkbox workarounds or separate events for each breakpoint.
* Released SDK version **2.2.5**.

[](https://assets.unicorn.studio/media/docs/event_breakpoint.mp4)

## June 6th, 2026

* **New effects: Film Grain and 2D Pinch/Bulge:** Added Film Grain for organic, film-like texture and a 2D Pinch/Bulge effect for simple interactive distortion.
* Film Grain includes controls for amount, clumping, crush, chromatic variation, and animation speed.

![Film Grain and 2D Pinch/Bulge](https://www.unicorn.studio/docs/assets/images/grain_bulge.webp)

## May 28th, 2026

* **Variable Presets:** Users can now save named snapshots of scene variable values, apply them in the editor, publish them with embeds, and expose them through runtime controls and the SDK. Presets can be selected with `initialPreset`, `data-us-preset`, `?preset=`, or at runtime with `scene.setPreset()`.
* **Variables and Variable Presets for Free:** Free accounts can now create and publish up to three variables per scene, including presets built from those variables.
* Legend accounts keep unlimited variables.

## May 27th, 2026

**Introducing Variables:** perhaps the most requested feature of all time is here! Unicorn scenes are now runtime programmable with [Variables](https://www.unicorn.studio/docs/variables/). Variables are named values you create in Unicorn Studio and publish with a scene, giving your embeds safe developer controls without exposing layer IDs, shader uniforms, or internal scene structure.

#### Use cases

* Create custom animations and events by changing properties dynamically at runtime
* Connect CMS data to colors, image sources, text, etc.
* Share reusable values across multiple layers

Variables are available on all plans. Free accounts can publish up to three variables per scene; Legend accounts can use unlimited variables.

#### Demo time

This scene has the following variables: `foreground`, `background`, `textContent`, and `glitchAmount`. I asked GPT to make the text a that updates clock once per second with a toggle that switches between light and dark mode, briefly pulsing the glitch variable during the transition.

## April 29th, 2026

This release expands Unicorn Studio from a single-scene editor into a true multi-scene canvas workspace. Projects can now hold multiple scenes/artboards across an infinite canvas, making it easier to explore directions, build variations, and keep related visuals together in one creative file.

* **Multi-scene projects and infinite canvas**: A project can now contain multiple scenes with their own layout, size, and published output. Scenes can be selected, renamed, duplicated, moved, and managed independently while still living in the same project.
* **Scene-level publishing and export**: Publishing and export now apply to the active scene. The export window, embed code, Project ID, preview/optimize link, and downloadable scene JSON all reflect the scene you are currently working on.
* **Project-wide versions**: Versions now represent the whole project, including all scenes/artboards. Restoring a version brings back the full scene canvas state, not just a single scene. Automatic backups follow the same model.
* **Scene-level Remix**: Remix stays focused on the individual scene. When a project is shared for remixing, users remix the current/published scene rather than cloning the entire multi-scene project.

This is a big shift in the creative model: projects can now hold exploration, utilities, production-ready scenes, variants, and experiments side by side.

It should make iteration faster, visual exploration more natural, and larger interactive/WebGL projects easier to organize without multiplying files.

## April 14th, 2026

* **Shader editor overhaul**: Now supports multi-pass, dyamic uniforms, pingpong, downsampling, and frame cache.
* **New effect: Blocks**: This is a generative effect that creates flowing blocks of color. Supports flat, 3d perspective, and circular patterns. It's a useful base effect to build on top of.
* The effect panel has been reorganized and simplified.
* Animations baked into 3D model files are now supported.
* Released sdk version **2.1.9**. [See release notes](https://github.com/hiunicornstudio/unicornstudio.js?tab=readme-ov-file#changelog).
* Added media library caching for instant initial load times.
* Unicorn AI launched for early Legend access.
* Misc. bugfixes and enhancements.

## March 31st, 2026

* Layers can now be hidden or shown on different breakpoints. This is useful when you want to keep the same scene but hide more expensive layers or cursor effects.
* Improves mask flattening and fixed a bug where "clip to parent" wouldn't work when flattened.
* Released sdk version **2.1.6**. [See release notes](https://github.com/hiunicornstudio/unicornstudio.js?tab=readme-ov-file#changelog).

## March 26th, 2026

* **Learn tab in the dashboard**: Tutorials are now available directly from a new Learn tab in the dashboard sidebar.
* **Flatten for free accounts**: Free accounts can now use the flatten feature to test out their scenes with improved optimization.
* **Mask Erase mode**: Added a new erase option for masking. Its basically the inversion of normal masking mode. "Knockout", background/color have been deprecated.
* Bugfixes and improvements.

## March 23rd, 2026

* **New effect: Mondrian**: An layers pixelation effect creating "Mondrian" style geometric displacement. Pairs very well with Outline released last week.
* **Property Event Menu**: You can now click the little plus button next to any event enabled property to either add it to the appear timeline or create an interaction event.
* Released sdk version **2.1.5** with bugfixes for videos inside flattened shaders.

[](https://assets.unicorn.studio/media/docs/mondrian.mp4)

## March 19th, 2026

* **New effect: Outline**: A "Tron-like" Sobel-based edge detection filter with adjustable thickness, threshold, softness, and intensity. Supports mouse-reactive dynamic thickness. Find it under Stylize in the effect browser. Pairs great with Bloom, Chromatic Aberration, and Glyph Dither!

[](https://assets.unicorn.studio/media/docs/outline2.mp4)

## March 18th, 2026

A few small things:

* **Fog has been replaced with Fast Fog**: Fast fog is **significantly** more performant and looks nearly as good. I've deprecated the old Fog effect to legacy (you can still find it via search in the effect browsersearch bar)
* **New Glyph Dither presets**: Horizontal/Vertical Jitter are a new single bar lo-fi option and "redacted" is an interesting bar/ascii hybrid.
* **Flattener improvements**: improved flattenability of some child effects and fixed bugs related to mask flattening.
* **Transform**: Added mouse -> translate tracking

## March 10th, 2026

A major upgrade to the animation timeline and the overall keyframing workflow:

* **Multi-select in the timeline**: Select multiple events with Shift-click, Cmd-click, or drag an event bar. Move and resize groups of events together with proportional scaling.
* **Position animation paths**: Layers with position-based appear events now show visual start/end handles directly on the canvas, so you can drag keyframe positions in context instead of typing values.
* **Copy & paste layer properties**: Right-click a layer to copy its visual properties (including events), then paste them onto another layer of the same type. Fully undoable.
* **Shift/Cmd multi-select in the layers panel**: Range-select and toggle-select layers the way you'd expect in any layer list.
* Syncing item drags with state effects — moving a layer on the canvas now keeps its animation end-state in sync automatically.
* Various stability and performance improvements to the canvas overlay, viewport fitting, and state effect handling.

## March 7th, 2026

Some small but impactful improvments to the editor:

* **Multi-select controls**: you can now simultaneously change properties for multiple layers of the same type
* **Zooming** now zeroes in on the cursor as the zoom origin
* Small layers are more easily clicked and dragged
* A few more matcaps
* Text layers now show a new icon and the text content in the layer list
* Other misc. bugfixes / optimizations

[](https://assets.unicorn.studio/media/docs/multi-select.mp4)

## March 5th, 2026

Just a few quick things:

* **Spring**: Track mouse and Momentum have a new friend, Spring! This adds some physics springiness to your mouse movements.
* **New easings**: Added a couple new spring easing curves for Appear and Hover events.
* **Models are flattenable**: A continuation of the flatten optimizer, we can now squeeze 3D Models into group shaders as long as they're not glass mode or using the background as an environment map.
* **v2.1.1**: New SDK version fixes a video playing issue and supports the above features. An update is required to use them for existing projects.

## March 2nd, 2026

The **Flatten Compiler** is live in beta!

Performance has always been a first class principle for Unicorn Studio. You should be able to explore and be creative without worrying whether your site will lag on big screens or crash on mobile. This is a **big step** toward that vision.

[](https://assets.unicorn.studio/media/docs/per_module.mp4)

### What is "Flatten"?

The flatten compiler figures out how to merge as many layers as possible intelligently into the same shader. This can payoff with huge performance gains. The result will be effectively as good as if you hand coded the shader professionally. Most shader GUI's are low level and node based expressly for this purpose, but now that caliber of shader composition is here in an experience that feels like designing.

You can hit the "F" key anytime in the editor to pull up the panel. You will also see it in the export window under Embed or JSON.

#### Before

* Each layer is a separate shader
* Layers are chained together using FBO's creating memory overhead
* No culling/occlusion, regions that aren't visible will still render

#### After

* Any mergable layers become one single shader
* Flattened shaders can cull/occlude, only rendering what is visible
* With meaningful merging, embeds become much smaller and performant
* Animations, events, and breakpoints all work on flattened shaders

#### What's mergable?

* Images
* Shapes
* Text
* Distortion effects
* Most single-pass effects

#### What's not?

* Multi-pass effects (blur, blob tracking, bloom)
* Mouse Ping Pong effects (mouse trail, mouse ripple, light draw)

[](https://assets.unicorn.studio/media/docs/homescene1.mp4)

This footer scene on the homepage is just **one single shader**!

### It's in BETA for Legend subscribers

The compiler is very complicated. Despite extensive testing, I expect some scenes might not end up as expected. If something doesn't turn out the way you expect, you can simply republish with "flatten" off and let me know about it in the Discord or email.

### What else?

* The SDK has bumped from 2.0.5 to **2.1.0**. This is to support the flatten compile by the addition of the FlattenedGroup layer. This is a breaking change, **if you try to publish a flattened scene to a hosted embed without updating to 2.1.0, it will break**.
* You can now use matcaps in 3D models. This is a much simpler way to add baked-in reflection and lighting.
* Nearly every effect has been scrutinized and further optimized. Performance across the board should be improved.
* To learn more and see a 15 minute crash course, checkout the updated [Performance Guide](https://www.unicorn.studio/docs/performance/)
