---
source: https://rive.app/docs/runtimes/android/rendering-to-a-bitmap
title: "Rendering to a Bitmap"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Rendering to a Bitmap

Render screenshots and video at runtime.

Rendering to a bitmap at runtime is useful for scenarios such as snapshot testing and rendering video encoded from data-bound files.

> [!NOTE]
>
> For rendering to a bitmap from the Rive Editor, see [Exporting for Video or Static Design](/docs/editor/exporting/exporting-for-video-and-static-design).

**Compose**

> **[Demo](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/RiveSnapshotActivity.kt)**
>
> See the `RiveSnapshotActivity` example for a demonstration of this feature.

Rendering to a bitmap is done using the `RenderBuffer` class or the `onBitmapAvailable` callback in the `Rive` Composable.

**Legacy**

Rendering to a bitmap was technically possible in the legacy runtime by rendering to a Canvas backed by a bitmap or by sub-classing the renderer, but it was not a built-in feature and required more effort to implement. There are no plans to retrofit this feature into the legacy runtime.
