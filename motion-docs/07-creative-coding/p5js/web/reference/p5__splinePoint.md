---
source: https://p5js.org/reference/p5/splinePoint/
title: "splinePoint"
fetched: 2026-10-28
---

Calculates coordinates along a spline curve using interpolation.

`splinePoint()` calculates coordinates along a spline curve using four points p0, p1, p2, p3. It expects points in the same order as the [spline()](https://p5js.org/reference/p5/spline/) function. `splinePoint()` works one axis at a time. Passing the points' x-coordinates will calculate the x-coordinate of a point on the curve. Passing the points' y-coordinates will calculate the y-coordinate of a point on the curve.

The first parameter, `a`, is the coordinate of point p0.

The second and third parameters, `b` and `c`, are the coordinates of points p1 and p2.

The fourth parameter, `d`, is the coordinate of point p3.

The fifth parameter, `t`, is the amount to interpolate along the span from p1 to p2. `t = 0` is p1, `t = 1` is p2, and `t = 0.5` is halfway between them.

## Examples

## Syntax

`splinePoint(a, b, c, d, t)`

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

Number: coordinate of a point on the curve.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/curves.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/curves.js#L856) and open a pull request!

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

  // Draw circles along the curve's path.
  fill(255);

  // Top.
  let x = splinePoint(x1, x2, x3, x4, 0);
  let y = splinePoint(y1, y2, y3, y4, 0);
  circle(x, y, 5);

  // Center.
  x = splinePoint(x1, x2, x3, x4, 0.5);
  y = splinePoint(y1, y2, y3, y4, 0.5);
  circle(x, y, 5);

  // Bottom.
  x = splinePoint(x1, x2, x3, x4, 1);
  y = splinePoint(y1, y2, y3, y4, 1);
  circle(x, y, 5);

  describe('A black curve on a gray square. The endpoints and center of the curve are marked with white circles.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A black curve on a gray square. A white circle moves back and forth along the curve.');
}

function draw() {
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

  // Calculate the circle's coordinates.
  let t = 0.5 * sin(frameCount * 0.01) + 0.5;
  let x = splinePoint(x1, x2, x3, x4, t);
  let y = splinePoint(y1, y2, y3, y4, t);

  // Draw the circle.
  fill(255);
  circle(x, y, 5);
}
```

```js
let p0, p1, p2, p3;

function setup() {
  createCanvas(200, 200);
  splineProperty('ends', INCLUDE); // make endpoints part of the curve

  // Four points forming a gentle arch
  p0 = createVector(30, 160);
  p1 = createVector(60, 50);
  p2 = createVector(140, 50);
  p3 = createVector(170, 160);

  describe('Black spline through p0–p3. A red dot marks the location at parameter t on p1->p2 using splinePoint.');
}

function draw() {
  background(245);

  // Draw the spline for context
  noFill();
  stroke(0);
  strokeWeight(2);
  spline(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

  // Map mouse X to t in [0, 1] (span p1->p2)
  let t = constrain(map(mouseX, 0, width, 0, 1), 0, 1);

  // Evaluate the curve point by axis (splinePoint works one axis at a time)
  let x = splinePoint(p0.x, p1.x, p2.x, p3.x, t);
  let y = splinePoint(p0.y, p1.y, p2.y, p3.y, t);

  // Marker at the evaluated position
  noStroke();
  fill('red');
  circle(x, y, 8);

  // Draw control/anchor points
  stroke(0);
  strokeWeight(1);
  fill(255);
  const r = 6;
  circle(p0.x, p0.y, r);
  circle(p1.x, p1.y, r);
  circle(p2.x, p2.y, r);
  circle(p3.x, p3.y, r);

  // Labels + UI hint
  noStroke();
  fill(20);
  textSize(10);
  text('p0', p0.x - 12, p0.y + 14);
  text('p1', p1.x - 12, p1.y - 8);
  text('p2', p2.x + 4, p2.y - 8);
  text('p3', p3.x + 4, p3.y + 14);
  text('t = ' + nf(t, 1, 2) + ' (p1→p2)', 8, 16);
}
```
