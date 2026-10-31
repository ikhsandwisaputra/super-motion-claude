---
source: https://rive.app/docs/runtimes/web/layouts
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

### Bounds

This runtime exposes the bounding dimensions for the area in which the Rive content will render by providing the minimum and maximum x and y coordinates. These coordinates are relative to the container and all must be provided. These will override alignment settings.

* `minX`
* `minY`
* `maxX`
* `maxY`

### Applying the Fit Mode

Use the `Layout` object to configure `Fit` and `Alignment`. See [Fit](#the-fit-mode) and [Alignment](#alignment) for all enum options.

```javascript theme={null}

// Fill the canvas, cropping Rive if necessary
let layout = new rive.Layout({
  fit: rive.Fit.Cover,
});

// Fit to the width and align to the top of the canvas
layout = new rive.Layout({
  fit: rive.Fit.FitWidth,
  alignment: rive.Alignment.TopCenter,
});

// Constrain the Rive content to (minX, minY), (maxX, maxY) in the canvas
layout = new rive.Layout({
  fit: rive.Fit.Contain,
  minX: 50,
  minY: 50,
  maxX: 100,
  maxY: 100,
});

const riveInstance = new rive.Rive({
  src: 'https://cdn.rive.app/animations/vehicles.riv',
  canvas: document.getElementById('canvas'),
  layout: layout,
  autoplay: true
});

// Update the layout
riveInstance.layout = new rive.Layout({ fit: rive.Fit.Fill });
```

## Responsive Layouts

Rive’s layout feature lets you design resizable artboards with built-in responsive behavior, configured from the editor. Ensure the fit mode is set to **Layout** at runtime and the artboard will resize to fill its container according to the constraints defined in the editor.

Optionally you may provide a **layout scale factor** to multiply the scale of the content. This allows fine tuning the visual size within your container. This property only applies when setting the **Fit** mode to **Layout**.

For more Editor information and how to configure your graphic, see [Layouts Overview](/docs/editor/layouts/layouts-overview).

**Steps**

1. Set `fit` to `Fit.Layout` - this will automatically scale and resize the artboard to match the canvas size when calling `resizeDrawingSurfaceToCanvas()`.
2. Optionally set `layoutScaleFactor` for manual control of the artboard size (scale factor).
3. Subscribe to `window.onresize` and call `resizeDrawingSurfaceToCanvas()` to adjust the artboard size as the canvas and window changes.
4. Subscribe to **device pixel ratio** changes and call `resizeDrawingSurfaceToCanvas()` to ensure the artboard updates correctly on various screen densities. For example, when dragging the window between multiple monitors with different device pixel ratios.

```javascript theme={null}
  const rive = new Rive({
    src: "your-rive-file.riv",
    autoplay: true,
    canvas: riveCanvas,
    layout: new Layout({
      fit: Fit.Layout,
      // layoutScaleFactor: 2, // 2x scale of the layout, when using `Fit.Layout`. This allows you to resize the layout as needed.
    }),
    stateMachine: "State Machine 1",
    onLoad: () => {
      computeSize();
    },
  });

  function computeSize() {
    rive.resizeDrawingSurfaceToCanvas();
  }

  // Subscribe to window size changes and update call `resizeDrawingSurfaceToCanvas`
  window.onresize = computeSize;

  // Subscribe to devicePixelRatio changes and call `resizeDrawingSurfaceToCanvas`
  window
    .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    .addEventListener("change", computeSize);
```

## TypeScript API surface

These types are exported from `@rive-app/canvas` (or your bundled `rive` global):

```typescript theme={null}
export interface LayoutParameters {
  fit?: Fit;
  alignment?: Alignment;
  layoutScaleFactor?: number;
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
}

export class Layout {
  constructor(params?: LayoutParameters);
  readonly fit: Fit;
  readonly alignment: Alignment;
  readonly layoutScaleFactor: number;
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
  copyWith(partial: LayoutParameters): Layout;
}
```
