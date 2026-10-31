---
source: https://github.com/hiunicornstudio/unicornstudio.js/releases
title: "hiunicornstudio/unicornstudio.js releases (latest 15)"
fetched: 2026-10-28
---


# v2.4.3 — 2026-10-16

# What's changed

- Scenes no longer flash the wrong texture while loading, and a single failed asset no longer leaves a scene blank.
- Pages with many scenes are more reliable: scenes that crash recover on their own, and scenes are built before you scroll to them.
- Desktop pages keep 14 scenes live, leaving two WebGL contexts free for other WebGL on the page.
- Scroll animations start in the right position, line up correctly in sticky sections, and no longer look stuck after a fast scroll back up.
- Appear animations play correctly after you switch back to the tab.
- Fixed static layers going blank after a resize, stretched scenes in content-sized containers, misplaced text in positioned containers, and effects on 3D models sampling the wrong layer.


# v2.4.2 — 2026-10-11

# What's changed

- Adds child effect support for Model layers


# v2.4.1 — 2026-10-09

# What's new

 - Page load performance
  - Parallel shader compile and background image decoding unblocks main thread
  - Shows improvement to Lighthouse scores
 - Multi scene management
  - A page can have any number of scenes, up to 16 WebGL contexts live (8 on Android), giving them to visible scenes first
  - Offscreen scenes beyond that show their last frame and come back as they scroll into view
  - WebGL used by the host page itself, such as a three.js canvas, counts against the same browser limit
 - Bugfixes
  - AI generated Text variables changing the actual text in embeds
  - Model layers recreated a redundant matcap texture on load


# v2.4.0 — 2026-10-07

## What's changed

- Event timeline runtime:
  - Events on the same property chain into sequences.
  - Different event types on the same property add together.
  - Hover, scroll and mouse-move events accept a startValue; scroll and mouse-move also accept a transition.
  - Hover now runs forward while hovered and back when it isn't.
  - Springs carry past the ends of scroll and mouse tracks instead of stopping there.
  - Switching breakpoints releases events that are off in the new breakpoint.
- Frame-rate cap jitter: scenes capped at the display's refresh rate no longer drop frames.
- Shader compiles are faster: the renderer checks only whether the program linked, and reads compile errors only after a failed link.
- Background tabs: scenes finish setting up in a hidden tab instead of waiting for an animation frame.
- Text: animating fontSize, lineHeight or letterSpacing to 0 now works.


# v2.3.0 — 2026-09-25

# What's changed

- Adds support for all new GPU Text layers
- Adds support for boolean variables like layer animation and visibility
- Performance improvements like faster scene fetching, texture caching, and text layout work reduction


# v2.2.14 — 2026-09-12

# What's changed

- Fixes race condition crash when scene is torn down before while its initializing


# v2.2.13 — 2026-09-08

## What's changed

- Allows previous frame rendertargets to get custom size and floating points to support texture input particle effects


# v2.2.12 — 2026-08-23

## What's changed

- Adds missing null checks during scene context lost and teardown
- Adds artboardDimension setting to all effects with the uniform to retain visual consistency accross dpi scales


# v2.2.10 — 2026-08-14

# What's changed

- Distinguishes and supports video and image sources as separate texture variable types


# v2.2.9 — 2026-08-14

# What's changed

- Adds play error handling for video effects, in cases like low battery mode on Safari Mobile. Falls back to video cover. 
- Better first frame sync for extended video loading.
- Adds depthTest and cullFace as layer configurable plane parameters


# v2.2.8 — 2026-07-16

# What's changed

- Adds support for higher density particle effects via enhanced rendering reliability for ping-pong (sizing, blending, visibility sync), and “independent geometry” draw behavior.


# v2.2.7 — 2026-07-15

# What's changed

- Enhanced lazy loading for offscreen scenes by deferring heavy WebGL/Curtains setup until needed.
- Added queued “prewarm” behavior based on scroll/visibility to smooth scene transitions.
- Incrementally builds planes/effects/textures with idle time to reduce UI jank.
- Fixed local browser caching for production mode


# v2.2.6 — 2026-06-25

# What's changed

Fixes bug where text in flattened groups didnt respond to breakpoint changes


# v2.2.5 — 2026-06-12

# What's changed

- Fixes a bug related to pre-multiplied alpha and images with transparency


# v2.2.4 — 2026-06-09

# What's changed

- Adds responsive value support to events
