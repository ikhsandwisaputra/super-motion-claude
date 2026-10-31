---
source: https://p5js.org/reference/p5/rotateY/
title: "rotateY"
fetched: 2026-10-28
---

Rotates the coordinate system about the y-axis in WebGL mode.

The parameter, `angle`, is the amount to rotate. For example, calling `rotateY(1)` rotates the coordinate system about the y-axis by 1 radian. `rotateY()` interprets angle values using the current [angleMode()](https://p5js.org/reference/p5/angleMode/).

By default, transformations accumulate. For example, calling `rotateY(1)` twice has the same effect as calling `rotateY(2)` once. The [push()](https://p5js.org/reference/p5/push/) and [pop()](https://p5js.org/reference/p5/pop/) functions can be used to isolate transformations within distinct drawing groups.

Note: Transformations are reset at the beginning of the draw loop. Calling `rotateY(1)` inside the [draw()](https://p5js.org/reference/p5/draw/) function won't cause shapes to spin.

## Examples

## Syntax

`rotateY(angle)`

## Parameters

angle

Number: angle of rotation in the current [angleMode()](https://p5js.org/reference/p5/rotateY/#/p5/angleMode).

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/transform.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/transform.js#L662) and open a pull request!

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
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cube on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Rotate the coordinate system 1/8 turn.
  rotateY(QUARTER_PI);

  // Draw a box.
  box();
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cube on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Rotate the coordinate system 1/16 turn.
  rotateY(QUARTER_PI / 2);

  // Rotate the coordinate system 1/16 turn.
  rotateY(QUARTER_PI / 2);

  // Draw a box.
  box();
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  // Use degrees.
  angleMode(DEGREES);

  describe('A white cube on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Rotate the coordinate system 1/8 turn.
  rotateY(45);

  // Draw a box.
  box();
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white cube rotates slowly against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Rotate the coordinate system a little more each frame.
  let angle = frameCount * 0.01;
  rotateY(angle);

  // Draw a box.
  box();
}
```
