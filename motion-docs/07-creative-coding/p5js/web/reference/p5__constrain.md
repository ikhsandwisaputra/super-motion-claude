---
source: https://p5js.org/reference/p5/constrain/
title: "constrain"
fetched: 2026-10-28
---

Constrains a number between a minimum and maximum value.

## Examples

## Syntax

`constrain(n, low, high)`

## Parameters

n

Number: number to constrain.

low

Number: minimum limit.

high

Number: maximum limit.

## Returns

Number: constrained number.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L225) and open a pull request!

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

  describe('A black dot drawn on a gray square follows the mouse from left to right. Its movement is constrained to the middle third of the square.');
}

function draw() {
  background(200);

  let x = constrain(mouseX, 33, 67);
  let y = 50;

  strokeWeight(5);
  point(x, y);
}
```

```js
function setup() {
  createCanvas(100, 100);

  describe('Two vertical lines. Two circles move horizontally with the mouse. One circle stops at the vertical lines.');
}

function draw() {
  background(200);

  // Set boundaries and draw them.
  let leftWall = 25;
  let rightWall = 75;
  line(leftWall, 0, leftWall, 100);
  line(rightWall, 0, rightWall, 100);

  // Draw a circle that follows the mouse freely.
  fill(255);
  circle(mouseX, 33, 9);

  // Draw a circle that's constrained.
  let xc = constrain(mouseX, leftWall, rightWall);
  fill(0);
  circle(xc, 67, 9);
}
```
