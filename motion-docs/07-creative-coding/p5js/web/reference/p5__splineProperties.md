---
source: https://p5js.org/reference/p5/splineProperties/
title: "splineProperties"
fetched: 2026-10-28
---

Sets multiple properties for spline curves at once.

`splineProperties()` accepts an object with key-value pairs to configure how spline curves are drawn. This is a convenient way to set multiple spline properties with a single function call, rather than calling [splineProperty()](https://p5js.org/reference/p5/splineProperty/) multiple times.

The properties object can include:

* `tightness`: A number that controls how tightly the curve fits to the vertex points. The default value is 0. Positive values make the curve tighter (straighter), while negative values make it looser. Values between -5 and 5 work best.
* `ends`: Controls whether to draw the end segments of the spline. Set to `EXCLUDE` to skip drawing the segments between the first and second points and between the second-to-last and last points. This is useful when you want to use the first and last points as control points only.

`splineProperties()` affects curves drawn with [splineVertex()](https://p5js.org/reference/p5/splineVertex/) within [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/), as well as curves drawn with [spline()](https://p5js.org/reference/p5/spline/). The properties remain active until changed by another call to `splineProperties()` or [splineProperty()](https://p5js.org/reference/p5/splineProperty/).

## Examples

## Syntax

`splineProperties(values)`

## Parameters

values

Object: an object containing spline property key-value pairs

## Returns

Object:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/custom\_shapes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/custom_shapes.js#L2808) and open a pull request!

---

## Related References

* [beginContour

  Begins creating a hole within a flat shape.](https://p5js.org/reference/p5/beginContour/)
* [beginShape

  Begins adding vertices to a custom shape.](https://p5js.org/reference/p5/beginShape/)
* [bezierOrder

  Influences the shape of the Bézier curve segment in a custom shape.](https://p5js.org/reference/p5/bezierOrder/)
* [bezierVertex

  Adds a Bézier curve segment to a custom shape.](https://p5js.org/reference/p5/bezierVertex/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);
  background(220);

  // Set spline tightness using splineProperties
  splineProperties({
    tightness: 0.5
  });

  // Draw a spline curve
  noFill();
  stroke(0);
  strokeWeight(2);

  beginShape();
  splineVertex(20, 80);
  splineVertex(30, 30);
  splineVertex(70, 30);
  splineVertex(80, 80);
  endShape();

  // Show vertex points
  fill(255, 0, 0);
  noStroke();
  circle(20, 80, 6);
  circle(30, 30, 6);
  circle(70, 30, 6);
  circle(80, 80, 6);

  describe('A smooth curved line with tightness 0.5 connecting four red points.');
}
```

```js
function setup() {
  createCanvas(100, 100);
  background(220);

  // Exclude end segments - first and last points become control points
  splineProperties({
    tightness: 0,
    ends: EXCLUDE
  });

  // Draw curve only between middle points
  noFill();
  stroke(0);
  strokeWeight(2);

  beginShape();
  splineVertex(10, 50);  // Control point (affects curve but not drawn to)
  splineVertex(30, 20);  // Start of visible curve
  splineVertex(70, 80);  // End of visible curve
  splineVertex(90, 50);  // Control point (affects curve but not drawn to)
  endShape();

  // Show all points
  fill(200, 0, 0);
  noStroke();
  circle(10, 50, 6);  // Control point
  circle(90, 50, 6);  // Control point

  fill(0, 0, 255);
  circle(30, 20, 6);  // Visible curve point
  circle(70, 80, 6);  // Visible curve point

  describe('A curved line between two blue points, with red control points at the ends.');
}
```
