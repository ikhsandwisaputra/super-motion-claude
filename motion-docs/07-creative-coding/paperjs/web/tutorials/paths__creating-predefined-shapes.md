---
source: https://paperjs.org/tutorials/paths/creating-predefined-shapes
title: "Paper.js — Creating Predefined Shapes"
fetched: 2026-10-28
---

# Creating Predefined Shapes

Paper.js allows you to create path items with predefined shapes of variable dimensions.

In the same way that the [new Path()](https://paperjs.org/reference/path#path) constructor creates an empty path with no points, we have constructors such as [new Path.Circle(center, radius)](https://paperjs.org/reference/path#path-circle-center-radius) and [new Path.Rectangle(point, size)](https://paperjs.org/reference/path#path-rectangle-point-size) that create paths and automatically add segments to them to create predefined shapes.
Paper.js allows you to create path items with predefined shapes of variable dimensions.

## Circle Shaped Paths

Using the [new Path.Circle(center, radius)](https://paperjs.org/reference/path#path-circle-center-radius) constructor, we can produces circle shaped paths.

The following code produces a circle shaped path with a center point at {x: 100, y: 70} and a radius of 50 pt:

Source

## Rectangular Shaped Paths

To create a rectangular shaped path you can pass a [Rectangle](https://paperjs.org/reference/rectangle) to the [new Path.Rectangle(rect)](https://paperjs.org/reference/path#path-rectangle-rect) constructor.

#### Please note:

A [Rectangle](https://paperjs.org/reference/rectangle) object is an abstract representation of a rectangle. Please read the [Point, Size and Rectangle](https://paperjs.org/tutorials/geometry/point-size-and-rectangle/) tutorial to find out how to work with the Rectangle object.

For example, let's make a Rectangle between {x: 0, y: 0} and {x: 50, y: 50} and then use the [new Path.Rectangle(rect)](https://paperjs.org/reference/path#path-rectangle-rect) constructor to create a path with the shape that it describes:

Source

## Rectangular Shaped Paths with Rounded Corners

To create rectangular shaped paths with rounded corners, we use the [new Path.Rectangle(rectangle, radius)](https://paperjs.org/reference/path#path-rectangle-rectangle) constructor. The rectangle parameter describes the [Rectangle](https://paperjs.org/reference/rectangle) and the radius parameter describes the [Size](https://paperjs.org/reference/size) of the rounded corners.

For example, the following script creates a rectangular shaped path with 20 pt \* 20 pt corners:

Source

## Regular Polygon Shaped Paths

To create regular polygon shaped paths, we use the [new Path.RegularPolygon(center, sides, radius)](https://paperjs.org/reference/path#path-regularpolygon-center-sides-radius) constructor.

The [center](https://paperjs.org/reference/point) parameter describes the center point of the polygon, the sides parameter describes the amount of sides the polygon has and the radius parameter describes the radius of the polygon.

For example, lets create a triangle shaped path and a decagon shaped path:

Source

#### Did you know?

You can check the constructors section of the [Path reference](https://paperjs.org/reference/path) for a full list of Path constructors.
