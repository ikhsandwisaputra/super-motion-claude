---
source: https://paperjs.org/reference/rectangle/
title: "Paper.js — Rectangle"
fetched: 2026-10-28
---

# Rectangle

A Rectangle specifies an area that is enclosed by it’s top-left point (x, y), its width, and its height. It should not be confused with a rectangular path, it is not an item.

## Constructors

[**Rectangle**(point, size)](https://paperjs.org/reference/rectangle/#rectangle-point-size)

Creates a Rectangle object.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the top-left point of the rectangle
* size:
  [Size](https://paperjs.org/reference/size)
  — the size of the rectangle

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**Rectangle**(object)](https://paperjs.org/reference/rectangle/#rectangle-object)

Creates a Rectangle object.

#### Parameters:

* object:
  Object
  — an object containing properties to be set on the rectangle

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle)

#### Example:Create a rectangle between {x: 20, y: 20} and {x: 80, y:80}

```
var rectangle = new Rectangle({
    point: [20, 20],
    size: [60, 60]
});
```

#### Example:Create a rectangle between {x: 20, y: 20} and {x: 80, y:80}

```
var rectangle = new Rectangle({
    from: [20, 20],
    to: [80, 80]
});
```

[**Rectangle**(x, y, width, height)](https://paperjs.org/reference/rectangle/#rectangle-x-y-width-height)

Creates a rectangle object.

#### Parameters:

* x:
  Number
  — the left coordinate
* y:
  Number
  — the top coordinate
* width:
  Number
* height:
  Number

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**Rectangle**(from, to)](https://paperjs.org/reference/rectangle/#rectangle-from-to)

Creates a rectangle object from the passed points. These do not necessarily need to be the top left and bottom right corners, the constructor figures out how to fit a rectangle between them.

#### Parameters:

* from:
  [Point](https://paperjs.org/reference/point)
  — the first point defining the rectangle
* to:
  [Point](https://paperjs.org/reference/point)
  — the second point defining the rectangle

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**Rectangle**(rectangle)](https://paperjs.org/reference/rectangle/#rectangle-rectangle)

Creates a new rectangle object from the passed rectangle object.

#### Parameters:

* rectangle:
  [Rectangle](https://paperjs.org/reference/rectangle)

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle)

## Properties

[**x**](https://paperjs.org/reference/rectangle/#x)

The x position of the rectangle.

#### Type:

* Number

[**y**](https://paperjs.org/reference/rectangle/#y)

The y position of the rectangle.

#### Type:

* Number

[**width**](https://paperjs.org/reference/rectangle/#width)

The width of the rectangle.

#### Type:

* Number

[**height**](https://paperjs.org/reference/rectangle/#height)

The height of the rectangle.

#### Type:

* Number

[**values**](https://paperjs.org/reference/rectangle/#values)

The rectangle’s position and size as an array, `[x, y, width, height]`, as [matrix.values](https://paperjs.org/reference/matrix#values) gives those of a matrix.

Read only.

#### Type:

* Array of Numbers

[**point**](https://paperjs.org/reference/rectangle/#point)

The top-left point of the rectangle. Setting it moves the whole rectangle, unlike [topLeft](https://paperjs.org/reference/rectangle#topleft).

#### Type:

* [Point](https://paperjs.org/reference/point)

[**size**](https://paperjs.org/reference/rectangle/#size)

The size of the rectangle

#### Type:

* [Size](https://paperjs.org/reference/size)

### Side Positions

[**left**](https://paperjs.org/reference/rectangle/#left)

The position of the left hand side of the rectangle. Note that this doesn’t move the whole rectangle; the right hand side stays where it was.

#### Type:

* Number

[**top**](https://paperjs.org/reference/rectangle/#top)

The top coordinate of the rectangle. Note that this doesn’t move the whole rectangle: the bottom won’t move.

#### Type:

* Number

[**right**](https://paperjs.org/reference/rectangle/#right)

The position of the right hand side of the rectangle. Note that this doesn’t move the whole rectangle; the left hand side stays where it was.

#### Type:

* Number

[**bottom**](https://paperjs.org/reference/rectangle/#bottom)

The bottom coordinate of the rectangle. Note that this doesn’t move the whole rectangle: the top won’t move.

#### Type:

* Number

### Corner and Center Point Positions

[**center**](https://paperjs.org/reference/rectangle/#center)

The center point of the rectangle. Setting it moves the whole rectangle.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**topLeft**](https://paperjs.org/reference/rectangle/#topleft)

The top-left point of the rectangle. Note that this doesn’t move the whole rectangle; the bottom-right corner stays where it was.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**topRight**](https://paperjs.org/reference/rectangle/#topright)

The top-right point of the rectangle. Note that this doesn’t move the whole rectangle; the bottom-left corner stays where it was.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**bottomLeft**](https://paperjs.org/reference/rectangle/#bottomleft)

The bottom-left point of the rectangle. Note that this doesn’t move the whole rectangle; the top-right corner stays where it was.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**bottomRight**](https://paperjs.org/reference/rectangle/#bottomright)

The bottom-right point of the rectangle. Note that this doesn’t move the whole rectangle; the top-left corner stays where it was.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**leftCenter**](https://paperjs.org/reference/rectangle/#leftcenter)

The left-center point of the rectangle. Setting it moves the left hand side while the right hand side stays where it was, and moves the whole rectangle vertically.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**topCenter**](https://paperjs.org/reference/rectangle/#topcenter)

The top-center point of the rectangle. Setting it moves the top while the bottom stays where it was, and moves the whole rectangle horizontally.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**rightCenter**](https://paperjs.org/reference/rectangle/#rightcenter)

The right-center point of the rectangle. Setting it moves the right hand side while the left hand side stays where it was, and moves the whole rectangle vertically.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**bottomCenter**](https://paperjs.org/reference/rectangle/#bottomcenter)

The bottom-center point of the rectangle. Setting it moves the bottom while the top stays where it was, and moves the whole rectangle horizontally.

#### Type:

* [Point](https://paperjs.org/reference/point)

[**area**](https://paperjs.org/reference/rectangle/#area)

The area of the rectangle.

Read only.

#### Type:

* Number

### Item Bounds

[**selected**](https://paperjs.org/reference/rectangle/#selected)

Specifies whether an item’s bounds are to appear as selected.

Paper.js draws the bounds of items with selected bounds on top of your project. This is very useful when debugging.

This property is only available on the rectangles returned by [item.bounds](https://paperjs.org/reference/item#bounds) and [item.strokeBounds](https://paperjs.org/reference/item#strokebounds), which are selected independently of each other, each showing its own bounds. Rectangles returned by other getters such as [item.handleBounds](https://paperjs.org/reference/item#handlebounds) don’t have it.

#### Default:

* false

#### Type:

* Boolean

#### Example:

Run

## Methods

[**set**(...values)](https://paperjs.org/reference/rectangle/#set-values)

Sets the rectangle to the passed values. Note that any sequence of parameters that is supported by the various [Rectangle](https://paperjs.org/reference/rectangle)() constructors also work for calls of `set()`.

#### Parameters:

* values:
  any value

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**clone**()](https://paperjs.org/reference/rectangle/#clone)

Returns a copy of the rectangle.

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle)

[**equals**(rect)](https://paperjs.org/reference/rectangle/#equals-rect)

Checks whether the coordinates and size of the rectangle are equal to that of the supplied rectangle.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)

#### Returns:

* Boolean — true if the rectangles are equal, false otherwise

[**toString**()](https://paperjs.org/reference/rectangle/#tostring)

#### Returns:

* String — a string representation of this rectangle

[**isEmpty**()](https://paperjs.org/reference/rectangle/#isempty)

#### Returns:

* Boolean — true if the rectangle is empty, false otherwise

### Geometric Tests

[**contains**(point)](https://paperjs.org/reference/rectangle/#contains-point)

Tests if the specified point is inside the boundary of the rectangle.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the specified point

#### Returns:

* Boolean — true if the point is inside the rectangle’s boundary, false otherwise

#### Example:Checking whether the mouse position falls within the bounding rectangle of an item:

Run

[**contains**(rect)](https://paperjs.org/reference/rectangle/#contains-rect)

Tests if the interior of the rectangle entirely contains the specified rectangle.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the specified rectangle

#### Returns:

* Boolean — true if the rectangle entirely contains the specified rectangle, false otherwise

#### Example:Checking whether the bounding box of one item is contained within that of another item:

Run

[**intersects**(rect[, epsilon])](https://paperjs.org/reference/rectangle/#intersects-rect)

Tests if the interior of this rectangle intersects the interior of another rectangle. Rectangles just touching each other are considered as non-intersecting, except if a `epsilon` value is specified by which this rectangle’s dimensions are increased before comparing.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the specified rectangle
* epsilon:
  Number
  — the epsilon against which to compare the rectangle’s dimensions
  — optional, default: 0

#### Returns:

* Boolean — true if the rectangle and the specified rectangle intersect each other, false otherwise

#### Example:Checking whether the bounding box of one item intersects with that of another item:

Run

### Boolean Operations

[**intersect**(rect)](https://paperjs.org/reference/rectangle/#intersect-rect)

Returns a new rectangle representing the intersection of this rectangle with the specified rectangle.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the rectangle to be intersected with this rectangle

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle) — the largest rectangle contained in both the specified rectangle and in this rectangle

#### Example:Intersecting two rectangles and visualizing the result using rectangle shaped paths:

Run

[**unite**(rect)](https://paperjs.org/reference/rectangle/#unite-rect)

Returns a new rectangle representing the union of this rectangle with the specified rectangle.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the rectangle to be combined with this rectangle

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle) — the smallest rectangle containing both the specified rectangle and this rectangle

[**include**(point)](https://paperjs.org/reference/rectangle/#include-point)

Adds a point to this rectangle. The resulting rectangle is the smallest rectangle that contains both the original rectangle and the specified point.

After adding a point, a call to [contains(point)](https://paperjs.org/reference/rectangle#contains-point) with the added point as an argument does not necessarily return `true`. The [rectangle.contains(point)](https://paperjs.org/reference/rectangle#contains-point) method does not return `true` for points on the right or bottom edges of a rectangle. Therefore, if the added point falls on the left or bottom edge of the enlarged rectangle, [rectangle.contains(point)](https://paperjs.org/reference/rectangle#contains-point) returns `false` for that point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle) — the smallest rectangle that contains both the original rectangle and the specified point

[**expand**(amount)](https://paperjs.org/reference/rectangle/#expand-amount)

Returns a new rectangle expanded by the specified amount in horizontal and vertical directions.

#### Parameters:

* amount:
  Number⟋[Size](https://paperjs.org/reference/size)⟋[Point](https://paperjs.org/reference/point)
  — the amount to expand the rectangle in both directions

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle) — the expanded rectangle

[**expand**(hor, ver)](https://paperjs.org/reference/rectangle/#expand-hor-ver)

Returns a new rectangle expanded by the specified amounts in horizontal and vertical directions.

#### Parameters:

* hor:
  Number
  — the amount to expand the rectangle in horizontal direction
* ver:
  Number
  — the amount to expand the rectangle in vertical direction

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle) — the expanded rectangle

[**scale**(scale[, center])](https://paperjs.org/reference/rectangle/#scale-scale)

Returns a new rectangle scaled by the specified factor from its center, or from the given center point.

#### Parameters:

* scale:
  Number
  — the scale factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [rectangle.center](https://paperjs.org/reference/rectangle#center)

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle) — the scaled rectangle

[**scale**(hor, ver[, center])](https://paperjs.org/reference/rectangle/#scale-hor-ver)

Returns a new rectangle scaled in horizontal direction by the specified `hor` factor and in vertical direction by the specified `ver` factor from its center, or from the given center point.

#### Parameters:

* hor:
  Number
  — the horizontal scale factor
* ver:
  Number
  — the vertical scale factor
* center:
  [Point](https://paperjs.org/reference/point)
  — optional, default: [rectangle.center](https://paperjs.org/reference/rectangle#center)

#### Returns:

* [Rectangle](https://paperjs.org/reference/rectangle) — the scaled rectangle
