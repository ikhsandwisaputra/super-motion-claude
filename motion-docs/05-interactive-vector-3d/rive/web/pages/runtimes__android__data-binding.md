---
source: https://rive.app/docs/runtimes/android/data-binding
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

**Compose**

Unlike other runtimes, view models do not exist as a separate object in the Compose API. Instead, they are represented as a `ViewModelSource` sealed class that forms half of a builder pattern used to create view model instances. See [View Model Instances](#view-model-instances) for details on the other half - creating instances.

```kotlin theme={null}
// Named source
val vmSource = ViewModelSource.Named("My View Model")
// Default for artboard source
val vmSource = ViewModelSource.DefaultForArtboard(artboard)
```

**Legacy**

```kotlin theme={null}
// `view` of type RiveAnimationView
view.setRiveResource(R.raw.my_rive_file)
val file = view.controller.file!!

// Get reference by name
val vm = file.getViewModelByName("My View Model")

// Get reference by index
for (i in 0 until file.viewModelCount) {
    val indexedVM = file.getViewModelByIndex(i)
}

// Get reference to the default view model
val defaultVM = file.defaultViewModelForArtboard(view.controller.activeArtboard!!)
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

**Compose**

See [View Models](#view-models) for how to get a `ViewModelSource` to use below. With that, you can use the builder pattern to create a `ViewModelInstanceSource`, the second half. That source can then be passed to `rememberViewModelInstance` to create and remember the instance for the lifetime of the composition.

```kotlin theme={null}
// From previous section
val vmSource = ViewModelSource.Named("My View Model")

// Blank instance source
val vmiSourceBlank = ViewModelInstanceSource.Blank(vmSource)
// or
val vmiSourceBlank = vmSource.blankInstance()

// Default instance source
val vmiSourceDefault = ViewModelInstanceSource.Default(vmSource)
// or
val vmiSourceDefault = vmSource.defaultInstance()

// Named instance source
val vmiSourceNamed = ViewModelInstanceSource.Named(vmSource, "My Instance")
// or
val vmiSourceNamed = vmSource.namedInstance("My Instance")

// The completed source can now be used along with the Rive file to create and remember the instance
val viewModelInstance = rememberViewModelInstance(riveFile, vmiSourceNamed)
```

Additionally, you can reference a nested view model instance from within a parent instance using the `Reference` variant.

```kotlin theme={null}
val myVMI = rememberViewModelInstance(riveFile, mySource)
val referenceSource = ViewModelInstanceSource.Reference(myVMI, "Path/To/Nested VMI")
val nestedVMI = rememberViewModelInstance(riveFile, referenceSource)
```

**Legacy**

```kotlin theme={null}
val vm = view.controller.file?.getViewModelByName("My View Model")!!

// Create blank
val vmiBlank = vm.createBlankInstance()

// Create default
val vmiDefault = vm.createDefaultInstance()

// Create by index
for (i in 0 until vm.instanceCount) {
    val vmiIndexed = vm.createInstanceFromIndex(i)
}

// Create by name
val vmiNamed = vm.createInstanceFromName("My Instance")
```

### Binding

The created instance can then be assigned to a state machine or artboard. This establishes the bindings set up at edit time.

It is preferred to assign to a state machine, as this will automatically apply the instance to the artboard as well. Only assign to an artboard if you are not using a state machine, i.e. your file is static or uses linear animations.

> [!NOTE]
>
> The initial values of the instance are not applied to their bound elements until the state machine or artboard advances.

**Compose**

See the [Compose data binding example](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeDataBindingActivity.kt).

Binding to the state machine happens automatically when the `ViewModelInstance` is passed to the `Rive` composable.

```kotlin {6} theme={null}
val vmiSource = ViewModelSource.Named("My View Model").namedInstance("My Instance")
val vmi = rememberViewModelInstance(riveFile, vmiSource)

Rive(
    riveFile,
    viewModelInstance = vmi
)
```

**Legacy**

See the [Legacy data binding example](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LegacyDataBindingActivity.kt).

```kotlin theme={null}
view.setRiveResource(
    R.raw.my_rive_file,
    artboardName = "My Artboard",
)

val vm = view.controller.file?.getViewModelByName("My View Model")!!
val vmi = vm.createInstanceFromName("My Instance")

// Apply the instance to the state machine (preferred)
view.controller.stateMachines.first().viewModelInstance = vmi

// Alternatively, apply the instance to the artboard
view.controller.activeArtboard?.viewModelInstance = vmi
```

### Auto-Binding

Alternatively, you may prefer to use auto-binding. This will automatically bind the default view model of the artboard using the default instance to both the state machine and the artboard. The default view model is the one selected on the artboard in the editor dropdown. The default instance is the one marked "Default" in the editor.

**Compose**

Auto-binding does not exist in the Compose API due to the nature of composables. Since they are functions, it is difficult to get values out of them as compared to classes. Callbacks would require a null placeholder to remember the value before it has fired which creates more overhead than supplying the instance directly.

The equivalent is to create a view model instance with no source. This will internally create the default artboard, the default view model for that artboard, and the default instance for that view model. You can then pass that into the `Rive` composable.

```kotlin theme={null}
val vmi = rememberViewModelInstance(riveFile)
Rive(
    riveFile,
    viewModelInstance = vmi,
)
```

**Legacy**

```kotlin {3} theme={null}
view.setRiveResource(
    R.raw.my_rive_file,
    autoBind = true,
)
```

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

**Compose**

Getting view model properties is a suspend operation, so it needs to be called from a coroutine scope such as `LaunchedEffect`.

```kotlin theme={null}
LaunchedEffect(riveFile) {
    riveFile.getViewModelProperties("My View Model").forEach { property ->
        Log.d("My Tag", "Property Name: ${property.name}, Type: ${property.type}")
    }
}
```

**Legacy**

```kotlin theme={null}
val vm = view.controller.file?.getViewModelByName("My View Model")!!

// A list of properties
val properties = vm.properties
assertContains(
    properties,
    ViewModel.Property(ViewModel.PropertyDataType.NUMBER, "My Number Property")
)
```

### Reading and writing properties

References to these properties can be retrieved by name or path.

Some properties are mutable and have getters, setters, and observer operations for their values. Getting or observing the value will retrieve the latest value set on that property's binding, as of the last state machine or artboard advance. Setting the value will update the value and all of its bound elements.

> [!NOTE]
>
> After setting a property's value, the changes will not apply to their bound elements until the state machine or artboard advances.

**Compose**

### Writing Values

The Compose API does not have explicit property objects. Instead, property values are set on the `ViewModelInstance` directly using methods which take their path.

```kotlin theme={null}
val vmi = rememberViewModelInstance(...)
vmi.setNumberProperty("Path/To/Property", 10f)
```

### Reading  Values

Values are read throw a Kotlin [`Flow`](https://kotlinlang.org/docs/flow.html) which emits the latest value whenever it changes. You can collect this flow in a `LaunchedEffect` or convert it to a `State` using `collectAsState()` (or use `collectAsStateWithLifecycle()` to only collect during certain lifecycle states).

To get the latest value once without observing, you can use the terminal `first()` operator.

```kotlin theme={null}
val vmi = rememberViewModelInstance(...)
// Collect as State
val numberValue by vmi.numberPropertyFlow("Path/To/Property").collectAsState(initial = 0f)

Text(text = "Number value: $numberValue")

// Or collect
LaunchedEffect(vmi) {
    vmi.numberPropertyFlow("Path/To/Property").collect { value ->
        Log.d("Rive", "Number value changed: $value")
    }

    // Or get once
    val numberValue = vmi.numberPropertyFlow("Path/To/Property").first()
    Log.d("Rive", "Current number value: $numberValue")
}
```

**Legacy**

```kotlin theme={null}
val vm = view.controller.file?.getViewModelByName("My View Model")!!
val vmi = vm.createInstanceFromName("My Instance")

val numberProperty = vmi.getNumberProperty("My Number Property")
// Get
val numberValue = numberProperty.value
// Set
numberProperty.value = 10f
```

### Nested property paths

View models can have properties of type view model, allowing for arbitrary nesting. You can chain property calls on each instance starting from the root until you get to the property of interest. Alternatively, you can do this through a path parameter, which is similar to a URI in that it is a forward slash delimited list of property names ending in the name of the property of interest.

**Compose**

```kotlin theme={null}
val parent = rememberViewModelInstance(riveFile, ViewModelSource.Named("Parent VM").namedInstance("Parent"))

// Using references
val child = rememberViewModelInstance(riveFile, ViewModelInstanceSource.Reference(parent, "Child"))
val nestedNumber = child.numberPropertyFlow("My Nested Number").collectAsState(0f)

// Or using paths
val nestedNumber = parent.numberPropertyFlow("Child/My Nested Number").collectAsState(0f)
```

**Legacy**

```kotlin theme={null}
val vm = view.controller.file?.getViewModelByName("My View Model")!!
val vmi = vm.createInstanceFromName("My Instance")

val nestedNumberByChain = vmi
    .getInstanceProperty("My Nested View Model")
    .getInstanceProperty("My Second Nested VM")
    .getNumberProperty("My Nested Number")

val nestedNumberByPath = vmi
    .getNumberProperty("My Nested View Model/My Second Nested VM/My Nested Number")
```

### Observability

You can observe changes over time to property values, either by using listeners or a platform equivalent method. Once observed, you will be notified when the property changes are applied by a state machine advance, whether that is a new value that has been explicitly set or if the value was updated as a result of a binding.

**Compose**

Observability is the default behavior when using the Compose API with Kotlin Flows. When you collect a property's flow, you will receive updates whenever the property's value changes.

```kotlin theme={null}
val vmi = rememberViewModelInstance(...)
val numberPropertyFlow = vmi.numberPropertyFlow("My Number Property").collectAsState(0f)
```

**Legacy**

```kotlin theme={null}
val vm = view.controller.file?.getViewModelByName("My View Model")!!
val vmi = vm.createInstanceFromName("My Instance")

val numberProperty = vmi.getNumberProperty("My Number Property")
// Observe
lifecycleScope.launch {
    numberProperty.valueFlow.collect { value ->
        Log.i("MyActivity", "Value: $value")
    }
}
// Or collect in Compose
val numberValue by numberProperty.valueFlow.collectAsState(0f) // 0 as the initial value while waiting for the first value
```

### Images

Image properties let you set and replace raster images at runtime, with each instance of the image managed independently. For example, you could build an avatar creator and dynamically update features — like swapping out a hat — by setting a view model's image property.

**Compose**

See the [Compose data binding images example](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeImageBindingActivity.kt).

To set an image property, you need an `ImageAsset`, which can be created from `rememberImage` using a byte array. The below example loads from raw resources into a `Result` for convenience, but you should use the pattern most appropriate for your app.

```kotlin theme={null}
val imageBytes by produceState<Result<ByteArray>>(Result.Loading) {
    value = withContext(Dispatchers.IO) {
        context.resources.openRawResource(R.raw.my_image)
            .use { Result.Success(it.readBytes()) }
    }
}

// `andThen` maps over the Result to only call the lambda if it's a Success, propagating Failure and Loading otherwise.
val image = imageBytes.andThen { bytes ->
    rememberImage(riveWorker, bytes)
}

// Or combine into one statement
val image = produceState<Result<ByteArray>>(Result.Loading) {
    value = withContext(Dispatchers.IO) {
        context.resources.openRawResource(R.raw.my_image)
            .use { Result.Success(it.readBytes()) }
    }
}.value.andThen { bytes ->
    rememberImage(riveWorker, bytes)
}

val vmi = rememberViewModelInstance(riveFile, ViewModelSource.Named("My View Model").defaultInstance())
LaunchedEffect(vmi, image) {
    when(image) {
        is Result.Failure -> { /* Handle failure to load image */ }
        is Result.Loading -> { /* Handle loading state if needed */ }
        is Result.Success -> {
            // Set the image property value
            vmi.setImage("Image property", image.value)
        }
    }
}
```

If you want to gate the presentation of your Rive content until the image is loaded and only if both are successful, you can use the `zip` convenience function to combine multiple `Result` objects together.

```kotlin theme={null}
val fileAndImage = riveFile.zip(image)

when (fileAndImage) {
    is Result.Failure -> { /* Handle failure to load file or image */ }
    is Result.Loading -> { /* Handle loading state if needed */ }
    is Result.Success -> {
        val (riveFile, image) = fileAndImage.value
        // Both riveFile and image are loaded successfully here
        // You can now present your Rive content and set the image property
    }
}
```

For more information on image assets, see [Loading Assets](/docs/runtimes/android/loading-assets).

**Legacy**

```kotlin theme={null}
// Load image from the assets folder.
val imageBytes = context.resources.openRawResource(R.raw.my_image).use { stream ->
  stream.readBytes()
}

val vmi = it.stateMachines.first().viewModelInstance!!

// Replace image property in view model instance with new image.
val riveImage = RiveRenderImage.fromEncoded(imageBytes)
vmi.getImageProperty("Image property").set(riveImage)
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

**Compose**

See the [Compose data binding lists example](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeListActivity.kt).

```kotlin theme={null}
val mainVMI = rememberViewModelInstance(riveFile)
val newListItem = rememberViewModelInstance(riveFile, ViewModelSource.Named("My Item VM").namedInstance("My List Item"))
LaunchedEffect(mainVMI, newListItem) {
    val listProperty = "My List"

    // Add new item to the end of the list
    mainVMI.appendToList(listProperty, newListItem)
    // Insert new item at index 0
    mainVMI.insertToListAtIndex(listProperty, 0, newListItem)

    // Swap items at index 0 and 1
    mainVMI.swapListItems(listProperty, 0, 1)

    // Remove specific instance
    mainVMI.removeFromList(listProperty, newListItem)
    // Remove item at index 0
    mainVMI.removeFromListAtIndex(listProperty, 0)
}
```

Due to the dynamic nature of lists, you may need to create items within a coroutine rather than ahead of time with `rememberViewModelInstance`. Be aware that adding the same instance multiple times to a list will cause them all to share state, which may not be the desired behavior. Use the following pattern to create new instances as needed.

```kotlin theme={null}
val mainVMI = rememberViewModelInstance(riveFile)
LaunchedEffect(mainVMI) {
    val listProperty = "My List"
    // ⚠️ This must be `close`d, which is done here through `AutoCloseable.use`.
    ViewModelInstance.fromFile(
        riveFile,
        ViewModelSource.Named("My Item VM").defaultInstance()
    ).use { item ->
        mainVMI.insertToListAtIndex(listProperty, 0, item)
    }
}
```

**Legacy**

```kotlin theme={null}
// Acquire the default view model instance and the list property.
val vmi = animationView.file!!.firstArtboard.viewModelInstance!!
val listProperty = vmi.getListProperty("list")

// Create a view model instance for "First" and "Second" and add them to the list.
val firstInstance = animationView.file!!.getViewModelByName("My Item VM").createInstanceFromName("First")
listProperty.add(firstInstance)

val secondInstance = animationView.file!!.getViewModelByName("My Item VM").createInstanceFromName("Second")
listProperty.add(secondInstance)

// Swap the two items in the list.
listProperty.swap(0, 1)

// Remove both items from the list.
listProperty.remove(firstInstance)
listProperty.removeAt(0)
```

### Artboards

Artboard properties allows you to swap out entire components at runtime. This is useful for creating modular components that can be reused across different designs or applications, for example:

* Creating a skinning system that supports a large number of variations, such as a character creator where you can swap out different body parts, clothing, and accessories.
* Creating a complex scene that is a composition of various artboards loaded from various different Rive files (drawn to a single canvas/texture/widget).
* Reducing the size (complexity) of a single Rive file by breaking it up into smaller components that can be loaded on demand and swapped in and out as needed.

**Compose**

See the [Compose data binding artboards example](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeArtboardBindingActivity.kt).

```kotlin theme={null}
val vmi = rememberViewModelInstance(mainFile)
val artboard = rememberArtboard(mainFile, "My Artboard")

LaunchedEffect(vmi, artboard) {
    vmi.setArtboard("My Artboard Property", artboard)
}
```

**Legacy**

```kotlin theme={null}
// Acquire the default view model instance and the artboard property.
val vmi = animationView.file!!.firstArtboard.viewModelInstance!!
val artboardProperty = vmi.getArtboardProperty("My Artboard Property")

// Set artboard from same file.
val localArtboard = animationView.file!!.getArtboard("My Artboard")
artboardProperty.set(localArtboard)

// Load external file if needed
val externalFile = File.load(context.assets, "external_file.riv")

// Set artboard from external file.
val externalArtboard = externalFile.getArtboard("My External Artboard")
artboardProperty.set(externalArtboard)

// Clean up external file when done
externalFile.dispose()
```

You can also create a bindable artboard with a view model instance to control its state.

```kotlin theme={null}
// Create the view model instance for the child artboard.
val childVmi = childFile.getViewModelByName("ChildVM").createBlankInstance()
val bindableArtboard = childFile.createBindableArtboardByName("Child", childVmi)

// Get the artboard property from the main artboard.
val vmi = rive.file!!.firstArtboard.viewModelInstance!!
val artboardProperty = vmi.getArtboardProperty("Artboard property")

// Set the bound artboard VMIs state.
childVmi.getNumberProperty("rotation").value = 90f

// Set the bound artboard on the main artboard.
artboardProperty.set(bindableArtboard)

// Release the reference we hold from creation.
bindableArtboard.release()
```

### Enums

Enums properties come in two flavors: system and user-defined. In practice, you will not need to worry about the distinction, but just be aware that system enums are available in any Rive file that binds to an editor-defined enum set, representing options from the editor's dropdowns, where user-defined enums are those defined by a designer in the editor.

Enums are string typed. The Rive file contains a list of enums. Each enum in turn has a name and a list of strings.

**Compose**

```kotlin theme={null}
LaunchedEffect(riveFile) {
    val enums = riveFile.getEnums()
    Log.i("RiveEnums", "First enum name: ${enums[0].name}")
}
```

**Legacy**

```kotlin theme={null}
val enums = view.controller.file?.enums!!

val firstEnumName = enums[0].name
val firstEnumFirstValue = enums[0].values[0]
```

## Examples

**Compose**

See the following examples:

* [Data Binding Overview](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeDataBindingActivity.kt)
* [Data Binding Images](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeImageBindingActivity.kt)
* [Data Binding Artboards](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeArtboardBindingActivity.kt)
* [Data Binding Lists](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeListActivity.kt)

**Legacy**

See the [data binding overview example](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LegacyDataBindingActivity.kt).
