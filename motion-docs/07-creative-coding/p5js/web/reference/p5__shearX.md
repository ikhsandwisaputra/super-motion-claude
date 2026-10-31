---
source: https://p5js.org/reference/p5/shearX/
title: "shearX"
fetched: 2026-10-28
---

Shears the x-axis so that shapes appear skewed.

By default, the x- and y-axes are perpendicular. The `shearX()` function transforms the coordinate system so that x-coordinates are translated while y-coordinates are fixed.

The first parameter, `angle`, is the amount to shear. For example, calling `shearX(1)` transforms all x-coordinates using the formula `x = x + y * tan(angle)`. `shearX()` interprets angle values using the current [angleMode()](https://p5js.org/reference/p5/angleMode/).

By default, transformations accumulate. For example, calling `shearX(1)` twice has the same effect as calling `shearX(2)` once. The [push()](https://p5js.org/reference/p5/push/) and [pop()](https://p5js.org/reference/p5/pop/) functions can be used to isolate transformations within distinct drawing groups.

Note: Transformations are reset at the beginning of the draw loop. Calling `shearX(1)` inside the [draw()](https://p5js.org/reference/p5/draw/) function won't cause shapes to shear continuously.

## Examples

## Syntax

`shearX(angle)`

## Parameters

angle

Number: angle to shear by in the current [angleMode()](https://p5js.org/reference/p5/shearX/#/p5/angleMode).

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/transform.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/transform.js#L1029) and open a pull request!

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

  // Shear the coordinate system along the x-axis.
  shearX(QUARTER_PI);

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

  // Shear the coordinate system along the x-axis.
  shearX(45);

  // Draw the square.
  square(0, 0, 50);
}
```
