---
source: https://rive.app/docs/runtimes/react-native/semantics
title: "Semantics"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Semantics

Make your Rive views accessible to VoiceOver by enabling semantics in React Native.

This page covers enabling [semantics](/docs/editor/accessibility/semantics) on `RiveView` so your Rive graphics are accessible to screen readers. To learn what semantics are and how to add them to a graphic, see the [Semantics](/docs/editor/accessibility/semantics) editor documentation.

## Overview

In the Rive Editor, you can add semantic meaning to certain elements of your graphic-roles such as button, checkbox, tab, image, list, dialog, and more. Alongside these roles, you can add associated labels, values, states, and actions. These settings vary per role.

At runtime, `RiveView` reads those semantics from the running state machine and exposes them to [VoiceOver](https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios), keeping them up to date as the state machine advances. On iOS this uses the Apple runtime's [semantics support](/docs/runtimes/apple/semantics).

> [!WARNING]
>
> Semantics are **opt‑in**. The default mode is `Semantics.Off`, so no accessibility elements are created until you enable semantics on the view.

> [!NOTE]
>
> Semantics must be defined in the editor to have any effect. If an element has no semantics, it is not exposed to screen readers, regardless of the mode you set. See [Feature Support](/docs/feature-support) for which runtimes currently support semantics.

## Availability

Semantics require `@rive-app/react-native` `0.5.0` or later.

| Platform | Supported |
| - | - |
| iOS | ✅ |
| Android | Coming soon |

On Android, the `semantics` prop is accepted but has no effect yet.

## Semantics modes

The `Semantics` enum sets the screen reader integration mode for a `RiveView`:

| Mode | Description |
| - | - |
| `Semantics.Off` | **Default.** Accessibility semantics are disabled. No accessibility elements are created, regardless of screen reader state. |
| `Semantics.On` | Accessibility semantics are always active. Elements are created and kept up‑to‑date on every frame. |
| `Semantics.Automatic` | Accessibility semantics activate and deactivate automatically based on whether a screen reader (VoiceOver) is running. |

For most apps, prefer `Semantics.Automatic`. It keeps the accessibility tree in sync only while a screen reader is active, avoiding unnecessary work when it isn't.

## Usage

Set the `semantics` prop on `RiveView`:

```tsx highlight={1,10} theme={null}
import { RiveView, Semantics, useRiveFile } from '@rive-app/react-native';

export default function TabBar() {
  const { riveFile } = useRiveFile(require('./assets/tab_bar.riv'));

  return riveFile ? (
    <RiveView
      file={riveFile}
      style={{ width: '100%', height: 80 }}
      semantics={Semantics.Automatic}
    />
  ) : null;
}
```

See the [semantics example](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/demos/SemanticsExample.tsx) in the example app for a complete setup.
