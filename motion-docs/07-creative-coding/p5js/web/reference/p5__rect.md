---
source: https://p5js.org/reference/p5/rect/
title: "rect"
fetched: 2026-10-28
---

Draws a rectangle.

A rectangle is a four-sided shape defined by the `x`, `y`, `w`, and `h` parameters. `x` and `y` set the location of its top-left corner. `w` sets its width and `h` sets its height. Every angle in the rectangle measures 90˚. See [rectMode()](https://p5js.org/reference/p5/rectMode/) for other ways to define rectangles.

The version of `rect()` with five parameters creates a rounded rectangle. The fifth parameter sets the radius for all four corners.

The version of `rect()` with eight parameters also creates a rounded rectangle. Each of the last four parameters set the radius of a corner. The radii start with the top-left corner and move clockwise around the rectangle. If any of these parameters are omitted, they are set to the value of the last radius that was set.

## Examples

## Syntax

`rect(x, y, w, [h], [tl], [tr], [br], [bl])``rect(x, y, w, h, [detailX], [detailY])`

## Parameters

x

Number: x-coordinate of the rectangle.

y

Number: y-coordinate of the rectangle.

w

Number: width of the rectangle.

h

Number: height of the rectangle.

tl

Number: optional radius of top-left corner.

tr

Number: optional radius of top-right corner.

br

Number: optional radius of bottom-right corner.

bl

Number: optional radius of bottom-left corner.

detailX

Integer: number of segments in the x-direction (for WebGL mode).

detailY

Integer: number of segments in the y-direction (for WebGL mode).

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/2d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/2d_primitives.js#L1090) and open a pull request!

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

  rect(30, 20, 55, 55);

  describe('A white square with a black outline on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  rect(30, 20, 55, 40);

  describe('A white rectangle with a black outline on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Give all corners a radius of 20.
  rect(30, 20, 55, 50, 20);

  describe('A white rectangle with a black outline and round edges on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Give each corner a unique radius.
  rect(30, 20, 55, 50, 20, 15, 10, 5);

  describe('A white rectangle with a black outline and round edges of different radii.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  rect(-20, -30, 55, 55);

  describe('A white square with a black outline on a gray canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white square spins around on gray canvas.');
}

function draw() {
  background(200);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Draw the rectangle.
  rect(-20, -30, 55, 55);
}
```
