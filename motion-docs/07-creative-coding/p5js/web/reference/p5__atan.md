---
source: https://p5js.org/reference/p5/atan/
title: "atan"
fetched: 2026-10-28
---

Calculates the arc tangent of a number.

`atan()` is the inverse of [tan()](https://p5js.org/reference/p5/tan/). It expects input values in the range of -Infinity to Infinity. By default, `atan()` returns values in the range -π ÷ 2 (about -1.57) to π ÷ 2 (about 1.57). If the [angleMode()](https://p5js.org/reference/p5/angleMode/) is `DEGREES` then values are returned in the range -90 to 90.

`atan()` can also be used in shaders with p5.strands. The following example uses `atan()` to create a soft color transition on a shape.

## Examples

## Syntax

`atan(value)`

## Parameters

value

Number: value whose arc tangent is to be returned.

## Returns

Number: arc tangent of the given value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L388) and open a pull request!

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

  // Calculate tan() and atan() values.
  let a = PI / 3;
  let t = tan(a);
  let at = atan(t);

  // Display the values.
  text(`${round(a, 3)}`, 35, 25);
  text(`${round(t, 3)}`, 35, 50);
  text(`${round(at, 3)}`, 35, 75);

  describe('The numbers 1.047, 1.732, and 1.047 written on separate rows.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Calculate tan() and atan() values.
  let a = PI + PI / 3;
  let t = tan(a);
  let at = atan(t);

  // Display the values.
  text(`${round(a, 3)}`, 35, 25);
  text(`${round(t, 3)}`, 35, 50);
  text(`${round(at, 3)}`, 35, 75);

  describe('The numbers 4.189, 1.732, and 1.047 written on separate rows.');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that softly shifts between pink and lime.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  // sin() oscillates the input between -5 and 5, so atan() gets both positive and negative values.
  let t = sin(millis() * 0.001) * 5;

  // atan(t) returns values between -PI/2 and PI/2.
  // Dividing by PI/2 normalizes to -1 to 1, then adding 1 and multiplying by 0.5
  // remaps to the 0 to 1 range.
  // atan() compresses the wide range of t into a smooth S-curve (soft clipping).
  let value = (atan(t) / (PI / 2) + 1) * 0.5;

  // Each color is [R, G, B, A] with values from 0 to 1.
  let pink = [1, 0, 0.5, 1];
  let lime = [0.5, 1, 0, 1];

  finalColor.begin();

  // mix() blends between pink (when value = 0) and lime (when value = 1).
  // atan() creates a soft, eased transition instead of a linear blend.
  finalColor.set(mix(pink, lime, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
