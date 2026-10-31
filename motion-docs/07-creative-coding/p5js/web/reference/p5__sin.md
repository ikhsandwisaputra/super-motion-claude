---
source: https://p5js.org/reference/p5/sin/
title: "sin"
fetched: 2026-10-28
---

Calculates the sine of an angle.

`sin()` is useful for many geometric tasks in creative coding. The values returned oscillate between -1 and 1 as the input angle increases. `sin()` calculates the sine of an angle, using radians by default, or according to if [angleMode()](https://p5js.org/reference/p5/angleMode/) setting (RADIANS or DEGREES).

`sin()` can also be used in shaders with p5.strands. The following example uses `sin()` to oscillate the color of a shape over time.

## Examples

## Syntax

`sin(angle)`

## Parameters

angle

Number: the angle, in radians by default, or according to if [angleMode()](https://p5js.org/reference/p5/angleMode/) setting (RADIANS or DEGREES).

## Returns

Number: sine of the angle.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L686) and open a pull request!

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

  describe('A white ball on a string oscillates up and down.');
}

function draw() {
  background(200);

  // Calculate the coordinates.
  let x = 50;
  let y = 30 * sin(frameCount * 0.05) + 50;

  // Draw the oscillator.
  line(50, y, x, y);
  circle(x, y, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  describe('A series of black dots form a wave pattern.');
}

function draw() {
  // Calculate the coordinates.
  let x = frameCount;
  let y = 30 * sin(x * 0.1) + 50;

  // Draw the point.
  point(x, y);
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  describe('A series of black dots form an infinity symbol.');
}

function draw() {
  // Calculate the coordinates.
  let x = 30 * cos(frameCount * 0.1) + 50;
  let y = 10 * sin(frameCount * 0.2) + 50;

  // Draw the point.
  point(x, y);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that pulses between cyan and magenta.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) oscillates between -1 and 1.
  // 0.5 + 0.5 * sin(t) remaps this to the 0 to 1 range.
  let value = 0.5 + 0.5 * sin(t);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let cyan = [0, 1, 1, 1];
  let magenta = [1, 0, 1, 1];

  finalColor.begin();

  // mix() blends between cyan (when value = 0) and magenta (when value = 1).
  finalColor.set(mix(cyan, magenta, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
