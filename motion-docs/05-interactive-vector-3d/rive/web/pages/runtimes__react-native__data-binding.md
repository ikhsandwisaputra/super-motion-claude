---
source: https://rive.app/docs/runtimes/react-native/data-binding
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

**New Runtime (Recommended)**

```tsx theme={null}
import { useRiveFile } from '@rive-app/react-native';

const { riveFile } = useRiveFile(require('./my_file.riv'));

// Get reference by name
const namedVM = await riveFile?.viewModelByNameAsync('My View Model');

// Get all view model names
const vmNames = await riveFile?.getViewModelNamesAsync(); // ['My View Model', ...]

// Get reference to the default artboard view model
const defaultVM = await riveFile?.defaultArtboardViewModelAsync();
```

**Legacy Runtime**

> [!NOTE]
>
> Creating a view model object is only supported in the new React Native runtime.

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

**New Runtime (Recommended)**

Use the `useViewModelInstance` hook to create a view model instance. You can pass a `RiveFile`, `ViewModel`, or `RiveViewRef` as the source.

Pass `async: true` to create the instance asynchronously. The hook returns `{ instance, isLoading, error }` and the instance is not available on the first render, so gate rendering on it. Without `async: true`, the instance is created through deprecated synchronous APIs that block the JS thread.

```tsx theme={null}
import { Text } from 'react-native';
import { useRiveFile, useViewModelInstance, RiveView } from '@rive-app/react-native';

const { riveFile, error: fileError } = useRiveFile(require('./my_file.riv'));

// From RiveFile — default artboard's ViewModel, default instance
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

if (fileError || error) return <Text>{(fileError ?? error)!.message}</Text>;

return riveFile && instance && (
    <RiveView file={riveFile} dataBind={instance} />
);
```

All lookup options combine with `async: true`:

```tsx theme={null}
// Specify artboard or ViewModel name (mutually exclusive)
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, artboardName: 'MainArtboard' });
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, viewModelName: 'Settings' });

// instanceName can be combined with any of the above to pick a specific instance
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, instanceName: 'PersonInstance' });
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, viewModelName: 'Settings', instanceName: 'UserSettings' });

// From a ViewModel object (for example, from riveFile.viewModelByNameAsync('My View Model'))
const { instance: namedInstance, isLoading, error } = useViewModelInstance(viewModel, { async: true, name: 'My Instance' });
const { instance: newInstance, isLoading, error } = useViewModelInstance(viewModel, { async: true, useNew: true });

// With required: true (throws once resolved to null, use with Error Boundary)
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, required: true });

// With onInit to set initial values before the instance is exposed or bound
const { instance, isLoading, error } = useViewModelInstance(riveFile, {
    async: true,
    onInit: (vmi) => {
        vmi.numberProperty('health')?.set(100);
    },
});
```

> [!NOTE]
>
> `async: true` is available in `@rive-app/react-native@0.4.18` and later. The synchronous creation path is deprecated and will be removed in a future release.

You can also get the auto-bound instance from a `RiveViewRef`. The hook waits up to five seconds for the view's auto-bound instance to become available:

```tsx theme={null}
import { useRive, useViewModelInstance } from '@rive-app/react-native';

const { riveViewRef, setHybridRef } = useRive();
const { instance, isLoading, error } = useViewModelInstance(riveViewRef, { async: true });
```

**Legacy Runtime**

You can bind a view model instance to a Rive component by passing in a `dataBinding` prop to the Rive component.

The `dataBinding` prop accepts a `DataBindBy` type, which can be one of the following:

```typescript theme={null}
export type DataBindBy =
    | { type: 'autobind'; value: boolean }
    | { type: 'index'; value: number }
    | { type: 'name'; value: string }
    | { type: 'empty' };

export const AutoBind = (value: boolean): DataBindBy => ({
    type: 'autobind',
    value,
});
export const BindByIndex = (value: number): DataBindBy => ({
    type: 'index',
    value,
});
export const BindByName = (value: string): DataBindBy => ({
    type: 'name',
    value,
});
export const BindEmpty = (): DataBindBy => ({ type: 'empty' });
```

Example usage:

```typescript {7,8,9,10} theme={null}
const [setRiveRef, riveRef] = useRive();

return (
    <Rive
        ref={setRiveRef}
        autoplay={true}
        dataBinding={AutoBind(true)} // default: `AutoBind(false)`
        // dataBinding={BindByIndex(0)}
        // dataBinding={BindByName('SomeName')}
        // dataBinding={BindEmpty()}
        stateMachineName={'State Machine 1'}
        resourceName={'rewards'}
    />
);
```

You can listen to errors by passing in the `onError={(riveError: RNRiveError)` prop to the Rive component.
The `riveError` object contains the error type and message, and you can filter out for `RNRiveErrorType.DataBindingError`:

```typescript theme={null}
onError={(riveError: RNRiveError) => {
    switch (riveError.type) {
        case RNRiveErrorType.DataBindingError: {
        console.error(`${riveError.message}`);
        return;
        }
        default:
        console.error('Unhandled error');
        return;
    }
}}
```

### Binding

The created instance can then be assigned to a state machine or artboard. This establishes the bindings set up at edit time.

It is preferred to assign to a state machine, as this will automatically apply the instance to the artboard as well. Only assign to an artboard if you are not using a state machine, i.e. your file is static or uses linear animations.

> [!NOTE]
>
> The initial values of the instance are not applied to their bound elements until the state machine or artboard advances.

**New Runtime (Recommended)**

For React Native, no additional steps are needed to bind the view model instance to the Rive component. Pass the instance to the `dataBind` prop on `RiveView`:

```tsx theme={null}
import { RiveView, useRiveFile, useViewModelInstance } from '@rive-app/react-native';

const { riveFile } = useRiveFile(require('./my_file.riv'));
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

return (
    <RiveView
        file={riveFile}
        dataBind={instance}
    />
);
```

**Legacy Runtime**

For React Native, no additional steps are needed to bind the view model instance to the Rive component. The `dataBinding` prop handles this automatically.

### Auto-Binding

Alternatively, you may prefer to use auto-binding. This will automatically bind the default view model of the artboard using the default instance to both the state machine and the artboard. The default view model is the one selected on the artboard in the editor dropdown. The default instance is the one marked "Default" in the editor.

**New Runtime (Recommended)**

Auto-binding is available through the `DataBindMode` enum. You can pass `DataBindMode.Auto` to the `dataBind` prop:

```tsx theme={null}
import { RiveView, useRiveFile, DataBindMode } from '@rive-app/react-native';

const { riveFile } = useRiveFile(require('./my_file.riv'));

return (
    <RiveView
        file={riveFile}
        dataBind={DataBindMode.Auto}
        autoPlay={true}
    />
);
```

You can also bind by name:

```tsx theme={null}
<RiveView
    file={riveFile}
    dataBind={{ byName: 'My Instance' }}
    autoPlay={true}
/>
```

Or bind a specific instance:

```tsx theme={null}
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });
<RiveView
    file={riveFile}
    dataBind={instance}
    autoPlay={true}
/>
```

**Legacy Runtime**

The default value for the `dataBinding` prop is `AutoBind(false)`, which means auto-binding is disabled by default.

To enable auto-binding, set the `dataBinding` prop to `AutoBind(true)`.

```typescript {7} theme={null}
const [setRiveRef, riveRef] = useRive();

return (
    <Rive
        ref={setRiveRef}
        autoplay={true}
        dataBinding={AutoBind(true)} // default: `AutoBind(false)`
        stateMachineName={'State Machine 1'}
        resourceName={'rewards'}
    />
);
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

**New Runtime (Recommended)**

Use `getPropertiesAsync` on a `ViewModel` to list its properties. Each entry has a `name` and a `type`, such as `'number'`, `'string'`, `'boolean'`, `'color'`, `'enum'`, `'trigger'`, `'list'`, `'viewModel'`, `'assetImage'`, or `'artboard'`.

```tsx theme={null}
const viewModel = await riveFile.viewModelByNameAsync('Person');
const properties = await viewModel?.getPropertiesAsync();
// [{ name: 'name', type: 'string' }, { name: 'age', type: 'number' }, ...]

const propertyCount = await viewModel?.getPropertyCountAsync();
const instanceCount = await viewModel?.getInstanceCountAsync();
```

`ViewModelInstance` also has `getPropertiesAsync`, but only for instances created from a `ViewModel` or with `useViewModelInstance`. For nested instances, list items, and instances obtained from a view, it rejects; query the `ViewModel` instead.

> [!NOTE]
>
> `getPropertiesAsync` requires `0.5.0` or later.

**Legacy Runtime**

> [!WARNING]
>
> The properties API is not supported on the legacy runtime.

### Reading and writing properties

References to these properties can be retrieved by name or path.

Some properties are mutable and have getters, setters, and observer operations for their values. Getting or observing the value will retrieve the latest value set on that property's binding, as of the last state machine or artboard advance. Setting the value will update the value and all of its bound elements.

> [!NOTE]
>
> After setting a property's value, the changes will not apply to their bound elements until the state machine or artboard advances.

**New Runtime (Recommended)**

Use the specific hooks for each property type to get and set property values:

* `useRiveBoolean`: Read/write boolean properties
* `useRiveString`: Read/write string properties
* `useRiveNumber`: Read/write number properties
* `useRiveColor`: Read/write color properties with hex string or RGBA support
* `useRiveEnum`: Read/write enum properties
* `useRiveTrigger`: Fire trigger events with optional callbacks

These hooks return the current `value`, a setter function (`setValue` or `trigger`), and an `error` if the property can't be found or read. The `value` is `undefined` until the first value arrives from the runtime.

> [!NOTE]
>
> The `setValue` function allows you to pass a function that receives the previous value, similar to React's `setState` pattern. This is useful when you need to update a value based on its current state:
>
> ```tsx theme={null}
> setValue((v) => (v ?? 0) + 5)
> ```

```tsx theme={null}
import {
    useRiveFile,
    useViewModelInstance,
    useRiveBoolean,
    useRiveString,
    useRiveNumber,
    useRiveColor,
    useRiveEnum,
    useRiveTrigger,
    RiveColor,
    RiveView
} from '@rive-app/react-native';

const { riveFile } = useRiveFile(require('./my_file.riv'));
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

// Boolean
const { value: isActive, setValue: setIsActive, error: boolError } = useRiveBoolean(
    'isToggleOn',
    instance
);
// Set: setIsActive(true);

// String
const { value: userName, setValue: setUserName, error: stringError } = useRiveString(
    'user/name',
    instance
);
// Set: setUserName('Rive');

// Number
const { value: score, setValue: setScore, error: numberError } = useRiveNumber(
    'levelScore',
    instance
);
// Set: setScore(100);

// Color (value is a RiveColor; set with a hex string or a RiveColor)
const { value: themeColor, setValue: setThemeColor, error: colorError } = useRiveColor(
    'ui/themeColor',
    instance
);
// Set: setThemeColor('#FF0000FF'); // hex string, #RRGGBB or #RRGGBBAA
// Or: setThemeColor(new RiveColor(255, 0, 0, 255)); // r, g, b, a in 0-255

// Enum
const { value: status, setValue: setStatus, error: enumError } = useRiveEnum(
    'appStatus',
    instance
);
// Set: setStatus('loading');

// Trigger (No value, just a trigger function)
const { trigger: playEffect, error: triggerError } = useRiveTrigger(
    'playButtonEffect',
    instance,
    {
        // Optional callback to be called when the trigger is fired
        onTrigger: () => {
            console.log('Trigger Fired!');
        }
    }
);
// Trigger: playEffect();

return (
    <RiveView
        file={riveFile}
        dataBind={instance}
        autoPlay={true}
    />
);
```

The `value` returned by each hook will update automatically when the property changes in the Rive graphic.

> [!NOTE]
>
> In `0.5.0` and later, a misspelled property path is not detected when you look the property up. It surfaces as the hook's `error`, or as a rejected `getValueAsync()` promise.

Outside of hooks, use the property accessors on a `ViewModelInstance`. Read values with `getValueAsync()` and write them with `set()`, or with `setValueAsync()` if you need to wait for the write to complete:

```tsx theme={null}
const health = instance.numberProperty('health');

const current = await health?.getValueAsync();
health?.set(100);
await health?.setValueAsync(100);

// Listen for changes; call the returned function to unsubscribe
const unsubscribe = health?.addListener((value) => console.log('health', value));
```

> [!WARNING]
>
> Reading or writing a property's `value` field directly is deprecated. It blocks the JS thread and, in `0.5.0` and later, logs a warning.

**Legacy Runtime**

The following data binding methods are exposed on the `RiveRef` object.

```typescript theme={null}
setBoolean: (path: string, value: boolean) => void;
setString: (path: string, value: string) => void;
setNumber: (path: string, value: number) => void;
setColor: (path: string, color: RiveRGBA | string) => void;
setEnum: (path: string, value: string) => void;
trigger: (path: string) => void;
```

> [!NOTE]
>
> The color property can be set using either a `RiveRGBA` object or a hex string. The hex string should be in the format
> `#RRGGBBAA`, where `RR`, `GG`, `BB`, and `AA` are two-digit hexadecimal values representing the red, green, blue, and
> alpha channels, respectively.
>
> ```js theme={null}
> type RiveRGBA = { r: number; g: number; b: number; a: number };
> ```

Example usage:

```typescript theme={null}
const [setRiveRef, riveRef] = useRive();
const setBoolean = () => {
    if (riveRef) {
        riveRef.setBoolean('My Boolean Property', true);
    }
};
const setString = () => {
    if (riveRef) {
        riveRef.current.setString('My String Property', 'Hello, Rive');
    }
};
const setNumber = () => {
    if (riveRef) {
        riveRef.current.setNumber('My Number Property', 10);
    }
};
const setColor = () => {
    if (riveRef) {
        riveRef.setColor('My Color Property', { r: 255, g: 0, b: 0, a: 1 });
        // or
        riveRef.setColor('My Color Property', '#00FF00FF');
    }
};
const setEnum = () => {
    if (riveRef) {
        riveRef.setEnum('My Enum Property', 'Option 1');
    }
};
const trigger = () => {
    if (riveRef) {
        riveRef.trigger('My Trigger Property');
    }
};
```

### Nested property paths

View models can have properties of type view model, allowing for arbitrary nesting. You can chain property calls on each instance starting from the root until you get to the property of interest. Alternatively, you can do this through a path parameter, which is similar to a URI in that it is a forward slash delimited list of property names ending in the name of the property of interest.

**New Runtime (Recommended)**

Access nested properties by providing the full path (separated by `/`) as the first argument to the property hooks.

```tsx theme={null}
import { useRiveString, useRiveNumber, useRiveFile, useViewModelInstance } from '@rive-app/react-native';

const { riveFile } = useRiveFile(require('./my_file.riv'));
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

// Accessing 'settings/theme/name' (String)
const { value: themeName, setValue: setThemeName } = useRiveString(
    'settings/theme/name',
    instance
);

// Accessing 'settings/volume' (Number)
const { value: volume, setValue: setVolume } = useRiveNumber(
    'settings/volume',
    instance
);

console.log('Current theme:', themeName);
// setThemeName('Dark Mode');
// setVolume(80);
```

To work with a nested view model instance directly, use `viewModelAsync` with the property name or path:

```tsx theme={null}
const settings = await instance?.viewModelAsync('settings');
const theme = await instance?.viewModelAsync('settings/theme');

// Use the nested instance with the property hooks, or its accessors
theme?.stringProperty('name')?.set('Dark Mode');
```

To swap a nested view model for another instance of the same view model, use `replaceViewModel`:

```tsx theme={null}
const otherSettings = await settingsViewModel.createInstanceByNameAsync('Compact');
if (otherSettings) {
    instance.replaceViewModel('settings', otherSettings);
}
```

> [!NOTE]
>
> In `0.5.0` and later, `replaceViewModel` is supported on iOS only. On Android it logs a warning and does nothing.

**Legacy Runtime**

> [!WARNING]
>
> The Rive React Native runtime does not support accessing nested properties using the chain notation.
> But you can access nested properties using the path notation.

```js theme={null}
const [setRiveRef, riveRef] = useRive();
const nestedNumberByPath = useRiveNumber(riveRef, 'My Nested View Model/My Second Nested VM/My Nested Number');
useEffect(() => {
    if (nestedNumberByPath) {
        nestedNumberByPath.setValue(10);
    }
}, [nestedNumberByPath]);
```

### Observability

You can observe changes over time to property values, either by using listeners or a platform equivalent method. Once observed, you will be notified when the property changes are applied by a state machine advance, whether that is a new value that has been explicitly set or if the value was updated as a result of a binding.

**New Runtime (Recommended)**

Values are observed automatically through hooks. When a property's value changes within the Rive instance (either because you set it via a hook or due to an internal binding), the `value` returned by the corresponding hook updates. This state change triggers a re-render of your React component, allowing you to react to the new value.

For Triggers, you can provide an `onTrigger` callback directly to the `useRiveTrigger` hook, which fires when the trigger is activated in the Rive instance.

```tsx theme={null}
import {
    useRiveFile,
    useViewModelInstance,
    useRiveBoolean,
    useRiveString,
    useRiveNumber,
    useRiveColor,
    useRiveEnum,
    useRiveTrigger,
} from '@rive-app/react-native';
import { useEffect } from 'react';

const { riveFile } = useRiveFile(require('./my_file.riv'));
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

const { value: boolValue, setValue: setBoolValue } = useRiveBoolean('My Boolean Property', instance);
const { value: stringValue, setValue: setStringValue } = useRiveString('My String Property', instance);
const { value: numberValue, setValue: setNumberValue } = useRiveNumber('My Number Property', instance);
const { value: colorValue, setValue: setColorValue } = useRiveColor('My Color Property', instance);
const { value: enumValue, setValue: setEnumValue } = useRiveEnum('My Enum Property', instance);
const { trigger: triggerButton } = useRiveTrigger('My Trigger Property', instance, {
    onTrigger: () => {
        console.log('Trigger fired');
    }
});

useEffect(() => {
    if (numberValue !== undefined) {
        console.log('numberValue changed:', numberValue);
    }
}, [numberValue]);

const handleButtonPress = () => {
    triggerButton();
};
```

> [!NOTE]
>
> The `useRiveTrigger` hook returns a `trigger` function that can be called to fire the trigger. This hook accepts an optional `onTrigger` callback in its third parameter that will be executed when the trigger is fired.

**Legacy Runtime**

Values are observed through hooks.

```typescript theme={null}
const [setRiveRef, riveRef] = useRive();
const [boolValue, setBoolValue] = useRiveBoolean(riveRef, 'My Boolean Property');
const [stringValue, setStringValue] = useRiveString(riveRef, 'My String Property');
const [numberValue, setNumberValue] = useRiveNumber(riveRef, 'My Number Property');
const [colorValue, setColorValue] = useRiveColor(riveRef, 'My Color Property');
const [enumValue, setEnumValue] = useRiveEnum(riveRef, 'My Enum Property');
const triggerButton = useRiveTrigger(riveRef, 'My Trigger Property', () => {
    console.log('Trigger fired');
});

useEffect(() => {
    if (numberValue !== undefined) {
        console.log('numberValue changed:', numberValue);
    }
}, [numberValue]);

const handleButtonPress = () => {
    if (triggerButton) {
        triggerButton();
    }
};
```

> [!NOTE]
>
> The `useRiveTrigger` hook does not return a value, but instead takes a callback function as its third argument.
> This callback will be executed when the trigger is fired.

### Images

Image properties let you set and replace raster images at runtime, with each instance of the image managed independently. For example, you could build an avatar creator and dynamically update features — like swapping out a hat — by setting a view model's image property.

**New Runtime (Recommended)**

Image properties can be set using the `imageProperty` method on a `ViewModelInstance` and the `RiveImages` utility for loading images.

```tsx theme={null}
import {
    useRive,
    useRiveFile,
    useViewModelInstance,
    RiveView,
    RiveImages,
} from '@rive-app/react-native';

const { riveViewRef, setHybridRef } = useRive();
const { riveFile } = useRiveFile(require('./my_file.riv'));
const { instance } = useViewModelInstance(riveFile, { async: true });

const handleLoadImage = async () => {
    const imgProp = instance?.imageProperty('imageValue');
    if (!imgProp) return;

    // Load image from URL
    const riveImage = await RiveImages.loadFromURLAsync(
        'https://picsum.photos/id/372/500/500'
    );
    imgProp.set(riveImage);
    riveViewRef?.playIfNeeded();
};

return (
    riveFile && instance && (
        <RiveView
            hybridRef={setHybridRef}
            file={riveFile}
            dataBind={instance}
            autoPlay={true}
        />
    )
);
```

> [!NOTE]
>
> In `0.5.0` and later, `addListener` on image properties is not supported: it returns an unsubscribe function but the listener is never called.

Other image loading options on `RiveImages`:

```ts theme={null}
    /**
    * Load an image from a bundled resource
    * @param resource The resource name (e.g., "image.png")
    * @returns A promise that resolves to the loaded RiveImage
    */
    loadFromResourceAsync(resource: string): Promise<RiveImage>;

    /**
    * Load an image from raw bytes
    * @param bytes The image data as an ArrayBuffer
    * @returns A promise that resolves to the loaded RiveImage
    */
    loadFromBytesAsync(bytes: ArrayBuffer): Promise<RiveImage>;
```

**Legacy Runtime**

> [!WARNING]
>
> Image data binding is not supported on the legacy runtime.

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

**New Runtime (Recommended)**

Use the `useRiveList` hook to manage list properties on view model instances.

```tsx theme={null}
import {
    useRiveFile,
    useViewModelInstance,
    useRiveList,
    RiveView
} from '@rive-app/react-native';

const { riveFile } = useRiveFile(require('./my_file.riv'));
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

// Get the list property with manipulation functions
const {
    length,
    getInstanceAt,
    addInstance,
    addInstanceAt,
    removeInstance,
    removeInstanceAt,
    swap,
    error
} = useRiveList('todos', instance);

// Add a new todo item
const handleAddItem = async () => {
    const todoItemViewModel = await riveFile?.viewModelByNameAsync('TodoItem');
    if (todoItemViewModel) {
        const newTodoItem = await todoItemViewModel.createBlankInstanceAsync();
        if (newTodoItem) {
            // Set some initial values
            newTodoItem.stringProperty('description')?.set('Buy groceries');
            addInstance(newTodoItem);
        }
    }
};

// Insert item at specific index
const handleInsertItem = async () => {
    const todoItemViewModel = await riveFile?.viewModelByNameAsync('TodoItem');
    if (todoItemViewModel) {
        const newTodoItem = await todoItemViewModel.createBlankInstanceAsync();
        if (newTodoItem) {
            addInstanceAt(newTodoItem, 0); // Insert at beginning
        }
    }
};

// Remove first item by instance
const handleRemoveFirst = async () => {
    const firstInstance = await getInstanceAt(0);
    if (firstInstance) {
        await removeInstance(firstInstance);
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

return (
    <RiveView
        file={riveFile}
        dataBind={instance}
        autoPlay={true}
    />
);
```

All `useRiveList` functions except `length` return promises. `length` starts at `0` and updates after each mutation made through the hook.

> [!NOTE]
>
> In `0.5.0` and later, list properties don't report changes made outside of `useRiveList`, such as by the state machine. To read the current state, call `getLengthAsync()` and `getInstanceAtAsync(index)` on the list property from `instance.listProperty('todos')`.

**Legacy Runtime**

> [!WARNING]
>
> List data binding is not supported on the legacy runtime.

### Artboards

Artboard properties allows you to swap out entire components at runtime. This is useful for creating modular components that can be reused across different designs or applications, for example:

* Creating a skinning system that supports a large number of variations, such as a character creator where you can swap out different body parts, clothing, and accessories.
* Creating a complex scene that is a composition of various artboards loaded from various different Rive files (drawn to a single canvas/texture/widget).
* Reducing the size (complexity) of a single Rive file by breaking it up into smaller components that can be loaded on demand and swapped in and out as needed.

**New Runtime (Recommended)**

> [!NOTE]
>
> See the [React Native data binding artboards example](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/demos/DataBindingArtboardsExample.tsx).

Artboard properties work with the `BindableArtboard` class. Use `getBindableArtboard` on a `RiveFile` to create a bindable reference, then set it on the artboard property.

```typescript theme={null}
// Get artboard property from view model instance
const artboardProp = instance.artboardProperty('CharacterArtboard');

// Create a bindable artboard and set it
const bindableArtboard = riveFile.getBindableArtboard('Character 1');
artboardProp?.set(bindableArtboard);
```

The artboard can come from a different `RiveFile` than the one bound to the view, which lets you keep swappable content in a separate file. `getBindableArtboard` throws if the file has no artboard with that name. Use `getArtboardNamesAsync()` on the `RiveFile` to list the available names.

**Legacy Runtime**

> [!WARNING]
>
> Artboard data binding is not supported on the legacy runtime.

### Enums

Enums properties come in two flavors: system and user-defined. In practice, you will not need to worry about the distinction, but just be aware that system enums are available in any Rive file that binds to an editor-defined enum set, representing options from the editor's dropdowns, where user-defined enums are those defined by a designer in the editor.

Enums are string typed. The Rive file contains a list of enums. Each enum in turn has a name and a list of strings.

**New Runtime (Recommended)**

You can access enum properties using the `useRiveEnum` hook. The hook returns the current value and a setter function.

```tsx theme={null}
import {
    useRiveFile,
    useViewModelInstance,
    useRiveEnum,
    RiveView
} from '@rive-app/react-native';

const { riveFile } = useRiveFile(require('./my_file.riv'));
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

const { value: category, setValue: setCategory, error } = useRiveEnum(
    'category',
    instance
);

// Set enum value
setCategory('option_name');

return (
    <RiveView
        file={riveFile}
        dataBind={instance}
        autoPlay={true}
    />
);
```

To list the enums defined in a file and their possible values, use `getEnums`:

```tsx theme={null}
const enums = await riveFile.getEnums();
// [{ name: 'Pets', values: ['dog', 'cat', 'frog'] }, ...]
```

> [!NOTE]
>
> `getEnums` requires `0.5.0` or later.

**Legacy Runtime**

> [!WARNING]
>
> Retrieving the list of enums is not supported on the legacy API.

## Examples

**New Runtime (Recommended)**

See the [example app](https://github.com/rive-app/rive-nitro-react-native/tree/main/example) for data binding demos with the new runtime.

**Legacy Runtime**

See the [Data Binding view](https://github.com/rive-app/rive-react-native/blob/main/example/app/\(examples\)/DataBinding.tsx) in the Example app for a demo.
