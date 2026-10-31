---
source: https://p5js.org/reference/p5/abs/
title: "abs"
fetched: 2026-10-28
---

Calculates the absolute value of a number.

A number's absolute value is its distance from zero on the number line. -5 and 5 are both five units away from zero, so calling `abs(-5)` and `abs(5)` both return 5. The absolute value of a number is always positive.

`abs()` can also be used in shaders with p5.strands. The following example uses `abs()` to create a mirror effect on the color of a shape.

## Examples

## Syntax

`abs(n)`

## Parameters

n

Number: number to compute.

## Returns

Number: absolute value of given number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L85) and open a pull request!

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

  describe('A gray square with a vertical black line that divides it in half. A white rectangle gets taller when the user moves the mouse away from the line.');
}

function draw() {
  background(200);

  // Divide the canvas.
  line(50, 0, 50, 100);

  // Calculate the mouse's distance from the middle.
  let h = abs(mouseX - 50);

  // Draw a rectangle based on the mouse's distance
  // from the middle.
  rect(0, 100 - h, 100, h);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with colors that fold back like a mirror.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) goes between -1 and 1 over time.
  let sinVal = sin(t);

  // abs() folds the negative values to positive.
  // Now value goes between 0 and 1, creating a mirror effect.
  let value = abs(sinVal);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let navy = [0.2, 0.2, 0.8, 1];
  let coral = [0.8, 0.2, 0.2, 1];

  finalColor.begin();

  // mix() blends between navy (when value = 0) and coral (when value = 1).
  finalColor.set(mix(navy, coral, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
