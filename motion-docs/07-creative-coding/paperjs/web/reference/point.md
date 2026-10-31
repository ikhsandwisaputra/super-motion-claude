---
source: https://paperjs.org/reference/point/
title: "Paper.js — Point"
fetched: 2026-10-28
---

# Point

The Point object represents a point in the two dimensional space of the Paper.js project. It is also used to represent two dimensional vector objects.

Wherever a point is the only argument of a function, it can also be passed as two numbers, e.g. `point.add(10, 20)` or `item.translate(10, 20)`.

#### Example:Create a point at x: 10, y: 5

```
var point = new Point(10, 5);
console.log(point.x); // 10
console.log(point.y); // 5
```

## Constructors

[**Point**(x, y)](https://paperjs.org/reference/point/#point-x-y)

Creates a Point object with the given x and y coordinates.

#### Parameters:

* x:
  Number
  — the x coordinate
* y:
  Number
  — the y coordinate

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:Create a point at x: 10, y: 5

```
var point = new Point(10, 5);
console.log(point.x); // 10
console.log(point.y); // 5
```

[**Point**(array)](https://paperjs.org/reference/point/#point-array)

Creates a Point object using the numbers in the given array as coordinates.

#### Parameters:

* array:
  Array

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:Creating a point at x: 10, y: 5 using an array of numbers:

```
var array = [10, 5];
var point = new Point(array);
console.log(point.x); // 10
console.log(point.y); // 5
```

#### Example:Passing an array to a functionality that expects a point:

```
// Create a circle shaped path at x: 50, y: 50
// with a radius of 30:
var path = new Path.Circle([50, 50], 30);
path.fillColor = 'red';

// Which is the same as doing:
var path = new Path.Circle(new Point(50, 50), 30);
path.fillColor = 'red';
```

[**Point**(object)](https://paperjs.org/reference/point/#point-object)

Creates a Point object using the properties in the given object.

#### Parameters:

* object:
  Object
  — the object describing the point’s properties

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:Creating a point using an object literal with length and angle properties:

```
var point = new Point({
    length: 10,
    angle: 90
});
console.log(point.length); // 10
console.log(point.angle); // 90
```

#### Example:The angle can also be specified in radians:

```
var point = new Point({
    length: 10,
    angleInRadians: Math.PI / 2
});
console.log(point.angle); // 90
```

#### Example:Creating a point at x: 10, y: 20 using an object literal:

```
var point = new Point({
    x: 10,
    y: 20
});
console.log(point.x); // 10
console.log(point.y); // 20
```

#### Example:Passing an object to a functionality that expects a point:

```
var center = {
    x: 50,
    y: 50
};

// Creates a circle shaped path at x: 50, y: 50
// with a radius of 30:
var path = new Path.Circle(center, 30);
path.fillColor = 'red';
```

[**Point**(size)](https://paperjs.org/reference/point/#point-size)

Creates a Point object using the width and height values of the given Size object.

#### Parameters:

* size:
  [Size](https://paperjs.org/reference/size)

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:Creating a point using a size object.

```
// Create a Size with a width of 100pt and a height of 50pt
var size = new Size(100, 50);
console.log(size); // { width: 100, height: 50 }
var point = new Point(size);
console.log(point); // { x: 100, y: 50 }
```

[**Point**(point)](https://paperjs.org/reference/point/#point-point)

Creates a Point object using the coordinates of the given Point object.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Point](https://paperjs.org/reference/point)

## Operators

[**+**number, **+**point](https://paperjs.org/reference/point/#add)

Returns the addition of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to add

#### Returns:

* [Point](https://paperjs.org/reference/point) — the addition of the point and the value as a new point

#### Example:

```
var point = new Point(5, 10);
var result = point + 20; // PaperScript
var result = point.add(20); // JavaScript
console.log(result); // {x: 25, y: 30}
```

Returns the addition of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to add

#### Returns:

* [Point](https://paperjs.org/reference/point) — the addition of the two points as a new point

#### Example:

```
var point1 = new Point(5, 10);
var point2 = new Point(10, 20);
var result = point1 + point2; // PaperScript
var result = point1.add(point2); // JavaScript
console.log(result); // {x: 15, y: 30}
```

[**-**number, **-**point](https://paperjs.org/reference/point/#subtract)

Returns the subtraction of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to subtract

#### Returns:

* [Point](https://paperjs.org/reference/point) — the subtraction of the point and the value as a new point

#### Example:

```
var point = new Point(10, 20);
var result = point - 5; // PaperScript
var result = point.subtract(5); // JavaScript
console.log(result); // {x: 5, y: 15}
```

Returns the subtraction of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to subtract

#### Returns:

* [Point](https://paperjs.org/reference/point) — the subtraction of the two points as a new point

#### Example:

```
var firstPoint = new Point(10, 20);
var secondPoint = new Point(5, 5);
var result = firstPoint - secondPoint; // PaperScript
var result = firstPoint.subtract(secondPoint); // JavaScript
console.log(result); // {x: 5, y: 15}
```

[**\***number, **\***point](https://paperjs.org/reference/point/#multiply)

Returns the multiplication of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to multiply by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the multiplication of the point and the value as a new point

#### Example:

```
var point = new Point(10, 20);
var result = point * 2; // PaperScript
var result = point.multiply(2); // JavaScript
console.log(result); // {x: 20, y: 40}
```

Returns the multiplication of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to multiply by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the multiplication of the two points as a new point

#### Example:

```
var firstPoint = new Point(5, 10);
var secondPoint = new Point(4, 2);
var result = firstPoint * secondPoint; // PaperScript
var result = firstPoint.multiply(secondPoint); // JavaScript
console.log(result); // {x: 20, y: 20}
```

[**/**number, **/**point](https://paperjs.org/reference/point/#divide)

Returns the division of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to divide by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the division of the point and the value as a new point

#### Example:

```
var point = new Point(10, 20);
var result = point / 2; // PaperScript
var result = point.divide(2); // JavaScript
console.log(result); // {x: 5, y: 10}
```

Returns the division of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to divide by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the division of the two points as a new point

#### Example:

```
var firstPoint = new Point(8, 10);
var secondPoint = new Point(2, 5);
var result = firstPoint / secondPoint; // PaperScript
var result = firstPoint.divide(secondPoint); // JavaScript
console.log(result); // {x: 4, y: 2}
```

[**%**number, **%**point](https://paperjs.org/reference/point/#modulo)

The modulo operator returns the integer remainders of dividing the point by the supplied value as a new point.

#### Parameters:

* value:
  Number

#### Returns:

* [Point](https://paperjs.org/reference/point) — the integer remainders of dividing the point by the value as a new point

#### Example:

```
var point = new Point(12, 6);
var result = point % 5; // PaperScript
var result = point.modulo(5); // JavaScript
console.log(result); // {x: 2, y: 1}
```

The modulo operator returns the integer remainders of dividing the point by the supplied value as a new point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Point](https://paperjs.org/reference/point) — the integer remainders of dividing the points by each other as a new point

#### Example:

```
var point = new Point(12, 6);
var result = point % new Point(5, 2); // PaperScript
var result = point.modulo(new Point(5, 2)); // JavaScript
console.log(result); // {x: 2, y: 0}
```

## Properties

[**x**](https://paperjs.org/reference/point/#x)

The x coordinate of the point

#### Type:

* Number

[**y**](https://paperjs.org/reference/point/#y)

The y coordinate of the point

#### Type:

* Number

[**values**](https://paperjs.org/reference/point/#values)

The point’s coordinates as an array, `[x, y]`, as [matrix.values](https://paperjs.org/reference/matrix#values) gives those of a matrix.

Read only.

#### Type:

* Array of Numbers

[**length**](https://paperjs.org/reference/point/#length)

The length of the vector that is represented by this point’s coordinates. Each point can be interpreted as a vector that points from the origin (`x
= 0`, `y = 0`) to the point’s location. Setting the length changes the location but keeps the vector’s angle.

#### Type:

* Number

[**angle**](https://paperjs.org/reference/point/#angle)

The vector’s angle in degrees, measured from the x-axis to the vector.

#### Type:

* Number

[**angleInRadians**](https://paperjs.org/reference/point/#angleinradians)

The vector’s angle in radians, measured from the x-axis to the vector.

#### Type:

* Number

[**quadrant**](https://paperjs.org/reference/point/#quadrant)

The quadrant of the [angle](https://paperjs.org/reference/point#angle) of the point.

Angles between 0 and 90 degrees are in quadrant `1`. Angles between 90 and 180 degrees are in quadrant `2`, angles between 180 and 270 degrees are in quadrant `3` and angles between 270 and 360 degrees are in quadrant `4`.

Read only.

#### Type:

* Number

#### Example:

```
var point = new Point({
    angle: 10,
    length: 20
});
console.log(point.quadrant); // 1

point.angle = 100;
console.log(point.quadrant); // 2

point.angle = 190;
console.log(point.quadrant); // 3

point.angle = 280;
console.log(point.quadrant); // 4
```

[**selected**](https://paperjs.org/reference/point/#selected)

This property is only valid if the point is an anchor or handle point of a [Segment](https://paperjs.org/reference/segment) or a [Curve](https://paperjs.org/reference/curve), or the position of an [Item](https://paperjs.org/reference/item), as returned by [item.position](https://paperjs.org/reference/item#position), [segment.point](https://paperjs.org/reference/segment#point), [segment.handleIn](https://paperjs.org/reference/segment#handlein), [segment.handleOut](https://paperjs.org/reference/segment#handleout), [curve.point1](https://paperjs.org/reference/curve#point1), [curve.point2](https://paperjs.org/reference/curve#point2), [curve.handle1](https://paperjs.org/reference/curve#handle1), [curve.handle2](https://paperjs.org/reference/curve#handle2).

In those cases, it returns true if it the point is selected, false otherwise.

Paper.js renders selected points on top of your project. This is very useful when debugging.

#### Default:

* false

#### Type:

* Boolean

#### Example:

Run

## Methods

[**set**(...values)](https://paperjs.org/reference/point/#set-values)

Sets the point to the passed values. Note that any sequence of parameters that is supported by the various [Point](https://paperjs.org/reference/point)() constructors also work for calls of `set()`.

#### Parameters:

* values:
  any value

#### Returns:

* [Point](https://paperjs.org/reference/point)

[**equals**(point)](https://paperjs.org/reference/point/#equals-point)

Checks whether the coordinates of the point are equal to that of the supplied point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)⟋Array of Numbers

#### Returns:

* Boolean — true if the points are equal, false otherwise

#### Example:

```
var point = new Point(5, 10);
console.log(point == new Point(5, 10)); // true
console.log(point == new Point(1, 1)); // false
console.log(point != new Point(1, 1)); // true
```

[**clone**()](https://paperjs.org/reference/point/#clone)

Returns a copy of the point.

#### Returns:

* [Point](https://paperjs.org/reference/point) — the cloned point

#### Example:

```
var point1 = new Point();
var point2 = point1;
point2.x = 1; // also changes point1.x

var point2 = point1.clone();
point2.x = 1; // doesn't change point1.x
```

[**toString**()](https://paperjs.org/reference/point/#tostring)

#### Returns:

* String — a string representation of the point

[**getAngle**(point)](https://paperjs.org/reference/point/#getangle-point)

Returns the smaller angle between two vectors. The angle is unsigned, no information about rotational direction is given.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* Number — the angle in degrees

[**getAngleInRadians**(point)](https://paperjs.org/reference/point/#getangleinradians-point)

Returns the smaller angle between two vectors in radians. The angle is unsigned, no information about rotational direction is given.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* Number — the angle in radians

[**getDirectedAngle**(point)](https://paperjs.org/reference/point/#getdirectedangle-point)

Returns the angle between two vectors. The angle is directional and signed, giving information about the rotational direction.

Read more about angle units and orientation in the description of the [angle](https://paperjs.org/reference/point#angle) property.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* Number — the angle between the two vectors

[**getDistance**(point[, squared])](https://paperjs.org/reference/point/#getdistance-point)

Returns the distance between the point and another point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
* squared:
  Boolean
  — Controls whether the distance should remain squared, or its square root should be calculated
  — optional, default: false

#### Returns:

* Number

[**normalize**([length])](https://paperjs.org/reference/point/#normalize)

Normalize modifies the [length](https://paperjs.org/reference/point#length) of the vector to `1` without changing its angle and returns it as a new point. The optional `length` parameter defines the length to normalize to. The object itself is not modified!

#### Parameters:

* length:
  Number
  — The length of the normalized vector
  — optional, default: 1

#### Returns:

* [Point](https://paperjs.org/reference/point) — the normalized vector of the vector that is represented by this point’s coordinates

[**rotate**(angle, center)](https://paperjs.org/reference/point/#rotate-angle-center)

Rotates the point by the given angle around an optional center point. The object itself is not modified.

Read more about angle units and orientation in the description of the [angle](https://paperjs.org/reference/point#angle) property.

#### Parameters:

* angle:
  Number
  — the rotation angle
* center:
  [Point](https://paperjs.org/reference/point)
  — the center point of the rotation

#### Returns:

* [Point](https://paperjs.org/reference/point) — the rotated point

[**transform**(matrix)](https://paperjs.org/reference/point/#transform-matrix)

Transforms the point by the matrix as a new point. The object itself is not modified!

#### Parameters:

* matrix:
  [Matrix](https://paperjs.org/reference/matrix)

#### Returns:

* [Point](https://paperjs.org/reference/point) — the transformed point

[**negate**()](https://paperjs.org/reference/point/#negate)

Returns a new point with both coordinates negated. PaperScript uses it for the unary minus operator. The object itself is not modified!

#### Returns:

* [Point](https://paperjs.org/reference/point) — the negation of the point as a new point

#### Example:

```
var point = new Point(12, -6);
var result = -point; // PaperScript
var result = point.negate(); // JavaScript
console.log(result); // {x: -12, y: 6}
```

### Tests

[**isInside**(rect)](https://paperjs.org/reference/point/#isinside-rect)

Checks whether the point is inside the boundaries of the rectangle.

#### Parameters:

* rect:
  [Rectangle](https://paperjs.org/reference/rectangle)
  — the rectangle to check against

#### Returns:

* Boolean — true if the point is inside the rectangle, false otherwise

[**isClose**(point, tolerance)](https://paperjs.org/reference/point/#isclose-point-tolerance)

Checks if the point is within a given distance of another point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to check against
* tolerance:
  Number
  — the maximum distance allowed

#### Returns:

* Boolean — true if it is within the given distance, false otherwise

[**isCollinear**(point)](https://paperjs.org/reference/point/#iscollinear-point)

Checks if the vector represented by this point is collinear (parallel) to another vector, within a tolerance of 1e-8 for the sine of the angle between them.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the vector to check against

#### Returns:

* Boolean — true it is collinear, false otherwise

[**isOrthogonal**(point)](https://paperjs.org/reference/point/#isorthogonal-point)

Checks if the vector represented by this point is orthogonal (perpendicular) to another vector, within a tolerance of 1e-8 for the cosine of the angle between them.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the vector to check against

#### Returns:

* Boolean — true it is orthogonal, false otherwise

[**isZero**()](https://paperjs.org/reference/point/#iszero)

Checks if this point has both the x and y coordinate set to 0, within a tolerance of 1e-12, unlike [equals(point)](https://paperjs.org/reference/point#equals-point), which compares exactly.

#### Returns:

* Boolean — true if both x and y are 0, within the tolerance, false otherwise

[**isNaN**()](https://paperjs.org/reference/point/#isnan)

Checks if this point has an undefined value for at least one of its coordinates.

#### Returns:

* Boolean — true if either x or y are not a number, false otherwise

[**isInQuadrant**(quadrant)](https://paperjs.org/reference/point/#isinquadrant-quadrant)

Checks if the vector is within the specified quadrant. Note that if the vector lies on the boundary between two quadrants, `true` will be returned for both quadrants.

#### Parameters:

* quadrant:
  Number
  — the quadrant to check against

#### Returns:

* Boolean — true if either x or y are not a number, false otherwise

#### See also:

* [quadrant](https://paperjs.org/reference/point#quadrant)

### Vector Math Functions

[**dot**(point)](https://paperjs.org/reference/point/#dot-point)

Returns the dot product of the point and another point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* Number — the dot product of the two points

[**cross**(point)](https://paperjs.org/reference/point/#cross-point)

Returns the cross product of the point and another point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* Number — the cross product of the two points

[**project**(point)](https://paperjs.org/reference/point/#project-point)

Returns the projection of the point onto another point. Both points are interpreted as vectors.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Point](https://paperjs.org/reference/point) — the projection of the point onto another point

### Math Functions

[**round**()](https://paperjs.org/reference/point/#round)

Returns a new point with rounded [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) values. The object itself is not modified!

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:

```
var point = new Point(10.2, 10.9);
var roundPoint = point.round();
console.log(roundPoint); // {x: 10, y: 11}
```

[**ceil**()](https://paperjs.org/reference/point/#ceil)

Returns a new point with the nearest greater non-fractional values to the specified [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) values. The object itself is not modified!

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:

```
var point = new Point(10.2, 10.9);
var ceilPoint = point.ceil();
console.log(ceilPoint); // {x: 11, y: 11}
```

[**floor**()](https://paperjs.org/reference/point/#floor)

Returns a new point with the nearest smaller non-fractional values to the specified [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) values. The object itself is not modified!

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:

```
var point = new Point(10.2, 10.9);
var floorPoint = point.floor();
console.log(floorPoint); // {x: 10, y: 10}
```

[**abs**()](https://paperjs.org/reference/point/#abs)

Returns a new point with the absolute values of the specified [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) values. The object itself is not modified!

#### Returns:

* [Point](https://paperjs.org/reference/point)

#### Example:

```
var point = new Point(-5, 10);
var absPoint = point.abs();
console.log(absPoint); // {x: 5, y: 10}
```

[**clamp**(min, max)](https://paperjs.org/reference/point/#clamp-min-max)

Returns a new point with the [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) values clamped to the range between the given minimum and maximum points. The object itself is not modified!

#### Parameters:

* min:
  [Point](https://paperjs.org/reference/point)
  — the point with the smallest values
* max:
  [Point](https://paperjs.org/reference/point)
  — the point with the largest values

#### Returns:

* [Point](https://paperjs.org/reference/point) — the clamped point as a new point

#### Example:

```
var point = new Point(-5, 150);
var clampPoint = point.clamp(new Point(0, 0), new Point(100, 100));
console.log(clampPoint); // {x: 0, y: 100}
```

#### Example:Keep a point inside a rectangle:

```
var rect = new Rectangle(10, 20, 100, 50);
var point = new Point(200, 40);
var clampPoint = point.clamp(rect.topLeft, rect.bottomRight);
console.log(clampPoint); // {x: 110, y: 40}
```

### Math Operator Functions

[**add**(number)](https://paperjs.org/reference/point/#add-number)

Returns the addition of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to add

#### Returns:

* [Point](https://paperjs.org/reference/point) — the addition of the point and the value as a new point

#### Example:

```
var point = new Point(5, 10);
var result = point + 20; // PaperScript
var result = point.add(20); // JavaScript
console.log(result); // {x: 25, y: 30}
```

[**add**(point)](https://paperjs.org/reference/point/#add-point)

Returns the addition of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to add

#### Returns:

* [Point](https://paperjs.org/reference/point) — the addition of the two points as a new point

#### Example:

```
var point1 = new Point(5, 10);
var point2 = new Point(10, 20);
var result = point1 + point2; // PaperScript
var result = point1.add(point2); // JavaScript
console.log(result); // {x: 15, y: 30}
```

[**subtract**(number)](https://paperjs.org/reference/point/#subtract-number)

Returns the subtraction of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to subtract

#### Returns:

* [Point](https://paperjs.org/reference/point) — the subtraction of the point and the value as a new point

#### Example:

```
var point = new Point(10, 20);
var result = point - 5; // PaperScript
var result = point.subtract(5); // JavaScript
console.log(result); // {x: 5, y: 15}
```

[**subtract**(point)](https://paperjs.org/reference/point/#subtract-point)

Returns the subtraction of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to subtract

#### Returns:

* [Point](https://paperjs.org/reference/point) — the subtraction of the two points as a new point

#### Example:

```
var firstPoint = new Point(10, 20);
var secondPoint = new Point(5, 5);
var result = firstPoint - secondPoint; // PaperScript
var result = firstPoint.subtract(secondPoint); // JavaScript
console.log(result); // {x: 5, y: 15}
```

[**multiply**(number)](https://paperjs.org/reference/point/#multiply-number)

Returns the multiplication of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to multiply by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the multiplication of the point and the value as a new point

#### Example:

```
var point = new Point(10, 20);
var result = point * 2; // PaperScript
var result = point.multiply(2); // JavaScript
console.log(result); // {x: 20, y: 40}
```

[**multiply**(point)](https://paperjs.org/reference/point/#multiply-point)

Returns the multiplication of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to multiply by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the multiplication of the two points as a new point

#### Example:

```
var firstPoint = new Point(5, 10);
var secondPoint = new Point(4, 2);
var result = firstPoint * secondPoint; // PaperScript
var result = firstPoint.multiply(secondPoint); // JavaScript
console.log(result); // {x: 20, y: 20}
```

[**divide**(number)](https://paperjs.org/reference/point/#divide-number)

Returns the division of the supplied value to both coordinates of the point as a new point. The object itself is not modified!

#### Parameters:

* number:
  Number
  — the number to divide by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the division of the point and the value as a new point

#### Example:

```
var point = new Point(10, 20);
var result = point / 2; // PaperScript
var result = point.divide(2); // JavaScript
console.log(result); // {x: 5, y: 10}
```

[**divide**(point)](https://paperjs.org/reference/point/#divide-point)

Returns the division of the supplied point to the point as a new point. The object itself is not modified!

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)
  — the point to divide by

#### Returns:

* [Point](https://paperjs.org/reference/point) — the division of the two points as a new point

#### Example:

```
var firstPoint = new Point(8, 10);
var secondPoint = new Point(2, 5);
var result = firstPoint / secondPoint; // PaperScript
var result = firstPoint.divide(secondPoint); // JavaScript
console.log(result); // {x: 4, y: 2}
```

[**modulo**(value)](https://paperjs.org/reference/point/#modulo-value)

The modulo operator returns the integer remainders of dividing the point by the supplied value as a new point.

#### Parameters:

* value:
  Number

#### Returns:

* [Point](https://paperjs.org/reference/point) — the integer remainders of dividing the point by the value as a new point

#### Example:

```
var point = new Point(12, 6);
var result = point % 5; // PaperScript
var result = point.modulo(5); // JavaScript
console.log(result); // {x: 2, y: 1}
```

[**modulo**(point)](https://paperjs.org/reference/point/#modulo-point)

The modulo operator returns the integer remainders of dividing the point by the supplied value as a new point.

#### Parameters:

* point:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Point](https://paperjs.org/reference/point) — the integer remainders of dividing the points by each other as a new point

#### Example:

```
var point = new Point(12, 6);
var result = point % new Point(5, 2); // PaperScript
var result = point.modulo(new Point(5, 2)); // JavaScript
console.log(result); // {x: 2, y: 0}
```

## Static Methods

[**Point.min**(point1, point2)](https://paperjs.org/reference/point/#min-point1-point2)

Returns a new point object with the smallest [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) of the supplied points.

#### Parameters:

* point1:
  [Point](https://paperjs.org/reference/point)
* point2:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Point](https://paperjs.org/reference/point) — the newly created point object

#### Example:

```
var point1 = new Point(10, 100);
var point2 = new Point(200, 5);
var minPoint = Point.min(point1, point2);
console.log(minPoint); // {x: 10, y: 5}
```

#### Example:Find the minimum of multiple points:

```
var point1 = new Point(60, 100);
var point2 = new Point(200, 5);
var point3 = new Point(250, 35);
[point1, point2, point3].reduce(Point.min) // {x: 60, y: 5}
```

[**Point.max**(point1, point2)](https://paperjs.org/reference/point/#max-point1-point2)

Returns a new point object with the largest [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) of the supplied points.

#### Parameters:

* point1:
  [Point](https://paperjs.org/reference/point)
* point2:
  [Point](https://paperjs.org/reference/point)

#### Returns:

* [Point](https://paperjs.org/reference/point) — the newly created point object

#### Example:

```
var point1 = new Point(10, 100);
var point2 = new Point(200, 5);
var maxPoint = Point.max(point1, point2);
console.log(maxPoint); // {x: 200, y: 100}
```

#### Example:Find the maximum of multiple points:

```
var point1 = new Point(60, 100);
var point2 = new Point(200, 5);
var point3 = new Point(250, 35);
[point1, point2, point3].reduce(Point.max) // {x: 250, y: 100}
```

[**Point.random**()](https://paperjs.org/reference/point/#random)

Returns a point object with random [x](https://paperjs.org/reference/point#x) and [y](https://paperjs.org/reference/point#y) values between `0` and `1`.

#### Returns:

* [Point](https://paperjs.org/reference/point) — the newly created point object

#### Example:

```
var maxPoint = new Point(100, 100);
var randomPoint = Point.random();

// A point between {x:0, y:0} and {x:100, y:100}:
var point = maxPoint * randomPoint;
```
