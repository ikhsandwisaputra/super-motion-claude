---
source: https://p5js.org/reference/p5/radians/
title: "radians"
fetched: 2026-10-28
---

Converts an angle measured in degrees to its value in radians.

Degrees and radians are both units for measuring angles. There are 360˚ in one full rotation. A full rotation is 2 × π (about 6.28) radians.

The same angle can be expressed in with either unit. For example, 90° is a quarter of a full rotation. The same angle is 2 × π ÷ 4 (about 1.57) radians.

`radians()` can also be used in shaders with p5.strands. The following example uses `radians()` to convert degrees to radians inside a shader.

## Examples

## Syntax

`radians(degrees)`

## Parameters

degrees

Number: degree value to convert to radians.

## Returns

Number: converted angle.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L920) and open a pull request!

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

  // Caclulate the angle conversion.
  let deg = 45;
  let rad = radians(deg);

  // Display the angle conversion.
  text(`${deg}˚ = ${round(rad, 3)} rad`, 10, 50);

  describe('The text "45˚ = 0.785 rad".');
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that fades between red and white.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start.
  // Multiply by 0.05 and mod 360 to cycle through 0-360 degrees over time.
  let deg = (millis() * 0.05) % 360;

  // radians() converts degrees to radians so sin() can use them.
  let rad = radians(deg);

  // sin(rad) oscillates between -1 and 1.
  // 0.5 + 0.5 * sin(rad) remaps this to the 0 to 1 range.
  let value = 0.5 + 0.5 * sin(rad);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let red = [1, 0, 0, 1];
  let white = [1, 1, 1, 1];

  finalColor.begin();

  // mix() blends between red (when value = 0) and white (when value = 1).
  // radians() converts the degree input so sin() can produce smooth oscillation.
  finalColor.set(mix(red, white, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
