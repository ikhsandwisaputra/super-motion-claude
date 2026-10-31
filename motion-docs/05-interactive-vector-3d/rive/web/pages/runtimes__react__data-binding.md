---
source: https://rive.app/docs/runtimes/react/data-binding
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

Use the `useViewModel` hook to get a reference to a view model. You need to pass the `rive` object obtained from `useRive`.

```typescript theme={null}
import { useRive, useViewModel } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    // ... other options
});

// Option 1: Get the default ViewModel for the artboard
const defaultViewModel = useViewModel(rive);

// Option 2: Get the default ViewModel explicitly
const defaultViewModelExplicit = useViewModel(rive, { useDefault: true });

// Option 3: Get a ViewModel by its name
const namedViewModel = useViewModel(rive, { name: 'MyViewModelName' });
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

Use the `useViewModelInstance` hook to create a view model instance from a view model returned by the `useViewModel` hook.

```typescript theme={null}
import { useRive, useViewModel, useViewModelInstance } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    // ... other options
});

const viewModel = useViewModel(rive, { name: 'MyViewModelName' });
// Or: const viewModel = useViewModel(rive); // Default VM

// Get default instance without binding
const defaultUnbound = useViewModelInstance(viewModel, { useDefault: true });

// Get named instance without binding
const namedUnbound = useViewModelInstance(viewModel, { name: 'MyInstanceName' });

// Create new blank instance without binding
const newUnbound = useViewModelInstance(viewModel, { useNew: true });
```

You can also bind the view model instance directly to the Rive instance by passing the `rive` object to the `useViewModelInstance` hook.

```typescript theme={null}
import { useRive, useViewModel, useViewModelInstance } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: false, // Disable auto binding so we can manually bind later
    // ... other options
});

const viewModel = useViewModel(rive, { name: 'MyViewModelName' });

// Get default instance (implicit) and bind it
const defaultBound = useViewModelInstance(viewModel, { rive });

// Get named instance and bind it
const namedBound = useViewModelInstance(viewModel, { name: 'MyInstanceName', rive });

// Create a new blank instance and bind it
const newBound = useViewModelInstance(viewModel, { useNew: true, rive });
```

If you set `autoBind: true` in `useRive`, you can access the automatically bound default instance directly via `rive.viewModelInstance` once Rive is loaded, without needing `useViewModel` or `useViewModelInstance`.

```typescript theme={null}
const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: true,
});

// Once loaded, the instance is available:
const boundInstance = rive?.viewModelInstance;
```

### Binding

The created instance can then be assigned to a state machine or artboard. This establishes the bindings set up at edit time.

It is preferred to assign to a state machine, as this will automatically apply the instance to the artboard as well. Only assign to an artboard if you are not using a state machine, i.e. your file is static or uses linear animations.

> [!NOTE]
>
> The initial values of the instance are not applied to their bound elements until the state machine or artboard advances.

For React, no additional steps are needed to bind the view model instance to the Rive component. Passing the `rive` object to `useViewModelInstance` handles this automatically — the hook sets the instance and schedules a single `bind()`.

> [!TIP]
>
> **Set every instance first, then call `bind()` once.** Setting an instance is cheap; `bind()` carries a much higher cost, and calling it per instance pays that cost again each time. Batching matters most at initialization, and on graphics with many bindings or deeply nested artboards.
>
> The view model hooks already do this for you: hooks that resolve in the same render commit share one coalesced `bind()`. When you bind by hand — in `onRiveReady`, for instance — stage each instance with `setViewModelInstance()` / `setGlobalViewModelInstance()` and flush them with a single `bind()`.

### Binding before the first frame

The view model hooks run after Rive has loaded, which means the first frame has already advanced and rendered before they bind, even with `autoplay: false`. If you want to set data before the first render, do the data binding setup in the `onRiveReady` callback of `useRive` instead. It receives the `Rive` instance synchronously as soon as the file loads, and before the state machine advances, so you can stage instances and set property values that the very first frame renders with.

```tsx theme={null}
import { useRive, ViewModel, ViewModelInstance } from '@rive-app/react-webgl2';

const { RiveComponent } = useRive({
    src: 'your_file.riv',
    stateMachine: 'MyStateMachine',
    autoplay: true,
    autoBind: false, // Set up the instances yourself before the first frame
    onRiveReady: (rive) => {
        const mainVM = rive.viewModelByName('MyViewModel') as ViewModel;
        const instance = mainVM.defaultInstance() as ViewModelInstance;

        instance.string('username').value = 'Rive';

        rive.setViewModelInstance(instance);
        rive.bind(); // Flush the staged instances
    },
});
```

> [!TIP]
>
> Use `onRiveReady` rather than `onLoad` for any pre-render data binding work. Anything you can reach from the `Rive` instance, including [global view models](#global-view-models), can be prepared there.

### Auto-Binding

Alternatively, you may prefer to use auto-binding. This will automatically bind the default view model of the artboard using the default instance to both the state machine and the artboard. The default view model is the one selected on the artboard in the editor dropdown. The default instance is the one marked "Default" in the editor.

```typescript theme={null}
const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: true, // Enable auto-binding
    // ... other options
});

// Once loaded, the main view model instance is available:
const boundInstance = rive?.viewModelInstance;
```

### Global View Models

A view model marked **global** in the editor is shared across the whole file rather than owned by a single artboard. The file holds one slot per global view model, addressed by name, so every artboard and state machine reads from the same instance — useful for app-wide state such as a theme, session, or settings.

Use the `useGlobalViewModelInstance` hook to resolve an instance and register it under a global's name. It takes the view model (from `useViewModel`), the name of the global slot, and the same kind of selector parameters as `useViewModelInstance`:

```tsx theme={null}
import {
    useRive,
    useViewModel,
    useGlobalViewModelInstance,
    useViewModelInstanceColor,
} from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    stateMachine: 'State Machine 1',
    autoBind: false,
});

const themeViewModel = useViewModel(rive, { name: 'Theme' });

// Resolve the default instance and register it as the "Theme" global
const themeInstance = useGlobalViewModelInstance(themeViewModel, 'Theme', { rive });

// Property hooks work exactly as they do for the main instance
const { value: bgColor, setValue: setBgColor } = useViewModelInstanceColor(
    'backgroundColor',
    themeInstance
);
```

The third argument selects which instance to resolve:

* `{ rive }` — the view model's default instance (the implicit default)
* `{ instanceName: 'Dark', rive }` — the instance with that name
* `{ useNew: true, rive }` — a new blank instance
* `{ instance: myInstance, rive }` — an instance you created yourself

Passing `rive` is what registers the instance as the global and schedules the bind. Omit it to resolve an instance without binding it.

> [!NOTE]
>
> You only need a hook for the globals whose properties you want to read or write. Binding fills every slot you did not set — including the main view model instance — with that view model's default instance from the file.

To list a file's globals or read back whichever instance currently occupies a slot, go through the `rive` instance directly:

```tsx theme={null}
const names = rive?.globalViewModelNames();          // e.g. ["Theme", "Session"]
const themeInstance = rive?.globalViewModelInstance('Theme'); // ViewModelInstance | null
```

`globalViewModelInstance()` never creates an instance — it returns `null` until one has been set by a hook, set in `onRiveReady`, or by `autoBind: true`.

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
// Access properties from the view model returned by useViewModel
const viewModel = useViewModel(rive);
console.log(viewModel?.properties); // [{ name: "status", type: "enum", enumName: "Status" }, ...]
```

Each entry has a `name` and a `type`. Properties of type `"enum"` also carry an `enumName`, which you can match against the results of [`rive.enums()`](#enums) to look up that enum's available values.

### Reading and writing properties

References to these properties can be retrieved by name or path.

Some properties are mutable and have getters, setters, and observer operations for their values. Getting or observing the value will retrieve the latest value set on that property's binding, as of the last state machine or artboard advance. Setting the value will update the value and all of its bound elements.

> [!NOTE]
>
> After setting a property's value, the changes will not apply to their bound elements until the state machine or artboard advances.

Use the specific hook for a given property type to get and set property values.

* `useViewModelInstanceBoolean`: Read/write boolean properties
* `useViewModelInstanceString`: Read/write string properties
* `useViewModelInstanceNumber`: Read/write number properties
* `useViewModelInstanceColor`: Read/write color properties with additional RGB/alpha methods
* `useViewModelInstanceEnum`: Read/write enum properties with available values
* `useViewModelInstanceTrigger`: Fire trigger events with optional callbacks

These hooks return the current `value` and a function to update it (`setValue`, `setRgb`, `trigger`). The `value` will be null if the property is not found or if the hook is provided with an invalid viewModelInstance.

```typescript theme={null}
import {
    useViewModelInstanceBoolean,
    useViewModelInstanceString,
    useViewModelInstanceNumber,
    useViewModelInstanceEnum,
    useViewModelInstanceColor,
    useViewModelInstanceTrigger
} from '@rive-app/react-webgl2';

// Assuming viewModelInstance is obtained via useViewModelInstance or rive.viewModelInstance

// Boolean
const { value: isActive, setValue: setIsActive } = useViewModelInstanceBoolean(
    'isToggleOn', // Property path
    viewModelInstance
);
// Set: setIsActive(true);

// String
const { value: userName, setValue: setUserName } = useViewModelInstanceString(
    'user/name', // Property path
    viewModelInstance
);
// Set: setUserName('Rive');

// Number
const { value: score, setValue: setScore } = useViewModelInstanceNumber(
    'levelScore', // Property path
    viewModelInstance
);
// Set: setScore(100);

// Enum
const { value: status, setValue: setStatus, values: statusOptions } = useViewModelInstanceEnum(
    'appStatus', // Property path
    viewModelInstance
);
// Set: setStatus('loading');
// Get available options: statusOptions is an array like ['idle', 'loading', 'error']

// Color
const {
    value: themeColor, // Raw number value like -3267805
    setRgb: setThemeColorRgb, // Set RGB components (0-255 values)
    setAlpha: setThemeColorAlpha, // Set alpha component (0-255)
    setOpacity: setThemeColorOpacity, // Set opacity (0.0-1.0)
    setRgba: setThemeColorRgba, // Set all components at once
    setValue: setThemeColorValue // Set raw color value
} = useViewModelInstanceColor(
    'ui/themeColor', // Property path
    viewModelInstance
);
// Set RGB: setThemeColorRgb(0, 128, 255); // Set to a blue color
// Set Alpha: setThemeColorAlpha(128); // Set to 50% opacity
// Set Opacity: setThemeColorOpacity(0.5); // Set to 50% opacity
// Set RGBA: setThemeColorRgba(0, 128, 255, 255); // Blue with full opacity
// Set Value: setThemeColorValue(-3267805); // Set using raw color value

// Trigger (No value, just a trigger function)
const { trigger: playEffect } = useViewModelInstanceTrigger(
    'playButtonEffect', // Property path
    viewModelInstance,
    {
        // Optional callback to be called when the trigger is fired
        onTrigger: () => {
            console.log('Trigger Fired!');
        }
    }
);
// Trigger: playEffect();
```

The `value` returned by each hook will update automatically when the property changes in the Rive graphic.

### Nested property paths

View models can have properties of type view model, allowing for arbitrary nesting. You can chain property calls on each instance starting from the root until you get to the property of interest. Alternatively, you can do this through a path parameter, which is similar to a URI in that it is a forward slash delimited list of property names ending in the name of the property of interest.

Access nested properties by providing the full path (separated by `/`) as the first argument to the property hooks.

```typescript theme={null}
import { useViewModelInstanceString, useViewModelInstanceNumber } from '@rive-app/react-webgl2';

// Accessing 'settings/theme/name' (String)
const { value: themeName, setValue: setThemeName } = useViewModelInstanceString(
    'settings/theme/name',
    viewModelInstance
);

// Accessing 'settings/volume' (Number)
const { value: volume, setValue: setVolume } = useViewModelInstanceNumber(
    'settings/volume',
    viewModelInstance
);

console.log('Current theme:', themeName);
// setThemeName('Dark Mode');
// setVolume(80);
```

### Observability

You can observe changes over time to property values, either by using listeners or a platform equivalent method. Once observed, you will be notified when the property changes are applied by a state machine advance, whether that is a new value that has been explicitly set or if the value was updated as a result of a binding.

The React hooks handle observability automatically. When a property's value changes within the Rive instance (either because you set it via a hook or due to an internal binding), the `value` returned by the corresponding hook (e.g., `useViewModelInstanceString`) updates. This state change triggers a re-render of your React component, allowing you to react to the new value.

For Triggers, you can provide an `onTrigger` callback directly to the `useViewModelInstanceTrigger` hook, which fires when the trigger is activated in the Rive instance.

```typescript theme={null}
import { useViewModelInstanceTrigger } from '@rive-app/react-webgl2';

// Assuming viewModelInstance is available
const { trigger } = useViewModelInstanceTrigger(
    'showPopup',
    viewModelInstance,
    {
        onTrigger: () => {
            console.log('Show Popup Trigger Fired!');
            // Show your popup UI
        }
    }
);
```

### Images

Image properties let you set and replace raster images at runtime, with each instance of the image managed independently. For example, you could build an avatar creator and dynamically update features — like swapping out a hat — by setting a view model's image property.

Use the `useViewModelInstanceImage` hook to set image properties on view model instances.

```typescript theme={null}
import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceImage } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: false,
    // ... other options
});

const viewModel = useViewModel(rive, { name: 'MyViewModel' });
const viewModelInstance = useViewModelInstance(viewModel, { rive });

// Get the image property setter
const { setValue: setImage } = useViewModelInstanceImage(
    'profileImage', // Property path
    viewModelInstance
);

// Load and set a random image
const loadRandomImage = async () => {
    if (!setImage) return;

    try {
        const imageUrl = 'https://picsum.photos/300/500';
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();

        // Decode the image from the response
        const decodedImage = await decodeImage(new Uint8Array(imageBuffer));
        setImage(decodedImage);

        // Clean up the decoded image
        decodedImage.unref();
    } catch (error) {
        console.error('Failed to load image:', error);
    }
};

// Clear the image
const clearImage = () => {
    if (setImage) {
        setImage(null);
    }
};
```

### Fonts

Font properties let you swap the typeface used by bound text at runtime. Decode font bytes and assign the result to the property's value.

```typescript {1-4, 14-20} theme={null}
  const { setValue: setHeadingFont } = useViewModelInstanceFont(
    "headingFont",
    rive?.viewModelInstance
  );

  useEffect(() => {
    if (setHeadingFont) {
      loadFont("Orbitron.ttf");
    }
  }, [setHeadingFont]);

  const loadFont = async (url: string) => {
    try {
      const response = await fetch(url);
      const fontBuffer = await response.arrayBuffer();
      const decodedFont = await decodeFont(new Uint8Array(fontBuffer));

      setHeadingFont(decodedFont);

      decodedFont.unref();
    } catch (error) {
      console.error("Failed to load font:", error);
    }
  };
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

Use the `useViewModelInstanceList` hook to manage list properties on view model instances.

```typescript theme={null}
import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceList } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: false,
    // ... other options
});

const viewModel = useViewModel(rive, { name: 'MyViewModel' });
const viewModelInstance = useViewModelInstance(viewModel, { rive });

// Get the list property with manipulation functions
const {
    length,
    addInstance,
    addInstanceAt,
    removeInstance,
    removeInstanceAt,
    getInstanceAt,
    swap
} = useViewModelInstanceList('todos', viewModelInstance);

// Add a new todo item
const handleAddItem = () => {
    const todoItemViewModel = rive?.viewModelByName?.('TodoItem');
    if (todoItemViewModel) {
        const newTodoItem = todoItemViewModel.instance?.();
        if (newTodoItem) {
            // Set some initial values
            newTodoItem.string('description').value = 'Buy groceries';
            addInstance(newTodoItem);
        }
    }
};

// Insert item at specific index
const handleInsertItem = () => {
    const todoItemViewModel = rive?.viewModelByName?.('TodoItem');
    if (todoItemViewModel) {
        const newTodoItem = todoItemViewModel.instance?.();
        if (newTodoItem) {
            addInstanceAt(newTodoItem, 0); // Insert at beginning
        }
    }
};

// Remove first item by instance
const handleRemoveFirst = () => {
    const firstInstance = getInstanceAt(0);
    if (firstInstance) {
        removeInstance(firstInstance);
    }
};

// Remove item by index
const handleRemoveAt = () => {
    if (length > 0) {
        removeInstanceAt(0);
    }
};

// Swap two items
const handleSwap = () => {
    if (length >= 2) {
        swap(0, 1);
    }
};

console.log(`List has ${length} items`);
```

### Artboards

Artboard properties allows you to swap out entire components at runtime. This is useful for creating modular components that can be reused across different designs or applications, for example:

* Creating a skinning system that supports a large number of variations, such as a character creator where you can swap out different body parts, clothing, and accessories.
* Creating a complex scene that is a composition of various artboards loaded from various different Rive files (drawn to a single canvas/texture/widget).
* Reducing the size (complexity) of a single Rive file by breaking it up into smaller components that can be loaded on demand and swapped in and out as needed.

Use the `useViewModelInstanceArtboard` hook to set artboard properties on view model instances.

```typescript theme={null}
import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceArtboard } from '@rive-app/react-webgl2';

const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: true,
    // ... other options
});

// Get artboard property setters
const { setValue: setArtboard1 } = useViewModelInstanceArtboard(
    'artboard_1', // Property path
    rive?.viewModelInstance
);

const { setValue: setArtboard2 } = useViewModelInstanceArtboard(
    'artboard_2', // Property path
    rive?.viewModelInstance
);

// Assign different artboards from the same file
const handleSetBlueArtboard = () => {
    if (rive) {
        const blueArtboard = rive.getBindableArtboard('ArtboardBlue');
        setArtboard1(blueArtboard);
    }
};

const handleSetRedArtboard = () => {
    if (rive) {
        const redArtboard = rive.getBindableArtboard('ArtboardRed');
        setArtboard2(redArtboard);
    }
};

const handleSetGreenArtboard = () => {
    if (rive) {
        const greenArtboard = rive.getBindableArtboard('ArtboardGreen');
        setArtboard1(greenArtboard);
    }
};

```

### Enums

Enums properties come in two flavors: system and user-defined. In practice, you will not need to worry about the distinction, but just be aware that system enums are available in any Rive file that binds to an editor-defined enum set, representing options from the editor's dropdowns, where user-defined enums are those defined by a designer in the editor.

Enums are string typed. The Rive file contains a list of enums. Each enum in turn has a name and a list of strings.

```typescript theme={null}
const { rive } = useRive({
    src: 'your_file.riv',
    artboard: 'MyArtboard',
    stateMachine: 'MyStateMachine',
    autoBind: true
    // ... other options
});
const enums = rive?.enums();
console.log(enums);
```

## Examples

See the `DataBinding` story in the [Rive React repo](https://github.com/rive-app/rive-react) for a demo.
