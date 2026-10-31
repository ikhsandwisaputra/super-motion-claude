---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/web-worker.md
title: ""
fetched: 2026-10-28
---

# Render animations in a web worker
Use the DotLottieWorker class to move dotLottie animation rendering into a Web Worker and keep the main thread free for your application.

To keep the main thread responsive while rendering animations, use the `DotLottieWorker` class. It moves rendering into a dedicated [Web Worker↗](https://developer.mozilla.org/en-US/docs/Web/API/Worker) while exposing the same API as `DotLottie` — the difference is that all methods and property reads return a `Promise`.

Worker rendering pays off most when you run multiple complex animations, need high frame rates, render CPU-intensive content, or work with large animation files.

## Create a worker-backed player

Replace `DotLottie` with `DotLottieWorker`:

```javascript
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

const animation = new DotLottieWorker({
  canvas: document.getElementById("canvas"),
  src: "url/to/animation.json",
  autoplay: true,
  loop: true,
});
```

The constructor accepts the same configuration object as `DotLottie`, plus an optional `workerId`.

:::tip
Relative paths in `src` are resolved against the page URL before being sent to the worker, so you can use root-relative and document-relative paths safely.
:::

## Distribute animations across workers

By default, all `DotLottieWorker` instances share the same worker. To spread the rendering load, assign animations to named workers with `workerId`:

```javascript
const animation1 = new DotLottieWorker({
  canvas: document.getElementById("canvas"),
  src: "url/to/animation.json",
  autoplay: true,
  loop: true,
  workerId: "worker-1",
});

const animation2 = new DotLottieWorker({
  canvas: document.getElementById("canvas-2"),
  src: "url/to/animation2.json",
  autoplay: true,
  loop: true,
  workerId: "worker-2",
});
```

Group related animations in the same worker and give independent groups their own workers — for example, background decorations in one worker and an interactive animation in another:

```javascript
// Group related animations in the same worker
const backgroundAnimations = ["bg1.json", "bg2.json"].map(
  (src) =>
    new DotLottieWorker({
      canvas: document.getElementById(src),
      src: src,
      workerId: "background",
      renderConfig: {
        freezeOnOffscreen: true,
      },
    })
);

// Use separate worker for interactive animations
const interactiveAnimation = new DotLottieWorker({
  canvas: document.getElementById("interactive"),
  src: "interactive.json",
  workerId: "interactive",
});
```

Consider device capabilities when deciding how many workers to create.

## Work with the Promise-based API

All methods execute in the worker thread and return a `Promise`; property reads must be awaited too:

```javascript
// Properties
const isPlaying = await dotLottie.isPlaying;
const currentFrame = await dotLottie.currentFrame;

// Methods
await dotLottie.play();
await dotLottie.pause();
await dotLottie.stop();
```

Handle promise rejections from worker methods, and fall back to the main-thread `DotLottie` class if worker creation fails in your environment.

## Listen for events

Event handling is identical to the standard player:

```javascript
dotLottie.addEventListener("play", () => {
  console.log("Animation started playing");
});

dotLottie.addEventListener("complete", () => {
  console.log("Animation completed");
});
```

## Use a strict Content-Security-Policy

By default, `DotLottieWorker` starts its worker from a `blob:` URL, which requires `worker-src: blob:` in your Content-Security-Policy. If your CSP does not allow `blob:` worker sources, self-host the worker script and point the library at it with `DotLottieWorker.setWorkerUrl()` before constructing any instance:

```javascript
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

// Call before creating any DotLottieWorker instance:
DotLottieWorker.setWorkerUrl("/js/dotlottie/dotlottie.worker.js");
DotLottieWorker.setWasmUrl("/js/dotlottie/dotlottie-player.wasm");

const animation = new DotLottieWorker({
  canvas: document.getElementById("canvas"),
  src: "animation.lottie",
  autoplay: true,
});
```

The worker script is shipped as `@lottiefiles/dotlottie-web/dotlottie.worker.js` in the installed package. Copy it to your server alongside the WASM binary:

```
node_modules/@lottiefiles/dotlottie-web/dotlottie.worker.js  →  /js/dotlottie/dotlottie.worker.js
node_modules/@lottiefiles/dotlottie-web/dotlottie-player.wasm  →  /js/dotlottie/dotlottie-player.wasm
```

Keep the following constraints in mind:

- **Same-origin only.** Browsers refuse cross-origin workers regardless of CSP. Serve the worker script from the same origin as your page.
- **Workers already running are unaffected.** Only workers created after the `setWorkerUrl()` call use the custom URL.
- **Pair with `setWasmUrl()`.** A URL-hosted worker inherits the page's CSP. Unless your `connect-src` allows the jsdelivr/unpkg CDNs, supply a self-hosted WASM URL too.
- **Keep files in sync on every upgrade.** The worker script and the WASM binary must match the installed package version.

See the [API reference](/en/runtimes/distributions/js/v0.x/api/reference#dotlottieworker-static-methods) for the full `setWorkerUrl()` specification.

## Compare performance

[CodePen↗](https://codepen.io/lottiefiles/embed/VwJZPrQ?default-tab=js%2Cresult\&theme-id=light)

## Clean up

Destroy worker-backed animations when you no longer need them, and use `freezeOnOffscreen` so hidden animations stop consuming worker time:

```javascript
await animation.destroy();
```

## Related

- [Optimize performance](/en/runtimes/distributions/js/v0.x/advanced/performance) for the full performance toolkit
- [API Reference](/en/runtimes/distributions/js/v0.x/api/reference) — `DotLottieWorker` mirrors the `DotLottie` API
