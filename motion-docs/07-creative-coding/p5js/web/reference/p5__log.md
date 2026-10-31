---
source: https://p5js.org/reference/p5/log/
title: "log"
fetched: 2026-10-28
---

Calculates the natural logarithm (the base-e logarithm) of a number.

`log()` expects the `n` parameter to be a value greater than 0 because the natural logarithm is defined that way.

`log()` can also be used in shaders with p5.strands. The following example uses `log()` to create a decelerating color transition on a shape.

## Examples

## Syntax

`log(n)`

## Parameters

n

Number: number greater than 0.

## Returns

Number: natural logarithm of n.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L705) and open a pull request!

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
  let d = log(50);
  circle(33, 33, d);

  // Bottom-right.
  d = log(500000000);
  circle(67, 67, d);

  describe('Two white circles. The circle at the top-left is small. The circle at the bottom-right is about five times larger.');
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

  // Calculate coordinates.
  let x = frameCount;
  let y = 15 * log(x);

  // Draw a point.
  point(x, y);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that slowly shifts from purple to yellow.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // log(1 + t * 2) grows at a moderate pace over time.
  // Multiply by 0.4 to bring it into the 0 to 1 range.
  // min(..., 1) caps the value at 1.
  let value = min(log(1 + t * 2) * 0.4, 1);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let purple = [0.5, 0, 0.5, 1];
  let yellow = [1, 1, 0, 1];

  finalColor.begin();

  // mix() blends between purple (when value = 0) and yellow (when value = 1).
  // Because log() slows down over time, the color transition decelerates.
  finalColor.set(mix(purple, yellow, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
