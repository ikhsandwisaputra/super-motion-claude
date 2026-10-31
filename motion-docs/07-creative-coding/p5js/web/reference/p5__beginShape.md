---
source: https://p5js.org/reference/p5/beginShape/
title: "beginShape"
fetched: 2026-10-28
---

Begins adding vertices to a custom shape.

The `beginShape()` and [endShape()](https://p5js.org/reference/p5/endShape/) functions allow for creating custom shapes in 2D or 3D. `beginShape()` begins adding vertices to a custom shape and [endShape()](https://p5js.org/reference/p5/endShape/) stops adding them.

The parameter, `kind`, sets the kind of shape to make. The available kinds are:

* `PATH` (the default) to draw shapes by tracing out the path along their edges.
* `POINTS` to draw a series of points.
* `LINES` to draw a series of unconnected line segments.
* `TRIANGLES` to draw a series of separate triangles.
* `TRIANGLE_FAN` to draw a series of connected triangles sharing the first vertex in a fan-like fashion.
* `TRIANGLE_STRIP` to draw a series of connected triangles in strip fashion.
* `QUADS` to draw a series of separate quadrilaterals (quads).
* `QUAD_STRIP` to draw quad strip using adjacent edges to form the next quad.

After calling `beginShape()`, shapes can be built by calling [vertex()](https://p5js.org/reference/p5/vertex/), [bezierVertex()](https://p5js.org/reference/p5/bezierVertex/), and/or [splineVertex()](https://p5js.org/reference/p5/splineVertex/). Calling [endShape()](https://p5js.org/reference/p5/endShape/) will stop adding vertices to the shape. Each shape will be outlined with the current stroke color and filled with the current fill color.

Transformations such as [translate()](https://p5js.org/reference/p5/translate/), [rotate()](https://p5js.org/reference/p5/rotate/), and [scale()](https://p5js.org/reference/p5/scale/) don't work between `beginShape()` and [endShape()](https://p5js.org/reference/p5/endShape/). It's also not possible to use other shapes, such as [ellipse()](https://p5js.org/reference/p5/ellipse/) or [rect()](https://p5js.org/reference/p5/rect/), between `beginShape()` and [endShape()](https://p5js.org/reference/p5/endShape/).

## Examples

## Syntax

`beginShape([kind])`

## Parameters

kind

POINTS|LINES|TRIANGLES|TRIANGLE\_FAN|TRIANGLE\_STRIP|QUADS|QUAD\_STRIP|PATH: either POINTS, LINES, TRIANGLES, TRIANGLE\_FAN TRIANGLE\_STRIP, QUADS, QUAD\_STRIP or PATH. Defaults to PATH.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/vertex.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/vertex.js#L358) and open a pull request!

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

  background(200);

  // Start drawing the shape.
  beginShape();

  // Add vertices.
  vertex(30, 20);
  vertex(85, 20);
  vertex(85, 75);
  vertex(30, 75);

  // Stop drawing the shape.
  endShape(CLOSE);

  describe('A white square on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  // Only draw the vertices (points).
  beginShape(POINTS);

  // Add vertices.
  vertex(30, 20);
  vertex(85, 20);
  vertex(85, 75);
  vertex(30, 75);

  // Stop drawing the shape.
  endShape();

  describe('Four black dots that form a square are drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  // Only draw lines between alternating pairs of vertices.
  beginShape(LINES);

  // Add vertices.
  vertex(30, 20);
  vertex(85, 20);
  vertex(85, 75);
  vertex(30, 75);

  // Stop drawing the shape.
  endShape();

  describe('Two horizontal black lines on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the shape.
  noFill();

  // Start drawing the shape.
  beginShape();

  // Add vertices.
  vertex(30, 20);
  vertex(85, 20);
  vertex(85, 75);
  vertex(30, 75);

  // Stop drawing the shape.
  endShape();

  describe('Three black lines form a sideways U shape on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the shape.
  noFill();

  // Start drawing the shape.
  beginShape();

  // Add vertices.
  vertex(30, 20);
  vertex(85, 20);
  vertex(85, 75);
  vertex(30, 75);

  // Stop drawing the shape.
  // Connect the first and last vertices.
  endShape(CLOSE);

  describe('A black outline of a square drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  // Draw a series of triangles.
  beginShape(TRIANGLES);

  // Left triangle.
  vertex(30, 75);
  vertex(40, 20);
  vertex(50, 75);

  // Right triangle.
  vertex(60, 20);
  vertex(70, 75);
  vertex(80, 20);

  // Stop drawing the shape.
  endShape();

  describe('Two white triangles drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  // Draw a series of triangles.
  beginShape(TRIANGLE_STRIP);

  // Add vertices.
  vertex(30, 75);
  vertex(40, 20);
  vertex(50, 75);
  vertex(60, 20);
  vertex(70, 75);
  vertex(80, 20);
  vertex(90, 75);

  // Stop drawing the shape.
  endShape();

  describe('Five white triangles that are interleaved drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  // Draw a series of triangles that share their first vertex.
  beginShape(TRIANGLE_FAN);

  // Add vertices.
  vertex(57.5, 50);
  vertex(57.5, 15);
  vertex(92, 50);
  vertex(57.5, 85);
  vertex(22, 50);
  vertex(57.5, 15);

  // Stop drawing the shape.
  endShape();

  describe('Four white triangles form a square are drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  // Draw a series of quadrilaterals.
  beginShape(QUADS);

  // Left rectangle.
  vertex(30, 20);
  vertex(30, 75);
  vertex(50, 75);
  vertex(50, 20);

  // Right rectangle.
  vertex(65, 20);
  vertex(65, 75);
  vertex(85, 75);
  vertex(85, 20);

  // Stop drawing the shape.
  endShape();

  describe('Two white rectangles drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  // Draw a series of quadrilaterals.
  beginShape(QUAD_STRIP);

  // Add vertices.
  vertex(30, 20);
  vertex(30, 75);
  vertex(50, 20);
  vertex(50, 75);
  vertex(65, 20);
  vertex(65, 75);
  vertex(85, 20);
  vertex(85, 75);

  // Stop drawing the shape.
  endShape();

  describe('Three white rectangles that share edges are drawn on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  // Start drawing the shape.
  // Draw a series of quadrilaterals.
  beginShape(PATH);

  // Add the vertices.
  vertex(-30, -30, 0);
  vertex(30, -30, 0);
  vertex(30, -10, 0);
  vertex(-10, -10, 0);
  vertex(-10, 10, 0);
  vertex(30, 10, 0);
  vertex(30, 30, 0);
  vertex(-30, 30, 0);

  // Stop drawing the shape.
  // Connect the first and last vertices.
  endShape(CLOSE);

  describe('A blocky C shape drawn in white on a gray background.');
}
```

```js
// Click and drag with the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A blocky C shape drawn in red, blue, and green on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Start drawing the shape.
  // Draw a series of quadrilaterals.
  beginShape(PATH);

  // Add the vertices.
  fill('red');
  stroke('red');
  vertex(-30, -30, 0);
  vertex(30, -30, 0);
  vertex(30, -10, 0);
  fill('green');
  stroke('green');
  vertex(-10, -10, 0);
  vertex(-10, 10, 0);
  vertex(30, 10, 0);
  fill('blue');
  stroke('blue');
  vertex(30, 30, 0);
  vertex(-30, 30, 0);

  // Stop drawing the shape.
  // Connect the first and last vertices.
  endShape(CLOSE);
}
```
