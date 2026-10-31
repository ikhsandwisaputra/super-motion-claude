---
source: https://p5js.org/reference/p5/fract/
title: "fract"
fetched: 2026-10-28
---

Calculates the fractional part of a number.

A number's fractional part includes its decimal values. For example, `fract(12.34)` returns 0.34.

`fract()` can also be used in shaders with p5.strands. The following example uses `fract()` to create repeating patterns in a shader.

## Examples

## Syntax

`fract(n)`

## Parameters

n

Number: number whose fractional part will be found.

## Returns

Number: fractional part of n.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L1580) and open a pull request!

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

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Original number.
  let n = 56.78;
  text(n, 50, 33);

  // Fractional part.
  let f = fract(n);
  text(f, 50, 67);

  describe('The number 56.78 written above the number 0.78.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with a repeating gradient pattern.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // Multiply by 0.5 to slow the animation to half speed.
  // fract(t * 0.5) extracts only the decimal part of the number.
  // This creates a smooth sawtooth wave that repeats every 2 seconds.
  let value = fract(t * 0.5);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let cyan = [0, 0.5, 1, 1];
  let orange = [1, 0.5, 0, 1];

  finalColor.begin();

  // mix() blends between cyan (when value = 0) and orange (when value = 1).
  // Because fract() resets to 0 each cycle, the color loops smoothly.
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
