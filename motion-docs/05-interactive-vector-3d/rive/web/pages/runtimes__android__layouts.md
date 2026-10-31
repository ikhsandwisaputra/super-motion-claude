---
source: https://rive.app/docs/runtimes/android/layouts
title: "Layout"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Layout

Control how graphics are laid out within the canvas.

## The Fit Mode

A Rive graphic authored in the editor will not necessarily match the size of the container it is rendered into at runtime. We need to determine the behavior for this scenario, as no one size fits all.

The solution is choosing the fit mode. This is specified on the container and controls how Rive is scaled.

* `Layout`: Use the Rive layout engine to apply responsive layout to the artboard, matching the container dimensions. For this to work, the artboard must be designed with layouts in mind. See [Responsive Layouts](#responsive-layouts) for more information on how to use this option.
* `Contain`: **(Default)** Preserve aspect ratio and scale the artboard so that its larger dimension matches the corresponding dimension of the container.

  If aspect ratios are not identical, this will leave space on the shorter dimension's axis.
* `ScaleDown`: Preserve aspect ratio and behave like `Contain` when the artboard is larger than the container. Otherwise, use the artboard's original dimensions.
* `Cover`: Preserve aspect ratio and scale the artboard so that its smaller dimension matches the corresponding dimension of the container.

  If aspect ratios are not identical, this will clip the artboard on the larger dimension's axis.
* `FitWidth`: Preserve aspect ratio and scale the artboard width to match the container's width.

  If the aspect ratios between the artboard and container do not match, this will result in either vertical clipping or space in the vertical axis.
* `FitHeight`: Preserve aspect ratio and scale the artboard height to match the container's height.

  If the aspect ratios between the artboard and container do not match, this will result in either horizontal clipping or space in the horizontal axis.
* `Fill`: Do not preserve aspect ratio and stretch to the container's dimensions.
* `None`: Do not scale. Use the artboard's original dimensions.

  For either dimension, if the artboard's dimension is larger, it will be clipped. If it is smaller, it will leave space.

### Alignment

In all options other than `Layout` and `Fill`, there is the possibility that the Rive graphic is clipped or leaves space within its container. Alignment determines how content aligns within the container. The following options are available.

* `TopLeft`
* `TopCenter`
* `TopRight`
* `CenterLeft`
* `Center` **(Default)**
* `CenterRight`
* `BottomLeft`
* `BottomCenter`
* `BottomRight`

### Applying the Fit Mode

**Compose**

The `Fit` sealed class is used to specify the fit mode. On all variants other than `Layout` and `Fill`, the `Alignment` enum can be supplied to specify the alignment. Note that because this is a class, it must be constructed. If an alignment is not provided, it defaults to `Alignment.Center`.

```kotlin theme={null}
Rive(
    myRiveFile,
    fit = Fit.Cover(Alignment.TopCenter)
)
```

**Legacy**

The `Fit` enum specifies the fit mode with the follow options: `LAYOUT`, `CONTAIN`, `SCALE_DOWN`, `COVER`, `FIT_WIDTH`, `FIT_HEIGHT`, `FILL`, and `NONE`.

The `Alignment` enum specifies the alignment with the following options: `TOP_LEFT`, `TOP_CENTER`, `TOP_RIGHT`, `CENTER_LEFT`, `CENTER`, `CENTER_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_CENTER`, and `BOTTOM_RIGHT`.

### Using XML Layouts

The fit and alignment enum values can be applied to the `riveFit` and `riveAlignment` attributes in your XML layout:

```xml theme={null}
<app.rive.runtime.kotlin.RiveAnimationView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:riveResource="@raw/my_rive_file"
    app:riveAlignment="CENTER"
    app:riveFit="CONTAIN"
/>
```

### Using Kotlin

The fit and alignment enum values can be applied to the `fit` and `alignment` properties on your `RiveAnimationView` instance:

```kotlin theme={null}
animationView.fit = Fit.FILL
animationView.alignment = Alignment.CENTER
```

## Responsive Layouts

Rive’s layout feature lets you design resizable artboards with built-in responsive behavior, configured from the editor. Ensure the fit mode is set to **Layout** at runtime and the artboard will resize to fill its container according to the constraints defined in the editor.

Optionally you may provide a **layout scale factor** to multiply the scale of the content. This allows fine tuning the visual size within your container. This property only applies when setting the **Fit** mode to **Layout**.

For more Editor information and how to configure your graphic, see [Layouts Overview](/docs/editor/layouts/layouts-overview).

**Compose**

See also the [Compose Layout](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeLayoutActivity.kt) sample.

Set the `fit` parameter to `Fit.Layout` in the `Rive` composable. This will resize the artboard to match the container size. The `Fit.Layout` constructor takes an optional `layoutScaleFactor` parameter to adjust the scale of the artboard. By default it is 1, i.e. no scaling.

```kotlin theme={null}
Rive(
    myRiveFile,
    fit = Fit.Layout(1.2f) // 1.2x scale
)
```

**Legacy**

### Sample

See the [Layout](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LayoutActivity.kt) sample.

### Using XML Layouts

Set the `riveFit` attribute to `"LAYOUT"`.

```kotlin theme={null}
<app.rive.runtime.kotlin.RiveAnimationView
    ...
    app:riveFit="LAYOUT"
/>
```

### Using Kotlin

Set the RiveAnimationView's `fit` property to `LAYOUT`.

```kotlin theme={null}
val animationView = findViewById<RiveAnimationView>(R.id.my_view)
animationView.fit = Fit.LAYOUT
```

### Adjusting the Layout Scale Factor

To adjust the scale factor of the contents, use the `layoutScaleFactor` property. This is nullable, so by default, it will use the density as reported by `resources.displayMetrics.density`. You can override this to any positive float value, or return control to the system by resetting to `null`:

```kotlin theme={null}
// Force a set scale factor
animationView.layoutScaleFactor = 2.5f
// Reset to system control
animationView.layoutScaleFactor = null
```

### Resizing the Artboard

The artboard size can be manually controlled by using the `width` and `height` properties. `resetArtboardSize()` can be used to return these values to their defaults.

```kotlin theme={null}
// Force a certain artboard size
animationView.controller.activeArtboard?.width = 1000f
animationView.controller.activeArtboard?.height = 1000f
// Reset the artboard size to defaults
animationView.controller.activeArtboard?.resetArtboardSize()
```
