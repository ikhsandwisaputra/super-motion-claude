---
source: https://docs.lottiefiles.com/en/runtimes/distributions/web-component/v0.x/attributes-reference.md
title: ""
fetched: 2026-10-28
---

# Attributes and Properties
Reference for all HTML attributes and JavaScript properties of the dotlottie-wc element, including src, autoplay, loop, speed, and mode.

The `<dotlottie-wc>` element is configured through HTML attributes and JavaScript properties. Attributes cover declarative configuration; properties cover values that cannot be expressed as attribute strings and access to the core player instance.

## Attributes

Boolean attributes are enabled by adding the attribute without a value (e.g. `<dotlottie-wc src="..." autoplay loop>`).

| Attribute               | Type                                                     | Default     | Description                                                                                                                                                         |
| ----------------------- | -------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                   | `string`                                                 | `undefined` | **Required.** Source URL or path to the `.lottie` or `.json` animation file.                                                                                        |
| `autoplay`              | `boolean`                                                | `false`     | Plays the animation automatically when loaded.                                                                                                                      |
| `loop`                  | `boolean`                                                | `false`     | Loops the animation.                                                                                                                                                |
| `speed`                 | `number`                                                 | `1`         | Playback speed of the animation.                                                                                                                                    |
| `data`                  | `string \| ArrayBuffer`                                  | `undefined` | Animation data as a Lottie JSON string, or as an ArrayBuffer for `.lottie` animations. ArrayBuffer data must be set via the JavaScript property, not the attribute. |
| `segment`               | `string`                                                 | `undefined` | Animation segment as a stringified array of two numbers: start frame and end frame (e.g. `"[10, 50]"`).                                                             |
| `mode`                  | `"forward" \| "reverse" \| "bounce" \| "reverse-bounce"` | `"forward"` | Animation play mode.                                                                                                                                                |
| `backgroundColor`       | `string`                                                 | `undefined` | Background color of the canvas. Accepts a 6-digit or 8-digit hex color string (e.g. `"#000000FF"`).                                                                 |
| `themeId`               | `string`                                                 | `undefined` | ID of the dotLottie theme to initially use.                                                                                                                         |
| `animationId`           | `string`                                                 | `undefined` | ID of the animation to load from a multi-animation `.lottie` file.                                                                                                  |
| `marker`                | `string`                                                 | `undefined` | Named lottie marker to play.                                                                                                                                        |
| `useFrameInterpolation` | `boolean`                                                | `true`      | Determines whether the animation updates on subframes. `false` produces discrete frame-by-frame playback.                                                           |
| `loopCount`             | `number`                                                 | `0`         | Number of times the animation loops before stopping. `0` loops infinitely when `loop` is present.                                                                   |
| `stateMachineId`        | `string`                                                 | `undefined` | ID of the state machine to load on animation load.                                                                                                                  |

### Examples

```html
<dotlottie-wc src="https://example.com/animation.lottie" autoplay loop speed="2"></dotlottie-wc>
```

```html
<dotlottie-wc src="animation.lottie" mode="bounce" segment="[10, 50]" backgroundColor="#f0f0f0ff"></dotlottie-wc>
```

```html
<dotlottie-wc src="multi.lottie" animationId="scene-2" themeId="dark-mode"></dotlottie-wc>
```

## Properties

These properties are set or read via JavaScript on the element instance, not as HTML attributes.

| Property             | Type                    | Description                                                                                                                                                         |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dotLottie`          | `DotLottie` (read-only) | The underlying core `DotLottie` instance, exposing all core methods and event listeners for programmatic control. Available after the element's `load` event fires. |
| `renderConfig`       | `RenderConfig`          | Configuration for rendering the animation. See [Render configuration](/en/runtimes/distributions/js/v0.x/api/reference#render-configuration).                       |
| `layout`             | `Layout`                | Layout configuration with `fit` and `align` properties. See [Layout configuration](/en/runtimes/distributions/js/v0.x/api/reference#layout-configuration).          |
| `themeData`          | `string`                | Raw theme JSON string to apply directly, as an alternative to `themeId`.                                                                                            |
| `stateMachineConfig` | `StateMachineConfig`    | Security configuration for the state machine. See [StateMachineConfig](/en/runtimes/distributions/js/v0.x/api/reference#statemachineconfig).                        |
| `workerId`           | `string`                | Worker instance ID for the `<dotlottie-worker-wc>` variant. Elements sharing a `workerId` reuse one Web Worker.                                                     |

### Examples

Accessing the core instance:

```javascript
const playerElement = document.querySelector("dotlottie-wc");
playerElement.addEventListener("load", () => {
  const coreInstance = playerElement.dotLottie;
  if (coreInstance) {
    coreInstance.play();
  }
});
```

Setting `layout` and `renderConfig`:

```javascript
const player = document.querySelector("dotlottie-wc");
player.layout = { fit: "contain", align: [0.5, 0.5] };
player.renderConfig = { devicePixelRatio: 2 };
```

Setting `stateMachineConfig`:

```javascript
const player = document.querySelector("dotlottie-wc");
player.stateMachineConfig = {
  openUrlPolicy: { requireUserInteraction: true, whitelist: ["https://example.com"] },
};
```

## Related

- [Getting started](/en/runtimes/distributions/web-component/v0.x) — render your first animation with `<dotlottie-wc>`.
- [Examples](/en/runtimes/distributions/web-component/v0.x/examples) — playback control and event handling recipes.
- [API reference](/en/runtimes/distributions/web-component/v0.x/api-reference) — the worker element, `setWasmUrl`, and instance access.
- [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference) — the complete core player API.
