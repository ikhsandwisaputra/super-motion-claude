---
source: https://p5js.org/reference/p5/pow/
title: "pow"
fetched: 2026-10-28
---

Calculates exponential expressions such as 23.

For example, `pow(2, 3)` evaluates the expression 2 × 2 × 2. `pow(2, -3)` evaluates 1 ÷ (2 × 2 × 2).

`pow()` can also be used in shaders with p5.strands. The following example uses `pow()` to create a gamma curve effect on colors in a shader.

## Examples

## Syntax

`pow(n, e)`

## Parameters

n

Number: base of the exponential expression.

e

Number: power by which to raise the base.

## Returns

Number: n^e.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L1237) and open a pull request!

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

  // Set the base of the exponent.
  let base = 3;

  // Top-left.
  let d = pow(base, 1);
  circle(10, 10, d);

  // Left-center.
  d = pow(base, 2);
  circle(20, 20, d);

  // Right-center.
  d = pow(base, 3);
  circle(40, 40, d);

  // Bottom-right.
  d = pow(base, 4);
  circle(80, 80, d);

  describe('A series of circles that grow exponentially from top left to bottom right.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with colors that shift with a power curve.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.0005 to slow it.
  let t = millis() * 0.0005;

  // pow(t, 2) squares the time value: it starts slow then accelerates.
  let value = pow(t, 2);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let deepBlue = [0, 0.1, 0.5, 1];
  let gold = [1, 0.8, 0, 1];

  finalColor.begin();

  // mix() blends between deepBlue (when value = 0) and gold (when value = 1).
  // Because pow() accelerates, the color transition gets faster over time.
  finalColor.set(mix(deepBlue, gold, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
