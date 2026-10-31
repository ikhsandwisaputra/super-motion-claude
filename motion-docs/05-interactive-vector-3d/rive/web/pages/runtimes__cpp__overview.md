---
source: https://rive.app/docs/runtimes/cpp/overview
title: "C++ Runtime"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# C++ Runtime

Load, advance, and render Rive content from C++.

The Rive C++ runtime (`rive-cpp`) is the lowest-level Rive runtime. It loads
`.riv` files, advances state machines and animations, and draws into any
`Renderer` — the
[Rive renderer](/docs/runtimes/cpp/renderers) (Metal, Vulkan, D3D11, D3D12,
OpenGL/WebGL) or [your own implementation](/docs/runtimes/cpp/external-renderer).

Higher level Rive runtimes (Apple, Android, Flutter, Unity, Unreal) wrap this
library.

Use the C++ runtime when you are:

* Embedding Rive in a C++ application or game engine.
* Targeting a platform that doesn't have a Rive runtime yet.
* Plugging Rive into your own renderer or render graph.

> **[Getting Started](/docs/runtimes/cpp/getting-started)**
>
> Build the runtime and put a `.riv` file on screen in under 100 lines of code.

> **[Renderers](/docs/runtimes/cpp/renderers)**
>
> Set up the GPU backend for your platform — D3D11, D3D12, Metal, Vulkan, or GL.

> **[File & Artboard](/docs/runtimes/cpp/file-and-artboard)**
>
> Import `.riv` files, query artboards, and create `ArtboardInstance`s.

> **[State Machines](/docs/runtimes/cpp/state-machines)**
>
> Advance scenes, forward pointer events, and react to state changes.

> **[Data Binding](/docs/runtimes/cpp/data-binding)**
>
> Drive a Rive `ViewModel` from your application state.

> **[Asset Loading](/docs/runtimes/cpp/asset-loading)**
>
> Resolve out-of-band images, fonts, and audio with `FileAssetLoader`.

> **[Rendering Loop](/docs/runtimes/cpp/rendering-loop)**
>
> `beginFrame` / `flush` — what runs each frame and what it costs.

> **[External Renderer](/docs/runtimes/cpp/external-renderer)**
>
> Implement `Renderer` and `Factory` to use your own GPU backend.

## Architecture at a glance

![Rive runtime rendering pipeline: your application owns a File (.riv data) and a RenderContext (D3D/Metal/Vulkan/...); File produces an ArtboardInstance, which produces a StateMachineInstance, which feeds the RiveRenderer along with the RenderContext to produce pixels.](https://mintcdn.com/rive/-zQ3UMgRdEXnI1Fd/images/runtimes/cpp/rive_pipeline.png?fit=max\&auto=format\&n=-zQ3UMgRdEXnI1Fd\&q=85\&s=1bd9c8814b030bf4650244d6871b1d97)

**`File` / `Artboard` / `StateMachineInstance` know nothing about the GPU**,
and `Renderer` / `RenderContext` know nothing about Rive content. Either
half works on its own — render Rive content through your own `Renderer`
implementation, or drive `RiveRenderer` with non-Rive draw commands.

## Supported platforms & APIs

| Backend | Headers | Class |
| - | - | - |
| D3D11 | `rive/renderer/d3d11/render_context_d3d_impl.hpp` | `RenderContextD3DImpl` |
| D3D12 | `rive/renderer/d3d12/render_context_d3d12_impl.hpp` | `RenderContextD3D12Impl` |
| Metal | `rive/renderer/metal/render_context_metal_impl.h` | `RenderContextMetalImpl` |
| Vulkan | `rive/renderer/vulkan/render_context_vulkan_impl.hpp` | `RenderContextVulkanImpl` |
| OpenGL / WebGL | `rive/renderer/gl/render_context_gl_impl.hpp` | `RenderContextGLImpl` |

> [!NOTE]
>
> The C++ runtime is also the foundation for Rive's [iOS/macOS](/docs/runtimes/apple),
> [Android](/docs/runtimes/android), and [Flutter](/docs/runtimes/flutter) runtimes — those
> platforms ship a thin wrapper, not a separate engine.

## Source & license

* GitHub: [rive-app/rive-runtime](https://github.com/rive-app/rive-runtime)
* License: MIT
* Build system: [premake5](https://premake.github.io/)
