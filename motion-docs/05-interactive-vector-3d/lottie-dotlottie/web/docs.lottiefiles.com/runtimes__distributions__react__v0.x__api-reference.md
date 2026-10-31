---
source: https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x/api-reference.md
title: ""
fetched: 2026-10-28
---

# API Reference
API reference for the dotLottie React player covering the worker component, WASM configuration, worker URL configuration, instance access, and links to the full core API.

In addition to the `DotLottieReact` component (see the [props reference](/en/runtimes/distributions/react/v0.x/props-reference)), the `@lottiefiles/dotlottie-react` package provides the `DotLottieWorkerReact` component, the `setWasmUrl` function, and the `setWorkerUrl` function. `DotLottieReact` wraps the core [dotLottie web player](/en/runtimes/distributions/js/v0.x/api/reference); the underlying `DotLottie` instance exposes the full core API.

## DotLottieWorkerReact

`DotLottieWorkerReact` offloads animation rendering to a Web Worker, keeping the main thread free for UI interactions. It accepts the same props as `DotLottieReact` plus `workerId`.

```jsx
import { DotLottieWorkerReact } from "@lottiefiles/dotlottie-react";

function App() {
  return <DotLottieWorkerReact src="animation.lottie" autoplay loop workerId="shared-worker" />;
}
```

| Prop       | Type     | Default     | Description                                                                                                                    |
| ---------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `workerId` | `string` | `undefined` | Groups multiple animations on the same Web Worker thread. Animations sharing a `workerId` reuse one worker, reducing overhead. |

All instance methods accessed via `dotLottieRefCallback` return `Promise` values when using `DotLottieWorkerReact`, since calls are proxied to the worker thread.

## setWasmUrl

`setWasmUrl(url: string)` sets a custom URL for the WASM renderer binary. It must be called before any animation is rendered — for example, at the top of the app entry point.

```typescript
import { setWasmUrl } from "@lottiefiles/dotlottie-react";

setWasmUrl("https://your-cdn.com/dotlottie-player.wasm");
```

## setWorkerUrl

`setWorkerUrl(url: string)` sets a custom URL for the Web Worker script used by `DotLottieWorkerReact`. Call it before any worker-backed animation is rendered — for example, at the top of the app entry point.

By default, the player creates the worker from a `blob:` URL, which requires `worker-src: blob:` in your Content Security Policy. Self-hosting the worker script and pointing `setWorkerUrl` at it lets you tighten your CSP to allow only that specific origin instead.

The standalone worker script ships at `dist/dotlottie.worker.js` inside the `@lottiefiles/dotlottie-web` package. Copy it to your own hosting or CDN and pass the URL here:

```typescript
import { setWorkerUrl } from "@lottiefiles/dotlottie-react";

setWorkerUrl("https://your-cdn.com/dotlottie.worker.js");
```

Relative paths are resolved against the current page URL before being passed to the worker, so you can also use a path relative to your app's root:

```typescript
import { setWorkerUrl } from "@lottiefiles/dotlottie-react";

setWorkerUrl("/static/dotlottie.worker.js");
```

## Player instance access

The `dotLottieRefCallback` prop (type `React.RefCallback<DotLottie | null>`) receives the underlying `DotLottie` web player instance:

```jsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function App() {
  const [dotLottie, setDotLottie] = React.useState(null);

  React.useEffect(() => {
    if (!dotLottie) return;

    const onLoad = () => {
      console.log("Total frames:", dotLottie.totalFrames);
      console.log("Duration:", dotLottie.duration);
    };

    dotLottie.addEventListener("load", onLoad);
    return () => dotLottie.removeEventListener("load", onLoad);
  }, [dotLottie]);

  return <DotLottieReact src="animation.lottie" autoplay loop dotLottieRefCallback={setDotLottie} />;
}
```

The instance exposes all properties, methods, and events of the core player:

- **Properties** — `currentFrame`, `duration`, `totalFrames`, `isPlaying`, `isPaused`, `isStopped`, `isLoaded`, `loop`, `speed`, `mode`, `segment`, `manifest`, `activeAnimationId`, `activeThemeId`, and more. See [Properties](/en/runtimes/distributions/js/v0.x/api/reference#properties).
- **Methods** — `play()`, `pause()`, `stop()`, `setFrame()`, `setSpeed()`, `setLoop()`, `setMode()`, `setSegment()`, `setMarker()`, `freeze()`, `unfreeze()`, `tween()`, `load()`, `loadAnimation()`, `setTheme()`, `setLayout()`, slot methods, state machine methods, and more. See [Methods](/en/runtimes/distributions/js/v0.x/api/reference#methods).
- **Events** — `ready`, `load`, `loadError`, `play`, `pause`, `stop`, `loop`, `complete`, `frame`, `render`, `freeze`, `unfreeze`, `destroy`, `renderError`, plus all state machine events. See [Events](/en/runtimes/distributions/js/v0.x/api/reference#events).
- **Types** — `Layout`, `RenderConfig`, `StateMachineConfig`, `Transform`, `Marker`, slot value types, and event payload interfaces. See [Type Definitions](/en/runtimes/distributions/js/v0.x/api/reference#type-definitions).

## Related topics

- [Props reference](/en/runtimes/distributions/react/v0.x/props-reference) — Component props
- [Examples](/en/runtimes/distributions/react/v0.x/examples) — Usage examples
- [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference) — Full core player API
