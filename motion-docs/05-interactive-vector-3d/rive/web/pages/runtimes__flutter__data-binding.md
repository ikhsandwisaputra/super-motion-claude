---
source: https://rive.app/docs/runtimes/flutter/data-binding
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

> [!NOTE]
>
> If you're using a `RiveWidgetController`, you can skip the step of creating a `ViewModel`. Go to [View Model Instances](#view-model-instances).

```dart theme={null}
// Get reference to the File and Artboard
final file = await File.asset(
    'assets/my_file.riv',
    riveFactory: Factory.rive,
);
final artboard = file!.defaultArtboard()!;

// Get reference by name
file.viewModelByName("My View Model");

// Get reference by index
for (var i = 0; i < file.viewModelCount; i++) {
    final indexedVM = file.viewModelByIndex(i);
}

// Get reference to the default view model for an artboard
final defaultVM = file.defaultArtboardViewModel(artboard);

// Dispose the view model when you're no longer using it
viewModel.dispose();
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

If you're using  `RiveWidgetController`:

```dart theme={null}
// Get reference to the File
file = await File.asset(
    'assets/rewards.riv',
    riveFactory: Factory.rive,
);

// Create a controller
controller = RiveWidgetController(file!);

// Data bind by name
viewModelInstance = controller.dataBind(DataBind.byName('My View Model'));

// Data bind by index
viewModelInstance = controller.dataBind(DataBind.byIndex(0));

// Auto data bind
viewModelInstance = controller.dataBind(DataBind.auto());

// Bind some existing view model instance to the controller:
viewModelInstance = controller.dataBind(DataBind.byInstance(someViewModelInstance));

// Dispose of objects you created when no longer needed
viewModelInstance.dispose();
controller.dispose();
file.dispose();
```

If you want to manage the creation of view model instances yourself:

```dart theme={null}
final vm = file.viewModelByName("My View Model")!;

// Create blank
final vmiBlank = vm.createInstance();

// Create default
final vmiDefault = vm.createDefaultInstance();

// Create by index
for (int i = 0; i < vm.instanceCount; i++) {
final vmiIndexed = vm.createInstanceByIndex(i);
}

// Create by name
final vmiNamed = vm.createInstanceByName("My Instance");

// Dispose the view model instance
viewModelInstance.dispose();
```

### Binding

The created instance can then be assigned to a state machine or artboard. This establishes the bindings set up at edit time.

It is preferred to assign to a state machine, as this will automatically apply the instance to the artboard as well. Only assign to an artboard if you are not using a state machine, i.e. your file is static or uses linear animations.

> [!NOTE]
>
> The initial values of the instance are not applied to their bound elements until the state machine or artboard advances.

If you're using `RiveWidgetController` the binding happens automatically when you call any of the following:

```dart theme={null}
viewModelInstance = controller.dataBind(DataBind.auto());
viewModelInstance = controller.dataBind(DataBind.byName('My View Model'));
viewModelInstance = controller.dataBind(DataBind.byIndex(0));
viewModelInstnace = controller.dataBind(DataBind.byInstance(someViewModelInstance));
```

Else, you need to make sure to bind the view model instance to the state machine, or artboard.

```dart theme={null}
final file = await File.asset(
'assets/my_file.riv',
riveFactory: Factory.rive,
);

final artboard = file!.defaultArtboard();
final stateMachine = artboard!.defaultStateMachine()!;

final vm = file.defaultArtboardViewModel(artboard)!;
final vmi = vm.createDefaultInstance()!;

// Bind to the state machine. This automatically binds to the artboard as well.
stateMachine.bindViewModelInstance(vmi);

// If you're not using a state machine, bind to the artboard
artboard.bindViewModelInstance(vmi);
```

### Auto-Binding

Alternatively, you may prefer to use auto-binding. This will automatically bind the default view model of the artboard using the default instance to both the state machine and the artboard. The default view model is the one selected on the artboard in the editor dropdown. The default instance is the one marked "Default" in the editor.

```dart theme={null}
// Get reference to the File
file = await File.asset(
    'assets/rewards.riv',
    riveFactory: Factory.rive,
);

// Create a controller
controller = RiveWidgetController(file!);

// Auto data bind
viewModelInstance = controller.dataBind(DataBind.auto());

// Dispose of objects you created when no longer needed
viewModelInstance.dispose();
controller.dispose();
file.dispose();
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

```dart theme={null}
// Access on a ViewModel object
print("Properties: ${viewModel.properties}");

// Access on a ViewModelInstance object
print("Properties: ${viewModelInstance.properties}");
```

### Reading and writing properties

References to these properties can be retrieved by name or path.

Some properties are mutable and have getters, setters, and observer operations for their values. Getting or observing the value will retrieve the latest value set on that property's binding, as of the last state machine or artboard advance. Setting the value will update the value and all of its bound elements.

> [!NOTE]
>
> After setting a property's value, the changes will not apply to their bound elements until the state machine or artboard advances.

```dart theme={null}
// Get reference to the ViewModel instance
final vmi = someExistingViewModelInstance;

final numberProperty = vmi.number("My Number Property")!;
// Get
final numberValue = numberProperty.value;

// Set
numberProperty.value = 10;

// Observe
void onNumberChange(double value) {
    print("Number changed to: $value");
}
numberProperty.addListener(onNumberChange);

// Remove listener when done
numberProperty.removeListener(onNumberChange);

// Alternatively, clear all listeners
numberProperty.clearListeners();

// Dispose of the property to clear up resources when you're no longer using it
// This will call `clearListeners()` internally.
numberProperty.dispose();
```

### Nested property paths

View models can have properties of type view model, allowing for arbitrary nesting. You can chain property calls on each instance starting from the root until you get to the property of interest. Alternatively, you can do this through a path parameter, which is similar to a URI in that it is a forward slash delimited list of property names ending in the name of the property of interest.

```dart theme={null}
// Get reference to the ViewModel instance
final vmi = someExistingViewModelInstance;

final nestedNumberByChain = vmi
    .viewModel("My Nested View Model")!
    .viewModel("My Second Nested VM")!
    .number("My Nested Number");

final nestedNumberByPath = vmi.number("My Nested View Model/My Second Nested VM/My Nested Number");
```

### Observability

You can observe changes over time to property values, either by using listeners or a platform equivalent method. Once observed, you will be notified when the property changes are applied by a state machine advance, whether that is a new value that has been explicitly set or if the value was updated as a result of a binding.

```dart theme={null}
// Get reference to the ViewModel instance
final vmi = someExistingViewModelInstance;

final numberProperty = vmi.number("My Number Property")!;
// Get
final numberValue = numberProperty.value;

// Set
numberProperty.value = 10;

// Observe
void onNumberChange(double value) {
    print("Number changed to: $value");
}
numberProperty.addListener(onNumberChange);

// Remove listener when done
numberProperty.removeListener(onNumberChange);

// Alternatively, clear all listeners
numberProperty.clearListeners();

// Dispose of the property to clear up resources when you're no longer using it
// This will call `clearListeners()` internally.
numberProperty.dispose();
```

### Images

Image properties let you set and replace raster images at runtime, with each instance of the image managed independently. For example, you could build an avatar creator and dynamically update features — like swapping out a hat — by setting a view model's image property.

> [!NOTE]
>
> See the [Flutter data binding images example](https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_images.dart).

```dart theme={null}
// Access the image property by path on a ViewModelInstance object
final imageProperty = viewModelInstance.image('my_image')!; // image property named "my_image"

// Create a RenderImage
final renderImage = await Factory.rive.decodeImage(bytes); // use `Factory.flutter` if you're using the Flutter renderer

// If the image is valid, update the image property value
if (renderImage != null) {
    imageProperty.value = renderImage;
}

// You can also set the image property to null to clear it
imageProperty.value = null;
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

The list API in Flutter is designed to be similar to the [List](https://api.dart.dev/dart-core/List-class.html) class in Dart. It doesn't contain the full API spec of that class, but it does provide the most commonly used methods.

> [!WARNING]
>
> Working with lists can result in errors ([`RangeError`](https://api.flutter.dev/flutter/dart-core/RangeError-class.html)) being thrown if you try to access an index that is out of bounds, or perform other list operations that are not permitted. Similar to the Dart List API.

Access a list property by path on a `ViewModelInstance` object:

```dart Access a List property theme={null}
final todosProperty = viewModelInstance.list('todos')!; // list property named "todos"
print(todosProperty.length); // print the length of the list
```

To add an item you first need to create an instance of the view model that you want to add to the list:

```dart Create a blank view model instance theme={null}
final todoItemVM = riveFile.viewModelByName("TodoItem")!;
final todoItemInstance = todoItemVM.createInstance()!;
```

You can also create an instance from an existing instance (as exported in the Rive Editor), using:

* `createDefaultInstance()`
* `createInstanceByName('exercise')`
* `createInstanceByIndex(0)`.

Then add the instance to the list:

```dart Add an instance to the list theme={null}
todosProperty.add(todoItemInstance);
```

To remove a particular instance from the list, you can use the `remove` method:

```dart Remove an instance from the list theme={null}
todosProperty.remove(todoItemInstance);
```

Other operations:

```dart List operations theme={null}
// Remove at index
todosProperty.removeAt(0); // can throw

// Insert at index
todosProperty.insert(0, todoItemInstance); // can throw

// Swap
todosProperty.swap(0, 1); // can throw

// First
ViewModelInstance todo = todosProperty.first(); // can throw

// Last
ViewModelInstance todo = todosProperty.last(); // can throw

// First or null
ViewModelInstance? todo todosProperty.firstOrNull(); // will return null if the list is empty

// Last or null
ViewModelInstance? todosProperty.lastOrNull(); // will return null if the list is empty

// Access/set directly by index
final instance = todosProperty[0]; // can throw
todosProperty[0] = todoItemInstance; // can throw

// Instance at index
todosProperty.instanceAt(2); // can throw

// Length
todosProperty.length;
```

### Artboards

Artboard properties allows you to swap out entire components at runtime. This is useful for creating modular components that can be reused across different designs or applications, for example:

* Creating a skinning system that supports a large number of variations, such as a character creator where you can swap out different body parts, clothing, and accessories.
* Creating a complex scene that is a composition of various artboards loaded from various different Rive files (drawn to a single canvas/texture/widget).
* Reducing the size (complexity) of a single Rive file by breaking it up into smaller components that can be loaded on demand and swapped in and out as needed.

> [!NOTE]
>
> See the [Flutter data binding artboards example](https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_artboards.dart).

Artboard properties work with the `BindableArtboard` class, which is different from the regular `Artboard` class in the package.

`BindableArtboard` is a runtime wrapper for interacting with artboards through data binding. These instances reference existing artboards in your file, so no additional setup is required in the Rive Editor.

```dart theme={null}
    // Artboard property to bind
    final artboardProp = viewModelInstance.artboard('artboardPropertyName')!;

    // Create a bindable artboard
    final bindableArtboard = riveFile.artboardToBind('artboardName')!;
    artboardProp.value = bindableArtboard;
```

### Enums

Enums properties come in two flavors: system and user-defined. In practice, you will not need to worry about the distinction, but just be aware that system enums are available in any Rive file that binds to an editor-defined enum set, representing options from the editor's dropdowns, where user-defined enums are those defined by a designer in the editor.

Enums are string typed. The Rive file contains a list of enums. Each enum in turn has a name and a list of strings.

```dart theme={null}
// Access on a File object
print("Data enums: ${file.enums}");
```

## Examples

* [Data binding overview](https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding.dart)
* [Data binding images](https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_images.dart)
* [Data binding artboards](https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_artboards.dart)
* [Data binding lists](https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_lists.dart)
