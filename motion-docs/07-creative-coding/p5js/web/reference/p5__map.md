---
source: https://p5js.org/reference/p5/map/
title: "map"
fetched: 2026-10-28
---

Re-maps a number from one range to another.

For example, calling `map(2, 0, 10, 0, 100)` returns 20. The first three arguments set the original value to 2 and the original range from 0 to 10. The last two arguments set the target range from 0 to 100. 20's position in the target range [0, 100] is proportional to 2's position in the original range [0, 10].

The sixth parameter, `withinBounds`, is optional. By default, `map()` can return values outside of the target range. For example, `map(11, 0, 10, 0, 100)` returns 110. Passing `true` as the sixth parameter constrains the remapped value to the target range. For example, `map(11, 0, 10, 0, 100, true)` returns 100.

`map()` can also be used in shaders with p5.strands. The following example uses `map()` to remap time values to color in a shader.

## Examples

## Syntax

`map(value, start1, stop1, start2, stop2, [withinBounds])`

## Parameters

value

Number: the value to be remapped.

start1

Number: lower bound of the value's current range.

stop1

Number: upper bound of the value's current range.

start2

Number: lower bound of the value's target range.

stop2

Number: upper bound of the value's target range.

withinBounds

Boolean: constrain the value to the newly mapped range.

## Returns

Number: remapped number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L864) and open a pull request!

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

  describe('Two horizontal lines. The top line grows horizontally as the mouse moves to the right. The bottom line also grows horizontally but is scaled to stay on the left half of the canvas.');
}

function draw() {
  background(200);

  // Draw the top line.
  line(0, 25, mouseX, 25);

  // Remap mouseX from [0, 100] to [0, 50].
  let x = map(mouseX, 0, 100, 0, 50);

  // Draw the bottom line.
  line(0, 75, 0, x);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A circle changes color from black to white as the mouse moves from left to right.');
}

function draw() {
  background(200);

  // Remap mouseX from [0, 100] to [0, 255]
  let c = map(mouseX, 0, 100, 0, 255);

  // Style the circle.
  fill(c);

  // Draw the circle.
  circle(50, 50, 20);
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that shifts between cyan and orange over time.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) goes between -1 and 1 over time.
  let sinVal = sin(t);

  // map() remaps this from the range [-1, 1] to the range [0, 1].
  let value = map(sinVal, -1, 1, 0, 1);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let cyan = [0, 0.5, 1, 1];
  let orange = [1, 0.5, 0, 1];

  finalColor.begin();

  // mix() blends between cyan (when value = 0) and orange (when value = 1).
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
