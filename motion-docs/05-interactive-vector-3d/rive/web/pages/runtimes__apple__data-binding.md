---
source: https://rive.app/docs/runtimes/apple/data-binding
title: "Data Binding"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Data Binding

Connect your code to bound editor elements using View Models

Before engaging with the runtime data binding APIs, it is important to familiarize yourself with the core concepts presented in the [Overview](/docs/editor/data-binding/overview).

# View Models

View models describe a set of properties, but cannot themselves be used to get or set values - that is the role of [view model instances](#view-model-instances).

To begin, we need to get a reference to a particular view model. This can be done either by index, by name, or the default for a given artboard, and is done from the Rive file. The default option refers to the view model assigned to an artboard by the dropdown in the editor.

**New Runtime**

View models are not their own type; rather, they are a source when creating a view model instance from a `File`.

You can define the source of a view model via the `ViewModelSource` type.

```swift theme={null}
case artboardDefault(Artboard) // References the default view model for an Artboard
case name(String) // References a view model from a file by name
```

These sources are used in conjunction with getting a view model instance. See [View Model Instances](#view-model-instances) for more information.

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)
let file = riveViewModel.riveModel!.riveFile

// Data binding view model by name
let viewModelByName = file.viewModelNamed("...")

// Data binding view model by index
for index in 0..<file.viewModelCount {
    let viewModelByIndex = file.viewModel(at: index)
}

// Default data binding view model for an artboard
let artboard = riveViewModel.riveModel!.artboard
let viewModelForArtboard = file.viewModel(for: artboard)
```

# View Model Instances

Once we have a reference to a view model, it can be used to create an instance. When creating an instance, you have four options:

1. Create a blank instance - Fill the properties of the created instance with default values as follows:

   | Type | Value |
   | - | - |
   | Number | 0 |
   | String | Empty string |
   | Boolean | False |
   | Color | 0xFF000000 |
   | Trigger | Untriggered |
   | Enum | The first value |
   | Image | No image |
   | Font | No font |
   | Artboard | No artboard |
   | List | Empty list |
   | Nested view model | Null |

2. Create the default instance - Use the instance labelled "Default" in the editor. Usually this is the one a designer intends as the primary one to be used at runtime.

3. Create by index - Using the order returned when iterating over all available instances. Useful when creating multiple instances by iteration.

4. Create by name - Use the editor's instance name. Useful when creating a specific instance.

> [!NOTE]
>
> In some samples, due to the wordiness of "view model instance", we use the abbreviation "VMI", as well as "VM" for "view model".

**New Runtime**

The following section assumes that you have read through the [Apple](/docs/runtimes/apple/apple) overview.

```swift theme={null}
// From a file
let file: File = ...

// When using a view model by name:
// A blank view model instance
var blankInstance = try await file.createViewModelInstance(.blank(from: .name("ViewModel")))
// The default instance for the view model
var defaultInstance = try await file.createViewModelInstance(.viewModelDefault(from: .name("ViewModel")))
// An instance by name from the view model
var namedInstance = try await file.createViewModelInstance(.name("Instance", from: .name("ViewModel")))

// Alternatively, using the default view model for an artboard
let artboard: Artboard = ...
// A blank view model instance
blankInstance = try await file.createViewModelInstance(.blank(from: .artboardDefault(artboard)))
// The default instance for the view model
defaultInstance = try await file.createViewModelInstance(.viewModelDefault(from: .artboardDefault(artboard)))
// An instance by name from the view model
namedInstance = try await file.createViewModelInstance(.name("Instance", from: .artboardDefault(artboard)))
```

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)
let viewModel = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!

// Create blank
let blankInstance = viewModel.createInstance()

// Create default
let defaultInstance = viewModel.createDefaultInstance()

// Create by index
for index in 0..<viewModel.instanceCount {
    let instanceByIndex = viewModel.createInstance(fromIndex: index)
}

// Create by name
for name in viewModel.instanceNames {
    let instanceByName = viewModel.createInstance(fromName: name)
}
```

### Binding

The created instance can then be assigned to a state machine or artboard. This establishes the bindings set up at edit time.

It is preferred to assign to a state machine, as this will automatically apply the instance to the artboard as well. Only assign to an artboard if you are not using a state machine, i.e. your file is static or uses linear animations.

> [!NOTE]
>
> The initial values of the instance are not applied to their bound elements until the state machine or artboard advances.

**New Runtime**

Create and retain the instance you want to read, observe, or modify, then bind it when creating the state machine. Run setup from a `@MainActor` async context.

```swift theme={null}
let artboard = try await file.createArtboard()
let viewModelInstance = try await file.createViewModelInstance(
    .viewModelDefault(from: .artboardDefault(artboard))
)
let stateMachine = try await artboard.createStateMachine(binding: viewModelInstance)
let rive = try await Rive(file: file, artboard: artboard, stateMachine: stateMachine)
```

To replace the main instance later, create a new instance and use the async throwing binding API:

```swift theme={null}
let replacementInstance = try await file.createViewModelInstance(
    .viewModelDefault(from: .artboardDefault(artboard))
)
try await stateMachine.bindViewModelInstances(main: replacementInstance)
```

After binding succeeds, retain `replacementInstance` for subsequent property access.

The `Rive` initializer with an explicit artboard and state machine uses those components as configured, without rebinding. Create the artboard from the same file and the state machine from that artboard. Use compatible instances from the same file and worker.

> [!WARNING]
>
> Bound instances cannot be retrieved from the state machine. The deprecated `Rive.viewModelInstance` property returns `nil` with the new initializers. Keep your own references for property access. See [migration guidance](/docs/runtimes/apple/migrating-from-legacy#updating-existing-concurrency-runtime-code).

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)
let artboard = riveViewModel.riveModel!.artboard,
let instance = riveViewModel.riveModel!.riveFile.defaultViewModel(for: artboard).createDefaultInstance()!

// Apply the instance to the state machine (preferred)
// Applying to a state machine will automatically bind to its artboard
riveViewModel.riveModel!.stateMachine.bind(instance)

// Alternatively, apply the instance to the artboard
artboard.bind(viewModelInstance: instance)
```

### Auto-Binding

Alternatively, you may prefer to use auto-binding. This will automatically bind the default view model of the artboard using the default instance to both the state machine and the artboard. The default view model is the one selected on the artboard in the editor dropdown. The default instance is the one marked "Default" in the editor.

**New Runtime**

State machine creation binds authored main and global defaults when available. If you do not need programmatic access to those instances, use a convenience initializer:

```swift theme={null}
let rive = try await Rive(file: file)
```

To choose an artboard and use its default state machine:

```swift theme={null}
let artboard = try await file.createArtboard("Artboard")
let rive = try await Rive(file: file, artboard: artboard)
```

Automatically created instances have no public getters. If you need to read or change their properties, create and retain instances explicitly as shown in [Binding](#binding).

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)
riveViewModel.riveModel?.enableAutoBind { instance in
    // Store a reference to `instance` to later access properties
    // The instance may change as state machines and artboards change
}

// If you'd like to disable autoBind after enabling…
riveViewModel.riveModel!.disableAutoBind()
```

## Global View Models

In the new Apple runtime, global view models provide shared data, such as a theme, to bindings authored to use that global. Create instances and bind them by their global view model names:

```swift theme={null}
let artboard = try await file.createArtboard()
let main = try await file.createViewModelInstance(
    .viewModelDefault(from: .artboardDefault(artboard))
)
// This example requires a global view model named "Theme" in the file.
let theme = try await file.createViewModelInstance(
    .viewModelDefault(from: .name("Theme"))
)
let stateMachine = try await artboard.createStateMachine(binding: main) {
    ("Theme", theme)
}
let rive = try await Rive(file: file, artboard: artboard, stateMachine: stateMachine)
```

To discover which global view models a file contains, use `try await file.getGlobalViewModelNames()`.

In this example, keep `main` and `theme` in your app's model if you need to access their properties. Global instances use the same property and observation APIs as the main instance. To share an instance across state machines from the same file, bind that same instance to each state machine.

You can replace only a global binding later:

```swift theme={null}
let darkTheme = try await file.createViewModelInstance(
    .name("Dark", from: .name("Theme"))
)
try await stateMachine.bindViewModelInstances {
    ("Theme", darkTheme)
}
```

The globals builder supports `if`, `if let`, and `for` statements. For example, choose between instances named "Light" and "Dark" authored on the "Theme" view model:

```swift theme={null}
let lightTheme = try await file.createViewModelInstance(
    .name("Light", from: .name("Theme"))
)
let darkTheme = try await file.createViewModelInstance(
    .name("Dark", from: .name("Theme"))
)
// colorScheme is the current SwiftUI ColorScheme value from your app.
try await stateMachine.bindViewModelInstances {
    if colorScheme == .dark {
        ("Theme", darkTheme)
    } else {
        ("Theme", lightTheme)
    }
}
```

The builder runs when you call the binding method. To switch themes when the color scheme changes, call it again with the updated value and your retained instances.

You can also pass `main:` to update main and global bindings in one call. Each call sets the supplied bindings; it does not replace the complete set of bindings. Omitting a global does not remove it or clear its instance—the existing binding stays in place. Slots without an existing or supplied instance receive authored defaults when available. Passing `nil` for `main` also preserves its existing binding rather than clearing it.

All supplied global names are checked before applying any supplied bindings. An unknown or non-global name throws `StateMachineError.invalidGlobalViewModelName`; duplicate names in one call throw `StateMachineError.duplicateGlobalViewModelInstance`. These rejected calls leave existing bindings intact. Metadata failures throw `StateMachineError.error`, and cancellation throws `StateMachineError.cancelled`. Name validation does not check instance type or worker compatibility.

# Properties

A property is a value that can be read, set, or observed on a view model instance. Properties can be of the following types:

| Type | Supported |
| - | - |
| Floating point numbers | ✅ |
| Booleans | ✅ |
| Triggers | ✅ |
| Strings | ✅ |
| Enumerations | ✅ |
| Colors | ✅ |
| Nested View Models | ✅ |
| Lists | ✅ |
| Images | ✅ |
| Artboards | ✅ |

For more information on version compatibility, see the [Feature Support](/docs/feature-support) page.

### Listing properties

Property descriptors can be inspected on a view model to discover at runtime which are available. These are not the mutable properties themselves though - once again those are on instances. These descriptors have a type and name.

**New Runtime**

```swift theme={null}
let file: File = ...
let properties = try await file.getProperties(of: "ViewModel")
for property in properties {
    print(property.type) // enum of string, number, boolean, etc
    print(property.name) // The name of the property within the view model
    print(property.metaData) // Additional metadata for the property, if available
}
```

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)
let viewModel = riveViewModel.riveModel!.file.viewModelNamed(...)!
for property in viewModel.properties {
    print(property.type) // String, number, boolean, etc
    print(property.name) // The name of the property within the view model
}
```

### Reading and writing properties

References to these properties can be retrieved by name or path.

Some properties are mutable and have getters, setters, and observer operations for their values. Getting or observing the value will retrieve the latest value set on that property's binding, as of the last state machine or artboard advance. Setting the value will update the value and all of its bound elements.

> [!NOTE]
>
> After setting a property's value, the changes will not apply to their bound elements until the state machine or artboard advances.

**New Runtime**

Property types are a very thin wrapper around the path and return type of a property.

Property APIs are available on `ViewModelInstance`. Call them from a main-actor context. Reading a String, Number, Boolean, Color, or Enum property uses `try await`. Setting a property queues the change and returns immediately.

| Property | Swift value | Supported operations |
| - | - | - |
| `StringProperty` | `String` | Read, write, `valueStream(of:)` |
| `NumberProperty` | `Float` | Read, write, `valueStream(of:)` |
| `BoolProperty` | `Bool` | Read, write, `valueStream(of:)` |
| `ColorProperty` | `Color` | Read, write, `valueStream(of:)` |
| `EnumProperty` | `String` | Read, write, `valueStream(of:)` |
| `TriggerProperty` | No stored value | `fire(trigger:)`, `stream(of:)` |
| `ImageProperty` | `Image?` | Write; `nil` clears |
| `FontProperty` | `Font?` | Write; `nil` clears |
| `BlobProperty` | `Blob?` | Write; `nil` clears |
| `ArtboardProperty` | `Artboard?` | Write; `nil` clears |
| `ViewModelInstanceProperty` | `ViewModelInstance` | Read and replace the nested instance |
| `ListProperty` | List of View Model instances | Count, get, append, insert, remove, swap |

Image, Font, Blob, and Artboard properties do not expose value getters or value streams. The View Model instance retains values assigned to these properties until they are replaced, cleared with `nil`, or the instance is released. Keep a strong reference to any decoded image, font, or blob, or created artboard, that you need to keep alive before assigning it. Images and fonts registered as global assets are also retained by the worker.

Nested instances and list items expose their own property APIs.

```swift String theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)

// String
let stringProperty = StringProperty(path: "path/to/string")
let stringValue = try await viewModelInstance.value(of: stringProperty)
viewModelInstance.setValue(of: stringProperty, to: "value")
```

```swift Number theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)

let numberProperty = NumberProperty(path: "path/to/number")
let numberValue = try await viewModelInstance.value(of: numberProperty)
viewModelInstance.setValue(of: numberProperty, to: 9001)
```

```swift Bool theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)

let boolProperty = BoolProperty(path: "path/to/bool")
let boolValue = try await viewModelInstance.value(of: boolProperty)
viewModelInstance.setValue(of: boolProperty, to: true)
```

```swift Color theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)

let colorProperty = ColorProperty(path: "path/to/color")
let colorValue = try await viewModelInstance.value(of: colorProperty)
viewModelInstance.setValue(of: colorProperty, to: Color(red: 255, green: 255, blue: 255, alpha: 255))
```

```swift Enum theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)

let enumProperty = EnumProperty(path: "path/to/enum")
let enumValue = try await viewModelInstance.value(of: enumProperty)
viewModelInstance.setValue(of: enumProperty, to: "value")
```

```swift Trigger theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)

let triggerProperty = TriggerProperty(path: "path/to/trigger")
viewModelInstance.fire(trigger: triggerProperty)
```

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)

var viewModelInstance: RiveDataBindingViewModel.Instance!

// You can get the view model instance when enabling auto binding
riveViewModel.riveModel?.enableAutoBind { instance in
    // Store a reference to instance
    viewModelInstance = instance
}

// Alternatively, you can create a view model instance manually
viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

// Strings
let stringProperty = instance.stringProperty(fromPath: "...")!
// Updating its value
stringProperty.value = "Hello, Rive"
// Get its value
print(stringProperty.value)

// You can also set and get values without storing a strong reference
instance.stringProperty(fromPath: "...").value = "Hello again, Rive"

// Numbers
let numberProperty = instance.numberProperty(fromPath: "...")!
// Updating its value
numberProperty.value = 1337
// Get its value
print(numberProperty.value)

// You can also set and get values without storing a strong reference
instance.numberProperty(fromPath: "...").value = 1337

// Booleans
let booleanProperty = instance.booleanProperty(fromPath: "...")!
// Updating its value
booleanProperty.value = true
// Get its value
print(booleanProperty.value)

// You can also set and get values without storing a strong reference
instance.booleanProperty(fromPath: "...").value = true

// Colors
let colorProperty = instance.colorProperty(fromPath: "...")!
// Updating its value, which is a UIColor/NSColor, so all static helpers apply.
colorProperty.value = .red
// Get its value
print(colorProperty.value)

// You can also set and get values without storing a strong reference
instance.colorProperty(fromPath: "...").value = .red

// Enums
let enumProperty = instance.enumProperty(fromPath: "...")!
// Updating its value
enumProperty.value = "Foo"
// Get its value
print(enumProperty.value)
// Print all possible values
print(enumProperty.values)

// You can also set and get values without storing a strong reference
instance.enumProperty(fromPath: "...").value = "Foo"

// Trigger
let triggerProperty = instance.triggerProperty(fromPath: "...")!
// Fire the trigger
triggerProperty.trigger()
```

### Nested property paths

View models can have properties of type view model, allowing for arbitrary nesting. You can chain property calls on each instance starting from the root until you get to the property of interest. Alternatively, you can do this through a path parameter, which is similar to a URI in that it is a forward slash delimited list of property names ending in the name of the property of interest.

**New Runtime**

Use a `/`-separated path to access a nested property directly, or retrieve the nested instance with `ViewModelInstanceProperty`:

```swift theme={null}
let title = StringProperty(path: "header/title")
viewModelInstance.setValue(of: title, to: "Welcome")

let headerProperty = ViewModelInstanceProperty(path: "header")
let header = viewModelInstance.value(of: headerProperty)
header.setValue(of: StringProperty(path: "title"), to: "Welcome")

let replacement = try await file.createViewModelInstance(
    .viewModelDefault(from: .name("Header"))
)
viewModelInstance.setValue(of: headerProperty, to: replacement)
```

Create replacements with a View Model compatible with the nested property, using the same worker.

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)

var viewModelInstance: RiveDataBindingViewModel.Instance!

// You can get the view model instance when enabling auto binding
riveViewModel.riveModel?.enableAutoBind { instance in
    // Store a reference to instance
    viewModelInstance = instance
}

// Alternatively, you can create a view model instance manually
viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

let nestedNumberByChain = instance
                            .viewModelInstanceProperty(fromPath: "Nested View Model")
                            .viewModelInstanceProperty(fromPath: "Another Nested View Model")
                            .numberProperty(fromPath: "Number")

let nestedNumberByPath = instance.numberProperty(fromPath: "Nested View Model/Another Nested View Model/Number")
```

### Observability

You can observe changes over time to property values, either by using listeners or a platform equivalent method. Once observed, you will be notified when the property changes are applied by a state machine advance, whether that is a new value that has been explicitly set or if the value was updated as a result of a binding.

**New Runtime**

`RiveController` automatically redraws after changes to bound main and global instances, including nested and list child instances. You do not need to subscribe to the deprecated `dirtyStream()` API to request redraws. Use property streams to react to values in your app.

String, Number, Boolean, Color, and Enum properties expose changes through Swift Concurrency's async throwing streams. Call `valueStream(of:)` on a `ViewModelInstance` object.

```swift theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)
let stringProperty = StringProperty(path: "path/to/string")
let valueStream = viewModelInstance.valueStream(of: stringProperty)
do {
    for try await value in valueStream {
        print(value)
    }
} catch let error as ViewModelInstanceError {
    // The thrown error should always be a ViewModelInstanceError type
    print(error)
} catch {
    print(error)
}
```

For triggers, you can listen to them by calling the `stream(of:)` method on a `ViewModelInstance` object. This returns a stream of `Void` values, which can be ignored.

```swift theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)
let triggerProperty = TriggerProperty(path: "path/to/trigger")
let triggerStream = viewModelInstance.stream(of: triggerProperty)
do {
    for try await _ in triggerStream {
        print("Trigger fired!")
    }
} catch let error as ViewModelInstanceError {
    // The thrown error should always be a ViewModelInstanceError type
    print(error)
} catch {
    print(error)
}
```

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)

var viewModelInstance: RiveDataBindingViewModel.Instance!

// You can get the view model instance when enabling auto binding
riveViewModel.riveModel?.enableAutoBind { instance in
    // Store a reference to instance
    viewModelInstance = instance
}

// Alternatively, you can create a view model instance manually
viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

// Get the String property
let stringProperty = instance.stringProperty(fromPath: "...")!

// Add a listener
let listener = stringProperty.addListener { newValue in
    print(newValue)
}

// Remove a listener, where listener is the return value of addListener
stringProperty.removeListener(listener)

// Trigger properties can also be listened to for when they are triggered
instance.triggerProperty(fromPath: "...")!.addListener {
    print("Triggered!")
}
```

### Images

Image properties let you set and replace raster images at runtime, with each instance of the image managed independently. For example, you could build an avatar creator and dynamically update features — like swapping out a hat — by setting a view model's image property.

**New Runtime**

To set an image, you first need to decode an image from a `Worker`. This has to be the `Worker` that was used when initializing a `File`, from which you are setting the Image property of a view model instance.

```swift theme={null}
let worker = try await Worker()
let file = try await File(source: ..., worker: worker)
let viewModelInstance = try await file.createViewModelInstance(...)
let imageProperty = ImageProperty(path: "path/to/image")
let imageData: Data = ...
let image = try await worker.decodeImage(from: imageData)
viewModelInstance.setValue(of: imageProperty, to: image)
// Clear the image when needed.
viewModelInstance.setValue(of: imageProperty, to: nil)
```

**Legacy Runtime**

```swift theme={null}
let riveViewModel = RiveViewModel(...)

var viewModelInstance: RiveDataBindingViewModel.Instance!

// You can get the view model instance when enabling auto binding
riveViewModel.riveModel?.enableAutoBind { instance in
    // Store a reference to instance
    viewModelInstance = instance
}

// Alternatively, you can create a view model instance manually
viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

// Create a RiveRenderImage from data
let data = Data(...)
var image = RiveRenderImage(data: data)! // This can return nil if the data is not a valid image

// Or, create a RiveRenderImage from a UIImage
image = RiveRenderImage(image: UIImage(named: "my_image")!, format: .png)! // This can return nil if the image is not a valid jpg or png image

let imageProperty = viewModelInstance.imageProperty(fromPath: "image")!

// Once you have your data binding view model instance, you can set the Image property value
imageProperty.setValue(image)

// You can also pass nil to clear the image
imageProperty.setValue(nil)
```

## Fonts

In the Apple concurrency API, decode a font with the same `Worker` used to load the instance's file, then assign it to a `FontProperty`.

```swift theme={null}
let fontData: Data = ...
let font = try await worker.decodeFont(from: fontData)
let fontProperty = FontProperty(path: "headingFont")
viewModelInstance.setValue(of: fontProperty, to: font)

// Clear the font when needed.
viewModelInstance.setValue(of: fontProperty, to: nil)
```

`decodeFont(from:)` also accepts `UIFont` on UIKit platforms and `NSFont` on macOS. See [Loading Assets](/docs/runtimes/apple/loading-assets) for decoding and global registration options.

## Blobs

A blob holds arbitrary binary data. Decode it with the same worker as the instance's file, then assign it to a Blob property:

```swift theme={null}
let data = Data([0x01, 0x02, 0x03])
let blob = try await worker.decodeBlob(from: data)
let blobProperty = BlobProperty(path: "payload")
viewModelInstance.setValue(of: blobProperty, to: blob)

// Clear the blob when needed.
viewModelInstance.setValue(of: blobProperty, to: nil)
```

### Lists

List properties let you manage a dynamic set of view model instances at runtime. For example, you can build a to-do app where users can add and remove tasks in a scrollable Layout.

See the [Editor section](/docs/editor/data-binding/lists) on creating data bound lists.

A single list property can include different view model types, with each view model tied to its own Component, making it easy to populate a list with a variety of Component instances.

With list properties, you can:

* Add a new view model instance (optionally at an index)
* Remove an existing view model instance (optionally by index)
* Swap two view model instances by index
* Get the size of a list

For more information on list properties, see the [Data Binding List Property](/docs/editor/data-binding/lists#view-model-list-property) editor documentation.

**New Runtime**

```swift theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)
let listProperty = ListProperty(path: "path/to/list")

let size = try await viewModelInstance.size(of: listProperty)

// Result: [newInstance]
let newInstance = try await file.createViewModelInstance(...)
viewModelInstance.appendInstance(newInstance, to: listProperty)

// Result: [insertedInstance, newInstance]
let insertedInstance = try await file.createViewModelInstance(...)
viewModelInstance.insertInstance(insertedInstance, to: listProperty, at: 0)

// Result: [newInstance, insertedInstance]
viewModelInstance.swapInstance(atIndex: 0, withIndex: 1, in: listProperty)

// Result: [newInstance]
viewModelInstance.removeInstance(at: 1, from: listProperty)

// Result: newInstance
let _ = viewModelInstance.value(of: listProperty, at: 0)

// Result: []
viewModelInstance.removeInstance(newInstance, from: listProperty)

// Result: 0
let finalSize = try await viewModelInstance.size(of: listProperty)
```

**Legacy Runtime**

```swift theme={null}
let listProperty = viewModelInstance.listProperty(fromPath: "list")!

// Create a new view model instance and add it to the end of the list
let firstInstance = viewModel.createInstanceByName("First Instance")!
listProperty.add(firstInstance)

// Create a new view model instance and add it to the beginning of the list
let secondInstance = myViewModel.createInstanceByName("Second Instance")!
listProperty.add(secondInstance, atIndex: 0)

// Swap the first and second instances
listProperty.swapInstance(atIndex: 0, withInstanceAtIndex: 1)

// Remove both instances
listProperty.removeInstance(secondInstance)
listProperty.removeInstance(atIndex: 0)

// Get and print the size of the list
print(listProperty.size) // Prints 0
```

### Artboards

Artboard properties allows you to swap out entire components at runtime. This is useful for creating modular components that can be reused across different designs or applications, for example:

* Creating a skinning system that supports a large number of variations, such as a character creator where you can swap out different body parts, clothing, and accessories.
* Creating a complex scene that is a composition of various artboards loaded from various different Rive files (drawn to a single canvas/texture/widget).
* Reducing the size (complexity) of a single Rive file by breaking it up into smaller components that can be loaded on demand and swapped in and out as needed.

**New Runtime**

```swift theme={null}
let file: File = ...
let viewModelInstance = try await file.createViewModelInstance(...)
let artboardProperty = ArtboardProperty(path: "path/to/artboard")
let artboard = try await file.createArtboard(...)
viewModelInstance.setValue(of: artboardProperty, to: artboard)
// Clear the artboard when needed.
viewModelInstance.setValue(of: artboardProperty, to: nil)
```

**Legacy Runtime**

Use the `artboardProperty` method on a `RiveDataBindingViewModel.Instance` object to get the Artboard property.

Then use the `setValue` method on the Artboard property object to set the new artboard value.

`setValue` accepts a `RiveBindableArtboard` object, which is a wrapper for an artboard that can be used to set the Artboard property value.

You can get a `RiveBindableArtboard` object by using the `bindableArtboard` methods on a `RiveFile` object.

```swift theme={null}
let artboardProperty = instance.artboardProperty(fromPath: "Artboard")!

let components = RiveFile(...)
let bindableArtboard = components.bindableArtboard(at: 0)!
let bindableArtboard2 = components.bindableArtboard(withName: "...")!

artboardProperty.setValue(bindableArtboard)
```

### Enums

Enums properties come in two flavors: system and user-defined. In practice, you will not need to worry about the distinction, but just be aware that system enums are available in any Rive file that binds to an editor-defined enum set, representing options from the editor's dropdowns, where user-defined enums are those defined by a designer in the editor.

Enums are string typed. The Rive file contains a list of enums. Each enum in turn has a name and a list of strings.

## Examples

See the [Data Binding view](https://github.com/rive-app/rive-ios/blob/main/Example-iOS/Source/Examples/SwiftUI/DataBindingView.swift) in the Example app for a demo.
