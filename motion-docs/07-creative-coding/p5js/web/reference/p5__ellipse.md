---
source: https://p5js.org/reference/p5/ellipse/
title: "ellipse"
fetched: 2026-10-28
---

Draws an ellipse (oval).

An ellipse is a round shape defined by the `x`, `y`, `w`, and `h` parameters. `x` and `y` set the location of its center. `w` and `h` set its width and height. See [ellipseMode()](https://p5js.org/reference/p5/ellipseMode/) for other ways to set its position.

If no height is set, the value of width is used for both the width and height. If a negative height or width is specified, the absolute value is taken.

The fifth parameter, `detail`, is also optional. It determines how many vertices are used to draw the ellipse in WebGL mode. The default value is 25.

## Examples

## Syntax

`ellipse(x, y, w, [h])``ellipse(x, y, w, h, [detail])`

## Parameters

x

Number: x-coordinate of the center of the ellipse.

y

Number: y-coordinate of the center of the ellipse.

w

Number: width of the ellipse.

h

Number: height of the ellipse.

detail

Integer: optional parameter for WebGL mode only. This is to specify the number of vertices that makes up the perimeter of the ellipse. Default value is 25. Won't draw a stroke for a detail of more than 50.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/2d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/2d_primitives.js#L430) and open a pull request!

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

  ellipse(50, 50, 80, 80);

  describe('A white circle on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  ellipse(50, 50, 80);

  describe('A white circle on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  ellipse(50, 50, 80, 40);

  describe('A white ellipse on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  ellipse(0, 0, 80, 40);

  describe('A white ellipse on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  // Use 6 vertices.
  ellipse(0, 0, 80, 40, 6);

  describe('A white hexagon on a gray canvas.');
}
```
