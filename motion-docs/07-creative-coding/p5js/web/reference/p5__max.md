---
source: https://p5js.org/reference/p5/max/
title: "max"
fetched: 2026-10-28
---

Returns the largest value in a sequence of numbers.

The version of `max()` with one parameter interprets it as an array of numbers and returns the largest number.

The version of `max()` with two or more parameters interprets them as individual numbers and returns the largest number.

`max()` can also be used in shaders with p5.strands. The following example uses `max()` to clamp values in a shader.

## Examples

## Syntax

`max(n0, n1, rest1, rest2, ..., restn)``max(nums)`

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

Number: maximum number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L981) and open a pull request!

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

  // Calculate the maximum of 10, 5, and 20.
  let m = max(10, 5, 20);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the max.
  text(m, 50, 50);

  describe('The number 20 written in the middle of a gray square.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create an array of numbers.
  let numbers = [10, 5, 20];

  // Calculate the maximum of the array.
  let m = max(numbers);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the max.
  text(m, 50, 50);

  describe('The number 20 written in the middle of a gray square.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that shifts from rose to steelBlue and stops.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // 1 - t * 0.2 decreases steadily over time.
  // max(..., 0) ensures the value never goes below 0.
  let value = max(1 - t * 0.2, 0);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let steelBlue = [0, 0.3, 0.8, 1];
  let rose = [1, 0.3, 0.8, 1];

  finalColor.begin();

  // mix() blends between steelBlue (when value = 0) and rose (when value = 1).
  // max() clamps the blend so the color stops changing once it reaches steelBlue.
  finalColor.set(mix(steelBlue, rose, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
