---
source: https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference.md
title: ""
fetched: 2026-10-28
---

# dotLottie Web Player API Reference
Complete reference for the dotLottie web player - constructor options, properties, methods, events, layout and render configuration, and types.

## Configuration

The `DotLottie` constructor accepts a configuration object with the following properties:

| Property                | Type                                              | Required | Default                | Description                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------- | -------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `canvas`                | HTMLCanvasElement                                 | ✔️       | `undefined`            | Canvas element for animation rendering                                                                                                                                       |
| `src`                   | string                                            |          | `undefined`            | URL to the animation data (`.json` or `.lottie`)                                                                                                                             |
| `data`                  | string \| ArrayBuffer \| Record\<string, unknown> |          | `undefined`            | Animation data as a Lottie JSON string, an ArrayBuffer for .lottie files, or a pre-parsed JSON object                                                                        |
| `autoplay`              | boolean                                           |          | `false`                | Auto-starts the animation on load                                                                                                                                            |
| `loop`                  | boolean                                           |          | `false`                | Determines if the animation should loop                                                                                                                                      |
| `loopCount`             | number                                            |          | `0`                    | Number of additional loop repetitions (0 = infinite when `loop` is true)                                                                                                     |
| `speed`                 | number                                            |          | `1`                    | Animation playback speed. 1 is regular speed                                                                                                                                 |
| `mode`                  | string                                            |          | `"forward"`            | Animation play mode. Accepts `"forward"`, `"reverse"`, `"bounce"`, `"reverse-bounce"`                                                                                        |
| `segment`               | \[number, number]                                 |          | `[0, totalFrames - 1]` | Animation segment. Accepts an array of two numbers: start frame and end frame                                                                                                |
| `marker`                | string                                            |          | `undefined`            | The lottie named marker to play                                                                                                                                              |
| `animationId`           | string                                            |          | `undefined`            | ID of the animation to load from a multi-animation dotLottie file                                                                                                            |
| `themeId`               | string                                            |          | `undefined`            | The ID of the dotLottie theme to initially use                                                                                                                               |
| `backgroundColor`       | string                                            |          | `undefined`            | Background color of the canvas. Accepts 6-digit or 8-digit hex color string (e.g., `"#000000"`, `"#000000FF"`)                                                               |
| `layout`                | Layout                                            |          | `undefined`            | The animation layout configuration                                                                                                                                           |
| `renderConfig`          | RenderConfig                                      |          | `{}`                   | Configuration for rendering the animation (see [Render Configuration](#render-configuration))                                                                                |
| `useFrameInterpolation` | boolean                                           |          | `true`                 | Determines if the animation should update on subframes. When `false`, the animation updates only on whole frames, which reduces rendering work.                              |
| `stateMachineId`        | string                                            |          | `undefined`            | ID of the state machine to load on animation load                                                                                                                            |
| `stateMachineConfig`    | StateMachineConfig                                |          | `undefined`            | Security configuration for the state machine (see [StateMachineConfig](#statemachineconfig))                                                                                 |
| `assetResolver`         | AssetResolver                                     |          | `undefined`            | A synchronous callback that supplies bytes for assets the animation references but does not embed (see [AssetResolver](#assetresolver)). Not supported by `DotLottieWorker`. |

## Properties

`DotLottie` instances expose the following read-only properties:

| Property                | Type                                                          | Description                                               |
| ----------------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| `currentFrame`          | number                                                        | The animation's currently displayed frame number          |
| `duration`              | number                                                        | The animation's total playback time in milliseconds       |
| `segmentDuration`       | number                                                        | Duration of the current segment in milliseconds           |
| `totalFrames`           | number                                                        | Total count of individual frames within the animation     |
| `loop`                  | boolean                                                       | Whether the animation is set to play in a continuous loop |
| `speed`                 | number                                                        | Playback speed factor (e.g., 2 means double speed)        |
| `loopCount`             | number                                                        | Number of times the animation has completed its loop      |
| `mode`                  | string                                                        | Current playback mode                                     |
| `isPaused`              | boolean                                                       | Whether the animation is paused                           |
| `isStopped`             | boolean                                                       | Whether the animation is stopped                          |
| `isPlaying`             | boolean                                                       | Whether the animation is playing                          |
| `isLoaded`              | boolean                                                       | Whether the animation is loaded                           |
| `isReady`               | boolean                                                       | Whether the WASM renderer module is initialized           |
| `isFrozen`              | boolean                                                       | Whether the animation loop is frozen                      |
| `isStateMachineRunning` | boolean                                                       | Whether a state machine is currently running              |
| `segment`               | \[number, number]                                             | Current frame range being played                          |
| `backgroundColor`       | string                                                        | Current background color of the canvas                    |
| `autoplay`              | boolean                                                       | Whether the animation is set to auto-play                 |
| `useFrameInterpolation` | boolean                                                       | Whether the animation updates on subframes                |
| `renderConfig`          | RenderConfig                                                  | Current rendering configuration                           |
| `manifest`              | Manifest \| null                                              | The manifest of the loaded dotLottie file                 |
| `marker`                | string \| undefined                                           | The current lottie named marker                           |
| `layout`                | Layout \| undefined                                           | The current animation layout configuration                |
| `activeThemeId`         | string                                                        | The ID of the currently active theme                      |
| `activeAnimationId`     | string                                                        | The ID of the currently active animation                  |
| `canvas`                | HTMLCanvasElement \| OffscreenCanvas \| RenderSurface \| null | The canvas element used for rendering                     |
| `buffer`                | Uint8Array \| null                                            | The raw pixel buffer for the current frame                |

## Methods

### Playback Control

| Method                                                     | Description                                                                                              |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `play()`                                                   | Begins playback from the current animation position                                                      |
| `pause()`                                                  | Pauses the animation without resetting its position                                                      |
| `stop()`                                                   | Halts playback and returns the animation to its initial frame                                            |
| `setSpeed(speed: number)`                                  | Sets the playback speed with the given multiplier                                                        |
| `setLoop(loop: boolean)`                                   | Configures whether the animation should loop continuously                                                |
| `setLoopCount(loopCount: number)`                          | Sets the number of loop repetitions                                                                      |
| `setFrame(frame: number)`                                  | Directly navigates the animation to a specified frame                                                    |
| `setMode(mode: string)`                                    | Sets the animation play mode (`"forward"`, `"reverse"`, `"bounce"`, `"reverse-bounce"`)                  |
| `setSegment(startFrame: number, endFrame: number)`         | Sets the start and end frame of the animation                                                            |
| `setMarker(marker: string)`                                | Sets the lottie named marker to play                                                                     |
| `freeze()`                                                 | Freezes the animation by stopping the animation loop                                                     |
| `unfreeze()`                                               | Unfreezes the animation by resuming the animation loop                                                   |
| `setUseFrameInterpolation(useFrameInterpolation: boolean)` | Sets whether the animation should update on subframes. When `false`, rendering work is reduced.          |
| `tween(frame: number, duration: number)`                   | Smoothly tweens the animation from the current frame to the specified frame over the given duration (ms) |
| `tweenToMarker(marker: string, duration: number)`          | Smoothly tweens the animation to the start of the named marker over the given duration (ms)              |
| `markers()`                                                | Returns all markers defined in the animation as an array of `Marker` objects                             |

### Animation Loading & Themes

| Method                               | Description                                                            |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `load(config: Config)`               | Loads a new configuration or animation                                 |
| `loadAnimation(animationId: string)` | Loads a specific animation from a multi-animation `.lottie` file by ID |
| `setTheme(themeId: string)`          | Loads a theme by ID from the `.lottie` file                            |
| `setThemeData(themeData: string)`    | Loads a theme from the provided theme data string                      |
| `resetTheme()`                       | Resets to the default theme                                            |

### Slot System (Dynamic Properties)

Slots allow runtime modification of animation properties such as colors, text, and gradients.

| Method                                                                              | Description                                                                                         |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `getSlotIds()`                                                                      | Returns an array of all available slot IDs                                                          |
| `getSlotType(slotId: string)`                                                       | Returns the type of the slot (`"color"`, `"scalar"`, `"vector"`, `"gradient"`, `"text"`, `"image"`) |
| `getSlot(slotId: string)`                                                           | Returns the current value of a slot                                                                 |
| `getSlots()`                                                                        | Returns all slot values as a record                                                                 |
| `setSlots(slots: Record<string, unknown>)`                                          | Sets multiple slot values at once                                                                   |
| `setColorSlot(slotId: string, value: ColorSlotValue)`                               | Sets a color slot value (static or animated)                                                        |
| `setScalarSlot(slotId: string, value: ScalarSlotValue)`                             | Sets a scalar (numeric) slot value                                                                  |
| `setVectorSlot(slotId: string, value: VectorSlotValue)`                             | Sets a vector slot value                                                                            |
| `setGradientSlot(slotId: string, value: GradientSlotValue, colorStopCount: number)` | Sets a gradient slot value                                                                          |
| `setTextSlot(slotId: string, value: TextSlotValue)`                                 | Sets a text slot value                                                                              |
| `resetSlot(slotId: string)`                                                         | Resets a slot to its default value                                                                  |
| `clearSlot(slotId: string)`                                                         | Clears a slot value                                                                                 |
| `resetSlots()`                                                                      | Resets all slots to their default values                                                            |
| `clearSlots()`                                                                      | Clears all slot values                                                                              |

Methods that modify state (`setTheme`, `resetTheme`, `setThemeData`, `setTransform`, `setViewport`, `tween`, `tweenToMarker`, `stateMachineLoad`, `stateMachineStart`, `stateMachineOverrideState`, and all slot setters like `setColorSlot`, `resetSlot`, `clearSlot`, etc.) return `boolean` — `true` on success, `false` on failure.

### Rendering & Layout

| Method                                                             | Description                                                       |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `setBackgroundColor(color: string)`                                | Sets the background color of the canvas                           |
| `setLayout(layout: Layout)`                                        | Sets the animation layout configuration                           |
| `setRenderConfig(renderConfig: RenderConfig)`                      | Sets the render configuration                                     |
| `setViewport(x: number, y: number, width: number, height: number)` | Sets a custom viewport within the canvas                          |
| `setTransform(transform: Transform)`                               | Applies a 3×3 affine transformation matrix to the animation       |
| `getTransform()`                                                   | Returns the current transformation matrix                         |
| `setCanvas(canvas: HTMLCanvasElement \| OffscreenCanvas)`          | Reassigns the player to a different canvas element                |
| `resize()`                                                         | Adjusts the canvas size to match its bounding box dimensions      |
| `animationSize()`                                                  | Returns the intrinsic `{ width, height }` of the animation        |
| `getLayerBoundingBox(layerName: string)`                           | Returns the bounding box `[x, y, width, height]` of a named layer |

### State Machine

See the [State Machines guide](/en/runtimes/distributions/js/v0.x/state-machines) for full documentation. Quick reference:

| Method                                                         | Description                                        |
| -------------------------------------------------------------- | -------------------------------------------------- |
| `stateMachineLoad(stateMachineId: string)`                     | Loads a state machine by ID                        |
| `stateMachineLoadData(stateMachineData: string)`               | Loads a state machine from a JSON string           |
| `stateMachineSetConfig(config: StateMachineConfig \| null)`    | Configures security settings for the state machine |
| `stateMachineStart()`                                          | Starts the loaded state machine                    |
| `stateMachineStop()`                                           | Stops the state machine                            |
| `stateMachineGetStatus()`                                      | Returns the state machine status string            |
| `stateMachineGetCurrentState()`                                | Returns the name of the active state               |
| `stateMachineGetActiveId()`                                    | Returns the ID of the active state machine         |
| `stateMachineGet(stateMachineId: string)`                      | Returns the state machine definition JSON          |
| `stateMachineGetListeners()`                                   | Returns names of all active listeners              |
| `stateMachineOverrideState(state: string, immediate: boolean)` | Overrides the current state                        |
| `stateMachineFireEvent(name: string)`                          | Fires a named custom event                         |
| `stateMachinePostClickEvent(x: number, y: number)`             | Posts a click event at canvas coordinates          |
| `stateMachinePostPointerUpEvent(x: number, y: number)`         | Posts a pointer-up event at canvas coordinates     |
| `stateMachinePostPointerDownEvent(x: number, y: number)`       | Posts a pointer-down event at canvas coordinates   |
| `stateMachinePostPointerMoveEvent(x: number, y: number)`       | Posts a pointer-move event at canvas coordinates   |
| `stateMachinePostPointerEnterEvent(x: number, y: number)`      | Posts a pointer-enter event at canvas coordinates  |
| `stateMachinePostPointerExitEvent(x: number, y: number)`       | Posts a pointer-exit event at canvas coordinates   |
| `stateMachineSetBooleanInput(name: string, value: boolean)`    | Sets a boolean input                               |
| `stateMachineSetNumericInput(name: string, value: number)`     | Sets a numeric input                               |
| `stateMachineSetStringInput(name: string, value: string)`      | Sets a string input                                |
| `stateMachineGetBooleanInput(name: string)`                    | Gets a boolean input value                         |
| `stateMachineGetNumericInput(name: string)`                    | Gets a numeric input value                         |
| `stateMachineGetStringInput(name: string)`                     | Gets a string input value                          |
| `stateMachineGetInputs()`                                      | Returns the names of all defined inputs            |

### Event Listeners

| Method                                                    | Description                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| `addEventListener(event: string, listener: Function)`     | Registers a function to respond to a specific animation event |
| `removeEventListener(event: string, listener?: Function)` | Removes a previously registered event listener                |

### Lifecycle

| Method      | Description                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `destroy()` | Destroys the renderer instance and unregisters all event listeners. Instances that are not destroyed retain their allocated resources. |

### Static Methods

| Method                                                                                      | Description                                                                                                                                     |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `DotLottie.setWasmUrl(url: string)`                                                         | Sets the URL to the renderer WASM binary. See notes below.                                                                                      |
| `DotLottie.preload()`                                                                       | Starts fetching and compiling the WASM module before any player is constructed. Returns a `Promise<void>` that resolves when the WASM is ready. |
| `DotLottie.registerFont(fontName: string, fontSource: string \| ArrayBuffer \| Uint8Array)` | Registers a custom font for use in text slots                                                                                                   |
| `DotLottie.transformThemeToLottieSlots(theme: string, slots: string)`                       | Utility to transform theme data to Lottie slot format                                                                                           |

`DotLottie.preload()` starts the WASM download (\~500 KB compressed) before any player is constructed. A player constructed afterwards uses the in-progress download instead of starting its own:

```javascript
import { DotLottie } from "@lottiefiles/dotlottie-web";

// At app or route load, before any player is constructed:
DotLottie.preload();
```

When a custom WASM binary is used, `setWasmUrl()` must be called before `preload()`:

```javascript
DotLottie.setWasmUrl("/assets/dotlottie-player.wasm");
DotLottie.preload();
```

#### `setWasmUrl()` behavior

Calling `setWasmUrl()` has two effects beyond pointing the loader at a new URL:

- **Disables the CDN fallback.** By default the player tries jsdelivr, then falls back to unpkg if that fails. Once you call `setWasmUrl()`, the fallback is disabled: if your URL fails to load, the error surfaces immediately as a `loadError` event instead of silently retrying from a CDN.
- **Throws `TypeError` for invalid input.** Passing a non-string or an empty string throws `TypeError: setWasmUrl() expects a non-empty URL string` synchronously.

A load that is already in flight when `setWasmUrl()` is called keeps the URLs it started with. Only loads that begin after the call use the new URL.

#### `DotLottieWorker` static methods

`DotLottieWorker` exposes the following static methods in addition to the instance API:

| Method                                      | Description                                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `DotLottieWorker.setWasmUrl(url: string)`   | Sets the URL to the renderer WASM binary for worker instances. See notes below.                       |
| `DotLottieWorker.setWorkerUrl(url: string)` | Points the library at a self-hosted worker script, avoiding the default `blob:` URL. See notes below. |

##### `DotLottieWorker.setWasmUrl()`

`DotLottieWorker.setWasmUrl()` differs from `DotLottie.setWasmUrl()` in two ways:

- **Relative URLs are resolved against the page.** Because workers run from a `blob:` URL, relative paths would otherwise fail to resolve. Passing `"/assets/player.wasm"` is therefore safe.
- **Broadcasts to already-running workers.** Calling this method sends the new URL to any workers that exist but haven't yet started loading the WASM, so you don't need to call it before constructing every worker.

As with `DotLottie.setWasmUrl()`, calling it disables the CDN fallback and throws `TypeError` for invalid input. Call it before constructing any `DotLottieWorker` instance for the most predictable behavior.

```javascript
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

// Resolved against the page URL, broadcast to any running workers:
DotLottieWorker.setWasmUrl("/assets/dotlottie-player.wasm");
```

##### `DotLottieWorker.setWorkerUrl()`

By default, `DotLottieWorker` starts its worker from a `blob:` URL, which requires `worker-src: blob:` in your Content-Security-Policy. If your CSP forbids `blob:` workers, self-host the worker script and call `setWorkerUrl()` to point the library at it:

```javascript
import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

// Call before constructing any DotLottieWorker instance:
DotLottieWorker.setWorkerUrl("/js/dotlottie/dotlottie.worker.js");
DotLottieWorker.setWasmUrl("/js/dotlottie/dotlottie-player.wasm");
```

The worker script is shipped as `@lottiefiles/dotlottie-web/dotlottie.worker.js` in the installed package. Copy it to your server and serve it from the same origin as your page.

Key constraints and behaviors:

- **Call before creating any instance.** Workers already running when `setWorkerUrl()` is called are unaffected — only workers created after the call use the new URL.
- **Same-origin only.** Browsers refuse to load cross-origin workers regardless of CSP. The worker script must be served from the same origin as your page.
- **Pair with `setWasmUrl()`.** A URL-hosted worker inherits the page's CSP. Unless your `connect-src` directive allows the jsdelivr/unpkg CDNs, also call `setWasmUrl()` to point the WASM loader at a self-hosted binary.
- **Keep files in sync.** Copy both `dotlottie.worker.js` and `dotlottie-player.wasm` from the installed package on every upgrade so the worker and runtime versions always match.
- **Throws `TypeError` for invalid input.** Passing a non-string or an empty string throws `TypeError: setWorkerUrl() expects a non-empty URL string` synchronously.
- **Relative URLs are accepted.** Relative paths are valid — the browser resolves them against the page origin when `new Worker(url)` is called.

## GPU-Accelerated Rendering

The WebGL2 and WebGPU backends live on package subpaths, and each one exports its player class as `DotLottie`. Alias it on import to name the backend and to avoid a collision when a file uses more than one. For guidance on choosing a backend, detecting support, and falling back, see [Render on the GPU with WebGL or WebGPU](/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering).

Both classes narrow the constructor config: `canvas` is required and must be an `HTMLCanvasElement`, so `OffscreenCanvas` and `RenderSurface` are not accepted. Neither backend has a Web Worker equivalent — `DotLottieWorker` is exported only from the package root and always renders on the CPU.

### WebGL renderer

Import from `@lottiefiles/dotlottie-web/webgl` for WebGL2-accelerated rendering, configured with a `WebGLConfig`:

```typescript
import { DotLottie as DotLottieWebGL } from "@lottiefiles/dotlottie-web/webgl";

const animation = new DotLottieWebGL({
  canvas: document.getElementById("my-canvas") as HTMLCanvasElement,
  src: "animation.lottie",
  autoplay: true,
});
```

| Static Method                            | Description                                                                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `DotLottieWebGL.setWasmUrl(url: string)` | Sets the URL to the WebGL renderer WASM binary                                                                                            |
| `DotLottieWebGL.preload()`               | Starts fetching and compiling the WebGL WASM module before any player is constructed. Returns a `Promise<void>` that resolves when ready. |

Both static methods apply only to the WebGL backend's own WASM loader; calling them on `DotLottie` has no effect here. The browser must support [WebGL2](https://caniuse.com/webgl2). All instance methods, properties, and events from `DotLottie` are available.

### WebGPU renderer

Import from `@lottiefiles/dotlottie-web/webgpu` for WebGPU-accelerated rendering, configured with a `WebGPUConfig`:

```typescript
import { DotLottie as DotLottieWebGPU } from "@lottiefiles/dotlottie-web/webgpu";

const animation = new DotLottieWebGPU({
  canvas: document.getElementById("my-canvas") as HTMLCanvasElement,
  src: "animation.lottie",
  autoplay: true,
  device: gpuDevice, // optional: pass your own GPUDevice
});
```

The `WebGPUConfig` extends the standard `Config` with:

| Property | Type        | Required | Default     | Description                                                            |
| -------- | ----------- | -------- | ----------- | ---------------------------------------------------------------------- |
| `device` | `GPUDevice` | No       | `undefined` | An existing WebGPU device. If omitted, one is requested automatically. |

The instance also exposes the device it renders with:

| Property | Type                | Description                                                                             |
| -------- | ------------------- | --------------------------------------------------------------------------------------- |
| `device` | `GPUDevice \| null` | The active WebGPU device. `null` before initialization completes and after `destroy()`. |

| Static Method                             | Description                                                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `DotLottieWebGPU.setWasmUrl(url: string)` | Sets the URL to the WebGPU renderer WASM binary                                                                                            |
| `DotLottieWebGPU.preload()`               | Starts fetching and compiling the WebGPU WASM module before any player is constructed. Returns a `Promise<void>` that resolves when ready. |

When you omit `device`, the player requests an adapter and device during initialization and destroys that device in `destroy()`. A device you supply is left untouched.

:::warning
WebGPU is an emerging API with limited [browser support](https://caniuse.com/webgpu). Initialization failures on either GPU backend — a missing `navigator.gpu` or no available adapter for WebGPU, no WebGL2 context for WebGL — do not throw from the constructor; they surface as a `loadError` event.
:::

## MP4 Video Asset Support

:::warning
MP4 video asset support is experimental. The feature is available in v0.80.0 and later, but the behavior and API may change in future releases.
:::

As of v0.80.0, the player has experimental support for MP4 video assets embedded in `.lottie` files. When a dotLottie file contains MP4 video content, the player will attempt to decode and render it alongside vector animation layers. No additional configuration is required — the feature is enabled automatically when the runtime detects video assets in the file.

## Events

The following events can be listened to via `addEventListener`:

### Animation Events

| Event         | Description                  | Event Parameter                            |
| ------------- | ---------------------------- | ------------------------------------------ |
| `ready`       | WASM renderer is initialized | `{ type: 'ready' }`                        |
| `load`        | Animation is loaded          | `{ type: 'load' }`                         |
| `loadError`   | Error loading animation      | `{ type: 'loadError', error: Error }`      |
| `play`        | Animation starts playing     | `{ type: 'play' }`                         |
| `pause`       | Animation is paused          | `{ type: 'pause' }`                        |
| `stop`        | Animation is stopped         | `{ type: 'stop' }`                         |
| `loop`        | Animation completes a loop   | `{ type: 'loop', loopCount: number }`      |
| `complete`    | Animation completes          | `{ type: 'complete' }`                     |
| `frame`       | Animation reaches new frame  | `{ type: 'frame', currentFrame: number }`  |
| `render`      | New frame is rendered        | `{ type: 'render', currentFrame: number }` |
| `freeze`      | Animation is frozen          | `{ type: 'freeze' }`                       |
| `unfreeze`    | Animation is unfrozen        | `{ type: 'unfreeze' }`                     |
| `destroy`     | Animation is destroyed       | `{ type: 'destroy' }`                      |
| `renderError` | Rendering error occurred     | `{ type: 'renderError', error: Error }`    |

### State Machine Events

| Event                                 | Description                           | Event Parameter                                                          |
| ------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| `stateMachineStart`                   | State machine started                 | `{ type: 'stateMachineStart' }`                                          |
| `stateMachineStop`                    | State machine stopped                 | `{ type: 'stateMachineStop' }`                                           |
| `stateMachineTransition`              | State transition occurred             | `{ type: 'stateMachineTransition', fromState: string, toState: string }` |
| `stateMachineStateEntered`            | Entered a new state                   | `{ type: 'stateMachineStateEntered', state: string }`                    |
| `stateMachineStateExit`               | Exited a state                        | `{ type: 'stateMachineStateExit', state: string }`                       |
| `stateMachineCustomEvent`             | Custom event emitted by state machine | `{ type: 'stateMachineCustomEvent', eventName: string }`                 |
| `stateMachineError`                   | State machine error                   | `{ type: 'stateMachineError', error: string }`                           |
| `stateMachineBooleanInputValueChange` | Boolean input value changed           | `{ type, inputName: string, oldValue: boolean, newValue: boolean }`      |
| `stateMachineNumericInputValueChange` | Numeric input value changed           | `{ type, inputName: string, oldValue: number, newValue: number }`        |
| `stateMachineStringInputValueChange`  | String input value changed            | `{ type, inputName: string, oldValue: string, newValue: string }`        |
| `stateMachineInputFired`              | An input fired                        | `{ type: 'stateMachineInputFired', inputName: string }`                  |
| `stateMachineInternalMessage`         | Internal state machine message        | `{ type: 'stateMachineInternalMessage', message: string }`               |

## Layout Configuration

The `layout` object accepts the following properties:

| Property | Type              | Required | Default      | Description                                                                                                      |
| -------- | ----------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `fit`    | string            |          | `"contain"`  | The fit mode of the animation. Accepts `"contain"`, `"cover"`, `"fill"`, `"fit-width"`, `"fit-height"`, `"none"` |
| `align`  | \[number, number] |          | `[0.5, 0.5]` | The alignment of the animation in the canvas. `[0, 0]` is top-left and `[1, 1]` is bottom-right                  |

## Render Configuration

The `renderConfig` object allows customization of rendering settings:

| Property            | Type    | Required | Default                                               | Description                                                                                                                                                                                                                                        |
| ------------------- | ------- | -------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `devicePixelRatio`  | number  | No       | `window.devicePixelRatio * 0.75` if DPI > 1, else `1` | Controls the pixel ratio for rendering                                                                                                                                                                                                             |
| `freezeOnOffscreen` | boolean | No       | `true`                                                | Freezes animation when offscreen to conserve resources (improves performance when many animations are present but not visible)                                                                                                                     |
| `autoResize`        | boolean | No       | `false`                                               | Automatically adjusts animation size when canvas element is resized                                                                                                                                                                                |
| `quality`           | number  | No       | `undefined`                                           | Rendering quality level (0–100). Controls the resolution scale of the internal render surface. A value of 100 renders at full resolution. Lower values reduce the resolution proportionally, improving performance at the cost of visual fidelity. |

## StateMachineConfig

The `stateMachineConfig` object controls security settings for state machine execution:

| Property                               | Type      | Description                                                                 |
| -------------------------------------- | --------- | --------------------------------------------------------------------------- |
| `openUrlPolicy`                        | object    | Controls URL-opening behavior triggered by state machines                   |
| `openUrlPolicy.requireUserInteraction` | boolean   | When `true`, URLs can only be opened in response to direct user interaction |
| `openUrlPolicy.whitelist`              | string\[] | List of allowed URL prefixes that the state machine may open                |

## Type Definitions

### AssetResolver

`AssetResolver` is a synchronous callback used to supply bytes for assets that an animation references but does not embed — for example, images stored outside the `.lottie` container.

```typescript
type AssetResolver = (src: string) => ArrayBuffer | Uint8Array | null | undefined;
```

| Parameter | Type     | Description                                                               |
| --------- | -------- | ------------------------------------------------------------------------- |
| `src`     | `string` | The asset path as referenced by the animation, e.g. `"/images/img_0.png"` |

The resolver is called **synchronously** while the animation loads, so the asset bytes must already be available in memory. Return `null` or `undefined` to leave an asset unresolved — unresolved images render as a gray placeholder.

```typescript
import { DotLottie } from "@lottiefiles/dotlottie-web";

// Pre-load your assets into a Map (or any lookup you choose)
const assets = new Map<string, Uint8Array>();
assets.set("/images/logo.png", await fetchAsBytes("/images/logo.png"));

const dotLottie = new DotLottie({
  canvas: document.querySelector("#canvas") as HTMLCanvasElement,
  src: "animation.json",
  autoplay: true,
  assetResolver: (src) => assets.get(src) ?? null,
});
```

:::warning
`assetResolver` is **not supported** by `DotLottieWorker`. Functions cannot be transferred across the worker boundary — if you pass `assetResolver` to `DotLottieWorker`, it will be silently dropped and a console warning will be logged. Use `DotLottie` instead when your animation references external assets.
:::

If you call `load()` to reload the animation with a new configuration, pass `assetResolver` again in the new config — `load()` replaces the full configuration.

### Slot Types

| Type                | Definition                                                           | Description                                  |
| ------------------- | -------------------------------------------------------------------- | -------------------------------------------- |
| `ColorSlotValue`    | `Color \| Array<Keyframe<Color>>`                                    | Static or animated color                     |
| `ScalarSlotValue`   | `number \| Array<Keyframe<number>>`                                  | Static or animated scalar (number)           |
| `VectorSlotValue`   | `Vector \| Array<Keyframe<Vector>>`                                  | Static or animated vector `[x, y]`           |
| `GradientSlotValue` | `Gradient \| Array<Keyframe<Gradient>>`                              | Static or animated gradient with color stops |
| `TextSlotValue`     | `TextDocument`                                                       | Static text with optional font, size, color  |
| `SlotType`          | `"color" \| "gradient" \| "image" \| "text" \| "scalar" \| "vector"` | Possible slot types                          |

### Transform

A `Transform` is a 9-element array `[a, b, c, d, e, f, g, h, i]` representing a 3×3 affine transformation matrix applied to the entire animation on the canvas.

### Marker

```typescript
interface Marker {
  name: string;
  time: number;
  duration: number;
}
```

### Data

The `Data` type represents animation data that can be passed to the `data` configuration option:

```typescript
type Data = string | ArrayBuffer | Record<string, unknown>;
```

- `string` — A Lottie JSON string
- `ArrayBuffer` — A `.lottie` file binary
- `Record<string, unknown>` — A pre-parsed Lottie JSON object

## Manifest Object

The `manifest` property returns the parsed `manifest.json` object from the loaded `.lottie` file (or `null` if a `.json` file was loaded or loading failed). This object contains metadata about the animation(s), themes, and state machines within the dotLottie file.

Key properties:

- `manifest.animations`: An array of objects, each describing an animation within the file (containing `id`, `loop`, `speed`, etc.).
- `manifest.themes`: An array describing available themes.
- `manifest.stateMachines`: An array describing available state machines.
- `manifest.version`: The dotLottie format version string.
- `manifest.generator`: The tool that generated the file.

The [dotLottie Format Structure](/format/dotlottie/structure) documentation describes the manifest structure and all its properties.

## Related

- [Render your first animation](/en/runtimes/distributions/js/v0.x/getting-started/basic-usage) — tutorial
- [Load animations](/en/runtimes/distributions/js/v0.x/core-concepts/loading-animations), [Control playback](/en/runtimes/distributions/js/v0.x/core-concepts/playback-control), and the other how-to guides
- [How the web player works](/en/runtimes/distributions/js/v0.x/core-concepts) — the rendering model behind this API
