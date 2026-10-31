---
source: https://p5js.org/reference/p5/rotate/
title: "rotate"
fetched: 2026-10-28
---

Rotates the coordinate system.

By default, the positive x-axis points to the right and the positive y-axis points downward. The `rotate()` function changes this orientation by rotating the coordinate system about the origin. Everything drawn after `rotate()` is called will appear to be rotated.

The first parameter, `angle`, is the amount to rotate. For example, calling `rotate(1)` rotates the coordinate system clockwise 1 radian which is nearly 57˚. `rotate()` interprets angle values using the current [angleMode()](https://p5js.org/reference/p5/angleMode/).

The second parameter, `axis`, is optional. It's used to orient 3D rotations in WebGL mode. If a [p5.Vector](https://p5js.org/reference/p5/p5.Vector) is passed, as in `rotate(QUARTER_PI, myVector)`, then the coordinate system will rotate `QUARTER_PI` radians about `myVector`. If an array of vector components is passed, as in `rotate(QUARTER_PI, [1, 0, 0])`, then the coordinate system will rotate `QUARTER_PI` radians about a vector with the components `[1, 0, 0]`.

By default, transformations accumulate. For example, calling `rotate(1)` twice has the same effect as calling `rotate(2)` once. The [push()](https://p5js.org/reference/p5/push/) and [pop()](https://p5js.org/reference/p5/pop/) functions can be used to isolate transformations within distinct drawing groups.

Note: Transformations are reset at the beginning of the draw loop. Calling `rotate(1)` inside the [draw()](https://p5js.org/reference/p5/draw/) function won't cause shapes to spin.

## Examples

## Syntax

`rotate(angle, [axis])`

## Parameters

angle

Number: angle of rotation in the current [angleMode()](https://p5js.org/reference/p5/rotate/#/p5/angleMode).

axis

p5.Vector|Number[]: axis to rotate about in 3D.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/transform.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/transform.js#L419) and open a pull request!

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
    "A white rectangle on a gray background. The rectangle's long axis runs from top-left to bottom-right."
  );
}

function draw() {
  background(200);

  // Rotate the coordinate system 1/8 turn.
  rotate(QUARTER_PI);

  // Draw a rectangle at coordinates (50, 0).
  rect(50, 0, 40, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe(
    "A white rectangle on a gray background. The rectangle's long axis runs from top-left to bottom-right."
  );
}

function draw() {
  background(200);

  // Rotate the coordinate system 1/16 turn.
  rotate(QUARTER_PI / 2);

  // Rotate the coordinate system another 1/16 turn.
  rotate(QUARTER_PI / 2);

  // Draw a rectangle at coordinates (50, 0).
  rect(50, 0, 40, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Use degrees.
  angleMode(DEGREES);

  describe(
    "A white rectangle on a gray background. The rectangle's long axis runs from top-left to bottom-right."
  );
}

function draw() {
  background(200);

  // Rotate the coordinate system 1/8 turn.
  rotate(45);

  // Draw a rectangle at coordinates (50, 0).
  rect(50, 0, 40, 20);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe(
    'A white rectangle on a gray background. The rectangle rotates slowly about the top-left corner. It disappears and reappears periodically.'
  );
}

function draw() {
  background(200);

  // Rotate the coordinate system a little more each frame.
  let angle = frameCount * 0.01;
  rotate(angle);

  // Draw a rectangle at coordinates (50, 0).
  rect(50, 0, 40, 20);
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe("A cube on a gray background. The cube's front face points to the top-right.");
}

function draw() {
  background(200);

  // Rotate the coordinate system 1/8 turn about
  // the axis [1, 1, 0].
  let axis = createVector(1, 1, 0);
  rotate(QUARTER_PI, axis);

  // Draw a box.
  box();
}
```

```js
function setup() {
  createCanvas(100, 100, WEBGL);

  describe("A cube on a gray background. The cube's front face points to the top-right.");
}

function draw() {
  background(200);

  // Rotate the coordinate system 1/8 turn about
  // the axis [1, 1, 0].
  let axis = [1, 1, 0];
  rotate(QUARTER_PI, axis);

  // Draw a box.
  box();
}
```
