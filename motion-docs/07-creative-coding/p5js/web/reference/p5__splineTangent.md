---
source: https://p5js.org/reference/p5/splineTangent/
title: "splineTangent"
fetched: 2026-10-28
---

Calculates coordinates along a line that's tangent to a spline curve.

Tangent lines skim the surface of a curve. A tangent line's slope equals the curve's slope at the point where it intersects.

`splineTangent()` calculates coordinates along a tangent line using four points p0, p1, p2, p3. It expects points in the same order as the [spline()](https://p5js.org/reference/p5/spline/) function. `splineTangent()` works one axis at a time. Passing the points' x-coordinates returns the x-component of the tangent vector; passing the points' y-coordinates returns the y-component. The first parameter, `a`, is the coordinate of point p0.

The second and third parameters, `b` and `c`, are the coordinates of points p1 and p2.

The fourth parameter, `d`, is the coordinate of point p3.

The fifth parameter, `t`, is the amount to interpolate along the span from p1 to p2. `t = 0` is p1, `t = 1` is p2, and `t = 0.5` is halfway between them.

## Examples

## Syntax

`splineTangent(a, b, c, d, t)`

## Parameters

a

Number: coordinate of point p0.

b

Number: coordinate of point p1.

c

Number: coordinate of point p2.

d

Number: coordinate of point p3.

t

Number: amount to interpolate between 0 and 1.

## Returns

Number: coordinate of a point on the tangent line.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/curves.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/curves.js#L1004) and open a pull request!

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
  createCanvas(120, 120);
  describe('A black spline on a gray canvas. A red dot moves along the curve on its own. A short line shows the tangent direction at the dot.');
}

function draw() {
  background(240);

  const x1 = 15, y1 = 40;
  const x2 = 90, y2 = 25;
  const x3 = 95, y3 = 95;
  const x4 = 30, y4 = 110;

  noFill();
  stroke(0);
  strokeWeight(2);
  spline(x1, y1, x2, y2, x3, y3, x4, y4);

  const t = 0.5 + 0.5 * sin(frameCount * 0.03);

  const px = splinePoint(x1, x2, x3, x4, t);
  const py = splinePoint(y1, y2, y3, y4, t);

  let tx = splineTangent(x1, x2, x3, x4, t);
  let ty = splineTangent(y1, y2, y3, y4, t);

  const m = Math.hypot(tx, ty) || 1;
  tx = (tx / m) * 16;
  ty = (ty / m) * 16;

  stroke(0);
  strokeWeight(2);
  line(px, py, px + tx, py + ty);

  noStroke();
  fill('red');
  circle(px, py, 7);
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Set the coordinates for the curve's four points (p0, p1, p2, p3).
  let x1 = 5;
  let y1 = 26;
  let x2 = 73;
  let y2 = 24;
  let x3 = 73;
  let y3 = 61;
  let x4 = 15;
  let y4 = 65;

  // Draw the curve.
  noFill();
  spline(x1, y1, x2, y2, x3, y3, x4, y4);

  // Draw tangents along the curve's path.
  fill(255);

  // Top circle.
  stroke(0);
  let x = splinePoint(x1, x2, x3, x4, 0);
  let y = splinePoint(y1, y2, y3, y4, 0);
  circle(x, y, 5);

  // Top tangent line.
  // Scale the tangent point to draw a shorter line.
  stroke(255, 0, 0);
  let tx = 0.2 * splineTangent(x1, x2, x3, x4, 0);
  let ty = 0.2 * splineTangent(y1, y2, y3, y4, 0);
  line(x + tx, y + ty, x - tx, y - ty);

  // Center circle.
  stroke(0);
  x = splinePoint(x1, x2, x3, x4, 0.5);
  y = splinePoint(y1, y2, y3, y4, 0.5);
  circle(x, y, 5);

  // Center tangent line.
  // Scale the tangent point to draw a shorter line.
  stroke(255, 0, 0);
  tx = 0.2 * splineTangent(x1, x2, x3, x4, 0.5);
  ty = 0.2 * splineTangent(y1, y2, y3, y4, 0.5);
  line(x + tx, y + ty, x - tx, y - ty);

  // Bottom circle.
  stroke(0);
  x = splinePoint(x1, x2, x3, x4, 1);
  y = splinePoint(y1, y2, y3, y4, 1);
  circle(x, y, 5);

  // Bottom tangent line.
  // Scale the tangent point to draw a shorter line.
  stroke(255, 0, 0);
  tx = 0.2 * splineTangent(x1, x2, x3, x4, 1);
  ty = 0.2 * splineTangent(y1, y2, y3, y4, 1);
  line(x + tx, y + ty, x - tx, y - ty);

  describe(
    'A black curve on a gray square. A white circle moves back and forth along the curve.'
  );
}
```
