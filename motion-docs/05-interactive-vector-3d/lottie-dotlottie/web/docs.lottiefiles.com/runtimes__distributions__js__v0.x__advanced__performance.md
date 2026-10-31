---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/performance.md
title: ""
fetched: 2026-10-28
---

# Optimize performance
Speed up dotLottie animations on the web - preload the WASM engine, tune render configuration, manage memory, and lazy-load animations.

If animations start slowly, drop frames, or consume too much CPU or memory, work through the techniques below. Each one is independent — apply the ones that match your bottleneck.

## Preload the WASM engine

The player's WASM engine (\~500 KB compressed) is fetched from a CDN the first time a player is constructed. This download sits on the critical path of your first animation — the animation won't render until the WASM is ready.

Call `DotLottie.preload()` at app or route load time, before any player is constructed, to start the download early:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

// At app or route load, before any player is constructed:
DotLottie.preload();
```

`preload()` returns a `Promise<void>` that resolves when the WASM is compiled and ready. You can await it if you need to know exactly when the engine is available, but you don't need to — the player will use the already-in-progress download automatically.

For even earlier loading, add a `<link rel="preload">` tag to your HTML (`crossorigin` is required — without it the preloaded response cannot be reused and the file downloads twice):

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link
  rel="preload"
  as="fetch"
  crossorigin
  href="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.80.0/dist/dotlottie-player.wasm"
/>
```

:::warning
The version in the `<link>` URL must exactly match your installed package version. The player fetches a version-pinned URL, and a mismatch means the browser cannot reuse the preloaded response.
:::

### Use a custom WASM URL

If you want to self-host the WASM binary or load it from a different CDN, call `setWasmUrl()` before `preload()` and point the preload tag at the same URL:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

DotLottie.setWasmUrl("/assets/dotlottie-player.wasm");
DotLottie.preload();
```

:::warning
Calling `setWasmUrl()` disables the built-in jsdelivr/unpkg fallback. If your URL fails to load, the error surfaces immediately as a `loadError` event instead of silently retrying from a CDN. Make sure the path you supply is correct and reachable.
:::

`setWasmUrl()` throws `TypeError` synchronously if passed a non-string or empty string.

A load that is already in flight when `setWasmUrl()` is called keeps the URLs it started with. Only loads that begin after the call use the new URL.

#### `DotLottieWorker.setWasmUrl()`

`DotLottieWorker` has its own static `setWasmUrl()` with a couple of differences from the main-thread version:

- **Relative URLs are resolved against the page.** Workers run from a `blob:` URL where relative paths cannot resolve, so the method resolves your URL against `document.baseURI` before forwarding it.
- **Broadcasts to already-running workers.** Any workers that exist but haven't yet started loading WASM will receive the new URL automatically — you don't need to call it before constructing each worker individually.

Call it before constructing any `DotLottieWorker` instance for the most predictable behavior:

```javascript
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

DotLottieWorker.setWasmUrl("/assets/dotlottie-player.wasm");
```

The WebGL and WebGPU backends each ship their own WASM binary under `dist/webgl/` and `dist/webgpu/`, loaded independently of the default player's. `DotLottie.preload()` does not cover them — call `preload()` on the class you actually render with, and point any `<link rel="preload">` tag at that backend's path. See [Render on the GPU with WebGL or WebGPU](/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering) for the import paths and URLs.

## Tune the render configuration

### Lower the device pixel ratio

Rendering cost scales with resolution. Reduce the pixel ratio when full resolution isn't needed:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  renderConfig: {
    // Automatically adjusted for high-DPI displays
    devicePixelRatio: window.devicePixelRatio * 0.75,
  },
});
```

On high-DPI mobile devices, capping the ratio (for example at 2) keeps output sharp while cutting rendering work.

### Disable frame interpolation

By default the player interpolates between frames: on every browser animation frame it advances to a fractional position in the timeline and rasterizes that subframe. The animation therefore re-renders at your display's refresh rate — 60 times a second on a typical monitor, 120 on a high-refresh phone — no matter what frame rate the animation was authored at.

Set `useFrameInterpolation` to `false` and the player only redraws when the whole frame number changes. An animation authored at 30 fps then rasterizes 30 times a second instead of 60 or 120, roughly halving its rendering cost:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  useFrameInterpolation: false, // Render only on whole frames
});
```

You can also toggle it at runtime with `setUseFrameInterpolation(false)` — for example, to drop subframe rendering only while the page is under load.

**When to turn it off:**

- **The animation is authored at a high frame rate.** Interpolation exists to smooth the gaps between sparse frames. At 50 or 60 fps the frames are already dense enough that the eye can't tell the difference, so dropping it is visually safe. The rendering saving is smallest here, though — a 60 fps animation on a 60 Hz display redraws about as often either way. The largest saving comes from the opposite case: low-frame-rate content on a high-refresh display, where turning interpolation off can halve the number of draws.
- **You're rendering many animations at once**, or targeting low-powered mobile devices, where total rasterization cost is the bottleneck.
- **The motion is slow or largely static** — a background loop or a subtle idle animation — where a slight loss of smoothness goes unnoticed.

**When to keep it on:**

Low-frame-rate animations with fast motion are where interpolation earns its cost. An animation authored at 24 fps with a quick sweep or spin can look visibly steppy without it. Compare both settings on the animation you actually ship before deciding.

### Freeze offscreen animations

Stop rendering animations the user can't see:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  renderConfig: {
    freezeOnOffscreen: true,
  },
});
```

A combined configuration for constrained devices:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  renderConfig: {
    devicePixelRatio: Math.min(window.devicePixelRatio, 2), // Cap at 2x
    freezeOnOffscreen: true,
  },
  useFrameInterpolation: false, // Disable for high-performance needs
  layout: {
    fit: "contain", // Use appropriate fit mode
  },
});
```

See the [render configuration reference](/en/runtimes/distributions/js/v0.x/api/reference#render-configuration) for all options, including `quality`.

## Move rendering off the main thread

If complex animations cause high CPU usage or jank on the main thread, render them in a Web Worker with `DotLottieWorker`:

```javascript
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

const animation = new DotLottieWorker({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  autoplay: true,
  workerId: "worker-1",
});
```

See [Render animations in a web worker](/en/runtimes/distributions/js/v0.x/advanced/web-worker) for worker grouping and the Promise-based API.

## Manage memory

Destroy players you no longer need and remove event listeners to prevent memory leaks:

```javascript
// Clean up when animation is no longer needed
dotLottie.destroy();

// Remove event listeners
dotLottie.removeEventListener("frame", frameHandler);
dotLottie.removeEventListener("loop", loopHandler);
```

When working with many animations, keep references so you can clean them all up:

```javascript
const animations = [];

// Group animations by worker
function createAnimation(src, workerId) {
  const animation = new DotLottieWorker({
    canvas: document.querySelector(`#canvas-${workerId}`),
    src: src,
    workerId: workerId,
    renderConfig: {
      freezeOnOffscreen: true,
      devicePixelRatio: window.devicePixelRatio * 0.75,
    },
  });

  animations.push(animation);
}

// Clean up all animations
function cleanup() {
  animations.forEach((animation) => animation.destroy());
  animations.length = 0;
}
```

## Resize efficiently

Enable `autoResize`, or wrap manual resize calls in `requestAnimationFrame`:

```javascript
const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas"),
  src: "animation.lottie",
  renderConfig: {
    autoResize: true, // Automatic canvas resizing
  },
});

// Or handle manually if needed
window.addEventListener("resize", () => {
  requestAnimationFrame(() => {
    dotLottie.resize();
  });
});
```

## Lazy-load offscreen animations

Load animations only when they scroll into view, and consider preloading critical ones:

```javascript
// Lazy loading example
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadAnimation(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

function loadAnimation(container) {
  const canvas = container.querySelector("canvas");
  new DotLottie({
    canvas: canvas,
    src: canvas.dataset.animation,
    autoplay: true,
    renderConfig: {
      freezeOnOffscreen: true,
    },
  });
}

// Observe animation containers
document.querySelectorAll(".animation-container").forEach((container) => {
  observer.observe(container);
});
```

## Monitor frame rate

Measure FPS with the `frame` event to verify your optimizations:

```javascript
let lastFrame = performance.now();
let frameCount = 0;

dotLottie.addEventListener("frame", () => {
  frameCount++;
  const now = performance.now();
  if (now - lastFrame >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastFrame = now;
  }
});
```

## Troubleshoot common issues

- **High CPU usage** — use Web Workers for complex animations, implement proper cleanup, and reduce animation complexity.
- **Memory leaks** — destroy animations when not needed, remove event listeners, and clear references to unused objects.
- **Poor mobile performance** — lower the device pixel ratio, disable frame interpolation, and use appropriate canvas sizes.
- **Slow first frame** — call `DotLottie.preload()` at app or route load time, and add a `<link rel="preload">` tag pointing at the WASM file.
- **WASM loads from the wrong URL** — if you called `setWasmUrl()`, remember that this disables the CDN fallback. A `loadError` event instead of a silent CDN retry means the URL you configured is unreachable. Verify the path and that `setWasmUrl()` was called before `preload()` or any player construction.

## Related

- [Render animations in a web worker](/en/runtimes/distributions/js/v0.x/advanced/web-worker)
- [How the web player works](/en/runtimes/distributions/js/v0.x/core-concepts) — why the WASM engine and frame interpolation exist
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference#render-configuration) for defaults of every render option
