---
source: https://p5js.org/reference/p5/arc/
title: "arc"
fetched: 2026-10-28
---

Draws an arc.

An arc is a section of an ellipse defined by the `x`, `y`, `w`, and `h` parameters. `x` and `y` set the location of the arc's center. `w` and `h` set the arc's width and height. See [ellipse()](https://p5js.org/reference/p5/ellipse/) and [ellipseMode()](https://p5js.org/reference/p5/ellipseMode/) for more details.

The fifth and sixth parameters, `start` and `stop`, set the angles between which to draw the arc. Arcs are always drawn clockwise from `start` to `stop`. Angles are always given in radians.

The seventh parameter, `mode`, is optional. It determines the arc's fill style. The fill modes are a semi-circle (`OPEN`), a closed semi-circle (`CHORD`), or a closed pie segment (`PIE`).

The eighth parameter, `detail`, is also optional. It determines how many vertices are used to draw the arc in WebGL mode. The default value is 25.

## Examples

## Syntax

`arc(x, y, w, h, start, stop, [mode], [detail])`

## Parameters

x

Number: x-coordinate of the arc's ellipse.

y

Number: y-coordinate of the arc's ellipse.

w

Number: width of the arc's ellipse by default.

h

Number: height of the arc's ellipse by default.

start

Number: angle to start the arc, specified in radians.

stop

Number: angle to stop the arc, specified in radians.

mode

CHORD|PIE|OPEN: optional parameter to determine the way of drawing the arc. either CHORD, PIE, or OPEN.

detail

Integer: optional parameter for WebGL mode only. This is to specify the number of vertices that makes up the perimeter of the arc. Default value is 25. Won't draw a stroke for a detail of more than 50.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/2d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/2d_primitives.js#L276) and open a pull request!

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

  arc(50, 50, 80, 80, 0, PI + HALF_PI);

  describe('A white circle on a gray canvas. The top-right quarter of the circle is missing.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  arc(50, 50, 80, 40, 0, PI + HALF_PI);

  describe('A white ellipse on a gray canvas. The top-right quarter of the ellipse is missing.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Bottom-right.
  arc(50, 55, 50, 50, 0, HALF_PI);

  noFill();

  // Bottom-left.
  arc(50, 55, 60, 60, HALF_PI, PI);

  // Top-left.
  arc(50, 55, 70, 70, PI, PI + QUARTER_PI);

  // Top-right.
  arc(50, 55, 80, 80, PI + QUARTER_PI, TWO_PI);

  describe(
    'A shattered outline of an circle with a quarter of a white circle at the bottom-right.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Default fill mode.
  arc(50, 50, 80, 80, 0, PI + QUARTER_PI);

  describe('A white circle with the top-right third missing. The bottom is outlined in black.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // OPEN fill mode.
  arc(50, 50, 80, 80, 0, PI + QUARTER_PI, OPEN);

  describe(
    'A white circle missing a section from the top-right. The bottom is outlined in black.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // CHORD fill mode.
  arc(50, 50, 80, 80, 0, PI + QUARTER_PI, CHORD);

  describe('A white circle with a black outline missing a section from the top-right.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // PIE fill mode.
  arc(50, 50, 80, 80, 0, PI + QUARTER_PI, PIE);

  describe('A white circle with a black outline. The top-right third is missing.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  // PIE fill mode.
  arc(0, 0, 80, 80, 0, PI + QUARTER_PI, PIE);

  describe('A white circle with a black outline. The top-right third is missing.');
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  background(200);

  // PIE fill mode with 5 vertices.
  arc(0, 0, 80, 80, 0, PI + QUARTER_PI, PIE, 5);

  describe('A white circle with a black outline. The top-right third is missing.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A yellow circle on a black background. The circle opens and closes its mouth.');
}

function draw() {
  background(0);

  // Style the arc.
  noStroke();
  fill(255, 255, 0);

  // Update start and stop angles.
  let biteSize = PI / 16;
  let startAngle = biteSize * sin(frameCount * 0.1) + biteSize;
  let endAngle = TWO_PI - startAngle;

  // Draw the arc.
  arc(50, 50, 80, 80, startAngle, endAngle, PIE);
}
```
