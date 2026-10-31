---
source: https://rive.app/docs/runtimes/react-native/layouts
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

**New Runtime (Recommended)**

Set layout attributes for `Fit` and `Alignment` on the `RiveView` component directly. See [Fit](#the-fit-mode) and [Alignment](#alignment) for all enum options.

```ts theme={null}
import {
  Alignment,
  Fit,
  RiveView,
  useRiveFile,
} from '@rive-app/react-native';

export default function LayoutExample() {
  const { riveFile } = useRiveFile(
    require('path/to/file.riv')
  );

  return (
    <View style={styles.container}>
      {riveFile ? (
        <RiveView
          file={riveFile}
          style={styles.rive}
          fit={Fit.Contain}
          alignment={Alignment.Center}
        />
      ) : null}
    </View>
  );
}
```

**Legacy Runtime**

Set layout attributes for `Fit` and `Alignment` on the `Rive` component directly. See [Fit](#the-fit-mode) and [Alignment](#alignment) for all enum options.

```javascript theme={null}
import Rive, { Alignment, Fit } from 'rive-react-native';

export default function Simple() {
  return (
    <ScrollView>
      <Rive
        fit={Fit.Cover}
        alignment={Alignment.TopCenter}
        resourceName="truck_v7"
      />
    </ScrollView>
  );
};
```

## Responsive Layouts

Rive’s layout feature lets you design resizable artboards with built-in responsive behavior, configured from the editor. Ensure the fit mode is set to **Layout** at runtime and the artboard will resize to fill its container according to the constraints defined in the editor.

Optionally you may provide a **layout scale factor** to multiply the scale of the content. This allows fine tuning the visual size within your container. This property only applies when setting the **Fit** mode to **Layout**.

For more Editor information and how to configure your graphic, see [Layouts Overview](/docs/editor/layouts/layouts-overview).

**New Runtime (Recommended)**

**Steps**

1. Set `fit` to `Fit.Layout` - this will automatically scale and resize the artboard to match the view size.
2. Optionally set the `layoutScaleFactor` for manual control of the artboard size (scale factor). If not set, the graphic uses the DPI of the device for scaling.

```javascript theme={null}
export default function ResponsiveLayoutsExample() {
  const { riveFile, isLoading, error } = useRiveFile(
    require('path/to/file.riv')
  );
  const [scaleFactor, setScaleFactor] = useState(4.0);
  const riveRef = useRef<RiveViewRef>(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    riveRef.current?.playIfNeeded();
  }, [width, height]);

  const increaseScale = () => {
    setScaleFactor((prev) => prev + 0.5);
    riveRef.current?.playIfNeeded();
  };
  const decreaseScale = () => {
    setScaleFactor((prev) => Math.max(0.5, prev - 0.5));
    riveRef.current?.playIfNeeded();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error?.message}</Text>
      ) : riveFile ? (
        <RiveView
          hybridRef={{ f: (ref) => (riveRef.current = ref) }}
          file={riveFile}
          fit={Fit.Layout}
          layoutScaleFactor={scaleFactor}
          style={styles.rive}
          autoPlay={true}
        />
      ) : null}
      <View style={styles.controls}>
        <Text style={styles.label}>Layout Scale Factor</Text>
        <View style={styles.scaleControls}>
          <Button title="-" onPress={decreaseScale} />
          <View style={styles.scaleText}>
            <Text>{scaleFactor.toFixed(1)}x</Text>
          </View>
          <Button title="+" onPress={increaseScale} />
        </View>
      </View>
    </View>
  );
}
```

> [!NOTE]
>
> The call to `playIfNeeded()` ensures that the graphic is visually updated after the change. In the future this will be handled automatically.

**Legacy Runtime**

**Examples**

* [Layout React Native Example](https://github.com/rive-app/rive-react-native/blob/main/example/app/\(examples\)/ResponsiveLayout.tsx)

**Steps**

1. Set `fit` to `Fit.Layout` - this will automatically scale and resize the artboard to match the canvas size.
2. Optionally set `layoutScaleFactor` in the `Layout` object for manual control of the artboard's scale factor.
3. The React Native runtime automatically handles window resizing and device pixel ratio changes.

```javascript theme={null}
import Rive, { Fit } from 'rive-react-native';

const resourceName = 'layout_test';

export default function ResponsiveLayout() {
  return (
    <Rive
      autoplay={true}
      fit={Fit.Layout}
      layoutScaleFactor={0.5} // If you do not set this (or set equal to "-1.0"), Rive will automatically scale the layout to match the device pixel ratio
      resourceName={resourceName}
      artboardName={'Artboard'}
      stateMachineName={'State Machine 1'}
    />
  );
}
```
