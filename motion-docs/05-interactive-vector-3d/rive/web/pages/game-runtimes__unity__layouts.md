---
source: https://rive.app/docs/game-runtimes/unity/layouts
title: "Layouts"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Layouts

Control the layout of your Rive animation in Unity

For more information on creating Rive Layouts, see the [editor documentation](/docs/editor/layouts/layouts-overview).

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

## Applying the Fit and Alignment

**Components**

Using a **Rive Widget** component, you can select from a list of **Fit** and **Alignment** options.

![The Fit and Alignment dropdowns in the Unity inspector](https://mintcdn.com/rive/IMrXM-oXoMvrTV9Y/images/game-runtimes/unity/03086bad-8cd9-4cfc-8d23-03579ff93a00.webp?fit=max\&auto=format\&n=IMrXM-oXoMvrTV9Y\&q=85\&s=97c78950cae0645842a0b7df47f80283)

**Legacy API**

> [!WARNING]
>
> Using the low-level API is no longer recommended. Please use the [Component API](/docs/game-runtimes/unity/components) instead for ease of use and maintainability. This content is provided for legacy support only.

The **fit** and **alignment** can be controlled on the **Rive.Renderer** `.Align()` method:

```cs theme={null}
public Fit fit = Fit.contain;
public Alignment alignment = Alignment.Center;
public RenderTexture renderTexture;
private Rive.Renderer m_riveRenderer;

...

m_renderQueue = new Rive.RenderQueue(renderTexture);
m_riveRenderer = m_renderQueue.Renderer();
...

if (m_artboard != null && renderTexture != null)
{
    m_riveRenderer.Align(fit, alignment, m_artboard);
    m_riveRenderer.Draw(m_artboard);
}
```

## Responsive layouts

The `Layout` **Fit** mode lets you display resizable artboards with built-in responsive behavior, configured directly in the graphic. Set a **Fit** of type **Layout** at runtime and the artboard will resize automatically. Optionally, provide a **Layout Scale Factor** to further adjust the scale of the content.

**Components**

When **Fit** is set to `Layout`, the **Rive Widget**:

• Measures the available space from its RectTransform.

• Calculates a new artboard size based on both the `Layout Scaling Mode` and a `Layout Scale Factor` .

• Dynamically resizes the artboard to match the calculated dimensions.

## Layout Scaling Modes

You can choose from three layout scaling modes:

**Reference Artboard Size (Default)**

• Scales the artboard proportionally based on its original (reference) size, preserving the same relative size across different resolutions.

• The artboard always appears “the same size in proportion to the screen,” maintaining consistent, resolution-agnostic visuals.

• Use the Layout Scale Factor to fine-tune or amplify the layout scaling above or below 1×.

**Constant Pixel Size**

• The artboard maintains its pixel size, regardless of the screen resolution or DPI.

• The Layout Scale Factor is a direct multiplier on the pixel size of the original artboard.

• This mode can cause the artboard to appear larger on lower-resolution screens and smaller on higher-resolution screens.

**Constant Physical Size**

• Attempts to maintain the artboard’s physical dimensions across different devices by scaling according to DPI.

• A device with a higher DPI will see larger pixel scaling so that, physically, the artboard is the same size from device to device.

• Requires two additional properties in RiveWidget:

* Fallback DPI: Used if Screen.dpi is unavailable.
* Reference DPI: The baseline DPI for your UI (e.g., 96 if you’re targeting standard desktop size).

## Layout Scale Factor

Regardless of which `Layout Scaling Mode` you select, you can further scale the artboard via the `Layout Scale Factor` . A value of 1.0 means no additional scaling; values greater than 1.0 enlarge the artboard, and values below 1.0 shrink it.

In practice, you might use this factor to give yourself flexibility in adjusting the artboard size, even after choosing a particular scaling mode. For example, you might find that everything is slightly too large on mobile and set the Layout Scale Factor to 0.9 (90% of the scaled size).

**Legacy API**

> [!WARNING]
>
> Using the low-level API is no longer recommended. Please use the [Component API](/docs/game-runtimes/unity/components) instead for ease of use and maintainability. This content is provided for legacy support only.

**Implementing Layout in Custom Scripts**

When implementing `Fit.Layout` in your custom scripts, consider the following aspects:

1. **Screen Resolution and Scaling**

* Monitor screen resolution changes
* Handle DPIs
* Implement proper scaling for different display densities

2. **Input Handling**

* Transform input coordinates to match the scaled layout
* Account for different DPIs when processing touch/mouse input
* Consider hit-testing adjustments for scaled elements This [script](https://github.com/rive-app/rive-unity/blob/main/examples/basic/Assets/GameRuntime/RiveScreen.cs) shows one way you could implement `Fit.Layout` support while considering the points mentioned above.
