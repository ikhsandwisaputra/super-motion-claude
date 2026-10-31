---
source: https://rive.app/docs/editor/data-binding/enums
title: "Enums"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Enums

Use enums to control states, modes, and variants by selecting from a predefined set of options.

[YouTube video player](https://www.youtube.com/embed/DgDBjxWl8Aw)

An enum lets you choose one value from a predefined set of options.

Use enums when a property should only ever be one of a few known values—like modes, states, or variants—instead of allowing any arbitrary value like a string.

For example, instead of using a string like "left", "center", or "right", an enum guarantees the value is always one of those valid options.

![Enums](https://mintcdn.com/rive/FXtcPbNI1WY131wI/images/editor/data-binding/property-types/enum-preview.gif?s=4f81d22699d9d38b5b203c0d4d985a01)

Enums can be:

* System enums — built-in sets of options used by the editor (for example, Horizontal Align)
* [Custom enums](#custom-enums) — your own defined sets of options for your specific use case

> **[Learn by remixing](https://rive.app/community/files/27312-control-editor-properties-with-enums?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

> [!NOTE]
>
> **Why not use strings or numbers?**
>
> Imagine a calendar app that shows different backgrounds based on the day of the week.
>
> You could use a string like "Monday", but it breaks if someone sets it to "Mon".
>
> You could use a number, but it’s unclear whether the week starts on Sunday or Monday—or whether the index starts at 0 or 1.
>
> With an enum, the value must be one of the defined options, so it’s always valid and unambiguous.

## Adding an enum property

![Enums](https://mintcdn.com/rive/FXtcPbNI1WY131wI/images/editor/data-binding/property-types/add-enum.gif?s=54e29eebd62bb46381dcd87190bc00b6)

**1. Create a new enum property**

Create a new enum view model property inside your view model.

**2. Set the enum type**

Click the dropdown next to the property name and select an enum type.

**3. Set the default enum value**

Select your enum view model property and in the right sidebar, select the default value.

## Binding enums

![Bind an enum](https://mintcdn.com/rive/FXtcPbNI1WY131wI/images/editor/data-binding/property-types/binding-enums.gif?s=03ddef4be7298900c129a0a354d23dcd)

Enums can be bound to editor properties that use the same set of options. For example, an enum named “Layout Direction” can be bound to a layout’s Direction property.

When binding enums, the System Enum to Uint converter is required and is applied automatically.

## Custom enums

![Create custom enum](https://mintcdn.com/rive/FXtcPbNI1WY131wI/images/editor/data-binding/property-types/custom-enum.gif?s=1896fe9ac73378e3017589eb740577ae)

**1. Create a new enum**

Open the Data panel, click the `+` icon and select enum.

**2. Add enum options**

With your enum selected, click the `+` icon in the right sidebar.

**3. Assign the enum to a property**

Assign your custom enum to your enum view model property.

## Controlling Solos with enums

Use an enum to control which Solo is active by mapping each enum value to a Solo.

![Bind enum to solo](https://mintcdn.com/rive/FXtcPbNI1WY131wI/images/editor/data-binding/property-types/bind-enum-to-solo.gif?s=3b762c934d883606caeb39ef31aba40d)

**1. Create a matching enum**

Create a [custom enum](#custom-enums) with values that match the **names and order** of your Solos.

**2. Export names**

[Export the names](/docs/editor/exporting/exporting-names) of the objects used by the Solo so they are accessible at runtime.

**3. Bind the enum**

Bind the enum to the Solo’s **Active** property and apply a **Convert to Number** converter.
