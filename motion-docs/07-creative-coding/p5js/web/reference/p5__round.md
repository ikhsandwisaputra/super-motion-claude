---
source: https://p5js.org/reference/p5/round/
title: "round"
fetched: 2026-10-28
---

Calculates the integer closest to a number.

For example, `round(133.8)` returns the value 134.

The second parameter, `decimals`, is optional. It sets the number of decimal places to use when rounding. For example, `round(12.34, 1)` returns 12.3. `decimals` is 0 by default.

`round()` can also be used in shaders with p5.strands. The following example uses `round()` to quantize colors in a shader.

## Examples

## Syntax

`round(n, [decimals])`

## Parameters

n

Number: number to round.

decimals

Number: number of decimal places to round to, default is 0.

## Returns

Integer: rounded number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L1338) and open a pull request!

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

  // Round a number.
  let x = round(4.2);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the rounded number.
  text(x, 50, 50);

  describe('The number 4 written in middle of the canvas.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Round a number to 2 decimal places.
  let x = round(12.782383, 2);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the rounded number.
  text(x, 50, 50);

  describe('The number 12.78 written in middle of canvas.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with posterized quantized colors.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) goes between -1 and 1.
  // 0.5 + 0.5 * sin(t) remaps this to the 0 to 1 range.
  let sinVal = 0.5 + 0.5 * sin(t);

  // Multiply by 4 then round to get 5 distinct levels (0, 0.25, 0.5, 0.75, 1).
  // Divide by 4 to bring the result back to the 0 to 1 range.
  let value = round(sinVal * 4) / 4;

  // Each color is [R, G, B, A] with values from 0 to 1.
  let mutedBlue = [0.3, 0.4, 0.7, 1];
  let rose = [0.8, 0.3, 0.4, 1];

  finalColor.begin();

  // mix() blends between mutedBlue (when value = 0) and rose (when value = 1).
  // The round() creates stepped bands of color like a posterization effect.
  finalColor.set(mix(mutedBlue, rose, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
