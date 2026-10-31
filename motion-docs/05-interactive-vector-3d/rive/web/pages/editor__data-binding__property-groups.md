---
source: https://rive.app/docs/editor/data-binding/property-groups
title: "Property Groups"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Property Groups

Create local values that can be keyed, animated, and bound to View Model properties.

Property Groups are local, artboard-level values that can be keyed, animated, and bound to View Model properties.

View Model properties are global and shared, while timelines and state machines are local. Property Groups bridge that gap, allowing local animation and logic to read from or drive global data.

## Creating a Property Group

**1. Create a Property Group**

Select your Property Group tool and click the stage to add one to your artboard.

![Create property group](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/create-a-group.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=edbdcd9d8dfb445acf61d771f1986932)

**2. Add a property**

Select your Property Group and in the right sidebar, click the `+` icon and select your property type.

![Add property to group](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/new-property.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=a7a789b25e8226acc8d4855c61b94421)

## Common use cases

### Controlling a View Model property with a Timeline

You can’t key a View Model property directly in the timeline. Instead, you key a Property Group value, then bind that value to a View Model property.

This lets you use [Keyframes](/docs/editor/animate-mode/keys) in a timeline to update View Model data at runtime.

> [!NOTE]
>
> **Why can't I key View Model Properties directly?**
>
> View Model properties represent global data shared across your app, while keyframes are local to a timeline—so they can’t be keyed directly.

[YouTube video player](https://www.youtube.com/embed/V7GYhd8ZHYg)

> **[Learn by remixing](https://rive.app/community/files/27294-property-groups-demo?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

**1. Key a property**

With the Property Group selected, move the timeline playhead and change the property value to create keyframes.

![New Property](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/key-property.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=4cb05680b3856ea188b699722956c509)

**2. Bind the property**

Right-click the property and select the View Model property you want to control. Set the direction to Target → Source so the keyed value drives the View Model property.

![Bind Property](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/bind-property.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=faaca825ff0de2a7c16fff404e002788)

When you run your state machine, the View Model property updates based on the keyed Property Group values.

### Controlling one View Model property with another

You can't directly control one View Model Property with another View Model Property. Instead, you can use a Property Group value that reads one View Model Property and sets another.

> [!NOTE]
>
> **Why can't I control one View Model property with another?**
>
> Allowing View Model properties to control each other would create hidden dependencies and update loops, so relationships between values are handled explicitly through bindings.

In this example we'll have two Number View Model Properties called `myNumber` and `myOtherNumber`, which will be `myNumber` doubled.

> **[Learn by remixing](https://rive.app/community/files/27294-property-groups-demo?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

**1. Create a Formula Converter**

Create a new Converter of type Numeric > Formula and add a number value, a multiply operation, and another number.

![Add property to group](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/number-converter.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=64754e44c90bc144a22207cbb685b099)

**2. Bind the number value**

Bind the first number to `myNumber`.

![Bind the first number](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/bind-my-number.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=bd58f305d3c1ed83d95af4b25b45722d)

**3. Control the View Model Property**

Select the Property Group, right-click the property, and bind it to the `myOtherNumber` value using the converter. Set the direction to Target → Source so the converted value drives the View Model property.

![Control a View Model Property](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/bind-my-number.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=bd58f305d3c1ed83d95af4b25b45722d)

When you run your state machine, you should see that `myOtherNumber` is double `myNumber`.

![Doubled](https://mintcdn.com/rive/Q6SLUrGadH_fB4fZ/images/editor/data-binding/property-groups/doubled.png?fit=max\&auto=format\&n=Q6SLUrGadH_fB4fZ\&q=85\&s=62394e10196cdfd8807da4fb7e49a8eb)
