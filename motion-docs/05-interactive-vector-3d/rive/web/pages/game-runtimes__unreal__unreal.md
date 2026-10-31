---
source: https://rive.app/docs/game-runtimes/unreal/unreal
title: "Unreal Engine"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Unreal Engine

Rive’s Unreal runtime allows you to render and control Rive animations natively inside Unreal Engine. It integrates directly with Unreal’s object system and rendering pipeline and is designed for real-time use cases.

## Supported Unreal versions

* Unreal Engine 5.7.3 and above

## Supported platforms

* Microsoft DirectX 11
* Microsoft DirectX 12
* PC Vulkan
* macOS
* visionOS (experimental)
* PlayStation 5
* Nintendo Switch
* Nintendo Switch 2
* Xbox Series X
* Steam Deck - Proton D3D11

> [!WARNING]
>
> Mobile platform support is planned but not yet available.

## Rendering backends

Depending on platform and engine configuration, supported backends include:

* DirectX (Windows)
* Metal (macOS)

> [!NOTE]
>
> The Unreal runtime uses RHI for rendering backend integration.

Rendering is handled by Rive’s native renderer and coordinated with Unreal’s render thread.

## Feature support

| Feature | Supported |
| - | - |
| Animation playback | ✅ |
| State machines | ✅ |
| ViewModels (data binding) | ✅ |
| Property observation | ✅ |
| Text rendering | ✅ |
| Image assets | ✅ |
| Multiple Artboards per file | ✅ |
| Scripting | ✅ |
| Legacy state machine events | Deprecated |
| Legacy direct inputs | Deprecated |

> [!WARNING]
>
> Legacy state machine events and inputs are deprecated.\
> New integrations should use ViewModels for both input and output.

## Architecture overview

The Unreal runtime is built around three core runtime objects:

* **Rive File** — Unreal asset containing imported Rive data
* **Artboard** — Runtime instance responsible for evaluation and rendering
* **ViewModel** — Typed data boundary between Unreal and Rive logic

The typical data flow is:

Unreal → ViewModel → State Machine → ViewModel → Unreal

State machines consume and modify ViewModel properties. Unreal observes those changes.

## Support & community

If you need help:

* Join the Rive Community: [https://community.rive.app](https://community.rive.app)
