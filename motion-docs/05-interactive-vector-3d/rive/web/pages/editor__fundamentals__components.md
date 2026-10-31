---
source: https://rive.app/docs/editor/fundamentals/components
title: "Components"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Components

Create reusable artboards that can be instanced throughout your Rive files.

Components are reusable artboards. Create a component once, then use customized instances of it throughout your Rive file. Changes made to the source component are reflected across all of its instances.

You can use components in several ways:

* Place a component inside another artboard as a nested component.
* Reference a component from a [View Model property](/docs/editor/data-binding/property-types#view-model), allowing you to swap them at runtime.
* [Instantiate components from scripts](/docs/scripting/protocols/node-scripts#instantiating-components).
* Use components as items in [Lists](/docs/editor/data-binding/lists).

Components can include their own graphics, animations, state machines, and data, allowing you to build complex experiences from smaller, reusable pieces.

[YouTube video player](https://www.youtube.com/embed/HRUr9mnh41A)

## Creating a component

### Converting Artboards to components

Any artboard can be converted into a reusable component.

**Step 1**

Select an artboard.

**Step 2**

In the Inspector, select the **Component** icon or press `Shift` + `N`.

You can identify components by their purple artboard title on the stage.

![Convert an artboard to a component](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/convert-to-component.gif?s=f8403ff190ab8b3bb04d9565022f5755)

> [!NOTE]
>
> Artboards that aren't components aren't exported with your Rive file. This can be useful for artboards used only while authoring, such as tests or reference artboards.

### Converting objects to components

You can select one or more objects on an artboard and convert them into a new component.

**Step 1**

Select the object or objects you want to convert.

**Step 2**

Right-click the selection and select **Create Component**.

Rive creates a new component containing the selected objects and replaces the original selection with an instance of that component.

![Create a new component from an element inside the artboard](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/convert-object-to-component.gif?s=c49c918aedbb2c35c57864db178fa077)

**Animations and State Machines**

If the selected objects are animated by a timeline on the original artboard, the relevant keys are removed from that timeline and copied to a new timeline inside the component.

State machines aren't copied to the new component. State machines can depend on objects, animations, data, and other elements outside the selection, so you'll need to create a new state machine inside the component.

Data bindings are copied to the new component, but their view models are not.

#### Troubleshooting

Components are self-contained, so Rive can't create a component if the selection depends on objects outside of it. Make sure you include any required dependencies in your selection.

For example, a draw order dependency that crosses the new component's boundary will prevent the component from being created and display the **"Can't create component"** error: **"These dependencies point across the new component's boundary and would break."**

![Can't create component error caused by a dependency crossing the component boundary](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/cannot-create-new-component.png?fit=max\&auto=format\&n=mie7MGdTQlymQtSr\&q=85\&s=0bcd995426043071ec0e6fbfc32bf567)

## Placing components

Use the **Component Tool**, formerly known as the Nested Artboard Tool, to place instances of components on the stage. Select the tool from the toolbar or press `N`.

Click anywhere on the stage to choose from the available components and place an instance at that location.

![Placing a component instance by clicking stage with the Component Tool and choosing from the menu of available components](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/place-component.gif?s=0f6cbe26f9a10206012f43dd1d952325)

> [!NOTE]
>
> If an artboard doesn't appear in the component menu, make sure you've [converted it to a component](#converting-artboards-to-components).

Alternatively, use the dropdown next to the **Component Tool** to choose a component before placing it.

![Placing a component instance by clicking the Component Tool dropdown, selecting a component, and clicking the stage](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/place-specific-component.gif?s=9ea49ee0d7dbcea0739fefcc62ee6fae)

The component menu follows the sort mode used in the Assets panel:

* **Custom** displays components as they're organized in the Assets panel.
* **Source/Type** groups components by their source. This is particularly useful when working with [Libraries](/docs/editor/libraries).

![Sort assets by Custom](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/assets-sort.png?fit=max\&auto=format\&n=mie7MGdTQlymQtSr\&q=85\&s=a594a2b960b8e7a41e0748b763faa97b)

## Editing components

Double-click a component instance to open its source component. Changes you make to the source component are reflected in all of its instances, while properties configured on individual instances remain unchanged.

![Double click to edit a component](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/edit-component.gif?s=1a871575c9bfeed34441a5090e07522e)

## Component instance properties

Select a component instance to configure its properties in the Inspector. These properties control the data, animation, source, layout, and other behavior of that specific instance without changing the source component.

![Component properties in the sidebar](https://mintcdn.com/rive/mie7MGdTQlymQtSr/images/editor/artboards/component-properties.png?fit=max\&auto=format\&n=mie7MGdTQlymQtSr\&q=85\&s=2db39896280ae60da2b0b79d6ffc3d01)

> [!NOTE]
>
> You can't change the origin of a component instance directly. To use a different origin, place the component instance inside a group and adjust the group's origin instead.

### Source

**Source** determines which component is displayed by the instance. Select a component directly, or data bind the source to change the component dynamically.

Learn more about [Data Binding](/docs/editor/data-binding).

### Data

Configure the data used by a component instance.

**Stateful Components**

If the component is a [Stateful Component](/docs/editor/data-binding/stateful-components), you can set its exposed properties directly on the component instance.

**Model**

Use **Model** to set the view model instance used by the component.

* **Inherit** uses a compatible view model instance from the closest parent.
* To specify an instance, add a **View Model** property to the parent's view model and assign an instance to it. You can then select that property as the component's **Model**.

Learn more about [View Models and Instances](/docs/editor/data-binding/view-models).

### Mode

**Mode** determines how the component instance sizes and responds to the space available from its parent. See [Component Sizing](/docs/editor/layouts/component-sizing) for more information about sizing modes and their properties.

### Deform

A component instance with **Mode** set to **Node** can take a [Mesh](/docs/editor/manipulating-shapes/meshes) or an [N-Slice](/docs/editor/layouts/n-slicing), the same way an image can. Use this to bind a component to bones, animate its vertices, or slice it.

### Animations

Choose the animations that play on a component instance. In most cases, you'll want to select a state machine, but you can also add one or more timeline animations.

**State Machine**

Select a state machine to run on the component instance. You can adjust its playback **Speed** and enable **Quantize**.

**Timeline Animations**

Add timeline animations to play on their own, alongside a state machine, or layered with other animations. When adding a timeline animation, choose between **Simple** and **Remap**.

**Simple** plays the timeline normally and provides the following controls:

* **Mix** controls how much the animation contributes when mixed with other animations.
* **Speed** controls the animation's playback speed.
* **Playing** controls whether the animation is playing.

**Remap** lets you control the position of the animation's playhead directly:

* **Mix** controls how much the animation contributes when mixed with other animations.
* **Time** controls the animation's playhead as a percentage, where `0%` is the beginning and `100%` is the end.
