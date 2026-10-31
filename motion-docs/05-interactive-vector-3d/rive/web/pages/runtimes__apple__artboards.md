---
source: https://rive.app/docs/runtimes/apple/artboards
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

**New Runtime**

The following section assumes that you have read through the [Apple](/docs/runtimes/apple/apple) overview.

### Getting an Artboard

Once you have created a `File`, you can then retrieve information for and create `Artboard` types.

```swift theme={null}
// Get all artboard names in the file
let artboardNames = try await file.getArtboardNames()
// Get the default artboard for the file
let defaultArtboard = try await file.createArtboard()
// Get an artboard by name from the file
let artboardByName = try await file.createArtboard("Artboard")
```

Note that these are all async throwing functions marked as `@MainActor`. Since they are functions called on a `File` object, any thrown errors will be of type `FileError`.

An example of when one of these functions will throw is if you call `.createArtboard(_:)` with a name that is not in the origin `File`, which will throw a `FileError.invalidArtboard(String)`.

### Using an Artboard

Remember that the Rive configuration for a view is the `Rive` type. In the overview, we show initializing a `Rive` object with a file, opting to use the default artboard and state machine. However, you can initialize a `Rive` object with a specific artboard:

```swift theme={null}
let worker = try await Worker()
let file = try await File(source: .local("my_file", Bundle.main), worker: worker)
let artboardByName = try await file.createArtboard("Artboard")
let rive = try await Rive(file: file, artboard: artboardByName)
```

Artboards then become the source of truth for state machines. See [State Machine](/docs/runtimes/apple/state-machines) for more details.

**Legacy Runtime**

**SwiftUI**

```swift theme={null}
struct AnimationView: View {
    var body: some View {
        RiveViewModel(
            fileName: "my_rive_file",
            artboardName: "My Artboard"
        ).view()
    }
}
```

**UIKit**

```swift theme={null}
class AnimationViewController: UIViewController {
    @IBOutlet weak var riveView: RiveView!

    var bananaVM = RiveViewModel(
        fileName: "my_rive_file",
        artboardName: "My Artboard",
    )

    override func viewDidLoad() {
        bananaVM.setView(riveView)
    }
}
```
