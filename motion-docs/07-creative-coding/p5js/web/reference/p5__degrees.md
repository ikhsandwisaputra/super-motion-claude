---
source: https://p5js.org/reference/p5/degrees/
title: "degrees"
fetched: 2026-10-28
---

Converts an angle measured in radians to its value in degrees.

Degrees and radians are both units for measuring angles. There are 360˚ in one full rotation. A full rotation is 2 × π (about 6.28) radians.

The same angle can be expressed in with either unit. For example, 90° is a quarter of a full rotation. The same angle is 2 × π ÷ 4 (about 1.57) radians.

`degrees()` can also be used in shaders with p5.strands. The following example uses `degrees()` to convert a radian value to degrees inside a shader.

## Examples

## Syntax

`degrees(radians)`

## Parameters

radians

Number: radians value to convert to degrees.

## Returns

Number: converted angle.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L842) and open a pull request!

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

  // Calculate the angle conversion.
  let rad = QUARTER_PI;
  let deg = degrees(rad);

  // Display the conversion.
  text(`${round(rad, 2)} rad = ${deg}˚`, 10, 50);

  describe('The text "0.79 rad = 45˚".');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that cycles through warm colors.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // degrees() converts the radian value t to degrees.
  // (deg % 360) wraps the degrees into a 0-360 range.
  // Dividing by 360 normalizes to the 0 to 1 range.
  let deg = degrees(t);
  let value = (deg % 360) / 360;

  // Each color is [R, G, B, A] with values from 0 to 1.
  let red = [1, 0, 0, 1];
  let yellow = [1, 1, 0, 1];

  finalColor.begin();

  // mix() blends between red (when value = 0) and yellow (when value = 1).
  // degrees() creates a cycling sawtooth pattern as time increases.
  finalColor.set(mix(red, yellow, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
