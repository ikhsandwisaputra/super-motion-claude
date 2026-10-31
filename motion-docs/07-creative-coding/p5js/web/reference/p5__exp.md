---
source: https://p5js.org/reference/p5/exp/
title: "exp"
fetched: 2026-10-28
---

Calculates the value of Euler's number e (2.71828...) raised to the power of a number.

`exp()` can also be used in shaders with p5.strands. The following example uses `exp()` to create an accelerating color transition on a shape.

## Examples

## Syntax

`exp(n)`

## Parameters

n

Number: exponent to raise.

## Returns

Number: e^n

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L402) and open a pull request!

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
  let d = exp(1);
  circle(10, 10, d);

  // Left-center.
  d = exp(2);
  circle(20, 20, d);

  // Right-center.
  d = exp(3);
  circle(40, 40, d);

  // Bottom-right.
  d = exp(4);
  circle(80, 80, d);

  describe('A series of circles that grow exponentially from top left to bottom right.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  describe('A series of black dots that grow exponentially from left to right.');
}

function draw() {
  // Invert the y-axis.
  scale(1, -1);
  translate(0, -100);

  // Calculate the coordinates.
  let x = frameCount;
  let y = 0.005 * exp(x * 0.1);

  // Draw a point.
  point(x, y);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that brightens with accelerating speed.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.0005 to slow it.
  let t = millis() * 0.0005;

  // exp(t) grows slowly at first, then accelerates (exponential growth).
  // Multiply by 0.01 to keep it from growing too fast.
  // min(..., 1) caps the value at 1 so it doesn't go past white.
  let value = min(exp(t) * 0.01, 1);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let darkBlue = [0.1, 0.1, 0.3, 1];
  let lightYellow = [1, 1, 0.5, 1];

  finalColor.begin();

  // mix() blends between darkBlue (when value = 0) and lightYellow (when value = 1).
  // Because exp() accelerates, the color transition gets faster over time.
  finalColor.set(mix(darkBlue, lightYellow, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
