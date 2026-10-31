---
source: https://p5js.org/reference/p5/shearY/
title: "shearY"
fetched: 2026-10-28
---

Shears the y-axis so that shapes appear skewed.

By default, the x- and y-axes are perpendicular. The `shearY()` function transforms the coordinate system so that y-coordinates are translated while x-coordinates are fixed.

The first parameter, `angle`, is the amount to shear. For example, calling `shearY(1)` transforms all y-coordinates using the formula `y = y + x * tan(angle)`. `shearY()` interprets angle values using the current [angleMode()](https://p5js.org/reference/p5/angleMode/).

By default, transformations accumulate. For example, calling `shearY(1)` twice has the same effect as calling `shearY(2)` once. The [push()](https://p5js.org/reference/p5/push/) and [pop()](https://p5js.org/reference/p5/pop/) functions can be used to isolate transformations within distinct drawing groups.

Note: Transformations are reset at the beginning of the draw loop. Calling `shearY(1)` inside the [draw()](https://p5js.org/reference/p5/draw/) function won't cause shapes to shear continuously.

## Examples

## Syntax

`shearY(angle)`

## Parameters

angle

Number: angle to shear by in the current [angleMode()](https://p5js.org/reference/p5/shearY/#/p5/angleMode).

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/transform.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/transform.js#L1099) and open a pull request!

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

  describe('A white quadrilateral on a gray background.');
}

function draw() {
  background(200);

  // Shear the coordinate system along the y-axis.
  shearY(QUARTER_PI);

  // Draw the square.
  square(0, 0, 50);
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Use degrees.
  angleMode(DEGREES);

  describe('A white quadrilateral on a gray background.');
}

function draw() {
  background(200);

  // Shear the coordinate system along the y-axis.
  shearY(45);

  // Draw the square.
  square(0, 0, 50);
}
```
