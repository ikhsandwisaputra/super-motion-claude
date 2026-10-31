---
source: https://rive.app/docs/editor/fundamentals/artboards
title: "Artboards"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Artboards

Learn how to create, manage, and configure artboards in Rive.

[YouTube video player](https://www.youtube.com/embed/xdqqPAlB4n8)

Artboards are the foundation of your composition across both [Design and Animate mode](/docs/editor/fundamentals/design-vs-animate-mode). Each artboard defines a scene with its own dimensions, background, hierarchy, animations, and state machines.

Every Rive file contains at least one artboard, but you can create any number of artboards on the [Stage](/docs/editor/interface-overview/stage).

Artboards can also be converted to [components](/docs/editor/fundamentals/components), allowing you to create and control multiple instances of an artboard within your composition.

## Creating Artboards

### From a new Rive file

When you create a new Rive file, you'll be prompted to create an artboard. Choose a size from one of the presets, or enter a custom width and height. You can resize the artboard at any time.

![New artboard size options](https://mintcdn.com/rive/iRINob2fVJHPUGWI/images/editor/artboards/artboard-size-presets.png?fit=max\&auto=format\&n=iRINob2fVJHPUGWI\&q=85\&s=a3564eebe29aae6563072d1e5f3d353e)

The width and height define the artboard's dimensions in Rive. The size and aspect ratio at runtime may differ depending on the available space and your [layout settings](/docs/editor/layouts/layouts-overview).

> [!NOTE]
>
> Artboard dimensions are measured in units rather than pixels. For example, if a 500-unit-wide artboard is displayed at 1000 pixels wide, each unit represents 2 pixels. For simplicity, you can often treat these units like pixels while working in the editor.

### Creating additional Artboards

A Rive file can contain multiple artboards.

**Step 1**

Select the **Artboard Tool** or press **A**.

**Step 2**

Click and drag anywhere on the stage to create an artboard.

<video />

Artboards can't be nested directly inside other artboards. To nest an artboard, first convert it to a [component](/docs/editor/fundamentals/components).

### Copying Artboards

Select an artboard and press **Cmd/Ctrl + D** to duplicate the artboard and all of its contents.

![Copying an artboard](https://mintcdn.com/rive/iRINob2fVJHPUGWI/images/editor/artboards/copy-artboard.gif?s=53d6c915f929b3ed4048ab6c19673aa4)

## Managing Artboards

Each artboard has its own hierarchy, animations, state machines, and properties.

### Hierarchy

Each artboard has its own hierarchy containing the objects that belong to that artboard. Select an artboard to view its hierarchy in the Hierarchy panel.

See [Hierarchy](/docs/editor/interface-overview/hierarchy) for more information about organizing and navigating objects.

### Animations & State Machines

Animations and state machines belong to individual artboards. Select an artboard to view and edit its animations and state machines.

See [Animations](/docs/editor/animate-mode/animate-mode-overview) and [State Machines](/docs/editor/state-machine/state-machine) to learn more.

## Artboard properties

Select an artboard to view and edit its properties in the Inspector.

![Inspector with an artboard selected](https://mintcdn.com/rive/iRINob2fVJHPUGWI/images/editor/artboards/artboard-inspector.png?fit=max\&auto=format\&n=iRINob2fVJHPUGWI\&q=85\&s=8e1eb4000a317890358c3fbeffb8cfcc)

* **Transform** - Set the artboard's position, size, scale, rotation, and origin.
* **Layout** - Control how the artboard responds when its size changes. See [Layout](/docs/editor/layouts/layouts-overview).
* **Fill** - Set the artboard's background color.
* **Model** - Choose the [view model](/docs/editor/data-binding/binding-data) associated with the artboard.
* [Clip](#clip) - Control whether content outside the artboard's bounds is visible.

### Clip

Enabling the **Clip** toggle hides content that extends beyond the bounds of the artboard.

> [!WARNING]
>
> Clipping can be expensive to render, so only enable it when needed.

In most cases, you don't need to enable **Clip** on a top-level artboard because content outside its bounds isn't rendered at runtime.

![Toggling Clip on an artboard](https://mintcdn.com/rive/iRINob2fVJHPUGWI/images/editor/artboards/clip.gif?s=b49fcff9b7ea3798d86d3e3d67405a0d)

## Default Artboard & State Machine

The default artboard and state machine are used at runtime when an artboard or state machine isn't explicitly specified.

To change the default, use the dropdown to select the artboard and state machine you want to use.

![Selecting a default artboard](https://mintcdn.com/rive/iRINob2fVJHPUGWI/images/editor/artboards/default-artboard.png?fit=max\&auto=format\&n=iRINob2fVJHPUGWI\&q=85\&s=0f6b587a768c5cb9ef1548ebb6aeb7cf)
