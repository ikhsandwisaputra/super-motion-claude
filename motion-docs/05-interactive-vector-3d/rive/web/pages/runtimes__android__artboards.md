---
source: https://rive.app/docs/runtimes/android/artboards
title: "Artboards"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Artboards

Selecting which artboard to render at runtime

For more information on creating artboards in the Rive editor, please refer to [Artboards](/docs/editor/fundamentals/artboards).

## Choosing an Artboard

When a Rive object is instantiated or when a Rive file is rendered, you can specify the artboard to use. If no artboard is given, the [default artboard](/docs/editor/fundamentals/artboards#default-state-machine), as set in the Rive editor, is used. If no default artboard is set, the first artboard is used.

Only one artboard can be rendered at a time.

**Compose**

By default, the `Rive` composable will select and create the default artboard specified in the Rive editor. To specify a different artboard, you must first create an `Artboard` object from a loaded `RiveFile`.

### Compose

Artboard objects can be created in Compose using the `rememberArtboard` function, which takes a Rive file and name of the artboard.

```kotlin theme={null}
val artboard = rememberArtboard(myRiveFile, "My Artboard")
```

### Outside of Compose

Alternatively, you can create an artboard outside of Compose contexts. Note that with this approach you are responsible for managing the artboard's lifecycle and must eventually close it with `Artboard::close()` when no longer needed, or leveraging its [`AutoClosable`](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-auto-closeable.html) interface with a `use` block.

```kotlin theme={null}
val artboard = Artboard.fromFile(myRiveFile, "My Artboard")
...
artboard.close()
```

### Using the Artboard

Once you have an artboard, you can pass it to the `Rive` composable via the `artboard` parameter.

```kotlin theme={null}
setContent {
    Rive(
        myRiveFile,
        artboard = artboard
    )
}
```

**Legacy**

### Using XML Layouts

```xml theme={null}
<app.rive.runtime.kotlin.RiveAnimationView
    app:riveResource="@raw/my_rive_file"
    app:riveArtboard="My Artboard"
    app:riveAutoPlay="true" />
```

### Using Kotlin

```kotlin theme={null}
animationView.setRiveResource(
    R.raw.my_rive_file,
    artboardName = "My Artboard",
    autoplay = true
)
```
