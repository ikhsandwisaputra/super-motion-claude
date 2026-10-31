---
source: https://p5js.org/reference/p5/angleMode/
title: "angleMode"
fetched: 2026-10-28
---

Changes the unit system used to measure angles.

Degrees and radians are both units for measuring angles. There are 360˚ in one full rotation. A full rotation is 2 × π (about 6.28) radians.

Functions such as [rotate()](https://p5js.org/reference/p5/rotate/) and [sin()](https://p5js.org/reference/p5/sin/) expect angles measured radians by default. Calling `angleMode(DEGREES)` switches to degrees. Calling `angleMode(RADIANS)` switches back to radians.

Calling `angleMode()` with no arguments returns current angle mode, which is either `RADIANS` or `DEGREES`.

## Examples

## Syntax

`angleMode(mode)``angleMode()`

## Parameters

mode

RADIANS|DEGREES: either RADIANS or DEGREES.

## Returns

RADIANS|DEGREES: mode either RADIANS or DEGREES

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L1089) and open a pull request!

---

## Related References

* [acos

  Calculates the arc cosine of a number.](https://p5js.org/reference/p5/acos/)
* [angleMode

  Changes the unit system used to measure angles.](https://p5js.org/reference/p5/angleMode/)
* [asin

  Calculates the arc sine of a number.](https://p5js.org/reference/p5/asin/)
* [atan

  Calculates the arc tangent of a number.](https://p5js.org/reference/p5/atan/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Rotate 1/8 turn.
  rotate(QUARTER_PI);

  // Draw a line.
  line(0, 0, 80, 0);

  describe('A diagonal line radiating from the top-left corner of a square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use degrees.
  angleMode(DEGREES);

  // Rotate 1/8 turn.
  rotate(45);

  // Draw a line.
  line(0, 0, 80, 0);

  describe('A diagonal line radiating from the top-left corner of a square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Calculate the angle to rotate.
  let angle = TWO_PI / 7;

  // Move the origin to the center.
  translate(50, 50);

  // Style the flower.
  noStroke();
  fill(255, 50);

  // Draw the flower.
  for (let i = 0; i < 7; i += 1) {
    ellipse(0, 0, 80, 20);
    rotate(angle);
  }

  describe('A translucent white flower on a dark background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(50);

  // Use degrees.
  angleMode(DEGREES);

  // Calculate the angle to rotate.
  let angle = 360 / 7;

  // Move the origin to the center.
  translate(50, 50);

  // Style the flower.
  noStroke();
  fill(255, 50);

  // Draw the flower.
  for (let i = 0; i < 7; i += 1) {
    ellipse(0, 0, 80, 20);
    rotate(angle);
  }

  describe('A translucent white flower on a dark background.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A white ball on a string oscillates left and right.');
}

function draw() {
  background(200);

  // Calculate the coordinates.
  let x = 30 * cos(frameCount * 0.05) + 50;
  let y = 50;

  // Draw the oscillator.
  line(50, y, x, y);
  circle(x, y, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Use degrees.
  angleMode(DEGREES);

  describe('A white ball on a string oscillates left and right.');
}

function draw() {
  background(200);

  // Calculate the coordinates.
  let x = 30 * cos(frameCount * 2.86) + 50;
  let y = 50;

  // Draw the oscillator.
  line(50, y, x, y);
  circle(x, y, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Draw the upper line.
  rotate(PI / 6);
  line(0, 0, 80, 0);

  // Use degrees.
  angleMode(DEGREES);

  // Draw the lower line.
  rotate(30);
  line(0, 0, 80, 0);

  describe('Two diagonal lines radiating from the top-left corner of a square. The lines are oriented 30 degrees from the edges of the square and 30 degrees apart from each other.');
}
```
