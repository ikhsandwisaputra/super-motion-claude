---
source: https://p5js.org/reference/p5/sq/
title: "sq"
fetched: 2026-10-28
---

Calculates the square of a number.

Squaring a number means multiplying the number by itself. For example, `sq(3)` evaluates 3 × 3 which is 9. `sq(-3)` evaluates -3 × -3 which is also 9. Multiplying two negative numbers produces a positive number. The value returned by `sq()` is always positive.

## Examples

## Syntax

`sq(n)`

## Parameters

n

Number: number to square.

## Returns

Number: squared number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L1397) and open a pull request!

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

  // Top-left.
  let d = sq(3);
  circle(33, 33, d);

  // Bottom-right.
  d = sq(6);
  circle(67, 67, d);

  describe('Two white circles. The circle at the top-left is small. The circle at the bottom-right is four times larger.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  describe('A series of black dots that get higher quickly from left to right.');
}

function draw() {
  // Invert the y-axis.
  scale(1, -1);
  translate(0, -100);

  // Calculate the coordinates.
  let x = frameCount;
  let y = 0.01 * sq(x);

  // Draw the point.
  point(x, y);
}
```
