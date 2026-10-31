---
source: https://p5js.org/reference/p5/sqrt/
title: "sqrt"
fetched: 2026-10-28
---

Calculates the square root of a number.

A number's square root can be multiplied by itself to produce the original number. For example, `sqrt(9)` returns 3 because 3 × 3 = 9. `sqrt()` always returns a positive value. `sqrt()` doesn't work with negative arguments such as `sqrt(-9)`.

`sqrt()` can also be used in shaders with p5.strands. The following example uses `sqrt()` to create a smooth ease-out curve on color and size.

## Examples

## Syntax

`sqrt(n)`

## Parameters

n

Number: non-negative number to square root.

## Returns

Number: square root of number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L1504) and open a pull request!

---

## Related References

* [abs

  Calculates the absolute value of a number.](https://p5js.org/reference/p5/abs/)
* [ceil

  Calculates the closest integer value that is greater than or equal to a number.](https://p5js.org/reference/p5/ceil/)
* [constrain

  Constrains a number between a minimum and maximum value.](https://p5js.org/reference/p5/constrain/)
* [dist

  Calculates the distance between two points.](https://p5js.org/reference/p5/dist/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Top-left.
  let d = sqrt(16);
  circle(33, 33, d);

  // Bottom-right.
  d = sqrt(1600);
  circle(67, 67, d);

  describe('Two white circles. The circle at the top-left is small. The circle at the bottom-right is ten times larger.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  describe('A series of black dots that get higher slowly from left to right.');
}

function draw() {
  // Invert the y-axis.
  scale(1, -1);
  translate(0, -100);

  // Calculate the coordinates.
  let x = frameCount;
  let y = 5 * sqrt(x);

  // Draw the point.
  point(x, y);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that grows and shifts from navy to orange with an ease-out curve.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) goes between -1 and 1.
  // 0.5 + 0.5 * sin(t) remaps this to the 0 to 1 range.
  let sinVal = 0.5 + 0.5 * sin(t);

  // sqrt(sinVal) creates an ease-out curve: fast start, slow finish.
  // Since sinVal is in [0,1], sqrt() stays in [0,1].
  let value = sqrt(sinVal);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let navy = [0, 0.1, 0.4, 1];
  let brightOrange = [1, 0.6, 0, 1];

  finalColor.begin();

  // mix() blends between navy (when value = 0) and brightOrange (when value = 1).
  // The sqrt() ease-out makes the color change fast at first, then slow down.
  finalColor.set(mix(navy, brightOrange, value));

  finalColor.end();
}

function drawShape() {
  let t = millis() * 0.001;
  let sinVal = 0.5 + 0.5 * sin(t);
  let size = 10 + sqrt(sinVal) * 30;
  sphere(size);
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  drawShape();
}
```
