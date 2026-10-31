---
source: https://p5js.org/reference/p5/lerp/
title: "lerp"
fetched: 2026-10-28
---

Calculates a number between two numbers at a specific increment.

The `amt` parameter is the amount to interpolate between the two numbers. 0.0 is equal to the first number, 0.1 is very near the first number, 0.5 is half-way in between, and 1.0 is equal to the second number. The `lerp()` function is convenient for creating motion along a straight path and for drawing dotted lines.

If the value of `amt` is less than 0 or more than 1, `lerp()` will return a number outside of the original interval. For example, calling `lerp(0, 10, 1.5)` will return 15.

`lerp()` can also be used in shaders with p5.strands, where it maps to the [mix()](https://p5js.org/reference/p5/mix/) function in GLSL. The following example uses `lerp()` to blend colors on a shape over time.

## Examples

## Syntax

`lerp(start, stop, amt)`

## Parameters

start

Number: first value.

stop

Number: second value.

amt

Number: number.

## Returns

Number: lerped value.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L607) and open a pull request!

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

  // Declare variables for coordinates.
  let a = 20;
  let b = 80;
  let c = lerp(a, b, 0.2);
  let d = lerp(a, b, 0.5);
  let e = lerp(a, b, 0.8);

  strokeWeight(5);

  // Draw the original points in black.
  stroke(0);
  point(a, 50);
  point(b, 50);

  // Draw the lerped points in gray.
  stroke(100);
  point(c, 50);
  point(d, 50);
  point(e, 50);

  describe('Five points in a horizontal line. The outer points are black and the inner points are gray.');
}
```

```js
let x = 50;
let y = 50;
let targetX = 50;
let targetY = 50;

function setup() {
  createCanvas(100, 100);

  background(200);

  describe('A white circle at the center of a gray canvas. The circle moves to where the user clicks, then moves smoothly back to the center.');
}

function draw() {
  background(220);

  // Move x and y toward the target.
  x = lerp(x, targetX, 0.05);
  y = lerp(y, targetY, 0.05);

  // Draw the circle.
  circle(x, y, 20);
}

// Set x and y when the user clicks the mouse.
function mouseClicked() {
  x = mouseX;
  y = mouseY;
}
```

```js
let myShader;

function setup() {
  createCanvas(100, 100, WEBGL);
  myShader = buildColorShader(shaderCallback);
  describe('A sphere that blends between teal and coral.');
}

function shaderCallback() {
  // shaderCallback runs on the GPU. millis() gives ms since start; multiply by 0.001 for seconds.
  let t = millis() * 0.001;

  // sin(t) goes between -1 and 1 over time.
  // 0.5 + 0.5 * sin(t) remaps this to the 0 to 1 range.
  let value = 0.5 + 0.5 * sin(t);

  // Each color is [R, G, B, A] with values from 0 to 1.
  let teal = [0, 0.8, 0.8, 1];
  let coral = [1, 0.5, 0.3, 1];

  finalColor.begin();

  // lerp() blends teal (when value = 0) and coral (when value = 1).
  finalColor.set(lerp(teal, coral, value));

  finalColor.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  sphere(30);
}
```
