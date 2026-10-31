---
source: https://p5js.org/reference/p5/dist/
title: "dist"
fetched: 2026-10-28
---

Calculates the distance between two points.

The version of `dist()` with four parameters calculates distance in two dimensions.

The version of `dist()` with six parameters calculates distance in three dimensions.

Use [p5.Vector.dist()](https://p5js.org/reference/p5.Vector/dist/) to calculate the distance between two [p5.Vector](https://p5js.org/reference/p5/p5.Vector) objects.

## Examples

## Syntax

`dist(x1, y1, x2, y2)``dist(x1, y1, z1, x2, y2, z2)`

## Parameters

x1

Number: x-coordinate of the first point.

y1

Number: y-coordinate of the first point.

x2

Number: x-coordinate of the second point.

y2

Number: y-coordinate of the second point.

z1

Number: z-coordinate of the first point.

z2

Number: z-coordinate of the second point.

## Returns

Number: distance between the two points.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L290) and open a pull request!

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

  // Set the coordinates.
  let x1 = 10;
  let y1 = 50;
  let x2 = 90;
  let y2 = 50;

  // Draw the points and a line connecting them.
  line(x1, y1, x2, y2);
  strokeWeight(5);
  point(x1, y1);
  point(x2, y2);

  // Calculate the distance.
  let d = dist(x1, y1, x2, y2);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the distance.
  text(d, 43, 40);

  describe('Two dots connected by a horizontal line. The number 80 is written above the center of the line.');
}
```
