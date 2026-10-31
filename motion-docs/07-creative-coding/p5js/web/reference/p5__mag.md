---
source: https://p5js.org/reference/p5/mag/
title: "mag"
fetched: 2026-10-28
---

Calculates the magnitude, or length, of a vector.

A vector can be thought of in different ways. In one view, a vector is a point in space. The vector's components, `x` and `y`, are the point's coordinates `(x, y)`. A vector's magnitude is the distance from the origin `(0, 0)` to `(x, y)`. `mag(x, y)` is a shortcut for calling `dist(0, 0, x, y)`.

A vector can also be thought of as an arrow pointing in space. This view is helpful for programming motion. See [p5.Vector](https://p5js.org/reference/p5/p5.Vector) for more details.

Use [p5.Vector.mag()](https://p5js.org/reference/p5.Vector/mag/) to calculate the magnitude of a [p5.Vector](https://p5js.org/reference/p5/p5.Vector) object.

## Examples

## Syntax

`mag(x, y)`

## Parameters

x

Number: first component.

y

Number: second component.

## Returns

Number: magnitude of vector.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/math/calculation.js](https://github.com/processing/p5.js/blob/v2.3.3/src/math/calculation.js#L751) and open a pull request!

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

  // Set the vector's components.
  let x = 30;
  let y = 40;

  // Calculate the magnitude.
  let m = mag(x, y);

  // Style the text.
  textSize(16);

  // Display the vector and its magnitude.
  line(0, 0, x, y);
  text(m, x, y);

  describe('A diagonal line is drawn from the top left of the canvas. The number 50 is written at the end of the line.');
}
```
