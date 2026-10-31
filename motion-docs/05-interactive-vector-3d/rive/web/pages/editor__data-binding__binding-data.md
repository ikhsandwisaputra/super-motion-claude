---
source: https://rive.app/docs/editor/data-binding/binding-data
title: "Binding Data"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Binding Data

Binding is how you connect data to properties and elements in your Rive file.

For example, if you have a `teamName` property bound to a text run in your scene, changing the `teamName` value updates the displayed text automatically.

You can change property values in the editor or at runtime, allowing you to create dynamic experiences that adapt to each user.

Bindings are not limited to visual properties. You can bind values throughout your file, including transforms, animation speeds, [converter values](/docs/editor/data-binding/converters#converter-types), [script inputs](/docs/scripting/script-inputs#data-binding-inputs), [transition condition values](/docs/editor/state-machine/transitions), and more.

This allows the same data to drive behavior, animation, and logic across your scene, helping keep everything in sync.

## Binding a property

Let's control the `X` position of a circle using `circleX`, which is a Number property in our View Model.

![Bind a property](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/bind-value.gif?s=051709713d5f0a400eee2dd3121eacdf)

**1. Bind the property**

With your circle selected, right-click the `X` field, and select **Data Bind**.

**2. Select the property**

In the **Property** dropdown, select `circleX`.

The `X` field should now be highlighted in green, indicating that it's bound to a value.

The circle's horizontal position is now driven by the `circleX` property. Any time the property's value changes, the circle updates automatically.

![Bind a property](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/updating-values.gif?s=e64002ced9b892f248aeb74eb7dd1d93)

> [!WARNING]
>
> If the field has a yellow border, there is a problem with the binding.
>
> In most cases, the property type is incompatible with the target value. For example, the `X` position of an element can only be bound to a Number property.

> [!TIP]
>
> **Previewing Bindings**
>
> By default, your data only controls your elements when the state machine is playing.
>
> To preview your data-bound values, turn on the **Data Binding Preview Toggle**.
>
> ![Preview data binding](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/preview-data-binding.gif?s=b3a4b04ca6515198f457102647598a1f)

### Updating a binding

Right-click the bound element and select **Update Bind**.

![Update a binding](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/update-bind.gif?s=fb3e9916e2f957179d093d80a9436ff1)

### Removing a binding

Right-click the bound element and select **Unbind**.

![Remove a binding](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/unbind.gif?s=efd3f8fb4223d9207a42a194f123c80c)

## Binding options

Each binding has the following properties.

### Property

The View Model property the target is connected to.

![Property field](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/property.png?fit=max\&auto=format\&n=f-gYM2GpjOFH7IoO\&q=85\&s=45b0c64d3043ffea3dbee6dc75d5baf3)

> [!NOTE]
>
> When binding global properties, select the **Globals** icon.
>
> ![Select the Globals icon](https://mintcdn.com/rive/xU7L4hl1V-1EuuOA/images/editor/data-binding/binding-data/global-properties.gif?s=ee8d261197f61001b2d6bb21a28ac437)

### Path

When binding properties in nested View Models, there may be multiple properties with the same name available.

The path determines which specific property instance the binding should use.

![Preview data binding](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/path.gif?s=6bb448df849e75d8c40360fad5b82e52)

See also [Absolute vs Relative Binding](#absolute-vs-relative-binding).

### Bind direction

By default, the View Model property (**source**) controls the bound element or value (**target**), but it can also work the other way around.

[YouTube video player](https://www.youtube.com/embed/Syt6i4-Bkm4)

#### Target to source

When a binding has `Target to Source` toggled on, a change to the element will update the view model property.

![Target to source](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/target-to-source.png?fit=max\&auto=format\&n=f-gYM2GpjOFH7IoO\&q=85\&s=4405fa65ccdfab3da1b55ccc8485e254)

Tip

**Example - Tracking Positions**

Let's say you have a walk cycle animation and you want to track the exact Y position of the head as it bobs up and down.

With the head's `Y` position bound to `headY` using **Target to Source**, the `headY` property updates automatically as the head moves.

#### Bidirectional

A change to the view model property will update the element **AND** a change to the element will update the view model property.

![Bidirectional data binding](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/bidirectional.gif?s=9ded65702966d067be794638ce0c82b1)

Clicking the **Bidirectional** toggle multiple times will cycle between **Bidirectional (prefer target value)** and **Bidirectional (prefer source value)**.

In rare cases, both the source and target may change at the same time. This setting determines which value wins when a conflict occurs.

Tip

**Example - Checkers**

Let's say you're building a game of checkers and need to create logic for dragging and dropping each piece.

The initial position of each piece is determined by the `piecePositionX` and `piecePositionY` properties (source to target).

As the piece is dragged, the piece itself (target) updates those property values (target to source).

### Bind once

When **Bind Once** is enabled, the binding only applies the value a single time when the scene starts or the binding is created.

![Bind once](https://mintcdn.com/rive/f-gYM2GpjOFH7IoO/images/editor/data-binding/binding-data/bind-once.png?fit=max\&auto=format\&n=f-gYM2GpjOFH7IoO\&q=85\&s=4045a91c2f9edf67aaa6e2f4790e9fcc)

After the initial value is applied, future changes to the source or target are ignored.

Tip

**Example**

Let's say you're creating a particle effect and want each particle to start with a random rotation value.

You could bind the particle's rotation to a random number property using **Bind Once**. Each particle would receive its initial rotation value, but future changes to the property would not affect existing particles.

### Absolute vs relative binding

[YouTube video player](https://www.youtube.com/embed/4LOXhXesG74)

By default, new data binding connections are created as absolute binds.

* **Absolute Binding** points to a specific property instance within the View Model hierarchy.
* **Relative Binding** searches for a property with a matching name, starting with the closest View Model and working up the hierarchy.

Because relative bindings resolve by name, a closer property with the same name can take precedence over the property you intended to bind. For example, if a binding targets a property named `scale` in the main View Model, but a closer View Model also contains a property named `scale`, the binding will resolve to the closer property.

> [!NOTE]
>
> Bindings to [Global View Models](/docs/editor/data-binding/view-models#global-view-model-instances) are always relative.
