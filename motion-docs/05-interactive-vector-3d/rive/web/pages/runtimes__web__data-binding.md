---
source: https://rive.app/docs/runtimes/web/data-binding
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

Access a View Model from the created Rive object in the `onLoad` callback:

```typescript theme={null}
const r = new rive.Rive({
    onLoad: () => {
        // The Rive object is now loaded and ready to use.
    }
});
```

Once Rive is loaded, you can access the view models using the following methods:

```typescript theme={null}
// Get reference by name
const namedVM = r.viewModelByName("My View Model");

// Get reference by index
for (let i = 0; i < r.viewModelCount; i++) {
    const indexedVM = r.viewModelByIndex(i);
}

// Get reference to the default view model
const defaultVM = r.defaultViewModel();
```

Alternatively, if you have access to the underlying `RiveFile` object you can access the above methods on the file.

```typescript theme={null}
const file = new RiveFile(/** ... */);
await file.init();
const vmFromFile = file.viewModelByName("My View Model");

// Or grab the ViewModel via other means from the RiveFile underlying instance
const fileInstance = file.getInstance();
const namedVM = fileInstance.viewModelByName("My View Model");
const indexedVM = fileInstance.viewModelByIndex(0);
const defaultVM = fileInstance.defaultArtboardViewModel(artboard);
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

```typescript theme={null}
// Create a blank instance from a view model (ViewModel)
const vmiBlank = viewModel.instance();

// Create a default instance from a view model (ViewModel)
const vmiDefault = viewModel.defaultInstance();

// Create an instance by index from a view model (ViewModel)
for (let i = 0; i < viewModel.instanceCount; i++) {
    const vmiIndexed = viewModel.instanceByIndex(i);
}

// Create an instance by name from a view model (ViewModel)
const vmiNamed = viewModel.instanceByName("My Instance");
```

### Binding

The created instance can then be assigned to a state machine or artboard. This establishes the bindings set up at edit time.

It is preferred to assign to a state machine, as this will automatically apply the instance to the artboard as well. Only assign to an artboard if you are not using a state machine, i.e. your file is static or uses linear animations.

> [!NOTE]
>
> The initial values of the instance are not applied to their bound elements until the state machine or artboard advances.

```typescript theme={null}
const r = new rive.Rive({
    autoBind: false, // This should be set to false (default)
    onLoad: () => {
        const vm = r.viewModelByName("My View Model");
        const vmi = vm.instanceByName("My Instance");

        // Manually bind by applying the instance to the state machine and artboard
        r.bindViewModelInstance(vmi);
    }
});
```

`bindViewModelInstance()` is a convenience method that sets a view model instance on the state machine and applies it in one step. To apply several instances at once — for example the main instance plus one or more [global view models](#global-view-models) — we recommend staging each view model with a `set` method, then flush them with a single `bind()`:

```typescript theme={null}
r.setViewModelInstance(vmi);                     // staged, not applied yet
r.setGlobalViewModelInstance("Theme", themeVmi); // staged, not applied yet
r.bind();                                        // applies everything in one rebind
```

`bindViewModelInstance(vmi)` is shorthand for setting the main instance with `setViewModelInstance(vmi)` followed by `bind()`.

> [!TIP]
>
> **Set every instance first, then call `bind()` once.** The `set` methods are cheap; `bind()` carries a much higher cost, and calling it per view model instance pays that cost again each time. Batching matters most at initialization, and on graphics with many bindings or deeply nested artboards.

> [!NOTE]
>
> When a state machine is running, `bind()` also fills in any view models that were not set by using their default instances — the artboard's default view model instance, plus a default instance for each global view model in the file.

### Auto-Binding

Alternatively, you may prefer to use auto-binding. This will automatically bind the default view model of the artboard using the default instance to both the state machine and the artboard. The default view model is the one selected on the artboard in the editor dropdown. The default instance is the one marked "Default" in the editor.

```typescript {4} theme={null}
const r = new rive.Rive({
   src: "my_rive_file.riv",
   canvas: document.getElementById("canvas"),
   autoBind: true,
   onLoad: () => {
       // Access the current instance that was auto-bound
       let boundInstance = r.viewModelInstance;
   }
});
```

### Global View Models

A view model marked **global** in the editor is shared across the whole file rather than owned by a single artboard. The file holds one slot per global view model, addressed by name, so every artboard and state machine reads from the same instance — useful for app-wide state such as a theme, session, or settings.

To bind the global view models manually (as opposed to using `autoBind: true`):

```typescript theme={null}
const names = r.globalViewModelNames(); // e.g. ["Theme", "Breakpoints"]
```

This is also available on `RiveFile`, so you can inspect a file's globals before creating a `Rive` instance.

Assign an instance to a global slot with `setGlobalViewModelInstance()`, then apply it with `bind()`. It returns `false` if the name does not match a global view model in the file:

```typescript theme={null}
const r = new rive.Rive({
    src: "my_rive_file.riv",
    canvas: document.getElementById("canvas"),
    stateMachine: "State Machine 1",
    autoBind: false,
    onLoad: () => {
        const themeVM = r.viewModelByName("Theme");
        const themeVMI = themeVM.instanceByName("Dark");

        // Read and write properties exactly as you would on the global view model instance
        themeVMI.color("background").value = parseInt('ff2266dd', 16);

        r.setGlobalViewModelInstance("Theme", themeVMI); // Staged, not applied yet
        r.bind(); // This will also create a default instance for the main view model implicitly
    }
});
```

Read back whichever instance currently occupies a slot with `globalViewModelInstance()`:

```typescript theme={null}
const themeVMI = r.globalViewModelInstance("Theme"); // ViewModelInstance | null
```

Global instances are never created implicitly by the getter. `globalViewModelInstance()` returns `null` until an instance has been set, or created for you by `bind()` / `autoBind: true`.

> [!NOTE]
>
> With `autoBind: true`, Rive creates a default instance for every global view model in the file alongside the artboard's default instance, so `globalViewModelInstance(name)` is populated by the time `onLoad` fires.

### Get View Model from instance

When working with view model instances, you may want to get a reference to the view model the instance came from so you can dynamically create more instances of the same type (i.e. creating instances from lists).
To do so, first grab the name of the view model the instance came from via the `.viewModelName` property:

```ts theme={null}
const vmi = r.viewModelInstance;
const vmName = vmi.viewModelName;
```

Then, once you have the name, you can get a reference to the view model itself and create instances as needed.

```ts theme={null}
const vmi = r.viewModelInstance;
const mainListProp = vmi.list("todos") as ViewModelInstanceList;
const vmName = mainListProp.instanceAt(0)?.viewModelName;

const itemVmReference = r.viewModelByName(vmName);
const instanceCopies = [];
for (let i = 0; i < 10; i++) {
    instanceCopies.push(itemVmReference.defaultInstance());
}
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

```typescript theme={null}
    // A list of properties on a view model (ViewModel)
    const properties = viewModel.properties;
    console.log(properties);
```

Each entry has a `name` and a `type`. Properties of type `"enum"` also carry an `enumName`, which you can match against the results of [`r.enums()`](#enums) to look up that enum's available values.

### Reading and writing properties

References to these properties can be retrieved by name or path.

Some properties are mutable and have getters, setters, and observer operations for their values. Getting or observing the value will retrieve the latest value set on that property's binding, as of the last state machine or artboard advance. Setting the value will update the value and all of its bound elements.

> [!NOTE]
>
> After setting a property's value, the changes will not apply to their bound elements until the state machine or artboard advances.

```typescript theme={null}
const r = new rive.Rive({
    autoBind: true,
    onLoad: () => {
        // Access the current instance that was auto-bound
        let vmi = r.viewModelInstance;

        // Booleans
        const booleanProperty = vmi.boolean("My Boolean Property");
        const booleanValue = booleanProperty.value;
        booleanProperty.value = true;

        // Strings
        const stringProperty = vmi.string("My String Property");
        const stringValue = stringProperty.value;
        stringProperty.value = "Hello, Rive!";

        // Numbers
        const numberProperty = vmi.number("My Number Property");
        const numberValue = numberProperty.value;
        numberProperty.value = 10;

        // Colors
        const colorProperty = vmi.color("My Color Property");
        const colorValue = colorProperty.value;
        colorProperty.value = 0xFF000000; // Set color to black with 100% opacity

        // Other ways to set color
        colorProperty.rgb(255, 0, 0); // Set RGB to red
        colorProperty.rgba(255, 0, 0, 128); // Set RGBA to red with 50% opacity
        colorProperty.argb(128, 255, 0, 0); // Set ARGB to red with 50% opacity
        colorProperty.opacity(0.5); // Set opacity to 50%

        // Triggers
        const triggerProperty = vmi.trigger("My Trigger Property");
        triggerProperty.trigger();

        // Enumerations
        const enumProperty = vmi.enum("My Enum Property");
        const enumValue = enumProperty.value;
        enumProperty.value = "Option1";
    }
});
```

### Nested property paths

View models can have properties of type view model, allowing for arbitrary nesting. You can chain property calls on each instance starting from the root until you get to the property of interest. Alternatively, you can do this through a path parameter, which is similar to a URI in that it is a forward slash delimited list of property names ending in the name of the property of interest.

```typescript theme={null}
const r = new rive.Rive({
    autoBind: true,
    onLoad: () => {
        // Access the current instance that was auto-bound
        let vmi = r.viewModelInstance;

        const nestedNumberByChain = vmi
            .viewModel("My Nested View Model")
            .viewModel("My Second Nested VM")
            .number("My Nested Number");

        const nestedNumberByPath = vmi.number("My Nested View Model/My Second Nested VM/My Nested Number");
    }
});
```

### Observability

You can observe changes over time to property values, either by using listeners or a platform equivalent method. Once observed, you will be notified when the property changes are applied by a state machine advance, whether that is a new value that has been explicitly set or if the value was updated as a result of a binding.

Adding an observer to a property is done by calling the `on` method on the property.

```typescript theme={null}
public on(callback: EventCallback)
```

The observer can be removed by calling the `off` method on the property and passing the callback function. Alternatively, you can call `off()` without any arguments to remove all observers.

```typescript theme={null}
public off(callback?: EventCallback)
```

Example:

```typescript theme={null}
const r = new rive.Rive({
    autoBind: true,
    onLoad: () => {
        // Access the current instance that was auto-bound
        let vmi = r.viewModelInstance;
        const numberProperty = vmi.number("My Number Property");
        // Observe
        numberProperty.on((event) => {
            console.log(event.data);
        });
        // Remove all listener when done
        numberProperty.off();
    }
});
```

### Images

Image properties let you set and replace raster images at runtime, with each instance of the image managed independently. For example, you could build an avatar creator and dynamically update features — like swapping out a hat — by setting a view model's image property.

```js theme={null}
const randomImageAsset = (imageProperty) => {
    fetch("https://picsum.photos/300/500").then(async (res) => {
        // Decode the image from the response. This object is used to set the image property.
        const image = await rive.decodeImage(
            new Uint8Array(await res.arrayBuffer())
        );
        imageProperty.value = image;
        // Rive will automatically clean this up. But it's good practice to dispose this manually
        // after you have already set the decoded image. Don't call `unref` if you intend
        // to use the decoded asset again.
        image.unref();
    });
};

const r = new rive.Rive({
    autoBind: true,
    onLoad: () => {
        // Access the current instance that was auto-bound
        let vmi = r.viewModelInstance;

        // Get the image property by name
        var imageProperty = vmi.image("bound_image");

        // Load random image
        randomImageAsset(imageProperty);

        // Clear the image to render nothing
        imageProperty.value = null;
    }
});
```

### Fonts

Font properties let you swap the typeface used by bound text at runtime. Decode font bytes and assign the result to the property's value.

```typescript theme={null}
const r = new rive.Rive({
    autoBind: true,
    onLoad: async () => {
        // Access the current instance that was auto-bound
        const vmi = r.viewModelInstance;
        // Get the font property by name
        const headingFontProperty = vmi.font("headingFont");

        const res = await fetch("/Orbitron.ttf");
        const font = await decodeFont(new Uint8Array(await res.arrayBuffer()));
        headingFontProperty.value = font;
    }
});
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

```javascript theme={null}
const r = new rive.Rive({
    autoBind: true,
    onLoad: () => {
        // Access the current instance that was auto-bound
        let vmi = r.viewModelInstance;

        // Get the list property by name
        var list = vmi.list("todos");
        console.log("length: ", list.length);

        // Get the view model
        var todoItemVM = r.viewModelByName("TodoItem");

        // Create a blank instance from the view model.
        // Do this for each new item you want to add.
        var myTodo = todoItemVM.instance();
        myTodo.string("description").value = "Buy groceries";

        // Add the newly created instance to the list
        list.addInstance(myTodo);

        // Remove a specific instance from the list
        list.removeInstance(myTodo);

        // Swap two instances in the list at index 0 and 1
        list.swap(0, 1);

        // Remove instance at index 0
        list.removeInstanceAt(0);
    }
});
```

### Artboards

Artboard properties allows you to swap out entire components at runtime. This is useful for creating modular components that can be reused across different designs or applications, for example:

* Creating a skinning system that supports a large number of variations, such as a character creator where you can swap out different body parts, clothing, and accessories.
* Creating a complex scene that is a composition of various artboards loaded from various different Rive files (drawn to a single canvas/texture/widget).
* Reducing the size (complexity) of a single Rive file by breaking it up into smaller components that can be loaded on demand and swapped in and out as needed.

```typescript theme={null}
let artboardProperty = null;
let characterArtboard = null;

function attachCharacter() {
    // If the artboard property and the character artboard, both exist, set the artboard
    if (characterArtboard && artboardProperty) {
        artboardProperty.value = characterArtboard;
    }
}

const r = new Rive({
    src: "swap_character_main.riv",
    autoplay: true,
    canvas: el,
    autoBind: true,
    layout: new Layout({
        fit: Fit.Layout,
        layoutScaleFactor: 0.5,
    }),
    stateMachine: "State Machine 1",
    onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();

        const vmi = r.viewModelInstance;
        artboardProperty = vmi.artboard("Artboard property");

        attachCharacter();
    },
    onLoadError: () => {
        console.log("error");
    },
});

// Load an external artboard
const assetsFile = new RiveFile({
    src: "swap_character_assets.riv",
    onLoad: () => {
        characterArtboard = assetsFile.getBindableArtboard("Character 1");
        attachCharacter();
    },
    onLoadError: () => {
        console.log("error");
    },
});
assetsFile.init();
```

In the example above, we load from a separate `swap_character_assets.riv` file to get the `Character 1` bindable artboard. We can then use this value in the main `swap_character_main.riv` file by setting the value of the `artboardProperty` to the loaded `characterArtboard`. This allows us to swap out the artboard being used in the main file at runtime.
Additionally, you can set an external `ViewModelInstance` to that bindable artboard via the `.viewModel` setter.

### Enums

Enums properties come in two flavors: system and user-defined. In practice, you will not need to worry about the distinction, but just be aware that system enums are available in any Rive file that binds to an editor-defined enum set, representing options from the editor's dropdowns, where user-defined enums are those defined by a designer in the editor.

Enums are string typed. The Rive file contains a list of enums. Each enum in turn has a name and a list of strings.

```typescript theme={null}
const r = new rive.Rive({
    onLoad: () => {
        const enums = r.enums();

        console.log(enums);
    }
});
```

## Examples

[YouTube video player](https://www.youtube.com/embed/y7glxOIFEjg)

[YouTube video player](https://www.youtube.com/embed/1WFtGX2coXM)
