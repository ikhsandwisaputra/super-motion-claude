---
source: https://p5js.org/reference/p5/triangle/
title: "triangle"
fetched: 2026-10-28
---

Draws a triangle.

A triangle is a three-sided shape defined by three points. The first two parameters specify the triangle's first point `(x1, y1)`. The middle two parameters specify its second point `(x2, y2)`. And the last two parameters specify its third point `(x3, y3)`.

## Examples

## Syntax

`triangle(x1, y1, x2, y2, x3, y3)`

## Parameters

x1

Number: x-coordinate of the first point.

y1

Number: y-coordinate of the first point.

x2

Number: x-coordinate of the second point.

y2

Number: y-coordinate of the second point.

x3

Number: x-coordinate of the third point.

y3

Number: y-coordinate of the third point.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/2d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/2d_primitives.js#L1291) and open a pull request!

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

  triangle(30, 75, 58, 20, 86, 75);

  describe('A white triangle with a black outline on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  triangle(-20, 25, 8, -30, 36, 25);

  describe('A white triangle with a black outline on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white triangle spins around on a gray canvas.');
}

function draw() {
  background(200);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Draw the triangle.
  triangle(-20, 25, 8, -30, 36, 25);
}
```
