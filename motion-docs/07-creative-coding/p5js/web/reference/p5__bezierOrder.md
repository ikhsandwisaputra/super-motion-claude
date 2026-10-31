---
source: https://p5js.org/reference/p5/bezierOrder/
title: "bezierOrder"
fetched: 2026-10-28
---

Influences the shape of the Bézier curve segment in a custom shape. By default, this is 3; the other possible parameter is 2. This results in quadratic Bézier curves.

`bezierVertex()` adds a curved segment to custom shapes. The Bézier curves it creates are defined like those made by the [bezier()](https://p5js.org/reference/p5/bezier/) function. `bezierVertex()` must be called between the [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/) functions. There must be at least one call to [bezierVertex()](https://p5js.org/reference/p5/vertex/), before a number of `bezierVertex()` calls that is a multiple of the parameter set by [bezierOrder(...)](https://p5js.org/reference/p5/bezierOrder/) (default 3).

Each curve of order 3 requires three calls to `bezierVertex`, so 2 curves would need 7 calls to `bezierVertex()`: (1 one initial anchor point, two sets of 3 curves describing the curves) With `bezierOrder(2)`, two curves would need 5 calls: 1 + 2 + 2.

Bézier curves can also be drawn in 3D using WebGL mode.

Note: `bezierVertex()` won’t work when an argument is passed to [beginShape()](https://p5js.org/reference/p5/beginShape/).

Calling `bezierOrder()` without an argument returns the current Bézier order.

## Examples

## Syntax

`bezierOrder(order)``bezierOrder()`

## Parameters

order

Number: The new order to set. Can be either 2 or 3, by default 3

## Returns

Number: The current Bézier order.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/custom\_shapes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/custom_shapes.js#L2102) and open a pull request!

---

## Related References

* [beginContour

  Begins creating a hole within a flat shape.](https://p5js.org/reference/p5/beginContour/)
* [beginShape

  Begins adding vertices to a custom shape.](https://p5js.org/reference/p5/beginShape/)
* [bezierOrder

  Influences the shape of the Bézier curve segment in a custom shape.](https://p5js.org/reference/p5/bezierOrder/)
* [bezierVertex

  Adds a Bézier curve segment to a custom shape.](https://p5js.org/reference/p5/bezierVertex/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the shape.
  noFill();

  // Start drawing the shape.
  beginShape();

  // set the order to 2 for a quadratic Bézier curve
  bezierOrder(2);

  // Add the first anchor point.
  bezierVertex(30, 20);

  // Add the Bézier vertex.
  bezierVertex(80, 20);
  bezierVertex(50, 50);

  // Stop drawing the shape.
  endShape();

  describe('A black curve drawn on a gray square. The curve starts at the top-left corner and ends at the center.');
}
```
