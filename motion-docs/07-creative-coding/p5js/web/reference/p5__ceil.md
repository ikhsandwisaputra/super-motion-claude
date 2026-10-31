---
source: https://p5js.org/reference/p5/ceil/
title: "ceil"
fetched: 2026-10-28
---

Calculates the closest integer value that is greater than or equal to a number.

For example, calling `ceil(9.03)` and `ceil(9.97)` both return the value 10.

`ceil()` can also be used in shaders with p5.strands. The following example uses `ceil()` to create a stepped color effect on a shape.

## Examples

## Syntax

`ceil(n)`

## Parameters

n

Number: number to round up.

## Returns

Integer: rounded up number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L171) and open a pull request!

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

  // Use RGB color with values from 0 to 1.
  colorMode(RGB, 1);

  noStroke();

  // Draw the left rectangle.
  let r = 0.3;
  fill(r, 0, 0);
  rect(0, 0, 50, 100);

  // Round r up to 1.
  r = ceil(r);

  // Draw the right rectangle.
  fill(r, 0, 0);
  rect(50, 0, 50, 100);

  describe('Two rectangles. The one on the left is dark red and the one on the right is bright red.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with stepped color bands.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) goes between -1 and 1.
  // 0.5 + 0.5 * sin(t) remaps this to the 0 to 1 range.
  let sinVal = 0.5 + 0.5 * sin(t);

  // Multiply by 4 then ceil to get the next whole number up.
  // Divide by 4 to bring the result back to the 0 to 1 range.
  // This creates 4 distinct stepped color levels: 0.25, 0.5, 0.75, 1.
  let value = ceil(sinVal * 4) / 4;

  // Each color is [R, G, B, A] with values from 0 to 1.
  let cyan = [0, 0.5, 1, 1];
  let orange = [1, 0.5, 0, 1];

  finalColor.begin();

  // mix() blends between cyan (when value = 0) and orange (when value = 1).
  // ceil() creates sharp steps between color levels.
  finalColor.set(mix(cyan, orange, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
