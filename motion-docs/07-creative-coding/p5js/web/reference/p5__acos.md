---
source: https://p5js.org/reference/p5/acos/
title: "acos"
fetched: 2026-10-28
---

Calculates the arc cosine of a number.

`acos()` is the inverse of [cos()](https://p5js.org/reference/p5/cos/). It expects arguments in the range -1 to 1. By default, `acos()` returns values in the range 0 to π (about 3.14). If the [angleMode()](https://p5js.org/reference/p5/angleMode/) is `DEGREES`, then values are returned in the range 0 to 180.

`acos()` can also be used in shaders with p5.strands. The following example uses `acos()` to create a pulsing color transition on a shape.

## Examples

## Syntax

`acos(value)`

## Parameters

value

Number: value whose arc cosine is to be returned.

## Returns

Number: arc cosine of the given value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L189) and open a pull request!

---

## Related References

* [acos

  Calculates the arc cosine of a number.](https://p5js.org/reference/p5/acos/)
* [angleMode

  Changes the unit system used to measure angles.](https://p5js.org/reference/p5/angleMode/)
* [asin

  Calculates the arc sine of a number.](https://p5js.org/reference/p5/asin/)
* [atan

  Calculates the arc tangent of a number.](https://p5js.org/reference/p5/atan/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Calculate cos() and acos() values.
  let a = PI;
  let c = cos(a);
  let ac = acos(c);

  // Display the values.
  text(`${round(a, 3)}`, 35, 25);
  text(`${round(c, 3)}`, 35, 50);
  text(`${round(ac, 3)}`, 35, 75);

  describe('The numbers 3.142, -1, and 3.142 written on separate rows.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Calculate cos() and acos() values.
  let a = PI + QUARTER_PI;
  let c = cos(a);
  let ac = acos(c);

  // Display the values.
  text(`${round(a, 3)}`, 35, 25);
  text(`${round(c, 3)}`, 35, 50);
  text(`${round(ac, 3)}`, 35, 75);

  describe('The numbers 3.927, -0.707, and 2.356 written on separate rows.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that pulses between orange and teal.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // acos(cos(t)) creates a triangle wave that goes from 0 to PI and back.
  // Dividing by PI normalizes the result to the 0 to 1 range.
  let value = acos(cos(t)) / PI;

  // Each color is [R, G, B, A] with values from 0 to 1.
  let orange = [1, 0.5, 0, 1];
  let teal = [0, 0.8, 0.8, 1];

  finalColor.begin();

  // mix() blends between orange (when value = 0) and teal (when value = 1).
  // acos() creates a pulsing effect by turning smooth oscillation into a triangle wave.
  finalColor.set(mix(orange, teal, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
