---
source: https://p5js.org/reference/p5/quad/
title: "quad"
fetched: 2026-10-28
---

Draws a quadrilateral (four-sided shape).

Quadrilaterals include rectangles, squares, rhombuses, and trapezoids. The first pair of parameters `(x1, y1)` sets the quad's first point. The next three pairs of parameters set the coordinates for its next three points `(x2, y2)`, `(x3, y3)`, and `(x4, y4)`. Points should be added in either clockwise or counter-clockwise order.

The version of `quad()` with twelve parameters allows the quad to be drawn in 3D space. Doing so requires adding the `WEBGL` argument to [createCanvas()](https://p5js.org/reference/p5/createCanvas/).

The thirteenth and fourteenth parameters are optional. In WebGL mode, they set the number of segments used to draw the quadrilateral in the x- and y-directions. They're both 2 by default.

## Examples

## Syntax

`quad(x1, y1, x2, y2, x3, y3, x4, y4, [detailX], [detailY])``quad(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, [detailX], [detailY])`

## Parameters

x1

Number: the x-coordinate of the first point.

y1

Number: the y-coordinate of the first point.

x2

Number: the x-coordinate of the second point.

y2

Number: the y-coordinate of the second point.

x3

Number: the x-coordinate of the third point.

y3

Number: the y-coordinate of the third point.

x4

Number: the x-coordinate of the fourth point.

y4

Number: the y-coordinate of the fourth point.

detailX

Integer: number of segments in the x-direction.

detailY

Integer: number of segments in the y-direction.

z1

Number: the z-coordinate of the first point.

z2

Number: the z-coordinate of the second point.

z3

Number: the z-coordinate of the third point.

z4

Number: the z-coordinate of the fourth point.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/2d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/2d_primitives.js#L952) and open a pull request!

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

  quad(20, 20, 80, 20, 80, 80, 20, 80);

  describe('A white square with a black outline drawn on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  quad(20, 30, 80, 30, 80, 70, 20, 70);

  describe('A white rectangle with a black outline drawn on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  quad(50, 62, 86, 50, 50, 38, 14, 50);

  describe('A white rhombus with a black outline drawn on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  quad(20, 50, 80, 30, 80, 70, 20, 70);

  describe('A white trapezoid with a black outline drawn on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  quad(-30, -30, 30, -30, 30, 30, -30, 30);

  describe('A white square with a black outline drawn on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A wavy white surface spins around on gray canvas.');
}

function draw() {
  background(200);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Draw the quad.
  quad(-30, -30, 0, 30, -30, 0, 30, 30, 20, -30, 30, -20);
}
```
