---
source: https://p5js.org/reference/p5/bezierVertex/
title: "bezierVertex"
fetched: 2026-10-28
---

Adds a Bézier curve segment to a custom shape.

`bezierVertex()` adds a curved segment to custom shapes. The Bézier curves it creates are defined like those made by the [bezier()](https://p5js.org/reference/p5/bezier/) function. `bezierVertex()` must be called between the [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/) functions. Bézier need a starting point. Building a shape only with Bézier curves needs one initial call to [bezierVertex()](https://p5js.org/reference/p5/vertex/), before a number of `bezierVertex()` calls that is a multiple of the parameter set by [bezierOrder(...)](https://p5js.org/reference/p5/bezierOrder/) (default 3). But shapes can mix different types of vertices, so if there are some previous vertices, then the initial anchor is not needed, only the multiples of 3 (or the Bézier order) calls to `bezierVertex` for each curve.

Each curve of order 3 requires three calls to `bezierVertex`, so 2 curves would need 7 calls to `bezierVertex()`: (1 one initial anchor point, two sets of 3 curves describing the curves) With `bezierOrder(2)`, two curves would need 5 calls: 1 + 2 + 2.

Bézier curves can also be drawn in 3D using WebGL mode.

Note: `bezierVertex()` won’t work when an argument is passed to [beginShape()](https://p5js.org/reference/p5/beginShape/).

## Examples

## Syntax

`bezierVertex(x, y, [u], [v])``bezierVertex(x, y, z, [u], [v])`

## Parameters

x

Number: x-coordinate of the first control point.

y

Number: y-coordinate of the first control point.

u

Number:

v

Number:

z

Number:

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/vertex.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/vertex.js#L628) and open a pull request!

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

  // Style the shape.
  noFill();

  // Start drawing the shape.
  beginShape();

  // Add the first anchor point.
  bezierVertex(30, 20);

  // Add the Bézier vertex.
  bezierVertex(80, 0);
  bezierVertex(80, 75);
  bezierVertex(30, 75);

  // Stop drawing the shape.
  endShape();

  describe('A black C curve on a gray background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Draw the anchor points in black.
  stroke(0);
  strokeWeight(5);
  point(30, 20);
  point(30, 75);

  // Draw the control points in red.
  stroke(255, 0, 0);
  point(80, 0);
  point(80, 75);

  // Style the shape.
  noFill();
  stroke(0);
  strokeWeight(1);

  // Start drawing the shape.
  beginShape();

  // Add the first anchor point.
  bezierVertex(30, 20);

  // Add the Bézier vertex.
  bezierVertex(80, 0);
  bezierVertex(80, 75);
  bezierVertex(30, 75);

  // Stop drawing the shape.
  endShape();

  // Draw red lines from the anchor points to the control points.
  stroke(255, 0, 0);
  line(30, 20, 80, 0);
  line(30, 75, 80, 75);

  describe(
    'A gray square with three curves. A black curve has two straight, red lines that extend from its ends. The endpoints of all the curves are marked with dots.'
  );
}
```

```js
// Click the mouse near the red dot in the top-right corner
// and drag to change the curve's shape.

let x2 = 80;
let y2 = 0;
let isChanging = false;

function setup() {
  createCanvas(100, 100);

  describe(
    'A gray square with three curves. A black curve has two straight, red lines that extend from its ends. The endpoints of all the curves are marked with dots.'
  );
}

function draw() {
  background(200);

  // Draw the anchor points in black.
  stroke(0);
  strokeWeight(5);
  point(30, 20);
  point(30, 75);

  // Draw the control points in red.
  stroke(255, 0, 0);
  point(x2, y2);
  point(80, 75);

  // Style the shape.
  noFill();
  stroke(0);
  strokeWeight(1);

  // Start drawing the shape.
  beginShape();

  // Add the first anchor point.
  bezierVertex(30, 20);

  // Add the Bézier vertex.
  bezierVertex(x2, y2);
  bezierVertex(80, 75);
  bezierVertex(30, 75);

  // Stop drawing the shape.
  endShape();

  // Draw red lines from the anchor points to the control points.
  stroke(255, 0, 0);
  line(30, 20, x2, y2);
  line(30, 75, 80, 75);
}

// Start changing the first control point if the user clicks near it.
function mousePressed() {
  if (dist(mouseX, mouseY, x2, y2) < 20) {
    isChanging = true;
  }
}

// Stop changing the first control point when the user releases the mouse.
function mouseReleased() {
  isChanging = false;
}

// Update the first control point while the user drags the mouse.
function mouseDragged() {
  if (isChanging === true) {
    x2 = mouseX;
    y2 = mouseY;
  }
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Start drawing the shape.
  beginShape();

  // Add the first anchor point.
  bezierVertex(30, 20);

  // Add the Bézier vertices.
  bezierVertex(80, 0);
  bezierVertex(80, 75);
  bezierVertex(30, 75);

  bezierVertex(50, 80);
  bezierVertex(60, 25);
  bezierVertex(30, 20);

  // Stop drawing the shape.
  endShape();

  describe('A crescent moon shape drawn in white on a gray background.');
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A crescent moon shape drawn in white on a blue background. When the user drags the mouse, the scene rotates and a second moon is revealed.');
}

function draw() {
  background('midnightblue');

  // Enable orbiting with the mouse.
  orbitControl();

  // Style the moons.
  noStroke();
  fill('lemonchiffon');

  // Draw the first moon.
  beginShape();
  bezierVertex(-20, -30, 0);

  bezierVertex(30, -50, 0);
  bezierVertex(30, 25, 0);
  bezierVertex(-20, 25, 0);

  bezierVertex(0, 30, 0);
  bezierVertex(10, -25, 0);
  bezierVertex(-20, -30, 0);
  endShape();

  // Draw the second moon.
  beginShape();

  bezierVertex(-20, -30, -20);

  bezierVertex(30, -50, -20);
  bezierVertex(30, 25, -20);
  bezierVertex(-20, 25, -20);

  bezierVertex(0, 30, -20);
  bezierVertex(10, -25, -20);
  bezierVertex(-20, -30, -20);

  endShape();
}
```
