---
source: https://p5js.org/reference/p5/beginContour/
title: "beginContour"
fetched: 2026-10-28
---

Begins creating a hole within a flat shape.

The `beginContour()` and [endContour()](https://p5js.org/reference/p5/endContour/) functions allow for creating negative space within custom shapes that are flat. `beginContour()` begins adding vertices to a negative space and [endContour()](https://p5js.org/reference/p5/endContour/) stops adding them. `beginContour()` and [endContour()](https://p5js.org/reference/p5/endContour/) must be called between [beginShape()](https://p5js.org/reference/p5/beginShape/) and [endShape()](https://p5js.org/reference/p5/endShape/).

Transformations such as [translate()](https://p5js.org/reference/p5/translate/), [rotate()](https://p5js.org/reference/p5/rotate/), and [scale()](https://p5js.org/reference/p5/scale/) don't work between `beginContour()` and [endContour()](https://p5js.org/reference/p5/endContour/). It's also not possible to use other shapes, such as [ellipse()](https://p5js.org/reference/p5/ellipse/) or [rect()](https://p5js.org/reference/p5/rect/), between `beginContour()` and [endContour()](https://p5js.org/reference/p5/endContour/).

Note: The vertices that define a negative space must "wind" in the opposite direction from the outer shape. First, draw vertices for the outer shape clockwise order. Then, draw vertices for the negative space in counter-clockwise order.

## Examples

## Syntax

`beginContour()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/shape/custom\_shapes.js](https://github.com/processing/p5.js/blob/v2.3.3/src/shape/custom_shapes.js#L3130) and open a pull request!

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

  // Start drawing the shape.
  beginShape();

  // Exterior vertices, clockwise winding.
  vertex(10, 10);
  vertex(90, 10);
  vertex(90, 90);
  vertex(10, 90);

  // Interior vertices, counter-clockwise winding.
  beginContour();
  vertex(30, 30);
  vertex(30, 70);
  vertex(70, 70);
  vertex(70, 30);
  endContour(CLOSE);

  // Stop drawing the shape.
  endShape(CLOSE);

  describe('A white square with a square hole in its center drawn on a gray background.');
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white square with a square hole in its center drawn on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Start drawing the shape.
  beginShape();

  // Exterior vertices, clockwise winding.
  vertex(-40, -40);
  vertex(40, -40);
  vertex(40, 40);
  vertex(-40, 40);

  // Interior vertices, counter-clockwise winding.
  beginContour();
  vertex(-20, -20);
  vertex(-20, 20);
  vertex(20, 20);
  vertex(20, -20);
  endContour(CLOSE);

  // Stop drawing the shape.
  endShape(CLOSE);
}
```
