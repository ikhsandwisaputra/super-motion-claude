---
source: https://p5js.org/reference/p5/bezierPoint/
title: "bezierPoint"
fetched: 2026-10-28
---

Calculates coordinates along a Bézier curve using interpolation.

`bezierPoint()` calculates coordinates along a Bézier curve using the anchor and control points. It expects points in the same order as the [bezier()](https://p5js.org/reference/p5/bezier/) function. `bezierPoint()` works one axis at a time. Passing the anchor and control points' x-coordinates will calculate the x-coordinate of a point on the curve. Passing the anchor and control points' y-coordinates will calculate the y-coordinate of a point on the curve.

The first parameter, `a`, is the coordinate of the first anchor point.

The second and third parameters, `b` and `c`, are the coordinates of the control points.

The fourth parameter, `d`, is the coordinate of the last anchor point.

The fifth parameter, `t`, is the amount to interpolate along the curve. 0 is the first anchor point, 1 is the second anchor point, and 0.5 is halfway between them.

## Examples

## Syntax

`bezierPoint(a, b, c, d, t)`

## Parameters

a

Number: coordinate of first anchor point.

b

Number: coordinate of first control point.

c

Number: coordinate of second control point.

d

Number: coordinate of second anchor point.

t

Number: amount to interpolate between 0 and 1.

## Returns

Number: coordinate of the point on the curve.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/curves.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/curves.js#L312) and open a pull request!

---

## Related References

* [bezier

  Draws a Bézier curve.](https://p5js.org/reference/p5/bezier/)
* [bezierPoint

  Calculates coordinates along a Bézier curve using interpolation.](https://p5js.org/reference/p5/bezierPoint/)
* [bezierTangent

  Calculates coordinates along a line that's tangent to a Bézier curve.](https://p5js.org/reference/p5/bezierTangent/)
* [spline

  Draws a curve using a Catmull-Rom spline.](https://p5js.org/reference/p5/spline/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Set the coordinates for the curve's anchor and control points.
  let x1 = 85;
  let x2 = 10;
  let x3 = 90;
  let x4 = 15;
  let y1 = 20;
  let y2 = 10;
  let y3 = 90;
  let y4 = 80;

  // Style the curve.
  noFill();

  // Draw the curve.
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  // Draw circles along the curve's path.
  fill(255);

  // Top-right.
  let x = bezierPoint(x1, x2, x3, x4, 0);
  let y = bezierPoint(y1, y2, y3, y4, 0);
  circle(x, y, 5);

  // Center.
  x = bezierPoint(x1, x2, x3, x4, 0.5);
  y = bezierPoint(y1, y2, y3, y4, 0.5);
  circle(x, y, 5);

  // Bottom-left.
  x = bezierPoint(x1, x2, x3, x4, 1);
  y = bezierPoint(y1, y2, y3, y4, 1);
  circle(x, y, 5);

  describe('A black s-curve on a gray square. The endpoints and center of the curve are marked with white circles.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A black s-curve on a gray square. A white circle moves back and forth along the curve.');
}

function draw() {
  background(200);

  // Set the coordinates for the curve's anchor and control points.
  let x1 = 85;
  let x2 = 10;
  let x3 = 90;
  let x4 = 15;
  let y1 = 20;
  let y2 = 10;
  let y3 = 90;
  let y4 = 80;

  // Draw the curve.
  noFill();
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  // Calculate the circle's coordinates.
  let t = 0.5 * sin(frameCount * 0.01) + 0.5;
  let x = bezierPoint(x1, x2, x3, x4, t);
  let y = bezierPoint(y1, y2, y3, y4, t);

  // Draw the circle.
  fill(255);
  circle(x, y, 5);
}
```
