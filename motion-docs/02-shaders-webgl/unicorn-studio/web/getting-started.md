---
source: https://www.unicorn.studio/docs/getting-started
title: "Getting Started with Unicorn Studio - Unicorn Studio"
fetched: 2026-10-28
---

# Getting Started with Unicorn Studio

Unicorn Studio is built around visual exploration: stack layers on a real-time canvas, shape them with effects and motion, expose the controls that matter, and ship the result. This guide walks through the core concepts — after that, the best way to learn is to open a scene and start playing.

## Core Concepts

### Layers

Most shader-driven tools are node-based — build a graph, connect outputs to inputs, construct a pipeline. Unicorn Studio takes a different approach. You work with **layers**, just like Figma, Framer, or Photoshop, on a spatial canvas built for creative exploration. Build scenes by stacking and arranging:

* **Shapes**: Draw rectangles, circles, and polygons
* **Images**: Paste, drag, or upload and use images from your library
* **Effects**: Choose from 75+ configurable WebGL effects
* **Text**: Use free fonts, Google fonts, or custom uploads
* **3D Models**: Add your own 3D models or extrude text and SVGs
* **Videos**: Not their own layer type — you'll find them in effects
* **Background**: Create fills or gradients (can be hidden but not deleted)

You can mask with shapes, images, and text, and most everything has blend modes.

### Effects

Effects are the backbone of the experience — not just stylistic add-ons. Some are utilities, like Vignette or Anti-alias; others are centerpieces, like Aurora or Blob Tracking. An effect can manipulate everything beneath it or just a single layer. Access effects through the burst icon in the top toolbar on the right.

* **Filters**: Color manipulation
* **Distortion**: Scene displacement
* **Blur**: Various blur effects
* **Lighting**: Simulated lighting effects
* **Stylize**: Common style effects
* **Misc**: Unique effects
* **Custom**: Create your own shaders

Add an effect as a child of a layer and it will only affect that layer.

Most effects have a built-in time-based animation with a speed you control. And if the effect you're imagining doesn't exist yet, Unicorn Agent can build it.

### Unicorn Agent

Click **Unicorn Agent** in the top bar and describe what you want. The agent works right in your open project: it writes custom shaders, adds and tunes effects from the library, lays out text and images, sets up animations and events, and can publish the scene when it's ready. It checks every shader change before applying it, and each change is a normal edit you can undo or keep tweaking by hand.

Unicorn Agent is included with Legend, and Free plan users can try it with 50 free credits. See the [Unicorn Agent guide](https://www.unicorn.studio/docs/ai/) for what it can do and how credits work.

### Interactivity

Motion and interaction are intrinsic, not bolted on. All layers have some degree of native animation and interactivity:

* **Mouse tracking**: Follow cursor movement (0-100% intensity)
* **Momentum**: Add weight to tracking movement
* **3D axis tilt**: Rotate elements toward cursor (elements only)

Almost any property of any layer can also respond to [events](https://www.unicorn.studio/docs/events/) — appear, hover, scroll, and mouse move. A subtle depth shift tied to the mouse or a scroll-driven mask reveal can add dimensionality without overwhelming the design.

### Variables

When you land on something you like, [variables](https://www.unicorn.studio/docs/variables/) turn it from a one-off scene into a system. Almost any property can become a named control that publishes with your scene — so your site can change colors, text, imagery, and motion at runtime with a simple API, and teammates can generate on-brand variations without touching the design. Group values into presets to ship curated looks like `Brand Dark` and `Brand Light`.

### Exporting

Everything lives in the Export panel, with four ways to get your scene out:

* **Image**: Export a single frame as PNG, JPG, or WEBP
* **Video**: Export a video up to 4K
* **Embed**: Publish and copy a ready-made component for Framer, Webflow, Figma Sites, React, or plain HTML — see the [Embed Guide](https://www.unicorn.studio/docs/embed/)
* **Code**: JSON scene data for self hosting

## [Next: Events](https://www.unicorn.studio/docs/events/)
