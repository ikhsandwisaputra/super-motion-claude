---
source: https://rive.app/docs/runtimes/react/layouts
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
import Rive, { Layout, Fit, Alignment } from '@rive-app/react-canvas';

export const Simple = () => (
  <Rive
    src="https://cdn.rive.app/animations/vehicles.riv"
    artboard="Truck"
    stateMachine="bumpy"
    layout={new Layout({ fit: Fit.Contain, alignment: Alignment.TopCenter })}
  />
);
```

With the `useRive` hook:

```javascript theme={null}
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

export default function Example() {
  const { RiveComponent } = useRive({
    src: 'my-file.riv',
    artboard: 'my-artboard',
    stateMachine: 'my-state-machine',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
  });

  return <RiveComponent />;
}
```

## Responsive Layouts

Rive’s layout feature lets you design resizable artboards with built-in responsive behavior, configured from the editor. Ensure the fit mode is set to **Layout** at runtime and the artboard will resize to fill its container according to the constraints defined in the editor.

Optionally you may provide a **layout scale factor** to multiply the scale of the content. This allows fine tuning the visual size within your container. This property only applies when setting the **Fit** mode to **Layout**.

For more Editor information and how to configure your graphic, see [Layouts Overview](/docs/editor/layouts/layouts-overview).

**Steps**

1. Set `fit` to `Fit.Layout` in the `Layout` object - this will automatically scale and resize the artboard to match the canvas size.
2. Pass the `Layout` object to the `layout` prop in `useRive`.
3. Optionally set `layoutScaleFactor` in the `Layout` object for manual control of the artboard's scale factor.
4. The React runtime automatically handles window resizing and device pixel ratio changes.

```jsx theme={null}
import { useRive, Layout, Fit } from "@rive-app/react-canvas";

export const RiveComponent = () => {
  const { RiveComponent } = useRive({
    src: "your-rive-file.riv",
    stateMachine: "State Machine 1",
    layout: new Layout({
      fit: Fit.Layout,
      // layoutScaleFactor: 2, // Optional: 2x scale of the layout
    }),
    autoplay: true,
  });

  return <RiveComponent />;
};
```
