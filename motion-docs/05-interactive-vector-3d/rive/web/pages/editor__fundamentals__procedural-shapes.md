---
source: https://rive.app/docs/editor/fundamentals/procedural-shapes
title: "Shape Tools"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Shape Tools

Create editable shapes with adjustable properties.

Shape tools let you create common shapes, such as rectangles, ellipses, polygons, and stars. These shapes keep editable properties, such as width, height, corner radius, and number of points, until you convert them to custom paths.

[YouTube video player](https://www.youtube.com/embed/vU5SrgymGD8)

## Creating a shape

Shape tools are available from the **Create Tools** menu.

**Step 1**

Open the **Create Tools** menu and select a shape tool.

**Step 2**

Click and drag inside an artboard to draw the shape.

Hold `Shift` while dragging to constrain the shape's proportions.

<video />

> [!NOTE]
>
> See [Freeze and Origin](/docs/editor/fundamentals/freeze-and-origin) to learn how to change the center point of a shape.

## Shape properties

You can update a shape's properties in the inspector. Available properties depend on the selected shape type.

* **Size**: The width and height of the shape.
* **Origin**: The [origin](/docs/editor/fundamentals/freeze-and-origin) point of the shape.
* [Corner](#corner): The corner radius of rectangles.
* [Radius](#radius): The radius of polygons and stars.
* [Points](#points): The number of points on polygons and stars.
* [Angle](#angle): The angle between the outer and inner points of a star.

### Corner

Adjust the corner radius by dragging the circular handles on each corner of the rectangle.

Hold `Alt` (Windows) or `Option` (macOS) while dragging to adjust a single corner independently.

![Adjusting rectangle corner radius handles](https://mintcdn.com/rive/ELUosHkagIFUOP9d/images/editor/drawing/corner-radius-handles.gif?s=f9d7b0c58247f1790639841fe53fdefc)

### Radius

Drag the radius handle to adjust the radius of all points on the shape at once.

![Adjusting the radius of the corners of a rectangle](https://mintcdn.com/rive/ELUosHkagIFUOP9d/images/editor/drawing/radius-handle.gif?s=bed6c9741b1e1c4d8e79b1dc9dc1d9f2)

### Points

Control the number of points by dragging the points handle up or down.

![Dragging to adjust the number of points on a shape](https://mintcdn.com/rive/ELUosHkagIFUOP9d/images/editor/drawing/points-handle.gif?s=2f7c1f876fc058db6cd91a77195cdff3)

### Angle

Drag the handle on the inner point up or down to adjust the angle on the inner and outer points of a star.

![Adjusting the angle of the inner points of a star](https://mintcdn.com/rive/ELUosHkagIFUOP9d/images/editor/drawing/star-angle.gif?s=d9acc7a6344d91821d9203dd31e7bf5b)

## Converting a shape to a custom path

Press `Enter` to convert the selected shape to a path. After conversion, you can edit each vertex directly.

<video />

> [!NOTE]
>
> Converting a shape to a path removes its procedural properties, such as width, height, corner radius, and number of points. Any animations applied to those properties are also removed.

> [!NOTE]
>
> To edit a path, see [Edit Vertices](/docs/editor/fundamentals/edit-vertices).
