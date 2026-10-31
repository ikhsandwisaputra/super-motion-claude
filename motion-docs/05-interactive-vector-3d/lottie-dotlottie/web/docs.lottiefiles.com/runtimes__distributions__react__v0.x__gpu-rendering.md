---
source: https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x/gpu-rendering.md
title: ""
fetched: 2026-10-28
---

# Render on the GPU in React
Import DotLottieReact from the webgl or webgpu subpath to render on the GPU, detect support at runtime, and fall back to the software renderer.

## Overview

`@lottiefiles/dotlottie-react` ships the same `DotLottieReact` component on three subpaths, one per rendering backend:

| Backend  | Import path                           | When to use it                                                               |
| -------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| Software | `@lottiefiles/dotlottie-react`        | Default. Broadest compatibility                                              |
| WebGL2   | `@lottiefiles/dotlottie-react/webgl`  | Complex animations or large canvases where CPU rasterization is a bottleneck |
| WebGPU   | `@lottiefiles/dotlottie-react/webgpu` | Highest throughput on browsers that support it                               |

Every subpath exports a component named `DotLottieReact` that accepts the same props, so switching backends is a one-line import change. The WebGPU build adds a single prop, `device`.

## Choose a backend for your browser support target

Browser support is the deciding factor, so check it against your own analytics before you commit. Each backend depends on a single browser API, and Can I Use tracks the live support picture for each one:

| Backend  | Underlying API   | Live support data                                                                   | Approximate baseline                                                |
| -------- | ---------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Software | Canvas 2D + WASM | [Canvas 2D↗](https://caniuse.com/canvas) · [WebAssembly↗](https://caniuse.com/wasm) | Universal in browsers released since 2017                           |
| WebGL2   | WebGL 2.0        | [WebGL2↗](https://caniuse.com/webgl2)                                               | Chrome and Edge 56+, Firefox 51+, Safari and iOS Safari 15+         |
| WebGPU   | WebGPU           | [WebGPU↗](https://caniuse.com/webgpu)                                               | Chrome and Edge 113+, with Safari and Firefox support still landing |

Treat the Can I Use pages as the source of truth — the baselines above move as browsers ship, and Can I Use lets you filter by the browser versions your own users are on.

A practical way to read that:

- **Broadest reach, no conditional code** — use the software renderer from the package root. It has no GPU dependency, and it is the only backend with a Web Worker variant.
- **Broad reach with GPU acceleration** — use WebGL2. Support is effectively universal on browsers from the last few years, and a software fallback covers the remainder.
- **Maximum throughput, newest browsers** — use WebGPU with a fallback chain. Support is real but partial, so it only makes sense paired with [feature detection](#detect-support-and-fall-back).

:::warning
The WebGPU backend is experimental and WebGPU itself is still rolling out across browsers. Ship it behind a feature check with a fallback, as shown in [Detect support and fall back](#detect-support-and-fall-back).
:::

## Prerequisites

- `@lottiefiles/dotlottie-react` installed and rendering an animation — see [Getting started](/en/runtimes/distributions/react/v0.x)
- A bundler that resolves package [subpath exports↗](https://nodejs.org/api/packages.html#subpath-exports) (Vite, webpack 5, Next.js, and Parcel all do)

## Switch to the WebGL renderer

Change the import path and nothing else:

```jsx
import { DotLottieReact } from "@lottiefiles/dotlottie-react/webgl";

const App = () => {
  return (
    <DotLottieReact
      src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
      loop
      autoplay
      style={{ width: 300, height: 300 }}
    />
  );
};
```

The component requests a `webgl2` context from the canvas it renders and draws directly into its framebuffer. All props from the [props reference](/en/runtimes/distributions/react/v0.x/props-reference) work unchanged, including `dotLottieRefCallback` for reaching the player instance.

## Switch to the WebGPU renderer

```jsx
import { DotLottieReact } from "@lottiefiles/dotlottie-react/webgpu";

const App = () => {
  return <DotLottieReact src="animation.lottie" loop autoplay style={{ width: 300, height: 300 }} />;
};
```

Without a `device` prop, the component requests a `GPUAdapter` and `GPUDevice` for you, logs uncaptured GPU errors and device-loss events to the console, and destroys the device when the component unmounts.

### Share an existing GPUDevice

Pass `device` when your application already owns one — for example, when the animation sits alongside other WebGPU content that must share resources:

```jsx
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react/webgpu";

const App = () => {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    let created = null;

    navigator.gpu
      ?.requestAdapter()
      .then((adapter) => adapter?.requestDevice())
      .then((gpuDevice) => {
        created = gpuDevice ?? null;
        setDevice(created);
      });

    return () => created?.destroy();
  }, []);

  if (!device) return null;

  return <DotLottieReact src="animation.lottie" loop autoplay device={device} />;
};
```

A device you create is yours to destroy, as in the cleanup above. Unmounting the component releases the canvas context and the WASM core but leaves your device alive.

## Detect support and fall back

The player initializes asynchronously after mount, so a missing GPU never throws during render — you cannot catch it with an error boundary. Detect support before you choose a component, and treat the `loadError` event as the backstop.

Import each backend under its own name so all three are available:

```jsx
import { useEffect, useState } from "react";
import { DotLottieReact as DotLottieSoftware } from "@lottiefiles/dotlottie-react";
import { DotLottieReact as DotLottieWebGL } from "@lottiefiles/dotlottie-react/webgl";
import { DotLottieReact as DotLottieWebGPU } from "@lottiefiles/dotlottie-react/webgpu";

function supportsWebGL2() {
  return Boolean(document.createElement("canvas").getContext("webgl2"));
}

async function pickRenderer() {
  if (navigator.gpu && (await navigator.gpu.requestAdapter())) return DotLottieWebGPU;
  if (supportsWebGL2()) return DotLottieWebGL;
  return DotLottieSoftware;
}

const Animation = ({ src }) => {
  const [Renderer, setRenderer] = useState(null);

  useEffect(() => {
    let active = true;

    pickRenderer().then((component) => {
      if (active) setRenderer(() => component);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!Renderer) return null;

  return <Renderer src={src} loop autoplay style={{ width: 300, height: 300 }} />;
};
```

:::info
`setRenderer(() => component)` passes an updater function on purpose. React calls any function you hand to a state setter, so storing a component type directly would invoke it instead of saving it.
:::

Initialization can still fail after detection passes — a driver-level problem, for example. Attach a `loadError` listener through `dotLottieRefCallback` and downgrade to the software renderer:

```jsx
import { useCallback, useState } from "react";
import { DotLottieReact as DotLottieSoftware } from "@lottiefiles/dotlottie-react";
import { DotLottieReact as DotLottieWebGL } from "@lottiefiles/dotlottie-react/webgl";

const Animation = ({ src }) => {
  const [failed, setFailed] = useState(false);

  const dotLottieRefCallback = useCallback((dotLottie) => {
    if (!dotLottie) return;

    dotLottie.addEventListener("loadError", ({ error }) => {
      console.warn("GPU renderer failed, falling back to software:", error.message);
      setFailed(true);
    });
  }, []);

  const Renderer = failed ? DotLottieSoftware : DotLottieWebGL;

  return (
    <Renderer key={failed ? "software" : "webgl"} src={src} loop autoplay dotLottieRefCallback={dotLottieRefCallback} />
  );
};
```

The `key` prop forces React to mount a fresh canvas rather than reuse the one that already holds a WebGL context. A canvas can only ever hand out one context type, so reusing it would fail too.

:::tip
`loadError` also fires when animation data fails to load, such as an unreachable `src`. Falling back for those cases won't help, so check `error.message` if you want to react only to renderer failures.
:::

## Self-host the WASM binary

Each backend loads its own WASM binary from a CDN, and each subpath exports its own `setWasmUrl` that affects only that backend. Calling `setWasmUrl` from the package root sets the URL for the software and worker players, not the GPU ones.

Call it once at module scope, before any player mounts:

```jsx
import { setWasmUrl } from "@lottiefiles/dotlottie-react/webgl";
import wasmUrl from "@lottiefiles/dotlottie-web/webgl/dotlottie-player.wasm?url";

setWasmUrl(wasmUrl);
```

The `?url` suffix is Vite syntax; use your bundler's equivalent asset import elsewhere.

To take the WASM download off the first animation's critical path, preload it. The React package doesn't re-export `preload()`, so call it on the underlying web class:

```jsx
import { DotLottie as DotLottieWebGL } from "@lottiefiles/dotlottie-web/webgl";

// At app or route load, before any animation mounts:
DotLottieWebGL.preload();
```

`@lottiefiles/dotlottie-web` is a dependency of the React package, so it usually resolves without a separate install. Add it to your own `dependencies` if your package manager enforces strict dependency resolution — pnpm does by default.

## Constraints

The GPU backends need a real `HTMLCanvasElement` with a live GPU context. Compared with the default component:

- **No worker rendering.** `DotLottieWorkerReact` and the `workerId` prop exist only on the package root and always use the software backend.
- **Browser only.** Server-side rendering still works — the component renders a canvas and initializes the player in an effect — but there is no GPU rendering outside the browser.
- **One backend per canvas.** Don't switch a mounted component between backends; remount it with a new `key`, as shown above.

## Related

- [Render on the GPU with WebGL or WebGPU](/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering) — the same backends in vanilla JavaScript, with more detail on preloading and device ownership
- [Props reference](/en/runtimes/distributions/react/v0.x/props-reference) — every prop, including `device`
- [Examples](/en/runtimes/distributions/react/v0.x/examples) — playback controls and event handling
