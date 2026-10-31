---
source: https://p5js.org/reference/p5/tan/
title: "tan"
fetched: 2026-10-28
---

Calculates the tangent of an angle.

`tan()` is useful for many geometric tasks in creative coding. The values returned range from -Infinity to Infinity and repeat periodically as the input angle increases. `tan()` calculates the tan of an angle, using radians by default, or according to if [angleMode()](https://p5js.org/reference/p5/angleMode/) setting (RADIANS or DEGREES).

`tan()` can also be used in shaders with p5.strands. The following example uses `tan()` to create rapid color transitions on a shape.

## Examples

## Syntax

`tan(angle)`

## Parameters

angle

Number: the angle, in radians by default, or according to if [angleMode()](https://p5js.org/reference/p5/angleMode/) setting (RADIANS or DEGREES).

## Returns

Number: tangent of the angle.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L764) and open a pull request!

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

  describe('A series of identical curves drawn with black dots. Each curve starts from the top of the canvas, continues down at a slight angle, flattens out at the middle of the canvas, then continues to the bottom.');
}

function draw() {
  // Calculate the coordinates.
  let x = frameCount;
  let y = 5 * tan(x * 0.1) + 50;

  // Draw the point.
  point(x, y);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere with rapidly shifting colors.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.0005 to slow it down.
  let t = millis() * 0.0005;

  // tan(t) can grow to very large values (even infinity) at certain angles.
  // 0.5 + 0.5 * tan(t) shifts the range but can still go way past 0 or 1.
  // min(max(..., 0), 1) clamps the result to the 0 to 1 range.
  let value = min(max(0.5 + 0.5 * tan(t), 0), 1);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let orange = [1, 0.5, 0, 1];
  let blue = [0, 0.5, 1, 1];

  finalColor.begin();

  // mix() blends between orange (when value = 0) and blue (when value = 1).
  // tan() creates rapid, dramatic color shifts as it spikes and resets.
  finalColor.set(mix(orange, blue, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
