---
source: https://rive.app/docs/runtimes/apple/semantics
title: "Semantics"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Semantics

Make your Rive views accessible to VoiceOver by enabling semantics in the Apple runtime.

This page covers enabling [semantics](/docs/editor/accessibility/semantics) in the New Runtime so your Rive views are accessible to VoiceOver. To learn what semantics are and how to add them to a graphic, see the [Semantics](/docs/editor/accessibility/semantics) editor documentation.

## Overview

In the Rive Editor, you can add semantic meaning to certain elements of your graphic-roles such as button, checkbox, tab, image, list, dialog, and more. Alongside these roles, you can add associated labels, values, states, and actions. These settings vary per role.

At runtime, the New Runtime reads those semantics from the running state machine and exposes them to [VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios) as the view's `accessibilityElements`, keeping them up to date as the state machine advances.

> [!WARNING]
>
> Semantics are **opt‑in**. The default mode is `.off`, so no accessibility elements are created until you enable semantics on the view.

> [!NOTE]
>
> Semantics must be defined in the editor to have any effect. If an element has no semantics, it is not exposed to screen readers, regardless of the mode you set. See [Feature Support](/docs/feature-support) for which runtimes currently support semantics.

## Availability

Semantics are available in the New Runtime only (not the Legacy Runtime), on every Apple platform the runtime supports except macOS (AppKit):

| Platform | Supported |
| - | - |
| iOS / iPadOS | ✅ |
| tvOS | ✅ |
| visionOS | ✅ |
| Mac Catalyst | ✅ |
| macOS (AppKit) | ❌ |

## Semantics modes

Semantics are controlled by the `Semantics` enum, which sets the VoiceOver integration mode for a Rive view:

| Mode | Description |
| - | - |
| `.off` | **Default.** Accessibility semantics are disabled. No accessibility elements are created, regardless of VoiceOver state. |
| `.on` | Accessibility semantics are always active. Elements are created and kept up‑to‑date on every frame. |
| `.automatic` | Accessibility semantics activate and deactivate automatically based on whether VoiceOver is currently running. |

For most apps, prefer `.automatic` — it keeps the accessibility tree in sync only while VoiceOver is active, avoiding unnecessary work when it isn't.

## Usage

Set the semantics mode on the view (UIKit) or with the `.semantics(_:)` modifier (SwiftUI).

```swift UIKit theme={null}
let rive = try await Rive(...)
let riveView = RiveUIView(rive: rive)
// Enable semantics only while VoiceOver is running
riveView.semantics = .automatic
// Always keep semantics active
riveView.semantics = .on
// Disable semantics (default)
riveView.semantics = .off
```

```swift SwiftUI theme={null}
var body: some View {
    RiveUIViewRepresentable(rive)
        .semantics(.automatic)
    // or .semantics(.on)
    // or .semantics(.off)
}
```

```swift SwiftUI (Async) theme={null}
var body: some View {
    AsyncRiveUIViewRepresentable {
        let worker = try await Worker()
        let file = try await File(source: ..., worker: worker)
        let rive = try await Rive(file: file)
        return rive
    }
    .semantics(.automatic)
}
```
