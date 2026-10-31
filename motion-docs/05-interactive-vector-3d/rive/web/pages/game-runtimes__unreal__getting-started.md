---
source: https://rive.app/docs/game-runtimes/unreal/getting-started
title: "Getting Started"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Getting Started

Install the Rive Unreal plugin, run your first Artboard via URiveActorComponent, and display it in UMG.

This guide walks you through installing the Rive Unreal plugin, importing a `.riv` file, and displaying it in UMG.

> [!NOTE]
>
> **Prerequisites**
>
> * Unreal Engine 5.6 or above.
> * A C++ toolchain. The Rive plugin is a C++ plugin, so it's compiled as part
>   of your project regardless of how you install it:
>   * **Windows**: Visual Studio 2022 with the **Game development with C++**
>     workload (it includes the Windows SDK and .NET components Unreal needs).
>   * **macOS**: Xcode with the command-line tools (`xcode-select --install`).

## 1) Install the plugin

**Fab (Recommended)**

**Step 1**

Open the Epic Games Launcher or Unreal Editor.

**Step 2**

Open Fab.

**Step 3**

Search for Rive or go directly to:\
[https://www.fab.com/listings/3a2968c1-4a1d-427c-934e-92e4d8578b77](https://www.fab.com/listings/3a2968c1-4a1d-427c-934e-92e4d8578b77)

**Step 4**

Add the plugin to your engine or project.

**Step 5**

Restart Unreal Engine if prompted.

**GitHub**

**Step 1**

Clone the repository:

```bash theme={null}
git clone https://github.com/rive-app/rive-unreal.git
```

**Step 2**

Copy the `Rive` plugin folder into your project's `Plugins/` directory.

## 2) Build the project

The Rive plugin is C++, so your project must be compiled before the editor
can load it.

**Windows**

**Step 1**

Right-click your `.uproject` file and choose **Generate Visual Studio
project files**.

**Step 2**

Open the generated `.sln` in Visual Studio 2022.

**Step 3**

Set the configuration to **Development Editor** / **Win64** and build.

**macOS**

**Step 1**

Right-click your `.uproject` file and choose **Generate Xcode
project**.

**Step 2**

Open the generated project in Xcode and build the editor target.

Alternatively, double-click the `.uproject` directly — if the plugin modules
aren't built, Unreal offers to rebuild them; click **Yes**.

## 3) Enable the plugin

1. Open Edit → Plugins.
2. Locate Rive under Runtime.
3. Enable the plugin.
4. Restart the editor if required.

## 4) Import a Rive file

1. Open the Content Browser.
2. Drag and drop a `.riv` file into your project.

Unreal creates a **Rive File** asset. You can inspect this asset by double-clicking it.

> [!NOTE]
>
> A **Rive File** is an Unreal asset. It does not render directly.

> [!WARNING]
>
> The Unreal runtime does not yet support referenced assets. Be sure to embed all assets in the `.riv` file.

## 5) Create a widget

1. Right-click on the **Rive file** asset and select **Create Rive Widget** from the context menu.

![Right-click context menu on a Rive file asset with Create Rive Widget highlighted](https://mintcdn.com/rive/a3RZupK5rr01QGMI/images/unreal/DuelistContextMenu.png?fit=max\&auto=format\&n=a3RZupK5rr01QGMI\&q=85\&s=517347c8b6b6b4d0933d778737d19bf4)

You can inspect the created widget by double-clicking it.

![Widget inspector showing the created Rive widget's properties](https://mintcdn.com/rive/a3RZupK5rr01QGMI/images/unreal/DuelistWidgetInspector.png?fit=max\&auto=format\&n=a3RZupK5rr01QGMI\&q=85\&s=c2096271ff7b9d0dc2ed647ce5c211af)

## 6) Create a Blueprint

1. You can now use the widget in a blueprint just as you would any other widget.

   ![Blueprint graph adding the Rive widget to the viewport like any other UMG widget](https://mintcdn.com/rive/a3RZupK5rr01QGMI/images/unreal/DuelistAddWidgetBP.png?fit=max\&auto=format\&n=a3RZupK5rr01QGMI\&q=85\&s=5fe92d5291013390c2fff2b7a51cdeff)

## 7) Bind a ViewModel

If the Rive File is not using **autobinding**, you must assign a viewmodel. This can be done in blueprints using the **Make View Model** node.

![Blueprint graph using the Make View Model node to assign a viewmodel to the Rive widget](https://mintcdn.com/rive/a3RZupK5rr01QGMI/images/unreal/DuelistSetViewModel.png?fit=max\&auto=format\&n=a3RZupK5rr01QGMI\&q=85\&s=a13159226bdbd07b01a841309e2eaee5)

Your **Rive File** is now setup for use in your application. The next page will show you how to observe changes in the ViewModel.

![The finished Rive artboard rendering inside the Unreal Engine viewport](https://mintcdn.com/rive/a3RZupK5rr01QGMI/images/unreal/DuelistScreenshotUE.png?fit=max\&auto=format\&n=a3RZupK5rr01QGMI\&q=85\&s=01076c5c827eecff8daa838d37f9913e)
