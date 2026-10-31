---
source: https://rive.app/docs/runtimes/getting-started
title: "Getting Started with the Rive Runtimes"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Getting Started with the Rive Runtimes

Run Rive on your platform of choice.

The Rive runtimes are open-source libraries that allow you to load and control your animations in apps, games, and websites. Dive into each of the subpages to get started!

> [!WARNING]
>
> Note that certain Rive features may not be supported yet for a particular runtime, or may require using the Rive Renderer.
>
> For more details, refer to the [feature support](/docs/feature-support/) and [choosing a renderer](/docs/runtimes/choose-a-renderer/) pages.

## How to use this guide

In this section you'll find runtime subpages that provide all the needed information and resources to get started on your platform of choice. See [Installation and getting started](#installation-and-getting-started) below.

You'll also find pages dedicated to controlling your Rive graphics at runtime. For example, updating data bound properties and loading in assets out-of-band. See [Graphic control and interaction](#graphic-control-and-interaction) below.

### Installation and getting started

> [!NOTE]
>
> Make sure to check out the additional documentation provided under each runtime section. These documents provide platform-specific considerations, migration guides, and advanced usage information.

> **[Web (JS)](/docs/runtimes/web)**
>
> This guide documents how to get started using the Web runtime library.

> **[React](/docs/runtimes/react)**
>
> This guide documents how to get started using the React runtime library.

> **[React Native](/docs/runtimes/react-native)**
>
> This guide documents how to get started using the React Native runtime library.

> **[Apple](/docs/runtimes/apple)**
>
> This guide documents how to get started using the Apple runtime library.

> **[Android](/docs/runtimes/android)**
>
> This guide documents how to get started using the Android runtime library.

> **[Flutter](/docs/runtimes/flutter)**
>
> This guide documents how to get started using the Flutter runtime library.

> **[Unity](/docs/game-runtimes/unity)**
>
> This guide documents how to get started using the Unity runtime library.

> **[Unreal](/docs/game-runtimes/unreal)**
>
> This guide documents how to get started using the Unreal runtime library.

## Other sections

> **[Choose a Renderer](/docs/runtimes/choose-a-renderer)**
>
> Specify the desired renderer to use at runtime. Each runtime provides different options. We recommend using the Rive Renderer.

> **[Format](/docs/runtimes/advanced-topic/format)**
>
> The Rive File format.

> **[Feature Support](/docs/feature-support)**
>
> Runtime support for Rive features.

## Versioning

As we publish updates to our Rive editor, we will occasionally push updated runtimes to support the new features. See [Feature Support](/docs/feature-support) for the required minimum runtime version needed for specific features.

In most cases, the newest runtimes will also support previous versions of your Rive assets, so you will not need to re-export assets to update to the latest runtimes.

There are a number of ways to export your Rive files in cases where re-exporting is necessary to take advantage of the latest features. Check out our documentation on [Exporting](/docs/editor/exporting) for more information.

## Official runtimes

Check out the runtime subpages for steps on how to get started!

> **Web**
>
> All web runtimes are distributed via npm:
>
> * [GitHub](https://github.com/rive-app/rive-wasm)
> * [canvas](https://www.npmjs.com/package/@rive-app/canvas)
> * [webgl2](https://www.npmjs.com/package/@rive-app/webgl2)
> * [canvas-lite](https://www.npmjs.com/package/@rive-app/canvas-lite)
>
> **See [Canvas vs WebGL2](/docs/runtimes/web/canvas-vs-webgl) for package guidance and sizing tradeoffs.**

> **React**
>
> All React runtimes are distributed via npm:
>
> * [GitHub](https://github.com/rive-app/rive-react)
> * [canvas](https://www.npmjs.com/package/@rive-app/react-canvas)
> * [canvas-lite](https://www.npmjs.com/package/@rive-app/react-canvas-lite)
> * [webgl2](https://www.npmjs.com/package/@rive-app/react-webgl2)

> **Apple**
>
> The Apple runtime is distributed by:
>
> * [Swift Package Manager](https://swiftpackageregistry.com/rive-app/rive-ios)
> * Cocoapods
>
> [GitHub](https://github.com/rive-app/rive-ios)

> **Android**
>
> * [Maven](https://search.maven.org/artifact/app.rive/rive-android)
> * [GitHub](https://github.com/rive-app/rive-android)

> **Flutter**
>
> * [pub.dev](https://pub.dev/packages/rive)
> * [GitHub](https://github.com/rive-app/rive-flutter)

> **C++ (Mac/Linux/Windows)**
>
> * [GitHub](https://github.com/rive-app/rive-cpp)

> **C#**
>
> * [UWP (Recommended)](https://dev.azure.com/dotnet/CommunityToolkit/_artifacts/feed/CommunityToolkit-Labs/NuGet/CommunityToolkit.Labs.Uwp.RivePlayer/overview/0.0.1)
> * [WinUI](https://dev.azure.com/dotnet/CommunityToolkit/_artifacts/feed/CommunityToolkit-Labs/NuGet/CommunityToolkit.Labs.WinUI.RivePlayer/overview/0.0.1)
> * (High-level API) [RivePlayer Github](https://github.com/CommunityToolkit/Labs-Windows/blob/main/labs/RivePlayer/samples/RivePlayer.Samples/RivePlayer.md)
> * (Low-level API) [RiveSharp Github](https://github.com/rive-app/rive-sharp)
>
> **High-level APIs**:
>
> * [WinUI (High-level)](https://dev.azure.com/dotnet/CommunityToolkit/_artifacts/feed/CommunityToolkit-Labs/NuGet/CommunityToolkit.Labs.WinUI.RivePlayer/overview/0.0.1)

> **React Native**
>
> * [npm](https://www.npmjs.com/package/@rive-app/react-native)
> * [GitHub](https://github.com/rive-app/rive-nitro-react-native)
> * Legacy `rive-react-native`: [npm](https://www.npmjs.com/package/rive-react-native), [GitHub](https://github.com/rive-app/rive-react-native)

## Community runtimes

| **Runtime** | **Author** | **Link** |
| - | - | - |
| QtQuick | [basysKom](https://github.com/basysKom) | [Github](https://github.com/basysKom/RiveQtQuickPlugin) |
| UWP (C#) | Windows Community Toolkit | [Github](https://github.com/CommunityToolkit/Labs-Windows/blob/main/components/RivePlayer/samples/RivePlayer.md) |
| RiveCMP | [muazkadan](https://github.com/muazkadan) | [Github](https://github.com/muazkadan/Rive-CMP/blob/main/README.md) |

## Handling .riv files

When checking in `.riv` files with Git, consider adding a `.gitattributes` file and marking `.riv` files as `binary` files to prevent Git from changing line endings when these files are checked in. Otherwise, some platforms may accidentally corrupt the `.riv` file where there are line returns (i.e. Windows CRLF line endings vs LF line endings) and cause issues at runtime when the file is read.

```riv theme={null}
.gitattributes

*.riv binary
```

## Licensing

Our official runtimes are all open-source and licensed under the [MIT License](https://choosealicense.com/licenses/mit/). You're free to use them for personal and commercial applications.

## Contributing

Since all the runtimes are open-source, we encourage you to dive in and take a look around! If you see something missing or feel you can improve upon it, then fork it!
