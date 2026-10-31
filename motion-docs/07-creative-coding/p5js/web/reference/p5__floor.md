---
source: https://p5js.org/reference/p5/floor/
title: "floor"
fetched: 2026-10-28
---

Calculates the closest integer value that is less than or equal to the value of a number.

`floor()` can also be used in shaders with p5.strands. The following example uses `floor()` to create banding effects on a shape.

## Examples

## Syntax

`floor(n)`

## Parameters

n

Number: number to round down.

## Returns

Integer: rounded down number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L483) and open a pull request!

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

  // Use RGB color with values from 0 to 1.
  colorMode(RGB, 1);

  noStroke();

  // Draw the left rectangle.
  let r = 0.8;
  fill(r, 0, 0);
  rect(0, 0, 50, 100);

  // Round r down to 0.
  r = floor(r);

  // Draw the right rectangle.
  fill(r, 0, 0);
  rect(50, 0, 50, 100);

  describe('Two rectangles. The one on the left is bright red and the one on the right is black.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with posterized color bands.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) goes between -1 and 1.
  // 0.5 + 0.5 * sin(t) remaps this to the 0 to 1 range.
  let sinVal = 0.5 + 0.5 * sin(t);

  // Multiply by 4 then floor to get the next whole number down.
  // Divide by 4 to bring the result back to the 0 to 1 range.
  // This creates 5 distinct stepped color levels: 0, 0.25, 0.5, 0.75, 1.
  let value = floor(sinVal * 4) / 4;

  // Each color is [R, G, B, A] with values from 0 to 1.
  let darkPurple = [0.2, 0, 0.8, 1];
  let brightTeal = [0.2, 1, 0.8, 1];

  finalColor.begin();

  // mix() blends between darkPurple (when value = 0) and brightTeal (when value = 1).
  // The floor() creates visible banding/posterization in the color.
  finalColor.set(mix(darkPurple, brightTeal, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
