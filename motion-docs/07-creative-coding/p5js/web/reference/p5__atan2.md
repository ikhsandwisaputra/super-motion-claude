---
source: https://p5js.org/reference/p5/atan2/
title: "atan2"
fetched: 2026-10-28
---

Calculates the angle formed by a point, the origin, and the positive x-axis.

`atan2()` is most often used for orienting geometry to the mouse's position, as in `atan2(mouseY, mouseX)`. The first parameter is the point's y-coordinate and the second parameter is its x-coordinate.

By default, `atan2()` returns values in the range -π (about -3.14) to π (3.14). If the [angleMode()](https://p5js.org/reference/p5/angleMode/) is `DEGREES`, then values are returned in the range -180 to 180.

## Examples

## Syntax

`atan2(y, x)`

## Parameters

y

Number: y-coordinate of the point.

x

Number: x-coordinate of the point.

## Returns

Number: arc tangent of the given point.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/trigonometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/trigonometry.js#L458) and open a pull request!

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

  describe('A rectangle at the top-left of the canvas rotates with mouse movements.');
}

function draw() {
  background(200);

  // Calculate the angle between the mouse
  // and the origin.
  let a = atan2(mouseY, mouseX);

  // Rotate.
  rotate(a);

  // Draw the shape.
  rect(0, 0, 60, 10);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('A rectangle at the center of the canvas rotates with mouse movements.');
}

function draw() {
  background(200);

  // Translate the origin to the center.
  translate(50, 50);

  // Get the mouse's coordinates relative to the origin.
  let x = mouseX - 50;
  let y = mouseY - 50;

  // Calculate the angle between the mouse and the origin.
  let a = atan2(y, x);

  // Rotate.
  rotate(a);

  // Draw the shape.
  rect(-30, -5, 60, 10);
}
```
