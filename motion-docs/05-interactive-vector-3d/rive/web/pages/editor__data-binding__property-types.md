---
source: https://rive.app/docs/editor/data-binding/property-types
title: "View Model Properties"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# View Model Properties

A view model property is one piece of data within a view model. Developers might think of this as similar to a field in object-oriented programming. Properties have a data type, which is selected when they are created, and a name which can be referenced in code. Each property can be bound to different editor elements of the same type or used as conditions within a state machine.

## Adding View Model properties

In the Data panel, click the **Add View Model Property** button next to the view model name and select your property type.

![Create a new Enum](https://mintcdn.com/rive/um1XhzYfymGnPyE4/images/editor/data-binding/property-types/add-property.png?fit=max\&auto=format\&n=um1XhzYfymGnPyE4\&q=85\&s=92ffa535d01737f7396019ba37a0b40d)

| Type | Description |
| - | - |
| Number | Numeric value |
| String | Text value |
| Boolean | True/false value |
| Color | RGBA color value |
| [Trigger](#trigger) | Fire-and-forget event |
| [Enum](#enum) | One value from a predefined list |
| [Image](#image) | Image asset reference |
| [Font](#font) | Font asset reference |
| [Blob](#blob) | Blob asset reference |
| [Artboard](#artboard) | Artboard reference |
| [View Model](#view-model) | Nested View Model instance |
| [List](#list) | Collection of view models |

## Property types

### Trigger

Trigger properties represent fire-and-forget events. Use them when you want to signal that something happened, such as a button press or one-time action.

### Enum

Select from a fixed set of options to control states and variants. Use enums when the possible values are known ahead of time.

[Learn more](/docs/editor/data-binding/enums) about enums.

### Image

![Bind an image](https://mintcdn.com/rive/FXtcPbNI1WY131wI/images/editor/data-binding/property-types/image-bind.gif?s=6231d17d455c33827d068db5de6eab4c)

Image properties store a reference to an image, allowing you to change which image is displayed.

They are typically bound to image nodes in your design.

Use image properties when each instance needs its own image, such as user avatars, thumbnails, or dynamically loaded content.

For example, in a game or social UI, each player can have their own avatar by binding a different image to the same property.

> [!NOTE]
>
> Image properties affect a **single instance**.
>
> If you need to update an image globally across your entire file, use [asset loading instead](/docs/runtimes/loading-assets). Asset loading replaces the underlying asset, updating all instances that use it.

### Font

Font properties store a reference to a font, allowing you to change which font is displayed on a specific text style.

<video />

> **[Learn by remixing](https://rive.app/community/files/28431-data-binding-fonts/?utm_source=docs\&utm_medium=docs_link_card\&utm_campaign=docs_to_marketplace_links)**
>
> Open this file on Marketplace, then click Remix to experiment in the Rive Editor.

> [!NOTE]
>
> Font properties affect a **single instance**.
>
> If you need to update a font globally across your entire file, use [asset loading instead](/docs/runtimes/loading-assets). Asset loading replaces the underlying asset, updating all instances that use it.

### Blob

Blob properties store a reference to a [blob asset](/docs/editor/fundamentals/assets-overview#asset-types), letting you bind arbitrary binary data, such as a custom file format, to a view model.

To bind a blob, first import a file Rive doesn't natively recognize and choose **Import as Blob**, then bind it to a Blob property.

Scripts can read and write the blob's bytes at runtime. See [Blob](/docs/scripting/api-reference/interfaces/blob) in the Scripting API reference.

### Artboard

![Bind an artboard](https://mintcdn.com/rive/FXtcPbNI1WY131wI/images/editor/data-binding/property-types/artboards.gif?s=d37cecf2ad209b6a21d4990d7b3dec72)

Artboard properties let you reference an artboard and dynamically swap it at runtime.

The artboard can come from your current Rive file or be loaded from another .riv file.

To use an artboard as a property, it must first be [converted to a Component](/docs/editor/fundamentals/components#creating-a-component).

### View Model

View Model properties store a reference to a View Model instance.

They are used to create nested data structures by connecting one View Model instance to another.

For example, a `Player` View Model could contain a `Team` View Model property, allowing you to access properties such as the team's name, logo, and colors.

You can bind to and update properties on nested View Models just like top-level properties.

> [!NOTE]
>
> If you want to assign a View Model instance to a nested component, that instance must be referenced from your main View Model.

### List

List properties store collections of view model instances, which can be associated with specific artboards.

Lists are commonly used for repeating content, such as inventory items, players, messages, or generated UI elements.

For more information, see [Lists](/docs/editor/data-binding/lists).
