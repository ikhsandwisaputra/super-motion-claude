---
source: https://docs.lottiefiles.com/en/runtimes/distributions/react/v0.x/props-reference.md
title: ""
fetched: 2026-10-28
---

# Props Reference
Complete reference for all props available on the DotLottieReact component, including render configuration, layout, and state machine options.

The `DotLottieReact` component extends the `HTMLCanvasElement` props and accepts all props that the `HTMLCanvasElement` accepts. In addition, it accepts the following props:

## Component Props

| Property                | Type                                  | Default               | Description                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoplay`              | boolean                               | false                 | Auto-starts the animation on load.                                                                                                                                                                                    |
| `loop`                  | boolean                               | false                 | Determines if the animation should loop.                                                                                                                                                                              |
| `src`                   | string                                | undefined             | URL to the animation data (`.json` or `.lottie`).                                                                                                                                                                     |
| `speed`                 | number                                | 1                     | Animation playback speed. 1 is regular speed.                                                                                                                                                                         |
| `data`                  | string \| ArrayBuffer                 | undefined             | Animation data provided either as a Lottie JSON string or as an ArrayBuffer for .lottie animations.                                                                                                                   |
| `mode`                  | string                                | "forward"             | Animation play mode. Accepts "forward", "reverse", "bounce", "reverse-bounce".                                                                                                                                        |
| `backgroundColor`       | string                                | undefined             | Background color of the canvas. Accepts 6-digit or 8-digit hex color string (e.g., "#000000", "#000000FF").                                                                                                           |
| `segment`               | \[number, number]                     | \[0, totalFrames - 1] | Animation segment. Accepts an array of two numbers, where the first number is the start frame and the second number is the end frame.                                                                                 |
| `renderConfig`          | RenderConfig                          | `{}`                  | Configuration for rendering the animation.                                                                                                                                                                            |
| `playOnHover`           | boolean                               | false                 | Determines if the animation should play on mouse hover and pause on mouse out.                                                                                                                                        |
| `dotLottieRefCallback`  | React.RefCallback\<DotLottie \| null> | undefined             | Callback function that receives a reference to the dotLottie web player instance.                                                                                                                                     |
| `useFrameInterpolation` | boolean                               | true                  | Determines if the animation should update on subframes. If set to false, the original AE frame rate will be maintained. If set to true, it will refresh at each requestAnimationFrame, including intermediate values. |
| `marker`                | string                                | undefined             | The Lottie named marker to play.                                                                                                                                                                                      |
| `animationId`           | string                                | undefined             | The ID of the animation to play from a multi-animation `.lottie` file.                                                                                                                                                |
| `themeId`               | string                                | undefined             | The ID of the theme to apply.                                                                                                                                                                                         |
| `themeData`             | string                                | undefined             | Theme data to apply as a string.                                                                                                                                                                                      |
| `layout`                | Layout                                | undefined             | Layout configuration for fitting the animation.                                                                                                                                                                       |
| `stateMachineId`        | string                                | undefined             | The ID of the state machine to load.                                                                                                                                                                                  |
| `stateMachineConfig`    | StateMachineConfig                    | undefined             | Configuration for state machine behavior.                                                                                                                                                                             |
| `loopCount`             | number                                | 0                     | Number of loops to play (0 for infinite).                                                                                                                                                                             |

## RenderConfig

The `renderConfig` object accepts the following properties:

| Property           | Type    | Default                       | Description                                                            |
| ------------------ | ------- | ----------------------------- | ---------------------------------------------------------------------- |
| `devicePixelRatio` | number  | window\.devicePixelRatio \| 1 | The device pixel ratio.                                                |
| `autoResize`       | boolean | true                          | Determines if the canvas should resize automatically to its container. |

## Layout

The `layout` object accepts the following properties:

| Property | Type                                                                    | Default     | Description                                  |
| -------- | ----------------------------------------------------------------------- | ----------- | -------------------------------------------- |
| `fit`    | 'contain' \| 'cover' \| 'fill' \| 'none' \| 'fit-width' \| 'fit-height' | 'contain'   | How to fit the animation in the canvas.      |
| `align`  | \[number, number]                                                       | \[0.5, 0.5] | Alignment within canvas \[x, y] from 0 to 1. |

## StateMachineConfig

The `stateMachineConfig` object accepts the following properties:

| Property                               | Type      | Description                                   |
| -------------------------------------- | --------- | --------------------------------------------- |
| `openUrlPolicy`                        | object    | URL opening policy configuration.             |
| `openUrlPolicy.requireUserInteraction` | boolean   | Require user interaction before opening URLs. |
| `openUrlPolicy.whitelist`              | string\[] | Allowed URL patterns.                         |

## GPU renderer props

The `DotLottieReact` component is also exported from the `@lottiefiles/dotlottie-react/webgl` and `@lottiefiles/dotlottie-react/webgpu` subpaths. Both accept every prop above. The WebGPU build adds one:

| Property | Type      | Default   | Description                                                                                                    |
| -------- | --------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| `device` | GPUDevice | undefined | An existing WebGPU device to render with. When omitted, the component requests one and destroys it on unmount. |

The `workerId` prop applies only to `DotLottieWorkerReact` from the package root — neither GPU subpath has a worker equivalent. See [Render on the GPU in React](/en/runtimes/distributions/react/v0.x/gpu-rendering).

## Related topics

- [Getting started](/en/runtimes/distributions/react/v0.x)
- [Examples](/en/runtimes/distributions/react/v0.x/examples)
- [Render on the GPU in React](/en/runtimes/distributions/react/v0.x/gpu-rendering)
- [API reference](/en/runtimes/distributions/react/v0.x/api-reference)
- [JS API reference](/en/runtimes/distributions/js/v0.x/api/reference)
