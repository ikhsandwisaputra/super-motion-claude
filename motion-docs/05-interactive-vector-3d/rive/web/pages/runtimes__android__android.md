---
source: https://rive.app/docs/runtimes/android/android
title: "Android"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Android

The Android runtime for Rive.

Welcome to using Rive on Android. Rive runtime libraries are open-source, with Android available in the [rive-android](https://github.com/rive-app/rive-android) GitHub repository.

> [!WARNING]
>
> Note that certain Rive features may not be supported yet for a particular runtime, or may require using the Rive Renderer.
>
> For more details, refer to the [feature support](/docs/feature-support/) and [choosing a renderer](/docs/runtimes/choose-a-renderer/) pages.

## The two Android APIs

Rive for Android provides two main APIs for integrating Rive into your application.

**The New Compose API (Beta)**

This API is designed for Jetpack Compose, allowing for a more modern and declarative approach to building UIs. It is currently in beta and undergoing additional testing, and some issues may be uncovered during development. We will work to address these quickly as they come up. It is feature complete, production ready, and recommended for any new projects using Compose, while existing projects should migrate when feasible.

The entry point for this API is the `Rive` composable function, which can be used directly within your Compose UI code.

In addition to providing a more idiomatic Compose experience, this API is also powered by a stronger threading model with higher stability and flexibility to spread Rive work across multiple threads.

In the future this threading model will also include a View-based API for projects that cannot use Compose.

**The Legacy View-based API**

This API is based on Android Views and XML layouts. It has been widely deployed in production applications. It also supports [Compose by using AndroidView](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LegacyComposeActivity.kt), though it does require some boilerplate to set up.

The entry point for this API is the `RiveAnimationView`, which can be added to your XML layouts or instantiated programmatically.

We refer to this as the "legacy" API as we are focusing our development efforts on the new Compose API going forward, though this API will continue to be supported and maintained for some time. For all new development projects, we recommend using the new Compose API. Additionally, we recommend migrating existing projects to the new API when feasible, as this version will be deprecated in the future and will have limited to no new feature development.

## Sample App

To explore the Android API, you can run our Android sample app. Each activity demonstrates a particular feature of the Rive Android runtime.

```bash theme={null}
git clone https://github.com/rive-app/rive-android
```

Open the cloned folder in Android Studio and select the `app` configuration and target device. Ensure that the build variant is set to `preview (default)` by opening the menu `Build - Select Build Variant...` and selecting the `preview (default)` variant for `app`.

The other build variants are for development purposes and require additional configuration. See [CONTRIBUTING.MD](https://github.com/rive-app/rive-android/blob/master/CONTRIBUTING.md).

## Getting Started

If you are looking for getting started instructions for the Legacy API, see [Getting Started (Legacy API)](/docs/runtimes/android/legacy-getting-started).

### Adding Rive to your project

**1. Add the Rive dependency**

Add the following dependencies to your `build.gradle` file in your project. We recommend using the latest version of the Rive Android runtime, which can be found on [Maven Central](https://central.sonatype.com/artifact/app.rive/rive-android).

```groovy theme={null}
dependencies {
    ...
    implementation 'app.rive:rive-android:11.9.2'
    // For initialization, you may want to add a dependency on Jetpack Startup
    implementation "androidx.startup:startup-runtime:1.1.1"
}
```

**2. Initializing Rive**

Rive needs to link and initialize its C++ runtime for its Kotlin bindings to work.

This can be done via an [initializer](https://developer.android.com/topic/libraries/app-startup) which does this automatically at app startup time. The initialization provider can be set up directly in your app's manifest file.

```xml theme={null}
<manifest ...>
  <application ...>
    <provider
      android:name="androidx.startup.InitializationProvider"
      android:authorities="${applicationId}.androidx-startup"
      android:exported="false"
      tools:node="merge">
        <meta-data android:name="app.rive.runtime.kotlin.RiveInitializer"
          android:value="androidx.startup" />
    </provider>
  </application>
</manifest>
```

Otherwise this can be achieved by calling the initializer in your code.

```kotlin theme={null}
AppInitializer.getInstance(applicationContext)
  .initializeComponent(RiveInitializer::class.java)
```

If you want to initialize Rive yourself, this can be done in code using the following. This is the most flexible option, as you can lazily load the native library, but be sure to call it before any Rive functionality is used.

```kotlin theme={null}
Rive.init(context)
```

**3. Add Rive to your layout**

You can now add `Rive` composables to your Compose layouts. See the following sections for details. If you are using the legacy API, see [Getting Started (Legacy API)](/docs/runtimes/android/legacy-getting-started) instead.

### Enabling logging

The Compose API uses extensive logging, especially at the debug level, to help diagnose issues. By default there is no logger enabled. Most commonly you will want to set the global logger to pipe to Android's Logcat, which has a convenience function as follows. This could be done in your activity's `onCreate` method or in your `Application` subclass, for instance, before any Rive functionality is used.

```kotlin theme={null}
RiveLog.logger = RiveLog.LogcatLogger()
```

### Adding Rive to your composition

**1. Creating a Worker**

The Compose API uses an explicit Rive worker which owns a thread for Rive operations, including file and asset decoding, advancing, and drawing. Before you can use any of the API surface, you must create a worker to host these operations. Be aware that the worker must live for the duration of all Rive resources made from it.

The simplest API within a Compose context is `rememberRiveWorker`, which will create and remember a worker for the lifetime of the composition. However, if you want to handle any unexpected errors during worker creation, you can use `rememberRiveWorkerOrNull`, which will return `null` if the worker could not be created and forward the error to an error state you provide.

```kotlin theme={null}
setContent {
    // Simple
    val riveWorker = rememberRiveWorker()

    // Safe
    val errorState = remember { mutableStateOf<Throwable?>(null) }
    val riveWorker = rememberRiveWorkerOrNull(errorState)
    if (riveWorker == null) {
        // Handle the error and early return
        return@setContent
    }
}
```

**2. Loading a Rive File**

Before you can display a Rive element, you must load a Rive file, i.e. an exported .riv file. Rive files are specified by a `RiveFileSource`, which can be either a `RawRes` (for local raw resources) or a `Bytes` (for raw byte data, from any source including the network). In this case, we'll use a raw resource for simplicity. That source, along with the above worker, are passed to `rememberRiveFile`, which internally will load and cache the file for use in the composition.

```kotlin theme={null}
setContent {
  ... // riveWorker from above

  val riveFile = rememberRiveFile(
      RiveFileSource.RawRes.from(R.raw.my_rive_file),
      riveWorker
  )
}
```

The returned value is a `Result<RiveFile>`, which can be either `Loading`, `Success`, or `Error`. This pattern requires you to handle the loading and error states appropriately in your UI. Typically this is done with a `when` statement.

```kotlin theme={null}
when (riveFile) {
    is Result.Loading -> LoadingIndicator()
    is Result.Error -> /* Handle error */
    is Result.Success -> {
        // The `RiveFile` is held in the `value` property
        val file = riveFile.value
        // Use the file - see next step
    }
}
```

**3. Using the Rive Composable**

With the loaded `RiveFile` you can now display it using the `Rive` composable. The worker is captured in the Rive file, so those two components are all that are needed. Without specifying further, this will choose the default artboard and state machine, as specified in the Rive editor. Further options are explored in the other documentation sections, such as [Artboards](/docs/runtimes/artboards), [State Machines](/docs/runtimes/state-machines), and [Data Binding](/docs/runtimes/data-binding).

```kotlin theme={null}
when (riveFile) {
    ...
    is Result.Success -> {
        Rive(riveFile.value)
    }
}
```

## Resources

[GitHub](https://github.com/rive-app/rive-android)

[Examples](https://github.com/rive-app/rive-android/tree/master/app/src/main/java/app/rive/runtime/example)
