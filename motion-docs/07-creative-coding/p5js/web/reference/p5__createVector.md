---
source: https://p5js.org/reference/p5/createVector/
title: "createVector"
fetched: 2026-10-28
---

Creates a new [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object.

A vector can be thought of in different ways. In one view, a vector is like an arrow pointing in space. Vectors have both magnitude (length) and direction. This view is helpful for programming motion.

A vector's components determine its magnitude and direction. For example, calling `createVector(3, 4)` creates a new [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object with an x-component of 3 and a y-component of 4. From the origin, this vector's tip is 3 units to the right and 4 units down.

You can also pass N dimensions to the `createVector` function. For example, calling `createVector(1, 2, 3, 4)` creates a vector with four components. This allows for flexibility in representing vectors in higher-dimensional spaces.

Calling `createVector()` with no arguments is deprecated and will emit a friendly warning. Use `createVector(0)`, `createVector(0, 0)`, or `createVector(0, 0, 0)` instead.

[p5.Vector](https://p5js.org/reference/p5/p5.Vector) objects are often used to program motion because they simplify the math. For example, a moving ball has a position and a velocity. Position describes where the ball is in space. The ball's position vector extends from the origin to the ball's center. Velocity describes the ball's speed and the direction it's moving. If the ball is moving straight up, its velocity vector points straight up. Adding the ball's velocity vector to its position vector moves it, as in `pos.add(vel)`. Vector math relies on methods inside the [p5.Vector](https://p5js.org/reference/p5/p5.Vector) class.

## Examples

## Syntax

`createVector(x1, x2, ..., xn)`

## Parameters

x1, ..., xn

Number: List of numbers representing each component of the vector.

## Returns

p5.Vector: new [p5.Vector](https://p5js.org/reference/p5/p5.Vector/) object.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/math.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/math.js#L94) and open a pull request!

---

## Related References

* [textToContours

  Returns an array of arrays of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToContours/)
* [textToModel

  Converts text into a 3D model that can be rendered in WebGL mode.](https://p5js.org/reference/p5.Font/textToModel/)
* [textToPaths

  Returns a flat array of path commands that describe the outlines of a string of text.](https://p5js.org/reference/p5.Font/textToPaths/)
* [textToPoints

  Returns an array of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToPoints/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create p5.Vector objects.
  let p1 = createVector(25, 25);
  let p2 = createVector(50, 50);
  let p3 = createVector(75, 75);

  // Draw the dots.
  strokeWeight(5);
  point(p1);
  point(p2);
  point(p3);

  describe('Three black dots form a diagonal line from top left to bottom right.');
}
```

```js
let pos;
let vel;

function setup() {
  createCanvas(100, 100);

  // Create p5.Vector objects.
  pos = createVector(50, 100);
  vel = createVector(0, -1);

  describe('A black dot moves from bottom to top on a gray square. The dot reappears at the bottom when it reaches the top.');
}

function draw() {
  background(200);

  // Add velocity to position.
  pos.add(vel);

  // If the dot reaches the top of the canvas,
  // restart from the bottom.
  if (pos.y < 0) {
    pos.y = 100;
  }

  // Draw the dot.
  strokeWeight(5);
  point(pos);
}
```
