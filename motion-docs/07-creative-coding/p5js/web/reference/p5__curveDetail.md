---
source: https://p5js.org/reference/p5/curveDetail/
title: "curveDetail"
fetched: 2026-10-28
---

Sets the number of segments used to draw spline curves in WebGL mode.

In WebGL mode, smooth shapes are drawn using many flat segments. Adding more flat segments makes shapes appear smoother.

The parameter, `detail`, is the density of segments to use while drawing a spline curve.

Note: `curveDetail()` has no effect in 2D mode.

## Examples

## Syntax

`curveDetail(resolution)`

## Parameters

resolution

Number: number of segments to use. Default is 1/4

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/3d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/3d_primitives.js#L2590) and open a pull request!

---

## Related References

* [calculateBoundingBox

  Calculates the position and size of the smallest box that contains the geometry.](https://p5js.org/reference/p5.Geometry/calculateBoundingBox/)
* [clearColors

  Removes the geometry’s internal colors.](https://p5js.org/reference/p5.Geometry/clearColors/)
* [computeFaces

  Computes the geometry's faces using its vertices.](https://p5js.org/reference/p5.Geometry/computeFaces/)
* [computeNormals

  Calculates the normal vector for each vertex on the geometry.](https://p5js.org/reference/p5.Geometry/computeNormals/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  // Set the curveDetail() to 0.5
  curveDetail(0.5);

  // Do not show all the vertices
  splineProperty('ends', EXCLUDE)

  // Draw a black spline curve.
  noFill();
  strokeWeight(1);
  stroke(0);
  spline(-45, -24, 0, 23, -26, 0, 23, 11, 0, -35, 15, 0);

  // Draw red spline curves from the anchor points to the control points.
  spline(255, 0, 0);
  spline(-45, -24, 0, -45, -24, 0, 23, -26, 0, 23, 11, 0);
  spline(23, -26, 0, 23, 11, 0, -35, 15, 0, -35, 15, 0);

  // Draw the anchor points in black.
  strokeWeight(5);
  stroke(0);
  point(23, -26);
  point(23, 11);

  // Draw the control points in red.
  stroke(255, 0, 0);
  point(-45, -24);
  point(-35, 15);

  describe(
    'A gray square with a jagged curve drawn in three segments. The curve is a sideways U shape with red segments on top and bottom, and a black segment on the right. The endpoints of all the segments are marked with dots.'
  );
}
```
