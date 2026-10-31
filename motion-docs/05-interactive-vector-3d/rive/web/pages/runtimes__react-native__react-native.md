---
source: https://rive.app/docs/runtimes/react-native/react-native
title: "React Native"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# React Native

React Native runtime for Rive.

> [!WARNING]
>
> Note that certain Rive features may not be supported yet for a particular runtime, or may require using the Rive Renderer.
>
> For more details, refer to the [feature support](/docs/feature-support/) and [choosing a renderer](/docs/runtimes/choose-a-renderer/) pages.

> [!NOTE]
>
> `@rive-app/react-native` is the recommended Rive runtime for React Native. Built with [Nitro](https://nitro.margelo.com/), it replaces the legacy `rive-react-native` package.
>
> Starting with `0.5.0`, it runs on Rive's new native runtimes: the [new Apple runtime](/docs/runtimes/apple/apple) on iOS, and on Android the runtime behind the new [Compose API](/docs/runtimes/android/android). If you're upgrading from `0.4.x` or from `rive-react-native`, see the [migration guide](/docs/runtimes/react-native/migration-guide).
>
> * [GitHub](https://github.com/rive-app/rive-nitro-react-native)
> * [NPM](https://www.npmjs.com/package/@rive-app/react-native)
> * [Release notes](https://github.com/rive-app/rive-nitro-react-native/releases)

## Overview

This guide documents how to get started using the Rive React Native runtime. The source for the new runtime is available in its [GitHub repository](https://github.com/rive-app/rive-nitro-react-native).

**New Runtime (Recommended)**

## Requirements

* **React Native**: 0.78 or later (0.79+ recommended for improved Android error messages)
* **Expo SDK**: 53 or later (for Expo users)
* **iOS**: 15.1 or later
* **Android**: SDK 24 (Android 7.0) or later
* **Xcode**: 16.4 or later
* **JDK**: 17 or later
* **Nitro Modules**: 0.35.10 or later (0.36.2 or later on React Native 0.87+)

## Quick Start

Follow these quick start steps to get familiar with the Rive React Native runtime.

> **[Rive File](https://rive.app/marketplace/24637-health-bar-data-binding-quick-start?utm_source=docs\&utm_medium=content)**
>
> Remix/download the Rive file used in this quick start guide

> **[Complete example](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/demos/QuickStart.tsx)**
>
> View the complete quick start example

**1. Install the dependency**

```bash theme={null}
npm install @rive-app/react-native react-native-nitro-modules
# or for Yarn
yarn add @rive-app/react-native react-native-nitro-modules
```

> [!NOTE]
>
> `react-native-nitro-modules` is required as this library relies on [Nitro Modules](https://nitro.margelo.com/).

**2. Setup**

Import the necessary components and define styles for the following steps.

```ts Imports theme={null}
import {
  RiveView,
  useRive,
  useRiveFile,
  useRiveNumber,
  useRiveTrigger,
  useViewModelInstance,
  Fit,
} from '@rive-app/react-native';
```

```ts Styles theme={null}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rive: {
    width: '100%',
    height: 400,
  },
});
```

**3. Rive File and Component**

The `RiveView` component displays Rive graphics. It requires a single prop: `file`, a `RiveFile` object.

Use the `useRiveFile` hook to load a **riv** file and create a `RiveFile` object. This object can be cached and reused across multiple components.

```ts Loading a file theme={null}
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );

  return (
    <View style={styles.container}>
      {riveFile && <RiveView file={riveFile} style={styles.rive} />}
    </View>
  );
}
```

Further reading:

> **[Props](/docs/runtimes/react-native/props)**
>
> Available view props for `RiveView`

> **[Loading Rive Files](/docs/runtimes/react-native/loading-rive-files)**
>
> How to load Rive files in your app

> **[Caching Rive Files](/docs/runtimes/react-native/caching-a-rive-file)**
>
> Cache Rive files for better performance

**4. Layout**

Configure how the graphic fits within its container.

For this example, we'll set `fit` to `Layout`, which automatically resizes the artboard to match the view size. This is ideal for responsive Rive graphics built with [Layouts](/docs/editor/layouts/layouts-overview).

```ts Layout focus={1, 4, 5} theme={null}
<RiveView
  file={riveFile}
  style={styles.rive}
  fit={Fit.Layout}
/>
```

Further reading:

> **[Runtime layout](/docs/runtimes/react-native/layouts)**
>
> Control how Rive graphics fit and align within their containers

**5. View Reference**

Use the `useRive()` hook to access the Rive view reference for programmatic control.

```ts useRive hook focus={5, 11} theme={null}
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );
  const { riveViewRef, setHybridRef } = useRive();

  return (
    <View style={styles.container}>
      {riveFile && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          fit={Fit.Layout}
          style={styles.rive}
        />
      )}
    </View>
  );
}
```

Further reading:

> **[View methods](/docs/runtimes/react-native/rive-ref-methods)**
>
> See all the available view reference methods.

> **[Hybrid Views](https://nitro.margelo.com/docs/hybrid-views)**
>
> Read more on Nitro Hybrid Views.

**6. Data binding**

Create the view model instance manually using the `useViewModelInstance` hook and pass it to the view.

This approach lets you set initial property values in the `onInit` callback before the view loads and decouples the `ViewModelInstance` from the `RiveView`.

```ts Manually create view model instance focus={6-9, 13, 19} theme={null}
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );
  const { riveViewRef, setHybridRef } = useRive();
  const { instance: viewModelInstance, isLoading, error } = useViewModelInstance(riveFile, {
    async: true,
    onInit: (vmi) => vmi.numberProperty('health')!.set(20),
  });

  return (
    <View style={styles.container}>
      {riveFile && viewModelInstance && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          fit={Fit.Layout}
          style={styles.rive}
          dataBind={viewModelInstance}
        />
      )}
    </View>
  );
}
```

Use the view model property hooks to update and listen to property changes.

```ts Property hooks focus={11-38, 51-53} expandable theme={null}
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );
  const { riveViewRef, setHybridRef } = useRive();
  const { instance: viewModelInstance, isLoading, error } = useViewModelInstance(riveFile, {
    async: true,
    onInit: (vmi) => vmi.numberProperty('health')!.set(20),
  });

  const { value: health, setValue: setHealth } = useRiveNumber(
    'health',
    viewModelInstance
  );

  console.log('health', health);

  const { trigger: gameOverTrigger } = useRiveTrigger(
    'gameOver',
    viewModelInstance,
    { onTrigger: () => console.log('Game Over Triggered') }
  );

  const handleTakeDamage = () => {
    setHealth((h) => (h ?? 0) - 7);
    riveViewRef!.playIfNeeded();
  };

  const handleMaxHealth = () => {
    setHealth(100);
    riveViewRef!.playIfNeeded();
  };

  const handleGameOver = () => {
    setHealth(0);
    gameOverTrigger();
    riveViewRef!.playIfNeeded();
  };

  return (
    <View style={styles.container}>
      {riveFile && viewModelInstance && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          fit={Fit.Layout}
          style={styles.rive}
          dataBind={viewModelInstance}
        />
      )}
      <Button onPress={handleTakeDamage} title="Take Damage" />
      <Button onPress={handleMaxHealth} title="Max Health" />
      <Button onPress={handleGameOver} title="Game Over" />
    </View>
  );
}
```

> [!WARNING]
>
> We call `playIfNeeded` to force the state machine to play. Under some circumstances, the state machine might be settled if there is no active timeline in the graphic.
>
> This is a temporary workaround. In the future, this will happen automatically.

Further reading:

> **[Data binding](/docs/runtimes/react-native/data-binding)**
>
> See the runtime data binding documentation for more information.

> [!NOTE]
>
> See our [example app](https://github.com/rive-app/rive-nitro-react-native/tree/main/example) for more usage examples.

## Key Components

### `RiveView`

The component to render Rive content:

```ts theme={null}
<RiveView
  file={riveFile}
/>
```

See the available [props](/docs/runtimes/react-native/props) and [methods](/docs/runtimes/react-native/rive-ref-methods).

### `useRiveFile`

Hook for loading Rive files from a URL or local source:

```javascript theme={null}
const { riveFile } = useRiveFile(
  'https://cdn.rive.app/animations/vehicles.riv'
);
// or
// const { riveFile } = useRiveFile(require('./assets/graphic.riv'));
```

See [loading Rive files](/docs/runtimes/react-native/loading-rive-files) and [caching Rive files](/docs/runtimes/react-native/caching-a-rive-file) for more information.

### `useRive`

Hook to access the Rive view reference for programmatic control:

```javascript theme={null}
const { riveViewRef, setHybridRef } = useRive();

<RiveView
  hybridRef={setHybridRef}
  file={riveFile}
/>
```

This is a [Nitro Hybrid View](https://nitro.margelo.com/docs/hybrid-views). See the available [view reference methods](/docs/runtimes/react-native/rive-ref-methods).

### `useViewModelInstance`

Hook to create a view model instance from a `RiveFile`, `ViewModel`, or `RiveViewRef`.

Pass `async: true` to create the instance asynchronously. The hook returns `{ instance, isLoading, error }` and the instance is not available on the first render, so gate rendering on it. Without `async: true`, the instance is created through deprecated synchronous APIs that block the JS thread.

```ts theme={null}
// From RiveFile — default artboard's ViewModel, default instance
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true });

// From RiveFile — specify artboard or ViewModel name (mutually exclusive)
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, artboardName: 'MainArtboard' });
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, viewModelName: 'Settings' });

// instanceName can be combined with any of the above to pick a specific instance
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, instanceName: 'PersonInstance' });
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, viewModelName: 'Settings', instanceName: 'UserSettings' });

// From a ViewModel object
const { instance: namedInstance, isLoading, error } = useViewModelInstance(viewModel, { async: true, name: 'My Instance' });
const { instance: newInstance, isLoading, error } = useViewModelInstance(viewModel, { async: true, useNew: true });

// With required: true (throws once resolved to null, use with Error Boundary)
const { instance, isLoading, error } = useViewModelInstance(riveFile, { async: true, required: true });

// With onInit to set initial values before the instance is exposed or bound
const { instance, isLoading, error } = useViewModelInstance(riveFile, {
  async: true,
  onInit: (vmi) => {
    vmi.numberProperty('health')!.set(100);
  },
});
```

> [!NOTE]
>
> `async: true` is available in `@rive-app/react-native@0.4.18` and later. The synchronous creation path is deprecated and will be removed in a future release.

Pass the `dataBind` prop in `RiveView`.

```ts theme={null}
return (
  <RiveView
    file={riveFile}
    dataBind={instance}
  />
);
```

You can also get the auto-bound instance from a `RiveViewRef` — the hook waits for the view's auto-bound instance to become available:

```javascript theme={null}
import { useRive, useViewModelInstance } from '@rive-app/react-native';

const { riveViewRef, setHybridRef } = useRive();
const { instance, isLoading, error } = useViewModelInstance(riveViewRef, { async: true });
```

See the [runtime data binding documentation](/docs/runtimes/react-native/data-binding) for more information.

## Frame rate

By default, `RiveView` renders at the display's refresh rate. Use the `frameRate` prop to cap it, for example to reduce the CPU and battery cost of a looping animation that doesn't need 120 Hz:

```tsx theme={null}
// Cap rendering at 30 frames per second
<RiveView file={riveFile} frameRate={30} />

// Let the system pick a rate between 30 and 60, ideally 60
<RiveView file={riveFile} frameRate={{ minimum: 30, maximum: 60, preferred: 60 }} />
```

A range maps to `CAFrameRateRange` on iOS. Android doesn't support ranges, so it caps at `preferred`, or `maximum` if `preferred` isn't set. Remove the prop to return to the display's refresh rate.

Capping limits how many frames are drawn, not animation speed: playback still advances by the real time elapsed between frames.

> [!NOTE]
>
> `frameRate` requires `0.5.0` or later.

## Semantics

Rive views can expose [semantics defined in the editor](/docs/editor/accessibility/semantics) to VoiceOver on iOS. See [Semantics](/docs/runtimes/react-native/semantics) for the available modes.

## Troubleshooting

### Android build fails on Windows (CMake long-path error)

On Windows, the Android build can fail with `ninja: error: mkdir(CMakeFiles/rive.dir/...): No such file or directory` because paths exceed the Windows `MAX_PATH` (260-character) limit. This is a [known issue across React Native libraries that use CMake](https://docs.swmansion.com/react-native-reanimated/docs/guides/building-on-windows/).

To fix this, set the `CMAKE_VERSION` environment variable to a newer CMake version (e.g. `3.31.6`) before building:

```bash theme={null}
set CMAKE_VERSION=3.31.6
```

See the [Reanimated docs on building on Windows](https://docs.swmansion.com/react-native-reanimated/docs/guides/building-on-windows/) for full setup instructions.

## Resources

> **[GitHub](https://github.com/rive-app/rive-nitro-react-native)**

> **[NPM](https://www.npmjs.com/package/@rive-app/react-native)**

> **[Example App](https://github.com/rive-app/rive-nitro-react-native/tree/main/example)**

**Legacy Runtime**

> [!WARNING]
>
> The legacy runtime is still supported, but we recommend migrating to the new runtime for better performance and features.

This guide documents how to get started using the legacy React Native runtime library. The source is available in its [GitHub repository](https://github.com/rive-app/rive-react-native). This library contains an API for React Native apps to easily integrate Rive assets.

The minimum iOS target is **14.0**

> [!NOTE]
>
> See [our documentation](/docs/runtimes/react-native/adding-rive-to-expo) to add
> Rive to an Expo app.

## Getting Started

Follow the steps below for a quick start on integrating Rive into your React Native app.

**1. Install the dependency**

```bash theme={null}
npm install rive-react-native
# or for Yarn
yarn add rive-react-native
```

**2. iOS - Pod Install**

`cd` inside the `ios` folder and run `pod install` (if deploying to iOS)

> [!NOTE]
>
> If you run into issues here, you may need to bump the `ios` deployment version target to at least `14.0`. You can find this version in the `Podfile` of the `ios/` folder.

**3. Android - Set Kotlin Dependency Resolution**

This step may be optional - however, if your Android setup in the React Native project does not have Kotlin `v1.8.0+` set up, you may run into duplicate class issues when building the project. To mitigate these issues, as suggested by [Kotlin docs](https://kotlinlang.org/docs/gradle-configure-project.html#versions-alignment-of-transitive-dependencies), add the following to your dependencies in your application's `build.gradle` file to deal with version alignment:

```javascript theme={null}
dependencies {
    implementation platform('org.jetbrains.kotlin:kotlin-bom:1.8.0')
    ...
}
```

**4. Add the Rive component**

```javascript theme={null}
import Rive from 'rive-react-native';

function App() {
  return <Rive
      url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
      artboardName="Avatar 1"
      stateMachineName="avatar"
      style={{width: 400, height: 400}}
  />;
}
```

## Resources

> **[GitHub](https://github.com/rive-app/rive-react-native)**

> **[Example App](https://github.com/rive-app/rive-react-native/tree/main/example)**
