---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts.md
title: ""
fetched: 2026-10-28
---

# How the web player works
Why the dotLottie web player renders to a canvas with WebAssembly, what .lottie files contain, and how themes, slots, and renderers fit together.

The dotLottie web player takes a different approach from DOM- or SVG-based Lottie players: it rasterizes every frame of your animation with a native rendering engine and draws the result onto an HTML `<canvas>`. Understanding this model — and the `.lottie` format the player is built around — explains most of the player's behavior, from why there is a `ready` event to why the same file can change its colors at runtime.

## A canvas and a WebAssembly engine

When you construct a `DotLottie` instance, you hand it a canvas element and an animation source. The actual drawing is not done in JavaScript. The player is built on [ThorVG](/en/runtimes/overview/thorvg), an open-source C/C++ vector graphics engine, compiled to WebAssembly and delivered through LottieFiles' Rust core, dotlottie-rs. The same engine powers the dotLottie players on iOS, Android, and React Native, which is why an animation renders identically across platforms.

This architecture has a practical consequence: the WASM engine (roughly 500 KB compressed) is fetched from a CDN the first time a player is constructed, and nothing can render until it has been downloaded and compiled. That is what the player's `ready` event and `isReady` property report, and it is why the [performance guide](/en/runtimes/distributions/js/v0.x/advanced/performance) recommends preloading the engine before your first animation appears.

## CPU, WebGL, and WebGPU renderers

The package ships three variants of the player that share one API but rasterize differently, one per import path. The `DotLottie` class exported from the package root renders on the CPU inside the WASM module — the most compatible option, since it needs nothing beyond a plain 2D canvas. The `webgl` subpath hands rasterization to the GPU through WebGL2, which browsers support widely. The `webgpu` subpath targets the newer WebGPU API for the highest performance, but WebGPU is still an emerging standard with limited browser support.

Each subpath exports its player under the same name, `DotLottie`, so you alias it on import — `import { DotLottie as DotLottieWebGL } from "@lottiefiles/dotlottie-web/webgl"`. Because the API is identical, choosing a renderer is a deployment decision rather than a code rewrite. Each backend does carry its own WASM binary, though, so preloading and self-hosting are configured per renderer rather than once for the package. The [GPU rendering guide](/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering) covers the details.

There is also `DotLottieWorker`, which moves the whole engine into a Web Worker so rendering work leaves the main thread entirely — the same API again, except every call returns a `Promise` because it crosses a thread boundary. It is a separate choice rather than a modifier: the worker always uses the CPU renderer, and the GPU backends have no worker equivalent because they need a real canvas with a live GPU context on the main thread.

## .lottie files and Lottie JSON

The player accepts two formats. A Lottie `.json` file is a single raw animation. A `.lottie` file is a package: it can bundle several animations, plus themes and state machines, into one compact archive. Both play the same way, but the extra capabilities of the player — switching animations, applying themes, running state machines — depend on content that only a `.lottie` file can carry.

The package describes itself through a manifest. After a `.lottie` file loads, the player exposes the parsed `manifest.json` on its `manifest` property: which animations the file contains and under what IDs, which themes and state machines are available, the format version, and the tool that generated the file. When you load a plain `.json` animation there is no package to describe, so the manifest is `null`. State machine definitions live in the package's `s/` directory and are likewise addressed by ID.

## Themes and slots

Both themes and slots exist to answer the same question: how do you change an animation's appearance at runtime without editing the animation file? They operate at different levels.

A slot is a named, typed placeholder that a designer deliberately exposes inside the animation — a brand color, a headline text, a background gradient. Each slot has a type (color, scalar, vector, gradient, text, or image), and your application code can override its value at any time, either with a static value or with keyframed values that animate. Slots are the fine-grained mechanism: one property, one override.

A theme is the packaged, coarse-grained counterpart: a named set of styling data stored in the `.lottie` file that the player applies as a whole, by ID. This is what makes light/dark variants of a single animation practical — the file ships both themes and your code switches between them in one call. Under the hood the two mechanisms are related; theme data can be transformed into Lottie slot format, which is exactly what the player's `transformThemeToLottieSlots` utility does.

## Frame interpolation

Lottie animations are authored at a fixed frame rate, but browsers repaint at their own rhythm. By default the player interpolates between authored frames — updating on subframes — so motion stays smooth even when the animation's frame rate and the display's refresh rate disagree. The trade-off is extra rendering work: every subframe must be rasterized. For simple animations or constrained devices, turning interpolation off trades some smoothness for cheaper rendering, which is why the option exists and defaults to on.

## Where to go next

- [Load animations](/en/runtimes/distributions/js/v0.x/core-concepts/loading-animations) from URLs, data, or multi-animation files
- [Control playback](/en/runtimes/distributions/js/v0.x/core-concepts/playback-control) with methods and events
- [Control layout and styling](/en/runtimes/distributions/js/v0.x/core-concepts/layout-styling) of the canvas
- [Apply themes at runtime](/en/runtimes/distributions/js/v0.x/core-concepts/theming) and [override properties with slots](/en/runtimes/distributions/js/v0.x/core-concepts/slots)
- [Optimize performance](/en/runtimes/distributions/js/v0.x/advanced/performance), including WASM preloading and worker rendering
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference) for the complete surface of the `DotLottie` class
