---
source: https://p5js.org/reference/p5/line/
title: "line"
fetched: 2026-10-28
---

Draws a straight line between two points.

A line's default width is one pixel. The version of `line()` with four parameters draws the line in 2D. To color a line, use the [stroke()](https://p5js.org/reference/p5/stroke/) function. To change its width, use the [strokeWeight()](https://p5js.org/reference/p5/strokeWeight/) function. A line can't be filled, so the [fill()](https://p5js.org/reference/p5/fill/) function won't affect the line's color.

The version of `line()` with six parameters allows the line to be drawn in 3D space. Doing so requires adding the `WEBGL` argument to [createCanvas()](https://p5js.org/reference/p5/createCanvas/).

## Examples

## Syntax

`line(x1, y1, x2, y2)``line(x1, y1, z1, x2, y2, z2)`

## Parameters

x1

Number: the x-coordinate of the first point.

y1

Number: the y-coordinate of the first point.

x2

Number: the x-coordinate of the second point.

y2

Number: the y-coordinate of the second point.

z1

Number: the z-coordinate of the first point.

z2

Number: the z-coordinate of the second point.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/2d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/2d_primitives.js#L633) and open a pull request!

---

## Related References

* [arc

  Draws an arc.](https://p5js.org/reference/p5/arc/)
* [circle

  Draws a circle.](https://p5js.org/reference/p5/circle/)
* [ellipse

  Draws an ellipse (oval).](https://p5js.org/reference/p5/ellipse/)
* [line

  Draws a straight line between two points.](https://p5js.org/reference/p5/line/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  line(30, 20, 85, 75);

  describe(
    'A black line on a gray canvas running from top-center to bottom-right.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the line.
  stroke('magenta');
  strokeWeight(5);

  line(30, 20, 85, 75);

  describe(
    'A thick, magenta line on a gray canvas running from top-center to bottom-right.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Top.
  line(30, 20, 85, 20);

  // Right.
  stroke(126);
  line(85, 20, 85, 75);

  // Bottom.
  stroke(255);
  line(85, 75, 30, 75);

  describe(
    'Three lines drawn in grayscale on a gray canvas. They form the top, right, and bottom sides of a square.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  line(-20, -30, 35, 25);

  describe(
    'A black line on a gray canvas running from top-center to bottom-right.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A black line connecting two spheres. The scene spins slowly.');
}

function draw() {
  background(200);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Draw a line.
  line(0, 0, 0, 30, 20, -10);

  // Draw the center sphere.
  sphere(10);

  // Translate to the second point.
  translate(30, 20, -10);

  // Draw the bottom-right sphere.
  sphere(10);
}
```
