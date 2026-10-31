---
source: https://p5js.org/reference/p5/resetMatrix/
title: "resetMatrix"
fetched: 2026-10-28
---

Clears all transformations applied to the coordinate system.

## Examples

## Syntax

`resetMatrix()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/transform.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/transform.js#L258) and open a pull request!

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
    'Two circles drawn on a gray background. A blue circle is at the top-left and a red circle is at the bottom-right.'
  );
}

function draw() {
  background(200);

  // Translate the origin to the center.
  translate(50, 50);

  // Draw a blue circle at the coordinates (25, 25).
  fill('blue');
  circle(25, 25, 20);

  // Clear all transformations.
  // The origin is now at the top-left corner.
  resetMatrix();

  // Draw a red circle at the coordinates (25, 25).
  fill('red');
  circle(25, 25, 20);
}
```
