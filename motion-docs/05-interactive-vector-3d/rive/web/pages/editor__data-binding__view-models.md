---
source: https://rive.app/docs/editor/data-binding/view-models
title: "View Models & Instances"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# View Models & Instances

A View Model defines the structure of your data. It acts as a reusable blueprint that contains a collection of properties, such as a car's color, speed, and damage.

Each property has a type, such as Number, String, Boolean, Color, Enum, or List (For more information, see [View Model Properties](/docs/editor/data-binding/view-model-properties)).

View Models do not store values themselves. Instead, values are stored in one or more View Model Instances that are created from the View Model.

For example, if you were building a racing game, you might create a Car View Model with the following [properties](/docs/editor/data-binding/view-model-properties):

```jsx theme={null}
Car (View Model)
  color: Color
  damage: number
  make: string
  speed: number
```

A single View Model can be used to create many View Model Instances. Each instance shares the same structure but stores its own values.

```jsx theme={null}
Car1 (View Model Instance)
  color: 0xFFFF0000
  damage: 0
  make: "Subaru"
  speed: 0

Car2 (View Model Instance)
  color: 0xFFFF00FF
  damage: .9
  make: "Honda"
  speed: 0
```

The properties in your instances can then be bound to elements in your designs, allowing text, images, colors, animations, state machines, and other properties to react to data changes automatically.

### Creating a View Model

A View Model defines the structure of your data. Before creating View Model Instances or setting up data bindings, you'll first need to create a View Model and add properties to it.

> [!NOTE]
>
> New Rive files come with a default view model called "ViewModel1" that is already attached to the main artboard.

**1. Add a View Model**

In the Data panel, click the `+` icon and select **View Model** or [**Global View Model**](#global-view-model-instances).

**2. Add Properties**

In the Data panel, click the **Add View Model Property** button next to the view model name and select your [property type](/docs/editor/data-binding/property-types).

![Create a View Model](https://mintcdn.com/rive/NAHDCg2YZRWWopKo/images/editor/data-binding/view-models/create-view-model.gif?s=de8cde7d4c48e20198c2d5e71757ecad)

## Creating and editing instances

Once your View Model has been created, you can create one or more View Model Instances that store actual values for those properties.

### Creating a View Model instance

A View Model can have multiple instances. Each instance contains its own set of property values while sharing the same structure defined by the View Model.

> [!NOTE]
>
> When creating a new View Model, Rive automatically creates a View Model Instance named "Instance" so you can immediately begin testing bindings and previewing data.

![Create a View Model Instance](https://mintcdn.com/rive/NAHDCg2YZRWWopKo/images/editor/data-binding/view-models/manage-instances.gif?s=2a8ab27cd27966f0eeb2218b8b58a525)

**1. View existing instances**

Select a View Model in the Data panel, then click the Controls icon next to the instance name in the Inspector.

> [!TIP]
>
> To see all of your view model instances and values at once, click the Open Table Data button.
>
> ![Open table data](https://mintcdn.com/rive/NAHDCg2YZRWWopKo/images/editor/data-binding/view-models/open-table-data.png?fit=max\&auto=format\&n=NAHDCg2YZRWWopKo\&q=85\&s=f2f32122307a4b68f56565af1e51b965)

**2. Add an instance**

Click the `+` icon to add a new instance.

**3. Name the instance**

Double click the instance's name to rename it.

**4. Update the instance data**

With the instance selected, change any of its properties.

Note that this changes **only** the values on the selected view model instance.

### Removing instances

Click the `-` icon next to the instance name to delete it.

![Remove a View Model Instance](https://mintcdn.com/rive/NAHDCg2YZRWWopKo/images/editor/data-binding/view-models/remove-view-model-instance.gif?s=d1416c3b1f3c385b7dd05515dce80fb8)

> [!NOTE]
>
> Deleting a View Model Instance does not remove the View Model or its properties. It only removes that instance and its stored values.

### Exporting instances

By default, exported View Model Instances are included in the .riv file. Disable Export Instance when the data is only needed during development, not in your application at runtime.

![Export an Instance](https://mintcdn.com/rive/NAHDCg2YZRWWopKo/images/editor/data-binding/view-models/export-instance.png?fit=max\&auto=format\&n=NAHDCg2YZRWWopKo\&q=85\&s=1f15bc995daf2d9ce8548bae6a5b058b)

Tip

**Example - High Score**

Let's say you're building a high score screen in Rive. While designing, you'll use fake score data, but when your game is live, the high scores will be populated using real data from a database or another source.

In this case embedding the example data just increases your .riv file size.

## Connecting View Model instances to Artboards

Before binding data, you'll need to decide where the data should live.

Rive supports a few common patterns:

| Pattern | |
| :- | :- |
| [Global Instances](#global-view-model-instances) | Global view models and their properties are directly accessible to all artboards |
| [Instances attached to artboards](#instances-attached-to-artboards) | The view model instance is attached to the artboard and its values can be used by that artboard and its children |
| [Instances as nested properties](#instances-as-nested-properties) | The parent view model instance stores a reference to a nested view model instance |
| [Stateful nested components](#stateful-components) | Self-contained, reusable components that store their own unique data |

### Global View Model instances

Global View Models provide data that can be accessed throughout your Rive file.

Under the hood, global view models are not connected to a specific artboard. Instead, the view model instance and its properties are directly accessible to all artboards.

[YouTube video player](https://www.youtube.com/embed/SPrxwHfPyP4)

Bindings to Global View Model properties are always **relative bindings**. This means the binding searches for a property with the same name starting from the closest View Model, rather than pointing directly to the global property.

If a closer View Model contains a property with the same name, that property will be used instead. For example, a binding to a global `scale` property will resolve to a `scale` property on a closer View Model if one exists.

Learn more about [Absolute vs Relative Binding](/docs/editor/data-binding/binding-data#absolute-vs-relative-binding).

### Instances attached to Artboards

View Model instances can be attached to a specific artboard or nested component. This is useful when only that artboard and its children need access to that data.

```
EnemyVM
├─ health
```

Tip

**Example - Game**

An Enemy view model might contain a `health` property. This property might be used by the enemy itself, but not by its parent.

### Instances as nested properties

View Models can have properties that are View Model instances.

In this pattern, the parent View Model stores references to child instances, either directly or through a [list](/docs/editor/data-binding/lists).

```
GameVM
├─ health
└─ score
└─ avatar
└─ inventory (stores an instance of InventoryVM)

InventoryVM
├─ Sword
├─ Shield
└─ Potion
```

![Attach instance to component](https://mintcdn.com/rive/NAHDCg2YZRWWopKo/images/editor/data-binding/view-models/connect-instance-to-nested-component.png?fit=max\&auto=format\&n=NAHDCg2YZRWWopKo\&q=85\&s=0a7bed43bba519fd428adaf59b1a55cb)

This approach is useful when a parent artboard needs to manage a collection of items while still allowing each component to maintain its own data.

Tip

**Example - Inventory Grid**

An inventory screen might contain a list of Item View Model Instances, with each inventory slot component bound to a different item.

### Stateful components

A stateful component is an instance of a component that maintains its own data.

Unlike traditional component View Model Instances, these instances do not need to be created or referenced by the parent View Model. Instead their properties are exposed in the sidebar.

![Stateful components](https://mintcdn.com/rive/NAHDCg2YZRWWopKo/images/editor/data-binding/view-models/stateful-components.png?fit=max\&auto=format\&n=NAHDCg2YZRWWopKo\&q=85\&s=8e8133c2349e2f0248e607f77ce77693)

For more information, see [Stateful Components](/docs/editor/data-binding/stateful-components).
