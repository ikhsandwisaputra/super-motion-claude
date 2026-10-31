---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering.md
title: ""
fetched: 2026-10-28
---

# Render on the GPU with WebGL or WebGPU
Switch the dotLottie web player to the WebGL2 or WebGPU rendering backend, detect GPU support at runtime, and fall back to the software renderer.

## Overview

`@lottiefiles/dotlottie-web` ships three rendering backends. The default `DotLottie` class rasterizes on the CPU inside the WASM module and draws the result to a 2D canvas. Two additional backends hand rasterization to the GPU:

| Backend  | Import path                         | When to use it                                                               |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| Software | `@lottiefiles/dotlottie-web`        | Default. Broadest compatibility, works in Node.js and Web Workers            |
| WebGL2   | `@lottiefiles/dotlottie-web/webgl`  | Complex animations or large canvases where CPU rasterization is a bottleneck |
| WebGPU   | `@lottiefiles/dotlottie-web/webgpu` | Highest throughput on browsers that support it                               |

All three expose an identical instance API — the same methods, properties, and events. Switching backends is an import change, not a rewrite.

## Choose a backend for your browser support target

Browser support is the deciding factor, so check it against your own analytics before you commit. Each backend depends on a single browser API, and Can I Use tracks the live support picture for each one:

| Backend  | Underlying API   | Live support data                                                                   | Approximate baseline                                                |
| -------- | ---------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Software | Canvas 2D + WASM | [Canvas 2D↗](https://caniuse.com/canvas) · [WebAssembly↗](https://caniuse.com/wasm) | Universal in browsers released since 2017                           |
| WebGL2   | WebGL 2.0        | [WebGL2↗](https://caniuse.com/webgl2)                                               | Chrome and Edge 56+, Firefox 51+, Safari and iOS Safari 15+         |
| WebGPU   | WebGPU           | [WebGPU↗](https://caniuse.com/webgpu)                                               | Chrome and Edge 113+, with Safari and Firefox support still landing |

Treat the Can I Use pages as the source of truth — the baselines above move as browsers ship, and Can I Use lets you filter by the browser versions your own users are on.

A practical way to read that:

- **Broadest reach, no conditional code** — use the software renderer. It has no GPU dependency at all, and it is the only backend that runs in Node.js or a Web Worker.
- **Broad reach with GPU acceleration** — use WebGL2. Support is effectively universal on browsers from the last few years, and the remaining gap is old enough that a software fallback covers it.
- **Maximum throughput, newest browsers** — use WebGPU with a fallback chain. Support is real but partial, so it only makes sense paired with [feature detection](#detect-support-and-fall-back).

:::warning
The WebGPU backend is experimental and WebGPU itself is still rolling out across browsers. Ship it behind a feature check with a fallback, as shown in [Detect support and fall back](#detect-support-and-fall-back).
:::

## Prerequisites

- `@lottiefiles/dotlottie-web` installed — see [Installation](/en/runtimes/distributions/js/v0.x/getting-started/installation)
- A working animation on the default renderer — see [Play your first animation](/en/runtimes/distributions/js/v0.x/getting-started/basic-usage)
- A build tool that resolves package [subpath exports↗](https://nodejs.org/api/packages.html#subpath-exports) (Vite, webpack 5, Rollup, esbuild, and Parcel all do)

## Switch to the WebGL renderer

Both GPU subpaths export their player as `DotLottie`. Alias it on import so the name says which backend you got, and so you can use more than one backend in the same file:

```javascript
import { DotLottie as DotLottieWebGL } from "@lottiefiles/dotlottie-web/webgl";

const dotLottie = new DotLottieWebGL({
  canvas: document.getElementById("canvas"),
  src: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie",
  autoplay: true,
  loop: true,
});
```

The player requests a `webgl2` context from your canvas and renders directly into its framebuffer. Every configuration option, method, and event from the default player works unchanged, so the rest of your code stays the same.

## Switch to the WebGPU renderer

The WebGPU backend follows the same shape:

```javascript
import { DotLottie as DotLottieWebGPU } from "@lottiefiles/dotlottie-web/webgpu";

const dotLottie = new DotLottieWebGPU({
  canvas: document.getElementById("canvas"),
  src: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie",
  autoplay: true,
  loop: true,
});
```

When you don't supply a device, the player requests a `GPUAdapter` and a `GPUDevice` for you during initialization, attaches `uncapturederror` and `device.lost` handlers that log to the console, and destroys the device when you call `destroy()`.

### Share an existing GPUDevice

If your application already owns a `GPUDevice` — because you render other WebGPU content alongside the animation — pass it as `device`:

```javascript
import { DotLottie as DotLottieWebGPU } from "@lottiefiles/dotlottie-web/webgpu";

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const dotLottie = new DotLottieWebGPU({
  canvas: document.getElementById("canvas"),
  src: "animation.lottie",
  autoplay: true,
  device,
});
```

Ownership follows whoever created the device. A device you pass in is yours to destroy — `dotLottie.destroy()` releases the canvas context and the WASM core but leaves your device alive. Read the active device back from the `device` getter, which returns `null` before initialization finishes and after `destroy()`:

```javascript
dotLottie.addEventListener("ready", () => {
  console.log(dotLottie.device); // GPUDevice
});
```

## Detect support and fall back

Initialization runs asynchronously after the constructor returns, so a failure never throws where you called `new`. Instead the player emits a `loadError` event. Wrapping the constructor in `try`/`catch` will not catch a missing GPU.

Two failure modes matter:

- **WebGPU**: no `navigator.gpu` (`WebGPU is not supported in this browser.`) or no adapter available (`Failed to get WebGPU adapter.`)
- **WebGL2**: the canvas cannot produce a `webgl2` context (`Failed to get WebGL2 context. Ensure the browser supports WebGL2.`)

Check for support before you construct the player, and pick the class accordingly:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { DotLottie as DotLottieWebGL } from "@lottiefiles/dotlottie-web/webgl";
import { DotLottie as DotLottieWebGPU } from "@lottiefiles/dotlottie-web/webgpu";

function supportsWebGL2() {
  return Boolean(document.createElement("canvas").getContext("webgl2"));
}

async function pickRenderer() {
  if (navigator.gpu && (await navigator.gpu.requestAdapter())) return DotLottieWebGPU;
  if (supportsWebGL2()) return DotLottieWebGL;
  return DotLottie;
}

const Renderer = await pickRenderer();

let dotLottie = new Renderer({
  canvas: document.getElementById("canvas"),
  src: "animation.lottie",
  autoplay: true,
  loop: true,
});
```

Feature detection can still pass while initialization fails — a driver-level problem, for example. Listen for `loadError` and rebuild on the software renderer as a safety net:

```javascript
dotLottie.addEventListener("loadError", ({ error }) => {
  console.warn("GPU renderer failed, falling back to software:", error.message);

  dotLottie.destroy();

  dotLottie = new DotLottie({
    canvas: document.getElementById("canvas"),
    src: "animation.lottie",
    autoplay: true,
    loop: true,
  });
});
```

:::tip
`loadError` also fires for animation-loading failures such as a bad `src`. Rebuilding on the software renderer for those cases will fail again, so gate the retry on a flag if you want to attempt it only once.
:::

## Preload the right WASM binary

Each backend has its own WASM binary at its own CDN path, and each has its own loader. `DotLottie.preload()` does **not** preload the WebGL or WebGPU module — call `preload()` on the class you actually render with:

```javascript
import { DotLottie as DotLottieWebGL } from "@lottiefiles/dotlottie-web/webgl";

// At app or route load, before any player is constructed:
DotLottieWebGL.preload();
```

The same applies to `<link rel="preload">` tags. The GPU binaries live under `dist/webgl/` and `dist/webgpu/`, not at the root path used by the default player:

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link
  rel="preload"
  as="fetch"
  crossorigin
  href="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.78.2/dist/webgl/dotlottie-player.wasm"
/>
```

The version in the URL must match your installed package version, and `crossorigin` is required — see [Optimize performance](/en/runtimes/distributions/js/v0.x/advanced/performance) for the full explanation.

### Self-host the WASM binary

Each binary is exported as a package subpath, so bundlers can emit it as an asset. In Vite, import it with `?url` and pass the result to the matching `setWasmUrl()`:

```javascript
import { DotLottie as DotLottieWebGL } from "@lottiefiles/dotlottie-web/webgl";
import wasmUrl from "@lottiefiles/dotlottie-web/webgl/dotlottie-player.wasm?url";

DotLottieWebGL.setWasmUrl(wasmUrl);
DotLottieWebGL.preload();
```

`setWasmUrl()` is per backend as well: calling it on `DotLottie` leaves the WebGL and WebGPU loaders pointed at the CDN. Call it on every class you use, and always before `preload()`.

## Constraints

The GPU backends need a real `HTMLCanvasElement` with a live GPU context, which rules out three things the software renderer supports:

- **No Web Worker rendering.** `DotLottieWorker` is exported only from the package root and always uses the software backend. The `/webgl` and `/webgpu` subpaths have no worker equivalent.
- **No `OffscreenCanvas` or custom render surfaces.** `WebGLConfig` and `WebGPUConfig` narrow `canvas` to `HTMLCanvasElement` and make it required, where the base `Config` accepts `HTMLCanvasElement | OffscreenCanvas | RenderSurface` and treats it as optional.
- **Browser only.** The software renderer runs in Node.js against a canvas implementation such as `@napi-rs/canvas`; the GPU backends do not.

Reading pixels back also differs: the `buffer` property is populated by the software renderer's frame buffer, and GPU-rendered frames draw straight into the canvas instead.

## Troubleshooting

### Nothing renders and the console shows a WebGL2 context error

The canvas already has a context of a different type. A canvas can only ever hand out one context type, so a canvas that previously ran the software renderer cannot be reused for WebGL. Create a fresh `<canvas>` element for the GPU player.

### The animation looks blurry or is the wrong size

Both GPU backends size the canvas backing store from its CSS box multiplied by the device pixel ratio, which means the canvas needs a non-zero CSS size before the player initializes. Give it explicit dimensions:

```html
<canvas id="canvas" style="width: 300px; height: 300px"></canvas>
```

If you resize the canvas yourself, call `resize()` afterwards, or set `renderConfig.autoResize` to `true`.

### Colors are swapped or the canvas is black on Android or Linux

Update to `@lottiefiles/dotlottie-web` 0.78.0 or later, which hands WebGPU surface configuration to the rendering engine instead of configuring it from JavaScript.

### The WASM download happens twice

Your `<link rel="preload">` URL doesn't match the URL the player requests. Confirm the version matches your installed package, the path includes the `webgl/` or `webgpu/` segment, and `crossorigin` is present.

## Related

- [Optimize performance](/en/runtimes/distributions/js/v0.x/advanced/performance) — preloading, pixel ratio, and memory management
- [Render animations in a web worker](/en/runtimes/distributions/js/v0.x/advanced/web-worker) — the other way to take rendering off the main thread
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference) — `WebGLConfig`, `WebGPUConfig`, and the shared instance API
- [Render on the GPU in React](/en/runtimes/distributions/react/v0.x/gpu-rendering) — the same backends through `DotLottieReact`
