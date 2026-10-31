---
source: https://rive.app/docs/runtimes/apple/layouts
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

**New Runtime**

You can set the fit and layout options on a `Rive` object. The `.fit` can be updated at runtime without creating a new `Rive` object.

For all possible options, see [Fit.swift](https://github.com/rive-app/rive-ios/blob/main/Source/Concurrency/View/Fit.swift)

```swift theme={null}
// Set a fit and alignment for an artboard that does not use layouts
let worker = try await Worker()
let file = try await File(source: ..., worker: worker)
var rive = try await Rive(file: file, fit: .contain(alignment: .center))
// Update the fit and alignment at runtime
rive.fit = .fitWidth(alignment: .topCenter)
```

**Legacy Runtime**

The runtime provides the following enums to set on layout parameters:

* **Fit**
  * `.fill`
  * `.contain`
  * `.cover`
  * `.fitWidth`
  * `.fitHeight`
  * `.scaleDown`
  * `.noFit`

* **Alignment**
  * `.topLeft`
  * `.topCenter`
  * `.topRight`
  * `.centerLeft`
  * `.center`
  * `.centerRight`
  * `.bottomLeft`
  * `.bottomCenter`
  * `.bottomRight`

### SwiftUI

The following example shows how to set layout parameters and switch them at runtime:

```swift theme={null}
struct SwiftLayout: View {
    @State private var fit: RiveFit = .contain
    @State private var alignment: RiveAlignment = .center

    var body: some View {
        VStack {
            RiveViewModel(fileName: "fancy_rive_file", fit: fit, alignment: alignment).view()
        }
        HStack {
            Text("Some Fit Examples")
        }
        HStack {
            Button("Fill") { fit = .fill }
            Button("Contain") { fit = .contain }
            Button("Cover") { fit = .cover }
        }
        HStack {
            Text("Some Alignment Examples")
        }
        HStack {
            Button("Top Left") { alignment = .topLeft }
            Button("Top Center") { alignment = .topCenter }
            Button("Top Right") { alignment = .topRight }
        }
    }
}
```

### UIKit

The following example shows how to set layout parameters and switch them at runtime:

```swift theme={null}
class LayoutViewController: UIViewController {
    @IBOutlet weak var riveView: RiveView!
    var viewModel = RiveViewModel(fileName: "fancy_rive_file")

    override func viewDidLoad() {
        viewModel.setView(riveView)
    }

    @IBAction func fitButtonTriggered(_ sender: UIButton) {
        setFit(name: sender.currentTitle!)
    }

    @IBAction func alignmentButtonTriggered(_ sender: UIButton) {
        setAlignment(name: sender.currentTitle!)
    }

    func setFit(name: String) {
        var fit: RiveFit = .contain
        switch name {
        case "Fill": fit = .fill
        case "Contain": fit = .contain
        case "Cover": fit = .cover
        case "Fit Width": fit = .fitWidth
        case "Fit Height": fit = .fitHeight
        case "Scale Down": fit = .scaleDown
        case "None": fit = .noFit
        default: fit = .contain
        }
        viewModel.fit = fit
    }

    func setAlignment(name: String) {
        var alignment: RiveAlignment = .center
        switch name {
        case "Top Left": alignment = .topLeft
        case "Top Center": alignment = .topCenter
        case "Top Right": alignment = .topRight
        case "Center Left": alignment = .centerLeft
        case "Center": alignment = .center
        case "Center Right": alignment = .centerRight
        case "Bottom Left": alignment = .bottomLeft
        case "Bottom Center": alignment = .bottomCenter
        case "Bottom Right": alignment = .bottomRight
        default: alignment = .center
        }
        viewModel.alignment = alignment
    }
}
```

## Responsive Layouts

Rive’s layout feature lets you design resizable artboards with built-in responsive behavior, configured from the editor. Ensure the fit mode is set to **Layout** at runtime and the artboard will resize to fill its container according to the constraints defined in the editor.

Optionally you may provide a **layout scale factor** to multiply the scale of the content. This allows fine tuning the visual size within your container. This property only applies when setting the **Fit** mode to **Layout**.

For more Editor information and how to configure your graphic, see [Layouts Overview](/docs/editor/layouts/layouts-overview).

**New Runtime**

When creating a new `Rive` object, you can set the fit to layout, with two options for the scale factor: automatic or explicit.

```swift theme={null}
let worker = try await Worker()
let file = try await File(source: ..., worker: worker)
// Create a new Rive object with a layout fit that automatically determines the scale factor based on the screen the view is being displayed on
var rive = try await Rive(file: file, fit: .layout(scaleFactor: .automatic))
// Or, use an explicit scale factor
rive.fit = .layout(scaleFactor: .explicit(2.0))
```

**Legacy Runtime**

**Examples**

* [SwiftUI](https://github.com/rive-app/rive-ios/blob/main/Example-iOS/Source/Examples/SwiftUI/SwiftLayout.swift)

**Steps**

1. Set `fit` on an instance of `RiveViewModel` to `layout`
2. Optionally set `layoutScaleFactor` on `RiveViewModel` for manual control of an artboard's scale factor.

> [!NOTE]
>
> To enable automatically determining the scale factor, set `.layoutScaleFactor` to `RiveViewModel.layoutScaleFactorAutomatic`. This is the default value; it is equivalent to `-1`. When set, Rive will listen for window and screen changes for the view model's view, and automatically apply the correct scale factor for the current view hierarchy.

```swift theme={null}
let viewModel = RiveViewModel(fileName: "...")
viewModel.fit = .layout
viewModel.layoutScaleFactor = RiveViewModel.layoutScaleFactorAutomatic // Allow Rive to determine the scale factor
viewModel.layoutScaleFactor = 2.0 // Or, explicitly set the scale factor
```
