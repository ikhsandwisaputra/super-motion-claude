---
source: https://p5js.org/reference/p5/scale/
title: "scale"
fetched: 2026-10-28
---

Scales the coordinate system.

By default, shapes are drawn at their original scale. A rectangle that's 50 pixels wide appears to take up half the width of a 100 pixel-wide canvas. The `scale()` function can shrink or stretch the coordinate system so that shapes appear at different sizes. There are two ways to call `scale()` with parameters that set the scale factor(s).

The first way to call `scale()` uses numbers to set the amount of scaling. The first parameter, `s`, sets the amount to scale each axis. For example, calling `scale(2)` stretches the x-, y-, and z-axes by a factor of 2. The next two parameters, `y` and `z`, are optional. They set the amount to scale the y- and z-axes. For example, calling `scale(2, 0.5, 1)` stretches the x-axis by a factor of 2, shrinks the y-axis by a factor of 0.5, and leaves the z-axis unchanged.

The second way to call `scale()` uses a [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object to set the scale factors. For example, calling `scale(myVector)` uses the x-, y-, and z-components of `myVector` to set the amount of scaling along the x-, y-, and z-axes. Doing so is the same as calling `scale(myVector.x, myVector.y, myVector.z)`.

By default, transformations accumulate. For example, calling `scale(1)` twice has the same effect as calling `scale(2)` once. The [push()](https://p5js.org/reference/p5/push/) and [pop()](https://p5js.org/reference/p5/pop/) functions can be used to isolate transformations within distinct drawing groups.

Note: Transformations are reset at the beginning of the draw loop. Calling `scale(2)` inside the [draw()](https://p5js.org/reference/p5/draw/) function won't cause shapes to grow continuously.

## Examples

## Syntax

`scale(s, [y], [z])``scale(scales)`

## Parameters

s

Number|p5.Vector|Number[]: amount to scale along the positive x-axis.

y

Number: amount to scale along the positive y-axis. Defaults to `s`.

z

Number: amount to scale along the positive z-axis. Defaults to `y`.

scales

p5.Vector|Number[]: vector whose components should be used to scale.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/transform.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/transform.js#L943) and open a pull request!

---

## Related References

* [applyMatrix

  Applies a transformation matrix to the coordinate system.](https://p5js.org/reference/p5/applyMatrix/)
* [pop

  Ends a drawing group that contains its own styles and transformations.](https://p5js.org/reference/p5/pop/)
* [push

  Begins a drawing group that contains its own styles and transformations.](https://p5js.org/reference/p5/push/)
* [resetMatrix

  Clears all transformations applied to the coordinate system.](https://p5js.org/reference/p5/resetMatrix/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  describe(
    'Two white squares on a gray background. The larger square appears at the top-center. The smaller square appears at the top-left.'
  );
}

function draw() {
  background(200);

  // Draw a square at (30, 20).
  square(30, 20, 40);

  // Scale the coordinate system by a factor of 0.5.
  scale(0.5);

  // Draw a square at (30, 20).
  // It appears at (15, 10) after scaling.
  square(30, 20, 40);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A rectangle and a square drawn in white on a gray background.');
}

function draw() {
  background(200);

  // Draw a square at (30, 20).
  square(30, 20, 40);

  // Scale the coordinate system by factors of
  // 0.5 along the x-axis and
  // 1.3 along the y-axis.
  scale(0.5, 1.3);

  // Draw a square at (30, 20).
  // It appears as a rectangle at (15, 26) after scaling.
  square(30, 20, 40);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A rectangle and a square drawn in white on a gray background.');
}

function draw() {
  background(200);

  // Draw a square at (30, 20).
  square(30, 20, 40);

  // Create a p5.Vector object.
  let v = createVector(0.5, 1.3);

  // Scale the coordinate system by factors of
  // 0.5 along the x-axis and
  // 1.3 along the y-axis.
  scale(v);

  // Draw a square at (30, 20).
  // It appears as a rectangle at (15, 26) after scaling.
  square(30, 20, 40);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe(
    'A red box and a blue box drawn on a gray background. The red box appears embedded in the blue box.'
  );
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Style the spheres.
  noStroke();

  // Draw the red sphere.
  fill('red');
  box();

  // Scale the coordinate system by factors of
  // 0.5 along the x-axis and
  // 1.3 along the y-axis and
  // 2 along the z-axis.
  scale(0.5, 1.3, 2);

  // Draw the blue sphere.
  fill('blue');
  box();
}
```
