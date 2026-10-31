---
source: https://p5js.org/reference/p5/min/
title: "min"
fetched: 2026-10-28
---

Returns the smallest value in a sequence of numbers.

The version of `min()` with one parameter interprets it as an array of numbers and returns the smallest number.

The version of `min()` with two or more parameters interprets them as individual numbers and returns the smallest number.

`min()` can also be used in shaders with p5.strands. The following example uses `min()` to clamp values in a shader.

## Examples

## Syntax

`min(n0, n1, rest1, rest2, ..., restn)``min(nums)`

## Parameters

n0

Number: first number to compare.

n1

Number: second number to compare.

rest1, ..., restn

Number: additional numbers to compare.

nums

Number[]: numbers to compare.

## Returns

Number: minimum number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L1101) and open a pull request!

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

  // Calculate the minimum of 10, 5, and 20.
  let m = min(10, 5, 20);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the min.
  text(m, 50, 50);

  describe('The number 5 written in the middle of a gray square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create an array of numbers.
  let numbers = [10, 5, 20];

  // Calculate the minimum of the array.
  let m = min(numbers);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the min.
  text(m, 50, 50);

  describe('The number 5 written in the middle of a gray square.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that shifts from red to green and stops.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // t * 0.2 grows steadily over time.
  // min(..., 1) caps the value at 1 so it doesn't go past the target color.
  let value = min(t * 0.2, 1);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let deepRed = [0.8, 0, 0.2, 1];
  let yellowGreen = [0.8, 1, 0.2, 1];

  finalColor.begin();

  // mix() blends between deepRed (when value = 0) and yellowGreen (when value = 1).
  // min() clamps the blend so the color stops changing once it reaches yellowGreen.
  finalColor.set(mix(deepRed, yellowGreen, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
