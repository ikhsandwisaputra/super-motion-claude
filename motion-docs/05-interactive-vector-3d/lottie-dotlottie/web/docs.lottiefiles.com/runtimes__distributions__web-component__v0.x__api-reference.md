---
source: https://docs.lottiefiles.com/en/runtimes/distributions/web-component/v0.x/api-reference.md
title: ""
fetched: 2026-10-28
---

# API Reference
API reference for the dotLottie web component covering the worker element, WASM configuration, instance access, and links to the full core player API.

The `<dotlottie-wc>` element wraps the core [dotLottie web player](/en/runtimes/distributions/js/v0.x/api/reference). The player instance is exposed through the element's `.dotLottie` property, which gives access to the full core API — properties, methods, and events documented in the [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference).

## Worker element: dotlottie-worker-wc

The `<dotlottie-worker-wc>` element offloads animation rendering to a Web Worker, keeping the main thread free for UI interactions. It accepts the same attributes as `<dotlottie-wc>` plus `workerId`.

```html
<dotlottie-worker-wc src="animation.lottie" autoplay loop workerId="shared-worker"></dotlottie-worker-wc>
```

| Attribute  | Type     | Default     | Description                                                                                                                  |
| ---------- | -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `workerId` | `string` | `undefined` | Groups multiple animations on the same Web Worker thread. Elements sharing a `workerId` reuse one worker, reducing overhead. |

All instance methods accessed via the `.dotLottie` property return `Promise` values when using `<dotlottie-worker-wc>`, since calls are proxied to the worker thread.

**CDN usage:**

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-worker-wc.js"
></script>

<dotlottie-worker-wc src="animation.lottie" autoplay loop></dotlottie-worker-wc>
```

**npm usage:**

```javascript
import "@lottiefiles/dotlottie-wc/dotlottie-worker-wc";
```

## setWasmUrl

`setWasmUrl(url: string)` sets a custom URL for the WASM renderer binary. It must be called before any elements are rendered.

```javascript
import { setWasmUrl } from "@lottiefiles/dotlottie-wc";

setWasmUrl("https://your-cdn.com/dotlottie-player.wasm");
```

## Player instance access

The `.dotLottie` property on the element returns the underlying `DotLottie` instance after the animation loads:

```html
<dotlottie-wc id="my-player" src="animation.lottie" autoplay loop></dotlottie-wc>

<script>
  const player = document.getElementById("my-player");

  player.addEventListener("load", () => {
    const dotLottie = player.dotLottie;
    if (dotLottie) {
      console.log("Total frames:", dotLottie.totalFrames);
      console.log("Duration:", dotLottie.duration);

      dotLottie.addEventListener("complete", () => {
        console.log("Animation completed");
      });
    }
  });
</script>
```

The instance exposes all properties, methods, and events of the core player:

- **Properties** — `currentFrame`, `duration`, `totalFrames`, `isPlaying`, `isPaused`, `isStopped`, `isLoaded`, `loop`, `speed`, `mode`, `segment`, `manifest`, `activeAnimationId`, `activeThemeId`, and more. See [Properties](/en/runtimes/distributions/js/v0.x/api/reference#properties).
- **Methods** — `play()`, `pause()`, `stop()`, `setFrame()`, `setSpeed()`, `setLoop()`, `setMode()`, `setSegment()`, `setMarker()`, `freeze()`, `unfreeze()`, `tween()`, `load()`, `loadAnimation()`, `setTheme()`, `setLayout()`, slot methods, state machine methods, and more. See [Methods](/en/runtimes/distributions/js/v0.x/api/reference#methods).
- **Events** — `ready`, `load`, `loadError`, `play`, `pause`, `stop`, `loop`, `complete`, `frame`, `render`, `freeze`, `unfreeze`, `destroy`, `renderError`, plus all state machine events. See [Events](/en/runtimes/distributions/js/v0.x/api/reference#events).
- **Types** — `Layout`, `RenderConfig`, `StateMachineConfig`, `Transform`, `Marker`, slot value types, and event payload interfaces. See [Type definitions](/en/runtimes/distributions/js/v0.x/api/reference#type-definitions).

## Related

- [Attributes and properties](/en/runtimes/distributions/web-component/v0.x/attributes-reference) — HTML attributes and JS properties of `<dotlottie-wc>`.
- [Examples](/en/runtimes/distributions/web-component/v0.x/examples) — playback control and event handling recipes.
- [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference) — the complete core player API.
