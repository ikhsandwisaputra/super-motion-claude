---
source: https://rive.app/docs/runtimes/choose-a-renderer/overview
title: "Choosing a Renderer"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Choosing a Renderer

Choose and configure the renderer used by Rive runtimes.

Rive runtimes can render through the [Rive Renderer](https://rive.app/renderer?utm_source=docs\&utm_medium=content) or, in some runtimes, a platform-specific renderer such as Canvas2D, Skia, or Impeller.

The Rive Renderer is designed to provide better performance and visual fidelity across all platforms. It leverages modern graphics APIs and techniques to deliver high-quality rendering for Rive graphics.

> [!NOTE]
>
> Some Rive features, including Vector Feathering, require the Rive Renderer.
>
> See [Feature
> Support](/docs/feature-support) for more information.

## Renderer defaults

| Runtime | Default Renderer | Options |
| - | - | - |
| [Web (JS)](#web-js) | Depends on package | Rive / Canvas2D |
| [Web (React)](#web-react) | Depends on package | Rive / Canvas2D |
| [Apple](#apple) | Rive | Rive |
| Android (Compose) | Rive | Rive |
| [Android (Legacy)](#android-legacy) | Rive | Rive / Canvas / Skia (removed as of v10.0.0) |
| [React Native](#react-native) | Rive | Rive |
| [Flutter](#flutter) | No default | Rive / Flutter Skia / Flutter Impeller |

## Runtime setup

Only some runtimes require you to choose or configure a renderer. The sections below cover runtimes that expose renderer setup through packages, initialization options, or factory settings.

If a runtime is not listed here, there is no renderer setup to configure. It uses the renderer supported by that runtime automatically.

**Web (JS)**

The Web runtime provides multiple packages with the same core API. Choose the package based on the renderer you want to use.

| Package | Renderer | Use when |
| - | - | - |
| `@rive-app/webgl2` | Rive | You want the best support for Rive Renderer features (including GPU Canvas) and rendering fidelity. |
| `@rive-app/canvas` | Canvas2D | You have several Rive instances on screen, want a slightly smaller package, or do not need Rive Renderer-only features. |
| `@rive-app/canvas-lite` | Canvas2D | You want the smallest Canvas2D package and do not need the full Canvas2D runtime feature set. |

**Web (React)**

The Web runtime provides multiple packages with the same core API. Choose the package based on the renderer you want to use.

| Package | Renderer | Use when |
| - | - | - |
| `@rive-app/react-webgl2` | Rive Renderer | You want the best support for Rive Renderer features (including GPU Canvas) and rendering fidelity. |
| `@rive-app/react-canvas` | Canvas2D | You have several Rive instances on screen, want a slightly smaller package, or do not need Rive Renderer-only features. |
| `@rive-app/react-canvas-lite` | Canvas2D | You want the smallest Canvas2D package and do not need the full Canvas2D runtime feature set. |

> [!NOTE]
>
> These packages provide the Rive React component and hooks. If you want to use the imperative JavaScript runtime in a React app, install one of the Web JavaScript packages instead, such as `@rive-app/webgl2`, `@rive-app/canvas`, or `@rive-app/canvas-lite`.

**Apple**

The Apple runtime uses the Rive Renderer. In the Swift Concurrency API, you can opt a worker into [GPU Canvas](/docs/runtimes/apple/gpu-canvas) when it is created:

```swift theme={null}
let worker = try await Worker(
    configuration: .init(enableGPUCanvas: true)
)
```

GPU Canvas is required for 3D content. The setting applies to every `File` loaded by that worker and every `Rive` object created from those files. It cannot be changed during the worker's lifetime.

**Android (Legacy)**

Options: `Canvas / Skia (removed in v10.0.0)`

Specify the renderer target in XML:

```kotlin theme={null}
<app.rive.runtime.kotlin.RiveAnimationView
app:riveRenderer="Rive"
… />
```

Alternatively, when initializing Rive:

```kotlin theme={null}
Rive.init(applicationContext, defaultRenderer = RendererType.Rive)
```

**React Native**

`@rive-app/react-native` uses the Rive Renderer. In `0.5.3` and later, you can opt into [GPU Canvas](/docs/runtimes/react-native/gpu-canvas), which is required for 3D content:

```ts theme={null}
import { RiveRuntime } from '@rive-app/react-native';

RiveRuntime.setGPUCanvasEnabled(true);
```

On Android, the Rive Renderer uses OpenGL by default. In `0.5.0` and later, you can opt into Vulkan:

```ts theme={null}
RiveRuntime.setAndroidRenderBackend('vulkan');
```

Vulkan requires Android 10 (API 29) or later. The runtime falls back to OpenGL when Vulkan is unavailable or fails to initialize. The call has no effect on iOS.

Both settings apply to every Rive file in the app and must be made before the first Rive file is loaded. Calls made after that are ignored and log a warning.

**Flutter**

The Rive Renderer is available in the Flutter runtime as of `0.14.0`. Use the latest version (**0.14.11**) of the `rive` package for the newest fixes and improvements.

The Rive Renderer is exposed through `rive_native`, which is included as a dependency of the `rive` package. See [Rive Native](/docs/runtimes/flutter/rive-native) for more information.

When creating a Rive `File` or `FileLoader`, you need to specify a factory to use:

* `Factory.rive` for the Rive renderer
* `Factory.flutter` for the Flutter renderer (Skia or Impeller)

```dart theme={null}
    // Rive renderer
    File.asset("assets/vehicles.riv", riveFactory: Factory.rive)
    // Flutter renderer
    File.asset("assets/vehicles.riv", riveFactory: Factory.flutter)
```

You can use different renderers for different graphics in your app.

Some considerations when choosing a renderer:

* If you plan on showing many Rive graphics that are all drawing to different Rive widgets consider using a [RivePanel](/docs/runtimes/flutter/flutter#rivepanel) with `Factory.rive` to draw multiple graphics to the same texture to reduce the overhead of allocating native render targets and textures. Or make use of `Factory.flutter`.
* If you are showing a complex graphic, consider using `Factory.rive` to take advantage of the Rive renderer's optimizations.
* Vector Feathering is only available with `Factory.rive`, so if you need that feature, use the Rive renderer.
